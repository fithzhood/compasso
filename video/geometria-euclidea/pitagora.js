'use strict';
/* Il teorema di Pitagora — dimostrazione per scomposizione: quattro triangoli rettangoli congruenti nel quadrato di lato a + b;
   prima lasciano libero c², poi, spostati, a² + b². Argomento: geometria-euclidea. */
CVIDEO.registra('geometria-euclidea/pitagora', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, card, checkMark } = M;

const FINE = 80.4, DUR = 92.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [20.1, 'felice'], [22.4, 'neutro'], [48.3, 'sorpreso'], [50.4, 'neutro'],
  [66.5, 'sorpreso'], [68.8, 'neutro'], [75.6, 'festa'], [FINE, 'neutro'], [82.8, 'felice'], [87.2, 'occhiolino'],
];
const FUMETTI = [
  [2.4, 6.4, 'Che legame c’è fra i lati\ndi un triangolo rettangolo?'],
  [7.9, 11.6, 'Ecco un triangolo {g:rettangolo}:\nun angolo è retto.'],
  [11.7, 16.1, 'I due lati dell’angolo retto\nsono i {g:cateti}, {mx:a} e {my:b}.'],
  [16.2, 20.0, 'Il lato opposto all’angolo retto\nè l’{v:ipotenusa}, {mv:c}.'],
  [20.1, 24.1, 'Per i triangoli {g:rettangoli}, il teorema\ndi Pitagora dice: {mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}.'],
  [24.2, 29.0, '{mv:c²}, {mx:a²}, {my:b²} sono aree di\nquadrati con i lati {mv:c}, {mx:a}, {my:b}.'],
  [29.1, 33.6, 'Metto il triangolo nell’angolo\ndi un quadrato di lato {mx:a}{mink: + }{my:b}.'],
  [33.7, 37.3, 'Giro una copia del triangolo\nnell’angolo accanto.'],
  [37.4, 40.4, 'Un’altra copia, in alto a destra…'],
  [40.5, 43.3, '…e l’ultima: quattro triangoli\n{g:congruenti}.'],
  [43.4, 48.0, 'Due angoli acuti fanno insieme 90°:\ngli angoli in mezzo sono {g:retti}.'],
  [48.1, 52.85, 'In mezzo resta un quadrato\ndi lato {mv:c}: la sua area è {mv:c²}.'],
  [52.9, 56.8, 'Mi segno questa figura: la parte\nlibera vale {mv:c²}.'],
  [56.9, 60.8, 'Faccio scivolare questo triangolo\nin alto a sinistra.'],
  [60.9, 63.6, 'Questo scivola a destra.'],
  [63.7, 66.2, 'E questo scende.'],
  [66.3, 71.0, 'Ora la parte libera è fatta di\ndue quadrati: {mx:a²} e {my:b²}.'],
  [71.1, 75.5, 'Il quadrato grande è lo stesso,\ne i quattro triangoli pure.'],
  [75.6, 79.8, 'Quindi le due parti libere hanno\nla stessa area: {mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}.'],
  [82.8, 89.4, 'Nel triangolo rettangolo, l’area\n{mv:c²} è la somma di {mx:a²} e {my:b²}.'],
];

// cateti a = 3 e b = 4 quadretti, ipotenusa c = 5; il quadrato grande ha lato a + b = 7
const A_ = 3, B_ = 4, N = A_ + B_;
const U = 70, OX = 460, OY = 715;                 // il quadrato grande: le copie che girano restano fuori dai titoli e dal fumetto
const S = (p, u = U, ox = OX, oy = OY) => [ox + u * p[0], oy - u * p[1]];
const U1 = 110, OX1 = 560, OY1 = 700;             // il triangolo da solo, grande (parte 1)
// i quattro triangoli: il primo vertice è quello dell’angolo retto.
// Ognuno è il precedente girato di 90° attorno al centro (3,5; 3,5)
const T1 = [[0, 0], [A_, 0], [0, B_]];
const ruota90 = (p, k = 1) => { const c = N / 2, f = Math.PI / 2 * k, dx = p[0] - c, dy = p[1] - c;
  return [c + dx * Math.cos(f) - dy * Math.sin(f), c + dx * Math.sin(f) + dy * Math.cos(f)]; };
