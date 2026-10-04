'use strict';
/* Quanto sono sparsi i dati — due classi con la stessa media 6 (5, 6, 6, 6, 7 e 1, 2, 6, 10, 11); poi su 3, 5, 6, 7, 9:
   scarti −3, −1, 0, 1, 3, quadrati 9, 1, 0, 1, 9, varianza σ² = 4, deviazione standard σ = 2; infine σ delle due classi.
   Argomento: statistica. */
CVIDEO.registra('statistica/varianza', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, card, arrowHead } = M;

const FINE = 79.4, DUR = 91.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [14.0, 'sorpreso'], [16.8, 'neutro'], [21.8, 'pensa'], [26.2, 'neutro'], [36.0, 'sorpreso'], [40.2, 'neutro'],
  [46.0, 'felice'], [50.0, 'sorpreso'], [54.6, 'neutro'], [57.0, 'felice'], [59.6, 'neutro'], [65.5, 'felice'],
  [69.6, 'neutro'], [75.5, 'festa'], [77.6, 'neutro'],
  [FINE + 1.0, 'felice'], [86.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Due classi, stessa media:\nsono andate allo stesso modo?'],
  // 1 · due classi
  [8.0, 12.2, 'Prima classe: {mink:5, 6, 6, 6, 7}.\nVoti tutti vicini.'],
  [12.4, 16.6, 'Seconda classe: {mink:1, 2, 6, 10, 11}.\nVoti molto {r:sparpagliati}.'],
  [16.8, 21.6, 'Tutte e due hanno media {mink:x̄ = 6}:\nla media non vede la differenza.'],
  [21.8, 25.6, 'Serve un altro numero: quanto\nsono {v:sparsi} i dati?'],
  // 2 · scarti, quadrati, varianza
  [26.2, 30.4, 'Prendo i dati {mink:3, 5, 6, 7, 9}:\nla media è ancora {mink:x̄ = 6}.'],
  [30.6, 35.4, 'Ogni dato {mink:xᵢ} meno la media\nè il suo {v:scarto}: {mink:xᵢ − x̄}.'],
  [35.6, 40.0, 'Ma gli scarti sommano sempre {r:0}:\n{mink:−3 − 1 + 0 + 1 + 3 = 0}.'],
  [40.2, 44.8, 'Per togliere il segno, elevo\nogni scarto {v:al quadrato}.'],
  [45.0, 49.8, 'Ogni quadrato ha per lato lo scarto:\nle aree sono {mink:9, 1, 0, 1, 9}.'],
  [50.0, 54.4, 'Gli scarti grandi pesano\n{g:molto di più}: 3 diventa 9.'],
  [54.6, 59.4, 'La {v:varianza} {mink:σ²} è la media\ndei quadrati: qui vale {g:4}.'],
  [59.6, 64.4, 'La radice riporta all’unità dei dati:\nè la {v:deviazione standard} {mink:σ}.'],
  [64.6, 69.2, 'Qui {mink:σ = 2}: è la distanza tipica\ndi un dato dalla media.'],
  // 3 · di nuovo le due classi
  [69.6, 74.6, 'Le due classi: prima {mink:σ ≈ 0,63},\nseconda {mink:σ ≈ 4,05}.'],
  [74.8, 78.8, 'Stessa media, ma {mink:σ}\nvede la differenza.'],
  // chiusura
  [80.2, 88.6, 'Scarti, quadrati, media, radice:\necco quanto sono sparsi i dati.'],
];

// ---- le due classi ----
const CARD1 = [110, 110, 1700, 690];
const XA = v => 360 + v * 100, YA = 330, YB = 610;
const CL = [
  { voti: [5, 6, 6, 6, 7], liv: [0, 0, 1, 2, 0], y: YA, nome: 'prima classe', t: 8.4, sigma: Math.sqrt(.4), s: '0,63' },
  { voti: [1, 2, 6, 10, 11], liv: [0, 0, 0, 0, 0], y: YB, nome: 'seconda classe', t: 12.6, sigma: Math.sqrt(16.4), s: '4,05' },
];
// ---- i dati 3, 5, 6, 7, 9 ----
const CARD2 = [110, 110, 1050, 690], PAN = [1190, 110, 630, 690];
const XD = v => 180 + v * 85, AY = 640, U = 85;
const DATI = [3, 5, 6, 7, 9];
const fmtS = s => (s < 0 ? '−' : '') + Math.abs(s);

