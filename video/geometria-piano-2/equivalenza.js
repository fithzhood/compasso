'use strict';
/* Stessa area, forme diverse — un parallelogramma di base b e altezza h: si taglia lungo l'altezza, il triangolo
   staccato va dall'altra parte e viene un rettangolo con la stessa base e la stessa altezza. Pezzi a due a due
   congruenti: le figure sono equiscomponibili, quindi equivalenti (stessa area, b · h). Poi un triangolo e una sua
   copia congruente girata di mezzo giro fanno un parallelogramma: il triangolo vale b · h / 2.
   Argomento: geometria-piano-2 (la teoria sta in geometria-piano-2, § equivalenza). */
CVIDEO.registra('geometria-piano-2/equivalenza', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, drawSeq, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['para', 4.8, 'Ecco un parallelogramma: base {mink:b},\naltezza {mink:h}.'],
  ['taglio', 4.6, 'Taglio lungo l’altezza: si stacca\nun {x:triangolo}.'],
  ['sposto', 3.4, 'Lo sposto dall’altra parte…'],
  ['rett', 4.8, '…e combacia: è un {g:rettangolo}\ncon la stessa base e altezza.'],
  ['equisc', 5.4, 'Stessi pezzi, a due a due {v:congruenti}:\nle figure sono {v:equiscomponibili}.'],
  ['equiv', 5.6, 'Quindi hanno la stessa estensione,\ncioè la stessa area: sono {g:equivalenti}.'],
  ['area', 5.4, 'L’area del rettangolo è {mink:b · h}:\nè anche quella del parallelogramma.'],
  ['implica', 4.6, 'Vale sempre: figure equiscomponibili\nsono {g:equivalenti}.'],
  ['tri', 4.4, 'Ora un triangolo con base {mink:b}\ne altezza {mink:h}.', .4],
  ['copia', 3.4, 'Ne prendo una copia {v:congruente}…'],
  ['giro', 4.2, '…la giro di mezzo giro\ne la accosto al lato.'],
  ['paral', 4.8, 'Insieme fanno un {g:parallelogramma}\ncon la stessa base e altezza.'],
  ['meta', 5.6, 'Due triangoli congruenti: ciascuno è\n{g:equivalente} a metà parallelogramma.'],
  ['formula', 4.4, 'Per questo l’area del triangolo\nè {mink:b · h / 2}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Due figure di forma diversa\npossono avere la stessa area?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Stessi pezzi, stessa area: figure\nequiscomponibili sono {g:equivalenti}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.rett, 'sorpreso'], [T.rett + 2.2, 'neutro'], [T.equiv, 'felice'], [T.equiv + 2.4, 'neutro'],
  [T.implica, 'felice'], [T.implica + 2.2, 'neutro'],
  [T.paral, 'sorpreso'], [T.paral + 2.2, 'neutro'], [T.formula, 'festa'], [T.formula + 2.4, 'neutro'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// aiutanti: poligoni pieni, segmenti, tratteggi, etichette
function poli(ctx, pts, fill, stroke, w = 4, al = 1, dash) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round';
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { if (dash) ctx.setLineDash(dash); ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.stroke(); }
  ctx.restore();
}
function seg(ctx, a, b, col, w = 4, k = 1, al = 1, dash) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function retto(ctx, p, al) {   // quadratino dell'angolo retto, in alto a destra del piede
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(p[0], p[1] - 26); ctx.lineTo(p[0] + 26, p[1] - 26); ctx.lineTo(p[0] + 26, p[1]); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, x, y, al, size = 44, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
const sposta = (pts, dx, dy) => pts.map(p => [p[0] + dx, p[1] + dy]);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Stessa area, forme diverse', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · il parallelogramma diventa un rettangolo (7.5–T.tri)
const BL = [180, 640], BR = [720, 640], TR = [900, 370], TL = [360, 370], HP = [360, 640];
const DX = BR[0] - BL[0];   // il triangolo si sposta di una base
function sceneRettangolo(ctx, t) {
  if (t < 7.5 || t > T.tri + .1) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, T.tri - .45, T.tri);
  const kp = P(t, T.para + .2, T.para + 1.0);
  const kCut = P(t, T.taglio + .3, T.taglio + 1.1), kBlu = P(t, T.taglio + 1.1, T.taglio + 1.6);
  const km = P(t, T.sposto + .3, T.sposto + 2.5, E.io), dx = DX * km, dy = -60 * Math.sin(Math.PI * km);
  // il parallelogramma di prima, in piccolo in alto, con il taglio e i due pezzi colorati come nel rettangolo:
  // così le due figure si confrontano pezzo per pezzo
  const kmini = life(t, T.equisc + .3, T.tri, .5, .4);
  if (kmini > 0) {
    const s = .42, mini = p => [110 + (p[0] - BL[0]) * s, 255 + (p[1] - BL[1]) * s];
    poli(ctx, [HP, BR, TR, TL].map(mini), css(C.v, .12), css(C.ink), 3, kmini);
    poli(ctx, [BL, HP, TL].map(mini), css(C.x, .28), css(C.ink), 3, kmini);
    seg(ctx, mini(TL), mini(HP), C.x, 4, 1, kmini, [7, 6]);
    lab(ctx, '{dim:il parallelogramma di prima}', 440, 198, kmini, 30, 'left');
  }
  if (kBlu <= 0) poli(ctx, [BL, BR, TR, TL], css(C.v, .12), css(C.ink), 4, kp);
  else {
    poli(ctx, [HP, BR, TR, TL], css(C.v, .12), css(C.ink), 4);
    poli(ctx, sposta([BL, HP, TL], dx, dy), css(C.x, .1 + .18 * kBlu), css(C.ink), 4);
  }
  // l'altezza, poi il taglio
  const kh = P(t, T.para + 1.6, T.para + 2.2);
  seg(ctx, TL, HP, C.dim, 3, kh, 1 - kBlu, [8, 9]);
  seg(ctx, TL, HP, C.x, 5, kCut, 1 - km);
  retto(ctx, HP, kh * (1 - P(t, T.sposto + .2, T.sposto + .5)));
  // il rettangolo, quando i pezzi combaciano
  poli(ctx, [HP, [TR[0], HP[1]], TR, TL], null, css(C.g), 6, P(t, T.rett + .4, T.rett + .9));
  lab(ctx, '{mink:b}', lerp(450, 630, km), 694, P(t, T.para + .6, T.para + 1.0));
  // h si spegne mentre il triangolo le passa sopra, e torna sul lato sinistro del rettangolo
  lab(ctx, '{mink:h}', 384, 505, kh * (1 - P(t, T.sposto + .1, T.sposto + .4)) + P(t, T.rett + .4, T.rett + .9), 44, 'left');
  ctx.restore();
}

// 2 · il triangolo e la sua copia girata (T.tri–FINE)
const T1 = [180, 640], T2 = [720, 640], T3 = [330, 370], FT = [330, 640], MR = [(T2[0] + T3[0]) / 2, (T2[1] + T3[1]) / 2];
function giraCopia(p, k, off) {   // mezzo giro intorno al punto medio del lato T2T3, in senso orario sullo schermo
  const a = Math.PI * k, x = p[0] - MR[0], y = p[1] - MR[1];
  return [MR[0] + x * Math.cos(a) - y * Math.sin(a) + off[0], MR[1] + x * Math.sin(a) + y * Math.cos(a) + off[1]];
}
function sceneTriangolo(ctx, t) {
  if (t < T.tri - .1 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  const ka = P(t, T.tri + .2, T.tri + .9), kh = P(t, T.tri + 1.3, T.tri + 1.9);
  const kc = P(t, T.copia + .3, T.copia + 1.1, E.out), kg = P(t, T.giro + .3, T.giro + 2.4, E.io);
  const off = [70 * kc * (1 - kg), -70 * kc * (1 - kg)];
  poli(ctx, [T1, T2, T3], css(C.y, .2), css(C.ink), 4, ka);
  if (kc > 0) poli(ctx, [T1, T2, T3].map(p => giraCopia(p, kg, off)), css(C.v, .2), css(C.v), 4, kc);
  // altezza ed etichette: spente mentre la copia gira (le passerebbe sopra), tornano con il parallelogramma
  const kl = (1 - P(t, T.copia, T.copia + .3)) + P(t, T.paral + .3, T.paral + .8);
  seg(ctx, T3, FT, C.dim, 3, kh, kl, [8, 9]);
  retto(ctx, FT, kh * kl);
  poli(ctx, [T1, T2, [T2[0] + T3[0] - T1[0], T3[1]], T3], null, css(C.g), 6, P(t, T.paral + .3, T.paral + .8));
  lab(ctx, '{mink:b}', 450, 694, ka * kl);
  lab(ctx, '{mink:h}', 354, 520, kh * kl, 44, 'left');
  ctx.restore();
}

// la scheda a destra: le due parole nuove, poi l'area del triangolo
const XC = 1450;
function riquadro(ctx, x, y, w, h, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 18); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < T.equisc || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, T.equisc, T.equisc + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  const a1 = 1 - P(t, T.tri - .45, T.tri);   // prima parte: le definizioni
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    conFont(TITOLI, () => drawRich(ctx, 'figure equivalenti', XC, 172, { size: 40, weight: 600, alpha: P(t, T.equisc + .2, T.equisc + .6) }));
    const k1 = P(t, T.equisc + .5, T.equisc + 1.0), k2 = P(t, T.equiv + .5, T.equiv + 1.0);
    lab(ctx, '{v:equiscomponibili}', XC, 270, k1);
    lab(ctx, '{dim:pezzi a due a due congruenti}', XC, 322, k1, 32);
    lab(ctx, '{g:equivalenti}', XC, 420, k2);
    lab(ctx, '{dim:stessa estensione, cioè stessa area}', XC, 472, k2, 32);
    const k3 = P(t, T.area + .5, T.area + 1.0);
    lab(ctx, '{dim:rettangolo e parallelogramma}', XC, 545, k3, 30);
    lab(ctx, '{mink:A = b · h}', XC, 605, k3, 56);
    const k4 = P(t, T.implica + .4, T.implica + .9);
    riquadro(ctx, 1080, 672, 740, 92, k4);
    lab(ctx, '{v:equiscomponibili}{dim:  quindi  }{g:equivalenti}', XC, 718, k4, 34);
    ctx.restore();
  }
  // seconda parte: il triangolo
  conFont(TITOLI, () => drawRich(ctx, 'il triangolo', XC, 172, { size: 40, weight: 600, alpha: P(t, T.tri + .2, T.tri + .6) }));
  const k5 = P(t, T.paral + .5, T.paral + 1.0), k6 = P(t, T.meta + .5, T.meta + 1.0), k7 = P(t, T.formula + .4, T.formula + .9);
  lab(ctx, '{dim:parallelogramma}', XC, 280, k5, 32);
  lab(ctx, '{mink:A = b · h}', XC, 340, k5, 52);
  lab(ctx, '{dim:ciascun triangolo: la metà}', XC, 450, k6, 32);
  riquadro(ctx, 1250, 495, 400, 160, k7);
  if (k7 > 0) drawSeq(ctx, ['{mink:A =}', { num: '{mink:b · h}', den: '{mink:2}' }], XC, 570, 60, { local: t - T.formula - .4 });
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Figure equiscomponibili sono equivalenti:\nhanno la stessa area.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, 540, '{v:equiscomponibili}:\npezzi a due a due congruenti'], [975, 400, '{g:equivalenti}:\nstessa area'], [1455, 450, 'triangolo:\nmetà parallelogramma']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 445, w, 150);
    drawRich(ctx, s, x, 520, { size: 32, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5],
    ['pop', T.para + .2, .4], ['pop', T.para + .6, .3], ['traccia', T.para + 1.6, T.para + 2.2],   // il parallelogramma, b, l'altezza
    ['traccia', T.taglio + .3, T.taglio + 1.1], ['pop', T.taglio + 1.2, .5],                        // il taglio, il triangolo
    ['tono', T.sposto + .3, T.sposto + 2.5, [.4, .55, .62, .55, .4]],                               // il triangolo va dall'altra parte
    ['ding', T.rett + .4],                                                                          // combacia: il rettangolo
    ['soffio', T.equisc], ['traccia', T.equisc + .3, T.equisc + .8], ['pop', T.equisc + .5, .6],    // la scheda, il fantasma, equiscomponibili
    ['pop', T.equiv + .5, .7], ['pop', T.area + .5, .6], ['ding', T.implica + .4],                  // equivalenti, A = b · h, la regola
    ['soffio', T.tri], ['pop', T.tri + .2, .4], ['traccia', T.tri + 1.3, T.tri + 1.9],             // il triangolo e la sua altezza
    ['pop', T.copia + .3, .6],                                                                      // la copia
    ['tono', T.giro + .3, T.giro + 2.4, [.4, .6, .75, .6, .45]],                                    // mezzo giro
    ['ding', T.paral + .3], ['pop', T.paral + .5, .5], ['pop', T.meta + .5, .6],                   // il parallelogramma, la metà
    ['pop', T.formula + .4, .7],                                                                    // A = b · h / 2
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Stessa area, forme diverse', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.tri - .2, 'il parallelogramma'], [T.tri - .2, FINE, 'il triangolo']],
    scena(ctx, t) {
      sceneIntro(ctx, t);
      if (t > 7.5 && t < FINE + .2) card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2) * (1 - P(t, FINE - .6, FINE + .1)));
      sceneRettangolo(ctx, t); sceneTriangolo(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
