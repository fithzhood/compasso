'use strict';
/* Conta l'ordine? — il podio di 8 atleti: disposizioni, 8 · 7 · 6 = 336; la commissione di 3 fra 8: ogni terzetto
   compare 3! = 6 volte fra i podi, quindi 336 / 6 = 56 = C₈,₃ = (8 su 3); in generale C = D / k!. Argomento: calcolo-combinatorio. */
CVIDEO.registra('calcolo-combinatorio/disposizioni-combinazioni', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, ball, card } = M;

const FINE = 89.4, DUR = 101;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [24.7, 'felice'], [28.4, 'sorpreso'], [30.5, 'neutro'],
  [48.6, 'pensa'], [53.0, 'sorpreso'], [55.1, 'neutro'], [67.2, 'festa'], [69.5, 'neutro'],
  [FINE, 'neutro'], [91.4, 'felice'], [95.6, 'occhiolino'],
];
// una frase per ogni cosa che succede; gli atleti si spostano solo all'inizio del fumetto che ne parla
const FUMETTI = [
  [2.4, 6.4, 'Tre persone fra otto:\nconta l’ordine in cui le scegli?'],
  // 1 · il podio
  [8.0, 11.9, 'Otto atleti in gara:\nquanti podi diversi ci sono?'],
  [12.0, 16.0, 'Per l’oro va bene uno qualunque:\n{g:8} scelte.'],
  [16.1, 21.2, 'Per l’argento ne restano {g:7}: chi ha\nl’oro non può avere anche l’argento.'],
  [21.3, 24.6, 'Per il bronzo ne restano {g:6}.'],
  [24.7, 28.3, 'I podi sono {mink:8 · 7 · 6 = 336}.'],
  [28.4, 32.9, 'Scambio oro e argento: è un podio\n{g:diverso}. Qui l’ordine conta.'],
  [33.0, 37.6, 'È una {v:disposizione semplice}: l’ordine\nconta e nessuno si ripete.'],
  [37.7, 42.8, 'Si scrive {mink:D} con sotto 8 e 3:\n8 elementi, classe 3: i posti.'],
  // 2 · la commissione
  [43.9, 48.5, 'Ora una commissione di 3 fra gli 8:\nnon ci sono gradini.'],
  [48.6, 52.9, 'Fra i 336 podi, quanti\nhanno {x:A}, {x:B} e {x:C}?'],
  [53.0, 57.6, 'Sono {g:6}, uno per ogni ordine:\nma la commissione è {g:una}.'],
  [57.7, 62.2, 'Per il primo posto 3 scelte, poi 2,\npoi 1: {mink:3 · 2 · 1 = 6}.'],
  [62.3, 67.1, 'È {mink:3!}, «3 fattoriale»: il prodotto\ndegli interi da 1 a 3.'],
  [67.2, 71.8, 'Ogni terzetto è contato 6 volte:\nle commissioni sono {mink:336 / 6 = 56}.'],
  [71.9, 75.6, 'È una {v:combinazione semplice}:\nl’ordine {r:non} conta.'],
  [75.7, 80.9, 'Si scrive {mink:C} con sotto 8 e 3,\no col simbolo «8 su 3».'],
  [81.0, 84.3, '«8 su 3» si chiama\n{v:coefficiente binomiale}.'],
  [84.4, 89.0, 'Con {mink:n} elementi e {mink:k} posti\nsi divide per {mink:k!}.'],
  // chiusura
  [91.4, 98.0, 'Conta come se l’ordine contasse,\npoi dividi per i modi di riordinare.'],
];

