'use strict';
/* Il valore assoluto è una distanza — |3| e |−3| sono la distanza da 0; |x| = x se x ≥ 0, −x se x < 0;
   |x − 3| è la distanza fra x e 3, e |x − 3| < 2 vuol dire 1 < x < 5, l'intervallo (1, 5). Argomento: valore-assoluto-irrazionali. */
CVIDEO.registra('valore-assoluto-irrazionali/distanza', M => {
  const { W, C, E, P, life, clamp, css, TITOLI, conFont, drawRich, richW, txt,
    dot, hole, glowStroke, arrowHead, card } = M;

const FINE = 92.3, DURATA = 103.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [13.1, 'felice'], [15.3, 'neutro'],
  [23.7, 'sorpreso'], [25.8, 'neutro'], [31.4, 'pensa'], [33.5, 'neutro'], [39.7, 'felice'], [41.8, 'neutro'],
  [45.7, 'pensa'], [47.8, 'neutro'], [57.2, 'sorpreso'], [59.3, 'neutro'], [62.6, 'pensa'], [64.7, 'neutro'],
  [74.6, 'felice'], [76.7, 'neutro'], [79.5, 'sorpreso'], [81.6, 'neutro'], [84.0, 'felice'], [86.1, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 7.0, 'occhiolino'], [FINE + 9.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede; i salti sulla retta stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Quanto dista {mink:−3} da zero?\nE quanto dista {mink:3}?'],
  // 1 · la distanza da zero
  [7.9, 11.5, 'Ecco la retta dei numeri:\nparto dallo {v:zero}.'],
  [13.1, 17.9, 'Da 0 a 3 ci sono {g:3 passi}:\n{mink:3} dista 3 da zero.'],
  [19.5, 23.6, 'Da 0 a {mink:−3}, ancora {g:3 passi},\nma dall\'altra parte.'],
  [23.7, 27.2, 'Questa distanza da zero si chiama\n{v:valore assoluto}.'],
  [27.3, 31.3, 'Si scrive fra due sbarre:\n{mink:|3| = 3} e {mink:|−3| = 3}.'],
  [31.4, 35.6, 'Se {mx:x} è positivo o zero,\nresta com\'è: {mink:|}{mx:x}{mink:| = }{mx:x}.'],
  [35.7, 39.6, 'Se {mx:x} è negativo, cambio segno:\n{mink:|}{mx:x}{mink:| = −}{mx:x}.'],
  [39.7, 44.3, 'Con {mx:x}{mink: = −3} viene {mink:−(−3) = 3}:\nil risultato non è mai {r:negativo}.'],
  // 2 · la distanza da 3
  [45.7, 49.7, 'E {mink:|}{mx:x}{mink: − 3|}? È la distanza\nfra {mx:x} e {mink:3}.'],
  [51.3, 55.6, 'Con {mx:x}{mink: = 6}: {mink:|6 − 3| = 3}.\nDa 3 a 6 ci sono {g:3 passi}.'],
  [57.2, 61.5, 'Con {mx:x}{mink: = 0}: {mink:|0 − 3| = |−3| = 3}.\nAnche 0 è a {g:3 passi} da 3.'],
  // 3 · |x − 3| < 2
  [62.6, 67.0, 'Ora {mink:|}{mx:x}{mink: − 3| < 2}: i numeri\nche distano da 3 {g:meno di 2}.'],
  [68.8, 73.4, 'Due passi a destra di 3: {mink:5}.\nDue passi a sinistra: {mink:1}.'],
  [74.6, 79.4, 'Fra 1 e 5 vanno {v:tutti} bene:\ndistano da 3 meno di 2.'],
  [79.5, 83.9, '1 e 5 invece distano {r:proprio 2}:\nsono {r:esclusi}, pallini vuoti.'],
  [84.0, 87.6, 'Si scrive {mink:1 < }{mx:x}{mink: < 5},\ncioè l\'intervallo {mink:(1, 5)}.'],
  [87.7, 92.2, 'Le tonde dicono che 1 e 5\nsono {r:esclusi}, come i pallini.'],
  // chiusura
  [94.0, 101.0, 'Il valore assoluto è una distanza:\nda zero, o da un altro numero.'],
];

// la retta dei numeri: 0 in OX, un'unità = U pixel
const RY = 640, OX = 780, U = 120, XA = -5.4, XB = 7.6;
const X = v => OX + v * U;
const TOP = [80, 110, 1760, 310], LINE = [80, 450, 1760, 350];
const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
// numero sotto la retta, pieno, su un fondino del colore della scheda
function numero(ctx, v, al, col = C.dim, size = 30, weight = 500) {
  if (al <= 0) return;
  const s = lab(v), w = size * .62 * Array.from(s).length + 14, h = size + 8;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.fillRect(X(v) - w / 2, RY + 46 - h / 2, w, h);
  ctx.restore();
  txt(ctx, s, X(v), RY + 46, { size, weight, color: col, alpha: al });
}
// i passi da a verso b, uno per unità: archetti sopra la retta che si disegnano uno dopo l'altro
function passi(ctx, a, b, k, al = 1) {
  if (k <= 0 || al <= 0) return;
  const n = Math.abs(b - a), s = Math.sign(b - a);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g); ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const f = clamp(k * n - i); if (f <= 0) break;
    const cx = X(a + (i + .5) * s), rx = U / 2 - 10, ry = 46;
    ctx.beginPath();
    if (s > 0) ctx.ellipse(cx, RY - 6, rx, ry, 0, Math.PI, Math.PI + f * Math.PI);
    else ctx.ellipse(cx, RY - 6, rx, ry, 0, 0, -f * Math.PI, true);
    ctx.stroke();
    if (f >= 1) arrowHead(ctx, [cx + s * rx, RY - 8], Math.PI / 2 + s * .25, C.g, .7);
  }
  ctx.restore();
}
// quanti passi: il numero sopra gli archetti
function quanti(ctx, a, b, al) {
  txt(ctx, String(Math.abs(b - a)), X((a + b) / 2), RY - 92, { size: 48, weight: 600, color: C.g, alpha: al });
}
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .14);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
// la graffa della definizione, aperta a destra
function graffa(ctx, x, y0, y1, al) {
  if (al <= 0) return;
  const m = (y0 + y1) / 2, w = 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0); ctx.quadraticCurveTo(x, y0, x, y0 + 22); ctx.lineTo(x, m - 18);
  ctx.quadraticCurveTo(x, m, x - w, m); ctx.quadraticCurveTo(x, m, x, m + 18); ctx.lineTo(x, y1 - 22);
  ctx.quadraticCurveTo(x, y1, x + w, y1); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il valore assoluto è una distanza', W / 2, 180, { size: 100, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la retta (7.5–FINE)
