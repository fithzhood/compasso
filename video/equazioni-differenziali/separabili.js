'use strict';
/* Separare le variabili — y′ = −0,5·y con y(0) = 8: le y a sinistra, le x a destra, si integra; viene
   y = 8·e^(−0,5x), che combacia con le frecce e si dimezza ogni ln 2 / 0,5 ≈ 1,39. Argomento: equazioni-differenziali. */
CVIDEO.registra('equazioni-differenziali/separabili', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW,
    dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 83.6, DUR = 93.7;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.2, 'pensa'], [7.9, 'neutro'],
  [16.5, 'occhiolino'], [18.6, 'neutro'], [21.1, 'felice'], [23.3, 'neutro'],
  [29.5, 'pensa'], [33.9, 'neutro'], [39.0, 'felice'], [41.2, 'neutro'], [43.3, 'sorpreso'], [45.4, 'neutro'],
  [47.7, 'festa'], [52.6, 'neutro'], [57.5, 'felice'], [59.7, 'neutro'],
  [62.5, 'sorpreso'], [64.6, 'neutro'], [70.0, 'felice'], [72.0, 'neutro'], [74.0, 'pensa'],
  [78.3, 'felice'], [80.5, 'neutro'], [85.2, 'felice'], [89.5, 'occhiolino'],
];
const FUMETTI = [
  [2.2, 6.4, 'Come si risolve un’equazione\ndifferenziale, coi conti?'],
  // 1 · i conti
  [7.9, 12.6, 'Una quantità cala in proporzione\na quanto ce n’è: ecco l’equazione.'],
  [12.7, 16.4, 'All’inizio ne ho 8: {my:y(0) = 8}.'],
  [16.5, 21.0, 'Scrivo {my:y′} come {my:dy}{mink:/}{mx:dx}:\nè la stessa derivata.'],
  [21.1, 25.5, 'Separo: le {my:y} a sinistra,\nle {mx:x} a destra.'],
  [25.6, 29.4, 'Integro i due membri.'],
  [29.5, 33.8, 'A sinistra {mink:ln |}{my:y}{mink:|}, cioè {mink:ln }{my:y}:\n{my:y} è positiva, parte da 8.'],
  [33.9, 38.9, 'A destra {mink:−0,5}{mx:x}, più una\ncostante {mv:c}, una sola per tutti e due.'],
  [39.0, 43.2, 'Con {mx:x} = 0 e {my:y} = 8:\n{mv:c}{mink: = ln 8}.'],
  [43.3, 47.6, 'Elevo {mink:e} ai due membri:\nil logaritmo se ne va.'],
  [47.7, 52.2, 'Ecco {my:y}: 8 per un’esponenziale\nche scende.'],
  // 2 · le frecce
  [52.6, 57.4, 'Il campo di direzioni: in alto\nle frecce scendono ripide.'],
  [57.5, 62.2, 'La soluzione trovata coi conti\nsegue le frecce, da (0; 8).'],
  // 3 · si dimezza
  [62.5, 66.6, 'Da 8 a 4, {mx:x} avanza di circa 1,39.'],
  [66.6, 69.9, 'Da 4 a 2: ancora circa 1,39.'],
  [70.0, 73.5, 'Da 2 a 1: di nuovo circa 1,39.'],
  [73.6, 78.3, 'Avanzare di {mx:Δx} moltiplica {my:y}\nsempre per lo stesso fattore.'],
  [78.4, 83.3, 'Il fattore è 1/2 quando\n{mx:Δx}{mink: ≈ 1,39}.'],
  // chiusura
  [85.2, 90.9,'Separare le variabili: le {my:y} da una\nparte, le {mx:x} dall’altra, poi integrare.'],
];

