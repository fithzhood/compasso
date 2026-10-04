'use strict';
/* L'asintoto obliquo — f(x) = (x² + 1)/(x − 1) si stende lungo y = x + 1: prima la pendenza m = lim f(x)/x, poi q = lim (f(x) − mx). Argomento: continuita-asintoti. */
CVIDEO.registra('continuita-asintoti/asintoto-obliquo', M => {
  const { W, C, E, P, life, kf, css, mix, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, arrowHead, card } = M;

const FINE = 94.6;
const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [15.6, 'sorpreso'], [17.8, 'neutro'], [20.0, 'pensa'], [22.4, 'neutro'],
  [48.4, 'felice'], [50.6, 'neutro'], [54.6, 'felice'], [56.8, 'neutro'],
  [74.7, 'felice'], [76.9, 'neutro'], [87.6, 'festa'], [90.2, 'neutro'],
  [96.0, 'felice'], [98.6, 'occhiolino'], [100.6, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [1.9, 6.3, 'Una curva può avvicinarsi\na una retta {v:inclinata}?'],
  // 1 · la retta inclinata
  [9.2, 14.2, 'Ecco il grafico di {mink:f}.\nGuarda che cosa fa lontano.'],
  [15.6, 19.9, 'Lontano si stende lungo\nuna retta {v:inclinata}.'],
  [20.0, 25.0, 'È un {v:asintoto obliquo}:\ncome si trova la sua equazione?'],
  [26.0, 32.8, 'Una retta è {mink:y = mx + q}: {mink:m} è\nla pendenza, {mink:q} il termine noto.'],
  // 2 · la pendenza m
  [34.0, 39.3, 'Prendo un punto {mink:P} della curva\ne lo unisco all\'origine.'],
  [40.5, 46.4, 'Il segmento sale di {mink:f(}{mx:x}{mink:)} e avanza\ndi {mx:x}: pendenza {mink:f(}{mx:x}{mink:)/}{mx:x}.'],
  [48.4, 53.4, 'Allontano {mink:P}: la pendenza\nsi avvicina a {g:1}.'],
  [54.6, 60.2, 'Quindi {mink:m} è il limite di {mink:f(}{mx:x}{mink:)/}{mx:x}:\nqui {mg:m = 1}.'],
  // 3 · il termine noto q
  [61.6, 67.2, 'Disegno la retta {mink:y = }{mx:x}:\nha la pendenza {g:1} appena trovata.'],
  [68.2, 73.5, 'Il tratto {g:verde} fra curva e retta\nè {mink:f(}{mx:x}{mink:) − }{mx:x}.'],
  [74.8, 79.2, 'Allontano {mink:P}: il tratto\nsi avvicina a {g:1}.'],
  [80.4, 86.3, 'Quindi {mink:q} è il limite di {mink:f(}{mx:x}{mink:) − m}{mx:x}:\nqui {mg:q = 1}.'],
  [87.6, 94.4, 'Alzata di {g:1}, la retta {mink:y = }{mx:x}\ncoincide con l\'asintoto: {mv:y = x + 1}.'],
  // chiusura
  [96.0, 101.8, 'Lontano la curva è quasi una retta:\nprima {mink:m}, poi {mink:q}.'],
];

// un piano con le sole tacche numerate che non finiscono sotto la curva (xl, yl)
function piano(o) {
  const u = o.u, p = { ...o };
  p.toS = (x, y) => [o.ox + x * u, o.oy - y * u];
  p.curve = (f, a, b, n = 200) => { const pts = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push(p.toS(x, f(x))); } return pts; };
  p.axes = (ctx, k) => {
    if (k <= 0) return;
    const { ox, oy, x0, x1, y0, y1 } = o;
    ctx.save();
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
    for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
    for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox + x0 * u * k - 5, oy); ctx.lineTo(ox + x1 * u * k + 15, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - y0 * u * k + 5); ctx.lineTo(ox, oy - y1 * u * k - 19); ctx.stroke();
    arrowHead(ctx, [ox + x1 * u * k + 21, oy], 0, C.ink);
    arrowHead(ctx, [ox, oy - y1 * u * k - 25], -Math.PI / 2, C.ink);
    ctx.globalAlpha *= P(k, .6, 1);
    (o.xl || []).forEach(i => txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * u, oy + 30, { size: 31, color: C.dim }));
    (o.yl || []).forEach(j => txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 18, oy - j * u, { size: 31, color: C.dim, align: 'right' }));
    drawRich(ctx, '{mx:x}', ox + x1 * u + 53, oy, { size: 44 });
    drawRich(ctx, '{my:y}', ox + 30, oy - y1 * u - 27, { size: 44 });
    ctx.restore();
  };
  return p;
}

