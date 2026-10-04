'use strict';
/* Il triangolo di Tartaglia — ogni riga comincia e finisce con 1, ogni altro numero è la somma dei due sopra;
   le righe si contano da 0 e la riga n contiene (n su 0), …, (n su n); perché si somma (formula di Stifel):
   fra i gruppi di 2 scelti fra 4 persone, quelli con Anna sono (3 su 1), quelli senza (3 su 2). Argomento: calcolo-combinatorio. */
CVIDEO.registra('calcolo-combinatorio/tartaglia', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, ball, card, txt } = M;

const FINE = 95.7, DUR = 107.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [15.7, 'felice'], [17.8, 'neutro'], [32.8, 'sorpreso'], [34.9, 'neutro'],
  [52.9, 'pensa'], [56.9, 'neutro'], [71.6, 'festa'], [73.9, 'neutro'],
  [86.0, 'felice'], [88.2, 'neutro'], [FINE, 'neutro'], [97.7, 'felice'], [102.2, 'occhiolino'],
];
// una frase per ogni cosa che succede; il triangolo si riempie a pezzi, e sta fermo mentre Ada ne parla
const FUMETTI = [
  [2.4, 6.4, 'Un triangolo di numeri:\ncome si costruisce, riga per riga?'],
  // 1 · le regole
  [8.0, 11.5, 'In cima al triangolo c’è un {g:1}.'],
  [11.6, 15.6, 'Ogni riga comincia e finisce\ncon {g:1}.'],
  [15.7, 20.4, 'Ogni altro numero è la somma\ndei due che gli stanno sopra.'],
  [20.5, 24.1, 'Sotto: {mink:1 + 2 = 3}\ne {mink:2 + 1 = 3}.'],
  [24.2, 29.0, 'Riga dopo: 1, 4, 6, 4, 1;\nil 6 viene da {mink:3 + 3}.'],
  [29.1, 32.6, 'E così via, una riga\ndopo l’altra.'],
  // 2 · la riga n
  [32.8, 37.4, 'Le righe si contano da {g:0}:\nin cima c’è la riga 0.'],
  [37.5, 42.9, 'La riga 4 contiene i coefficienti\nbinomiali «4 su 0», «4 su 1», …'],
  [43.0, 48.1, '«4 su 2» conta i gruppi di 2\nscelti fra 4 persone: sono 6.'],
  [48.2, 52.7, 'Nella riga {mink:n} ci sono i coefficienti\nbinomiali con sopra {mink:n}.'],
  // 3 · perché si somma
  [52.9, 56.8, 'Perché la somma? Prendo 4 persone,\nfra cui {v:Anna}.'],
  [56.9, 61.0, 'I gruppi di 2 sono\n«4 su 2» = 6.'],
  [61.1, 66.0, 'Con {v:Anna}: scelgo l’altro\nfra 3, «3 su 1» = 3 modi.'],
  [66.1, 71.5, 'Senza {v:Anna}: scelgo i 2 fra\ngli altri 3, «3 su 2» = 3 modi.'],
  [71.6, 75.5, 'I due casi si escludono:\nsi sommano, {mink:3 + 3 = 6}.'],
  [75.6, 80.2, 'Nel triangolo, il 6 sta proprio\nsotto i due 3.'],
  [80.3, 85.9, 'Con {mink:n} persone e gruppi di {mink:k}:\ncon {v:Anna} sono «{mink:n − 1} su {mink:k − 1}».'],
  [86.0, 91.0, 'Quelli senza {v:Anna} sono «{mink:n − 1} su {mink:k}»:\nè la {v:formula di Stifel}.'],
  [91.1, 95.4, 'Vale per i numeri interni:\n{mink:k} da 1 a {mink:n − 1}.'],
  // chiusura
  [97.7, 104.8, 'Dentro o fuori Anna: per questo ogni\nnumero interno è la somma dei due sopra.'],
];

