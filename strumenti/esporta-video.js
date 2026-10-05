#!/usr/bin/env node
/* Esporta i video in MP4 (o in fotogrammi PNG per controllarli), con Chrome headless e ffmpeg.
   Ogni fotogramma è disegnato da strumenti/video.html?render: tempo esatto, niente fotogrammi persi.

   uso:
     node strumenti/esporta-video.js derivate/derivata              → video-mp4/derivate/derivata.mp4
     node strumenti/esporta-video.js --tutti                        → tutti quelli di video-elenco.js
     node strumenti/esporta-video.js derivate/derivata --foto 4,30,52.5
                                                                    → video-mp4/_prove/derivate/derivata/t004.00.png …
   opzioni: --fps 30 (default 30) · --tema scuro · --da 20 --a 40 (solo un tratto) · --salta-esistenti
            --uscita C:/Users/lfili/Videos/Compasso/_muti (cartella degli MP4 muti, fuori da OneDrive; i fotogrammi restano in video-mp4/_prove)
            --pause 16.1:1.75,72.9:1.0 (fermo immagine: all'istante 16,1 il video resta fermo 1,75 s; per dare tempo alla voce)
   La cartella video-mp4/ non si pubblica (è esclusa in pubblica.py). */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const { spawn } = require('child_process');
const RADICE = path.resolve(__dirname, '..');
const USCITA = path.join(RADICE, 'video-mp4');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(f => fs.existsSync(f));

const arg = process.argv.slice(2);
const opz = { ids: [], fps: 30, tema: 'chiaro', foto: null, da: null, a: null, salta: false, uscita: USCITA, pause: [] };
for (let i = 0; i < arg.length; i++) {
  const a = arg[i];
  if (a === '--fps') opz.fps = +arg[++i]; else if (a === '--tema') opz.tema = arg[++i];
  else if (a === '--foto') opz.foto = arg[++i].split(',').map(Number);
  else if (a === '--da') opz.da = +arg[++i]; else if (a === '--a') opz.a = +arg[++i];
  else if (a === '--salta-esistenti') opz.salta = true;
  else if (a === '--uscita') opz.uscita = path.resolve(arg[++i]);
  else if (a === '--pause') opz.pause = arg[++i].split(',').map(x => x.split(':').map(Number)).sort((p, q) => p[0] - q[0]);
  else if (a === '--tutti') opz.ids.push(...require('./video-elenco.js'));
  else opz.ids.push(a);
}
if (!opz.ids.length) { console.error('quale video? (es. derivate/derivata, oppure --tutti)'); process.exit(2); }

const TIPI = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  const f = path.join(RADICE, p);
  if (!f.startsWith(RADICE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': TIPI[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});

async function main() {
  if (!CHROME) { console.error('Chrome non trovato'); process.exit(2); }
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const porta = server.address().port;
  const profilo = fs.mkdtempSync(path.join(os.tmpdir(), 'esporta-'));
  const chrome = spawn(CHROME, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--force-device-scale-factor=1',
    '--remote-debugging-port=0', '--user-data-dir=' + profilo, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((ok, ko) => { let buf = ''; const t = setTimeout(() => ko(new Error('Chrome non risponde')), 15000); chrome.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]); } }); });
  const lista = await (await fetch(wsUrl.replace('ws://', 'http://').replace(/\/devtools\/browser\/.*/, '/json/list'))).json();
  const ws = new WebSocket(lista.find(p => p.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let n = 0; const attese = {};
  ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && attese[m.id]) { attese[m.id](m); delete attese[m.id]; } });
  const cdp = (method, params = {}) => new Promise(r => { const id = ++n; attese[id] = r; ws.send(JSON.stringify({ id, method, params })); });
  const valuta = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result && r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception && r.result.exceptionDetails.exception.description || 'errore nella pagina'); return r.result && r.result.result && r.result.result.value; };
  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });

  for (const id of opz.ids) {
    const mp4 = path.join(opz.uscita, id + '.mp4');
    if (!opz.foto && opz.salta && fs.existsSync(mp4)) { console.log('già fatto:', id); continue; }
    await cdp('Page.navigate', { url: `http://127.0.0.1:${porta}/strumenti/video.html?id=${encodeURIComponent(id)}&tema=${opz.tema}&render` });
    let pronto = false;
    for (let i = 0; i < 300 && !pronto; i++) {
      await new Promise(r => setTimeout(r, 100));
      const s = await valuta('window.__errore || (window.__ready === true)').catch(() => false);
      if (typeof s === 'string') throw new Error(id + ': ' + s);
      pronto = s === true;
    }
    if (!pronto) throw new Error(id + ': la pagina non è pronta');
    const dur = await valuta('window.DUR');
    const foto = t => valuta(`(drawAt(${t}), document.getElementById('cv').toDataURL('image/png').split(',')[1])`);
    if (opz.foto) {
      const dir = path.join(USCITA, '_prove', id); fs.mkdirSync(dir, { recursive: true });
      for (const t of opz.foto) fs.writeFileSync(path.join(dir, `t${t.toFixed(2).padStart(6, '0')}${opz.tema === 'scuro' ? '-scuro' : ''}.png`), Buffer.from(await foto(t), 'base64'));
      console.log('fotogrammi:', dir);
      continue;
    }
    fs.mkdirSync(path.dirname(mp4), { recursive: true });
    // fermo immagine: il tempo del video (t) resta fermo per d secondi all'istante p; T è il tempo dell'MP4
    const extra = opz.pause.reduce((s, [, d]) => s + d, 0);
    const tempo = T => { let t = T; for (const [p, d] of opz.pause) { if (t <= p) break; t = Math.max(p, t - d); } return t; };
    const da = opz.da || 0, a = (opz.a || dur) + extra, tot = Math.round((a - da) * opz.fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(opz.fps), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let i = 0; i < tot; i++) {
      const buf = Buffer.from(await foto(tempo(da + i / opz.fps)), 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % (opz.fps * 10) === 0) process.stdout.write(`\r${id}: ${i}/${tot}`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
    console.log(`\r${id}: fatto in ${((Date.now() - t0) / 1000).toFixed(0)} s → ${mp4}`);
  }
  ws.close(); chrome.kill(); server.close();
  try { fs.rmSync(profilo, { recursive: true, force: true }); } catch (e) { /* Chrome può tenerlo aperto un attimo */ }
}
main().catch(e => { console.error(e.message); process.exit(1); });
