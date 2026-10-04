'use strict';
/* La radice è una potenza — (a^(1/2))² = a^(1/2 · 2) = a, quindi a^(1/2) = √a (a > 0); allo stesso modo a^(1/3) è la radice cubica:
   il denominatore dell'esponente diventa l'indice della radice. Argomento: radicali. */
CVIDEO.registra('radicali/radice-come-potenza', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, txt, card } = M;

const FINE = 65.4, DURATA = 77.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [22.1, 'pensa'], [26.7, 'neutro'],
  [35.8, 'sorpreso'], [37.9, 'felice'], [40.0, 'neutro'], [45.1, 'felice'], [47.2, 'neutro'], [55.1, 'felice'],
  [57.2, 'neutro'], [FINE + 1.0, 'felice'], [72.4, 'occhiolino'], [74.6, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'Una radice si può scrivere\ncome una potenza?'],
  // 1 · un esponente per la radice
  [7.9, 12.4, '{mink:a²} vuol dire {mink:a · a}:\ndue fattori uguali ad {mink:a}.'],
  [12.5, 16.6, 'Qui {mink:a} è un numero {g:positivo}:\n{mink:a > 0}.'],
  [16.7, 22.0, 'La {v:radice quadrata} {mink:√a} è il numero\npositivo che al quadrato fa {mink:a}.'],
  [22.1, 26.6, 'C\'è una potenza di {mink:a} che,\nal quadrato, dia {mink:a}?'],
  [26.7, 30.8, 'Per la {v:potenza di potenza}\ngli esponenti si {g:moltiplicano}.'],
  [30.9, 35.7, 'Deve venire {mink:a}, cioè {mink:a¹}: serve\nun esponente che per 2 dia {g:1}.'],
  [35.8, 39.9, 'È {mink:1/2}: infatti {mink:1/2 · 2 = 1}.'],
  [40.0, 45.0, 'Per questo si pone: {mink:a} elevato\na {mink:1/2} è {mg:√a}, con {mink:a > 0}.'],
  [45.1, 50.3, 'Con {mink:a = 9}: {mink:9} elevato a {mink:1/2}\nè {mink:√9 = 3}, perché {mink:3² = 9}.'],
  // 2 · la radice cubica
  [50.6, 55.0, 'Con il cubo è lo stesso:\n{mink:1/3 · 3 = 1}, e torna {mink:a}.'],
  [55.1, 60.4, '{mink:a} elevato a {mink:1/3} è la {v:radice cubica}:\nil numero che al cubo fa {mink:a}.'],
  [60.5, 65.0, 'Il {v:denominatore} dell\'esponente\ndiventa l\'{v:indice} della radice.'],
  // chiusura
  [67.0, 74.4, 'Ogni radice è una potenza:\nil denominatore diventa l\'indice.'],
];
const CAPITOLI = [[7.5, 50.4, 'un esponente per la radice'], [50.4, 65.4, 'la radice cubica']];

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
// voci che servono spesso
const pot = (b, n, d) => ({ b: `{mink:${b}}`, e: [{ num: `{mink:${n}}`, den: `{mink:${d}}` }] });
const R = (r, idx) => ({ rad: [`{mink:${r}}`], idx: idx && `{mink:${idx}}` });

// una tessera con dentro una voce
function tessera(ctx, x, y, col, voce, al = 1, sc = 1, L = 170) {
  if (al <= 0.002 || sc <= 0.002) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = css(C[col], .13); ctx.strokeStyle = css(C[col]); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(-L / 2, -75, L, 150, 20); ctx.fill(); ctx.stroke();
  const m = mis(ctx, voce, 80);
  formula(ctx, [voce], 0, (m.a - m.d) / 2, 80);
  ctx.restore();
}
// un promemoria su una regola delle potenze: nome a sinistra, formula a destra, su un fondino centrato
function promemoria(ctx, nome, voci, y, s = 76) {
  ctx.font = '500 34px Lexend, "Segoe UI", sans-serif';
  const wn = ctx.measureText(nome).width, wf = voci.reduce((a, v) => a + mis(ctx, v, s).w, 0);
  const w = wn + 40 + wf + 80, x0 = 960 - w / 2;
  ctx.fillStyle = css(C.v, .08); ctx.beginPath(); ctx.roundRect(x0, y - 62, w, 124, 18); ctx.fill();
  txt(ctx, nome, x0 + 40, y - 2, { size: 34, color: C.dim, align: 'left' });
  formula(ctx, voci, x0 + 40 + wn + 40, y + 4, s, { align: 'left' });
}
// (b^e)^f con le parentesi alte
const potPot = (b, e, f) => ({ b: [{ par: [{ b: `{mink:${b}}`, e }] }], e: [`{mink:${f}}`] });
const fr = (n, d, k = 'ink') => ({ num: `{m${k}:${n}}`, den: `{m${k}:${d}}` });

