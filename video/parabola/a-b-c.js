'use strict';
/* Che cosa fanno a, b e c — in y = ax² + bx + c: a dà la forma, c dove taglia l'asse y, b (insieme ad a)
   sposta il vertice, di lato e in su o in giù. Argomento: parabola. */
CVIDEO.registra('parabola/a-b-c', M => {
  const { W, C, E, P, life, kf, clamp, css, TITOLI, conFont, drawRich, drawSeq, txt, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, makePlane, card } = M;

const POSA = {
  x: [[0, 760], [6.5, 760], [7.7, 190], [90.9, 190], [92.2, 420]],
  y: [[0, 900], [6.5, 900], [7.7, 1050], [90.9, 1050], [92.2, 1035]],
  s: [[0, 4.4], [6.5, 4.4], [7.7, 2.2], [90.9, 2.2], [92.2, 3.0]],
  lx: [[0, 0], [6.5, 0], [7.7, 2], [90.9, 2], [92.2, 1.5]],
  ly: [[0, 0], [6.5, 0], [7.7, -1.5], [90.9, -1.5], [92.2, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [6.5, 'neutro'],
  [16.1, 'sorpreso'], [18.2, 'neutro'], [22.8, 'felice'], [24.9, 'neutro'], [29.0, 'sorpreso'], [31.1, 'neutro'],
  [44.9, 'felice'], [47.0, 'neutro'],
  [54.9, 'felice'], [57.0, 'neutro'], [60.6, 'sorpreso'], [62.7, 'neutro'], [65.1, 'felice'], [67.2, 'neutro'],
  [69.3, 'pensa'], [71.4, 'felice'], [73.5, 'neutro'],
  [80.3, 'pensa'], [82.4, 'neutro'], [85.6, 'festa'], [88.0, 'felice'], [90.1, 'neutro'],
  [97.3, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [1.5, 6.5, 'Che cosa fa ciascuno dei tre\nnumeri {mink:a}, {mink:b} e {mink:c}?'],
  // 1 · a
  [8.0, 13.9, 'Parto da {mink:y = }{mx:x}{mink:²}:\n{mink:a} vale 1, {mink:b} e {mink:c} valgono 0.'],
  [16.0, 20.4, 'Con {mink:a} più grande\nla parabola si {g:stringe}.'],
  [22.7, 26.8, 'Con {mink:a} vicino a zero\nsi {g:allarga}.'],
  [28.9, 34.0, 'Con {mink:a} negativo si {v:capovolge}:\nè rivolta verso il basso.'],
  [35.35, 37.4, 'Rimetto {mink:a = 1}.'],
  // 2 · c
  [38.9, 42.7, 'Abbasso {mink:c}: la parabola {g:scende}.'],
  [44.8, 48.4, 'Alzo {mink:c}: la parabola {g:sale}.'],
  [48.6, 54.5, 'Taglia l\'asse {mx:y} proprio in {mink:c}:\ncon {mx:x}{mink: = 0} resta {mink:y = c}.'],
  // 3 · b
  [54.8, 58.2, 'Ecco il {v:vertice}, {mink:V}.'],
  [60.5, 64.9, 'Cambio {mink:b}: il vertice va {g:di lato}\ne anche {g:in basso}.'],
  [65.0, 69.1, 'Il tratteggio è la {v:strada}\nche ha fatto il vertice.'],
  [69.2, 73.5, 'Ma la curva passa ancora\nper {g:(0; 2)}.'],
  [76.2, 80.1, 'Con {mink:b} positivo\nva {g:dall\'altra parte}.'],
  [80.2, 85.4, 'Il vertice sta sulla retta\n{mink:x = −b / (2a)}.'],
  [85.5, 90.7, 'Con questi numeri:\n{mink:−4 / (2 · 1) = }{g:−2}.'],
  // chiusura
  [92.8, 98.4, '{mink:a} dà la forma, {mink:c} dove taglia l\'asse {mx:y},\n{mink:b}, insieme ad {mink:a}, sposta il vertice.'],
];

// i tre numeri nel tempo: si muove uno solo alla volta, e mai mentre Ada parla
const aT = t => kf(t, [[14.1, 1], [15.9, 3], [20.6, 3], [22.6, .3], [27.0, .3], [28.8, -1], [34.1, -1], [35.3, 1]]);   // dentro i SALTI non si usa
const cT = t => kf(t, [[37.4, 0], [38.8, -3], [42.9, -3], [44.7, 2]]);
const bT = t => kf(t, [[58.4, 0], [60.4, -4], [73.7, -4], [76.1, 4]]);
// a non passa mai per lo zero (a ≠ 0): salta da un valore all'altro con una dissolvenza incrociata
const SALTI = [[27.0, 28.8, .3, -1], [34.1, 35.3, -1, 1]];
function strati(t) {
  for (const [t0, t1, a0, a1] of SALTI) if (t > t0 && t < t1) { const k = P(t, t0, t1); return [[a0, 1 - k], [a1, k]]; }
  return [[aT(t), 1]];
}
const PL = makePlane({ ox: 650, oy: 500, u: 58, x0: -7, x1: 7, y0: -4.5, y1: 5.5, ystep: 99 });
const CARD = [150, 110, 1000, 690];
const FINE = 90.8;
const T2 = 73.7;   // b riparte da −4 verso 4

// l'equazione con i numeri di adesso, all'italiana (una cifra decimale mentre cambiano)
// arrotonda come i cursori (toFixed), così equazione e cursori dicono lo stesso numero
function num(v) { return Math.abs(v).toFixed(1).replace(/\.0$/, '').replace('.', ','); }
function equazione(a, b, c) {
  const termini = [];
  const r = v => parseFloat(v.toFixed(1));
  if (r(a)) termini.push([r(a) < 0, (Math.abs(r(a)) === 1 ? '' : '{mink:' + num(a) + '}') + '{mx:x}{mink:²}']);
  if (r(b)) termini.push([r(b) < 0, (Math.abs(r(b)) === 1 ? '' : '{mink:' + num(b) + '}') + '{mx:x}']);
  if (r(c)) termini.push([r(c) < 0, '{mink:' + num(c) + '}']);
  if (!termini.length) return '{mink:y = 0}';
  return '{mink:y = }' + termini.map(([neg, s], i) => (i ? (neg ? '{mink: − }' : '{mink: + }') : (neg ? '{mink:−}' : '')) + s).join('');
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Che cosa fanno {v:a}, {v:b} e {v:c}', W / 2, 170, { size: 110, weight: 600, local: t - 1.6, stagger: .12, alpha: al }));
  drawRich(ctx, '{mink:y = }{mv:a}{mx:x}{mink:² + }{mv:b}{mx:x}{mink: + }{mv:c}', W / 2, 330, { size: 72, local: t - 2.6, alpha: al });
}

// la scia del vertice: con a = 1 e c = 2 il vertice scorre su y = 2 − x²
const scia = x => 2 - x * x;
function sciaTratto(t) {   // il tratto [da; a] in x già percorso dal vertice
  if (t < 58.4) return null;
  const xv = -bT(t) / 2;
  return t < T2 ? [0, Math.max(0, xv)] : [Math.min(0, xv), 2];
}
// l'etichetta V: dalla parte opposta alla scia, e si spegne mentre passa sull'asse x
function etichettaV(t, V) {
  const y = V[1] + 42;
  return [V[0] + kf(t, [[T2 - .1, 30], [T2 + .5, -30]]), y, clamp((Math.abs(y - PL.oy) - 32) / 10)];
}
// griglia e assi; i numeri li scrive numeri(), che li spegne dove passano curve e punti
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -7; i <= 7; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = -4; j <= 5; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
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
// i numeri degli assi su un fondino di carta, sopra curva, scia e tratteggio che li attraversano;
// spariscono solo se ci sta sopra un punto o la sua etichetta (ost)
function numeri(ctx, k, ost) {
  const al = P(k, .6, 1); if (al <= 0) return;
  const L = [];
  for (let i = -7; i <= 7; i++) if (i) L.push([i, PL.ox + i * PL.u, PL.oy + 32, 'center']);
  // niente −1 sull'asse y: toccherebbe il −1 dell'asse x
  for (let j = -4; j <= 5; j++) if (j && j !== -1) L.push([j, PL.ox - 20, PL.oy - j * PL.u, 'right']);
  for (const [n, x, y, align] of L) {
    const s = (n < 0 ? '−' : '') + Math.abs(n), w = 17 * s.length + 14, cx = align === 'right' ? x + 2 - w / 2 : x;
    let d = 1e9;
    for (const [px, py, r] of ost) d = Math.min(d, Math.hypot(Math.max(Math.abs(px - cx) - w / 2, 0), Math.max(Math.abs(py - y) - 16, 0)) - r);
    const a = al * clamp(d / 3);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.paper; ctx.fillRect(cx - w / 2, y - 16, w, 32); ctx.restore();
    txt(ctx, s, x, y, { size: 29, color: C.dim, align, alpha: a });
  }
}

// il piano con la parabola (7.5–90.8)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const A = 1 - P(t, FINE, FINE + .6);
  const b = bT(t), c = cT(t), S = strati(t), a = S[S.length - 1][0];
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // prima la geometria: dove stanno i punti e le loro etichette (lì i numeri degli assi spariscono)
  const ost = [];
  const add = (x, y, r) => ost.push([x, y, r]);
  const kc = P(t, 8.4, 9.6);
  const curve = S.map(([ak, w]) => [PL.curve(x => ak * x * x + b * x + c, -7.3, 7.3, 400), w]);
  // il vertice
  const xv = -b / (2 * a), yv = c - b * b / (4 * a), V = PL.toS(xv, yv);
  const va = life(t, 54.7, FINE, .4, .3), [lvx, lvy, lva] = etichettaV(t, V);
  if (va > .05) { add(V[0], V[1], 14); if (va * lva > .05) add(lvx, lvy, 20); }
  // il punto (0; 2), solo quando se ne parla e la curva è ferma; l'etichetta dove curva e scia non passano
  const due = Math.max(life(t, 48.7, 54.5, .4, .4), life(t, 69.3, 73.5, .4, .4));
  const Q = PL.toS(0, c), LQ = t < 62 ? [Q[0] + 92, Q[1] + 32] : [Q[0] + 92, Q[1] - 38];
  if (due > .05) { add(Q[0], Q[1], 14); for (let dx = -60; dx <= 60; dx += 15) add(LQ[0] + dx, LQ[1], 22); }
  // l'asse di simmetria, tratteggiato
  const asse = life(t, 80.3, FINE, .5, .3), ka = P(t, 80.3, 81.2);
  const A0 = PL.toS(xv, -4.4), A1 = PL.toS(xv, 5.4);
  // la scia del vertice: resta segnata finché non arriva l'asse
  const tr = sciaTratto(t), sa = life(t, 58.4, 80.6, .3, .3);
  const sciaPts = tr && tr[1] - tr[0] > .01 ? PL.curve(scia, tr[0], tr[1], 200) : null;

  assi(ctx, P(t, 7.7, 8.7));
  if (asse > 0) dashed(ctx, A0, A1, C.v, ka, asse);
  if (sciaPts && sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa * .85; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([3, 11]);
    ctx.beginPath(); sciaPts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore();
  }
  // la curva (due, mentre a salta), ritagliata: sotto la «y» dell'asse si ferma più in basso
  const L0 = CARD[0] + 8, R0 = CARD[0] + CARD[2] - 8, B0 = CARD[1] + CARD[3] - 8;
  ctx.save(); ctx.beginPath();
  ctx.moveTo(L0, 182); ctx.lineTo(652, 182); ctx.lineTo(652, 205); ctx.lineTo(722, 205); ctx.lineTo(722, 182);
  ctx.lineTo(R0, 182); ctx.lineTo(R0, B0); ctx.lineTo(L0, B0); ctx.closePath(); ctx.clip();
  for (const [pts, w] of curve) { ctx.save(); ctx.globalAlpha *= w; glowStroke(ctx, pts, kc, C.y); ctx.restore(); }
  ctx.restore();
  numeri(ctx, P(t, 7.7, 8.7), ost);
  // durante il conto: −2 in verde sotto l'asse x, ai piedi del tratteggio
  const g2 = life(t, 85.5, FINE, .4, .3);
  if (g2 > 0) {
    const p = PL.toS(-2, 0);
    ctx.save(); ctx.globalAlpha *= g2; ctx.fillStyle = C.paper; ctx.fillRect(p[0] - 38, p[1] + 12, 76, 50); ctx.restore();
    txt(ctx, '−2', p[0], p[1] + 37, { size: 44, weight: 600, color: C.g, alpha: g2 });
  }
  if (due > 0) {
    dot(ctx, Q, C.g, due, 11);
    drawRich(ctx, '{g:(0; 2)}', LQ[0], LQ[1], { size: 44, alpha: due });
  }
  if (va > 0) {
    dot(ctx, V, C.v, P(t, 54.7, 55.1, E.back), 11);
    drawRich(ctx, '{mv:V}', lvx, lvy, { size: 40, alpha: va * lva });
  }
  ctx.restore();
}

// la scheda a destra: l'equazione e i tre cursori
const RIGHE = [['a', 340, aT, 3, [7.5, 37.4]], ['b', 432, bT, 6, [54.6, FINE]], ['c', 524, cT, 6, [37.4, 54.6]]];
function sceneScheda(ctx, t) {
  const ca = life(t, 8.2, FINE + .6, .5, .6);
  if (ca <= 0) return;
  const b = bT(t), c = cT(t), S = strati(t);
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, 1210, 110, 640, 690);
  conFont(TITOLI, () => drawRich(ctx, '{dim:la parabola}', 1530, 162, { size: 32, weight: 600 }));
  // mentre a salta, prima sparisce la vecchia equazione e poi compare la nuova
  for (const [a, w] of S) drawRich(ctx, equazione(a, b, c), 1530, 232, { size: 52, alpha: clamp(2 * w - 1) });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 288); ctx.lineTo(1810, 288); ctx.stroke();
  for (const [n, y, fn, R, [t0, t1]] of RIGHE) {
    const att = life(t, t0, t1, .3, .3), col = att > .5 ? C.v : C.dim;
    drawRich(ctx, `{m${att > .5 ? 'v' : 'dim'}:${n}}`, 1262, y, { size: 52 });
    const x0 = 1320, x1 = 1640, xm = (x0 + x1) / 2;
    ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xm, y - 14); ctx.lineTo(xm, y + 14); ctx.stroke(); ctx.restore();
    for (const [v, w] of (n === 'a' ? S : [[fn(t), 1]])) {
      ctx.save(); ctx.globalAlpha *= w;
      dot(ctx, [xm + v / R * (x1 - x0) / 2, y], col, 1, att > .5 ? 15 : 12);
      fixedNum(ctx, fmtN(v, 1), 1812, y, 46, col, clamp(2 * w - 1) / Math.max(w, .01));
      ctx.restore();
    }
  }
  // il vertice: la formula, poi i conti con questi numeri (una forma sola, in riga)
  const fa = P(t, 80.3, 80.9);
  if (fa > 0) {
    ctx.save(); ctx.globalAlpha *= fa;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 556); ctx.lineTo(1810, 556); ctx.stroke();
    drawSeq(ctx, ['{mink:x = −}', { num: '{mink:b}', den: '{mink:2a}' }], 1530, 616, 44, { local: t - 80.4 });
    ctx.restore();
  }
  if (t > 85.6) drawSeq(ctx, ['{mink:x = −}', { num: '{mink:4}', den: '{mink:2 · 1}' }, '{mink: = }{mg:−2}'], 1530, 718, 44, { local: t - 85.6 });
  ctx.restore();
}

