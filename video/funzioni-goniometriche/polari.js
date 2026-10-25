'use strict';
/* Una distanza e un angolo — le coordinate polari. Il punto P con r = 4 (distanza da O) e θ = π/3 (60°, dal semiasse
   positivo delle x, verso antiorario, in radianti): sulla circonferenza goniometrica il punto di angolo θ è
   (cos θ; sin θ), P è r volte più lontano, quindi x = r cos θ = 4 · 0,5 = 2 e y = r sin θ = 4 · √3/2 = 2√3 ≈ 3,46.
   Poi r = θ: il punto gira e si allontana, disegna la spirale di Archimede; dopo un giro (θ = 2π) è a distanza
   2π ≈ 6,28, dopo due a 4π ≈ 12,57: da un giro al successivo la distanza cresce di 2π (giri equidistanti).
   Notazioni come in argomenti/funzioni-goniometriche.js (sin, cos, θ in radianti). Argomento: funzioni-goniometriche. */
CVIDEO.registra('funzioni-goniometriche/polari', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, drawSeq, txt, fixedNum, fmtN, dot, glowStroke, arrowHead, card } = M;
  const PI = Math.PI;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['r', 5.4, 'Di un punto {mink:P} dico la distanza\ndall’origine {mink:O}: {mv:r = 4}.'],
  ['angolo', 6.2, 'Serve anche un angolo {mv:θ}, qui {mink:π/3},\ndal semiasse positivo delle {mx:x}.'],
  ['polari', 5.4, '{mv:r} e {mv:θ} sono le {v:coordinate polari}\ndi {mink:P}: una distanza e un angolo.'],
  ['unitario', 6.0, 'Sulla circonferenza goniometrica\nil punto è {mink:(}{mx:cos θ}{mink:; }{my:sin θ}{mink:)}.', .3],
  ['scala', 5.4, '{mink:P} è {mv:r} volte più lontano: le coordinate\nsi moltiplicano per {mv:r}.'],
  ['x', 6.4, 'L’ascissa è {mx:x = r cos θ}:\n{mink:4 · 0,5 = 2}.'],
  ['y', 7.2, 'L’ordinata è {my:y = r sin θ}:\n{mink:2√3 ≈ 3,46}.'],
  ['spirale', 5.6, 'Ora lego distanza e angolo:\nla regola è {mv:r = θ}.', .4],
  ['gira', 5.0, 'Il punto parte da {mink:O}: più gira,\npiù si allontana. È una {y:spirale}.'],
  ['giro1', 5.4, 'Dopo un giro, {mv:θ = 2π}:\nanche la distanza è {mink:2π}.'],
  ['gira2', 4.0, 'Continua a girare, sempre più largo…'],
  ['giro2', 5.8, '…secondo giro: {mv:θ = 4π},\ne la distanza è {mink:4π}.'],
  ['equi', 5.6, 'Da un giro al successivo la distanza\ncresce sempre di {mg:2π}.'],
  ['nome', 4.8, 'I giri sono {g:equidistanti}: è la\n{y:spirale di Archimede}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Un punto si può indicare\nsenza {mx:x} e {my:y}?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Un punto si dà anche con una distanza\ne un angolo: le coordinate polari.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.polari, 'felice'], [T.polari + 2.4, 'neutro'], [T.x + 1.6, 'felice'], [T.x + 3.8, 'neutro'],
  [T.gira + 1.0, 'sorpreso'], [T.gira + 3.4, 'neutro'], [T.equi + .4, 'felice'], [T.equi + 2.8, 'neutro'],
  [T.nome, 'festa'], [T.nome + 2.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const RQ = [70, 110, 930, 690];
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
function assiPiano(ctx, pl, k, numeri) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = pl;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  if (numeri) {
    for (let i = Math.ceil(x0); i <= x1; i++) if (i) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * u, oy + 32, { size: 30, color: C.dim });
    for (let j = Math.ceil(y0); j <= y1; j++) if (j) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 20, oy - j * u, { size: 30, color: C.dim, align: 'right' });
  }
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}
function segmento(ctx, a, b, col, w, k = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function tratteggio(ctx, a, b, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Una distanza e un angolo', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il punto P(r = 4, θ = π/3) e le sue coordinate cartesiane (7.5–T.spirale)
const PL1 = { ox: 250, oy: 640, u: 105, x0: -1.5, x1: 4.8, y0: -1.3, y1: 4.6 };
const S1 = (x, y) => [PL1.ox + x * PL1.u, PL1.oy - y * PL1.u];
const TH = PI / 3, R0 = 4, PX = R0 * Math.cos(TH), PY = R0 * Math.sin(TH);   // (2; 3,46)
function scenePunto(ctx, t) {
  if (t < 7.5 || t > T.spirale + .5) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, T.spirale - .1, T.spirale + .4);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  assiPiano(ctx, PL1, P(t, 7.7, 8.7), true);
  const O = S1(0, 0), Pp = S1(PX, PY);
  // il semiasse positivo delle x, da cui parte l'angolo
  const ks = life(t, T.angolo + .2, T.polari, .4, .6);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; glowStroke(ctx, [O, S1(PL1.x1, 0)], 1, C.x, 7); ctx.restore(); }
  // il triangolo che cresce: dal punto della circonferenza goniometrica a P, tutto per r
  const kt = P(t, T.scala + .4, T.scala + 2.2), at = P(t, T.scala + .2, T.scala + .5);
  if (at > 0) {
    const f = lerp(1, R0, kt), A = S1(f * Math.cos(TH), 0), B = S1(f * Math.cos(TH), f * Math.sin(TH));
    ctx.save(); ctx.globalAlpha *= at; ctx.fillStyle = css(C.v, .12);
    ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.closePath(); ctx.fill();
    segmento(ctx, O, A, C.x, P(t, T.x + .3, T.x + .8) > 0 ? 9 : 6); segmento(ctx, A, B, C.y, 6);
    ctx.restore();
  }
  // la circonferenza goniometrica (un quarto) e il suo punto, con coseno e seno
  const ku = life(t, T.unitario + .3, T.x + .3, .5, .5);
  if (ku > 0) {
    ctx.save(); ctx.globalAlpha *= ku; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.arc(O[0], O[1], PL1.u, -PI / 2, 0); ctx.stroke(); ctx.restore();
    const Q = S1(Math.cos(TH), Math.sin(TH)), kq = P(t, T.unitario + .8, T.unitario + 1.3);
    if (kq > 0) {
      ctx.save(); ctx.globalAlpha *= ku;
      tratteggio(ctx, Q, S1(Math.cos(TH), 0), C.x, kq); tratteggio(ctx, Q, S1(0, Math.sin(TH)), C.y, kq);
      ctx.save(); ctx.globalAlpha *= kq; segmento(ctx, O, S1(Math.cos(TH), 0), C.x, 7); segmento(ctx, O, S1(0, Math.sin(TH)), C.y, 7); ctx.restore();
      lab(ctx, '{mx:cos θ}', S1(.56, -.7)[0], S1(.56, -.7)[1], kq, 36);
      lab(ctx, '{my:sin θ}', S1(-.58, .43)[0], S1(-.58, .43)[1], kq, 36);
      dot(ctx, Q, C.ink, kq, 8);
      ctx.restore();
    }
  }
  // il segmento OP, lungo r, e l'angolo θ
  const kr = P(t, T.r + .4, T.r + 1.4, E.lin);
  if (kr > 0) glowStroke(ctx, [O, Pp], kr, C.v, 5);
  lab(ctx, '{mv:r}', S1(1.38, 1.5)[0], S1(1.38, 1.5)[1], P(t, T.r + 1.2, T.r + 1.6), 44);
  const ka = P(t, T.angolo + .5, T.angolo + 1.5);
  if (ka > 0) {
    ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(O[0], O[1], .75 * PL1.u, 0, -TH * ka, true); ctx.stroke(); ctx.restore();
    // θ fuori dalla circonferenza goniometrica: si spegne solo mentre il lato verticale del triangolo che cresce le passa sopra
    lab(ctx, '{mv:θ}', S1(1.2, .4)[0], S1(1.2, .4)[1], P(t, T.angolo + 1.2, T.angolo + 1.6) * (1 - life(t, T.scala + .4, T.scala + 2.2, .2, .3)), 40);
  }
  // le coordinate cartesiane di P: x sull'asse x, y sull'asse y
  const kx = P(t, T.x + .3, T.x + .8);
  lab(ctx, '{mx:r cos θ}', S1(1, -.78)[0], S1(1, -.78)[1], kx, 40);
  const ky = P(t, T.y + .3, T.y + .8);
  if (ky > 0) {
    tratteggio(ctx, Pp, S1(0, PY), C.y, ky);
    ctx.save(); ctx.globalAlpha *= ky; segmento(ctx, O, S1(0, PY), C.y, 9); ctx.restore();
    lab(ctx, '{my:r sin θ}', S1(-.8, 1.5)[0], S1(-.8, 1.5)[1], ky, 40);
  }
  // O e P
  lab(ctx, '{mink:O}', S1(-.28, -.32)[0], S1(-.28, -.32)[1], P(t, T.r + .2, T.r + .6), 40);
  dot(ctx, Pp, C.ink, P(t, T.r + .2, T.r + .6, E.back), 11);
  lab(ctx, '{mink:P}', S1(PX + .3, PY + .25)[0], S1(PX + .3, PY + .25)[1], P(t, T.r + .3, T.r + .7), 44);
  ctx.restore();
}

