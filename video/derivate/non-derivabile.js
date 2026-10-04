'use strict';
/* Dove la derivata non esiste: punto angoloso, cuspide, flesso a tangente verticale, guardando le secanti da destra e da sinistra. Argomento: derivate. */
CVIDEO.registra('derivate/non-derivabile', M => {
  const { W, C, E, P, life, kf, clamp, css, TITOLI, conFont, drawRich, fixedNum, fmtN,
    dot, glowStroke, makePlane, card } = M;

const FINE = 99.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [7.9, 'neutro'], [10.2, 'sorpreso'], [12.2, 'neutro'], [19.7, 'felice'], [21.8, 'neutro'],
  [30.7, 'sorpreso'], [32.8, 'neutro'], [36.1, 'pensa'], [38.4, 'felice'],
  [42.0, 'neutro'], [44.0, 'sorpreso'], [46.0, 'neutro'], [52.7, 'sorpreso'], [54.8, 'neutro'],
  [67.4, 'pensa'], [69.6, 'felice'],
  [72.6, 'neutro'], [83.1, 'sorpreso'], [85.2, 'neutro'], [88.5, 'pensa'], [91.0, 'neutro'], [93.5, 'festa'], [96.2, 'felice'],
  [FINE, 'neutro'], [101.4, 'felice'],
];
const FUMETTI = [
  [1.9, 6.6, 'Una curva continua può\nnon avere la derivata?'],
  [7.9, 13.6, 'Ecco {my:y = |}{mx:x}{my:|}: è continua,\nma in 0 fa uno {v:spigolo}.'],
  [13.7, 19.6, 'Prendo {my:Q} sulla curva, a destra:\n{mx:h} è quanto dista da {mink:P}.'],
  [19.7, 25.0, 'Avvicino {my:Q}: la secante non cambia,\nla pendenza resta {v:1}.'],
  [25.1, 30.6, 'Da sinistra la secante è un\'altra,\ne la pendenza resta {x:−1}.'],
  [30.7, 36.0, 'Due rette diverse, una per lato:\nle pendenze {r:non si accordano}.'],
  [36.1, 41.4, 'Finite ma diverse: è un\n{v:punto angoloso}, senza derivata.'],
  [42.0, 47.0, 'Ora {my:y = ∛}{mx:x}{my:²}: in 0\nfa una {v:punta}.'],
  [47.1, 52.6, 'Avvicino {my:Q} da destra:\nla secante si raddrizza sempre di più.'],
  [52.7, 57.4, 'La pendenza cresce senza fine:\ntende a {v:+∞}.'],
  [57.5, 61.4, 'Al limite la secante\ndiventa {v:verticale}.'],
  [61.5, 67.3, 'Da sinistra si raddrizza anche lei,\nma la pendenza va a {x:−∞}.'],
  [67.4, 72.0, 'Infinite e di segno {r:opposto}:\nè una {v:cuspide}.'],
  [72.6, 78.0, 'Infine {my:y = ∛}{mx:x}: passa per 0\nsenza punte né spigoli.'],
  [78.1, 83.0, 'Da destra la pendenza\ncresce fino a {v:+∞}…'],
  [83.1, 88.4, '…e da sinistra {g:anche}:\nva a {v:+∞}, stesso segno.'],
  [88.5, 93.4, 'La tangente è {v:verticale},\ne la curva la {g:attraversa}.'],
  [93.5, 99.0, 'Infinite e dello {g:stesso segno}:\n{v:flesso a tangente verticale}.'],
  [101.4, 106.6, 'Spigoli, punte, tangenti verticali:\nlì la derivata {r:non esiste}.'],
];

const PL = makePlane({ ox: 692, oy: 540, u: 100, x0: -2.5, x1: 2.5, y0: -1.6, y1: 2.6 });
const CARD = [372, 110, 640, 690];
// le rette si fermano sotto l'etichetta «y» dell'asse e sotto la formula della curva
const CLIP = [CARD[0] + 8, 290, CARD[2] - 16, CARD[1] + CARD[3] - 8 - 290];
const cbrt = Math.cbrt;
// dx, sx: [Q compare, Q parte, Q arriva]; hMin: esponente di 10 a cui arriva |h|
const CASI = [
  { f: x => Math.abs(x), lab: '{my:y = |}{mx:x}{my:|}', da: 7.5, a: 41.6, tc: 8.4, tP: 10.0,
    dx: [14.0, 20.0, 23.9], sx: [25.2, 25.6, 29.6], hMin: -3, entrambe: 30.8, vert: null, infD: null, infS: null,
    verdetto: ['{g:finite} ma {r:diverse}', 36.3], nome: ['punto angoloso', 37.0] },
  { f: x => cbrt(x) ** 2, lab: '{my:y = ∛}{mx:x}{my:²}', da: 41.6, a: 72.2, tc: 42.1, tP: 43.2,
    dx: [47.2, 47.5, 57.0], easeD: p => .4 * E.io(p) + .6 * p, sx: [61.6, 61.9, 66.4], hMin: -6, entrambe: null, vert: 57.7, infD: ['+∞', 52.9], infS: ['−∞', 66.8],
    verdetto: ['{r:infinite}, di segno {r:opposto}', 67.6], nome: ['cuspide', 68.3] },
  { f: x => cbrt(x), lab: '{my:y = ∛}{mx:x}', da: 72.2, a: FINE, tc: 72.7, tP: 73.8,
    dx: [78.1, 78.4, 82.6], sx: [83.1, 83.4, 87.6], hMin: -3, entrambe: null, vert: 88.7, infD: ['+∞', 82.9], infS: ['+∞', 87.9],
    verdetto: ['{r:infinite}, dello {g:stesso segno}', 93.7], nome: ['flesso a tangente verticale', 94.4] },
];
// h va da ±2 a ±10^hMin, sempre più piano vicino a 0; poi si arrotonda alle cifre che si mostrano,
// e la pendenza si calcola proprio da quel valore, così il conto si può rifare
// con «ease» (cuspide, da destra) l'avvicinamento non rallenta alla fine: la pendenza cresce fino all'ultimo
const hDa = (t, [, t1, t2], s, hMin, ease) => s * Math.pow(10, ease
  ? Math.log10(2) + (hMin - Math.log10(2)) * ease(clamp((t - t1) / (t2 - t1))) : kf(t, [[t1, Math.log10(2)], [t2, hMin]]));
function arrotonda(h) {
  const a = Math.abs(h), d = Math.max(3, Math.ceil(-Math.log10(a)) + 1);
  const v = Math.round(a * 10 ** d) / 10 ** d;
  const s = fmtN(v, d).replace(/(,\d*?)0+$/, '$1').replace(/,$/, '');
  return [Math.sign(h) * v, (h < 0 ? '−' : '') + s];
}

// retta per P = (0; 0) con pendenza m, tagliata sulla scheda del grafico; si interrompe
// sotto i numeri degli assi, così una secante quasi verticale non li attraversa
const BUCHI = [-1, 1, 2].map(j => [PL.ox - 56, PL.oy - j * PL.u - 21, 42, 42])
  .concat([-2, -1, 1, 2].map(i => [PL.ox + i * PL.u - 26, PL.oy + 12, 52, 40]));
function retta(ctx, m, col, al, w = 4) {
  if (al <= 0) return;
  const d = 6 / Math.hypot(1, m);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(...CLIP); BUCHI.forEach(b => ctx.rect(...b)); ctx.clip('evenodd');
  glowStroke(ctx, [PL.toS(-d, -m * d), PL.toS(d, m * d)], 1, col, w);
  ctx.restore();
}
function verticale(ctx, col, k, al) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(...CLIP); ctx.clip();
  glowStroke(ctx, [PL.toS(0, 0), PL.toS(0, 6)], k, col, 5);
  glowStroke(ctx, [PL.toS(0, 0), PL.toS(0, -6)], k, col, 5);
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Dove la derivata non esiste', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .12, alpha: al }));
}

