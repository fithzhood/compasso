'use strict';
/* Una soluzione, nessuna, infinite — ax = b nei tre casi, e la retta y = ax − b che taglia l'asse x, non lo tocca
   o ci si posa sopra. Argomento: equazioni-primo-grado (sezione «Lo zero della retta»). */
CVIDEO.registra('equazioni-primo-grado/tre-casi', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, drawSeq, fixedNum, fmtN, txt,
    dot, glowStroke, makePlane, card } = M;

const FINE = 83.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [37.0, 'felice'], [39.0, 'neutro'], [41.9, 'festa'], [44.4, 'neutro'], [50.6, 'sorpreso'], [52.6, 'neutro'],
  [61.2, 'sorpreso'], [63.2, 'neutro'], [70.0, 'felice'], [72.0, 'neutro'], [78.3, 'festa'], [80.8, 'neutro'],
  [FINE + 1.0, 'felice'], [88.7, 'occhiolino'], [90.8, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.3, 'Un\'equazione ha sempre\nuna soluzione?'],
  // 1 · la forma normale
  [7.9, 12.0, 'Ogni equazione di primo grado intera,\nalla fine, diventa {mv:a}{mx:x}{mink: = b}.'],
  [12.1, 17.2, 'Si chiama {v:forma normale}. Il numero {mv:a}\nè il {v:coefficiente}, {mink:b} il {v:termine noto}.'],
  [17.3, 22.4, 'Per esempio {mink:2}{mx:x}{mink: = 4}: l\'incognita è {mx:x},\n{mv:a}{mink: = 2} e {mink:b = 4}.'],
  // 2 · una soluzione
  [22.6, 26.2, 'Porto il 4 a sinistra:\n{mink:2}{mx:x}{mink: − 4 = 0}.'],
  [26.3, 31.6, 'Chiamo {my:y} il numero {mink:2}{mx:x}{mink: − 4}:\ni punti ({mx:x}; {my:y}) fanno una {v:retta}.'],
  [31.7, 36.4, 'Dove taglia l\'asse {mx:x}, {my:y} vale 0:\ncioè proprio {mink:2}{mx:x}{mink: − 4 = 0}.'],
  [36.5, 41.6, 'Qui {mv:a}{mink: ≠ 0}: divido per 2\ne trovo {mx:x}{mink: = 2}, dove taglia.'],
  [41.7, 46.4, 'Una sola soluzione, un solo punto:\nl\'equazione è {g:determinata}.'],
  // 3 · nessuna
  [46.8, 50.3, 'Se le {mx:x} si cancellano,\n{mv:a} diventa zero.'],
  [50.4, 55.5, 'La retta diventa {v:orizzontale}, {my:y}{mink: = −4}:\nnon tocca mai l\'asse {mx:x}.'],
  [55.6, 60.9, 'L\'equazione è {mink:0 · }{mx:x}{mink: = 4}, ma {mink:0 · }{mx:x}\nfa sempre 0: non fa mai 4.'],
  [61.0, 65.5, 'L\'insieme delle soluzioni {mink:S} è vuoto:\nl\'equazione è {r:impossibile}.'],
  // 4 · infinite
  [65.9, 69.7, 'Se si cancellano anche i numeri,\n{mink:b} diventa zero.'],
  [69.8, 74.7, 'La retta {my:y}{mink: = 0} {g:coincide} con l\'asse {mx:x}:\nlo tocca in ogni punto.'],
  [74.8, 78.0, '{mink:0 · }{mx:x}{mink: = 0} è vera\nper {g:ogni} {mx:x}.'],
  [78.1, 82.4, '{mink:S} contiene tutti i numeri:\nl\'equazione è {g:indeterminata}.'],
  // chiusura
  [84.8, 91.2, 'Taglia, non tocca o coincide:\nuna, nessuna o infinite soluzioni.'],
];

