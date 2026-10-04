'use strict';
/* Scomporre è trovare i lati — le tessere di x² + 5x + 6 si ricompongono nel rettangolo (x + 2)(x + 3):
   due numeri con somma 5 e prodotto 6. Argomento: scomposizione (sezione «Il trinomio speciale»). */
CVIDEO.registra('scomposizione/rettangolo', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, card, checkMark, crossMark } = M;

const FINE = 98.1;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.2, 'pensa'], [7.9, 'neutro'],
  [47.6, 'sorpreso'], [51.1, 'pensa'], [53.8, 'neutro'], [64.6, 'festa'], [68.9, 'neutro'],
  [73.1, 'felice'], [77.9, 'neutro'], [89.2, 'felice'], [92.6, 'neutro'], [100.3, 'felice'], [104.3, 'occhiolino'],
];
// una frase per ogni cosa che succede; ogni tessera che si sposta ha il suo fumetto
const FUMETTI = [
  [2.4, 6.3, 'Un polinomio può diventare\nun rettangolo?'],
  [7.9, 11.4, 'Prendiamo il polinomio\n{mink:x² + 5x + 6}.'],
  [11.6, 16.7, 'Un quadrato di lato {mx:x}: area {mx:x}{mink:²}.\nQui {mx:x} è una lunghezza, positiva.'],
  [16.9, 22.4, 'Cinque rettangoli di lati {mx:x} e 1:\nognuno ha area {mx:x}, in tutto 5{mx:x}.'],
  [22.6, 26.4, 'Sei quadratini di lato 1:\nin tutto, area 6.'],
  [26.5, 31.4, 'Scomporre è scriverlo come prodotto:\ncon le tessere, formare un {v:rettangolo}.'],
  [32.0, 35.4, 'Il quadrato va in un angolo.'],
  [35.6, 41.1, 'Parto dai sei quadratini: li metto\nnell\'angolo opposto, in fila: 6 per 1.'],
  [41.3, 46.1, 'Per chiudere il rettangolo servono\n6 rettangoli in piedi e 1 sdraiato.'],
  [46.3, 50.9, 'Metto i 5 rettangoli: {r:due posti}\nrestano vuoti, ne servivano 7.'],
  [51.1, 53.6, 'Riprovo: tolgo i rettangoli.'],
  [53.8, 56.9, 'Metto i quadratini 3 per 2.'],
  [57.1, 61.0, 'Servono 3 rettangoli in piedi\ne 2 sdraiati: 5.'],
  [61.1, 64.3, 'Metto i rettangoli al loro posto.'],
  [64.5, 68.5, '{g:Ci sono tutti}: le tessere fanno\nun rettangolo, senza buchi.'],
  [68.7, 72.7, 'L\'altezza è {mx:x}{mink: + 2},\nla base è {mx:x}{mink: + 3}.'],
  [72.9, 77.7, 'L\'area non cambia: ora è un prodotto,\n{mink:x² + 5x + 6 = (x + 2)(x + 3)}.'],
  [77.9, 82.5, 'I due numeri sono 3 e 2: somma 5,\ncome i {v:rettangoli}…'],
  [82.7, 87.7, '…e prodotto 6: i {v:quadratini}. Si parte\ndal prodotto: ha meno possibilità.'],
  [87.9, 92.4, 'Rimoltiplicando torna: vale per\n{g:ogni} {mx:x}, non solo per {mx:x} positivo.'],
  [92.6, 97.6, 'Per {mink:x² + sx + p}, con 1 davanti a {mx:x}{mink:²}:\ndue numeri, somma {mink:s} e prodotto {mink:p}.'],
  [100.3, 105.9, 'Scomporre è trovare i lati: due\nnumeri, con somma 5 e prodotto 6.'],
];

// ---- le misure: lato x = 225 px, lato 1 = 50 px; tutto poggia sulla riga y = 740 ----
const U = 50, X = 225, BASE = 740;
const CX0 = 405, CY0 = 515;                       // angolo in alto a destra del quadrato montato
const SQ_P = [912.5, 627.5], SQ_A = [292.5, 627.5];  // il quadrato: nel mucchio e nel rettangolo
const RP = i => [1105 + 68 * i, 627.5];             // i rettangoli nel mucchio
const VS = j => [CX0 + 25 + 50 * j, 627.5];         // posti dei rettangoli in piedi
const HS = k => [292.5, CY0 - 25 - 50 * k];         // posti dei rettangoli sdraiati
const CC = (c, r) => [CX0 + 25 + 50 * c, CY0 - 25 - 50 * r];   // l'angolo dei quadratini
const QP = [[1567, 591], [1536, 653], [1598, 653], [1505, 715], [1567, 715], [1629, 715]];
const BAND = 385;    // corsia alta: lì le tessere viaggiano sopra tutto il resto
const R90 = Math.PI / 2;

