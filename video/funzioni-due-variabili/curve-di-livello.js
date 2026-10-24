'use strict';
/* La mappa dei sentieri — le curve di livello di z = 9 − x² − y². La collina tagliata a quota k = 8, 6, 4, 2, 0:
   ogni taglio è la circonferenza x² + y² = 9 − k, di raggio √(9 − k) (1; √3 ≈ 1,73; √5 ≈ 2,24; √7 ≈ 2,65; 3);
   vista dall'alto diventa una curva di livello della mappa. In alto le curve sono distanti (√3 − 1 ≈ 0,73),
   in basso fitte (3 − √7 ≈ 0,35): lì la collina è ripida. Assonometria e colori come in geometria-analitica-spazio;
   l'asse z è disegnato in scala 0,4 (la collina alta 9 non entrerebbe). Argomento: funzioni-due-variabili. */
CVIDEO.registra('funzioni-due-variabili/curve-di-livello', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, arrowHead, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 14 caratteri al secondo)
const SEQ = [
  ['funzione', 7.4, 'Con due variabili, {mink:z = f(x; y)}:\nogni punto {mink:(x; y)} ha un’altezza {mink:z}.'],
  ['esempio', 6.0, 'La nostra: {mink:z = 9 − x² − y²}.'],
  ['punto', 5.4, 'In {mink:(1; 2)} l’altezza è\n{mink:9 − 1 − 4 = 4}.'],
  ['collina', 4.8, 'Tutti i punti insieme formano\nuna superficie: una {g:collina}.'],
  ['cima', 4.0, 'In cima, sopra {mink:(0; 0)}, è alta 9.'],
  ['piano', 5.0, 'Taglio la collina con il piano\norizzontale {mink:z = 8}.', .4],
  ['taglio', 7.4, 'Il taglio è {mink:x² + y² = 1}:\nuna {v:circonferenza} di raggio 1.'],
  ['mappa', 6.0, 'Guardata dall’alto, sul piano {mink:xy},\ndiventa la mappa: quota {v:8}.'],
  ['livello', 4.6, 'È una {v:curva di livello}: tutti\ni punti a quota 8.'],
  ['generale', 5.6, 'A ogni quota {mv:k} una circonferenza\ndi raggio {mink:√(9 − }{mv:k}{mink:)}.'],
  ['q6', 2.5, 'Quota 6…'],
  ['q4', 2.5, '…quota 4…'],
  ['q2', 2.5, '…quota 2…'],
  ['q0', 3.0, '…e quota 0, la base.'],
  ['ecco', 3.4, 'Ecco la mappa della collina.', .4],
  ['larghe', 4.8, 'In alto le curve sono {g:distanti}:\nla collina sale piano.'],
  ['fitte', 4.0, 'In basso sono {r:fitte}:\nla collina è ripida.'],
  ['strada', 4.8, 'Stesso dislivello in {r:meno strada}:\nper questo è più ripida.'],
];
const T = {}, FUMETTI = [[2.3, 6.3, 'Come si disegna una collina\nsu un foglio piatto?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Fette a quota costante, viste\ndall’alto: fitte dove è ripida.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.collina + 1.2, 'felice'], [T.cima + 1.5, 'neutro'], [T.taglio + 2.0, 'sorpreso'], [T.taglio + 4.6, 'neutro'],
  [T.mappa + 2.0, 'festa'], [T.mappa + 4.4, 'neutro'], [T.ecco + .6, 'felice'], [T.larghe + 1.0, 'neutro'],
  [T.fitte + .4, 'sorpreso'], [T.strada + .4, 'pensa'], [T.strada + 3.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- lo spazio in assonometria (come in geometria-analitica-spazio) ----------
// l'osservatore guarda da 20° fra gli assi x e y, 22° più in alto: x viene verso chi guarda, y va a destra, z sale
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const DV = [Math.cos(PH) * Math.cos(TH), Math.cos(PH) * Math.sin(TH), Math.sin(PH)];   // verso chi guarda
const OX = 600, OY = 620, S = 80, ZS = .4, R0 = 3, LQ = 3.6;   // ZS: l'asse z in scala 0,4
const f = (x, y) => 9 - x * x - y * y;
const pr = (x, y, z) => [OX + S * (x * VR[0] + y * VR[1]), OY - S * (x * VU[0] + y * VU[1] + z * ZS * VU[2])];
// un punto è nascosto se, andando verso chi guarda, si entra nella collina
function nascosto(x, y, z) {
  const pz = z * ZS;
  for (let t = .06; t < 11; t += .04) {
    const qx = x + t * DV[0], qy = y + t * DV[1], qz = pz + t * DV[2];
    if (qz > 9 * ZS) return false;
    const r2 = qx * qx + qy * qy;
    if (r2 <= 9 && qz < ZS * (9 - r2) - .004) return true;
  }
  return false;
}
// una curva dello spazio: le parti nascoste dalla collina tratteggiate (solo se la collina si vede)
function curva3(ctx, pts, col, w, al, colle = true) {
  if (al <= .01 || pts.length < 2) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let run = [], vis = null;
  const flush = () => {
    if (run.length < 2) return;
    ctx.setLineDash(vis ? [] : [10, 9]); ctx.lineWidth = vis ? w : Math.max(2.5, w * .55);
    ctx.beginPath(); run.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  };
  for (const q of pts) {
    const v = !(colle && nascosto(q[0], q[1], q[2])), p = pr(q[0], q[1], q[2]);
    if (vis === null) vis = v;
    if (v !== vis) { run.push(p); flush(); run = [p]; vis = v; } else run.push(p);
  }
  flush(); ctx.restore();
}
const cerchio3 = (r, k, n = 120) => { const p = []; for (let i = 0; i <= n; i++) { const a = 2 * Math.PI * i / n; p.push([r * Math.cos(a), r * Math.sin(a), k]); } return p; };
function poli(ctx, pts, fill, stroke, w = 2) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}

// la collina: quadrilateri in coordinate polari, dal più lontano al più vicino (pittore);
// gli anelli passano proprio per le curve di livello, così un piano z = k la divide senza tagliare quadrilateri
const LIV = [8, 6, 4, 2, 0], RL = LIV.map(k => Math.sqrt(9 - k));
const RINGS = [0, .5, 1, 1.366, Math.sqrt(3), 1.984, Math.sqrt(5), 2.441, Math.sqrt(7), 2.823, 3], NA = 72;
const LUCE = (() => { const l = [.35, -.55, .75], n = Math.hypot(l[0], l[1], l[2]); return l.map(v => v / n); })();
const QUADS = [];
for (let i = 0; i < RINGS.length - 1; i++) for (let j = 0; j < NA; j++) {
  const a0 = 2 * Math.PI * j / NA, a1 = 2 * Math.PI * (j + 1) / NA, r0 = RINGS[i], r1 = RINGS[i + 1];
  const c = [[r0, a0], [r1, a0], [r1, a1], [r0, a1]].map(([r, a]) => [r * Math.cos(a), r * Math.sin(a), f(r * Math.cos(a), r * Math.sin(a))]);
  const rm = (r0 + r1) / 2, am = (a0 + a1) / 2, cx = rm * Math.cos(am), cy = rm * Math.sin(am), cz = f(cx, cy) * ZS;
  const nx = 2 * cx * ZS, ny = 2 * cy * ZS, nn = Math.hypot(nx, ny, 1);
  const luce = clamp((nx * LUCE[0] + ny * LUCE[1] + LUCE[2]) / nn);
  QUADS.push({ pts: c.map(q => pr(q[0], q[1], q[2])), r: rm, prof: cx * DV[0] + cy * DV[1] + cz * DV[2], luce });
}
QUADS.sort((a, b) => a.prof - b.prof);
// disegna i quadrilateri con r nell'intervallo [ra, rb); fasce: tinta in più (verde in alto, rossa in basso)
function collina(ctx, al, ra, rb, fasce) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al;
  for (const q of QUADS) {
    if (q.r < ra || q.r >= rb) continue;
    let col = mix(C.paper, C.g, .1 + .3 * (1 - q.luce));
    if (fasce && fasce.v > 0 && q.r > 1 && q.r < RL[1]) col = mix(col, C.g, .45 * fasce.v);
    if (fasce && fasce.r > 0 && q.r > RL[3]) col = mix(col, C.r, .4 * fasce.r);
    poli(ctx, q.pts, css(col), css(col), 1);
    poli(ctx, q.pts, null, css(C.g, .32), 1.2);
  }
  ctx.restore();
}
function pianoZ(ctx, k, al, col, w = 2.5) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, [pr(LQ, LQ, k), pr(LQ, -LQ, k), pr(-LQ, -LQ, k), pr(-LQ, LQ, k)], css(col, .13), css(col, .55), w);
  ctx.restore();
}
// gli assi: x verso chi guarda, y a destra, z in alto; dentro la collina tratteggiati
const FINI = [[4.7, 0, 0], [0, 4.6, 0], [0, 0, 10.6]];
function assi(ctx, k, colle) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  FINI.forEach(e => {
    const pts = []; for (let i = 0; i <= 60; i++) pts.push([e[0] * i / 60, e[1] * i / 60, e[2] * i / 60]);
    curva3(ctx, pts, C.ink, 3, .8, colle);
    const A = pr(e[0] * .97, e[1] * .97, e[2] * .97), B = pr(e[0], e[1], e[2]), ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    arrowHead(ctx, [B[0] + Math.cos(ang) * 6, B[1] + Math.sin(ang) * 6], ang, C.ink);
  });
  const ex = pr(...FINI[0]), ey = pr(...FINI[1]), ez = pr(...FINI[2]);
  drawRich(ctx, '{mx:x}', ex[0] - 30, ex[1] + 18, { size: 44 });
  drawRich(ctx, '{my:y}', ey[0] + 32, ey[1] + 2, { size: 44 });
  drawRich(ctx, '{mv:z}', ez[0] + 30, ez[1] - 2, { size: 44 });
  ctx.restore();
}

