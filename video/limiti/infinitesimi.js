'use strict';
/* Chi arriva prima a zero — x, x² e x³ tendono tutti a 0; ingrandendo vicino a 0 la retta resta uguale e la
   parabola si schiaccia (a x = 0,1 x² vale 0,01, a x = 0,01 vale 0,0001); x²/x = x → 0: ordine superiore;
   nel limite di (sin x + x²)/x il termine x² sparisce. Argomento: limiti. */
CVIDEO.registra('limiti/infinitesimi', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, richW, drawSeq, drawLim,
    dot, glowStroke, arrowHead, card } = M;

const FINE = 88.0, DUR = 99.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [25.2, 'sorpreso'], [27.4, 'neutro'], [38.6, 'sorpreso'], [40.8, 'neutro'],
  [52.6, 'felice'], [54.8, 'neutro'], [62.8, 'pensa'], [67.4, 'neutro'], [74.2, 'felice'], [76.4, 'neutro'],
  [83.2, 'festa'], [FINE, 'neutro'], [90.4, 'felice'], [95.4, 'occhiolino'],
];
// una frase per ogni cosa che succede; mentre Ada parla di uno stato, il grafico sta fermo
const FUMETTI = [
  [2.4, 6.4, 'Tre funzioni vanno tutte a 0:\nquale ci arriva prima?'],
  // 1 · tre infinitesimi
  [7.9, 11.6, 'Eccole: {my:y = x}, {mv:y = x²}\ne {mdim:y = x³}.'],
  [11.8, 16.6, 'Per {mx:x}{mink: → 0} tendono tutte a 0:\nsi chiamano {v:infinitesimi}.'],
  [16.8, 20.4, 'Con {mx:x}{mink: = 1} valgono tutte 1.'],
  [20.6, 25.0, 'Ingrandisco dieci volte: ora {mx:x}\nva da 0 a {mink:0,1}.'],
  [25.2, 29.6, 'La retta resta uguale, ma la\nparabola si {v:schiaccia} verso l’asse.'],
  [29.8, 34.2, 'In {mx:x}{mink: = 0,1}, {mx:x}{mink:²} vale {mv:0,01}:\ndieci volte meno di {mx:x}.'],
  [34.4, 38.4, 'Ingrandisco ancora: da 0 a {mink:0,01}.'],
  [38.6, 43.4, 'In {mx:x}{mink: = 0,01}, {mx:x}{mink:²} vale {mv:0,0001}:\ncento volte meno di {mx:x}.'],
  [43.6, 47.8, 'Vicino a 0, {mx:x}{mink:²} diventa piccolissimo\nanche rispetto a {mx:x}.'],
  // 2 · il rapporto
  [48.2, 52.4, 'Per confrontarli divido:\n{mx:x}{mink:² / }{mx:x}{mink: = }{mx:x}.'],
  [52.6, 57.4, 'Il rapporto tende a 0: {mx:x}{mink:²} è\ndi {v:ordine superiore} rispetto a {mx:x}.'],
  [57.6, 62.2, 'Anche {mx:x}{mink:³} è di ordine superiore\na {mx:x}: {mx:x}{mink:³ / }{mx:x}{mink: = }{mx:x}{mink:²} tende a 0.'],
  // 3 · nei limiti
  [62.8, 67.2, 'A che cosa serve? A questo limite,\nper {mx:x}{mink: → 0}.'],
  [67.4, 70.4, 'Sostituendo esce {r:0/0}.'],
  [70.6, 74.0, 'Divido la frazione in due pezzi.'],
  [74.2, 78.2, 'Il primo tende a {g:1}:\nè il limite notevole.'],
  [78.4, 83.0, 'Il secondo tende a 0: {mx:x}{mink:²} è di\nordine superiore a {mx:x}.'],
  [83.2, 87.6, 'Il limite è {mink:1 + 0 = }{mg:1}: il\ntermine {mx:x}{mink:²} non conta.'],
  // chiusura
  [90.4, 96.8, 'Chi va a 0 più in fretta è di ordine\nsuperiore: sommato all’altro sparisce.'],
];