// percorso a fotogrammi chiave: [[t, x, y, rot], ...] → [x, y, rot]
function percorso(t, keys) {
  return [1, 2, 3].map(c => kf(t, keys.map(k => [k[0], k[c]])));
}
function tessera(ctx, [x, y, r], w, h, col, al = 1, hl = 0) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.rotate(r);
  ctx.fillStyle = css(col, .2 + .25 * hl); ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.strokeStyle = css(col); ctx.lineWidth = 3 + 3 * hl; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.restore();
}
function posto(ctx, x, y, w, h, al, rosso = 0) {   // posto vuoto tratteggiato (angolo in alto a sinistra)
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  if (rosso > 0) { ctx.fillStyle = css(C.r, .14 * rosso); ctx.fillRect(x, y, w, h); }
  ctx.setLineDash([10, 8]); ctx.lineWidth = 3;
  ctx.strokeStyle = rosso > .5 ? css(C.r) : css(C.dim, .9); ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
  ctx.restore();
}
function quota(ctx, a, b, al) {   // linea di misura con le stanghette
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  const vert = a[0] === b[0], d = 9;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
  for (const p of [a, b]) { if (vert) { ctx.moveTo(p[0] - d, p[1]); ctx.lineTo(p[0] + d, p[1]); } else { ctx.moveTo(p[0], p[1] - d); ctx.lineTo(p[0], p[1] + d); } }
  ctx.stroke(); ctx.restore();
}

