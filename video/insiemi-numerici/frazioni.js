'use strict';
/* Perché il denominatore comune — 1/2 + 1/3 con due torte tagliate diversamente: ritagliate in sesti diventano
   3/6 + 2/6 = 5/6; la scorciatoia «sopra con sopra, sotto con sotto» dà 2/5, meno di 1/2. Argomento: insiemi-numerici. */
CVIDEO.registra('insiemi-numerici/frazioni', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, card } = M;

const FINE = 71.6, DURATA = 83.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [15.7, 'pensa'], [18.0, 'neutro'],
  [21.0, 'pensa'], [23.2, 'neutro'], [27.2, 'felice'], [29.4, 'neutro'], [35.3, 'felice'], [37.5, 'neutro'],
  [44.1, 'festa'], [46.4, 'felice'], [48.5, 'neutro'], [53.6, 'pensa'], [56.6, 'neutro'], [62.3, 'sorpreso'],
  [64.4, 'neutro'], [67.1, 'pensa'], [69.2, 'neutro'], [FINE + 1.0, 'felice'], [78.0, 'occhiolino'], [80.0, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Quanto fa {mink:1/2 + 1/3}?'],
  // 1 · due torte
  [7.9, 11.6, 'Ecco mezza torta: {mink:1/2}.'],
  [11.7, 15.6, 'E un terzo di un’altra torta: {mink:1/3}.'],
  [15.7, 20.8, 'I due pezzi hanno {r:misure diverse}:\nnon posso contarli insieme.'],
  // 2 · lo stesso taglio
  [20.9, 25.7, 'Serve un taglio in fette uguali\nche vada bene per {g:tutte e due}.'],
  [25.8, 30.3, 'Taglio la prima in 6 fette:\nmezza torta sono {mink:3} fette.'],
  [30.4, 35.0, 'Taglio la seconda in 6:\nun terzo sono {mink:2} fette.'],
  [35.1, 39.4, 'Ora le fette sono {g:tutte uguali}:\nsono {v:sesti}.'],
  [39.5, 43.9, 'Le metto insieme:\n3 sesti più 2 sesti…'],
  [44.0, 47.9, '…fanno {g:5 sesti}: {mink:5/6}.'],
  [48.0, 52.9, '6 è il {v:denominatore comune}:\nil minimo comune multiplo di 2 e 3.'],
  // 3 · la scorciatoia sbagliata
  [53.5, 57.9, 'E se sommassi sopra con sopra\ne sotto con sotto?'],
  [58.0, 62.2, 'Verrebbe {mink:2/5}:\n2 fette su 5.'],
  [62.3, 66.9, 'Ma {mink:2/5} è {r:meno} di mezza torta:\nmeno della sola prima!'],
  [67.0, 71.2, 'Aggiungendo non si può calare:\n{mink:2/5} è {r:sbagliato}.'],
  // chiusura
  [73.0, 80.8, 'Prima un taglio comune,\npoi si contano le fette.'],
];
const CAPITOLI = [[7.5, 21.0, 'due torte'], [21.0, 53.2, 'lo stesso taglio'], [53.2, FINE, 'la scorciatoia sbagliata']];

