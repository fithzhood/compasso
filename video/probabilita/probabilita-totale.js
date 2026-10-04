'use strict';
/* L'albero: probabilità totale e Bayes — malattia all'1%, test positivo sul 99% dei malati e sul 5% dei sani,
   con i decimali sui rami (1% = 0,01): M / S 0,01 / 0,99, test sui malati 0,99 / 0,01, sui sani 0,05 / 0,95.
   M e S si escludono e coprono tutti i casi (una partizione). Lungo un ramo si moltiplica (0,0099 e 0,0495),
   i rami che finiscono in T⁺ si sommano: P(T⁺) = 0,0594, la probabilità totale. Il teorema di Bayes: il ramo che
   interessa diviso tutti i rami che portano a T⁺, P(M | T⁺) = 0,0099 / 0,0594 = 1/6; P(M) è la probabilità a priori.
   Argomento: probabilita. */
CVIDEO.registra('probabilita/probabilita-totale', M => {
  const { W, C, E, P, life, css, mix, TITOLI, conFont, drawRich, richW, drawSeq, card, dot, glowStroke } = M;

const FINE = 81.6, DUR = 93.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [26.8, 'felice'], [28.8, 'neutro'], [53.8, 'felice'], [56.0, 'neutro'], [58.6, 'festa'], [61.0, 'neutro'],
  [63.2, 'pensa'], [67.8, 'neutro'], [73.0, 'festa'], [75.4, 'neutro'],
  [FINE + 2.2, 'felice'], [89.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; l'albero cresce un ramo alla volta e sta fermo mentre Ada ne parla
const FUMETTI = [
  [2.4, 6.6, 'Quanto è probabile\nun test positivo?'],
  // 1 · i dati
  [8.0, 12.8, 'Malattia all’1%; test positivo\nsul 99% dei malati e sul 5% dei sani.'],
  [13.0, 16.8, 'Le percentuali diventano\ndecimali: 1% è {mink:0,01}.'],
  // 2 · l'albero
  [17.2, 21.6, '{mink:M} è «malato», {mink:S} è «sano»:\nprobabilità {mink:0,01} e {mink:0,99}.'],
  [21.8, 26.6, '{mink:M} e {mink:S} sono le {v:cause}: si\nescludono e coprono tutti i casi.'],
  [26.8, 30.6, 'Si dice che formano\nuna {v:partizione}.'],
  [30.8, 35.2, '{mink:T⁺} è test positivo,\n{mink:T⁻} test negativo.'],
  [35.4, 39.8, 'Sui malati: {mink:0,99} positivo,\n{mink:0,01} negativo.'],
  [40.0, 44.4, 'Sui sani: {mink:0,05} positivo,\n{mink:0,95} negativo.'],
  // 3 · si moltiplica, si somma
  [44.8, 49.2, 'Malato e positivo: lungo il ramo\nsi {v:moltiplica}, {mink:0,01 · 0,99 = 0,0099}.'],
  [49.4, 53.6, 'Sano e positivo:\n{mink:0,99 · 0,05 = 0,0495}.'],
  [53.8, 58.4, 'I rami che finiscono in {mink:T⁺}\nsi {v:sommano}: {mink:P(T⁺) = 0,0594}.'],
  [58.6, 62.8, 'È la {v:probabilità totale}\ndi un test positivo.'],
  // 4 · il teorema di Bayes
  [63.2, 67.6, 'Il test è positivo: quanto vale\n{mink:P(M | T⁺)}, «{mink:M} sapendo {mink:T⁺}»?'],
  [67.8, 72.8, 'Il {v:teorema di Bayes} divide il ramo\nche interessa per tutti quelli in {mink:T⁺}.'],
  [73.0, 76.6, 'Viene {mink:1/6}: circa {g:16,7%}.'],
  [76.8, 81.2, '{mink:P(M) = 0,01} è la probabilità {v:a priori}:\nla sai prima del test.'],
  // chiusura
  [83.8, 90.6, 'Si moltiplica lungo i rami e si somma;\nBayes divide il ramo per tutti in {mink:T⁺}.'],
];

const fr = (a, b, ca = 'mink', cb = 'mink') => ({ num: `{${ca}:${a}}`, den: `{${cb}:${b}}` });
// come drawSeq, ma ogni pezzo entra al suo tempo
function seqA(ctx, items, tempi, cx, cy, size, t) {
  const ws = items.map(it => typeof it === 'string' ? richW(ctx, it, size) : Math.max(richW(ctx, it.num, size), richW(ctx, it.den, size)) + size * .35);
  const gap = size * .12, tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - tot / 2;
  items.forEach((it, i) => { drawSeq(ctx, [it], x + ws[i] / 2, cy, size, { local: t - tempi[i] }); x += ws[i] + gap; });
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’albero:\nprobabilità totale e Bayes', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 1 · i dati, in percentuale e in decimali (7.5–17)
function sceneDati(ctx, t) {
  if (t < 7.5 || t > 17.4) return;
  const al = life(t, 7.5, 17.2, .5, .5);
  card(ctx, 260, 170, 1400, 560, al);
  ctx.save(); ctx.globalAlpha *= al;
  const righe = [[290, '{y:1%}', '{mink:= 0,01}', 'delle persone è {y:malato}', 8.1], [450, '{v:99%}', '{mink:= 0,99}', 'dei malati ha il test {v:positivo}', 9.0],
    [610, '{v:5%}', '{mink:= 0,05}', 'dei sani ha il test {v:positivo}', 10.0]];
  righe.forEach(([y, pc, dec, s, a], i) => {
    drawRich(ctx, pc, 520, y, { size: 72, weight: 600, align: 'right', local: t - a });
    drawRich(ctx, dec, 545, y, { size: 56, align: 'left', local: t - 13.3 - i * .25 });
    drawRich(ctx, s, 830, y, { size: 44, align: 'left', local: t - a - .3 });
  });
  ctx.restore();
}
// 2–4 · l'albero con i decimali sui rami (17–FINE)
const N = {
  R: { x: 200, y: 455, s: '', t: 17.3 },
  M: { x: 560, y: 270, s: '{my:M}', t: 18.0 },
  S: { x: 560, y: 640, s: '{mx:S}', t: 18.15 },
  Mp: { x: 900, y: 185, s: '{mv:T⁺}', t: 36.0, p: '0,0099', tp: 45.9 },
  Mn: { x: 900, y: 355, s: '{mink:T⁻}', t: 36.15 },
  Sp: { x: 900, y: 555, s: '{mv:T⁺}', t: 40.6, p: '0,0495', tp: 50.4 },
  Sn: { x: 900, y: 725, s: '{mink:T⁻}', t: 40.75 },
};
// [da, a, probabilità sul ramo, quando cresce]
const RAMI = [['R', 'M', '0,01', 17.5], ['R', 'S', '0,99', 17.65], ['M', 'Mp', '0,99', 35.5], ['M', 'Mn', '0,01', 35.65], ['S', 'Sp', '0,05', 40.1], ['S', 'Sn', '0,95', 40.25]];
const FS = 48;
const larg = (ctx, n) => richW(ctx, n.s, FS, 600);
function capi(ctx, a, b) { return [a === N.R ? [a.x + 26, a.y] : [a.x + larg(ctx, a) + 28, a.y], [b.x - 28, b.y]]; }
function ramo(ctx, p, q, k, col, w) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k); ctx.stroke(); ctx.restore();
}
// l'etichetta del ramo sta fuori dal ramo: sopra quelli che salgono, sotto quelli che scendono
function posEtichetta(p, q) {
  const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const [nx, ny] = dy < 0 ? [uy, -ux] : [-uy, ux];
  return [(p[0] + q[0]) / 2 + nx * 46, (p[1] + q[1]) / 2 + ny * 46];
}
// la foglia T⁺ con il prodotto del suo percorso accanto (senza «=»: T⁺ è un evento, non un numero)
const XP = n => n.x + 84;
function anello(ctx, n, col, k, w = 4) {
  if (k <= 0) return;
  const x1 = n.p ? XP(n) + richW(ctx, `{mv:${n.p}}`, 44) + 18 : n.x + 70;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = w;
  ctx.beginPath(); ctx.roundRect(n.x - 18, n.y - 38, x1 - n.x + 18, 76, 16); ctx.stroke(); ctx.restore();
}
function sceneAlbero(ctx, t) {
  if (t < 16.9 || t > FINE + .7) return;
  const al = life(t, 17.0, FINE, .5, .6);
  card(ctx, 110, 110, 1090, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  for (const [a, b, pr, t0] of RAMI) {
    const [p, q] = capi(ctx, N[a], N[b]);
    ramo(ctx, p, q, P(t, t0, t0 + .6), C.dim, 4);
    const [ex, ey] = posEtichetta(p, q);
    drawRich(ctx, `{mink:${pr}}`, ex, ey, { size: 40, alpha: P(t, t0 + .6, t0 + 1.0) });
  }
  // i due percorsi che finiscono in T⁺; con il teorema di Bayes quello dei malati diventa verde
  for (const [a, b, c, t0] of [['R', 'M', 'Mp', 44.9], ['R', 'S', 'Sp', 49.5]]) {
    const k = P(t, t0, t0 + .9);
    if (k <= 0) continue;
    const [p1, q1] = capi(ctx, N[a], N[b]), [p2, q2] = capi(ctx, N[b], N[c]);
    const col = b === 'M' ? mix(C.v, C.g, P(t, 67.9, 68.5)) : C.v;
    glowStroke(ctx, [p1, q1], Math.min(1, k * 2), col, 6);
    if (k > .5) glowStroke(ctx, [p2, q2], (k - .5) * 2, col, 6);
  }
  dot(ctx, [N.R.x, N.R.y], C.ink, P(t, 17.3, 17.7, E.back), 12);
  for (const n of Object.values(N)) {
    if (n.s) drawRich(ctx, n.s, n.x, n.y, { size: FS, weight: 600, align: 'left', local: t - n.t });
    if (n.p) drawRich(ctx, `{mv:${n.p}}`, XP(n), n.y, { size: 44, align: 'left', local: t - n.tp });
  }
  // i rami che finiscono in T⁺: le due foglie cerchiate, finché si parla della probabilità totale
  const kp = life(t, 53.9, 63.2, .4, .4);
  anello(ctx, N.Mp, C.v, kp); anello(ctx, N.Sp, C.v, kp);
  ctx.restore();
}

// la scheda di destra (17–FINE)
const CR = [1240, 110, 580, 690], XR = CR[0] + CR[2] / 2, XL = CR[0] + 40, XD = CR[0] + CR[2] - 40;
const PMT = '{mink:P(}{my:M}{mink: | }{mv:T⁺}{mink:)}', PT = '{mink:P(}{mv:T⁺}{mink:)}';
function linea(ctx, y, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, y); ctx.lineTo(XD, y); ctx.stroke(); ctx.restore();
}
function sceneConti(ctx, t) {
  if (t < 17.2 || t > FINE + .7) return;
  const al = life(t, 17.4, FINE, .5, .6);
  card(ctx, ...CR, al);
  ctx.save(); ctx.globalAlpha *= al;
  // 2–3 · la legenda, la partizione, poi i conti
  const s1 = 1 - P(t, 62.9, 63.3);
  if (s1 > 0) {
    ctx.save(); ctx.globalAlpha *= s1;
    drawRich(ctx, '{my:M}{dim: malato}', XL, 165, { size: 36, align: 'left', local: t - 17.6 });
    drawRich(ctx, '{mx:S}{dim: sano}', XR + 30, 165, { size: 36, align: 'left', local: t - 18.2 });
    drawRich(ctx, '{mv:T⁺}{dim: positivo}', XL, 225, { size: 36, align: 'left', local: t - 31.0 });
    drawRich(ctx, '{mink:T⁻}{dim: negativo}', XR + 30, 225, { size: 36, align: 'left', local: t - 32.4 });
    linea(ctx, 272, P(t, 21.9, 22.3));
    const kz = 1 - P(t, 44.6, 45.0);
    if (kz > 0) {
      ctx.save(); ctx.globalAlpha *= kz;
      drawRich(ctx, '{my:M}{ink: e }{mx:S}{ink: si escludono}', XR, 330, { size: 38, local: t - 22.0 });
      drawRich(ctx, 'e coprono tutti i casi', XR, 385, { size: 38, local: t - 23.0 });
      drawRich(ctx, 'una {v:partizione}', XR, 470, { size: 44, weight: 600, local: t - 26.8 });
      ctx.restore();
    }
    drawRich(ctx, '{mink:0,01 · 0,99 = }{mv:0,0099}', XR, 330, { size: 42, local: t - 45.0 });
    drawRich(ctx, '{mink:0,99 · 0,05 = }{mv:0,0495}', XR, 395, { size: 42, local: t - 49.6 });
    drawRich(ctx, PT + '{mink: = 0,0099 + 0,0495}', XR, 490, { size: 40, local: t - 54.0 });
    drawRich(ctx, '{mink:= }{mv:0,0594}', XR, 550, { size: 44, local: t - 54.8 });
    drawRich(ctx, '{v:probabilità totale}', XR, 625, { size: 36, weight: 600, local: t - 58.7 });
    ctx.restore();
  }
  // 4 · il teorema di Bayes
  if (t > 63.0) {
    drawRich(ctx, PT + '{mink: = }{mv:0,0594}', XR, 170, { size: 42, local: t - 63.2 });
    drawRich(ctx, '{dim:probabilità totale}', XR, 218, { size: 30, local: t - 63.4 });
    linea(ctx, 258, P(t, 63.3, 63.7));
    seqA(ctx, [PMT + '{mink: =}', fr('0,0099', '0,0594', 'mg'), '{mink:=}', fr(1, 6, 'mg', 'mg')], [63.4, 68.0, 73.1, 73.3], XR, 350, 44, t);
    drawRich(ctx, '{dim:teorema di Bayes}', XR, 430, { size: 30, local: t - 68.2 });
    drawRich(ctx, '{mink:≈ }{mg:16,7%}', XR, 495, { size: 52, local: t - 73.5 });
    linea(ctx, 560, P(t, 76.9, 77.3));
    drawRich(ctx, '{dim:probabilità a priori}', XR, 610, { size: 30, local: t - 77.0 });
    drawRich(ctx, '{mink:P(}{my:M}{mink:) = 0,01}', XR, 665, { size: 44, local: t - 77.3 });
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
    drawRich(ctx, 'Lungo un ramo si {v:moltiplica}, i rami con lo stesso esito\nsi {v:sommano}; per {v:Bayes} il ramo che interessa si divide\nper tutti i rami che portano a {mv:T⁺}.', W / 2, 290, { size: 56, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[330, '{dim:probabilità totale}'], [960, '{dim:teorema di Bayes}'], [1590, '{dim:probabilità a priori}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    const w = i === 1 ? 600 : 540;
    card(ctx, x - w / 2, 450, w, 190);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, PT + '{mink: = 0,0594}', x, 570, { size: 44 });
    if (i === 1) drawSeq(ctx, [PMT + '{mink: =}', fr('0,0099', '0,0594'), '{mink:=}', fr(1, 6, 'mg', 'mg')], x, 572, 46);
    if (i === 2) drawRich(ctx, '{mink:P(}{my:M}{mink:) = 0,01}', x, 570, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L’albero: probabilità totale e Bayes', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 17.0, 'i dati'], [17.0, 44.6, 'l’albero'], [44.6, 63.0, 'si moltiplica, si somma'], [63.0, FINE, 'il teorema di Bayes']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneDati(ctx, t); sceneAlbero(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
