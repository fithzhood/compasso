'use strict';
/* Il Δ dell'equazione risolvente — sostituendo la retta nella circonferenza resta un'equazione di
   secondo grado: tante soluzioni, tanti punti comuni. Argomento: circonferenza. */
CVIDEO.registra('circonferenza/equazione-risolvente', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, txt, richW,
    dot, glowStroke, arrowHead, makePlane, card } = M;

// a 43,7 s la scena si ferma per 3,6 s (il fumetto delle ordinate): le scene usano il tempo rimappato tm(t)
const PAUSA = 43.7, SPOSTA = 3.6;
const tm = t => t < PAUSA ? t : t < PAUSA + SPOSTA ? PAUSA : t - SPOSTA;
const F0 = 80.0, FINE = F0 + SPOSTA;   // F0: fine delle scene nel tempo rimappato; FINE: nel tempo vero
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [38.6, 'felice'], [40.8, 'neutro'], [47.4, 'felice'], [49.6, 'neutro'],
  [55.2, 'sorpreso'], [57.4, 'neutro'], [60.2, 'felice'], [62.4, 'neutro'],
  [68.2, 'sorpreso'], [70.4, 'neutro'], [78.0, 'felice'], [80.6, 'neutro'],
  [FINE + 1.0, 'felice'], [90.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Dove si incontrano una retta\ne una circonferenza?'],
  // 1 · la risolvente
  [7.9, 12.0, 'La circonferenza {mink:x² + y² = 5}:\ncentro {mink:O}, raggio {mink:√5}.'],
  [12.2, 16.0, 'La retta {mink:y = 2x − 3}.'],
  [16.2, 20.4, 'I punti comuni rendono vere\ntutte e due le equazioni.'],
  [20.6, 25.0, 'Al posto di {mink:y} scrivo {mink:2x − 3}:\n{mink:x² + (2x − 3)² = 5}.'],
  [25.2, 29.8, 'Sviluppo e porto tutto a sinistra:\n{mink:5x² − 12x + 4 = 0}.'],
  [30.0, 34.0, 'È di secondo grado: si chiama\n{v:equazione risolvente}.'],
  [34.2, 38.4, 'Il suo {mink:Δ = 12² − 4 · 5 · 4 = 64}:\nè positivo.'],
  [38.6, 43.6, 'Due soluzioni, {mink:x = 2} e {mink:x = 0,4}:\nle ascisse dei due punti.'],
  [43.8, 47.2, 'Da {mink:y = 2x − 3} le ordinate:\n{mink:y = 1} e {mink:y = −2,2}.'],
  [47.4, 51.4, '{mink:Δ > 0}: due punti,\nla retta è {v:secante}.'],
  // 2 · la retta scende
  [51.6, 55.0, 'Abbasso la retta: {mink:y = 2x − 5}.'],
  [55.2, 60.0, 'Ora la risolvente è\n{mink:5x² − 20x + 20 = 0}, con {mink:Δ = 0}.'],
  [60.2, 64.6, 'Una sola soluzione, {mink:x = 2}, {mink:y = −1}:\nla retta è {v:tangente}.'],
  [64.8, 68.0, 'Ancora più giù: {mink:y = 2x − 7}.'],
  [68.2, 73.0, 'Ora la risolvente ha\n{mink:Δ = 28² − 4 · 5 · 44 = −96}: negativo.'],
  [73.2, 77.6, 'Nessuna soluzione, nessun punto:\nla retta è {v:esterna}.'],
  [78.0, 83.2, 'Tante soluzioni, tanti punti:\nil {mink:Δ} decide fra i tre casi.'],
  // chiusura
  [85.2, 92.8, 'Sostituisco la retta: il {mink:Δ}\nconta i punti in comune.'],
];

