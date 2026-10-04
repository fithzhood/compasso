'use strict';
/* Le soluzioni sono intervalli — 2x − 3 > 5 dà x > 4: sulla retta un pallino vuoto e una freccia, e si scrive (4, +∞); con ≥ il pallino è pieno e la parentesi quadra. Argomento: disequazioni-primo-grado. */
CVIDEO.registra('disequazioni-primo-grado/intervalli', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, txt,
    dot, hole, glowStroke, arrowHead, card, checkMark, crossMark } = M;

const FINE = 80.2, DURATA = 92.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [17.5, 'pensa'],
  [21.7, 'felice'], [24.0, 'neutro'], [30.7, 'pensa'], [33.0, 'sorpreso'], [35.3, 'neutro'],
  [41.9, 'felice'], [44.0, 'neutro'], [61.8, 'pensa'], [66.3, 'felice'], [68.5, 'neutro'],
  [71.6, 'felice'], [73.8, 'neutro'], [FINE + 1.0, 'felice'], [86.2, 'occhiolino'], [88.4, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede; i movimenti stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Quali numeri rendono vera\n{mink:2}{mx:x}{mink: − 3 > 5}?'],
  // 1 · si risolve
  [7.9, 12.4, 'Sommo 3 ai due membri:\n{mink:2}{mx:x}{mink: > 8}, il segno resta {mink:>}.'],
  [12.5, 17.4, 'Divido per 2, che è {g:positivo}:\n{mx:x}{mink: > 4}, il segno resta ancora.'],
  [17.5, 21.6, 'Ma {mx:x}{mink: > 4} non è un numero solo:\nsono {v:infiniti} numeri.'],
  // 2 · proviamo
  [21.7, 26.2, 'Provo con 6: {mink:2 · 6 − 3 = 9},\ne {mink:9 > 5} è {g:vera}.'],
  [26.3, 30.6, 'Con 2: {mink:2 · 2 − 3 = 1},\ne {mink:1 > 5} è {r:falsa}.'],
  [30.7, 35.2, 'E con 4? {mink:2 · 4 − 3 = 5},\nma {mink:5 > 5} è {r:falsa}.'],
  [35.3, 39.8, 'Il 4 è {r:escluso}: si segna\ncon un pallino {v:vuoto}.'],
  [41.9, 47.2, 'Vanno bene tutti i numeri a destra\ndi 4, senza fine: è un {v:intervallo}.'],
  // 3 · come si scrive
  [47.5, 52.4, 'Si scrive {mink:(4, +∞)}. {mink:+∞} si legge\n«più infinito»: a destra non c\'è fine.'],
  [52.5, 57.0, 'La parentesi {v:tonda} dice che 4\nè {r:escluso}, come il pallino vuoto.'],
  [57.1, 61.4, 'Anche {mink:+∞} vuole sempre la tonda:\nnon è un numero.'],
  // 4 · con ≥
  [61.8, 66.2, 'E se il segno fosse {mink:≥},\n«maggiore o uguale»?'],
  [66.3, 70.8, 'Con 4 viene {mink:5 ≥ 5}: {g:vera}.\nIl 4 ora è {g:incluso}.'],
  [71.6, 75.6, 'Pallino {g:pieno} e parentesi {g:quadra}:\n{mink:[4, +∞)}.'],
  [75.7, 79.8, 'Il 4 cambia parentesi,\n{mink:+∞} resta con la tonda.'],
  // chiusura
  [81.6, 89.4, 'Incluso: quadra e pallino pieno.\nEscluso: tonda e pallino vuoto.'],
];

