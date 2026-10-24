'use strict';
/* La pendenza allo specchio — f(x) = x³ passa per P(2; 8) con pendenza f′(2) = 12 (avanza 0,5, sale 6);
   specchiando tutto sulla retta y = x la curva diventa f⁻¹(x) = ∛x, P diventa Q(8; 2), la tangente e il suo
   triangolo si ribaltano: avanza 6, sale 0,5, pendenza 1/12. La regola (f⁻¹)′(y₀) = 1/f′(x₀), e perché serve
   f′(x₀) ≠ 0 (in O la tangente orizzontale diventa verticale). Argomento: derivate. */
CVIDEO.registra('derivate/inversa', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq,
    dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 86.8, DUR = 98.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [17.8, 'sorpreso'], [19.9, 'neutro'], [31.2, 'felice'], [33.4, 'neutro'], [50.0, 'felice'], [52.2, 'neutro'],
  [55.0, 'festa'], [57.2, 'neutro'], [66.5, 'felice'], [68.7, 'neutro'], [76.3, 'sorpreso'], [78.5, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 7.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Se conosco la pendenza di {mink:f},\nconosco quella dell’inversa?'],
  // 1 · la pendenza di f in P
  [7.9, 12.6, 'Ecco {mink:f(}{mx:x}{mink:) = }{mx:x}{mink:³}:\npassa per {mink:P(2; 8)}.'],
  [12.8, 17.6, 'La derivata è {mink:f′(}{mx:x}{mink:) = 3}{mx:x}{mink:²}:\nin 2 vale {mink:3 · 4 = 12}.'],
  [17.8, 21.6, 'Ecco la tangente in {mink:P}:\nè ripidissima.'],
  [21.8, 26.8, 'Avanza di {x:0,5} e sale di {y:6}:\n{mink:6/0,5 = 12}.'],
  // 2 · lo specchio
  [27.0, 31.0, 'Ora specchio tutto\nsulla retta {mink:y = }{mx:x}.'],
  [31.2, 35.6, 'La curva si ribalta: è l’inversa,\n{mink:f⁻¹(}{mx:x}{mink:) = ∛}{mx:x}.'],
  [35.8, 40.4, '{mink:P(2; 8)} diventa {mink:Q(8; 2)}:\nle coordinate si scambiano.'],
  [40.6, 45.0, 'Anche la tangente si ribalta:\nora tocca l’inversa in {mink:Q}.'],
  [45.2, 49.8, 'E il triangolo: ora avanza di {y:6}\ne sale di {x:0,5}.'],
  [50.0, 54.8, 'La pendenza in {mink:Q} è\n{mink:0,5/6 = 1/12}.'],
  [55.0, 59.6, 'Avanzare e salire si sono scambiati:\nla pendenza si è {v:capovolta}.'],
  // 3 · la regola
  [59.8, 66.3, 'In generale {mink:(f⁻¹)′(y₀) = 1/f′(x₀)},\ndove {mink:y₀ = f(x₀)}.'],
  [66.5, 70.7, 'Qui {mink:x₀ = 2} e {mink:y₀ = 8}:\n{mink:(f⁻¹)′(8) = 1/12}.'],
  [70.9, 76.1, 'In {mink:O} la tangente di {mink:f} è\n{v:orizzontale}: {mink:f′(0) = 0}.'],
  [76.3, 80.8, 'Allo specchio diventa {r:verticale}:\nlì l’inversa non è derivabile.'],
  [81.0, 85.9, 'Per questo la regola\nchiede {mink:f′(x₀) ≠ 0}.'],
  // chiusura
  [FINE + 1.0, DUR - 3.0, 'La pendenza dell’inversa è il\nreciproco: {mink:12} diventa {mink:1/12}.'],
];

// ---- il piano (stessa unità sui due assi: lo specchio y = x è a 45°) ----
const OXP = 450, OYP = 745, U = 64;
const PS = (x, y) => [OXP + x * U, OYP - y * U];
const YMAX = 9.3, XMAX = 9.3;
const CUBO = [], RADICE = [];
for (let i = 0; i <= 160; i++) { const x = Math.cbrt(YMAX) * i / 160; CUBO.push([x, x * x * x]); }
for (let i = 0; i <= 160; i++) { const x = XMAX * Math.pow(i / 160, 3); RADICE.push([x, Math.cbrt(x)]); }   // più punti vicino a 0, dove sale ripida
const CARD = [372, 110, 760, 690], PAN = [1200, 110, 620, 690];
// specchiare un punto (x; y) sulla retta y = x, con k da 0 (com'è) a 1 (specchiato)
const spec = (q, k) => [lerp(q[0], q[1], k), lerp(q[1], q[0], k)];
const scr = pts => pts.map(q => PS(q[0], q[1]));
// la tangente in P(2; 8): y = 12x − 16, da y = 2 (il vertice del triangolo) a y = 9,3; il triangolo: (1,5; 2), (2; 2), (2; 8)
const TAN = [[1.5, 2], [(YMAX + 16) / 12, YMAX]];
const T1 = [1.5, 2], T2 = [2, 2], T3 = [2, 8];

function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= 9; i++) {
    ctx.beginPath(); ctx.moveTo(PS(i, -.3)[0], PS(i, -.3)[1]); ctx.lineTo(PS(i, 9.3)[0], PS(i, 9.3)[1]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(PS(-.3, i)[0], PS(-.3, i)[1]); ctx.lineTo(PS(9.3, i)[0], PS(9.3, i)[1]); ctx.stroke();
  }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(PS(-.4, 0)[0], OYP); ctx.lineTo(PS(9.6, 0)[0], OYP); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(OXP, PS(0, -.4)[1]); ctx.lineTo(OXP, PS(0, 9.6)[1]); ctx.stroke();
  arrowHead(ctx, [PS(9.6, 0)[0] + 6, OYP], 0, C.ink);
  arrowHead(ctx, [OXP, PS(0, 9.6)[1] - 6], -Math.PI / 2, C.ink);
  for (const i of [2, 4, 6, 8]) {
    drawRich(ctx, '{dim:' + i + '}', PS(i, 0)[0], OYP + 30, { size: 30 });
    drawRich(ctx, '{dim:' + i + '}', OXP - 16, PS(0, i)[1], { size: 30, align: 'right' });
  }
  drawRich(ctx, '{mink:O}', OXP - 40, OYP + 30, { size: 34 });   // lontana dall'asse y, dove arriva la tangente verticale
  drawRich(ctx, '{mx:x}', PS(9.6, 0)[0] + 32, OYP - 28, { size: 44 });
  drawRich(ctx, '{my:y}', OXP + 30, PS(0, 9.6)[1] - 4, { size: 44 });
  ctx.restore();
}
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
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
  conFont(TITOLI, () => drawRich(ctx, 'La pendenza allo specchio', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  ctx.save();
  const a0 = PS(-.45, 9.45), a1 = PS(9.45, -.45);
  ctx.beginPath(); ctx.rect(a0[0], a0[1], a1[0] - a0[0], a1[1] - a0[1]); ctx.clip();
  // lo specchio y = x
  const ks = P(t, 27.2, 28.2);
  if (ks > 0) {
    const a = PS(-.3, -.3), b = PS(9.3, 9.3);
    ctx.save(); ctx.strokeStyle = css(C.dim, .9); ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], ks), lerp(a[1], b[1], ks)); ctx.stroke(); ctx.restore();
  }
  // f, la sua copia che si ribalta, e l'inversa
  glowStroke(ctx, scr(CUBO), P(t, 8.4, 9.8), C.y);
  const kc = P(t, 31.4, 33.2);
  if (kc > 0 && kc < 1 || t > 33.2 && t < 33.7) {
    ctx.save(); ctx.globalAlpha *= .55 * (1 - P(t, 33.2, 33.7));
    glowStroke(ctx, scr(CUBO.map(q => spec(q, kc))), 1, C.y, 5); ctx.restore();
  }
  const ki = P(t, 33.0, 33.5);
  if (ki > 0) { ctx.save(); ctx.globalAlpha *= ki; glowStroke(ctx, scr(RADICE), 1, C.g); ctx.restore(); }
  // la tangente di f in P, poi la sua copia che si ribalta (e resta: è la tangente dell'inversa in Q)
  glowStroke(ctx, scr(TAN), P(t, 18.0, 19.0), C.v, 5);
  const kt = P(t, 40.8, 42.4);
  if (kt > 0) glowStroke(ctx, scr(TAN.map(q => spec(q, kt))), 1, C.v, 5);
  // in O: la tangente orizzontale di f (sull'asse x), che allo specchio diventa verticale
  const ko = life(t, 71.1, FINE + .2, .4, .5);
  if (ko > 0) {
    const kr = P(t, 76.5, 77.7), O1 = spec([-.2, 0], kr), O2 = spec([1.3, 0], kr);
    ctx.save(); ctx.globalAlpha *= ko;
    segmento(ctx, PS(O1[0], O1[1]), PS(O2[0], O2[1]), M.mix(C.v, C.r, kr), 1, 9);
    ctx.restore();
  }
  ctx.restore();
  if (ko > 0) { ctx.save(); ctx.globalAlpha *= ko; dot(ctx, PS(0, 0), C.ink, 1, 9); ctx.restore(); }
  // il triangolo in P: avanza 0,5 (azzurro), sale 6 (arancio); poi la sua copia ribaltata in Q
  const kT = P(t, 22.0, 22.6), kT2 = P(t, 22.8, 23.6);
  const kL = 1 - P(t, 45.4, 45.8);   // il triangolo in P si spegne quando parte la sua copia
  if (kL > 0) { ctx.save(); ctx.globalAlpha *= kL; segmento(ctx, PS(...T1), PS(...T2), C.x, kT); segmento(ctx, PS(...T2), PS(...T3), C.y, kT2); ctx.restore(); }
  etichetta(ctx, '{x:0,5}', PS(1.75, 2)[0], PS(1.75, 2)[1] + 32, 40, P(t, 22.4, 22.8) * (1 - P(t, 32.6, 33.0)));   // sotto passerà l'inversa
  etichetta(ctx, '{y:6}', PS(2, 5)[0] + 18, PS(2, 5)[1], 40, P(t, 23.4, 23.8) * kL, 'left');
  const kR = P(t, 45.4, 47.0);
  if (kR > 0) {
    const s1 = spec(T1, kR), s2 = spec(T2, kR), s3 = spec(T3, kR);
    segmento(ctx, PS(...s1), PS(...s2), C.x); segmento(ctx, PS(...s2), PS(...s3), C.y);
    etichetta(ctx, '{y:6}', PS(5, 2)[0], PS(5, 2)[1] - 32, 40, P(t, 47.0, 47.4));
    // dentro il triangolo, senza fondino: sotto passano la tangente e l'inversa
    etichetta(ctx, '{x:0,5}', PS(2, 1.75)[0] + 14, PS(2, 1.75)[1] - 4, 30, P(t, 47.2, 47.6), 'left');
  }
  // i nomi delle curve e dello specchio
  drawRich(ctx, '{my:f}', PS(1.3, 7.2)[0], PS(1.3, 7.2)[1], { size: 44, local: t - 9.6 });
  if (t > 33.5) drawRich(ctx, '{mg:f⁻¹}', PS(6.2, 1.25)[0], PS(6.2, 1.25)[1] + 8, { size: 44, local: t - 33.6 });
  drawRich(ctx, '{mdim:y = x}', PS(8.0, 8.9)[0], PS(8.0, 8.9)[1], { size: 34, align: 'right', alpha: P(t, 28.0, 28.4) });
  // P, e la sua copia che va in Q
  const p2 = PS(2, 8);
  if (t > 10.2) {
    dot(ctx, p2, C.ink, P(t, 10.3, 10.7, E.back), 11);
    drawRich(ctx, '{mink:P(2; 8)}', p2[0] + 24, p2[1] + 4, { size: 40, align: 'left', local: t - 10.5 });
  }
  const kq = P(t, 36.0, 37.2);
  if (kq > 0) {
    const q = spec([2, 8], kq), q2 = PS(q[0], q[1]);
    dashed(ctx, p2, q2, C.dim, 1, .7 * (1 - P(t, 40.4, 40.8)));
    dot(ctx, q2, C.ink, 1, 11);
    drawRich(ctx, '{mink:Q(8; 2)}', PS(8, 2)[0], PS(8, 2)[1] - 40, { size: 40, local: t - 37.2 });
  }
  ctx.restore();
}

