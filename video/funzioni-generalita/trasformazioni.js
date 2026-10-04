'use strict';
/* Spostare e stirare un grafico — f(x) + k, f(x − h), a · f(x), −f(x) sulla stessa parabola.
   Argomento: funzioni-generalita. */
CVIDEO.registra('funzioni-generalita/trasformazioni', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, dot, arrowHead, glowStroke, makePlane, card } = M;

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [90.1, 190], [91.4, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [90.1, 1050], [91.4, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [90.1, 2.2], [91.4, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [90.1, 2], [91.4, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [90.1, -1.5], [91.4, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.5, 'pensa'], [6.4, 'neutro'],
  [15.0, 'felice'], [17.0, 'neutro'], [23.0, 'sorpreso'], [25.0, 'neutro'],
  [34.1, 'sorpreso'], [36.3, 'neutro'], [40.8, 'pensa'], [42.9, 'felice'], [44.9, 'neutro'],
  [58.2, 'felice'], [60.2, 'neutro'], [72.5, 'sorpreso'], [74.5, 'neutro'],
  [78.8, 'felice'], [80.8, 'neutro'], [83.3, 'felice'], [86.3, 'festa'], [88.3, 'felice'], [97.8, 'occhiolino'],
];
const FUMETTI = [
  [1.6, 6.3, 'Come si sposta un grafico\n{v:senza rifare i conti}?'],
  // 1 · su e giù
  [7.9, 12.3, 'Ecco {mink:f(}{mx:x}{mink:) = }{mx:x}{mink:²}:\nil vertice sta nell\'origine.'],
  [12.4, 17.4, 'Aggiungo 2 a ogni risultato:\n{mink:y = }{mx:x}{mink:²}{mv: + 2}.'],
  [17.5, 21.0, 'Ogni punto {g:sale di 2}.'],
  [21.1, 25.8, 'Con {mv:− 3} invece\nil grafico {r:scende} di 3.'],
  [25.9, 30.9, 'In generale, {mink:f(}{mx:x}{mink:) + }{mv:k}\nsi sposta di {mv:k} in verticale.'],
  // 2 · a destra e a sinistra
  [31.2, 35.6, 'Ora cambio l\'ingresso:\n{mink:y = (}{mx:x}{mv: − 3}{mink:)²}.'],
  [35.7, 40.7, 'Va a {g:destra} di 3,\nanche se c\'è un meno!'],
  [40.8, 45.5, 'Il vertice va dove\n{mink:(}{mx:x}{mink: − 3)} vale {g:zero}.'],
  [45.6, 50.3, 'Con {mink:(}{mx:x}{mv: + 2}{mink:)²}\nva a {g:sinistra} di 2.'],
  [50.4, 54.8, 'E {mink:f(}{mx:x}{mink: − }{mv:h}{mink:)}\nva a destra di {mv:h}.'],
  // 3 · stirare e ribaltare
  [55.5, 59.9, 'Moltiplico il risultato per 2:\n{mink:y = }{mv:2}{mx:x}{mink:²}.'],
  [60.0, 64.1, 'Ogni altezza {g:raddoppia}:\nil grafico si allunga.'],
  [64.2, 68.9, 'Con {mv:a}{mink: · f(}{mx:x}{mink:)},\n{mv:a} è il fattore che stira.'],
  [70.3, 75.6, 'Con il meno, {mink:y = }{mv:−}{mx:x}{mink:²}:\nsi {v:ribalta} sotto l\'asse {mx:x}.'],
  // 4 · tutto insieme
  [76.8, 81.4, 'Prima {g:3 a destra}:\n{mink:y = (}{mx:x}{mv: − 3}{mink:)²}.'],
  [81.5, 86.1, 'Poi {g:2 su}:\n{mink:y = (}{mx:x}{mink: − 3)²}{mv: + 2}.'],
  [86.2, 90.0, 'Il vertice finisce in {g:(3; 2)}.'],
  // chiusura
  [92.5, 97.6, 'Ingresso: si muove in {x:orizzontale}.\nUscita: si muove in {y:verticale}.'],
];

function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Spostare un grafico', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la parabola y = a(x − h)² + k, con i tre numeri che cambiano nel tempo
const kT = t => kf(t, [[13.6, 0], [15.0, 2], [21.6, 2], [23.0, -3], [30.2, -3], [31.0, 0], [81.9, 0], [83.3, 2]]);
const hT = t => kf(t, [[32.7, 0], [34.1, 3], [46.3, 3], [47.7, -2], [50.2, -2], [54.85, -2], [55.4, 0], [77.4, 0], [78.8, 3]]);
const aT = t => kf(t, [[56.8, 1], [58.2, 2], [69.4, 2], [70.1, 1], [71.1, 1], [72.5, -1], [76.24, -1], [76.26, 1]]);
// la parabola sparisce e ricompare mentre torna dritta (fra il capitolo 3 e il 4)
const vela = t => 1 - life(t, 75.8, 76.7, .44, .44);
const PL = makePlane({ ox: 650, oy: 470, u: 62, x0: -7, x1: 7, y0: -4.5, y1: 4.5 });
const CLIP = [165, 190, 970, 560];
function freccia(ctx, a, b, col, al = 1) {
  if (al <= 0) return;
  const A = PL.toS(a[0], a[1]), B = PL.toS(b[0], b[1]), ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C[col]); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0] - Math.cos(ang) * 10, B[1] - Math.sin(ang) * 10); ctx.stroke();
  arrowHead(ctx, B, ang, C[col], 1.1);
  ctx.restore();
}
function scenePiano(ctx, t) {
  if (t < 7.5 || t > 90.5) return;
  const A = 1 - P(t, 89.9, 90.5);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, 150, 110, 1000, 690, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  const a = aT(t), h = hT(t), k = kT(t);
  ctx.save(); ctx.beginPath(); ctx.rect(...CLIP); ctx.clip();
  // la parabola di partenza, tratteggiata
  const gh = P(t, 12.6, 13.2);
  if (gh > 0) {
    ctx.save(); ctx.globalAlpha *= gh; ctx.strokeStyle = css(C.dim, .8); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
    const pts = PL.curve(x => x * x, -2.3, 2.3, 120);
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  }
  const r = Math.sqrt(5 / Math.max(Math.abs(a), .05)) + .1;
  ctx.globalAlpha *= vela(t);
  glowStroke(ctx, PL.curve(x => a * (x - h) ** 2 + k, h - r, h + r, 200), P(t, 8.4, 9.6), C.y);
  ctx.restore();
  // il vertice
  const va = P(t, 9.4, 9.8, E.back) * vela(t);
  const vl = va * (1 - life(t, 54.8, 76.7, .4, .4));
  if (va > 0) {
    const V = PL.toS(h, k);
    dot(ctx, V, C.ink, va, 10);
    // la V sta dentro la parabola, appena sopra il vertice (sotto, se la parabola è ribaltata)
    drawRich(ctx, '{mink:V}', V[0] + 18, V[1] - 50, { size: 36, alpha: vl });
    const fin = life(t, 86.3, 90.1, .4, .4);
    if (fin > 0) drawRich(ctx, '{g:(3; 2)}', V[0], V[1] + 44, { size: 40, alpha: fin, local: t - 79.9 });
  }
  // le frecce che mostrano lo spostamento
  const su = life(t, 17.6, 21.0, .4, .3), giu = life(t, 23.2, 25.8, .4, .3);
  for (const x of [-1.5, 0, 1.5]) {
    freccia(ctx, [x, x * x], [x, x * x + 2], 'g', su);
    freccia(ctx, [x, x * x], [x, x * x - 3], 'r', giu);
  }
  freccia(ctx, [0, -1.5], [3, -1.5], 'g', life(t, 35.9, 40.7, .4, .3));
  freccia(ctx, [0, -1.5], [-2, -1.5], 'g', life(t, 47.8, 50.3, .4, .3));
  freccia(ctx, [0, -1.5], [3, -1.5], 'g', life(t, 77.5, 81.2, .4, .3));
  for (const x of [1.5, 3, 4.5]) freccia(ctx, [x, (x - 3) ** 2], [x, (x - 3) ** 2 + 2], 'g', life(t, 82.0, 85.7, .4, .3));
  const zero = life(t, 41.0, 45.5, .4, .3);
  if (zero > 0) {
    const Z = PL.toS(3, -2.4);
    drawRich(ctx, '{mx:x}{mink: − 3 = 0  ⇒  }{mx:x}{mink: = 3}', Z[0], Z[1], { size: 34, alpha: zero, local: t - 41.0 });
  }
  const st = life(t, 60.1, 68.9, .4, .3);
  for (const x of [-1, 1]) freccia(ctx, [x, 1], [x, 2], 'g', st);
  const rib = life(t, 72.8, 75.6, .4, .3);
  for (const x of [-1.5, 1.5]) freccia(ctx, [x, 2.25], [x, -2.25], 'v', rib);
  ctx.restore();
}

