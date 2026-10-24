'use strict';
/* Le frecce che disegnano la soluzione — y′ = y: in ogni punto una freccia con pendenza y; una pallina che parte
   da (0; 1) segue le frecce e traccia eˣ, da (0; 2) traccia 2eˣ. Argomento: equazioni-differenziali. */
CVIDEO.registra('equazioni-differenziali/campo-direzioni', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW,
    dot, glowStroke, dashed, arrowHead, card, checkMark } = M;

const FINE = 89.7, DUR = 100.1;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.2, 'pensa'], [7.9, 'neutro'],
  [17.1, 'felice'], [19.4, 'neutro'], [27.0, 'neutro'], [40.9, 'sorpreso'], [43.1, 'neutro'],
  [54.3, 'pensa'], [58.4, 'neutro'], [67.1, 'felice'], [72.0, 'festa'], [75.8, 'neutro'],
  [80.0, 'felice'], [82.3, 'neutro'], [84.7, 'occhiolino'], [86.9, 'neutro'],
  [91.3, 'felice'], [95.5, 'occhiolino'],
];
// una frase per ogni cosa che succede; mentre Ada parla di uno stato il disegno sta fermo
const FUMETTI = [
  [2.2, 6.4, 'E se l’incognita di un’equazione\nfosse una {v:funzione}?'],
  // 1 · l'equazione
  [7.9, 12.2, 'In questa equazione l’incognita\nè una funzione: {my:y}, di {mx:x}.'],
  [12.3, 16.9, '{my:y′} è la sua derivata: la pendenza\ndel grafico in ogni punto.'],
  [17.0, 21.6, 'Un’equazione che lega una funzione\nalla sua derivata è {v:differenziale}.'],
  [21.7, 26.3, 'Qui chiede: in ogni punto la pendenza\nè uguale alla quota {my:y}.'],
  // 2 · il campo di direzioni
  [27.0, 31.0, 'Nel punto (1; 2) la pendenza\ndeve essere {g:2}.'],
  [31.1, 36.2, 'Nel punto (−1; 0,5)\ndeve essere {g:0,5}.'],
  [36.3, 40.7, 'Sull’asse {mx:x}, dove {my:y} = 0,\nla freccia è {g:orizzontale}.'],
  [40.8, 45.3, 'Una freccia in ogni punto:\nè il {v:campo di direzioni}.'],
  [45.4, 49.7, 'Più in alto, frecce più {g:ripide}:\nla pendenza è la quota.'],
  [49.8, 54.1, 'Sulla stessa riga, frecce {g:parallele}:\nconta solo {my:y}, non {mx:x}.'],
  // 3 · le soluzioni
  [54.3, 58.3, 'Metto una pallina nel punto (0; 1).'],
  [58.4, 62.9, 'La lascio andare: segue sempre\nla freccia del punto in cui è.'],
  [63.0, 67.0, 'All’indietro scende, sempre\npiù piatta, verso l’asse.'],
  [67.1, 71.9, 'La traccia è {my:y = eˣ}: la sua\nderivata è ancora {my:eˣ}.'],
  [72.0, 75.7, 'Pendenza uguale alla quota:\nè una {g:soluzione}!'],
  [75.8, 79.9, 'Da (0; 2) la pallina disegna\nun’altra curva…'],
  [80.0, 84.6, '…{my:y = 2eˣ}: anche lei ha\nderivata uguale a {my:y}.'],
  [84.7, 89.1, 'Ogni punto di partenza\ndà una {g:soluzione} diversa.'],
  // chiusura
  [91.3, 97.1, 'Le frecce danno la pendenza punto\nper punto: seguirle dà la {g:soluzione}.'],
];

