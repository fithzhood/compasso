'use strict';
/* Il teorema di Talete — tre parallele tagliate da due trasversali: AB/BC = A′B′/B′C′, anche se si inclina una trasversale
   o si sposta una parallela. Argomento: geometria-euclidea. */
CVIDEO.registra('geometria-euclidea/talete', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, drawSeq, glowStroke, dot, card } = M;

const FINE = 66.7, DUR = 78.7;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [33.4, 'sorpreso'], [36.9, 'felice'], [40.9, 'neutro'], [44.7, 'felice'], [48.7, 'neutro'], [52.8, 'felice'],
  [57.2, 'festa'], [61.7, 'neutro'], [69.1, 'felice'], [73.5, 'occhiolino'],
];
const FUMETTI = [
  [2.5, 6.3, 'Delle rette parallele tagliano\ndue rette. Che cosa succede?'],
  [7.9, 11.8, 'Ecco tre rette {v:parallele}: sono\nun {g:fascio} di parallele.'],
  [11.9, 15.4, 'Due rette le tagliano:\nsono due {g:trasversali}.'],
  [15.5, 20.3, 'Sulla prima ci sono {mink:A}, {mink:B}, {mink:C},\nsulla seconda {mink:A′}, {mink:B′}, {mink:C′}.'],
  [20.4, 24.4, 'Misuro i segmenti sulla prima:\n{mx:AB}{mink: = 2} e {my:BC}{mink: = 3}.'],
  [24.5, 28.6, 'Sulla seconda sono più lunghi:\n{mx:A′B′}{mink: = 2,5} e {my:B′C′}{mink: = 3,75}.'],
  [28.7, 32.6, 'Il rapporto fra {mx:AB} e {my:BC}\nè due terzi.'],
  [32.7, 36.8, 'E sulla seconda? {mx:A′B′} diviso {my:B′C′}\nfa ancora {g:due terzi}!'],
  [36.9, 40.8, 'I segmenti sono {g:proporzionali}:\ni rapporti sono uguali.'],
  [40.9, 44.6, 'Inclino la seconda trasversale:\ni segmenti cambiano…'],
  [44.7, 48.6, '{mx:A′B′}{mink: = 3}, {my:B′C′}{mink: = 4,5}: il rapporto\nè ancora {g:due terzi}.'],
  [48.7, 52.7, 'Ora sposto la terza parallela:\nsi allungano {my:BC} e {my:B′C′}.'],
  [52.8, 57.1, '{my:BC}{mink: = 4}, {my:B′C′}{mink: = 6}: tutti e due\ni rapporti fanno {g:un mezzo}.'],
  [57.2, 61.6, '{v:Talete}: le parallele tagliano sulle\ntrasversali segmenti {g:proporzionali}.'],
  [61.7, 66.1, 'In formula: {mx:AB} diviso {my:BC} è\nuguale ad {mx:A′B′} diviso {my:B′C′}.'],
  [69.1, 75.7, 'Un fascio di parallele taglia due\ntrasversali in segmenti {g:proporzionali}.'],
];

