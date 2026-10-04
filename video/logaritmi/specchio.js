'use strict';
/* Logaritmo ed esponenziale — y = log₂ x è l'inversa di y = 2ˣ: (2; 4) diventa (4; 2), i grafici sono
   simmetrici rispetto alla retta y = x; l'asintoto y = 0 diventa x = 0, e il dominio del log è x > 0. Argomento: logaritmi. */
CVIDEO.registra('logaritmi/specchio', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, txt, dot, dashed, glowStroke, makePlane, card, arrowHead } = M;

const FINE = 75.2, DURATA = 87.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [21.9, 'felice'], [23.9, 'neutro'],
  [36.5, 'sorpreso'], [39.4, 'festa'], [41.7, 'felice'], [43.7, 'neutro'], [50.7, 'felice'], [52.7, 'neutro'],
  [64.7, 'sorpreso'], [66.7, 'neutro'], [FINE + 1.0, 'felice'], [82.0, 'occhiolino'], [84.4, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [2.4, 6.3, 'Che legame c’è fra il logaritmo\ne le potenze?'],
  // 1 · due viaggi opposti
  [7.9, 12.4, '{mink:y = 2ˣ} è un’{v:esponenziale}:\nprende un esponente, dà una potenza.'],
  [12.5, 16.8, 'Per {mink:x = 2} dà {mink:y = 4}:\nil punto {mink:(2; 4)}.'],
  [16.9, 21.8, 'Il logaritmo fa il viaggio opposto:\n{mink:log₂ 4 = 2}, da 4 torna a 2.'],
  [21.9, 26.8, '{mink:y = log₂ x} è la funzione\n{v:inversa} di {mink:y = 2ˣ}.'],
  // 2 · lo specchio
  [27.0, 31.6, 'Sul grafico, il punto {mink:(4; 2)}:\nle coordinate di {mink:(2; 4)} scambiate.'],
  [31.7, 36.4, 'Scambiare le coordinate vuol dire\nribaltare sulla retta {mink:y = x}.'],
  [36.5, 41.6, 'Ribalto tutto il grafico di {mink:2ˣ}\nsulla retta: ecco {mink:log₂ x}!'],
  [41.7, 46.0, 'I due grafici sono {v:simmetrici}\nrispetto alla retta {mink:y = x}.'],
  [46.1, 50.6, '{mink:2⁰ = 1}: il punto {mink:(0; 1)}\ndiventa {mink:(1; 0)}.'],
  [50.7, 55.2, 'Infatti {mink:log₂ 1 = 0}: il grafico\ndel logaritmo passa per {mink:(1; 0)}.'],
  // 3 · asintoto e dominio
  [55.6, 60.2, 'A sinistra, {mink:2ˣ} si avvicina\nall’asse {mx:x} senza toccarlo.'],
  [60.3, 64.6, 'L’asse {mx:x} è il suo {v:asintoto}\norizzontale: {mink:y = 0}.'],
  [64.7, 69.6, 'Nello specchio diventa l’asse {my:y}:\nasintoto {v:verticale} {mink:x = 0}.'],
  [69.7, 74.6, 'Il {v:dominio} del logaritmo è {mink:x > 0}:\nil grafico è tutto a destra.'],
  // chiusura
  [FINE + 1.4, 84.4, '{mink:log₂ x} disfa {mink:2ˣ}: i grafici\nsono specchiati su {mink:y = x}.'],
];
const CAPITOLI = [[7.5, 26.9, 'due viaggi opposti'], [26.9, 55.4, 'lo specchio'], [55.4, FINE, 'asintoto e dominio']];

// il piano: i numeri degli assi li scrivo io, senza l'1 sui due assi (lì passano le curve)
const PO = { ox: 575, oy: 590, u: 74, x0: -2.5, x1: 5.6, y0: -2.5, y1: 5.6 };
const PL = makePlane(PO);
const S = (x, y) => PL.toS(x, y);
const f = x => 2 ** x, g = x => Math.log2(x);
const PE = PL.curve(f, -2.5, Math.log2(5.6), 160);
const PG = PL.curve(g, 2 ** -2.5, 5.6, 200);
function assi(ctx, k, kNum) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PO;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u); ctx.lineTo(x, oy - y0 * u); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u, y); ctx.lineTo(ox + x1 * u, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u, oy); ctx.lineTo(ox + (x1 + .15) * u, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u); ctx.lineTo(ox, oy - (y1 + .2) * u); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u - 6], -Math.PI / 2, C.ink);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u - 8, { size: 44 });
  ctx.globalAlpha *= kNum;
  for (const i of [-2, -1, 2, 3, 4, 5]) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * u, oy + 32, { size: 30, color: C.dim });
  for (const j of [-2, -1, 2, 3, 4, 5]) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 20, oy - j * u, { size: 30, color: C.dim, align: 'right' });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Logaritmo ed esponenziale', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// a sinistra il piano, per tutto il video (7.5–FINE)
