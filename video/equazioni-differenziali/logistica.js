'use strict';
/* Crescere fino al tetto — y′ = r·y·(1 − y/K) con r = 1, K = 10, y(0) = 0,5: la curva parte come l'esponenziale
   0,5·eˣ, che le corre accanto e scappa, poi rallenta e si appoggia su K; il flesso a K/2. Argomento: equazioni-differenziali. */
CVIDEO.registra('equazioni-differenziali/logistica', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 72.8, DUR = 82.9;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.2, 'pensa'], [7.9, 'neutro'],
  [18.1, 'sorpreso'], [20.3, 'neutro'], [22.8, 'pensa'], [27.3, 'neutro'], [33.0, 'felice'], [35.2, 'neutro'],
  [43.2, 'sorpreso'], [45.3, 'neutro'], [48.0, 'felice'], [50.2, 'neutro'],
  [53.4, 'pensa'], [58.6, 'felice'], [60.8, 'neutro'], [63.6, 'festa'], [65.7, 'neutro'], [68.5, 'occhiolino'], [70.6, 'neutro'],
  [74.4, 'felice'], [78.7, 'occhiolino'],
];
const FUMETTI = [
  [2.2, 6.4, 'Una popolazione può crescere\nper sempre?'],
  // 1 · l'equazione
  [7.9, 12.6, '{my:y} è la popolazione, {mx:x} il tempo:\nsenza freni, {my:y′}{mink: = }{mv:r}{mink: · }{my:y}.'],
  [12.7, 18.0, '{mv:r} è il tasso di crescita, qui 1;\nsi parte da {my:y(0) = 0,5}.'],
  [18.1, 22.7, 'La soluzione è un’esponenziale:\ncresce sempre più in fretta.'],
  [22.8, 27.2, 'Ma spazio e cibo finiscono:\nc’è un {g:tetto}, {mg:K} = 10.'],
  [27.3, 32.9, 'Aggiungo un freno, {mink:1 − }{my:y}{mink:/}{mg:K}:\nvale 1 se {my:y} = 0, e 0 sul tetto.'],
  [33.0, 37.6, 'Moltiplico per il freno:\nè l’equazione {v:logistica}.'],
  // 2 · la curva
  [37.9, 43.1, 'All’inizio {my:y} è piccola: il freno vale\nquasi 1, e cresce come l’esponenziale.'],
  [43.2, 47.9, 'Poi il freno si stringe: la curva\nsi stacca dall’esponenziale.'],
  [48.0, 53.1, 'Vicino al tetto il freno è quasi 0:\nla curva si appoggia su {mg:K}.'],
  // 3 · il flesso
  [53.4, 58.5, 'La velocità {my:y′} dipende da {my:y}:\nuna parabola, zero in 0 e in {mg:K}.'],
  [58.6, 63.4, 'È massima a metà, in {my:y} = 5:\nlì la pendenza vale 2,5.'],
  [63.6, 68.4, 'Lì la curva cambia concavità:\nè il {v:flesso}, in {mx:x} ≈ 2,94.'],
  [68.5, 72.1, 'Prima del flesso accelera,\ndopo frena.'],
  // chiusura
  [74.4, 80.1, 'All’inizio come l’esponenziale, poi\nrallenta e si avvicina al tetto {mg:K}.'],
];

