'use strict';
/* Frazioni nella stessa classe — 1/2, 2/4, 3/6 colorano la stessa parte di tre strisce: sono equivalenti (1 · 4 = 2 · 2);
   come punti (denominatore; numeratore), col denominatore positivo, stanno su una semiretta che parte dall'origine;
   la classe di equivalenza di 1/2 sta tutta lì, 2/3 ha un'altra semiretta; ogni classe è un numero razionale, e la
   frazione ridotta è il punto più vicino all'origine. Argomento: insiemi-logica. */
CVIDEO.registra('insiemi-logica/equivalenza', M => {
  const { W, C, E, P, life, kf, css, mix, TITOLI, conFont, drawRich, richW, txt, dot, dashed, arrowHead, card } = M;

const FINE = 94.0, DUR = 105.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [17.6, 'sorpreso'], [19.7, 'neutro'], [22.2, 'felice'], [24.3, 'neutro'], [30.0, 'felice'], [32.1, 'neutro'],
  [52.6, 'sorpreso'], [54.7, 'neutro'], [62.2, 'felice'], [64.3, 'neutro'], [67.4, 'pensa'], [69.5, 'neutro'],
  [77.0, 'felice'], [79.1, 'neutro'], [82.3, 'festa'], [84.5, 'neutro'], [88.4, 'felice'], [90.5, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.6, '{mink:1/2}, {mink:2/4}, {mink:3/6}:\nsono tre numeri diversi?'],
  // 1 · le strisce
  [7.9, 12.3, 'Tre strisce uguali, tagliate\nin 2, in 4 e in 6 parti.'],
  [12.5, 17.3, 'Coloro 1 parte, poi 2, poi 3:\n{mink:1/2}, {mink:2/4} e {mink:3/6}.'],
  [17.5, 21.9, 'Il colore arriva allo {g:stesso punto}:\nvalgono lo stesso numero.'],
  [22.1, 27.1, 'Sono frazioni {v:equivalenti}:\n{mink:1/2 = 2/4 = 3/6}.'],
  [27.3, 32.6, 'Per controllarlo si moltiplica\n{v:in croce}: {mink:1 · 4 = 2 · 2}.'],
  // 2 · i punti
  [33.4, 38.2, 'Ora ogni frazione diventa un punto:\n(denominatore; numeratore).'],
  [38.4, 43.3, 'Il denominatore lo prendo {g:positivo}:\ni punti stanno nella metà destra.'],
  [43.5, 47.3, '{mink:1/2} diventa il punto {mink:(2; 1)}.'],
  [47.5, 52.1, '{mink:2/4} diventa {mink:(4; 2)},\n{mink:3/6} diventa {mink:(6; 3)}.'],
  [52.3, 56.9, 'Sono {g:allineati} con l’origine:\nstanno su una {v:semiretta}.'],
  [57.1, 61.9, 'Sulla semiretta ci sono anche\n{mink:4/8}, {mink:5/10}…'],
  [62.1, 67.1, 'È la {v:classe di equivalenza} di {mink:1/2}:\nle frazioni equivalenti a lei.'],
  [67.3, 71.5, 'E {mink:2/3}? Il punto {mink:(3; 2)}\nè {r:fuori} dalla semiretta.'],
  [71.7, 76.5, 'Con {mink:4/6} e {mink:6/9} ha la sua semiretta:\nun’{v:altra classe}.'],
  [76.7, 82.0, 'Due classi diverse non si toccano:\nogni frazione sta in {g:una sola}.'],
  // 3 · un numero
  [82.2, 88.0, 'Ogni classe è un {v:numero razionale}:\n{mink:1/2}, {mink:2/4}, {mink:3/6} sono i suoi nomi.'],
  [88.2, 93.2, 'Di solito si usa la frazione {g:ridotta}:\nil punto più vicino all’origine.'],
  // chiusura
  [96.2, 102.8, 'Frazioni equivalenti stanno sulla\nstessa semiretta: sono un solo numero.'],
];

// ---------- aiutanti ----------
// una frazione col suo trattino; restituisce la larghezza
function frazione(ctx, num, den, x, y, size, col, al = 1) {
  if (al <= 0.002) return 0;
  const sn = '{m' + col + ':' + num + '}', sd = '{m' + col + ':' + den + '}';
  const w = Math.max(richW(ctx, sn, size), richW(ctx, sd, size)) + size * .3;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, sn, x, y - size * .6, { size });
  drawRich(ctx, sd, x, y + size * .66, { size });
  ctx.strokeStyle = css(C[col] || C.ink); ctx.lineWidth = Math.max(2, size * .055); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - w / 2, y + size * .04); ctx.lineTo(x + w / 2, y + size * .04); ctx.stroke();
  ctx.restore();
  return w;
}
function linea(ctx, x0, x1, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore();
}

