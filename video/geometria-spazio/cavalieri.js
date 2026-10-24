'use strict';
/* Due pile di monete — una pila dritta e una storta: ogni piano orizzontale le taglia in cerchi uguali, quindi hanno
   lo stesso volume (principio di Cavalieri: sezioni equivalenti, cioè con la stessa area, danno volumi uguali);
   così un prisma obliquo vale B · h come il prisma retto. Argomento: geometria-spazio. */
CVIDEO.registra('geometria-spazio/cavalieri', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW, card } = M;

const FINE = 83.8, DUR = 95.8;   // tempi spostati: pila che scivola
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [19.4, 'pensa'], [23.0, 'felice'], [25.2, 'neutro'], [32.8, 'felice'], [35.0, 'neutro'], [41.9, 'sorpreso'], [44.1, 'neutro'],
  [51.9, 'felice'], [54.1, 'neutro'], [75.1, 'felice'], [77.2, 'neutro'], [79.3, 'festa'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 7.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; il piano sta fermo mentre Ada parla di una sezione
const FUMETTI = [
  [2.4, 6.4, 'Due pile con le stesse monete:\nquale ha più volume?'],
  // 1 · le due pile
  [7.9, 12.0, 'Dieci monete uguali,\nimpilate ben dritte.'],
  [12.2, 15.6, 'Accanto, altre dieci\nmonete uguali.'],
  [15.8, 19.2, 'Le spingo di lato:\nuna pila {v:storta}.'],
  [19.4, 22.8, 'Quale delle due pile\nha più volume?'],
  [23.0, 27.4, 'Nessuna: sono le stesse monete,\nil volume è {g:lo stesso}.'],
  // 2 · le sezioni
  [27.8, 32.4, 'Taglio le due pile con un piano\n{v:orizzontale}, a una certa altezza.'],
  [32.6, 37.0, 'Le due sezioni sono cerchi {g:uguali}:\nhanno la stessa area.'],
  [37.2, 41.6, 'Il piano sale: a ogni altezza\nle sezioni restano uguali.'],
  // 3 · il principio
  [41.9, 46.7, 'È il {v:principio di Cavalieri}: contano\nsolo le aree delle sezioni.'],
  [46.9, 51.7, '{g:Equivalenti} vuol dire con la stessa\narea, anche se la forma è diversa.'],
  [51.9, 56.1, 'Nelle monete le sezioni sono\naddirittura {g:congruenti}.'],
  // 4 · il prisma obliquo
  [56.9, 61.3, 'Ora un prisma {v:obliquo}: gli spigoli\nlaterali sono inclinati.'],
  [61.5, 65.9, 'Accanto, un prisma {g:retto}: stessa\nbase, stessa altezza.'],
  [66.1, 70.35, 'Chiamo {mink:B}  l’area della base,\n{mink:h}  l’altezza e {mink:V}  il volume.'],
  [70.5, 74.9, 'Ogni piano orizzontale li taglia\nin due copie della base.'],
  [75.1, 79.1, 'Il prisma retto vale {mink:B · h}:\nbase per altezza.'],
  [79.3, 83.5, 'Per Cavalieri, anche quello obliquo:\n{mink:V = B · h}.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Sezioni della stessa area a ogni\naltezza: lo stesso volume.'],
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

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Due pile di monete', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// ---------- 1–3 · le due pile (7.5–56.7) ----------
const PA = proj(350, 640, 112);
const RM = 1.0, TM = .3, NM = 10;                         // raggio e spessore di una moneta; dieci monete
const BASE_B = add([0, 0, 0], DX, 4.1);                    // la pila storta, accanto
const storta = i => .85 * Math.sin(Math.PI * i / 10);       // di quanto la moneta i è spinta a destra
const centro = (q, i, t) => q ? add(BASE_B, DX, storta(i) * P(t, 15.8, 17.6)) : [0, 0, 0];
const comparsa = (q, i, t) => q ? P(t, 12.3 + i * .1, 12.6 + i * .1, E.out) : P(t, 8.1 + i * .18, 8.45 + i * .18, E.out);
// il piano: entra a 1,35 e sta fermo; sale a 2,55 solo mentre Ada lo dice
const hPiano = t => kf(t, [[37.4, 1.35], [41.0, 2.55]]);
const kTaglio = t => P(t, 28.0, 28.8);
function moneta(ctx, pr, c, z0, z1, al) {   // un pezzo di moneta da z0 a z1: fianco e faccia di sopra
  if (al <= 0 || z1 <= z0) return;
  const b = pr(c[0], c[1], z0), u = pr(c[0], c[1], z1), A = pr.s * RM, Bv = A * Math.sin(PH);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.ellipse(b[0], b[1], A, Bv, 0, 0, Math.PI); ctx.lineTo(u[0] - A, u[1]);
  ctx.ellipse(u[0], u[1], A, Bv, 0, Math.PI, 2 * Math.PI); ctx.closePath();
  ctx.fillStyle = css(mix(C.paper, C.y, .42)); ctx.fill();
  ctx.strokeStyle = css(C.y); ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(u[0], u[1], A, Bv, 0, 0, 2 * Math.PI);
  ctx.fillStyle = css(mix(C.paper, C.y, .2)); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function scenePile(ctx, t) {
  if (t < 7.5 || t > 56.8) return;
  const al = 1 - P(t, 56.1, 56.7);
  ctx.save(); ctx.globalAlpha *= al;
  const kc = kTaglio(t), h = kc > 0 ? hPiano(t) : 99;
  const pezzo = (q, i) => { const k = comparsa(q, i, t), z0 = i * TM + (1 - k) * .9; return { k, z0, z1: z0 + TM, c: centro(q, i, t) }; };
  // sotto il piano (o tutta la pila, prima del taglio)
  for (const q of [0, 1]) for (let i = 0; i < NM; i++) { const m = pezzo(q, i); moneta(ctx, PA, m.c, m.z0, Math.min(m.z1, h), m.k); }
  if (kc > 0) {
    piano(ctx, PA, h, -2.85, 1.35, -1.3, 5.75, kc);
    // le due sezioni: cerchi di raggio RM, verdi da quando Ada ne parla; si accendono quando dice «congruenti»
    const ks = kc * P(t, 32.7, 33.2), glow = life(t, 52.0, 56.0, .4, .4);
    if (ks > 0) for (const q of [0, 1]) {
      const c = centro(q, Math.min(NM - 1, Math.floor(h / TM)), t), o = PA(c[0], c[1], h), A = PA.s * RM;
      ctx.save(); ctx.globalAlpha *= ks;
      ctx.beginPath(); ctx.ellipse(o[0], o[1], A, A * Math.sin(PH), 0, 0, 2 * Math.PI);
      ctx.fillStyle = css(C.g, .5 + .2 * glow); ctx.fill();
      ctx.strokeStyle = css(C.g); ctx.lineWidth = 4 + 3 * glow; ctx.stroke();
      ctx.restore();
    }
    // sopra il piano: le monete diventano trasparenti
    for (const q of [0, 1]) for (let i = 0; i < NM; i++) { const m = pezzo(q, i); if (m.z1 > h) moneta(ctx, PA, m.c, Math.max(m.z0, h), m.z1, m.k * (1 - .8 * kc)); }
  }
  txt(ctx, 'dritta', PA(0, 0, 0)[0], 735, { size: 34, color: C.dim, alpha: P(t, 9.4, 9.9) });
  txt(ctx, 'storta', PA.p(BASE_B)[0], 735, { size: 34, color: C.dim, alpha: P(t, 17.4, 17.9) });
  ctx.restore();
}

// ---------- 4 · il prisma obliquo e il prisma retto (56.7–FINE) ----------
const PB = proj(430, 650, 106), HB = 3, LB = .9;
const C_RETTO = [0, 0, 0], C_OBL = add([0, 0, 0], DX, 3.6), SPOSTA = [0, 1.2, 0];   // in cima il prisma obliquo è spostato lungo y
const quadrato = c => [[-LB, -LB], [LB, -LB], [LB, LB], [-LB, LB]].map(([a, b]) => [c[0] + a, c[1] + b, 0]);
const anello = (c, z, sp) => quadrato(c).map(q => [q[0] + sp[0] * z / HB, q[1] + sp[1] * z / HB, z]);
const hPiano2 = t => kf(t, [[71.2, .6], [74.4, 2.4]]);
function scenePrismi(ctx, t) {
  if (t < 56.8 || t > FINE + .3) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .5, FINE + .2);
  const kc = P(t, 70.4, 71.0), h = kc > 0 ? hPiano2(t) : HB;
  const kb = P(t, 66.2, 66.8);
  const solidi = [[C_OBL, SPOSTA, P(t, 57.0, 58.0)], [C_RETTO, [0, 0, 0], P(t, 61.6, 62.6)]];
  // le basi, verdi da quando Ada le chiama B (si vedono attraverso le facce velate)
  solidi.forEach(([c, sp, k]) => { if (kb > 0 && k > 0) poli(ctx, quadrato(c).map(PB.p), css(C.g, .32 * kb * k), css(C.g, kb * k), 3); });
  // sotto il piano
  solidi.forEach(([c, sp, k]) => { const s = anelli(anello(c, 0, sp), anello(c, h, sp)); solido(ctx, PB, s.V, s.F, C.x, k); });
  if (kc > 0) {
    piano(ctx, PB, h, -2.45, 1.3, -1.3, 5.7, kc);
    solidi.forEach(([c, sp]) => poli(ctx, anello(c, h, sp).map(PB.p), css(C.g, .5 * kc), css(C.g, kc), 4));
    solidi.forEach(([c, sp]) => { const s = anelli(anello(c, h, sp), anello(c, HB, sp)); solido(ctx, PB, s.V, s.F, C.x, 1 - .78 * kc); });
  }
  // B davanti a ogni base; h accanto al prisma retto
  solidi.forEach(([c]) => { const o = PB.p(c); etichetta(ctx, '{mink:B}', o[0], o[1] + 100, 44, kb); });
  const kh = P(t, 66.8, 67.4);
  if (kh > 0) {
    const a = PB.p(add(C_RETTO, DX, -1.7)), b = PB.p(add(add(C_RETTO, DX, -1.7), [0, 0, HB]));
    ctx.save(); ctx.globalAlpha *= kh; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(a[0] - 12, a[1]); ctx.lineTo(a[0] + 12, a[1]); ctx.moveTo(b[0] - 12, b[1]); ctx.lineTo(b[0] + 12, b[1]);
    ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
    etichetta(ctx, '{mink:h}', a[0] - 34, (a[1] + b[1]) / 2, 44, kh);
  }
  ctx.restore();
}

// ---------- la scheda a destra (8.0–FINE) ----------
const XR = 1500;
function scheda(ctx, t) {
  const ca = life(t, 8.0, FINE + .2, .5, .6);
  if (ca <= 0) return;
  card(ctx, 1140, 110, 720, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const titolo = (s, a, b) => { const k = life(t, a, b, .4, .4); if (k > 0) conFont(TITOLI, () => drawRich(ctx, s, XR, 175, { size: 40, weight: 600, alpha: k })); };
  // le due pile: dieci monete ciascuna, stesso volume
  const k1 = life(t, 8.1, 27.6, .4, .4);
  if (k1 > 0) {
    ctx.save(); ctx.globalAlpha *= k1;
    titolo('le due pile', 8.1, 27.6);
    const ka = P(t, 9.9, 10.3), kb = P(t, 13.6, 14.0), kc = P(t, 17.6, 18.0);   // dopo l'ultima moneta di ogni pila; storta quando ha finito di scivolare
    txt(ctx, 'pila dritta', 1330, 300, { size: 34, color: C.dim, alpha: ka }); txt(ctx, kc > 0 ? 'pila storta' : 'seconda pila', 1670, 300, { size: 34, color: C.dim, alpha: kb });
    txt(ctx, '10 monete', 1330, 370, { size: 44, alpha: ka }); txt(ctx, '10 monete', 1670, 370, { size: 44, alpha: kb });
    drawRich(ctx, '{g:stesso volume}', XR, 500, { size: 52, local: t - 24.8 });
    ctx.restore();
  }
  // le due sezioni viste dall'alto
  // le due sezioni viste dall'alto: col piano compaiono i contorni, si riempiono quando Ada dice che sono uguali
  const k2 = life(t, 28.2, 41.8, .5, .4);
  if (k2 > 0) {
    ctx.save(); ctx.globalAlpha *= k2;
    titolo('le due sezioni', 28.2, 41.8);
    const kv = P(t, 32.8, 33.3);
    [1330, 1670].forEach(x => {
      ctx.beginPath(); ctx.arc(x, 400, 100, 0, 2 * Math.PI);
      ctx.fillStyle = css(C.g, .32 * kv); ctx.fill();
      ctx.strokeStyle = css(kv > 0 ? C.g : C.dim); ctx.lineWidth = 4; ctx.setLineDash(kv > 0 ? [] : [10, 9]); ctx.stroke(); ctx.setLineDash([]);
    });
    txt(ctx, '=', XR, 400, { size: 64, weight: 600, alpha: kv });
    txt(ctx, 'dritta', 1330, 540, { size: 34, color: C.dim }); txt(ctx, 'storta', 1670, 540, { size: 34, color: C.dim });
    drawRich(ctx, '{g:stessa area}', XR, 640, { size: 48, local: t - 33.2 });
    ctx.restore();
  }
  // il principio
  const k3 = life(t, 42.1, 56.5, .5, .5);
  if (k3 > 0) {
    ctx.save(); ctx.globalAlpha *= k3;
    titolo('il principio di Cavalieri', 42.1, 56.5);
    ['Se due solidi, tagliati da ogni piano', 'parallelo a un piano dato, hanno', 'sezioni {g:equivalenti}, allora hanno', 'lo stesso {g:volume}.']
      .forEach((s, i) => drawRich(ctx, s, XR, 250 + i * 52, { size: 34, local: t - 42.3 - i * .35 }));
    const kf2 = P(t, 47.1, 47.7);
    if (kf2 > 0) {
      ctx.save(); ctx.globalAlpha *= kf2;
      const r = 66, l = r * Math.sqrt(Math.PI);   // cerchio e quadrato con la stessa area
      ctx.beginPath(); ctx.arc(1385, 548, r, 0, 2 * Math.PI); ctx.fillStyle = css(C.g, .3); ctx.fill(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.rect(1615 - l / 2, 548 - l / 2, l, l); ctx.fill(); ctx.stroke();
      drawRich(ctx, '{g:stessa area}: equivalenti', XR, 690, { size: 40 });
      ctx.restore();
    }
    ctx.restore();
  }
  // i due prismi
  // i due prismi, mentre entrano
  const k35 = life(t, 56.9, 66.2, .5, .4);
  if (k35 > 0) {
    ctx.save(); ctx.globalAlpha *= k35;
    titolo('due prismi', 56.9, 66.2);
    drawRich(ctx, '{x:prisma obliquo}', XR, 280, { size: 42, local: t - 57.1 });
    drawRich(ctx, '{dim:spigoli laterali inclinati}', XR, 335, { size: 34, local: t - 57.4 });
    drawRich(ctx, '{x:prisma retto}', XR, 450, { size: 42, local: t - 61.7 });
    drawRich(ctx, '{dim:spigoli perpendicolari alla base}', XR, 505, { size: 34, local: t - 62.0 });
    drawRich(ctx, '{g:stessa base, stessa altezza}', XR, 620, { size: 40, local: t - 63.0 });
    ctx.restore();
  }
  const k4 = P(t, 66.3, 66.8);
  if (k4 > 0) {
    titolo('volume', 66.3, 300);
    drawRich(ctx, '{mink:B}{dim: = area della base}', XR, 245, { size: 40, local: t - 66.4 });
    drawRich(ctx, '{mink:h}{dim: = altezza}', XR, 300, { size: 40, local: t - 67.4 });
    drawRich(ctx, '{mink:V}{dim: = volume}', XR, 355, { size: 40, local: t - 68.3 });
    if (t > 75.2) { ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1180, 400); ctx.lineTo(1820, 400); ctx.stroke(); }
    drawRich(ctx, '{dim:prisma retto}', XR, 450, { size: 34, local: t - 75.3 });
    drawRich(ctx, '{mink:V = B · h}', XR, 510, { size: 48, local: t - 75.6 });
    drawRich(ctx, '{dim:prisma obliquo}', XR, 595, { size: 34, local: t - 79.5 });
    drawRich(ctx, '{mink:V = B · h}', XR, 660, { size: 48, local: t - 79.8 });
    const kv = P(t, 80.4, 80.9);
    if (kv > 0) {
      ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      const w = richW(ctx, '{mink:V = B · h}', 48) + 48;
      ctx.beginPath(); ctx.roundRect(XR - w / 2, 622, w, 76, 16); ctx.stroke(); ctx.restore();
    }
  }
  ctx.restore();
}
function sceneCarte(ctx, t) {
  card(ctx, 150, 110, 950, 690, life(t, 7.5, FINE + .2, .5, .6));
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Se a ogni altezza le sezioni hanno\nla stessa area, i volumi sono uguali.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'sezioni {g:equivalenti}:\nstessa area', 34], [960, 'principio\ndi {v:Cavalieri}', 34], [1430, 'prisma obliquo:\n{mink:V = B · h}', 40]];
  pills.forEach(([x, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 440, 430, 140);
    drawRich(ctx, s, x, 512, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5],
    ['tono', 8.1, 10.0, [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1]],                     // le monete si impilano
    ['tono', 12.3, 13.6, [.1, .4, .7, 1]],                                            // la seconda pila
    ['tono', 15.8, 17.6, [.5, .65, .55]],                                             // le monete scivolano di lato
    ['soffio', 8.0], ['pop', 10.0, .4], ['pop', 13.7, .45], ['ding', 25.0],                              // stesso volume
    ['soffio', 28.0],                                                                 // il piano
    ['pop', 32.8, .55], ['pop', 33.1, .6],                                            // le sezioni, verdi
    ['tono', 37.4, 41.0, [.45, .85]],                                                 // il piano sale
    ['soffio', 42.1], ['pop', 42.4, .5], ['pop', 43.1, .55],                          // il principio
    ['pop', 47.2, .5], ['pop', 47.5, .6],                                             // cerchio e quadrato
    ['pop', 52.2, .7],                                                                // congruenti
    ['soffio', 57.0], ['traccia', 57.0, 58.0],                                        // il prisma obliquo
    ['traccia', 61.6, 62.6],                                                          // il prisma retto
    ['pop', 66.4, .5], ['traccia', 66.8, 67.4], ['pop', 67.1, .6],                    // B e h
    ['soffio', 70.4], ['tono', 71.2, 74.4, [.2, .8]],                                 // il piano sale nei prismi
    ['pop', 75.7, .6], ['ding', 80.0],                                                // V = B · h
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Due pile di monete', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 27.6, 'le due pile'], [27.6, 41.7, 'le sezioni'], [41.7, 56.5, 'il principio di Cavalieri'], [56.5, FINE - .5, 'il prisma obliquo']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCarte(ctx, t); scenePile(ctx, t); scenePrismi(ctx, t); scheda(ctx, t); sceneFine(ctx, t); },
  };
});
