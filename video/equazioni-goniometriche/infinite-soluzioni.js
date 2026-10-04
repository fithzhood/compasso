'use strict';
/* sin x = 1/2 — la retta y = 1/2 taglia la circonferenza goniometrica in due punti simmetrici rispetto
   all'asse y (π/6 e 5π/6); un giro intero riporta allo stesso punto, quindi x = π/6 + 2nπ oppure
   x = 5π/6 + 2nπ, con n ∈ ℤ. Argomento: equazioni-goniometriche. */
CVIDEO.registra('equazioni-goniometriche/infinite-soluzioni', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 71.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [17.4, 'felice'], [19.6, 'neutro'],
  [38.1, 'sorpreso'], [40.3, 'neutro'], [57.3, 'felice'], [59.5, 'neutro'], [66.8, 'festa'], [69.2, 'felice'],
  [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; il punto gira solo nei fumetti 7, 9 e 10
const FUMETTI = [
  [2.0, 6.5, 'Per quali angoli il seno\nvale un mezzo?'],
  // 1 · la retta y = 1/2
  [7.9, 12.7, 'Il seno di un angolo {mv:x} è l’ordinata\ndel suo punto sulla circonferenza.'],
  [12.9, 17.2, 'Cerco le ordinate uguali a {my:1/2}:\nla retta {my:y = 1/2}.'],
  [17.4, 21.2, 'Taglia la circonferenza\nin {g:due punti}.'],
  [21.4, 25.2, 'Il primo è l’angolo {mv:π/6},\ncioè 30°.'],
  [25.4, 29.4, 'L’altro è il suo simmetrico\nrispetto all’asse {my:y}.'],
  [29.6, 33.6, 'Il suo angolo è {mv:π − π/6 = 5π/6},\ncioè 150°.'],
  // 2 · girando si ritorna
  [33.8, 37.9, 'Faccio fare al punto\nun giro intero da {mv:π/6}…'],
  [38.1, 42.4, '…e torna nello stesso punto:\n{mv:π/6 + 2π} ha ancora seno {my:1/2}.'],
  [42.6, 47.2, 'Ogni giro in più ne dà un’altra:\n{mv:π/6 + 4π}, {mv:π/6 + 6π}…'],
  [47.4, 51.6, 'Anche all’indietro: un giro\nal contrario dà {mv:π/6 − 2π}.'],
  [51.8, 57.1, 'Conto i giri con un numero intero\n{mink:n}: 0, 1, 2… ma anche −1, −2…'],
  [57.3, 62.0, '{mv:x}{mink: = }{mv:π/6}{mink: + 2nπ}, con {mink:n ∈ ℤ}:\n{mink:ℤ} è l’insieme dei numeri interi.'],
  [62.2, 66.6, 'Lo stesso per l’altro punto:\n{mv:x}{mink: = }{mv:5π/6}{mink: + 2nπ}.'],
  [66.8, 71.0, 'Due punti per giro, infiniti giri:\n{g:infinite soluzioni}.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Due punti in un giro, poi si\naggiunge {mink:2nπ}: i giri interi.'],
];

// il piano: la circonferenza goniometrica intera
const O = [520, 450], U = 260;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const CARD = [120, 110, 800, 690];
const RAD = Math.PI / 180;
const cA = Math.cos(30 * RAD);   // ascissa del punto di π/6; quello di 5π/6 ha −cA
// il punto gira solo in questi tratti: [inizio, fine, angolo di partenza, angolo d'arrivo] in gradi
const GIRI = [[34.4, 37.4, 30, 390], [43.0, 47.0, 30, 1110], [47.8, 50.6, 30, -330]];
const MOV = GIRI.map(g => [g[0], g[1]]);
function angolo(t) { for (const [a, b, d0, d1] of GIRI) if (t >= a && t <= b) return lerp(d0, d1, P(t, a, b)); return 30; }
const giro = t => GIRI.find(g => t >= g[0] - .1 && t <= g[1] + .6);
// mentre il punto gira le etichette degli angoli si spengono: il raggio le attraverserebbe
const fermo = t => 1 - life(t, 34.0, 51.0, .35, .4);

function linea(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function numero(ctx, s, p, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.roundRect(p[0] - 26, p[1] - 21, 52, 42, 9); ctx.fill();
  txt(ctx, s, p[0], p[1], { size: 34, color: C.dim });
  ctx.restore();
}
function arco(ctx, r, a0, a1, col, al, w = 4) {
  if (al <= 0 || Math.abs(a1 - a0) < .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w;
  ctx.beginPath(); ctx.arc(O[0], O[1], r * U, -a0 * RAD, -a1 * RAD, a1 > a0); ctx.stroke(); ctx.restore();
}
let kAsseX = 1;
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S(-1.38 * k, 0)); ctx.lineTo(...S(1.4 * k, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S(0, -1.28 * k)); ctx.lineTo(...S(0, 1.24 * k)); ctx.stroke();
  arrowHead(ctx, [S(1.4 * k, 0)[0] + 6, O[1]], 0, C.ink);
  arrowHead(ctx, [O[0], S(0, 1.24 * k)[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', S(1.4, 0)[0] + 2, O[1] - 36, { size: 44, alpha: kAsseX });
  drawRich(ctx, '{my:y}', O[0] + 34, S(0, 1.24)[1] + 6, { size: 44 });
  ctx.restore();
}
const fr = (n, d) => ({ num: n, den: d });

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{mink:sin }{mv:x}{mink: = 1/2}', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la figura (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  kAsseX = 1 - life(t, 9.2, 13.5, .4, .4);
  assi(ctx, P(t, 7.7, 8.7));
  const kc = P(t, 7.9, 9.0, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, -2 * Math.PI * kc, true); ctx.stroke(); ctx.restore();
  }
  const kn = P(t, 8.8, 9.2);
  numero(ctx, '1', S(1.1, -.11), kn); numero(ctx, '−1', S(-1.13, -.11), kn);
  numero(ctx, '1', S(-.11, 1.1), kn); numero(ctx, '−1', S(-.14, -1.1), kn);

  // F1: un angolo qualunque e la sua ordinata
  const kq = life(t, 9.4, 13.3, .5, .4);
  if (kq > 0) {
    const a = 50 * RAD, Q = S(Math.cos(a), Math.sin(a));
    ctx.save(); ctx.globalAlpha *= kq;
    linea(ctx, O, Q, C.ink, 4);
    arco(ctx, .2, 0, 50, C.v, 1);
    drawRich(ctx, '{mv:x}', ...S(.32 * Math.cos(25 * RAD), .32 * Math.sin(25 * RAD)), { size: 44, alpha: P(t, 9.9, 10.3) });
    const ko = P(t, 10.4, 11.0);
    if (ko > 0) glowStroke(ctx, [S(Math.cos(a), 0), S(Math.cos(a), Math.sin(a) * ko)], 1, C.y, 7);
    dot(ctx, Q, C.v, 1, 10);
    ctx.restore();
  }

  const fe = fermo(t);
  // F5: l'asse y, asse di simmetria
  const kS = life(t, 25.6, 29.4, .4, .5);
  if (kS > 0) { ctx.save(); ctx.globalAlpha *= kS * .7; glowStroke(ctx, [S(0, -1.2), S(0, 1.18)], 1, C.y, 6); ctx.restore(); }
  // la retta y = 1/2
  const kL = P(t, 13.4, 14.4);
  if (kL > 0) glowStroke(ctx, [S(-1.3, .5), S(-1.3 + 2.6 * kL, .5)], 1, C.y, 4);
  drawSeq(ctx, ['{my:y =}', fr('{my:1}', '{my:2}')], ...S(1.22, .8), 40, { alpha: P(t, 14.2, 14.6) });

  // gli angoli dei due punti: archi e nomi, spenti mentre il punto gira
  arco(ctx, .15, 0, 30, C.v, P(t, 21.9, 22.2) * fe);
  drawRich(ctx, '{mv:π/6}', ...S(.5, .14), { size: 42, alpha: P(t, 22.4, 22.8) * fe });
  arco(ctx, .22, 0, kf(t, [[29.9, 0], [30.9, 150]]), C.v, P(t, 29.9, 30.0) * fe, 3);
  drawRich(ctx, '{mv:5π/6}', ...S(-.3, .36), { size: 42, alpha: P(t, 30.8, 31.2) * fe });

  // i raggi dei due punti (il secondo nasce dal primo, ribaltato sull'asse y)
  const fermi = 1 - .5 * life(t, 34.0, 51.0, .35, .4);
  linea(ctx, O, S(cA, .5), C.ink, 4, P(t, 21.8, 22.3), fermi);
  const kF = P(t, 26.4, 27.8);
  if (kF > 0) linea(ctx, O, S(lerp(cA, -cA, kF), .5), C.ink, 4, 1, fermi);

  // il punto che gira, con la spirale dei giri fatti
  const g = giro(t);
  if (g) {
    const [a0, a1, d0] = g, th = angolo(t), al = life(t, a0 - .2, a1 + .6, .2, .4);
    ctx.save(); ctx.globalAlpha *= al;
    const pts = [], n = Math.max(2, Math.ceil(Math.abs(th - d0) / 4));
    for (let i = 0; i <= n; i++) { const f = lerp(d0, th, i / n), r = .14 + .03 * Math.abs(f - d0) / 360; pts.push(S(r * Math.cos(f * RAD), r * Math.sin(f * RAD))); }
    if (Math.abs(th - d0) > 1) {
      glowStroke(ctx, pts, 1, C.v, 3);
      const p1 = pts[pts.length - 1], p0 = pts[pts.length - 2];
      arrowHead(ctx, p1, Math.atan2(p1[1] - p0[1], p1[0] - p0[0]), C.v, .8);
    }
    linea(ctx, O, S(Math.cos(th * RAD), Math.sin(th * RAD)), C.v, 5);
    dot(ctx, S(Math.cos(th * RAD), Math.sin(th * RAD)), C.v, 1, 12);
    ctx.restore();
  }

  // i due punti
  const pulsa = 1 + .45 * life(t, 67.0, 70.6, .5, .6);
  dot(ctx, O, C.ink, P(t, 8.0, 8.3, E.back), 8);
  dot(ctx, S(cA, .5), C.g, P(t, 17.8, 18.2, E.back) * pulsa, 12);
  dot(ctx, S(-cA, .5), C.g, P(t, 18.1, 18.5, E.back) * pulsa, 12);
  ctx.restore();
}

// la scheda a destra: l'equazione, le soluzioni trovate, le due famiglie
const XL = 1190, XR = 1660;
const RIGHE = [[22.4, '{mv:π/6}', '0'], [38.4, '{mv:π/6 + 2π}', '1'], [45.7, '{mv:π/6 + 4π}', '2'], [47.0, '{mv:π/6 + 6π}', '3'], [50.8, '{mv:π/6 − 2π}', '−1']];
function scatola(ctx, x, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g, .75); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - 165, y - 58, 330, 116, 16); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 13.2 || t > FINE + .2) return;
  const la = P(t, 13.2, 13.8) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 960, 110, 900, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  drawSeq(ctx, ['{mink:sin }{mv:x}{mink: =}', fr('{mink:1}', '{mink:2}')], 1410, 195, 50, { local: t - 13.6 });
  RIGHE.forEach(([ta, s, n], i) => {
    const y = 300 + i * 64;
    drawRich(ctx, s, XL, y, { size: 42, local: t - ta });
    drawRich(ctx, '{mdim:n = ' + n + '}', 1310, y, { size: 40, align: 'left', alpha: P(t, 52.3 + i * .35, 52.7 + i * .35) });
  });
  drawRich(ctx, '{mv:5π/6}', XR, 305, { size: 42, local: t - 31.0 });
  // le due famiglie di soluzioni
  scatola(ctx, 1180, 662, P(t, 57.5, 58.0));
  drawSeq(ctx, ['{mv:x}{mink: =}', fr('{mv:π}', '{mv:6}'), '{mink:+ 2nπ}'], 1180, 662, 44, { local: t - 57.6 });
  drawRich(ctx, '{ink:oppure}', 1425, 662, { size: 32, alpha: P(t, 62.4, 62.8) });
  scatola(ctx, 1670, 662, P(t, 62.5, 63.0));
  drawSeq(ctx, ['{mv:x}{mink: =}', fr('{mv:5π}', '{mv:6}'), '{mink:+ 2nπ}'], 1670, 662, 44, { local: t - 62.6 });
  drawRich(ctx, '{ink:con }{mink:n ∈ ℤ}', 1425, 760, { size: 40, local: t - 62.8 });
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Due punti sulla circonferenza,\npiù tutti i giri interi.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[350, '{mv:x}{mink: = }{mv:π/6}{mink: + 2nπ}', 44], [960, '{mv:x}{mink: = }{mv:5π/6}{mink: + 2nπ}', 44], [1570, '{mink:n ∈ ℤ}: giri in avanti\no all’indietro', 36]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 290, 450, 580, 140);
    drawRich(ctx, s, px, 520, { size, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'sin x = 1/2', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 33.7, 'la retta y = 1/2'], [33.7, 57.2, 'girando si ritorna'], [57.2, FINE, 'tutte le soluzioni']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
