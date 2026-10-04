'use strict';
/* Il prodotto di due radici — √3 · √12 = √36 = 6; perché √a · √b = √(a · b): il suo quadrato è a · b e non è negativo. Argomento: radicali. */
CVIDEO.registra('radicali/prodotto', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, txt, card } = M;

const FINE = 56.2, DURATA = 68.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [17.4, 'felice'], [19.5, 'neutro'],
  [21.7, 'festa'], [24.0, 'neutro'], [26.7, 'pensa'], [31.5, 'neutro'], [51.1, 'felice'], [53.2, 'neutro'],
  [FINE + 1.0, 'felice'], [63.2, 'occhiolino'], [65.4, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Quanto fa {mink:√3 · √12}?\nSembra un conto scomodo.'],
  // 1 · un esempio
  [7.9, 12.4, 'Da sole non sono numeri interi:\n{mink:√3 = }1,732…, {mink:√12 = }3,464…'],
  [12.5, 17.3, 'Ma il prodotto sì: metto i radicandi\nsotto un\'unica radice.'],
  [17.4, 21.6, '{mink:3 · 12 = 36}, e {mink:√36 = 6}.'],
  [21.7, 26.4, 'Con la calcolatrice:\n1,732… {mink:·} 3,464… {mink:= 6}. Torna!'],
  // 2 · perché funziona
  [26.7, 31.4, 'Perché? Prendo due numeri\n{mink:a ≥ 0} e {mink:b ≥ 0}.'],
  [31.5, 36.3, 'Elevo {mink:√a · √b} al quadrato:\nogni fattore va al quadrato.'],
  [36.4, 41.0, '{mink:(√a)² = a} e {mink:(√b)² = b}:\nresta {mink:a · b}.'],
  [41.1, 46.0, 'Quindi {mink:√a · √b} è un numero\nche al quadrato fa {mink:a · b}.'],
  [46.1, 51.0, 'E non è negativo, perché le due\nradici non sono negative.'],
  [51.1, 56.1, 'Il numero non negativo che al quadrato\nfa {mink:a · b} è la {g:radice di} {mink:a · b}.'],
  // chiusura
  [57.8, 65.2, 'Prima moltiplico i radicandi,\npoi estraggo la radice.'],
];
const CAPITOLI = [[7.5, 26.5, 'un esempio'], [26.5, FINE, 'perché funziona']];