// ---------- formule con pedici, coefficienti binomiali e frazioni, disegnate qui ----------
// pezzi: testo ricco | { sub: [base, pedice] } | { bin: [n, k] } | { fr: [num, den] } (num e den: testo o elenco di pezzi)
function largo(ctx, it, s) {
  if (typeof it === 'string') return richW(ctx, it, s);
  if (Array.isArray(it)) return it.reduce((a, p) => a + largo(ctx, p, s), 0) + s * .12 * (it.length - 1);
  if (it.sub) return richW(ctx, it.sub[0], s) + richW(ctx, it.sub[1], s * .62) + s * .04;
  if (it.bin) return Math.max(richW(ctx, it.bin[0], s * .82), richW(ctx, it.bin[1], s * .82)) + s * .8;
  if (it.fr) return Math.max(largo(ctx, it.fr[0], s), largo(ctx, it.fr[1], s)) + s * .35;
  return 0;
}
function pezzo(ctx, it, x, cy, s) {
  const w = largo(ctx, it, s);
  if (typeof it === 'string') drawRich(ctx, it, x, cy, { size: s, align: 'left' });
  else if (Array.isArray(it)) { let xx = x; it.forEach(p => { pezzo(ctx, p, xx, cy, s); xx += largo(ctx, p, s) + s * .12; }); }
  else if (it.sub) {
    const wb = richW(ctx, it.sub[0], s);
    drawRich(ctx, it.sub[0], x, cy, { size: s, align: 'left' });
    drawRich(ctx, it.sub[1], x + wb + s * .04, cy + s * .32, { size: s * .62, align: 'left' });
  } else if (it.bin) {
    const h = s * 1.95, pw = s * .3, xm = x + w / 2;
    ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .06); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + pw, cy - h / 2); ctx.quadraticCurveTo(x - s * .12, cy, x + pw, cy + h / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + w - pw, cy - h / 2); ctx.quadraticCurveTo(x + w + s * .12, cy, x + w - pw, cy + h / 2); ctx.stroke();
    ctx.restore();
    drawRich(ctx, it.bin[0], xm, cy - s * .5, { size: s * .82 });
    drawRich(ctx, it.bin[1], xm, cy + s * .52, { size: s * .82 });
  } else if (it.fr) {
    const xm = x + w / 2;
    const [nu, de] = it.fr, wn = largo(ctx, nu, s), wd = largo(ctx, de, s);
    pezzo(ctx, nu, xm - wn / 2, cy - s * (JSON.stringify(nu).includes('"sub"') ? .84 : .7), s); pezzo(ctx, de, xm - wd / 2, cy + s * .72, s);
    ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2, s * .055); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x + s * .08, cy + s * .04); ctx.lineTo(x + w - s * .08, cy + s * .04); ctx.stroke(); ctx.restore();
  }
}
// una formula in riga, centrata in cx (o allineata a sinistra); con local i pezzi entrano uno alla volta
function formula(ctx, items, cx, cy, s, o = {}) {
  const al = o.alpha ?? 1; if (al <= .002) return;
  const local = o.local ?? 99, gap = s * .12;
  const ws = items.map(it => largo(ctx, it, s)), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = o.align === 'left' ? cx : cx - tot / 2;
  items.forEach((it, i) => {
    const k = P(local, i * .3, i * .3 + .5, E.out);
    if (k > 0) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); pezzo(ctx, it, x, cy, s); ctx.restore(); }
    x += ws[i] + gap;
  });
  return { x0: o.align === 'left' ? cx : cx - tot / 2, ws, gap };
}
const D = (n, k) => ({ sub: ['{mink:D}', `{mink:${n},${k}}`] });
const Cc = (n, k) => ({ sub: ['{mink:C}', `{mink:${n},${k}}`] });
const BIN = (n, k) => ({ bin: [`{mink:${n}}`, `{mink:${k}}`] });

