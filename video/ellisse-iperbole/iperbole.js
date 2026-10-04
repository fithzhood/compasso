'use strict';
/* L'iperbole — i punti con la stessa differenza delle distanze dai fuochi, |PF₁ − PF₂| = 2a:
   due rami, c² = a² + b², e gli asintoti y = ±(b/a)x. Argomento: ellisse-iperbole. */
CVIDEO.registra('ellisse-iperbole/iperbole', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, makePlane, card, checkMark } = M;

const FINE = 82.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [26.6, 'felice'], [28.8, 'neutro'], [35.0, 'festa'], [38.0, 'sorpreso'], [40.2, 'neutro'],
  [46.8, 'festa'], [49.8, 'pensa'], [52.0, 'neutro'], [66.0, 'felice'], [68.2, 'neutro'],
  [73.0, 'sorpreso'], [75.2, 'neutro'], [FINE + .5, 'felice'], [FINE + 5.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Quali punti hanno la stessa differenza\ndi distanze da due punti fissi?'],
  // 1 · la differenza
  [7.9, 12.2, 'Due punti fissi, i {v:fuochi}\n{mink:F₁} e {mink:F₂}, distano 10.'],
  [12.4, 17.2, 'Cerco i punti {mink:P} per cui la differenza\ndelle distanze vale sempre 8.'],
  [17.4, 22.2, 'Questo 8 lo chiamo {mink:2a}: è più\npiccolo della distanza fra i fuochi.'],
  [22.4, 26.4, 'Ecco un punto {mink:P}: {mx:PF₁ = 12}\ne {my:PF₂ = 4}.'],
  [26.6, 30.2, 'La differenza è {mink:12 − 4 = 8}:\n{mink:P} va bene.'],
  // 2 · i due rami
  [30.6, 34.8, 'Muovo {mink:P} tenendo la differenza\nsempre uguale a 8…'],
  [35.0, 37.8, '…e disegna un {g:ramo}.'],
  [38.0, 42.4, 'Ma ci sono punti anche vicino a {mink:F₁}:\nqui {mink:PF₁ − PF₂ = −8}.'],
  [42.6, 46.6, 'Muovo {mink:P} anche qui, con la\ndifferenza sempre {mink:−8}…'],
  [46.8, 49.6, '…ed ecco il secondo {g:ramo}.'],
  [49.8, 54.6, 'Da una parte 8, dall’altra {mink:−8}:\nper questo si usa il {v:valore assoluto}.'],
  [54.8, 58.8, 'L’{v:iperbole}: i punti con\n{mink:|PF₁ − PF₂| = 2a}, e {mink:2a < F₁F₂}.'],
  // 3 · gli asintoti
  [59.2, 63.4, 'I {v:vertici} distano {mink:a = 4}\ndal centro, i fuochi {mink:c = 5}.'],
  [63.6, 68.0, '{mink:b} è il numero con {mink:c² = a² + b²}:\n{mink:25 = 16 + 9}, quindi {mink:b = 3}.'],
  [68.2, 72.8, 'Il rettangolo largo {mink:2a} e alto {mink:2b}\nha metà diagonale lunga {mink:c}.'],
  [73.0, 77.4, 'Le diagonali, allungate, sono\ngli {v:asintoti}: {mink:y = ±(b/a)x}.'],
  [77.6, 82.0, 'Da lontano: i rami si avvicinano\nagli asintoti senza toccarli.'],
  // chiusura
  [FINE + 1.8, FINE + 8.0, 'Differenza delle distanze costante:\nè questa l’{g:iperbole}.'],
];