function sceneRetta(ctx, t) {
  if (t < 7.4 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LINE, P(t, 7.5, 8.2));
  const kb = P(t, 7.7, 8.5);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(XA) - 10, RY); ctx.lineTo(X(XB) + 10, RY); ctx.stroke();
    arrowHead(ctx, [X(XB) + 24, RY], 0, C.ink);
    ctx.lineWidth = 2.5;
    for (let i = -5; i <= 7; i++) { ctx.beginPath(); ctx.moveTo(X(i), RY - 10); ctx.lineTo(X(i), RY + 10); ctx.stroke(); }
    ctx.restore();
  }
  // i numeri: grigi; quelli di cui si parla colorati e più grandi
  const kn = P(t, 7.9, 8.7);
  for (let i = -5; i <= 7; i++) numero(ctx, i, kn);
  const a1 = 1 - P(t, 44.3, 44.9);                       // il capitolo 1 se ne va
  const a6 = 1 - P(t, 55.6, 56.1), a0 = 1 - P(t, 61.5, 62.0), aP = 1 - P(t, 83.9, 84.4);
  numero(ctx, 0, life(t, 8.0, 44.7, .4, .4), C.v, 44, 600);
  numero(ctx, 3, P(t, 12.8, 13.2) * a1, C.x, 44, 600);
  numero(ctx, -3, P(t, 19.2, 19.6) * a1, C.x, 44, 600);
  numero(ctx, 3, life(t, 44.8, FINE + .2, .4, .4), C.v, 44, 600);
  numero(ctx, 6, P(t, 51.0, 51.4) * a6, C.x, 44, 600);
  numero(ctx, 0, P(t, 56.9, 57.3) * a0, C.x, 44, 600);
  numero(ctx, 1, P(t, 68.3, 68.7), C.v, 44, 600);
  numero(ctx, 5, P(t, 68.3, 68.7), C.v, 44, 600);
  // la soluzione di |x − 3| < 2: il tratto fra 1 e 5, estremi esclusi
  glowStroke(ctx, [[X(1), RY], [X(5), RY]], P(t, 73.5, 74.5), C.v, 9);
  // i punti
  dot(ctx, [X(0), RY], C.v, life(t, 8.0, 44.7, .4, .4), 10);
  dot(ctx, [X(3), RY], C.x, P(t, 12.8, 13.2, E.back) * a1, 11);
  dot(ctx, [X(-3), RY], C.x, P(t, 19.2, 19.6, E.back) * a1, 11);
  dot(ctx, [X(3), RY], C.v, life(t, 44.8, 73.9, .4, .4), 10);
  dot(ctx, [X(6), RY], C.x, P(t, 51.0, 51.4, E.back) * a6, 11);
  dot(ctx, [X(0), RY], C.x, P(t, 56.9, 57.3, E.back) * a0, 11);
  // i passi, e quanti sono
  passi(ctx, 0, 3, P(t, 11.6, 13.0, E.lin), a1); quanti(ctx, 0, 3, P(t, 12.9, 13.3) * a1);
  passi(ctx, 0, -3, P(t, 18.0, 19.4, E.lin), a1); quanti(ctx, 0, -3, P(t, 19.3, 19.7) * a1);
  passi(ctx, 3, 6, P(t, 49.8, 51.2, E.lin), a6); quanti(ctx, 3, 6, P(t, 51.1, 51.5) * a6);
  passi(ctx, 3, 0, P(t, 55.9, 57.1, E.lin), a0); quanti(ctx, 3, 0, P(t, 57.0, 57.4) * a0);
  passi(ctx, 3, 5, P(t, 67.1, 68.4, E.lin), aP); quanti(ctx, 3, 5, P(t, 68.3, 68.7) * aP);
  passi(ctx, 3, 1, P(t, 67.1, 68.4, E.lin), aP); quanti(ctx, 3, 1, P(t, 68.3, 68.7) * aP);
  // i pallini vuoti sopra le punte dei passi
  // prima un punto grigio, neutro; diventa un pallino vuoto quando Ada dice «pallini vuoti»
  const kVuoto = P(t, 79.6, 80.0);
  for (const v of [1, 5]) {
    dot(ctx, [X(v), RY], C.dim, P(t, 68.3, 68.7, E.back) * (1 - kVuoto), 11);
    hole(ctx, [X(v), RY], C.v, P(t, 79.6, 80.0, E.back), 15);
  }
  ctx.restore();
}

