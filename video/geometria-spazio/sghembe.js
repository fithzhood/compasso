'use strict';
/* Né parallele né incidenti — sugli spigoli di un cubo: rette incidenti (un punto in comune), parallele (sullo stesso
   piano, senza punti in comune) e sghembe: il cubo gira e si vede che una passa dietro l'altra; un piano che contiene r,
   girando, tocca s in un punto solo. Sghembe = non complanari. Argomento: geometria-spazio. */
CVIDEO.registra('geometria-spazio/sghembe', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, richW, dot, card } = M;

const FINE = 61.5, DUR = 73.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [12.5, 'felice'], [14.6, 'neutro'], [17.3, 'felice'], [19.4, 'neutro'], [27.3, 'pensa'], [32.1, 'neutro'],
  [42.8, 'felice'], [45.0, 'neutro'], [56.5, 'occhiolino'], [58.6, 'neutro'],
  [FINE + 2.4, 'felice'], [FINE + 7.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; il cubo e il piano stanno fermi mentre Ada parla di uno stato
const FUMETTI = [
  [2.4, 6.4, 'Due rette che non si incontrano\nsono per forza parallele?'],
  // 1 · incidenti e parallele
  [7.9, 12.1, 'Ogni spigolo di un cubo\nsta su una retta.'],
  [12.3, 16.9, 'Le rette {mink:r} e {mink:s} hanno un vertice\nin comune: sono {g:incidenti}.'],
  [17.1, 22.1, 'Ora {mink:r} e {mink:s} stanno sulla stessa\nfaccia e non si toccano: {g:parallele}.'],
  [22.3, 27.1, 'Due rette parallele stanno su un piano\ne non hanno punti in comune.'],
  // 2 · le sghembe
  [27.3, 31.9, 'E ora? {mink:r} e {mink:s} non si toccano,\nma non sono parallele.'],
  [32.1, 36.9, 'Giro il cubo: sembrano incrociarsi,\nma una passa {v:dietro} l’altra.'],
  [37.1, 42.6, 'Un piano per {mink:r} gira: incontra {mink:s}\nal più in un punto, non la contiene mai.'],
  [42.8, 47.2, 'Nessun piano le contiene tutte e due:\nsono rette {v:sghembe}.'],
  [47.4, 51.7, 'Sghembe vuol dire {v:non complanari}:\nné parallele, né incidenti.'],
  [51.9, 56.3, 'Incidenti e parallele, invece,\nstanno sempre su un piano.'],
  [56.5, 60.9, 'Nel cubo sono sghembi\nanche questi due spigoli.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Né parallele né incidenti: sono\nrette {v:sghembe}, non complanari.'],
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
const lerp3 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
// dove si incrociano sullo schermo i segmenti ab e cd (parametri lungo i due), oppure null
function incrocio(a, b, c, d) {
  const r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c[0], d[1] - c[1]], den = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(den) < 1e-9) return null;
  const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den, u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [t, u] : null;
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Né parallele né incidenti', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// ---------- il cubo, che può girare attorno al suo asse verticale ----------
const A = 2.6, PQ = proj(515, 580, 110), CEN = [A / 2, A / 2, 0];
const theta = t => kf(t, [[32.3, 0], [33.5, 40]]) * Math.PI / 180;     // gira solo mentre Ada lo dice
const rot = (p, th) => {
  const x = p[0] - CEN[0], y = p[1] - CEN[1], c = Math.cos(th), s = Math.sin(th);
  return [CEN[0] + x * c - y * s, CEN[1] + x * s + y * c, p[2]];
};
const BASE = [[0, 0, 0], [A, 0, 0], [A, A, 0], [0, A, 0]], TOP = BASE.map(q => [q[0], q[1], A]);
// r: lo spigolo in alto davanti (direzione y), allungato; s cambia: incidente, parallela, sghemba
const R = [[A, -1.0, A], [A, A + .5, A]], SZ0 = -.9, SZ1 = A + 1.1;   // s verticale: da quota SZ0 a SZ1
const COPPIE = [
  { s: [[A, A, SZ0], [A, A, SZ1]], a: 12.5, b: 17.0 },     // incidenti nel vertice (a; a; a)
  { s: [[A, -1.0, 0], [A, A + .5, 0]], a: 17.3, b: 27.2 },       // parallele: sulla faccia davanti
  { s: [[0, A, SZ0], [0, A, SZ1]], a: 27.4, b: 56.4 },      // sghembe: lo spigolo verticale dietro a destra
];
const R2 = [[A, 0, -.5], [A, 0, A + .5]], S2 = [[-.8, A, A], [A + .8, A, A]];   // altri due spigoli sghembi
// due rette: dove sembrano incrociarsi, quella davanti interrompe quella dietro
// un punto (coordinate del cubo) è nascosto se andando verso chi guarda si attraversa il cubo
function nascosto(p, d) {
  let t0 = 1e-4, t1 = 1e9;
  for (let k = 0; k < 3; k++) {
    if (Math.abs(d[k]) < 1e-12) { if (p[k] < 0 || p[k] > A) return false; continue; }
    let u = -p[k] / d[k], v = (A - p[k]) / d[k];
    if (u > v) { const w = u; u = v; v = w; }
    t0 = Math.max(t0, u); t1 = Math.min(t1, v);
    if (t0 >= t1) return false;
  }
  return t1 - t0 > 1e-3;
}
const versoChiGuarda = th => { const c = Math.cos(-th), s = Math.sin(-th); return [VD[0] * c - VD[1] * s, VD[0] * s + VD[1] * c, VD[2]]; };
// una retta (estremi nelle coordinate del cubo): piena dove si vede, tratteggiata dove il cubo la copre
function tratto(ctx, p, q, th, col, al, buco) {   // buco: dove passa davanti l'altra retta (parametro lungo pq)
  if (al <= 0) return;
  const d = versoChiGuarda(th), N = 80, pezzi0 = [];
  for (let i = 0; i < N; i++) {
    const h = nascosto(lerp3(p, q, (i + .5) / N), d);
    if (pezzi0.length && pezzi0[pezzi0.length - 1][2] === h) pezzi0[pezzi0.length - 1][1] = (i + 1) / N; else pezzi0.push([i / N, (i + 1) / N, h]);
  }
  let pezzi = pezzi0;
  if (buco != null) {
    const L = Math.hypot(...[0, 1].map(k => PQ.p(rot(q, th))[k] - PQ.p(rot(p, th))[k])), g = 13 / Math.max(L, 1);
    pezzi = [];
    pezzi0.forEach(([u, v, h]) => {
      if (v <= buco - g || u >= buco + g) { pezzi.push([u, v, h]); return; }
      if (u < buco - g) pezzi.push([u, buco - g, h]);
      if (v > buco + g) pezzi.push([buco + g, v, h]);
    });
  }
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineCap = 'round';
  pezzi.forEach(([u, v, h]) => {
    const a = PQ.p(rot(lerp3(p, q, u), th)), b = PQ.p(rot(lerp3(p, q, v), th));
    ctx.lineWidth = h ? 3.5 : 5; ctx.setLineDash(h ? [10, 9] : []);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  });
  ctx.restore();
}
function coppia(ctx, r, s, th, kr, ks, alR, alS, nomi, parte) {   // parte: il tratto di s da disegnare (per il piano)
  const cut = (L, k) => { const m = lerp3(L[0], L[1], .5); return [lerp3(m, L[0], k), lerp3(m, L[1], k)]; };
  const Rl = cut(r, kr), Sl = cut(s, ks), Sdl = parte ? [lerp3(Sl[0], Sl[1], parte[0]), lerp3(Sl[0], Sl[1], parte[1])] : Sl;
  const R3 = Rl.map(p => rot(p, th)), Sd = Sdl.map(p => rot(p, th)), S3 = Sl.map(p => rot(p, th));
  const a = PQ.p(R3[0]), b = PQ.p(R3[1]), c = PQ.p(Sd[0]), d = PQ.p(Sd[1]), dS = PQ.p(S3[1]), cS = PQ.p(S3[0]);
  let davanti = null, X = null;
  if (kr > 0 && ks > 0 && alR > 0 && alS > 0) {
    X = incrocio(a, b, c, d);
    if (X) { const dr = dot3(lerp3(R3[0], R3[1], X[0]), VD), ds = dot3(lerp3(Sd[0], Sd[1], X[1]), VD); if (Math.abs(dr - ds) > 1e-3) davanti = dr > ds ? 'r' : 's'; }
  }
  // dove sembrano incrociarsi, quella dietro si interrompe
  if (kr > 0) tratto(ctx, Rl[0], Rl[1], th, C.x, alR, davanti === 's' ? X[0] : null);
  if (ks > 0 && Math.hypot(d[0] - c[0], d[1] - c[1]) > 1) tratto(ctx, Sdl[0], Sdl[1], th, C.y, alS, davanti === 'r' ? X[1] : null);
  if (nomi) {
    const fuori = (p, q, k) => { const L = Math.hypot(p[0] - q[0], p[1] - q[1]); return [p[0] + (p[0] - q[0]) / L * k, p[1] + (p[1] - q[1]) / L * k]; };
    const ns = fuori(dS, cS, 34);
    etichetta(ctx, '{my:s}', ns[0], ns[1], 44, alS * P(ks, .8, 1));
  }
}
// il piano che contiene r e gira attorno a r: φ è l'angolo della sua normale (cos φ; 0; sin φ)
const phi = t => kf(t, [[37.4, 60], [41.6, 140]]) * Math.PI / 180;
function pianoPerR(ctx, th, f, al) {
  if (al <= 0) return;
  const w = [-Math.sin(f), 0, Math.cos(f)];                         // nel piano, perpendicolare a r
  const q = [[-.55, -.8], [A + .2, -.8], [A + .2, 4.2], [-.55, 4.2]].map(([y, u]) => PQ.p(rot(add([A, y, A], w, u), th)));
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, q, css(C.v, .14), css(C.v, .6), 2.5);
  ctx.restore();
}
function sceneCubo(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(150, 110, 950, 690); ctx.clip();          // rette e piano restano nella scheda
  ctx.globalAlpha *= P(t, 7.8, 8.8) * (1 - P(t, FINE - .5, FINE + .2));
  const th = theta(t);
  const box = anelli(BASE.map(p => rot(p, th)), TOP.map(p => rot(p, th)));
  solido(ctx, PQ, box.V, box.F, C.dim, 1, { velo: .5 });
  // la faccia davanti come pezzo di piano, quando Ada dice che le parallele stanno su un piano
  const kf5 = life(t, 22.4, 27.0, .5, .4);
  if (kf5 > 0) {
    const q = [[-1.0, -.6], [A + .5, -.6], [A + .5, A + .6], [-1.0, A + .6]].map(([y, z]) => PQ.p(rot([A, y, z], th)));
    ctx.save(); ctx.globalAlpha *= kf5; poli(ctx, q, css(C.g, .16), css(C.g, .6), 2.5); ctx.restore();
  }
  // il piano che contiene r e gira; il punto dove tocca s
  const kp = life(t, 37.2, 42.9, .4, .5), f = phi(t);
  // il tratto di s dietro al piano va prima del piano, il resto dopo
  let parte = null;
  if (kp > 0 && t > 27.4) {
    const c = Math.cos(-th), sn = Math.sin(-th), vd = [VD[0] * c - VD[1] * sn, VD[0] * sn + VD[1] * c, VD[2]];
    const tau = A + A * Math.cos(f) / Math.sin(f), u = Math.max(0, Math.min(1, (tau - SZ0) / (SZ1 - SZ0)));
    const davanti = Math.cos(f) * vd[0] + Math.sin(f) * vd[2] > 0;   // il lato del piano verso chi guarda
    parte = davanti ? [u, 1] : [0, u];
    const dietro = davanti ? [0, u] : [u, 1], Sl = COPPIE[2].s;
    if (dietro[1] - dietro[0] > .002) tratto(ctx, lerp3(Sl[0], Sl[1], dietro[0]), lerp3(Sl[0], Sl[1], dietro[1]), th, C.y, life(t, 27.4, 56.4, .3, .4));
  }
  pianoPerR(ctx, th, f, kp);
  // le rette; mentre Ada dice che ogni spigolo sta su una retta, si allunga r (ancora senza nome)
  // r c'è sempre (anche fra una coppia e l'altra); le coppie la ridisegnano sopra dove serve
  const k0 = P(t, 9.0, 9.8) * (1 - P(t, 56.2, 56.6));
  if (k0 > 0) {
    const m = lerp3(R[0], R[1], .5), a0 = lerp3(m, R[0], k0), a1 = lerp3(m, R[1], k0);
    tratto(ctx, a0, a1, th, C.x, 1 - Math.max.apply(null, COPPIE.map(({ a, b }) => life(t, a, b, .3, .4))));
    const pa = PQ.p(rot(a0, th)), pb = PQ.p(rot(a1, th)), L = Math.hypot(pa[0] - pb[0], pa[1] - pb[1]);
    etichetta(ctx, '{mx:r}', pa[0] + (pa[0] - pb[0]) / L * 34, pa[1] + (pa[1] - pb[1]) / L * 34, 44, P(t, 12.5, 12.9) * (1 - P(t, 56.2, 56.6)));
  }
  const kr = P(t, 9.0, 9.8) * (1 - P(t, 56.2, 56.6)), alR = 1;
  COPPIE.forEach(({ s, a, b }) => {
    const al = life(t, a, b, .3, .4);
    if (al > 0) coppia(ctx, R, s, th, kr, P(t, a, a + .8), al, al, true, s === COPPIE[2].s ? parte : null);
  });
  const k2 = P(t, 56.6, 57.4);
  if (k2 > 0) coppia(ctx, R2, S2, th, k2, k2, 1, 1, false);
  // il punto comune delle incidenti; il punto dove il piano tocca s
  dot(ctx, PQ.p(rot([A, A, A], th)), C.g, life(t, 13.3, 17.0, .3, .3), 11);
  if (kp > 0) {
    const tau = A + A * Math.cos(f) / Math.sin(f);
    if (tau > SZ0 && tau < SZ1) dot(ctx, PQ.p(rot([0, A, tau], th)), C.g, kp, 11);
  }
  ctx.restore();
}

