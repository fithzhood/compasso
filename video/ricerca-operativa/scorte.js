'use strict';
/* Quanto ordinare — il lotto economico. Un negozio vende 1200 pezzi all'anno; ogni ordine costa 50 €, tenere un pezzo
   in magazzino costa 3 € all'anno. Con q pezzi a ordine: costo delle ordinazioni 1200/q · 50 (scende), costo di
   magazzino 3 · q/2 (sale: in media in magazzino ci sono q/2 pezzi). Il totale ha il minimo in q = 200, proprio dove
   le due curve si incrociano: 60 000/q = 1,5 · q, q² = 40 000. A q = 200: 6 ordini, 300 € + 300 € = 600 €.
   Controprova: q = 100 → 600 + 150 = 750 €; q = 400 → 150 + 600 = 750 €.
   Argomento: ricerca-operativa (non c'è ancora: sezione «Problemi di scelta: il lotto economico»). */
CVIDEO.registra('ricerca-operativa/scorte', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['dati', 5.4, 'Un negozio vende {g:1200} pezzi all’anno\ne li ordina al fornitore.'],
  ['ordine', 5.6, 'Ogni ordine costa {g:50 €}, qualunque\nsia la quantità ordinata.'],
  ['magaz', 5.4, 'Tenere un pezzo in magazzino\ncosta {g:3 €} all’anno.'],
  ['q', 6.6, 'Chiamo {mx:q} i pezzi di ogni ordine:\nfaccio {mink:1200/}{mx:q} ordini all’anno.'],
  ['cOrd', 7.0, 'Costo delle ordinazioni: {mink:50 · 1200/}{mx:q}.\nPiù grande è {mx:q}, più {g:scende}.'],
  ['scorta', 7.0, 'Il magazzino si svuota piano piano:\nin media ci sono {mx:q}{mink:/2} pezzi.'],
  ['cMag', 6.6, 'Costo di magazzino: {mink:3 · }{mx:q}{mink:/2}.\nPiù grande è {mx:q}, più {r:sale}.'],
  ['somma', 5.4, 'Il costo totale è la {v:somma}\ndelle due curve.'],
  ['minimo', 4.6, 'Ha un punto più basso:\nil {g:minimo}.'],
  ['incrocio', 6.0, 'E il minimo cade proprio dove\nle due curve si {v:incrociano}!'],
  ['uguali', 6.8, 'Lì i due costi sono uguali:\n{mink:50 · 1200/}{mx:q}{mink: = 3 · }{mx:q}{mink:/2}.'],
  ['q200', 6.6, 'Cioè {mx:q}{mink:² = 40 000}, {mx:q}{mink: =} {g:200}:\nè il {v:lotto economico}.'],
  ['conti', 7.2, 'Sono 6 ordini: 300 € di ordinazioni\ne 300 € di magazzino, {g:600 €}.'],
  ['prova', 6.6, 'Con 100 o con 400 pezzi a ordine\nsi spende di più: {r:750 €}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Ordinare tanto in una volta sola,\no poco alla volta?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'In questo modello il totale è minimo\ndove i due costi si pareggiano.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.minimo, 'felice'], [T.minimo + 2.2, 'neutro'], [T.incrocio, 'sorpreso'], [T.incrocio + 2.6, 'neutro'],
  [T.q200 + .8, 'festa'], [T.q200 + 3.2, 'neutro'], [T.conti + 1.0, 'felice'], [T.conti + 3.4, 'neutro'],
  [T.prova + 1.0, 'pensa'], [T.prova + 3.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// il piano dei costi: q in pezzi (orizzontale), costo in euro (verticale), due scale diverse
const RQ = [70, 110, 990, 690];
const PL = { ox: 200, oy: 725, sx: 1.45, sy: .55, x1: 540, y1: 1000 };
const S = (q, c) => [PL.ox + q * PL.sx, PL.oy - c * PL.sy];
const ORD = q => 60000 / q, MAG = q => 1.5 * q, TOT = q => ORD(q) + MAG(q);
const curva = (f, a, b, n = 160) => { const p = []; for (let i = 0; i <= n; i++) { const q = lerp(a, b, i / n); p.push(S(q, f(q))); } return p; };
const P_ORD = curva(ORD, 60, 530), P_MAG = curva(MAG, 0, 530), P_TOT = curva(TOT, 200 / 3, 530);   // tutte sotto i 1000 €
function assi(ctx, k, k200) {
  if (k <= 0) return;
  const { ox, oy, sx, sy, x1, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let q = 100; q <= x1; q += 100) { const x = ox + q * sx; ctx.beginPath(); ctx.moveTo(x, oy - y1 * sy * k); ctx.lineTo(x, oy + 8); ctx.stroke(); }
  for (let c = 200; c <= y1; c += 200) { const y = oy - c * sy; ctx.beginPath(); ctx.moveTo(ox - 8, y); ctx.lineTo(ox + x1 * sx * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox - 14, oy); ctx.lineTo(ox + (x1 + 12) * sx * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy + 14); ctx.lineTo(ox, oy - (y1 + 40) * sy * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + 12) * sx * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + 40) * sy * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // numeri sotto l'asse q e a sinistra dell'asse dei costi: le curve stanno tutte sopra e a destra
  for (let q = 100; q <= x1; q += 100) {
    const verde = q === 200 ? k200 : 0;
    txt(ctx, String(q), ox + q * sx, oy + 34, { size: 30 + 8 * verde, weight: verde > .5 ? 600 : 500, color: verde > .5 ? C.g : C.dim });
  }
  for (let c = 200; c <= y1; c += 200) txt(ctx, String(c), ox - 18, oy - c * sy, { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:q}', ox + (x1 + 12) * sx + 36, oy, { size: 44 });
  drawRich(ctx, '{dim:costo in €}', ox + 22, oy - (y1 + 40) * sy - 2, { size: 30, align: 'left' });
  ctx.restore();
}
// il magazzino nel tempo: si riempie di q pezzi e si svuota piano piano (tre ordini)
function dentiSega(ctx, al) {
  if (al <= 0) return;
  const R = [660, 150, 370, 250];
  card(ctx, ...R, al);
  ctx.save(); ctx.globalAlpha *= al;
  txt(ctx, 'pezzi in magazzino', R[0] + R[2] / 2, 180, { size: 30, color: C.dim });
  const ox = 700, oy = 360, w = 240, h = 140;
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - h - 14); ctx.lineTo(ox, oy); ctx.lineTo(ox + w + 10, oy); ctx.stroke();
  arrowHead(ctx, [ox + w + 14, oy], 0, C.ink, .8);
  const kd = P(al, 0, 1);
  ctx.strokeStyle = css(C.y); ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(ox, oy - h);
  for (let i = 0; i < 3; i++) { const x0 = ox + i * w / 3; ctx.lineTo(x0 + w / 3, oy); if (i < 2) ctx.lineTo(x0 + w / 3, oy - h); }
  ctx.stroke();
  ctx.setLineDash([9, 9]); ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox, oy - h / 2); ctx.lineTo(ox + w, oy - h / 2); ctx.stroke(); ctx.setLineDash([]);
  drawRich(ctx, '{mx:q}', ox - 22, oy - h, { size: 40 });
  drawRich(ctx, '{mx:q}{mink:/2}', ox + w + 12, oy - h / 2 - 2, { size: 36, align: 'left' });
  txt(ctx, 'tempo', ox + w - 30, oy + 26, { size: 30, color: C.dim });
  ctx.restore();
  return kd;
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quanto ordinare', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · il piano dei costi, che arriva con la prima curva (T.cOrd–FINE)
function scenePiano(ctx, t) {
  if (t < T.cOrd - .3 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.cOrd - .3, T.cOrd + .4) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, ...RQ);
  assi(ctx, P(t, T.cOrd - .1, T.cOrd + .7), P(t, T.q200 + 1.6, T.q200 + 2.0));
  // le tre curve
  glowStroke(ctx, P_ORD, P(t, T.cOrd + .7, T.cOrd + 2.1, E.lin), C.x, 5);
  dentiSega(ctx, life(t, T.scorta + .3, T.cMag + .5, .5, .4));
  glowStroke(ctx, P_MAG, P(t, T.cMag + .7, T.cMag + 2.1, E.lin), C.y, 5);
  glowStroke(ctx, P_TOT, P(t, T.somma + .3, T.somma + 1.9, E.lin), C.v, 6);
  // l'incrocio e il minimo sulla stessa verticale q = 200
  const kv = P(t, T.incrocio + .5, T.incrocio + 1.5);
  if (kv > 0) dashed(ctx, S(200, 0), S(200, 600), C.dim, kv, 1);
  dot(ctx, S(200, 300), C.v, P(t, T.incrocio + .3, T.incrocio + .7, E.back), 11);
  dot(ctx, S(200, 600), C.g, P(t, T.minimo + .3, T.minimo + .7, E.back), 12);
  // la controprova: 100 e 400 pezzi costano 750 €, più del minimo
  const kp = P(t, T.prova + .4, T.prova + 1.0);
  if (kp > 0) {
    dashed(ctx, S(100, 750), S(400, 750), C.r, P(t, T.prova + .8, T.prova + 1.6), 1);
    dot(ctx, S(100, 750), C.r, P(t, T.prova + .4, T.prova + .8, E.back), 10);
    dot(ctx, S(400, 750), C.r, P(t, T.prova + .7, T.prova + 1.1, E.back), 10);
  }
  ctx.restore();
}
function dashed(ctx, a, b, col, k, al) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}

