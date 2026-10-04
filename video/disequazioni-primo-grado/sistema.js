'use strict';
/* Il sistema: la parte comune — le soluzioni di due disequazioni una sotto l'altra sulla retta; il sistema tiene solo l'intersezione, e se non c'è S è vuoto. Argomento: disequazioni-primo-grado. */
CVIDEO.registra('disequazioni-primo-grado/sistema', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, txt,
    dot, hole, glowStroke, dashed, arrowHead, card } = M;
  // il simbolo dell'insieme vuoto è quello tondo di KaTeX_AMS
  if (typeof document !== 'undefined' && document.fonts) document.fonts.load('100px KaTeX_AMS').catch(() => {});

// la retta e tutto quello che le sta sopra partono D secondi dopo la prima versione (c'è un passaggio in più)
const D = 5.4, FINE = 79.8, DURATA = 91.8, FR = FINE - D;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [23.1, 'sorpreso'], [25.2, 'neutro'],
  [40.3, 'pensa'], [44.7, 'felice'], [46.8, 'neutro'], [55.0, 'felice'], [57.2, 'neutro'],
  [64.6, 'pensa'], [70.4, 'sorpreso'], [72.5, 'neutro'], [FINE + 1.0, 'felice'], [86.0, 'occhiolino'], [88.2, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede; i movimenti stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Due disequazioni vere insieme:\nquali numeri vanno bene?'],
  // 1 · il sistema
  [7.9, 12.5, 'La graffa le mette insieme: è un\n{v:sistema}, e si legge «e».'],
  [12.6, 16.1, '{mink:≥} si legge\n«maggiore o uguale».'],
  [16.2, 19.6, 'Risolvo la prima: {mink:2}{mx:x}{mink: > −4},\nquindi {mx:x}{mink: > −2}.'],
  [19.7, 23.0, 'Nella seconda tolgo 5:\n{mink:−}{mx:x}{mink: ≥ −8}.'],
  [23.1, 27.6, 'Divido per {mink:−1}: il verso si gira,\n{mx:x}{mink: ≤ 8}, «minore o uguale».'],
  // 2 · sulla retta, una sotto l'altra
  [29.4, 33.9, '{mx:x}{mink: > −2}: pallino vuoto in −2\ne tutti i numeri a destra.'],
  [35.7, 40.2, '{mx:x}{mink: ≤ 8}: pallino {g:pieno} in 8\ne tutti i numeri a sinistra.'],
  // 3 · la parte comune
  [40.3, 44.6, 'Il 10 va bene per la prima,\n{r:non} per la seconda.'],
  [44.7, 48.2, 'Il 3 va bene per {g:tutte e due}.'],
  [48.3, 53.0, 'Il sistema vuole solo i numeri buoni\nper {g:tutte e due}.'],
  [55.0, 60.0, 'È la parte comune, l\'{v:intersezione}:\nda −2 escluso a 8 incluso.'],
  [60.1, 64.0, 'Si scrive {mink:−2 < }{mx:x}{mink: ≤ 8},\noppure {mink:(−2, 8]}.'],
  // 4 · niente in comune
  [64.6, 68.6, 'E se le due soluzioni\nnon hanno niente in comune?'],
  [70.4, 74.9, 'Con {mx:x}{mink: > 4} e {mx:x}{mink: < 1}\nnon c\'è nessun numero in comune.'],
  [75.0, 79.2, 'Nessun numero va bene: l\'insieme\ndelle soluzioni {mink:S} è {r:vuoto}.'],
  // chiusura
  [81.2, 89.0, 'Un sistema vuole i numeri buoni\nper {g:tutte}: la parte comune.'],
];