// chiusura (91.0–101.3)
function sceneFine(ctx, t) {
  if (t < 91.0) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 91.3 });
    drawRich(ctx, 'Ogni numero cambia\nuna cosa diversa della parabola.', W / 2, 290, { size: 64, weight: 600, local: t - 91.7, stagger: .08 });
  });
  const pills = [[490, 'stretta, larga, capovolta', '{mv:a}'], [960, 'dove taglia l\'asse {mx:y}', '{mink:y = }{mv:c}'], [1430, 'la {mx:x} del vertice', ['{mink:x = −}', { num: '{mv:b}', den: '{mink:2}{mv:a}' }]]];
  pills.forEach(([px, testa, f], i) => {
    const a0 = 93.3 + i * .5, k = P(t, a0, a0 + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 440, 430, 175);
    drawRich(ctx, testa, px, 486, { size: 30, weight: 400 });
    if (Array.isArray(f)) drawSeq(ctx, f, px, 562, 42); else drawRich(ctx, f, px, 556, { size: 46 });
    ctx.restore();
  });
}

  return {
    titolo: 'Che cosa fanno a, b e c', durata: 101.3, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 37.4, '{mink:a}: la forma'], [37.4, 54.6, '{mink:c}: su e giù'], [54.6, 90.8, '{mink:b}: il vertice']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
