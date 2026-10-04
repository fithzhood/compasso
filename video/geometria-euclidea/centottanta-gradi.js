'use strict';
/* Perché 180° — la parallela r per C ad AB: gli alterni interni portano α e β in C, accanto a γ, e formano l’angolo piatto. Argomento: geometria-euclidea. */
CVIDEO.registra('geometria-euclidea/centottanta-gradi', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, txt, glowStroke, dashed, dot, card } = M;

const FINE = 74.6, DUR = 86.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [38.7, 'felice'], [40.7, 'neutro'], [47.7, 'felice'], [49.7, 'neutro'],
  [61.9, 'festa'], [65.7, 'neutro'], [70.0, 'felice'], [FINE, 'neutro'], [77.0, 'felice'], [81.5, 'occhiolino'],
];
const FUMETTI = [
  [2.5, 6.3, 'Gli angoli di un triangolo sommano\nsempre 180°. Perché?'],
  [7.9, 11.0, 'Ecco un triangolo, {mink:ABC}.'],
  [11.1, 16.0, 'Chiamo {mx:α}, {my:β} e {mg:γ} i suoi angoli\nin {mink:A}, {mink:B} e {mink:C}.'],
  [16.1, 20.3, 'Per {mink:C} traccio la retta {mv:r},\n{g:parallela} ad {mink:AB}.'],
  [20.4, 24.0, 'Per il quinto postulato\nce n’è {g:una sola}.'],
  [24.1, 28.3, 'Il lato {mink:AC} taglia le due parallele:\nè una {g:trasversale}.'],
  [28.4, 32.3, 'In {mink:C} c’è l’angolo {mx:α′},\nfra {mv:r} e {mink:CA}.'],
  [32.4, 36.0, '{mx:α′} e {mx:α} sono angoli\n{g:alterni interni}.'],
  [36.1, 40.6, 'Fra rette parallele gli alterni\ninterni sono {g:congruenti}: {mx:α′ = α}.'],
  [40.7, 44.6, 'Dall’altra parte, fra {mv:r} e {mink:CB},\nc’è l’angolo {my:β′}.'],
  [44.7, 49.3, 'Con la trasversale {mink:BC}, {my:β′} e {my:β}\nsono alterni interni: {my:β′ = β}.'],
  [49.4, 53.6, 'In {mink:C} ora ci sono tre angoli,\nuno accanto all’altro.'],
  [53.7, 57.6, 'Insieme formano l’angolo {g:piatto}\nsu {mv:r}: {mx:α′}{mink: + }{mg:γ}{mink: + }{my:β′}{mink: = 180}°.'],
  [57.7, 61.7, 'Al posto di {mx:α′} e {my:β′}\nmetto {mx:α} e {my:β}…'],
  [61.8, 65.0, '…e ottengo {mx:α}{mink: + }{my:β}{mink: + }{mg:γ}{mink: = 180}°.'],
  [65.7, 69.9, 'Sposto {mink:C}: la parallela e gli angoli\nlo seguono.'],
  [70.0, 74.0, 'Il ragionamento non cambia:\nvale per {g:ogni} triangolo.'],
  [77.0, 83.6, 'Con la parallela per {mink:C}, due angoli\nuguali ad {mx:α} e {my:β} stanno accanto a {mg:γ}.'],
];

// il triangolo: A = (0; 0), B = (7; 0) in quadretti da 90 px; C dà α = 50°, β = 60°, γ = 70°,
// poi (parte 4) scivola in un altro punto e tutta la costruzione lo segue
const U = 90, OX = 430, OY = 700;
const S = (x, y) => [OX + U * x, OY - U * y];
const RAD = Math.PI / 180;
const AC1 = 7 * Math.sin(60 * RAD) / Math.sin(110 * RAD);
const C1 = [AC1 * Math.cos(50 * RAD), AC1 * Math.sin(50 * RAD)], C2 = [1.6, 4.4];
const T_SPOSTA = [66.0, 69.0];
function geo(t) {
  const k = P(t, T_SPOSTA[0], T_SPOSTA[1]);
  const c = [lerp(C1[0], C2[0], k), lerp(C1[1], C2[1], k)];
  const thA = Math.atan2(c[1], c[0]), thB = Math.atan2(c[1], c[0] - 7);
  return { A: [0, 0], B: [7, 0], C: c, thA, thB };
}
const RS = 88, RL = 140;   // raggio dei settori e delle loro etichette
// settore fra gli angoli a1 < a2 (radianti, in senso antiorario, y in su), vertice v in quadretti
function settore(ctx, v, a1, a2, col, riemp, bordo, k = 1, tratt = false) {
  if (k <= 0) return;
  const [x, y] = S(v[0], v[1]), b = a1 + (a2 - a1) * k;
  ctx.save();
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, RS, -a1, -b, true); ctx.closePath();
  if (riemp > 0) { ctx.fillStyle = css(col, riemp); ctx.fill(); }
  if (bordo > 0) { ctx.strokeStyle = css(col); ctx.lineWidth = bordo; if (tratt) ctx.setLineDash([9, 8]); ctx.lineJoin = 'round'; ctx.stroke(); }
  ctx.restore();
}
function nomeAngolo(ctx, s, v, a1, a2, al, r = RL) {
  if (al <= 0) return;
  const m = (a1 + a2) / 2, [x, y] = S(v[0], v[1]);
  drawRich(ctx, s, x + r * Math.cos(m), y - r * Math.sin(m), { size: 44, alpha: al });
}
// ruota il punto p attorno a c di phi (in quadretti)
function ruota(p, c, phi) {
  const dx = p[0] - c[0], dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(phi) - dy * Math.sin(phi), c[1] + dx * Math.sin(phi) + dy * Math.cos(phi)];
}
function tratto(ctx, a, b, col, w, al = 1) {
  if (al <= 0) return;
  const p = S(a[0], a[1]), q = S(b[0], b[1]);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  let w = 0;
  conFont(TITOLI, () => { w = richW(ctx, 'Perché 180', 130, 600); drawRich(ctx, 'Perché 180', W / 2 - 24, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }); });
  txt(ctx, '°', W / 2 - 24 + w / 2 + 26, 150, { size: 100, weight: 500, alpha: al * P(t, 1.9, 2.3) });
}

