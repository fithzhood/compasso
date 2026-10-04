'use strict';
/* Completare il quadrato — x² + 4x − 21 = 0 con le figure: x² è un quadrato, 4x due strisce 2 · x; manca l'angolo 2 · 2 = 4,
   lo si aggiunge ai due membri e (x + 2)² = 25. Il disegno dà x = 3 (x > 0), l'algebra anche x = −7. Argomento: equazioni-secondo-grado. */
CVIDEO.registra('equazioni-secondo-grado/completare-il-quadrato', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, richW, card } = M;

const FINE = 81.6, DUR = 92.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [32.6, 'felice'], [34.7, 'neutro'], [37.0, 'sorpreso'], [39.1, 'neutro'], [45.8, 'felice'], [47.9, 'neutro'],
  [55.5, 'festa'], [57.5, 'neutro'], [59.5, 'felice'], [61.5, 'neutro'], [64.1, 'pensa'], [66.2, 'neutro'],
  [68.6, 'sorpreso'], [70.7, 'neutro'], [77.7, 'festa'], [79.8, 'neutro'], [86.0, 'felice'],
];
const X = '{mx:x}';
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.6, 6.3, `Come si risolve\n${X}{mink:² + 4}${X}{mink: − 21 = 0}?`],
  [7.9, 11.9, `Porto il 21 a destra:\n${X}{mink:² + 4}${X}{mink: = 21}.`],
  // 1 · le aree
  [12.0, 16.4, `Il disegno vale per ${X} positivo:\npenso ${X} come una lunghezza.`],
  [16.5, 20.4, `${X}{mink:²} è l'area del quadrato\ndi lato ${X}.`],
  [20.5, 24.6, `{mink:4}${X} è l'area del rettangolo\ndi lati 4 e ${X}.`],
  [24.7, 29.0, `Lo taglio a metà: due strisce\ndi lati 2 e ${X}.`],
  [29.1, 32.4, 'Sposto una striscia\nsopra il quadrato.'],
  [32.5, 36.9, `L'area non è cambiata:\nè sempre ${X}{mink:² + 4}${X}, cioè 21.`],
  // 2 · il pezzo che manca
  [37.0, 41.6, 'Manca un angolo: un quadratino\ndi lato 2, con area {mink:2 · 2 = 4}.'],
  [41.7, 45.6, 'Aggiungo {g:4} a sinistra,\ne {g:4} anche a destra.'],
  [45.7, 50.4, `Ora è un quadrato di lato ${X}{mink: + 2}:\n{mink:(}${X}{mink: + 2)² = 25}.`],
  [50.5, 55.4, `Il lato è il numero positivo\nche al quadrato fa 25: ${X}{mink: + 2 = 5}.`],
  [55.5, 59.2, `Quindi ${X}{mink: = }{mg:3}: ecco una soluzione.`],
  [59.3, 64.0, `Con ${X}{mink: = 3} i quadretti tornano:\n{mink:9 + 6 + 6 + 4 = 25}.`],
  // 3 · e i negativi?
  [64.1, 68.5, `Ma anche {mink:(−5)² = 25}:\nquindi può essere ${X}{mink: + 2 = −5}.`],
  [68.6, 72.9, `Allora ${X}{mink: = −7}: è negativo,\nnon può essere un lato.`],
  [73.0, 77.6, 'L\'algebra vale per {g:tutti} i numeri:\n{mink:−7} risolve davvero l\'equazione.'],
  [77.7, 81.4, `Le soluzioni sono due:\n${X}{mink: = }{mg:3} e ${X}{mink: = }{mg:−7}.`],
  // chiusura
  [84.0, 89.6, 'Aggiungo il pezzo che manca: il primo\nmembro diventa un quadrato.'],
];

