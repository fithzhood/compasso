'use strict';
/* Il valore anomalo — gli stipendi 20, 24, 28, 32 e un quinto che scorre da 0 a 200, come nel grafico del sito:
   la media lo segue sempre, la mediana si muove solo mentre il quinto sta fra 24 e 28. Con 200: media 60,8, mediana 28.
   Argomento: statistica. */
CVIDEO.registra('statistica/valore-anomalo', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, richW, txt, dot, card, arrowHead, fmtN } = M;

const FINE = 55.6, DUR = 67.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [17.0, 'felice'], [21.8, 'neutro'], [27.0, 'sorpreso'], [32.2, 'neutro'], [37.6, 'sorpreso'], [41.8, 'pensa'],
  [46.6, 'neutro'], [51.4, 'felice'],
  [FINE + 1.0, 'felice'], [61.6, 'occhiolino'],
];
// gli stati di cui Ada parla sono fermi; mentre il quinto scorre, Ada commenta lo scorrimento
const FUMETTI = [
  [2.1, 6.4, 'Un dato lontanissimo dagli altri:\nche cosa succede?'],
  [8.0, 12.4, 'Quattro stipendi, in migliaia di euro:\n20, 24, 28, 32.'],
  [12.6, 16.6, 'Il quinto lo faccio scorrere\nda 0 fino a 200.'],
  [16.8, 21.6, 'Con il quinto a 0: media {v:20,8},\nmediana {y:24}.'],
  [21.8, 26.8, 'Lo faccio salire: la media lo segue,\nla mediana {y:resta ferma} su 24.'],
  [27.0, 32.0, 'Fra 24 e 28 il quinto sta al centro:\nsi muove anche la mediana.'],
  [32.2, 36.4, 'Il quinto andrà lontano:\nallargo l’asse fino a 200.'],
  [36.6, 41.4, 'Oltre 28 la mediana {y:si ferma},\nla media continua a salire.'],
  [41.6, 46.4, '200 è un {x:valore anomalo}:\nun dato molto lontano dagli altri.'],
  [46.6, 51.0, 'Con 200 la media è {v:60,8}:\nnessuno prende quella cifra.'],
  [51.2, 54.8, 'La mediana è rimasta a {y:28}.'],
  // chiusura
  [56.4, 64.7,'Un valore anomalo trascina la media;\nla mediana quasi per niente.'],
];

const TOP = [110, 110, 1700, 390], BOT = [110, 530, 1700, 270];
// l'asse: prima da 0 a 40 (36 px per migliaio), poi uno zoom fino a 210 mentre Ada lo annuncia, prima che il quinto superi 32
const rmax = t => kf(t, [[32.8, 40], [34.8, 210]]);
let RM = 40;   // ricalcolato da t all'inizio di ogni fotogramma
const SX = v => 220 + v * 1440 / RM, AY = 420, YT = 236;
// il quinto stipendio: fermo a 0, poi sale a tratti (0 → 24 → 28 → 200), fermo fra un tratto e l'altro
const quinto = t => kf(t, [[22.2, 0], [25.4, 24], [27.6, 24], [30.4, 28], [36.8, 28], [41.2, 200]]);
const mediana = q => Math.min(Math.max(q, 24), 28);
// i nomi delle linee si vedono solo a quinto fermo, dalla parte giusta: mai attraversati dall'altra linea
const NOMI = t => Math.max(life(t, 17.0, 22.2, .4, .3), life(t, 25.5, 27.6, .3, .3), life(t, 30.5, 36.8, .3, .3), life(t, 41.2, FINE + .2, .4, .1));
// il passo delle tacche e dei numeri, scelto perché non si affollino
const passo = (lista, min) => lista.find(s => s * 1440 / RM >= min) || lista[lista.length - 1];
function linea(ctx, x, col, nome, lato, al, kn) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, AY - 16); ctx.lineTo(x, YT); ctx.stroke();
  drawRich(ctx, nome, x + lato * 16, YT + 18, { size: 34, weight: 600, align: lato < 0 ? 'right' : 'left', alpha: kn });
  ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il valore anomalo', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · gli stipendi (7.5–FINE)
