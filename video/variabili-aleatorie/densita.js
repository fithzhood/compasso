'use strict';
/* Quando le barre diventano area — X = un tempo d'attesa fra 0 e 4 minuti, con densità f(x) = 3/32 · x(4 − x):
   l'istogramma a classi di 1 minuto (aree 0,16, 0,34, 0,34, 0,16) si infittisce fino a diventare la curva;
   P(1 ≤ X ≤ 2) = ∫₁² f(x) dx = 11/32 ≈ 0,34, la stessa area della barra; l'area totale è 1; intorno a 2
   l'area si assottiglia (0,367, 0,075, 0,0075) fino a P(X = 2) = 0. Argomento: variabili-aleatorie. */
CVIDEO.registra('variabili-aleatorie/densita', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, fmtN, card, glowStroke } = M;

const FINE = 74.2, DUR = 86.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [14.4, 'felice'],
  [17.6, 'neutro'], [24.0, 'felice'], [27.2, 'neutro'], [32.6, 'sorpreso'], [35.8, 'neutro'], [42.0, 'felice'],
  [45.7, 'sorpreso'], [48.0, 'neutro'], [51.0, 'felice'], [55.8, 'pensa'], [60.0, 'neutro'], [65.6, 'sorpreso'],
  [69.4, 'neutro'],
  [FINE + 1.0, 'felice'], [80.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Se {mink:X} prende ogni valore,\ncome si calcola la probabilità?'],
  // 1 · classi sempre più sottili
  [8.0, 12.6, '{mink:X} è un’attesa in minuti:\nqualunque numero fra 0 e 4.'],
  [12.8, 17.4, 'Divido in classi di 1 minuto\ne disegno un {v:istogramma}.'],
  [17.6, 22.2, 'Ogni {v:area} è la probabilità\nche {mink:X} cada in quella classe.'],
  [22.4, 27.0, 'Classi di mezzo minuto: appare\nuna forma che si stringe ai lati.'],
  [27.2, 31.0, 'Più sottili ancora…'],
  [31.2, 35.6, '…e i gradini diventano una {v:curva}:\nla {v:densità} {mink:f(x)}.'],
  // 2 · la probabilità è un'area
  [35.8, 40.9, 'La probabilità che {mink:X} stia fra 1 e 2\nè l’{v:area} sotto la curva.'],
  [41.1, 45.5, 'Si calcola con un {v:integrale}:\nviene circa {g:0,34}.'],
  [45.7, 50.1, 'È la stessa area\ndella barra fra 1 e 2.'],
  [50.3, 55.6, 'L’area {g:totale} sotto la curva\nvale {g:1}: {mink:X} sta di sicuro fra 0 e 4.'],
  [55.8, 59.8, 'E la probabilità che {mink:X}\nvalga {v:esattamente} 2?'],
  [60.0, 64.6, 'Stringo l’intervallo intorno a 2:\nl’area si assottiglia…'],
  [64.8, 69.2, '…su un punto solo l’area è {r:0}:\n{mink:P(X = 2) = 0}.'],
  [69.4, 73.8, 'Con una variabile continua contano\ngli {v:intervalli}, non i singoli valori.'],
  // chiusura
  [75.0, 83.2, 'Probabilità = area sotto la densità:\ntutta vale 1, un punto vale 0.'],
];

// ---- la densità e il piano ----
const f = x => 3 / 32 * x * (4 - x), G = x => 3 / 32 * (2 * x * x - x * x * x / 3);   // G: la probabilità che X stia fra 0 e x
const CARD = [110, 110, 1060, 690], PAN = [1200, 110, 610, 690];
const XS = x => 200 + x * 220, AY = 700, YS = 1100, YP = y => AY - y * YS;
const CURVA = []; for (let i = 0; i <= 200; i++) { const x = 4 * i / 200; CURVA.push([XS(x), YP(f(x))]); }
// le altezze dell'istogramma con n classi: probabilità della classe divisa per l'ampiezza
const altezze = n => { const w = 4 / n, a = []; for (let j = 0; j < n; j++) a.push((G((j + 1) * w) - G(j * w)) / w); return a; };
const STADI = [4, 8, 16, 32, 64].map(altezze);
const PASSI = [[22.6, 23.6], [27.4, 28.0], [28.6, 29.2], [29.8, 30.4]];   // quando ogni classe si divide in due
const AMPIEZZE = ['1', '0,5', '0,25', '0,125', '0,0625'];
// la mezza ampiezza dell'intervallo intorno a 2
const mezza = t => kf(t, [[61.4, .5], [62.4, .1], [62.8, .1], [63.6, .01], [64.9, .01], [65.5, 0]]);