// la figura: x = 3 quadretti, la metà di 4 è 2 quadretti (così con x = 3 la griglia torna)
const U = 90, X0 = 410, Y0 = 720, XQ = X0 + 3 * U, YQ = Y0 - 3 * U, YT = Y0 - 5 * U, SEP = 24;
const CX = 690;   // centro della scheda della figura

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
  conFont(TITOLI, () => drawRich(ctx, 'Completare il quadrato', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
  drawRich(ctx, `${X}{mink:² + 4}${X}{mink: − 21 = 0}`, W / 2, 340, { size: 72, local: t - 2.6, alpha: al });
}

// 1–3 · la figura (12–81.6)
function sceneFigura(ctx, t) {
  if (t < 11.8 || t > FINE + .2) return;
  const al = life(t, 11.9, FINE, .5, .6);
  card(ctx, 290, 110, 800, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  const griglia = P(t, 59.5, 60.3);
  // il quadrato x² cresce dal suo lato
  const hq = 3 * U * P(t, 16.7, 17.6, E.out);
  if (hq > 0) rett(ctx, X0, Y0 - hq, 3 * U, hq, C.x, .18, 3);
  // il rettangolo 4 · x, poi le due strisce 2 · x
  const taglio = t >= 25.6, wr = 4 * U * P(t, 20.7, 21.6, E.out);
  if (!taglio && wr > 0) rett(ctx, XQ, YQ, wr, 3 * U, C.y, .2, 3);
  if (taglio) rett(ctx, XQ, YQ, 2 * U, 3 * U, C.y, .2, 3);
  // la linea del taglio, tratteggiata, finché le strisce non si staccano
  const kt = P(t, 24.9, 25.5);
  if (kt > 0 && t < 26.4) {
    ctx.save(); ctx.globalAlpha *= 1 - P(t, 25.9, 26.4); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.setLineDash([14, 10]);
    ctx.beginPath(); ctx.moveTo(XQ + 2 * U, Y0); ctx.lineTo(XQ + 2 * U, Y0 - 3 * U * kt); ctx.stroke(); ctx.restore();
  }
  // l'angolo che manca: tratteggiato, poi pieno
  const ang = P(t, 37.2, 37.8), pieno = P(t, 41.9, 42.5);
  if (ang > 0) {
    ctx.save(); ctx.globalAlpha *= ang;
    rett(ctx, XQ, YT, 2 * U, 2 * U, C.g, .22 * pieno, 3, pieno < 1);
    ctx.restore();
  }
  // la griglia dei quadretti (x = 3)
  if (griglia > 0) {
    ctx.save(); ctx.globalAlpha *= griglia; ctx.strokeStyle = css(C.ink, .3); ctx.lineWidth = 2;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(X0 + i * U, Y0); ctx.lineTo(X0 + i * U, YT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X0, Y0 - i * U); ctx.lineTo(X0 + 5 * U, Y0 - i * U); ctx.stroke();
    }
    ctx.restore();
  }
  // la striscia che si sposta: si stacca, poi ruota e sale sopra il quadrato
  let cB = null;
  if (taglio) {
    // sale, va a sinistra ruotando (abbastanza in alto da non toccare niente), poi scende al suo posto
    const k1 = P(t, 29.3, 30.1), k2 = P(t, 30.1, 31.1), k3 = P(t, 31.1, 31.7);
    const sep = SEP * P(t, 25.6, 26.4), yUp = Y0 - 4.9 * U;
    const c0 = [XQ + 3 * U + sep, Y0 - 1.5 * U], c1 = [X0 + 1.5 * U, YT + U];
    cB = [lerp(c0[0], c1[0], k2), c0[1] + (yUp - c0[1]) * k1 + (c1[1] - yUp) * k3];
    ctx.save(); ctx.translate(cB[0], cB[1]); ctx.rotate(-Math.PI / 2 * k2);
    rett(ctx, -U, -1.5 * U, 2 * U, 3 * U, C.y, .2, 3);
    ctx.restore();
  }
  // il quadrato completo: bordo verde
  const qa = P(t, 45.9, 46.5);
  if (qa > 0) { ctx.save(); ctx.globalAlpha *= qa; rett(ctx, X0, YT, 5 * U, 5 * U, C.g, 0, 5); ctx.restore(); }
  // il lato x che si disegna
  tratto(ctx, [X0, Y0], [XQ, Y0], C.x, 8, P(t, 12.3, 13.1));
  if (hq > 0) tratto(ctx, [X0, Y0], [X0, Y0 - hq], C.x, 8);

  // nomi dei lati
  const kG = P(t, 59.4, 59.7), kGn = P(t, 59.75, 60.1);   // con la griglia: lettere → numeri
  drawRich(ctx, X, X0 + 1.5 * U, Y0 + 42, { size: 48, alpha: P(t, 12.8, 13.3) * (1 - kG) });
  drawRich(ctx, `${X}{mink: = 3}`, X0 + 1.5 * U, Y0 + 42, { size: 44, alpha: kGn });
  drawRich(ctx, X, X0 - 40, Y0 - 1.5 * U, { size: 48, alpha: P(t, 17.4, 17.9) * (1 - kG) });
  drawRich(ctx, '{mink:3}', X0 - 40, Y0 - 1.5 * U, { size: 48, alpha: kGn });
  drawRich(ctx, '{mink:4}', XQ + 2 * U, Y0 + 42, { size: 48, alpha: life(t, 21.2, 25.6, .4, .3) });
  drawRich(ctx, '{mink:2}', XQ + U, Y0 + 42, { size: 48, alpha: P(t, 25.8, 26.2) });
  if (cB) drawRich(ctx, '{mink:2}', cB[0], Y0 + 42, { size: 48, alpha: P(t, 25.8, 26.2) * (1 - P(t, 29.1, 29.4)) });
  drawRich(ctx, '{mink:2}', X0 - 40, YT + U, { size: 48, alpha: P(t, 31.7, 32.1) });
  // il lato del quadrato completo, sopra
  const kl = P(t, 45.9, 46.5);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X0, YT - 28); ctx.lineTo(X0, YT - 12); ctx.moveTo(X0, YT - 20); ctx.lineTo(X0 + 5 * U, YT - 20);
    ctx.moveTo(X0 + 5 * U, YT - 28); ctx.lineTo(X0 + 5 * U, YT - 12); ctx.stroke(); ctx.restore();
    etichetta(ctx, `${X}{mink: + 2}`, X0 + 2.5 * U, YT - 54, 44, kl);
  }

  // i nomi dei pezzi; con la griglia diventano i quadretti contati
  etichetta(ctx, '{mx:x²}', X0 + 1.5 * U, Y0 - 1.5 * U, 56, P(t, 17.5, 18.0) * (1 - kG), griglia);
  etichetta(ctx, '{mink:9}', X0 + 1.5 * U, Y0 - 1.5 * U, 52, kGn, griglia);
  etichetta(ctx, `{mink:4}${X}`, XQ + 2 * U, Y0 - 1.5 * U, 52, life(t, 21.3, 25.7, .4, .3));
  etichetta(ctx, `{mink:2}${X}`, XQ + U, Y0 - 1.5 * U, 50, P(t, 25.9, 26.3) * (1 - kG), griglia);
  etichetta(ctx, '{mink:6}', XQ + U, Y0 - 1.5 * U, 52, kGn, griglia);
  if (cB) {
    etichetta(ctx, `{mink:2}${X}`, cB[0], cB[1], 50, P(t, 25.9, 26.3) * (1 - kG), griglia);
    etichetta(ctx, '{mink:6}', cB[0], cB[1], 52, kGn, griglia);
  }
  etichetta(ctx, '{mg:4}', XQ + U, YT + U, 52, P(t, 37.5, 37.9), griglia);

  // la riga in alto: che cosa dice la figura adesso
  const riga = (s, a, b) => drawRich(ctx, s, CX, 146, { size: 40, local: t - a, alpha: life(t, a, b, .4, .35) });
  riga(`{dim:area: }${X}{mink:² + 4}${X}{mink: = 21}`, 32.6, 41.9);
  riga(`{dim:area: }${X}{mink:² + 4}${X}{mink: + }{mg:4}{mink: = 25}`, 41.9, 59.5);
  riga('{mink:9 + 6 + 6 + 4 = 25}', 59.5, 68.7);
  riga(`{mr:x = −7}{dim: non è una lunghezza}`, 68.7, 73.1);
  riga('{mink:(−7)² + 4 · (−7) − 21 = 0}', 73.1, FINE + 1);
  ctx.restore();
}