// ---------- 1 · le strisce (7,5–33) ----------
const SX = 200, SW = 660, SH = 84, SY = [235, 395, 555], PARTI = [2, 4, 6];
function sceneStrisce(ctx, t) {
  if (t < 7.5 || t > 33.4) return;
  const al = 1 - P(t, 32.6, 33.2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 130, 110, 1000, 690, P(t, 7.5, 8.2));
  PARTI.forEach((n, i) => {
    const k = P(t, 8.2 + .5 * i, 8.8 + .5 * i, E.out);
    if (k <= 0) return;
    const y = SY[i] - SH / 2;
    ctx.save(); ctx.globalAlpha *= k;
    // la parte colorata: 1, 2, 3 parti, una striscia alla volta (12,7 / 13,5 / 14,3)
    const kc = P(t, 12.7 + .8 * i, 13.3 + .8 * i);
    if (kc > 0) { ctx.fillStyle = css(C.v, .28); ctx.fillRect(SX, y, SW / 2 * kc, SH); }
    ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.strokeRect(SX, y, SW, SH);
    // i tagli
    ctx.lineWidth = 2; ctx.strokeStyle = css(C.ink, .7);
    for (let j = 1; j < n; j++) {
      const kt = P(t, 9.4 + .5 * i + .08 * j, 9.8 + .5 * i + .08 * j);
      if (kt <= 0) continue;
      const x = SX + SW * j / n;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + SH * kt); ctx.stroke();
    }
    ctx.restore();
    // la frazione accanto, quando è colorata
    frazione(ctx, String(i + 1), String(n), 990, SY[i], 50, 'ink', P(t, 13.1 + .8 * i, 13.5 + .8 * i));
  });
  // il colore arriva allo stesso punto: una linea tratteggiata a metà
  const km = P(t, 17.7, 18.5);
  if (km > 0) {
    const xm = SX + SW / 2;
    dashed(ctx, [xm, SY[0] - SH / 2 - 26], [xm, SY[2] + SH / 2 + 26], C.g, km, 1);
    drawRich(ctx, '{g:stesso punto}', xm, SY[2] + SH / 2 + 66, { size: 34, weight: 600, alpha: P(t, 18.3, 18.7) });
  }
  ctx.restore();
}
// la scheda a destra: l'uguaglianza e i prodotti in croce
const PAN = [1170, 110, 680, 690], XC = PAN[0] + PAN[2] / 2;
function sceneCroce(ctx, t) {
  const al = life(t, 22.3, 33.2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'frazioni equivalenti', XC, 170, { size: 40, weight: 600, local: t - 22.4 }));
  // 1/2 = 2/4 = 3/6
  const xs = [XC - 210, XC, XC + 210];
  [['1', '2'], ['2', '4'], ['3', '6']].forEach(([n, d], i) => {
    frazione(ctx, n, d, xs[i], 290, 54, 'ink', P(t, 22.6 + .3 * i, 23.0 + .3 * i));
    if (i) drawRich(ctx, '{mink:=}', (xs[i] + xs[i - 1]) / 2, 290, { size: 54, alpha: P(t, 22.8 + .3 * i, 23.2 + .3 * i) });
  });
  linea(ctx, PAN[0] + 40, PAN[0] + PAN[2] - 40, 395, P(t, 27.5, 27.9));
  // il controllo in croce: 1/2 e 2/4 grandi, con le due diagonali
  const kx = P(t, 27.6, 28.1);
  if (kx > 0) {
    const xa = XC - 130, xb = XC + 130, y = 520, s = 64;
    frazione(ctx, '1', '2', xa, y, s, 'ink', kx);
    frazione(ctx, '2', '4', xb, y, s, 'ink', kx);
    const croce = (p, q, k) => {
      if (k <= 0) return;
      ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k); ctx.stroke(); ctx.restore();
    };
    croce([xa + 34, y - s * .6], [xb - 34, y + s * .66], P(t, 28.5, 29.1));
    croce([xa + 34, y + s * .66], [xb - 34, y - s * .6], P(t, 29.0, 29.6));
  }
  drawRich(ctx, '{mink:1 · 4 = }{mg:4}{mink: = 2 · 2}', XC, 690, { size: 52, local: t - 30.0 });
  ctx.restore();
}

