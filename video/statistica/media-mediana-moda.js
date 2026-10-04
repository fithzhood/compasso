'use strict';
/* Media, mediana, moda — cinque voti su una tavola: la media è il punto d'equilibrio (gli scarti sommano zero),
   la mediana sta al centro dei dati ordinati, la moda è il più frequente. Il valore anomalo sta in valore-anomalo.js.
   Argomento: statistica. */
CVIDEO.registra('statistica/media-mediana-moda', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, card, arrowHead } = M;

const FINE = 65.6, DUR = 77.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [19.6, 'felice'], [23.6, 'sorpreso'], [27.4, 'felice'], [30.6, 'neutro'],
  [38.6, 'festa'], [41.6, 'neutro'], [46.4, 'felice'], [49.8, 'neutro'], [57.0, 'felice'], [60.6, 'neutro'],
  [FINE + 1.0, 'felice'], [71.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Un numero solo per tanti dati:\nquale scegliere?'],
  // 1 · la media
  [8.0, 12.0, 'Cinque voti in ordine sparso:\n{mink:7, 4, 10, 4, 5}.'],
  [12.2, 17.2, 'La {v:media} {mink:x̄} è la somma dei dati\ndivisa per {mink:N}, quanti sono.'],
  [17.4, 21.4, 'Qui {mink:N = 5} e la somma è 30:\n{mink:x̄ = 6}.'],
  [21.6, 25.6, 'Appoggio la tavola sul 5:\n{r:pende} a destra.'],
  [25.8, 30.4, 'Sul 6, la media, sta in {g:equilibrio}:\nnon pende da nessuna parte.'],
  [30.6, 35.4, 'Ogni dato {mink:xᵢ} meno la media\nè il suo {v:scarto}: {mink:xᵢ − x̄}.'],
  [35.6, 40.6, 'A sinistra fanno {mink:−5}, a destra {mink:+5}:\nla somma degli scarti è {g:0}.'],
  // 2 · la mediana e la moda
  [41.6, 45.6, 'La {y:mediana}: prima metto\n{g:in ordine} i dati.'],
  [45.8, 49.6, 'Il valore al centro è la mediana:\nqui {y:5}.'],
  [49.8, 55.0, 'Con {mink:N} pari i centrali sono due:\nla mediana è la loro media.'],
  [55.2, 60.4, 'La {g:moda} è il valore più frequente:\nqui il 4, che c’è due volte.'],
  [60.6, 65.0, 'Qui danno tre valori diversi:\nmedia 6, mediana 5, moda 4.'],
  // chiusura
  [66.4, 74.7, 'Media l’equilibrio, mediana il centro,\nmoda il valore più frequente.'],
];