// la retta dei numeri in basso, con le due soluzioni su due righe sopra: 0 in OX, un'unità = U pixel
const RY = 710, Y1 = 545, Y2 = 625, OX = 633, U = 105, XA = -4.6, XB = 10.6;
const X = v => OX + v * U;
const LINE = [80, 440, 1760, 360], TOP = [80, 110, 1760, 300];
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
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .14);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
// un raggio da a verso b (la frazione k), con la punta in fondo
function raggio(ctx, a, b, y, col, k, w = 8) {
  if (k <= 0) return;
  const e = glowStroke(ctx, [[X(a), y], [X(b), y]], k, col, w);
  if (e) arrowHead(ctx, e[0], b > a ? 0 : Math.PI, col, 1.4);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il sistema: la parte comune', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 2–4 · la retta e le due righe (21–FINE)
function sceneRetta(ctx, t) {
  if (t < 20.9 || t > FR + .3) return;
  const al = 1 - P(t, FR - .6, FR + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LINE, P(t, 21.0, 21.7));
  const kb = P(t, 21.2, 22.0);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(XA) - 10, RY); ctx.lineTo(X(XB) + 10, RY); ctx.stroke();
    arrowHead(ctx, [X(XB) + 24, RY], 0, C.ink);
    ctx.lineWidth = 2.5;
    for (let i = -4; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(X(i), RY - 10); ctx.lineTo(X(i), RY + 10); ctx.stroke(); }
    ctx.restore();
  }
  // 2–3 · x > −2 e x ≤ 8, poi la parte comune
  const a1 = 1 - P(t, 59.2, 59.6);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    dashed(ctx, [X(-2), Y1 + 16], [X(-2), RY - 12], C.x, P(t, 23.4, 23.9), .8);
    dashed(ctx, [X(8), Y2 + 16], [X(8), RY - 12], C.y, P(t, 29.7, 30.2), .8);
    raggio(ctx, -2, 10.75, Y1, C.x, P(t, 22.6, 23.8));
    raggio(ctx, 8, -4.4, Y2, C.y, P(t, 28.9, 30.1));
    hole(ctx, [X(-2), Y1], C.x, P(t, 22.4, 22.7, E.back), 14);
    dot(ctx, [X(8), Y2], C.y, P(t, 28.7, 29.0, E.back), 14);
    drawRich(ctx, '{mx:x > −2}', X(-2) - 34, Y1, { size: 40, align: 'right', alpha: P(t, 23.6, 24.0) });
    drawRich(ctx, '{my:x ≤ 8}', X(8) + 34, Y2, { size: 40, align: 'left', alpha: P(t, 29.9, 30.3) });
    // le prove: 10 e 3, con un pallino su ogni riga (verde se ci sta, rosso se no)
    for (const [v, a, b] of [[10, 35.0, 39.4], [3, 39.4, 48.0]]) {
      const k = life(t, a, b, .3, .4);
      if (k <= 0) continue;
      ctx.save(); ctx.globalAlpha *= k;
      dashed(ctx, [X(v), Y1 - 40], [X(v), RY - 12], C.ink, 1, .5);
      dot(ctx, [X(v), Y1], C.g, 1, 12);
      dot(ctx, [X(v), Y2], v <= 8 ? C.g : C.r, 1, 12);
      ctx.restore();
    }
    // la parte comune, sulla retta
    const ki = P(t, 47.8, 49.3, E.io);
    if (ki > 0) glowStroke(ctx, [[X(-2), RY], [X(8), RY]], ki, C.g, 10);
    hole(ctx, [X(-2), RY], C.g, P(t, 47.8, 48.1, E.back), 15);
    dot(ctx, [X(8), RY], C.g, P(t, 49.1, 49.4, E.back), 15);
    ctx.restore();
  }
  // 4 · x > 4 e x < 1: nessun tratto in comune
  const a2 = P(t, 63.3, 63.6);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    dashed(ctx, [X(4), Y1 + 16], [X(4), RY - 12], C.x, P(t, 64.3, 64.8), .8);
    dashed(ctx, [X(1), Y2 + 16], [X(1), RY - 12], C.y, P(t, 64.3, 64.8), .8);
    raggio(ctx, 4, 10.75, Y1, C.x, P(t, 63.5, 64.8));
    raggio(ctx, 1, -4.4, Y2, C.y, P(t, 63.5, 64.8));
    hole(ctx, [X(4), Y1], C.x, P(t, 63.3, 63.6, E.back), 14);
    hole(ctx, [X(1), Y2], C.y, P(t, 63.3, 63.6, E.back), 14);
    drawRich(ctx, '{mx:x > 4}', X(4) - 34, Y1, { size: 40, align: 'right', alpha: P(t, 64.6, 65.0) });
    drawRich(ctx, '{my:x < 1}', X(1) + 34, Y2, { size: 40, align: 'left', alpha: P(t, 64.6, 65.0) });
    ctx.restore();
  }
  // i numeri
  const kn = P(t, 21.4, 22.4);
  for (let i = -4; i <= 10; i++) numero(ctx, i, kn);
  numero(ctx, -2, life(t, 23.0, 59.6, .3, .4), C.x, 44, 600);
  numero(ctx, 8, life(t, 29.3, 59.6, .3, .4), C.y, 44, 600);
  numero(ctx, -2, life(t, 47.9, 59.6, .3, .4), C.g, 44, 600);
  numero(ctx, 8, life(t, 49.1, 59.6, .3, .4), C.g, 44, 600);
  numero(ctx, 10, life(t, 35.0, 39.4, .3, .4), C.ink, 44, 600);
  numero(ctx, 3, life(t, 39.4, 48.0, .3, .4), C.ink, 44, 600);
  numero(ctx, 4, P(t, 63.6, 64.0), C.x, 44, 600);
  numero(ctx, 1, P(t, 63.6, 64.0), C.y, 44, 600);
  ctx.restore();
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
// la graffa del sistema, disegnata
function graffa(ctx, x, y0, y1, k) {
  if (k <= 0) return;
  const m = (y0 + y1) / 2, w = 20;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0); ctx.quadraticCurveTo(x, y0, x, y0 + 26); ctx.lineTo(x, m - 22);
  ctx.quadraticCurveTo(x, m, x - w, m); ctx.quadraticCurveTo(x, m, x, m + 22); ctx.lineTo(x, y1 - 26);
  ctx.quadraticCurveTo(x, y1, x + w, y1); ctx.stroke(); ctx.restore();
}
const XR0 = 200, YA = 205, YB = 315, XN = 1550;
function scenePannello(ctx, t) {
  const pa = life(t, 7.5, FINE + .2, .6, .8);
  if (pa <= 0) return;
  card(ctx, ...TOP, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  graffa(ctx, 160, 150, 370, P(t, 7.9, 8.4));
  // il sistema di partenza, e accanto le soluzioni
  const a1 = 1 - P(t, 64.6, 65.0);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    evidenzia(ctx, XR0 + richW(ctx, '{mink:−}{mx:x}{mink: + 5 }', 56) - 10, YB - 42, richW(ctx, '{mink:≥}', 56) + 20, 84, C.v, life(t, 12.6, 16.1, .3, .3));
    drawRich(ctx, '{mink:2}{mx:x}{mink: − 3 > −7}', XR0, YA, { size: 56, align: 'left', local: t - 7.9 });
    drawRich(ctx, '{mink:−}{mx:x}{mink: + 5 ≥ −3}', XR0, YB, { size: 56, align: 'left', local: t - 8.2 });
    txt(ctx, '→', 615, YA, { size: 48, color: C.dim, alpha: P(t, 16.3, 16.7) });
    drawRich(ctx, '{mink:2}{mx:x}{mink: > −4}', 665, YA, { size: 56, align: 'left', local: t - 16.4 });
    txt(ctx, '→', 950, YA, { size: 48, color: C.dim, alpha: P(t, 17.3, 17.7) });
    drawRich(ctx, '{mx:x > −2}', 1000, YA, { size: 56, align: 'left', local: t - 17.4 });
    txt(ctx, '→', 615, YB, { size: 48, color: C.dim, alpha: P(t, 19.8, 20.2) });
    drawRich(ctx, '{mink:−}{mx:x}{mink: ≥ −8}', 665, YB, { size: 56, align: 'left', local: t - 19.9 });
    txt(ctx, '→', 950, YB, { size: 48, color: C.dim, alpha: P(t, 23.2, 23.6) });
    drawRich(ctx, '{my:x ≤ 8}', 1000, YB, { size: 56, align: 'left', local: t - 23.3 });
    // dividendo per −1 il segno si gira: si accende
    evidenzia(ctx, 980, YB - 42, 200, 84, C.r, life(t, 23.3, 27.6, .3, .3));
    ctx.restore();
  }
  // il sistema senza parte comune
  drawRich(ctx, '{mx:x > 4}', XR0, YA, { size: 56, align: 'left', local: t - 64.9 });
  drawRich(ctx, '{my:x < 1}', XR0, YB, { size: 56, align: 'left', local: t - 65.2 });
  // a destra: la soluzione
  const ks = life(t, 60.1, 65.0, .4, .4) + P(t, 75.0, 75.4);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 140); ctx.lineTo(1250, 380); ctx.stroke(); ctx.restore(); }
  const kr = 1 - P(t, 64.6, 65.0);
  drawRich(ctx, '{mink:−2 < }{mx:x}{mink: ≤ 8}', XN, 200, { size: 60, local: t - 60.3, alpha: kr });
  drawRich(ctx, '{mink:(−2, 8]}', XN, 315, { size: 72, local: t - 61.6, alpha: kr });
  conVuoto(ctx, '{mink:S = }', XN, 235, 96, C.r, P(t, 75.6, 76.1));
  txt(ctx, 'insieme vuoto', XN, 335, { size: 34, color: C.dim, alpha: P(t, 76.0, 76.5) });
  ctx.restore();
}

// 5 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La soluzione di un sistema è\nl\'{v:intersezione}: la parte comune.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'la graffa si legge «e»'], [960, 'i numeri buoni per {g:tutte}'], [1450, 'niente in comune: {mink:S = }']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 230, 450, 460, 100);
    if (i === 2) conVuoto(ctx, s, x, 502, 32, C.ink); else drawRich(ctx, s, x, 502, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il sistema: la parte comune', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 28.0, 'il sistema'], [28.0, 40.25, 'una sotto l\'altra'], [40.25, 64.4, 'la parte comune'], [64.4, FINE, 'niente in comune']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRetta(ctx, t - D); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
