'use strict';
/* Che cos'è un limite — il buco di (x² − 1)/(x − 1), avvicinarsi da sinistra e da destra, la fascia ε–δ,
   il valore nel punto che non conta, il gradino senza limite. Argomento: limiti.
   Portato da VideoFunzione/limiti-video.js; la parte «verso l'infinito» sta in limiti/infinito. */
CVIDEO.registra('limiti/limite', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, richW, drawSeq, drawLim, fixedNum, fmtN,
    dot, glowStroke, makePlane, hole, traveler, axisLabel, checkMark, crossMark, card } = M;

const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [107.4, 190], [108.7, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [107.4, 1050], [108.7, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [107.4, 2.2], [108.7, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [107.4, 2], [108.7, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [107.4, -1.5], [108.7, -2]],
};
// le facce cambiano al massimo una volta ogni 2 s
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.45, 'pensa'], [6.4, 'neutro'],
  [10.9, 'pensa'], [14.5, 'sorpreso'], [16.5, 'neutro'], [18.5, 'felice'], [20.5, 'neutro'],
  [24.7, 'sorpreso'], [26.7, 'neutro'], [39.0, 'felice'], [41.0, 'neutro'],
  [55.7, 'felice'], [57.7, 'neutro'], [61.7, 'sorpreso'], [63.7, 'neutro'], [65.9, 'felice'], [67.9, 'neutro'],
  [69.9, 'festa'], [72.3, 'neutro'], [80.9, 'sorpreso'], [82.9, 'neutro'], [84.9, 'felice'], [86.9, 'neutro'],
  [91.4, 'sorpreso'], [93.4, 'neutro'], [103.1, 'sorpreso'], [105.1, 'neutro'],
  [112.9, 'felice'], [114.9, 'neutro'], [116.9, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [1.9, 6.3, 'Dove {g:va} una funzione\nvicino a un punto?'],
  // 1 · il buco
  [7.9, 10.8, 'Prendiamo questa funzione.'],
  [10.9, 14.4, 'Calcoliamola in {mx:x}{mink: = 1}.'],
  [14.5, 18.3, 'Esce {mr:0/0}: non vuol dire niente.'],
  [18.4, 24.6, 'Per {mx:x}{mink: ≠ 1} si semplifica:\nè la retta {my:y = }{mx:x}{my: + 1}.'],
  [24.7, 29.7, 'Ma in 1 non esiste:\nnel grafico c\'è un {r:buco}.'],
  // 2 · avvicinarsi
  [30.0, 34.4, 'Da {x:sinistra}: 0,9, poi 0,99,\npoi 0,999…'],
  [34.5, 38.9, 'Da {v:destra}: 1,1, poi 1,01,\npoi 1,001…'],
  [39.0, 44.0, 'Da tutte e due le parti\nsi va verso {g:2}.'],
  [44.1, 50.0, 'Si scrive così: il {v:limite}\nper {mx:x} che tende a 1 è {g:2}.'],
  // 3 · vicino quanto vuoi
  [50.3, 55.6, 'Fissa una fascia attorno a {g:2},\nlarga {g:ε} sopra e sotto.'],
  [55.7, 61.6, 'Attorno a 1, una striscia larga {x:δ}\nper parte: la curva resta {g:dentro}.'],
  [61.7, 65.8, 'Stringo la fascia:\nil tratto ora {r:esce}.'],
  [65.9, 69.7, 'Stringo anche {x:δ}: torna {g:dentro}.'],
  [69.8, 75.4, 'Per ogni fascia c\'è un {x:δ}:\nquesto vuol dire «tende a {g:2}».'],
  // 4 · il valore in 1 non conta
  [75.8, 80.8, 'Tre funzioni diverse: fuori da 1\nsono la stessa retta.'],
  [80.9, 84.7, 'In 1 fanno tre cose {r:diverse}.'],
  [84.8, 91.0, 'Ma il limite è lo stesso, {g:2}.\nConta {g:vicino} a 1, non {r:in} 1.'],
  // 5 · quando non esiste
  [91.4, 95.5, 'Ecco {my:g}: in 1 ha un {r:salto}.'],
  [95.6, 99.4, 'Da sinistra {my:g} va verso {x:1}.'],
  [99.5, 103.0, 'Da destra va verso {v:3}.'],
  [103.1, 107.2, 'Due valori diversi:\nil limite {r:non esiste}.'],
  // chiusura
  [107.8, 112.8, 'In generale: {mx:x} tende a {mx:c},\n{my:f(}{mx:x}{my:)} tende a {mg:L}.'],
  [112.9, 118.5, 'Il limite dice dove {g:va} {my:f(}{mx:x}{my:)},\nnon quanto {r:vale} nel punto.'],
];

// ---------- piano condiviso (capitoli 1–3 e 5) ----------
const PCARD = [400, 110, 700, 690], DCARD = [1160, 110, 680, 690];
const PA = makePlane({ ox: 575, oy: 700, u: 120, x0: -.8, x1: 3.2, y0: -.5, y1: 4.3 });
const fA = x => x + 1;
const LINE_A = PA.curve(fA, -.75, 3.2, 120);
const F_ITEMS = ['{mink:f(}{mx:x}{mink:) =}', { num: '{mx:x}{mink:² − 1}', den: '{mx:x}{mink: − 1}' }];
const Z_ITEMS = ['{mink:f(1) =}', { num: '{mink:1 − 1}', den: '{mink:1 − 1}' }, '{mink:=}', { num: '{mr:0}', den: '{mr:0}', bar: C.r }];
const LEFT = [['0,9', '1,9'], ['0,99', '1,99'], ['0,999', '1,999']];
const RIGHT = [['1,1', '2,1'], ['1,01', '2,01'], ['1,001', '2,001']];
// sullo schermo i punti si fermano sul bordo del buco; in tabella ci sono i valori veri
const xLeft = t => kf(t, [[30.2, -.6], [31.2, .72], [32.0, .72], [32.5, .8], [33.1, .8], [33.6, .85]]);
const xRight = t => kf(t, [[34.7, 3.1], [35.7, 1.28], [36.4, 1.28], [36.9, 1.2], [37.5, 1.2], [38.0, 1.15]]);
const ROW_L = [31.2, 32.5, 33.6], ROW_R = [35.7, 36.9, 38.0];
const epsAt = t => kf(t, [[50.5, 0], [51.5, 1], [61.9, 1], [63.0, .4], [69.9, .4], [70.9, .15]]);
const delAt = t => kf(t, [[66.1, 1], [67.2, .4], [69.9, .4], [70.9, .15]]);

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, "Che cos'è un limite", W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// f(1) = (1 − 1)/(1 − 1) col primo fumetto, «= 0/0» solo col fumetto che lo commenta
function zeroZero(ctx, t, al) {
  const sz = 64, gap = sz * .12;
  const ws = Z_ITEMS.map(it => typeof it === 'string' ? richW(ctx, it, sz) : Math.max(richW(ctx, it.num, sz), richW(ctx, it.den, sz)) + sz * .35);
  const tot = ws.reduce((a, b) => a + b, 0) + gap * 3, x0 = 960 - tot / 2;
  const cut = x0 + ws[0] + ws[1] + gap * 1.5;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, cut, 1080); ctx.clip();
  drawSeq(ctx, Z_ITEMS, 960, 610, sz, { local: t - 11.1, alpha: al });
  ctx.restore();
  if (t > 14.6) {
    ctx.save(); ctx.beginPath(); ctx.rect(cut, 0, 1920 - cut, 1080); ctx.clip();
    const pz = t < 17.2 ? 1 + .06 * Math.max(0, Math.sin((t - 14.9) * 5)) : 1;
    const cx = x0 + tot - ws[3] / 2;
    ctx.translate(cx, 610); ctx.scale(pz, pz); ctx.translate(-cx, -610);
    drawSeq(ctx, Z_ITEMS, 960, 610, sz, { local: t - 14.6 + .6, alpha: al });
    ctx.restore();
  }
}

