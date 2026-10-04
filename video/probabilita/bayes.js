'use strict';
/* Il test e la malattia rara — i numeri del sito: malattia all'1%, test positivo sul 99% dei malati e sul 5% dei sani.
   L'albero su 10 000 persone: 100 malati (99 positivi, 1 negativo), 9900 sani (495 positivi, 9405 negativi).
   Fra i 594 positivi i malati sono 99: P(M | T⁺) = 99/594 = 1/6 ≈ 16,7%. Lo stesso conto con le probabilità
   sui rami sta in probabilita/probabilita-totale. Argomento: probabilita. */
CVIDEO.registra('probabilita/bayes', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, txt, drawSeq, card } = M;

const FINE = 75.0, DUR = 87;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [20.4, 'pensa'], [22.6, 'neutro'], [56.6, 'sorpreso'], [58.8, 'neutro'], [65.6, 'sorpreso'], [67.8, 'neutro'],
  [FINE + 2.2, 'felice'], [82.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; l'albero cresce un ramo alla volta e sta fermo mentre Ada ne parla
const TH = ' ';   // spazio fine delle migliaia: 10 000
const FUMETTI = [
  [2.4, 6.6, 'Il test dice «positivo»: quanto è\nprobabile essere davvero malati?'],
  // 1 · i dati
  [8.0, 11.8, 'Una malattia colpisce\nl’{y:1%} delle persone.'],
  [12.0, 16.0, 'Un test è positivo\nsul {v:99%} dei malati…'],
  [16.2, 20.2, '…ma è positivo anche\nsul {v:5%} dei sani.'],
  [20.4, 24.6, `Sembra un buon test.\nProviamo con {mink:10${TH}000} persone.`],
  // 2 · l'albero
  [25.0, 28.8, `L’albero parte\ndalle {mink:10${TH}000} persone.`],
  [29.0, 33.4, '{mink:M} sono i malati: l’1%,\ncioè {y:100} persone.'],
  [33.6, 37.6, '{mink:S} sono i sani:\ngli altri {x:9900}.'],
  [37.8, 42.2, '{mink:T⁺} vuol dire test positivo,\n{mink:T⁻} test negativo.'],
  [42.4, 46.8, 'Dei 100 malati il 99% è positivo:\n{v:99}, e 1 negativo.'],
  [47.4, 51.8, 'Dei 9900 sani il 5% è positivo:\n{v:495}, e 9405 negativi.'],
  // 3 · i positivi
  [52.0, 56.4, 'I positivi stanno in due rami:\n{mink:99 + 495 = 594}.'],
  [56.6, 60.8, 'Fra i 594 positivi, i malati\nsono solo {y:99}.'],
  [61.0, 65.4, '{mink:P(M | T⁺)}: «{mink:M} sapendo {mink:T⁺}»,\nmalato sapendo che è positivo.'],
  [65.6, 70.0, 'È {mink:99/594 = 1/6}: circa {g:16,7%}.\nUno su sei!'],
  [70.2, 74.4, 'I sani sono tanti:\nil loro {x:5%} pesa di più.'],
  // chiusura
  [77.2, 84.0, 'Malattia rara: un buon test può dare\npiù positivi sani che malati.'],
];

const fr = (a, b, ca = 'mink', cb = 'mink') => ({ num: `{${ca}:${a}}`, den: `{${cb}:${b}}` });
// come drawSeq, ma ogni pezzo entra al suo tempo: le larghezze sono quelle di drawSeq, ogni pezzo lo disegna drawSeq da solo
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
  conFont(TITOLI, () => drawRich(ctx, 'Il test e la malattia rara', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · i dati (7.5–24.8)
function sceneDati(ctx, t) {
  if (t < 7.5 || t > 25.2) return;
  const al = life(t, 7.5, 25.0, .5, .5);
  card(ctx, 360, 170, 1200, 560, al);
  ctx.save(); ctx.globalAlpha *= al;
  const righe = [[290, '{y:1%}', 'delle persone è {y:malato}', 8.1], [450, '{v:99%}', 'dei malati ha il test {v:positivo}', 12.1], [610, '{v:5%}', 'dei sani ha il test {v:positivo}', 16.3]];
  for (const [y, pc, s, a] of righe) {
    drawRich(ctx, pc, 700, y, { size: 76, weight: 600, align: 'right', local: t - a });
    drawRich(ctx, s, 740, y, { size: 44, align: 'left', local: t - a - .3 });
  }
  ctx.restore();
}
// 2–4 · l'albero (24.8–FINE)
const N = {
  R: { x: 160, y: 455, s: `10${TH}000`, t: 25.1 },
  M: { x: 560, y: 270, s: '{my:M}  100', t: 29.6 },
  S: { x: 560, y: 640, s: '{mx:S}  9900', t: 34.2 },
  Mp: { x: 940, y: 185, s: '{mv:T⁺}  99', t: 43.0 },
  Mn: { x: 940, y: 355, s: '{mink:T⁻}  1', t: 43.15 },
  Sp: { x: 940, y: 555, s: '{mv:T⁺}  495', t: 48.0 },
  Sn: { x: 940, y: 725, s: '{mink:T⁻}  9405', t: 48.15 },
};
// [da, a, percentuale, quando cresce]
const RAMI = [['R', 'M', '1%', 29.1], ['R', 'S', '99%', 33.7], ['M', 'Mp', '99%', 42.5], ['M', 'Mn', '1%', 42.65], ['S', 'Sp', '5%', 47.5], ['S', 'Sn', '95%', 47.65]];
const FS = 44;
const larg = (ctx, n) => richW(ctx, n.s, FS, 600);
function capi(ctx, a, b) { return [[a.x + larg(ctx, a) + 28, a.y], [b.x - 28, b.y]]; }   // lontano dagli anelli delle foglie
function ramo(ctx, p, q, k, col, w) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k); ctx.stroke(); ctx.restore();
}
// l'etichetta del ramo sta fuori dal ramo: sopra quelli che salgono, sotto quelli che scendono
function posEtichetta(p, q) {
  const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const [nx, ny] = dy < 0 ? [uy, -ux] : [-uy, ux];
  return [(p[0] + q[0]) / 2 + nx * 44, (p[1] + q[1]) / 2 + ny * 44];
}
function anello(ctx, n, col, k, w = 4) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = w;
  ctx.beginPath(); ctx.roundRect(n.x - 16, n.y - 36, larg(ctx, n) + 32, 72, 16); ctx.stroke(); ctx.restore();
}
function sceneAlbero(ctx, t) {
  if (t < 24.6 || t > FINE + .7) return;
  const al = life(t, 24.8, FINE, .5, .6);
  card(ctx, 110, 110, 1090, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // i rami
  for (const [a, b, pc, t0] of RAMI) {
    const [p, q] = capi(ctx, N[a], N[b]);
    ramo(ctx, p, q, P(t, t0, t0 + .6), C.dim, 4);
    const [ex, ey] = posEtichetta(p, q);
    drawRich(ctx, pc, ex, ey, { size: 34, weight: 600, alpha: P(t, t0 + .6, t0 + 1.0) });
  }
  // i nodi
  for (const n of Object.values(N)) drawRich(ctx, n.s, n.x, n.y, { size: FS, weight: 600, align: 'left', local: t - n.t });
  drawRich(ctx, '{dim:persone}', N.R.x + larg(ctx, N.R) / 2, N.R.y + 48, { size: 30, local: t - 25.4 });
  // 3 · i positivi: le due foglie T⁺; poi i 99 malati; poi i sani, che sono tanti
  const kp = life(t, 52.1, 74.6, .4, .4);
  anello(ctx, N.Mp, C.v, kp * (1 - P(t, 56.7, 57.1)));
  anello(ctx, N.Mp, C.y, kp * P(t, 56.7, 57.1), 6);
  anello(ctx, N.Sp, C.v, kp * (1 - P(t, 70.3, 70.7)));
  anello(ctx, N.Sp, C.x, kp * P(t, 70.3, 70.7), 6);
  anello(ctx, N.S, C.x, life(t, 70.3, 74.6, .4, .4), 6);
  ctx.restore();
}

// la scheda di destra: che cosa vogliono dire le lettere, poi i conti (29–FINE)
const CR = [1240, 110, 580, 690], XR = CR[0] + CR[2] / 2, XL = CR[0] + 40, XD = CR[0] + CR[2] - 40;
const PMT = '{mink:P(}{my:M}{mink: | }{mv:T⁺}{mink:)}';
function sceneConti(ctx, t) {
  if (t < 28.8 || t > FINE + .7) return;
  const al = life(t, 29.0, FINE, .5, .6);
  card(ctx, CR[0], CR[1], CR[2], 150 + 540 * P(t, 51.9, 52.5), al);   // finché c'è solo la legenda la scheda è bassa
  ctx.save(); ctx.globalAlpha *= al;
  // la legenda, in alto
  drawRich(ctx, '{my:M}{dim: malati}', XL, 165, { size: 36, align: 'left', local: t - 29.3 });
  drawRich(ctx, '{mx:S}{dim: sani}', XR + 30, 165, { size: 36, align: 'left', local: t - 33.8 });
  drawRich(ctx, '{mv:T⁺}{dim: positivo}', XL, 225, { size: 36, align: 'left', local: t - 38.0 });
  drawRich(ctx, '{mink:T⁻}{dim: negativo}', XR + 30, 225, { size: 36, align: 'left', local: t - 39.6 });
  const kl = P(t, 52.0, 52.4);
  if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 272); ctx.lineTo(XD, 272); ctx.stroke(); ctx.restore(); }
  // 3 · contando le persone
  if (t > 52) {
    ctx.save();
    txt(ctx, 'positivi', XL, 330, { size: 32, color: C.dim, align: 'left', alpha: P(t, 52.1, 52.5) });
    drawRich(ctx, '{mink:99 + 495 = }{mv:594}', XD, 330, { size: 46, align: 'right', local: t - 52.3 });
    txt(ctx, 'malati positivi', XL, 420, { size: 32, color: C.dim, align: 'left', alpha: P(t, 56.7, 57.1) });
    drawRich(ctx, '{my:99}', XD, 420, { size: 46, align: 'right', local: t - 56.9 });
    seqA(ctx, [PMT + '{mink: =}', fr(99, 594), '{mink:=}', fr(1, 6, 'mg', 'mg')], [61.1, 65.7, 66.0, 66.3], XR, 560, 46, t);
    drawRich(ctx, '{mink:≈ }{mg:16,7%}', XR, 670, { size: 52, local: t - 67.2 });
    drawRich(ctx, '{dim:uno su sei}', XR, 740, { size: 32, local: t - 67.8 });
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
    drawRich(ctx, 'Se la malattia è rara, anche un buon test\npuò dare più positivi {x:sani} che {y:malati}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[400, '{dim:malati positivi}', '{my:99}'], [960, '{dim:sani positivi}', '{mx:495}'], [1520, '{dim:malato se positivo}', '']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    const w = i === 2 ? 540 : 500;
    card(ctx, x - w / 2, 450, w, 190);
    drawRich(ctx, testa.replace('10 000', `10${TH}000`), x, 486, { size: 30, weight: 400 });
    if (s) drawRich(ctx, s, x, 570, { size: 60 });
    else drawSeq(ctx, [PMT + '{mink: =}', fr(99, 594), '{mink:=}', fr(1, 6, 'mg', 'mg')], x, 572, 46);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il test e la malattia rara', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 24.8, 'i dati'], [24.8, 51.9, 'l’albero'], [51.9, FINE, 'i positivi']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneDati(ctx, t); sceneAlbero(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
