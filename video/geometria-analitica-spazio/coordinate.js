'use strict';
/* Un punto, tre numeri — la stanza come primo ottante: P(3; 4; 2) si raggiunge lungo x, lungo y e poi salendo;
   la distanza da O è Pitagora due volte, √29 ≈ 5,39. Argomento: geometria-analitica-spazio. */
CVIDEO.registra('geometria-analitica-spazio/coordinate', M => {
  const { W, C, E, P, life, lerp, css, mix, TITOLI, conFont, drawRich, richW, dot, glowStroke, dashed, arrowHead, card } = M;

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
  [17.0, 'felice'], [21.1, 'neutro'], [31.7, 'felice'], [36.4, 'pensa'], [39.7, 'neutro'],
  [50.6, 'felice'], [53.0, 'neutro'], [61.4, 'festa'], [65.5, 'neutro'],
  [FINE + 2.4, 'felice'], [FINE + 7.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Come si dice dove sta un punto\nin una stanza?'],
  // 1 · le coordinate
  [7.9, 12.4, 'Un angolo della stanza è l’{v:origine} {mink:O}:\nlì si incontrano tre assi.'],
  [12.5, 16.9, 'Il pavimento è il piano {mx:x}{my:y};\nl’asse {mv:z}  sale in verticale.'],
  [17.0, 21.0, 'Ecco un punto: {mink:P(3; 4; 2)}.\nTre coordinate, tre numeri.'],
  [21.1, 25.0, 'Da {mink:O}  si fanno {x:3} passi\nlungo l’asse {mx:x}…'],
  [25.1, 28.3, '…poi {y:4} parallelo all’asse {my:y}…'],
  [28.4, 31.6, '…e infine si sale di {v:2}.'],
  [31.7, 36.2, 'Tre numeri, in ordine: {mx:x}, {my:y}, {mv:z}.\nNel piano ne bastavano due.'],
  // 2 · la distanza
  [36.4, 39.6, 'Quanto dista {mink:P}  dall’origine?'],
  [39.7, 43.8, 'Sul pavimento, proprio sotto {mink:P},\nc’è il punto {mink:H(3; 4; 0)}.'],
  [43.9, 48.2, 'Sul pavimento c’è un triangolo\nrettangolo, con cateti {x:3} e {y:4}.'],
  [48.3, 52.9, 'Pitagora: {mink:OH ² = 3² + 4² = 25},\nquindi {mink:OH = 5}.'],
  [53.0, 57.4, 'Ora un triangolo in piedi:\ncateti {g:5} e {v:2}, ipotenusa {mink:OP}.'],
  [57.5, 61.3, 'Pitagora di nuovo:\n{mink:OP ² = 5² + 2² = 29}.'],
  [61.4, 65.4, 'Quindi {mink:OP = √29 ≈ }{g:5,39}.'],
  [65.5, 70.0, 'Con {mx:x}, {my:y}, {mv:z}  al posto dei numeri:\n{mink:OP = √(x² + y² + z²)}.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Tre numeri per dire dove sta un punto,\nPitagora due volte per la distanza.'],
];

// ---------- lo spazio in assonometria (la stessa nei tre video dell'argomento) ----------
// proiezione ortogonale: l'osservatore guarda da 20° fra gli assi x e y, 22° più in alto;
// x viene verso chi guarda (in basso a sinistra), y va a destra, z sale
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const OX = 480, OY = 480, S = 92;
const pr = (x, y, z) => [OX + S * (x * VR[0] + y * VR[1]), OY - S * (x * VU[0] + y * VU[1] + z * VU[2])];
const LX = 5, LY = 6, LZ = 3;                  // la stanza: 0 ≤ x ≤ 5, 0 ≤ y ≤ 6, 0 ≤ z ≤ 3
const PP = [3, 4, 2], HH = [3, 4, 0], XX = [3, 0, 0];
const COLA = () => [C.x, C.y, C.v];            // colori degli assi x, y, z

function seg(ctx, a, b, col, w, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function poli(ctx, pts, fill, stroke, w = 2) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
const p3 = q => pr(q[0], q[1], q[2]);
const add = (a, b, k = 1) => [a[0] + k * b[0], a[1] + k * b[1], a[2] + k * b[2]];
// angolo retto in 3D: quadratino nel piano delle direzioni a e b (unitarie) uscenti da V
function retto3(ctx, V, a, b, al, col, d = .32) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col || C.ink); ctx.lineWidth = 3; ctx.lineJoin = 'round';
  const q1 = p3(add(V, a, d)), q2 = p3(add(add(V, a, d), b, d)), q3 = p3(add(V, b, d));
  ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.lineTo(q3[0], q3[1]); ctx.stroke(); ctx.restore();
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

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Un punto, tre numeri', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la stanza: pavimento, due pareti, tre assi con i numeri
function stanza(ctx, t) {
  const kp = P(t, 7.6, 8.6);
  if (kp <= 0) return;
  ctx.save(); ctx.globalAlpha *= kp;
  // le due pareti in fondo (x = 0 e y = 0), appena velate
  poli(ctx, [pr(0, 0, 0), pr(0, LY, 0), pr(0, LY, LZ), pr(0, 0, LZ)], css(C.ink, .035), css(C.ink, .16), 2);
  poli(ctx, [pr(0, 0, 0), pr(LX, 0, 0), pr(LX, 0, LZ), pr(0, 0, LZ)], css(C.ink, .022), css(C.ink, .16), 2);
  // il pavimento: si accende mentre Ada dice che è il piano xy
  const hl = life(t, 12.6, 16.9, .4, .5);
  poli(ctx, [pr(0, 0, 0), pr(LX, 0, 0), pr(LX, LY, 0), pr(0, LY, 0)], css(mix(C.ink, C.x, hl), .055 + .07 * hl), css(C.ink, .22), 2);
  ctx.strokeStyle = css(C.ink, .10); ctx.lineWidth = 1.5; ctx.beginPath();
  for (let i = 1; i < LX; i++) { const a = pr(i, 0, 0), b = pr(i, LY, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  for (let j = 1; j < LY; j++) { const a = pr(0, j, 0), b = pr(LX, j, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  ctx.stroke();
  ctx.restore();
  // gli assi, ognuno col suo colore, lungo gli spigoli della stanza
  const ka = P(t, 8.2, 9.2), [cx, cy, cz] = COLA();
  if (ka <= 0) return;
  const fine = [[LX + .8, 0, 0], [0, LY + .8, 0], [0, 0, LZ + .9]];
  const wz = 3 + 2 * life(t, 14.4, 16.9, .4, .5);
  [[cx, 3], [cy, 3], [cz, wz]].forEach(([col, w], i) => {
    const a = pr(0, 0, 0), b = p3(fine[i]);
    seg(ctx, a, b, col, w, ka);
    if (ka >= 1) arrowHead(ctx, [b[0] + (b[0] - a[0]) / Math.hypot(b[0] - a[0], b[1] - a[1]) * 6, b[1] + (b[1] - a[1]) / Math.hypot(b[0] - a[0], b[1] - a[1]) * 6], Math.atan2(b[1] - a[1], b[0] - a[0]), col);
  });
  ctx.save(); ctx.globalAlpha *= P(t, 8.8, 9.4);
  const ex = pr(LX + .8, 0, 0), ey = pr(0, LY + .8, 0), ez = pr(0, 0, LZ + .9);
  drawRich(ctx, '{mx:x}', ex[0] - 30, ex[1] + 18, { size: 44 });
  drawRich(ctx, '{my:y}', ey[0] + 34, ey[1] + 2, { size: 44 });
  drawRich(ctx, '{mv:z}', ez[0] + 30, ez[1] - 4, { size: 44 });
  const o = pr(0, 0, 0);
  drawRich(ctx, '{mink:O}', o[0] - 32, o[1] - 26, { size: 40 });
  // i numeri: fuori dalla stanza accanto a x, davanti al pavimento per y (sull'asse y passa OP), a sinistra di z
  for (let i = 1; i <= LX; i++) { const q = pr(i, -.42, 0); drawRich(ctx, '{x:' + i + '}', q[0] - 4, q[1], { size: 30 }); }
  for (let j = 1; j <= LY; j++) { const q = pr(LX + .5, j, 0); drawRich(ctx, '{y:' + j + '}', q[0], q[1], { size: 30 }); }
  for (let k = 1; k <= LZ; k++) { const q = pr(0, 0, k); drawRich(ctx, '{v:' + k + '}', q[0] - 24, q[1], { size: 30 }); }
  ctx.restore();
}

// 1–2 · la stanza, il punto, il cammino, i due triangoli (7.5–FINE)
function sceneStanza(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .5, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 230, 110, 890, 690, P(t, 7.5, 8.2));
  stanza(ctx, t);
  const o = pr(0, 0, 0), p = p3(PP), h = p3(HH), xx = p3(XX);
  // i due triangoli, sotto a tutto il resto
  const kt1 = P(t, 44.1, 44.7);
  if (kt1 > 0) { ctx.save(); ctx.globalAlpha *= kt1; poli(ctx, [o, xx, h], css(C.y, .16)); ctx.restore(); }
  const kt2 = P(t, 53.2, 53.8);
  if (kt2 > 0) { ctx.save(); ctx.globalAlpha *= kt2; poli(ctx, [o, h, p], css(C.v, .13)); ctx.restore(); }
  // l'ombra di P sul pavimento: c'è da quando compare P
  const kP = P(t, 17.2, 17.6, E.back);
  if (kP > 0) {
    ctx.save(); ctx.globalAlpha *= Math.min(1, kP); ctx.fillStyle = css(C.ink, .16);
    ctx.beginPath(); ctx.ellipse(h[0], h[1], 24, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  // il cammino: 3 lungo x, 4 parallelo a y, 2 in su
  seg(ctx, o, xx, C.x, 7, P(t, 21.3, 22.6));
  seg(ctx, xx, h, C.y, 7, P(t, 25.3, 26.6));
  seg(ctx, h, p, C.v, 7, P(t, 28.6, 29.6));
  const q3 = pr(2, .75, 0), q4 = pr(4.3, 2, 0), q2 = pr(3, 4, .45);   // il «2» sotto l'asse y, che passa a metà di HP
  etichetta(ctx, '{x:3}', q3[0], q3[1], 44, P(t, 22.3, 22.8));
  etichetta(ctx, '{y:4}', q4[0], q4[1], 44, P(t, 26.3, 26.8));
  etichetta(ctx, '{v:2}', q2[0] + 30, q2[1], 44, P(t, 29.3, 29.8), 'left');
  // OH: l'ipotenusa sul pavimento, verde quando se ne sa la lunghezza
  const kOH = P(t, 44.2, 44.9);
  if (kOH > 0) glowStroke(ctx, [o, h], kOH, mix(C.ink, C.g, P(t, 50.6, 51.2)), 4);
  retto3(ctx, XX, [-1, 0, 0], [0, 1, 0], P(t, 44.4, 44.8));
  retto3(ctx, HH, [-.6, -.8, 0], [0, 0, 1], P(t, 53.4, 53.8));
  const q5 = pr(1.2, 2.6, 0);
  etichetta(ctx, '{g:5}', q5[0], q5[1], 44, P(t, 50.6, 51.0));
  // OP: prima la domanda (tratteggio), poi la risposta (verde)
  const kd = life(t, 36.6, 61.7, .5, .3);
  if (kd > 0) dashed(ctx, o, p, C.ink, P(t, 36.6, 37.3), kd);
  const kv = P(t, 61.4, 62.0);
  if (kv > 0) glowStroke(ctx, [o, p], kv, C.g, 5);
  const qm = [(o[0] + p[0]) / 2, (o[1] + p[1]) / 2 - 44];
  drawRich(ctx, '{v:?}', qm[0], qm[1], { size: 56, weight: 600, alpha: life(t, 37.0, 61.6, .4, .3) });
  etichetta(ctx, '{mink:√29 ≈ }{g:5,39}', qm[0] + 8, qm[1] - 4, 40, P(t, 61.6, 62.1));
  // i punti, sopra ai segmenti
  if (kP > 0) {
    dot(ctx, p, C.ink, kP, 11);
    drawRich(ctx, '{mink:P(3; 4; 2)}', p[0] + 28, p[1] - 30, { size: 40, align: 'left', local: t - 17.4 });
  }
  dot(ctx, o, C.ink, P(t, 8.4, 8.8, E.back), 9);
  const kH = P(t, 40.8, 41.2, E.back);
  if (kH > 0) {
    dot(ctx, h, C.ink, kH, 10);
    etichetta(ctx, '{mink:H(3; 4; 0)}', h[0] + 30, h[1] + 30, 40, Math.min(1, kH), 'left');
  }
  ctx.restore();
}

// le schede a destra: le coordinate, poi i conti della distanza
const PEZZI = ['{mink:P(}', '{mx:3}', '{mink:; }', '{my:4}', '{mink:; }', '{mv:2}', '{mink:)}'];
const LETTERE = [null, '{mx:x}', null, '{my:y}', null, '{mv:z}', null];
const QUANDO = [21.4, 22.6, 22.6, 26.6, 26.6, 29.6, 29.6];
function scenePannelli(ctx, t) {
  if (t < 21.0 || t > FINE + .3) return;
  const fade = 1 - P(t, FINE - .5, FINE + .2);
  const a1 = P(t, 21.1, 21.6) * fade;
  if (a1 > 0) {
    card(ctx, 1140, 115, 680, 205, a1);
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'le coordinate', 1480, 160, { size: 38, weight: 600 }));
    const ws = PEZZI.map(s => richW(ctx, s, 54)), tot = ws.reduce((a, b) => a + b, 0);
    let x = 1480 - tot / 2;
    PEZZI.forEach((s, i) => {
      const k = P(t, QUANDO[i], QUANDO[i] + .4);
      drawRich(ctx, s, x, 240, { size: 54, align: 'left', alpha: k });
      if (LETTERE[i]) drawRich(ctx, LETTERE[i], x + ws[i] / 2, 290, { size: 32, alpha: P(t, 31.9 + i * .1, 32.4 + i * .1) });
      x += ws[i];
    });
    ctx.restore();
  }
  const a2 = P(t, 48.3, 48.8) * fade;
  if (a2 <= 0) return;
  card(ctx, 1140, 340, 680, 460, a2);
  ctx.save(); ctx.globalAlpha *= a2;
  conFont(TITOLI, () => drawRich(ctx, 'la distanza', 1480, 384, { size: 38, weight: 600 }));
  drawRich(ctx, '{mink:OH ² = }{mx:3}{mink:² + }{my:4}{mink:² = 25}', 1480, 442, { size: 44, local: t - 48.6 });
  drawRich(ctx, '{mink:OH = }{mg:5}', 1480, 498, { size: 44, local: t - 50.6 });
  drawRich(ctx, '{mink:OP ² = }{mg:5}{mink:² + }{mv:2}{mink:² = 29}', 1480, 554, { size: 44, local: t - 57.7 });
  drawRich(ctx, '{mink:OP = √29 ≈ }{mg:5,39}', 1480, 610, { size: 44, local: t - 61.5 });
  const ks = P(t, 65.2, 65.6);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1180, 646); ctx.lineTo(1780, 646); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, '{mink:OP = √(}{mx:x}{mink:² + }{my:y}{mink:² + }{mv:z}{mink:²)}', 1480, 694, { size: 44, local: t - 65.7 });
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Nello spazio un punto ha tre coordinate,\ne la distanza è Pitagora due volte.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [490, 430, '{mink:P(}{mx:x}{mink:; }{my:y}{mink:; }{mv:z}{mink:)}', 44],
    [960, 460, '{mink:OP = √(}{mx:x}{mink:² + }{my:y}{mink:² + }{mv:z}{mink:²)}', 38],
    [1430, 430, '{mink:√29 ≈ }{mg:5,39}', 44],
  ];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 8.2, 9.2], ['pop', 8.5, .4],                         // la stanza, gli assi, O
    ['tono', 14.4, 15.4, [.2, .8]],                                                   // l'asse z che sale
    ['pop', 17.3, .6],                                                                // P
    ['soffio', 21.1], ['traccia', 21.3, 22.6], ['pop', 22.6, .3],                     // 3 lungo x
    ['traccia', 25.3, 26.6], ['pop', 26.6, .4],                                       // 4 lungo y
    ['traccia', 28.6, 29.6], ['tono', 28.6, 29.6, [.3, .7]], ['pop', 29.6, .7],       // e su di 2
    ['pop', 32.0, .5],                                                                // x, y, z sotto i numeri
    ['traccia', 36.6, 37.3], ['pop', 37.1, .6],                                       // OP, il punto di domanda
    ['pop', 40.9, .2],                                                                // H sul pavimento
    ['soffio', 44.1], ['traccia', 44.2, 44.9], ['pop', 44.5, .35],                    // il triangolo sul pavimento
    ['soffio', 48.3], ['pop', 48.7, .45], ['ding', 50.6],                             // OH² = 25, OH = 5
    ['soffio', 53.2], ['pop', 53.5, .5],                                              // il triangolo in piedi
    ['pop', 57.8, .55], ['pop', 61.6, .7],                                            // OP² = 29, OP ≈ 5,39
    ['traccia', 61.4, 62.0],
    ['pop', 65.8, .6],                                                                 // la formula generale
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Un punto, tre numeri', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 36.2, 'tre coordinate'], [36.2, FINE, 'la distanza']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneStanza(ctx, t); scenePannelli(ctx, t); sceneFine(ctx, t); },
  };
});
