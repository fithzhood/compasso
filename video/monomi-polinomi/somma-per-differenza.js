'use strict';
/* Somma per differenza: a² − b² con le aree, il pezzo che si gira e diventa il rettangolo (a + b)(a − b). Argomento: monomi-polinomi. */
CVIDEO.registra('monomi-polinomi/somma-per-differenza', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, richW, card, checkMark } = M;

const FINE = 61.5, DUR = 72.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [32.5, 'felice'], [36.1, 'festa'], [38.3, 'neutro'],
  [53.7, 'felice'], [55.7, 'neutro'], [57.7, 'festa'], [59.8, 'neutro'],
  [FINE, 'neutro'], [65.8, 'felice'],
];
const FUMETTI = [
  [2.6, 6.3, 'Quanto fa {mink:(a + b)(a − b)}?\nGuardiamolo con le aree.'],
  [7.9, 12.0, 'Un quadrato di lato {mx:a}:\nla sua area è {mx:a²}.'],
  [12.1, 16.3, 'Nell\'angolo tolgo un quadrato\npiù piccolo, di lato {my:b}.'],
  [16.4, 19.6, 'Quello che resta ha area\n{mink:a² − b²}.'],
  [19.7, 23.6, 'Lo taglio in due rettangoli\nlungo questa linea.'],
  [23.7, 28.2, 'Quello sotto è {mx:a} per {mink:a − b};\nquello sopra è {mink:a − b} per {my:b}.'],
  [28.3, 32.4, 'Giro quello sopra e lo metto\na destra dell\'altro.'],
  [32.5, 36.0, 'Ecco un rettangolo: base {mink:a + b},\naltezza {mink:a − b}.'],
  [36.1, 40.1, 'L\'area non è cambiata:\n{mink:(a + b)(a − b) = a² − b²}.'],
  [40.2, 45.1, 'È la {v:somma per differenza}: quadrato\ndel primo meno quadrato del secondo.'],
  [45.2, 48.6, 'Il disegno vuole {mink:a > b > 0}:\nsono lunghezze.'],
  [48.7, 53.6, 'Ma il conto vale per {g:tutti} i numeri:\n{mink:−ab} e {mink:+ba} si cancellano.'],
  [53.7, 57.6, 'Serve anche nei conti a mente:\n{mink:21 · 19 = (20 + 1)(20 − 1)}…'],
  [57.7, 60.9, '…{mink:= 20² − 1² = 400 − 1 = 399}.'],
  [63.8, 69.6, 'Il quadrato meno il quadratino\nsi ricompone in {mink:(a + b)(a − b)}.'],
];

// a = 5 quadretti, b = 2: il rettangolo finale è largo a + b = 7 e alto a − b = 3
const U = 95, A = 5 * U, B = 2 * U;
const X0 = 470, Y0 = 720, XR = X0 + A, YT = Y0 - A, XB = XR - B, YB = YT + B;   // XB, YB: dove comincia l'angolo tolto

