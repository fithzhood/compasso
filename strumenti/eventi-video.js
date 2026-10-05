#!/usr/bin/env node
/* Estrae da un video i suoi eventi (fumetti, facce, capitoli, durata) senza disegnarlo:
   il file del video si carica con un motore finto che risponde a tutto.
   uso: node strumenti/eventi-video.js derivate/derivata   → JSON su stdout */
'use strict';
const path = require('path');
const id = process.argv[2];
if (!id) { console.error('quale video?'); process.exit(2); }

// un oggetto che si lascia chiamare, leggere e costruire in qualunque modo
const finto = () => new Proxy(function () {}, {
  get: (t, k) => k === Symbol.toPrimitive ? () => 0 : k === 'length' ? 0 : finto(),
  apply: () => finto(), construct: () => finto(),
});
const M = new Proxy({}, {
  get: (t, k) => {
    if (k === 'W') return 1920; if (k === 'H') return 1080;
    if (k === 'clamp') return (v, a, b) => Math.max(a, Math.min(b, v));
    if (k === 'lerp') return (a, b, t) => a + (b - a) * t;
    return finto();
  },
});
let def = null;
global.CVIDEO = { registra: (vid, fabbrica) => { if (vid === id) def = fabbrica(M); } };
global.window = global;
require(path.resolve(__dirname, '..', 'video', id + '.js'));
if (!def) { console.error('video non registrato: ' + id); process.exit(1); }
const ada = def.ada || {};
console.log(JSON.stringify({
  id, titolo: def.titolo, durata: def.durata,
  fumetti: (ada.fumetti || []).map(f => ({ da: f[0], a: f[1], testo: f[2] })),
  facce: (ada.facce || []).map(f => ({ t: f[0], faccia: f[1] })),
  capitoli: (def.capitoli || []).map(c => ({ da: c[0], a: c[1], nome: c[2] })),
  suoni: def.suoni || [],
}, null, 1));
