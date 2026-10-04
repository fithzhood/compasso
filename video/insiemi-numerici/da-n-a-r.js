'use strict';
/* Dai naturali ai reali — N, Z, Q, R: ogni insieme nasce per un'operazione che prima non si poteva fare. Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/da-n-a-r', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, txt,
    dot, hole, glowStroke, dashed, arrowHead, card, crossMark } = M;
  // le lettere degli insiemi con il font di KaTeX per \mathbb (lo stesso del testo del sito)
  if (typeof document !== 'undefined' && document.fonts) document.fonts.load('100px KaTeX_AMS').catch(() => {});

const FINE = 84.5, DURATA = 96.5;
// la scena ha un suo tempo interno (u, fino a FV): due soste dopo i salti di 3 − 5, e un taglio nella parte dei reali.
// TK: [tempo del video, tempo interno]; fra due chiavi si va dritti, una chiave doppia è un salto
const FV = 87.3;
const TK = [[0, 0], [28.4, 28.4], [29.1, 28.4], [31.5, 30.8], [32.4, 30.8], [60.0, 58.4], [60.0001, 62.8], [200, 202.8]];
function interno(t) {
  for (let i = 1; i < TK.length; i++) if (t <= TK[i][0]) { const [a, ua] = TK[i - 1], [b, ub] = TK[i]; return ua + (t - a) / (b - a) * (ub - ua); }
  return t + 2.8;
}
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [12.4, 'pensa'], [16.7, 'neutro'],
  [19.2, 'sorpreso'], [21.8, 'neutro'], [29.1, 'felice'], [31.3, 'neutro'], [37.8, 'pensa'], [42.8, 'felice'],
  [46.6, 'neutro'], [51.4, 'felice'], [55.4, 'pensa'], [58.0, 'neutro'], [61.9, 'sorpreso'], [63.9, 'neutro'],
  [68.1, 'felice'], [72.0, 'neutro'], [76.9, 'felice'], [80.7, 'neutro'], [FINE + 1.0, 'felice'], [90.8, 'occhiolino'], [93.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Perché in matematica ci sono\ntanti tipi di numeri?'],
  // 1 · i naturali
  [7.9, 12.4, 'Per contare bastano 0, 1, 2, 3…:\nsono i {x:naturali}, l\'insieme {mx:ℕ}.'],
  [12.5, 16.6, 'Qui però non sempre si sottrae:\nquanto fa {mink:3 − 5}?'],
  [16.7, 21.7, 'Da 3 indietro di 5 passi: a sinistra\ndello 0 {r:non c\'è} nessun naturale.'],
  // 2 · gli interi
  [21.8, 26.1, 'Aggiungo i {y:negativi}: sono gli\n{y:interi}, l\'insieme {my:ℤ}.'],
  [26.2, 29.0, 'Rifaccio i 5 passi indietro…'],
  [29.1, 32.45, '{mink:3 − 5 = −2}: con gli interi\nsi sottrae {g:sempre}.'],
  // 3 · i razionali
  [32.7, 37.5, 'E {mink:3 : 2}? Divido il tratto\nda 0 a 3 in due parti uguali.'],
  [37.6, 42.7, 'Il punto di mezzo cade fra 1 e 2:\nlì {r:non c\'è} nessun intero.'],
  [42.8, 46.5, 'Servono le {v:frazioni}:\n{mink:3 : 2 = 3/2}, cioè 1,5.'],
  [46.6, 51.3, 'Frazioni di interi, con il\ndenominatore {mink:≠ 0}: i {v:razionali}, {mv:ℚ}.'],
  [51.4, 55.2, 'Con le frazioni si divide sempre,\ntranne per {r:0}.'],
  // 4 · i reali
  [55.4, 60.0, 'Ora misuro: la diagonale del\nquadrato di lato 1 misura {mg:√2}.'],
  [60.1, 63.3, 'Col compasso la porto\nsulla retta.'],
  [63.4, 67.8, '{mink:√2} non è una frazione:\nè un numero {v:irrazionale}.'],
  [67.9, 71.9, 'Razionali e irrazionali insieme\nsono i {g:reali}, l\'insieme {mg:ℝ}.'],
  [72.0, 76.75, 'Ogni punto della retta ha il suo\nnumero reale: la retta è {g:piena}.'],
  [76.8, 80.6, 'Ognuno sta dentro il successivo:\nuna catena di insiemi.'],
  [80.7, 84.2, 'Il segno {mink:⊂} si legge\n«è contenuto in».'],
  // chiusura
  [85.5, 93.7, 'Sottrarre, dividere, misurare:\nogni volta servono numeri nuovi.'],
];
const CAPITOLI = [[7.5, 21.5, 'i naturali: contare'], [21.5, 32.6, 'gli interi: sottrarre'], [32.6, 55.3, 'i razionali: dividere'], [55.3, FINE, 'i reali: misurare']];

// la retta: 0 in OX, un'unità = U pixel
const RY = 640, OX = 868, U = 170, XA = -4.5, XB = 5.5;
const X = v => OX + v * U;
const CARD = [80, 420, 1760, 380];
const S2 = Math.SQRT2;
// gli insiemi, con il colore (chiave di C) e quando entrano
const SETS = [
  { L: 'N', col: 'x', nome: 'i naturali', el: '{0, 1, 2, 3, …}', t: 8.0 },
  { L: 'Z', col: 'y', nome: 'gli interi', el: '{…, −2, −1, 0, 1, 2, …}', t: 21.8 },
  { L: 'Q', col: 'v', nome: 'i razionali', el: 'frazioni come 3/2 o −1/4', t: 45.2 },
  { L: 'R', col: 'g', nome: 'i reali', el: 'razionali e irrazionali', t: 70.9 },
];
// le frazioni non intere con denominatore 2, 3, 4 (senza doppioni) dentro la retta
const FRAZ = [];
for (const q of [2, 3, 4]) for (let p = Math.ceil(XA * q); p <= XB * q; p++) {
  const v = p / q;
  if (Number.isInteger(v) || FRAZ.some(f => Math.abs(f - v) < 1e-9) || v < -4.3 || v > 5.3) continue;
  FRAZ.push(v);
}

// lettera di un insieme (ℕ, ℤ, ℚ, ℝ) nel font di KaTeX: in KaTeX_AMS le maiuscole sono quelle doppie
function bb(ctx, L, x, y, size, col, al = 1, align = 'center') {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col);
  ctx.font = `${size}px KaTeX_AMS, "Cambria Math", serif`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.fillText(L, x, y); ctx.restore();
}
// numero sotto la retta, pieno, su un fondino del colore della scheda
function numero(ctx, s, x, al, col = C.dim, size = 32) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const w = 18 * Array.from(s).length + 16; ctx.fillRect(x - w / 2, RY + 28, w, 40);
  ctx.restore();
  txt(ctx, s, x, RY + 48, { size, color: col, alpha: al });
}
const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
// salto da a a b sopra la retta (frazione k), con la punta alla fine
function salto(ctx, a, b, k, col, tratt = false) {
  if (k <= 0) return;
  const x0 = X(a), x1 = X(b), h = 58, n = 30, pts = [];
  for (let i = 0; i <= n; i++) { const s = i / n; pts.push([lerp(x0, x1, s), RY - 14 - h * 4 * s * (1 - s)]); }
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'round';
  if (tratt) ctx.setLineDash([12, 10]);
  const e = M.partial(ctx, pts, k); ctx.restore();
  if (e && k >= 1) arrowHead(ctx, pts[n], Math.atan2(pts[n][1] - pts[n - 1][1], pts[n][0] - pts[n - 1][0]), col, 1.1);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Dai naturali ai reali', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–4 · la retta che si riempie (7.5–FV, tempo interno)
function sceneRetta(ctx, t) {
  if (t < 7.5 || t > FV + .3) return;
  const al = 1 - P(t, FV - .6, FV + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // la retta di sostegno, poi (con i reali) la retta piena
  const kb = P(t, 7.7, 8.5);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.ink, .45); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(XA) - 20, RY); ctx.lineTo(X(XB) + 10, RY); ctx.stroke();
    arrowHead(ctx, [X(XB) + 24, RY], 0, C.ink); ctx.restore();
  }
  glowStroke(ctx, [[X(XA) - 20, RY], [X(XB) + 10, RY]], P(t, 70.9, 72.3, E.lin), C.g, 7);
  // i razionali non interi
  FRAZ.forEach(v => { const a = 45.2 + (v - XA) / (XB - XA) * 1.2; dot(ctx, [X(v), RY], C.v, P(t, a, a + .35, E.back), 6); });
  // i punti viola sono solo alcune frazioni: lo si dice
  drawRich(ctx, '{v:in viola}: solo alcune frazioni, non tutte', 120, 470, { size: 32, align: 'left', alpha: life(t, 46.4, 70.9, .5, .5) });
  // gli interi: prima i naturali, poi i negativi
  for (let i = 0; i <= 5; i++) { const a = 8.0 + i * .25, k = P(t, a, a + .35, E.back); dot(ctx, [X(i), RY], C.x, k, 10); numero(ctx, lab(i), X(i), P(t, a, a + .3)); }
  for (let j = 1; j <= 4; j++) { const a = 21.9 + j * .25, k = P(t, a, a + .35, E.back); dot(ctx, [X(-j), RY], C.y, k, 10); numero(ctx, lab(-j), X(-j), P(t, a, a + .3)); }

  // 1 · 3 − 5 con i soli naturali: dopo lo 0 non c'è dove atterrare
  const ha = life(t, 16.9, 22.1, .2, .4);
  if (ha > 0) {
    ctx.save(); ctx.globalAlpha *= ha;
    for (let i = 0; i < 3; i++) salto(ctx, 3 - i, 2 - i, P(t, 17.0 + i * .5, 17.45 + i * .5, E.lin), C.x);
    salto(ctx, 0, -1, P(t, 18.5, 19.0, E.lin), C.r, true);
    txt(ctx, '?', X(-1), RY - 112, { size: 64, weight: 600, color: C.r, alpha: P(t, 19.0, 19.3) });
    ctx.restore();
  }
  // 2 · 3 − 5 con gli interi: si atterra in −2
  const hb = life(t, 26.3, 31.3, .2, .4);
  if (hb > 0) {
    ctx.save(); ctx.globalAlpha *= hb;
    for (let i = 0; i < 5; i++) salto(ctx, 3 - i, 2 - i, P(t, 26.4 + i * .4, 26.78 + i * .4, E.lin), C.y);
    const kg = P(t, 28.4, 28.8, E.back);
    if (kg > 0) { ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(X(-2), RY, 22 * kg, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    ctx.restore();
  }
  // 3 · 3 : 2, il tratto da 0 a 3 diviso a metà
  const ba = life(t, 31.5, 53.6, .3, .5);
  if (ba > 0) {
    const yb = RY - 80, km = P(t, 33.4, 34.2);
    ctx.save(); ctx.globalAlpha *= ba; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round';
    const kt = P(t, 31.6, 32.6);
    ctx.beginPath(); ctx.moveTo(X(0), yb); ctx.lineTo(lerp(X(0), X(3), kt), yb); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X(0), yb - 16); ctx.lineTo(X(0), yb + 16); ctx.stroke();
    if (kt >= 1) { ctx.beginPath(); ctx.moveTo(X(3), yb - 16); ctx.lineTo(X(3), yb + 16); ctx.stroke(); }
    if (km > 0) {
      ctx.beginPath(); ctx.moveTo(X(1.5), yb - 22 * km); ctx.lineTo(X(1.5), yb + 22 * km); ctx.stroke();
      // le due metà uguali: un segno su ciascuna
      for (const c of [.75, 2.25]) { ctx.beginPath(); ctx.moveTo(X(c) - 6, yb + 10 * km); ctx.lineTo(X(c) + 6, yb - 10 * km); ctx.stroke(); }
    }
    ctx.restore();
    // il punto di mezzo: prima un buco con il punto di domanda, poi la frazione
    const kd = P(t, 36.2, 36.8);
    if (kd > 0) {
      ctx.save(); ctx.globalAlpha *= ba;
      dashed(ctx, [X(1.5), yb + 24], [X(1.5), RY - 16], C.v, kd);
      const kq = 1 - P(t, 41.3, 41.6);
      if (kq > 0) { hole(ctx, [X(1.5), RY], C.r, kd * kq, 13); txt(ctx, '?', X(1.5), yb - 66, { size: 64, weight: 600, color: C.r, alpha: kd * kq }); }
      const kf3 = P(t, 41.5, 42.0, E.back);
      if (kf3 > 0) { dot(ctx, [X(1.5), RY], C.v, kf3, 10); drawSeq(ctx, [{ num: '{mv:3}', den: '{mv:2}' }], X(1.5), yb - 84, 42, { local: t - 41.5 }); }
      ctx.restore();
    }
  }
  // 4 · il quadrato di lato 1, la diagonale, il compasso
  const qa = life(t, 54.0, FV + .3, .3, .5);
  if (qa > 0) {
    ctx.save(); ctx.globalAlpha *= qa;
    const q = [[X(0), RY], [X(1), RY], [X(1), RY - U], [X(0), RY - U], [X(0), RY]];
    ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineJoin = 'round'; M.partial(ctx, q, P(t, 53.9, 54.5, E.lin)); ctx.restore();
    txt(ctx, '1', X(0) - 30, RY - U / 2, { size: 40, color: C.ink, alpha: P(t, 54.4, 54.8) });
    glowStroke(ctx, [[X(0), RY], [X(1), RY - U]], P(t, 54.5, 55.1), C.g, 6);
    drawRich(ctx, '{mg:√2}', X(0) + U * .34, RY - U * .7, { size: 42, alpha: P(t, 55.1, 55.5) });
    // il compasso: il raggio ruota fino a toccare la retta
    const kc = P(t, 62.9, 64.7), r = U * S2;
    if (kc > 0) {
      const a = -Math.PI / 4 * (1 - kc);
      ctx.save(); ctx.strokeStyle = css(C.g, .8); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
      ctx.beginPath(); ctx.arc(X(0), RY, r, -Math.PI / 4, a); ctx.stroke(); ctx.restore();
      if (kc < 1) glowStroke(ctx, [[X(0), RY], [X(0) + r * Math.cos(a), RY + r * Math.sin(a)]], 1, C.g, 4);
    }
    const kp = P(t, 64.6, 65.0, E.back);
    if (kp > 0) { dot(ctx, [X(S2), RY], C.g, kp, 11); { const k2 = P(t, 64.7, 65.1); ctx.save(); ctx.globalAlpha *= k2; ctx.fillStyle = C.paper; ctx.fillRect(X(S2) - 34, RY + 26, 68, 46); ctx.restore(); drawRich(ctx, '{mg:√2}', X(S2), RY + 48, { size: 40, alpha: k2 }); } }
    ctx.restore();
  }
  ctx.restore();
}

// i pannelli in alto: l'insieme di adesso, l'operazione, poi la catena
function scenePannelli(ctx, t) {
  const pa = life(t, 7.9, 79.8, .5, .4);
  if (pa > 0) {
    card(ctx, 80, 110, 840, 280, pa);
    SETS.forEach((S, i) => {
      const nx = SETS[i + 1], k = pa * (nx ? life(t, S.t, nx.t + .2, .5, .3) : P(t, S.t, S.t + .5));
      if (k <= 0) return;
      bb(ctx, S.L, 205, 252, 170, C[S.col], k);
      ctx.save(); ctx.globalAlpha *= k;
      conFont(TITOLI, () => drawRich(ctx, S.nome, 330, 208, { size: 52, weight: 600, align: 'left' }));
      txt(ctx, S.el, 330, 300, { size: 36, color: C.dim, align: 'left' });
      ctx.restore();
    });
  }
  const oa = life(t, 12.5, 79.8, .5, .4);
  if (oa > 0) {
    card(ctx, 1000, 110, 840, 280, oa);
    ctx.save(); ctx.globalAlpha *= oa;
    conFont(TITOLI, () => {
      drawRich(ctx, 'l\'operazione', 1420, 162, { size: 38, weight: 600, alpha: 1 - P(t, 53.6, 54.0) });
      drawRich(ctx, 'la misura', 1420, 162, { size: 38, weight: 600, alpha: P(t, 54.0, 54.4) });
    });
    const Y = 268;
    // 3 − 5
    drawRich(ctx, '{mink:3 − 5 = }{r:?}', 1420, Y, { size: 66, alpha: life(t, 12.6, 28.6, .4, .2) });
    drawRich(ctx, '{mink:3 − 5 = }{mg:−2}', 1420, Y, { size: 66, alpha: life(t, 28.5, 31.1, .3, .3) });
    // 3 : 2
    drawRich(ctx, '{mink:3 : 2 = }{r:?}', 1420, Y, { size: 66, alpha: life(t, 31.2, 41.6, .4, .2) });
    drawSeq(ctx, ['{mink:3 : 2 =}', { num: '{mv:3}', den: '{mv:2}' }], 1420, Y, 66, { alpha: life(t, 41.5, 53.8, .3, .4) });
    // la diagonale
    drawRich(ctx, 'diagonale {mink:= }{r:?}', 1420, Y, { size: 60, alpha: life(t, 54.2, 55.3, .4, .2) });
    drawRich(ctx, 'diagonale {mink:= }{mg:√2}', 1420, Y, { size: 60, alpha: life(t, 55.2, 80.0, .3, .3) });
    drawRich(ctx, '{mink:√2} {r:non è} una frazione', 1420, 345, { size: 36, alpha: life(t, 66.4, 80.0, .4, .3) });
    ctx.restore();
  }
  // la catena degli insiemi
  const ca = life(t, 79.7, FV + .2, .5, .6);
  if (ca > 0) {
    card(ctx, 80, 110, 1760, 280, ca);
    ctx.save(); ctx.globalAlpha *= ca;
    const xs = [600, 840, 1080, 1320];
    SETS.forEach((S, i) => {
      const a = 79.9 + i * .35, k = P(t, a, a + .4, E.back);
      bb(ctx, S.L, xs[i], 222, 120 * (k > 0 ? 1 : 0), C[S.col], k);
      if (i) drawRich(ctx, '{mink:⊂}', xs[i] - 120, 226, { size: 84, alpha: P(t, 79.9 + i * .35, 80.3 + i * .35) });
    });
    drawRich(ctx, '{mink:⊂}  si legge «è contenuto in»', 960, 334, { size: 38, local: t - 83.7 });
    ctx.restore();
  }
}

// 5 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ogni insieme nuovo permette di fare\nqualcosa che prima non si poteva.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[450, 'Z', 'y', 'sottrarre sempre'], [960, 'Q', 'v', 'dividere (non per 0)'], [1470, 'R', 'g', 'misurare la diagonale']];
  pills.forEach(([x, L, col, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 240, 450, 480, 100);
    ctx.font = '500 33px Lexend'; const w = 60 + ctx.measureText(s).width, x0 = x - w / 2;
    bb(ctx, L, x0 + 22, 502, 54, C[col], 1);
    txt(ctx, s, x0 + 60, 502, { size: 33, align: 'left' });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Dai naturali ai reali', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { const u = interno(t); sceneIntro(ctx, t); sceneRetta(ctx, u); scenePannelli(ctx, u); sceneFine(ctx, t); },
  };
});
