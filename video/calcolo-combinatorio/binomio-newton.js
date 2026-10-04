'use strict';
/* Il binomio di Newton — (a + b)³ è il prodotto di tre parentesi: da ognuna prendo a oppure b; a²b si ottiene
   prendendo b da una parentesi sola, che si sceglie in (3 su 1) = 3 modi; i coefficienti 1, 3, 3, 1 sono la riga 3
   del triangolo di Tartaglia; il termine generale (n su k) aⁿ⁻ᵏ bᵏ. Argomento: calcolo-combinatorio. */
CVIDEO.registra('calcolo-combinatorio/binomio-newton', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, richW, card, txt } = M;

const FINE = 77.8, DUR = 89;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [20.7, 'sorpreso'], [22.8, 'neutro'], [30.1, 'festa'], [32.4, 'neutro'],
  [48.1, 'felice'], [52.2, 'sorpreso'], [54.3, 'neutro'], [67.4, 'felice'], [69.5, 'neutro'],
  [FINE, 'neutro'], [79.8, 'felice'], [84.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; le scelte compaiono all'inizio del fumetto che ne parla
const FUMETTI = [
  [2.4, 6.4, 'Perché in {mink:(a + b)³}\ncompare {mink:3a²b}?'],
  // 1 · tre parentesi
  [8.0, 12.0, '{mink:(a + b)³} è il prodotto\ndi tre parentesi uguali.'],
  [12.1, 16.2, 'Da ogni parentesi prendo {mx:a}\noppure {my:b}, e moltiplico.'],
  [16.3, 20.6, 'Prendo {my:b} dalla terza, {mx:a} dalle altre:\nviene {mink:a · a · b = a²b}.'],
  [20.7, 25.0, 'Ma {my:b} può venire anche\ndalla seconda, o dalla prima.'],
  [25.1, 30.0, '{g:3} modi: scelgo {g:quale} parentesi\ndà la {my:b}, cioè «3 su 1».'],
  [30.1, 33.6, 'Per questo in {mink:(a + b)³}\nc’è {mink:3a²b}.'],
  // 2 · tutti i termini
  [33.7, 37.2, 'In fila i termini, secondo\nquante {my:b} hanno.'],
  [37.3, 42.6, 'Con due {my:b}: scelgo 2 parentesi\nsu 3, «3 su 2» = 3 modi.'],
  [42.7, 48.0, 'Senza {my:b}, un modo solo: {mink:a³}.\nTutte {my:b}, uno solo: {mink:b³}.'],
  [48.1, 52.1, 'Ecco lo sviluppo: i coefficienti\nsono 1, 3, 3, 1.'],
  [52.2, 57.0, 'Sono la riga 3 del triangolo\ndi Tartaglia, contando da 0.'],
  // 3 · in generale
  [57.2, 63.2, 'Con {mink:n} parentesi, se {my:b} viene da {mink:k}\ndi esse, i modi sono «{mink:n} su {mink:k}».'],
  [63.3, 67.3, '{mx:a} viene dalle altre {mink:n − k}:\nè il {v:termine generale}.'],
  [67.4, 71.4, 'Con {mink:n = 3} e {mink:k = 1}\nritrovo proprio {mink:3a²b}.'],
  [71.5, 77.4, 'Ci sono {mink:n + 1} termini; l’esponente\ndi {mx:a} scende da {mink:n} a 0, quello di {my:b} sale.'],
  // chiusura
  [79.8, 86.0, 'Il coefficiente conta i modi di\nscegliere le parentesi che danno {my:b}.'],
];

// ---------- formule con coefficienti binomiali e potenze, disegnate qui ----------
// pezzi: testo ricco | { bin: [n, k] } | { pow: [base, esponente] }
function largo(ctx, it, s) {
  if (typeof it === 'string') return richW(ctx, it, s);
  if (it.bin) return Math.max(richW(ctx, it.bin[0], s * .82), richW(ctx, it.bin[1], s * .82)) + s * .8;
  if (it.pow) return richW(ctx, it.pow[0], s) + richW(ctx, it.pow[1], s * .62) + s * .16;
  return 0;
}
function pezzo(ctx, it, x, cy, s) {
  if (typeof it === 'string') { drawRich(ctx, it, x, cy, { size: s, align: 'left' }); return; }
  if (it.pow) {
    const wb = richW(ctx, it.pow[0], s);
    drawRich(ctx, it.pow[0], x, cy, { size: s, align: 'left' });
    drawRich(ctx, it.pow[1], x + wb + s * .04, cy - s * .44, { size: s * .62, align: 'left' });
    return;
  }
  const w = largo(ctx, it, s), h = s * 1.95, pw = s * .3, xm = x + w / 2;
  ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .06); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + pw, cy - h / 2); ctx.quadraticCurveTo(x - s * .12, cy, x + pw, cy + h / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w - pw, cy - h / 2); ctx.quadraticCurveTo(x + w + s * .12, cy, x + w - pw, cy + h / 2); ctx.stroke();
  ctx.restore();
  drawRich(ctx, it.bin[0], xm, cy - s * .5, { size: s * .82 });
  drawRich(ctx, it.bin[1], xm, cy + s * .52, { size: s * .82 });
}
function formula(ctx, items, cx, cy, s, o = {}) {
  const al = o.alpha ?? 1; if (al <= .002) return null;
  const local = o.local ?? 99, gap = s * .1;
  const ws = items.map(it => largo(ctx, it, s)), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  const x0 = o.align === 'left' ? cx : cx - tot / 2;
  let x = x0;
  items.forEach((it, i) => {
    const lo = o.locali ? o.locali[i] : local - i * .3, k = P(lo, 0, .5, E.out);
    if (k > 0) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); pezzo(ctx, it, x, cy, s); ctx.restore(); }
    x += ws[i] + gap;
  });
  return { x0, ws, gap, tot };
}
const BIN = (n, k) => ({ bin: [`{mink:${n}}`, `{mink:${k}}`] });
const POW = (b, e) => ({ pow: [b, `{mink:${e}}`] });
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

