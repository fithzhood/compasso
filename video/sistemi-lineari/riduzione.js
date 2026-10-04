'use strict';
/* Il metodo di riduzione — rendo opposti i coefficienti di y moltiplicando i due membri della seconda per 2,
   poi sommo membro a membro e y sparisce; infine la verifica. Argomento: sistemi-lineari (sezione «Il metodo di riduzione»). */
CVIDEO.registra('sistemi-lineari/riduzione', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, glowStroke, card } = M;

// un'equazione in testo ricco: x azzurra, y arancio, il resto in nero; fra [ ] tutto viola (la parte nuova)
function eq(s) {
  let out = '', buf = '', hl = false;
  const flush = () => { if (buf) { out += `{${hl ? 'mv' : 'mink'}:${buf}}`; buf = ''; } };
  for (const ch of s) {
    if (ch === '[') { flush(); hl = true; continue; }
    if (ch === ']') { flush(); hl = false; continue; }
    if (!hl && (ch === 'x' || ch === 'y')) { flush(); out += `{m${ch}:${ch}}`; continue; }
    buf += ch;
  }
  flush(); return out;
}

const FINE = 59.7;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [12.3, 'pensa'], [16.2, 'neutro'], [24.5, 'felice'], [26.5, 'neutro'], [32.9, 'sorpreso'], [34.9, 'neutro'],
  [40.6, 'felice'], [42.6, 'neutro'], [49.5, 'felice'], [52.2, 'festa'], [55.7, 'felice'], [58.0, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.6, 'occhiolino'], [FINE + 6.7, 'felice'],
];
// una frase per ogni passaggio, e solo mentre si vede
const FUMETTI = [
  [2.0, 6.3, 'Si può far sparire un\'incognita\nsommando le due equazioni?'],
  // 1 · coefficienti opposti
  [7.9, 12.2, 'Cerco la coppia ({mx:x}; {my:y}) che rende\nvere {g:le due} equazioni.'],
  [12.3, 16.1, 'Voglio eliminare la {my:y}: ha\ncoefficienti 2 e −1.'],
  [16.2, 20.9, 'Moltiplico per 2 i due membri della\nseconda: con {mink:2 ≠ 0} resta equivalente.'],
  [21.0, 24.4, 'Svolgo i prodotti:\n' + eq('6x − 2y = 14') + '.'],
  [24.5, 28.5, 'Ora i coefficienti di {my:y}\nsono {g:opposti}: +2 e −2.'],
  // 2 · la somma
  [28.6, 32.8, 'Sommo membro a membro: sinistra\ncon sinistra, destra con destra.'],
  [32.9, 36.3, eq('+2y') + ' e ' + eq('−2y') + ' si eliminano.'],
  [36.4, 40.5, eq('x + 6x = 7x') + ' e ' + eq('7 + 14 = 21') + ':\nresta ' + eq('7x = 21') + '.'],
  [40.6, 43.2, 'Divido per 7: ' + eq('x = 3') + '.'],
  [43.3, 46.2, 'Rimetto ' + eq('x = 3') + ' nella prima:\n' + eq('3 + 2y = 7') + '.'],
  [46.3, 49.4, 'Tolgo 3 dai due membri: ' + eq('2y = 4') + '.'],
  [49.5, 52.1, 'Divido per 2: ' + eq('y = 2') + '.'],
  // 3 · soluzione e verifica
  [52.2, 55.6, 'La soluzione è la coppia {g:(3; 2)}.'],
  [55.7, 59.3, 'Verifico: ' + eq('3 + 2 · 2 = 7') + ' e\n' + eq('3 · 3 − 2 = 7') + '. Torna!'],
  // chiusura
  [FINE + 1.0, FINE + 7.7, 'Coefficienti opposti e una somma:\ncosì un\'incognita sparisce.'],
];

