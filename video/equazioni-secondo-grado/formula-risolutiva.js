'use strict';
/* Da dove viene la formula — da ax² + bx + c = 0 (a ≠ 0): per 4a, b² ai due membri, (2ax + b)² = b² − 4ac, la radice col ±,
   la formula risolutiva; Δ = b² − 4ac e i suoi tre casi; la prova con x² + 4x − 21 = 0. Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/formula-risolutiva', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, txt, card } = M;

const FINE = 90.8, DUR = 102.3;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [12.6, 'pensa'], [14.7, 'neutro'], [29.5, 'sorpreso'], [31.6, 'neutro'], [37.3, 'felice'], [39.4, 'neutro'],
  [55.1, 'festa'], [57.5, 'neutro'], [64.0, 'felice'], [66.1, 'neutro'], [73.0, 'sorpreso'], [75.1, 'neutro'],
  [86.1, 'festa'], [88.4, 'neutro'], [95.5, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.6, 6.3, 'Da dove viene la formula che\nrisolve {mink:ax² + bx + c = 0}?'],
  // 1 · completare il quadrato
  [7.9, 12.5, 'Parto dalla forma normale: {mink:a}, {mink:b}\ne {mink:c} sono numeri, e {mink:a ≠ 0}.'],
  [12.6, 16.8, 'L\'idea: rendere il primo membro\nun {v:quadrato perfetto}.'],
  [16.9, 21.2, 'Moltiplico tutto per {mink:4a}:\nsi può, perché {mink:4a ≠ 0}.'],
  [21.3, 25.1, 'Porto {mink:4ac} a destra,\ncambiando segno.'],
  [25.2, 29.4, 'A sinistra ci sono {mink:(2ax)²}\ne {mink:2 · 2ax · b}.'],
  [29.5, 33.4, 'Per avere {mink:(2ax + b)²}\nmanca solo {mg:b²}.'],
  [33.5, 37.2, 'Aggiungo {mg:b²} a tutti e due\ni membri.'],
  [37.3, 41.0, 'A sinistra c\'è proprio\n{mink:(2ax + b)²}.'],
  [41.1, 45.8, 'Se {mink:b² − 4ac} non è negativo,\n{mink:2ax + b} è la sua radice o l\'opposta.'],
  [45.9, 50.3, '{mink:±} si legge «più o meno»:\nvale per tutte e due.'],
  // 2 · la formula e il discriminante
  [50.4, 55.0, 'Porto {mink:b} a destra e divido per {mink:2a},\nche non è zero.'],
  [55.1, 59.6, '{mink:x₁} e {mink:x₂} sono le due soluzioni:\nè la {g:formula risolutiva}.'],
  [59.7, 63.9, 'Sotto radice c\'è il {v:discriminante}:\nsi scrive {mink:Δ}, «delta».'],
  [64.0, 68.4, '{mink:Δ > 0}: col più e col meno escono\ndue soluzioni {g:distinte}.'],
  [68.5, 72.9, '{mink:Δ = 0}: la radice è zero, e resta\nuna soluzione sola, {g:doppia}.'],
  [73.0, 77.0, '{mink:Δ < 0}: la radice non esiste,\n{r:nessuna soluzione reale}.'],
  // 3 · una prova
  [77.1, 81.9, 'Proviamo: {mink:x² + 4x − 21 = 0},\ncon {mink:a = 1}, {mink:b = 4}, {mink:c = −21}.'],
  [82.0, 86.0, '{mink:Δ = 16 + 84 = 100}:\npositivo, e {mink:√100 = 10}.'],
  [86.1, 90.6, '{mink:x₁ = (−4 + 10) / 2 = 3},\n{mink:x₂ = (−4 − 10) / 2 = −7}.'],
  // chiusura
  [93.6, 99.4, 'Moltiplico per {mink:4a}, completo il\nquadrato, estraggo la radice.'],
];

let TNOW = 0;   // l'istante del fotogramma, per le voci che compaiono da sole (il pedice di x)
// ---------- formule: frazioni, radici col trattino sopra, pedici ----------
// voce: stringa (testo ricco) | array di voci | {num, den} | {rad} radice | {b, s}: base e pedice
function mis(ctx, v, s) {
  if (typeof v === 'string') return { w: richW(ctx, v, s), a: s * (/[²³′]/.test(v) ? .76 : .58), d: s * .42 };
  if (Array.isArray(v)) {
    let w = 0, a = 0, d = 0;
    v.forEach(x => { const m = mis(ctx, x, s); w += m.w; a = Math.max(a, m.a); d = Math.max(d, m.d); });
    return { w, a, d };
  }
  if (v.num !== undefined) {
    const n = mis(ctx, v.num, s), q = mis(ctx, v.den, s), g = s * .12;
    return { w: Math.max(n.w, q.w) + s * .24, a: g + n.a + n.d, d: g + q.a + q.d };
  }
  if (v.rad !== undefined) {
    const r = mis(ctx, v.rad, s);
    return { w: s * .6 + r.w + s * .08, a: r.a + s * .18, d: r.d + s * .06 };
  }
  if (v.b !== undefined) {
    const b = mis(ctx, v.b, s), p = mis(ctx, v.s, s * .6);
    return { w: b.w + p.w + s * .02, a: b.a, d: Math.max(b.d, s * .3 + p.d) };
  }
  return { w: 0, a: 0, d: 0 };
}
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
  if (v.rad !== undefined) {
    const r = mis(ctx, v.rad, s);
    const top = cy - r.a - s * .1, bot = cy + r.d + s * .02;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(2.5, s * .05); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x + s * .03, cy + s * .1); ctx.lineTo(x + s * .13, cy + s * .03);
    ctx.lineTo(x + s * .3, bot); ctx.lineTo(x + s * .54, top); ctx.lineTo(x + s * .62 + r.w + s * .04, top); ctx.stroke(); ctx.restore();
    dis(ctx, v.rad, x + s * .6, cy, s);
    return;
  }
  if (v.b !== undefined) {
    const b = mis(ctx, v.b, s), ka = v.t0 ? P(TNOW, v.t0, v.t0 + .4) : 1;
    dis(ctx, v.b, x, cy, s);
    if (ka > 0) { ctx.save(); ctx.globalAlpha *= ka; dis(ctx, v.s, x + b.w + s * .02, cy + s * .3, s * .6); ctx.restore(); }
  }
}
// una riga di voci, allineata a sinistra, al centro o a destra; con local le voci entrano una alla volta
function formula(ctx, voci, x, cy, s, o = {}) {
  const al = o.alpha ?? 1; if (al <= 0.002) return 0;
  const ws = voci.map(v => mis(ctx, v, s).w), tot = ws.reduce((a, b) => a + b, 0);
  let xx = o.align === 'left' ? x : o.align === 'right' ? x - tot : x - tot / 2;
  voci.forEach((v, i) => {
    const k = o.local === undefined ? 1 : P(o.local, i * .25, i * .25 + .45, E.out);
    if (k > 0.002) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); dis(ctx, v, xx, cy, s); ctx.restore(); }
    xx += ws[i];
  });
  return tot;
}
const R = (r, k = 'ink') => ({ rad: [`{m${k}:${r}}`], col: k });
const X12 = { b: '{mink:x}', s: '{mink:1,2}' }, X12T = { b: '{mink:x}', s: '{mink:1,2}', t0: 55.2 }, X1 = { b: '{mink:x}', s: '{mink:1}' }, X2 = { b: '{mink:x}', s: '{mink:2}' };
const FORMULA = [X12, '{mink: = }', { num: ['{mink:−b ± }', R('b² − 4ac')], den: '{mink:2a}' }];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Da dove viene la formula', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
  ctx.save(); ctx.globalAlpha *= al * P(t, 2.6, 3.2);
  formula(ctx, FORMULA, W / 2, 340, 66);
  ctx.restore();
}

// 1–2 · i passaggi, uno per riga, ciascuno quando Ada lo dice (7.5–90.8)
const L = 170, FS = 48;
const PASSI = [
  [7.9, 155, ['{mink:ax² + bx + c = 0}', '{dim:,   con }', '{mink:a ≠ 0}']],
  [17.1, 238, ['{mv:4a²x² + 4abx + 4ac}', '{mink: = 0}']],
  [21.5, 321, ['{mink:4a²x² + 4abx = }', '{mv:−4ac}']],
  [33.7, 404, ['{mink:4a²x² + 4abx + }', '{mg:b²}', '{mink: = }', '{mg:b²}', '{mink: − 4ac}']],
  [37.5, 487, ['{mv:(2ax + b)²}', '{mink: = b² − 4ac}']],
  [46.1, 575, ['{mink:2ax + b = }', '{mv:±}', R('b² − 4ac')]],
  [50.6, 700, [X12T, ...FORMULA.slice(1)]],   // il pedice 1,2 arriva quando Ada lo spiega
];
// sottolinea un pezzo di una riga (da dove comincia, quanto è largo)
function sotto(ctx, x, w, y, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * P(k, 0, 1), y); ctx.stroke(); ctx.restore();
}
function scenePassi(ctx, t) {
  if (t < 7.4 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE + .6, .5, .6);
  card(ctx, 100, 110, 1030, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  for (const [a, y, voci] of PASSI) formula(ctx, voci, L, y, FS, { align: 'left', local: t - a });
  // il primo membro, mentre Ada dice che deve diventare un quadrato
  sotto(ctx, L, richW(ctx, '{mink:ax² + bx + c}', FS), 155 + 34, C.v, life(t, 12.8, 16.8, .4, .4));
  // i due termini che sono già pezzi di (2ax + b)²
  const k5 = life(t, 25.4, 33.4, .4, .4);
  sotto(ctx, L, richW(ctx, '{mink:4a²x²}', FS), 321 + 34, C.x, k5);
  sotto(ctx, L + richW(ctx, '{mink:4a²x² + }', FS), richW(ctx, '{mink:4abx}', FS), 321 + 34, C.v, k5);
  // la formula riquadrata, e poi il numero sotto radice quando prende il nome
  const kb = P(t, 55.3, 55.8);
  const wF = FORMULA.reduce((s, v) => s + mis(ctx, v, FS).w, 0);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(L - 22, 700 - 84, wF + 44, 156, 16); ctx.stroke(); ctx.restore();
  }
  const fr = FORMULA[2], n = mis(ctx, fr.num, FS);
  const xr = L + mis(ctx, X12, FS).w + mis(ctx, '{mink: = }', FS).w + FS * .12 + mis(ctx, '{mink:−b ± }', FS).w + FS * .6;
  // ricolorato in viola: lo stesso testo scritto sopra, nello stesso punto
  const kd = life(t, 59.9, 64.0, .4, .4), yn = 700 - FS * .12 - n.d;
  if (kd > 0) {
    ctx.save(); ctx.globalAlpha *= kd; ctx.fillStyle = C.paper;
    ctx.fillRect(xr - 2, yn - FS * .52, richW(ctx, '{mink:b² − 4ac}', FS) + 4, FS * 1.0); ctx.restore();
    drawRich(ctx, '{mv:b² − 4ac}', xr, yn, { size: FS, align: 'left', alpha: kd });
  }
  ctx.restore();
}

// la scheda a destra: che cosa serve a ogni passaggio (12.6–90.8)
const CR = 1500;
function titoletto(ctx, s, al) { conFont(TITOLI, () => drawRich(ctx, s.includes('{') ? s : `{dim:${s}}`, CR, 170, { size: 36, weight: 600, alpha: al })); }
function sceneLato(ctx, t) {
  if (t < 12.6 || t > FINE + .7) return;
  const al = life(t, 12.7, FINE + .6, .5, .6);
  card(ctx, 1160, 110, 680, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // l'idea
  const a1 = life(t, 12.8, 25.3, .4, .4);
  if (a1 > 0) {
    titoletto(ctx, 'l\'idea', a1);
    drawRich(ctx, '{mink:(}{dim:qualcosa}{mink:)² = }{dim:un numero}', CR, 300, { size: 42, alpha: a1, local: t - 13.0 });
  }
  // i pezzi di (2ax + b)²
  const a2 = life(t, 25.4, 41.2, .4, .4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    titoletto(ctx, '{dim:il quadrato di }{mink:2ax + b}', 1);
    drawRich(ctx, '{mink:(2ax)² = }{mx:4a²x²}', CR, 290, { size: 46, local: t - 25.5 });
    drawRich(ctx, '{mink:2 · 2ax · b = }{mv:4abx}', CR, 390, { size: 46, local: t - 26.3 });
    drawRich(ctx, '{mink:b²}{dim:  manca}', CR, 490, { size: 46, local: t - 29.7 });
    ctx.restore();
  }
  // le due possibilità
  const a3 = life(t, 41.3, 50.5, .4, .4);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    titoletto(ctx, 'due possibilità', 1);
    formula(ctx, ['{mink:2ax + b = }', R('b² − 4ac')], CR, 300, 44, { local: t - 41.5 });
    drawRich(ctx, '{dim:oppure}', CR, 400, { size: 34, local: t - 42.2 });
    formula(ctx, ['{mink:2ax + b = −}', R('b² − 4ac')], CR, 500, 44, { local: t - 42.5 });
    ctx.restore();
  }
  // i nomi delle due soluzioni
  const a4 = life(t, 55.3, 59.8, .4, .4);
  if (a4 > 0) {
    ctx.save(); ctx.globalAlpha *= a4;
    titoletto(ctx, 'le due soluzioni', 1);
    formula(ctx, [X1, '{dim::  col più}'], CR, 300, 48, { local: t - 55.5 });
    formula(ctx, [X2, '{dim::  col meno}'], CR, 400, 48, { local: t - 56.0 });
    ctx.restore();
  }
  // il discriminante e i tre casi
  const a5 = life(t, 59.8, 77.2, .4, .4);
  if (a5 > 0) {
    ctx.save(); ctx.globalAlpha *= a5;
    titoletto(ctx, 'il discriminante', 1);
    drawRich(ctx, '{mink:Δ = }{mv:b² − 4ac}', CR, 270, { size: 54, local: t - 60.0 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1200, 345); ctx.lineTo(1800, 345); ctx.stroke();
    const CASI = [[64.2, 420, '{mink:Δ > 0}', '{g:due soluzioni distinte}'], [68.7, 520, '{mink:Δ = 0}', '{g:una sola, doppia}'], [73.2, 620, '{mink:Δ < 0}', '{r:nessuna soluzione reale}']];
    for (const [a, y, f, s] of CASI) {
      drawRich(ctx, f, 1205, y, { size: 44, align: 'left', local: t - a });
      drawRich(ctx, s, 1395, y, { size: 32, align: 'left', local: t - a - .3 });
    }
    ctx.restore();
  }
  // la prova
  const a6 = P(t, 77.3, 77.7);
  if (a6 > 0) {
    ctx.save(); ctx.globalAlpha *= a6;
    titoletto(ctx, 'per esempio', 1);
    drawRich(ctx, '{mink:x² + 4x − 21 = 0}', CR, 240, { size: 46, local: t - 77.4 });
    drawRich(ctx, '{mink:a = 1,   b = 4,   c = −21}', CR, 315, { size: 40, local: t - 78.0 });
    drawRich(ctx, '{mink:Δ = 4² − 4 · 1 · (−21)}', CR, 395, { size: 42, local: t - 82.2 });
    drawRich(ctx, '{mink:= 16 + 84 = 100}', CR, 465, { size: 42, local: t - 82.8 });
    formula(ctx, [R('Δ'), '{mink: = 10}'], CR, 550, 42, { local: t - 83.6 });
    formula(ctx, [X12, '{mink: = }', { num: '{mink:−4 ± 10}', den: '{mink:2}' }], CR, 645, 44, { local: t - 86.2 });
    formula(ctx, [X1, '{mink: = }', '{mg:3}', '{mink:,     }', X2, '{mink: = }', '{mg:−7}'], CR, 745, 46, { local: t - 86.6 });
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (90.8–102.3)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Completando il quadrato con le lettere\nsi trova la {g:formula risolutiva}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 520], [1010, 420], [1475, 430]];
  pills.forEach(([x, w], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 440, w, 160);
    if (i === 0) formula(ctx, FORMULA, x, 520, 42);
    if (i === 1) drawRich(ctx, '{mink:Δ = b² − 4ac}', x, 520, { size: 44 });
    if (i === 2) drawRich(ctx, '{mink:Δ < 0}{dim::} {r:nessuna}\n{r:soluzione reale}', x, 520, { size: 34, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Da dove viene la formula', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 50.3, 'completare il quadrato'], [50.3, 77.0, 'la formula e il discriminante'], [77.0, FINE, 'una prova']],
    scena(ctx, t) { TNOW = t; sceneIntro(ctx, t); scenePassi(ctx, t); sceneLato(ctx, t); sceneFine(ctx, t); },
  };
});
