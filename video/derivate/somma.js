'use strict';
/* La derivata della somma: due sbarre in fila, ognuna cresce per conto suo. Argomento: derivate. */
CVIDEO.registra('derivate/somma', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, drawSeq, card } = M;

const FINE = 43.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [7.9, 'neutro'], [14.0, 'sorpreso'], [16.0, 'neutro'], [20.4, 'felice'], [22.6, 'neutro'],
  [25.9, 'pensa'], [31.6, 'neutro'], [37.8, 'festa'], [40.4, 'felice'],
  [FINE, 'neutro'], [46.2, 'felice'],
];
const FUMETTI = [
  [2.0, 6.6, 'Come si deriva una somma\ndi due funzioni?'],
  [7.9, 13.6, 'Metto in fila {my:f} e {mv:g}:\nin tutto fanno {mink:f + g}.'],
  [13.7, 20.0, 'Se {mx:x} avanza di {mx:h}, {my:f} cresce\ndi {my:Δf} e {mv:g} cresce di {mv:Δg}.'],
  [20.1, 25.8, 'La somma cresce di {my:Δf} + {mv:Δg}:\nogni pezzo per conto suo.'],
  [25.9, 31.5, 'Divido per {mx:h}: ogni pezzo\ndiventa un rapporto incrementale.'],
  [31.6, 37.6, 'Faccio il limite per {mx:h} → 0:\nogni rapporto diventa una derivata.'],
  [37.7, 43.3, 'Ecco la regola della somma:\n{mink:(f + g)′ = f′ + g′}.'],
  [46.0, 51.0, 'Somma di funzioni:\nsi sommano le derivate.'],
];

function rett(ctx, x, y, w, h, col, a, bordo = 0) {
  if (w <= .5 || h <= .5) return;
  ctx.save();
  ctx.fillStyle = css(col, a); ctx.fillRect(x, y, w, h);
  if (bordo > 0) { ctx.strokeStyle = css(col); ctx.lineWidth = bordo; ctx.strokeRect(x, y, w, h); }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Derivare una somma', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · due sbarre in fila (7.5–43.6)
const SB = { x0: 420, y: 270, th: 64, F: 560, G: 420, DF: 150, DG: 90 };
const LIM = { lim: '{mx:h}{mink:→0}' };
function sceneSomma(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 300, 120, 1520, 680, al);
  ctx.save(); ctx.globalAlpha *= al;
  const kF = P(t, 8.2, 9.0), kG = P(t, 8.8, 9.6), k = P(t, 14.4, 16.0);
  const { x0, y, th, F, G } = SB, DF = SB.DF * k, DG = SB.DG * k, y0 = y - th / 2;
  const xg = x0 + F + DF;
  rett(ctx, x0, y0, F * kF, th, C.y, .85);
  rett(ctx, xg, y0, G * kG, th, C.v, .8);
  rett(ctx, x0 + F, y0, DF, th, C.y, .28, 3);
  rett(ctx, xg + G, y0, DG, th, C.v, .26, 3);
  drawRich(ctx, '{my:f}', x0 + F / 2, y - 72, { size: 52, alpha: kF });
  drawRich(ctx, '{mv:g}', xg + G / 2, y - 72, { size: 52, alpha: kG });
  drawRich(ctx, '{my:Δf}', x0 + F + DF / 2, y - 72, { size: 44, alpha: P(t, 15.5, 16.0) });
  drawRich(ctx, '{mv:Δg}', xg + G + DG / 2, y - 72, { size: 44, alpha: P(t, 15.7, 16.2) });
  // la parentesi sotto: in tutto f + g
  const ba = life(t, 9.8, 14.0, .5, .4);
  if (ba > 0) {
    ctx.save(); ctx.globalAlpha *= ba; ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x0, y + 48); ctx.lineTo(x0, y + 62); ctx.lineTo(x0 + F + G, y + 62); ctx.lineTo(x0 + F + G, y + 48); ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{mink:f + g}', x0 + (F + G) / 2, y + 108, { size: 48, alpha: ba });
  }
  drawRich(ctx, '{mx:x}{mink: → }{mx:x + h}', 1780, 352, { size: 42, align: 'right', alpha: P(t, 13.9, 14.4) });
  // i conti: l'aumento, poi diviso h, poi il limite
  drawRich(ctx, '{mink:Δ(f + g) = }{my:Δf}{mink: + }{mv:Δg}', 1060, 420, { size: 54, local: t - 20.4 });
  const fr = [{ num: '{mink:Δ(f + g)}', den: '{mx:h}' }, '{mink:=}', { num: '{my:Δf}', den: '{mx:h}' }, '{mink:+}', { num: '{mv:Δg}', den: '{mx:h}' }];
  const fl = [LIM, fr[0], '{mink:=}', LIM, fr[2], '{mink:+}', LIM, fr[4]];
  const a1 = 1 - P(t, 31.7, 32.1);
  if (t > 26.2 && a1 > 0) drawSeq(ctx, fr, 1060, 565, 46, { local: t - 26.2, alpha: a1 });
  if (t > 31.9) drawSeq(ctx, fl, 1060, 560, 52, { local: (t - 31.9) * 2 + 1 });
  const ra = P(t, 37.9, 38.4);
  if (ra > 0) {
    ctx.save(); ctx.globalAlpha *= ra; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(560, 660); ctx.lineTo(1560, 660); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, '{mink:(f + g)′ = }{my:f′}{mink: + }{mv:g′}', 1060, 728, { size: 60, local: t - 38.0 });
  ctx.restore();
}

// 2 · in una frase (43.6–54)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 51.6, 52.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La derivata di una somma è\nla {g:somma delle derivate}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[670, 520, '{mink:(f + g)′ = f′ + g′}'], [1250, 580, 'ogni pezzo {g:per conto suo}']];
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
    titolo: 'Derivare una somma', durata: 54, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 20.0, 'due pezzi in fila'], [20.0, FINE, 'dall\'aumento alla derivata']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSomma(ctx, t); sceneFine(ctx, t); },
  };
});
