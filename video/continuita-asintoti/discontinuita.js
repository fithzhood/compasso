'use strict';
/* Tre modi di rompersi — salto, fuga, buco: le tre specie di discontinuità lette dai due limiti laterali. Argomento: continuita-asintoti. */
CVIDEO.registra('continuita-asintoti/discontinuita', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, drawSeq, dot, hole, glowStroke, dashed, arrowHead, txt, card } = M;

const FINE = 91.6;
const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [22.6, 'sorpreso'], [24.8, 'neutro'], [28.7, 'felice'], [31.0, 'neutro'],
  [43.0, 'sorpreso'], [45.2, 'neutro'], [54.6, 'felice'], [56.8, 'neutro'],
  [62.4, 'pensa'], [64.6, 'neutro'], [78.9, 'sorpreso'], [81.0, 'neutro'], [86.2, 'felice'], [88.4, 'neutro'],
  [93.9, 'felice'], [96.4, 'occhiolino'], [98.4, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [2.0, 6.4, 'In quanti modi si può\n{r:rompere} un grafico?'],
  // 1 · il salto
  [9.2, 14.5, 'Questa funzione ha {v:due pezzi}:\nin {mink:1} il grafico si spezza.'],
  [15.9, 21.2, 'Da {x:sinistra} la curva arriva a {x:2}:\nè il {x:limite sinistro}.'],
  [22.6, 27.3, 'Da {v:destra} arriva a {v:−1}:\nè il {v:limite destro}.'],
  [28.7, 33.9, 'Finiti ma {r:diversi}: è un {v:salto},\ndiscontinuità di {v:prima specie}.'],
  // 2 · la fuga
  [36.6, 41.6, 'Ora {my:y = 1/}{mx:x}{my:²}: in {mink:0}\nla funzione non esiste.'],
  [43.0, 48.0, 'Da {x:sinistra} sale senza fine:\nil limite è {x:+∞}.'],
  [49.4, 53.2, 'Anche da {v:destra} sale a {v:+∞}.'],
  [54.6, 59.8, 'Un limite {r:infinito} basta: è una\ndiscontinuità di {v:seconda specie}.'],
  // 3 · il buco
  [62.4, 67.4, 'Infine {my:(}{mx:x}{my:² − 4)/(}{mx:x}{my: − 2)}:\nin {mink:2} non esiste.'],
  [68.8, 72.3, 'Da {x:sinistra} arriva a {x:4}…'],
  [73.7, 77.5, '…e da {v:destra} anche: {v:4}.'],
  [78.9, 84.8, 'Uguali e finiti: manca solo un punto.\nÈ un {v:buco}, di {v:terza specie}.'],
  [86.2, 91.5, 'Aggiungo il punto {g:(2; 4)}: il buco\nsi chiude, è {v:eliminabile}.'],
  // chiusura
  [93.9, 99.2, 'Salto, fuga, buco: lo dicono\ni limiti {x:sinistro} e {v:destro}.'],
];

// un piano con le sue scale (ux, uy) e solo le tacche numerate che non finiscono sotto la curva (xl, yl)
function piano(o) {
  const ux = o.ux || o.u, uy = o.uy || o.u, p = { ...o };
  p.toS = (x, y) => [o.ox + x * ux, o.oy - y * uy];
  p.curve = (f, a, b, n = 200) => { const pts = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push(p.toS(x, f(x))); } return pts; };
  p.axes = (ctx, k) => {
    if (k <= 0) return;
    const { ox, oy, x0, x1, y0, y1 } = o, gx = o.gx || 1;
    ctx.save();
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
    for (let i = Math.ceil(x0 / gx); i * gx <= x1; i++) { if (!i) continue; const x = ox + i * gx * ux; ctx.beginPath(); ctx.moveTo(x, oy - y1 * uy * k); ctx.lineTo(x, oy - y0 * uy * k); ctx.stroke(); }
    for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * uy; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, y); ctx.lineTo(ox + x1 * ux * k, y); ctx.stroke(); }
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * ux * k, oy); ctx.lineTo(ox + x1 * ux * k + 15, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * uy * k); ctx.lineTo(ox, oy - y1 * uy * k - 19); ctx.stroke();
    arrowHead(ctx, [ox + x1 * ux * k + 21, oy], 0, C.ink);
    arrowHead(ctx, [ox, oy - y1 * uy * k - 25], -Math.PI / 2, C.ink);
    ctx.globalAlpha *= P(k, .6, 1);
    (o.xl || []).forEach(i => txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * ux, oy + 32, { size: 31, color: C.dim }));
    (o.yl || []).forEach(j => txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 20, oy - j * uy, { size: 31, color: C.dim, align: 'right' }));
    drawRich(ctx, '{mx:x}', ox + x1 * ux + 53, oy, { size: 44 });
    if (o.ysopra) drawRich(ctx, '{my:y}', ox, oy - y1 * uy - 58, { size: 44 });   // sopra la freccia, lontana dai rami
    else drawRich(ctx, '{my:y}', ox + 30, oy - y1 * uy - 27, { size: 44 });
    ctx.restore();
  };
  return p;
}

