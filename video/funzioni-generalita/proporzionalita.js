'use strict';
/* Doppio, metà, quadruplo — tre leggi con la stessa tabella x = 1, 2, 4: y = 3x (y raddoppia, rapporto y : x = 3,
   una retta per l'origine), y = 12/x (y si dimezza, prodotto x · y = 12, un ramo di iperbole), y = x² (y quadruplica,
   rapporto y : x² = 1, un ramo di parabola); al posto di 3, 12 e 1 può esserci un k qualunque, non 0.
   Argomento: funzioni-generalita. */
CVIDEO.registra('funzioni-generalita/proporzionalita', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, txt, drawSeq, dot, glowStroke, arrowHead, card } = M;

const FINE = 86.4, DUR = 97.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [18.4, 'felice'], [20.5, 'neutro'], [28.6, 'felice'], [30.7, 'neutro'], [41.9, 'sorpreso'], [44.0, 'neutro'],
  [52.1, 'felice'], [54.2, 'neutro'], [65.8, 'sorpreso'], [67.9, 'neutro'], [78.1, 'felice'],
  [80.5, 'pensa'], [82.6, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.6, 'Se {mx:x} raddoppia, che cosa fa {my:y}?\nDipende dalla legge.'],
  // 1 · diretta
  [7.9, 11.7, 'Prima legge: {mink:y = 3x}.'],
  [11.9, 17.1, 'Con {mx:x} uguale a 1, 2, 4\nviene {my:y} uguale a 3, 6, 12.'],
  [17.3, 21.5, '{mx:x} raddoppia, e anche {my:y}\n{g:raddoppia}.'],
  [21.7, 26.7, 'Il rapporto {mink:y : x} resta 3: è la\n{v:proporzionalità diretta}.'],
  [26.9, 31.5, 'Il grafico è una {g:retta}\nche passa per l’origine.'],
  // 2 · inversa
  [31.9, 35.9, 'Seconda legge: {mink:y = 12/x}.'],
  [36.1, 40.5, 'Stessi {mx:x}: viene {my:y} uguale\na 12, 6, 3.'],
  [40.7, 44.9, '{mx:x} raddoppia e {my:y} si {g:dimezza}.'],
  [45.1, 50.1, 'Il prodotto {mink:x · y} resta 12: è la\n{v:proporzionalità inversa}.'],
  [50.3, 55.7, 'Il grafico è un ramo di {g:iperbole}:\nscende, e non arriva mai a 0.'],
  // 3 · quadratica
  [56.1, 60.1, 'Terza legge: {mink:y = x²}.'],
  [60.3, 64.3, 'Stessi {mx:x}: {my:y} uguale\na 1, 4, 16.'],
  [64.5, 69.9, '{mx:x} raddoppia e {my:y} diventa\n{g:quattro volte} tanto: {mink:2² = 4}.'],
  [70.1, 76.1, 'Il rapporto {mink:y : x²} resta 1: è la\n{v:proporzionalità quadratica}.'],
  [76.3, 80.1, 'Il grafico è un ramo di {g:parabola}.'],
  [80.3, 85.9, 'Al posto di 3, 12 e 1 può esserci\nun numero {mink:k} qualunque, non 0.'],
  // chiusura
  [FINE + 2.2, DUR - 2.6, 'Stessa tabella, tre leggi:\ndoppio, metà, quadruplo.'],
];

