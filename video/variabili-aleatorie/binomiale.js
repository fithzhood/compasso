'use strict';
/* Quante teste su 10 lanci — dieci lanci di una moneta, k = numero di teste; la formula di Bernoulli dà
   l'istogramma con n = 10: con p = 0,5 è simmetrico e il picco è in 5 = n · p (P(5) ≈ 0,246); p scende a 0,2 e
   la montagna scivola a sinistra, con una coda lunga a destra, picco in 2 = n · p; con p = 0,8 la coda è a sinistra;
   la barra più alta resta sempre vicino a n · p. Argomento: variabili-aleatorie. */
CVIDEO.registra('variabili-aleatorie/binomiale', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, fmtN, card } = M;

const FINE = 69.0, DUR = 81.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [13.0, 'felice'],
  [17.4, 'pensa'], [19.8, 'neutro'], [24.6, 'felice'], [26.9, 'neutro'], [31.6, 'felice'], [35.8, 'neutro'],
  [40.2, 'sorpreso'], [42.4, 'neutro'], [49.4, 'felice'], [53.8, 'neutro'], [58.8, 'felice'], [63.0, 'neutro'],
  [FINE + 1.0, 'felice'], [75.2, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Dieci lanci di una moneta:\nquante teste usciranno?'],
  // 1 · dieci lanci, la distribuzione binomiale
  [8.0, 12.6, 'Ogni lancio è testa con {mink:p = 0,5},\ne i lanci sono {v:indipendenti}.'],
  [12.8, 17.2, 'Stavolta {g:6} teste su 10.\nChiamo {mink:k} il numero di teste.'],
  [17.4, 22.0, 'Quanto è probabile ogni {mink:k}?\nLo dice la {v:formula di Bernoulli}.'],
  [22.2, 26.7, 'Per ogni {mink:k} da 0 a 10 una barra:\nla {v:distribuzione binomiale}.'],
  [26.9, 31.0, 'È simmetrica: la barra più alta\nè {mink:k = 5}, con {mink:P(5) ≈ 0,246}.'],
  [31.2, 35.6, 'Con {mink:n = 10}, la media del numero\ndi teste {mink:X} è {mink:E(X) = n · p = 5}.'],
  // 2 · p cambia
  [35.8, 40.0, 'Ora la moneta è truccata:\n{mink:p} scende a 0,2…'],
  [40.2, 44.5, '…la montagna è scivolata a sinistra:\nil picco è in {mink:k = 2}.'],
  [44.7, 49.0, 'Non è più simmetrica: a destra\nuna {v:coda} lunga e bassa.'],
  [49.2, 53.6, 'Il picco è ancora sulla media:\n{mink:n · p = 10 · 0,2 = 2}.'],
  [53.8, 58.4, 'Ora {mink:p} sale a 0,8: picco e media\nvanno a destra {g:insieme}.'],
  [58.6, 62.8, 'Con {mink:p = 0,8} la coda lunga\nsta a {v:sinistra}.'],
  [64.2, 68.7, 'Con {mink:p = 0,35} la barra più alta\nè in 3, {g:vicino} a {mink:n · p = 3,5}.'],
  // chiusura
  [69.8, 78.0, 'Nella binomiale la barra più alta\nsta sempre vicino a {mink:n · p}.'],
];

// ---- l'istogramma ----
const CARD = [110, 110, 1060, 690], PAN = [1200, 110, 610, 690];
const XK = k => 195 + k * 88, AY = 700, HS = 1390, BW = 66;
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const distr = p => { const a = []; for (let k = 0; k <= 10; k++) a.push(binom(10, k) * Math.pow(p, k) * Math.pow(1 - p, 10 - k)); return a; };
// p: 0,5, poi giù a 0,2, su a 0,8, infine a 0,35; i numeri e le barre vengono dal p arrotondato ai centesimi
const pAt = t => Math.round(kf(t, [[36.2, .5], [39.6, .2], [54.0, .2], [57.8, .8], [62.9, .8], [64.0, .35]]) * 100) / 100;
// ---- i dieci lanci ----
const LANCI = 'TCTTCTCTTC', XL = j => 240 + j * 80, YL = 200;

