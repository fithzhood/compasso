'use strict';
/* Calcolare un integrale definito: dall'area F(b) − F(a) alla formula G(b) − G(a) con una primitiva qualunque, poi il controllo coi rettangoli. Argomento: integrali. */
CVIDEO.registra('integrali/calcolo', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW, fixedNum,
    dot, glowStroke, dashed, arrowHead, makePlane, card, checkMark } = M;
  const f = x => 1 + x * x / 4;          // la stessa curva del video sull'area: fra 0 e 4 l'area è 28/3 ≈ 9,33
  // notazioni del sito: F = funzione integrale (area da 0 a x), G = una primitiva qualunque, G = F + c
  // G(x) = x + x³/12, G(4) = 4 + 64/12 = 28/3, G(0) = 0; 64 rettangoli: sotto 9,209 → 9,21, sopra 9,459 → 9,46 (controllato con node)
  const A = 1.5, B = 3.5;                 // gli estremi a e b del pezzo generale (fra le tacche, lontani dai numeri)

const FINE = 95.8, DUR = 106.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.2, 'pensa'], [6.8, 'neutro'],
  [18.5, 'felice'], [20.8, 'neutro'], [29.7, 'pensa'], [32.0, 'neutro'],
  [34.5, 'felice'], [36.8, 'neutro'], [39.5, 'pensa'], [41.8, 'neutro'],
  [44.9, 'occhiolino'], [47.0, 'neutro'], [49.3, 'felice'], [51.6, 'neutro'],
  [64.0, 'pensa'], [66.2, 'felice'], [68.4, 'neutro'],
  [76.4, 'festa'], [78.7, 'felice'], [81.1, 'neutro'], [86.6, 'pensa'], [88.7, 'neutro'],
  [90.8, 'festa'], [93.2, 'felice'],
  [96.8, 'felice'], [100.6, 'occhiolino'], [102.6, 'felice'],
];
const FUMETTI = [
  [2.2, 6.6, 'Come si calcola un integrale\nsenza i rettangoli?'],
  [7.9, 13.0, 'Voglio l\'integrale di {my:f} da 0 a 4:\nl\'area colorata.'],
  [13.1, 18.4, 'Chiamo {mv:F(}{mx:x}{mv:)} l\'area da 0 a {mx:x}:\nè la {v:funzione integrale}.'],
  [18.5, 23.8, 'Per il {v:teorema fondamentale},\n{mv:F} è una primitiva di {my:f}: {mv:F′ = }{my:f}.'],
  [24.2, 29.6, 'Prendo due estremi {mink:a} e {mink:b}.\nL\'area da 0 a {mink:b} è {mv:F(b)}.'],
  [29.7, 34.4, 'Tolgo l\'area da 0 a {mink:a},\nche è {mv:F(a)}.'],
  [34.5, 39.4, 'Resta l\'area da {mink:a} a {mink:b}:\nl\'integrale è {mv:F(b) − F(a)}.'],
  [39.5, 44.8, 'Un\'altra primitiva {mv:G} differisce\nda {mv:F} per una costante: {mv:G = F + c}.'],
  [44.9, 49.2, 'Nella differenza\nil {mv:+ c} si cancella.'],
  [49.3, 54.2, 'Quindi basta {g:una primitiva qualunque}:\nl\'integrale è {mv:G(b) − G(a)}.'],
  [54.6, 58.9, 'Qui {my:f(x) = 1 + x²/4}:\nintegro {v:termine per termine}.'],
  [59.0, 63.9, 'Una primitiva di {my:1} è {mv:x},\ndi {my:x²/4} è {mv:x³/12}.'],
  [64.0, 68.9, 'Controllo derivando: {mv:1 + 3x²/12},\ncioè proprio {my:1 + x²/4}.'],
  [69.0, 73.2, '{mv:G} in 4 vale {mv:4 + 64/12},\ncioè {mv:28/3}.'],
  [73.3, 76.3, '{mv:G} in 0 vale {mv:0}.'],
  [76.4, 80.7, 'Quindi l\'integrale vale\n{mg:28/3 − 0 = 28/3}.'],
  [81.1, 85.3, 'Controllo: 64 rettangoli {x:sotto}\nla curva fanno {x:9,21}.'],
  [86.6, 90.7, 'Quelli {v:sopra} fanno {v:9,46}:\nl\'area vera sta in mezzo.'],
  [90.8, 95.4, '{mg:28/3} fa {g:9,333…}:\nproprio fra le due somme.'],
  [96.8, 103.6, 'Una primitiva, due valori\ne una sottrazione: l\'integrale.'],
];

