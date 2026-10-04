'use strict';
/* Il metodo di bisezione — lo zero di x³ − x − 1 fra 1 e 2, chiuso in un intervallo che si dimezza a ogni passo. Argomento: continuita-asintoti. */
CVIDEO.registra('continuita-asintoti/bisezione', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 93.6;
const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [15.8, 'felice'], [18.0, 'neutro'], [34.0, 'felice'], [36.2, 'neutro'],
  [51.4, 'sorpreso'], [53.6, 'neutro'], [63.8, 'felice'], [66.0, 'neutro'],
  [75.6, 'festa'], [78.2, 'neutro'], [88.4, 'pensa'], [90.6, 'neutro'],
  [95.2, 'felice'], [97.8, 'occhiolino'], [99.8, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [1.9, 6.3, 'Come si trova uno zero\nsenza una formula?'],
  // 1 · il punto di partenza
  [9.2, 14.5, 'Cerco dove si annulla\n{my:f(}{mx:x}{my:) = }{mx:x}{my:³ − }{mx:x}{my: − 1}.'],
  [15.8, 21.7, '{my:f} è continua e cambia segno,\nda {r:−1} a {g:5}: lo zero sta in mezzo.'],
  [23.0, 27.6, 'Lo chiudo in una {v:morsa}\nsempre più stretta.'],
  // 2 · dimezzare
  [29.0, 32.6, 'Prendo il punto medio:\n{mx:1,5}.'],
  [34.0, 38.4, '{my:f(1,5) = 0,875}: {g:positivo},\ncome in {mx:2}.'],
  [38.5, 44.4, 'Il segno cambia fra {mx:1} e {mx:1,5}:\ntengo la metà di sinistra.'],
  [45.8, 49.9, 'Ora la morsa è lunga la {g:metà}.'],
  [51.4, 57.3, 'Punto medio {mx:1,25}: {my:f} vale {r:−0,297}.\nIl segno cambia fra {mx:1,25} e {mx:1,5}.'],
  [58.8, 62.6, 'Di nuovo a metà: {mx:1,375}.'],
  [63.8, 68.8, '{my:f} vale {g:0,225}: lo zero sta\nfra {mx:1,25} e {mx:1,375}.'],
  // 3 · quanto è precisa
  [69.8, 74.5, 'A ogni passo la morsa\nsi stringe della {v:metà}.'],
  [75.6, 80.9, 'Dopo tre passi è lunga {g:1/8}:\nlo zero sta lì dentro.'],
  [82.2, 87.2, 'Lo zero vero è {g:1,3247…}: la morsa\ngli si stringe attorno.'],
  [88.4, 93.4, 'Ci si ferma quando la morsa è\npiù corta della precisione voluta.'],
  // chiusura
  [95.2, 100.8, 'Dimezza e guarda il segno:\nlo zero non può scappare.'],
];

const f = x => x * x * x - x - 1;
const PCARD = [90, 110, 1000, 690], RCARD = [1140, 110, 690, 690];
const X = x => 160 + (x - .9) * 680, Y = y => 603 - y * 82, S = (x, y) => [X(x), Y(y)];
const RIGA = 755;   // il righello dei numeri, sotto la curva
const CURVA = []; for (let i = 0; i <= 200; i++) { const x = 1 + 1.05 * i / 200; CURVA.push(S(x, f(x))); }
// i tre passi: punto medio, quando compare, quando arriva il valore, l'intervallo che resta
const PASSI = [
  { m: 1.5, s: '1,5', tm: 27.7, tv: 32.7, fv: '0,875', int: '[1; 1,5]', ti: 44.5 },
  { m: 1.25, s: '1,25', tm: 50.0, tv: 50.6, fv: '−0,297', int: '[1,25; 1,5]', ti: 57.4 },
  { m: 1.375, s: '1,375', tm: 58.1, tv: 62.7, fv: '0,225', int: '[1,25; 1,375]', ti: 68.9, y: RIGA - 44 },   // una riga più su: fra 1,25 e 1,5 non ci sta
];
// gli estremi della morsa nel tempo
const aM = t => kf(t, [[44.5, 1], [57.4, 1], [58.0, 1.25]]);
const bM = t => kf(t, [[44.5, 2], [45.4, 1.5], [68.9, 1.5], [69.5, 1.375]]);

function numero(ctx, x, s, col, al, y = RIGA) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  dashed(ctx, S(x, 0), [X(x), y - 26], col, 1, .55);
  ctx.restore();
  txt(ctx, s, X(x), y, { size: 32, weight: 600, color: col, alpha: al });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Il metodo di bisezione', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

function sceneGrafico(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al); card(ctx, ...RCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  // l'asse x
  const ka = P(t, 7.4, 8.2);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(120, Y(0)); ctx.lineTo(985, Y(0)); ctx.stroke(); ctx.restore();
    arrowHead(ctx, [991, Y(0)], 0, C.ink);
    drawRich(ctx, '{mx:x}', 1025, Y(0), { size: 44, alpha: ka });
  }
  // la morsa: una fascia sull'asse fra a e b
  const kb = P(t, 21.8, 22.6);
  if (kb > 0) {
    const a = aM(t), b = bM(t);
    ctx.save(); ctx.globalAlpha *= kb; ctx.fillStyle = css(C.v, .22); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.fillRect(X(a), Y(0) - 12, X(b) - X(a), 24);
    [a, b].forEach(x => { ctx.beginPath(); ctx.moveTo(X(x), Y(0) - 22); ctx.lineTo(X(x), Y(0) + 22); ctx.stroke(); });
    ctx.restore();
  }
  glowStroke(ctx, CURVA, P(t, 8.0, 9.0, E.lin), C.y, 6);
  drawRich(ctx, '{my:f(}{mx:x}{my:) = }{mx:x}{my:³ − }{mx:x}{my: − 1}', 420, 215, { size: 42, local: t - 8.8 });
  // il righello: 1 e 2, poi i punti medi
  numero(ctx, 1, '1', C.ink, P(t, 8.4, 8.9));
  numero(ctx, 2, '2', C.ink, P(t, 8.4, 8.9));
  // i valori agli estremi
  const ke = P(t, 14.6, 15.4, E.back);
  if (ke > 0) {
    dashed(ctx, S(1, 0), S(1, -1), C.r, 1, .8); dashed(ctx, S(2, 0), S(2, 5), C.g, 1, .8);
    dot(ctx, S(1, -1), C.r, ke, 11); dot(ctx, S(2, 5), C.g, ke, 11);
    drawRich(ctx, '{mr:−1}', X(1) - 22, Y(-1), { size: 40, align: 'right', alpha: P(t, 15.0, 15.4) });
    drawRich(ctx, '{mg:5}', X(2) + 24, Y(5), { size: 40, align: 'left', alpha: P(t, 15.0, 15.4) });
  }
  // i punti medi
  PASSI.forEach(K => {
    const km = P(t, K.tm, K.tm + .5);
    if (km <= 0) return;
    numero(ctx, K.m, K.s, C.x, km, K.y);
    const kv = P(t, K.tv, K.tv + .6), y = f(K.m), col = y > 0 ? C.g : C.r;
    if (kv > 0) { dashed(ctx, S(K.m, 0), S(K.m, y), col, kv, .9); dot(ctx, S(K.m, y), col, P(t, K.tv + .4, K.tv + .8, E.back), 10); }
  });
  // lo zero vero
  const kz = P(t, 81.0, 81.6, E.back);
  if (kz > 0) {
    dot(ctx, S(1.3247, 0), C.g, kz, 9);
    txt(ctx, '1,3247…', X(1.3247) - 20, Y(0) - 70, { size: 44, weight: 600, color: C.g, align: 'right', alpha: P(t, 81.3, 81.7) });
  }
  ctx.restore();
}

