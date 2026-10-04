'use strict';
/* La derivata del prodotto: l'area di un rettangolo che cresce di due strisce e di un quadratino trascurabile. Argomento: derivate. */
CVIDEO.registra('derivate/prodotto', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, card, checkMark, crossMark } = M;

const FINE = 84.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [7.9, 'neutro'], [14.8, 'sorpreso'], [16.8, 'neutro'],
  [34.3, 'pensa'], [37.0, 'neutro'], [40.9, 'felice'], [43.0, 'neutro'], [51.7, 'festa'], [54.4, 'felice'],
  [57.8, 'sorpreso'], [59.8, 'pensa'], [65.2, 'felice'], [67.4, 'neutro'], [71.5, 'felice'], [73.6, 'neutro'],
  [78.1, 'sorpreso'], [80.2, 'neutro'],
  [FINE, 'neutro'], [86.2, 'felice'],
];
const FUMETTI = [
  [2.0, 6.6, 'Come si deriva un prodotto\ndi due funzioni?'],
  [7.9, 14.4, 'Il prodotto {my:f}{mv:g} è l\'area di\nun rettangolo: base {my:f}, altezza {mv:g}.'],
  [14.5, 20.1, 'Se {mx:x} avanza di {mx:h}, crescono\nsia la base sia l\'altezza.'],
  [20.2, 25.2, 'L\'area nuova è una striscia\na destra, {my:Δf }{mv:g}…'],
  [25.3, 29.7, '…una striscia in alto, {my:f }{mv:Δg}…'],
  [29.8, 34.2, '…e un quadratino d\'angolo,\n{my:Δf }{mv:Δg}.'],
  [34.3, 40.8, 'Le strisce sono lunghe come {my:f} e {mv:g};\nil quadratino è piccolo per piccolo.'],
  [40.9, 46.8, 'Divido per {mx:h} e faccio il limite:\nle strisce danno {my:f′}{mv:g} e {my:f}{mv:g′}.'],
  [46.9, 51.6, 'Il quadratino dà {my:f′ }{mv:Δg}:\ntende a {g:zero}.'],
  [51.7, 57.3, 'Ecco la regola del prodotto:\n{mink:(fg)′ = f′g + fg′}.'],
  [57.8, 64.0, 'Attenzione, non è {mr:f′g′}.\nProva con {my:f} = {mv:g} = {mx:x}.'],
  [65.2, 71.4, 'Il quadrato cresce di due strisce\nda {mx:xh}: la derivata è {g:2}{mx:x}.'],
  [71.5, 78.0, 'Con la regola: qui {my:f′} = {mv:g′} = 1,\nquindi {mx:x} + {mx:x} = {g:2}{mx:x}.'],
  [78.1, 83.7, 'Invece {mink:f′g′} fa {r:1 · 1 = 1}:\nsarebbe {r:sbagliato}.'],
  [86.0, 92.5, 'Il prodotto non si deriva come la\nsomma: {mink:(fg)′ = f′g + fg′}.'],
];

