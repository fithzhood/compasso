'use strict';
/* Perché si controlla — √(x + 2) = x: al quadrato x + 2 = x², x² − x − 2 = 0, x = 2 oppure x = −1;
   −1 è falsa (√1 = 1 ≠ −1) perché il quadrato cancella il segno; la condizione x ≥ 0 la scarta,
   x + 2 ≥ 0 no. Argomento: valore-assoluto-irrazionali. */
CVIDEO.registra('valore-assoluto-irrazionali/soluzioni-in-piu', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, txt,
    arrowHead, card, checkMark, crossMark } = M;

const FINE = 74.8, DURATA = 86.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [23.1, 'felice'], [25.2, 'neutro'],
  [30.4, 'felice'], [32.5, 'neutro'], [34.9, 'pensa'], [37.0, 'neutro'], [39.2, 'sorpreso'], [41.3, 'neutro'],
  [44.6, 'pensa'], [46.7, 'neutro'], [53.9, 'felice'], [56.0, 'neutro'], [58.8, 'pensa'],
  [62.7, 'sorpreso'], [64.8, 'neutro'], [71.15, 'felice'], [73.3, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 7.5, 'occhiolino'], [FINE + 9.5, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Si può sempre elevare al quadrato\nsenza rischi?'],
  // 1 · si risolve
  [7.9, 11.9, 'Risolviamo {mink:√(}{mx:x}{mink: + 2) = }{mx:x}:\nl\'incognita è sotto la {v:radice}.'],
  [12.0, 16.0, 'Elevo al quadrato i due membri:\nla radice sparisce.'],
  [16.1, 19.5, 'Porto tutto a destra:\n{mx:x}{mink:² − }{mx:x}{mink: − 2 = 0}.'],
  [19.6, 23.0, 'Scompongo il trinomio:\n{mink:(}{mx:x}{mink: − 2)(}{mx:x}{mink: + 1) = 0}.'],
  [23.1, 26.6, 'Due soluzioni: {mx:x}{mink: = 2}\noppure {mx:x}{mink: = −1}.'],
  // 2 · la prova
  [26.7, 30.3, 'Le metto alla prova\nnell\'equazione di partenza.'],
  [30.4, 34.8, 'Con {mx:x}{mink: = 2} la radice vale {mink:√4 = 2}:\nè proprio {mx:x}. {g:Funziona}.'],
  [34.9, 39.1, 'Con {mx:x}{mink: = −1} la radice vale {mink:√1 = 1},\nma {mx:x} è {mink:−1}.'],
  [39.2, 43.6, '{mink:1} è diverso da {mink:−1}: la soluzione\n{mink:−1} è {r:falsa}.'],
  // 3 · perché
  [44.6, 49.4, 'Perché? Il quadrato {v:cancella il segno}:\n{mink:1²} e {mink:(−1)²} fanno 1.'],
  [49.5, 53.8, '{mink:1} e {mink:−1} sono diversi,\nma i loro quadrati sono {r:uguali}.'],
  [53.9, 57.6, 'Per questo, al quadrato, {mink:−1}\nsembrava una soluzione.'],
  // 4 · la condizione
  [58.8, 62.6, 'Basta controllare che la radice\nesista, cioè {mx:x}{mink: + 2 ≥ 0}?'],
  [62.7, 66.7, 'No: con {mx:x}{mink: = −1}, {mink:−1 + 2 = 1 ≥ 0}:\nla radice esiste, e {mink:−1} passa.'],
  [66.8, 71.05, 'Serve invece {mx:x}{mink: ≥ 0}: {mx:x} è uguale\na una radice, mai {r:negativa}.'],
  [71.15, 74.7, 'Questa scarta {mink:−1}, perché {mink:−1 < 0},\ne tiene {mink:2}.'],
  // chiusura
  [76.6, 83.7, 'Il quadrato può aggiungere soluzioni:\nsi controlla con {mx:x}{mink: ≥ 0} o sostituendo.'],
];

