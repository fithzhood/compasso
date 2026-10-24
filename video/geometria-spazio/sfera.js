'use strict';
/* La sfera nella scodella — una semisfera di raggio r accanto a un cilindro (raggio r, altezza r) scavato da un cono
   con il vertice in basso al centro: alla quota h la semisfera dà un cerchio di area π(r² − h²), la scodella una corona
   circolare di area πr² − πh². Sezioni uguali a ogni altezza → stesso volume (Cavalieri): semisfera = πr³ − πr³/3 = 2/3 · πr³,
   sfera = 4/3 · πr³. Argomento: geometria-spazio. */
CVIDEO.registra('geometria-spazio/sfera', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, richW, drawSeq, dot, card } = M;

const FINE = 93.9, DUR = 106.3;   // tempi spostati per Pitagora
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [22.3, 'felice'], [24.4, 'neutro'], [58.9, 'sorpreso'], [61.1, 'felice'], [65.1, 'neutro'],
  [69.5, 'felice'], [73.3, 'neutro'], [88.3, 'festa'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 7.4, 'occhiolino'],
];
// una frase per ogni cosa che succede; il piano sta fermo mentre Ada parla delle sezioni
const FUMETTI = [
  [2.4, 6.4, 'Come si calcola il volume\ndi una sfera?'],
  // 1 · la semisfera e la scodella
  [7.9, 12.1, 'Prendo mezza sfera,\ndi raggio {mink:r}.'],
  [12.3, 16.9, 'Accanto, un cilindro con\nraggio {mink:r} e altezza {mink:r}.'],
  [17.1, 22.1, 'Lo scavo con un {y:cono}: vertice in basso,\nal centro; base in cima.'],
  [22.3, 25.9, 'Quello che resta è una {g:scodella}.'],
  // 2 · le sezioni
  [26.1, 30.5, 'Taglio tutti e due con un piano\nall’altezza {mink:h}.'],
  [30.7, 35.5, 'Ecco un triangolo rettangolo:\nipotenusa {mink:r}, un cateto {mink:h}.'],
  [35.7, 42.1, 'Per Pitagora il raggio della sezione,\nal quadrato, vale {mink:r² − h²}.'],
  [42.3, 47.1, 'Quindi la sezione ha area\n{mink:π(r² − h²)}.'],
  [47.3, 52.3, 'Il cono è largo quanto alto:\na quota {mink:h} il buco ha raggio {mink:h}.'],
  [52.5, 58.7, 'La sezione è una {g:corona circolare}:\n{mink:πr² − πh²}.'],
  [58.9, 64.9, 'È la stessa area: {mink:π(r² − h²)}!'],
  [65.1, 69.35, 'Il piano sale: a ogni altezza\nle due aree restano uguali.'],
  // 3 · il volume
  [69.5, 73.1, 'Per Cavalieri hanno\nlo stesso {g:volume}.'],
  [73.3, 78.7, 'Cilindro: {mink:πr² · r = πr³}.'],
  [78.9, 83.1, 'Cono: un terzo, {mink:1/3 · πr³}.'],
  [83.3, 88.1, 'Semisfera: la differenza,\n{mink:2/3 · πr³}.'],
  [88.3, 93.3, 'La sfera è il doppio:\n{mink:V = 4/3 · πr³}.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Semisfera e scodella hanno lo stesso\nvolume: la sfera vale {mink:4/3 · πr³}.'],
];

