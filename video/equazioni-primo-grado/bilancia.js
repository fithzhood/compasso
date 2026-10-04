'use strict';
/* L'equazione è una bilancia — 3x + 2 = 11 risolta con le due mosse permesse, fatte sempre su tutti e due i piatti:
   togliere 2 (primo principio) e dividere per 3 (secondo principio). Argomento: equazioni-primo-grado
   (sezione «I principi di equivalenza»). */
CVIDEO.registra('equazioni-primo-grado/bilancia', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, drawSeq, card, checkMark } = M;

const FINE = 78.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [13.6, 'felice'], [15.6, 'neutro'], [22.6, 'felice'], [24.8, 'neutro'],
  [31.7, 'felice'], [33.8, 'neutro'], [46.6, 'pensa'], [49.0, 'neutro'],
  [55.2, 'festa'], [58.0, 'neutro'], [65.0, 'pensa'], [67.2, 'neutro'], [74.0, 'felice'], [76.0, 'neutro'],
  [FINE + 1.0, 'felice'], [83.5, 'occhiolino'], [85.6, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.3, 'Che cosa si può fare\na un\'equazione?'],
  // 1 · la bilancia
  [7.9, 12.6, 'Ecco {mink:3}{mx:x}{mink: + 2 = 11}: la lettera {mx:x}\nè l\'{v:incognita}, il numero da trovare.'],
  [12.7, 17.6, 'I due {v:membri}, prima e dopo l\'uguale,\nvanno sui due piatti della bilancia.'],
  [17.7, 22.3, 'Ogni sacchetto pesa {mx:x},\nogni cubetto pesa 1.'],
  [22.4, 27.0, 'I due piatti pesano uguale:\nla bilancia è {g:in equilibrio}.'],
  // 2 · primo principio
  [27.3, 31.5, 'Tolgo due cubetti\nda {g:tutti e due} i piatti.'],
  [31.6, 35.9, 'L\'equilibrio resta:\nrimane {mink:3}{mx:x}{mink: = 9}.'],
  [36.0, 41.6, 'È il {v:primo principio}: aggiungo o tolgo\nla stessa cosa a tutti e due i membri.'],
  [41.7, 46.3, 'Le due equazioni sono {v:equivalenti}:\nhanno le stesse soluzioni.'],
  // 3 · secondo principio
  [46.6, 50.9, 'Ora divido ogni piatto\nin tre parti uguali.'],
  [51.0, 55.0, 'Ne tengo una sola,\ndi qua e di là.'],
  [55.1, 59.7, 'Resta {mx:x}{mink: = 3}: un sacchetto\npesa come tre cubetti.'],
  [59.8, 64.8, 'È il {v:secondo principio}: moltiplico\no divido per lo stesso numero…'],
  [64.9, 68.7, '…purché {r:non sia zero}:\nper zero non si divide…'],
  [68.8, 72.6, '…e moltiplicando per zero resta\n{mink:0 = 0}: la {mx:x} sparisce.'],
  // 4 · verifica
  [72.7, 77.4, 'Verifica: {mink:3 · 3 + 2 = 11}.\nLa soluzione è {g:giusta}.'],
  // chiusura
  [79.6, 86.0, 'Stessa mossa sui due piatti:\nl\'equilibrio e le soluzioni restano.'],
];