// ---- formule in riga con esponenti lunghi, frazioni e il segno di integrale ----
// pezzi: stringa (testo ricco), ['^', stringa] esponente, { num, den } frazione, 'INT' il segno ∫
const SY = 1.75;
function largo(ctx, p, size) {
  if (p === 'INT') { ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; const m = ctx.measureText('∫'); return m.actualBoundingBoxLeft + m.actualBoundingBoxRight + size * .2; }
  if (Array.isArray(p)) return richW(ctx, p[1], size * .68) + size * .04;
  if (typeof p === 'object') return Math.max(richW(ctx, p.num, size), richW(ctx, p.den, size)) + size * .3;
  return richW(ctx, p, size);
}
function riga(ctx, pezzi, x, y, size, o) {
  o = o || {};
  const al = (o.alpha != null ? o.alpha : 1) * P(o.local != null ? o.local : 99, 0, .5, E.out);
  if (al <= .002) return 0;
  const ws = pezzi.map(p => largo(ctx, p, size)), tot = ws.reduce((a, b) => a + b, 0);
  let cx = o.align === 'right' ? x - tot : o.align === 'left' ? x : x - tot / 2;
  const dy = (1 - P(o.local != null ? o.local : 99, 0, .5, E.out)) * 14;
  ctx.save(); ctx.globalAlpha *= al;
  pezzi.forEach((p, i) => {
    if (p === 'INT') {
      ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; const m = ctx.measureText('∫');
      ctx.save(); ctx.translate(cx + m.actualBoundingBoxLeft, y + dy); ctx.scale(1, SY);
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = css(o.colInt || C.ink); ctx.fillText('∫', 0, 0); ctx.restore();
    } else if (Array.isArray(p)) drawRich(ctx, p[1], cx + size * .02, y + dy - size * .42, { size: size * .68, align: 'left' });
    else if (typeof p === 'object') {
      const m = cx + ws[i] / 2;
      ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2, size * .05);
      ctx.beginPath(); ctx.moveTo(cx + size * .1, y + dy); ctx.lineTo(cx + ws[i] - size * .1, y + dy); ctx.stroke(); ctx.restore();
      drawRich(ctx, p.num, m, y + dy - size * .58, { size });
      drawRich(ctx, p.den, m, y + dy + size * .62, { size });
    } else drawRich(ctx, p, cx, y + dy, { size, align: 'left' });
    cx += ws[i];
  });
  ctx.restore();
  return tot;
}
const ESP = ['^', '{mink:−0,5}{mx:x}'];
const SOL = ['{my:y}{mink: = 8 · e}', ESP];
const SOLV = ['{mg:y = 8 · e}', ['^', '{mg:−0,5x}']];
function kfm(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], P(t, keys[i - 1][0], keys[i][0], E.io));
  return keys[keys.length - 1][1];
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Separare le variabili', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · i conti, una riga dopo l'altra, allineati sull'uguale (7.5–52.3)
const XE = 1080, S1 = 54;
const RIGHE = [
  { L: ['{my:y′}'], R: ['{mink: = −0,5 · }{my:y}'], t: 8.2 },
  { L: [{ num: '{my:dy}', den: '{mx:dx}' }], R: ['{mink: = −0,5 · }{my:y}'], t: 16.8 },
  { L: [{ num: '{my:dy}', den: '{my:y}' }], R: ['{mink: = −0,5 }{mx:dx}'], t: 21.4 },
  { L: ['INT', { num: '{my:dy}', den: '{my:y}' }], R: ['{mink: = }', 'INT', '{mink:−0,5 }{mx:dx}'], t: 25.9 },
  { L: ['{mink:ln |}{my:y}{mink:|}'], L2: ['{mink:ln }{my:y}'], tL2: 31.6, R: ['{mink: = −0,5}{mx:x}{mink: + }{mv:c}'], t: 29.9, tR: 34.3 },
  { L: ['{mv:c}'], R: ['{mink: = ln 8}'], t: 39.4 },
  { L: ['{my:y}'], R: ['{mink: = e}', ['^', '{mink:−0,5}{mx:x}{mink: + ln 8}']], t: 43.7, R2: ['{mink: = 8 · e}', ESP], t2: 48.0 },
];
const scorri = t => kfm(t, [[29.3, 0], [29.8, 1], [38.9, 1], [39.3, 2], [43.2, 2], [43.6, 3]]);
function sceneConti(ctx, t) {
  if (t < 7.5 || t > 52.6) return;
  const al = life(t, 7.5, 52.3, .5, .5);
  card(ctx, 380, 150, 1440, 600, al);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(380, 152, 1440, 596); ctx.clip();
  const sh = scorri(t);
  RIGHE.forEach((r, i) => {
    if (t < r.t) return;
    const pos = i - sh, a = clamp(1 + pos);
    if (a <= 0) return;
    const y = 240 + 135 * pos;
    ctx.save(); ctx.globalAlpha *= a;
    if (r.L2) {
      riga(ctx, r.L, XE - 6, y, S1, { align: 'right', local: t - r.t, alpha: 1 - P(t, r.tL2, r.tL2 + .4) });
      riga(ctx, r.L2, XE - 6, y, S1, { align: 'right', alpha: P(t, r.tL2 + .3, r.tL2 + .7) });
    } else riga(ctx, r.L, XE - 6, y, S1, { align: 'right', local: t - r.t });
    const tR = r.tR || r.t + .2;
    const wR = t > tR ? riga(ctx, r.R, XE, y, S1, { align: 'left', local: t - tR }) : 0;
    if (r.R2 && t > r.t2) riga(ctx, r.R2, XE + wR, y, S1, { align: 'left', local: t - r.t2 });
    // accanto alle righe: la condizione, dove vanno le variabili, i valori usati
    if (i === 0) drawRich(ctx, '{my:y(0) = 8}', 1560, y, { size: S1, local: t - 13.0 });
    if (i === 2) {
      drawRich(ctx, '{dim:divido per }{my:y}{mink: ≠ 0}', 900, y, { size: 34, align: 'right', local: t - 21.8 });
      drawRich(ctx, '{dim:le }{my:y}{dim: a sinistra, le }{mx:x}{dim: a destra}', 1400, y, { size: 32, align: 'left', alpha: life(t, 22.2, 25.6, .4, .4) });
    }
    if (i === 4) drawRich(ctx, '{mink:ln |}{my:y}{mink:| = ln }{my:y}{dim: perché }{my:y}{dim: > 0}', 870, y, { size: 34, align: 'right', local: t - 31.2 });
    if (i === 5) drawRich(ctx, '{dim:con }{mx:x}{dim: = 0 e }{my:y}{dim: = 8:}', 960, y, { size: 32, align: 'right', local: t - 39.6 });
    ctx.restore();
  });
  ctx.restore();
}

