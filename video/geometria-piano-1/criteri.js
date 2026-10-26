'use strict';
/* Tre pezzi bastano? — i pezzi arrivano dall'alto e si montano sulla base AB = 5. Con due lati e l'angolo fra loro (LAL),
   con un lato e i due angoli ai suoi estremi (ALA), con tre lati (LLL, gli archi del compasso) esce un triangolo solo;
   con tre angoli (50°, 60°, 70°) infiniti triangoli simili; con due lati e un angolo non compreso (5, 3,6 e 40° in A)
   l'arco di centro B taglia la semiretta due volte: due triangoli. Argomento: geometria-piano-1 (la teoria sta in
   geometria-piano-1). */
CVIDEO.registra('geometria-piano-1/criteri', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, txt, glowStroke, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['pezzi', 5.6, 'Prima prova: due lati, {x:5} e {y:4},\ne l’angolo fra loro, {v:50°}.'],
  ['costr', 5.6, 'Appoggio {mx:AB = 5}, apro l’angolo\nin {mink:A} e ci metto {my:AC = 4}.'],
  ['chiudo', 4.4, 'Il terzo lato è obbligato:\nunisco {mink:B} e {mink:C}.'],
  ['lal', 4.8, 'Un triangolo solo: è il criterio\n{v:LAL}, lato-angolo-lato.'],
  ['ala', 5.6, 'Ora un lato, {x:5}, e i due angoli\nai suoi estremi: {v:50°} e {y:60°}.', .6],
  ['incontro', 4.4, 'Le due semirette si incontrano\nin un punto solo.'],
  ['alaN', 4.0, 'È il criterio {v:ALA}:\nangolo-lato-angolo.'],
  ['lll', 4.4, 'Ora tre lati: {x:5}, {y:4} e {v:3,5}.', .6],
  ['archi', 5.2, 'Un arco a distanza {y:4} da {mink:A},\nuno a distanza {v:3,5} da {mink:B}.'],
  ['lllN', 4.6, 'Sopra {mink:AB} si tagliano in un punto\nsolo: criterio {v:LLL}.'],
  ['aaa', 4.6, 'E con tre angoli? {v:50°},\n{y:60°} e {g:70°}.', .6],
  ['cresce', 4.6, 'Il triangolo si ingrandisce,\nma gli angoli restano quelli.'],
  ['infiniti', 5.0, 'Triangoli {r:infiniti}: stessa forma,\nmisure diverse. {r:Non} sono congruenti.'],
  ['lla', 5.0, 'Ultima prova: lati {x:5} e {y:3,6},\nangolo di {v:40°}…', .6],
  ['noncomp', 5.4, '…ma l’angolo {r:non} sta fra i due lati:\nil lato {y:3,6} parte da {mink:B}.'],
  ['arco2', 5.0, 'Con il compasso centrato in {mink:B},\nl’arco taglia la semiretta {r:due volte}.'],
  ['due', 4.6, 'Due triangoli diversi,\ncon gli stessi tre pezzi.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Per avere un triangolo solo,\nbastano tre pezzi?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Tre pezzi bastano se sono quelli\ngiusti, come {v:LAL}, {v:ALA} o {v:LLL}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.lal, 'felice'], [T.lal + 2.2, 'neutro'], [T.alaN, 'felice'], [T.alaN + 2.0, 'neutro'],
  [T.lllN + 1.8, 'felice'], [T.aaa, 'pensa'], [T.cresce, 'neutro'], [T.infiniti, 'sorpreso'], [T.infiniti + 2.4, 'neutro'],
  [T.lla, 'pensa'], [T.noncomp, 'neutro'], [T.arco2 + 2.0, 'sorpreso'], [T.due + .4, 'neutro'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// la base AB = 5 sta in basso nella scheda di sinistra, 90 px per unità; i pezzi aspettano in alto
const RAD = Math.PI / 180, U = 90, OX = 230, OY = 740;
const S = (x, y) => [OX + U * x, OY - U * y];
const pol = (r, g) => [r * Math.cos(g * RAD), r * Math.sin(g * RAD)];   // in unità
const A0 = S(0, 0), B0 = S(5, 0);
// i vertici C delle costruzioni (conti ricontrollati con node)
const C_LAL = S(...pol(4, 50));                                          // ≈ (2,57; 3,06)
const AC_ALA = 5 * Math.sin(60 * RAD) / Math.sin(70 * RAD), BC_ALA = 5 * Math.sin(50 * RAD) / Math.sin(70 * RAD);   // ≈ 4,61 e 4,08
const C_ALA = S(...pol(AC_ALA, 50));
const XL3 = (16 - 12.25 + 25) / 10, YL3 = Math.sqrt(16 - XL3 * XL3);   // 2,875 e ≈ 2,78: a distanza 4 da A e 3,5 da B
const C_LLL = S(XL3, YL3), GA3 = Math.atan2(YL3, XL3) / RAD, GB3 = Math.atan2(YL3, XL3 - 5) / RAD;   // ≈ 44° e 127°
const DL = 5 * Math.sin(40 * RAD), HL = Math.sqrt(3.6 * 3.6 - DL * DL);    // distanza di B dalla semiretta ≈ 3,21 < 3,6
const AC2 = 5 * Math.cos(40 * RAD) + HL, AC1 = 5 * Math.cos(40 * RAD) - HL;   // ≈ 5,45 e 2,21
const C2 = S(...pol(AC2, 40)), C1 = S(...pol(AC1, 40));
const G2 = Math.atan2(OY - C2[1], C2[0] - B0[0]) / RAD, G1 = Math.atan2(OY - C1[1], C1[0] - B0[0]) / RAD;   // ≈ 103° e 157°

// posa di un pezzo da fotogrammi chiave [t, x, y, gradi, lato dell'etichetta], con passaggi morbidi
function posa(t, K) {
  if (t <= K[0][0]) return K[0].slice(1);
  for (let i = 1; i < K.length; i++) if (t < K[i][0]) {
    const a = K[i - 1], b = K[i], k = E.io(clamp((t - a[0]) / (b[0] - a[0])));
    return a.slice(1).map((v, j) => lerp(v, b[j + 1], k));
  }
  return K[K.length - 1].slice(1);
}
const dirC = g => [Math.cos(g * RAD), -Math.sin(g * RAD)];   // direzione sulla tela di un angolo in gradi (antiorario)
// un lato-pezzo lungo L unità, dalla posa [x, y, gradi, lato]: lato +1 = etichetta a sinistra, −1 = a destra
function pezzoLato(ctx, q, L, col, lab, al) {
  if (al <= 0) return;
  const [x, y, g, lato] = q, d = dirC(g), e = [x + d[0] * L * U, y + d[1] * L * U], n = dirC(g + 90);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C[col]); ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.restore();
  drawRich(ctx, '{' + col + ':' + lab + '}', (x + e[0]) / 2 + n[0] * 38 * lato, (y + e[1]) / 2 + n[1] * 38 * lato, { size: 44, alpha: al });
}
// un angolo-pezzo: vertice e semiretta di partenza dalla posa, apertura in gradi verso l'antiorario
function pezzoAngolo(ctx, q, ap, col, lab, al, R = 130) {
  if (al <= 0) return;
  const [x, y, g] = q, d1 = dirC(g), d2 = dirC(g + ap), m = dirC(g + ap / 2);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, 54, -g * RAD, -(g + ap) * RAD, true); ctx.closePath();
  ctx.fillStyle = css(C[col], .22); ctx.fill();
  ctx.strokeStyle = css(C[col]); ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(x, y, 54, -g * RAD, -(g + ap) * RAD, true); ctx.stroke();
  ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + d1[0] * R, y + d1[1] * R); ctx.lineTo(x, y); ctx.lineTo(x + d2[0] * R, y + d2[1] * R); ctx.stroke();
  ctx.restore();
  drawRich(ctx, '{' + col + ':' + lab + '}', x + m[0] * 104, y + m[1] * 104, { size: 40, alpha: al });
}
function seg(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// semiretta da p con angolo g, lunga L unità
function semiretta(ctx, p, g, L, col, al, w = 3.5) { const d = dirC(g); seg(ctx, p, [p[0] + d[0] * L * U, p[1] + d[1] * L * U], col, w, 1, al); }
function tri(ctx, pts, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.fillStyle = css(C[col], a); ctx.beginPath(); ctx.moveTo(...pts[0]); ctx.lineTo(...pts[1]); ctx.lineTo(...pts[2]); ctx.closePath(); ctx.fill(); ctx.restore();
}
// arco di centro c (tela), raggio r unità, da g1 a g2 gradi
function arco(ctx, c, r, g1, g2, col, al) {
  if (al <= 0 || g2 <= g1) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .85); ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
  ctx.beginPath(); ctx.arc(c[0], c[1], r * U, -g1 * RAD, -g2 * RAD, true); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };
function nomiAB(ctx, al, B = B0) { lab(ctx, '{mink:A}', [A0[0] - 30, A0[1] + 34], al); lab(ctx, '{mink:B}', [B[0] + 30, B[1] + 34], al); }
// finestra di una prova: entra con il suo primo fumetto, esce alla fine dell'ultimo
const finestra = (t, a, b) => P(t, a, a + .3) * (1 - P(t, b, b + .45));

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Tre pezzi bastano?', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la scheda delle costruzioni, a sinistra (7.5–FINE)
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2) * (1 - P(t, FINE - .6, FINE + .1)));
}

// 1 · LAL: due lati e l'angolo fra loro
function sceneLAL(ctx, t) {
  const a = T.pezzi, b = T.lal + 4.8, t1 = T.costr;
  if (t < a || t > b + .5) return;
  ctx.save(); ctx.globalAlpha *= finestra(t, a, b);
  tri(ctx, [A0, B0, C_LAL], 'g', .12 * P(t, T.lal + .2, T.lal + .8));
  // prima AB, poi l'angolo in A, poi AC: il lato 5 arriva quando l'etichetta 50° non è ancora lì
  pezzoLato(ctx, posa(t, [[t1 + .3, 110, 185, 0, -1], [t1 + 1.5, A0[0], A0[1], 0, -1]]), 5, 'x', '5', P(t, a + .4, a + .8));
  pezzoAngolo(ctx, posa(t, [[t1 + 1.7, 110, 320, 0], [t1 + 2.9, A0[0], A0[1], 0]]), 50, 'v', '50°', P(t, a + 2.9, a + 3.3));
  pezzoLato(ctx, posa(t, [[t1 + 3.1, 620, 185, 0, 1], [t1 + 4.3, A0[0], A0[1], 50, 1]]), 4, 'y', '4', P(t, a + 1.6, a + 2.0));
  // il terzo lato è obbligato
  seg(ctx, B0, C_LAL, C.g, 6, P(t, T.chiudo + .4, T.chiudo + 1.4));
  dot(ctx, C_LAL, C.ink, P(t, t1 + 4.2, t1 + 4.5, E.back), 8);
  nomiAB(ctx, P(t, t1 + 1.4, t1 + 1.8));
  lab(ctx, '{mink:C}', [C_LAL[0] + 6, C_LAL[1] - 44], P(t, t1 + 4.3, t1 + 4.7));
  ctx.restore();
}

