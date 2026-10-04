'use strict';
/* L'ellisse del giardiniere — due picchetti e uno spago: la somma delle distanze dai fuochi resta 2a.
   Poi i semiassi a, b e la semidistanza focale c, con a² = b² + c². Argomento: ellisse-iperbole. */
CVIDEO.registra('ellisse-iperbole/ellisse-giardiniere', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, fixedNum, fmtN,
    dot, glowStroke, arrowHead, makePlane, card } = M;

const FINE = 71.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [30.5, 'felice'], [32.8, 'neutro'], [38.4, 'sorpreso'], [40.4, 'neutro'], [42.5, 'festa'], [45.5, 'neutro'],
  [67.1, 'pensa'], [69.3, 'felice'], [FINE, 'neutro'], [FINE + 2.2, 'felice'], [FINE + 6.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.4, 'Come si disegna un’aiuola ovale\ncon due picchetti e uno spago?'],
  // 1 · picchetti e spago
  [7.9, 12.0, 'Due picchetti nel prato: sono i\n{v:fuochi}, {mink:F₁} e {mink:F₂}.'],
  [12.2, 16.6, 'Lego ai picchetti uno spago\nlungo 10: lo chiamo {mink:2a}.'],
  [16.7, 20.95, 'È più lungo della distanza\nfra i picchetti, che è 8.'],
  [21.05, 25.55, 'Tendo lo spago con un bastoncino:\nla punta è il punto {mink:P}.'],
  [25.7, 30.3, 'Le distanze di {mink:P} dai fuochi:\n{mx:PF₁ = 7,40} e {my:PF₂ = 2,60}.'],
  [30.5, 34.1, 'Insieme fanno 10, tutto lo spago:\n{mink:PF₁ + PF₂ = 10}.'],
  // 2 · il giro
  [34.4, 38.3, 'Giro attorno ai picchetti,\ncon lo spago sempre {g:teso}…'],
  [38.5, 42.3, 'Le due distanze cambiano,\nma la somma resta {g:10}.'],
  [42.5, 45.3, '…e il solco è un’{g:ellisse}!'],
  [45.5, 49.6, 'L’{v:ellisse}: i punti con\n{mink:PF₁ + PF₂ = 2a}, e {mink:2a > F₁F₂}.'],
  // 3 · i semiassi
  [49.8, 54.3, 'In cima le due distanze sono\nuguali: 5 e 5, metà spago.'],
  [54.4, 58.8, 'Metà spago è {mink:a}: il {v:semiasse maggiore},\nmetà della larghezza, 5.'],
  [59.0, 62.6, 'Il {v:semiasse minore} {mink:b} è metà\ndell’altezza: 3.'],
  [62.7, 66.95, '{mink:c} è la {v:semidistanza focale}:\ndal centro a un fuoco, 4.'],
  [67.1, 71.3, 'Triangolo rettangolo: {mink:a² = b² + c²},\ncioè {mink:25 = 9 + 16}.'],
  // chiusura
  [FINE + 2.2, FINE + 8.0, 'Spago fisso, somma fissa:\nnell’{g:ellisse} {mink:PF₁ + PF₂ = 2a}.'],
];