// ---------- 2 · il piano (33–FINE) ----------
const PO = { ox: 276, oy: 730, u: 66, x0: -1.6, x1: 11, y0: -.4, y1: 7 };
const toS = (x, y) => [PO.ox + x * PO.u, PO.oy - y * PO.u];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PO;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  for (let i = 1; i <= x1; i++) txt(ctx, String(i), ox + i * u, oy + 32, { size: 29, color: C.dim });
  for (let j = 1; j <= y1; j++) txt(ctx, String(j), ox - 18, oy - j * u, { size: 29, color: C.dim, align: 'right' });
  txt(ctx, 'O', ox - 18, oy + 30, { size: 30, color: C.dim, align: 'right' });
  // i nomi degli assi: dove nessuna semiretta passa
  txt(ctx, 'numeratore', ox + 26, oy - (y1 + .2) * u - 6, { size: 32, color: C.dim, align: 'left' });
  txt(ctx, 'denominatore', ox + x1 * u + 10, oy - 34, { size: 32, color: C.dim, align: 'right' });
  ctx.restore();
}
// una semiretta dall'origine con pendenza m, fino al bordo del piano
function semiretta(ctx, m, col, k) {
  if (k <= 0) return;
  const xe = Math.min(PO.x1 + .1, (PO.y1 + .1) / m);
  M.glowStroke(ctx, [toS(0, 0), toS(xe, m * xe)], k, col, 5);
}
// i punti: [x, y, istante, colore]
const PUNTI = [[2, 1, 43.8, 'v'], [4, 2, 47.8, 'v'], [6, 3, 49.7, 'v'], [8, 4, 57.4, 'v'], [10, 5, 57.9, 'v'],
  [3, 2, 67.6, 'y'], [6, 4, 72.0, 'y'], [9, 6, 72.4, 'y']];
function scenePiano(ctx, t) {
  if (t < 32.8 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 130, 110, 1000, 690, P(t, 33.0, 33.7));
  // il denominatore positivo: la metà destra del piano si colora per un momento
  const kd = life(t, 38.6, 43.4, .6, .5);
  if (kd > 0) {
    const a = toS(0, PO.y1 + .1), b = toS(PO.x1 + .1, PO.y0);
    ctx.save(); ctx.fillStyle = css(C.g, .12 * kd); ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); ctx.restore();
  }
  assi(ctx, P(t, 33.3, 34.3));
  semiretta(ctx, 1 / 2, C.v, P(t, 52.5, 53.7));
  semiretta(ctx, 2 / 3, C.y, P(t, 72.8, 74.0));
  // (2; 1) con le sue coordinate tratteggiate
  const kp = life(t, 43.9, 47.6, .4, .4);
  if (kp > 0) { dashed(ctx, toS(2, 1), toS(2, 0), C.dim, 1, kp); dashed(ctx, toS(2, 1), toS(0, 1), C.dim, 1, kp); }
  PUNTI.forEach(([x, y, ti, c]) => dot(ctx, toS(x, y), C[c], P(t, ti, ti + .4, E.back), 11));
  // i nomi delle due classi, sotto la loro semiretta e lontano dall'altra
  const p1 = toS(9.6, 3.9), p2 = toS(5.0, 5.5);
  drawRich(ctx, '{v:classe di }{mv:1/2}', p1[0], p1[1], { size: 34, weight: 600, local: t - 62.4 });
  drawRich(ctx, '{y:classe di }{my:2/3}', p2[0], p2[1], { size: 34, weight: 600, local: t - 74.2 });
  // la ridotta: un anello verde intorno a (2; 1)
  const kr = P(t, 88.5, 89.1);
  if (kr > 0) {
    const [x, y] = toS(2, 1);
    ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(x, y, 26, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * kr); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}
