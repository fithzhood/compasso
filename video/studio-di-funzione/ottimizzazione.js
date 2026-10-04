'use strict';
/* La scatola più grande: da un foglio 12 × 12 si tagliano gli angoli; il volume V(x) = x(12 − 2x)² e il massimo trovato con la derivata. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/ottimizzazione', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, card } = M;
  const V = x => x * (12 - 2 * x) * (12 - 2 * x);

const FINE = 96.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  // mai due cambi a meno di 2 s (tranne l'accensione 1,45 → 2,0)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [6.6, 'neutro'],
  [17.7, 'felice'], [19.8, 'neutro'],
  [30.2, 'sorpreso'], [32.2, 'neutro'], [35.8, 'pensa'],
  [40.8, 'neutro'], [46.4, 'felice'], [48.4, 'neutro'],
  [63.0, 'sorpreso'], [65.0, 'neutro'], [67.8, 'felice'], [69.8, 'neutro'],
  [77.2, 'felice'], [79.2, 'neutro'], [90.0, 'festa'], [92.8, 'felice'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 6.4, 'occhiolino'], [FINE + 8.4, 'felice'],
];
const FUMETTI = [
  [1.9, 6.7, 'Un foglio quadrato diventa una scatola.\nQual è la più capiente?'],
  [7.9, 12.3, 'Un foglio quadrato, di lato {g:12} cm.'],
  [12.5, 17.5, 'Taglio un quadratino di lato {mx:x}\na ogni angolo. Qui {mx:x}{mink: = 1}.'],
  [17.7, 22.0, 'Piego i bordi in su:\necco la scatola.'],
  [22.2, 27.8, 'Con {mx:x}{mink: = 1} è bassa e larga:\n{mink:10 · 10 · 1 = }{mg:100} cm³.'],
  [30.2, 35.6, 'Con {mx:x}{mink: = 4} è alta e stretta:\n{mink:4 · 4 · 4 = }{mg:64} cm³. Di meno!'],
  [35.8, 40.3, 'Il volume cambia con {mx:x}:\nquale {mx:x} lo rende {v:massimo}?'],
  [40.8, 46.2, 'La base è un quadrato di lato\n{mink:12 − 2}{mx:x}; l\'altezza è {mx:x}.'],
  [46.4, 51.6, 'Il volume è una funzione di {mx:x}:\n{mink:V(}{mx:x}{mink:) = }{mx:x}{mink:(12 − 2}{mx:x}{mink:)²}.'],
  [51.8, 57.0, 'Ha senso solo per {mink:0 < }{mx:x}{mink: < 6}:\ni due tagli devono stare in 12.'],
  [57.2, 62.6, 'Faccio variare {mx:x} e segno\nil volume: ecco il grafico.'],
  [63.0, 66.6, 'Il volume {g:sale}, poi {r:scende}.'],
  [67.8, 72.2, 'In cima la tangente è {v:piatta}:\nlì la derivata vale zero.'],
  [72.4, 76.2, 'Derivo: {mink:V′(}{mx:x}{mink:) = 12}{mx:x}{mink:² − 96}{mx:x}{mink: + 144}.'],
  [76.4, 79.6, 'Raccolgo 12: {mink:12(}{mx:x}{mink:² − 8}{mx:x}{mink: + 12)}.'],
  [79.8, 84.4, 'Scompongo: {mink:12(}{mx:x}{mink: − 2)(}{mx:x}{mink: − 6)}.\nNel dominio è zero solo in {mx:x}{mink: = 2}.'],
  [84.6, 89.8, 'Per {mx:x}{mink: < 2} è {g:positiva}, per {mx:x}{mink: > 2}\n{r:negativa}: in {mx:x}{mink: = 2} c\'è il {v:massimo}.'],
  [90.0, 95.4, 'La scatola migliore: base {mink:8 · 8},\naltezza {mink:2}. {mink:V(2) = }{mg:128} cm³.'],
  [FINE + 2.4, FINE + 8.8, 'Una variabile, il suo dominio,\ne il segno della {v:derivata}.'],
];

// ---- la scatola, in assonometria ----
const CARD = [372, 110, 700, 690], CARD2 = [1130, 110, 690, 690];
const K = 28, BC = [722, 470], CO = Math.cos(Math.PI / 6), SE = .62;
const S3 = (X, Y, Z) => [BC[0] + (X - Y) * K * CO, BC[1] + (X + Y) * K * SE - Z * K];
function poly(ctx, pts, fill, stroke, al = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); pts.forEach((p, i) => { const s = S3(...p); i ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]); }); ctx.closePath();
  ctx.fillStyle = css(fill); ctx.fill();
  ctx.strokeStyle = css(stroke); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.restore();
}
// x: lato del quadratino; th: piega (0 piatto, π/2 su); kAng: angoli presenti (1) o tolti (0); kRosso: angoli in rosso
function scatola(ctx, x, th, kAng, kRosso, kPieghe) {
  const h = 6 - x, c = Math.cos(th), s = Math.sin(th), e = x * c, z = x * s;
  const carta = mix(C.paper, C.y, .16), dietro = mix(carta, mix(C.paper, C.y, .42), s), davanti = mix(carta, mix(C.paper, C.y, .08), s);
  // prima del taglio è un foglio intero, senza righe
  if (kRosso <= 0) { poly(ctx, [[-6, -6, 0], [6, -6, 0], [6, 6, 0], [-6, 6, 0]], carta, C.y); return; }
  if (kAng > 0) {
    const fa = mix(carta, mix(C.paper, C.r, .35), kRosso), st = mix(C.y, C.r, kRosso);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => poly(ctx, [[sx * h, sy * h, 0], [sx * (h + x), sy * h, 0], [sx * (h + x), sy * (h + x), 0], [sx * h, sy * (h + x), 0]], fa, st, kAng));
  }
  poly(ctx, [[-h, -h, 0], [-h, h, 0], [-h - e, h, z], [-h - e, -h, z]], dietro, C.y);
  poly(ctx, [[-h, -h, 0], [h, -h, 0], [h, -h - e, z], [-h, -h - e, z]], dietro, C.y);
  poly(ctx, [[-h, -h, 0], [h, -h, 0], [h, h, 0], [-h, h, 0]], carta, C.y);
  if (kPieghe > 0) {
    ctx.save(); ctx.globalAlpha *= kPieghe; ctx.setLineDash([10, 9]); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5;
    ctx.beginPath(); [[-h, -h], [h, -h], [h, h], [-h, h], [-h, -h]].forEach((p, i) => { const q = S3(p[0], p[1], 0); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); });
    ctx.stroke(); ctx.restore();
  }
  poly(ctx, [[-h, h, 0], [h, h, 0], [h, h + e, z], [-h, h + e, z]], davanti, C.y);
  poly(ctx, [[h, -h, 0], [h, h, 0], [h + e, h, z], [h + e, -h, z]], davanti, C.y);
}

// ---- il grafico del volume ----
const G = { ox: 1215, oy: 520, ux: 88, uy: 2.6 };
const GS = (x, v) => [G.ox + x * G.ux, G.oy - v * G.uy];
function assiG(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(G.ox + i * G.ux, G.oy); ctx.lineTo(G.ox + i * G.ux, G.oy - 140 * G.uy); ctx.stroke(); }
  for (let v = 40; v <= 120; v += 40) { ctx.beginPath(); ctx.moveTo(G.ox, G.oy - v * G.uy); ctx.lineTo(G.ox + 6.2 * G.ux, G.oy - v * G.uy); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(G.ox, G.oy); ctx.lineTo(G.ox + 6.4 * G.ux, G.oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(G.ox, G.oy); ctx.lineTo(G.ox, G.oy - 146 * G.uy); ctx.stroke();
  arrowHead(ctx, [G.ox + 6.4 * G.ux + 6, G.oy], 0, C.ink);
  arrowHead(ctx, [G.ox, G.oy - 146 * G.uy - 6], -Math.PI / 2, C.ink);
  for (let i = 1; i <= 6; i++) txt(ctx, String(i), G.ox + i * G.ux, G.oy + 28, { size: 29, color: C.dim });
  for (let v = 40; v <= 120; v += 40) txt(ctx, String(v), G.ox - 14, G.oy - v * G.uy, { size: 29, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', G.ox + 6.4 * G.ux + 14, G.oy - 36, { size: 44 });
  drawRich(ctx, '{my:V}', G.ox + 30, G.oy - 146 * G.uy - 4, { size: 44 });
  ctx.restore();
}
const curvaV = (a, b) => { const p = []; for (let i = 0; i <= 160; i++) { const x = lerp(a, b, i / 160); p.push(GS(x, V(x))); } return p; };
const num = v => fmtN(v, Math.abs(v - Math.round(v)) < .005 ? 0 : 1);

// x del quadratino nel tempo; xt: fin dove è tracciato il grafico
const xt = t => kf(t, [[58.5, 0], [62.4, 6]]);
function xBox(t) {
  if (t < 58.5) return kf(t, [[28.0, 1], [30.0, 4], [57.3, 4], [58.4, .25]]);
  if (t < 66.7) return clamp(xt(t), .25, 5.75);
  return kf(t, [[66.7, 5.75], [67.7, 2]]);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La scatola più grande', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function sceneScatola(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = life(t, 7.5, FINE + .2, .6, .7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  const x = xBox(t), th = Math.PI / 2 * P(t, 18.0, 20.4);
  const kAng = 1 - P(t, 17.6, 18.0), kRosso = P(t, 12.7, 13.3), kPieghe = P(t, 13.4, 13.9) * (1 - P(t, 18.0, 18.6));
  ctx.save(); ctx.globalAlpha *= P(t, 8.0, 8.8);
  scatola(ctx, x, th, kAng, kRosso, kPieghe);
  ctx.restore();
  // le misure del foglio
  const k12 = life(t, 8.6, 17.6, .5, .4);
  if (k12 > 0) {
    const a = S3(6, 0, 0), b = S3(0, 6, 0);
    drawRich(ctx, '{g:12 cm}', a[0] + 70, a[1] + 34, { size: 38, alpha: k12, local: t - 8.6 });
    drawRich(ctx, '{g:12 cm}', b[0] - 70, b[1] + 34, { size: 38, alpha: k12, local: t - 8.8 });
  }
  const kx = life(t, 13.0, 17.6, .5, .4);
  if (kx > 0) {
    const h = 6 - x, r = S3(h + x, h + x / 2, 0);
    drawRich(ctx, '{mx:x}', r[0] + 34, r[1] + 24, { size: 44, alpha: kx });
  }
  // le misure della scatola
  const km = P(t, 41.0, 41.6);
  if (km > 0 && th > 1.5) {
    const h = 6 - x, r = S3(h, -h, 0), m = S3(h, 0, 0);
    drawRich(ctx, '{mx:x}', r[0] + 30, r[1] - x * K / 2, { size: 44, alpha: km });
    drawRich(ctx, '{mink:12 − 2}{mx:x}', m[0] + 34, m[1] + 44, { size: 38, align: 'left', alpha: km });
  }
  ctx.restore();
}

function sceneDestra(ctx, t) {
  if (t < 22.0 || t > FINE + .3) return;
  const al = life(t, 22.0, FINE + .2, .5, .7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD2);
  const x = xBox(t);
  // 1 · le misure
  const ma = life(t, 22.2, 46.5, .5, .4);
  if (ma > 0) {
    ctx.save(); ctx.globalAlpha *= ma;
    // i tre numeri dalla x arrotondata che si vede, perché il prodotto torni
    const xr = Math.round(x * 10) / 10;
    [['lato della base', 12 - 2 * xr, C.ink, 250], ['altezza', xr, C.x, 350], ['volume (cm³)', V(xr), C.g, 470]].forEach(([s, v, col, y], i) => {
      drawRich(ctx, s, 1180, y, { size: 40, align: 'left', local: t - 22.4 - i * .3 });
      fixedNum(ctx, num(v), 1770, y, i === 2 ? 64 : 52, col);
    });
    ctx.restore();
  }
  // 2 · la formula, il dominio, il grafico
  const fa = P(t, 46.7, 47.3);
  if (fa > 0) drawRich(ctx, '{mink:V(}{mx:x}{mink:) = }{mx:x}{mink:(12 − 2}{mx:x}{mink:)²}', 1475, lerp(610, 600, P(t, 72.0, 72.5)), { size: lerp(46, 40, P(t, 72.0, 72.5)), local: t - 46.7 });
  const da = life(t, 52.0, 72.0, .5, .5);
  if (da > 0) drawRich(ctx, '{dim:dominio: }{mink:0 < }{mx:x}{mink: < 6}', 1475, 690, { size: 40, alpha: da, local: t - 52.0 });
  assiG(ctx, P(t, 52.0, 52.8));
  if (t > 58.5) {
    glowStroke(ctx, curvaV(0, xt(t)), 1, C.y);
    // la salita in verde, la discesa in rosso
    const ks = P(t, 84.8, 85.8);
    if (ks > 0) { glowStroke(ctx, curvaV(0, 2), ks, C.g, 7); glowStroke(ctx, curvaV(2, 6), ks, C.r, 7); }
    // la tangente orizzontale in cima
    const kt = P(t, 67.9, 68.4);
    if (kt > 0) glowStroke(ctx, [GS(2 - 1.5 * kt, 128), GS(2 + 1.5 * kt, 128)], 1, C.v, 5);
    dot(ctx, GS(x, V(x)), x > 1.999 && t > 90.0 ? C.v : C.ink, 1, 11);
    const ra = life(t, 58.5, 89.8, .4, .4);
    if (ra > 0) {
      ctx.save(); ctx.globalAlpha *= ra;
      drawRich(ctx, '{mx:x} =', 1570, 180, { size: 38, align: 'left' });
      fixedNum(ctx, fmtN(x, 1), 1790, 180, 40, C.x);
      drawRich(ctx, '{my:V} =', 1570, 235, { size: 38, align: 'left' });
      // V calcolato dalla x arrotondata che si vede, perché i due numeri tornino
      fixedNum(ctx, fmtN(V(Math.round(x * 10) / 10), 1), 1790, 235, 40, C.y);
      ctx.restore();
    }
    const k128 = P(t, 90.2, 90.7, E.back);
    if (k128 > 0) drawRich(ctx, '{mink:V(2) = }{mg:128}', 1500, 142, { size: 42, local: t - 90.2 });
  }
  // 3 · la derivata
  const d1 = P(t, 72.5, 73.1);
  if (d1 > 0) drawRich(ctx, '{mink:V′(}{mx:x}{mink:) = 12}{mx:x}{mink:² − 96}{mx:x}{mink: + 144}', 1475, 656, { size: 40, local: t - 72.5 });
  if (t > 76.5) drawRich(ctx, '{mink:= 12(}{mx:x}{mink:² − 8}{mx:x}{mink: + 12)}', 1475, 712, { size: 40, local: t - 76.5 });
  if (t > 79.9) drawRich(ctx, '{mink:= 12(}{mx:x}{mink: − 2)(}{mx:x}{mink: − 6)}', 1475, 768, { size: 40, local: t - 79.9 });
  ctx.restore();
}

// 4 · in una frase (FINE–)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 9.4, FINE + 10.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Scrivi la grandezza come funzione\ndi {g:una sola} variabile, poi deriva.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[455, 'una variabile: {mx:x}'], [960, 'il dominio: {mink:0 < }{mx:x}{mink: < 6}'], [1465, '{mink:V′} cambia segno: {v:massimo}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.8 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 235, 450, 470, 100);
    drawRich(ctx, s, x, 502, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La scatola più grande', durata: FINE + 11.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 40.6, 'la scatola'], [40.6, 72.3, 'il volume è una funzione'], [72.3, FINE, 'la derivata']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneScatola(ctx, t); sceneDestra(ctx, t); sceneFine(ctx, t); },
  };
});
