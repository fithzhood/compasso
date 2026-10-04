'use strict';
/* L'integrale come area: rettangoli sotto e sopra la curva, sempre più sottili, stringono l'area. Argomento: integrali. */
CVIDEO.registra('integrali/area', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW, drawSeq, fixedNum,
    dot, glowStroke, dashed, makePlane, card } = M;
  const f = x => 1 + x * x / 4;          // la curva del sito (animazione «riemann»): area fra 0 e 4 = 28/3 ≈ 9,33

const FINE = 95.9, DUR = 106.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.2, 'pensa'], [6.6, 'neutro'],
  [13.5, 'pensa'], [19.0, 'neutro'], [30.1, 'felice'], [32.3, 'neutro'],
  [36.3, 'sorpreso'], [38.4, 'neutro'], [47.9, 'sorpreso'], [50.0, 'neutro'], [52.5, 'felice'], [54.8, 'neutro'],
  [57.8, 'felice'], [60.0, 'neutro'], [63.3, 'sorpreso'], [65.4, 'neutro'], [68.9, 'festa'], [71.4, 'felice'],
  [74.2, 'neutro'], [79.2, 'occhiolino'], [81.2, 'neutro'], [90.0, 'felice'], [92.4, 'neutro'],
  [96.9, 'felice'], [100.4, 'occhiolino'], [102.4, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Quanto misura l\'area\nsotto una curva?'],
  [8.0, 13.4, 'Prendo la regione sotto {my:f},\nfra 0 e 4.'],
  [13.5, 18.8, 'Ha un lato {v:curvo}: nessuna formula\ndella geometria ne dà l\'area.'],
  [19.0, 24.7, 'Allora la riempio di {x:rettangoli}:\nne metto {mink:n} = 4, larghi 1.'],
  [24.8, 30.0, 'Ciascuno è alto quanto la curva\nnel suo lato {g:sinistro}.'],
  [30.1, 36.2, 'Le basi sono 1, quindi le aree\nsono le altezze: in tutto {x:7,5}.'],
  [36.3, 41.5, 'È {r:troppo poco}: restano fuori\ni pezzetti sopra i rettangoli.'],
  [41.8, 47.8, 'Ora li alzo fino al lato {g:destro}:\ncosì coprono tutta la regione.'],
  [47.9, 52.4, 'Questa somma fa {v:11,5}:\nstavolta è {r:troppo}.'],
  [52.5, 57.4, 'L\'area vera sta {g:in mezzo},\nfra 7,5 e 11,5.'],
  [57.8, 63.2, 'Con {mink:n} = 8 rettangoli più sottili\nla forbice si stringe.'],
  [63.3, 68.8, 'Con 64 i rettangoli sono quasi linee:\n{x:9,21} e {v:9,46}.'],
  [68.9, 73.8, 'Le due somme tendono\nallo stesso numero: {g:circa 9,33}.'],
  [74.2, 79.1, 'Quel numero si chiama\n{v:integrale definito}.'],
  [79.2, 84.5, 'Il segno {mv:∫} è una S allungata:\nsta per «somma».'],
  [84.6, 89.9, '{mink:f(x) dx} è un rettangolo\nalto {my:f(x)} e largo {mx:dx}.'],
  [90.0, 95.5, 'Qui {my:f} sta sopra l\'asse {mx:x}:\nl\'integrale è proprio l\'{g:area}.'],
  [96.9, 103.6, 'Rettangoli sempre più sottili:\nla loro somma tende all\'{g:area}.'],
];

