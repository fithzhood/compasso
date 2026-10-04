'use strict';
/* Il seno di una somma — sin(α + β) costruito sulla circonferenza goniometrica: l'altezza di P si spezza
   in due cateti, sin α cos β (triangolo OHQ) e cos α sin β (triangolo QRP). Figura con α = 40°, β = 30°.
   Argomento: formule-goniometriche. */
CVIDEO.registra('formule-goniometriche/addizione', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 86.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [15.2, 'felice'], [17.4, 'neutro'],
  [32.0, 'felice'], [34.2, 'neutro'], [46.0, 'felice'], [48.2, 'neutro'], [58.2, 'sorpreso'], [60.4, 'neutro'],
  [65.6, 'felice'], [68.4, 'neutro'], [73.1, 'festa'], [75.6, 'felice'], [77.6, 'neutro'], [80.0, 'felice'],
  [82.0, 'pensa'], [84.2, 'neutro'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; i raggi girano solo nei fumetti 1 e 2, il pezzo verde scorre nel 14
const FUMETTI = [
  [2.0, 6.5, 'Quanto vale il seno\ndi una somma di due angoli?'],
  // 1 · i due angoli
  [7.9, 12.2, 'Sulla circonferenza goniometrica\ngiro il raggio di un angolo {mx:α} (alfa)…'],
  [12.4, 16.7, '…poi di un altro angolo {mink:β} (beta),\nfino al punto {mink:P}.'],
  [16.9, 21.3, 'L’ordinata di {mink:P} è il seno\ndell’angolo intero, {mv:sin(α + β)}.'],
  // 2 · il triangolo di β
  [21.5, 26.0, 'Da {mink:P} scendo perpendicolare\nal raggio di {mx:α}: è il punto {mink:Q}.'],
  [26.2, 30.7, '{mink:OQP} è un triangolo rettangolo:\nl’ipotenusa è il raggio, lunga 1.'],
  [30.9, 35.2, 'Con l’angolo {mink:β} in {mink:O}, i cateti sono\n{mink:OQ = cos β} e {mink:QP = sin β}.'],
  // 3 · il primo pezzo
  [35.4, 39.5, 'Da {mink:Q} scendo sull’asse {mx:x}:\nè il punto {mink:H}.'],
  [39.6, 44.0, 'L’altezza {mink:QH} è un cateto\ndel triangolo rettangolo {mink:OHQ}.'],
  [44.2, 48.8, 'Ipotenusa {mink:cos β} per il seno\ndell’angolo opposto, {mx:α}: {mg:sin α cos β}.'],
  // 4 · il secondo pezzo
  [49.0, 53.5, 'Da {mink:Q} vado in orizzontale\nfino sotto {mink:P}: è il punto {mink:R}.'],
  [53.7, 58.0, 'Il resto dell’altezza di {mink:P} è {mink:PR},\ncateto del triangolo {mink:QRP}.'],
  [58.2, 63.5, 'In {mink:P} c’è ancora l’angolo {mx:α}: ha\ni lati perpendicolari a quelli in {mink:O}.'],
  [63.7, 68.2, 'Ipotenusa {mink:sin β} per il coseno\ndell’angolo adiacente: {my:cos α sin β}.'],
  // 5 · la formula
  [68.4, 72.9, 'Porto il primo pezzo sotto {mink:R}:\ninsieme fanno l’altezza di {mink:P}.'],
  [73.1, 77.0, 'È la {v:formula di addizione}\ndel seno.'],
  [77.2, 81.8, 'Con i numeri: 0,56 + 0,38 = 0,94,\ne {mink:sin} 70° ≈ 0,94.'],
  [82.0, 86.5, 'La figura usa {mx:α} e {mink:β} acuti,\nma la formula vale sempre.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Il seno di una somma è la somma\ndi due prodotti di seni e coseni.'],
];

// il piano: un quarto di circonferenza goniometrica, O in basso a sinistra
const O = [310, 765], U = 580;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const CARD = [70, 110, 930, 690];
const RAD = Math.PI / 180, A = 40, B = 30;
const ca = Math.cos(A * RAD), sa = Math.sin(A * RAD), cb = Math.cos(B * RAD), sb = Math.sin(B * RAD);
const PP = [Math.cos((A + B) * RAD), Math.sin((A + B) * RAD)];   // P, angolo α + β
const QQ = [cb * ca, cb * sa];                                       // Q, piede della perpendicolare da P sul raggio di α
const HH = [QQ[0], 0], RR = [PP[0], QQ[1]], FF = [PP[0], 0];
// i raggi girano solo qui
const angA = t => kf(t, [[9.2, 0], [11.2, A]]);
const angP = t => kf(t, [[9.2, 0], [11.2, A], [13.0, A], [15.0, A + B]]);

function linea(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// numeri degli assi su un fondino
function numero(ctx, s, p, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.roundRect(p[0] - 22, p[1] - 21, 44, 42, 9); ctx.fill();
  txt(ctx, s, p[0], p[1], { size: 34, color: C.dim });
  ctx.restore();
}
// etichetta matematica su un fondino della carta
function etichetta(ctx, s, p, al, size = 42, align = 'center') {
  if (al <= 0) return;
  drawRich(ctx, s, p[0], p[1], { size, alpha: al, align });
}
// angolo retto nel vertice V fra le direzioni d1 e d2 (versori, in unità del piano)
function retto(ctx, V, d1, d2, al, col = C.ink, q = .045, w = 2.5) {
  if (al <= 0) return;
  const a = S(V[0] + d1[0] * q, V[1] + d1[1] * q), b = S(V[0] + (d1[0] + d2[0]) * q, V[1] + (d1[1] + d2[1]) * q), c = S(V[0] + d2[0] * q, V[1] + d2[1] * q);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .85); ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(...c); ctx.stroke(); ctx.restore();
}
function arco(ctx, V, r, a0, a1, col, al, w = 4) {
  if (al <= 0 || Math.abs(a1 - a0) < .01) return;
  const c = S(...V);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w;
  ctx.beginPath(); ctx.arc(c[0], c[1], r * U, -a0 * RAD, -a1 * RAD, a1 > a0); ctx.stroke(); ctx.restore();
}
function triangolo(ctx, pts, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col);
  ctx.beginPath(); pts.forEach((p, i) => { const s = S(...p); if (i) ctx.lineTo(...s); else ctx.moveTo(...s); }); ctx.closePath(); ctx.fill(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il seno di una somma', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S(-.06, 0)); ctx.lineTo(...S(-.06 + 1.16 * k, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S(0, -.04)); ctx.lineTo(...S(0, -.04 + 1.12 * k)); ctx.stroke();
  arrowHead(ctx, [S(-.06 + 1.16 * k, 0)[0] + 6, O[1]], 0, C.ink);
  arrowHead(ctx, [O[0], S(0, -.04 + 1.12 * k)[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', S(1.1, 0)[0] + 4, O[1] - 36, { size: 44 });
  drawRich(ctx, '{my:y}', O[0] + 34, S(0, 1.08)[1] + 4, { size: 44 });
  ctx.restore();
}

// la figura (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // un quarto di circonferenza di raggio 1
  const kc = P(t, 7.9, 9.0, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, -Math.PI / 2 * kc, true); ctx.stroke(); ctx.restore();
  }
  const kn = P(t, 8.6, 9.0);
  numero(ctx, '1', S(.94, .065), kn); numero(ctx, '1', S(-.065, 1), kn);

  const kSlide = P(t, 68.8, 70.4);              // il pezzo verde scorre sotto R
  const via = 1 - P(t, 68.4, 68.8);             // quello che il pezzo verde attraverserebbe se ne va prima
  // i triangoli, sotto le linee
  triangolo(ctx, [[0, 0], QQ, PP], C.v, .10 * life(t, 26.4, 35.6, .6, .5));
  triangolo(ctx, [[0, 0], HH, QQ], C.g, .13 * P(t, 40.0, 40.6) * via);
  triangolo(ctx, [RR, QQ, PP], C.y, .15 * P(t, 54.2, 54.8) * (1 - P(t, FINE - 1, FINE - .6)));

  // F12: i lati dell'angolo α in O si accendono insieme agli angoli retti
  const kPerp = life(t, 59.4, 63.4, .4, .5);
  if (kPerp > 0) {
    ctx.save(); ctx.globalAlpha *= kPerp * .8;
    glowStroke(ctx, [O, S(...HH)], 1, C.x, 7); glowStroke(ctx, [O, S(...QQ)], 1, C.x, 7);
    ctx.restore();
  }

  // i raggi: quello di α resta fermo a 40°, il secondo arriva in P
  const aA = angA(t), aP = angP(t);
  const kr = P(t, 8.8, 9.2);
  linea(ctx, O, S(Math.cos(aA * RAD), Math.sin(aA * RAD)), C.ink, 4, 1, kr);
  if (t > 13.0) linea(ctx, O, S(Math.cos(aP * RAD), Math.sin(aP * RAD)), C.ink, 5);
  // gli archi degli angoli
  arco(ctx, [0, 0], .15, 0, aA, C.x, P(t, 9.2, 9.4));
  etichetta(ctx, '{mx:α}', S(.25 * Math.cos(aA / 2 * RAD), .25 * Math.sin(aA / 2 * RAD)), P(t, 10.9, 11.3), 44);
  if (t > 13.0) {
    arco(ctx, [0, 0], .21, A, aP, C.ink, P(t, 13.0, 13.2));
    etichetta(ctx, '{mink:β}', S(.31 * Math.cos((A + aP) / 2 * RAD), .31 * Math.sin((A + aP) / 2 * RAD)), P(t, 14.7, 15.1), 44);
  }

  // F3: l'ordinata di P, riportata sull'asse y
  dashed(ctx, S(...PP), S(0, PP[1]), C.v, P(t, 17.2, 17.8), .9);
  const kTot = P(t, 17.6, 18.4);
  if (kTot > 0) glowStroke(ctx, [O, S(0, PP[1] * kTot)], 1, C.v, 8);
  etichetta(ctx, '{mv:sin(α + β)}', [O[0] - 22, S(0, PP[1] / 2)[1]], P(t, 18.3, 18.7), 42, 'right');

  // F4: la perpendicolare da P sul raggio di α
  linea(ctx, S(...PP), S(...QQ), C.ink, 4, P(t, 21.9, 22.7));
  retto(ctx, QQ, [-ca, -sa], [-sa, ca], P(t, 22.7, 23.0) * (1 - kPerp) * (1 - P(t, FINE - 1, FINE - .6)));
  retto(ctx, QQ, [-ca, -sa], [-sa, ca], kPerp, C.x, .045, 4);
  // F5: l'ipotenusa è il raggio
  etichetta(ctx, '{mink:1}', S(PP[0] / 2 - .06 * PP[1], PP[1] / 2 + .06 * PP[0]), P(t, 26.6, 27.0), 44);
  // F6: i cateti del triangolo di β
  etichetta(ctx, '{mink:cos β}', S(QQ[0] / 2 + .07 * sa, QQ[1] / 2 - .07 * ca), P(t, 31.3, 31.7) * via, 42);
  const kSb = P(t, 32.3, 32.7);
  if (kSb > 0) { const p = S(.615, .735); ctx.save(); ctx.globalAlpha *= kSb; ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(p[0] - 54, p[1] - 24, 108, 48, 10); ctx.fill(); ctx.restore(); }
  etichetta(ctx, '{mink:sin β}', S(.615, .735), kSb, 42);

  // F7–F9: il primo pezzo, QH
  dashed(ctx, S(...QQ), S(...HH), C.ink, P(t, 35.6, 36.2), .9 * via);
  retto(ctx, HH, [-1, 0], [0, 1], P(t, 36.3, 36.6) * via);
  const kV = P(t, 39.8, 40.4);
  if (kV > 0) {
    const x = lerp(HH[0], FF[0], kSlide);
    glowStroke(ctx, [S(x, 0), S(x, QQ[1])], kV, C.g, 9);
  }
  // F10–F13: il secondo pezzo, PR
  dashed(ctx, S(QQ[0] - .075, QQ[1]), S(...RR), C.ink, P(t, 49.4, 50.0), .9);
  retto(ctx, RR, [1, 0], [0, 1], P(t, 54.4, 54.7) * (1 - kPerp) * (1 - P(t, FINE - 1, FINE - .6)));
  retto(ctx, RR, [1, 0], [0, 1], kPerp, C.x, .045, 4);
  const kPR = P(t, 54.0, 54.6);
  if (kPR > 0) glowStroke(ctx, [S(...RR), S(...PP)], kPR, mix(C.ink, C.y, P(t, 63.9, 64.4)), 9);
  // F12: l'angolo α in P, fra PR e PQ
  arco(ctx, PP, .1, -90, -50, C.x, P(t, 58.5, 59.0), 5);
  etichetta(ctx, '{mx:α}', S(PP[0] + .17 * Math.cos(-70 * RAD), PP[1] + .17 * Math.sin(-70 * RAD)), P(t, 58.8, 59.2), 44);

  // i punti e i loro nomi
  dot(ctx, O, C.ink, P(t, 8.0, 8.3, E.back), 8);
  if (t > 9.2 && t < 15.2) dot(ctx, S(Math.cos(aP * RAD), Math.sin(aP * RAD)), C.ink, 1, 8);
  dot(ctx, S(...PP), C.v, P(t, 15.0, 15.4, E.back), 12);
  etichetta(ctx, '{mink:P}', S(1.1 * PP[0], 1.1 * PP[1]), P(t, 15.2, 15.6), 44);
  dot(ctx, S(...QQ), C.ink, P(t, 22.8, 23.2, E.back), 9);
  etichetta(ctx, '{mink:Q}', S(QQ[0] + .075, QQ[1] - .03), P(t, 22.9, 23.3), 44);
  dot(ctx, S(...HH), C.ink, P(t, 36.2, 36.6, E.back) * via, 8);
  etichetta(ctx, '{mink:H}', S(HH[0] + .06, .065), P(t, 36.3, 36.7) * via, 44);
  dot(ctx, S(...RR), C.ink, P(t, 50.0, 50.4, E.back), 8);
  etichetta(ctx, '{mink:R}', S(RR[0] - .055, RR[1]), P(t, 50.1, 50.5), 44);
  etichetta(ctx, '{mink:O}', S(-.055, .045), P(t, 26.2, 26.6), 44);
  ctx.restore();
}

// la scheda a destra: i valori degli angoli, i cateti, la formula
const XS = 1450;
function sceneScheda(ctx, t) {
  if (t < 11.0 || t > FINE + .2) return;
  const la = P(t, 11.0, 11.6) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  drawRich(ctx, '{mx:α}{mink: =}{ink: 40°}', 1290, 185, { size: 46, local: t - 11.2 });
  drawRich(ctx, '{mink:β =}{ink: 30°}', 1610, 185, { size: 46, local: t - 15.0 });
  const kCat = 1 - P(t, 77.2, 77.5);
  drawRich(ctx, '{mink:OQ = cos β}', XS, 275, { size: 44, local: t - 31.4, alpha: kCat });
  drawRich(ctx, '{mink:QP = sin β}', XS, 340, { size: 44, local: t - 32.4, alpha: kCat });
  drawRich(ctx, '{mg:sin}{g: 40°}{mg: · cos}{g: 30°}{mg: ≈ 0,56}', XS, 275, { size: 44, local: t - 77.6 });
  drawRich(ctx, '{my:cos}{y: 40°}{my: · sin}{y: 30°}{my: ≈ 0,38}', XS, 340, { size: 44, local: t - 78.2 });
  drawRich(ctx, '{mg:QH = sin α cos β}', XS, 425, { size: 44, local: t - 45.8 });
  drawRich(ctx, '{my:PR = cos α sin β}', XS, 490, { size: 44, local: t - 65.4 });
  // il riquadro della formula: prima la domanda, poi la risposta
  const kb = P(t, 17.6, 18.2);
  if (kb > 0) {
    const kOk = P(t, 73.1, 73.6);
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(mix(C.v, C.g, kOk), .75); ctx.lineWidth = 3 + kOk;
    ctx.beginPath(); ctx.roundRect(XS - 340, 545, 680, 160, 18); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:sin(α + β)}{mink: =}', XS, 590, { size: 48, local: t - 18.3 });
    txt(ctx, '?', XS, 658, { size: 56, weight: 600, color: C.v, alpha: P(t, 18.6, 19.0) * (1 - P(t, 72.9, 73.2)) });
    drawRich(ctx, '{mg:sin α cos β}{mink: + }{my:cos α sin β}', XS, 658, { size: 48, local: t - 73.3 });
  }
  drawRich(ctx, '{mg:0,56}{mink: + }{my:0,38}{mink: = 0,94 ≈ sin}{ink: 70°}', XS, 755, { size: 44, local: t - 77.5 });
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il seno di una somma si spezza\nin due prodotti di seni e coseni.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[350, '{mv:sin(α + β)}{mink: =}\n{mg:sin α cos β}{mink: + }{my:cos α sin β}', 40], [960, 'due cateti\nnell’altezza di {mink:P}', 34], [1570, 'vale per {g:tutti}\ngli angoli', 34]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 290, 450, 580, 140);
    drawRich(ctx, s, px, 520, { size, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il seno di una somma', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 21.4, 'due angoli in fila'], [21.4, 35.1, 'il triangolo di β'], [35.1, 48.9, 'il primo pezzo'],
      [48.9, 68.3, 'il secondo pezzo'], [68.3, FINE, 'la formula']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
