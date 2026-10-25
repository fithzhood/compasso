'use strict';
/* Da che parte della retta — la disequazione y > 2x − 1: si disegna la retta y = 2x − 1, tratteggiata perché il
   segno è stretto (con ≥ sarebbe continua); il punto di prova (0; 0) dà 0 > −1, vero, quindi le soluzioni sono il
   semipiano sopra la retta, quello che contiene l'origine; controprova con (2; 0): 0 > 3, falso. Poi il sistema con
   y < −x + 4 (prova: 0 < 4, vero, semipiano sotto): le soluzioni sono l'intersezione dei due semipiani; le rette si
   incontrano in (5/3; 7/3), punto escluso. Argomento: piano-cartesiano-retta (sezione «Intersezione fra due rette»). */
CVIDEO.registra('piano-cartesiano-retta/semipiano', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, drawSeq, txt, dot, hole, arrowHead, card, crossMark, checkMark } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['diseq', 6.6, '{mink:y > 2x − 1}: una disequazione\nin due incognite, {mx:x} e {my:y}.'],
  ['retta', 6.3, 'Prima la retta {mink:y = 2x − 1}:\nc’è l’uguale al posto del maggiore.'],
  ['tratto', 5.6, 'Il {mink:>} è stretto: i punti della retta\n{r:non} sono soluzioni, la tratteggio.'],
  ['continua', 6.0, 'Con {mink:≥} la retta sarebbe fra le\nsoluzioni: la disegnerei {g:continua}.'],
  ['parti', 5.0, 'La retta divide il piano in due\n{v:semipiani}: uno sopra e uno sotto.', .3],
  ['prova', 5.4, 'Per scegliere, provo un punto fuori\ndalla retta: l’origine {mink:(0; 0)}.'],
  ['conto', 5.6, 'Metto 0 al posto di {mx:x} e di {my:y}:\nviene {mink:0 > −1}.'],
  ['vero', 5.0, '{g:Vero}: coloro il semipiano che\ncontiene l’origine, quello {g:sopra}.'],
  ['contro', 5.4, 'Controprova con {mink:(2; 0)}, che sta sotto:\n{mink:0 > 3} è {r:falso}.'],
  ['sol1', 5.0, 'Le soluzioni sono i punti del semipiano\ncolorato, retta esclusa.'],
  ['seconda', 5.8, 'Ora due disequazioni insieme:\naggiungo {mink:y < −x + 4}.', .4],
  ['prova2', 6.2, 'Ancora l’origine: {mink:0 < 4} è {g:vero},\nquindi il semipiano {g:sotto} questa retta.'],
  ['inters', 5.4, 'Le soluzioni di tutte e due stanno\nnell’{g:intersezione} dei due semipiani.'],
  ['vertice', 6.0, 'Le rette si incontrano in {mink:(5/3; 7/3)}:\nanche quel punto è {r:escluso}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Una retta divide il piano in due:\nquale metà scegliere?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Si disegna la retta, si prova un punto:\nil risultato dice quale metà colorare.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.prova, 'pensa'], [T.prova + 2.4, 'neutro'], [T.vero, 'felice'], [T.vero + 2.4, 'neutro'],
  [T.contro + 2.6, 'sorpreso'], [T.contro + 4.8, 'neutro'],
  [T.inters + .6, 'festa'], [T.inters + 3.0, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// il piano
const RQ = [70, 110, 880, 690];
const PL = { ox: 330, oy: 560, u: 72, x0: -3.2, x1: 6.3, y0: -2.6, y1: 5.2 };
const S = (x, y) => [PL.ox + x * PL.u, PL.oy - y * PL.u];
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// ritaglio di un poligono con il semipiano a·x + b·y ≤ c (Sutherland–Hodgman)
function taglia(poli, a, b, c) {
  const out = [], f = p => a * p[0] + b * p[1] - c;
  for (let i = 0; i < poli.length; i++) {
    const p = poli[i], q = poli[(i + 1) % poli.length], fp = f(p), fq = f(q);
    if (fp <= 1e-9) out.push(p);
    if ((fp < -1e-9 && fq > 1e-9) || (fp > 1e-9 && fq < -1e-9)) { const s = fp / (fp - fq); out.push([lerp(p[0], q[0], s), lerp(p[1], q[1], s)]); }
  }
  return out;
}
const RETT = [[PL.x0, PL.y0], [PL.x1, PL.y0], [PL.x1, PL.y1], [PL.x0, PL.y1]];
const SOPRA1 = taglia(RETT, 2, -1, 1);    // y > 2x − 1  ⇔  2x − y < 1
const SOTTO1 = taglia(RETT, -2, 1, -1);   // y < 2x − 1
const SOTTO2 = taglia(RETT, 1, 1, 4);     // y < −x + 4  ⇔  x + y < 4
const INTER = taglia(SOPRA1, 1, 1, 4);
function poligono(ctx, pts) { ctx.beginPath(); pts.forEach((p, i) => { const q = S(p[0], p[1]); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath(); }
function riempi(ctx, pts, col, a) { if (a <= 0) return; ctx.save(); ctx.fillStyle = css(col, a); poligono(ctx, pts); ctx.fill(); ctx.restore(); }
// le due rette dentro il riquadro degli assi
const R1 = [[-.8, -2.6], [3.1, 5.2]];        // y = 2x − 1
const R2 = [[-1.2, 5.2], [6.3, -2.3]];       // y = −x + 4
// retta disegnata fino alla frazione k, piena (pieno = 1) o tratteggiata (pieno = 0)
function retta(ctx, seg, col, k, pieno, al = 1) {
  if (k <= 0 || al <= 0) return;
  const a = S(seg[0][0], seg[0][1]), b0 = S(seg[1][0], seg[1][1]), b = [lerp(a[0], b0[0], k), lerp(a[1], b0[1], k)];
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'butt';
  if (pieno > 0) { ctx.save(); ctx.globalAlpha *= pieno; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); }
  if (pieno < 1) { ctx.globalAlpha *= 1 - pieno; ctx.setLineDash([20, 14]); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
  ctx.restore();
}
// i numeri degli assi, spostati di lato dove passano le rette (posizioni controllate con uno script):
// [asse, numero, dx, dy] in pixel dalla tacca, dy verso l'alto
const NUM = [['x', -3, 0, -32], ['x', -2, 0, -32], ['x', -1, 0, -32], ['x', 1, 0, -32], ['x', 2, 0, -32], ['x', 3, 0, -32],
  ['x', 4, -24, -32], ['x', 5, 20, -32], ['x', 6, 0, -32],
  ['y', -2, 32, 0], ['y', -1, -50, 0], ['y', 1, -30, 0], ['y', 2, -30, 0], ['y', 3, -30, 0], ['y', 4, -44, 0], ['y', 5, 28, 0]];
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.restore();
}
function numeri(ctx, k) {
  const al = P(k, .6, 1); if (al <= 0) return;
  for (const [asse, n, dx, dy] of NUM) {
    const p = asse === 'x' ? S(n, 0) : S(0, n);
    txt(ctx, (n < 0 ? '−' : '') + Math.abs(n), p[0] + dx, p[1] - dy, { size: 30, color: C.dim, alpha: al });
  }
  drawRich(ctx, '{mx:x}', PL.ox + (PL.x1 + .15) * PL.u + 34, PL.oy, { size: 44, alpha: al });
  drawRich(ctx, '{my:y}', PL.ox - 34, PL.oy - (PL.y1 + .2) * PL.u + 4, { size: 44, alpha: al });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Da che parte della retta', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano: la retta, il punto di prova, i semipiani (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  const ka = P(t, 7.7, 8.7);
  // i semipiani: prima tutti e due tenui, poi quello sopra; nella seconda parte il secondo e l'intersezione
  const kInt = P(t, T.inters + .3, T.inters + 1.3);
  const kParti = life(t, T.parti + .3, T.vero + 1.0, .6, .7);
  riempi(ctx, SOTTO1, C.y, .12 * kParti);
  riempi(ctx, SOPRA1, C.v, Math.max(.12 * kParti, .16 * P(t, T.vero + .3, T.vero + 1.0)) * (1 - .75 * kInt));
  riempi(ctx, SOTTO2, C.x, .16 * P(t, T.prova2 + 2.0, T.prova2 + 2.8) * (1 - .75 * kInt));
  riempi(ctx, INTER, C.g, .26 * kInt);
  assi(ctx, ka);
  // la prima retta: piena mentre è l'uguale, poi tratteggiata
  const r1 = P(t, T.retta + .3, T.retta + 1.4, E.lin), tr = P(t, T.tratto + .4, T.tratto + 1.2);
  retta(ctx, R1, C.v, r1, 1 - tr);
  // la seconda retta, già tratteggiata (il segno < è stretto)
  retta(ctx, R2, C.x, P(t, T.seconda + .4, T.seconda + 1.5, E.lin), 0);
  numeri(ctx, ka);
  // i nomi delle rette, dove non passa nulla
  lab(ctx, '{mv:y = 2x − 1}', S(3.55, 4.6)[0], S(3.55, 4.6)[1], P(t, T.retta + 1.2, T.retta + 1.7), 40, 'left');
  lab(ctx, '{mx:y = −x + 4}', S(4.4, 1.2)[0], S(4.4, 1.2)[1], P(t, T.seconda + 1.3, T.seconda + 1.8), 40, 'left');
  // sopra e sotto
  lab(ctx, '{v:sopra}', S(-2, 3.5)[0], S(-2, 3.5)[1], kParti, 36);
  lab(ctx, '{y:sotto}', S(2.8, -1.5)[0], S(2.8, -1.5)[1], kParti, 36);
  // il punto di prova: l'origine, verde quando il conto torna
  const kO = P(t, T.prova + .4, T.prova + .9, E.back), verde = P(t, T.vero + .2, T.vero + .7);
  if (kO > .01) {
    dot(ctx, S(0, 0), mix(C.ink, C.g, verde), kO, 11);
    lab(ctx, '{mink:(0; 0)}', S(-.95, .4)[0], S(-.95, .4)[1], P(t, T.prova + .5, T.prova + 1.0), 40);
  }
  // la controprova: (2; 0), in rosso, finché non arriva la seconda retta
  const kC = P(t, T.contro + .3, T.contro + .8, E.back) * (1 - P(t, T.seconda, T.seconda + .4));
  if (kC > .01) {
    dot(ctx, S(2, 0), mix(C.ink, C.r, P(t, T.contro + 2.4, T.contro + 2.9)), kC, 11);
    lab(ctx, '{mink:(2; 0)}', S(2.3, .45)[0], S(2.3, .45)[1], kC, 40);
  }
  // il punto d'incontro delle rette: vuoto, perché escluso
  const kV = P(t, T.vertice + .4, T.vertice + .9, E.back);
  if (kV > .01) {
    hole(ctx, S(5 / 3, 7 / 3), C.r, kV, 12);
    const p = S(3.6, 2.6);
    drawSeq(ctx, ['{mink:(}', { num: '{mink:5}', den: '{mink:3}' }, '{mink:; }', { num: '{mink:7}', den: '{mink:3}' }, '{mink:)}'], p[0], p[1], 40, { local: t - T.vertice - .5 });
  }
  ctx.restore();
  ctx.restore();
}

// la scheda a destra: la disequazione e le prove, poi il sistema
const XL = 1050, XR = 1800, XC = 1425;
function campione(ctx, y, pieno, al) {   // un pezzetto di retta, pieno o tratteggiato
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5;
  if (!pieno) ctx.setLineDash([20, 14]);
  ctx.beginPath(); ctx.moveTo(XL, y); ctx.lineTo(XL + 130, y); ctx.stroke(); ctx.restore();
}
function graffa(ctx, x, y0, y1, al) {   // la parentesi del sistema
  if (al <= 0) return;
  const m = (y0 + y1) / 2, w = 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + w, y0); ctx.quadraticCurveTo(x, y0, x, y0 + 18); ctx.lineTo(x, m - 14); ctx.quadraticCurveTo(x, m, x - w, m);
  ctx.quadraticCurveTo(x, m, x, m + 14); ctx.lineTo(x, y1 - 18); ctx.quadraticCurveTo(x, y1, x + w, y1); ctx.stroke(); ctx.restore();
}
function linea(ctx, y, al) { if (al <= 0) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, y); ctx.lineTo(XR, y); ctx.stroke(); ctx.restore(); }
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 990, 110, 870, 690, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  // prima parte: una disequazione
  const k1 = 1 - P(t, T.seconda, T.seconda + .4);
  if (k1 > 0) {
    ctx.save(); ctx.globalAlpha *= k1;
    conFont(TITOLI, () => drawRich(ctx, 'disequazione', XC, 172, { size: 40, weight: 600, alpha: P(t, 7.9, 8.4) }));
    if (t > T.diseq + .3) drawRich(ctx, '{mink:y > 2x − 1}', XC, 255, { size: 60, local: t - T.diseq - .3 });
    const kt = P(t, T.tratto + .5, T.tratto + 1.0), kc = P(t, T.continua + .4, T.continua + .9);
    campione(ctx, 345, false, kt); lab(ctx, '{mink:>   <}   {dim:retta tratteggiata}', XL + 165, 345, kt, 40, 'left');
    campione(ctx, 412, true, kc); lab(ctx, '{mink:≥   ≤}   {dim:retta continua}', XL + 165, 412, kc, 40, 'left');
    linea(ctx, 458, P(t, T.prova + .4, T.prova + .9));
    lab(ctx, '{dim:prova con} {mink:(0; 0)}', XC, 502, P(t, T.prova + .6, T.prova + 1.1), 36);
    if (t > T.conto + .3) drawRich(ctx, '{mink:0 > 2 · 0 − 1}', XC, 564, { size: 44, local: t - T.conto - .3 });
    lab(ctx, '{mink:0 > −1}', XC - 40, 626, P(t, T.conto + 1.4, T.conto + 1.9), 44);
    lab(ctx, '{g:vero}', XC + 90, 626, P(t, T.vero + .2, T.vero + .7), 40, 'left');
    if (t > T.contro + .3) drawRich(ctx, '{dim:controprova:} {mink:0 > 2 · 2 − 1}', XC, 702, { size: 40, local: t - T.contro - .3 });
    lab(ctx, '{mink:0 > 3}', XC - 40, 760, P(t, T.contro + 1.6, T.contro + 2.1), 44);
    lab(ctx, '{r:falso}', XC + 70, 760, P(t, T.contro + 2.4, T.contro + 2.9), 40, 'left');
    ctx.restore();
  }
  // seconda parte: il sistema
  const k2 = P(t, T.seconda + .2, T.seconda + .6);
  if (k2 > 0) {
    ctx.save(); ctx.globalAlpha *= k2;
    conFont(TITOLI, () => drawRich(ctx, 'due disequazioni insieme', XC, 172, { size: 40, weight: 600 }));
    graffa(ctx, XC - 200, 225, 355, 1);
    lab(ctx, '{mv:y > 2x − 1}', XC - 170, 255, 1, 52, 'left');
    lab(ctx, '{mx:y < −x + 4}', XC - 170, 325, P(t, T.seconda + .6, T.seconda + 1.1), 52, 'left');
    linea(ctx, 392, P(t, T.prova2 + .2, T.prova2 + .7));
    lab(ctx, '{dim:prova con} {mink:(0; 0)}', XC, 436, P(t, T.prova2 + .3, T.prova2 + .8), 36);
    lab(ctx, '{mink:0 < 4}', XC - 40, 500, P(t, T.prova2 + .8, T.prova2 + 1.3), 44);
    lab(ctx, '{g:vero}', XC + 70, 500, P(t, T.prova2 + 1.4, T.prova2 + 1.9), 40, 'left');
    linea(ctx, 552, P(t, T.inters + .2, T.inters + .7));
    lab(ctx, '{dim:soluzioni:} {g:l’intersezione}', XC, 600, P(t, T.inters + .4, T.inters + .9), 40);
    lab(ctx, '{dim:le rette si incontrano in}', XC, 672, P(t, T.vertice + .3, T.vertice + .8), 34);
    if (t > T.vertice + .5) {
      drawSeq(ctx, ['{mink:(}', { num: '{mink:5}', den: '{mink:3}' }, '{mink:; }', { num: '{mink:7}', den: '{mink:3}' }, '{mink:)}'], XC - 70, 742, 40, { local: t - T.vertice - .5 });
      lab(ctx, '{r:escluso}', XC + 50, 742, P(t, T.vertice + 2.4, T.vertice + 2.9), 40, 'left');
    }
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Si disegna la retta, si prova un punto:\nil risultato dice quale metà colorare.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'segno {mink:>} o {mink:<}', '{dim:retta} {v:tratteggiata}'], [960, 'prova con {mink:(0; 0)}', '{dim:se è} {g:vero}{dim:, si colora}'], [1450, 'più disequazioni', '{g:intersezione}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 32, weight: 400 });
    drawRich(ctx, s, x, 548, { size: 40 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],                                   // il piano
    ['pop', T.diseq + .3, .5],                                                                 // la disequazione
    ['traccia', T.retta + .3, T.retta + 1.4], ['tono', T.retta + .3, T.retta + 1.4, [.1, .9]],  // la retta sale
    ['traccia', T.tratto + .4, T.tratto + 1.2], ['pop', T.tratto + .5, .4],                    // diventa tratteggiata
    ['pop', T.continua + .4, .6],
    ['soffio', T.parti + .3],                                                                  // i due semipiani
    ['pop', T.prova + .4, .5], ['pop', T.conto + .3, .5], ['pop', T.conto + 1.4, .55],         // la prova con l'origine
    ['ding', T.vero + .2], ['soffio', T.vero + .3],                                            // vero: il semipiano sopra
    ['pop', T.contro + .3, .4], ['pop', T.contro + 1.6, .35],                                  // la controprova
    ['traccia', T.seconda + .4, T.seconda + 1.5], ['tono', T.seconda + .4, T.seconda + 1.5, [.95, .1]],   // la seconda retta scende
    ['pop', T.prova2 + .8, .5], ['ding', T.prova2 + 1.4], ['soffio', T.prova2 + 2.0],          // vero: il semipiano sotto
    ['soffio', T.inters + .3], ['ding', T.inters + .5],                                        // l'intersezione
    ['pop', T.vertice + .4, .65],                                                              // il punto d'incontro
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Da che parte della retta', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.parti - .2, 'la retta di confine'], [T.parti - .2, T.seconda - .2, 'il punto di prova'], [T.seconda - .2, FINE, 'due disequazioni insieme']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