// 2 · la scheda dei dati e dei conti: prima al centro, poi a destra quando arriva il piano
const SCH0 = [420, 150, 1080, 540], SCH1 = [1090, 110, 770, 690];
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  const km = P(t, T.cOrd - .3, T.cOrd + .5);
  const [x, y, w, h] = SCH0.map((v, i) => lerp(v, SCH1[i], km));
  card(ctx, x, y, w, h, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  const XL = x + 40, XR = x + w - 40, XC = x + w / 2;
  const riga = (nome, val, yy, al) => {
    if (al <= 0) return;
    ctx.save(); ctx.globalAlpha *= al;
    drawRich(ctx, '{dim:' + nome + '}', XL, yy, { size: 32, align: 'left' });
    drawRich(ctx, val, XR, yy, { size: 44, align: 'right' });
    ctx.restore();
  };
  // i dati, finché non si cerca dove i costi sono uguali
  const k1 = 1 - P(t, T.uguali, T.uguali + .4);
  if (k1 > 0) {
    ctx.save(); ctx.globalAlpha *= k1;
    riga('vendite in un anno', '{mink:1200}{dim: pezzi}', y + 70, P(t, T.dati + .3, T.dati + .8));
    riga('costo di un ordine', '{mink:50 €}', y + 140, P(t, T.ordine + .3, T.ordine + .8));
    riga('un pezzo in magazzino', '{mink:3 €}{dim: all’anno}', y + 210, P(t, T.magaz + .3, T.magaz + .8));
    const kq = P(t, T.q + .3, T.q + .8);
    if (kq > 0) { ctx.save(); ctx.globalAlpha *= kq; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, y + 255); ctx.lineTo(XR, y + 255); ctx.stroke(); ctx.restore(); }
    riga('pezzi a ordine', '{mx:q}', y + 300, kq);
    riga('ordini in un anno', '{mink:1200/}{mx:q}', y + 370, P(t, T.q + 1.6, T.q + 2.1));
    ctx.restore();
  }
  // la legenda dei costi, sotto
  const kL = 1 - P(t, T.prova, T.prova + .4);
  const leg = (nome, col, items, yy, al) => {
    if (al <= 0) return;
    ctx.save(); ctx.globalAlpha *= al * kL;
    ctx.strokeStyle = css(col); ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(XL, yy); ctx.lineTo(XL + 40, yy); ctx.stroke();
    drawRich(ctx, nome, XL + 60, yy, { size: 32, align: 'left' });
    if (typeof items === 'string') drawRich(ctx, items, XR, yy, { size: 32, align: 'right' });
    else drawSeq(ctx, items, XR - 130, yy, 40);
    ctx.restore();
  };
  leg('{x:ordinazioni}', C.x, ['{mink:50 ·}', { num: '{mink:1200}', den: '{mx:q}' }], y + 475, P(t, T.cOrd + .7, T.cOrd + 1.2));
  leg('{y:magazzino}', C.y, ['{mink:3 ·}', { num: '{mx:q}', den: '{mink:2}' }], y + 570, P(t, T.cMag + .7, T.cMag + 1.2));
  leg('{v:totale}', C.v, '{dim:la somma delle due}', y + 650, P(t, T.somma + .3, T.somma + .8));
  // dove i costi sono uguali
  const k2 = life(t, T.uguali + .2, T.conti + .1, .5, .4);
  if (k2 > 0) {
    ctx.save(); ctx.globalAlpha *= k2;
    drawSeq(ctx, ['{mink:50 ·}', { num: '{mink:1200}', den: '{mx:q}' }, '{mink:= 3 ·}', { num: '{mx:q}', den: '{mink:2}' }], XC, y + 100, 48, { local: t - T.uguali - .3 });
    lab(ctx, '{mink:60 000 = 1,5 · }{mx:q}{mink:²}', XC, y + 225, P(t, T.q200 + .3, T.q200 + .7), 44);
    lab(ctx, '{mx:q}{mink:² = 40 000}', XC, y + 295, P(t, T.q200 + .8, T.q200 + 1.2), 44);
    lab(ctx, '{mx:q}{mink: = √40 000 =} {mg:200}', XC, y + 365, P(t, T.q200 + 1.4, T.q200 + 1.8), 44);
    ctx.restore();
  }
  // i conti con 200 pezzi a ordine
  const k3 = P(t, T.conti + .2, T.conti + .6);
  if (k3 > 0) {
    ctx.save(); ctx.globalAlpha *= k3;
    lab(ctx, '{mx:q}{mink: =} {mg:200}', XC, y + 80, 1, 52);
    riga('ordini', '{mink:1200/200 = 6}', y + 165, P(t, T.conti + .5, T.conti + .9));
    riga('ordinazioni', '{mink:50 · 6 = 300 €}', y + 235, P(t, T.conti + 1.0, T.conti + 1.4));
    riga('magazzino', '{mink:3 · 100 = 300 €}', y + 305, P(t, T.conti + 1.5, T.conti + 1.9));
    riga('totale', '{mg:600 €}', y + 375, P(t, T.conti + 2.0, T.conti + 2.4));
    ctx.restore();
  }
  // la controprova
  const k4 = P(t, T.prova + .4, T.prova + .8);
  if (k4 > 0) {
    ctx.save(); ctx.globalAlpha *= k4;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, y + 430); ctx.lineTo(XR, y + 430); ctx.stroke();
    riga('con 100 pezzi', '{mink:600 + 150 =} {r:750 €}', y + 495, P(t, T.prova + .4, T.prova + .8));
    riga('con 400 pezzi', '{mink:150 + 600 =} {r:750 €}', y + 575, P(t, T.prova + .9, T.prova + 1.3));
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'In questo modello il costo totale è minimo\ndove ordinazioni e magazzino costano uguale.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, '{x:ordinazioni}{dim:, scende}', ['{mink:50 ·}', { num: '{mink:1200}', den: '{mx:q}' }]],
    [960, '{y:magazzino}{dim:, sale}', ['{mink:3 ·}', { num: '{mx:q}', den: '{mink:2}' }]], [1450, '{v:lotto economico}', ['{mx:q}{mink: =} {mg:200}']]];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 225, 445, 450, 175);
    drawRich(ctx, testa, x, 484, { size: 32, weight: 400 });
    drawSeq(ctx, s, x, 562, 40);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza delle curve mentre si disegnano
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5],
    ['pop', T.dati + .3, .5], ['pop', T.ordine + .3, .55], ['pop', T.magaz + .3, .6],     // i dati
    ['pop', T.q + .3, .5], ['pop', T.q + 1.6, .6],                                         // q e gli ordini
    ['soffio', T.cOrd - .3], ['traccia', T.cOrd - .1, T.cOrd + .7],                        // arriva il piano
    ['tono', T.cOrd + .7, T.cOrd + 2.1, [1, .45, .3, .22, .17, .14, .12]],                 // le ordinazioni scendono
    ['soffio', T.scorta + .3], ['tono', T.scorta + .5, T.scorta + 1.7, [.8, .2, .8, .2, .8, .2]],   // il magazzino si svuota tre volte
    ['tono', T.cMag + .7, T.cMag + 2.1, [0, .2, .4, .6, .78]],                             // il magazzino sale
    ['tono', T.somma + .3, T.somma + 1.9, [.95, .75, .62, .6, .63, .7, .8, .88]],          // il totale: scende e risale
    ['pop', T.minimo + .3, .6],                                                            // il minimo
    ['pop', T.incrocio + .3, .3], ['traccia', T.incrocio + .5, T.incrocio + 1.5],          // l'incrocio, la verticale
    ['pop', T.uguali + .3, .5],
    ['pop', T.q200 + .3, .5], ['pop', T.q200 + .8, .55], ['ding', T.q200 + 1.4],           // q = 200
    ['pop', T.conti + .5, .4], ['pop', T.conti + 1.0, .45], ['pop', T.conti + 1.5, .5], ['ding', T.conti + 2.0],
    ['pop', T.prova + .4, .75], ['pop', T.prova + .7, .75], ['traccia', T.prova + .8, T.prova + 1.6],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quanto ordinare', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.cOrd - .2, 'i dati'], [T.cOrd - .2, T.minimo - .1, 'due costi e la loro somma'], [T.minimo - .1, FINE, 'il lotto economico']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
