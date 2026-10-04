'use strict';
/* Gli asintoti — verticale e orizzontale su y = (3x − 1)/(x + 2): vicino a −2 la curva fugge, lontano si stende su y = 3. Argomento: continuita-asintoti. */
CVIDEO.registra('continuita-asintoti/asintoti', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, arrowHead, card } = M;

const FINE = 64.0;
const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [16.0, 'sorpreso'], [18.2, 'neutro'], [27.6, 'felice'], [29.8, 'neutro'],
  [45.6, 'felice'], [47.8, 'neutro'], [52.3, 'festa'], [54.8, 'neutro'],
  [65.4, 'felice'], [68.2, 'occhiolino'], [70.2, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [1.9, 6.3, 'Una curva può inseguire\nuna retta {v:per sempre}?'],
  // 1 · verticale
  [9.2, 14.5, 'La funzione non esiste in {mink:−2}:\nlì si annulla il denominatore.'],
  [16.0, 21.0, 'Da sinistra, vicino a {mink:−2},\nla curva sale a {x:+∞}.'],
  [22.4, 26.2, 'Da destra scende a {x:−∞}.'],
  [27.6, 32.4, 'La retta {mv:x = −2} è un\n{v:asintoto verticale}.'],
  [32.5, 38.4, 'La curva le si avvicina sempre\ndi più, ma non la tocca mai.'],
  // 2 · orizzontale
  [40.0, 44.4, 'Mando {mx:x} lontano a destra:\n10, 100, 1000…'],
  [45.6, 50.9, 'I valori si avvicinano a {g:3},\nma non ci arrivano mai.'],
  [52.3, 57.0, 'La retta {mv:y = 3} è un\n{v:asintoto orizzontale}.'],
  [58.4, 63.7, 'Anche a sinistra i valori\nsi avvicinano a {g:3}, da sopra.'],
  // chiusura
  [65.4, 71.4, 'Verticale dove un limite laterale\nè infinito, orizzontale all\'infinito.'],
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

const f = x => (3 * x - 1) / (x + 2);
const PCARD = [90, 110, 1100, 690], RCARD = [1240, 110, 590, 690], RX = 1535;
const CLIP = [PCARD[0] + 8, PCARD[1] + 8, PCARD[2] - 16, PCARD[3] - 16];
const PL = piano({ ox: 624, oy: 560, u: 44, x0: -11, x1: 9, y0: -4.9, y1: 9, xl: [-10, -8, -6, -4, 2, 4, 6, 8], yl: [2, 4, 6, 8] });
const SX = PL.curve(f, -11, -2.3, 300), DX = PL.curve(f, -1.7, 9, 300);

function clip(ctx) { ctx.beginPath(); ctx.rect(...CLIP); ctx.clip(); }
// un asintoto tratteggiato che si disegna da a verso b
function asintoto(ctx, a, b, k, al) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.setLineDash([16, 12]);
  ctx.shadowColor = css(C.v, .6); ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); ctx.stroke(); ctx.restore();
}
// il punto che corre lungo la curva fra due ascisse, con o senza scia
function corsa(ctx, t, da, a, t0, t1, scia, al) {
  if (al <= 0 || t < t0 - .3) return;
  const x = da + (a - da) * P(t, t0, t1, E.io);
  ctx.save(); ctx.globalAlpha *= al * P(t, t0 - .3, t0); clip(ctx);
  if (scia) glowStroke(ctx, PL.curve(f, da, x, 120), 1, C.x, 8);
  dot(ctx, PL.toS(x, f(x)), C.x, 1, 11);
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Gli asintoti', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

function sceneGrafico(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al); card(ctx, ...RCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  PL.axes(ctx, P(t, 7.4, 8.2));
  // gli asintoti, sotto la curva
  const v = PL.toS(-2, 0);
  asintoto(ctx, [v[0], CLIP[1] + CLIP[3]], [v[0], CLIP[1]], P(t, 26.4, 27.2), 1);
  asintoto(ctx, PL.toS(-11, 3), PL.toS(9, 3), P(t, 51.1, 52.0), 1);
  ctx.save(); clip(ctx);
  glowStroke(ctx, SX, P(t, 8.0, 8.6), C.y, 6);
  glowStroke(ctx, DX, P(t, 8.4, 9.0), C.y, 6);
  ctx.restore();
  // nomi delle rette e della curva
  const fl = PL.toS(4.6, 7.4);
  drawSeq(ctx, ['{my:y = }', { num: '{my:3}{mx:x}{my: − 1}', den: '{mx:x}{my: + 2}' }], fl[0], fl[1], 40, { local: t - 8.8 });
  drawRich(ctx, '{mv:x = −2}', v[0] - 14, 742, { size: 40, align: 'right', local: t - 27.0 });
  // la tacca −2: si vede finché non arriva l'asintoto, che le passerebbe sopra
  txt(ctx, '−2', v[0], PL.oy + 30, { size: 31, color: C.dim, alpha: P(t, 7.9, 8.2) * (1 - P(t, 26.3, 26.6)) });
  drawRich(ctx, '{mv:y = 3}', PL.toS(7.2, 3)[0], PL.toS(7.2, 3)[1] - 34, { size: 40, local: t - 51.8 });

  // 1 · vicino a −2: i due punti con la scia, poi +∞ e −∞
  const a1 = 1 - P(t, 38.4, 39.0);
  corsa(ctx, t, -9, -2.38, 14.6, 15.7, true, a1);
  corsa(ctx, t, 3, -1.62, 21.1, 22.2, true, a1);
  drawRich(ctx, '{mx:+∞}', PL.toS(-5, 8.3)[0], PL.toS(-5, 8.3)[1], { size: 46, alpha: a1 * P(t, 15.5, 15.8) });
  drawRich(ctx, '{mx:−∞}', PL.toS(1.4, -4.1)[0], PL.toS(1.4, -4.1)[1], { size: 46, alpha: a1 * P(t, 22.0, 22.3) });
  // 2 · lontano: il punto corre a destra, poi a sinistra
  corsa(ctx, t, 1, 8.8, 38.9, 39.8, false, 1 - P(t, 57.0, 57.4));
  corsa(ctx, t, -4, -10.8, 57.2, 58.2, false, 1 - P(t, FINE - .6, FINE));
  ctx.restore();
}

function riga(ctx, sx, sy, y, al) {
  if (al <= 0) return;
  txt(ctx, sx, 1390, y, { size: 40, color: C.x, alpha: al });
  txt(ctx, sy, 1680, y, { size: 40, color: C.y, alpha: al });
}
function sceneScheda(ctx, t) {
  if (t < 9 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= life(t, 7.2, FINE, .6, .6);
  // 1 · vicino a −2
  const a1 = life(t, 14.2, 38.6, .4, .5);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'vicino a {mink:−2}', RX, 180, { size: 44, weight: 600 }));
    drawRich(ctx, 'da sinistra', 1290, 300, { size: 40, align: 'left' });
    drawRich(ctx, '{mink:→ }{mx:+∞}', 1780, 300, { size: 48, align: 'right', alpha: P(t, 15.5, 15.8) });
    drawRich(ctx, 'da destra', 1290, 390, { size: 40, align: 'left', alpha: P(t, 21.0, 21.3) });
    drawRich(ctx, '{mink:→ }{mx:−∞}', 1780, 390, { size: 48, align: 'right', alpha: P(t, 22.0, 22.3) });
    const kv = P(t, 26.8, 27.2);
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1285, 455); ctx.lineTo(1785, 455); ctx.stroke(); ctx.restore();
    conFont(TITOLI, () => drawRich(ctx, '{v:asintoto verticale}', RX, 560, { size: 46, weight: 600, local: t - 26.8 }));
    drawRich(ctx, '{mv:x = −2}', RX, 660, { size: 60, local: t - 27.2 });
    ctx.restore();
  }
  // 2 · lontano a destra, poi a sinistra
  const a2 = life(t, 38.5, FINE, .5, .6);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    const ds = 1 - P(t, 57.1, 57.5), sn = P(t, 57.5, 57.9);
    conFont(TITOLI, () => {
      drawRich(ctx, 'lontano a destra', RX, 180, { size: 44, weight: 600, alpha: ds });
      drawRich(ctx, 'lontano a sinistra', RX, 180, { size: 44, weight: 600, alpha: sn });
    });
    drawRich(ctx, '{mx:x}', 1390, 255, { size: 42 });
    drawRich(ctx, '{my:y}', 1680, 255, { size: 42 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1285, 290); ctx.lineTo(1785, 290); ctx.moveTo(1535, 225); ctx.lineTo(1535, 500); ctx.stroke();
    [['10', '2,417'], ['100', '2,931'], ['1000', '2,993']].forEach(([a, b], i) => riga(ctx, a, b, 345 + i * 60, P(t, 39.0 + i * .3, 39.4 + i * .3) * ds));
    [['−10', '3,875'], ['−100', '3,071'], ['−1000', '3,007']].forEach(([a, b], i) => riga(ctx, a, b, 345 + i * 60, P(t, 57.5 + i * .25, 57.9 + i * .25)));
    drawRich(ctx, '{my:y}{mink: → }{mg:3}', RX, 570, { size: 54, local: t - 44.6 });
    conFont(TITOLI, () => drawRich(ctx, '{v:asintoto orizzontale}', RX, 670, { size: 44, weight: 600, local: t - 51.6 }));
    drawRich(ctx, '{mv:y = 3}', RX, 742, { size: 50, local: t - 52.0 });
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 72.0, 73.0);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un asintoto è una retta a cui\nla curva si avvicina {v:senza fine}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[690, '{v:verticale}  {mv:x = −2}\nun limite laterale è infinito'], [1230, '{v:orizzontale}  {mv:y = 3}\nper {mx:x} che va all\'infinito']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 250, 450, 500, 120);
    drawRich(ctx, s, x, 510, { size: 32, weight: 400, lh: 1.45 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Gli asintoti', durata: 74.2, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, 38.4, 'l\'asintoto verticale'], [38.4, FINE, 'l\'asintoto orizzontale']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
