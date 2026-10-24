'use strict';
/* Quanto sono sparsi i valori — X = numero di teste in tre lanci (1/8, 3/8, 3/8, 1/8), E(X) = 1,5: scarti
   −1,5, −0,5, 0,5, 1,5, quadrati 2,25 e 0,25, pesati con le probabilità: σ² = 6/8 = 0,75, σ = √0,75 ≈ 0,87.
   Poi Y con la stessa media ma le probabilità sui lati (3/8, 1/8, 1/8, 3/8): σ² = 14/8 = 1,75, σ ≈ 1,32.
   Argomento: variabili-aleatorie. */
CVIDEO.registra('variabili-aleatorie/varianza', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, card, arrowHead } = M;

const FINE = 51.0, DUR = 63.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [22.8, 'felice'],
  [27.0, 'neutro'], [32.2, 'felice'], [36.6, 'neutro'], [38.6, 'sorpreso'], [41.4, 'neutro'], [43.6, 'felice'],
  [46.2, 'neutro'],
  [FINE + 1.0, 'felice'], [57.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Stessa media per due variabili:\nsono sparse allo stesso modo?'],
  // 1 · scarti, varianza, deviazione standard
  [8.0, 12.4, '{mink:X} = teste in tre lanci,\ncon media {mink:E(X) = 1,5}.'],
  [12.6, 17.2, 'Ogni valore ha il suo {v:scarto}\ndalla media: {mink:xᵢ − E(X)}.'],
  [17.4, 22.0, 'Elevo gli scarti al quadrato\ne li peso con le probabilità.'],
  [22.2, 26.8, 'La somma è la {v:varianza}:\n{mink:σ² = 0,75}.'],
  [27.0, 31.6, 'La radice riporta alle teste:\nè la {v:deviazione standard} {mink:σ}.'],
  [31.8, 36.2, '{mink:σ ≈ 0,87}: la distanza tipica\ndi un valore dalla media.'],
  // 2 · stessa media, più sparsa
  [36.6, 41.2, 'Un’altra variabile, {mink:Y}: stessa media,\nma più probabilità ai lati.'],
  [41.4, 46.0, 'Gli scarti grandi pesano di più:\n{mink:σ² = 1,75}.'],
  [46.2, 50.6, '{mink:σ ≈ 1,32}: la distanza tipica\ndalla media è più grande.'],
  // chiusura
  [51.8, 60.0, 'Stessa media, valori più sparsi:\n{mink:σ²} e {mink:σ} diventano più grandi.'],
];

// ---- le barre sull'asta ----
const CARD = [110, 110, 930, 690], PAN = [1075, 110, 735, 690];
const XV = v => 280 + v * 200, AY = 640, PT = 56, BU = 66, BW = 174;
const CX = [1, 3, 3, 1], CY = [3, 1, 1, 3];              // ottavi: X e poi Y
const FX = ['1/8', '3/8', '3/8', '1/8'], FY = ['3/8', '1/8', '1/8', '3/8'];
const SCARTI = ['−1,5', '−0,5', '0,5', '1,5'], QUADRATI = ['2,25', '0,25', '0,25', '2,25'];
const verso = t => P(t, 37.0, 38.4);                     // da X a Y
const sigma = t => kf(t, [[46.4, Math.sqrt(.75)], [47.6, Math.sqrt(1.75)]]);

