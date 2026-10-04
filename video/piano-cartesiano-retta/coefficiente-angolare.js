'use strict';
/* m e q — in y = mx + q, q sposta la retta su e giù, m la fa girare; m = Δy / Δx. Argomento: piano-cartesiano-retta. */
CVIDEO.registra('piano-cartesiano-retta/coefficiente-angolare', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, fixedNum, fmtN, txt,
    dot, glowStroke, makePlane, axisLabel, card } = M;

const FINE = 85.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [12.6, 'felice'], [14.6, 'neutro'], [18.9, 'felice'], [21.0, 'neutro'],
  [24.4, 'sorpreso'], [26.4, 'neutro'], [28.8, 'sorpreso'], [30.8, 'neutro'], [32.9, 'felice'], [35.0, 'neutro'],
  [38.1, 'neutro'], [43.4, 'sorpreso'], [45.4, 'neutro'], [48.4, 'felice'], [50.4, 'neutro'],
  [52.4, 'sorpreso'], [54.4, 'neutro'], [56.4, 'pensa'], [60.4, 'neutro'],
  [69.2, 'felice'], [71.2, 'neutro'], [75.8, 'sorpreso'], [77.8, 'felice'], [79.8, 'neutro'], [82.0, 'festa'], [84.2, 'neutro'],
  [FINE + 1.0, 'felice'], [91.4, 'occhiolino'], [93.5, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Che cosa fanno {mv:m} e {my:q}\nalla retta?'],
  // 1 · q
  [7.9, 12.3, 'Ecco la retta {mink:y = }{mv:2}{mx:x}{mink: + }{my:1}.'],
  [12.4, 18.7, 'Taglia l\'asse {my:y} in {mink:(0; 1)}:\nlì {mx:x} = 0, quindi {my:y} = 1.'],
  [18.8, 23.0, 'Quel numero è {my:q}:\nl\'{g:ordinata all\'origine}.'],
  [23.1, 27.5, 'Se {my:q} aumenta,\nla retta {g:sale}…'],
  [27.6, 31.8, '…se {my:q} diminuisce, {r:scende}.'],
  [31.9, 36.6, 'Si sposta senza girare:\nresta {g:inclinata} allo stesso modo.'],
  // 2 · m
  [37.9, 42.4, 'Ora tengo fermo {my:q} e cambio {mv:m},\nil {v:coefficiente angolare}: la pendenza.'],
  [42.5, 47.0, 'Con {mv:m} più grande\nè più {g:ripida}.'],
  [47.1, 51.2, 'Con {mv:m} = 0\nè {g:orizzontale}.'],
  [51.3, 55.9, 'Con {mv:m} negativo scende,\nda sinistra a destra.'],
  [56.0, 60.4, 'Gira sempre attorno\nallo stesso punto, {mink:(0; 1)}.'],
  // 3 · m = Δy / Δx
  [62.0, 68.2, 'Da {mink:(0; 1)} faccio un passo a destra:\nè lo spostamento {mx:Δx} = 1.'],
  [68.3, 74.2, 'Intanto la retta sale di 2:\n{my:Δy} = 2, proprio come {mv:m}.'],
  [74.3, 79.9, 'Con due passi sale di 4:\n{mink:4 / 2} fa ancora 2.'],
  [80.0, 85.3, '{mv:m} = {my:Δy} / {mx:Δx}: quanto sale\ndiviso quanto avanza.'],
  // chiusura
  [86.8, 93.0, '{my:q} dice dove taglia l\'asse {my:y},\n{mv:m} quanto sale a ogni passo.'],
];

