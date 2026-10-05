#!/usr/bin/env node
/* PROVA: aggiunge gli effetti sonori a un MP4 già esportato, senza ricodificare il video.
   Gli effetti li sintetizza strumenti/suoni-sintesi.py dagli eventi del video (il campo `suoni`, più Ada
   che si accende e si spegne): durano quanto le animazioni che accompagnano. Niente sottofondo.
   uso: node strumenti/audio-video.js derivate/derivata [--da C:/…/Compasso] [--a C:/…/uscita]  */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');
const arg = process.argv.slice(2);
const id = arg[0];
const opz = (k, d) => { const i = arg.indexOf(k); return i >= 0 ? arg[i + 1] : d; };
const DA = opz('--da', 'C:/Users/lfili/Videos/Compasso/_muti');
const A = opz('--a', 'C:/Users/lfili/Videos/Compasso/_prova-audio');

const ev = execFileSync('node', [path.join(__dirname, 'eventi-video.js'), id], { encoding: 'utf8' });
const wav = path.join(os.tmpdir(), 'suoni-' + id.replace(/\//g, '-') + '.wav');
console.log(execFileSync('python', [path.join(__dirname, 'suoni-sintesi.py'), wav], { input: ev, encoding: 'utf8' }).trim());

const out = path.join(A, id + '.mp4');
fs.mkdirSync(path.dirname(out), { recursive: true });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(DA, id + '.mp4'), '-i', wav,
  '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-ac', '2', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
fs.rmSync(wav, { force: true });
console.log(`${id} → ${out}`);