// ---------- le tre parentesi ----------
const PAR = '{mink:(}{mx:a}{mink: + }{my:b}{mink:)}', SP = 64, XP = [640, 960, 1280], YP = 225;
function lettere(ctx, cx) {   // centri della a e della b dentro una parentesi
  const w = richW(ctx, PAR, SP), x0 = cx - w / 2;
  const wp = richW(ctx, '{mink:(}', SP), wa = richW(ctx, '{mx:a}', SP), wpl = richW(ctx, '{mink: + }', SP), wb = richW(ctx, '{my:b}', SP);
  return [x0 + wp + wa / 2, x0 + wp + wa + wpl + wb / 2];
}
function riquadro(ctx, x, y, w, h, col, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 14); ctx.stroke(); ctx.restore();
}
// le scelte: una lettera per parentesi
const SCELTE = [['a', 'a', 'b', 16.4, 360], ['a', 'b', 'a', 20.8, 450], ['b', 'a', 'a', 21.2, 540]];
const LET = c => c === 'a' ? '{mx:a}' : '{my:b}';

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il binomio di Newton', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · (a + b)³ (7.5–56.6)
function sceneTre(ctx, t) {
  if (t < 7.5 || t > 57.5) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 56.9, 57.3);
  // la riga in alto: (a + b)³ = (a + b) · (a + b) · (a + b); esce fra un fumetto e l'altro, prima della tabella
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 33.55, 33.85);
  drawRich(ctx, '{mink:(a + b)³ =}', 470, YP, { size: SP, align: 'right', local: t - 8.1 });
  XP.forEach((x, j) => {
    const k = P(t, 8.4 + j * .2, 8.9 + j * .2);
    drawRich(ctx, PAR, x, YP, { size: SP, alpha: k });
    if (j < 2) drawRich(ctx, '{mink:·}', (x + XP[j + 1]) / 2, YP, { size: SP, alpha: k });
    txt(ctx, ['1ª', '2ª', '3ª'][j], x, 148, { size: 30, color: C.dim, alpha: P(t, 12.2 + j * .15, 12.6 + j * .15) });
  });
  // la scelta a, a, b sulle parentesi
  const hs = life(t, 16.4, 20.6, .3, .3);
  if (hs > 0) XP.forEach((x, j) => {
    const [xa, xb] = lettere(ctx, x), c = SCELTE[0][j];
    // la lettera scelta si sottolinea: un riquadro toccherebbe le parentesi
    const xl = c === 'a' ? xa : xb;
    ctx.save(); ctx.globalAlpha *= hs; ctx.strokeStyle = css(c === 'a' ? C.x : C.y); ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(xl - 20, YP + 48); ctx.lineTo(xl + 20, YP + 48); ctx.stroke(); ctx.restore();
  });
  ctx.restore();
  // 1 · le tre scelte che danno a²b
  const a1 = 1 - P(t, 33.55, 33.85);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    for (const [c1, c2, c3, ta, y] of SCELTE) {
      const k = P(t, ta, ta + .4, E.out);
      if (k <= 0) continue;
      [c1, c2, c3].forEach((c, j) => {
        drawRich(ctx, LET(c), XP[j], y, { size: 60, alpha: k });
        if (j < 2) drawRich(ctx, '{mink:·}', (XP[j] + XP[j + 1]) / 2, y, { size: 60, alpha: k });
      });
      drawRich(ctx, '{mink:= a²b}', 1390, y, { size: 60, align: 'left', alpha: k });
    }
    // i 3 modi: quale parentesi dà la b
    const kg = P(t, 25.2, 25.6);
    if (kg > 0) {
      ctx.save(); ctx.globalAlpha *= kg; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(1568, 318); ctx.lineTo(1580, 318); ctx.lineTo(1580, 582); ctx.lineTo(1568, 582);
      ctx.moveTo(1580, 450); ctx.lineTo(1592, 450); ctx.stroke(); ctx.restore();
    }
    formula(ctx, [BIN(3, 1), '{mink: = }{mg:3}'], 1688, 450, 54, { local: t - 25.5 });
    const kt = P(t, 30.2, 30.6);
    drawRich(ctx, '{mg:3}{mink:a²b}', 960, 690, { size: 66, alpha: kt });
    riquadro(ctx, 960, 690, 210, 100, C.g, P(t, 30.6, 31.0));
    ctx.restore();
  }
  // 2 · la tabella dei termini
  const a2 = P(t, 33.85, 34.25);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    drawRich(ctx, '{dim:parentesi con }{my:b}', 380, 200, { size: 30 });
    drawRich(ctx, '{dim:termine}', 760, 200, { size: 30 });
    drawRich(ctx, '{dim:modi}', 1090, 200, { size: 30 });
    const TERM = ['{mink:a³}', '{mink:a²b}', '{mink:ab²}', '{mink:b³}'], TK = [42.8, 34.0, 37.4, 43.1];
    for (let k = 0; k <= 3; k++) {
      const y = 280 + k * 120, kk = P(t, TK[k], TK[k] + .4, E.out);
      if (kk <= 0) continue;
      txt(ctx, String(k), 380, y, { size: 48, weight: 600, color: C.y, alpha: kk });
      drawRich(ctx, TERM[k], 760, y, { size: 52, alpha: kk });
      formula(ctx, [BIN(3, k), `{mink: = ${binom(3, k)}}`], 1090, y, 54, { alpha: kk });
    }
    drawRich(ctx, '{mink:(a + b)³ = a³ + }{mg:3}{mink:a²b + }{mg:3}{mink:ab² + b³}', 760, 760, { size: 44, local: t - 48.2 });
    // il triangolo fino alla riga 3
    const kt = P(t, 52.3, 52.7);
    if (kt > 0) {
      ctx.save(); ctx.globalAlpha *= kt;
      ctx.fillStyle = css(C.v, .1); ctx.beginPath(); ctx.roundRect(1520 - 145, 596 - 32, 290, 64, 32); ctx.fill();
      for (let r = 0; r <= 3; r++) {
        txt(ctx, `riga ${r}`, 1340, 380 + r * 72, { size: 30, color: r === 3 ? C.v : C.dim, align: 'right' });
        for (let k = 0; k <= r; k++) txt(ctx, String(binom(r, k)), 1520 + (k - r / 2) * 72, 380 + r * 72, { size: 40, weight: 600, color: r === 3 ? C.g : C.ink });
      }
      ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
}