function sceneSchede(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, ...CARD, al);
  card(ctx, 1080, 130, 740, 670, al * P(t, 13.8, 14.4));
  ctx.save(); ctx.globalAlpha *= al;
  PL.axes(ctx, P(t, 7.7, 8.7));
  const kc = P(t, 14.0, 14.5);
  conFont(TITOLI, () => drawRich(ctx, 'pendenza della secante {mink:PQ}', 1450, 192, { size: 38, weight: 600, alpha: kc }));
  drawRich(ctx, '{mx:h}{dim: = quanto }{my:Q}{dim: dista da }{mink:P}{dim:, in orizzontale}', 1450, 250, { size: 30, alpha: kc });
  ctx.restore();
}

function caso(ctx, t, K) {
  if (t < K.da - .2 || t > K.a + .2) return;
  const al = life(t, K.da, K.a, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, K.lab, 400, 160, { size: 46, align: 'left', local: t - K.tc });

  // la secante da destra e quella da sinistra
  const destra = t < K.sx[0];
  const [hD, sD] = arrotonda(hDa(t, K.dx, 1, K.hMin, K.easeD)), [hS, sS] = arrotonda(hDa(t, K.sx, -1, K.hMin));
  const mD = K.f(hD) / hD, mS = K.f(hS) / hS;
  // da destra: piena mentre Q si avvicina, poi attenuata; quando compare la verticale, lascia il posto a lei
  const aD = (destra ? P(t, K.dx[0], K.dx[0] + .5) : (K.entrambe && t > K.entrambe ? 1 : .35)) * (K.vert ? 1 - P(t, K.vert + .3, K.vert + 1.1) : 1);
  const fineS = Math.max(K.vert || 0, K.sx[2] + .6);
  const aS = destra ? 0 : P(t, K.sx[0], K.sx[0] + .5) * (K.vert && t > K.vert ? 1 - P(t, fineS, fineS + .8) : 1);
  retta(ctx, mD, C.v, aD);
  retta(ctx, mS, C.x, aS);
  // la tangente verticale: si attenua mentre si guarda il lato sinistro
  if (K.vert) verticale(ctx, C.v, P(t, K.vert, K.vert + .8), 1 - .65 * life(t, K.sx[0] - .2, K.sx[2] + .6, .4, .4));
  // la curva sopra le rette, e più spessa: resta sempre visibile
  glowStroke(ctx, PL.curve(K.f, -2.5, 2.5, 400), P(t, K.tc, K.tc + 1.2), C.y, 7);

  const h = destra ? hD : hS;
  // h sull'asse x: il tratto da P fino all'ascissa di Q
  const qa = destra ? P(t, K.dx[0], K.dx[0] + .4, E.back) * (1 - P(t, K.sx[0] - .4, K.sx[0] - .1)) : P(t, K.sx[0], K.sx[0] + .4, E.back);
  if (qa > 0 && t > K.dx[0]) {
    ctx.save(); ctx.globalAlpha *= qa; ctx.strokeStyle = css(C.x); ctx.lineWidth = 8; ctx.lineCap = 'round';
    const a = PL.toS(0, 0), b = PL.toS(h, 0);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mx:h}', PL.toS(h / 2, 0)[0], PL.toS(0, 0)[1] + 72, { size: 40, alpha: destra ? qa * clamp((Math.abs(h) - 1.45) / .3) : 0 });
  }
  // P, su un tassello di carta: le secanti che ruotano le passano sotto senza coprirla
  const P0 = PL.toS(0, 0);
  dot(ctx, P0, C.ink, P(t, K.tP, K.tP + .4, E.back), 11);
  ctx.save(); ctx.globalAlpha *= P(t, K.tP, K.tP + .4); ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.roundRect(P0[0] + 14, P0[1] + 54, 40, 48, 8); ctx.fill(); ctx.restore();
  drawRich(ctx, '{mink:P}', P0[0] + 34, P0[1] + 78, { size: 40, local: t - K.tP });
  // Q, con l'etichetta dalla parte opposta alla secante (sotto, perpendicolare alla retta)
  if (qa > 0 && t > K.dx[0]) {
    const Q = PL.toS(h, K.f(h)), m = destra ? mD : mS, n = Math.hypot(m, 1);
    dot(ctx, Q, C.y, qa, 11);
    const lq = [Q[0] + 40 * m / n, Q[1] + 40 / n + 4];
    // si spegne quando passerebbe sopra un numero dell'asse y
    const lontano = Math.min(...[-1, 1, 2].map(j => clamp((Math.hypot((lq[0] - (PL.ox - 32)) / 1.3, lq[1] - (PL.oy - j * PL.u)) - 36) / 14)));
    drawRich(ctx, '{my:Q}', lq[0], lq[1], { size: 40, alpha: qa * lontano * clamp((Math.abs(h) - .25) / .3) });
  }

  // la scheda dei numeri
  ctx.save(); ctx.globalAlpha *= P(t, Math.max(K.da, 14.0), Math.max(K.da, 14.0) + .5);
  if (t > K.dx[0]) {
    drawRich(ctx, '{mx:h} =', 1130, 320, { size: 42, align: 'left' });
    fixedNum(ctx, destra ? sD : sS, 1560, 320, 42, C.ink);
    drawRich(ctx, '{v:da destra}', 1130, 400, { size: 40, align: 'left' });
    fixedNum(ctx, fmtN(mD, 2), 1560, 400, 42, C.v);
  }
  if (t > K.sx[0]) {
    drawRich(ctx, '{x:da sinistra}', 1130, 475, { size: 40, align: 'left' });
    fixedNum(ctx, fmtN(mS, 2), 1560, 475, 42, C.x);
  }
  if (K.infD) drawRich(ctx, '{mink:→ }{mv:' + K.infD[0] + '}', 1595, 400, { size: 42, align: 'left', local: t - K.infD[1] });
  if (K.infS) drawRich(ctx, '{mink:→ }{mx:' + K.infS[0] + '}', 1595, 475, { size: 42, align: 'left', local: t - K.infS[1] });
  const kv = P(t, K.verdetto[1], K.verdetto[1] + .4);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1120, 530); ctx.lineTo(1780, 530); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, K.verdetto[0], 1450, 605, { size: 42, local: t - K.verdetto[1] });
  conFont(TITOLI, () => drawRich(ctx, '{v:' + K.nome[0] + '}', 1450, 705, { size: K.nome[0].length > 20 ? 46 : 54, weight: 600, local: t - K.nome[1] }));
  ctx.restore();
  ctx.restore();
}

// 4 · in una frase (99.4–109.4)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 7.8, FINE + 8.8);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'C\'è la derivata se destra e sinistra\ndanno lo {g:stesso} numero, {g:finito}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[400, '{v:punto angoloso}\nfinite e diverse'], [960, '{v:cuspide}\ninfinite, segni opposti'], [1520, '{v:flesso verticale}\ninfinite, stesso segno']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 265, 440, 530, 130);
    drawRich(ctx, s, x, 505, { size: 40, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Dove la derivata non esiste', durata: FINE + 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 41.6, 'lo spigolo'], [41.6, 72.2, 'la punta'], [72.2, FINE, 'la tangente verticale']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSchede(ctx, t); CASI.forEach(K => caso(ctx, t, K)); sceneFine(ctx, t); },
  };
});