// ---------- coefficienti binomiali e formule in riga ----------
function largo(ctx, it, s) {
  if (typeof it === 'string') return richW(ctx, it, s);
  if (it.bin) return Math.max(richW(ctx, it.bin[0], s * .82), richW(ctx, it.bin[1], s * .82)) + s * .8;
  return 0;
}
function pezzo(ctx, it, x, cy, s) {
  if (typeof it === 'string') { drawRich(ctx, it, x, cy, { size: s, align: 'left' }); return; }
  const w = largo(ctx, it, s), h = s * 1.95, pw = s * .3, xm = x + w / 2;
  ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .06); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + pw, cy - h / 2); ctx.quadraticCurveTo(x - s * .12, cy, x + pw, cy + h / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w - pw, cy - h / 2); ctx.quadraticCurveTo(x + w + s * .12, cy, x + w - pw, cy + h / 2); ctx.stroke();
  ctx.restore();
  drawRich(ctx, it.bin[0], xm, cy - s * .5, { size: s * .82 });
  drawRich(ctx, it.bin[1], xm, cy + s * .52, { size: s * .82 });
}
function formula(ctx, items, cx, cy, s, o = {}) {
  const al = o.alpha ?? 1; if (al <= .002) return;
  const local = o.local ?? 99, gap = s * .12;
  const ws = items.map(it => largo(ctx, it, s)), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  const x0 = cx - tot / 2;
  let x = x0;
  items.forEach((it, i) => {
    // con o.locali ogni pezzo ha il suo istante d'ingresso
    const lo = o.locali ? o.locali[i] : local - i * .3, k = P(lo, 0, .5, E.out);
    if (k > 0) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); pezzo(ctx, it, x, cy, s); ctx.restore(); }
    x += ws[i] + gap;
  });
  return { x0, ws, gap };
}
const BIN = (n, k) => ({ bin: [`{mink:${n}}`, `{mink:${k}}`] });
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

// ---------- il triangolo ----------
const TX = 560, DX = 92, DY = 95, TY = 175;
const POS = (r, k) => [TX + (k - r / 2) * DX, TY + r * DY];
function quando(r, k) {   // l'istante in cui compare il numero della riga r, posto k
  if (r === 0) return 8.2;
  if (k === 0 || k === r) return 12.0 + r * .18;
  if (r === 2) return 16.6;
  if (r === 3) return k === 1 ? 20.7 : 21.3;
  if (r === 4) return 24.5 + (k - 1) * .25;
  return (r === 5 ? 29.2 : 29.8) + (k - 1) * .15;
}
// le somme: [riga, posto, da, a]
const SOMME = [[2, 1, 16.3, 20.4], [3, 1, 20.6, 24.1], [3, 2, 21.2, 24.1], [4, 2, 24.4, 29.0], [4, 2, 75.7, 80.2]];
function cerchio(ctx, p, col, k, r = 34) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function freccina(ctx, a, b, k) {
  if (k <= 0) return;
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / d, uy = (b[1] - a[1]) / d;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0] + ux * 38, a[1] + uy * 38); ctx.lineTo(b[0] - ux * 38, b[1] - uy * 38); ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il triangolo di Tartaglia', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il triangolo, a sinistra (7.5–FINE)
function sceneTriangolo(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 110, 110, 900, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // la riga 4, evidenziata mentre se ne parla
  const kb = life(t, 37.6, 48.1, .4, .4);
  if (kb > 0) {
    const [x0, y] = POS(4, 0), [x1] = POS(4, 4);
    ctx.save(); ctx.globalAlpha *= kb; ctx.fillStyle = css(C.v, .1);
    ctx.beginPath(); ctx.roundRect(x0 - 50, y - 38, x1 - x0 + 100, 76, 38); ctx.fill(); ctx.restore();
  }
  // le somme: i due sopra (viola) e quello sotto (verde)
  for (const [r, k, a, b] of SOMME) {
    const h = life(t, a, b, .3, .4);
    if (h <= 0) continue;
    const c = POS(r, k), p1 = POS(r - 1, k - 1), p2 = POS(r - 1, k);
    cerchio(ctx, p1, C.v, h); cerchio(ctx, p2, C.v, h);
    freccina(ctx, p1, c, h); freccina(ctx, p2, c, h);
    cerchio(ctx, c, C.g, h * P(t, a + .3, a + .6));
  }
  // i numeri
  for (let r = 0; r <= 6; r++) for (let k = 0; k <= r; k++) {
    const a = quando(r, k), kk = P(t, a, a + .35, E.back);
    if (kk <= 0) continue;
    const [x, y] = POS(r, k);
    ctx.save(); ctx.translate(x, y); ctx.scale(kk, kk);
    txt(ctx, String(binom(r, k)), 0, 0, { size: 46, weight: 600, color: k === 0 || k === r ? C.g : C.ink });
    ctx.restore();
  }
  // i nomi delle righe, da 0
  for (let r = 0; r <= 6; r++) {
    const k = P(t, 32.9 + r * .1, 33.3 + r * .1);
    txt(ctx, `riga ${r}`, 240, TY + r * DY, { size: 32, color: r === 4 && kb > .5 ? C.v : C.dim, align: 'right', alpha: k });
  }
  ctx.restore();
}

