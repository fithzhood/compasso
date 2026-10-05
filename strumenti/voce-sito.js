#!/usr/bin/env node
/* Porta voce ed effetti nel lettore del sito.
   Per ogni video con l'MP4 montato (Videos/Compasso/<id>.mp4) scrive:
     voce/<id>.m4a   la sola traccia audio dell'MP4 (voce + effetti già mixati), mono AAC
     voce/<id>.json  { durata, pause: [[t, d], …], parla: [[a, b], …] }
   `pause` sono i fermi immagine di voce-video.js, sul tempo originale del video (all'istante t il video resta
   fermo d secondi); `parla` sono gli intervalli in cui c'è una battuta, sul tempo lungo (con le pause):
   serviranno per abbassare la musica di sottofondo sotto la voce. `durata` è il tempo lungo.
   Controllo: la durata calcolata deve coincidere con quella dell'MP4 (± 0,1 s), se no il video si salta.
   uso: node strumenti/voce-sito.js [<id> …]        (senza id: tutti quelli di video/; salta i già fatti)
        --rifai                                     (riscrive anche i già fatti) */
'use strict';
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const RADICE = path.resolve(__dirname, '..');
const MP4 = 'C:/Users/lfili/Videos/Compasso', BATTUTE = 'C:/Users/lfili/Videos/Compasso/_voce-battute';
const ATTACCO = 0.15, CODA = 0.45;   // gli stessi di voce-video.js

const rifai = process.argv.includes('--rifai');
let ids = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!ids.length) {
  const giro = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? giro(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : []);
  ids = giro(path.join(RADICE, 'video')).map(f => path.relative(path.join(RADICE, 'video'), f).split(path.sep).join('/').replace(/\.js$/, '')).sort();
}

// durata di un WAV dalla sua intestazione (più rapido di ffprobe su 1600 file)
function durataWav(f) {
  const b = fs.readFileSync(f);
  let i = 12, byteRate = 0;
  while (i + 8 <= b.length) {
    const nome = b.toString('ascii', i, i + 4), n = b.readUInt32LE(i + 4);
    if (nome === 'fmt ') byteRate = b.readUInt32LE(i + 16);
    if (nome === 'data') return Math.min(n, b.length - i - 8) / byteRate;
    i += 8 + n + (n & 1);
  }
  throw new Error('WAV senza dati: ' + f);
}
const durata = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' });

let fatti = 0, saltati = 0, errori = 0;
for (const id of ids) {
  const mp4 = path.join(MP4, id + '.mp4'), out = path.join(RADICE, 'voce', id);
  if (!fs.existsSync(mp4)) { console.log('manca l\'MP4 con la voce: ' + id); errori++; continue; }
  if (!rifai && fs.existsSync(out + '.m4a') && fs.existsSync(out + '.json')) { saltati++; continue; }
  const ev = JSON.parse(execFileSync('node', [path.join(__dirname, 'eventi-video.js'), id], { encoding: 'utf8' }));
  const cartella = path.join(BATTUTE, id.replace('/', '--'));
  const battuta = i => path.join(cartella, 'f' + String(i).padStart(2, '0') + '.wav');
  // le pause, come in voce-video.js
  const pause = [];
  ev.fumetti.forEach((fu, i) => {
    if (!fs.existsSync(battuta(i))) return;
    fu.voce = durataWav(battuta(i));
    const manca = fu.voce + ATTACCO + CODA - (fu.a - fu.da);
    if (manca > 0.05) pause.push([+(fu.a - 0.35).toFixed(2), +manca.toFixed(2)]);
  });
  const sposta = t => t + pause.filter(([p]) => p < t).reduce((s, [, d]) => s + d, 0);
  const lunga = ev.durata + pause.reduce((s, [, d]) => s + d, 0);
  const vera = durata(mp4);
  if (Math.abs(vera - lunga) > 0.1) { console.log(`DURATA DIVERSA ${id}: calcolata ${lunga.toFixed(2)}, MP4 ${vera.toFixed(2)}`); errori++; continue; }
  const parla = ev.fumetti.filter(fu => fu.voce).map(fu => { const a = sposta(fu.da) + ATTACCO; return [+a.toFixed(2), +(a + fu.voce).toFixed(2)]; });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-vn', '-ac', '1', '-ar', '44100', '-c:a', 'aac', '-b:a', '56k',
    '-movflags', '+faststart', out + '.m4a']);
  fs.writeFileSync(out + '.json', JSON.stringify({ durata: +lunga.toFixed(2), pause, parla }) + '\n');
  fatti++;
  console.log(`${id}: ${pause.length} pause, +${(lunga - ev.durata).toFixed(1)} s`);
}
console.log(`fatti ${fatti}, già fatti ${saltati}, errori ${errori}`);
process.exitCode = errori ? 1 : 0;
