'use strict';
/* Il metodo delle tangenti — lo zero positivo di f(x) = x² − 2 partendo da x₀ = 1: la tangente in (x₀; f(x₀)) taglia
   l'asse x in x₁ = x₀ − f(x₀)/f′(x₀) = 1,5; poi x₂ = 1,5 − 0,25/3 ≈ 1,41667, x₃ ≈ 1,414216 contro √2 ≈ 1,414214:
   cinque cifre decimali giuste dopo tre passi. La bisezione da [1, 2] scende sotto 0,00001 solo dopo 17 passi
   (1/2¹⁷ ≈ 0,0000076, 1/2¹⁶ ≈ 0,0000153); x₃ sbaglia di circa 0,0000021. Conti rifatti con node. Argomento: continuita-asintoti. */
CVIDEO.registra('continuita-asintoti/tangenti', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, dashed, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['curva', 7.0, 'Cerco lo zero positivo di\n{my:f(}{mx:x}{my:) = }{mx:x}{my:² − 2}, cioè {g:√2}.'],
  ['x0', 6.9, 'Parto da {mx:x₀ = 1}: qui la curva\nsta sotto l’asse, {mink:f(1) = −1}.'],
  ['tangente', 5.2, 'Traccio la {v:tangente} alla curva\nnel punto {mink:(1; −1)}.'],
  ['taglio', 4.8, 'La tangente taglia l’asse {mx:x}\nin un punto nuovo, {mx:x₁}.'],
  ['formula', 6.4, 'Dove? Lo dice questa formula.\n{mv:f′} è la derivata, cioè la pendenza.'],
  ['conto', 7.8, 'Qui {mv:f′(}{mx:x}{mv:) = 2}{mx:x}, quindi\n{mx:x₁}{mink: = 1 − (−1)/2 = }{g:1,5}.'],
  ['passo2', 4.8, 'Ripeto da {mx:x₁}: punto sulla curva,\nnuova {v:tangente}…', .3],
  ['x2', 7.4, '…che taglia l’asse in {mx:x₂}:\nstessa formula, {mx:x₂}{mink: ≈ 1,41667}.'],
  ['lente', 5.4, 'Il passo dopo è troppo piccolo\nda vedere: ingrandisco 60 volte.', .3],
  ['x3', 5.4, 'La nuova tangente quasi coincide\ncon la curva, e taglia in {mx:x₃}.'],
  ['cifre', 6.2, 'Ecco {g:√2}: dopo tre passi, le prime\n{g:cinque cifre} decimali sono giuste.'],
  ['bisez', 7.8, 'Bisezione: {r:17} passi per chiudere {g:√2}\nin un intervallo lungo meno di 0,00001.', .3],
  ['veloce', 5.6, 'Le tangenti ci arrivano in {g:3}:\n{mx:x₃} sbaglia di circa 0,000002.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Come si trova uno zero\nin pochissimi passi?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Tangente, taglio, nuova tangente:\nlo zero arriva in pochissimi passi.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.taglio + .5, 'sorpreso'], [T.formula, 'neutro'], [T.conto + 2.2, 'felice'], [T.passo2, 'neutro'],
  [T.lente + .8, 'sorpreso'], [T.x3, 'neutro'], [T.cifre + .4, 'festa'], [T.cifre + 3.0, 'neutro'],
  [T.bisez + .4, 'pensa'], [T.veloce + .3, 'felice'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il grafico: solo l'asse x (come nella bisezione), scale diverse in orizzontale e in verticale ----------
const f = x => x * x - 2, fp = x => 2 * x;
const X0 = 1, X1 = 1.5, X2 = X1 - f(X1) / fp(X1), X3 = X2 - f(X2) / fp(X2), R2 = Math.SQRT2;
const PCARD = [90, 110, 1000, 690], RCARD = [1140, 110, 690, 690];
const X = x => 150 + (x - .75) * 600, Y = y => 520 - y * 140, S = (x, y) => [X(x), Y(y)];
const CURVA = []; for (let i = 0; i <= 200; i++) { const x = .78 + (2.1 - .78) * i / 200; CURVA.push(S(x, f(x))); }
// la tangente in (a; f(a)), fra le ascisse u e v
const tang = (a, u, v) => [S(u, f(a) + fp(a) * (u - a)), S(v, f(a) + fp(a) * (v - a))];
// la lente: ingrandisce 60 volte il punto dell'asse vicino a √2
const ZOOM = 60, LC = [330, 330], LR = 125, SP = [X(1.4154), Y(0)];
const L = (x, y) => [LC[0] + ZOOM * (X(x) - SP[0]), LC[1] + ZOOM * (Y(y) - SP[1])];
const piu = (p, dx, dy) => [p[0] + dx, p[1] + dy];
const lab = (ctx, s, p, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Il metodo delle tangenti', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1 · il grafico con le tangenti (7.2–FINE)
function sceneGrafico(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  // l'asse x, con le tacche di 1 e 2
  const ka = P(t, 7.4, 8.2);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(130, Y(0)); ctx.lineTo(1000, Y(0)); ctx.stroke();
    [1, 2].forEach(x => { ctx.beginPath(); ctx.moveTo(X(x), Y(0) - 9); ctx.lineTo(X(x), Y(0) + 9); ctx.stroke(); });
    ctx.restore();
    arrowHead(ctx, [1006, Y(0)], 0, C.ink);
    drawRich(ctx, '{mx:x}', 1040, Y(0), { size: 44, alpha: ka });
    // «2» sotto l'asse (lì la curva sta sopra); «1» sopra (lì la curva sta sotto), poi diventa x₀ = 1
    txt(ctx, '2', X(2), Y(0) + 34, { size: 30, color: C.dim, alpha: P(ka, .6, 1) });
    const k1 = P(t, T.x0 + .1, T.x0 + .35), kx0 = P(t, T.x0 + .4, T.x0 + .8);   // prima esce «1», poi entra x₀ = 1
    txt(ctx, '1', X(1), Y(0) - 34, { size: 30, color: C.dim, alpha: P(ka, .6, 1) * (1 - k1) });
    lab(ctx, '{mx:x₀}{mink: = 1}', [X(1), Y(0) - 36], kx0);
  }
  // la curva e il suo nome, in basso a destra: lì non passa niente
  glowStroke(ctx, CURVA, P(t, T.curva + .2, T.curva + 1.4, E.lin), C.y, 6);
  if (t > T.curva + 1.2) drawRich(ctx, '{my:f(}{mx:x}{my:) = }{mx:x}{my:² − 2}', 830, 690, { size: 42, local: t - T.curva - 1.2 });
  // il punto di partenza (1; −1)
  dashed(ctx, S(1, 0), S(1, -1), C.x, P(t, T.x0 + .4, T.x0 + 1.0), .9);
  dot(ctx, S(1, -1), C.ink, P(t, T.x0 + .9, T.x0 + 1.3, E.back), 10);
  lab(ctx, '{mink:(1; −1)}', [390, 705], P(t, T.x0 + 1.0, T.x0 + 1.4));
  // la prima tangente; si attenua quando arriva la seconda
  ctx.save(); ctx.globalAlpha *= 1 - .65 * P(t, T.passo2 + .3, T.passo2 + .8);
  const t1 = tang(X0, .85, 1.8);
  glowStroke(ctx, [t1[0], t1[1]], P(t, T.tangente + .3, T.tangente + 1.3), C.v, 5);
  ctx.restore();
  // x₁ sull'asse; l'etichetta sotto, a destra della prima tangente
  dot(ctx, S(X1, 0), C.v, P(t, T.taglio + .3, T.taglio + .7, E.back), 9);
  lab(ctx, '{mx:x₁}', [X(X1), Y(0) + 36], P(t, T.taglio + .5, T.taglio + .9));
  // secondo passo: da x₁ su alla curva, la seconda tangente
  dashed(ctx, S(X1, 0), S(X1, f(X1)), C.x, P(t, T.passo2 + .3, T.passo2 + .6), .9);
  dot(ctx, S(X1, f(X1)), C.ink, P(t, T.passo2 + .5, T.passo2 + .9, E.back), 9);
  const t2 = tang(X1, 1.3, 1.62);
  glowStroke(ctx, [t2[0], t2[1]], P(t, T.passo2 + .8, T.passo2 + 1.8), C.v, 5);
  // x₂: l'etichetta più in basso, con un trattino che la lega al punto (sopra c'è la lente, accanto x₁)
  const k2 = P(t, T.x2 + .3, T.x2 + .7, E.back);
  if (k2 > 0) {
    dashed(ctx, S(X2, 0), [X(X2), Y(0) + 58], C.dim, 1, .8 * k2);
    dot(ctx, S(X2, 0), C.v, k2, 9);
    lab(ctx, '{mx:x₂}', [X(X2), Y(0) + 80], P(t, T.x2 + .5, T.x2 + .9));
  }
  sceneLente(ctx, t);
  ctx.restore();
}

// la lente: il punto dell'asse vicino a √2 ingrandito 60 volte
function sceneLente(ctx, t) {
  const ka = P(t, T.lente + .3, T.lente + 1.1, E.out);
  if (ka <= 0) return;
  ctx.save(); ctx.globalAlpha *= ka;
  ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(SP[0], SP[1], 14, 0, 2 * Math.PI); ctx.stroke();
  const dx = LC[0] - SP[0], dy = LC[1] - SP[1], d = Math.hypot(dx, dy);
  ctx.beginPath(); ctx.moveTo(SP[0] + dx / d * 14, SP[1] + dy / d * 14); ctx.lineTo(LC[0] - dx / d * LR, LC[1] - dy / d * LR); ctx.stroke();
  txt(ctx, 'ingrandito 60 volte', LC[0], LC[1] - LR - 26, { size: 30, color: C.dim });
  ctx.save();
  ctx.beginPath(); ctx.arc(LC[0], LC[1], LR * ka, 0, 2 * Math.PI); ctx.fillStyle = C.paper; ctx.fill(); ctx.clip();
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(LC[0] - LR, LC[1]); ctx.lineTo(LC[0] + LR, LC[1]); ctx.stroke();
  const cur = []; for (let i = 0; i <= 60; i++) { const x = 1.4115 + .007 * i / 60; cur.push(L(x, f(x))); }
  glowStroke(ctx, cur, 1, C.y, 6);
  dashed(ctx, L(X2, 0), L(X2, f(X2)), C.x, 1, .9);
  dot(ctx, L(X2, f(X2)), C.ink, 1, 9);
  dot(ctx, L(X2, 0), C.v, 1, 9);
  // la terza tangente: da (x₂; f(x₂)) giù fino all'asse, quasi sopra la curva
  const a = X2, t3 = [L(a + .0008, f(a) + fp(a) * .0008), L(X3 - .0003, f(a) + fp(a) * (X3 - .0003 - a))];
  glowStroke(ctx, t3, P(t, T.x3 + .3, T.x3 + 1.3), C.v, 5);
  dot(ctx, L(R2, 0), C.g, P(t, T.cifre + .3, T.cifre + .7, E.back), 14);
  dot(ctx, L(X3, 0), C.v, P(t, T.x3 + 1.2, T.x3 + 1.6, E.back), 8);
  ctx.restore();
  ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(LC[0], LC[1], LR * ka, 0, 2 * Math.PI); ctx.stroke();
  // etichette nella lente: x₂ e x₃ sotto l'asse, √2 sopra a sinistra (lì la curva non passa)
  lab(ctx, '{mx:x₂}', piu(L(X2, 0), 0, 36), ka);
  lab(ctx, '{mx:x₃}', piu(L(X3, 0), 0, 36), P(t, T.x3 + 1.3, T.x3 + 1.7));
  lab(ctx, '{mg:√2}', piu(L(R2, 0), -40, -36), P(t, T.cifre + .4, T.cifre + .8));
  ctx.restore();
}

// 2 · la scheda a destra: la formula e i passi (T.formula–FINE)
const XL = 1190;
function riga(ctx, s, y, al, size = 42) { if (al > 0) drawRich(ctx, s, XL, y, { size, alpha: al, align: 'left' }); }
function sceneScheda(ctx, t) {
  if (t < T.formula || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RCARD, P(t, T.formula, T.formula + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  // la formula del passo, quando Ada ne parla
  if (t > T.formula + .3) {
    // la stessa formula a ogni passo: gli indici scalano di uno quando Ada fa il passo dopo
    const passo = (n, m) => ['{mx:x' + n + '}{mink: = }{mx:x' + m + '}{mink: −}', { num: '{my:f(}{mx:x' + m + '}{my:)}', den: '{mv:f′(}{mx:x' + m + '}{mv:)}' }];
    const o2 = P(t, T.x2 + .2, T.x2 + .45), k2 = P(t, T.x2 + .5, T.x2 + .75), o3 = P(t, T.x3 + .2, T.x3 + .45), k3 = P(t, T.x3 + .5, T.x3 + .75);   // il vecchio esce prima che entri il nuovo
    drawSeq(ctx, passo('₁', '₀'), 1485, 205, 50, { local: t - T.formula - .3, alpha: 1 - o2 });
    drawSeq(ctx, passo('₂', '₁'), 1485, 205, 50, { alpha: k2 * (1 - o3) });
    drawSeq(ctx, passo('₃', '₂'), 1485, 205, 50, { alpha: k3 });
    ctx.save(); ctx.globalAlpha *= P(t, T.formula + .8, T.formula + 1.2);
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1180, 352); ctx.lineTo(1790, 352); ctx.stroke();
    ctx.restore();
  }
  if (t > T.conto + .3) drawRich(ctx, '{mv:f′(}{mx:x}{mv:) = 2}{mx:x}', 1485, 310, { size: 42, local: t - T.conto - .3 });
  riga(ctx, '{mx:x₀}{mink: = 1}', 398, P(t, T.formula + 1.2, T.formula + 1.6));
  riga(ctx, '{mx:x₁}{mink: = 1 − (−1)/2 = }{mg:1,5}', 456, P(t, T.conto + 1.0, T.conto + 1.4));
  riga(ctx, '{mx:x₂}{mink: = 1,5 − 0,25/3 ≈ }{mv:1,41667}', 514, P(t, T.x2 + .5, T.x2 + .9));
  // x₃ e √2: le cinque cifre comuni si colorano di verde quando Ada le conta
  const kc = P(t, T.cifre + .8, T.cifre + 1.3);
  const k3 = P(t, T.x3 + 1.4, T.x3 + 1.8);
  riga(ctx, '{mx:x₃}{mink: ≈ }{mv:1,414216}', 572, k3 * (1 - kc));
  riga(ctx, '{mx:x₃}{mink: ≈ }{mg:1,41421}{mink:6}', 572, k3 * kc);
  const kr = P(t, T.cifre + .3, T.cifre + .7);
  riga(ctx, '{mg:√2}{mink: ≈ 1,414214}', 632, kr * (1 - kc));
  riga(ctx, '{mg:√2}{mink: ≈ }{mg:1,41421}{mink:4}', 632, kr * kc);
  // il confronto con la bisezione
  const kb = P(t, T.bisez + .3, T.bisez + .7);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1180, 678); ctx.lineTo(1790, 678); ctx.stroke();
    ctx.restore();
  }
  riga(ctx, '{dim:bisezione da }{mink:[1, 2]}{dim::  }{r:17 passi}', 722, kb, 36);
  riga(ctx, '{dim:tangenti da }{mink:x₀ = 1}{dim::  }{g:3 passi}', 768, P(t, T.veloce + .3, T.veloce + .7), 36);
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Segui la {v:tangente} fino all’asse,\npoi riparti da lì.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'la {v:tangente} nel punto'], [960, 'il taglio con l’asse {mx:x}'], [1430, '{g:3 passi}, 5 cifre giuste']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 215, 455, 430, 100);
    drawRich(ctx, s, x, 507, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la curva e i punti che scendono verso √2
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.2], ['traccia', 7.4, 8.2],                                                     // l'asse x
    ['tono', T.curva + .2, T.curva + 1.4, [.12, .2, .32, .48, .66, .88, 1]], ['pop', T.curva + 1.3, .55],   // la curva sale, f(x)
    ['traccia', T.x0 + .4, T.x0 + 1.0], ['pop', T.x0 + 1.0, .15],              // x₀ = 1, giù fino a (1; −1)
    ['traccia', T.tangente + .3, T.tangente + 1.3], ['tono', T.tangente + .3, T.tangente + 1.3, [.1, .3, .5, .7]],   // la prima tangente
    ['pop', T.taglio + .3, .5],                                                                  // x₁
    ['soffio', T.formula], ['pop', T.formula + .4, .6], ['pop', T.formula + .7, .65],                                // la formula
    ['pop', T.conto + .4, .5], ['ding', T.conto + 1.1],                                          // f′(x) = 2x, x₁ = 1,5
    ['traccia', T.passo2 + .3, T.passo2 + .6], ['pop', T.passo2 + .6, .55],                      // su fino alla curva
    ['traccia', T.passo2 + .8, T.passo2 + 1.8], ['tono', T.passo2 + .8, T.passo2 + 1.8, [.4, .55, .7]],   // la seconda tangente
    ['pop', T.x2 + .3, .48], ['pop', T.x2 + .6, .5],                                             // x₂
    ['soffio', T.lente + .3], ['tono', T.lente + .3, T.lente + 1.1, [.3, .7]],                    // la lente si apre
    ['traccia', T.x3 + .3, T.x3 + 1.3], ['pop', T.x3 + 1.3, .46], ['pop', T.x3 + 1.5, .5],         // la terza tangente, x₃
    ['pop', T.cifre + .4, .6], ['ding', T.cifre + .9],                                           // √2, le cinque cifre
    ['pop', T.bisez + .4, .3], ['ding', T.veloce + .4],                                          // 17 passi contro 3
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il metodo delle tangenti', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, T.formula - .05, 'la prima tangente'], [T.formula - .05, T.lente - .2, 'la formula del passo'], [T.lente - .2, FINE, 'quanto è veloce']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
