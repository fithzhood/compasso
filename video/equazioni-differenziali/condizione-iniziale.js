'use strict';
/* Infinite soluzioni, ne serve una — y′ = 2x: la famiglia x² + c scorre su e giù; la condizione y(1) = 3 ferma
   una sola curva, y = x² + 2 (il problema di Cauchy). Argomento: equazioni-differenziali. */
CVIDEO.registra('equazioni-differenziali/condizione-iniziale', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, card, checkMark } = M;

const FINE = 77.0, DUR = 86.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.2, 'pensa'], [7.9, 'neutro'],
  [12.7, 'felice'], [14.9, 'neutro'], [22.3, 'neutro'], [27.2, 'sorpreso'], [29.4, 'neutro'],
  [32.2, 'pensa'], [36.5, 'neutro'], [41.4, 'felice'], [43.5, 'neutro'],
  [51.0, 'festa'], [53.3, 'neutro'], [58.0, 'felice'], [60.2, 'neutro'],
  [62.3, 'felice'], [64.5, 'neutro'], [67.2, 'sorpreso'], [69.4, 'neutro'], [72.1, 'occhiolino'], [74.3, 'neutro'],
  [78.6, 'felice'], [82.2, 'occhiolino'],
];
const FUMETTI = [
  [2.2, 6.4, 'Un’equazione differenziale\nha una soluzione sola?'],
  // 1 · tante soluzioni
  [7.9, 12.6, 'Prendiamo {my:y′}{mink: = 2}{mx:x}: quale funzione\nha per derivata {mink:2}{mx:x}?'],
  [12.7, 17.3, 'Per esempio {my:y = x²}: la sua\nderivata è proprio {mink:2}{mx:x}.'],
  [17.4, 22.2, 'Anche {my:x² + 1} e {my:x² − 3}:\nla costante sparisce.'],
  [22.3, 27.1, 'Le soluzioni sono tutte le {my:x² + }{mv:c},\ncon {mv:c} numero qualunque.'],
  [27.2, 32.0, 'Faccio scorrere {mv:c}: la parabola\nsale e scende. {g:Infinite} soluzioni.'],
  // 2 · la condizione
  [32.1, 36.4, 'Per sceglierne una serve un dato:\nun punto da cui passare.'],
  [36.5, 41.3, 'Voglio che passi per (1; 3):\nsi scrive {my:y(1) = 3}.'],
  [41.4, 44.6, 'È la {v:condizione iniziale}.'],
  [44.7, 48.6, 'Faccio scorrere di nuovo {mv:c}…'],
  [48.7, 53.2, '…una sola parabola passa\nper (1; 3): si ferma lì.'],
  [53.3, 57.9, 'In {mx:x} = 1: {mink:1 + }{mv:c}{mink: = 3},\nquindi {mv:c}{mink: = 2}.'],
  [58.0, 62.1, 'La soluzione è {mg:y = x² + 2}:\nuna sola.'],
  // 3 · il problema di Cauchy
  [62.3, 67.1, 'Equazione e condizione insieme formano\nil {v:problema di Cauchy}.'],
  [67.2, 72.0, 'Con {my:y(1) = 0} la parabola\nscende fino a (1; 0).'],
  [72.1, 76.3, 'Si ferma su {mg:x² − 1}:\nun’altra soluzione.'],
  // chiusura
  [78.6, 84.0, 'Infinite soluzioni: la condizione\niniziale ne sceglie {g:una sola}.'],
];

