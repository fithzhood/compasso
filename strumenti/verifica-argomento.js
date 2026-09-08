#!/usr/bin/env node
/* Verifica un file argomento contro SCHEMA.md.
   uso: node strumenti/verifica-argomento.js argomenti/<id>.js [altri file...]
   Esce con 1 se ci sono errori. Stampa OK se il file è a posto. */
'use strict';
const path = require('path');
const fs = require('fs');
const radice = path.resolve(__dirname, '..');
const katex = require(path.join(radice, 'lib/katex/katex.min.js'));
const G = require(path.join(radice, 'compasso-grafici.js'));

global.window = {};
require(path.join(radice, 'compasso-indice.js'));
const INDICE = global.window.COMPASSO_INDICE;
const ANIMAZIONI = require(path.join(radice, 'compasso-animazioni.js')).nomi();

const CONTA = { sezioni: [5, 9], esempi: [4, 6], formulario: [6, 14], flashcards: [16, 26], esercizi: [8, 12], quiz: [12, 18], suggerimenti: [6, 10], aneddoti: [3, 5] };
const VIETATI = [/\\\(/, /\\\[/, /\\begin\{align/, /\\begin\{equation/, /\\textbf/, /\\newcommand/];

function verificaFile(file) {
  const errori = [], avvisi = [];
  const E = (m) => errori.push(m), A = (m) => avvisi.push(m);
  let arg = null;
  global.COMPASSO = { registra: a => { arg = a; } };
  try { delete require.cache[path.resolve(file)]; require(path.resolve(file)); }
  catch (e) { E('il file non si carica: ' + e.message.split('\n')[0]); return { errori, avvisi }; }
  if (!arg) { E('COMPASSO.registra non è stato chiamato'); return { errori, avvisi }; }

  const idFile = path.basename(file, '.js');
  if (arg.id !== idFile) E(`id "${arg.id}" diverso dal nome del file "${idFile}"`);
  const voce = INDICE.argomenti.find(a => a.id === arg.id);
  if (!voce) E(`id "${arg.id}" non è nell'indice (compasso-indice.js)`);
  if (!arg.titolo) E('manca titolo');
  if (!arg.introduzione || arg.introduzione.trim().length < 200) E('introduzione mancante o troppo corta');

  for (const k in CONTA) {
    const v = arg[k];
    if (!Array.isArray(v) || !v.length) { E(`manca ${k} (array)`); continue; }
    if (v.length < CONTA[k][0]) A(`${k}: ${v.length} voci, consigliate almeno ${CONTA[k][0]}`);
    if (v.length > CONTA[k][1] + 4) A(`${k}: ${v.length} voci, forse troppe (max consigliato ${CONTA[k][1]})`);
  }
  if (!arg.grafici || typeof arg.grafici !== 'object') A('nessun grafico definito');

  /* ---- testi: raccolta di tutte le stringhe da controllare ---- */
  const testi = [];
  const T = (s, dove) => { if (s == null) return; if (typeof s !== 'string') { E(`${dove}: deve essere una stringa`); return; } testi.push([s, dove]); };
  T(arg.introduzione, 'introduzione');
  const idSez = new Set();
  (arg.sezioni || []).forEach((s, i) => {
    const dove = `sezioni[${i}]`;
    if (!s.id) E(`${dove}: manca id`); else if (idSez.has(s.id)) E(`${dove}: id "${s.id}" duplicato`); else idSez.add(s.id);
    if (!s.titolo) E(`${dove}: manca titolo`);
    if (!s.testo) E(`${dove}: manca testo`); else { T(s.testo, dove + '.testo'); const parole = s.testo.split(/\s+/).length; if (parole < 90) A(`${dove} (${s.id}): solo ${parole} parole`); }
  });
  (arg.esempi || []).forEach((e, i) => { const d = `esempi[${i}]`; if (!e.titolo) E(d + ': manca titolo'); T(e.problema, d + '.problema'); if (!Array.isArray(e.passi) || !e.passi.length) E(d + ': passi deve essere un array non vuoto'); else e.passi.forEach((p, k) => T(p, `${d}.passi[${k}]`)); T(e.risultato, d + '.risultato'); });
  (arg.formulario || []).forEach((f, i) => { const d = `formulario[${i}]`; if (!f.nome) E(d + ': manca nome'); if (!f.formula) E(d + ': manca formula'); else { if (/\$/.test(f.formula)) E(d + ': la formula va scritta senza $'); try { katex.renderToString(f.formula, { throwOnError: true, displayMode: true, strict: 'ignore' }); } catch (err) { E(d + '.formula: ' + err.message.replace('KaTeX parse error: ', '')); } } T(f.nota, d + '.nota'); });
  const idFc = new Set();
  (arg.flashcards || []).forEach((c, i) => { const d = `flashcards[${i}]`; if (!c.id) E(d + ': manca id'); else if (idFc.has(c.id)) E(d + `: id "${c.id}" duplicato`); else idFc.add(c.id); if (!c.sezione) A(d + ': manca sezione'); else if (!idSez.has(c.sezione)) E(d + `: sezione "${c.sezione}" inesistente`); if (c.tipo && !['definizione', 'formula', 'procedura', 'concetto'].includes(c.tipo)) E(d + ': tipo non valido'); T(c.fronte, d + '.fronte'); T(c.retro, d + '.retro'); if (!c.fronte || !c.retro) E(d + ': servono fronte e retro'); });
  const idEs = new Set();
  (arg.esercizi || []).forEach((e, i) => {
    const d = `esercizi[${i}]`;
    if (!e.id) E(d + ': manca id'); else if (idEs.has(e.id)) E(d + `: id "${e.id}" duplicato`); else idEs.add(e.id);
    if (![1, 2, 3].includes(e.difficolta)) E(d + ': difficolta deve essere 1, 2 o 3');
    T(e.testo, d + '.testo'); if (!e.testo) E(d + ': manca testo');
    if (!Array.isArray(e.suggerimenti) || !e.suggerimenti.length) E(d + ': suggerimenti deve essere un array (1–3)'); else e.suggerimenti.forEach((s, k) => T(s, `${d}.suggerimenti[${k}]`));
    if (!Array.isArray(e.soluzione) || !e.soluzione.length) E(d + ': soluzione deve essere un array di passi'); else e.soluzione.forEach((s, k) => T(s, `${d}.soluzione[${k}]`));
    if (e.risposta) {
      const r = e.risposta;
      if (r.tipo === 'numero') { if (typeof r.valore !== 'number') E(d + '.risposta: valore deve essere un numero'); }
      else if (r.tipo === 'numeri') { if (!Array.isArray(r.valori) || !r.valori.every(v => typeof v === 'number')) E(d + '.risposta: valori deve essere un array di numeri'); }
      else if (r.tipo === 'testo') { if (!Array.isArray(r.accettate) || !r.accettate.length) E(d + '.risposta: accettate deve essere un array di stringhe'); }
      else if (r.tipo === 'intervallo') { if (typeof r.da !== 'number' && r.da !== '-inf') E(d + '.risposta: da'); if (typeof r.a !== 'number' && r.a !== 'inf') E(d + '.risposta: a'); }
      else E(d + '.risposta: tipo sconosciuto "' + r.tipo + '"');
    }
  });
  const conRisposta = (arg.esercizi || []).filter(e => e.risposta).length;
  if (arg.esercizi && conRisposta < Math.ceil(arg.esercizi.length / 2)) A(`solo ${conRisposta} esercizi su ${arg.esercizi.length} hanno una risposta controllabile`);
  const idQ = new Set(); const posizioni = [0, 0, 0, 0];
  (arg.quiz || []).forEach((q, i) => {
    const d = `quiz[${i}]`;
    if (!q.id) E(d + ': manca id'); else if (idQ.has(q.id)) E(d + `: id "${q.id}" duplicato`); else idQ.add(q.id);
    T(q.domanda, d + '.domanda'); if (!q.domanda) E(d + ': manca domanda');
    if (!Array.isArray(q.opzioni) || q.opzioni.length !== 4) E(d + ': servono esattamente 4 opzioni'); else q.opzioni.forEach((o, k) => T(o, `${d}.opzioni[${k}]`));
    if (!Number.isInteger(q.corretta) || q.corretta < 0 || q.corretta > 3) E(d + ': corretta deve essere un intero 0–3'); else posizioni[q.corretta]++;
    if (!q.spiegazione) E(d + ': manca spiegazione'); else T(q.spiegazione, d + '.spiegazione');
    if (Array.isArray(q.opzioni)) { const set = new Set(q.opzioni.map(o => String(o).trim())); if (set.size !== q.opzioni.length) E(d + ': opzioni duplicate'); }
  });
  if (arg.quiz && arg.quiz.length >= 8 && Math.max(...posizioni) > arg.quiz.length * 0.6) A('quiz: la risposta corretta sta quasi sempre nella stessa posizione (' + posizioni.join('/') + ')');
  (arg.suggerimenti || []).forEach((s, i) => { const d = `suggerimenti[${i}]`; if (!['errore', 'trucco', 'metodo'].includes(s.tipo)) E(d + ': tipo deve essere errore|trucco|metodo'); T(s.testo, d + '.testo'); if (!s.testo) E(d + ': manca testo'); });
  (arg.aneddoti || []).forEach((a, i) => { const d = `aneddoti[${i}]`; ['matematico', 'anni', 'titolo', 'testo'].forEach(k => { if (!a[k]) E(`${d}: manca ${k}`); }); T(a.testo, d + '.testo'); T(a.legame, d + '.legame'); if (a.testo && a.testo.split(/\s+/).length < 50) A(`${d} (${a.matematico}): racconto molto corto`); });

  /* ---- grafici ---- */
  const grafici = arg.grafici || {};
  const usati = new Set();
  for (const nome in grafici) { const errs = G.verifica(grafici[nome]); errs.forEach(e => E(`grafici.${nome}: ${e}`)); }
  testi.forEach(([s, dove]) => {
    const re = /\[\[grafico:([^\]]+)\]\]/g; let m;
    while ((m = re.exec(s))) { usati.add(m[1]); if (!grafici[m[1]]) E(`${dove}: grafico "${m[1]}" non definito`); }
    s.split('\n').forEach(riga => { if (/\[\[grafico:/.test(riga) && riga.trim() !== riga.trim().match(/\[\[grafico:[^\]]+\]\]/)[0]) E(`${dove}: [[grafico:...]] deve stare da solo sulla riga`); });
    const ra = /\[\[animazione:([^\]]+)\]\]/g;
    while ((m = ra.exec(s))) { if (!ANIMAZIONI.includes(m[1])) E(`${dove}: animazione "${m[1]}" inesistente (disponibili: ${ANIMAZIONI.join(', ')})`); }
    s.split('\n').forEach(riga => { if (/\[\[animazione:/.test(riga) && riga.trim() !== riga.trim().match(/\[\[animazione:[^\]]+\]\]/)[0]) E(`${dove}: [[animazione:...]] deve stare da solo sulla riga`); });
  });
  for (const nome in grafici) if (!usati.has(nome)) A(`grafici.${nome}: definito ma mai usato con [[grafico:${nome}]]`);

  /* ---- matematica ---- */
  testi.forEach(([s, dove]) => {
    VIETATI.forEach(re => { if (re.test(s)) E(`${dove}: contiene ${re.source} (vietato, vedi SCHEMA.md §1)`); });
    if (/[`]|\$\{/.test(s)) E(`${dove}: contiene backtick o \${`);
    /* display */
    let resto = s.replace(/\$\$([\s\S]+?)\$\$/g, (tutto, tex) => { try { katex.renderToString(tex, { throwOnError: true, displayMode: true, strict: 'ignore' }); } catch (err) { E(`${dove}: $$…$$ → ${err.message.replace('KaTeX parse error: ', '')}`); } return ' '; });
    resto = resto.replace(/\$([^$\n]+?)\$/g, (tutto, tex) => { try { katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }); } catch (err) { E(`${dove}: $${tex}$ → ${err.message.replace('KaTeX parse error: ', '')}`); } return ' '; });
    if ((resto.match(/\$/g) || []).length) E(`${dove}: numero dispari di $ (matematica non chiusa, o $ su più righe)`);
    if (/\\(frac|sqrt|cdot|le|ge|ne|pm|infty|Delta|alpha|beta|pi|sin|cos|tan|log|ln|lim|int|sum|text|mathbb)\b/.test(resto)) E(`${dove}: comando LaTeX fuori da $…$`);
    if (/[²³⁰¹⁴⁵⁶⁷⁸⁹]/.test(resto) && !/grafico/.test(dove)) A(`${dove}: apice Unicode fuori dalla matematica (usa $x^2$)`);
  });
  return { errori, avvisi };
}

const files = process.argv.slice(2).filter(f => !f.startsWith('--'));
if (!files.length) { console.error('uso: node strumenti/verifica-argomento.js argomenti/<id>.js'); process.exit(2); }
let totErr = 0;
files.forEach(f => {
  if (!fs.existsSync(f)) { console.log(`✖ ${f}: file inesistente`); totErr++; return; }
  const { errori, avvisi } = verificaFile(f);
  totErr += errori.length;
  if (!errori.length && !avvisi.length) console.log(`OK  ${f}`);
  else {
    console.log(`${errori.length ? '✖' : '⚠'} ${f}: ${errori.length} errori, ${avvisi.length} avvisi`);
    errori.forEach(e => console.log('   ERRORE  ' + e));
    avvisi.forEach(a => console.log('   avviso  ' + a));
    if (!errori.length) console.log('   OK (solo avvisi)');
  }
});
process.exit(totErr ? 1 : 0);
