'use strict';
/* Quanto un vettore va con l’altro — il prodotto scalare. u⃗ = (4; 3) fermo, v⃗ lungo 5 che ruota attorno all'origine:
   l'ombra di v⃗ su u⃗ è |v⃗| · cos θ; per |u⃗| dà u⃗ · v⃗ = |u⃗| · |v⃗| · cos θ, un numero. Fermate di v⃗:
   (0; 5) θ ≈ 53,13°, cos θ = 0,6 → 15; (4; 3) θ = 0 → 25; (−3; 4) θ = 90° → 0; (−5; 0) θ ≈ 143,13°, cos θ = −0,8 → −20.
   Con le componenti u₁v₁ + u₂v₂ dà gli stessi quattro numeri. Argomento: vettori.
   Notazione: freccia sopra la lettera, come in vettori/somma. */
CVIDEO.registra('vettori/prodotto-scalare', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 14 caratteri al secondo)
const SEQ = [
  ['u', 6.0, 'Il vettore {mx:u⃗ = (4; 3)} sta fermo.\nÈ lungo 5: il {v:modulo} è {mink:|u⃗| = 5}.'],
  ['v', 5.0, 'Anche {my:v⃗} è lungo 5 e può ruotare;\nfra i due c’è l’angolo {mink:θ}.'],
  ['ombra', 4.8, 'Da {my:v⃗} scendo sulla retta di {mx:u⃗}:\nè l’{v:ombra} di {my:v⃗} su {mx:u⃗}.'],
  ['cos', 6.4, 'È lunga {mink:|v⃗| · cos θ}:\n{mink:5 · 0,6 = }{y:3}.'],
  ['per', 5.2, 'La moltiplico per {mink:|u⃗|}:\n{mink:3 · 5 = }{g:15}.'],
  ['nome', 6.4, 'È il {v:prodotto scalare}:\n{mink:u⃗ · v⃗ = |u⃗| · |v⃗| · cos θ}.'],
  ['numero', 3.6, 'Ed è un {g:numero}, non un vettore.'],
  ['vicino', 4.4, 'Se {my:v⃗} si avvicina a {mx:u⃗},\nl’ombra si allunga…', .4],
  ['allineati', 6.4, '…e quando sono allineati è lunga 5:\n{mink:5 · 5 = }{g:25}, il massimo.'],
  ['lontano', 4.2, 'Ora {my:v⃗} si allontana:\nl’ombra si accorcia…'],
  ['retto', 5.2, '…e a 90° {r:sparisce}: vettori\n{v:perpendicolari}, prodotto {g:0}.'],
  ['oltre', 5.0, 'Oltre 90° l’ombra cade\ndall’altra parte, all’indietro…'],
  ['negativo', 6.4, '…e il prodotto è {r:negativo}:\n{mink:5 · 5 · (−0,8) = }{r:−20}.'],
  ['comp', 5.6, 'Con le componenti, {mx:u⃗ = (u₁; u₂)}\ne {my:v⃗ = (v₁; v₂)}…'],
  ['formula', 5.4, '…moltiplico a coppie e sommo:\n{mink:u⃗ · v⃗ = u₁v₁ + u₂v₂}.'],
  ['verifica', 4.3, 'Qui: {mink:4 · (−5) + 3 · 0 = }{r:−20}.'],
  ['tabella', 4.2, 'In ogni posizione le due formule\ndanno lo stesso numero.'],
];
const T = {}, FUMETTI = [[2.3, 6.3, 'Quanto vanno d’accordo\ndue vettori?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Positivo, zero o negativo: dice\nquanto {my:v⃗} va d’accordo con {mx:u⃗}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.per + 1.6, 'felice'], [T.nome, 'neutro'], [T.allineati + 1.0, 'festa'], [T.allineati + 3.6, 'neutro'],
  [T.retto + .4, 'sorpreso'], [T.retto + 3.4, 'neutro'], [T.negativo + .6, 'pensa'], [T.negativo + 3.6, 'neutro'],
  [T.verifica + 1.0, 'felice'], [T.tabella + 2.0, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano ----------
const OX = 714, OY = 560, U = 68, X0 = -5.8, X1 = 5.2, Y0 = -2.9, Y1 = 5.9;
const S = (x, y) => [OX + U * x, OY - U * y];
const RQ = [290, 110, 840, 690];
const GR = Math.PI / 180, AU = Math.atan2(3, 4) / GR;            // direzione di u⃗: 36,87°
const UH = [.8, .6];                                             // u⃗ / |u⃗|
// la direzione di v⃗ (gradi): ferma in (0; 5), poi (4; 3), (−3; 4), (−5; 0); si muove solo nei fumetti che lo dicono
const phi = t => kf(t, [[0, 90], [T.vicino + .3, 90], [T.vicino + 3.3, AU], [T.lontano + .3, AU], [T.lontano + 3.4, AU + 90],
  [T.oltre + .3, AU + 90], [T.oltre + 3.6, 180]]);
const nf = (v, d) => (v < -1e-9 ? '−' : '') + Math.abs(v).toFixed(d).replace('.', ',');
// numero esatto con il segno «=», altrimenti arrotondato con «≈»
function valore(v, dmax) {
  for (let d = 0; d <= dmax; d++) { const k = Math.pow(10, d); if (Math.abs(v * k - Math.round(v * k)) < 1e-9) return '= ' + nf(Math.round(v * k) / k, d); }
  return '≈ ' + nf(v, dmax);
}
function distSeg(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy;
  const k = L2 ? clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2) : 0;
  return Math.hypot(p[0] - a[0] - k * dx, p[1] - a[1] - k * dy);
}
function freccia(ctx, a, b, col, k = 1, al = 1, w = 7, sc = 1.3) {
  if (k <= 0 || al <= .01) return;
  const e = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
  const dx = e[0] - a[0], dy = e[1] - a[1], L = Math.hypot(dx, dy);
  if (L < 2) return;
  const ux = dx / L, uy = dy / L, s = Math.min(sc, L / 24);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (L > 16 * s) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - ux * 14 * s, e[1] - uy * 14 * s); ctx.stroke(); }
  arrowHead(ctx, [e[0] - ux * 2 * s, e[1] - uy * 2 * s], Math.atan2(dy, dx), col, s);
  ctx.restore();
}
function linea(ctx, a, b, col, w, al, trat) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (trat) ctx.setLineDash(trat);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
function assi(ctx, k, ost) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(X0); i <= X1; i++) { if (!i) continue; const x = OX + i * U; ctx.beginPath(); ctx.moveTo(x, OY - Y1 * U * k); ctx.lineTo(x, OY - Y0 * U * k); ctx.stroke(); }
  for (let j = Math.ceil(Y0); j <= Y1; j++) { if (!j) continue; const y = OY - j * U; ctx.beginPath(); ctx.moveTo(OX + X0 * U * k, y); ctx.lineTo(OX + X1 * U * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(OX + (X0 - .1) * U * k, OY); ctx.lineTo(OX + (X1 + .15) * U * k, OY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(OX, OY - (Y0 - .1) * U * k); ctx.lineTo(OX, OY - (Y1 + .2) * U * k); ctx.stroke();
  arrowHead(ctx, [OX + (X1 + .15) * U * k + 6, OY], 0, C.ink);
  arrowHead(ctx, [OX, OY - (Y1 + .2) * U * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', OX + (X1 + .15) * U + 32, OY, { size: 44 });
  drawRich(ctx, '{my:y}', OX + 30, OY - (Y1 + .2) * U + 4, { size: 44 });
  // i numeri: un numero sparisce solo mentre una freccia o un segmento ci passa vicino
  const NUM = [[-4, 0, 0, 31], [-2, 0, 0, 31], [2, 0, 0, 31], [4, 0, 0, 31], [0, 2, -30, 0], [0, 4, -30, 0], [0, -2, 34, 0]];
  for (const [nx, ny, dx, dy] of NUM) {
    const n = nx || ny, s = (n < 0 ? '−' : '') + Math.abs(n), p = [OX + nx * U + dx, OY - ny * U + dy];
    let d = 1e9; for (const [a, b, w] of ost) d = Math.min(d, distSeg(p, a, b) - w);
    txt(ctx, s, p[0], p[1], { size: 30, color: C.dim, alpha: clamp((d - 18) / 6) });
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Quanto un vettore\nva con l’altro', W / 2, 250, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0), lh: 1.12 }));
}

// 1–3 · le due frecce e l'ombra (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  ctx.save(); ctx.globalAlpha *= fuori;
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  const f = phi(t) * GR, V = [5 * Math.cos(f), 5 * Math.sin(f)];
  const s = 5 * Math.cos(f - AU * GR);                  // l'ombra (con il segno) = |v⃗| · cos θ
  const foot = [s * UH[0], s * UH[1]];
  const kv = P(t, T.v + .3, T.v + 1.1), kO = P(t, T.ombra + .3, T.ombra + 1.0);
  // gli ostacoli per i numeri degli assi (pixel): freccia v⃗, perpendicolare, ombra
  const ost = [];
  if (kv > 0) ost.push([S(0, 0), S(V[0], V[1]), 6]);
  if (kO > 0) { ost.push([S(V[0], V[1]), S(foot[0], foot[1]), 4]); ost.push([S(.24 * .6, -.24 * .8), S(foot[0] + .24 * .6, foot[1] - .24 * .8), 8]); }
  assi(ctx, P(t, 7.7, 8.7), ost);
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  // la retta di u⃗, tratteggiata
  linea(ctx, S(-4.6 * UH[0], -4.6 * UH[1]), S(6.3 * UH[0], 6.3 * UH[1]), C.dim, 2.5, .7 * kO, [10, 10]);
  // l'ombra: una striscia lungo la retta di u⃗, in avanti arancio, all'indietro rossa
  const kb = P(t, T.ombra + .6, T.ombra + 1.3);
  if (kb > 0 && Math.abs(s) > .02) {
    const o = [.24 * .6, -.24 * .8];
    linea(ctx, S(o[0], o[1]), S(o[0] + foot[0] * kb, o[1] + foot[1] * kb), s > 0 ? C.y : C.r, 13, .55, null);
  }
  // la perpendicolare dalla testa di v⃗, con l'angolo retto
  if (kO > 0 && Math.abs(5 - Math.abs(s)) > .05) {
    const tip = S(V[0], V[1]), pf = S(foot[0], foot[1]);
    linea(ctx, tip, [lerp(tip[0], pf[0], kO), lerp(tip[1], pf[1], kO)], C.dim, 3, .9, [9, 8]);
    const dir = [V[0] - foot[0], V[1] - foot[1]], L = Math.hypot(dir[0], dir[1]);
    if (L > .5 && Math.abs(s) > .35) {
      const a = [dir[0] / L * .28, dir[1] / L * .28], b = [-Math.sign(s) * UH[0] * .28, -Math.sign(s) * UH[1] * .28];
      const p1 = S(foot[0] + a[0], foot[1] + a[1]), p2 = S(foot[0] + a[0] + b[0], foot[1] + a[1] + b[1]), p3 = S(foot[0] + b[0], foot[1] + b[1]);
      ctx.save(); ctx.globalAlpha *= P(kO, .7, 1); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.stroke(); ctx.restore();
    }
  }
  // l'angolo θ fra u⃗ e v⃗
  const ka = P(t, T.v + .9, T.v + 1.4) * clamp((f / GR - AU) / 6);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(OX, OY, 1.1 * U, -f, -AU * GR); ctx.stroke(); ctx.restore();
    // a metà dell'angolo (al massimo 40°, mai sopra i numeri dell'asse y); quando l'angolo è stretto, appena fuori, sopra v⃗
    const d = f / GR - AU, m = (AU + Math.min(d / 2 + 18 * clamp((30 - d) / 15), 40)) * GR, pl = S(1.9 * Math.cos(m), 1.9 * Math.sin(m));
    drawRich(ctx, '{mink:θ}', pl[0], pl[1], { size: 40, alpha: ka });
  }
  // le frecce: u⃗ sotto, v⃗ sopra (quando sono allineate si vedono tutte e due)
  freccia(ctx, S(0, 0), S(4, 3), C.x, P(t, T.u + .3, T.u + 1.3), 1, 10, 1.6);
  freccia(ctx, S(0, 0), S(V[0], V[1]), C.y, kv, 1, 5, 1.1);
  ctx.restore();
  // i nomi
  const pu = S(4.75, 2.5);
  drawRich(ctx, '{mx:u⃗}', pu[0], pu[1], { size: 44, alpha: P(t, T.u + .9, T.u + 1.3) });
  // il nome di v⃗: a sinistra della punta finché v⃗ sale, poi gira e a (−5; 0) sta sopra la punta (lontano dall'asse x e dal −4)
  const av = f <= Math.PI / 2 ? f + Math.PI / 2 : 1.5 * Math.PI - f;
  const pv = S(V[0] + .62 * Math.cos(av), V[1] + .62 * Math.sin(av));
  drawRich(ctx, '{my:v⃗}', pv[0], pv[1], { size: 44, alpha: P(t, T.v + .7, T.v + 1.1) });
  // «ombra», sotto la striscia
  if (kb > 0 && Math.abs(s) > 1) {
    const sl = s > 0 ? Math.max(s / 2, 2.2) : s / 2, pd = S(sl * UH[0] + .7 * .6, sl * UH[1] - .7 * .8);
    ctx.save(); ctx.translate(pd[0], pd[1]); ctx.rotate(-AU * GR);
    drawRich(ctx, s > 0 ? '{y:ombra}' : '{r:ombra}', 0, 0, { size: 34, alpha: kb * clamp(Math.abs(s) - 1.5) });
    ctx.restore();
  }
  ctx.restore();
}

// la scheda a destra
const XC = 1510, XL = 1210, XR = 1812;
function sx(ctx, s, y, size, al) { if (al > .01) drawRich(ctx, s, XL, y, { size, alpha: al, align: 'left' }); }
function dx(ctx, s, y, size, al) { if (al > .01) drawRich(ctx, s, XR, y, { size, alpha: al, align: 'right' }); }
function cx(ctx, s, y, size, al, x = XC) { if (al > .01) drawRich(ctx, s, x, y, { size, alpha: al }); }
function separa(ctx, y, al) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1205, y); ctx.lineTo(1815, y); ctx.stroke(); ctx.restore();
}
const FERMATE = [['(0; 5)', 90], ['(4; 3)', AU], ['(−3; 4)', AU + 90], ['(−5; 0)', 180]];
function sceneScheda(ctx, t) {
  if (t < T.u || t > FINE + .2) return;
  const al = life(t, T.u + .1, FINE + .1, .5, .7);
  card(ctx, 1170, 110, 680, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'due vettori', XC, 165, { size: 40, weight: 600 }));
  const ku = P(t, T.u + .4, T.u + .9), kv = P(t, T.v + .5, T.v + 1.0);
  sx(ctx, '{mx:u⃗ = (4; 3)}', 232, 44, ku); dx(ctx, '{mink:|u⃗| = 5}', 232, 44, ku);
  // le coordinate di v⃗ si leggono solo quando è fermo
  const fd = phi(t);
  FERMATE.forEach(([c, a]) => sx(ctx, '{my:v⃗}{mink: = ' + c + '}', 292, 44, kv * clamp(1 - Math.abs(fd - a) / 3)));
  dx(ctx, '{mink:|v⃗| = 5}', 292, 44, kv);
  separa(ctx, 335, kv);
  // pagina 1: angolo, coseno, ombra, prodotto
  const p1 = 1 - P(t, T.comp, T.comp + .4);
  const ferma = FERMATE.some(([, a]) => Math.abs(fd - a) < 1e-9);
  const th = ferma ? fd - AU : Math.round((fd - AU) * 100) / 100, c = Math.cos(th * GR), sh = 5 * c, pr = 25 * c;
  // mentre ruota i numeri vengono dall'angolo al centesimo di grado; alle fermate dall'angolo vero (53,1301°: coseno 0,6 esatto)
  const ka = P(t, T.v + .9, T.v + 1.4) * p1, kc = P(t, T.cos + .3, T.cos + .8) * p1;
  sx(ctx, '{dim:angolo} {mink:θ}', 385, 40, ka); dx(ctx, '{mink:' + valore(th, 0) + '}°', 385, 44, ka);
  sx(ctx, '{mink:cos θ}', 440, 40, kc); dx(ctx, '{mink:' + valore(c, 2) + '}', 440, 44, kc);
  sx(ctx, '{dim:ombra =} {mink:|v⃗| · cos θ}', 495, 40, kc); dx(ctx, (sh < -1e-6 ? '{mr:' : '{my:') + valore(sh, 2) + '}', 495, 44, kc);
  separa(ctx, 540, P(t, T.per + .2, T.per + .6) * p1);
  cx(ctx, '{mink:u⃗ · v⃗ = |u⃗| · |v⃗| · cos θ}', 592, 42, P(t, T.nome + .3, T.nome + .8) * p1);
  const kp = P(t, T.per + .3, T.per + .8) * p1, kn = P(t, T.nome + .3, T.nome + .8);
  sx(ctx, '{dim:ombra ·} {mink:|u⃗|}', 670, 44, kp * (1 - kn)); sx(ctx, '{mink:u⃗ · v⃗}', 670, 48, kp * kn);
  dx(ctx, (pr < -1e-6 ? '{mr:' : '{mg:') + valore(pr, 1) + '}', 670, 56, kp);
  cx(ctx, '{dim:un} {g:numero}{dim:, non un vettore}', 745, 34, P(t, T.numero + .3, T.numero + .8) * p1);
  // pagina 2: con le componenti
  cx(ctx, '{mx:u⃗ = (u₁; u₂)}     {my:v⃗ = (v₁; v₂)}', 382, 42, P(t, T.comp + .5, T.comp + 1.0));
  cx(ctx, '{mink:u⃗ · v⃗ = u₁v₁ + u₂v₂}', 442, 46, P(t, T.formula + .4, T.formula + .9));
  cx(ctx, '{mink:4 · (−5) + 3 · 0 = }{mr:−20}', 502, 44, P(t, T.verifica + .3, T.verifica + .8));
  const kt = P(t, T.tabella + .2, T.tabella + .7);
  separa(ctx, 538, kt);
  cx(ctx, '{dim:coseno}', 570, 30, kt, 1545); cx(ctx, '{dim:componenti}', 570, 30, kt, 1735);
  [['(0; 5)', '15', 'g'], ['(4; 3)', '25', 'g'], ['(−3; 4)', '0', 'g'], ['(−5; 0)', '−20', 'r']].forEach(([v, n, k], i) => {
    const a = P(t, T.tabella + .5 + i * .35, T.tabella + .9 + i * .35), y = 612 + i * 48;
    cx(ctx, '{my:v⃗}{mink: = ' + v + '}', y, 40, a, 1310);
    cx(ctx, '{m' + k + ':' + n + '}', y, 44, a, 1545); cx(ctx, '{m' + k + ':' + n + '}', y, 44, a, 1735);
  });
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il prodotto scalare è un numero: l’ombra\ndi un vettore per la lunghezza dell’altro.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'angolo minore di 90°', '{g:positivo}'], [960, 'perpendicolari', '{g:zero}'], [1450, 'angolo maggiore di 90°', '{r:negativo}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): mentre v⃗ ruota il tono segue il prodotto scalare, da −25 (0) a 25 (1)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7],                                                   // il piano
    ['traccia', T.u + .3, T.u + 1.3], ['soffio', T.u + .1], ['pop', T.u + .4, .5],             // u⃗ e la scheda
    ['traccia', T.v + .3, T.v + 1.1], ['pop', T.v + 1.0, .4],                                 // v⃗ e l'angolo
    ['traccia', T.ombra + .3, T.ombra + 1.0], ['traccia', T.ombra + .6, T.ombra + 1.3],        // la perpendicolare, l'ombra
    ['pop', T.cos + .3, .5], ['pop', T.cos + .8, .6],                                         // cos θ, l'ombra = 3
    ['ding', T.per + .4],                                                                     // 15
    ['pop', T.nome + .3, .6], ['pop', T.numero + .3, .5],                                     // la formula, un numero
    ['tono', T.vicino + .3, T.vicino + 3.3, [.8, .87, .95, 1]],                               // v⃗ verso u⃗: da 15 a 25
    ['ding', T.allineati + 1.0],
    ['tono', T.lontano + .3, T.lontano + 3.4, [1, .85, .5]],                                  // da 25 a 0
    ['pop', T.retto + .4, .5],
    ['tono', T.oltre + .3, T.oltre + 3.6, [.5, .35, .1]],                                     // da 0 a −20
    ['pop', T.negativo + .5, .2],
    ['soffio', T.comp], ['pop', T.comp + .5, .5], ['pop', T.formula + .4, .6],                // le componenti
    ['pop', T.verifica + .3, .3], ['pop', T.tabella + .5, .7], ['pop', T.tabella + .85, .8],
    ['pop', T.tabella + 1.2, .5], ['pop', T.tabella + 1.55, .2], ['ding', T.tabella + 1.9],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quanto un vettore va con l’altro', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.vicino - .2, 'l’ombra'], [T.vicino - .2, T.comp - .2, 'quando cambia l’angolo'], [T.comp - .2, FINE, 'con le componenti']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