// 1–3 · il buco, avvicinarsi, vicino quanto vuoi (7.5–75.9)
function sceneBuco(ctx, t) {
  if (t < 7.5 || t > 76.0) return;
  const fine = 1 - P(t, 75.3, 75.9);
  ctx.save(); ctx.globalAlpha *= fine;
  // la formula grande al centro, poi nella scheda a destra
  const mv = P(t, 18.6, 19.7);
  const fa = P(t, 8.0, 8.4, E.out) * (1 - P(t, 29.4, 30.0));
  card(ctx, ...DCARD, life(t, 18.7, 75.7, .6, .5));
  if (fa > 0) {
    ctx.save(); ctx.globalAlpha *= fa;
    drawSeq(ctx, F_ITEMS, lerp(960, 1500, mv), lerp(330, 280, mv), lerp(96, 60, mv), { local: t - 8.0 });
    drawRich(ctx, '{mink:= }{mx:x}{mink: + 1}', 1500, 430, { size: 60, local: t - 20.2 });
    drawRich(ctx, '{dim:(se }{mx:x}{mink: ≠ }{dim:1)}', 1500, 505, { size: 34, local: t - 20.7 });
    ctx.restore();
  }
  const za = life(t, 11.1, 19.0, .4, .5);
  if (za > 0) zeroZero(ctx, t, za);
  // il piano
  card(ctx, ...PCARD, P(t, 18.8, 19.5));
  PA.axes(ctx, P(t, 19.1, 20.2));
  glowStroke(ctx, LINE_A, P(t, 20.8, 22.8), C.y);
  if (t > 22.8) drawRich(ctx, '{my:y = }{mx:x}{my: + 1}', PA.toS(2.0, 4.0)[0] - 10, PA.toS(2.0, 4.0)[1], { size: 38, align: 'right', local: t - 22.8, alpha: 1 - P(t, 29.4, 29.9) });

  // 2 · i due punti che si avvicinano, con le tabelle
  const trA = life(t, 30.0, 50.3, .4, .5);
  if (trA > 0) {
    traveler(ctx, PA, xLeft(t), fA, C.x, trA);
    traveler(ctx, PA, xRight(t), fA, C.v, trA);
  }
  const tab = life(t, 30.0, 44.6, .5, .5);
  if (tab > 0) {
    ctx.save(); ctx.globalAlpha *= tab;
    for (const [y0, titolo, col, rows, times] of [[150, 'da sinistra →', C.x, LEFT, ROW_L], [450, '← da destra', C.v, RIGHT, ROW_R]]) {
      txt(ctx, titolo, 1500, y0, { size: 32, color: col, weight: 600 });
      drawRich(ctx, '{mx:x}', 1380, y0 + 55, { size: 40 });
      drawRich(ctx, '{my:f(}{mx:x}{my:)}', 1620, y0 + 55, { size: 40 });
      ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(1230, y0 + 85); ctx.lineTo(1770, y0 + 85); ctx.moveTo(1500, y0 + 30); ctx.lineTo(1500, y0 + 250); ctx.stroke();
      rows.forEach(([a, b], i) => {
        const k = P(t, times[i] - .1, times[i] + .4, E.out);
        if (k <= 0) return;
        txt(ctx, a, 1380, y0 + 130 + i * 50, { size: 40, color: col, alpha: k });
        txt(ctx, b, 1620, y0 + 130 + i * 50, { size: 40, color: C.y, alpha: k });
      });
    }
    drawRich(ctx, '{my:f(}{mx:x}{my:)}{mink: → }{mg:2}', 1500, 750, { size: 48, local: t - 39.2 });
    ctx.restore();
  }
  // il 2 sull'asse y
  const g2 = life(t, 39.2, 75.3, .5, .5);
  if (g2 > 0) {
    const p2 = PA.toS(0, 2);
    ctx.save(); ctx.globalAlpha *= g2;
    dot(ctx, p2, C.g, 1 + .12 * Math.sin(t * 4), 13);
    axisLabel(ctx, p2, '2', C.g);
    ctx.restore();
  }
  // la scrittura col lim, che resta per tutto il capitolo 3
  const la = life(t, 44.6, 75.5, .5, .5);
  if (la > 0) {
    const sz = lerp(76, 60, P(t, 50.3, 51.1)), yy = lerp(330, 215, P(t, 50.3, 51.1));
    drawLim(ctx, '{mx:x}{mink:→1}', '{mink:f(}{mx:x}{mink:) = }{mg:2}', 1500, yy, { size: sz, local: t - 44.6, alpha: la });
  }

  // 3 · la fascia ε e la striscia δ
  const eps = epsAt(t), del = delAt(t);
  const band = life(t, 50.5, 75.3, .5, .5);
  if (band > 0 && eps > .001) {
    const [xl, yt] = PA.toS(0, 2 + eps), [xr, yb] = PA.toS(3.2, 2 - eps);
    ctx.save(); ctx.globalAlpha *= band;
    ctx.fillStyle = css(C.g, .12); ctx.fillRect(xl, yt, xr - xl, yb - yt);
    ctx.strokeStyle = css(C.g, .85); ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.moveTo(xl, yt); ctx.lineTo(xr, yt); ctx.moveTo(xl, yb); ctx.lineTo(xr, yb); ctx.stroke();
    ctx.restore();
    const lab = band * clamp((eps - .25) / .15);
    drawRich(ctx, '{mg:2 + ε}', xr + 14, yt - 22, { size: 30, align: 'left', alpha: lab });
    drawRich(ctx, '{mg:2 − ε}', xr + 14, yb + 22, { size: 30, align: 'left', alpha: lab });
    const dA = P(t, 55.8, 56.5) * band;
    if (dA > 0) {
      const [vl, vt] = PA.toS(1 - del, 4.3), [vr, vb] = PA.toS(1 + del, 0);
      ctx.save(); ctx.globalAlpha *= dA;
      ctx.fillStyle = css(C.x, .1); ctx.fillRect(vl, vt, vr - vl, vb - vt);
      ctx.strokeStyle = css(C.x, .85); ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]);
      ctx.beginPath(); ctx.moveTo(vl, vt); ctx.lineTo(vl, vb); ctx.moveTo(vr, vt); ctx.lineTo(vr, vb); ctx.stroke();
      ctx.restore();
      // il tratto di curva sopra la striscia: verde dentro la fascia, rosso dove esce
      const dentro = Math.min(del, eps);
      ctx.save(); ctx.globalAlpha *= dA;
      glowStroke(ctx, PA.curve(fA, 1 - dentro, 1 + dentro, 40), 1, C.g, 10);
      if (del > eps + .01) {
        glowStroke(ctx, PA.curve(fA, 1 - del, 1 - eps, 40), 1, C.r, 10);
        glowStroke(ctx, PA.curve(fA, 1 + eps, 1 + del, 40), 1, C.r, 10);
      }
      ctx.restore();
      const lb = dA * clamp((del - .7) / .15);
      drawRich(ctx, '{mx:1 − δ}', vl - 22, PA.oy + 70, { size: 32, align: 'right', alpha: lb });
      drawRich(ctx, '{mx:1 + δ}', vr + 10, PA.oy + 70, { size: 32, align: 'left', alpha: lb });
    }
    // i numeri nella scheda
    ctx.save(); ctx.globalAlpha *= band;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1220, 330); ctx.lineTo(1780, 330); ctx.stroke();
    drawRich(ctx, 'fascia  {mg:ε} =', 1240, 410, { size: 44, align: 'left' });
    fixedNum(ctx, fmtN(eps), 1760, 410, 48, C.g);
    if (dA > 0) {
      ctx.save(); ctx.globalAlpha *= dA;
      drawRich(ctx, 'striscia  {mx:δ} =', 1240, 500, { size: 44, align: 'left' });
      fixedNum(ctx, fmtN(del), 1760, 500, 48, C.x);
      const fuori = del > eps + .01;
      drawRich(ctx, fuori ? '{r:il tratto esce dalla fascia}' : '{g:il tratto sta nella fascia}', 1500, 620, { size: 36 });
      ctx.restore();
    }
    if (t > 70.0) drawRich(ctx, '{dim:per ogni }{mg:ε}{dim: c\'è un }{mx:δ}', 1500, 720, { size: 36, local: t - 70.0 });
    ctx.restore();
  }
  // il buco sta sopra a tutto: in 1 la funzione continua a non esserci
  const pulse = t > 24.8 && t < 29.4 ? 1 + .25 * Math.max(0, Math.sin((t - 24.8) * 5)) : 1;
  hole(ctx, PA.toS(1, 2), C.r, P(t, 24.8, 25.2, E.back) * pulse);
  ctx.restore();
}

