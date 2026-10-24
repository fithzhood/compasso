'use strict';
/* Mille sondaggi — da un’urna col 40% di palline rosse (p = 0,4) si estraggono campioni di n = 25: ogni campione dà
   una proporzione p̂ diversa (0,44, poi 0,32); mille campioni si ammucchiano a campana intorno a 0,4, larga
   σ = √(p(1 − p)/n) ≈ 0,098; con n = 100 σ ≈ 0,049, con n = 400 σ ≈ 0,0245: n per quattro, σ a metà.
   Le estrazioni vengono da un generatore con seme fisso (1045308): sempre gli stessi campioni.
   Argomento: statistica-inferenziale. */
CVIDEO.registra('statistica-inferenziale/campioni', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, card, glowStroke, arrowHead } = M;

const FINE = 87.8, DUR = 99.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [25.0, 'felice'],
  [27.4, 'neutro'], [32.2, 'felice'], [35.2, 'neutro'], [45.4, 'felice'], [47.6, 'neutro'], [55.8, 'felice'],
  [58.0, 'neutro'], [65.6, 'sorpreso'], [68.0, 'neutro'], [77.4, 'felice'], [79.6, 'neutro'], [82.4, 'festa'],
  [85.0, 'neutro'],
  [FINE + 1.0, 'felice'], [94.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Quanto sbaglia un {v:campione}\npreso a caso?'],
  // 1 · un campione
  [8.0, 12.6, 'Un’urna con tantissime palline:\nil {r:40%} è rosso.'],
  [12.8, 18.6, 'È la {v:popolazione}: la proporzione\ndi rosse è {mink:p = 0,4}.'],
  [18.8, 24.4, 'Ne estraggo 25 a caso: è un {v:campione},\ncon {mink:n = 25}.'],
  [24.6, 31.0, '{r:11} rosse: la proporzione nel\ncampione, {mink:p̂}, vale {mink:0,44}.'],
  [31.2, 34.6, 'Segno {mink:0,44} sul grafico.'],
  [36.0, 40.6, 'Un altro: {r:8} rosse, {mink:p̂ = 0,32}.'],
  // 2 · mille campioni
  [40.8, 45.0, 'Ogni campione sbaglia un po’.\nNe estraggo {v:mille}…'],
  [45.2, 50.2, '…e i {mink:p̂} si ammucchiano\na campana intorno a {r:0,4}.'],
  [50.4, 54.8, 'Quanto è larga? Lo dice\nla deviazione standard, {mink:σ}.'],
  [55.0, 60.4, 'Dipende da {mink:p} e da {mink:n}:\nqui {mink:σ ≈ 0,098}.'],
  // 3 · campioni più grandi
  [60.6, 65.2, 'Ora campioni più grandi, con {mink:n = 100}:\naltri mille…'],
  [65.4, 72.2, '…più {g:stretta} e più alta: sono sempre\nmille. {mink:σ ≈ 0,049}, la metà.'],
  [72.4, 76.8, 'E con {mink:n = 400}?\nAltri mille campioni…'],
  [77.0, 82.0, '…ancora la metà:\n{mink:σ ≈ 0,0245}.'],
  [82.2, 87.4, 'Ogni volta {mink:n} diventa {v:quattro volte}\npiù grande, e {mink:σ} si {g:dimezza}.'],
  // chiusura
  [88.6, 96.8, 'Per dimezzare la larghezza serve\nun campione {g:quattro volte} più grande.'],
];

