'use strict';
/* Un sistema, due rette — ogni equazione è una retta: incidenti (una soluzione, determinato), parallele e distinte
   (nessuna, impossibile), coincidenti (infinite, indeterminato). Argomento: sistemi-lineari
   (sezione «Interpretazione grafica»). */
CVIDEO.registra('sistemi-lineari/due-rette', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, txt,
    dot, glowStroke, makePlane, card } = M;

const FINE = 75.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [25.6, 'sorpreso'], [27.6, 'neutro'], [29.7, 'felice'], [31.8, 'neutro'], [37.9, 'festa'], [40.4, 'neutro'],
  [46.1, 'sorpreso'], [48.1, 'neutro'], [50.5, 'pensa'], [55.0, 'neutro'],
  [61.2, 'sorpreso'], [63.2, 'neutro'], [67.2, 'felice'], [69.4, 'neutro'], [71.5, 'festa'], [73.8, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.6, 'occhiolino'], [FINE + 6.7, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.3, 'Che cosa vuol dire, nel disegno,\nrisolvere un sistema?'],
  // 1 · ogni equazione è una retta
  [7.9, 11.9, 'Ecco un sistema: due equazioni\nche devono valere {g:insieme}.'],
  [12.0, 16.8, '{mink:x + y = 5} è vera per le coppie\n(5; 0), (4; 1), (3; 2)…'],
  [16.9, 21.6, 'Come punti, tutte le sue soluzioni\nformano una {v:retta}: la chiamo {mv:r}.'],
  [21.7, 25.5, 'Anche {mink:x − y = 1} è una retta:\nla chiamo {my:s}.'],
  // 2 · incidenti
  [25.6, 29.6, 'Le due rette si incontrano\nin un solo punto, {mg:P}.'],
  [29.7, 33.7, '{mg:P}{mink:(3; 2)} sta su tutte e due:\n{mink:3 + 2 = 5} e {mink:3 − 2 = 1}.'],
  [33.8, 37.8, 'Rette che si incontrano in un punto\nsono {v:incidenti}.'],
  [37.9, 42.2, 'Una sola soluzione, la coppia (3; 2):\nil sistema è {g:determinato}.'],
  // 3 · parallele
  [42.6, 46.0, 'Ora cambio la seconda equazione:\n{mink:x + y = 2}.'],
  [46.1, 50.4, 'Le rette sono {v:parallele} e distinte:\nnessun punto in comune.'],
  [50.5, 54.9, '{mink:x + y} non può valere\n5 e 2 nello stesso momento.'],
  [55.0, 58.4, 'Nessuna soluzione:\nil sistema è {r:impossibile}.'],
  // 4 · coincidenti
  [58.8, 63.0, '{my:s} si sposta proprio su {mv:r}: la\nseconda diventa {mink:2x + 2y = 10}.'],
  [63.1, 67.1, 'Divisa per 2 è {mink:x + y = 5}:\nproprio l\'equazione di {mv:r}.'],
  [67.2, 71.4, 'Le rette sono {v:coincidenti}:\nhanno in comune tutti i punti.'],
  [71.5, 74.9, 'Infinite soluzioni:\nil sistema è {g:indeterminato}.'],
  // chiusura
  [FINE + 1.0, FINE + 7.7, 'Incidenti, parallele o coincidenti:\nuna, nessuna o infinite soluzioni.'],
];