const f = x => (x * x + 1) / (x - 1);
const PCARD = [90, 110, 820, 690], RCARD = [960, 110, 870, 690], RX = 1395;
const CLIP = [98, 160, 804, 632];
const PL = piano({ ox: 360, oy: 614, u: 40, x0: -5.5, x1: 10.5, y0: -4.4, y1: 11.2, xl: [-4, 4, 6, 8, 10], yl: [2, 4, 6, 8, 10] });
const SX = PL.curve(f, -5.5, .69, 300), DX = PL.curve(f, 1.21, 10.5, 300);
function clip(ctx) { ctx.beginPath(); ctx.rect(...CLIP); ctx.clip(); }
function retta(ctx, m, q, col, k, w, al, tratt) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; clip(ctx);
  const a = PL.toS(-5.6, m * -5.6 + q), b = PL.toS(10.6, m * 10.6 + q);
  if (tratt) {
    ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.setLineDash([16, 12]);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); ctx.stroke();
  } else glowStroke(ctx, [a, b], k, col, w);
  ctx.restore();
}
// dove sta P: in 2 corre lontano; sparisce; in 3 riparte da 4 e corre lontano
const xP = t => t < 60.6 ? kf(t, [[46.5, 2.5], [47.8, 9.5]]) : kf(t, [[73.6, 4], [74.6, 9.5]]);
const aP = t => life(t, 33.0, 60.6, .4, .4) + life(t, 67.3, 87.5, .4, .5);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'L\'asintoto obliquo', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

function sceneGrafico(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al); card(ctx, ...RCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  PL.axes(ctx, P(t, 7.4, 8.2));
  // l'asintoto tratteggiato, la retta y = x che poi sale di 1
  retta(ctx, 1, 1, C.v, P(t, 14.3, 15.3), 4, 1, true);
  const sale = P(t, 86.4, 87.4);
  retta(ctx, 1, sale, mix(C.x, C.v, sale), P(t, 60.3, 61.3), 5, 1, false);
  ctx.save(); clip(ctx);
  glowStroke(ctx, SX, P(t, 8.0, 8.7), C.y, 6);
  glowStroke(ctx, DX, P(t, 8.4, 9.1), C.y, 6);
  ctx.restore();
  const fl = PL.toS(6.4, -2.6);
  drawSeq(ctx, ['{my:f(}{mx:x}{my:) = }', { num: '{mx:x}{my:² + 1}', den: '{mx:x}{my: − 1}' }], fl[0], fl[1], 40, { local: t - 9.0 });
  const lb = PL.toS(6.8, 3.4);   // sotto la retta, a destra: vicina ma libera da retta e curva
  drawRich(ctx, '{mv:y = x + 1}', lb[0], lb[1], { size: 40, local: t - 87.3 });

  // P, il segmento dall'origine (2), il tratto verde (3)
  const ap = aP(t);
  if (ap > 0) {
    const x = xP(t), Pp = PL.toS(x, f(x)), O = PL.toS(0, 0);
    ctx.save(); ctx.globalAlpha *= ap;
    const ks = P(t, 33.0, 33.8);
    if (t < 60.7 && ks > 0) {
      // i due cateti: avanza di x (orizzontale), sale di f(x) (verticale)
      const kc = P(t, 40.4, 41.0) * (1 - P(t, 46.4, 46.8));
      if (kc > 0) {
        const H = PL.toS(x, 0);
        ctx.save(); ctx.globalAlpha *= kc; ctx.lineCap = 'round'; ctx.lineWidth = 6;
        ctx.strokeStyle = css(C.x); ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(H[0], H[1]); ctx.stroke();
        ctx.strokeStyle = css(C.y); ctx.beginPath(); ctx.moveTo(H[0], H[1]); ctx.lineTo(Pp[0], Pp[1]); ctx.stroke();
        ctx.restore();
        drawRich(ctx, '{mx:x}', (O[0] + H[0]) / 2, O[1] + 34, { size: 42, alpha: kc });
        drawRich(ctx, '{my:f(}{mx:x}{my:)}', H[0] + 16, (H[1] + Pp[1]) / 2, { size: 42, align: 'left', alpha: kc });
      }
      glowStroke(ctx, [O, Pp], ks, C.x, 5);
      dot(ctx, O, C.ink, 1, 8);
    }
    if (t > 67.3) {
      const kt = P(t, 67.3, 67.9), Q = PL.toS(x, x);
      ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 8; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(Q[0], Q[1]); ctx.lineTo(Q[0], Q[1] + (Pp[1] - Q[1]) * kt); ctx.stroke(); ctx.restore();
    }
    dot(ctx, Pp, C.y, 1, 11);
    drawRich(ctx, '{mink:P}', Pp[0], Pp[1] - 44, { size: 40 });
    ctx.restore();
  }
  ctx.restore();
}

