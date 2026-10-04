'use strict';
/* L'eccentricità — stesso spago 2a = 10, picchetti a distanza 2c: e = c/a va da 0 (circonferenza)
   verso 1 (ellisse lunga e stretta), ma resta sotto 1 perché lo spago è più lungo di F₁F₂. Argomento: ellisse-iperbole. */
CVIDEO.registra('ellisse-iperbole/eccentricita', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, fixedNum, fmtN,
    dot, glowStroke, arrowHead, makePlane, card } = M;

const FINE = 54.3;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [25.4, 'felice'], [27.6, 'neutro'], [33.0, 'festa'], [35.4, 'neutro'], [40.6, 'sorpreso'], [42.8, 'neutro'],
  [49.7, 'felice'], [52.0, 'neutro'], [FINE + .5, 'felice'], [FINE + 5.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede; i picchetti si muovono solo nei fumetti 4, 6, 8
const FUMETTI = [
  [2.0, 6.4, 'Stesso spago, picchetti più lontani:\ncome cambia l’ellisse?'],
  // 1 · lo schiacciamento
  [7.75, 12.0, 'Il bastoncino tende lo spago,\nlungo {mink:2a = 10}: ogni metà è {mink:a}.'],
  [12.1, 16.6, 'I picchetti {mink:F₁} e {mink:F₂} distano {mink:2c}:\n{mink:c} ne è la metà.'],
  [16.8, 21.0, '{mink:a} è anche il semiasse maggiore.\nL’{v:eccentricità} è {mink:e = c/a = 4/5 = 0,80}.'],
  [21.2, 25.2, 'Stesso spago, picchetti più vicini:\n{mink:e} scende…'],
  [25.4, 29.0, 'Con {mink:e = 0,20} l’ellisse è\n{g:quasi rotonda}.'],
  [29.2, 32.8, 'Avvicino ancora: i picchetti\n{v:coincidono}…'],
  [33.0, 36.6, '…{mink:e = 0}: è una {g:circonferenza}.'],
  [36.8, 40.4, 'Ora li allontano: {mink:e}\nsi avvicina a 1…'],
  [40.6, 44.6, 'Con {mink:e = 0,90} l’ellisse è\n{v:molto allungata}.'],
  // 2 · perché e < 1
  [45.0, 49.5, 'Per arrivare al bastoncino lo spago\nfa una deviazione: {mink:2a > 2c}.'],
  [49.7, 53.9, 'Quindi {mink:c < a}: il rapporto {mink:e = c/a}\nresta sempre {g:minore di 1}.'],
  // chiusura
  [FINE + 1.9, FINE + 8.0, 'Più i picchetti si allontanano,\npiù {mink:e} cresce, ma resta sotto 1.'],
];

// spago 2a = 10 (a = 5); la semidistanza focale c parte da 4, scende a 1 e a 0, poi sale a 4,5.
// Una sola unità per i due assi, niente numeri sugli assi.
const PL = makePlane({ ox: 560, oy: 480, u: 60, x0: -6, x1: 6, y0: -5.3, y1: 5.5 });
const CARD = [130, 110, 860, 690];
const A = 5, U = PL.u, O = PL.toS(0, 0);
const cDi = t => kf(t, [[21.4, 4], [25.0, 1], [29.4, 1], [32.0, 0], [37.0, 0], [40.2, 4.5]]);
const bDi = c => Math.sqrt(A * A - c * c);
const cq = t => Math.round(cDi(t) * 10) / 10;   // c mostrata a decimi: e = c : 5 torna sempre con le cifre a schermo
function arcoEll(c, a, b, n = 260) { const p = [], bb = bDi(c); for (let i = 0; i <= n; i++) { const th = lerp(a, b, i / n); p.push(PL.toS(A * Math.cos(th), bb * Math.sin(th))); } return p; }
function filo(ctx, a, b, col, w = 5) {
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 36, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’eccentricità', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il prato: l'ellisse, lo spago teso in cima, la distanza 2c fra i picchetti (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .4, FINE);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(CARD[0] + 2, CARD[1] + 2, CARD[2] - 4, CARD[3] - 4, 20); ctx.clip();
  assi(ctx, P(t, 7.7, 8.7));
  const c = cDi(t), b = bDi(c);
  const F1 = PL.toS(-c, 0), F2 = PL.toS(c, 0), Pt = PL.toS(0, b);

  // l'ellisse, sempre intera: cambia con i picchetti
  glowStroke(ctx, arcoEll(c, Math.PI / 2, Math.PI / 2 + 2 * Math.PI), P(t, 8.0, 9.6, E.lin), C.g, 6);

  // la distanza 2c fra i picchetti, sopra l'asse; sparisce quando i picchetti si toccano
  const k2c = life(t, 12.4, FINE, .5, .4) * Math.min(1, Math.max(0, (c - 1.6) / .8));
  const evid = life(t, 45.1, 49.6, .4, .4);   // «lo spago è più lungo di F₁F₂»
  if (k2c > 0) {
    ctx.save(); ctx.globalAlpha *= k2c;
    const y = O[1] - 34;
    ctx.strokeStyle = css(C.x); ctx.lineWidth = lerp(3, 5, evid);
    ctx.beginPath(); ctx.moveTo(F1[0] + 4, y); ctx.lineTo(F2[0] - 4, y); ctx.stroke();
    arrowHead(ctx, [F1[0], y], Math.PI, C.x, .9); arrowHead(ctx, [F2[0], y], 0, C.x, .9);
    ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(O[0] - 42, y - 28, 84, 56, 12); ctx.fill();
    drawRich(ctx, '{mx:2c}', O[0], y, { size: 44 });
    ctx.restore();
  }

  // lo spago, teso dal bastoncino in cima all'ellisse: ogni metà è lunga a
  const ks = P(t, 8.2, 8.8);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks;
    const ev = Math.max(evid, life(t, 31.8, 36.8, .5, .4)), col = mix(C.dim, C.v, ev), w = lerp(5, 7, ev);
    filo(ctx, F1, Pt, col, w); filo(ctx, Pt, F2, col, w);
    dot(ctx, Pt, C.ink, 1, 11);
    // a sulle due metà, dalla parte di fuori (lì l'ellisse è lontana)
    const la = life(t, 8.6, 21.2, .4, .4);
    if (la > 0) for (const s of [-1, 1]) {
      const m = PL.toS(s * c / 2, b / 2), nx = s * b / A, ny = c / A;
      drawRich(ctx, '{mv:a}', m[0] + nx * 30, m[1] - ny * 30, { size: 44, alpha: la });
    }
    ctx.restore();
  }

  // i picchetti, con le etichette sotto l'asse verso il centro (staccate anche quando coincidono)
  const kf1 = P(t, 8.4, 8.8, E.back);
  dot(ctx, F1, C.v, kf1, 12); dot(ctx, F2, C.v, kf1, 12);
  const lx = Math.max(c * U - 38, 42), lf = P(t, 8.6, 9.0);
  drawRich(ctx, '{mv:F₁}', O[0] - lx, O[1] + 40, { size: 40, alpha: lf });
  drawRich(ctx, '{mv:F₂}', O[0] + lx, O[1] + 40, { size: 40, alpha: lf });
  ctx.restore();
  ctx.restore();
}