// il piano: stessa unità sui due assi
const PL = makePlane({ ox: 665, oy: 586, u: 72, x0: -4.6, x1: 4.6, y0: -2.6, y1: 5.4 });
const CARD = [250, 110, 830, 690];
// la parte di retta y = mx + q che sta dentro la griglia
function tratto(m, q) {
  let a = PL.x0, b = PL.x1;
  if (Math.abs(m) > 1e-6) {
    const u = (PL.y0 - q) / m, v = (PL.y1 - q) / m;
    a = Math.max(a, Math.min(u, v)); b = Math.min(b, Math.max(u, v));
  }
  return [PL.toS(a, m * a + q), PL.toS(b, m * b + q)];
}
function retta(ctx, m, q, col, k = 1, al = 1, w = 5) {
  if (al <= 0 || k <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  glowStroke(ctx, tratto(m, q), k, col, w);
  ctx.restore();
}
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function riga(ctx, label, val, y, col, al = 1, x0 = 1230, x1 = 1700) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, x0, y, { size: 46, align: 'left' });
  fixedNum(ctx, val, x1, y, 46, col);
  ctx.restore();
}
// larghezza di una riga di drawSeq (stessa regola del motore)
function seqW(ctx, items, size) {
  const ws = items.map(it => typeof it === 'string' ? richW(ctx, it, size) : Math.max(richW(ctx, it.num, size), richW(ctx, it.den, size)) + size * .35);
  return ws.reduce((a, b) => a + b, 0) + size * .12 * (items.length - 1);
}
// intero quando è fermo su un intero, una cifra decimale mentre scorre (così le cifre non ballano)
function valore(f, t) {
  const v = f(t), fermo = Math.abs(f(t + .02) - f(t - .02)) < 1e-9;
  return fermo && Math.abs(v - Math.round(v)) < 1e-6 ? fmtN(Math.round(v), 0) : fmtN(v, 1);
}
// i numeri degli assi su un fondino di carta, sopra la retta che li attraversa; senza1: l'1 dell'asse y lo scrive un'etichetta arancio
function numeri(ctx, al, senza1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
  for (let i = Math.ceil(PL.x0); i <= PL.x1; i++) if (i) {
    const s = lab(i), w = 17 * s.length + 14, p = PL.toS(i, 0);
    ctx.fillRect(p[0] - w / 2, p[1] + 16, w, 32); txt(ctx, s, p[0], p[1] + 32, { size: 29, color: C.dim });
  }
  for (let j = Math.ceil(PL.y0); j <= PL.y1; j++) if (j && !(senza1 && j === 1)) {
    const s = lab(j), w = 17 * s.length + 14, p = PL.toS(0, j);
    ctx.fillRect(p[0] - 18 - w, p[1] - 16, w, 32); txt(ctx, s, p[0] - 20, p[1], { size: 29, color: C.dim, align: 'right' });
  }
  ctx.restore();
}
// una riga che si accende quando se ne parla
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .12);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 14); ctx.fill(); ctx.restore();
}

