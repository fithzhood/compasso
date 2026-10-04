'use strict';
/* Il punto medio — le ombre dei due punti sugli assi: a metà strada c'è la media delle coordinate.
   Argomento: piano-cartesiano-retta. */
CVIDEO.registra('piano-cartesiano-retta/punto-medio', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, txt, dot, glowStroke, dashed, makePlane, card } = M;

const FINE = 45.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [19.4, 'felice'], [21.6, 'neutro'], [25.0, 'felice'], [27.2, 'neutro'],
  [30.2, 'festa'], [32.6, 'neutro'], [34.6, 'sorpreso'], [36.8, 'neutro'], [40.3, 'felice'], [42.6, 'neutro'],
  [FINE + 1.0, 'felice'], [50.0, 'occhiolino'], [52.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Dov\'è il punto di mezzo\nfra due punti?'],
  // 1 · un asse alla volta
  [7.9, 13.9, 'Ecco {mink:A(1; 1)} e {mink:B(7; 5)}.\nCerco il punto medio {mg:M}.'],
  [14.0, 18.3, 'Guardo solo le ascisse:\n{mx:1} e {mx:7}.'],
  [18.4, 23.8, 'A metà strada fra 1 e 7\nc\'è la media: {mx:4}.'],
  [23.9, 29.0, 'Con le ordinate:\nfra 1 e 5 c\'è {my:3}.'],
  [29.1, 34.2, 'Ecco {mg:M(4; 3)}: proprio\na metà del segmento {mink:AB}.'],
  // 2 · l'errore
  [34.3, 39.9, 'Attento: (7 − 1) / 2 = 3\nè metà della {r:distanza} fra 1 e 7…'],
  [40.0, 45.0, '…non il punto di mezzo.\nQui serve una {g:somma}.'],
  // chiusura
  [46.4, 52.6, 'Punto medio: la media\ndelle ascisse e delle ordinate.'],
];