// ---- le estrazioni: un generatore con seme fisso dà sempre gli stessi campioni ----
function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const NS = 1000, ENNE = [25, 100, 400], LARGH = { 25: .04, 100: .02, 400: .01 };
const KS = {}, PRIMI = [[], []];   // KS[n]: rosse in ogni campione; PRIMI: le palline dei primi due campioni da 25
(() => {
  const r = rng(1045308);
  ENNE.forEach(n => {
    const a = [];
    for (let i = 0; i < NS; i++) {
      let k = 0;
      for (let j = 0; j < n; j++) { const rossa = r() < .4; if (rossa) k++; if (n === 25 && i < 2) PRIMI[i].push(rossa); }
      a.push(k);
    }
    KS[n] = a;
  });
})();
// istogramma dei primi N campioni: ogni p̂ = k/n occupa [p̂ − 1/2n, p̂ + 1/2n]; classi larghe w centrate sui multipli di w
function conta(n, N) {
  const w = LARGH[n], nb = Math.round(1 / w), h = new Array(nb + 1).fill(0), ks = KS[n];
  for (let i = 0; i < N; i++) {
    const a = (ks[i] - .5) / n, b = (ks[i] + .5) / n;
    const c0 = Math.max(0, Math.floor(a / w + .5)), c1 = Math.min(nb, Math.floor(b / w + .5));
    for (let c = c0; c <= c1; c++) { const ov = Math.min(b, (c + .5) * w) - Math.max(a, (c - .5) * w); if (ov > 1e-9) h[c] += ov * n; }
  }
  return h;
}
const PIENO = {}; ENNE.forEach(n => { PIENO[n] = conta(n, NS); });

// ---- il grafico dei p̂ ----
const CARD = [110, 110, 1060, 690], PAN = [1200, 110, 610, 690];
const XS = p => 160 + (p - .04) * 4000 / 3, AY = 690, DS = 30;   // DS: pixel per unità di densità (area totale = 1)
const sig = n => Math.sqrt(.4 * .6 / n);
function barre(ctx, h, w, pxc, col, al) {
  if (al <= 0) return;
  const bw = w * 4000 / 3;
  ctx.save(); ctx.globalAlpha *= al;
  h.forEach((v, c) => {
    if (v <= 0) return;
    const x = XS(c * w) - bw / 2 + 1, hh = v * pxc;
    ctx.fillStyle = css(col, .24); ctx.fillRect(x, AY - hh, bw - 2, hh);
    ctx.strokeStyle = css(col, .9); ctx.lineWidth = Math.min(2.5, bw * .12); ctx.strokeRect(x, AY - hh, bw - 2, hh);
  });
  ctx.restore();
}
function campana(n) {
  const s = sig(n), pts = [];
  for (let i = 0; i <= 200; i++) {
    const p = .4 + (i / 100 - 1) * 4.2 * s, h = DS * Math.exp(-((p - .4) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
    if (p < .04 || p > .78 || h < 3) continue;   // le code non scorrono sull'asse
    pts.push([XS(p), AY - h]);
  }
  return pts;
}
const CAMPANE = {}; ENNE.forEach(n => { CAMPANE[n] = campana(n); });
// la campana di prima resta, tratteggiata e chiara, per confronto
function fantasma(ctx, pts, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.dim, .7); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
}
// σ sotto l'asse: una freccia da 0,4 a 0,4 + σ, sotto i numeri
function frecciaSigma(ctx, n, al) {
  if (al <= 0) return;
  const y = AY + 80, x0 = XS(.4), x1 = XS(.4 + sig(n));
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y - 12); ctx.lineTo(x0, y + 12); ctx.moveTo(x0, y); ctx.lineTo(x1 - 8, y); ctx.stroke();
  arrowHead(ctx, [x1, y], 0, C.v, .8);
  drawRich(ctx, '{mv:σ}', x1 + 18, y, { size: 40, align: 'left' });
  ctx.restore();
}
function asse(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(XS(.04), AY); ctx.lineTo(XS(.775), AY); ctx.stroke();
  arrowHead(ctx, [XS(.775) + 6, AY], 0, C.ink);
  ctx.lineWidth = 2;
  for (let i = 1; i <= 7; i++) {
    const x = XS(i / 10);
    ctx.beginPath(); ctx.moveTo(x, AY); ctx.lineTo(x, AY + 10); ctx.stroke();
    drawRich(ctx, `{mink:0,${i}}`, x, AY + 38, { size: 32 });
  }
  drawRich(ctx, '{mink:p̂}', XS(.775) + 4, AY - 40, { size: 40 });
  ctx.restore();
}

