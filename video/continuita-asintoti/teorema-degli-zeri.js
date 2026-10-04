'use strict';
/* Il teorema degli zeri — da sotto a sopra senza staccare la matita si passa per lo zero; se la curva salta, no. Argomento: continuita-asintoti. */
CVIDEO.registra('continuita-asintoti/teorema-degli-zeri', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, dot, hole, glowStroke, dashed, arrowHead, card } = M;

const FINE = 85.3;
const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [22.4, 'felice'], [24.6, 'neutro'], [34.2, 'felice'], [36.4, 'neutro'],
  [41.6, 'sorpreso'], [43.8, 'neutro'], [46.7, 'felice'], [48.9, 'neutro'],
  [63.6, 'festa'], [66.0, 'neutro'], [70.4, 'pensa'], [72.6, 'neutro'], [75.9, 'sorpreso'], [78.0, 'neutro'],
  [86.9, 'felice'], [89.6, 'occhiolino'], [91.6, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [1.7, 6.4, 'Salendo da sotto a sopra,\nsi passa dallo {g:zero}?'],
  // 1 · da sotto a sopra
  [9.2, 13.9, 'Prendo due numeri sull\'asse {mx:x}:\n{mx:a} e {mx:b}.'],
  [15.2, 21.1, 'In {mx:a} la funzione {mink:f} è {r:negativa}:\nil punto {mink:A} sta sotto l\'asse.'],
  [22.4, 27.1, 'In {mx:b} è {g:positiva}:\n{mink:B} sta sopra l\'asse.'],
  [28.6, 33.0, 'Unisco {mink:A} e {mink:B} senza\nstaccare la matita.'],
  [34.2, 39.8, 'Per forza taglio l\'asse {mx:x}:\nin {mink:c} la funzione vale {g:zero}.'],
  [41.6, 46.6, 'Con un\'altra strada gli zeri\npossono essere di più.'],
  [46.7, 50.2, 'Ma {g:almeno uno} c\'è sempre.'],
  // 2 · il teorema
  [51.6, 56.3, 'Segni opposti: il prodotto\n{mink:f(}{mx:a}{mink:) · f(}{mx:b}{mink:)} è {r:negativo}.'],
  [57.5, 62.2, 'E {mink:f} deve essere {v:continua} in\n{mink:[}{mx:a}{mink:, }{mx:b}{mink:]}, estremi compresi.'],
  [63.6, 69.5, 'Allora c\'è almeno un {mink:c}\nfra {mx:a} e {mx:b} con {mink:f(c) = 0}.'],
  // 3 · se la matita si stacca
  [70.4, 74.1, 'E se {r:stacco} la matita?'],
  [75.9, 79.9, 'Il grafico {r:salta} l\'asse:\nnessuno zero.'],
  [81.1, 85.1, 'Senza {v:continuità} lo zero\nnon è più garantito.'],
  // chiusura
  [86.9, 92.6, 'Da sotto a sopra senza salti:\nlo zero c\'è, almeno uno.'],
];

const PCARD = [90, 110, 1000, 690], RCARD = [1140, 110, 690, 690], RX = 1485;
const XS0 = 1282, XS1 = 1690;   // la riga rossa che cancella «f continua in [a, b]»
const PL = { ox: 150, oy: 460, u: 75 };
const S = (x, y) => [PL.ox + x * PL.u, PL.oy - y * PL.u];
const A = 1.5, B = 9.5, FA = -2.4, FB = 2.4;
const liscia = u => u * u * (3 - 2 * u);
const uu = x => (x - A) / (B - A);
const c1 = x => FA + (FB - FA) * liscia(uu(x));
const c2 = x => { const u = uu(x); return FA + (FB - FA) * u + 2 * (1 - .4 * u) * Math.sin(3 * Math.PI * u); };
const ZERI2 = [2.534, 3.572, 6.489];
const sx = x => -2.4 + 1.6 * liscia(uu(x) / .5);            // il pezzo sinistro del salto, fino a −0,8
const dx = x => 1.0 + 1.4 * liscia((uu(x) - .5) / .5);      // il pezzo destro, da 1
const XM = (A + B) / 2;
const curva = (f, a, b, n = 160) => { const p = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; p.push(S(x, f(x))); } return p; };
const C1 = curva(c1, A, B), C2 = curva(c2, A, B), SX = curva(sx, A, XM), DX = curva(dx, XM, B);

