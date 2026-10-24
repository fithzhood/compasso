'use strict';
/* Il piano che sfiora la sfera — x² + y² + z² = 9 e il piano z = k che sale: il taglio è una circonferenza di raggio
   √(9 − k²), si stringe e a k = 3 diventa un punto (piano tangente); oltre, nessun punto. Argomento: geometria-analitica-spazio. */
CVIDEO.registra('geometria-analitica-spazio/sfera-tangente', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, richW, txt, fixedNum, fmtN, dot, glowStroke, arrowHead, card } = M;

const FINE = 85.9, DUR = 97.5;   // tempi «vecchi»: i fumetti allungati per la voce li sistema MAPPA, in fondo
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [18.0, 'felice'], [22.5, 'neutro'], [36.5, 'felice'], [41.4, 'neutro'], [45.7, 'felice'], [50.1, 'neutro'],
  [52.2, 'festa'], [55.1, 'neutro'], [59.5, 'sorpreso'], [64.4, 'felice'], [69.0, 'neutro'], [76.0, 'pensa'],
  [80.6, 'sorpreso'], [83.0, 'neutro'], [FINE + 2.4, 'felice'], [90.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Che cosa succede quando un piano\ntaglia una sfera?'],
  // 1 · la sfera
  [7.9, 12.9, 'Sfera di centro {mink:O}  e raggio 3:\ni punti che distano 3 da {mink:O}.'],
  [13.0, 17.9, 'Distanza da {mink:O}  uguale a 3:\n{mink:√(x² + y² + z²) = 3}.'],
  [18.0, 22.4, 'Al quadrato: {mink:x² + y² + z² = 9}.\nÈ l’{v:equazione della sfera}.'],
  // 2 · il piano sale
  [22.5, 27.0, 'Ecco il piano {mink:z = }{mv:k}: orizzontale,\nad altezza {mv:k}.'],
  [27.1, 31.6, 'Con {mv:k = 0} la taglia lungo\nla circonferenza più grande.'],
  [31.7, 36.4, 'Al posto di {mink:z}  metto {mv:k}:\n{mink:x² + y² = 9 − }{mv:k}{mink:²}.'],
  [36.5, 41.3, 'È una circonferenza, con\nraggio {mink:r = √(9 − }{mv:k}{mink:²)}.'],
  [41.4, 45.6, 'Il piano sale: la circonferenza\nsi {v:stringe}.'],
  [45.7, 50.0, 'A {mv:k = 2}: {mink:r = √5 ≈ }{g:2,24}.'],
  [50.1, 55.0, 'Il triangolo lo conferma:\n{mv:k}{mink:² + r² = 3²}, cioè {mink:4 + 5 = 9}.'],
  [55.1, 59.4, '…e sale ancora, fino a {mv:k = 3}.'],
  [59.5, 64.3, 'Qui {mink:r = √0 = 0}: resta un solo\npunto, {mink:T(0; 0; 3)}.'],
  [64.4, 68.9, 'Il piano {g:sfiora} la sfera in {mink:T}:\nè il piano {g:tangente}.'],
  [69.0, 74.0, 'È perpendicolare al raggio {mink:OT},\ncome la tangente a una circonferenza.'],
  // 3 · oltre
  [76.0, 80.5, 'Più su, con {mv:k = 4}:\n{mink:x² + y² = 9 − 16 = −7}.'],
  [80.6, 85.4, 'Una somma di quadrati non è negativa:\nil piano è {r:esterno}, nessun punto.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Taglia, tocca o resta fuori:\nlo dice il segno di {mink:9 − }{mv:k}{mink:²}.'],
];

