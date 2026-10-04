'use strict';
/* Il grafico di aˣ — con base maggiore di 1 sale, con base fra 0 e 1 scende; passa sempre per (0; 1)
   e ha l'asse x come asintoto (a sinistra se a > 1, a destra se 0 < a < 1). Argomento: esponenziali. */
CVIDEO.registra('esponenziali/grafico', M => {
  const { W, C, E, P, life, kf, clamp, css, mix, TITOLI, conFont, drawRich, txt, dot, glowStroke, arrowHead, makePlane, card } = M;

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [88.0, 190], [89.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [88.0, 1050], [89.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [88.0, 2.2], [89.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [88.0, 2], [89.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [88.0, -1.5], [89.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [13.7, 'felice'], [15.8, 'neutro'], [22.5, 'sorpreso'], [24.7, 'neutro'], [29.0, 'felice'], [31.1, 'neutro'],
  [38.4, 'sorpreso'], [40.5, 'neutro'], [49.3, 'felice'], [51.4, 'neutro'], [57.7, 'felice'], [59.8, 'neutro'],
  [63.6, 'sorpreso'], [65.8, 'neutro'], [73.7, 'sorpreso'], [75.8, 'neutro'], [83.1, 'felice'], [85.2, 'neutro'],
  [90.0, 'felice'], [95.6, 'occhiolino'],
];
// una frase per ogni cosa che succede; la base cambia fra un fumetto e l'altro
const FUMETTI = [
  [1.6, 6.3, 'Che grafico ha {mink:y = }{mv:a}{mx:ˣ}?\nLa base {mv:a} è fissa, {mx:x} varia.'],
  // 1 · base 2
  [8.0, 12.5, 'Provo con la base {mv:a}{mink: = 2}:\ncalcolo {mink:2}{mx:ˣ} per qualche {mx:x}.'],
  [13.7, 17.9, 'Con {mx:x}{mink: = 1, 2, 3} escono\n2, 4, 8: raddoppia a ogni passo.'],
  [18.5, 21.6, 'Con {mx:x}{mink: = 0} viene 1:\n{mink:2⁰ = 1}.'],
  [22.5, 27.0, 'Con {mx:x} negativo, numeri fra 0 e 1:\n{mink:2⁻¹ = 0,5}, {mink:2⁻² = 0,25}.'],
  [29.0, 33.4, 'Unisco i punti: la curva {g:sale},\nsempre più in fretta.'],
  [33.5, 38.3, 'Verso sinistra, cioè per {mx:x}{mink: → −∞},\nsi avvicina all’asse {mx:x}…'],
  [38.4, 43.0, '…ma non lo tocca mai: {mink:y = 0}\nè l’{v:asintoto} orizzontale.'],
  [43.1, 47.6, 'La curva sta sempre {g:sopra} l’asse {mx:x}:\n{mink:2}{mx:ˣ} è sempre positivo.'],
  // 2 · altre basi
  [49.3, 52.8, 'Con {mv:a}{mink: = 3} sale {g:più ripida}.'],
  [54.4, 57.6, 'Con {mv:a}{mink: = 1,5} sale più lentamente.'],
  [57.7, 62.2, 'La curva passa sempre per {g:(0; 1)}:\n{mv:a}{mink:⁰ = 1} con qualunque base.'],
  [63.6, 67.6, 'Con {mv:a}{mink: = 1} esce una retta:\n{mink:1}{mx:ˣ}{mink: = 1} per ogni {mx:x}.'],
  [67.7, 72.0, 'Per questo la base 1 si {r:esclude}:\n{mv:a}{mink: > 0} e {mv:a}{mink: ≠ 1}.'],
  // 3 · base fra 0 e 1
  [73.7, 78.1, 'Con {mv:a}{mink: = 0,5} la curva {r:scende}:\nè decrescente.'],
  [78.2, 83.0, 'Ora l’asse {mx:x} fa da asintoto\na destra, per {mx:x}{mink: → +∞}.'],
  [83.1, 87.6, 'Passa ancora per {g:(0; 1)}\ne resta sempre {g:sopra} l’asse {mx:x}.'],
  // chiusura
  [90.0, 95.5, 'Sale se {mv:a}{mink: > 1}, scende se {mink:0 < }{mv:a}{mink: < 1}:\nsempre per {g:(0; 1)}, sopra l’asse {mx:x}.'],
];
const DURATA = 98.3, FINE = 88.0;
const CARD_L = [150, 110, 1000, 690], CARD_R = [1210, 110, 640, 690];

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il grafico di {mv:a}{mx:ˣ}', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la base nel tempo: cambia solo fra un fumetto e l'altro, e si ferma su 1 per farla vedere esclusa
const aT = t => kf(t, [[47.8, 2], [49.2, 3], [52.9, 3], [54.3, 1.5], [62.4, 1.5], [63.6, 1], [72.2, 1], [73.6, .5]]);
const base = a => (Math.round(a * 10) / 10).toFixed(1).replace(/\.0$/, '').replace('.', ',');
// numeri dell'asse y solo a sinistra e solo pari (2, 4, 6, 8): lì nessuna curva passa mai
const PL = makePlane({ ox: 650, oy: 718, u: 62, x0: -7, x1: 7, y0: -1, y1: 8.5, ystep: 2 });
const YMAX = 8.75;
function tratto(a) {   // la curva y = aˣ fin dove sta nel piano
  const L = Math.log(a), xs = Math.abs(L) < 1e-9 ? 7 : Math.log(YMAX) / L;
  const x0 = L < 0 ? Math.max(-7, xs) : -7, x1 = L > 0 ? Math.min(7, xs) : 7;
  return PL.curve(x => a ** x, x0, x1, 360);
}
const PUNTI = [[1, 12.6], [2, 13.0], [3, 13.4], [0, 18.1], [-1, 21.8], [-2, 22.2]];
function freccia(ctx, x0, x1, y, al) {   // freccia viola orizzontale, in unità del piano
  if (al <= 0) return;
  const A = PL.toS(x0, y), B = PL.toS(x1, y), d = Math.sign(B[0] - A[0]);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0] - d * 10, B[1]); ctx.stroke(); ctx.restore();
  arrowHead(ctx, B, d > 0 ? 0 : Math.PI, C.v, 1.1 * al);
}
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const A = 1 - P(t, FINE, FINE + .6);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD_L, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  const a = aT(t), O = PL.toS(0, 0);
  // l'asintoto: l'asse x ripassato in viola, sottile e tratteggiato, così la curva che gli si avvicina resta distinta
  const as = Math.max(life(t, 38.4, 47.7, .5, .5), life(t, 78.2, FINE, .5, .4));
  if (as > 0) {
    ctx.save(); ctx.globalAlpha *= as * .75; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.setLineDash([14, 10]);
    ctx.beginPath(); ctx.moveTo(PL.toS(-7, 0)[0], O[1]); ctx.lineTo(PL.toS(7, 0)[0], O[1]); ctx.stroke(); ctx.restore();
  }
  ctx.save(); ctx.beginPath(); ctx.rect(CARD_L[0] + 8, PL.toS(0, YMAX)[1], CARD_L[2] - 16, PL.toS(0, -1)[1] - PL.toS(0, YMAX)[1]); ctx.clip();
  // sempre positiva: la zona fra la curva e l'asse, in verde che sfuma verso l'alto
  // (a destra di dove la curva esce dal piano la zona continua fino al bordo: niente taglio verticale)
  const pos = life(t, 43.2, 47.6, .5, .5);
  if (pos > 0) {
    const pts = tratto(2), top = PL.toS(0, YMAX)[1], R = PL.toS(7, 0)[0];
    const gr = ctx.createLinearGradient(0, O[1], 0, top);
    gr.addColorStop(0, css(C.g, .2)); gr.addColorStop(.55, css(C.g, .06)); gr.addColorStop(1, css(C.g, 0));
    ctx.save(); ctx.globalAlpha *= pos; ctx.fillStyle = gr; ctx.beginPath();
    ctx.moveTo(pts[0][0], O[1]); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(R, top); ctx.lineTo(R, O[1]); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  // la curva di prima, tratteggiata, mentre la base cambia
  const gh = life(t, 47.7, 72.6, .5, .5);
  if (gh > 0) {
    const pts = tratto(2);
    ctx.save(); ctx.globalAlpha *= gh; ctx.strokeStyle = css(C.dim, .8); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  }
  // la curva: rossa quando la base vale 1
  const rosso = clamp(1 - Math.abs(a - 1) / .12);
  glowStroke(ctx, tratto(a), P(t, 27.1, 28.9, E.lin), rosso > 0 ? mix(C.y, C.r, rosso) : C.y);
  ctx.restore();
  if (gh > 0) { const g = PL.toS(3.32, 8.15); drawRich(ctx, '{mdim:2}{mx:ˣ}', g[0], g[1], { size: 40, align: 'left', alpha: gh }); }
  // i punti calcolati con la base 2; (0; 1) resta per sempre: sta su ogni curva
  for (const [x, tp] of PUNTI) {
    const k = P(t, tp, tp + .4, E.back) * (x === 0 ? 1 : 1 - P(t, 47.7, 48.2));
    if (k > 0) dot(ctx, PL.toS(x, 2 ** x), x === 0 ? mix(C.ink, C.g, P(t, 57.7, 58.3)) : C.ink, k, 10);
  }
  // la scritta (0; 1): dalla parte dove la curva sta sotto 1
  const l1 = life(t, 57.8, 62.4, .4, .4), l2 = life(t, 83.2, FINE, .4, .4);
  drawRich(ctx, '{g:(0; 1)}', O[0] + 26, O[1] - 32, { size: 40, align: 'left', alpha: l1 });
  drawRich(ctx, '{g:(0; 1)}', O[0] - 26, O[1] - 32, { size: 40, align: 'right', alpha: l2 });
  // verso −∞ e verso +∞
  const f1 = life(t, 33.6, 43.0, .5, .5), f2 = life(t, 78.3, 83.0, .5, .5);
  freccia(ctx, -1.7, -6.4, 1.45, f1);
  drawRich(ctx, '{mx:x}{mink: → −∞}', PL.toS(-4.05, 2.2)[0], PL.toS(0, 2.2)[1], { size: 40, alpha: f1 });
  freccia(ctx, 1.7, 6.4, 1.45, f2);
  drawRich(ctx, '{mx:x}{mink: → +∞}', PL.toS(4.05, 2.2)[0], PL.toS(0, 2.2)[1], { size: 40, alpha: f2 });
  // il nome dell'asintoto, appena sopra l'asse, dove la curva è quasi a zero
  drawRich(ctx, '{v:asintoto }{mink:y = 0}', PL.toS(-5.0, 0)[0], O[1] - 44, { size: 40, alpha: life(t, 38.6, 47.7, .5, .5) });
  drawRich(ctx, '{v:asintoto }{mink:y = 0}', PL.toS(4.6, 0)[0], O[1] - 44, { size: 40, alpha: life(t, 78.4, FINE, .5, .4) });
  ctx.restore();
}

// la scheda a destra: l'equazione, la tabella dei valori con la base 2, le proprietà dette da Ada
const VALORI = ['0,25', '0,5', '1', '2', '4', '8'];   // 2ˣ per x = −2 … 3
function riga(ctx, s, y, al) { if (al > 0) drawRich(ctx, s, 1250, y, { size: 40, align: 'left', alpha: al }); }
function sceneScheda(ctx, t) {
  const ca = life(t, 8.0, FINE + .6, .5, .6);
  if (ca <= 0) return;
  const a = aT(t);
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, ...CARD_R);
  conFont(TITOLI, () => drawRich(ctx, '{dim:la funzione esponenziale}', 1530, 160, { size: 32, weight: 600 }));
  drawRich(ctx, `{mink:y = }{mv:${base(a)}}{mx:ˣ}`, 1530, 236, { size: 60 });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 292); ctx.lineTo(1810, 292); ctx.stroke();
  // la tabella (solo con la base 2)
  const ta = life(t, 8.6, 47.9, .5, .4);
  if (ta > 0) {
    ctx.save(); ctx.globalAlpha *= ta;
    // intestazioni a 30 px dal bordo, separatore staccato da «2ˣ»; colonne larghe quanto il loro testo,
    // con l'aria che avanza divisa in parti uguali fra i valori (fino a 30 px dal bordo destro)
    drawRich(ctx, '{mx:x}', 1268, 352, { size: 40 });
    drawRich(ctx, '{mink:2}{mx:ˣ}', 1268, 418, { size: 40 });
    const SEP = 1312, X0 = SEP + 26, X1 = 1820;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(SEP, 385); ctx.lineTo(X1, 385); ctx.moveTo(SEP, 322); ctx.lineTo(SEP, 448); ctx.stroke();
    const ETI = PUNTI.map(([x]) => x).sort((a, b) => a - b).map(x => (x < 0 ? '−' : '') + Math.abs(x));
    const larg = ETI.map((s, i) => { ctx.font = '600 44px Lexend, "Segoe UI", sans-serif'; return Math.max(ctx.measureText(s).width, ctx.measureText(VALORI[i]).width); });
    const aria = (X1 - X0 - larg.reduce((s, v) => s + v, 0)) / (larg.length - 1);
    const cx = []; larg.reduce((x, wl, i) => { cx[i] = x + wl / 2; return x + wl + aria; }, X0);
    PUNTI.forEach(([x, tp]) => {
      const k = P(t, tp, tp + .4, E.out); if (k <= 0) return;
      txt(ctx, ETI[x + 2], cx[x + 2], 352, { size: 44, color: C.x, alpha: k });
      txt(ctx, VALORI[x + 2], cx[x + 2], 418, { size: 44, weight: x === 0 ? 600 : 500, color: x === 0 ? C.g : C.ink, alpha: k });
    });
    ctx.restore();
  }
  // la definizione, quando Ada la dice
  const df = P(t, 67.8, 68.3);
  if (df > 0) drawRich(ctx, '{dim:base }{mv:a}{mink: > 0}{dim: e }{mv:a}{mink: ≠ 1}', 1530, 380, { size: 40, alpha: df, local: t - 67.8 });
  // le proprietà: si scrivono quando Ada le dice; con la base 1 le prime due non valgono
  const Y = [520, 590, 660, 730];
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  if (t > 29.0) { ctx.save(); ctx.globalAlpha *= P(t, 29.0, 29.4); ctx.beginPath(); ctx.moveTo(1250, 470); ctx.lineTo(1810, 470); ctx.stroke(); ctx.restore(); }
  // con la base 1 le prime due sbiadiscono; quando la base passa a 0,5 spariscono del tutto (lì sono false)
  const d1 = (1 - .7 * P(t, 63.2, 63.8)) * (1 - P(t, 72.2, 72.6));
  // «sale»: con le basi 2, 3 e 1,5 diventa «sale se a > 1»
  riga(ctx, 'la curva {g:sale}', Y[0], P(t, 29.0, 29.5) * (1 - P(t, 54.4, 54.7)) * d1);
  riga(ctx, '{g:sale} se {mv:a}{mink: > 1}', Y[0], P(t, 54.7, 55.1) * d1);
  riga(ctx, '{r:scende} se {mink:0 < }{mv:a}{mink: < 1}', Y[0], P(t, 74.0, 74.4));
  riga(ctx, 'asintoto {mink:y = 0} a sinistra', Y[1], P(t, 38.4, 38.9) * d1);
  riga(ctx, 'asintoto {mink:y = 0} a destra', Y[1], P(t, 78.5, 78.9));
  riga(ctx, 'sempre sopra l’asse {mx:x}', Y[2], P(t, 43.1, 43.6));
  riga(ctx, 'passa per {g:(0; 1)}', Y[3], P(t, 57.7, 58.2));
  ctx.restore();
}

// chiusura (88.3–98.3)
function sceneFine(ctx, t) {
  if (t < 88.3) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 88.5 });
    drawRich(ctx, 'Sempre sopra l’asse {mx:x}, sempre per {g:(0; 1)}:\nsale o scende a seconda della base.', W / 2, 290, { size: 62, weight: 600, local: t - 88.9, stagger: .08 });
  });
  const pills = [[490, '{dim:sale se}', '{mv:a}{mink: > 1}'], [960, '{dim:scende se}', '{mink:0 < }{mv:a}{mink: < 1}'], [1430, '{dim:asintoto}', '{mink:y = 0}']];
  pills.forEach(([x, testa, f], i) => {
    const a0 = 90.4 + i * .5, k = P(t, a0, a0 + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, x, 545, { size: 46 });
    ctx.restore();
  });
}

  return {
    titolo: 'Il grafico di aˣ', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 47.7, 'la base 2'], [47.7, 72.1, 'cambio la base'], [72.1, FINE, 'base minore di 1']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
