'use strict';
/* La moneta favorisce la testa? — 100 lanci, 60 teste; test a una coda (si guardano solo le «troppe teste»). Ipotesi: moneta onesta, p = 0,5; X = numero di teste ha la
   distribuzione binomiale (barre esatte, n = 100). Le barre di 60 o più teste sommano P(X ≥ 60) ≈ 0,028, il 2,8%:
   sotto la soglia del 5%, l'ipotesi si rifiuta al livello del 5% (il 2,8% è calcolato supponendo la moneta onesta:
   non è la probabilità che favorisca la testa). Con 55 teste P(X ≥ 55) ≈ 18,4%: l'ipotesi resta.
   Argomento: statistica-inferenziale. */
CVIDEO.registra('statistica-inferenziale/test', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, fmtN, card, arrowHead } = M;

const FINE = 88.0, DUR = 100.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [18.8, 'pensa'],
  [21.0, 'neutro'], [25.0, 'felice'], [27.2, 'neutro'], [32.8, 'pensa'], [35.0, 'neutro'], [41.6, 'sorpreso'],
  [44.0, 'neutro'], [51.8, 'pensa'], [54.0, 'neutro'], [57.6, 'felice'], [59.8, 'neutro'], [73.6, 'pensa'],
  [76.4, 'neutro'], [84.8, 'felice'], [86.8, 'neutro'],
  [FINE + 1.0, 'felice'], [94.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.2, 6.4, 'Prima di lanciare: la moneta\nfavorisce la {r:testa}?'],
  // 1 · l'ipotesi
  [8.0, 13.6, 'Si parte da un’{v:ipotesi}: la moneta\nè onesta, {mink:p = 0,5}.'],
  [13.8, 18.6, 'Lancio 100 volte: {mink:X} è\nil numero di teste.'],
  [18.8, 24.6, 'Se è onesta, quanto è probabile\nogni {mink:X}? Lo dice la {v:binomiale}.'],
  [24.8, 29.0, 'Le barre fanno una campana\ncentrata su {g:50}.'],
  // 2 · sessanta teste
  [29.2, 32.6, 'Noi abbiamo visto {r:60} teste.'],
  [32.8, 38.0, 'Se è onesta, quanto è probabile\nfare {r:60 o più} teste?'],
  [38.2, 41.2, 'Sommo le barre della coda…'],
  [41.4, 47.4, '…{mink:P(X ≥ 60)} è circa il {r:2,8%}.'],
  // 3 · la decisione
  [47.6, 51.4, 'Si fissa prima una soglia:\nil {v:5%}.'],
  [51.6, 57.2, 'Il 2,8% è sotto il 5%:\nè difficile crederla {r:onesta}.'],
  [57.4, 61.6, 'Si {r:rifiuta} l’ipotesi\nal livello del 5%.'],
  [61.8, 68.0, 'Attenzione: il 2,8% è calcolato\n{v:supponendo} la moneta onesta.'],
  [68.2, 73.4, 'Non dice che favorisce la testa\ncon probabilità 97%.'],
  // 4 · e con 55 teste?
  [73.6, 76.2, 'E con {g:55} teste?'],
  [76.4, 84.4, '{mink:P(X ≥ 55)} è circa il {g:18,4%}:\nsopra il 5%.'],
  [84.6, 87.6, 'Niente di strano:\nl’ipotesi {g:resta}.'],
  // chiusura
  [88.8, 97.0, 'Se, con l’ipotesi vera, il risultato è più\nraro della {v:soglia}, l’ipotesi si {r:rifiuta}.'],
];