function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  const o = S(0, 0);
  ctx.beginPath(); ctx.moveTo(o[0] - 10, o[1]); ctx.lineTo(S(11, 0)[0], o[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(o[0], S(0, -3.6)[1]); ctx.lineTo(o[0], S(0, 3.5)[1]); ctx.stroke();
  arrowHead(ctx, [S(11, 0)[0] + 6, o[1]], 0, C.ink);
  arrowHead(ctx, [o[0], S(0, 3.5)[1] - 6], -Math.PI / 2, C.ink);
  drawRich(ctx, '{mx:x}', S(11, 0)[0] + 40, o[1], { size: 44 });
  drawRich(ctx, '{my:y}', o[0] + 30, S(0, 3.5)[1] - 14, { size: 44 });
  ctx.restore();
}
function estremo(ctx, t, x, y, nome, lab, col, t0) {
  const k = P(t, t0, t0 + .5);
  if (k <= 0) return;
  dashed(ctx, S(x, 0), S(x, y), col, k, .9);
  dot(ctx, S(x, y), col, P(t, t0 + .4, t0 + .8, E.back), 12);
  const p = S(x, y);
  drawRich(ctx, '{mink:' + nome + '}', p[0] + (x < 5 ? -40 : 40), p[1], { size: 42, alpha: P(t, t0 + .5, t0 + .9) });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Il teorema degli zeri', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

function sceneGrafico(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al); card(ctx, ...RCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  assi(ctx, P(t, 7.4, 8.2));
  // a e b sull'asse x
  const kab = P(t, 8.4, 8.9);
  [[A, 'a', .45], [B, 'b', -.5]].forEach(([x, n, dy]) => {
    if (kab <= 0) return;
    const p = S(x, 0);
    ctx.save(); ctx.globalAlpha *= kab; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(p[0], p[1] - 9); ctx.lineTo(p[0], p[1] + 9); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mx:' + n + '}', p[0], S(x, dy)[1], { size: 44, alpha: kab });
  });
  // la prima strada, con il suo zero
  const a1 = 1 - P(t, 39.9, 40.3);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    glowStroke(ctx, C1, P(t, 27.2, 28.4, E.lin), C.y, 6);
    const kc = P(t, 33.2, 33.7, E.back);
    if (kc > 0) {
      dot(ctx, S(5.5, 0), C.g, kc, 12);
      drawRich(ctx, '{mg:c}', S(5.85, -.5)[0], S(5.85, -.5)[1], { size: 44, alpha: P(t, 33.4, 33.8) });
    }
    ctx.restore();
  }
  // la seconda strada, con tre zeri
  const a2 = P(t, 40.2, 40.3) * (1 - P(t, 69.6, 70.2));
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    glowStroke(ctx, C2, P(t, 40.2, 41.2, E.lin), C.y, 6);
    ZERI2.forEach((z, i) => dot(ctx, S(z, 0), C.g, P(t, 41.0 + i * .12, 41.4 + i * .12, E.back), 11));
    ctx.restore();
  }
  // il salto: la matita si stacca
  if (t > 74.1) {
    glowStroke(ctx, SX, P(t, 74.2, 74.9, E.lin), C.y, 6);
    glowStroke(ctx, DX, P(t, 75.2, 75.8, E.lin), C.y, 6);
    hole(ctx, S(XM, -.8), C.y, P(t, 74.8, 75.1, E.back), 12);
    dot(ctx, S(XM, 1.0), C.y, P(t, 75.1, 75.4, E.back), 11);
  }
  // A e B sopra le curve
  estremo(ctx, t, A, FA, 'A', '', C.r, 14.0);
  estremo(ctx, t, B, FB, 'B', '', C.g, 21.2);
  ctx.restore();
}

function sceneScheda(ctx, t) {
  if (t < 14 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= life(t, 7.2, FINE, .6, .6);
  conFont(TITOLI, () => {
    drawRich(ctx, 'agli estremi', RX, 180, { size: 42, weight: 600, alpha: P(t, 14.4, 14.9) * (1 - P(t, 50.3, 50.7)) });
    drawRich(ctx, 'il teorema degli zeri', RX, 180, { size: 42, weight: 600, alpha: P(t, 50.7, 51.1) });
  });
  drawRich(ctx, '{mink:f(}{mx:a}{mink:) }{mr:< 0}', RX, 285, { size: 48, local: t - 14.6 });
  drawRich(ctx, '{mink:f(}{mx:b}{mink:) }{mg:> 0}', RX, 365, { size: 48, local: t - 21.6 });
  drawRich(ctx, '{mink:f(}{mx:a}{mink:) · f(}{mx:b}{mink:) }{mr:< 0}', RX, 455, { size: 48, local: t - 50.6 });
  // f continua: in 3 si cancella
  drawRich(ctx, '{mink:f}{v: continua in }{mink:[}{mx:a}{mink:, }{mx:b}{mink:]}', RX, 540, { size: 42, local: t - 56.5 });
  const kx = P(t, 80.0, 80.6);
  if (kx > 0) {
    ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(XS0, 540); ctx.lineTo(XS0 + (XS1 - XS0) * kx, 540); ctx.stroke(); ctx.restore();
  }
  const kl = P(t, 62.3, 62.7);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1190, 600); ctx.lineTo(1780, 600); ctx.stroke(); ctx.restore();
  }
  // senza l'ipotesi la conclusione non regge più: si sbiadisce
  drawRich(ctx, '{v:allora} {mink:f(c) = }{mg:0}\nper almeno un {mink:c} fra {mx:a} e {mx:b}', RX, 690, { size: 40, local: t - 62.5, stagger: .03, alpha: 1 - .7 * P(t, 80.4, 81.0) });
  ctx.restore();
}

// 4 · in una frase
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 93.2, 94.2);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Continua e con segni opposti\nagli estremi: almeno uno {g:zero}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, '{mink:f}{v: continua in }{mink:[}{mx:a}{mink:, }{mx:b}{mink:]}'], [960, '{mink:f(}{mx:a}{mink:) · f(}{mx:b}{mink:) < 0}'], [1450, 'almeno uno {g:zero}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 230, 455, 460, 100);
    drawRich(ctx, s, x, 507, { size: 40, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il teorema degli zeri', durata: 95.4, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, 50.2, 'da sotto a sopra'], [50.2, 69.6, 'il teorema'], [69.6, FINE, 'se la matita si stacca']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
