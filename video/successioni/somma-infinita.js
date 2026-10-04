'use strict';
/* Una somma infinita che fa 1 — 1/2 + 1/4 + 1/8 + … riempie un quadrato di area 1: ogni pezzo è metà di ciò che manca,
   le somme parziali si avvicinano a 1 senza superarlo (il limite è 1); la serie geometrica a₁/(1 − q) con |q| < 1. Argomento: successioni. */
CVIDEO.registra('successioni/somma-infinita', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, drawLim, card } = M;

const FINE = 78.4, DUR = 90.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [33.4, 'pensa'], [35.5, 'neutro'], [50.4, 'sorpreso'], [52.5, 'neutro'], [55.1, 'felice'], [57.2, 'neutro'],
  [70.6, 'festa'], [74.5, 'pensa'],
  [FINE, 'neutro'], [80.7, 'felice'], [85.6, 'occhiolino'],
];
// una frase per ogni cosa che succede; ogni pezzo si taglia e si colora fra un fumetto e l'altro
const FUMETTI = [
  [2.4, 6.4, 'Si possono sommare {g:infiniti} numeri\ne ottenere un numero finito?'],
  // 1 · il quadrato
  [8.4, 11.2, 'Un quadrato di area {g:1}.'],
  [12.7, 16.4, 'Ne coloro metà: {mink:1/2}.\nResta l’altra metà.'],
  [17.7, 21.7, 'Coloro metà di ciò che resta:\n{mink:1/4}. In tutto {mink:3/4}.'],
  [23.0, 26.5, 'Ancora metà del resto: {mink:1/8}.\nIn tutto {mink:7/8}.'],
  [27.8, 31.2, 'Poi {mink:1/16}: in tutto {mink:15/16}.'],
  [33.4, 37.7, 'Quello che manca si dimezza\na ogni passo, ma non sparisce.'],
  // 2 · le somme parziali
  [37.9, 42.3, 'La somma dei primi {mx:n} pezzi si chiama\n{v:somma parziale} {mink:Sₙ}.'],
  [42.4, 46.1, 'Si avvicinano a 1: {mink:0,5}, {mink:0,75},\n{mink:0,875}, {mink:0,9375}…'],
  [46.2, 50.3, 'Nessuna arriva a 1, nessuna lo supera:\nmanca sempre qualcosa.'],
  [50.4, 55.0, 'Ma si avvicinano a 1 {g:quanto vuoi}:\nil loro {v:limite} è 1.'],
  [55.1, 59.2, 'Per questo si dice che la somma\ninfinita {g:fa 1}.'],
  // 3 · la serie geometrica
  [59.4, 63.7, 'Il primo pezzo è {mink:a₁ = 1/2}, e ognuno\nè metà del precedente.'],
  [63.8, 67.1, 'È una progressione geometrica\ndi ragione {mv:q}{mink: = 1/2}.'],
  [67.2, 70.5, 'Se {mink:|}{mv:q}{mink:| < 1}, la somma infinita\nè {mink:a₁/(1 − }{mv:q}{mink:)}.'],
  [70.6, 74.4, 'Qui {mink:a₁ = 1/2} e {mink:1 − }{mv:q}{mink: = 1/2}:\nla somma è {g:1}. Torna!'],
  [74.5, 77.8, 'Con {mink:|}{mv:q}{mink:| ≥ 1} no: {mink:1 + 2 + 4 + …}\ncresce senza fine.'],
  // chiusura
  [80.5, 87.3, 'Le somme parziali si avvicinano a 1:\nla somma infinita {g:fa 1}.'],
];

