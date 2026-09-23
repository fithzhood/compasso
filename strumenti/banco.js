#!/usr/bin/env node
/* Banco di prova headless: serve la cartella di Compasso, apre una pagina in Chrome headless,
   esegue uno script dentro la pagina, fotografa, e stampa errori di console e risultato.
   Non usa il pannello del browser, quindi più agenti possono collaudare insieme.

   uso:
     node strumenti/banco.js argomento/logaritmi/lab/regolo [opzioni]
   (senza "#/" davanti: Git Bash trasformerebbe "/argomento" in un percorso di Windows)
   opzioni:
     --js file.js      script eseguito nella pagina dopo il caricamento (può usare await; quello che
                       restituisce con return viene stampato). Nello script ci sono gli aiuti:
                       attendi(ms), trascina(el, [x0,y0], [x1,y1], passi), tocca(el), q(sel)
     --shot out.png    fotografia (percorso assoluto o relativo)
     --w 384 --h 800   finestra (default 1280x900); --scuro per il tema scuro
     --attesa 1500     ms di attesa dopo il caricamento (default 2500)
   Stampa: gli errori della pagina (console.error, eccezioni) e il valore restituito dallo script. */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const { spawn } = require('child_process');
const RADICE = path.resolve(__dirname, '..');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(f => fs.existsSync(f));

const arg = process.argv.slice(2);
const opz = { hash: '', js: null, shot: null, w: 1280, h: 900, attesa: 2500, scuro: false };
for (let i = 0; i < arg.length; i++) {
  const a = arg[i];
  if (a === '--js') opz.js = arg[++i]; else if (a === '--shot') opz.shot = arg[++i];
  else if (a === '--w') opz.w = +arg[++i]; else if (a === '--h') opz.h = +arg[++i];
  else if (a === '--attesa') opz.attesa = +arg[++i]; else if (a === '--scuro') opz.scuro = true;
  else opz.hash = a;
}
const TIPI = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.webp': 'image/webp', '.gif': 'image/gif' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/compasso.html';
  const f = path.join(RADICE, p);
  if (!f.startsWith(RADICE) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': TIPI[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});

const AIUTI = `
  window.attendi = ms => new Promise(r => setTimeout(r, ms));
  window.q = s => document.querySelector(s);
  Element.prototype.setPointerCapture = function () {}; Element.prototype.releasePointerCapture = function () {};
  window.tocca = (el) => { if (typeof el === 'string') el = q(el); const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; const o = { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, buttons: 1 }; el.dispatchEvent(new PointerEvent('pointerdown', o)); el.dispatchEvent(new PointerEvent('pointerup', Object.assign({}, o, { buttons: 0 }))); if (typeof el.click === 'function') el.click(); else el.dispatchEvent(new MouseEvent('click', o)); };
  window.trascina = async (el, da, a, passi) => { if (typeof el === 'string') el = q(el); passi = passi || 12; const o = (x, y, b) => ({ bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, buttons: b }); el.dispatchEvent(new PointerEvent('pointerdown', o(da[0], da[1], 1))); for (let i = 1; i <= passi; i++) { const x = da[0] + (a[0] - da[0]) * i / passi, y = da[1] + (a[1] - da[1]) * i / passi; (document.elementFromPoint(x, y) || el).dispatchEvent(new PointerEvent('pointermove', o(x, y, 1))); window.dispatchEvent(new PointerEvent('pointermove', o(x, y, 1))); await attendi(16); } el.dispatchEvent(new PointerEvent('pointerup', o(a[0], a[1], 0))); window.dispatchEvent(new PointerEvent('pointerup', o(a[0], a[1], 0))); };
`;

async function main() {
  if (!CHROME) { console.error('Chrome non trovato'); process.exit(2); }
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const porta = server.address().port;
  const profilo = fs.mkdtempSync(path.join(os.tmpdir(), 'banco-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--user-data-dir=' + profilo, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((ok, ko) => { let buf = ''; const t = setTimeout(() => ko(new Error('Chrome non risponde')), 15000); chrome.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]); } }); });
  const lista = await (await fetch(wsUrl.replace('ws://', 'http://').replace(/\/devtools\/browser\/.*/, '/json/list'))).json();
  const pagina = lista.find(p => p.type === 'page');
  const ws = new WebSocket(pagina.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const attese = {}; const errori = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && attese[m.id]) { attese[m.id](m); delete attese[m.id]; }
    if (m.method === 'Runtime.exceptionThrown') errori.push('ECCEZIONE ' + (m.params.exceptionDetails.exception && m.params.exceptionDetails.exception.description || m.params.exceptionDetails.text));
    if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) errori.push('console.' + m.params.type + ' ' + m.params.args.map(a => a.value || a.description || '').join(' '));
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errori.push('log ' + m.params.entry.text + ' ' + (m.params.entry.url || ''));
  });
  const cmd = (method, params) => new Promise(r => { const i = ++id; attese[i] = r; ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  await cmd('Runtime.enable'); await cmd('Log.enable'); await cmd('Page.enable');
  await cmd('Emulation.setDeviceMetricsOverride', { width: opz.w, height: opz.h, deviceScaleFactor: 1, mobile: opz.w < 600 });
  await cmd('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: opz.scuro ? 'dark' : 'light' }] });
  await cmd('Page.addScriptToEvaluateOnNewDocument', { source: AIUTI + (opz.scuro ? "try{localStorage.setItem('compasso.v1', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('compasso.v1')||'{}'),{impostazioni:{tema:'scuro',mascotte:false,mescola:true}})))}catch(e){}" : "try{const s=JSON.parse(localStorage.getItem('compasso.v1')||'{}'); s.impostazioni=Object.assign({tema:'auto',mescola:true},s.impostazioni||{},{mascotte:false}); localStorage.setItem('compasso.v1', JSON.stringify(s))}catch(e){}") });
  const url = `http://127.0.0.1:${porta}/compasso.html?v=banco${Date.now()}${opz.hash ? '#/' + opz.hash.replace(/^.*?#?\/?(?=argomento|ripasso|matematici|impostazioni)/, '').replace(/^#?\/?/, '') : ''}`;
  await cmd('Page.navigate', { url });
  await new Promise(r => setTimeout(r, opz.attesa));
  let risultato = null;
  if (opz.js) {
    const codice = fs.readFileSync(opz.js, 'utf8');
    const r = await cmd('Runtime.evaluate', { expression: '(async () => {\n' + codice + '\n})()', awaitPromise: true, returnByValue: true, timeout: 60000 });
    if (r.result && r.result.exceptionDetails) errori.push('SCRIPT ' + (r.result.exceptionDetails.exception && r.result.exceptionDetails.exception.description || r.result.exceptionDetails.text));
    else risultato = r.result && r.result.result && r.result.result.value;
    await new Promise(r => setTimeout(r, 300));
  }
  if (opz.shot) {
    const s = await cmd('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.resolve(opz.shot), Buffer.from(s.result.data, 'base64'));
    console.log('foto: ' + path.resolve(opz.shot));
  }
  console.log(errori.length ? 'ERRORI:\n  ' + errori.join('\n  ') : 'nessun errore in console');
  if (risultato !== null && risultato !== undefined) console.log('risultato: ' + (typeof risultato === 'string' ? risultato : JSON.stringify(risultato, null, 1)));
  ws.close(); chrome.kill(); server.close();
  setTimeout(() => { try { fs.rmSync(profilo, { recursive: true, force: true }); } catch (e) { /* Chrome tiene i file ancora un attimo */ } process.exit(errori.length ? 1 : 0); }, 400);
}
main().catch(e => { console.error(e); process.exit(2); });
