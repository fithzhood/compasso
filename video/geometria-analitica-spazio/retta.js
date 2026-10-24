'use strict';
/* Una retta che cammina — A(1; 1; 3) e B(2; 3; 2): un punto parte da A e segue la freccia B − A = (1; 2; −1);
   al tempo t è in P(t) = (1 + t; 1 + 2t; 3 − t), passa per A a t = 0 e per B a t = 1; le sue posizioni formano
   la retta, e le equazioni parametriche mostrano il punto A e il vettore direzione. Argomento: geometria-analitica-spazio.
   (Nel catalogo la freccia era (2; 1; −1) da A(1; 0; 3): in questa assonometria quella retta corre quasi sopra
   l'asse z, quindi la freccia è diventata (1; 2; −1) e il punto di partenza A(1; 1; 3).) */
CVIDEO.registra('geometria-analitica-spazio/retta', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, fmtN, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 70.4, DUR = 82.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [16.8, 'felice'], [19.0, 'neutro'], [26.4, 'felice'], [28.6, 'neutro'], [36.6, 'sorpreso'], [38.8, 'neutro'],
  [45.2, 'festa'], [47.4, 'neutro'], [55.8, 'felice'], [58.0, 'neutro'], [60.1, 'felice'], [62.3, 'neutro'],
  [FINE + 2.0, 'felice'], [FINE + 7.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Come si descrive una retta\nnello spazio?'],
  // 1 · un punto che cammina
  [7.9, 12.0, 'Ecco due punti: {mink:A(1; 1; 3)}\ne {mink:B(2; 3; 2)}.'],
  [12.2, 16.6, 'La freccia da {mink:A}  a {mink:B}  è\n{mink:B − A = (1; 2; −1)}.'],
  [16.8, 21.8, 'Le sue componenti: 1 passo lungo {mx:x},\n2 lungo {my:y}, 1 in giù.'],
  [22.0, 26.3, 'Un punto {mink:P}  parte da {mink:A}  e cammina\nlungo la freccia.'],
  [26.4, 31.6, 'Il tempo è {mx:t}: a {mx:t = 0} è in {mink:A},\na {mx:t = 1} è in {mink:B}.'],
  [31.8, 36.4, 'Al tempo {mx:t}  il punto è {mink:A}\npiù {mx:t}  volte la freccia.'],
  [36.6, 41.0, 'A {mx:t = 2} è andato oltre {mink:B}:\nè in {mink:(3; 5; 1)}.'],
  [41.2, 45.0, 'Con {mx:t}  negativo torna indietro,\nprima di {mink:A}.'],
  [45.2, 49.0, 'Tutte le sue posizioni insieme\nformano la {v:retta}.'],
  // 2 · le equazioni
  [49.2, 55.6, 'Coordinata per coordinata:\n{mink:x = 1 + }{mx:t}{mink:, y = 1 + 2}{mx:t}{mink:, z = 3 − }{mx:t}.'],
  [55.8, 59.9, 'Sono le {v:equazioni parametriche};\n{mx:t}  si chiama {v:parametro}.'],
  [60.1, 64.8, 'Davanti a {mx:t}  ci sono 1, 2 e −1:\nil {v:vettore direzione}.'],
  [65.0, 69.8, 'I numeri da soli sono {mink:A},\nil punto da cui si parte.'],
  // chiusura
  [FINE + 2.0, DUR - 3.0, 'Un punto da cui partire e una freccia\nda seguire: ecco la retta.'],
];

// ---------- lo spazio in assonometria (la stessa negli altri video dell'argomento) ----------
// proiezione ortogonale: l'osservatore guarda da 20° fra gli assi x e y, 22° più in alto;
// x viene verso chi guarda (in basso a sinistra), y va a destra, z sale
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const OX = 470, OY = 556, S = 110;
const pr = (x, y, z) => [OX + S * (x * VR[0] + y * VR[1]), OY - S * (x * VU[0] + y * VU[1] + z * VU[2])];
const p3 = q => pr(q[0], q[1], q[2]);
const add = (a, b, k = 1) => [a[0] + k * b[0], a[1] + k * b[1], a[2] + k * b[2]];

function seg(ctx, a, b, col, w, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// freccia in 3D da a a b (punti dello spazio)
function freccia3(ctx, a, b, col, w, k = 1) {
  if (k <= 0) return;
  const A2 = p3(a), B2 = p3(add(a, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], k));
  glowStroke(ctx, [A2, B2], 1, col, w);
  const ang = Math.atan2(B2[1] - A2[1], B2[0] - A2[0]);
  arrowHead(ctx, [B2[0] + Math.cos(ang) * 8, B2[1] + Math.sin(ang) * 8], ang, col, 1.5);
}
// etichetta su un fondino del colore della scheda
function etichetta(ctx, s, x, y, size, al = 1, align = 'center') {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 20, x0 = align === 'left' ? x - 10 : align === 'right' ? x - w + 10 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 10); ctx.fill();
  drawRich(ctx, s, x, y, { size, align });
  ctx.restore();
}

