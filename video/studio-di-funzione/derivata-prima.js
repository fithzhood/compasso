'use strict';
/* Dalle frecce alle cime — la derivata prima della funzione guida f(x) = x + 2 + 4/(x − 3):
   f′(x) = 1 − 4/(x − 3)² = (x² − 6x + 5)/(x − 3)² = (x − 1)(x − 5)/(x − 3)². Tabella dei segni di f′ (valori 1, 3, 5;
   f′: + 0 − ✗ − 0 +) e frecce ↗ ↘ ↘ ↗; massimo (1; 1), minimo (5; 9): il massimo sta più in basso del minimo, perché in
   mezzo c'è l'asintoto x = 3. Conti rifatti con node. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/derivata-prima', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, arrowHead, glowStroke, dashed, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['derivo', 8.0, 'Derivo {mink:f(}{mx:x}{mink:) = }{mx:x}{mink: + 2 + 4/(}{mx:x}{mink: − 3)}:\nè la {v:derivata prima}, {mink:f′}.'],
  ['comune', 8.2, 'Denominatore comune, poi scompongo:\n{mink:(}{mx:x}{mink: − 1)(}{mx:x}{mink: − 5)} sopra, {mink:(}{mx:x}{mink: − 3)²} sotto.'],
  ['tabella', 5.2, 'Tabella dei segni di {mink:f′}:\nin alto {mink:1}, {mink:3} e {mink:5}.', .3],
  ['righe', 6.2, 'Le righe di {mx:x}{mink: − 1} e {mx:x}{mink: − 5}:\nognuna cambia segno nel suo zero.'],
  ['quadrato', 5.4, '{mink:(}{mx:x}{mink: − 3)²} è un quadrato: sempre {g:+},\ne {mink:0} in {mink:3}.'],
  ['segnof', 6.2, 'Riga di {mink:f′}: {g:+}, {r:−}, {r:−}, {g:+}.\n{mink:0} in {mink:1} e {mink:5}, {r:croce} in {mink:3}.'],
  ['frecce', 6.6, 'Dove {mink:f′ > 0} la funzione {g:sale},\ndove {mink:f′ < 0} {r:scende}.'],
  ['piano', 4.4, 'Sul piano, una freccia\nper ogni intervallo.', .3],
  ['massimo', 4.4, 'In {mink:1} {mink:f′} passa da {g:+} a {r:−}:\nc’è un {v:massimo}.'],
  ['puntoM', 6.6, '{mink:f(1) = 1}: massimo in {mink:(1; 1)}.\nIl trattino è la {v:tangente}: orizzontale.'],
  ['minimo', 4.0, 'In {mink:5} da {r:−} a {g:+}: c’è un {v:minimo}.'],
  ['puntom', 5.8, '{mink:f(5) = 9}: il minimo\nè il punto {mink:(5; 9)}.'],
  ['strano', 4.4, 'Il massimo sta {r:più in basso}\ndel minimo!'],
  ['relativo', 5.4, 'Non è un errore: {v:relativo} vuol dire\npiù alto dei punti {g:vicini}.'],
  ['asintoto', 5.4, 'In mezzo c’è l’{v:asintoto}:\nla curva fa due rami separati.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Dove sale, dove scende il grafico?\nDove sono le cime?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Dove {mink:f′} cambia segno ed {mink:f} esiste,\nla curva ha una {v:cima} o una {v:valle}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.comune + 5.5, 'felice'], [T.tabella, 'neutro'], [T.frecce + 2.0, 'felice'], [T.piano, 'neutro'],
  [T.puntoM + 1.0, 'felice'], [T.minimo, 'neutro'], [T.puntom + 1.0, 'felice'], [T.strano, 'sorpreso'],
  [T.relativo, 'pensa'], [T.asintoto + .6, 'felice'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano di lavoro: la stessa finestra della pagina, x da −4 a 10 e y da −8 a 14 ----------
const f = x => (x * x - x - 2) / (x - 3);
const X = x => 185 + (x + 4) * 59, Y = y => 545 - y * 28, S = (x, y) => [X(x), Y(y)];
const PCARD = [90, 110, 1010, 690], RCARD = [1140, 110, 690, 690];
// i numeri dell'asse x stanno sopra o sotto l'asse dove nelle tappe dello studio non passano né la curva né le rette
// (−4, −3, −2 e 2 sopra, il 2 un po' a destra del trattino del massimo; il 3 a destra della retta x = 3);
// sull'asse y solo i multipli di 4, lontani dalla curva
const SOPRA = { '-4': 1, '-3': 1, '-2': 1, 2: 1 };
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -4; i <= 10; i++) { if (!i) continue; ctx.beginPath(); ctx.moveTo(X(i), Y(0) - (Y(0) - Y(14)) * k); ctx.lineTo(X(i), Y(0) + (Y(-8) - Y(0)) * k); ctx.stroke(); }
  for (let j = -8; j <= 14; j += 2) { if (!j) continue; ctx.beginPath(); ctx.moveTo(X(0) - (X(0) - X(-4)) * k, Y(j)); ctx.lineTo(X(0) + (X(10) - X(0)) * k, Y(j)); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(X(0) - (X(0) - X(-4.1)) * k, Y(0)); ctx.lineTo(X(0) + (X(10.15) - X(0)) * k, Y(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(X(0), Y(0) + (Y(-8.1) - Y(0)) * k); ctx.lineTo(X(0), Y(0) - (Y(0) - Y(14.2)) * k); ctx.stroke();
  arrowHead(ctx, [X(0) + (X(10.15) - X(0)) * k + 6, Y(0)], 0, C.ink);
  arrowHead(ctx, [X(0), Y(0) - (Y(0) - Y(14.2)) * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  for (let i = -4; i <= 10; i++) {
    if (!i) continue;
    const s = (i < 0 ? '−' : '') + Math.abs(i);
    if (i === 3) txt(ctx, s, X(3) + 12, Y(0) + 30, { size: 30, color: C.dim, align: 'left' });
    else txt(ctx, s, X(i) + (i === 2 ? 10 : 0), Y(0) + (SOPRA[i] ? -30 : 30), { size: 30, color: C.dim });
  }
  [-8, -4, 4, 8, 12].forEach(j => txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), X(0) - 14, Y(j), { size: 30, color: C.dim, align: 'right' }));
  drawRich(ctx, '{mx:x}', X(10.15) + 40, Y(0), { size: 44 });
  drawRich(ctx, '{my:y}', X(0) + 26, Y(14.2) - 6, { size: 44, align: 'left' });
  ctx.restore();
}
// la retta tratteggiata x = 3, da y = −8 a y = 14
function retta3(ctx, k, al = 1, w = 4) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = w; ctx.setLineDash([14, 12]);
  ctx.beginPath(); ctx.moveTo(X(3), Y(-8)); ctx.lineTo(X(3), Y(-8) + (Y(14) - Y(-8)) * k); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };
const tratto = (a, b, n = 80) => { const p = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; p.push(S(x, f(x))); } return p; };
// una freccia diritta da a a b (in pixel)
function freccia(ctx, a, b, col, k = 1, w = 5) {
  if (k <= 0) return;
  const e = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k], an = Math.atan2(b[1] - a[1], b[0] - a[0]);
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - Math.cos(an) * 8, e[1] - Math.sin(an) * 8); ctx.stroke(); ctx.restore();
  arrowHead(ctx, e, an, col, 1.2);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Dalle frecce alle cime', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1 · a sinistra, il calcolo della derivata (T.derivo–T.piano)
function sceneCalcolo(ctx, t) {
  if (t < T.derivo || t > T.piano + .4) return;
  const al = life(t, T.derivo, T.piano + .3, .5, .5);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'la derivata prima', 595, 172, { size: 40, weight: 600, local: t - T.derivo - .2 }));
  if (t > T.derivo + .3) drawSeq(ctx, ['{my:f(}{mx:x}{my:) = }{mx:x}{mink: + 2 +}', { num: '{mink:4}', den: '{mx:x}{mink: − 3}' }], 595, 282, 54, { local: t - T.derivo - .3 });
  if (t > T.derivo + 4.2) drawSeq(ctx, ['{mink:f′(}{mx:x}{mink:) = 1 −}', { num: '{mink:4}', den: '{mink:(}{mx:x}{mink: − 3)²}' }], 595, 420, 54, { local: t - T.derivo - 4.2 });
  if (t > T.comune + .6) drawSeq(ctx, ['{mink:f′(}{mx:x}{mink:) =}', { num: '{mx:x}{mink:² − 6}{mx:x}{mink: + 5}', den: '{mink:(}{mx:x}{mink: − 3)²}' }], 595, 560, 54, { local: t - T.comune - .6 });
  if (t > T.comune + 3.8) drawSeq(ctx, ['{mink:=}', { num: '{mink:(}{mx:x}{mink: − 1)(}{mx:x}{mink: − 5)}', den: '{mink:(}{mx:x}{mink: − 3)²}' }], 595, 698, 54, { local: t - T.comune - 3.8 });
  ctx.restore();
}

// ---------- 2 · a destra, la tabella dei segni di f′, come sul quaderno ----------
// valori in alto sopra una riga, linee verticali lungo tutta la tabella, un fattore per riga, poi la riga di f′
// (0 sulla linea dove si annulla il numeratore, ✗ rossa dove si annulla il denominatore) e quella delle frecce
const TB = { x0: 1170, x1: 1800, xl: 1385, lin: [1480, 1590, 1700], yv: 346, yh1: 380, righe: [426, 488, 550], yh2: 590, yr: 636, yh3: 668, yf: 702, ytop: 320, ybot: 732 };
const MEZZI = [1432, 1535, 1645, 1750];
const VALORI = ['{mink:1}', '{mink:3}', '{mink:5}'];
const RIGHE = [
  { et: '{mx:x}{mink: − 1}', segni: '−+++', zero: 0 },
  { et: '{mx:x}{mink: − 5}', segni: '−−−+', zero: 2 },
  { et: '{mink:(}{mx:x}{mink: − 3)²}', segni: '++++', zero: 1 },
];
function linea(ctx, a, b, k, col = C.ink, w = 3) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col, .85); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); ctx.stroke(); ctx.restore();
}
function segno(ctx, s, x, y, al, col) {
  if (al <= 0) return;
  txt(ctx, s, x, y - 3, { size: 54, weight: 600, color: col || (s === '+' ? C.g : C.r), alpha: al });
}
function zeroSu(ctx, x, y, al) { lab(ctx, '{mink:0}', [x, y], al, 46); }
function croce(ctx, x, y, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 6; ctx.lineCap = 'round';
  const d = 17, k1 = P(k, 0, .5), k2 = P(k, .5, 1);
  ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x - d + 2 * d * k1, y - d + 2 * d * k1);
  if (k2 > 0) { ctx.moveTo(x + d, y - d); ctx.lineTo(x + d - 2 * d * k2, y - d + 2 * d * k2); }
  ctx.stroke(); ctx.restore();
}
// la fascia intorno alla linea i, quando Ada parla di quel punto
function fascia(ctx, i, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.v, .13);
  ctx.beginPath(); ctx.roundRect(MEZZI[i] - 28, TB.ytop - 4, MEZZI[i + 1] - MEZZI[i] + 56, TB.ybot - TB.ytop + 8, 8); ctx.fill(); ctx.restore();
}
function tabella(ctx, t) {
  const a = T.tabella;
  linea(ctx, [TB.x0, TB.yh1], [TB.x1, TB.yh1], P(t, a + .9, a + 1.6));
  VALORI.forEach((v, i) => {
    lab(ctx, v, [TB.lin[i], TB.yv], P(t, a + 1.0 + i * .4, a + 1.4 + i * .4), 44);
    linea(ctx, [TB.lin[i], TB.ytop + 42], [TB.lin[i], TB.ybot], P(t, a + 1.6 + i * .3, a + 2.4 + i * .3), C.ink, 2.5);
  });
  const tempi = [
    { l: T.righe + .3, s: [T.righe + .8, T.righe + 1.9, T.righe + 2.1, T.righe + 2.3], z: T.righe + 1.4 },
    { l: T.righe + 3.2, s: [T.righe + 3.6, T.righe + 3.8, T.righe + 4.0, T.righe + 4.9], z: T.righe + 4.5 },
    { l: T.quadrato + .3, s: [T.quadrato + 1.2, T.quadrato + 1.4, T.quadrato + 1.6, T.quadrato + 1.8], z: T.quadrato + 3.4 },
  ];
  RIGHE.forEach((R, r) => {
    const y = TB.righe[r], q = tempi[r];
    lab(ctx, R.et, [TB.x0 + 8, y], P(t, q.l, q.l + .4), 44, 'left');
    Array.from(R.segni).forEach((s, i) => segno(ctx, s, MEZZI[i], y, P(t, q.s[i], q.s[i] + .3), C.ink));
    zeroSu(ctx, TB.lin[R.zero], y, P(t, q.z, q.z + .3));
  });
  // la riga di f′
  linea(ctx, [TB.x0, TB.yh2], [TB.x1, TB.yh2], P(t, T.segnof + .2, T.segnof + .8));
  lab(ctx, '{mink:f′(}{mx:x}{mink:)}', [TB.x0 + 8, TB.yr], P(t, T.segnof + .3, T.segnof + .7), 44, 'left');
  Array.from('+−−+').forEach((s, i) => segno(ctx, s, MEZZI[i], TB.yr, P(t, T.segnof + .8 + i * .4, T.segnof + 1.1 + i * .4)));
  [0, 2].forEach((i, j) => zeroSu(ctx, TB.lin[i], TB.yr, P(t, T.segnof + 3.6 + j * .3, T.segnof + 3.9 + j * .3)));
  croce(ctx, TB.lin[1], TB.yr, P(t, T.segnof + 4.6, T.segnof + 5.2));
  // la riga delle frecce di f
  linea(ctx, [TB.x0, TB.yh3], [TB.x1, TB.yh3], P(t, T.frecce + .2, T.frecce + .8), C.ink, 1.5);
  lab(ctx, '{my:f(}{mx:x}{my:)}', [TB.x0 + 8, TB.yf], P(t, T.frecce + .3, T.frecce + .7), 44, 'left');
  [[0, 1, 1.2], [1, -1, 3.6], [2, -1, 3.9], [3, 1, 1.5]].forEach(([i, su, d]) => {
    const c = MEZZI[i], y = TB.yf;
    freccia(ctx, [c - 22, y + 14 * su], [c + 22, y - 14 * su], su > 0 ? C.g : C.r, P(t, T.frecce + d, T.frecce + d + .5), 4.5);
  });
  // anche nella riga delle frecce, in 3 la funzione non esiste
  croce(ctx, TB.lin[1], TB.yf, P(t, T.frecce + 4.2, T.frecce + 4.8));
}
function sceneScheda(ctx, t) {
  if (t < T.tabella || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RCARD, P(t, T.tabella, T.tabella + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'il segno di {mink:f′}', 1485, 160, { size: 40, weight: 600, local: t - T.tabella - .2 }));
  drawSeq(ctx, ['{mink:f′(}{mx:x}{mink:) =}', { num: '{mink:(}{mx:x}{mink: − 1)(}{mx:x}{mink: − 5)}', den: '{mink:(}{mx:x}{mink: − 3)²}' }], 1485, 245, 44, { local: t - T.tabella - .4 });
  fascia(ctx, 0, life(t, T.massimo + .3, T.puntoM + 5.4, .3, .4));
  fascia(ctx, 2, life(t, T.minimo + .3, T.puntom + 5.8, .3, .4));
  tabella(ctx, t);
  ctx.restore();
}

// 3 · il piano: le frecce, il massimo e il minimo, i due rami (T.piano–FINE)
const FRECCE = [[[-3.6, -7.4], [0.4, -5.4], 1], [[1.2, -5.4], [2.3, -7.4], -1], [[3.4, -5.4], [4.6, -7.4], -1], [[5.6, -7.4], [9.6, -5.4], 1]];
const VICINO_M = tratto(0, 2), VICINO_m = tratto(4, 6.5), RAMO_S = tratto(-4, 2.674, 160), RAMO_D = tratto(3.4934, 10, 160);
function sceneGrafico(ctx, t) {
  if (t < T.piano || t > FINE + .3) return;
  const al = life(t, T.piano + .2, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  assi(ctx, P(t, T.piano + .4, T.piano + 1.2));
  const kb = life(t, T.asintoto + .2, FINE, .4, .5);
  retta3(ctx, P(t, T.piano + .8, T.piano + 1.6), 1, 4 + 3 * kb);
  lab(ctx, '{mx:x}{mv: = 3}', [X(3) - 14, Y(13)], P(t, T.piano + 1.4, T.piano + 1.8), 40, 'right');
  FRECCE.forEach(([a, b, su], i) => freccia(ctx, S(a[0], a[1]), S(b[0], b[1]), su > 0 ? C.g : C.r, P(t, T.piano + 1.8 + i * .4, T.piano + 2.3 + i * .4)));
  // il massimo e il minimo, più in basso e più in alto: le loro altezze fino all'asse y
  const kh = P(t, T.strano + .4, T.strano + 1.2);
  if (kh > 0) { dashed(ctx, S(1, 1), S(0, 1), C.dim, kh, .9); dashed(ctx, S(5, 9), S(0, 9), C.dim, kh, .9); }
  // i due rami: prima solo vicino alle cime, poi tutti
  const kr = P(t, T.asintoto + .8, T.asintoto + 1.6);
  if (kr > 0) {
    // con i rami, in tenue, l'asintoto obliquo y = x + 2 e gli zeri −1 e 2
    ctx.save(); ctx.globalAlpha *= .5 * kr; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.setLineDash([12, 12]);
    const a = S(-4, -2), b = S(10, 12); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
    lab(ctx, '{mink:y = }{mx:x}{mink: + 2}', S(8.4, 6.5), .6 * kr);
    ctx.save(); ctx.globalAlpha *= kr; glowStroke(ctx, RAMO_S, 1, C.y, 6); glowStroke(ctx, RAMO_D, 1, C.y, 6); ctx.restore();
    [-1, 2].forEach(x => dot(ctx, S(x, 0), C.y, kr, 10));
  }
  glowStroke(ctx, VICINO_M, P(t, T.relativo + .8, T.relativo + 1.8, E.lin), C.y, 6);
  glowStroke(ctx, VICINO_m, P(t, T.relativo + 1.4, T.relativo + 2.4, E.lin), C.y, 6);
  // i punti con il trattino orizzontale (la tangente, orizzontale perché lì f′ = 0)
  // l'etichetta del massimo sta sotto l'asse, a destra: sopra il punto passa y = x + 2
  [[1, 1, T.puntoM, [1.27, -2.5], 3.2], [5, 9, T.puntom, [5, 11.4], .8]].forEach(([x, y, a, e, dt]) => {
    const k = P(t, a + .4, a + .8, E.back);
    if (k <= 0) return;
    const ks = P(t, a + dt, a + dt + .5);
    if (ks > 0) { ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(x - .5 * ks), Y(y)); ctx.lineTo(X(x + .5 * ks), Y(y)); ctx.stroke(); ctx.restore(); }
    dot(ctx, S(x, y), C.y, k, 12);
    lab(ctx, '{mink:(' + x + '; ' + y + ')}', S(e[0], e[1]), P(t, a + 1.0, a + 1.4));
  });
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Dove {mink:f′} cambia segno ed {mink:f} esiste,\nla curva ha una {v:cima} o una {v:valle}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mink:f′}: {g:+} → {r:−}  {v:massimo}'], [960, '{mink:f′}: {r:−} → {g:+}  {v:minimo}'], [1430, 'più alto dei {g:vicini}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 215, 455, 430, 100);
    drawRich(ctx, s, x, 507, { size: 38, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', T.derivo], ['pop', T.derivo + .5, .5], ['pop', T.derivo + 4.4, .6],                  // f, poi f′
    ['pop', T.comune + .8, .5], ['ding', T.comune + 4.0],                                           // denominatore comune, scompongo
    ['soffio', T.tabella], ['traccia', T.tabella + .9, T.tabella + 1.6],
    ['pop', T.tabella + 1.1, .3], ['pop', T.tabella + 1.5, .5], ['pop', T.tabella + 1.9, .7], ['traccia', T.tabella + 1.6, T.tabella + 3.0],
    ['pop', T.righe + .8, .2], ['pop', T.righe + 1.4, .5], ['pop', T.righe + 1.9, .7], ['pop', T.righe + 3.6, .2], ['pop', T.righe + 4.9, .7],
    ['pop', T.quadrato + 1.2, .7], ['pop', T.quadrato + 3.4, .5],
    ['traccia', T.segnof + .2, T.segnof + .8], ['pop', T.segnof + .9, .7], ['pop', T.segnof + 1.3, .25], ['pop', T.segnof + 1.7, .25], ['pop', T.segnof + 2.1, .7],
    ['pop', T.segnof + 3.7, .5], ['traccia', T.segnof + 4.6, T.segnof + 5.2],
    ['tono', T.frecce + 1.2, T.frecce + 2.0, [.3, .8]], ['tono', T.frecce + 3.6, T.frecce + 4.4, [.8, .3]],   // frecce su, frecce giù
    ['soffio', T.piano + .2], ['traccia', T.piano + .4, T.piano + 1.2], ['traccia', T.piano + .8, T.piano + 1.6],
    ['tono', T.piano + 1.8, T.piano + 2.3, [.3, .7]], ['tono', T.piano + 2.2, T.piano + 2.7, [.7, .3]],
    ['tono', T.piano + 2.6, T.piano + 3.1, [.7, .3]], ['tono', T.piano + 3.0, T.piano + 3.5, [.3, .7]],
    ['pop', T.massimo + .4, .4], ['ding', T.puntoM + .5], ['pop', T.minimo + .4, .6], ['ding', T.puntom + .5],
    ['traccia', T.strano + .4, T.strano + 1.2], ['tono', T.relativo + .8, T.relativo + 2.4, [.3, .35, .3, .8, .75, .8]],
    ['soffio', T.asintoto + .8],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Dalle frecce alle cime', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.tabella - .2, 'la derivata prima'], [T.tabella - .2, T.piano - .2, 'la tabella dei segni'], [T.piano - .2, FINE, 'massimo e minimo']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCalcolo(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