const T_FLIP = [36.8, 39.3], T_ASI = [64.9, 66.4];
function sceneGrafico(ctx, t) {
  if (t < 7.4 || t > FINE + .4) return;
  const al = life(t, 7.5, FINE + .3, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 360, 110, 760, 690);
  // mentre qualcosa si ribalta sul piano, i numeri degli assi si sbiadiscono
  const kNum = 1 - .8 * Math.max(life(t, T_FLIP[0] - .2, T_FLIP[1] + .3, .3, .3), life(t, T_ASI[0] - .2, T_ASI[1] + .3, .3, .3));
  // il dominio del logaritmo: la parte a destra dell'asse y
  const kd = P(t, 69.9, 70.5);
  if (kd > 0) { ctx.save(); ctx.globalAlpha *= kd; ctx.fillStyle = css(C.g, .09); const a = S(0, PO.y1 + .1), b = S(PO.x1 + .1, PO.y0); ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); ctx.restore(); }
  assi(ctx, P(t, 7.7, 8.5), kNum);
  // l'asintoto: prima l'asse x a sinistra, poi ribaltato sull'asse y in basso
  const ka = P(t, 55.8, 56.3);
  if (ka > 0) {
    const k = P(t, T_ASI[0], T_ASI[1]);
    const r = (x, y) => S(lerp(x, y, k), lerp(y, x, k));
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.v, .45); ctx.lineWidth = 14; ctx.lineCap = 'round';
    const a = r(PO.x0, 0), b = r(-.05, 0);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
  }
  // la retta y = x
  const ks = P(t, 31.9, 32.9);
  if (ks > 0) {
    const a = S(-2.5, -2.5), b = S(5.6, 5.6);
    ctx.save(); ctx.strokeStyle = css(C.v, .8); ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], ks), lerp(a[1], b[1], ks)); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:y = x}', b[0] + 14, b[1] + 16, { size: 40, align: 'left', alpha: P(t, 32.6, 33.0) });
  }
  // le due curve
  glowStroke(ctx, PE, P(t, 8.4, 9.6), C.y, 5);
  // l'etichetta si toglie mentre la copia della curva si ribalta (le passerebbe sopra)
  drawRich(ctx, '{my:y = 2ˣ}', 775, S(0, 5.2)[1], { size: 42, align: 'left', alpha: P(t, 9.3, 9.7) * (1 - life(t, T_FLIP[0] - .3, T_FLIP[1] + .9, .3, .3)) });
  const kf = P(t, T_FLIP[0], T_FLIP[1]);
  if (kf > 0 && t < T_FLIP[1] + .8) {
    const pts = [];
    for (let i = 0; i <= 120; i++) { const x = lerp(-2.5, Math.log2(5.6), i / 120), y = f(x); pts.push(S(lerp(x, y, kf), lerp(y, x, kf))); }
    ctx.save(); ctx.globalAlpha *= .6 * (1 - P(t, T_FLIP[1], T_FLIP[1] + .6)); glowStroke(ctx, pts, 1, C.y, 5); ctx.restore();
  }
  const kg = P(t, T_FLIP[1] - .2, T_FLIP[1] + .3);
  if (kg > 0) { ctx.save(); ctx.globalAlpha *= kg; glowStroke(ctx, PG, 1, C.g, 5); ctx.restore(); }
  drawRich(ctx, '{mg:y = log₂ x}', 1000, 360, { size: 40, alpha: P(t, 39.5, 39.9) });
  // P(2; 4) con le sue proiezioni, Q(4; 2)
  const kp = P(t, 12.7, 13.1, E.back);
  if (kp > 0) {
    const pr = life(t, 12.7, 27.0, .4, .4);
    dashed(ctx, S(2, 0), S(2, 4), C.x, 1, pr); dashed(ctx, S(0, 4), S(2, 4), C.y, 1, pr);
    dot(ctx, S(2, 4), C.y, kp, 11);
    drawRich(ctx, '{mink:(2; 4)}', S(2, 4)[0] - 20, S(2, 4)[1] - 40, { size: 40, align: 'right', alpha: P(t, 12.9, 13.3) });
  }
  const kq = P(t, 27.2, 27.6, E.back);
  if (kq > 0) {
    dot(ctx, S(4, 2), C.g, kq, 11);
    drawRich(ctx, '{mink:(4; 2)}', S(4, 2)[0] - 11, S(4, 2)[1] + 58, { size: 40, alpha: P(t, 27.4, 27.8) });
  }
  dashed(ctx, S(2, 4), S(4, 2), C.dim, P(t, 33.0, 33.6));
  // (0; 1) e (1; 0)
  const k1 = P(t, 46.3, 46.7, E.back), k2 = P(t, 46.9, 47.3, E.back);
  if (k1 > 0) {
    dashed(ctx, S(0, 1), S(1, 0), C.dim, P(t, 47.0, 47.5));
    dot(ctx, S(0, 1), C.y, k1, 10);
    drawRich(ctx, '{mink:(0; 1)}', S(0, 1)[0] - 22, S(0, 1)[1] - 18, { size: 40, align: 'right', alpha: k1 });
  }
  if (k2 > 0) {
    // l'etichetta sta in basso a destra, lontana dai numeri dell'asse, con una lineetta verso il punto
    const p = S(1, 0), q = [p[0] + 128, p[1] + 112];
    ctx.save(); ctx.globalAlpha *= k2 * .8; ctx.strokeStyle = css(C.g); ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(p[0] + 10, p[1] + 10); ctx.lineTo(q[0] - 6, q[1] - 6); ctx.stroke(); ctx.restore();
    dot(ctx, p, C.g, k2, 10);
    drawRich(ctx, '{mink:(1; 0)}', q[0], q[1] + 14, { size: 40, align: 'left', alpha: k2 });
  }
  ctx.restore();
}

