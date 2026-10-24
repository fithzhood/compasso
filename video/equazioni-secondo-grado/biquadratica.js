'use strict';
/* Quattro soluzioni da una seconda — x⁴ − 5x² + 4 = 0 con t = x² diventa t² − 5t + 4 = 0: t = 1 e t = 4, cioè
   x = ±1 e x = ±2, i quattro punti in cui il grafico a W taglia l'asse x; con x⁴ + 3x² − 4 = 0 viene t = −4,
   e x² = −4 non ha soluzioni: restano x = ±1. Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/biquadratica', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, arrowHead, card } = M;

const FINE = 78.8, DUR = 90.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [17.4, 'pensa'], [19.5, 'neutro'], [26.8, 'sorpreso'], [28.9, 'neutro'], [32.6, 'felice'], [34.7, 'neutro'],
  [50.5, 'festa'], [52.8, 'neutro'], [68.9, 'sorpreso'], [71.0, 'neutro'], [73.7, 'felice'], [75.8, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.2, 6.4, 'Come si risolve un’equazione\ncon {mink:x⁴} e {mink:x²}?'],
  // 1 · il cambio di incognita
  [7.9, 12.3, 'Prendo {mink:x⁴ − 5x² + 4 = 0}\ne il grafico di {my:y = x⁴ − 5x² + 4}.'],
  [12.5, 17.1, 'Ha solo {mink:x⁴}, {mink:x²} e un numero:\nsi chiama {v:biquadratica}.'],
  [17.3, 21.7, 'Il trucco: {mink:x⁴} è il quadrato di {mink:x²},\ncioè {mink:x⁴ = (x²)²}.'],
  [21.9, 26.1, 'Chiamo {mv:t} il numero {mink:x²}:\n{mv:t}{mink: = x²}.'],
  [26.3, 31.1, 'L’equazione diventa {mv:t²}{mink: − 5}{mv:t}{mink: + 4 = 0}:\ndi {g:secondo grado}!'],
  [31.3, 35.9, '{mink:Δ = 25 − 16 = 9}: la formula dà\n{mv:t₁}{mink: = 1} e {mv:t₂}{mink: = 4}.'],
  // 2 · si torna a x
  [36.3, 40.7, 'Ma l’incognita è {mx:x}: torno indietro\ncon {mink:x² = }{mv:t}.'],
  [40.9, 45.7, '{mink:x² = 1}: due soluzioni opposte,\n{mink:x = ±1}, cioè 1 e −1.'],
  [45.9, 50.1, '{mink:x² = 4}: altre due,\n{mink:x = ±2}.'],
  [50.3, 54.9, 'Quattro soluzioni: il grafico taglia\nl’asse {mx:x} in {g:quattro} punti.'],
  // 3 · e se t è negativo?
  [55.3, 59.3, 'Ora {mink:x⁴ + 3x² − 4 = 0},\nsempre con {mv:t}{mink: = x²}.'],
  [59.5, 64.1, 'Diventa {mv:t²}{mink: + 3}{mv:t}{mink: − 4 = 0},\ncon {mv:t₁}{mink: = 1} e {mv:t₂}{mink: = −4}.'],
  [64.3, 68.5, '{mink:x² = 1} dà ancora {mink:x = ±1}.'],
  [68.7, 73.3, 'Ma {mink:x² = −4} non ha soluzioni:\n{r:nessun quadrato} è negativo.'],
  [73.5, 77.9, 'Restano {g:due} soluzioni: il grafico\ntaglia l’asse {mx:x} due volte.'],
  // chiusura
  [80.8, 87.4, 'Con {mv:t}{mink: = x²} diventa di secondo grado;\nogni {mv:t} positivo dà due soluzioni.'],
];

// ---------- il piano ----------
const f1 = x => x ** 4 - 5 * x * x + 4, f2 = x => x ** 4 + 3 * x * x - 4;
const CARD = [130, 110, 760, 690];
// piano con due scale (x più larga di y): la W ha bisogno di altezza, i numeri delle soluzioni di spazio in orizzontale
const PL = { ox: 510, oy: 480, ux: 100, uy: 66, x0: -3.3, x1: 3.3, y0: -4.5, y1: 4.8 };
PL.toS = (x, y) => [PL.ox + x * PL.ux, PL.oy - y * PL.uy];
PL.curve = (f, a, b, n) => { const pts = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push(PL.toS(x, f(x))); } return pts; };
const CAMBIO = [55.5, 56.7];   // la prima curva lascia il posto alla seconda
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
  // sull'asse y solo 2 e −2: il 4 starebbe sulla prima curva, il −4 sulla seconda; sull'asse x scrivono le soluzioni
  for (const j of [-2, 2]) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 18, oy - j * uy, { size: 30, color: C.dim, align: 'right' });
  ctx.restore();
}
// una soluzione: il punto sull'asse e il suo numero verde, dalla parte dove la curva non passa
function soluzione(ctx, x, k, pulse) {
  if (k <= 0) return;
  const s = 1 + .35 * Math.sin(Math.PI * pulse);
  dot(ctx, PL.toS(x, 0), C.g, k * s, 11);
  const lx = Math.abs(x) === 1 ? x * .6 : x * 1.225, p = PL.toS(lx, -.62);
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
  const via1 = 1 - P(t, CAMBIO[0], CAMBIO[0] + .4), p1 = P(t, 50.5, 51.3);
  soluzione(ctx, -1, P(t, 41.5, 41.9, E.back) * via1, p1);
  soluzione(ctx, 1, P(t, 41.7, 42.1, E.back) * via1, p1);
  soluzione(ctx, -2, P(t, 46.5, 46.9, E.back) * via1, p1);
  soluzione(ctx, 2, P(t, 46.7, 47.1, E.back) * via1, p1);
  // le soluzioni della seconda
  const p2 = P(t, 73.7, 74.5);
  soluzione(ctx, -1, P(t, 64.9, 65.3, E.back), p2);
  soluzione(ctx, 1, P(t, 65.1, 65.5, E.back), p2);
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
    txt(ctx, 'biquadratica', XT, 255, { size: 32, weight: 600, color: C.v, align: 'right', alpha: P(t, 12.7, 13.1) });
    drawRich(ctx, '{mink:x⁴ = (x²)²}', XC, 322, { size: 46, local: t - 17.5 });
    drawRich(ctx, T('', ' = x²'), XC, 390, { size: 46, local: t - 22.1 });
    drawRich(ctx, T('²', ' − 5') + T('', ' + 4 = 0'), XC, 458, { size: 50, local: t - 26.5 });
    txt(ctx, 'secondo grado', XT, 458, { size: 32, weight: 600, color: C.g, align: 'right', alpha: P(t, 27.0, 27.4) });
    drawRich(ctx, '{mink:Δ = 25 − 16 = 9}', XC, 524, { size: 44, local: t - 31.5 });
    drawRich(ctx, T('₁', ' = 1,   ') + T('₂', ' = 4'), XC, 590, { size: 46, local: t - 32.4 });
    linea(ctx, 632, P(t, 36.5, 36.9));
    drawRich(ctx, '{mink:x² = 1   ⇒   }{mg:x = ±1}', XC, 686, { size: 46, local: t - 41.1 });
    drawRich(ctx, '{mink:x² = 4   ⇒   }{mg:x = ±2}', XC, 752, { size: 46, local: t - 46.1 });
    ctx.restore();
  }
  // 3 · x⁴ + 3x² − 4 = 0
  if (t > CAMBIO[0]) {
    drawRich(ctx, '{dim:il grafico di }{my:y = x⁴ + 3x² − 4}', XH, 160, { size: 40, local: t - 55.7 });
    linea(ctx, 205, P(t, 55.7, 56.1));
    drawRich(ctx, '{mink:x⁴ + 3x² − 4 = 0}', XC, 255, { size: 50, local: t - 55.7 });
    drawRich(ctx, T('', ' = x²'), XC, 322, { size: 46, local: t - 56.6 });
    drawRich(ctx, T('²', ' + 3') + T('', ' − 4 = 0'), XC, 390, { size: 50, local: t - 59.7 });
    drawRich(ctx, T('₁', ' = 1,   ') + T('₂', ' = −4'), XC, 458, { size: 46, local: t - 60.6 });
    linea(ctx, 505, P(t, 64.4, 64.8));
    drawRich(ctx, '{mink:x² = 1   ⇒   }{mg:x = ±1}', XC, 565, { size: 46, local: t - 64.5 });
    drawRich(ctx, '{mink:x² = −4   ⇒   }{r:nessuna soluzione}', XC, 640, { size: 46, local: t - 68.9 });
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
    ['pop', 12.7, .55],                                                                 // biquadratica
    ['pop', 17.5, .5], ['pop', 22.1, .6],                                               // x⁴ = (x²)², t = x²
    ['ding', 26.6],                                                                     // t² − 5t + 4 = 0
    ['pop', 31.5, .5], ['pop', 32.4, .65],                                              // Δ, t₁ e t₂
    ['traccia', 36.5, 36.9],
    ['pop', 41.1, .5], ['pop', 41.5, .4], ['pop', 41.7, .45],                           // x = ±1
    ['pop', 46.1, .55], ['pop', 46.5, .35], ['pop', 46.7, .4],                          // x = ±2
    ['soffio', 55.5], ['tono', 55.5, 56.7, [.5, .3]],                                   // la seconda equazione: la curva scende
    ['pop', 56.6, .6], ['pop', 59.7, .5], ['pop', 60.6, .6],                            // t = x², t² + 3t − 4 = 0, t₁ e t₂
    ['pop', 64.5, .5], ['pop', 64.9, .4], ['pop', 65.1, .45],                           // x = ±1
    ['pop', 68.9, .15],                                                                 // x² = −4: nessuna soluzione
    ['ding', 73.8],                                                                     // due soluzioni
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Quattro soluzioni da una seconda', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 36.1, 'il cambio di incognita'], [36.1, 55.1, 'si torna a {mink:x}'], [55.1, FINE, 'e se {mink:t} è negativo?']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
