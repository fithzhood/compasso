'use strict';
/* Parallele e perpendicolari — stessa m per le parallele; girare di un angolo retto scambia Δx e Δy
   (con un segno), quindi m₁ · m₂ = −1. Argomento: piano-cartesiano-retta. */
CVIDEO.registra('piano-cartesiano-retta/parallele-perpendicolari', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, drawSeq, fixedNum, fmtN, txt,
    glowStroke, arrowHead, makePlane, card } = M;

const FINE = 98.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [12.2, 'neutro'], [17.6, 'felice'], [19.6, 'neutro'], [22.4, 'felice'], [24.6, 'neutro'],
  [28.0, 'pensa'], [33.9, 'neutro'], [39.4, 'sorpreso'], [41.6, 'neutro'], [44.0, 'festa'], [46.4, 'neutro'],
  [48.2, 'neutro'], [53.2, 'pensa'], [58.7, 'sorpreso'], [60.8, 'neutro'], [64.4, 'neutro'],
  [70.4, 'festa'], [72.8, 'neutro'], [75.4, 'sorpreso'], [77.4, 'felice'], [79.5, 'neutro'], [81.6, 'felice'],
  [85.0, 'pensa'], [88.4, 'sorpreso'], [90.5, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Quando due rette sono\n{v:parallele}? E {v:perpendicolari}?'],
  // 1 · parallele
  [7.9, 11.7, 'Ecco due rette, {mv:r} e {mg:s}.'],
  [11.8, 17.1, 'Pendenze: {mv:m₁} = 2 per {mv:r},\n{mg:m₂} = 2 per {mg:s}.'],
  [17.2, 22.2, 'Un passo a destra:\nsalgono tutte e due di 2.'],
  [22.3, 26.6, 'Non si incontrano mai:\nsono {g:parallele}.'],
  // 2 · perpendicolari
  [27.8, 33.8, 'Ora {mv:r} è {mink:y = 2}{mx:x}. Cerco una\nretta {v:perpendicolare} a {mv:r}.'],
  [33.9, 38.9, 'Il passo di {mv:r}:\n1 a destra, 2 in su.'],
  [39.0, 43.8, 'Giro una copia di {mv:r}, col suo\npasso, di un {v:angolo retto}…'],
  [43.9, 47.8, '…ed ecco {mg:s}, perpendicolare a {mv:r}.'],
  [47.9, 52.9, 'Il passo di {mg:s}:\n2 a sinistra, 1 in su.'],
  [53.0, 58.6, 'Verso sinistra {mx:Δx} è negativo:\n{mx:Δx} = −2 e {my:Δy} = 1.'],
  [58.7, 64.0, '{mx:Δx} e {my:Δy} si sono {v:scambiati},\ne uno ha cambiato segno.'],
  [64.1, 69.7, 'La pendenza di {mg:s} è\n{mg:m₂} = 1 / (−2) = −1/2.'],
  [69.8, 74.6, 'Moltiplico le due pendenze:\n2 · (−1/2) = {g:−1}.'],
  [74.7, 79.4, 'Giro {mv:r}: {mg:s} la segue,\ne il prodotto resta {g:−1}.'],
  [79.5, 84.6, 'Per questo {mg:m₂} = −1 / {mv:m₁}:\nl\'{g:opposto del reciproco}.'],
  // 3 · le verticali
  [84.7, 88.1, 'E se {mv:r} diventa {r:verticale}?'],
  [88.2, 93.3, 'Restano perpendicolari, ma una\nverticale {r:non ha pendenza}.'],
  [93.4, 98.2, 'Quindi {mv:m₁}{mink: · }{mg:m₂}{mink: = −1} vale solo\nse {r:nessuna} delle due è verticale.'],
  // chiusura
  [FINE + 1.0, FINE + 7.7, 'Non verticali: {mv:m₁}{mink: = }{mg:m₂} e distinte,\n{g:parallele}; {mv:m₁}{mink: · }{mg:m₂}{mink: = −1}, {g:perpendicolari}.'],
];

