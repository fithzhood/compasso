#!/usr/bin/env node
/* Misura la leggibilità della teoria di un argomento, sezione per sezione.
   uso: node strumenti/leggibilita.js argomenti/<id>.js [--frasi]
   - Gulpease (indice di leggibilità per l'italiano, 0–100): sopra 60 lo legge bene chi ha la
     licenza media, sotto 40 è difficile anche per chi ha il diploma.
   - parole per frase (media) e frasi oltre 20 parole.
   La matematica ($…$, righe ~, tabelle) vale come una parola corta e non entra nel conto delle lettere.
   Con --frasi stampa anche le frasi lunghe, per trovarle. */
'use strict';
const path = require('path');
const file = process.argv[2]; const mostraFrasi = process.argv.includes('--frasi');
if (!file) { console.error('uso: node strumenti/leggibilita.js argomenti/<id>.js [--frasi]'); process.exit(2); }
let arg = null; global.COMPASSO = { registra: a => { arg = a; } };
require(path.resolve(file));

function pulisci(t) {
  return String(t)
    .replace(/^\s*~.*$/gm, ' ')                 /* derivazioni: si leggono a parte */
    .replace(/^\s*\|.*$/gm, ' ')                /* tabelle */
    .replace(/^\s*\[\[.*\]\]\s*$/gm, ' ')       /* grafici e animazioni */
    .replace(/^\s*(\?\?|\[[ xX]\]|=>)\s*/gm, '') /* marcatori delle domande */
    .replace(/\$\$[\s\S]+?\$\$/g, ' formula. ')
    .replace(/\$[^$\n]+\$/g, ' x ')
    .replace(/^\s*(>[!*]?|-|\d+[.)]|###)\s*/gm, '')
    .replace(/\*\*|\*|`/g, '');
}
function misura(t) {
  const testo = pulisci(t);
  const frasi = testo.split(/(?<=[.!?:;])\s+|\n\s*\n/).map(f => f.trim()).filter(f => f.split(/\s+/).length >= 3);
  const parole = testo.split(/\s+/).filter(w => /[A-Za-zÀ-ÿ0-9]/.test(w));
  const lettere = parole.join('').replace(/[^A-Za-zÀ-ÿ0-9]/g, '').length;
  const nP = Math.max(1, parole.length), nF = Math.max(1, frasi.length);
  const gulpease = Math.round(89 + (300 * nF - 10 * lettere) / nP);
  const lunghe = frasi.filter(f => f.split(/\s+/).length > 20);
  return { parole: parole.length, gulpease, media: (nP / nF).toFixed(1), lunghe };
}
const righe = [];
const tot = { parole: 0 };
const pezzi = [['introduzione', arg.introduzione]].concat(arg.sezioni.map(s => [s.id, s.testo]));
pezzi.forEach(([nome, t]) => {
  const m = misura(t); tot.parole += m.parole;
  righe.push(`${m.gulpease < 50 ? '✖' : m.gulpease < 58 ? '⚠' : ' '} ${nome.padEnd(34)} Gulpease ${String(m.gulpease).padStart(3)}  parole/frase ${m.media.padStart(5)}  parole ${String(m.parole).padStart(4)}  frasi >20 parole: ${m.lunghe.length}`);
  if (mostraFrasi) m.lunghe.forEach(f => righe.push('      · ' + f.slice(0, 220)));
});
const tutto = misura(pezzi.map(p => p[1]).join('\n\n'));
console.log(righe.join('\n'));
console.log(`  TOTALE teoria: ${tot.parole} parole, Gulpease ${tutto.gulpease}, ${tutto.media} parole per frase, ${tutto.lunghe.length} frasi oltre 20 parole`);