function sceneScheda(ctx, t) {
  if (t < 21 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= life(t, 7.2, FINE, .6, .6);
  const kh = P(t, 21.8, 22.4);
  ctx.save(); ctx.globalAlpha *= kh;
  txt(ctx, 'punto medio', 1250, 190, { size: 30, color: C.dim });
  drawRich(ctx, '{dim:valore di }{my:f}', 1450, 190, { size: 30 });
  txt(ctx, 'intervallo', 1690, 190, { size: 30, color: C.dim });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1170, 225); ctx.lineTo(1800, 225); ctx.stroke();
  txt(ctx, '[1; 2]', 1690, 280, { size: 36, color: C.v });
  ctx.restore();
  PASSI.forEach((K, i) => {
    const y = 345 + i * 65;
    txt(ctx, K.s, 1250, y, { size: 36, color: C.x, alpha: P(t, K.tm, K.tm + .4) });
    txt(ctx, K.fv, 1450, y, { size: 36, color: f(K.m) > 0 ? C.g : C.r, alpha: P(t, K.tv + .3, K.tv + .7) });
    txt(ctx, K.int, 1690, y, { size: 36, color: C.v, weight: i === 2 ? 600 : 500, alpha: P(t, K.ti, K.ti + .4) });
  });
  // 3 · quanto è lunga la morsa
  const kl = P(t, 68.9, 69.5);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1170, 560); ctx.lineTo(1800, 560); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{dim:lunghezza}', 1485, 605, { size: 30, alpha: kl });
    const g = P(t, 74.6, 75.2);
    drawRich(ctx, '{mink:1  →  1/2  →  1/4  →  }{mv:1/8}', 1485, 665, { size: 44, alpha: kl * (1 - g) });
    drawRich(ctx, '{mink:1  →  1/2  →  1/4  →  }{mg:1/8}', 1485, 665, { size: 44, alpha: kl * g });
    // quando fermarsi
    drawRich(ctx, 'ci si ferma sotto la {v:precisione} voluta', 1485, 740, { size: 32, alpha: P(t, 88.0, 88.5) });
  }
  ctx.restore();
}

// 4 · in una frase
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE + 7.8, FINE + 8.8);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Dimezza, guarda il segno,\ntieni la metà {g:giusta}.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'il {v:punto medio}'], [960, 'segni {r:opposti} agli estremi'], [1430, 'lunga la {g:metà} a ogni passo']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 215, 455, 430, 100);
    drawRich(ctx, s, x, 507, { size: 31, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il metodo di bisezione', durata: 103.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, 27.6, 'dove cercare'], [27.6, 68.8, 'dimezzare'], [68.8, FINE, 'quanto è stretta la morsa']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
