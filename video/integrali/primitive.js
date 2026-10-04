'use strict';
/* Le primitive: la derivata letta al contrario; le primitive di x² sono tutte e sole x³/3 + c, con tangenti parallele. Argomento: integrali. */
CVIDEO.registra('integrali/primitive', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW,
    dot, glowStroke, dashed, arrowHead, card, checkMark } = M;
  const G = (x, c = 0) => x ** 3 / 3 + c;               // le primitive di x²
  // una sola notazione in tutto il video: x³/3 in riga, come nei fumetti

const FINE = 82.7, DUR = 93.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.2, 'pensa'], [6.6, 'neutro'],
  [12.8, 'pensa'], [15.2, 'neutro'], [18.1, 'felice'], [20.4, 'neutro'],
  [23.6, 'sorpreso'], [25.6, 'neutro'], [28.3, 'occhiolino'], [30.4, 'neutro'],
  [34.4, 'felice'], [36.6, 'neutro'], [45.0, 'sorpreso'], [47.0, 'felice'], [49.4, 'neutro'],
  [55.8, 'pensa'], [58.4, 'neutro'], [62.2, 'neutro'], [67.7, 'felice'], [70.0, 'neutro'],
  [73.5, 'occhiolino'], [75.6, 'neutro'], [78.0, 'pensa'], [80.4, 'neutro'],
  [83.7, 'felice'], [87.4, 'occhiolino'], [89.4, 'felice'],
];
const FUMETTI = [
  [2.2, 6.4, 'Quale funzione ha\nper derivata {my:x²}?'],
  [7.9, 12.7, 'Parto da una derivata nota:\n{mv:x³} diventa {my:3x²}.'],
  [12.8, 18.0, 'Il 3 è di troppo:\nallora parto da {mv:x³/3}.'],
  [18.1, 23.5, 'Derivata, ridà proprio {my:x²}:\n{mv:x³/3} è una {g:primitiva} di {my:x²}.'],
  [23.6, 28.2, 'Ma anche {mv:x³/3 + 1}\nha derivata {my:x²}.'],
  [28.3, 33.7, 'La derivata di una costante è {g:zero}:\nil + 1 sparisce.'],
  [34.4, 39.6, 'Vale con qualunque numero {mink:c}:\nogni {mink:c} dà una curva.'],
  [39.7, 44.9, 'Sono la stessa curva\n{v:spostata} in su o in giù.'],
  [45.0, 50.3, 'In ogni {mx:x} hanno la stessa\npendenza: tangenti {g:parallele}.'],
  [50.4, 55.7, 'In {mx:x} = 1 la pendenza\nè {my:1} per tutte.'],
  [55.8, 61.6, 'E non ce ne sono altre: due primitive\ndifferiscono per una costante.'],
  [62.2, 67.6, 'L\'insieme di tutte le primitive\nsi scrive con il segno {mink:∫}.'],
  [67.7, 73.4, 'Si chiama {v:integrale indefinito};\n{mx:dx} dice che la variabile è {mx:x}.'],
  [73.5, 77.9, '{mv:c} è la {v:costante di integrazione}.'],
  [78.0, 82.3, 'Senza {mv:+ c} ne scrivi\nuna sola.'],
  [83.7, 90.6, 'Le primitive di {my:x²} sono\ntutte e sole le {mv:x³/3 + c}.'],
];

// ---- aiutanti ----
// ∫ grande (il glifo di KaTeX allungato in verticale), poi il corpo
const SY = 1.75;
function intMisure(ctx, corpo, size) {
  ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; ctx.textBaseline = 'middle';
  const m = ctx.measureText('∫'), l = m.actualBoundingBoxLeft, r = m.actualBoundingBoxRight;
  const xc = l + r + size * .18;
  return { l, r, xc, w: xc + richW(ctx, corpo, size) };
}
function drawInt(ctx, corpo, x0, y, o = {}) {
  const size = o.size || 60, al = (o.alpha ?? 1) * P(o.local ?? 99, 0, .6, E.out);
  if (al <= 0.002) return;
  const m = intMisure(ctx, corpo, size);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.save(); ctx.translate(x0 + m.l, y); ctx.scale(1, SY);
  ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = css(C.ink); ctx.fillText('∫', 0, 0);
  ctx.restore();
  drawRich(ctx, corpo, x0 + m.xc, y, { size, align: 'left' });
  ctx.restore();
}
function freccia(ctx, a, b, col, k) {
  if (k <= 0) return;
  const e = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - 8, e[1]); ctx.stroke(); ctx.restore();
  arrowHead(ctx, e, 0, col, 1.2);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le primitive', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · la derivata al contrario: tre righe «parto da → derivo → arrivo» (7.5–34.2)