// ---- il piano ----
const PO = { ox: 712, oy: 676, u: 108, x0: -2.5, x1: 2.2, y0: -.8, y1: 4.6 };
const toS = (x, y) => [PO.ox + x * PO.u, PO.oy - y * PO.u];
const CARD = [380, 110, 700, 690];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PO;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox - 26, oy - (y1 + .2) * u - 8, { size: 44, align: 'right' });   // a sinistra: a destra salgono le curve
  ctx.restore();
}
// i numeri degli assi sui bordi del riquadro, come un righello: vicino agli assi ci sono le frecce del campo
function numeri(ctx, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  for (const i of [-2, -1, 1, 2]) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), toS(i, 0)[0], PO.oy + 102, { size: 31, color: C.dim });
  for (const j of [1, 2, 3, 4]) txt(ctx, String(j), toS(-2.5, 0)[0] - 6, toS(0, j)[1], { size: 31, color: C.dim, align: 'right' });
  ctx.restore();
}
// una freccia del campo: centro (x; y), pendenza m
function freccia(ctx, x, y, m, col, al, L, w) {
  if (al <= 0) return;
  const c = toS(x, y), a = -Math.atan(m), dx = Math.cos(a) * L, dy = Math.sin(a) * L;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(c[0] - dx, c[1] - dy); ctx.lineTo(c[0] + dx * .8, c[1] + dy * .8); ctx.stroke();
  arrowHead(ctx, [c[0] + dx, c[1] + dy], a, col, w / 5.5);
  ctx.restore();
}
const XS = [], YS = [];
for (let i = 0; i <= 8; i++) XS.push(-2 + i * .5);
for (let j = 0; j <= 9; j++) YS.push(-.5 + j * .5);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le frecce che disegnano\nla soluzione', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 1 · l'equazione y′ = y (7.5–26.4)
function puntatore(ctx, a, b, col, al) {   // linea dal simbolo all'etichetta, con la punta sul simbolo
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(a[0], a[1] + 10); ctx.stroke();
  arrowHead(ctx, a, Math.atan2(a[1] - b[1], a[0] - b[0]), col, .9);
  ctx.restore();
}
function sceneEquazione(ctx, t) {
  if (t < 7.5 || t > 26.6) return;
  const al = life(t, 7.5, 26.4, .5, .5);
  card(ctx, 380, 150, 1440, 600, al);
  ctx.save(); ctx.globalAlpha *= al;
  const S = 120, a = '{my:y′}', b = '{mink: = }', c = '{my:y}';
  const wa = richW(ctx, a, S), wb = richW(ctx, b, S), wc = richW(ctx, c, S), x0 = 1100 - (wa + wb + wc) / 2, Y = 400;
  drawRich(ctx, a + b + c, 1100, Y, { size: S, local: t - 8.1 });
  // y: la funzione incognita
  const kf1 = P(t, 9.6, 10.1);
  puntatore(ctx, [x0 + wa + wb + wc / 2, Y + 78], [1400, 520], C.y, kf1);
  drawRich(ctx, 'la {v:funzione} incognita', 1420, 555, { size: 36, align: 'left', alpha: kf1 });
  drawRich(ctx, '{dim:dipende da }{mx:x}', 1420, 605, { size: 32, align: 'left', alpha: kf1 });
  // y′: la derivata
  const kf2 = P(t, 12.6, 13.1);
  puntatore(ctx, [x0 + wa / 2 - 10, Y + 78], [800, 520], C.y, kf2);
  drawRich(ctx, 'la sua {v:derivata}', 780, 555, { size: 36, align: 'right', alpha: kf2 });
  drawRich(ctx, '{dim:la pendenza del grafico}', 780, 605, { size: 32, align: 'right', alpha: kf2 });
  // il nome
  conFont(TITOLI, () => drawRich(ctx, '{v:equazione differenziale}', 1100, 235, { size: 50, weight: 600, local: t - 17.3 }));
  // che cosa chiede
  drawRich(ctx, '{dim:in ogni punto:} {g:pendenza} = quota {my:y}', 1100, 690, { size: 40, local: t - 22.0 });
  ctx.restore();
}