// 4 · il valore in 1 non conta (75.6–91.2): tre funzioni diverse, uguali fuori da 1
const MINI = [
  { cx: 420, nota: 'in 1 c\'è un {r:buco}', tipo: 0 },
  { cx: 960, nota: 'in 1 vale 3', tipo: 1 },
  { cx: 1500, nota: 'in 1 vale 2', tipo: 2 },
];
function sceneTre(ctx, t) {
  if (t < 75.5 || t > 91.2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 90.5, 91.1);
  MINI.forEach((m, i) => {
    const a = 75.9 + i * .4, k = P(t, a, a + .6, E.back), ka = P(t, a, a + .4, E.out);
    if (ka <= 0) return;
    const cy = 330, u = 80, ox = m.cx - 100, oy = 490;
    const toS = (x, y) => [ox + x * u, oy - y * u];
    ctx.save(); ctx.globalAlpha *= ka;
    ctx.translate(m.cx, cy); ctx.scale(k, k); ctx.translate(-m.cx, -cy);
    card(ctx, m.cx - 220, 130, 440, 410);
    ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(ox - .6 * u, oy); ctx.lineTo(ox + 2.9 * u, oy); ctx.moveTo(ox, oy + .3 * u); ctx.lineTo(ox, oy - 3.9 * u); ctx.stroke();
    ctx.strokeStyle = css(C.dim, .6); ctx.beginPath(); ctx.moveTo(ox + u, oy - 6); ctx.lineTo(ox + u, oy + 6); ctx.moveTo(ox - 6, oy - 2 * u); ctx.lineTo(ox + 6, oy - 2 * u); ctx.stroke();
    txt(ctx, '1', ox + u, oy + 28, { size: 31, color: C.dim });
    txt(ctx, '2', ox - 16, oy - 2 * u, { size: 31, color: C.dim, align: 'right' });
    const pts = []; for (let j = 0; j <= 60; j++) { const x = lerp(-.5, 2.6, j / 60); pts.push(toS(x, x + 1)); }
    glowStroke(ctx, pts, P(t, a + .3, a + 1.3), C.y, 5);
    // i due punti che convergono
    const tr = life(t, 85.0, 90.6, .4, .5);
    if (tr > 0) {
      const xl = kf(t, [[85.2, -.3], [87.0, .8]]), xr = kf(t, [[85.2, 2.4], [87.0, 1.2]]);
      ctx.save(); ctx.globalAlpha *= tr;
      dot(ctx, toS(xl, xl + 1), C.x, 1, 8); dot(ctx, toS(xr, xr + 1), C.v, 1, 8);
      ctx.restore();
    }
    // che cosa succede proprio in 1
    const hk = P(t, 81.1 + i * .4, 81.5 + i * .4, E.back);
    if (m.tipo < 2) hole(ctx, toS(1, 2), C.y, hk, 10);
    if (m.tipo === 1) dot(ctx, toS(1, 3), C.y, hk, 10);
    if (m.tipo === 2) dot(ctx, toS(1, 2), C.y, hk, 10);
    const g = P(t, 87.0 + i * .3, 87.5 + i * .3);
    if (g > 0) dot(ctx, toS(0, 2), C.g, g, 10);
    ctx.restore();
    drawRich(ctx, m.nota, m.cx, 610, { size: 38, local: t - 81.1 - i * .4 });
    drawRich(ctx, 'limite: {g:2}', m.cx, 690, { size: 40, local: t - 87.2 - i * .3 });
    checkMark(ctx, m.cx + 165, 185, P(t, 87.6 + i * .3, 88.3 + i * .3, E.lin), C.g, .36);
  });
  ctx.restore();
}

