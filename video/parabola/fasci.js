'use strict';
/* Tutte le parabole per due punti — il fascio y = a · x(x − 2): per ogni a la curva passa per (0; 0) e (2; 0),
   i punti base. a = 1, 2, 0,3: concavità verso l'alto; a = 0: la retta y = 0, la parabola degenere del fascio;
   a = −1: verso il basso. Un terzo punto, (3; 3), compare e poi a scivola fino a 1, l'unico valore che ci passa:
   per questo servono tre condizioni. Argomento: parabola (§ determinare-equazione). */
CVIDEO.registra('parabola/fasci', M => {
  const { W, C, E, P, life, kf, clamp, css, mix, TITOLI, conFont, drawRich, txt, fixedNum, fmtN, dot, glowStroke, arrowHead, makePlane, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['eq', 6.2, 'Ecco {mink:y = a · x(x − 2)}, con un\nnumero {v:a} che posso cambiare.'],
  ['uno', 4.4, 'Con {mink:a = 1} è una parabola\ncon la concavità verso l’alto.'],
  ['zeri', 7.2, 'Con {mx:x = 0} o {mx:x = 2} il prodotto fa 0:\npassa per {g:(0; 0)} e per {g:(2; 0)}.'],
  ['cresce', 3.4, 'Ora faccio crescere {mink:a}…'],
  ['restano', 5.0, '…la parabola si stringe, ma passa\nancora per quei due punti.'],
  ['piccolo', 4.6, 'Con {mink:a = 0,3} si allarga,\ne passa ancora di lì.', 1.8],
  ['nome', 6.2, 'Insieme formano un {v:fascio} di parabole:\n{g:(0; 0)} e {g:(2; 0)} sono i {g:punti base}.'],
  ['zero', 6.2, 'Con {mink:a = 0} resta {mink:y = 0}: una retta,\nla parabola {r:degenere} del fascio.', 1.6],
  ['negativo', 5.2, 'Con {mink:a = −1}, negativo, la concavità\nè verso il {v:basso}.', 1.8],
  ['terzo', 4.4, 'Ora aggiungo un terzo punto,\n{mv:(3; 3)}.', .8],   // nella pausa prima, le copie sbiadite se ne vanno
  ['sceglie', 7.0, 'Ne passa una sola: {mink:3 = a · 3 · 1},\ncioè {mink:a = 1}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Quante parabole passano\nper due punti?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
const FINE_NOME = FUMETTI[7][1];   // quando Ada ha finito di dire «punti base»
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Al variare di {mink:a}, le parabole del fascio\npassano tutte per i {g:punti base}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.zeri, 'felice'], [T.zeri + 2.4, 'neutro'], [T.restano, 'sorpreso'], [T.restano + 2.4, 'neutro'],
  [T.nome, 'felice'], [T.nome + 2.4, 'neutro'], [T.zero, 'sorpreso'], [T.zero + 2.4, 'neutro'],
  [T.terzo, 'pensa'], [T.sceglie + 2.4, 'festa'], [T.sceglie + 4.8, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// il numero a nel tempo: cambia solo quando Ada lo cambia (cresce) o nelle pause fra i fumetti
const MOSSE = [[T.cresce + .3, T.cresce + 2.3, 1, 2], [T.piccolo - 1.7, T.piccolo - .1, 2, .3], [T.zero - 1.5, T.zero - .1, .3, 0],
  [T.negativo - 1.7, T.negativo - .1, 0, -1], [T.sceglie + .4, T.sceglie + 2.4, -1, 1]];   // prima il punto (3; 3), poi a scivola a 1
function aDi(t) {
  let a = 1;
  for (const [t0, t1, a0, a1] of MOSSE) if (t >= t0) a = a0 + (a1 - a0) * P(t, t0, t1, E.io);
  return a;
}
// le parabole lasciate indietro, sbiadite: [a, quando la corrente la lascia]
const COPIE = [[1, T.cresce + .3], [2, T.piccolo - 1.7], [.3, T.zero - 1.5], [0, T.negativo - 1.7]];
const spenteCopie = t => 1 - P(t, T.terzo - .75, T.terzo - .1);

const PL = makePlane({ ox: 358, oy: 533, u: 110, x0: -1.8, x1: 4.0, y0: -2.2, y1: 3.3 });
const RQ = [70, 110, 930, 690];
const curva = a => PL.curve(x => a * x * (x - 2), -1.9, 4.1, 300);
const lab = (ctx, s, p, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Tutte le parabole per due punti', W / 2, 180, { size: 112, weight: 600, local: t - 1.6, stagger: .12, alpha: al }));
}

function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}
// i numeri degli assi, ciascuno dove nessuna parabola del fascio (a = 2, 1, 0,3, 0, −1) gli passa sopra
// (posizioni controllate con uno script: dx, dy in pixel dalla tacca, y verso l'alto); niente fondini.
// Spariscono solo sotto le etichette dei punti base (ost).
const NUMERI = [['x', -1, 0, -30], ['x', 1, 0, 30], ['x', 2, 50, -30], ['x', 3, 0, -30], ['x', 4, 0, -30],
  ['y', -2, -34, 0], ['y', -1, -80, 0], ['y', 1, 34, 0], ['y', 2, 34, 0], ['y', 3, 34, 0]];
function numeri(ctx, k, ost) {
  const al = P(k, .6, 1); if (al <= 0) return;
  for (const [asse, n, dx, dy] of NUMERI) {
    const s = (n < 0 ? '−' : '') + Math.abs(n), w = 17 * s.length + 4;
    const x = PL.ox + (asse === 'x' ? n * PL.u : 0) + dx, y = PL.oy - (asse === 'y' ? n * PL.u : 0) - dy;
    let d = 1e9;
    for (const [px, py, r] of ost) d = Math.min(d, Math.hypot(Math.max(Math.abs(px - x) - w / 2, 0), Math.max(Math.abs(py - y) - 17, 0)) - r);
    const a = al * clamp(d / 3);
    if (a > 0) txt(ctx, s, x, y, { size: 30, color: C.dim, alpha: a });
  }
}

// 1 · il piano con le parabole del fascio (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  const ka = P(t, 7.7, 8.7);
  assi(ctx, ka);
  const ost = [];
  // le copie sbiadite
  const spente = spenteCopie(t);
  for (const [a, tl] of COPIE) {
    const k = P(t, tl, tl + .4) * spente; if (k <= 0) continue;
    ctx.save(); ctx.globalAlpha *= .4 * k; ctx.strokeStyle = css(a === 0 ? C.r : C.y); ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
    const pts = curva(a); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  }
  // la parabola di adesso; con a = 0 diventa rossa: è la retta y = 0
  const a = aDi(t), kz = life(t, T.zero - .2, T.negativo - 1.6, .3, .3);
  glowStroke(ctx, curva(a), P(t, T.uno + .3, T.uno + 1.5, E.lin), mix(C.y, C.r, kz), 5);
  // i punti base
  const kb = P(t, T.zeri + .4, T.zeri + .8, E.back), kl = life(t, T.zeri + .5, FINE_NOME + .3, .4, .4);
  for (const [x, dx] of [[0, -.75], [2, .75]]) {
    if (kb > .01) dot(ctx, PL.toS(x, 0), C.g, kb, 11);
    const p = PL.toS(x + dx, -.42);
    lab(ctx, '{g:(' + x + '; 0)}', p, kl, 40);
    if (kl > 0) ost.push([p[0] - 32, p[1], 24], [p[0] + 32, p[1], 24]);   // l'etichetta è larga e bassa
  }
  // il terzo punto
  const k3 = P(t, T.terzo + .3, T.terzo + .7, E.back);
  if (k3 > .01) {
    const p = PL.toS(3, 3); dot(ctx, p, C.v, k3, 11);
    // a sinistra del punto: le parabole con 0 < a ≤ 1 arrivano a y = 3 solo per x ≥ 3 (controllato su tutta la scivolata)
    lab(ctx, '{mv:(3; 3)}', [p[0] - 20, p[1] - 6], P(t, T.terzo + .4, T.terzo + .8), 40, 'right');
  }
  numeri(ctx, ka, ost);
  ctx.restore();
  ctx.restore();
}

// la scheda a destra: il fascio, il numero a, l'equazione di adesso
const XL = 1090, XR = 1810, XC = 1450;
function equazione(a) {   // all'italiana, con a a un decimale mentre cambia
  const r = Math.round(a * 10) / 10;
  if (r === 0) return '{mink:y = 0}';
  const c = r === 1 ? '' : r === -1 ? '−' : (r < 0 ? '−' : '') + fmtN(Math.abs(r), Math.abs(r) % 1 ? 1 : 0);
  return '{mink:y = ' + c + '}{mx:x}{mink:(}{mx:x}{mink: − 2)}';
}
function sceneScheda(ctx, t) {
  if (t < T.eq || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, T.eq, T.eq + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'il fascio', XC, 165, { size: 40, weight: 600, alpha: P(t, T.eq + .2, T.eq + .6) }));
  drawRich(ctx, '{mink:y = }{mv:a}{mink: · }{mx:x}{mink:(}{mx:x}{mink: − 2)}', XC, 245, { size: 56, local: t - T.eq - .3 });
  const a = aDi(t), ka = P(t, T.uno, T.uno + .4);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(XL, 305); ctx.lineTo(XR, 305); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:a}{mink: =}', XL, 360, { size: 50, align: 'left', alpha: ka });
    const r = Math.round(a * 10) / 10;
    fixedNum(ctx, (r < 0 ? '−' : '') + fmtN(Math.abs(r), Math.abs(r) % 1 ? 1 : 0), 1380, 360, 52, C.v, ka);
    drawRich(ctx, equazione(a), XR, 360, { size: 44, align: 'right', alpha: ka });
  }
  // a = 0: la retta y = 0
  const kz = life(t, T.zero + .3, T.negativo - 1.6, .4, .3);
  drawRich(ctx, '{r:la parabola degenere: una retta}', XR, 420, { size: 36, align: 'right', alpha: kz });
  // i punti base
  const kb = P(t, T.nome + .5, T.nome + 1.0);
  if (kb > 0) {
    drawRich(ctx, '{dim:punti base}', XL, 495, { size: 32, align: 'left', alpha: kb });
    drawRich(ctx, '{g:(0; 0)}{dim:  e  }{g:(2; 0)}', XR, 495, { size: 44, align: 'right', alpha: kb });
  }
  // il terzo punto: compare il punto, poi il conto che sceglie a
  const k3 = P(t, T.terzo + .4, T.terzo + .9);
  if (k3 > 0) {
    ctx.save(); ctx.globalAlpha *= k3; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(XL, 585, XR - XL, 165, 18); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{dim:terzo punto }{mv:(3; 3)}', XC, 622, { size: 40, alpha: k3 });
    drawRich(ctx, '{mink:3 = a · 3 · (3 − 2)}', XC, 672, { size: 40, alpha: P(t, T.sceglie + .3, T.sceglie + .8) });
    drawRich(ctx, '{dim:quindi  }{mink:a = }{g:1}', XC, 720, { size: 40, alpha: P(t, T.sceglie + 2.4, T.sceglie + 2.8) });   // a fine scivolata
  }
  ctx.restore();
}

