'use strict';
/* Affettare un solido — una piramide di altezza 3 e lato di base 3: tagliata a distanza x dal vertice dà un quadrato
   di lato x, area A(x) = x²; le fette x² · Δx sommate (6, 12, 30 fette: ≈ 11,4, 10,2, 9,5) diventano V = ∫₀³ x² dx = 9,
   proprio 1/3 · 9 · 3. Le fette si impilano mentre l'integrale cresce. Argomento: integrali. */
CVIDEO.registra('integrali/volumi-sezioni', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, richW, drawSeq, fixedNum, fmtN,
    dot, glowStroke, arrowHead, card } = M;

const FINE = 79.6, DUR = 90.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [16.9, 'sorpreso'], [19.0, 'neutro'], [26.1, 'felice'], [28.2, 'neutro'], [45.8, 'pensa'], [48.0, 'neutro'],
  [50.4, 'felice'], [52.5, 'neutro'], [61.0, 'sorpreso'], [63.2, 'neutro'], [70.6, 'pensa'], [75.4, 'festa'],
  [FINE, 'neutro'], [81.8, 'felice'], [86.6, 'occhiolino'],
];
// una frase per ogni cosa che succede; il taglio sta fermo mentre Ada ne parla
const FUMETTI = [
  [2.4, 6.4, 'Si può calcolare un volume\ntagliando il solido a fette?'],
  // 1 · la sezione
  [7.8, 12.1, 'Una piramide a base quadrata:\nlato di base 3, altezza 3.'],
  [12.3, 16.7, 'Metto l’asse {mx:x} lungo l’altezza:\n0 nel vertice, 3 nella base.'],
  [16.9, 20.9, 'Taglio in {mx:x}{mink: = 2}: la sezione\nè un {v:quadrato}.'],
  [21.1, 25.9, 'Base e altezza sono uguali, così\nil lato è {mx:x}: qui 2.'],
  [26.1, 30.6, 'La sua area è {mv:A(}{mx:x}{mv:) = }{mx:x}{mv:²}:\nin {mx:x}{mink: = 2} vale 4.'],
  // 2 · le fette
  [30.8, 35.2, 'Ora una fetta sottile, spessa {mink:Δ}{mx:x}:\nè quasi un prisma.'],
  [35.4, 40.2, 'Il suo volume è circa area\nper spessore: {mx:x}{mink:² · Δ}{mx:x}.'],
  [40.4, 45.6, 'La piramide è fatta di tante fette:\nil volume è circa la loro {v:somma}.'],
  [45.8, 50.2, 'Con fette più sottili la somma\nsi avvicina al volume vero.'],
  [50.4, 55.0, 'Al limite la somma diventa\nun {v:integrale}: {mink:V = ∫₀³ }{mx:x}{mink:² d}{mx:x}.'],
  // 3 · l'integrale
  [55.4, 60.8, 'Faccio crescere {mx:x} da 0 a 3: le fette\nsi impilano e il volume cresce.'],
  [61.0, 65.4, 'In {mx:x}{mink: = 3} il volume è {g:9}:\nl’area sotto {mv:A(}{mx:x}{mv:)}.'],
  [65.6, 70.4, 'Infatti una primitiva di {mx:x}{mink:²} è\n{mx:x}{mink:³/3}: {mink:27/3 − 0 = }{mg:9}.'],
  [70.6, 75.2, 'E la formula della piramide? Area\ndi base per altezza, diviso 3:'],
  [75.4, 79.0, '{mink:9 · 3 / 3 = }{mg:9}. Torna!'],
  // chiusura
  [81.8, 88.0, 'Affetto, sommo le fette, passo al\nlimite: il volume è un integrale.'],
];

