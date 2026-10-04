'use strict';
/* Fitte, ma con un buco — fra due frazioni c'è sempre la loro media; lo zoom su √2; perché le sue cifre non hanno fine né periodo. Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/densita', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, txt,
    dot, hole, dashed, card } = M;

const FINE = 71.8, DURATA = 83.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [10.0, 'felice'], [12.0, 'neutro'],
  [16.9, 'sorpreso'], [18.9, 'neutro'], [21.1, 'felice'], [23.1, 'neutro'], [26.4, 'pensa'], [30.8, 'neutro'],
  [35.2, 'felice'], [37.2, 'neutro'], [48.1, 'pensa'], [52.9, 'sorpreso'], [54.9, 'neutro'], [61.7, 'pensa'],
  [64.0, 'neutro'], [66.5, 'felice'], [68.5, 'neutro'], [FINE + 1.0, 'felice'], [77.8, 'occhiolino'], [79.8, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Quante frazioni ci sono\nfra {mink:1/2} e 1?'],
  // 1 · fra due frazioni, la media
  [7.9, 12.5, 'Fra {mink:1/2} e 1 ce n\'è un\'altra:\nla loro {v:media}, a metà.'],
  [12.6, 16.8, 'Fra {mink:1/2} e {mink:3/4} c\'è la loro media:\n{mink:5/8}.'],
  [16.9, 21.0, 'E poi {mink:9/16}, e così via,\n{g:senza fine}.'],
  [21.1, 25.9, 'La media di due frazioni è ancora\nuna frazione: le frazioni sono {v:fitte}.'],
  // 2 · lo zoom su √2
  [26.4, 30.7, 'Dove sta {mink:√2}, il numero positivo\nche al quadrato fa 2?'],
  [30.8, 35.1, '{mink:1,4² = 1,96} e {mink:1,5² = 2,25}:\n{mink:√2} sta fra 1,4 e 1,5.'],
  [35.2, 39.3, 'Ingrandisco:\nsta fra 1,41 e 1,42.'],
  [39.4, 43.4, 'Ingrandisco ancora:\nfra 1,414 e 1,415.'],
  [43.5, 48.0, 'Ogni tacca è una frazione, come\n{mink:1,414 = 1414/1000}.'],
  [48.1, 52.8, 'Le frazioni ci vanno sempre più\nvicino, ma {r:nessuna} ci arriva.'],
  [52.9, 57.0, 'Lì la retta delle frazioni\nha un {r:buco}.'],
  // 3 · le cifre
  [57.4, 61.6, 'Ogni frazione dà un decimale\n{g:limitato} o {g:periodico}.'],
  [61.7, 66.4, 'Vale anche il contrario: ogni decimale\nlimitato o periodico è una frazione.'],
  [66.5, 71.4, '{mink:√2} non è una frazione, quindi\nle cifre non hanno {v:fine} né {v:periodo}.'],
  // chiusura
  [73.0, 80.8, 'Fitte sì, ma non piene:\nrestano buchi come {mink:√2}.'],
];
const CAPITOLI = [[7.5, 26.0, 'fra due frazioni'], [26.0, 57.2, 'lo zoom su {mink:√2}'], [57.2, FINE, 'le cifre']];
const S2 = Math.SQRT2;
const XL = 240, XR = 1680;
// 1 · la retta da 1/2 a 1 e le medie successive
const YM = 360;
const XM = v => XL + (v - .5) / .5 * (XR - XL);
const MEDIE = [
  { p: 3, q: 4, t: 9.6, a: [1, 2], b: [1, 1] },
  { p: 5, q: 8, t: 12.9, a: [1, 2], b: [3, 4] },
  { p: 9, q: 16, t: 17.1, a: [1, 2], b: [5, 8] },
];
const PICCOLE = [17 / 32, 33 / 64, 65 / 128, 129 / 256, 257 / 512];
// 2 · le tre righe dello zoom: intervallo, passo, quando entra, la fascia dove cade √2, il conto che lo dice
const YR = [290, 500, 705];
const RIGHE = [
  { a: 1, b: 2, passo: .1, t: 26.6, fa: [1.4, 1.5], tf: 31.6, conto: '{mink:1,4² = 1,96 < 2 < 2,25 = 1,5²}' },
  { a: 1.4, b: 1.5, passo: .01, t: 35.4, fa: [1.41, 1.42], tf: 36.2, conto: '{mink:1,41² = 1,9881 < 2 < 2,0164 = 1,42²}' },
  { a: 1.41, b: 1.42, passo: .001, t: 39.6, fa: [1.414, 1.415], tf: 40.4, conto: '{mink:1,414² = 1,999396 < 2 < 2,002225 = 1,415²}' },
];
const XR_ = (r, v) => XL + (v - r.a) / (r.b - r.a) * (XR - XL);
const CIFRE = '41421356237309504880';

// testo su un fondino del colore della scheda (i numeri della retta restano pieni)
function etichetta(ctx, s, x, y, size, al) {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(x - w / 2, y - size * .62, w, size * 1.24); ctx.restore();
  drawRich(ctx, s, x, y, { size, alpha: al });
}
const virgola = v => String(+v.toFixed(3)).replace('.', ',');
const fr = (p, q, k = 'ink') => ({ num: `{m${k}:${p}}`, den: `{m${k}:${q}}` });

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Fitte, ma con un buco', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · fra 1/2 e 1 la media, poi la media della media… (7.5–26.2)
function sceneMedia(ctx, t) {
  if (t < 7.5 || t > 57.6) return;
  card(ctx, 80, 110, 1760, 690, life(t, 7.5, 57.5, .6, .5));
  const al = life(t, 7.8, 26.2, .5, .4);
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(XL - 40, YM); ctx.lineTo(XR + 40, YM); ctx.stroke();
  // gli estremi
  const k0 = P(t, 8.0, 8.5, E.back);
  dot(ctx, [XM(.5), YM], C.v, k0, 10); dot(ctx, [XM(1), YM], C.v, k0, 10);
  drawSeq(ctx, [fr(1, 2)], XM(.5), YM - 90, 46, { alpha: k0 });
  drawRich(ctx, '{mink:1}', XM(1), YM - 90, { size: 54, alpha: k0 });
  // le medie, una dopo l'altra
  MEDIE.forEach((m, i) => {
    const k = P(t, m.t, m.t + .5, E.back); if (k <= 0) return;
    const x = XM(m.p / m.q);
    dot(ctx, [x, YM], C.v, k, 10);
    drawSeq(ctx, [fr(m.p, m.q, 'v')], x, YM - 90, 46, { alpha: k });
    // il conto della media, finché non arriva la media successiva
    const nx = MEDIE[i + 1], kc = life(t, m.t, nx ? nx.t : 26.2, .4, .3);
    const B = m.b[1] === 1 ? '{mink:1}' : fr(m.b[0], m.b[1]);
    drawSeq(ctx, [fr(1, 2), '{mink:· (}', fr(m.a[0], m.a[1]), '{mink:+}', B, '{mink:) =}', fr(m.p, m.q, 'v')], 960, 560, 54, { alpha: kc, local: t - m.t });
  });
  // e così via: altre medie sempre più vicine a 1/2
  PICCOLE.forEach((v, i) => dot(ctx, [XM(v), YM], C.v, P(t, 18.6 + i * .35, 18.9 + i * .35, E.back), 6));
  drawRich(ctx, '{v:densità}: fra due frazioni diverse ce ne sono infinite altre', 960, 690, { size: 38, local: t - 21.4 });
  ctx.restore();
}

// 2 · dove sta √2: tre ingrandimenti (26.4–57.2)
function sceneZoom(ctx, t) {
  if (t < 26.2 || t > 57.4) return;
  const al = life(t, 26.4, 57.3, .4, .5);
  ctx.save(); ctx.globalAlpha *= al;
  const buco = P(t, 53.1, 53.6);
  RIGHE.forEach((R, i) => {
    const y = YR[i], k = P(t, R.t, R.t + .6);
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    if (i) {
      const S = RIGHE[i - 1], ys = YR[i - 1] + 72;
      dashed(ctx, [XR_(S, R.a), ys], [XL, y - 28], C.dim, 1, .8);
      dashed(ctx, [XR_(S, R.b), ys], [XR, y - 28], C.dim, 1, .8);
    }
    ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(XL - 30, y); ctx.lineTo(XR + 30, y); ctx.stroke();
    const n = Math.round((R.b - R.a) / R.passo);
    ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 2.5;
    for (let j = 0; j <= n; j++) { const x = XL + j / n * (XR - XL), h = j === 0 || j === n ? 16 : 10; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y + h); ctx.stroke(); }
    // i numeri: quelli che chiudono la fascia di √2 diventano grandi
    const kb = P(t, R.tf, R.tf + .5);
    for (let j = 0; j <= n; j++) {
      const v = R.a + j * R.passo, s = virgola(v), x = XR_(R, v);
      const chiave = Math.abs(v - R.fa[0]) < 1e-9 || Math.abs(v - R.fa[1]) < 1e-9;
      if (!chiave) { etichetta(ctx, s, x, y + 42, 30, 1); continue; }
      etichetta(ctx, s, x, y + 42, 30, 1 - kb);
      etichetta(ctx, `{x:${s}}`, x, y + 44, 44, kb);
      if (s === '1,414') {
        const kh = life(t, 43.7, 48.0, .3, .4);
        if (kh > 0) { ctx.save(); ctx.globalAlpha *= kh; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x - 68, y + 16, 136, 56, 12); ctx.stroke(); ctx.restore(); }
      }
    }
    ctx.restore();
    if (kb > 0) { ctx.save(); ctx.globalAlpha *= kb; ctx.fillStyle = css(C.x, .14); ctx.fillRect(XR_(R, R.fa[0]), y - 22, XR_(R, R.fa[1]) - XR_(R, R.fa[0]), 44); ctx.restore(); }
    // √2: un punto, che poi diventa un buco
    const kp = P(t, R.tf, R.tf + .4, E.back);
    if (kp > 0) {
      const p = [XR_(R, S2), y];
      if (buco < 1) { ctx.save(); ctx.globalAlpha *= 1 - buco; dot(ctx, p, C.g, kp, 8); ctx.restore(); }
      if (buco > 0) { ctx.save(); ctx.globalAlpha *= buco; hole(ctx, p, C.r, 1, 10); ctx.restore(); }
      drawRich(ctx, buco > .5 ? '{mr:√2}' : '{mg:√2}', p[0] + 22, y - 40, { size: 40, align: 'left', alpha: P(t, R.tf, R.tf + .4) });
    }
    // il conto che dice fra quali numeri sta √2
    const nx = RIGHE[i + 1];
    drawRich(ctx, R.conto, 960, 172, { size: 44, alpha: life(t, i ? R.t : 31.0, nx ? nx.t : 57.3, .4, .3) });
  });
  ctx.restore();
}

// 3 · le cifre: ogni frazione dà un decimale limitato o periodico (57.2–FINE)
function sceneCifre(ctx, t) {
  if (t < 57.1 || t > FINE + .3) return;
  const al = life(t, 57.3, FINE + .2, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 240, 150, 1440, 620);
  const k1 = P(t, 57.7, 58.2), k2 = P(t, 58.4, 58.9), S = 58;
  drawSeq(ctx, [fr(3, 8)], 640, 270, S, { alpha: k1 });
  drawRich(ctx, '{mink:= 0,375}', 690, 270, { size: S, align: 'left', alpha: k1 });
  drawRich(ctx, '{g:limitato}', 1120, 270, { size: 44, align: 'left', alpha: k1 });
  drawSeq(ctx, [fr(1, 3)], 640, 420, S, { alpha: k2 });
  drawRich(ctx, '{mink:= 0,3}', 690, 420, { size: S, align: 'left', alpha: k2 });
  if (k2 > 0) {   // il periodo, soprassegnato come nel sito
    const x0 = 690 + richW(ctx, '{mink:= 0,}', S), w = richW(ctx, '{mink:3}', S);
    ctx.save(); ctx.globalAlpha *= k2; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(x0 + 3, 420 - S * .62); ctx.lineTo(x0 + w - 3, 420 - S * .62); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, '{g:periodico}', 1120, 420, { size: 44, align: 'left', alpha: k2 });
  // frazione → limitato o periodico, poi anche il contrario: la doppia freccia
  const kv1 = P(t, 57.9, 58.4) * (1 - P(t, 61.8, 62.1)), kv2 = P(t, 62.0, 62.4);
  drawRich(ctx, '{v:frazione}  {mink:⟶}  decimale {g:limitato} o {g:periodico}', 960, 528, { size: 42, alpha: kv1 });
  drawRich(ctx, '{v:frazione}  {mink:⟷}  decimale {g:limitato} o {g:periodico}', 960, 528, { size: 42, alpha: kv2 });
  const ks = P(t, 66.6, 67.0);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(320, 585); ctx.lineTo(1600, 585); ctx.stroke(); ctx.restore(); }
  const n = Math.floor(kf(t, [[66.8, 0], [69.4, CIFRE.length]]));
  if (t > 66.7) drawRich(ctx, '{mink:√2 = 1,' + CIFRE.slice(0, n) + '}' + (n === CIFRE.length ? '…' : ''), 330, 652, { size: 62, align: 'left' });
  drawRich(ctx, '{dim:non lo si vede dalle prime cifre: viene dal fatto che }{mink:√2}{dim: non è una frazione}', 960, 728, { size: 34, local: t - 69.6 });
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le frazioni sono fitte,\nma lasciano dei buchi.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, 'fra due frazioni\nce n\'è sempre un\'{v:altra}'], [960, '{mink:√2} è un {r:buco}\nfra le frazioni'], [1490, 'le cifre di {mink:√2}: senza\n{v:fine} né {v:periodo}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 240, 435, 480, 150);
    drawRich(ctx, s, x, 510, { size: 40, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Fitte, ma con un buco', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneMedia(ctx, t); sceneZoom(ctx, t); sceneCifre(ctx, t); sceneFine(ctx, t); },
  };
});
