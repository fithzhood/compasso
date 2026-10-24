'use strict';
/* Se piove, prendo l'ombrello — l'implicazione p ⇒ q con la promessa «se piove, prendo l'ombrello»: le quattro righe
   della tavola di verità, una alla volta col disegno del caso; l'unica riga falsa è «piove e niente ombrello» (V, F);
   quando p è falsa l'implicazione è vera qualunque sia q: dal falso segue qualunque cosa. Argomento: insiemi-logica. */
CVIDEO.registra('insiemi-logica/implicazione', M => {
  const { W, C, E, P, life, kf, css, mix, TITOLI, conFont, drawRich, txt, card, crossMark } = M;

const FINE = 70.4, DUR = 81.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [25.0, 'felice'], [27.1, 'neutro'], [30.0, 'sorpreso'], [32.1, 'neutro'], [39.1, 'felice'], [41.2, 'neutro'],
  [49.3, 'sorpreso'], [51.4, 'neutro'], [54.5, 'pensa'], [56.6, 'neutro'], [64.7, 'occhiolino'], [66.8, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.6, '«Se piove, prendo l’ombrello»:\nquando questa promessa è falsa?'],
  // 1 · la promessa
  [7.9, 12.9, 'La frase ha due pezzi: {mx:p} è «piove»,\n{my:q} è «prendo l’ombrello».'],
  [13.1, 18.1, '«Se {mx:p}, allora {my:q}» si scrive {mx:p}{mv: ⇒ }{my:q}:\nè un’{v:implicazione}.'],
  [18.3, 23.3, 'Ogni pezzo può essere {g:vero} o {r:falso}:\nin tutto, {v:4 casi}.'],
  // 2 · i quattro casi
  [23.7, 28.5, 'Piove e prendo l’ombrello:\nla promessa è {g:mantenuta}.'],
  [28.7, 33.5, 'Piove e {r:niente ombrello}:\nla promessa è {r:tradita}.'],
  [33.7, 38.5, 'Non piove, ma prendo l’ombrello\nlo stesso.'],
  [38.7, 43.9, 'La promessa parla solo della pioggia:\n{g:non è tradita}, quindi è vera.'],
  [44.1, 48.9, 'Non piove e niente ombrello:\nanche qui {g:nessuna bugia}.'],
  [49.1, 54.1, 'Un solo {r:F} in tutta la colonna:\n{mx:p}{mv: ⇒ }{my:q} è falsa {r:solo} qui.'],
  // 3 · dal falso
  [54.3, 59.5, 'Quando {mx:p} è falsa, {mx:p}{mv: ⇒ }{my:q} è {g:vera},\nqualunque cosa valga {my:q}.'],
  [59.7, 64.3, 'Si dice: dal falso segue\n{v:qualunque cosa}.'],
  [64.5, 69.8, 'Chi promette non mente\nfinché non piove.'],
  // chiusura
  [FINE + 2.2, DUR - 2.6, 'Solo «piove e niente ombrello»\nsmentisce la promessa.'],
];

// ---------- i disegni ----------
function nuvola(ctx, x, y, al) {
  if (al <= 0.002) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = css(C.dim, .6);
  ctx.beginPath(); ctx.arc(x - 52, y + 6, 40, 0, 2 * Math.PI); ctx.arc(x + 4, y - 18, 54, 0, 2 * Math.PI); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 56, y + 8, 38, 0, 2 * Math.PI); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x - 92, y + 4, 186, 44, 22); ctx.fill();
  // le gocce
  ctx.strokeStyle = css(C.x); ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) {
    const gx = x - 64 + 32 * i, gy = y + 72 + (i % 2) * 18;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx - 8, gy + 24); ctx.stroke();
  }
  ctx.restore();
}
function sole(ctx, x, y, al) {
  if (al <= 0.002) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = css(C.y); ctx.beginPath(); ctx.arc(x, y, 44, 0, 2 * Math.PI); ctx.fill();
  ctx.strokeStyle = css(C.y); ctx.lineWidth = 7; ctx.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    ctx.beginPath(); ctx.moveTo(x + 60 * Math.cos(a), y + 60 * Math.sin(a)); ctx.lineTo(x + 84 * Math.cos(a), y + 84 * Math.sin(a)); ctx.stroke();
  }
  ctx.restore();
}
function ombrello(ctx, x, y, al) {
  if (al <= 0.002) return;
  const r = 92;
  ctx.save(); ctx.globalAlpha *= al;
  // il manico
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y - r - 14); ctx.lineTo(x, y + 86); ctx.arc(x - 17, y + 86, 17, 0, Math.PI); ctx.stroke();
  // la tela: mezzo cerchio con il bordo a festoni
  ctx.fillStyle = css(C.v);
  ctx.beginPath(); ctx.moveTo(x - r, y); ctx.arc(x, y, r, Math.PI, 2 * Math.PI);
  for (let i = 0; i < 4; i++) { const x1 = x + r - 2 * r * (i + 1) / 4; ctx.quadraticCurveTo((x1 + x + r - 2 * r * i / 4) / 2, y - 22, x1, y); }
  ctx.fill();
  ctx.restore();
}