// ---- il piano: x e y con unità diverse ----
const PO = { ox: 760, oy: 566, ux: 118, uy: 52, x0: -2.6, x1: 2.6, y0: -3.6, y1: 7.6 };
const toS = (x, y) => [PO.ox + x * PO.ux, PO.oy - y * PO.uy];
const CARD = [380, 110, 760, 690];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, ux, uy, x0, x1, y0, y1 } = PO;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * ux; ctx.beginPath(); ctx.moveTo(x, oy - y1 * uy * k); ctx.lineTo(x, oy - y0 * uy * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * uy; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, y); ctx.lineTo(ox + x1 * ux * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .05) * ux * k, oy); ctx.lineTo(ox + (x1 + .1) * ux * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * uy * k); ctx.lineTo(ox, oy - (y1 + .3) * uy * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .1) * ux * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .3) * uy * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .1) * ux + 36, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 28, oy - (y1 + .3) * uy - 6, { size: 44, align: 'left' });
  ctx.restore();
}
// i numeri sui bordi del riquadro, come un righello: le parabole passano dappertutto vicino agli assi
function numeri(ctx, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  for (const i of [-2, -1, 1, 2]) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), toS(i, 0)[0], toS(0, PO.y0)[1] + 22, { size: 31, color: C.dim });
  for (const j of [-2, 2, 4, 6]) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), toS(PO.x0, 0)[0] - 8, toS(0, j)[1], { size: 31, color: C.dim, align: 'right' });
  ctx.restore();
}
function parabola(c) {
  // solo il tratto dentro il riquadro (y ≤ y1)
  const a = Math.sqrt(Math.max(0, PO.y1 - c)), b = Math.min(PO.x1, a), pts = [];
  for (let i = 0; i <= 120; i++) { const x = lerp(-b, b, i / 120); pts.push(toS(x, x * x + c)); }
  return pts;
}
// valore fra fotogrammi chiave, con l'andamento morbido fra un fotogramma e l'altro
function kfm(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], P(t, keys[i - 1][0], keys[i][0], E.io));
  return keys[keys.length - 1][1];
}
// la parabola che scorre: c nel tempo
const cAt = t => kfm(t, [[27.5, 0], [29.0, 4], [30.6, -3], [31.6, 0], [45.0, 0], [46.6, 4.5], [48.4, -2.5], [49.0, -2.5], [51.0, 2]]);
const cCopia = t => kfm(t, [[68.0, 2], [70.2, -1]]);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Infinite soluzioni,\nne serve una', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// un punto con l'etichetta su un fondino di carta (le parabole che scorrono non la coprono)
function punto(ctx, x, y, s, k, dx, dy, allinea) {
  if (k <= 0) return;
  const p = toS(x, y);
  dot(ctx, p, C.ink, k, 10);
  ctx.save(); ctx.globalAlpha *= clamp(k);
  ctx.font = '500 36px Lexend, "Segoe UI", sans-serif';
  const w = ctx.measureText(s).width + 16, x0 = allinea === 'right' ? p[0] + dx - w + 8 : allinea === 'center' ? p[0] + dx - w / 2 : p[0] + dx - 8;
  ctx.fillStyle = css(C.paper, .92); ctx.beginPath(); ctx.roundRect(x0, p[1] + dy - 22, w, 44, 10); ctx.fill();
  ctx.restore();
  drawRich(ctx, s, p[0] + dx, p[1] + dy, { size: 36, align: allinea, alpha: clamp(k) });
}