// ---- ∫ grande (il glifo di KaTeX allungato in verticale) con gli estremi piccoli, poi il corpo ----
const SY = 1.75;
function intMisure(ctx, a, b, corpo, size) {
  ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; ctx.textBaseline = 'middle';
  const m = ctx.measureText('∫'), l = m.actualBoundingBoxLeft, r = m.actualBoundingBoxRight;
  const ls = Math.max(30, Math.round(size * .48)), top = m.actualBoundingBoxAscent * SY, bot = m.actualBoundingBoxDescent * SY;
  const xb = l + r + size * .08, xa = (l + r) * .62 + size * .06;     // l'estremo di sotto sta a destra della coda
  const xc = Math.max(xb + richW(ctx, b, ls), xa + richW(ctx, a, ls)) + size * .22;
  return { l, r, ls, top, bot, xb, xa, xc, w: xc + richW(ctx, corpo, size) };
}
function drawInt(ctx, a, b, corpo, x0, y, size) {
  const m = intMisure(ctx, a, b, corpo, size);
  ctx.save(); ctx.translate(x0 + m.l, y); ctx.scale(1, SY);
  ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = css(C.ink); ctx.fillText('∫', 0, 0);
  ctx.restore();
  drawRich(ctx, b, x0 + m.xb, y - m.top + m.ls * .45, { size: m.ls, align: 'left' });
  drawRich(ctx, a, x0 + m.xa, y + m.bot - m.ls * .3, { size: m.ls, align: 'left' });
  drawRich(ctx, corpo, x0 + m.xc, y, { size, align: 'left' });
}
// prima e dopo l'integrale, tutto centrato in cx; entra tutto insieme dopo «local»
const CORPO = '{my:f(}{mx:x}{my:)}{mink: }{mx:dx}';
const FDEF = '{my:f(}{mx:x}{my:) = }{mink:3/32 · }{mx:x}{mink:(4 − }{mx:x}{mink:)}';
// con localPrima il pezzo «prima» entra per conto suo, prima dell'integrale
function rigaInt(ctx, prima, a, b, dopo, cx, y, size, local, localPrima) {
  const w0 = prima ? richW(ctx, prima, size) : 0, mi = intMisure(ctx, a, b, CORPO, size), w1 = richW(ctx, dopo, size);
  const x0 = cx - (w0 + mi.w + w1) / 2;
  if (prima && localPrima != null) drawRich(ctx, prima, x0, y, { size, align: 'left', alpha: P(localPrima, 0, .6, E.out) });
  const k = P(local, 0, .6, E.out); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 14);
  if (prima && localPrima == null) drawRich(ctx, prima, x0, y, { size, align: 'left' });
  drawInt(ctx, a, b, CORPO, x0 + w0, y, size);
  drawRich(ctx, dopo, x0 + w0 + mi.w, y, { size, align: 'left' });
  ctx.restore();
}
function area(ctx, a, b, col, al) {
  if (al <= 0 || b <= a) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.moveTo(XS(a), AY);
  for (let i = 0; i <= 60; i++) { const x = lerp(a, b, i / 60); ctx.lineTo(XS(x), YP(f(x))); }
  ctx.lineTo(XS(b), AY); ctx.closePath(); ctx.fillStyle = css(col, .28); ctx.fill();
  ctx.strokeStyle = css(col, .9); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quando le barre diventano area', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · l'istogramma, la curva, le aree (7.5–FINE)
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // le aree colorate stanno sotto le barre e la curva
  area(ctx, 0, 4, C.g, life(t, 50.5, 55.7, .6, .4));
  area(ctx, 1, 2, C.v, life(t, 36.0, 50.1, .6, .4));
  const kI = life(t, 60.2, 69.4, .4, .4), d = mezza(t);
  if (d > .002) area(ctx, 2 - d, 2 + d, C.v, kI);
  // l'istogramma: le classi si dividono in due, le altezze scivolano verso quelle nuove
  const kb = 1 - P(t, 32.6, 33.4);
  if (t > 12.9 && kb > 0) {
    let s = 0, u = 0;
    for (let i = 0; i < PASSI.length; i++) {
      if (t >= PASSI[i][1]) s = i + 1;
      else { if (t > PASSI[i][0]) u = P(t, PASSI[i][0], PASSI[i][1]); break; }
    }
    const hs = u > 0 ? STADI[s + 1].map((h, j) => lerp(STADI[s][j >> 1], h, u)) : STADI[s];
    const w = 4 / hs.length;
    ctx.save(); ctx.globalAlpha *= kb;
    hs.forEach((h, j) => {
      const g = P(t, 13.0 + j * .25, 13.6 + j * .25, E.out);
      const x0 = XS(j * w), x1 = XS((j + 1) * w), y = YP(h * g);
      ctx.fillStyle = css(C.x, .2); ctx.fillRect(x0, y, x1 - x0, AY - y);
      ctx.strokeStyle = css(C.x, .85); ctx.lineWidth = Math.min(2.5, (x1 - x0) * .12); ctx.strokeRect(x0, y, x1 - x0, AY - y);
    });
    ctx.restore();
  }
  // le aree delle quattro barre
  const ke = life(t, 17.8, 22.5, .4, .3);
  if (ke > 0) ['0,16', '0,34', '0,34', '0,16'].forEach((s, j) => drawRich(ctx, `{mink:≈ ${s}}`, XS(j + .5), YP(STADI[0][j] / 2), { size: 40, alpha: ke }));
  // la barra fra 1 e 2, di nuovo, sopra la curva
  const kg = life(t, 45.9, 50.1, .4, .4);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg; ctx.fillStyle = css(C.x, .12); ctx.fillRect(XS(1), YP(STADI[0][1]), XS(2) - XS(1), AY - YP(STADI[0][1]));
    ctx.strokeStyle = css(C.x); ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.strokeRect(XS(1), YP(STADI[0][1]), XS(2) - XS(1), AY - YP(STADI[0][1])); ctx.restore();
  }
  // la curva
  if (t > 31.3) glowStroke(ctx, CURVA, P(t, 31.4, 32.6), C.y, 5);
  drawRich(ctx, '{my:f(}{mx:x}{my:)}', XS(3.4) + 30, YP(f(3.4)) - 34, { size: 44, align: 'left', local: t - 32.6 });
  // un punto solo: un segmento senza larghezza
  const kz = life(t, 65.3, 69.4, .3, .4);
  if (kz > 0) {
    ctx.save(); ctx.globalAlpha *= kz; ctx.strokeStyle = css(C.r); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(XS(2), AY - 3); ctx.lineTo(XS(2), YP(f(2)) + 3); ctx.stroke(); ctx.restore();
  }
  // le scritte dentro le aree
  drawRich(ctx, '{mink:≈ }{mg:0,34}', XS(1.5), AY - 150, { size: 44, alpha: life(t, 41.3, 50.1, .4, .4) });
  drawRich(ctx, 'area{mink: = }{mg:1}', XS(3), AY - 120, { size: 48, alpha: life(t, 50.6, 55.7, .4, .4) });
  // l'asse dei minuti
  const ka = P(t, 7.7, 8.4);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(XS(-.2), AY); ctx.lineTo(XS(4.25), AY); ctx.stroke();
    ctx.lineWidth = 2;
    for (let v = 0; v <= 4; v++) { ctx.beginPath(); ctx.moveTo(XS(v), AY); ctx.lineTo(XS(v), AY + 10); ctx.stroke(); drawRich(ctx, `{mink:${v}}`, XS(v), AY + 38, { size: 40 }); }
    drawRich(ctx, '{dim:minuti}', XS(2), AY + 82, { size: 32 });
    ctx.restore();
  }
  // un valore qualunque fra 0 e 4
  const kp = life(t, 8.8, 12.6, .4, .4);
  if (kp > 0) {
    const x = kf(t, [[9.2, .4], [10.6, 3.3], [11.9, 1.73]]);
    ctx.save(); ctx.globalAlpha *= kp;
    ctx.fillStyle = css(C.x); ctx.beginPath(); ctx.arc(XS(x), AY, 11, 0, Math.PI * 2); ctx.fill();
    drawRich(ctx, `{mink:X = }{mx:${fmtN(x, 2)}}`, XS(x), AY - 48, { size: 44 });
    ctx.restore();
  }
  ctx.restore();
}