// ---------- gli atleti ----------
const LET = 'ABCDEFGH', RX = i => 200 + i * 104, RY = 190, RB = 36;
const GRAD = [[390, 470, 'oro', '8', 12.8], [590, 530, 'argento', '7', 16.9], [790, 590, 'bronzo', '6', 22.1]];
const BASE = 700;
// i tre che si muovono: [inizio, fine, punto d'arrivo], uno dopo l'altro
const VIAGGI = {
  A: [[12.1, 12.9, [390, 470 - 40]], [44.0, 44.9, [265, 470]]],
  B: [[16.2, 17.0, [590, 530 - 40]], [44.1, 45.0, [395, 470]]],
  C: [[21.4, 22.2, [790, 590 - 40]], [44.2, 45.1, [330, 562]]],
};
function dove(L, i, t) {
  let p = [RX(i), RY];
  for (const [a, b, q] of VIAGGI[L] || []) {
    const k = P(t, a, b, E.io);
    if (k <= 0) break;
    p = [lerp(p[0], q[0], k), lerp(p[1], q[1], k) - Math.sin(k * Math.PI) * 40];
  }
  return p;
}
function buco(ctx, x, y, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.dim, .7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]);
  ctx.beginPath(); ctx.arc(x, y, RB, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
}
function terna(ctx, s, cx, cy, r = 32, passo = 70, al = 1) {
  if (al <= 0) return;
  Array.from(s).forEach((L, j) => ball(ctx, cx + (j - 1) * passo, cy, L, C.x, { r, alpha: al }));
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Conta l’ordine?', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · gli atleti, il podio, la commissione (7.5–FINE)
const ORDINI = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA'];
function sceneAtleti(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 110, 110, 1020, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // il podio: tre gradini, da sinistra oro, argento, bronzo
  const pa = life(t, 8.4, 43.4, .5, .5);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    GRAD.forEach(([x, top, nome, n, tn]) => {
      ctx.fillStyle = css(C.v, .08); ctx.strokeStyle = css(C.v, .55); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(x - 90, top, 180, BASE - top, [14, 14, 0, 0]); ctx.fill(); ctx.stroke();
      M.txt(ctx, nome, x, top + 42, { size: 32, color: C.dim });
      M.txt(ctx, n, x, 752, { size: 56, weight: 600, color: C.g, alpha: P(t, tn, tn + .4) });
    });
    ctx.restore();
  }
  // la commissione: un riquadro senza gradini
  const ca = life(t, 43.9, FINE, .5, .6);
  if (ca > 0) {
    ctx.save(); ctx.globalAlpha *= ca;
    ctx.fillStyle = css(C.v, .05); ctx.strokeStyle = css(C.v, .6); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(160, 290, 340, 340, 26); ctx.fill(); ctx.stroke();
    conFont(TITOLI, () => drawRich(ctx, '{v:commissione}', 330, 342, { size: 36, weight: 600 }));
    ctx.restore();
  }
  // gli otto atleti
  Array.from(LET).forEach((L, i) => {
    const k = P(t, 7.9 + i * .08, 8.3 + i * .08, E.back);
    if (VIAGGI[L]) buco(ctx, RX(i), RY, P(t, VIAGGI[L][0][0], VIAGGI[L][0][0] + .3));
    const [x, y] = dove(L, i, t);
    ball(ctx, x, y, L, C.x, { r: RB, scale: k });
  });
  // i 6 podi con A, B, C
  ctx.save();
  M.txt(ctx, 'i podi con A, B e C', 825, 312, { size: 32, color: C.dim, alpha: life(t, 48.7, FINE, .4, .6) });
  ORDINI.forEach((s, i) => {
    const k = P(t, 53.1 + i * .15, 53.5 + i * .15, E.out);
    terna(ctx, s, i < 3 ? 700 : 950, 390 + (i % 3) * 100, 32, 70, k);
  });
  drawRich(ctx, '{g:6} podi, {g:1} commissione', 640, 712, { size: 38, local: t - 54.2 });
  ctx.restore();
  ctx.restore();
}

