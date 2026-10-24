'use strict';
/* Dove si comincia a guadagnare — costo C(q) = 2000 + 5q (2000 € di costi fissi più 5 € a maglietta), ricavo
   R(q) = 15q: le rette si incontrano a q = 200, dove R = C = 3000 € (punto di pareggio). Profitto P(q) = R − C = 10q − 2000:
   negativo prima di 200 (P(100) = −1000 €), positivo dopo (P(300) = +1000 €).
   Assi con unità diverse: q in pezzi (50 per tacca), euro in verticale (1000 per tacca).
   Argomento: matematica-economia (ancora da creare). */
CVIDEO.registra('matematica-economia/pareggio', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['q', 4.0, 'Chiamo {mink:q} il numero di magliette\nprodotte e vendute.'],
  ['fissi', 4.6, '{y:Costi fissi}: 2000 € al mese,\nanche senza produrre niente.'],
  ['C', 5.4, 'Poi {y:5 €} per ogni maglietta:\n{mink:C(q) = 2000 + 5q}.'],
  ['assi', 4.4, 'In orizzontale i pezzi, in verticale\ngli euro: {v:unità diverse}.', .3],
  ['retC', 4.8, 'Il costo è una {y:retta} che parte\nda {y:2000 €} e sale piano.'],
  ['R', 6.0, 'Ogni maglietta si vende a {x:15 €}:\nil ricavo è {mink:R(q) = 15q}.'],
  ['retR', 3.8, 'Il ricavo parte da {x:zero}\nma sale più ripido.'],
  ['inc', 5.6, 'Le due rette si incontrano\ndove {mink:15q = 2000 + 5q}.', .2],
  ['q200', 4.0, '{mink:10q = 2000}, cioè {g:q = 200}.'],
  ['par', 6.0, 'È il {g:punto di pareggio}:\na 200 magliette {mink:R = C =} {g:3000 €}.'],
  ['perd', 4.6, 'Prima di 200 il costo sta sopra:\nè la zona di {r:perdita}.', .2],
  ['guad', 4.4, 'Dopo 200 il ricavo sta sopra:\nè la zona di {g:guadagno}.'],
  ['P', 5.4, 'Il {v:profitto} è ricavo meno costo:\n{mink:P(q) = 10q − 2000}.'],
  ['p100', 4.4, 'Con 100 magliette:\n{mink:P(100) =} {r:−1000 €}, si perde.'],
  ['p300', 4.6, 'Con 300 magliette:\n{mink:P(300) =} {g:+1000 €}, si guadagna.'],
];
const T = {}, FUMETTI = [[1.8, 6.4, 'Un laboratorio fa magliette:\nquante deve venderne per guadagnare?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Il pareggio è dove ricavo e costo\nsi incontrano: oltre, si guadagna.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.q200 + 1.0, 'felice'], [T.par, 'festa'], [T.par + 2.6, 'neutro'],
  [T.p100, 'sorpreso'], [T.p100 + 2.4, 'neutro'], [T.p300, 'felice'], [T.p300 + 2.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const costo = q => 2000 + 5 * q, ricavo = q => 15 * q;

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Dove si comincia\na guadagnare', W / 2, 215, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function schede(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  card(ctx, 60, 110, 1120, 690, life(t, T.q - .1, FINE + .2, .5, .5));
  card(ctx, 1210, 110, 650, 690, life(t, T.q, FINE + .2, .5, .5));
}

// ---- il piano: q in pezzi (2,3 px a pezzo), euro in verticale (0,104 px a euro): unità e scale diverse ----
const OX = 180, OY = 730, UQ = 2.3, UE = .104;
const toS = (q, e) => [OX + q * UQ, OY - e * UE];
function assi(ctx, k, kv) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let q = 50; q <= 350; q += 50) { const x = toS(q, 0)[0]; ctx.beginPath(); ctx.moveTo(x, OY); ctx.lineTo(x, OY - (OY - toS(0, 5500)[1]) * k); ctx.stroke(); }
  for (let e = 1000; e <= 5000; e += 1000) { const y = toS(0, e)[1]; ctx.beginPath(); ctx.moveTo(OX, y); ctx.lineTo(OX + 350 * UQ * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  const xe = OX + 360 * UQ * k, ye = OY - 5700 * UE * k;
  ctx.beginPath(); ctx.moveTo(OX - 6, OY); ctx.lineTo(xe, OY); ctx.moveTo(OX, OY + 6); ctx.lineTo(OX, ye); ctx.stroke();
  arrowHead(ctx, [xe + 6, OY], 0, C.ink); arrowHead(ctx, [OX, ye - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // i numeri stanno sotto l'asse q e a sinistra dell'asse degli euro: le rette non ci passano mai
  for (let q = 0; q <= 350; q += 50) txt(ctx, String(q), toS(q, 0)[0], OY + 32, { size: 30, color: C.dim });
  for (let e = 1000; e <= 5000; e += 1000) txt(ctx, String(e), OX - 16, toS(0, e)[1], { size: 30, color: C.dim, align: 'right' });
  // i nomi degli assi, con le unità (si colorano mentre Ada dice «unità diverse»)
  const cu = kv > 0 ? C.v : C.dim;
  drawRich(ctx, '{mink:q}', xe + 22, OY, { size: 40, align: 'left' });
  txt(ctx, '(pezzi)', xe + 52, OY + 2, { size: 30, color: cu, align: 'left' });
  txt(ctx, 'euro (€)', OX + 24, ye + 4, { size: 30, color: cu, align: 'left' });
  ctx.restore();
}
function zona(ctx, q0, q1, col, al) {   // la parte fra le due rette, da q0 a q1
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .14); ctx.beginPath();
  for (let q = q0; q <= q1; q += 5) { const p = toS(q, ricavo(q)); q === q0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); }
  for (let q = q1; q >= q0; q -= 5) { const p = toS(q, costo(q)); ctx.lineTo(p[0], p[1]); }
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function segmento(ctx, q, col, k) {   // il profitto a q pezzi: da C(q) a R(q)
  if (k <= 0) return;
  const a = toS(q, costo(q)), b = toS(q, ricavo(q)), e = [a[0], lerp(a[1], b[1], k)];
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.restore();
}
function scenePiano(ctx, t) {
  if (t < T.q - .1 || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.q - .1, T.q + .4) * (1 - P(t, FINE - .5, FINE));
  // le due zone, sotto a tutto
  const kz = 1 - P(t, T.p100, T.p100 + .4) * .4;
  zona(ctx, 0, 200, C.r, P(t, T.perd + .3, T.perd + .9) * kz);
  zona(ctx, 200, 350, C.g, P(t, T.guad + .3, T.guad + .9) * kz);
  assi(ctx, P(t, T.q + .3, T.q + 1.2), life(t, T.assi + .3, T.retC, .3, .4));   // gli assi arrivano con q, i colori quando Ada dice «unità diverse»
  // le due rette
  glowStroke(ctx, [toS(0, costo(0)), toS(350, costo(350))], P(t, T.retC + .3, T.retC + 1.5, E.lin), C.y, 5);
  glowStroke(ctx, [toS(0, 0), toS(350, ricavo(350))], P(t, T.retR + .2, T.retR + 1.4, E.lin), C.x, 5);
  dot(ctx, toS(0, 2000), C.y, P(t, T.fissi + .4, T.fissi + .8, E.back), 9);   // i costi fissi: 2000 € anche con q = 0
  drawRich(ctx, '{my:C(q)}', toS(320, 0)[0], 402, { size: 40, alpha: P(t, T.retC + 1.4, T.retC + 1.8) });
  drawRich(ctx, '{mx:R(q)}', toS(243, 0)[0], 290, { size: 40, alpha: P(t, T.retR + 1.3, T.retR + 1.7) });
  // il punto di pareggio
  const pp = toS(200, 3000), kp = P(t, T.inc + .3, T.inc + .7, E.back);
  if (t > T.par + .2) {
    dashed(ctx, pp, toS(200, 0), C.g, P(t, T.par + .2, T.par + .8));
    dashed(ctx, pp, toS(0, 3000), C.g, P(t, T.par + .2, T.par + .8));
  }
  dot(ctx, pp, C.g, kp, 11);
  txt(ctx, 'punto di pareggio', toS(140, 0)[0], 358, { size: 32, color: C.g, weight: 600, alpha: P(t, T.par + .2, T.par + .6) });
  // le scritte delle zone, finché non arrivano i profitti
  const kl = 1 - P(t, T.p100, T.p100 + .4);
  txt(ctx, 'perdita', toS(50, 0)[0], 575, { size: 34, color: C.r, weight: 600, alpha: P(t, T.perd + .5, T.perd + .9) * kl });
  txt(ctx, 'guadagno', toS(330, 0)[0], 312, { size: 34, color: C.g, weight: 600, alpha: P(t, T.guad + .5, T.guad + .9) * kl });
  // il profitto a 100 e a 300 magliette: la distanza fra le rette
  segmento(ctx, 100, C.r, P(t, T.p100 + .3, T.p100 + .9));
  drawRich(ctx, '{r:−1000 €}', toS(100, 0)[0] - 16, 530, { size: 36, align: 'right', alpha: P(t, T.p100 + .8, T.p100 + 1.2) });
  segmento(ctx, 300, C.g, P(t, T.p300 + .3, T.p300 + .9));
  drawRich(ctx, '{g:+1000 €}', toS(300, 0)[0] + 16, 314, { size: 36, align: 'left', alpha: P(t, T.p300 + .8, T.p300 + 1.2) });
  ctx.restore();
}

// ---- la scheda a destra ----
const XL = 1250, XR = 1820, XM = 1535;
function riga(ctx, nome, s, y, al) {
  if (al <= 0) return;
  txt(ctx, nome, XL, y, { size: 32, color: C.dim, align: 'left', alpha: al });
  drawRich(ctx, s, XR, y, { size: 44, align: 'right', alpha: al });
}
function sceneScheda(ctx, t) {
  if (t < T.q || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.q, T.q + .5) * (1 - P(t, FINE - .5, FINE));
  riga(ctx, 'magliette', '{mink:q}', 172, P(t, T.q + .3, T.q + .7));
  riga(ctx, 'costi fissi', '{y:2000 €}', 242, P(t, T.fissi + .3, T.fissi + .7));
  riga(ctx, 'costo', '{my:C(q) = 2000 + 5q}', 312, P(t, T.C + .5, T.C + .9));
  riga(ctx, 'ricavo', '{mx:R(q) = 15q}', 382, P(t, T.R + .5, T.R + .9));
  const kd = P(t, T.inc + .2, T.inc + .6);
  if (kd > 0) { ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 430); ctx.lineTo(XR, 430); ctx.stroke(); ctx.restore(); }
  // il pareggio
  const ka = 1 - P(t, T.P, T.P + .4);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka;
    drawRich(ctx, '{mink:15q = 2000 + 5q}', XM, 490, { size: 44, local: t - T.inc - .3 });
    drawRich(ctx, '{mink:10q = 2000}', XM, 558, { size: 44, local: t - T.q200 - .2 });
    drawRich(ctx, '{mg:q = 200}', XM, 630, { size: 52, local: t - T.q200 - 1.0 });
    drawRich(ctx, '{mink:R(200) = C(200) =} {g:3000 €}', XM, 715, { size: 40, local: t - T.par - .3 });
    ctx.restore();
  }
  // il profitto
  txt(ctx, 'profitto = ricavo − costo', XM, 482, { size: 30, color: C.dim, alpha: P(t, T.P + .3, T.P + .7) });
  drawRich(ctx, '{mv:P(q) = 10q − 2000}', XM, 545, { size: 44, local: t - T.P - .5 });
  drawRich(ctx, '{mink:10 · 100 − 2000 =} {r:−1000 €}', XM, 640, { size: 40, local: t - T.p100 - .3 });
  drawRich(ctx, '{mink:10 · 300 − 2000 =} {g:+1000 €}', XM, 725, { size: 40, local: t - T.p300 - .3 });
  ctx.restore();
}

// ---- in una frase (FINE–DUR) ----
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il {g:pareggio} è dove ricavo e costo\nsi incontrano: oltre, si {g:guadagna}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'costo', '{my:C(q) = 2000 + 5q}'], [960, 'ricavo', '{mx:R(q) = 15q}'], [1450, 'pareggio', '{mg:q = 200}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    txt(ctx, testa, x, 486, { size: 32, color: C.dim });
    drawRich(ctx, s, x, 548, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza delle rette
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', T.q], ['pop', T.q + .4, .4], ['pop', T.C + .6, .5],                        // q, C(q)
    ['traccia', T.q + .3, T.q + 1.2],                                                            // il piano
    ['pop', T.fissi + .5, .36], ['tono', T.retC + .3, T.retC + 1.5, [.36, .68]],                   // il costo
    ['pop', T.R + .6, .6], ['tono', T.retR + .2, T.retR + 1.4, [0, .95]],                         // il ricavo, più ripido
    ['pop', T.inc + .4, .55], ['pop', T.q200 + .3, .5], ['ding', T.q200 + 1.1],                   // q = 200
    ['traccia', T.par + .2, T.par + .8],                                                          // R = C = 3000 €
    ['soffio', T.perd + .3], ['soffio', T.guad + .3],                                            // le due zone
    ['pop', T.P + .6, .5],                                                                        // P(q)
    ['tono', T.p100 + .3, T.p100 + .9, [.43, .27]], ['pop', T.p100 + .9, .25],                     // −1000 €
    ['tono', T.p300 + .3, T.p300 + .9, [.64, .82]], ['ding', T.p300 + .9],                         // +1000 €
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Dove si comincia a guadagnare', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.inc - .2, 'costo e ricavo'], [T.inc - .2, T.perd - .2, 'il pareggio'], [T.perd - .2, FINE, 'perdita e guadagno']],
    scena(ctx, t) { schede(ctx, t); sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