// il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.3 || t > FINE + .3) return;
  const al = life(t, 7.5, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  assi(ctx, P(t, 7.7, 8.6));
  ctx.save();
  const R = [toS(PO.x0, 0)[0], toS(0, PO.y1)[1], (PO.x1 - PO.x0) * PO.ux, (PO.y1 - PO.y0) * PO.uy];
  ctx.beginPath(); ctx.rect(R[0] - 4, R[1] - 4, R[2] + 8, R[3] + 8); ctx.clip();
  // la famiglia x² + c: prima x², poi x² + 1 e x² − 3, poi tutte; sparisce quando serve sceglierne una
  const fam = 1 - P(t, 32.2, 32.9);
  if (fam > 0) {
    ctx.save(); ctx.globalAlpha *= fam;
    [[0, 13.0, 1], [1, 17.8, 1], [-3, 18.6, 1], [-2, 22.8, .45], [-1, 23.0, .45], [2, 23.2, .45], [3, 23.4, .45], [4, 23.6, .45]].forEach(([c, t0, a]) => {
      const k = P(t, t0, t0 + 1.0); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= a; glowStroke(ctx, parabola(c), k, C.y, a === 1 ? 5 : 3.5); ctx.restore();
    });
    ctx.restore();
  }
  // la parabola che scorre (viola), poi la soluzione (verde)
  const km = P(t, 27.3, 27.6);
  if (km > 0) {
    const verde = P(t, 58.2, 58.8), sbiadisce = 1 - .55 * P(t, 67.6, 68.0);
    ctx.save(); ctx.globalAlpha *= km * sbiadisce;
    glowStroke(ctx, parabola(cAt(t)), 1, mix(C.v, C.g, verde), 6);
    ctx.restore();
  }
  // con y(1) = 0: una copia scende fino a x² − 1
  const kc = P(t, 67.9, 68.1);
  if (kc > 0) glowStroke(ctx, parabola(cCopia(t)), 1, mix(C.v, C.g, P(t, 72.2, 72.8)), 6);
  ctx.restore();
  // i punti delle condizioni
  const lampo = life(t, 51.0, 52.4, .2, .8);
  if (lampo > 0) { ctx.save(); ctx.globalAlpha *= lampo * .35; ctx.fillStyle = css(C.g); const p = toS(1, 3); ctx.beginPath(); ctx.arc(p[0], p[1], 34, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  punto(ctx, 1, 3, '(1; 3)', P(t, 36.8, 37.2, E.back), -24, -64, 'center');   // sopra il punto, lontano dall'asse y e dalla parabola
  punto(ctx, 1, 0, '(1; 0)', P(t, 67.5, 67.9, E.back), 24, 34, 'left');
  // il nome della curva verde, sotto a destra dove le parabole non passano
  const kn = life(t, 58.3, FINE, .5, .6) * (1 - P(t, 67.6, 68.0));
  if (kn > 0) drawRich(ctx, '{mg:y = x² + 2}', toS(1.15, 0)[0], toS(0, 1.6)[1], { size: 40, align: 'left', alpha: kn });
  numeri(ctx, P(t, 8.2, 8.8));
  ctx.restore();
}

// la scheda a destra (7.5–FINE)
const PX = 1510;
function graffa(ctx, x, y0, y1, al) {   // la parentesi graffa del sistema
  if (al <= 0) return;
  const ym = (y0 + y1) / 2, w = 16, r = 22;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0); ctx.quadraticCurveTo(x, y0, x, y0 + r); ctx.lineTo(x, ym - r);
  ctx.quadraticCurveTo(x, ym, x - w, ym); ctx.quadraticCurveTo(x, ym, x, ym + r); ctx.lineTo(x, y1 - r);
  ctx.quadraticCurveTo(x, y1, x + w, y1); ctx.stroke(); ctx.restore();
}
function scenePannello(ctx, t) {
  if (t < 7.3 || t > FINE + .3) return;
  const al = life(t, 7.6, FINE, .6, .6);
  card(ctx, 1190, 140, 640, 640, al);
  ctx.save(); ctx.globalAlpha *= al;
  // 1–2 · l'equazione, le soluzioni, la condizione (7.6–62.2)
  const a12 = 1 - P(t, 62.0, 62.4);
  if (a12 > 0) {
    ctx.save(); ctx.globalAlpha *= a12;
    drawRich(ctx, '{my:y′}{mink: = 2}{mx:x}', PX, 205, { size: 60, local: t - 8.0 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1240, 262); ctx.lineTo(1780, 262); ctx.stroke();
    // qualche soluzione (12.9–22.5)
    const aA = 1 - P(t, 22.3, 22.7);
    if (aA > 0 && t > 12.8) {
      ctx.save(); ctx.globalAlpha *= aA;
      drawRich(ctx, '{my:y = x²}', PX, 330, { size: 48, local: t - 12.9 });
      drawRich(ctx, '{mink:(}{my:x²}{mink:)′ = 2}{mx:x}', PX, 400, { size: 40, local: t - 14.2 });
      checkMark(ctx, 1730, 365, P(t, 15.0, 16.0), C.g, .25);
      drawRich(ctx, '{my:x² + 1}', 1395, 480, { size: 44, local: t - 17.6 });
      drawRich(ctx, '{my:x² − 3}', 1625, 480, { size: 44, local: t - 18.4 });
      drawRich(ctx, '{dim:derivata }{mink:2}{mx:x}{dim: per tutte}', PX, 545, { size: 32, local: t - 19.8 });
      ctx.restore();
    }
    // tutte le soluzioni, e c che scorre
    drawRich(ctx, '{my:y = x² + }{mv:c}', PX, 330, { size: 60, local: t - 22.8 });
    drawRich(ctx, '{mv:c}{dim: è un numero qualunque}', PX, 400, { size: 32, alpha: life(t, 24.4, 27.2, .4, .3) });
    const kc = Math.max(life(t, 27.3, 32.0, .3, .4), life(t, 44.8, 58.0, .3, .4));
    if (kc > 0) {
      drawRich(ctx, '{mv:c =}', 1440, 410, { size: 48, alpha: kc });
      fixedNum(ctx, fmtN(Math.round(cAt(t) * 10) / 10, 1), 1615, 410, 48, C.v, kc);
    }
    // la condizione
    drawRich(ctx, '{my:y(1) = 3}', PX, 500, { size: 52, local: t - 39.4 });
    conFont(TITOLI, () => drawRich(ctx, '{v:condizione iniziale}', PX, 560, { size: 38, weight: 600, local: t - 41.6 }));
    drawRich(ctx, '{my:y(1)}{mink: = 1 + }{mv:c}{mink: = 3}', PX, 635, { size: 44, local: t - 53.5 });
    drawRich(ctx, '{mv:c}{mink: = 2}', PX, 705, { size: 48, local: t - 55.6, alpha: 1 - P(t, 57.9, 58.2) });
    drawRich(ctx, '{mg:y = x² + 2}', PX, 705, { size: 52, local: t - 58.3 });
    ctx.restore();
  }
  // 3 · il problema di Cauchy (62.2–FINE)
  if (t > 62.2) {
    const k = P(t, 62.4, 62.9);
    ctx.save(); ctx.globalAlpha *= k;
    conFont(TITOLI, () => drawRich(ctx, '{v:problema di Cauchy}', PX, 215, { size: 44, weight: 600, local: t - 62.6 }));
    graffa(ctx, 1360, 285, 470, P(t, 62.8, 63.3));
    drawRich(ctx, '{my:y′}{mink: = 2}{mx:x}', 1395, 325, { size: 54, align: 'left', local: t - 62.9 });
    const k0 = P(t, 67.5, 68.0);
    drawRich(ctx, '{my:y(1) = 3}', 1395, 430, { size: 54, align: 'left', local: t - 63.1, alpha: 1 - k0 });
    drawRich(ctx, '{my:y(1) = 0}', 1395, 430, { size: 54, align: 'left', alpha: k0 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1240, 525); ctx.lineTo(1780, 525); ctx.stroke();
    txt(ctx, 'soluzione', PX, 580, { size: 32, color: C.dim, alpha: P(t, 63.6, 64.0) });
    const k1 = P(t, 72.2, 72.6);
    drawRich(ctx, '{mg:y = x² + 2}', PX, 655, { size: 56, local: t - 63.8, alpha: 1 - P(t, 67.5, 67.9) });
    drawRich(ctx, '{mg:y = x² − 1}', PX, 655, { size: 56, alpha: k1 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un’equazione differenziale ha infinite\nsoluzioni: la condizione ne sceglie {g:una}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'tutte le soluzioni', '{my:y = x² + }{mv:c}'], [960, 'condizione iniziale', '{my:y(1) = 3}'], [1430, 'una sola soluzione', '{mg:y = x² + 2}']];
  pills.forEach(([x, testa, f], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    txt(ctx, testa, x, 486, { size: 30, weight: 400, color: C.dim });
    drawRich(ctx, f, x, 548, { size: 46 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.6], ['pop', 8.0, .5],                         // il piano, y′ = 2x
    ['tono', 13.0, 14.0, [.55, .3, .2, .3, .55]], ['pop', 12.9, .4], ['ding', 15.0],  // y = x², la derivata torna
    ['tono', 17.8, 18.8, [.6, .4, .3, .4, .6]], ['tono', 18.6, 19.6, [.35, .15, .05, .15, .35]],   // x² + 1, x² − 3
    ['traccia', 22.8, 24.6], ['pop', 22.8, .5],                                       // tutte le x² + c
    ['tono', 27.5, 31.6, [.4, .62, .78, .5, .2, .1, .3, .4]],                         // c scorre: su, giù
    ['soffio', 32.2], ['pop', 36.8, .55], ['pop', 39.4, .5], ['pop', 41.6, .65],      // il punto (1; 3), y(1) = 3
    ['tono', 45.0, 48.4, [.4, .65, .8, .45, .15]],                                    // c scorre di nuovo
    ['tono', 49.0, 51.0, [.15, .3, .5, .6]], ['ding', 51.0],                          // si ferma sul punto
    ['pop', 53.5, .45], ['pop', 55.6, .6], ['pop', 58.3, .7],                         // 1 + c = 3, c = 2, y = x² + 2
    ['soffio', 62.4], ['traccia', 62.8, 63.3], ['pop', 62.9, .5], ['pop', 63.8, .65], // il problema di Cauchy
    ['pop', 67.5, .3], ['tono', 68.0, 70.2, [.6, .45, .3]],                           // y(1) = 0: la parabola scende
    ['ding', 72.2],                                                                    // y = x² − 1
    ['soffio', 77.2], ['pop', 79.4, .5], ['pop', 79.9, .6], ['pop', 80.4, .7],        // in una frase
  ];
  return {
    titolo: 'Infinite soluzioni, ne serve una', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 32.1, 'tante soluzioni'], [32.1, 62.2, 'la condizione iniziale'], [62.2, FINE, 'il problema di Cauchy']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
