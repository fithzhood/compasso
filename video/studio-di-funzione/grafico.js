'use strict';
/* Tutto insieme — i passi dello studio della funzione guida f(x) = (x² − x − 2)/(x − 3) uno sopra l'altro sullo stesso
   piano: la retta x = 3 (dominio), le zone vietate dal segno, gli zeri −1 e 2 e f(0) = 2/3, gli asintoti x = 3 e
   y = x + 2 con i pezzi di ramo, le frecce, il massimo (1; 1) e il minimo (5; 9). La curva passa nell'unico spazio
   rimasto; poi i controlli di coerenza. Conti rifatti con node. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/grafico', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, txt, dot, arrowHead, glowStroke, card, checkMark } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['dominio', 5.4, 'Primo strato, il dominio: la curva\nnon tocca la retta {mx:x}{mink: = 3}.'],
  ['segno', 5.2, 'Il segno toglie metà piano\nin ogni intervallo: le zone viola.'],
  ['punti', 6.8, 'I punti sicuri: gli zeri {mink:−1} e {mink:2},\ne {mink:f(0) = 2/3} sull’asse {mink:y}.'],
  ['asintoti', 6.4, 'Le rette guida: {mx:x}{mink: = 3} e {mink:y = }{mx:x}{mink: + 2},\ncon i pezzi di ramo.'],
  ['frecce', 5.4, 'Le frecce, il massimo in {mink:(1; 1)}\ne il minimo in {mink:(5; 9)}.'],
  ['spazio', 5.4, 'Resta un solo spazio libero:\nla curva passa di lì.'],
  ['controllo', 5.0, 'Ora i {v:controlli di coerenza}:\nogni passo controlla gli altri.', .3],
  ['c1', 5.2, 'Il massimo ha ordinata {g:positiva}:\nsta in una zona libera. Torna.'],
  ['c2', 4.4, 'Anche il minimo sta dove {mink:f > 0}.\nTorna.'],
  ['c3', 5.4, 'A sinistra di {mink:3} {mink:f} è negativa\ne scende a {r:−∞}. Torna.'],
  ['c4', 5.8, 'Fra i due zeri, {mink:−1} e {mink:2}, la curva\nsale e scende: c’è il massimo. Torna.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Tutti i passi sullo stesso piano:\ndove può passare la curva?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Strato dopo strato, alla fine\nla curva si disegna quasi da sola.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.spazio + 2.0, 'festa'], [T.controllo, 'neutro'], [T.c1 + 3.4, 'felice'], [T.c4 + 4.2, 'festa'],
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
// le zone vietate dal segno: sopra l'asse dove f < 0, sotto dove f > 0; crescono dall'asse
const ZONE = [[-4, -1, true], [-1, 2, false], [2, 3, true], [3, 10, false]];
function zona(ctx, a, b, sopra, k) {
  if (k <= 0) return;
  const y0 = Y(0), y1 = sopra ? Y(14) : Y(-8);
  ctx.save(); ctx.fillStyle = css(C.v, .2);
  ctx.fillRect(X(a), Math.min(y0, y0 + (y1 - y0) * k), X(b) - X(a), Math.abs(y1 - y0) * k); ctx.restore();
}
// un pezzo di curva fra a e b (b può essere minore di a: si disegna da a verso b)
const tratto = (a, b, n = 60) => { const p = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; p.push(S(x, f(x))); } return p; };
// pezzo di ramo pieno con la freccia in fondo (verso l'infinito)
function ramo(ctx, pts, k, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const e = glowStroke(ctx, pts, k, C.y, 6);
  if (e && k > .97) arrowHead(ctx, e[0], e[1], C.y, 1.2);
  ctx.restore();
}
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
  conFont(TITOLI, () => drawRich(ctx, 'Tutto insieme', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1 · la scheda a destra: prima gli strati, poi i controlli (T.dominio–FINE)
const STRATI = [
  ['{v:1}   {dim:dominio}   {mx:x}{mink: ≠ 3}', 'dominio', .5],
  ['{v:2}   {dim:segno}   zone viola', 'segno', .5],
  ['{v:3}   {dim:punti}   {mink:−1},  {mink:2},  {mink:f(0) = 2/3}', 'punti', 3.4],
  ['{v:4}   {dim:asintoti}   {mink:x = 3},  {mink:y = }{mx:x}{mink: + 2}', 'asintoti', .5],
  ['{v:5}   {dim:derivata}   {mink:(1; 1)},  {mink:(5; 9)}', 'frecce', 3.4],
  ['{v:6}   {dim:grafico}   {g:la curva}', 'spazio', 2.0],
];
const CONTROLLI = [['massimo {g:sopra} l’asse', 'c1', 3.8], ['minimo {g:sopra} l’asse', 'c2', 3.4], ['{mink:f < 0}, {mink:f → −∞} per {mx:x}{mink: → 3⁻}', 'c3', 4.2], ['fra gli zeri, il {v:massimo}', 'c4', 4.6]];
function sceneScheda(ctx, t) {
  if (t < T.dominio || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RCARD, P(t, T.dominio + .2, T.dominio + .7) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  const ka = 1 - P(t, T.controllo + .2, T.controllo + .6);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka;
    conFont(TITOLI, () => drawRich(ctx, 'gli strati', 1485, 165, { size: 40, weight: 600, local: t - T.dominio - .4 }));
    STRATI.forEach(([s, k, d], i) => lab(ctx, s, [1185, 250 + i * 92], P(t, T[k] + d, T[k] + d + .4), 40, 'left'));
    ctx.restore();
  }
  const kb = P(t, T.controllo + .6, T.controllo + 1.0);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb;
    conFont(TITOLI, () => drawRich(ctx, 'i controlli', 1485, 165, { size: 40, weight: 600, local: t - T.controllo - .6 }));
    CONTROLLI.forEach(([s, k, d], i) => {
      const y = 270 + i * 120;
      lab(ctx, s, [1265, y], P(t, T.controllo + 1.0 + i * .4, T.controllo + 1.4 + i * .4), 40, 'left');
      checkMark(ctx, 1210, y, P(t, T[k] + d, T[k] + d + .8), C.g, .3);
    });
    ctx.restore();
  }
  ctx.restore();
}

// 2 · il piano: gli strati uno sopra l'altro, poi la curva (T.dominio–FINE)
const PL = tratto(2.45, 2.674), PR = tratto(4.1, 3.4934), OR = tratto(8, 10), OL = tratto(-2.6, -4);
const RAMO_S = tratto(-4, 2.674, 200), RAMO_D = tratto(3.4934, 10, 200);
const A3 = tratto(2, 2.674), A4 = tratto(-1, 2, 80);
const FRECCE = [[[-3.6, -7.4], [0.4, -5.4], 1], [[1.2, -5.4], [2.3, -7.4], -1], [[3.4, -5.4], [4.6, -7.4], -1], [[5.6, -7.4], [9.6, -5.4], 1]];
function sceneGrafico(ctx, t) {
  if (t < T.dominio || t > FINE + .3) return;
  const al = life(t, T.dominio, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  // 2 · le zone vietate dal segno
  ZONE.forEach(([a, b, sopra], i) => zona(ctx, a, b, sopra, P(t, T.segno + .6 + i * .25, T.segno + 1.4 + i * .25, E.out)));
  assi(ctx, P(t, T.dominio + .2, T.dominio + 1.0));
  // 1 · il dominio
  retta3(ctx, P(t, T.dominio + .8, T.dominio + 1.6));
  lab(ctx, '{mx:x}{mv: = 3}', [X(3) - 14, Y(13)], P(t, T.dominio + 1.4, T.dominio + 1.8), 40, 'right');
  // 4 · l'asintoto obliquo e i pezzi di ramo
  const ko = P(t, T.asintoti + .6, T.asintoti + 1.6);
  if (ko > 0) {
    ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.setLineDash([14, 12]);
    const a = S(-4, -2), b = S(10, 12);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * ko, a[1] + (b[1] - a[1]) * ko); ctx.stroke(); ctx.restore();
  }
  lab(ctx, '{mink:y = }{mx:x}{mink: + 2}', S(8.4, 6.5), P(t, T.asintoti + 1.4, T.asintoti + 1.8));
  // 6 · la curva, nell'unico spazio rimasto (sotto i pezzi di ramo, che restano)
  glowStroke(ctx, RAMO_S, P(t, T.spazio + .6, T.spazio + 2.4, E.lin), C.y, 6);
  glowStroke(ctx, RAMO_D, P(t, T.spazio + 2.4, T.spazio + 4.2, E.lin), C.y, 6);
  [PL, PR, OR, OL].forEach((p, i) => ramo(ctx, p, P(t, T.asintoti + 3.0 + i * .3, T.asintoti + 3.8 + i * .3, E.lin)));
  // i tratti di curva che un controllo guarda si colorano di verde
  [[A3, 'c3', 5.2], [A4, 'c4', 5.6]].forEach(([p, k, d]) => {
    const a = life(t, T[k] + .5, T[k] + d, .3, .4);
    if (a > 0) { ctx.save(); ctx.globalAlpha *= a; glowStroke(ctx, p, P(t, T[k] + .5, T[k] + 1.5, E.lin), C.g, 8); ctx.restore(); }
  });
  // 3 · i punti sicuri
  [-1, 2].forEach((x, i) => dot(ctx, S(x, 0), C.y, P(t, T.punti + .8 + i * .3, T.punti + 1.2 + i * .3, E.back), 11));
  dot(ctx, S(0, f(0)), C.y, P(t, T.punti + 3.6, T.punti + 4.0, E.back), 11);
  // 5 · le frecce, il massimo e il minimo con il trattino orizzontale
  FRECCE.forEach(([a, b, su], i) => freccia(ctx, S(a[0], a[1]), S(b[0], b[1]), su > 0 ? C.g : C.r, P(t, T.frecce + .4 + i * .3, T.frecce + .9 + i * .3)));
  // l'etichetta del massimo sta sotto l'asse, a destra: sopra il punto passa y = x + 2
  [[1, 1, 1.6, [1.27, -2.5]], [5, 9, 3.4, [5, 11.4]]].forEach(([x, y, d, e]) => {
    const k = P(t, T.frecce + d, T.frecce + d + .4, E.back);
    if (k <= 0) return;
    const ks = P(t, T.frecce + d + .3, T.frecce + d + .8);
    if (ks > 0) { ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(x - .5 * ks), Y(y)); ctx.lineTo(X(x + .5 * ks), Y(y)); ctx.stroke(); ctx.restore(); }
    dot(ctx, S(x, y), C.y, k, 12);
    lab(ctx, '{mink:(' + x + '; ' + y + ')}', S(e[0], e[1]), P(t, T.frecce + d + .4, T.frecce + d + .8));
  });
  // i controlli: anelli e cornici verdi su ciò che si controlla
  [[1, 1, 'c1'], [5, 9, 'c2']].forEach(([x, y, k]) => {
    const a = life(t, T[k] + .5, T[k] + 5.0, .3, .4);
    if (a > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(X(x), Y(y), 22, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); }
  });
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ogni passo toglie spazio: la curva\npassa dove resta {g:libero}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mx:x}{mink: = 3},  {mink:y = }{mx:x}{mink: + 2}'], [960, 'zone libere e punti'], [1430, 'i controlli {g:tornano}']];
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
    ['soffio', T.dominio], ['traccia', T.dominio + .2, T.dominio + 1.0], ['traccia', T.dominio + .8, T.dominio + 1.6], ['pop', T.dominio + .6, .5],
    ['tono', T.segno + .6, T.segno + 1.4, [.5, .9]], ['tono', T.segno + .85, T.segno + 1.65, [.5, .1]],
    ['tono', T.segno + 1.1, T.segno + 1.9, [.5, .9]], ['tono', T.segno + 1.35, T.segno + 2.15, [.5, .1]], ['pop', T.segno + .6, .55],
    ['pop', T.punti + .9, .4], ['pop', T.punti + 1.2, .5], ['pop', T.punti + 3.7, .45], ['pop', T.punti + .6, .6],
    ['traccia', T.asintoti + .6, T.asintoti + 1.6], ['tono', T.asintoti + .6, T.asintoti + 1.6, [.3, .8]], ['pop', T.asintoti + .6, .65],
    ['tono', T.asintoti + 3.0, T.asintoti + 4.7, [.2, .05, .9, .95, .8]],
    ['tono', T.frecce + .4, T.frecce + 1.8, [.3, .7, .3, .7]], ['pop', T.frecce + 1.7, .5], ['pop', T.frecce + 3.5, .8], ['pop', T.frecce + .6, .7],
    ['traccia', T.spazio + .6, T.spazio + 4.2], ['tono', T.spazio + .6, T.spazio + 2.4, [.3, .45, .5, .4, .05]], ['tono', T.spazio + 2.4, T.spazio + 4.2, [.95, .8, .8, .9]],
    ['ding', T.spazio + 4.3],
    ['soffio', T.controllo + .5], ['pop', T.controllo + .8, .5],
    ['pop', T.c1 + .5, .5], ['ding', T.c1 + 3.9], ['pop', T.c2 + .5, .6], ['ding', T.c2 + 3.5],
    ['pop', T.c3 + .5, .3], ['ding', T.c3 + 4.3], ['pop', T.c4 + .5, .5], ['ding', T.c4 + 4.7],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Tutto insieme', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.spazio - .2, 'gli strati'], [T.spazio - .2, T.controllo - .2, 'la curva'], [T.controllo - .2, FINE, 'i controlli']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
