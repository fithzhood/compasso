'use strict';
/* Il grafico di |f(x)| — con f(x) = x² − 4: dove il grafico sta sopra l'asse x non cambia, il tratto sotto
   (fra −2 e 2) si ribalta sopra come in uno specchio; in −2 e 2 nascono due punti angolosi. Argomento: valore-assoluto-irrazionali. */
CVIDEO.registra('valore-assoluto-irrazionali/grafico-modulo', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, txt,
    dot, glowStroke, arrowHead, makePlane, card, checkMark } = M;
  const f = x => x * x - 4;

const FINE = 59.6, DURATA = 70.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [16.5, 'felice'], [18.6, 'neutro'],
  [27.2, 'sorpreso'], [29.3, 'neutro'], [39.0, 'sorpreso'], [41.1, 'neutro'], [47.1, 'felice'], [49.2, 'neutro'],
  [55.2, 'felice'], [57.3, 'neutro'], [FINE + 1.0, 'felice'], [FINE + 6.4, 'occhiolino'], [FINE + 8.4, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede; i movimenti stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Che cosa fa il valore assoluto\na un grafico?'],
  // 1 · un punto alla volta
  [7.9, 11.9, 'Ecco il grafico di una funzione:\n{my:f(}{mx:x}{my:) = }{mx:x}{my:² − 4}.'],
  [12.5, 16.4, 'In {mx:x}{mink: = 3}, {my:f(3) = 5}:\nil punto sta sopra l\'asse {mx:x}.'],
  [16.5, 21.0, 'Il valore assoluto di 5 è 5:\n{mink:|5| = 5}, il punto {g:resta} dov\'è.'],
  [21.6, 25.6, 'In {mx:x}{mink: = 1}, {my:f(1) = −3}:\nil punto sta sotto l\'asse {mx:x}.'],
  [27.2, 31.4, 'Ma {mink:|−3| = 3}: il punto va\nal {v:simmetrico}, sopra l\'asse.'],
  // 2 · tutto il tratto
  [32.6, 36.9, 'Tutto il tratto fra {mink:−2} e {mink:2}\nsta sotto l\'asse {mx:x}.'],
  [39.0, 42.6, 'Si {v:ribalta} sopra,\ncome in uno specchio.'],
  [42.7, 46.4, 'I tratti sopra l\'asse invece\n{g:non cambiano}.'],
  [47.1, 51.0, 'Ecco {mink:y = |}{my:f(}{mx:x}{my:)}{mink:|}:\nniente sta più sotto l\'asse {mx:x}.'],
  [51.1, 55.1, 'In {mink:−2} e in {mink:2} il grafico\nfa due {v:punte}.'],
  [55.2, 59.4, 'Sono {v:punti angolosi}: nascono\ndove il grafico attraversa l\'asse.'],
  // chiusura
  [61.6, 67.5, 'Il valore assoluto alza ciò che sta\nsotto l\'asse, e non tocca il resto.'],
];

