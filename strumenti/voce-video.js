#!/usr/bin/env node
/* PROVA: video con la voce di Ada (una battuta per fumetto) ed effetti sonori.
   Ogni fumetto resta aperto finché la sua battuta non è finita: dove la voce è più lunga del fumetto,
   alla fine del fumetto il video si ferma (fermo immagine, `esporta-video.js --pause`) per il tempo che manca.
   Effetti e battute si spostano con le pause. Il file del video non si tocca.
   uso: node strumenti/voce-video.js derivate/derivata C:/Users/lfili/Videos/Compasso/_voce-battute/derivate--derivata
        [--a C:/Users/lfili/Videos/Compasso] [--suffisso -prova]  */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');
const [id, cartella] = process.argv.slice(2);
const opz = (k, d) => { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : d; };
const A = opz('--a', 'C:/Users/lfili/Videos/Compasso');   // dal 5/10 i video con la voce stanno qui, i muti in _muti
const ATTACCO = 0.15, CODA = 0.45;   // la voce parte poco dopo il fumetto, e il fumetto resta un attimo dopo la voce

const ev = JSON.parse(execFileSync('node', [path.join(__dirname, 'eventi-video.js'), id], { encoding: 'utf8' }));
const durata = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' });
const battuta = i => path.join(cartella, 'f' + String(i).padStart(2, '0') + '.wav');

// 1. le pause: alla fine di ogni fumetto troppo corto per la sua battuta
const pause = [];
ev.fumetti.forEach((fu, i) => {
  if (!fs.existsSync(battuta(i))) return;
  fu.voce = durata(battuta(i));
  const manca = fu.voce + ATTACCO + CODA - (fu.a - fu.da);
  if (manca > 0.05) pause.push([+(fu.a - 0.35).toFixed(2), +manca.toFixed(2)]);   // prima della dissolvenza del fumetto (ultimi 0,3 s)
});
const sposta = t => t + pause.filter(([p]) => p < t).reduce((s, [, d]) => s + d, 0);
const extra = pause.reduce((s, [, d]) => s + d, 0);
console.log(`${pause.length} pause, ${extra.toFixed(1)} s in più: ` + pause.map(([p, d]) => `${p}+${d}`).join(' '));

// 2. il video muto con le pause. Se l'MP4 muto c'è già (Videos/Compasso/_muti/<id>.mp4), le pause si fanno con ffmpeg
//    congelando il fotogramma (un minuto invece di riesportare da Chrome); altrimenti si esporta con --pause.
const muto = path.join(os.tmpdir(), 'voce-muto');
const gia = path.join('C:/Users/lfili/Videos/Compasso/_muti', id + '.mp4');
if (fs.existsSync(gia) && !process.argv.includes('--riesporta')) {
  const tagli = [0, ...pause.map(([p]) => p), ev.durata];
  const pezzi = [], nomi = [];
  for (let k = 0; k < tagli.length - 1; k++) {
    const ferma = k < pause.length ? `,tpad=stop_mode=clone:stop_duration=${pause[k][1]}` : '';
    pezzi.push(`[0:v]trim=start=${tagli[k]}:end=${tagli[k + 1]},setpts=PTS-STARTPTS${ferma}[p${k}]`);
    nomi.push(`[p${k}]`);
  }
  pezzi.push(`${nomi.join('')}concat=n=${nomi.length}:v=1:a=0[v]`);
  fs.mkdirSync(path.dirname(path.join(muto, id)), { recursive: true });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', gia, '-filter_complex', pezzi.join(';'), '-map', '[v]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', path.join(muto, id + '.mp4')], { stdio: 'inherit' });
} else {
  execFileSync('node', [path.join(__dirname, 'esporta-video.js'), id, '--uscita', muto,
    ...(pause.length ? ['--pause', pause.map(([p, d]) => `${p}:${d}`).join(',')] : [])], { stdio: 'inherit' });
}

// 3. gli effetti, con i tempi spostati
const ev2 = {
  ...ev, durata: ev.durata + extra,
  fumetti: ev.fumetti.map(f => ({ ...f, da: sposta(f.da), a: sposta(f.a) })),
  facce: ev.facce.map(f => ({ ...f, t: sposta(f.t) })),
  suoni: ev.suoni.map(s => s[0] === 'tono' || s[0] === 'traccia' ? [s[0], sposta(s[1]), sposta(s[2]), ...s.slice(3)] : [s[0], sposta(s[1]), ...s.slice(2)]),
};
const effetti = path.join(os.tmpdir(), 'effetti-voce-' + id.split('/').join('-') + '.wav');
execFileSync('python', [path.join(__dirname, 'suoni-sintesi.py'), effetti], { input: JSON.stringify(ev2) });

// 4. le battute, ognuna all'apertura del suo fumetto
const ingressi = ['-i', path.join(muto, id + '.mp4'), '-i', effetti];
const filtri = [], voci = [];
ev2.fumetti.forEach((fu, i) => {
  if (!fs.existsSync(battuta(i))) return;
  const n = ingressi.length / 2, ms = Math.round((fu.da + ATTACCO) * 1000);
  ingressi.push('-i', battuta(i));
  filtri.push(`[${n}:a]aresample=48000,adelay=${ms}|${ms}[v${i}]`);
  voci.push(`[v${i}]`);
});
filtri.push(`${voci.join('')}amix=inputs=${voci.length}:normalize=0,loudnorm=I=-18:TP=-2,aresample=48000,asplit[voce][chiave]`);
filtri.push(`[1:a]aresample=48000,volume=0.8[eff]`);
filtri.push(`[eff][chiave]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[effbassi]`);
filtri.push(`[voce][effbassi]amix=inputs=2:normalize=0:duration=longest,alimiter=limit=0.89[mix]`);

const out = path.join(A, id + opz('--suffisso', '') + '.mp4');
fs.mkdirSync(path.dirname(out), { recursive: true });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...ingressi, '-filter_complex', filtri.join(';'),
  '-map', '0:v', '-map', '[mix]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-t', String(ev2.durata), '-movflags', '+faststart', out], { stdio: 'inherit' });
fs.rmSync(effetti, { force: true });
console.log(`${id}: ${voci.length} battute, durata ${ev2.durata.toFixed(1)} s → ${out}`);
