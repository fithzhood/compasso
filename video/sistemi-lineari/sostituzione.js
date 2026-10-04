'use strict';
/* Il metodo di sostituzione — un sistema risolto passo per passo ricavando y dalla seconda equazione e
   sostituendola nella prima, poi la verifica. Argomento: sistemi-lineari (sezione «Il metodo di sostituzione»). */
CVIDEO.registra('sistemi-lineari/sostituzione', M => {
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

const FINE = 46.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [12.6, 'felice'], [14.6, 'neutro'], [32.6, 'felice'], [34.6, 'neutro'], [38.6, 'festa'], [42.0, 'felice'], [44.1, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.6, 'occhiolino'], [FINE + 6.7, 'felice'],
];
// una frase per ogni passaggio, e solo mentre si vede
const FUMETTI = [
  [2.0, 6.3, 'Come si risolve un sistema\ncon due incognite?'],
  // 1 · sostituzione
  [7.9, 12.5, 'Cerco la coppia ({mx:x}; {my:y}) che rende\nvere {g:le due} equazioni.'],
  [12.6, 15.2, 'Uso la {v:sostituzione}.'],
  [15.3, 19.3, 'Nella seconda la {my:y} ha coefficiente −1:\nla ricavo, ' + eq('y = 3x − 7') + '.'],
  [19.4, 23.4, 'Nella {g:prima} scrivo ' + eq('3x − 7') + '\nal posto di {my:y}, tra parentesi.'],
  [23.5, 26.5, 'Tolgo la parentesi:\n' + eq('2 · (3x − 7) = 6x − 14') + '.'],
  [26.6, 29.4, 'Sommo ' + eq('x') + ' e ' + eq('6x') + ': ' + eq('7x − 14 = 7') + '.'],
  [29.5, 32.5, 'Aggiungo 14 ai due membri:\n' + eq('7x = 21') + '.'],
  [32.6, 35.2, 'Divido per 7: ' + eq('x = 3') + '.'],
  [35.3, 38.5, 'Rimetto ' + eq('x = 3') + ' in ' + eq('y = 3x − 7') + ':\n' + eq('y = 3 · 3 − 7 = 2') + '.'],
  [38.6, 41.9, 'La soluzione è la coppia {g:(3; 2)}.'],
  // 2 · la verifica
  [42.0, 45.6, 'Verifico: ' + eq('3 + 2 · 2 = 7') + ' e\n' + eq('3 · 3 − 2 = 7') + '. Torna!'],
  // chiusura
  [FINE + 1.0, FINE + 7.7, 'Da due incognite a una sola,\npoi si torna indietro per l\'altra.'],
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

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il metodo di sostituzione', W / 2, 180, { size: 104, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · la sostituzione, in una scheda sola (7.9–FINE)
function sceneSostituzione(ctx, tt) {
  t = tt;
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 7.9, FINE + .2, .6, .7), X = 515;
  card(ctx, X, 110, 890, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, 'il sistema', X + 445, 165, { size: 40, weight: 600, alpha: 1 - P(t, 12.7, 13.0) });
    drawRich(ctx, 'sostituzione', X + 445, 165, { size: 40, weight: 600, alpha: P(t, 12.9, 13.2) });
  });
  // la riga da cui si ricava, poi quella in cui si sostituisce
  riquadro(ctx, X + LX - 12, Y2 - 32, richW(ctx, E2, FS) + 24, 64, life(t, 15.3, 19.3, .4, .4), C.v);
  riquadro(ctx, X + LX - 12, Y1 - 32, richW(ctx, E1, FS) + 24, 64, life(t, 19.4, 23.3, .4, .4), C.v);
  graffa(ctx, X + LX - 42, Y1 - 36, Y2 + 36, P(t, 8.2, 8.8));
  riga(ctx, X, E1, Y1, 8.4); riga(ctx, X, E2, Y2, 8.8);
  riga(ctx, X, eq('y = 3x − 7'), 372, 15.5, 'dalla seconda');
  riga(ctx, X, eq('x + 2 · [(3x − 7)] = 7'), 432, 19.6, 'nella prima');
  riga(ctx, X, eq('x + 6x − 14 = 7'), 490, 23.6);
  riga(ctx, X, eq('7x − 14 = 7'), 548, 26.8);
  riga(ctx, X, eq('7x = 21') + '{mink:,}', 606, 29.8);
  drawRich(ctx, '{mx:x}{mink: = }{mg:3}', X + LX + richW(ctx, eq('7x = 21, '), FS) + 8, 606, { size: FS, align: 'left', local: t - 32.8, alpha: P(t, 32.7, 32.9) });
  riga(ctx, X, eq('y = 3 · 3 − 7 = ') + '{mg:2}', 666, 35.5);
  // la soluzione
  drawRich(ctx, SOL, X + LX, 730, { size: 46, align: 'left', local: t - 38.8, alpha: P(t, 38.7, 38.9) });
  // la verifica, accanto alle due equazioni di partenza
  if (t > 42.1) {
    drawRich(ctx, eq('3 + 2 · 2 = 7'), X + 440, Y1, { size: 40, align: 'left', local: t - 42.2 });
    spunta(ctx, X + 800, Y1 + 2, P(t, 42.6, 43.0), C.g);
    drawRich(ctx, eq('3 · 3 − 2 = 7'), X + 440, Y2, { size: 40, align: 'left', local: t - 42.8 });
    spunta(ctx, X + 800, Y2 + 2, P(t, 43.2, 43.6), C.g);
  }
  ctx.restore();
}

// 3 · in una frase (FINE–FINE + 10.6)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ricavo un\'incognita, la sostituisco\nnell\'altra equazione e risolvo.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[405, '{v:ricavo} la {my:y}\ndalla seconda equazione'], [960, '{v:sostituisco} nella prima:\nresta solo la {mx:x}'], [1515, 'la soluzione\n{g:(3; 2)}']];
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
    titolo: 'Il metodo di sostituzione', durata: FINE + 10.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 23.4, 'ricavo e sostituisco'], [23.4, FINE, 'risolvo e verifico']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSostituzione(ctx, t); sceneFine(ctx, t); },
  };
});