// ---- formule con coefficiente binomiale e potenze, disegnate qui ----
// pezzi: testo ricco | { bin: [n, k] } | { pow: [base, esponente] }
function largo(ctx, it, s) {
  if (typeof it === 'string') return richW(ctx, it, s);
  if (it.bin) return Math.max(richW(ctx, it.bin[0], s * .82), richW(ctx, it.bin[1], s * .82)) + s * .8;
  if (it.pow) return richW(ctx, it.pow[0], s) + richW(ctx, it.pow[1], s * .75) + s * .16;
  return 0;
}
function pezzo(ctx, it, x, cy, s) {
  if (typeof it === 'string') { drawRich(ctx, it, x, cy, { size: s, align: 'left' }); return; }
  if (it.pow) {
    const wb = richW(ctx, it.pow[0], s);
    drawRich(ctx, it.pow[0], x, cy, { size: s, align: 'left' });
    drawRich(ctx, it.pow[1], x + wb + s * .04, cy - s * .48, { size: s * .75, align: 'left' });
    return;
  }
  const w = largo(ctx, it, s), h = s * 1.95, pw = s * .3, xm = x + w / 2;
  ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .06); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + pw, cy - h / 2); ctx.quadraticCurveTo(x - s * .12, cy, x + pw, cy + h / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w - pw, cy - h / 2); ctx.quadraticCurveTo(x + w + s * .12, cy, x + w - pw, cy + h / 2); ctx.stroke();
  ctx.restore();
  drawRich(ctx, it.bin[0], xm, cy - s * .5, { size: s * .82 });
  drawRich(ctx, it.bin[1], xm, cy + s * .52, { size: s * .82 });
}
function formula(ctx, items, cx, cy, s, o) {
  o = o || {};
  const al = o.alpha != null ? o.alpha : 1; if (al <= .002) return;
  const local = o.local != null ? o.local : 99, gap = s * .2;
  const ws = items.map(it => largo(ctx, it, s)), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - tot / 2;
  items.forEach((it, i) => {
    const k = P(local - i * .25, 0, .5, E.out);
    if (k > 0) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); pezzo(ctx, it, x, cy, s); ctx.restore(); }
    x += ws[i] + gap;
  });
}
const BERNOULLI = ['{mink:P(k) =}', { bin: ['{mink:10}', '{mink:k}'] }, '{mink:·}', { pow: ['{mink:p}', '{mink:k}'] }, '{mink:·}', { pow: ['{mink:(1 − p)}', '{mink:10 − k}'] }];
const BERNOULLI_N = ['{mink:P(k) =}', { bin: ['{mink:n}', '{mink:k}'] }, '{mink:·}', { pow: ['{mink:p}', '{mink:k}'] }, '{mink:·}', { pow: ['{mink:(1 − p)}', '{mink:n − k}'] }];

function rett(ctx, x, y, w, h, r, riempi, bordo, lw) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (riempi) { ctx.fillStyle = riempi; ctx.fill(); }
  if (bordo) { ctx.strokeStyle = bordo; ctx.lineWidth = lw || 3; ctx.stroke(); }
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quante teste su 10 lanci', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · le monete, poi l'istogramma (7.5–FINE)
function sceneIsto(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // i dieci lanci: ogni moneta si gira e mostra T o C
  const km = 1 - P(t, 22.0, 22.6);
  if (km > 0) {
    ctx.save(); ctx.globalAlpha *= km;
    for (let j = 0; j < 10; j++) {
      const k = P(t, 8.3 + j * .08, 8.7 + j * .08, E.back); if (k <= 0) continue;
      const tf = 9.7 + j * .24, u = P(t, tf, tf + .3, E.lin), sx = Math.max(.05, Math.abs(Math.cos(Math.PI * u)));
      const testa = LANCI[j] === 'T', girata = u >= .5, col = testa ? C.y : C.x;
      ctx.save(); ctx.translate(XL(j), YL); ctx.scale(k * sx, k);
      ctx.beginPath(); ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.fillStyle = girata ? css(col, .2) : css(C.ink, .06); ctx.fill();
      ctx.strokeStyle = girata ? css(col, .9) : css(C.ink, .45); ctx.lineWidth = 3; ctx.stroke();
      if (girata) drawRich(ctx, `{mink:${LANCI[j]}}`, 0, 1, { size: 40 });
      ctx.restore();
    }
    drawRich(ctx, '{mink:k = }{mg:6}', XL(4.5), 292, { size: 44, alpha: P(t, 13.0, 13.4) });
    ctx.restore();
  }
  // l'asse dei k
  const ka = P(t, 22.2, 22.6);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(XK(-.6), AY); ctx.lineTo(XK(10.6), AY); ctx.stroke();
    for (let k = 0; k <= 10; k++) drawRich(ctx, `{mink:${k}}`, XK(k), AY + 34, { size: 36 });
    drawRich(ctx, '{mink:k}', XK(10.75), AY + 34, { size: 40, align: 'left' });
    ctx.restore();
  }
  // le barre, con la più alta in verde
  const p = pAt(t), d = distr(p);
  let picco = 0; d.forEach((v, k) => { if (v > d[picco]) picco = k; });
  const kv = P(t, 27.0, 27.5);
  d.forEach((v, k) => {
    const kb = P(t, 22.4 + k * .15, 23.0 + k * .15, E.out); if (kb <= 0) return;
    const h = Math.max(0, HS * v * kb);
    rett(ctx, XK(k) - BW / 2, AY - h, BW, h, 4, css(C.y, .24), css(C.y, .9), 2.5);
    if (k === picco && kv > 0) rett(ctx, XK(k) - BW / 2, AY - h, BW, h, 4, css(C.g, .3 * kv), css(C.g, kv), 3);
  });
  // P(5)
  const k5 = life(t, 27.0, 31.2, .4, .3);
  if (k5 > 0) drawRich(ctx, '{mink:P(5) ≈ }{mg:0,246}', XK(5), AY - HS * d[5] - 38, { size: 44, alpha: k5 });
  // la media n · p
  const kn = P(t, 31.4, 31.9);
  if (kn > 0) {
    const x = XK(10 * p);
    ctx.save(); ctx.globalAlpha *= kn; ctx.strokeStyle = css(C.v, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.moveTo(x, AY - 4); ctx.lineTo(x, 252); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:n · p}', x, 224, { size: 40, alpha: kn });
  }
  // le code
  const coda = (a, b, k) => {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    rett(ctx, XK(a) + 4, AY - 92, XK(b) - XK(a) - 8, 88, 12, null, css(C.v), 3);
    drawRich(ctx, '{v:coda}', (XK(a) + XK(b)) / 2, AY - 120, { size: 36 });
    ctx.restore();
  };
  coda(4.5, 10.5, life(t, 44.8, 49.0, .4, .4));
  coda(-.5, 5.5, life(t, 58.8, 62.8, .4, .4));
  ctx.restore();
}