// ---------- lo spazio in assonometria (la stessa dei video di geometria-analitica-spazio) ----------
// proiezione ortogonale: l'osservatore guarda da 20° fra gli assi x e y, 22° più in alto;
// x viene verso chi guarda (in basso a sinistra), y va a destra, z sale
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const VD = [Math.cos(PH) * Math.cos(TH), Math.cos(PH) * Math.sin(TH), Math.sin(PH)];   // verso chi guarda
const DX = [VR[0], VR[1], 0], XV = [Math.cos(TH), Math.sin(TH), 0];   // orizzontali: verso destra / verso chi guarda
const proj = (ox, oy, s) => {
  const f = (x, y, z) => [ox + s * (x * VR[0] + y * VR[1]), oy - s * (x * VU[0] + y * VU[1] + z * VU[2])];
  f.s = s; f.p = q => f(q[0], q[1], q[2]);
  return f;
};
const add = (a, b, k = 1) => [a[0] + k * b[0], a[1] + k * b[1], a[2] + k * b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function seg(ctx, a, b, col, w, k = 1, al = 1, trat) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (trat) ctx.setLineDash(trat);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function poli(ctx, pts, fill, stroke, w = 2) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
function etichetta(ctx, s, x, y, size, al = 1, align = 'center') {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 20, x0 = align === 'left' ? x - 10 : align === 'right' ? x - w + 10 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 10); ctx.fill();
  drawRich(ctx, s, x, y, { size, align });
  ctx.restore();
}
// normale di un poligono (metodo di Newell: regge anche i vertici ripetuti)
function newell(Q) {
  const n = [0, 0, 0];
  for (let i = 0; i < Q.length; i++) {
    const a = Q[i], b = Q[(i + 1) % Q.length];
    n[0] += (a[1] - b[1]) * (a[2] + b[2]); n[1] += (a[2] - b[2]) * (a[0] + b[0]); n[2] += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return n;
}
// solido convesso: facce visibili velate, spigoli visibili pieni, spigoli nascosti tratteggiati
function solido(ctx, pr, V, F, col, al = 1, o = {}) {
  if (al <= 0) return;
  const c = V.reduce((s, q) => add(s, q, 1 / V.length), [0, 0, 0]);
  const vis = F.map(f => {
    const Q = f.map(i => V[i]), n = newell(Q), l = Math.hypot(n[0], n[1], n[2]);
    if (l < 1e-9) return 0;
    const m = Q.reduce((s, q) => add(s, q, 1 / Q.length), [0, 0, 0]);
    const k = (dot3(n, sub(m, c)) >= 0 ? 1 : -1) / l;
    return dot3(n, VD) * k > 1e-6 ? { nz: n[2] * k } : 0;
  });
  ctx.save(); ctx.globalAlpha *= al;
  if (o.velo !== 0) F.forEach((f, i) => { if (vis[i]) poli(ctx, f.map(j => pr.p(V[j])), css(col, (vis[i].nz > .6 ? .10 : .20) * (o.velo || 1))); });
  const S = {};
  F.forEach((f, i) => f.forEach((a, k) => {
    const b = f[(k + 1) % f.length], q = sub(V[a], V[b]);
    if (Math.hypot(q[0], q[1], q[2]) < 1e-9) return;
    const key = a < b ? a + ',' + b : b + ',' + a;
    if (!S[key]) S[key] = [a, b, false];
    if (vis[i]) S[key][2] = true;
  }));
  const L = Object.keys(S).map(k => S[k]);
  L.forEach(e => { if (!e[2]) seg(ctx, pr.p(V[e[0]]), pr.p(V[e[1]]), C.dim, 2.2, 1, .75, [9, 8]); });
  L.forEach(e => { if (e[2]) seg(ctx, pr.p(V[e[0]]), pr.p(V[e[1]]), o.bordo || C.ink, o.w || 3, 1, .85); });
  ctx.restore();
}
// due anelli di punti con lo stesso numero di vertici (sotto B, sopra T): prisma, tronco o piramide (T tutti uguali)
function anelli(B, T) {
  const n = B.length, V = B.concat(T), F = [B.map((q, i) => i), T.map((q, i) => n + i)];
  for (let i = 0; i < n; i++) F.push([i, (i + 1) % n, n + (i + 1) % n, n + i]);
  return { V, F };
}
// un pezzo del piano orizzontale z = h, coi lati paralleli agli assi x e y
function piano(ctx, pr, h, x0, x1, y0, y1, al) {
  if (al <= 0) return;
  const q = [[x1, y0], [x1, y1], [x0, y1], [x0, y0]].map(([a, b]) => pr(a, b, h));
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, q, css(C.v, .12), css(C.v, .55), 2.5);
  ctx.restore();
}
function retto3(ctx, pr, V, a, b, al, col, d = .28) {   // angolo retto in 3D nel piano delle direzioni a e b
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col || C.ink); ctx.lineWidth = 3; ctx.lineJoin = 'round';
  const q1 = pr.p(add(V, a, d)), q2 = pr.p(add(add(V, a, d), b, d)), q3 = pr.p(add(V, b, d));
  ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.lineTo(q3[0], q3[1]); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'La sfera nella scodella', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// ---------- la semisfera (centro O) e la scodella (cilindro di centro CC scavato dal cono) ----------
