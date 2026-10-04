'use strict';
/* Seno e coseno — il punto P della circonferenza goniometrica associato ad α: il coseno è la sua ascissa,
   il seno la sua ordinata; nei quadranti (contati in senso antiorario) cambiano i segni.
   La relazione sin² α + cos² α = 1 sta in relazione-fondamentale.js. Argomento: funzioni-goniometriche. */
CVIDEO.registra('funzioni-goniometriche/seno-coseno', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, fixedNum, fmtN, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 71.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [11.8, 'felice'], [14.0, 'neutro'],
  [24.8, 'felice'], [27.0, 'neutro'], [36.9, 'felice'], [39.2, 'neutro'], [53.2, 'sorpreso'], [55.4, 'neutro'],
  [60.4, 'sorpreso'], [62.6, 'neutro'], [FINE + 1.0, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; il punto gira solo nel fumetto 4, fra il 10 e l'11 e fra l'11 e il 12
const FUMETTI = [
  [2.0, 6.5, 'Che cosa sono il seno e il coseno\ndi un angolo qualunque?'],
  // 1 · la circonferenza goniometrica
  [7.9, 11.6, 'Una circonferenza con il centro\nnell’origine degli assi…'],
  [11.8, 15.8, '…e il raggio lungo 1: è la\n{v:circonferenza goniometrica}.'],
  [16.0, 20.0, 'Gli angoli partono dal semiasse\npositivo delle {mx:x}.'],
  [20.2, 24.6, 'Giro il raggio in senso {v:antiorario}\ndi un angolo {mv:α} (alfa)…'],
  [24.8, 28.3, '…e arrivo al punto {mink:P}.'],
  // 2 · coseno e seno
  [28.5, 32.5, 'L’{x:ascissa} di {mink:P} si chiama\n{x:coseno} di {mv:α}: {mx:cos α}.'],
  [32.7, 36.7, 'L’{y:ordinata} di {mink:P} si chiama\n{y:seno} di {mv:α}: {my:sin α}.'],
  [36.9, 41.4, 'Quindi {mink:P = (}{mx:cos α}{mink:; }{my:sin α}{mink:)}:\nil coseno viene prima, come la {mx:x}.'],
  [41.6, 46.1, 'I {v:quadranti} si contano in senso\nantiorario, partendo da quello…'],
  [46.3, 50.3, '…in alto a destra, il {v:primo}:\n{mx:x} e {my:y} positive.'],
  [53.2, 57.7, 'Nel secondo, {mink:P} va a sinistra: coseno\n{r:negativo}; il seno resta {g:positivo}.'],
  [60.4, 64.9, 'Nel terzo, {r:negativi} tutti e due:\n{mink:P} sta in basso a sinistra.'],
  [67.2, 71.2, 'Nel quarto, in basso a destra:\ncoseno {g:positivo}, seno {r:negativo}.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Coseno ascissa, seno ordinata:\ni loro segni li decide il quadrante.'],
];

// il piano: O al centro della circonferenza goniometrica, U pixel per unità (stessa unità sui due assi)
const O = [560, 455], U = 240;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const CARD = [130, 110, 900, 690];
const RAD = Math.PI / 180;
// l'angolo α in gradi: gira solo in questi tratti
const ANG = [[20.8, 0], [23.4, 60], [50.5, 60], [53.0, 150], [57.9, 150], [60.2, 240], [64.9, 240], [67.0, 300]];
const MOV = [[20.8, 23.4], [50.5, 53.0], [57.9, 60.2], [64.9, 67.0]];
// i quattro quadranti, scritti negli angoli della scheda (lontano da tutto ciò che si muove);
// ognuno si colora mentre Ada ne parla
// sotto il nome, i segni delle coordinate (cos α; sin α), da quando Ada ne parla
const QUAD = [['primo', 900, 160, 46.3, 50.3, '(+; +)'], ['secondo', 225, 160, 53.2, 57.7, '(−; +)'],
  ['terzo', 225, 718, 60.4, 64.9, '(−; −)'], ['quarto', 900, 718, 67.2, 71.2, '(+; −)']];
const alfa = t => kf(t, ANG);
// mentre il punto gira le etichette che lo seguono si spengono: le linee tratteggiate le attraverserebbero
const fermo = t => 1 - Math.max(...MOV.map(([a, b]) => life(t, a - .3, b + .3, .3, .3)));
function linea(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// numeri degli assi, pieni su un fondino, fuori dalla circonferenza (lì non passa niente che si muove)
function numero(ctx, s, p, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.roundRect(p[0] - 26, p[1] - 21, 52, 42, 9); ctx.fill();
  txt(ctx, s, p[0], p[1], { size: 34, color: C.dim });
  ctx.restore();
}
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S(-1.42 * k, 0)); ctx.lineTo(...S(1.55 * k, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S(0, -1.3 * k)); ctx.lineTo(...S(0, 1.26 * k)); ctx.stroke();
  arrowHead(ctx, [S(1.55 * k, 0)[0] + 6, O[1]], 0, C.ink);
  arrowHead(ctx, [O[0], S(0, 1.26 * k)[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', S(1.55, 0)[0] + 40, O[1], { size: 44 });
  drawRich(ctx, '{my:y}', O[0] + 34, S(0, 1.26)[1] + 6, { size: 44 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Seno e coseno', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano con la circonferenza, il punto P e le sue coordinate (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // la circonferenza di raggio 1
  const kc = P(t, 7.9, 9.0, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, -2 * Math.PI * kc, true); ctx.stroke(); ctx.restore();
  }
  // le tacche e i numeri ±1
  const kn = P(t, 12.0, 12.5);
  if (kn > 0) {
    ctx.save(); ctx.globalAlpha *= kn; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    [[1, 0], [-1, 0]].forEach(([x]) => { ctx.beginPath(); ctx.moveTo(S(x, 0)[0], O[1] - 9); ctx.lineTo(S(x, 0)[0], O[1] + 9); ctx.stroke(); });
    [1, -1].forEach(y => { ctx.beginPath(); ctx.moveTo(O[0] - 9, S(0, y)[1]); ctx.lineTo(O[0] + 9, S(0, y)[1]); ctx.stroke(); });
    ctx.restore();
    numero(ctx, '1', S(1.1, -.11), kn); numero(ctx, '−1', S(-1.13, -.11), kn);
    numero(ctx, '1', S(-.11, 1.1), kn); numero(ctx, '−1', S(-.14, -1.1), kn);
  }

  const a = alfa(t) * RAD, c = Math.cos(a), s = Math.sin(a), Pp = S(c, s), H = S(c, 0), Y = S(0, s);
  const ferma = fermo(t);
  // i quadranti
  const kq = P(t, 41.8, 42.4) * (1 - P(t, FINE - .6, FINE));
  if (kq > 0) QUAD.forEach(([nome, x, y, a1, b1, segni]) => {
    const on = life(t, a1, b1, .3, .3);
    txt(ctx, nome, x, y, { size: 34, color: on > .5 ? C.v : C.dim, weight: on > .5 ? 600 : 500, alpha: kq });
    txt(ctx, segni, x, y + 40, { size: 34, color: on > .5 ? C.v : C.dim, weight: on > .5 ? 600 : 500, alpha: kq * P(t, a1 + .3, a1 + .7) });
  });
  // l'angolo α: l'arco al centro, sempre (il valore della scheda deve vedersi sul disegno).
  // Il nome sta a metà dell'arco; oltre i 100° va vicino all'inizio, dove le altre etichette non arrivano
  const ka = life(t, 20.4, FINE, .4, .4);
  if (ka > 0 && a > .01) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(O[0], O[1], .2 * U, 0, -a, true); ctx.stroke(); ctx.restore();
    const am = a <= 100 * RAD ? a / 2 : 18 * RAD, rm = a <= 100 * RAD ? .33 : .31;
    drawRich(ctx, '{mv:α}', ...S(rm * Math.cos(am), rm * Math.sin(am)), { size: 44, alpha: ka * P(t, 22.6, 23.0) * ferma });
  }
  // le proiezioni e le due coordinate: coseno sull'asse x, seno sull'asse y
  const kdx = P(t, 28.7, 29.2), kcx = P(t, 29.2, 29.7), kdy = P(t, 32.9, 33.4), ksy = P(t, 33.4, 33.9);
  dashed(ctx, Pp, H, C.x, kdx, .9);
  dashed(ctx, Pp, Y, C.y, kdy, .9);
  if (kcx > 0) glowStroke(ctx, [O, S(c * kcx, 0)], 1, C.x, 8);
  if (ksy > 0) glowStroke(ctx, [O, S(0, s * ksy)], 1, C.y, 8);
  // il raggio OP e il punto
  const kr = P(t, 12.0, 12.5);
  if (kr > 0) linea(ctx, O, Pp, C.ink, 5, kr);
  // il semiasse positivo delle x, da dove partono gli angoli
  const ks = life(t, 16.2, 20.3, .6, .5);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; glowStroke(ctx, [O, S(1.45, 0)], 1, C.v, 8); ctx.restore(); }
  dot(ctx, O, C.ink, P(t, 8.0, 8.3, E.back), 8);
  dot(ctx, Pp, C.v, P(t, 24.9, 25.3, E.back), 12);
  // le etichette che seguono il punto: dalla parte opposta a P, così le linee non le toccano
  const lP = P(t, 25.0, 25.4) * ferma;
  if (lP > 0) drawRich(ctx, '{mink:P}', ...S(1.16 * c, 1.16 * s), { size: 44, alpha: lP });
  const lc = P(t, 29.6, 30.0) * ferma;
  if (lc > 0) drawRich(ctx, '{mx:cos α}', ...S(s < 0 && c < 0 ? -.36 : c / 2, s >= 0 ? -.13 : .3 + .02 * (c > 0)), { size: 40, alpha: lc });
  const ls = P(t, 33.8, 34.2) * ferma;
  // il seno: a metà del segmento, o più in alto quando è corto (vicino all'inizio dell'arco c'è il nome di α)
  if (ls > 0) drawRich(ctx, '{my:sin α}', ...S(c >= 0 ? -.25 : .27, Math.abs(s) < .65 ? .75 * s : s / 2), { size: 40, alpha: ls });
  ctx.restore();
}

// la scheda a destra: α e le coordinate di P
const XS = 1465, XL = 1290, XR = 1650;
function riga(ctx, label, val, y, col, al, xr = XR) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, XL, y, { size: 46, align: 'left' });
  fixedNum(ctx, val, xr, y, 48, col);
  ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 20.2 || t > FINE + .2) return;
  const la = P(t, 20.2, 20.8) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1110, 120, 710, 680, la);
  ctx.save(); ctx.globalAlpha *= la;
  const g = Math.round(alfa(t)), a = g * RAD;   // i numeri vengono dall'angolo mostrato
  const c = Math.abs(Math.cos(a)) < 1e-9 ? 0 : Math.cos(a), s = Math.abs(Math.sin(a)) < 1e-9 ? 0 : Math.sin(a);
  // i gradi: cifre a larghezza fissa e il segno ° attaccato all'ultima
  const kg = P(t, 20.5, 20.9);
  // il ° si attacca al bordo vero dell'ultima cifra (le cifre stanno in caselle larghe 0,62 · 48)
  riga(ctx, '{mv:α}{ink: =}', String(g), 330, C.v, kg, XR - 22);
  ctx.save(); ctx.font = '500 48px ' + 'Lexend, "Segoe UI", sans-serif';
  const wu = ctx.measureText(String(g).slice(-1)).width; ctx.restore();
  txt(ctx, '°', XR - 22 - (48 * .62 - wu) / 2 + 1, 330, { size: 48, color: C.v, align: 'left', alpha: kg });
  riga(ctx, '{mx:cos α}{ink: ≈}', fmtN(c, 2), 410, C.x, P(t, 29.8, 30.2));
  riga(ctx, '{my:sin α}{ink: ≈}', fmtN(s, 2), 490, C.y, P(t, 34.0, 34.4));
  // P = (cos α; sin α), in un riquadro in cima
  const kp = P(t, 37.1, 37.5);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = css(C.v, .7); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(XS - 250, 168, 500, 84, 16); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:P = (}{mx:cos α}{mink:; }{my:sin α}{mink:)}', XS, 210, { size: 48, local: t - 37.1 });
  }
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il coseno è l’ascissa di {mink:P},\nil seno è la sua ordinata.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, '{mink:P = (}{mx:cos α}{mink:; }{my:sin α}{mink:)}', 40], [960, '{x:coseno}: ascissa\n{y:seno}: ordinata', 34], [1430, 'il segno dipende\ndal quadrante', 34]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 455, 430, 130);
    drawRich(ctx, s, px, 520, { size, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Seno e coseno', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 28.4, 'la circonferenza goniometrica'], [28.4, FINE, 'coseno e seno']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