// ---- l'urna e il campione ----
const URNA = [];
(() => {
  const r = rng(4242), rosse = [];
  for (let i = 0; i < 80; i++) rosse.push(i < 32);   // il 40% di 80
  for (let i = 79; i > 0; i--) { const j = Math.floor(r() * (i + 1)), x = rosse[i]; rosse[i] = rosse[j]; rosse[j] = x; }
  for (let i = 0; i < 80; i++) { const rr = Math.floor(i / 10), cc = i % 10; URNA.push([215 + cc * 30 + (rr % 2) * 15, 412 - rr * 29, rosse[i]]); }
})();
function pallina(ctx, x, y, r, rossa, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = rossa ? css(C.r, .85) : css(C.ink, .07); ctx.fill();
  ctx.strokeStyle = rossa ? css(C.r) : css(C.ink, .45); ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
}
const GX = i => 700 + (i % 5) * 60, GY = i => 200 + Math.floor(i / 5) * 52, BOCCA = [370, 168];
// le 25 palline di un campione volano dalla bocca dell'urna alla griglia
function campione(ctx, t, palle, t0, passo, al) {
  if (al <= 0) return;
  palle.forEach((rossa, i) => {
    const u = P(t, t0 + i * passo, t0 + i * passo + .5, E.io); if (u <= 0) return;
    const x = lerp(BOCCA[0], GX(i), u), y = lerp(BOCCA[1], GY(i), u) - 45 * Math.sin(Math.PI * u);
    pallina(ctx, x, y, 20, rossa, al);
  });
}
// un campione diventa un blocco che cade sul grafico
function blocco(ctx, t, t0, p) {
  const u = P(t, t0, t0 + .6, E.in); if (u <= 0 || u >= 1) return;
  const bw = .04 * 4000 / 3 - 2, x = lerp(820, XS(p), u), y = lerp(460, AY - 13, u);
  ctx.save(); ctx.fillStyle = css(C.x, .24); ctx.fillRect(x - bw / 2, y - 13, bw, 26);
  ctx.strokeStyle = css(C.x, .9); ctx.lineWidth = 2.5; ctx.strokeRect(x - bw / 2, y - 13, bw, 26); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Mille sondaggi', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// quanti campioni da 25 sono già sul grafico: uno, due, poi mille sempre più in fretta
const N25 = t => t < 32.4 ? 0 : t < 37.2 ? 1 : t < 41.0 ? 2 : 2 + 998 * P(t, 41.0, 44.6, E.in);
const N100 = t => NS * P(t, 61.0, 64.6, E.io), N400 = t => NS * P(t, 72.8, 76.4, E.io);

// 1–3 · l'urna, i campioni, le campane (7.5–FINE)
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // l'urna
  const ku = P(t, 8.0, 8.5) * (1 - P(t, 40.8, 41.4));
  if (ku > 0) {
    ctx.save(); ctx.globalAlpha *= ku; ctx.strokeStyle = css(C.ink, .6); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(195, 178); ctx.lineTo(195, 410); ctx.quadraticCurveTo(195, 440, 225, 440);
    ctx.lineTo(515, 440); ctx.quadraticCurveTo(545, 440, 545, 410); ctx.lineTo(545, 178); ctx.stroke(); ctx.restore();
    URNA.forEach(([x, y, rossa], i) => pallina(ctx, x, y, 13, rossa, ku * P(t, 8.3 + i * .012, 8.6 + i * .012)));
    drawRich(ctx, '{dim:popolazione}', 370, 482, { size: 32, alpha: ku * P(t, 13.0, 13.4) });
  }
  // i due campioni da 25
  const k1 = 1 - P(t, 34.6, 34.9), k2 = 1 - P(t, 40.8, 41.4);
  campione(ctx, t, PRIMI[0], 19.0, .08, k1);
  if (t > 34.6) campione(ctx, t, PRIMI[1], 34.7, .03, k2);
  // le rosse contate
  const c1 = life(t, 24.8, 34.9, .4, .3), c2 = P(t, 36.0, 36.4) * k2;
  [[0, c1], [1, c2]].forEach(([j, k]) => {
    if (k <= 0) return;
    PRIMI[j].forEach((rossa, i) => {
      if (!rossa) return;
      ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.r); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(GX(i), GY(i), 27, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    });
    drawRich(ctx, `{r:${KS[25][j]} rosse}{dim: su 25}`, 820, 482, { size: 34, alpha: k });
  });
  // il grafico
  asse(ctx, P(t, 31.3, 31.8));
  blocco(ctx, t, 31.8, KS[25][0] / 25);
  blocco(ctx, t, 36.6, KS[25][1] / 25);
  // n = 25: i blocchi, poi mille campioni; la scala si adatta finché i campioni crescono
  const k25 = 1 - P(t, 60.6, 61.2);
  if (t > 32.4 && k25 > 0) {
    const Nf = N25(t), N = Math.floor(Nf), pxc = Math.min(26, DS / (Math.max(Nf, 1) * .04));
    barre(ctx, N >= NS ? PIENO[25] : conta(25, N), .04, pxc, C.x, k25);
  }
  if (t > 61.0) barre(ctx, t >= 64.6 ? PIENO[100] : conta(100, Math.floor(N100(t))), .02, DS / (NS * .02), C.x, 1 - P(t, 72.4, 73.0));
  if (t > 72.8) barre(ctx, t >= 76.4 ? PIENO[400] : conta(400, Math.floor(N400(t))), .01, DS / (NS * .01), C.x, 1);
  // il valore vero p = 0,4
  const kp = P(t, 45.4, 45.9);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = css(C.r, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.moveTo(XS(.4), AY - 4); ctx.lineTo(XS(.4), 182); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:p = }{r:0,4}', XS(.4), 156, { size: 40, alpha: kp });
  }
  // le campane: quella di prima resta tratteggiata
  fantasma(ctx, CAMPANE[25], P(t, 60.6, 61.2));
  fantasma(ctx, CAMPANE[100], P(t, 72.4, 73.0));
  const kc25 = 1 - P(t, 60.6, 61.2);
  if (t > 45.3 && kc25 > 0) { ctx.save(); ctx.globalAlpha *= kc25; glowStroke(ctx, CAMPANE[25], P(t, 45.4, 46.4), C.y, 5); ctx.restore(); }
  if (t > 65.5 && t < 73.0) { ctx.save(); ctx.globalAlpha *= 1 - P(t, 72.4, 73.0); glowStroke(ctx, CAMPANE[100], P(t, 65.6, 66.4), C.y, 5); ctx.restore(); }
  if (t > 77.1) glowStroke(ctx, CAMPANE[400], P(t, 77.2, 78.0), C.y, 5);
  // σ
  frecciaSigma(ctx, 25, life(t, 50.6, 60.8, .4, .3));
  frecciaSigma(ctx, 100, life(t, 65.6, 72.6, .4, .3));
  frecciaSigma(ctx, 400, P(t, 77.2, 77.6));
  // quanti campioni
  const kc = life(t, 41.2, FINE, .4, .3);
  if (kc > 0) {
    const Nc = t < 60.8 ? N25(t) : t < 72.6 ? N100(t) : N400(t);
    ctx.save(); ctx.globalAlpha *= kc;
    drawRich(ctx, '{dim:campioni}', 1028, 160, { size: 34, align: 'right' });
    fixedNum(ctx, String(Math.floor(Nc)), 1140, 160, 40, C.x);
    ctx.restore();
  }
  ctx.restore();
}

