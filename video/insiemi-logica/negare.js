'use strict';
/* Come si nega «tutti» — «tutti i gatti sono neri»: con un gatto bianco «nessun gatto è nero» è falsa insieme a lei,
   quindi non è la negazione; la negazione è «almeno un gatto non è nero» (basta un controesempio);
   in simboli ∀ diventa ∃ e «è nero» diventa «non è nero». Argomento: insiemi-logica. */
CVIDEO.registra('insiemi-logica/negare', M => {
  const { W, C, E, P, life, kf, css, mix, rgb, TITOLI, conFont, drawRich, richW, txt, card, arrowHead } = M;

const FINE = 86.6, DUR = 98.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [13.2, 'felice'], [15.3, 'neutro'], [26.0, 'sorpreso'], [28.1, 'neutro'],
  [34.6, 'sorpreso'], [36.7, 'neutro'], [39.4, 'pensa'], [41.5, 'neutro'],
  [48.8, 'festa'], [51.0, 'neutro'], [62.6, 'felice'], [64.7, 'neutro'],
  [81.4, 'felice'], [83.5, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.5, '«Tutti i gatti sono neri.»\nCome si scrive la sua negazione?'],
  // 1 · la frase
  [7.9, 11.9, 'Ecco i gatti di un cortile:\nsono tutti neri.'],
  [12.1, 16.1, 'La frase «tutti i gatti sono neri»\nqui è {g:vera}.'],
  [16.3, 21.3, 'La sua {v:negazione} è vera quando\nlei è falsa, e falsa quando è vera.'],
  // 2 · la trappola
  [21.5, 25.5, 'Molti dicono:\n«{r:nessun} gatto è nero».'],
  [25.7, 29.9, 'Cambio cortile: qui un gatto\nè {v:bianco}.'],
  [30.1, 34.1, '«Tutti i gatti sono neri»\nora è {r:falsa}.'],
  [34.3, 38.9, 'Ma anche «nessun gatto è nero»\nè {r:falsa}: ci sono gatti neri!'],
  [39.1, 43.5, 'Tutte e due false: «nessuno»\n{r:non} è la negazione.'],
  // 3 · almeno uno
  [43.9, 48.3, 'La negazione giusta:\n«{g:almeno un} gatto non è nero».'],
  [48.5, 52.9, 'Con il gatto bianco è {g:vera},\nproprio quando «tutti» è falsa.'],
  [53.1, 57.3, 'Se il gatto torna nero,\n«tutti» è di nuovo {g:vera}…'],
  [57.5, 61.5, '…e «almeno un gatto non è nero»\nè {r:falsa}.'],
  [61.7, 66.3, 'Di nuovo bianco: per smentire «tutti»\nbasta {g:un solo} {v:controesempio}.'],
  // 4 · per ogni, esiste
  [66.7, 71.3, 'In simboli, {mv:∀} si legge «per ogni»\ne {mv:∃} si legge «esiste».'],
  [71.5, 76.3, '«Tutti i gatti sono neri» diventa:\nper ogni gatto, il gatto è nero.'],
  [76.5, 80.9, 'La negazione: {g:esiste} un gatto\nche {r:non} è nero.'],
  [81.1, 85.9, 'Negando, «per ogni» diventa «esiste»\ne «è nero» diventa «non è nero».'],
  // chiusura
  [88.8, 95.4, 'La negazione di «tutti sono…»\nè «almeno uno non è…».'],
];

// ---------- i gatti ----------
// «nero» e «bianco» veri in tutti e due i temi: il più scuro e il più chiaro fra i colori del tema
const lum = c => { const [r, g, b] = rgb(c); return .3 * r + .59 * g + .11 * b; };
function toni() {
  const chiaro = lum(C.ink) < lum(C.paper);
  return { nero: chiaro ? C.ink : C.bg, bianco: chiaro ? C.paper : C.ink };
}
function gatto(ctx, x, y, kBianco, s, al = 1) {
  if (s <= 0.01 || al <= 0) return;
  const { nero, bianco } = toni();
  const corpo = css(mix(nero, bianco, kBianco)), bordo = css(C.ink);
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // la coda
  ctx.beginPath(); ctx.moveTo(30, 70); ctx.quadraticCurveTo(110, 70, 82, -6);
  ctx.strokeStyle = bordo; ctx.lineWidth = 17; ctx.stroke();
  ctx.strokeStyle = corpo; ctx.lineWidth = 9; ctx.stroke();
  // il corpo
  ctx.beginPath(); ctx.ellipse(0, 35, 48, 52, 0, 0, 2 * Math.PI);
  ctx.fillStyle = corpo; ctx.fill(); ctx.strokeStyle = bordo; ctx.lineWidth = 4; ctx.stroke();
  // le orecchie e la testa
  for (const d of [-1, 1]) {
    ctx.beginPath(); ctx.moveTo(d * 37, -48); ctx.lineTo(d * 30, -90); ctx.lineTo(d * 6, -68); ctx.closePath();
    ctx.fillStyle = corpo; ctx.fill(); ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(0, -32, 40, 0, 2 * Math.PI); ctx.fillStyle = corpo; ctx.fill(); ctx.stroke();
  // gli occhi
  ctx.fillStyle = css(C.y);
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 15, -36, 6.5, 9.5, 0, 0, 2 * Math.PI); ctx.fill(); }
  ctx.restore();
}
const GX = i => 380 + i * 232, GY = 262, BIANCO = 3;
// il quarto gatto: bianco (25,9), di nuovo nero (53,3), di nuovo bianco (61,9)
const kB = t => kf(t, [[25.9, 0], [26.5, 1], [53.3, 1], [53.9, 0], [61.9, 0], [62.5, 1]]);
function sceneGatti(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 130, 110, 1660, 315, P(t, 7.5, 8.2));
  const ga = 1 - P(t, 66.8, 67.4);   // i gatti lasciano il posto ai simboli
  for (let i = 0; i < 6; i++) {
    const k = P(t, 8.2 + .2 * i, 8.7 + .2 * i, E.back);
    gatto(ctx, GX(i), GY, i === BIANCO ? kB(t) : 0, k, ga);
  }
  // il controesempio
  const kc = P(t, 62.6, 63.3) * ga;
  if (kc > 0) {
    ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.setLineDash([14, 10]);
    ctx.beginPath(); ctx.arc(GX(BIANCO), GY - 4, 104, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{v:controesempio}', GX(BIANCO), GY + 133, { size: 32, weight: 600, alpha: kc });
  }
  // la legenda dei simboli
  const kl = P(t, 67.2, 67.8);
  if (kl > 0) {
    simbolo(ctx, '∀', '{dim:si legge «per ogni»}', 560, GY, 52, { alpha: kl, align: 'center' });
    simbolo(ctx, '∃', '{dim:si legge «esiste»}', 1340, GY, 52, { alpha: P(t, 68.4, 69.0), align: 'center' });
  }
  ctx.restore();
}