// fuochi F₁(−5; 0) e F₂(5; 0), differenza 2a = 8: l'iperbole x²/16 − y²/9 = 1 (a = 4, b = 3, c = 5).
// Rami: x = ±4·ch t, y = 3·sh t. Una sola unità per i due assi, niente numeri sugli assi.
const PL = makePlane({ ox: 575, oy: 455, u: 44, x0: -9.8, x1: 9.7, y0: -7.3, y1: 6.6 });
const CARD = [100, 110, 960, 690];
const O = PL.toS(0, 0), F1 = PL.toS(-5, 0), F2 = PL.toS(5, 0);
const TP0 = Math.asinh(Math.sqrt(6.4 * 6.4 / 16 - 1));   // P(6,4; 3,75): PF₁ = 12, PF₂ = 4
const ramo = (s, t) => [s * 4 * Math.cosh(t), 3 * Math.sinh(t)];
function arcoRamo(s, a, b, n = 160) { const p = []; for (let i = 0; i <= n; i++) p.push(PL.toS(...ramo(s, lerp(a, b, i / n)))); return p; }
// P sul ramo destro: scende, poi sale fino in alto (lì lo spago dei segmenti non passa sulle etichette dei fuochi)
const KR = [[30.8, TP0], [32.6, -1.4], [35.0, 1.4]], KL = [[42.8, TP0], [44.6, -1.4], [46.8, 1.4]];
const SALTO = 38.25;   // P passa al ramo sinistro mentre è invisibile
function posP(t) { return t < SALTO ? ramo(1, kf(t, KR)) : ramo(-1, kf(t, KL)); }
// il tratto di ramo già percorso (in t), poi il ramo intero fino ai bordi
function tratto(t, K, est) {
  const tc = kf(t, K), lo = t < K[1][0] ? Math.min(TP0, tc) : -1.4, hi = t < K[1][0] ? TP0 : Math.max(TP0, tc);
  const x = P(t, est, est + .8);
  return [lerp(lo, -2.7, x), lerp(hi, 2.7, x)];
}
// alla fine il piano si allontana (scala 0,45 attorno all'origine): i rami arrivano molto più in là
const ZOOM = [77.7, 78.9];
const zDi = t => kf(t, [[ZOOM[0], 1], [ZOOM[1], .45]]);
function segmento(ctx, a, b, col, k = 1, w = 6) { if (k > 0) glowStroke(ctx, [a, b], k, col, w); }
function assi(ctx, k, z = 1) {   // con z < 1 il piano è rimpicciolito: assi più lunghi, tratti più spessi, niente x e y
  if (k <= 0) return;
  const { ox, oy, u } = PL, x0 = PL.x0 / z, x1 = PL.x1 / z, y0 = PL.y0 / z, y1 = PL.y1 / z;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5 / z;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3 / z;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  ctx.globalAlpha *= P(z, .85, 1);   // frecce e nomi degli assi se ne vanno mentre il piano si allontana
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy - 2, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u - 6, { size: 44 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’iperbole', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .1) return;
  const al = 1 - P(t, FINE - .7, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(CARD[0] + 2, CARD[1] + 2, CARD[2] - 4, CARD[3] - 4, 20); ctx.clip();
  const z = zDi(t), zl = P(z, .85, 1);   // zl: le etichette se ne vanno quando il piano si allontana
  ctx.save();
  if (z < 1) { ctx.translate(O[0], O[1]); ctx.scale(z, z); ctx.translate(-O[0], -O[1]); }
  assi(ctx, P(t, 7.7, 8.7), z);

  // i due rami: si disegnano dietro a P, poi si allungano fino ai bordi
  if (t > KR[0][0]) { const [a, b] = tratto(t, KR, 35.2); glowStroke(ctx, arcoRamo(1, a, b, 240), 1, C.g, 6 / z); }
  if (t > KL[0][0]) { const [a, b] = tratto(t, KL, 47.0); glowStroke(ctx, arcoRamo(-1, a, b, 240), 1, C.g, 6 / z); }

  // la distanza fra i fuochi: 10
  const d10 = life(t, 10.0, 22.2, .4, .4);
  if (d10 > 0) {
    ctx.save(); ctx.globalAlpha *= d10;
    const y = O[1] - 40;
    ctx.strokeStyle = css(C.v); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(F1[0] + 4, y); ctx.lineTo(F2[0] - 4, y); ctx.stroke();
    arrowHead(ctx, [F1[0], y], Math.PI, C.v, .9); arrowHead(ctx, [F2[0], y], 0, C.v, .9);
    ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(O[0] - 44, y - 30, 88, 60, 12); ctx.fill();
    txt(ctx, '10', O[0], y, { size: 46, weight: 600, color: C.v });
    ctx.restore();
  }

  // 3 · a e c: due tratti paralleli all'asse, uno sopra e uno sotto
  const ac = life(t, 59.6, 68.6, .5, .4);
  if (ac > 0) {
    ctx.save(); ctx.globalAlpha *= ac;
    segmento(ctx, [O[0], O[1] - 8], [PL.toS(4, 0)[0], O[1] - 8], C.y, P(t, 59.8, 60.5));
    drawRich(ctx, '{my:a}', PL.toS(2, 0)[0], O[1] - 42, { size: 46, alpha: P(t, 60.2, 60.6) });
    segmento(ctx, [O[0], O[1] + 8], [F2[0], O[1] + 8], C.x, P(t, 61.6, 62.3));
    drawRich(ctx, '{mx:c}', PL.toS(2.5, 0)[0], O[1] + 42, { size: 46, alpha: P(t, 62.0, 62.4) });
    ctx.restore();
  }
  // b: dal vertice in su, metà altezza del rettangolo che verrà
  const K = PL.toS(4, 3), A2 = PL.toS(4, 0);
  if (t > 64.9) {
    segmento(ctx, A2, K, C.ink, P(t, 65.0, 65.6), 6 / z);
    drawRich(ctx, '{mink:b}', K[0] - 26, PL.toS(0, 1.5)[1], { size: 46, alpha: P(t, 65.4, 65.8) * zl });
  }
  // il rettangolo largo 2a e alto 2b, la metà diagonale lunga c e il compasso che la porta sul fuoco
  if (t > 68.3) {
    const kr = P(t, 68.4, 69.6, E.lin), V = [[4, 3], [-4, 3], [-4, -3], [4, -3], [4, 3]].map(p => PL.toS(...p));
    ctx.save(); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3 / z; ctx.setLineDash([12, 10]); M.partial(ctx, V, kr); ctx.restore();
    segmento(ctx, O, K, C.x, P(t, 70.2, 70.8), 6 / z);
    const ka = P(t, 71.2, 72.4);
    if (ka > 0) {
      const a0 = Math.atan2(3, 4), pts = []; for (let i = 0; i <= 60; i++) pts.push(PL.toS(...[5 * Math.cos(a0 * (1 - i / 60)), 5 * Math.sin(a0 * (1 - i / 60))]));
      ctx.save(); ctx.strokeStyle = css(C.x); ctx.lineWidth = 3 / z; ctx.setLineDash([9, 9]); M.partial(ctx, pts, ka); ctx.restore();
    }
  }
  // gli asintoti: le diagonali allungate, dal centro verso i bordi (abbastanza lunghe anche a piano lontano)
  const kd = P(t, 73.2, 74.6);
  if (kd > 0) for (const m of [.75, -.75]) {
    const L = 11 * kd + 15 * P(t, ZOOM[0], ZOOM[1]);
    glowStroke(ctx, [O, PL.toS(L, m * L)], 1, C.v, 4 / z);
    glowStroke(ctx, [O, PL.toS(-L, -m * L)], 1, C.v, 4 / z);
  }
  if (t > 70.4) {   // c sulla metà diagonale, dalla parte opposta a quella dove passa l'altra diagonale
    const [mx, my] = PL.toS(2, 1.5);
    drawRich(ctx, '{mx:c}', mx - 22, my - 28, { size: 46, alpha: P(t, 70.6, 71.0) * zl });
  }
  // da una parte 8, dall'altra −8: un P fermo per ramo, ciascuno con la sua differenza
  const dd = life(t, 49.9, 59.2, .4, .4);
  if (dd > 0) {
    const R = PL.toS(6.4, 3.747), Lp = PL.toS(...ramo(-1, 1.4));
    ctx.save(); ctx.globalAlpha *= dd;
    dot(ctx, R, C.ink, 1, 12);
    for (const [p, s, v] of [[R, 1, '8'], [Lp, -1, '−8']]) {
      const x = p[0] + s * 50, y = p[1] + 48;
      ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x - 40, y - 26, 80, 52, 12); ctx.fill();
      txt(ctx, v, x, y, { size: 46, weight: 600, color: C.g });
    }
    ctx.restore();
  }

  // P con i segmenti verso i fuochi; sparisce mentre salta sull'altro ramo
  const pa = (t < SALTO ? P(t, 22.5, 22.9, E.back) * (1 - P(t, 37.9, SALTO)) : P(t, SALTO, 38.7, E.back)) * (1 - P(t, 59.0, 59.5));
  if (t > 22.4 && pa > 0) {
    const Ps = PL.toS(...posP(t));
    ctx.save(); ctx.globalAlpha *= Math.min(1, pa);
    segmento(ctx, Ps, F1, C.x, P(t, 23.2, 23.8), 5);
    segmento(ctx, Ps, F2, C.y, P(t, 24.2, 24.8), 5);
    ctx.restore();
    dot(ctx, Ps, C.ink, pa, 12);
    // l'etichetta dalla parte convessa del ramo, solo mentre P è fermo
    const s = t < SALTO ? 1 : -1;
    const lp = t < SALTO ? life(t, 22.7, 30.8, .4, .4) : life(t, 38.6, 42.9, .4, .4);
    if (lp > 0) drawRich(ctx, '{mink:P}', Ps[0] + s * 32, Ps[1] + 36, { size: 44, alpha: lp });
  }
  // il punto che corre lungo il ramo, verso l'asintoto
  const ga = life(t, 78.0, FINE, .4, .5);
  if (ga > 0) {
    const tt = kf(t, [[78.6, TP0], [81.6, 2.25]]), [x, y] = ramo(1, tt);
    const Ps = PL.toS(x, y), Qs = PL.toS(x, .75 * x);
    ctx.save(); ctx.globalAlpha *= ga;
    ctx.strokeStyle = css(C.r); ctx.lineWidth = 4 / z; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(Ps[0], Ps[1]); ctx.lineTo(Qs[0], Qs[1]); ctx.moveTo(Qs[0] - 10 / z, Qs[1]); ctx.lineTo(Qs[0] + 10 / z, Qs[1]); ctx.stroke();
    ctx.restore();
    dot(ctx, Ps, C.ink, ga, 9 / z);
  }

  // i fuochi; le etichette in basso verso l'esterno, nascoste mentre P corre (i segmenti ci passerebbero sopra)
  dot(ctx, F1, C.v, P(t, 8.4, 8.8, E.back), 12 / z);
  dot(ctx, F2, C.v, P(t, 8.9, 9.3, E.back), 12 / z);
  const lf = Math.min(P(t, 8.5, 8.9), 1 - life(t, 30.6, 35.3, .3, .4), 1 - life(t, 42.5, 47.1, .3, .4)) * zl;
  drawRich(ctx, '{mv:F₁}', F1[0] - 32, F1[1] + 44, { size: 44, alpha: lf });
  drawRich(ctx, '{mv:F₂}', F2[0] + 32, F2[1] + 44, { size: 44, alpha: Math.min(lf, P(t, 9.0, 9.4)) });
  // i vertici
  for (const s of [-1, 1]) dot(ctx, PL.toS(4 * s, 0), C.y, P(t, 59.6, 60.0, E.back), 10 / z);
  ctx.restore();
  ctx.restore();
  ctx.restore();
}

// la scheda a destra: le distanze, i numeri, gli asintoti
const PAN = [1110, 110, 730, 690], XS = 1160, XR = 1790, XC = PAN[0] + PAN[2] / 2;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function riga(ctx, label, val, y, col, al, size = 50) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, XS, y, { size, align: 'left' });
  fixedNum(ctx, val, XR, y, size + 4, col);
  ctx.restore();
}
function titolo(ctx, s) { conFont(TITOLI, () => drawRich(ctx, s, XC, 178, { size: 42, weight: 600 })); }
function sceneScheda(ctx, t) {
  if (t < 8.0 || t > FINE + .1) return;
  card(ctx, ...PAN, life(t, 8.1, FINE, .5, .7));
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .7, FINE);
  // 1–2 · le distanze
  const fA = life(t, 8.3, 59.4, .5, .4);
  if (fA > 0) {
    ctx.save(); ctx.globalAlpha *= fA;
    titolo(ctx, 'le distanze');
    riga(ctx, '{mink:F₁F₂ =}', '10', 265, C.v, P(t, 10.4, 10.9));
    riga(ctx, '{mink:2a =}', '8', 340, C.ink, P(t, 17.8, 18.3));
    separa(ctx, 390, P(t, 18.0, 18.4));
    // le cifre mostrate: la differenza viene da quelle sopra; durante il salto di ramo spariscono
    const [x, y] = posP(t);
    const d1 = Math.round(Math.hypot(x + 5, y) * 100) / 100, d2 = Math.round(Math.hypot(x - 5, y) * 100) / 100;
    const salto = 1 - life(t, 37.8, 38.8, .4, .5);
    riga(ctx, '{mx:PF₁ =}', fmtN(d1), 450, C.x, P(t, 23.3, 23.8) * salto);
    riga(ctx, '{my:PF₂ =}', fmtN(d2), 520, C.y, P(t, 24.3, 24.8) * salto);
    separa(ctx, 568, P(t, 26.6, 27.0));
    const kOut = P(t, 51.9, 52.2), kAss = P(t, 52.25, 52.6);
    riga(ctx, '{mink:PF₁ − PF₂ =}', fmtN(d1 - d2), 630, C.g, P(t, 26.8, 27.3) * salto * (1 - kOut));
    riga(ctx, '{mink:|PF₁ − PF₂| =}', fmtN(Math.abs(d1 - d2)), 630, C.g, kAss);
    // il verdetto sul primo P, poi la definizione
    const ok = life(t, 27.4, 30.4, .3, .4);
    if (ok > 0) {
      ctx.save(); ctx.globalAlpha *= ok; checkMark(ctx, XC - 90, 715, P(t, 27.4, 28.2), C.g, .4); ctx.restore();
      drawRich(ctx, '{g:va bene}', XC - 40, 715, { size: 44, align: 'left', alpha: ok });
    }
    drawRich(ctx, '{mink:|PF₁ − PF₂| = 2a}', XC, 708, { size: 44, local: t - 55.0 });
    drawRich(ctx, '{dim:con  }{mink:2a < F₁F₂}', XC, 760, { size: 42, local: t - 56.2 });
    ctx.restore();
  }
  // 3 · i numeri a, b, c
  const fB = life(t, 59.4, 68.6, .5, .4);
  if (fB > 0) {
    ctx.save(); ctx.globalAlpha *= fB;
    titolo(ctx, 'i numeri');
    riga(ctx, '{my:a =}', '4', 265, C.y, P(t, 59.8, 60.3));
    riga(ctx, '{mx:c =}', '5', 340, C.x, P(t, 61.6, 62.1));
    riga(ctx, '{mink:b =}', '3', 415, C.ink, P(t, 65.6, 66.1));
    separa(ctx, 465, P(t, 63.7, 64.1));
    drawRich(ctx, '{mink:c² = a² + b²}', XC, 545, { size: 52, local: t - 63.8 });
    drawRich(ctx, '{mink:25 = 16 + 9}', XC, 635, { size: 46, local: t - 65.0 });
    ctx.restore();
  }
  // 4 · il rettangolo e gli asintoti
  const fC = P(t, 68.2, 68.7);
  if (fC > 0) {
    ctx.save(); ctx.globalAlpha *= fC;
    titolo(ctx, 'gli asintoti');
    riga(ctx, '{mink:2a =}', '8', 265, C.ink, P(t, 68.4, 68.9));
    riga(ctx, '{mink:2b =}', '6', 340, C.ink, P(t, 68.8, 69.3));
    drawRich(ctx, '{dim:metà diagonale}', XS, 405, { size: 32, align: 'left', alpha: P(t, 70.2, 70.7) });
    drawRich(ctx, '{mink:√(4² + 3²) = 5 = }{mx:c}', XR, 462, { size: 44, align: 'right', local: t - 70.4 });
    separa(ctx, 512, P(t, 73.0, 73.4));
    drawSeq(ctx, ['{mv:y}{mink: = ±}', { num: '{mink:b}', den: '{mink:a}' }, '{mink:x}'], XC, 600, 54, { local: t - 73.4 });
    drawSeq(ctx, ['{mv:y}{mink: = ±}', { num: '{mink:3}', den: '{mink:4}' }, '{mink:x}'], XC, 728, 54, { local: t - 74.8 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.8, FINE + 9.8);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Nell’iperbole la {g:differenza} delle distanze\ndai due fuochi è sempre la stessa.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'la definizione', '{mink:|PF₁ − PF₂| = 2a}'], [960, 'i numeri', '{mink:c² = a² + b²}'], [1430, 'gli asintoti', null]];
  pills.forEach(([px, testa, f], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 440, 430, 170);
    drawRich(ctx, testa, px, 478, { size: 30, weight: 400 });
    if (f) drawRich(ctx, f, px, 548, { size: 42 });
    else drawSeq(ctx, ['{mink:y = ±}', { num: '{mink:b}', den: '{mink:a}' }, '{mink:x}'], px, 550, 42);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L’iperbole', durata: FINE + 11, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 30.4, 'la differenza'], [30.4, 59.0, 'i due rami'], [59.0, 68.1, 'vertici e numeri'], [68.1, FINE - .2, 'gli asintoti']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
