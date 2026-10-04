'use strict';
/* Le proprietà dei logaritmi — 8 · 4 = 32 è 2³ · 2² = 2⁵: gli esponenti si sommano, quindi
   log₂(8 · 4) = log₂ 8 + log₂ 4; poi log₂ 8³ = 3 · log₂ 8; e una somma nell'argomento non si spezza. Argomento: logaritmi. */
CVIDEO.registra('logaritmi/proprieta', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, card } = M;

const FINE = 73.4, DURATA = 85.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [16.5, 'felice'], [18.5, 'neutro'],
  [26.4, 'sorpreso'], [28.4, 'felice'], [30.4, 'neutro'], [37.0, 'pensa'], [41.5, 'neutro'], [50.7, 'felice'],
  [53.7, 'neutro'], [58.1, 'felice'], [60.1, 'neutro'], [63.6, 'sorpreso'], [65.6, 'neutro'],
  [FINE + 1.0, 'felice'], [80.0, 'occhiolino'], [82.0, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [2.6, 6.3, 'Che cosa fa il logaritmo\ndi un prodotto?'],
  // 1 · il prodotto
  [7.9, 11.6, 'Prendo il prodotto {mink:8 · 4 = 32}.'],
  [11.7, 16.4, 'Scrivo ogni numero come\npotenza di 2: {mink:2³ · 2² = 2⁵}.'],
  [16.5, 21.1, 'Moltiplicando, gli esponenti\nsi {g:sommano}: {mink:3 + 2 = 5}.'],
  [21.2, 26.3, 'Ma gli esponenti sono logaritmi:\n{mink:log₂ 8 = 3}, {mink:log₂ 4 = 2}, {mink:log₂ 32 = 5}.'],
  [26.4, 31.5, 'Quindi {mink:log₂(8 · 4) = log₂ 8 + log₂ 4}:\nil prodotto diventa una {g:somma}.'],
  [31.6, 36.7, 'In generale, con base {mink:a}\ne argomenti {mink:b}, {mink:c} positivi.'],
  // 2 · la potenza
  [37.0, 41.4, 'E il logaritmo di una potenza?\nProvo con {mink:log₂ 8³}.'],
  [41.5, 46.4, '{mink:8³ = 8 · 8 · 8}: il prodotto\ndiventa una somma.'],
  [46.5, 50.6, 'È tre volte lo stesso logaritmo:\n{mink:3 · log₂ 8}.'],
  [50.7, 53.6, 'Con {mink:log₂ 8 = 3} fa {mink:3 · 3 = 9}.'],
  [53.7, 58.0, 'Controllo: {mink:2⁹ = 512},\nproprio {mink:8³}.'],
  [58.1, 63.0, 'L’esponente scende davanti:\nla potenza diventa un {g:prodotto}.'],
  // 3 · e la somma?
  [63.6, 67.8, 'Attenzione alle {r:somme}:\n{mink:log₂(4 + 4) = log₂ 8 = 3}.'],
  [67.9, 72.8, 'Invece {mink:log₂ 4 + log₂ 4 = 4}: diversi.\nLa somma dentro il log {r:non si spezza}.'],
  // chiusura
  [FINE + 1.4, 82.6, 'I logaritmi sono esponenti: per\nquesto il prodotto diventa somma.'],
];
const CAPITOLI = [[7.5, 36.8, 'il prodotto'], [36.8, 63.2, 'la potenza'], [63.2, FINE, 'e la somma?']];