const PL = makePlane({ ox: 640, oy: 500, u: 60, x0: -4.4, x1: 4.4, y0: -4.5, y1: 5.5 });
const CARD = [270, 110, 740, 690], SCHEDA = [1080, 110, 760, 690];
const XC = 3.08;                       // dove la parabola esce in alto (f = 5,49)
const KFLIP = t => P(t, 37.0, 38.9);   // il ribaltamento del tratto fra −2 e 2
// griglia e assi; i numeri li scrive numeri(), dopo le curve, su un fondino di carta
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -4; i <= 4; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = -4; j <= 5; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * u - 8, { size: 44 });
  ctx.restore();
}
// i numeri degli assi: −2 e 2 spostati verso l'esterno, dove la curva non passa mai;
// sull'asse y niente ±4 (lì passano i vertici) e i numeri stretti all'asse, lontani dalle curve
function numeri(ctx, k) {
  const al = P(k, .6, 1); if (al <= 0) return;
  const L = [];
  // niente ±3: −2 e 2, spostati, non ci starebbero accanto
  for (const i of [-4, -2, -1, 1, 2, 4]) L.push([i, PL.ox + i * PL.u + (i === -2 ? -26 : i === 2 ? 20 : 0), PL.oy + 32, 'center']);
  for (const j of [-3, -2, -1, 1, 2, 3, 5]) L.push([j, PL.ox - 14, PL.oy - j * PL.u, 'right']);
  for (const [n, x, y, align] of L) {
    const s = (n < 0 ? '−' : '') + Math.abs(n), w = 17 * s.length + (align === 'right' ? 2 : 8), cx = align === 'right' ? x - w / 2 + 2 : x;
    ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(cx - w / 2, y - 16, w, 32); ctx.restore();
    txt(ctx, s, x, y, { size: 29, color: C.dim, align, alpha: al });
  }
}
// la parabola: i due tratti esterni restano, quello fra −2 e 2 si ribalta (y → y·(1 − 2k))
function tratto(a, b, kf = 0) { return PL.curve(x => f(x) * (1 - 2 * kf), a, b, 160); }
function dashedLine(ctx, a, b, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
function spezzata(ctx, pts, col, w, al, dash) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il grafico di {mink:|}{my:f(}{mx:x}{my:)}{mink:|}', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.4 || t > FINE + .7) return;
  const A = 1 - P(t, FINE - .2, FINE + .5);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  const kc = P(t, 8.4, 9.9), kfl = KFLIP(t);
  // B8: i tratti esterni, che non cambiano, con un alone verde
  const ok = life(t, 42.8, 46.4, .4, .4);
  if (ok > 0) for (const [a, b] of [[-XC, -2], [2, XC]]) spezzata(ctx, tratto(a, b), C.g, 16, ok * .25);
  // il tratto di prima, tratteggiato, mentre si ribalta e subito dopo (lo specchio)
  const fantasma = Math.min(P(t, 37.0, 37.4), 1 - P(t, 46.4, 47.0));
  spezzata(ctx, tratto(-2, 2), C.y, 3, fantasma * .7, [8, 10]);
  // la curva: si disegna da sinistra a destra, poi il tratto di mezzo si colora e si ribalta
  if (kc > 0) {
    const tutta = PL.curve(f, -XC, XC, 400);
    if (kc < 1) glowStroke(ctx, tutta, kc, C.y);
    else {
      glowStroke(ctx, tratto(-XC, -2), 1, C.y);
      glowStroke(ctx, tratto(2, XC), 1, C.y);
      const kv = P(t, 32.0, 32.6);   // il tratto sotto l'asse diventa viola quando Ada ne parla
      glowStroke(ctx, tratto(-2, 2, kfl), 1, kv > 0 ? C.v : C.y);
      if (kv > 0 && kv < 1) { ctx.save(); ctx.globalAlpha *= 1 - kv; glowStroke(ctx, tratto(-2, 2, kfl), 1, C.y); ctx.restore(); }
    }
  }
  // 1 · i due punti: (3; 5) resta, (1; −3) va in (1; 3)
  const p3 = life(t, 12.0, 31.6, .4, .5);
  if (p3 > 0) {
    dashedLine(ctx, PL.toS(3, 0), PL.toS(3, 5), C.x, p3);
    dot(ctx, PL.toS(3, 5), C.y, p3, 11);
    // il 3 sotto il piede del tratteggio (fra i numeri dell'asse non c'è)
    const [q3x, q3y] = PL.toS(3, 0);
    ctx.save(); ctx.globalAlpha *= p3; ctx.fillStyle = C.paper; ctx.fillRect(q3x - 13, q3y + 16, 26, 32); ctx.restore();
    txt(ctx, '3', q3x, q3y + 32, { size: 29, color: C.x, alpha: p3 });
  }
  const p1 = life(t, 21.1, 31.6, .4, .5);
  if (p1 > 0) {
    const ky = P(t, 25.7, 27.1);                 // il punto sale da −3 a 3, e attraversa lo specchio senza vedersi
    const y = lerp(-3, 3, ky);
    dashedLine(ctx, PL.toS(1, -.85), PL.toS(1, Math.min(y, -.85)), C.x, p1);
    if (y > 0) dashedLine(ctx, PL.toS(1, 0), PL.toS(1, y), C.v, p1);
    const vis = clamp((Math.abs(y) - .9) / .3);
    dot(ctx, PL.toS(1, y), y > 0 ? C.v : C.y, p1 * vis, 11);
  }
  numeri(ctx, P(t, 7.7, 8.7));
  // 2 · le punte in −2 e 2
  const pu = life(t, 51.2, FINE, .4, .4);
  if (pu > 0) for (const x of [-2, 2]) {
    const [px, py] = PL.toS(x, 0);
    ctx.save(); ctx.globalAlpha *= pu; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(px, py, 15, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// la scheda a destra: la funzione, i due punti, la regola
function sceneScheda(ctx, t) {
  const ca = life(t, 8.0, FINE + .5, .5, .6);
  if (ca <= 0) return;
  ctx.save(); ctx.globalAlpha *= ca;
  card(ctx, ...SCHEDA);
  drawRich(ctx, '{my:f(}{mx:x}{my:) = }{mx:x}{my:² − 4}', 1460, 180, { size: 52, local: t - 8.2 });
  const linea = (y, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1120, y); ctx.lineTo(1800, y); ctx.stroke(); ctx.restore(); };
  linea(240, P(t, 12.4, 12.8));
  drawRich(ctx, '{my:f(3) = 5}', 1130, 305, { size: 48, align: 'left', local: t - 12.6 });
  drawRich(ctx, '{mink:|5| = 5}', 1490, 305, { size: 48, align: 'left', local: t - 16.6 });
  checkMark(ctx, 1770, 305, P(t, 17.4, 18.2), C.g, .28);
  drawRich(ctx, '{my:f(1) = −3}', 1130, 395, { size: 48, align: 'left', local: t - 21.7 });
  drawRich(ctx, '{mink:|−3| = 3}', 1490, 395, { size: 48, align: 'left', local: t - 27.3 });
  linea(460, P(t, 38.9, 39.3));
  drawRich(ctx, 'sotto l\'asse: si {v:ribalta}', 1460, 520, { size: 38, local: t - 39.1 });
  drawRich(ctx, 'sopra l\'asse: {g:resta}', 1460, 590, { size: 38, local: t - 42.8 });
  drawRich(ctx, '{mink:y = |}{my:f(}{mx:x}{my:)}{mink:|}', 1460, 675, { size: 52, local: t - 47.2 });
  drawRich(ctx, 'punti angolosi in {mink:−2} e {mink:2}', 1460, 752, { size: 36, local: t - 55.3 });
  ctx.restore();
}

// 3 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Sopra l\'asse resta tutto com\'è,\nsotto si {v:ribalta} verso l\'alto.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'sopra l\'asse\n{g:resta com\'è}'], [960, 'sotto l\'asse\nsi {v:ribalta}'], [1430, 'punte dove il grafico\nattraversa l\'asse {mx:x}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, s, x, 520, { size: 36, weight: 400, lh: 1.45 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il grafico di |f(x)|', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 31.9, 'un punto alla volta'], [31.9, FINE, 'il tratto sotto l\'asse si ribalta']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