// la scheda in alto: a sinistra i valori assoluti, a destra la definizione e poi la disequazione
function sceneTop(ctx, t) {
  const pa = life(t, 23.4, FINE + .2, .6, .8);   // compare quando Ada dà il nome al valore assoluto
  if (pa <= 0) return;
  card(ctx, ...TOP, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  const sep = Math.max(P(t, 27.3, 27.8) * (1 - P(t, 44.3, 44.9)), P(t, 45.0, 45.5));
  if (sep > 0) { ctx.save(); ctx.globalAlpha *= sep; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(780, 140); ctx.lineTo(780, 390); ctx.stroke(); ctx.restore(); }
  // capitolo 1
  const c1 = 1 - P(t, 44.3, 44.9);
  if (c1 > 0) {
    ctx.save(); ctx.globalAlpha *= c1;
    conFont(TITOLI, () => drawRich(ctx, '{dim:valore assoluto}', 430, 158, { size: 34, weight: 600, local: t - 23.8 }));
    drawRich(ctx, '{mink:|3| = 3}', 430, 245, { size: 60, local: t - 27.5 });
    drawRich(ctx, '{mink:|−3| = 3}', 430, 340, { size: 60, local: t - 28.3 });
    // la definizione
    const k1 = P(t, 31.5, 32.0);
    drawRich(ctx, '{mink:|}{mx:x}{mink:| =}', 1010, 240, { size: 56, align: 'right', local: t - 31.5 });
    graffa(ctx, 1040, 160, 320, k1);
    drawRich(ctx, '{mx:x}', 1075, 195, { size: 56, align: 'left', local: t - 31.7 });
    drawRich(ctx, 'se {mx:x}{mink: ≥ 0}', 1260, 195, { size: 48, align: 'left', local: t - 31.9 });
    drawRich(ctx, '{mink:−}{mx:x}', 1075, 285, { size: 56, align: 'left', local: t - 35.8 });
    drawRich(ctx, 'se {mx:x}{mink: < 0}', 1260, 285, { size: 48, align: 'left', local: t - 36.0 });
    drawRich(ctx, 'con {mx:x}{mink: = −3}:   {mink:−}{mx:x}{mink: = −(−3) = 3}', 1270, 370, { size: 40, local: t - 39.8 });
    ctx.restore();
  }
  // capitolo 2 e 3
  if (t > 44.8) {
    drawRich(ctx, '{mink:|}{mx:x}{mink: − 3|}', 430, 178, { size: 60, local: t - 45.8 });
    drawRich(ctx, '{dim:la distanza fra }{mx:x}{dim: e 3}', 430, 250, { size: 36, local: t - 46.6 });
    drawRich(ctx, '{mink:|6 − 3| = 3}', 430, 340, { size: 52, local: t - 51.4, alpha: 1 - P(t, 55.6, 56.0) });
    drawRich(ctx, '{mink:|0 − 3| = |−3| = 3}', 430, 340, { size: 52, local: t - 57.3, alpha: 1 - P(t, 61.5, 62.0) });
    drawRich(ctx, '{mink:|}{mx:x}{mink: − 3| < 2}', 1270, 172, { size: 56, local: t - 62.7 });
    drawRich(ctx, '{mink:1 < }{mx:x}{mink: < 5}', 1270, 262, { size: 56, local: t - 84.1 });
    const XN = 1270, YN = 352;
    drawRich(ctx, '{mink:(1, 5)}', XN, YN, { size: 64, local: t - 85.0 });
    if (t > 87.5) {
      const wT = richW(ctx, '{mink:(1, 5)}', 64), wA = richW(ctx, '{mink:(}', 64), wC = richW(ctx, '{mink:)}', 64);
      const x0 = XN - wT / 2, ev = life(t, 87.8, 92.0, .3, .3);
      evidenzia(ctx, x0 - 6, YN - 44, wA + 6, 88, C.r, ev);
      evidenzia(ctx, x0 + wT - wC, YN - 44, wC + 6, 88, C.r, ev);
    }
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il valore assoluto è una {v:distanza},\ne una distanza non è mai negativa.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'distanza da zero\n{mink:|−3| = 3}'], [960, 'distanza fra {mx:x} e 3\n{mink:|}{mx:x}{mink: − 3|}'], [1430, 'meno di 2 da 3\n{mink:(1, 5)}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, s, x, 520, { size: 36, weight: 400, lh: 1.45 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il valore assoluto è una distanza', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 44.3, 'la distanza da zero'], [44.3, 62.2, 'la distanza da 3'], [62.2, FINE, '{mink:|}{mx:x}{mink: − 3| < 2}']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRetta(ctx, t); sceneTop(ctx, t); sceneFine(ctx, t); },
  };
});
