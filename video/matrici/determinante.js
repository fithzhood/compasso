'use strict';
/* Il determinante è un'area — la matrice (2 1; 1 3) trasforma il quadratino di lato 1 nel parallelogramma di vertici
   O, (2; 1), (3; 4), (1; 3): rettangolo 3 · 4 = 12 meno sei pezzi 1 + 1 + 1 + 1 + 1,5 + 1,5 = 7, resta 5, proprio
   2 · 3 − 1 · 1 = 5. Con (2 4; 1 2) le colonne stanno sulla stessa retta: tutto si schiaccia, det = 2 · 2 − 4 · 1 = 0.
   Con le colonne scambiate, (1 2; 3 1), stesso parallelogramma ma la bandierina è ribaltata: det = 1 · 1 − 2 · 3 = −5,
   area |−5| = 5. Determinante fra barre come in argomenti/sistemi-lineari.js: |a b; c d| = ad − bc.
   Argomento: matrici (non c'è ancora: sezione «Il determinante»). */
CVIDEO.registra('matrici/determinante', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, richW, txt, dot, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['quadratino', 6.0, 'Il quadratino di lato 1 ha area 1;\nla bandierina dice da che parte guarda.'],
  ['matrice', 4.4, 'Lo muovo con questa {v:matrice}.'],
  ['diventa', 6.0, 'Diventa un {v:parallelogramma}, coi lati\nsulle colonne {x:(2; 1)} e {y:(1; 3)}.'],
  ['rett', 5.0, 'Lo chiudo in un rettangolo\n3 per 4: area 12.'],
  ['pezzi', 7.0, 'Tolgo i sei pezzi intorno:\n{mink:1 + 1 + 1 + 1 + 1,5 + 1,5 = 7}.'],
  ['resta', 6.0, 'Resta {mink:12 − 7 =} {g:5}: il parallelogramma\nvale cinque quadratini.'],
  ['det', 6.0, 'Il {v:determinante} fa lo stesso conto:\ndiagonale che scende meno l’altra.'],
  ['det5', 5.4, 'Qui {mink:2 · 3 − 1 · 1 =} {g:5}.\nProprio l’area!'],
  ['zero', 5.4, 'Riparto dal quadratino,\ncon un’altra matrice…'],
  ['schiaccia', 6.4, '…le colonne {x:(2; 1)} e {y:(4; 2)} stanno\nsulla stessa retta: tutto si {r:schiaccia}.'],
  ['det0', 5.6, 'Area 0, e infatti\n{mink:2 · 2 − 4 · 1 =} {r:0}.'],
  ['neg', 6.0, 'Ora scambio le colonne\ndella prima matrice.'],
  ['ribalta', 6.4, 'Stesso parallelogramma, ma\nla bandierina è {r:ribaltata}.'],
  ['detneg', 6.4, '{mink:1 · 1 − 2 · 3 =} {r:−5}: il segno\nmeno dice che si è ribaltata.'],
  ['area5', 5.4, 'L’area resta 5: è il valore\nassoluto, {mink:|−5| = 5}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Una matrice muove il piano:\nquanto si allargano le figure?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Il determinante dice l’area nuova\ndel quadratino, e se si ribalta.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.resta + .6, 'festa'], [T.resta + 3.0, 'neutro'], [T.det5 + .6, 'felice'], [T.det5 + 3.0, 'neutro'],
  [T.schiaccia + 2.4, 'sorpreso'], [T.schiaccia + 4.8, 'neutro'],
  [T.ribalta + 2.8, 'sorpreso'], [T.ribalta + 5.0, 'neutro'], [T.area5 + .6, 'felice'], [T.area5 + 3.0, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// una matrice 2×2 fra parentesi tonde (barre = true: un determinante, fra barre verticali)
function matrice(ctx, cx, cy, el, size, al = 1, barre = false) {
  if (al <= 0) return;
  const dx = size * 1.5, dy = size * 1.3, hh = dy / 2 + size * .62;
  ctx.save(); ctx.globalAlpha *= al;
  for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) drawRich(ctx, el[r][c], cx + (c - .5) * dx, cy + (r - .5) * dy, { size });
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(3, size * .06); ctx.lineCap = 'round';
  const xl = cx - dx / 2 - size * .8, xr = cx + dx / 2 + size * .8, w = size * .2;
  if (barre) {
    ctx.beginPath(); ctx.moveTo(xl + w, cy - hh); ctx.lineTo(xl + w, cy + hh); ctx.moveTo(xr - w, cy - hh); ctx.lineTo(xr - w, cy + hh); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(xl + w, cy - hh); ctx.quadraticCurveTo(xl - w, cy, xl + w, cy + hh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xr - w, cy - hh); ctx.quadraticCurveTo(xr + w, cy, xr - w, cy + hh); ctx.stroke();
  }
  ctx.restore();
}
const largM = size => size * 1.5 + size * 1.6;   // larghezza di una matrice disegnata
// un determinante seguito dal suo conto, tutta la riga centrata in cx
function rigaDet(ctx, cx, cy, el, coda, size, al) {
  if (al <= 0) return;
  const wm = largM(size), wc = richW(ctx, coda, size), x0 = cx - (wm + 14 + wc) / 2;
  matrice(ctx, x0 + wm / 2, cy, el, size, al, true);
  drawRich(ctx, coda, x0 + wm + 14, cy, { size, align: 'left', alpha: al });
}
const N = (a, b, c, d) => [['{mink:' + a + '}', '{mink:' + b + '}'], ['{mink:' + c + '}', '{mink:' + d + '}']];
const COL = (a, b, c, d) => [['{mx:' + a + '}', '{my:' + b + '}'], ['{mx:' + c + '}', '{my:' + d + '}']];

// le tre matrici e la forma del quadratino nel tempo
const ID = [[1, 0], [0, 1]], MA = [[2, 1], [1, 3]], MZ = [[2, 4], [1, 2]], MB = [[1, 2], [3, 1]];
const mixM = (a, b, k) => [[lerp(a[0][0], b[0][0], k), lerp(a[0][1], b[0][1], k)], [lerp(a[1][0], b[1][0], k), lerp(a[1][1], b[1][1], k)]];
function mt(t) {
  if (t < T.zero) return mixM(ID, MA, P(t, T.diventa + .4, T.diventa + 2.4));
  if (t < T.schiaccia) return mixM(MA, ID, P(t, T.zero + .4, T.zero + 1.4));
  if (t < T.neg) return mixM(ID, MZ, P(t, T.schiaccia + .4, T.schiaccia + 2.4));
  if (t < T.ribalta) return mixM(MZ, ID, P(t, T.neg + .4, T.neg + 1.4));
  return mixM(ID, MB, P(t, T.ribalta + .4, T.ribalta + 2.8));
}
const app = (m, x, y) => [m[0][0] * x + m[0][1] * y, m[1][0] * x + m[1][1] * y];

// il piano
const RQ = [70, 110, 990, 690];
const PL = { ox: 190, oy: 700, u: 100, x1: 8.4, y1: 5.5 };
const S = (x, y) => [PL.ox + x * PL.u, PL.oy - y * PL.u];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x1, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= x1; i++) { const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy + 8); ctx.stroke(); }
  for (let j = 1; j <= y1; j++) { const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox - 8, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox - 14, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy + 14); ctx.lineTo(ox, oy - (y1 + .1) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .1) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // numeri sotto l'asse x e a sinistra dell'asse y: le figure stanno tutte nel primo quadrante
  for (let i = 1; i <= x1; i++) txt(ctx, String(i), ox + i * u, oy + 34, { size: 30, color: C.dim });
  for (let j = 1; j <= y1; j++) txt(ctx, String(j), ox - 20, oy - j * u, { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .1) * u + 4, { size: 44 });
  ctx.restore();
}
function freccia(ctx, b, col, al = 1) {
  if (al <= 0) return;
  const pa = S(0, 0), pb = S(b[0], b[1]), L = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]);
  if (L < 4) return;
  const ang = Math.atan2(pb[1] - pa[1], pb[0] - pa[0]);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0] - 12 * Math.cos(ang), pb[1] - 12 * Math.sin(ang)); ctx.stroke();
  arrowHead(ctx, pb, ang, col, 1.2); ctx.restore();
}
// la bandierina dentro il quadratino, in basso a sinistra: asta, poi il drappo verso destra
const BAND = [[.22, .12], [.22, .62], [.55, .5], [.22, .38]];
function figura(ctx, m, al) {
  if (al <= 0) return;
  const q = [[0, 0], [1, 0], [1, 1], [0, 1]].map(p => S(...app(m, p[0], p[1])));
  ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  ctx.fillStyle = css(C.v, .16); ctx.fill(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.stroke();
  const [b, c, p, n] = BAND.map(v => S(...app(m, v[0], v[1])));
  ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(p[0], p[1]); ctx.lineTo(n[0], n[1]); ctx.closePath();
  ctx.fillStyle = css(C.y, .45); ctx.fill(); ctx.strokeStyle = css(C.y); ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.stroke();
  ctx.restore();
}
// i sei pezzi fra il rettangolo 3 × 4 e il parallelogramma, con le loro aree
const PEZZI = [
  [[[0, 0], [2, 0], [2, 1]], '1', [1.33, .33]], [[[2, 0], [3, 0], [3, 1], [2, 1]], '1', [2.5, .5]],
  [[[2, 1], [3, 1], [3, 4]], '1,5', [2.67, 2]], [[[1, 3], [1, 4], [3, 4]], '1', [1.67, 3.67]],
  [[[0, 3], [1, 3], [1, 4], [0, 4]], '1', [.5, 3.5]], [[[0, 0], [0, 3], [1, 3]], '1,5', [.33, 2]],
];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il determinante è un’area', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // il rettangolo 3 × 4 e i sei pezzi da togliere
  const kr = life(t, T.rett + .3, T.det + .6, .6, .5);
  if (kr > 0) {
    ctx.save(); ctx.globalAlpha *= kr; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.setLineDash([10, 9]);
    const a = S(0, 0), b = S(3, 4); ctx.strokeRect(a[0], b[1], b[0] - a[0], a[1] - b[1]); ctx.restore();
    lab(ctx, '{dim:12}', S(3.35, 4.3)[0], S(3.35, 4.3)[1], P(t, T.rett + .6, T.rett + 1.0), 36);
  }
  const kp = 1 - P(t, T.det, T.det + .6);
  PEZZI.forEach(([pts, s, c], i) => {
    const k = P(t, T.pezzi + .4 + i * .35, T.pezzi + .8 + i * .35) * kp;
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k; ctx.beginPath();
    pts.forEach((p, j) => { const q = S(p[0], p[1]); j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    ctx.fillStyle = css(C.r, .18); ctx.fill(); ctx.restore();
    const q = S(c[0], c[1]); lab(ctx, '{r:' + s + '}', q[0], q[1], k, 34);
  });
  // il quadratino (o la figura in cui si è trasformato) con la bandierina, e le due colonne
  const m = mt(t), kq = P(t, T.quadratino + .2, T.quadratino + .8);
  figura(ctx, m, kq);
  freccia(ctx, app(m, 1, 0), C.x, kq);
  freccia(ctx, app(m, 0, 1), C.y, kq);
  dot(ctx, S(0, 0), C.ink, kq, 8);
  // le aree scritte dentro la figura, solo quando la figura è ferma
  const q1 = S(.72, .74);
  lab(ctx, '{dim:1}', q1[0], q1[1], life(t, T.quadratino + .6, T.diventa + .4, .4, .3), 40);
  const q5 = S(2.04, 2.72);
  lab(ctx, '{g:5}', q5[0], q5[1], life(t, T.resta + .4, T.zero + .4, .4, .3) + life(t, T.area5 + .4, FINE + 1, .4, .3), 52);
  ctx.restore();
}

// la scheda a destra: la matrice in alto, sotto i conti
const XC = 1475;
const VERDI = (a, b, c, d) => [['{mg:' + a + '}', '{mr:' + b + '}'], ['{mr:' + c + '}', '{mg:' + d + '}']];
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1090, 110, 770, 690, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  // le tre matrici, una dopo l'altra
  matrice(ctx, XC, 250, COL(2, 1, 1, 3), 56, P(t, T.matrice + .3, T.matrice + .8) * (1 - P(t, T.zero + .2, T.zero + .6)));
  matrice(ctx, XC, 250, COL(2, 4, 1, 2), 56, P(t, T.zero + .6, T.zero + 1.0) * (1 - P(t, T.neg + .2, T.neg + .6)));
  matrice(ctx, XC, 250, COL(1, 2, 3, 1), 56, P(t, T.neg + .6, T.neg + 1.0));
  // 1 · l'area con il rettangolo
  const kA = 1 - P(t, T.det, T.det + .4);
  if (kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    lab(ctx, '{dim:area del quadratino:}  {mink:1}', XC, 420, P(t, T.quadratino + .6, T.quadratino + 1.0), 40);
    lab(ctx, '{dim:rettangolo:}  {mink:3 · 4 = 12}', XC, 495, P(t, T.rett + .6, T.rett + 1.0), 40);
    lab(ctx, '{dim:pezzi:}  {mink:1 + 1 + 1 + 1 + 1,5 + 1,5 = 7}', XC, 570, P(t, T.pezzi + 2.6, T.pezzi + 3.0), 38);
    lab(ctx, '{dim:parallelogramma:}  {mink:12 − 7 =} {mg:5}', XC, 650, P(t, T.resta + .4, T.resta + .8), 44);
    ctx.restore();
  }
  // 2 · il determinante
  const kD = life(t, T.det + .3, T.zero + .2, .5, .4);
  if (kD > 0) {
    ctx.save(); ctx.globalAlpha *= kD;
    conFont(TITOLI, () => drawRich(ctx, 'il determinante, con le lettere', XC, 410, { size: 40, weight: 600 }));
    rigaDet(ctx, XC, 510, VERDI('a', 'b', 'c', 'd'), '{mink:=} {mg:ad}{mink: − }{mr:bc}', 44, P(t, T.det + .6, T.det + 1.1));
    rigaDet(ctx, XC, 660, VERDI(2, 1, 1, 3), '{mink:=} {mg:2 · 3}{mink: − }{mr:1 · 1}{mink: =} {mg:5}', 44, P(t, T.det5 + .3, T.det5 + .8));
    ctx.restore();
  }
  // 3 · determinante zero
  const kZ = life(t, T.schiaccia + 2.4, T.neg + .2, .5, .4);
  if (kZ > 0) {
    ctx.save(); ctx.globalAlpha *= kZ;
    lab(ctx, '{x:(2; 1)}{dim: e }{y:(4; 2)}{dim: sulla stessa retta}', XC, 420, 1, 38);
    lab(ctx, '{dim:area:}  {r:0}', XC, 510, P(t, T.det0 + .3, T.det0 + .7), 44);
    rigaDet(ctx, XC, 630, VERDI(2, 4, 1, 2), '{mink:=} {mg:2 · 2}{mink: − }{mr:4 · 1}{mink: =} {mr:0}', 44, P(t, T.det0 + 1.2, T.det0 + 1.7));
    ctx.restore();
  }
  // 4 · determinante negativo
  if (t > T.neg) {
    lab(ctx, '{dim:le colonne di prima, scambiate}', XC, 375, P(t, T.neg + .8, T.neg + 1.2), 32);
    lab(ctx, '{r:bandierina ribaltata}', XC, 455, P(t, T.ribalta + 2.8, T.ribalta + 3.2), 40);
    rigaDet(ctx, XC, 565, VERDI(1, 2, 3, 1), '{mink:=} {mg:1 · 1}{mink: − }{mr:2 · 3}{mink: =} {mr:−5}', 44, P(t, T.detneg + .3, T.detneg + .8));
    lab(ctx, '{dim:area:}  {mink:|−5| =} {mg:5}', XC, 690, P(t, T.area5 + .4, T.area5 + .8), 44);
  }
  ctx.restore();
}

// in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il determinante è l’area del quadratino\ntrasformato, col segno meno se si ribalta.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'determinante', '{mg:ad}{mink: − }{mr:bc}'], [960, 'determinante 0', '{r:tutto si schiaccia}'], [1450, 'determinante negativo', '{r:la figura si ribalta}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: i ? 36 : 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'area della figura mentre si deforma
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],
    ['pop', T.quadratino + .3, .3],                                                         // il quadratino
    ['pop', T.matrice + .3, .5],                                                            // la matrice
    ['tono', T.diventa + .4, T.diventa + 2.4, [.2, .4, .6, .75]],                            // si allarga: area da 1 a 5
    ['traccia', T.rett + .3, T.rett + 1.0],                                                 // il rettangolo
    ['pop', T.pezzi + .4, .3], ['pop', T.pezzi + .75, .35], ['pop', T.pezzi + 1.1, .4],      // i sei pezzi
    ['pop', T.pezzi + 1.45, .45], ['pop', T.pezzi + 1.8, .5], ['pop', T.pezzi + 2.15, .55],
    ['ding', T.resta + .5],                                                                 // resta 5
    ['soffio', T.det + .3], ['pop', T.det + .6, .5], ['ding', T.det5 + .4],                  // il determinante: 5
    ['soffio', T.zero + .2], ['tono', T.zero + .4, T.zero + 1.4, [.75, .2]],                 // torna quadratino
    ['tono', T.schiaccia + .4, T.schiaccia + 2.4, [.2, .15, .08, 0]],                        // si schiaccia
    ['pop', T.det0 + .3, .2], ['pop', T.det0 + 1.2, .3],
    ['soffio', T.neg + .2], ['tono', T.neg + .4, T.neg + 1.4, [0, .2]],
    ['tono', T.ribalta + .4, T.ribalta + 2.8, [.2, .1, 0, .3, .6, .75]],                     // si schiaccia e si ribalta
    ['pop', T.ribalta + 2.8, .4], ['pop', T.detneg + .3, .3], ['ding', T.area5 + .4],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il determinante è un’area', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.det - .2, 'l’area del parallelogramma'], [T.det - .2, T.zero - .2, 'il determinante'],
      [T.zero - .2, T.neg - .2, 'determinante zero'], [T.neg - .2, FINE, 'determinante negativo']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
