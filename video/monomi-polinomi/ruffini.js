'use strict';
/* La regola di Ruffini: x³ − 2x² − 5x + 6 diviso x − 1 con lo schema, passo per passo, e che cosa vuol dire resto zero. Argomento: monomi-polinomi. */
CVIDEO.registra('monomi-polinomi/ruffini', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, richW, card, arrowHead, checkMark, crossMark } = M;

const FINE = 81.2, DUR = 92.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [25.6, 'sorpreso'], [27.7, 'neutro'], [55.1, 'felice'], [57.2, 'neutro'],
  [67.1, 'festa'], [69.4, 'neutro'], [75.5, 'felice'], [77.6, 'neutro'],
  [FINE, 'neutro'], [85.6, 'felice'],
];
const FUMETTI = [
  [2.5, 6.3, 'Come si divide un polinomio\nper {mink:x − 1}, in fretta?'],
  [7.9, 11.4, 'Dividiamo {mink:P(x) = x³ − 2x² − 5x + 6}\nper {mink:x − 1}.'],
  [11.5, 16.2, 'In alto scrivo i coefficienti,\ndal grado più alto al termine noto.'],
  [16.3, 21.1, 'Ci sono tutti i gradi, da 3 a 0:\nnessuno {g:0} da aggiungere.'],
  [21.2, 25.5, 'Il divisore è {mink:x − a} con {mink:a = 1}:\na sinistra scrivo {g:1}.'],
  [25.6, 30.0, 'Proprio {g:1}, {r:non −1}: è il numero\nche annulla {mink:x − 1}.'],
  [30.1, 33.9, '{g:Abbasso} il primo coefficiente\ncosì com\'è: 1.'],
  [34.0, 38.5, 'Lo {v:moltiplico} per {mink:a}: {mink:1 · 1 = 1},\ne lo scrivo sotto il −2.'],
  [38.6, 41.8, 'Poi {g:sommo} in colonna:\n{mink:−2 + 1 = −1}.'],
  [41.9, 45.6, 'Ricomincio dal −1: lo moltiplico\nper {mink:a}, {mink:−1 · 1 = −1}.'],
  [45.7, 48.8, 'E sommo in colonna:\n{mink:−5 + (−1) = −6}.'],
  [48.9, 52.0, 'Moltiplico ancora per {mink:a}:\n{mink:−6 · 1 = −6}.'],
  [52.1, 55.0, 'E sommo: {mink:6 + (−6) = 0}.'],
  [55.1, 59.0, 'L\'ultimo numero è il {g:resto}:\nqui è 0.'],
  [59.1, 63.3, 'Gli altri sono i coefficienti\ndel {v:quoziente}: 1, −1, −6.'],
  [63.4, 67.0, 'Il quoziente ha un grado in meno:\n{mink:Q(x) = x² − x − 6}.'],
  [67.1, 71.3, 'Resto 0: {mink:x − 1} divide {mink:P(x)},\ncioè {mink:P(x) = (x − 1) · Q(x)}.'],
  [71.4, 75.4, 'Calcolo {mink:P(1) = 1 − 2 − 5 + 6}:\nfa {g:0}, proprio come il resto.'],
  [75.5, 80.6, 'Il resto è sempre {mink:P(a)}: se è 0,\n{mink:a} è uno {g:zero} di {mink:P(x)}.'],
  [83.5, 89.6, 'Abbassa, moltiplica per {mink:a}, somma:\nl\'ultimo numero è il resto.'],
];

// lo schema: coefficienti in alto, a a sinistra nella riga di mezzo, risultati in basso (come la tabella del sito)
const XA = 410, XL = 480, XS = 1040, COL = [580, 760, 940, 1140];
const YG = 325, Y1 = 405, Y2 = 525, YH = 590, Y3 = 665, YE = 745;
const COEF = ['1', '−2', '−5', '6'], PROD = [null, '1', '−1', '−6'], RIS = ['1', '−1', '−6', '0'];
// per ogni colonna: quando compare il prodotto (e la sua freccia) e quando compare la somma
const T_PROD = [null, 34.2, 42.1, 49.1], T_SOMMA = [30.3, 38.8, 45.9, 52.3];

