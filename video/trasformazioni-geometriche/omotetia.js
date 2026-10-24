'use strict';
/* Ingrandire da un punto — omotetia di centro O e rapporto k ≠ 0: P′ sta sulla retta OP con OP′ = |k| · OP, dalla
   stessa parte di P se k > 0, dalla parte opposta se k < 0. Triangolo A(2; −1), B(3; −1), C(2; 1) (O nell'origine,
   coordinate solo nel codice): con k = 2 i lati raddoppiano (AB = 1 → A′B′ = 2), gli angoli restano, l'area passa da 1
   a 4 = 2² · 1 (quattro copie del triangolo); non è un'isometria ma una similitudine. Con k = −1 il triangolo si
   capovolge (simmetria centrale), con k = −2 anche raddoppia. Lunghezze per |k|, aree per k².
   Argomento: trasformazioni-geometriche (l'argomento non c'è ancora: sezione «Omotetie e similitudini»). */
CVIDEO.registra('trasformazioni-geometriche/omotetia', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, txt, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['fig', 4.8, 'Un triangolo {mink:ABC} e, fuori,\nun punto {mink:O}: il {v:centro}.'],
  ['raggi', 4.6, 'Da {mink:O} traccio le semirette\nche passano per i vertici.'],
  ['k', 4.6, 'Scelgo un numero {mink:k}, il {v:rapporto}:\nqui {mink:k = 2}.'],
  ['scivola', 6.2, 'Ogni punto {mink:P} scivola sulla semiretta {mink:OP}\nfino a {mink:P′}, lontano il {g:doppio} da {mink:O}.'],
  ['doppio', 5.0, '{mink:OA′ = 2 · OA}, e così\nanche per {mink:B} e {mink:C}.'],
  ['omotetia', 5.0, 'È l’{v:omotetia} di centro {mink:O}\ne rapporto {mink:k}.'],
  ['lati', 4.8, 'I lati {g:raddoppiano}:\n{mink:AB = 1}, {mink:A′B′ = 2}.'],
  ['angoli', 4.8, 'Gli angoli restano uguali:\nla forma non cambia.'],
  ['area', 5.6, 'L’area {g:quadruplica}: ci stanno\n4 triangoli come quello di prima.'],
  ['simil', 5.6, 'Le distanze cambiano: non è\nun’isometria, ma una {v:similitudine}.'],
  ['neg', 4.4, 'E se {mink:k} è negativo?\nProvo {mink:k = −1}.', .4],
  ['oltre', 5.6, 'Ogni punto passa oltre {mink:O}, dalla\nparte {v:opposta}, alla stessa distanza.'],
  ['centrale', 5.4, 'Il triangolo è girato di mezzo giro:\nè la {v:simmetria centrale} di centro {mink:O}.'],
  ['meno2', 5.2, 'Con {mink:k = −2}: dalla parte opposta,\ne lontano il {g:doppio}.'],
  ['segno', 6.0, 'Il segno di {mink:k} dice da che parte,\nil valore assoluto {mink:|k|} quanto lontano.'],
  ['regola', 6.6, 'Le lunghezze si moltiplicano per {mink:|k|},\nle aree per {mink:k²}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Come si ingrandisce una figura\nsenza deformarla?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Dal centro, ogni distanza per {mink:|k|}:\nla figura cambia misura, non forma.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.doppio, 'felice'], [T.doppio + 2.2, 'neutro'], [T.area + .8, 'sorpreso'], [T.area + 3.0, 'neutro'],
  [T.neg, 'pensa'], [T.oltre, 'neutro'], [T.centrale, 'felice'], [T.centrale + 2.4, 'neutro'],
  [T.regola, 'festa'], [T.regola + 2.4, 'felice'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const RAD = Math.PI / 180, RQ = [70, 110, 1080, 690];
const O = [610, 455], U = 78, S = p => [O[0] + p[0] * U, O[1] - p[1] * U];
const TRI = [[2, -1], [3, -1], [2, 1]], NOMI = ['A', 'B', 'C'];
const DIR = [243.4, 50, 116.6], DIRI = DIR;   // etichette di partenza e trasformate: lontane da rette e lati (controllato con uno script)
const lab = (ctx, s, x, y, al, size = 44, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// il rapporto nel tempo: 1 → 2 mentre i vertici scivolano; poi −1 (i punti passano oltre O) e −2
function kDi(t) {
  if (t < T.neg + .8) return 1 + P(t, T.scivola + .3, T.scivola + 2.8);
  if (t < T.meno2) return 1 - 2 * P(t, T.oltre + .3, T.oltre + 2.8);
  return -1 - P(t, T.meno2 + .3, T.meno2 + 2.3);
}
const per = (k, p) => [k * p[0], k * p[1]];
function triangolo(ctx, pts, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round';
  ctx.beginPath(); pts.forEach((p, i) => { const q = S(p); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
  ctx.fillStyle = css(col, .18); ctx.fill(); ctx.strokeStyle = css(col); ctx.lineWidth = 4.5; ctx.stroke();
  for (const p of pts) dot(ctx, S(p), C.ink, 1, 7);
  ctx.restore();
}
function nomi(ctx, pts, segno, primo, al, alB = 1) {   // alB: in più, solo per B
  if (al <= 0) return;
  pts.forEach((p, i) => {
    const a = ((primo ? DIRI : DIR)[i] + (segno < 0 ? 180 : 0)) * RAD, q = S([p[0] + .55 * Math.cos(a), p[1] + .55 * Math.sin(a)]);
    lab(ctx, '{mink:' + NOMI[i] + (primo ? '′' : '') + '}', q[0], q[1], al * (i === 1 ? alB : 1), 40);
  });
}
function tratteggio(ctx, a, b, col, al, w = 2.5) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
// n trattini a metà del segmento ab (segmenti uguali)
function tacche(ctx, a, b, n, col, al, f = .5) {   // f: dove stanno lungo il segmento
  if (al <= 0) return;
  const mx = lerp(a[0], b[0], f), my = lerp(a[1], b[1], f), L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 9, cx = mx + ux * o, cy = my + uy * o;
    ctx.beginPath(); ctx.moveTo(cx - uy * 12, cy + ux * 12); ctx.lineTo(cx + uy * 12, cy - ux * 12); ctx.stroke();
  }
  ctx.restore();
}
const FR = [.3, .45, .5];   // le tacche di A, B, C in punti diversi delle semirette, così non si ammassano
function angolo(ctx, p, al) {   // l'angolo in C, fra CA (270°) e CB (296,6°)
  if (al <= 0) return;
  const c = S(p), r = 75, a1 = 270 * RAD, a2 = Math.atan2(-2, 1) + 2 * Math.PI;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.g, .25); ctx.strokeStyle = css(C.g); ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.arc(c[0], c[1], r, -a1, -a2, true); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(c[0], c[1], r, -a1, -a2, true); ctx.stroke(); ctx.restore();
}
function quadratino(ctx, p, lato, segno, al) {   // angolo retto in p, con i lati lungo x e y (verso il triangolo)
  if (al <= 0) return;
  const a = S(p), d = lato * U * segno;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g); ctx.fillStyle = css(C.g, .2); ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + d, a[1]); ctx.lineTo(a[0] + d, a[1] - d); ctx.lineTo(a[0], a[1] - d); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

// 1 · la figura (7.5–FINE)
function scenaFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  // la quadrettatura, per contare i lati
  const kq = P(t, 7.7, 8.5);
  if (kq > 0) {
    ctx.save(); ctx.globalAlpha *= kq; ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let i = -7; i <= 7; i++) { const x = O[0] + i * U; ctx.moveTo(x, RQ[1]); ctx.lineTo(x, RQ[1] + RQ[3]); }
    for (let j = -5; j <= 5; j++) { const y = O[1] - j * U; ctx.moveTo(RQ[0], y); ctx.lineTo(RQ[0] + RQ[2], y); }
    ctx.stroke(); ctx.restore();
  }
  // le semirette da O per i vertici; quando k diventa negativo, le rette intere
  const kr = P(t, T.raggi + .3, T.raggi + 1.3), kb = P(t, T.neg + .6, T.neg + 1.4);
  for (const p of TRI) {
    if (kr > 0) tratteggio(ctx, O, S(per(2.6 * kr, p)), C.dim, 1);
    if (kb > 0) tratteggio(ctx, O, S(per(-2.6 * kb, p)), C.dim, 1);
  }
  ctx.restore();
  const k = kDi(t), TC = [C.g, C.v, C.y];   // tacche di A, B, C: anche colori diversi
  // OA′ = 2 · OA: tacche uguali sui due pezzi di ogni semiretta (1, 2, 3 tacche per A, B, C)
  const kt = life(t, T.doppio + .3, T.omotetia + .4, .4, .4);
  if (kt > 0) TRI.forEach((p, i) => { tacche(ctx, O, S(p), i + 1, TC[i], kt, FR[i]); tacche(ctx, S(p), S(per(2, p)), i + 1, TC[i], kt, FR[i]); });
  const kt2 = life(t, T.oltre + 3.0, T.meno2 + .3, .4, .4);
  if (kt2 > 0) TRI.forEach((p, i) => { tacche(ctx, O, S(p), i + 1, TC[i], kt2, FR[i]); tacche(ctx, O, S(per(-1, p)), i + 1, TC[i], kt2, FR[i]); });
  // il triangolo di partenza
  triangolo(ctx, TRI, C.x, P(t, T.fig + .2, T.fig + .8));
  nomi(ctx, TRI, 1, false, P(t, T.fig + .5, T.fig + 1.0), 1 - .8 * life(t, T.scivola + .2, T.scivola + 3.0, .3, .3));   // B sbiadisce mentre il trasformato ci passa sopra
  // il trasformato: con k = 2 scivola fuori; con k negativo i punti passano oltre O e poi si forma il triangolo
  const img = TRI.map(p => per(k, p));
  if (t < T.neg + .8) {
    const ai = P(t, T.scivola + .2, T.scivola + .5) * (1 - P(t, T.neg + .2, T.neg + .7));
    triangolo(ctx, img, C.y, ai);
    nomi(ctx, img, 1, true, P(t, T.scivola + 2.6, T.scivola + 3.0) * (1 - P(t, T.neg + .2, T.neg + .7)));
    angolo(ctx, TRI[2], life(t, T.angoli + .3, T.area + .2, .4, .4));   // l'angolo in C e in C′: lì non passa nessuna semiretta
    angolo(ctx, img[2], life(t, T.angoli + .3, T.area + .2, .4, .4));
    // l'area: il grande si divide in quattro copie del piccolo
    const ka = life(t, T.area + .3, T.neg + .4, .4, .4);
    if (ka > 0) {
      const [a, b, c] = img, m = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      const pezzi = [[a, m(a, b), m(a, c)], [m(a, b), b, m(b, c)], [m(a, c), m(b, c), c], [m(a, b), m(b, c), m(a, c)]];
      pezzi.forEach((q, i) => {
        const kp = P(t, T.area + .4 + i * .35, T.area + .7 + i * .35) * ka; if (kp <= 0) return;
        ctx.save(); ctx.globalAlpha *= kp; ctx.beginPath(); q.forEach((p, j) => { const s = S(p); j ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]); }); ctx.closePath();
        ctx.fillStyle = css(C.y, i % 2 ? .38 : .2); ctx.fill(); ctx.strokeStyle = css(C.y); ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
      });
    }
  } else {
    const viaggio = life(t, T.oltre + .3, T.oltre + 3.1, .2, .3);
    if (viaggio > 0 && k > -1) for (const p of img) dot(ctx, S(p), C.y, viaggio, 9);
    const ai = P(t, T.oltre + 2.7, T.oltre + 3.1);
    triangolo(ctx, img, C.y, ai);
    nomi(ctx, img, -1, true, ai);
  }
  // O sopra tutto
  dot(ctx, O, C.ink, P(t, T.fig + 1.0, T.fig + 1.4, E.back), 9);
  lab(ctx, '{mink:O}', O[0], O[1] - 70, P(t, T.fig + 1.1, T.fig + 1.5), 44);
  ctx.restore();
}

