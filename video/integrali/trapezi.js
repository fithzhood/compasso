'use strict';
/* Trapezi invece di rettangoli — l'area sotto y = x² fra 0 e 2 (valore vero 8/3 ≈ 2,667) stimata con 4 strisce
   larghe h = 0,5: i rettangoli alti come il lato sinistro danno 0,5 · (0 + 0,25 + 1 + 2,25) = 1,75; inclinando il lato
   di sopra fino alla curva le strisce diventano trapezi e la somma è 0,5 · (0/2 + 0,25 + 1 + 2,25 + 4/2) = 2,75.
   La curva ha la concavità verso l'alto: ogni lato inclinato sta sopra l'arco, quindi la stima è per eccesso.
   Con 8 e 16 trapezi: 2,6875 e 2,671875; errori 1/12 ≈ 0,083, 1/48 ≈ 0,021, 1/192 ≈ 0,0052 (un quarto a ogni
   raddoppio). Conti rifatti con node. Argomento: integrali. */
CVIDEO.registra('integrali/trapezi', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, dashed, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['curva', 5.4, 'Ecco l’area sotto {my:y = }{mx:x}{my:²}\nfra 0 e 2.'],
  ['vero', 6.8, 'Con le primitive viene {g:8/3},\ncirca {g:2,667}: è il valore da stimare.'],
  ['strisce', 6.0, 'Divido l’intervallo in 4 strisce,\nlarghe {mx:h = 0,5}.'],
  ['rett', 6.8, 'Con i rettangoli alti come il lato\nsinistro verrebbe {r:1,75}: troppo poco.'],
  ['inclino', 5.0, 'Ora inclino il lato di sopra fino\nal punto della curva a destra.', .3],
  ['trapezio', 5.6, 'Ogni striscia è un {v:trapezio} coricato:\nle basi sono i due lati verticali.'],
  ['formula', 6.0, 'Area di un trapezio: somma delle basi\ndiviso 2, per l’altezza, qui {mx:h}.'],
  ['somma', 6.0, 'Sommo i 4 trapezi: ogni lato interno\nconta intero, i due estremi a metà.'],
  ['risultato', 6.0, 'In tutto {v:2,75}: molto meglio di 1,75.'],
  ['sopra', 4.8, 'È un po’ {r:troppo}: ogni trapezio\nsporge {r:sopra} la curva.', .3],
  ['concavita', 5.8, 'Colpa della {v:concavità} verso l’alto:\nogni lato inclinato sta sopra l’arco.'],
  ['otto', 4.4, 'Con 8 trapezi: {v:2,6875}.', .3],
  ['sedici', 6.6, 'Con 16: {v:2,671875}, sempre più\nvicino a {g:8/3}.'],
  ['errore', 5.6, 'Guarda l’errore: ogni volta che {mx:h}\nsi dimezza, diventa {g:un quarto}.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Rettangoli o trapezi:\nchi stima meglio un’area?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Trapezi al posto dei rettangoli:\nla stima è molto più vicina.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.vero + .5, 'felice'], [T.strisce, 'neutro'], [T.rett + 1.0, 'pensa'], [T.inclino, 'neutro'],
  [T.risultato + .3, 'felice'], [T.sopra, 'sorpreso'], [T.concavita + .3, 'pensa'], [T.otto, 'neutro'],
  [T.sedici + .5, 'felice'], [T.errore + .3, 'festa'], [T.errore + 3.0, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano: scale diverse in orizzontale e in verticale ----------
const f = x => x * x;
const PCARD = [90, 110, 900, 690], SCARD = [1030, 110, 800, 690];
const X = x => 230 + x * 300, Y = y => 725 - y * 135, S = (x, y) => [X(x), Y(y)];
const CURVA = []; for (let i = 0; i <= 160; i++) { const x = 2.05 * i / 160; CURVA.push(S(x, f(x))); }
// la lente: ingrandisce 6 volte il lato inclinato dell'ultima striscia, a metà
const ZOOM = 6, LC = [450, 300], LR = 120, SP = S(1.75, 3.1);
const L = p => [LC[0] + ZOOM * (p[0] - SP[0]), LC[1] + ZOOM * (p[1] - SP[1])];
const id = p => p;
function poligono(ctx, pts, mappa, fill, stroke, w) {
  ctx.beginPath(); pts.forEach((p, i) => { const q = mappa(p); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
// l'arco di curva da a a b (punti dello schermo)
const arco = (a, b, m = 24) => { const p = []; for (let j = 0; j <= m; j++) { const x = lerp(a, b, j / m); p.push(S(x, f(x))); } return p; };
// le strisce: rettangoli alti come il lato sinistro; con kt il lato di sopra si inclina fino al punto della curva a destra
function strisce(ctx, n, al, kt, grow, mappa) {
  if (al <= 0) return;
  const h = 2 / n, col = mix(C.x, C.v, kt);
  ctx.save(); ctx.globalAlpha *= al;
  for (let i = 0; i < n; i++) {
    const a = i * h, b = a + h, g = E.out(clamp(grow * 1.6 - i / n * .6));
    if (g <= 0) continue;
    const y0 = f(a) * g, y1 = (f(a) + (f(b) - f(a)) * kt) * g;
    poligono(ctx, [S(a, 0), S(b, 0), S(b, y1), S(a, y0)], mappa, css(col, .22), css(col, .95), n > 8 ? 2 : 3);
  }
  ctx.restore();
}
// i pezzi rossi: fra la curva e il tetto dei rettangoli (manca), o fra il lato inclinato e la curva (avanza)
function pezzi(ctx, n, al, avanza, mappa) {
  if (al <= 0) return;
  const h = 2 / n;
  ctx.save(); ctx.globalAlpha *= al;
  for (let i = 0; i < n; i++) {
    const a = i * h, b = a + h;
    const pts = arco(a, b).concat(avanza ? [] : [S(b, f(a))]);
    poligono(ctx, pts, mappa, css(C.r, .5));
  }
  ctx.restore();
}
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Trapezi invece di rettangoli', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// quanti trapezi: [inizio del passaggio, n]
const PASSI = [[0, 4], [T.otto + .3, 8], [T.sedici + .3, 16]];
// 1 · il piano (7.2–FINE)
function scenePiano(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  // gli assi, con i numeri dove la curva non passa: sotto l'asse x e a sinistra dell'asse y
  const ka = P(t, 7.4, 8.2);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(-.25), Y(0)); ctx.lineTo(X(2.3), Y(0)); ctx.moveTo(X(0), Y(-.22)); ctx.lineTo(X(0), Y(4.25)); ctx.stroke();
    ctx.lineWidth = 2;
    [.5, 1, 1.5, 2].forEach(x => { ctx.beginPath(); ctx.moveTo(X(x), Y(0) - 8); ctx.lineTo(X(x), Y(0) + 8); ctx.stroke(); });
    [1, 2, 3, 4].forEach(y => { ctx.beginPath(); ctx.moveTo(X(0) - 8, Y(y)); ctx.lineTo(X(0) + 8, Y(y)); ctx.stroke(); });
    ctx.restore();
    arrowHead(ctx, [X(2.3) + 6, Y(0)], 0, C.ink); arrowHead(ctx, [X(0), Y(4.25) - 6], -Math.PI / 2, C.ink);
    ctx.save(); ctx.globalAlpha *= P(ka, .6, 1);
    drawRich(ctx, '{mx:x}', X(2.3) + 36, Y(0), { size: 44 });
    drawRich(ctx, '{my:y}', X(0) + 32, Y(4.25) - 4, { size: 44 });
    [['0,5', .5], ['1', 1], ['1,5', 1.5], ['2', 2]].forEach(([s, x]) => txt(ctx, s, X(x), Y(0) + 34, { size: 30, color: C.dim }));
    [1, 2, 3, 4].forEach(y => txt(ctx, String(y), X(0) - 22, Y(y), { size: 30, color: C.dim, align: 'right' }));
    txt(ctx, '0', X(0) - 20, Y(0) + 32, { size: 30, color: C.dim, align: 'right' });
    ctx.restore();
  }
  // la regione sotto la curva: piena all'inizio, tenue sotto le strisce
  const reg = P(t, T.curva + 1.0, T.curva + 1.6) * (1 - .6 * P(t, T.rett + .2, T.rett + .8));
  if (reg > 0) { ctx.save(); ctx.globalAlpha *= reg; poligono(ctx, [S(0, 0)].concat(arco(0, 2, 60), [S(2, 0)]), id, css(C.g, .22)); ctx.restore(); }
  dashed(ctx, S(2, 0), S(2, 4), C.dim, P(t, T.curva + 1.0, T.curva + 1.6), .8);
  // le divisioni in strisce, finché non arrivano i rettangoli
  const kd = P(t, T.strisce + .3, T.strisce + .9) * (1 - P(t, T.rett + .2, T.rett + .6));
  if (kd > 0) [.5, 1, 1.5].forEach(x => dashed(ctx, S(x, 0), S(x, f(x)), C.v, kd, .8));
  // h: la larghezza della seconda striscia, con la freccia doppia sopra
  const kh = life(t, T.strisce + .6, T.formula + 6.0, .4, .5);
  if (kh > 0) {
    ctx.save(); ctx.globalAlpha *= kh; ctx.strokeStyle = css(C.x); ctx.lineWidth = 3;
    const yh = Y(1.25), xa = X(.5) + 4, xb = X(1) - 4;
    ctx.beginPath(); ctx.moveTo(xa + 10, yh); ctx.lineTo(xb - 10, yh); ctx.stroke(); ctx.restore();
    arrowHead(ctx, [xa, yh], Math.PI, C.x, .8 * kh); arrowHead(ctx, [xb, yh], 0, C.x, .8 * kh);
    lab(ctx, '{mx:h}', (xa + xb) / 2, yh - 30, kh);
  }
  // rettangoli → trapezi, poi sempre più sottili
  const ks = P(t, T.rett + .2, T.rett + .3);
  if (ks > 0) {
    const kt = P(t, T.inclino + .3, T.inclino + 1.8);
    for (let i = 0; i < PASSI.length; i++) {
      const [t0, n] = PASSI[i], nx = PASSI[i + 1];
      const a = Math.min(i === 0 ? 1 : P(t, t0, t0 + .7), nx ? 1 - P(t, nx[0], nx[0] + .7) : 1);
      if (a > 0) strisce(ctx, n, a, kt, i === 0 ? P(t, T.rett + .2, T.rett + 1.2, E.lin) : 1, id);
    }
    pezzi(ctx, 4, P(t, T.rett + 1.0, T.rett + 1.4) * (1 - P(t, T.inclino + .3, T.inclino + .8)), false, id);
    pezzi(ctx, 4, life(t, T.sopra + .3, T.otto + .6, .5, .5), true, id);
  }
  // le basi di un trapezio: i due lati verticali della terza striscia
  const kb = life(t, T.trapezio + .3, T.formula + 6.0, .4, .5);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.y); ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(...S(1, 0)); ctx.lineTo(...S(1, 1)); ctx.moveTo(...S(1.5, 0)); ctx.lineTo(...S(1.5, 2.25)); ctx.stroke(); ctx.restore();
  }
  // le basi dei trapezi, cioè i valori di x², in alto a sinistra di ogni lato verticale (lì la curva non passa)
  const kq = life(t, T.somma + .3, T.sopra + .3, .5, .5);
  if (kq > 0) [['0,25', .5, -40, -31], ['1', 1, -26, -30], ['2,25', 1.5, -50, -29], ['4', 2, -26, -25]].forEach(([s, x, dx, dy]) =>
    txt(ctx, s, X(x) + dx, Y(f(x)) + dy, { size: 34, weight: 600, color: C.y, alpha: kq }));
  // la curva (sopra le strisce) e il suo nome
  glowStroke(ctx, CURVA, P(t, T.curva + .2, T.curva + 1.4, E.lin), C.y, 5);
  if (t > T.curva + 1.2) drawRich(ctx, '{my:y = }{mx:x}{my:²}', X(2) + 20, Y(4) + 40, { size: 40, align: 'left', local: t - T.curva - 1.2 });
  // i lati inclinati, accesi quando Ada dice che stanno sopra l'arco
  const kc = life(t, T.concavita + .3, T.otto + .3, .4, .5);
  if (kc > 0) for (let i = 0; i < 4; i++) glowStroke(ctx, [S(i * .5, f(i * .5)), S(i * .5 + .5, f(i * .5 + .5))], 1, C.v, 6 * kc);
  sceneLente(ctx, t);
  ctx.restore();
}

// la lente: il lato inclinato dell'ultima striscia, ingrandito 6 volte
function sceneLente(ctx, t) {
  const ka = P(t, T.sopra + .4, T.sopra + 1.2, E.out) * (1 - P(t, T.otto, T.otto + .5));
  if (ka <= 0) return;
  ctx.save(); ctx.globalAlpha *= ka;
  ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(SP[0], SP[1], 14, 0, 2 * Math.PI); ctx.stroke();
  const dx = LC[0] - SP[0], dy = LC[1] - SP[1], d = Math.hypot(dx, dy);
  ctx.beginPath(); ctx.moveTo(SP[0] + dx / d * 14, SP[1] + dy / d * 14); ctx.lineTo(LC[0] - dx / d * LR, LC[1] - dy / d * LR); ctx.stroke();
  txt(ctx, 'ingrandito 6 volte', LC[0], LC[1] - LR - 26, { size: 30, color: C.dim });
  ctx.save();
  ctx.beginPath(); ctx.arc(LC[0], LC[1], LR * ka, 0, 2 * Math.PI); ctx.fillStyle = C.paper; ctx.fill(); ctx.clip();
  poligono(ctx, [S(1.5, 0), S(2, 0), S(2, 4), S(1.5, 2.25)], L, css(C.v, .22));
  pezzi(ctx, 4, 1, true, L);
  ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(...L(S(1.5, 2.25))); ctx.lineTo(...L(S(2, 4))); ctx.stroke();
  glowStroke(ctx, arco(1.5, 2, 60).map(L), 1, C.y, 5);
  ctx.restore();
  ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(LC[0], LC[1], LR * ka, 0, 2 * Math.PI); ctx.stroke();
  ctx.restore();
}

// 2 · la scheda a destra (T.vero–FINE)
const XL = 1080, XR = 1790, XC = 1430;
function riga(ctx, nome, val, y, al, size = 44) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{dim:' + nome + '}', XL, y, { size: 32, align: 'left' });
  drawRich(ctx, val, XR, y, { size, align: 'right' });
  ctx.restore();
}
const TAB = [[4, '0,5', '2,75', '≈ 0,083'], [8, '0,25', '2,6875', '≈ 0,021'], [16, '0,125', '2,671875', '≈ 0,0052']];
const COL = [1110, 1250, 1470, 1700];
function sceneScheda(ctx, t) {
  if (t < T.vero || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...SCARD, P(t, T.vero, T.vero + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori * P(t, T.vero + .2, T.vero + .6);
  conFont(TITOLI, () => drawRich(ctx, 'stima dell’area', XC, 172, { size: 40, weight: 600 }));
  riga(ctx, 'valore vero', '{mg:8/3 ≈ 2,667}', 248, 1);
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 295); ctx.lineTo(XR, 295); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= fuori;
  // prima parte: 4 strisce, rettangoli e trapezi
  const kA = 1 - P(t, T.otto, T.otto + .5);
  if (kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    riga(ctx, 'strisce', '{mink:4,  }{mx:h}{mink: = 0,5}', 345, P(t, T.strisce + .6, T.strisce + 1.0));
    riga(ctx, '4 rettangoli', '{mr:1,75}', 405, P(t, T.rett + .6, T.rett + 1.0));
    if (t > T.formula + .3) drawSeq(ctx, ['{ink:area }{mink:= }', { num: '{y:base}{mink: + }{y:base}', den: '{mink:2}' }, '{mink: · }{mx:h}'], XC, 498, 44, { local: t - T.formula - .3 });
    if (t > T.somma + .5) drawRich(ctx, '{mink:0,5 · (0/2 + 0,25 + 1 + 2,25 + 4/2)}', XC, 600, { size: 40, local: t - T.somma - .5 });
    if (t > T.risultato + .3) drawRich(ctx, '{mink:= 0,5 · 5,5 = }{mv:2,75}', XR, 668, { size: 44, align: 'right', local: t - T.risultato - .3 });
    if (t > T.sopra + .6) drawRich(ctx, '{mv:2,75}{mink: > }{mg:2,667}', XC, 745, { size: 40, local: t - T.sopra - .6 });
    ctx.restore();
  }
  // seconda parte: la tabella, e l'errore che cala di un quarto
  const kB = P(t, T.otto + .4, T.otto + .9);
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    txt(ctx, 'trapezi', COL[0], 348, { size: 30, color: C.dim });
    drawRich(ctx, '{mx:h}', COL[1], 348, { size: 36 });
    txt(ctx, 'stima', COL[2], 348, { size: 30, color: C.dim });
    txt(ctx, 'errore', COL[3], 348, { size: 30, color: C.dim, alpha: P(t, T.errore + .2, T.errore + .6) });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 382); ctx.lineTo(XR, 382); ctx.stroke();
    TAB.forEach(([n, h, s, e], i) => {
      const y = 435 + i * 64, k = i < 2 ? 1 : P(t, T.sedici + .4, T.sedici + .8), ke = P(t, T.errore + .4 + i * .3, T.errore + .8 + i * .3);
      txt(ctx, String(n), COL[0], y, { size: 40, alpha: k });
      txt(ctx, h, COL[1], y, { size: 40, color: C.x, alpha: k });
      txt(ctx, s, COL[2], y, { size: 40, color: C.v, alpha: k });
      txt(ctx, e, COL[3], y, { size: 40, color: C.r, alpha: ke });
    });
    drawRich(ctx, '{mx:h}{dim: a metà  →  errore }{g:diviso 4}', XC, 660, { size: 38, alpha: P(t, T.errore + 1.4, T.errore + 1.9) });
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Con i {v:trapezi} il lato di sopra\nsegue la curva: l’errore si riduce.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'i due estremi {v:a metà}'], [960, '{r:sopra} la curva: concavità\nverso l’alto'], [1430, 'per {my:x²}: {mx:h} a metà,\nerrore {g:diviso 4}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 515); ctx.scale(k, k); ctx.translate(-x, -515);
    card(ctx, x - 215, 450, 430, 130);
    drawRich(ctx, s, x, 515, { size: 32, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la curva e le altezze delle strisce
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.2], ['traccia', 7.4, 8.2],                                                       // gli assi
    ['tono', T.curva + .2, T.curva + 1.4, [0, .02, .06, .14, .25, .39, .56, .77, 1]],               // la parabola sale
    ['traccia', T.curva + 1.0, T.curva + 1.6], ['pop', T.curva + 1.3, .6],                          // la regione, y = x²
    ['soffio', T.vero], ['ding', T.vero + .4],                                                      // il valore vero
    ['traccia', T.strisce + .3, T.strisce + .9], ['pop', T.strisce + .7, .5],                       // le strisce, h
    ['tono', T.rett + .2, T.rett + 1.2, [0, .06, .25, .56]], ['pop', T.rett + 1.0, .2],             // i rettangoli crescono; manca un pezzo
    ['tono', T.inclino + .3, T.inclino + 1.8, [.3, .5, .7]],                                        // il lato di sopra si inclina
    ['pop', T.trapezio + .4, .45], ['pop', T.formula + .4, .55],                                    // le basi, la formula
    ['pop', T.somma + .5, .5], ['ding', T.risultato + .4],                                          // la somma, 2,75
    ['pop', T.sopra + .3, .7], ['soffio', T.sopra + .4],                                            // i pezzi che avanzano, la lente
    ['traccia', T.concavita + .3, T.concavita + .8],                                                // i lati inclinati
    ['tono', T.otto + .3, T.otto + 1.0, [.6, .5]], ['pop', T.otto + .5, .5],                        // 8 trapezi
    ['tono', T.sedici + .3, T.sedici + 1.0, [.5, .4]], ['pop', T.sedici + .5, .45],                 // 16 trapezi
    ['pop', T.errore + .5, .6], ['pop', T.errore + .8, .45], ['pop', T.errore + 1.1, .3], ['ding', T.errore + 1.6],   // l'errore si divide per 4
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Trapezi invece di rettangoli', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, T.inclino - .2, 'l’area da stimare'], [T.inclino - .2, T.otto - .2, 'i trapezi'], [T.otto - .2, FINE, 'più sottili']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
