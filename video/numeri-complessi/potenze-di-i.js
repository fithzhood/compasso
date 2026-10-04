'use strict';
/* i e le sue potenze — i² = −1; nel piano di Gauss le potenze di i girano di un quarto di giro alla volta:
   1, i, −1, −i, e poi di nuovo (periodo 4). Argomento: numeri-complessi. */
CVIDEO.registra('numeri-complessi/potenze-di-i', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, richW, txt, dot, glowStroke, arrowHead, card } = M;

const FINE = 90.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [17.0, 'sorpreso'], [19.0, 'neutro'],
  [39.3, 'felice'], [41.5, 'neutro'], [45.4, 'sorpreso'], [47.5, 'neutro'], [56.7, 'festa'], [59.0, 'neutro'],
  [66.1, 'felice'], [68.5, 'neutro'], [71.6, 'pensa'], [75.5, 'neutro'], [82.0, 'felice'], [84.2, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; i giri avvengono fra un fumetto e l'altro, e mentre Ada parla il punto è fermo
const FUMETTI = [
  [2.0, 6.4, 'Quale numero, elevato al quadrato,\ndà {mink:−1}?'],
  // 1 · il numero i
  [7.9, 12.4, 'Ecco i numeri reali, in fila\nsull\'asse {v:Re}, l\'asse reale.'],
  [12.5, 16.9, 'Nessun quadrato reale è negativo:\n{mink:x² = −1} non ha soluzioni reali.'],
  [17.0, 20.8, 'Allora si aggiunge un numero nuovo,\n{mv:i}: l\'{v:unità immaginaria}.'],
  [20.9, 25.15, '{mv:i} è il numero con {mv:i²}{mink: = −1}.\nNon è un numero reale.'],
  [25.2, 29.75, '{mv:i} non sta sull\'asse reale: serve\nun asse nuovo, {v:Im}, l\'immaginario.'],
  // 2 · le potenze
  [30.0, 34.3, 'Ora calcolo le {v:potenze} di {mv:i}.\nSi parte da {mv:i⁰}{mink: = 1}.'],
  [34.4, 37.9, 'Ogni potenza è la precedente\nmoltiplicata per {mv:i}.'],
  [39.3, 43.9, '{mv:i¹}{mink: = }{mv:i}: il punto ha fatto\nun {v:quarto di giro} in senso antiorario.'],
  [45.4, 49.7, '{mv:i²}{mink: = −1}: un altro quarto di giro.\nTorna sull\'asse reale, a sinistra.'],
  [51.2, 55.2, '{mv:i³}{mink: = −}{mv:i}, perché {mv:i²}{mink: · }{mv:i}{mink: = −}{mv:i}.\nUn altro quarto di giro.'],
  [56.7, 60.8, '{mv:i⁴}{mink: = 1}: giro completo,\nsi torna al punto di partenza!'],
  [62.3, 66.0, '{mv:i⁵}{mink: = }{mv:i}: si riparte,\ne i valori si {v:ripetono}.'],
  [66.1, 71.2, 'Le potenze di {mv:i} hanno {g:periodo 4}:\n{mink:1}, {mv:i}, {mink:−1}, {mink:−}{mv:i}, e poi di nuovo.'],
  // 3 · esponenti grandi
  [71.6, 75.4, '{mv:i²³}: 23 quarti di giro.\nDivido per 4: {mink:23 = 4 · 5 + 3}.'],
  [75.5, 80.0, '4 quarti fanno un giro: il punto\nfa {mink:5} giri completi…'],
  [82.0, 85.4, 'Restano {mink:3} quarti di giro:\n{mv:i²³}{mink: = }{mv:i³}{mink: = −}{mv:i}.'],
  [85.5, 90.0, 'Per {mv:iⁿ} conta solo il {g:resto}\ndella divisione di {mink:n} per 4.'],
  // chiusura
  [FINE + 1.0, FINE + 7.7, 'Ogni potenza di {mv:i} è un {g:quarto di giro}\noltre la precedente: periodo 4.'],
];

// il piano di Gauss: stessa unità sui due assi, il cerchio di raggio 1 si vede tondo
const O = [640, 465], U = 210;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const CARD = [250, 110, 820, 690];
// i giri: ognuno è un movimento a sé, fra un fumetto e l'altro
const GIRI = [38.0, 44.0, 49.8, 55.3, 60.9];
const RESET = 71.4;   // dopo le potenze il punto riparte da 1
function angolo(t) {
  if (t < RESET) return GIRI.reduce((s, a) => s + P(t, a, a + 1.2), 0) * Math.PI / 2;
  return 5 * 2 * Math.PI * P(t, 75.8, 79.6) + [80.1, 80.75, 81.4].reduce((s, a) => s + P(t, a, a + .5), 0) * Math.PI / 2;
}
// le quattro posizioni, con le loro etichette fuori dal cerchio (il vettore non le attraversa mai)
const POSTI = [
  { s: '{mink:1}', p: [1.14, -.17], quando: 0 },
  { s: '{mv:i}', p: [.16, 1.14], quando: 25.9 },
  { s: '{mink:−1}', p: [-1.17, -.17], quando: 0 },
  { s: '{mink:−}{mv:i}', p: [.21, -1.14], quando: 51.0 },
];
function etichetta(ctx, s, p, al, fondo = 1, size = 44, w = 0) {
  if (al <= 0) return;
  const q = S(...p);
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  const lw = w || 26 * Array.from(s.replace(/\{m?[a-z]+:|\}/g, '')).length + 16;
  if (fondo > 0) { ctx.save(); ctx.globalAlpha *= fondo; ctx.beginPath(); ctx.roundRect(q[0] - lw / 2, q[1] - 26, lw, 52, 10); ctx.fill(); ctx.restore(); }
  drawRich(ctx, s, q[0], q[1], { size });
  ctx.restore();
}
function assi(ctx, kRe, kIm) {
  ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  if (kRe > 0) {
    ctx.beginPath(); ctx.moveTo(...S(-1.5 * kRe, 0)); ctx.lineTo(...S(1.62 * kRe, 0)); ctx.stroke();
    arrowHead(ctx, [S(1.62 * kRe, 0)[0] + 6, O[1]], 0, C.ink);
    ctx.globalAlpha *= P(kRe, .6, 1);
    [-1, 1].forEach(x => { ctx.beginPath(); ctx.moveTo(S(x, 0)[0], O[1] - 9); ctx.lineTo(S(x, 0)[0], O[1] + 9); ctx.stroke(); });
    txt(ctx, 'Re', S(1.62, 0)[0] + 38, O[1], { size: 36, color: C.dim });
    ctx.restore(); ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  }
  if (kIm > 0) {
    ctx.beginPath(); ctx.moveTo(...S(0, -1.4 * kIm)); ctx.lineTo(...S(0, 1.48 * kIm)); ctx.stroke();
    arrowHead(ctx, [O[0], S(0, 1.48 * kIm)[1] - 6], -Math.PI / 2, C.ink);
    ctx.globalAlpha *= P(kIm, .6, 1);
    [-1, 1].forEach(y => { ctx.beginPath(); ctx.moveTo(O[0] - 9, S(0, y)[1]); ctx.lineTo(O[0] + 9, S(0, y)[1]); ctx.stroke(); });
    txt(ctx, 'Im', O[0] + 22, S(0, 1.48)[1] - 4, { size: 36, color: C.dim, align: 'left' });
  }
  ctx.restore();
}
// arco con la freccia: il quarto di giro appena fatto
function arco(ctx, a0, a1, r, col, al) {
  if (al <= 0 || Math.abs(a1 - a0) < .02) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(O[0], O[1], r * U, -a0, -a1, true); ctx.stroke();
  const e = S(r * Math.cos(a1), r * Math.sin(a1));
  arrowHead(ctx, e, -a1 - Math.PI / 2, col, .9);
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{mv:i} e le sue potenze', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano: prima solo l'asse reale, poi l'asse immaginario e il punto che gira
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const kRe = P(t, 7.7, 8.7), kIm = P(t, 25.3, 26.3);
  assi(ctx, kRe, kIm);
  // il cerchio di raggio 1, la strada del punto
  const kc = P(t, 30.2, 30.8);
  if (kc > 0) {
    ctx.save(); ctx.globalAlpha *= kc * .55; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5; ctx.setLineDash([8, 10]);
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
  // le quattro posizioni, in verde mentre Ada dice «periodo 4»
  const kp = life(t, 66.2, 71.0, .4, .3);
  if (kp > 0) [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(p => dot(ctx, S(...p), C.g, kp, 10));
  // l'arco dell'ultimo quarto di giro
  const a = angolo(t);
  GIRI.forEach((g, k) => {
    const fine = k < GIRI.length - 1 ? GIRI[k + 1] : 71.0;
    arco(ctx, k * Math.PI / 2, k * Math.PI / 2 + P(t, g, g + 1.2) * Math.PI / 2, .42, C.g, life(t, g, fine, .1, .3));
  });
  if (t > RESET) arco(ctx, 0, [80.1, 80.75, 81.4].reduce((s, g) => s + P(t, g, g + .5), 0) * Math.PI / 2, .42, C.g, life(t, 80.1, 89.9, .1, .4));
  // il vettore e il punto
  const pv = P(t, 31.0, 31.5) * (1 - P(t, 71.0, 71.3)) + P(t, 71.6, 72.0);
  if (pv > 0) {
    const q = S(Math.cos(a), Math.sin(a));
    ctx.save(); ctx.globalAlpha *= pv; glowStroke(ctx, [O, q], 1, C.v, 6); ctx.restore();
    dot(ctx, q, C.v, pv, 13);
  }
  // le etichette, piene, su un fondino
  POSTI.forEach(({ s, p, quando }) => etichetta(ctx, s, p, quando ? P(t, quando, quando + .3) : P(kRe, .6, 1), 1 - P(t, FINE - 1.0, FINE - .6)));
  // il contatore dei giri di i²³
  const kg = life(t, 75.6, 89.9, .3, .4);
  if (kg > 0) {
    const n = Math.min(5, Math.floor(5 * P(t, 75.8, 79.6) + 1e-9));
    const qn = [80.1, 80.75, 81.4].filter(g => t >= g + .5).length;
    txt(ctx, 'giri completi: ' + n, 290, 165, { size: 32, color: C.dim, align: 'left', alpha: kg });
    txt(ctx, 'quarti in più: ' + qn, 290, 212, { size: 32, color: C.dim, align: 'left', alpha: kg * P(t, 79.9, 80.2) });
  }
  ctx.restore();
}

// la scheda a destra
const XS = 1480;
// [quando, potenza, conto, valore]: le righe si allineano sull'uguale
const RIGHE = [
  [30.8, '{mv:i⁰}', '', '{mink:= 1}'],
  [39.3, '{mv:i¹}', '', '{mink:= }{mv:i}'],
  [45.4, '{mv:i²}', '', '{mink:= −1}'],
  [51.2, '{mv:i³}', '{mink:= }{mv:i²}{mink: · }{mv:i} ', '{mink:= −}{mv:i}'],
  [56.7, '{mv:i⁴}', '{mink:= }{mv:i³}{mink: · }{mv:i}{mink: = −}{mv:i}{mink: · }{mv:i}{mink: = −}{mv:i²} ', '{mink:= 1}'],
  [62.3, '{mv:i⁵}', '{mink:= }{mv:i⁴}{mink: · }{mv:i} ', '{mink:= }{mv:i}'],
];
function sceneScheda(ctx, t) {
  if (t < 12.2 || t > FINE + .3) return;
  const la = P(t, 12.2, 12.8) * (1 - P(t, FINE - .6, FINE + .2));
  card(ctx, 1140, 120, 680, 680, la);
  ctx.save(); ctx.globalAlpha *= la;
  // 1 · nessun reale, poi il numero nuovo
  const f1 = 1 - P(t, 29.7, 30.2);
  if (f1 > 0) {
    drawRich(ctx, '{mink:x² = −1}', XS, 255, { size: 64, local: t - 12.7, alpha: f1 });
    drawRich(ctx, '{r:nessuna soluzione reale}', XS, 340, { size: 36, local: t - 14.2, alpha: f1 });
    const fi = 1 - P(t, 20.9, 21.3);
    drawRich(ctx, '{mv:i}', XS, 480, { size: 110, local: t - 17.3, alpha: fi });
    drawRich(ctx, '{dim:unità immaginaria}', XS, 580, { size: 34, local: t - 17.9, alpha: fi });
    drawRich(ctx, '{dim:non è un numero reale}', XS, 600, { size: 34, local: t - 22.8, alpha: f1 });
  }
  // la definizione, che poi sale in cima e resta
  const kd = P(t, 21.0, 21.5);
  if (kd > 0) {
    const y = kf(t, [[29.8, 480], [30.6, 192]]), sz = kf(t, [[29.8, 72], [30.6, 54]]);
    const w = sz * 5.4, h = sz * 1.55;
    ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = css(C.v, .7); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(XS - w / 2, y - h / 2, w, h, 16); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mv:i²}{mink: = −1}', XS, y, { size: sz, local: t - 21.0 });
  }
  // 2 · la tabella delle potenze
  const ft = 1 - P(t, 71.0, 71.4);
  if (t > 30.3 && ft > 0) {
    ctx.save(); ctx.globalAlpha *= ft;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= P(t, 30.4, 30.8);
    ctx.beginPath(); ctx.moveTo(1180, 246); ctx.lineTo(1780, 246); ctx.stroke();
    ctx.restore();
    // il periodo: i primi quattro valori diventano verdi mentre Ada dice «periodo 4»
    const kp = life(t, 66.2, 71.0, .4, .3);
    RIGHE.forEach(([a, pot, mezzo, ris], k) => {
      const y = 293 + 74 * k, al = P(t, a, a + .3);
      if (al <= 0) return;
      drawRich(ctx, pot, 1224, y, { size: 44, align: 'right', alpha: al, local: t - a });
      drawRich(ctx, mezzo, 1236, y, { size: 44, align: 'left', alpha: al, local: t - a - .2 });
      const xr = 1236 + (mezzo ? richW(ctx, mezzo, 44) : 0), g = k < 4 ? kp : 0;
      drawRich(ctx, ris, xr, y, { size: 44, align: 'left', alpha: al * (1 - g), local: t - a - .4 });
      if (g > 0) drawRich(ctx, ris.replace(/\{m(ink|v):/g, '{mg:'), xr, y, { size: 44, align: 'left', alpha: al * g });
      if (k === 2) drawRich(ctx, '{dim:per definizione}', xr + richW(ctx, ris, 44) + 30, y, { size: 30, align: 'left', alpha: P(t, a + .4, a + .8) });
    });
  }
  // 3 · i²³
  if (t > 71.8) {
    drawRich(ctx, '{mink:23 = 4 · 5 + 3}', XS, 300, { size: 50, local: t - 73.4 });
    drawRich(ctx, '{mv:i²³}', 1335, 425, { size: 50, align: 'right', local: t - 72.1 });
    drawRich(ctx, '{mink:= ?}', 1345, 425, { size: 50, align: 'left', local: t - 72.3, alpha: 1 - P(t, 75.5, 75.8) });
    drawRich(ctx, '{mink:= (}{mv:i⁴}{mink:)⁵ · }{mv:i³}', 1345, 425, { size: 50, align: 'left', local: t - 75.8 });
    drawRich(ctx, '{mink:= }{mg:1}{mink: · }{mv:i³}', 1345, 510, { size: 50, align: 'left', local: t - 79.6 });
    drawRich(ctx, '{mink:= }{mv:i³}{mink: = }{mg:−i}', 1345, 595, { size: 50, align: 'left', local: t - 82.1 });
    drawRich(ctx, '{dim:conta solo il resto, }{mg:3}', XS, 705, { size: 34, local: t - 85.7 });
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
    drawRich(ctx, 'Con {mv:i²}{mink: = −1}, le potenze di {mv:i} girano\ndi un {g:quarto di giro} alla volta.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, '{mv:i²}{mink: = −1}\nper definizione'], [960, '{mink:1}, {mv:i}, {mink:−1}, {mink:−}{mv:i}\n{g:periodo 4}'], [1450, '{mv:iⁿ}: conta il resto\ndi {mink:n} diviso 4']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 455, 430, 130);
    drawRich(ctx, s, x, 522, { size: 34, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'i e le sue potenze', durata: Math.round((FINE + 10.7) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 29.8, 'il numero i'], [29.8, 71.4, 'le potenze di i'], [71.4, FINE, 'esponenti grandi']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