// σ = √(p(1 − p) / n): la radice disegnata qui, sopra una frazione
function radice(ctx, pre, num, den, cx, cy, s, al) {
  if (al <= 0) return;
  const wp = richW(ctx, pre, s), wf = Math.max(richW(ctx, num, s), richW(ctx, den, s)) + s * .3, rw = s * .62, g = s * .18;
  const x0 = cx - (wp + g + rw + wf) / 2, xr = x0 + wp + g, top = cy - s * 1.56, bot = cy + s * 1.2;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, pre, x0, cy, { size: s, align: 'left' });
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .06); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xr, cy + s * .3); ctx.lineTo(xr + rw * .22, cy + s * .14); ctx.lineTo(xr + rw * .55, bot);
  ctx.lineTo(xr + rw, top); ctx.lineTo(xr + rw + wf, top); ctx.stroke();
  const xm = xr + rw + wf / 2;
  drawRich(ctx, num, xm, cy - s * .6, { size: s }); drawRich(ctx, den, xm, cy + s * .66, { size: s });
  ctx.beginPath(); ctx.moveTo(xr + rw + s * .1, cy + s * .04); ctx.lineTo(xr + rw + wf - s * .1, cy + s * .04); ctx.stroke();
  ctx.restore();
}
const SIGMA = ['{mink:σ =}', '{mink:p(1 − p)}', '{mink:n}'];