function freccia(ctx, a, b, y, col, w = 4) {
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(b - Math.sign(b - a) * 8, y); ctx.stroke(); ctx.restore();
  arrowHead(ctx, [b, y], b < a ? Math.PI : 0, col, .9);
}
function tratteggio(ctx, x, y0, y1, col, al = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); ctx.restore();
}
// una retta dei numeri con le tacche e i numeri sotto
function retta(ctx, X, y, v0, v1, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(X(v0 - .4), y); ctx.lineTo(X(v1 + .5), y); ctx.stroke();
  arrowHead(ctx, [X(v1 + .5) + 6, y], 0, C.ink);
  ctx.lineWidth = 2;
  for (let v = v0; v <= v1; v++) { ctx.beginPath(); ctx.moveTo(X(v), y); ctx.lineTo(X(v), y + 10); ctx.stroke(); txt(ctx, String(v), X(v), y + 36, { size: 30, color: C.dim }); }
  ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quanto sono sparsi i dati', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 e 3 · le due classi (7.5–25.8, 69.4–FINE)
function sceneClassi(ctx, t) {
  const al = Math.max(life(t, 7.5, 25.8, .6, .5), life(t, 69.4, FINE + .2, .6, .6));
  if (al <= 0) return;
  const dopo = t > 50;   // la seconda volta tutto è già al suo posto
  card(ctx, ...CARD1, al);
  ctx.save(); ctx.globalAlpha *= al;
  // la media (sotto i punti): lo stesso 6 per tutte e due; il tratteggio salta i numeri dell'asse
  const km = dopo ? 1 : P(t, 17.0, 17.5);
  tratteggio(ctx, XA(6), 160, YA - 4, C.v, km);
  tratteggio(ctx, XA(6), YA + 62, YB - 4, C.v, km);
  drawRich(ctx, '{mv:x̄ = 6}', XA(6) + 20, 172, { size: 40, align: 'left', alpha: km });
  CL.forEach((c, j) => {
    drawRich(ctx, `{dim:${c.nome}}`, 150, c.y - 130, { size: 34, align: 'left', local: dopo ? 99 : t - c.t + .3 });
    retta(ctx, XA, c.y, 0, 12, dopo ? 1 : P(t, 7.8 + j * 4.2, 8.6 + j * 4.2));
    c.voti.forEach((v, i) => dot(ctx, [XA(v), c.y - 22 - c.liv[i] * 42], j ? C.y : C.x, dopo ? 1 : P(t, c.t + i * .25, c.t + i * .25 + .5, E.back), 20));
  });
  // la deviazione standard di ognuna: una freccia lunga σ per parte
  CL.forEach((c, j) => {
    const k = P(t, 70.0 + j * 1.2, 70.8 + j * 1.2, E.out); if (k <= 0) return;
    const y = c.y + 84;
    freccia(ctx, XA(6), lerp(XA(6), XA(6 + c.sigma), k), y, C.v);
    freccia(ctx, XA(6), lerp(XA(6), XA(6 - c.sigma), k), y, C.v);
    drawRich(ctx, `{mink:σ ≈ }{mv:${c.s}}`, XA(6 + c.sigma) + 24, y, { size: 42, align: 'left', alpha: P(k, .6, 1) });
  });
  ctx.restore();
}

// 2 · scarti, quadrati, varianza (25.8–69.4)
const PX = PAN[0] + PAN[2] / 2, VX = i => 1458 + i * 78, LX = 1232;
function sceneScarti(ctx, t) {
  const al = life(t, 25.9, 69.4, .6, .5);
  if (al <= 0) return;
  card(ctx, ...CARD2, al); card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  retta(ctx, XD, AY, 0, 10, 1);
  // la media
  const km = P(t, 26.8, 27.3);
  tratteggio(ctx, XD(6), AY - 4, 300, C.v, km);
  drawRich(ctx, '{mv:x̄}', XD(6), 274, { size: 44, alpha: km });
  // i quadrati costruiti sugli scarti: prima i grandi, sopra i piccoli
  const ordine = [0, 4, 1, 3];
  const puls = life(t, 50.2, 54.4, .4, .4) * (.5 + .5 * Math.sin((t - 50.2) * 5));
  for (const i of ordine) {
    const v = DATI[i], s = v - 6, k = P(t, 40.6 + ordine.indexOf(i) * .35, 41.6 + ordine.indexOf(i) * .35);
    if (k <= 0) continue;
    const col = Math.abs(s) > 1 ? C.y : C.x, lato = Math.abs(s) * U, x0 = s < 0 ? XD(v) : XD(6) + 7, h = k * lato;   // 7 px di stacco dalla linea della media: i due quadrati da 9 restano due
    ctx.save(); ctx.fillStyle = css(col, .16); ctx.strokeStyle = css(col, .9); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(x0, AY - h, lato - 7, h); ctx.fill(); ctx.stroke();
    if (Math.abs(s) > 1 && puls > 0) { ctx.strokeStyle = css(col, .5 * puls); ctx.lineWidth = 10; ctx.stroke(); }
    ctx.restore();
  }
  for (const i of ordine) {
    const v = DATI[i], s = v - 6, lato = Math.abs(s) * U, xc = (XD(6) + XD(v)) / 2;
    txt(ctx, String(s * s), xc, AY - lato / 2, { size: 44, weight: 600, alpha: P(t, 45.4 + ordine.indexOf(i) * .3, 45.8 + ordine.indexOf(i) * .3) });
  }
  // la deviazione standard: la distanza tipica dalla media
  const ks = P(t, 64.8, 65.6, E.out);
  if (ks > 0) {
    freccia(ctx, XD(6), lerp(XD(6), XD(8), ks), 342, C.v);
    freccia(ctx, XD(6), lerp(XD(6), XD(4), ks), 342, C.v);
    drawRich(ctx, '{mv:σ}', XD(7), 310, { size: 44, alpha: P(ks, .6, 1) });
    drawRich(ctx, '{mv:σ}', XD(5), 310, { size: 44, alpha: P(ks, .6, 1) });
  }
  // i dati sull'asse, e i loro scarti sotto
  DATI.forEach((v, i) => dot(ctx, [XD(v), AY], C.x, P(t, 26.4 + i * .2, 26.9 + i * .2, E.back), 14));
  drawRich(ctx, '{dim:scarti}', 135, AY + 90, { size: 30, align: 'left', alpha: P(t, 30.8, 31.2) });
  DATI.forEach((v, i) => drawRich(ctx, `{mv:${fmtS(v - 6)}}`, XD(v), AY + 90, { size: 40, alpha: P(t, 31.0 + i * .25, 31.4 + i * .25) }));
  // il riquadro dei conti
  conFont(TITOLI, () => drawRich(ctx, 'dati, scarti, quadrati', PX, 168, { size: 40, weight: 600 }));
  const riga = (lab, vals, y, col, a, alab) => {
    drawRich(ctx, lab, LX, y, { size: 40, align: 'left', alpha: alab });
    vals.forEach((s, i) => drawRich(ctx, `{m${col[i]}:${s}}` + (i < 4 ? '{mink:,}' : ''), VX(i), y, { size: 44, alpha: P(t, a + i * .2, a + i * .2 + .4) }));
  };
  riga('{dim:dati}', DATI.map(String), 255, 'iiiii'.split('').map(() => 'ink'), 26.6, P(t, 26.4, 26.8));
  riga('{mink:xᵢ − x̄}', DATI.map(v => fmtS(v - 6)), 335, DATI.map(() => 'v'), 31.0, P(t, 30.8, 31.2));
  riga('{mink:(xᵢ − x̄)²}', DATI.map(v => String((v - 6) ** 2)), 415, DATI.map(v => Math.abs(v - 6) > 1 ? 'y' : v === 6 ? 'ink' : 'x'), 41.0, P(t, 40.6, 41.0));
  drawRich(ctx, '{mink:−3 − 1 + 0 + 1 + 3 = }{mr:0}', PX, 500, { size: 44, local: t - 35.8, alpha: 1 - P(t, 40.0, 40.4) });
  const kl = P(t, 54.7, 55.0);
  if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 465); ctx.lineTo(PAN[0] + PAN[2] - 40, 465); ctx.stroke(); ctx.restore(); }
  drawSeq(ctx, ['{mink:σ² =}', { num: '{mink:9 + 1 + 0 + 1 + 9}', den: '{mink:5}' }, '{mink:= }{mg:4}'], PX, 545, 42, { local: t - 54.8 });
  drawRich(ctx, '{mink:σ = √σ² = √4 = }{mg:2}', PX, 660, { size: 46, local: t - 59.8 });
  drawRich(ctx, '{dim:la distanza tipica dalla media}', PX, 740, { size: 32, local: t - 64.8 });
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La deviazione standard dice quanto\ni dati stanno {g:lontani} dalla media.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{dim:scarto}'], [960, '{dim:varianza}'], [1490, '{dim:deviazione standard}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 240, 445, 480, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mink:xᵢ − x̄}', x, 568, { size: 48 });
    if (i === 1) { drawRich(ctx, '{mink:σ² =}', x, 534, { size: 44 }); drawRich(ctx, 'media dei quadrati\ndegli scarti', x, 604, { size: 32, lh: 1.3 }); }
    if (i === 2) drawRich(ctx, '{mink:σ = √σ²}', x, 568, { size: 48 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Quanto sono sparsi i dati', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 25.8, 'due classi, stessa media'], [25.8, 54.6, 'scarti e quadrati'], [54.6, 69.4, 'varianza e deviazione standard'], [69.4, FINE, 'di nuovo le due classi']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneClassi(ctx, t); sceneScarti(ctx, t); sceneFine(ctx, t); },
  };
});
