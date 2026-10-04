'use strict';
/* Dalla circonferenza alla sinusoide — il punto che gira sulla circonferenza goniometrica: l'arco percorso
   (l'angolo in radianti) si srotola sull'asse x, l'altezza (il seno) va sull'asse y; dopo un giro, 2π,
   il grafico ricomincia uguale: periodo 2π. Argomento: funzioni-goniometriche. */
CVIDEO.registra('funzioni-goniometriche/sinusoide', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, fixedNum, fmtN, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 94.0;
const PI = Math.PI;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [29.8, 'felice'], [32.0, 'neutro'],
  [42.4, 'felice'], [44.6, 'neutro'], [61.3, 'felice'], [65.0, 'festa'], [67.4, 'neutro'],
  [73.2, 'pensa'], [76.9, 'neutro'], [85.8, 'felice'], [88.0, 'neutro'], [90.0, 'felice'],
  [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; il punto gira nei fumetti 7, 8, 17 e fra un valore notevole e l'altro
const FUMETTI = [
  [2.0, 6.3, 'Che forma ha il grafico di {my:y = sin x},\nil seno di {mx:x}?'],
  // 1 · il punto e la sua altezza
  [7.9, 11.7, 'La circonferenza goniometrica,\nraggio 1, con un punto {mink:P}.'],
  [11.9, 15.9, 'L’altezza di {mink:P}, la sua ordinata,\nè il {y:seno} dell’angolo.'],
  [16.1, 20.6, 'A destra, un grafico: sull’asse {mx:x}\nva l’angolo, in radianti.'],
  [20.8, 25.4, 'Con raggio 1, la misura in radianti\nè la lunghezza dell’arco {x:blu}.'],
  [25.6, 29.6, 'Lo srotolo sull’asse {mx:x}: ecco\nil valore dell’angolo.'],
  [29.8, 33.8, 'Sull’asse {my:y} metto il seno:\nl’altezza di {mink:P}.'],
  [34.0, 38.0, 'Ora riparto da {mx:x}{mink: = 0},\nil punto più a destra.'],
  // 2 · un giro
  [38.2, 42.2, 'Faccio girare {mink:P}: l’arco percorso\nsi srotola sull’asse {mx:x}…'],
  [42.4, 46.9, 'Dopo un quarto di giro, {mx:x}{mink: = π/2}:\nil seno vale {g:1}, il massimo.'],
  [49.1, 52.6, 'A mezzo giro, {mx:x}{mink: = π}:\nil seno torna {g:0}.'],
  [54.8, 59.1, 'A tre quarti, {mx:x}{mink: = 3π/2}:\nil seno vale {g:−1}, il minimo.'],
  [61.3, 64.8, 'Giro completo, {mx:x}{mink: = 2π}:\nil seno torna {g:0}.'],
  [65.0, 68.8, 'Questa onda è la {y:sinusoide},\nil grafico di {my:y = sin x}.'],
  [69.0, 73.0, 'Un giro intero è lungo {mink:2π}:\ncirca 6,28 sull’asse {mx:x}.'],
  // 3 · periodo 2π
  [73.2, 76.7, 'E se il punto continua a girare?'],
  [76.9, 80.9, 'Stringo l’asse {mx:x} per fare posto\nal secondo giro…'],
  [81.1, 85.6, 'Il punto ripassa dagli stessi posti:\nla curva si ripete uguale.'],
  [85.8, 89.8, 'Ogni {mink:2π} tutto si ripete: il seno\nha {g:periodo} {mink:2π}.'],
  [90.0, 93.6, 'In formula: {my:sin(}{mx:x}{my: + 2π)}{mink: = }{my:sin }{mx:x}.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Arco srotolato in {mx:x}, altezza in {my:y}:\nla sinusoide, periodo {mink:2π}.'],
];

// a sinistra la circonferenza goniometrica (raggio R pixel), a destra il grafico: sull'asse y la stessa unità R,
// sull'asse x prima la stessa unità (l'arco srotolato è lungo davvero quanto l'angolo), poi metà per il secondo giro
const OC = [330, 455], R = 170, G = [600, 455];
const CARD = [110, 110, 1730, 690];
const ZOOM = [77.2, 78.6];
const ux = t => kf(t, [[ZOOM[0], R], [ZOOM[1], R / 2]]);
const SC = (x, y) => [OC[0] + x * R, OC[1] - y * R];
const SG = (t, x, y) => [G[0] + x * ux(t), G[1] - y * R];
// l'angolo x: fermo in 0,9 per presentare, torna a 0, poi gira fermandosi sui valori notevoli
const XK = [[34.3, .9], [35.6, 0], [38.6, 0], [41.8, PI / 2], [47.0, PI / 2], [49.0, PI], [52.7, PI], [54.7, 3 * PI / 2],
  [59.2, 3 * PI / 2], [61.2, 2 * PI], [81.3, 2 * PI], [85.4, 4 * PI]];
const X = t => kf(t, XK);
const SROTOLA = [25.9, 27.3];   // l'arco blu si stende sull'asse x
// le tacche dell'asse x, ognuna col suo valore: durante lo zoom π e 2π scivolano con l'asse che si stringe;
// π/2 e 3π/2 escono prima, 3π e 4π entrano dopo. [nome, valore, quando si vede, sopra (−1) o sotto (1) l'asse]
const TACCHE = [
  ['{mink:π/2}', PI / 2, 'a', 1], ['{mink:π}', PI, 'ab', 1], ['{mink:3π/2}', 3 * PI / 2, 'a', -1],
  ['{mink:2π}', 2 * PI, 'ab', 1], ['{mink:3π}', 3 * PI, 'b', 1], ['{mink:4π}', 4 * PI, 'b', 1],
];
const vedi = (t, q) => (q === 'ab' ? 1 : q === 'a' ? 1 - P(t, ZOOM[0] - .3, ZOOM[0]) : P(t, ZOOM[1], ZOOM[1] + .4));
function numero(ctx, s, p, al, size = 40) {
  if (al <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const w = s.replace(/\{m?[a-z]+:|\}/g, '').length * size * .55 + 18;
  ctx.beginPath(); ctx.roundRect(p[0] - w / 2, p[1] - 23, w, 46, 9); ctx.fill();
  drawRich(ctx, s, p[0], p[1], { size });
  ctx.restore();
}
// un numero sbiadisce quando la linea tratteggiata orizzontale (all'altezza yd) gli passerebbe sotto
const libero = (p, yd, xd) => (xd < p[0] - 40 ? 1 : clamp((Math.abs(yd - p[1]) - 26) / 14));
function arcoCerchio(ctx, a0, a1, col, w, al = 1) {
  if (al <= 0 || a1 - a0 < .005) return;
  const pts = [], n = Math.max(8, Math.ceil((a1 - a0) * 40));
  for (let i = 0; i <= n; i++) { const a = lerp(a0, a1, i / n); pts.push(SC(Math.cos(a), Math.sin(a))); }
  ctx.save(); ctx.globalAlpha *= al; glowStroke(ctx, pts, 1, col, w); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Dalla circonferenza\nalla sinusoide', W / 2, 215, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const x = X(t), s = Math.sin(x), u = ux(t);
  const Pc = SC(Math.cos(x), s), Pg = SG(t, x, s);

  // la circonferenza con i suoi assi
  const kc = P(t, 7.7, 8.6, E.lin);
  ctx.save(); ctx.globalAlpha *= P(t, 7.7, 8.3); ctx.strokeStyle = css(C.dim, .6); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(...SC(-1.25, 0)); ctx.lineTo(...SC(1.25, 0)); ctx.moveTo(...SC(0, -1.25)); ctx.lineTo(...SC(0, 1.25)); ctx.stroke(); ctx.restore();
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(OC[0], OC[1], R, 0, -2 * PI * kc, true); ctx.stroke(); ctx.restore();
  }
  // il grafico: assi, tacche, numeri
  const kg = P(t, 16.3, 17.3);
  if (kg > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(G[0] - 20, G[1]); ctx.lineTo(lerp(G[0], 1780, kg), G[1]); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(G[0], G[1] + 1.3 * R * kg); ctx.lineTo(G[0], G[1] - 1.32 * R * kg); ctx.stroke();
    arrowHead(ctx, [lerp(G[0], 1780, kg) + 6, G[1]], 0, C.ink);
    arrowHead(ctx, [G[0], G[1] - 1.32 * R * kg - 6], -PI / 2, C.ink);
    ctx.globalAlpha *= P(kg, .6, 1);
    drawRich(ctx, '{mx:x}', 1814, G[1], { size: 44 });
    drawRich(ctx, '{my:y}', G[0] + 32, G[1] - 1.32 * R - 2, { size: 44 });
    for (const yy of [1, -1]) { ctx.beginPath(); ctx.moveTo(G[0] - 9, G[1] - yy * R); ctx.lineTo(G[0] + 9, G[1] - yy * R); ctx.stroke(); }
    TACCHE.forEach(([, v, q]) => {
      const al = vedi(t, q); if (al <= 0) return;
      const px = G[0] + v * u; ctx.save(); ctx.globalAlpha *= al;
      ctx.beginPath(); ctx.moveTo(px, G[1] - 9); ctx.lineTo(px, G[1] + 9); ctx.stroke(); ctx.restore();
    });
    ctx.restore();
  }
  // il tratteggio da P al punto del grafico, all'altezza del seno
  const kd = P(t, 30.0, 30.6);
  if (kd > 0) dashed(ctx, Pc, [Pg[0], Pc[1]], C.dim, kd, .9);
  const xd = kd > 0 ? lerp(Pc[0], Pg[0], kd) : -1e9;

  // l'arco blu sulla circonferenza (l'angolo) e il suo srotolamento sull'asse x
  const kb = P(t, 21.0, 21.6);
  if (kb > 0) {
    const giro = x > 2 * PI + 1e-6 ? x - 2 * PI : x;
    if (x > 2 * PI + 1e-6) arcoCerchio(ctx, 0, 2 * PI, C.x, 4, .35 * kb);
    arcoCerchio(ctx, 0, giro, C.x, 7, kb);
  }
  const ks = P(t, SROTOLA[0], SROTOLA[1]);
  if (ks > 0 && x > .005) {
    const pts = [];
    for (let i = 0; i <= 60; i++) {
      const a = x * i / 60, c = SC(Math.cos(a), Math.sin(a)), g = SG(t, a, 0);
      pts.push(ks >= 1 ? g : [lerp(c[0], g[0], ks), lerp(c[1], g[1], ks)]);
    }
    glowStroke(ctx, pts, 1, C.x, 7);
  }
  // la sinusoide, tracciata dal punto che gira (da 38,2 in poi)
  if (t > 38.2 && x > .005) {
    const pts = [], n = Math.ceil(x * 30);
    for (let i = 0; i <= n; i++) { const a = x * i / n; pts.push(SG(t, a, Math.sin(a))); }
    glowStroke(ctx, pts, 1, C.y, 5);
  }
  // le altezze: sulla circonferenza e sul grafico
  const kh = P(t, 12.1, 12.6);
  if (kh > 0 && Math.abs(s) > .005) glowStroke(ctx, [SC(Math.cos(x), 0), SC(Math.cos(x), s * kh)], 1, C.y, 7);
  const kv = P(t, 30.8, 31.3);
  if (kv > 0 && Math.abs(s) > .005) glowStroke(ctx, [SG(t, x, 0), SG(t, x, s * kv)], 1, C.y, 7);
  // i numeri degli assi, centrati sulle tacche e pieni sul loro fondino (sopra la curva);
  // sbiadiscono solo quando il segmento arancio o il tratteggio, che si muovono, passerebbero sotto
  if (kg > 0) {
    const kn = P(t, 17.0, 17.5) * (1 - P(t, FINE - .6, FINE));
    const yTop = Math.min(G[1], Pg[1]), yBot = Math.max(G[1], Pg[1]);
    const segLibero = (pp, hw) => (kv > 0 && yBot > pp[1] - 31 && yTop < pp[1] + 31 ? clamp((Math.abs(Pg[0] - pp[0]) - hw - 6) / 14) : 1);
    TACCHE.forEach(([nome, v, q, lato]) => {
      const pp = [G[0] + v * u, G[1] + lato * 50], hw = (nome.replace(/\{m?[a-z]+:|\}/g, '').length * 40 * .55 + 18) / 2;
      numero(ctx, nome, pp, kn * vedi(t, q) * libero(pp, Pc[1], xd) * segLibero(pp, hw));
    });
    // ±1 sopra e sotto la loro tacca: il tratteggio sta sempre fra le due tacche e non ci passa mai
    numero(ctx, '{ink:1}', [G[0] - 26, G[1] - R - 34], kn, 34);
    numero(ctx, '{ink:−1}', [G[0] - 32, G[1] + R + 34], kn, 34);
  }
  // il raggio, il punto P e il punto del grafico
  const kp = P(t, 8.4, 8.8);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(...OC); ctx.lineTo(...Pc); ctx.stroke(); ctx.restore();
  }
  dot(ctx, OC, C.ink, P(t, 8.0, 8.3, E.back), 7);
  dot(ctx, Pc, C.v, P(t, 8.6, 9.0, E.back), 12);
  dot(ctx, Pg, C.y, P(t, 30.8, 31.2, E.back), 11);
  // P, solo finché il punto sta fermo in 0,9 (poi il tratteggio gli passerebbe sopra)
  drawRich(ctx, '{mink:P}', ...SC(1.22 * Math.cos(1.15), 1.22 * Math.sin(1.15)), { size: 44, alpha: P(t, 8.8, 9.2) * (1 - P(t, 34.0, 34.3)) });
  // il nome della curva
  drawRich(ctx, '{my:y = sin x}', 1725, 340, { size: 44, local: t - 65.2, alpha: P(t, 65.2, 65.5) * (1 - P(t, FINE - .6, FINE)) });

  // la lettura dei due numeri, sotto la circonferenza
  const lx = P(t, 25.8, 26.2), ly = P(t, 30.8, 31.2);
  if (lx > 0) {
    ctx.save(); ctx.globalAlpha *= lx;
    drawRich(ctx, '{mx:x}{ink: ≈}', 170, 700, { size: 42, align: 'left' });
    fixedNum(ctx, fmtN(x, 2), 500, 700, 44, C.x);
    ctx.restore();
  }
  if (ly > 0) {
    ctx.save(); ctx.globalAlpha *= ly;
    drawRich(ctx, '{my:sin x}{ink: ≈}', 170, 760, { size: 42, align: 'left' });
    fixedNum(ctx, fmtN(Math.abs(s) < 1e-9 ? 0 : s, 2), 500, 760, 44, C.y);
    ctx.restore();
  }

  // 3 · i periodi e la formula
  const kq = life(t, 86.0, FINE, .5, .4);
  if (kq > 0) {
    ctx.save(); ctx.globalAlpha *= kq; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.lineCap = 'round';
    [0, 1].forEach(k => {
      const a = G[0] + k * 2 * PI * u + 6, b = G[0] + (k + 1) * 2 * PI * u - 6, y = 700;
      ctx.beginPath(); ctx.moveTo(a, y - 14); ctx.lineTo(a, y); ctx.lineTo(b, y); ctx.lineTo(b, y - 14); ctx.stroke();
      drawRich(ctx, '{mg:2π}', (a + b) / 2, y + 38, { size: 44, local: t - 86.0 - .4 * k });
    });
    ctx.restore();
  }
  drawRich(ctx, '{my:sin(}{mx:x}{my: + 2π)}{mink: = }{my:sin }{mx:x}', 1210, 185, { size: 54, local: t - 90.2, alpha: P(t, 90.2, 90.5) * (1 - P(t, FINE - .6, FINE)) });
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il punto che gira disegna la sinusoide,\nche si ripete ogni {mink:2π}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'sull’asse {mx:x}\nl’angolo in radianti', 34], [960, 'sull’asse {my:y}\nil seno', 34], [1430, '{g:periodo} {mink:2π}', 44]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 455, 430, 130);
    drawRich(ctx, s, px, 520, { size, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Dalla circonferenza alla sinusoide', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 38.1, 'il punto e la sua altezza'], [38.1, 73.1, 'un giro: la sinusoide'], [73.1, FINE, 'periodo 2π']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneFine(ctx, t); },
  };
});
