'use strict';
/* L’ellisse fuori centro — x² + 4y² − 2x − 16y + 13 = 0: completando i quadrati diventa
   (x − 1)²/4 + (y − 2)² = 1. È l'ellisse x²/4 + y² = 1 (semiassi a = 2, b = 1) spostata di 1 a destra e di 2
   in alto: centro (1; 2), vertici A(−1; 2), A′(3; 2), B(1; 1), B′(1; 3), c² = 4 − 1 = 3, fuochi (1 ± √3; 2).
   Nomi e notazioni come in argomenti/ellisse-iperbole.js. Argomento: ellisse-iperbole. */
CVIDEO.registra('ellisse-iperbole/traslata', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, arrowHead, makePlane, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['eq', 5.4, 'Oltre a {mx:x²} e {my:y²} ci sono\n{mx:x} e {my:y} da soli.'],
  ['raggruppo', 5.4, 'Metto vicini i termini in {mx:x}, poi in {my:y},\nraccogliendo il 4.'],
  ['quadrati', 6.6, 'Completo i quadrati con {g:1} e con {g:4};\na destra aggiungo {g:1} e {g:4 · 4 = 16}.'],
  ['riconosco', 7.0, 'Le parentesi sono quadrati di binomio:\n{mx:(x − 1)²} e {my:(y − 2)²}.'],
  ['porto', 4.6, 'Porto il 13 a destra:\n{mink:1 + 16 − 13 = 4}.'],
  ['divido', 4.4, 'Divido tutto per 4:\na destra resta 1.'],
  ['somiglia', 7.2, 'È come {mink:x²/4 + y² = 1},\nl’ellisse con centro in {mink:O}.', .4],
  ['semiassi', 5.0, 'Semiassi {mink:a = 2} e {mink:b = 1}:\nè larga 4 e alta 2.'],
  ['sostituz', 6.0, 'Qui però c’è {mx:x − 1} al posto di {mx:x}\ne {my:y − 2} al posto di {my:y}…'],
  ['sposta', 5.0, '…quindi l’ellisse si sposta di {x:1}\na destra e di {y:2} in alto.'],
  ['centro', 3.8, 'Il {g:centro} ora è {g:(1; 2)}.'],
  ['vertA', 5.6, 'I vertici si spostano con lei:\n{mink:A(−1; 2)} e {mink:A′(3; 2)}…'],
  ['vertB', 4.0, '…{mink:B(1; 1)} e {mink:B′(1; 3)}.'],
  ['c', 7.2, 'La semidistanza focale: {mink:c² = 4 − 1 = 3},\ncioè {mink:c = √3}.'],
  ['F', 8.2, 'I fuochi, a {mink:√3} dal centro:\n{mink:F₁(1 − √3; 2)} e {mink:F₂(1 + √3; 2)}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Un’equazione con tanti termini:\nche curva disegna?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Completando i quadrati trovi il centro:\nè la stessa ellisse, spostata.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.porto, 'felice'], [T.porto + 2.2, 'neutro'], [T.somiglia, 'sorpreso'], [T.somiglia + 2.4, 'neutro'],
  [T.centro, 'festa'], [T.centro + 2.4, 'neutro'], [T.F, 'felice'], [T.F + 2.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const lab = (ctx, s, x, y, al, size = 44, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’ellisse fuori centro', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
  drawRich(ctx, '{mink:x² + 4y² − 2x − 16y + 13 = 0}', W / 2, 340, { size: 64, local: t - 2.6, alpha: al });
}

// 1 · completare i quadrati (7.5–T.somiglia)
const RIGHE = [
  ['eq', 235, '{mx:x²}{mink: + }{my:4y²}{mink: − }{mx:2x}{mink: − }{my:16y}{mink: + 13 = 0}'],
  ['raggruppo', 325, '{mx:x² − 2x}{mink: + }{my:4(y² − 4y)}{mink: + 13 = 0}'],
  ['quadrati', 415, '{mx:(x² − 2x }{mg:+ 1}{mx:)}{mink: + }{my:4(y² − 4y }{mg:+ 4}{my:)}{mink: + 13 = }{mg:1 + 16}'],
  ['riconosco', 505, '{mx:(x − 1)²}{mink: + }{my:4(y − 2)²}{mink: + 13 = 1 + 16}'],
  ['porto', 595, '{mx:(x − 1)²}{mink: + }{my:4(y − 2)²}{mink: = 4}'],
];
function sceneConti(ctx, t) {
  if (t < 7.5 || t > T.somiglia + .1) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, T.somiglia - .45, T.somiglia);
  card(ctx, 150, 110, 1620, 690, P(t, 7.5, 8.2));
  conFont(TITOLI, () => drawRich(ctx, 'completo i quadrati', W / 2, 160, { size: 40, weight: 600, alpha: P(t, 7.8, 8.3) }));
  for (const [k, y, s] of RIGHE) if (t > T[k] + .3) drawRich(ctx, s, W / 2, y, { size: 52, local: t - T[k] - .3, stagger: .06 });
  if (t > T.divido + .3) drawSeq(ctx, [{ num: '{mx:(x − 1)²}', den: '{mink:4}' }, '{mink: + }{my:(y − 2)²}{mink: = 1}'], W / 2, 708, 56, { local: t - T.divido - .3 });
  ctx.restore();
}

// 2 · il piano: l'ellisse al centro, poi spostata (T.somiglia–FINE)
const PL = makePlane({ ox: 436, oy: 577, u: 110, x0: -2.6, x1: 4.4, y0: -1.6, y1: 3.7 });
const RQ = [70, 110, 930, 690];
const S3 = Math.sqrt(3);
// il centro: fermo, poi 1 a destra e 2 in alto mentre Ada lo dice
const cx = t => P(t, T.sposta + .3, T.sposta + 1.5, E.io), cy = t => 2 * P(t, T.sposta + 1.6, T.sposta + 3.0, E.io);
function ellisse(x0, y0, k = 1, n = 240) {
  const p = []; for (let i = 0; i <= n * k; i++) { const a = Math.PI / 2 + 2 * Math.PI * i / n; p.push(PL.toS(x0 + 2 * Math.cos(a), y0 + Math.sin(a))); } return p;
}
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
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}
// i numeri degli assi, spostati dove l'ellisse non passa (posizioni controllate con uno script): una serie di
// posizioni con l'ellisse nell'origine e una con l'ellisse in (1; 2); mentre si sposta, i numeri scivolano.
// dx, dy in pixel dalla tacca, y verso l'alto; niente fondini. Spariscono solo sotto le etichette (ost).
const NUM = [['x', -2, [-26, -30], [0, -30]], ['x', -1, [0, -30], [0, -30]], ['x', 1, [0, -30], [0, -30]], ['x', 2, [26, -30], [0, -30]],
  ['x', 3, [0, -30], [0, -30]], ['x', 4, [0, -30], [0, -30]],
  ['y', -1, [-34, -26], [-34, 0]], ['y', 1, [-34, 26], [-34, -18]], ['y', 2, [-34, 0], [-34, 0]], ['y', 3, [-34, 0], [-34, 18]]];
function numeri(ctx, k, ost, km) {
  const al = P(k, .6, 1); if (al <= 0) return;
  for (const [asse, n, p0, p1] of NUM) {
    const s = (n < 0 ? '−' : '') + Math.abs(n), w = 17 * s.length + 4;
    const x = PL.ox + (asse === 'x' ? n * PL.u : 0) + lerp(p0[0], p1[0], km), y = PL.oy - (asse === 'y' ? n * PL.u : 0) - lerp(p0[1], p1[1], km);
    let d = 1e9;
    for (const [px, py, r] of ost) d = Math.min(d, Math.hypot(Math.max(Math.abs(px - x) - w / 2, 0), Math.max(Math.abs(py - y) - 17, 0)) - r);
    const a = al * clamp(d / 3);
    if (a > 0) txt(ctx, s, x, y, { size: 30, color: C.dim, alpha: a });
  }
}
function freccia(ctx, a, b, col, k, al) {   // segmento con la punta, disegnato fino alla frazione k
  if (k <= 0 || al <= 0) return;
  const e = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke();
  arrowHead(ctx, e, Math.atan2(b[1] - a[1], b[0] - a[0]), col);
  ctx.restore();
}
function scenePiano(ctx, t) {
  if (t < T.somiglia - .1 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.somiglia - .1, T.somiglia + .4) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, ...RQ);
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  const ka = P(t, T.somiglia, T.somiglia + .8);
  assi(ctx, ka);
  const X = cx(t), Y = cy(t), Cn = PL.toS(X, Y);
  const ost = [];
  // il fantasma dell'ellisse di partenza, mentre si sposta
  const kg = life(t, T.sposta + .3, T.centro + .6, .4, .5);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg * .7; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.setLineDash([9, 10]);
    const pg = ellisse(0, 0); ctx.beginPath(); pg.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  }
  // le frecce dello spostamento: 1 a destra, 2 in alto
  const kf = life(t, T.sposta + .3, T.centro + .2, .2, .4);
  freccia(ctx, PL.toS(0, 0), PL.toS(1, 0), C.x, P(t, T.sposta + .3, T.sposta + 1.5, E.io), kf);
  freccia(ctx, PL.toS(1, 0), PL.toS(1, 2), C.y, P(t, T.sposta + 1.6, T.sposta + 3.0, E.io), kf);
  // l'ellisse
  glowStroke(ctx, ellisse(X, Y), P(t, T.somiglia + .6, T.somiglia + 1.8, E.lin), C.y, 5);
  // i semiassi, mentre se ne parla e mentre l'ellisse si sposta
  const ks = life(t, T.semiassi + .3, T.centro + .2, .5, .4);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(Cn[0], Cn[1]); ctx.lineTo(...PL.toS(X + 2, Y)); ctx.moveTo(Cn[0], Cn[1]); ctx.lineTo(...PL.toS(X, Y + 1)); ctx.stroke(); ctx.restore();
    const la = PL.toS(X + 1, Y + .3), lb = PL.toS(X + .3, Y + .5);   // b a destra del suo segmento: non attraversa mai l'asse y
    lab(ctx, '{mv:a}', la[0], la[1], ks); lab(ctx, '{mv:b}', lb[0], lb[1], ks);
    ost.push([la[0], la[1], 24], [lb[0], lb[1], 24]);
  }
  // il centro, sempre; il suo nome quando arriva in (1; 2)
  dot(ctx, Cn, C.g, P(t, T.somiglia + 1.6, T.somiglia + 2.0, E.back), 10);
  const kc = P(t, T.centro + .2, T.centro + .6), lc = PL.toS(1, 1.6);
  lab(ctx, '{g:(1; 2)}', lc[0], lc[1], kc, 40);
  // vertici e fuochi
  const V = [['A', -1, 2, -.34, 0, T.vertA], ['A′', 3, 2, .4, 0, T.vertA + .5], ['B', 1, 1, 0, -.34, T.vertB], ['B′', 1, 3, 0, .34, T.vertB + .5]];
  for (const [n, x, y, dx, dy, t0] of V) {
    const k = P(t, t0 + .3, t0 + .7, E.back); if (k <= .01) continue;
    dot(ctx, PL.toS(x, y), C.ink, k, 8);
    const p = PL.toS(x + dx, y + dy); lab(ctx, '{mink:' + n + '}', p[0], p[1], P(t, t0 + .4, t0 + .8), 40); ost.push([p[0], p[1], 26]);
  }
  const kF = P(t, T.F + .3, T.F + .7, E.back);
  if (kF > .01) for (const [n, x, dx] of [['F₁', 1 - S3, .36], ['F₂', 1 + S3, -.36]]) {
    dot(ctx, PL.toS(x, 2), C.v, kF, 9);
    const p = PL.toS(x + dx, 2); lab(ctx, '{mv:' + n + '}', p[0], p[1], P(t, T.F + .4, T.F + .8), 40); ost.push([p[0], p[1], 26]);
  }
  if (kc > 0) ost.push([lc[0], lc[1], 40]);
  numeri(ctx, ka, ost, P(t, T.sposta + .3, T.sposta + 3.0, E.io));
  ctx.restore();
  ctx.restore();
}