// il riquadro: prima popolazione e campione, poi la tabella di σ (12.9–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1250, RX = 1765;
function scenePannello(ctx, t) {
  const al = life(t, 12.9, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const riga = (nome, val, y, col, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    drawRich(ctx, nome, LX, y, { size: 44, align: 'left' });
    drawRich(ctx, val, RX, y, { size: 44, align: 'right' });
    ctx.restore();
  };
  // A · popolazione e campione
  const kA = 1 - P(t, 54.8, 55.2);
  if (kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    conFont(TITOLI, () => drawRich(ctx, 'popolazione', PX, 170, { size: 38, weight: 600, local: t - 13.0 }));
    riga('{mink:p =}', '{r:0,4}', 240, C.r, P(t, 15.0, 15.4));
    conFont(TITOLI, () => drawRich(ctx, 'campione', PX, 340, { size: 38, weight: 600, local: t - 19.0 }));
    riga('{mink:n =}', '{x:25}', 410, C.x, P(t, 19.2, 19.6));
    const kf2 = 1 - P(t, 40.8, 41.2);
    riga('{mink:p̂ =}', `{mink:${KS[25][0]}/25 = }{x:${KS[25][0] * 4 / 100}}`.replace('.', ','), 480, C.x, P(t, 27.0, 27.4) * (1 - P(t, 34.6, 34.9)));
    riga('{mink:p̂ =}', `{mink:${KS[25][1]}/25 = }{x:${KS[25][1] * 4 / 100}}`.replace('.', ','), 480, C.x, P(t, 36.1, 36.5) * kf2);
    ctx.restore();
  }
  // B · la deviazione standard per n = 25, 100, 400
  const kB = P(t, 55.0, 55.4);
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    conFont(TITOLI, () => drawRich(ctx, 'deviazione standard', PX, 170, { size: 38, weight: 600, local: t - 55.0 }));
    radice(ctx, ...SIGMA, PX, 272, 44, P(t, 55.2, 55.7));
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 356); ctx.lineTo(PAN[0] + PAN[2] - 40, 356); ctx.stroke();
    drawRich(ctx, '{mink:n}', 1370, 400, { size: 40 }); drawRich(ctx, '{mink:σ}', 1630, 400, { size: 40 });
    [['25', '0,098', 455, 55.4, 55.6], ['100', '0,049', 575, 60.8, 65.8], ['400', '0,0245', 695, 72.6, 77.4]].forEach(([n, s, y, ta, tb]) => {
      drawRich(ctx, `{x:${n}}`, 1370, y, { size: 44, alpha: P(t, ta, ta + .4) });
      drawRich(ctx, `{mink:≈ }{g:${s}}`, 1630, y, { size: 44, alpha: P(t, tb, tb + .4) });
    });
    // n per 4, σ a metà
    const ka = P(t, 82.4, 82.9);
    if (ka > 0) [515, 635].forEach(y => {
      ctx.save(); ctx.globalAlpha *= ka; ctx.lineWidth = 3; ctx.lineCap = 'round';
      [[1370, C.v, '{v:per 4}'], [1630, C.g, '{g:metà}']].forEach(([x, col, s]) => {
        ctx.strokeStyle = css(col); ctx.beginPath(); ctx.moveTo(x - 72, y - 20); ctx.lineTo(x - 72, y + 12); ctx.stroke();
        arrowHead(ctx, [x - 72, y + 18], Math.PI / 2, col, .6);
        drawRich(ctx, s, x, y, { size: 32 });
      });
      ctx.restore();
    });
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
    drawRich(ctx, 'I {mink:p̂} dei campioni fanno una campana intorno\na {mink:p}: più grande è {mink:n}, più è {g:stretta}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[440, '{dim:un campione}', 240], [960, '{dim:la larghezza}', 230], [1500, '{dim:un campione 4 volte più grande}', 280]];
  pills.forEach(([x, testa, mw], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 552); ctx.scale(k, k); ctx.translate(-x, -552);
    card(ctx, x - mw, 445, 2 * mw, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mink:p̂}{ink: è vicino a }{mink:p}', x, 572, { size: 44 });
    if (i === 1) radice(ctx, ...SIGMA, x, 580, 40, 1);
    if (i === 2) drawRich(ctx, '{mink:σ}{ink: a metà}', x, 572, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.3, .3], ['tono', 8.3, 9.25, [.1, .9]],                 // l'urna si riempie dal fondo
    ['soffio', 12.9], ['pop', 15.1, .5],                                               // p = 0,4
    ['tono', 19.0, 21.4, [.4, .75, .9, .75, .5]],                                      // 25 palline volano nel campione
    ['pop', 24.9, .6], ['pop', 27.1, .5],                                              // 11 rosse, p̂ = 0,44
    ['traccia', 31.3, 31.8], ['tono', 31.8, 32.4, [.7, .1]], ['pop', 32.4, .3],        // il blocco cade su 0,44
    ['tono', 34.7, 35.9, [.4, .75, .9, .75, .5]], ['pop', 36.1, .5],                   // il secondo campione: 8 rosse
    ['tono', 36.6, 37.2, [.7, .1]], ['pop', 37.2, .3],                                 // il blocco cade su 0,32
    ['soffio', 40.8], ['tono', 41.0, 44.6, [.05, .06, .1, .2, .4, .7]],                // mille campioni: il mucchio cresce
    ['traccia', 45.4, 46.4], ['tono', 45.4, 46.4, [.05, .2, .6, .2, .05]], ['pop', 45.6, .6],   // la campana, p = 0,4
    ['traccia', 50.6, 51.0], ['pop', 50.8, .55],                                       // σ
    ['soffio', 55.0], ['pop', 55.3, .5], ['ding', 55.7],                               // la formula, σ ≈ 0,098
    ['tono', 61.0, 64.6, [.05, .3, .6, .75]],                                          // n = 100: le barre crescono
    ['traccia', 65.6, 66.4], ['ding', 65.9],                                           // più stretta: σ ≈ 0,049
    ['tono', 72.8, 76.4, [.05, .4, .8, .95]],                                          // n = 400
    ['traccia', 77.2, 78.0], ['ding', 77.5],                                           // σ ≈ 0,0245
    ['pop', 82.5, .5], ['pop', 82.7, .7],                                              // per 4, metà
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Mille sondaggi', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 40.8, 'un campione'], [40.8, 60.6, 'mille campioni'], [60.6, FINE, 'campioni più grandi']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
