'use strict';
/* Concavità e flessi: la tangente che ruota lungo x³ − 3x; pendenza che cresce = verso l'alto, che cala = verso il basso, e il flesso dove cambia. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/concavita', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, fixedNum, fmtN,
    dot, glowStroke, arrowHead, makePlane, card } = M;
  const f = x => x * x * x - 3 * x, d1 = x => 3 * x * x - 3;

const FINE = 90.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  // mai due cambi a meno di 2 s (tranne l'accensione 1,45 → 2,0)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [6.6, 'neutro'],
  [20.2, 'sorpreso'], [22.2, 'neutro'], [25.3, 'felice'], [27.4, 'neutro'],
  [34.8, 'pensa'], [36.9, 'neutro'], [40.0, 'festa'], [42.6, 'felice'],
  [46.0, 'neutro'], [50.6, 'sorpreso'], [52.6, 'neutro'], [60.3, 'felice'], [62.4, 'neutro'],
  [66.0, 'sorpreso'], [68.0, 'neutro'], [70.9, 'festa'], [73.4, 'felice'], [76.3, 'neutro'], [84.9, 'felice'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 6.4, 'occhiolino'], [FINE + 8.4, 'felice'],
];
const FUMETTI = [
  [1.9, 6.7, 'Una curva si piega {g:verso l\'alto}\no {r:verso il basso}. Come si vede?'],
  [7.9, 11.4, 'Ecco {my:f(}{mx:x}{my:) = }{mx:x}{my:³ − 3}{mx:x}.'],
  [11.5, 15.0, 'Guardo la parte di {v:destra}.'],
  [15.2, 20.0, 'Qui la curva sta {g:sopra}\nla sua tangente.'],
  [20.2, 25.1, 'Vado avanti: la tangente\nruota in senso {g:antiorario}.'],
  [25.3, 29.9, 'La pendenza {g:cresce}:\nda −2,52 a 5,67.'],
  [30.1, 34.6, 'La pendenza è la derivata {mink:f′}.'],
  [34.8, 39.8, 'La derivata di {mink:f′} è la\n{v:derivata seconda}: {mink:f″}.'],
  [40.0, 45.4, 'Qui {mink:f″ > 0}: la pendenza cresce\ne la concavità è {g:verso l\'alto}.'],
  [45.8, 50.4, 'Ora la parte di {v:sinistra}: qui la\ncurva sta {r:sotto} la tangente.'],
  [50.6, 55.5, 'Vado avanti: la tangente\nruota in senso {r:orario}.'],
  [55.7, 60.1, 'La pendenza {r:cala}:\nda 5,67 a −2,52.'],
  [60.3, 65.4, 'Qui {mink:f″ < 0}: la pendenza cala\ne la concavità è {r:verso il basso}.'],
  [66.0, 70.7, 'In {mink:(0; 0)} la curva {v:attraversa}\nla sua tangente.'],
  [70.9, 76.1, 'Lì la concavità cambia verso:\nè un {v:punto di flesso}.'],
  [76.3, 80.3, 'Derivo: {mink:f′(}{mx:x}{mink:) = 3}{mx:x}{mink:² − 3}.'],
  [80.5, 84.7, 'Derivo ancora: {mink:f″(}{mx:x}{mink:) = 6}{mx:x}.'],
  [84.9, 90.1, '{mink:f″} è negativa per {mx:x}{mink: < 0}\ne positiva per {mx:x}{mink: > 0}: cambia segno.'],
  [FINE + 2.4, FINE + 8.8, '{mink:f″ > 0}: verso l\'alto.\n{mink:f″ < 0}: verso il basso.'],
];

// ystep 3: il piano non scrive i numeri dell'asse y; li scrive la scena dove la curva non passa
const PL = makePlane({ ox: 692, oy: 455, u: 120, x0: -2, x1: 2, y0: -2.4, y1: 2.4, ystep: 3 });
const CARD = [372, 110, 640, 690], CARD2 = [1080, 110, 740, 690];
const SIN = PL.curve(f, -2, 0, 150), DES = PL.curve(f, 0, 2, 150);
const D = [1450, 470], R = 140;
const ang = m => Math.atan(m);   // angolo della tangente (in matematica: antiorario positivo)

function tangente(ctx, x, al, L = 190) {
  if (al <= 0) return;
  const m = d1(x), n = Math.hypot(1, m), p = PL.toS(x, f(x));
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(CARD[0] + 8, CARD[1] + 8, CARD[2] - 16, CARD[3] - 16); ctx.clip();
  glowStroke(ctx, [[p[0] - L / n, p[1] + m * L / n], [p[0] + L / n, p[1] - m * L / n]], 1, C.v, 5);
  ctx.restore();
  dot(ctx, p, C.ink, al, 11);
}
// il quadrante: la direzione della tangente, e l'arco del giro fatto da th0 a th
function quadrante(ctx, th, th0, al, kArco) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(D[0], D[1], R, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([8, 9]); ctx.strokeStyle = css(C.dim, .6); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(D[0] - R, D[1]); ctx.lineTo(D[0] + R, D[1]); ctx.stroke(); ctx.setLineDash([]);
  const c = Math.cos(th), s = Math.sin(th);
  glowStroke(ctx, [[D[0] - c * R, D[1] + s * R], [D[0] + c * R, D[1] - s * R]], 1, C.v, 6);
  dot(ctx, D, C.ink, 1, 9);
  if (kArco > 0 && Math.abs(th - th0) > .05) {
    const col = th > th0 ? C.g : C.r, RA = R + 30, f0 = -th0, f1 = -th;
    ctx.globalAlpha *= kArco;
    ctx.strokeStyle = css(col); ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(D[0], D[1], RA, f0, f1, th > th0); ctx.stroke();
    const e = [D[0] + RA * Math.cos(f1), D[1] + RA * Math.sin(f1)];
    const dir = th > th0 ? Math.atan2(-Math.cos(f1), Math.sin(f1)) : Math.atan2(Math.cos(f1), -Math.sin(f1));
    arrowHead(ctx, e, dir, col, 1.4);
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Concavità e flessi', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// i tre tratti: dove sta il punto, da dove parte il giro
const TRATTI = [
  { a: 15.2, b: 45.6, x: [[20.3, .4], [24.5, 1.7]], x0: .4, arco: 20.3 },
  { a: 46.0, b: 65.7, x: [[50.8, -1.7], [55.0, -.4]], x0: -1.7, arco: 50.8 },
  { a: 66.1, b: FINE + .2, x: [[66.1, 0]], x0: 0, arco: 999, L: 460 },
];
// la lente: la zona del flesso ingrandita, con la scala verticale più stretta perché la tangente
// non sia quasi verticale e si veda la curva passare da sotto a sopra
const LC = [1450, 530], LUX = 250, LUY = 50, LW = 290, LH = 175;
const LS = (x, y) => [LC[0] + x * LUX, LC[1] - y * LUY];
function lente(ctx, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.roundRect(LC[0] - LW, LC[1] - LH, 2 * LW, 2 * LH, 18); ctx.stroke();
  drawRich(ctx, '{dim:vicino a }{mink:(0; 0)}{dim:, ingrandito}', LC[0], LC[1] - LH - 32, { size: 30 });
  ctx.beginPath(); ctx.roundRect(LC[0] - LW, LC[1] - LH, 2 * LW, 2 * LH, 18); ctx.clip();
  ctx.strokeStyle = css(C.ink, .45); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(LC[0] - LW, LC[1]); ctx.lineTo(LC[0] + LW, LC[1]); ctx.moveTo(LC[0], LC[1] - LH); ctx.lineTo(LC[0], LC[1] + LH); ctx.stroke();
  const cv = (a, b) => { const p = []; for (let i = 0; i <= 60; i++) { const x = lerp(a, b, i / 60); p.push(LS(x, f(x))); } return p; };
  [[-1.2, 0, C.r], [0, 1.2, C.g]].forEach(([a, b, col]) => {
    const p = cv(a, b), e = a === 0 ? b : a, q = LS(e, -3 * e);
    ctx.fillStyle = css(col, .25); ctx.beginPath(); p.forEach((s, i) => i ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1]));
    ctx.lineTo(q[0], q[1]); ctx.closePath(); ctx.fill();
    glowStroke(ctx, p, 1, col, 6);
  });
  glowStroke(ctx, [LS(-1.3, 3.9), LS(1.3, -3.9)], 1, C.v, 5);
  dot(ctx, LC, C.v, 1, 12);
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{r:curva sotto}', LS(-.75, 0)[0], LC[1] - 35, { size: 30 });
  drawRich(ctx, '{g:curva sopra}', LS(.75, 0)[0], LC[1] + 35, { size: 30 });
  ctx.restore();
}
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = life(t, 7.5, FINE + .2, .6, .7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD); card(ctx, ...CARD2);
  PL.axes(ctx, P(t, 7.7, 8.7));
  // la curva: la metà che non si guarda si attenua; le metà già capite si colorano
  const aSin = 1 - .75 * (P(t, 11.6, 12.3) - P(t, 45.6, 46.2));
  const aDes = 1 - .75 * (P(t, 45.6, 46.2) - P(t, 65.6, 66.2));
  const kd = P(t, 8.2, 10.2);
  ctx.save(); ctx.globalAlpha *= aSin; glowStroke(ctx, SIN, clamp(kd * 2), C.y); ctx.restore();
  ctx.save(); ctx.globalAlpha *= aDes; glowStroke(ctx, DES, clamp(kd * 2 - 1), C.y); ctx.restore();
  const gD = P(t, 40.2, 41.4), gS = P(t, 60.5, 61.7);
  // le zone colorate fra curva e tangente le mostra la lente
  lente(ctx, life(t, 66.1, 76.0, .5, .5));
  if (gD > 0) { ctx.save(); ctx.globalAlpha *= aDes; glowStroke(ctx, DES, gD, C.g, 7); ctx.restore(); }
  if (gS > 0) { ctx.save(); ctx.globalAlpha *= aSin; glowStroke(ctx, SIN.slice().reverse(), gS, C.r, 7); ctx.restore(); }
  drawRich(ctx, '{my:f(}{mx:x}{my:) = }{mx:x}{my:³ − 3}{mx:x}', 1450, 168, { size: 40, local: t - 8.4 });

  // la tangente, il quadrante, la pendenza
  TRATTI.forEach(T => {
    const ta = life(t, T.a, T.b, .4, .4);
    if (ta <= 0) return;
    const x = kf(t, T.x), m = d1(x);
    tangente(ctx, x, ta, T.L);
    ctx.save(); ctx.globalAlpha *= ta;
    drawRich(ctx, 'pendenza', 1130, 250, { size: 40, align: 'left' });
    drawRich(ctx, '{mink:f′(}{mx:x}{mink:)}', 1345, 250, { size: 40, align: 'left', local: t - 30.2 });
    fixedNum(ctx, fmtN(m), 1770, 250, 56, m > .005 ? C.g : m < -.005 ? C.r : C.v);
    ctx.restore();
    const qa = T.arco > 900 ? 0 : ta;
    quadrante(ctx, ang(m), ang(d1(T.x0)), qa, P(t, T.arco, T.arco + .4));
  });
  // i numeri dell'asse y: 1 e 2 a destra dell'asse, −1 e −2 a sinistra, dove curva e tangenti non passano
  const kn = P(t, 8.3, 8.7);
  if (kn > 0) [1, 2, -1, -2].forEach(j => {
    const p1 = PL.toS(0, j);
    txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), p1[0] + (j > 0 ? 20 : -20), p1[1], { size: 29, color: C.dim, align: j > 0 ? 'left' : 'right', alpha: kn });
  });
  // cresce / cala, e il segno di f″
  const r1 = life(t, 25.3, 45.6, .5, .4), r2 = life(t, 55.7, 65.7, .5, .4);
  if (r1 > 0) {
    drawRich(ctx, 'la pendenza {g:cresce}', 1450, 678, { size: 40, alpha: r1, local: t - 25.3 });
    drawRich(ctx, '{mink:f″ > 0}', 1290, 748, { size: 46, alpha: r1, local: t - 40.1 });
    drawRich(ctx, '{g:verso l\'alto}', 1590, 748, { size: 40, alpha: r1, local: t - 40.4 });
  }
  if (r2 > 0) {
    drawRich(ctx, 'la pendenza {r:cala}', 1450, 678, { size: 40, alpha: r2, local: t - 55.7 });
    drawRich(ctx, '{mink:f″ < 0}', 1290, 748, { size: 46, alpha: r2, local: t - 60.4 });
    drawRich(ctx, '{r:verso il basso}', 1590, 748, { size: 40, alpha: r2, local: t - 60.7 });
  }

  // 3 · il flesso
  // «flesso» nel quadrante libero in alto a destra, con una freccetta verso l'origine
  const kf1 = P(t, 71.1, 71.6, E.back);
  if (kf1 > 0 && t < FINE + .3) {
    dot(ctx, PL.toS(0, 0), C.v, kf1, 13);
    drawRich(ctx, '{v:flesso}', 850, 330, { size: 40, local: t - 71.1 });
    const a = [818, 358], b = [714, 434], k = P(t, 71.4, 71.9);
    if (k > 0) {
      ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
      arrowHead(ctx, [lerp(a[0], b[0], k), lerp(a[1], b[1], k)], Math.atan2(b[1] - a[1], b[0] - a[0]), C.v, 1.1);
    }
  }
  const s1 = P(t, 76.4, 77.0);
  if (s1 > 0) drawRich(ctx, '{mink:f′(}{mx:x}{mink:) = 3}{mx:x}{mink:² − 3}', 1450, 360, { size: 48, local: t - 76.4 });
  const sa = P(t, 80.6, 81.2);
  if (sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa;
    drawRich(ctx, '{mink:f″(}{mx:x}{mink:) = 6}{mx:x}', 1450, 450, { size: 52, local: t - 80.6 });
    ctx.restore();
  }
  const sb = P(t, 85.0, 85.6);
  if (sb > 0) {
    ctx.save(); ctx.globalAlpha *= sb;
    const y = 590, xa = 1150, xb = 1750, x0 = 1450;
    ctx.lineCap = 'butt'; ctx.lineWidth = 9;
    const kl = P(t, 85.0, 86.0);
    ctx.strokeStyle = css(C.r); ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(lerp(xa, x0, clamp(kl * 2)), y); ctx.stroke();
    if (kl > .5) { ctx.strokeStyle = css(C.g); ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, xb, clamp(kl * 2 - 1)), y); ctx.stroke(); }
    ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y - 16); ctx.lineTo(x0, y + 16); ctx.stroke();
    txt(ctx, '0', x0, y - 40, { size: 40, weight: 600, color: C.v, alpha: P(t, 85.2, 85.6) });
    txt(ctx, '−', 1300, y - 38, { size: 56, weight: 600, color: C.r, alpha: P(t, 85.4, 85.8) });
    txt(ctx, '+', 1600, y - 38, { size: 56, weight: 600, color: C.g, alpha: P(t, 85.8, 86.2) });
    drawRich(ctx, '{dim:segno di }{mink:f″}', 1450, y + 62, { size: 32, local: t - 86.0 });
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (FINE–)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 9.4, FINE + 10.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La derivata seconda dice\nda che parte si {v:piega} la curva.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[455, '{mink:f″ > 0}: verso l\'{g:alto}'], [960, '{mink:f″ < 0}: verso il {r:basso}'], [1465, 'cambia segno: {v:flesso}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.8 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 235, 450, 470, 100);
    drawRich(ctx, s, x, 502, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Concavità e flessi', durata: FINE + 11.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 45.8, 'verso l\'alto'], [45.8, 65.8, 'verso il basso'], [65.8, FINE, 'il flesso']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneFine(ctx, t); },
  };
});