// una formula fatta a pezzi: stringhe di testo ricco, {sub} pedici e {sup} apici disegnati a mano
// (il pedice «a» di log_a non ha un carattere Unicode che il motore sappia abbassare)
function formula(ctx, parti, x, y, size, o = {}) {
  const ws = parti.map(p => typeof p === 'string' ? richW(ctx, p, size) : richW(ctx, p.sub || p.sup, size * .7) + size * .05);
  const tot = ws.reduce((a, b) => a + b, 0);
  let cx = o.align === 'left' ? x : o.align === 'right' ? x - tot : x - tot / 2;
  const pos = [];
  parti.forEach((p, i) => {
    const al = (o.alpha ?? 1) * (o.alphas && o.alphas[i] != null ? o.alphas[i] : 1);
    if (typeof p === 'string') drawRich(ctx, p, cx, y, { size, align: 'left', alpha: al });
    else drawRich(ctx, p.sub || p.sup, cx + size * .02, y + (p.sub ? size * .3 : -size * .4), { size: size * .7, align: 'left', alpha: al });
    pos.push([cx, ws[i]]); cx += ws[i];
  });
  return pos;
}
const LA = { sub: '{mink:a}' };
// riquadro arrotondato attorno a un risultato
function riquadro(ctx, x, y, w, h, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.fillStyle = css(col, .07);
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 18); ctx.fill(); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le proprietà dei logaritmi', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function sceneScheda(ctx, t) {
  if (t < 7.4 || t > FINE + .4) return;
  card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .3, .6, .6));
}

// 1 · il prodotto (7.5–36.8)
const COL = [560, 960, 1360], OPX = [760, 1160];
function sceneProdotto(ctx, t) {
  if (t < 7.5 || t > 37.0) return;
  const al = 1 - P(t, 36.4, 36.9);
  ctx.save(); ctx.globalAlpha *= al;
  // tre righe in colonna: i numeri, le potenze, i logaritmi
  const aR = 1 - P(t, 31.4, 31.9);
  if (aR > 0) {
    ctx.save(); ctx.globalAlpha *= aR;
    const k1 = P(t, 8.1, 8.6);
    ['{my:8}', '{my:4}', '{my:32}'].forEach((s, i) => drawRich(ctx, s, COL[i], 220, { size: 84, alpha: k1 }));
    ['{mink:·}', '{mink:=}'].forEach((s, i) => drawRich(ctx, s, OPX[i], 220, { size: 84, alpha: k1 }));
    const k2 = P(t, 11.9, 12.4), ke = P(t, 16.7, 17.1);
    if (k2 > 0) {
      [3, 2, 5].forEach((e, i) => formula(ctx, ['{mx:2}', { sup: `{mv:${e}}` }], COL[i], 350, 84, { alpha: k2 }));
      ['{mink:·}', '{mink:=}'].forEach((s, i) => drawRich(ctx, s, OPX[i], 350, { size: 84, alpha: k2 }));
    }
    // gli esponenti, a parte, in un riquadro
    riquadro(ctx, 1655, 350, 290, 96, C.v, ke);
    drawRich(ctx, '{mv:3 + 2 = 5}', 1655, 352, { size: 56, alpha: ke });
    drawRich(ctx, '{dim:gli esponenti}', 1655, 270, { size: 30, alpha: ke });
    const k3 = P(t, 21.4, 21.9);
    ['8', '4', '32'].forEach((n, i) => drawRich(ctx, `{mink:log₂ }{my:${n}}{mink: = }{mv:${[3, 2, 5][i]}}`, COL[i], 480, { size: 52, alpha: k3 }));
    ctx.restore();
  }
  // la proprietà sui numeri
  drawRich(ctx, '{mink:log₂(}{my:8}{mink: · }{my:4}{mink:) = log₂ }{my:8}{mink: + log₂ }{my:4}', 960, 650, { size: 66, alpha: P(t, 26.6, 27.1) });
  // la proprietà in generale
  const kg = P(t, 31.9, 32.4);
  if (kg > 0) {
    formula(ctx, ['{mink:log}', LA, '{mink:(b · c) = log}', LA, '{mink: b + log}', LA, '{mink: c}'], 960, 300, 72, { alpha: kg });
    drawRich(ctx, '{mink:a > 0},   {mink:a ≠ 1},   {mink:b > 0},   {mink:c > 0}', 960, 430, { size: 44, alpha: P(t, 32.6, 33.1) });
  }
  ctx.restore();
}

