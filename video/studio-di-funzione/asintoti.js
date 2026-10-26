'use strict';
/* Le rette guida — gli asintoti della funzione guida f(x) = (x² − x − 2)/(x − 3). Vicino a 3 il numeratore tende a
   9 − 3 − 2 = 4 e il denominatore a 0: lim per x → 3⁻ = 4/0⁻ = −∞, per x → 3⁺ = 4/0⁺ = +∞, asintoto verticale x = 3.
   Verso ±∞ anche f va all'infinito; la divisione x² − x − 2 = (x − 3)(x + 2) + 4 dà f(x) = x + 2 + 4/(x − 3):
   asintoto obliquo y = x + 2, curva sopra per x > 3 e sotto per x < 3. Poi i pezzi di ramo e il grafico probabile.
   Conti rifatti con node. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/asintoti', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, arrowHead, glowStroke, card, checkMark } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['piano', 5.8, 'Sul piano ci sono già la retta {mx:x}{mink: = 3},\nle zone vietate e gli zeri.'],
  ['vicino3', 7.2, 'Vicino a {mink:3} il numeratore tende\na {mink:9 − 3 − 2 = 4}, il denominatore a {mink:0}.'],
  ['sinistra', 6.0, 'A sinistra di {mink:3} il denominatore\nè negativo: {mink:f} tende a {r:−∞}.'],
  ['destra', 4.6, 'A destra è positivo:\n{mink:f} tende a {g:+∞}.'],
  ['verticale', 5.4, '{mx:x}{mink: = 3} è un {v:asintoto verticale}:\nil grafico la costeggia.'],
  ['torna', 5.0, 'I segni tornano: a sinistra {mink:f} è\n{r:negativa}, a destra {g:positiva}.'],
  ['infinito', 6.2, 'Verso {mink:±∞} anche {mink:f} va all’infinito:\nniente asintoto orizzontale.', .3],
  ['divido', 6.2, 'Divido il numeratore per {mx:x}{mink: − 3}:\nquoziente {mx:x}{mink: + 2}, resto {mink:4}.'],
  ['riscrivo', 5.8, 'Allora {mink:f(}{mx:x}{mink:) = }{mx:x}{mink: + 2 + 4/(}{mx:x}{mink: − 3)}.'],
  ['piccolo', 6.4, 'Lontano, {mink:4/(}{mx:x}{mink: − 3)} tende a {g:0}:\n{mink:f} si avvicina a {mx:x}{mink: + 2}.'],
  ['obliquo', 7.8, 'La retta {mink:y = }{mx:x}{mink: + 2} è l’{v:asintoto obliquo}:\ncoi limiti, {mink:m = 1} e {mink:q = 2}.'],
  ['sopra', 6.0, 'Per {mx:x}{mink: > 3} la frazione è {g:positiva}:\nla curva sta {g:sopra} la retta.'],
  ['sotto', 5.0, 'Per {mx:x}{mink: < 3} è {r:negativa}:\nla curva sta {r:sotto}.'],
  ['probabile', 6.0, 'Allungo i pezzi verso gli zeri, nelle\nzone libere: è il {v:grafico probabile}.', .3],
  ['cime', 4.6, 'Dove sono la cima e la valle?\nLo dirà la {v:derivata}.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Dove va il grafico vicino a {mink:3}\ne verso l’infinito?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Prima le rette guida, poi i pezzi\ndi ramo: ecco il grafico probabile.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.sinistra + 1.0, 'sorpreso'], [T.destra, 'neutro'], [T.verticale + .4, 'felice'], [T.torna + 2.4, 'neutro'],
  [T.riscrivo + 1.0, 'felice'], [T.piccolo, 'neutro'], [T.obliquo + .5, 'festa'], [T.sopra, 'neutro'],
  [T.probabile + 1.5, 'felice'], [T.cime, 'pensa'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano di lavoro: la stessa finestra della pagina, x da −4 a 10 e y da −8 a 14 ----------
const f = x => (x * x - x - 2) / (x - 3);
const X = x => 185 + (x + 4) * 59, Y = y => 545 - y * 28, S = (x, y) => [X(x), Y(y)];
const PCARD = [90, 110, 1010, 690], RCARD = [1140, 110, 690, 690];
// i numeri dell'asse x stanno sopra o sotto l'asse dove nelle tappe dello studio non passano né la curva né le rette
// (−4, −3, −2 e 2 sopra; il 3 a destra della retta x = 3); sull'asse y solo i multipli di 4, lontani dalla curva
const SOPRA = { '-4': 1, '-3': 1, '-2': 1, 2: 1 };
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -4; i <= 10; i++) { if (!i) continue; ctx.beginPath(); ctx.moveTo(X(i), Y(0) - (Y(0) - Y(14)) * k); ctx.lineTo(X(i), Y(0) + (Y(-8) - Y(0)) * k); ctx.stroke(); }
  for (let j = -8; j <= 14; j += 2) { if (!j) continue; ctx.beginPath(); ctx.moveTo(X(0) - (X(0) - X(-4)) * k, Y(j)); ctx.lineTo(X(0) + (X(10) - X(0)) * k, Y(j)); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(X(0) - (X(0) - X(-4.1)) * k, Y(0)); ctx.lineTo(X(0) + (X(10.15) - X(0)) * k, Y(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(X(0), Y(0) + (Y(-8.1) - Y(0)) * k); ctx.lineTo(X(0), Y(0) - (Y(0) - Y(14.2)) * k); ctx.stroke();
  arrowHead(ctx, [X(0) + (X(10.15) - X(0)) * k + 6, Y(0)], 0, C.ink);
  arrowHead(ctx, [X(0), Y(0) - (Y(0) - Y(14.2)) * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  for (let i = -4; i <= 10; i++) {
    if (!i) continue;
    const s = (i < 0 ? '−' : '') + Math.abs(i);
    if (i === 3) txt(ctx, s, X(3) + 12, Y(0) + 30, { size: 30, color: C.dim, align: 'left' });
    else txt(ctx, s, X(i), Y(0) + (SOPRA[i] ? -30 : 30), { size: 30, color: C.dim });
  }
  [-8, -4, 4, 8, 12].forEach(j => txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), X(0) - 14, Y(j), { size: 30, color: C.dim, align: 'right' }));
  drawRich(ctx, '{mx:x}', X(10.15) + 40, Y(0), { size: 44 });
  drawRich(ctx, '{my:y}', X(0) + 26, Y(14.2) - 6, { size: 44, align: 'left' });
  ctx.restore();
}
// la retta tratteggiata x = 3, da y = −8 a y = 14
function retta3(ctx, k, al = 1, w = 4) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = w; ctx.setLineDash([14, 12]);
  ctx.beginPath(); ctx.moveTo(X(3), Y(-8)); ctx.lineTo(X(3), Y(-8) + (Y(14) - Y(-8)) * k); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };
// le zone vietate dal segno: sopra l'asse dove f < 0, sotto dove f > 0
const ZONE = [[-4, -1, true], [-1, 2, false], [2, 3, true], [3, 10, false]];
function zona(ctx, a, b, sopra, al) {
  if (al <= 0) return;
  const y0 = Y(0), y1 = sopra ? Y(14) : Y(-8);
  ctx.save(); ctx.fillStyle = css(C.v, .2 * al); ctx.fillRect(X(a), Math.min(y0, y1), X(b) - X(a), Math.abs(y1 - y0)); ctx.restore();
}
// un pezzo di curva fra a e b (b può essere minore di a: si disegna da a verso b)
const tratto = (a, b, n = 60) => { const p = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; p.push(S(x, f(x))); } return p; };
// pezzo di ramo pieno con la freccia in fondo (verso l'infinito)
function ramo(ctx, pts, k, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const e = glowStroke(ctx, pts, k, C.y, 6);
  if (e && k > .97) arrowHead(ctx, e[0], e[1], C.y, 1.2);
  ctx.restore();
}
function tratteggio(ctx, pts, k, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.y); ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.lineCap = 'round';
  M.partial(ctx, pts, k); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Le rette guida', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1 · la scheda a destra: prima vicino a 3, poi verso l'infinito (T.vicino3–FINE)
function sceneScheda(ctx, t) {
  if (t < T.vicino3 || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RCARD, P(t, T.vicino3, T.vicino3 + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  // A · vicino a 3
  const ka = 1 - P(t, T.infinito - .1, T.infinito + .3);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka;
    conFont(TITOLI, () => drawRich(ctx, 'vicino a 3', 1485, 165, { size: 40, weight: 600, local: t - T.vicino3 - .2 }));
    lab(ctx, '{dim:numeratore }{mink:→ 9 − 3 − 2 = 4}', [1485, 250], P(t, T.vicino3 + .6, T.vicino3 + 1.0));
    lab(ctx, '{dim:denominatore }{mink:→ 0}', [1485, 310], P(t, T.vicino3 + 4.6, T.vicino3 + 5.0));
    if (t > T.sinistra + .5) drawSeq(ctx, [{ lim: '{mx:x}{mink:→3⁻}' }, '{mink:f(}{mx:x}{mink:) =}', { num: '{mink:4}', den: '{mink:0⁻}' }, '{mink:=}', '{mr:−∞}'], 1470, 430, 48, { local: t - T.sinistra - .5 });
    if (t > T.destra + .4) drawSeq(ctx, [{ lim: '{mx:x}{mink:→3⁺}' }, '{mink:f(}{mx:x}{mink:) =}', { num: '{mink:4}', den: '{mink:0⁺}' }, '{mink:=}', '{mg:+∞}'], 1470, 565, 48, { local: t - T.destra - .4 });
    lab(ctx, '{v:asintoto verticale}{mink:  x = 3}', [1485, 680], P(t, T.verticale + .5, T.verticale + .9));
    // i segni dei limiti tornano con il segno di f
    checkMark(ctx, 1785, 430, P(t, T.torna + .5, T.torna + 1.3), C.g, .26);
    checkMark(ctx, 1785, 565, P(t, T.torna + 2.2, T.torna + 3.0), C.g, .26);
    ctx.restore();
  }
  // B · verso l'infinito
  const kb = P(t, T.infinito + .3, T.infinito + .8);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb;
    conFont(TITOLI, () => drawRich(ctx, 'verso l’infinito', 1485, 165, { size: 40, weight: 600, local: t - T.infinito - .4 }));
    drawSeq(ctx, [{ lim: '{mx:x}{mink:→±∞}' }, '{mink:f(}{mx:x}{mink:) = ±∞}'], 1485, 245, 46, { local: t - T.infinito - .6 });
    lab(ctx, '{mx:x}{mink:² − }{mx:x}{mink: − 2 = (}{mx:x}{mink: − 3)(}{mx:x}{mink: + 2) + 4}', [1485, 345], P(t, T.divido + .6, T.divido + 1.0));
    if (t > T.riscrivo + .4) drawSeq(ctx, ['{my:f(}{mx:x}{my:) = }{mx:x}{mink: + 2 +}', { num: '{mink:4}', den: '{mx:x}{mink: − 3}' }], 1485, 448, 48, { local: t - T.riscrivo - .4 });
    if (t > T.piccolo + .6) drawSeq(ctx, ['{dim:lontano }', { num: '{mink:4}', den: '{mx:x}{mink: − 3}' }, '{mink:→ }{mg:0}'], 1485, 552, 44, { local: t - T.piccolo - .6 });
    lab(ctx, '{v:asintoto obliquo}{mink:  y = }{mx:x}{mink: + 2}', [1485, 643], P(t, T.obliquo + .5, T.obliquo + .9));
    lab(ctx, '{dim:coi limiti:  }{mink:m = 1,  q = 2}', [1485, 703], P(t, T.obliquo + 4.2, T.obliquo + 4.6));
    lab(ctx, '{mx:x}{mink: > 3}{dim:: }{g:sopra}', [1335, 763], P(t, T.sopra + .8, T.sopra + 1.2));
    lab(ctx, '{mx:x}{mink: < 3}{dim:: }{r:sotto}', [1640, 763], P(t, T.sotto + .8, T.sotto + 1.2));
    ctx.restore();
  }
  ctx.restore();
}

// 2 · il piano: le zone del segno, gli asintoti, i pezzi di ramo (T.piano–FINE)
const PL = tratto(2.45, 2.674), PR = tratto(4.1, 3.4934), OR = tratto(8, 10), OL = tratto(-2.6, -4);
const EST = [tratto(-2.6, -1), tratto(2.45, 2), tratto(4.1, 4.6), tratto(8, 7)];
function sceneGrafico(ctx, t) {
  if (t < T.piano || t > FINE + .3) return;
  const al = life(t, T.piano, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  ZONE.forEach(([a, b, sopra]) => zona(ctx, a, b, sopra, P(t, T.piano + 1.2, T.piano + 2.0)));
  assi(ctx, P(t, T.piano + .2, T.piano + 1.0));
  retta3(ctx, P(t, T.piano + .6, T.piano + 1.4));
  lab(ctx, '{mx:x}{mv: = 3}', [X(3) - 14, Y(13)], P(t, T.piano + 1.2, T.piano + 1.6), 40, 'right');
  [-1, 2].forEach((x, i) => dot(ctx, S(x, 0), C.y, P(t, T.piano + 2.2 + i * .3, T.piano + 2.6 + i * .3, E.back), 11));
  lab(ctx, '{v:asintoto verticale}', [X(3) + 14, Y(-7)], P(t, T.verticale + .5, T.verticale + .9), 34, 'left');
  // l'asintoto obliquo y = x + 2
  const ko = P(t, T.obliquo + .4, T.obliquo + 1.6);
  if (ko > 0) {
    ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.setLineDash([14, 12]);
    const a = S(-4, -2), b = S(10, 12);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * ko, a[1] + (b[1] - a[1]) * ko); ctx.stroke(); ctx.restore();
  }
  lab(ctx, '{mink:y = }{mx:x}{mink: + 2}', S(8.4, 6.5), P(t, T.obliquo + 1.4, T.obliquo + 1.8));
  // i pezzi di ramo, con la freccia verso l'infinito
  ramo(ctx, PL, P(t, T.sinistra + 2.4, T.sinistra + 3.6, E.lin));
  ramo(ctx, PR, P(t, T.destra + 1.4, T.destra + 2.6, E.lin));
  ramo(ctx, OR, P(t, T.sopra + 2.2, T.sopra + 3.4, E.lin));
  ramo(ctx, OL, P(t, T.sotto + 2.2, T.sotto + 3.4, E.lin));
  // il grafico probabile: i pezzi si allungano, tratteggiati, verso gli zeri
  EST.forEach(p => tratteggio(ctx, p, P(t, T.probabile + .6, T.probabile + 2.2, E.lin)));
  const kq = P(t, T.cime + .4, T.cime + .8, E.back);
  if (kq > 0) { txt(ctx, '?', X(0.4), Y(3.9), { size: 60, weight: 600, color: C.v, alpha: kq }); txt(ctx, '?', X(5.6), Y(11.6), { size: 60, weight: 600, color: C.v, alpha: kq }); }
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Gli asintoti sono le {v:rette guida}:\nil grafico le costeggia.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mx:x}{mink: = 3}{dim:: }{v:verticale}'], [960, '{mink:y = }{mx:x}{mink: + 2}{dim:: }{v:obliquo}'], [1430, 'il {g:grafico probabile}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 215, 455, 430, 100);
    drawRich(ctx, s, x, 507, { size: 38, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', T.piano], ['traccia', T.piano + .2, T.piano + 1.0], ['traccia', T.piano + .6, T.piano + 1.4],   // il piano, x = 3
    ['soffio', T.piano + 1.2], ['pop', T.piano + 2.3, .4], ['pop', T.piano + 2.6, .55],             // le zone, gli zeri
    ['soffio', T.vicino3], ['pop', T.vicino3 + .7, .6], ['pop', T.vicino3 + 4.7, .3],                // numeratore → 4, denominatore → 0
    ['pop', T.sinistra + .6, .4], ['tono', T.sinistra + 2.4, T.sinistra + 3.6, [.4, .05]],          // il limite a sinistra, il ramo giù
    ['pop', T.destra + .5, .6], ['tono', T.destra + 1.4, T.destra + 2.6, [.6, .95]],                // a destra, il ramo su
    ['ding', T.verticale + .5], ['pop', T.torna + .6, .6], ['pop', T.torna + 2.3, .7],              // asintoto verticale, i segni tornano
    ['soffio', T.infinito + .3], ['pop', T.infinito + .7, .5],
    ['pop', T.divido + .7, .5], ['pop', T.riscrivo + .5, .55], ['pop', T.piccolo + .7, .4],
    ['traccia', T.obliquo + .4, T.obliquo + 1.6], ['tono', T.obliquo + .4, T.obliquo + 1.6, [.3, .8]], ['ding', T.obliquo + 1.5],   // y = x + 2
    ['tono', T.sopra + 2.2, T.sopra + 3.4, [.75, .85]], ['tono', T.sotto + 2.2, T.sotto + 3.4, [.3, .2]],   // i rami lungo l'obliquo
    ['traccia', T.probabile + .6, T.probabile + 2.2], ['pop', T.cime + .5, .7],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Le rette guida', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.infinito - .2, 'l’asintoto verticale'], [T.infinito - .2, T.probabile - .2, 'l’asintoto obliquo'], [T.probabile - .2, FINE, 'il grafico probabile']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
