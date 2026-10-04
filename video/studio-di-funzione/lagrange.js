'use strict';
/* Rolle e Lagrange: 180 km in 2 ore, la corda è la media e il tachimetro passa per 90; poi la tangente parallela alla corda, e il caso della corda orizzontale. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/lagrange', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, fixedNum,
    dot, glowStroke, dashed, arrowHead, card } = M;
  // il viaggio: s(t) = 180(3u² − 2u³) con u = t/2; velocità v(t) = 540u(1 − u)
  const s = t => { const u = t / 2; return 180 * (3 * u * u - 2 * u * u * u); };
  const v = t => { const u = t / 2; return 540 * u * (1 - u); };
  const T1 = 1 - Math.sqrt(1 / 3), T2 = 1 + Math.sqrt(1 / 3);   // dove v = 90

const FINE = 96.0;
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
  [18.8, 'felice'], [20.8, 'neutro'], [29.8, 'pensa'], [32.4, 'neutro'], [36.6, 'festa'], [39.2, 'felice'],
  [45.1, 'neutro'], [50.8, 'felice'], [52.8, 'neutro'], [62.4, 'pensa'], [64.6, 'neutro'], [68.4, 'felice'], [70.4, 'neutro'],
  [74.6, 'pensa'], [79.6, 'neutro'], [84.8, 'sorpreso'], [86.8, 'neutro'], [90.8, 'festa'], [93.4, 'felice'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 6.4, 'occhiolino'], [FINE + 8.4, 'felice'],
];
const FUMETTI = [
  [1.9, 6.7, 'In 2 ore fai 180 km. Il tachimetro\nha mai segnato 90 km/h?'],
  [7.9, 12.8, 'Ecco il viaggio: i km percorsi {my:s}\nin funzione del tempo {mx:t}.'],
  [13.0, 18.6, 'Unisco la partenza e l\'arrivo:\nè la {g:corda}.'],
  [18.8, 23.8, 'La sua pendenza è la velocità\nmedia: {mink:180 : 2 = }{g:90} km/h.'],
  [24.0, 29.6, 'La velocità in un istante è la\npendenza della {v:tangente}.'],
  [29.8, 34.0, 'Qui va piano: la tangente\nè meno ripida della corda.'],
  [36.6, 42.4, 'Qui il tachimetro segna {g:90}:\nla tangente è {g:parallela} alla corda!'],
  [45.1, 50.5, 'Rallentando, ripassa per {g:90}:\nun\'altra tangente parallela.'],
  [50.8, 56.4, 'C\'è almeno un istante {mink:c} in cui\nla tangente è {g:parallela} alla corda.'],
  [56.6, 62.2, 'In {mink:c} la velocità {mink:s′(c)} è uguale\nalla pendenza della corda.'],
  [62.4, 68.2, 'Teorema di {v:Lagrange}: {mink:f} continua\nin {mink:[a; b]} e derivabile in {mink:(a; b)}…'],
  [68.4, 73.9, '…allora c\'è un {mink:c} in {mink:(a; b)} con\n{mink:f′(c)} pari alla pendenza della corda.'],
  [74.6, 79.4, 'E se parti e arrivi\nalla {v:stessa altezza}?'],
  [79.6, 84.6, 'La corda è {g:orizzontale}:\nla sua pendenza è 0.'],
  [84.8, 90.6, 'Allora in un {mink:c} anche la tangente\nè orizzontale: {mink:f′(c) = 0}.'],
  [90.8, 95.6, 'È il teorema di {v:Rolle}:\nun caso particolare di Lagrange.'],
  [FINE + 2.4, FINE + 8.8, 'Il tachimetro passa almeno\nuna volta per la {g:velocità media}.'],
];

const CARD = [372, 110, 760, 690], CARD2 = [1200, 110, 620, 690];
// il grafico del viaggio: t in ore, s in km
const G = { ox: 480, oy: 715, ux: 290, uy: 3.0 };
const GS = (t, y) => [G.ox + t * G.ux, G.oy - y * G.uy];
const CURVA = []; for (let i = 0; i <= 200; i++) { const t = 2 * i / 200; CURVA.push(GS(t, s(t))); }
function assiViaggio(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(G.ox + i * .5 * G.ux, G.oy); ctx.lineTo(G.ox + i * .5 * G.ux, G.oy - 190 * G.uy); ctx.stroke(); }
  for (let j = 60; j <= 180; j += 60) { ctx.beginPath(); ctx.moveTo(G.ox, G.oy - j * G.uy); ctx.lineTo(G.ox + 2.05 * G.ux, G.oy - j * G.uy); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(G.ox, G.oy); ctx.lineTo(G.ox + 2.2 * G.ux, G.oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(G.ox, G.oy); ctx.lineTo(G.ox, G.oy - 196 * G.uy); ctx.stroke();
  arrowHead(ctx, [G.ox + 2.2 * G.ux + 6, G.oy], 0, C.ink);
  arrowHead(ctx, [G.ox, G.oy - 196 * G.uy - 6], -Math.PI / 2, C.ink);
  ['0,5', '1', '1,5', '2'].forEach((l, i) => txt(ctx, l, G.ox + (i + 1) * .5 * G.ux, G.oy + 30, { size: 29, color: C.dim }));
  [60, 120, 180].forEach(j => txt(ctx, String(j), G.ox - 14, G.oy - j * G.uy, { size: 29, color: C.dim, align: 'right' }));
  drawRich(ctx, '{mx:t}{dim: (ore)}', 1118, G.oy + 64, { size: 32, align: 'right' });
  drawRich(ctx, '{my:s}{dim: (km)}', G.ox + 26, G.oy - 196 * G.uy - 2, { size: 32, align: 'left' });
  ctx.restore();
}
// tangente nel punto t: segmento di lunghezza fissa sullo schermo
function tangente(ctx, t, col, al, L = 200) {
  if (al <= 0) return;
  const dx = G.ux, dy = -v(t) * G.uy, n = Math.hypot(dx, dy), p = GS(t, s(t));
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(CARD[0] + 8, CARD[1] + 8, CARD[2] - 16, G.oy - CARD[1] - 8); ctx.clip();
  glowStroke(ctx, [[p[0] - dx / n * L, p[1] - dy / n * L], [p[0] + dx / n * L, p[1] + dy / n * L]], 1, col, 5);
  ctx.restore();
}
// il tachimetro
const TC = [1510, 540], TR = 180;
const ang = vv => Math.PI + clamp(vv / 150, 0, 1) * Math.PI;
function tachimetro(ctx, vv, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(TC[0], TC[1], TR, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.strokeStyle = css(C.g); ctx.lineWidth = 12;
  ctx.beginPath(); ctx.arc(TC[0], TC[1], TR, ang(87), ang(93)); ctx.stroke();
  for (let k = 0; k <= 150; k += 10) {
    const a = ang(k), big = k % 30 === 0, r0 = TR - (big ? 26 : 14);
    ctx.strokeStyle = css(C.ink, big ? .8 : .45); ctx.lineWidth = big ? 3 : 2;
    ctx.beginPath(); ctx.moveTo(TC[0] + r0 * Math.cos(a), TC[1] + r0 * Math.sin(a)); ctx.lineTo(TC[0] + TR * Math.cos(a), TC[1] + TR * Math.sin(a)); ctx.stroke();
    if (big) txt(ctx, String(k), TC[0] + (TR + 34) * Math.cos(a), TC[1] + (TR + 30) * Math.sin(a) - (k === 0 || k === 150 ? 18 : 0), { size: 29, weight: k === 90 ? 700 : 500, color: k === 90 ? C.g : C.dim });
  }
  const a = ang(vv), vicino = clamp(1 - Math.abs(vv - 90) / 5);
  ctx.strokeStyle = css(mix(C.v, C.g, vicino)); ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(TC[0], TC[1]); ctx.lineTo(TC[0] + (TR - 30) * Math.cos(a), TC[1] + (TR - 30) * Math.sin(a)); ctx.stroke();
  dot(ctx, TC, C.ink, 1, 12);
  fixedNum(ctx, String(Math.round(vv)), TC[0] + 30, TC[1] + 70, 56, mix(C.ink, C.g, vicino));
  txt(ctx, 'km/h', TC[0] + 44, TC[1] + 72, { size: 32, color: C.dim, align: 'left' });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Rolle e Lagrange', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il viaggio (7.5–75)
const XP = [[24.2, .15], [34.2, .15], [36.4, T1], [42.5, T1], [45.0, T2], [50.6, T2]];
function sceneViaggio(ctx, t) {
  if (t < 7.5 || t > 75.1) return;
  const al = life(t, 7.5, 75.0, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  assiViaggio(ctx, P(t, 7.7, 8.7));
  glowStroke(ctx, CURVA, P(t, 8.6, 10.8), C.y);
  // la corda
  const A = GS(0, 0), B = GS(2, 180);
  const kc = P(t, 13.4, 14.6);
  if (kc > 0) glowStroke(ctx, [A, B], kc, C.g, 5);
  dot(ctx, A, C.ink, P(t, 13.0, 13.4, E.back), 11);
  dot(ctx, B, C.ink, P(t, 13.2, 13.6, E.back), 11);
  // un punto con la sua tangente
  const ta = life(t, 24.2, 50.8, .4, .4);
  if (ta > 0) {
    const x = kf(t, XP);
    tangente(ctx, x, C.v, ta);
    dot(ctx, GS(x, s(x)), C.ink, ta, 11);
  }
  // i due punti c, con le tangenti parallele alla corda
  const ca = life(t, 50.8, 75.0, .5, .6);
  if (ca > 0) {
    [T1, T2].forEach((c, i) => {
      tangente(ctx, c, C.v, ca);
      const kd = P(t, 50.9 + i * .4, 51.3 + i * .4, E.back);
      if (kd <= 0) return;
      const p = GS(c, s(c));
      dashed(ctx, p, [p[0], G.oy], C.v, kd, ca);
      dot(ctx, p, C.v, kd * ca, 12);
      // la «c» sopra l'asse, accanto al tratteggio: lontana dalle tacche 0,5 e 1,5
      drawRich(ctx, '{mink:c}', p[0] + 26, G.oy - 28, { size: 42, alpha: kd * ca });
    });
  }
  ctx.restore();
}

// 4 · Rolle (74.6–FINE): una curva che parte e arriva alla stessa altezza
const R0 = { ox: 480, oy: 715, u: 150 };
const RS = (x, y) => [R0.ox + x * R0.u, R0.oy - y * R0.u];
const g = x => 1.2 + 2 * Math.sin(Math.PI * (x - .5) / 3);
const RC = []; for (let i = 0; i <= 160; i++) { const x = lerp(.5, 3.5, i / 160); RC.push(RS(x, g(x))); }
function sceneRolle(ctx, t) {
  if (t < 75.0 || t > FINE + .3) return;
  const al = life(t, 75.0, FINE + .2, .5, .7);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(R0.ox, R0.oy); ctx.lineTo(R0.ox + 3.95 * R0.u, R0.oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(R0.ox, R0.oy); ctx.lineTo(R0.ox, R0.oy - 3.7 * R0.u); ctx.stroke();
  arrowHead(ctx, [R0.ox + 3.95 * R0.u + 6, R0.oy], 0, C.ink);
  arrowHead(ctx, [R0.ox, R0.oy - 3.7 * R0.u - 6], -Math.PI / 2, C.ink);
  drawRich(ctx, '{mx:x}', R0.ox + 3.95 * R0.u + 34, R0.oy - 30, { size: 44 });
  drawRich(ctx, '{my:y}', R0.ox + 30, R0.oy - 3.7 * R0.u - 6, { size: 44 });
  glowStroke(ctx, RC, P(t, 75.2, 77.0), C.y);
  const A = RS(.5, g(.5)), B = RS(3.5, g(3.5));
  // stessa altezza: le due quote tratteggiate
  const kq = P(t, 77.0, 77.6);
  if (kq > 0) {
    dashed(ctx, A, [A[0], R0.oy], C.dim, kq, .8); dashed(ctx, B, [B[0], R0.oy], C.dim, kq, .8);
    drawRich(ctx, '{mink:a}', A[0], R0.oy + 36, { size: 40, alpha: kq });
    drawRich(ctx, '{mink:b}', B[0], R0.oy + 36, { size: 40, alpha: kq });
  }
  dot(ctx, A, C.ink, P(t, 76.8, 77.2, E.back), 11);
  dot(ctx, B, C.ink, P(t, 77.0, 77.4, E.back), 11);
  const kc = P(t, 79.8, 80.8);
  if (kc > 0) glowStroke(ctx, [A, B], kc, C.g, 5);
  const kt = P(t, 85.2, 86.0);
  if (kt > 0) {
    const p = RS(2, g(2));
    glowStroke(ctx, [[p[0] - 220 * kt, p[1]], [p[0] + 220 * kt, p[1]]], 1, C.v, 5);
    dashed(ctx, p, [p[0], R0.oy], C.v, kt, .9);
    dot(ctx, p, C.v, kt, 12);
    drawRich(ctx, '{mink:c}', p[0], R0.oy + 36, { size: 40, alpha: kt });
  }
  ctx.restore();
}

// la scheda di destra: media, tachimetro, formule
function sceneDestra(ctx, t) {
  if (t < 18.6 || t > FINE + .3) return;
  const al = life(t, 18.8, FINE + .2, .5, .7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD2);
  // la media
  const km = 1 - P(t, 74.4, 75.0);
  drawRich(ctx, '{dim:velocità media}', 1510, 170, { size: 32, local: t - 19.0, alpha: km });
  drawRich(ctx, '{mink:180 : 2 = }{mg:90}{dim: km/h}', 1510, 228, { size: 44, local: t - 19.4, alpha: km });
  // il tachimetro
  const ka = life(t, 24.0, 51.0, .5, .5);
  if (ka > 0) {
    const x = kf(t, XP);
    tachimetro(ctx, v(x), ka);
  }
  // prima la formula col viaggio, poi il teorema in generale
  if (t > 56.7) drawSeq(ctx, ['{mink:s′(c) =}', { num: '{mink:s(2) − s(0)}', den: '{mink:2 − 0}' }, '{mink:= }{mg:90}'], 1510, 360, 44, { local: t - 56.7, alpha: km });
  // nel caso di Rolle il titolo e la formula salgono dove c'era il viaggio
  const su = P(t, 74.6, 75.4);
  const yT = lerp(490, 300, su), yF = lerp(610, 420, su);
  const kl = P(t, 62.5, 63.0);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl;
    const rolle = t > 90.8;
    conFont(TITOLI, () => drawRich(ctx, rolle ? 'teorema di {v:Rolle}' : 'teorema di Lagrange', 1510, yT, { size: 42, weight: 600, local: rolle ? t - 90.9 : t - 62.5 }));
    ctx.restore();
  }
  const kL = 1 - P(t, 90.8, 91.3);
  if (t > 68.5 && kL > 0) drawSeq(ctx, ['{mink:f′(c) =}', { num: '{mink:f(b) − f(a)}', den: '{mink:b − a}' }], 1510, yF, 48, { local: t - 68.5, alpha: kL });
  if (t > 80.2) drawRich(ctx, '{mink:f(a) = f(b)}{dim:: il numeratore è 0}', 1510, 560, { size: 34, local: t - 80.2, alpha: kL });
  if (t > 85.4) drawRich(ctx, '{dim:quindi }{mink:f′(c) = }{mg:0}', 1510, 640, { size: 44, local: t - 85.4, alpha: kL });
  // Rolle: la sua formula al posto di quella di Lagrange
  if (t > 91.3) drawRich(ctx, '{mink:f(a) = f(b)  ⇒  f′(c) = }{mg:0}', 1510, 420, { size: 46, local: t - 91.3 });
  ctx.restore();
}

// 5 · in una frase (FINE–)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 9.4, FINE + 10.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'C\'è almeno un istante in cui la\ntangente è {g:parallela} alla corda.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[455, 'la media: la {g:corda}'], [960, 'Lagrange: tangente {g:parallela}'], [1465, 'Rolle: tangente {g:orizzontale}']];
  pills.forEach(([x, str], i) => {
    const a = FINE + 2.8 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 235, 450, 470, 100);
    drawRich(ctx, str, x, 502, { size: 30, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Rolle e Lagrange', durata: FINE + 11.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 24.0, 'la media'], [24.0, 50.6, 'il tachimetro'], [50.6, 74.4, 'il teorema di Lagrange'], [74.4, FINE, 'il caso di Rolle']],
    scena(ctx, t) {
      sceneIntro(ctx, t);
      if (t > 7.4 && t < FINE + .4) card(ctx, ...CARD, life(t, 7.5, FINE + .2, .6, .7));
      sceneViaggio(ctx, t); sceneRolle(ctx, t); sceneDestra(ctx, t); sceneFine(ctx, t);
    },
  };
});
