'use strict';
/* La forchetta del sondaggio — 400 intervistati, 208 sì: p̂ = 0,52; errore standard √(0,52 · 0,48/400) ≈ 0,025,
   margine al 95% 1,96 · 0,025 ≈ 0,049: la forchetta è 52% ± 4,9%, da 47,1% a 56,9%. Poi, fingendo di sapere che
   p = 0,5, venti sondaggi danno venti forchette: una sola manca il valore vero (seme fisso 314187). Al 95% vuol
   dire che il metodo prende il valore vero circa 95 volte su 100: il valore vero è fermo, la forchetta cambia.
   Argomento: statistica-inferenziale. */
CVIDEO.registra('statistica-inferenziale/intervallo', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, card, arrowHead, glowStroke } = M;

// ---- due orologi: le scene sono scritte su un orologio «vecchio» (VEC); il video segue quello nuovo, con i fumetti
// accorciati fin dove la voce lo permette e, a 42,2–53,8 s, il fumetto del perché di 1,96 (lì il vecchio sta fermo).
// NODI: [nuovo, vecchio]; fra un nodo e l'altro il tempo scorre in linea retta
const NODI = [[0, 0], [8, 8], [14.4, 13.6], [14.5, 13.8], [20.3, 19.8], [20.4, 20], [24.4, 24.2], [24.5, 24.4], [29.5, 29.6],
  [29.6, 29.8], [36.5, 36.8], [36.6, 37], [42.1, 44], [53.8, 44], [53.9, 44.2], [60, 50.4], [60.1, 50.6], [65, 55.6],
  [65.1, 55.8], [70, 61], [70.1, 61.2], [73.3, 64.8], [73.4, 65], [78.1, 70], [78.2, 70.2], [82.3, 74.8], [82.4, 75],
  [87.7, 80.6], [87.8, 80.8], [95.1, 88.2], [95.2, 88.4], [99.2, 92.8], [99.6, 93.2], [100.4, 94], [107.2, 102.2], [110.0, 105.2]];
