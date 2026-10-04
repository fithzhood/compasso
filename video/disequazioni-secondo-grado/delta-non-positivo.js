'use strict';
/* Quando Δ non è positivo — una parabola con a > 0 che non scende mai sotto l'asse x: con Δ < 0 (x² + 2x + 5)
   il trinomio è sempre positivo, con Δ = 0 ((x − 3)²) vale 0 in un punto solo; da qui sempre vera, mai vera
   (S = ∅), tutti tranne un punto, solo un punto. Argomento: disequazioni-secondo-grado. */
CVIDEO.registra('disequazioni-secondo-grado/delta-non-positivo', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, richW, txt,
    dot, hole, glowStroke, arrowHead, card } = M;
  // il simbolo dell'insieme vuoto è quello tondo di KaTeX_AMS (\varnothing del sito)
  if (typeof document !== 'undefined' && document.fonts) document.fonts.load('100px KaTeX_AMS').catch(() => {});

const FINE = 86.0, DURATA = 100.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [18.5, 'sorpreso'], [20.6, 'neutro'],
  [28.3, 'felice'], [30.4, 'neutro'], [32.5, 'felice'], [34.6, 'neutro'], [37.9, 'sorpreso'], [40.0, 'neutro'],
  [49.4, 'sorpreso'], [51.5, 'neutro'], [60.0, 'pensa'], [62.1, 'neutro'], [65.4, 'felice'], [67.5, 'neutro'],
  [75.7, 'pensa'], [77.8, 'neutro'], [80.9, 'sorpreso'], [83.0, 'neutro'],
  [FINE + 1.0, 'felice'], [92.4, 'pensa'], [94.6, 'occhiolino'],
];
const T1 = '{mx:x}{mink:² + 2}{mx:x}{mink: + 5}', T2 = '{mx:x}{mink:² − 6}{mx:x}{mink: + 9}', Q = '{mink:(}{mx:x}{mink: − 3)²}';
// una frase per ogni cosa che succede, e solo mentre succede; i movimenti stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Se una parabola non scende\nmai sotto l’asse {mx:x}, allora?'],
  // 1 · Δ negativo
  [7.9, 13.1, 'Prendo {mink:y = }' + T1 + ':\nin {mink:a}{mx:x}{mink:² + b}{mx:x}{mink: + c} è {mink:a = 1}, {mink:b = 2}, {mink:c = 5}.'],
  [13.3, 18.3, 'Il {v:discriminante} è {mink:Δ = b² − 4ac}:\nqui {mink:4 − 20 = −16}, negativo.'],
  [18.5, 22.7, 'Con {mink:Δ} negativo la parabola\n{g:non tocca} mai l’asse {mx:x}.'],
  [22.9, 28.1, '{mink:a} è positivo: è rivolta verso l’alto,\ncol punto più basso in {g:(−1; 4)}.'],
  [28.3, 32.3, 'Quindi il trinomio è\n{g:sempre positivo}.'],
  [32.5, 37.7, T1 + '{mink: > 0} è {g:sempre vera}:\nvanno bene {g:tutti i numeri reali}.'],
  [37.9, 42.6, T1 + '{mink: < 0} invece non è {r:mai vera}:\nnessun numero va bene.'],
  [42.8, 47.3, 'L’insieme delle soluzioni {mink:S}\nè {r:vuoto}: si scrive così.'],
  // 2 · Δ uguale a zero
  [49.4, 54.4, 'Ora prendo {mink:y = }' + T2 + ':\ntocca l’asse in un punto solo, {v:3}.'],
  [54.6, 59.8, 'Qui {mink:Δ = 36 − 36 = 0}, e infatti\nè un quadrato: ' + Q + '.'],
  [60.0, 65.2, 'Un quadrato non è mai negativo,\ne vale {g:0} solo in {mx:x}{mink: = 3}.'],
  [65.4, 70.0, 'Con {mink:≥}, «maggiore o uguale», vale\nper {g:tutti i numeri reali}.'],
  [70.2, 75.5, 'Con {mink:>}, in 3 vale 0 e {mink:0 > 0} è falso:\ntutti {r:tranne} {mx:x}{mink: = 3}, pallino {v:vuoto}.'],
  [75.7, 80.7, 'Con {mink:≤}, «minore o uguale», solo\ndove vale 0: {g:solo} {mx:x}{mink: = 3}.'],
  [80.9, 85.7, Q + '{mink: < 0} non è {r:mai} vera:\nl’insieme {mink:S} è di nuovo vuoto.'],
  // chiusura
  [87.4, 92.2, 'Con {mink:Δ ≤ 0} decide il {v:verso}:\nsempre, mai, tutti tranne 3, solo 3.'],
  [92.4, 97.2, 'Con {mink:a} negativo è tutto capovolto:\nil trinomio ha il {v:segno di} {mink:a}.'],
];