// il riquadro (13–FINE): prima le classi, poi gli integrali
const PX = PAN[0] + PAN[2] / 2, LX = 1245, RX = 1770;
function scenePannello(ctx, t) {
  const al = life(t, 13.0, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  // A · le classi
  const ka = 1 - P(t, 35.0, 35.5);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka;
    conFont(TITOLI, () => drawRich(ctx, 'l’istogramma', PX, 168, { size: 38, weight: 600, local: t - 13.2 }));
    let s = 0; PASSI.forEach(([a, b]) => { if (t >= (a + b) / 2) s++; });
    drawRich(ctx, '{dim:classi}', LX, 270, { size: 40, align: 'left' });
    fixedNum(ctx, String(4 * Math.pow(2, s)), RX, 270, 44, C.x);
    drawRich(ctx, '{dim:ampiezza}', LX, 340, { size: 40, align: 'left' });
    fixedNum(ctx, AMPIEZZE[s], RX - 82, 340, 44, C.x);
    drawRich(ctx, '{dim:min}', RX, 340, { size: 40, align: 'right' });
    drawRich(ctx, '{v:area}{ink: = probabilità}', PX, 460, { size: 44, local: t - 17.9 });
    drawRich(ctx, FDEF, PX, 580, { size: 42, local: t - 31.2 });
    ctx.restore();
  }
  // B · fra 1 e 2, tutta l'area, un punto solo
  if (t > 35.6) {
    drawRich(ctx, FDEF, PX, 158, { size: 42, local: t - 35.9 });
    rigaInt(ctx, '{mink:P(1 ≤ X ≤ 2) = }', '{mink:1}', '{mink:2}', '', PX, 248, 44, t - 41.3, t - 36.2);
    drawRich(ctx, '{mink:= 11/32 ≈ }{mg:0,34}', PX, 340, { size: 46, local: t - 41.8 });
    rigaInt(ctx, '', '{mink:0}', '{mink:4}', '{mink: = }{mg:1}', PX, 438, 48, t - 50.5);
    const ks = P(t, 60.1, 60.5);
    if (ks > 0) {
      ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 506); ctx.lineTo(PAN[0] + PAN[2] - 40, 506); ctx.stroke();
      drawRich(ctx, '{dim:intervallo}', LX, 534, { size: 30, align: 'left' });
      drawRich(ctx, '{dim:area}', RX, 534, { size: 30, align: 'right' });
      ctx.restore();
    }
    [['[1,5; 2,5]', '0,367', 60.4, 582], ['[1,9; 2,1]', '0,075', 62.5, 630], ['[1,99; 2,01]', '0,0075', 63.7, 678]].forEach(([i, a, t0, y]) => {
      const k = P(t, t0, t0 + .4); if (k <= 0) return;
      drawRich(ctx, `{mink:${i}}`, LX, y, { size: 42, align: 'left', alpha: k });
      drawRich(ctx, `{mink:≈ }{mv:${a}}`, RX, y, { size: 42, align: 'right', alpha: k });
    });
    drawRich(ctx, '{mink:P(X = 2) = }{mr:0}', PX, 744, { size: 44, local: t - 65.5 });
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Per una variabile continua\nla probabilità è un’{g:area}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[440, '{dim:fra 1 e 2}', 320], [1030, '{dim:l’area totale}', 240], [1550, '{dim:un punto solo}', 240]];
  pills.forEach(([x, testa, mw], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - mw, 445, 2 * mw, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) rigaInt(ctx, '{mink:P(1 ≤ X ≤ 2) = }', '{mink:1}', '{mink:2}', '', x, 572, 42, 99);
    if (i === 1) rigaInt(ctx, '', '{mink:0}', '{mink:4}', '{mink: = }{mg:1}', x, 572, 42, 99);
    if (i === 2) drawRich(ctx, '{mink:P(X = 2) = }{mr:0}', x, 572, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.4],                                            // l'asse dei minuti
    ['pop', 9.0, .3], ['tono', 9.2, 10.6, [.1, .85]], ['tono', 10.6, 11.9, [.85, .45]],  // un valore qualunque
    ['soffio', 13.0], ['tono', 13.0, 14.35, [.4, .9, .9, .4]],                          // le quattro barre
    ['pop', 17.9, .4], ['pop', 18.3, .7],                                               // le aree
    ['tono', 22.6, 23.6, [.4, .55]],                                                    // classi di mezzo minuto
    ['tono', 27.4, 28.0, [.45, .6]], ['tono', 28.6, 29.2, [.5, .7]], ['tono', 29.8, 30.4, [.55, .8]],   // sempre più sottili
    ['traccia', 31.4, 32.6], ['tono', 31.4, 32.6, [.1, .6, .85, .6, .1]], ['ding', 32.8],   // la curva, f(x)
    ['soffio', 35.6], ['traccia', 36.0, 36.6], ['pop', 36.4, .5],                       // l'area fra 1 e 2
    ['pop', 41.4, .6], ['ding', 41.9],                                                  // l'integrale ≈ 0,34
    ['traccia', 45.9, 46.4],                                                            // la barra di prima
    ['soffio', 50.5], ['ding', 51.0],                                                   // area totale 1
    ['soffio', 60.1], ['pop', 60.5, .8],                                                // l'intervallo intorno a 2
    ['tono', 61.4, 62.4, [.8, .5]], ['pop', 62.6, .5],
    ['tono', 62.8, 63.6, [.5, .25]], ['pop', 63.8, .25],
    ['tono', 64.9, 65.5, [.25, .05]], ['pop', 65.6, .1],                                // P(X = 2) = 0
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quando le barre diventano area', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 35.6, 'classi sempre più sottili'], [35.6, FINE, 'la probabilità è un’area']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});