const XS = 720, XD = 1450, A0 = 930, A1 = 1220;
function riga(ctx, t, y, sin, des, t0, tDes) {
  if (t < t0) return;
  drawRich(ctx, sin, XS, y, { size: 62, local: t - t0 });
  const ka = P(t, t0 + .5, t0 + 1.1);
  freccia(ctx, [A0, y], [A1, y], C.dim, ka);
  txt(ctx, 'derivo', (A0 + A1) / 2, y - 34, { size: 30, color: C.dim, alpha: ka });
  if (des) drawRich(ctx, des, XD, y, { size: 62, local: t - tDes });
}
function sceneRighe(ctx, t) {
  if (t < 7.5 || t > 34.4) return;
  const al = life(t, 7.5, 34.2, .6, .6);
  card(ctx, 380, 140, 1440, 640, al);
  ctx.save(); ctx.globalAlpha *= al;
  riga(ctx, t, 250, '{mv:x³}', '{my:3x²}', 7.9, 9.1);
  // il risultato compare quando Ada lo commenta (18.1), non mentre dice «parto da x³/3»
  riga(ctx, t, 420, '{mv:x³/3}', '{my:3x²/3}{mink: = }{my:x²}', 12.9, 18.2);
  const kp = P(t, 18.6, 19.1);
  if (kp > 0) {
    drawRich(ctx, '{g:una primitiva di }{my:x²}', XS, 500, { size: 32, alpha: kp });
    checkMark(ctx, XD + 230, 420, P(t, 18.7, 19.7), C.g, .36);
  }
  // x³/3 + 1: la costante sparisce
  const k0 = P(t, 28.5, 29.1);
  riga(ctx, t, 620, '{mv:x³/3 + 1}', null, 23.7);
  if (t > 24.9) {
    // x² resta fermo; « + 0» entra alla sua destra (niente dissolvenze sovrapposte)
    drawRich(ctx, '{my:x²}', XD, 620, { size: 62, local: t - 24.9 });
    if (k0 > 0) drawRich(ctx, '{mink: + }{mg:0}', XD + richW(ctx, '{my:x²}', 62) / 2, 620, { size: 62, align: 'left', alpha: k0 });
  }
  if (k0 > 0) drawRich(ctx, '{dim:la derivata di 1 è 0}', XD, 705, { size: 30, alpha: k0 });
  ctx.restore();
}

