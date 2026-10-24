'use strict';
/* Contare con le lampadine — quattro lampadine che valgono 8, 4, 2, 1 (potenze di 2): accesa = 1, spenta = 0;
   8 + 4 + 1 = 13 si scrive 1101 in base 2; +1: la lampadina da 1 è già accesa, si spegne e passa il riporto
   (14 = 1110); 15 = 1111; +1 di nuovo: riporti a catena e una quinta lampadina, 16 = 10000; come il contachilometri
   dopo 999. Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/binario', M => {
  const { W, C, E, P, life, kf, css, mix, TITOLI, conFont, drawRich, richW, txt, card, ball } = M;

const FINE = 82.0, DUR = 93.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [26.0, 'felice'], [29.4, 'festa'], [31.6, 'neutro'], [44.3, 'pensa'], [46.4, 'neutro'],
  [51.1, 'sorpreso'], [53.2, 'neutro'], [60.4, 'felice'], [62.5, 'neutro'], [65.0, 'sorpreso'], [67.1, 'neutro'],
  [70.5, 'festa'], [72.7, 'neutro'], [76.0, 'occhiolino'], [78.1, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.6, 'Con quattro lampadine, accese\no spente, si può scrivere 13?'],
  // 1 · le lampadine
  [7.9, 12.5, 'Ogni lampadina ha un {v:valore}:\n8, 4, 2 e 1.'],
  [12.7, 18.7, 'Ognuno è il doppio del successivo:\nsono potenze di 2, fino a {mink:2⁰ = 1}.'],
  [18.9, 23.5, 'Accesa si scrive {g:1},\nspenta si scrive 0.'],
  [23.7, 28.9, 'Accendo 8, 4 e 1:\n{mink:8 + 4 + 1 = 13}.'],
  [29.1, 34.1, 'Le cifre in fila: 13 si scrive\n{v:1101} in {v:base 2}.'],
  [34.3, 39.1, 'Il 2 in basso dice la base:\nbastano {g:due cifre}, 0 e 1.'],
  // 2 · più uno
  [39.5, 43.9, 'Ora aggiungo 1:\n{mink:13 + 1 = 14}.'],
  [44.1, 48.9, 'La lampadina da 1 è già accesa:\nnon si accende due volte.'],
  [49.1, 54.1, 'Si spegne e passa un {v:riporto}\nalla lampadina da 2.'],
  [54.3, 59.7, 'Ora {mink:8 + 4 + 2 = 14}:\nsi scrive {v:1110}.'],
  [59.9, 64.5, 'Più 1: 15, tutte accese,\n{v:1111}.'],
  [64.7, 69.5, 'Più 1 ancora: i riporti scattano\na catena, e si spengono tutte…'],
  [69.7, 75.5, '…e serve una {g:quinta} lampadina, da 16:\n16 si scrive {v:10000}.'],
  [75.7, 81.5, 'Come il contachilometri dopo 999:\nqui ogni cifra riparte dopo 1.'],
  // chiusura
  [84.2, 90.8, 'Lampadine che valgono 1, 2, 4, 8…:\naccese o spente, scrivono in base 2.'],
];

// ---------- le lampadine ----------
const LX = [360, 660, 960, 1260, 1560], VAL = ['16', '8', '4', '2', '1'], POT = ['2⁴', '2³', '2²', '2¹', '2⁰'];
const YV = 172, YP = 228, YL = 360, YD = 525;
// accesa (1) o spenta (0), lampadina per lampadina: [16, 8, 4, 2, 1]
const ACCESA = [
  [[70.4, 0], [70.9, 1]],
  [[24.0, 0], [24.5, 1], [66.7, 1], [67.1, 0]],
  [[24.6, 0], [25.1, 1], [66.1, 1], [66.5, 0]],
  [[51.0, 0], [51.4, 1], [65.5, 1], [65.9, 0]],
  [[25.2, 0], [25.7, 1], [49.4, 1], [49.8, 0], [60.3, 0], [60.7, 1], [64.9, 1], [65.3, 0]],
];
// quando compare ogni lampadina (la quinta solo quando serve)
const ENTRA = [69.9, 8.2, 8.5, 8.8, 9.1];
function lampadina(ctx, x, y, on, s) {
  if (s <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // il vetro: acceso è giallo e fa luce
  ctx.save();
  ctx.shadowColor = css(C.y, .85 * on); ctx.shadowBlur = 60 * on;
  ctx.fillStyle = css(mix(C.paper, C.y, on));
  ctx.beginPath(); ctx.arc(0, 0, 62, Math.PI * .78, Math.PI * .22, false);
  ctx.lineTo(28, 78); ctx.lineTo(-28, 78); ctx.closePath(); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = css(on > .5 ? C.y : C.dim); ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.arc(0, 0, 62, Math.PI * .78, Math.PI * .22, false);
  ctx.lineTo(28, 78); ctx.lineTo(-28, 78); ctx.closePath(); ctx.stroke();
  // il filamento
  ctx.strokeStyle = css(mix(C.dim, C.ink, on)); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-14, 60); ctx.lineTo(-14, 8); ctx.lineTo(-6, 0); ctx.lineTo(2, 8); ctx.lineTo(10, 0); ctx.lineTo(14, 8); ctx.lineTo(14, 60); ctx.stroke();
  // l'attacco
  ctx.fillStyle = css(C.dim);
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.roundRect(-30, 82 + i * 15, 60, 11, 4); ctx.fill(); }
  ctx.restore();
}
// la pallina del riporto: [partenza, arrivo, da lampadina, a lampadina]; arrivando si rimpicciolisce e sparisce nella lampadina,
// e l'ultima parte solo quando compare la quinta lampadina (mai ferma nel vuoto)
const RIPORTI = [[49.9, 50.9, 4, 3], [65.0, 65.5, 4, 3], [65.6, 66.1, 3, 2], [66.2, 66.7, 2, 1], [69.9, 70.4, 1, 0]];
function sceneLampadine(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 130, 110, 1660, 470, P(t, 7.5, 8.2));
  // le cifre in fila: un riquadro intorno quando Ada le legge
  const kr = life(t, 29.3, 39.2, .4, .4);
  if (kr > 0) {
    ctx.save(); ctx.globalAlpha *= kr; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(LX[1] - 70, YD - 40, LX[4] - LX[1] + 140, 86, 18); ctx.stroke(); ctx.restore();
  }
  for (let i = 0; i < 5; i++) {
    const s = P(t, ENTRA[i], ENTRA[i] + .5, E.back);
    if (s <= 0) continue;
    const on = kf(t, ACCESA[i].length ? ACCESA[i] : [[0, 0]]);
    lampadina(ctx, LX[i], YL, on, s);
    // il valore e la potenza di 2
    txt(ctx, VAL[i], LX[i], YV, { size: 52, weight: 600, color: C.ink, alpha: s });
    drawRich(ctx, '{mdim:' + POT[i] + '}', LX[i], YP, { size: 42, alpha: P(t, i ? 13.0 + .25 * (i - 1) : 69.9, i ? 13.4 + .25 * (i - 1) : 70.3) });
    // la cifra: prima esce quella vecchia, poi entra la nuova
    const kc = P(t, i ? 19.1 + .15 * (i - 1) : 70.2, i ? 19.5 + .15 * (i - 1) : 70.6);
    txt(ctx, '0', LX[i], YD, { size: 66, weight: 600, color: C.ink, alpha: kc * (1 - P(on, 0, .5)) });
    txt(ctx, '1', LX[i], YD, { size: 66, weight: 600, color: C.g, alpha: kc * P(on, .5, 1) });
  }
  // la lampadina da 1, già accesa: un anello mentre Ada lo dice
  const ka = life(t, 44.3, 49.2, .3, .3);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.r); ctx.lineWidth = 5; ctx.setLineDash([12, 9]);
    ctx.beginPath(); ctx.arc(LX[4], YL + 10, 100, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  // i riporti
  RIPORTI.forEach(([a, b, da, aa]) => {
    if (t < a || t > b) return;
    const k = P(t, a, b), x = LX[da] + (LX[aa] - LX[da]) * k, y = 288 - 40 * Math.sin(Math.PI * k);
    ball(ctx, x, y, '1', C.v, { r: 24, scale: P(t, a, a + .2) * (1 - P(t, b - .25, b)) });
  });
  ctx.restore();
}

// ---------- la scheda sotto: i conti e il contachilometri ----------
const BC = [130, 610, 1660, 190], YB = 705, XS = 640, XN = 1330;
// [entra, esce, testo]: a sinistra il conto, a destra il numero in base 2
const CONTI = [[24.1, 39.5, '{mink:8 + 4 + 1 = 13}'], [39.7, 54.3, '{mink:13 + 1 = 14}'], [54.5, 59.9, '{mink:8 + 4 + 2 = 14}'],
  [60.1, 64.7, '{mink:14 + 1 = 15}'], [64.9, 75.7, '{mink:15 + 1 = 16}']];
const BINARI = [[29.3, 39.5, '{mink:13 = }', '1101'], [54.5, 59.9, '{mink:14 = }', '1110'], [60.4, 64.7, '{mink:15 = }', '1111'],
  [70.6, 75.7, '{mink:16 = }', '10000']];
// un numero in base 2 col pedice disegnato a mano, più grande di quello di serie; restituisce il centro del pedice
function binGeom(ctx, pre, cifre, x, y, size) {
  const sp = Math.round(size * .78), w1 = pre ? richW(ctx, pre, size) : 0, w2 = richW(ctx, '{mv:' + cifre + '}', size);
  const w3 = richW(ctx, '{mv:2}', sp), gap = size * .04, x0 = x - (w1 + w2 + gap + w3) / 2;
  return { sp, w1, w2, x0, cx: x0 + w1 + w2 + gap + w3 / 2, cy: y + size * .3 };
}
function binario(ctx, pre, cifre, x, y, size, o) {
  const al = o && o.alpha != null ? o.alpha : 1, loc = o && o.local != null ? o.local : 99;
  if (al <= .002) return;
  const g = binGeom(ctx, pre, cifre, x, y, size);
  if (pre) drawRich(ctx, pre, g.x0, y, { size, align: 'left', alpha: al, local: loc });
  drawRich(ctx, '{mv:' + cifre + '}', g.x0 + g.w1, y, { size, align: 'left', alpha: al, local: loc - .1 });
  drawRich(ctx, '{mv:2}', g.cx, g.cy, { size: g.sp, alpha: al * P(loc, .2, .6) });
}
function riga(ctx, lista, x, t) {
  lista.forEach(([a, b, s, cifre]) => {
    const k = P(t, a + .2, a + .6) * (1 - P(t, b - .4, b));   // la vecchia esce prima che entri la nuova
    if (k <= 0) return;
    if (cifre) binario(ctx, s, cifre, x, YB, 54, { alpha: k, local: t - a - .2 });
    else drawRich(ctx, s, x, YB, { size: 54, alpha: k, local: t - a - .2 });
  });
}
// una cifra del contachilometri che gira da d0 a d1 fra a e b
function ruota(ctx, x, d0, d1, a, b, t) {
  const k = P(t, a, b), h = 110;
  ctx.save();
  ctx.fillStyle = css(C.ink, .06); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.roundRect(x - 44, YB - 62, 88, 124, 12); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.rect(x - 44, YB - 62, 88, 124); ctx.clip();
  txt(ctx, d0, x, YB - k * h, { size: 76, weight: 600, color: C.ink });
  txt(ctx, d1, x, YB + (1 - k) * h, { size: 76, weight: 600, color: C.ink });
  ctx.restore();
}
function sceneScheda(ctx, t) {
  const al = life(t, 18.9, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...BC, al);
  ctx.save(); ctx.globalAlpha *= al;
  // accesa = 1, spenta = 0
  drawRich(ctx, '{y:accesa}{dim: si scrive }{g:1}{dim:            spenta}{dim: si scrive }0', BC[0] + BC[2] / 2, YB, { size: 46, weight: 600, local: t - 19.1, alpha: 1 - P(t, 23.6, 24.0) });
  riga(ctx, CONTI, XS, t);
  riga(ctx, BINARI, XN, t);
  // il pedice 2: un anello mentre Ada dice che è la base
  const kb = life(t, 34.5, 39.2, .3, .3);
  if (kb > 0) {
    const g = binGeom(ctx, '{mink:13 = }', '1101', XN, YB, 54);
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(g.cx, g.cy - 2, 18, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  // il contachilometri: 0999 → 1000, le cifre girano da destra a sinistra
  const ko = P(t, 75.9, 76.4);
  if (ko > 0) {
    ctx.save(); ctx.globalAlpha *= ko;
    txt(ctx, 'contachilometri', 660, YB, { size: 34, weight: 600, color: C.dim, align: 'right' });
    const xs = [790, 890, 990, 1090], d0 = ['0', '9', '9', '9'], d1 = ['1', '0', '0', '0'];
    for (let i = 3; i >= 0; i--) { const a = 77.0 + (3 - i) * .35; ruota(ctx, xs[i], d0[i], d1[i], a, a + .45, t); }
    drawRich(ctx, '{mink:999 + 1 = 1000}', 1450, YB, { size: 50, local: t - 78.6 });
    ctx.restore();
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Contare\ncon le lampadine', W / 2, 200, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'In base 2 ogni cifra dice se una potenza\ndi 2 {g:c’è} (1) o {r:non c’è} (0).', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [
    [490, '{dim:13 = 8 + 4 + 1}', null],
    [960, '{dim:in base 2}', '{g:solo 0 e 1}'],
    [1430, '{dim:se la cifra è già 1}', '{v:riporto}'],
  ];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 32 });
    if (corpo) drawRich(ctx, corpo, x, 546, { size: 44, weight: 600 });
    else binario(ctx, '', '1101', x, 542, 46);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.2, .7], ['pop', 8.5, .55], ['pop', 8.8, .4], ['pop', 9.1, .25],   // le quattro lampadine
    ['pop', 13.0, .7], ['pop', 13.25, .55], ['pop', 13.5, .4], ['pop', 13.75, .25],             // 2³, 2², 2¹, 2⁰
    ['soffio', 18.9],                                                                           // accesa 1, spenta 0
    ['tono', 24.0, 24.5, [.5, .8]], ['tono', 24.6, 25.1, [.5, .7]], ['tono', 25.2, 25.7, [.4, .6]],   // si accendono 8, 4, 1
    ['ding', 26.0],                                                                             // 13
    ['traccia', 29.3, 29.8], ['pop', 34.5, .6],                                                 // 1101₂, il 2 della base
    ['pop', 39.9, .5],                                                                          // 13 + 1
    ['pop', 44.3, .2],                                                                          // già accesa
    ['tono', 49.4, 49.8, [.6, .3]], ['tono', 49.9, 50.9, [.3, .5, .3]], ['tono', 51.0, 51.4, [.4, .7]],   // si spegne, il riporto, si accende la 2
    ['ding', 54.7],                                                                             // 14 = 1110
    ['tono', 60.3, 60.7, [.4, .8]], ['ding', 60.6],                                             // 15 = 1111
    ['tono', 64.9, 65.3, [.8, .4]], ['tono', 65.5, 65.9, [.75, .35]], ['tono', 66.1, 66.5, [.7, .3]], ['tono', 66.7, 67.1, [.65, .25]],   // a catena
    ['pop', 69.9, .5], ['tono', 69.9, 70.4, [.3, .45, .3]], ['tono', 70.4, 70.9, [.4, .9]],                                          // la quinta lampadina
    ['soffio', 75.9], ['tono', 77.0, 78.5, [.3, .4, .5, .6]], ['pop', 78.6, .5],                // il contachilometri
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Contare con le lampadine', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 39.3, 'le lampadine'], [39.3, FINE, 'più uno']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneLampadine(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
