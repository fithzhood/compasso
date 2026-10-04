'use strict';
/* Le regole delle potenze — si contano i fattori: a³ · a² = a⁵, (a³)² = a⁶; dividendo ancora per a, a⁰ = 1 e a⁻² = 1/a². Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/potenze', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, txt, card } = M;

const FINE = 79.4, DURATA = 91.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [22.1, 'felice'], [24.1, 'neutro'],
  [27.1, 'felice'], [29.1, 'neutro'], [36.5, 'felice'], [38.5, 'neutro'], [50.1, 'pensa'], [54.9, 'sorpreso'],
  [56.9, 'neutro'], [69.5, 'sorpreso'], [71.5, 'neutro'], [74.5, 'pensa'], [76.9, 'neutro'],
  [FINE + 1.0, 'felice'], [86.0, 'occhiolino'], [88.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Da dove vengono le regole\ndelle potenze?'],
  // 1 · contare i fattori
  [7.9, 12.5, '{mink:a³} vuol dire {mink:a · a · a}:\ntre fattori uguali ad {mink:a}.'],
  [12.6, 17.7, '{mink:a} è la {x:base}, un numero qualunque;\nil 3 è l\'{v:esponente}: conta i fattori.'],
  [17.8, 22.0, 'Ora moltiplico {mink:a³ · a²}:\ntre fattori, poi altri due.'],
  [22.1, 27.0, 'In tutto sono {g:cinque} fattori:\n{mink:a³ · a² = a⁵}.'],
  [27.1, 31.6, 'Con la {x:stessa base}, gli esponenti\nsi {g:sommano}: {mink:3 + 2 = 5}.'],
  // 2 · potenza di potenza
  [31.8, 36.4, '{mink:(a³)²} vuol dire {mink:a³ · a³}:\ndue gruppi da tre fattori.'],
  [36.5, 41.2, 'Sono {mink:3 · 2 = 6} fattori:\n{mink:(a³)² = a⁶}. Qui si {g:moltiplicano}.'],
  // 3 · esponente zero e negativo
  [41.4, 46.0, 'Divido per {mink:a}, con {mink:a ≠ 0}: tolgo\nun fattore, l\'esponente scende di 1.'],
  [46.1, 50.0, 'Ancora: {mink:a² : a = a¹}.\nUn fattore solo: {mink:a¹ = a}.'],
  [50.1, 54.8, 'E se divido anche l\'ultimo?\n{mink:a : a = 1}: un numero diviso per sé.'],
  [54.9, 59.4, 'Seguendo la scala è {mink:a⁰}: quindi\n{mink:a⁰ = 1}, per ogni {mink:a ≠ 0}.'],
  [59.5, 64.4, 'Divido ancora: {mink:1 : a = 1/a}.\nL\'esponente scende a {mink:−1}.'],
  [64.5, 69.4, 'E ancora: {mink:a⁻² = 1/a²}:\nè il {v:reciproco} di {mink:a²}.'],
  [69.5, 74.4, 'Attenzione: {mink:a⁻²} {r:non} è un numero\nnegativo. Con {mink:a = 2} fa {mink:1/4}.'],
  [74.5, 79.0, 'Qui si divide per {mink:a}: per questo\nserve {mink:a ≠ 0}.'],
  // chiusura
  [80.6, 88.4, 'Basta contare i fattori:\nle regole vengono da lì.'],
];
const CAPITOLI = [[7.5, 31.6, 'contare i fattori'], [31.6, 41.2, 'potenza di potenza'], [41.2, FINE, 'esponente zero e negativo']];
const PASSO = 170, TS = 110;   // distanza fra i fattori, lato della tessera
// la scala a destra: potenza, quando compare, colore
const SCALA = [
  ['{mink:a³}', 41.6], ['{mink:a²}', 43.2], ['{mink:a¹ = a}', 47.1],
  ['{mink:a⁰ = }{mg:1}', 55.1], ['{mink:a⁻¹ = 1/a}', 61.0], ['{mink:a⁻² = 1/a²}', 65.8],
];

// una tessera: un fattore uguale ad a
function tessera(ctx, x, y, col, al = 1, s = 1) {
  if (al <= 0 || s <= 0) return;
  const L = TS * s;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = css(C[col], .13); ctx.strokeStyle = css(C[col]); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - L / 2, y - L / 2, L, L, 18 * s); ctx.fill(); ctx.stroke();
  drawRich(ctx, `{m${col}:a}`, x, y - 4 * s, { size: 64 * s });
  ctx.restore();
}
// una fila di tessere con il punto del prodotto fra l'una e l'altra
function fila(ctx, xs, y, cols, al = 1) {
  xs.forEach((x, i) => {
    tessera(ctx, x, y, cols[i], al);
    if (i) drawRich(ctx, '{mink:·}', (xs[i - 1] + x) / 2, y, { size: 60, alpha: al });
  });
}
// la graffa sotto un gruppo, col suo nome
function graffa(ctx, x0, x1, y, s, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink, .6); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y - 14); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y - 14); ctx.stroke();
  ctx.restore();
  drawRich(ctx, s, (x0 + x1) / 2, y + 46, { size: 50, alpha: al });
}
// i numeri che contano i fattori
function conta(ctx, xs, y, al) {
  if (al <= 0) return;
  xs.forEach((x, i) => txt(ctx, String(i + 1), x, y, { size: 34, color: C.dim, alpha: al }));
}
const centrati = (n, cx = 960) => Array.from({ length: n }, (_, i) => cx + (i - (n - 1) / 2) * PASSO);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le regole delle potenze', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · contare i fattori: a³ · a² e (a³)² (7.5–41.4)
function sceneFattori(ctx, t) {
  if (t < 7.5 || t > 41.6) return;
  const al = 1 - P(t, 40.9, 41.4);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 80, 110, 1760, 690, P(t, 7.5, 8.2));
  const YF = 235, YT = 495, YG = 585, YC = 410;
  // 1 · a³ e poi a³ · a²
  const aA = life(t, 8.0, 31.6, .4, .4);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    // la formula in alto
    drawRich(ctx, '{mink:a³}', 960, YF, { size: 120, alpha: life(t, 8.0, 18.0, .4, .3) });
    drawRich(ctx, '{mink:a³ · a²}', 960, YF, { size: 110, alpha: life(t, 17.9, 22.5, .3, .3) });
    drawRich(ctx, '{mink:a³ · a² = }{mg:a⁵}', 960, YF, { size: 110, alpha: life(t, 22.4, 27.5, .3, .3) });
    drawRich(ctx, '{mink:a³ · a² = a³⁺² = }{mg:a⁵}', 960, YF, { size: 110, alpha: P(t, 27.4, 27.8) });
    // base ed esponente
    const kl = life(t, 12.8, 17.8, .4, .3);
    if (kl > 0) {
      const w = richW(ctx, '{mink:a³}', 120), wa = richW(ctx, '{mink:a}', 120), xa = 960 - w / 2 + wa / 2;
      drawRich(ctx, '{x:base}', xa, YF + 92, { size: 38, alpha: kl });
      drawRich(ctx, '{v:esponente}', 960 + w / 2 + 18, YF - 52, { size: 38, align: 'left', alpha: kl });
    }
    // le tessere: prima tre, poi tre più due, che si avvicinano
    const kb = P(t, 17.9, 18.5), G = 90 * (1 - P(t, 22.3, 23.1));
    const xsA = centrati(3), xsB = Array.from({ length: 5 }, (_, i) => 960 + (i - 2) * PASSO + (i >= 3 ? G / 2 : -G / 2) + (i < 3 ? 0 : 0));
    const xs = [0, 1, 2].map(i => lerp(xsA[i], xsB[i], kb));
    const k3 = [0, 1, 2].map(i => P(t, 8.6 + i * .35, 9.0 + i * .35, E.back));
    xs.forEach((x, i) => { tessera(ctx, x, YT, 'x', 1, k3[i]); if (i && k3[i] > .5) drawRich(ctx, '{mink:·}', (xs[i - 1] + x) / 2, YT, { size: 60 }); });
    const k2 = P(t, 18.2, 18.7, E.back);
    if (k2 > 0) {
      drawRich(ctx, '{mink:·}', (xs[2] + xsB[3]) / 2, YT, { size: 60, alpha: k2 });
      tessera(ctx, xsB[3], YT, 'y', 1, k2); drawRich(ctx, '{mink:·}', (xsB[3] + xsB[4]) / 2, YT, { size: 60, alpha: k2 });
      tessera(ctx, xsB[4], YT, 'y', 1, k2);
    }
    // i conti dei fattori
    conta(ctx, xs, YC, life(t, 12.8, 17.8, .4, .3));
    conta(ctx, xsB, YC, P(t, 23.2, 23.6));
    // le graffe
    graffa(ctx, xs[0] - TS / 2, xs[2] + TS / 2, YG, '{mink:a³}', life(t, 18.4, 22.4, .4, .3));
    graffa(ctx, xsB[3] - TS / 2, xsB[4] + TS / 2, YG, '{mink:a²}', life(t, 18.6, 22.4, .4, .3));
    graffa(ctx, xsB[0] - TS / 2, xsB[4] + TS / 2, YG, '{mg:a⁵}', P(t, 23.1, 23.5));
    ctx.restore();
  }
  // 2 · (a³)²: due gruppi da tre
  const aB = life(t, 31.8, 41.6, .4, .4);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    drawRich(ctx, '{mink:(a³)² = a³ · a³}', 960, YF, { size: 110, alpha: 1 - P(t, 36.6, 36.9) });
    // (a³)² = a^(3·2) = a⁶: l'esponente «3 · 2» si scrive a mano, piccolo e alzato
    const k6 = P(t, 36.8, 37.2);
    if (k6 > 0) {
      const A = '{mink:(a³)² = a}', B = '{mink:3 · 2}', Cc = '{mink: = }{mg:a⁶}', sB = 64;
      const wA = richW(ctx, A, 110), wB = richW(ctx, B, sB), wC = richW(ctx, Cc, 110), x0 = 960 - (wA + wB + 6 + wC) / 2;
      drawRich(ctx, A, x0, YF, { size: 110, align: 'left', alpha: k6 });
      drawRich(ctx, B, x0 + wA + 3, YF - 44, { size: sB, align: 'left', alpha: k6 });
      drawRich(ctx, Cc, x0 + wA + wB + 6, YF, { size: 110, align: 'left', alpha: k6 });
    }
    const G = 90 * (1 - P(t, 36.7, 37.5));
    const xs = Array.from({ length: 6 }, (_, i) => 960 + (i - 2.5) * PASSO + (i >= 3 ? G / 2 : -G / 2));
    const cols = ['x', 'x', 'x', 'v', 'v', 'v'];
    xs.forEach((x, i) => {
      const k = P(t, 32.0 + i * .2, 32.4 + i * .2, E.back);
      tessera(ctx, x, YT, cols[i], 1, k);
      if (i && k > .5) drawRich(ctx, '{mink:·}', (xs[i - 1] + x) / 2, YT, { size: 60 });
    });
    graffa(ctx, xs[0] - TS / 2, xs[2] + TS / 2, YG, '{mink:a³}', life(t, 33.0, 37.0, .4, .3));
    graffa(ctx, xs[3] - TS / 2, xs[5] + TS / 2, YG, '{mink:a³}', life(t, 33.2, 37.0, .4, .3));
    graffa(ctx, xs[0] - TS / 2, xs[5] + TS / 2, YG, '{mg:a⁶}', P(t, 37.5, 37.9));
    conta(ctx, xs, YC, P(t, 37.6, 38.0));
    ctx.restore();
  }
  ctx.restore();
}

// 3 · dividere ancora per a: a⁰ e gli esponenti negativi (41.2–FINE)
const TOLTE = [42.4, 46.3, 50.6];   // quando si toglie un fattore (dura 0,8 s)
function sceneScala(ctx, t) {
  if (t < 41.0 || t > FINE + .3) return;
  const al = life(t, 41.2, FINE + .2, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 80, 110, 1100, 690);
  card(ctx, 1220, 110, 620, 690);
  const CX = 630, YT = 450;
  // la formula del passo
  const FORM = [[41.6, 42.4, '{mink:a³}'], [42.4, 46.3, '{mink:a³ : a = a²}'], [46.3, 50.6, '{mink:a² : a = a¹ = a}'],
    [50.6, 55.1, '{mink:a : a = }{mg:1}'], [55.1, 59.8, '{mink:a⁰ = }{mg:1}'], [59.8, 64.8, '{mink:1 : a = a⁻¹}'], [64.8, 99, '{mink:a⁻¹ : a = a⁻²}']];
  FORM.forEach(([a, b, s]) => drawRich(ctx, s, CX, 210, { size: 84, alpha: life(t, a, b, .3, .25) }));
  // le tessere che restano, e quella che se ne va
  const k0 = P(t, 41.6, 42.1, E.back);
  let n = 3, kv = 0;
  TOLTE.forEach(a => { if (t >= a + .8) n--; else if (t >= a) kv = P(t, a, a + .8); });
  if (n > 0) {
    const da = centrati(n, CX), a2 = centrati(Math.max(n - 1, 1), CX);
    const xs = [];
    for (let i = 0; i < n - (kv > 0 ? 1 : 0); i++) xs.push(kv > 0 ? lerp(da[i], a2[i], E.io(kv)) : da[i]);
    xs.forEach((x, i) => { tessera(ctx, x, YT, 'x', 1, k0); if (i) drawRich(ctx, '{mink:·}', (xs[i - 1] + x) / 2, YT, { size: 60, alpha: k0 }); });
    if (kv > 0) tessera(ctx, da[n - 1] + 60 * kv, YT - 110 * kv, 'x', 1 - kv);
  }
  // l'1 che resta, poi la frazione 1/a e 1/a²
  const kf1 = P(t, 59.8, 60.8), kd2 = P(t, 64.8, 65.6);
  const k1 = P(t, 51.3, 51.8, E.back);
  if (k1 > 0) {
    const y1 = lerp(YT, YT - 88, kf1), s1 = lerp(120, 84, kf1);
    drawRich(ctx, '{mg:1}', CX, y1, { size: s1 * k1 });
  }
  if (kf1 > 0) {
    const half = lerp(70, 160, kd2) * P(t, 60.2, 60.8);
    if (half > 1) {
      ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(CX - half, YT); ctx.lineTo(CX + half, YT); ctx.stroke(); ctx.restore();
    }
    const xd1 = lerp(CX + 300, lerp(CX, CX - 85, kd2), kf1);
    tessera(ctx, xd1, YT + 78, 'x', kf1, .78);
    if (kd2 > 0) {
      tessera(ctx, lerp(CX + 300, CX + 85, kd2), YT + 78, 'x', kd2, .78);
      drawRich(ctx, '{mink:·}', CX, YT + 78, { size: 56, alpha: kd2 });
    }
  }
  // l'esempio con a = 2
  const ke = P(t, 69.8, 70.3);
  if (ke > 0) {
    drawRich(ctx, 'con {mink:a = 2}', CX, 628, { size: 38, alpha: ke });
    drawSeq(ctx, ['{mink:2⁻² =}', { num: '{mink:1}', den: '{mink:2²}' }, '{mink:=}', { num: '{mg:1}', den: '{mg:4}' }], CX, 714, 46, { local: t - 69.8 });
  }
  // la scala
  const RX = 1530;
  conFont(TITOLI, () => drawRich(ctx, 'la scala', RX, 168, { size: 40, weight: 600 }));
  SCALA.forEach(([s, ta], i) => {
    const k = P(t, ta, ta + .5, E.out); if (k <= 0) return;
    const y = 240 + i * 82, next = SCALA[i + 1];
    const hl = life(t, ta, next ? next[1] : FINE, .3, .3);
    if (hl > 0) { ctx.save(); ctx.globalAlpha *= hl * k; ctx.fillStyle = css(C.v, .12); ctx.beginPath(); ctx.roundRect(1380, y - 34, 420, 68, 14); ctx.fill(); ctx.restore(); }
    drawRich(ctx, s, 1410, y, { size: 50, align: 'left', alpha: k });
    if (i) drawRich(ctx, '{mdim:: a}', 1300, y - 41, { size: 36, alpha: k });
  });
  // a ≠ 0
  // a ≠ 0: scritto da quando si comincia a dividere, cerchiato quando Ada spiega perché
  drawRich(ctx, '{mink:a ≠ 0}', RX, 738, { size: 46, alpha: P(t, 42.0, 42.5) });
  const kz = P(t, 74.7, 75.2);
  if (kz > 0) {
    ctx.save(); ctx.globalAlpha *= kz; ctx.strokeStyle = css(C.r); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(RX - 110, 706, 220, 64, 16); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le regole delle potenze vengono\ndal contare i fattori.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, 'esponenti {g:sommati}\n{mink:a³ · a² = a⁵}'], [960, 'esponenti {g:moltiplicati}\n{mink:(a³)² = a⁶}'], [1490, '{mink:a⁰ = 1},  {mink:a⁻² = 1/a²}\ncon {mink:a ≠ 0}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 255, 432, 510, 156);
    drawRich(ctx, s, x, 510, { size: 40, weight: 400, lh: 1.4 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Le regole delle potenze', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneFattori(ctx, t); sceneScala(ctx, t); sceneFine(ctx, t); },
  };
});
