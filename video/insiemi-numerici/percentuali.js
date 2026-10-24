'use strict';
/* +20% e poi −20% — 100 € che salgono a 120 € e poi scendono a 96 €: le barre mostrano che il secondo 20%
   si prende su una base più grande (24 € invece di 20 €). Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/percentuali', M => {
  const { W, C, E, P, life, lerp, css, mix, TITOLI, conFont, drawRich, richW, txt, arrowHead, card } = M;

const FINE = 63.2, DURATA = 74.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [12.0, 'felice'], [14.0, 'neutro'],
  [23.0, 'felice'], [25.9, 'pensa'], [28.4, 'neutro'], [35.1, 'sorpreso'], [37.2, 'neutro'],
  [43.9, 'sorpreso'], [46.0, 'neutro'], [48.6, 'pensa'], [51.0, 'neutro'], [58.3, 'felice'], [60.4, 'neutro'],
  [FINE + 1.0, 'felice'], [69.0, 'occhiolino'], [71.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [1.8, 6.4, 'Sale del 20%, poi scende del 20%:\ntorna com’era?'],
  // 1 · su del 20%
  [7.9, 11.5, 'Una giacca costa {g:100 €}.'],
  [11.6, 16.4, 'Il 20% vuol dire 20 su 100:\nsu 100 €, sono {g:20 €}.'],
  [16.5, 20.8, 'Cioè un quinto: 5 blocchi\nda 20 € fanno 100 €.'],
  [20.9, 25.4, 'Il prezzo sale del 20%:\n{mink:100 + 20 = 120} €.'],
  // 2 · giù del 20%
  [25.8, 30.0, 'Ora scende del 20%.\nTorna a 100 €?'],
  [30.1, 34.7, 'Il 20% si prende sul prezzo\n{v:di adesso}: su 120 €.'],
  [34.8, 39.3, 'Un quinto di 120 è {r:24 €}:\npiù dei 20 di prima.'],
  [39.4, 43.8, 'Tolgo 24 €:\n{mink:120 − 24 = 96} €.'],
  [43.9, 48.2, 'Non torna a 100:\nresta a {r:96 €}!'],
  // 3 · perché
  [48.6, 53.4, 'Il +20% era su 100,\nil −20% su 120: base {v:più grande}.'],
  [53.5, 58.0, 'Così si toglie {r:4 €} in più\ndi quanto si era aggiunto.'],
  [58.1, 62.6, 'Da 100 a 96 €: in tutto\nil prezzo scende del {r:4%}.'],
  // chiusura
  [64.6, 71.4, 'Il secondo 20% si prende\nsu una base più grande.'],
];
const CAPITOLI = [[7.5, 25.6, 'su del 20%'], [25.6, 48.4, 'giù del 20%'], [48.4, FINE, 'perché']];

// ---- le barre dei prezzi: 4 px per euro, tutte sulla stessa base ----
const BY = 690, U = 4, BW = 180, XA = 280, XB = 590, XC = 900;
const yE = e => BY - e * U;                     // la quota di e euro
// un blocco da e0 a e1 euro, alzato di dy pixel
function blocco(ctx, x, e0, e1, col, al, dy = 0) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const y0 = yE(e1) + dy, h = (e1 - e0) * U;
  ctx.fillStyle = css(col, .22); ctx.fillRect(x - BW / 2, y0, BW, h);
  ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.strokeRect(x - BW / 2, y0, BW, h);
  ctx.restore();
}
// le righe che dividono una barra in n blocchi da «passo» euro; crescono da sinistra con k
function righe(ctx, x, passo, n, col, k, al) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 1; i < n; i++) { const y = yE(i * passo); ctx.moveTo(x - BW / 2, y); ctx.lineTo(x - BW / 2 + BW * k, y); }
  ctx.stroke(); ctx.restore();
}
function etichette(ctx, x, passo, n, s, al) {
  for (let i = 0; i < n; i++) txt(ctx, s, x, yE((i + .5) * passo), { size: 30, alpha: al });
}
const prezzo = (ctx, s, x, y, al) => txt(ctx, s, x, y, { size: 44, weight: 600, alpha: al });
// freccia orizzontale fra due barre, con la percentuale sopra
function freccia(ctx, x0, x1, y, col, lab, k) {
  if (k <= 0) return;
  const xe = lerp(x0, x1 - 10, k);
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(xe, y); ctx.stroke(); ctx.restore();
  arrowHead(ctx, [xe + 6, y], 0, col, k);
  drawRich(ctx, lab, (x0 + x1) / 2, y - 42, { size: 40, alpha: k });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{mink:+}20% e poi {mink:−}20%', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// le due schede: le barre a sinistra, i conti a destra
function schede(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  card(ctx, 80, 110, 1080, 690, life(t, 7.5, FINE + .2, .6, .5));
  card(ctx, 1200, 110, 640, 690, life(t, 11.8, FINE + .2, .5, .5));
}

// 1–3 · le tre barre (7.5–FINE)
function sceneBarre(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .2, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  // la quota dei 100 €, tratteggiata, dietro le barre
  const kq = P(t, 44.1, 44.9);
  if (kq > 0) {
    ctx.save(); ctx.strokeStyle = css(C.dim, .9); ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
    // si interrompe sulla barra dei 120 €, per non tagliare il blocco rosso
    const x0 = XA - BW / 2 - 20, xe = lerp(x0, XC + BW / 2, kq);
    ctx.beginPath(); ctx.moveTo(x0, yE(100)); ctx.lineTo(Math.min(xe, XB - BW / 2 - 8), yE(100));
    if (xe > XB + BW / 2 + 8) { ctx.moveTo(XB + BW / 2 + 8, yE(100)); ctx.lineTo(xe, yE(100)); }
    ctx.stroke(); ctx.restore();
  }
  // A · 100 €
  const gA = P(t, 8.2, 9.2, E.out);
  if (gA > 0) blocco(ctx, XA, 0, 100 * gA, C.x, 1);
  righe(ctx, XA, 20, 5, C.x, P(t, 16.7, 17.5), 1);
  etichette(ctx, XA, 20, 5, '20 €', P(t, 17.2, 17.7));
  prezzo(ctx, '100 €', XA, yE(100) - 40, P(t, 9.2, 9.6));
  // B · la copia di A scivola a destra, poi arriva il blocco verde da 20 €
  if (t > 21.1) {
    const xb = lerp(XA, XB, P(t, 21.1, 22.1, E.io));
    const k6 = P(t, 30.3, 31.1);                       // si ridivide in cinque blocchi da 24 €
    const kg = P(t, 22.2, 22.8, E.out), dy = -60 * (1 - kg);
    blocco(ctx, xb, 0, 100, C.x, 1 - k6);
    righe(ctx, xb, 20, 5, C.x, 1, 1 - k6);
    etichette(ctx, xb, 20, 5, '20 €', 1 - k6);
    blocco(ctx, xb, 100, 120, C.g, kg * (1 - k6), dy);
    txt(ctx, '20 €', xb, yE(110) + dy, { size: 30, alpha: kg * (1 - k6) });
    blocco(ctx, XB, 0, 120, C.x, k6);
    righe(ctx, XB, 24, 5, C.v, k6, 1);
    etichette(ctx, XB, 24, 5, '24 €', P(t, 34.9, 35.3));   // insieme a «24 €» nella scheda
    blocco(ctx, XB, 96, 120, C.r, P(t, 35.1, 35.5));
    prezzo(ctx, '120 €', XB, yE(120) - 40, P(t, 23.0, 23.4));
  }
  freccia(ctx, XA + BW / 2 + 14, XB - BW / 2 - 14, 480, C.g, '{g:+20%}', P(t, 22.2, 22.8));
  freccia(ctx, XB + BW / 2 + 14, XC - BW / 2 - 14, 480, C.r, '{r:−20%}', P(t, 26.0, 26.6));
  drawRich(ctx, '{v:?}', XC, 470, { size: 90, alpha: life(t, 26.1, 39.7, .4, .3) });
  // C · una copia di B compare a destra (senza passare sulla freccia) e perde il blocco rosso
  if (t > 39.5) {
    const xc = XC, su = P(t, 40.7, 41.7, E.in);
    ctx.save(); ctx.globalAlpha *= P(t, 39.5, 40.2);
    blocco(ctx, xc, 0, 96, C.x, 1);
    righe(ctx, xc, 24, 4, C.v, 1, 1);
    etichette(ctx, xc, 24, 4, '24 €', 1);
    blocco(ctx, xc, 96, 120, C.r, 1 - su, -70 * su);
    txt(ctx, '24 €', xc, yE(108) - 70 * su, { size: 30, alpha: 1 - su });
    ctx.restore();
    prezzo(ctx, '96 €', XC, yE(100) - 50, P(t, 41.8, 42.2));
  }
  // i 4 € che mancano per tornare a 100: la fetta vuota sopra la barra, e una staffa larga
  const kb = P(t, 44.5, 44.9);
  if (kb > 0) {
    const x = XC + BW / 2 + 16, y0 = yE(100), y1 = yE(96);
    ctx.save(); ctx.globalAlpha *= kb;
    ctx.fillStyle = css(C.r, .16); ctx.fillRect(XC - BW / 2, y0, BW, y1 - y0);
    ctx.strokeStyle = css(C.r); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y0 - 14); ctx.lineTo(x, y1 + 14); ctx.moveTo(x - 14, y0 - 14); ctx.lineTo(x + 2, y0 - 14);
    ctx.moveTo(x - 14, y1 + 14); ctx.lineTo(x + 2, y1 + 14); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{r:−4 €}', x + 16, yE(98), { size: 40, align: 'left', alpha: kb });
  }
  // le due basi: 100 € per il +20%, 120 € per il −20%
  const kv = life(t, 48.8, 53.4, .4, .4);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.v); ctx.lineWidth = 6;
    ctx.beginPath(); ctx.roundRect(XA - BW / 2 - 10, yE(100) - 10, BW + 20, 100 * U + 20, 10); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(XB - BW / 2 - 10, yE(120) - 10, BW + 20, 120 * U + 20, 10); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// la scheda dei conti: il 20% di che cosa? (11.8–FINE)
const XP = 1520;
function riga(ctx, base, ris, y, al, ris2, k2) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  txt(ctx, base, 1400, y, { size: 48, color: C.x });
  drawRich(ctx, '{mink:→}', 1530, y, { size: 48 });
  drawRich(ctx, ris, 1660, y, { size: 48, alpha: 1 - (k2 || 0) });
  if (ris2) drawRich(ctx, ris2, 1660, y, { size: 48, alpha: k2 });
  ctx.restore();
}
function sceneConti(ctx, t) {
  if (t < 11.8 || t > FINE + .3) return;
  const al = life(t, 11.9, FINE + .2, .5, .5);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, '{v:il 20% di…}', XP, 172, { size: 40, weight: 600 }));
  riga(ctx, '100 €', '{g:20 €}', 270, P(t, 12.0, 12.4));
  riga(ctx, '120 €', '{v:?}', 380, P(t, 30.4, 30.8), '{r:24 €}', P(t, 35.1, 35.5));
  // le basi cerchiate, come le barre
  const kv = life(t, 48.8, 53.4, .4, .4);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    [270, 380].forEach(y => { ctx.beginPath(); ctx.roundRect(1400 - 88, y - 36, 176, 72, 14); ctx.stroke(); });
    ctx.restore();
  }
  const ks = P(t, 53.7, 54.1);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1260, 455); ctx.lineTo(1780, 455); ctx.stroke(); ctx.restore(); }
  drawRich(ctx, '24 € − 20 € = {r:4 €}', XP, 535, { size: 44, local: t - 53.7 });
  drawRich(ctx, '4 € su 100 € = {r:4%}', XP, 645, { size: 44, local: t - 58.3 });
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Una percentuale dipende dalla {v:base}:\n{mink:+}20% e {mink:−}20% {r:non} si annullano.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{g:+20%} di 100 €\n= {g:+20 €}'], [960, '{r:−20%} di 120 €\n= {r:−24 €}'], [1490, '100 € → 96 €:\nin tutto {r:−4%}']];
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

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza delle barre
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['tono', 8.2, 9.2, [.1, .6]], ['pop', 9.3, .6],                  // 100 €
    ['soffio', 11.9], ['pop', 12.1, .5],                                              // il 20% di 100: 20 €
    ['traccia', 16.7, 17.5], ['pop', 17.3, .4],                                       // cinque blocchi da 20 €
    ['traccia', 21.1, 22.1], ['tono', 22.2, 22.8, [.85, .72]], ['pop', 23.0, .72],    // + 20 €: 120 €
    ['traccia', 26.0, 26.6], ['pop', 26.2, .5],                                       // − 20%: e ora?
    ['pop', 30.5, .5], ['traccia', 30.3, 31.1], ['pop', 31.2, .5],                    // cinque blocchi da 24 €
    ['pop', 35.2, .3],                                                                // 24 €
    ['soffio', 39.5], ['tono', 40.7, 41.7, [.72, .95]], ['pop', 41.9, .58],    // via 24 €: 96 €
    ['traccia', 44.1, 44.9], ['pop', 44.6, .2],                                       // la quota dei 100 €, − 4 €
    ['soffio', 48.8],                                                                 // le due basi
    ['pop', 53.8, .3], ['pop', 58.4, .25],                                            // 4 €, 4%
    ['soffio', FINE + .3], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: '+20% e poi −20%', durata: DURATA, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { schede(ctx, t); sceneIntro(ctx, t); sceneBarre(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
