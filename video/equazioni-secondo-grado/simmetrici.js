'use strict';
/* Perimetro 14, area 12 — un rettangolo con i lati x e y: mezzo perimetro dà x + y = 7, l'area x · y = 12 (sistema
   di secondo grado, simmetrico); a tentativi 1 · 6 = 6, 2 · 5 = 10, 3 · 4 = 12, e 4 · 3 è lo stesso rettangolo girato;
   senza tentativi, due numeri con somma s e prodotto p risolvono t² − st + p = 0: t² − 7t + 12 = 0, Δ = 1, t = 3 e 4.
   Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/simmetrici', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, txt, drawSeq, glowStroke, card, checkMark } = M;

const FINE = 86.0, DUR = 97.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [19.0, 'felice'], [21.1, 'neutro'], [34.2, 'sorpreso'], [36.3, 'neutro'], [44.0, 'festa'], [46.2, 'neutro'],
  [53.0, 'felice'], [55.1, 'neutro'], [58.6, 'pensa'], [60.7, 'neutro'], [75.8, 'felice'], [77.9, 'neutro'],
  [80.8, 'festa'], [83.0, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.6, 'Perimetro 14, area 12:\nquanto misurano i lati?'],
  // 1 · il sistema
  [7.9, 12.1, 'Ecco un rettangolo: chiamo\ni lati {mx:x} e {my:y}.'],
  [12.3, 16.5, 'Il perimetro è 14:\nun giro intero del rettangolo.'],
  [16.7, 21.9, 'Mezzo giro, base più altezza,\nfa 7: {mink:x + y = 7}.'],
  [22.1, 26.5, 'L’area è 12: {mink:x · y = 12}.'],
  [26.7, 31.7, 'Un {v:sistema} di secondo grado:\nnella seconda c’è {mink:x · y}.'],
  // 2 · a tentativi
  [33.0, 37.1, 'Provo: base 1, altezza 6.\nL’area è 6: {r:troppo poco}.'],
  [38.1, 42.1, 'Base 2, altezza 5:\narea 10, ancora poco.'],
  [43.1, 46.9, 'Base 3, altezza 4:\narea {g:12}!'],
  [47.9, 52.9, 'Base 4, altezza 3: ancora 12.\nÈ lo stesso rettangolo, girato.'],
  [53.0, 58.0, 'Il sistema è {v:simmetrico}: scambiando\n{mx:x} con {my:y} non cambia.'],
  // 3 · somma e prodotto
  [58.4, 63.4, 'Senza tentativi: due numeri\ncon somma {mink:s} e prodotto {mink:p}…'],
  [63.6, 70.4, '…risolvono {mink:t² − st + p = 0}.\nUso {mink:t}: {mx:x} e {my:y} sono già i lati.'],
  [70.6, 75.0, 'Qui viene {mink:t² − 7t + 12 = 0}.'],
  [75.2, 80.4, '{mink:Δ = 1}: le soluzioni sono\n{mink:t₁ = 3} e {mink:t₂ = 4}.'],
  [80.6, 85.4, 'Sono proprio i due lati:\n{g:3 e 4}.'],
  // chiusura
  [FINE + 2.2, DUR - 2.6, 'Somma e prodotto noti: i due numeri\nrisolvono {mink:t² − st + p = 0}.'],
];

// ---------- il rettangolo, a sinistra ----------
const LC = [130, 110, 860, 690], X0 = 330, Y0 = 720, U = 80;
// la base: 5 all'inizio, poi i tentativi 1, 2, 3, 4 (fermi mentre Ada parla); l'altezza è sempre 7 − base
// ogni cambio finisce prima del fumetto che lo commenta
const base = t => kf(t, [[31.8, 5], [32.9, 1], [37.2, 1], [38.0, 2], [42.2, 2], [43.0, 3], [47.0, 3], [47.8, 4]]);
function sceneRettangolo(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LC, P(t, 7.5, 8.2));
  drawRich(ctx, '{dim:perimetro} 14{dim:       area} 12', LC[0] + LC[2] / 2, 170, { size: 40, weight: 600, local: t - 8.2 });
  const w = base(t), h = 7 - w, x1 = X0 + w * U, y1 = Y0 - h * U;
  const kr = P(t, 8.3, 9.0, E.out);
  if (kr <= 0) { ctx.restore(); return; }
  ctx.save(); ctx.globalAlpha *= kr;
  // l'area: dal primo tentativo il rettangolo si colora, con i quadretti da 1 (non prima: 5 · 2 non fa 12)
  const kf1 = P(t, 32.9, 33.3);
  if (kf1 > 0) { ctx.fillStyle = css(C.v, .14 * kf1); ctx.fillRect(X0, y1, w * U, h * U); }
  const kq = P(t, 32.9, 33.3);
  if (kq > 0) {
    ctx.save(); ctx.globalAlpha *= kq; ctx.strokeStyle = css(C.v, .45); ctx.lineWidth = 2;
    for (let i = 1; i < w - 1e-6; i++) { ctx.beginPath(); ctx.moveTo(X0 + i * U, Y0); ctx.lineTo(X0 + i * U, y1); ctx.stroke(); }
    for (let j = 1; j < h - 1e-6; j++) { ctx.beginPath(); ctx.moveTo(X0, Y0 - j * U); ctx.lineTo(x1, Y0 - j * U); ctx.stroke(); }
    ctx.restore();
  }
  // il contorno: verde quando i lati sono trovati
  const kv = P(t, 80.8, 81.4);
  ctx.strokeStyle = css(kv > 0 ? M.mix(C.ink, C.g, kv) : C.ink); ctx.lineWidth = 5; ctx.lineJoin = 'round';
  ctx.strokeRect(X0, y1, w * U, h * U);
  ctx.restore();
  // il perimetro: un giro intero (12,5), poi mezzo giro, base più altezza (16,9)
  const giro = [[X0, Y0], [x1, Y0], [x1, y1], [X0, y1], [X0, Y0]];
  const kg = P(t, 12.6, 14.2, E.lin) * (1 - P(t, 16.3, 16.7));
  if (kg > 0) glowStroke(ctx, giro, kg, C.y, 8);
  const km = P(t, 16.9, 17.9, E.lin) * (1 - P(t, 21.9, 22.3));
  if (km > 0) {
    glowStroke(ctx, giro.slice(0, 3), km, C.g, 9);
    drawRich(ctx, '{g:7}', x1 + 30, Y0 + 34, { size: 44, weight: 600, alpha: P(t, 17.9, 18.3) * (1 - P(t, 21.9, 22.3)) });
  }
  // i nomi dei lati: x e y, poi i valori dei tentativi (solo a rettangolo fermo)
  const kn = P(t, 8.9, 9.4) * (1 - P(t, 31.6, 31.8));
  const kVal = Math.max(0, 1 - 5 * Math.abs(w - Math.round(w))) * P(t, 32.9, 33.1);
  const xs = X0 + w * U / 2, ys = Y0 - h * U / 2;
  drawRich(ctx, '{mx:x}', xs, Y0 + 40, { size: 48, alpha: kn });
  drawRich(ctx, '{my:y}', x1 + 26, ys, { size: 48, align: 'left', alpha: kn });
  if (kVal > 0) {
    const cx = kv > 0 ? 'g' : 'x', cy = kv > 0 ? 'g' : 'y';
    drawRich(ctx, '{m' + cx + ':x = ' + Math.round(w) + '}', xs, Y0 + 40, { size: 44, alpha: kVal });
    drawRich(ctx, '{m' + cy + ':y = ' + Math.round(h) + '}', x1 + 26, ys, { size: 44, align: 'left', alpha: kVal });
  }
  ctx.restore();
}

// ---------- la scheda a destra ----------
const RC = [1030, 110, 820, 690], XC = RC[0] + RC[2] / 2, XE = 1185, XR = RC[0] + RC[2] - 40;
function graffa(ctx, x, y0, y1, al) {   // la parentesi del sistema
  if (al <= 0) return;
  const m = (y0 + y1) / 2, w = 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0);
  ctx.quadraticCurveTo(x, y0, x, y0 + 14); ctx.lineTo(x, m - 12); ctx.quadraticCurveTo(x, m, x - w * .8, m);
  ctx.quadraticCurveTo(x, m, x, m + 12); ctx.lineTo(x, y1 - 14); ctx.quadraticCurveTo(x, y1, x + w, y1);
  ctx.stroke(); ctx.restore();
}
function linea(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(RC[0] + 40, y); ctx.lineTo(RC[0] + RC[2] - 40, y); ctx.stroke(); ctx.restore();
}
// i tentativi: [base, altezza, istante, va bene]
const PROVE = [[1, 6, 34.0, false], [2, 5, 39.0, false], [3, 4, 44.0, true], [4, 3, 49.0, true]];
const PY = [460, 535, 610, 685];
function sceneScheda(ctx, t) {
  const al = life(t, 18.8, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...RC, al);
  ctx.save(); ctx.globalAlpha *= al;
  // il sistema
  drawRich(ctx, '{mx:x}{mink: + }{my:y}{mink: = 7}', XE, 185, { size: 48, align: 'left', local: t - 19.0 });
  txt(ctx, 'mezzo perimetro', XR, 185, { size: 30, color: C.dim, align: 'right', alpha: P(t, 19.4, 19.8) });
  drawRich(ctx, '{mx:x}{mink: · }{my:y}{mink: = 12}', XE, 265, { size: 48, align: 'left', local: t - 22.4 });
  txt(ctx, 'area', XR, 265, { size: 30, color: C.dim, align: 'right', alpha: P(t, 22.8, 23.2) });
  graffa(ctx, XE - 30, 150, 300, P(t, 26.9, 27.4));
  drawRich(ctx, '{dim:sistema di }{v:secondo grado}', XC, 350, { size: 34, local: t - 27.2, alpha: 1 - P(t, 52.8, 53.2) });
  // simmetrico: scambio x e y
  drawRich(ctx, '{v:simmetrico}{dim:: }{mx:x}{mink: ↔ }{my:y}{dim:, non cambia}', XC, 350, { size: 40, local: t - 53.1 });
  linea(ctx, 400, P(t, 33.8, 34.2));
  // 2 · i tentativi
  const kt = 1 - P(t, 58.4, 58.8);
  PROVE.forEach(([b, a, ti, ok], i) => {
    const k = P(t, ti, ti + .4) * kt;
    if (k <= 0) return;
    drawRich(ctx, '{mx:' + b + '}{mink: · }{my:' + a + '}{mink: = }' + (ok ? '{mg:' : '{mr:') + b * a + '}', 1260, PY[i], { size: 46, align: 'left', alpha: k });
    if (ok) checkMark(ctx, 1640, PY[i], P(t, ti + .2, ti + .9) * kt, C.g, .3);
    else txt(ctx, i ? 'ancora poco' : 'troppo poco', 1640, PY[i], { size: 32, weight: 600, color: C.r, alpha: k });
  });
  // 3 · somma e prodotto, l'equazione, le soluzioni
  drawRich(ctx, '{dim:somma }{mink:s = 7}{dim:      prodotto }{mink:p = 12}', XC, 455, { size: 40, local: t - 58.8 });
  const kSost = P(t, 70.8, 71.6, E.lin);   // prima esce la formula con s e p, poi entra quella con 7 e 12
  drawRich(ctx, '{mink:t² − }{mv:s}{mink:t + }{mv:p}{mink: = 0}', XC, 535, { size: 50, local: t - 63.8, alpha: 1 - P(kSost, 0, .5) });
  drawRich(ctx, '{mink:t² − }{mv:7}{mink:t + }{mv:12}{mink: = 0}', XC, 535, { size: 50, alpha: P(kSost, .5, 1) });
  drawRich(ctx, '{mink:Δ = 49 − 48 = 1}', XC, 610, { size: 46, local: t - 75.4 });
  drawSeq(ctx, ['{mink:t = }', { num: '{mink:7 ± 1}', den: '{mink:2}' }], 1290, 708, 44, { local: t - 76.0 });
  drawRich(ctx, '{mg:t₁ = 3}', 1520, 680, { size: 46, align: 'left', local: t - 76.8 });
  drawRich(ctx, '{mg:t₂ = 4}', 1520, 742, { size: 46, align: 'left', local: t - 77.2 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Perimetro 14, area 12', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Somma {mink:s} e prodotto {mink:p}: i due numeri\nrisolvono {mv:t² − st + p = 0}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [
    [490, '{dim:il sistema}', '{mink:x + y = 7}\n{mink:x · y = 12}'],
    [960, '{dim:l’equazione}', '{mink:t² − 7t + 12 = 0}'],
    [1430, '{dim:i lati}', '{g:3 e 4}'],
  ];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, i ? 486 : 470, { size: 32 });
    if (i) drawRich(ctx, corpo, x, 546, { size: i === 2 ? 44 : 40, weight: 600 });
    else drawRich(ctx, corpo, x, 544, { size: 40, lh: 1.12 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 8.3, 9.0],                                           // il rettangolo
    ['traccia', 12.6, 14.2],                                                          // il giro intero
    ['traccia', 16.9, 17.9], ['pop', 17.9, .5],                                       // mezzo giro: 7
    ['soffio', 18.8], ['pop', 19.0, .5],                                              // x + y = 7
    ['pop', 22.4, .55],                               // l'area: x · y = 12
    ['traccia', 26.9, 27.4],                                                          // la graffa
    ['tono', 31.8, 32.9, [.25, .8]], ['pop', 34.0, .3],                               // 1 · 6: troppo poco
    ['tono', 37.2, 38.0, [.8, .65]], ['pop', 39.0, .4],                               // 2 · 5
    ['tono', 42.2, 43.0, [.65, .5]], ['traccia', 44.2, 44.9],                         // 3 · 4 (il ding lo dà la festa)
    ['tono', 47.0, 47.8, [.5, .35]], ['ding', 49.2],                                  // 4 · 3, girato
    ['pop', 53.1, .6],                                                                // simmetrico
    ['soffio', 58.4], ['pop', 58.8, .5],                                              // somma e prodotto
    ['pop', 63.8, .55], ['tono', 70.8, 71.6, [.4, .6]],                               // t² − st + p = 0, poi 7 e 12
    ['pop', 75.4, .5], ['pop', 76.0, .55], ['ding', 76.8], ['ding', 77.2],            // Δ, t₁ = 3, t₂ = 4
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Perimetro 14, area 12', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 31.9, 'il sistema'], [31.9, 58.2, 'a tentativi'], [58.2, FINE, 'somma e prodotto']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRettangolo(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
