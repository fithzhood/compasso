'use strict';
/* La crescita esponenziale — un foglio piegato a metà: lo spessore raddoppia a ogni piega, all'inizio cresce
   poco e poi sempre più in fretta. Argomento: esponenziali. */
CVIDEO.registra('esponenziali/raddoppio', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, arrowHead, card } = M;

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [96.0, 190], [97.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [96.0, 1050], [97.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [96.0, 2.2], [97.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [96.0, 2], [97.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [96.0, -1.5], [97.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.2, 'pensa'], [7.9, 'neutro'],
  [26.7, 'felice'], [28.9, 'neutro'], [42.7, 'felice'], [44.9, 'neutro'],
  [50.9, 'pensa'], [55.5, 'occhiolino'], [57.6, 'neutro'],
  [69.5, 'sorpreso'], [71.6, 'neutro'], [79.0, 'pensa'], [81.1, 'neutro'],
  [91.2, 'sorpreso'], [93.3, 'felice'], [96.0, 'neutro'], [98.5, 'felice'], [103.7, 'occhiolino'],
];
// una frase per ogni cosa che succede; le pieghe avvengono fra un fumetto e l'altro
const FUMETTI = [
  [1.6, 6.3, 'Che cosa succede se una quantità\n{g:raddoppia} a ogni passo?'],
  // 1 · il foglio piegato
  [8.0, 12.0, 'Un foglio spesso {g:0,1 mm}:\nun decimo di millimetro.'],
  [13.5, 17.4, 'Lo piego a metà: {g:2} strati,\nspessore {g:0,2 mm}.'],
  [18.9, 22.0, 'Di nuovo: {g:4} strati, {g:0,4 mm}.'],
  [23.5, 26.6, 'Ancora: {g:8} strati, {g:0,8 mm}.'],
  [26.7, 31.2, 'A ogni piega lo spessore {g:raddoppia}:\nsi moltiplica per 2.'],
  [33.8, 38.0, 'Cinque pieghe: {g:32} strati,\nma solo {g:3,2 mm}.'],
  [38.1, 42.6, 'Dopo {mx:n} pieghe lo spessore\nè {mink:0,1 · 2}{mx:ⁿ} mm.'],
  [42.7, 46.4, '{mx:n} sta all’{v:esponente}: è una\ncrescita {v:esponenziale}.'],
  [46.5, 50.8, '{mink:0,1} è lo spessore iniziale,\n{mink:2} il fattore di ogni passo.'],
  [50.9, 55.4, 'Un foglio vero, dopo 7 o 8 pieghe,\nnon si piega più.'],
  [55.5, 59.6, 'Oltre 7 o 8 pieghe: solo come\n{v:esperimento mentale}.'],
  // 2 · poco, poi sempre più in fretta
  [62.2, 66.6, 'Gli spessori in un grafico:\nfino a 5 pieghe, quasi niente.'],
  [69.5, 73.9, 'Poi sale {g:sempre più in fretta}:\n10 pieghe, {g:102,4 mm}.'],
  [74.0, 78.2, 'Ogni barra è il {g:doppio}\ndi quella che la precede.'],
  [79.0, 83.4, 'Ogni 10 pieghe si moltiplica\nper {mink:2¹⁰ = 1024}.'],
  [83.5, 87.0, 'Con 20 pieghe: circa {g:105 metri}.'],
  [87.1, 91.1, 'Con 30: circa {g:107 km},\npiù in alto degli aerei.'],
  [91.2, 95.6, 'Con 42: circa {g:440 000 km},\npiù della distanza dalla Luna!'],
  // chiusura
  [98.5, 103.5, 'Raddoppiare a ogni passo: all’inizio\npoco, poi sempre più in fretta.'],
];
const DURATA = 106.3;
const CARD_L = [150, 110, 1000, 690], CARD_R = [1210, 110, 640, 690];
const FINE = 96.0;

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La crescita esponenziale', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// le due schede, per tutto il video
function schede(ctx, t) {
  const al = 1 - P(t, FINE, FINE + .6);
  if (t < 7.5 || al <= 0) return;
  card(ctx, ...CARD_L, P(t, 7.5, 8.2) * al);
  card(ctx, ...CARD_R, P(t, 8.0, 8.7) * al);
}

// 1 · il foglio visto di lato (7.5–60.2): ogni piega è un movimento a sé, fra due fumetti
const PIEGHE = [[12.2, 13.4], [17.6, 18.8], [22.2, 23.4], [31.3, 32.3], [32.6, 33.6]];
const BASE = 740, LT = 13, W0 = 640, XC = 560;
const mm = k => (0.1 * 2 ** k).toFixed(1).replace('.', ',') + ' mm';
function strati(ctx, x, y, w, n) {   // n strati, con l'angolo in alto a sinistra in (x, y)
  const h = n * LT;
  ctx.fillStyle = css(C.x, .16); ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = css(C.x, .55); ctx.lineWidth = 1.5; ctx.beginPath();
  for (let j = 1; j < n; j++) { ctx.moveTo(x, y + j * LT); ctx.lineTo(x + w, y + j * LT); }
  ctx.stroke();
  ctx.strokeStyle = css(C.x); ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h);
}
function sceneFoglio(ctx, t) {
  if (t < 7.5 || t > 60.3) return;
  const al = 1 - P(t, 59.6, 60.2);
  ctx.save(); ctx.globalAlpha *= al;
  txt(ctx, 'il foglio visto di lato', 650, 165, { size: 30, color: C.dim, alpha: P(t, 8.0, 8.6) });
  // pieghe finite e piega in corso
  let k = 0, cur = -1;
  PIEGHE.forEach(([a, b], i) => { if (t >= b) k = i + 1; else if (t > a) cur = i; });
  ctx.save(); ctx.globalAlpha *= P(t, 8.0, 8.6);
  if (cur >= 0) {
    const [a, b] = PIEGHE[cur], n = 2 ** cur, w = W0 / n, m = a + .75 * (b - a);
    const rot = P(t, a, m), dx = P(t, m, b) * w / 4, top = BASE - n * LT;
    strati(ctx, XC - w / 2 + dx, top, w / 2, n);
    ctx.save(); ctx.translate(XC + dx, top); ctx.rotate(-Math.PI * rot);
    strati(ctx, 0, 0, w / 2, n);
    ctx.restore();
  } else {
    const n = 2 ** k, w = W0 / n;
    strati(ctx, XC - w / 2, BASE - n * LT, w, n);
  }
  ctx.restore();
  // la quota a destra della pila: sparisce mentre si piega
  let qa = P(t, 8.4, 9.0);
  for (const [a, b] of PIEGHE) qa *= 1 - life(t, a, b + .3, .2, .3);
  if (qa > 0) {
    const n = 2 ** k, w = W0 / n, xr = XC + w / 2 + 26, top = BASE - n * LT, mid = (BASE + top) / 2;
    ctx.save(); ctx.globalAlpha *= qa; ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(xr, BASE); ctx.lineTo(xr, top);
    ctx.moveTo(xr - 8, BASE); ctx.lineTo(xr + 8, BASE); ctx.moveTo(xr - 8, top); ctx.lineTo(xr + 8, top); ctx.stroke();
    ctx.restore();
    txt(ctx, mm(k), xr + 22, mid - 22, { size: 44, weight: 600, color: C.g, align: 'left', alpha: qa });
    txt(ctx, n === 1 ? '1 strato' : n + ' strati', xr + 22, mid + 26, { size: 30, color: C.dim, align: 'left', alpha: qa });
  }
  // un foglio vero non si piega più di 7 o 8 volte: da qui si fa per finta
  drawRich(ctx, '{r:un foglio vero: al massimo 7 o 8 pieghe}', 650, 212, { size: 30, alpha: life(t, 51.0, 60.2, .4, .5), local: t - 51.0 });
  // la pila è disegnata molto più grande del vero
  txt(ctx, 'ingrandito', 522, 600, { size: 30, color: C.dim, align: 'right', alpha: life(t, 33.6, 60.2, .4, .5) });
  conFont(TITOLI, () => drawRich(ctx, '{v:esperimento mentale}', 650, 256, { size: 36, weight: 600, alpha: life(t, 55.6, 60.2, .4, .5), local: t - 55.6 }));
  ctx.restore();
}

// la scheda a destra: la tabella pieghe → spessore, poi la formula, poi le pieghe «per finta»
const XN = 1340, XS = 1600;
const RIGHE_A = [8.5, 13.3, 18.7, 23.3, 32.2, 33.5];       // pieghe 0–5: compaiono a piega finita
const BARRE = [[66.7, 67.2], [67.25, 67.75], [67.8, 68.3], [68.35, 68.85], [68.9, 69.4]];   // pieghe 6–10
const yRiga = i => 250 + 62 * i;
function perDue(ctx, i, al) {   // freccia «· 2» fra la riga i − 1 e la riga i
  if (al <= 0) return;
  const y0 = yRiga(i - 1) + 6, y1 = yRiga(i) - 6, x = 1722;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.bezierCurveTo(x + 30, y0, x + 30, y1, x + 6, y1); ctx.stroke();
  arrowHead(ctx, [x, y1], Math.PI, C.v, .8);
  ctx.restore();
  txt(ctx, '· 2', 1760, (y0 + y1) / 2, { size: 32, weight: 600, color: C.v, align: 'left', alpha: al });
}
function sceneTabella(ctx, t) {
  const ca = life(t, 8.2, FINE + .6, .5, .6);
  if (ca <= 0) return;
  ctx.save(); ctx.globalAlpha *= ca;
  txt(ctx, 'pieghe', XN, 172, { size: 30, color: C.dim });
  txt(ctx, 'spessore', XS, 172, { size: 30, color: C.dim });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 205); ctx.lineTo(1810, 205); ctx.stroke();
  // pieghe 0–5
  const aA = 1 - P(t, 66.6, 66.9);
  if (aA > 0) RIGHE_A.forEach((ta, i) => {
    const k = P(t, ta, ta + .4, E.out) * aA; if (k <= 0) return;
    txt(ctx, String(i), XN, yRiga(i), { size: 44, color: C.x, alpha: k });
    txt(ctx, mm(i), XS, yRiga(i), { size: 44, alpha: k });
    if (i) perDue(ctx, i, P(t, Math.max(ta, 26.8 + (i - 1) * .3), Math.max(ta, 26.8 + (i - 1) * .3) + .4) * aA);
  });
  // pieghe 6–10, insieme alle barre del grafico
  const aB = 1 - P(t, 78.2, 78.6);
  if (aB > 0) BARRE.forEach(([, tb], i) => {
    const k = P(t, tb - .1, tb + .3, E.out) * aB; if (k <= 0) return;
    txt(ctx, String(i + 6), XN, yRiga(i), { size: 44, color: C.x, alpha: k });
    txt(ctx, mm(i + 6), XS, yRiga(i), { size: 44, weight: i === 4 ? 600 : 500, color: i === 4 ? C.g : C.ink, alpha: k });
    if (i) perDue(ctx, i, k);
  });
  // la formula
  const fa = life(t, 38.2, 78.6, .5, .4);
  if (fa > 0) {
    ctx.save(); ctx.globalAlpha *= fa;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 598); ctx.lineTo(1810, 598); ctx.stroke();
    const esp = life(t, 43.0, 46.4, .3, .3);   // prima esce il titolo, poi entra «esponente» (e viceversa)
    drawRich(ctx, '{dim:spessore dopo }{mx:n}{dim: pieghe}', 1530, 640, { size: 32, alpha: 1 - life(t, 42.7, 46.7, .3, .3) });
    // la formula in un pezzo solo; le posizioni di 0,1, 2 e n si misurano con gli stessi caratteri di drawRich
    const Y = 705, S = 52, F = Math.round(S * 1.12);
    const w = (s, font) => { ctx.font = font; return ctx.measureText(s).width; };
    const KM = `${F}px "KaTeX_Main", Cambria, Georgia, serif`;
    const wA = w('0,1 · 2', KM), wN = w('n', `italic ${Math.round(S * .76)}px "KaTeX_Math", Cambria, Georgia, serif`);
    const wMM = w(' mm', `500 ${S}px Lexend, "Segoe UI", sans-serif`);
    const x0 = 1530 - (wA + wN + wMM) / 2;
    const x01 = x0 + w('0,1', KM) / 2, x2 = x0 + wA - w('2', KM) / 2, xN = x0 + wA + wN / 2;
    // l'esponente: la n diventa viola (nessun cerchio, che toccherebbe il 2) e il suo nome le sta sopra, con un trattino
    drawRich(ctx, '{mink:0,1 · 2}{mx:ⁿ} mm', 1530, Y, { size: S, local: t - 38.3, alpha: 1 - esp });
    if (esp > 0) {
      drawRich(ctx, '{mink:0,1 · 2}{mv:ⁿ} mm', 1530, Y, { size: S, alpha: esp });
      drawRich(ctx, '{v:esponente}', xN, 642, { size: 32, alpha: esp });
      ctx.save(); ctx.globalAlpha *= esp; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(xN, 660); ctx.lineTo(xN, 672); ctx.stroke(); ctx.restore();
    }
    const ruoli = life(t, 46.5, 78.6, .4, .4);
    txt(ctx, 'iniziale', Math.min(x01, x2 - 130), 765, { size: 30, color: C.g, alpha: ruoli });
    txt(ctx, 'fattore', x2, 765, { size: 30, color: C.g, alpha: ruoli });
    ctx.restore();
  }
  // per finta: ogni 10 pieghe · 1024
  const GR = [[78.7, '10', '102,4 mm'], [83.4, '20', '≈ 105 m'], [87.0, '30', '≈ 107 km'], [91.1, '42', '≈ 440 000 km']];
  const yG = i => 260 + 130 * i;
  GR.forEach(([tg, n, s], i) => {
    const k = P(t, tg, tg + .4, E.out); if (k <= 0) return;
    txt(ctx, n, XN, yG(i), { size: 44, color: C.x, alpha: k });
    txt(ctx, s, 1765, yG(i), { size: 44, weight: 600, color: i ? C.g : C.ink, align: 'right', alpha: k });
  });
  [[79.0, 0, '· 1024'], [87.0, 1, '· 1024'], [91.1, 2, '{mv:· 2¹² = · 4096}']].forEach(([tm, i, lab]) => {
    const k = P(t, tm, tm + .4); if (k <= 0) return;
    const y = (yG(i) + yG(i + 1)) / 2, x = 1580;
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y - 30); ctx.lineTo(x, y + 22); ctx.stroke(); ctx.restore();
    arrowHead(ctx, [x, y + 30], Math.PI / 2, C.v, k * .9);
    if (i < 2) txt(ctx, lab, x + 26, y, { size: 32, weight: 600, color: C.v, align: 'left', alpha: k });
    else drawRich(ctx, lab, x + 26, y, { size: 34, align: 'left', alpha: k });
  });
  drawRich(ctx, '{dim:Terra–Luna: circa 384 000 km}', 1530, 740, { size: 30, alpha: P(t, 91.4, 91.9) });
  ctx.restore();
}