// la scheda a destra della prima parte
const XL = 1090, XR = 1810, XC = 1450;
function riga(ctx, nome, val, y, al, size = 44) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, nome, XL, y, { size: 32, align: 'left' });
  drawRich(ctx, val, XR, y, { size, align: 'right' });
  ctx.restore();
}
function linea(ctx, y, al) { if (al <= 0) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, y); ctx.lineTo(XR, y); ctx.stroke(); ctx.restore(); }
function schedaPunto(ctx, t) {
  if (t < 7.5 || t > T.spirale + .5) return;
  const fuori = 1 - P(t, T.spirale - .1, T.spirale + .4);
  card(ctx, 1040, 110, 820, 690, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'coordinate polari', XC, 172, { size: 40, weight: 600, alpha: P(t, T.polari + .2, T.polari + .7) }));
  riga(ctx, '{dim:distanza da} {mink:O}', '{mv:r = 4}', 255, P(t, T.r + .5, T.r + 1.0), 48);
  const kA = P(t, T.angolo + .6, T.angolo + 1.1);
  if (kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    drawRich(ctx, '{dim:angolo}', XL, 340, { size: 32, align: 'left' });
    drawSeq(ctx, ['{mv:θ = }', { num: '{mv:π}', den: '{mv:3}' }, '{dim: = 60°}'], XR - 150, 340, 46);
    ctx.restore();
  }
  linea(ctx, 410, P(t, T.unitario + .2, T.unitario + .7));
  riga(ctx, '{dim:raggio 1}', '{mink:(}{mx:cos θ}{mink:; }{my:sin θ}{mink:)}', 465, P(t, T.unitario + .9, T.unitario + 1.4));
  riga(ctx, '{dim:raggio} {mv:r}', '{mink:(}{mx:r cos θ}{mink:; }{my:r sin θ}{mink:)}', 540, P(t, T.scala + 2.0, T.scala + 2.5));
  linea(ctx, 595, P(t, T.x + .2, T.x + .7));
  if (t > T.x + .4) drawRich(ctx, '{mx:x = r cos θ = 4 · 0,5 = 2}', XC, 650, { size: 44, local: t - T.x - .4 });
  if (t > T.y + .4) drawSeq(ctx, ['{my:y = r sin θ = 4 · }', { num: '{my:√3}', den: '{my:2}' }, '{my: = 2√3 ≈ 3,46}'], XC, 735, 42, { local: t - T.y - .4 });
  ctx.restore();
}