// 2 · la potenza (36.8–63.2)
const XA = 220, XB = 300, XD = 1480, YR = [240, 350, 460, 570, 680];
function scenePotenza(ctx, t) {
  if (t < 36.8 || t > 63.6) return;
  const al = 1 - P(t, 63.0, 63.5);
  ctx.save(); ctx.globalAlpha *= al;
  const S = 62;
  // l'esponente 3 (verde) è quello che scende davanti; il 3 viola è log₂ 8
  drawRich(ctx, '{mink:log₂ }{my:8}{mg:³}', XA, YR[0], { size: S, align: 'left', alpha: P(t, 37.2, 37.7) });
  const k12 = P(t, 41.7, 42.2);   // le due righe compaiono insieme: un solo fumetto le racconta
  drawRich(ctx, '{mink:= log₂(}{my:8}{mink: · }{my:8}{mink: · }{my:8}{mink:)}', XB, YR[1], { size: S, align: 'left', alpha: k12 });
  drawRich(ctx, '{mink:= log₂ }{my:8}{mink: + log₂ }{my:8}{mink: + log₂ }{my:8}', XB, YR[2], { size: S, align: 'left', alpha: k12 });
  drawRich(ctx, '{mink:= }{mg:3}{mink: · log₂ }{my:8}', XB, YR[3], { size: S, align: 'left', alpha: P(t, 46.7, 47.2) });
  drawRich(ctx, '{mink:= }{mg:3}{mink: · }{mv:3}{mink: = 9}', XB, YR[4], { size: S, align: 'left', alpha: P(t, 50.9, 51.4) });
  // a destra: il controllo, poi la regola
  const kc = P(t, 53.9, 54.4);
  if (kc > 0) {
    drawRich(ctx, '{dim:controllo}', XD, 250, { size: 32, alpha: kc });
    formula(ctx, ['{mx:2}', { sup: '{mink:9}' }, '{mink: = 512 = }{my:8}{mg:³}'], XD, 330, 62, { alpha: kc });
  }
  const kr = P(t, 58.3, 58.8);
  if (kr > 0) {
    riquadro(ctx, XD, 560, 640, 250, C.v, kr);
    formula(ctx, ['{mink:log}', LA, '{mink: b}', { sup: '{mg:k}' }, '{mink: = }{mg:k}{mink: · log}', LA, '{mink: b}'], XD, 500, 64, { alpha: kr });
    drawRich(ctx, '{dim:con} {mink:a > 0},  {mink:a ≠ 1},  {mink:b > 0}', XD, 592, { size: 40, alpha: kr });
    drawRich(ctx, '{dim:e} {mg:k} {dim:numero qualunque}', XD, 646, { size: 40, alpha: kr });
  }
  ctx.restore();
}

// 3 · e la somma? (63.2–FINE)
function sceneSomma(ctx, t) {
  if (t < 63.3 || t > FINE + .4) return;
  const al = 1 - P(t, FINE - .3, FINE + .3);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mink:log₂(4 + 4) = log₂ 8 = }{mv:3}', 960, 260, { size: 66, alpha: P(t, 63.8, 64.3) });
  const k2 = P(t, 68.1, 68.6);
  drawRich(ctx, '{mink:log₂ 4 + log₂ 4 = 2 + 2 = }{mv:4}', 960, 400, { size: 66, alpha: k2 });
  const k3 = P(t, 68.9, 69.4);
  if (k3 > 0) {
    riquadro(ctx, 960, 590, 360, 130, C.r, k3);
    drawRich(ctx, '{mv:3}{mink:  }{mr:≠}{mink:  }{mv:4}', 960, 590, { size: 84, alpha: k3 });
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
    drawRich(ctx, 'Il logaritmo trasforma i prodotti\nin somme e le potenze in prodotti.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[410, '{dim:il prodotto diventa somma}', '{mink:log₂(8 · 4) = 3 + 2}'],
    [960, '{dim:la potenza diventa prodotto}', '{mink:log₂ 8³ = 3 · 3}'],
    [1510, '{dim:la somma dentro il log}', '{r:non si spezza}']];
  pills.forEach(([x, testa, fo], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 260, 440, 520, 160);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    drawRich(ctx, fo, x, 548, { size: i === 2 ? 40 : 44 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Le proprietà dei logaritmi', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneScheda(ctx, t); sceneProdotto(ctx, t); scenePotenza(ctx, t); sceneSomma(ctx, t); sceneFine(ctx, t); },
  };
});