// a destra la scheda con le scritte (7.5–FINE)
const RX = 1510;
function sceneScheda(ctx, t) {
  if (t < 7.4 || t > FINE + .4) return;
  const al = life(t, 7.5, FINE + .3, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 1180, 110, 660, 690);
  const riga = (s, y, a, b, size = 50) => drawRich(ctx, s, RX, y, { size, alpha: life(t, a, b, .4, .4) });
  // A · due viaggi opposti
  riga('{my:y = 2ˣ}', 200, 8.2, 26.9);
  riga('{mink:2² = 4}', 275, 12.7, 26.9);
  riga('{mg:y = log₂ x}', 400, 17.1, 26.9);
  riga('{mink:log₂ 4 = 2}', 475, 17.1, 26.9);
  const ki = life(t, 22.1, 26.9, .4, .4);
  if (ki > 0) {
    ctx.save(); ctx.globalAlpha *= ki; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.fillStyle = css(C.v, .07);
    ctx.beginPath(); ctx.roundRect(RX - 230, 570, 460, 90, 18); ctx.fill(); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{v:funzioni inverse}', RX, 615, { size: 44, alpha: ki });
  }
  // B · lo specchio
  riga('{dim:coordinate scambiate}', 200, 27.2, 55.4, 34);
  riga('{my:(2; 4)}{mink:  →  }{mg:(4; 2)}', 270, 27.2, 55.4);
  riga('{my:(0; 1)}{mink:  →  }{mg:(1; 0)}', 380, 46.3, 55.4);
  riga('{mink:log₂ 1 = 0}', 470, 50.9, 55.4);
  riga('{v:simmetrici} {dim:rispetto a} {mink:y = x}', 620, 41.9, 55.4, 40);
  // C · asintoto e dominio
  riga('{my:y = 2ˣ}', 190, 55.8, FINE + .3, 46);
  riga('{v:asintoto orizzontale}', 250, 60.5, FINE + .3, 34);
  riga('{mink:y = 0}', 305, 60.5, FINE + .3, 46);
  riga('{mg:y = log₂ x}', 420, 64.9, FINE + .3, 46);
  riga('{v:asintoto verticale}', 480, 64.9, FINE + .3, 34);
  riga('{mink:x = 0}', 535, 64.9, FINE + .3, 46);
  const kd = life(t, 69.9, FINE + .3, .4, .4);
  if (kd > 0) {
    ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.fillStyle = css(C.g, .07);
    ctx.beginPath(); ctx.roundRect(RX - 230, 610, 460, 100, 18); ctx.fill(); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{dim:dominio}  {mink:x > 0}', RX, 660, { size: 46, alpha: kd });
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Logaritmo ed esponenziale sono funzioni\ninverse: grafici simmetrici rispetto a {mink:y = x}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{dim:simmetrici rispetto a}', '{mink:y = x}'], [960, '{dim:passa per} {mink:(1; 0)}', '{dim:asintoto} {mink:x = 0}'], [1490, '{dim:dominio del logaritmo}', '{mink:x > 0}']];
  pills.forEach(([x, testa, fo], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 240, 440, 480, 160);
    if (i === 1) {   // «passa per (1; 0)»: le coordinate a 40, come le formule
      const wa = richW(ctx, '{dim:passa per} ', 32), wb = richW(ctx, '{mink:(1; 0)}', 40), x0 = x - (wa + wb) / 2;
      drawRich(ctx, '{dim:passa per}', x0, 484, { size: 32, weight: 400, align: 'left' });
      drawRich(ctx, '{mink:(1; 0)}', x0 + wa, 484, { size: 40, align: 'left' });
    } else drawRich(ctx, testa, x, 484, { size: 32, weight: 400 });
    drawRich(ctx, fo, x, 548, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Logaritmo ed esponenziale', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