function rett(ctx, x, y, w, h, r, riempi, bordo, lw) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (riempi) { ctx.fillStyle = riempi; ctx.fill(); }
  if (bordo) { ctx.strokeStyle = bordo; ctx.lineWidth = lw || 3; ctx.stroke(); }
}
function freccia(ctx, a, b, y, col, k) {
  if (k <= 0) return;
  const e = lerp(a, b, k);
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(e - Math.sign(b - a) * 8, y); ctx.stroke(); ctx.restore();
  arrowHead(ctx, [e, y], b < a ? Math.PI : 0, col, .9);
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quanto sono sparsi i valori', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · l'asta in equilibrio su 1,5, le barre, gli scarti, σ (7.5–FINE)
function sceneAsta(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const kp = P(t, 7.7, 8.4);
  ctx.save(); ctx.globalAlpha *= kp;
  // il terreno, l'appoggio in 1,5, l'asta coi valori
  ctx.strokeStyle = css(C.ink, .5); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(150, AY + PT + 64); ctx.lineTo(1000, AY + PT + 64); ctx.stroke();
  const px = XV(1.5), py = AY + PT;
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 40, py + 64); ctx.lineTo(px - 40, py + 64); ctx.closePath();
  ctx.fillStyle = css(C.v, .22); ctx.fill(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.stroke();
  rett(ctx, XV(-.55), AY, XV(3.55) - XV(-.55), PT, 10, css(C.ink, .07), css(C.ink, .6), 3);
  for (let v = 0; v <= 3; v++) drawRich(ctx, `{mink:${v}}`, XV(v), AY + PT / 2, { size: 44 });
  ctx.restore();
  // le barre: prima X, poi Y
  const u = verso(t), kb = P(t, 8.2, 9.0);
  for (let v = 0; v < 4; v++) {
    const n = lerp(CX[v], CY[v], u);
    if (kb > 0) { ctx.save(); ctx.globalAlpha *= kb; rett(ctx, XV(v) - BW / 2, AY - n * BU, BW, n * BU, 8, css(C.y, .34), css(C.y, .9), 3); ctx.restore(); }
    drawRich(ctx, `{mink:${FX[v]}}`, XV(v), AY - CX[v] * BU - 40, { size: 44, alpha: P(t, 8.6 + v * .15, 9.0 + v * .15) * (1 - P(t, 36.8, 37.1)) });
    drawRich(ctx, `{mink:${FY[v]}}`, XV(v), AY - CY[v] * BU - 40, { size: 44, alpha: P(t, 38.3 + v * .15, 38.7 + v * .15) });
  }
  // la media: la verticale sull'appoggio
  const km = P(t, 9.2, 9.8);
  if (km > 0) {
    ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = css(C.v, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.moveTo(XV(1.5), AY - 4); ctx.lineTo(XV(1.5), 222); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:E(X) = }{mv:1,5}', XV(1.5), 190, { size: 44, alpha: km * (1 - P(t, 36.8, 37.2)) });
    drawRich(ctx, '{mink:E(Y) = }{mv:1,5}', XV(1.5), 190, { size: 44, alpha: P(t, 37.4, 37.8) });
  }
  // gli scarti: le frecce partono dalla media, il numero sta sopra la punta
  const ks = 1 - P(t, 31.4, 31.9);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks;
    [0, 3, 1, 2].forEach((v, j) => {
      const y = v === 0 || v === 3 ? 270 : 350, k = P(t, 12.8 + j * .25, 13.5 + j * .25, E.out);
      freccia(ctx, XV(1.5), XV(v), y, C.v, k);
      drawRich(ctx, `{mv:${SCARTI[v]}}`, XV(v), y - 32, { size: 40, alpha: P(k, .6, 1) });
    });
    ctx.restore();
  }
  // σ: la distanza tipica, per parte dalla media
  const kd = P(t, 32.0, 32.8, E.out);
  if (kd > 0) {
    const s = sigma(t), y = 300;
    freccia(ctx, XV(1.5), XV(1.5 - s), y, C.g, kd);
    freccia(ctx, XV(1.5), XV(1.5 + s), y, C.g, kd);
    drawRich(ctx, '{mg:σ}', XV(1.5 - s / 2), y - 32, { size: 44, alpha: P(kd, .6, 1) });
    drawRich(ctx, '{mg:σ}', XV(1.5 + s / 2), y - 32, { size: 44, alpha: P(kd, .6, 1) });
  }
  ctx.restore();
}

