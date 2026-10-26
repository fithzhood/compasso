'use strict';
/* Il parallelogramma nascosto — un quadrilatero qualunque ABCD (non intrecciato: i lati non si incrociano), con M, N, P, Q
   punti medi di AB, BC, CD, DA. MNPQ è sempre un parallelogramma (teorema di Varignon), anche mentre i vertici si muovono
   e anche con ABCD concavo. Perché: nel triangolo ABC il segmento che unisce i punti medi di due lati è parallelo al terzo
   lato e lungo la metà, quindi MN ∥ AC; in ACD QP ∥ AC; allo stesso modo con la diagonale BD: NP ∥ BD ∥ MQ. Lati opposti
   paralleli: è un parallelogramma (la definizione del sito). Argomento: geometria-piano-1 (la teoria sta in geometria-piano-1). */
CVIDEO.registra('geometria-piano-1/punti-medi', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, glowStroke, dot, card, checkMark } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['quad', 5.4, 'Un quadrilatero qualunque, {mink:ABCD}:\nunica regola, i lati non si incrociano.'],
  ['medi', 5.2, 'Segno i {g:punti medi} dei quattro lati:\n{mink:M}, {mink:N}, {mink:P} e {mink:Q}.'],
  ['unisco', 4.4, 'Li unisco in ordine: {mink:MNPQ}.'],
  ['para', 5.0, 'Sembra un {v:parallelogramma}:\ni lati opposti sembrano {g:paralleli}.'],
  ['muovo', 4.6, 'Ora muovo i vertici di {mink:ABCD}…'],
  ['sempre', 5.0, '…e {mink:MNPQ} resta\nun {v:parallelogramma}.'],
  ['rientra', 4.0, 'E se un vertice rientra…'],
  ['concavo', 5.4, '…{mink:ABCD} è {x:concavo}, ma {mink:MNPQ}\nè ancora un {v:parallelogramma}.'],
  ['torno', 2.6, 'Torno al primo quadrilatero.'],
  ['perche', 5.0, 'Perché? Traccio la diagonale {mink:AC}:\ntaglia {mink:ABCD} in due triangoli.'],
  ['tri1', 5.2, 'Nel triangolo {mink:ABC}, {mink:M} e {mink:N}\nsono i punti medi di due lati.'],
  ['teo', 6.2, 'Il segmento che li unisce è {g:parallelo}\nal terzo lato, e lungo la {g:metà}.'],
  ['mn', 4.6, 'Quindi {mink:MN} è parallelo ad {mink:AC}.'],
  ['tri2', 5.8, 'Nel triangolo {mink:ACD}, con {mink:Q} e {mink:P}:\nanche {mink:QP} è parallelo ad {mink:AC}.'],
  ['coppia', 5.0, 'Due segmenti paralleli ad {mink:AC}:\n{mink:MN} e {mink:QP} sono {g:paralleli}.'],
  ['bd', 6.0, 'Con l’altra diagonale, {mink:BD}, allo stesso\nmodo {mink:NP} e {mink:MQ} sono {g:paralleli}.'],
  ['fine', 5.0, 'Lati opposti paralleli: {mink:MNPQ}\nè un {g:parallelogramma}.'],
  ['varignon', 4.0, 'È il {v:teorema di Varignon}.'],
];
const T = {}, FUMETTI = [[2.1, 7.0, 'Unisco i punti medi dei lati di un\nquadrilatero: che figura esce?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'I punti medi dei lati di un quadrilatero\nformano sempre un parallelogramma.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.para, 'pensa'], [T.muovo, 'neutro'], [T.sempre, 'sorpreso'], [T.sempre + 2.4, 'neutro'],
  [T.concavo, 'sorpreso'], [T.concavo + 2.4, 'neutro'], [T.perche, 'pensa'], [T.tri1, 'neutro'],
  [T.mn, 'felice'], [T.mn + 2.2, 'neutro'], [T.coppia + 1.8, 'felice'], [T.bd, 'neutro'],
  [T.fine, 'festa'], [T.fine + 2.4, 'felice'], [T.varignon + 1.5, 'occhiolino'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// i vertici A, B, C, D nelle pose; fra una posa e l'altra il quadrilatero non si intreccia mai (controllato con node)
const Q0 = [[300, 230], [150, 640], [760, 740], [900, 330]];     // convesso: la posa della dimostrazione
const Q1 = [[200, 330], [330, 730], [940, 620], [620, 180]];
const Q1b = [[380, 190], [160, 560], [640, 715], [930, 420]];
const Q2 = [[180, 200], [240, 720], [520, 520], [930, 380]];     // concavo in C
const POSE = [[T.muovo + .3, Q0], [T.muovo + 2.2, Q1], [T.muovo + 2.4, Q1], [T.muovo + 4.3, Q1b], [T.rientra + .3, Q1b],
  [T.rientra + 3.5, Q2], [T.torno + .2, Q2], [T.torno + 2.2, Q0]];
const KX = [0, 1, 2, 3].map(i => POSE.map(([s, q]) => [s, q[i][0]])), KY = [0, 1, 2, 3].map(i => POSE.map(([s, q]) => [s, q[i][1]]));
const vertici = t => [0, 1, 2, 3].map(i => [kf(t, KX[i]), kf(t, KY[i])]);
const medio = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
function areaSegno(V) { let s = 0; for (let i = 0; i < 4; i++) { const a = V[i], b = V[(i + 1) % 4]; s += a[0] * b[1] - b[0] * a[1]; } return Math.sign(s); }
// normale esterna del lato da a a b (unitaria)
function normale(a, b, sg) { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); return sg > 0 ? [dy / L, -dx / L] : [-dy / L, dx / L]; }
function seg(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function poli(ctx, pts, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.fillStyle = css(col, a); ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) ctx.lineTo(...pts[i]); ctx.closePath(); ctx.fill(); ctx.restore();
}
// i segni di parallelo: n frecce «>» a una frazione f del segmento, nel verso da a a b
function frecce(ctx, a, b, n, col, al, f = .5) {
  if (al <= 0) return;
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), u = [dx / L, dy / L], v = [-u[1], u[0]];
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 14, c = [a[0] + dx * f + u[0] * (o + 7), a[1] + dy * f + u[1] * (o + 7)];
    ctx.beginPath();
    ctx.moveTo(c[0] - u[0] * 13 + v[0] * 11, c[1] - u[1] * 13 + v[1] * 11); ctx.lineTo(c[0], c[1]); ctx.lineTo(c[0] - u[0] * 13 - v[0] * 11, c[1] - u[1] * 13 - v[1] * 11);
    ctx.stroke();
  }
  ctx.restore();
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il parallelogramma nascosto', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la figura (7.5–FINE)
const NOMI_V = ['A', 'B', 'C', 'D'], NOMI_M = ['M', 'N', 'P', 'Q'];
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const V = vertici(t), [A, B, Cc, D] = V, sg = areaSegno(V);
  const Mm = [0, 1, 2, 3].map(i => medio(V[i], V[(i + 1) % 4]));   // M, N, P, Q
  const [Mp, N, Pp, Q] = Mm;
  const nl = [0, 1, 2, 3].map(i => normale(V[i], V[(i + 1) % 4], sg));   // normali esterne dei lati AB, BC, CD, DA
  // i due triangoli della dimostrazione
  poli(ctx, [A, B, Cc], C.x, .10 * life(t, T.tri1 + .2, T.tri2 + .5, .4, .5));
  poli(ctx, [A, Cc, D], C.x, .10 * life(t, T.tri2 + .2, T.coppia, .4, .5));
  // MNPQ: violetto, poi verde quando è dimostrato
  const kF = P(t, T.fine + .3, T.fine + .9);
  poli(ctx, Mm, kF > 0 ? C.g : C.v, P(t, T.unisco + 1.4, T.unisco + 2.0) * (.10 + .08 * kF));
  // le diagonali
  const kAC = P(t, T.perche + .4, T.perche + 1.3), kBD = P(t, T.bd + .3, T.bd + 1.2);
  seg(ctx, A, Cc, C.x, 4, kAC);
  seg(ctx, B, D, C.y, 4, kBD);
  // il quadrilatero
  glowStroke(ctx, [A, B, Cc, D, A], P(t, T.quad + .2, T.quad + 1.6, E.lin), C.ink, 4);
  // MNPQ e i lati messi in evidenza durante la dimostrazione
  const hMN = life(t, T.mn + .3, T.coppia + 5.0, .4, .5), hQP = life(t, T.tri2 + 2.6, T.coppia + 5.0, .4, .5), hB = life(t, T.bd + 1.4, T.bd + 6.0, .4, .5);
  if (hMN > 0) seg(ctx, Mp, N, C.x, 14, 1, .3 * hMN);
  if (hQP > 0) seg(ctx, Q, Pp, C.x, 14, 1, .3 * hQP);
  if (hB > 0) { seg(ctx, N, Pp, C.y, 14, 1, .3 * hB); seg(ctx, Mp, Q, C.y, 14, 1, .3 * hB); }
  const kU = P(t, T.unisco + .4, T.unisco + 1.6, E.lin);
  if (kU > 0) glowStroke(ctx, [Mp, N, Pp, Q, Mp], kU, kF > 0 ? C.g : C.v, 5);
  // i segni di parallelo: una freccia per MN, QP (e AC), due per NP, MQ (e BD)
  const kP = P(t, T.para + .6, T.para + 1.1);
  const colP = C.g;
  frecce(ctx, Mp, N, 1, colP, kP); frecce(ctx, Q, Pp, 1, colP, kP);
  frecce(ctx, N, Pp, 2, colP, kP); frecce(ctx, Mp, Q, 2, colP, kP);
  frecce(ctx, A, Cc, 1, colP, P(t, T.mn + .6, T.mn + 1.0), .14);
  frecce(ctx, B, D, 2, colP, P(t, T.bd + 1.5, T.bd + 1.9), .88);
  // i vertici e i loro nomi
  const kN = P(t, T.quad + 1.4, T.quad + 1.9);
  // il nome sta dalla parte dell'angolo più ampio (fuori se convesso, dentro se concavo); quasi piatto, sparisce
  V.forEach((p, i) => {
    const a = V[(i + 3) % 4], b = V[(i + 1) % 4], la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
    const s = [-(a[0] - p[0]) / la - (b[0] - p[0]) / lb, -(a[1] - p[1]) / la - (b[1] - p[1]) / lb], L = Math.hypot(s[0], s[1]) || 1;
    lab(ctx, '{mink:' + NOMI_V[i] + '}', [p[0] + 44 * s[0] / L, p[1] + 44 * s[1] / L], kN * Math.min(1, L / .35));
  });
  // i punti medi e i loro nomi
  Mm.forEach((p, i) => {
    const a = T.medi + .5 + i * .4, k = P(t, a, a + .3, E.back);
    dot(ctx, p, C.v, k, 8);
    lab(ctx, '{mink:' + NOMI_M[i] + '}', [p[0] + 42 * nl[i][0], p[1] + 42 * nl[i][1]], P(t, a + .1, a + .4));
  });
  ctx.restore();
}