// ---- il piano (come nel video sull'area) e gli aiutanti ----
const CARD = [380, 110, 690, 690];
const PL = makePlane({ ox: 470, oy: 715, u: 104, x0: -0.5, x1: 4.5, y0: -0.4, y1: 5.4 });
const CURVA = PL.curve(f, -0.12, 4.15, 200);
// ∫ grande (il glifo di KaTeX allungato in verticale) con gli estremi piccoli, poi il corpo
const SY = 1.75;
function intMisure(ctx, a, b, corpo, size) {
  ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; ctx.textBaseline = 'middle';
  const m = ctx.measureText('∫'), l = m.actualBoundingBoxLeft, r = m.actualBoundingBoxRight;
  const ls = Math.max(30, Math.round(size * .48)), top = m.actualBoundingBoxAscent * SY, bot = m.actualBoundingBoxDescent * SY;
  const xb = l + r + size * .08, xa = (l + r) * .62 + size * .06;     // l'estremo di sotto sta a destra della coda
  const xc = Math.max(xb + richW(ctx, b, ls), xa + richW(ctx, a, ls)) + size * .22;
  return { l, r, ls, top, bot, xb, xa, xc, w: xc + richW(ctx, corpo, size) };
}
function drawInt(ctx, a, b, corpo, x0, y, o = {}) {
  const size = o.size || 60, al = (o.alpha ?? 1) * P(o.local ?? 99, 0, .6, E.out);
  if (al <= 0.002) return;
  const m = intMisure(ctx, a, b, corpo, size);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.save(); ctx.translate(x0 + m.l, y); ctx.scale(1, SY);
  ctx.font = `${Math.round(size * 1.25)}px "KaTeX_Main", Cambria, serif`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = css(C.ink); ctx.fillText('∫', 0, 0);
  ctx.restore();
  drawRich(ctx, b, x0 + m.xb, y - m.top + m.ls * .45, { size: m.ls, align: 'left' });
  drawRich(ctx, a, x0 + m.xa, y + m.bot - m.ls * .3, { size: m.ls, align: 'left' });
  drawRich(ctx, corpo, x0 + m.xc, y, { size, align: 'left' });
  ctx.restore();
}
// un integrale con gli estremi seguito da altro testo, centrato in cx
function rigaInt(ctx, a, b, corpo, resto, cx, y, size, local, alpha = 1) {
  const mi = intMisure(ctx, a, b, corpo, size), x0 = cx - (mi.w + richW(ctx, resto, size)) / 2;
  drawInt(ctx, a, b, corpo, x0, y, { size, local, alpha });
  drawRich(ctx, resto, x0 + mi.w, y, { size, align: 'left', local: local - .4, alpha });
}
// la regione sotto la curva fra a e b
function regione(ctx, a, b, alfa, col) {
  if (alfa <= 0.002 || b - a < 1e-4) return;
  ctx.save(); ctx.fillStyle = css(col || C.g, alfa);
  ctx.beginPath(); ctx.moveTo(...PL.toS(a, 0));
  for (let j = 0; j <= 80; j++) { const x = lerp(a, b, j / 80); ctx.lineTo(...PL.toS(x, f(x))); }
  ctx.lineTo(...PL.toS(b, 0)); ctx.closePath(); ctx.fill(); ctx.restore();
}
// 64 rettangoli che crescono uno dopo l'altro da t0: sotto (alti come il lato sinistro) o sopra (come il destro)
function rettangoli(ctx, t, t0, sopra, col, al) {
  if (al <= 0.002) return;
  const n = 64, d = 4 / n;
  ctx.save(); ctx.globalAlpha *= al;
  for (let i = 0; i < n; i++) {
    const k = P(t, t0 + i * .01, t0 + .25 + i * .01); if (k <= 0) continue;
    const a = PL.toS(i * d, 0), b = PL.toS((i + 1) * d, f((sopra ? i + 1 : i) * d) * k);
    ctx.fillStyle = css(col, .28); ctx.fillRect(a[0], b[1], b[0] - a[0], a[1] - b[1]);
    ctx.strokeStyle = css(col, .9); ctx.lineWidth = 1; ctx.strokeRect(a[0], b[1], b[0] - a[0], a[1] - b[1]);
  }
  ctx.restore();
}
function freccia(ctx, x, y0, y1, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1 - 8); ctx.stroke(); ctx.restore();
  arrowHead(ctx, [x, y1], Math.PI / 2, col, .8 * k);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Calcolare un integrale', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano con la curva e le aree (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  PL.axes(ctx, P(t, 7.7, 8.7));
  txt(ctx, '0', PL.ox - 20, PL.oy + 31, { size: 30, color: C.dim, alpha: P(t, 8.3, 8.7) });
  // l'area da 0 a 4 (quella da calcolare): sparisce mentre si parla di a e b, tenue sotto i rettangoli
  // (compare a 8.2–8.9, mentre il primo fumetto dice «l'area colorata»)
  const r4 = kf(t, [[8.2, 0], [8.9, .25], [13.1, .25], [13.6, 0], [54.4, 0], [55.0, .25], [80.9, .25], [81.3, .1], [90.8, .1], [91.4, .3]]);
  regione(ctx, 0, 4, r4, C.g);
  const d4 = kf(t, [[8.3, 0], [8.9, 1], [13.1, 1], [13.6, 0], [54.4, 0], [55.0, 1]]);
  dashed(ctx, PL.toS(4, 0), PL.toS(4, f(4)), C.dim, d4 > 0 ? 1 : 0, .8 * d4);
  // la funzione integrale: l'area da 0 a x (13.1–24.2)
  const xa = life(t, 13.1, 24.2, .3, .4);
  if (xa > 0) {
    const x = kf(t, [[13.2, 0.02], [14.4, 2.6]]);
    ctx.save(); ctx.globalAlpha *= xa;
    regione(ctx, 0, x, .35, C.v);
    const p = PL.toS(x, 0);
    ctx.strokeStyle = css(C.x); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(...PL.toS(x, f(x))); ctx.stroke();
    dot(ctx, p, C.x, 1, 10);
    drawRich(ctx, 'area da 0 a {mx:x}', ...PL.toS(1.3, 0.45), { size: 34, weight: 600, alpha: P(t, 14.3, 14.8) });
    ctx.restore();
  }
  // a e b: area da 0 a b, meno area da 0 a a, resta l'area da a a b (24.2–54.4)
  const ab = life(t, 24.3, 54.4, .4, .5);
  if (ab > 0) {
    ctx.save(); ctx.globalAlpha *= ab;
    const kb = P(t, 24.6, 25.4), ka = P(t, 29.8, 30.4), g = P(t, 34.6, 35.4);
    regione(ctx, 0, A, .32 * kb * (1 - g), C.v);
    regione(ctx, 0, A, .38 * ka * (1 - g), C.x);
    regione(ctx, A, B, .32 * kb * (1 - g), C.v);
    regione(ctx, A, B, .35 * g, C.g);
    [[A, '{mink:a}'], [B, '{mink:b}']].forEach(([u, s]) => {
      dashed(ctx, PL.toS(u, 0), PL.toS(u, f(u)), C.ink, 1, .55);
      dot(ctx, PL.toS(u, 0), C.ink, 1, 9);
      drawRich(ctx, s, PL.toS(u, 0)[0], PL.oy + 36, { size: 42 });
    });
    drawRich(ctx, '{mv:F(b)}', ...PL.toS(2.5, 1.0), { size: 42, alpha: P(t, 24.9, 25.5) * (1 - P(t, 29.7, 30.1)) });
    drawRich(ctx, '{mv:F(a)}', ...PL.toS(0.75, 0.5), { size: 40, alpha: P(t, 30.1, 30.6) * (1 - P(t, 34.5, 34.9)) });
    ctx.restore();
  }
  // il controllo: 64 rettangoli sotto, poi 64 sopra (81.1–90.8)
  // (crescono in meno di 1 s; il numero nella scheda arriva appena finiscono, prima che Ada lo dica)
  rettangoli(ctx, t, 80.9, false, C.x, 1 - P(t, 85.3, 85.6));
  rettangoli(ctx, t, 85.6, true, C.v, 1 - P(t, 90.8, 91.3));
  glowStroke(ctx, CURVA, P(t, 7.7, 8.5), C.y, 5);
  drawRich(ctx, '{my:f(}{mx:x}{my:) = 1 + }{mx:x}{my:²/4}', ...PL.toS(1.75, 4.6), { size: 42, local: t - 8.6 });
  ctx.restore();
}

