'use strict';
/* Il prezzo si mette d'accordo — domanda q = 100 − 2p (scende), offerta q = 3p − 20 (sale): equilibrio dove sono
   uguali, 5p = 120, p = 24 €, q = 52. Poi a ogni prezzo si offrono 15 pezzi in più: l'offerta diventa q = 3p − 5,
   la retta si sposta a destra e l'equilibrio la segue: 5p = 105, p = 21 €, q = 58.
   Convenzione dell'economia: il prezzo p sull'asse verticale, la quantità q su quello orizzontale.
   Argomento: matematica-economia (ancora da creare). */
CVIDEO.registra('matematica-economia/domanda-offerta', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['simboli', 4.5, 'Il prezzo è {mink:p}, in euro;\nla quantità è {mink:q}, in pezzi.'],
  ['assi', 4.2, 'Il prezzo va sull’asse {v:verticale},\ncome si fa in economia.', .3],
  ['dom', 4.8, 'La {x:domanda}: quanto la gente compra.\n{mink:q = 100 − 2p}.'],
  ['domGiu', 4.0, 'Più il prezzo sale, {x:meno} si compra:\nla domanda {x:scende}.'],
  ['off', 4.8, 'L’{y:offerta}, quanto si vuole vendere:\n{mink:q = 3p − 20}.'],
  ['offSu', 4.0, 'Più il prezzo sale, {y:più} si offre:\nl’offerta {y:sale}.'],
  ['inc', 3.6, 'Dove si incrociano, domanda\ne offerta sono {g:uguali}.', .2],
  ['conto', 5.8, '{mink:100 − 2p = 3p − 20},\ncioè {mink:5p = 120}.'],
  ['p24', 3.4, 'Il prezzo di {g:equilibrio} è {g:24 €}.'],
  ['q52', 6.3, 'A 24 € si comprano e si vendono\n{mink:100 − 48 =} {g:52} pezzi.'],
  ['sposta', 5.0, 'Arriva più merce: a ogni prezzo\nsi offrono {y:15 pezzi in più}.', .3],
  ['destra', 5.6, 'L’offerta diventa {mink:q = 3p − 5}:\nla retta si sposta a {y:destra}.'],
  ['nuovo', 7.0, 'Nuovo incrocio: {mink:100 − 2p = 3p − 5},\ncioè {mink:5p = 105}.'],
  ['p21', 4.8, 'Il prezzo {g:scende} a {g:21 €}\ne la quantità {g:sale} a {g:58}.'],
];
const T = {}, FUMETTI = [[1.8, 6.4, 'Chi compra e chi vende:\nquale prezzo li mette d’accordo?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'L’equilibrio sta all’incrocio:\nse una retta si sposta, lo segue.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.p24, 'festa'], [T.p24 + 2.6, 'neutro'], [T.sposta, 'sorpreso'], [T.sposta + 2.4, 'neutro'],
  [T.p21, 'felice'], [T.p21 + 2.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il prezzo si mette\nd’accordo', W / 2, 215, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function schede(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  card(ctx, 60, 110, 1120, 690, life(t, T.assi - .3, FINE + .2, .5, .5));
  card(ctx, 1210, 110, 650, 690, life(t, T.simboli, FINE + .2, .5, .5));
}

// ---- il piano: q in orizzontale (8 px a pezzo), p in verticale (11 px a euro) ----
const OX = 180, OY = 730, UQ = 8, UP = 11;
const toS = (q, p) => [OX + q * UQ, OY - p * UP];
// lo spostamento dell'offerta, in pezzi: 0 prima, 15 dopo
const sh = t => 15 * P(t, T.destra + .4, T.destra + 2.0, E.io);
const offerta = s => { const p0 = (20 - s) / 3, p1 = (120 - s) / 3; return [toS(0, p0), toS(100, p1)]; };   // q = 3p − 20 + s, da q = 0 a q = 100
function assi(ctx, k, kv) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let q = 20; q <= 100; q += 20) { const x = toS(q, 0)[0]; ctx.beginPath(); ctx.moveTo(x, OY); ctx.lineTo(x, OY - (OY - toS(0, 50)[1]) * k); ctx.stroke(); }
  for (let p = 10; p <= 50; p += 10) { const y = toS(0, p)[1]; ctx.beginPath(); ctx.moveTo(OX, y); ctx.lineTo(OX + 100 * UQ * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  const xe = OX + 104 * UQ * k, ye = OY - 53 * UP * k;
  ctx.beginPath(); ctx.moveTo(OX - 6, OY); ctx.lineTo(xe, OY); ctx.moveTo(OX, OY + 6); ctx.lineTo(OX, ye); ctx.stroke();
  arrowHead(ctx, [xe + 6, OY], 0, C.ink); arrowHead(ctx, [OX, ye - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // i numeri: sotto l'asse q e a sinistra dell'asse p, dove le rette non passano
  for (let q = 0; q <= 100; q += 20) txt(ctx, String(q), toS(q, 0)[0], OY + 32, { size: 30, color: C.dim });
  for (let p = 10; p <= 50; p += 10) txt(ctx, String(p), OX - 16, toS(0, p)[1], { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mink:q}', xe + 22, OY, { size: 40, align: 'left' });
  txt(ctx, '(pezzi)', xe + 50, OY + 2, { size: 30, color: C.dim, align: 'left' });
  // l'asse del prezzo, colorato mentre Ada dice «verticale»
  drawRich(ctx, kv > 0 ? '{mv:p}' : '{mink:p}', OX + 24, ye + 4, { size: 40, align: 'left' });
  txt(ctx, 'prezzo (€)', OX + 54, ye + 6, { size: 30, color: kv > 0 ? C.v : C.dim, align: 'left' });
  ctx.restore();
}
function freccia(ctx, a, b, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0] - 8, b[1]); ctx.stroke(); ctx.restore();
  arrowHead(ctx, b, 0, col, al);
}
// un punto d'equilibrio: pallino, proiezioni sugli assi, coordinate nel cuneo a destra (fra le due rette)
function equilibrio(ctx, q, p, kp, kd, kl, lx) {
  const e = toS(q, p);
  if (kd > 0) { dashed(ctx, e, toS(q, 0), C.g, 1, kd); dashed(ctx, e, toS(0, p), C.g, 1, kd); }
  dot(ctx, e, C.g, kp, 11);
  drawRich(ctx, '{mink:p =} {g:' + p + ' €}\n{mink:q =} {g:' + q + '}', lx, e[1], { size: 36, alpha: kl });   // prima p, poi q, come nella scheda
}
function scenePiano(ctx, t) {
  if (t < T.assi - .3 || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.assi - .3, T.assi + .2) * (1 - P(t, FINE - .5, FINE));
  assi(ctx, P(t, T.assi + .1, T.assi + 1.0), life(t, T.assi + .8, T.dom, .3, .4));
  // la domanda
  glowStroke(ctx, [toS(0, 50), toS(100, 0)], P(t, T.domGiu + .2, T.domGiu + 1.6, E.lin), C.x, 5);
  txt(ctx, 'domanda', 935, 610, { size: 32, color: C.x, weight: 600, alpha: P(t, T.domGiu + 1.4, T.domGiu + 1.8) });
  // l'offerta: la vecchia resta tratteggiata quando si sposta
  const s = sh(t);
  const kg = P(t, T.destra + .4, T.destra + .8);
  if (kg > 0) {
    const [a, b] = offerta(0);
    ctx.save(); ctx.globalAlpha *= kg * .6; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
  }
  glowStroke(ctx, offerta(s), P(t, T.offSu + .2, T.offSu + 1.6, E.lin), C.y, 5);
  const lo = toS(88 + s, 36);
  txt(ctx, 'offerta', lo[0] + 40, lo[1] + 45, { size: 32, color: C.y, weight: 600, alpha: P(t, T.offSu + 1.4, T.offSu + 1.8) });
  // 15 pezzi in più a ogni prezzo
  const ka = life(t, T.sposta + .3, T.destra + 2.2, .5, .4);
  [[10, 0], [20, .25], [28, .5]].forEach(([p, d]) => {
    const q = 3 * p - 20, k = P(t, T.sposta + .3 + d, T.sposta + .8 + d);
    freccia(ctx, toS(q, p), toS(q + 15, p), C.y, ka * k);
  });
  drawRich(ctx, '{y:+15 pezzi}', toS(50, 20)[0], toS(0, 20)[1] + 32, { size: 30, alpha: ka * P(t, T.sposta + .6, T.sposta + 1.0) * (1 - P(t, T.destra, T.destra + .4)) });
  // il primo equilibrio: resta come pallino tenue quando arriva il nuovo
  const k1 = P(t, T.inc + .3, T.inc + .7, E.back);
  const vecchio = 1 - .65 * P(t, T.destra + .4, T.destra + 1.0);
  ctx.save(); ctx.globalAlpha *= vecchio;
  equilibrio(ctx, 52, 24, k1, life(t, T.p24 + .2, T.sposta + .2, .5, .4), life(t, T.q52 + .5, T.sposta, .4, .4), 790);
  ctx.restore();
  // il nuovo equilibrio
  equilibrio(ctx, 58, 21, P(t, T.nuovo + .3, T.nuovo + .7, E.back), P(t, T.p21 + .2, T.p21 + .7), P(t, T.p21 + .5, T.p21 + .9), 830);
  ctx.restore();
}

// ---- la scheda a destra ----
const XL = 1250, XR = 1820, XM = 1535;
function riga(ctx, sinistra, destra, y, al, mat) {
  if (al <= 0) return;
  if (mat) { drawRich(ctx, sinistra, XL, y, { size: 44, align: 'left', alpha: al }); txt(ctx, destra, XR, y, { size: 32, color: C.dim, align: 'right', alpha: al }); }
  else { txt(ctx, sinistra, XL, y, { size: 32, color: C.dim, align: 'left', alpha: al }); drawRich(ctx, destra, XR, y, { size: 44, align: 'right', alpha: al }); }
}
function linea(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(XL, y); ctx.lineTo(XR, y); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < T.simboli || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.simboli, T.simboli + .5) * (1 - P(t, FINE - .5, FINE));
  riga(ctx, '{mink:p}', 'prezzo, in euro', 172, P(t, T.simboli + .3, T.simboli + .7), true);
  riga(ctx, '{mink:q}', 'quantità, in pezzi', 237, P(t, T.simboli + 1.8, T.simboli + 2.2), true);
  linea(ctx, 280, P(t, T.dom, T.dom + .4));
  riga(ctx, 'domanda', '{mx:q = 100 − 2p}', 330, P(t, T.dom + .5, T.dom + .9));
  const kn = P(t, T.destra + .3, T.destra + .7);
  riga(ctx, 'offerta', '{my:q = 3p − 20}', 400, P(t, T.off + .5, T.off + .9) * (1 - kn));
  riga(ctx, 'offerta', '{my:q = 3p − 5}', 400, kn);
  linea(ctx, 445, P(t, T.conto, T.conto + .4));
  // il primo equilibrio
  const k1 = 1 - P(t, T.destra + .3, T.destra + .7);   // i conti vecchi spariscono quando cambia l'offerta
  if (k1 > 0) {
    ctx.save(); ctx.globalAlpha *= k1;
    drawRich(ctx, '{mink:100 − 2p = 3p − 20}', XM, 500, { size: 44, local: t - T.conto - .3 });
    drawRich(ctx, '{mink:5p = 120}', XM, 568, { size: 44, local: t - T.conto - 2.6 });
    drawRich(ctx, '{mink:p =} {g:24 €}', XM, 640, { size: 52, local: t - T.p24 - .2 });
    drawRich(ctx, '{mink:q = 100 − 48 =} {g:52}', XM, 720, { size: 44, local: t - T.q52 - .3 });
    ctx.restore();
  }
  // il nuovo equilibrio
  drawRich(ctx, '{mink:100 − 2p = 3p − 5}', XM, 500, { size: 44, local: t - T.nuovo - .5 });
  drawRich(ctx, '{mink:5p = 105}', XM, 568, { size: 44, local: t - T.nuovo - 3.2 });
  drawRich(ctx, '{mink:p =} {g:21 €}', XM, 640, { size: 52, local: t - T.p21 - .3 });
  drawRich(ctx, '{mink:q = 100 − 42 =} {g:58}', XM, 720, { size: 44, local: t - T.p21 - 2.0 });
  ctx.restore();
}

// ---- in una frase (FINE–DUR) ----
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L’{g:equilibrio} sta dove domanda e offerta\nsi incontrano, e le segue quando si spostano.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'la domanda scende', '{mx:q = 100 − 2p}'], [960, 'l’offerta sale', '{my:q = 3p − 20}'], [1450, 'più offerta', '{g:da 24 € a 21 €}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    txt(ctx, testa, x, 486, { size: 32, color: C.dim });
    drawRich(ctx, s, x, 548, { size: 40 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue il prezzo
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', T.simboli], ['pop', T.simboli + .4, .5], ['pop', T.simboli + 1.9, .4],         // p e q
    ['soffio', T.assi - .3], ['traccia', T.assi + .1, T.assi + 1.0],                           // il piano
    ['pop', T.dom + .6, .5], ['tono', T.domGiu + .2, T.domGiu + 1.6, [.95, 0]],                // la domanda scende
    ['pop', T.off + .6, .5], ['tono', T.offSu + .2, T.offSu + 1.6, [.13, .8]],                 // l'offerta sale
    ['pop', T.inc + .4, .48], ['pop', T.conto + .4, .5], ['pop', T.conto + 2.7, .5],           // l'incrocio, i conti
    ['traccia', T.p24 + .2, T.p24 + .7],                                                       // p = 24 €
    ['pop', T.q52 + .4, .5], ['ding', T.q52 + .7],                                             // q = 52
    ['traccia', T.sposta + .3, T.sposta + .8], ['traccia', T.sposta + .8, T.sposta + 1.3],      // + 15 pezzi
    ['tono', T.destra + .4, T.destra + 2.0, [.8, .7]],                                         // l'offerta si sposta
    ['pop', T.nuovo + .4, .42], ['pop', T.nuovo + 3.3, .45],                                   // nuovo incrocio
    ['traccia', T.p21 + .2, T.p21 + .7], ['ding', T.p21 + .6],                                 // 21 € e 58 pezzi
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il prezzo si mette d’accordo', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.inc - .3, 'domanda e offerta'], [T.inc - .3, T.sposta - .2, 'l’equilibrio'], [T.sposta - .2, FINE, 'l’offerta si sposta']],
    scena(ctx, t) { schede(ctx, t); sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
