'use strict';
/* Il discriminante e la parabola — le soluzioni di ax² + bx + c = 0 sono le ascisse dei punti in cui y = ax² + bx + c
   taglia l'asse x: con x² − 2x + c, c = −3 (Δ = 16, due punti), c = 1 (Δ = 0, tocca nel vertice), c = 3 (Δ = −8, nessuno);
   con a negativo, −x² + 2x − 3 (Δ = −8) sta tutta sotto. Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/discriminante', M => {
  const { W, C, E, P, life, kf, clamp, css, TITOLI, conFont, drawRich, richW, txt, fixedNum, fmtN,
    dot, glowStroke, arrowHead, makePlane, card } = M;
  // il simbolo dell'insieme vuoto è quello tondo di KaTeX_AMS (\varnothing del sito)
  if (typeof document !== 'undefined' && document.fonts) document.fonts.load('100px KaTeX_AMS').catch(() => {});

const FINE = 82.8, DUR = 94.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [17.0, 'felice'], [19.1, 'neutro'], [30.4, 'felice'], [32.5, 'neutro'],
  [43.0, 'sorpreso'], [45.1, 'neutro'], [47.7, 'felice'], [49.8, 'neutro'],
  [59.7, 'sorpreso'], [61.8, 'neutro'], [64.3, 'pensa'], [66.4, 'neutro'],
  [73.5, 'sorpreso'], [75.6, 'neutro'], [78.1, 'felice'], [80.2, 'neutro'], [87.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.6, 6.3, 'Quante soluzioni ha\n{mink:ax² + bx + c = 0}?'],
  // 1 · due punti
  [7.9, 12.5, 'Prendo {mink:x² − 2x − 3 = 0} e la\nparabola {mink:y = x² − 2x − 3}.'],
  [12.6, 16.9, 'Le soluzioni sono i valori di {mx:x}\ndove {my:y} è zero.'],
  [17.0, 21.5, 'Cioè le ascisse dei punti in cui\nla parabola taglia l\'asse {mx:x}.'],
  [21.6, 25.6, 'Qui sono due: {mink:x₁ = −1}\ne {mink:x₂ = 3}.'],
  [25.7, 30.3, 'Il {v:discriminante} {mink:Δ = b² − 4ac}\nqui vale 16.'],
  [30.4, 34.6, '{mink:Δ > 0}: due soluzioni reali\n{g:distinte}, due punti sull\'asse.'],
  // 2 · un punto
  [34.7, 38.6, 'Ora alzo {mink:c}: la parabola sale.'],
  [38.7, 42.9, 'Con {mink:c = 1}: {mink:Δ = 4 − 4 = 0}.'],
  [43.0, 47.6, 'La parabola {g:tocca} l\'asse in un solo\npunto: il vertice, in {mx:x}{mink: = 1}.'],
  [47.7, 52.2, '{mink:Δ = 0}: una soluzione sola, {g:doppia}:\n{mink:x₁ = x₂ = 1}.'],
  // 3 · nessun punto
  [52.3, 55.3, 'Alzo ancora {mink:c}…'],
  [55.4, 59.6, 'Con {mink:c = 3}: {mink:Δ = 4 − 12 = −8}.'],
  [59.7, 64.2, 'La parabola {r:non tocca} l\'asse {mx:x}:\nsta tutta sopra.'],
  [64.3, 68.6, '{mink:Δ < 0}: {r:nessuna soluzione reale},\nl\'insieme {mink:S} delle soluzioni è vuoto.'],
  [68.7, 73.4, 'Ora con {mink:a} negativo:\n{mink:−x² + 2x − 3 = 0}.'],
  [73.5, 78.0, 'È rivolta verso il basso, e {mink:Δ}\nfa ancora {mink:4 − 12 = −8}.'],
  [78.1, 82.6, 'Sta tutta {r:sotto} l\'asse {mx:x}:\nancora nessuna soluzione reale.'],
  // chiusura
  [85.3, 91.0, 'Due punti, uno, nessuno: lo dice\nil segno di {mink:Δ}.'],
];

// i coefficienti nel tempo: c sale due volte (mai mentre Ada parla di uno stato); poi a diventa negativo,
// con una dissolvenza incrociata (a non passa per lo zero)
const cT = t => kf(t, [[35.0, -3], [37.4, 1], [52.5, 1], [54.7, 3]]);
const SALTO = [69.0, 70.4];
function strati(t) {   // [[a, b, c, peso]]
  const k = P(t, SALTO[0], SALTO[1]);
  if (k <= 0) return [[1, -2, cT(t), 1]];
  if (k >= 1) return [[-1, 2, -3, 1]];
  return [[1, -2, 3, 1 - k], [-1, 2, -3, k]];
}
const PL = makePlane({ ox: 600, oy: 470, u: 62, x0: -5.4, x1: 7.2, y0: -4.8, y1: 5.1 });
const CARD = [150, 110, 1000, 690];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il discriminante e la parabola', W / 2, 180, { size: 108, weight: 600, local: t - 1.6, stagger: .12, alpha: al }));
  drawRich(ctx, '{mink:Δ = b² − 4ac}', W / 2, 340, { size: 72, local: t - 2.6, alpha: al });
}

// griglia e assi; i numeri li scrive numeri(), su un fondino, e li spegne dove stanno punti ed etichette
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * u - 8, { size: 44 });
  ctx.restore();
}
// i numeri degli assi su un fondino; dove passa la parabola un numero dell'asse y va dall'altra parte dell'asse,
// uno dell'asse x si spegne; si spengono anche sotto i punti e le etichette (ost)
function numeri(ctx, k, ost, curve) {
  const al = P(k, .6, 1); if (al <= 0) return;
  const passa = (x0, x1, y0, y1) => {
    for (const f of curve) for (let i = 0; i <= 10; i++) {
      const px = x0 + (x1 - x0) * i / 10, py = PL.oy - f((px - PL.ox) / PL.u) * PL.u;
      if (py > y0 - 6 && py < y1 + 6) return true;
    }
    return false;
  };
  const L = [];
  for (let i = Math.ceil(PL.x0); i <= PL.x1; i++) if (i) L.push([i, PL.ox + i * PL.u, PL.oy + 32, 'center']);
  for (let j = -4; j <= 4; j += 2) if (j) L.push([j, PL.ox - 20, PL.oy - j * PL.u, 'right']);
  for (let [n, x, y, align] of L) {
    const s = (n < 0 ? '−' : '') + Math.abs(n), w = 17 * s.length + 14;
    let cx = align === 'right' ? x + 2 - w / 2 : x;
    if (passa(cx - w / 2, cx + w / 2, y - 16, y + 16)) {
      if (align !== 'right') continue;
      x = PL.ox + 20; align = 'left'; cx = x - 2 + w / 2;
      if (passa(cx - w / 2, cx + w / 2, y - 16, y + 16)) continue;
    }
    let d = 1e9;
    for (const [px, py, r] of ost) d = Math.min(d, Math.hypot(Math.max(Math.abs(px - cx) - w / 2, 0), Math.max(Math.abs(py - y) - 16, 0)) - r);
    const a = al * clamp(d / 3);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.paper; ctx.fillRect(cx - w / 2, y - 16, w, 32); ctx.restore();
    txt(ctx, s, x, y, { size: 29, color: C.dim, align, alpha: a });
  }
}
// un numero importante sotto l'asse x, verde, su un fondino
function radice(ctx, s, x, al) {
  if (al <= 0) return;
  const y = PL.oy + 40, w = 26 * s.length + 22;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(x - w / 2, y - 26, w, 52); ctx.restore();
  txt(ctx, s, x, y, { size: 44, weight: 600, color: C.g, alpha: al });
}

// il piano con la parabola (7.5–82.8)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const A = 1 - P(t, FINE, FINE + .6);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const kAssi = P(t, 7.7, 8.7);
  assi(ctx, kAssi);
  // y = 0: l'asse x acceso mentre Ada lo dice
  const band = life(t, 12.8, 21.4, .5, .5);
  if (band > 0) {
    ctx.save(); ctx.globalAlpha *= band * .35; ctx.strokeStyle = css(C.g); ctx.lineWidth = 12; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(PL.toS(PL.x0, 0)[0], PL.oy); ctx.lineTo(PL.toS(PL.x1, 0)[0], PL.oy); ctx.stroke(); ctx.restore();
  }
  // la parabola (due, mentre a cambia segno), ritagliata nel riquadro del piano
  const kc = P(t, 8.6, 10.0);
  ctx.save(); ctx.beginPath(); ctx.rect(CARD[0] + 8, 165, CARD[2] - 16, CARD[1] + CARD[3] - 8 - 165); ctx.clip();
  for (const [a, b, c, w] of strati(t)) {
    const pts = PL.curve(x => a * x * x + b * x + c, -5.6, 7.4, 400);
    ctx.save(); ctx.globalAlpha *= w; glowStroke(ctx, pts, kc, C.y); ctx.restore();
  }
  ctx.restore();
  // i punti sull'asse x: le radici di x² − 2x + c, che si avvicinano e si fondono nel vertice
  const c = cT(t), ost = [];
  const kp = P(t, 17.2, 17.7, E.back) * (1 - P(t, 52.5, 52.9));
  const lab2 = life(t, 17.4, 34.9, .4, .3), lab1 = life(t, 43.2, 52.4, .4, .3);
  const rL = PL.toS(-1.6, 0)[0], rR = PL.toS(3.6, 0)[0], r1 = PL.toS(1, 0)[0];
  if (lab2 > .05) { ost.push([rL, PL.oy + 40, 26], [rR, PL.oy + 40, 22]); }
  if (lab1 > .05) ost.push([r1, PL.oy + 40, 22]);
  const pts = [];
  if (kp > 0 && c <= 1) { const d = Math.sqrt(1 - c); pts.push(PL.toS(1 - d, 0), PL.toS(1 + d, 0)); }
  for (const p of pts) ost.push([p[0], p[1], 22]);
  numeri(ctx, kAssi, ost, strati(t).filter(q => q[3] > .1).map(([a, b, c]) => x => a * x * x + b * x + c));
  for (const p of pts) dot(ctx, p, C.g, kp, 11);
  radice(ctx, '−1', rL, lab2);
  radice(ctx, '3', rR, lab2);
  radice(ctx, '1', r1, lab1);
  ctx.restore();
}

// l'equazione con i numeri di adesso (una cifra decimale mentre c cambia)
function num(v) { return Math.abs(v).toFixed(1).replace(/\.0$/, '').replace('.', ','); }
function equazione(a, b, c) {
  const r = v => parseFloat(v.toFixed(1)), T = [];
  if (r(a)) T.push([r(a) < 0, (Math.abs(r(a)) === 1 ? '' : num(a)) + 'x²']);
  if (r(b)) T.push([r(b) < 0, (Math.abs(r(b)) === 1 ? '' : num(b)) + 'x']);
  if (r(c)) T.push([r(c) < 0, num(c)]);
  return '{mink:' + T.map(([neg, s], i) => (i ? (neg ? ' − ' : ' + ') : (neg ? '−' : '')) + s).join('') + ' = 0}';
}
// «S = ∅» col simbolo tondo del sito (\varnothing di KaTeX, nel font KaTeX_AMS), centrato in x
function conVuoto(ctx, prima, x, y, size, col, al = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const f = `${Math.round(size * 1.12)}px KaTeX_AMS, "Cambria Math", serif`;
  ctx.font = f; const w2 = ctx.measureText('∅').width, w1 = richW(ctx, prima, size), x0 = x - (w1 + w2) / 2;
  drawRich(ctx, prima, x0, y, { size, align: 'left' });
  ctx.font = f; ctx.fillStyle = css(col); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText('∅', x0 + w1, y);
  ctx.restore();
}
const CR = 1530;
// i quattro stati fermi: [comparsa, uscita, conto, risultato, verdetto, soluzioni]
const STATI = [
  [25.9, 34.9, '{mink:= (−2)² − 4 · 1 · (−3)}', '{mink:= 4 + 12 = }{mg:16}', [30.5, '{mink:Δ > 0}', '{g:due soluzioni distinte}'], [21.7, '{mink:x₁ = −1,   x₂ = 3}']],
  [38.9, 52.4, '{mink:= (−2)² − 4 · 1 · 1}', '{mink:= 4 − 4 = }{mg:0}', [47.8, '{mink:Δ = 0}', '{g:una sola, doppia}'], [47.9, '{mink:x₁ = x₂ = 1}']],
  [55.6, 68.8, '{mink:= (−2)² − 4 · 1 · 3}', '{mink:= 4 − 12 = }{mr:−8}', [64.4, '{mink:Δ < 0}', '{r:nessuna soluzione reale}'], [64.5, null]],
  [73.7, FINE + .6, '{mink:= 2² − 4 · (−1) · (−3)}', '{mink:= 4 − 12 = }{mr:−8}', [78.2, '{mink:Δ < 0}', '{r:nessuna soluzione reale}'], [78.3, null]],
];
function sceneScheda(ctx, t) {
  const ca = life(t, 8.0, FINE + .6, .5, .6);
  if (ca <= 0) return;
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, 1210, 110, 640, 690);
  conFont(TITOLI, () => drawRich(ctx, '{dim:l\'equazione}', CR, 162, { size: 34, weight: 600 }));
  // mentre a cambia segno, prima sparisce la vecchia equazione e poi compare la nuova
  for (const [a, b, c, w] of strati(t)) drawRich(ctx, equazione(a, b, c), CR, 232, { size: 50, alpha: clamp(2 * w - 1) });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1250, 284); ctx.lineTo(1810, 284); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1250, 562); ctx.lineTo(1810, 562); ctx.stroke();
  drawRich(ctx, '{mink:Δ = b² − 4ac}', CR, 345, { size: 48, local: t - 25.9 });
  for (const [a0, a1, conto, ris, [tv, fv, sv], [ts, sol]] of STATI) {
    const k = life(t, a0, a1, .4, .3); if (k <= 0) continue;
    ctx.save(); ctx.globalAlpha *= k;
    drawRich(ctx, conto, CR, 425, { size: 44, local: t - a0 });
    drawRich(ctx, ris, CR, 503, { size: 44, local: t - a0 - .5 });
    const kv = P(t, tv, tv + .4);
    if (kv > 0) {
      const w1 = richW(ctx, fv, 42), w2 = richW(ctx, sv, 32, 500), x0 = CR - (w1 + 24 + w2) / 2;
      drawRich(ctx, fv, x0, 625, { size: 42, align: 'left', alpha: kv });
      drawRich(ctx, sv, x0 + w1 + 24, 625, { size: 32, align: 'left', alpha: kv });
    }
    const ks = P(t, ts, ts + .4);
    if (ks > 0) { if (sol) drawRich(ctx, sol, CR, 718, { size: 46, alpha: ks }); else conVuoto(ctx, '{mink:S = }', CR, 718, 50, C.r, ks); }
    ctx.restore();
  }
  // mentre c cambia: il suo valore e Δ, che cambiano insieme
  const kl = Math.max(life(t, 35.0, 38.8, .3, .3), life(t, 52.5, 55.5, .3, .3));
  if (kl > 0) {
    const c = cT(t);
    ctx.save(); ctx.globalAlpha *= kl;
    drawRich(ctx, '{mink:c =}', 1420, 425, { size: 44, align: 'right' });
    fixedNum(ctx, fmtN(c, 1), 1600, 425, 44, C.ink);
    drawRich(ctx, '{mink:Δ =}', 1420, 503, { size: 44, align: 'right' });
    fixedNum(ctx, fmtN(4 - 4 * c, 1), 1600, 503, 44, C.v);
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (82.8–94.0): tre schede, ciascuna con la sua piccola parabola
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il segno di {mink:Δ} dice quante volte\nla parabola incontra l\'asse {mx:x}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[540, 1, '{mink:Δ > 0}', 'due punti'], [960, 0, '{mink:Δ = 0}', 'un punto, il vertice'], [1380, -1, '{mink:Δ < 0}', 'nessun punto']];
  pills.forEach(([x, q, f, s], i) => {
    const a0 = FINE + 2.6 + i * .5, k = P(t, a0, a0 + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 565); ctx.scale(k, k); ctx.translate(-x, -565);
    card(ctx, x - 190, 410, 380, 310);
    // l'asse e la parabola in piccolo: y = oy − 22 · (v² − r), con r > 0, r = 0, r < 0
    const ox = x, oy = 580, u = 34, r = q === 1 ? 1.6 : q === 0 ? 0 : -1;
    ctx.save(); ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox - 2.7 * u, oy); ctx.lineTo(ox + 2.7 * u, oy); ctx.stroke(); ctx.restore();
    const pts = []; for (let j = 0; j <= 60; j++) { const v = -2 + 4 * j / 60; pts.push([ox + v * u, oy - 22 * (v * v - r)]); }
    glowStroke(ctx, pts, 1, C.y, 4);
    if (r > 0) { dot(ctx, [ox - Math.sqrt(r) * u, oy], C.g, 1, 8); dot(ctx, [ox + Math.sqrt(r) * u, oy], C.g, 1, 8); }
    if (r === 0) dot(ctx, [ox, oy], C.g, 1, 8);
    drawRich(ctx, f, x, 650, { size: 44 });
    drawRich(ctx, q < 0 ? `{r:${s}}` : `{g:${s}}`, x, 694, { size: 32 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il discriminante e la parabola', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 34.6, '{mink:Δ > 0}: due punti'], [34.6, 52.2, '{mink:Δ = 0}: un punto'], [52.2, FINE, '{mink:Δ < 0}: nessun punto']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