// 2–3 · il piano: il campo, la soluzione, i dimezzamenti (52.3–FINE)
const PO = { ox: 493, oy: 714, ux: 88, uy: 60, x0: -.6, x1: 6.4, y0: -.8, y1: 9.2 };
const toS = (x, y) => [PO.ox + x * PO.ux, PO.oy - y * PO.uy];
const T2 = 2 * Math.log(2);
const f = x => 8 * Math.exp(-.5 * x);
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
  // i numeri sui bordi, come un righello: vicino agli assi passano frecce e curve
  for (let i = 1; i <= 6; i++) txt(ctx, String(i), toS(i, 0)[0], toS(0, y0)[1] + 22, { size: 31, color: C.dim });
  for (const j of [2, 4, 6, 8]) txt(ctx, String(j), toS(x0, 0)[0] - 8, toS(0, j)[1], { size: 31, color: C.dim, align: 'right' });
  ctx.restore();
}
function freccia(ctx, x, y, m, col, al) {
  if (al <= 0) return;
  const c = toS(x, y), a = -Math.atan(m * PO.uy / PO.ux), L = 15, dx = Math.cos(a) * L, dy = Math.sin(a) * L;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(c[0] - dx, c[1] - dy); ctx.lineTo(c[0] + dx * .8, c[1] + dy * .8); ctx.stroke();
  arrowHead(ctx, [c[0] + dx, c[1] + dy], a, col, .64);
  ctx.restore();
}
// un'etichetta su un fondino di carta, sopra frecce e curve
function etichetta(ctx, s, x, y, size, al, allinea) {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 14, x0 = allinea === 'left' ? x - 7 : allinea === 'right' ? x - w + 7 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.paper, .94);
  ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 8); ctx.fill(); ctx.restore();
  drawRich(ctx, s, x, y, { size, align: allinea || 'center', alpha: al });
}
const CURVA = (() => { const pts = []; for (let i = 0; i <= 160; i++) { const x = 6.4 * i / 160; pts.push(toS(x, f(x))); } return pts; })();
const PASSI = [62.8, 67.0, 70.2];
function scenePiano(ctx, t) {
  if (t < 52.0 || t > FINE + .3) return;
  const al = life(t, 52.3, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 380, 110, 760, 690);
  assi(ctx, P(t, 52.4, 53.2));
  // il campo: prima le righe in alto
  const fondo = .75 * (1 - .55 * P(t, 62.4, 62.9));
  for (let j = 0; j < 9; j++) for (let i = 0; i < 13; i++) {
    const x = .25 + .5 * i, y = 8.5 - j, t0 = 52.8 + j * .1 + i * .02;
    freccia(ctx, x, y, -.5 * y, C.v, fondo * P(t, t0, t0 + .4));
  }
  // la soluzione dei conti, dal punto (0; 8)
  ctx.save(); ctx.beginPath(); ctx.rect(toS(-.5, 0)[0], toS(0, 9.15)[1], 7 * PO.ux, 10 * PO.uy); ctx.clip();
  glowStroke(ctx, CURVA, P(t, 57.9, 60.6, E.io), C.g, 5.5);
  ctx.restore();
  // i dimezzamenti: si scende della metà, si avanza di 1,39
  PASSI.forEach((t0, k) => {
    if (t < t0) return;
    const x0 = k * T2, x1 = (k + 1) * T2, ya = 8 / 2 ** k, yb = ya / 2;
    dashed(ctx, toS(x0, ya), toS(x0, yb), C.y, P(t, t0, t0 + .5), 1);
    const kh = P(t, t0 + .4, t0 + 1.0);
    if (kh > 0) {
      const a = toS(x0, yb), b = toS(x1, yb), e = [lerp(a[0], b[0], kh), a[1]];
      ctx.save(); ctx.strokeStyle = css(C.x); ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - 8, e[1]); ctx.stroke(); ctx.restore();
      arrowHead(ctx, e, 0, C.x, .9);
    }
    etichetta(ctx, '≈ 1,39', toS((x0 + x1) / 2, 0)[0], toS(0, yb)[1] + 24, 30, P(t, t0 + .9, t0 + 1.3));
  });
  // i punti e i loro valori
  const kp0 = P(t, 57.6, 58.0, E.back);
  if (kp0 > 0) { dot(ctx, toS(0, 8), C.ink, kp0, 10); etichetta(ctx, '(0; 8)', toS(0, 8)[0] + 22, toS(0, 8)[1] - 4, 34, clamp(kp0), 'left'); }
  PASSI.forEach((t0, k) => {
    const kp = P(t, t0 + 1.0, t0 + 1.4, E.back); if (kp <= 0) return;
    const x = (k + 1) * T2, y = 8 / 2 ** (k + 1), p = toS(x, y);
    dot(ctx, p, C.ink, kp, 9);
    etichetta(ctx, '{g:' + y + '}', p[0] + 16, p[1] - 30, 36, clamp(kp), 'left');
  });
  ctx.restore();
}