// ---------- la piramide in assonometria ----------
// X lungo l'asse (vertice in 0, base in 3), Y in profondità, Z in alto; a distanza X la sezione è un quadrato di lato X
const TH = 30 * Math.PI / 180, PH = 18 * Math.PI / 180;
const VR = [Math.cos(TH), Math.sin(TH), 0];
const VC = [Math.sin(TH) * Math.cos(PH), -Math.cos(TH) * Math.cos(PH), Math.sin(PH)];
const VU = [VC[1] * VR[2] - VC[2] * VR[1], VC[2] * VR[0] - VC[0] * VR[2], VC[0] * VR[1] - VC[1] * VR[0]];
const OX = 330, OY = 380, SC = 165;
const pr = (X, Y, Z) => [OX + SC * (X * VR[0] + Y * VR[1] + Z * VR[2]), OY - SC * (X * VU[0] + Y * VU[1] + Z * VU[2])];
// i quattro vertici della sezione in X (lato s): dietro-basso, davanti-basso, davanti-alto, dietro-alto
const quadr = (X, s) => { const h = s / 2; return [pr(X, h, -h), pr(X, -h, -h), pr(X, -h, h), pr(X, h, h)]; };
function poli(ctx, pts, fill, stroke, w = 2) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
function seg(ctx, a, b, col, w, al = 1, trat) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (trat) ctx.setLineDash(trat);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
// le facce che si vedono del pezzo di piramide da 0 a x: davanti, sopra e il taglio
function pieno(ctx, x, al, colTaglio) {
  if (al <= 0 || x <= 0.001) return;
  const A = pr(0, 0, 0), q = quadr(x, x);
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, [A, q[1], q[2]], css(C.y, .16));
  poli(ctx, [A, q[2], q[3]], css(C.y, .26));
  poli(ctx, q, css(colTaglio || C.y, .22), css(colTaglio || C.y, .9), 3);
  ctx.restore();
}
// gli spigoli della piramide intera; quello dietro in basso è nascosto (tratteggiato)
function spigoli(ctx, k, al = 1) {
  if (k <= 0 || al <= 0) return;
  const A = pr(0, 0, 0), q = quadr(3, 3);
  ctx.save(); ctx.globalAlpha *= al;
  const lato = (p, w, trat) => seg(ctx, A, [lerp(A[0], p[0], k), lerp(A[1], p[1], k)], trat ? C.dim : C.ink, w, trat ? .7 : .85, trat);
  lato(q[0], 2, [8, 8]); lato(q[1], 3); lato(q[2], 3); lato(q[3], 3);
  const kb = P(k, .6, 1);
  if (kb > 0) for (let i = 0; i < 4; i++) seg(ctx, q[i], q[(i + 1) % 4], C.ink, 3, .85 * kb);
  ctx.restore();
}
// una fetta come scatola da a a b con lato s: facce davanti, sopra, destra
function scatola(ctx, a, b, s, col, al, d = 1) {   // d < 1: fette fitte, colori più leggeri
  if (al <= 0) return;
  const h = s / 2;
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, [pr(a, -h, -h), pr(b, -h, -h), pr(b, -h, h), pr(a, -h, h)], css(col, .2 * d), css(col, .85), d < 1 ? 1 : 1.5);
  poli(ctx, [pr(a, -h, h), pr(b, -h, h), pr(b, h, h), pr(a, h, h)], css(col, .32 * d), css(col, .85), d < 1 ? 1 : 1.5);
  poli(ctx, quadr(b, s), css(col, .26 * d), css(col, .85 * (d < 1 ? .6 : 1)), d < 1 ? 1 : 1.5);
  ctx.restore();
}
// l'asse x: dentro la piramide tratteggiato, fuori pieno, con le tacche 0…3 sotto
function asse(ctx, k, kNum) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  seg(ctx, pr(0, 0, 0), pr(3, 0, 0), C.x, 2.5, .9, [7, 7]);
  seg(ctx, pr(-.5, 0, 0), pr(0, 0, 0), C.x, 3.5);
  const e = pr(4.3, 0, 0);
  seg(ctx, pr(3, 0, 0), e, C.x, 3.5);
  arrowHead(ctx, [e[0] + 5, e[1] + 1], Math.atan2(VU[0] * -1, VR[0]), C.x);
  drawRich(ctx, '{mx:x}', e[0] + 30, e[1] + 8, { size: 44 });
  ctx.globalAlpha *= kNum;
  for (let i = 0; i <= 3; i++) {
    const p = pr(i, 0, 0);
    dot(ctx, p, C.x, 1, 6);
    ctx.save(); ctx.fillStyle = css(C.paper, .85); ctx.beginPath(); ctx.roundRect(p[0] - 18, p[1] + 20, 36, 40, 8); ctx.fill(); ctx.restore();
    txt(ctx, String(i), p[0], p[1] + 40, { size: 34, weight: 600, color: C.x });
  }
  ctx.restore();
}