// ---------- formule: frazioni, potenze con esponente frazionario, radici col trattino sopra ----------
// voce: stringa (testo ricco) | array di voci | {num, den} | {b, e}: base ed esponente | {rad, idx}: radice | {par}: parentesi alte
const ESP = .55;   // l'esponente è grande poco più di metà della base
function mis(ctx, v, s) {
  if (typeof v === 'string') return { w: richW(ctx, v, s), a: s * .58, d: s * .42 };
  if (Array.isArray(v)) {
    let w = 0, a = 0, d = 0;
    v.forEach(x => { const m = mis(ctx, x, s); w += m.w; a = Math.max(a, m.a); d = Math.max(d, m.d); });
    return { w, a, d };
  }
  if (v.num !== undefined) {
    const n = mis(ctx, v.num, s), q = mis(ctx, v.den, s), g = s * .12;
    return { w: Math.max(n.w, q.w) + s * .24, a: g + n.a + n.d, d: g + q.a + q.d };
  }
  if (v.b !== undefined) {
    const b = mis(ctx, v.b, s), e = mis(ctx, v.e, s * ESP);
    return { w: b.w + e.w + s * .02, a: Math.max(b.a, su(e, s) + e.a), d: b.d };
  }
  if (v.rad !== undefined) {
    const r = mis(ctx, v.rad, s);
    return { w: idxW(ctx, v, s) + s * .6 + r.w + s * .08, a: r.a + s * .18, d: r.d + s * .06 };
  }
  if (v.par !== undefined) {
    const r = mis(ctx, v.par, s), pw = richW(ctx, '{mink:(}', s);
    return { w: r.w + 2 * pw, a: r.a + s * .06, d: r.d + s * .06 };
  }
  return { w: 0, a: 0, d: 0 };
}
const su = (e, s) => Math.max(s * .42, e.d - s * .08);   // di quanto sale il centro dell'esponente
const idxW = (ctx, v, s) => v.idx ? Math.max(0, richW(ctx, v.idx, s * .5) - s * .14) : 0;
function dis(ctx, v, x, cy, s) {
  if (typeof v === 'string') { drawRich(ctx, v, x, cy, { size: s, align: 'left' }); return; }
  if (Array.isArray(v)) { let xx = x; v.forEach(q => { dis(ctx, q, xx, cy, s); xx += mis(ctx, q, s).w; }); return; }
  const col = css(C[v.col || 'ink']);
  if (v.num !== undefined) {
    const n = mis(ctx, v.num, s), q = mis(ctx, v.den, s), g = s * .12, w = Math.max(n.w, q.w) + s * .24;
    dis(ctx, v.num, x + (w - n.w) / 2, cy - g - n.d, s);
    dis(ctx, v.den, x + (w - q.w) / 2, cy + g + q.a, s);
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(2.5, s * .05); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + s * .06, cy); ctx.lineTo(x + w - s * .06, cy); ctx.stroke(); ctx.restore();
    return;
  }
  if (v.b !== undefined) {
    const b = mis(ctx, v.b, s), e = mis(ctx, v.e, s * ESP);
    dis(ctx, v.b, x, cy, s);
    dis(ctx, v.e, x + b.w - s * .01, cy - su(e, s), s * ESP);
    return;
  }
  if (v.rad !== undefined) {
    const r = mis(ctx, v.rad, s), x0 = x + idxW(ctx, v, s);
    const top = cy - r.a - s * .1, bot = cy + r.d + s * .02;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(2.5, s * .05); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x0 + s * .03, cy + s * .1); ctx.lineTo(x0 + s * .13, cy + s * .03);
    ctx.lineTo(x0 + s * .3, bot); ctx.lineTo(x0 + s * .54, top); ctx.lineTo(x0 + s * .62 + r.w + s * .04, top); ctx.stroke(); ctx.restore();
    if (v.idx) drawRich(ctx, v.idx, x0 + s * .2, cy - s * .26, { size: s * .5, align: 'right' });
    dis(ctx, v.rad, x0 + s * .6, cy, s);
    return;
  }
  if (v.par !== undefined) {
    const r = mis(ctx, v.par, s), pw = richW(ctx, '{mink:(}', s);
    const h = r.a + r.d + s * .12, k = Math.max(1, h / (s * 1.25)), mid = cy + (r.d - r.a) / 2;
    [['(', x], [')', x + pw + r.w]].forEach(([p, px]) => {
      ctx.save(); ctx.translate(0, mid); ctx.scale(1, k); drawRich(ctx, `{mink:${p}}`, px, 0, { size: s, align: 'left' }); ctx.restore();
    });
    dis(ctx, v.par, x + pw, cy, s);
  }
}
// una riga di voci; o.al(i) dà l'alfa di ogni voce (per farle comparire una alla volta)
function formula(ctx, voci, x, cy, s, o = {}) {
  const al = o.alpha ?? 1; if (al <= 0.002) return 0;
  const ws = voci.map(v => mis(ctx, v, s).w), tot = ws.reduce((a, b) => a + b, 0);
  let xx = o.align === 'left' ? x : o.align === 'right' ? x - tot : x - tot / 2;
  voci.forEach((v, i) => {
    const k = o.al ? o.al(i) : 1;
    if (k > 0.002) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); dis(ctx, v, xx, cy, s); ctx.restore(); }
    xx += ws[i];
  });
  return tot;
}

// dove comincia ogni voce di una riga centrata in cx
function posizioni(ctx, voci, cx, s) {
  const ws = voci.map(v => mis(ctx, v, s).w), tot = ws.reduce((a, b) => a + b, 0), xs = [];
  let x = cx - tot / 2; ws.forEach(w => { xs.push(x); x += w; });
  return { xs, ws };
}
// un promemoria: nome a sinistra, formula a destra, su un fondino centrato
function promemoria(ctx, nome, voci, y, s) {
  ctx.font = '500 34px Lexend, "Segoe UI", sans-serif';
  const wn = ctx.measureText(nome).width, wf = voci.reduce((a, v) => a + mis(ctx, v, s).w, 0);
  const w = wn + 40 + wf + 80, x0 = 960 - w / 2;
  ctx.fillStyle = css(C.v, .08); ctx.beginPath(); ctx.roundRect(x0, y - 58, w, 116, 18); ctx.fill();
  txt(ctx, nome, x0 + 40, y - 2, { size: 34, color: C.dim, align: 'left' });
  formula(ctx, voci, x0 + 40 + wn + 40, y + 2, s, { align: 'left' });
}

// voci che servono spesso
const R = (r, k = 'ink') => ({ rad: [`{m${k}:${r}}`], col: k });
const F = (num, den) => ({ num, den });
const AB = [R('a'), '{mink: · }', R('b')];
// una voce che compare da t0 in poi
const riga = (ctx, t, voci, x, y, s, tempi) => formula(ctx, voci, x, y, s, { al: i => P(t, tempi[i], tempi[i] + .5, E.out) });

