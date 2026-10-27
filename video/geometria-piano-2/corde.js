'use strict';
/* Il prodotto che non cambia — circonferenza di centro O e raggio 5, P a distanza 2 dal centro. Una corda per P
   la divide in PA e PB: col diametro PA = 3 e PB = 7, prodotto 21 = 5² − 2²; la corda gira intorno a P
   (45°: PA ≈ 3,38, PB ≈ 6,21; perpendicolare a OP: √21 ≈ 4,58 ciascuno) e il prodotto resta 21.
   Chiude con il teorema delle corde PA · PB = PC · PD. I pezzi si misurano sempre da P.
   Argomento: geometria-piano-2 (la teoria sta in geometria-piano-2, § corde-secanti). */
CVIDEO.registra('geometria-piano-2/corde', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, fmtN, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['circ', 4.4, 'Una circonferenza di centro {mink:O}\ne raggio {g:5}.'],
  ['P', 4.8, 'Dentro, un punto {mink:P} a distanza {v:2}\ndal centro: {mink:OP = 2}.'],
  ['corda', 5.0, 'Una corda per {mink:P} la divide in due\npezzi: {mx:PA} e {my:PB}.'],
  ['misure', 5.0, 'Questa passa per il centro:\n{mx:PA = 3} e {my:PB = 7}.'],
  ['prodotto', 3.8, 'Il prodotto: {mink:3 · 7 =} {g:21}.'],
  ['perche1', 4.4, 'Infatti {x:3} è {mink:5 − 2}\ne {y:7} è {mink:5 + 2}…'],
  ['perche2', 7.2, '…il prodotto è {mink:5² − 2²}: quadrato\ndel raggio meno quadrato di {mink:OP}.'],
  ['giro', 3.8, 'Ora giro la corda intorno a {mink:P}…', .3],
  ['cambiano', 6.0, 'I pezzi cambiano: {mx:PA ≈ 3,38}\ne {my:PB ≈ 6,21}…'],
  ['resta', 3.8, '…ma il prodotto è ancora {g:21}!'],
  ['giro2', 4.4, 'Giro ancora, fino a una corda\n{v:perpendicolare} a {mink:OP}…', .3],
  ['uguali', 6.2, '…i due pezzi sono uguali:\n{mink:√21 ≈ 4,58} ciascuno.'],
  ['ancora', 3.8, 'E il prodotto? Sempre {g:21}.'],
  ['cd', 5.4, '{mink:CD} è la prima corda:\n{mink:PC · PD = 3 · 7 =} {g:21}.'],
  ['corde', 6.0, '{v:Teorema delle corde}: per due corde\nper {mink:P}, {mink:PA · PB = PC · PD}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Una corda gira intorno a un punto:\nche cosa non cambia?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Comunque giri la corda per {mink:P}, il\nprodotto dei due pezzi non cambia.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.prodotto, 'felice'], [T.prodotto + 2.2, 'neutro'], [T.perche2, 'pensa'], [T.perche2 + 3.0, 'neutro'],
  [T.resta, 'sorpreso'], [T.resta + 2.2, 'neutro'], [T.ancora, 'festa'], [T.cd, 'neutro'],
  [T.corde, 'felice'], [T.corde + 2.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// la figura: centro O, raggio 5 (U pixel per unità), P a distanza 2 a destra di O
const RAD = Math.PI / 180, U = 56, O = [520, 462], R = 5 * U, PP = [O[0] + 2 * U, O[1]];
const Pc = (g, r = R) => [O[0] + r * Math.cos(g * RAD), O[1] - r * Math.sin(g * RAD)];
// l'inclinazione della corda (gradi): ferma tranne mentre Ada la gira
const theta = t => 45 * P(t, T.giro + .3, T.giro + 3.0, E.io) + 45 * P(t, T.giro2 + .3, T.giro2 + 3.0, E.io);
// i due pezzi, misurati da P: PA verso la direzione della corda, PB dalla parte opposta
function pezzi(g) {
  const pu = 2 * Math.cos(g * RAD), r = Math.sqrt(pu * pu + 21);
  const u = [Math.cos(g * RAD), -Math.sin(g * RAD)], a = r - pu, b = r + pu;
  return { a, b, u, A: [PP[0] + a * U * u[0], PP[1] + a * U * u[1]], B: [PP[0] - b * U * u[0], PP[1] - b * U * u[1]], n: [Math.sin(g * RAD), Math.cos(g * RAD)] };
}
function seg(ctx, a, b, col, w = 4, k = 1, al = 1, dash) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };
// etichetta accanto a una retta di normale n: abbastanza lontana perché il rettangolo del testo non la tocchi
function accanto(ctx, s, p, n, al, size = 40) {
  if (al <= 0) return;
  const w = richW(ctx, s, size), d = .5 * w * Math.abs(n[0]) + .5 * size * Math.abs(n[1]) + 14;
  drawRich(ctx, s, p[0] + n[0] * d, p[1] + n[1] * d, { size, alpha: al });
}
const esatto = g => g < 1e-6;
const misura = (v, g) => esatto(g) ? String(Math.round(v)) : fmtN(v, 2);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il prodotto che non cambia', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const kc = P(t, T.circ + .2, T.circ + 1.5, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.arc(O[0], O[1], R, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * kc); ctx.stroke(); ctx.restore();
  }
  // il raggio, 5
  // il raggio, 5: quando si presenta la circonferenza e di nuovo mentre Ada dice «quadrato del raggio»
  const kr = Math.max(P(t, T.circ + 1.4, T.circ + 2.0) * (1 - P(t, T.corda, T.corda + .4)), life(t, T.perche1 + .2, T.giro + .2, .4, .3));
  const kr5 = Math.max(P(t, T.circ + 1.8, T.circ + 2.2) * (1 - P(t, T.corda, T.corda + .4)), life(t, T.perche1 + .3, T.giro + .2, .4, .3));
  const Rq = Pc(135);
  seg(ctx, O, Rq, C.g, 4, kr);
  lab(ctx, '{g:5}', [(O[0] + Rq[0]) / 2 + 24, (O[1] + Rq[1]) / 2 - 24], kr5);
  const g = theta(t), Q = pezzi(g);
  // la corda di prima, CD, con i suoi pezzi 3 e 7
  const kg = P(t, T.cd + .3, T.cd + .9), D0 = pezzi(0);
  if (kg > 0) {
    seg(ctx, PP, D0.A, C.x, 4, 1, .55 * kg); seg(ctx, PP, D0.B, C.y, 4, 1, .55 * kg);
    dot(ctx, D0.A, C.ink, kg, 7); dot(ctx, D0.B, C.ink, kg, 7);
    lab(ctx, '{mink:C}', Pc(0, R + 40), kg); lab(ctx, '{mink:D}', Pc(180, R + 40), kg);
    const k37 = P(t, T.cd + .8, T.cd + 1.2);
    lab(ctx, '{x:3}', [(PP[0] + D0.A[0]) / 2, O[1] + 36], k37, 40);   // sotto: sopra c'è il nome di P
    lab(ctx, '{y:7}', [lerp(PP[0], D0.B[0], .62), O[1] - 34], k37, 40);
  }
  // OP, tratteggiato: quando si presenta P e quando la corda le diventa perpendicolare
  const kop = Math.max(life(t, T.P + .6, T.corda + .3, .5, .4), life(t, T.giro2 + .3, T.cd + .3, .5, .4));
  seg(ctx, O, PP, C.v, 4, 1, kop, [10, 9]);
  lab(ctx, '{v:2}', [(O[0] + PP[0]) / 2, O[1] - 32], kop, 40);
  // OP sopra la corda, come una quota, mentre Ada dice «5 − 2» e «quadrato di OP»
  const kq2 = life(t, T.perche1 + .3, T.giro + .2, .4, .3);
  if (kq2 > 0) {
    const y = O[1] - 22;
    seg(ctx, [O[0], y], [PP[0], y], C.v, 4, 1, kq2);
    seg(ctx, [O[0], y - 10], [O[0], y + 10], C.v, 3, 1, kq2); seg(ctx, [PP[0], y - 10], [PP[0], y + 10], C.v, 3, 1, kq2);
    lab(ctx, '{v:2}', [(O[0] + PP[0]) / 2, y - 28], kq2, 40);
  }
  // la corda: PA azzurro, PB arancio, che partono da P
  const kch = P(t, T.corda + .3, T.corda + 1.3);
  seg(ctx, PP, Q.A, C.x, 6, kch); seg(ctx, PP, Q.B, C.y, 6, kch);
  // le lunghezze, dalla parte opposta all'etichetta di P; solo mentre la corda è ferma
  const kn = Math.max(life(t, T.misure + .3, T.giro + .3, .4, .3), life(t, T.cambiano + .3, T.giro2 + .3, .4, .3), life(t, T.uguali + .3, FINE, .4, .3));
  if (kn > 0) {
    const m = [-Q.n[0], -Q.n[1]], s = esatto(g) ? '' : '≈ ';
    accanto(ctx, '{x:' + s + misura(Q.a, g) + '}', [(PP[0] + Q.A[0]) / 2, (PP[1] + Q.A[1]) / 2], m, kn);
    accanto(ctx, '{y:' + s + misura(Q.b, g) + '}', [lerp(PP[0], Q.B[0], .62), lerp(PP[1], Q.B[1], .62)], m, kn);   // oltre la metà: lontano da O
  }
  // i punti e i loro nomi
  dot(ctx, O, C.ink, P(t, T.circ + .4, T.circ + .7, E.back), 7);
  // O sotto il centro; si spegne mentre la corda gira da 0° a 45°, perché la corda le passerebbe sopra
  lab(ctx, '{mink:O}', [O[0], O[1] + 38], P(t, T.circ + .5, T.circ + .9) * (1 - life(t, T.giro + .1, T.giro + 3.3, .25, .3)), 40);
  const kab = P(t, T.corda + 1.2, T.corda + 1.6, E.back);
  dot(ctx, Q.A, C.ink, kab, 8); dot(ctx, Q.B, C.ink, kab, 8);
  const rA = Math.atan2(O[1] - Q.A[1], Q.A[0] - O[0]) / RAD, rB = Math.atan2(O[1] - Q.B[1], Q.B[0] - O[0]) / RAD;
  lab(ctx, '{mink:A}', Pc(rA, R + 40), P(t, T.corda + 1.3, T.corda + 1.7));
  lab(ctx, '{mink:B}', Pc(rB, R + 40), P(t, T.corda + 1.5, T.corda + 1.9));
  dot(ctx, PP, C.ink, P(t, T.P + .3, T.P + .6, E.back), 9);
  // P: dalla parte della corda lontana da O; con la corda CD, in alto a destra
  const kq = P(t, T.cd + .3, T.cd + .9), dP = 36;
  const pl = [PP[0] + lerp(Q.n[0] * dP, 30, kq), PP[1] + lerp(Q.n[1] * dP, -34, kq)];
  lab(ctx, '{mink:P}', pl, P(t, T.P + .4, T.P + .8), 40);
  ctx.restore();
}

