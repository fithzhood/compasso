'use strict';
/* Il teorema fondamentale: la funzione integrale ha per pendenza l'altezza di f, quindi F′ = f. Argomento: integrali. */
CVIDEO.registra('integrali/teorema-fondamentale', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW, drawSeq, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, card, checkMark } = M;
  const f = t => .5 * (t - 2) ** 2 + .5;               // continua, alta ai lati, bassa al centro, sempre sopra l'asse
  const F = x => x ** 3 / 6 - x * x + 2.5 * x;          // la sua funzione integrale da 0 (l'area da 0 a x)
  // la pendenza di F misurata sul grafico di F, con un rapporto incrementale di passo piccolo (non copiata da f)
  const pendF = x => (F(x + 1e-3) - F(x - 1e-3)) / 2e-3;

const FINE = 91.5, DUR = 102.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.2, 'pensa'], [6.8, 'neutro'],
  [14.0, 'felice'], [16.2, 'neutro'], [24.4, 'occhiolino'], [26.4, 'neutro'],
  [36.1, 'sorpreso'], [38.2, 'neutro'], [41.8, 'pensa'], [44.2, 'neutro'], [47.5, 'felice'], [49.8, 'neutro'],
  [52.1, 'sorpreso'], [54.2, 'felice'], [56.4, 'neutro'],
  [69.9, 'pensa'], [72.4, 'neutro'], [80.4, 'neutro'], [82.8, 'sorpreso'], [84.8, 'felice'], [86.8, 'festa'], [89.2, 'felice'],
  [92.5, 'felice'], [96.0, 'occhiolino'], [98.0, 'felice'],
];
const FUMETTI = [
  [2.2, 6.6, 'Che legame c\'è\nfra aree e derivate?'],
  [8.0, 13.9, 'Ecco {my:f}, una funzione {g:continua}.\nMisuro l\'area sotto, da 0 a {mx:x}.'],
  [14.0, 18.8, 'Fino a {mx:x} = 1 l\'area vale\n{g:circa 1,67}.'],
  [18.9, 24.3, 'Se sposto {mx:x}, l\'area cambia:\ncon {mx:x} = 3 vale {g:3}.'],
  [24.4, 29.6, 'L\'area dipende da {mx:x}: è la\n{v:funzione integrale} {mv:F(}{mx:x}{mv:)}.'],
  [30.7, 36.0, 'Qui sotto segno l\'area come altezza:\nè il grafico di {mv:F}.'],
  [36.1, 41.7, 'Qui {my:f} è alta: l\'area cresce\n{g:in fretta}, {mv:F} sale ripida.'],
  [41.8, 47.4, 'Qui {my:f} è bassa: l\'area cresce\n{r:piano}, {mv:F} è quasi piatta.'],
  [47.5, 52.0, 'Poi {my:f} si rialza\ne {mv:F} torna ripida.'],
  [52.1, 58.1, 'La pendenza di {mv:F}, misurata sul grafico,\nè proprio l\'altezza di {my:f}.'],
  [59.1, 64.4, 'Allungo {mx:x} di un pezzetto {mx:h}:\nl\'area cresce di una {v:striscia}.'],
  [64.5, 69.8, 'La striscia è quasi un rettangolo\nalto {my:f(x)} e largo {mx:h}.'],
  [69.9, 75.2, 'Quindi {mv:F(x + }{mx:h}{mv:) − F(x)}\nè circa {my:f(x)} · {mx:h}.'],
  [75.3, 80.3, 'Divido per {mx:h} e confronto\ncon {my:f(1) = 1}.'],
  [80.4, 86.0, 'Stringo la striscia: il rapporto\nsi avvicina a {g:1}, cioè a {my:f(1)}.'],
  [86.1, 91.2, 'Il limite del rapporto è la derivata:\n{mv:F′(x)}{mink: = }{my:f(x)}.'],
  [92.5, 99.4, 'Derivare la funzione integrale\nridà {my:f}: sono operazioni {v:inverse}.'],
];