// ---------- 1 · il caso, a sinistra ----------
const LC = [130, 110, 860, 690], IX = 280, YP = 300, YQ = 575, LX = 410;
// che cosa si vede: pioggia (1) o sole (0); ombrello sì (0) o no (1); «qualunque» (1)
const kPioggia = t => kf(t, [[33.2, 1], [33.7, 0], [49.2, 0], [49.8, 1], [54.4, 1], [55.0, 0]]);
const kNo = t => kf(t, [[28.9, 0], [29.5, 1], [33.2, 1], [33.7, 0], [44.2, 0], [44.8, 1]]);
const kQual = t => P(t, 54.4, 55.0);
function sceneCaso(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LC, P(t, 7.5, 8.2));
  // il tempo
  const kp = kPioggia(t), s1 = P(t, 8.2, 8.8, E.back);
  if (s1 > 0) {
    ctx.save(); ctx.translate(IX, YP); ctx.scale(s1, s1); ctx.translate(-IX, -YP);
    nuvola(ctx, IX, YP - 20, kp); sole(ctx, IX, YP, 1 - kp);
    ctx.restore();
  }
  drawRich(ctx, '{mx:p}{mink: = }«piove»', LX, YP - 38, { size: 44, align: 'left', local: t - 8.6 });
  const kv = P(t, 9.0, 9.4);
  drawRich(ctx, '{g:vero}', LX, YP + 38, { size: 44, weight: 600, align: 'left', alpha: kv * P(kp, .5, 1) });   // prima esce una parola, poi entra l'altra
  drawRich(ctx, '{r:falso}', LX, YP + 38, { size: 44, weight: 600, align: 'left', alpha: kv * P(1 - kp, .5, 1) });
  // l'ombrello
  const kn = kNo(t), kq = kQual(t), s2 = P(t, 10.4, 11.0, E.back);
  if (s2 > 0) {
    ctx.save(); ctx.translate(IX, YQ); ctx.scale(s2, s2); ctx.translate(-IX, -YQ);
    const kOmb = 1 - .72 * Math.max(kn * (1 - kq), kq);
    ombrello(ctx, IX, YQ - 10, kOmb);
    crossMark(ctx, IX, YQ, P(kn, .3, 1) * (1 - kq), C.r, .95);
    drawRich(ctx, '{my:?}', IX, YQ - 30, { size: 90, weight: 600, alpha: kq });
    ctx.restore();
  }
  drawRich(ctx, '{my:q}{mink: = }«prendo l’ombrello»', LX, YQ - 38, { size: 40, align: 'left', local: t - 10.8 });
  const kw = P(t, 11.2, 11.6), kVero = (1 - kn) * (1 - kq), kFalso = kn * (1 - kq);
  drawRich(ctx, '{g:vero}', LX, YQ + 38, { size: 44, weight: 600, align: 'left', alpha: kw * P(kVero, .5, 1) });
  drawRich(ctx, '{r:falso}', LX, YQ + 38, { size: 44, weight: 600, align: 'left', alpha: kw * P(kFalso, .5, 1) });
  drawRich(ctx, '{dim:vero o falso}', LX, YQ + 38, { size: 44, weight: 600, align: 'left', alpha: P(kq, .5, 1) });
  // il motto
  drawRich(ctx, '{v:dal falso segue qualunque cosa}', LC[0] + LC[2] / 2, 740, { size: 36, weight: 600, local: t - 59.9 });
  ctx.restore();
}

// ---------- la tavola di verità, a destra ----------
const RC = [1020, 110, 830, 690], XP = 1110, XQ = 1230, XI = 1415, XN = 1665, YH = 322, RY = [407, 492, 577, 662];
// [p, q, p ⇒ q, commento, istante della riga, istante del risultato]
const RIGHE = [['V', 'V', 'V', 'mantenuta', 23.8, 25.0], ['V', 'F', 'F', 'tradita', 28.8, 30.0],
  ['F', 'V', 'V', 'non tradita', 33.8, 39.0], ['F', 'F', 'V', 'non tradita', 44.2, 44.6]];
