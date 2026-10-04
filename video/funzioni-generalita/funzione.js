'use strict';
/* Che cos'è una funzione — la macchina, la regola d'oro, insiemi e frecce, il grafico, la retta verticale.
   Portato da VideoFunzione/funzione-video.js. Argomento: funzioni-generalita. */
CVIDEO.registra('funzioni-generalita/funzione', M => {
  const { W, C, E, P, life, kf, clamp, lerp, rgb, css, mix, TITOLI, conFont, drawRich, txt, fixedNum, fmtN,
    partial, ball, dot, machine, checkMark, crossMark, runTimes, drawRunIn, drawRunOut, machineFx,
    arrowHead, glowStroke, dashed, makePlane, card } = M;
  const TAU = Math.PI * 2;
  // sullo schermo scuro della macchina serve sempre un colore chiaro: la carta nel tema chiaro, l'inchiostro nello scuro
  const lum = c => { const [r, g, b] = rgb(c); return .3 * r + .59 * g + .11 * b; };
  const LU = () => lum(C.paper) > lum(C.ink) ? 'paper' : 'ink';

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [95.6, 190], [96.9, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [95.6, 1050], [96.9, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [95.6, 2.2], [96.9, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [95.6, 2], [96.9, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [95.6, -1.5], [96.9, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.5, 'pensa'], [6.4, 'neutro'],
  [14.7, 'felice'], [16.9, 'neutro'], [21.6, 'felice'], [23.8, 'neutro'],
  [34.8, 'felice'], [39.0, 'neutro'], [42.4, 'sorpreso'], [44.6, 'neutro'],
  [61.0, 'felice'], [63.0, 'neutro'], [65.0, 'occhiolino'], [67.2, 'neutro'],
  [76.0, 'felice'], [78.0, 'neutro'], [86.4, 'felice'], [88.4, 'pensa'], [90.6, 'neutro'], [92.6, 'sorpreso'], [94.6, 'neutro'],
  [98.0, 'felice'], [103.4, 'occhiolino'],
];
const FUMETTI = [
  [2.6, 6.3, 'Che cosa fa una {v:funzione}?'],
  // 1 · la macchina
  [7.9, 12.4, 'È come una {v:macchina}\ncon dentro una {v:regola}.'],
  [12.5, 16.9, 'Entra {mx:3}, esce {my:7}:\nil doppio, più 1.'],
  [17.0, 21.2, 'Altri ingressi: li segno\nin una {v:tabella}.'],
  [21.3, 25.8, 'Scritta in simboli, vale\nper {g:ogni} numero {mx:x}.'],
  // 2 · la regola d'oro
  [26.5, 31.3, "La {v:regola d'oro}: a ogni ingresso,\n{g:una sola} uscita."],
  [31.5, 36.5, 'Con {mink:x²} entrano {mx:−2} e {mx:2}:\nescono {my:4} e {my:4}.'],
  [36.6, 40.4, 'Ingressi diversi, stessa uscita?\n{g:Va bene.}'],
  [40.5, 44.9, 'Con {mink:±√}{mx:x} entra {mx:4}…\n…ed escono {r:due} numeri!'],
  [45.0, 49.4, 'Un ingresso, due uscite:\n{r:non è una funzione}.'],
  // 3 · insiemi e frecce
  [49.6, 54.3, 'Due insiemi: il {x:dominio A}\ne il {y:codominio B}.'],
  [54.4, 60.6, 'Ogni {mx:x} va nel suo quadrato:\n{mink:f : A → B}, {mx:x}{mink: ↦ }{my:x²}.'],
  [60.7, 64.8, 'Da ogni {mx:x} parte\n{g:una sola} freccia.'],
  [64.9, 69.0, 'Qualcuno in B resta solo:\n{g:va bene}.'],
  // 4 · il grafico
  [69.3, 74.0, 'Ogni coppia ({mx:x}; {my:f(x)}) diventa\nun punto del piano.'],
  [74.1, 77.9, 'Con tutti gli ingressi:\nuna {y:curva}.'],
  [78.0, 82.4, 'Muovi {mx:x}: il grafico ti dice\nsubito {my:f(x)}.'],
  // 5 · la retta verticale
  [82.8, 87.5, 'Ogni {v:retta verticale} taglia\nla parabola {g:una volta sola}.'],
  [87.6, 90.5, 'E una {v:circonferenza}?'],
  [90.6, 95.0, 'Stessa {mx:x}, due {my:y}:\n{r:non è una funzione}.'],
  // chiusura
  [98.0, 103.5, 'A ogni ingresso, {g:una sola} uscita:\nquesto è una funzione.'],
];

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, "Che cos'è una funzione?", W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · la macchina (7.5–26.2)
const M1 = { cx: 700, cy: 400, w: 380 };
const ROWS = [325, 415, 505];
const S1 = [
  { t0: 12.7, d: 1.0, inp: '3', from: [150, 400], outs: [{ label: '7', to: [1130, 400] }] },
  { t0: 17.9, d: .65, inp: '1', from: [150, 400], outs: [{ label: '3', to: [1130, 400] }] },
  { t0: 19.4, d: .6, inp: '5', from: [150, 400], outs: [{ label: '11', to: [1130, 400] }] },
];
const FLY = [17.3, 19.55, 20.95];
S1.forEach((R, i) => { R.outs[0].fly = { t: FLY[i], to: [1665, ROWS[i]], s: .95 }; R.row = i; });
function sceneMachine(ctx, t) {
  if (t < 7.5 || t > 26.3) return;
  const A = 1 - P(t, 25.6, 26.2);
  ctx.save(); ctx.globalAlpha *= A;
  for (const R of S1) drawRunIn(ctx, t, R, M1);
  const fx = machineFx(t, S1);
  machine(ctx, M1.cx, M1.cy, { scale: P(t, 7.6, 8.5, E.back), t, ...fx, label: `{m${LU()}:f}`, labelSize: 120 });
  // targhetta con la regola
  const pa = P(t, 9.4, 9.9, E.out);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    ctx.fillStyle = css(C.v, .1); ctx.strokeStyle = css(C.v, .5); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(M1.cx - 275, 578 + (1 - pa) * 14, 550, 64, 32); ctx.fill(); ctx.stroke();
    ctx.restore();
    drawRich(ctx, 'regola: raddoppia, poi aggiungi 1', M1.cx, 610, { size: 32, local: t - 9.5, stagger: .05 });
  }
  // tabella
  const tk = P(t, 17.1, 17.7, E.out);
  if (tk > 0) {
    card(ctx, 1350, 190, 420, 380, tk);
    ctx.save(); ctx.globalAlpha *= tk;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1380, 280); ctx.lineTo(lerp(1380, 1740, tk), 280); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1560, 210); ctx.lineTo(1560, lerp(210, 550, tk)); ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{mx:x}', 1455, 236, { size: 52, alpha: tk });
    drawRich(ctx, '{my:f(}{mx:x}{my:)}', 1665, 236, { size: 52, alpha: tk });
  }
  for (const R of S1) {
    const fl = R.outs[0].fly;
    ball(ctx, 1455, ROWS[R.row], R.inp, C.x, { scale: .95 * P(t, fl.t + .35, fl.t + .75, E.back) });
  }
  for (const R of S1) drawRunOut(ctx, t, R, M1);
  // la formula, che vale per ogni numero
  drawRich(ctx, '{my:f(}{mx:x}{my:)}{mink: = 2}{mx:x}{mink: + 1}', M1.cx, 718, { size: 76, local: t - 21.6, stagger: .09 });
  if (t > 22.6) {
    ctx.save(); ctx.globalAlpha *= P(t, 22.6, 23.0);
    ctx.strokeStyle = css(C.dim, .6); ctx.lineWidth = 3; ctx.setLineDash([8, 10]);
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([lerp(990, 1360, u), 718 - Math.sin(u * Math.PI / 2) * 100]); }
    partial(ctx, pts, P(t, 22.6, 23.5));
    ctx.restore();
    drawRich(ctx, 'vale per {g:ogni} numero', 1560, 640, { size: 34, local: t - 23.2 });
  }
  ctx.restore();
}

// 2 · la regola d'oro (26.2–49.8)
const M2 = { cx: 820, cy: 420, w: 360 };
const S2 = [
  { t0: 32.2, d: .75, inp: '−2', from: [170, 420], outs: [{ label: '4', to: [1340, 330], fade: 40.2 }] },
  { t0: 33.5, d: .75, inp: '2', from: [170, 420], outs: [{ label: '4', to: [1340, 510], fade: 40.2 }] },
  { t0: 41.5, d: .9, inp: '4', from: [170, 420], shake: 1.3, outs: [{ label: '2', to: [1340, 330] }, { label: '−2', to: [1340, 510] }] },
];
function sceneGolden(ctx, t) {
  if (t < 26.2 || t > 49.9) return;
  const A = 1 - P(t, 49.2, 49.8);
  ctx.save(); ctx.globalAlpha *= A;
  // cartello
  const ca = life(t, 26.4, 31.4, .5, .5);
  if (ca > 0) {
    card(ctx, 360, 230, 1200, 400, ca);
    conFont(TITOLI, () => drawRich(ctx, "{v:la regola d'oro}", W / 2, 310, { size: 48, weight: 600, local: t - 26.6, alpha: ca }));
    drawRich(ctx, 'a ogni ingresso,\n{g:una sola} uscita.', W / 2, 475, { size: 86, local: t - 27.0, stagger: .12, alpha: ca, weight: 600 });
  }
  if (t > 31.0) {
    for (const R of S2) drawRunIn(ctx, t, R, M2);
    const fx = machineFx(t, S2), red = P(t, 42.4, 43.0);
    if (red > 0) fx.shake = Math.max(fx.shake, .14);
    machine(ctx, M2.cx, M2.cy, {
      w: 360, h: 260, scale: P(t, 31.2, 32.0, E.back), t, ...fx, color: mix(C.v, C.r, red),
      label: `{m${LU()}:x²}`, labelAlpha: 1 - P(t, 40.6, 41.0), label2: `{m${LU()}:±√x}`, label2Alpha: P(t, 40.8, 41.2),
    });
    for (const R of S2) drawRunOut(ctx, t, R, M2);
    // accanto a ogni uscita, l'ingresso da cui viene
    const ingresso = (lab, y, R, fade, verso) => {
      const a = runTimes(R).e, k = P(t, a, a + .4, E.back) * (fade ? 1 - P(t, fade, fade + .4) : 1);
      if (k <= 0) return;
      ball(ctx, 1180, y, lab, C.x, { r: 42, scale: k });
      ctx.save(); ctx.globalAlpha *= clamp(k); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
      for (const yy of verso) {
        const ang = Math.atan2(yy - y, 60);
        ctx.beginPath(); ctx.moveTo(1232, y + (yy - y) * .1); ctx.lineTo(1284, yy - (yy - y) * .1); ctx.stroke();
        arrowHead(ctx, [1288, yy - (yy - y) * .1], ang, C.dim, .8);
      }
      ctx.restore();
    };
    ingresso('−2', 330, S2[0], 40.2, [330]);
    ingresso('2', 510, S2[1], 40.2, [510]);
    ingresso('4', 420, S2[2], 0, [330, 510]);
    const eq = life(t, 36.8, 40.3, .3, .4);
    if (eq > 0) txt(ctx, '=', 1340, 422, { size: 64, weight: 600, color: C.g, alpha: eq });
    checkMark(ctx, 1580, 420, P(t, 36.9, 37.6, E.lin) * (1 - P(t, 40.0, 40.4)), C.g);
    crossMark(ctx, 1580, 420, P(t, 45.3, 46.0, E.lin), C.r);
  }
  ctx.restore();
}

// 3 · insiemi e frecce (49.8–68.9)
const SA = { cx: 560, cy: 460 }, SB = { cx: 1100, cy: 460 }, RX = 150, RY = 245;
const AV = ['−2', '−1', '0', '1', '2'], BV = ['0', '1', '2', '3', '4'];
const MAP = [4, 1, 0, 1, 4];
const elY = i => 460 + (i - 2) * 88;
function arrowPts(i) {
  const x0 = SA.cx + 34, y0 = elY(i), x1 = SB.cx - 34, y1 = elY(MAP[i]);
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 - 60, pts = [];
  for (let k = 0; k <= 40; k++) { const u = k / 40; pts.push([(1 - u) ** 2 * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) ** 2 * y0 + 2 * (1 - u) * u * my + u * u * y1]); }
  return pts;
}
function sceneSets(ctx, t) {
  if (t < 49.8 || t > 69.3) return;
  const A = 1 - P(t, 68.8, 69.3);
  ctx.save(); ctx.globalAlpha *= A;
  const ok = P(t, 49.9, 51.0, E.io);
  for (const [S, col] of [[SA, C.x], [SB, C.y]]) {
    if (ok <= 0) break;
    ctx.save(); ctx.fillStyle = css(col, .07 * ok); ctx.strokeStyle = css(col, .75); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(S.cx, S.cy, RX, RY, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(S.cx, S.cy, RX, RY, 0, -Math.PI / 2, -Math.PI / 2 + TAU * ok); ctx.stroke();
    ctx.restore();
  }
  drawRich(ctx, '{mx:A}', SA.cx, 172, { size: 58, local: t - 50.8 });
  drawRich(ctx, '{my:B}', SB.cx, 172, { size: 58, local: t - 50.8 });
  drawRich(ctx, '{x:dominio}', SA.cx, 750, { size: 34, local: t - 51.3 });
  drawRich(ctx, '{y:codominio}', SB.cx, 750, { size: 34, local: t - 51.3 });
  for (let i = 0; i < 5; i++) {
    const a = 54.7 + i * .7, k = P(t, a, a + .7, E.io);
    if (k <= 0) continue;
    const pts = arrowPts(i);
    const gr = ctx.createLinearGradient(pts[0][0], 0, pts[40][0], 0); gr.addColorStop(0, css(C.x)); gr.addColorStop(1, css(C.y));
    ctx.save(); ctx.strokeStyle = gr; ctx.lineWidth = 4; ctx.lineCap = 'round';
    const e = partial(ctx, pts, k);
    if (e) arrowHead(ctx, e[0], e[1], mix(C.x, C.y, k), 1.2);
    ctx.restore();
  }
  for (let i = 0; i < 5; i++) {
    const s = P(t, 50.9 + i * .12, 51.4 + i * .12, E.back);
    const fl = Math.sin(clamp((t - 60.9 - i * .12) / .6) * Math.PI);
    ball(ctx, SA.cx, elY(i), AV[i], C.x, { r: 38, scale: s * (1 + .18 * fl) });
    const lonely = (i === 2 || i === 3);
    const dimB = lonely ? P(t, 65.1, 65.7) : 0;
    ball(ctx, SB.cx, elY(i), BV[i], mix(C.y, C.dim, dimB * .7), { r: 38, scale: P(t, 51.1 + i * .12, 51.6 + i * .12, E.back) });
    if (lonely && dimB > 0) {
      ctx.save(); ctx.globalAlpha *= dimB; ctx.strokeStyle = css(C.g, .8); ctx.lineWidth = 3; ctx.setLineDash([7, 8]);
      ctx.lineDashOffset = -t * 30;
      ctx.beginPath(); ctx.arc(SB.cx, elY(i), 44 + Math.sin(t * 4 + i) * 3, 0, TAU); ctx.stroke(); ctx.restore();
    }
  }
  // la notazione
  const na = P(t, 58.4, 59.0);
  if (na > 0) {
    card(ctx, 1380, 330, 440, 260, na);
    drawRich(ctx, '{mink:f : }{mx:A}{mink: → }{my:B}', 1600, 415, { size: 50, local: t - 58.5, stagger: .1 });
    drawRich(ctx, '{mx:x}{mink: ↦ }{my:x²}', 1600, 510, { size: 56, local: t - 58.9, stagger: .1 });
  }
  ctx.restore();
}

// 4–5 · il grafico e la retta verticale (68.9–95.7)
const PL = makePlane({ ox: 960, oy: 735, u: 100, x0: -4.3, x1: 4.3, y0: -.45, y1: 5.5 });
const PAR = PL.curve(x => x * x, -2.25, 2.25, 160);
const CIRC = (() => { const pts = []; for (let i = 0; i <= 180; i++) { const a = -Math.PI / 2 - i / 180 * TAU; pts.push(PL.toS(2 * Math.cos(a), 2.5 + 2 * Math.sin(a))); } return pts; })();
const PTS = [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]];
const num = v => (v < 0 ? '−' : '') + Math.abs(v);
function vline(ctx, xv, al) {
  const [x] = PL.toS(xv, 0);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v, .95); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x, PL.toS(0, -.4)[1]); ctx.lineTo(x, PL.toS(0, 5.4)[1]); ctx.stroke();
  ctx.restore();
}
function scenePlane(ctx, t) {
  if (t < 68.9 || t > 95.7) return;
  const A = 1 - P(t, 95.1, 95.7);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, 440, 110, 1050, 690, P(t, 68.9, 69.5));
  PL.axes(ctx, P(t, 69.0, 70.1, E.io));
  // i punti della tabella
  const lblA = 1 - P(t, 74.1, 74.6), parA = 1 - P(t, 87.6, 88.1);
  PTS.forEach(([x, y], i) => {
    const a = 69.8 + i * .62, p = PL.toS(x, y), gA = 1 - P(t, a + 1.1, a + 1.5);
    dashed(ctx, PL.toS(x, 0), p, C.x, P(t, a, a + .35), gA);
    dashed(ctx, PL.toS(0, y), p, C.y, P(t, a + .1, a + .45), gA);
    dot(ctx, p, C.y, P(t, a + .3, a + .6, E.back) * parA);
    drawRich(ctx, `({mx:${num(x)}}; {my:${y}})`, p[0] + (x < 0 ? -22 : 12), p[1] - 36,
      { size: 32, local: t - a - .2, align: x < 0 ? 'right' : 'left', alpha: lblA, stagger: .03 });
  });
  // la parabola
  if (parA > 0) {
    ctx.save(); ctx.globalAlpha *= parA;
    glowStroke(ctx, PAR, P(t, 74.3, 76.0, E.io), C.y);
    if (t > 75.2) drawRich(ctx, '{my:y = }{mx:x}{my:²}', PL.toS(2.35, 5.0)[0] + 10, PL.toS(2.35, 5.0)[1] + 10, { size: 44, local: t - 75.4, align: 'left', alpha: 1 - P(t, 82.6, 83.0) });
    ctx.restore();
  }
  // il cursore che scorre su x
  const trA = life(t, 78.0, 82.6, .5, .5);
  if (trA > 0) {
    const xv = kf(t, [[78.3, -1.8], [79.6, 2.0], [80.8, -.6], [82.0, 1.3]]), yv = xv * xv;
    const px = PL.toS(xv, 0), pc = PL.toS(xv, yv), py = PL.toS(0, yv);
    ctx.save(); ctx.globalAlpha *= trA;
    dashed(ctx, px, pc, C.x); dashed(ctx, pc, py, C.y);
    dot(ctx, px, C.x, 1, 16); dot(ctx, pc, C.ink, 1, 11); dot(ctx, py, C.y, 1, 16);
    ctx.restore();
    card(ctx, 1540, 340, 320, 180, trA);
    ctx.save(); ctx.globalAlpha *= trA;
    drawRich(ctx, '{mx:x} =', 1570, 390, { size: 46, align: 'left' });
    drawRich(ctx, '{my:f(}{mx:x}{my:)} =', 1570, 468, { size: 46, align: 'left' });
    fixedNum(ctx, fmtN(xv), 1830, 390, 44, C.x);
    fixedNum(ctx, fmtN(yv), 1830, 468, 44, C.y);
    ctx.restore();
  }
  // la retta verticale sulla parabola
  const vl1 = life(t, 82.9, 87.6, .4, .5);
  if (vl1 > 0) {
    const xv = kf(t, [[83.1, -2.2], [86.3, 2.2]]);
    vline(ctx, xv, vl1);
    if (Math.abs(xv) <= 2.25) {
      const p = PL.toS(xv, xv * xv); dot(ctx, p, C.g, vl1, 14);
      drawRich(ctx, '{g:1 punto}', p[0] + 18, PL.toS(0, 5.22)[1], { size: 32, align: 'left', alpha: vl1 });
    }
  }
  checkMark(ctx, 1690, 430, P(t, 86.4, 87.1, E.lin) * (1 - P(t, 87.4, 87.9)), C.g);
  // la circonferenza
  const ck = P(t, 88.0, 89.3, E.io);
  if (ck > 0) glowStroke(ctx, CIRC, ck, C.v);
  const vl2 = life(t, 90.5, 95.2, .4, .5);
  if (vl2 > 0) {
    const xv = kf(t, [[90.7, -2.7], [91.8, 1.2]]);
    vline(ctx, xv, vl2);
    if (Math.abs(xv) < 2) {
      const h = Math.sqrt(4 - xv * xv), p1 = PL.toS(xv, 2.5 + h), p2 = PL.toS(xv, 2.5 - h);
      const hk = P(t, 91.9, 92.5);
      dashed(ctx, p1, PL.toS(0, 2.5 + h), C.y, hk); dashed(ctx, p2, PL.toS(0, 2.5 - h), C.y, hk);
      dot(ctx, p1, C.r, vl2, 14); dot(ctx, p2, C.r, vl2, 14);
      drawRich(ctx, '{r:2 punti}', p1[0] + 26, p1[1] - 30, { size: 32, align: 'left', alpha: vl2 * P(t, 91.8, 92.2) });
    }
  }
  crossMark(ctx, 1690, 430, P(t, 92.2, 92.9, E.lin), C.r);
  ctx.restore();
}