// 1–4 · il triangolo, la parallela, gli alterni interni, l’angolo piatto (7.5–FINE)
function sceneTriangolo(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .4, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  const { A, B, C: c, thA, thB } = geo(t);
  const PI = Math.PI;
  // la parallela r per C
  const kr = P(t, 16.4, 17.6);
  if (kr > 0) {
    const L = 4.6 * kr;
    ctx.save(); ctx.globalAlpha *= Math.min(1, kr * 3);
    glowStroke(ctx, [S(c[0] - L, c[1]), S(c[0] + L, c[1])], 1, C.v, 5);
    ctx.restore();
    const fine = S(c[0] + 4.6, c[1]);
    drawRich(ctx, '{mv:r}', fine[0] - 6, fine[1] - 36, { size: 44, alpha: P(t, 17.4, 17.9) });
  }
  // le trasversali messe in evidenza
  const hAC = life(t, 24.3, 41.0, .5, .5), hBC = life(t, 44.9, 49.6, .5, .5);
  if (hAC > 0) tratto(ctx, A, c, C.x, 14, .45 * hAC);
  if (hBC > 0) tratto(ctx, B, c, C.y, 14, .45 * hBC);
  // i lati
  const kT = P(t, 8.0, 9.6, E.lin);
  if (kT > 0) glowStroke(ctx, [S(...A), S(...B), S(...c), S(...A)], kT, C.ink, 4);
  // AB è l’altra parallela: diventa viola insieme a r
  tratto(ctx, A, B, C.v, 5, P(t, 17.0, 17.8));
  // gli angoli in A, B, C
  const kA = P(t, 11.5, 12.1), kB = P(t, 12.5, 13.1), kG = P(t, 13.5, 14.1);
  // bagliore quando Ada li nomina o li usa
  const pA = Math.max(life(t, 32.6, 36.0, .3, .3), life(t, 57.9, 61.7, .3, .3));
  const pB = Math.max(life(t, 45.0, 49.3, .3, .3), life(t, 57.9, 61.7, .3, .3));
  settore(ctx, A, 0, thA, C.x, .26 + .2 * pA, 3 + 2 * pA, kA);
  settore(ctx, B, thB, PI, C.y, .26 + .2 * pB, 3 + 2 * pB, kB);
  const pC = life(t, 49.6, 53.6, .3, .3);
  settore(ctx, c, thA - PI, thB - PI, C.g, .26 + .2 * pC, 3 + 2 * pC, kG);
  nomeAngolo(ctx, '{mx:α}', A, 0, thA, P(t, 11.7, 12.2), 128);
  nomeAngolo(ctx, '{my:β}', B, thB, PI, P(t, 12.7, 13.2), 128);
  nomeAngolo(ctx, '{mg:γ}', c, thA - PI, thB - PI, P(t, 13.7, 14.2));
  // α′ e β′ in C: prima il contorno, poi le copie di α e β che arrivano girando
  const oA = P(t, 28.6, 29.2), oB = P(t, 41.0, 41.6);
  const fA = P(t, 38.5, 38.7), fB = P(t, 47.5, 47.7);
  const pA2 = Math.max(life(t, 32.6, 36.0, .3, .3), pC, life(t, 57.9, 61.7, .3, .3));
  const pB2 = Math.max(pC, life(t, 57.9, 61.7, .3, .3));
  settore(ctx, c, -PI, thA - PI, C.x, (.26 + .2 * pA2) * fA, (3 + 2 * pA2) * oA, 1, fA < 1);
  settore(ctx, c, thB - PI, 0, C.y, (.26 + .2 * pB2) * fB, (3 + 2 * pB2) * oB, 1, fB < 1);
  nomeAngolo(ctx, '{mx:α′}', c, -PI, thA - PI, oA);
  nomeAngolo(ctx, '{my:β′}', c, thB - PI, 0, oB);
  // la copia di α gira di mezzo giro attorno al punto medio di AC (in senso orario, fuori dal triangolo)
  const cA = P(t, 36.6, 38.6), vA = life(t, 36.4, 38.7, .2, .1);
  if (vA > 0) {
    const m = [c[0] / 2, c[1] / 2], phi = -PI * cA, v = ruota(A, m, phi);
    ctx.save(); ctx.globalAlpha *= vA;
    settore(ctx, v, phi + PI * 2, thA + phi + PI * 2, C.x, .45, 4);
    ctx.restore();
  }
  const cB = P(t, 45.6, 47.6), vB = life(t, 45.4, 47.7, .2, .1);
  if (vB > 0) {
    const m = [(7 + c[0]) / 2, c[1] / 2], phi = PI * cB, v = ruota(B, m, phi);
    ctx.save(); ctx.globalAlpha *= vB;
    settore(ctx, v, thB + phi, PI + phi, C.y, .45, 4);
    ctx.restore();
  }
  // l’angolo piatto su r
  const kP = P(t, 53.9, 54.9), aP = life(t, 53.9, 65.6, .3, .5);
  if (kP > 0 && aP > 0) {
    const [x, y] = S(c[0], c[1]);
    ctx.save(); ctx.globalAlpha *= aP; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.setLineDash([12, 9]);
    ctx.beginPath(); ctx.arc(x, y, RS + 16, PI, PI - PI * kP, true); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:180}{v:°}', x + 160, y - 36, { size: 44, alpha: aP * P(t, 54.6, 55.0) });
  }
  // i nomi dei punti
  const kN = P(t, 9.4, 10.0);
  const [ax, ay] = S(...A), [bx, by] = S(...B), [cx, cy] = S(...c);
  drawRich(ctx, '{mink:A}', ax - 34, ay + 34, { size: 44, alpha: kN });
  drawRich(ctx, '{mink:B}', bx + 34, by + 34, { size: 44, alpha: kN });
  drawRich(ctx, '{mink:C}', cx, cy - 46, { size: 44, alpha: kN });
  ctx.restore();
}