// ---------- i tempi delle fette ----------
// il piano sta fermo a 8, 6, 4, 2, 0 mentre Ada ne parla; ogni fetta, appena tagliata, vola sulla mappa
// un fumetto per quota: il piano scende nei primi 0,7 s, poi resta fermo; la fetta vola sulla mappa
const QF = [T.q6, T.q4, T.q2, T.q0];
const quota = t => kf(t, [[0, 8], [T.q6, 8], [T.q6 + .7, 6], [T.q4, 6], [T.q4 + .7, 4], [T.q2, 4], [T.q2 + .7, 2], [T.q0, 2], [T.q0 + .7, 0]]);
const TAGLIO = [T.taglio + .3].concat(QF.map(a => a + .7));
const VOLO = [T.mappa + .6].concat(QF.map(a => a + .8)), DVOLO = 1.1;
const RAGGI = ['1', '√3 ≈ 1,73', '√5 ≈ 2,24', '√7 ≈ 2,65', '3'];

// ---------- la mappa ----------
const MX = 1505, MY = 505, MU = 84, ME = 3.3, MP = 3.6, CM = [1160, 110, 690, 690];   // MP: gli assi un po' più lunghi dal lato delle frecce
// le quote: in fila poco sopra l'asse x, a sinistra; ognuna nello spazio subito fuori dalla sua curva
const ET = RL.map((r, i) => { const h = .45, xi = -Math.sqrt(r * r - h * h), xo = i < 4 ? -Math.sqrt(RL[i + 1] * RL[i + 1] - h * h) : xi - .5; return [MX + MU * (xi + xo) / 2, MY - MU * h]; });

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'La mappa dei sentieri', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1–3 · la collina nello spazio (7.5–FINE)
const PALI = [[1, -2, .6], [-1, -1, 1.2], [-1, 2.5, 1.8]];   // [x, y, ritardo]: altezze 4, 7 e 1,75; sullo schermo ben separati
function palo(ctx, x, y, k, al, col) {
  if (al <= .01) return;
  const a = pr(x, y, 0), b = pr(x, y, f(x, y) * k);
  ctx.save(); ctx.globalAlpha *= al;
  dot(ctx, a, C.dim, 1, 6);
  ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  if (k > .98) dot(ctx, b, col, 1, 8);
  ctx.restore();
}
function sceneSpazio(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  ctx.save(); ctx.globalAlpha *= fuori;
  card(ctx, 70, 110, 1060, 690, P(t, 7.5, 8.2));
  pianoZ(ctx, 0, .8 * P(t, 7.6, 8.4), C.dim, 2);
  // i pali: per ogni punto (x; y) un'altezza
  const kpal = 1 - P(t, T.collina, T.collina + .6);
  PALI.forEach(([x, y, d]) => palo(ctx, x, y, P(t, T.funzione + d, T.funzione + d + .7), P(t, T.funzione + d, T.funzione + d + .2) * kpal, C.v));
  palo(ctx, 1, 2, P(t, T.punto + .4, T.punto + 1.2), P(t, T.punto + .3, T.punto + .5) * kpal, C.y);
  // la collina, il piano z = k e le fette
  const ks = P(t, T.collina + .2, T.collina + 1.4), k = quota(t), kp = life(t, T.piano + .3, T.ecco + .5, .7, .5);
  const fasce = { v: P(t, T.larghe + .3, T.larghe + .9), r: P(t, T.fitte + .3, T.fitte + .9) };
  if (kp > 0) {
    const rk = Math.sqrt(9 - k);
    collina(ctx, ks, rk, 9, fasce); pianoZ(ctx, k, kp, C.v); collina(ctx, ks, 0, rk, fasce);
  } else collina(ctx, ks, 0, 9, fasce);
  const colle = ks > .5;
  assi(ctx, P(t, 7.7, 8.7), colle);
  drawRich(ctx, '{dim:asse} {mv:z} {dim:accorciato}', 98, 772, { size: 30, align: 'left', alpha: P(t, 8.2, 8.7) });
  // le curve di livello sulla collina: spesse mentre il piano è lì, sottili dopo
  LIV.forEach((lv, i) => {
    const a = P(t, TAGLIO[i], TAGLIO[i] + .5);
    if (a <= 0) return;
    const qui = Math.abs(k - lv) < .01 && kp > .5 && t < T.ecco;
    curva3(ctx, cerchio3(RL[i], lv), C.v, qui ? 6 : 4, a, colle);
  });
  // il punto (1; 2) e la sua altezza
  const kq = life(t, T.punto + 1.0, T.collina + .4, .4, .4);   // via quando arriva la collina: il nome finirebbe sulla superficie
  if (kq > 0) {
    const a = pr(1, 2, 0), b = pr(1, 2, 4);
    drawRich(ctx, '{mink:(1; 2)}', a[0] + 18, a[1] + 34, { size: 40, align: 'left', alpha: kq * (1 - ks) });
    dot(ctx, b, C.y, kq, 9);
    drawRich(ctx, '{mink:z = 4}', b[0] + 24, b[1] - 6, { size: 40, align: 'left', alpha: kq });
  }
  // la cima
  const kc = life(t, T.cima + .2, T.piano + .3, .4, .4);
  if (kc > 0) { const c = pr(0, 0, 9); dot(ctx, c, C.v, kc, 9); drawRich(ctx, '{mink:z = 9}', c[0] - 24, c[1] - 30, { size: 40, align: 'right', alpha: kc }); }
  // le formule, in alto a destra (lì il piano non arriva)
  const L1 = 905, y1 = 165, y2 = 228;
  const f1 = (s, a, b, local) => { const al = life(t, a, b, .4, .4); if (al > .01) drawRich(ctx, s, L1, y1, { size: 42, alpha: al, local }); };
  const f2 = (s, a, b, size = 42) => { const al = life(t, a, b, .4, .4); if (al > .01) drawRich(ctx, s, L1, y2, { size, alpha: al }); };
  f1('{mink:z = 9 − x² − y²}', T.esempio + .3, T.taglio + .3);
  f2('{mink:9 − 1 − 4 = 4}', T.punto + .3, T.collina + .3);
  f2('{dim:piano} {mink:z = 8}', T.piano + .3, T.taglio + .3);
  f1('{mink:9 − x² − y² = 8}', T.taglio + .3, T.generale + .3);
  f2('{mink:x² + y² = 1}', T.taglio + .5, T.generale + .3);
  f1('{mink:x² + y² = 9 − }{mv:k}', T.generale + .3, T.ecco + .3);
  f2('{dim:raggio} {mink:√(9 − }{mv:k}{mink:)}', T.generale + .5, TAGLIO[1]);
  for (let i = 1; i < 5; i++) f2('{mv:k = ' + LIV[i] + '}{dim:, raggio} {mink:' + RAGGI[i] + '}', TAGLIO[i], i < 4 ? TAGLIO[i + 1] : T.ecco + .3, 36);
  ctx.restore();
}