// le parallele sono orizzontali, alle altezze 0, 1,6 e 2,4 più in su (poi 3,2: la terza si sposta);
// la prima trasversale ha pendenza 0,8 sul tratto (AB = 1,6 / 0,8 = 2, BC = 2,4 / 0,8 = 3),
// la seconda prima 0,64 (2,5 e 3,75), poi, inclinata, 8/15 (3 e 4,5; con la terza parallela spostata 6)
const U = 70, OX = 150, Y0 = 690;
const S = (x, y) => [OX + U * x, Y0 - U * y];
const T_RUOTA = [41.2, 43.2], T_SPOSTA = [49.0, 51.0];
const yTerza = t => kf(t, [[T_SPOSTA[0], 4.0], [T_SPOSTA[1], 4.8]]);
const senoT2 = t => Math.sin(kf(t, [[T_RUOTA[0], Math.asin(.64)], [T_RUOTA[1], Math.asin(8 / 15)]]));
const A1 = [1, 0], A2 = [13.5, 0];
// punto della prima / seconda trasversale all’altezza y
const suT1 = y => [A1[0] + .6 * y / .8, y];
const suT2 = (t, y) => { const s = senoT2(t), c = Math.sqrt(1 - s * s); return [A2[0] - c * y / s, y]; };
function linea(ctx, a, b, col, w, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  glowStroke(ctx, [S(...a), S(lerp(a[0], b[0], k), lerp(a[1], b[1], k))], 1, col, w);
  ctx.restore();
}
function tratto(ctx, a, b, col, w, al) {
  if (al <= 0) return;
  const p = S(...a), q = S(...b);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il teorema di Talete', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il fascio, le trasversali, i segmenti (7.5–FINE)
function sceneFascio(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .4, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  const y3 = yTerza(t), ys = [0, 1.6, y3];
  // le tre parallele
  ys.forEach((y, i) => linea(ctx, [-.5, y], [14.2, y], C.v, 5, P(t, 8.1 + .4 * i, 9.1 + .4 * i)));
  // le due trasversali, appena oltre la prima e la terza parallela
  const lo = -.45, hi = y3 + .3;
  linea(ctx, suT1(lo), suT1(hi), C.ink, 4, P(t, 12.1, 12.9));
  linea(ctx, suT2(t, lo), suT2(t, hi), C.ink, 4, P(t, 12.7, 13.5));
  // i segmenti messi in evidenza
  const PA = suT1(0), PB = suT1(1.6), PC = suT1(y3), QA = suT2(t, 0), QB = suT2(t, 1.6), QC = suT2(t, y3);
  const h1 = life(t, 20.6, 57.0, .5, .6), h2 = life(t, 24.7, 57.0, .5, .6);
  tratto(ctx, PA, PB, C.x, 14, .5 * h1); tratto(ctx, PB, PC, C.y, 14, .5 * h1);
  tratto(ctx, QA, QB, C.x, 14, .5 * h2); tratto(ctx, QB, QC, C.y, 14, .5 * h2);
  // i punti e i loro nomi (a sinistra sulla prima, a destra sulla seconda)
  const nomi = [[PA, 'A', -1, 15.8], [PB, 'B', -1, 16.3], [PC, 'C', -1, 16.8], [QA, 'A′', 1, 18.2], [QB, 'B′', 1, 18.7], [QC, 'C′', 1, 19.2]];
  nomi.forEach(([p, n, lato, ta]) => {
    const k = P(t, ta, ta + .4, E.out); if (k <= 0) return;
    const [x, y] = S(...p);
    dot(ctx, [x, y], C.ink, k, 8);
    drawRich(ctx, `{mink:${n}}`, x + lato * 52, y - 38, { size: 44, alpha: k });
  });
  ctx.restore();
}

// la scheda delle misure, poi l’enunciato (20–FINE)
const frazione = (n, d) => ({ num: n, den: d });
function sceneScheda(ctx, t) {
  if (t < 20.4 || t > FINE + .3) return;
  const ca = life(t, 20.5, FINE + .2, .5, .6);
  card(ctx, 1200, 130, 640, 630, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const X = 1520, XL = 1370, XR = 1675;
  const mis = 1 - P(t, 56.9, 57.4);     // le misure lasciano il posto all’enunciato
  if (mis > 0) {
    ctx.save(); ctx.globalAlpha *= mis;
    conFont(TITOLI, () => drawRich(ctx, 'le misure', X, 188, { size: 40, weight: 600, local: t - 20.6 }));
    // fuori i valori vecchi, dentro i nuovi: dopo che la trasversale ha girato, dopo che la parallela si è spostata
    const vR = P(t, 44.7, 45.2), oR = P(t, 41.0, 41.4);           // seconda trasversale inclinata
    const vS = P(t, 52.8, 53.3), oS = P(t, 48.9, 49.3);           // terza parallela spostata
    drawRich(ctx, '{mx:AB}{mink: = 2}', XL, 262, { size: 44, local: t - 20.9 });
    drawRich(ctx, '{my:BC}{mink: = 3}', XR, 262, { size: 44, local: t - 21.6, alpha: 1 - oS });
    drawRich(ctx, '{my:BC}{mink: = 4}', XR, 262, { size: 44, alpha: vS });
    drawRich(ctx, '{mx:A′B′}{mink: = 2,5}', XL, 340, { size: 44, local: t - 25.2, alpha: 1 - oR });
    drawRich(ctx, '{mx:A′B′}{mink: = 3}', XL, 340, { size: 44, alpha: vR });
    drawRich(ctx, '{my:B′C′}{mink: = 3,75}', XR, 340, { size: 44, local: t - 25.9, alpha: 1 - oR });
    drawRich(ctx, '{my:B′C′}{mink: = 4,5}', XR, 340, { size: 44, alpha: vR * (1 - oS) });
    drawRich(ctx, '{my:B′C′}{mink: = 6}', XR, 340, { size: 44, alpha: vS });
    ctx.strokeStyle = css(C.dim, .5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1240, 395); ctx.lineTo(1800, 395); ctx.stroke();
    // i rapporti
    const r1 = P(t, 28.9, 29.4), r2 = P(t, 32.9, 33.4);
    const AB = frazione('{mx:AB}', '{my:BC}'), AB2 = frazione('{mx:A′B′}', '{my:B′C′}');
    const due3 = frazione('{mink:2}', '{mink:3}'), mezzo = frazione('{mink:1}', '{mink:2}');
    drawSeq(ctx, [AB, '{mink:=}', due3], X, 475, 44, { alpha: r1 * (1 - oS) });
    drawSeq(ctx, [AB, '{mink:=}', frazione('{mink:2}', '{mink:4}'), '{mink:=}', mezzo], X, 475, 44, { alpha: vS });
    drawSeq(ctx, [AB2, '{mink:=}', frazione('{mink:2,5}', '{mink:3,75}'), '{mink:=}', due3], X, 625, 44, { alpha: r2 * (1 - oR) });
    drawSeq(ctx, [AB2, '{mink:=}', frazione('{mink:3}', '{mink:4,5}'), '{mink:=}', due3], X, 625, 44, { alpha: vR * (1 - oS) });
    drawSeq(ctx, [AB2, '{mink:=}', frazione('{mink:3}', '{mink:6}'), '{mink:=}', mezzo], X, 625, 44, { alpha: vS });
    // «proporzionali»: i due risultati uguali cerchiati di verde
    const kp = life(t, 37.1, 40.9, .4, .4);
    if (kp > 0) {
      ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(1250, 410, 540, 280, 18); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  const en = P(t, 57.4, 57.9);
  if (en > 0) {
    ctx.save(); ctx.globalAlpha *= en;
    conFont(TITOLI, () => drawRich(ctx, 'teorema di Talete', X, 188, { size: 40, weight: 600 }));
    drawRich(ctx, 'Un fascio di rette parallele\ntaglia due trasversali\nin segmenti {g:proporzionali}.', X, 330, { size: 38, lh: 1.35, local: t - 57.5 });
    drawSeq(ctx, [frazione('{mx:AB}', '{my:BC}'), '{mink:=}', frazione('{mx:A′B′}', '{my:B′C′}')], X, 590, 52, { local: t - 61.9 });
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le parallele tagliano le trasversali\nin segmenti {g:proporzionali}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'un {v:fascio}\ndi parallele'], [960, 'due trasversali\n{g:qualunque}'], [1430, 'rapporti\n{g:uguali}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 445, 430, 130);
    drawRich(ctx, s, x, 512, { size: 34, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il teorema di Talete', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 20.3, 'il fascio e le trasversali'], [20.3, 40.8, 'i segmenti'], [40.8, 57.1, 'cambio la figura'], [57.1, 66.1, 'il teorema']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFascio(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