function num(ctx, s, x, y, col, al, size = 64) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col);
  ctx.font = `500 ${Math.round(size * 1.12)}px "KaTeX_Main", Cambria, Georgia, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(s, x, y); ctx.restore();
}
function segm(ctx, a, b, k, col, w = 3) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La regola di Ruffini', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la divisione da fare, in alto; quando il resto è 0 diventa una scomposizione (7.5–81)
function sceneTesta(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 300, 110, 1520, 130, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mink:P(x) = x³ − 2x² − 5x + 6}{dim:   diviso per   }{mink:x − 1}', 1060, 175, { size: 52, local: t - 8.0, alpha: 1 - P(t, 67.2, 67.6) });
  drawRich(ctx, '{mink:P(x) = (x − 1)}{mv:(x² − x − 6)}', 1060, 175, { size: 52, alpha: P(t, 67.7, 68.1) });
  ctx.restore();
}

// lo schema di Ruffini (11.4–81)
function sceneSchema(ctx, t) {
  if (t < 11.4 || t > FINE + .2) return;
  const al = life(t, 11.4, FINE, .6, .6);
  card(ctx, 300, 270, 950, 530, al);
  ctx.save(); ctx.globalAlpha *= al;
  // i gradi sopra i coefficienti; si accendono quando Ada controlla che non ne manchi nessuno
  const kg = life(t, 16.4, 21.0, .4, .4);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.fillStyle = css(C.g, .07);
    ctx.beginPath(); ctx.roundRect(515, YG - 38, 700, 76, 14); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  ['{mx:x³}', '{mx:x²}', '{mx:x}', '{dim:termine}\n{dim:noto}'].forEach((s, i) => {
    drawRich(ctx, s, COL[i], YG, { size: i < 3 ? 40 : 30, lh: 1.05, alpha: P(t, 11.8 + .3 * i, 12.2 + .3 * i) });
  });
  COEF.forEach((s, i) => num(ctx, s, COL[i], Y1, C.ink, P(t, 11.9 + .3 * i, 12.3 + .3 * i)));
  // le righe dello schema e la radice del divisore, a sinistra
  ctx.save(); ctx.globalAlpha *= .8;
  segm(ctx, [XL, 360], [XL, 705], P(t, 21.3, 21.8), C.ink);
  segm(ctx, [345, YH], [1225, YH], P(t, 21.5, 22.1), C.ink);
  segm(ctx, [XS, 360], [XS, 705], P(t, 21.7, 22.2), C.ink);
  ctx.restore();
  num(ctx, '1', XA, Y2, C.g, P(t, 22.0, 22.4));
  const anello = Math.max(life(t, 25.7, 30.0, .3, .3), life(t, 75.6, 80.6, .3, .3));
  if (anello > 0) {
    ctx.save(); ctx.globalAlpha *= anello; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(XA, Y2, 46, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  // colori della riga in basso: il resto diventa verde, il quoziente viola
  const colRis = i => i === 3 ? mix(C.ink, C.g, P(t, 55.2, 55.7)) : mix(C.ink, C.v, P(t, 59.2, 59.7));
  // abbasso il primo coefficiente
  if (t > 30.3) num(ctx, RIS[0], COL[0], kf(t, [[30.3, Y1], [31.1, Y3]]), colRis(0), P(t, 30.3, 30.5));
  const FINE_SOMMA = [33.9, 41.8, 48.8, 55.0];
  for (let i = 1; i < 4; i++) {
    // moltiplico: la freccia porta il numero di sotto, per a, nella colonna dopo
    const kA = P(t, T_PROD[i], T_PROD[i] + .6);
    if (kA > 0) {
      // freccia curva: sale prima di andare a destra, così taglia le due linee lontano dal loro incrocio
      const a = [COL[i - 1] + 50, Y3 - 34], c = [COL[i - 1] + 70, Y2 + 10], b = [COL[i] - 50, Y2 + 28];
      const q = u => [(1 - u) ** 2 * a[0] + 2 * u * (1 - u) * c[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * u * (1 - u) * c[1] + u * u * b[1]];
      const fa = 1 - .65 * P(t, T_SOMMA[i], T_SOMMA[i] + .4);
      ctx.save(); ctx.globalAlpha *= fa; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); for (let j = 0; j <= 30; j++) { const p = q(kA * j / 30); j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
      if (kA > .95) arrowHead(ctx, b, Math.atan2(b[1] - c[1], b[0] - c[0]), C.v, .9);
      ctx.restore();
    }
    num(ctx, PROD[i], COL[i], Y2, C.v, P(t, T_PROD[i] + .5, T_PROD[i] + .9));
    // sommo in colonna
    const kc = life(t, T_SOMMA[i] - .1, FINE_SOMMA[i], .3, .3);
    if (kc > 0) {
      ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.g, .6); ctx.lineWidth = 3; ctx.fillStyle = css(C.g, .08);
      ctx.beginPath(); ctx.roundRect(COL[i] - 62, Y1 - 46, 124, Y3 - Y1 + 92, 16); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    num(ctx, RIS[i], COL[i], Y3, colRis(i), P(t, T_SOMMA[i] + .4, T_SOMMA[i] + .8));
  }
  // la lettura: il resto e il quoziente
  const kr = P(t, 55.3, 55.8);
  if (kr > 0) {
    ctx.save(); ctx.globalAlpha *= kr; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(COL[3] - 50, Y3 - 44, 100, 88, 14); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{g:resto}', COL[3], YE, { size: 34, alpha: kr });
  }
  const kq = P(t, 59.3, 59.8);
  if (kq > 0) {
    ctx.save(); ctx.globalAlpha *= kq;
    segm(ctx, [COL[0] - 40, 712], [COL[2] + 40, 712], 1, C.v, 3);
    drawRich(ctx, '{v:quoziente}', COL[1], YE, { size: 34 });
    ctx.restore();
  }
  ctx.restore();
}

// la scheda a destra: il numero a, poi il passo in corso, poi che cosa si legge (21–81)
const OPS = [[30.3, 34.0, 0, '{g:abbasso}{mink: 1}'], [34.2, 41.9, 0, '{mink:1 · 1 = 1}'], [38.8, 41.9, 1, '{mink:−2 + 1 = −1}'],
  [42.1, 48.9, 0, '{mink:−1 · 1 = −1}'], [45.9, 48.9, 1, '{mink:−5 + (−1) = −6}'], [49.1, 55.3, 0, '{mink:−6 · 1 = −6}'], [52.3, 55.3, 1, '{mink:6 + (−6) = 0}']];
function sceneDestra(ctx, t) {
  if (t < 21.0 || t > FINE + .2) return;
  const ca = life(t, 21.2, FINE, .6, .6);
  card(ctx, 1290, 270, 530, 530, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const X = 1555;
  const pa = 1 - P(t, 30.0, 30.3);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    drawRich(ctx, '{dim:divisore }{mink:x − 1}', X, 350, { size: 44, local: t - 21.4 });
    drawRich(ctx, '{mink:x − a}{dim:, con }{mink:a = }{mg:1}', X, 440, { size: 44, local: t - 22.0 });
    drawRich(ctx, '{mink:x − 1 = 0}', X, 560, { size: 46, local: t - 25.8 });
    drawRich(ctx, '{mink:x = }{mg:1}', X, 640, { size: 52, local: t - 26.3 });
    checkMark(ctx, X + 170, 640, P(t, 26.6, 27.2), C.g, .28);
    drawRich(ctx, '{r:non }{mr:−1}', X, 730, { size: 48, local: t - 27.0 });
    crossMark(ctx, X + 170, 730, P(t, 27.3, 27.9), C.r, .28);
    ctx.restore();
  }
  const pb = P(t, 30.2, 30.5) * (1 - P(t, 55.0, 55.3));
  if (pb > 0) {
    ctx.save(); ctx.globalAlpha *= pb;
    conFont(TITOLI, () => drawRich(ctx, 'il passo', X, 340, { size: 40, weight: 600 }));
    OPS.forEach(([a, b, riga, s]) => drawRich(ctx, s, X, riga ? 590 : 470, { size: 56, local: t - a, alpha: life(t, a, b, .3, .25) }));
    ctx.restore();
  }
  const pc = P(t, 55.3, 55.6);
  if (pc > 0) {
    ctx.save(); ctx.globalAlpha *= pc;
    drawRich(ctx, '{g:resto}{mink: = 0}', X, 340, { size: 52, local: t - 55.4 });
    drawRich(ctx, '{mv:Q(x)}{mink: = x² − x − 6}', X, 440, { size: 50, local: t - 63.6 });
    drawRich(ctx, '{mink:P(1) = 1 − 2 − 5 + 6}', X, 550, { size: 44, local: t - 71.6 });
    drawRich(ctx, '{mink:= }{mg:0}', X, 625, { size: 52, local: t - 72.4 });
    const s = '{dim:resto }{mink:= P(a)}';
    drawRich(ctx, s, X, 725, { size: 48, local: t - 75.7 });
    const kb = P(t, 76.3, 76.8);
    if (kb > 0) {
      const w = richW(ctx, s, 48) + 44;
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(X - w / 2, 725 - 40, w, 80, 14); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (81–92)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ruffini divide per {mink:x − a}\nusando solo i coefficienti.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[510, 640, '{g:abbassa}, {v:moltiplica}, {g:somma}'], [1040, 340, '{dim:resto }{mink:= P(a)}'], [1490, 480, 'resto 0: {mink:a} è uno {g:zero}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - w / 2, 446, w, 108);
    drawRich(ctx, s, x, 502, { size: 40, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La regola di Ruffini', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 30.0, 'preparare lo schema'], [30.0, 55.0, 'abbassa, moltiplica, somma'], [55.0, FINE, 'leggere il risultato']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneTesta(ctx, t); sceneSchema(ctx, t); sceneDestra(ctx, t); sceneFine(ctx, t); },
  };
});