// 2 · la famiglia di curve (34–FINE)
// piano più largo che alto; sugli assi solo il numero che serve (x = 1): le curve sono piatte proprio
// dove starebbero gli altri numeri, e li coprirebbero
const PL = (() => {
  const o = { ox: 780, oy: 455, ux: 140, uy: 95, x0: -2.4, x1: 2.4, y0: -3.3, y1: 3.1 };
  const p = { ...o, u: o.uy };
  p.toS = (x, y) => [o.ox + x * o.ux, o.oy - y * o.uy];
  p.curve = (fn, a, b, n) => { const pts = []; for (let i = 0; i <= n; i++) { const x = lerp(a, b, i / n); pts.push(p.toS(x, fn(x))); } return pts; };
  p.axes = (ctx, k) => {
    if (k <= 0) return;
    const { ox, oy, ux, uy, x0, x1, y0, y1 } = o;
    ctx.save();
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
    for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * ux; ctx.beginPath(); ctx.moveTo(x, oy - y1 * uy * k); ctx.lineTo(x, oy - y0 * uy * k); ctx.stroke(); }
    for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * uy; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, y); ctx.lineTo(ox + x1 * ux * k, y); ctx.stroke(); }
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ox + (x0 - .05) * ux * k, oy); ctx.lineTo(ox + (x1 + .1) * ux * k, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .05) * uy * k); ctx.lineTo(ox, oy - (y1 + .15) * uy * k); ctx.stroke();
    arrowHead(ctx, [ox + (x1 + .1) * ux * k + 6, oy], 0, C.ink);
    arrowHead(ctx, [ox, oy - (y1 + .15) * uy * k - 6], -Math.PI / 2, C.ink);
    ctx.globalAlpha *= P(k, .6, 1);
    txt(ctx, '1', ox + ux - 20, oy + 30, { size: 29, color: C.dim });      // a sinistra del tratteggio x = 1
    drawRich(ctx, '{mx:x}', ox + (x1 + .1) * ux + 34, oy, { size: 42 });
    drawRich(ctx, '{my:y}', ox + 26, oy - (y1 + .15) * uy - 6, { size: 42, align: 'left' });
    ctx.restore();
  };
  return p;
})();
const CARD = [380, 110, 800, 690];
const CS = [-2, -1, 0, 1, 2];
function curva(c) { return PL.curve(x => G(x, c), -2.4, 2.4, 160); }
const CURVE = CS.map(curva);
function sceneFamiglia(ctx, t) {
  if (t < 33.8 || t > FINE + .2) return;
  const al = life(t, 34.0, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  PL.axes(ctx, P(t, 34.1, 35.0));
  ctx.save(); ctx.beginPath(); ctx.rect(CARD[0] + 6, CARD[1] + 6, CARD[2] - 12, CARD[3] - 12); ctx.clip();
  // «senza + c» resta una curva sola
  const sola = P(t, 78.1, 78.7);
  CS.forEach((c, i) => {
    const k = P(t, 34.8 + i * .4, 35.8 + i * .4);
    const zero = c === 0;
    const a = zero ? 1 : .6 * (1 - .8 * sola);
    ctx.save(); ctx.globalAlpha *= a;
    glowStroke(ctx, CURVE[i], k, C.v, zero ? 6 : 4);
    ctx.restore();
  });
  // la stessa curva spostata: una copia di quella con c = 0 sale fino a c = 2
  // (non passa sulla colonna delle etichette accanto all'asse y)
  const gk = P(t, 39.9, 41.4), ga = life(t, 39.8, 43.6, .3, .6);
  if (ga > 0) {
    ctx.save(); ctx.globalAlpha *= ga * .9;
    ctx.beginPath(); ctx.rect(0, 0, W, 1080); ctx.rect(PL.ox - .5 * PL.ux, 0, .58 * PL.ux, 1080); ctx.clip('evenodd');
    ctx.translate(0, -2 * PL.u * gk);
    ctx.setLineDash([14, 10]); glowStroke(ctx, CURVE[2], 1, C.g, 5);
    ctx.restore();
    const p0 = PL.toS(-1.6, G(-1.6)), p1 = PL.toS(-1.6, G(-1.6) + 2 * gk);
    if (gk > .05) {
      ctx.save(); ctx.globalAlpha *= ga; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1] + 10); ctx.stroke(); ctx.restore();
      arrowHead(ctx, p1, -Math.PI / 2, C.g, 1.2 * ga);
    }
  }
  // le tangenti in x = 1, tutte con pendenza 1
  const ta = life(t, 45.2, 56.0, .5, .6);
  if (ta > 0) {
    ctx.save(); ctx.globalAlpha *= ta;
    dashed(ctx, PL.toS(1, -3.2), PL.toS(1, 3.05), C.x, 1, .7);
    CS.forEach((c, i) => {
      const y = G(1, c), d = .5, k = P(t, 45.3 + i * .15, 45.8 + i * .15);
      if (k <= 0) return;
      glowStroke(ctx, [PL.toS(1 - d * k, y - d * k), PL.toS(1 + d * k, y + d * k)], 1, C.g, 4);
      dot(ctx, PL.toS(1, y), C.v, k, 8);
    });
    ctx.restore();
  }
  ctx.restore();
  // dove ogni curva taglia l'asse y: proprio in c (l'etichetta sta sopra la curva, dove è piatta)
  const da = life(t, 39.9, FINE, .4, .6) * (1 - .8 * sola);
  if (da > 0) CS.forEach((c, i) => {
    const k = da * P(t, 39.9 + i * .12, 40.3 + i * .12, E.back);
    dot(ctx, PL.toS(0, c), C.v, k, 9);
    const q = PL.toS(-0.12, c);
    drawRich(ctx, '{mink:' + (c < 0 ? '−' : '') + Math.abs(c) + '}', q[0], q[1] - 28, { size: 30, align: 'right', alpha: k });
  });
  ctx.restore();
}

