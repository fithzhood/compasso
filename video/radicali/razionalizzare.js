'use strict';
/* Razionalizzare — togliere la radice dal denominatore moltiplicando sopra e sotto per lo stesso fattore (≠ 0):
   1/√2 = √2/2, e 1/(√3 − 1) = (√3 + 1)/2 con la somma per differenza. Il valore decimale non cambia. Argomento: radicali. */
CVIDEO.registra('radicali/razionalizzare', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, txt, card, checkMark, crossMark } = M;

const FINE = 82, DURATA = 94;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [27.4, 'felice'], [29.5, 'neutro'],
  [36.7, 'felice'], [38.8, 'neutro'], [41.5, 'festa'], [44.0, 'neutro'], [46.8, 'pensa'], [51.6, 'neutro'],
  [56.7, 'felice'], [58.8, 'neutro'], [71.2, 'felice'], [73.3, 'neutro'], [75.7, 'festa'], [78.5, 'neutro'],
  [FINE + 1.0, 'felice'], [89.0, 'occhiolino'], [91.2, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Come si toglie una radice\ndal denominatore?'],
  // 1 · perché
  [7.9, 12.6, '{mink:1/√2} è un numero giusto, ma ha\nuna radice al {x:denominatore}.'],
  [12.7, 17.6, 'Per convenzione non si lascia lì:\n{v:razionalizzare} vuol dire toglierla.'],
  [17.7, 22.3, 'Il numero deve restare lo stesso:\n{mink:1/√2 = }0,7071…'],
  // 2 · con √2 sotto
  [22.5, 27.3, 'Moltiplico sopra e sotto per lo\nstesso numero, {mink:√2}, che non è 0.'],
  [27.4, 31.9, '{mink:√2/√2 = 1}: moltiplicare per 1\nnon cambia il numero.'],
  [32.0, 36.6, 'Sopra per sopra, sotto per sotto:\n{mink:1 · √2} e {mink:√2 · √2}.'],
  [36.7, 41.4, 'Sotto {mink:√2 · √2 = 2}, perché {mink:√2}\nè il numero che al quadrato fa 2.'],
  [41.5, 46.4, 'Controllo: {mink:√2/2 = }0,7071…,\nproprio come prima.'],
  // 3 · un binomio sotto
  [46.8, 51.5, 'E se sotto c\'è {mink:√3 − 1}?\nUna radice {x:meno} un numero.'],
  [51.6, 56.6, 'Per {mink:√3} non basta: {mink:(√3 − 1) · √3}\nfa {mink:3 − √3}, e la radice resta.'],
  [56.7, 61.7, 'Uso {mink:√3 + 1}, il {v:razionalizzante}:\nha il segno centrale cambiato.'],
  [61.8, 66.5, 'Sopra resta {mink:√3 + 1}. Sotto c\'è\nuna somma per una differenza.'],
  [66.6, 71.1, 'Fa la differenza dei quadrati:\n{mink:(√3)² − 1²}.'],
  [71.2, 75.6, '{mink:(√3)² = 3}, quindi sotto\nresta {mink:3 − 1 = 2}.'],
  [75.7, 80.6, 'Controllo: tutti e due valgono\n1,3660… e sono lo {g:stesso numero}.'],
  // chiusura
  [83.6, 91.0, 'Stesso numero, scritto\nsenza radici al denominatore.'],
];
const CAPITOLI = [[7.5, 22.4, 'perché razionalizzare'], [22.4, 46.6, 'una radice sotto'], [46.6, FINE, 'un binomio sotto']];

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
const meno = (k = 'ink') => [R('3', k), `{m${k}: − 1}`], piu = (k = 'ink') => [R('3', k), `{m${k}: + 1}`];

// 1 · perché (7.5–22.5)
function scenePerche(ctx, t) {
  if (t < 7.5 || t > 22.6) return;
  const al = 1 - P(t, 22.0, 22.5);
  ctx.save(); ctx.globalAlpha *= al;
  const S = 140, X = 760, Y = 400, fr = F('{mink:1}', [R('2')]);
  formula(ctx, [fr], X, Y, S, { alpha: P(t, 8.1, 8.6) });
  // il denominatore, evidenziato quando Ada lo nomina
  const kd = P(t, 9.4, 9.9);
  if (kd > 0) {
    const q = mis(ctx, [R('2')], S), g = S * .12;
    ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = css(C.x); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(X - q.w / 2 - 26, Y + g * .6, q.w + 52, g * .4 + q.a + q.d + 20, 18); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{x:denominatore}', X + q.w / 2 + 50, Y + g + q.a - 4, { size: 38, align: 'left', alpha: kd });
  }
  drawRich(ctx, '{v:razionalizzare}{dim:: togliere la radice dal denominatore}', 960, 690, { size: 40, alpha: P(t, 12.9, 13.4) });
  formula(ctx, ['{mink:= }', '{ink:0,7071…}'], X + 130, Y, 90, { align: 'left', alpha: P(t, 17.9, 18.4) });
  ctx.restore();
}