// ---- due piani con la stessa scala orizzontale, uno sopra l'altro ----
function piano(o) {
  const p = { ...o };
  p.toS = (x, y) => [o.ox + x * o.ux, o.oy - y * o.uy];
  p.axes = (ctx, k) => {
    if (k <= 0) return;
    const { ox, oy, ux, uy, x0, x1, y0, y1 } = o;
    ctx.save();
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
    for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * ux; ctx.beginPath(); ctx.moveTo(x, oy - y1 * uy * k); ctx.lineTo(x, oy - y0 * uy * k); ctx.stroke(); }
    for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * uy; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, y); ctx.lineTo(ox + x1 * ux * k, y); ctx.stroke(); }
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox + (x0 - .05) * ux * k, oy); ctx.lineTo(ox + (x1 + .1) * ux * k, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .05) * uy * k); ctx.lineTo(ox, oy - (y1 + .15) * uy * k); ctx.stroke();
    arrowHead(ctx, [ox + (x1 + .1) * ux * k + 6, oy], 0, C.ink);
    arrowHead(ctx, [ox, oy - (y1 + .15) * uy * k - 6], -Math.PI / 2, C.ink);
    ctx.globalAlpha *= P(k, .6, 1);
    for (let i = Math.ceil(x0); i <= x1; i++) if (i) txt(ctx, String(i), ox + i * ux, oy + 30, { size: 29, color: C.dim });
    for (let j = Math.ceil(y0); j <= y1; j++) if (j) txt(ctx, String(j), ox - 20, oy - j * uy, { size: 29, color: C.dim, align: 'right' });
    txt(ctx, '0', ox - 18, oy + 28, { size: 29, color: C.dim });
    drawRich(ctx, '{mx:x}', ox + (x1 + .1) * ux + 34, oy, { size: 42 });
    // il nome dell'asse verticale: a sinistra (sotto: lì a destra passa il tratteggio che scende da x)
    if (o.labSinistra) drawRich(ctx, o.ylab, ox - 16, oy - (y1 + .15) * uy + 22, { size: 42, align: 'right' });
    else drawRich(ctx, o.ylab, ox + 26, oy - (y1 + .15) * uy - 6, { size: 42, align: 'left' });
    ctx.restore();
  };
  return p;
}
const PF = piano({ ox: 450, oy: 400, ux: 150, uy: 95, x0: -0.3, x1: 4.3, y0: -0.2, y1: 2.75, ylab: '{my:f}' });
const PG = piano({ ox: 450, oy: 750, ux: 150, uy: 72, x0: -0.3, x1: 4.3, y0: -0.2, y1: 3.9, ylab: '{mv:F}', labSinistra: true });
const CURVA = []; for (let i = 0; i <= 200; i++) { const x = lerp(-0.1, 4.1, i / 200); CURVA.push(PF.toS(x, f(x))); }
const CARD = [380, 105, 800, 695];

// dove sta x: fermo mentre Ada parla, si muove all'inizio di un fumetto o fra due capitoli
const X_KEYS = [[9.4, 0], [10.7, 1], [19.0, 1], [20.4, 3], [29.7, 3], [30.5, 0], [30.9, 0], [32.1, .5], [41.9, .5], [43.3, 2],
  [47.6, 2], [49.0, 3.6], [58.2, 3.6], [59.0, 1]];
const XT_KEYS = [[30.9, 0], [32.1, .5], [41.9, .5], [43.3, 2], [47.6, 2], [49.0, 3.6]];
const H_KEYS = [[59.2, 0], [60.0, .5], [80.5, .5], [81.3, .1], [81.8, .1], [82.6, .01]];