// il piano: stessa unità sui due assi
const PL = makePlane({ ox: 392, oy: 660, u: 72, x0: -0.8, x1: 8.4, y0: -0.8, y1: 6.4 });
const CARD = [250, 110, 830, 690];
const A = [1, 1], B = [7, 5], MM = [4, 3];
// numero dell'asse x rifatto in colore, su un fondo di carta
function numX(ctx, x, s, col, al) {
  if (al <= 0) return;
  const p = PL.toS(x, 0);
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(p[0] - 18, p[1] + 14, 36, 38);
  txt(ctx, s, p[0], p[1] + 32, { size: 34, weight: 600, color: col }); ctx.restore();
}
function numY(ctx, y, s, col, al) {
  if (al <= 0) return;
  const p = PL.toS(0, y);
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(p[0] - 46, p[1] - 20, 32, 40);
  txt(ctx, s, p[0] - 20, p[1], { size: 34, weight: 600, color: col, align: 'right' }); ctx.restore();
}
// archetto fra due punti dello schermo, gonfio di h pixel verso (nx, ny)
function arco(ctx, a, b, h, n, col, k) {
  if (k <= 0) return;
  const m = [(a[0] + b[0]) / 2 + n[0] * h, (a[1] + b[1]) / 2 + n[1] * h], pts = [];
  for (let i = 0; i <= 30; i++) { const s = i / 30, u = 1 - s; pts.push([u * u * a[0] + 2 * u * s * m[0] + s * s * b[0], u * u * a[1] + 2 * u * s * m[1] + s * s * b[1]]); }
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.lineCap = 'round'; M.partial(ctx, pts, k); ctx.restore();
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
  conFont(TITOLI, () => drawRich(ctx, 'Il punto medio', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  const a = PL.toS(...A), b = PL.toS(...B), m = PL.toS(...MM);
  // le ombre sugli assi
  const kx = P(t, 14.3, 15.0), ky = P(t, 24.2, 24.9);
  dashed(ctx, a, PL.toS(A[0], 0), C.x, kx); dashed(ctx, b, PL.toS(B[0], 0), C.x, kx);
  dashed(ctx, a, PL.toS(0, A[1]), C.y, ky); dashed(ctx, b, PL.toS(0, B[1]), C.y, ky);
  // due metà uguali: sull'asse x sopra, sull'asse y a destra
  const ax = P(t, 18.7, 19.5);
  arco(ctx, PL.toS(1, 0), PL.toS(4, 0), 40, [0, -1], C.x, ax); arco(ctx, PL.toS(4, 0), PL.toS(7, 0), 40, [0, -1], C.x, P(t, 19.1, 19.9));
  const ay = P(t, 24.6, 25.4);
  arco(ctx, PL.toS(0, 1), PL.toS(0, 3), 28, [1, 0], C.y, ay); arco(ctx, PL.toS(0, 3), PL.toS(0, 5), 28, [1, 0], C.y, P(t, 25.0, 25.8));
  // dalle due medie al punto M
  const km = P(t, 29.3, 30.0);
  dashed(ctx, PL.toS(4, 0), m, C.g, km); dashed(ctx, PL.toS(0, 3), m, C.g, km);
  glowStroke(ctx, [a, b], P(t, 9.4, 10.2, E.out), C.v, 5);
  // le due metà del segmento, segnate uguali
  const tk = P(t, 30.6, 31.0);
  if (tk > 0) {
    const d = [-(B[1] - A[1]), B[0] - A[0]], L = Math.hypot(...d), n = [d[0] / L * .18, d[1] / L * .18];
    [[2.5, 2], [5.5, 4]].forEach(([x, y]) => {
      ctx.save(); ctx.globalAlpha *= tk; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
      const p = PL.toS(x - n[0], y - n[1]), q = PL.toS(x + n[0], y + n[1]);
      ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke(); ctx.restore();
    });
  }
  dot(ctx, a, C.ink, P(t, 8.4, 8.8, E.back), 11);
  dot(ctx, b, C.ink, P(t, 9.0, 9.4, E.back), 11);
  dot(ctx, m, C.g, P(t, 30.0, 30.4, E.back), 12);
  drawRich(ctx, '{mink:A}', PL.toS(.72, 0)[0], PL.toS(0, 1.5)[1], { size: 44, alpha: P(t, 8.6, 9.0) });
  drawRich(ctx, '{mink:B}', PL.toS(7.4, 0)[0], PL.toS(0, 5.4)[1], { size: 44, alpha: P(t, 9.2, 9.6) });
  drawRich(ctx, '{mg:M}', PL.toS(3.6, 0)[0], PL.toS(0, 3.5)[1], { size: 44, alpha: P(t, 30.2, 30.6) });
  // i numeri sugli assi, in colore quando se ne parla
  const nx = life(t, 14.8, FINE + .2, .4, .3), ny = life(t, 24.7, FINE + .2, .4, .3);
  numX(ctx, 1, '1', C.x, nx); numX(ctx, 7, '7', C.x, nx); numX(ctx, 4, '4', C.g, P(t, 19.3, 19.7));
  numY(ctx, 1, '1', C.y, ny); numY(ctx, 5, '5', C.y, ny); numY(ctx, 3, '3', C.g, P(t, 25.2, 25.6));
  // l'errore: 3 è metà della distanza fra 1 e 7, non il punto di mezzo
  const er = life(t, 34.6, 40.4, .4, .5);
  if (er > 0) { numX(ctx, 3, '3', C.r, er); dot(ctx, PL.toS(3, 0), C.r, er, 9); }
  ctx.restore();
}

// il riquadro dei conti
function scenePannello(ctx, t) {
  if (t < 9.6 || t > FINE + .3) return;
  const al = life(t, 9.8, FINE + .2, .5, .8);
  card(ctx, 1130, 130, 690, 670, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'il punto medio', 1475, 190, { size: 40, weight: 600 }));
  drawRich(ctx, '{mink:A(1; 1)      B(7; 5)}', 1475, 255, { size: 44, local: t - 10.0 });
  const rx = P(t, 19.0, 19.4), ry = P(t, 24.6, 25.0);
  // nel punto medio c'è una somma: si accende alla fine
  const sm = life(t, 40.3, 45.2, .4, .4);
  if (sm > 0) {
    ctx.save(); ctx.globalAlpha *= sm; ctx.fillStyle = css(C.g, .14);
    // centrati sul numeratore, con la stessa regola di drawSeq
    [[390, '{mink:1 + 7}', '{mink: = }{mx:4}'], [545, '{mink:1 + 5}', '{mink: = }{my:3}']].forEach(([cy, num, resto]) => {
      const wn = richW(ctx, num, 44), wf = wn + 44 * .35, tot = wf + 44 * .12 + richW(ctx, resto, 44);
      const xm = 1475 - tot / 2 + wf / 2;
      ctx.beginPath(); ctx.roundRect(xm - wn / 2 - 12, cy - 44 * .6 - 27, wn + 24, 54, 12); ctx.fill();
    });
    ctx.restore();
  }
  drawRich(ctx, '{dim:media delle ascisse}', 1475, 315, { size: 30, alpha: rx });
  if (rx > 0) drawSeq(ctx, [{ num: '{mink:1 + 7}', den: '{mink:2}' }, '{mink: = }{mx:4}'], 1475, 390, 44, { local: t - 19.0 });
  drawRich(ctx, '{dim:media delle ordinate}', 1475, 470, { size: 30, alpha: ry });
  if (ry > 0) drawSeq(ctx, [{ num: '{mink:1 + 5}', den: '{mink:2}' }, '{mink: = }{my:3}'], 1475, 545, 44, { local: t - 24.6 });
  separa(ctx, 600, P(t, 29.6, 30.0));
  drawRich(ctx, '{mg:M(4; 3)}', 1475, 646, { size: 52, local: t - 30.0 });
  const er = life(t, 34.6, 40.4, .4, .5);
  if (er > 0) {
    ctx.save(); ctx.globalAlpha *= er;
    drawSeq(ctx, [{ num: '{mr:7 − 1}', den: '{mr:2}', bar: C.r }, '{mr: = 3}'], 1320, 748, 40);
    drawRich(ctx, '{dim:metà della distanza}\n{dim:fra 1 e 7}', 1440, 748, { size: 30, align: 'left' });
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (FINE–55.6)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 53.4, 54.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il punto medio sta a metà\nsu ogni asse: è una {g:media}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'ascissa: (1 + 7) / 2 = {mx:4}'], [960, 'ordinata: (1 + 5) / 2 = {my:3}'], [1450, '{g:somma}, non {r:differenza}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 230, 450, 460, 100);
    drawRich(ctx, s, x, 502, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il punto medio', durata: 55.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 34.2, 'un asse alla volta'], [34.2, FINE, 'somma, non differenza']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