// 2 · ALA: un lato e i due angoli ai suoi estremi
function sceneALA(ctx, t) {
  const a = T.ala, b = T.alaN + 4.0, t1 = T.incontro;
  if (t < a || t > b + .5) return;
  ctx.save(); ctx.globalAlpha *= finestra(t, a, b);
  tri(ctx, [A0, B0, C_ALA], 'g', .12 * P(t, T.alaN + .2, T.alaN + .8));
  // le semirette crescono dai due angoli fino a incontrarsi (e un po' oltre); poi l'avanzo sparisce
  const kR = P(t, t1 + .3, t1 + 1.8), oltre = 1 - P(t, t1 + 2.4, t1 + 3.0);
  if (kR > 0) {
    semiretta(ctx, A0, 50, lerp(1.45, AC_ALA + .8, kR), C.v, oltre);
    semiretta(ctx, B0, 120, lerp(1.45, BC_ALA + .8, kR), C.y, oltre);
  }
  const kS = P(t, t1 + 1.9, t1 + 2.6);
  seg(ctx, A0, C_ALA, C.g, 6, kS); seg(ctx, B0, C_ALA, C.g, 6, kS);
  pezzoLato(ctx, posa(t, [[a + 2.6, 110, 185, 0, -1], [a + 3.6, A0[0], A0[1], 0, -1]]), 5, 'x', '5', P(t, a + .5, a + .9));
  pezzoAngolo(ctx, posa(t, [[a + 3.4, 110, 320, 0], [a + 4.6, A0[0], A0[1], 0]]), 50, 'v', '50°', P(t, a + 2.9, a + 3.3));
  pezzoAngolo(ctx, posa(t, [[a + 3.4, 700, 320, 120], [a + 4.6, B0[0], B0[1], 120]]), 60, 'y', '60°', P(t, a + 3.9, a + 4.3));
  dot(ctx, C_ALA, C.ink, P(t, t1 + 1.8, t1 + 2.1, E.back), 8);
  nomiAB(ctx, P(t, a + 3.5, a + 3.9));
  lab(ctx, '{mink:C}', [C_ALA[0] + 6, C_ALA[1] - 44], P(t, t1 + 2.9, t1 + 3.3));
  ctx.restore();
}

