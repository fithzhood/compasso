#!/usr/bin/env node
/* Rigenera strumenti/video-elenco.js dai file in video/<argomento>/<nome>.js.
   uso: node strumenti/elenco-video.js */
'use strict';
const fs = require('fs'), path = require('path');
const RADICE = path.resolve(__dirname, '..'), DIR = path.join(RADICE, 'video');
const ids = [];
for (const a of fs.readdirSync(DIR).sort()) {
  const d = path.join(DIR, a); if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).sort()) if (f.endsWith('.js')) ids.push(a + '/' + f.slice(0, -3));
}
const testo = `/* Elenco dei video esistenti (<argomento>/<nome>), per la pagina di anteprima e per l'esportazione di tutti.
   Generato da strumenti/elenco-video.js: non modificarlo a mano. */
(function (g) {
  g.VIDEO_ELENCO = [
${ids.map(i => `    '${i}',`).join('\n')}
  ];
  if (typeof module !== 'undefined') module.exports = g.VIDEO_ELENCO;
})(typeof window !== 'undefined' ? window : globalThis);
`;
fs.writeFileSync(path.join(__dirname, 'video-elenco.js'), testo);
console.log(ids.length + ' video in strumenti/video-elenco.js');