// la scheda a destra (15.7–FINE)
const XM = 1445;
const COPPIE = [['AB', 1250, 330], ['AC', 1250, 410], ['AD', 1250, 490], ['BC', 1640, 330], ['BD', 1640, 410], ['CD', 1640, 490]];
function coppia(ctx, s, x, y, al) {
  if (al <= 0) return;
  Array.from(s).forEach((L, j) => ball(ctx, x + (j - .5) * 68, y, L, L === 'A' ? C.v : C.x, { r: 32, alpha: al }));
}
function gruppo(ctx, x, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - 120, 292, 240, 236, 22); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 15.6 || t > FINE + .7) return;
  const al = life(t, 15.8, FINE, .5, .6);
  card(ctx, 1050, 110, 790, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // 1 · le somme
  const a1 = 1 - P(t, 37.0, 37.4);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    drawRich(ctx, '{mink:1 + 1 = }{mg:2}', XM, 230, { size: 60, local: t - 16.5 });
    drawRich(ctx, '{mink:1 + 2 = }{mg:3}', XM, 350, { size: 60, local: t - 20.7 });
    drawRich(ctx, '{mink:2 + 1 = }{mg:3}', XM, 450, { size: 60, local: t - 21.3 });
    drawRich(ctx, '{mink:3 + 3 = }{mg:6}', XM, 570, { size: 60, local: t - 24.7 });
    ctx.restore();
  }
  // 2 · la riga 4 e la riga n
  const a2 = P(t, 37.4, 37.8) * (1 - P(t, 52.5, 52.9));
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, '{v:riga 4}', XM, 170, { size: 40, weight: 600 }));
    for (let k = 0; k <= 4; k++) {
      const x = XM + (k - 2) * 130, kk = P(t, 37.9 + k * .2, 38.3 + k * .2);
      formula(ctx, [BIN(4, k)], x, 268, 58, { alpha: kk });
      ctx.save(); ctx.globalAlpha *= kk; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
      ctx.restore();
      txt(ctx, String(binom(4, k)), x, 392, { size: 52, weight: 600, color: k === 2 && t > 43.0 ? C.g : C.ink, alpha: kk });
    }
    // «4 su 2» = 6: i gruppi di 2 scelti fra 4
    const k6 = life(t, 43.1, 48.1, .3, .4);
    if (k6 > 0) {
      ctx.save(); ctx.globalAlpha *= k6; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XM - 52, 200, 104, 236, 18); ctx.stroke(); ctx.restore();
      drawRich(ctx, '{dim:i gruppi di 2 scelti fra 4}', XM, 475, { size: 30, alpha: k6 });
    }
    formula(ctx, [BIN('n', 0), '{mink:,}', BIN('n', 1), '{mink:, …,}', BIN('n', 'n')], XM, 615, 50, { local: t - 48.4 });
    drawRich(ctx, '{dim:nella riga }{mink:n}{dim:, contando da 0}', XM, 712, { size: 30, local: t - 49.0 });
    ctx.restore();
  }
  // 3 · Anna, dentro o fuori
  const a3 = P(t, 52.9, 53.3) * (1 - P(t, 80.3, 80.7));
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    Array.from('ABCD').forEach((L, i) => {
      const k = P(t, 53.0 + i * .12, 53.4 + i * .12, E.back);
      ball(ctx, XM - 150 + i * 100, 175, L, L === 'A' ? C.v : C.x, { r: 36, scale: k });
    });
    drawRich(ctx, '{v:Anna}', XM - 200, 175, { size: 32, align: 'right', local: t - 53.6 });
    COPPIE.forEach(([s, x, y], i) => coppia(ctx, s, x, y, P(t, 57.0 + i * .12, 57.4 + i * .12)));
    gruppo(ctx, 1250, C.v, life(t, 61.2, 80.3, .3, .3));
    gruppo(ctx, 1640, C.dim, life(t, 66.2, 80.3, .3, .3));
    drawRich(ctx, '{v:con Anna}', 1250, 270, { size: 32, local: t - 61.2 });
    drawRich(ctx, '{dim:senza Anna}', 1640, 270, { size: 32, local: t - 66.2 });
    formula(ctx, [BIN(3, 1), '{mink: = 3}'], 1250, 610, 56, { local: t - 62.0 });
    formula(ctx, [BIN(3, 2), '{mink: = 3}'], 1640, 610, 56, { local: t - 67.4 });
    formula(ctx, [BIN(4, 2), '{mink: = }', BIN(3, 1), '{mink: + }', BIN(3, 2), '{mink: = 3 + 3 = }{mg:6}'], XM, 733, 54, { local: t - 71.8 });
    ctx.restore();
  }
  // 4 · la formula di Stifel
  const a4 = P(t, 80.6, 81.0);
  if (a4 > 0) {
    ctx.save(); ctx.globalAlpha *= a4;
    // una cosa per fumetto: n e k e i gruppi con Anna (80,3), quelli senza e il nome (86,0), la condizione (91,1)
    drawRich(ctx, '{mink:n}{dim: persone, gruppi di }{mink:k}', XM, 175, { size: 34, local: t - 80.6 });
    const f = formula(ctx, [BIN('n', 'k'), '{mink: = }', BIN('n − 1', 'k − 1'), '{mink: + }', BIN('n − 1', 'k')], XM, 315, 56,
      { locali: [t - 86.2, t - 86.2, t - 81.2, t - 86.4, t - 86.6] });
    const cx = i => f.x0 + f.ws.slice(0, i).reduce((a, b) => a + b, 0) + i * f.gap + f.ws[i] / 2;
    drawRich(ctx, '{v:con Anna}', cx(2), 418, { size: 32, local: t - 82.0 });
    drawRich(ctx, '{dim:senza Anna}', cx(4), 418, { size: 32, local: t - 86.8 });
    conFont(TITOLI, () => drawRich(ctx, '{v:formula di Stifel}', XM, 520, { size: 42, weight: 600, local: t - 87.6 }));
    drawRich(ctx, '{mink:1 ≤ k ≤ n − 1}', XM, 640, { size: 52, local: t - 91.3 });
    drawRich(ctx, '{dim:i numeri interni di ogni riga}', XM, 715, { size: 32, local: t - 91.9 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Ogni numero interno è la somma dei due sopra:\ni gruppi con Anna più quelli senza.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[360, 'ogni riga comincia\ne finisce con {g:1}'], [870, 'le righe si contano\npartendo da {g:0}'], [1475, '']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    const w = [460, 440, 680][i]; card(ctx, x - w / 2, 445, w, 200);
    if (s) drawRich(ctx, s, x, 545, { size: 34, weight: 400, lh: 1.3 });
    else formula(ctx, [BIN('n', 'k'), '{mink: = }', BIN('n − 1', 'k − 1'), '{mink: + }', BIN('n − 1', 'k')], x, 545, 54);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il triangolo di Tartaglia', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 32.7, 'le regole'], [32.7, 52.8, 'la riga {mink:n}'], [52.8, FINE, 'perché si somma']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneTriangolo(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