// 3 · LLL: tre lati, con il compasso
const SA = [T.archi + 1.3, T.archi + 2.5], SB = [T.archi + 3.1, T.archi + 4.3];   // i due archi
function sceneLLL(ctx, t) {
  const a = T.lll, b = T.lllN + 4.6, t2 = T.lllN;
  if (t < a || t > b + .5) return;
  ctx.save(); ctx.globalAlpha *= finestra(t, a, b);
  tri(ctx, [A0, B0, C_LLL], 'g', .12 * P(t, t2 + 1.8, t2 + 2.4));
  const qA = posa(t, [[T.archi + .5, 620, 185, 0, 1], [SA[0], A0[0], A0[1], 15, 1], [SA[1], A0[0], A0[1], 95, 1], [t2 + .5, A0[0], A0[1], 95, 1], [t2 + 1.5, A0[0], A0[1], GA3, 1]]);
  const qB = posa(t, [[SA[1] - .2, 110, 300, 0, -1], [SB[0], B0[0], B0[1], 165, -1], [SB[1], B0[0], B0[1], 85, -1], [t2 + .5, B0[0], B0[1], 85, -1], [t2 + 1.5, B0[0], B0[1], GB3, -1]]);
  // gli archi seguono il braccio del compasso
  const kArchi = 1 - .85 * P(t, t2 + 1.2, t2 + 1.8);   // a triangolo fatto, gli archi si fanno da parte
  arco(ctx, A0, 4, 15, t < SA[0] ? 15 : t < SA[1] ? qA[2] : 95, C.y, kArchi);
  arco(ctx, B0, 3.5, t < SB[0] ? 165 : t < SB[1] ? qB[2] : 85, 165, C.v, kArchi);
  pezzoLato(ctx, posa(t, [[T.archi + .1, 110, 185, 0, -1], [T.archi + .9, A0[0], A0[1], 0, -1]]), 5, 'x', '5', P(t, a + .4, a + .8));
  pezzoLato(ctx, qA, 4, 'y', '4', P(t, a + 1.4, a + 1.8));
  pezzoLato(ctx, qB, 3.5, 'v', '3,5', P(t, a + 2.2, a + 2.6));
  dot(ctx, C_LLL, C.ink, P(t, t2 + .3, t2 + .6, E.back), 8);
  nomiAB(ctx, P(t, T.archi + .8, T.archi + 1.2));
  lab(ctx, '{mink:C}', [C_LLL[0] + 4, C_LLL[1] - 50], P(t, t2 + 1.5, t2 + 1.9));
  ctx.restore();
}