// ---- la binomiale con n = 100 e p = 0,5 ----
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
const PK = []; for (let k = 0; k <= 100; k++) PK.push(binom(100, k) / Math.pow(2, 100));
const coda = k0 => { let s = 0; for (let k = k0; k <= 100; k++) s += PK[k]; return s; };   // P(X ≥ k0)
const CARD = [110, 110, 1060, 690], PAN = [1200, 110, 610, 690];
const XK = k => 182 + (k - 30) * 23, AY = 680, HS = 5600, BW = 19;
function rett(ctx, k, riempi, bordo, lw) {
  const h = PK[k] * HS;
  ctx.fillStyle = riempi; ctx.fillRect(XK(k) - BW / 2, AY - h, BW, h);
  ctx.strokeStyle = bordo; ctx.lineWidth = lw; ctx.strokeRect(XK(k) - BW / 2, AY - h, BW, h);
}
// la soglia: una scala dallo 0 al 20%
const GX = v => 1260 + v * 2450, GY = 530;

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La moneta favorisce la testa?', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–4 · le barre, la coda, la soglia (7.5–FINE)
const SOMMA0 = 38.4, PASSO = .2;   // le barre della coda si sommano una dopo l'altra, da 60 a 70
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // l'asse delle X
  const ka = P(t, 14.0, 14.6);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(XK(28.6), AY); ctx.lineTo(XK(71.6), AY); ctx.stroke();
    arrowHead(ctx, [XK(71.6) + 6, AY], 0, C.ink);
    ctx.lineWidth = 2;
    for (let k = 30; k <= 70; k += 10) {
      ctx.beginPath(); ctx.moveTo(XK(k), AY); ctx.lineTo(XK(k), AY + 10); ctx.stroke();
      drawRich(ctx, `{mink:${k}}`, XK(k), AY + 40, { size: 32 });
    }
    drawRich(ctx, '{mink:X}', XK(71.6) + 4, AY - 38, { size: 40 });
    ctx.restore();
  }
  // le barre: la coda si colora di rosso (60 o più), poi di verde (55 o più)
  const kr = P(t, 35.0, 35.6) * (1 - P(t, 74.0, 74.6)), kg = P(t, 74.0, 74.6);
  for (let k = 30; k <= 70; k++) {
    const kb = P(t, 19.8 + (k - 30) * .04, 20.3 + (k - 30) * .04, E.out); if (kb <= 0) continue;
    ctx.save(); ctx.globalAlpha *= kb;
    rett(ctx, k, css(C.y, .22), css(C.y, .9), 2);
    if (k >= 60 && kr > 0) {
      // durante la somma ogni barra si accende quando entra nel conto
      const acc = P(t, SOMMA0 + (k - 60) * PASSO, SOMMA0 + (k - 60) * PASSO + .15);
      ctx.globalAlpha *= kr; rett(ctx, k, css(C.r, .3 + .35 * acc), css(C.r), 2.5);
    }
    if (k >= 55 && kg > 0) { ctx.globalAlpha *= kg; rett(ctx, k, css(C.g, .4), css(C.g), 2.5); }
    ctx.restore();
  }
  // chi ha fatto le barre: la moneta onesta
  const ke = P(t, 20.0, 20.4);
  if (ke > 0) {
    const s = '{dim:se la moneta è onesta:} {mink:p = 0,5}', w = richW(ctx, s, 32), su = life(t, 61.9, 68.0, .4, .4);
    if (su > 0) {
      ctx.save(); ctx.globalAlpha *= su; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.fillStyle = css(C.v, .08);
      ctx.beginPath(); ctx.roundRect(146, 136, w + 28, 50, 12); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, s, 160, 161, { size: 32, align: 'left', alpha: ke });
  }
  // la media 50
  const km = life(t, 25.0, 29.2, .4, .4);
  if (km > 0) {
    ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = css(C.g, .9); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.moveTo(XK(50), AY - 4); ctx.lineTo(XK(50), 196); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{g:50}', XK(50) + 14, 210, { size: 40, align: 'left', alpha: km });
  }
  // 60 teste: la freccia, poi «60 o più» con la graffa sulla coda
  const k60 = life(t, 29.4, 35.2, .4, .3);
  if (k60 > 0) {
    ctx.save(); ctx.globalAlpha *= k60; ctx.strokeStyle = css(C.r); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(XK(60), 540); ctx.lineTo(XK(60), 596); ctx.stroke();
    arrowHead(ctx, [XK(60), 604], Math.PI / 2, C.r, .8);
    drawRich(ctx, '{r:60 teste}', XK(60) - 8, 510, { size: 40, align: 'left' });
    ctx.restore();
  }
  const graffa = (k0, col, testo, a, ytesto) => {
    if (a <= 0) return;
    const x0 = XK(k0) - BW / 2, x1 = XK(70) + BW / 2, y = AY - PK[k0] * HS - 18;
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y + 10); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y + 10); ctx.stroke(); ctx.restore();
    drawRich(ctx, testo, (x0 + x1) / 2, ytesto, { size: 40, alpha: a });
  };
  graffa(60, C.r, '{r:60 o più}', life(t, 35.0, 74.2, .4, .4), 540);
  // il test guarda solo da una parte: le teste in più
  drawRich(ctx, '{dim:si guarda solo il caso «}{r:troppe teste}{dim:»}', 1140, 205, { size: 30, align: 'right', alpha: life(t, 35.0, FINE, .4, .3) });
  drawRich(ctx, '{mink:≈ }{r:2,8%}', (XK(60) + XK(70)) / 2, 480, { size: 44, alpha: life(t, 43.6, 74.2, .4, .4) });
  const kd = P(t, 74.4, 74.9);
  if (kd > 0) {
    // 55 o più: la graffa sta sopra le barre più alte della coda
    const x0 = XK(55) - BW / 2, x1 = XK(70) + BW / 2, y = AY - PK[55] * HS - 18;
    ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y + 10); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y + 10); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{g:55 o più}', (x0 + x1) / 2, y - 34, { size: 40, alpha: kd });
    drawRich(ctx, '{mink:≈ }{g:18,4%}', (x0 + x1) / 2, y - 94, { size: 44, alpha: P(t, 78.4, 78.8) });
  }
  ctx.restore();
}