// la graffa del sistema, da y0 a y1, con la punta a sinistra in x
function graffa(ctx, x, y0, y1, k = 1, w = 22) {
  if (k <= 0) return;
  const ym = (y0 + y1) / 2, r = Math.min(w, (y1 - y0) / 4), xm = x + w / 2;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x + w, y0); ctx.quadraticCurveTo(xm, y0, xm, y0 + r); ctx.lineTo(xm, ym - r); ctx.quadraticCurveTo(xm, ym, x, ym);
  ctx.quadraticCurveTo(xm, ym, xm, ym + r); ctx.lineTo(xm, y1 - r); ctx.quadraticCurveTo(xm, y1, x + w, y1);
  ctx.stroke(); ctx.restore();
}
function riquadro(ctx, x, y, w, h, al, col) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.roundRect(x, y, w, h, 12);
  ctx.fillStyle = css(col, .15); ctx.fill(); ctx.restore();
}
function spunta(ctx, x, y, k, col) {
  if (k <= 0) return;
  glowStroke(ctx, [[x - 15, y], [x - 4, y + 12], [x + 17, y - 13]], k, col, 6);
}
// una riga di conti: l'equazione a sinistra, la nota grigia a destra
const FS = 44, LX = 110, NX = 850;   // grandezza, margine sinistro e destro dentro la scheda
function riga(ctx, X, s, y, t0, nota) {
  drawRich(ctx, s, X + LX, y, { size: FS, align: 'left', local: t - t0, alpha: P(t, t0 - .1, t0 + .1) });
  if (nota) drawRich(ctx, '{dim:' + nota + '}', X + NX, y, { size: 32, align: 'right', alpha: P(t, t0 + .2, t0 + .6) });
}
let t = 0;   // il tempo del fotogramma, per riga()
const SOL = '{mink:(}{mx:x}{mink:; }{my:y}{mink:) = }{mg:(3; 2)}';
const Y1 = 240, Y2 = 300;   // le due righe del sistema
const E1 = eq('x + 2y = 7'), E2 = eq('3x − y = 7');