const T2 = T1.map(p => ruota90(p)), T3 = T2.map(p => ruota90(p)), T4 = T3.map(p => ruota90(p));
// gli spostamenti (solo traslazioni), uno alla volta: T2, poi T1, poi T3; T4 resta fermo
const MOSSE = { 2: [[-A_, B_], 57.5, 59.3], 1: [[B_, 0], 61.1, 62.6], 3: [[0, -A_], 63.9, 65.4] };
const ROT = { 2: 34.0, 3: 37.6, 4: 40.6 };         // quando ogni copia gira al suo posto (1,6 s)
const BASE = { 1: T1, 2: T2, 3: T3, 4: T4 };
function triangolo(t, i) {
  let pts = BASE[i];
  const m = MOSSE[i];
  if (m) { const k = P(t, m[1], m[2]); pts = pts.map(p => [p[0] + m[0][0] * k, p[1] + m[0][1] * k]); }
  return pts;
}
function poligono(ctx, pts, fill, stroke, w = 3) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
// triangolo in pixel con il segno dell’angolo retto nel primo vertice
function disegnaTri(ctx, px, al, evid = 0, lato = 22) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  poligono(ctx, px, css(C.dim, .2 + .2 * evid), css(C.ink), 3 + 2 * evid);
  const [o, p, q] = px, u = [(p[0] - o[0]), (p[1] - o[1])], v = [(q[0] - o[0]), (q[1] - o[1])];
  const lu = Math.hypot(...u), lv = Math.hypot(...v);
  const e1 = [u[0] / lu * lato, u[1] / lu * lato], e2 = [v[0] / lv * lato, v[1] / lv * lato];
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(o[0] + e1[0], o[1] + e1[1]); ctx.lineTo(o[0] + e1[0] + e2[0], o[1] + e1[1] + e2[1]); ctx.lineTo(o[0] + e2[0], o[1] + e2[1]); ctx.stroke();
  ctx.restore();
}
function tratto(ctx, a, b, col, w, al = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il teorema di Pitagora', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// lati colorati: cateto a (primo → secondo vertice) azzurro, cateto b arancio, ipotenusa viola
function lati(ctx, px, al, kA = 1, kB = 1, kC = 1) {
  tratto(ctx, px[0], px[1], C.x, 6, al * kA);
  tratto(ctx, px[0], px[2], C.y, 6, al * kB);
  tratto(ctx, px[1], px[2], C.v, 6, al * kC);
}
const EVID = { 1: [[60.9, 62.8]], 2: [[56.9, 59.5]], 3: [[63.7, 65.6]] };
function evidenza(t, i) {
  let e = Math.max(life(t, 42.3, 43.4, .3, .3), life(t, 71.2, 75.5, .4, .4));
  (EVID[i] || []).forEach(([a, b]) => { e = Math.max(e, life(t, a, b, .3, .3)); });
  return e;
}

// 1–3 · il triangolo, i quattro triangoli nel quadrato, gli spostamenti (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .4, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  const kM = P(t, 29.4, 30.9);   // il triangolo scende nell’angolo del quadrato
  const pxT1 = triangolo(t, 1).map(p => { const a = S(p, U1, OX1, OY1), b = S(p); return kM < 1 ? [lerp(a[0], b[0], kM), lerp(a[1], b[1], kM)] : b; });
  // il quadrato grande
  const kQ = P(t, 30.9, 32.1, E.lin);
  if (kQ > 0) {
    const q = [[0, 0], [N, 0], [N, N], [0, N], [0, 0]].map(p => S(p));
    ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3 + 2 * life(t, 71.2, 75.5, .4, .4);
    let tot = 4 * kQ; ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]);
    for (let i = 1; i <= 4 && tot > 0; i++) { const f = Math.min(1, tot); ctx.lineTo(lerp(q[i - 1][0], q[i][0], f), lerp(q[i - 1][1], q[i][1], f)); tot -= 1; }
    ctx.stroke(); ctx.restore();
  }
  // le parti libere: prima c², poi a² e b²
  const aC = life(t, 48.3, 57.5, .6, .5);
  if (aC > 0) { ctx.save(); ctx.globalAlpha *= aC; poligono(ctx, [[A_, 0], [N, A_], [B_, N], [0, B_]].map(p => S(p)), css(C.v, .2)); ctx.restore(); }
  const aAB = life(t, 66.5, FINE + .2, .6, .3);
  if (aAB > 0) {
    ctx.save(); ctx.globalAlpha *= aAB;
    poligono(ctx, [[0, 0], [B_, 0], [B_, B_], [0, B_]].map(p => S(p)), css(C.y, .22));
    poligono(ctx, [[B_, B_], [N, B_], [N, N], [B_, N]].map(p => S(p)), css(C.x, .22));
    ctx.restore();
  }
  // i triangoli
  const kDis = P(t, 8.0, 9.4, E.lin);
  if (kDis < 1) {
    if (kDis > 0) { ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.lineJoin = 'round';
      const pp = [...pxT1, pxT1[0]]; let tot = 3 * kDis; ctx.beginPath(); ctx.moveTo(pp[0][0], pp[0][1]);
      for (let i = 1; i <= 3 && tot > 0; i++) { const f = Math.min(1, tot); ctx.lineTo(lerp(pp[i - 1][0], pp[i][0], f), lerp(pp[i - 1][1], pp[i][1], f)); tot -= 1; }
      ctx.stroke(); ctx.restore(); }
  } else {
    disegnaTri(ctx, pxT1, 1, evidenza(t, 1), lerp(30, 22, kM));
    lati(ctx, pxT1, 1, P(t, 12.0, 12.6), P(t, 12.8, 13.4), P(t, 16.4, 17.0));
  }
  for (const i of [2, 3, 4]) {
    const t0 = ROT[i];
    if (t < t0) continue;
    let px;
    if (t < t0 + 1.6) { const f = P(t, t0, t0 + 1.6); px = BASE[i - 1].map(p => { const c = N / 2, a = Math.PI / 2 * f, dx = p[0] - c, dy = p[1] - c; return S([c + dx * Math.cos(a) - dy * Math.sin(a), c + dx * Math.sin(a) + dy * Math.cos(a)]); }); }
    else px = triangolo(t, i).map(p => S(p));
    disegnaTri(ctx, px, 1, evidenza(t, i));
    lati(ctx, px, 1);
  }
  const kAng = life(t, 43.6, 48.1, .4, .4);
  if (kAng > 0) {
    const g = Math.PI / 180, V = S([A_, 0]);
    ctx.save(); ctx.globalAlpha *= kAng;
    [[126.87, 180], [0, 36.87]].forEach(([a1, a2]) => {
      ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], 40, -a1 * g, -a2 * g, true); ctx.closePath();
      ctx.fillStyle = css(C.g, .35); ctx.fill(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.stroke();
    });
    ctx.restore();
    const kR = life(t, 45.0, 48.1, .4, .4);
    [[A_, 0], [N, A_], [B_, N], [0, B_]].forEach((p, i) => {
      const q = S(p), d1 = (36.87 + 90 * i) * g, d2 = d1 + 90 * g, l = 18;
      const u = [Math.cos(d1) * l, -Math.sin(d1) * l], v = [Math.cos(d2) * l, -Math.sin(d2) * l];
      ctx.save(); ctx.globalAlpha *= kR; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(q[0] + u[0], q[1] + u[1]); ctx.lineTo(q[0] + u[0] + v[0], q[1] + u[1] + v[1]); ctx.lineTo(q[0] + v[0], q[1] + v[1]); ctx.stroke(); ctx.restore();
    });
  }
  // le etichette dei lati: a e b seguono il primo triangolo fino al bordo del quadrato
  const pa = (() => { const a = [OX1 + U1 * A_ / 2, OY1 + 42], dx = MOSSE[1][0][0] * P(t, 61.1, 62.6), b = S([A_ / 2 + dx, -.62]); return [lerp(a[0], b[0], kM), lerp(a[1], b[1], kM)]; })();
  const pb = (() => { const a = [OX1 - 42, OY1 - U1 * B_ / 2], b = S([-.62, B_ / 2]); return [lerp(a[0], b[0], kM), lerp(a[1], b[1], kM)]; })();
  // mentre le copie girano attorno al centro escono un po’ dal quadrato: le etichette del bordo si nascondono
  const nasc = 1 - life(t, 33.5, 42.6, .3, .4);
  drawRich(ctx, '{mx:a}', pa[0], pa[1], { size: 44, alpha: P(t, 12.2, 12.7) * nasc });
  drawRich(ctx, '{my:b}', pb[0], pb[1], { size: 44, alpha: P(t, 13.0, 13.5) * nasc });
  drawRich(ctx, '{mv:c}', OX1 + U1 * A_ / 2 + 50, OY1 - U1 * B_ / 2 - 38, { size: 44, alpha: life(t, 16.6, 29.6, .4, .4) });
  // gli altri pezzi del bordo, quando c’è il quadrato
  const kL = P(t, 32.0, 32.6) * nasc;
  drawRich(ctx, '{my:b}', ...S([A_ + B_ / 2, -.62]), { size: 44, alpha: kL * (1 - P(t, 57.0, 57.4)) });
  drawRich(ctx, '{mx:a}', ...S([-.62, B_ + A_ / 2]), { size: 44, alpha: kL });
  // c e c² nel quadrato in mezzo
  drawRich(ctx, '{mv:c}', ...S([1.5 + .75 * .8, 2 + .75 * .6]), { size: 44, alpha: life(t, 48.6, 57.4, .4, .4) });
  drawRich(ctx, '{mv:c²}', ...S([N / 2, N / 2]), { size: 64, alpha: life(t, 48.9, 57.4, .4, .4) });
  // a² e b², con i loro lati
  const kQ2 = P(t, 66.7, 67.3);
  drawRich(ctx, '{my:b²}', ...S([B_ / 2, B_ / 2]), { size: 64, alpha: kQ2 });
  drawRich(ctx, '{mx:a²}', ...S([B_ + A_ / 2, B_ + A_ / 2]), { size: 60, alpha: kQ2 });
  drawRich(ctx, '{my:b}', ...S([B_ / 2, -.62]), { size: 44, alpha: kQ2 });
  drawRich(ctx, '{mx:a}', ...S([B_ + A_ / 2, N + .62]), { size: 44, alpha: kQ2 });
  ctx.restore();
}

