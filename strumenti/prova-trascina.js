/* Da usare con il banco: node strumenti/banco.js argomento/<id>/teoria --js strumenti/prova-trascina.js
   Trascina ogni punto mobile di ogni grafico e dice se il disegno cambia (FERMO = non si muove)
   e se compaiono testi strani (NaN, undefined, ?). */
const out = [];
const figs = [...document.querySelectorAll('.cg-figura')];
for (const [fi, f] of figs.entries()) {
  const man = [...f.querySelectorAll('.cg-maniglia')];
  for (const [mi] of man.entries()) {
    const m = f.querySelectorAll('.cg-maniglia')[mi]; if (!m) continue;
    m.scrollIntoView({ block: 'center' }); await attendi(80);
    const svg = f.querySelector('svg'); const prima = svg.innerHTML;
    const r = m.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2;
    await trascina(m, [x, y], [x + 35, y - 25], 8); await attendi(80);
    const dopo = svg.innerHTML;
    const testi = [...svg.querySelectorAll('text')].map(t => t.textContent).filter(t => /NaN|undefined|\?/.test(t));
    out.push(`fig${fi} man${mi}: ${prima === dopo ? 'FERMO' : 'si muove'}${testi.length ? ' TESTO-STRANO ' + testi.join('|') : ''}`);
  }
}
return out.join('\n') || 'nessun punto trascinabile';