// ---- le due curve ----
const K = 10, Y0 = .5;
const L = x => K / (1 + (K / Y0 - 1) * Math.exp(-x));     // 10 / (1 + 19·e^(−x))
const Ex = x => Y0 * Math.exp(x);
const XF = Math.log(K / Y0 - 1);                          // il flesso: ln 19 ≈ 2,94
const PO = { ox: 468, oy: 712, ux: 70, uy: 47, x0: -.4, x1: 8.4, y0: -.8, y1: 11.5 };
const toS = (x, y) => [PO.ox + x * PO.ux, PO.oy - y * PO.uy];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, ux, uy, x0, x1, y0, y1 } = PO;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * ux; ctx.beginPath(); ctx.moveTo(x, oy - y1 * uy * k); ctx.lineTo(x, oy - y0 * uy * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * uy; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, y); ctx.lineTo(ox + x1 * ux * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .05) * ux * k, oy); ctx.lineTo(ox + (x1 + .1) * ux * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * uy * k); ctx.lineTo(ox, oy - (y1 + .3) * uy * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .1) * ux * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .3) * uy * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .1) * ux + 36, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 28, oy - (y1 + .3) * uy - 6, { size: 44, align: 'left' });
  // i numeri sui bordi, come un righello
  for (const i of [2, 4, 6, 8]) txt(ctx, String(i), toS(i, 0)[0], toS(0, y0)[1] + 22, { size: 31, color: C.dim });
  for (const j of [2, 4, 6, 8, 10]) txt(ctx, String(j), toS(x0, 0)[0] - 8, toS(0, j)[1], { size: 31, color: C.dim, align: 'right' });
  ctx.restore();
}
function curva(fn, a, b) { const pts = [], n = Math.max(2, Math.ceil((b - a) * 40)); for (let i = 0; i <= n; i++) { const x = lerp(a, b, i / n); pts.push(toS(x, fn(x))); } return pts; }
// un'etichetta su un fondino di carta
function etichetta(ctx, s, x, y, size, al, allinea) {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 14, x0 = allinea === 'left' ? x - 7 : allinea === 'right' ? x - w + 7 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.paper, .94);
  ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 8); ctx.fill(); ctx.restore();
  drawRich(ctx, s, x, y, { size, align: allinea || 'center', alpha: al });
}
function kfm(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], P(t, keys[i - 1][0], keys[i][0], E.io));
  return keys[keys.length - 1][1];
}
// il punto che corre sulla logistica: fermo mentre Ada parla di uno stato
const xp = t => kfm(t, [[38.3, 0], [39.8, .7], [43.4, .7], [47.6, 3.6], [48.2, 3.6], [52.6, 8]]);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Crescere fino al tetto', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.3 || t > FINE + .3) return;
  const al = life(t, 7.5, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 380, 110, 760, 690);
  assi(ctx, P(t, 7.7, 8.6));
  ctx.save();
  const top = toS(0, PO.y1)[1];
  ctx.beginPath(); ctx.rect(toS(PO.x0, 0)[0], top, (PO.x1 - PO.x0) * PO.ux, toS(0, PO.y0)[1] - top); ctx.clip();
  // il tetto K
  const kt = P(t, 23.0, 24.0);
  if (kt > 0) { ctx.save(); ctx.setLineDash([14, 10]); glowStroke(ctx, [toS(0, K), toS(PO.x1, K)], kt, C.g, 4); ctx.restore(); }
  // l'esponenziale senza freni, tratteggiata
  const ke = P(t, 18.3, 20.3);
  if (ke > 0) { ctx.save(); ctx.globalAlpha *= .75; ctx.setLineDash([12, 9]); glowStroke(ctx, curva(Ex, 0, Math.log(PO.y1 / Y0)), ke, C.dim, 4); ctx.restore(); }
  // la logistica, tracciata dal punto che corre
  const x = xp(t);
  if (t > 38.3 && x > 1e-3) glowStroke(ctx, curva(L, 0, x), 1, C.y, 5.5);
  // il punto sull'esponenziale corre accanto, poi esce dal riquadro
  const ka = P(t, 38.0, 38.3) * (1 - P(t, 47.9, 48.3));
  if (ka > 0 && Ex(x) < PO.y1 + .5) dot(ctx, toS(x, Ex(x)), C.dim, ka, 9);
  ctx.restore();
  // il punto di partenza e il punto sulla logistica
  const kp = P(t, 13.2, 13.6, E.back);
  if (kp > 0) dot(ctx, toS(x, L(x)), C.y, kp, 12);
  // 3 · il flesso: metà del tetto, la tangente più ripida
  const kh = life(t, 58.7, FINE, .5, .5);
  if (kh > 0) {
    dashed(ctx, toS(0, 5), toS(XF, 5), C.g, P(t, 58.7, 59.3), kh);
    etichetta(ctx, '{mink:5 = }{mg:K}{mink:/2}', toS(.15, 0)[0], toS(0, 5.55)[1], 34, kh * P(t, 59.1, 59.5), 'left');
  }
  const kt2 = P(t, 63.7, 64.4);
  if (kt2 > 0) {
    const d = .8 * kt2, m = 2.5;
    glowStroke(ctx, [toS(XF - d, 5 - m * d), toS(XF + d, 5 + m * d)], 1, C.v, 4.5);
    dashed(ctx, toS(XF, 5), toS(XF, 0), C.x, 1, .7 * kt2);
    etichetta(ctx, '{v:flesso}', toS(XF + .3, 0)[0], toS(0, 4.0)[1], 34, P(t, 64.1, 64.5), 'left');
    etichetta(ctx, '{mx:x}{mink: ≈ 2,94}', toS(XF + .12, 0)[0], toS(0, .65)[1], 34, P(t, 64.4, 64.8) * (1 - P(t, 68.3, 68.7)), 'left');
  }
  if (t > 58.6) dot(ctx, toS(XF, 5), C.v, P(t, 58.7, 59.1, E.back), 11);
  // prima accelera, dopo frena
  etichetta(ctx, '{g:accelera}', toS(1.65, 0)[0], toS(0, .45)[1], 30, P(t, 68.7, 69.1));
  etichetta(ctx, '{y:frena}', toS(4.6, 0)[0], toS(0, 6.6)[1], 32, P(t, 69.5, 69.9), 'left');
  // i nomi: l'esponenziale e il tetto
  etichetta(ctx, '{mdim:0,5 · eˣ}', toS(2.55, 0)[0], toS(0, 8.3)[1], 40, P(t, 19.9, 20.4), 'right');
  etichetta(ctx, '{mg:K = 10}', toS(7.3, 0)[0], toS(0, 10.75)[1], 40, P(t, 23.7, 24.1));
  ctx.restore();
}

