'use strict';
/* (a + b)² con i quadrati: il quadrato di lato a + b si spezza in a², b² e due rettangoli ab; l'errore a² + b². Argomento: monomi-polinomi. */
CVIDEO.registra('monomi-polinomi/quadrato-di-binomio', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, card, checkMark, crossMark } = M;

const FINE = 82.0, DUR = 93;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [18.8, 'felice'], [21.0, 'neutro'], [43.5, 'festa'], [45.8, 'neutro'],
  [57.3, 'sorpreso'], [59.4, 'neutro'], [70.1, 'felice'], [72.2, 'neutro'], [77.7, 'felice'], [79.8, 'neutro'],
  [FINE, 'neutro'], [86.4, 'felice'],
];
const FUMETTI = [
  [2.6, 6.3, 'Quanto fa {mink:(a + b)²}?\nProviamo a disegnarlo.'],
  [7.9, 10.9, 'Ecco un segmento lungo {mx:a}.'],
  [11.0, 15.4, 'Lo allungo di un pezzo {my:b}:\nil lato ora è {mink:a + b}.'],
  [15.5, 18.7, 'Costruisco il quadrato\ndi lato {mink:a + b}.'],
  [18.8, 22.4, 'La sua area è {mink:(a + b)²}:\nlato per lato.'],
  [22.5, 26.4, 'Lo taglio in quattro pezzi\nlungo queste due linee.'],
  [26.5, 30.9, 'Un quadrato di lato {mx:a}:\nla sua area è {mx:a²}.'],
  [31.0, 34.5, 'E un quadrato di lato {my:b}:\narea {my:b²}.'],
  [34.6, 39.0, 'E due rettangoli {mx:a} per {my:b},\ndi area {mink:a · b}, cioè {mv:ab}.'],
  [39.1, 43.4, 'Sommo le aree dei quattro pezzi:\nfanno tutto il quadrato.'],
  [43.5, 47.4, '{mink:ab + ab = 2ab}: è il\n{g:doppio prodotto}.'],
  [47.5, 51.9, 'Il disegno vale per {mx:a} e {my:b} positivi:\nsono lunghezze.'],
  [52.0, 56.5, 'Ma moltiplicando {mink:(a + b)(a + b)}\nesce lo stesso per {g:tutti} i numeri.'],
  [57.3, 60.9, 'Errore tipico: scrivere\n{mr:(a + b)² = a² + b²}.'],
  [61.0, 65.4, 'Così spariscono i due rettangoli:\nmanca il doppio prodotto {mr:2ab}.'],
  [65.5, 70.0, 'Proviamo con {mx:a}{mink: = 3} e {my:b}{mink: = 2}:\nil lato è {mink:3 + 2 = 5}.'],
  [70.1, 73.6, 'Il quadrato grande ha\n{mink:5² = 25} quadretti.'],
  [73.7, 77.6, '{mink:3² + 2²} fa solo {mink:9 + 4 = 13}:\nsono i due quadrati.'],
  [77.7, 81.6, 'Mancano {g:12} quadretti: i due\nrettangoli, {mink:2 · 3 · 2 = 12}.'],
  [84.4, 90.3, 'Quadrato del primo, doppio prodotto,\nquadrato del secondo.'],
];

// il quadrato: a = 3 quadretti, b = 2 quadretti, così con a = 3 e b = 2 la griglia torna
const U = 110, A = 3 * U, B = 2 * U;
const X0 = 470, Y0 = 720, XA = X0 + A, XR = XA + B, YA = Y0 - A, YT = YA - B;