// la scheda di destra
const PX = PAN[0] + PAN[2] / 2;
const UN12 = { num: '{mv:1}', den: '{mv:12}', bar: C.v };
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function scenePannello(ctx, t) {
  const al = life(t, 8.2, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  UN12.bar = C.v;   // il tema scuro cambia i colori
  drawRich(ctx, '{mink:f(}{mx:x}{mink:) = }{mx:x}{mink:³}', PX, 175, { size: 44, local: t - 8.6 });
  if (t > 12.9) drawRich(ctx, '{mink:f′(}{mx:x}{mink:) = 3}{mx:x}{mink:²}', PX, 240, { size: 44, local: t - 13.0 });
  if (t > 14.9) drawRich(ctx, '{mink:f′(2) = 3 · 4 = }{mv:12}', PX, 305, { size: 44, local: t - 15.0 });
  separa(ctx, 340, P(t, 21.9, 22.3));
  if (t > 24.5) drawSeq(ctx, ['{dim:in }{mink:P}{dim:: }', { num: '{y:6}', den: '{x:0,5}' }, '{mink:= }{mv:12}'], PX, 396, 40, { local: t - 24.6 });
  // lo specchio (33,8–59,8)
  const k2 = 1 - P(t, 59.8, 60.2);
  if (t > 33.7 && k2 > 0) {
    ctx.save(); ctx.globalAlpha *= k2;
    drawRich(ctx, '{mink:f⁻¹(}{mx:x}{mink:) = ∛}{mx:x}', PX, 472, { size: 44, local: t - 33.8 });
    if (t > 50.1) drawSeq(ctx, ['{dim:in }{mink:Q}{dim:: }', { num: '{x:0,5}', den: '{y:6}' }, '{mink:=}', UN12], PX, 552, 42, { local: t - 50.2 });
    if (t > 55.1) {
      drawSeq(ctx, ['{mv:12}', '{dim:   e   }', UN12], PX, 652, 44, { local: t - 55.2 });
      drawRich(ctx, '{dim:una è il reciproco dell’altra}', PX, 738, { size: 32, local: t - 56.2 });
    }
    ctx.restore();
  }
  // la regola (59,8–FINE)
  if (t > 59.9) {
    drawSeq(ctx, ['{mink:(f⁻¹)′(y₀) =}', { num: '{mink:1}', den: '{mink:f′(x₀)}' }], PX, 500, 46, { local: t - 60.0 });
    drawRich(ctx, '{dim:dove }{mink:y₀ = f(x₀)}', PX, 594, { size: 34, local: t - 61.6 });
  }
  if (t > 66.6) drawSeq(ctx, ['{mink:(f⁻¹)′(8) =}', { num: '{mink:1}', den: '{mink:f′(2)}' }, '{mink:=}', UN12], PX, 668, 42, { local: t - 66.7 });
  // in fondo, una riga che cambia: la tangente in O, poi lo specchio, poi la condizione
  const r1 = life(t, 71.1, 76.4, .4, .3), r2 = life(t, 76.6, 81.2, .4, .3), r3 = P(t, 81.3, 81.7);
  drawRich(ctx, '{mink:f′(0) = 0}{dim:: tangente orizzontale}', PX, 752, { size: 34, alpha: r1 });
  drawRich(ctx, '{dim:l’inversa in }{mink:O}{dim:: tangente }{r:verticale}', PX, 752, { size: 34, alpha: r2 });
  drawRich(ctx, '{dim:serve }{mink:f′(x₀) ≠ 0}', PX, 752, { size: 40, alpha: r3 });
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  UN12.bar = C.v;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Allo specchio la pendenza si capovolge:\nl’inversa ha la pendenza reciproca.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 440, 'regola'], [960, 420, 'qui'], [1430, 380, 'serve']];
  pills.forEach(([x, w, tipo], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - w / 2, 445, w, 190);
    if (tipo === 'regola') {
      drawSeq(ctx, ['{mink:(f⁻¹)′(y₀) =}', { num: '{mink:1}', den: '{mink:f′(x₀)}' }], x, 522, 40);
      drawRich(ctx, '{dim:con }{mink:y₀ = f(x₀)}', x, 598, { size: 30, weight: 400 });
    }
    if (tipo === 'qui') drawRich(ctx, '{mink:f′(2) = }{mv:12}\n{mink:(f⁻¹)′(8) = }{mv:1/12}', x, 540, { size: 40, weight: 400, lh: 1.35 });
    if (tipo === 'serve') drawRich(ctx, '{dim:serve}\n{mink:f′(x₀) ≠ 0}', x, 540, { size: 40, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7],                                           // il piano
    ['tono', 8.4, 9.8, [0, .01, .04, .1, .2, .35, .55, .8, 1]],                       // x³ sale sempre più ripida
    ['pop', 10.4, .85],                                                               // P(2; 8)
    ['pop', 13.1, .5], ['pop', 15.1, .6],                                             // f′(x) = 3x², f′(2) = 12
    ['traccia', 18.0, 19.0], ['tono', 18.0, 19.0, [.2, .95]],                         // la tangente ripidissima
    ['traccia', 22.0, 22.6], ['traccia', 22.8, 23.6], ['tono', 22.8, 23.6, [.2, .85]],   // avanza 0,5, sale 6
    ['ding', 24.8],                                                                   // 6/0,5 = 12
    ['soffio', 27.1], ['traccia', 27.2, 28.2], ['tono', 27.2, 28.2, [.05, .95]],     // lo specchio y = x
    ['tono', 31.4, 33.2, [.9, .6, .3, .2]], ['pop', 33.6, .4],                        // la curva si ribalta: f⁻¹
    ['tono', 36.0, 37.2, [.85, .2]], ['pop', 37.3, .2],                               // P scende in Q
    ['tono', 40.8, 42.4, [.9, .5, .25]],                                              // la tangente si ribalta e si sdraia
    ['tono', 45.4, 47.0, [.8, .4, .2]],                                               // il triangolo si ribalta
    ['pop', 50.3, .3], ['ding', 51.0],                                                // 0,5/6 = 1/12
    ['pop', 55.3, .7], ['pop', 55.9, .3],                                             // 12 e 1/12
    ['soffio', 59.9], ['pop', 60.2, .5], ['pop', 61.7, .45],                          // la regola
    ['pop', 66.8, .5], ['ding', 67.6],                                                // (f⁻¹)′(8) = 1/12
    ['traccia', 71.1, 71.6], ['pop', 71.3, .2],                                       // in O la tangente è orizzontale
    ['tono', 76.5, 77.7, [.2, .5, .9]],                                               // e diventa verticale
    ['pop', 81.4, .5],                                                                // serve f′(x₀) ≠ 0
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'La pendenza allo specchio', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 26.8, 'la pendenza in P'], [26.8, 59.6, 'lo specchio'], [59.6, FINE, 'la regola']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