// 6 · in una frase (95.6–106.5)
function miniArrows(ctx) {
  for (const [cx, col] of [[-62, C.x], [62, C.y]]) {
    ctx.fillStyle = css(col, .08); ctx.strokeStyle = css(col, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(cx, 0, 38, 66, 0, 0, TAU); ctx.fill(); ctx.stroke();
  }
  const ys = [-34, 0, 34], to = [30, -30, 30];
  ys.forEach((y, i) => {
    dot(ctx, [-62, y], C.x, 1, 8); dot(ctx, [62, [-30, 0, 30][i]], C.y, 1, 8);
    const pts = []; for (let k = 0; k <= 20; k++) { const u = k / 20; pts.push([lerp(-52, 52, u), lerp(y, to[i], u) - Math.sin(u * Math.PI) * 14]); }
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 2.5;
    const e = partial(ctx, pts, 1); if (e) arrowHead(ctx, e[0], e[1], C.ink, .7);
  });
}
function miniGraph(ctx, t) {
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-90, 50); ctx.lineTo(90, 50); ctx.moveTo(0, 66); ctx.lineTo(0, -76); ctx.stroke();
  const pts = []; for (let i = 0; i <= 40; i++) { const x = lerp(-1.6, 1.6, i / 40); pts.push([x * 48, 50 - x * x * 46]); }
  glowStroke(ctx, pts, 1, C.y, 5);
  const x = Math.sin(t * 1.3) * 1.2; dot(ctx, [x * 48, 50 - x * x * 46], C.ink, 1, 8);
}
function sceneRecap(ctx, t) {
  if (t < 95.6) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 95.9 });
    drawRich(ctx, 'Una funzione associa a ogni {mx:x}\n{g:una e una sola} {my:y}.', W / 2, 290, { size: 70, weight: 600, local: t - 96.3, stagger: .09 });
  });
  const items = [
    [560, 'una macchina', c => machine(c, 0, 0, { scale: .38, t, spin: t * 1.2, label: `{m${LU()}:f}`, labelSize: 120 })],
    [960, 'delle frecce', c => miniArrows(c)],
    [1360, 'un grafico', c => miniGraph(c, t)],
  ];
  items.forEach(([x, name, draw], i) => {
    const a = 97.8 + i * .35, k = P(t, a, a + .6, E.back), ka = P(t, a, a + .4, E.out);
    if (ka <= 0) return;
    card(ctx, x - 160, 430, 320, 260, ka);
    ctx.save(); ctx.globalAlpha *= ka;
    ctx.translate(x, 535); ctx.scale(k, k); draw(ctx);
    ctx.restore();
    txt(ctx, name, x, 652, { size: 32, color: C.dim, alpha: ka });
  });
}

  return {
    titolo: "Che cos'è una funzione", durata: 106.5, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [104.4, 105.4] },
    capitoli: [[7.5, 26.2, 'la macchina'], [26.2, 49.8, "la regola d'oro"], [49.8, 68.9, 'insiemi e frecce'],
      [68.9, 82.6, 'il grafico'], [82.6, 95.6, 'la retta verticale']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneMachine(ctx, t); sceneGolden(ctx, t); sceneSets(ctx, t); scenePlane(ctx, t); sceneRecap(ctx, t); },
  };
});