// ---------- 1 · il grafico che si ingrandisce ----------
const LC = [150, 110, 800, 690], RC = [1010, 110, 850, 690];
const O = [290, 710], U = 520;
const S = (X, Y) => [O[0] + X * U, O[1] - Y * U];
// ingrandimento: e = 0, 1, 2 → la finestra va da 0 a 1, 0,1, 0,01 su tutti e due gli assi (z = 10^−e)
const ZE = t => kf(t, [[21.0, 0], [23.4, 1], [34.6, 1], [37.0, 2]]);
// in coordinate della finestra: X = x/z, e la curva y = xⁿ diventa Y = zⁿ⁻¹ · Xⁿ
function curva(z, n) { const pts = []; for (let i = 0; i <= 140; i++) { const X = 1.1 * i / 140; pts.push(S(X, Math.pow(z, n - 1) * Math.pow(X, n))); } return pts; }
const COL = () => [C.y, C.v, C.dim];
const NOMI = ['{my:y = x}', '{mv:y = x²}', '{mdim:y = x³}'];
const T_CURVA = [8.4, 9.2, 10.0];
function seg(ctx, a, b, col, w, al = 1, trat) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (trat) ctx.setLineDash(trat);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  const xa = S(-.04, 0), xb = S(lerp(-.04, 1.12, k), 0), ya = S(0, -.04), yb = S(0, lerp(-.04, 1.1, k));
  ctx.beginPath(); ctx.moveTo(xa[0], xa[1]); ctx.lineTo(xb[0], xb[1]); ctx.moveTo(ya[0], ya[1]); ctx.lineTo(yb[0], yb[1]); ctx.stroke();
  arrowHead(ctx, [xb[0] + 6, xb[1]], 0, C.ink); arrowHead(ctx, [yb[0], yb[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', S(1.12, 0)[0] + 36, O[1], { size: 44 });
  drawRich(ctx, '{my:y}', O[0] - 34, S(0, 1.1)[1], { size: 44 });
  txt(ctx, '0', O[0] - 26, O[1] + 30, { size: 30, color: C.dim });
  // la finestra: tacca e griglia tratteggiata in X = 1 e Y = 1
  seg(ctx, S(1, 0), S(1, 1.06), C.dim, 2, .5, [8, 8]);
  seg(ctx, S(0, 1), S(1.06, 1), C.dim, 2, .5, [8, 8]);
  seg(ctx, S(1, 0), [S(1, 0)[0], O[1] + 12], C.ink, 3);
  seg(ctx, S(0, 1), [O[0] - 12, S(0, 1)[1]], C.ink, 3);
  ctx.restore();
}
// il numero sulle due tacche: 1, poi 0,1, poi 0,01 (sparisce durante l'ingrandimento)
function tacche(ctx, t, k) {
  const st = [['1', P(t, 8.4, 8.9) * (1 - P(t, 20.7, 21.0))], ['0,1', P(t, 23.4, 23.8) * (1 - P(t, 34.4, 34.7))], ['0,01', P(t, 37.0, 37.4)]];
  st.forEach(([s, a]) => {
    if (a * k <= 0) return;
    txt(ctx, s, S(1, 0)[0], O[1] + 42, { size: 40, weight: 600, alpha: a * k });
    txt(ctx, s, O[0] - 22, S(0, 1)[1], { size: 40, weight: 600, align: 'right', alpha: a * k });
  });
}
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > 62.8) return;
  const al = 1 - P(t, 62.0, 62.6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LC, P(t, 7.5, 8.1));
  const ka = P(t, 7.7, 8.7);
  assi(ctx, ka);
  tacche(ctx, t, ka);
  const z = Math.pow(10, -ZE(t));
  // le tre curve, tagliate sulla scheda
  ctx.save(); ctx.beginPath(); ctx.rect(LC[0] + 8, LC[1] + 14, LC[2] - 16, LC[3] - 22); ctx.clip();
  [2, 1, 0].forEach(i => glowStroke(ctx, curva(z, i + 1), P(t, T_CURVA[i], T_CURVA[i] + .9), COL()[i], i ? 5 : 6));
  ctx.restore();
  // la legenda, in alto a sinistra (lì le curve non passano mai)
  NOMI.forEach((s, i) => {
    const k = P(t, T_CURVA[i] + .2, T_CURVA[i] + .6); if (k <= 0) return;
    const y = 268 + i * 60;
    seg(ctx, [330, y], [380, y], COL()[i], 6, k);
    drawRich(ctx, s, 396, y, { size: 40, align: 'left', alpha: k });
  });
  // «tendono a 0»: tre punti scendono lungo le curve verso l'origine
  const ks = life(t, 12.1, 16.4, .3, .4);
  if (ks > 0) {
    const X = kf(t, [[12.3, 1], [15.2, .04]]);
    [2, 1, 0].forEach(i => dot(ctx, S(X, Math.pow(X, i + 1)), COL()[i], ks, 10));
  }
  // i punti in x = z (X = 1): le righe della tabella
  const kp = P(t, 16.9, 17.3);
  if (kp > 0) {
    seg(ctx, S(1, 0), S(1, 1), C.x, 3, .7 * kp, [6, 7]);
    const ev = Math.max(life(t, 29.8, 34.2, .3, .3), life(t, 38.6, 43.4, .3, .3));
    [2, 1, 0].forEach(i => dot(ctx, S(1, Math.pow(z, i)), COL()[i], kp * (i === 1 ? 1 + .35 * ev : 1), i ? 10 : 11));
  }
  ctx.restore();
}