// la scheda dei conti, a destra (24–FINE)
const XM = 1505;
function sceneConti(ctx, t) {
  if (t < 24.5 || t > FINE + .7) return;
  const al = life(t, 24.6, FINE, .5, .6);
  card(ctx, 1170, 110, 670, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // i 336 podi restano in vista finché Ada ne parla, anche nella seconda parte
  drawRich(ctx, '{mink:8 · 7 · 6 = }{mg:336}', XM, 182, { size: 58, local: t - 24.8, alpha: 1 - P(t, 57.3, 57.7) });
  // 1 · le disposizioni
  const p1 = 1 - P(t, 43.0, 43.5);
  if (p1 > 0) {
    ctx.save(); ctx.globalAlpha *= p1;
    const kt = P(t, 28.5, 29.0);
    if (kt > 0) {
      ['1°', '2°', '3°'].forEach((s, j) => {
        M.txt(ctx, s, 1355 + (j - 1) * 70, 262, { size: 30, color: C.dim, alpha: kt });
        M.txt(ctx, s, 1655 + (j - 1) * 70, 262, { size: 30, color: C.dim, alpha: kt });
      });
      terna(ctx, 'ABC', 1355, 315, 32, 70, kt);
      terna(ctx, 'BAC', 1655, 315, 32, 70, P(t, 28.8, 29.3));
      drawRich(ctx, '{mink:≠}', XM, 315, { size: 56, alpha: P(t, 29.2, 29.6) });
    }
    conFont(TITOLI, () => drawRich(ctx, '{v:disposizione semplice}', XM, 425, { size: 40, weight: 600, local: t - 33.1 }));
    drawRich(ctx, '{dim:l’ordine conta, nessuno si ripete}', XM, 475, { size: 30, local: t - 33.6 });
    formula(ctx, [D(8, 3), '{mink: = }{mg:336}'], XM, 590, 60, { local: t - 37.8 });
    drawRich(ctx, '{dim:8 elementi, classe 3}', XM, 680, { size: 30, local: t - 38.6 });
    ctx.restore();
  }
  // 2 · le combinazioni
  if (t > 43.4) {
    // 3! = 3 · 2 · 1 = 6: prima la parte destra, poi il nome a sinistra, senza che niente si sposti
    const sx = '{mink:3! = }', dx = '{mink:3 · 2 · 1 = }{mg:6}';
    const x0 = XM - (richW(ctx, sx, 56) + richW(ctx, dx, 56)) / 2;
    drawRich(ctx, sx, x0, 165, { size: 56, align: 'left', local: t - 62.4 });
    drawRich(ctx, dx, x0 + richW(ctx, sx, 56), 165, { size: 56, align: 'left', local: t - 57.8 });
    formula(ctx, [{ fr: ['{mink:336}', '{mink:6}'] }, '{mink: = }{mg:56}'], XM, 290, 56, { local: t - 67.3 });
    conFont(TITOLI, () => drawRich(ctx, '{v:combinazione semplice}', XM, 400, { size: 40, weight: 600, local: t - 72.0 }));
    drawRich(ctx, '{dim:l’ordine }{r:non}{dim: conta}', XM, 442, { size: 30, local: t - 72.5 });
    const f = formula(ctx, [Cc(8, 3), '{mink: = }', BIN(8, 3), '{mink: = }{mg:56}'], XM, 535, 54, { local: t - 75.8 });
    const xb = f.x0 + f.ws[0] + f.ws[1] + 2 * f.gap + f.ws[2] / 2;
    drawRich(ctx, '{v:coefficiente binomiale}', xb, 615, { size: 30, local: t - 81.1 });
    formula(ctx, [Cc('n', 'k'), '{mink: = }', BIN('n', 'k'), '{mink: = }', { fr: [[D('n', 'k')], '{mink:k!}'] }], XM, 715, 52, { local: t - 84.5 });
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
    drawRich(ctx, 'Se l’ordine non conta, si divide per {mink:k!}:\ni modi di riordinare i {mink:k} scelti.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [380, 'podio', [D(8, 3), '{mink: = 8 · 7 · 6 = 336}']],
    [960, 'commissione', [Cc(8, 3), '{mink: = }', { fr: ['{mink:336}', '{mink:3!}'] }, '{mink: = }{mg:56}']],
    [1540, 'in generale', [BIN('n', 'k'), '{mink: = }', { fr: [[D('n', 'k')], '{mink:k!}'] }]],
  ];
  pills.forEach(([x, testa, f], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 270, 430, 540, 230);
    drawRich(ctx, `{dim:${testa}}`, x, 468, { size: 30, weight: 400 });
    formula(ctx, f, x, 578, 52);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Conta l’ordine?', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 43.4, 'il podio'], [43.4, FINE, 'la commissione']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneAtleti(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