function orologio(x, da, a) {
  if (x <= NODI[0][da]) return x;
  for (let i = 1; i < NODI.length; i++) {
    const p = NODI[i - 1], q = NODI[i];
    if (x <= q[da]) return q[da] === p[da] ? q[a] : lerp(p[a], q[a], (x - p[da]) / (q[da] - p[da]));
  }
  return NODI[NODI.length - 1][a] + x - NODI[NODI.length - 1][da];
}
const VEC = t => orologio(t, 0, 1), NUO = t => orologio(t, 1, 0);
const FINE = 93.2, DUR = 105.2;   // sull'orologio vecchio: nel video 99,6 e 110
const fine = NUO(FINE);
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [fine, 190], [fine + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [fine, 1050], [fine + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [fine, 2.2], [fine + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [fine, 2], [fine + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [fine, -1.5], [fine + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [14.0, 'felice'],
  [16.2, 'neutro'], [20.0, 'pensa'], [24.4, 'neutro'], [33.8, 'felice'], [36.0, 'neutro'], [44.4, 'felice'],
  [46.6, 'neutro'], [50.8, 'felice'], [53.0, 'neutro'], [61.2, 'pensa'], [65.0, 'neutro'], [75.2, 'sorpreso'],
  [77.6, 'neutro'], [85.2, 'felice'], [87.4, 'neutro'],
  [FINE + 1.0, 'felice'], [99.6, 'occhiolino'],
].map(([t, f]) => [t <= 8 ? t : +NUO(t).toFixed(2), f]).concat([[42.4, 'pensa']]).sort((a, b) => a[0] - b[0]);
// una frase per ogni cosa che succede, e solo mentre succede (tempi del video)
const FUMETTI = [
  [2.2, 6.4, 'Un sondaggio dà il 52%:\nci si può fidare?'],
  // 1 · il sondaggio
  [8.0, 14.4, 'Intervisto 400 persone a caso, {mink:n = 400}:\n208 dicono {g:sì}.'],
  [14.5, 20.3, 'Nel campione la proporzione di sì\nè {mink:p̂ = 0,52}.'],
  [20.4, 24.4, 'Ma il valore vero {mink:p}, fra tutti,\nnon lo conosciamo.'],
  // 2 · la forchetta
  [24.5, 29.5, 'Un altro campione darebbe un altro {mink:p̂}.\nDi quanto può sbagliare?'],
  [29.6, 36.5, 'Lo misura l’{v:errore standard}, fatto\ncon {mink:p̂} e {mink:n}: qui circa {g:0,025}.'],
  [36.6, 42.1, 'Il {v:margine} al {g:95%} è 1,96\nerrori standard.'],
  [42.2, 53.8, 'Nella campana il {g:95%} sta entro 1,96 {mink:σ}:\nquasi i 2{mink:σ} della regola 68 - 95 - 99,7.'],
  [53.9, 60.0, 'Il margine è circa {g:0,049},\ncioè 4,9%.'],
  [60.1, 65.0, 'La {v:forchetta} è {g:52% ± 4,9%}…'],
  [65.1, 70.0, '…dal {g:47,1%} al {g:56,9%}.'],
  // 3 · che cosa vuol dire «al 95%»
  [70.1, 73.3, 'Che cosa vuol dire «al {g:95%}»?'],
  [73.4, 78.1, 'Fingo di conoscere il valore vero:\n{mink:p = 0,5}.'],
  [78.2, 82.3, 'Rifaccio il sondaggio venti volte:\nventi forchette diverse.'],
  [82.4, 87.7, 'Quasi tutte prendono il valore vero;\nuna sola lo {r:manca}: circa una su venti.'],
  [87.8, 95.1, 'Al {g:95%} vuol dire: il {v:metodo} prende\nil valore vero circa 95 volte su 100.'],
  [95.2, 99.2, 'Il valore vero sta {v:fermo}:\nè la forchetta che cambia.'],
  // chiusura
  [100.4, 107.2, 'Una forchetta al 95% viene da un metodo\nche sbaglia circa una volta su venti.'],
];

// ---- i sondaggi: generatore con seme fisso ----
function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const N = 400, Z = 1.96;
// il primo sondaggio è il nostro (208 sì); gli altri 19 vengono da p = 0,5
const FORCHETTE = (() => {
  const r = rng(314187), ks = [208];
  for (let i = 0; i < 19; i++) { let k = 0; for (let j = 0; j < N; j++) if (r() < .5) k++; ks.push(k); }
  return ks.map(k => { const p = k / N, m = Z * Math.sqrt(p * (1 - p) / N); return { p, a: p - m, b: p + m, ok: p - m <= .5 && p + m >= .5 }; });
})();
// le 400 persone: 208 sì, al loro posto per sempre
const SI = (() => {
  const r = rng(2026), a = []; for (let i = 0; i < N; i++) a.push(i < 208);
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
  return a;
})();

// ---- la tela ----
const CARD = [110, 110, 1060, 690], PAN = [1200, 110, 610, 690];
const XS = p => 175 + (p - .37) / .24 * 930, AY = 680, YF = 470, RY = i => 630 - i * 24;
const pc = v => (Math.round(v * 1000) / 10).toFixed(1).replace('.', ',').replace(',0', '') + '%';
// σ e errore standard: la radice disegnata qui, sopra una frazione, con un pezzo prima e uno dopo
function radice(ctx, pre, num, den, post, cx, cy, s, al) {
  if (al <= 0) return;
  const wp = pre ? richW(ctx, pre, s) : 0, wq = post ? richW(ctx, post, s) : 0, g = s * .18;
  const wf = Math.max(richW(ctx, num, s), richW(ctx, den, s)) + s * .3, rw = s * .62;
  const x0 = cx - (wp + (pre ? g : 0) + rw + wf + (post ? g : 0) + wq) / 2, xr = x0 + wp + (pre ? g : 0);
  const top = cy - s * 1.56, bot = cy + s * 1.2;
  ctx.save(); ctx.globalAlpha *= al;
  if (pre) drawRich(ctx, pre, x0, cy, { size: s, align: 'left' });
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2.5, s * .06); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xr, cy + s * .3); ctx.lineTo(xr + rw * .22, cy + s * .14); ctx.lineTo(xr + rw * .55, bot);
  ctx.lineTo(xr + rw, top); ctx.lineTo(xr + rw + wf, top); ctx.stroke();
  const xm = xr + rw + wf / 2;
  drawRich(ctx, num, xm, cy - s * .6, { size: s }); drawRich(ctx, den, xm, cy + s * .66, { size: s });
  ctx.beginPath(); ctx.moveTo(xr + rw + s * .1, cy + s * .04); ctx.lineTo(xr + rw + wf - s * .1, cy + s * .04); ctx.stroke();
  ctx.restore();
  return xr + rw + wf + g;   // dove comincia il pezzo dopo
}
function radiceDopo(ctx, pre, num, den, post, cx, cy, s, al, alPost) {
  const x = radice(ctx, pre, num, den, post, cx, cy, s, al);
  if (x && post) drawRich(ctx, post, x, cy, { size: s, align: 'left', alpha: alPost });
}
const ES = ['', '{mink:p̂(1 − p̂)}', '{mink:n}'];
// una forchetta: la sbarra da a a b, coi due trattini, e il pallino in p̂
function sbarra(ctx, f, y, col, k, w, al) {
  if (al <= 0 || k <= 0) return;
  const xa = lerp(XS(f.p), XS(f.a), k), xb = lerp(XS(f.p), XS(f.b), k), h = w * 2.2;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xb, y); ctx.moveTo(xa, y - h); ctx.lineTo(xa, y + h); ctx.moveTo(xb, y - h); ctx.lineTo(xb, y + h); ctx.stroke();
  ctx.restore();
}
function pallino(ctx, x, y, r, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La forchetta del sondaggio', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · le persone, la forchetta, le venti forchette (7.5–FINE)
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // le 400 persone intervistate
  const kp = 1 - P(t, 24.4, 25.0);
  if (kp > 0) {
    for (let i = 0; i < N; i++) {
      const k = P(t, 8.2 + i * .004, 8.5 + i * .004); if (k <= 0) continue;
      pallino(ctx, 431 + (i % 20) * 22, 160 + Math.floor(i / 20) * 22, 8, SI[i] ? C.g : C.dim, kp * k * (SI[i] ? 1 : .5));
    }
    drawRich(ctx, '{g:208 sì}', 560, 640, { size: 36, alpha: kp * P(t, 8.4, 8.8) });
    drawRich(ctx, '{dim:192 no}', 720, 640, { size: 36, alpha: kp * P(t, 8.4, 8.8) });
  }
  // l'asse delle percentuali
  const ka = P(t, 24.8, 25.4);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(XS(.37), AY); ctx.lineTo(XS(.612), AY); ctx.stroke();
    arrowHead(ctx, [XS(.612) + 6, AY], 0, C.ink);
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      const p = .4 + i * .05, x = XS(p);
      ctx.beginPath(); ctx.moveTo(x, AY); ctx.lineTo(x, AY + 10); ctx.stroke();
      drawRich(ctx, `{mink:${Math.round(p * 100)}}{ink:%}`, x, AY + 40, { size: 32 });
    }
    ctx.restore();
  }
  const f0 = FORCHETTE[0];
  // 2 · la nostra forchetta, grande; poi scende in fondo alla pila
  const giu = P(t, 61.4, 62.4), y0 = lerp(YF, RY(0), giu), w0 = lerp(8, 5, giu);
  // altri campioni possibili, chiari
  const ka2 = life(t, 25.4, 29.8, .3, .4);
  if (ka2 > 0) [.495, .535, .505, .55, .485].forEach((p, i) => pallino(ctx, XS(p), YF, 9, C.x, .4 * ka2 * P(t, 25.6 + i * .3, 25.9 + i * .3)));
  // il margine: due frecce di 4,9%
  const km = life(t, 45.6, 61.4, .4, .3);
  if (km > 0) {
    ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3;
    [[f0.a, -1], [f0.b, 1]].forEach(([q, s]) => {
      const x0 = XS(f0.p) + s * 14, x1 = XS(q);
      ctx.beginPath(); ctx.moveTo(x0, YF + 34); ctx.lineTo(x1 - s * 8, YF + 34); ctx.stroke();
      arrowHead(ctx, [x1, YF + 34], s > 0 ? 0 : Math.PI, C.v, .7);
      drawRich(ctx, '{v:4,9%}', (x0 + x1) / 2, YF + 72, { size: 34 });
    });
    ctx.restore();
  }
  const kb = P(t, 50.8, 51.6);
  sbarra(ctx, f0, y0, C.g, kb, w0, 1);
  pallino(ctx, XS(f0.p), y0, lerp(11, 8, giu), C.x, P(t, 24.8, 25.3, E.back));
  drawRich(ctx, '{x:52%}', XS(f0.p), YF - 46, { size: 44, alpha: life(t, 25.0, 61.4, .4, .3) });
  const ke = life(t, 56.0, 61.4, .4, .3);
  drawRich(ctx, '{g:47,1%}', XS(f0.a) - 20, YF, { size: 44, align: 'right', alpha: ke });
  drawRich(ctx, '{g:56,9%}', XS(f0.b) + 20, YF, { size: 44, align: 'left', alpha: ke });
  // 3 · il valore vero e le altre diciannove forchette
  const kv = P(t, 65.2, 65.7);
  if (kv > 0) {
    const fermo = life(t, 88.6, FINE, .4, .3);
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4 + 4 * fermo;
    if (fermo > 0) { ctx.shadowColor = css(C.v, .6); ctx.shadowBlur = 18 * fermo; }
    ctx.beginPath(); ctx.moveTo(XS(.5), AY - 4); ctx.lineTo(XS(.5), 162); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{v:valore vero} {mink:p = 0,5}', XS(.5), 138, { size: 38, alpha: kv });
  }
  const kc = P(t, 75.2, 75.8);
  FORCHETTE.forEach((f, i) => {
    if (!i) return;
    const a = 70.4 + (i - 1) * .2, k = P(t, a, a + .35, E.out);
    if (k <= 0) return;
    const col = f.ok ? C.g : C.r;
    sbarra(ctx, f, RY(i), C.x, k, 5, 1 - kc);
    if (kc > 0) sbarra(ctx, f, RY(i), col, 1, f.ok ? 5 : 7, kc);
    pallino(ctx, XS(f.p), RY(i), 8, C.x, k);
  });
  ctx.restore();
}

