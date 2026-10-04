'use strict';
/* La funzione inversa — la macchina che torna indietro (f(x) = 2x + 1, f⁻¹(x) = (x − 1)/2),
   poi i due grafici specchiati sulla retta y = x. Argomento: funzioni-generalita. */
CVIDEO.registra('funzioni-generalita/inversa', M => {
  const { W, C, E, P, lerp, rgb, css, TITOLI, conFont, drawRich, drawSeq, dot, machine,
    drawRunIn, drawRunOut, machineFx, dashed, glowStroke, makePlane, card } = M;
  // sullo schermo scuro della macchina serve sempre un colore chiaro
  const lum = c => { const [r, g, b] = rgb(c); return .3 * r + .59 * g + .11 * b; };
  const LU = () => lum(C.paper) > lum(C.ink) ? 'paper' : 'ink';

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [48.2, 190], [49.5, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [48.2, 1050], [49.5, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [48.2, 2.2], [49.5, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [48.2, 2], [49.5, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [48.2, -1.5], [49.5, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.5, 'pensa'], [6.4, 'neutro'],
  [10.6, 'felice'], [12.6, 'neutro'], [16.4, 'festa'], [18.4, 'neutro'], [24.6, 'felice'], [26.6, 'neutro'],
  [31.3, 'felice'], [33.7, 'neutro'], [35.7, 'sorpreso'], [37.7, 'neutro'], [41.7, 'felice'], [43.7, 'neutro'],
  [50.2, 'felice'], [55.3, 'occhiolino'],
];
const FUMETTI = [
  [2.6, 6.3, 'Una macchina può\n{v:tornare indietro}?'],
  // 1 · tornare indietro
  [7.9, 13.2, 'Con {mink:f(}{mx:x}{mink:) = 2}{mx:x}{mink: + 1}\nentra {mx:3} ed esce {my:7}.'],
  [13.3, 18.0, 'La macchina {v:inversa} {mink:f⁻¹}\nriceve 7 e ridà {mx:3}.'],
  [18.1, 23.4, 'Disfa i passi {v:al contrario}:\ntoglie 1, poi divide per 2.'],
  [23.5, 28.6, 'Ogni uscita viene da {g:un solo}\ningresso: {mink:f} è {v:biunivoca}.'],
  // 2 · lo specchio
  [29.3, 33.6, 'Sul grafico, {mink:f} passa\nper {mink:P(1; 3)}.'],
  [33.7, 38.3, '{mink:f⁻¹} passa per {mink:Q(3; 1)}:\nle coordinate {v:scambiate}.'],
  [38.4, 43.3, 'I due grafici sono specchiati\nsulla retta {mink:y = }{mx:x}.'],
  [43.4, 47.4, 'Anche {mink:P} e {mink:Q}\nsono {v:simmetrici}.'],
  // chiusura
  [50.2, 55.2, 'Se {mink:f} è {v:biunivoca}, l\'inversa\ndisfa quello che fa {mink:f}.'],
];

function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La funzione inversa', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la regola sullo schermo di una macchina (anche scossa o specchiata), scritta sempre dritta
function schermo(ctx, cx, cy, sc, sh, t, disegna) {
  if (sc <= 0) return;
  ctx.save(); ctx.translate(cx + Math.sin(t * 83) * 8 * sh, cy + Math.cos(t * 67) * 5 * sh); ctx.scale(sc, sc);
  disegna(LU()); ctx.restore();
}

// 1 · tornare indietro (7.5–28.9)
const MW = 300, MH = 230;
const MF = { cx: 1000, cy: 250, w: MW }, MI = { cx: 1000, cy: 590, w: MW };
const MI_RUN = { cx: MI.cx, cy: MI.cy, w: -(MW + 374) };   // la stessa geometria, percorsa da destra a sinistra
const R5 = { t0: 8.9, d: 1.0, inp: '3', from: [620, MF.cy], outs: [{ label: '7', to: [1400, MF.cy], fade: 14.3 }] };
const R6 = { t0: 14.6, d: 1.1, inp: '7', from: [1400, MF.cy], outs: [{ label: '3', to: [675, MI.cy] }] };
function sceneIndietro(ctx, t) {
  if (t < 7.5 || t > 29.1) return;
  const A = 1 - P(t, 28.5, 29.1);
  ctx.save(); ctx.globalAlpha *= A;
  R6.outs[0].color = C.x;   // il 3 che torna è di nuovo un ingresso
  const sF = P(t, 7.7, 8.5, E.back), sI = P(t, 13.4, 14.2, E.back);
  const fF = machineFx(t, [R5]), fI = machineFx(t, [R6]);
  drawRunIn(ctx, t, R5, MF);
  drawRunIn(ctx, t, R6, MI_RUN);
  machine(ctx, MF.cx, MF.cy, { w: MW, h: MH, scale: sF, t, ...fF });
  ctx.save(); ctx.translate(MI.cx, 0); ctx.scale(-1, 1); ctx.translate(-MI.cx, 0);
  machine(ctx, MI.cx, MI.cy, { w: MW, h: MH, scale: sI, t: t + 3, ...fI, color: C.g });
  ctx.restore();
  schermo(ctx, MF.cx, MF.cy, sF, fF.shake, t, k => drawRich(ctx, `{m${k}:2x + 1}`, 0, -22, { size: 58 }));
  schermo(ctx, MI.cx, MI.cy, sI, fI.shake, t + 3, k => drawSeq(ctx, [{ num: `{m${k}:x − 1}`, den: `{m${k}:2}`, bar: C[k] }], 0, -30, 46));
  drawRich(ctx, '{mink:f}', MF.cx - 205, MF.cy - 95, { size: 54, alpha: sF });
  drawRich(ctx, '{mink:f⁻¹}', MI.cx + 215, MI.cy - 95, { size: 54, alpha: sI });
  drawRunOut(ctx, t, R5, MF);
  drawRunOut(ctx, t, R6, MI_RUN);
  // i passi, e la formula dell'inversa
  const ca = P(t, 18.2, 18.7);
  if (ca > 0) {
    card(ctx, 50, 300, 510, 270, ca);
    ctx.save(); ctx.globalAlpha *= ca;
    drawRich(ctx, '{mink:f}{dim:: raddoppia, poi + 1}', 85, 345, { size: 32, align: 'left', local: t - 18.3 });
    drawRich(ctx, '{mink:f⁻¹}{dim:: toglie 1, poi dimezza}', 85, 400, { size: 32, align: 'left', local: t - 19.3 });
    drawSeq(ctx, ['{mink:f⁻¹(}{mx:x}{mink:) = }', { num: '{mx:x}{mink: − 1}', den: '{mink:2}' }], 305, 495, 46, { local: t - 20.5 });
    ctx.restore();
  }
  ctx.restore();
}

// 2 · lo specchio (28.9–48.6)
const PL = makePlane({ ox: 450, oy: 680, u: 86, x0: -.6, x1: 6.3, y0: -.6, y1: 6.2 });
const f = x => 2 * x + 1;
const LF = [PL.toS(-.8, -.6), PL.toS(2.6, 6.2)];
const LI = [PL.toS(-.6, -.8), PL.toS(6.2, 2.6)];
function sceneSpecchio(ctx, t) {
  if (t < 28.9 || t > 48.6) return;
  const A = 1 - P(t, 48.0, 48.6);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, 330, 110, 820, 690, P(t, 28.9, 29.5));
  PL.axes(ctx, P(t, 29.1, 30.1));
  ctx.save(); ctx.beginPath(); ctx.rect(360, 130, 760, 660); ctx.clip();
  // la retta y = x, lo specchio
  const sp = P(t, 38.7, 39.7);
  if (sp > 0) {
    ctx.save(); ctx.strokeStyle = css(C.v, .8); ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
    const a = PL.toS(-.6, -.6), b = PL.toS(6.2, 6.2);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], sp), lerp(a[1], b[1], sp)); ctx.stroke(); ctx.restore();
  }
  glowStroke(ctx, LF, P(t, 29.7, 30.9), C.y);
  glowStroke(ctx, LI, P(t, 34.1, 35.3), C.g);
  // la copia di f che si ribalta sullo specchio, fino a coprire f⁻¹
  const rb = P(t, 39.9, 41.7) * (1 - P(t, 41.9, 42.3));
  if (rb > 0) {
    const k = P(t, 39.9, 41.7), pts = [];
    for (let i = 0; i <= 40; i++) { const x = lerp(-.8, 2.6, i / 40), y = f(x); pts.push(PL.toS(lerp(x, y, k), lerp(y, x, k))); }
    ctx.save(); ctx.globalAlpha *= .55 * Math.min(1, rb * 4); glowStroke(ctx, pts, 1, C.y, 5); ctx.restore();
  }
  ctx.restore();
  const Pp = PL.toS(1, 3), Qp = PL.toS(3, 1);
  if (t > 43.4) dashed(ctx, Pp, Qp, C.dim, P(t, 43.4, 44.0));
  dot(ctx, Pp, C.y, P(t, 31.1, 31.5, E.back), 12);
  dot(ctx, Qp, C.g, P(t, 35.5, 35.9, E.back), 12);
  drawRich(ctx, '{mink:P}', Pp[0] - 34, Pp[1] - 8, { size: 40, local: t - 31.2 });
  drawRich(ctx, '{mink:Q}', Qp[0] + 8, Qp[1] + 40, { size: 40, local: t - 35.6 });
  drawRich(ctx, '{my:f}', PL.toS(2.4, 5.5)[0] + 34, PL.toS(2.4, 5.5)[1], { size: 44, local: t - 30.7 });
  drawRich(ctx, '{mg:f⁻¹}', PL.toS(5.4, 2.2)[0], PL.toS(5.4, 2.2)[1] + 60, { size: 44, local: t - 35.1 });
  if (sp > 0) drawRich(ctx, '{mink:y = }{mx:x}', PL.toS(5.2, 5.6)[0] - 20, PL.toS(5.2, 5.6)[1] + 10, { size: 40, align: 'right', alpha: sp });
  // a destra: le coordinate scambiate
  const ca = P(t, 31.1, 31.6);
  if (ca > 0) {
    card(ctx, 1220, 250, 620, 400, ca);
    ctx.save(); ctx.globalAlpha *= ca;
    drawRich(ctx, '{mink:P = (}{mx:1}{mink:; }{my:3}{mink:)}', 1530, 345, { size: 54, local: t - 31.3 });
    drawRich(ctx, '{mink:Q = (}{mx:3}{mink:; }{my:1}{mink:)}', 1530, 450, { size: 54, local: t - 35.7 });
    drawRich(ctx, '{dim:simmetrici rispetto a }{mink:y = }{mx:x}', 1530, 565, { size: 32, local: t - 43.6 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (48.2–58.1)
function sceneFine(ctx, t) {
  if (t < 48.2) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 48.5 });
    drawRich(ctx, 'L\'inversa {g:torna indietro}:\nscambia ingressi e uscite.', W / 2, 290, { size: 70, weight: 600, local: t - 48.9, stagger: .09 });
  });
  const pills = [[720, '{dim:dal 7 si torna al 3}', '{mink:f⁻¹(}{my:7}{mink:) = }{mx:3}'],
    [1200, '{dim:il grafico}', '{dim:specchio su }{mink:y = }{mx:x}']];
  pills.forEach(([x, testa, fo], i) => {
    const a = 50.1 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, fo, x, 545, { size: 40 });
    ctx.restore();
  });
}

  return {
    titolo: 'La funzione inversa', durata: 58.1, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [56.0, 57.0] },
    capitoli: [[7.5, 28.9, 'tornare indietro'], [28.9, 48.2, 'lo specchio']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneIndietro(ctx, t); sceneSpecchio(ctx, t); sceneFine(ctx, t); },
  };
});
