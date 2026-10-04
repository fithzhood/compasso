'use strict';
/* La distanza fra due punti — il triangolo rettangolo nascosto fra A e B: Pitagora sulle coordinate.
   Argomento: piano-cartesiano-retta. */
CVIDEO.registra('piano-cartesiano-retta/distanza', M => {
  const { W, C, E, P, life, lerp, css, mix, TITOLI, conFont, drawRich, dot, glowStroke, arrowHead, makePlane, card } = M;

const FINE = 55.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [12.1, 'neutro'], [24.2, 'sorpreso'], [26.2, 'felice'], [28.4, 'neutro'],
  [34.2, 'festa'], [36.3, 'neutro'], [38.4, 'sorpreso'], [40.4, 'neutro'],
  [44.6, 'felice'], [46.8, 'neutro'], [49.4, 'pensa'], [52.6, 'felice'],
  [FINE + 1.0, 'felice'], [60.0, 'occhiolino'], [62.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Quanto distano due punti\ndel piano?'],
  // 1 · il triangolo nascosto
  [7.9, 12.0, 'Ecco {mink:A(2; −4)} e {mink:B(6; −1)}.'],
  [12.1, 18.4, 'Da {mink:A} vado 4 a destra:\n{mx:Δx} = 6 − 2 = 4.'],
  [18.5, 23.8, '…e 3 in su:\n{my:Δy} = −1 − (−4) = 3.'],
  [23.9, 28.3, 'Ecco un {v:triangolo rettangolo}:\n{mink:AB} è l\'ipotenusa.'],
  // 2 · Pitagora
  [28.4, 33.6, 'Per Pitagora:\n{mink:AB² = 4² + 3² = 25}.'],
  [33.7, 38.0, 'Quindi {mink:AB = √25 = }{g:5}.'],
  [38.1, 44.3, 'Attento: 4 + 3 = 7 è la strada\nsulla griglia, {r:non} la distanza.'],
  [44.4, 49.0, 'In generale:\n{mink:AB = √(}{mx:Δx}{mink:² + }{my:Δy}{mink:²)}.'],
  [49.1, 55.0, 'Partendo da {mink:B}: −4 e −3.\nAl quadrato, ancora 16 e 9.'],
  // chiusura
  [56.4, 62.6, 'Due punti nascondono un triangolo:\nla distanza è la sua {g:ipotenusa}.'],
];

// il piano: stessa unità sui due assi
const PL = makePlane({ ox: 384, oy: 370, u: 74, x0: -0.8, x1: 8.4, y0: -4.6, y1: 1.4 });
const CARD = [250, 110, 830, 690];
const A = [2, -4], B = [6, -1], K = [6, -4];   // K: l'angolo retto
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1180, y); ctx.lineTo(1770, y); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La distanza fra due punti', W / 2, 180, { size: 110, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano con il triangolo (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  const a = PL.toS(...A), b = PL.toS(...B), k = PL.toS(...K);
  // i cateti: rossi quando sono «la strada lungo la griglia»
  const rosso = life(t, 38.4, 44.2, .4, .5);
  segmento(ctx, a, k, mix(C.x, C.r, rosso), P(t, 12.5, 13.5), 6 + 3 * rosso);
  segmento(ctx, k, b, mix(C.y, C.r, rosso), P(t, 18.8, 19.8), 6 + 3 * rosso);
  // l'angolo retto
  const qa = P(t, 25.0, 25.4);
  if (qa > 0) {
    const d = .3, p = [PL.toS(K[0] - d, K[1]), PL.toS(K[0] - d, K[1] + d), PL.toS(K[0], K[1] + d)];
    ctx.save(); ctx.globalAlpha *= qa; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(...p[0]); ctx.lineTo(...p[1]); ctx.lineTo(...p[2]); ctx.stroke(); ctx.restore();
  }
  // l'ipotenusa: diventa verde quando se ne conosce la lunghezza
  glowStroke(ctx, [a, b], P(t, 24.0, 25.0, E.out), mix(C.v, C.g, P(t, 34.2, 34.8)), 6);
  dot(ctx, a, C.ink, P(t, 8.4, 8.8, E.back), 11);
  dot(ctx, b, C.ink, P(t, 9.2, 9.6, E.back), 11);
  drawRich(ctx, '{mink:A(2; −4)}', a[0], a[1] + 44, { size: 40, local: t - 8.6 });
  drawRich(ctx, '{mink:B(6; −1)}', b[0] + 24, b[1], { size: 40, align: 'left', local: t - 9.4 });
  // da B ad A (ultimo pezzo): prima escono i vecchi numeri, poi entrano i nuovi con le frecce
  const via = 1 - P(t, 49.3, 49.6), torna = P(t, 49.7, 50.1);
  drawRich(ctx, '{mx:Δx}{mink: = 4}', PL.toS(4.7, 0)[0], a[1] + 44, { size: 40, alpha: P(t, 13.3, 13.7) * via });
  drawRich(ctx, '{my:Δy}{mink: = 3}', b[0] + 22, PL.toS(0, -2.6)[1], { size: 40, align: 'left', alpha: P(t, 19.6, 20.0) * via });
  if (torna > 0) {
    ctx.save(); ctx.globalAlpha *= torna;
    // B → K in giù (−3), K → A a sinistra (−4)
    arrowHead(ctx, [k[0], k[1] - 14], Math.PI / 2, C.y, 1.1);
    arrowHead(ctx, [a[0] + 18, a[1]], Math.PI, C.x, 1.1);
    drawRich(ctx, '{mx:Δx}{mink: = −4}', PL.toS(4.7, 0)[0], a[1] + 44, { size: 40 });
    drawRich(ctx, '{my:Δy}{mink: = −3}', b[0] + 22, PL.toS(0, -2.6)[1], { size: 40, align: 'left' });
    ctx.restore();
  }
  // la strada lungo la griglia, accanto all'angolo retto
  drawRich(ctx, '{r:4 + 3 = 7}', k[0] + 22, k[1] + 6, { size: 44, align: 'left', alpha: rosso });
  ctx.restore();
}

