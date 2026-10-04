'use strict';
/* La somma di Gauss — 1 + 2 + … + 100 scritta due volte, la seconda al contrario: ogni colonna fa 101, le colonne sono 100,
   quindi 2S = 100 · 101 e S = 5050; lo stesso con 5, 8, …, 32 porta a Sₙ = (a₁ + aₙ) n / 2. Argomento: successioni. */
CVIDEO.registra('successioni/somma-di-gauss', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, drawSeq, card } = M;

const FINE = 76.2, DUR = 88;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [23.6, 'sorpreso'], [25.7, 'neutro'], [41.7, 'festa'], [44.0, 'neutro'],
  [56.4, 'felice'], [58.5, 'neutro'], [71.6, 'felice'], [73.7, 'neutro'],
  [FINE, 'neutro'], [78.6, 'felice'], [83.5, 'occhiolino'],
];
// una frase per ogni cosa che succede; i numeri si scrivono fra un fumetto e l'altro
const FUMETTI = [
  [2.4, 6.4, 'Quanto fa {mink:1 + 2 + … + 100}?\nC’è un modo svelto.'],
  // 1 · le due file
  [8.6, 12.0, 'Chiamo {mink:S} la somma:\n{mink:S = 1 + 2 + … + 100}.'],
  [13.8, 17.8, 'La riscrivo sotto, al contrario:\nda 100 fino a 1.'],
  [18.8, 22.2, 'Sommo in colonna:\n{mink:1 + 100 = 101}.'],
  [23.6, 27.2, 'Poi {mink:2 + 99} e {mink:3 + 98}:\nfanno ancora {g:101}!'],
  [27.4, 31.9, 'Sopra sale di 1, sotto scende di 1:\nla somma resta 101.'],
  [33.7, 38.2, 'Tutte le colonne fanno 101,\ne sono {g:100}: tante quanti i termini.'],
  [38.3, 41.6, 'Le due file insieme sono {mink:2S}:\n{mink:2S = 100 · 101 = 10 100}.'],
  [41.7, 45.2, 'Divido per 2:\n{mink:S = 5050}.'],
  // 2 · la formula
  [46.9, 50.3, 'Ora una progressione aritmetica:\n{mink:5 + 8 + 11 + … + 32}, 10 termini.'],
  [53.0, 56.3, 'Sotto al contrario: ogni colonna\nfa {mink:5 + 32 = 37}.'],
  [56.4, 59.9, 'Sopra +3, sotto −3:\nogni colonna resta {g:37}.'],
  [60.0, 63.5, 'Le due file fanno {mink:10 · 37 = 370}:\nmetà è {mink:S = 185}.'],
  [63.6, 67.6, '{mink:a₁} è il primo termine, {mink:aₙ}\nl’ultimo, {mx:n} quanti sono.'],
  [67.7, 71.5, 'Ogni colonna fa {mink:a₁ + aₙ}:\nle due file fanno {mink:(a₁ + aₙ)}{mx: n}.'],
  [71.6, 75.6, 'La somma dei primi {mx:n} termini,\n{mink:Sₙ}, è la metà.'],
  // chiusura
  [78.4, 85.1, 'Due file, una al contrario:\nogni colonna fa primo più ultimo.'],
];

const CARD = [150, 110, 1620, 690];
const Y1 = 205, Y2 = 295, YSU = 150, YGIU = 340, YL = 368, Y3 = 420, YB = 462, XL = 330, NS = 50;
const fr = (a, b) => ({ num: `{mink:${a}}`, den: `{mink:${b}}` });
const TH = ' ';   // spazio sottile delle migliaia: 10 100

