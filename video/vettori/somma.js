'use strict';
/* Testa e coda — la somma di due vettori: u⃗ = (3; 1) e v⃗ = (1; 2). Con la regola testa-coda (v⃗ parte dalla testa
   di u⃗) e con il parallelogramma (tutti e due dall'origine, la diagonale) si trova la stessa freccia u⃗ + v⃗ = (4; 3),
   che si ottiene sommando le componenti; |u⃗ + v⃗| = 5, ma |u⃗| + |v⃗| = √10 + √5 ≈ 5,40. Argomento: vettori.
   Notazione: freccia sopra la lettera (u⃗, v⃗), come \vec nel sito di Quanto; u e v perché la freccia sopra la b
   attraverserebbe l'asta della lettera. */
CVIDEO.registra('vettori/somma', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, txt, dot, arrowHead, makePlane, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 14 caratteri al secondo)
const SEQ = [
  ['freccia', 4.4, 'Un vettore è una freccia:\nha una {v:coda} e una {v:testa}.'],
  ['nome', 5.0, 'Si chiama {mx:u⃗}: la freccetta sopra\nla lettera dice che è un vettore.'],
  ['comp', 6.4, 'Da coda a testa: 3 a destra e 1 in su.\nSono le {v:componenti}: {mx:u⃗ = (3; 1)}.'],
  ['v', 5.6, 'Dalla testa di {mx:u⃗} parte {my:v⃗ = (1; 2)}:\n1 a destra e 2 in su.'],
  ['somma', 5.4, 'La somma va dalla coda di {mx:u⃗}\nalla testa di {my:v⃗}: è {mg:u⃗ + v⃗}.'],
  ['regola', 2.8, 'È la regola {v:testa-coda}.'],
  ['origine', 4.8, 'Altro modo: {mx:u⃗} e {my:v⃗} partono\ntutti e due dall’origine {mink:O}.', .4],
  ['copia', 4.2, 'Copio le due frecce e chiudo\nil {v:parallelogramma}.'],
  ['diag', 4.5, 'La {g:diagonale} è la stessa freccia\ndi prima: {mg:u⃗ + v⃗}.'],
  ['perche', 5.0, 'Il lato di destra è {my:v⃗} sulla testa\ndi {mx:u⃗}: è ancora testa-coda.'],
  ['orizz', 4.5, 'E i numeri? In orizzontale:\n3 + 1 = {g:4}.', .4],
  ['vert', 3.6, 'In verticale: 1 + 2 = {g:3}.'],
  ['comp2', 4.5, 'Si sommano le componenti:\n{mg:u⃗ + v⃗ = (4; 3)}.'],
  ['modulo', 4.6, 'La sua lunghezza, il {v:modulo},\nsi scrive {mink:|u⃗ + v⃗|}.', .4],
  ['pitagora', 6.0, 'Con Pitagora: {mink:√(4² + 3²) = √25 = }{g:5}.'],
  ['lungh', 4.4, '{mx:u⃗} è lungo {mink:√10}, {my:v⃗} è lungo {mink:√5}…'],
  ['non', 4.0, '…insieme circa 5,40, non 5.'],
  ['regola2', 4.8, 'La lunghezza della somma {r:non} è\nla somma delle lunghezze.'],
];
const T = {}, FUMETTI = [[2.3, 6.3, 'Due frecce, una dopo l’altra:\ndove si arriva?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Testa-coda o parallelogramma:\nla somma è la stessa, {g:(4; 3)}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.somma + 1.4, 'felice'], [T.regola + .4, 'neutro'], [T.diag + 1.4, 'sorpreso'], [T.perche, 'neutro'],
  [T.comp2 + .4, 'festa'], [T.comp2 + 2.8, 'neutro'], [T.pitagora + 2.6, 'felice'], [T.lungh, 'neutro'],
  [T.non + .3, 'pensa'], [T.non + 3.0, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano ----------
const PL = makePlane({ ox: 400, oy: 680, u: 128, x0: -.6, x1: 4.9, y0: -.6, y1: 3.8 });
const RQ = [300, 110, 800, 690];
const S = (x, y) => PL.toS(x, y);
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
  // i numeri sotto l'asse x e a sinistra dell'asse y: tutte le frecce stanno nel primo quadrante, non ci passano mai
  for (let i = 1; i <= 4; i++) txt(ctx, String(i), ox + i * u, oy + 35, { size: 30, color: C.dim });
  for (let j = 1; j <= 3; j++) txt(ctx, String(j), ox - 30, oy - j * u, { size: 30, color: C.dim });
  drawRich(ctx, '{mink:O}', ox - 28, oy + 30, { size: 40 });
  ctx.restore();
}
// freccia da a a b (pixel), disegnata fino alla frazione k
function freccia(ctx, a, b, col, k = 1, al = 1, w = 7) {
  if (k <= 0 || al <= .01) return;
  const e = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
  const dx = e[0] - a[0], dy = e[1] - a[1], L = Math.hypot(dx, dy);
  if (L < 2) return;
  const ux = dx / L, uy = dy / L, s = Math.min(1.3, L / 24);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.shadowColor = css(col, .5); ctx.shadowBlur = 10;
  if (L > 16 * s) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - ux * 14 * s, e[1] - uy * 14 * s); ctx.stroke(); }
  ctx.shadowBlur = 0;
  arrowHead(ctx, [e[0] - ux * 2 * s, e[1] - uy * 2 * s], Math.atan2(dy, dx), col, s);
  ctx.restore();
}
// segmento (componente), pieno o tratteggiato
function tratto(ctx, a, b, col, k, al, w = 5, trat) {
  if (k <= 0 || al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (trat) ctx.setLineDash(trat);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, x, y, al, size = 40) => { if (al > .01) { const p = S(x, y); drawRich(ctx, s, p[0], p[1], { size, alpha: al }); } };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Testa e coda', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1–3 · le frecce sul piano (7.5–FINE)
// la coda di v⃗: sulla testa di u⃗, poi scivola nell'origine mentre Ada lo dice
const codaV = t => { const k = P(t, T.origine + .4, T.origine + 2.0, E.io); return [3 * (1 - k), 1 - k]; };
function scalinoU(ctx, kh, kv, al) {   // le componenti di u⃗: 3 a destra, 1 in su
  tratto(ctx, S(0, 0), S(3, 0), C.x, kh, al, 5, [12, 9]);
  tratto(ctx, S(3, 0), S(3, 1), C.x, kv, al, 5, [12, 9]);
  lab(ctx, '{x:3}', 2.0, .24, al * clamp(kh * 2 - 1));
  lab(ctx, '{x:1}', 2.78, .42, al * clamp(kv * 2 - 1));
}
function scalinoV(ctx, kh, kv, al) {   // le componenti di v⃗ (con la coda in (3; 1)): 1 a destra, 2 in su
  tratto(ctx, S(3, 1), S(4, 1), C.y, kh, al, 5, [12, 9]);
  tratto(ctx, S(4, 1), S(4, 3), C.y, kv, al, 5, [12, 9]);
  lab(ctx, '{y:1}', 3.7, 1.3, al * clamp(kh * 2 - 1));
  lab(ctx, '{y:2}', 4.25, 2.0, al * clamp(kv * 2 - 1));
}
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  ctx.save(); ctx.globalAlpha *= fuori;
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // il parallelogramma: riempimento e copie delle frecce
  const kp = P(t, T.copia + 1.6, T.copia + 2.2);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp; ctx.fillStyle = css(C.v, .09);
    const q = [S(0, 0), S(3, 1), S(4, 3), S(1, 2)];
    ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  freccia(ctx, S(1, 2), S(4, 3), C.x, P(t, T.copia + .3, T.copia + 1.1), .45, 5);
  freccia(ctx, S(3, 1), S(4, 3), C.y, P(t, T.copia + .8, T.copia + 1.6), lerp(.45, 1, P(t, T.perche + .2, T.perche + .7)), lerp(5, 7, P(t, T.perche + .2, T.perche + .7)));
  // le componenti: di u⃗ e di v⃗ quando se ne parla, poi in orizzontale e in verticale
  const kU = life(t, T.comp + .3, T.v + .2, .4, .4);
  scalinoU(ctx, P(t, T.comp + .3, T.comp + 1.1), P(t, T.comp + 1.1, T.comp + 1.6), kU);
  const kV = life(t, T.v + 1.1, T.somma + .2, .4, .4);
  scalinoV(ctx, P(t, T.v + 1.1, T.v + 1.7), P(t, T.v + 1.7, T.v + 2.3), kV);
  const kN = 1 - P(t, T.modulo, T.modulo + .4);
  const kh = P(t, T.orizz + .3, T.orizz + 1.0), kv = P(t, T.vert + .3, T.vert + 1.0);
  if (t > T.orizz) {
    tratto(ctx, S(0, 0), S(3, 0), C.x, kh, kN, 5, [12, 9]); tratto(ctx, S(3, 0), S(3, 1), C.x, kv, kN, 5, [12, 9]);
    tratto(ctx, S(3, 1), S(4, 1), C.y, kh, kN, 5, [12, 9]); tratto(ctx, S(4, 1), S(4, 3), C.y, kv, kN, 5, [12, 9]);
    lab(ctx, '{x:3}', 2.0, .24, kN * clamp(kh * 2 - 1)); lab(ctx, '{y:1}', 3.7, 1.3, kN * clamp(kh * 2 - 1));
    lab(ctx, '{x:1}', 2.78, .42, kN * clamp(kv * 2 - 1)); lab(ctx, '{y:2}', 4.25, 2.0, kN * clamp(kv * 2 - 1));
  }
  // il triangolo di Pitagora: cateti 4 e 3, ipotenusa 5
  const kt = P(t, T.pitagora + .3, T.pitagora + 1.3);
  if (kt > 0) {
    tratto(ctx, S(0, 0), S(4, 0), C.g, P(kt, 0, .6), 1, 5, [12, 9]);
    tratto(ctx, S(4, 0), S(4, 3), C.g, P(kt, .5, 1), 1, 5, [12, 9]);
    const a = S(4, 0), d = 22;
    ctx.save(); ctx.globalAlpha *= P(kt, .8, 1); ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(a[0] - d, a[1]); ctx.lineTo(a[0] - d, a[1] - d); ctx.lineTo(a[0], a[1] - d); ctx.stroke(); ctx.restore();
    lab(ctx, '{g:4}', 2.0, .24, P(kt, .4, .7)); lab(ctx, '{g:3}', 4.25, 1.5, P(kt, .8, 1));
    lab(ctx, '{g:5}', 2.45, 1.5, P(t, T.pitagora + 1.4, T.pitagora + 1.8));
  }
  // u⃗: la freccia e il suo nome
  freccia(ctx, S(0, 0), S(3, 1), C.x, P(t, T.freccia + .3, T.freccia + 1.3));
  const kct = life(t, T.freccia + 1.2, T.v, .4, .4);
  lab(ctx, '{dim:coda}', .3, -.75, kct, 32);   // sotto la fila di O e dei numeri dell'asse x, staccata da tutti e due lab(ctx, '{dim:testa}', 3.0, 1.4, kct, 32);
  lab(ctx, '{mx:u⃗}', 3.45, .6, P(t, T.nome + .2, T.nome + .6), 44);
  // v⃗: parte dalla testa di u⃗, poi scivola nell'origine
  const cv = codaV(t);
  freccia(ctx, S(cv[0], cv[1]), S(cv[0] + 1, cv[1] + 2), C.y, P(t, T.v + .3, T.v + 1.1));
  lab(ctx, '{my:v⃗}', cv[0] + 1.45, cv[1] + 1.55, P(t, T.v + .5, T.v + .9), 44);
  // la somma: testa-coda, poi la diagonale del parallelogramma
  const ks = 1 - P(t, T.origine, T.origine + .4);
  freccia(ctx, S(0, 0), S(4, 3), C.g, P(t, T.somma + .3, T.somma + 1.3), ks, 8);
  freccia(ctx, S(0, 0), S(4, 3), C.g, P(t, T.diag + .3, T.diag + 1.3), 1, 8);
  lab(ctx, '{mg:u⃗ + v⃗}', 4.35, 3.45, Math.max(P(t, T.somma + 1.2, T.somma + 1.6) * ks, P(t, T.diag + 1.2, T.diag + 1.6)), 40);
  ctx.restore();
}

