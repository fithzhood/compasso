'use strict';
/* Verso l'infinito — 1/x per x che cresce (tende a 0) e per x che si avvicina a 0 da destra (tende a +∞);
   i due assi come asintoti. Argomento: limiti. Era l'ultima parte di VideoFunzione/limiti-video.js. */
CVIDEO.registra('limiti/infinito', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, drawLim, glowStroke, makePlane,
    traveler, arrowHead, card } = M;

const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [54.3, 190], [55.6, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [54.3, 1050], [55.6, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [54.3, 2.2], [55.6, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [54.3, 2], [55.6, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [54.3, -1.5], [55.6, -2]],
};
// le facce cambiano al massimo una volta ogni 2 s
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.45, 'pensa'], [6.4, 'neutro'],
  [17.5, 'felice'], [19.5, 'neutro'], [28.8, 'pensa'], [32.7, 'neutro'],
  [38.4, 'sorpreso'], [40.4, 'neutro'], [48.8, 'felice'], [50.8, 'neutro'],
  [60.1, 'felice'], [62.1, 'neutro'], [64.1, 'occhiolino'],
];
const FUMETTI = [
  [1.4, 6.4, 'Dove va {my:1/}{mx:x} per {mx:x} enorme\no vicino a 0?'],
  // 1 · x sempre più grande
  [7.9, 12.3, 'Ecco il grafico di {my:1/}{mx:x},\nper {mx:x} positivo.'],
  [12.4, 17.4, 'Faccio crescere {mx:x}: 1, poi 10,\npoi 100, poi 1000…'],
  [17.5, 22.5, '{my:1/}{mx:x} si schiaccia verso {g:0}:\nsempre più vicino, mai uguale.'],
  [22.6, 28.5, 'Si scrive così: il limite per {mx:x}\nche tende a {mink:+∞} è {g:0}.'],
  // 2 · x vicino a 0
  [28.8, 32.6, 'E vicino a 0, da destra?'],
  [32.7, 38.3, '{mx:x} si avvicina a 0: 1, poi 0,1,\npoi 0,01, poi 0,001…'],
  [38.4, 42.5, '{my:1/}{mx:x} cresce senza fine:\nsupera qualunque numero.'],
  [42.6, 48.5, 'Il limite per {mx:x} che tende a 0\nda destra è {v:più infinito}.'],
  // 3 · gli asintoti
  [48.8, 54.1, 'La curva si avvicina ai due assi\nsenza toccarli: sono {v:asintoti}.'],
  // chiusura
  [55.0, 60.0, 'L\'infinito può stare in {mx:x}\no nel risultato del limite.'],
  [60.1, 65.7,'Il limite dice dove va la curva,\nanche quando {v:non si ferma}.'],
];

const PCARD = [90, 110, 1060, 690], DCARD = [1210, 110, 630, 690];
const f = x => 1 / x;
// piano largo (capitoli 1 e 3): stessa unità sui due assi
const PL = makePlane({ ox: 330, oy: 700, u: 75, x0: -.3, x1: 10.2, y0: -.5, y1: 7 });
const CURVA = PL.curve(f, 1 / 6.8, 10.2, 400);
// piano stretto e alto (capitolo 2): x fino a 1,25, y fino a 12, così 0,1 → 10 si vede davvero
const Q = { ox: 230, oy: 700, ux: 680, uy: 45, top: 12.4 };
const QS = (x, y) => [Q.ox + x * Q.ux, Q.oy - y * Q.uy];
const QP = { toS: QS };
const QC = []; for (let i = 0; i <= 300; i++) { const x = lerp(1 / Q.top, 1.25, (i / 300) ** 2); QC.push(QS(x, f(x))); }

const RIGHE_1 = [[12.8, '1', '1'], [14.4, '10', '0,1'], [15.3, '100', '0,01'], [16.3, '1000', '0,001']];
const RIGHE_2 = [[32.9, '1', '1'], [34.9, '0,1', '10'], [36.4, '0,01', '100'], [37.4, '0,001', '1000']];
const x1 = t => kf(t, [[13.0, 1], [14.4, 10], [14.6, 10], [15.3, 13]]);
const x2 = t => kf(t, [[33.9, 1], [34.9, .1], [35.6, .1], [36.4, .07]]);