// il piano: stessa unità sui due assi
const PL = makePlane({ ox: 404, oy: 659, u: 76, x0: -1.5, x1: 7.5, y0: -1.5, y1: 6.5 });
const CARD = [230, 110, 830, 690];
const G0 = PL.toS(PL.x0, PL.y1), G1 = PL.toS(PL.x1, PL.y0);
// la parte di y = mx + q dentro la griglia
function tratto(m, q) {
  const u = (PL.y0 - q) / m, v = (PL.y1 - q) / m;
  const a = Math.max(PL.x0, Math.min(u, v)), b = Math.min(PL.x1, Math.max(u, v));
  return [PL.toS(a, m * a + q), PL.toS(b, m * b + q)];
}
function linea(ctx, m, q, col, k = 1, al = 1, dash = null) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(G0[0], G0[1], G1[0] - G0[0], G1[1] - G0[1]); ctx.clip();
  if (dash) ctx.setLineDash(dash);
  glowStroke(ctx, tratto(m, q), k, col, 5);
  ctx.restore();
}
// i numeri degli assi su un fondino di carta, sopra le rette che li attraversano
function numeri(ctx, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
  for (let i = Math.ceil(PL.x0); i <= PL.x1; i++) if (i) {
    const s = lab(i), w = 17 * s.length + 14, p = PL.toS(i, 0);
    ctx.fillRect(p[0] - w / 2, p[1] + 16, w, 32); txt(ctx, s, p[0], p[1] + 32, { size: 29, color: C.dim });
  }
  for (let j = Math.ceil(PL.y0); j <= PL.y1; j++) if (j) {
    const s = lab(j), w = 17 * s.length + 14, p = PL.toS(0, j);
    ctx.fillRect(p[0] - 18 - w, p[1] - 16, w, 32); txt(ctx, s, p[0] - 20, p[1], { size: 29, color: C.dim, align: 'right' });
  }
  ctx.restore();
}
// etichetta in coordinate del piano
function scritta(ctx, s, x, y, al, o = {}) {
  if (al <= 0) return;
  const p = PL.toS(x, y);
  drawRich(ctx, s, p[0] + (o.dx || 0), p[1] + (o.dy || 0), { size: o.size || 46, align: o.align || 'center', alpha: al });
}
// segno di spunta piccolo
function spunta(ctx, x, y, k, col) {
  if (k <= 0) return;
  glowStroke(ctx, [[x - 15, y], [x - 4, y + 12], [x + 17, y - 13]], k, col, 6);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Un sistema, due rette', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano con le due rette (7.5–FINE)
const PUNTI_R = [[5, 0], [4, 1], [3, 2]];
// s: y = −x + q mentre scivola su r (59.6–61.2)
const qS = t => kf(t, [[59.6, 2], [61.2, 5]]);
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  // r: x + y = 5
  linea(ctx, -1, 5, C.v, P(t, 17.1, 18.1, E.out));
  // s nei tre casi: x − y = 1, poi x + y = 2, poi 2x + 2y = 10 che scivola su r
  linea(ctx, 1, -1, C.y, P(t, 22.0, 23.0, E.out), 1 - P(t, 42.7, 43.2));
  if (t > 43) {
    const tr = P(t, 61.2, 61.7);   // arrivata su r, s diventa tratteggiata: così si vedono tutte e due
    linea(ctx, -1, qS(t), C.y, P(t, 43.2, 44.0, E.out), 1 - tr);
    linea(ctx, -1, qS(t), C.y, 1, tr, [22, 18]);
  }
  numeri(ctx, P(t, 8.3, 8.7));
  // le coppie che rendono vera x + y = 5
  const pv = 1 - P(t, 21.6, 22.0);
  PUNTI_R.forEach(([x, y], i) => {
    const k = P(t, 12.4 + i * .4, 12.8 + i * .4, E.back) * pv;
    dot(ctx, PL.toS(x, y), C.v, k, 10);
    scritta(ctx, `{mink:(${x}; ${y})}`, x + .3, y + .5, P(t, 12.5 + i * .4, 12.9 + i * .4) * pv, { size: 40, align: 'left' });
  });
  // i nomi: r sopra a sinistra, dove non passa nessuna s; s di lato, lontana da P e dalle altre scritte
  scritta(ctx, '{mv:r}', 1.5, 4.5, P(t, 18.0, 18.4));
  scritta(ctx, '{my:s}', 5.6, 3.6, P(t, 22.9, 23.3) * (1 - P(t, 42.7, 43.0)));
  scritta(ctx, '{my:s}', 0.5, 0.6, P(t, 44.0, 44.4) * (1 - P(t, 58.9, 59.2)));
  scritta(ctx, '{my:s}', 4.3, 1.7, P(t, 61.5, 61.9));
  // P, il punto d'incontro: la scritta sta a destra, fra le due rette che si allargano
  const pa = 1 - P(t, 42.7, 43.1);
  if (pa > 0 && t > 25.8) {
    const [px, py] = PL.toS(3, 2);
    dot(ctx, [px, py], C.g, P(t, 25.9, 26.3, E.back) * pa, 12);
    drawRich(ctx, '{mg:P}', px + 46, py, { size: 46, align: 'left', alpha: P(t, 26.0, 26.4) * pa });
    drawRich(ctx, '{mink:(3; 2)}', px + 46 + richW(ctx, '{mg:P}', 46) + 2, py, { size: 46, align: 'left', alpha: P(t, 29.9, 30.3) * pa });
  }
  // coincidenti: ogni punto della retta è comune
  for (let i = 0; i <= 5; i++) dot(ctx, PL.toS(i, 5 - i), C.g, P(t, 67.4 + i * .15, 67.8 + i * .15, E.back), 10);
  ctx.restore();
}

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
// la scheda con il sistema e il verdetto (7.9–FINE)
const SX = 1215, R1 = 285, R2 = 365, FS = 52;   // dove stanno le due equazioni
function riquadro(ctx, x, y, w, h, al, col, piena) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.roundRect(x, y, w, h, 12);
  if (piena) { ctx.fillStyle = css(col, .14); ctx.fill(); } else { ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 7.9, FINE + .2, .6, .7);
  card(ctx, 1110, 130, 730, 640, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'il sistema', 1475, 192, { size: 40, weight: 600 }));
  // «la prima»: la riga che si sta disegnando
  riquadro(ctx, SX - 14, R1 - 34, richW(ctx, '{mink:x + y = 5}', FS) + 28, 68, life(t, 12.0, 16.8, .4, .4), C.v, true);
  // x + y non può valere 5 e 2 insieme
  const ev = life(t, 50.6, 54.9, .4, .4);
  if (ev > 0) {
    const wl = richW(ctx, '{mink:x + y}', FS) + 16;
    riquadro(ctx, SX - 10, R1 - 34, wl, 68, ev, C.v, true);
    riquadro(ctx, SX - 10, R2 - 34, wl, 68, ev, C.v, true);
    const n5 = richW(ctx, '{mink:x + y = }', FS), w5 = richW(ctx, '{mink:5}', FS);
    riquadro(ctx, SX + n5 - 3, R1 - 32, w5 + 14, 64, ev, C.r, false);
    riquadro(ctx, SX + n5 - 3, R2 - 32, w5 + 14, 64, ev, C.r, false);
  }
  graffa(ctx, SX - 46, R1 - 40, R2 + 40, P(t, 8.2, 8.8));
  drawRich(ctx, '{mink:x + y = 5}', SX, R1, { size: FS, align: 'left', local: t - 8.5 });
  // la seconda equazione nei tre casi
  const e1 = 1 - P(t, 42.7, 43.1), e2 = P(t, 43.0, 43.4) * (1 - P(t, 61.0, 61.3)), e3 = P(t, 61.2, 61.6);
  drawRich(ctx, '{mink:x − y = 1}', SX, R2, { size: FS, align: 'left', local: t - 8.9, alpha: e1 });
  drawRich(ctx, '{mink:x + y = 2}', SX, R2, { size: FS, align: 'left', alpha: e2 });
  drawRich(ctx, '{mink:2x + 2y = 10}', SX, R2, { size: FS, align: 'left', alpha: e3 });
  // i nomi delle rette
  drawRich(ctx, '{dim:retta }{mv:r}', 1790, R1, { size: 36, align: 'right', alpha: P(t, 18.0, 18.4) });
  drawRich(ctx, '{dim:retta }{my:s}', 1790, R2, { size: 36, align: 'right', alpha: P(t, 22.9, 23.3) });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= P(t, 29.7, 30.1);
  ctx.beginPath(); ctx.moveTo(1160, 435); ctx.lineTo(1790, 435); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= al;
  // 1 · incidenti
  const a1 = 1 - P(t, 42.0, 42.5);
  if (a1 > 0 && t > 29.7) {
    ctx.save(); ctx.globalAlpha *= a1;
    drawRich(ctx, '{mink:3 + 2 = 5}', SX, 495, { size: 46, align: 'left', alpha: P(t, 29.9, 30.3) });
    spunta(ctx, 1520, 497, P(t, 30.2, 30.6), C.g);
    drawRich(ctx, '{mink:3 − 2 = 1}', SX, 565, { size: 46, align: 'left', alpha: P(t, 30.4, 30.8) });
    spunta(ctx, 1520, 567, P(t, 30.7, 31.1), C.g);
    drawRich(ctx, 'rette {v:incidenti}', 1475, 640, { size: 42, local: t - 34.0 });
    drawRich(ctx, '{g:determinato}{dim:: una soluzione}', 1475, 712, { size: 40, local: t - 38.1 });
    ctx.restore();
  }
  // 2 · parallele
  const a2 = life(t, 46.2, 58.8, .4, .5);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    drawRich(ctx, 'rette {v:parallele} e distinte', 1475, 500, { size: 42, local: t - 46.3 });
    drawRich(ctx, '{dim:nessun punto in comune}', 1475, 565, { size: 38, local: t - 46.9 });
    drawRich(ctx, '{r:impossibile}{dim:: nessuna soluzione}', 1475, 712, { size: 40, local: t - 55.2 });
    ctx.restore();
  }
  // 3 · coincidenti
  const a3 = life(t, 63.2, FINE + .2, .4, .6);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    drawRich(ctx, '{dim:divisa per 2: }{mink:x + y = 5}', 1475, 500, { size: 44, local: t - 63.3 });
    drawRich(ctx, 'rette {v:coincidenti}', 1475, 575, { size: 42, local: t - 67.4, alpha: P(t, 67.3, 67.5) });
    drawRich(ctx, '{dim:tutti i punti in comune}', 1475, 635, { size: 38, local: t - 68.0, alpha: P(t, 67.9, 68.1) });
    drawRich(ctx, '{g:indeterminato}{dim:: infinite soluzioni}', 1475, 712, { size: 40, local: t - 71.7, alpha: P(t, 71.6, 71.8) });
    ctx.restore();
  }
  ctx.restore();
}

// 5 · in una frase (FINE–FINE + 10.6)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ogni equazione è una retta: le coordinate\ndei {g:punti comuni} sono le soluzioni.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'rette {v:incidenti}\n{g:determinato}'], [960, '{v:parallele} e distinte\n{r:impossibile}'], [1450, 'rette {v:coincidenti}\n{g:indeterminato}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 450, 450, 140);
    drawRich(ctx, s, x, 520, { size: 38, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Un sistema, due rette', durata: FINE + 10.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 25.5, 'ogni equazione è una retta'], [25.5, 42.3, 'rette incidenti'], [42.3, 58.6, 'rette parallele'], [58.6, FINE, 'rette coincidenti']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