// il riquadro: la formula e i numeri (8.2–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1245, RX = 1765;
function scenePannello(ctx, t) {
  const al = life(t, 8.2, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'formula di Bernoulli', PX, 168, { size: 38, weight: 600, local: t - 17.8 }));
  formula(ctx, BERNOULLI, PX, 268, 40, { local: t - 18.0 });
  const kl = P(t, 17.8, 18.2);
  if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 344); ctx.lineTo(PAN[0] + PAN[2] - 40, 344); ctx.stroke(); ctx.restore(); }
  const p = pAt(t), d = distr(p);
  let picco = 0; d.forEach((v, k) => { if (v > d[picco]) picco = k; });
  const riga = (nome, val, y, col, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    drawRich(ctx, nome, LX, y, { size: 44, align: 'left' });
    fixedNum(ctx, val, RX, y, 44, col);
    ctx.restore();
  };
  riga('{mink:n =}', '10', 420, C.ink, P(t, 31.4, 31.8));
  riga('{mink:p =}', fmtN(p, 2), 490, C.x, P(t, 8.4, 8.8));
  riga('{mink:n · p =}', fmtN(10 * p, 1), 560, C.v, P(t, 31.6, 32.0));
  riga('{dim:barra più alta:} {mink:k =}', String(picco), 630, C.g, P(t, 27.0, 27.4));
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'In {mink:n} prove con probabilità {mink:p},\nla barra più alta sta vicino a {mink:n · p}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[440, '{dim:formula di Bernoulli}', 320], [1030, '{dim:la media}', 240], [1550, '{dim:con }{mink:p ≠ 0,5}', 240]];
  pills.forEach(([x, testa, mw], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - mw, 445, 2 * mw, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) formula(ctx, BERNOULLI_N, x, 572, 40);
    if (i === 1) { drawRich(ctx, '{mink:E(X) = n · p}', x, 545, { size: 46 }); drawRich(ctx, 'la barra più alta le sta vicino', x, 610, { size: 30 }); }
    if (i === 2) drawRich(ctx, 'non è simmetrica:\nuna {v:coda} lunga', x, 570, { size: 34, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.4, .3], ['pop', 8.8, .5], ['pop', 9.1, .7],                   // le dieci monete
    ['pop', 9.85, .7], ['pop', 10.09, .4], ['pop', 10.33, .7], ['pop', 10.57, .7], ['pop', 10.81, .4],   // i lanci: T alta, C bassa
    ['pop', 11.05, .7], ['pop', 11.29, .4], ['pop', 11.53, .7], ['pop', 11.77, .7], ['pop', 12.01, .4],
    ['ding', 13.1],                                                                          // k = 6
    ['soffio', 17.8], ['pop', 18.2, .5],                                                     // la formula di Bernoulli
    ['traccia', 22.2, 22.6], ['tono', 22.4, 24.9, [.05, .1, .35, .7, .95, 1, .95, .7, .35, .1, .05]],   // le barre crescono
    ['pop', 27.1, .6],                                                                       // la più alta, P(5)
    ['traccia', 31.4, 31.9], ['pop', 31.7, .5],                                              // n · p
    ['tono', 36.2, 39.6, [.5, .4, .3, .2]],                                                  // p da 0,5 a 0,2
    ['traccia', 44.8, 45.3], ['pop', 45.0, .25],                                             // la coda a destra
    ['ding', 49.6],                                                                          // n · p = 2
    ['tono', 54.0, 57.8, [.2, .4, .6, .8]],                                                  // p da 0,2 a 0,8
    ['traccia', 58.8, 59.3], ['pop', 59.0, .25],                                             // la coda a sinistra
    ['tono', 62.9, 64.0, [.8, .65, .5, .35]],                                                // p da 0,8 a 0,35
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quante teste su 10 lanci', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 35.7, 'dieci lanci'], [35.7, FINE, 'una moneta truccata']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneIsto(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