// 4 · tre angoli: il triangolo si ingrandisce, gli angoli restano 50°, 60°, 70°
const XC = AC_ALA * Math.cos(50 * RAD), YC = AC_ALA * Math.sin(50 * RAD);   // il triangolo 50°, 60°, 70° con AB = 5
const scala = t => .75 + .55 * P(t, T.cresce + .4, T.cresce + 4.0, E.io);
const OMBRE = [.75, .9];   // una terza copia, più grande, passerebbe accanto all’etichetta 70°
function sceneAAA(ctx, t) {
  const a = T.aaa, b = T.infiniti + 5.0;
  if (t < a || t > b + .5) return;
  ctx.save(); ctx.globalAlpha *= finestra(t, a, b);
  const k = scala(t), Bk = S(5 * k, 0), Ck = S(XC * k, YC * k);
  // le copie lasciate indietro mentre cresce
  const kO = P(t, T.infiniti + .2, T.infiniti + .8);   // le copie compaiono a crescita finita, quando Ada dice «infiniti»
  if (kO > 0) OMBRE.forEach(g => {
    ctx.save(); ctx.strokeStyle = css(C.dim, .7 * kO); ctx.lineWidth = 2.5; ctx.setLineDash([9, 8]);
    ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...S(5 * g, 0)); ctx.lineTo(...S(XC * g, YC * g)); ctx.closePath(); ctx.stroke(); ctx.restore();
  });
  const kT = P(t, a + 3.6, a + 4.4, E.lin);
  tri(ctx, [A0, Bk, Ck], 'v', .07 * kT);
  if (kT > 0) glowStroke(ctx, [A0, Bk, Ck, A0], kT, C.ink, 4);
  const kF = P(t, a + 2.9, a + 4.0, E.io), R = lerp(130, 100, kF);
  const vola = (home, V, g) => [lerp(home[0], V[0], kF), lerp(home[1], V[1], kF), lerp(home[2], g, kF)];
  pezzoAngolo(ctx, vola([110, 320, 0], A0, 0), 50, 'v', '50°', P(t, a + 1.5, a + 1.9), R);
  pezzoAngolo(ctx, vola([560, 320, 120], Bk, 120), 60, 'y', '60°', P(t, a + 2.0, a + 2.4), R);
  pezzoAngolo(ctx, vola([820, 200, 230], Ck, 230), 70, 'g', '70°', P(t, a + 2.5, a + 2.9), R);
  const kN = P(t, a + 4.0, a + 4.4);
  lab(ctx, '{mink:A}', [A0[0] - 30, A0[1] + 34], kN);
  lab(ctx, '{mink:B}', [Bk[0] + 30, Bk[1] + 34], kN);
  lab(ctx, '{mink:C}', [Ck[0] + 6, Ck[1] - 44], kN);
  ctx.restore();
}