function rett(ctx, x, y, w, h, col, a, bordo = 0) {
  if (w <= .5 || h <= .5) return;
  ctx.save();
  ctx.fillStyle = css(col, a); ctx.fillRect(x, y, w, h);
  if (bordo > 0) { ctx.strokeStyle = css(col); ctx.lineWidth = bordo; ctx.strokeRect(x, y, w, h); }
  ctx.restore();
}
function tratto(ctx, a, b, col, w) {
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Derivare un prodotto', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il rettangolo (7.5–84)
const O = [440, 700];
// la crescita delle strisce: piena da 16,4; si azzera prima di diventare quadrato e ricresce prima del fumetto che ne parla
const kGrow = t => kf(t, [[14.8, 0], [16.4, 1], [58.0, 1], [58.6, 0], [63.8, 0], [65.0, .6]]);
// mentre si spiega perché il quadratino non conta, Δf e Δg si abbassano insieme: le strisce si
// assottigliano, il quadratino (piccolo per piccolo) molto di più; si torna a 1 quando le strisce sono sparite
const kPiccolo = t => kf(t, [[35.0, 1], [37.4, .4], [60.0, .4], [60.1, 1]]);
const quadrato = t => P(t, 58.6, 59.8);
// quale pezzo è acceso: 1 striscia destra, 2 striscia alta, 3 quadratino
const accesi = t => [Math.max(life(t, 20.4, 25.2, .4, .4), life(t, 34.4, 37.0, .4, .4), life(t, 41.2, 46.8, .4, .4)),
  Math.max(life(t, 25.5, 29.7, .4, .4), life(t, 34.4, 37.0, .4, .4), life(t, 41.2, 46.8, .4, .4)),
  Math.max(life(t, 30.0, 34.2, .4, .4), life(t, 37.4, 40.8, .4, .4), life(t, 47.1, 51.6, .4, .4))];
function sceneProdotto(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 300, 110, 760, 690, al);
  card(ctx, 1110, 110, 710, 690, al * P(t, 20.0, 20.6));
  ctx.save(); ctx.globalAlpha *= al;
  const sq = quadrato(t), k = kGrow(t), q = kPiccolo(t), dentro = P(t, 8.2, 9.2, E.out);
  const F = lerp(400, 340, sq) * dentro, G = lerp(300, 340, sq) * dentro;
  const DF0 = lerp(150, 120, sq) * k, DF = DF0 * q, DG = lerp(115, 120, sq) * k * q;
  const [hR, hT, hQ] = accesi(t);
  const x1 = O[0] + F, yT = O[1] - G;
  rett(ctx, O[0], yT, F, G, C.dim, .1);
  rett(ctx, x1, yT, DF, G, C.y, .3 + .3 * hR, 2 + 3 * hR);
  rett(ctx, O[0], yT - DG, F, DG, C.v, .26 + .3 * hT, 2 + 3 * hT);
  rett(ctx, x1, yT - DG, DF, DG, C.dim, .4 + .3 * hQ, 2 + 3 * hQ);
  ctx.save(); ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3; if (F > 1) ctx.strokeRect(O[0], yT, F, G); ctx.restore();
  if (F > 1) {
    tratto(ctx, [O[0], O[1]], [x1, O[1]], sq > .5 ? C.x : C.y, 8);
    tratto(ctx, [O[0], O[1]], [O[0], yT], sq > .5 ? C.x : C.v, 8);
  }
  // le etichette di f e g escono del tutto prima che entrino quelle di x
  const vecchie = 1 - P(t, 57.9, 58.5), nuove = P(t, 58.8, 59.6);
  ctx.save(); ctx.globalAlpha *= P(t, 9.0, 9.6);
  drawRich(ctx, '{my:f}', O[0] + F / 2, O[1] + 46, { size: 52, alpha: vecchie });
  drawRich(ctx, '{mv:g}', O[0] - 42, O[1] - G / 2, { size: 52, alpha: vecchie });
  drawRich(ctx, '{mx:x}', O[0] + F / 2, O[1] + 46, { size: 52, alpha: nuove });
  drawRich(ctx, '{mx:x}', O[0] - 42, O[1] - G / 2, { size: 52, alpha: nuove });
  drawRich(ctx, '{my:f}{mv:g}', O[0] + F / 2, O[1] - G / 2, { size: 58, alpha: vecchie });
  drawRich(ctx, '{mx:x}{mink:²}', O[0] + F / 2, O[1] - G / 2, { size: 64, alpha: nuove });
  ctx.restore();
  const da = clamp((DF0 - 40) / 30) * P(t, 15.8, 16.4);
  drawRich(ctx, sq > .5 ? '{mx:h}' : '{my:Δf}', x1 + DF / 2, O[1] + 46, { size: 42, alpha: da });
  drawRich(ctx, sq > .5 ? '{mx:h}' : '{mv:Δg}', O[0] - 46, yT - DG / 2, { size: 42, alpha: da });
  drawRich(ctx, '{mx:x}{mink: → }{mx:x + h}', 1030, 160, { size: 40, align: 'right', alpha: P(t, 14.5, 15.0) });

  // la scheda dei conti: le tre aree nuove…
  const ca = 1 - P(t, 57.6, 58.4);
  if (ca > 0 && t > 20.0) {
    ctx.save(); ctx.globalAlpha *= ca;
    txt(ctx, 'area nuova', 1320, 172, { size: 30, color: C.dim, alpha: P(t, 20.4, 21.0) });
    drawRich(ctx, '{dim:diviso }{mx:h}{dim:, con }{mx:h}{dim: → 0}', 1645, 172, { size: 30, alpha: P(t, 41.0, 41.6) });
    const R = [
      [280, C.y, .3, '{my:Δf }{mv:g}', 20.8, '{my:f′}{mv:g}', 41.6, hR, 1],
      [400, C.v, .26, '{my:f }{mv:Δg}', 25.8, '{my:f}{mv:g′}', 43.0, hT, 1],
      [520, C.dim, .4, '{my:Δf }{mv:Δg}', 30.3, '{my:f′ }{mv:Δg}{mink: → }{g:0}', 47.3, hQ, 1],
    ];
    R.forEach(([y, col, a, s1, t1, s2, t2, h, sc]) => {
      const k1 = P(t, t1, t1 + .4, E.out); if (k1 <= 0) return;
      ctx.save(); ctx.globalAlpha *= k1;
      rett(ctx, 1145, y + 22 - 44 * sc, 44, 44 * sc, col, a + .3 * h, 2 + 2 * h);
      ctx.restore();
      drawRich(ctx, s1, 1215, y, { size: 48, align: 'left', local: t - t1 });
      if (t > t2) { drawRich(ctx, '{dim:→}', 1460, y, { size: 40, alpha: P(t, t2, t2 + .4) }); drawRich(ctx, s2, 1505, y, { size: 44, align: 'left', local: t - t2 - .2 }); }
    });
    const ra = P(t, 52.0, 52.5);
    if (ra > 0) {
      ctx.save(); ctx.globalAlpha *= ra; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(1150, 610); ctx.lineTo(1780, 610); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, '{mink:(fg)′ = }{my:f′}{mv:g}{mink: + }{my:f}{mv:g′}', 1465, 700, { size: 58, local: t - 52.1 });
    ctx.restore();
  }
  // …poi la prova con f = g = x
  const pa = P(t, 58.5, 59.2);   // dopo che la scheda dei conti è uscita (58,4)
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    conFont(TITOLI, () => drawRich(ctx, 'con {my:f} = {mv:g} = {mx:x}', 1465, 185, { size: 42, weight: 600 }));
    drawRich(ctx, '{mink:fg = }{mx:x}{mink:²}', 1465, 300, { size: 50, local: t - 60.4 });
    drawRich(ctx, '{mink:(}{mx:x}{mink:²)′ = 2}{mx:x}', 1420, 420, { size: 52, local: t - 65.6 });
    checkMark(ctx, 1745, 420, P(t, 66.4, 67.2), C.g, .34);
    drawRich(ctx, '{mink:f′g + fg′ = }{mx:x}{mink: + }{mx:x}{mink: = 2}{mx:x}', 1420, 535, { size: 44, local: t - 72.0 });
    checkMark(ctx, 1745, 535, P(t, 73.6, 74.4), C.g, .34);
    drawRich(ctx, '{mink:f′g′ = 1 · 1 = }{r:1}', 1420, 670, { size: 50, local: t - 78.4 });
    crossMark(ctx, 1745, 670, P(t, 79.4, 80.2), C.r, .34);
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (84–95)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 92.6, 93.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il prodotto cresce di {g:due strisce},\nuna per lato.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[520, 480, '{mink:(fg)′ = f′g + fg′}'], [1075, 570, 'il quadratino {dim:si trascura}'], [1565, 350, '{r:non} {mink:f′g′}']];
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
    titolo: 'Derivare un prodotto', durata: 95, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 20.0, 'un rettangolo'], [20.0, 57.6, 'l\'area nuova'], [57.6, FINE, 'la prova con un quadrato']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneProdotto(ctx, t); sceneFine(ctx, t); },
  };
});
