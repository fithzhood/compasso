'use strict';
/* Gradi e radianti — un raggio copiato e avvolto sulla circonferenza stacca l'angolo di 1 radiante;
   in mezza circonferenza (πr) ci stanno π raggi: π rad = 180°, e 1 rad = 180°/π ≈ 57,3°. Argomento: funzioni-goniometriche. */
CVIDEO.registra('funzioni-goniometriche/radianti', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, drawSeq, glowStroke, dot, card } = M;

const FINE = 83.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [20.6, 'felice'], [22.8, 'neutro'],
  [29.5, 'felice'], [31.8, 'neutro'], [38.3, 'pensa'], [42.0, 'neutro'], [46.2, 'felice'], [48.4, 'neutro'],
  [53.8, 'felice'], [56.8, 'neutro'], [69.6, 'festa'], [72.0, 'neutro'], [74.3, 'felice'], [76.5, 'neutro'],
  [78.5, 'pensa'], [80.8, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla di uno stato, il disegno è fermo
const FUMETTI = [
  [2.0, 6.4, 'Si può misurare un angolo\nusando il raggio, non i gradi?'],
  // 1 · un raggio avvolto
  [7.9, 12.0, 'Una circonferenza di centro {mink:O}\ne un raggio, lungo {mink:r}.'],
  [12.2, 16.2, 'Copio il raggio e lo metto\nin piedi sul bordo.'],
  [16.4, 20.4, 'Ora lo piego e lo avvolgo\nsulla circonferenza…'],
  [20.6, 24.9, '…e l’arco che copre è lungo {mink:r},\nproprio quanto il raggio.'],
  [25.1, 29.3, 'Unisco il centro con la fine\ndell’arco: ecco un angolo.'],
  [29.5, 34.5, 'L’angolo al centro che stacca un arco\nlungo quanto il raggio: {v:1 radiante}.'],
  [34.7, 38.0, 'In breve si scrive {v:1 rad}.'],
  // 2 · mezzo giro
  [38.3, 41.8, 'Quanti radianti ci sono\nin mezzo giro?'],
  [42.0, 46.0, 'Avvolgo un secondo raggio…'],
  [46.2, 49.0, '…e arrivo a {v:2 radianti}.'],
  [49.2, 53.6, 'Ne avvolgo un terzo…'],
  [53.8, 56.6, '…{v:3 radianti}: quasi mezzo giro.'],
  [56.8, 61.1, 'La circonferenza è lunga {mink:2πr}:\n{mink:π} è pi greco, circa 3,14.'],
  [61.2, 65.2, 'Mezza circonferenza è lunga {mink:πr}:\npoco più di 3 raggi.'],
  [65.4, 69.4, 'Aggiungo il pezzetto che manca\ne arrivo a mezzo giro.'],
  [69.6, 74.1, 'Mezzo giro misura {mink:π} radianti:\n{mg:π}{g: rad = 180°}.'],
  [74.3, 78.3, 'Un giro intero è il doppio:\n{mink:2π}{ink: rad = 360°}.'],
  [78.5, 83.0, 'E 1 rad? Divido 180° per {mink:π}:\nè circa {g:57,3°}.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Un radiante stacca un arco lungo\nil raggio, e mezzo giro è {mink:π} rad.'],
];

// la circonferenza: centro O, raggio U pixel; S porta le coordinate in raggi sulla tela
const O = [660, 470], U = 230;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const pol = (a, r = 1) => S(r * Math.cos(a), r * Math.sin(a));
const CARD = [250, 110, 820, 690];
// le tre copie del raggio: compaiono, ruotano attorno a O fino alla fine dell'arco già coperto (k radianti),
// fanno perno sul bordo finché stanno in piedi (tangenti), poi si avvolgono
const COPIE = [
  { k: 0, comp: 12.4, rot: null, piv: [12.9, 14.3], av: [16.8, 19.6] },
  { k: 1, comp: 42.2, rot: [42.4, 43.4], piv: [43.4, 44.2], av: [44.2, 45.8] },
  { k: 2, comp: 49.3, rot: [49.5, 50.7], piv: [50.7, 51.5], av: [51.5, 53.2] },
];
const PEZZO = [65.8, 66.8];   // l'ultimo pezzetto, lungo π − 3 raggi
// i punti di una copia lunga L raggi, in un istante: fase rotazione, perno o avvolgimento
function corda(c, t, L = 1, n = 60) {
  const pts = [];
  const rot = c.rot ? P(t, c.rot[0], c.rot[1]) : 1, piv = P(t, c.piv[0], c.piv[1]), w = P(t, c.av[0], c.av[1], E.io) * L;
  for (let i = 0; i <= n; i++) {
    const s = L * i / n;
    if (piv <= 0) { const a = c.k * rot; pts.push(S(s * Math.cos(a), s * Math.sin(a))); continue; }
    if (w <= 0) {   // perno sul punto di arrivo: dalla direzione verso il centro a quella tangente
      const th = c.k + Math.PI - piv * Math.PI / 2;
      pts.push(S(Math.cos(c.k) + s * Math.cos(th), Math.sin(c.k) + s * Math.sin(th))); continue;
    }
    if (s <= w) { pts.push(pol(c.k + s)); continue; }
    const b = c.k + w;
    pts.push(S(Math.cos(b) - (s - w) * Math.sin(b), Math.sin(b) + (s - w) * Math.cos(b)));
  }
  return pts;
}
function arco(ctx, a0, a1, r, col, w, al = 1) {
  if (al <= 0 || a1 - a0 < .005) return;
  const pts = []; const n = Math.max(8, Math.ceil((a1 - a0) * 40));
  for (let i = 0; i <= n; i++) pts.push(pol(lerp(a0, a1, i / n), r));
  ctx.save(); ctx.globalAlpha *= al; glowStroke(ctx, pts, 1, col, w); ctx.restore();
}
function linea(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// etichetta (sempre fuori dalle linee che si muovono)
function etichetta(ctx, s, p, al, size = 40) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; drawRich(ctx, s, p[0], p[1], { size }); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Gradi e radianti', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · la circonferenza, i raggi avvolti, mezzo giro e giro intero (7.5–FINE)
function sceneCerchio(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // la circonferenza
  const kc = P(t, 7.7, 8.5, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, -2 * Math.PI * kc, true); ctx.stroke(); ctx.restore();
  }
  // l'anello verde: la circonferenza intera (2πr), poi la metà (πr), poi di nuovo intera
  const kr = life(t, 57.0, FINE, .5, .4);
  if (kr > 0) {
    const fineA = 2 * Math.PI - Math.PI * P(t, 61.3, 62.1) + Math.PI * P(t, 74.5, 75.9);
    arco(ctx, 0, fineA, 1.09, C.g, 5, kr);
    etichetta(ctx, '{mg:2πr}', pol(-Math.PI / 2, 1.27), kr * (1 - P(t, 61.2, 61.5)) + P(t, 75.6, 76.0) * (1 - P(t, FINE - .6, FINE)), 44);
    etichetta(ctx, '{mg:πr}', pol(Math.PI / 2, 1.43), P(t, 61.9, 62.3) * (1 - P(t, 74.4, 74.7)), 52);
  }
  // gli archi già avvolti (viola) e le copie che si muovono
  COPIE.forEach(c => {
    const a = P(t, c.comp, c.comp + .4);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; glowStroke(ctx, corda(c, t), 1, C.v, 7); ctx.restore();
  });
  arco(ctx, 3, 3 + (Math.PI - 3) * P(t, PEZZO[0], PEZZO[1]), 1, C.v, 7, P(t, PEZZO[0], PEZZO[0] + .1));
  // le tacche alla fine di ogni radiante, con il loro nome fuori
  [[1, 38.5], [2, 46.3], [3, 53.9]].forEach(([k, quando]) => {
    const a = P(t, quando, quando + .4);
    if (a <= 0) return;
    linea(ctx, pol(k, .93), pol(k, 1.07), C.v, 4, 1, a);
    etichetta(ctx, '{v:' + k + ' rad}', pol(k, k === 3 ? 1.42 : 1.33), a, 34);
  });
  // il raggio OA, poi OB alla fine del primo arco, poi il raggio verso sinistra a mezzo giro
  linea(ctx, O, S(1, 0), C.ink, 5, P(t, 8.3, 8.8));
  linea(ctx, O, pol(1), C.ink, 5, P(t, 25.3, 25.9));
  linea(ctx, O, S(-1, 0), C.ink, 5, P(t, 67.0, 67.6));
  // gli angoli al centro: 1 rad (viola), poi mezzo giro e giro intero (verde)
  const k1 = P(t, 25.9, 26.5);
  if (k1 > 0) arco(ctx, 0, k1, .2, C.v, 4);
  const kp = P(t, 67.6, 68.2) + P(t, 74.5, 75.9);
  if (kp > 0) arco(ctx, 0, kp * Math.PI, .3, C.g, 4);
  dot(ctx, O, C.ink, P(t, 8.0, 8.3, E.back), 9);
  // le etichette: O e r del raggio, r sull'arco, 1 rad nell'angolo
  etichetta(ctx, '{mink:O}', [O[0] - 34, O[1] + 40], P(t, 8.2, 8.6) * (1 - P(t, 38.0, 38.4)));
  etichetta(ctx, '{mink:r}', [O[0] + U / 2, O[1] + 34], P(t, 8.7, 9.1));
  const c0 = COPIE[0], m = corda(c0, t, 1, 2)[1], d = Math.hypot(m[0] - O[0], m[1] - O[1]) || 1;
  etichetta(ctx, '{mv:r}', [m[0] + (m[0] - O[0]) / d * 34, m[1] + (m[1] - O[1]) / d * 34], P(t, 14.3, 14.7) * (1 - P(t, 38.0, 38.4)));
  etichetta(ctx, '{v:1 rad}', pol(.5, .55), P(t, 34.9, 35.3) * (1 - P(t, 38.0, 38.4)), 38);
  ctx.restore();
}

// la scheda a destra: prima che cos'è un radiante, poi la tabella arco → angolo
const XS = 1480, XA = 1320, XB = 1630;
const RIGHE = [   // [quando arco, arco, quando angolo, angolo]
  [38.5, '1 raggio', 38.5, '{v:1 rad}'],
  [46.3, '2 raggi', 46.3, '{v:2 rad}'],
  [53.9, '3 raggi', 53.9, '{v:3 rad}'],
  [61.4, '{mink:π}{ink: raggi}', 69.8, '{mg:π}{g: rad = 180°}'],
  [75.9, '{mink:2π}{ink: raggi}', 75.9, '{mg:2π}{g: rad = 360°}'],
];
function sceneScheda(ctx, t) {
  if (t < 20.6 || t > FINE + .2) return;
  const la = P(t, 20.6, 21.2) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1140, 120, 680, 680, la);
  ctx.save(); ctx.globalAlpha *= la;
  // 1 · il radiante
  const f1 = 1 - P(t, 37.9, 38.3);
  if (f1 > 0) {
    conFont(TITOLI, () => drawRich(ctx, 'il radiante', XS, 190, { size: 42, weight: 600, alpha: f1 }));
    drawRich(ctx, '{dim:arco lungo }{mink:r}', XS, 300, { size: 44, local: t - 20.8, alpha: f1 });
    drawRich(ctx, '{dim:angolo al centro}', XS, 420, { size: 36, local: t - 29.8, alpha: f1 });
    drawRich(ctx, '{v:1 radiante}', XS, 500, { size: 72, weight: 600, local: t - 30.2, alpha: f1 });
    drawRich(ctx, '{dim:in breve }{v:1 rad}', XS, 620, { size: 44, local: t - 34.9, alpha: f1 });
  }
  // 2 · la tabella
  const f2 = P(t, 38.3, 38.8);
  if (f2 > 0) {
    ctx.save(); ctx.globalAlpha *= f2;
    drawRich(ctx, '{dim:arco}', XA, 200, { size: 36 });
    drawRich(ctx, '{dim:angolo}', XB, 200, { size: 36 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1180, 240); ctx.lineTo(1780, 240); ctx.stroke();
    RIGHE.forEach(([qa, a, qb, b], i) => {
      const y = 300 + 66 * i;
      drawRich(ctx, a, XA, y, { size: 44, alpha: P(t, qa, qa + .3), local: t - qa });
      drawRich(ctx, b, XB, y, { size: 44, alpha: P(t, qb, qb + .3), local: t - qb });
    });
    const k3 = P(t, 78.6, 79.0);
    if (k3 > 0) {
      ctx.beginPath(); ctx.moveTo(1180, 625); ctx.lineTo(1780, 625); ctx.stroke();
      drawSeq(ctx, ['{ink:1 rad =}', { num: '{ink:180°}', den: '{mink:π}' }, '{ink:≈ }{g:57,3°}'], XS, 712, 48, { local: t - 78.7 });
    }
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un radiante è l’angolo al centro che\nstacca un arco lungo quanto il raggio.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, '{mink:π}{ink: rad = 180°}'], [960, '{mink:2π}{ink: rad = 360°}'], [1430, '{ink:1 rad ≈ 57,3°}']];
  pills.forEach(([px, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 455, 430, 130);
    drawRich(ctx, s, px, 520, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Gradi e radianti', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 38.2, 'un raggio sulla circonferenza'], [38.2, FINE, 'quanti radianti in mezzo giro?']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCerchio(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