// il riquadro: l'ipotesi, la somma della coda, la soglia, il verdetto (8.2–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1250, RX = 1765;
function scenePannello(ctx, t) {
  const al = life(t, 8.2, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const riga = (nome, val, y, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    drawRich(ctx, nome, LX, y, { size: 44, align: 'left' });
    drawRich(ctx, val, RX, y, { size: 44, align: 'right' });
    ctx.restore();
  };
  const linea = (y, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
  };
  const barrato = (x0, x1, y, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = css(C.r, .8); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, P(a, 0, 1)), y); ctx.stroke(); ctx.restore();
  };
  conFont(TITOLI, () => drawRich(ctx, 'ipotesi', PX, 168, { size: 38, weight: 600, local: t - 8.2 }));
  riga('{dim:moneta onesta:}', '{mink:p = 0,5}', 240, P(t, 8.4, 8.8));
  // l'ipotesi non si barra: le frasi che seguono il verdetto ragionano ancora «supponendo la moneta onesta»
  riga('{mink:X =}', '{dim:teste su 100 lanci}', 310, P(t, 14.0, 14.4));
  // la somma delle barre della coda: il numero arriva quando Ada lo dice
  linea(370, P(t, 43.4, 43.8));
  riga('{mink:P(X ≥ 60) ≈}', `{r:${fmtN(Math.round(coda(60) * 1000) / 10, 1)}%}`, 425, P(t, 43.6, 44.0));
  // la soglia del 5%
  const kg = P(t, 47.8, 48.3);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg; ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(GX(0), GY); ctx.lineTo(GX(.2), GY); ctx.stroke();
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      const x = GX(i * .05);
      ctx.beginPath(); ctx.moveTo(x, GY - 8); ctx.lineTo(x, GY + 8); ctx.stroke();
      drawRich(ctx, `{dim:${i * 5}%}`, x, GY + 38, { size: 30 });
    }
    ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(GX(.05), GY - 24); ctx.lineTo(GX(.05), GY + 10); ctx.stroke();
    drawRich(ctx, '{v:soglia}', GX(.05), GY - 50, { size: 32 });
    ctx.restore();
  }
  const pallino = (v, col, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = css(col); ctx.beginPath(); ctx.arc(GX(v), GY, 11, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  };
  pallino(coda(60), C.r, P(t, 51.8, 52.2, E.back));
  pallino(coda(55), C.g, P(t, 78.6, 79.0, E.back));
  // il verdetto
  drawRich(ctx, '{r:si rifiuta l’ipotesi}', PX, 636, { size: 40, alpha: life(t, 57.6, 74.2, .4, .4) });
  drawRich(ctx, '{g:l’ipotesi resta}', PX, 636, { size: 40, alpha: P(t, 85.0, 85.4) });
  // che cosa non vuol dire
  const kn = life(t, 68.4, 73.6, .4, .4);
  if (kn > 0) {
    const s = '{dim:«favorisce la testa al 97%»}', w = richW(ctx, s, 36);
    drawRich(ctx, s, PX, 712, { size: 36, alpha: kn });
    barrato(PX - w / 2 - 8, PX + w / 2 + 8, 714, kn);
  }
  riga('{mink:P(X ≥ 55) ≈}', '{g:18,4%}', 712, P(t, 78.4, 78.8));
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Se, con l’ipotesi vera, il risultato è più raro\ndella {v:soglia}, l’ipotesi si {r:rifiuta}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[440, '{dim:l’ipotesi}', 240], [960, '{dim:60 teste o più}', 250], [1480, '{dim:sotto la soglia del 5%}', 240]];
  pills.forEach(([x, testa, mw], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 552); ctx.scale(k, k); ctx.translate(-x, -552);
    card(ctx, x - mw, 445, 2 * mw, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, 'moneta onesta,\n{mink:p = 0,5}', x, 580, { size: 40, lh: 1.25 });
    if (i === 1) drawRich(ctx, '{mink:P(X ≥ 60) ≈ }{r:2,8%}', x, 572, { size: 44 });
    if (i === 2) drawRich(ctx, 'l’ipotesi si {r:rifiuta}', x, 572, { size: 42 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.5, .5],                                                 // l'ipotesi p = 0,5
    ['traccia', 14.0, 14.6], ['pop', 14.1, .4],                                        // l'asse delle X
    ['tono', 19.8, 21.9, [.05, .2, .6, .95, .6, .2, .05]],                             // le barre: una campana
    ['traccia', 25.0, 25.4], ['pop', 25.2, .6],                                        // la media 50
    ['tono', 29.4, 29.9, [.7, .4]], ['pop', 29.9, .45],                                // la freccia su 60
    ['traccia', 35.0, 35.6], ['pop', 35.3, .3],                                        // 60 o più: la coda
    ['tono', 38.4, 40.6, [.1, .3, .45, .55, .62, .66, .68]],                           // le barre della coda si accendono
    ['ding', 43.7],                                                                    // ≈ 2,8%
    ['soffio', 47.8], ['traccia', 47.8, 48.3], ['pop', 48.1, .6],                      // la soglia del 5%
    ['pop', 51.9, .25],                                                                // 2,8% sotto la soglia
    ['pop', 62.0, .55],                                                                // supponendo la moneta onesta
    ['pop', 68.5, .5], ['traccia', 68.5, 69.4],                                        // non «favorisce la testa al 97%»
    ['soffio', 74.0], ['traccia', 74.4, 74.9],                                         // 55 o più
    ['pop', 78.5, .55], ['pop', 78.8, .8],                                             // 18,4%, sopra la soglia
    ['ding', 85.1],                                                                    // l'ipotesi resta
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'La moneta favorisce la testa?', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 29.2, 'l’ipotesi'], [29.2, 47.6, 'sessanta teste'], [47.6, 73.6, 'la decisione'], [73.6, FINE, 'e con 55 teste?']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