// 5 · quando il limite non esiste (91.2–107)
const gB = x => x < 1 ? x : x + 2;
const B_LEFT = PA.curve(x => x, -.5, 1, 80), B_RIGHT = PA.curve(x => x + 2, 1, 2.3, 80);
function sceneSalto(ctx, t) {
  if (t < 91.1 || t > 107.7) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 107.0, 107.6);
  card(ctx, ...PCARD, P(t, 91.3, 91.9));
  PA.axes(ctx, P(t, 91.5, 92.5));
  glowStroke(ctx, B_LEFT, P(t, 92.3, 93.2), C.y);
  glowStroke(ctx, B_RIGHT, P(t, 93.0, 93.8), C.y);
  drawRich(ctx, '{my:g(}{mx:x}{my:)}', PA.toS(2.3, 4.3)[0] + 22, PA.toS(2.3, 4.3)[1] + 10, { size: 42, align: 'left', local: t - 93.6 });
  const tl = life(t, 95.6, 106.9, .4, .5), tr = life(t, 99.5, 106.9, .4, .5);
  if (tl > 0) traveler(ctx, PA, kf(t, [[95.7, -.4], [97.5, .85]]), gB, C.x, tl);
  if (tr > 0) traveler(ctx, PA, kf(t, [[99.6, 2.2], [101.4, 1.12]]), gB, C.v, tr);
  const ek = P(t, 93.8, 94.2, E.back);
  hole(ctx, PA.toS(1, 1), C.y, ek);
  dot(ctx, PA.toS(1, 3), C.y, ek, 13);
  // i due valori sull'asse y
  for (const [y, col, a] of [[1, C.x, 97.5], [3, C.v, 101.4]]) {
    const k = life(t, a, 106.9, .4, .5);
    if (k <= 0) continue;
    const p = PA.toS(0, y);
    ctx.save(); ctx.globalAlpha *= k; dot(ctx, p, col, 1 + .1 * Math.sin(t * 4 + y), 13);
    axisLabel(ctx, p, String(y), col); ctx.restore();
  }
  const pa = life(t, 97.5, 107.0, .5, .5);
  card(ctx, ...DCARD, pa);
  drawLim(ctx, '{mx:x}{mink:→1⁻}', '{mink:g(}{mx:x}{mink:) = }{mx:1}', 1500, 240, { size: 60, local: t - 97.7, alpha: pa });
  txt(ctx, 'da sinistra', 1500, 335, { size: 30, color: C.dim, alpha: pa * P(t, 97.9, 98.4) });
  drawLim(ctx, '{mx:x}{mink:→1⁺}', '{mink:g(}{mx:x}{mink:) = }{mv:3}', 1500, 435, { size: 60, local: t - 101.6, alpha: pa });
  txt(ctx, 'da destra', 1500, 530, { size: 30, color: C.dim, alpha: pa * P(t, 101.8, 102.3) });
  drawRich(ctx, '{mx:1}{mink: ≠ }{mv:3}', 1500, 615, { size: 52, local: t - 103.3, alpha: pa });
  crossMark(ctx, 1500, 718, P(t, 103.8, 104.5, E.lin) * pa, C.r, .45);
  ctx.restore();
}