// i percorsi delle tessere, dall'arrivo alla fine
const KQ = [[11.7, ...SQ_P, 0], [32.1, ...SQ_P, 0], [33.1, ...SQ_A, 0]];
// i quadratini: si alzano nella corsia, scorrono a sinistra, scendono nell'angolo (prima quello in cima)
const KS = QP.map((p, i) => {
  const s = 35.7 + .25 * i, c = CC(i, 0);
  const k = [[22.7, ...p, 0], [s, ...p, 0], [s + .3, p[0], BAND, 0], [s + .9, c[0], BAND, 0], [s + 1.1, ...c, 0]];
  if (i >= 3) {   // 3 per 2: gli ultimi tre salgono di una fila e scorrono a sinistra
    const a = 53.9 + .3 * (i - 3), d = CC(i - 3, 1);
    k.push([a, ...c, 0], [a + .25, c[0], d[1], 0], [a + .75, ...d, 0]);
  }
  return k;
});
// i rettangoli: 6 per 1 (cinque in piedi), di nuovo nel mucchio, poi 3 per 2 (tre in piedi, due sdraiati)
const KR = [0, 1, 2, 3, 4].map(i => {
  const b = 46.4 + .15 * i, c = 51.2 + .12 * (4 - i);
  const k = [[17.0, ...RP(i), 0], [b, ...RP(i), 0], [b + .7, ...VS(i), 0], [c, ...VS(i), 0], [c + .6, ...RP(i), 0]];
  if (i < 3) { const d = 61.2 + .1 * i; k.push([d, ...RP(i), 0], [d + .6, ...VS(i), 0]); }
  else {
    // sdraiati: scorrono nello spazio libero, girano, salgono nella corsia, vanno sopra il quadrato e scendono
    const a = i === 3 ? 61.9 : 62.5, h = HS(i - 3);
    k.push([a, ...RP(i), 0], [a + .3, 925, 627.5, 0], [a + .55, 925, 627.5, R90], [a + .8, 925, BAND, R90],
      [a + 1.25, 292.5, BAND, R90], [a + 1.45, ...h, R90]);
  }
  return k;
});

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Scomporre è trovare i lati', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · le tessere e il rettangolo (7.5–FINE)
function sceneTessere(ctx, t) {
  if (t < 7.5 || t > FINE + .8) return;
  const al = 1 - P(t, FINE, FINE + .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 100, 350, 1720, 450, P(t, 7.5, 8.2));
  // i posti vuoti, sotto le tessere
  const p1 = life(t, 41.4, 51.6, .5, .5), rosso = P(t, 47.5, 47.9);
  for (let j = 0; j < 6; j++) posto(ctx, CX0 + 50 * j, CY0, U, X, p1, j === 5 ? rosso : 0);
  posto(ctx, 180, CY0 - U, X, U, p1, rosso);
  const p2 = life(t, 57.2, 64.6, .5, .4);
  for (let j = 0; j < 3; j++) posto(ctx, CX0 + 50 * j, CY0, U, X, p2);
  for (let k = 0; k < 2; k++) posto(ctx, 180, CY0 - U * (k + 1), X, U, p2);
  // le tessere
  const hR = life(t, 78.0, 82.5, .4, .4), hQ = life(t, 82.8, 87.7, .4, .4);
  tessera(ctx, percorso(t, KQ), X, X, C.x, P(t, 11.7, 12.2));
  KR.forEach((k, i) => tessera(ctx, percorso(t, k), U, X, C.y, P(t, 17.0 + .12 * i, 17.4 + .12 * i), hR));
  KS.forEach((k, i) => tessera(ctx, percorso(t, k), U, U, C.v, P(t, 22.7 + .1 * i, 23.1 + .1 * i), hQ));
  // nomi dei lati nel mucchio: escono prima che le tessere si muovano
  const nomi = 1 - P(t, 31.4, 31.9);
  ctx.save(); ctx.globalAlpha *= nomi;
  drawRich(ctx, '{mx:x}', SQ_P[0], 490, { size: 44, alpha: P(t, 12.3, 12.7) });
  drawRich(ctx, '{mx:x}', 772, SQ_P[1], { size: 44, alpha: P(t, 12.3, 12.7) });
  drawRich(ctx, '{mink:1}', RP(0)[0], 490, { size: 44, alpha: P(t, 18.0, 18.4) });
  drawRich(ctx, '{mx:x}', 1430, RP(4)[1], { size: 44, alpha: P(t, 18.0, 18.4) });
  drawRich(ctx, '{mink:1}', QP[0][0], 541, { size: 44, alpha: P(t, 23.5, 23.9) });
  // sotto il mucchio si legge il polinomio, pezzo per pezzo
  drawRich(ctx, '{mx:x}{mink:²}', SQ_P[0], 774, { size: 44, alpha: P(t, 12.6, 13.0) });
  drawRich(ctx, '{mink:+ 5}{mx:x}', 1218, 774, { size: 44, alpha: P(t, 18.3, 18.7) });
  drawRich(ctx, '{mink:+ 6}', 1545, 774, { size: 44, alpha: P(t, 23.8, 24.2) });
  ctx.restore();
  // le misure del rettangolo finito
  const qa = P(t, 68.9, 69.4), qb = P(t, 69.3, 69.8);
  quota(ctx, [180, 754], [CX0, 754], qb); quota(ctx, [CX0, 754], [CX0 + 3 * U, 754], qb);
  drawRich(ctx, '{mx:x}', 292.5, 777, { size: 44, alpha: qb });
  drawRich(ctx, '{mg:3}', CX0 + 75, 777, { size: 44, alpha: qb });
  quota(ctx, [578, BASE], [578, CY0], qa); quota(ctx, [578, CY0], [578, CY0 - 2 * U], qa);
  drawRich(ctx, '{mx:x}', 606, 627.5, { size: 44, alpha: qa });
  drawRich(ctx, '{mg:2}', 606, CY0 - U, { size: 44, alpha: qa });
  ctx.restore();
}

