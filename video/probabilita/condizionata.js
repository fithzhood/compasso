'use strict';
/* La probabilità condizionata — il dado nascosto: «è uscito un pari», i casi si restringono a 2, 4, 6 e il 2 passa
   da 1/6 a 1/3; B diventa il nuovo spazio campionario; P(A | B) = P(A ∩ B) / P(B) con P(B) ≠ 0, verificata con
   (1/6)/(1/2) = 1/3; al contrario P(B | A) = P(pari | 2) = 1: P(A | B) e P(B | A) sono diversi.
   Argomento: probabilita. */
CVIDEO.registra('probabilita/condizionata', M => {
  const { W, C, E, P, life, kf, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, card } = M;

const FINE = 93.2, DUR = 105.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [12.1, 'pensa'], [14.3, 'neutro'], [16.8, 'sorpreso'], [19.0, 'neutro'], [25.6, 'felice'], [27.8, 'neutro'],
  [48.8, 'felice'], [51.0, 'neutro'], [66.8, 'festa'], [69.2, 'neutro'],
  [75.6, 'pensa'], [80.2, 'neutro'], [84.4, 'felice'], [86.6, 'neutro'], [88.6, 'sorpreso'], [90.8, 'neutro'],
  [FINE + 2.2, 'felice'], [100.2, 'occhiolino'],
];
// una frase per ogni cosa che succede; la cornice dei casi si stringe e si allarga mentre Ada lo dice
const FUMETTI = [
  [2.4, 6.4, 'Sapere qualcosa in più\ncambia la probabilità?'],
  // 1 · il dado nascosto
  [8.0, 11.9, 'Un amico lancia un dado\nsenza fartelo vedere.'],
  [12.1, 16.6, 'Quanto è probabile che sia il 2?\nUn caso su sei: {mink:1/6}.'],
  [16.8, 20.9, 'Poi ti dice:\n«è uscito un numero pari».'],
  [21.1, 25.4, 'I dispari sono esclusi:\nrestano {v:2, 4 e 6}.'],
  [25.6, 30.1, 'Il 2 è un caso su {g:tre}:\nla probabilità ora è {mink:1/3}.'],
  [30.3, 34.8, 'L’informazione {v:restringe} i casi:\nda sei a tre.'],
  // 2 · A sapendo B
  [35.0, 39.4, 'Chiamo {mink:A} l’evento «esce il 2»\ne {mink:B} l’evento «esce pari».'],
  [39.6, 44.0, '{mink:B} è il nuovo {v:spazio campionario}:\nl’insieme dei casi possibili.'],
  [44.2, 48.6, 'Si scrive {mink:P(A | B)}: la barra {mink:|}\nsi legge «sapendo».'],
  [48.8, 53.0, 'È la probabilità {g:condizionata}:\n«{mink:A} sapendo {mink:B}».'],
  [53.2, 57.6, '{mink:A ∩ B} vuol dire «{mink:A} e {mink:B}»:\nqui è solo il 2.'],
  [57.8, 62.2, 'Su tutti e sei i casi: {mink:P(A ∩ B) = 1/6}\ne {mink:P(B) = 1/2}.'],
  [62.4, 66.6, 'La formula divide\n{mink:P(A ∩ B)} per {mink:P(B)}.'],
  [66.8, 71.0, 'Con i numeri viene {mg:1/3},\ncome prima!'],
  [71.2, 75.4, '{mink:P(B)} non può essere {r:0}:\nnon si divide per zero.'],
  // 3 · al contrario
  [75.6, 80.0, 'Ora al contrario: sapendo\nche è uscito il 2, è pari?'],
  [80.2, 84.2, 'Ora i casi possibili\nsono solo il 2.'],
  [84.4, 88.4, 'Il 2 è pari di sicuro:\n{mink:P(B | A) = 1}.'],
  [88.6, 92.8, '{mink:P(A | B)} e {mink:P(B | A)}\nsono numeri {r:diversi}.'],
  // chiusura
  [95.4, 102.2, 'Sapere che {mink:B} è successo\nrestringe i casi a {mink:B}.'],
];

const fr = (a, b, ca = 'mink', cb = 'mink') => ({ num: `{${ca}:${a}}`, den: `{${cb}:${b}}` });
const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
function dado(ctx, x, y, s, n, o = {}) {
  const k = o.k ?? 1, al = o.al ?? 1;
  if (k <= 0.01 || al <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, s * .18);
  ctx.fillStyle = css(o.fill || C.paper); ctx.fill();
  ctx.strokeStyle = css(o.edge || C.ink); ctx.lineWidth = o.lw || 3; ctx.stroke();
  ctx.fillStyle = css(o.pip || C.ink);
  for (const [a, b] of PIPS[n]) { ctx.beginPath(); ctx.arc(a * s * .27, b * s * .27, s * .085, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
function rett(ctx, r, col, lw, al = 1, tratt = false) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = lw;
  if (tratt) ctx.setLineDash([14, 10]);
  ctx.beginPath(); ctx.roundRect(r[0], r[1], r[2] - r[0], r[3] - r[1], 22); ctx.stroke(); ctx.restore();
}
function riquadro(ctx, x, y, w, h, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 16); ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La probabilità condizionata', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// i dadi: in alto i dispari, in basso i pari (B è la riga di sotto)
const POS = { 1: [600, 270], 3: [790, 270], 5: [980, 270], 2: [600, 460], 4: [790, 460], 6: [980, 460] };
const R_TUTTI = [498, 172, 1082, 558], R_B = [498, 362, 1082, 558], R_2 = [528, 388, 672, 532];
const R_BV = [512, 376, 1068, 544];   // il contorno viola di B, dentro la cornice
// la cornice dei casi possibili: tutti, poi solo B, poi di nuovo tutti, poi solo il 2 (dove prima c'era il quadrato di A)
function cornice(t) {
  const v = kf(t, [[30.4, 0], [31.2, 1], [57.9, 1], [58.6, 0], [75.7, 0], [76.5, 2]]);
  const r0 = v >= 1 ? R_B : R_TUTTI, r1 = v >= 1 ? R_2 : R_B, q = v >= 1 ? v - 1 : v;
  return r0.map((x, i) => x + (r1[i] - x) * q);
}
// trasparenza dei dadi che non sono più casi possibili
function spento(n, t) {
  if (n % 2) return Math.max(P(t, 21.2, 21.9) * (1 - P(t, 57.9, 58.6)), P(t, 75.7, 76.5));
  if (n !== 2) return P(t, 75.7, 76.5);
  return 0;
}

// 1–3 · il dado e i casi (7.5–FINE)
function sceneDado(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .5, .6);
  card(ctx, 130, 115, 1660, 680, al);
  ctx.save(); ctx.globalAlpha *= al;
  // il dado nascosto
  const kn = P(t, 7.9, 8.4, E.back);
  if (kn > 0) {
    ctx.save(); ctx.translate(300, 330); ctx.scale(kn, kn);
    ctx.beginPath(); ctx.roundRect(-75, -75, 150, 150, 27); ctx.fillStyle = css(C.v, .12); ctx.fill();
    ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    txt(ctx, '?', 300, 334, { size: 96, weight: 600, color: C.v, alpha: kn });
  }
  drawRich(ctx, '{v:«pari»}', 300, 470, { size: 40, weight: 600, local: t - 16.9 });
  // la cornice dei casi possibili
  rett(ctx, cornice(t), C.ink, 4, .55 * P(t, 8.6, 9.2), true);
  // B: la riga dei pari; A: il 2
  const kB = P(t, 35.6, 36.1);
  rett(ctx, R_BV, C.v, 5, kB);
  drawRich(ctx, '{mv:B}', 1128, 460, { size: 52, alpha: kB });
  drawRich(ctx, '{dim:nuovo spazio campionario}', 1082, 596, { size: 30, align: 'right', alpha: life(t, 39.7, 44.1, .4, .4) });
  // i dadi
  for (let n = 1; n <= 6; n++) {
    const [x, y] = POS[n], k = P(t, 8.4 + n * .1, 8.9 + n * .1, E.back);
    const g = n === 2 ? life(t, 53.3, 62.2, .4, .4) : 0;   // il 2 sta in A e in B
    dado(ctx, x, y, 116, n, { k, al: 1 - .75 * spento(n, t), fill: mix(C.paper, C.g, .16 * g), edge: mix(C.ink, C.g, g), pip: mix(C.ink, C.g, g), lw: 3 + 2 * g });
  }
  // il 2: prima «il caso del 2», poi l'evento A; nel capitolo 3 il suo quadrato diventa la cornice
  const kA = P(t, 12.3, 12.8) * (1 - P(t, 75.7, 76.0));
  if (kA > 0) rett(ctx, R_2, C.x, 5, kA);
  drawRich(ctx, '{mx:A}', 600, 596, { size: 52, alpha: P(t, 35.2, 35.7) });
  ctx.restore();
}
// la colonna dei conti, a destra (12–FINE)
const XC = 1482, XL = 1190;
const PAB = '{mink:P(}{mx:A}{mink: | }{mv:B}{mink:)}', PBA = '{mink:P(}{mv:B}{mink: | }{mx:A}{mink:)}';
const PAiB = '{mink:P(}{mx:A}{mink: ∩ }{mv:B}{mink:)}', PB = '{mink:P(}{mv:B}{mink:)}';
function sceneConti(ctx, t) {
  if (t < 12 || t > FINE + .7) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE);
  // 1 · prima e dopo l'informazione
  const s1 = 1 - P(t, 34.6, 35.0);
  if (s1 > 0) {
    ctx.save(); ctx.globalAlpha *= s1;
    txt(ctx, 'senza informazioni', XC, 215, { size: 32, color: C.dim, alpha: P(t, 12.3, 12.7) });
    drawSeq(ctx, ['il 2:', fr(1, 6)], XC, 300, 56, { local: t - 12.6 });
    txt(ctx, 'sapendo che è pari', XC, 455, { size: 32, color: C.dim, alpha: P(t, 25.8, 26.2) });
    drawSeq(ctx, ['il 2:', fr(1, 3, 'mg', 'mg')], XC, 540, 56, { local: t - 26.1 });
    ctx.restore();
  }
  // 2a · A, B e la scrittura P(A | B)
  const s2 = P(t, 35.0, 35.4) * (1 - P(t, 57.6, 58.0));
  if (s2 > 0) {
    ctx.save(); ctx.globalAlpha *= s2;
    drawRich(ctx, '{mx:A}{dim: = «esce il 2»}', XL, 190, { size: 38, align: 'left', local: t - 35.1 });
    drawRich(ctx, '{mv:B}{dim: = «esce pari»}', XL, 250, { size: 38, align: 'left', local: t - 36.2 });
    drawSeq(ctx, [PAB + '{mink: =}', fr(1, 3, 'mg', 'mg')], XC, 380, 58, { local: t - 44.4 });
    drawRich(ctx, '«{mx:A} sapendo {mv:B}»', XC, 480, { size: 38, local: t - 49.0 });
    const kl = P(t, 53.3, 53.7);
    if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 550); ctx.lineTo(1750, 550); ctx.stroke(); ctx.restore(); }
    drawRich(ctx, '{mx:A}{mink: ∩ }{mv:B}{ink: = «}{mx:A}{ink: e }{mv:B}{ink:»}', XC, 620, { size: 44, local: t - 53.4 });
    drawRich(ctx, '{dim:qui: solo il 2}', XC, 700, { size: 32, local: t - 54.4 });
    ctx.restore();
  }
  // 2b · la formula e la verifica
  const s3 = P(t, 57.8, 58.2) * (1 - P(t, 75.4, 75.8));
  if (s3 > 0) {
    ctx.save(); ctx.globalAlpha *= s3;
    drawSeq(ctx, [PAiB + '{mink: =}', fr(1, 6)], XC, 195, 46, { local: t - 58.0 });
    drawSeq(ctx, [PB + '{mink: =}', fr(3, 6), '{mink:=}', fr(1, 2)], XC, 315, 46, { local: t - 59.4 });
    drawSeq(ctx, [PAB + '{mink: =}', { num: PAiB, den: PB }], XC, 480, 48, { local: t - 62.6 });
    riquadro(ctx, XC, 482, 560, 140, C.v, P(t, 64.0, 64.5));
    drawSeq(ctx, ['{mink:=}', fr('1/6', '1/2'), '{mink:=}', fr(1, 3, 'mg', 'mg')], XC, 630, 50, { local: t - 67.0 });
    drawRich(ctx, PB + '{mink: ≠ 0}', XC, 742, { size: 42, local: t - 71.4 });
    ctx.restore();
  }
  // 3 · al contrario
  const s4 = P(t, 75.6, 76.0);
  if (s4 > 0) {
    ctx.save(); ctx.globalAlpha *= s4;
    txt(ctx, 'sapendo che è uscito il 2', XC, 215, { size: 32, color: C.dim, alpha: P(t, 76.0, 76.4) });
    drawRich(ctx, 'casi possibili: solo il 2', XC, 262, { size: 36, local: t - 80.3 });
    drawRich(ctx, PBA + '{mink: = }{mg:1}', XC, 340, { size: 56, local: t - 84.6 });
    txt(ctx, 'sapendo che è pari', XC, 445, { size: 32, color: C.dim, alpha: P(t, 88.7, 89.1) });
    drawSeq(ctx, [PAB + '{mink: =}', fr(1, 3)], XC, 530, 56, { local: t - 88.8 });
    drawRich(ctx, PAB + '{mink: ≠ }' + PBA, XC, 665, { size: 48, local: t - 89.8 });
    riquadro(ctx, XC, 665, 520, 100, C.r, P(t, 90.6, 91.1));
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
    drawRich(ctx, 'Sapere che {mv:B} è successo restringe i casi:\n{mv:B} diventa il nuovo spazio campionario.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[400, '{dim:probabilità condizionata}'], [960, '{dim:il dado, sapendo che è pari}'], [1520, '{dim:l’ordine conta}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 250, 450, 500, 190);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    if (i === 0) drawSeq(ctx, ['{mink:P(A | B) =}', fr('P(A ∩ B)', 'P(B)')], x, 572, 40);
    if (i === 1) drawSeq(ctx, ['{mink:P(2 | }pari{mink:) =}', fr(1, 3, 'mg', 'mg')], x, 572, 44);
    if (i === 2) drawRich(ctx, '{mink:P(A | B) ≠ P(B | A)}', x, 572, { size: 42 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La probabilità condizionata', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 34.9, 'il dado nascosto'], [34.9, 75.5, '«{mink:A} sapendo {mink:B}»'], [75.5, FINE, 'al contrario']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneDado(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