function regione(ctx, a, b, col, alfa) {
  if (b - a < 1e-4 || alfa <= 0) return;
  ctx.save(); ctx.fillStyle = css(col, alfa);
  ctx.beginPath(); ctx.moveTo(...PF.toS(a, 0));
  for (let j = 0; j <= 60; j++) { const x = lerp(a, b, j / 60); ctx.lineTo(...PF.toS(x, f(x))); }
  ctx.lineTo(...PF.toS(b, 0)); ctx.closePath(); ctx.fill(); ctx.restore();
}
function segmento(ctx, a, b, col, w = 5) {
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il teorema fondamentale', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// i due piani (7.5–FINE)
function scenePiani(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  PF.axes(ctx, P(t, 7.7, 8.7));
  const x = kf(t, X_KEYS), h = t > 59.0 ? kf(t, H_KEYS) : 0;
  // l'area accumulata da 0 a x, e la striscia fra x e x + h
  regione(ctx, 0, x, C.g, .25 * P(t, 9.3, 9.6));
  if (h > 0) {
    const sa = 1 - P(t, 86.0, 86.7);
    regione(ctx, x, x + h, C.v, .45 * sa);
    // il rettangolo alto f(x) e largo h
    const ra = P(t, 64.6, 65.2) * sa;
    if (ra > 0) {
      const a = PF.toS(x, 0), b = PF.toS(x + h, f(x));
      ctx.save(); ctx.globalAlpha *= ra; ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3; ctx.setLineDash([8, 7]);
      ctx.strokeRect(a[0], b[1], b[0] - a[0], a[1] - b[1]); ctx.restore();
      const ka = ra * (1 - P(t, 80.4, 81.0));
      drawRich(ctx, '{mx:h}', PF.toS(x + h / 2, 0)[0], b[1] - 26, { size: 36, alpha: ka });
      drawRich(ctx, '{my:f(}{mx:x}{my:)}', a[0] - 14, PF.toS(x, f(x) * .45)[1], { size: 34, align: 'right', alpha: ra * (1 - P(t, 75.2, 75.8)) });
    }
  }
  glowStroke(ctx, CURVA, P(t, 7.9, 9.0), C.y, 5);
  // il bordo mobile dell'area: diventa l'«altezza di f» quando se ne parla
  if (t > 9.3) {
    const kb = P(t, 36.2, 36.8) * (1 - P(t, 58.1, 58.7)) + life(t, 75.4, 86.0, .4, .4);
    segmento(ctx, PF.toS(x, 0), PF.toS(x, f(x)), mix(C.x, C.y, kb), 4 + 4 * kb);
    dot(ctx, PF.toS(x, 0), C.x, P(t, 9.3, 9.7), 10);
    const k1 = life(t, 81.0, 86.0, .4, .4);
    if (k1 > 0) drawRich(ctx, '{my:f(1) = 1}', PF.toS(x, f(x))[0] + 14, PF.toS(x, f(x))[1] - 34, { size: 34, align: 'left', alpha: k1 });
  }
  // il grafico di F, sotto
  const ga = P(t, 29.9, 30.7);
  if (ga > 0) {
    ctx.save(); ctx.globalAlpha *= ga;
    PG.axes(ctx, ga);
    const xt = kf(t, XT_KEYS);
    const pts = []; for (let i = 0; i <= 120; i++) { const u = xt * i / 120; pts.push(PG.toS(u, F(u))); }
    if (xt > 0.003) glowStroke(ctx, pts, 1, C.v, 5);
    dashed(ctx, [PF.toS(x, 0)[0], PF.oy + 46], PG.toS(x, F(x)), C.x, 1, .55);
    // la tangente a F, con la pendenza misurata su F
    const ta = P(t, 36.2, 36.8) * (1 - P(t, 58.1, 58.7));
    if (ta > 0) {
      const d = .55, m = pendF(x);
      ctx.save(); ctx.globalAlpha *= ta;
      ctx.beginPath(); ctx.rect(CARD[0], 455, CARD[2], 340); ctx.clip();
      glowStroke(ctx, [PG.toS(x - d, F(x) - m * d), PG.toS(x + d, F(x) + m * d)], 1, C.g, 4);
      ctx.restore();
    }
    dot(ctx, PG.toS(x, F(x)), C.v, 1, 10);
    ctx.restore();
  }
  ctx.restore();
}

// la scheda a destra
function riga(ctx, label, val, y, col, al = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, 1280, y, { size: 40, align: 'left' });
  fixedNum(ctx, val, 1770, y, 44, col);
  ctx.restore();
}
function scenePannello(ctx, t) {
  if (t < 13.9 || t > FINE + .2) return;
  const pa = life(t, 14.0, FINE, .5, .6);
  card(ctx, 1230, 120, 590, 660, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  const x = kf(t, X_KEYS);
  // 1 · l'area fino a x, e il suo nome (14–29.7)
  const a1 = 1 - P(t, 29.5, 30.1);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'area da 0 a {mx:x}', 1525, 190, { size: 40, weight: 600 }));
    riga(ctx, '{mx:x} =', fmtN(x), 290, C.x);
    riga(ctx, 'area ≈', fmtN(F(x)), 360, C.g);
    const fk = P(t, 24.5, 25.1);
    if (fk > 0) {
      ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= fk;
      ctx.beginPath(); ctx.moveTo(1280, 430); ctx.lineTo(1770, 430); ctx.stroke(); ctx.restore();
      drawRich(ctx, '{mv:F(}{mx:x}{mv:)}{mink: = }area da 0 a {mx:x}', 1525, 540, { size: 44, local: t - 24.6 });
      drawRich(ctx, '{dim:funzione integrale}', 1525, 630, { size: 30, local: t - 25.2 });
    }
    ctx.restore();
  }
  // 2 · F(x), poi altezza di f e pendenza di F (30.7–58.6)
  const a2 = life(t, 30.7, 58.6, .5, .5);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, 'nel punto {mx:x}', 1525, 190, { size: 40, weight: 600 }));
    riga(ctx, '{mx:x} =', fmtN(x), 270, C.x);
    riga(ctx, '{mv:F(}{mx:x}{mv:)} ≈', fmtN(F(x)), 340, C.v);
    const k2 = P(t, 36.2, 36.7);
    riga(ctx, 'altezza di {my:f}', fmtN(f(x)), 435, C.y, k2);
    riga(ctx, 'pendenza di {mv:F}', fmtN(pendF(x)), 505, C.g, k2);
    drawRich(ctx, '{dim:misurata sul grafico di }{mv:F}', 1525, 560, { size: 30, alpha: k2 });
    const ug = P(t, 52.2, 52.8);
    if (ug > 0) {
      checkMark(ctx, 1525, 650, P(t, 52.3, 53.3), C.g, .4);
      drawRich(ctx, '{g:uguali}', 1525, 727, { size: 34, alpha: ug });
    }
    ctx.restore();
  }
  // 3 · la striscia (59.1–86.1)
  const a3 = life(t, 59.2, 86.3, .5, .5);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    conFont(TITOLI, () => drawRich(ctx, 'la {v:striscia}', 1525, 180, { size: 40, weight: 600 }));
    const h = kf(t, H_KEYS);
    riga(ctx, '{mx:x} = 1', '', 255, C.x);
    drawRich(ctx, '{my:f(1) = 1}', 1770, 255, { size: 40, align: 'right', alpha: P(t, 75.4, 75.9) });
    riga(ctx, '{mx:h} =', fmtN(h, h < .05 ? 2 : 1), 320, C.x);
    drawRich(ctx, '{mv:F(x + }{mx:h}{mv:) − F(x)}{mink: ≈ }{my:f(x)}{mink: · }{mx:h}', 1525, 395, { size: 40, local: t - 70.0 });
    // il rapporto da solo; «→ f(x)» arriva quando la striscia si stringe (con h = 0,5 il rapporto vale 0,792: non è ≈ 1)
    if (t > 75.4) {
      const num = '{mv:F(x + }{mx:h}{mv:) − F(x)}', den = '{mx:h}', lim = '{mink:→ }{my:f(x)}', sz = 40;
      const wf = Math.max(richW(ctx, num, sz), richW(ctx, den, sz)) + sz * .35, x0 = 1525 - (wf + sz * .12 + richW(ctx, lim, sz)) / 2;
      drawSeq(ctx, [{ num, den }], x0 + wf / 2, 490, sz, { local: t - 75.4 });
      if (t > 80.7) drawRich(ctx, lim, x0 + wf + sz * .12, 490, { size: sz, align: 'left', local: t - 80.7 });
    }
    const tk = P(t, 75.8, 76.3);
    if (tk > 0) {
      ctx.save(); ctx.globalAlpha *= tk;
      ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1280, 560); ctx.lineTo(1770, 560); ctx.stroke();
      drawRich(ctx, '{mx:h}', 1400, 590, { size: 32 }); txt(ctx, 'rapporto', 1650, 590, { size: 30, color: C.dim });
      [[76.0, '0,5', '0,792'], [81.0, '0,1', '0,952'], [82.7, '0,01', '0,995']].forEach(([t0, a, b], i) => {
        const k = P(t, t0, t0 + .45, E.out); if (k <= 0) return;
        txt(ctx, a, 1400, 634 + i * 44, { size: 34, color: C.x, alpha: k });
        txt(ctx, b, 1650, 634 + i * 44, { size: 34, color: i === 2 ? C.g : C.ink, weight: i === 2 ? 600 : 500, alpha: k });
      });
      ctx.restore();
    }
    ctx.restore();
  }
  // 4 · il teorema (86.1–FINE)
  const a4 = P(t, 86.2, 86.8);
  if (a4 > 0) {
    ctx.save(); ctx.globalAlpha *= a4;
    conFont(TITOLI, () => drawRich(ctx, 'teorema fondamentale', 1525, 230, { size: 40, weight: 600 }));
    drawRich(ctx, '{dim:se }{my:f}{dim: è continua:}', 1525, 320, { size: 34, local: t - 86.3 });
    drawRich(ctx, '{mv:F′(}{mx:x}{mv:)}{mink: = }{my:f(}{mx:x}{my:)}', 1525, 440, { size: 80, local: t - 86.6 });
    drawRich(ctx, '{dim:la derivata della funzione integrale}\n{dim:è la funzione di partenza}', 1525, 600, { size: 30, local: t - 87.4 });
    ctx.restore();
  }
  ctx.restore();
}

// in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La pendenza di {mv:F}\nè l\'altezza di {my:f}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mv:F(}{mx:x}{mv:)} = area da 0 a {mx:x}'], [960, 'striscia ≈ {my:f(}{mx:x}{my:)}{mink: · }{mx:h}'], [1430, '{mv:F′(}{mx:x}{mv:)}{mink: = }{my:f(}{mx:x}{my:)}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 215, 450, 430, 100);
    drawRich(ctx, s, x, 502, { size: 33, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il teorema fondamentale', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 29.9, 'l\'area accumulata'], [29.9, 58.6, 'come cresce'], [58.6, FINE, 'perché']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiani(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