// ---- torte viste dall'alto: gli angoli si contano in giri, 0 = in alto, in senso orario ----
const TAU = Math.PI * 2, A0 = -Math.PI / 2;
const ang = g => A0 + g * TAU;
const fr = (p, q, k = 'ink', kq) => ({ num: `{m${k}:${p}}`, den: `{m${kq || k}:${q}}` });
// larghezza di una riga di drawSeq, con le stesse misure del motore
function seqW(ctx, items, size) {
  const ws = items.map(it => typeof it === 'string' ? richW(ctx, it, size) : Math.max(richW(ctx, it.num, size), richW(ctx, it.den, size)) + size * .35);
  return ws.reduce((a, b) => a + b, 0) + size * .12 * (items.length - 1);
}
// il piatto: la torta vuota con i suoi tagli
function piatto(ctx, cx, cy, r, tagli, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fillStyle = css(C.ink, .04); ctx.fill();
  ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); tagli.forEach(g => { ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(ang(g)), cy + r * Math.sin(ang(g))); }); ctx.stroke();
  ctx.restore();
}
// un pezzo colorato, da g1 a g2
function pezzo(ctx, cx, cy, r, g1, g2, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, ang(g1), ang(g2)); ctx.closePath();
  ctx.fillStyle = css(col, .42); ctx.fill();
  ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.restore();
}
// il posto lasciato vuoto da un pezzo che se n'è andato
function vuoto(ctx, cx, cy, r, g1, g2, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.setLineDash([10, 9]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, ang(g1), ang(g2)); ctx.closePath();
  ctx.strokeStyle = css(col, .6); ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
}
// i tagli nuovi, viola, che crescono dal centro
function tagliViola(ctx, cx, cy, r, tagli, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); tagli.forEach(g => { ctx.moveTo(cx, cy); ctx.lineTo(cx + r * k * Math.cos(ang(g)), cy + r * k * Math.sin(ang(g))); }); ctx.stroke();
  ctx.restore();
}
// tutto quello che disegna fn, ingrandito di s intorno a (cx, cy)
function scala(ctx, cx, cy, s, fn) {
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); fn(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Perché il denominatore comune', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// una scheda sola per tutto il video
function scheda(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .2, .6, .5));
}