// la scheda a destra
const XL = 1230, XC = 1525;
function scenaScheda(ctx, t) {
  if (t < T.k || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1190, 110, 670, 690, P(t, T.k, T.k + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'omotetia', XC, 168, { size: 44, weight: 600, alpha: P(t, T.omotetia + .3, T.omotetia + .8) }));
  // il rapporto: 2, poi −1, poi −2
  const kv = [['2', T.k + .3, T.neg + .3], ['−1', T.neg + .3, T.meno2 + .3], ['−2', T.meno2 + .3, FINE + 9]];
  lab(ctx, '{mink:k =}', XC - 20, 250, P(t, T.k + .3, T.k + .7), 60, 'right');
  for (const [s, a, b] of kv) lab(ctx, '{mv:' + s + '}', XC + 4, 250, life(t, a, b, .3, .3), 60, 'left');
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 310); ctx.lineTo(1820, 310); ctx.stroke();
  // k = 2
  const a1 = 1 - P(t, T.neg, T.neg + .5);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    lab(ctx, '{mink:P′} {dim:sulla semiretta} {mink:OP}', XC, 360, P(t, T.scivola - 1.5, T.scivola - 1.1), 40);
    lab(ctx, '{mink:OP′ = 2 · OP}', XC, 418, P(t, T.scivola + .9, T.scivola + 1.3), 44);
    lab(ctx, '{dim:lati}   {mink:AB = 1},   {mink:A′B′ = 2}', XC, 488, P(t, T.lati + .3, T.lati + .7), 40);
    lab(ctx, '{dim:angoli}   {g:uguali}', XC, 548, P(t, T.angoli + .3, T.angoli + .7), 40);
    lab(ctx, '{dim:area}   {mink:1 → 4}{dim:,  4 volte tanto}', XC, 608, P(t, T.area + 1.8, T.area + 2.2), 40);
    lab(ctx, '{v:similitudine}', XC, 676, P(t, T.simil + .3, T.simil + .7), 44);
    lab(ctx, '{dim:non è un’isometria}', XC, 726, P(t, T.simil + .3, T.simil + .7), 32);
    ctx.restore();
  }
  // k negativo
  const a2 = P(t, T.neg + .3, T.neg + .8);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    lab(ctx, '{mink:P′} {dim:dalla parte opposta di} {mink:O}', XC, 360, P(t, T.oltre - 1.2, T.oltre - .8), 38);
    lab(ctx, '{mink:OP′ = OP}', XC, 418, life(t, T.oltre + 2.8, T.meno2 + 2.3, .4, .3), 44);
    lab(ctx, '{mink:OP′ = 2 · OP}', XC, 418, P(t, T.meno2 + 2.3, T.meno2 + 2.7), 44);
    lab(ctx, '{v:simmetria centrale}', XC, 476, life(t, T.centrale + .3, T.meno2 + .3, .4, .4), 40);
    lab(ctx, '{dim:lati}   {mink:A′B′ = 2}', XC, 476, P(t, T.meno2 + 2.4, T.meno2 + 2.8), 40);
    lab(ctx, '{dim:segno di} {mink:k}{dim::  da che parte}', XC, 540, P(t, T.segno + .3, T.segno + .7), 40);
    lab(ctx, '{mink:|k|}{dim::  quanto lontano}', XC, 605, P(t, T.segno + 2.6, T.segno + 3.0), 40);
    const kR = P(t, T.regola + .3, T.regola + .7);
    if (kR > 0) {
      ctx.save(); ctx.globalAlpha *= kR; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XC - 318, 652, 636, 104, 18); ctx.stroke(); ctx.restore();
      lab(ctx, '{dim:lunghezze per} {mink:|k|}{dim:,  aree per} {mink:k²}', XC, 704, kR, 36);
    }
    ctx.restore();
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function scenaIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Ingrandire da un punto', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 2 · in una frase (FINE–DUR)
function scenaFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L’omotetia moltiplica per {mink:|k|} le distanze\ndal centro: cambia la misura, non la forma.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, '{mink:k = 2}', '{dim:lati per 2, area per 4}'], [960, '{mink:k} {dim:negativo}', '{dim:dalla parte} {v:opposta}'], [1450, '{v:similitudine}', '{dim:isometria solo se} {mink:|k| = 1}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 488, { size: 38 });
    drawRich(ctx, s, x, 550, { size: 32 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la distanza da O
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.5],
    ['pop', T.fig + .3, .4], ['pop', T.fig + 1.1, .5],                                         // il triangolo, O
    ['traccia', T.raggi + .3, T.raggi + 1.3],                                                  // le semirette
    ['soffio', T.k], ['pop', T.k + .4, .7],                                                    // k = 2
    ['tono', T.scivola + .3, T.scivola + 2.8, [.4, .55, .7, .8]], ['pop', T.scivola + 2.7, .8],   // i vertici scivolano
    ['pop', T.doppio + .3, .5], ['ding', T.doppio + .7],                                        // OA′ = 2 · OA
    ['pop', T.omotetia + .4, .6], ['pop', T.lati + .4, .6], ['pop', T.angoli + .4, .5],
    ['pop', T.area + .4, .4], ['pop', T.area + .75, .5], ['pop', T.area + 1.1, .6], ['pop', T.area + 1.45, .7], ['ding', T.area + 1.9],
    ['pop', T.simil + .4, .6],
    ['traccia', T.neg + .6, T.neg + 1.4], ['pop', T.neg + .4, .3],                              // k = −1, le rette intere
    ['tono', T.oltre + .3, T.oltre + 2.8, [.5, .3, .1, .3, .5]], ['pop', T.oltre + 2.8, .5],     // i punti passano oltre O
    ['ding', T.centrale + .4],
    ['tono', T.meno2 + .3, T.meno2 + 2.3, [.5, .8]], ['pop', T.meno2 + 2.4, .8],                // k = −2
    ['pop', T.segno + .4, .5], ['pop', T.segno + 2.7, .6], ['ding', T.regola + .4],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Ingrandire da un punto', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.omotetia + 5.0, 'centro e rapporto'], [T.omotetia + 5.0, T.neg - .2, 'lati, angoli, area'], [T.neg - .2, FINE, 'rapporto negativo']],
    scena(ctx, t) { scenaIntro(ctx, t); scenaFigura(ctx, t); scenaScheda(ctx, t); scenaFine(ctx, t); },
  };
});