// la scheda a destra
const PAN = [1050, 110, 790, 690], XS = 1100, XR = 1790, XC = PAN[0] + PAN[2] / 2;
function riga(ctx, label, val, y, col, al, size = 50) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, XS, y, { size, align: 'left' });
  fixedNum(ctx, val, XR, y, size + 4, col);
  ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 8.0 || t > FINE + .1) return;
  card(ctx, ...PAN, life(t, 8.1, FINE, .5, .4));
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .4, FINE);
  conFont(TITOLI, () => drawRich(ctx, 'l’eccentricità', XC, 178, { size: 42, weight: 600, alpha: P(t, 8.3, 8.8) }));
  const c = cq(t);
  riga(ctx, '{dim:spago }{mink:2a =}', '10', 265, C.ink, P(t, 8.8, 9.3));
  riga(ctx, '{mink:a =}', '5', 335, C.ink, P(t, 10.4, 10.9));
  riga(ctx, '{mx:c =}', fmtN(c, 1), 405, C.x, P(t, 14.4, 14.9));
  ctx.save(); ctx.globalAlpha *= P(t, 16.8, 17.2); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 455); ctx.lineTo(PAN[0] + PAN[2] - 40, 455); ctx.stroke(); ctx.restore();
  drawSeq(ctx, ['{mv:e}{mink: =}', { num: '{mink:c}', den: '{mink:a}' }], XC, 535, 54, { local: t - 17.0 });
  riga(ctx, '{mv:e =}', c === 0 ? '0' : fmtN(c / A, 2), 645, C.v, P(t, 18.4, 18.9), 58);
  // il perché, in due tempi: prima lo spago contro i picchetti, poi la conseguenza
  const k1 = life(t, 45.2, 49.8, .4, .3), k2 = P(t, 49.9, 50.3);
  drawRich(ctx, '{mink:2a > 2c}', XC, 740, { size: 50, alpha: k1 });
  drawRich(ctx, '{mink:c < a}{dim:,  quindi  }{mink:0 ≤ e < 1}', XC, 740, { size: 48, alpha: k2 });
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.8, FINE + 9.8);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L’eccentricità dice quanto è schiacciata\nun’ellisse, ed è sempre minore di 1.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'la definizione', '{mink:e = c/a}'], [960, '{mink:e} vicino a 0', '{g:quasi rotonda}'], [1430, '{mink:e} vicino a 1', '{v:molto allungata}']];
  pills.forEach(([px, testa, f], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 445, 430, 150);
    drawRich(ctx, testa, px, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, px, 548, { size: 42 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L’eccentricità', durata: FINE + 11, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 44.8, 'stesso spago, picchetti diversi'], [44.8, 54.1, 'perché resta sotto 1']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
