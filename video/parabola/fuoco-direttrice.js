'use strict';
/* Fuoco e direttrice — i punti che distano da un punto quanto da una retta disegnano la parabola.
   Argomento: parabola. */
CVIDEO.registra('parabola/fuoco-direttrice', M => {
  const { W, C, E, P, life, kf, css, mix, TITOLI, conFont, drawRich, fixedNum, fmtN,
    dot, glowStroke, makePlane, card, checkMark, crossMark } = M;

const POSA = {
  x: [[0, 760], [6.5, 760], [7.7, 190], [78.3, 190], [79.6, 420]],
  y: [[0, 900], [6.5, 900], [7.7, 1050], [78.3, 1050], [79.6, 1035]],
  s: [[0, 4.4], [6.5, 4.4], [7.7, 2.2], [78.3, 2.2], [79.6, 3.0]],
  lx: [[0, 0], [6.5, 0], [7.7, 2], [78.3, 2], [79.6, 1.5]],
  ly: [[0, 0], [6.5, 0], [7.7, -1.5], [78.3, -1.5], [79.6, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [3.0, 'pensa'], [6.5, 'neutro'],
  [16.9, 'pensa'], [19.6, 'neutro'],
  [36.8, 'sorpreso'], [38.9, 'neutro'],
  [43.7, 'felice'], [46.0, 'neutro'], [50.9, 'felice'], [53.0, 'neutro'], [57.0, 'felice'], [59.2, 'neutro'],
  [68.9, 'festa'], [71.4, 'felice'], [73.5, 'neutro'],
  [84.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [1.5, 6.5, 'Quali punti distano da un punto\nquanto da una retta?'],
  // 1 · fuoco e direttrice
  [8.8, 12.6, 'Questo punto è il {v:fuoco}, {mink:F}.'],
  [12.9, 16.8, 'Questa retta è la {v:direttrice}, {mink:d}.'],
  [16.9, 22.3, 'Cerco i punti che distano da {mink:F}\nquanto distano da {mink:d}.'],
  // 2 · le due distanze
  [22.7, 26.0, 'Prendo un punto {mink:P}.'],
  [26.2, 30.7, 'La distanza da {mink:F} è\nil segmento {mx:PF}.'],
  [30.8, 36.6, 'La distanza da {mink:d} va in {v:perpendicolare}:\nè {my:PH}, fino al piede {mink:H}.'],
  [36.7, 41.8, '{mx:PF} è più corto di {my:PH}:\n{mink:P} {r:non va bene}.'],
  // 3 · i punti giusti
  [43.6, 49.0, 'A metà strada fra {mink:F} e {mink:d}\nle distanze sono {g:uguali}!'],
  [50.8, 55.0, 'Anche qui {mx:PF} e {my:PH}\nsono {g:uguali}.'],
  [56.8, 61.9, 'Più in alto: tutte e due\nvalgono {g:5}.'],
  [62.0, 68.6, 'Muovo {mink:P} in modo che restino\n{g:sempre uguali}…'],
  [68.8, 73.2, '…e la sua traccia è una {g:parabola}!'],
  [73.4, 78.2, 'Ogni suo punto ha\n{mx:PF}{mink: = }{my:PH}.'],
  // chiusura
  [80.0, 85.8, 'Stessa distanza da {mink:F} e da {mink:d}:\nè questa la {g:parabola}.'],
];

// fuoco F(0; 1), direttrice y = −1: la parabola è y = x²/4. Una sola unità per i due assi.
const PL = makePlane({ ox: 650, oy: 630, u: 85, x0: -5, x1: 5, y0: -1.6, y1: 5.6 });
const CARD = [150, 110, 1000, 690];
const par = x => x * x / 4;
const FOC = PL.toS(0, 1);
// dove sta P: prima salta fra punti di prova (in linea retta), poi scorre sulla parabola
const PX = [[22.6, 2], [41.9, 2], [43.5, 0], [49.1, 0], [50.7, 2], [55.1, 2], [56.7, 4]];
const PY = [[22.6, 3], [41.9, 3], [43.5, 0], [49.1, 0], [50.7, 1], [55.1, 1], [56.7, 4]];
const SWEEP = [[62.2, 4], [68.6, -4.4]];
function posP(t) {
  if (t < SWEEP[0][0]) return [kf(t, PX), kf(t, PY)];
  const x = kf(t, SWEEP); return [x, par(x)];
}
function segmento(ctx, a, b, col, k = 1, w = 6) { if (k > 0) glowStroke(ctx, [a, b], k, col, w); }
function griglia(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.grid; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = -6; i <= 6; i++) { const a = PL.toS(i, -2), b = PL.toS(i, 6.5); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  for (let j = -2; j <= 6; j++) { const a = PL.toS(-6, j), b = PL.toS(6, j); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Fuoco e direttrice', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il piano con fuoco, direttrice, P e la traccia (7.5–78.3)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > 78.4) return;
  const A = 1 - P(t, 77.6, 78.3);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(CARD[0] + 2, CARD[1] + 2, CARD[2] - 4, CARD[3] - 4, 20); ctx.clip();
  griglia(ctx, P(t, 7.7, 8.7));

  // la direttrice
  const dk = P(t, 12.8, 13.7);
  if (dk > 0) glowStroke(ctx, [PL.toS(-5.4, -1), PL.toS(5.4, -1)], dk, C.v, 5);
  if (t > 13.4) drawRich(ctx, '{mv:d}', PL.toS(5.2, -1)[0], PL.toS(5.2, -1)[1] + 38, { size: 44, local: t - 13.4 });

  // la traccia della parabola: si disegna dietro a P mentre scorre
  if (t > SWEEP[0][0]) {
    const lo = Math.max(kf(t, SWEEP), -4.4), hi = kf(t, [[68.8, 4], [69.6, 4.4]]);
    glowStroke(ctx, PL.curve(par, lo, hi, 160).reverse(), 1, C.g, 6);
  }
  // i punti giusti trovati restano segnati
  [[43.8, 0, 0], [51.0, 2, 1], [57.0, 4, 4]].forEach(([a, x, y]) => dot(ctx, PL.toS(x, y), C.g, P(t, a, a + .4, E.back), 11));

  // P, con i segmenti verso F e verso la direttrice
  const [x, y] = posP(t), Ps = PL.toS(x, y), Hs = PL.toS(x, -1);
  const segA = 1 - P(t, 73.0, 73.6);
  if (t > 22.5 && segA > 0) {
    ctx.save(); ctx.globalAlpha *= segA;
    segmento(ctx, Ps, FOC, C.x, P(t, 26.3, 27.0));
    segmento(ctx, Ps, Hs, C.y, P(t, 30.9, 31.6));
    const ha = P(t, 31.3, 31.7);
    if (ha > 0) {
      // l'angolo retto in H e l'etichetta, sotto la direttrice
      ctx.save(); ctx.globalAlpha *= ha; ctx.strokeStyle = css(C.y); ctx.lineWidth = 3;
      const s = x < -.01 ? -1 : 1;
      ctx.beginPath(); ctx.moveTo(Hs[0] + 22 * s, Hs[1]); ctx.lineTo(Hs[0] + 22 * s, Hs[1] - 22); ctx.lineTo(Hs[0], Hs[1] - 22); ctx.stroke();
      ctx.restore();
      dot(ctx, Hs, C.y, ha, 9);
      drawRich(ctx, '{my:H}', Hs[0], Hs[1] + 40, { size: 40, alpha: ha });
    }
    const rosso = life(t, 36.8, 41.8, .3, .4);
    dot(ctx, Ps, mix(C.ink, C.r, rosso), P(t, 22.6, 23.0, E.back), 12);
    // l'etichetta in alto a sinistra di P: la traccia si disegna alla sua destra e PF non sale mai di lì
    const pl = life(t, 22.7, 69.1, .4, .5);
    if (pl > 0) drawRich(ctx, '{mink:P}', Ps[0] - 30, Ps[1] - 38, { size: 42, alpha: pl });
    ctx.restore();
  }
  ctx.restore();

  // il fuoco: sopra a tutto, con l'etichetta appena sopra (lì i segmenti non passano mai)
  const fk = P(t, 8.6, 9.0, E.back);
  dot(ctx, FOC, C.v, fk, 13);
  if (fk > 0) drawRich(ctx, '{mv:F}', FOC[0] - 6, FOC[1] - 52, { size: 44, alpha: Math.min(1, fk) });
  ctx.restore();
}

// la scheda delle distanze, a destra
function sceneScheda(ctx, t) {
  const ca = life(t, 26.2, 78.3, .5, .7);
  if (ca <= 0) return;
  const [x, y] = posP(t);
  const PF = Math.hypot(x, y - 1), PH = y + 1;
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, 1210, 110, 640, 690);
  conFont(TITOLI, () => drawRich(ctx, 'le distanze', 1530, 178, { size: 42, weight: 600 }));
  // le due misure: spariscono con P e i suoi segmenti
  const ra = 1 - P(t, 73.0, 73.6);
  if (ra > 0) {
    ctx.save(); ctx.globalAlpha *= ra;
    drawRich(ctx, '{mx:PF}{mink: =}', 1275, 290, { size: 54, align: 'left', local: t - 26.4 });
    fixedNum(ctx, fmtN(PF), 1770, 290, 66, C.x, P(t, 26.6, 27.0));
    const hk = P(t, 31.0, 31.5);
    if (hk > 0) {
      drawRich(ctx, '{my:PH}{mink: =}', 1275, 400, { size: 54, align: 'left', local: t - 31.0 });
      fixedNum(ctx, fmtN(PH), 1770, 400, 66, C.y, P(t, 31.2, 31.6));
    }
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 470); ctx.lineTo(1810, 470); ctx.stroke();
    ctx.restore();
  }
  // il verdetto, solo quando P è fermo
  const no = life(t, 36.8, 41.8, .3, .4);
  if (no > 0) {
    ctx.save(); ctx.globalAlpha *= no; crossMark(ctx, 1345, 590, P(t, 36.8, 37.6), C.r, .55); ctx.restore();
    drawRich(ctx, '{r:diverse}', 1420, 590, { size: 50, align: 'left', alpha: no });
  }
  for (const [a, b] of [[43.7, 49.0], [50.9, 55.0], [56.9, 73.4]]) {
    const ok = life(t, a, b, .3, .4);
    if (ok <= 0) continue;
    ctx.save(); ctx.globalAlpha *= ok; checkMark(ctx, 1345, 590, P(t, a, a + .8), C.g, .55); ctx.restore();
    drawRich(ctx, '{g:uguali}', 1420, 590, { size: 50, align: 'left', alpha: ok });
  }
  // la regola, quando la parabola è disegnata
  const rg = P(t, 73.6, 74.2);
  if (rg > 0) {
    drawRich(ctx, '{dim:per ogni punto della parabola}', 1530, 360, { size: 32, alpha: rg, local: t - 73.6 });
    drawRich(ctx, '{mx:PF}{mink: = }{my:PH}', 1530, 490, { size: 88, alpha: rg, local: t - 73.9 });
  }
  ctx.restore();
}

// chiusura (78.3–88.5)
function sceneFine(ctx, t) {
  if (t < 78.3) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 78.6 });
    drawRich(ctx, 'Ogni punto della parabola è lontano\ndal {v:fuoco} quanto dalla {v:direttrice}.', W / 2, 290, { size: 64, weight: 600, local: t - 79.0, stagger: .08 });
  });
  const pills = [[490, 'il {v:fuoco}', '{mv:F}: un punto'], [960, 'la {v:direttrice}', '{mv:d}: una retta'], [1430, 'per ogni punto', '{mx:PF}{mink: = }{my:PH}']];
  pills.forEach(([px, testa, f], i) => {
    const a = 80.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 445, 430, 150);
    drawRich(ctx, testa, px, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, px, 548, { size: 44 });
    ctx.restore();
  });
}

  return {
    titolo: 'Fuoco e direttrice', durata: 88.5, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 22.4, 'fuoco e direttrice'], [22.4, 41.9, 'le due distanze'], [41.9, 78.0, 'i punti giusti']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
