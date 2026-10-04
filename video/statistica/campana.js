'use strict';
/* La curva a campana — la macchina di Galton: dodici urti a caso per pallina, e le palline si ammucchiano a campana;
   poi la distribuzione normale delle altezze: μ dice dove sta il centro, σ quanto è larga, e circa il 68% sta fra
   μ − σ e μ + σ (μ = 170 cm, σ = 8 cm: fra 162 e 178 cm). Argomento: statistica. */
CVIDEO.registra('statistica/campana', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, card, glowStroke, arrowHead } = M;

const FINE = 79.8, DUR = 91.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [13.4, 'felice'],
  [17.4, 'neutro'], [21.4, 'sorpreso'], [25.8, 'pensa'], [31.0, 'neutro'], [33.0, 'felice'], [37.0, 'neutro'],
  [41.6, 'felice'], [45.4, 'neutro'], [50.6, 'sorpreso'], [53.6, 'neutro'], [62.4, 'sorpreso'], [65.8, 'neutro'],
  [70.0, 'felice'], [74.0, 'neutro'], [76.4, 'festa'],
  [FINE + 1.0, 'felice'], [86.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Perché tante misure\nfanno una {v:campana}?'],
  // 1 · la macchina di Galton
  [7.9, 13.2, 'Una pallina cade fra i chiodi:\na ogni urto va a destra o a sinistra.'],
  [13.4, 17.2, 'Dopo 12 urti {r:a caso} finisce\nin una casella.'],
  [17.4, 20.9, 'Ora ne faccio cadere {v:tante}…'],
  [21.1, 25.6, '…e si ammucchiano al centro;\nai lati ne arrivano poche.'],
  [25.8, 30.8, 'Per finire su un lato servono\nurti tutti da una parte: è {r:raro}.'],
  [31.0, 35.8, 'Tanti piccoli effetti a caso\nsi sommano: ecco una {v:campana}.'],
  // 2 · la normale: μ e σ
  [37.0, 41.4, 'Le altezze di tante persone\nhanno la stessa forma a campana.'],
  [41.6, 45.2, 'Si chiama {v:distribuzione normale},\no gaussiana.'],
  [45.4, 49.6, 'Il centro è la media, {mink:μ}:\nqui {mink:μ = 170} cm.'],
  [49.8, 53.4, 'Se {mink:μ} cambia, la campana\n{g:scivola} di lato.'],
  [53.6, 56.4, 'Torno a {mink:μ = 170} cm.'],
  [56.6, 61.4, 'La larghezza la dice la deviazione\nstandard, {mink:σ}: qui {mink:σ = 8} cm.'],
  [61.6, 65.6, 'Con {mink:σ} più grande si {g:allarga}\ne si abbassa.'],
  [65.8, 68.6, 'Torno a {mink:σ = 8} cm.'],
  // 3 · il 68%
  [68.8, 73.8, 'Fra {mink:μ − σ} e {mink:μ + σ} c’è\n{g:circa il 68%} dei dati.'],
  [74.0, 79.0, 'Qui: circa 68 persone su 100\nsono fra {g:162} e {g:178} cm.'],
  // chiusura
  [80.6, 88.9, 'Centro {mink:μ}, larghezza {mink:σ}: circa\nil 68% sta fra {mink:μ − σ} e {mink:μ + σ}.'],
];