// 2 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le parabole per (0; 0) e (2; 0) formano\nun fascio: un terzo punto ne sceglie una.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'punti base', '{g:(0; 0)}{dim:  e  }{g:(2; 0)}'], [960, 'con {mink:a = 0}', '{r:la retta} {mink:y = 0}'], [1450, 'un terzo punto', '{mv:(3; 3)}{mink:: a = 1}']];
  pills.forEach(([x, testa, s], i) => {
    const a0 = FINE + 2.6 + i * .5, k = P(t, a0, a0 + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: 42 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): mentre a cambia, il tono segue a
  const alto = a => +(.45 + .2 * a).toFixed(2);
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],                                   // il piano
    ['soffio', T.eq], ['pop', T.eq + .3, .5],                                                 // la scheda, l'equazione
    ['tono', T.uno + .3, T.uno + 1.5, [.9, .6, .4, .3, .4, .6, .9]],                           // la parabola con a = 1
    ['pop', T.zeri + .4, .4], ['pop', T.zeri + .6, .5],                                       // i punti base
    ['tono', T.cresce + .3, T.cresce + 2.3, [alto(1), alto(2)]],                              // a cresce
    ['tono', T.piccolo - 1.7, T.piccolo - .1, [alto(2), alto(.3)]],                           // a = 0,3
    ['pop', T.nome + .5, .6], ['ding', T.nome + .6],                                          // il fascio, i punti base
    ['tono', T.zero - 1.5, T.zero - .1, [alto(.3), alto(0)]], ['pop', T.zero + .3, .4],       // a = 0, la retta
    ['tono', T.negativo - 1.7, T.negativo - .1, [alto(0), alto(-1)]],                         // a = −1
    ['pop', T.terzo + .3, .8],                                                                // il punto (3; 3)
    ['tono', T.sceglie + .4, T.sceglie + 2.4, [alto(-1), alto(0), alto(1)]],                  // a scivola fino a 1
    ['ding', T.sceglie + 2.4],                                                                // la parabola passa per (3; 3)
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Tutte le parabole per due punti', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.zero - 1.7, 'i punti base'], [T.zero - 1.7, T.terzo - .1, 'concavità e parabola degenere'], [T.terzo - .1, FINE, 'il terzo punto']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