// il riquadro: il campione, poi l'errore standard e il margine, poi il conto delle forchette (8.2–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1250, RX = 1765;
function scenePannello(ctx, t) {
  const al = life(t, 8.2, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const riga = (nome, val, y, a) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    drawRich(ctx, nome, LX, y, { size: 44, align: 'left' });
    drawRich(ctx, val, RX, y, { size: 44, align: 'right' });
    ctx.restore();
  };
  const titolo = (s, y, t0) => conFont(TITOLI, () => drawRich(ctx, s, PX, y, { size: 38, weight: 600, local: t - t0 }));
  // A · il campione
  const kA = 1 - P(t, 29.6, 30.0);
  if (kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    titolo('campione', 168, 8.2);
    riga('{mink:n =}', '{x:400}', 240, P(t, 8.4, 8.8));
    riga('{dim:sì}', '{g:208}', 310, P(t, 8.4, 8.8));
    riga('{mink:p̂ =}', '{mink:208/400 = }{x:0,52}', 380, P(t, 16.4, 16.8));
    if (t > 20.2) titolo('valore vero', 480, 20.2);
    riga('{mink:p =}', '{v:?}', 550, P(t, 20.6, 21.0));
    ctx.restore();
  }
  // B · errore standard e margine
  const kB = P(t, 29.8, 30.2) * (1 - P(t, 70.0, 70.4));
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    titolo('errore standard', 168, 29.9);
    radice(ctx, ...ES, '', PX, 278, 44, P(t, 30.2, 30.7));
    radiceDopo(ctx, '{mink:=}', '{mink:0,52 · 0,48}', '{mink:400}', '{mink:≈ }{g:0,025}', PX, 440, 40, P(t, 32.4, 32.9), P(t, 34.4, 34.8));
    const kl = P(t, 37.2, 37.6);
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 530); ctx.lineTo(PAN[0] + PAN[2] - 40, 530); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{dim:margine al 95%}', PX, 572, { size: 32, alpha: kl });
    const s1 = '{mink:1,96 · 0,025}', s2 = '{mink: ≈ }{g:0,049}', w1 = richW(ctx, s1, 44), w2 = richW(ctx, s2, 44);
    drawRich(ctx, s1, PX - (w1 + w2) / 2, 630, { size: 44, align: 'left', alpha: P(t, 37.6, 38.0) });
    drawRich(ctx, s2, PX - (w1 + w2) / 2 + w1, 630, { size: 44, align: 'left', alpha: P(t, 45.6, 46.0) });
    drawRich(ctx, '{dim:forchetta:} {g:52% ± 4,9%}', PX, 720, { size: 44, alpha: P(t, 52.0, 52.4) });
    ctx.restore();
  }
  // C · le venti forchette
  const kC = P(t, 70.4, 70.8);
  if (kC > 0) {
    ctx.save(); ctx.globalAlpha *= kC;
    titolo('venti forchette', 168, 70.4);
    // mentre arrivano, le forchette si contano
    const nF = 1 + Math.max(0, Math.min(19, Math.floor((t - 70.4) / .2) + 1));
    riga('{dim:forchette}', `{x:${nF}}`, 250, 1 - P(t, 74.9, 75.2));
    riga('{g:19}', '{dim:prendono} {mink:p}', 250, P(t, 75.2, 75.6));
    riga('{r:1}', '{dim:la manca}', 320, P(t, 75.2, 75.6));
    const km = P(t, 81.0, 81.4);
    ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 390); ctx.lineTo(PAN[0] + PAN[2] - 40, 390); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{dim:il metodo al 95% prende}', PX, 440, { size: 32, alpha: km });
    drawRich(ctx, '{dim:il valore vero}', PX, 484, { size: 32, alpha: km });
    drawRich(ctx, '{g:circa 95 volte su 100}', PX, 550, { size: 44, alpha: P(t, 81.6, 82.0) });
    const kf = P(t, 88.6, 89.0);
    drawRich(ctx, '{mink:p}{ink: sta }{v:fermo}', PX, 650, { size: 40, alpha: kf });
    drawRich(ctx, 'la forchetta {g:cambia}', PX, 710, { size: 40, alpha: kf });
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
    drawRich(ctx, 'Al {g:95%}, il {v:metodo} della forchetta prende\nil valore vero circa 95 volte su 100.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[440, '{dim:errore standard}', 240], [960, '{dim:il sondaggio}', 230], [1480, '{dim:venti forchette}', 240]];
  pills.forEach(([x, testa, mw], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 552); ctx.scale(k, k); ctx.translate(-x, -552);
    card(ctx, x - mw, 445, 2 * mw, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) radice(ctx, ...ES, '', x, 580, 40, 1);
    if (i === 1) drawRich(ctx, '{g:52% ± 4,9%}', x, 572, { size: 48 });
    if (i === 2) drawRich(ctx, 'circa {r:una} sbaglia', x, 572, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

// il perché di 1,96 (orologio del video, 42,2–53,8): nella campana il 95% sta fra −1,96 σ e 1,96 σ, quasi ±2σ
const BX = 640, BY = 285, BS = 92, BH = 120;
const campanaPt = z => [BX + z * BS, BY - BH * Math.exp(-z * z / 2)];
function scenePerche(ctx, t) {
  const k = life(t, 42.4, 53.8, .5, .5);
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  // l'area del 95%
  const ka = P(t, 43.4, 44.2);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.fillStyle = css(C.g, .18); ctx.beginPath(); ctx.moveTo(BX - 1.96 * BS, BY);
    for (let i = 0; i <= 80; i++) { const p = campanaPt(-1.96 + 3.92 * i / 80); ctx.lineTo(p[0], p[1]); }
    ctx.lineTo(BX + 1.96 * BS, BY); ctx.closePath(); ctx.fill(); ctx.restore();
    [-1.96, 1.96].forEach(z => {
      ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.g, .9); ctx.lineWidth = 3; ctx.setLineDash([8, 8]);
      ctx.beginPath(); ctx.moveTo(BX + z * BS, BY); ctx.lineTo(BX + z * BS, campanaPt(z)[1]); ctx.stroke(); ctx.restore();
    });
    drawRich(ctx, '{g:95%}', BX, BY - 52, { size: 44, alpha: ka });
  }
  // la campana e la sua base
  ctx.strokeStyle = css(C.ink, .6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(BX - 3.3 * BS, BY); ctx.lineTo(BX + 3.3 * BS, BY); ctx.stroke();
  const pts = []; for (let i = 0; i <= 120; i++) pts.push(campanaPt(-3.2 + 6.4 * i / 120));
  glowStroke(ctx, pts, P(t, 42.6, 43.4), C.y, 4);
  // −1,96 σ e 1,96 σ sotto la base, fuori dalla campana
  const kz = P(t, 43.8, 44.3);
  drawRich(ctx, '{mink:−1,96 }{mv:σ}', BX - 1.96 * BS, BY + 30, { size: 34, alpha: kz });
  drawRich(ctx, '{mink:1,96 }{mv:σ}', BX + 1.96 * BS, BY + 30, { size: 34, alpha: kz });
  // che cosa è σ qui: la larghezza della campana dei p̂, cioè l'errore standard
  drawRich(ctx, '{dim:qui }{mv:σ}{dim: = errore standard ≈ }{g:0,025}', BX, BY + 66, { size: 30, alpha: kz });
  // la regola del sito, in alto
  drawRich(ctx, '{dim:regola 68 - 95 - 99,7: il 95% entro }{mink:2}{mv:σ}', BX, 138, { size: 30, alpha: P(t, 47.6, 48.1) });
  ctx.restore();
}

  // effetti scritti sull'orologio vecchio, poi portati su quello del video
  const SUONI_VEC = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['tono', 8.2, 10.0, [.1, .9]], ['pop', 8.4, .4],              // 400 persone, riga dopo riga
    ['pop', 8.8, .6], ['pop', 16.5, .55],                                         // 208 sì, p̂ = 0,52
    ['pop', 20.6, .8],                                                             // p = ?
    ['soffio', 24.4], ['traccia', 24.8, 25.4], ['pop', 25.0, .55],                 // l'asse e il 52%
    ['pop', 25.7, .45], ['pop', 26.0, .6], ['pop', 26.3, .5], ['pop', 26.6, .65], ['pop', 26.9, .4],   // altri campioni possibili
    ['soffio', 29.8], ['pop', 30.4, .5], ['pop', 32.6, .5], ['ding', 34.5],        // l'errore standard ≈ 0,025
    ['pop', 37.7, .5],                                                             // 1,96 · 0,025
    ['traccia', 45.6, 46.1], ['ding', 45.7],                                       // il margine ≈ 0,049
    ['traccia', 50.8, 51.6], ['ding', 51.0],                                       // la forchetta
    ['pop', 56.1, .4], ['pop', 56.3, .7],                                          // 47,1% e 56,9%
    ['tono', 61.4, 62.4, [.5, .1]],                                                // la forchetta scende in fondo
    ['traccia', 65.2, 65.7], ['pop', 65.4, .5],                                    // il valore vero
    ['tono', 70.4, 74.3, [.15, .3, .45, .6, .75, .9]],                             // diciannove forchette
    ['ding', 75.3], ['pop', 75.4, .2],                                             // verdi, e una rossa
    ['pop', 81.1, .5], ['ding', 81.7],                                             // circa 95 su 100
    ['soffio', 88.6],                                                              // il valore vero sta fermo
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  const r2 = v => +NUO(v).toFixed(2);
  const SUONI = SUONI_VEC.map(s => s[0] === 'tono' || s[0] === 'traccia' ? [s[0], r2(s[1]), r2(s[2])].concat(s.slice(3)) : [s[0], r2(s[1])].concat(s.slice(2)))
    .concat([['traccia', 42.6, 43.4], ['tono', 42.6, 43.4, [.05, .3, .95, .3, .05]],   // la campana del perché
      ['pop', 43.6, .6], ['pop', 47.7, .4]])                                          // il 95%, la regola
    .sort((a, b) => a[1] - b[1]);
  return {
    titolo: 'La forchetta del sondaggio', durata: r2(DUR), copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 24.4, 'il sondaggio'], [24.4, 61.2, 'la forchetta'], [61.2, FINE, 'che cosa vuol dire «al 95%»']].map(([a, b, s]) => [r2(a), r2(b), s]),
    scena(ctx, t) { const u = VEC(t); sceneIntro(ctx, u); sceneGrafico(ctx, u); scenePannello(ctx, u); sceneFine(ctx, u); scenePerche(ctx, t); },
  };
});