function valore(ctx, v, x, y, col, al) {
  if (al <= 0.002) return;
  txt(ctx, v, x, y, { size: 48, weight: 600, color: col, alpha: al });
}
function fascia(ctx, i0, i1, col, al) {
  if (al <= 0.002) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .13);
  ctx.beginPath(); ctx.roundRect(RC[0] + 30, RY[i0] - 40, RC[2] - 60, RY[i1] - RY[i0] + 80, 16); ctx.fill(); ctx.restore();
}
function sceneTavola(ctx, t) {
  const al = life(t, 13.3, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...RC, al);
  ctx.save(); ctx.globalAlpha *= al;
  // l'implicazione e come si legge
  drawRich(ctx, '{mx:p}{mv: ⇒ }{my:q}', RC[0] + RC[2] / 2, 175, { size: 60, local: t - 13.5 });
  drawRich(ctx, '{dim:si legge «se }{mx:p}{dim:, allora }{my:q}{dim:»}', RC[0] + RC[2] / 2, 245, { size: 32, local: t - 14.3 });
  // le fasce: la riga di cui si parla; poi la riga falsa; poi le due righe con p falsa
  RIGHE.forEach((r, i) => {
    const fine = i < 3 ? RIGHE[i + 1][4] : 49.1;
    fascia(ctx, i, i, C.v, life(t, r[4], fine, .3, .3));
  });
  fascia(ctx, 1, 1, C.r, life(t, 49.2, 54.4, .4, .4));
  fascia(ctx, 2, 3, C.g, life(t, 54.5, FINE, .4, .6));
  // intestazione e righe
  const kh = P(t, 18.5, 19.0);
  if (kh > 0) {
    ctx.save(); ctx.globalAlpha *= kh;
    drawRich(ctx, '{mx:p}', XP, YH, { size: 48 });
    drawRich(ctx, '{my:q}', XQ, YH, { size: 48 });
    drawRich(ctx, '{mx:p}{mv: ⇒ }{my:q}', XI, YH, { size: 46 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(RC[0] + 40, YH + 40); ctx.lineTo(RC[0] + RC[2] - 40, YH + 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1305, YH - 34); ctx.lineTo(1305, RY[3] + 40); ctx.stroke();
    ctx.restore();
  }
  RIGHE.forEach(([p, q, imp, nota, , tr], i) => {
    const k = P(t, 19.2 + .35 * i, 19.6 + .35 * i);
    valore(ctx, p, XP, RY[i], C.ink, k);
    valore(ctx, q, XQ, RY[i], C.ink, k);
    // finché la riga non è stata detta, al posto del risultato c'è un punto di domanda
    const kr = P(t, tr, tr + .4);
    txt(ctx, '?', XI, RY[i], { size: 48, weight: 600, color: C.dim, alpha: k * (1 - kr) });
    valore(ctx, imp, XI, RY[i], imp === 'V' ? C.g : C.r, kr);
    txt(ctx, nota, XN, RY[i], { size: 32, weight: 600, color: imp === 'V' ? C.g : C.r, alpha: P(t, tr + .2, tr + .6) });
  });
  // la legenda
  drawRich(ctx, '{g:V}{dim: = vero      }{r:F}{dim: = falso}', RC[0] + RC[2] / 2, 750, { size: 32, alpha: P(t, 19.0, 19.5) });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Se piove,\nprendo l’ombrello', W / 2, 200, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, '{mx:p}{mv: ⇒ }{my:q} è falsa {r:solo} quando\n{mx:p} è vera e {my:q} è falsa.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [490, '{dim:piove, niente ombrello}', '{r:promessa tradita}'],
    [960, '{dim:se }{mx:p}{dim: è falsa}', '{mx:p}{mv: ⇒ }{my:q}{g: è vera}'],
    [1430, '{dim:dal falso segue}', '{v:qualunque cosa}'],
  ];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 32 });
    drawRich(ctx, corpo, x, 546, { size: 42, weight: 600 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.2, .7], ['pop', 10.4, .4],                             // la nuvola, l'ombrello
    ['soffio', 13.3], ['pop', 13.5, .55],                                             // p ⇒ q
    ['pop', 19.2, .45], ['pop', 19.55, .5], ['pop', 19.9, .55], ['pop', 20.25, .6],   // le quattro righe
    ['ding', 25.0],                                                                   // VV: vera
    ['traccia', 29.0, 29.6], ['pop', 30.0, .2],                                       // niente ombrello: falsa
    ['tono', 33.2, 33.7, [.4, .8]],                                                   // esce il sole
    ['ding', 39.0],                                                                   // FV: vera
    ['traccia', 44.3, 44.9], ['ding', 44.6],                                          // FF: vera
    ['tono', 49.2, 49.8, [.8, .4]], ['pop', 49.4, .25],                               // di nuovo la pioggia: la riga falsa
    ['tono', 54.4, 55.0, [.4, .8]], ['pop', 54.7, .6],                                // p falsa, q qualunque
    ['pop', 60.0, .5],                                                                // il motto
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Se piove, prendo l’ombrello', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 23.5, 'la promessa'], [23.5, 54.2, 'i quattro casi'], [54.2, FINE, 'dal falso']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCaso(ctx, t); sceneTavola(ctx, t); sceneFine(ctx, t); },
  };
});