// la scheda a destra: i due pezzi e il loro prodotto
const XL = 1130, XR = 1620, XC = 1450;
function riga(ctx, nome, segno, val, y, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, nome + '{mink: ' + segno + '}', XL, y, { size: 50, align: 'left' });
  fixedNum(ctx, val, XR, y, 52, col);
  ctx.restore();
}
function riquadro(ctx, x, y, w, h, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < T.corda || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, T.corda, T.corda + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'i due pezzi', XC, 172, { size: 40, weight: 600, alpha: P(t, T.corda + .3, T.corda + .7) }));
  const g = theta(t), Q = pezzi(g), segno = esatto(g) ? '=' : '≈';
  const kv = P(t, T.misure + .3, T.misure + .8);
  riga(ctx, '{mx:PA}', segno, kv > 0 ? misura(Q.a, g) : '?', 280, kv > 0 ? C.x : C.dim, P(t, T.corda + .6, T.corda + 1.0));
  riga(ctx, '{my:PB}', segno, kv > 0 ? misura(Q.b, g) : '?', 360, kv > 0 ? C.y : C.dim, P(t, T.corda + .8, T.corda + 1.2));
  const kp = P(t, T.prodotto + .3, T.prodotto + .8);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(XL - 30, 412); ctx.lineTo(XR + 150, 412); ctx.stroke(); ctx.restore();
  }
  riga(ctx, '{mink:PA · PB}', '=', '21', 470, C.g, kp);
  // perché 21: con il diametro i pezzi sono 5 − 2 e 5 + 2
  const k1 = life(t, T.perche1 + .3, T.giro + .3, .5, .4);
  lab(ctx, '{x:3}{mink: = 5 − 2}', [1265, 580], k1, 46);
  lab(ctx, '{y:7}{mink: = 5 + 2}', [1640, 580], k1, 46);
  const k2 = P(t, T.perche2 + .4, T.perche2 + .9);
  lab(ctx, '{mink:PA · PB = 5² − 2² =} {g:21}', [XC, 680], k2, 48);
  // il teorema delle corde, al posto della riga 3 = 5 − 2
  lab(ctx, '{mink:PC · PD = 3 · 7 =} {g:21}', [XC, 581], life(t, T.cd + .4, T.corde + .3, .5, .3), 46);
  const k3 = P(t, T.corde + .4, T.corde + .9);
  riquadro(ctx, 1150, 535, 600, 92, k3);
  lab(ctx, '{mink:PA · PB = PC · PD}', [XC, 581], k3, 46);
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Per un punto dentro la circonferenza, il prodotto\ndei due pezzi di ogni corda è lo stesso.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'i pezzi si misurano\nda {mink:P}'], [960, '{mink:PA · PB = 5² − 2²}'], [1450, '{mink:PA · PB = PC · PD}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    drawRich(ctx, s, x, 520, { size: s.indexOf('\n') > 0 ? 34 : 42, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): mentre la corda gira, il tono segue la lunghezza di PA
  const lung = g => +(.2 + .12 * (pezzi(g).a - 3)).toFixed(2);
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5],
    ['traccia', T.circ + .2, T.circ + 1.5], ['pop', T.circ + .4, .5], ['traccia', T.circ + 1.4, T.circ + 2.0], ['traccia', T.perche1 + .2, T.perche1 + .7],   // circonferenza, O, raggio
    ['pop', T.P + .3, .6], ['traccia', T.P + .6, T.P + 1.1],                                                   // P e OP
    ['soffio', T.corda], ['traccia', T.corda + .3, T.corda + 1.3], ['pop', T.corda + 1.2, .4], ['pop', T.corda + 1.5, .5],   // la corda, A, B
    ['pop', T.misure + .3, .4],                                                                               // 3 e 7
    ['ding', T.prodotto + .3],                                                                                // 21
    ['pop', T.perche1 + .3, .5], ['pop', T.perche2 + .4, .6],                                                 // 5 − 2, 5 + 2; 5² − 2²
    ['tono', T.giro + .3, T.giro + 3.0, [lung(0), lung(15), lung(30), lung(45)]],                              // la corda gira fino a 45°
    ['pop', T.cambiano + .3, .5], ['ding', T.resta + .2],                                                     // i pezzi nuovi, ancora 21
    ['tono', T.giro2 + .3, T.giro2 + 3.0, [lung(45), lung(60), lung(75), lung(90)]],                           // fino alla perpendicolare
    ['traccia', T.giro2 + .3, T.giro2 + .8],                                                                  // OP di nuovo
    ['pop', T.uguali + .3, .6],
    ['traccia', T.cd + .3, T.cd + .9], ['pop', T.cd + .8, .5], ['pop', T.cd + .4, .6], ['pop', T.corde + .4, .7],   // la corda CD, 3 e 7, il teorema
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il prodotto che non cambia', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.giro - .3, 'una corda per {mink:P}'], [T.giro - .3, T.cd - .1, 'la corda gira'], [T.cd - .1, FINE, 'il teorema delle corde']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