const EB = eq('6x − 2y = 14');

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il metodo di riduzione', W / 2, 180, { size: 110, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// una scheda sola: a sinistra il sistema e la moltiplicazione, a destra la somma e i conti (7.9–FINE)
const X0 = 50, X1 = 960;
function barra(ctx, a, w, y, k) {   // una barra rossa che cancella un termine
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a - 4, y + 16); ctx.lineTo(a - 4 + (w + 8) * k, y + 16 - 32 * k); ctx.stroke(); ctx.restore();
}
// una riga della somma in colonna: termine in x, termine in y, uguale, termine noto
const CA = 90, CB = 112, CE = 262, CD = 300;
function colonna(ctx, b0, xt, op, rhs, y, t0) {
  const al = P(t, t0 - .1, t0 + .1);
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, eq(xt), b0 + CA, y, { size: FS, align: 'right' });
  if (op) drawRich(ctx, eq(op), b0 + CB, y, { size: FS, align: 'left' });
  drawRich(ctx, '{mink:=}', b0 + CE, y, { size: FS });
  drawRich(ctx, eq(rhs), b0 + CD, y, { size: FS, align: 'left' });
  ctx.restore();
}
function sceneRiduzione(ctx, tt) {
  t = tt;
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 7.9, FINE + .2, .6, .7);
  card(ctx, X0, 110, 1820, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'riduzione', 960, 165, { size: 40, weight: 600 }));
  const a0 = X0 + LX, b0 = X1 + LX;
  // la riga che divide le due colonne
  ctx.save(); ctx.globalAlpha *= P(t, 28.6, 29.0); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(X1 - 20, 215); ctx.lineTo(X1 - 20, 760); ctx.stroke(); ctx.restore();
  // i coefficienti di y: 2 e −1, poi +2 e −2
  const h1 = life(t, 12.3, 16.1, .4, .4), h2 = life(t, 24.6, 28.5, .4, .4);
  const o2y = richW(ctx, eq('x + '), FS), w2y = richW(ctx, eq('2y'), FS);
  riquadro(ctx, a0 + o2y - 8, Y1 - 28, w2y + 22, 56, h1, C.v);
  riquadro(ctx, a0 + o2y - 8, Y1 - 28, w2y + 22, 56, h2, C.g);
  const omy = richW(ctx, eq('3x '), FS), wmy = richW(ctx, eq('− y'), FS);
  riquadro(ctx, a0 + omy - 8, Y2 - 28, wmy + 22, 56, h1, C.v);
  const om2 = richW(ctx, eq('6x '), FS), wm2 = richW(ctx, eq('− 2y'), FS);
  riquadro(ctx, a0 + om2 - 8, 450 - 28, wm2 + 22, 56, h2, C.g);
  // sinistra: il sistema, la seconda per 2, i prodotti svolti
  graffa(ctx, a0 - 42, Y1 - 36, Y2 + 36, P(t, 8.2, 8.8));
  riga(ctx, X0, E1, Y1, 8.4); riga(ctx, X0, E2, Y2, 8.8);
  riga(ctx, X0, eq('2 · (3x − y) = 2 · 7'), 385, 16.5, 'la seconda per 2');
  riga(ctx, X0, EB, 450, 21.2, 'svolgo i prodotti');
  // destra: la somma membro a membro, ogni termine nella sua colonna
  colonna(ctx, b0, 'x', '+ 2y', '7', Y1, 28.8); colonna(ctx, b0, '6x', '− 2y', '14', Y2, 29.1);
  drawRich(ctx, '{mink:+}', b0 - 46, Y2, { size: FS, alpha: P(t, 29.4, 29.7) });
  const kb = P(t, 29.6, 30.2);
  if (kb > 0) {
    const wb = CD + 80;
    ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(b0 - 60, Y2 + 40); ctx.lineTo(b0 - 60 + (wb + 60) * kb, Y2 + 40); ctx.stroke(); ctx.restore();
  }
  // +2y e −2y si eliminano
  barra(ctx, b0 + CB, richW(ctx, eq('+ 2y'), FS), Y1, P(t, 33.0, 33.3));
  barra(ctx, b0 + CB, richW(ctx, eq('− 2y'), FS), Y2, P(t, 33.2, 33.5));
  // x + 6x = 7x e 7 + 14 = 21, poi il resto dei conti
  riga(ctx, X1, eq('x + 6x = 7x') + '{mink:,   }' + eq('7 + 14 = 21'), 395, 36.5);
  colonna(ctx, b0, '7x', '', '21', 450, 37.4);
  riga(ctx, X1, '{mx:x}{mink: = }{mg:3}', 505, 40.8);
  riga(ctx, X1, eq('3 + 2y = 7'), 565, 43.5, 'nella prima');
  riga(ctx, X1, eq('2y = 4'), 620, 46.5);
  riga(ctx, X1, '{my:y}{mink: = }{mg:2}', 675, 49.7);
  drawRich(ctx, SOL, b0, 740, { size: 46, align: 'left', local: t - 52.4, alpha: P(t, 52.3, 52.5) });
  // la verifica, accanto alle due equazioni di partenza
  if (t > 55.8) {
    drawRich(ctx, eq('3 + 2 · 2 = 7'), X0 + 440, Y1, { size: 40, align: 'left', local: t - 55.9 });
    spunta(ctx, X0 + 800, Y1 + 2, P(t, 56.3, 56.7), C.g);
    drawRich(ctx, eq('3 · 3 − 2 = 7'), X0 + 440, Y2, { size: 40, align: 'left', local: t - 56.5 });
    spunta(ctx, X0 + 800, Y2 + 2, P(t, 56.9, 57.3), C.g);
  }
  ctx.restore();
}

// 4 · in una frase (FINE–FINE + 10.6)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Coefficienti opposti, poi la somma\nmembro a membro: un\'incognita {g:sparisce}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[405, '{v:moltiplico} per 2\ni due membri della seconda'], [960, '{v:sommo}\nmembro a membro'], [1515, 'la soluzione\n{g:(3; 2)}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 265, 450, 530, 140);
    drawRich(ctx, s, x, 520, { size: 34, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il metodo di riduzione', durata: FINE + 10.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 28.5, 'coefficienti opposti'], [28.5, 52.1, 'la somma membro a membro'], [52.1, FINE, 'la soluzione e la verifica']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRiduzione(ctx, t); sceneFine(ctx, t); },
  };
});