// q e m nel tempo; m si fa girare per angolo, così la rotazione è regolare
const qAt = t => kf(t, [[23.5, 1], [25.0, 3], [28.0, 3], [30.0, -2], [36.8, -2], [38.0, 1]]);
const ANG = a => Math.atan(a);
const mAt = t => Math.tan(kf(t, [[42.7, ANG(2)], [44.2, ANG(4)], [47.4, ANG(4)], [49.0, 0], [51.6, 0], [53.0, ANG(-1.5)], [60.6, ANG(-1.5)], [61.8, ANG(2)]]));

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{mink:y = }{mv:m}{mx:x}{mink: + }{my:q}', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il piano con la retta (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  const q = qAt(t), m = mAt(t);
  // le posizioni lasciate indietro: la retta scorre, non gira
  const ga = life(t, 32.1, 36.8, .6, .5);
  if (ga > 0) { retta(ctx, 2, 3, C.v, 1, ga * .3, 4); retta(ctx, 2, 1, C.v, 1, ga * .3, 4); }
  // le posizioni per cui è passata girando: tutte per (0; 1)
  const gb = life(t, 56.2, 60.4, .5, .4);
  if (gb > 0) { retta(ctx, 4, 1, C.v, 1, gb * .3, 4); retta(ctx, 0, 1, C.v, 1, gb * .3, 4); }
  // da 38.2 l'1 dell'asse y lo scrive l'etichetta arancio: quello grigio si copre sotto la retta
  const n1 = life(t, 38.2, FINE, .4, .4);
  if (n1 > 0) { const p1 = PL.toS(0, 1); ctx.save(); ctx.globalAlpha *= n1; ctx.fillStyle = C.paper; ctx.fillRect(p1[0] - 48, p1[1] - 18, 32, 36); ctx.restore(); }
  retta(ctx, m, q, C.v, P(t, 8.4, 9.6, E.out), 1, 5);
  numeri(ctx, P(t, 8.3, 8.7), t > 38.2);
  // il punto sull'asse y
  const pq = PL.toS(0, q);
  dot(ctx, pq, C.y, P(t, 12.6, 13.0, E.back), 11);
  // etichetta in basso a destra: con m = 2 la retta lì passa più in alto; sparisce prima che la retta si muova
  const e1 = life(t, 12.8, 19.2, .4, .3), e2 = life(t, 19.0, 23.4, .4, .3);
  drawRich(ctx, '{mink:(0; 1)}', pq[0] + 24, pq[1] + 38, { size: 40, align: 'left', alpha: e1 });
  drawRich(ctx, '{mink:(0; }{my:q}{mink:)}', pq[0] + 24, pq[1] + 38, { size: 40, align: 'left', alpha: e2 });
  // da qui q resta 1: il suo numero sull'asse sta sopra la retta che gira
  // quando la retta è orizzontale (m = 0) l'etichetta scende sotto la retta, per non starci sopra
  const giu = life(t, 49.0, 51.6, .3, .3), su = n1 * (1 - life(t, 47.9, 53.3, .3, .3));
  if (su > 0) { ctx.save(); ctx.globalAlpha *= su; axisLabel(ctx, PL.toS(0, 1), '1', C.y); ctx.restore(); }
  if (giu > 0) { const p1 = PL.toS(0, 1); ctx.save(); ctx.globalAlpha *= giu; axisLabel(ctx, [p1[0], p1[1] + 38], '1', C.y); ctx.restore(); }
  // con m negativo la retta passa sotto, a destra: lì c'è posto
  const e3 = life(t, 56.2, 60.4, .4, .3);
  drawRich(ctx, '{mink:(0; 1)}', pq[0] + 40, pq[1] - 44, { size: 40, align: 'left', alpha: e3 });
  // il punto fermo che fa da perno
  const pul = life(t, 56.2, 60.2, .3, .3) * (.5 + .5 * Math.sin((t - 56.2) * 6));
  if (pul > 0) { ctx.save(); ctx.globalAlpha *= pul * .5; ctx.strokeStyle = css(C.y); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(pq[0], pq[1], 24, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
  // 3 · il passo: Δx a destra, Δy in su
  const passi = kf(t, [[74.6, 1], [76.0, 2]]);
  const sa = life(t, 62.3, FINE, .3, .5);
  if (sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa;
    const A = PL.toS(0, 1), Bx = PL.toS(passi, 1), By = PL.toS(passi, 1 + 2 * passi);
    segmento(ctx, A, Bx, C.x, P(t, 62.4, 63.2));
    segmento(ctx, Bx, By, C.y, P(t, 68.6, 69.4));
    drawRich(ctx, `{mx:Δx}{mink: = ${passi < 1.5 ? 1 : 2}}`, PL.toS(.18, 0)[0], PL.toS(0, .5)[1], { size: 40, align: 'left', alpha: P(t, 63.0, 63.4) * (1 - P(t, 74.6, 74.9)) + P(t, 75.8, 76.2) });
    drawRich(ctx, `{my:Δy}{mink: = ${passi < 1.5 ? 2 : 4}}`, Bx[0] + 22, (Bx[1] + By[1]) / 2, { size: 40, align: 'left', alpha: P(t, 69.2, 69.6) * (1 - P(t, 74.6, 74.9)) + P(t, 75.8, 76.2) });
    ctx.restore();
    dot(ctx, PL.toS(0, 1), C.y, 1, 11);
  }
  ctx.restore();
}

// il riquadro dei numeri
function scenePannello(ctx, t) {
  // 1–2 · y = mx + q con i valori di m e q
  const pa = life(t, 9.0, 62.2, .5, .5);
  if (pa > 0) {
    card(ctx, 1130, 200, 690, 420 + 90 * P(t, 37.6, 38.2), pa);
    ctx.save(); ctx.globalAlpha *= pa;
    conFont(TITOLI, () => drawRich(ctx, 'la retta', 1475, 262, { size: 40, weight: 600 }));
    drawRich(ctx, '{mink:y = }{mv:m}{mx:x}{mink: + }{my:q}', 1475, 360, { size: 64 });
    evidenzia(ctx, 1200, 432, 550, 76, C.v, life(t, 38.3, 60.4, .4, .4));
    evidenzia(ctx, 1200, 512, 550, 76, C.y, life(t, 19.0, 36.6, .4, .4));
    riga(ctx, '{mv:m} =', valore(mAt, t), 470, C.v);
    riga(ctx, '{my:q} =', valore(qAt, t), 550, C.y);
    drawRich(ctx, '{mv:m}{mink::} {v:coefficiente angolare}', 1475, 640, { size: 36, alpha: P(t, 38.3, 38.8) });
    ctx.restore();
  }
  // 3 · il passo e il rapporto
  const pb = life(t, 61.8, FINE + .2, .5, .6);
  if (pb > 0) {
    card(ctx, 1130, 160, 690, 580, pb);
    ctx.save(); ctx.globalAlpha *= pb;
    conFont(TITOLI, () => drawRich(ctx, 'la pendenza', 1475, 222, { size: 40, weight: 600 }));
    const EQ = '{mink:y = }{mv:2}{mx:x}{mink: + }{my:1}';
    // il 2 davanti alla x: è m
    const x2 = 1475 - richW(ctx, EQ, 52) / 2 + richW(ctx, '{mink:y = }', 52), w2 = richW(ctx, '{mv:2}', 52);
    evidenzia(ctx, x2 - 12, 274, w2 + 24, 72, C.v, life(t, 69.6, 74.0, .4, .4));
    drawRich(ctx, EQ, 1475, 310, { size: 52 });
    const due = t > 75.3;
    const ax = P(t, 63.0, 63.4), ay = P(t, 69.2, 69.6), cambio = 1 - P(t, 74.8, 75.3) + P(t, 75.4, 75.9);
    riga(ctx, '{mx:Δx} =', due ? '2' : '1', 405, C.x, ax * cambio);
    riga(ctx, '{my:Δy} =', due ? '4' : '2', 475, C.y, ay * cambio);
    const sep = P(t, 74.6, 75.0);
    if (sep > 0) { ctx.save(); ctx.globalAlpha *= sep; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1180, 530); ctx.lineTo(1770, 530); ctx.stroke(); ctx.restore(); }
    // prima il conto, poi la regola davanti
    // le due metà della riga, messe come le metterebbe drawSeq tutta insieme
    const SX = ['{mv:m}{mink: =}', { num: '{my:Δy}', den: '{mx:Δx}' }, '{mink:=}'], DX = [{ num: '{my:4}', den: '{mx:2}' }, '{mink:= }{mg:2}'];
    const wS = seqW(ctx, SX, 52), wD = seqW(ctx, DX, 52), x0 = 1475 - (wS + wD + 52 * .12) / 2;
    if (t > 75.6) drawSeq(ctx, DX, x0 + wS + 52 * .12 + wD / 2, 640, 52, { local: t - 75.6 });
    if (t > 80.2) drawSeq(ctx, SX, x0 + wS / 2, 640, 52, { local: t - 80.2 });
    ctx.restore();
  }
}

// 4 · in una frase (FINE–96.0)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 94.1, 95.1);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, '{my:q} sposta la retta su e giù,\n{mv:m} decide quanto è {g:ripida}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, '{my:q}: dove taglia l\'asse {my:y}'], [960, '{mv:m} = {my:Δy} / {mx:Δx}'], [1450, '{mv:m} < 0: la retta {r:scende}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 230, 450, 460, 100);
    drawRich(ctx, s, x, 502, { size: 33, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'm e q', durata: 96.0, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 37.4, 'q: dove taglia l\'asse y'], [37.4, 61.8, 'm: quanto è ripida'], [61.8, FINE, 'm è Δy / Δx']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