function tabella(ctx, t, righe, titolo, a, b) {
  const al = life(t, a, b, .5, .5);
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, titolo, 1525, 165, { size: 38 });
  drawRich(ctx, '{mx:x}', 1410, 235, { size: 40 });
  drawRich(ctx, '{my:1/}{mx:x}', 1650, 235, { size: 40 });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1260, 265); ctx.lineTo(1790, 265); ctx.moveTo(1525, 205); ctx.lineTo(1525, 500); ctx.stroke();
  righe.forEach(([tr, xa, ya], i) => {
    const k = P(t, tr - .1, tr + .4, E.out); if (k <= 0) return;
    txt(ctx, xa, 1410, 310 + i * 52, { size: 40, color: C.x, alpha: k });
    txt(ctx, ya, 1650, 310 + i * 52, { size: 40, color: C.y, alpha: k });
  });
  ctx.restore();
}
function asintoto(ctx, a, b, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .8); ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.shadowColor = css(col, .8); ctx.shadowBlur = 18;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
// assi del piano stretto, disegnati a mano perché le due unità sono diverse
function assiQ(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (const xv of [.5, 1]) { ctx.beginPath(); ctx.moveTo(QS(xv, 0)[0], QS(0, -.4)[1]); ctx.lineTo(QS(xv, 0)[0], QS(0, Q.top)[1]); ctx.stroke(); }
  for (const yv of [5, 10]) { ctx.beginPath(); ctx.moveTo(QS(-.03, 0)[0], QS(0, yv)[1]); ctx.lineTo(QS(1.25, 0)[0], QS(0, yv)[1]); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(QS(-.04, 0)[0], Q.oy); ctx.lineTo(QS(1.27, 0)[0], Q.oy); ctx.moveTo(Q.ox, QS(0, -.6)[1]); ctx.lineTo(Q.ox, QS(0, Q.top + .2)[1]); ctx.stroke();
  arrowHead(ctx, [QS(1.27, 0)[0] + 6, Q.oy], 0, C.ink);
  arrowHead(ctx, [Q.ox, QS(0, Q.top + .2)[1] - 6], -Math.PI / 2, C.ink);
  txt(ctx, '0,5', QS(.5, 0)[0], Q.oy + 32, { size: 31, color: C.dim });
  txt(ctx, '1', QS(1, 0)[0], Q.oy + 32, { size: 31, color: C.dim });
  txt(ctx, '5', Q.ox - 20, QS(0, 5)[1], { size: 31, color: C.dim, align: 'right' });
  txt(ctx, '10', Q.ox - 20, QS(0, 10)[1], { size: 31, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', QS(1.27, 0)[0] + 4, Q.oy + 36, { size: 44 });
  drawRich(ctx, '{my:y}', Q.ox - 34, QS(0, Q.top + .2)[1] + 4, { size: 44 });
  ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, "Verso l'infinito", W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1–3 · il grafico di 1/x (7.5–54.3)
function sceneCurva(ctx, t) {
  if (t < 7.5 || t > 54.9) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 54.1, 54.8);
  card(ctx, ...PCARD, P(t, 7.6, 8.2));
  // piano largo: capitolo 1 e capitolo 3
  const largo = (1 - P(t, 28.7, 29.3)) + P(t, 48.8, 49.4);
  if (largo > 0) {
    ctx.save(); ctx.globalAlpha *= Math.min(1, largo);
    PL.axes(ctx, P(t, 7.8, 8.8));
    const ah = life(t, 17.6, 28.7, .6, .4) * (t < 22.6 ? 1 : .45) + P(t, 49.0, 49.6);
    asintoto(ctx, PL.toS(0, 0), PL.toS(10.2, 0), C.g, Math.min(1, ah) * (.75 + .25 * Math.sin(t * 3)));
    asintoto(ctx, PL.toS(0, 0), PL.toS(0, 7), C.v, P(t, 49.0, 49.6) * (.75 + .25 * Math.sin(t * 3)));
    glowStroke(ctx, CURVA, P(t, 8.8, 10.6), C.y);
    if (t > 10.4 && t < 30) drawRich(ctx, '{my:y = 1/}{mx:x}', PL.toS(.75, 5.6)[0], PL.toS(.75, 5.6)[1], { size: 42, align: 'left', local: t - 10.4 });
    // il punto che corre verso destra; quando esce, il valore va sulla freccia del bordo
    const xv = x1(t), tr = life(t, 12.6, 28.6, .4, .5) * clamp((10.6 - xv) / .4);
    if (tr > 0) traveler(ctx, PL, Math.min(xv, 10.6), f, C.x, tr);
    const e1 = life(t, 15.3, 16.3, .3, .3), e2 = life(t, 16.3, 28.6, .3, .5);
    if (e1 > 0) drawRich(ctx, '{mx:x}{mink: = 100 →}', PL.toS(8.4, .8)[0], PL.toS(8.4, .8)[1], { size: 36, alpha: e1 });
    if (e2 > 0) drawRich(ctx, '{mx:x}{mink: = 1000 →}', PL.toS(8.4, .8)[0], PL.toS(8.4, .8)[1], { size: 36, alpha: e2 });
    // capitolo 3: i nomi dei due asintoti, accanto ai loro assi
    const na = P(t, 49.2, 49.8);
    if (na > 0) {
      // dentro il piano, in alto accanto all'asse y: lontana dai numeri dell'asse e dalla curva (in y = 6 la curva sta a x ≈ 0,17)
      drawRich(ctx, '{v:asintoto }{mv:x = 0}', PL.toS(.65, 0)[0], PL.toS(0, 6)[1], { size: 34, align: 'left', alpha: na });
      drawRich(ctx, '{g:asintoto }{mg:y = 0}', PL.toS(6.2, 0)[0], PL.oy + 78, { size: 34, alpha: na });
    }
    ctx.restore();
  }
  // piano stretto: capitolo 2
  const stretto = P(t, 29.0, 29.6) * (1 - P(t, 48.7, 49.2));
  if (stretto > 0) {
    ctx.save(); ctx.globalAlpha *= stretto;
    assiQ(ctx, 1);
    asintoto(ctx, QS(0, 0), QS(0, Q.top), C.v, life(t, 38.5, 49.0, .6, .3) * (t < 42.6 ? 1 : .5) * (.75 + .25 * Math.sin(t * 3)));
    ctx.save(); ctx.beginPath(); ctx.rect(PCARD[0], QS(0, Q.top)[1], PCARD[2], 700); ctx.clip();
    glowStroke(ctx, QC, 1, C.y);
    ctx.restore();
    const xv = x2(t), tr = life(t, 32.9, 48.6, .4, .4) * clamp((12.2 - f(xv)) / 1.2);
    if (tr > 0) traveler(ctx, QP, xv, f, C.x, tr);
    // quando il punto esce dall'alto, il valore si legge sulla freccia
    const top = QS(1 / Q.top, Q.top)[1], ex = QS(1 / Q.top, 0)[0];
    const fa = life(t, 36.0, 48.6, .3, .4);
    if (fa > 0) {
      ctx.save(); ctx.globalAlpha *= fa; arrowHead(ctx, [ex, top - 8], -Math.PI / 2, C.y, 1.3); ctx.restore();
      drawRich(ctx, '{my:1/}{mx:x}{mink: = 100}', ex + 22, top + 12, { size: 34, align: 'left', alpha: life(t, 36.0, 37.4, .3, .3) });
      drawRich(ctx, '{my:1/}{mx:x}{mink: = 1000}', ex + 22, top + 12, { size: 34, align: 'left', alpha: life(t, 37.4, 48.6, .3, .4) });
    }
    ctx.restore();
  }

  // la scheda: due tabelle, poi i due limiti
  card(ctx, ...DCARD, life(t, 12.4, 54.1, .5, .5));
  tabella(ctx, t, RIGHE_1, '{mx:x} cresce', 12.5, 29.0);
  tabella(ctx, t, RIGHE_2, '{mx:x} si avvicina a 0', 29.2, 54.1);
  const r1 = life(t, 17.6, 29.0, .5, .5);
  if (r1 > 0) drawRich(ctx, '{my:1/}{mx:x}{mink: → }{mg:0}', 1525, 560, { size: 48, alpha: r1, local: t - 17.6 });
  const r2 = life(t, 38.5, 54.1, .5, .5);
  if (r2 > 0) drawRich(ctx, '{my:1/}{mx:x}{mink: → }{mv:+∞}', 1525, 560, { size: 48, alpha: r2, local: t - 38.5 });
  drawLim(ctx, '{mx:x}{mink:→+∞}', '{my:1/}{mx:x}{mink: = }{mg:0}', 1525, 680, { size: 56, local: t - 22.8, alpha: life(t, 22.8, 29.0, .5, .5) });
  drawLim(ctx, '{mx:x}{mink:→0⁺}', '{my:1/}{mx:x}{mink: = }{mv:+∞}', 1525, 680, { size: 56, local: t - 42.8, alpha: life(t, 42.8, 54.1, .5, .5) });
  ctx.restore();
}

// 4 · in una frase (54.3–68)
function sceneFine(ctx, t) {
  if (t < 54.5) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 66.6, 67.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 55.0 });
    drawRich(ctx, '{mx:x} può tendere a {mv:+∞},\ne anche {my:1/}{mx:x} può tendere a {mv:+∞}.', W / 2, 300, { size: 64, weight: 600, local: t - 55.4, stagger: .09 });
  });
  const pills = [[470, '{mx:x}{mink: → +∞}:  {my:1/}{mx:x}{mink: → }{mg:0}'], [960, '{mx:x}{mink: → 0⁺}:  {my:1/}{mx:x}{mink: → }{mv:+∞}'], [1450, 'due {v:asintoti}']];
  pills.forEach(([x, s], i) => {
    const a = 57.8 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - 225, 490, 450, 100);
    drawRich(ctx, s, x, 542, { size: 34, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: "Verso l'infinito", durata: 68, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [66.1, 67.0] },
    capitoli: [[7.5, 28.6, '{mx:x} sempre più grande'], [28.6, 48.6, '{mx:x} vicino a 0'], [48.6, 54.3, 'due asintoti']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCurva(ctx, t); sceneFine(ctx, t); },
  };
});
