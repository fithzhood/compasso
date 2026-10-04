'use strict';
/* √2 non è una frazione — la diagonale del quadrato di lato 1 e la caccia a una frazione che al quadrato faccia 2. Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/radice-di-due', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, txt,
    dot, hole, glowStroke, dashed, card } = M;

const FINE = 49.6, DURATA = 61.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [16.4, 'felice'], [18.6, 'neutro'],
  [21.2, 'pensa'], [25.8, 'neutro'], [30.4, 'pensa'], [34.8, 'neutro'], [39.9, 'pensa'], [44.8, 'sorpreso'],
  [46.8, 'neutro'], [FINE + 1.0, 'felice'], [55.0, 'occhiolino'], [57.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Esiste una lunghezza che nessuna\nfrazione può misurare?'],
  // 1 · la diagonale
  [7.9, 12.0, 'Un quadrato di lato 1:\nquanto è lunga la diagonale?'],
  [12.1, 16.3, 'Per Pitagora, il quadrato della\ndiagonale è {mink:1² + 1² = 2}.'],
  [16.4, 21.0, 'La diagonale è {mg:√2}: il numero\npositivo che al quadrato fa 2.'],
  // 2 · a caccia di frazioni
  [21.2, 25.7, 'Cerco una frazione che, al quadrato,\nfaccia {g:esattamente} 2.'],
  [25.8, 30.3, '{mink:3/2} al quadrato fa {mink:9/4 = 2,25}:\n{r:troppo}.'],
  [30.4, 34.7, '{mink:7/5} al quadrato fa {mink:49/25 = 1,96}:\n{r:troppo poco}.'],
  [34.8, 39.8, '{mink:17/12} e {mink:41/29} vanno più vicino,\nma non fanno esattamente 2.'],
  [39.9, 44.7, 'Si dimostra che {r:nessuna} frazione\nal quadrato fa esattamente 2.'],
  [44.8, 49.2, 'Quindi {mink:√2} non è una frazione:\nè un numero {v:irrazionale}.'],
  // chiusura
  [50.8, 58.6, 'Una lunghezza vera, che nessuna\nfrazione riesce a scrivere.'],
];
const CAPITOLI = [[7.5, 21.0, 'la diagonale'], [21.0, FINE, 'a caccia di frazioni']];
const S2 = Math.SQRT2;
// il quadrato a sinistra, il pannello a destra
const LC = [100, 110, 720, 690], RC = [900, 110, 920, 690];
const QX = 280, QY = 610, QL = 360;
// le prove: frazione, il suo quadrato, il decimale, troppo o troppo poco
const PROVE = [
  { p: 3, q: 2, d: '2,25', su: true, t: 26.0 },
  { p: 7, q: 5, d: '1,96', su: false, t: 30.6 },
  { p: 17, q: 12, d: '2,0069', puntini: true, su: true, t: 35.0 },
  { p: 41, q: 29, d: '1,9988', puntini: true, su: false, t: 35.7 },
];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{mink:√2} non è una frazione', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il quadrato, Pitagora, la caccia alla frazione (7.5–49.6)
function sceneQuadrato(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = 1 - P(t, 49.0, 49.6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LC, P(t, 7.5, 8.2));
  const q = [[QX, QY], [QX + QL, QY], [QX + QL, QY - QL], [QX, QY - QL], [QX, QY]];
  ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineJoin = 'round'; M.partial(ctx, q, P(t, 8.0, 9.2, E.lin)); ctx.restore();
  const k1 = P(t, 9.0, 9.4);
  txt(ctx, '1', QX + QL / 2, QY + 40, { size: 44, color: C.ink, alpha: k1 });
  txt(ctx, '1', QX - 34, QY - QL / 2, { size: 44, color: C.ink, alpha: k1 });
  glowStroke(ctx, [[QX, QY], [QX + QL, QY - QL]], P(t, 10.0, 10.8), C.g, 6);
  drawRich(ctx, '{mg:√2}', QX + QL * .3, QY - QL * .68, { size: 50, alpha: P(t, 16.6, 17.1) });
  drawRich(ctx, '{mink:√2} è un numero {v:irrazionale}', QX + QL / 2, 742, { size: 38, alpha: P(t, 45.0, 45.5) });
  // il pannello di destra
  card(ctx, ...RC, P(t, 12.0, 12.6));
  const cx = RC[0] + RC[2] / 2;
  const pa = life(t, 12.2, 21.3, .4, .4);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    conFont(TITOLI, () => drawRich(ctx, 'il teorema di Pitagora', cx, 180, { size: 40, weight: 600 }));
    drawRich(ctx, 'diagonale{mink:² = 1² + 1² = 2}', cx, 320, { size: 58, local: t - 12.6 });
    drawRich(ctx, 'diagonale {mink:= }{mg:√2}', cx, 460, { size: 64, local: t - 16.7 });
    drawRich(ctx, '{mink:√2 · √2 = 2}', cx, 600, { size: 58, local: t - 18.3 });
    ctx.restore();
  }
  const ta = life(t, 21.3, 49.6, .4, .4);
  if (ta > 0) {
    ctx.save(); ctx.globalAlpha *= ta;
    conFont(TITOLI, () => drawRich(ctx, 'frazioni al quadrato', cx, 180, { size: 40, weight: 600 }));
    txt(ctx, 'frazione', 1010, 250, { size: 30, color: C.dim });
    txt(ctx, 'al quadrato', 1340, 250, { size: 30, color: C.dim });
    PROVE.forEach((R, i) => {
      const k = P(t, R.t, R.t + .5, E.out); if (k <= 0) return;
      const y = 322 + i * 112;
      ctx.save(); ctx.globalAlpha *= k;
      drawSeq(ctx, [{ num: `{mink:${R.p}}`, den: `{mink:${R.q}}` }], 1010, y, 46);
      drawRich(ctx, '{mink:→}', 1120, y, { size: 46 });
      drawSeq(ctx, [{ num: `{mink:${R.p * R.p}}`, den: `{mink:${R.q * R.q}}` }], 1230, y, 46);
      drawRich(ctx, `{mink:= ${R.d}}` + (R.puntini ? '…' : ''), 1310, y, { size: 46, align: 'left' });
      drawRich(ctx, R.su ? '{mr:> 2}' : '{mr:< 2}', 1740, y, { size: 46, alpha: P(t, R.t + .6, R.t + 1.0) });
      ctx.restore();
    });
    drawRich(ctx, '{r:nessuna} frazione al quadrato fa 2', cx, 760, { size: 36, alpha: P(t, 40.1, 40.6) });
    ctx.restore();
  }
  ctx.restore();
}


// 5 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La diagonale del quadrato di lato 1\nmisura {mink:√2}, che non è una frazione.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{mink:√2 · √2 = 2}'], [960, '{r:nessuna} frazione\nal quadrato fa 2'], [1490, '{mink:√2} è un numero\n{v:irrazionale}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 240, 435, 480, 150);
    drawRich(ctx, s, x, 510, { size: 40, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: '√2 non è una frazione', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneQuadrato(ctx, t); sceneFine(ctx, t); },
  };
});
