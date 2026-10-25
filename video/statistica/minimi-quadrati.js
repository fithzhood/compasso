'use strict';
/* Quadrati più piccoli possibile — la retta di regressione come retta dei minimi quadrati. Cinque punti (2; 2), (4; 2),
   (6; 5), (8; 4), (10; 7), medie (6; 4). Per ogni retta y = mx + q gli scarti verticali yᵢ − (m·xᵢ + q) diventano lati
   di quadrati veri (stessa scala sui due assi); la somma delle aree vale 18 per y = 4, scende ruotando intorno a (6; 4)
   fino al minimo 3,6 con y = 0,6x + 0,4 (m = 24/40, q = 4 − 0,6 · 6), risale a 10 con y = x − 2 e a 8,6 con
   y = 0,6x + 1,4. Il minimo su tutte le rette è proprio lì (controllato con node). Argomento: statistica
   (sezione «Due caratteri insieme: tabelle e correlazione»). */
CVIDEO.registra('statistica/minimi-quadrati', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, fixedNum, fmtN, dot, glowStroke, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['punti', 5.2, 'Cinque coppie di dati {mink:(}{mx:x}{mink:; }{my:y}{mink:)}:\nuna {v:nuvola di punti}.'],
  ['retta', 5.2, 'Provo una retta qualunque:\nquella orizzontale {mink:y = 4}.'],
  ['scarti', 6.0, 'Da ogni punto vado {v:in verticale}\nfino alla retta: è lo {v:scarto}.'],
  ['verticale', 5.6, 'Proprio in verticale: si confronta\nla {my:y} vera con quella della retta.'],
  ['quadrati', 6.0, 'Su ogni scarto costruisco un {y:quadrato}:\nil lato è lungo quanto lo scarto.'],
  ['scala', 4.4, 'Gli assi hanno la stessa scala:\nsono quadrati veri.'],
  ['somma', 6.0, 'Sommo le aree: {r:18}. Questo numero\ndice quanto la retta sbaglia.'],
  ['ruota', 6.4, 'Ruoto la retta intorno al punto delle\nmedie, {mink:(6; 4)}: la somma {g:scende}.', .3],
  ['minimo', 5.0, 'Qui la somma è la più piccola: {g:3,6}.'],
  ['oltre', 5.4, 'Se ruoto ancora, i quadrati ricrescono:\nla somma risale a {r:10}.'],
  ['alza', 5.6, 'Anche alzando la retta migliore,\nla somma cresce: {r:8,6}.', 1.8],
  ['regressione', 6.6, 'È la {g:retta di regressione}:\n{mink:y = 0,6x + 0,4}.', 1.8],
  ['nome', 5.0, 'Per questo si chiama anche\nretta dei {v:minimi quadrati}.'],
  ['tabella', 5.0, 'Ogni altra retta provata\nha una somma più grande.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Fra tanti punti, quale retta\nci passa più vicino?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'La retta di regressione rende minima\nla somma dei quadrati degli scarti.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.somma + 1.0, 'sorpreso'], [T.somma + 3.2, 'neutro'], [T.minimo, 'felice'], [T.minimo + 2.4, 'neutro'],
  [T.regressione, 'festa'], [T.regressione + 2.6, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// i dati: medie 6 e 4; la retta migliore y = 0,6x + 0,4
const X = [2, 4, 6, 8, 10], Y = [2, 2, 5, 4, 7];
// il quadrato sta dalla parte dello scarto da cui la retta si allontana (le pendenze sono tutte ≥ 0): la retta non lo attraversa mai
const somma = (m, q) => X.reduce((s, x, i) => s + Math.pow(Y[i] - m * x - q, 2), 0);
// la retta nel tempo: y = 4, poi ruota intorno a (5; 4) fino a m = 0,6, oltre fino a 1, torna, poi sale di 1 e torna
function kf2(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], P(t, keys[i - 1][0], keys[i][0], E.io));
  return keys[keys.length - 1][1];
}
const mRetta = t => kf2(t, [[T.ruota + .4, 0], [T.ruota + 4.6, .6], [T.oltre + .3, .6], [T.oltre + 2.3, 1], [T.alza - 1.6, 1], [T.alza - .2, .6]]);
const dRetta = t => kf2(t, [[T.alza + .4, 0], [T.alza + 2.0, 1], [T.regressione - 1.6, 1], [T.regressione - .2, 0]]);
const retta = t => { const m = mRetta(t); return [m, 4 - 6 * m + dRetta(t)]; };