// ---- la tavola dei voti ----
const CARD = [110, 110, 1040, 690], PAN = [1180, 110, 630, 690];
const XV = v => 630 + (v - 5.5) * 80, YP = 560, R = 18;
const VOTI = [7, 4, 10, 4, 5];
const LIV = [0, 0, 0, 1, 0];                 // il secondo 4 sta sopra il primo
const ORD = [3, 0, 4, 1, 2];                 // posto di ogni voto dopo averli ordinati: 4, 4, 5, 7, 10
const CHIP = i => 630 + (i - 2) * 110, YC = 190;
const TILT = 7 * Math.PI / 180;
// il fulcro e l'inclinazione della tavola
const xFul = t => kf(t, [[26.0, 5], [27.2, 6]]);
const ang = t => kf(t, [[22.6, 0], [23.6, TILT], [26.0, TILT], [27.2, 0]]);
// un punto della tavola, ruotato attorno al fulcro
function rot(t, p) {
  const a = ang(t); if (!a) return p;
  const cx = XV(xFul(t)), cy = YP + 12, c = Math.cos(a), s = Math.sin(a);
  return [cx + (p[0] - cx) * c - (p[1] - cy) * s, cy + (p[0] - cx) * s + (p[1] - cy) * c];
}
function riquadro(ctx, x, y, w, h, col, al, riempi = .10) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, riempi); ctx.strokeStyle = css(col); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 14); ctx.fill(); ctx.stroke(); ctx.restore();
}
// una freccina sotto la tavola che indica un valore, con il suo nome di lato
// dy: quanto più in basso sta il nome (con un filo dalla freccina, se è lontano); size: grandezza del nome
function puntatore(ctx, t, v, col, nome, lato, al, dy = 44, size = 36) {
  if (al <= 0) return;
  const [x, y] = rot(t, [XV(v), YP + 72]);
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col);
  ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x - 13, y + 10); ctx.lineTo(x + 13, y + 10); ctx.closePath(); ctx.fill();
  if (dy > 50) { ctx.strokeStyle = css(col, .7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.lineTo(x, y + dy - 22); ctx.stroke(); }
  drawRich(ctx, nome, x + lato * 14, y + dy, { size, align: lato < 0 ? 'right' : lato > 0 ? 'left' : 'center' });
  ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Media, mediana, moda', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · la tavola dei voti (7.5–65.6)
function sceneTavola(ctx, t) {
  if (t < 7.5 || t > 65.7) return;
  const al = 1 - P(t, 65.0, 65.6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // i voti in alto: si ordinano quando Ada lo dice
  const ko = P(t, 42.2, 43.8);
  VOTI.forEach((v, i) => {
    const k = P(t, 8.2 + i * .15, 8.7 + i * .15, E.back); if (k <= 0) return;
    const d = ORD[i] - i, x = lerp(CHIP(i), CHIP(ORD[i]), ko), y = YC + (d > 0 ? -30 : 52) * Math.sin(Math.PI * ko) * (d ? 1 : 0);
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    riquadro(ctx, 0, 0, 84, 70, C.x, 1);
    txt(ctx, String(v), 0, 2, { size: 46, weight: 600 });
    ctx.restore();
  });
  // il centro dei dati ordinati, e i due 4
  riquadro(ctx, CHIP(2), YC, 96, 82, C.y, life(t, 46.0, 65.6, .4, .1), 0);
  riquadro(ctx, (CHIP(0) + CHIP(1)) / 2, YC, 206, 82, C.g, life(t, 55.6, 65.6, .4, .1), 0);
  // la tavola, i numeri, i voti appoggiati sopra
  const kt = P(t, 7.8, 8.8);
  if (kt > 0) {
    const a = ang(t), px = XV(xFul(t)), py = YP + 12;
    // il fulcro: chiaro in alto, perché il numero sopra resti leggibile
    const kf2 = life(t, 21.8, 41.2, .4, .5);
    if (kf2 > 0) {
      ctx.save(); ctx.globalAlpha *= kf2;
      ctx.fillStyle = css(C.v, .16); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 46, YP + 120); ctx.lineTo(px + 46, YP + 120); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.rect(0, YP + 66, W, 80); ctx.clip();
      ctx.strokeStyle = css(C.v, .7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 46, YP + 120); ctx.lineTo(px + 46, YP + 120); ctx.closePath(); ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = css(C.dim, .6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(XV(0), YP + 121); ctx.lineTo(XV(11), YP + 121); ctx.stroke();
      ctx.restore();
    }
    ctx.save(); ctx.globalAlpha *= kt;
    ctx.save(); ctx.translate(px, py); ctx.rotate(a);
    ctx.fillStyle = css(C.ink, .22); ctx.beginPath(); ctx.roundRect(XV(-.4) - px, -12, XV(11.4) - XV(-.4), 12, 6); ctx.fill();
    ctx.strokeStyle = css(C.ink, .5); ctx.lineWidth = 2;
    for (let v = 0; v <= 11; v++) { ctx.beginPath(); ctx.moveTo(XV(v) - px, 0); ctx.lineTo(XV(v) - px, 8); ctx.stroke(); }
    ctx.restore();
    for (let v = 0; v <= 11; v++) { const p = rot(t, [XV(v), YP + 46]); txt(ctx, String(v), p[0], p[1], { size: 30, color: C.dim }); }
    ctx.restore();
    VOTI.forEach((v, i) => {
      const k = P(t, 9.4 + i * .3, 9.9 + i * .3, E.back);
      dot(ctx, rot(t, [XV(v), YP - R - 2 - LIV[i] * 40]), C.x, k, R);
    });
    // i due 4: la moda
    const km = life(t, 55.6, 65.6, .4, .1);
    if (km > 0) {
      ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
      ctx.beginPath(); ctx.roundRect(XV(4) - 30, YP - 92, 60, 88, 26); ctx.stroke(); ctx.restore();
    }
  }
  // dove sta x̄, poi la mediana, la moda e la media
  puntatore(ctx, t, 6, C.v, '{mv:x̄}', 0, life(t, 18.8, 21.6, .4, .4), 44, 44);
  puntatore(ctx, t, 5, C.y, '{y:mediana}', 0, life(t, 46.2, 65.6, .4, .1), 104);
  puntatore(ctx, t, 4, C.g, '{g:moda}', -1, life(t, 55.8, 65.6, .4, .1));
  puntatore(ctx, t, 6, C.v, '{v:media}', 1, life(t, 61.0, 65.6, .4, .1));
  // gli scarti: frecce dalla media a ogni voto
  const ks = life(t, 30.8, 41.0, .4, .5);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks;
    ctx.save(); ctx.strokeStyle = css(C.v, .8); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.moveTo(XV(6), YP - 4); ctx.lineTo(XV(6), 246); ctx.stroke(); ctx.restore();
    VOTI.forEach((v, i) => {
      const k = P(t, 31.0 + i * .3, 31.5 + i * .3, E.out); if (k <= 0) return;
      const y = 266 + i * 46, x1 = lerp(XV(6), XV(v), k), s = v - 6;
      // un filo dalla punta della freccia al suo voto
      const kc = P(t, 31.5 + i * .3, 31.9 + i * .3);
      if (kc > 0) {
        const yd = YP - 2 * R - 4 - LIV[i] * 40;
        ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.dim, .55); ctx.lineWidth = 2; ctx.setLineDash([5, 7]);
        ctx.beginPath(); ctx.moveTo(XV(v), y + 10); ctx.lineTo(XV(v), yd); ctx.stroke(); ctx.restore();
      }
      ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(XV(6), y); ctx.lineTo(x1 - Math.sign(s) * 8, y); ctx.stroke(); ctx.restore();
      arrowHead(ctx, [x1, y], s < 0 ? Math.PI : 0, C.ink, .9);
      drawRich(ctx, `{mv:${s < 0 ? '−' : '+'}${Math.abs(s)}}`, x1 + Math.sign(s) * 16, y, { size: 40, align: s < 0 ? 'right' : 'left', alpha: k });
    });
    ctx.restore();
  }
  ctx.restore();
}