// 2 · con √2 sotto (22.5–46.6)
const CAT2 = [
  [22.5, F('{mink:1}', [R('2')])], [22.8, '{mink: · }'], [22.8, F([R('2', 'v')], [R('2', 'v')])],
  [32.2, '{mink: = }'], [32.2, F(['{mink:1 · }', R('2')], [R('2'), '{mink: · }', R('2')])],
  [36.9, '{mink: = }'], [36.9, F([R('2')], '{mg:2}')],
];
function sceneDue(ctx, t) {
  if (t < 22.3 || t > 46.8) return;
  const al = life(t, 22.4, 46.7, .5, .5);
  ctx.save(); ctx.globalAlpha *= al;
  const S = 100, Y = 330, voci = CAT2.map(c => c[1]);
  formula(ctx, voci, 960, Y, S, { al: i => P(t, CAT2[i][0], CAT2[i][0] + .5, E.out) });
  // √2/√2 vale 1
  const kb = life(t, 27.6, 32.1, .4, .4);
  if (kb > 0) {
    const { xs, ws } = posizioni(ctx, voci, 960, S), x0 = xs[2] + 10, x1 = xs[2] + ws[2] - 10, yb = Y + 150;
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, yb - 14); ctx.lineTo(x0, yb); ctx.lineTo(x1, yb); ctx.lineTo(x1, yb - 14); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:= }{mg:1}', (x0 + x1) / 2, yb + 50, { size: 56, alpha: kb });
  }
  // lo stesso numero, prima e dopo
  formula(ctx, [F('{mink:1}', [R('2')]), '{mink: = }', '{ink:0,7071…}'], 600, 650, 64, { alpha: P(t, 23.0, 23.5) });
  formula(ctx, [F([R('2')], '{mink:2}'), '{mink: = }', '{g:0,7071…}'], 1320, 650, 64, { alpha: P(t, 41.7, 42.2) });
  ctx.restore();
}

// 3 · un binomio sotto (46.6–FINE)
const RIGA1 = [
  [46.9, F('{mink:1}', meno())], [56.9, '{mink: · }'], [56.9, F(piu('v'), piu('v'))],
];
const RIGA2 = [
  [61.9, '{mink:= }'], [61.9, F(piu(), [{ par: meno() }, { par: piu() }])],
  [66.7, '{mink: = }'], [66.7, F(piu(), [{ b: [{ par: [R('3')] }], e: ['{mink:2}'] }, '{mink: − 1²}'])],
  [71.3, '{mink: = }'], [71.3, F(piu(), '{mg:2}')],
];
function sceneTre(ctx, t) {
  if (t < 46.4 || t > FINE + .4) return;
  const al = life(t, 46.6, FINE + .2, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  formula(ctx, RIGA1.map(c => c[1]), 960, 262, 74, { al: i => P(t, RIGA1[i][0], RIGA1[i][0] + .5, E.out) });
  formula(ctx, RIGA2.map(c => c[1]), 960, 500, 64, { al: i => P(t, RIGA2[i][0], RIGA2[i][0] + .5, E.out) });
  // il tentativo che non basta
  const kt = life(t, 51.8, 56.7, .4, .4);
  if (kt > 0) {
    const w = formula(ctx, ['{mink:(}', R('3'), '{mink: − 1) · }', R('3'), '{mink: = 3 − }', R('3', 'r')], 900, 500, 76, { alpha: kt });
    crossMark(ctx, 900 + w / 2 + 90, 500, P(t, 52.6, 53.4) * kt, C.r, .45);
  }
  // promemoria: somma per differenza
  const kp = life(t, 62.0, 75.7, .4, .4);
  if (kp > 0) { ctx.save(); ctx.globalAlpha *= kp; promemoria(ctx, 'somma per differenza:', ['{mink:(x + y)(x − y) = x² − y²}'], 704, 60); ctx.restore(); }
  // lo stesso numero, prima e dopo
  const kc = P(t, 75.9, 76.4);
  if (kc > 0) {
    formula(ctx, [F('{mink:1}', meno()), '{mink: = }', '{ink:1,3660…}'], 610, 700, 50, { alpha: kc });
    formula(ctx, [F(piu(), '{mink:2}'), '{mink: = }', '{g:1,3660…}'], 1310, 700, 50, { alpha: kc });
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Sopra e sotto per lo stesso fattore:\nil numero resta, la radice se ne va.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [430, [F('{mink:1}', [R('2')]), '{mink: = }', F([R('2')], '{mink:2}')], 'per {mink:√2}', 64],
    [960, [F('{mink:1}', meno()), '{mink: = }', F(piu(), '{mink:2}')], 'per {mink:√3 + 1}', 52],
    [1490, ['{mink:(}', R('3'), '{mink: − 1)(}', R('3'), '{mink: + 1) = 2}'], 'somma per differenza', 42],
  ];
  pills.forEach(([x, v, s, fs], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 255, 400, 510, 264);
    formula(ctx, v, x, 500, fs);
    drawRich(ctx, s, x, 622, { size: 34, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Razionalizzare', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

  return {
    titolo: 'Razionalizzare', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .3, .6, .6)); scenePerche(ctx, t); sceneDue(ctx, t); sceneTre(ctx, t); sceneFine(ctx, t); },
  };
});