// il piano: stessa unità sui due assi, così l'angolo retto si vede retto
const PL = makePlane({ ox: 665, oy: 560, u: 72, x0: -4.6, x1: 4.6, y0: -2.6, y1: 4.6 });
const CARD = [250, 110, 830, 690];
const G0 = PL.toS(PL.x0, PL.y1), G1 = PL.toS(PL.x1, PL.y0);
const ruota = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
// la parte di y = mx + q dentro la griglia
function tratto(m, q) {
  const u = (PL.y0 - q) / m, v = (PL.y1 - q) / m;
  const a = Math.max(PL.x0, Math.min(u, v)), b = Math.min(PL.x1, Math.max(u, v));
  return [PL.toS(a, m * a + q), PL.toS(b, m * b + q)];
}
// retta per l'origine con direzione ang, tagliata sulla griglia
function rettaAng(ctx, ang, col, al = 1, w = 5, c = [0, 0]) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(G0[0], G0[1], G1[0] - G0[0], G1[1] - G0[1]); ctx.clip();
  const d = [Math.cos(ang) * 9, Math.sin(ang) * 9];
  glowStroke(ctx, [PL.toS(c[0] - d[0], c[1] - d[1]), PL.toS(c[0] + d[0], c[1] + d[1])], 1, col, w);
  ctx.restore();
}
// i numeri degli assi su un fondino di carta, sopra le rette che li attraversano
function numeri(ctx, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
  for (let i = Math.ceil(PL.x0); i <= PL.x1; i++) if (i) {
    const s = lab(i), w = 17 * s.length + 14, p = PL.toS(i, 0);
    ctx.fillRect(p[0] - w / 2, p[1] + 16, w, 32); txt(ctx, s, p[0], p[1] + 32, { size: 29, color: C.dim });
  }
  for (let j = Math.ceil(PL.y0); j <= PL.y1; j++) if (j) {
    const s = lab(j), w = 17 * s.length + 14, p = PL.toS(0, j);
    ctx.fillRect(p[0] - 18 - w, p[1] - 16, w, 32); txt(ctx, s, p[0] - 20, p[1], { size: 29, color: C.dim, align: 'right' });
  }
  ctx.restore();
}
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// etichetta di una retta per l'origine: lungo la retta, un po' di lato (dalla parte del giro antiorario)
function nome(ctx, s, ang, al, c = [0, 0], r = 3.3, lato = 1) {
  if (al <= 0) return;
  const p = [c[0] + r * Math.cos(ang) - lato * .45 * Math.sin(ang), c[1] + r * Math.sin(ang) + lato * .45 * Math.cos(ang)];
  const q = PL.toS(p[0], p[1]);
  drawRich(ctx, s, q[0], q[1], { size: 46, alpha: al });
}
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1180, y); ctx.lineTo(1770, y); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Parallele e perpendicolari', W / 2, 180, { size: 110, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la griglia, per tutto il video
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  ctx.restore();
}

// 1 · parallele (7.5–27.4)
const TR = [[0, 2], [1, 2], [1, 4]], TS = [[2, 1], [3, 1], [3, 3]];
function sceneParallele(ctx, t) {
  if (t < 7.5 || t > 27.6) return;
  const al = 1 - P(t, 26.6, 27.3);
  ctx.save(); ctx.globalAlpha *= al;
  glowStroke(ctx, tratto(2, 2), P(t, 8.3, 9.2, E.out), C.v, 5);
  glowStroke(ctx, tratto(2, -3), P(t, 9.0, 9.9, E.out), C.g, 5);
  drawRich(ctx, '{mv:r}', PL.toS(-2.35, -1.3)[0], PL.toS(-2.35, -1.3)[1], { size: 46, alpha: P(t, 9.3, 9.7) });
  drawRich(ctx, '{mg:s}', PL.toS(3.85, 3.4)[0], PL.toS(3.85, 3.4)[1], { size: 46, alpha: P(t, 10.0, 10.4) });
  // i due passi uguali
  [TR, TS].forEach((T, i) => {
    const a = 17.3 + i * .5;
    const A = PL.toS(...T[0]), B = PL.toS(...T[1]), Cc = PL.toS(...T[2]);
    segmento(ctx, A, B, C.x, P(t, a, a + .5));
    segmento(ctx, B, Cc, C.y, P(t, a + .4, a + .9));
    drawRich(ctx, '{mx:1}', PL.toS(T[0][0] + .5, T[0][1] - .42)[0], PL.toS(0, T[0][1] - .42)[1], { size: 40, alpha: P(t, a + .4, a + .7) });
    drawRich(ctx, '{my:2}', PL.toS(T[1][0] + .28, 0)[0], PL.toS(0, T[1][1] + 1)[1], { size: 40, align: 'left', alpha: P(t, a + .8, a + 1.1) });
  });
  // il riquadro
  const pa = P(t, 9.4, 9.9);
  card(ctx, 1130, 180, 690, 500, pa);
  ctx.globalAlpha *= pa;
  conFont(TITOLI, () => drawRich(ctx, 'due rette', 1475, 242, { size: 40, weight: 600 }));
  drawRich(ctx, '{mv:r}{mink:: y = }{mv:2}{mx:x}{mink: + 2}', 1190, 335, { size: 48, align: 'left', local: t - 9.5 });
  drawRich(ctx, '{mg:s}{mink:: y = }{mg:2}{mx:x}{mink: − 3}', 1190, 420, { size: 48, align: 'left', local: t - 10.1 });
  drawRich(ctx, '{mv:m₁}{mink: = 2}', 1770, 335, { size: 46, align: 'right', local: t - 12.2 });
  drawRich(ctx, '{mg:m₂}{mink: = 2}', 1770, 420, { size: 46, align: 'right', local: t - 13.6 });
  separa(ctx, 480, P(t, 22.3, 22.7));
  drawRich(ctx, '{mv:m₁}{mink: = }{mg:m₂}', 1475, 555, { size: 60, local: t - 22.5 });
  drawRich(ctx, '{g:parallele}', 1475, 630, { size: 40, local: t - 23.0 });
  ctx.restore();
}