// ---------- le tre schede ----------
const CX = [395, 960, 1525], CW = 530, XS = [1, 2, 4];
const YF = 163, YX = 315, YY = 380, YK = 500, UX = 84, UY = 11.9, OY = 750;
const KGEN = 80.5;   // la legge diventa generale: 3, 12 e 1 lasciano il posto a k
// ogni legge: funzione, valori, formula, formula generale, costante, freccia della y, istanti
const LEGGI = [
  { f: x => 3 * x, ys: ['3', '6', '12'], formula: ['{my:y}{mink: = 3}{mx:x}'], gen: ['{my:y}{mink: = }{mv:k}{mx:x}{dim:,   }{mv:k}{mink: = 3}'],
    cost: '{dim:rapporto }{my:y}{mink: : }{mx:x}{mink: = 3}', freccia: '·2', a: 0, b: 4.4,
    t: { card: 7.6, form: 8.2, xr: 12.3, yv: 13.6, xa: 17.5, ya: 18.5, cost: 21.9, assi: 27.0, curva: 27.4 } },
  { f: x => 12 / x, ys: ['12', '6', '3'], formula: ['{my:y}{mink: = }', { num: '{mink:12}', den: '{mx:x}' }],
    gen: ['{my:y}{mink: = }', { num: '{mv:k}', den: '{mx:x}' }, '{dim:,   }{mv:k}{mink: = 12}'],
    cost: '{dim:prodotto }{mx:x}{mink: · }{my:y}{mink: = 12}', freccia: ':2', a: .74, b: 4.4,
    t: { card: 31.9, form: 32.3, xr: 36.3, yv: 37.6, xa: 40.9, ya: 41.9, cost: 45.3, assi: 50.5, curva: 50.9 } },
  { f: x => x * x, ys: ['1', '4', '16'], formula: ['{my:y}{mink: = }{mx:x²}'], gen: ['{my:y}{mink: = }{mv:k}{mx:x²}{dim:,   }{mv:k}{mink: = 1}'],
    cost: '{dim:rapporto }{my:y}{mink: : }{mx:x²}{mink: = 1}', freccia: '·4', a: 0, b: 4.03,
    t: { card: 56.1, form: 56.5, xr: 60.5, yv: 61.6, xa: 64.7, ya: 65.8, cost: 70.3, assi: 76.5, curva: 76.9 } },
];
// colonne della tabella
const col = (cx, i) => cx - 85 + 130 * i;
// un arco con la punta da una colonna all'altra, sopra (su = 1) o sotto (su = −1), con l'etichetta
function arco(ctx, xa, xb, y, su, etich, k) {
  if (k <= 0) return;
  const xm = (xa + xb) / 2, h = 16 * su;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xa + 20, y); ctx.quadraticCurveTo(xm, y - 2 * h, xb - 24, y); ctx.stroke();
  arrowHead(ctx, [xb - 20, y + 2 * su], su > 0 ? Math.PI * .22 : -Math.PI * .22, C.g, .8);
  txt(ctx, etich, xm, y - 2 * h - 12 * su, { size: 32, weight: 600, color: C.g });
  ctx.restore();
}
function assi(ctx, cx, k) {
  if (k <= 0) return;
  const ox = cx - 190;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= 4; i++) { const x = ox + i * UX; ctx.beginPath(); ctx.moveTo(x, OY); ctx.lineTo(x, OY - 16 * UY * k); ctx.stroke(); }
  for (let j = 4; j <= 16; j += 4) { const y = OY - j * UY; ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(ox + 4.3 * UX * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox - 6, OY); ctx.lineTo(ox + 4.5 * UX * k, OY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, OY + 6); ctx.lineTo(ox, OY - 16.7 * UY * k); ctx.stroke();
  arrowHead(ctx, [ox + 4.5 * UX * k + 6, OY], 0, C.ink);
  arrowHead(ctx, [ox, OY - 16.7 * UY * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  for (let i = 1; i <= 4; i++) txt(ctx, String(i), ox + i * UX, OY + 28, { size: 30, color: C.dim });
  for (let j = 4; j <= 16; j += 4) txt(ctx, String(j), ox - 14, OY - j * UY, { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', ox + 4.5 * UX + 34, OY, { size: 42 });
  drawRich(ctx, '{my:y}', ox + 30, OY - 16.7 * UY - 10, { size: 42 });
  ctx.restore();
}
function scheda(ctx, L, cx, t) {
  const T = L.t;
  const al = 1 - P(t, FINE - .6, FINE);
  if (t < T.card || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, cx - CW / 2, 110, CW, 690, P(t, T.card, T.card + .6));
  // la formula: quella del caso, poi la generale con k
  const kg = P(t, KGEN, KGEN + .8, E.lin);
  drawSeq(ctx, L.formula, cx, YF, 46, { local: t - T.form, alpha: 1 - P(kg, 0, .5) });
  drawSeq(ctx, L.gen, cx, YF, 40, { alpha: P(kg, .5, 1) });
  // la tabella
  const kx = P(t, T.xr, T.xr + .4);
  drawRich(ctx, '{mx:x}', cx - 205, YX, { size: 46, alpha: kx });
  drawRich(ctx, '{my:y}', cx - 205, YY, { size: 46, alpha: P(t, T.yv - .3, T.yv) });
  XS.forEach((x, i) => {
    txt(ctx, String(x), col(cx, i), YX, { size: 46, weight: 600, color: C.x, alpha: P(t, T.xr + .15 * i, T.xr + .15 * i + .4) });
    txt(ctx, L.ys[i], col(cx, i), YY, { size: 46, weight: 600, color: C.y, alpha: P(t, T.yv + .4 * i, T.yv + .4 * i + .4) });
  });
  ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= kx;
  ctx.beginPath(); ctx.moveTo(cx - 165, YX - 36); ctx.lineTo(cx - 165, YY + 34); ctx.stroke(); ctx.restore();
  // le frecce: x raddoppia (sopra), y fa la sua parte (sotto)
  for (let i = 0; i < 2; i++) {
    arco(ctx, col(cx, i), col(cx, i + 1), YX - 30, 1, '·2', P(t, T.xa + .3 * i, T.xa + .3 * i + .4));
    arco(ctx, col(cx, i), col(cx, i + 1), YY + 30, -1, L.freccia, P(t, T.ya + .3 * i, T.ya + .3 * i + .4));
  }
  // la costante
  drawRich(ctx, L.cost, cx, YK, { size: 40, local: t - T.cost });
  // il grafico
  assi(ctx, cx, P(t, T.assi, T.assi + .8));
  const ox = cx - 190, toS = (x, y) => [ox + x * UX, OY - y * UY];
  const pts = []; for (let i = 0; i <= 160; i++) { const x = L.a + (L.b - L.a) * i / 160; pts.push(toS(x, L.f(x))); }
  glowStroke(ctx, pts, P(t, T.curva, T.curva + 1.2), C.y, 5);
  XS.forEach((x, i) => dot(ctx, toS(x, L.f(x)), C.y, P(t, T.curva + 1.0 + .15 * i, T.curva + 1.4 + .15 * i, E.back), 9));
  ctx.restore();
}
function sceneSchede(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  LEGGI.forEach((L, i) => scheda(ctx, L, CX[i], t));
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Doppio, metà, quadruplo', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Se {mx:x} raddoppia, {my:y} {g:raddoppia}, si {g:dimezza}\no {g:quadruplica}: diretta, inversa, quadratica.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [
    [490, '{dim:diretta}', ['{my:y}{mink: = }{mv:k}{mx:x}']],
    [960, '{dim:inversa}', ['{my:y}{mink: = }', { num: '{mv:k}', den: '{mx:x}' }]],
    [1430, '{dim:quadratica}', ['{my:y}{mink: = }{mv:k}{mx:x²}']],
  ];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 474, { size: 32 });
    drawSeq(ctx, corpo, x, i === 1 ? 540 : 546, i === 1 ? 40 : 44);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
  ];
  LEGGI.forEach((L, j) => {
    const T = L.t, ys = L.ys.map(Number), alto = v => Math.min(1, v / 16);
    SUONI.push(['soffio', T.card], ['pop', T.form, .5],                                     // la scheda, la legge
      ['pop', T.xr, .4], ['pop', T.yv, alto(ys[0])], ['pop', T.yv + .4, alto(ys[1])], ['pop', T.yv + .8, alto(ys[2])],   // la tabella
      ['traccia', T.xa, T.xa + .7], ['traccia', T.ya, T.ya + .7],                          // le frecce
      ['pop', T.cost, .6], ['traccia', T.assi, T.assi + .8],                               // la costante, gli assi
      ['tono', T.curva, T.curva + 1.2, [0, .25, .5, .75, 1].map(u => alto(L.f(L.a + (L.b - L.a) * u)))]);   // la curva
  });
  SUONI.push(['tono', KGEN, KGEN + .8, [.4, .6]],                                           // 3, 12, 1 diventano k
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7]);
  return {
    titolo: 'Doppio, metà, quadruplo', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 31.7, 'proporzionalità diretta'], [31.7, 55.9, 'proporzionalità inversa'], [55.9, FINE, 'proporzionalità quadratica']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSchede(ctx, t); sceneFine(ctx, t); },
  };
});
