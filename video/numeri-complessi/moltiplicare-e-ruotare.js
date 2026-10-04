'use strict';
/* Moltiplicare è ruotare — nel piano di Gauss il prodotto ha per modulo il prodotto dei moduli e per argomento
   la somma degli argomenti: 2i · (1 + i) = −2 + 2i, cioè 2 · √2 = 2√2 e 90° + 45° = 135°. Argomento: numeri-complessi. */
CVIDEO.registra('numeri-complessi/moltiplicare-e-ruotare', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 89.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [44.7, 'sorpreso'], [46.8, 'neutro'],
  [55.7, 'sorpreso'], [57.8, 'felice'], [60.7, 'festa'], [63.0, 'neutro'], [72.8, 'festa'], [75.0, 'neutro'],
  [84.7, 'felice'], [86.9, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla di uno stato, niente si muove
const FUMETTI = [
  [2.0, 6.4, 'Che cosa fa una moltiplicazione\nai punti del piano?'],
  // 1 · modulo e argomento
  [7.9, 12.5, 'Ecco il piano di Gauss: l\'asse\nreale {v:Re} e l\'asse immaginario {v:Im}.'],
  [12.6, 17.1, 'Il numero {mink:a + bi} è il punto {mink:(a; b)}:\n{mx:z₁}{mink: = 2i} è il punto {mink:(0; 2)}.'],
  [17.2, 21.3, 'Il {v:modulo} {mx:|z₁|} è la distanza\ndall\'origine: qui {mx:|z₁|}{mink: = 2}.'],
  [21.4, 25.65, 'L\'{v:argomento} {mink:θ} è l\'angolo dal semiasse\nreale positivo, in senso antiorario.'],
  [25.7, 29.0, 'Per {mx:z₁} è un angolo retto:\n{mx:θ₁}{ink: = 90°}.'],
  // 2 · il prodotto
  [29.2, 32.8, 'Un secondo numero: {my:z₂}{mink: = 1 + i},\nil punto {mink:(1; 1)}.'],
  [32.9, 36.6, 'Con Pitagora: radice di {mink:1² + 1²},\ncioè {my:|z₂|}{mink: = √2}.'],
  [36.7, 40.2, 'È sulla bisettrice del primo\nquadrante: {my:θ₂}{ink: = 45°}.'],
  [40.3, 44.6, 'Ora li moltiplico come due binomi,\nricordando che {mink:i² = −1}.'],
  [44.7, 48.2, 'Il prodotto è {mg:−2 + 2i}:\nil punto {mink:(−2; 2)}.'],
  [48.3, 51.8, 'Modulo: radice di {mink:4 + 4},\ncioè {mg:√8 = 2√2}.'],
  [51.9, 55.6, 'Sta sulla bisettrice del secondo\nquadrante: argomento {g:135°}.'],
  [55.7, 59.4, 'Confronto: {mx:2}{mink: · }{my:√2}{mink: = }{mg:2√2}.\nI moduli si {g:moltiplicano}!'],
  [60.7, 64.6, 'E {x:90°}{ink: + }{y:45°}{ink: = }{g:135°}:\ngli argomenti si {g:sommano}!'],
  // 3 · girare e allungare
  [64.7, 68.6, 'Rivediamolo con un movimento:\n{mx:z₁} gira di {y:45°}…'],
  [68.7, 72.7, '…poi si allunga di {my:√2} volte:\nda {mx:2} a {mg:2√2}.'],
  [72.8, 76.3, 'Arriva proprio su {mg:−2 + 2i}:\nil prodotto {mx:z₁}{mink: · }{my:z₂}.'],
  // 4 · per i
  [76.6, 80.6, '{mv:i} è il punto {mink:(0; 1)}:\nmodulo 1, argomento 90°.'],
  [80.7, 84.6, 'Moltiplico {mg:−2 + 2i} per {mv:i}:\ngira di 90°, senza allungarsi.'],
  [84.7, 88.8, 'Arriva in {mv:−2 − 2i}: argomento\n{ink:135° + 90° = 225°}, modulo uguale.'],
  // chiusura
  [FINE + 1.0, FINE + 7.7, 'Per questo moltiplicare un numero\nvuol dire anche farlo {g:ruotare}.'],
];

// il piano di Gauss: stessa unità sui due assi, così gli angoli si vedono giusti
const O = [640, 480], U = 112;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const pol = (r, gradi) => S(r * Math.cos(gradi * Math.PI / 180), r * Math.sin(gradi * Math.PI / 180));
const CARD = [250, 110, 820, 690];
const R2 = Math.SQRT2;
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -2; i <= 2; i++) if (i) {
    ctx.beginPath(); ctx.moveTo(...S(i, 2.6 * k)); ctx.lineTo(...S(i, -2.4 * k)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(...S(-2.6 * k, i)); ctx.lineTo(...S(2.6 * k, i)); ctx.stroke();
  }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S(-2.7 * k, 0)); ctx.lineTo(...S(2.85 * k, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S(0, -2.5 * k)); ctx.lineTo(...S(0, 2.85 * k)); ctx.stroke();
  arrowHead(ctx, [S(2.85 * k, 0)[0] + 6, O[1]], 0, C.ink);
  arrowHead(ctx, [O[0], S(0, 2.85 * k)[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  txt(ctx, 'Re', S(2.85, 0)[0] + 40, O[1], { size: 36, color: C.dim });
  txt(ctx, 'Im', O[0] + 22, S(0, 2.85)[1] - 4, { size: 36, color: C.dim, align: 'left' });
  ctx.restore();
}
// i numeri degli assi, pieni su un fondino di carta: si disegnano sopra i vettori
function numeri(ctx, al, fondo = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
  const rett = (x, y, w, h) => { if (fondo <= 0) return; ctx.save(); ctx.globalAlpha *= fondo; ctx.fillRect(x, y, w, h); ctx.restore(); };
  for (let i = -2; i <= 2; i++) if (i) {
    const s = lab(i), w = 17 * s.length + 14, p = S(i, 0);
    rett(p[0] - w / 2, p[1] + 16, w, 32); txt(ctx, s, p[0], p[1] + 32, { size: 29, color: C.dim });
    const q = S(0, i);
    rett(q[0] - 18 - w, q[1] - 16, w, 32); txt(ctx, s, q[0] - 20, q[1], { size: 29, color: C.dim, align: 'right' });
  }
  ctx.restore();
}
// vettore dall'origine, con il punto in cima
function vettore(ctx, p, col, al, w = 6) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; glowStroke(ctx, [O, p], 1, col, w); ctx.restore();
  ctx.save(); ctx.globalAlpha *= al; dot(ctx, p, col, 1, 12); ctx.restore();
}
// arco dell'argomento, da a0 ad a1 gradi, raggio r
function arco(ctx, a0, a1, r, col, al, freccia = false) {
  if (al <= 0 || Math.abs(a1 - a0) < .5) return;
  const A0 = a0 * Math.PI / 180, A1 = a1 * Math.PI / 180;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(O[0], O[1], r * U, -A0, -A1, a1 > a0); ctx.stroke();
  if (freccia) arrowHead(ctx, pol(r, a1), -A1 - Math.PI / 2, col, .9);
  ctx.restore();
}
function etichetta(ctx, s, p, al, size = 44) {
  if (al <= 0) return;
  const q = S(...p);
  drawRich(ctx, s, q[0], q[1], { size, alpha: al });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Moltiplicare è ruotare', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano: z₁, z₂, il prodotto; poi il prodotto rifatto come giro + allungamento; poi il giro di i
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  const via = 1 - P(t, 76.0, 76.5);            // z₁, z₂ e gli archi lasciano il posto a i
  const archi = 1 - P(t, 64.5, 65.0);
  // gli argomenti
  arco(ctx, 0, 90 * P(t, 21.8, 23.0), .45, C.x, archi);
  arco(ctx, 0, 45 * P(t, 36.9, 37.6), .62, C.y, archi);
  arco(ctx, 0, 135 * P(t, 52.1, 53.0), .8, C.g, archi);
  // la copia dell'arco di z₂ va a mettersi in coda a quello di z₁: 90° + 45°
  const kc = P(t, 59.5, 60.5), cc = life(t, 59.5, 64.6, .2, .4);
  arco(ctx, 90 * kc, 90 * kc + 45, lerp(.62, .45, kc), C.y, cc);
  // i triangoli di Pitagora
  const l2 = life(t, 33.0, 36.6, .3, .3);
  if (l2 > 0) { dashed(ctx, O, S(1, 0), C.y, P(t, 33.0, 33.5), l2); dashed(ctx, S(1, 0), S(1, 1), C.y, P(t, 33.4, 33.9), l2); }
  const lp = life(t, 48.4, 51.8, .3, .3);
  if (lp > 0) { dashed(ctx, O, S(-2, 0), C.g, P(t, 48.4, 48.9), lp); dashed(ctx, S(-2, 0), S(-2, 2), C.g, P(t, 48.8, 49.3), lp); }
  // i vettori
  vettore(ctx, S(0, 2), C.x, P(t, 13.6, 14.1) * via);
  vettore(ctx, S(1, 1), C.y, P(t, 29.4, 29.9) * via);
  const kp = P(t, 44.9, 45.4) * (1 - .65 * life(t, 64.9, 72.7, .4, .4));   // il prodotto resta in vista, tenue, come meta
  vettore(ctx, S(-2, 2), C.g, kp);
  // z₁ gira di 45°, poi si allunga di √2
  const kv = life(t, 65.2, 73.4, .3, .5);
  if (kv > 0) {
    const ang = 90 + 45 * P(t, 65.6, 66.9), r = lerp(2, 2 * R2, P(t, 69.0, 70.3));
    arco(ctx, 90, ang, 1.35, C.y, life(t, 65.6, 76.0, .1, .4), true);
    vettore(ctx, pol(r, ang), mix(C.x, C.g, P(t, 72.7, 73.2)), kv);
  }
  // i: modulo 1, argomento 90°; il prodotto gira di 90°
  const ki = P(t, 76.8, 77.3);
  vettore(ctx, S(0, 1), C.v, ki, 5);
  if (t > 81.0) {
    const ang = 135 + 90 * P(t, 81.2, 82.6);
    arco(ctx, 135, ang, 1.35, C.v, P(t, 81.1, 81.3), true);
    vettore(ctx, pol(2 * R2, ang), mix(C.g, C.v, P(t, 82.6, 83.0)), P(t, 81.0, 81.2));
  }
  // i numeri sbiadiscono mentre un vettore gira e ci passa sopra; i fondini spariscono prima della dissolvenza finale
  numeri(ctx, P(t, 8.3, 8.7) * (1 - .85 * life(t, 65.4, 67.1, .2, .3)) * (1 - .85 * life(t, 81.0, 82.8, .2, .3)), 1 - P(t, FINE - 1.0, FINE - .6));
  // le etichette, lontane dai vettori che si muovono
  etichetta(ctx, '{mx:z₁}', [.42, 2.2], P(t, 13.8, 14.2) * via);
  etichetta(ctx, '{my:z₂}', [1.38, 1.18], P(t, 29.6, 30.0) * via);
  etichetta(ctx, '{mx:z₁}{mink: · }{my:z₂}', [-2.0, 2.45], P(t, 45.0, 45.4) * (1 - P(t, 76.0, 76.4)));
  etichetta(ctx, '{mg:−2 + 2i}', [-2.0, 2.45], P(t, 76.3, 76.7));
  etichetta(ctx, '{mv:i}', [.3, 1.1], P(t, 77.0, 77.4));
  etichetta(ctx, '{mv:−2 − 2i}', [-2.0, -2.4], P(t, 84.8, 85.2));
  ctx.restore();
}

// la scheda: la tabella di moduli e argomenti, sotto i conti
const XM = 1500, XA = 1690, XS = 1460;
function cella(ctx, s, x, y, t0, t) { drawRich(ctx, s, x, y, { size: 46, alpha: P(t, t0, t0 + .3), local: t - t0 }); }
function sceneScheda(ctx, t) {
  if (t < 12.6 || t > FINE + .3) return;
  const la = P(t, 12.6, 13.2) * (1 - P(t, FINE - .6, FINE + .2));
  card(ctx, 1100, 120, 720, 680, la);
  ctx.save(); ctx.globalAlpha *= la;
  drawRich(ctx, '{dim:modulo}', XM, 182, { size: 32, alpha: P(t, 17.2, 17.6) });
  drawRich(ctx, '{dim:argomento}', XA, 182, { size: 32, alpha: P(t, 21.5, 21.9) });
  // righe della tabella
  drawRich(ctx, '{mx:z₁}', 1170, 262, { size: 46, align: 'left', alpha: P(t, 13.6, 14.0) });
  cella(ctx, '{mx:2}', XM, 262, 17.4, t); cella(ctx, '{x:90°}', XA, 262, 25.9, t);
  drawRich(ctx, '{my:z₂}', 1170, 342, { size: 46, align: 'left', alpha: P(t, 29.4, 29.8) });
  cella(ctx, '{my:√2}', XM, 342, 33.3, t); cella(ctx, '{y:45°}', XA, 342, 36.9, t);
  ctx.save(); ctx.globalAlpha *= P(t, 44.8, 45.2); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1150, 390); ctx.lineTo(1790, 390); ctx.stroke(); ctx.restore();
  drawRich(ctx, '{mx:z₁}{mink: · }{my:z₂}', 1170, 440, { size: 44, align: 'left', alpha: P(t, 44.9, 45.3) });
  cella(ctx, '{mg:2√2}', XM, 440, 48.5, t); cella(ctx, '{g:135°}', XA, 440, 52.1, t);
  // le colonne messe a confronto
  [[XM, 55.8, 59.5], [XA, 60.8, 64.6]].forEach(([x, a, b]) => {
    const k = life(t, a, b, .3, .3); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x - 78, 222, 156, 258, 14); ctx.stroke(); ctx.restore();
  });
  // i conti del prodotto
  const fc = 1 - P(t, 55.3, 55.7);
  if (t > 40.4 && fc > 0) {
    drawRich(ctx, '{mx:z₁}{mink: · }{my:z₂}', 1335, 545, { size: 44, align: 'right', alpha: fc, local: t - 40.5 });
    drawRich(ctx, '{mink:= }{mx:2i}{my:(1 + i)}', 1347, 545, { size: 44, align: 'left', alpha: fc, local: t - 40.7 });
    drawRich(ctx, '{mink:= 2i + 2i²}', 1347, 625, { size: 44, align: 'left', alpha: fc, local: t - 41.7 });
    drawRich(ctx, '{mink:= 2i − 2 = }{mg:−2 + 2i}', 1347, 705, { size: 44, align: 'left', alpha: fc, local: t - 42.8 });
  }
  // il confronto: moduli per, argomenti più
  const fm = 1 - P(t, 76.1, 76.5);
  if (t > 55.8 && fm > 0) {
    drawRich(ctx, '{dim:modulo del prodotto}', XS, 508, { size: 30, alpha: fm, local: t - 55.9 });
    drawRich(ctx, '{mink:|}{mx:z₁}{mink: · }{my:z₂}{mink:| = |}{mx:z₁}{mink:| · |}{my:z₂}{mink:|}', XS, 553, { size: 40, alpha: fm, local: t - 56.0 });
    drawRich(ctx, '{mx:2}{mink: · }{my:√2}{mink: = }{mg:2√2}', XS, 606, { size: 46, alpha: fm, local: t - 56.4 });
    drawRich(ctx, '{dim:argomento del prodotto}', XS, 664, { size: 30, alpha: fm, local: t - 60.8 });
    drawRich(ctx, '{mx:θ₁}{mink: + }{my:θ₂}', XS, 708, { size: 40, alpha: fm, local: t - 60.9 });
    drawRich(ctx, '{x:90°}{ink: + }{y:45°}{ink: = }{g:135°}', XS, 756, { size: 46, alpha: fm, local: t - 61.3 });
  }
  // i, e il prodotto che gira di 90°
  if (t > 76.6) {
    ctx.save(); ctx.globalAlpha *= P(t, 76.7, 77.1); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1150, 488); ctx.lineTo(1790, 488); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:i}', 1170, 535, { size: 46, align: 'left', alpha: P(t, 76.8, 77.2) });
    cella(ctx, '{mv:1}', XM, 535, 77.6, t); cella(ctx, '{v:90°}', XA, 535, 78.0, t);
    drawRich(ctx, '{mink:(}{mg:−2 + 2i}{mink:) · }{mv:i}{mink: = −2i + 2i²}', XS, 618, { size: 42, local: t - 84.9 });
    drawRich(ctx, '{mink:= }{mv:−2 − 2i}', XS, 682, { size: 42, local: t - 85.3 });
    drawRich(ctx, '{g:135°}{ink: + }{v:90°}{ink: = }{v:225°}', XS, 750, { size: 42, local: t - 85.8 });
  }
  ctx.restore();
}

// 5 · in una frase (FINE–FINE + 10.7)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.5, FINE + 9.5);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Nel prodotto i moduli si {g:moltiplicano}\ne gli argomenti si {g:sommano}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, '{mink:|}{mx:z₁}{mink: · }{my:z₂}{mink:| = |}{mx:z₁}{mink:| · |}{my:z₂}{mink:|}\nmoduli moltiplicati'], [960, 'argomenti sommati\n{mx:θ₁}{mink: + }{my:θ₂}'], [1470, 'per {mv:i}: un quarto di giro\nsenza allungare']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 235, 450, 470, 142);
    drawRich(ctx, s, x, 521, { size: 40, weight: 400, lh: 1.25 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Moltiplicare è ruotare', durata: Math.round((FINE + 10.7) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 29.1, 'modulo e argomento'], [29.1, 64.6, 'il prodotto'], [64.6, 76.4, 'girare e allungare'], [76.4, FINE, 'per i']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