const PCARD = [90, 110, 980, 690], RCARD = [1120, 110, 710, 690], RX = 1475;
const CLIP = [PCARD[0] + 8, 140, PCARD[2] - 16, PCARD[1] + PCARD[3] - 148];
const inf = '+∞';
// i tre casi: rami del grafico, da dove partono i due punti che si avvicinano, i valori, il verdetto
const CASI = [
  { nome: 'prima specie', sotto: 'il salto', x0: '1', da: 7.2, a: 34.2, tc: 8.0,
    pl: piano({ ox: 470, oy: 470, u: 100, x0: -3.2, x1: 4.6, y0: -2.6, y1: 3.0, xl: [-3, -2, 1, 3, 4], yl: [-2, -1, 2, 3] }),
    rami: [[x => x + 1, -3, 1], [x => x - 2, 1, 4.4]],
    buchi: [[1, 2]], pieni: [[1, -1]],
    sx: { f: x => x + 1, da: -2.6, a: .85, t: [14.6, 15.5], val: '2', y: 2 },
    dx: { f: x => x - 2, da: 4.1, a: 1.15, t: [21.3, 22.2], val: '−1', y: -1 },
    tv: 27.5, verdetto: 'finiti ma {r:diversi}',
    etichette(ctx, pl, k) {
      const a = pl.toS(-2.3, 1.6), b = pl.toS(3.2, -1.7);
      drawRich(ctx, '{my:y = }{mx:x}{my: + 1}', a[0], a[1], { size: 38, local: k });
      drawRich(ctx, '{my:y = }{mx:x}{my: − 2}', b[0], b[1], { size: 38, local: k - .3 });
    } },
  { nome: 'seconda specie', sotto: 'la fuga', x0: '0', da: 34.0, a: 60.0, tc: 35.4,
    pl: piano({ ox: 580, oy: 740, ux: 160, uy: 95, x0: -2.4, x1: 2.4, y0: -.5, y1: 5.7, gx: .5, xl: [-2, -1, 1, 2], yl: [1, 2, 3, 4, 5], ysopra: true }),
    rami: [[x => 1 / (x * x), -2.35, -.36], [x => 1 / (x * x), .36, 2.35]],
    buchi: [], pieni: [],
    sx: { f: x => 1 / (x * x), da: -2.2, a: -.36, t: [41.7, 42.6], val: inf, y: null },
    dx: { f: x => 1 / (x * x), da: 2.2, a: .36, t: [48.1, 49.0], val: inf, y: null },
    tv: 53.4, verdetto: 'almeno uno {r:infinito}\no {r:non esiste}',
    etichette(ctx, pl, k) {
      const a = pl.toS(1.6, 4.3);
      drawRich(ctx, '{my:y = 1/}{mx:x}{my:²}', a[0], a[1], { size: 42, local: k });
    } },
  { nome: 'terza specie', sotto: 'il buco', x0: '2', da: 59.8, a: FINE, tc: 61.0,
    pl: piano({ ox: 410, oy: 700, u: 85, x0: -1.6, x1: 5.6, y0: -.8, y1: 6.4, xl: [-1, 1, 2, 3, 4, 5], yl: [1, 3, 4, 5, 6] }),
    rami: [[x => x + 2, -1.5, 2], [x => x + 2, 2, 4.3]],
    buchi: [[2, 4]], pieni: [],
    sx: { f: x => x + 2, da: -1.2, a: 1.85, t: [67.5, 68.4], val: '4', y: 4 },
    dx: { f: x => x + 2, da: 4.1, a: 2.15, t: [72.4, 73.3], val: '4', y: 4 },
    tv: 77.7, verdetto: '{g:uguali} e {g:finiti}, ma il\nvalore manca o è diverso', riempi: 85.0,
    etichette(ctx, pl, k) {
      const a = pl.toS(3.75, 1.5);
      drawSeq(ctx, ['{my:y = }', { num: '{mx:x}{my:² − 4}', den: '{mx:x}{my: − 2}' }], a[0], a[1], 40, { local: k });
    } },
];

// il numero colorato sull'asse y, sopra la tacca grigia
function suAsse(ctx, pl, y, s, col, al) {
  if (al <= 0) return;
  const p = pl.toS(0, y);
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(p[0] - 70, p[1] - 22, 60, 44); ctx.restore();
  drawRich(ctx, '{m' + col + ':' + s + '}', p[0] - 16, p[1], { size: 40, align: 'right', alpha: al });
}
// il punto che si avvicina lungo un ramo, con la scia del suo colore
function avvicina(ctx, t, K, L, col, al) {
  const k = P(t, L.t[0], L.t[1], E.io), ka = life(t, L.t[0] - .3, K.a, .3, .6);
  if (ka <= 0) return;
  const x = L.da + (L.a - L.da) * k;
  ctx.save(); ctx.globalAlpha *= al * ka;
  ctx.beginPath(); ctx.rect(...CLIP); ctx.clip();
  glowStroke(ctx, K.pl.curve(L.f, L.da, x, 90), 1, col, 8);
  dot(ctx, K.pl.toS(x, L.f(x)), col, 1, 11);
  ctx.restore();
}