// ---------- la retta ----------
const A = [1, 1, 3], V = [1, 2, -1], B = add(A, V);
const punto = t => add(A, V, t);
// il tempo del punto che cammina: da A a B, oltre fino a t = 2, poi indietro fino a t = −0,15 (lontano dall'asse z)
const TEMPO = [[22.4, 0], [25.4, 1], [36.8, 1], [38.4, 2], [41.4, 2], [43.4, -.15]];
const tP = t => kf(t, TEMPO);
const tAlto = t => kf(t, [[22.4, 0], [25.4, 1], [36.8, 1], [38.4, 2]]);   // fin dove è arrivato
const tBasso = t => kf(t, [[41.4, 0], [43.4, -.15]]);
const T0 = -.32, T1 = 2.2;   // la retta disegnata, con i due capi sfumati: non tocca mai l'asse z

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Una retta che cammina', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// gli assi grigi (i nomi colorati) e il pavimento appena accennato
const ASSI = [[4.8, 0, 0], [0, 5.6, 0], [0, 0, 3.6]];
function assi(ctx, t) {
  const k = P(t, 7.7, 8.7);
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = css(C.ink, .09); ctx.lineWidth = 1.5; ctx.beginPath();
  for (let i = 0; i <= 4; i++) { const a = pr(i, 0, 0), b = pr(i, 5, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  for (let j = 0; j <= 5; j++) { const a = pr(0, j, 0), b = pr(4, j, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  ctx.stroke();
  const o = pr(0, 0, 0);
  ASSI.forEach(e => {
    const b = p3(e);
    ctx.save(); ctx.globalAlpha *= .7;
    seg(ctx, o, b, C.ink, 3);
    const ang = Math.atan2(b[1] - o[1], b[0] - o[0]);
    arrowHead(ctx, [b[0] + Math.cos(ang) * 6, b[1] + Math.sin(ang) * 6], ang, C.ink);
    ctx.restore();
  });
  const ex = p3(ASSI[0]), ey = p3(ASSI[1]), ez = p3(ASSI[2]);
  drawRich(ctx, '{mx:x}', ex[0] - 30, ex[1] + 20, { size: 44 });
  drawRich(ctx, '{my:y}', ey[0] + 34, ey[1] + 2, { size: 44 });
  drawRich(ctx, '{mv:z}', ez[0] + 30, ez[1] - 4, { size: 44 });
  drawRich(ctx, '{mink:O}', o[0] - 30, o[1] - 24, { size: 40 });
  ctx.restore();
}
// un punto con la sua ombra sul pavimento
function ombra(ctx, q, al) {
  if (al <= 0) return;
  const a = p3(q), b = pr(q[0], q[1], 0);
  ctx.save(); ctx.globalAlpha *= al;
  dashed(ctx, a, b, C.dim, 1, .6);
  ctx.fillStyle = css(C.ink, .14); ctx.beginPath(); ctx.ellipse(b[0], b[1], 18, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// 1–2 · lo spazio: A, B, la freccia, il punto che cammina, la retta (7.5–FINE)
function sceneSpazio(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .5, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 230, 110, 860, 690, P(t, 7.5, 8.2));
  assi(ctx, t);
  const kA = P(t, 8.4, 8.8, E.back), kB = P(t, 9.6, 10.0, E.back);
  ombra(ctx, A, .6 * Math.min(1, kA)); ombra(ctx, B, .6 * Math.min(1, kB));
  // la strada già percorsa, poi la retta intera
  const kR = P(t, 45.3, 46.6);
  const lo = lerp(tBasso(t), T0, kR), hi = lerp(tAlto(t), T1, kR);
  if (t > 22.4 && hi > lo) {
    const a = p3(punto(lo)), b = p3(punto(hi));
    ctx.save(); ctx.globalAlpha *= .55 + .45 * kR;
    if (kR <= 0) glowStroke(ctx, [a, b], 1, C.y, 4);
    else {
      // la retta intera: i due capi sfumano, la retta non finisce lì
      const g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]), s = .18 * kR;
      g.addColorStop(0, css(C.y, 1 - kR)); g.addColorStop(s, css(C.y, 1)); g.addColorStop(1 - s, css(C.y, 1)); g.addColorStop(1, css(C.y, 1 - kR));
      ctx.strokeStyle = g; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    ctx.restore();
  }
  // le componenti: 1 lungo x, 2 lungo y, 1 in giù
  const kS = life(t, 17.0, 21.8, .3, .4);
  if (kS > 0) {
    const s1 = p3(add(A, [1, 0, 0])), s2 = p3(add(A, [1, 2, 0]));
    ctx.save(); ctx.globalAlpha *= kS;
    seg(ctx, p3(A), s1, C.x, 6, P(t, 17.2, 17.8)); seg(ctx, s1, s2, C.y, 6, P(t, 17.8, 18.8)); seg(ctx, s2, p3(B), C.v, 6, P(t, 18.8, 19.4));
    ctx.restore();
  }
  // la freccia da A a B
  freccia3(ctx, A, B, C.v, 7, P(t, 12.4, 13.4));
  // A e B, con il loro tempo quando Ada lo dice
  const a2 = p3(A), b2 = p3(B), kt = P(t, 26.6, 27.0);
  dot(ctx, a2, C.ink, kA, 10); dot(ctx, b2, C.ink, kB, 10);
  etichetta(ctx, '{mink:A}', a2[0] + 22, a2[1] - 34, 40, P(t, 8.6, 9.0) * (1 - kt), 'left');
  etichetta(ctx, '{mink:B}', b2[0] + 22, b2[1] - 34, 40, P(t, 9.8, 10.2) * (1 - kt), 'left');
  etichetta(ctx, '{mink:A}{dim:,  }{mx:t = 0}', a2[0] + 22, a2[1] - 34, 40, kt, 'left');
  etichetta(ctx, '{mink:B}{dim:,  }{mx:t = 1}', b2[0] + 22, b2[1] - 34, 40, kt, 'left');
  // il punto che cammina, con la sua ombra
  const kP = life(t, 22.0, 49.0, .4, .5);
  if (kP > 0) {
    const q = punto(tP(t)), q2 = p3(q);
    ombra(ctx, q, .8 * kP);
    ctx.save(); ctx.globalAlpha *= kP; dot(ctx, q2, C.y, P(t, 22.0, 22.4, E.back), 13); ctx.restore();
    etichetta(ctx, '{mx:t = 2}{mink:: (3; 5; 1)}', q2[0] - 30, q2[1] + 36, 40, life(t, 38.4, 41.3, .3, .3) * kP, 'right');
    etichetta(ctx, '{mx:t = −0,15}', q2[0] - 40, q2[1] + 14, 40, life(t, 43.4, 45.4, .3, .3) * kP, 'right');   // a sinistra dell'asse z
  }
  ctx.restore();
}

// la scheda di destra
const CX = 1485;
function riga(ctx, s, y, size, a, local) { drawRich(ctx, s, CX, y, { size, alpha: a, local }); }
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1150, y); ctx.lineTo(1820, y); ctx.stroke(); ctx.restore();
}
function scenePannello(ctx, t) {
  if (t < 8.0 || t > FINE + .3) return;
  const al = life(t, 8.1, FINE + .2, .5, .7);
  card(ctx, 1110, 115, 750, 685, al);
  ctx.save(); ctx.globalAlpha *= al;
  riga(ctx, '{mink:A(1; 1; 3)}', 172, 44, P(t, 8.6, 9.0));
  riga(ctx, '{mink:B(2; 3; 2)}', 234, 44, P(t, 9.8, 10.2));
  riga(ctx, '{mink:B − A = (}{mx:1}{mink:; }{my:2}{mink:; }{mv:−1}{mink:)}', 302, 44, 1, t - 13.6);
  separa(ctx, 346, P(t, 26.5, 26.9));
  // il tempo e la posizione (22–49): numeri a larghezza fissa
  const kc = P(t, 26.5, 26.9) * (1 - P(t, 49.0, 49.4));   // il tempo compare quando Ada lo nomina
  if (kc > 0) {
    const tq = Math.round(tP(t) * 100) / 100 || 0;
    ctx.save(); ctx.globalAlpha *= kc;
    drawRich(ctx, '{mx:t =}', 1440, 398, { size: 44, align: 'right' });
    fixedNum(ctx, fmtN(tq, 2), 1590, 398, 44, C.x);
    drawRich(ctx, '{mink:P = (}', 1170, 466, { size: 44, align: 'left' });
    fixedNum(ctx, fmtN(1 + tq, 2), 1425, 466, 44, C.ink);
    drawRich(ctx, '{mink:;}', 1440, 466, { size: 44 });
    fixedNum(ctx, fmtN(1 + 2 * tq, 2), 1580, 466, 44, C.ink);
    drawRich(ctx, '{mink:;}', 1595, 466, { size: 44 });
    fixedNum(ctx, fmtN(3 - tq, 2), 1735, 466, 44, C.ink);
    drawRich(ctx, '{mink:)}', 1752, 466, { size: 44 });
    ctx.restore();
  }
  // la regola, che poi sale sopra le equazioni
  const yF = lerp(546, 412, P(t, 49.0, 49.6));
  if (t > 31.9) riga(ctx, '{mink:P = A + }{mx:t}{mink: · }{mv:(1; 2; −1)}', yF, 46, 1, t - 32.0);
  // le equazioni parametriche (49,2–FINE)
  if (t > 49.4) {
    const EQ = ['{mink:x = 1 + }{mx:t}', '{mink:y = 1 + 2}{mx:t}', '{mink:z = 3 − }{mx:t}'];
    EQ.forEach((s, i) => drawRich(ctx, s, 1190, 522 + i * 68, { size: 48, align: 'left', local: t - 49.6 - i * .9 }));
    drawRich(ctx, '{dim:il parametro: }{mx:t}', 1300, 740, { size: 32, local: t - 56.0 });
    // le colonne: la freccia (60,3) e il punto A (65,2)
    const kv = P(t, 60.3, 60.8), ka = P(t, 65.2, 65.7);
    drawRich(ctx, '{dim:punto}', 1612, 470, { size: 30, alpha: ka });
    drawRich(ctx, '{dim:freccia}', 1762, 470, { size: 30, alpha: kv });
    ['1', '1', '3'].forEach((s, i) => drawRich(ctx, '{mink:' + s + '}', 1612, 522 + i * 68, { size: 46, alpha: P(t, 65.3 + i * .25, 65.7 + i * .25) }));
    ['1', '2', '−1'].forEach((s, i) => drawRich(ctx, '{mv:' + s + '}', 1762, 522 + i * 68, { size: 46, alpha: P(t, 60.4 + i * .25, 60.8 + i * .25) }));
  }
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Una retta nello spazio è la strada\ndi un punto che cammina lungo una freccia.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [490, 400, '{mink:x = 1 + }{mx:t}\n{mink:y = 1 + 2}{mx:t}\n{mink:z = 3 − }{mx:t}', 40],
    [960, 440, '{dim:vettore direzione}\n{mv:(1; 2; −1)}', 40],
    [1430, 400, '{mx:t = 0}{dim: in }{mink:A}\n{mx:t = 1}{dim: in }{mink:B}', 40],
  ];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - w / 2, 440, w, 200);
    drawRich(ctx, s, x, 540, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7], ['pop', 8.5, .7], ['pop', 9.7, .5],     // gli assi, A e B
    ['traccia', 12.4, 13.4], ['tono', 12.4, 13.4, [.7, .5]], ['pop', 13.7, .6],      // la freccia scende da A a B
    ['traccia', 17.2, 17.8], ['traccia', 17.8, 18.8], ['traccia', 18.8, 19.4],      // le tre componenti
    ['tono', 18.8, 19.4, [.7, .5]],
    ['pop', 22.2, .7], ['tono', 22.4, 25.4, [.7, .6, .5]], ['soffio', 26.5],         // il punto parte e arriva in B
    ['pop', 26.8, .6],                                                               // t = 0 in A, t = 1 in B
    ['pop', 32.1, .55],                                                              // P = A + t · (1; 2; −1)
    ['tono', 36.8, 38.4, [.5, .4, .3]], ['pop', 38.5, .3],                           // oltre B, fino a t = 2
    ['tono', 41.4, 43.4, [.3, .5, .7, .75]], ['pop', 43.5, .75],                    // indietro, prima di A
    ['traccia', 45.3, 46.6],                                                         // la retta intera
    ['soffio', 49.0], ['pop', 49.7, .5], ['pop', 50.6, .55], ['pop', 51.5, .6],     // le tre equazioni
    ['pop', 56.1, .4],                                                               // il parametro
    ['pop', 60.4, .7], ['pop', 60.65, .6], ['pop', 60.9, .4],                        // la freccia: 1, 2, −1
    ['pop', 65.3, .5], ['pop', 65.55, .5], ['pop', 65.8, .7],                        // il punto A: 1, 1, 3
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Una retta che cammina', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 49.0, 'un punto che cammina'], [49.0, FINE, 'le equazioni']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSpazio(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