// 3 · r = θ: la spirale di Archimede (T.spirale–FINE)
const PL2 = { ox: 425, oy: 420, u: 30, x0: -10.5, x1: 13.6, y0: -11.2, y1: 9.1 };
const S2 = (x, y) => [PL2.ox + x * PL2.u, PL2.oy - y * PL2.u];
function kf2(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], P(t, keys[i - 1][0], keys[i][0], E.io));
  return keys[keys.length - 1][1];
}
// l'angolo: fermo, un giro mentre Ada dice che gira, fermo a 2π, un altro giro, fermo a 4π
const theta = t => kf2(t, [[T.gira + .4, 0], [T.gira + 4.7, 2 * PI], [T.gira2 + .2, 2 * PI], [T.gira2 + 3.9, 4 * PI]]);
const SP = th => S2(th * Math.cos(th), th * Math.sin(th));
function sceneSpirale(ctx, t) {
  if (t < T.spirale - .2 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.spirale - .1, T.spirale + .4) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, ...RQ);
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  assiPiano(ctx, PL2, P(t, T.spirale, T.spirale + .8), false);
  const th = theta(t), O = S2(0, 0);
  // da un giro all'altro: 2π sul semiasse positivo e su quello negativo
  const ke = P(t, T.equi + .3, T.equi + 1.1);
  if (ke > 0) {
    glowStroke(ctx, [S2(2 * PI, 0), S2(4 * PI, 0)], ke, C.g, 9);
    glowStroke(ctx, [S2(-PI, 0), S2(-3 * PI, 0)], ke, C.g, 9);
    lab(ctx, '{mg:2π}', S2(3 * PI, .85)[0], S2(3 * PI, .85)[1], P(t, T.equi + .9, T.equi + 1.3), 40);
    lab(ctx, '{mg:2π}', S2(-2 * PI, .85)[0], S2(-2 * PI, .85)[1], P(t, T.equi + .9, T.equi + 1.3), 40);
  }
  // la traccia
  if (th > .01) {
    const pts = []; const n = Math.max(2, Math.ceil(th / .02));
    for (let i = 0; i <= n; i++) pts.push(SP(th * i / n));
    glowStroke(ctx, pts, 1, C.y, 5);
  }
  // dove la spirale taglia l'asse x
  [[PI, 0], [2 * PI, 1], [3 * PI, 0], [4 * PI, 1]].forEach(([a]) => { if (th >= a - 1e-6) dot(ctx, SP(a), C.v, P(th, a - .01, a + .3), 7); });
  // il raggio e il punto
  const kp = P(t, T.spirale + .6, T.spirale + 1.0, E.back);
  if (kp > .01) {
    segmento(ctx, O, SP(th), C.v, 3, th > .01 ? 1 : 0);
    dot(ctx, SP(th), C.ink, kp, 11);
  }
  lab(ctx, '{mv:2π}', S2(7.8, -1.0)[0], S2(7.8, -1.0)[1], P(t, T.giro1 + .3, T.giro1 + .7), 40);
  lab(ctx, '{mv:4π}', S2(13.2, 1.35)[0], S2(13.2, 1.35)[1], P(t, T.giro2 + .3, T.giro2 + .7), 40);
  lab(ctx, '{mink:O}', S2(-.9, -.95)[0], S2(-.9, -.95)[1], P(t, T.spirale + .3, T.spirale + .8), 40);
  ctx.restore();
  ctx.restore();
}
function schedaSpirale(ctx, t) {
  if (t < T.spirale - .2 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1), dentro = P(t, T.spirale - .1, T.spirale + .4);
  card(ctx, 1040, 110, 820, 690, dentro * fuori);
  ctx.save(); ctx.globalAlpha *= fuori * dentro;
  conFont(TITOLI, () => drawRich(ctx, 'la regola', XC, 172, { size: 40, weight: 600 }));
  if (t > T.spirale + .3) drawRich(ctx, '{mv:r = θ}', XC, 250, { size: 64, local: t - T.spirale - .3 });
  const kv = P(t, T.gira, T.gira + .5);
  if (kv > 0) {
    const th = theta(t);
    ctx.save(); ctx.globalAlpha *= kv;
    drawRich(ctx, '{mv:θ =}', XC - 60, 345, { size: 44, align: 'right' }); fixedNum(ctx, fmtN(th, 2), XC + 150, 345, 44, C.ink);
    drawRich(ctx, '{mv:r =}', XC - 60, 405, { size: 44, align: 'right' }); fixedNum(ctx, fmtN(th, 2), XC + 150, 405, 44, C.ink);
    ctx.restore();
  }
  linea(ctx, 455, P(t, T.giro1 + .2, T.giro1 + .7));
  riga(ctx, '{dim:dopo un giro}', '{mink:r = 2π ≈ 6,28}', 505, P(t, T.giro1 + .4, T.giro1 + .9));
  riga(ctx, '{dim:dopo due giri}', '{mink:r = 4π ≈ 12,57}', 570, P(t, T.giro2 + .4, T.giro2 + .9));
  riga(ctx, '{dim:differenza}', '{mg:4π − 2π = 2π}', 645, P(t, T.equi + .4, T.equi + .9));
  lab(ctx, '{y:spirale di Archimede}', XC, 730, P(t, T.nome + .3, T.nome + .8), 44);
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un punto si dà anche con una distanza\ne un angolo: le coordinate polari.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'ascissa', '{mx:x = r cos θ}'], [960, 'ordinata', '{my:y = r sin θ}'], [1450, 'con {mv:r = θ}', '{y:spirale di Archimede}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 32, weight: 400 });
    drawRich(ctx, s, x, 548, { size: i === 2 ? 36 : 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la distanza del punto mentre gira
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],                                   // il piano
    ['pop', T.r + .2, .7], ['traccia', T.r + .4, T.r + 1.4],                                    // P e il segmento OP
    ['traccia', T.angolo + .5, T.angolo + 1.5], ['tono', T.angolo + .5, T.angolo + 1.5, [.3, .5]],   // l'angolo θ
    ['pop', T.polari + .3, .5],
    ['traccia', T.unitario + .3, T.unitario + .8], ['pop', T.unitario + .8, .55],               // il punto sulla circonferenza goniometrica
    ['tono', T.scala + .4, T.scala + 2.2, [.2, .8]],                                            // tutto per r
    ['pop', T.x + .4, .4], ['pop', T.y + .4, .75], ['ding', T.y + 1.6],                          // x = 2, y ≈ 3,46
    ['soffio', T.spirale], ['traccia', T.spirale, T.spirale + .8], ['pop', T.spirale + .6, .3],  // r = θ
    ['tono', T.gira + .4, T.gira + 4.7, [0, .1, .2, .3, .45]], ['ding', T.giro1 + .3],           // il primo giro
    ['tono', T.gira2 + .2, T.gira2 + 3.9, [.45, .6, .75, .9, 1]], ['ding', T.giro2 + .3],         // il secondo giro
    ['traccia', T.equi + .3, T.equi + 1.1], ['pop', T.equi + .9, .6],                            // 2π fra un giro e l'altro
    ['pop', T.nome + .3, .7],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Una distanza e un angolo', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.unitario - .2, 'distanza e angolo'], [T.unitario - .2, T.spirale - .2, 'dalle polari a x e y'], [T.spirale - .2, FINE, 'la spirale di Archimede']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePunto(ctx, t); schedaPunto(ctx, t); sceneSpirale(ctx, t); schedaSpirale(ctx, t); sceneFine(ctx, t); },
  };
});
