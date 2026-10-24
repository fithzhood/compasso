'use strict';
/* Una matrice muove il piano — la matrice (2 1; 1 3) manda (1; 0) nella prima colonna (2; 1) e (0; 1) nella seconda
   (1; 3); la quadrettatura si deforma restando a righe dritte, parallele ed equidistanti, l'origine resta ferma.
   Il punto (1; 1) va in (2; 1) + (1; 3) = (3; 4); in generale (x; y) va in (2x + y; x + 3y), e con la matrice
   (a b; c d) in (ax + by; cx + dy). Matrici fra parentesi tonde come nei libri italiani.
   Argomento: matrici (non c'è ancora: sezione «Matrici e trasformazioni del piano»). */
CVIDEO.registra('matrici/muovere-il-piano', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, dot, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['matrice', 5.4, 'Questa è una {v:matrice}:\ndue righe e due colonne.'],
  ['colonne', 6.0, 'Le sue colonne: {x:(2; 1)} è la prima,\n{y:(1; 3)} è la seconda.'],
  ['frecce', 6.4, 'Nel piano, due frecce: una arriva\nin {x:(1; 0)}, l’altra in {y:(0; 1)}.'],
  ['punto', 4.6, 'E il punto {g:(1; 1)}:\ndove andrà?'],
  ['e1', 6.2, 'La matrice manda {x:(1; 0)}\nnella prima colonna, {x:(2; 1)}…'],
  ['e2', 5.4, '…e {y:(0; 1)} nella seconda, {y:(1; 3)}.'],
  ['tutto', 6.0, 'Il resto del piano segue:\nla {v:quadrettatura} si deforma.'],
  ['arriva', 6.8, 'Il punto {g:(1; 1)} finisce in {g:(3; 4)},\ncioè {x:(2; 1)} + {y:(1; 3)}.'],
  ['righe', 6.2, 'Le righe restano {g:dritte} e {g:parallele},\nalla stessa distanza fra loro.'],
  ['origine', 4.6, 'E l’{g:origine} resta ferma.'],
  ['regola', 6.8, 'Ogni punto {mink:(}{mx:x}{mink:; }{my:y}{mink:)} va in\n{mink:(2}{mx:x}{mink: + }{my:y}{mink:; }{mx:x}{mink: + 3}{my:y}{mink:)}.', .3],
  ['generale', 7.4, 'Con le lettere {mink:a}, {mink:b}, {mink:c}, {mink:d} al posto\ndei numeri: {mink:(a}{mx:x}{mink: + b}{my:y}{mink:; c}{mx:x}{mink: + d}{my:y}{mink:)}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Quattro numeri in una tabella\npossono muovere tutto il piano?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Le colonne dicono dove vanno (1; 0)\ne (0; 1): il resto del piano segue.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.punto, 'pensa'], [T.punto + 2.4, 'neutro'], [T.tutto + .6, 'sorpreso'], [T.tutto + 3.0, 'neutro'],
  [T.arriva, 'festa'], [T.arriva + 2.6, 'neutro'], [T.righe + 1.0, 'felice'], [T.righe + 3.4, 'neutro'],
  [T.generale + 1.0, 'felice'], [T.generale + 3.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// una matrice 2×2 fra parentesi tonde; evid = [k prima colonna, k seconda colonna] la colora
function matrice(ctx, cx, cy, el, size, al = 1, evid) {
  if (al <= 0) return;
  const dx = size * 1.5, dy = size * 1.3, hh = dy / 2 + size * .66;
  ctx.save(); ctx.globalAlpha *= al;
  if (evid) [C.x, C.y].forEach((col, j) => {
    if (evid[j] <= 0) return;
    ctx.save(); ctx.globalAlpha *= evid[j]; ctx.fillStyle = css(col, .12);
    ctx.beginPath(); ctx.roundRect(cx + (j - .5) * dx - size * .62, cy - hh + size * .12, size * 1.24, 2 * hh - size * .24, 14); ctx.fill(); ctx.restore();
  });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) drawRich(ctx, el[r][c], cx + (c - .5) * dx, cy + (r - .5) * dy, { size });
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(3, size * .06); ctx.lineCap = 'round';
  const xl = cx - dx / 2 - size * .82, xr = cx + dx / 2 + size * .82, w = size * .2;
  ctx.beginPath(); ctx.moveTo(xl + w, cy - hh); ctx.quadraticCurveTo(xl - w, cy, xl + w, cy + hh); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xr - w, cy - hh); ctx.quadraticCurveTo(xr + w, cy, xr - w, cy + hh); ctx.stroke();
  ctx.restore();
}
const NUM = (k0, k1) => [['{' + (k0 ? 'mx' : 'mink') + ':2}', '{' + (k1 ? 'my' : 'mink') + ':1}'], ['{' + (k0 ? 'mx' : 'mink') + ':1}', '{' + (k1 ? 'my' : 'mink') + ':3}']];
const LETT = [['{mx:a}', '{my:b}'], ['{mx:c}', '{my:d}']];

// il piano: quadretti fermi e sbiaditi sotto, la quadrettatura che si deforma sopra
const RQ = [70, 110, 990, 690];
const PL = { ox: 330, oy: 650, u: 100 };
const S = (x, y) => [PL.ox + x * PL.u, PL.oy - y * PL.u];
const MAT = [[2, 1], [1, 3]];
const Ms = s => [[1 + s * (MAT[0][0] - 1), s * MAT[0][1]], [s * MAT[1][0], 1 + s * (MAT[1][1] - 1)]];
const app = (m, x, y) => [m[0][0] * x + m[0][1] * y, m[1][0] * x + m[1][1] * y];
const kDef = t => P(t, T.tutto + .5, T.tutto + 3.5);
function freccia(ctx, a, b, col, al = 1) {
  if (al <= 0) return;
  const pa = S(a[0], a[1]), pb = S(b[0], b[1]), ang = Math.atan2(pb[1] - pa[1], pb[0] - pa[0]);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0] - 12 * Math.cos(ang), pb[1] - 12 * Math.sin(ang)); ctx.stroke();
  arrowHead(ctx, pb, ang, col, 1.3); ctx.restore();
}
function righe(ctx, m, col, al, w) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w;
  ctx.beginPath();
  for (let i = -12; i <= 12; i++) {
    let a = S(...app(m, i, -12)), b = S(...app(m, i, 12)); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
    a = S(...app(m, -12, i)); b = S(...app(m, 12, i)); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
  }
  ctx.stroke(); ctx.restore();
}
function assiDeformati(ctx, m, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.lineWidth = 3.5;
  [[C.x, 1, 0], [C.y, 0, 1]].forEach(([col, x, y]) => {
    const a = S(...app(m, -12 * x, -12 * y)), b = S(...app(m, 12 * x, 12 * y));
    ctx.strokeStyle = css(col, .75); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  });
  ctx.restore();
}
function scenePiano(ctx, t) {
  if (t < T.frecce - .3 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.frecce - .3, T.frecce + .4) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, ...RQ);
  ctx.save(); ctx.beginPath(); ctx.roundRect(RQ[0] + 2, RQ[1] + 2, RQ[2] - 4, RQ[3] - 4, 20); ctx.clip();
  // i quadretti fermi e gli assi, sbiaditi
  righe(ctx, Ms(0), C.grid, 1, 2);
  ctx.save(); ctx.strokeStyle = css(C.ink, .45); ctx.lineWidth = 2.5; ctx.beginPath();
  ctx.moveTo(RQ[0], PL.oy); ctx.lineTo(RQ[0] + RQ[2], PL.oy); ctx.moveTo(PL.ox, RQ[1]); ctx.lineTo(PL.ox, RQ[1] + RQ[3]); ctx.stroke(); ctx.restore();
  // la quadrettatura che si deforma
  const s = kDef(t), m = Ms(s);
  const kG = P(t, T.tutto, T.tutto + .4), kR = life(t, T.righe + .3, T.righe + 5.6, .4, .5);
  righe(ctx, m, C.v, kG * (.5 + .4 * kR), 2.2 + 1.3 * kR);
  assiDeformati(ctx, m, kG);
  ctx.restore();
  // le due frecce: crescono, poi le punte vanno nelle colonne
  const k1 = P(t, T.e1 + .4, T.e1 + 1.8), k2 = P(t, T.e2 + .4, T.e2 + 1.8);
  const g1 = P(t, T.frecce + .3, T.frecce + .9), g2 = P(t, T.frecce + .7, T.frecce + 1.3);
  freccia(ctx, [0, 0], [lerp(0, lerp(1, 2, k1), g1), lerp(0, k1, g1)], C.x);
  freccia(ctx, [0, 0], [lerp(0, k2, g2), lerp(0, lerp(1, 3, k2), g2)], C.y);
  // l'origine
  dot(ctx, S(0, 0), C.ink, P(t, T.frecce + .2, T.frecce + .5), 9);
  const kO = life(t, T.origine + .2, T.origine + 4.4, .4, .5);
  if (kO > 0) {
    ctx.save(); ctx.globalAlpha *= kO; ctx.strokeStyle = css(C.g); ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(PL.ox, PL.oy, 24 + 6 * Math.sin((t - T.origine) * 5), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  // il punto (1; 1), trascinato dalla quadrettatura
  const pP = app(m, 1, 1);
  dot(ctx, S(pP[0], pP[1]), C.g, P(t, T.punto + .3, T.punto + .7, E.back), 11);
  // le etichette: prima della deformazione accanto alle punte, dopo dentro i quadretti (nessuna riga le attraversa)
  const prima = 1 - P(t, T.tutto, T.tutto + .3), dopo = P(t, T.arriva + .2, T.arriva + .7);
  const L = (s2, x, y, al) => { const p = S(x, y); lab(ctx, s2, p[0], p[1], al); };
  L('{x:(1; 0)}', 1, -.42, P(t, T.frecce + .7, T.frecce + 1.1) * (1 - P(t, T.e1 + .3, T.e1 + .6)));
  L('{y:(0; 1)}', -.68, 1, P(t, T.frecce + 1.1, T.frecce + 1.5) * (1 - P(t, T.e2 + .3, T.e2 + .6)));
  L('{g:(1; 1)}', 1.75, 1.45, P(t, T.punto + .5, T.punto + .9) * prima);
  L('{x:(2; 1)}', 2.7, .75, P(t, T.e1 + 1.6, T.e1 + 2.0) * prima);
  L('{y:(1; 3)}', 1.75, 3.05, P(t, T.e2 + 1.6, T.e2 + 2.0) * prima);
  L('{x:(2; 1)}', 1.3, 1.4, dopo);
  L('{y:(1; 3)}', 1.55, 2.15, dopo);
  L('{g:(3; 4)}', 2.35, 4.55, dopo);
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Una matrice muove il piano', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la scheda della matrice: al centro, poi a destra quando arriva il piano
const SCH0 = [560, 150, 800, 540], SCH1 = [1090, 110, 770, 690];
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  const km = P(t, T.frecce - .3, T.frecce + .5);
  const [x, y, w, h] = SCH0.map((v, i) => lerp(v, SCH1[i], km));
  card(ctx, x, y, w, h, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  const XC = x + w / 2;
  const kc = P(t, T.colonne + .3, T.colonne + .8), kg = P(t, T.generale + .2, T.generale + .7);
  const my = lerp(y + 210, y + 150, km), ms = lerp(76, 60, km);
  // la matrice con i numeri, poi con le lettere
  matrice(ctx, XC, my, NUM(kc > .5, kc > .5), ms, P(t, T.matrice + .3, T.matrice + .8) * (1 - kg), [kc, kc]);
  matrice(ctx, XC, my, LETT, ms, kg, [kg, kg]);
  // le colonne, mentre la scheda sta al centro
  const kn = kc * (1 - km);
  lab(ctx, '{x:prima colonna  (2; 1)}', XC, y + 410, kn, 40);
  lab(ctx, '{y:seconda colonna  (1; 3)}', XC, y + 470, P(t, T.colonne + .8, T.colonne + 1.3) * (1 - km), 40);
  // dove vanno i punti, con i numeri
  ctx.save(); ctx.globalAlpha *= 1 - kg;
  lab(ctx, '{x:(1; 0)}{mink:  →  }{x:(2; 1)}', XC, y + 330, P(t, T.e1 + 1.6, T.e1 + 2.0), 44);
  lab(ctx, '{y:(0; 1)}{mink:  →  }{y:(1; 3)}', XC, y + 405, P(t, T.e2 + 1.6, T.e2 + 2.0), 44);
  lab(ctx, '{g:(1; 1)}{mink:  →  }{g:(3; 4)}', XC, y + 480, P(t, T.arriva + .4, T.arriva + .8), 44);
  lab(ctx, '{mink:(}{mx:x}{mink:; }{my:y}{mink:)  →  (2}{mx:x}{mink: + }{my:y}{mink:; }{mx:x}{mink: + 3}{my:y}{mink:)}', XC, y + 590, P(t, T.regola + .4, T.regola + .9), 44);
  ctx.restore();
  // con le lettere
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg;
    lab(ctx, '{x:(1; 0)}{mink:  →  (}{mx:a}{mink:; }{mx:c}{mink:)}', XC, y + 330, 1, 44);
    lab(ctx, '{y:(0; 1)}{mink:  →  (}{my:b}{mink:; }{my:d}{mink:)}', XC, y + 405, 1, 44);
    lab(ctx, '{mink:(}{mx:x}{mink:; }{my:y}{mink:)  →  (a}{mx:x}{mink: + b}{my:y}{mink:; c}{mx:x}{mink: + d}{my:y}{mink:)}', XC, y + 520, P(t, T.generale + .8, T.generale + 1.3), 44);
    ctx.restore();
  }
  ctx.restore();
}

// in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le colonne della matrice dicono dove vanno\n(1; 0) e (0; 1): il resto del piano segue.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, null], [960, '{x:(1; 0)}{mink: → }{x:(2; 1)}\n{y:(0; 1)}{mink: → }{y:(1; 3)}'], [1450, 'righe {g:parallele}\norigine {g:ferma}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 225, 445, 450, 170);
    if (s) drawRich(ctx, s, x, 530, { size: 38, lh: 1.35 });
    else matrice(ctx, x, 530, NUM(true, true), 42, 1, [1, 1]);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza delle punte mentre salgono
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['pop', T.matrice + .3, .5],                         // la matrice
    ['pop', T.colonne + .3, .45], ['pop', T.colonne + .8, .6],                              // le colonne
    ['soffio', T.frecce - .3], ['traccia', T.frecce + .3, T.frecce + .9], ['traccia', T.frecce + .7, T.frecce + 1.3],
    ['pop', T.punto + .3, .55],                                                             // il punto (1; 1)
    ['tono', T.e1 + .4, T.e1 + 1.8, [.3, .45]], ['pop', T.e1 + 1.6, .45],                  // (1; 0) va in (2; 1)
    ['tono', T.e2 + .4, T.e2 + 1.8, [.45, .9]], ['pop', T.e2 + 1.6, .9],                   // (0; 1) va in (1; 3)
    ['soffio', T.tutto], ['tono', T.tutto + .5, T.tutto + 3.5, [.5, .6, .75, .95]],         // la quadrettatura si deforma
    ['ding', T.arriva + .4],                                                                // (1; 1) è in (3; 4)
    ['traccia', T.righe + .3, T.righe + 1.0], ['pop', T.origine + .2, .2],
    ['pop', T.regola + .4, .6], ['soffio', T.generale + .2], ['pop', T.generale + .8, .7],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Una matrice muove il piano', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.frecce - .2, 'righe e colonne'], [T.frecce - .2, T.tutto - .1, 'dove vanno le frecce'], [T.tutto - .1, FINE, 'tutto il piano']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
