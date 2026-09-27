#!/usr/bin/env node
/* Controlla che un laboratorio stia in una schermata sola, su cinque schermi.
   uso: node strumenti/prova-lab.js <argomento> <lab> [--foto cartella] [--js script-prima.js] [--scuro]
   Per ogni schermo apre il laboratorio con il banco e misura:
   - la pagina non scorre (né in alto né di lato);
   - nessun elemento visibile esce dallo spazio del laboratorio (sotto la barra);
   - dentro il laboratorio non c'è niente che scorre (scrollHeight > clientHeight), salvo gli
     elementi marcati con data-scorre (per esempio un albero lunghissimo, se proprio serve);
   - bersagli toccabili (button, [role=button], input) alti almeno 36 px, testo non sotto i 12 px;
   - quanta parte dello spazio usa la scena (.lab-scena): sotto il 40% è sprecata.
   Con --js, lo script viene eseguito prima della misura (per portare il laboratorio a un livello avanzato).
   Esce con 1 se uno schermo non va. */
'use strict';
const { spawnSync } = require('child_process');
const path = require('path'), fs = require('fs'), os = require('os');
const a = process.argv.slice(2);
const argId = a[0], labId = a[1];
if (!argId || !labId) { console.error('uso: node strumenti/prova-lab.js <argomento> <lab> [--foto cartella] [--js script.js] [--scuro]'); process.exit(2); }
const foto = a.includes('--foto') ? a[a.indexOf('--foto') + 1] : null;
const prima = a.includes('--js') ? fs.readFileSync(a[a.indexOf('--js') + 1], 'utf8') : '';
const scuro = a.includes('--scuro');
const SCHERMI = [['telefono', 384, 740], ['tablet-v', 820, 1180], ['tablet-o', 1180, 820], ['portatile', 1366, 768], ['largo', 1920, 1080]];

/* la preparazione (script --js) gira in una funzione sua: le sue variabili e il suo return non disturbano la misura */
const MISURA = 'await (async () => {\n' + prima + '\n})();\n' + `
await attendi(700);
const st = document.querySelector('.lab-stage'); const R = st.getBoundingClientRect();
const problemi = [];
const pag = document.scrollingElement;
if (pag.scrollHeight > innerHeight + 1 || pag.scrollWidth > innerWidth + 1) problemi.push('la pagina scorre');
const vis = e => { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return false; const q = e.getBoundingClientRect(); return q.width > 0 && q.height > 0; };
const tutti = [...st.querySelectorAll('*')].filter(vis);
const fuori = tutti.filter(e => { if (e.closest('[data-scorre], .hide-tail')) return false; const q = e.getBoundingClientRect(); return q.bottom > R.bottom + 1.5 || q.right > R.right + 1.5 || q.top < R.top - 1.5 || q.left < R.left - 1.5; });
if (fuori.length) problemi.push(fuori.length + ' elementi escono (' + [...new Set(fuori.slice(0, 4).map(e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '')))].join(', ') + ')');
const scorre = tutti.filter(e => !e.closest('[data-scorre]') && !(e instanceof SVGElement) && (e.scrollHeight > e.clientHeight + 2 || e.scrollWidth > e.clientWidth + 2) && /auto|scroll|hidden/.test(getComputedStyle(e).overflow + getComputedStyle(e).overflowY + getComputedStyle(e).overflowX) && e.clientHeight > 0);
const scorreVero = scorre.filter(e => /auto|scroll/.test(getComputedStyle(e).overflowY + getComputedStyle(e).overflowX));
const tagliato = scorre.filter(e => !/auto|scroll/.test(getComputedStyle(e).overflowY + getComputedStyle(e).overflowX) && !e.classList.contains('katex') && e.scrollHeight > e.clientHeight + 6);
if (scorreVero.length) problemi.push('scorre dentro: ' + scorreVero.slice(0, 3).map(e => e.className || e.tagName).join(', '));
if (tagliato.length) problemi.push('contenuto tagliato in: ' + tagliato.slice(0, 3).map(e => (e.className && typeof e.className === 'string' ? e.className : e.tagName)).join(', '));
const piccoli = tutti.filter(e => e.matches('button, [role=button], input, select') && e.getBoundingClientRect().height < 35.5);
if (piccoli.length) problemi.push(piccoli.length + ' bersagli bassi (' + Math.round(Math.min(...piccoli.map(e => e.getBoundingClientRect().height))) + ' px)');
const testi = tutti.filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !e.closest('svg') && !e.closest('.vlist-s, .katex-mathml'));
const minFont = Math.min(99, ...testi.map(e => parseFloat(getComputedStyle(e).fontSize)));
if (minFont < 12) problemi.push('testo di ' + minFont + ' px');
const sc = st.querySelector('.lab-scena'); const q = sc ? sc.getBoundingClientRect() : null;
const quota = q ? Math.round(100 * q.width * q.height / (R.width * R.height)) : 0;
if (sc && quota < 40) problemi.push('scena al ' + quota + '% dello spazio');
if (!sc) problemi.push('manca .lab-scena');
const fondo = Math.max(...tutti.map(e => e.getBoundingClientRect().bottom));
if (R.bottom - fondo > R.height * 0.15) problemi.push('vuoto sotto: ' + Math.round(100 * (R.bottom - fondo) / R.height) + '% dello spazio');
return (problemi.length ? 'NO  ' + problemi.join(' · ') : 'ok') + '   [scena ' + quota + '%, stage ' + Math.round(R.width) + '×' + Math.round(R.height) + ']';
`;
const tmp = path.join(os.tmpdir(), 'prova-lab-' + process.pid + '.js');
fs.writeFileSync(tmp, MISURA);
let male = 0;
for (const [nome, w, h] of SCHERMI) {
  const args = [path.join(__dirname, 'banco.js'), `argomento/${argId}/lab/${labId}`, '--js', tmp, '--w', String(w), '--h', String(h), '--attesa', '2500'];
  if (foto) { fs.mkdirSync(foto, { recursive: true }); args.push('--shot', path.join(foto, `${labId}-${nome}.png`)); }
  if (scuro) args.push('--scuro');
  const r = spawnSync(process.execPath, args, { encoding: 'utf8' });
  const out = (r.stdout || '') + (r.stderr || '');
  const ris = (out.match(/risultato: (.*)/) || [, 'nessun risultato: ' + out.split('\n').slice(0, 3).join(' ')])[1];
  const err = /ERRORI:/.test(out) ? '  ERRORI IN CONSOLE: ' + out.split('ERRORI:')[1].split('risultato:')[0].trim().split('\n').slice(0, 2).join(' | ') : '';
  if (!/^ok/.test(ris) || err) male++;
  console.log(`${nome.padEnd(10)} ${String(w).padStart(4)}×${String(h).padEnd(5)} ${ris}${err}`);
}
fs.unlinkSync(tmp);
process.exit(male ? 1 : 0);
