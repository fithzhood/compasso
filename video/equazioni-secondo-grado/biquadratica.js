'use strict';
/* Quattro soluzioni da una seconda — x⁴ − 5x² + 4 = 0 con t = x² diventa t² − 5t + 4 = 0: t = 1 e t = 4, cioè
   x = ±1 e x = ±2, i quattro punti in cui il grafico a W taglia l'asse x; con x⁴ + 3x² − 4 = 0 viene t = −4,
   e x² = −4 non ha soluzioni: restano x = ±1. Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/biquadratica', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, arrowHead, card } = M;

const FINE = 85.9, DUR = 97.3;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [18.3, 'pensa'], [20.4, 'neutro'], [26.6, 'sorpreso'], [28.7, 'neutro'], [33.3, 'felice'], [35.4, 'neutro'],
  [53.6, 'festa'], [55.9, 'neutro'], [74.4, 'sorpreso'], [76.5, 'neutro'], [80.6, 'felice'], [82.7, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.9, 'Come si risolve un’equazione\ncon {mink:x⁴} e {mink:x²}?'],
  // 1 · il cambio di incognita
  [7.9, 12.1, 'Prendo {mink:x⁴ − 5x² + 4 = 0}\ne il grafico di {my:y = x⁴ − 5x² + 4}.'],
  [12.3, 17.9, 'Ha solo {mink:x⁴}, {mink:x²} e un numero:\nsi chiama {v:biquadratica}.'],
  [18.1, 22.6, 'Il trucco: {mink:x⁴} è il quadrato di {mink:x²},\ncioè {mink:x⁴ = (x²)²}.'],
  [22.8, 26.0, 'Chiamo {mv:t} il numero {mink:x²}:\n{mv:t}{mink: = x²}.'],
  [26.2, 31.8, 'L’equazione diventa {mv:t²}{mink: − 5}{mv:t}{mink: + 4 = 0}:\ndi {g:secondo grado}!'],
  [32.0, 37.0, '{mink:Δ = 25 − 16 = 9}: la formula dà\n{mv:t₁}{mink: = 1} e {mv:t₂}{mink: = 4}.'],
  // 2 · si torna a x
  [37.4, 42.4, 'Ma l’incognita è {mx:x}: torno indietro\ncon {mink:x² = }{mv:t}.'],
  [42.6, 48.8, '{mink:x² = 1}: due soluzioni opposte,\n{mink:x = ±1}, cioè 1 e −1.'],
  [49.0, 53.2, '{mink:x² = 4}: altre due,\n{mink:x = ±2}.'],
  [53.4, 58.2, 'Quattro soluzioni: il grafico taglia\nl’asse {mx:x} in {g:quattro} punti.'],
  // 3 · e se t è negativo?
  [58.6, 63.6, 'Ora {mink:x⁴ + 3x² − 4 = 0}.'],
  [63.8, 69.8, 'Con {mv:t}{mink: = x²}: {mv:t²}{mink: + 3}{mv:t}{mink: − 4 = 0},\nquindi {mv:t₁}{mink: = 1} e {mv:t₂}{mink: = −4}.'],
  [70.0, 74.0, '{mink:x² = 1} dà ancora {mink:x = ±1}.'],
  [74.2, 80.2, 'Ma {mink:x² = −4} non ha soluzioni:\n{r:nessun quadrato} è negativo.'],
  [80.4, 85.0, 'Restano {g:due} soluzioni: il grafico\ntaglia l’asse {mx:x} due volte.'],
  // chiusura
  [87.9, 94.5, 'Con {mv:t}{mink: = x²} diventa di secondo grado;\nogni {mv:t} positivo dà due soluzioni.'],
];

// ---------- il piano ----------
const f1 = x => x ** 4 - 5 * x * x + 4, f2 = x => x ** 4 + 3 * x * x - 4;
const CARD = [130, 110, 760, 690];
// piano con due scale (x più larga di y): la W ha bisogno di altezza, i numeri delle soluzioni di spazio in orizzontale
const PL = { ox: 510, oy: 480, ux: 100, uy: 66, x0: -3.3, x1: 3.3, y0: -4.5, y1: 4.8 };
PL.toS = (x, y) => [PL.ox + x * PL.ux, PL.oy - y * PL.uy];
PL.curve = (f, a, b, n) => { const pts = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push(PL.toS(x, f(x))); } return pts; };
const CAMBIO = [58.8, 60.0];   // la prima curva lascia il posto alla seconda
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, ux, uy, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * ux; ctx.beginPath(); ctx.moveTo(x, oy - y1 * uy * k); ctx.lineTo(x, oy - y0 * uy * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * uy; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, y); ctx.lineTo(ox + x1 * ux * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * ux * k, oy); ctx.lineTo(ox + (x1 + .15) * ux * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * uy * k); ctx.lineTo(ox, oy - (y1 + .2) * uy * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * ux * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * uy * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * ux + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * uy - 8, { size: 44 });
  // i numeri: solo dove le curve non passano (±1 e ±2 li scrivono le soluzioni, in verde)
  // sull'asse y solo 2 e −2: il 4 starebbe sulla prima curva, il −4 sulla seconda; sull'asse x anche le soluzioni, in verde
  for (const i of [-3, 3]) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * ux, oy + 34, { size: 30, color: C.dim });
  for (const j of [-2, 2]) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 18, oy - j * uy, { size: 30, color: C.dim, align: 'right' });
  ctx.restore();
}
// una soluzione: il punto sull'asse e il suo numero verde, dalla parte dove la curva non passa
function soluzione(ctx, x, k, pulse, lx1) {
  if (k <= 0) return;
  const s = 1 + .35 * Math.sin(Math.PI * pulse);
  dot(ctx, PL.toS(x, 0), C.g, k * s, 11);
  const lx = Math.abs(x) === 1 ? x * (lx1 || .6) : x * 1.225, p = PL.toS(lx, -.62);
  txt(ctx, (x < 0 ? '−' : '') + Math.abs(x), p[0], p[1], { size: 44, weight: 600, color: C.g, alpha: Math.min(1, k) });
}
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // le curve, ritagliate nel riquadro del piano
  const kc = P(t, 8.4, 10.0), w2 = P(t, CAMBIO[0], CAMBIO[1]);
  ctx.save(); ctx.beginPath(); ctx.rect(CARD[0] + 8, PL.toS(0, PL.y1)[1], CARD[2] - 16, PL.toS(0, PL.y0)[1] - PL.toS(0, PL.y1)[1]); ctx.clip();
  if (w2 < 1) { ctx.save(); ctx.globalAlpha *= 1 - w2; glowStroke(ctx, PL.curve(f1, -2.45, 2.45, 400), kc, C.y); ctx.restore(); }
  if (w2 > 0) { ctx.save(); ctx.globalAlpha *= w2; glowStroke(ctx, PL.curve(f2, -1.5, 1.5, 300), 1, C.y); ctx.restore(); }
  ctx.restore();
  // le soluzioni della prima equazione
  const via1 = 1 - P(t, CAMBIO[0], CAMBIO[0] + .4), p1 = P(t, 53.6, 54.4);
  soluzione(ctx, -1, P(t, 43.2, 43.6, E.back) * via1, p1);
  soluzione(ctx, 1, P(t, 43.4, 43.8, E.back) * via1, p1);
  soluzione(ctx, -2, P(t, 49.6, 50.0, E.back) * via1, p1);
  soluzione(ctx, 2, P(t, 49.8, 50.2, E.back) * via1, p1);
  // le soluzioni della seconda
  const p2 = P(t, 80.6, 81.4);
  soluzione(ctx, -1, P(t, 70.6, 71.0, E.back), p2, .45);   // la seconda curva è più ripida: il numero sta più vicino all'asse
  soluzione(ctx, 1, P(t, 70.8, 71.2, E.back), p2, .45);
  ctx.restore();
}

// ---------- la scheda a destra ----------
// le formule stanno un po’ a sinistra del centro: a destra ci sono le etichette «biquadratica» e «secondo grado»
const PAN = [930, 110, 920, 690], XH = PAN[0] + PAN[2] / 2, XC = XH - 70, XT = PAN[0] + PAN[2] - 40;
function linea(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
// «sinistra ⇒ destra» con la freccia sempre nello stesso punto, così le righe si incolonnano
const XF = XC - 40;
function implica(ctx, sx, dx, y, local) {
  drawRich(ctx, sx, XF - 62, y, { size: 46, align: 'right', local });
  drawRich(ctx, '{mink:⇒}', XF, y, { size: 46, local: local - .1 });
  drawRich(ctx, dx, XF + 62, y, { size: 46, align: 'left', local: local - .2 });
}
const T = (s1, n, s2) => '{mv:t' + s1 + '}' + (n ? '{mink:' + n + '}' : '') + (s2 || '');
function sceneScheda(ctx, t) {
  const al = life(t, 8.0, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  // 1 · x⁴ − 5x² + 4 = 0
  const a1 = 1 - P(t, CAMBIO[0] - .2, CAMBIO[0] + .2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    drawRich(ctx, '{dim:il grafico di }{my:y = x⁴ − 5x² + 4}', XH, 160, { size: 40, local: t - 8.6 });
    linea(ctx, 205, P(t, 8.6, 9.0));
    drawRich(ctx, '{mink:x⁴ − 5x² + 4 = 0}', XC, 255, { size: 50, local: t - 8.2 });
    txt(ctx, 'biquadratica', XT, 255, { size: 32, weight: 600, color: C.v, align: 'right', alpha: P(t, 12.5, 12.9) });
    drawRich(ctx, '{mink:x⁴ = (x²)²}', XC, 322, { size: 46, local: t - 18.3 });
    drawRich(ctx, T('', ' = x²'), XC, 390, { size: 46, local: t - 23.0 });
    drawRich(ctx, T('²', ' − 5') + T('', ' + 4 = 0'), XC, 458, { size: 50, local: t - 26.4 });
    txt(ctx, 'secondo grado', XT, 458, { size: 32, weight: 600, color: C.g, align: 'right', alpha: P(t, 26.9, 27.3) });
    drawRich(ctx, '{mink:Δ = 25 − 16 = 9}', XC, 524, { size: 44, local: t - 32.2 });
    drawRich(ctx, T('₁', ' = 1,   ') + T('₂', ' = 4'), XC, 590, { size: 46, local: t - 33.1 });
    linea(ctx, 632, P(t, 37.6, 38.0));
    implica(ctx, '{mink:x² = 1}', '{mg:x = ±1}', 686, t - 42.8);
    implica(ctx, '{mink:x² = 4}', '{mg:x = ±2}', 752, t - 49.2);
    ctx.restore();
  }
  // 3 · x⁴ + 3x² − 4 = 0
  if (t > CAMBIO[0]) {
    drawRich(ctx, '{dim:il grafico di }{my:y = x⁴ + 3x² − 4}', XH, 160, { size: 40, local: t - 59.0 });
    linea(ctx, 205, P(t, 59.0, 59.4));
    drawRich(ctx, '{mink:x⁴ + 3x² − 4 = 0}', XC, 255, { size: 50, local: t - 59.0 });
    drawRich(ctx, T('', ' = x²'), XC, 322, { size: 46, local: t - 64.0 });
    drawRich(ctx, T('²', ' + 3') + T('', ' − 4 = 0'), XC, 390, { size: 50, local: t - 64.6 });
    drawRich(ctx, T('₁', ' = 1,   ') + T('₂', ' = −4'), XC, 458, { size: 46, local: t - 65.6 });
    linea(ctx, 505, P(t, 70.1, 70.5));
    implica(ctx, '{mink:x² = 1}', '{mg:x = ±1}', 565, t - 70.2);
    implica(ctx, '{mink:x² = −4}', '{r:nessuna soluzione}', 640, t - 74.4);
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quattro soluzioni\nda una seconda', W / 2, 200, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Con {mv:t}{mink: = x²} un’equazione biquadratica\ndiventa di {g:secondo grado}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{dim:il cambio di incognita}', T('', ' = x²')], [960, T('', ' > 0'), '{g:due soluzioni opposte}'], [1430, T('', ' < 0'), '{r:nessuna soluzione}']];
  pills.forEach(([x, a, b], i) => {
    const t0 = FINE + 2.2 + i * .5, k = P(t, t0, t0 + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    if (i === 0) { drawRich(ctx, a, x, 486, { size: 32 }); drawRich(ctx, b, x, 546, { size: 48 }); }
    else { drawRich(ctx, a, x, 486, { size: 48 }); drawRich(ctx, b, x, 548, { size: 32, weight: 600 }); }
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza della W mentre si disegna
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7], ['pop', 8.2, .5],                          // il piano, l'equazione
    ['tono', 8.4, 10.0, [1, .25, .05, .25, .45, .25, .05, .25, 1]],                     // la W: giù, su, giù, su
    ['pop', 12.5, .55],                                                                 // biquadratica
    ['pop', 18.3, .5], ['pop', 23.0, .6],                                               // x⁴ = (x²)², t = x²
    ['ding', 26.5],                                                                     // t² − 5t + 4 = 0
    ['pop', 32.2, .5], ['pop', 33.1, .65],                                              // Δ, t₁ e t₂
    ['traccia', 37.6, 38.0],
    ['pop', 42.8, .5], ['pop', 43.2, .4], ['pop', 43.4, .45],                           // x = ±1
    ['pop', 49.2, .55], ['pop', 49.6, .35], ['pop', 49.8, .4],                          // x = ±2
    ['soffio', 58.8], ['tono', 58.8, 60.0, [.5, .3]],                                   // la seconda equazione: la curva scende
    ['pop', 64.0, .5], ['pop', 64.6, .55], ['pop', 65.6, .6],                           // t = x², t² + 3t − 4 = 0, t₁ e t₂
    ['pop', 70.2, .5], ['pop', 70.6, .4], ['pop', 70.8, .45],                           // x = ±1
    ['pop', 74.4, .15],                                                                 // x² = −4: nessuna soluzione
    ['ding', 80.7],                                                                     // due soluzioni
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Quattro soluzioni da una seconda', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 37.2, 'il cambio di incognita'], [37.2, 58.4, 'si torna a {mink:x}'], [58.4, FINE, 'e se {mink:t} è negativo?']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
