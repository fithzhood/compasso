'use strict';
/* Un terzo del prisma — il cubo di lato a si divide in tre piramidi congruenti a base quadrata con il vertice V in
   comune (le basi sono le tre facce che non contengono V): ognuna vale 1/3 · a² · a. Stirando il cubo in altezza ogni
   volume si moltiplica per lo stesso numero, e con Cavalieri (basi equivalenti, stessa altezza) V = 1/3 · B · h vale
   per ogni piramide. Argomento: geometria-spazio. */
CVIDEO.registra('geometria-spazio/piramide-terzo', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, richW, drawSeq, fixedNum, fmtN, dot, card } = M;

const FINE = 98.7, DUR = 109.7;   // 2° giro: ritorno prima del fumetto
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [32.6, 'felice'], [35.7, 'neutro'], [48.9, 'festa'], [51.0, 'neutro'], [53.5, 'pensa'], [58.1, 'neutro'],
  [71.7, 'felice'], [74.3, 'neutro'], [89.5, 'felice'], [93.7, 'festa'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 7.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; i pezzi stanno fermi mentre Ada ne parla
const FUMETTI = [
  [2.4, 6.4, 'Perché nel volume della piramide\ncompare quel {v:un terzo}?'],
  // 1 · tre piramidi in un cubo
  [7.9, 12.3, 'Ecco un cubo di lato {mink:a}\ne un suo vertice, {mink:O}.'],
  [12.5, 17.3, 'Le tre facce che non toccano {mink:O}\nsaranno le basi di tre piramidi.'],
  [17.5, 21.9, 'Ogni piramide ha il vertice in {mink:O}:\ninsieme riempiono il cubo.'],
  [22.1, 26.1, 'Le separo: sono tre pezzi\nche si incastrano.'],
  [26.3, 30.5, 'Hanno tutte per base un quadrato\ndi lato {mink:a}…'],
  [30.7, 35.5, '…e per altezza uno spigolo del cubo,\nlungo {mink:a}: sono {g:congruenti}.'],
  [35.7, 40.1, 'Tre piramidi congruenti fanno il cubo:\nognuna ne è {g:un terzo}.'],
  // 2 · il volume
  [40.3, 46.3, 'Il cubo vale {mink:a² · a}: la piramide\nne è un terzo, {mink:1/3 · a² · a}.'],
  [46.5, 53.3, 'Base {mink:B = a²}, altezza {mink:h = a}:\n{mink:V = 1/3 · B · h}.'],
  // 3 · un'altezza qualunque
  [53.5, 57.9, 'Qui l’altezza è uguale al lato.\nE se non lo fosse?'],
  [58.1, 62.5, 'Stiro il cubo in altezza: diventa\nun prisma alto {mink:h}.'],
  [62.7, 67.3, 'I pezzi non sono più congruenti,\nma crescono tutti allo stesso modo.'],
  [68.9, 74.1, 'Ogni volume si moltiplica per lo stesso\nnumero: la piramide resta {g:un terzo}.'],
  [74.3, 79.1, 'Base {mink:B}, altezza {mink:h}:\nancora {mink:V = 1/3 · B · h}.'],
  // 4 · una base qualunque
  [79.5, 84.3, 'E con un’altra base? Due piramidi:\nbasi {g:equivalenti}, stessa altezza.'],
  [84.5, 89.3, 'Il piano sale: le sezioni sono le basi\nrimpicciolite allo stesso modo.'],
  [89.5, 93.5, 'Aree sempre uguali: per Cavalieri\nhanno lo stesso volume.'],
  [93.7, 98.1, 'Per ogni piramide:\n{mink:V = 1/3 · B · h}.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Una piramide è un terzo del prisma\ncon la stessa base e la stessa altezza.'],
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
  if (o.fondo > 0) F.forEach((f, i) => { if (vis[i]) poli(ctx, f.map(j => pr.p(V[j])), css(C.paper, o.fondo)); });
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
const sc = (a, k) => [a[0] * k, a[1] * k, a[2] * k];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Un terzo del prisma', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// ---------- 1–3 · il cubo e le tre piramidi (7.5–79.4) ----------
const A = 2.4, PC = proj(560, 560, 108);
const VV = [0, 0, A];                                            // il vertice comune O, in alto dietro a sinistra
const SOPRA = [[0, 0, A], [A, 0, A], [A, A, A], [0, A, A]];
// le basi: le tre facce che non contengono O (sotto, davanti x = a, a destra y = a)
const BASI = [
  [[0, 0, 0], [A, 0, 0], [A, A, 0], [0, A, 0]],
  [[A, 0, 0], [A, A, 0], [A, A, A], [A, 0, A]],
  [[0, A, 0], [A, A, 0], [A, A, A], [0, A, A]],
];
const PIEDI = [[0, 0, 0], [A, 0, A], [0, A, A]];               // l'altezza di ciascuna è uno spigolo del cubo: O–piede
const VIA = [[-.2, .6, -.9], [2.6, -1.9, .6], [-1.0, 2.3, .8]];   // dove va ogni pezzo quando si separano
const VIA2 = [[-.2, .6, -.9], [2.6, -1.9, 0], [-1.0, 2.3, -.1]];  // nel prisma stirato, più alto: i pezzi salgono meno
const COL = () => [C.v, C.x, C.y];
const kVia = t => t < 50 ? P(t, 22.3, 24.3, E.io) * (1 - P(t, 35.9, 37.5, E.io)) : P(t, 62.9, 64.5, E.io) * (1 - P(t, 67.4, 68.8, E.io));
const stira = t => kf(t, [[58.3, 1], [60.5, 1.5]]);           // il cubo diventa un prisma alto 1,5 · a
const kP1 = t => life(t, 46.6, 79.2, .5, .5);                   // la piramide di sotto, in evidenza
function cubo(ctx, t, al) {
  if (al <= 0) return;
  const kz = stira(t), Z = q => [q[0], q[1], q[2] * kz], cols = COL();
  const kF = P(t, 12.7, 13.9), k1 = kP1(t);
  ctx.save(); ctx.globalAlpha *= al;
  // la faccia di sotto si vede attraverso le altre: va prima di tutto
  if (kF > 0) poli(ctx, BASI[0].map(q => PC.p(Z(q))), css(C.v, .22 * kF));
  const box = anelli(BASI[0].map(Z), SOPRA.map(Z));
  solido(ctx, PC, box.V, box.F, C.dim, 1, { velo: .5 });
  if (kF > 0) [1, 2].forEach(i => poli(ctx, BASI[i].map(q => PC.p(Z(q))), css(cols[i], .22 * kF * (1 - .6 * k1))));
  if (k1 > 0) { const v = Z(VV), s = anelli(BASI[0].map(Z), [v, v, v, v]); solido(ctx, PC, s.V, s.F, C.v, k1, { velo: 1.6, bordo: C.v }); }
  // gli spigoli interni, da O ai vertici delle basi: nascosti tranne quello sulla faccia di sopra
  const ki = P(t, 17.7, 18.9);
  if (ki > 0) {
    const v = PC.p(Z(VV));
    [[A, A, 0, 1], [A, 0, 0, 1], [0, A, 0, 1], [A, A, A, 0]].forEach(([x, y, z, nas]) => {
      seg(ctx, v, PC.p(Z([x, y, z])), nas ? C.dim : C.ink, nas ? 2.2 : 3, ki, nas ? .8 : .85, nas ? [9, 8] : null);
    });
  }
  // O, il lato a, poi B e h per la piramide di sotto
  const v = PC.p(Z(VV));
  dot(ctx, v, C.ink, P(t, 8.4, 8.8, E.back), 9);
  etichetta(ctx, '{mink:O}', v[0] - 30, v[1] - 30, 44, P(t, 8.6, 9.0));
  const m = PC.p([A / 2, A, 0]);                                  // il lato a, sotto lo spigolo in basso a destra
  etichetta(ctx, '{mink:a}', m[0] + 34, m[1] + 30, 44, P(t, 8.8, 9.2));
  const kB = life(t, 46.7, 79.2, .4, .5);
  if (kB > 0) {
    const b = PC.p([A, A / 2, 0]);
    etichetta(ctx, '{mink:B}', b[0] - 20, b[1] + 50, 44, kB);
    const q0 = PC.p([A, -.75, 0]), q1 = PC.p(Z([A, -.75, A]));
    ctx.save(); ctx.globalAlpha *= kB; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(q0[0] - 12, q0[1]); ctx.lineTo(q0[0] + 12, q0[1]); ctx.moveTo(q1[0] - 12, q1[1]); ctx.lineTo(q1[0] + 12, q1[1]);
    ctx.moveTo(q0[0], q0[1]); ctx.lineTo(q1[0], q1[1]); ctx.stroke(); ctx.restore();
    etichetta(ctx, '{mink:h}', q0[0] - 34, (q0[1] + q1[1]) / 2, 44, kB);
  }
  ctx.restore();
}
// le tre piramidi separate
function pezzi(ctx, t, ke) {
  const cols = COL(), kB = life(t, 26.5, 37.0, .5, .5), kH = life(t, 30.9, 37.0, .5, .5);
  const kz = stira(t), via = t < 50 ? VIA : VIA2;
  // mentre si muovono, le facce sono piene: quello davanti copre quello dietro
  const fondo = 1 - P(ke, .85, 1);
  [0, 2, 1].forEach(i => {                                         // dal più lontano al più vicino
    const o = sc(via[i], ke), T = q => add([q[0], q[1], q[2] * kz], o), base = BASI[i].map(T), v = T(VV);
    if (kB > 0) poli(ctx, base.map(PC.p), css(cols[i], .3 * kB), css(cols[i], kB), 4);
    const s = anelli(base, [v, v, v, v]);
    solido(ctx, PC, s.V, s.F, cols[i], 1, { velo: 1.3, fondo });
    if (kH > 0) {
      const a = PC.p(v), b = PC.p(T(PIEDI[i]));
      seg(ctx, a, b, C.g, 6, 1, kH, i === 0 ? [12, 9] : null);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      etichetta(ctx, '{mg:a}', mx + [-66, -16, 0][i], my + [0, -30, -34][i], 44, kH);
    }
  });
}
function sceneCubo(ctx, t) {
  if (t < 7.5 || t > 79.8) return;
  const al = P(t, 7.8, 8.8) * (1 - P(t, 79.1, 79.7));
  const ke = kVia(t);
  if (ke > .001) { ctx.save(); ctx.globalAlpha *= al; pezzi(ctx, t, ke); ctx.restore(); }
  else cubo(ctx, t, al);
}

// ---------- 4 · due piramidi con basi equivalenti e la stessa altezza (79.4–FINE) ----------
// base quadrata di lato 2 col vertice sopra un vertice della base; base triangolare (lato 4, altezza 2) col vertice
// sopra il baricentro: tutte e due con area di base 4 e altezza 3
const PD = proj(400, 620, 100), HQ = 3;
const BQ = [[0, 0, 0], [2, 0, 0], [2, 2, 0], [0, 2, 0]], AQ = [0, 0, HQ];
const OT = add([0, 0, 0], DX, 4.3);
const BT = [[1.6, -1, 0], [1.6, 3, 0], [-.4, 1, 0]].map(q => add(q, OT)), AT = add([2.8 / 3, 1, HQ], OT);
const zPiano = t => kf(t, [[84.7, .4], [88.7, 2.25]]);
const kTaglio = t => P(t, 84.6, 85.1);
const sezione = (B, Ap, z) => B.map(q => add(q, sub(Ap, q), z / HQ));
function scenePiramidi(ctx, t) {
  if (t < 79.4 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= P(t, 79.5, 80.3) * (1 - P(t, FINE - .5, FINE + .2));
  const kc = kTaglio(t), z = kc > 0 ? zPiano(t) : 0;
  const coppie = [[BQ, AQ, C.v], [BT, AT, C.y]];
  if (kc <= 0) coppie.forEach(([B, Ap, col]) => { const s = anelli(B, B.map(() => Ap)); solido(ctx, PD, s.V, s.F, col, 1, { velo: 1.3 }); });
  else {
    // sotto il piano, il piano, le sezioni, e sopra il piano il pezzo trasparente
    coppie.forEach(([B, Ap, col]) => { const s = anelli(B, sezione(B, Ap, z)); solido(ctx, PD, s.V, s.F, col, 1, { velo: 1.3 }); });
    piano(ctx, PD, z, -2.3, 2.7, -.9, 6.4, kc);
    coppie.forEach(([B, Ap]) => poli(ctx, sezione(B, Ap, z).map(PD.p), css(C.g, .5 * kc), css(C.g, kc), 4));
    coppie.forEach(([B, Ap, col]) => { const S2 = sezione(B, Ap, z), s = anelli(S2, S2.map(() => Ap)); solido(ctx, PD, s.V, s.F, col, 1 - .75 * kc, { velo: 1.3 }); });
  }
  // area di base e altezza, finché non arriva il piano
  const kl = P(t, 80.2, 80.8) * (1 - P(t, 84.4, 84.9));
  if (kl > 0) {
    etichetta(ctx, '{mink:B = 4}', 460, 762, 44, kl);
    etichetta(ctx, '{mink:B = 4}', 892, 762, 44, kl);
    const q0 = PD.p([2, -.7, 0]), q1 = PD.p([2, -.7, HQ]);
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(q0[0] - 12, q0[1]); ctx.lineTo(q0[0] + 12, q0[1]); ctx.moveTo(q1[0] - 12, q1[1]); ctx.lineTo(q1[0] + 12, q1[1]);
    ctx.moveTo(q0[0], q0[1]); ctx.lineTo(q1[0], q1[1]); ctx.stroke(); ctx.restore();
    etichetta(ctx, '{mink:h = 3}', q1[0], q1[1] - 38, 44, kl);   // sopra la quota: dentro la scheda
  }
  ctx.restore();
}

// ---------- la scheda a destra (12.8–FINE) ----------
const XR = 1500, U3 = { num: '{mink:1}', den: '{mink:3}' };
function riquadro(ctx, s, y, size, k) {   // contorno verde intorno a una formula già scritta
  if (k <= 0) return;
  const w = richW(ctx, s, size) + 60;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(XR - w / 2, y - size * 1.3, w, size * 2.6, 16); ctx.stroke(); ctx.restore();
}
function scheda(ctx, t) {
  const ca = life(t, 12.8, FINE + .2, .5, .6);
  if (ca <= 0) return;
  card(ctx, 1140, 110, 720, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const parte = (a, b, fn) => { const k = life(t, a, b, .4, .4); if (k > 0) { ctx.save(); ctx.globalAlpha *= k; fn(); ctx.restore(); } };
  const titolo = s => conFont(TITOLI, () => drawRich(ctx, s, XR, 175, { size: 40, weight: 600 }));
  // 1 · le tre piramidi
  parte(12.8, 40.0, () => {
    titolo('le tre piramidi');
    const cols = COL();
    ['la faccia di sotto', 'la faccia davanti', 'la faccia a destra'].forEach((s, i) => {
      const k = P(t, 13.0 + i * .4, 13.4 + i * .4); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= k;
      ctx.fillStyle = css(cols[i], .45); ctx.strokeStyle = css(cols[i]); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(1225, 247 + i * 62, 34, 34, 6); ctx.fill(); ctx.stroke();
      drawRich(ctx, '{dim:base:} ' + s, 1280, 264 + i * 62, { size: 36, align: 'left' });
      ctx.restore();
    });
    drawRich(ctx, '{dim:basi:} quadrati di lato {mink:a}', XR, 480, { size: 40, local: t - 26.6 });
    drawRich(ctx, '{dim:altezze:} {mink:a}', XR, 545, { size: 40, local: t - 31.0 });
    drawRich(ctx, '{g:congruenti}', XR, 640, { size: 52, local: t - 32.7 });
  });
  // 2 · il volume
  parte(40.4, 53.4, () => {
    titolo('il volume');
    drawRich(ctx, '{dim:cubo}  {mink:= a² · a}', XR, 275, { size: 48, local: t - 40.6 });
    drawSeq(ctx, ['{dim:piramide}  {mink:=}', U3, '{mink:· a² · a}'], XR, 390, 48, { local: t - 42.6 });
    drawRich(ctx, '{mink:B = a²}     {mink:h = a}', XR, 505, { size: 44, local: t - 46.7 });
    drawSeq(ctx, ['{mink:V =}', U3, '{mink:· B · h}'], XR, 650, 60, { local: t - 48.6 });
    riquadro(ctx, '{mink:V = 1/3 · B · h}', 650, 60, P(t, 49.4, 49.9));
  });
  // 3 · un'altezza qualunque
  parte(53.5, 79.4, () => {
    titolo('un’altezza qualunque');
    drawRich(ctx, '{dim:nel cubo}   {mink:h = a}', XR, 255, { size: 44, local: t - 53.7 });
    drawRich(ctx, '{dim:nel prisma}   {mink:h}{dim:  qualunque}', XR, 320, { size: 44, local: t - 58.4 });
    drawRich(ctx, '{dim:i pezzi non sono più congruenti,}', XR, 395, { size: 34, local: t - 62.9 });
    drawRich(ctx, '{dim:ma crescono tutti allo stesso modo}', XR, 440, { size: 34, local: t - 63.3 });
    drawSeq(ctx, ['{dim:piramide}  {mink:=}', U3, '{dim:del prisma}'], XR, 530, 48, { local: t - 69.2 });
    drawSeq(ctx, ['{mink:V =}', U3, '{mink:· B · h}'], XR, 670, 56, { local: t - 74.5 });
    riquadro(ctx, '{mink:V = 1/3 · B · h}', 670, 56, P(t, 75.2, 75.7));
  });
  // 4 · le sezioni viste dall'alto: un quadrato e un triangolo che si stringono insieme
  parte(79.6, FINE + .5, () => {
    const kt = kTaglio(t);
    if (kt < 1) { ctx.save(); ctx.globalAlpha *= 1 - kt; titolo('le basi, viste dall’alto'); ctx.restore(); }
    if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt; titolo('le sezioni, viste dall’alto'); ctx.restore(); }
    const z = kTaglio(t) > 0 ? zPiano(t) : 0, zq = Math.round(z * 100) / 100, f = (HQ - zq) / HQ, u = 60 * f;
    ctx.save(); ctx.fillStyle = css(C.g, .32); ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.rect(1330 - u, 370 - u, 2 * u, 2 * u); ctx.fill(); ctx.stroke();
    // dall'alto: y verso destra, x verso il basso; il triangolo intorno al suo baricentro
    const tri = [[1.6, -1], [1.6, 3], [-.4, 1]].map(([x, y]) => [1670 + (y - 1) * u, 370 + (x - 2.8 / 3) * u]);
    poli(ctx, tri, css(C.g, .32), css(C.g), 4);
    ctx.restore();
    const area = 4 * f * f, esatto = Math.abs(area * 100 - Math.round(area * 100)) < 1e-6, s = (esatto ? '' : '≈ ') + fmtN(area, area === 4 ? 0 : 2);
    txt(ctx, 'area', 1330, 520, { size: 32, color: C.dim }); txt(ctx, 'area', 1670, 520, { size: 32, color: C.dim });
    txt(ctx, s, 1330, 575, { size: 44, weight: 600, color: C.g }); txt(ctx, s, 1670, 575, { size: 44, weight: 600, color: C.g });
    drawSeq(ctx, ['{mink:V =}', U3, '{mink:· B · h}'], XR, 700, 56, { local: t - 93.9 });
    riquadro(ctx, '{mink:V = 1/3 · B · h}', 700, 56, P(t, 94.6, 95.1));
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
    drawRich(ctx, 'La piramide è un terzo del prisma\nche ha la sua base e la sua altezza.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'tre piramidi\n{g:congruenti} nel cubo'], [960, 'basi {g:equivalenti},\nstessa altezza'], [1430, null]];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 440, 430, 140);
    if (s) drawRich(ctx, s, x, 512, { size: 34, weight: 400, lh: 1.3 });
    else drawSeq(ctx, ['{mink:V =}', U3, '{mink:· B · h}'], x, 510, 44);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py); il ding delle facce «festa» lo mette da sé
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.8, 8.8], ['pop', 8.5, .8],                         // il cubo, V
    ['soffio', 12.8], ['pop', 13.0, .3], ['pop', 13.4, .45], ['pop', 13.8, .6],        // le tre basi
    ['traccia', 17.7, 18.9],                                                          // gli spigoli da V
    ['tono', 22.3, 24.3, [.45, .7]],                                                  // le piramidi si separano
    ['pop', 26.6, .5], ['traccia', 30.9, 31.5], ['ding', 32.8],                       // basi, altezze, congruenti
    ['tono', 35.9, 37.5, [.7, .45]],                                                  // tornano a fare il cubo
    ['soffio', 40.4], ['pop', 40.7, .5], ['pop', 42.7, .55], ['pop', 46.8, .6], ['pop', 48.7, .7],
    ['soffio', 53.6], ['pop', 53.8, .5], ['tono', 58.3, 60.5, [.5, .85]],             // il cubo si stira
    ['tono', 62.9, 64.5, [.5, .7]], ['tono', 67.4, 68.8, [.7, .5]],                  // i pezzi stirati si separano e tornano
    ['pop', 69.3, .6], ['ding', 75.4],                                                // un terzo del prisma
    ['soffio', 79.6], ['traccia', 79.6, 80.3], ['pop', 80.4, .5],                     // le due piramidi
    ['soffio', 84.6], ['tono', 84.7, 88.7, [.2, .8]],                                 // il piano sale
    ['pop', 89.7, .6], ['pop', 94, .7],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Un terzo del prisma', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 40.2, 'tre piramidi in un cubo'], [40.2, 53.4, 'il volume'], [53.4, 79.3, 'un’altezza qualunque'], [79.4, FINE - .5, 'una base qualunque']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCarta(ctx, t); sceneCubo(ctx, t); scenePiramidi(ctx, t); scheda(ctx, t); sceneFine(ctx, t); },
  };
});

