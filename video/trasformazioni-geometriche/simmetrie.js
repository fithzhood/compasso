'use strict';
/* Due specchi fanno una rotazione — una bandierina (asimmetrica: il drappo sta da una parte dell'asta) riflessa
   prima nella retta r, poi nella retta s, che incontra r in O con un angolo α = 40°: la simmetria la ribalta, la
   seconda la raddrizza, e dalla prima all'ultima si passa con la rotazione di centro O e ampiezza 2α = 80°, nel verso
   da r verso s (con l'ordine scambiato il verso si inverte). Con r e s parallele a distanza d: traslazione di vettore
   perpendicolare alle rette, lungo 2d. Isometria = trasformazione che conserva le distanze.
   Argomento: trasformazioni-geometriche (l'argomento non c'è ancora: sezione «Composizione di isometrie»). */
CVIDEO.registra('trasformazioni-geometriche/simmetrie', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, dot, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['band', 4.6, 'Una {x:bandierina}: il drappo sta\na destra dell’asta.'],
  ['r', 4.6, 'Una retta {mv:r} fa da specchio:\nè l’{v:asse} della simmetria.'],
  ['flip', 5.2, 'Ogni punto passa dall’altra parte,\nalla stessa distanza da {mv:r}.'],
  ['ribalta', 4.6, 'La copia è {r:ribaltata}:\nil drappo ora sta a sinistra.'],
  ['iso', 5.6, 'Le distanze non cambiano: la simmetria\nè un’{v:isometria}.'],
  ['s', 6.0, 'Una seconda retta {mv:s} incontra {mv:r}\nin {mink:O}, con un angolo {mink:α} di 40°.'],
  ['flip2', 4.6, 'Rifletto in {mv:s} la copia\nappena ottenuta.'],
  ['dritta', 5.0, 'Il secondo ribaltamento annulla\nil primo: la bandierina è solo {g:girata}.'],
  ['ruota', 5.6, 'Dalla prima all’ultima si passa con\nuna {g:rotazione} di centro {mink:O}.'],
  ['ampiezza', 5.0, 'L’angolo di rotazione è {g:80°}:\nil {g:doppio} di {mink:α}.'],
  ['verso', 6.0, 'Gira da {mv:r} verso {mv:s}: con l’ordine\nscambiato girerebbe al contrario.'],
  ['paral', 4.2, 'E se le due rette\nsono {v:parallele}?', .4],
  ['pflip1', 3.4, 'Rifletto in {mv:r}…'],
  ['pflip2', 3.4, '…e poi in {mv:s}.'],
  ['trasl', 5.2, 'La bandierina è dritta, solo spostata:\nuna {g:traslazione}.'],
  ['vett', 6.4, 'Va in perpendicolare alle rette,\ndi {g:due volte} la loro distanza {mink:d}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Due specchi, uno dopo l’altro:\nche cosa fanno a una figura?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Due specchi in fila: una {g:rotazione},\no una {g:traslazione} se sono paralleli.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.ribalta, 'sorpreso'], [T.ribalta + 2.2, 'neutro'], [T.dritta, 'felice'], [T.dritta + 2.2, 'neutro'],
  [T.ampiezza + 1.1, 'festa'], [T.verso, 'neutro'], [T.paral, 'pensa'], [T.pflip1, 'neutro'],
  [T.trasl, 'felice'], [T.trasl + 2.4, 'neutro'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const RAD = Math.PI / 180, RQ = [70, 110, 930, 690];
const lab = (ctx, s, x, y, al, size = 44, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// la bandierina: [base, cima dell'asta, punta del drappo, attacco basso del drappo], già in pixel
function bandiera(ctx, pts, col, al = 1, spessa = 0) {
  if (al <= 0) return;
  const [b, c, p, m] = pts;
  ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(p[0], p[1]); ctx.lineTo(m[0], m[1]); ctx.closePath();
  ctx.fillStyle = css(col, .32); ctx.fill(); ctx.strokeStyle = css(col); ctx.lineWidth = 4 + spessa; ctx.stroke();
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.stroke();
  dot(ctx, b, C.ink, 1, 7);
  ctx.restore();
}
function linea(ctx, a, b, col, k = 1, al = 1, w = 4) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function tratteggio(ctx, a, b, col, al, w = 3) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.setLineDash([10, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
// n trattini di uguaglianza a metà del segmento ab (segmenti congruenti)
function tacche(ctx, a, b, n, col, al) {
  if (al <= 0) return;
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 9, cx = mx + ux * o, cy = my + uy * o;
    ctx.beginPath(); ctx.moveTo(cx - uy * 13, cy + ux * 13); ctx.lineTo(cx + uy * 13, cy - ux * 13); ctx.stroke();
  }
  ctx.restore();
}
// arco di centro c (pixel), raggio r, dagli angoli a1 ad a2 (gradi, antiorario), con la punta in fondo se freccia
function arco(ctx, c, r, a1, a2, col, k = 1, al = 1, freccia = false, w = 4) {
  if (k <= 0 || al <= 0) return;
  const fin = a1 + (a2 - a1) * k;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(c[0], c[1], r, -a1 * RAD, -fin * RAD, a2 > a1); ctx.stroke();
  if (freccia) arrowHead(ctx, [c[0] + r * Math.cos(fin * RAD), c[1] - r * Math.sin(fin * RAD)], -(fin + (a2 > a1 ? 90 : -90)) * RAD, col, .9);
  ctx.restore();
}
// la bandierina in piccolo, per la scheda: forma vera (anche ruotata), centrata in (cx, cy)
function icona(ctx, F, cx, cy, sc, col, al) {
  if (al <= 0) return;
  const xs = F.map(p => p[0]), ys = F.map(p => p[1]);
  const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(cx, cy); ctx.scale(sc / 100, sc / 100); ctx.translate(-cx, -cy);
  bandiera(ctx, F.map(p => [cx + (p[0] - mx) * 100, cy - (p[1] - my) * 100]), col);
  ctx.restore();
}
// riflessione «a libro» rispetto alla retta per Q con normale n: a k = 1 il punto è sul suo simmetrico
const ribalta = (p, Q, n, k) => { const d = (p[0] - Q[0]) * n[0] + (p[1] - Q[1]) * n[1]; return [p[0] - 2 * k * d * n[0], p[1] - 2 * k * d * n[1]]; };
const ruota = (p, a) => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];

// 1 · assi che si incontrano: O nell'origine, r verticale, s a 130° (α = 40° da r); 1 unità = 100 px
const O = [520, 660], U = 100, S = p => [O[0] + p[0] * U, O[1] - p[1] * U];
const PHI = 130 * RAD, DS = [Math.cos(PHI), Math.sin(PHI)];
const NR = [1, 0], NS = [-Math.sin(PHI), Math.cos(PHI)], ZERO = [0, 0];
// la bandierina di partenza sta fra 19° e 40° da O: la copia (140°–161°) e l'ultima (99°–120°) non toccano le rette
const F0 = [[2.4, .83], [2.4, 2.0], [3.25, 1.7], [2.4, 1.4]];
const F1 = F0.map(p => ribalta(p, ZERO, NR, 1)), F2 = F1.map(p => ribalta(p, ZERO, NS, 1));
const kFlip1 = t => P(t, T.flip + .3, T.flip + 2.0), kFlip2 = t => P(t, T.flip2 + .3, T.flip2 + 2.0);
const angRot = t => 80 * P(t, T.ruota + .3, T.ruota + 2.8);
function scenaIncidenti(ctx, t) {
  if (t < 7.5 || t > T.paral + .1) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, T.paral - .5, T.paral);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  // le rette
  linea(ctx, S([0, -1.15]), S([0, 5.0]), C.v, P(t, T.r + .2, T.r + 1.0, E.lin));
  lab(ctx, '{mv:r}', O[0] + 28, S([0, 4.85])[1], P(t, T.r + .8, T.r + 1.2), 44, 'left');
  linea(ctx, S([-1.6 * DS[0], -1.6 * DS[1]]), S([6.3 * DS[0], 6.3 * DS[1]]), C.v, P(t, T.s + .2, T.s + 1.0, E.lin));
  const ls = S([6.0 * DS[0] + .4 * NS[0] * -1, 6.0 * DS[1] + .4 * NS[1] * -1]);
  lab(ctx, '{mv:s}', ls[0], ls[1], P(t, T.s + .8, T.s + 1.2));
  // O e l'angolo α fra r e s
  const kO = P(t, T.s + .9, T.s + 1.3, E.back);
  arco(ctx, O, 80, 90, 130, C.v, P(t, T.s + 1.1, T.s + 1.6), 1, false, 3.5);
  lab(ctx, '{mink:α}', S([1.18 * Math.cos(110 * RAD), 1.18 * Math.sin(110 * RAD)])[0], S([0, 1.18 * Math.sin(110 * RAD)])[1], P(t, T.s + 1.4, T.s + 1.8));
  if (kO > 0) dot(ctx, O, C.ink, kO, 8);
  lab(ctx, '{mink:O}', O[0] - 46, O[1] + 22, P(t, T.s + 1.0, T.s + 1.4), 40);
  // la partenza, la prima copia (ribaltata in r), la seconda (ribaltata in s)
  const pR = life(t, T.ribalta + .2, T.ribalta + 4.4, .3, .4), pD = life(t, T.dritta + .2, T.dritta + 4.4, .3, .4);
  bandiera(ctx, F0.map(S), C.x, P(t, 8.2, 8.8), 3 * (pR + pD));
  const k1 = kFlip1(t);
  if (k1 > 0) bandiera(ctx, F0.map(p => S(ribalta(p, ZERO, NR, k1))), mix(C.x, C.y, k1), 1, 3 * pR);
  const k2 = kFlip2(t);
  if (k2 > 0) bandiera(ctx, F1.map(p => S(ribalta(p, ZERO, NS, k2))), mix(C.y, C.g, k2), 1, 3 * pD);
  // la punta passa dall'altra parte, alla stessa distanza da r
  const kp = life(t, T.flip + .3, T.iso + .2, .3, .4);
  if (kp > 0) {
    const a = S(F0[2]), b = S(ribalta(F0[2], ZERO, NR, k1));
    tratteggio(ctx, a, b, C.dim, kp);
    const kt = P(t, T.flip + 2.0, T.flip + 2.4) * kp;
    tacche(ctx, a, [O[0], a[1]], 1, C.ink, kt); tacche(ctx, [O[0], a[1]], b, 1, C.ink, kt);
  }
  // le distanze non cambiano: da base a punta, nella partenza e nella copia
  const ki = life(t, T.iso + .3, T.s + .2, .4, .4);
  if (ki > 0) {
    linea(ctx, S(F0[0]), S(F0[2]), C.g, 1, ki, 4); linea(ctx, S(F1[0]), S(F1[2]), C.g, 1, ki, 4);
    tacche(ctx, S(F0[0]), S(F0[2]), 2, C.g, ki); tacche(ctx, S(F1[0]), S(F1[2]), 2, C.g, ki);
  }
  // la rotazione: una copia della partenza gira intorno a O fino all'ultima
  const kg = life(t, T.ruota + .3, T.ampiezza + .4, .3, .5);
  if (kg > 0) bandiera(ctx, F0.map(p => S(ruota(p, angRot(t) * RAD))), C.g, .55 * kg);
  // l'angolo di rotazione, fra le due punte: raggi tratteggiati solo lontano da O (vicino c'è α)
  const ka = P(t, T.ampiezza + .3, T.ampiezza + 1.3);
  if (ka > 0) {
    const a0 = Math.atan2(F0[2][1], F0[2][0]) / RAD, a1 = a0 + 80;
    for (const g of [a0, a1]) tratteggio(ctx, S([2.3 * Math.cos(g * RAD), 2.3 * Math.sin(g * RAD)]), S([4.25 * Math.cos(g * RAD), 4.25 * Math.sin(g * RAD)]), C.g, .8 * P(t, T.ampiezza + .3, T.ampiezza + .6));
    arco(ctx, O, 410, a0, a1, C.g, ka, 1, true, 4.5);
    const lg = (a0 + 40) * RAD;
    lab(ctx, '{g:80°}', S([4.6 * Math.cos(lg), 4.6 * Math.sin(lg)])[0], S([0, 4.6 * Math.sin(lg)])[1], P(t, T.ampiezza + 1.0, T.ampiezza + 1.4));
  }
  // il verso: da r verso s
  arco(ctx, O, 175, 93, 127, C.v, P(t, T.verso + .3, T.verso + 1.1), 1, true, 4);
  // con l'ordine scambiato: la freccia fantasma nel verso opposto, mentre Ada lo dice
  const kOpp = P(t, T.verso + 2.6, T.verso + 3.4);
  if (kOpp > 0) { ctx.save(); ctx.setLineDash([8, 8]); arco(ctx, O, 228, 127, 93, C.dim, kOpp, .9, true, 3.5); ctx.restore(); }
  ctx.restore();
}

// 2 · assi paralleli: r in x = 0, s in x = d = 1,7; 1 unità = 150 px
const O2 = [411, 420], U2 = 150, D = 1.7, S2 = p => [O2[0] + p[0] * U2, O2[1] - p[1] * U2];
const G0 = [[-1.3, -.6], [-1.3, .57], [-.45, .27], [-1.3, -.03]];
const G1 = G0.map(p => ribalta(p, ZERO, NR, 1)), G2 = G1.map(p => ribalta(p, [D, 0], NR, 1));   // G2 = G0 spostata di 2d = 3,4
const kP1 = t => P(t, T.pflip1 + .3, T.pflip1 + 2.0), kP2 = t => P(t, T.pflip2 + .3, T.pflip2 + 2.0);
function scenaParallele(ctx, t) {
  if (t < T.paral - .5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.paral - .5, T.paral) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, ...RQ);
  linea(ctx, S2([0, -1.85]), S2([0, 1.6]), C.v, P(t, T.paral + .1, T.paral + .8, E.lin));
  linea(ctx, S2([D, -1.85]), S2([D, 1.6]), C.v, P(t, T.paral + .4, T.paral + 1.1, E.lin));
  lab(ctx, '{mv:r}', O2[0], S2([0, 1.6])[1] - 34, P(t, T.paral + .6, T.paral + 1.0));
  lab(ctx, '{mv:s}', S2([D, 0])[0], S2([0, 1.6])[1] - 34, P(t, T.paral + .9, T.paral + 1.3));
  const pT = life(t, T.trasl + .2, T.trasl + 5.0, .3, .4);
  bandiera(ctx, G0.map(S2), C.x, P(t, T.paral, T.paral + .5), 3 * pT);
  const k1 = kP1(t), k2 = kP2(t);
  if (k1 > 0) bandiera(ctx, G0.map(p => S2(ribalta(p, ZERO, NR, k1))), mix(C.x, C.y, k1));
  if (k2 > 0) bandiera(ctx, G1.map(p => S2(ribalta(p, [D, 0], NR, k2))), mix(C.y, C.g, k2), 1, 3 * pT);
  // la traslazione: una copia della partenza scivola fino all'ultima
  const kg = life(t, T.trasl + .3, T.vett + .2, .3, .4);
  if (kg > 0) { const dx = 2 * D * P(t, T.trasl + .3, T.trasl + 2.3); bandiera(ctx, G0.map(p => S2([p[0] + dx, p[1]])), C.g, .55 * kg); }
  // la distanza d fra le rette e il vettore, lungo 2d, perpendicolare alle rette
  const kv = P(t, T.vett + .3, T.vett + 1.3);
  if (kv > 0) {
    const yd = S2([0, 1.22])[1], a = S2([0, 1.22]), b = S2([D, 1.22]);
    ctx.save(); ctx.globalAlpha *= P(t, T.vett + .3, T.vett + .7);
    linea(ctx, [a[0] + 8, yd], [b[0] - 8, yd], C.ink, 1, 1, 3);
    arrowHead(ctx, [a[0] + 4, yd], Math.PI, C.ink, .8); arrowHead(ctx, [b[0] - 4, yd], 0, C.ink, .8);
    drawRich(ctx, '{mink:d}', (a[0] + b[0]) / 2, yd - 34, { size: 44 });
    ctx.restore();
    const yv = S2([0, -1.15])[1], x0 = S2(G0[0])[0], x1 = S2(G2[0])[0], ad = P(t, T.vett + .6, T.vett + 1.0);
    tratteggio(ctx, S2(G0[0]), [x0, yv], C.dim, ad); tratteggio(ctx, S2(G2[0]), [x1, yv], C.dim, ad);
    const kk = P(t, T.vett + .9, T.vett + 2.0);
    if (kk > 0) {
      const xe = lerp(x0, x1, kk);
      linea(ctx, [x0, yv], [xe - 6, yv], C.g, 1, 1, 6);
      arrowHead(ctx, [xe, yv], 0, C.g);
    }
    lab(ctx, '{mg:2d}', O2[0] + D * U2 / 2, yv + 46, P(t, T.vett + 1.8, T.vett + 2.2));
  }
  ctx.restore();
}

// la scheda a destra: le due simmetrie in fila e che cosa ne viene
const XL = 1090, XC = 1450;
function riga(ctx, F, col, testo, y, al) {
  if (al <= 0) return;
  icona(ctx, F, XL + 40, y, 42, col, al);
  drawRich(ctx, testo, XL + 110, y, { size: 36, align: 'left', alpha: al });
}
function scenaScheda(ctx, t) {
  if (t < T.r || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, T.r, T.r + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  const a1 = 1 - P(t, T.paral - .5, T.paral), a2 = P(t, T.paral - .1, T.paral + .4);   // la scheda cambia con le rette
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1 * P(t, T.r, T.r + .5);
    conFont(TITOLI, () => drawRich(ctx, 'due specchi, uno dopo l’altro', XC, 172, { size: 40, weight: 600 }));
    riga(ctx, F0, C.x, '{dim:partenza}', 270, 1);
    riga(ctx, F1, C.y, '{dim:simmetria di asse} {mv:r}', 370, P(t, T.flip + 1.6, T.flip + 2.0));
    riga(ctx, F2, C.g, '{dim:poi simmetria di asse} {mv:s}', 470, P(t, T.flip2 + 1.6, T.flip2 + 2.0));
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 540); ctx.lineTo(1810, 540); ctx.stroke();
    // il riquadro in basso: prima che cos'è un'isometria, poi l'angolo α, poi la rotazione
    const kD = life(t, T.flip + .3, T.iso + .3, .4, .4);   // alla prima riflessione: che cosa fa la simmetria
    lab(ctx, '{v:simmetria di asse} {mv:r}', XC, 610, kD, 42);
    lab(ctx, '{dim:ogni punto va dall’altra parte di} {mv:r}{dim:,}', XC, 672, kD, 32);
    lab(ctx, '{dim:alla stessa distanza}', XC, 718, kD, 32);
    const kI = life(t, T.iso + .3, T.s + .3, .4, .4);
    lab(ctx, '{v:isometria}', XC, 610, kI, 44);
    lab(ctx, '{dim:trasformazione che conserva le distanze}', XC, 675, kI, 32);
    const kA = life(t, T.s + 1.4, T.ruota + .3, .4, .4);
    lab(ctx, '{dim:angolo fra} {mv:r} {dim:e} {mv:s}{mink::  α =} 40°', XC, 640, kA, 40);
    const kR = P(t, T.ruota + .3, T.ruota + .8);
    lab(ctx, '{g:rotazione} {dim:di centro} {mink:O}', XC, 600, kR, 42);
    lab(ctx, '{dim:ampiezza}  {mink:2α =} {g:80°}', XC, 668, P(t, T.ampiezza + 1.0, T.ampiezza + 1.5), 42);
    lab(ctx, '{dim:verso: da} {mv:r} {dim:verso} {mv:s}', XC, 736, P(t, T.verso + .5, T.verso + 1.0), 36);
    ctx.restore();
  }
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    conFont(TITOLI, () => drawRich(ctx, 'due specchi paralleli', XC, 172, { size: 40, weight: 600 }));
    riga(ctx, G0, C.x, '{dim:partenza}', 270, 1);
    riga(ctx, G1, C.y, '{dim:simmetria di asse} {mv:r}', 370, P(t, T.pflip1 + 1.6, T.pflip1 + 2.0));
    riga(ctx, G2, C.g, '{dim:poi simmetria di asse} {mv:s}', 470, P(t, T.pflip2 + 1.6, T.pflip2 + 2.0));
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 540); ctx.lineTo(1810, 540); ctx.stroke();
    const kPar = life(t, T.paral + .5, T.trasl + .3, .4, .4);   // subito: le due rette sono parallele
    lab(ctx, '{dim:assi} {mv:r} {dim:e} {mv:s} {v:paralleli}', XC, 640, kPar, 40);
    lab(ctx, '{g:traslazione}', XC, 600, P(t, T.trasl + .3, T.trasl + .8), 42);
    lab(ctx, '{dim:perpendicolare alle rette}', XC, 668, P(t, T.vett + .5, T.vett + 1.0), 36);
    lab(ctx, '{dim:lunga}  {mg:2d}', XC, 736, P(t, T.vett + 1.8, T.vett + 2.2), 42);
    ctx.restore();
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function scenaIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Due specchi fanno una rotazione', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 3 · in una frase (FINE–DUR)
function scenaFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Due simmetrie assiali in fila fanno una rotazione,\no una traslazione se gli assi sono paralleli.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'assi che si incontrano', '{g:rotazione} {dim:di} {mink:2α}'], [960, 'assi paralleli', '{g:traslazione} {dim:di} {mink:2d}'], [1450, 'due ribaltamenti', '{g:niente più ribaltamento}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 32, weight: 400 });
    drawRich(ctx, s, x, 548, { size: i === 2 ? 32 : 38 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): mentre la copia gira intorno a O, il tono segue l'altezza della punta
  const altRot = a => +(.25 + .7 * Math.sin((27.6 + a) * RAD)).toFixed(2);
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['pop', 8.3, .5],                                          // la bandierina
    ['soffio', T.r], ['traccia', T.r + .2, T.r + 1.0],                                           // la retta r
    ['tono', T.flip + .3, T.flip + 2.0, [.5, .45, .4, .45, .5]], ['pop', T.flip + 2.1, .5],       // la copia si ribalta in r
    ['pop', T.ribalta + .3, .4],
    ['traccia', T.iso + .3, T.iso + .8], ['pop', T.iso + .5, .6],                                // le distanze uguali
    ['traccia', T.s + .2, T.s + 1.0], ['pop', T.s + 1.0, .5], ['pop', T.s + 1.5, .6],             // s, O, α
    ['tono', T.flip2 + .3, T.flip2 + 2.0, [.4, .5, .6, .65, .7]], ['pop', T.flip2 + 2.1, .7],     // la copia si ribalta in s
    ['pop', T.dritta + .3, .6],
    ['tono', T.ruota + .3, T.ruota + 2.8, [0, 20, 40, 60, 80].map(altRot)],                       // la rotazione di 80°
    ['traccia', T.ampiezza + .3, T.ampiezza + 1.3], ['ding', T.ampiezza + 1.1],                   // 80°, il doppio di α
    ['traccia', T.verso + .3, T.verso + 1.1],
    ['soffio', T.paral - .3], ['traccia', T.paral + .1, T.paral + 1.1],                           // le rette parallele
    ['tono', T.pflip1 + .3, T.pflip1 + 2.0, [.45, .5, .55]], ['pop', T.pflip1 + 2.1, .5],
    ['tono', T.pflip2 + .3, T.pflip2 + 2.0, [.55, .6, .65]], ['pop', T.pflip2 + 2.1, .7],
    ['tono', T.trasl + .3, T.trasl + 2.3, [.4, .55, .7]],                                        // la traslazione
    ['pop', T.vett + .4, .5], ['traccia', T.vett + .9, T.vett + 2.0], ['ding', T.vett + 2.0],      // d, il vettore lungo 2d
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Due specchi fanno una rotazione', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.s - .1, 'una simmetria'], [T.s - .1, T.paral - .2, 'assi che si incontrano'], [T.paral - .2, FINE, 'assi paralleli']],
    scena(ctx, t) { scenaIntro(ctx, t); scenaIncidenti(ctx, t); scenaParallele(ctx, t); scenaScheda(ctx, t); scenaFine(ctx, t); },
  };
});