// il riquadro dei conti
function scenePannello(ctx, t) {
  if (t < 13.0 || t > FINE + .3) return;
  const al = life(t, 13.2, FINE + .2, .5, .8);
  card(ctx, 1130, 150, 690, 620, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'la distanza', 1475, 212, { size: 40, weight: 600 }));
  // da A a B, poi (ultimo pezzo) da B ad A
  const da = 1 - P(t, 49.3, 49.6), giro = P(t, 49.7, 50.1);   // prima esce una riga, poi entra l'altra
  drawRich(ctx, '{mx:Δx}{mink: = 6 − 2 = }{mx:4}', 1190, 290, { size: 44, align: 'left', local: t - 13.6, alpha: da });
  drawRich(ctx, '{my:Δy}{mink: = −1 − (−4) = }{my:3}', 1190, 360, { size: 44, align: 'left', local: t - 19.9, alpha: da });
  drawRich(ctx, '{mx:Δx}{mink: = 2 − 6 = }{mx:−4}', 1190, 290, { size: 44, align: 'left', alpha: giro });
  drawRich(ctx, '{my:Δy}{mink: = −4 − (−1) = }{my:−3}', 1190, 360, { size: 44, align: 'left', alpha: giro });
  separa(ctx, 410, P(t, 28.6, 29.0));
  drawRich(ctx, '{mink:AB² = }{mx:4}{mink:² + }{my:3}{mink:² = 25}', 1475, 480, { size: 48, local: t - 28.7, alpha: da });
  drawRich(ctx, '{mink:AB² = (}{mx:−4}{mink:)² + (}{my:−3}{mink:)² = 16 + 9}', 1475, 480, { size: 40, alpha: giro });
  drawRich(ctx, '{mink:AB = √25 = }{g:5}', 1475, 570, { size: 48, local: t - 34.0 });
  separa(ctx, 630, P(t, 44.5, 44.9));
  drawRich(ctx, '{mink:AB = √(}{mx:Δx}{mink:² + }{my:Δy}{mink:²)}', 1475, 700, { size: 48, local: t - 44.6 });
  ctx.restore();
}

// 3 · in una frase (FINE–65.6)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 63.4, 64.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La distanza fra due punti è l\'{g:ipotenusa}\ndel triangolo che hanno in mezzo.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'i cateti: {mx:Δx} e {my:Δy}'], [960, '{mink:AB = √(}{mx:Δx}{mink:² + }{my:Δy}{mink:²)}'], [1450, 'non {r:4 + 3}, ma {mg:√(4² + 3²)}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 230, 450, 460, 100);
    drawRich(ctx, s, x, 502, { size: 34, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La distanza fra due punti', durata: 65.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 28.4, 'il triangolo nascosto'], [28.4, FINE, 'Pitagora']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