// la retta dei numeri: 0 in OX, un'unità = U pixel
const RY = 640, OX = 462, U = 120, XA = -2.6, XB = 10.6;
const X = v => OX + v * U;
const LINE = [80, 450, 1760, 350], TOP = [80, 110, 1760, 300];
const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
// numero sotto la retta, pieno, su un fondino del colore della scheda
function numero(ctx, v, al, col = C.dim, size = 30, weight = 500) {
  if (al <= 0) return;
  const s = lab(v), w = size * .62 * Array.from(s).length + 14, h = size + 8;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.fillRect(X(v) - w / 2, RY + 46 - h / 2, w, h);
  ctx.restore();
  txt(ctx, s, X(v), RY + 46, { size, weight, color: col, alpha: al });
}
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .14);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
// da > a ≥, tutto insieme quando Ada lo chiede
const K_GE = t => P(t, 61.9, 62.4);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le soluzioni sono intervalli', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–4 · la retta (17.3–FINE)
function sceneRetta(ctx, t) {
  if (t < 17.2 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LINE, P(t, 17.3, 18.0));
  const kb = P(t, 17.5, 18.3);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(XA) - 10, RY); ctx.lineTo(X(XB) + 10, RY); ctx.stroke();
    arrowHead(ctx, [X(XB) + 24, RY], 0, C.ink);
    ctx.lineWidth = 2.5;
    for (let i = -2; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(X(i), RY - 10); ctx.lineTo(X(i), RY + 10); ctx.stroke(); }
    ctx.restore();
  }
  // la soluzione: dal 4 verso destra, senza fine
  const kr = P(t, 40.0, 41.6, E.io);
  if (kr > 0) {
    const e = glowStroke(ctx, [[X(4), RY], [X(10.3), RY]], kr, C.v, 9);
    if (e) arrowHead(ctx, e[0], 0, C.v, 1.5);
  }
  // i numeri: grigi; 4, e i numeri provati, colorati e più grandi
  const kn = P(t, 17.7, 18.7);
  for (let i = -2; i <= 10; i++) numero(ctx, i, kn);
  numero(ctx, 4, P(t, 18.0, 18.4), C.v, 44, 600);
  numero(ctx, 6, life(t, 22.0, 47.5, .3, .4), C.g, 44, 600);
  numero(ctx, 2, life(t, 26.6, 47.5, .3, .4), C.r, 44, 600);
  // le prove: 6 va bene, 2 no, 4 no
  const kp = 1 - P(t, 47.0, 47.5);
  dot(ctx, [X(6), RY], C.g, P(t, 22.1, 22.5, E.back) * kp, 12);
  checkMark(ctx, X(6), RY - 70, P(t, 22.3, 23.3) * kp, C.g, .3);
  dot(ctx, [X(2), RY], C.r, P(t, 26.7, 27.1, E.back) * kp, 12);
  crossMark(ctx, X(2), RY - 70, P(t, 26.9, 27.9) * kp, C.r, .3);
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 39.5, 39.9);
  crossMark(ctx, X(4), RY - 70, P(t, 31.2, 32.2), C.r, .3);
  ctx.restore();
  // il 4: prima un punto rosso (non va), poi il pallino vuoto, con ≥ il pallino pieno
  dot(ctx, [X(4), RY], C.r, P(t, 31.0, 31.4, E.back) * (1 - P(t, 35.4, 35.7)), 12);
  const kpieno = P(t, 67.3, 67.8), kdubbio = 1 - .75 * P(t, 62.4, 62.9);
  ctx.save(); ctx.globalAlpha *= kdubbio;
  hole(ctx, [X(4), RY], C.v, P(t, 35.5, 35.9, E.back) * (1 - kpieno), 15);
  ctx.restore();
  dot(ctx, [X(4), RY], C.v, P(t, 67.3, 67.8, E.back), 15);
  ctx.restore();
}
// una riga della risoluzione, allineata sul segno; il segno > diventa ≥ insieme alle altre righe
const XS = 430, YR = [180, 265, 350];
function riga(ctx, sx, dx, y, local, kge) {
  const k = P(local, 0, .5, E.out);
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 16);
  drawRich(ctx, sx, XS - 34, y, { size: 56, align: 'right' });
  drawRich(ctx, '{mink:>}', XS, y, { size: 56, alpha: 1 - kge });
  drawRich(ctx, '{mv:≥}', XS, y, { size: 56, alpha: kge });
  drawRich(ctx, dx, XS + 34, y, { size: 56, align: 'left' });
  ctx.restore();
}
function scenePannello(ctx, t) {
  const pa = life(t, 7.5, FINE + .2, .6, .8);
  if (pa <= 0) return;
  card(ctx, ...TOP, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  const kge = K_GE(t);
  // la risoluzione, a sinistra
  riga(ctx, '{mink:2}{mx:x}{mink: − 3}', '{mink:5}', YR[0], t - 7.8, kge);
  riga(ctx, '{mink:2}{mx:x}', '{mink:8}', YR[1], t - 8.2, kge);
  riga(ctx, '{mx:x}', '{mink:4}', YR[2], t - 12.8, kge);
  txt(ctx, 'sommo 3', 640, YR[1], { size: 32, color: C.dim, align: 'left', alpha: P(t, 8.6, 9.1) });
  txt(ctx, 'divido per 2', 640, YR[2], { size: 32, color: C.dim, align: 'left', alpha: P(t, 13.2, 13.7) });
  // x > 4: tanti numeri, non uno solo
  evidenzia(ctx, XS - 120, YR[2] - 40, 240, 80, C.v, life(t, 17.6, 21.6, .4, .4));
  // il separatore
  const ks = P(t, 21.7, 22.1);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1000, 140); ctx.lineTo(1000, 380); ctx.stroke(); ctx.restore(); }
  // le prove, a destra
  const PR = [[21.9, 0, '{mink:6}', '{mink:9 > 5}', true], [26.5, 1, '{mink:2}', '{mink:1 > 5}', false], [30.9, 2, '{mink:4}', '{mink:5 > 5}', false]];
  PR.forEach(([a, i, n, cfr, vera]) => {
    const ka = P(t, a, a + .5, E.out) * (i < 2 ? 1 - P(t, 47.0, 47.5) : 1);
    if (ka <= 0) return;
    const y = YR[i];
    ctx.save(); ctx.globalAlpha *= ka;
    drawRich(ctx, '{mx:x}{mink: = }' + n, 1060, y, { size: 48, align: 'left' });
    if (i < 2) {
      drawRich(ctx, cfr, 1330, y, { size: 48, align: 'left' });
      (vera ? checkMark : crossMark)(ctx, 1700, y, P(t, a + .3, a + 1.3), vera ? C.g : C.r, .3);
    } else {
      // il 4: con > è falsa, con ≥ è vera
      const kv = P(t, 66.4, 66.9);
      drawRich(ctx, cfr, 1330, y, { size: 48, align: 'left', alpha: (1 - kv) * (1 - .75 * P(t, 62.4, 62.9)) });
      drawRich(ctx, '{mink:5 }{mv:≥}{mink: 5}', 1330, y, { size: 48, align: 'left', alpha: kv });
      ctx.save(); ctx.globalAlpha *= (1 - kv) * (1 - .75 * P(t, 62.4, 62.9)); crossMark(ctx, 1700, y, P(t, a + .3, a + 1.3), C.r, .3); ctx.restore();
      checkMark(ctx, 1700, y, P(t, 66.5, 67.5), C.g, .3);
    }
    ctx.restore();
  });
  // l'intervallo: (4, +∞), poi [4, +∞)
  const XN = 1420, YN = 222;
  const kq = P(t, 67.3, 67.8);
  drawRich(ctx, '{mink:(4, +∞)}', XN, YN, { size: 96, local: t - 47.6, alpha: (1 - kq) * (1 - .75 * P(t, 62.4, 62.9)) });
  drawRich(ctx, '{mink:[4, +∞)}', XN, YN, { size: 96, alpha: kq });
  if (t > 52) {
    const wT = richW(ctx, '{mink:(4, +∞)}', 96), wA = richW(ctx, '{mink:(}', 96), wC = richW(ctx, '{mink:)}', 96);
    const x0 = XN - wT / 2;
    evidenzia(ctx, x0 - 10, YN - 62, wA + 20, 124, C.r, life(t, 52.6, 57.0, .3, .3));
    evidenzia(ctx, x0 + wT - wC - 10, YN - 62, wC + 20, 124, C.v, life(t, 57.2, 61.4, .3, .3) + life(t, 75.8, 79.8, .3, .3));
    evidenzia(ctx, x0 - 10, YN - 62, wA + 20, 124, C.g, life(t, 71.6, 75.6, .3, .3));
  }
  ctx.restore();
}

// 5 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Di solito le soluzioni sono\nun {v:intervallo}: un tratto di numeri.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, '{mink:(4, +∞)}: 4 {r:escluso}'], [960, '{mink:[4, +∞)}: 4 {g:incluso}'], [1450, '{mink:+∞}: sempre la tonda']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 230, 450, 460, 100);
    drawRich(ctx, s, x, 502, { size: 40, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Le soluzioni sono intervalli', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 21.6, 'si risolve'], [21.6, 47.3, 'proviamo dei numeri'], [47.3, 61.6, 'come si scrive'], [61.6, FINE, 'e con ≥?']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRetta(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
