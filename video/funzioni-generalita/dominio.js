'use strict';
/* Il dominio naturale — la macchina si blocca: divisione per zero, radice di un negativo, logaritmo di 0.
   Argomento: funzioni-generalita. */
CVIDEO.registra('funzioni-generalita/dominio', M => {
  const { W, C, E, P, life, clamp, rgb, css, mix, TITOLI, conFont, drawRich, drawSeq,
    dot, hole, machine, crossMark, runTimes, drawRunIn, drawRunOut, machineFx,
    arrowHead, glowStroke, makePlane, card } = M;
  const lum = c => { const [r, g, b] = rgb(c); return .3 * r + .59 * g + .11 * b; };
  const LU = () => lum(C.paper) > lum(C.ink) ? 'paper' : 'ink';
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [76.6, 190], [77.9, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [76.6, 1050], [77.9, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [76.6, 2.2], [77.9, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [76.6, 2], [77.9, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [76.6, -1.5], [77.9, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.5, 'pensa'], [6.4, 'neutro'],
  [14.6, 'felice'], [16.7, 'neutro'], [18.7, 'sorpreso'], [21.5, 'neutro'], [27.4, 'felice'], [29.5, 'neutro'],
  [42.3, 'felice'], [44.4, 'neutro'], [46.4, 'sorpreso'], [48.9, 'neutro'], [50.9, 'felice'], [52.9, 'neutro'],
  [60.6, 'felice'], [62.6, 'neutro'], [64.7, 'sorpreso'], [72.1, 'neutro'], [74.1, 'felice'], [76.4, 'neutro'],
  [78.8, 'felice'], [83.9, 'occhiolino'],
];
const FUMETTI = [
  [2.6, 6.3, 'Una formula accetta\n{v:qualunque} numero?'],
  // 1 · dividere per zero
  [7.9, 12.3, 'Questa macchina divide 1\nper {mx:x}{mink: − 3}.'],
  [12.4, 16.6, 'Entra {mx:5}: 1 diviso 2,\nesce {my:0,5}.'],
  [16.7, 21.4, 'Entra {mx:3}: 1 diviso {r:0}.\nLa macchina si {r:blocca}!'],
  [21.5, 26.5, 'Il denominatore deve essere\n{g:diverso da zero}: {mx:x}{mink: ≠ 3}.'],
  [26.6, 31.5, 'Sul grafico la curva c\'è,\n{r:tranne} sopra {mx:x}{mink: = 3}.'],
  [31.6, 35.8, 'Le {mx:x} accettate sono\nil {v:dominio} {mink:D}.'],
  // 2 · la radice
  [36.0, 40.1, 'Ora una radice quadrata:\n{mink:√(}{mx:x}{mink: − 2)}.'],
  [40.2, 44.6, 'Entra {mx:6}: la radice di 4,\nesce {my:2}.'],
  [44.7, 48.8, 'Entra {mx:1}: radice di {r:−1}?\n{r:Non esiste}.'],
  [48.9, 53.6, 'Il radicando deve essere {g:≥ 0}:\n{mx:x}{mink: ≥ 2}.'],
  // 3 · il logaritmo
  [54.0, 57.6, 'E un logaritmo:\n{mink:log₂ }{mx:x}.'],
  [57.7, 62.4, 'Entra {mx:8}: 2 alla 3 fa 8,\nesce {my:3}.'],
  [62.5, 67.2, 'Entra {mx:0}: 2 alla quanto fa 0?\n{r:Nessuna} potenza.'],
  [67.3, 72.0, 'Entra {mx:−2}: anche qui\n{r:nessuna} potenza di 2.'],
  [72.1, 76.4, 'L\'argomento deve essere\n{g:positivo}: {mx:x}{mink: > 0}.'],
  // chiusura
  [78.8, 83.7, 'Denominatori, radici, logaritmi:\nogni pezzo ha la sua {g:condizione}.'],
];

function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il dominio naturale', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la macchina: una per tutto il video, cambia regola a ogni caso
const MC = { cx: 540, cy: 330, w: 340 };
const OUT = [930, 330];
const RUNS = [
  { t0: 12.9, d: 1.0, inp: '5', from: [90, 330], outs: [{ label: '0,5', to: OUT, fade: 16.6 }] },
  { t0: 17.2, d: 1.1, inp: '3', from: [90, 330], outs: [], shake: 1.3, rossa: 21.5 },
  { t0: 40.6, d: 1.0, inp: '6', from: [90, 330], outs: [{ label: '2', to: OUT, fade: 44.6 }] },
  { t0: 45.0, d: 1.1, inp: '1', from: [90, 330], outs: [], shake: 1.3, rossa: 48.9 },
  { t0: 58.1, d: 1.0, inp: '8', from: [90, 330], outs: [{ label: '3', to: OUT, fade: 62.4 }] },
  { t0: 62.9, d: 1.1, inp: '0', from: [90, 330], outs: [], shake: 1.3, rossa: 67.3 },
  { t0: 67.7, d: 1.1, inp: '−2', from: [90, 330], outs: [], shake: 1.3, rossa: 72.1 },
];
function sceneMachine(ctx, t) {
  if (t < 7.5 || t > 77.0) return;
  const A = 1 - P(t, 76.4, 77.0);
  ctx.save(); ctx.globalAlpha *= A;
  for (const R of RUNS) drawRunIn(ctx, t, R, MC);
  const fx = machineFx(t, RUNS);
  let red = 0;
  for (const R of RUNS) if (R.rossa) { const T = runTimes(R); red = Math.max(red, P(t, T.b, T.b + .3) * (1 - P(t, R.rossa, R.rossa + .4))); }
  const sc = P(t, 7.6, 8.4, E.back);
  machine(ctx, MC.cx, MC.cy, { w: MC.w, h: 240, scale: sc, t, ...fx, color: mix(C.v, C.r, red) });
  // la regola sullo schermo della macchina
  if (sc > 0) {
    const sh = fx.shake, k = LU();
    ctx.save(); ctx.translate(MC.cx + Math.sin(t * 83) * 8 * sh, MC.cy + Math.cos(t * 67) * 5 * sh); ctx.scale(sc, sc);
    const a1 = 1 - P(t, 35.7, 36.1), a2 = P(t, 36.0, 36.4) * (1 - P(t, 53.7, 54.1)), a3 = P(t, 54.0, 54.4);
    if (a1 > 0) drawSeq(ctx, [{ num: `{m${k}:1}`, den: `{m${k}:x − 3}`, bar: C[k] }], 0, -30, 50, { alpha: a1 });
    drawRich(ctx, `{m${k}:√(x − 2)}`, 0, -22, { size: 52, alpha: a2 });
    drawRich(ctx, `{m${k}:log₂ x}`, 0, -22, { size: 58, alpha: a3 });
    ctx.restore();
  }
  for (const R of RUNS) drawRunOut(ctx, t, R, MC);
  // il blocco: una croce dove dovrebbe uscire il risultato
  for (const R of RUNS) if (R.rossa) {
    const T = runTimes(R);
    crossMark(ctx, OUT[0], OUT[1], P(t, T.c, T.c + .6, E.lin) * (1 - P(t, R.rossa, R.rossa + .4)), C.r, .6);
  }
  ctx.restore();
}

// la scheda del conto, sotto la macchina
const CONTI = [
  // [da, a, intestazione, disegno]
  [13.9, 16.7, 'il conto', (ctx, al, l) => drawSeq(ctx, ['{mx:5}{mink:  ↦  }', { num: '{mink:1}', den: '{mink:5 − 3}' }, '{mink: = }', { num: '{mink:1}', den: '{mink:2}' }, '{mink: = }{my:0,5}'], 560, 655, 50, { alpha: al, local: l })],
  [16.8, 21.4, 'il conto', (ctx, al, l) => {
    drawSeq(ctx, ['{mx:3}{mink:  ↦  }', { num: '{mink:1}', den: '{mink:3 − 3}' }, '{mink: = }', { num: '{mink:1}', den: '{mr:0}' }], 560, 640, 50, { alpha: al, local: l });
    drawRich(ctx, '{r:non si divide per zero}', 560, 742, { size: 34, alpha: al, local: l - 1.2 });
  }],
  [21.5, 35.7, 'la condizione', (ctx, al, l) => {
    drawRich(ctx, '{mx:x}{mink: − 3 ≠ 0}', 560, 625, { size: 56, alpha: al, local: l });
    drawRich(ctx, '{mink:⇒  }{mg:x ≠ 3}', 560, 715, { size: 56, alpha: al, local: l - 1.2 });
  }],
  [41.6, 44.7, 'il conto', (ctx, al, l) => drawRich(ctx, '{mx:6}{mink:  ↦  √(6 − 2) = √4 = }{my:2}', 560, 650, { size: 52, alpha: al, local: l })],
  [44.8, 48.8, 'il conto', (ctx, al, l) => {
    drawRich(ctx, '{mx:1}{mink:  ↦  √(1 − 2) = √(}{mr:−1}{mink:)}', 560, 630, { size: 52, alpha: al, local: l });
    drawRich(ctx, '{r:nessun quadrato è negativo}', 560, 728, { size: 34, alpha: al, local: l - 1.0 });
  }],
  [48.9, 53.7, 'la condizione', (ctx, al, l) => {
    drawRich(ctx, '{mx:x}{mink: − 2 ≥ 0}', 560, 625, { size: 56, alpha: al, local: l });
    drawRich(ctx, '{mink:⇒  }{mg:x ≥ 2}', 560, 715, { size: 56, alpha: al, local: l - 1.0 });
  }],
  [59.1, 62.5, 'il conto', (ctx, al, l) => {
    drawRich(ctx, '{mx:8}{mink:  ↦  log₂ 8 = }{my:3}', 560, 630, { size: 52, alpha: al, local: l });
    drawRich(ctx, '{dim:perché }{mink:2³ = 8}', 560, 725, { size: 36, alpha: al, local: l - .8 });
  }],
  [62.6, 67.2, 'il conto', (ctx, al, l) => {
    drawRich(ctx, '{mx:0}{mink:  ↦  log₂ 0 = }{mr:?}', 560, 630, { size: 52, alpha: al, local: l });
    drawRich(ctx, '{r:nessuna potenza di 2 fa 0}', 560, 728, { size: 34, alpha: al, local: l - 1.0 });
  }],
  [68.8, 72.0, 'il conto', (ctx, al, l) => {
    drawRich(ctx, '{mx:−2}{mink:  ↦  log₂(−2) = }{mr:?}', 560, 630, { size: 52, alpha: al, local: l });
    drawRich(ctx, '{r:2 elevato a qualunque numero è positivo}', 560, 728, { size: 32, alpha: al, local: l - 1.0 });
  }],
  [72.1, 76.5, 'la condizione', (ctx, al, l) => {
    drawRich(ctx, '{dim:l\'argomento è positivo}', 560, 625, { size: 38, alpha: al, local: l });
    drawRich(ctx, '{mg:x > 0}', 560, 712, { size: 60, alpha: al, local: l - .8 });
  }],
];
function sceneConto(ctx, t) {
  const ca = Math.max(life(t, 13.6, 35.9, .5, .5), life(t, 41.3, 53.9, .5, .5), life(t, 58.8, 76.7, .5, .5));
  if (ca <= 0) return;
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, 110, 510, 900, 270);
  for (const [a, b, testa, disegna] of CONTI) {
    const al = life(t, a, b, .35, .35);
    if (al <= 0) continue;
    conFont(TITOLI, () => drawRich(ctx, `{dim:${testa}}`, 150, 550, { size: 30, weight: 600, align: 'left', alpha: al }));
    disegna(ctx, al, t - a);
  }
  ctx.restore();
}

// il grafico, a destra: un piano solo per i tre casi
const PL = makePlane({ ox: 1202, oy: 455, u: 82, x0: -1, x1: 7, y0: -3.6, y1: 3.6 });
const F1a = PL.curve(x => 1 / (x - 3), -.7, 3 - 1 / 3.6, 120), F1b = PL.curve(x => 1 / (x - 3), 3 + 1 / 3.6, 7, 120);
const F2 = PL.curve(x => Math.sqrt(x - 2), 2, 7, 160);
const F3 = PL.curve(x => Math.log2(x), Math.pow(2, -3.6), 7, 200);
// la striscia verde del dominio sull'asse x, da a a b (con le frecce se continua)
function striscia(ctx, a, b, k, al, frecciaSx) {
  if (al <= 0 || k <= 0) return;
  const p = PL.toS(a, 0), q = PL.toS(a + (b - a) * k, 0);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(C.g, .5); ctx.lineWidth = 14; ctx.lineCap = 'butt';
  ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
  if (k >= 1) { arrowHead(ctx, [q[0] + 12, q[1]], 0, C.g, 1.1); if (frecciaSx) arrowHead(ctx, [p[0] - 12, p[1]], Math.PI, C.g, 1.1); }
  ctx.restore();
}
function sceneGrafico(ctx, t) {
  const ga = life(t, 26.6, 76.7, .5, .5);
  if (ga <= 0) return;
  ctx.save(); ctx.globalAlpha *= ga;
  card(ctx, 1060, 110, 790, 690);
  PL.axes(ctx, P(t, 26.7, 27.6));
  // 1 · 1/(x − 3)
  const g1 = life(t, 27.0, 35.9, .4, .4);
  if (g1 > 0) {
    ctx.save(); ctx.globalAlpha *= g1;
    striscia(ctx, -1, 7, P(t, 28.4, 29.4), 1, true);
    const [ax] = PL.toS(3, 0);
    ctx.save(); ctx.strokeStyle = css(C.r, .8); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
    ctx.beginPath(); ctx.moveTo(ax, PL.toS(0, 3.6)[1]); ctx.lineTo(ax, PL.toS(0, -3.6)[1]); ctx.stroke(); ctx.restore();
    glowStroke(ctx, F1a, P(t, 27.2, 28.2), C.y); glowStroke(ctx, F1b, P(t, 27.6, 28.6), C.y);
    hole(ctx, PL.toS(3, 0), C.r, P(t, 29.2, 29.6, E.back), 12);
    drawRich(ctx, '{mink:D:  }{mx:x}{mink: ≠ 3}', 1660, 690, { size: 48, local: t - 31.8 });
    ctx.restore();
  }
  // 2 · √(x − 2)
  const g2 = life(t, 49.1, 53.9, .4, .4);
  if (g2 > 0) {
    ctx.save(); ctx.globalAlpha *= g2;
    striscia(ctx, 2, 7, P(t, 50.4, 51.2), 1, false);
    glowStroke(ctx, F2, P(t, 49.3, 50.5), C.y);
    dot(ctx, PL.toS(2, 0), C.g, P(t, 50.3, 50.7, E.back), 11);
    drawRich(ctx, '{mink:D:  }{mx:x}{mink: ≥ 2}', 1660, 690, { size: 48, local: t - 51.0 });
    ctx.restore();
  }
  // 3 · log₂ x
  const g3 = life(t, 72.3, 76.7, .4, .4);
  if (g3 > 0) {
    ctx.save(); ctx.globalAlpha *= g3;
    striscia(ctx, 0, 7, P(t, 73.6, 74.4), 1, false);
    glowStroke(ctx, F3, P(t, 72.5, 73.7), C.y);
    hole(ctx, PL.toS(0, 0), C.r, P(t, 73.5, 73.9, E.back), 12);
    drawRich(ctx, '{mink:D:  }{mx:x}{mink: > 0}', 1660, 690, { size: 48, local: t - 74.2 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (76.6–78)
function sceneFine(ctx, t) {
  if (t < 76.6) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 76.9 });
    drawRich(ctx, 'Il dominio sono le {mx:x}\nper cui la formula {g:ha senso}.', W / 2, 290, { size: 70, weight: 600, local: t - 77.3, stagger: .09 });
  });
  const pills = [[490, 'frazione', '{ink:denominatore}{mink: ≠ 0}'], [960, 'radice quadrata', '{ink:radicando}{mink: ≥ 0}'], [1430, 'logaritmo', '{ink:argomento}{mink: > 0}']];
  pills.forEach(([x, testa, f], i) => {
    const a = 79.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, `{dim:${testa}}`, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, x, 545, { size: 40 });
    ctx.restore();
  });
}

  return {
    titolo: 'Il dominio naturale', durata: 86.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [84.5, 85.5] },
    capitoli: [[7.5, 35.8, 'dividere per zero'], [35.8, 53.8, 'la radice quadrata'], [53.8, 76.6, 'il logaritmo']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneMachine(ctx, t); sceneConto(ctx, t); sceneGrafico(ctx, t); sceneFine(ctx, t); },
  };
});