function righe(ctx, t, intest, dati, t0, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mx:x}', 1190, 405, { size: 42 });
  drawRich(ctx, intest, 1590, 405, { size: 42 });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1010, 440); ctx.lineTo(1780, 440); ctx.moveTo(1385, 375); ctx.lineTo(1385, 620); ctx.stroke();
  dati.forEach(([a, b], i) => {
    const k = P(t, t0 + i * .3, t0 + i * .3 + .4);
    txt(ctx, a, 1190, 484 + i * 54, { size: 44, color: C.x, alpha: k });
    txt(ctx, b, 1590, 484 + i * 54, { size: 44, color: i === 2 ? C.g : C.ink, weight: i === 2 ? 600 : 500, alpha: k });
  });
  ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 24 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= life(t, 7.2, FINE, .6, .6);
  // la retta cercata, in alto; alla fine diventa y = x + 1
  const fin = P(t, 87.1, 87.5);
  drawRich(ctx, '{mink:y = m}{mx:x}{mink: + q}', RX, 175, { size: 60, local: t - 25.1, alpha: 1 - fin });
  drawRich(ctx, '{mv:y = x + 1}', RX, 175, { size: 60, alpha: fin });
  const kl = P(t, 39.4, 39.8);
  ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1010, 235); ctx.lineTo(1780, 235); ctx.stroke(); ctx.restore();
  // 2 · la pendenza
  const a2 = life(t, 39.4, 60.4, .4, .4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    drawSeq(ctx, ['pendenza {mink:=}', { num: '{mink:f(}{mx:x}{mink:)}', den: '{mx:x}' }], RX, 300, 44, { local: t - 39.4 });
    righe(ctx, t, '{mink:f(}{mx:x}{mink:)/}{mx:x}', [['10', '1,122'], ['100', '1,010'], ['1000', '1,001']], 46.9, 1);
    drawSeq(ctx, ['{mink:m =}', { lim: '{mx:x}{mink:→+∞}' }, { num: '{mink:f(}{mx:x}{mink:)}', den: '{mx:x}' }, '{mink:=}', '{mg:1}'], RX, 690, 44, { local: (t - 53.45) * 2 });
    ctx.restore();
  }
  // 3 · il termine noto
  const a3 = life(t, 67.3, FINE, .4, .6);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    drawRich(ctx, '{g:tratto}{mink: = f(}{mx:x}{mink:) − }{mx:x}', RX, 300, { size: 46, local: t - 67.3 });
    righe(ctx, t, '{mink:f(}{mx:x}{mink:) − }{mx:x}', [['10', '1,222'], ['100', '1,020'], ['1000', '1,002']], 73.7, 1);
    drawSeq(ctx, ['{mink:q =}', { lim: '{mx:x}{mink:→+∞}' }, '{mink:(f(}{mx:x}{mink:) − m}{mx:x}{mink:)}', '{mink:=}', '{mg:1}'], RX, 690, 44, { local: (t - 79.25) * 2 });
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 102.4, 103.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Prima la pendenza {mv:m},\npoi il termine noto {mv:q}.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [500, ['{mink:m =}', { lim: '{mx:x}{mink:→+∞}' }, { num: '{mink:f(}{mx:x}{mink:)}', den: '{mx:x}' }]],
    [1000, ['{mink:q =}', { lim: '{mx:x}{mink:→+∞}' }, '{mink:(f(}{mx:x}{mink:) − m}{mx:x}{mink:)}']],
    [1450, ['{mv:y = x + 1}']],
  ];
  const larg = [400, 560, 300];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - larg[i] / 2, 450, larg[i], 140);
    drawSeq(ctx, s, x, 515, 40);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L\'asintoto obliquo', durata: 104.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, 32.8, 'una retta inclinata'], [32.8, 60.2, 'la pendenza {mink:m}'], [60.2, FINE, 'il termine noto {mink:q}']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