// la scheda a destra: il teorema sui punti medi di un triangolo, poi i passi
const XL = 1100, XR = 1820;
function riga(ctx, t, a, s, y, nota) {
  const k = P(t, a, a + .4);
  if (k <= 0) return;
  drawRich(ctx, s, XL, y, { size: 46, align: 'left', alpha: k });
  if (nota) drawRich(ctx, nota, XR, y, { size: 32, align: 'right', alpha: k });
}
function scenePannello(ctx, t) {
  if (t < T.teo || t > FINE + .2) return;
  const la = P(t, T.teo, T.teo + .5) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'perché è un parallelogramma', 1450, 168, { size: 40, weight: 600 }));
  const kT = P(t, T.teo + .4, T.teo + .9);
  if (kT > 0) {
    ctx.save(); ctx.globalAlpha *= kT; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(1080, 212, 740, 150, 16); ctx.stroke(); ctx.restore();
    drawRich(ctx, 'In un triangolo, il segmento che unisce i punti\nmedi di due lati è {g:parallelo} al terzo lato\ne lungo la {g:metà}.', 1450, 287, { size: 31, lh: 1.3, alpha: kT });
  }
  riga(ctx, t, T.mn + .4, '{mink:MN ∥ }{mx:AC}', 425, '{dim:triangolo }{mink:ABC}');
  riga(ctx, t, T.tri2 + 2.6, '{mink:QP ∥ }{mx:AC}', 495, '{dim:triangolo }{mink:ACD}');
  riga(ctx, t, T.coppia + 2.0, '{mg:MN ∥ QP}', 565);
  const kS = P(t, T.bd + 1.4, T.bd + 1.8);
  if (kS > 0) { ctx.save(); ctx.globalAlpha *= kS; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 612); ctx.lineTo(1820, 612); ctx.stroke(); ctx.restore(); }
  riga(ctx, t, T.bd + 1.6, '{mink:NP ∥ }{my:BD}{ink:   e   }{mink:MQ ∥ }{my:BD}', 662);
  riga(ctx, t, T.bd + 3.6, '{mg:NP ∥ MQ}', 732);
  checkMark(ctx, 1500, 732, P(t, T.fine + .4, T.fine + 1.4), C.g, .38);
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'I punti medi dei lati di un quadrilatero\nformano sempre un {g:parallelogramma}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, 440, '{mink:MN ∥ }{mx:AC}{mink: ∥ QP}'], [960, 440, '{mink:NP ∥ }{my:BD}{mink: ∥ MQ}'], [1470, 440, 'anche con il\nquadrilatero {x:concavo}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 445, w, 150);
    drawRich(ctx, s, x, 520, { size: i < 2 ? 46 : 36, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): quando i vertici si muovono, il tono segue l'altezza del vertice più in vista
  const alt = y => +((800 - y) / 700).toFixed(2);
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5],
    ['traccia', T.quad + .2, T.quad + 1.6], ['pop', T.quad + 1.4, .5],                          // ABCD
    ['pop', T.medi + .5, .4], ['pop', T.medi + .9, .5], ['pop', T.medi + 1.3, .6], ['pop', T.medi + 1.7, .7],   // M, N, P, Q
    ['traccia', T.unisco + .4, T.unisco + 1.6], ['soffio', T.unisco + 1.4],                     // MNPQ
    ['pop', T.para + .6, .7],                                                                   // i segni di parallelo
    ['tono', T.muovo + .3, T.muovo + 2.2, [alt(230), alt(280), alt(330)]],                     // A scende…
    ['tono', T.muovo + 2.4, T.muovo + 4.3, [alt(330), alt(260), alt(190)]],                    // …e risale
    ['tono', T.rientra + .3, T.rientra + 3.5, [alt(715), alt(618), alt(520)]],                  // C rientra
    ['tono', T.torno + .2, T.torno + 2.2, [alt(520), alt(630), alt(740)]],                    // e torna al suo posto
    ['traccia', T.perche + .4, T.perche + 1.3],                                                 // la diagonale AC
    ['soffio', T.tri1 + .2],                                                                    // il triangolo ABC
    ['soffio', T.teo], ['pop', T.teo + .4, .5],                                                 // il teorema
    ['pop', T.mn + .4, .6], ['pop', T.mn + .6, .7],                                             // MN ∥ AC
    ['soffio', T.tri2 + .2], ['pop', T.tri2 + 2.6, .6],                                         // QP ∥ AC
    ['ding', T.coppia + 2.0],                                                                   // MN ∥ QP
    ['traccia', T.bd + .3, T.bd + 1.2], ['pop', T.bd + 1.6, .6], ['ding', T.bd + 3.6],          // BD: NP ∥ MQ
    ['pop', T.fine + .4, .8],                                                                   // la spunta
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il parallelogramma nascosto', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.muovo - .1, 'i punti medi'], [T.muovo - .1, T.torno - .1, 'i vertici si muovono'], [T.torno - .1, FINE, 'perché']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