// la mappa: il piano xy visto dall'alto
function anello(ctx, r0, r1, col, al) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .2);
  ctx.beginPath(); ctx.arc(MX, MY, r1 * MU, 0, 2 * Math.PI); ctx.arc(MX, MY, r0 * MU, 0, 2 * Math.PI, true); ctx.fill(); ctx.restore();
}
function sceneMappa(ctx, t) {
  if (t < T.mappa || t > FINE + .2) return;
  const al = life(t, T.mappa, FINE + .1, .5, .7);
  card(ctx, ...CM, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mink:z = 9 − x² − y²}', MX, 152, { size: 42 });
  // quadretti e assi (senza numeri: le circonferenze ci passerebbero sopra)
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -3; i <= 3; i++) {
    if (!i) continue;
    ctx.beginPath(); ctx.moveTo(MX + i * MU, MY - MP * MU); ctx.lineTo(MX + i * MU, MY + ME * MU); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(MX - ME * MU, MY - i * MU); ctx.lineTo(MX + MP * MU, MY - i * MU); ctx.stroke();
  }
  // le fasce: larga in alto (da 8 a 6), stretta in basso (da 2 a 0)
  anello(ctx, 1, RL[1], C.g, P(t, T.larghe + .3, T.larghe + .9));
  anello(ctx, RL[3], 3, C.r, P(t, T.fitte + .3, T.fitte + .9));
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(MX - ME * MU, MY); ctx.lineTo(MX + MP * MU, MY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(MX, MY + ME * MU); ctx.lineTo(MX, MY - MP * MU); ctx.stroke();
  arrowHead(ctx, [MX + MP * MU + 6, MY], 0, C.ink); arrowHead(ctx, [MX, MY - MP * MU - 6], -Math.PI / 2, C.ink);
  drawRich(ctx, '{mx:x}', MX + MP * MU + 28, MY + 26, { size: 44 });
  drawRich(ctx, '{my:y}', MX + 30, MY - MP * MU + 4, { size: 44 });
  // le curve di livello arrivate, con la loro quota
  LIV.forEach((lv, i) => {
    const k = P(t, VOLO[i] + DVOLO - .05, VOLO[i] + DVOLO + .15);
    if (k <= 0) return;
    ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.globalAlpha *= k;
    ctx.beginPath(); ctx.arc(MX, MY, RL[i] * MU, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    const p = ET[i];
    drawRich(ctx, '{v:' + lv + '}', p[0], p[1], { size: 30, weight: 600, alpha: P(t, VOLO[i] + DVOLO, VOLO[i] + DVOLO + .4) });
  });
  // la strada fra due curve: lunga in alto, corta in basso
  const kb = P(t, T.strada + .3, T.strada + 1.0), ab = -55 * Math.PI / 180, ca = Math.cos(ab), sa = Math.sin(ab);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.lineCap = 'round'; ctx.lineWidth = 8;
    ctx.strokeStyle = css(C.g); ctx.beginPath(); ctx.moveTo(MX + 1.06 * MU * ca, MY - 1.06 * MU * sa); ctx.lineTo(MX + (RL[1] - .06) * MU * ca, MY - (RL[1] - .06) * MU * sa); ctx.stroke();
    ctx.strokeStyle = css(C.r); ctx.beginPath(); ctx.moveTo(MX + (RL[3] + .06) * MU * ca, MY - (RL[3] + .06) * MU * sa); ctx.lineTo(MX + 2.94 * MU * ca, MY - 2.94 * MU * sa); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}
// le fette in volo: dall'ellisse dello spazio alla circonferenza della mappa
function sceneVolo(ctx, t) {
  LIV.forEach((lv, i) => {
    const k = P(t, VOLO[i], VOLO[i] + DVOLO, E.io);
    if (k <= 0 || k >= 1) return;
    const r = RL[i], c3 = pr(0, 0, lv);
    const cx = lerp(c3[0], MX, k), cy = lerp(c3[1], MY, k), a = lerp(S * r, MU * r, k), b = lerp(S * r * Math.sin(PH), MU * r, k);
    ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.shadowColor = css(C.v, .6); ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  });
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le curve di livello sono le fette\na quota costante, viste dall’alto.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'curva di livello', '{mink:9 − x² − y² = }{mv:k}'], [960, 'curve fitte', '{r:ripida}'], [1450, 'curve distanti', '{g:dolce}']];
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

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue la quota del piano
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7],                                                   // il pavimento, gli assi
    ['tono', T.funzione + .6, T.funzione + 1.3, [.1, .45]], ['tono', T.funzione + 1.2, T.funzione + 1.9, [.1, .8]],
    ['tono', T.funzione + 1.8, T.funzione + 2.5, [.1, .25]],
    ['pop', T.esempio + .3, .5],                                                              // la formula
    ['tono', T.punto + .4, T.punto + 1.2, [.1, .45]], ['pop', T.punto + 1.2, .45],            // l'altezza in (1; 2)
    ['soffio', T.collina + .2],                                                               // la collina
    ['pop', T.cima + .2, 1],                                                                  // la cima
    ['soffio', T.piano + .3], ['pop', T.piano + .5, .9],                                      // il piano z = 8
    ['traccia', T.taglio + .3, T.taglio + .8], ['pop', T.taglio + .5, .6],                    // il taglio
    ['soffio', T.mappa], ['tono', VOLO[0], VOLO[0] + DVOLO, [.9, .5, .3]], ['ding', VOLO[0] + DVOLO],
    ['pop', T.generale + .3, .5],
    ['tono', T.q6, T.q6 + .7, [.9, .7]], ['tono', VOLO[1], VOLO[1] + DVOLO, [.7, .3]], ['pop', VOLO[1] + DVOLO, .5],
    ['tono', T.q4, T.q4 + .7, [.7, .5]], ['tono', VOLO[2], VOLO[2] + DVOLO, [.5, .3]], ['pop', VOLO[2] + DVOLO, .4],
    ['tono', T.q2, T.q2 + .7, [.5, .3]], ['tono', VOLO[3], VOLO[3] + DVOLO, [.3, .25]], ['pop', VOLO[3] + DVOLO, .3],
    ['tono', T.q0, T.q0 + .7, [.3, .1]], ['tono', VOLO[4], VOLO[4] + DVOLO, [.1, .2]], ['ding', VOLO[4] + DVOLO],
    ['soffio', T.ecco],
    ['pop', T.larghe + .3, .8], ['pop', T.fitte + .3, .2],                                    // le fasce
    ['traccia', T.strada + .3, T.strada + 1.0],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'La mappa dei sentieri', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.piano - .2, 'la collina'], [T.piano - .2, T.ecco - .2, 'le fette'], [T.ecco - .2, FINE, 'leggere la mappa']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSpazio(ctx, t); sceneMappa(ctx, t); sceneVolo(ctx, t); sceneFine(ctx, t); },
  };
});