// il riquadro a destra: i conti della media, poi mediana e moda
const PX = PAN[0] + PAN[2] / 2;
function linea(ctx, y, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function scenePannello(ctx, t) {
  const pa = life(t, 12.3, 41.4, .5, .5);
  if (pa > 0) {
    card(ctx, ...PAN, pa);
    ctx.save(); ctx.globalAlpha *= pa;
    conFont(TITOLI, () => drawRich(ctx, 'la media', PX, 170, { size: 40, weight: 600 }));
    drawSeq(ctx, ['{mink:x̄ =}', { num: 'somma dei dati', den: '{mink:N}' }], PX, 275, 44, { local: t - 12.6 });
    drawSeq(ctx, ['{mink:x̄ =}', { num: '{mink:7 + 4 + 10 + 4 + 5}', den: '{mink:5}' }], PX, 415, 44, { local: t - 17.6 });
    drawSeq(ctx, ['{mink:=}', { num: '{mink:30}', den: '{mink:5}' }, '{mink:= }{mv:6}'], PX, 530, 44, { local: t - 18.6 });
    linea(ctx, 605, P(t, 30.8, 31.2));
    drawRich(ctx, '{dim:scarti }{mink:xᵢ − x̄}', PX, 655, { size: 40, local: t - 31.0 });
    drawRich(ctx, '{mink:−2 − 2 − 1 + 1 + 4 = }{mg:0}', PX, 740, { size: 44, local: t - 36.2 });
    ctx.restore();
  }
  const pb = life(t, 41.8, 65.6, .5, .6);
  if (pb > 0) {
    card(ctx, ...PAN, pb);
    ctx.save(); ctx.globalAlpha *= pb;
    conFont(TITOLI, () => drawRich(ctx, 'la mediana', PX, 170, { size: 40, weight: 600 }));
    drawRich(ctx, '{y:mediana}{mink: = 5}', PX, 260, { size: 44, local: t - 46.2 });
    linea(ctx, 320, P(t, 50.0, 50.4));
    drawRich(ctx, '{dim:con }{mink:N}{dim: pari, per esempio}', PX, 372, { size: 34, local: t - 50.0 });
    drawRich(ctx, '{mink:2, }{my:4}{mink:, }{my:6}{mink:, 10}', PX, 445, { size: 44, local: t - 50.5 });
    drawSeq(ctx, ['{y:mediana}{mink: =}', { num: '{mink:4 + 6}', den: '{mink:2}' }, '{mink:= 5}'], PX, 548, 44, { local: t - 51.6 });
    linea(ctx, 625, P(t, 55.4, 55.8));
    drawRich(ctx, '{g:moda}{mink: = 4}', PX, 685, { size: 44, local: t - 55.6 });
    drawRich(ctx, '{dim:il valore più frequente}', PX, 748, { size: 32, local: t - 56.2 });
    ctx.restore();
  }
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La media è il punto d’{v:equilibrio}, la mediana\nil {y:centro}, la moda il valore più {g:frequente}.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, '{v:media}: il punto\nd’equilibrio'], [960, '{y:mediana}: al centro\ndei dati ordinati'], [1450, '{g:moda}: il valore\npiù frequente']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 450, 440, 140);
    drawRich(ctx, s, x, 520, { size: 34, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Media, mediana, moda', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 41.4, 'la media'], [41.4, 65.6, 'la mediana e la moda']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneTavola(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