// la scheda a destra (7.5–FINE)
const PX = 1510, LOG = '{my:y′}{mink: = }{mv:r}{mink: · }{my:y}{mink: · (1 − }{my:y}{mink:/}{mg:K}{mink:)}';
function linea(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1240, y); ctx.lineTo(1780, y); ctx.stroke(); ctx.restore();
}
// il piccolo grafico della velocità: y′ in funzione di y (una parabola)
const MO = { ox: 1290, oy: 700, ux: 44, uy: 120 };
const mS = (y, v) => [MO.ox + y * MO.ux, MO.oy - v * MO.uy];
function scenePannello(ctx, t) {
  if (t < 7.3 || t > FINE + .3) return;
  const al = life(t, 7.6, FINE, .6, .6);
  card(ctx, 1190, 140, 640, 640, al);
  ctx.save(); ctx.globalAlpha *= al;
  // 1 · dall'esponenziale alla logistica (7.6–37.7)
  const a1 = 1 - P(t, 37.5, 37.9);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    drawRich(ctx, '{my:y′}{mink: = }{mv:r}{mink: · }{my:y}', PX, 210, { size: 56, local: t - 8.2 });
    drawRich(ctx, '{mv:r}{mink: = 1}', 1395, 287, { size: 44, local: t - 13.0 });
    drawRich(ctx, '{my:y(0) = 0,5}', 1640, 287, { size: 44, local: t - 14.8 });
    drawRich(ctx, '{my:y = 0,5 · eˣ}', PX, 362, { size: 48, local: t - 18.3 });
    linea(ctx, 412, P(t, 22.9, 23.3));
    drawRich(ctx, '{mg:K = 10}', 1420, 465, { size: 44, local: t - 23.0 });
    txt(ctx, 'il tetto', 1640, 465, { size: 32, color: C.dim, alpha: P(t, 23.3, 23.7) });
    drawRich(ctx, '{dim:freno }{mink:1 − }{my:y}{mink:/}{mg:K}', PX, 545, { size: 44, local: t - 27.5 });
    drawRich(ctx, LOG, PX, 640, { size: 46, local: t - 33.2 });
    conFont(TITOLI, () => drawRich(ctx, '{v:equazione logistica}', PX, 712, { size: 38, weight: 600, local: t - 33.7 }));
    ctx.restore();
  }
  // l'equazione resta in alto (37.9–FINE)
  if (t > 37.7) {
    drawRich(ctx, LOG, PX, 210, { size: 46, local: t - 37.9 });
    linea(ctx, 258, P(t, 38.0, 38.4));
  }
  // 2 · il freno e la velocità mentre il punto corre (37.9–53.0)
  const a2 = life(t, 38.0, 53.0, .5, .4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    const yq = Math.round(L(xp(t)) * 100) / 100, fr = 1 - yq / K, vq = yq * fr;
    drawRich(ctx, '{mv:r}{mink: = 1,   }{mg:K}{mink: = 10}', PX, 310, { size: 40 });
    drawRich(ctx, '{dim:freno }{mink:1 − }{my:y}{mink:/}{mg:K}', PX, 380, { size: 40 });
    // la barra del freno: piena vale 1, vuota vale 0
    ctx.fillStyle = css(C.grid); ctx.beginPath(); ctx.roundRect(1270, 418, 480, 28, 14); ctx.fill();
    ctx.fillStyle = css(mix(C.r, C.g, fr)); ctx.beginPath(); ctx.roundRect(1270, 418, Math.max(28, 480 * fr), 28, 14); ctx.fill();
    drawRich(ctx, '{my:y =}', 1300, 515, { size: 44, align: 'left' });
    fixedNum(ctx, fmtN(yq, 2), 1720, 515, 44, C.y);
    drawRich(ctx, '{dim:freno =}', 1300, 590, { size: 44, align: 'left' });
    fixedNum(ctx, fmtN(fr, 3), 1720, 590, 44, C.ink);
    drawRich(ctx, '{my:y′}{mink: ≈}', 1300, 665, { size: 44, align: 'left' });
    fixedNum(ctx, fmtN(Math.round(vq * 100 + 1e-6) / 100, 2), 1720, 665, 44, C.v);
    ctx.restore();
  }
  // 3 · la velocità in funzione di y: una parabola, massima a metà (53.4–FINE)
  const a3 = P(t, 53.4, 53.9);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    drawRich(ctx, '{dim:la velocità }{my:y′}{dim: in funzione di }{my:y}', PX, 300, { size: 32 });
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(MO.ox - 6, MO.oy); ctx.lineTo(MO.ox + 10.8 * MO.ux, MO.oy); ctx.moveTo(MO.ox, MO.oy + 6); ctx.lineTo(MO.ox, MO.oy - 2.9 * MO.uy); ctx.stroke();
    arrowHead(ctx, [MO.ox + 10.8 * MO.ux + 6, MO.oy], 0, C.ink); arrowHead(ctx, [MO.ox, MO.oy - 2.9 * MO.uy - 6], -Math.PI / 2, C.ink);
    drawRich(ctx, '{my:y}', MO.ox + 10.8 * MO.ux + 22, MO.oy - 30, { size: 40 });
    drawRich(ctx, '{my:y′}', MO.ox + 22, MO.oy - 2.9 * MO.uy + 4, { size: 40, align: 'left' });
    txt(ctx, '10', mS(10, 0)[0], MO.oy + 30, { size: 30, color: C.dim });
    const pts = []; for (let i = 0; i <= 80; i++) { const y = 10 * i / 80; pts.push(mS(y, y * (1 - y / K))); }
    glowStroke(ctx, pts, P(t, 53.8, 55.3), C.v, 5);
    // zero agli estremi
    const kz = P(t, 55.9, 56.3, E.back);
    if (kz > 0) { dot(ctx, mS(0, 0), C.v, kz, 9); dot(ctx, mS(10, 0), C.v, kz, 9); }
    // il massimo: y = 5, y′ = 2,5
    const km = P(t, 58.7, 59.2);
    if (km > 0) {
      dashed(ctx, mS(5, 2.5), mS(5, 0), C.g, km, 1);
      dashed(ctx, mS(5, 2.5), mS(0, 2.5), C.g, km, 1);
      dot(ctx, mS(5, 2.5), C.g, P(t, 58.7, 59.1, E.back), 10);
      txt(ctx, '5', mS(5, 0)[0], MO.oy + 30, { size: 36, weight: 600, color: C.g, alpha: km });
      txt(ctx, '2,5', MO.ox - 12, mS(0, 2.5)[1], { size: 36, weight: 600, color: C.g, align: 'right', alpha: km });
    }
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'All’inizio cresce come l’esponenziale,\npoi il freno la avvicina al {g:tetto}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'senza freni', '{my:y = 0,5 · eˣ}', 46], [960, 'con il freno', LOG, 40], [1430, 'il flesso', '{my:y}{mink: = }{mg:K}{mink:/2}', 46]];
  pills.forEach(([x, testa, f, size], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    txt(ctx, testa, x, 486, { size: 30, weight: 400, color: C.dim });
    drawRich(ctx, f, x, 548, { size });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.6], ['pop', 8.2, .5],                         // il piano, y′ = r · y
    ['pop', 13.0, .45], ['pop', 13.2, .2], ['pop', 14.8, .5],                          // r = 1, il punto di partenza
    ['tono', 18.3, 20.3, [.05, .1, .2, .45, 1]], ['pop', 18.3, .6],                   // l'esponenziale sale e scappa
    ['traccia', 23.0, 24.0], ['pop', 23.0, .85],                                      // il tetto K
    ['pop', 27.5, .55], ['pop', 33.2, .6], ['ding', 33.7],                            // il freno, la logistica
    ['soffio', 37.9],
    ['tono', 38.3, 39.8, [.04, .07, .1]],                                            // all'inizio come l'esponenziale
    ['tono', 43.4, 47.6, [.1, .25, .45, .6, .66]],                                     // si stacca e rallenta
    ['tono', 48.2, 52.6, [.68, .82, .9, .94, .95]],                                   // si appoggia sul tetto
    ['soffio', 53.4], ['traccia', 53.8, 55.3], ['pop', 55.9, .2],                     // la parabola della velocità
    ['traccia', 58.7, 59.3], ['ding', 59.1],                                          // il massimo, y = 5
    ['traccia', 63.7, 64.4], ['pop', 64.1, .5],                                       // la tangente, il flesso
    ['pop', 68.7, .3], ['pop', 69.5, .8],                                             // accelera, frena
    ['soffio', 73.0], ['pop', 75.2, .5], ['pop', 75.7, .6], ['pop', 76.2, .7],        // in una frase
  ];
  return {
    titolo: 'Crescere fino al tetto', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 37.7, 'il freno'], [37.7, 53.0, 'la curva logistica'], [53.0, FINE, 'il flesso']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