// il riquadro dei conti: cresce col racconto (8.2–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1112, VX = i => 1398 + i * 111, XA = 1250;
function sceneConti(ctx, t) {
  const al = life(t, 8.2, FINE + .2, .6, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const kX = 1 - P(t, 36.8, 37.2), kY = P(t, 37.4, 37.8);
  conFont(TITOLI, () => {
    drawRich(ctx, 'la distribuzione di {mink:X}', PX, 168, { size: 38, weight: 600, alpha: kX });
    drawRich(ctx, 'la distribuzione di {mink:Y}', PX, 168, { size: 38, weight: 600, alpha: kY });
  });
  const riga = (nome, valori, y, a, col, extra) => {
    const e = extra != null ? extra : 1;
    drawRich(ctx, nome, LX, y, { size: 30, align: 'left', alpha: P(t, a - .2, a + .2) * e });
    valori.forEach((s, i) => drawRich(ctx, `{m${col}:${s}}`, VX(i), y, { size: 44, alpha: P(t, a + i * .15, a + i * .15 + .4) * e }));
  };
  riga('{dim:valori} {mink:xᵢ}', ['0', '1', '2', '3'], 238, 8.6, 'ink');
  riga('{dim:probabilità} {mink:pᵢ}', FX, 306, 9.0, 'ink', kX);
  riga('{dim:probabilità} {mink:pᵢ}', FY, 306, 38.3, 'ink');
  riga('{dim:scarti}', SCARTI, 374, 13.0, 'v');
  riga('{dim:quadrati}', QUADRATI, 442, 17.6, 'y');
  const kl = P(t, 17.8, 18.1);
  if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 484); ctx.lineTo(PAN[0] + PAN[2] - 40, 484); ctx.stroke(); ctx.restore(); }
  // i quadrati pesati; «σ² =» arriva quando Ada dice «varianza»
  const blocco = (a, b, c, s, t0, t1, t2, al2) => {
    if (al2 <= 0) return;
    ctx.save(); ctx.globalAlpha *= al2;
    drawRich(ctx, `{mink:${a}}`, XA, 540, { size: 42, align: 'left', local: t - t0 });
    drawRich(ctx, `{mink:${b}}`, XA, 605, { size: 42, align: 'left', local: t - t0 - .6 });
    drawRich(ctx, '{mink:σ² =}', XA - 14, 540, { size: 42, align: 'right', local: t - t1 });
    drawRich(ctx, c, XA, 670, { size: 44, align: 'left', local: t - t1 - .5 });
    drawRich(ctx, s, PX, 748, { size: 44, local: t - t2 });
    ctx.restore();
  };
  blocco('2,25 · 1/8 + 0,25 · 3/8', '+ 0,25 · 3/8 + 2,25 · 1/8', '{mink:= 6/8 = }{mg:0,75}', '{mink:σ = √0,75 ≈ }{mg:0,87}', 18.0, 22.4, 27.2, kX);
  blocco('2,25 · 3/8 + 0,25 · 1/8', '+ 0,25 · 1/8 + 2,25 · 3/8', '{mink:= 14/8 = }{mg:1,75}', '{mink:σ = √1,75 ≈ }{mg:1,32}', 41.6, 42.4, 46.4, t > 41.5 ? 1 : 0);
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Varianza e deviazione standard dicono\nquanto i valori stanno {g:lontani} dalla media.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[390, '{dim:varianza} {mink:σ²}'], [960, '{dim:deviazione standard} {mink:σ}'], [1530, '{dim:stessa media}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 270, 445, 540, 215);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, 'scarti al quadrato,\npesati con le probabilità', x, 574, { size: 34, lh: 1.3 });
    if (i === 1) drawRich(ctx, 'la radice della varianza:\nla distanza tipica', x, 574, { size: 34, lh: 1.3 });
    if (i === 2) { drawRich(ctx, '{mink:X:  σ ≈ }{mg:0,87}', x, 545, { size: 42 }); drawRich(ctx, '{mink:Y:  σ ≈ }{mg:1,32}', x, 608, { size: 42 }); }
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.4],                                            // l'asta sull'appoggio
    ['tono', 8.2, 9.0, [.2, .7]], ['pop', 8.7, .4],                                      // le barre di X
    ['traccia', 9.2, 9.8], ['pop', 9.6, .6],                                            // E(X) = 1,5
    ['traccia', 12.8, 13.5], ['traccia', 13.05, 13.75], ['traccia', 13.3, 14.0], ['traccia', 13.55, 14.25],   // gli scarti
    ['pop', 17.7, .7], ['pop', 18.1, .4], ['pop', 18.7, .5],                            // i quadrati, pesati
    ['pop', 22.5, .5], ['ding', 23.0],                                                  // σ² = 0,75
    ['pop', 27.3, .55], ['ding', 27.9],                                                 // σ ≈ 0,87
    ['traccia', 32.0, 32.8],                                                            // σ dalla media, per parte
    ['soffio', 36.8], ['tono', 37.0, 38.4, [.6, .3, .3, .6]], ['pop', 38.4, .5],          // le barre di Y
    ['pop', 41.7, .4], ['pop', 42.3, .5], ['ding', 43.0],                               // σ² = 1,75
    ['tono', 46.4, 47.6, [.4, .7]], ['ding', 46.6],                                     // σ si allarga: 1,32
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quanto sono sparsi i valori', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 36.4, 'scarti, varianza, deviazione standard'], [36.4, FINE, 'stessa media, più sparsa']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneAsta(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