// ∫ grande (il glifo di KaTeX allungato in verticale) con gli estremi piccoli, poi il corpo (come in integrali/calcolo)
const SY = 1.75, KM = '"KaTeX_Main", Cambria, serif';
function intMisure(ctx, a, b, corpo, size) {
  ctx.font = `${Math.round(size * 1.25)}px ${KM}`; ctx.textBaseline = 'middle';
  const m = ctx.measureText('∫'), l = m.actualBoundingBoxLeft, r = m.actualBoundingBoxRight;
  const ls = Math.max(30, Math.round(size * .48)), top = m.actualBoundingBoxAscent * SY, bot = m.actualBoundingBoxDescent * SY;
  const xb = l + r + size * .08, xa = (l + r) * .62 + size * .06;
  const xc = Math.max(xb + richW(ctx, b, ls), xa + richW(ctx, a, ls)) + size * .22;
  return { l, r, ls, top, bot, xb, xa, xc, w: xc + richW(ctx, corpo, size) };
}
function drawInt(ctx, a, b, corpo, x0, y, size, al) {
  if (al <= 0.002) return;
  const m = intMisure(ctx, a, b, corpo, size);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.save(); ctx.translate(x0 + m.l, y); ctx.scale(1, SY);
  ctx.font = `${Math.round(size * 1.25)}px ${KM}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillStyle = css(C.ink); ctx.fillText('∫', 0, 0);
  ctx.restore();
  drawRich(ctx, b, x0 + m.xb, y - m.top + m.ls * .45, { size: m.ls, align: 'left' });
  drawRich(ctx, a, x0 + m.xa, y + m.bot - m.ls * .3, { size: m.ls, align: 'left' });
  drawRich(ctx, corpo, x0 + m.xc, y, { size, align: 'left' });
  ctx.restore();
}
// prima + ∫ + dopo, centrato in cx; local fa entrare le tre parti una dopo l'altra
function rigaInt(ctx, prima, a, b, corpo, dopo, cx, y, size, local, al = 1) {
  const w0 = richW(ctx, prima, size), mi = intMisure(ctx, a, b, corpo, size), x0 = cx - (w0 + mi.w + richW(ctx, dopo, size)) / 2;
  drawRich(ctx, prima, x0, y, { size, align: 'left', local, alpha: al });
  drawInt(ctx, a, b, corpo, x0 + w0, y, size, al * P(local, .2, .7, E.out));
  drawRich(ctx, dopo, x0 + w0 + mi.w, y, { size, align: 'left', local: local - .6, alpha: al });
}

const LC = [150, 110, 880, 690], RC = [1090, 110, 770, 690], XR = 1475;
// le fette: n scatole da 0 a 3, ognuna col lato del suo estremo destro (contengono la piramide)
const STADI = [[6, 40.6, 46.0], [12, 46.0, 47.8], [30, 47.8, 50.8]];
const xs = t => 3 * P(t, 55.6, 60.6);        // il taglio che scorre da 0 a 3

// 0 · titolo
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Affettare un solido', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1–3 · la piramide (a sinistra)
function scenePiramide(ctx, t) {
  if (t < 7.5 || t > FINE + .4) return;
  const al = life(t, 7.5, FINE + .3, .5, .6);
  card(ctx, ...LC, al);
  ctx.save(); ctx.globalAlpha *= al;
  const ke = P(t, 8.0, 9.6);
  // le facce piene: la piramide intera, poi solo il pezzo da 0 al taglio che scorre
  const kSc = life(t, 40.4, 51.0, .5, .6);                    // mentre ci sono le scatole, la piramide si fa trasparente
  const kPieno = P(t, 9.2, 9.8) * (1 - P(t, 55.0, 55.5)) * (1 - .85 * kSc);
  if (t < 55.6) pieno(ctx, 3, kPieno);
  asse(ctx, P(t, 12.5, 13.3), P(t, 13.2, 13.7) * (1 - .6 * kSc));
  // il taglio in x = 2 (1) e la fetta spessa Δx (2)
  const kq = life(t, 17.0, 31.4, .5, .4);
  if (kq > 0) {
    ctx.save(); ctx.globalAlpha *= kq;
    poli(ctx, quadr(2, 2), css(C.v, .28), css(C.v), 4);
    ctx.restore();
    // il lato: lo spigolo in alto della sezione si accende, e il nome sta sopra la piramide (lì non passa nessuno spigolo)
    const kl = life(t, 21.3, 31.0, .4, .4);
    if (kl > 0) {
      seg(ctx, pr(2, -1, 1), pr(2, 1, 1), C.v, 8, kl);
      const m = pr(2, 0, 1);
      drawRich(ctx, '{v:lato 2}', m[0] - 10, m[1] - 62, { size: 40, alpha: kl });
    }
  }
  const kf6 = life(t, 31.0, 41.0, .5, .6);
  if (kf6 > 0) {
    const sp = .25 * P(t, 31.0, 31.8);
    scatola(ctx, 2, 2 + Math.max(sp, .01), 2, C.v, kf6);
    const p = pr(2.12, 0, 1);
    ctx.save(); ctx.globalAlpha *= kf6 * P(t, 31.6, 32.0); ctx.fillStyle = css(C.paper, .88); ctx.beginPath(); ctx.roundRect(p[0] - 44, p[1] - 76, 88, 50, 10); ctx.fill(); ctx.restore();
    drawRich(ctx, '{mink:Δ}{mx:x}', p[0], p[1] - 50, { size: 40, alpha: kf6 * P(t, 31.6, 32.0) });
  }
  // 2 · tante fette, sempre più sottili
  STADI.forEach(([n, a, b], j) => {
    const k = j === 2 ? life(t, a, b, .6, .6) : life(t, a, b + .3, .6, .6);
    if (k <= 0) return;
    const h = 3 / n;
    for (let i = 1; i <= n; i++) {
      const ki = j === 0 ? P(t, a + (i - 1) * .2, a + (i - 1) * .2 + .35) : 1;
      scatola(ctx, (i - 1) * h, i * h, i * h, C.v, k * ki, [1, .5, .2][j]);
    }
  });
  // 3 · il taglio scorre: il pezzo già passato si riempie, fetta su fetta
  if (t > 55.0) {
    const x = xs(t), k3 = P(t, 55.0, 55.5);
    ctx.save(); ctx.globalAlpha *= k3;
    pieno(ctx, x, 1, C.v);
    ctx.save(); ctx.globalAlpha *= .5;
    for (let u = .25; u < x - .02; u += .25) poli(ctx, quadr(u, u), null, css(C.y, .8), 1.5);
    ctx.restore();
    ctx.restore();
    asse(ctx, 1, 1);                         // i numeri dell'asse sopra il pezzo pieno e la sezione viola
  }
  {
  }
  spigoli(ctx, ke, 1 - .5 * kSc);
  // il lato di base, accanto allo spigolo verticale di destra
  drawRich(ctx, '{mink:3}', pr(3, 1.5, 0)[0] + 30, pr(3, 1.5, 0)[1], { size: 44, alpha: P(t, 8.8, 9.3) * (1 - P(t, 30.6, 31.0)) });
  ctx.restore();
}

// 1–2 · la scheda a destra: i dati, la sezione, la fetta, le somme, l'integrale
const SOMME = [[40.8, '6', '≈ 11,4'], [46.1, '12', '≈ 10,2'], [47.9, '30', '≈ 9,5']];
function riga(ctx, s, y, size, local, al = 1) { drawRich(ctx, s, XR, y, { size, local, alpha: al }); }
function sceneScheda(ctx, t) {
  const ca = life(t, 8.2, 55.4, .5, .5);
  if (ca <= 0) return;
  card(ctx, ...RC, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  // 1 · la piramide e la sezione
  const a1 = 1 - P(t, 30.6, 31.1);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'la piramide', XR, 170, { size: 40, weight: 600, local: t - 8.3 }));
    riga(ctx, '{dim:lato di base} {mink:3}', 255, 44, t - 8.6);
    riga(ctx, '{dim:altezza} {mink:3}', 320, 44, t - 9.0);
    if (t > 17.0) { ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1130, 372); ctx.lineTo(1820, 372); ctx.stroke(); }
    riga(ctx, '{dim:taglio in} {mx:x}{mink: = 2}', 430, 44, t - 17.1);
    riga(ctx, '{dim:sezione: quadrato di lato} {mink:2}', 500, 40, t - 21.4);
    riga(ctx, '{mv:A(}{mx:x}{mv:) = }{mx:x}{mv:²}', 600, 60, t - 26.3);
    riga(ctx, '{mv:A(2) = 4}', 690, 44, t - 27.6);
    ctx.restore();
  }
  // 2 · la fetta e le somme
  const a2 = P(t, 30.9, 31.4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, 'una fetta', XR, 170, { size: 40, weight: 600, local: t - 31.0 }));
    riga(ctx, '{dim:spessore} {mink:Δ}{mx:x}', 245, 44, t - 31.4);
    riga(ctx, '{dim:volume} {mink:≈ }{mv:A(}{mx:x}{mv:)}{mink: · Δ}{mx:x}{mink: = }{mx:x}{mink:² · Δ}{mx:x}', 320, 44, t - 35.6);
    if (t > 40.6) {
      ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1130, 375); ctx.lineTo(1820, 375); ctx.stroke();
      drawRich(ctx, '{dim:fette}', 1290, 418, { size: 32 }); drawRich(ctx, '{dim:somma dei volumi}', 1630, 418, { size: 32 });
    }
    SOMME.forEach(([a, n, v], i) => {
      const k = P(t, a, a + .45, E.out); if (k <= 0) return;
      txt(ctx, n, 1290, 476 + i * 58, { size: 44, color: C.v, alpha: k });
      txt(ctx, v, 1630, 476 + i * 58, { size: 44, alpha: k });
    });
    rigaInt(ctx, '{mink:V =}  ', '{mink:0}', '{mink:3}', '{mx:x}{mink:² d}{mx:x}', '', XR, 700, 56, t - 50.6);
    ctx.restore();
  }
  ctx.restore();
}

// 3 · il grafico di A(x): l'area sotto la curva cresce insieme al volume
const GO = [1190, 705], GX = 170, GY = 42;
const G = (x, y) => [GO[0] + x * GX, GO[1] - y * GY];
function sceneArea(ctx, t) {
  const ca = life(t, 55.0, FINE + .3, .5, .6);
  if (ca <= 0) return;
  card(ctx, ...RC, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const x = xs(t);
  // in alto: il volume fin qui, poi il calcolo con la primitiva
  const kc = 1 - P(t, 65.6, 66.0);
  drawRich(ctx, '{dim:volume da 0 a }{mx:x}', XR, 165, { size: 34, alpha: kc });
  fixedNum(ctx, fmtN(x * x * x / 3, 2), XR + 70, 225, 52, x > 2.999 ? C.g : C.ink, kc);
  rigaInt(ctx, '{mink:V =}  ', '{mink:0}', '{mink:3}', '{mx:x}{mink:² d}{mx:x}', '{mink: = 27/3 − 0 = }{mg:9}', XR, 205, 48, t - 66.0);
  // il grafico, finché arriva la formula della piramide
  const kg = 1 - P(t, 70.4, 70.9);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg;
    // area sotto la curva da 0 a x
    if (x > .005) {
      ctx.fillStyle = css(C.g, .28); ctx.beginPath(); ctx.moveTo(...G(0, 0));
      for (let i = 0; i <= 60; i++) { const u = x * i / 60; ctx.lineTo(...G(u, u * u)); }
      ctx.lineTo(...G(x, 0)); ctx.closePath(); ctx.fill();
      seg(ctx, G(x, 0), G(x, x * x), C.v, 4);
    }
    // assi
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(...G(-.1, 0)); ctx.lineTo(...G(3.45, 0)); ctx.moveTo(...G(0, -.3)); ctx.lineTo(...G(0, 10.2)); ctx.stroke();
    arrowHead(ctx, [G(3.45, 0)[0] + 6, GO[1]], 0, C.ink); arrowHead(ctx, [GO[0], G(0, 10.2)[1] - 6], -Math.PI / 2, C.ink);
    drawRich(ctx, '{mx:x}', G(3.45, 0)[0] + 32, GO[1], { size: 44 });
    for (let i = 1; i <= 3; i++) txt(ctx, String(i), G(i, 0)[0], GO[1] + 32, { size: 30, color: C.dim });
    for (const j of [3, 6, 9]) { seg(ctx, G(0, j), G(3.2, j), C.grid, 1.5); txt(ctx, String(j), GO[0] - 18, G(0, j)[1], { size: 30, color: C.dim, align: 'right' }); }
    glowStroke(ctx, (() => { const p = []; for (let i = 0; i <= 80; i++) { const u = 3.15 * i / 80; p.push(G(u, u * u)); } return p; })(), P(t, 55.6, 56.4), C.v, 5);
    drawRich(ctx, '{mv:A(}{mx:x}{mv:) = }{mx:x}{mv:²}', 1230, 392, { size: 44, align: 'left', alpha: P(t, 56.2, 56.6) });
    ctx.restore();
  }
  // la formula della piramide
  const fr13 = { num: '{mink:1}', den: '{mink:3}' };
  drawSeq(ctx, ['{mink:V =}', fr13, '{mink:· }{dim:area di base}{mink: · }{dim:altezza}'], XR, 440, 42, { local: t - 70.9 });
  drawSeq(ctx, ['{mink:V =}', fr13, '{mink:· 9 · 3 = }{mg:9}'], XR, 600, 58, { local: t - 75.5 });
  ctx.restore();
}

// chiusura
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il volume è l’integrale\ndell’area delle sezioni.', W / 2, 265, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  rigaInt(ctx, '{mink:V =}  ', '{mink:0}', '{mink:3}', '{mv:A(}{mx:x}{mv:)}{mink: d}{mx:x}', '', W / 2, 425, 52, t - FINE - 1.8);
  const pills = [[400, '{dim:la sezione}'], [960, '{dim:la fetta}'], [1520, '{dim:la piramide}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 580); ctx.scale(k, k); ctx.translate(-x, -580);
    card(ctx, x - 250, 505, 500, 150);
    drawRich(ctx, testa, x, 540, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mv:A(}{mx:x}{mv:) = }{mx:x}{mv:²}', x, 602, { size: 46 });
    if (i === 1) drawRich(ctx, '{mink:≈ }{mv:A(}{mx:x}{mv:)}{mink: · Δ}{mx:x}', x, 602, { size: 46 });
    if (i === 2) drawSeq(ctx, ['{mink:V = 9 =}', { num: '{mink:1}', den: '{mink:3}' }, '{mink:· 9 · 3}'], x, 602, 40);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il volume che cresce sale come x³; il ding di «Torna!» lo mette la faccia «festa»
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 8.0, 9.6], ['soffio', 8.2],                          // la piramide e la scheda
    ['pop', 8.6, .4], ['pop', 9.0, .5],                                               // lato 3, altezza 3
    ['traccia', 12.5, 13.3], ['pop', 13.3, .4],                                       // l'asse x, da 0 a 3
    ['pop', 17.1, .6], ['pop', 21.4, .5],                                             // il taglio in x = 2, lato 2
    ['pop', 26.3, .6], ['ding', 27.7],                                                // A(x) = x², A(2) = 4
    ['soffio', 30.9], ['tono', 31.0, 31.8, [.4, .5]], ['pop', 35.7, .5],              // la fetta spessa Δx; x² · Δx
    ['pop', 40.7, .2], ['pop', 41.1, .3], ['pop', 41.5, .4], ['pop', 41.9, .5], ['pop', 42.3, .6], ['pop', 42.7, .7],   // sei fette
    ['pop', 40.9, .5], ['tono', 46.1, 48.4, [.75, .6, .5]],                           // le somme scendono verso 9
    ['ding', 50.8],                                                                   // V = ∫₀³ x² dx
    ['soffio', 55.0], ['traccia', 55.6, 56.4],                                        // il grafico di A(x)
    ['tono', 55.6, 60.6, [0, .01, .04, .12, .3, .55, .9]],                            // il volume cresce come x³/3
    ['ding', 61.2], ['pop', 66.0, .6], ['ding', 67.0],                                // 9; la primitiva: 27/3 − 0 = 9
    ['soffio', 70.5], ['pop', 71.0, .5], ['pop', 75.6, .7],                           // la formula della piramide
    ['soffio', FINE + .4], ['pop', FINE + 2.5, .5], ['pop', FINE + 3.0, .6], ['pop', FINE + 3.5, .7],
  ];
  return {
    titolo: 'Affettare un solido', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 30.7, 'la sezione'], [30.7, 55.2, 'le fette'], [55.2, FINE, 'l’integrale']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiramide(ctx, t); sceneScheda(ctx, t); sceneArea(ctx, t); sceneFine(ctx, t); },
  };
});