// la scheda dei conti, a destra (7.5–81.6): un passaggio per riga, ciascuno quando Ada lo dice
const L = 1165, FS = 50;
const RIGHE = [
  [7.7, 175, `${X}{mink:² + 4}${X}{mink: − 21 = 0}`],
  [8.3, 275, `${X}{mink:² + 4}${X}{mink: = 21}`],
  [41.9, 375, `${X}{mink:² + 4}${X}{mink: + }{mg:4}{mink: = 21 + }{mg:4}`],
  [45.9, 475, `{mink:(}${X}{mink: + 2)² = 25}`],
  [50.7, 585, `${X}{mink: + 2 = 5}`],
  [64.3, 690, `${X}{mink: + 2 = −5}`],
];
const POI = ' {mink:  ⇒  } ';
const SOL = [[55.7, 585, `${X}{mink: = }{mg:3}`, 50.7], [68.8, 690, `${X}{mink: = }{mg:−7}`, 64.3]];
function sceneConti(ctx, t) {
  if (t < 7.4 || t > FINE + .2) return;
  const ca = life(t, 7.5, FINE, .5, .6);
  card(ctx, 1120, 110, 710, 690, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  for (const [a, y, s] of RIGHE) drawRich(ctx, s, L, y, { size: FS, align: 'left', local: t - a });
  for (const [a, y, s, a0] of SOL) {
    const s0 = RIGHE.find(r => r[0] === a0)[2], x = L + richW(ctx, s0, FS);
    drawRich(ctx, POI, x, y, { size: FS, align: 'left', local: t - a });
    const xs = x + richW(ctx, POI, FS), ws = richW(ctx, s, FS);
    drawRich(ctx, s, xs, y, { size: FS, align: 'left', local: t - a - .2 });
    // le due soluzioni, riquadrate quando Ada le dice insieme
    const kb = P(t, 77.8, 78.3);
    if (kb > 0) {
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(xs - 16, y - 40, ws + 32, 80, 14); ctx.stroke(); ctx.restore();
    }
  }
  // la linea che separa il disegno (x positivo) dall'algebra (tutti i numeri)
  const kd = P(t, 64.2, 64.7);
  if (kd > 0) {
    ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1160, 637); ctx.lineTo(1790, 637); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// 4 · in una frase (81.6–92.5)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Si aggiunge ai due membri il pezzo\nche fa del primo un {g:quadrato}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [500, 600, `${X}{mink:² + 4}${X}{mink: + }{mg:4}{mink: = (}${X}{mink: + 2)²}`],
    [1045, 420, 'lo stesso numero\n{g:ai due membri}'],
    [1490, 400, `disegno: ${X}{mink: > 0}\nalgebra: {g:tutti i numeri}`],
  ];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size: i ? 33 : 40, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Completare il quadrato', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 36.9, 'l\'equazione come aree'], [36.9, 64.0, 'il pezzo che manca'], [64.0, FINE, 'e i numeri negativi?']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