// ---------- lo spazio in assonometria (la stessa nei tre video dell'argomento) ----------
// proiezione ortogonale: l'osservatore guarda da 20° fra gli assi x e y, 22° più in alto;
// x viene verso chi guarda (in basso a sinistra), y va a destra, z sale. Una sfera si vede come un cerchio.
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const OX = 640, OY = 500, S = 64;
const pr = (x, y, z) => [OX + S * (x * VR[0] + y * VR[1]), OY - S * (x * VU[0] + y * VU[1] + z * VU[2])];
const p3 = q => pr(q[0], q[1], q[2]);
const add = (a, b, k = 1) => [a[0] + k * b[0], a[1] + k * b[1], a[2] + k * b[2]];
const R0 = 3, LQ = 3.9;                       // raggio della sfera; mezzo lato del pezzo di piano
const DX = [VR[0], VR[1], 0];                 // direzione orizzontale che sullo schermo va a destra

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
function retto3(ctx, V, a, b, al, col, d = .4) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col || C.ink); ctx.lineWidth = 3; ctx.lineJoin = 'round';
  const q1 = p3(add(V, a, d)), q2 = p3(add(add(V, a, d), b, d)), q3 = p3(add(V, b, d));
  ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.lineTo(q3[0], q3[1]); ctx.stroke(); ctx.restore();
}
function etichetta(ctx, s, x, y, size, al = 1, align = 'center') {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 20, x0 = align === 'left' ? x - 10 : align === 'right' ? x - w + 10 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 10); ctx.fill();
  drawRich(ctx, s, x, y, { size, align });
  ctx.restore();
}