// ---------- la tabella (1) e il rapporto (2) ----------
const XC = [1140, 1400, 1690], YR = [262, 338, 414];
const RIGHE = [[17.2, ['1', '1', '1'], '1'], [29.9, ['0,1', '0,01', '0,001'], '0,1'], [38.7, ['0,01', '0,0001', '0,000001'], '0,01']];
function sceneTabella(ctx, t) {
  const ca = life(t, 16.6, 62.6, .5, .6);
  if (ca <= 0) return;
  card(ctx, ...RC, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const kOut = 1 - P(t, 48.3, 48.7);            // la colonna di x³ lascia il posto al rapporto x²/x
  drawRich(ctx, '{mx:x}', XC[0], 172, { size: 44 });
  drawRich(ctx, '{mx:x}{mink:²}', XC[1], 172, { size: 44 });
  drawRich(ctx, '{mx:x}{mink:³}', XC[2], 172, { size: 44, alpha: kOut });
  drawRich(ctx, '{mx:x}{mink:² / }{mx:x}', XC[2], 172, { size: 42, alpha: P(t, 48.8, 49.2) });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1050, 208); ctx.lineTo(1820, 208); ctx.stroke();
  RIGHE.forEach(([a, v, r], i) => {
    const k = P(t, a, a + .45, E.out); if (k <= 0) return;
    txt(ctx, v[0], XC[0], YR[i], { size: 44, color: C.x, alpha: k });
    txt(ctx, v[1], XC[1], YR[i], { size: 44, color: C.v, alpha: k });
    txt(ctx, v[2], XC[2], YR[i], { size: 44, alpha: k * kOut });
    const kr = P(t, 49.0 + i * .3, 49.4 + i * .3, E.out);
    if (kr > 0) txt(ctx, r, XC[2], YR[i], { size: 44, weight: i === 2 ? 600 : 500, color: i === 2 ? C.g : C.ink, alpha: kr });
  });
  // la casella di x² di cui Ada sta parlando
  [[1, 29.8, 34.2], [2, 38.6, 43.4]].forEach(([i, a, b]) => {
    const k = life(t, a, b, .3, .3); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(XC[1] - 112, YR[i] - 32, 224, 64, 14); ctx.stroke(); ctx.restore();
  });
  // 2 · il limite del rapporto e il nome
  const k2 = P(t, 52.7, 53.1);
  if (k2 > 0) {
    ctx.beginPath(); ctx.moveTo(1050, 462); ctx.lineTo(1820, 462); ctx.stroke();
    drawLim(ctx, '{mx:x}{mink:→0}', '{mx:x}{mink:² / }{mx:x}{mink: = }{mg:0}', 1435, 528, { size: 56, local: t - 52.7 });
  }
  drawRich(ctx, '{mx:x}{mink:²} è di {v:ordine superiore} rispetto a {mx:x}', 1435, 636, { size: 40, local: t - 54.0 });
  drawRich(ctx, '{mx:x}{mink:³ / }{mx:x}{mink: = }{mx:x}{mink:² → 0}', 1435, 730, { size: 44, local: t - 57.8 });
  ctx.restore();
}