// ---------- le due frasi ----------
const R1 = 540, R2 = 722, XS = 190, XV = 1730, XSIM = 1120;
const S1 = '«Tutti i gatti sono neri»', S2A = '«{r:Nessun} gatto è nero»', S2B = '«{g:Almeno un} gatto non è nero»';
// i verdetti nel tempo: [istante, 'vera' | 'falsa' | null]
// quando il gatto cambia colore i verdetti vecchi spariscono, e tornano quando Ada li dice
const V1 = [[13.0, 'vera'], [25.9, null], [30.3, 'falsa'], [53.3, null], [54.4, 'vera'], [62.5, 'falsa'], [66.8, null]];
const V2 = [[34.5, 'falsa'], [43.9, null], [48.7, 'vera'], [53.3, null], [57.7, 'falsa'], [62.5, 'vera'], [66.8, null]];
function verdetto(ctx, keys, y, t) {
  let prima = null, ora = null, t0 = -1;
  for (const [tk, v] of keys) if (t >= tk) { prima = ora; ora = v; t0 = tk; }
  const k = P(t, t0, t0 + .4);
  const scrivi = (v, a) => { if (v && a > 0) txt(ctx, v, XV, y, { size: 46, weight: 600, color: v === 'vera' ? C.g : C.r, align: 'right', alpha: a }); };
  scrivi(prima, 1 - k); scrivi(ora, k);
}
function sceneFrasi(ctx, t) {
  if (t < 12 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  // la frase
  const k1 = P(t, 12.2, 12.7);
  if (k1 > 0) {
    card(ctx, 130, 445, 1660, 160, k1);
    ctx.save(); ctx.globalAlpha *= k1;
    txt(ctx, 'la frase', XS, R1 - 58, { size: 30, color: C.dim, align: 'left' });
    drawRich(ctx, S1, XS, R1 + 8, { size: 50, align: 'left', local: t - 12.3 });
    verdetto(ctx, V1, R1 + 8, t);
    ctx.restore();
  }
  // la negazione
  const k2 = P(t, 16.5, 17.0);
  if (k2 > 0) {
    card(ctx, 130, 625, 1660, 165, k2);
    ctx.save(); ctx.globalAlpha *= k2;
    txt(ctx, 'la negazione', XS, R2 - 58, { size: 30, color: C.v, align: 'left' });
    txt(ctx, '?', XS + 20, R2 + 8, { size: 60, weight: 600, color: C.v, align: 'left', alpha: 1 - P(t, 21.5, 21.8) });
    const ka = P(t, 21.7, 22.0) * (1 - P(t, 43.9, 44.3));
    if (ka > 0) {
      drawRich(ctx, S2A, XS, R2 + 8, { size: 50, align: 'left', local: t - 21.8, alpha: ka });
      // barrata quando Ada dice che non è la negazione
      const kx = P(t, 39.3, 40.0);
      if (kx > 0) {
        const w = richW(ctx, S2A, 50);
        ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.r); ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(XS - 10, R2 + 10); ctx.lineTo(XS - 10 + (w + 20) * kx, R2 + 10); ctx.stroke(); ctx.restore();
      }
    }
    if (t > 44.1) drawRich(ctx, S2B, XS, R2 + 8, { size: 50, align: 'left', local: t - 44.1 });
    verdetto(ctx, V2, R2 + 8, t);
    ctx.restore();
  }
  // 4 · in simboli
  if (t > 71.6) {
    const w0 = simbolo(ctx, '∀', 'gatto, è nero', XSIM, R1 + 8, 50, { local: t - 71.7 });
    simbolo(ctx, '∃', 'gatto, {r:non} è nero', XSIM, R2 + 8, 50, { local: t - 76.7 });
    // le due frecce dello scambio: sul simbolo e su «è nero»
    freccia(ctx, XSIM + w0 / 2, P(t, 81.3, 81.9));
    freccia(ctx, XSIM + w0 + richW(ctx, 'gatto, ', 50) + richW(ctx, 'è nero', 50) / 2, P(t, 83.2, 83.8));
  }
  ctx.restore();
}
// un quantificatore (∀, ∃) più grande del testo che lo segue: il segno di KaTeX è sottile; restituisce la larghezza del segno
function simbolo(ctx, sym, resto, x, y, size, o = {}) {
  const al = o.alpha == null ? 1 : o.alpha, sz = Math.round(size * 1.3);
  const ws = richW(ctx, '{mv:' + sym + '}', sz), gap = size * .35, wr = richW(ctx, resto, size);
  const x0 = o.align === 'center' ? x - (ws + gap + wr) / 2 : x;
  const loc = o.local == null ? 99 : o.local;
  drawRich(ctx, '{mv:' + sym + '}', x0, y, { size: sz, align: 'left', alpha: al, local: loc });
  drawRich(ctx, resto, x0 + ws + gap, y, { size, align: 'left', alpha: al, local: loc - .1 });
  return ws;
}
function freccia(ctx, x, k) {
  if (k <= 0) return;
  const y0 = R1 + 54, y1 = R2 - 34, y = y0 + (y1 - y0) * k;
  ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y - 8); ctx.stroke(); ctx.restore();
  arrowHead(ctx, [x, y], Math.PI / 2, C.v);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Come si nega «tutti»', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 5 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Per negare «tutti» basta dire\nche {g:almeno uno} non lo è.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [490, '{dim:non è}', '«{r:nessuno}»'],
    [960, '{dim:negando}', '{mv:∀}{ink: diventa }{mv:∃}'],
    [1430, '{dim:per smentire «tutti»}', '{v:un controesempio}'],
  ];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 32 });
    drawRich(ctx, corpo, x, 546, { size: 44, weight: 600 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5],
    ['pop', 8.2, .4], ['pop', 8.4, .45], ['pop', 8.6, .5], ['pop', 8.8, .55], ['pop', 9.0, .6], ['pop', 9.2, .65],   // i sei gatti
    ['soffio', 12.2], ['ding', 13.0],                                                  // la frase, vera
    ['soffio', 16.5],                                                                  // la negazione: ?
    ['pop', 21.8, .4],                                                                 // «nessun gatto è nero»
    ['tono', 25.9, 26.5, [.3, .8]],                                                    // il gatto diventa bianco
    ['pop', 30.3, .25], ['pop', 34.5, .25],                                            // falsa, falsa
    ['traccia', 39.3, 40.0],                                                           // «nessuno» barrata
    ['pop', 44.1, .6],                                                                 // «almeno un gatto non è nero»
    ['tono', 53.3, 53.9, [.8, .3]], ['ding', 54.4], ['pop', 57.7, .25],                // torna nero: vera, falsa
    ['tono', 61.9, 62.5, [.3, .8]], ['traccia', 62.6, 63.3],                           // di nuovo bianco: il controesempio
    ['soffio', 66.8], ['pop', 67.2, .5], ['pop', 68.4, .6],                            // ∀ ed ∃
    ['pop', 71.7, .5], ['pop', 76.7, .6],                                              // le due frasi in simboli
    ['traccia', 81.3, 81.9], ['traccia', 83.2, 83.8],                                  // lo scambio
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Come si nega «tutti»', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 21.4, 'la frase'], [21.4, 43.7, 'la trappola'], [43.7, 66.5, 'almeno uno'], [66.5, FINE, '«per ogni» ed «esiste»']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGatti(ctx, t); sceneFrasi(ctx, t); sceneFine(ctx, t); },
  };
});