// la scheda a destra
function riga(ctx, label, val, y, col, k, kv) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  drawRich(ctx, label, 1170, y, { size: 38, align: 'left' });
  ctx.restore();
  fixedNum(ctx, val, 1765, y, 46, col, k * kv);
}
function linea(ctx, y, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= k;
  ctx.beginPath(); ctx.moveTo(1170, y); ctx.lineTo(1760, y); ctx.stroke(); ctx.restore();
}
function riquadro(ctx, y0, h, col, k, x0 = 1150, w = 630) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x0, y0, w, h, 18); ctx.stroke(); ctx.restore();
}
const CORPO = '{my:f(}{mx:x}{my:)}{mink: }{mx:dx}';
function scenePannello(ctx, t) {
  if (t < 8.0 || t > FINE + .2) return;
  const pa = life(t, 8.2, FINE, .5, .6);
  card(ctx, 1110, 130, 710, 640, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  // 1 · l'integrale da calcolare, la funzione integrale, il teorema (8.2–24.2)
  const a1 = 1 - P(t, 23.8, 24.2);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'integrale definito', 1465, 190, { size: 40, weight: 600 }));
    rigaInt(ctx, '{mink:0}', '{mink:4}', CORPO, '{mink: = ?}', 1465, 290, 50, t - 8.4);
    linea(ctx, 370, P(t, 13.2, 13.6));
    if (t > 13.3) drawRich(ctx, '{mv:F(}{mx:x}{mv:)}{mink: = }area da 0 a {mx:x}', 1465, 430, { size: 40, local: t - 13.3 });
    if (t > 13.8) drawRich(ctx, '{dim:funzione integrale}', 1465, 490, { size: 30, local: t - 13.8 });
    if (t > 18.6) drawRich(ctx, '{dim:teorema fondamentale:}', 1465, 590, { size: 30, local: t - 18.6 });
    if (t > 19.0) drawRich(ctx, '{mv:F′(}{mx:x}{mv:)}{mink: = }{my:f(}{mx:x}{my:)}', 1465, 670, { size: 56, local: t - 19.0 });
    ctx.restore();
  }
  // 2 · da a a b: F(b) − F(a), poi con una primitiva qualunque G (24.2–54.4)
  const a2 = life(t, 24.2, 54.4, .4, .4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, 'da {mink:a} a {mink:b}', 1465, 190, { size: 40, weight: 600 }));
    if (t > 24.4) drawRich(ctx, '{mv:F(b)}{mink: = }area da 0 a {mink:b}', 1465, 262, { size: 40, local: t - 24.4 });
    if (t > 29.8) drawRich(ctx, '{mv:F(a)}{mink: = }area da 0 a {mink:a}', 1465, 320, { size: 40, local: t - 29.8 });
    // il riquadro: prima F(b) − F(a), poi (49.3) G(b) − G(a); il vecchio esce prima che entri il nuovo
    const kq = P(t, 34.6, 35.1), YQ = 416;
    if (kq > 0) {
      const sw = P(t, 49.3, 49.7), nw = P(t, 49.8, 50.3);
      riquadro(ctx, YQ - 60, 120, mix(C.v, C.g, nw), kq);
      const size = 44, restoF = '{mink: = }{mv:F(b) − F(a)}', restoG = '{mink: = }{mv:G(b) − G(a)}';
      const mi = intMisure(ctx, '{mink:a}', '{mink:b}', CORPO, size), x0 = 1465 - (mi.w + Math.max(richW(ctx, restoF, size), richW(ctx, restoG, size))) / 2;
      drawInt(ctx, '{mink:a}', '{mink:b}', CORPO, x0, YQ, { size, local: t - 34.7 });
      drawRich(ctx, restoF, x0 + mi.w, YQ, { size, align: 'left', local: t - 35.1, alpha: 1 - sw });
      if (nw > 0) drawRich(ctx, restoG, x0 + mi.w, YQ, { size, align: 'left', alpha: nw });
    }
    if (t > 39.6) drawRich(ctx, '{dim:un\'altra primitiva: }{mv:G = F + c}', 1465, 526, { size: 40, local: t - 39.6 });
    // la c si cancella (senza parentesi, così la riga sta nella scheda)
    if (t > 45.0) drawRich(ctx, '{mv:G(b) − G(a)}', 1465, 580, { size: 40, local: t - 45.0 });
    if (t > 45.5) {
      const pre = '{mink:= }{mv:F(b) + }', cc = '{mv:c}', mid = '{mv: − F(a) − }', size = 40;
      const w0 = richW(ctx, pre, size), wc = richW(ctx, cc, size), w1 = richW(ctx, mid, size);
      const x0 = 1465 - (w0 + wc + w1 + wc) / 2;
      drawRich(ctx, pre + cc + mid + cc, x0, 634, { size, align: 'left', local: t - 45.5 });
      const kx = P(t, 46.4, 46.9);
      if (kx > 0) [x0 + w0, x0 + w0 + wc + w1].forEach(xc => {
        ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(xc - 3, 650); ctx.lineTo(xc - 3 + (wc + 6) * kx, 650 - 30 * kx); ctx.stroke(); ctx.restore();
      });
    }
    if (t > 47.2) drawRich(ctx, '{mink:= }{mv:F(b) − F(a)}', 1465, 688, { size: 40, local: t - 47.2 });
    ctx.restore();
  }
  // 3 · il calcolo (54.4–80.9)
  const a3 = life(t, 54.5, 80.9, .5, .4);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    conFont(TITOLI, () => drawRich(ctx, 'il calcolo, con {mink:a = 0} e {mink:b = 4}', 1465, 190, { size: 40, weight: 600 }));
    // termine per termine: f sopra, G sotto, una freccia per termine
    const XT1 = 1440, XP = 1530, XT2 = 1650, Y1 = 266, Y2 = 394;
    const k1 = P(t, 54.7, 55.3);
    drawRich(ctx, '{my:f(}{mx:x}{my:)}{mink: =}', 1360, Y1, { size: 46, align: 'right', alpha: k1 });
    drawRich(ctx, '{my:1}', XT1, Y1, { size: 46, alpha: k1 });
    drawRich(ctx, '{mink:+}', XP, Y1, { size: 46, alpha: k1 });
    drawRich(ctx, '{mx:x}{my:²/4}', XT2, Y1, { size: 46, alpha: k1 });
    const ku = P(t, 55.6, 56.1);
    if (ku > 0) [[XT1, 30], [XT2, 92]].forEach(([x, w]) => {
      ctx.save(); ctx.globalAlpha *= ku; ctx.strokeStyle = css(C.y); ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x - w / 2, Y1 + 32); ctx.lineTo(x + w / 2, Y1 + 32); ctx.stroke(); ctx.restore();
    });
    freccia(ctx, XT1, Y1 + 42, Y1 + 74, C.dim, P(t, 59.1, 59.5));
    freccia(ctx, XT2, Y1 + 42, Y1 + 74, C.dim, P(t, 59.1, 59.5));
    const k2 = P(t, 59.4, 60.0);
    drawRich(ctx, '{mv:G(}{mx:x}{mv:)}{mink: =}', 1360, Y2, { size: 46, align: 'right', alpha: k2 });
    drawRich(ctx, '{mx:x}', XT1, Y2, { size: 46, alpha: k2 });
    drawRich(ctx, '{mink:+}', XP, Y2, { size: 46, alpha: k2 });
    drawRich(ctx, '{mx:x}{mv:³/12}', XT2, Y2, { size: 46, alpha: P(t, 59.7, 60.3) });
    if (t > 64.1) {
      // G′ senza (x): più corta, staccata dal bordo della scheda e dalla riga di G
      drawRich(ctx, '{mv:G′ = 1 + 3}{mx:x}{mv:²/12}{mink: = }{my:1 + }{mx:x}{my:²/4}', 1445, 470, { size: 40, local: t - 64.1 });
      checkMark(ctx, 1760, 470, P(t, 66.2, 67.0), C.g, .3);
    }
    linea(ctx, 510, P(t, 69.0, 69.5));
    if (t > 69.1) drawRich(ctx, '{mv:G(4) = 4 + 64/12 = 28/3}', 1465, 552, { size: 44, local: t - 69.1 });
    if (t > 73.4) drawRich(ctx, '{mv:G(0) = 0}', 1465, 605, { size: 44, local: t - 73.4 });
    if (t > 76.5) {
      riquadro(ctx, 634, 122, C.g, P(t, 76.5, 77.1), 1130, 670);
      rigaInt(ctx, '{mink:0}', '{mink:4}', CORPO, '{mink: = 28/3 − 0 = }{mg:28/3}', 1465, 694, 44, t - 76.6);
    }
    ctx.restore();
  }
  // 4 · il controllo (80.9–FINE)
  const a4 = P(t, 81.0, 81.5);
  if (a4 > 0) {
    ctx.save(); ctx.globalAlpha *= a4;
    conFont(TITOLI, () => drawRich(ctx, 'il controllo', 1465, 190, { size: 40, weight: 600 }));
    riquadro(ctx, 222, 130, C.g, 1);
    rigaInt(ctx, '{mink:0}', '{mink:4}', CORPO, '{mink: = }{mg:28/3}', 1465, 287, 46, 99);
    riga(ctx, '64 rettangoli {x:sotto}', '9,21', 410, C.x, P(t, 81.1, 81.5), P(t, 81.7, 82.1));
    riga(ctx, '64 rettangoli {v:sopra}', '9,46', 480, C.v, P(t, 85.7, 86.1), P(t, 86.4, 86.8));
    linea(ctx, 530, P(t, 90.8, 91.2));
    // i numeri decimali nel carattere del testo (il «…» della matematica esce coi puntini spaziati)
    if (t > 90.9) drawRich(ctx, '{mg:28/3}{mink: = }{g:9,333…}', 1465, 595, { size: 46, local: t - 90.9 });
    if (t > 91.6) drawRich(ctx, '{x:9,21}{mink: < }{g:9,333…}{mink: < }{v:9,46}', 1465, 680, { size: 44, local: t - 91.6 });
    ctx.restore();
  }
  ctx.restore();
}

// in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L\'integrale da {mink:a} a {mink:b}\nè {mv:G(b) − G(a)}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mv:G}: una primitiva di {my:f}'], [960, '{mv:G} in {mink:b} meno {mv:G} in {mink:a}'], [1430, 'controllo con l\'{g:area}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 215, 450, 430, 100);
    drawRich(ctx, s, x, 502, { size: 33, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Calcolare un integrale', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 24.2, 'la funzione integrale'], [24.2, 54.4, 'la formula'], [54.4, 80.9, 'il calcolo'], [80.9, FINE, 'il controllo']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