// 5 · due lati e un angolo che non sta fra loro: l'arco di centro B taglia la semiretta due volte
const SW = [T.arco2 + .3, T.arco2 + 2.8];
function sceneLLA(ctx, t) {
  const a = T.lla, b = T.due + 4.6, t1 = T.noncomp;
  if (t < a || t > b + .5) return;
  ctx.save(); ctx.globalAlpha *= finestra(t, a, b);
  const kDue = P(t, T.due + .2, T.due + .8);
  tri(ctx, [A0, B0, C2], 'v', .10 * kDue); tri(ctx, [A0, B0, C1], 'g', .16 * kDue);
  const kR = P(t, t1 + 1.6, t1 + 2.6);
  if (kR > 0) semiretta(ctx, A0, 40, lerp(1.45, 6.6, kR), C.v, 1);
  const q = posa(t, [[t1 + 2.6, 620, 185, 0, -1], [t1 + 3.6, B0[0], B0[1], 70, -1], [SW[0], B0[0], B0[1], 70, -1], [SW[1], B0[0], B0[1], 162, -1]]);
  arco(ctx, B0, 3.6, 70, t < SW[0] ? 70 : t < SW[1] ? q[2] : 162, C.y, 1);
  pezzoLato(ctx, posa(t, [[t1 + .2, 110, 185, 0, -1], [t1 + 1.0, A0[0], A0[1], 0, -1]]), 5, 'x', '5', P(t, a + .4, a + .8));
  pezzoAngolo(ctx, posa(t, [[t1 + .8, 110, 320, 0], [t1 + 1.8, A0[0], A0[1], 0]]), 40, 'v', '40°', P(t, a + 3.0, a + 3.4));
  pezzoLato(ctx, q, 3.6, 'y', '3,6', P(t, a + 1.6, a + 2.0) * (1 - kDue));
  // i due lati lunghi 3,6, uno per triangolo
  seg(ctx, B0, C2, C.y, 6, 1, kDue); seg(ctx, B0, C1, C.y, 6, 1, kDue);
  const eti = (Cc) => { const g = Math.atan2(B0[1] - Cc[1], Cc[0] - B0[0]) / RAD, n = dirC(g - 90); return [(B0[0] + Cc[0]) / 2 + n[0] * 38, (B0[1] + Cc[1]) / 2 + n[1] * 38]; };
  lab(ctx, '{y:3,6}', eti(C2), kDue); lab(ctx, '{y:3,6}', eti(C1), kDue);
  // i due punti di taglio, appena il braccio del compasso ci passa
  const g = t < SW[0] ? 0 : q[2];
  dot(ctx, C2, C.ink, clamp((g - G2) / 5), 9);
  dot(ctx, C1, C.ink, clamp((g - G1) / 5), 9);
  nomiAB(ctx, P(t, t1 + .9, t1 + 1.3));
  ctx.restore();
}

// la scheda a destra: quanti triangoli escono con ogni terna di pezzi (i colori si leggono a ogni fotogramma: tema)
const RIGHE = [
  [T.lal + .4, 'LAL', 'due lati e l’angolo fra loro', 'uno', 'g'],
  [T.alaN + .4, 'ALA', 'due angoli e il lato fra loro', 'uno', 'g'],
  [T.lllN + 2.0, 'LLL', 'i tre lati', 'uno', 'g'],
  [T.infiniti + .4, '', 'i tre angoli', 'infiniti', 'r'],
  [T.due + .4, '', 'angolo non fra i due lati', 'a volte due', 'r'],
];
function sceneTabella(ctx, t) {
  if (t < T.lal || t > FINE + .2) return;
  const la = P(t, T.lal, T.lal + .5) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'quanti triangoli?', 1450, 172, { size: 40, weight: 600 }));
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 1.5;
  for (let i = 0; i < 4; i++) { const y = 270 + i * 105 + 52; ctx.beginPath(); ctx.moveTo(1080, y); ctx.lineTo(1820, y); ctx.stroke(); }
  RIGHE.forEach(([a, nome, desc, quanti, col], i) => {
    const y = 270 + i * 105, k = P(t, a, a + .5);
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    if (nome) drawRich(ctx, '{v:' + nome + '}', 1080, y, { size: 40, weight: 600, align: 'left' });
    txt(ctx, desc, nome ? 1180 : 1080, y, { size: 30, align: 'left' });   // senza sigla, la descrizione parte dalla colonna delle sigle
    drawRich(ctx, '{' + col + ':' + quanti + '}', 1825, y, { size: quanti.length > 8 ? 40 : 44, weight: 600, align: 'right' });
    ctx.restore();
  });
  ctx.restore();
}