// due file di numeri, la loro somma in colonna, e i segni + fra un posto e l'altro
// F = { x(i), n, r1, r2, sm, t1, t2: [inizio, passo], ts: tempi delle somme, box: [[i, a, b]], pm: [testo su, testo giù, a, b, salti], br: [testo, a] }
function file(ctx, F, t) {
  const plus = (y, i, al) => drawRich(ctx, '{mink:+}', (F.x(i) + F.x(i + 1)) / 2, y, { size: 44, alpha: al });
  // prima fila
  const k1 = P(t, F.t1, F.t1 + .5);
  if (k1 > 0) {
    drawRich(ctx, '{mink:S =}', XL, Y1, { size: NS, align: 'right', alpha: k1 });
    for (let i = 0; i < F.n; i++) {
      const k = P(t, F.t1 + i * .05, F.t1 + i * .05 + .35, E.out);
      drawRich(ctx, `{mink:${F.r1[i]}}`, F.x(i), Y1, { size: NS, alpha: k });
      if (i < F.n - 1) plus(Y1, i, k);
    }
  }
  // seconda fila, scritta da sinistra a destra
  const [a2, p2] = F.t2;
  if (t > a2) {
    drawRich(ctx, '{mink:S =}', XL, Y2, { size: NS, align: 'right', alpha: P(t, a2, a2 + .3) });
    for (let i = 0; i < F.n; i++) {
      const k = P(t, a2 + .2 + i * p2, a2 + .2 + i * p2 + .3, E.out);
      drawRich(ctx, `{mink:${F.r2[i]}}`, F.x(i), Y2, { size: NS, alpha: k });
      if (i < F.n - 1) plus(Y2, i, k);
    }
  }
  // la riga e le somme in colonna
  const kl = P(t, F.ts[0] - .4, F.ts[0]);
  if (kl > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(F.x(0) - 70, YL); ctx.lineTo(F.x(0) - 70 + (F.x(F.n - 1) - F.x(0) + 140) * kl, YL); ctx.stroke(); ctx.restore();
  }
  for (let i = 0; i < F.n; i++) {
    const k = P(t, F.ts[i], F.ts[i] + .35, E.out);
    if (k <= 0) continue;
    drawRich(ctx, F.sm[i] === '…' ? '{mink:…}' : `{mg:${F.sm[i]}}`, F.x(i), Y3, { size: NS, alpha: k });
    if (i > 0) plus(Y3, i - 1, k);
  }
  if (F.lab2S) drawRich(ctx, '{mink:2S =}', XL, Y3, { size: NS, align: 'right', alpha: P(t, F.lab2S, F.lab2S + .4) });
  // le colonne evidenziate
  for (const [i, a, b] of F.box) {
    const k = life(t, a, b, .3, .3); if (k <= 0) continue;
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(F.x(i) - F.w / 2, Y1 - 42, F.w, Y2 - Y1 + 84, 16); ctx.stroke(); ctx.restore();
  }
  // sopra si sale, sotto si scende
  if (F.pm) {
    const [su, giu, a, b, salti] = F.pm, k = life(t, a, b, .3, .3);
    if (k > 0) for (const i of salti) {
      const xm = (F.x(i) + F.x(i + 1)) / 2;
      drawRich(ctx, `{x:${su}}`, xm, YSU, { size: 32, weight: 600, alpha: k });
      drawRich(ctx, `{y:${giu}}`, xm, YGIU, { size: 32, weight: 600, alpha: k });
    }
  }
  // la graffa sotto le somme
  if (F.br) for (const [s, a, b] of F.br) {
    const k = life(t, a, b, .3, .3); if (k <= 0) continue;
    const x0 = F.x(0) - 40, x1 = F.x(F.n - 1) + 40, xm = (x0 + x1) / 2;
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath();
    ctx.moveTo(x0, YB - 10); ctx.lineTo(x0, YB); ctx.lineTo(x1, YB); ctx.lineTo(x1, YB - 10);
    ctx.moveTo(xm, YB); ctx.lineTo(xm, YB + 10); ctx.stroke(); ctx.restore();
    drawRich(ctx, s, xm, YB + 38, { size: 32, alpha: k });
  }
}
function riquadro(ctx, x, y, w, h, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 14); ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La somma di Gauss', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · 1 + 2 + … + 100
const F1 = {
  x: i => 420 + i * 155, n: 9, w: 96,
  r1: ['1', '2', '3', '4', '…', '97', '98', '99', '100'], r2: ['100', '99', '98', '97', '…', '4', '3', '2', '1'],
  sm: ['101', '101', '101', '101', '…', '101', '101', '101', '101'],
  t1: 7.9, t2: [12.1, .15], ts: [18.4, 22.5, 23.1, 32.0, 32.3, 32.6, 32.9, 33.2, 33.5],
  box: [[0, 17.9, 22.2], [1, 22.3, 27.2], [2, 22.9, 27.2]],
  pm: ['+1', '−1', 27.4, 31.9, [0, 1, 2, 5, 6, 7]],
  br: [['100 colonne', 33.8, 99]], lab2S: 38.4,
};
// 2 · 5 + 8 + … + 32
const F2 = {
  x: i => 430 + i * 130, n: 10, w: 104,
  r1: [5, 8, 11, 14, 17, 20, 23, 26, 29, 32], r2: [32, 29, 26, 23, 20, 17, 14, 11, 8, 5], sm: new Array(10).fill('37'),
  t1: 46.0, t2: [50.4, .12], ts: Array.from({ length: 10 }, (_, i) => 52.0 + i * .07),
  box: [], pm: ['+3', '−3', 56.4, 63.6, [0, 1, 2, 3, 4, 5, 6, 7, 8]],
  br: [['10 colonne', 53.0, 63.7], ['{mx:n}{mink: = 10}{ink: colonne}', 63.8, 99]], lab2S: 0,
};
function sceneFile(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .5, .6);
  card(ctx, ...CARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  const a1 = 1 - P(t, 45.3, 45.8);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    file(ctx, F1, t);
    drawRich(ctx, `{mink:2S = 100 · 101 = 10${TH}100}`, W / 2, 592, { size: 56, local: t - 38.4 });
    drawSeq(ctx, ['{mink:S = }', fr(`10${TH}100`, 2), '{mink: = }{mg:5050}'], W / 2, 712, 52, { local: t - 41.8 });
    riquadro(ctx, W / 2, 714, 560, 140, P(t, 43.0, 43.5));
    ctx.restore();
  }
  if (t > 45.8) {
    file(ctx, F2, t);
    // a₁ e aₙ sopra il primo e l'ultimo termine
    const ka = P(t, 63.7, 64.1);
    drawRich(ctx, '{mink:a₁}', F2.x(0), YSU, { size: 40, alpha: ka });
    drawRich(ctx, '{mink:aₙ}', F2.x(9), YSU, { size: 40, alpha: ka });
    // a sinistra i numeri, a destra le lettere
    drawRich(ctx, '{mink:2S = 10 · 37 = 370}', 560, 588, { size: 50, local: t - 60.1 });
    drawSeq(ctx, ['{mink:S = }', fr(370, 2), '{mink: = }{mg:185}'], 560, 718, 48, { local: t - 60.7 });
    const kd = P(t, 67.7, 68.1);
    if (kd > 0) {
      ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(960, 560); ctx.lineTo(960, 770); ctx.stroke(); ctx.restore();
    }
    // 2S diventa 2Sₙ quando Ada dà il nome alla somma dei primi n termini
    const kO = P(t, 71.6, 71.75), kN = P(t, 71.78, 71.95);   // prima esce l'una, poi entra l'altra
    drawRich(ctx, '{mink:2S = (a₁ + aₙ)}{mx: n}', 1365, 588, { size: 50, local: t - 67.9, alpha: 1 - kO });
    drawRich(ctx, '{mink:2Sₙ = (a₁ + aₙ)}{mx: n}', 1365, 588, { size: 50, alpha: kN });
    drawSeq(ctx, ['{mink:Sₙ = }', { num: '{mink:(a₁ + aₙ)}{mx: n}', den: '{mink:2}' }], 1365, 718, 52, { local: t - 71.8 });
    // il riquadro misura la formula come la misura drawSeq
    const wF = richW(ctx, '{mink:Sₙ = }', 52) + richW(ctx, '{mink:(a₁ + aₙ)}{mx: n}', 52) + 52 * .35 + 52 * .12;
    riquadro(ctx, 1365, 718, wF + 56, 136, P(t, 72.7, 73.2));
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
    drawRich(ctx, 'La somma di una progressione aritmetica è la media\nfra il primo e l’ultimo, per il {g:numero dei termini}.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[400, '{dim:Gauss}'], [960, '{dim:ogni colonna}'], [1520, '{dim:somma dei primi }{mx:n}{dim: termini}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 240, 445, 480, 200);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mink:1 + 2 + … + 100}\n{mink:= }{mg:5050}', x, 568, { size: 42, lh: 1.35 });
    if (i === 1) drawRich(ctx, '{mink:a₁ + aₙ}', x, 568, { size: 50 });
    if (i === 2) drawSeq(ctx, ['{mink:Sₙ = }', { num: '{mink:(a₁ + aₙ)}{mx: n}', den: '{mink:2}' }], x, 572, 44);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La somma di Gauss', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 45.4, 'le due file'], [45.4, FINE, 'la formula']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFile(ctx, t); sceneFine(ctx, t); },
  };
});