function cella(ctx, x, y, w, h, al) {   // riquadro che indica una casella della tabella
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 14); ctx.stroke(); ctx.restore();
}
// le due schede in alto: il polinomio, poi la tabella dei tentativi, il controllo, il caso generale
function sceneConti(ctx, t) {
  if (t < 7.5 || t > FINE + .8) return;
  const al = 1 - P(t, FINE, FINE + .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 100, 110, 960, 210, P(t, 7.6, 8.2));
  drawRich(ctx, '{mink:x² + 5x + 6}', 506, 190, { size: 54, align: 'right', local: t - 8.2 });
  const kp = life(t, 26.8, 73.3, .5, .4);
  drawRich(ctx, '{mink:= (}{mv:?}{mink:)(}{mv:?}{mink:)}', 528, 190, { size: 54, align: 'left', alpha: kp, local: t - 26.8 });
  drawRich(ctx, '{mink:= (x + }{mg:2}{mink:)(x + }{mg:3}{mink:)}', 528, 190, { size: 54, align: 'left', alpha: P(t, 73.3, 73.8), local: t - 73.3 });
  drawRich(ctx, '{dim:area di un }{v:rettangolo}{dim: = altezza · base}', 580, 272, { size: 34, local: t - 27.6 });

  card(ctx, 1100, 110, 720, 210, P(t, 35.8, 36.4));
  // la tabella dei tentativi (dal 36 alla fine)
  if (t > 35.8) {
    ctx.save();
    drawRich(ctx, '{dim:6 quadratini}', 1310, 152, { size: 32, alpha: P(t, 36.0, 36.4) });
    drawRich(ctx, '{dim:5 rettangoli}', 1570, 152, { size: 32, alpha: P(t, 36.0, 36.4) });
    if (t > 37.0) drawRich(ctx, '{mink:6 · 1 = 6}', 1310, 212, { size: 44, local: t - 37.0 });
    if (t > 41.9) drawRich(ctx, '{mink:6 + 1 = }{mr:7}', 1570, 212, { size: 44, local: t - 41.9 });
    crossMark(ctx, 1752, 212, P(t, 47.8, 48.5), C.r, .28);
    if (t > 55.3) drawRich(ctx, '{mink:3 · 2 = 6}', 1310, 272, { size: 44, local: t - 55.3 });
    if (t > 57.7) drawRich(ctx, '{mink:3 + 2 = }{mg:5}', 1570, 272, { size: 44, local: t - 57.7 });
    checkMark(ctx, 1752, 272, P(t, 64.6, 65.3), C.g, .28);
    cella(ctx, 1570, 272, 230, 60, life(t, 78.0, 82.5, .4, .4));
    cella(ctx, 1310, 272, 230, 60, life(t, 82.8, 87.7, .4, .4));
    ctx.restore();
  }
  // nello spazio libero a destra del rettangolo: il controllo (86–90.5), poi il caso generale (91–FINE)
  const ca = life(t, 88.1, 92.8, .4, .4);
  if (ca > 0) {
    ctx.save(); ctx.globalAlpha *= ca;
    const EQ = 1190;   // la colonna degli uguali
    drawRich(ctx, '{mink:(x + 2)(x + 3)}', EQ - 14, 480, { size: 50, align: 'right', local: t - 88.2 });
    drawRich(ctx, '{mink:= x² + 3x + 2x + 6}', EQ, 480, { size: 50, align: 'left', local: t - 88.6 });
    drawRich(ctx, '{mink:= x² + 5x + 6}', EQ, 565, { size: 50, align: 'left', local: t - 89.0 });
    checkMark(ctx, EQ + 390, 565, P(t, 89.3, 90.0), C.g, .32);
    drawRich(ctx, '{dim:vale per }{g:ogni}{dim: }{mx:x}', 1240, 670, { size: 36, local: t - 89.5 });
    ctx.restore();
  }
  if (t > 92.8) {
    drawRich(ctx, '{mink:x² + }{mv:s}{mink:x + }{mv:p}', 1240, 470, { size: 64, local: t - 92.9 });
    drawRich(ctx, '{dim:due numeri: }{v:somma}{dim: }{mv:s}{dim:, }{v:prodotto}{dim: }{mv:p}', 1240, 575, { size: 40, local: t - 93.3 });
    drawRich(ctx, "{dim:se davanti a }{mx:x}{mink:²}{dim: c'è 1}", 1240, 665, { size: 36, local: t - 93.7 });
  }
  ctx.restore();
}

// 4 · in una frase (FINE–107)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 106.5, 107.5);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Scomporre è trovare i {g:lati}\ndel rettangolo delle tessere.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mink:x² + 5x + 6}\n{mink:= (x + 2)(x + 3)}', 40], [960, 'due numeri:\nsomma {g:5}, prodotto {g:6}', 33], [1430, 'si parte\ndal {v:prodotto}', 33]];
  pills.forEach(([x, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 440, 430, 140);
    drawRich(ctx, s, x, 512, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Scomporre è trovare i lati', durata: 108.9, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 31.8, 'le tessere'], [31.8, 68.6, 'il rettangolo'], [68.6, FINE - .2, 'somma e prodotto']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneTessere(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