function caso(ctx, t, K) {
  if (t < K.da - .1 || t > K.a + .1) return;
  const al = life(t, K.da, K.a, .5, .6), pl = K.pl;
  ctx.save(); ctx.globalAlpha *= al;
  pl.axes(ctx, P(t, K.da + .2, K.da + 1.0));
  // la curva, a pezzi
  ctx.save(); ctx.beginPath(); ctx.rect(...CLIP); ctx.clip();
  K.rami.forEach(([f, a, b], i) => glowStroke(ctx, pl.curve(f, a, b, 200), P(t, K.tc + i * .45, K.tc + i * .45 + .6), C.y, 6));
  ctx.restore();
  K.etichette(ctx, pl, t - K.tc - 1.0);
  // i due limiti laterali: linea tratteggiata fino all'asse y e il numero colorato
  [[K.sx, 'x', C.x], [K.dx, 'v', C.v]].forEach(([L, ck, col]) => {
    avvicina(ctx, t, K, L, col, 1);
    if (L.y === null) {
      const p = pl.toS(L.da < 0 ? -1.0 : 1.0, 5.6);
      drawRich(ctx, '{m' + ck + ':+∞}', p[0], p[1], { size: 44, alpha: P(t, L.t[1] - .2, L.t[1] + .2) });
      return;
    }
    const kd = P(t, L.t[1] - .25, L.t[1] + .2);
    if (L === K.dx && K.sx.y === L.y) return;   // stesso valore: resta il numero di sinistra
    if (kd > 0) dashed(ctx, pl.toS(Number(K.x0), L.y), pl.toS(0, L.y), col, kd, .9);
    suAsse(ctx, pl, L.y, L.val, ck, kd);
  });
  // buchi e punti pieni sopra le scie
  const kp = P(t, K.tc + .9, K.tc + 1.3, E.back);
  K.pieni.forEach(([x, y]) => dot(ctx, pl.toS(x, y), C.y, kp, 11));
  K.buchi.forEach(([x, y]) => hole(ctx, pl.toS(x, y), C.y, kp, 14));
  if (K.riempi) {
    const kr = P(t, K.riempi, K.riempi + .5, E.back), p = pl.toS(2, 4);
    if (kr > 0) {
      dot(ctx, p, C.g, kr, 13);
      drawRich(ctx, '{mg:(2; 4)}', pl.toS(2.3, 3.25)[0], pl.toS(2.3, 3.25)[1], { size: 38, align: 'left', local: t - K.riempi - .2 });
    }
  }
  ctx.restore();

  // la scheda dei limiti laterali
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'limiti laterali in {mink:' + K.x0 + '}', RX, 180, { size: 42, weight: 600 }));
  [[K.sx, '{x:da sinistra}', 'x', 300], [K.dx, '{v:da destra}', 'v', 390]].forEach(([L, lab, ck, y]) => {
    const k = P(t, L.t[1] - .2, L.t[1] + .2);
    drawRich(ctx, lab, 1175, y, { size: 42, align: 'left', alpha: P(t, L.t[0] - .3, L.t[0]) });
    drawRich(ctx, '{mink:→ }{m' + ck + ':' + L.val + '}', 1780, y, { size: 48, align: 'right', alpha: k });
  });
  const kv = P(t, K.tv, K.tv + .4);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1165, 455); ctx.lineTo(1785, 455); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, K.verdetto, RX, 530, { size: 42, local: t - K.tv });
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:' + K.nome + '}', RX, 650, { size: 58, weight: 600, local: t - K.tv - .4 });
    drawRich(ctx, '{dim:' + K.sotto + '}', RX, 728, { size: 38, weight: 500, local: t - K.tv - .6 });
  });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Tre modi di rompersi', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

function sceneSchede(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  card(ctx, ...RCARD, al);
}

// 4 · in una frase
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 99.6, 100.6);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La specie si legge dai due\n{v:limiti laterali}.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[475, '{v:prima specie}\nfiniti e diversi'], [960, '{v:seconda specie}\nalmeno uno infinito\no non esiste'], [1445, '{v:terza specie}\nuguali e finiti, ma il\nvalore manca o è diverso']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, s, x, 520, { size: 32, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Tre modi di rompersi', durata: 102, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, 34.1, 'il salto'], [34.1, 60.0, 'la fuga'], [60.0, FINE, 'il buco']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSchede(ctx, t); CASI.forEach(K => caso(ctx, t, K)); sceneFine(ctx, t); },
  };
});
