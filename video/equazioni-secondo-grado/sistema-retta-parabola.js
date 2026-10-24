'use strict';
/* La retta che taglia la parabola — y = x² e y = x + 2 a sistema: per sostituzione x² − x − 2 = 0, Δ = 9, punti
   (−1; 1) e (2; 4); la retta scende: y = x − 0,25 dà Δ = 0 (tangente in (0,5; 0,25)), y = x − 2 dà Δ = −7 (esterna).
   Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/sistema-retta-parabola', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, makePlane, card } = M;

const FINE = 84.0, DUR = 95.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [32.0, 'felice'], [34.1, 'neutro'], [42.8, 'felice'], [44.9, 'neutro'],
  [53.5, 'sorpreso'], [55.6, 'neutro'], [58.5, 'felice'], [60.6, 'neutro'],
  [69.6, 'sorpreso'], [71.7, 'neutro'], [78.6, 'felice'], [80.7, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Dove si incontrano una retta\ne una parabola?'],
  // 1 · per sostituzione
  [7.9, 11.5, 'La parabola {my:y = x²}.'],
  [11.7, 15.5, 'La retta {mv:y = x + 2}.'],
  [15.7, 20.3, 'I punti comuni risolvono\nil {v:sistema} delle due equazioni.'],
  [20.5, 25.5, 'Tutte e due danno {mink:y}: allora\n{mink:x² = x + 2}.'],
  [25.7, 31.1, 'Porto tutto a sinistra:\n{mink:x² − x − 2 = 0}.'],
  [31.3, 36.7, '{mink:Δ = 1 + 8 = 9}: due soluzioni,\n{mink:x₁ = −1} e {mink:x₂ = 2}.'],
  [36.9, 42.3, 'Dalla retta le ordinate:\n{mink:y₁ = 1} e {mink:y₂ = 4}.'],
  [42.5, 46.7, '{mink:Δ > 0}: due punti,\nla retta è {v:secante}.'],
  // 2 · la retta scende
  [47.1, 52.0, 'Abbasso la retta:\n{mink:y = x − 0,25}.'],
  [52.2, 57.9, 'Ora {mink:x² − x + 0,25 = 0},\ncon {mink:Δ = 1 − 1 = 0}.'],
  [58.1, 63.9, 'Una sola soluzione (doppia), {mink:x = 0,5}:\nla retta è {v:tangente}.'],
  [64.1, 68.1, 'Ancora più giù: {mink:y = x − 2}.'],
  [68.3, 73.3, 'Ora {mink:x² − x + 2 = 0},\ncon {mink:Δ = 1 − 8 = −7}.'],
  [73.5, 78.1, 'Nessuna soluzione, nessun punto:\nla retta è {v:esterna}.'],
  [78.3, 83.1, 'Il {mink:Δ} dell’equazione in {mx:x}\ndice quanti sono i punti comuni.'],
  // chiusura
  [86.0, 92.6, 'Metto la retta nella parabola:\nil {mink:Δ} conta i punti comuni.'],
];

// ---------- il piano ----------
const CARD = [130, 110, 700, 690];
const PL = makePlane({ ox: 420, oy: 590, u: 76, x0: -2.8, x1: 3.4, y0: -2.5, y1: 5.6 });
// la retta y = x + q scende due volte, mai mentre Ada parla di uno stato
const qRetta = t => 2 - 2.25 * P(t, 47.4, 49.4) - 1.75 * P(t, 64.4, 66.0);
// griglia e assi; i numeri solo fuori dalla fascia che la retta spazza scendendo (fra y = x + 2 e y = x − 2)
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 36, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * u - 8, { size: 44 });
  txt(ctx, '3', ox + 3 * u, oy + 34, { size: 30, color: C.dim });
  for (const j of [3, 5]) txt(ctx, String(j), ox - 18, oy - j * u, { size: 30, color: C.dim, align: 'right' });
  ctx.restore();
}
// un punto comune: il pallino, il tratteggio fino all'asse e l'ascissa in verde sotto l'asse
function comune(ctx, x, y, k, kl) {
  if (k <= 0) return;
  if (kl > 0 && y > 0) dashed(ctx, PL.toS(x, y), PL.toS(x, 0), C.g, 1, .8 * kl);
  dot(ctx, PL.toS(x, y), C.g, k, 12);
  if (kl > 0) { const p = PL.toS(x, -.45); txt(ctx, (x < 0 ? '−' : '') + Math.abs(x), p[0], p[1], { size: 44, weight: 600, color: C.g, alpha: kl }); }
}
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  const a0 = PL.toS(PL.x0, PL.y1), a1 = PL.toS(PL.x1 + .1, PL.y0 - .1);
  ctx.save(); ctx.beginPath(); ctx.rect(a0[0], a0[1], a1[0] - a0[0], a1[1] - a0[1]); ctx.clip();
  // la parabola, poi la retta
  glowStroke(ctx, PL.curve(x => x * x, -2.42, 2.42, 300), P(t, 8.2, 9.6), C.y);
  const q = qRetta(t);
  glowStroke(ctx, [PL.toS(PL.y0 - 1 - q, PL.y0 - 1), PL.toS(PL.y1 + 1 - q, PL.y1 + 1)], P(t, 12.0, 12.8), C.v, 6);
  ctx.restore();
  // i punti comuni: due, poi uno, poi nessuno
  const due = P(t, 31.6, 32.0, E.back) * (1 - P(t, 47.0, 47.3)), kl = P(t, 31.8, 32.2) * (1 - P(t, 47.0, 47.3));
  comune(ctx, -1, 1, due, kl);
  comune(ctx, 2, 4, due, kl);
  dot(ctx, PL.toS(.5, .25), C.g, P(t, 58.4, 58.8, E.back) * (1 - P(t, 64.1, 64.4)), 12);
  ctx.restore();
}

// ---------- la scheda a destra ----------
const PAN = [870, 110, 980, 690], XS = 930, XC = PAN[0] + PAN[2] / 2, XT = PAN[0] + PAN[2] - 40;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function graffa(ctx, x, y0, y1, al) {   // la parentesi del sistema
  if (al <= 0) return;
  const m = (y0 + y1) / 2, w = 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0);
  ctx.quadraticCurveTo(x, y0, x, y0 + 14); ctx.lineTo(x, m - 12); ctx.quadraticCurveTo(x, m, x - w * .8, m);
  ctx.quadraticCurveTo(x, m, x, m + 12); ctx.lineTo(x, y1 - 14); ctx.quadraticCurveTo(x, y1, x + w, y1);
  ctx.stroke(); ctx.restore();
}
// i tre stati: [retta, entra, esce, sostituita, forma normale, Δ, istanti di sost./forma/Δ, soluzioni, punti, istanti, verdetto]
const STATI = [
  { retta: 'y = x + 2', da: 12.0, a: 47.3, sost: 'x² = x + 2', norm: 'x² − x − 2 = 0', delta: '{mink:Δ = 1 + 8 = 9}',
    ts: [20.7, 25.9, 31.5], sol: '{mink:x₁ = −1,   x₂ = 2}', punti: '{mg:(−1; 1)}{ink:   e   }{mg:(2; 4)}', tp: [32.2, 37.1, 42.7],
    ver: '{mink:Δ > 0}: 2 punti, {v:secante}' },
  { retta: 'y = x − 0,25', da: 47.3, a: 64.4, sost: 'x² = x − 0,25', norm: 'x² − x + 0,25 = 0', delta: '{mink:Δ = 1 − 1 = 0}',
    ts: [52.4, 52.7, 53.4], sol: '{mink:x = 0,5}', punti: '{mg:(0,5; 0,25)}', tp: [58.3, 58.6, 58.9],
    ver: '{mink:Δ = 0}: 1 punto, {v:tangente}' },
  { retta: 'y = x − 2', da: 64.4, a: FINE, sost: 'x² = x − 2', norm: 'x² − x + 2 = 0', delta: '{mink:Δ = 1 − 8 = −7}',
    ts: [68.5, 68.8, 69.5], sol: '{r:nessuna soluzione}', punti: null, tp: [73.7, 0, 73.9],
    ver: '{mink:Δ < 0}: nessun punto, {v:esterna}' },
];
const TAB = 78.5;   // la tabella dei tre casi prende il posto dei conti
function scenePannello(ctx, t) {
  const al = life(t, 8.0, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  // il sistema
  drawRich(ctx, '{my:y = x²}', XS + 34, 170, { size: 46, align: 'left', local: t - 8.3 });
  txt(ctx, 'parabola', XT, 170, { size: 30, color: C.dim, align: 'right', alpha: P(t, 8.5, 8.9) });
  graffa(ctx, XS + 10, 132, 278, P(t, 15.9, 16.4));
  separa(ctx, 310, P(t, 16.0, 16.4));
  STATI.forEach((s, i) => {
    const kr = life(t, s.da, s.a, i ? .3 : .1, .3);
    if (kr <= 0) return;
    ctx.save(); ctx.globalAlpha *= kr;
    drawRich(ctx, '{mv:' + s.retta + '}', XS + 34, 240, { size: 46, align: 'left', local: t - s.da - (i ? .1 : 0) });
    txt(ctx, 'retta', XT, 240, { size: 30, color: C.dim, align: 'right', alpha: i ? 1 : P(t, 12.2, 12.6) });
    // i conti spariscono quando arriva la tabella
    const kc = 1 - P(t, TAB - .3, TAB);
    if (kc > 0) {
      ctx.save(); ctx.globalAlpha *= kc;
      drawRich(ctx, '{mink:' + s.sost + '}', XC, 370, { size: 46, local: t - s.ts[0] });
      drawRich(ctx, '{mink:' + s.norm + '}', XC, 440, { size: 46, local: t - s.ts[1] });
      drawRich(ctx, s.delta, XC, 510, { size: 46, local: t - s.ts[2] });
      drawRich(ctx, s.sol, XC, 580, { size: 46, local: t - s.tp[0] });
      if (s.punti) drawRich(ctx, s.punti, XC, 645, { size: 46, local: t - s.tp[1] });
      separa(ctx, 690, P(t, s.tp[2], s.tp[2] + .3));
      drawRich(ctx, s.ver, XC, 742, { size: 42, local: t - s.tp[2] });
      ctx.restore();
    }
    ctx.restore();
  });
  // la tabella riassuntiva
  const tb = P(t, TAB, TAB + .4);
  if (tb > 0) {
    ctx.save(); ctx.globalAlpha *= tb;
    const col = [1090, 1360, 1640];
    drawRich(ctx, '{mink:Δ}', col[0], 380, { size: 40 });
    txt(ctx, 'punti comuni', col[1], 380, { size: 32, color: C.dim });
    txt(ctx, 'la retta è', col[2], 380, { size: 32, color: C.dim });
    separa(ctx, 425, 1);
    [['{mink:Δ > 0}', '2', 'secante'], ['{mink:Δ = 0}', '1', 'tangente'], ['{mink:Δ < 0}', '0', 'esterna']].forEach(([a, b, c], j) => {
      const y = 500 + j * 105, k = P(t, TAB + .2 + j * .3, TAB + .6 + j * .3);
      drawRich(ctx, a, col[0], y, { size: 50, alpha: k });
      drawRich(ctx, '{mink:' + b + '}', col[1], y, { size: 50, alpha: k });
      drawRich(ctx, '{v:' + c + '}', col[2], y, { size: 44, alpha: k });
    });
    ctx.restore();
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La retta che taglia\nla parabola', W / 2, 200, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Sostituisci la retta nella parabola:\nil {mink:Δ} dell’equazione conta i punti comuni.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'secante', '{mink:Δ > 0}'], [960, 'tangente', '{mink:Δ = 0}'], [1430, 'esterna', '{mink:Δ < 0}']];
  pills.forEach(([px, testa, f], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 445, 430, 150);
    drawRich(ctx, '{v:' + testa + '}', px, 486, { size: 32, weight: 500 });
    drawRich(ctx, f, px, 548, { size: 48 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la parabola mentre si disegna e la retta mentre scende
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7],                                             // il piano
    ['tono', 8.2, 9.6, [1, .56, .25, .06, 0, .06, .25, .56, 1]],                        // la parabola: scende e risale
    ['tono', 12.0, 12.8, [.1, .9]],                                                     // la retta y = x + 2
    ['traccia', 15.9, 16.4],                                                            // la graffa del sistema
    ['pop', 20.7, .5], ['pop', 25.9, .5], ['pop', 31.5, .55],                           // sostituita, forma normale, Δ = 9
    ['pop', 31.6, .45], ['pop', 31.8, .65], ['pop', 32.2, .5],                          // i due punti, x₁ e x₂
    ['pop', 37.1, .6], ['ding', 42.8],                                                  // le coordinate; secante
    ['tono', 47.4, 49.4, [.6, .55, .45, .4]],                                           // la retta scende: y = x − 0,25
    ['pop', 52.4, .45], ['pop', 52.7, .5], ['pop', 53.4, .5],                           // Δ = 0
    ['pop', 58.4, .4], ['ding', 58.9],                                                  // il punto di tangenza
    ['tono', 64.4, 66.0, [.4, .35, .25, .2]],                                           // ancora giù: y = x − 2
    ['pop', 68.5, .45], ['pop', 68.8, .5], ['pop', 69.5, .2],                           // Δ = −7
    ['pop', 73.7, .15],                                                                 // nessuna soluzione
    ['soffio', 78.5], ['pop', 78.7, .7], ['pop', 79.0, .5], ['pop', 79.3, .3],          // la tabella dei tre casi
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'La retta che taglia la parabola', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 46.9, 'per sostituzione'], [46.9, FINE, 'la retta scende']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