const CARD_L = [150, 110, 760, 690], CARD_R = [940, 110, 910, 690];
const fr = (a, b) => ({ num: `{mink:${a}}`, den: `{mink:${b}}` });
// il quadrato di area 1, lato 560 px
const L = 560, X0 = 250, Y0 = 200;
// i pezzi: ognuno è la metà di ciò che manca; si taglia a metà il resto, una volta per il lungo e una per il largo
const PEZZI = [], RESTI = [[X0, Y0, L, L]];
for (let k = 0; k < 8; k++) {
  const [x, y, w, h] = RESTI[k];
  if (k % 2 === 0) { PEZZI.push([x, y, w / 2, h]); RESTI.push([x + w / 2, y, w / 2, h]); }
  else { PEZZI.push([x, y, w, h / 2]); RESTI.push([x, y + h / 2, w, h / 2]); }
}
// per ogni pezzo: [inizio del taglio, inizio del colore, fine]
const TEMPI = [[11.3, 11.9, 12.5], [16.5, 17.0, 17.6], [21.8, 22.3, 22.9], [26.6, 27.1, 27.7],
  [31.3, 31.5, 31.8], [31.8, 32.0, 32.3], [32.3, 32.5, 32.8], [32.8, 33.0, 33.3]];

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Una somma infinita che fa 1', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function tratteggio(ctx, a, b, k, col, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.setLineDash([12, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function sceneQuadrato(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .5, .6);
  card(ctx, ...CARD_L, al);
  ctx.save(); ctx.globalAlpha *= al;
  // quanti pezzi sono già colorati (il colore entra in dissolvenza: il pezzo è sempre la metà esatta del resto)
  let fatti = 0;
  PEZZI.forEach(([x, y, w, h], k) => {
    const [, c0, c1] = TEMPI[k], kc = P(t, c0, c1);
    if (kc <= 0) return;
    if (kc >= 1) fatti = k + 1;
    const col = k % 2 ? C.v : C.x;
    ctx.save(); ctx.globalAlpha *= kc;
    ctx.fillStyle = css(col, .25); ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h);
    ctx.restore();
    if (k < 4) drawSeq(ctx, [fr(1, 2 ** (k + 1))], x + w / 2, y + h / 2, k < 3 ? 46 : 40, { alpha: kc });
  });
  // il taglio a metà del resto, prima che il pezzo si colori
  PEZZI.forEach(([x, y, w, h], k) => {
    const [a, c0] = TEMPI[k], R = RESTI[k];
    const kt = P(t, a, c0 - .05), at = 1 - P(t, c0, c0 + .3);
    if (kt <= 0 || at <= 0) return;
    if (k % 2 === 0) tratteggio(ctx, [R[0] + R[2] / 2, R[1]], [R[0] + R[2] / 2, R[1] + R[3]], kt, C.ink, at);
    else tratteggio(ctx, [R[0], R[1] + R[3] / 2], [R[0] + R[2], R[1] + R[3] / 2], kt, C.ink, at);
  });
  // il bordo del quadrato e, dopo il primo pezzo, il resto che manca (tratteggiato rosso)
  ctx.save(); ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3; ctx.strokeRect(X0, Y0, L, L * P(t, 7.6, 8.2)); ctx.restore();
  if (fatti > 0) {
    const [x, y, w, h] = RESTI[fatti];
    ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 3; ctx.setLineDash([10, 7]); ctx.strokeRect(x + 3, y + 3, w - 6, h - 6); ctx.restore();
  }
  // quello che manca alla fine: un anello rosso attorno al quadratino
  const ka = life(t, 33.5, 37.7, .4, .4);
  if (ka > 0) {
    const [x, y, w, h] = RESTI[8];
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.r); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, 46, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  // sopra il quadrato: la sua area, poi la somma infinita
  const kS = P(t, 55.45, 55.8);
  drawRich(ctx, '{dim:area }{mink:1}', X0 + L / 2, 155, { size: 44, alpha: P(t, 8.4, 8.9) * (1 - P(t, 55.1, 55.4)) });
  drawRich(ctx, '{mink:1/2 + 1/4 + 1/8 + … = }{mg:1}', X0 + L / 2, 155, { size: 44, alpha: kS });
  ctx.restore();
}