// 1–2 · due torte, poi lo stesso taglio (7.5–53.6)
const CY = 395, R = 150, XA = 400, XB = 1000, XR = 1600, YL = 640, XP = 700, XU = 1300;
const SESTI = [0, 1, 2, 3, 4, 5].map(i => i / 6);
function sceneTorte(ctx, t) {
  if (t < 7.5 || t > 53.8) return;
  const al = 1 - P(t, 53.0, 53.6);
  ctx.save(); ctx.globalAlpha *= al;
  const pul = a => 1 + .07 * Math.sin(Math.PI * P(t, a, a + .9, E.lin));
  const tutte = pul(35.3);                                   // «ora le fette sono tutte uguali»
  const kA = P(t, 8.0, 8.6, E.back), kB = P(t, 11.8, 12.4, E.back), kR = P(t, 39.6, 40.1, E.back);
  const cA = P(t, 25.9, 26.9), cB = P(t, 30.5, 31.5);       // i tagli in sesti
  const vA = P(t, 40.3, 42.0, E.io), vB = P(t, 40.9, 42.6, E.io);   // i pezzi che vanno sul terzo piatto
  // i piatti, con i tagli nuovi
  if (kA > 0) scala(ctx, XA, CY, kA * tutte, () => {
    piatto(ctx, XA, CY, R, [0, .5], 1); tagliViola(ctx, XA, CY, R, [1 / 6, 2 / 6, 4 / 6, 5 / 6], cA);
    vuoto(ctx, XA, CY, R, 0, .5, C.x, P(vA, 0, .2));
  });
  if (kB > 0) scala(ctx, XB, CY, kB * tutte, () => {
    piatto(ctx, XB, CY, R, [0, 1 / 3, 2 / 3], 1); tagliViola(ctx, XB, CY, R, [1 / 6, 3 / 6, 5 / 6], cB);
    vuoto(ctx, XB, CY, R, 0, 1 / 3, C.y, P(vB, 0, .2));
  });
  if (kR > 0) scala(ctx, XR, CY, kR, () => piatto(ctx, XR, CY, R, SESTI, 1));
  drawRich(ctx, '{r:misure}\n{r:diverse}', XP, CY + 125, { size: 32, alpha: life(t, 15.9, 21.0, .4, .4) });
  // il pezzo della prima torta: pulsa, poi vola sul terzo piatto
  if (kA > 0) {
    const x = lerp(XA, XR, vA), y = CY - 60 * Math.sin(Math.PI * vA);
    scala(ctx, x, y, (vA > 0 ? 1 : kA * tutte) * pul(15.9), () => {
      pezzo(ctx, x, y, R, 0, .5, C.x, P(t, 8.6, 9.1));
      tagliViola(ctx, x, y, R, [1 / 6, 2 / 6], cA);
    });
  }
  // il pezzo della seconda: vola e gira di mezzo giro, fino a 3/6–5/6
  if (kB > 0) {
    const x = lerp(XB, XR, vB), y = CY - 60 * Math.sin(Math.PI * vB), g = .5 * vB;
    scala(ctx, x, y, (vB > 0 ? 1 : kB * tutte) * pul(16.4), () => {
      pezzo(ctx, x, y, R, g, g + 1 / 3, C.y, P(t, 12.2, 12.7));
      tagliViola(ctx, x, y, R, [g + 1 / 6], cB);
    });
  }
  // i segni fra le torte, sopra i pezzi che passano in volo
  drawRich(ctx, '{mink:+}', XP, CY, { size: 90, alpha: P(t, 11.8, 12.3) });
  drawRich(ctx, '{mink:=}', XU, CY, { size: 90, alpha: P(t, 39.6, 40.0) });
  // le frazioni sotto le torte; alla fine il 6 dei denominatori diventa viola
  const v6 = P(t, 48.1, 48.6);
  const lab = (items, x, a) => drawSeq(ctx, items, x, YL, 54, { alpha: a });
  lab([fr(1, 2)], XA, P(t, 9.0, 9.4) * (1 - P(t, 27.1, 27.4)));
  lab([fr(1, 2), '{mink:=}', fr(3, 6)], XA, P(t, 27.3, 27.7) * (1 - v6));
  lab([fr(1, 2), '{mink:=}', fr(3, 6, 'ink', 'v')], XA, v6);
  lab([fr(1, 3)], XB, P(t, 12.8, 13.2) * (1 - P(t, 31.8, 32.1)));
  lab([fr(1, 3), '{mink:=}', fr(2, 6)], XB, P(t, 32.0, 32.4) * (1 - v6));
  lab([fr(1, 3), '{mink:=}', fr(2, 6, 'ink', 'v')], XB, v6);
  lab([fr(5, 6, 'g')], XR, P(t, 44.1, 44.5) * (1 - v6));
  lab([fr(5, 6, 'g', 'v')], XR, v6);
  // la domanda, poi la risposta, in alto
  drawRich(ctx, '{dim:in quante fette uguali?}', 960, 158, { size: 38, alpha: life(t, 21.2, 26.0, .4, .3) });
  drawRich(ctx, 'in {v:6} fette uguali', 960, 158, { size: 38, alpha: life(t, 26.0, 48.1, .3, .3) });
  drawRich(ctx, '{v:6} è il {v:denominatore comune}', 960, 158, { size: 38, alpha: P(t, 48.2, 48.6) });
  ctx.restore();
}