// la scheda (7.5–FINE)
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  card(ctx, 110, 110, 1700, 690, life(t, 7.5, FINE, .6, .6));
}

// 3 · in generale (56.5–FINE)
function sceneGenerale(ctx, t) {
  if (t < 57.1 || t > FINE + .7) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .4, FINE + .2);
  // (a + b)ⁿ: n parentesi
  const sx = '{mink:(a + b)ⁿ = }', dx = '{mink:(a + b)(a + b) … (a + b)}';
  const wl = richW(ctx, sx, 56), wr = richW(ctx, dx, 56), x0 = 960 - (wl + wr) / 2;
  drawRich(ctx, sx, x0, 210, { size: 56, align: 'left', local: t - 57.3 });
  drawRich(ctx, dx, x0 + wl, 210, { size: 56, align: 'left', local: t - 57.6 });
  const kb = P(t, 58.1, 58.5);
  if (kb > 0) {
    const a = x0 + wl + 6, b = x0 + wl + wr - 6;
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a, 252); ctx.lineTo(a, 262); ctx.lineTo(b, 262); ctx.lineTo(b, 252);
    ctx.moveTo((a + b) / 2, 262); ctx.lineTo((a + b) / 2, 272); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:n}{dim: parentesi}', (a + b) / 2, 302, { size: 32, alpha: kb });
  }
  // il termine generale e che cosa vuol dire ogni pezzo
  conFont(TITOLI, () => drawRich(ctx, '{v:termine generale}', 560, 385, { size: 40, weight: 600, local: t - 63.4 }));
  formula(ctx, [BIN('n', 'k'), POW('{mx:a}', 'n−k'), POW('{my:b}', 'k')], 560, 505, 76, { locali: [t - 57.7, t - 63.4, t - 58.0] });
  drawRich(ctx, '{my:b}{dim: viene da }{mink:k}{dim: parentesi}', 960, 440, { size: 34, align: 'left', local: t - 58.1 });
  drawRich(ctx, '{dim:in «}{mink:n}{dim: su }{mink:k}{dim:» modi}', 960, 510, { size: 34, align: 'left', local: t - 59.3 });
  drawRich(ctx, '{mx:a}{dim: viene dalle altre }{mink:n − k}', 960, 580, { size: 34, align: 'left', local: t - 63.5 });
  // la prova con n = 3, k = 1
  const ke = P(t, 67.4, 67.8);
  if (ke > 0) {
    formula(ctx, [BIN(3, 1), POW('{mx:a}', '3−1'), POW('{my:b}', '1'), '{mink: = 3a²b}'], 960, 695, 54, { local: t - 67.4, alpha: 1 - P(t, 71.5, 71.9) });
  }
  // le regole pratiche dello sviluppo, al posto della prova
  if (t > 71.8) {
    drawRich(ctx, '{mink:n + 1}{dim: termini}', 960, 668, { size: 40, local: t - 71.9 });
    drawRich(ctx, '{dim:esponente di }{mx:a}{dim: da }{mink:n}{dim: a 0,  esponente di }{my:b}{dim: da 0 a }{mink:n}', 960, 738, { size: 36, local: t - 72.6 });
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
    drawRich(ctx, 'Il coefficiente di ogni termine conta i modi\ndi scegliere le parentesi da cui prendi la {my:b}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[475, 690], [1065, 440], [1560, 460]];
  pills.forEach(([x, w], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - w / 2, 455, w, 180);
    if (i === 0) drawRich(ctx, '{mink:(a + b)³ = a³ + 3a²b + 3ab² + b³}', x, 545, { size: 40 });
    if (i === 1) drawRich(ctx, 'coefficienti: la riga {mink:n}\ndel triangolo di Tartaglia', x, 545, { size: 32, weight: 400, lh: 1.3 });
    if (i === 2) formula(ctx, [BIN('n', 'k'), POW('{mx:a}', 'n−k'), POW('{my:b}', 'k')], x, 545, 52);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il binomio di Newton', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 33.7, 'tre parentesi'], [33.7, 57.1, 'tutti i termini'], [57.1, FINE, 'in generale']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneScheda(ctx, t); sceneTre(ctx, t); sceneGenerale(ctx, t); sceneFine(ctx, t); },
  };
});
