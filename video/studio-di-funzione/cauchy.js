'use strict';
/* Due funzioni, un solo istante — il punto (g(t); f(t)) con g(t) = t² e f(t) = t³, t da 0 a 1: la corda ha
   pendenza (f(1) − f(0)) / (g(1) − g(0)) = 1; la tangente ha pendenza f′(t)/g′(t) = 3t/2 ed è parallela alla corda
   in c = 2/3. Lagrange su f da sola darebbe t ≈ 0,58, su g da sola t = 0,5: Cauchy dà un istante solo per tutte e due.
   Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/cauchy', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, drawSeq, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 95.9, DUR = 107.9;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [18.3, 'felice'], [20.4, 'neutro'], [28.8, 'felice'], [31.0, 'neutro'], [44.6, 'pensa'],
  [48.7, 'sorpreso'], [52.4, 'festa'], [54.6, 'neutro'], [62.4, 'felice'], [64.6, 'neutro'],
  [67.3, 'sorpreso'], [69.4, 'neutro'], [82.2, 'felice'], [84.4, 'neutro'], [FINE + 1.0, 'felice'], [FINE + 7.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Lagrange parla di una funzione.\nE con due funzioni insieme?'],
  // 1 · il punto e la corda
  [7.9, 12.4, 'Al tempo {mx:t} un punto ha ascissa\n{mink:g(}{mx:t}{mink:)} e ordinata {mink:f(}{mx:t}{mink:)}.'],
  [12.6, 18.1, 'Qui {mink:g(}{mx:t}{mink:) = }{mx:t}{mink:²} e {mink:f(}{mx:t}{mink:) = }{mx:t}{mink:³},\ncon {mx:t} da 0 a 1.'],
  [18.3, 21.9, 'Unisco partenza e arrivo:\nè la {g:corda}.'],
  [22.1, 28.6, 'Avanza di {mink:g(1) − g(0) = 1}\ne sale di {mink:f(1) − f(0) = 1}.'],
  [28.8, 33.9, 'Il rapporto degli incrementi, {mink:1/1},\nè la pendenza della corda.'],
  // 2 · la tangente
  [34.1, 38.6, 'In ogni istante il punto va\nlungo la {v:tangente} alla curva.'],
  [38.8, 44.4, 'Pendenza: quanto sale, {mink:f′(}{mx:t}{mink:)},\ndiviso quanto avanza, {mink:g′(}{mx:t}{mink:)}.'],
  [44.6, 47.6, 'Qui è meno ripida della corda.'],
  [48.7, 51.2, 'Qui è più ripida.'],
  [52.4, 56.4, 'In un istante {mink:c} la tangente\nè {g:parallela} alla corda!'],
  [56.6, 62.2, 'Lì {mink:f′(c)} diviso {mink:g′(c)} è uguale\nal rapporto degli incrementi.'],
  [62.4, 67.1, 'Con i conti: {mink:3c/2 = 1},\ncioè {mink:c = 2/3}.'],
  // 3 · un solo istante
  [67.3, 71.8, 'Ed è {v:lo stesso} istante {mink:c}\nper {mink:f} e per {mink:g}.'],
  [72.0, 78.0, 'Lagrange su {mink:f} da sola darebbe\nun altro istante: {mx:t}{mink: ≈ 0,58}.'],
  [78.2, 82.0, 'Su {mink:g} da sola, un altro ancora:\n{mx:t}{mink: = 0,5}.'],
  [82.2, 87.9, 'È il teorema di {v:Cauchy}: un solo {mink:c}\nper le derivate di {mink:f} e di {mink:g}.'],
  [88.1, 95.1, 'Servono {mink:f} e {mink:g} continue in {mink:[a, b]},\nderivabili in {mink:(a, b)}, con {mink:g′(}{mx:t}{mink:) ≠ 0}.'],
  // chiusura
  [FINE + 1.0, DUR - 3.0, 'Due funzioni, un solo istante {mink:c}:\nil teorema di Cauchy.'],
];

// ---- il piano: ascissa g(t) = t², ordinata f(t) = t³ ----
const g = t => t * t, f = t => t * t * t;
const OXP = 500, OYP = 715, U = 520;
const PS = (x, y) => [OXP + x * U, OYP - y * U];
const PT = t => PS(g(t), f(t));
const CURVA = []; for (let i = 0; i <= 200; i++) CURVA.push(PT(i / 200));
const CARD = [372, 110, 760, 690], PAN = [1200, 110, 620, 690];
const CC = 2 / 3;   // l'istante di Cauchy: 3c/2 = 1
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (const v of [.5, 1]) {
    ctx.beginPath(); ctx.moveTo(PS(v, 0)[0], OYP); ctx.lineTo(PS(v, 1.04)[0], PS(v, 1.04)[1]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(OXP, PS(0, v)[1]); ctx.lineTo(PS(1.06, v)[0], PS(0, v)[1]); ctx.stroke();
  }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(OXP - 10, OYP); ctx.lineTo(PS(1.12, 0)[0], OYP); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(OXP, OYP + 10); ctx.lineTo(OXP, PS(0, 1.1)[1]); ctx.stroke();
  arrowHead(ctx, [PS(1.12, 0)[0] + 6, OYP], 0, C.ink);
  arrowHead(ctx, [OXP, PS(0, 1.1)[1] - 6], -Math.PI / 2, C.ink);
  drawRich(ctx, '{dim:0,5}', PS(.5, 0)[0], OYP + 34, { size: 30 });
  drawRich(ctx, '{dim:1}', PS(1, 0)[0], OYP + 34, { size: 30 });
  drawRich(ctx, '{dim:0,5}', OXP - 18, PS(0, .5)[1], { size: 30, align: 'right' });
  drawRich(ctx, '{dim:1}', OXP - 18, PS(0, 1)[1], { size: 30, align: 'right' });
  drawRich(ctx, '{mx:x}', PS(1.12, 0)[0] + 32, OYP - 28, { size: 44 });
  drawRich(ctx, '{my:y}', OXP + 30, PS(0, 1.1)[1] - 4, { size: 44 });
  ctx.restore();
}
// la tangente nel punto di tempo t: un tratto lungo fisso, tagliato al quadrante del piano
function tangente(ctx, t, col, al, L = 250) {
  if (al <= 0) return;
  const dx = 2 * t, dy = 3 * t * t, n = Math.hypot(dx, dy) || 1, p = PT(t);
  const ux = dx / n * L, uy = -dy / n * L;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(OXP + 2, CARD[1] + 8, CARD[0] + CARD[2] - 10 - OXP, OYP - CARD[1] - 10); ctx.clip();
  glowStroke(ctx, [[p[0] - ux, p[1] - uy], [p[0] + ux, p[1] + uy]], 1, col, 5);
  ctx.restore();
}
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function etichetta(ctx, s, x, y, size, al = 1, align = 'center') {
  if (al <= 0) return;
  const w = M.richW(ctx, s, size) + 20, x0 = align === 'left' ? x - 10 : align === 'right' ? x - w + 10 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 10); ctx.fill();
  drawRich(ctx, s, x, y, { size, align });
  ctx.restore();
}
// il tempo del punto con la tangente: 0,15 → 0,4 (meno ripida), → 0,9 (più ripida), → 2/3 (parallela)
const TT = [[34.3, .15], [36.6, .4], [47.7, .4], [48.6, .9], [51.3, .9], [52.3, CC]];   // si muove solo fra un fumetto e l'altro

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Due funzioni, un solo istante', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // il punto al tempo 0,6, con le sue due coordinate (7,9–12,6)
  const k1 = life(t, 8.3, 12.6, .4, .3);
  if (k1 > 0) {
    const t1 = .6, p = PT(t1), px = PS(g(t1), 0), py = PS(0, f(t1));
    ctx.save(); ctx.globalAlpha *= k1;
    dashed(ctx, p, px, C.x, P(t, 9.0, 9.5)); dashed(ctx, p, py, C.y, P(t, 9.6, 10.1));
    dot(ctx, p, C.ink, P(t, 8.3, 8.7, E.back), 11);
    etichetta(ctx, '{mink:(g(}{mx:t}{mink:); f(}{mx:t}{mink:))}', p[0] + 26, p[1] + 2, 40, P(t, 8.5, 8.9), 'left');
    etichetta(ctx, '{mink:g(}{mx:t}{mink:)}', px[0], OYP + 40, 40, P(t, 9.4, 9.8));
    etichetta(ctx, '{mink:f(}{mx:t}{mink:)}', OXP - 16, py[1], 40, P(t, 10.0, 10.4), 'right');
    ctx.restore();
  }
  // la curva tracciata dal punto, da t = 0 a t = 1 (13,0–16,4)
  const pt = P(t, 13.0, 16.4, E.io);
  if (t > 12.9) glowStroke(ctx, CURVA, pt, C.y);
  const k2 = life(t, 12.9, 16.9, .2, .4);
  if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2; dot(ctx, PT(pt), C.ink, 1, 11); ctx.restore(); }
  // la corda
  const A = PS(0, 0), B = PS(1, 1);
  glowStroke(ctx, [A, B], P(t, 18.5, 19.5), C.g);
  if (t > 18.3) {
    dot(ctx, A, C.ink, P(t, 18.4, 18.8, E.back), 10); dot(ctx, B, C.ink, P(t, 18.6, 19.0, E.back), 10);
    drawRich(ctx, '{g:corda}', PS(.3, .52)[0], PS(.3, .52)[1], { size: 38, local: t - 19.5 });
  }
  // gli incrementi: avanza di 1 (azzurro), sale di 1 (arancio)
  const ki = life(t, 22.3, 34.3, .3, .4);
  if (ki > 0) {
    ctx.save(); ctx.globalAlpha *= ki;
    segmento(ctx, A, PS(1, 0), C.x, P(t, 22.3, 23.0), 7);
    segmento(ctx, PS(1, 0), B, C.y, P(t, 24.6, 25.3), 7);
    etichetta(ctx, '{x:1}', PS(.5, 0)[0], OYP - 32, 40, P(t, 22.8, 23.2));
    etichetta(ctx, '{y:1}', PS(1, .5)[0] + 24, PS(1, .5)[1], 40, P(t, 25.1, 25.5), 'left');
    ctx.restore();
  }
  // il punto con la sua tangente (34,1–FINE): viola, verde quando è parallela alla corda
  const ka = life(t, 34.1, FINE + .2, .4, .5);
  if (ka > 0) {
    const tt = kf(t, TT), ok = P(t, 52.3, 52.7);
    tangente(ctx, tt, mix(C.v, C.g, ok), ka);
    ctx.save(); ctx.globalAlpha *= ka; dot(ctx, PT(tt), C.ink, P(t, 34.1, 34.5, E.back), 11); ctx.restore();
    etichetta(ctx, '{mx:t}{mink: = c}', PT(CC)[0] + 46, PT(CC)[1] + 42, 40, ok * ka, 'left');
  }
  ctx.restore();
}

// la scheda di destra
const PX = PAN[0] + PAN[2] / 2;
function scenePannello(ctx, t) {
  const al = life(t, 12.8, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const kTop = 1 - P(t, 82.2, 82.7);
  ctx.save(); ctx.globalAlpha *= kTop;
  drawRich(ctx, '{mink:g(}{mx:t}{mink:) = }{mx:t}{mink:²}', PX, 175, { size: 44, local: t - 13.0 });
  drawRich(ctx, '{mink:f(}{mx:t}{mink:) = }{mx:t}{mink:³}', PX, 235, { size: 44, local: t - 13.6 });
  ctx.restore();
  // gli incrementi e la pendenza della corda (22–34)
  const kA = 1 - P(t, 34.1, 34.5);
  if (t > 22.2 && kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    drawRich(ctx, '{x:avanza} {mink:g(1) − g(0) = 1}', PX, 320, { size: 42, local: t - 22.4 });
    drawRich(ctx, '{y:sale} {mink:f(1) − f(0) = 1}', PX, 385, { size: 42, local: t - 24.7 });
    if (t > 28.9) {
      drawSeq(ctx, [{ num: '{mink:f(1) − f(0)}', den: '{mink:g(1) − g(0)}' }, '{mink:= }{mg:1}'], PX, 485, 42, { local: t - 29.0 });
      drawRich(ctx, '{dim:pendenza della corda}', PX, 565, { size: 30, local: t - 29.8 });
    }
    ctx.restore();
  }
  drawRich(ctx, '{dim:pendenza della corda: }{mg:1}', PX, 690, { size: 36, alpha: P(t, 34.5, 34.9) * (1 - P(t, 67.3, 67.7)) });
  // la pendenza della tangente (39–55)
  if (t > 38.9) drawSeq(ctx, ['pendenza {mink:=}', { num: '{mink:f′(}{mx:t}{mink:)}', den: '{mink:g′(}{mx:t}{mink:)}' }, '{mink:=}',
    { num: '{mink:3}{mx:t}{mink:²}', den: '{mink:2}{mx:t}' }, '{mink:=}', { num: '{mink:3}{mx:t}', den: '{mink:2}' }], PX, 340, 40, { local: t - 39.0, alpha: 1 - P(t, 56.6, 57.0) });
  // il tempo e la pendenza mentre il punto si muove (34–55): t a tre decimali, pendenza = 3t/2 dal t mostrato
  const kv = life(t, 34.3, 56.8, .4, .4);
  if (kv > 0) {
    const tq = Math.round(kf(t, TT) * 1000) / 1000, ok = P(t, 52.3, 52.7);
    ctx.save(); ctx.globalAlpha *= kv;
    drawRich(ctx, '{mx:t =}', 1470, 470, { size: 44, align: 'right' });
    fixedNum(ctx, fmtN(tq, 3), 1650, 470, 44, C.x);
    drawRich(ctx, 'pendenza {mink:=}', 1470, 540, { size: 44, align: 'right' });
    fixedNum(ctx, fmtN(1.5 * tq, 2), 1650, 540, 44, mix(C.v, C.g, ok));
    ctx.restore();
  }
  // in c (55–81): il rapporto delle derivate e quello degli incrementi, poi il conto
  ctx.save(); ctx.globalAlpha *= kTop;
  if (t > 56.9) drawSeq(ctx, [{ num: '{mink:f′(c)}', den: '{mink:g′(c)}' }, '{mink:=}', { num: '{mink:f(1) − f(0)}', den: '{mink:g(1) − g(0)}' }], PX, 340, 42, { local: t - 57.0 });
  if (t > 62.5) drawSeq(ctx, [{ num: '{mink:3c}', den: '{mink:2}' }, '{mink:= 1    ⇒    c =}', { num: '{mg:2}', den: '{mg:3}', bar: C.g }], PX, 480, 42, { local: t - 62.6 });
  ctx.restore();
  // il teorema (80,8–FINE)
  if (t > 82.3) {
    conFont(TITOLI, () => drawRich(ctx, 'teorema di {v:Cauchy}', PX, 175, { size: 42, weight: 600, local: t - 82.4 }));
    drawSeq(ctx, [{ num: '{mink:f′(c)}', den: '{mink:g′(c)}' }, '{mink:=}', { num: '{mink:f(b) − f(a)}', den: '{mink:g(b) − g(a)}' }], PX, 295, 42, { local: t - 83.0 });
    drawRich(ctx, '{dim:per un }{mink:c}{dim: in }{mink:(a, b)}{dim:; qui }{mink:a = 0}{dim:, }{mink:b = 1}', PX, 382, { size: 32, local: t - 83.8 });
  }
  if (t > 88.2) {
    drawRich(ctx, '{mink:f}{dim:, }{mink:g}{dim: continue in }{mink:[a, b]}', PX, 445, { size: 34, local: t - 88.3 });
    drawRich(ctx, '{dim:derivabili in }{mink:(a, b)}{dim:, con }{mink:g′(}{mx:t}{mink:) ≠ 0}', PX, 495, { size: 34, local: t - 90.0 });
  }
  // la linea del tempo (65,9–FINE): c per tutte e due, poi f da sola e g da sola
  const kl = P(t, 67.4, 67.9);
  if (kl > 0) {
    const TX = v => lerp(1290, 1730, v), TY = 680;
    ctx.save(); ctx.globalAlpha *= kl;
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(TX(0), TY); ctx.lineTo(TX(1), TY); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(TX(0), TY - 10); ctx.lineTo(TX(0), TY + 10); ctx.moveTo(TX(1), TY - 10); ctx.lineTo(TX(1), TY + 10); ctx.stroke();
    drawRich(ctx, '{dim:0}', TX(0) - 24, TY, { size: 30 });
    drawRich(ctx, '{dim:1}', TX(1) + 22, TY, { size: 30 });
    drawRich(ctx, '{mx:t}', TX(1) + 52, TY, { size: 36 });
    ctx.restore();
    const segno = (v, col, k, yl) => {
      if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(TX(v), TY); ctx.lineTo(TX(v), yl); ctx.stroke(); ctx.restore();
      dot(ctx, [TX(v), TY], col, k, 9);
    };
    segno(CC, C.g, P(t, 68.0, 68.4, E.back), 636);
    drawRich(ctx, '{mink:c = }{mg:2/3}{dim:: }{mink:f}{dim: e }{mink:g}', TX(CC) + 20, 609, { size: 34, local: t - 68.2 });
    segno(1 / Math.sqrt(3), C.y, P(t, 72.4, 72.8, E.back), 720);
    drawRich(ctx, '{dim:solo }{mink:f}{dim:: }{mink:≈ 0,58}', TX(1 / Math.sqrt(3)) - 4, 742, { size: 32, align: 'left', local: t - 72.6 });
    segno(.5, C.x, P(t, 78.6, 79.0, E.back), 720);
    drawRich(ctx, '{dim:solo }{mink:g}{dim:: }{mink:0,5}', TX(.5) + 4, 742, { size: 32, align: 'right', local: t - 78.8 });
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'In un solo istante {mink:c}, {mink:f′(c)/g′(c)} è il\nrapporto degli incrementi.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 460, 'formula'], [960, 420, 'c'], [1430, 400, 'g']];
  pills.forEach(([x, w, tipo], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - w / 2, 445, w, 190);
    if (tipo === 'formula') drawSeq(ctx, [{ num: '{mink:f′(c)}', den: '{mink:g′(c)}' }, '{mink:=}', { num: '{mink:f(b) − f(a)}', den: '{mink:g(b) − g(a)}' }], x, 540, 38);
    if (tipo === 'c') drawRich(ctx, '{dim:lo stesso istante}\n{mink:c}{dim: per }{mink:f}{dim: e per }{mink:g}', x, 540, { size: 38, weight: 400, lh: 1.35 });
    if (tipo === 'g') drawRich(ctx, '{dim:serve}\n{mink:g′(}{mx:t}{mink:) ≠ 0}', x, 540, { size: 40, weight: 400, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue il punto sulla curva, poi la pendenza della tangente
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7], ['pop', 8.4, .45],                        // il piano, il punto
    ['traccia', 9.0, 9.5], ['traccia', 9.6, 10.1],                                    // g(t) e f(t) sugli assi
    ['soffio', 12.9], ['tono', 13.0, 16.4, [0, .01, .06, .17, .35, .6, 1]],          // la curva: il punto sale
    ['pop', 18.4, .3], ['pop', 18.6, .8], ['traccia', 18.5, 19.5],                    // partenza, arrivo, la corda
    ['traccia', 22.3, 23.0], ['pop', 22.9, .3],                                       // avanza di 1
    ['traccia', 24.6, 25.3], ['tono', 24.6, 25.3, [.3, .8]], ['pop', 25.2, .8],       // sale di 1
    ['pop', 29.1, .5], ['ding', 29.6],                                                // la pendenza della corda: 1
    ['pop', 34.2, .3], ['tono', 34.3, 36.6, [.22, .3, .4]],                           // il punto con la tangente
    ['pop', 39.1, .5],                                                                // f′(t)/g′(t) = 3t/2
    ['tono', 47.7, 48.6, [.4, .7, .9]],                                               // più ripida
    ['tono', 51.3, 52.3, [.9, .8, .67]],                                              // e poi parallela
    ['pop', 57.1, .5],                                                                // f′(c)/g′(c) = incrementi
    ['pop', 62.7, .5], ['ding', 63.8],                                                // c = 2/3
    ['soffio', 67.4], ['traccia', 67.4, 67.9], ['pop', 68.2, .67],                    // la linea del tempo, c
    ['pop', 72.5, .58], ['pop', 78.7, .5],                                            // f da sola, g da sola
    ['soffio', 82.4], ['pop', 83.1, .6],                                              // il teorema di Cauchy
    ['pop', 88.4, .5], ['pop', 90.1, .55],                                            // le ipotesi
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Due funzioni, un solo istante', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 33.9, 'il punto e la corda'], [33.9, 67.1, 'la tangente'], [67.1, FINE, 'un solo istante']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