function rett(ctx, x, y, w, h, col, a, bordo = 0, tratt = false) {
  if (w <= .5 || h <= .5) return;
  ctx.save();
  if (a > 0) { ctx.fillStyle = css(col, a); ctx.fillRect(x, y, w, h); }
  if (bordo > 0) { ctx.strokeStyle = css(col); ctx.lineWidth = bordo; if (tratt) ctx.setLineDash([12, 10]); ctx.strokeRect(x, y, w, h); }
  ctx.restore();
}
function tratto(ctx, a, b, col, w, k = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function linea(ctx, a, b, k, al) {   // linea di taglio tratteggiata
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3; ctx.setLineDash([14, 10]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// etichetta, con un fondino del colore della scheda quando sotto passa la griglia
function etichetta(ctx, s, x, y, size, al, fondo = 0) {
  if (al <= 0) return;
  if (fondo > 0) {
    const w = richW(ctx, s, size) + 28, h = size * 1.25;
    ctx.save(); ctx.globalAlpha *= al * fondo; ctx.fillStyle = C.paper;
    ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 12); ctx.fill(); ctx.restore();
  }
  drawRich(ctx, s, x, y, { size, alpha: al });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{mink:(a + b)²} con i quadrati', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il quadrato di lato a + b (7.5–82)
function sceneQuadrato(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, 300, 110, 780, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  const kA = P(t, 8.0, 8.8), kB = P(t, 11.1, 11.8), grow = P(t, 15.7, 16.9, E.out), h = (A + B) * grow;
  const griglia = P(t, 65.6, 66.4);
  if (grow > 0) rett(ctx, X0, Y0 - h, A + B, h, C.dim, .06);
  // i quattro pezzi: accesi uno alla volta, poi restano colorati
  const onA = P(t, 26.6, 27.1), onB = P(t, 31.1, 31.6), onR = P(t, 34.7, 35.2);
  const hA = Math.max(life(t, 26.6, 30.9, .4, .4), life(t, 39.4, 43.4, .4, .4), life(t, 73.8, 77.6, .4, .4));
  const hB = Math.max(life(t, 31.1, 34.5, .4, .4), life(t, 39.4, 43.4, .4, .4), life(t, 73.8, 77.6, .4, .4));
  const hR = Math.max(life(t, 34.7, 39.0, .4, .4), life(t, 39.4, 47.4, .4, .4), life(t, 77.8, 81.6, .4, .4));
  const err = life(t, 61.1, 65.6, .5, .5);   // i rettangoli «spariscono» mentre Ada dice l'errore
  const pezzo = (x, y, w, hh, col, on, hl, a0) => {
    if (on <= 0) return;
    ctx.save(); ctx.globalAlpha *= on;
    rett(ctx, x, y, w, hh, col, a0 + .22 * hl, 2 + 3 * hl);
    ctx.restore();
  };
  pezzo(X0, YA, A, A, C.x, onA, hA, .16);
  pezzo(XA, YT, B, B, C.y, onB, hB, .2);
  if (onR > 0) {
    ctx.save(); ctx.globalAlpha *= onR * (1 - err);
    rett(ctx, X0, YT, A, B, C.v, .16 + .22 * hR, 2 + 3 * hR);
    rett(ctx, XA, YA, B, A, C.v, .16 + .22 * hR, 2 + 3 * hR);
    ctx.restore();
    if (err > 0) {
      ctx.save(); ctx.globalAlpha *= onR * err * .25;
      rett(ctx, X0, YT, A, B, C.r, .06, 4, true);
      rett(ctx, XA, YA, B, A, C.r, .06, 4, true);
      ctx.restore();
    }
  }
  // la griglia dei quadretti (a = 3, b = 2)
  if (griglia > 0) {
    ctx.save(); ctx.globalAlpha *= griglia; ctx.strokeStyle = css(C.ink, .3); ctx.lineWidth = 2;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(X0 + i * U, Y0); ctx.lineTo(X0 + i * U, YT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X0, Y0 - i * U); ctx.lineTo(XR, Y0 - i * U); ctx.stroke();
    }
    ctx.restore();
  }
  // le linee del taglio
  linea(ctx, [XA, Y0], [XA, YT], P(t, 22.9, 23.7), 1);
  linea(ctx, [X0, YA], [XR, YA], P(t, 23.4, 24.2), 1);
  if (grow > 0) { ctx.save(); ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3; ctx.strokeRect(X0, Y0 - h, A + B, h); ctx.restore(); }
  // i lati colorati: a azzurro, b arancio
  tratto(ctx, [X0, Y0], [XA, Y0], C.x, 8, kA);
  tratto(ctx, [XA, Y0], [XR, Y0], C.y, 8, kB);
  if (h > 0) tratto(ctx, [X0, Y0], [X0, Y0 - Math.min(h, A)], C.x, 8);
  if (h > A) tratto(ctx, [X0, YA], [X0, Y0 - h], C.y, 8);
  // nomi dei lati: lettere, poi lettere con il numero
  const kOut = P(t, 65.6, 65.9), kNum = P(t, 65.95, 66.3);
  drawRich(ctx, '{mx:a}', (X0 + XA) / 2, Y0 + 44, { size: 48, alpha: P(t, 8.4, 8.9) * (1 - kOut) });
  drawRich(ctx, '{my:b}', (XA + XR) / 2, Y0 + 44, { size: 48, alpha: P(t, 11.5, 12.0) * (1 - kOut) });
  drawRich(ctx, '{mx:a}{mink: = 3}', (X0 + XA) / 2, Y0 + 44, { size: 46, alpha: kNum });
  drawRich(ctx, '{my:b}{mink: = 2}', (XA + XR) / 2, Y0 + 44, { size: 46, alpha: kNum });
  const kSx = P(t, 16.5, 17.0);
  drawRich(ctx, '{mx:a}', X0 - 44, (Y0 + YA) / 2, { size: 48, alpha: kSx * (1 - kOut) });
  drawRich(ctx, '{my:b}', X0 - 44, (YA + YT) / 2, { size: 48, alpha: kSx * (1 - kOut) });
  drawRich(ctx, '{mx:a}{mink: = 3}', X0 - 20, (Y0 + YA) / 2, { size: 40, align: 'right', alpha: kNum });
  drawRich(ctx, '{my:b}{mink: = 2}', X0 - 20, (YA + YT) / 2, { size: 40, align: 'right', alpha: kNum });
  // il lato intero, sopra il segmento, prima che cresca il quadrato
  drawRich(ctx, '{mink:a + b}', X0 + (A + B) / 2, Y0 - 52, { size: 48, alpha: life(t, 11.9, 15.6, .4, .3) });
  // l'area del quadrato intero: esce prima che arrivino le linee del taglio
  etichetta(ctx, '{mink:(a + b)²}', X0 + (A + B) / 2, Y0 - (A + B) / 2, 64, life(t, 18.9, 22.8, .5, .35));
  // i nomi dei pezzi; i numeri dei quadretti arrivano quando Ada li conta
  const o1 = P(t, 73.8, 74.0), n1 = P(t, 74.05, 74.35), o2 = P(t, 77.8, 78.0), n2 = P(t, 78.05, 78.35);
  etichetta(ctx, '{mx:a²}', X0 + A / 2, YA + A / 2, 60, onA * (1 - o1), griglia);
  etichetta(ctx, '{mx:a²}{mink: = 9}', X0 + A / 2, YA + A / 2, 52, n1, griglia);
  etichetta(ctx, '{my:b²}', XA + B / 2, YT + B / 2, 54, onB * (1 - o1), griglia);
  etichetta(ctx, '{my:b²}{mink: = 4}', XA + B / 2, YT + B / 2, 46, n1, griglia);
  const sAB = err > 0 ? '{mr:ab}' : '{mv:ab}';
  etichetta(ctx, sAB, X0 + A / 2, YT + B / 2, 54, onR * (1 - o2) * (1 - .85 * err), griglia);
  etichetta(ctx, sAB, XA + B / 2, YA + A / 2, 54, onR * (1 - o2) * (1 - .85 * err), griglia);
  etichetta(ctx, '{mv:ab}{mink: = 6}', X0 + A / 2, YT + B / 2, 48, n2, griglia);
  etichetta(ctx, '{mv:ab}{mink: = 6}', XA + B / 2, YA + A / 2, 46, n2, griglia);
  ctx.restore();
}

// la scheda dei conti, a destra (39–82)
function sceneConti(ctx, t) {
  if (t < 38.8 || t > FINE + .2) return;
  const ca = life(t, 38.9, FINE, .6, .6);
  card(ctx, 1110, 110, 710, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const L = 1160;
  const p1 = 1 - P(t, 56.6, 57.1);
  if (p1 > 0) {
    ctx.save(); ctx.globalAlpha *= p1;
    drawRich(ctx, '{mink:(a + b)²}', L, 210, { size: 60, align: 'left', local: t - 39.2 });
    drawRich(ctx, '{mink:= }{mx:a²}{mink: + }{mv:ab}{mink: + }{mv:ab}{mink: + }{my:b²}', L, 310, { size: 56, align: 'left', local: t - 39.6, stagger: .12 });
    const s3 = '{mink:= }{mx:a²}{mink: + }{mg:2ab}{mink: + }{my:b²}';
    drawRich(ctx, s3, L, 410, { size: 56, align: 'left', local: t - 43.6 });
    const kb = P(t, 44.3, 44.8);
    if (kb > 0) {
      const w = richW(ctx, s3, 56);
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(L - 20, 410 - 46, w + 40, 92, 14); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, '{dim:il disegno: }{mx:a}{mink: > 0, }{my:b}{mink: > 0}', L, 545, { size: 40, align: 'left', local: t - 47.6 });
    drawRich(ctx, '{mink:(a + b)(a + b) = a² + 2ab + b²}', L, 640, { size: 40, align: 'left', local: t - 52.1 });
    drawRich(ctx, '{g:vale per tutti i numeri}', L, 712, { size: 36, align: 'left', local: t - 52.8 });
    ctx.restore();
  }
  const p2 = P(t, 57.2, 57.6);
  if (p2 > 0) {
    ctx.save(); ctx.globalAlpha *= p2;
    drawRich(ctx, '{mr:(a + b)² = a² + b²}', L, 210, { size: 56, align: 'left', local: t - 57.4 });
    crossMark(ctx, 1765, 210, P(t, 58.0, 58.8), C.r, .3);
    drawRich(ctx, '{dim:manca }{mr:2ab}', L, 310, { size: 48, align: 'left', local: t - 61.2 });
    drawRich(ctx, '{mink:(3 + 2)² = 5² = 25}', L, 440, { size: 52, align: 'left', local: t - 70.2 });
    drawRich(ctx, '{mink:3² + 2² = 9 + 4 = }{mr:13}', L, 545, { size: 52, align: 'left', local: t - 73.8 });
    drawRich(ctx, '{mink:25 − 13 = }{mg:12}{mink: = 2 · 3 · 2}', L, 650, { size: 50, align: 'left', local: t - 77.8 });
    ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (82–93)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, '{mink:(a + b)²} ha quattro pezzi:\ndue quadrati e {g:due rettangoli}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[515, 640, '{mink:(a + b)² = a² + 2ab + b²}'], [1045, 340, '{r:non} {mink:a² + b²}'], [1490, 470, '{g:doppio prodotto} {mink:2ab}']];
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
    titolo: '(a + b)² con i quadrati', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 39.0, 'il quadrato di lato {mink:a + b}'], [39.0, 56.8, 'la somma delle aree'], [56.8, FINE, 'l\'errore più comune']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneQuadrato(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