// 2 · il grafico a barre degli spessori (60–96.6): 4,8 px per millimetro
const GX = 240, GY = 715, SY = 4.8;
const cxB = n => GX + 50 + 72 * n, topB = n => GY - 0.1 * 2 ** n * SY;
function sceneGrafico(ctx, t) {
  if (t < 59.9 || t > FINE + .7) return;
  const al = Math.min(P(t, 60.0, 60.8), 1 - P(t, FINE, FINE + .6));
  ctx.save(); ctx.globalAlpha *= al;
  // griglia, assi, numeri
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let v = 20; v <= 100; v += 20) { ctx.moveTo(GX, GY - v * SY); ctx.lineTo(1060, GY - v * SY); }
  ctx.stroke();
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(GX - 6, GY); ctx.lineTo(1075, GY); ctx.moveTo(GX, GY + 6); ctx.lineTo(GX, 170); ctx.stroke();
  arrowHead(ctx, [1081, GY], 0, C.ink); arrowHead(ctx, [GX, 164], -Math.PI / 2, C.ink);
  for (let v = 20; v <= 100; v += 20) txt(ctx, String(v), GX - 14, GY - v * SY, { size: 29, color: C.dim, align: 'right' });
  for (let n = 0; n <= 10; n++) txt(ctx, String(n), cxB(n), GY + 32, { size: 29, color: C.dim });
  drawRich(ctx, '{mx:n}', 1112, GY, { size: 44 });
  txt(ctx, 'spessore (mm)', GX + 26, 158, { size: 30, color: C.dim, align: 'left' });
  // le barre: 0–5 quasi insieme, poi 6–10 una alla volta
  for (let n = 0; n <= 10; n++) {
    const k = n <= 5 ? P(t, 61.0 + n * .15, 61.4 + n * .15) : P(t, BARRE[n - 6][0], BARRE[n - 6][1]);
    if (k <= 0) continue;
    const h = (GY - topB(n)) * k;
    ctx.fillStyle = css(C.y, .85); ctx.fillRect(cxB(n) - 20, GY - h, 40, h);
  }
  txt(ctx, '3,2 mm', cxB(5), topB(5) - 36, { size: 44, weight: 600, color: C.g, alpha: life(t, 62.3, 66.6, .4, .3) });
  txt(ctx, '102,4 mm', cxB(10) - 10, topB(10) - 38, { size: 44, weight: 600, color: C.g, alpha: P(t, 69.5, 70.0) });
  // «· 2»: da una barra alla successiva, sopra le barre
  const da = life(t, 74.1, 78.4, .4, .4);
  if (da > 0) [7, 8, 9].forEach((n, i) => {
    const k = P(t, 74.1 + i * .3, 74.6 + i * .3) * da; if (k <= 0) return;
    const S = [cxB(n), topB(n) - 10], Q = [cxB(n), topB(n + 1) + 26], F = [cxB(n + 1) - 26, topB(n + 1) + 26];
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(S[0], S[1]); ctx.quadraticCurveTo(Q[0], Q[1], F[0] - 8, F[1]); ctx.stroke(); ctx.restore();
    arrowHead(ctx, F, 0, C.v, .8 * k);
    txt(ctx, '· 2', cxB(n) - 38, (topB(n) + topB(n + 1)) / 2, { size: 30, weight: 600, color: C.v, alpha: k });
  });
  ctx.restore();
}

// chiusura (96.3–106.3)
function sceneFine(ctx, t) {
  if (t < 96.3) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 96.5 });
    drawRich(ctx, 'Se raddoppia a ogni passo, all’inizio\ncresce poco, poi {g:sempre più in fretta}.', W / 2, 290, { size: 64, weight: 600, local: t - 96.9, stagger: .08 });
  });
  const pills = [[490, '{dim:a ogni passo}', '{mink:· 2}'], [960, '{dim:dopo }{mx:n}{dim: pieghe}', '{mink:0,1 · 2}{mx:ⁿ}{ink: mm}'], [1430, '{dim:ogni 10 pieghe}', '{mink:· 1024}']];
  pills.forEach(([x, testa, f], i) => {
    const a = 98.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, x, 545, { size: 46 });
    ctx.restore();
  });
}

  return {
    titolo: 'La crescita esponenziale', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 59.6, 'il foglio piegato'], [59.6, FINE, 'poco, poi sempre più in fretta']],
    scena(ctx, t) { schede(ctx, t); sceneIntro(ctx, t); sceneFoglio(ctx, t); sceneGrafico(ctx, t); sceneTabella(ctx, t); sceneFine(ctx, t); },
  };
});