const PS = proj(415, 575, 94), R0 = 2, SR = R0 * PS.s, SPH = Math.sin(PH), CPH = Math.cos(PH);
const CC = add([0, 0, 0], DX, 4.5);
const hPiano = t => kf(t, [[65.1, 1.2], [68.9, 1.75]]);         // fermo a 1,2; sale solo mentre Ada lo dice
const kTaglio = t => P(t, 26.3, 27.1) * (1 - P(t, 69.2, 69.8));
// il cerchio di taglio della semisfera a quota k: ellisse di semiassi S·ρ e S·ρ·sin PH; visibile da −β a π + β
function taglio(k) {
  const r = Math.sqrt(Math.max(0, R0 * R0 - k * k)), c = PS(0, 0, k);
  const c0 = r > 1e-6 ? k * SPH / (r * CPH) : 99;
  return { r, c, a: PS.s * r, b: PS.s * r * SPH, be: c0 >= 1 ? null : Math.asin(Math.max(-1, c0)) };
}
// la calotta sopra il piano, come sottopercorso: arco visibile del taglio + arco del contorno della sfera
function calotta(ctx, k) {
  const T = taglio(k), o = PS(0, 0, 0);
  ctx.moveTo(T.c[0] + T.a * Math.cos(T.be), T.c[1] - T.b * Math.sin(T.be));
  ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, -T.be, Math.PI + T.be, false);
  const L = [T.c[0] - T.a * Math.cos(T.be), T.c[1] - T.b * Math.sin(T.be)], Rr = [T.c[0] + T.a * Math.cos(T.be), T.c[1] - T.b * Math.sin(T.be)];
  ctx.arc(o[0], o[1], SR, Math.atan2(L[1] - o[1], L[0] - o[0]), Math.atan2(Rr[1] - o[1], Rr[0] - o[0]), false);
  ctx.closePath();
  return { L, Rr };
}
const angolo = (p, o) => { const a = Math.atan2(p[1] - o[1], p[0] - o[0]); return a < 0 ? a + 2 * Math.PI : a; };
function arcoEll(ctx, c, a, b, t0, t1, col, w, trat) {
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; if (trat) ctx.setLineDash(trat);
  ctx.beginPath(); ctx.ellipse(c[0], c[1], a, b, 0, t0, t1, false); ctx.stroke(); ctx.restore();
}
// la semisfera sotto il piano z = h (h = R0: tutta)
function semisfera(ctx, h) {
  const o = PS(0, 0, 0), taglia = h < R0 - 1e-6;
  ctx.save();
  ctx.fillStyle = css(C.ink, .05); ctx.beginPath(); ctx.ellipse(o[0] + 10, o[1] + 8, SR * 1.02, SR * SPH * 1.05, 0, 0, 2 * Math.PI); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(o[0] + SR, o[1]); ctx.ellipse(o[0], o[1], SR, SR * SPH, 0, 0, Math.PI); ctx.arc(o[0], o[1], SR, Math.PI, 2 * Math.PI); ctx.closePath();
  let LR = null;
  if (taglia) LR = calotta(ctx, h);
  const g = ctx.createRadialGradient(o[0] - .38 * SR, o[1] - .5 * SR, .08 * SR, o[0], o[1] - .2 * SR, 1.1 * SR);
  g.addColorStop(0, css(C.x, .06)); g.addColorStop(.7, css(C.x, .18)); g.addColorStop(1, css(C.x, .32));
  ctx.fillStyle = C.paper; ctx.fill('evenodd'); ctx.fillStyle = g; ctx.fill('evenodd');
  // contorni: la base (dietro nascosta), il contorno della sfera sotto il taglio
  arcoEll(ctx, o, SR, SR * SPH, 0, Math.PI, C.x, 3);
  arcoEll(ctx, o, SR, SR * SPH, Math.PI, 2 * Math.PI, C.dim, 2.2, [9, 8]);
  ctx.strokeStyle = css(C.x); ctx.lineWidth = 3; ctx.beginPath();
  if (!taglia) ctx.arc(o[0], o[1], SR, Math.PI, 2 * Math.PI);
  else { ctx.arc(o[0], o[1], SR, Math.PI, angolo(LR.L, o)); ctx.moveTo(LR.Rr[0], LR.Rr[1]); ctx.arc(o[0], o[1], SR, angolo(LR.Rr, o), 2 * Math.PI); }
  ctx.stroke();
  // la faccia di taglio (il cerchio a quota h), chiara
  if (taglia) {
    const T = taglio(h);
    ctx.beginPath(); ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, 0, 2 * Math.PI);
    ctx.fillStyle = css(C.paper); ctx.fill(); ctx.fillStyle = css(C.x, .1); ctx.fill(); ctx.strokeStyle = css(C.x); ctx.lineWidth = 3; ctx.stroke();
  }
  ctx.restore();
}
function calottaFantasma(ctx, h, al) {   // il pezzo sopra il piano, trasparente
  if (al <= 0 || h >= R0 - 1e-6) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); calotta(ctx, h);
  ctx.fillStyle = css(C.x, .06); ctx.fill(); ctx.strokeStyle = css(C.x, .45); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
}
// la scodella sotto il piano z = h: il fianco del cilindro, la faccia di taglio (corona) e il buco del cono
function scodella(ctx, h, kCono) {
  const c0 = PS.p(CC), ch = PS.p(add(CC, [0, 0, h])), A = SR, B = SR * SPH;
  const rb = h * kCono, Ah = PS.s * rb, Bh = Ah * SPH;          // il buco a quota h ha raggio h
  ctx.save();
  ctx.fillStyle = css(C.ink, .05); ctx.beginPath(); ctx.ellipse(c0[0] + 10, c0[1] + 8, A * 1.02, B * 1.05, 0, 0, 2 * Math.PI); ctx.fill();
  ctx.beginPath(); ctx.ellipse(c0[0], c0[1], A, B, 0, 0, Math.PI); ctx.lineTo(ch[0] - A, ch[1]); ctx.ellipse(ch[0], ch[1], A, B, 0, Math.PI, 2 * Math.PI); ctx.closePath();
  ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = css(C.y, .18); ctx.fill();
  arcoEll(ctx, c0, A, B, 0, Math.PI, C.y, 3);
  arcoEll(ctx, c0, A, B, Math.PI, 2 * Math.PI, C.dim, 2.2, [9, 8]);
  seg(ctx, [c0[0] - A, c0[1]], [ch[0] - A, ch[1]], C.y, 3); seg(ctx, [c0[0] + A, c0[1]], [ch[0] + A, ch[1]], C.y, 3);
  // la faccia di sopra (a quota h): corona fra il bordo e il buco
  ctx.beginPath(); ctx.ellipse(ch[0], ch[1], A, B, 0, 0, 2 * Math.PI);
  ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = css(C.y, .08); ctx.fill();
  ctx.strokeStyle = css(C.y); ctx.lineWidth = 3; ctx.stroke();
  if (rb > 1e-3) {
    // dentro il buco si vede la parete del cono, più scura; il cono dietro la parete del cilindro è tratteggiato
    const gb = ctx.createLinearGradient(0, ch[1] - Bh, 0, ch[1] + Bh);   // la parete lontana in luce, quella vicina in ombra
    gb.addColorStop(0, css(C.y, .1)); gb.addColorStop(1, css(C.y, .5));
    ctx.beginPath(); ctx.ellipse(ch[0], ch[1], Ah, Bh, 0, 0, 2 * Math.PI); ctx.fillStyle = gb; ctx.fill();
    ctx.strokeStyle = css(C.y); ctx.lineWidth = 3; ctx.stroke();
    const d = c0[1] - ch[1], y0 = Bh * Bh / d, x0 = Ah * Math.sqrt(Math.max(0, 1 - (Bh / d) * (Bh / d)));
    ctx.save(); ctx.globalAlpha *= kCono;
    seg(ctx, c0, [ch[0] - x0, ch[1] + y0], C.y, 2.4, 1, .85, [9, 8]); seg(ctx, c0, [ch[0] + x0, ch[1] + y0], C.y, 2.4, 1, .85, [9, 8]);
    dot(ctx, c0, C.y, 1, 6);
    ctx.restore();
  }
  ctx.restore();
}
function scodellaFantasma(ctx, h, al) {
  if (al <= 0 || h >= R0 - 1e-6) return;
  const ch = PS.p(add(CC, [0, 0, h])), ct = PS.p(add(CC, [0, 0, R0])), A = SR, B = SR * SPH;
  ctx.save(); ctx.globalAlpha *= al;
  seg(ctx, [ch[0] - A, ch[1]], [ct[0] - A, ct[1]], C.y, 2, 1, .45); seg(ctx, [ch[0] + A, ch[1]], [ct[0] + A, ct[1]], C.y, 2, 1, .45);
  arcoEll(ctx, ct, A, B, 0, 2 * Math.PI, C.y, 2);
  ctx.restore();
}
// le sezioni verdi: il cerchio della semisfera e la corona della scodella
function sezioni(ctx, h, k1, k2) {
  ctx.save();
  if (k1 > 0) {
    const T = taglio(h);
    ctx.save(); ctx.globalAlpha *= k1; ctx.beginPath(); ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, 0, 2 * Math.PI);
    ctx.fillStyle = css(C.g, .5); ctx.fill(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  }
  if (k2 > 0) {
    const ch = PS.p(add(CC, [0, 0, h])), A = SR, B = SR * SPH, Ah = PS.s * h, Bh = Ah * SPH;
    ctx.save(); ctx.globalAlpha *= k2; ctx.beginPath(); ctx.ellipse(ch[0], ch[1], A, B, 0, 0, 2 * Math.PI); ctx.ellipse(ch[0], ch[1], Ah, Bh, 0, 0, 2 * Math.PI);
    ctx.fillStyle = css(C.g, .5); ctx.fill('evenodd'); ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(ch[0], ch[1], A, B, 0, 0, 2 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(ch[0], ch[1], Ah, Bh, 0, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// 1–3 · i due solidi, il piano, le sezioni (7.5–FINE)
function sceneSolidi(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .5, FINE + .2);
  const kc = kTaglio(t), h = kc > 0 ? lerp(R0, hPiano(t), kc) : R0;   // il piano scende dall'alto fino a 1,2
  const k1 = P(t, 7.8, 8.8), k2 = P(t, 12.4, 13.4), kCono = P(t, 17.3, 18.5);
  if (k1 > 0) { ctx.save(); ctx.globalAlpha *= k1; semisfera(ctx, h); ctx.restore(); }
  if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2; scodella(ctx, h, kCono); ctx.restore(); }
  if (kc > 0) {
    piano(ctx, PS, h, -3.6, 2.0, -2.1, 6.3, kc);
    sezioni(ctx, h, kc * P(t, 42.5, 43.1), kc * P(t, 52.5, 53.1));
    calottaFantasma(ctx, h, kc); scodellaFantasma(ctx, h, kc);
  }
  const o = PS(0, 0, 0), c0 = PS.p(CC), ct = PS.p(add(CC, [0, 0, R0]));
  // i nomi sotto i solidi
  txt(ctx, 'semisfera', o[0], 692, { size: 34, color: C.dim, alpha: P(t, 8.6, 9.1) });
  txt(ctx, 'cilindro', c0[0], 692, { size: 34, color: C.dim, alpha: life(t, 12.8, 22.4, .4, .3) });
  txt(ctx, 'scodella', c0[0], 692, { size: 34, color: C.dim, alpha: P(t, 22.5, 22.9) });
  // i raggi r: sulla base della semisfera, in cima al cilindro; l'altezza r del cilindro
  const kr1 = life(t, 8.8, 26.2, .4, .4), kr2 = life(t, 13.2, 26.2, .4, .4);
  if (kr1 > 0) { seg(ctx, o, [o[0] + SR, o[1]], C.ink, 3, 1, kr1); dot(ctx, o, C.ink, kr1, 6); etichetta(ctx, '{mink:r}', o[0] + SR / 2, o[1] - 28, 44, kr1); }
  if (kr2 > 0) {
    seg(ctx, ct, [ct[0] + SR, ct[1]], C.ink, 3, 1, kr2); etichetta(ctx, '{mink:r}', ct[0] + SR / 2, ct[1] - 28, 44, kr2);
    const x = c0[0] + SR + 34;
    ctx.save(); ctx.globalAlpha *= kr2; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 11, c0[1]); ctx.lineTo(x + 11, c0[1]); ctx.moveTo(x - 11, ct[1]); ctx.lineTo(x + 11, ct[1]); ctx.moveTo(x, c0[1]); ctx.lineTo(x, ct[1]); ctx.stroke(); ctx.restore();
    etichetta(ctx, '{mink:r}', x + 30, (c0[1] + ct[1]) / 2, 44, kr2);
  }
  // l'altezza h del piano, a sinistra della semisfera
  // l'altezza h del piano: dal centro O della base al centro del cerchio di taglio
  const kh = kc * P(t, 26.8, 27.3);
  if (kh > 0) { const Hs = PS(0, 0, h); seg(ctx, o, Hs, C.v, 5, 1, kh); dot(ctx, o, C.ink, kh, 6); etichetta(ctx, '{mink:h}', o[0] - 30, o[1] - 24, 44, kh); }
  // il triangolo rettangolo nella semisfera: cateto h, ipotenusa r
  const kt = life(t, 30.9, 47.2, .5, .4);
  if (kt > 0) {
    const H3 = [0, 0, h], Q3 = add(H3, DX, Math.sqrt(R0 * R0 - h * h)), Hs = PS.p(H3), Qs = PS.p(Q3);
    ctx.save(); ctx.globalAlpha *= kt;
    poli(ctx, [o, Hs, Qs], css(C.g, .16));
    seg(ctx, Hs, Qs, C.y, 5); seg(ctx, o, Qs, C.g, 5);
    retto3(ctx, PS, H3, [0, 0, -1], DX, 1, C.ink);
    dot(ctx, Qs, C.g, 1, 8);
    ctx.restore();
    etichetta(ctx, '{mink:r}', (o[0] + Qs[0]) / 2 + 22, (o[1] + Qs[1]) / 2 + 30, 44, kt);   // su un fondino: il bordo del piano passa sotto
  }
  // nella scodella: il cono è alto quanto è largo, il buco a quota h ha raggio h
  const kb = life(t, 47.5, 58.7, .5, .4);
  if (kb > 0) {
    const H3 = add(CC, [0, 0, h]), Q3 = add(H3, DX, h), Hs = PS.p(H3), Qs = PS.p(Q3);
    ctx.save(); ctx.globalAlpha *= kb;
    seg(ctx, c0, Hs, C.v, 5); seg(ctx, Hs, Qs, C.v, 5); seg(ctx, c0, Qs, C.y, 4);
    retto3(ctx, PS, H3, [0, 0, -1], DX, 1, C.ink);
    ctx.restore();
    etichetta(ctx, '{mink:h}', (Hs[0] + Qs[0]) / 2, Hs[1] - 30, 44, kb);
  }
  ctx.restore();
}

// ---------- la scheda a destra (8.0–FINE) ----------
const XR = 1500, U3 = { num: '{mink:1}', den: '{mink:3}' }, U23 = { num: '{mink:2}', den: '{mink:3}' }, U43 = { num: '{mink:4}', den: '{mink:3}' };
function scheda(ctx, t) {
  const ca = life(t, 8.0, FINE + .2, .5, .6);
  if (ca <= 0) return;
  card(ctx, 1140, 110, 720, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const parte = (a, b, fn) => { const k = life(t, a, b, .4, .4); if (k > 0) { ctx.save(); ctx.globalAlpha *= k; fn(); ctx.restore(); } };
  const titolo = s => conFont(TITOLI, () => drawRich(ctx, s, XR, 175, { size: 40, weight: 600 }));
  parte(8.0, 26.1, () => {
    titolo('i due solidi');
    drawRich(ctx, '{x:semisfera}{dim:: raggio} {mink:r}', XR, 265, { size: 38, local: t - 8.2 });
    drawRich(ctx, '{y:cilindro}{dim:: raggio} {mink:r}{dim:, altezza} {mink:r}', XR, 340, { size: 38, local: t - 12.6 });
    drawRich(ctx, '{y:cono}{dim:: base in cima,}', XR, 415, { size: 38, local: t - 17.4 });
    drawRich(ctx, '{dim:vertice in basso al centro}', XR, 465, { size: 38, local: t - 17.8 });
    drawRich(ctx, '{g:scodella}{dim: = cilindro − cono}', XR, 580, { size: 42, local: t - 22.6 });
  });
  parte(26.3, 69.5, () => {
    titolo('le sezioni a quota {mink:h}');
    drawRich(ctx, '{dim:il piano taglia a quota} {mink:h}', XR, 245, { size: 36, local: t - 26.6 });
    drawRich(ctx, '{dim:triangolo: ipotenusa} {mink:r}{dim:, cateto} {mink:h}', XR, 292, { size: 32, local: t - 31.0 });
    drawRich(ctx, '{dim:raggio della sezione, al quadrato:}', XR, 340, { size: 32, local: t - 36.0 });
    drawRich(ctx, '{mink:r² − h²}', XR, 386, { size: 44, local: t - 36.6 });
    drawRich(ctx, '{dim:semisfera}', XR, 448, { size: 32, local: t - 42.6 });
    drawRich(ctx, '{mink:π(r² − h²)}', XR, 494, { size: 44, local: t - 42.8 });
    drawRich(ctx, '{dim:scodella}', XR, 558, { size: 32, local: t - 52.6 });
    drawRich(ctx, '{mink:πr² − πh²}', XR, 604, { size: 44, local: t - 52.8 });
    drawRich(ctx, '{mink:= π(r² − h²)}', XR, 658, { size: 44, local: t - 59.1 });
    drawRich(ctx, '{g:stessa area}', XR, 728, { size: 44, local: t - 59.4 });
  });
  parte(69.6, FINE + .5, () => {
    titolo('i volumi');
    drawRich(ctx, '{dim:semisfera e scodella: stesso volume}', XR, 222, { size: 32, local: t - 69.8 });
    // a sinistra il nome, a destra la formula
    const XF = 1600, riga = (s, y, a) => drawRich(ctx, '{dim:' + s + '}', 1180, y, { size: 34, align: 'left', local: t - a });
    riga('cilindro', 305, 73.5); drawRich(ctx, '{mink:πr² · r = πr³}', XF, 305, { size: 44, local: t - 73.7 });
    riga('cono', 420, 79.1); drawSeq(ctx, [U3, '{mink:· πr³}'], XF, 420, 44, { local: t - 79.3 });
    riga('semisfera', 545, 83.5); drawSeq(ctx, ['{mink:πr³ −}', U3, '{mink:· πr³ =}', U23, '{mink:· πr³}'], XF + 12, 545, 40, { local: t - 83.7 });
    riga('sfera', 690, 88.5); drawSeq(ctx, ['{mink:V =}', U43, '{mink:· πr³}'], XF, 690, 54, { local: t - 88.7 });
    const kv = P(t, 89.2, 89.7);
    if (kv > 0) {
      ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XF - 170, 622, 340, 136, 16); ctx.stroke(); ctx.restore();
    }
  });
  ctx.restore();
}
function sceneCarta(ctx, t) { card(ctx, 150, 110, 950, 690, life(t, 7.5, FINE + .2, .5, .6)); }

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'A ogni altezza semisfera e scodella hanno\nsezioni uguali: lo stesso volume.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{dim:a quota} {mink:h}{dim::}\n{mink:π(r² − h²)}'], [960, 'semisfera =\ncilindro − cono'], [1430, null]];
  pills.forEach(([x, s], i) => {   // testo delle pillole a 40 px
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 440, 430, 140);
    if (s) drawRich(ctx, s, x, 512, { size: 40, weight: 400, lh: 1.25 });
    else drawSeq(ctx, ['{mink:V =}', U43, '{mink:· πr³}'], x, 510, 44);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py); il ding della faccia «festa» lo mette da sé
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.8, 8.8], ['soffio', 8.0], ['pop', 8.9, .4],       // la semisfera, r
    ['traccia', 12.4, 13.4], ['pop', 13.3, .5],                                       // il cilindro
    ['traccia', 17.3, 18.5], ['ding', 22.6],                                          // il cono, la scodella
    ['soffio', 26.3], ['tono', 26.3, 27.1, [1, .6]], ['pop', 27.0, .4],              // il piano scende a quota h
    ['traccia', 30.9, 31.6], ['pop', 42.6, .5],                                       // il triangolo; il cerchio verde
    ['traccia', 47.5, 48.2], ['pop', 52.6, .5],                                       // il cono; la corona verde
    ['ding', 59.0],                                                                   // stessa area
    ['tono', 65.1, 68.9, [.6, .88]],                                                  // il piano sale
    ['soffio', 69.3], ['pop', 73.6, .5], ['pop', 79.2, .55], ['pop', 83.6, .6], ['pop', 88.6, .8],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'La sfera nella scodella', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 26.0, 'la semisfera e la scodella'], [26.0, 69.4, 'le sezioni'], [69.4, FINE - .5, 'il volume']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCarta(ctx, t); sceneSolidi(ctx, t); scheda(ctx, t); sceneFine(ctx, t); },
  };
});