// la scheda a destra: l’enunciato, i tre quadrati, la figura di prima (20–FINE)
function sceneScheda(ctx, t) {
  if (t < 20.1 || t > FINE + .3) return;
  const ca = life(t, 20.2, FINE + .2, .5, .6);
  card(ctx, 1180, 130, 660, 630, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const X = 1510;
  conFont(TITOLI, () => drawRich(ctx, 'teorema di Pitagora', X, 192, { size: 40, weight: 600, local: t - 20.3 }));
  const f = '{mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}';
  drawRich(ctx, f, X, 290, { size: 64, local: t - 20.6 });
  drawRich(ctx, 'per i triangoli {g:rettangoli}', X, 382, { size: 34, local: t - 21.2 });
  const kb = P(t, 76.4, 76.9);
  if (kb > 0) {
    const w = richW(ctx, f, 64);
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(X - w / 2 - 24, 290 - 47, w + 48, 92, 16); ctx.stroke(); ctx.restore();
    checkMark(ctx, X + w / 2 + 72, 290, P(t, 76.8, 77.5), C.g, .5);
  }
  // i tre quadrati, in scala: lati 5, 3, 4
  const aq = life(t, 24.4, 52.6, .5, .5);
  if (aq > 0) {
    const s = 26, y0 = 640;
    [[1284, 5, C.v, 'c', 24.6], [1484, 3, C.x, 'a', 25.4], [1632, 4, C.y, 'b', 26.2]].forEach(([x, l, col, n, ta]) => {
      const k = P(t, ta, ta + .5, E.out); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= aq * k;
      ctx.fillStyle = css(col, .22); ctx.strokeStyle = css(col); ctx.lineWidth = 3;
      ctx.fillRect(x, y0 - l * s, l * s, l * s); ctx.strokeRect(x, y0 - l * s, l * s, l * s);
      const key = col === C.v ? 'mv' : col === C.x ? 'mx' : 'my';
      drawRich(ctx, `{${key}:${n}²}`, x + l * s / 2, y0 - l * s / 2, { size: l === 3 ? 40 : 44 });
      drawRich(ctx, `{${key}:${n}}`, x + l * s / 2, y0 + 34, { size: 40 });
      ctx.restore();
    });
  }
  // la figura di prima, in piccolo: la parte libera è c²
  const am = life(t, 53.1, FINE + .2, .6, .3);
  if (am > 0) {
    const u = 30, ox = X - N * u / 2, oy = 700, s = p => S(p, u, ox, oy);
    ctx.save(); ctx.globalAlpha *= am;
    drawRich(ctx, '{dim:prima: parte libera }{mv:c²}', X, 448, { size: 34 });
    poligono(ctx, [[A_, 0], [N, A_], [B_, N], [0, B_]].map(s), css(C.v, .2));
    [T1, T2, T3, T4].forEach(tr => poligono(ctx, tr.map(s), css(C.dim, .2), css(C.ink), 2));
    ctx.strokeStyle = css(C.ink); ctx.lineWidth = 2; ctx.strokeRect(ox, oy - N * u, N * u, N * u);
    drawRich(ctx, '{mv:c²}', ...s([N / 2, N / 2]), { size: 40 });
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Nel triangolo rettangolo il quadrato\ndell’ipotenusa è la somma dei quadrati dei cateti.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[500, 460, '{mv:c²}{mink: = }{mx:a²}{mink: + }{my:b²}', 44], [1010, 440, 'quattro triangoli\n{g:congruenti}', 34], [1480, 380, 'parti libere\ncon {g:la stessa area}', 34]];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il teorema di Pitagora', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 29.0, 'il triangolo rettangolo'], [29.0, 56.8, 'quattro triangoli in un quadrato'], [56.8, 79.8, 'li sposto']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