// il piano: stessa unità sui due assi
const PL = makePlane({ ox: 527, oy: 400, u: 72, x0: -2.6, x1: 4.6, y0: -4.8, y1: 2.8 });
const CARD = [230, 110, 830, 690];
// a e b nel tempo: a gira per angolo (la retta ruota attorno a (0; −4)), poi b scende a 0 (la retta sale)
const T_A = [47.2, 49.4], T_B = [66.3, 68.3];
const aAt = t => Math.tan(kf(t, [[T_A[0], Math.atan(2)], [T_A[1], 0]]));
const bAt = t => kf(t, [[T_B[0], 4], [T_B[1], 0]]);
// la parte di retta y = ax − b che sta dentro la griglia
function tratto(m, q) {
  let a = PL.x0, b = PL.x1;
  if (Math.abs(m) > 1e-6) {
    const u = (PL.y0 - q) / m, v = (PL.y1 - q) / m;
    a = Math.max(a, Math.min(u, v)); b = Math.min(b, Math.max(u, v));
  }
  return [PL.toS(a, m * a + q), PL.toS(b, m * b + q)];
}
// i numeri degli assi su un fondino di carta; dove passa la retta il numero non deve spezzarla:
// il 2 dell'asse x manca finché la retta y = 2x − 4 ci passa sotto il punto verde,
// il −4 dell'asse y va a destra dell'asse, sopra la retta, finché la retta è y = −4
// fondo: true = sopra la retta, col fondino; false = sotto la retta, senza fondino (mentre la retta sale)
function numeri(ctx, al, t, fondo = true) {
  if (al <= 0) return;
  const k2 = 1 - life(t, 27.6, 48.3, .3, .4);
  const kSx = 1 - life(t, 46.9, 67.0, .3, .4), kDx = life(t, 49.5, 66.3, .4, .25);
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
  const numero = (s, x, y, a, align) => {
    if (a <= 0) return;
    const w = 17 * s.length + 14, x0 = align === 'right' ? x - w + 2 : align === 'left' ? x - 2 : x - w / 2;
    ctx.save(); ctx.globalAlpha *= a; if (fondo) ctx.fillRect(x0, y - 16, w, 32); txt(ctx, s, x, y, { size: 29, color: C.dim, align }); ctx.restore();
  };
  for (let i = Math.ceil(PL.x0); i <= PL.x1; i++) if (i) {
    const p = PL.toS(i, 0);
    numero(lab(i), p[0], p[1] + 32, i === 2 ? k2 : 1, 'center');
    // mentre la retta y = 2x − 4 passa per (2; 0), il 2 sta a destra della tacca, dove la retta non passa
    if (i === 2) numero(lab(i), p[0] + 14, p[1] + 32, 1 - k2, 'left');
  }
  for (let j = Math.ceil(PL.y0); j <= PL.y1; j++) if (j) {
    const p = PL.toS(0, j);
    numero(lab(j), p[0] - 20, p[1], j === -4 ? kSx : 1, 'right');
    if (j === -4) numero(lab(j), p[0] + 18, p[1] - 30, kDx, 'left');
  }
  ctx.restore();
}
// i numeri che disegna il motore si coprono tutti con la carta, sotto la retta: li riscrive numeri()
function copriNumeriMotore(ctx) {
  ctx.save(); ctx.fillStyle = C.paper;
  const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
  for (let i = Math.ceil(PL.x0); i <= PL.x1; i++) if (i) {
    const w = 17 * lab(i).length + 14, p = PL.toS(i, 0);
    ctx.fillRect(p[0] - w / 2, p[1] + 16, w, 32);
  }
  for (let j = Math.ceil(PL.y0); j <= PL.y1; j++) if (j) {
    const w = 17 * lab(j).length + 14, p = PL.toS(0, j);
    ctx.fillRect(p[0] - 18 - w, p[1] - 16, w, 32);
  }
  ctx.restore();
}
// il verdetto in fondo alla scheda; vuoto: in coda l'insieme vuoto come \varnothing del sito
// (un cerchio tondo barrato, disegnato a mano: il font di KaTeX darebbe l'∅ ovale di \emptyset)
function verdetto(ctx, s, vuoto, x, y, local, al) {
  if (al <= 0) return;
  const SZ = 40, wS = M.richW(ctx, s, SZ), wV = vuoto ? SZ * .85 : 0;
  const x0 = x - (wS + wV) / 2;
  drawRich(ctx, s, x0, y, { size: SZ, align: 'left', local, alpha: al });
  if (!vuoto) return;
  const k = al * E.out(Math.max(0, Math.min(1, (local - .5) / .4)));
  if (k <= 0) return;
  const cx = x0 + wS + SZ * .55, cy = y + 1, r = SZ * .3;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.ink); ctx.lineWidth = SZ * .055; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx - r * .95, cy + r * 1.25); ctx.lineTo(cx + r * .95, cy - r * 1.25); ctx.stroke();
  ctx.restore();
}
// intero quando è fermo, una cifra decimale mentre scorre (così le cifre non ballano)
function valore(f, t) {
  const v = f(t), fermo = Math.abs(f(t + .02) - f(t - .02)) < 1e-9;
  return fermo && Math.abs(v - Math.round(v)) < 1e-6 ? fmtN(Math.round(v), 0) : fmtN(v, 1);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Una soluzione, nessuna, infinite', W / 2, 180, { size: 104, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 2–4 · il piano con la retta y = ax − b (26.7–FINE)
function scenePiano(ctx, t) {
  if (t < 26.7 || t > FINE + .3) return;
  const al = life(t, 26.7, FINE + .2, .5, .7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  PL.axes(ctx, P(t, 26.9, 27.7));
  const a = aAt(t), b = bAt(t);
  // con a = 0 e b = 0 la retta è l'asse x: diventa verde quando Ada dice che lo tocca dappertutto
  const col = M.mix(C.v, C.g, P(t, 70.0, 70.6));
  copriNumeriMotore(ctx);
  // mentre b scende a 0 la retta sale e attraversa i numeri dell'asse y: lì la retta passa sopra i numeri
  const kN = P(t, 27.3, 27.7), kSotto = life(t, 66.2, 68.5, .15, .15);
  numeri(ctx, kN * kSotto, t, false);
  glowStroke(ctx, tratto(a, -b), P(t, 27.7, 29.1, E.out), col, 5);
  numeri(ctx, kN * (1 - kSotto), t);
  // caso 1: il punto dove taglia l'asse x
  const pa = life(t, 31.9, T_A[0] - .2, .4, .4);
  if (pa > 0) {
    dot(ctx, PL.toS(2, 0), C.g, pa * P(t, 31.9, 32.4, E.back), 12);
    const [lx, ly] = PL.toS(1.05, .62);
    drawRich(ctx, '{mx:x}{mink: = }{mg:2}', lx, ly, { size: 44, alpha: life(t, 37.6, T_A[0] - .2, .4, .4) });
  }
  // il nome della retta, solo quando è ferma
  const n1 = life(t, 28.7, T_A[0] - .3, .4, .4), n2 = life(t, 50.6, T_B[0] - .3, .4, .4), n3 = life(t, 70.0, FINE + .2, .4, .4);
  const [x1, y1] = PL.toS(2.75, -1.7);
  drawRich(ctx, '{my:y}{mink: = 2}{mx:x}{mink: − 4}', x1, y1, { size: 44, align: 'left', alpha: n1 });
  const [x2, y2] = PL.toS(2.2, -3.35);
  drawRich(ctx, '{my:y}{mink: = −4}', x2, y2, { size: 44, align: 'left', alpha: n2 });
  const [x3, y3] = PL.toS(2.2, .65);
  drawRich(ctx, '{my:y}{mink: = 0}', x3, y3, { size: 44, align: 'left', alpha: n3 });
  ctx.restore();
}

// la forma normale e i numeri, nella scheda a destra (8–FINE)
function sceneScheda(ctx, t) {
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 7.9, FINE + .2, .6, .7);
  // finché il piano non c'è, la scheda sta al centro; poi gli fa posto
  const dx = -515 * (1 - P(t, 26.0, 26.7));
  ctx.save(); ctx.translate(dx, 0);
  card(ctx, 1110, 140, 730, 650, al);
  ctx.globalAlpha *= al;
  const X = 1475;
  conFont(TITOLI, () => drawRich(ctx, 'forma normale', X, 200, { size: 40, weight: 600 }));
  drawRich(ctx, '{mv:a}{mx:x}{mink: = b}', X, 285, { size: 64, local: t - 8.6 });
  drawRich(ctx, '{mv:a}{dim: coefficiente}      {mink:b}{dim: termine noto}', X, 368, { size: 32, local: t - 12.4 });
  const kn = P(t, 17.5, 18.0);
  if (kn > 0) {
    ctx.save(); ctx.globalAlpha *= kn;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1160, 412); ctx.lineTo(1790, 412); ctx.stroke();
    // stesso carattere delle formule, il valore subito dopo l'uguale
    drawRich(ctx, `{mv:a}{mink: = }{mv:${valore(aAt, t)}}`, 1230, 470, { size: 50, align: 'left' });
    drawRich(ctx, `{mink:b = ${valore(bAt, t)}}`, 1560, 470, { size: 50, align: 'left' });
    ctx.restore();
  }
  // l'equazione con i numeri: cambia solo quando a e b sono fermi
  const e1 = life(t, 17.8, T_A[0], .4, .3), e2 = life(t, T_A[1] - .1, T_B[0], .4, .3), e3 = life(t, T_B[1] - .1, FINE + .2, .4, .4);
  drawRich(ctx, '{mink:2}{mx:x}{mink: = 4}', X, 560, { size: 56, alpha: e1 });
  drawRich(ctx, '{mink:0 · }{mx:x}{mink: = 4}', X, 560, { size: 56, alpha: e2 });
  drawRich(ctx, '{mink:0 · }{mx:x}{mink: = 0}', X, 560, { size: 56, alpha: e3 });
  // il passo che decide: prima il 4 portato a sinistra, poi la divisione
  drawRich(ctx, '{mink:2}{mx:x}{mink: − 4 = 0}', X, 652, { size: 50, local: t - 22.9, alpha: life(t, 22.9, 36.6, .4, .3) });
  const r1 = life(t, 36.8, T_A[0] - .2, .5, .4);
  if (r1 > 0) drawSeq(ctx, ['{mx:x}{mink: = }', { num: '{mink:4}', den: '{mv:2}' }, '{mink: = }{mg:2}'], X, 652, 50, { local: t - 36.8, alpha: r1 });
  drawRich(ctx, '{mink:0 · }{mx:x}{mink: = 0}{dim: per ogni }{mx:x}', X, 652, { size: 44, local: t - 55.8, alpha: life(t, 55.8, T_B[0] - .2, .4, .4) });
  drawRich(ctx, '{mink:0 · }{mx:x}{mink: = 0}{dim: per ogni }{mx:x}', X, 652, { size: 44, local: t - 75.0, alpha: life(t, 75.0, FINE + .2, .4, .4) });
  // il verdetto
  // caso 1: prima «a ≠ 0» (quando Ada lo dice), poi il nome
  // prima esce «a ≠ 0», poi entra la riga intera, nello stesso posto
  drawRich(ctx, '{mv:a}{mink: ≠ 0}', X, 756, { size: 40, local: t - 36.8, alpha: life(t, 36.8, 41.8, .4, .3) });
  drawRich(ctx, '{mv:a}{mink: ≠ 0}{dim::} {g:determinata}', X, 756, { size: 40, alpha: life(t, 41.8, T_A[0] - .2, .3, .4) });
  verdetto(ctx, '{mink:b ≠ 0}{dim::} {r:impossibile}{dim:,} {mink:S =}', true, X, 756, t - 61.2, life(t, 61.2, T_B[0] - .2, .4, .4));
  verdetto(ctx, '{mink:b = 0}{dim::} {g:indeterminata}{dim:,} {mink:S = ℝ}', false, X, 756, t - 78.3, life(t, 78.3, FINE + .2, .4, .4));
  ctx.restore();
}

// 5 · in una frase (FINE–94,2)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 92.3, 93.3);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Con {mv:a}{mink: ≠ 0} c\'è una sola soluzione;\ncon {mv:a}{mink: = 0}, nessuna o infinite.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[450, '{mv:a}{mink: ≠ 0}\n{g:determinata}'], [960, '{mv:a}{mink: = 0}, {mink:b ≠ 0}\n{r:impossibile}'], [1470, '{mv:a}{mink: = 0}, {mink:b = 0}\n{g:indeterminata}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 515); ctx.scale(k, k); ctx.translate(-x, -515);
    card(ctx, x - 225, 440, 450, 150);
    drawRich(ctx, s, x, 515, { size: 40, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Una soluzione, nessuna, infinite', durata: 94.2, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 22.5, 'la forma normale'], [22.5, 46.6, 'una soluzione'], [46.6, 65.7, 'nessuna soluzione'], [65.7, FINE, 'infinite soluzioni']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