function rett(ctx, x, y, w, h, col, a, bordo = 0, tratt = false) {
  if (w <= .5 || h <= .5) return;
  ctx.save();
  if (a > 0) { ctx.fillStyle = css(col, a); ctx.fillRect(x, y, w, h); }
  if (bordo > 0) { ctx.strokeStyle = css(col); ctx.lineWidth = bordo; if (tratt) ctx.setLineDash([12, 10]); ctx.strokeRect(x, y, w, h); }
  ctx.restore();
}
function linea(ctx, a, b, k, col = C.ink, w = 3, dash = true) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col, dash ? .75 : 1); ctx.lineWidth = w; if (dash) ctx.setLineDash([14, 10]); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function percorso(ctx, pts, col, w, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineJoin = 'round';
  ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke(); ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Somma per differenza', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il quadrato senza un angolo, che diventa un rettangolo (7.5–61.5)
const FORMULA = '{mink:(a + b)(a − b) = a² − b²}', FX = X0 + (A + B) / 2, FY = 230;
function sceneAree(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 300, 110, 880, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  const dentro = P(t, 8.0, 8.8, E.out);   // il quadrato compare
  const angolo = P(t, 12.2, 12.7);         // l'angolo da togliere si colora…
  const via = P(t, 13.2, 14.0);            // …e se ne va
  const taglio = P(t, 19.9, 20.7), viola = P(t, 20.4, 21.0);
  const giro = t >= 28.5;
  if (dentro > 0) {
    ctx.save(); ctx.globalAlpha *= dentro;
    rett(ctx, X0, YB, A, A - B, C.x, .18);                              // il rettangolo di sotto
    if (!giro) rett(ctx, X0, YT, A - B, B, mix(C.x, C.v, viola), .18);   // quello di sopra
    if (via < 1) {
      ctx.save(); ctx.globalAlpha *= 1 - via;
      rett(ctx, XB, YT, B, B, C.x, .18); rett(ctx, XB, YT, B, B, C.y, .3 * angolo, 4 * angolo);
      ctx.restore();
    }
    const fant = via * (1 - P(t, 19.7, 20.2));   // il posto dell'angolo tolto
    if (fant > 0) { ctx.save(); ctx.globalAlpha *= fant; rett(ctx, XB, YT, B, B, C.y, 0, 3, true); ctx.restore(); }
    if (!giro) {
      percorso(ctx, [[X0, Y0], [XR, Y0], [XR, YT], [X0, YT]], C.ink, 3, 1 - via);
      percorso(ctx, [[X0, Y0], [XR, Y0], [XR, YB], [XB, YB], [XB, YT], [X0, YT]], C.ink, 3, via);
    }
    ctx.restore();
  }
  if (!giro) linea(ctx, [X0, YB], [XB, YB], taglio);
  if (giro) {
    rett(ctx, X0, YB, A, A - B, C.ink, 0, 3);
    // il pezzo di sopra sale, gira di un quarto e scende a destra
    const cx = kf(t, [[29.0, X0 + (A - B) / 2], [29.8, XR + B / 2]]);
    const cy = kf(t, [[28.5, YT + B / 2], [29.0, 280], [29.8, 285], [30.5, YB + (A - B) / 2]]);
    const ang = kf(t, [[29.0, 0], [29.8, Math.PI / 2]]);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
    rett(ctx, -(A - B) / 2, -B / 2, A - B, B, C.v, .18);
    rett(ctx, -(A - B) / 2, -B / 2, A - B, B, C.ink, 0, 3);
    ctx.restore();
    const kg = P(t, 32.6, 33.1);
    if (kg > 0) { ctx.save(); ctx.globalAlpha *= kg; rett(ctx, X0, YB, A + B, A - B, C.g, 0, 5); ctx.restore(); }
  }
  // nomi
  const lab = (s, x, y, a, size = 48, align = 'center') => drawRich(ctx, s, x, y, { size, alpha: a, align });
  lab('{mx:a}', X0 + A / 2, Y0 + 42, P(t, 8.4, 8.9));
  lab('{mx:a}', X0 - 44, (Y0 + YT) / 2, P(t, 8.4, 8.9) * (1 - P(t, 23.7, 24.0)));
  lab('{mx:a²}', X0 + A / 2, (Y0 + YT) / 2, life(t, 8.6, 13.4, .5, .4), 64);
  const kb = life(t, 12.4, 20.0, .4, .4);
  lab('{my:b}', XB + B / 2, YT - 34, kb);
  lab('{my:b}', XR + 40, YT + B / 2, kb);
  lab('{mink:a² − b²}', X0 + A / 2, YB + (A - B) / 2, life(t, 16.5, 23.9, .5, .3), 56);
  lab('{mink:a² − b²}', X0 + (A + B) / 2, YB + (A - B) / 2, P(t, 36.2, 36.7), 56);   // stessa area, nel rettangolo nuovo
  // le misure dei due rettangoli
  lab('{mink:a − b}', X0 - 18, YB + (A - B) / 2, P(t, 23.9, 24.4), 44, 'right');
  const ks = life(t, 23.9, 28.6, .5, .3);
  lab('{mink:a − b}', X0 + (A - B) / 2, YT - 34, ks, 44);
  lab('{my:b}', X0 - 44, YT + B / 2, ks);
  // il rettangolo nuovo: base a + b
  const kn = P(t, 32.6, 33.1);
  lab('{my:b}', XR + B / 2, Y0 + 42, kn);
  if (kn > 0) {
    ctx.save(); ctx.globalAlpha *= kn; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X0, 418); ctx.lineTo(X0, 404); ctx.lineTo(XR + B, 404); ctx.lineTo(XR + B, 418); ctx.stroke(); ctx.restore();
    lab('{mink:a + b}', X0 + (A + B) / 2, 372, kn);
  }
  // la formula, e i nomi dei due fattori
  drawRich(ctx, FORMULA, FX, FY, { size: 60, local: t - 36.2 });
  const kt = P(t, 40.4, 40.9);
  if (kt > 0) {
    const w = richW(ctx, FORMULA, 60), w1 = richW(ctx, '{mink:(a + b)}', 60), w2 = richW(ctx, '{mink:(a − b)}', 60), x0 = FX - w / 2;
    conFont(TITOLI, () => {
      drawRich(ctx, '{v:somma}', x0 + w1 / 2, FY + 64, { size: 32, alpha: kt });
      drawRich(ctx, '{v:differenza}', x0 + w1 + w2 / 2, FY + 64, { size: 32, alpha: kt });
    });
  }
  ctx.restore();
}