// 2–3 · il piano, il campo, le palline (26.4–FINE)
const X1 = Math.log(4.5), X2 = Math.log(2.25), XL = -2.4;
const sol = c => x => c * Math.exp(x);
function curvaTra(c, a, b) { const pts = []; const n = Math.max(2, Math.ceil((b - a) * 60)); for (let i = 0; i <= n; i++) { const x = lerp(a, b, i / n); pts.push(toS(x, c * Math.exp(x))); } return pts; }
// dove sta la pallina: avanti fino in cima, poi indietro fino al bordo sinistro
const xb1 = t => t < 63.2 ? lerp(0, X1, P(t, 58.7, 62.3, E.io)) : lerp(X1, XL, P(t, 63.2, 66.6, E.io));
const xb2 = t => t < 77.9 ? lerp(0, X2, P(t, 76.3, 77.7, E.io)) : lerp(X2, XL, P(t, 77.9, 79.7, E.io));
function traccia(ctx, c, xb, tGiro, t, al) {
  const x = xb(t), xmax = t < tGiro ? x : (c === 1 ? X1 : X2), xmin = Math.min(0, x);
  ctx.save(); ctx.globalAlpha *= al;
  if (xmax > 1e-3) glowStroke(ctx, curvaTra(c, 0, xmax), 1, C.y, 5);
  if (xmin < -1e-3) glowStroke(ctx, curvaTra(c, xmin, 0), 1, C.y, 5);
  ctx.restore();
}
function scenePiano(ctx, t) {
  if (t < 26.2 || t > FINE + .3) return;
  const al = life(t, 26.4, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  assi(ctx, P(t, 26.5, 27.3));
  // strisce che si accendono: una colonna (44,1), poi una riga (48,5)
  const hc = life(t, 45.6, 49.7, .4, .4), hr = life(t, 50.0, 54.1, .4, .4);
  ctx.save(); ctx.fillStyle = css(C.g, .13);
  if (hc > 0) { ctx.globalAlpha *= hc; const p = toS(1.5, 4.25); ctx.beginPath(); ctx.roundRect(p[0] - 30, p[1], 60, 5 * PO.u, 14); ctx.fill(); ctx.globalAlpha /= hc; }
  if (hr > 0) { ctx.globalAlpha *= hr; const p = toS(-2.25, 3.25); ctx.beginPath(); ctx.roundRect(p[0], p[1], 4.5 * PO.u, .5 * PO.u, 14); ctx.fill(); }
  ctx.restore();
  // il campo: prima la riga sull'asse x, poi tutto il resto
  const fondo = 1 - .4 * P(t, 54.3, 54.9), norm = P(t, 45.3, 45.9);
  XS.forEach((x, i) => YS.forEach((y, j) => {
    if (Math.abs(x - 1) < 1e-9 && Math.abs(y - 2) < 1e-9) return;
    if (Math.abs(x + 1) < 1e-9 && Math.abs(y - .5) < 1e-9) return;
    const asse = y === 0, t0 = asse ? 36.6 + i * .12 : 41.0 + j * .1 + i * .03;
    // le frecce sull'asse x sono verdi e spesse mentre se ne parla, sennò sparirebbero sulla linea nera
    if (asse) freccia(ctx, x, y, y, mix(C.g, C.v, norm), P(t, t0, t0 + .4) * lerp(1, .8 * fondo, norm), lerp(22, 17, norm), lerp(5, 3.5, norm));
    else freccia(ctx, x, y, y, C.v, .8 * fondo * P(t, t0, t0 + .4), 17, 3.5);
  }));
  // le due frecce del racconto: verdi e lunghe, poi uguali alle altre
  [[1, 2, 28.3], [-1, .5, 32.3]].forEach(([x, y, t0]) => {
    const k = P(t, t0, t0 + .5);
    if (k <= 0) return;
    freccia(ctx, x, y, y, mix(C.g, C.v, norm), k * lerp(1, .8 * fondo, norm), lerp(30, 17, norm), lerp(5.5, 3.5, norm));
  });
  // i due punti, con le loro coordinate (spariscono quando arriva il campo)
  [[1, 2, 27.2, '(1; 2)', 20, 34, 'left'], [-1, .5, 31.3, '(−1; 0,5)', 0, -44, 'center']].forEach(([x, y, t0, s, ex, ey, allinea]) => {
    const k = P(t, t0, t0 + .4, E.back) * (1 - P(t, 40.8, 41.2));
    if (k <= 0) return;
    dashed(ctx, toS(x, y), toS(x, 0), C.x, 1, .55 * k);
    dashed(ctx, toS(x, y), toS(0, y), C.y, 1, .55 * k);
    dot(ctx, toS(x, y), C.ink, k, 9);
    const p = toS(x, y);
    drawRich(ctx, s, p[0] + ex, p[1] + ey, { size: 34, align: allinea, alpha: k });
  });
  // 3 · le soluzioni, dentro il riquadro del piano
  ctx.save();
  const top = toS(0, 4.55)[1], bot = toS(0, -.75)[1];
  ctx.beginPath(); ctx.rect(toS(-2.48, 0)[0], top, 4.7 * PO.u, bot - top); ctx.clip();
  // le altre soluzioni (83,6)
  [[.5, 84.9], [3, 85.2], [-.5, 85.5]].forEach(([c, t0]) => {
    const k = P(t, t0, t0 + 1.2); if (k <= 0) return;
    const b = c > 0 ? Math.min(2.2, Math.log(4.55 / c)) : Math.log(.75 / -c);
    ctx.save(); ctx.globalAlpha *= .6; glowStroke(ctx, curvaTra(c, XL, b), k, C.y, 3.5); ctx.restore();
  });
  if (t > 58.6) traccia(ctx, 1, xb1, 62.3, t, 1);
  if (t > 76.2) traccia(ctx, 2, xb2, 77.7, t, 1);
  ctx.restore();
  const k1 = P(t, 54.7, 55.1, E.back) * (1 - P(t, 66.9, 67.3));
  if (k1 > 0) { const x = xb1(t); dot(ctx, toS(x, Math.exp(x)), C.y, k1, 14); }
  const k2 = P(t, 76.0, 76.3, E.back) * (1 - P(t, 79.9, 80.3));
  if (k2 > 0) { const x = xb2(t); dot(ctx, toS(x, 2 * Math.exp(x)), C.y, k2, 14); }
  numeri(ctx, P(t, 26.9, 27.4));
  ctx.restore();
}

// la scheda a destra (26.4–FINE)
const PX = 1485, CL = 1312, CR = 1658;
function riga(ctx, t, t0, y, punto, m) {
  const k = P(t, t0, t0 + .45, E.out); if (k <= 0) return;
  drawRich(ctx, punto, CL, y, { size: 44, alpha: k });
  txt(ctx, m, CR, y, { size: 44, weight: 600, color: C.g, alpha: k });
}
function colonna(ctx, t, x, testa, tT, f, tF, d, tD, tV) {
  drawRich(ctx, testa, x, 395, { size: 34, local: t - tT });
  drawRich(ctx, f, x, 470, { size: 52, local: t - tF });
  drawRich(ctx, d, x, 555, { size: 40, local: t - tD });
  checkMark(ctx, x, 650, P(t, tV, tV + 1), C.g, .32);
  drawRich(ctx, '{g:soluzione}', x, 718, { size: 32, alpha: P(t, tV + .4, tV + .8) });
}
function scenePannello(ctx, t) {
  if (t < 26.2 || t > FINE + .3) return;
  const al = life(t, 26.6, FINE, .6, .6);
  card(ctx, 1140, 140, 690, 640, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{my:y′ = y}', PX, 210, { size: 60, local: t - 26.8 });
  drawRich(ctx, '{dim:pendenza = quota }{my:y}', PX, 280, { size: 32, local: t - 27.0 });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1190, 325); ctx.lineTo(1780, 325); ctx.stroke();
  // 2 · punto → pendenza
  const a2 = 1 - P(t, 53.9, 54.3);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    txt(ctx, 'punto', CL, 370, { size: 30, color: C.dim, alpha: P(t, 27.2, 27.6) });
    txt(ctx, 'pendenza', CR, 370, { size: 30, color: C.dim, alpha: P(t, 27.2, 27.6) });
    riga(ctx, t, 28.5, 445, '(1; 2)', '2');
    riga(ctx, t, 32.5, 525, '(−1; 0,5)', '0,5');
    riga(ctx, t, 36.7, 605, '({mx:x}; 0)', '0');
    conFont(TITOLI, () => drawRich(ctx, '{v:campo di direzioni}', PX, 705, { size: 40, weight: 600, local: t - 41.1 }));
    ctx.restore();
  }
  // 3 · le due soluzioni
  if (t > 54.5) {
    colonna(ctx, t, CL, '{dim:da} (0; 1)', 54.7, '{my:y = eˣ}', 67.2, '{mink:(}{my:eˣ}{mink:)′ = }{my:eˣ}', 68.7, 72.1);
    colonna(ctx, t, CR, '{dim:da} (0; 2)', 76.0, '{my:y = 2eˣ}', 80.1, '{mink:(}{my:2eˣ}{mink:)′ = }{my:2eˣ}', 80.9, 81.7);
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
    drawRich(ctx, 'Seguire le frecce del campo\ndisegna le {g:soluzioni}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{my:y′ = y}', 44], [960, 'una freccia\nin ogni punto', 33], [1430, 'un punto di partenza,\nuna {g:soluzione}', 33]];
  pills.forEach(([x, s, size], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 445, 430, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.1, .5],                                                // y′ = y
    ['traccia', 9.6, 10.1], ['traccia', 12.6, 13.1], ['pop', 17.3, .7],               // le etichette, il nome
    ['pop', 22.0, .4],                                                                // pendenza = quota
    ['soffio', 26.4], ['traccia', 26.5, 27.3],                                        // il piano
    ['pop', 27.2, .55], ['traccia', 28.3, 28.8], ['pop', 28.5, .7],                   // (1; 2), pendenza 2
    ['pop', 31.3, .3], ['traccia', 32.3, 32.8], ['pop', 32.5, .4],                    // (−1; 0,5), pendenza 0,5
    ['tono', 36.6, 38.0, [.2, .2]],                                                   // le frecce sull'asse x
    ['tono', 41.0, 42.7, [.1, .9]],                                                   // il campo, riga dopo riga verso l'alto
    ['tono', 45.6, 46.6, [.1, .9]], ['tono', 50.0, 51.0, [.65, .65]],                 // la colonna, la riga
    ['soffio', 54.3], ['pop', 54.7, .4],                                              // la pallina in (0; 1)
    ['tono', 58.7, 62.3, [.32, .38, .48, .62, .8, 1]],                                // sale seguendo eˣ
    ['tono', 63.2, 66.6, [1, .7, .45, .3, .25, .22, .21]],                            // torna e scende verso l'asse
    ['pop', 67.2, .5], ['pop', 68.7, .6], ['ding', 72.1],                             // y = eˣ, derivata, soluzione
    ['pop', 76.0, .5], ['tono', 76.3, 77.7, [.5, .7, 1]],                             // la pallina in (0; 2)
    ['tono', 77.9, 79.7, [1, .5, .3, .24, .22]],
    ['pop', 80.1, .6], ['pop', 80.9, .65], ['ding', 81.7],                            // y = 2eˣ
    ['traccia', 84.9, 86.7],                                                          // altre soluzioni
    ['soffio', 89.9], ['pop', 92.1, .5], ['pop', 92.6, .6], ['pop', 93.1, .7],        // in una frase
  ];
  return {
    titolo: 'Le frecce che disegnano la soluzione', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 26.3, 'l’equazione'], [26.3, 54.1, 'il campo di direzioni'], [54.1, FINE, 'le soluzioni']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneEquazione(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