// ---------- 3 · il termine che sparisce ----------
// centri degli elementi di una riga di drawSeq (stessi conti del motore), per scriverci sotto
const KM = '"KaTeX_Main", Cambria, Georgia, serif';
function centri(ctx, items, cx, size) {
  ctx.save(); ctx.font = `${Math.round(size * 1.12)}px ${KM}`; const lw = ctx.measureText('lim').width; ctx.restore();
  const ws = items.map(it => typeof it === 'string' ? richW(ctx, it, size) : it.lim ? lw + size * .4 : Math.max(richW(ctx, it.num, size), richW(ctx, it.den, size)) + size * .35);
  const gap = size * .12, tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - tot / 2; const out = [];
  ws.forEach(w => { out.push(x + w / 2); x += w + gap; });
  return out;
}
const LIM = { lim: '{mx:x}{mink:→0}' };
const R1 = [LIM, { num: '{mink:sin }{mx:x}{mink: + }{mx:x}{mink:²}', den: '{mx:x}' }];
const R2 = ['{mink:=}', LIM, { num: '{mink:sin }{mx:x}', den: '{mx:x}' }, '{mink:+}', LIM, { num: '{mx:x}{mink:²}', den: '{mx:x}' }];
function sceneLimite(ctx, t) {
  if (t < 62.4 || t > FINE + .4) return;
  const al = life(t, 62.6, FINE + .3, .5, .6);
  card(ctx, 210, 120, 1500, 660, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawSeq(ctx, R1, 960, 222, 64, { local: t - 63.0 });
  drawSeq(ctx, ['{dim:sostituendo:  }', { num: '{mr:0}', den: '{mr:0}', bar: C.r }], 960, 362, 48, { local: t - 67.6 });
  drawSeq(ctx, R2, 960, 505, 60, { local: t - 70.8 });
  const c = centri(ctx, R2, 960, 60);
  drawRich(ctx, '{mink:→ }{mg:1}', c[2], 620, { size: 48, local: t - 74.3 });
  drawRich(ctx, '{mink:→ 0}', c[5], 620, { size: 48, local: t - 78.5 });
  drawRich(ctx, '{mink:= 1 + 0 = }{mg:1}', 960, 728, { size: 60, local: t - 83.3 });
  ctx.restore();
}

// 0 · titolo (0–7,5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Chi arriva prima a zero', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un infinitesimo è di {v:ordine superiore}\nse, diviso per l’altro, tende a 0.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[400, '{dim:il rapporto}'], [960, '{dim:quindi}'], [1520, '{dim:nei limiti}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 250, 445, 500, 200);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawLim(ctx, '{mx:x}{mink:→0}', '{mx:x}{mink:² / }{mx:x}{mink: = 0}', x, 556, { size: 48 });
    if (i === 1) drawRich(ctx, '{mx:x}{mink:²} è di ordine\nsuperiore a {mx:x}', x, 568, { size: 40, lh: 1.25 });
    if (i === 2) drawSeq(ctx, [R1[1], '{mink:→ }{mg:1}'], x, 568, 40);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza delle curve e dei punti; il ding del limite 1 lo mette la faccia «festa»
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7],                                           // la scheda e gli assi
    ['tono', 8.4, 9.3, [0, .25, .5, .75, 1]],                                         // y = x
    ['tono', 9.2, 10.1, [0, .06, .25, .56, 1]],                                       // y = x²
    ['tono', 10.0, 10.9, [0, .02, .12, .42, 1]],                                      // y = x³
    ['tono', 12.3, 15.2, [.9, .7, .4, .15, .02]],                                     // i punti scendono verso 0
    ['soffio', 16.6], ['traccia', 16.9, 17.3], ['pop', 17.2, .5],                     // la tabella, x = 1
    ['tono', 21.0, 23.4, [.9, .5, .25, .1]],                                          // ingrandisco: x² si schiaccia
    ['pop', 29.9, .45],                                                               // x = 0,1
    ['tono', 34.6, 37.0, [.1, .05, .02, .01]],                                        // ingrandisco ancora
    ['pop', 38.7, .4],                                                                // x = 0,01
    ['soffio', 48.3], ['pop', 49.0, .6], ['pop', 49.3, .45], ['pop', 49.6, .3],       // il rapporto: 1, 0,1, 0,01
    ['ding', 53.0], ['pop', 54.1, .6], ['pop', 57.9, .5],                             // tende a 0: ordine superiore
    ['soffio', 62.6], ['pop', 63.1, .5], ['pop', 67.7, .2],                           // il limite; 0/0
    ['pop', 70.9, .5], ['pop', 72.0, .55],                                            // i due pezzi
    ['ding', 74.4], ['pop', 78.6, .3], ['pop', 83.4, .7],                             // → 1, → 0, = 1
    ['soffio', FINE + .4], ['pop', FINE + 2.3, .5], ['pop', FINE + 2.8, .6], ['pop', FINE + 3.3, .7],
  ];
  return {
    titolo: 'Chi arriva prima a zero', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 47.9, 'tre infinitesimi'], [47.9, 62.4, 'il rapporto'], [62.4, FINE, 'nei limiti']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneTabella(ctx, t); sceneLimite(ctx, t); sceneFine(ctx, t); },
  };
});