// 6 · in una frase (107–120)
function sceneFine(ctx, t) {
  if (t < 107.6) return;
  const al = 1 - P(t, 118.8, 119.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 108.0 });
    drawRich(ctx, 'Il limite è il valore a cui {my:f(}{mx:x}{my:)} si avvicina\nquando {mx:x} si avvicina a {mx:c}.', W / 2, 280, { size: 62, weight: 600, local: t - 108.4, stagger: .09 });
  });
  drawLim(ctx, '{mx:x}{mink:→}{mx:c}', '{mink:f(}{mx:x}{mink:) = }{mg:L}', W / 2, 445, { size: 72, local: t - 110.2 });
  const pills = [[470, 'vicino a {mx:c}, non {r:in} {mx:c}'], [960, 'sinistra e destra {g:d\'accordo}'], [1450, 'vicino {g:quanto vuoi}']];
  pills.forEach(([x, s], i) => {
    const a = 111.0 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 612); ctx.scale(k, k); ctx.translate(-x, -612);
    card(ctx, x - 225, 562, 450, 100);
    drawRich(ctx, s, x, 614, { size: 31, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: "Che cos'è un limite", durata: 120, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [118.7, 119.6] },
    capitoli: [[7.5, 29.8, 'il buco'], [29.8, 50.1, 'avvicinarsi'], [50.1, 75.6, 'vicino quanto vuoi'],
      [75.6, 91.2, 'il valore in 1 non conta'], [91.2, 107.4, 'quando non esiste']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneBuco(ctx, t); sceneTre(ctx, t); sceneSalto(ctx, t); sceneFine(ctx, t); },
  };
});