// ---------- la sfera, il piano z = k, il taglio ----------
// l'altezza del piano: ferma a 0, 2, 3 e 4 mentre Ada parla di quello stato
const K_KEYS = [[0, 0], [41.6, 0], [44.6, 2], [55.3, 2], [58.3, 3], [74.2, 3], [75.8, 4]];   // a 4 ci arriva prima che Ada ne parli
const altezza = t => kf(t, K_KEYS);
const CO = () => pr(0, 0, 0);
function sferaPiena(ctx) {
  const o = CO(), R = R0 * S;
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(o[0], o[1], R, 0, Math.PI * 2); ctx.fill();
  // luce da sinistra in alto: un'ombra leggera verso il bordo
  const g = ctx.createRadialGradient(o[0] - .38 * R, o[1] - .42 * R, .08 * R, o[0], o[1], 1.04 * R);
  g.addColorStop(0, css(C.x, .04)); g.addColorStop(.7, css(C.x, .16)); g.addColorStop(1, css(C.x, .32));
  ctx.fillStyle = g; ctx.fill();
}
function sfera(ctx, al) {
  if (al <= 0) return;
  const o = CO(), R = R0 * S;
  ctx.save(); ctx.globalAlpha *= al;
  // l'ombra sotto, appena accennata
  const om = pr(0, 0, -3.8);
  ctx.fillStyle = css(C.ink, .05); ctx.beginPath(); ctx.ellipse(om[0], om[1], R * .95, R * .95 * Math.sin(PH), 0, 0, Math.PI * 2); ctx.fill();
  sferaPiena(ctx);
  ctx.strokeStyle = css(C.x, .75); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(o[0], o[1], R, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}
// il taglio a quota k: ellisse di centro pr(0; 0; k), semiassi S·r e S·r·sin PH; la parte visibile va da −β a π + β
function taglio(k) {
  const r = Math.sqrt(Math.max(0, R0 * R0 - k * k)), c = pr(0, 0, k);
  const c0 = r > 1e-6 ? k * Math.sin(PH) / (r * Math.cos(PH)) : 99;
  return { r, c, a: S * r, b: S * r * Math.sin(PH), be: c0 >= 1 ? null : Math.asin(Math.max(-1, c0)) };
}
// la calotta sopra il piano (z ≥ k), vista da davanti: il suo contorno è l'arco visibile del taglio più l'arco della sfera
function calotta(ctx, k) {
  const T = taglio(k), o = CO(), R = R0 * S;
  ctx.beginPath();
  if (T.be === null) { ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, 0, Math.PI * 2); return; }
  ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, -T.be, Math.PI + T.be, false);
  const L = [T.c[0] - T.a * Math.cos(T.be), T.c[1] - T.b * Math.sin(T.be)], Rr = [T.c[0] + T.a * Math.cos(T.be), T.c[1] - T.b * Math.sin(T.be)];
  ctx.arc(o[0], o[1], R, Math.atan2(L[1] - o[1], L[0] - o[0]), Math.atan2(Rr[1] - o[1], Rr[0] - o[0]), false);
  ctx.closePath();
}
function pianoK(ctx, k, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, [pr(LQ, LQ, k), pr(LQ, -LQ, k), pr(-LQ, -LQ, k), pr(-LQ, LQ, k)], css(C.v, .13), css(C.v, .55), 2.5);
  ctx.restore();
}
function circonferenzaTaglio(ctx, k, al) {
  if (al <= 0 || k >= R0) return;
  const T = taglio(k);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(C.y); ctx.lineCap = 'round';
  if (T.be !== null) {
    ctx.lineWidth = 3; ctx.setLineDash([10, 9]);
    ctx.beginPath(); ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, Math.PI + T.be, 2 * Math.PI - T.be, false); ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.lineWidth = 6; ctx.shadowColor = css(C.y, .6); ctx.shadowBlur = 14;
  ctx.beginPath();
  if (T.be === null) ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, 0, Math.PI * 2);
  else ctx.ellipse(T.c[0], T.c[1], T.a, T.b, 0, -T.be, Math.PI + T.be, false);
  ctx.stroke(); ctx.restore();
}
// i semiassi positivi: dentro la sfera tratteggiati (nascosti), fuori pieni; fase 0 = sotto il piano, 1 = sopra
const FINI = [[6.6, 0, 0], [0, 4.8, 0], [0, 0, 4.7]];   // x verso chi guarda: per uscire dalla sfera sullo schermo serve più lungo
function assi(ctx, t, k, kp, fase) {
  const ka = P(t, 7.7, 8.7);
  if (ka <= 0) return;
  ctx.save(); ctx.globalAlpha *= ka * .75;
  FINI.forEach((e, i) => {
    const L = Math.hypot(e[0], e[1], e[2]), u = [e[0] / L, e[1] / L, e[2] / L];
    let pezzi = [[R0, L]];
    // il semiasse z attraversa il piano quando k è fra 3 e 4,7: il pezzo sotto il piano va disegnato prima
    if (i === 2 && kp > 0 && k > R0 && k < L) pezzi = [[R0, k, 0], [k, L, 1]];
    else pezzi = [[R0, L, i < 2 && kp > 0 && k > .05 ? 0 : 1]];
    for (const [a, b, f] of pezzi) {
      if (f !== fase) continue;
      const A2 = p3([u[0] * a, u[1] * a, u[2] * a]), B2 = p3([u[0] * b, u[1] * b, u[2] * b]);
      seg(ctx, A2, B2, C.ink, 3);
      if (b === L) { const ang = Math.atan2(B2[1] - A2[1], B2[0] - A2[0]); arrowHead(ctx, [B2[0] + Math.cos(ang) * 6, B2[1] + Math.sin(ang) * 6], ang, C.ink); }
    }
    if (fase === 1) seg(ctx, CO(), p3([u[0] * R0, u[1] * R0, u[2] * R0]), C.ink, 2.5, 1, .8, [8, 8]);
  });
  if (fase === 1) {
    const ex = p3(FINI[0]), ey = p3(FINI[1]), ez = p3(FINI[2]), o = CO();
    ctx.globalAlpha /= .75;
    // su un fondino: il bordo del piano che sale passa sotto i nomi, non sopra
    etichetta(ctx, '{mx:x}', ex[0] - 26, ex[1] + 20, 44);
    etichetta(ctx, '{my:y}', ey[0] + 32, ey[1] + 2, 44);
    etichetta(ctx, '{mv:z}', ez[0] + 30, ez[1] - 4, 44);
    dot(ctx, o, C.ink, 1, 8);
    etichetta(ctx, '{mink:O}', o[0] + 28, o[1] + 30, 40);   // su un fondino: il bordo del piano che sale ci passa sotto
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il piano che sfiora la sfera', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la sfera e il piano che sale (7.5–FINE)
function sceneSfera(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .5, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 230, 110, 860, 690, P(t, 7.5, 8.2));
  const k = altezza(t), kp = life(t, 22.7, FINE + .2, .8, .5);
  sfera(ctx, P(t, 8.0, 9.0));
  assi(ctx, t, k, kp, 0);
  pianoK(ctx, k, kp);
  // la calotta sopra il piano sta davanti al piano: si ridisegna sopra, ritagliata
  if (kp > 0 && k < R0) {
    ctx.save(); calotta(ctx, k); ctx.clip(); sferaPiena(ctx);
    const o = CO(); ctx.strokeStyle = css(C.x, .75); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(o[0], o[1], R0 * S, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
  circonferenzaTaglio(ctx, k, P(t, 27.3, 28.3) * kp);
  assi(ctx, t, k, kp, 1);
  // il nome del piano, accanto al suo spigolo destro
  const rc = pr(-LQ, LQ, k);
  etichetta(ctx, '{mink:z = }{mv:k}', rc[0] + 14, rc[1] + 30, 40, kp, 'left');
  // il triangolo in piedi a k = 2: altezza k, raggio r, ipotenusa 3
  const kt = life(t, 50.3, 55.2, .6, .4);
  if (kt > 0) {
    const r = Math.sqrt(5), K = [0, 0, 2], Pc = add(K, DX, r), o = CO(), k2 = p3(K), pc = p3(Pc);
    ctx.save(); ctx.globalAlpha *= kt;
    poli(ctx, [o, k2, pc], css(C.g, .14));
    seg(ctx, o, k2, C.v, 6); seg(ctx, k2, pc, C.y, 6); seg(ctx, o, pc, C.g, 5);
    retto3(ctx, K, [0, 0, -1], DX, 1, C.ink);
    etichetta(ctx, '{mv:k}', o[0] - 26, (o[1] + k2[1]) / 2, 40, 1, 'right');
    drawRich(ctx, '{mink:r}', lerp(k2[0], pc[0], .36), k2[1] + 24, { size: 40 });   // senza fondino: sotto passa l'arco del taglio
    etichetta(ctx, '{g:3}', (o[0] + pc[0]) / 2 + 44, (o[1] + pc[1]) / 2 + 34, 40);
    dot(ctx, pc, C.y, 1, 9);
    ctx.restore();
  }
  // T, il punto di tangenza, e il raggio OT perpendicolare al piano
  const kT = life(t, 59.8, 74.3, .4, .4);
  if (kT > 0) {
    const tt = pr(0, 0, R0), o = CO();
    ctx.save(); ctx.globalAlpha *= kT;
    const kr = life(t, 69.2, 74.3, .5, .4);
    if (kr > 0) { ctx.save(); ctx.globalAlpha *= kr; glowStroke(ctx, [o, tt], 1, C.g, 6); retto3(ctx, [0, 0, R0], [0, 0, -1], DX, 1, C.g); ctx.restore(); }
    dot(ctx, tt, C.g, P(t, 59.8, 60.2, E.back), 11);
    etichetta(ctx, '{mink:T(0; 0; 3)}', tt[0] + 26, tt[1] - 34, 40, 1, 'left');
    ctx.restore();
  }
  ctx.restore();
}

// la scheda a destra: l'equazione della sfera, il taglio, i numeri di k e r
function riga(ctx, s, y, size, local) { drawRich(ctx, s, 1485, y, { size, local }); }
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1150, y); ctx.lineTo(1820, y); ctx.stroke(); ctx.restore();
}
const EQS = '{mink:x² + y² + z² = 9}';
function scenePannello(ctx, t) {
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 8.0, FINE + .2, .5, .7);
  card(ctx, 1110, 115, 750, 685, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'la sfera', 1485, 160, { size: 38, weight: 600, local: t - 8.1 }));
  riga(ctx, '{mink:√(x² + y² + z²) = 3}', 225, 44, t - 13.3);
  riga(ctx, EQS, 292, 48, t - 18.4);
  const kb = P(t, 20.0, 20.5);
  if (kb > 0) {
    const w = richW(ctx, EQS, 48) + 48;
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(1485 - w / 2, 254, w, 76, 16); ctx.stroke(); ctx.restore();
  }
  if (t < 22.5) { ctx.restore(); return; }
  separa(ctx, 350, P(t, 22.6, 23.0));
  riga(ctx, 'il piano {mink:z = }{mv:k}', 395, 40, t - 22.8);
  riga(ctx, '{mink:x² + y² = 9 − }{mv:k}{mink:²}', 455, 44, t - 32.0);
  riga(ctx, '{mink:r = √(9 − }{mv:k}{mink:²)}', 515, 44, t - 36.8);
  separa(ctx, 560, P(t, 23.0, 23.4));
  // i numeri: vengono da k arrotondato ai centesimi, come si vede
  const kq = Math.round(altezza(t) * 100) / 100, a1 = P(t, 23.2, 23.7), a2 = P(t, 36.9, 37.4);
  ctx.save(); ctx.globalAlpha *= a1;
  drawRich(ctx, '{mv:k} =', 1250, 610, { size: 44, align: 'left' });
  fixedNum(ctx, fmtN(kq, 2), 1720, 610, 44, C.v);
  ctx.restore();
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    if (kq <= R0) {
      const r = Math.sqrt(R0 * R0 - kq * kq), esatto = Math.abs(r * 100 - Math.round(r * 100)) < 1e-9;
      const ev = life(t, 45.9, 50.0, .3, .4);
      drawRich(ctx, esatto ? '{mink:r} =' : '{mink:r} ≈', 1250, 672, { size: 44, align: 'left' });
      fixedNum(ctx, fmtN(r, 2), 1720, 672, 44, mix(C.y, C.g, ev));
    } else {
      drawRich(ctx, '{mink:r}', 1250, 672, { size: 44, align: 'left' });
      drawRich(ctx, '{r:nessun punto}', 1720, 672, { size: 40, align: 'right' });
    }
    ctx.restore();
  }
  drawRich(ctx, '{mink:x² + y² = 9 − 16 = }{mr:−7}', 1485, 742, { size: 42, local: t - 77.0 });
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Salendo, il piano taglia la sfera in circonferenze\nsempre più piccole, fino a toccarla in un punto.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [490, 430, '{mink:r = √(9 − }{mv:k}{mink:²)}', 40],
    [960, 460, '{mv:k = 3}: piano {g:tangente}', 36],
    [1430, 430, '{mv:k > 3}: {r:nessun punto}', 36],
  ];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza del piano
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7], ['pop', 8.5, .55],                        // gli assi, la sfera
    ['pop', 13.4, .5], ['pop', 18.5, .6], ['ding', 20.0],                             // la distanza, l'equazione
    ['soffio', 22.7], ['pop', 23.3, .3],                                              // il piano z = k, k = 0
    ['traccia', 27.3, 28.3],                                                          // la circonferenza più grande
    ['pop', 32.1, .45], ['pop', 36.9, .5],                                            // x² + y² = 9 − k², r
    ['tono', 41.6, 44.6, [.3, .55]],                                                  // il piano sale a k = 2
    ['pop', 45.9, .6],                                                                // r ≈ 2,24
    ['traccia', 50.3, 51.0],                                                          // il triangolo in piedi
    ['tono', 55.3, 58.3, [.55, .68]],                                                 // fino a k = 3
    ['pop', 59.9, .8], ['ding', 64.6],                                                // T, il piano tangente
    ['traccia', 69.2, 69.8], ['pop', 69.6, .5],                                       // il raggio OT, l'angolo retto
    ['tono', 74.2, 75.8, [.68, .85]], ['pop', 77.2, .3],                              // k = 4, −7
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  // tre fumetti si allungano perché la voce ci stia (31,7–36,4 di 1,4 s; 45,7–50,0 di 0,6; 50,1–55,0 di 2,0):
  // la scena lavora nei tempi «vecchi», il motore riceve quelli «nuovi»
  const MAPPA = [[0, 0], [31.65, 31.65], [36.45, 37.85], [45.65, 47.05], [50.05, 52.05], [55.05, 59.05], [1000, 1004]];
  function converti(t, da, a) {
    for (let i = 1; i < MAPPA.length; i++) {
      const p = MAPPA[i - 1], q = MAPPA[i];
      if (t <= q[da] || i === MAPPA.length - 1) return q[da] === p[da] ? q[a] : p[a] + (t - p[da]) * (q[a] - p[a]) / (q[da] - p[da]);
    }
  }
  const nuovo = t => Math.round(converti(t, 0, 1) * 100) / 100, vecchio = t => converti(t, 1, 0);
  const posa = {}; Object.keys(POSA).forEach(c => { posa[c] = POSA[c].map(([t, v]) => [nuovo(t), v]); });
  const suoni = SUONI.map(x => x[0] === 'traccia' || x[0] === 'tono' ? [x[0], nuovo(x[1]), nuovo(x[2])].concat(x.slice(3)) : [x[0], nuovo(x[1])].concat(x.slice(2)));
  return {
    titolo: 'Il piano che sfiora la sfera', durata: nuovo(DUR), copertina: 4.2, suoni,
    ada: { posa, facce: FACCIA.map(([t, f]) => [nuovo(t), f]), fumetti: FUMETTI.map(([a, b, x]) => [nuovo(a), nuovo(b), x]) },
    capitoli: [[7.5, 22.4, 'la sfera'], [22.4, 74.0, 'il piano sale'], [74.0, FINE - .5, 'oltre la sfera']].map(([a, b, x]) => [nuovo(a), nuovo(b), x]),
    scena(ctx, t) { const v = vecchio(t); sceneIntro(ctx, v); sceneSfera(ctx, v); scenePannello(ctx, v); sceneFine(ctx, v); },
  };
});