// la scheda della dimostrazione, a destra (16–FINE)
function sceneScheda(ctx, t) {
  if (t < 16.6 || t > FINE + .3) return;
  const ca = life(t, 16.7, FINE + .2, .5, .6);
  card(ctx, 1300, 150, 540, 590, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const X = 1570;
  conFont(TITOLI, () => drawRich(ctx, 'la dimostrazione', X, 212, { size: 40, weight: 600, local: t - 16.9 }));
  drawRich(ctx, '{mv:r}{mink: ∥ AB}', X, 300, { size: 50, local: t - 17.2 });
  const pA = life(t, 57.9, 61.7, .3, .3);
  drawRich(ctx, '{mx:α′ = α}', X, 390, { size: 50, local: t - 38.8 });
  drawRich(ctx, '{my:β′ = β}', X, 475, { size: 50, local: t - 47.8 });
  if (pA > 0) {   // mentre Ada sostituisce: le due uguaglianze in evidenza
    ctx.save(); ctx.globalAlpha *= pA; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(X - 130, 345, 260, 175, 14); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, '{mx:α′}{mink: + }{mg:γ}{mink: + }{my:β′}{mink: = 180}°', X, 570, { size: 48, local: t - 54.4 });
  const s5 = '{mx:α}{mink: + }{my:β}{mink: + }{mg:γ}{mink: = 180}°';
  drawRich(ctx, s5, X, 670, { size: 50, local: t - 62.0 });
  const kb = P(t, 62.8, 63.3);
  if (kb > 0) {
    const w = richW(ctx, s5, 50);
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(X - w / 2 - 20, 670 - 44, w + 40, 88, 14); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// 5 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Grazie alla parallela per {mink:C}, due angoli uguali\nad {mx:α} e {my:β} si mettono accanto a {mg:γ}: un angolo {g:piatto}.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[480, 480, '{mx:α}{mink: + }{my:β}{mink: + }{mg:γ}{mink: = 180}°', 42], [980, 440, 'alterni interni\n{g:congruenti}', 34], [1480, 480, 'angolo piatto {mink:= 180}°', 40]];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Perché 180°', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 16.0, 'il triangolo'], [16.0, 49.3, 'la parallela per {mink:C}'], [49.3, 65.5, 'l’angolo piatto'], [65.5, 74.2, 'ogni triangolo']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneTriangolo(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