// ---------- formule con la radice col trattino sopra, come le scrive il sito ----------
// voce: stringa (testo ricco) | { rad: stringa }
const wv = (ctx, v, s) => typeof v === 'string' ? richW(ctx, v, s) : s * .6 + richW(ctx, v.rad, s) + s * .12;
function voce(ctx, v, x, cy, s) {
  if (typeof v === 'string') { drawRich(ctx, v, x, cy, { size: s, align: 'left' }); return; }
  const w = richW(ctx, v.rad, s), top = cy - s * .68, bot = cy + s * .44;
  ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .05); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x + s * .03, cy + s * .1); ctx.lineTo(x + s * .13, cy + s * .03);
  ctx.lineTo(x + s * .3, bot); ctx.lineTo(x + s * .54, top); ctx.lineTo(x + s * .66 + w + s * .04, top); ctx.stroke(); ctx.restore();
  drawRich(ctx, v.rad, x + s * .6, cy, { size: s, align: 'left' });
}
// una riga di voci; align 'left' | 'right' | 'center'; local fa comparire le voci una alla volta
function formula(ctx, voci, x, cy, s, o = {}) {
  const al = o.alpha ?? 1, local = o.local ?? 99; if (al <= .002) return 0;
  const ws = voci.map(v => wv(ctx, v, s)), tot = ws.reduce((a, b) => a + b, 0);
  let xx = o.align === 'right' ? x - tot : o.align === 'center' ? x - tot / 2 : x;
  voci.forEach((v, i) => {
    const k = P(local, i * .25, i * .25 + .45, E.out);
    if (k > .002) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); voce(ctx, v, xx, cy, s); ctx.restore(); }
    xx += ws[i];
  });
  return tot;
}
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .14);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
const linea = (ctx, x0, x1, y, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); };
const nota = (ctx, s, y, t0, t) => txt(ctx, s, 790, y, { size: 30, color: C.dim, align: 'left', alpha: P(t, t0, t0 + .5) });