// la scheda a destra: frazione → punto, poi il numero razionale
const RY = [260, 365, 470, 575, 680];
function riga(ctx, n, d, pt, y, col, al) {
  if (al <= 0) return;
  frazione(ctx, n, d, XC - 150, y, 40, col, al);
  drawRich(ctx, '{mink:→}', XC - 45, y, { size: 44, alpha: al });
  drawRich(ctx, '{m' + col + ':' + pt + '}', XC + 20, y, { size: 44, align: 'left', alpha: al });
}
function scenePunti(ctx, t) {
  const al = life(t, 43.6, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const kt = 1 - P(t, 82.2, 82.6);
  conFont(TITOLI, () => {
    drawRich(ctx, 'frazione → punto', XC, 170, { size: 40, weight: 600, local: t - 43.7, alpha: kt });
    drawRich(ctx, 'un numero razionale', XC, 170, { size: 40, weight: 600, local: t - 82.6 });
  });
  // la classe di 1/2, poi quella di 2/3
  const k1 = 1 - P(t, 67.3, 67.7), k2 = 1 - P(t, 82.2, 82.6);
  [['1', '2', '(2; 1)'], ['2', '4', '(4; 2)'], ['3', '6', '(6; 3)'], ['4', '8', '(8; 4)'], ['5', '10', '(10; 5)']].forEach(([n, d, pt], i) => {
    const ti = PUNTI[i][2];
    riga(ctx, n, d, pt, RY[i], 'v', P(t, ti, ti + .4) * k1);
  });
  [['2', '3', '(3; 2)'], ['4', '6', '(6; 4)'], ['6', '9', '(9; 6)']].forEach(([n, d, pt], i) => {
    const ti = PUNTI[5 + i][2];
    riga(ctx, n, d, pt, RY[i], 'y', P(t, ti, ti + .4) * k2);
  });
  // 3 · tanti nomi per un numero; la ridotta diventa verde
  const xs = [XC - 220, XC - 70, XC + 80];
  const kv = P(t, 88.4, 88.9);
  [['1', '2'], ['2', '4'], ['3', '6']].forEach(([n, d], i) => {
    const k = P(t, 82.8 + .3 * i, 83.2 + .3 * i);
    if (!i) { frazione(ctx, n, d, xs[i], 360, 50, 'v', k * (1 - kv)); frazione(ctx, n, d, xs[i], 360, 50, 'g', k * kv); }
    else frazione(ctx, n, d, xs[i], 360, 50, 'v', k);
    drawRich(ctx, '{mink:=}', xs[i] + 75, 360, { size: 50, alpha: P(t, 83.0 + .3 * i, 83.4 + .3 * i) });
  });
  drawRich(ctx, '{mink:…}', XC + 205, 360, { size: 50, alpha: P(t, 83.9, 84.3) });
  drawRich(ctx, '{dim:una classe, tanti nomi}', XC, 500, { size: 34, local: t - 84.4 });
  drawRich(ctx, '{g:la frazione ridotta}', XC, 600, { size: 36, weight: 600, local: t - 88.6 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Frazioni nella\nstessa classe', W / 2, 200, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le frazioni {v:equivalenti} formano una classe:\nun solo {g:numero razionale}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [
    [490, '{dim:prodotti in croce}', '{mink:1 · 4 = 2 · 2}'],
    [960, '{dim:la classe di 1/2}', '{v:sta su una semiretta}'],
    [1430, '{dim:ogni classe è un}', '{g:numero razionale}'],
  ];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 32 });
    drawRich(ctx, corpo, x, 546, { size: 38, weight: 600 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 8.2, 9.8], ['traccia', 9.4, 10.6],                  // le strisce e i tagli
    ['tono', 12.7, 13.3, [.2, .4]], ['tono', 13.5, 14.1, [.3, .5]], ['tono', 14.3, 14.9, [.4, .6]],   // il colore avanza
    ['traccia', 17.7, 18.5],                                                          // lo stesso punto
    ['soffio', 22.3], ['pop', 22.6, .45], ['pop', 22.9, .5], ['pop', 23.2, .55],      // 1/2 = 2/4 = 3/6
    ['pop', 27.6, .5], ['traccia', 28.5, 29.1], ['traccia', 29.0, 29.6], ['ding', 30.2],   // in croce
    ['soffio', 33.0], ['traccia', 33.3, 34.3],                                        // il piano
    ['soffio', 38.6],                                                                 // la metà destra
    ['pop', 43.8, .4], ['pop', 47.8, .5], ['pop', 49.7, .6],                          // tre punti
    ['tono', 52.5, 53.7, [.1, .6]],                                                   // la semiretta
    ['pop', 57.4, .65], ['pop', 57.9, .7],                                            // 4/8, 5/10
    ['pop', 62.4, .5],                                                                // la classe di 1/2
    ['pop', 67.6, .45], ['pop', 72.0, .6], ['pop', 72.4, .7],                         // 2/3, 4/6, 6/9
    ['tono', 72.8, 74.0, [.1, .75]],                                                  // la seconda semiretta
    ['soffio', 82.4], ['pop', 82.8, .45], ['pop', 83.1, .5], ['pop', 83.4, .55],      // un numero, tanti nomi
    ['traccia', 88.5, 89.1],                                                          // la ridotta
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Frazioni nella stessa classe', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 33.0, 'frazioni equivalenti'], [33.0, 82.1, 'le frazioni come punti'], [82.1, FINE, 'un numero razionale']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneStrisce(ctx, t); sceneCroce(ctx, t); scenePiano(ctx, t); scenePunti(ctx, t); sceneFine(ctx, t); },
  };
});