// ---- la macchina di Galton ----
// ogni pallina ha i suoi dodici urti, decisi da un generatore con seme fisso: sempre gli stessi a ogni fotogramma
function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const NB = 360, NR = 12, GX = 960, S = 56, PY0 = 190, RS = 30, BY0 = 548, FY = 780, DS = 10.4;
const PALLE = [], CONTA = new Array(NR + 1).fill(0);
for (let i = 0; i < NB; i++) {
  const r = rng(1000 + i * 7919), dx = [];
  for (let j = 0; j < NR; j++) dx.push(r() < .5 ? 1 : 0);
  const k = dx.reduce((a, b) => a + b, 0), n = CONTA[k]++;
  // la prima scende piano; le altre partono sempre più fitte
  const t0 = i ? 17.6 + 6.3 * Math.sqrt((i - 1) / (NB - 2)) : 8.4, dr = i ? .07 : .3, tf = i ? .3 : .45;
  PALLE.push({ dx, k, t0, dr, tf, sx: GX + (k - 6) * S + (n % 5 - 2) * DS, sy: FY - 6 - Math.floor(n / 5) * DS });
}
// dove sta la pallina i all'istante t (null se non è ancora partita)
function posizione(b, t) {
  const u = t - b.t0; if (u < 0) return null;
  const tocco = r => { let R = 0; for (let j = 0; j < r; j++) R += b.dx[j]; return [GX + (R - r / 2) * S, PY0 + r * RS - 11]; };
  if (u < b.dr) return [GX, lerp(150, PY0 - 11, u / b.dr)];
  const seg = Math.floor(u / b.dr) - 1;
  if (seg < NR) {
    const f = E.io(u / b.dr - 1 - seg), a = tocco(seg), c = tocco(seg + 1);
    return [lerp(a[0], c[0], f), lerp(a[1], c[1], f) - 10 * Math.sin(Math.PI * f)];
  }
  const a = tocco(NR), f = Math.min(1, (u - (NR + 1) * b.dr) / b.tf);
  return [lerp(a[0], b.sx, f), lerp(a[1], b.sy, E.in(f))];
}
const fine0 = PALLE[0].t0 + (NR + 1) * PALLE[0].dr + PALLE[0].tf;

