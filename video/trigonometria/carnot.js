'use strict';
/* Il teorema di Carnot — a = 4 e b = 3 con l'angolo γ fra loro: a 90° vale Pitagora (c² = 25); chiuso a 60° c² = 13,
   aperto a 120° c² = 37. La correzione è −2ab cos γ = −24 cos γ. Lettere come il sito: c² = a² + b² − 2ab cos γ.
   Argomento: trigonometria. */
CVIDEO.registra('trigonometria/carnot', M => {
  const { W, C, E, P, kf, lerp, css, mix, TITOLI, conFont, drawRich, richW, card } = M;

const SEQ = [
  ['lati', 4.3, 'Due lati, {mx:a} e {my:b}, e fra loro\nl’angolo {mink:γ} (gamma).'],
  ['c', 4.0, 'Il terzo lato, {mv:c}, sta di fronte a {mink:γ}.'],
  ['pit', 4.6, 'Con {mink:γ = }90° vale Pitagora:\n{mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}{mink: = 16 + 9 = 25}.'],
  ['chiudo', 3.6, 'Chiudo l’angolo: {mv:c} si accorcia.'],
  ['s60', 4.0, 'Ora {mv:c²} vale 13: è {r:meno} di\n{mx:a²}{mink: + }{my:b²}{mink: = 25}.'],
  ['apro', 3.8, 'Apro l’angolo: {mv:c} si allunga.'],
  ['s120', 3.8, 'Ora {mv:c²} vale 37: è {g:più} di 25.'],
  ['corr', 4.2, 'Pitagora va corretto, e la correzione\ndipende da {mink:γ}.'],
  ['formula', 4.6, 'È il {v:teorema del coseno}, di Carnot:\n{mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}{mink: − 2ab cos γ}.'],
  ['ab', 3.0, 'Qui {mink:2ab = 2 · 4 · 3 = 24}.'],
  ['va60', 3.0, 'Torno a {mink:γ = }60°.'],
  ['c60', 4.6, '{mink:cos }60°{mink: = 0,5}: si toglie\n{mink:24 · 0,5 = 12}, e {mink:25 − 12 = 13}.'],
  ['va120', 3.0, 'Ora a {mink:γ = }120°.'],
  ['c120', 4.6, '{mink:cos }120°{mink: = −0,5}: togliere\n{mink:−12} vuol dire aggiungere 12: 37.'],
  ['va90', 3.0, 'E a {mink:γ = }90°?'],
  ['c90', 4.4, '{mink:cos }90°{mink: = 0}: la correzione sparisce,\ne torna Pitagora.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Senza l’angolo retto, che fine fa\nil teorema di Pitagora?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Il teorema del coseno è Pitagora,\ncorretto da {mink:−2ab cos γ}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.pit, 'felice'], [T.pit + 2.2, 'neutro'], [T.s60, 'sorpreso'], [T.s60 + 2.2, 'neutro'],
  [T.s120, 'sorpreso'], [T.s120 + 2.2, 'neutro'], [T.formula, 'festa'], [T.formula + 2.6, 'neutro'],
  [T.c60, 'felice'], [T.c60 + 2.4, 'neutro'], [T.c120, 'sorpreso'], [T.c120 + 2.4, 'neutro'],
  [T.c90, 'festa'], [T.c90 + 2.4, 'felice'],
  [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];

const RAD = Math.PI / 180, U = 115, VC = [400, 660], LA = 4, LB = 3;
// l'angolo γ: si muove solo nei fumetti che lo dicono
const gam = t => kf(t, [[T.chiudo + .3, 90], [T.chiudo + 2.3, 60], [T.apro + .3, 60], [T.apro + 3.0, 120],
  [T.va60 + .3, 120], [T.va60 + 2.3, 60], [T.va120 + .3, 60], [T.va120 + 2.3, 120], [T.va90 + .3, 120], [T.va90 + 2.0, 90]]);
const PB = [VC[0] + LA * U, VC[1]];
const PA = g => [VC[0] + LB * U * Math.cos(g * RAD), VC[1] - LB * U * Math.sin(g * RAD)];
function seg(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// punto a distanza d dalla metà di PQ, dalla parte opposta a R
function fuori(Pp, Q, R, d) {
  const mx = (Pp[0] + Q[0]) / 2, my = (Pp[1] + Q[1]) / 2, dx = Q[0] - Pp[0], dy = Q[1] - Pp[1], L = Math.hypot(dx, dy);
  let nx = dy / L, ny = -dx / L;
  if ((R[0] - mx) * nx + (R[1] - my) * ny > 0) { nx = -nx; ny = -ny; }
  return [mx + nx * d, my + ny * d];
}
function targa(ctx, s, p, al, size) {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 20;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(p[0] - w / 2, p[1] - size * .62, w, size * 1.24, 10); ctx.fill(); ctx.restore();
  drawRich(ctx, s, p[0], p[1], { size, alpha: al });
}
// c² dall'angolo mostrato (gradi interi): «=» se il numero è esatto, «≈» se è arrotondato
function c2txt(g) {
  const v = 25 - 24 * Math.cos(g * RAD), r = Math.round(v);
  return (Math.abs(v - r) < 1e-9 ? '= ' : '≈ ') + String(r);
}
function difftxt(g) {
  const v = -24 * Math.cos(g * RAD), r = Math.round(v) || 0;
  return (Math.abs(v - r) < 1e-9 ? '= ' : '≈ ') + (r < 0 ? '−' + -r : r > 0 ? '+' + r : '0');
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il teorema di Carnot', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il triangolo che si apre e si chiude (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const g = Math.round(gam(t) * 10) / 10, A = PA(g);
  // l'ombra del triangolo rettangolo, per confronto, appena l'angolo si muove
  const kOm = P(t, T.chiudo + .1, T.chiudo + .5);
  if (kOm > 0) {
    const A90 = PA(90);
    ctx.save(); ctx.globalAlpha *= kOm * .7; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
    ctx.beginPath(); ctx.moveTo(...VC); ctx.lineTo(...A90); ctx.lineTo(...PB); ctx.stroke(); ctx.restore();
  }
  const kd = [P(t, 7.9, 8.5), P(t, 8.3, 8.9), P(t, T.c + .2, T.c + .8)];
  // riempimento
  if (kd[2] > 0) {
    ctx.save(); ctx.globalAlpha *= kd[2] * .08; ctx.fillStyle = css(C.v);
    ctx.beginPath(); ctx.moveTo(...VC); ctx.lineTo(...PB); ctx.lineTo(...A); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  seg(ctx, VC, PB, C.x, 6, kd[0]);
  seg(ctx, VC, A, C.y, 6, kd[1]);
  seg(ctx, PB, A, C.v, 6, kd[2]);
  // l'angolo γ
  const kg = P(t, 8.8, 9.3);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg;
    ctx.beginPath(); ctx.moveTo(...VC); ctx.arc(VC[0], VC[1], 62, 0, -g * RAD, true); ctx.closePath(); ctx.fillStyle = css(C.ink, .1); ctx.fill();
    ctx.beginPath(); ctx.arc(VC[0], VC[1], 62, 0, -g * RAD, true); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.stroke();
    // a 90° il quadratino dell'angolo retto
    const kr = Math.max(0, 1 - Math.abs(g - 90) / 2);
    if (kr > 0) {
      ctx.globalAlpha *= kr; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(VC[0] + 26, VC[1]); ctx.lineTo(VC[0] + 26, VC[1] - 26); ctx.lineTo(VC[0], VC[1] - 26); ctx.stroke();
    }
    ctx.restore();
    drawRich(ctx, '{mink:γ}', VC[0] + 100 * Math.cos(g / 2 * RAD), VC[1] - 100 * Math.sin(g / 2 * RAD), { size: 44, alpha: kg });
  }
  // i nomi dei lati, su un fondino: la traccia tratteggiata non li attraversa
  targa(ctx, '{mx:a}{mink: = 4}', [(VC[0] + PB[0]) / 2, VC[1] + 46], P(t, 8.4, 8.8), 44);
  targa(ctx, '{my:b}{mink: = 3}', fuori(VC, A, PB, 78), P(t, 8.8, 9.2), 44);
  targa(ctx, '{mv:c}', fuori(PB, A, VC, 40), P(t, T.c + .6, T.c + 1.0), 48);
  ctx.restore();
}

const XP = 1450;
// la scheda a destra: l'angolo, a² + b², c² misurato, poi la formula e i conti
function scenePannello(ctx, t) {
  if (t < T.lati || t > FINE + .2) return;
  const la = P(t, T.lati + .2, T.lati + .6) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  const g = Math.round(gam(t));
  drawRich(ctx, '{mx:a}{mink: = 4,   }{my:b}{mink: = 3}', XP, 172, { size: 44, local: t - T.lati - .4 });
  drawRich(ctx, '{mink:γ = }' + g + '°', XP, 240, { size: 44, local: t - T.lati - .8 });
  const kp = P(t, T.pit + .3, T.pit + .7);
  drawRich(ctx, '{mx:a²}{mink: + }{my:b²}{mink: = 16 + 9 = 25}', XP, 322, { size: 44, alpha: kp });
  drawRich(ctx, '{mv:c²}{mink: ' + c2txt(g) + '}', XP, 392, { size: 48, alpha: P(t, T.pit + .8, T.pit + 1.2) });
  // da quando l'angolo si muove, c² si legge sulla figura: lo si dice
  drawRich(ctx, '{dim:misurato}', XP + 112, 396, { size: 30, align: 'left', alpha: P(t, T.chiudo + .3, T.chiudo + .7) });
  drawRich(ctx, '{mv:c²}{mink: − (}{mx:a²}{mink: + }{my:b²}{mink:) ' + difftxt(g) + '}', XP, 462, { size: 44, alpha: P(t, T.corr + .3, T.corr + .7) });
  // la formula
  const kf2 = P(t, T.formula + .3, T.formula + .8);
  if (kf2 > 0) {
    ctx.save(); ctx.globalAlpha *= kf2; ctx.strokeStyle = css(C.v, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(XP - 360, 534, 720, 92, 18); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}{mink: − 2ab cos γ}', XP, 580, { size: 48, alpha: kf2 });
  }
  drawRich(ctx, '{mink:2ab = 2 · 4 · 3 = 24}', XP, 672, { size: 42, local: t - T.ab - .3 });
  // il conto, per l'angolo fermo
  const conto = [[T.c60, T.va120, '60°', '13'], [T.c120, T.va90, '120°', '37'], [T.c90, FINE, '90°', '25']];
  for (const [a, b, ang, ris] of conto) {
    const k = P(t, a + .3, a + .7) * (1 - P(t, b, b + .3));
    if (k > 0) drawRich(ctx, '{mv:c²}{mink: = 25 − 24 · cos }' + ang + '{mink: = }{g:' + ris + '}', XP, 748, { size: 44, alpha: k });
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il teorema del coseno è Pitagora, corretto da un\ntermine che dipende dall’angolo fra i due lati.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[350, 580, '{mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}{mink: − 2ab cos γ}', 40], [960, 500, '{mink:γ = }90°: torna\n{g:Pitagora}', 34],
    [1570, 580, '{mink:γ > }90°: {mv:c} si {g:allunga}', 40]];
  pills.forEach(([px, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - w / 2, 450, w, 140);
    drawRich(ctx, s, px, 520, { size, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il teorema di Carnot', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.chiudo - .1, 'quando vale Pitagora'], [T.chiudo - .1, T.formula - .1, 'se l’angolo cambia'],
      [T.formula - .1, FINE, 'la correzione']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