// ---- il piano e gli aiutanti ----
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
  ctx.fillStyle = css(o.col || C.ink); ctx.fillText('∫', 0, 0);
  ctx.restore();
  drawRich(ctx, b, x0 + m.xb, y - m.top + m.ls * .45, { size: m.ls, align: 'left' });
  drawRich(ctx, a, x0 + m.xa, y + m.bot - m.ls * .3, { size: m.ls, align: 'left' });
  drawRich(ctx, corpo, x0 + m.xc, y, { size, align: 'left' });
  ctx.restore();
}
function rect(ctx, x0, y0, x1, y1, col, fa, la) {
  const a = PL.toS(x0, y0), b = PL.toS(x1, y1), w = b[0] - a[0];
  ctx.fillStyle = css(col, fa); ctx.fillRect(a[0], b[1], w, a[1] - b[1]);
  if (la > 0) { ctx.strokeStyle = css(col, la); ctx.lineWidth = Math.min(2.5, w * .12); ctx.strokeRect(a[0], b[1], w, a[1] - b[1]); }
}
// rettangoli sotto (alti come il lato sinistro), con i «cappelli» fino al lato destro
function rettangoli(ctx, n, al, grow, cap) {
  if (al <= 0) return;
  const d = 4 / n;
  ctx.save(); ctx.globalAlpha *= al;
  for (let i = 0; i < n; i++) {
    const a = i * d, b = a + d, gk = clamp(grow * 1.6 - i / n * .6);
    if (gk <= 0) continue;
    const hs = f(a) * E.out(gk);
    rect(ctx, a, 0, b, hs, C.x, .26, 1);
    if (cap > 0) rect(ctx, a, f(a), b, f(a) + (f(b) - f(a)) * cap, C.v, .22, 1);
  }
  ctx.restore();
}
// i pezzetti fra la curva e i rettangoli sotto
// (sopra = true: quelli fra la curva e il tetto dei rettangoli alti)
function pezzetti(ctx, n, al, sopra = false) {
  if (al <= 0) return;
  const d = 4 / n;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.r, .45);
  for (let i = 0; i < n; i++) {
    const a = i * d, b = a + d;
    ctx.beginPath(); ctx.moveTo(...PL.toS(a, f(a)));
    for (let j = 1; j <= 20; j++) { const x = lerp(a, b, j / 20); ctx.lineTo(...PL.toS(x, f(x))); }
    ctx.lineTo(...PL.toS(sopra ? a : b, sopra ? f(b) : f(a))); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function regione(ctx, al, b = 4) {
  if (al <= 0) return;
  ctx.save(); ctx.fillStyle = css(C.g, .22 * al);
  ctx.beginPath(); ctx.moveTo(...PL.toS(0, 0));
  for (let j = 0; j <= 80; j++) { const x = b * j / 80; ctx.lineTo(...PL.toS(x, f(x))); }
  ctx.lineTo(...PL.toS(b, 0)); ctx.closePath(); ctx.fill(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L\'integrale come area', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano con la curva (7.5–FINE)
// quanti rettangoli: [inizio del passaggio, n]
const PASSI = [[0, 4], [57.8, 8], [63.3, 64]];
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  PL.axes(ctx, P(t, 7.7, 8.7));
  txt(ctx, '0', PL.ox - 20, PL.oy + 31, { size: 30, color: C.dim, alpha: P(t, 8.3, 8.7) });
  // la regione: piena all'inizio, tenue sotto i rettangoli, di nuovo piena alla fine, più accesa quando è «l'area»
  const reg = kf(t, [[9.6, 0], [10.6, 1], [19.0, 1], [19.7, .35], [73.9, .35], [74.6, 1], [90.1, 1], [90.7, 1.9]]);
  regione(ctx, reg);
  dashed(ctx, PL.toS(4, 0), PL.toS(4, f(4)), C.dim, P(t, 9.8, 10.6), .8);
  // rettangoli: 19.0 → 74.2
  const ra = life(t, 19.0, 74.4, .3, .6);
  if (ra > 0) {
    const cap = P(t, 41.9, 43.1);
    for (let i = 0; i < PASSI.length; i++) {
      const [t0, n] = PASSI[i], nxt = PASSI[i + 1];
      const kin = i === 0 ? 1 : P(t, t0, t0 + .7), kout = nxt ? 1 - P(t, nxt[0], nxt[0] + .7) : 1;
      const a = Math.min(kin, kout);
      if (a > 0) rettangoli(ctx, n, ra * a, i === 0 ? P(t, 19.1, 20.2, E.lin) : 1, cap);
    }
    pezzetti(ctx, 4, life(t, 36.4, 41.9, .5, .5));
    pezzetti(ctx, 4, life(t, 48.0, 52.4, .5, .5), true);
    // i vertici sul lato sinistro, sulla curva
    const va = life(t, 24.9, 41.9, .4, .5);
    if (va > 0) for (let i = 0; i < 4; i++) dot(ctx, PL.toS(i, f(i)), C.g, va * P(t, 25.0 + i * .2, 25.4 + i * .2, E.back), 9);
    const vb = life(t, 42.9, 52.4, .4, .5);
    if (vb > 0) for (let i = 1; i <= 4; i++) dot(ctx, PL.toS(i, f(i)), C.v, vb * P(t, 42.9 + i * .15, 43.3 + i * .15, E.back), 9);
  }
  // f(x) dx: un rettangolo solo, sottile
  const sa = life(t, 84.7, 89.9, .5, .4);
  if (sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa;
    const a = 2.45, b = 2.65;
    rect(ctx, a, 0, b, f(a), C.v, .4, 1);
    const pm = PL.toS(a, f(a) * .38);
    drawRich(ctx, '{my:f(}{mx:x}{my:)}', pm[0] - 16, pm[1], { size: 40, align: 'right' });
    drawRich(ctx, '{mx:dx}', PL.toS((a + b) / 2, 0)[0], PL.oy + 34, { size: 38 });
    ctx.restore();
  }
  // «area» dentro la regione, quando Ada dice che l'integrale è proprio l'area
  const aa = P(t, 90.3, 90.9);
  if (aa > 0) drawRich(ctx, '{g:area}', ...PL.toS(2.75, 1.1), { size: 44, weight: 600, alpha: aa });
  // la curva e il suo nome
  const pulse = life(t, 13.7, 18.6, .5, .6);
  glowStroke(ctx, CURVA, P(t, 8.1, 9.4), mix(C.y, C.v, pulse), 5 + 3 * pulse);
  drawSeq(ctx, ['{my:f(}{mx:x}{my:) = 1 +}', { num: '{mx:x}{my:²}', den: '{my:4}' }], ...PL.toS(1.5, 4.5), 40, { local: t - 9.4 });   // staccata dal rettangolo viola in x = 3
  ctx.restore();
}

// la scheda a destra: le somme (19–74.2), poi l'integrale (74.2–FINE)
const RIGHE = [[4, '7,50', '11,50', 19.3, 30.4, 48.0], [8, '8,38', '10,38', 58.4, 58.4, 58.4], [64, '9,21', '9,46', 63.9, 63.9, 63.9]];
function scenePannello(ctx, t) {
  if (t < 19 || t > FINE + .2) return;
  const pa = life(t, 19.2, FINE, .5, .6);
  card(ctx, 1110, 150, 710, 620, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  const sa = 1 - P(t, 73.9, 74.5);
  if (sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa;
    conFont(TITOLI, () => drawRich(ctx, 'somma delle aree', 1465, 215, { size: 40, weight: 600 }));
    drawRich(ctx, '{mink:n}', 1250, 300, { size: 36 });
    txt(ctx, 'sotto', 1500, 300, { size: 30, color: C.x, alpha: P(t, 30.3, 30.8) });
    txt(ctx, 'sopra', 1700, 300, { size: 30, color: C.v, alpha: P(t, 47.9, 48.4) });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1160, 330); ctx.lineTo(1770, 330); ctx.stroke();
    RIGHE.forEach(([n, s, S, t0, t1, t2], i) => {
      const y = 390 + i * 70, k0 = P(t, t0, t0 + .45, E.out), k1 = P(t, t1, t1 + .45, E.out), k2 = P(t, t2, t2 + .45, E.out);
      txt(ctx, String(n), 1250, y, { size: 40, alpha: k0 });
      fixedNum(ctx, s, 1565, y, 42, C.x, k1);
      fixedNum(ctx, S, 1770, y, 42, C.v, k2);
    });
    // le due somme scritte per esteso: base 1 per altezza
    const s1 = life(t, 30.4, 41.6, .5, .5), s2 = life(t, 48.0, 52.4, .5, .4);
    if (s1 > 0) drawRich(ctx, '{mink:1 · (1 + 1,25 + 2 + 3,25) = }{mx:7,5}', 1465, 690, { size: 38, alpha: s1, local: t - 30.4 });
    if (s2 > 0) drawRich(ctx, '{mink:1 · (1,25 + 2 + 3,25 + 5) = }{mv:11,5}', 1465, 690, { size: 38, alpha: s2, local: t - 48.0 });
    const fa = life(t, 52.6, 57.6, .5, .5);
    if (fa > 0) drawRich(ctx, '{x:7,5}{mink: ≤ }{g:area}{mink: ≤ }{v:11,5}', 1465, 690, { size: 42, alpha: fa, local: t - 52.6 });
    if (t > 69.0) drawRich(ctx, '{g:area}{mink: ≈ }{mg:9,33}', 1465, 690, { size: 46, local: t - 69.0 });
    ctx.restore();
  }
  const ia = P(t, 74.4, 75.0);
  if (ia > 0) {
    ctx.save(); ctx.globalAlpha *= ia;
    conFont(TITOLI, () => drawRich(ctx, 'integrale definito', 1465, 215, { size: 40, weight: 600 }));
    // il segno ∫ si accende mentre Ada ne parla; f(x) dx si sottolinea
    const accS = life(t, 79.3, 84.4, .4, .5), accR = life(t, 84.7, 89.8, .4, .5);
    const corpo = '{my:f(}{mx:x}{my:)}{mink: }{mx:dx}', size = 66, resto = '{mink: ≈ }{mg:9,33}';
    const mi = intMisure(ctx, '{mink:0}', '{mink:4}', corpo, size), wR = richW(ctx, resto, size);
    const x0 = 1465 - (mi.w + wR) / 2, y = 400;
    drawInt(ctx, '{mink:0}', '{mink:4}', corpo, x0, y, { size, local: t - 74.5, col: mix(C.ink, C.v, accS) });
    if (accR > 0) {
      ctx.save(); ctx.globalAlpha *= accR; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x0 + mi.xc, y + size * .66); ctx.lineTo(x0 + mi.w, y + size * .66); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, resto, x0 + mi.w, y, { size, align: 'left', local: t - 75.1 });
    drawRich(ctx, '{dim:il limite delle somme dei rettangoli}', 1465, 590, { size: 30, local: t - 75.6 });
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
    drawRich(ctx, 'L\'integrale è il limite\ndelle somme di {g:rettangoli}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'rettangoli {x:sotto} e {v:sopra}'], [960, 'sempre più {g:sottili}'], [1430, 'il limite è l\'{g:area}']];
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
    titolo: 'L\'integrale come area', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 57.6, 'i rettangoli'], [57.6, 74.0, 'più sottili'], [74.0, FINE, 'l\'integrale']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