// fuochi F₁(−4; 0) e F₂(4; 0), spago 2a = 10: l'ellisse x²/25 + y²/9 = 1 (a = 5, b = 3, c = 4).
// Una sola unità per i due assi, niente numeri sugli assi.
const PL = makePlane({ ox: 560, oy: 470, u: 60, x0: -6, x1: 6, y0: -5.3, y1: 5.2 });
const CARD = [130, 110, 860, 690];
const A = 5, U = PL.u;
const O = PL.toS(0, 0);
const TH0 = Math.atan2(.8, .6), TH1 = 2.5 * Math.PI;   // P parte da (3; 2,4) e si ferma in cima, in (0; 3)
const GIRO = [34.6, 42.2];
// la semidistanza focale resta 4 per tutto il video
const cDi = () => 4;
const ell = (c, th) => [A * Math.cos(th), Math.sqrt(A * A - c * c) * Math.sin(th)];
function arcoEll(c, a, b, n = 220) { const p = []; for (let i = 0; i <= n; i++) p.push(PL.toS(...ell(c, lerp(a, b, i / n)))); return p; }
// la posizione di P: sulla corda tesa in (3; 2,4), poi il giro, poi ferma in cima
const thDi = t => lerp(TH0, TH1, P(t, GIRO[0], GIRO[1], E.io));
const posP = t => ell(4, thDi(t));
// lo spago lungo 10 che pende fra i picchetti (catenaria), e lo stesso spago teso da P
const CAT = (() => { let lo = .5, hi = 3; for (let i = 0; i < 60; i++) { const u = (lo + hi) / 2; if (Math.sinh(u) / u < 1.25) lo = u; else hi = u; } return 4 / lo; })();
const P0 = [3, 2.4], N_FILO = 100;   // s = 7,4 è il campione 74: lo spigolo in P resta netto
function puntoFilo(s, m) {
  const xc = CAT * Math.asinh((s - 5) / CAT), yc = CAT * Math.cosh(xc / CAT) - CAT * Math.cosh(4 / CAT);
  const xt = s <= 7.4 ? lerp(-4, P0[0], s / 7.4) : lerp(P0[0], 4, (s - 7.4) / 2.6);
  const yt = s <= 7.4 ? lerp(0, P0[1], s / 7.4) : lerp(P0[1], 0, (s - 7.4) / 2.6);
  return PL.toS(lerp(xc, xt, m), lerp(yc, yt, m));
}
function filo(ctx, pts, col, k = 1, w = 5) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  M.partial(ctx, pts, k); ctx.restore();
}
function segmento(ctx, a, b, col, k = 1, w = 7) { if (k > 0) glowStroke(ctx, [a, b], k, col, w); }
// griglia e assi, senza numeri
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
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u - 6, { size: 44 });
  ctx.restore();
}
function angoloRetto(ctx, K, sx, sy, al) {   // il quadratino in K, verso sx (±1) e sy (±1)
  if (al <= 0) return;
  const d = 22;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(K[0] + sx * d, K[1]); ctx.lineTo(K[0] + sx * d, K[1] - sy * d); ctx.lineTo(K[0], K[1] - sy * d); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’ellisse del giardiniere', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–4 · il prato: picchetti, spago, il giro, i semiassi, l'eccentricità (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .1) return;
  const al = 1 - P(t, FINE - .7, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  ctx.save(); ctx.beginPath(); ctx.roundRect(CARD[0] + 2, CARD[1] + 2, CARD[2] - 4, CARD[3] - 4, 20); ctx.clip();
  assi(ctx, P(t, 7.7, 8.7));
  const c = cDi(t);

  // l'ellisse: il solco si disegna dietro a P durante il giro, poi resta (e cambia con i picchetti)
  if (t > GIRO[0]) {
    const th = thDi(t);
    if (th < TH0 + 2 * Math.PI) glowStroke(ctx, arcoEll(4, TH0, Math.max(TH0 + .001, th)), 1, C.g, 6);
    else glowStroke(ctx, arcoEll(c, 0, 2 * Math.PI, 260), 1, C.g, 6);
  }

  // la distanza fra i picchetti: 8
  const d8 = life(t, 17.0, 21.2, .4, .4);
  if (d8 > 0) {
    ctx.save(); ctx.globalAlpha *= d8;
    const y8 = O[1] - 40, xa = PL.toS(-4, 0)[0], xb = PL.toS(4, 0)[0];
    ctx.strokeStyle = css(C.v); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(xa + 4, y8); ctx.lineTo(xb - 4, y8); ctx.stroke();
    arrowHead(ctx, [xa, y8], Math.PI, C.v, .9); arrowHead(ctx, [xb, y8], 0, C.v, .9);
    ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(O[0] - 34, y8 - 30, 68, 60, 12); ctx.fill();
    txt(ctx, '8', O[0], y8, { size: 46, weight: 600, color: C.v });
    ctx.restore();
  }

  // i semiassi: a sull'asse x, b sull'asse y, c fino al fuoco
  const seg = 1 - P(t, 71.4, 71.9);
  if (t > 54.5 && seg > 0) {
    ctx.save(); ctx.globalAlpha *= seg;
    const kA = life(t, 54.6, 63.0, .5, .4);
    if (kA > 0) {
      ctx.save(); ctx.globalAlpha *= kA;
      segmento(ctx, O, PL.toS(5, 0), C.v, P(t, 54.6, 55.4));
      drawRich(ctx, '{mv:a}', PL.toS(1.8, 0)[0], O[1] - 34, { size: 46, alpha: P(t, 55.0, 55.4) });
      ctx.restore();
    }
    segmento(ctx, O, PL.toS(0, 3), C.y, P(t, 59.2, 59.9));
    drawRich(ctx, '{my:b}', O[0] - 34, PL.toS(0, 1.5)[1], { size: 46, alpha: P(t, 59.6, 60.0) });
    segmento(ctx, O, PL.toS(4, 0), C.x, P(t, 63.0, 63.7));
    drawRich(ctx, '{mx:c}', PL.toS(2, 0)[0], O[1] + 36, { size: 46, alpha: P(t, 63.4, 63.8) });
    angoloRetto(ctx, O, 1, 1, P(t, 67.3, 67.7));
    ctx.restore();
  }

  // lo spago: pende, poi P lo tende, poi gira con P
  const sa = 1 - P(t, 71.4, 71.9);
  const F1 = PL.toS(-4, 0), F2 = PL.toS(4, 0);
  let Ps = null;
  if (t > 12.3 && sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa;
    if (t < 23.2) {
      const m = P(t, 21.6, 23.1);
      const pts = []; for (let i = 0; i <= N_FILO; i++) pts.push(puntoFilo(10 * i / N_FILO, m));
      filo(ctx, pts, C.dim, P(t, 12.4, 13.4, E.lin));
      if (t > 21.6) Ps = pts[74];
    } else {
      Ps = PL.toS(...posP(t));
      const neutro = P(t, 54.4, 54.9);
      const c1 = mix(mix(C.dim, C.x, P(t, 26.0, 26.5)), C.dim, neutro);
      const c2 = mix(mix(mix(C.dim, C.y, P(t, 26.6, 27.1)), C.dim, neutro), C.v, P(t, 67.3, 67.8));
      filo(ctx, [F1, Ps], c1);
      filo(ctx, [Ps, F2], c2, 1, lerp(5, 7, P(t, 67.3, 67.8)));
    }
    if (t > 67.4) {   // il semiasse a è anche metà spago: l'ipotenusa del triangolo
      const [mx, my] = PL.toS(2, 1.5);
      drawRich(ctx, '{mv:a}', mx + 22, my - 28, { size: 46, alpha: P(t, 67.6, 68.0) });
    }
    ctx.restore();
  }

  // i fuochi, con le etichette: verso l'esterno finché c'è lo spago che pende, verso il centro sull'ellisse;
  // spariscono mentre lo spago gira (ci passerebbe sopra) e quando i picchetti si muovono
  const f1 = PL.toS(-c, 0), f2 = PL.toS(c, 0);
  dot(ctx, f1, C.v, P(t, 8.4, 8.8, E.back), 12);
  dot(ctx, f2, C.v, P(t, 8.9, 9.3, E.back), 12);
  const le = life(t, 8.5, 34.7, .4, .4), li = life(t, 42.4, 72.0, .5, .4);
  for (const [sx, p, n, t0] of [[-1, f1, '₁', 8.5], [1, f2, '₂', 9.0]]) {
    const a1 = Math.min(le, P(t, t0, t0 + .4));
    if (a1 > 0) drawRich(ctx, '{mv:F' + n + '}', p[0] + sx * 36, p[1] + 46, { size: 44, alpha: a1 });
    if (li > 0) drawRich(ctx, '{mv:F' + n + '}', p[0] - sx * 40, p[1] + 46, { size: 44, alpha: li });
  }

  // P e la sua etichetta (fuori dall'ellisse, dove lo spago non passa; nascosta durante il giro)
  if (Ps) {
    ctx.save(); ctx.globalAlpha *= sa;
    dot(ctx, Ps, C.ink, P(t, 21.6, 22.0, E.back), 12);
    const l0 = life(t, 22.4, 34.7, .4, .4), l1 = life(t, 42.4, 71.9, .5, .4);
    if (l0 > 0) drawRich(ctx, '{mink:P}', Ps[0] + 22, Ps[1] - 46, { size: 44, alpha: l0 });
    if (l1 > 0) drawRich(ctx, '{mink:P}', Ps[0] + 32, Ps[1] - 44, { size: 44, alpha: l1 });
    ctx.restore();
  }
  ctx.restore();
  ctx.restore();
}

// la scheda a destra: tre fasi (le distanze, i semiassi, l'eccentricità)
const PAN = [1050, 110, 790, 690], XS = 1100, XR = 1790, XC = PAN[0] + PAN[2] / 2;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function riga(ctx, label, val, y, col, al, size = 50) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, XS, y, { size, align: 'left' });
  fixedNum(ctx, val, XR, y, size + 4, col);
  ctx.restore();
}
function titolo(ctx, s, al) { if (al > 0) conFont(TITOLI, () => drawRich(ctx, s, XC, 178, { size: 42, weight: 600, alpha: al })); }
function sceneScheda(ctx, t) {
  if (t < 12.4 || t > FINE + .1) return;
  card(ctx, ...PAN, life(t, 12.5, FINE, .5, .7));
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .7, FINE);
  // 1–2 · le distanze
  const fA = life(t, 12.6, 54.6, .5, .4);
  if (fA > 0) {
    ctx.save(); ctx.globalAlpha *= fA;
    titolo(ctx, 'le distanze', 1);
    riga(ctx, '{dim:spago }{mink:2a =}', '10', 265, C.ink, P(t, 13.6, 14.1));
    riga(ctx, '{mink:F₁F₂ =}', '8', 340, C.v, P(t, 17.3, 17.8));
    separa(ctx, 390, P(t, 17.5, 17.9));
    // le distanze di P: le cifre mostrate sommano proprio a quella mostrata sotto
    const [x, y] = posP(t);
    const d1 = Math.round(Math.hypot(x + 4, y) * 100) / 100, d2 = Math.round(Math.hypot(x - 4, y) * 100) / 100;
    riga(ctx, '{mx:PF₁ =}', fmtN(d1), 460, C.x, P(t, 26.0, 26.5));
    riga(ctx, '{my:PF₂ =}', fmtN(d2), 535, C.y, P(t, 26.6, 27.1));
    separa(ctx, 585, P(t, 30.5, 30.9));
    riga(ctx, '{mink:PF₁ + PF₂ =}', fmtN(d1 + d2), 655, C.g, P(t, 30.7, 31.2));
    drawRich(ctx, '{mink:PF₁ + PF₂ = 2a}{dim:,  con  }{mink:2a > F₁F₂}', XC, 750, { size: 40, local: t - 45.7 });
    ctx.restore();
  }
  // 3 · i semiassi
  const fB = life(t, 54.4, FINE, .5, .7);
  if (fB > 0) {
    ctx.save(); ctx.globalAlpha *= fB;
    titolo(ctx, 'i semiassi', 1);
    const voce = (lett, col, nome, val, y, t0) => {
      const k = P(t, t0, t0 + .5); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= k;
      drawRich(ctx, lett, XS, y, { size: 54, align: 'left' });
      txt(ctx, nome, XS + 70, y + 2, { size: 32, color: C.dim, align: 'left' });
      fixedNum(ctx, val, XR, y, 58, col);
      ctx.restore();
    };
    voce('{mv:a}', C.v, 'semiasse maggiore', '5', 275, 54.6);
    voce('{my:b}', C.y, 'semiasse minore', '3', 355, 59.2);
    voce('{mx:c}', C.x, 'semidistanza focale', '4', 435, 63.0);
    separa(ctx, 490, P(t, 67.2, 67.6));
    drawRich(ctx, '{mv:a}{mink:² = }{my:b}{mink:² + }{mx:c}{mink:²}', XC, 575, { size: 60, local: t - 67.3 });
    drawRich(ctx, '{mink:25 = 9 + 16}', XC, 670, { size: 50, local: t - 69.0 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.8, FINE + 9.8);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Nell’ellisse la {g:somma} delle distanze\ndai due fuochi è sempre la stessa.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'la definizione', '{mink:PF₁ + PF₂ = 2a}'], [960, 'i semiassi', '{mink:a² = b² + c²}'], [1430, 'lo spago', '{mink:2a > F₁F₂}']];
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
    titolo: 'L’ellisse del giardiniere', durata: FINE + 11, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 34.2, 'picchetti e spago'], [34.2, 49.7, 'il giro'], [49.7, 71.4, 'i semiassi']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
