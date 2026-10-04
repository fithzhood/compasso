'use strict';
/* Casi favorevoli su casi possibili — un dado: pari = 3/6 = 1/2; due dadi: la tabella 6 per 6 delle somme, 36 casi,
   la somma 7 sta su 6 caselle (la diagonale più lunga), P = 6/36 = 1/6; azzurro 1 e arancio 6 è un caso diverso
   da azzurro 6 e arancio 1; le 11 somme non sono ugualmente possibili, quindi non 1/11: la regola vale solo
   con casi in numero finito e ugualmente possibili. Le coppie non si scrivono: si vedono i dadi colorati.
   Argomento: probabilita. */
CVIDEO.registra('probabilita/casi-favorevoli', M => {
  const { W, C, E, P, life, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, card, crossMark } = M;

const FINE = 82.8, DUR = 94.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [12.7, 'felice'], [15.0, 'neutro'], [21.9, 'felice'], [24.0, 'neutro'],
  [40.2, 'felice'], [42.4, 'neutro'], [45.0, 'festa'], [47.4, 'neutro'], [49.5, 'sorpreso'], [51.6, 'neutro'],
  [58.9, 'felice'], [61.0, 'neutro'], [63.5, 'pensa'], [68.3, 'sorpreso'], [70.4, 'neutro'], [77.7, 'felice'], [79.8, 'neutro'],
  [FINE + 2.2, 'felice'], [89.8, 'occhiolino'],
];
// una frase per ogni cosa che succede; le caselle si riempiono e le barre crescono mentre Ada lo dice
const FUMETTI = [
  [2.4, 6.4, 'Con un dado, quanto è probabile\nche esca un pari?'],
  // 1 · un dado
  [8.0, 12.4, 'Sei facce, tutte con la stessa\npossibilità: sono i {v:casi possibili}.'],
  [12.6, 16.9, 'Le pari sono {g:tre}: 2, 4 e 6,\ni {g:casi favorevoli}.'],
  [17.1, 21.7, 'La probabilità {mink:P} è favorevoli\ndiviso possibili: {mink:3/6 = 1/2}.'],
  [21.9, 26.4, 'Per un evento {mink:E} qualunque\nla regola è sempre questa.'],
  // 2 · due dadi
  [27.0, 30.9, 'Ora due dadi: uno {x:azzurro}\ne uno {y:arancio}.'],
  [31.1, 35.3, 'In ogni casella scrivo la somma\ndei due dadi.'],
  [35.5, 39.9, 'Le caselle sono {mink:6 · 6 = 36}:\nsono i {v:casi possibili}.'],
  [40.1, 44.6, 'La somma {g:7} esce in {g:6} caselle,\ntutte su una diagonale.'],
  [44.8, 49.2, 'Quindi la probabilità di fare 7\nè {mink:6/36 = 1/6}.'],
  [49.4, 54.0, '{x:1} sull’azzurro e {y:6} sull’arancio,\no il contrario: sono {v:due casi}.'],
  [54.2, 58.6, 'Conto le caselle di ogni somma:\nsono le diagonali della tabella.'],
  [58.8, 63.1, 'Il 7 ha la diagonale più lunga:\nè il {g:più probabile}.'],
  // 3 · la condizione
  [63.4, 67.9, 'Le somme possibili sono 11.\nAllora il 7 ha probabilità {mink:1/11}?'],
  [68.2, 72.5, '{r:No}: le somme non sono\nugualmente possibili.'],
  [72.8, 77.4, 'La regola vale solo con casi\nin numero {v:finito} e {v:ugualmente possibili}.'],
  [77.6, 82.4, 'Ogni coppia di facce ha la stessa\npossibilità: si contano le caselle.'],
  // chiusura
  [85.0, 91.8, 'Casi finiti e ugualmente possibili:\nfavorevoli diviso possibili.'],
];

const fr = (a, b, ca = 'mink', cb = 'mink') => ({ num: `{${ca}:${a}}`, den: `{${cb}:${b}}` });
// un dado: faccia n, centro (x, y), lato s; o = { fill, edge, pip, k (scala), al }
const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
function dado(ctx, x, y, s, n, o = {}) {
  const k = o.k ?? 1, al = o.al ?? 1;
  if (k <= 0.01 || al <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, s * .18);
  ctx.fillStyle = css(o.fill || C.paper); ctx.fill();
  if (o.edge) { ctx.strokeStyle = css(o.edge); ctx.lineWidth = o.lw || 3; ctx.stroke(); }
  ctx.fillStyle = css(o.pip || C.ink);
  for (const [a, b] of PIPS[n]) { ctx.beginPath(); ctx.arc(a * s * .27, b * s * .27, s * .085, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
const blu = (ctx, x, y, s, n, k, al) => dado(ctx, x, y, s, n, { fill: C.x, pip: C.paper, k, al });
const ara = (ctx, x, y, s, n, k, al) => dado(ctx, x, y, s, n, { fill: C.y, pip: C.paper, k, al });
function riquadro(ctx, x, y, w, h, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 16); ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Casi favorevoli\nsu casi possibili', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 1 · un dado (7.5–26.6)
const XD = i => 960 + (i - 2.5) * 215, YD = 265;
function sceneDado(ctx, t) {
  if (t < 7.5 || t > 27.2) return;
  const al = life(t, 7.5, 26.9, .5, .6);
  card(ctx, 150, 120, 1620, 670, al);
  ctx.save(); ctx.globalAlpha *= al;
  for (let i = 0; i < 6; i++) {
    const n = i + 1, pari = n % 2 === 0, kv = pari ? P(t, 12.7 + (i >> 1) * .2, 13.2 + (i >> 1) * .2) : 0;
    const k = P(t, 8.0 + i * .12, 8.5 + i * .12, E.back);
    dado(ctx, XD(i), YD, 130, n, { k, fill: mix(C.paper, C.g, .12 * kv), edge: mix(C.ink, C.g, kv), lw: 3 + 2 * kv, pip: mix(C.ink, C.g, kv) });
  }
  drawRich(ctx, '{v:casi possibili}{mink:  6}', 640, 410, { size: 44, local: t - 8.6 });
  drawRich(ctx, '{g:casi favorevoli}{mink:  3}', 1280, 410, { size: 44, local: t - 13.4 });
  drawSeq(ctx, ['{mink:P(}pari{mink:) =}', fr(3, 6), '{mink:=}', fr(1, 2, 'mg', 'mg')], 960, 520, 56, { local: t - 17.3 });
  drawSeq(ctx, ['{mink:P(E) =}', { num: '{g:casi favorevoli}', den: '{v:casi possibili}' }], 960, 688, 46, { local: t - 22.0 });
  riquadro(ctx, 960, 690, 640, 140, C.g, P(t, 23.2, 23.7));
  ctx.restore();
}
// 2–3 · due dadi: la tabella a sinistra, i conti a destra (26.8–FINE)
const CX = j => 282 + 88 * j, CY = i => 272 + 88 * i;   // casella: riga i = dado azzurro i + 1, colonna j = dado arancio j + 1
const CR = [850, 112, 970, 680], XM = CR[0] + CR[2] / 2;
const CONTA = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];          // caselle per le somme 2…12
function sceneTabella(ctx, t) {
  if (t < 26.6 || t > FINE + .7) return;
  const al = life(t, 26.8, FINE, .5, .6);
  card(ctx, 120, 112, 680, 680, al);
  ctx.save(); ctx.globalAlpha *= al;
  // le intestazioni: i due dadi
  txt(ctx, '+', 194, 184, { size: 44, weight: 600, color: C.dim, alpha: P(t, 27.6, 28.0) });
  for (let j = 0; j < 6; j++) ara(ctx, CX(j), 184, 62, j + 1, P(t, 27.2 + j * .08, 27.7 + j * .08, E.back));
  for (let i = 0; i < 6; i++) blu(ctx, 194, CY(i), 62, i + 1, P(t, 28.0 + i * .08, 28.5 + i * .08, E.back));
  // la griglia
  const kg = P(t, 28.4, 29.2);
  if (kg > 0) {
    ctx.save(); ctx.strokeStyle = css(C.panelEdge); ctx.lineWidth = 2; ctx.globalAlpha *= kg; ctx.beginPath();
    for (let a = 0; a <= 6; a++) { ctx.moveTo(238 + 88 * a, 228); ctx.lineTo(238 + 88 * a, 756); ctx.moveTo(238, 228 + 88 * a); ctx.lineTo(766, 228 + 88 * a); }
    ctx.stroke(); ctx.restore();
  }
  // la somma 7: la diagonale verde; poi le due caselle 1 + 6 e 6 + 1
  const k7 = i => P(t, 40.3 + i * .12, 40.7 + i * .12);
  const kc = life(t, 49.5, 54.1, .4, .4);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
    const s = i + j + 2, a = 31.3 + i * .45 + j * .06, k = P(t, a, a + .35, E.out);
    if (k <= 0) continue;
    const g = s === 7 ? k7(i) : 0;
    // mentre cresce la barra di una somma, si accende la sua diagonale (il 7 è già verde)
    const d = s === 7 ? 0 : life(t, 54.5 + (s - 2) * .3, 54.8 + (s - 2) * .3, .08, .1);
    if (d > 0) { ctx.save(); ctx.globalAlpha *= d; ctx.fillStyle = css(C.v, .2); ctx.fillRect(CX(j) - 43, CY(i) - 43, 86, 86); ctx.restore(); }
    if (g > 0) { ctx.save(); ctx.globalAlpha *= g; ctx.fillStyle = css(C.g, .16); ctx.fillRect(CX(j) - 43, CY(i) - 43, 86, 86); ctx.restore(); }
    txt(ctx, String(s), CX(j), CY(i) + (1 - k) * 12, { size: 44, weight: g > .5 ? 700 : 500, color: mix(C.ink, C.g, g), alpha: k });
  }
  if (kc > 0) for (const [i, j] of [[0, 5], [5, 0]]) {
    ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5;
    ctx.beginPath(); ctx.roundRect(CX(j) - 40, CY(i) - 40, 80, 80, 12); ctx.stroke(); ctx.restore();
  }
  // le 36 caselle sono ugualmente possibili: il bordo della tabella si accende
  const kb = life(t, 77.7, FINE + .2, .4, .2);
  if (kb > 0) { ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(234, 224, 536, 536, 10); ctx.stroke(); ctx.restore(); }

  // la scheda dei conti
  const kr = life(t, 35.4, FINE, .5, .6);
  card(ctx, ...CR, kr);
  ctx.save(); ctx.globalAlpha *= kr;
  const c1 = 1 - P(t, 53.9, 54.3);
  if (c1 > 0) {
    ctx.save(); ctx.globalAlpha *= c1;
    const xl = CR[0] + 50, xr = CR[0] + CR[2] - 50;
    txt(ctx, 'casi possibili', xl, 190, { size: 34, color: C.dim, align: 'left', alpha: P(t, 35.6, 36.0) });
    drawRich(ctx, '{mink:6 · 6 = }{mv:36}', xr, 190, { size: 50, align: 'right', local: t - 35.8 });
    txt(ctx, 'casi favorevoli (somma 7)', xl, 285, { size: 34, color: C.dim, align: 'left', alpha: P(t, 40.4, 40.8) });
    drawRich(ctx, '{mg:6}', xr, 285, { size: 50, align: 'right', local: t - 40.9 });
    drawSeq(ctx, ['{mink:P(}somma 7{mink:) =}', fr(6, 36), '{mink:=}', fr(1, 6, 'mg', 'mg')], XM, 425, 54, { local: t - 45.0 });
    // i due casi con 1 e 6
    const kd = P(t, 49.6, 50.1, E.back);
    if (kd > 0) {
      ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xl, 540); ctx.lineTo(xr, 540); ctx.stroke();
      blu(ctx, 1110, 635, 84, 1, kd); ara(ctx, 1210, 635, 84, 6, kd);
      blu(ctx, 1460, 635, 84, 6, P(t, 50.0, 50.5, E.back)); ara(ctx, 1560, 635, 84, 1, P(t, 50.0, 50.5, E.back));
      drawRich(ctx, '{v:due casi diversi}', XM, 735, { size: 36, weight: 600, local: t - 50.4 });
    }
    ctx.restore();
  }
  // il conteggio delle caselle per ogni somma
  if (t > 54.0) {
    txt(ctx, 'caselle per ogni somma', XM, 146, { size: 32, color: C.dim, alpha: P(t, 54.2, 54.6) });
    const BASE = 520, U = 46;
    CONTA.forEach((n, q) => {
      const x = XM + (q - 5) * 80, a = 54.5 + q * .3, k = P(t, a, a + .5, E.out);
      if (k <= 0) return;
      const sette = q === 5, h = n * U * k;
      ctx.fillStyle = sette ? css(C.g) : css(C.v, .45);
      ctx.beginPath(); ctx.roundRect(x - 28, BASE - h, 56, h, [8, 8, 0, 0]); ctx.fill();
      txt(ctx, String(n), x, BASE - n * U - (sette ? 30 : 26), { size: sette ? 44 : 32, weight: 600, color: sette ? C.g : C.ink, alpha: P(t, a + .3, a + .6) });
      txt(ctx, String(q + 2), x, BASE + 32, { size: 32, color: sette ? C.g : C.dim, weight: sette ? 700 : 500, alpha: P(t, a, a + .3) });
    });
    ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.globalAlpha *= P(t, 54.2, 54.6);
    ctx.beginPath(); ctx.moveTo(XM - 440, BASE); ctx.lineTo(XM + 440, BASE); ctx.stroke(); ctx.restore();
    // il 7: la colonna più alta, con il suo numero sopra e la somma sotto
    riquadro(ctx, XM, 383, 84, 394, C.g, life(t, 59.0, 63.3, .4, .4));
  }
  // 3 · una volta su 11? no: le somme non sono ugualmente possibili (nessuna uguaglianza falsa: è una domanda)
  const kq = 1 - P(t, 72.6, 73.0);
  if (t > 63.4 && kq > 0) {
    ctx.save(); ctx.globalAlpha *= kq;
    txt(ctx, '11 somme possibili, da 2 a 12', XM, 615, { size: 32, color: C.dim, alpha: P(t, 63.5, 63.9) });
    const kx = P(t, 68.3, 68.8);
    ctx.save(); ctx.globalAlpha *= 1 - .55 * kx;
    drawSeq(ctx, ['il 7 una volta su 11:', fr(1, 11), '{r:?}'], XM - 30, 705, 44, { local: t - 64.0 });
    ctx.restore();
    crossMark(ctx, XM + 300, 705, kx, C.r, .42);
    ctx.restore();
  }
  if (t > 72.6) {
    txt(ctx, 'si può dividere solo se i casi sono', XM, 630, { size: 32, color: C.dim, alpha: P(t, 72.9, 73.3) });
    drawRich(ctx, 'in numero {v:finito} e {v:ugualmente possibili}', XM, 700, { size: 38, weight: 600, local: t - 73.0 });
  }
  ctx.restore();
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La probabilità è casi {g:favorevoli}\ndiviso casi {v:possibili}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[420, '{dim:un dado, numero pari}'], [960, '{dim:due dadi, somma 7}'], [1500, '']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - 240, 450, 480, 190);
    if (i === 0) { drawRich(ctx, testa, x, 486, { size: 30, weight: 400 }); drawSeq(ctx, [fr(3, 6), '{mink:=}', fr(1, 2, 'mg', 'mg')], x, 576, 44); }
    if (i === 1) { drawRich(ctx, testa, x, 486, { size: 30, weight: 400 }); drawSeq(ctx, [fr(6, 36), '{mink:=}', fr(1, 6, 'mg', 'mg')], x, 576, 44); }
    if (i === 2) drawRich(ctx, 'solo con casi\nin numero {v:finito}\ne {v:ugualmente possibili}', x, 545, { size: 32, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Casi favorevoli su casi possibili', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 26.7, 'un dado'], [26.7, 63.2, 'due dadi'], [63.2, FINE, 'la condizione']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneDado(ctx, t); sceneTabella(ctx, t); sceneFine(ctx, t); },
  };
});
