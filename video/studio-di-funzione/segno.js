'use strict';
/* Il corridoio del grafico — il segno della funzione guida f(x) = (x + 1)(x − 2)/(x − 3): la tabella dei segni (valori
   critici −1, 2, 3; f: − 0 + 0 − ✗ +), poi sul piano, intervallo per intervallo, si ombreggia la metà dove il grafico
   non passa: sopra l'asse dove f < 0, sotto dove f > 0. Resta il corridoio; da sopra a sotto si passa negli zeri −1 e 2
   o saltando la retta x = 3. Segni rifatti con node. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/segno', M => {
  const { W, C, E, P, life, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['guida', 5.8, 'La funzione guida, col numeratore\nscomposto: {mink:(}{mx:x}{mink: + 1)(}{mx:x}{mink: − 2)}.'],
  ['zeri', 5.6, 'I fattori si annullano in {mink:−1}, {mink:2}\ne {mink:3}: li scrivo in alto, in fila.'],
  ['riga1', 5.8, 'Riga di {mx:x}{mink: + 1}: {r:−} prima di {mink:−1},\n{mink:0} sulla linea, {g:+} dopo.'],
  ['righe23', 6.6, 'Così per {mx:x}{mink: − 2}, che cambia in {mink:2},\ne per {mx:x}{mink: − 3}, che cambia in {mink:3}.'],
  ['risultato', 5.4, 'Riga di {mink:f}: in ogni spazio,\nla {v:regola dei segni} della colonna.'],
  ['zerof', 5.2, 'In {mink:−1} e in {mink:2} si annulla il\nnumeratore: lì {mink:f} vale {g:0}.'],
  ['croce', 5.2, 'In {mink:3} si annulla il denominatore:\nuna {r:croce}, lì {mink:f} non esiste.'],
  ['piano', 5.8, 'Sul piano c’è già la retta {mx:x}{mink: = 3}:\nsegno gli zeri, {mink:−1} e {mink:2}.', .3],
  ['int1', 5.8, 'Prima di {mink:−1}, {mink:f} è {r:negativa}: la curva\nsta sotto, ombreggio {v:sopra}.'],
  ['int2', 4.6, 'Fra {mink:−1} e {mink:2}, {mink:f} è {g:positiva}:\nombreggio {v:sotto}.'],
  ['int3', 4.0, 'Fra {mink:2} e {mink:3} è {r:negativa}:\nombreggio {v:sopra}.'],
  ['int4', 4.0, 'Dopo {mink:3} è {g:positiva}:\nombreggio {v:sotto}.'],
  ['corridoio', 5.2, 'Resta un {g:corridoio}: la curva\npuò stare solo nelle zone libere.'],
  ['porte', 5.2, 'Da sopra a sotto si passa solo\nin uno {g:zero}, o saltando la retta.'],
];
const T = {}, DD = {}, FUMETTI = [[2.3, 6.6, '{g:Sopra} o {r:sotto} l’asse {mx:x}:\ndove sta il grafico?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; DD[k] = d; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Ombreggio dove la curva non passa:\nresta il corridoio dove può stare.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.zerof + .4, 'felice'], [T.croce, 'sorpreso'], [T.piano, 'neutro'],
  [T.corridoio + .4, 'felice'], [T.porte + .2, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano di lavoro: la stessa finestra della pagina, x da −4 a 10 e y da −8 a 14 ----------
const X = x => 185 + (x + 4) * 59, Y = y => 545 - y * 28, S = (x, y) => [X(x), Y(y)];
const PCARD = [90, 110, 1010, 690], RCARD = [1140, 110, 690, 690];
// i numeri dell'asse x stanno sopra o sotto l'asse dove nelle tappe dello studio non passano né la curva né le rette
// (−4, −3, −2 e 2 sopra; il 3 a destra della retta x = 3); sull'asse y solo i multipli di 4, lontani dalla curva
const SOPRA = { '-4': 1, '-3': 1, '-2': 1, 2: 1 };
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -4; i <= 10; i++) { if (!i) continue; ctx.beginPath(); ctx.moveTo(X(i), Y(0) - (Y(0) - Y(14)) * k); ctx.lineTo(X(i), Y(0) + (Y(-8) - Y(0)) * k); ctx.stroke(); }
  for (let j = -8; j <= 14; j += 2) { if (!j) continue; ctx.beginPath(); ctx.moveTo(X(0) - (X(0) - X(-4)) * k, Y(j)); ctx.lineTo(X(0) + (X(10) - X(0)) * k, Y(j)); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(X(0) - (X(0) - X(-4.1)) * k, Y(0)); ctx.lineTo(X(0) + (X(10.15) - X(0)) * k, Y(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(X(0), Y(0) + (Y(-8.1) - Y(0)) * k); ctx.lineTo(X(0), Y(0) - (Y(0) - Y(14.2)) * k); ctx.stroke();
  arrowHead(ctx, [X(0) + (X(10.15) - X(0)) * k + 6, Y(0)], 0, C.ink);
  arrowHead(ctx, [X(0), Y(0) - (Y(0) - Y(14.2)) * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  for (let i = -4; i <= 10; i++) {
    if (!i) continue;
    const s = (i < 0 ? '−' : '') + Math.abs(i);
    if (i === 3) txt(ctx, s, X(3) + 12, Y(0) + 30, { size: 30, color: C.dim, align: 'left' });
    else txt(ctx, s, X(i), Y(0) + (SOPRA[i] ? -30 : 30), { size: 30, color: C.dim });
  }
  [-8, -4, 4, 8, 12].forEach(j => txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), X(0) - 14, Y(j), { size: 30, color: C.dim, align: 'right' }));
  drawRich(ctx, '{mx:x}', X(10.15) + 40, Y(0), { size: 44 });
  drawRich(ctx, '{my:y}', X(0) + 26, Y(14.2) - 6, { size: 44, align: 'left' });
  ctx.restore();
}
// la retta tratteggiata x = 3, da y = −8 a y = 14
function retta3(ctx, k, al = 1, w = 4) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = w; ctx.setLineDash([14, 12]);
  ctx.beginPath(); ctx.moveTo(X(3), Y(-8)); ctx.lineTo(X(3), Y(-8) + (Y(14) - Y(-8)) * k); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Il corridoio del grafico', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// ---------- la tabella dei segni, come sul quaderno ----------
// i valori critici in alto sopra una riga; ognuno sopra una linea verticale che attraversa tutta la tabella;
// a sinistra un fattore per riga, poi una seconda riga e il risultato; 0 sulla linea dove un fattore si annulla,
// ✗ rossa sulla linea dove si annulla il denominatore
const TB = { x0: 1170, x1: 1800, xl: 1370, lin: [1470, 1580, 1690], yv: 360, yh1: 396, righe: [446, 516, 586], yh2: 626, yr: 678, ytop: 334, ybot: 712 };
const MEZZI = [1420, 1525, 1635, 1745];
const VALORI = ['{mink:−1}', '{mink:2}', '{mink:3}'];
const RIGHE = [
  { et: '{mx:x}{mink: + 1}', segni: '−+++', zero: 0 },
  { et: '{mx:x}{mink: − 2}', segni: '−−++', zero: 1 },
  { et: '{mx:x}{mink: − 3}', segni: '−−−+', zero: 2 },
];
const RIS = { et: '{my:f(}{mx:x}{my:)}', segni: '−+−+' };
function linea(ctx, a, b, k, col = C.ink, w = 3) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col, .85); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); ctx.stroke(); ctx.restore();
}
function segno(ctx, s, x, y, al, col) {
  if (al <= 0) return;
  txt(ctx, s, x, y - 3, { size: 54, weight: 600, color: col || (s === '+' ? C.g : C.r), alpha: al });
}
function zeroSu(ctx, x, y, al) { lab(ctx, '{mink:0}', [x, y], al, 46); }
function croce(ctx, x, y, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 6; ctx.lineCap = 'round';
  const d = 17, k1 = P(k, 0, .5), k2 = P(k, .5, 1);
  ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x - d + 2 * d * k1, y - d + 2 * d * k1);
  if (k2 > 0) { ctx.moveTo(x + d, y - d); ctx.lineTo(x + d - 2 * d * k2, y - d + 2 * d * k2); }
  ctx.stroke(); ctx.restore();
}
// la colonna dell'intervallo i (0…3), evidenziata
function colonna(ctx, i, al) {
  if (al <= 0) return;
  const xa = i ? TB.lin[i - 1] : TB.xl, xb = i < 3 ? TB.lin[i] : TB.x1;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.v, .13);
  ctx.beginPath(); ctx.roundRect(xa + 3, TB.ytop - 4, xb - xa - 6, TB.ybot - TB.ytop + 8, 8); ctx.fill(); ctx.restore();
}
function tabella(ctx, t) {
  // i valori in alto e le linee
  linea(ctx, [TB.x0, TB.yh1], [TB.x1, TB.yh1], P(t, T.zeri + .3, T.zeri + 1.0));
  VALORI.forEach((v, i) => {
    lab(ctx, v, [TB.lin[i], TB.yv], P(t, T.zeri + .4 + i * .3, T.zeri + .8 + i * .3), 44);
    linea(ctx, [TB.lin[i], TB.ytop + 46], [TB.lin[i], TB.ybot], P(t, T.zeri + .9 + i * .3, T.zeri + 1.7 + i * .3), C.ink, 2.5);
  });
  // le righe dei fattori: x + 1 un segno alla volta, poi x − 2 e x − 3
  const tempi = [
    { l: T.riga1 + .3, s: [T.riga1 + .9, T.riga1 + 3.0, T.riga1 + 3.2, T.riga1 + 3.4], z: T.riga1 + 1.9 },
    { l: T.righe23 + .3, s: [T.righe23 + .6, T.righe23 + .8, T.righe23 + 1.5, T.righe23 + 1.7], z: T.righe23 + 1.2 },
    { l: T.righe23 + 3.2, s: [T.righe23 + 3.5, T.righe23 + 3.7, T.righe23 + 3.9, T.righe23 + 4.6], z: T.righe23 + 4.3 },
  ];
  RIGHE.forEach((R, r) => {
    const y = TB.righe[r], q = tempi[r];
    lab(ctx, R.et, [TB.x0 + 8, y], P(t, q.l, q.l + .4), 44, 'left');
    Array.from(R.segni).forEach((s, i) => segno(ctx, s, MEZZI[i], y, P(t, q.s[i], q.s[i] + .3), C.ink));
    zeroSu(ctx, TB.lin[R.zero], y, P(t, q.z, q.z + .3));
  });
  // la riga del risultato, sotto la seconda riga orizzontale
  linea(ctx, [TB.x0, TB.yh2], [TB.x1, TB.yh2], P(t, T.risultato + .2, T.risultato + .8));
  lab(ctx, RIS.et, [TB.x0 + 8, TB.yr], P(t, T.risultato + .3, T.risultato + .7), 44, 'left');
  Array.from(RIS.segni).forEach((s, i) => segno(ctx, s, MEZZI[i], TB.yr, P(t, T.risultato + 1.4 + i * .5, T.risultato + 1.7 + i * .5)));
  [0, 1].forEach(i => zeroSu(ctx, TB.lin[i], TB.yr, P(t, T.zerof + .6 + i * .3, T.zerof + .9 + i * .3)));
  croce(ctx, TB.lin[2], TB.yr, P(t, T.croce + .6, T.croce + 1.2));
}

// 1 · la scheda a destra: la funzione e la tabella (T.guida–FINE)
function sceneScheda(ctx, t) {
  if (t < T.guida || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RCARD, P(t, T.guida, T.guida + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'il segno di {mink:f}', 1485, 160, { size: 40, weight: 600, local: t - T.guida - .2 }));
  drawSeq(ctx, ['{my:f(}{mx:x}{my:) =}', { num: '{mink:(}{mx:x}{mink: + 1)(}{mx:x}{mink: − 2)}', den: '{mx:x}{mink: − 3}' }], 1485, 258, 46, { local: t - T.guida - .4 });
  // la colonna dell'intervallo di cui parla Ada
  ['int1', 'int2', 'int3', 'int4'].forEach((k, i) => colonna(ctx, i, life(t, T[k] + .2, T[k] + DD[k] + .05, .3, .3)));
  tabella(ctx, t);
  ctx.restore();
}

// 2 · il piano: c'è dall'inizio, con la retta x = 3 del dominio; poi gli zeri e le zone ombreggiate (T.guida–FINE)
// [da, a, sopra?, intervallo]: dove f < 0 si ombreggia sopra l'asse, dove f > 0 sotto
const ZONE = [[-4, -1, true, 'int1'], [-1, 2, false, 'int2'], [2, 3, true, 'int3'], [3, 10, false, 'int4']];
// il segno di f scritto nella zona libera di ogni intervallo
const SEGNI_PIANO = [['−', -2.5, -4], ['+', 1, 7], ['−', 2.28, -6.5], ['+', 6.5, 6]];
function zona(ctx, a, b, sopra, k, col, alfa) {
  if (k <= 0) return;
  const y0 = Y(0), y1 = sopra ? Y(14) : Y(-8);
  ctx.save(); ctx.fillStyle = css(col, alfa);
  ctx.fillRect(X(a), Math.min(y0, y0 + (y1 - y0) * k), X(b) - X(a), Math.abs(y1 - y0) * k);
  ctx.restore();
}
function sceneGrafico(ctx, t) {
  if (t < T.guida || t > FINE + .3) return;
  const al = life(t, T.guida + .3, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  // il corridoio: le zone libere si tingono appena di verde
  const kc = P(t, T.corridoio + .4, T.corridoio + 1.2);
  if (kc > 0) ZONE.forEach(([a, b, sopra]) => zona(ctx, a, b, !sopra, 1, C.g, .11 * kc));
  // le zone vietate (viola), una per fumetto, crescono dall'asse
  ZONE.forEach(([a, b, sopra, k]) => zona(ctx, a, b, sopra, P(t, T[k] + 1.6, T[k] + 2.5, E.out), C.v, .2));
  assi(ctx, P(t, T.guida + .5, T.guida + 1.3));
  retta3(ctx, P(t, T.guida + 1.3, T.guida + 2.1));
  lab(ctx, '{mx:x}{mv: = 3}', [X(3) - 14, Y(13)], P(t, T.guida + 1.9, T.guida + 2.3), 40, 'right');
  // il segno di f nella zona libera, con la sua zona vietata
  SEGNI_PIANO.forEach(([s, x, y], i) => segno(ctx, s, X(x), Y(y), P(t, T[ZONE[i][3]] + 1.0, T[ZONE[i][3]] + 1.4)));
  // gli zeri: le «porte» da sopra a sotto
  const kp = life(t, T.porte + .3, FINE, .4, .5);
  [-1, 2].forEach((x, i) => {
    dot(ctx, S(x, 0), C.y, P(t, T.piano + 2.6 + i * .5, T.piano + 3.0 + i * .5, E.back), 11);
    if (kp > 0) { ctx.save(); ctx.globalAlpha *= kp; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(X(x), Y(0), 15, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); }
  });
  // il «salto» oltre la retta x = 3: a sinistra la curva scende lungo la retta verso −∞,
  // a destra torna giù dall'alto; i due tratti restano nelle zone libere
  [[S(2.45, -2.4), S(2.86, -3.2), S(2.9, -7.3), 1.6], [S(3.1, 13.3), S(3.15, 7.2), S(3.95, 6.2), 2.4]].forEach(([p0, pc, p1, d]) => {
    const ks = P(t, T.porte + d, T.porte + d + 1.0);
    if (ks <= 0) return;
    const pts = [];
    for (let i = 0; i <= 30; i++) { const u = i / 30 * ks; pts.push([(1 - u) * (1 - u) * p0[0] + 2 * u * (1 - u) * pc[0] + u * u * p1[0], (1 - u) * (1 - u) * p0[1] + 2 * u * (1 - u) * pc[1] + u * u * p1[1]]); }
    ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
    const a = pts[pts.length - 1], b = pts[pts.length - 2];
    arrowHead(ctx, a, Math.atan2(a[1] - b[1], a[0] - b[0]), C.g, 1.1);
  });
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il segno lascia alla curva\nsolo un {g:corridoio}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[450, '{mink:f < 0}:\nombreggio {v:sopra}'], [960, '{mink:f > 0}:\nombreggio {v:sotto}'], [1470, 'si cambia lato:\nnegli {g:zeri} o in {mink:3}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 230, 435, 460, 140);
    drawRich(ctx, s, x, 505, { size: 38, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', T.guida], ['pop', T.guida + .5, .5],                                                  // la funzione guida
    ['traccia', T.zeri + .3, T.zeri + 1.0], ['pop', T.zeri + .4, .3], ['pop', T.zeri + .7, .5], ['pop', T.zeri + 1.0, .55],   // −1, 2, 3
    ['traccia', T.zeri + .9, T.zeri + 2.3],                                                          // le linee verticali
    ['pop', T.riga1 + .9, .2], ['pop', T.riga1 + 1.9, .5], ['pop', T.riga1 + 3.0, .7],               // − 0 +
    ['pop', T.righe23 + .6, .3], ['pop', T.righe23 + 1.5, .6], ['pop', T.righe23 + 3.5, .3], ['pop', T.righe23 + 4.6, .6],
    ['traccia', T.risultato + .2, T.risultato + .8],
    ['pop', T.risultato + 1.4, .25], ['pop', T.risultato + 1.9, .7], ['pop', T.risultato + 2.4, .25], ['pop', T.risultato + 2.9, .7],
    ['ding', T.zerof + .7], ['traccia', T.croce + .6, T.croce + 1.2],                                // gli zeri di f, la croce
    ['soffio', T.guida + .3], ['traccia', T.guida + .5, T.guida + 1.3], ['traccia', T.guida + 1.3, T.guida + 2.1],
    ['pop', T.piano + 2.7, .4], ['pop', T.piano + 3.2, .55],                                         // gli zeri sul piano
    ['tono', T.int1 + 1.6, T.int1 + 2.5, [.5, .9]], ['tono', T.int2 + 1.6, T.int2 + 2.5, [.5, .1]],   // le zone crescono dall'asse
    ['tono', T.int3 + 1.6, T.int3 + 2.5, [.5, .9]], ['tono', T.int4 + 1.6, T.int4 + 2.5, [.5, .1]],
    ['ding', T.corridoio + .5], ['pop', T.porte + .4, .5], ['tono', T.porte + 1.6, T.porte + 2.6, [.4, .05]], ['tono', T.porte + 2.4, T.porte + 3.4, [.95, .6]],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il corridoio del grafico', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.piano - .2, 'la tabella dei segni'], [T.piano - .2, FINE, 'sul piano']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
