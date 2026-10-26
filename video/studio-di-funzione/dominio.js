'use strict';
/* Dove il grafico non può passare — il dominio della funzione guida f(x) = (x² − x − 2)/(x − 3): x − 3 ≠ 0, cioè x ≠ 3;
   f(3) = 4/0 non esiste; D = ℝ ∖ {3}. Sul piano: la retta verticale tratteggiata x = 3; ogni x del dominio dà un punto
   (f(0) = 2/3, f(5) = 9), sulla retta x = 3 nessuno. Conti rifatti con node. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/dominio', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, drawSeq, richW, txt, dot, dashed, arrowHead, card, crossMark } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['guida', 4.6, 'Ecco la funzione guida, {mink:f}:\nuna {v:frazione}.'],
  ['denominatore', 5.0, 'Una frazione esiste solo se\nil {v:denominatore} non è zero.'],
  ['condizione', 5.4, 'Quindi {mx:x}{mink: − 3 ≠ 0},\ncioè {mx:x}{mink: ≠ 3}.'],
  ['prova', 7.4, 'Prova con {mx:x}{mink: = 3}: sotto viene 0,\nsopra {mink:9 − 3 − 2 = 4}.'],
  ['nonesiste', 4.8, '{mink:4/0} non è un numero:\n{mink:f(3)} {r:non esiste}.'],
  ['dominio', 5.0, 'Il dominio {mink:D} sono i numeri\nreali, {g:tranne il 3}.'],
  ['piano', 5.8, 'Sul piano, i punti con {mx:x}{mink: = 3}\nformano una {v:retta verticale}.', .3],
  ['sonda0', 7.0, 'Ogni {mx:x} del dominio dà un punto:\n{mx:x}{mink: = 0} dà {mink:f(0) = 2/3}.'],
  ['sonda5', 5.4, 'Con {mx:x}{mink: = 5} il punto è {mink:(5; 9)}.'],
  ['sonda3', 5.4, 'E con {mx:x}{mink: = 3}? Sulla retta\n{r:nessun punto}: lì {mink:f} non esiste.'],
  ['mai', 4.6, 'Il grafico {r:non tocca mai}\nla retta {mx:x}{mink: = 3}.'],
  ['vicino', 5.0, 'E {v:vicino} a 3? Per ora non si sa:\nlo diranno i {v:limiti}.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Dove {r:non può} passare\nil grafico di una funzione?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Fuori dal dominio niente grafico:\nsul piano, una retta tratteggiata.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.nonesiste + .3, 'sorpreso'], [T.dominio, 'felice'], [T.piano, 'neutro'],
  [T.sonda3 + .3, 'pensa'], [T.mai, 'sorpreso'], [T.vicino, 'pensa'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano di lavoro: la stessa finestra della pagina, x da −4 a 10 e y da −8 a 14 ----------
const f = x => (x * x - x - 2) / (x - 3);
const X = x => 185 + (x + 4) * 59, Y = y => 545 - y * 28, S = (x, y) => [X(x), Y(y)];
const PCARD = [90, 110, 1010, 690], RCARD = [1140, 110, 690, 690];
const MAT = '"KaTeX_Main", Cambria, Georgia, serif', MAT_I = '"KaTeX_Math", Cambria, Georgia, serif';
// i numeri dell'asse x stanno sopra o sotto l'asse dove nelle tappe dello studio non passano né la curva né le rette
// (−4, −3, −2 e 2 sopra; il 3 a destra della retta x = 3); sull'asse y solo i multipli di 4, lontani dalla curva
const SOPRA = { '-4': 1, '-3': 1, '-2': 1, 2: 1 };
// il 5 dell'asse si sposta a destra mentre la sonda x = 5 è accesa (la imposta sceneGrafico)
let SPOSTA5 = 0;
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
    else txt(ctx, s, X(i) + (i === 5 ? 24 * SPOSTA5 : 0), Y(0) + (SOPRA[i] ? -30 : 30), { size: 30, color: C.dim });
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
// D = ℝ ∖ {3}: la ℝ nel font AMS di KaTeX (le maiuscole doppie), le graffe nel font matematico
function dominioD(ctx, cx, cy, size, al) {
  if (al <= 0) return;
  const parti = [['D', MAT_I], [' = ', MAT], ['R', 'KaTeX_AMS, "Cambria Math", serif'], [' ∖ {3}', MAT]];
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(C.g); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  const ws = parti.map(([s, fo]) => { ctx.font = Math.round(size * 1.12) + 'px ' + fo; return ctx.measureText(s).width; });
  let x = cx - ws.reduce((a, b) => a + b, 0) / 2;
  parti.forEach(([s, fo], i) => { ctx.font = Math.round(size * 1.12) + 'px ' + fo; ctx.fillText(s, x, cy); x += ws[i]; });
  ctx.restore();
}
const lab = (ctx, s, p, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
// la ℝ usa il font AMS di KaTeX: lo si chiede subito, così è già caricato quando serve
function precarica(ctx) {
  ctx.save(); ctx.font = '40px KaTeX_AMS'; ctx.measureText('R'); ctx.globalAlpha = 0.002; ctx.fillStyle = C.ink; ctx.fillText('R', -200, -200); ctx.restore();
}
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Dove il grafico non può passare', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1 · la scheda a destra: la funzione, la condizione, la prova con x = 3, il dominio (T.guida–FINE)
const FX = ['{my:f(}{mx:x}{my:) =}', { num: '{mx:x}{my:² − }{mx:x}{my: − 2}', den: '{mx:x}{my: − 3}' }];
function sceneScheda(ctx, t) {
  if (t < T.guida || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RCARD, P(t, T.guida, T.guida + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  conFont(TITOLI, () => drawRich(ctx, 'la funzione guida', 1485, 172, { size: 40, weight: 600, local: t - T.guida - .2 }));
  drawSeq(ctx, FX, 1485, 280, 50, { local: t - T.guida - .4 });
  // il riquadro intorno al denominatore (stessi conti di drawSeq per trovarne il centro)
  const kd = P(t, T.denominatore + .4, T.denominatore + .9);
  if (kd > 0) {
    const w0 = richW(ctx, FX[0], 50), w1 = Math.max(richW(ctx, FX[1].num, 50), richW(ctx, FX[1].den, 50)) + 50 * .35, g = 50 * .12;
    const cx = 1485 - (w0 + w1 + g) / 2 + w0 + g + w1 / 2, wd = richW(ctx, FX[1].den, 50) + 30;
    ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(cx - wd / 2, 280 + 33 - 32, wd, 64, 14); ctx.stroke(); ctx.restore();
  }
  lab(ctx, '{mx:x}{mink: − 3 ≠ 0}', [1485, 405], P(t, T.condizione + .3, T.condizione + .7), 48);
  lab(ctx, '{mx:x}{mink: ≠ 3}', [1485, 470], P(t, T.condizione + 1.6, T.condizione + 2.0), 48);
  // la prova con x = 3: prima il denominatore, poi il numeratore, poi 4/0
  const kp = P(t, T.prova + .4, T.prova + .8);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp;
    drawSeq(ctx, ['{my:f(3) =}', { num: '{mink:9 − 3 − 2}', den: '{mink:3 − 3}' }, '{mink:=}', { num: '{mink:4}', den: '{mink:0}' }], 1485, 585, 44, { local: t - T.prova - .4 });
    ctx.restore();
  }
  const kn = P(t, T.nonesiste + .4, T.nonesiste + .8);
  if (kn > 0) {
    crossMark(ctx, 1330, 680, P(t, T.nonesiste + .4, T.nonesiste + 1.2), C.r, .3);
    lab(ctx, '{r:non esiste}', [1370, 680], kn, 40, 'left');
  }
  dominioD(ctx, 1485, 752, 50, P(t, T.dominio + .4, T.dominio + .9));
  ctx.restore();
}

// 2 · il piano: la retta x = 3 e la sonda verticale (T.piano–FINE)
function sceneGrafico(ctx, t) {
  if (t < T.guida || t > FINE + .3) return;
  // il piano con gli assi c'è da subito, vuoto; la retta x = 3 arriva quando Ada ne parla
  const al = life(t, T.guida + .3, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  SPOSTA5 = life(t, T.sonda5 + .3, T.sonda3 + .7, .3, .3);
  assi(ctx, P(t, T.guida + .5, T.guida + 1.3));
  // la retta x = 3: si disegna dal basso; quando Ada dice «non tocca mai» si fa più spessa
  const kb = life(t, T.mai + .2, T.vicino + .2, .4, .6);
  retta3(ctx, P(t, T.piano + 1.0, T.piano + 2.0), 1, 4 + 3 * kb);
  lab(ctx, '{mx:x}{mv: = 3}', [X(3) - 14, Y(13)], P(t, T.piano + 1.8, T.piano + 2.2), 40, 'right');
  // la sonda: una retta verticale azzurra; dove incontra il grafico c'è un punto
  // la sonda non scorre (passerebbe sulle etichette dei punti): si spegne e si riaccende nel valore nuovo
  const CAMBI = [T.sonda5 + .5, T.sonda3 + .5], xs = t < CAMBI[0] ? 0 : t < CAMBI[1] ? 5 : 3;
  const dip = Math.min.apply(null, CAMBI.map(c => Math.min(1, Math.abs(t - c) / .35)));
  const ks = life(t, T.sonda0 + .2, T.mai + .4, .4, .4) * dip;
  if (ks > 0) {
    dashed(ctx, S(xs, -8), S(xs, 14), C.x, 1, ks);

    lab(ctx, '{mx:x}{mink: = ' + xs + '}', [X(xs) + 14, Y(-7)], ks, 40, 'left');
  }
  dot(ctx, S(0, f(0)), C.y, P(t, T.sonda0 + .9, T.sonda0 + 1.3, E.back), 11);
  lab(ctx, '{mink:(0; 2/3)}', [X(0) + 16, Y(f(0)) - 66], P(t, T.sonda0 + 1.2, T.sonda0 + 1.6), 40, 'left');
  dot(ctx, S(5, f(5)), C.y, P(t, T.sonda5 + 1.0, T.sonda5 + 1.4, E.back), 11);
  lab(ctx, '{mink:(5; 9)}', [X(5) + 22, Y(9) - 34], P(t, T.sonda5 + 1.3, T.sonda5 + 1.7), 40, 'left');
  // su x = 3 nessun punto
  const kx = P(t, T.sonda3 + .9, T.sonda3 + 1.7);
  if (kx > 0) {
    crossMark(ctx, X(3), Y(7), kx, C.r, .3);
    lab(ctx, '{r:nessun punto}', [X(3) + 40, Y(7)], P(t, T.sonda3 + 1.1, T.sonda3 + 1.5), 34, 'left');
  }
  lab(ctx, '{r:il grafico non la tocca}', [X(3) + 14, Y(-4.6)], P(t, T.mai + .3, T.mai + .7), 34, 'left');
  // vicino a 3: due punti di domanda, uno per parte
  const kq = P(t, T.vicino + .4, T.vicino + .8, E.back);
  if (kq > 0) { txt(ctx, '?', X(2.4), Y(10.2), { size: 60, weight: 600, color: C.v, alpha: kq }); txt(ctx, '?', X(3.6), Y(10.2), { size: 60, weight: 600, color: C.v, alpha: kq }); }
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Dove la funzione {r:non esiste},\nil grafico {r:non passa}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, '{mx:x}{mink: − 3 ≠ 0}', 40], [960, '{mink:D}: i reali {g:tranne 3}', 38], [1430, 'la retta {mx:x}{mink: = 3}', 38]];
  pills.forEach(([x, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 505); ctx.scale(k, k); ctx.translate(-x, -505);
    card(ctx, x - 215, 455, 430, 100);
    drawRich(ctx, s, x, 507, { size, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', T.guida], ['pop', T.guida + .5, .5],                                                 // la funzione guida
    ['traccia', T.denominatore + .4, T.denominatore + .9],                                          // il riquadro sul denominatore
    ['pop', T.condizione + .4, .5], ['pop', T.condizione + 1.7, .6],                                // x − 3 ≠ 0, x ≠ 3
    ['pop', T.prova + .5, .45], ['pop', T.prova + 1.1, .55],                                        // f(3) = (9 − 3 − 2)/(3 − 3)
    ['traccia', T.nonesiste + .4, T.nonesiste + 1.2], ['pop', T.nonesiste + .5, .2],                // non esiste
    ['ding', T.dominio + .5],                                                                       // D = ℝ ∖ {3}
    ['soffio', T.guida + .3], ['traccia', T.guida + .5, T.guida + 1.3],                            // il piano
    ['traccia', T.piano + 1.0, T.piano + 2.0], ['tono', T.piano + 1.0, T.piano + 2.0, [.1, .9]],    // la retta x = 3 sale
    ['pop', T.sonda0 + .3, .4], ['pop', T.sonda0 + 1.0, .45],                                       // la sonda in x = 0, il punto
    ['soffio', T.sonda5 + .5], ['pop', T.sonda5 + 1.1, .8],                                          // la sonda in 5, (5; 9)
    ['soffio', T.sonda3 + .5], ['traccia', T.sonda3 + .9, T.sonda3 + 1.7], // in 3: nessun punto
    ['pop', T.mai + .3, .3], ['pop', T.vicino + .5, .6],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Dove il grafico non può passare', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.piano - .2, 'la condizione di esistenza'], [T.piano - .2, FINE, 'sul piano']],
    scena(ctx, t) { if (t < T.dominio) precarica(ctx); sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