// il piano: stessa unità sui due assi, così i quadrati sono quadrati anche sullo schermo
const RQ = [70, 110, 930, 690];
const PL = { ox: 125, oy: 740, u: 66, x1: 11.4, y1: 8.4 };
const S = (x, y) => [PL.ox + x * PL.u, PL.oy - y * PL.u];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x1, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= x1; i++) { const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy + 8); ctx.stroke(); }
  for (let j = 1; j <= y1; j++) { const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox - 8, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox - 14, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy + 14); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // numeri sotto l'asse x e a sinistra dell'asse y: rette e quadrati restano nel primo quadrante
  for (let i = 1; i <= x1; i++) txt(ctx, String(i), ox + i * u, oy + 32, { size: 30, color: C.dim });
  for (let j = 1; j <= y1; j++) txt(ctx, String(j), ox - 20, oy - j * u, { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// la retta y = mx + q tagliata sul riquadro del primo quadrante
function segmentoRetta(m, q) {
  const pts = [[0, q], [PL.x1, m * PL.x1 + q]];
  if (m) { pts.push([-q / m, 0]); pts.push([(PL.y1 - q) / m, PL.y1]); }
  const dentro = pts.filter(([x, y]) => x > -1e-9 && x < PL.x1 + 1e-9 && y > -1e-9 && y < PL.y1 + 1e-9).sort((a, b) => a[0] - b[0]);
  return [S(dentro[0][0], dentro[0][1]), S(dentro[dentro.length - 1][0], dentro[dentro.length - 1][1])];
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quadrati più piccoli\npossibile', W / 2, 205, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · i punti, la retta, gli scarti e i loro quadrati (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // stessa scala: un passo su x e un passo su y, uguali
  const ks = life(t, T.scala + .3, T.somma, .4, .4);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks; ctx.fillStyle = css(C.g, .18); ctx.fillRect(PL.ox, PL.oy - PL.u, PL.u, PL.u); ctx.restore();
    glowStroke(ctx, [S(0, 0), S(1, 0)], ks, C.g, 8); glowStroke(ctx, [S(0, 0), S(0, 1)], ks, C.g, 8);  }
  const [m, q] = retta(t), kr = P(t, T.retta + .3, T.retta + 1.3, E.lin);
  const verde = P(t, T.regressione + .2, T.regressione + .8);
  // i quadrati degli scarti, sotto a tutto il resto
  const kq = P(t, T.quadrati + .4, T.quadrati + 1.6);
  if (kq > 0) {
    ctx.save(); ctx.beginPath(); ctx.rect(PL.ox, PL.oy - PL.y1 * PL.u, PL.x1 * PL.u, PL.y1 * PL.u); ctx.clip();
    X.forEach((x, i) => {
      const yr = m * x + q, e = Y[i] - yr, lato = Math.abs(e) * kq;
      if (lato < .01) return;
      const a = S(x, yr), b = S(x + (e > 0 ? -1 : 1) * lato, Y[i]);
      ctx.fillStyle = css(C.y, .2); ctx.strokeStyle = css(C.y, .9); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.rect(Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
  }
  // gli scarti: dalla retta al punto, in verticale
  const kv = P(t, T.scarti + .4, T.scarti + 1.2);
  if (kv > 0) X.forEach((x, i) => {
    const yr = m * x + q, a = S(x, yr), b = S(x, lerp(yr, Y[i], kv));
    ctx.save(); ctx.strokeStyle = css(C.y); ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
  });
  // la retta
  if (kr > 0) glowStroke(ctx, segmentoRetta(m, q), kr, mix(C.v, C.g, verde), 5);
  // il punto delle medie, intorno a cui ruota
  const kp = life(t, T.ruota + .2, T.oltre + 2.4, .4, .5);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(...S(6, 4), 14, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    lab(ctx, '{mv:(6; 4)}', S(6.95, 3.3)[0], S(6.95, 3.3)[1], kp, 40);
  }
  // i punti
  X.forEach((x, i) => dot(ctx, S(x, Y[i]), C.ink, P(t, T.punti + .3 + i * .25, T.punti + .7 + i * .25, E.back), 11));
  // il confronto sull'ultimo punto: la y vera e quella della retta
  const kc = life(t, T.verticale + .3, T.quadrati + .2, .4, .4);
  lab(ctx, '{my:7}', S(10.4, 7)[0], S(10.4, 7)[1], kc, 40);
  lab(ctx, '{mv:4}', S(10.4, 4.45)[0], S(10.4, 4.45)[1], kc, 40);
  // l'equazione della retta di regressione
  lab(ctx, '{mg:y = 0,6x + 0,4}', S(5.6, 8.0)[0], S(5.6, 8.0)[1], P(t, T.regressione + .6, T.regressione + 1.1), 44, 'left');
  ctx.restore();
}

// la scheda a destra: i dati, poi la somma delle aree e le rette provate
const XL = 1100, XR = 1800, XC = 1450;
const PROVE = [['{mv:y = 4}', '18', 'somma'], ['{mv:y = 0,6x + 0,4}', '3,6', 'minimo'], ['{mv:y = x − 2}', '10', 'oltre'], ['{mv:y = 0,6x + 1,4}', '8,6', 'alza']];
const T_PROVA = [() => T.somma + .5, () => T.minimo + .4, () => T.oltre + 2.4, () => T.alza + 2.1];
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  // il titolo cambia quando arriva la somma delle aree
  const kTit = P(t, T.somma + .1, T.somma + .6);
  conFont(TITOLI, () => {
    drawRich(ctx, 'i dati', XC, 172, { size: 40, weight: 600, alpha: P(t, 7.9, 8.4) * (1 - kTit) });
    drawRich(ctx, 'i dati e quanto sbaglia la retta', XC, 172, { size: 40, weight: 600, alpha: kTit });
  });
  // la tabella dei dati, poi le due medie (prima che Ada nomini il punto delle medie)
  const kd = P(t, T.punti + .2, T.punti + .7);
  if (kd > 0) {
    ctx.save(); ctx.globalAlpha *= kd;
    drawRich(ctx, '{mx:x}', XL + 10, 245, { size: 44 }); drawRich(ctx, '{my:y}', XL + 10, 305, { size: 44 });
    X.forEach((x, i) => { txt(ctx, String(x), XL + 120 + i * 95, 245, { size: 44 }); txt(ctx, String(Y[i]), XL + 120 + i * 95, 305, { size: 44 }); });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL + 60, 215); ctx.lineTo(XL + 60, 335); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(XL - 30, 360); ctx.lineTo(XR, 360); ctx.stroke();
    const km = P(t, T.ruota - .3, T.ruota + .2);
    if (km > 0) {
      ctx.save(); ctx.globalAlpha *= km;
      ctx.beginPath(); ctx.moveTo(XL + 545, 215); ctx.lineTo(XL + 545, 335); ctx.stroke();
      // x̄ e ȳ: la lettera con il trattino sopra, come \overline nel sito
      [['x', C.x, 245], ['y', C.y, 305]].forEach(([l, col, y]) => {
        drawRich(ctx, '{m' + l + ':' + l + '}', XL + 600, y, { size: 44 });
        ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(XL + 588, y - 27); ctx.lineTo(XL + 614, y - 27); ctx.stroke();
        drawRich(ctx, '{mink:= ' + (l === 'x' ? 6 : 4) + '}', XL + 628, y, { size: 44, align: 'left' });
      });
      ctx.restore();
    }
    ctx.restore();
  }
  // l'ultimo punto: scarto e area del suo quadrato
  lab(ctx, '{dim:ultimo punto, scarto:}  {mink:7 − 4 = 3}', XC, 425, life(t, T.verticale + .5, T.quadrati + .3, .4, .4), 40);
  lab(ctx, '{dim:area del suo quadrato:}  {mink:3 · 3 = 9}', XC, 425, life(t, T.quadrati + 1.6, T.somma + .3, .4, .4), 40);
  // la somma delle aree, che cambia con la retta
  const kS = P(t, T.somma + .3, T.somma + .8);
  if (kS > 0) {
    const [m, q] = retta(t), s = somma(m, q), minimo = Math.abs(s - 3.6) < .02;
    ctx.save(); ctx.globalAlpha *= kS;
    txt(ctx, 'somma delle aree', XL - 20, 425, { size: 34, color: C.dim, align: 'left' });
    fixedNum(ctx, Math.abs(s - Math.round(s)) < .005 ? String(Math.round(s)) : fmtN(s, 1), XR - 10, 425, 64, minimo && t > T.minimo ? C.g : C.ink);
    ctx.fillStyle = css(minimo && t > T.minimo ? C.g : C.y, .75);
    ctx.beginPath(); ctx.roundRect(XL - 20, 478, 720 * s / 18, 26, 8); ctx.fill();
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL - 30, 550); ctx.lineTo(XR, 550); ctx.stroke();
    ctx.restore();
  }
  // le rette provate
  const kT = P(t, T.tabella + .3, T.tabella + .8);
  PROVE.forEach(([eq, val], i) => {
    const a = P(t, T_PROVA[i](), T_PROVA[i]() + .5); if (a <= 0) return;
    const y = 600 + i * 50, top = i === 1 && t > T.regressione + .2;
    if (i === 1 && kT > 0) { ctx.save(); ctx.globalAlpha *= kT; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(XL - 30, y - 24, XR - XL + 30, 48, 12); ctx.stroke(); ctx.restore(); }
    lab(ctx, eq, XL - 10, y, a, 40, 'left');
    txt(ctx, val, XR - 20, y, { size: 44, weight: top ? 600 : 500, color: top ? C.g : (i === 0 ? C.ink : C.ink), align: 'right', alpha: a });
  });
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La retta di regressione rende minima\nla somma dei quadrati degli scarti.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'scarti', '{y:verticali}'], [960, 'su ogni scarto', '{y:un quadrato}'], [1450, 'somma minima', '{mg:y = 0,6x + 0,4}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 32, weight: 400 });
    drawRich(ctx, s, x, 548, { size: 40 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la somma delle aree mentre la retta si muove
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],                                     // il piano
    ['pop', T.punti + .3, .2], ['pop', T.punti + .55, .2], ['pop', T.punti + .8, .5], ['pop', T.punti + 1.05, .4], ['pop', T.punti + 1.3, .7],
    ['traccia', T.retta + .3, T.retta + 1.3],                                                    // la retta y = 4
    ['traccia', T.scarti + .4, T.scarti + 1.2],                                                  // gli scarti
    ['pop', T.verticale + .5, .6],
    ['tono', T.quadrati + .4, T.quadrati + 1.6, [.1, .6]],                                       // i quadrati crescono
    ['traccia', T.scala + .3, T.scala + .9],
    ['pop', T.somma + .3, .9],                                                                   // la somma: 18
    ['tono', T.ruota + .4, T.ruota + 4.6, [.9, .6, .35, .22, .2]], ['ding', T.minimo + .3],      // scende fino a 3,6
    ['tono', T.oltre + .3, T.oltre + 2.3, [.2, .3, .5]], ['pop', T.oltre + 2.4, .5],             // risale a 10
    ['tono', T.alza - 1.6, T.alza - .2, [.5, .2]],                                               // torna
    ['tono', T.alza + .4, T.alza + 2.0, [.2, .45]], ['pop', T.alza + 2.1, .45],                  // sale: 8,6
    ['tono', T.regressione - 1.6, T.regressione - .2, [.45, .2]], ['ding', T.regressione + .3],  // la retta di regressione
    ['pop', T.tabella + .3, .6],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quadrati più piccoli possibile', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.quadrati - .2, 'gli scarti'], [T.quadrati - .2, T.ruota - .2, 'i quadrati'], [T.ruota - .2, FINE, 'la somma più piccola']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