// circonferenza x² + y² = 5 (centro O, raggio √5); rette y = 2x + q con q = −3, −5, −7
const PL = makePlane({ ox: 444, oy: 445, u: 88, x0: -3.0, x1: 4.6, y0: -3.4, y1: 3.2 });
const CARD = [130, 100, 820, 690];
const R = Math.sqrt(5), OS = PL.toS(0, 0);
// ogni spostamento della retta è un movimento a sé
const qRetta = t => -3 - 2 * P(t, 48.2, 49.8, E.io) - 2 * P(t, 61.4, 63.0, E.io);
// griglia e assi, senza numeri: i numeri si scrivono dopo, su un fondino
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * u - 8, { size: 44 });
  ctx.restore();
}
// i numeri dispari: i pari ±2 starebbero sulla circonferenza, e −3 sull'asse y sulla prima retta
function numeri(ctx, k, t) {
  if (k <= 0) return;
  const { ox, oy, u } = PL;
  ctx.save(); ctx.globalAlpha *= P(k, .6, 1);
  const scrivi = (s, x, y, al) => {
    const w = richW(ctx, s, 29), x0 = al === 'right' ? x - w : x - w / 2;
    ctx.fillStyle = C.paper; ctx.fillRect(x0 - 5, y - 18, w + 10, 36);
    txt(ctx, s, x, y, { size: 29, color: C.dim, align: al });
  };
  const n = v => (v < 0 ? '−' : '') + Math.abs(v);
  for (const i of [-3, -1, 1]) scrivi(n(i), ox + i * u, oy + 32, 'center');
  // il 3 si spegne prima che la retta scenda su di lui
  const k3 = 1 - P(t, 61.0, 61.4);
  if (k3 > 0) { ctx.save(); ctx.globalAlpha *= k3; scrivi('3', ox + 3 * u, oy + 32, 'center'); ctx.restore(); }
  for (const j of [-1, 1, 3]) scrivi(n(j), ox - 20, oy - j * u, 'right');
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il {mink:Δ} dell’equazione risolvente', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano (7.5–F0)
function scenePiano(ctx, t, tv) {   // t: tempo rimappato, tv: tempo vero
  if (t < 7.5 || t > F0 + .3) return;
  const al = 1 - P(t, F0 - .6, F0 + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const kA = P(t, 7.7, 8.7);
  assi(ctx, kA);
  numeri(ctx, kA, t);
  // la circonferenza e il raggio (verso l'alto a sinistra: lì non passa nessuna retta)
  const cerchio = []; for (let i = 0; i <= 200; i++) { const a = .75 * Math.PI + 2 * Math.PI * i / 200; cerchio.push(PL.toS(R * Math.cos(a), R * Math.sin(a))); }
  glowStroke(ctx, cerchio, P(t, 8.2, 9.6), C.y, 6);
  const A = PL.toS(-R * Math.SQRT1_2, R * Math.SQRT1_2);
  if (t > 9.6) glowStroke(ctx, [OS, A], P(t, 9.6, 10.1), C.y, 5);
  const ML = PL.toS(-R * Math.SQRT1_2 / 2 - .3, R * Math.SQRT1_2 / 2 - .3);
  drawRich(ctx, '{my:√5}', ML[0], ML[1], { size: 40, alpha: P(t, 10.0, 10.4) });

  // la retta, tagliata sul riquadro del piano
  const q = qRetta(t);
  ctx.save();
  ctx.beginPath(); const a0 = PL.toS(PL.x0, PL.y1), a1 = PL.toS(PL.x1 + .1, PL.y0 - .1);
  ctx.rect(a0[0], a0[1], a1[0] - a0[0], a1[1] - a0[1]); ctx.clip();
  glowStroke(ctx, [PL.toS((PL.y0 - .5 - q) / 2, PL.y0 - .5), PL.toS((PL.y1 + .5 - q) / 2, PL.y1 + .5)], P(t, 12.3, 13.1), C.v, 6);
  ctx.restore();

  // i punti comuni, con le coordinate fuori dalla circonferenza
  const due = P(t, 38.8, 39.2, E.back) * (1 - P(t, 48.0, 48.3));
  if (due > 0) {
    const p1 = PL.toS(2, 1), p2 = PL.toS(.4, -2.2);
    dot(ctx, p1, C.g, due, 12); dot(ctx, p2, C.g, due, 12);
    // le coordinate compaiono quando Ada ricava le ordinate (durante la pausa, tempo vero)
    const kc = Math.min(1, due) * P(tv, 43.9, 44.3);
    drawRich(ctx, '{mink:(2; 1)}', p1[0] + 24, p1[1] + 4, { size: 40, align: 'left', alpha: kc });
    drawRich(ctx, '{mink:(0,4; −2,2)}', p2[0] + 30, PL.toS(0, -2.6)[1], { size: 40, align: 'left', alpha: kc });
  }
  const uno = P(t, 56.8, 57.2, E.back) * (1 - P(t, 61.2, 61.5));
  if (uno > 0) {
    const p = PL.toS(2, -1);
    dot(ctx, p, C.g, uno, 12);
    drawRich(ctx, '{mink:(2; −1)}', p[0] + 24, p[1] + 26, { size: 40, align: 'left', alpha: Math.min(1, uno) });
  }
  dot(ctx, OS, C.ink, P(t, 8.4, 8.8, E.back), 10);
  drawRich(ctx, '{mink:O}', OS[0] - 28, OS[1] + 30, { size: 40, alpha: P(t, 8.6, 9.0) });
  ctx.restore();
}

// il riquadro a destra
const PAN = [1000, 120, 830, 670], XS = 1060, XC = PAN[0] + PAN[2] / 2, XT = 1790;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function graffa(ctx, x, y0, y1, al) {   // la parentesi del sistema
  if (al <= 0) return;
  const m = (y0 + y1) / 2, w = 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0);
  ctx.quadraticCurveTo(x, y0, x, y0 + 14); ctx.lineTo(x, m - 12); ctx.quadraticCurveTo(x, m, x - w * .8, m);
  ctx.quadraticCurveTo(x, m, x, m + 12); ctx.lineTo(x, y1 - 14); ctx.quadraticCurveTo(x, y1, x + w, y1);
  ctx.stroke(); ctx.restore();
}
// i tre stati: [q, retta entra, retta esce, conti entrano, soluzioni entrano, tutto esce, sostituita, risolvente, Δ, soluzioni, verdetto]
const STATI = [
  [-3, 12.3, 48.2, 20.7, 38.7, 48.0, 'x² + (2x − 3)² = 5', '5x² − 12x + 4 = 0', '{mink:Δ = 12² − 4 · 5 · 4 = 64 > 0}', '{mink:x = 2}   e   {mink:x = 0,4}', '{mink:Δ > 0}: 2 punti, {v:secante}'],
  [-5, 49.8, 61.4, 51.7, 56.7, 61.2, 'x² + (2x − 5)² = 5', '5x² − 20x + 20 = 0', '{mink:Δ = 20² − 4 · 5 · 20 = 0}', '{mink:x = 2}', '{mink:Δ = 0}: 1 punto, {v:tangente}'],
  [-7, 63.0, 74.3, 64.7, 69.7, 74.3, 'x² + (2x − 7)² = 5', '5x² − 28x + 44 = 0', '{mink:Δ = 28² − 4 · 5 · 44 = −96 < 0}', 'nessuna soluzione', '{mink:Δ < 0}: nessun punto, {v:esterna}'],
];
function scenePannello(ctx, t) {
  if (t < 7.9 || t > F0 + .3) return;
  const al = life(t, 8.0, F0 + .2, .5, .8);
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const via = 1 - P(t, 74.2, 74.6);   // tutto lascia il posto alla tabella
  if (via > 0) {
    ctx.save(); ctx.globalAlpha *= via;
    drawRich(ctx, '{my:x² + y² = 5}', XS + 30, 170, { size: 44, align: 'left', local: t - 8.2 });
    txt(ctx, 'circonferenza', XT, 170, { size: 30, color: C.dim, align: 'right', alpha: P(t, 8.4, 8.8) });
    graffa(ctx, XS + 6, 135, 275, P(t, 16.3, 16.8));
    separa(ctx, 300, P(t, 16.4, 16.8));
    STATI.forEach(([q, ra, rb, ca, sa, fine, sost, ris, del, sol, ver], i) => {
      const primo = i === 0;
      const kr = life(t, ra, rb, primo ? .1 : .3, .3);
      drawRich(ctx, '{mv:y = 2x − ' + (-q) + '}', XS + 30, 240, { size: 44, align: 'left', local: primo ? t - ra : 99, alpha: kr });
      txt(ctx, 'retta', XT, 240, { size: 30, color: C.dim, align: 'right', alpha: primo ? Math.min(kr, P(t, 12.4, 12.8)) : kr });
      txt(ctx, 'risolvente', XT, 430, { size: 30, color: C.v, align: 'right', alpha: life(t, primo ? 30.1 : ca, fine, .4, .3) });
      const kc = life(t, ca, fine, .3, .3); if (kc <= 0) return;
      ctx.save(); ctx.globalAlpha *= kc;
      drawRich(ctx, '{mink:' + sost + '}', XS, 350, { size: 44, align: 'left', local: primo ? t - 20.7 : 99 });
      drawRich(ctx, '{mink:' + ris + '}', XS, 430, { size: 44, align: 'left', local: primo ? t - 25.3 : 99 });
      drawRich(ctx, del, XS, 510, { size: 44, align: 'left', local: primo ? t - 34.3 : 99 });
      drawRich(ctx, sol, XS, 590, { size: 44, align: 'left', local: t - sa });
      separa(ctx, 635, P(t, sa, sa + .3));
      drawRich(ctx, ver, XC, 700, { size: 40, local: t - (primo ? 43.9 : sa) });
      ctx.restore();
    });
    ctx.restore();
  }
  // la tabella riassuntiva
  const tb = P(t, 74.6, 75.0);
  if (tb > 0) {
    ctx.save(); ctx.globalAlpha *= tb;
    const col = [1150, 1415, 1680];
    drawRich(ctx, '{mink:Δ}', col[0], 215, { size: 36 });
    txt(ctx, 'punti comuni', col[1], 215, { size: 32, color: C.dim });
    txt(ctx, 'la retta è', col[2], 215, { size: 32, color: C.dim });
    separa(ctx, 260, 1);
    [['{mink:Δ > 0}', '2', 'secante'], ['{mink:Δ = 0}', '1', 'tangente'], ['{mink:Δ < 0}', '0', 'esterna']].forEach(([a, b, c], j) => {
      const y = 340 + j * 120, k = P(t, 74.8 + j * .3, 75.2 + j * .3);
      drawRich(ctx, a, col[0], y, { size: 52, alpha: k });
      drawRich(ctx, '{mink:' + b + '}', col[1], y, { size: 52, alpha: k });
      drawRich(ctx, '{v:' + c + '}', col[2], y, { size: 44, alpha: k });
    });
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (F0–92)
function sceneFine(ctx, t) {
  if (t < F0) return;
  const al = 1 - P(t, 89.8, 90.8);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - F0 - .4 });
    drawRich(ctx, 'Sostituisci la retta nella circonferenza:\nil {mink:Δ} della risolvente conta i punti comuni.', W / 2, 290, { size: 62, weight: 600, local: t - F0 - .8, stagger: .08 });
  });
  const pills = [[490, 'secante', '{mink:Δ > 0}'], [960, 'tangente', '{mink:Δ = 0}'], [1430, 'esterna', '{mink:Δ < 0}']];
  pills.forEach(([px, testa, f], i) => {
    const a = F0 + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 445, 430, 150);
    drawRich(ctx, '{v:' + testa + '}', px, 486, { size: 32, weight: 500 });
    drawRich(ctx, f, px, 548, { size: 48 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il Δ dell’equazione risolvente', durata: 95.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 51.5, 'la risolvente'], [51.5, FINE, 'la retta scende']],
    scena(ctx, t) { const s = tm(t); sceneIntro(ctx, s); scenePiano(ctx, s, t); scenePannello(ctx, s); sceneFine(ctx, s); },
  };
});