// ---- la bilancia: il giogo resta sempre orizzontale, perché ogni mossa è uguale sui due piatti ----
const PERNO = [630, 560], PIANO = 514;          // perno del giogo; quota del ripiano dei piatti
const XS = 310, XD = 950, LARGO = 360;           // centri dei due piatti
const CUBO = 56;
function bilancia(ctx, al, verde) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const scuro = css(C.ink, .72);
  ctx.fillStyle = scuro; ctx.strokeStyle = scuro; ctx.lineCap = 'round';
  // base e colonna
  ctx.beginPath(); ctx.roundRect(PERNO[0] - 130, 768, 260, 22, 10); ctx.fill();
  ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(PERNO[0], 770); ctx.lineTo(PERNO[0], PERNO[1]); ctx.stroke();
  // giogo e sostegni dei piatti
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(XS, PERNO[1]); ctx.lineTo(XD, PERNO[1]); ctx.stroke();
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(XS, PERNO[1]); ctx.lineTo(XS, PIANO + 10); ctx.moveTo(XD, PERNO[1]); ctx.lineTo(XD, PIANO + 10); ctx.stroke();
  // piatti
  [XS, XD].forEach(x => { ctx.beginPath(); ctx.roundRect(x - LARGO / 2, PIANO, LARGO, 16, 8); ctx.fill(); });
  // quadrante e ago: l'ago dritto in su vuol dire equilibrio
  ctx.lineWidth = 4; ctx.strokeStyle = css(C.ink, .35);
  ctx.beginPath(); ctx.arc(PERNO[0], PERNO[1], 104, -Math.PI / 2 - .45, -Math.PI / 2 + .45); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(PERNO[0], PERNO[1] - 96); ctx.lineTo(PERNO[0], PERNO[1] - 116); ctx.stroke();
  const ago = verde > 0 ? css(mixC(C.ink, C.g, verde)) : scuro;
  ctx.strokeStyle = ago; ctx.lineWidth = 6;
  if (verde > 0) { ctx.shadowColor = css(C.g, .6 * verde); ctx.shadowBlur = 16; }
  ctx.beginPath(); ctx.moveTo(PERNO[0], PERNO[1]); ctx.lineTo(PERNO[0], PERNO[1] - 92); ctx.stroke();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = scuro; ctx.beginPath(); ctx.arc(PERNO[0], PERNO[1], 15, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
function mixC(a, b, k) { const A = M.rgb(a), B = M.rgb(b); return [lerp(A[0], B[0], k), lerp(A[1], B[1], k), lerp(A[2], B[2], k)]; }
// un cubetto da 1, centrato in (x, y)
function cubo(ctx, x, y, al, s = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = C.paper; ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(-CUBO / 2, -CUBO / 2, CUBO, CUBO, 8); ctx.fill(); ctx.stroke();
  drawRich(ctx, '1', 0, 1, { size: 32, weight: 600 });
  ctx.restore();
}
// un sacchetto che pesa x, appoggiato in (x, fondo)
function sacco(ctx, x, fondo, al, s = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, fondo); ctx.scale(s, s);
  ctx.fillStyle = css(C.x);
  ctx.beginPath();
  ctx.moveTo(-18, -84);
  ctx.quadraticCurveTo(-46, -62, -42, -22); ctx.quadraticCurveTo(-42, 0, -20, 0);
  ctx.lineTo(20, 0);
  ctx.quadraticCurveTo(42, 0, 42, -22); ctx.quadraticCurveTo(46, -62, 18, -84);
  ctx.lineTo(28, -102); ctx.lineTo(0, -92); ctx.lineTo(-28, -102); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = css(C.paper, .85); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-17, -86); ctx.lineTo(17, -86); ctx.stroke();
  drawRich(ctx, '{mink:x}', 0, -40, { size: 50, fill: C.paper });
  ctx.restore();
}
// tratteggio verticale che divide un piatto
function divisore(ctx, x, y0, y1, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); ctx.restore();
}
const pulsa = (t, a) => 1 + .14 * Math.sin(Math.PI * P(t, a, a + 1, E.lin));
const via = (t, a) => [-90 * P(t, a, a + 1.5, E.io), 1 - P(t, a + .5, a + 1.5)];   // [salita, alfa] di ciò che si toglie

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L\'equazione è una bilancia', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–4 · la bilancia (12.8–FINE)
const T_TOLGO = 27.6, T_DIVIDO = 51.2;
function sceneBilancia(ctx, t) {
  if (t < 12.8 || t > FINE + .3) return;
  const al = life(t, 12.8, FINE + .2, .6, .7);
  ctx.save(); ctx.globalAlpha *= al;
  const verde = Math.max(life(t, 22.5, 27.0, .4, .4), life(t, 31.7, 35.9, .4, .4));
  bilancia(ctx, 1, verde);
  const pop = P(t, 13.3, 13.9, E.back);
  // sinistra: tre sacchetti e due cubetti
  const bx = i => kf(t, [[29.4, [181, 275, 369][i]], [30.4, [216, 310, 404][i]], [46.8, [216, 310, 404][i]], [48.0, [196, 310, 424][i]]]);
  const [su2, al2] = via(t, T_TOLGO), [su3, al3] = via(t, T_DIVIDO);
  for (let i = 0; i < 3; i++) {
    const tolto = i !== 1;
    sacco(ctx, bx(i), PIANO + (tolto ? su3 : 0), tolto ? al3 : 1, pop * pulsa(t, 17.9));
  }
  for (let r = 0; r < 2; r++) cubo(ctx, 453, PIANO - CUBO / 2 - r * (CUBO + 2) + su2, al2, pop * pulsa(t, 19.6));
  // destra: undici cubetti, tre colonne da tre e una da due
  const cx = c => c === 3 ? 1052 : kf(t, [[29.4, [848, 916, 984][c]], [30.4, [882, 950, 1018][c]], [46.8, [882, 950, 1018][c]], [48.0, [845, 950, 1055][c]]]);
  for (let c = 0; c < 4; c++) for (let r = 0; r < (c === 3 ? 2 : 3); r++) {
    const [su, a] = c === 3 ? [su2, al2] : c !== 1 ? [su3, al3] : [0, 1];
    cubo(ctx, cx(c), PIANO - CUBO / 2 - r * (CUBO + 2) + su, a, pop * pulsa(t, 19.6));
  }
  // le tre parti di ogni piatto
  const dv = life(t, 47.0, 52.6, .8, .5);
  divisore(ctx, 253, PIANO - 6, PIANO - 128, dv); divisore(ctx, 367, PIANO - 6, PIANO - 128, dv);
  divisore(ctx, 897.5, PIANO - 6, PIANO - 186, dv); divisore(ctx, 1002.5, PIANO - 6, PIANO - 186, dv);
  ctx.restore();
  // il principio, sopra la bilancia
  const p1 = life(t, 36.1, 46.4, .5, .5), p2 = life(t, 59.9, FINE + .2, .5, .7);
  if (p1 > 0) {
    card(ctx, 140, 110, 980, 160, p1);
    ctx.save(); ctx.globalAlpha *= p1;
    conFont(TITOLI, () => drawRich(ctx, '{v:primo principio}', PERNO[0], 150, { size: 38, weight: 600 }));
    drawRich(ctx, 'si può aggiungere o togliere la stessa cosa\na tutti e due i membri', PERNO[0], 220, { size: 30, weight: 400, lh: 1.3, local: t - 36.3, stagger: .03 });
    ctx.restore();
  }
  if (p2 > 0) {
    card(ctx, 140, 110, 980, 160, p2);
    ctx.save(); ctx.globalAlpha *= p2;
    conFont(TITOLI, () => drawRich(ctx, '{v:secondo principio}', PERNO[0], 150, { size: 38, weight: 600 }));
    drawRich(ctx, 'si possono moltiplicare o dividere i due membri', PERNO[0], 200, { size: 30, weight: 400, local: t - 60.1, stagger: .03 });
    const A = 'per lo stesso numero', B = '{r:diverso da zero}';
    const wA = M.richW(ctx, A + ' ', 30, 400), x0 = PERNO[0] - (wA + M.richW(ctx, B, 30, 400)) / 2;
    drawRich(ctx, A, x0, 240, { size: 30, weight: 400, align: 'left', local: t - 60.4, stagger: .03 });
    drawRich(ctx, B, x0 + wA, 240, { size: 30, weight: 400, align: 'left', local: t - 65.0 });
    ctx.restore();
  }
}