// 6 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Tre pezzi bastano, ma devono essere\nquelli giusti, come {v:LAL}, {v:ALA} o {v:LLL}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, 500, '{v:LAL}, {v:ALA}, {v:LLL}:\n{g:un triangolo solo}'], [980, 400, 'tre angoli:\n{r:infiniti}'], [1470, 480, 'angolo non compreso:\n{r:a volte due}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 445, w, 150);
    drawRich(ctx, s, x, 520, { size: 36, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): i pezzi che scendono al loro posto fanno un tono che cala
  // istante in cui il braccio del compasso passa per l'angolo K (stessa curva di E.io, scritta qui perché i suoni si leggono senza motore)
  const io = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const quando = K => { for (let s = SW[0]; s <= SW[1]; s += .02) if (70 + 92 * io(Math.max(0, Math.min(1, (s - SW[0]) / (SW[1] - SW[0])))) >= K) return +s.toFixed(2); return SW[1]; };
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.9],
    ['pop', T.pezzi + .4, .4], ['pop', T.pezzi + 1.6, .5], ['pop', T.pezzi + 2.9, .6],              // LAL: i tre pezzi
    ['tono', T.costr + .3, T.costr + 4.3, [.75, .2, .7, .2, .75, .2]],                              // scendono al loro posto
    ['traccia', T.chiudo + .4, T.chiudo + 1.4], ['pop', T.chiudo + 1.3, .7],                       // il terzo lato, C
    ['ding', T.lal + .4],                                                                           // un triangolo solo
    ['pop', T.ala + .5, .4], ['pop', T.ala + 2.9, .5], ['pop', T.ala + 3.9, .6],                    // ALA: i pezzi
    ['tono', T.ala + 2.6, T.ala + 4.6, [.8, .4, .6, .1]],
    ['traccia', T.incontro + .3, T.incontro + 1.8], ['pop', T.incontro + 1.8, .8],                 // le semirette, C
    ['ding', T.alaN + .4],
    ['pop', T.lll + .4, .4], ['pop', T.lll + 1.4, .5], ['pop', T.lll + 2.2, .6],                    // LLL: i tre lati
    ['tono', SA[0], SA[1], [.35, .55, .75, .8]], ['tono', SB[0], SB[1], [.3, .5, .7, .75]],         // gli archi del compasso
    ['pop', T.lllN + .3, .8], ['ding', T.lllN + 2.0],
    ['pop', T.aaa + 1.5, .4], ['pop', T.aaa + 2.0, .5], ['pop', T.aaa + 2.5, .6],                   // tre angoli
    ['traccia', T.aaa + 3.6, T.aaa + 4.4],
    ['tono', T.cresce + .4, T.cresce + 4.0, [.2, .35, .6, .85, .9]], ['pop', T.infiniti + .4, .5],  // cresce: infiniti
    ['pop', T.lla + .4, .4], ['pop', T.lla + 1.6, .5], ['pop', T.lla + 3.0, .6],                    // l'angolo non compreso
    ['traccia', T.noncomp + 1.6, T.noncomp + 2.6],                                                  // la semiretta da A
    ['tono', SW[0], SW[1], [.3, .55, .75, .8, .7]], ['pop', quando(G2), .8], ['pop', quando(G1), .6],   // l'arco taglia due volte
    ['pop', T.due + .4, .5],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Tre pezzi bastano?', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.ala - .3, 'due lati e l’angolo'], [T.ala - .3, T.lll - .3, 'un lato e due angoli'], [T.lll - .3, T.aaa - .3, 'tre lati'],
      [T.aaa - .3, T.lla - .3, 'tre angoli'], [T.lla - .3, FINE, 'l’angolo non compreso']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneScheda(ctx, t); sceneLAL(ctx, t); sceneALA(ctx, t); sceneLLL(ctx, t); sceneAAA(ctx, t); sceneLLA(ctx, t); sceneTabella(ctx, t); sceneFine(ctx, t); },
  };
});