// la scheda a destra: quanto è colorato e quanto manca; poi il limite; poi la serie geometrica
const XA = 1200, XM = 1690, XC = 1395, YR = k => 252 + 105 * k;
function sceneScheda(ctx, t) {
  const ca = life(t, 12.6, FINE, .5, .6);
  if (ca <= 0) return;
  card(ctx, ...CARD_R, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const aT = 1 - P(t, 59.3, 59.8);
  if (aT > 0) {
    ctx.save(); ctx.globalAlpha *= aT;
    drawRich(ctx, '{dim:colorato}', XA, 160, { size: 32 });
    drawRich(ctx, '{dim:manca}', XM, 160, { size: 32 });
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(980, 192); ctx.lineTo(1810, 192); ctx.stroke();
    for (let k = 0; k < 4; k++) {
      const d = 2 ** (k + 1), kr = P(t, TEMPI[k][2], TEMPI[k][2] + .4);
      if (kr <= 0) continue;
      drawSeq(ctx, [fr(d - 1, d)], XA, YR(k), 40, { alpha: kr });
      drawSeq(ctx, [{ num: '{mr:1}', den: `{mr:${d}}`, bar: C.r }], XM, YR(k), 40, { alpha: kr });
      drawRich(ctx, `{mink:S${'₁₂₃₄'[k]} =}`, 1140, YR(k), { size: 42, align: 'right', alpha: P(t, 38.0 + k * .15, 38.4 + k * .15) });
      drawRich(ctx, `{mink:= ${['0,5', '0,75', '0,875', '0,9375'][k]}}`, 1262, YR(k), { size: 40, align: 'left', alpha: P(t, 42.5 + k * .15, 42.9 + k * .15) });
    }
    const kp = P(t, 31.5, 31.9);
    drawRich(ctx, '{mink:⋮}', XA, 652, { size: 44, alpha: kp });
    drawRich(ctx, '{mink:⋮}', XM, 652, { size: 44, alpha: kp });
    // la colonna di ciò che manca: mai zero
    const km = Math.max(life(t, 33.4, 37.7, .4, .4), life(t, 46.3, 50.3, .4, .4));
    if (km > 0) {
      ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = css(C.r); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XM - 80, 140, 160, 530, 16); ctx.stroke(); ctx.restore();
    }
    drawLim(ctx, '{mx:n}{mink:→∞}', '{mink:Sₙ = }{mg:1}', XC, 718, { size: 48, local: t - 50.5 });
    ctx.restore();
  }
  if (t > 59.4) {
    drawSeq(ctx, ['{mink:a₁ = }', fr(1, 2)], 1180, 200, 48, { local: t - 59.5 });
    drawSeq(ctx, ['{mv:q}{mink: = }', fr(1, 2)], 1610, 200, 48, { local: t - 63.9 });
    const sF = ['{mink:S = }', { num: '{mink:a₁}', den: '{mink:1 − }{mv:q}' }];
    drawSeq(ctx, sF, XC, 360, 60, { local: t - 67.3 });
    const kb = P(t, 67.9, 68.4);
    if (kb > 0) {
      const w = richW(ctx, '{mink:S = }', 60) + richW(ctx, '{mink:1 − }{mv:q}', 60) + 60 * .47;
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XC - w / 2 - 30, 360 - 80, w + 60, 160, 16); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, '{dim:se }{mink:|}{mv:q}{mink:| < 1}', XC, 480, { size: 40, local: t - 67.6 });
    drawSeq(ctx, ['{mink:S = }', { num: '{mink:1/2}', den: '{mink:1 − 1/2}' }, '{mink: = }', fr('1/2', '1/2'), '{mink: = }{mg:1}'], XC, 600, 48, { local: t - 70.7 });
    drawRich(ctx, '{mr:1 + 2 + 4 + 8 + …}{ink:    }{dim:(}{mv:q}{mink: = 2}{dim:)}', XC, 712, { size: 44, local: t - 74.6 });
    drawRich(ctx, '{r:non ha una somma finita}', XC, 764, { size: 32, local: t - 75.1 });
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Una somma infinita vale il {v:limite}\ndelle sue somme parziali: qui {g:1}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[400, '{dim:il quadrato}'], [960, '{dim:serie geometrica}'], [1520, '{dim:solo se}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 240, 445, 480, 200);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mink:1/2 + 1/4 + 1/8 + …}\n{mink:= }{mg:1}', x, 568, { size: 40, lh: 1.35 });
    if (i === 1) drawSeq(ctx, ['{mink:S = }', { num: '{mink:a₁}', den: '{mink:1 − }{mv:q}' }], x, 572, 46);
    if (i === 2) drawRich(ctx, '{mink:|}{mv:q}{mink:| < 1}', x, 568, { size: 54 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Una somma infinita che fa 1', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 37.8, 'il quadrato'], [37.8, 59.3, 'le somme parziali'], [59.3, FINE, 'la serie geometrica']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneQuadrato(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