// i passaggi scritti, nella scheda a destra (8–FINE)
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .13);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 14); ctx.fill(); ctx.restore();
}
function sceneConti(ctx, t) {
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 7.9, FINE + .2, .6, .7);
  card(ctx, 1160, 110, 680, 680, al);
  ctx.save(); ctx.globalAlpha *= al;
  const X = 1500;
  conFont(TITOLI, () => drawRich(ctx, 'l\'equazione', X, 170, { size: 40, weight: 600 }));
  const ev = life(t, 41.8, 46.3, .4, .4);
  evidenzia(ctx, 1220, 226, 560, 78, C.v, ev); evidenzia(ctx, 1220, 396, 560, 78, C.v, ev);
  drawRich(ctx, '{mink:3}{mx:x}{mink: + 2 = 11}', X, 265, { size: 52, local: t - 8.4 });
  if (t > 27.8) drawRich(ctx, '{mink:3}{mx:x}{mink: + 2 }{mv:− 2}{mink: = 11 }{mv:− 2}', X, 350, { size: 52, local: t - 27.8 });
  if (t > 31.7) drawRich(ctx, '{mink:3}{mx:x}{mink: = 9}', X, 435, { size: 52, local: t - 31.7 });
  if (t > 51.3) drawSeq(ctx, [{ num: '{mink:3}{mx:x}', den: '{mv:3}' }, '{mink: = }', { num: '{mink:9}', den: '{mv:3}' }], X, 545, 52, { local: t - 51.3 });
  if (t > 55.2) drawRich(ctx, '{mx:x}{mink: = }{mg:3}', X, 655, { size: 64, local: t - 55.2 });
  // moltiplicando per zero la x sparisce: resta un'uguaglianza vera per ogni x
  drawRich(ctx, '{mr:0 · }{mink:3}{mx:x}{mink: = }{mr:0 · }{mink:9}{dim:    →    }{mink:0 = 0}', X, 740, { size: 40, local: t - 69.0, alpha: life(t, 69.0, 72.7, .4, .3) });
  if (t > 72.8) {
    drawRich(ctx, '{dim:verifica:}  {mink:3 · 3 + 2 = 11}', X - 30, 740, { size: 40, local: t - 72.8 });
    checkMark(ctx, 1778, 740, P(t, 73.9, 74.5), C.g, .36);
  }
  ctx.restore();
}

// 5 · in una frase (FINE–86)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 87.1, 88.1);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ogni mossa si fa su {g:tutti e due}\ni membri: le soluzioni restano.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[420, '{v:aggiungo o tolgo}\nla stessa cosa'], [960, '{v:moltiplico o divido}\nper un numero {r:diverso da 0}'], [1500, '{mink:3}{mx:x}{mink: + 2 = 11}\n{mx:x}{mink: = }{mg:3}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 512); ctx.scale(k, k); ctx.translate(-x, -512);
    { const w = i === 1 ? 540 : 440; card(ctx, x - w / 2, 445, w, 135); }
    drawRich(ctx, s, x, 512, { size: i === 2 ? 40 : 34, weight: 400, lh: i === 2 ? 1.2 : 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L\'equazione è una bilancia', durata: 89.0, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 27.1, 'la bilancia'], [27.1, 46.4, 'il primo principio'], [46.4, 72.6, 'il secondo principio'], [72.6, FINE, 'la verifica']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneBilancia(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