// ---- la campana delle altezze ----
const XH = h => 960 + (h - 170) * 15, AXY = 690, AREA = 3040;
const muAt = t => kf(t, [[50.2, 170], [51.6, 182], [53.8, 182], [55.0, 170]]);   // il ritorno ha il suo fumetto
const sgAt = t => kf(t, [[62.0, 8], [63.4, 14], [66.0, 14], [67.2, 8]]);
const yG = (h, mu, sg) => AXY - AREA / sg * Math.exp(-((h - mu) ** 2) / (2 * sg * sg));
function curva(mu, sg, a = 124, b = 216, n = 220) { const p = []; for (let i = 0; i <= n; i++) { const h = lerp(a, b, i / n); p.push([XH(h), yG(h, mu, sg)]); } return p; }
function tratteggio(ctx, x, y0, y1, col, al = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La curva a campana', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · la macchina di Galton (7.5–36.6)
function sceneGalton(ctx, t) {
  if (t < 7.5 || t > 36.7) return;
  const al = 1 - P(t, 36.0, 36.6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 110, 110, 1700, 690, P(t, 7.5, 8.2));
  const kb = P(t, 7.7, 8.4);
  ctx.save(); ctx.globalAlpha *= kb;
  // l'imbuto, i chiodi, le caselle
  ctx.strokeStyle = css(C.ink, .45); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(GX - 60, 128); ctx.lineTo(GX - 14, 160); ctx.moveTo(GX + 60, 128); ctx.lineTo(GX + 14, 160); ctx.stroke();
  ctx.fillStyle = css(C.dim);
  for (let r = 0; r < NR; r++) for (let j = 0; j <= r; j++) { ctx.beginPath(); ctx.arc(GX + (j - r / 2) * S, PY0 + r * RS, 5, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = css(C.ink, .35); ctx.lineWidth = 2;
  for (let k = 0; k <= NR + 1; k++) { const x = GX + (k - 6.5) * S; ctx.beginPath(); ctx.moveTo(x, BY0); ctx.lineTo(x, FY); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(GX - 6.5 * S, FY); ctx.lineTo(GX + 6.5 * S, FY); ctx.stroke();
  ctx.restore();
  // il percorso della prima pallina
  const kt = life(t, 8.4, 17.2, .2, .5);
  if (kt > 0) {
    const pts = [], b = PALLE[0];
    for (let u = b.t0; u <= Math.min(t, fine0); u += .02) pts.push(posizione(b, u));
    ctx.save(); ctx.globalAlpha *= kt; ctx.strokeStyle = css(C.y, .55); ctx.lineWidth = 3; ctx.setLineDash([6, 8]);
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  }
  // le palline
  ctx.save();
  for (let i = NB - 1; i >= 0; i--) {
    const b = PALLE[i], p = posizione(b, t); if (!p) continue;
    ctx.fillStyle = css(i ? C.x : C.y);
    ctx.beginPath(); ctx.arc(p[0], p[1], i ? 4.6 : 8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  // le caselle ai lati: ci si arriva solo con urti tutti dalla stessa parte
  const kl = life(t, 26.0, 30.8, .4, .4);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = css(C.r); ctx.lineWidth = 4;
    for (const k of [0, NR]) { ctx.beginPath(); ctx.roundRect(GX + (k - 6.5) * S + 3, BY0 - 4, S - 6, FY - BY0 + 8, 10); ctx.stroke(); }
    drawRich(ctx, '{r:tutti a sinistra}', GX - 6 * S - 40, 470, { size: 32, align: 'right' });
    drawRich(ctx, '{r:tutti a destra}', GX + 6 * S + 40, 470, { size: 32, align: 'left' });
    ctx.restore();
  }
  // il profilo: una campana
  const kc = P(t, 31.2, 32.6);
  if (kc > 0) {
    const pts = [];
    for (let i = 0; i <= 160; i++) { const k = lerp(-.6, 12.6, i / 160); pts.push([GX + (k - 6) * S, FY - 2 - NB * Math.exp(-((k - 6) ** 2) / 6) / Math.sqrt(6 * Math.PI) / 5 * DS]); }
    glowStroke(ctx, pts, kc, C.v, 5);
  }
  ctx.restore();
}

// 2–3 · la campana delle altezze (36.6–FINE)
function sceneNormale(ctx, t) {
  if (t < 36.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2), ka = P(t, 36.6, 37.2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 110, 110, 1700, 690, ka);
  ctx.save(); ctx.globalAlpha *= ka;
  drawRich(ctx, '{dim:altezze di tante persone, in cm}', 160, 165, { size: 32, align: 'left' });
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(XH(121), AXY); ctx.lineTo(XH(219), AXY); ctx.stroke();
  arrowHead(ctx, [XH(219) + 6, AXY], 0, C.ink);
  ctx.restore();
  const mu = muAt(t), sg = sgAt(t), pk = AREA / sg;
  // il 68%: l'area fra μ − σ e μ + σ
  const k68 = life(t, 69.0, FINE + .2, .8, .1);
  if (k68 > 0) {
    ctx.save(); ctx.globalAlpha *= k68; ctx.fillStyle = css(C.g, .16);
    ctx.beginPath(); ctx.moveTo(XH(mu - sg), AXY);
    for (const p of curva(mu, sg, mu - sg, mu + sg, 80)) ctx.lineTo(p[0], p[1]);
    ctx.lineTo(XH(mu + sg), AXY); ctx.closePath(); ctx.fill(); ctx.restore();
    tratteggio(ctx, XH(mu - sg), AXY - 4, yG(mu - sg, mu, sg), C.g, k68);
    tratteggio(ctx, XH(mu + sg), AXY - 4, yG(mu + sg, mu, sg), C.g, k68);
    drawRich(ctx, 'circa', XH(mu), AXY - 162, { size: 34, alpha: k68 });
    drawRich(ctx, '{g:68%}', XH(mu), AXY - 106, { size: 60, weight: 600, alpha: k68 });
  }
  // μ: il centro
  const km = life(t, 45.6, 69.2, .4, .5);
  tratteggio(ctx, XH(mu), AXY - 4, AXY - pk + 4, C.v, km);
  // σ: dal centro al punto dove la curva cambia piega
  const ks = life(t, 56.8, 73.8, .4, .5);
  if (ks > 0) {
    const yI = AXY - pk * Math.exp(-.5);
    ctx.save(); ctx.globalAlpha *= ks;
    ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(XH(mu), yI); ctx.lineTo(XH(mu + sg) - 8, yI); ctx.stroke();
    arrowHead(ctx, [XH(mu + sg), yI], 0, C.v, .9);
    drawRich(ctx, '{mv:σ}', XH(mu + sg / 2), yI - 28, { size: 40 });
    ctx.restore();
  }
  // la curva, sopra le aree
  glowStroke(ctx, curva(mu, sg), P(t, 37.2, 38.8), C.y, 5);
  // i numeri dell'asse, pieni su un fondino
  ctx.save(); ctx.globalAlpha *= ka * P(t, 37.0, 37.5); ctx.fillStyle = C.paper;
  for (let h = 130; h <= 210; h += 10) {
    ctx.fillRect(XH(h) - 32, AXY + 20, 64, 34); txt(ctx, String(h), XH(h), AXY + 37, { size: 30, color: C.dim });
    ctx.strokeStyle = css(C.ink, .6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XH(h), AXY); ctx.lineTo(XH(h), AXY + 10); ctx.stroke();
  }
  ctx.restore();
  // sotto l'asse: μ, poi μ − σ e μ + σ, che diventano 162 e 178
  drawRich(ctx, '{mv:μ}', XH(mu), AXY + 78, { size: 42, alpha: life(t, 45.6, FINE + .2, .4, .1) });
  const kd = life(t, 69.2, 74.3, .4, .3), kn = life(t, 74.3, FINE + .2, .3, .1);
  drawRich(ctx, '{mink:μ − σ}', XH(mu - sg), AXY + 78, { size: 40, alpha: kd });
  drawRich(ctx, '{mink:μ + σ}', XH(mu + sg), AXY + 78, { size: 40, alpha: kd });
  // 162 e 178 sopra l'asse, dentro l'area verde: non in colonna con 160 e 180
  drawRich(ctx, '{g:162}', XH(162) + 12, AXY - 28, { size: 44, weight: 600, align: 'left', alpha: kn });
  drawRich(ctx, '{g:178}', XH(178) - 12, AXY - 28, { size: 44, weight: 600, align: 'right', alpha: kn });
  // il riquadro dei due numeri
  const kp = life(t, 45.6, FINE + .2, .5, .1);
  if (kp > 0) {
    card(ctx, 1440, 140, 340, 170, kp);
    ctx.save(); ctx.globalAlpha *= kp;
    drawRich(ctx, `{mink:μ = }{mv:${Math.round(mu)}}{ink: cm}`, 1490, 196, { size: 44, align: 'left' });
    drawRich(ctx, `{mink:σ = }{mv:${Math.round(sg)}}{ink: cm}`, 1490, 262, { size: 44, align: 'left', alpha: P(t, 57.0, 57.4) });
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
    drawRich(ctx, 'Centro {mink:μ}, larghezza {mink:σ}: circa il {g:68%}\ndei dati sta fra {mink:μ − σ} e {mink:μ + σ}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{dim:il centro}'], [960, '{dim:la larghezza}'], [1490, '{dim:quanti dati}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 240, 445, 480, 200);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) { drawRich(ctx, '{mink:μ}', x, 545, { size: 48 }); drawRich(ctx, 'la media', x, 605, { size: 34 }); }
    if (i === 1) { drawRich(ctx, '{mink:σ}', x, 545, { size: 48 }); drawRich(ctx, 'la deviazione standard', x, 605, { size: 34 }); }
    if (i === 2) { drawRich(ctx, 'fra {mink:μ − σ} e {mink:μ + σ}', x, 545, { size: 42 }); drawRich(ctx, '{g:circa il 68%}', x, 605, { size: 38 }); }
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La curva a campana', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 36.6, 'la macchina di Galton'], [36.6, 68.8, 'la normale: centro e larghezza'], [68.8, FINE, 'il 68%']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGalton(ctx, t); sceneNormale(ctx, t); sceneFine(ctx, t); },
  };
});
