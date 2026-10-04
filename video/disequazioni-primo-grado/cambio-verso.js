'use strict';
/* Perché il verso si gira — sommare fa scorrere la retta, moltiplicare per −1 la ribalta: 2 < 5 ma −2 > −5. Argomento: disequazioni-primo-grado. */
CVIDEO.registra('disequazioni-primo-grado/cambio-verso', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, txt,
    dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 100.0, DURATA = 110.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [12.3, 'felice'], [14.6, 'neutro'],
  [31.0, 'felice'], [33.2, 'neutro'],
  [46.2, 'sorpreso'], [48.4, 'neutro'], [51.8, 'felice'], [54.0, 'neutro'], [56.1, 'sorpreso'], [58.3, 'neutro'],
  [67.4, 'felice'], [69.6, 'neutro'], [77.3, 'sorpreso'], [79.4, 'neutro'], [81.6, 'pensa'], [87.8, 'felice'], [89.9, 'neutro'], [91.9, 'pensa'],
  [96.0, 'sorpreso'], [98.1, 'felice'], [104.6, 'occhiolino'], [106.8, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede; i movimenti stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Perché il verso si gira, se\nmoltiplico per un {r:negativo}?'],
  // 1 · minore e maggiore
  [7.9, 12.2, 'Sulla retta dei numeri, 2 sta\na sinistra di 5.'],
  [12.3, 16.6, 'Quindi {mink:2 < 5}: il segno {mink:<}\nsi legge «minore di».'],
  [16.7, 20.4, 'Il segno opposto è {mink:>},\n«maggiore di».'],
  [20.5, 25.25, 'Il {v:verso} è il senso del segno:\n{mink:<} e {mink:>} hanno versi opposti.'],
  // 2 · sommare: la retta scorre
  [25.3, 28.8, 'Aggiungo 4 a tutti e due i numeri.'],
  [31.0, 35.0, 'Scivolano insieme a destra:\n{mink:6 < 9}, il verso {g:resta}.'],
  [35.1, 39.4, 'Sommare o togliere lo stesso numero\nnon cambia mai il verso.'],
  // 3 · per −1: la retta si ribalta
  [39.7, 43.4, 'Ora moltiplico 2 e 5 per {mink:−1}.'],
  [46.2, 51.7, 'La retta si è {v:ribaltata} attorno a 0:\n2 è finito in {mink:−2}, 5 in {mink:−5}.'],
  [51.8, 56.0, 'Ora {mink:−5} sta a sinistra di {mink:−2}:\nquindi {mink:−2 > −5}.'],
  [56.1, 60.4, 'Il minore è diventato il maggiore:\nil verso si è {r:girato}.'],
  // 4 · per −2: si allunga e si ribalta
  [60.8, 65.3, 'Moltiplicare per {mink:−2} è come\nper 2 e poi per {mink:−1}.'],
  [67.4, 71.6, 'Per 2 si allontanano da 0:\n{mink:4 < 10}, il verso {g:resta}.'],
  [71.7, 74.45, 'Poi moltiplico per {mink:−1}…'],
  [77.3, 81.4, '{mink:−4 > −10}: il verso\nsi è {r:girato} di nuovo.'],
  // 5 · diviso per −2
  [81.6, 86.6, 'Parto da {mink:−4 < 6} e divido per {mink:−2}:\nprima per 2, poi per {mink:−1}.'],
  [87.8, 91.8, 'Divido per 2, che è {g:positivo}:\n{mink:−2 < 3}, il verso resta.'],
  [91.9, 94.65, 'Poi divido per {mink:−1}…'],
  [96.0, 100.0, '{mink:2 > −3}: anche dividendo per\nun negativo il verso si gira.'],
  // chiusura
  [101.4, 107.4, 'Per un numero negativo la retta\nsi ribalta: il verso si capovolge.'],
];

// la retta dei numeri: 0 in OX, un'unità = U pixel; nel ribaltamento le altezze sono schiacciate di SQ (retta vista di sbieco)
const RY = 590, OX = 960, U = 76, XA = -10.6, XB = 10.6, SQ = .23;
const X = v => OX + v * U;
const S = (v, h) => [X(v), RY - h * U * SQ];
const LINE = [80, 380, 1760, 420], TOP = [80, 110, 1760, 230];
const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
const PI = Math.PI;
// numero sotto la retta, pieno, su un fondino del colore della scheda
let schedaPiena = true;
function numero(ctx, v, al, col = C.dim, size = 30, weight = 500) {
  if (al <= 0) return;
  const s = lab(v), w = size * .62 * Array.from(s).length + 14, h = size + 8;
  if (schedaPiena) {
    ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
    ctx.fillRect(X(v) - w / 2, RY + 46 - h / 2, w, h);
    ctx.restore();
  }
  txt(ctx, s, X(v), RY + 46, { size, weight, color: col, alpha: al });
}
// i numeri importanti: [valore, colore, entra, esce]
const EVIDENZA = () => [[2, C.x, 8.6, 81.9], [5, C.x, 8.9, 81.9], [6, C.v, 30.5, 39.9], [9, C.v, 30.5, 39.9],
  [-2, C.v, 45.8, 60.9], [-5, C.v, 45.8, 60.9], [4, C.v, 67.0, 74.7], [10, C.v, 67.0, 74.7], [-4, C.v, 76.9, 81.9], [-10, C.v, 76.9, 81.9],
  [-4, C.x, 81.9, 120], [6, C.x, 81.9, 120], [-2, C.v, 87.5, 94.8], [3, C.v, 87.5, 94.8], [2, C.v, 95.8, 120], [-3, C.v, 95.8, 120]];
// i numeri di partenza: 2 e 5, poi (per la divisione) −4 e 6
const BASE = () => [[2, 8.6, 81.8], [5, 8.9, 81.8], [-4, 81.9, 120], [6, 81.9, 120]];
// le copie viola: per ognuna [valore sulla retta, altezza]; nel ribaltamento ogni punto fa mezzo giro
// sopra la retta, così non passa mai sui numeri sotto l'asse
const giro = (v, th) => [v * Math.cos(th), Math.abs(v) * Math.sin(th)];
function copie(t) {
  if (t >= 28.7 && t < 40.0) {
    const s = 4 * P(t, 29.0, 30.6, E.io);
    return { al: 1 - P(t, 39.4, 40.0), pop: P(t, 28.7, 29.0, E.back), pts: [2, 5].map(v => [v + s, 0]) };
  }
  if (t >= 40.0 && t < 61.0) {
    const th = PI * P(t, 43.5, 45.9, E.io);
    return { al: 1 - P(t, 60.4, 61.0), pop: P(t, 40.0, 40.3, E.back), pts: [2, 5].map(v => giro(v, th)) };
  }
  if (t >= 61.0 && t < 81.9) {
    const s = 1 + P(t, 65.5, 67.1, E.io), th = PI * P(t, 74.6, 77.0, E.io);
    return { al: 1 - P(t, 81.4, 81.8), pop: P(t, 61.0, 61.3, E.back), pts: [2, 5].map(v => giro(v * s, th)) };
  }
  if (t >= 81.9) {
    // diviso per −2: prima diviso per 2 (si avvicinano a 0), poi per −1 (mezzo giro)
    const s = 1 - .5 * P(t, 86.8, 87.6, E.io), th = PI * P(t, 94.7, 95.9, E.io);
    return { al: 1, pop: P(t, 82.2, 82.5, E.back), pts: [-4, 6].map(v => giro(v * s, th)) };
  }
  return null;
}
// la retta che si ribalta: le due metà girano attorno a 0 restando sopra l'asse, finché si scambiano;
// la punta sta dalla parte dei positivi, e alla fine guarda a sinistra
function asta(ctx, th, al) {
  if (al <= 0) return;
  const o = S(0, 0), a = S(...giro(XA, th)), b = S(...giro(XB, th));
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v, .5); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(o[0], o[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  const ang = Math.atan2(b[1] - o[1], b[0] - o[0]);
  arrowHead(ctx, [b[0] + 14 * Math.cos(ang), b[1] + 14 * Math.sin(ang)], ang, C.v);
  ctx.restore();
}
// la strada fatta nel ribaltamento: mezza ellisse tratteggiata da v a −v
function scia(ctx, v, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v, .55); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const th = PI * i / 40, p = S(v * Math.cos(th), v * Math.sin(th)); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }
  ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Perché il verso si gira', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–4 · la retta dei numeri (7.5–FINE)
function sceneRetta(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  schedaPiena = al >= 1 && t >= 8.2;
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LINE, P(t, 7.5, 8.2));
  // la retta con le tacche
  const kb = P(t, 7.7, 8.5);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(XA) - 10, RY); ctx.lineTo(X(XB) + 10, RY); ctx.stroke();
    arrowHead(ctx, [X(XB) + 24, RY], 0, C.ink);
    ctx.lineWidth = 2.5;
    for (let i = -10; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(X(i), RY - 10); ctx.lineTo(X(i), RY + 10); ctx.stroke(); }
    ctx.restore();
  }
  // la retta che si ribalta, e la strada fatta da 2 e da 5
  asta(ctx, PI * P(t, 43.5, 45.9, E.io), life(t, 43.4, 51.7, .2, .4));
  asta(ctx, PI * P(t, 74.6, 77.0, E.io), life(t, 74.5, 81.4, .2, .4));
  asta(ctx, PI * P(t, 94.7, 95.9, E.io), life(t, 94.6, 99.9, .2, .4));
  const ks = life(t, 45.9, 51.7, .3, .4);
  scia(ctx, 2, ks); scia(ctx, 5, ks);
  // i numeri: grigi, e quelli importanti colorati e più grandi sopra
  const kn = P(t, 7.9, 8.9);
  for (let i = -10; i <= 10; i++) numero(ctx, i, kn);
  for (const [v, col, a, b] of EVIDENZA()) numero(ctx, v, life(t, a, b, .3, .3), col, 44, 600);
  // 2 e 5
  for (const [v, a, b] of BASE()) dot(ctx, S(v, 0), C.x, P(t, a, a + .35, E.back) * (1 - P(t, b - .5, b)), 11);
  // le copie che si muovono
  const cp = copie(t);
  if (cp && cp.al > 0) {
    ctx.save(); ctx.globalAlpha *= cp.al;
    cp.pts.forEach(([v, h]) => dot(ctx, S(v, h), C.v, cp.pop, 11));
    ctx.restore();
  }
  ctx.restore();
}
// una parte di una formula che si accende
function evidenzia(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .14);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
// il riquadro in alto: 2 < 5, l'operazione sulla freccia, il risultato
const XF0 = 690, XF1 = 1010, YF = 222, XR = 1420;
function scenePannello(ctx, t) {
  const pa = life(t, 12.0, FINE + .2, .6, .8);
  if (pa <= 0) return;
  card(ctx, ...TOP, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  drawRich(ctx, '{mx:2}{mink: < }{mx:5}', 400, YF, { size: 72, local: t - 12.4, alpha: 1 - P(t, 81.4, 81.8) });
  drawRich(ctx, '{mx:−4}{mink: < }{mx:6}', 400, YF, { size: 72, alpha: P(t, 81.9, 82.3) });
  // che cosa vogliono dire < e >
  drawRich(ctx, '{mink:<}', 1250, 180, { size: 48, alpha: life(t, 12.6, 25.5, .4, .4) });
  txt(ctx, 'minore di', 1300, 180, { size: 40, align: 'left', alpha: life(t, 12.6, 25.5, .4, .4) });
  drawRich(ctx, '{mink:>}', 1250, 268, { size: 48, alpha: life(t, 16.8, 25.5, .4, .4) });
  txt(ctx, 'maggiore di', 1300, 268, { size: 40, align: 'left', alpha: life(t, 16.8, 25.5, .4, .4) });
  // la freccia dell'operazione
  const kf1 = P(t, 25.4, 25.9);
  if (kf1 > 0) {
    ctx.save(); ctx.globalAlpha *= kf1; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(XF0, YF + 8); ctx.lineTo(XF1, YF + 8); ctx.stroke();
    arrowHead(ctx, [XF1 + 10, YF + 8], 0, C.dim);
    ctx.restore();
  }
  drawRich(ctx, '{mink:+ 4}', (XF0 + XF1) / 2, 160, { size: 44, alpha: life(t, 25.5, 39.9, .4, .4) });
  drawRich(ctx, '{mink:· (−1)}', (XF0 + XF1) / 2, 160, { size: 44, alpha: life(t, 39.9, 60.9, .4, .4) });
  // · (−2) = · 2 · (−1): si accende il pezzo che si sta facendo
  const a2 = life(t, 60.9, 81.8, .4, .4);
  if (a2 > 0) {
    const A = '· (−2) = ', B = '· 2', D = ' · (−1)';
    const wA = richW(ctx, '{mink:' + A + '}', 44), wB = richW(ctx, '{mink:' + B + '}', 44), wD = richW(ctx, '{mink:' + D + '}', 44);
    const x0 = (XF0 + XF1) / 2 - (wA + wB + wD) / 2;
    evidenzia(ctx, x0 + wA - 8, 132, wB + 16, 58, C.v, a2 * life(t, 65.4, 71.8, .3, .3));
    evidenzia(ctx, x0 + wA + wB + 4, 132, wD + 4, 58, C.v, a2 * P(t, 71.6, 71.9));
    drawRich(ctx, '{mink:' + A + B + D + '}', (XF0 + XF1) / 2, 160, { size: 44, alpha: a2 });
  }
  // i risultati
  drawRich(ctx, '{mv:6}{mink: }{mg:<}{mink: }{mv:9}', XR, YF, { size: 72, local: t - 30.8, alpha: 1 - P(t, 39.4, 39.9) });
  drawRich(ctx, '{mv:−2}{mink: }{mr:>}{mink: }{mv:−5}', XR, YF, { size: 72, local: t - 51.9, alpha: 1 - P(t, 60.4, 60.9) });
  drawRich(ctx, '{mv:4}{mink: }{mg:<}{mink: }{mv:10}', XR, YF, { size: 72, local: t - 67.4, alpha: 1 - P(t, 74.4, 74.8) });
  drawRich(ctx, '{mv:−4}{mink: }{mr:>}{mink: }{mv:−10}', XR, YF, { size: 72, local: t - 77.3, alpha: 1 - P(t, 81.4, 81.8) });
  // : (−2) = : 2 : (−1), con il pezzo che si sta facendo acceso
  const a3 = P(t, 81.9, 82.3);
  if (a3 > 0) {
    const A = ': (−2) = ', B = ': 2', D = ' : (−1)';
    const wA = richW(ctx, '{mink:' + A + '}', 44), wB = richW(ctx, '{mink:' + B + '}', 44), wD = richW(ctx, '{mink:' + D + '}', 44);
    const x0 = (XF0 + XF1) / 2 - (wA + wB + wD) / 2;
    evidenzia(ctx, x0 + wA - 8, 132, wB + 16, 58, C.v, a3 * life(t, 86.7, 92.0, .3, .3));
    evidenzia(ctx, x0 + wA + wB + 4, 132, wD + 4, 58, C.v, a3 * P(t, 91.8, 92.1));
    drawRich(ctx, '{mink:' + A + B + D + '}', (XF0 + XF1) / 2, 160, { size: 44, alpha: a3 });
  }
  drawRich(ctx, '{mv:−2}{mink: }{mg:<}{mink: }{mv:3}', XR, YF, { size: 72, local: t - 87.8, alpha: 1 - P(t, 94.6, 95.0) });
  drawRich(ctx, '{mv:2}{mink: }{mr:>}{mink: }{mv:−3}', XR, YF, { size: 72, local: t - 96.0 });
  ctx.restore();
}

// 5 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Moltiplicare o dividere per un {r:negativo}\nribalta la retta: il verso si capovolge.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'sommare o togliere:\nil verso {g:resta}'], [960, 'per un {g:positivo}:\nil verso {g:resta}'], [1430, 'per un {r:negativo}:\nil verso {r:si capovolge}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 445, 430, 130);
    drawRich(ctx, s, x, 512, { size: 33, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Perché il verso si gira', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 25.2, 'minore e maggiore'], [25.2, 39.6, 'sommare'], [39.6, 60.6, 'moltiplicare per −1'], [60.6, 81.5, 'e con −2?'], [81.5, FINE, 'e dividendo?']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneRetta(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