// la scheda a destra (34–FINE)
function scenePannello(ctx, t) {
  if (t < 34.2 || t > FINE + .2) return;
  const pa = life(t, 34.6, FINE, .5, .6);
  card(ctx, 1230, 150, 590, 600, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  // la famiglia (34.6–62.2)
  const a1 = 1 - P(t, 61.9, 62.5);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'le primitive di {my:x²}', 1525, 215, { size: 40, weight: 600 }));
    drawRich(ctx, '{mv:y = x³/3 + c}', 1525, 330, { size: 60, local: t - 35.0 });
    drawRich(ctx, '{dim:una curva per ogni numero }{mink:c}', 1525, 425, { size: 30, local: t - 35.6 });
    const kp = life(t, 50.5, 55.9, .5, .4);
    if (kp > 0) {
      ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= kp;
      ctx.beginPath(); ctx.moveTo(1280, 495); ctx.lineTo(1770, 495); ctx.stroke(); ctx.restore();
      drawRich(ctx, 'pendenza in {mx:x}{mink: = 1}', 1525, 560, { size: 34, alpha: kp, local: t - 50.5 });
      drawRich(ctx, '{my:1² = 1}', 1525, 650, { size: 56, alpha: kp, local: t - 51.0 });
    }
    const ka = P(t, 55.9, 56.4);
    if (ka > 0) {
      ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= ka;
      ctx.beginPath(); ctx.moveTo(1280, 495); ctx.lineTo(1770, 495); ctx.stroke(); ctx.restore();
      drawRich(ctx, 'due primitive di {my:x²}\ndifferiscono per\n{g:una costante}', 1525, 610, { size: 36, local: t - 55.9 });
    }
    ctx.restore();
  }
  // l'integrale indefinito (62.2–FINE)
  const a2 = P(t, 62.3, 62.9);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, 'tutte le primitive di {my:x²}', 1525, 215, { size: 38, weight: 600, alpha: 1 - P(t, 67.7, 68.1) }));
    conFont(TITOLI, () => drawRich(ctx, '{v:integrale indefinito}', 1525, 215, { size: 40, weight: 600, alpha: P(t, 68.2, 68.7) }));   // il vecchio titolo è già uscito
    const size = 60, corpo = '{my:x²}{mink: }{mx:dx}', resto = '{mink: = }{mv:x³/3 + c}', mi = intMisure(ctx, corpo, size);
    const wR = richW(ctx, resto, size), x0 = 1525 - (mi.w + wR) / 2, y = 380;
    drawInt(ctx, corpo, x0, y, { size, local: t - 62.4 });
    drawRich(ctx, resto, x0 + mi.w, y, { size, align: 'left', local: t - 62.9 });
    // dx: la variabile
    const kd = life(t, 67.8, 73.4, .4, .4);
    if (kd > 0) {
      const xd = x0 + mi.xc + richW(ctx, '{my:x²}{mink: }', size), wd = richW(ctx, '{mx:dx}', size);
      ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = css(C.x); ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(xd, y + 44); ctx.lineTo(xd + wd, y + 44); ctx.stroke(); ctx.restore();
      drawRich(ctx, '{dim:la variabile è }{mx:x}', xd + wd / 2, y + 90, { size: 30, alpha: kd });
    }
    // c: la costante di integrazione
    const kc = P(t, 73.6, 74.2);
    if (kc > 0) {
      const xc = x0 + mi.w + wR - richW(ctx, '{mv:c}', size) / 2;
      ctx.save(); ctx.globalAlpha *= kc;
      ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xc, y + 40); ctx.lineTo(xc, y + 150); ctx.lineTo(1735, y + 150); ctx.stroke();
      arrowHead(ctx, [xc, y + 36], -Math.PI / 2, C.v, 1);
      drawRich(ctx, 'costante di integrazione', 1715, y + 150, { size: 32, align: 'right' });
      ctx.restore();
    }
    // senza + c: una sola
    const ks = P(t, 78.1, 78.6);
    if (ks > 0) drawRich(ctx, '{dim:senza }{mv:+ c}{dim:: una curva sola}', 1525, 690, { size: 30, alpha: ks });
    ctx.restore();
  }
  ctx.restore();
}

// in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Una primitiva di {my:x²} è una funzione\nche, derivata, dà {my:x²}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mv:x³/3} → derivo → {my:x²}'], [960, 'tutte: {mv:x³/3 + c}'], [1430, 'tangenti {g:parallele}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 215, 450, 430, 100);
    drawRich(ctx, s, x, 502, { size: 34, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Le primitive', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 34.0, 'la derivata al contrario'], [34.0, 62.0, 'una famiglia di curve'], [62.0, FINE, 'il {mink:+ c}']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRighe(ctx, t); sceneFamiglia(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