// la scheda a destra: l'equazione trovata e i dati dell'ellisse
const XL = 1085, XR = 1815, XC = 1450;
function riga(ctx, nome, val, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  if (nome) drawRich(ctx, '{dim:' + nome + '}', XL, y, { size: 32, align: 'left' });
  drawRich(ctx, val, XR, y, { size: 44, align: 'right' });
  ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < T.somiglia - .1 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, T.somiglia - .1, T.somiglia + .4) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori * P(t, T.somiglia, T.somiglia + .5);
  drawSeq(ctx, [{ num: '{mx:(x − 1)²}', den: '{mink:4}' }, '{mink: + }{my:(y − 2)²}{mink: = 1}'], XC, 192, 48);
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 262); ctx.lineTo(XR, 262); ctx.stroke();
  // l'ellisse nell'origine, finché non si sposta; poi il centro
  const k0 = life(t, T.somiglia + .5, T.centro + .1, .5, .4);
  if (k0 > 0) {
    ctx.save(); ctx.globalAlpha *= k0;
    drawRich(ctx, '{dim:centro in }{mink:O}', XL, 315, { size: 32, align: 'left' });
    drawSeq(ctx, [{ num: '{mink:x²}', den: '{mink:4}' }, '{mink: + y² = 1}'], 1650, 315, 40);
    ctx.restore();
  }
  riga(ctx, 'centro', '{g:(1; 2)}', 315, P(t, T.centro + .3, T.centro + .7));
  riga(ctx, 'semiassi', '{mink:a = 2,   b = 1}', 405, P(t, T.semiassi + .3, T.semiassi + .7));
  // le sostituzioni, finché non arrivano i vertici
  const k1 = life(t, T.sostituz + .3, T.vertA + .1, .5, .4);
  lab(ctx, '{mx:x − 1}{dim:  al posto di  }{mx:x}', XC, 478, k1, 40);
  lab(ctx, '{my:y − 2}{dim:  al posto di  }{my:y}', XC, 540, k1, 40);
  riga(ctx, 'vertici', '{mink:A(−1; 2),   A′(3; 2)}', 478, P(t, T.vertA + .4, T.vertA + .8));
  riga(ctx, '', '{mink:B(1; 1),   B′(1; 3)}', 540, P(t, T.vertB + .4, T.vertB + .8));
  riga(ctx, 'semidistanza focale', '{mink:c = √3}', 618, P(t, T.c + .4, T.c + .8));
  riga(ctx, 'fuochi', '{mink:F₁(1 − √3; 2)}', 688, P(t, T.F + .4, T.F + .8));
  riga(ctx, '', '{mink:F₂(1 + √3; 2)}', 746, P(t, T.F + .6, T.F + 1.0));
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Completando i quadrati trovi il centro:\nè la stessa ellisse, spostata.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'centro', '{g:(1; 2)}'], [960, 'semiassi', '{mink:a = 2,  b = 1}'], [1450, 'spostamento', '{x:1 a destra},  {y:2 in alto}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: i === 2 ? 36 : 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5], ['pop', 2.6, .5],                                                        // l'equazione
    ['soffio', 7.5], ['pop', T.eq + .3, .4], ['pop', T.raggruppo + .3, .45],                   // le righe dei conti
    ['pop', T.quadrati + .3, .5], ['pop', T.riconosco + .3, .52], ['pop', T.porto + .3, .55], ['ding', T.divido + .4],
    ['soffio', T.somiglia], ['traccia', T.somiglia, T.somiglia + .8],                          // il piano
    ['tono', T.somiglia + .6, T.somiglia + 1.8, [.6, .4, .3, .4, .6, .7, .6]],                 // l'ellisse nell'origine
    ['traccia', T.semiassi + .3, T.semiassi + .8], ['pop', T.semiassi + .4, .5],               // i semiassi
    ['pop', T.sostituz + .3, .5],
    ['tono', T.sposta + .3, T.sposta + 1.5, [.4, .45]], ['tono', T.sposta + 1.6, T.sposta + 3.0, [.45, .8]],   // 1 a destra, 2 in alto
    ['ding', T.centro + .3],                                                                   // il centro (1; 2)
    ['pop', T.vertA + .3, .5], ['pop', T.vertA + .8, .5], ['pop', T.vertB + .3, .3], ['pop', T.vertB + .8, .7],
    ['pop', T.c + .4, .6], ['pop', T.F + .3, .6], ['pop', T.F + .6, .6],                       // c, i fuochi
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'L’ellisse fuori centro', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.somiglia - .2, 'completare i quadrati'], [T.somiglia - .2, T.vertA - .1, 'l’ellisse si sposta'], [T.vertA - .1, FINE, 'vertici e fuochi']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneConti(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
