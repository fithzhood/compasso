/* Compasso — controllo di compatibilità con gli iPad vecchi (Safari 12, iOS 12).
   uso:  node strumenti/compatibilita.js            (controlla tutti i .js del sito)
         node strumenti/compatibilita.js file.js…   (solo quelli)
   Esce con 1 se trova sintassi che Safari vecchio non capisce: un solo errore di sintassi
   fa saltare l'intero file, e se il file è compasso.js il sito resta bianco (successo a ottobre 2026
   con due regex con lookbehind, che Safari capisce solo da iOS 16.4).
   acorn sta in strumenti/node_modules (non si pubblica). */
const fs = require('fs'), path = require('path');
const acorn = require('./node_modules/acorn'), walk = require('./node_modules/acorn-walk');
const RADICE = path.resolve(__dirname, '..');

let file = process.argv.slice(2);
if (!file.length) {
  file = fs.readdirSync(RADICE).filter(f => f.endsWith('.js')).map(f => path.join(RADICE, f));
  for (const d of ['lib/katex', 'argomenti', 'laboratori']) {
    const dir = path.join(RADICE, d);
    if (fs.existsSync(dir)) fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => file.push(path.join(dir, f)));
  }
}

/* API che mancano in Safari 12 e che rompono il file al primo uso (quelle con un ripiego già scritto
   nel codice, come ResizeObserver, vanno guardate a mano) */
const METODI = ['at', 'replaceAll', 'findLast', 'findLastIndex', 'hasOwn', 'matchAll', 'allSettled', 'toSorted', 'toReversed', 'toSpliced', 'groupBy', 'randomUUID', 'replaceChildren'];
const GLOBALI = ['structuredClone', 'globalThis', 'queueMicrotask'];

let problemi = 0;
for (const f of file) {
  const nome = path.relative(RADICE, f), src = fs.readFileSync(f, 'utf8');
  const dove = n => nome + ':' + n.loc.start.line + ':' + (n.loc.start.column + 1);
  try { acorn.parse(src, { ecmaVersion: 2018, locations: true, allowHashBang: true }); }
  catch (e) { problemi++; console.log('SINTASSI TROPPO NUOVA', nome + ':' + (e.loc ? e.loc.line + ':' + (e.loc.column + 1) : ''), '—', e.message.replace(/\s*\(\d+:\d+\)$/, '')); continue; }
  const ast = acorn.parse(src, { ecmaVersion: 'latest', locations: true, allowHashBang: true });
  walk.full(ast, n => {
    if (n.type === 'Literal' && n.regex) {
      if (/\(\?<[=!]/.test(n.regex.pattern)) { problemi++; console.log('REGEX CON LOOKBEHIND', dove(n), '— Safari lo capisce solo da iOS 16.4'); }
      if (/\\p\{/i.test(n.regex.pattern) || /[dv]/.test(n.regex.flags)) { problemi++; console.log('REGEX TROPPO NUOVA', dove(n), '/' + n.regex.pattern + '/' + n.regex.flags); }
    }
    if (n.type === 'MemberExpression' && !n.computed && METODI.includes(n.property.name)) { problemi++; console.log('METODO TROPPO NUOVO', dove(n), '.' + n.property.name); }
    if (n.type === 'Identifier' && GLOBALI.includes(n.name)) { problemi++; console.log('OGGETTO TROPPO NUOVO', dove(n), n.name); }
    if (n.type === 'NewExpression' && n.callee.type === 'Identifier' && n.callee.name === 'RegExp' && n.arguments[0] && n.arguments[0].type === 'Literal' && /\(\?<[=!]/.test(String(n.arguments[0].value))) { problemi++; console.log('REGEX CON LOOKBEHIND', dove(n)); }
  });
  /* matchMedia(...).addEventListener manca prima di iOS 14: serve il ripiego addListener */
  const righe = src.split('\n');
  righe.forEach((r, i) => { if (/matchMedia\([^)]*\)\.addEventListener/.test(r)) { problemi++; console.log('MATCHMEDIA SENZA RIPIEGO', nome + ':' + (i + 1), '— usare addListener se addEventListener manca'); } });
}
console.log(problemi ? `\n${problemi} problemi di compatibilità in ${file.length} file` : `compatibilità iPad vecchi: ${file.length} file ok`);
process.exit(problemi ? 1 : 0);