// la scheda a destra: i due vettori, le due regole, i conti
const XC = 1500, XL = 1195;
function riga(ctx, s, y, size, al, align = 'center') {
  if (al <= .01) return;
  drawRich(ctx, s, align === 'left' ? XL : XC, y, { size, alpha: al, align });
}
function separa(ctx, y, al) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1190, y); ctx.lineTo(1810, y); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < T.comp || t > FINE + .2) return;
  const al = life(t, T.comp + 1.5, FINE + .1, .5, .7);
  card(ctx, 1150, 110, 700, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'la somma', XC, 165, { size: 40, weight: 600 }));
  riga(ctx, '{mx:u⃗}{mink: = (3; 1)}', 240, 48, P(t, T.comp + 1.8, T.comp + 2.3));
  riga(ctx, '{my:v⃗}{mink: = (1; 2)}', 305, 48, P(t, T.v + .6, T.v + 1.1));
  separa(ctx, 350, P(t, T.v + .6, T.v + 1.1));
  // pagina 1: le regole e le componenti
  const p1 = 1 - P(t, T.modulo, T.modulo + .4);
  riga(ctx, 'regola {v:testa-coda}', 400, 36, P(t, T.regola + .2, T.regola + .6) * p1);
  riga(ctx, 'regola del {v:parallelogramma}', 455, 36, P(t, T.copia + 1.6, T.copia + 2.0) * p1);
  riga(ctx, '{dim:danno la} {g:stessa freccia}', 510, 34, P(t, T.diag + 1.2, T.diag + 1.6) * p1);
  separa(ctx, 555, P(t, T.orizz + .2, T.orizz + .6) * p1);
  riga(ctx, '{dim:in orizzontale}   {mink:3 + 1 = }{mg:4}', 605, 40, P(t, T.orizz + .5, T.orizz + 1.0) * p1);
  riga(ctx, '{dim:in verticale}   {mink:1 + 2 = }{mg:3}', 665, 40, P(t, T.vert + .5, T.vert + 1.0) * p1);
  // il risultato: compare in fondo, poi sale in cima alla pagina 2
  const yr = lerp(745, 405, P(t, T.modulo + .1, T.modulo + .9, E.io));
  riga(ctx, '{mg:u⃗ + v⃗ = (4; 3)}', yr, 52, P(t, T.comp2 + .3, T.comp2 + .8));
  // pagina 2: le lunghezze
  const p2 = P(t, T.modulo + .8, T.modulo + 1.2);
  separa(ctx, 455, p2);
  riga(ctx, '{mink:|u⃗ + v⃗| = ?}', 510, 44, life(t, T.modulo + 1.0, T.pitagora + .6, .4, .3));
  riga(ctx, '{mink:|u⃗ + v⃗| = √(4² + 3²) = √25 = }{mg:5}', 510, 40, P(t, T.pitagora + .6, T.pitagora + 1.1));
  riga(ctx, '{mx:|u⃗|}{mink: = √(3² + 1²) = √10}', 590, 40, P(t, T.lungh + .2, T.lungh + .7));
  riga(ctx, '{my:|v⃗|}{mink: = √(1² + 2²) = √5}', 650, 40, P(t, T.lungh + 1.2, T.lungh + 1.7));
  riga(ctx, '{mink:|u⃗| + |v⃗| ≈ }{mr:5,40}', 725, 44, P(t, T.non + .3, T.non + .8));
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La somma di due vettori si fa testa-coda,\no componente per componente.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'regola', '{v:testa-coda}'], [960, 'parallelogramma', 'la {v:diagonale}'], [1450, 'componenti', '{mink:(3; 1) + (1; 2) = }{mg:(4; 3)}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 232, 445, 464, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: i === 2 ? 38 : 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7],                                                   // il piano
    ['traccia', T.freccia + .3, T.freccia + 1.3], ['pop', T.nome + .2, .4],                   // u⃗ e il suo nome
    ['traccia', T.comp + .3, T.comp + 1.1], ['tono', T.comp + 1.1, T.comp + 1.6, [.2, .35]],  // 3 a destra, 1 in su
    ['soffio', T.comp + 1.5], ['pop', T.comp + 1.8, .4],                                       // la scheda, u⃗ = (3; 1)
    ['traccia', T.v + .3, T.v + 1.1], ['pop', T.v + .6, .5],                                  // v⃗ dalla testa di u⃗
    ['traccia', T.v + 1.1, T.v + 1.7], ['tono', T.v + 1.7, T.v + 2.3, [.35, .65]],            // 1 a destra, 2 in su
    ['traccia', T.somma + .3, T.somma + 1.3], ['ding', T.somma + 1.3],                        // la somma
    ['pop', T.regola + .2, .5],
    ['tono', T.origine + .4, T.origine + 2.0, [.6, .3, .1]],                                  // v⃗ scivola nell'origine
    ['traccia', T.copia + .3, T.copia + 1.1], ['traccia', T.copia + .8, T.copia + 1.6], ['pop', T.copia + 1.6, .5],
    ['traccia', T.diag + .3, T.diag + 1.3], ['ding', T.diag + 1.3],                           // la diagonale
    ['pop', T.perche + .2, .6],
    ['traccia', T.orizz + .3, T.orizz + 1.0], ['pop', T.orizz + .5, .5],                      // in orizzontale
    ['tono', T.vert + .3, T.vert + 1.0, [.3, .7]], ['pop', T.vert + .5, .6],                  // in verticale
    ['ding', T.comp2 + .3],                                                                   // (4; 3)
    ['tono', T.modulo + .1, T.modulo + .9, [.3, .8]],                                         // il risultato sale
    ['traccia', T.pitagora + .3, T.pitagora + 1.3], ['ding', T.pitagora + 1.4],               // Pitagora: 5
    ['pop', T.lungh + .2, .5], ['pop', T.lungh + 1.2, .4], ['pop', T.non + .3, .3],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Testa e coda', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.origine - .2, 'testa-coda'], [T.origine - .2, T.orizz - .2, 'il parallelogramma'],
      [T.orizz - .2, T.modulo - .2, 'componente per componente'], [T.modulo - .2, FINE, 'la lunghezza']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