// il piano: x da −4 a 6, y da −1,6 a 16,4; la y in scala più stretta, la griglia orizzontale ogni 2
const OX = 482, OY = 710, UX = 68, UY = 34, X0 = -4, X1 = 6, Y0 = -1.6, Y1 = 16.4;
const S = (x, y) => [OX + x * UX, OY - y * UY];
const CARD = [150, 110, 810, 690];
// la parabola y = (x − h)² + k: prima x² + 2x + 5 = (x + 1)² + 4, poi scivola fino a x² − 6x + 9 = (x − 3)²
const TM0 = 47.5, TM1 = 49.3;
const hT = t => kf(t, [[TM0, -1], [TM1, 3]]), kT = t => kf(t, [[TM0, 4], [TM1, 0]]);
function curva(h, k) { const p = []; for (let i = 0; i <= 240; i++) { const x = lerp(X0 - .4, X1 + .4, i / 240); p.push(S(x, Math.min((x - h) ** 2 + k, 18))); } return p; }
function clipCard(ctx) { ctx.beginPath(); ctx.rect(CARD[0] + 8, CARD[1] + 8, CARD[2] - 16, CARD[3] - 16); ctx.clip(); }
// la curva si ferma dove finiscono gli assi, a sinistra e a destra
function clipPiano(ctx) { const a = S(X0 - .1, 0)[0], b = S(X1 + .15, 0)[0]; ctx.beginPath(); ctx.rect(a, CARD[1] + 8, b - a, CARD[3] - 16); ctx.clip(); }
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = X0; i <= X1; i++) { if (!i) continue; const x = OX + i * UX; ctx.beginPath(); ctx.moveTo(x, OY - Y1 * UY * k); ctx.lineTo(x, OY - Y0 * UY * k); ctx.stroke(); }
  for (let j = 2; j <= 16; j += 2) { const y = OY - j * UY; ctx.beginPath(); ctx.moveTo(OX + X0 * UX * k, y); ctx.lineTo(OX + X1 * UX * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(OX + (X0 - .1) * UX * k, OY); ctx.lineTo(OX + (X1 + .15) * UX * k, OY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(OX, OY - (Y0 - .1) * UY * k); ctx.lineTo(OX, OY - (Y1 + .2) * UY * k); ctx.stroke();
  arrowHead(ctx, [OX + (X1 + .15) * UX * k + 6, OY], 0, C.ink);
  arrowHead(ctx, [OX, OY - (Y1 + .2) * UY * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', OX + (X1 + .15) * UX + 38, OY, { size: 44 });
  drawRich(ctx, '{my:y}', OX + 30, OY - (Y1 + .2) * UY - 8, { size: 44 });
  ctx.restore();
}
const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
// numero pieno su un fondino del colore della scheda
function numero(ctx, s, x, y, al, col = C.dim, size = 29, weight = 500) {
  if (al <= 0) return;
  const w = size * .62 * Array.from(s).length + 12, h = size + 6;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(x - w / 2, y - h / 2, w, h); ctx.restore();
  txt(ctx, s, x, y, { size, weight, color: col, alpha: al });
}
// l'area fra la curva e l'asse
function area(ctx, h, k, col, al) {
  if (al <= 0) return;
  ctx.save(); clipCard(ctx); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .15);
  ctx.beginPath(); ctx.moveTo(...S(X0 - .1, 0));
  for (let i = 0; i <= 160; i++) { const x = lerp(X0 - .1, X1 + .15, i / 160); ctx.lineTo(...S(x, Math.min((x - h) ** 2 + k, 18))); }
  ctx.lineTo(...S(X1 + .15, 0)); ctx.closePath(); ctx.fill(); ctx.restore();
}
// «… S = ∅» col simbolo tondo del sito (\varnothing, nel font KaTeX_AMS); align 'right' o 'center'
function conVuoto(ctx, prima, x, y, size, col, al = 1, align = 'center') {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const f = `${Math.round(size * 1.12)}px KaTeX_AMS, "Cambria Math", serif`;
  ctx.font = f; const w2 = ctx.measureText('∅').width, w1 = richW(ctx, prima, size);
  const x0 = align === 'right' ? x - w1 - w2 : x - (w1 + w2) / 2;
  drawRich(ctx, prima, x0, y, { size, align: 'left' });
  ctx.font = f; ctx.fillStyle = css(col); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText('∅', x0 + w1, y);
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quando {mink:Δ} non è positivo', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano con la parabola (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const A = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const h = hT(t), k = kT(t), ka = P(t, 7.7, 8.7);
  // tutta sopra l'asse: area e curva verdi (prima con Δ < 0, poi con Δ = 0)
  const kg = Math.max(life(t, 28.3, TM0, .5, .4), P(t, 60.0, 60.5));
  area(ctx, h, k, C.g, kg);
  assi(ctx, ka);
  ctx.save(); clipPiano(ctx);
  const pts = curva(h, k);
  glowStroke(ctx, pts, P(t, 8.4, 9.9), C.y, 5);
  if (kg > 0) { ctx.save(); ctx.globalAlpha *= kg; glowStroke(ctx, pts, 1, C.g, 6); ctx.restore(); }
  ctx.restore();
  // i numeri dell'asse x, pieni sul fondino; il 3 diventa grande quando la parabola lo tocca
  const kn = P(ka, .6, 1), k3 = P(t, 49.5, 50.0);
  for (let i = X0; i <= X1; i++) if (i) numero(ctx, lab(i), OX + i * UX, OY + 32, kn * (i === 3 ? 1 - k3 : 1));
  numero(ctx, '3', S(3, 0)[0], OY + 36, k3, C.v, 44, 600);
  // il vertice (−1; 4), sotto la curva e a sinistra dell'asse y
  const kv = life(t, 22.9, TM0 - .3, .4, .4);
  if (kv > 0) {
    dot(ctx, S(-1, 4), C.g, P(t, 22.9, 23.3, E.back) * kv, 10);
    drawRich(ctx, '{g:(−1; 4)}', S(-1, 4)[0] - 16, S(-1, 4)[1] + 46, { size: 40, alpha: kv });
  }
  // il punto in cui tocca l'asse, (3; 0); mentre Ada dice «vale 0 solo in 3» ha un alone
  const kt = P(t, 49.5, 49.9, E.back);
  if (kt > 0) {
    const al = life(t, 60.0, 65.2, .3, .3);
    if (al > 0) { ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.v, .16); ctx.beginPath(); ctx.arc(...S(3, 0), 26, 0, 2 * Math.PI); ctx.fill(); ctx.restore(); }
    dot(ctx, S(3, 0), C.v, kt, 10);
  }
  ctx.restore();
}

// la scheda a destra: i conti, le disequazioni con le risposte, la retta delle soluzioni
const PX = 1000, PW = 850, PC = PX + PW / 2;
const LY = 700, LX = v => PC + (v - 1) * 68;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PX + 40, y); ctx.lineTo(PX + PW - 40, y); ctx.stroke(); ctx.restore();
}
function sfondo(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .13);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
// una disequazione a sinistra, la sua risposta a destra; evidenziata mentre Ada ne parla
function riga(ctx, dis, risp, y, al, kr, hl) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  sfondo(ctx, PX + 28, y - 30, PW - 56, 60, C.v, hl);
  drawRich(ctx, dis, PX + 48, y, { size: 40, align: 'left' });
  if (typeof risp === 'function') risp(kr); else drawRich(ctx, risp, PX + PW - 48, y, { size: 34, align: 'right', alpha: kr });
  ctx.restore();
}
function scenePannello(ctx, t) {
  const pa = life(t, 8.2, FINE + .2, .5, .8);
  if (pa <= 0) return;
  card(ctx, PX, 110, PW, 690, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  // 1 · Δ negativo
  const a1 = 1 - P(t, 47.4, 47.9);
  ctx.save(); ctx.globalAlpha *= a1;
  drawRich(ctx, '{mink:y = }' + T1, PC, 172, { size: 52, local: t - 8.4 });
  drawRich(ctx, '{mink:a = 1,    b = 2,    c = 5}', PC, 244, { size: 42, alpha: P(t, 10.0, 10.5) });
  drawRich(ctx, '{mink:Δ = b² − 4ac = 4 − 20 = }{mr:−16}', PC, 314, { size: 44, alpha: P(t, 13.3, 13.8) });
  // il punto più basso si legge qui: un quadrato più 4 vale almeno 4, e vale 4 in x = −1
  drawRich(ctx, T1 + '{mink: = (}{mx:x}{mink: + 1)² + }{mg:4}', PC, 384, { size: 44, alpha: P(t, 22.9, 23.4) });
  separa(ctx, 434, P(t, 32.5, 33.0));
  riga(ctx, T1 + '{mink: > 0}', '{g:tutti i numeri reali}', 492, P(t, 32.5, 33.0), 1, life(t, 32.5, 37.7, .3, .3));
  riga(ctx, T1 + '{mink: < 0}', kr => {
    drawRich(ctx, '{r:nessuna}', PX + PW - 48, 564, { size: 34, align: 'right', alpha: kr * (1 - P(t, 42.8, 43.1)) });
    conVuoto(ctx, '{r:nessuna:} {mink:S = }', PX + PW - 48, 564, 34, C.ink, kr * P(t, 43.0, 43.4), 'right');
  }, 564, P(t, 37.9, 38.4), 1, Math.max(life(t, 37.9, 42.6, .3, .3), life(t, 42.8, 47.3, .3, .3)));
  ctx.restore();
  // 2 · Δ uguale a zero
  drawRich(ctx, '{mink:y = }' + T2, PC, 172, { size: 52, alpha: P(t, 49.4, 49.9) });
  drawRich(ctx, '{mink:Δ = 36 − 36 = }{mg:0}', PC, 244, { size: 44, alpha: P(t, 54.6, 55.1) });
  drawRich(ctx, T2 + '{mink: = }' + Q, PC, 314, { size: 44, alpha: P(t, 55.4, 55.9) });
  separa(ctx, 364, P(t, 65.4, 65.9));
  const R2 = [
    [65.4, 70.0, '{mink: ≥ 0}', '{g:tutti i numeri reali}'],
    [70.2, 75.5, '{mink: > 0}', 'tutti {r:tranne} {mx:x}{mink: = 3}'],
    [75.7, 80.7, '{mink: ≤ 0}', '{g:solo} {mx:x}{mink: = 3}'],
    [80.9, 85.7, '{mink: < 0}', null],
  ];
  R2.forEach(([a, b, segno, risp], i) => {
    const y = 420 + i * 62;
    riga(ctx, Q + segno, risp || (kr => conVuoto(ctx, '{r:nessuna:} {mink:S = }', PX + PW - 48, y, 34, C.ink, kr, 'right')),
      y, P(t, a, a + .5), 1, life(t, a, b, .3, .3));
  });
  // la retta delle soluzioni
  const kl = P(t, 32.5, 33.0);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(LX(-4.6), LY); ctx.lineTo(LX(6.6), LY); ctx.stroke();
    arrowHead(ctx, [LX(6.6) + 12, LY], 0, C.ink);
    ctx.lineWidth = 2.5;
    for (let i = -4; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(LX(i), LY - 9); ctx.lineTo(LX(i), LY + 9); ctx.stroke(); }
    ctx.restore();
  }
  numero(ctx, '3', LX(3), LY + 46, P(t, 65.4, 65.9), C.v, 44, 600);
  // tutta la retta: con Δ < 0 e > (32,6–37,9); con (x − 3)² ≥ 0 e > 0 (65,5–75,7)
  const kt = Math.max(P(t, 32.6, 33.6) * (1 - P(t, 37.9, 38.3)), P(t, 65.5, 66.5) * (1 - P(t, 75.7, 76.1)));
  if (kt > 0) {
    ctx.save(); ctx.globalAlpha *= Math.min(1, kt * 3);
    const e1 = glowStroke(ctx, [[PC, LY], [LX(-4.3), LY]], kt, C.v, 8), e2 = glowStroke(ctx, [[PC, LY], [LX(6.3), LY]], kt, C.v, 8);
    if (e1) arrowHead(ctx, e1[0], Math.PI, C.v, 1.3);
    if (e2) arrowHead(ctx, e2[0], 0, C.v, 1.3);
    ctx.restore();
  }
  // il 3: escluso con >, unico con ≤
  hole(ctx, [LX(3), LY], C.v, P(t, 70.3, 70.7, E.back) * (1 - P(t, 75.7, 76.0)), 13);
  dot(ctx, [LX(3), LY], C.v, P(t, 75.8, 76.2, E.back) * (1 - P(t, 80.9, 81.2)), 13);
  ctx.restore();
}

// chiusura (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Se la parabola non scende sotto l’asse,\nil trinomio non è {g:mai negativo}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, '{mink:Δ < 0}: sempre\nil {v:segno di} {mink:a}'], [960, '{mink:Δ = 0}:\n{g:zero} in un punto solo'], [1450, null]];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 230, 445, 460, 130);
    if (s) drawRich(ctx, s, x, 512, { size: 36, weight: 400, lh: 1.3 });
    else {
      drawRich(ctx, Q + '{mink: < 0}:', x, 489, { size: 36, weight: 400 });
      conVuoto(ctx, '{r:mai vera}, {mink:S = }', x, 536, 36, C.ink);
    }
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Quando Δ non è positivo', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 47.5, '{mink:Δ} negativo'], [47.5, FINE, '{mink:Δ} uguale a zero']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