// la scheda a destra: per quali numeri vale, e un conto a mente (45–61.5)
function sceneConti(ctx, t) {
  if (t < 45.0 || t > FINE + .2) return;
  const ca = life(t, 45.1, FINE, .6, .6);
  card(ctx, 1220, 110, 600, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const L = 1260;
  drawRich(ctx, '{dim:il disegno: }{mink:a > b > 0}', L, 180, { size: 40, align: 'left', local: t - 45.3 });
  const p1 = 1 - P(t, 53.6, 54.0);
  if (p1 > 0) {
    ctx.save(); ctx.globalAlpha *= p1;
    drawRich(ctx, '{mink:(a + b)(a − b)}', L, 300, { size: 50, align: 'left', local: t - 48.8 });
    const sa = '{mink:= a² }', sb = '{mink:− ab + ba}', sc = '{mink: − b²}';
    drawRich(ctx, sa + sb + sc, L, 390, { size: 50, align: 'left', local: t - 49.1 });
    const ks = P(t, 49.9, 50.5);
    if (ks > 0) {
      const x1 = L + richW(ctx, sa, 50) - 6, x2 = L + richW(ctx, sa + sb, 50) + 6;
      ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x1, 404); ctx.lineTo(lerp(x1, x2, ks), lerp(404, 376, ks)); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, '{mink:= }{mg:a² − b²}', L, 480, { size: 50, align: 'left', local: t - 50.6 });
    drawRich(ctx, '{g:per tutti i numeri}', L, 560, { size: 36, align: 'left', local: t - 51.0 });
    ctx.restore();
  }
  const p2 = P(t, 53.8, 54.2);
  if (p2 > 0) {
    ctx.save(); ctx.globalAlpha *= p2;
    drawRich(ctx, '{mink:21 · 19}', L, 300, { size: 52, align: 'left', local: t - 53.9 });
    drawRich(ctx, '{mink:= (20 + 1)(20 − 1)}', L, 390, { size: 50, align: 'left', local: t - 54.4 });
    drawRich(ctx, '{mink:= 20² − 1²}', L, 480, { size: 50, align: 'left', local: t - 57.8 });
    drawRich(ctx, '{mink:= 400 − 1 = }{mg:399}', L, 570, { size: 52, align: 'left', local: t - 58.4 });
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (61.5–72.5)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, '{mink:(a + b)(a − b)} è un quadrato\nmeno un {g:quadratino}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[500, 600, '{mink:(a + b)(a − b) = a² − b²}'], [1025, 370, '{mink:−ab + ba = 0}'], [1495, 490, '{g:vale per tutti i numeri}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - w / 2, 446, w, 108);
    drawRich(ctx, s, x, 502, { size: 40, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Somma per differenza', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 32.4, 'il quadrato senza un angolo'], [32.4, 45.1, 'un rettangolo nuovo'], [45.1, FINE, 'vale sempre']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneAree(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