// 2 · perpendicolari (27.4–FINE)
const A2 = Math.atan(2);
const TP = [[1, 2], [2, 2], [2, 4]];           // il passo di r: 1 a destra, 2 in su
const giro = t => P(t, 39.4, 41.6) * Math.PI / 2;
const angR = t => kf(t, [[75.4, A2], [76.6, Math.atan(.5)], [77.3, Math.atan(.5)], [78.7, Math.atan(4)], [85.1, Math.atan(4)], [86.7, Math.PI / 2]]);
// mentre r gira (75.4–78.7) il punto d'incontro scivola da O a (1,5; 1,5): così a 85 si vede solo la rotazione
// e da verticali r e s non finiscono sopra gli assi
const SPOSTA = t => P(t, 75.4, 78.7);
const centro = t => [1.5 * SPOSTA(t), 1.5 * SPOSTA(t)];
function scenePerpendicolari(ctx, t) {
  if (t < 27.4 || t > FINE + .3) return;
  const al = life(t, 27.4, FINE + .2, .3, .8);
  ctx.save(); ctx.globalAlpha *= al;
  const a = angR(t), phi = giro(t), c = centro(t);
  // r, disegnata da sinistra a destra la prima volta
  if (t < 29.2) glowStroke(ctx, tratto(2, 0), P(t, 28.0, 29.0, E.out), C.v, 5);
  else rettaAng(ctx, a, C.v, 1, 5, c);
  // la copia che gira e diventa s
  if (phi > 0) rettaAng(ctx, a + phi, mix(C.v, C.g, P(t, 40.6, 41.8)), 1, 5, c);
  // i passi: quello di r, e la sua copia girata
  const tri = life(t, 34.2, 74.9, .3, .3);
  if (tri > 0) {
    ctx.save(); ctx.globalAlpha *= tri;
    const k1 = P(t, 34.2, 34.7), k2 = P(t, 34.6, 35.1);
    const R = TP.map(p => PL.toS(...p));
    segmento(ctx, R[0], R[1], C.x, k1); segmento(ctx, R[1], R[2], C.y, k2);
    if (phi > 0) {
      const sw = P(t, 48.1, 48.9);   // i ruoli si scambiano: l'orizzontale ora è Δx
      const S = TP.map(p => PL.toS(...ruota(p, phi)));
      segmento(ctx, S[0], S[1], mix(C.x, C.y, sw)); segmento(ctx, S[1], S[2], mix(C.y, C.x, sw));
    }
    ctx.restore();
  }
  // numeri sui passi (spenti mentre qualcosa gira)
  const nr = life(t, 34.8, 39.3, .3, .3) + life(t, 44.3, 74.9, .4, .3);
  drawRich(ctx, '{mx:1}', PL.toS(1.5, 0)[0], PL.toS(0, 1.58)[1], { size: 40, alpha: nr });
  drawRich(ctx, '{my:2}', PL.toS(2.28, 0)[0], PL.toS(0, 3)[1], { size: 40, align: 'left', alpha: nr });
  const ns = life(t, 48.2, 74.9, .4, .3);
  drawRich(ctx, '{mx:2}', PL.toS(-3, 0)[0], PL.toS(0, 2.42)[1], { size: 40, alpha: ns });
  drawRich(ctx, '{my:1}', PL.toS(-1.72, 0)[0], PL.toS(0, 1.5)[1], { size: 40, align: 'left', alpha: ns });
  // nomi delle rette
  const viaggio = 1 - life(t, 84.9, 86.8, .2, .3);   // i nomi si spengono mentre le rette si spostano
  nome(ctx, '{mv:r}', a, (life(t, 28.8, 39.2, .4, .3) + P(t, 44.2, 44.6)) * viaggio, c, lerp(3.3, 2.6, SPOSTA(t)));
  // s: sul tratto in basso a destra, lontano dal suo passo
  const ps = PL.toS(c[0] + 2.6 * Math.sin(a) - .45 * Math.cos(a), c[1] - 2.6 * Math.cos(a) - .45 * Math.sin(a));
  drawRich(ctx, '{mg:s}', ps[0], ps[1], { size: 46, alpha: P(t, 44.2, 44.6) * viaggio });
  // l'angolo retto nel punto d'incontro
  const qa = P(t, 43.9, 44.4);
  if (qa > 0) {
    const d = .34, er = [Math.cos(a), Math.sin(a)], es = [-Math.sin(a), Math.cos(a)];
    const pts = [[d * er[0], d * er[1]], [d * (er[0] + es[0]), d * (er[1] + es[1])], [d * es[0], d * es[1]]].map(p => PL.toS(c[0] + p[0], c[1] + p[1]));
    ctx.save(); ctx.globalAlpha *= qa; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(...pts[0]); ctx.lineTo(...pts[1]); ctx.lineTo(...pts[2]); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// il riquadro delle perpendicolari
const CX = 1420, CY = 1545, CM = 1685;   // colonne: Δx, Δy, pendenza
function scenePannello2(ctx, t) {
  if (t < 27.4 || t > FINE + .3) return;
  const al = life(t, 28.4, FINE + .2, .5, .8);
  card(ctx, 1130, 150, 690, 600, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'perpendicolari', 1475, 212, { size: 40, weight: 600 }));
  // A · la tabella dei passi
  const ta = 1 - P(t, 74.8, 75.3);
  if (ta > 0) {
    ctx.save(); ctx.globalAlpha *= ta;
    drawRich(ctx, '{mv:r}{mink:: y = 2}{mx:x}', 1475, 290, { size: 46, local: t - 28.6 });
    const h = P(t, 34.6, 35.0);
    drawRich(ctx, '{mx:Δx}', CX, 380, { size: 36, alpha: h }); drawRich(ctx, '{my:Δy}', CY, 380, { size: 36, alpha: h });
    drawRich(ctx, '{dim:pendenza}', CM, 380, { size: 30, alpha: h });
    // riga di r
    drawRich(ctx, '{mv:r}', 1205, 450, { size: 46, alpha: h });
    fixedNum(ctx, '1', CX + 12, 450, 46, C.x, h); fixedNum(ctx, '2', CY + 12, 450, 46, C.y, h);
    drawRich(ctx, '{mv:m₁}{mink: = 2}', CM, 450, { size: 44, alpha: h });
    // riga di s
    const s1 = P(t, 44.3, 44.7), s2 = P(t, 53.3, 53.7), s3 = P(t, 64.4, 64.8);
    drawRich(ctx, '{mg:s}', 1205, 555, { size: 46, alpha: s1 });
    fixedNum(ctx, '−2', CX + 12, 555, 46, C.x, s2); fixedNum(ctx, '1', CY + 12, 555, 46, C.y, s2);
    if (s3 > 0) drawSeq(ctx, ['{mg:m₂}{mink: = −}', { num: '{mink:1}', den: '{mink:2}' }], CM, 555, 40, { alpha: s3, local: t - 64.4 });
    // lo scambio: due frecce incrociate fra le righe
    const xa = life(t, 58.9, 64.0, .4, .4);
    if (xa > 0) {
      ctx.save(); ctx.globalAlpha *= xa; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
      [[[CX + 10, 482], [CY - 10, 522]], [[CY - 10, 482], [CX + 10, 522]]].forEach(([p, q]) => {
        ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke();
        arrowHead(ctx, q, Math.atan2(q[1] - p[1], q[0] - p[0]), C.v, .8);
      });
      ctx.restore();
    }
    // il prodotto
    separa(ctx, 620, P(t, 70.0, 70.4));
    if (t > 70.1) drawSeq(ctx, ['{mv:m₁}{mink: · }{mg:m₂}{mink: = 2 · (−}', { num: '{mink:1}', den: '{mink:2}' }, '{mink:) = }{g:−1}'], 1475, 685, 42, { local: t - 70.1 });
    ctx.restore();
  }
  // B · r gira: i numeri cambiano, il prodotto no
  const tb = P(t, 75.2, 75.7);
  if (tb > 0) {
    ctx.save(); ctx.globalAlpha *= tb;
    // da 84.7 r va verso la verticale: i numeri si spengono prima che m₁ esploda
    const vb = 1 - P(t, 84.7, 85.0), vc = P(t, 88.4, 88.8);
    const m1 = vb > 0 ? Math.tan(angR(t)) : 1, m2 = -1 / m1;
    const riga = (lab, v, y, col, al) => {
      if (al <= 0) return;
      ctx.save(); ctx.globalAlpha *= al;
      drawRich(ctx, lab, 1230, y, { size: 46, align: 'left' }); fixedNum(ctx, v, 1740, y, 46, col); ctx.restore();
    };
    riga('{mv:m₁}{mink: =}', fmtN(m1, 2), 310, C.v, vb);
    riga('{mg:m₂}{mink: =}', fmtN(m2, 2), 390, C.g, vb);
    riga('{mv:m₁}{mink: · }{mg:m₂}{mink: =}', fmtN(m1 * m2, 2), 470, C.g, vb);
    // r verticale: m₁ non c'è, s orizzontale ha m₂ = 0
    drawRich(ctx, '{mv:m₁}{mink::}', 1230, 310, { size: 46, align: 'left', alpha: vc });
    drawRich(ctx, '{r:non esiste}', 1740, 310, { size: 42, align: 'right', alpha: vc });
    riga('{mg:m₂}{mink: =}', '0', 390, C.g, vc);
    separa(ctx, 545, P(t, 79.7, 80.1));
    const fa = 1 - P(t, 88.2, 88.5);   // con r verticale m₂ = −1/m₁ non si usa più
    if (t > 79.8) drawSeq(ctx, ['{mg:m₂}{mink: = −}', { num: '{mink:1}', den: '{mv:m₁}' }], 1475, 645, 60, { local: t - 79.8, alpha: fa });
    // la condizione: una pillola al posto della formula
    const pk = P(t, 93.6, 94.1, E.back);
    if (pk > 0) {
      ctx.save(); ctx.translate(1475, 645); ctx.scale(pk, pk); ctx.translate(-1475, -645);
      card(ctx, 1170, 578, 610, 134);
      drawRich(ctx, '{mv:m₁}{mink: · }{mg:m₂}{mink: = −1}', 1475, 618, { size: 40 });
      drawRich(ctx, 'vale se nessuna è {r:verticale}', 1475, 674, { size: 34 });
      ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (FINE–FINE + 10.7)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.5, FINE + 9.5);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Parallele: {g:stessa pendenza}, rette distinte.\nPerpendicolari: prodotto delle pendenze {g:−1}.\nSolo se nessuna delle due è {r:verticale}.', W / 2, 300, { size: 58, weight: 600, local: t - FINE - .8, stagger: .07 });
  });
  const pills = [[470, '{mv:m₁}{mink: = }{mg:m₂}\nrette distinte'], [960, '{mv:m₁}{mink: · }{mg:m₂}{mink: = −1}\nnessuna {r:verticale}'], [1450, '{mx:Δx} e {my:Δy} si {v:scambiano}\ne uno cambia segno']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 230, 470, 460, 120);
    drawRich(ctx, s, x, 532, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Parallele e perpendicolari', durata: 109.3, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 27.4, 'parallele'], [27.4, 84.6, 'perpendicolari'], [84.6, FINE, 'e le verticali?']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneParallele(ctx, t); scenePerpendicolari(ctx, t);
      if (t > 7.5 && t < FINE + .3) numeri(ctx, P(t, 8.3, 8.7) * (1 - P(t, FINE - .6, FINE + .2)));
      scenePannello2(ctx, t); sceneFine(ctx, t); },
  };
});