// la scheda a destra (52.3–FINE)
const PX = 1510;
function linea(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1240, y); ctx.lineTo(1780, y); ctx.stroke(); ctx.restore();
}
function scenePannello(ctx, t) {
  if (t < 52.0 || t > FINE + .3) return;
  const al = life(t, 52.5, FINE, .6, .6);
  card(ctx, 1190, 140, 640, 640, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{my:y′}{mink: = −0,5 · }{my:y}', PX, 205, { size: 48, local: t - 52.8 });
  drawRich(ctx, '{my:y(0) = 8}', PX, 270, { size: 44, local: t - 53.0 });
  linea(ctx, 315, P(t, 53.0, 53.4));
  txt(ctx, 'soluzione', PX, 362, { size: 30, color: C.dim, alpha: P(t, 53.2, 53.6) });
  riga(ctx, SOLV, PX, 432, 56, { local: t - 53.4 });
  // 3 · perché il passo è sempre lo stesso
  linea(ctx, 482, P(t, 73.7, 74.1));
  drawRich(ctx, '{my:y(}{mx:x + Δx}{my:)}{mink: =}', PX, 532, { size: 42, local: t - 73.8 });
  riga(ctx, ['{my:y(}{mx:x}{my:)}{mink: · e}', ['^', '{mink:−0,5 · }{mx:Δx}']], PX, 598, 42, { local: t - 74.5 });
  riga(ctx, ['{mink:e}', ['^', '{mink:−0,5 · }{mx:Δx}'], '{mink: = 1/2}'], PX, 670, 44, { local: t - 78.6 });
  drawRich(ctx, '{mx:Δx}{mink: = ln 2 / 0,5 ≈ }{mg:1,39}', PX, 742, { size: 44, local: t - 80.2 });
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le {my:y} da una parte, le {mx:x} dall’altra,\npoi si integrano i due membri.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'separo', ['{my:dy}{mink:/}{my:y}{mink: = −0,5 }{mx:dx}']], [960, 'integro', ['{mink:ln }{my:y}{mink: = −0,5}{mx:x}{mink: + }{mv:c}']], [1430, 'la soluzione', SOLV]];
  pills.forEach(([x, testa, f], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    txt(ctx, testa, x, 486, { size: 30, weight: 400, color: C.dim });
    riga(ctx, f, x, 550, 46);
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.2, .5], ['pop', 13.0, .55],                            // y′ = −0,5 · y, y(0) = 8
    ['pop', 16.8, .5],                                                                // dy/dx
    ['traccia', 21.4, 22.0], ['pop', 21.8, .4], ['pop', 22.2, .6],                    // separo
    ['traccia', 25.9, 26.5], ['pop', 26.1, .5],                                       // integro
    ['tono', 29.3, 29.8, [.5, .7]], ['pop', 29.9, .45], ['pop', 34.3, .6],            // ln y = −0,5x + c
    ['tono', 38.9, 39.3, [.5, .7]], ['pop', 39.4, .55],                               // c = ln 8
    ['tono', 43.2, 43.6, [.5, .7]], ['pop', 43.7, .5], ['ding', 48.0],                // y = 8 · e^(−0,5x)
    ['soffio', 52.3], ['traccia', 52.4, 53.2],                                        // il piano
    ['tono', 52.8, 54.0, [.9, .1]],                                                   // il campo, dall'alto
    ['pop', 53.4, .6], ['pop', 57.6, .8],                                             // la soluzione, (0; 8)
    ['tono', 57.9, 60.6, [.8, .5, .3, .18, .1, .06]],                                 // la curva scende sempre più piano
    ['tono', 62.8, 63.3, [.8, .4]], ['traccia', 63.2, 63.8], ['pop', 63.8, .4],       // 8 → 4
    ['tono', 67.0, 67.5, [.4, .2]], ['traccia', 67.4, 68.0], ['pop', 68.0, .2],       // 4 → 2
    ['tono', 70.2, 70.7, [.2, .1]], ['traccia', 70.6, 71.2], ['pop', 71.2, .1],       // 2 → 1
    ['pop', 73.7, .45], ['pop', 74.5, .55], ['pop', 78.6, .6], ['ding', 80.2],        // il fattore, Δx ≈ 1,39
    ['soffio', 83.8], ['pop', 86.0, .5], ['pop', 86.5, .6], ['pop', 87.0, .7],        // in una frase
  ];
  return {
    titolo: 'Separare le variabili', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 52.3, 'i conti'], [52.3, 62.3, 'la soluzione e le frecce'], [62.3, FINE, 'si dimezza']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneConti(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});