// la scheda a destra: l'equazione di adesso e le regole raccolte
const EQ = [
  [8.6, '{mink:y = }{mx:x}{mink:²}'], [13.0, '{mink:y = }{mx:x}{mink:²}{mv: + 2}'], [21.4, '{mink:y = }{mx:x}{mink:²}{mv: − 3}'],
  [30.5, '{mink:y = }{mx:x}{mink:²}'], [31.5, '{mink:y = (}{mx:x}{mv: − 3}{mink:)²}'], [45.8, '{mink:y = (}{mx:x}{mv: + 2}{mink:)²}'],
  [54.8, '{mink:y = }{mx:x}{mink:²}'], [55.8, '{mink:y = }{mv:2}{mx:x}{mink:²}'], [69.4, '{mink:y = }{mx:x}{mink:²}'], [70.8, '{mink:y = }{mv:−}{mx:x}{mink:²}'],
  [76.25, '{mink:y = }{mx:x}{mink:²}'], [77.4, '{mink:y = (}{mx:x}{mv: − 3}{mink:)²}'], [81.9, '{mink:y = (}{mx:x}{mink: − 3)²}{mv: + 2}'],
];
const REGOLE = [
  [26.0, '{mink:f(}{mx:x}{mink:) + }{mv:k}', 'su o giù di {mv:k}'],
  [50.5, '{mink:f(}{mx:x}{mink: − }{mv:h}{mink:)}', 'va a destra di {mv:h}'],
  [64.3, '{mv:a}{mink: · f(}{mx:x}{mink:)}', 'si stira in verticale'],
  [73.0, '{mv:−}{mink:f(}{mx:x}{mink:)}', 'si ribalta sull\'asse {mx:x}'],
];
function sceneScheda(ctx, t) {
  const ca = life(t, 8.2, 90.5, .5, .6);
  if (ca <= 0) return;
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, 1210, 110, 640, 690);
  conFont(TITOLI, () => drawRich(ctx, '{dim:il grafico di}', 1530, 165, { size: 32, weight: 600 }));
  EQ.forEach(([a, s], i) => {
    const b = i + 1 < EQ.length ? EQ[i + 1][0] : 99;
    const al = Math.min(P(t, a, a + .35), 1 - P(t, b - .3, b));
    if (al > 0) drawRich(ctx, s, 1530, 240, { size: 60, alpha: al });
  });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 305); ctx.lineTo(1810, 305); ctx.stroke();
  const ha = P(t, 26.0, 26.5);
  if (ha > 0) drawRich(ctx, '{dim:con }{mink:f(}{mx:x}{mink:) = }{mx:x}{mink:²}', 1530, 350, { size: 36, alpha: ha });
  REGOLE.forEach(([a, f, e], i) => {
    const k = P(t, a, a + .5, E.out);
    if (k <= 0) return;
    const y = 420 + i * 92;
    drawRich(ctx, f, 1245, y, { size: 42, align: 'left', alpha: k, local: t - a });
    drawRich(ctx, e, 1490, y, { size: 30, align: 'left', alpha: k, local: t - a - .3 });
  });
  ctx.restore();
}

// chiusura (90.1–100.7)
function sceneFine(ctx, t) {
  if (t < 90.1) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 90.4 });
    drawRich(ctx, 'Cambi l\'{x:ingresso}: il grafico va di lato.\nCambi l\'{y:uscita}: va su, giù, si stira.', W / 2, 290, { size: 62, weight: 600, local: t - 90.8, stagger: .08 });
  });
  const pills = [[490, 'su e giù', '{mink:f(}{mx:x}{mink:) + }{mv:k}'], [960, 'destra e sinistra', '{mink:f(}{mx:x}{mink: − }{mv:h}{mink:)}'], [1430, 'stira e ribalta', '{mv:a}{mink: · f(}{mx:x}{mink:)}']];
  pills.forEach(([x, testa, f], i) => {
    const a = 92.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, `{dim:${testa}}`, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, x, 545, { size: 46 });
    ctx.restore();
  });
}

  return {
    titolo: 'Spostare un grafico', durata: 100.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [98.5, 99.5] },
    capitoli: [[7.5, 30.5, 'su e giù'], [30.5, 54.8, 'a destra e a sinistra'], [54.8, 75.8, 'stirare e ribaltare'], [75.8, 90.1, 'tutto insieme']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