// ---------- la scheda a destra (12.4–FINE) ----------
function scheda(ctx, t) {
  const ca = life(t, 12.4, FINE + .2, .5, .6);
  if (ca <= 0) return;
  card(ctx, 1140, 110, 720, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  conFont(TITOLI, () => drawRich(ctx, 'due rette nello spazio', 1500, 175, { size: 40, weight: 600 }));
  const riga = (nome, desc, y, a) => {
    drawRich(ctx, nome, 1190, y, { size: 40, align: 'left', local: t - a });
    drawRich(ctx, '{dim:' + desc + '}', 1190, y + 46, { size: 32, align: 'left', local: t - a - .3 });
  };
  riga('{g:incidenti}', 'un punto in comune', 255, 13.0);
  riga('{g:parallele}', 'su un piano, nessun punto in comune', 375, 22.5);
  riga('{v:sghembe}', 'nessun piano le contiene', 495, 43.0);
  if (t > 47.4) { ctx.save(); ctx.globalAlpha *= P(t, 47.4, 47.8); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1180, 600); ctx.lineTo(1820, 600); ctx.stroke(); ctx.restore(); }
  drawRich(ctx, 'le {v:sghembe} sono {v:non complanari}', 1500, 650, { size: 36, local: t - 47.6 });
  drawRich(ctx, 'incidenti e parallele: {g:complanari}', 1500, 720, { size: 36, local: t - 52.1 });
  ctx.restore();
}
function sceneCarta(ctx, t) { card(ctx, 150, 110, 950, 690, life(t, 7.5, FINE + .2, .5, .6)); }

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Due rette sghembe non stanno su nessun piano:\nnon si incontrano e non sono parallele.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{g:incidenti}:\nun punto in comune'], [960, '{g:parallele}:\ncomplanari, nessun punto'], [1430, '{v:sghembe}:\nnon complanari']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 440, 430, 140);
    drawRich(ctx, s, x, 512, { size: 33, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.8, 8.8],                                          // il cubo
    ['soffio', 12.4], ['traccia', 12.5, 13.3], ['pop', 13.4, .7],                    // r e s incidenti, il punto
    ['traccia', 17.3, 18.1],                                                          // s parallela
    ['soffio', 22.4],                                                                 // il piano della faccia
    ['traccia', 27.4, 28.2],                                                          // s sghemba
    ['tono', 32.3, 33.5, [.4, .6]],                                                   // il cubo gira
    ['soffio', 37.2], ['tono', 37.4, 41.6, [.95, .05]],                              // il piano gira, il punto scende su s
    ['pop', 43.0, .6], ['pop', 47.6, .6], ['pop', 52.1, .5],                         // sghembe, non complanari, complanari
    ['traccia', 56.6, 57.4],                                                          // altri due spigoli
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Né parallele né incidenti', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 27.2, 'incidenti e parallele'], [27.2, FINE - .5, 'le sghembe']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCarta(ctx, t); sceneCubo(ctx, t); scheda(ctx, t); sceneFine(ctx, t); },
  };
});