// 3 · la scorciatoia sbagliata: sopra con sopra, sotto con sotto (53.3–FINE)
const YF = 215, YC = 470, RC = 140, X25 = 640, X12 = 1280, YL2 = 690;
function sceneScorciatoia(ctx, t) {
  if (t < 53.3 || t > FINE + .3) return;
  const al = life(t, 53.5, FINE + .2, .4, .6);
  ctx.save(); ctx.globalAlpha *= al;
  const S = 56, g = S * .12;
  // il primo uguale è quello falso: rosso da subito, barrato quando Ada dice «sbagliato»
  const A = eq => [fr(1, 2), '{mink:+}', fr(1, 3), `{mr:${eq}}`, { num: '{mv:1 + 1}', den: '{mv:2 + 3}' }];
  const B = ['{mink:=}', fr(2, 5, 'r')];
  const wA = seqW(ctx, A('='), S), wB = seqW(ctx, B, S), x0 = 960 - (wA + g + wB) / 2, xB = x0 + wA + g + wB / 2;
  const kx = P(t, 67.2, 67.6);
  drawSeq(ctx, A('='), x0 + wA / 2, YF, S, { local: t - 53.9, alpha: 1 - kx });
  drawSeq(ctx, A('≠'), x0 + wA / 2, YF, S, { alpha: kx });
  drawSeq(ctx, B, xB, YF, S, { local: t - 58.3 });
  // la torta dei 2/5 e, accanto, mezza torta
  const k25 = P(t, 58.3, 58.9, E.back), k12 = P(t, 62.5, 63.1, E.back);
  if (k25 > 0) scala(ctx, X25, YC, k25, () => { piatto(ctx, X25, YC, RC, [0, .2, .4, .6, .8], 1); pezzo(ctx, X25, YC, RC, 0, .4, C.r, 1); });
  if (k12 > 0) scala(ctx, X12, YC, k12, () => { piatto(ctx, X12, YC, RC, [0, .5], 1); pezzo(ctx, X12, YC, RC, 0, .5, C.x, 1); });
  drawSeq(ctx, [fr(2, 5, 'r')], X25, YL2, 50, { alpha: P(t, 58.6, 59.0) * (1 - P(t, 62.6, 62.9)) });
  drawSeq(ctx, [fr(2, 5, 'r'), '{mink:= 0,4}'], X25, YL2, 50, { alpha: P(t, 62.8, 63.2) });
  drawSeq(ctx, [fr(1, 2), '{mink:= 0,5}'], X12, YL2, 50, { alpha: P(t, 62.9, 63.3) });
  drawRich(ctx, '{mr:<}', 960, YC, { size: 100, alpha: P(t, 63.4, 63.8) });
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Si sommano solo fette {g:uguali}:\nprima il {v:denominatore comune}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [430, k => drawRich(ctx, 'fette della\n{g:stessa misura}', 430, 510, { size: 40, weight: 400, lh: 1.35, alpha: k })],
    [960, k => drawSeq(ctx, [fr(3, 6), '{mink:+}', fr(2, 6), '{mink:=}', fr(5, 6, 'g')], 960, 506, 42, { alpha: k })],
    [1490, k => drawRich(ctx, '{mink:2/5}: {r:meno} di {mink:1/2},\n{r:sbagliato}', 1490, 510, { size: 40, weight: 400, lh: 1.35, alpha: k })],
  ];
  pills.forEach(([x, disegna], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 240, 435, 480, 150);
    disegna(1);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): i pezzi volano in arco sul terzo piatto
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.1, .5], ['pop', 8.7, .45], ['pop', 9.1, .5],          // la prima torta, mezza, 1/2
    ['pop', 11.9, .55], ['pop', 12.3, .45], ['pop', 12.9, .4],                        // la seconda, un terzo, 1/3
    ['pop', 15.9, .6], ['pop', 16.4, .4],                                             // pezzi di misure diverse
    ['pop', 21.3, .5],                                                                // in quante fette?
    ['traccia', 25.9, 26.9], ['pop', 27.4, .5],                                       // la prima in sesti: 3/6
    ['traccia', 30.5, 31.5], ['pop', 32.1, .4],                                       // la seconda in sesti: 2/6
    ['pop', 35.4, .6],                                                                // tutte uguali
    ['pop', 39.7, .5], ['tono', 40.3, 42.0, [.45, .7, .45]], ['tono', 40.9, 42.6, [.4, .65, .4]],   // insieme
    ['ding', 44.1],                                                                   // 5/6
    ['pop', 48.2, .6],                                                                // il denominatore comune
    ['soffio', 53.5], ['pop', 53.9, .5], ['pop', 55.1, .55],                          // sopra con sopra, sotto con sotto
    ['pop', 58.3, .35], ['pop', 58.6, .3],                                            // 2/5
    ['pop', 62.6, .5], ['pop', 63.0, .45], ['pop', 63.5, .3],                         // mezza torta, 0,4 < 0,5
    ['pop', 67.3, .2],                                                                 // l’uguale diventa ≠
    ['soffio', FINE + .3], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Perché il denominatore comune', durata: DURATA, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { scheda(ctx, t); sceneIntro(ctx, t); sceneTorte(ctx, t); sceneScorciatoia(ctx, t); sceneFine(ctx, t); },
  };
});