function sceneStipendi(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  RM = rmax(t);
  const al = 1 - P(t, FINE - .6, FINE + .2), ka = P(t, 7.5, 8.2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...TOP, ka);
  ctx.save(); ctx.globalAlpha *= ka;
  drawRich(ctx, '{dim:stipendi annui, in migliaia di €}', 160, 165, { size: 32, align: 'left' });
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(SX(-RM * .02), AY); ctx.lineTo(SX(RM * 1.02), AY); ctx.stroke();
  arrowHead(ctx, [SX(RM * 1.02) + 6, AY], 0, C.ink);
  ctx.lineWidth = 2;
  const pt = passo([1, 2, 5, 10], 14), pn = passo([5, 10, 25, 50], 90);
  for (let v = 0; v <= RM; v += pt) { ctx.beginPath(); ctx.moveTo(SX(v), AY); ctx.lineTo(SX(v), AY + (v % pn ? 8 : 14)); ctx.stroke(); }
  ctx.fillStyle = C.paper;
  for (let v = 0; v <= RM; v += pn) { const s = String(v), w = 18 * s.length + 14; ctx.fillRect(SX(v) - w / 2, AY + 22, w, 34); txt(ctx, s, SX(v), AY + 40, { size: 30, color: C.dim }); }
  ctx.restore();
  const q = quinto(t), xm = (104 + q) / 5, me = mediana(q);
  // le due linee: quella più a sinistra ha il nome a sinistra
  const kl = life(t, 17.0, FINE + .2, .5, .1), kn = NOMI(t), sx = xm < me ? -1 : 1;
  linea(ctx, SX(me), C.y, '{y:mediana}', -sx, kl, kn);
  linea(ctx, SX(xm), C.v, '{v:media}', sx, kl, kn);
  // i quattro stipendi e il quinto
  [20, 24, 28, 32].forEach((v, i) => dot(ctx, [SX(v), AY], C.x, P(t, 8.4 + i * .3, 8.9 + i * .3, E.back), 12));
  dot(ctx, [SX(q), AY], C.x, P(t, 13.0, 13.5, E.back), 13);
  // 200 è un valore anomalo: lo dice un'etichetta sopra il punto
  const kv = life(t, 41.6, FINE + .2, .4, .1);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.x); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(SX(q), AY, 24, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{x:valore anomalo}', SX(q), AY - 56, { size: 36, weight: 600, alpha: kv });
  }
  // i conti, con il quinto arrotondato all'intero mentre scorre
  const kb = P(t, 17.0, 17.6);
  card(ctx, ...BOT, kb);
  if (kb > 0) {
    const qi = Math.round(q), FS = 42;
    ctx.save(); ctx.globalAlpha *= kb;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1060, 565); ctx.lineTo(1060, 765); ctx.stroke();
    drawRich(ctx, '{v:media}', 585, 580, { size: 34, weight: 600 });
    // la frazione disegnata a mano, larga come con 200: la riga non balla mentre il quinto cambia
    const wEq = richW(ctx, '{mink:x̄ =}', FS), wNum = richW(ctx, '{mink:20 + 24 + 28 + 32 + 200}', FS), wRis = richW(ctx, '{mink:= }{mv:60,8}', 46);
    const x0 = 585 - (wEq + 14 + wNum + 14 + wRis) / 2, xc = x0 + wEq + 14 + wNum / 2;
    drawRich(ctx, '{mink:x̄ =}', x0, 690, { size: FS, align: 'left' });
    drawRich(ctx, `{mink:20 + 24 + 28 + 32 + }{mx:${qi}}`, xc, 664, { size: FS });
    ctx.strokeStyle = css(C.ink); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(xc - wNum / 2, 692); ctx.lineTo(xc + wNum / 2, 692); ctx.stroke();
    drawRich(ctx, '{mink:5}', xc, 720, { size: FS });
    drawRich(ctx, `{mink:= }{mv:${fmtN((104 + qi) / 5, 1)}}`, xc + wNum / 2 + 14, 690, { size: 46, align: 'left' });
    // la mediana: i dati in ordine, il quinto in azzurro, quello al centro sottolineato in arancio
    const ord = [20, 24, 28, 32, qi].sort((a, b) => a - b), mi = mediana(qi);
    drawRich(ctx, `{y:mediana}{mink: = }{my:${mi}}`, 1435, 580, { size: 34, weight: 600 });
    let k5 = false;
    const pezzi = ord.map((v, i) => { const e5 = v === qi && !k5; if (e5) k5 = true; return `{m${e5 ? 'x' : 'ink'}:${v}}` + (i < 4 ? '{mink:, }' : ''); });
    const riga = pezzi.join(''), wr = richW(ctx, riga, 44), xr = 1435 - wr / 2;
    drawRich(ctx, riga, 1435, 672, { size: 44 });
    // sotto il dato centrale, un trattino arancio
    const wa = richW(ctx, pezzi.slice(0, 2).join(''), 44), wc = richW(ctx, pezzi[2].replace(/\{mink:, \}$/, ''), 44);
    ctx.strokeStyle = css(C.y); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xr + wa, 704); ctx.lineTo(xr + wa + wc, 704); ctx.stroke();
    drawRich(ctx, '{dim:in ordine: il terzo è al centro}', 1435, 750, { size: 30 });
    ctx.restore();
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
    drawRich(ctx, 'Un valore anomalo trascina la {v:media},\nquasi per niente la {y:mediana}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, '{v:media}: segue sempre\nil valore anomalo'], [960, '{y:mediana}: si muove solo\nse il dato passa al centro'], [1450, '']];   // la terza si scrive a parte, con i numeri grandi
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 170);
    if (i < 2) drawRich(ctx, s, x, 530, { size: 34, weight: 400, lh: 1.3 });
    else { drawRich(ctx, 'con 200:', x, 478, { size: 32, weight: 400 }); drawRich(ctx, '{v:media }{mv:60,8}', x, 530, { size: 44 }); drawRich(ctx, '{y:mediana }{my:28}', x, 584, { size: 44 }); }
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il valore anomalo', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 12.6, 'quattro stipendi'], [12.6, 21.7, 'il quinto stipendio a 0'], [21.7, 41.5, 'il quinto sale'], [41.5, FINE, 'il quinto a 200']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneStipendi(ctx, t); sceneFine(ctx, t); },
  };
});