// 1 · un esponente per la radice (7.5–65.4)
const YF = 250, YT = 490;
const ALTO = [   // la formula in alto: [da, a, voci]
  [8.0, 16.7, ['{mink:a² = a · a}']],
  [16.7, 22.1, [R('a'), '{mink: · }', R('a'), '{mink: = a}']],
  [22.1, 30.9, [potPot('a', ['{mv:?}'], 2), '{mink: = a}']],
  [30.9, 35.8, [potPot('a', ['{mv:?}'], 2), '{mink: = }', { b: '{mink:a}', e: ['{mv:?}', '{mink: · 2}'] }, '{mink: = a¹}']],
  [35.8, 50.5, [potPot('a', [fr(1, 2)], 2), '{mink: = }', { b: '{mink:a}', e: [fr(1, 2), '{mink: · 2}'] }, '{mink: = a¹ = a}']],
  [50.5, 65.6, [potPot('a', [fr(1, 3)], 3), '{mink: = }', { b: '{mink:a}', e: [fr(1, 3), '{mink: · 3}'] }, '{mink: = a¹ = a}']],
];
function sceneEsponente(ctx, t) {
  if (t < 7.5 || t > 65.8) return;
  const al = 1 - P(t, 65.0, 65.6);
  ctx.save(); ctx.globalAlpha *= al;
  ALTO.forEach(([a, b, v]) => formula(ctx, v, 960, YF, 100, { alpha: life(t, a, b, .3, .25) }));
  // a > 0, in alto a destra, da quando Ada lo dice
  drawRich(ctx, '{mink:a > 0}', 1700, 180, { size: 50, alpha: P(t, 12.7, 13.2) });
  // le tessere: a · a, poi √a · √a = a, poi la potenza che fa lo stesso lavoro
  const kt = life(t, 8.2, 41.4, .4, .5);
  if (kt > 0) {
    ctx.save(); ctx.globalAlpha *= kt;
    const km = P(t, 16.8, 17.6);   // le due a si fondono nell'a di destra
    const k2 = P(t, 8.5, 8.9, E.back), k3 = P(t, 8.8, 9.2, E.back);
    tessera(ctx, lerp(845, 1240, km), YT, 'x', '{mink:a}', 1, k2);
    tessera(ctx, lerp(1075, 1240, km), YT, 'x', '{mink:a}', 1 - km, k3);
    drawRich(ctx, '{mink:·}', 960, YT, { size: 60, alpha: (1 - km) * k3 });
    const kv = P(t, 17.3, 17.8, E.back);
    if (kv > 0) {
      [620, 850].forEach(x => {
        tessera(ctx, x, YT, 'v', R('a'), 1 - P(t, 22.1, 22.5), kv);
        tessera(ctx, x, YT, 'v', { b: '{mink:a}', e: ['{mv:?}'] }, life(t, 22.2, 36.0, .4, .3), kv);
        tessera(ctx, x, YT, 'v', pot('a', 1, 2), P(t, 35.9, 36.3), kv);
      });
      drawRich(ctx, '{mink:·}', 735, YT, { size: 60, alpha: kv });
      drawRich(ctx, '{mink:=}', 1045, YT, { size: 70, alpha: kv });
    }
    ctx.restore();
  }
  // il promemoria: potenza di potenza
  const kp = life(t, 26.9, 41.4, .4, .5);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp;
    promemoria(ctx, 'potenza di potenza:', ['{mink:(a³)² = }', { b: '{mink:a}', e: ['{mink:3 · 2}'] }, '{mink: = a⁶}'], 712);
    ctx.restore();
  }
  // il risultato: a elevato a 1/2 è √a
  const kr = P(t, 40.9, 41.5, E.out);
  if (kr > 0) {
    ctx.save(); ctx.globalAlpha *= kr;
    ctx.fillStyle = css(C.g, .1); ctx.beginPath(); ctx.roundRect(660, 330, 600, 225, 24); ctx.fill();
    formula(ctx, [pot('a', 1, 2), '{mink: = }', { rad: ['{mg:a}'], col: 'g' }], 960, 482, 120);
    ctx.restore();
  }
  // l'esempio con 9
  const ke = life(t, 45.3, 50.6, .4, .4);
  if (ke > 0) {
    formula(ctx, [pot('9', 1, 2), '{mink: = }', R('9'), '{mink: = }', '{mg:3}'], 860, 700, 84, { alpha: ke });
    drawRich(ctx, 'perché {mink:3² = 9}', 1180, 700, { size: 48, align: 'left', alpha: ke * P(t, 46.5, 47.0) });
  }
  // la radice cubica, e il denominatore che diventa l'indice
  const kc = P(t, 55.3, 55.8, E.out);
  if (kc > 0) {
    const kh = P(t, 60.6, 61.1);
    const riga = (k3, kk) => formula(ctx, [{ b: '{mink:a}', e: [{ num: '{mink:1}', den: `{m${k3}:3}` }] }, '{mink: = }', { rad: ['{mg:a}'], idx: `{m${kk}:3}`, col: 'g' }], 960, 700, 110, { alpha: kc });
    ctx.save(); ctx.globalAlpha *= 1 - kh; riga('ink', 'ink'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= kh; riga('v', 'v'); ctx.restore();
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La radice è una potenza', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 3 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Una radice è una potenza\ncon esponente frazionario.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [430, [pot('a', 1, 2), '{mink: = }', R('a')], 'radice quadrata'],
    [960, [pot('a', 1, 3), '{mink: = }', R('a', 3)], 'radice cubica'],
    [1490, null, ''],
  ];
  pills.forEach(([x, v, s, fs], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 255, 416, 510, 214);
    if (v) formula(ctx, v, x, 530, fs || 80);
    else drawRich(ctx, 'il {v:denominatore}\ndiventa l\'{v:indice}', x, 512, { size: 40, lh: 1.25 });
    txt(ctx, s, x, 598, { size: 32, color: C.dim });
    ctx.restore();
  });
  drawRich(ctx, '{dim:con }{mink:a > 0}', W / 2, 690, { size: 40, alpha: P(t, FINE + 4.4, FINE + 4.9) });
  ctx.restore();
}

  return {
    titolo: 'La radice è una potenza', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .3, .6, .6)); sceneEsponente(ctx, t); sceneFine(ctx, t); },
  };
});