// 1 · un esempio: √3 · √12 (7.5–26.5)
function sceneEsempio(ctx, t) {
  if (t < 7.5 || t > 26.8) return;
  const al = 1 - P(t, 26.1, 26.6);
  ctx.save(); ctx.globalAlpha *= al;
  const ES = [R('3'), '{mink: · }', R('12'), '{mink: = }', { rad: ['{mink:3 · 12}'] }, '{mink: = }', R('36'), '{mink: = }', '{mg:6}'];
  const { ws } = posizioni(ctx, ES, 960, 110), lungo = n => ws.slice(0, n).reduce((a, b) => a + b, 0), tot = lungo(9);
  const sposta = kf(t, [[12.5, (tot - lungo(3)) / 2], [13.2, (tot - lungo(5)) / 2], [17.4, (tot - lungo(5)) / 2], [18.1, (tot - lungo(7)) / 2], [18.3, (tot - lungo(7)) / 2], [18.9, 0]]);
  riga(ctx, t, ES, 960 + sposta, 290, 110, [8.0, 8.0, 8.0, 12.7, 12.7, 17.6, 17.6, 18.4, 18.4]);
  formula(ctx, [R('3'), '{mink: = }', '{ink:1,732…}'], 640, 520, 64, { alpha: P(t, 8.3, 8.8) });
  formula(ctx, [R('12'), '{mink: = }', '{ink:3,464…}'], 1280, 520, 64, { alpha: P(t, 8.5, 9.0) });
  formula(ctx, ['{ink:1,732… }', '{mink:· }', '{ink:3,464… }', '{mink:= }', '{mg:6}'], 960, 690, 64, { alpha: P(t, 21.9, 22.4) });
  ctx.restore();
}

// 2 · perché funziona (26.5–56.2)
function scenePerche(ctx, t) {
  if (t < 26.3 || t > 56.5) return;
  const al = life(t, 26.5, FINE + .2, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mink:a ≥ 0,  b ≥ 0}', 1790, 750, { size: 46, align: 'right', alpha: P(t, 27.0, 27.5) });
  // prima √a · √b da solo, poi la catena col quadrato
  formula(ctx, AB, 960, 250, 96, { alpha: life(t, 26.9, 31.7, .4, .3) });
  riga(ctx, t, [{ b: [{ par: AB }], e: ['{mink:2}'] }, '{mink: = }', { b: [{ par: [R('a')] }], e: ['{mink:2}'] }, '{mink: · }', { b: [{ par: [R('b')] }], e: ['{mink:2}'] },
    '{mink: = }', '{mg:a · b}'], 960, 250, 96, [31.7, 32.2, 32.2, 32.2, 32.2, 36.6, 36.6]);
  // le due cose che si sanno di √a · √b
  formula(ctx, [...AB, '{dim:   al quadrato fa   }', '{mink:a · b}'], 960, 430, 64, { alpha: P(t, 41.3, 41.8) });
  formula(ctx, [...AB, '{mink: ≥ 0}'], 960, 550, 64, { alpha: P(t, 46.3, 46.8) });
  const kr = P(t, 51.3, 51.8, E.out);
  if (kr > 0) {
    ctx.save(); ctx.globalAlpha *= kr;
    ctx.fillStyle = css(C.g, .1); ctx.beginPath(); ctx.roundRect(560, 628, 800, 136, 24); ctx.fill();
    formula(ctx, [...AB, '{mink: = }', { rad: ['{mg:a · b}'], col: 'g' }], 960, 700, 84);
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il prodotto di due radici quadrate\nè la radice del prodotto.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [700, [...AB, '{mink: = }', { rad: ['{mink:a · b}'] }], 'con {mink:a ≥ 0}, {mink:b ≥ 0}', 54],
    [1220, [R('3'), '{mink: · }', R('12'), '{mink: = }', R('36'), '{mink: = 6}'], 'per esempio', 46],
  ];
  pills.forEach(([x, v, s, fs], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 255, 400, 510, 264);
    formula(ctx, v, x, 505, fs);
    drawRich(ctx, s, x, 622, { size: 34, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il prodotto di due radici', W / 2, 180, { size: 116, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

  return {
    titolo: 'Il prodotto di due radici', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .3, .6, .6)); sceneEsempio(ctx, t); scenePerche(ctx, t); sceneFine(ctx, t); },
  };
});