const SX = [100, 110, 960, 690], DX = [1110, 110, 730, 690];
const XE = 560;   // la colonna degli uguali
const RIGHE = [   // [y, sinistra, destra, comparsa]
  [215, [{ rad: '{mx:x}{mink: + 2}' }], ['{mx:x}'], 8.1],
  [320, ['{mx:x}{mink: + 2}'], ['{mx:x}{mink:²}'], 12.2],
  [420, ['{mx:x}{mink:² − }{mx:x}{mink: − 2}'], ['{mink:0}'], 16.3],
  [520, ['{mink:(}{mx:x}{mink: − 2)(}{mx:x}{mink: + 1)}'], ['{mink:0}'], 19.8],
];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Perché si controlla', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la risoluzione, a sinistra (7.5–FINE)
function sceneConti(ctx, t) {
  const pa = life(t, 7.5, FINE + .2, .6, .8);
  if (pa <= 0) return;
  card(ctx, ...SX, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  // B12: con x = −1 la riga col quadrato è vera; la si evidenzia mentre Ada lo dice
  evidenzia(ctx, 150, 280, 860, 80, C.v, life(t, 53.9, 57.6, .3, .3));
  for (const [y, sx, dx, t0] of RIGHE) {
    if (t < t0) continue;
    formula(ctx, sx, XE - 40, y, 52, { align: 'right', local: t - t0 });
    formula(ctx, ['{mink:=}'], XE, y, 52, { align: 'center', local: t - t0 - .25 });
    formula(ctx, dx, XE + 40, y, 52, { align: 'left', local: t - t0 - .5 });
  }
  nota(ctx, 'al quadrato', 320, 12.6, t);
  nota(ctx, 'tutto a destra', 420, 16.7, t);
  nota(ctx, 'scompongo', 520, 20.2, t);
  linea(ctx, 150, 1010, 585, P(t, 23.1, 23.5));
  // le due soluzioni; poi −1 si cancella e 2 resta
  const ys = 660;
  drawRich(ctx, '{mx:x}{mink: = 2}', 330, ys, { size: 56, local: t - 23.3 });
  drawRich(ctx, 'oppure', 580, ys, { size: 36, local: t - 23.6 });
  drawRich(ctx, '{mx:x}{mink: = −1}', 830, ys, { size: 56, local: t - 23.9 });
  const kx = P(t, 39.4, 40.0);
  if (kx > 0) {
    ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(735, ys + 26); ctx.lineTo(735 + 190 * kx, ys + 26 - 52 * kx); ctx.stroke(); ctx.restore();
  }
  const kg = P(t, 39.6, 40.1);
  if (kg > 0) { ctx.save(); ctx.globalAlpha *= kg; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(240, ys - 46, 180, 92, 16); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// la scheda a destra: la prova, il perché, le condizioni
const XL = 1150, XC = 1475;
function sceneScheda(ctx, t) {
  const pa = life(t, 26.7, FINE + .2, .6, .8);
  if (pa <= 0) return;
  card(ctx, ...DX, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  // 2 · la prova
  const a2 = 1 - P(t, 43.6, 44.2);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, '{dim:la prova}', XC, 170, { size: 36, weight: 600, local: t - 26.9 }));
    drawRich(ctx, '{dim:con }{mx:x}{mink: = 2}', XL, 250, { size: 36, align: 'left', local: t - 30.5 });
    formula(ctx, [{ rad: '{mink:2 + 2}' }, '{mink: = }', { rad: '{mink:4}' }, '{mink: = 2}'], XL, 325, 48, { local: t - 30.7 });
    checkMark(ctx, 1770, 325, P(t, 32.0, 32.8), C.g, .3);
    linea(ctx, XL, 1800, 395, P(t, 34.9, 35.3));
    drawRich(ctx, '{dim:con }{mx:x}{mink: = −1}', XL, 455, { size: 36, align: 'left', local: t - 35.0 });
    formula(ctx, [{ rad: '{mink:−1 + 2}' }, '{mink: = }', { rad: '{mink:1}' }, '{mink: = 1}'], XL, 530, 48, { local: t - 35.2 });
    drawRich(ctx, '{mink:1 ≠ −1}', XL, 625, { size: 52, align: 'left', local: t - 39.3 });
    crossMark(ctx, 1770, 625, P(t, 39.6, 40.4), C.r, .3);
    ctx.restore();
  }
  // 3 · il quadrato cancella il segno
  const a3 = life(t, 44.3, 58.5, .5, .5);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    conFont(TITOLI, () => drawRich(ctx, '{dim:il quadrato cancella il segno}', XC, 170, { size: 36, weight: 600, local: t - 44.6 }));
    drawRich(ctx, '{mink:1² = 1}', 1300, 265, { size: 50, local: t - 45.4 });
    drawRich(ctx, '{mink:(−1)² = 1}', 1650, 265, { size: 50, local: t - 46.0 });
    linea(ctx, XL, 1800, 330, P(t, 49.4, 49.8));
    drawRich(ctx, '{mink:1 ≠ −1}', XC, 400, { size: 52, local: t - 49.6 });
    const kf = P(t, 50.6, 51.2);
    if (kf > 0) {
      ctx.save(); ctx.globalAlpha *= kf; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(XC, 445); ctx.lineTo(XC, 505); ctx.stroke(); ctx.restore();
      arrowHead(ctx, [XC, 512], Math.PI / 2, C.dim, kf);
      txt(ctx, 'al quadrato', XC + 30, 475, { size: 30, color: C.dim, align: 'left', alpha: kf });
    }
    drawRich(ctx, '{mink:1² = (−1)²}', XC, 565, { size: 52, local: t - 51.3 });
    linea(ctx, XL, 1800, 630, P(t, 53.9, 54.3));
    drawRich(ctx, '{dim:con }{mx:x}{mink: = −1}', XL, 680, { size: 34, align: 'left', local: t - 54.0 });
    drawRich(ctx, '{mx:x}{mink: + 2 = 1²}    {mx:x}{mink:² = (−1)²}', XC, 745, { size: 44, local: t - 54.4 });
    ctx.restore();
  }
  // 4 · le condizioni
  const a4 = P(t, 58.6, 59.1);
  if (a4 > 0) {
    ctx.save(); ctx.globalAlpha *= a4;
    conFont(TITOLI, () => drawRich(ctx, '{dim:le condizioni}', XC, 170, { size: 36, weight: 600, local: t - 58.8 }));
    drawRich(ctx, '{mx:x}{mink: + 2 ≥ 0}', XL, 255, { size: 50, align: 'left', local: t - 59.0 });
    txt(ctx, 'la radice esiste', XL, 315, { size: 32, color: C.dim, align: 'left', alpha: P(t, 59.4, 59.9) });
    drawRich(ctx, '{dim:con }{mx:x}{mink: = −1}{dim::  }{mink:−1 + 2 = 1 ≥ 0}', XL, 380, { size: 38, align: 'left', local: t - 62.8 });
    checkMark(ctx, 1770, 380, P(t, 63.6, 64.4), C.g, .28);
    linea(ctx, XL, 1800, 445, P(t, 66.8, 67.2));
    drawRich(ctx, '{mx:x}{mink: ≥ 0}', XL, 515, { size: 50, align: 'left', local: t - 66.9 });
    drawRich(ctx, '{mx:x}{dim: è uguale a una radice, mai negativa}', XL, 575, { size: 32, align: 'left', alpha: P(t, 67.3, 67.8) });
    drawRich(ctx, '{mink:−1 < 0}', XL, 655, { size: 46, align: 'left', local: t - 71.25 });
    crossMark(ctx, 1770, 655, P(t, 71.55, 72.35), C.r, .3);
    drawRich(ctx, '{mink:2 ≥ 0}', XL, 735, { size: 46, align: 'left', local: t - 72.05 });
    checkMark(ctx, 1770, 735, P(t, 72.35, 73.15), C.g, .3);
    ctx.restore();
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
    drawRich(ctx, 'Elevare al quadrato può aggiungere\nsoluzioni {r:false}: vanno controllate.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'il quadrato\n{v:cancella il segno}'], [960, 'condizione\n{mx:x}{mink: ≥ 0}'], [1430, 'oppure si sostituisce\nin quella di partenza']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, s, x, 520, { size: 36, weight: 400, lh: 1.45 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Perché si controlla', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 26.6, 'eleviamo al quadrato'], [26.6, 44.0, 'la prova'], [44.0, 58.2, 'perché succede'], [58.2, FINE, 'la condizione']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneConti(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
