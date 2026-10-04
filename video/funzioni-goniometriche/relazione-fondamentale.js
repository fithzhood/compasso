'use strict';
/* sin² α + cos² α = 1 — sulla circonferenza goniometrica coseno, seno e raggio formano un triangolo rettangolo:
   Pitagora dà la relazione fondamentale; a 120° i cateti sono |cos α| e |sin α| e i quadrati non cambiano;
   esempio del sito: sin α = 3/5 nel secondo quadrante → cos α = −4/5. Argomento: funzioni-goniometriche. */
CVIDEO.registra('funzioni-goniometriche/relazione-fondamentale', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, dashed, arrowHead, card } = M;

// FINE0: fine nel tempo delle scene; FINE: nel tempo del video (le scene leggono il tempo «stirato», vedi tempoScena)
const FINE0 = 75.4, FINE = FINE0 + 3.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [19.6, 'felice'], [21.8, 'neutro'],
  [28.5, 'festa'], [30.9, 'neutro'], [41.1, 'felice'], [43.1, 'neutro'], [45.2, 'pensa'], [49.9, 'neutro'],
  [54.6, 'felice'], [56.8, 'neutro'], [70.0, 'pensa'], [74.2, 'felice'], [76.6, 'neutro'],
  [FINE + 1.0, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; il punto gira nei fumetti 2 e 10, e fra il 12 e il 13
const FUMETTI = [
  [2.0, 6.5, 'Dal seno ({my:sin}) di un angolo\nsi ricava il coseno ({mx:cos})?'],
  // 1 · da Pitagora
  [7.9, 11.6, 'La circonferenza goniometrica:\ncentro nell’origine, raggio 1.'],
  [11.8, 15.3, 'Ruoto il raggio di un angolo\n{mv:α} (alfa)…'],
  [15.5, 19.4, '…e arrivo al punto {mink:P},\ndi coordinate {mink:(}{mx:cos α}{mink:; }{my:sin α}{mink:)}.'],
  [19.6, 23.6, 'Coseno, seno e raggio formano\nun triangolo {g:rettangolo}.'],
  [23.8, 28.3, 'I cateti sono lunghi {mx:cos α} e {my:sin α},\nl’ipotenusa è il raggio: 1.'],
  [28.5, 32.0, 'Per Pitagora:\n{my:sin² α}{mink: + }{mx:cos² α}{mink: = 1}.'],
  [32.2, 36.7, '{my:sin² α} vuol dire {mink:(}{my:sin α}{mink:)²}:\nprima il seno, poi il quadrato.'],
  [36.9, 40.9, 'Con {mv:α}{ink: = 60°}: {my:sin α}{mink: = √3/2}\ne {mx:cos α}{mink: = 1/2}.'],
  [41.1, 45.1, 'I quadrati: {my:3/4} e {mx:1/4}.\nLa somma fa {g:1}.'],
  // 2 · negli altri quadranti
  [45.2, 49.7, 'Vale anche dove seno o coseno\nsono negativi? Giro fino a 120°…'],
  [49.9, 54.4, 'Ora {mx:cos α} è negativo: i cateti sono\n{mink:|}{mx:cos α}{mink:|} e {mink:|}{my:sin α}{mink:|}, valori assoluti.'],
  [54.6, 59.1, 'Al quadrato il segno non conta:\n{mx:cos² α}{mink: = 1/4}, la somma fa ancora {g:1}.'],
  // 3 · dal seno al coseno
  [61.5, 65.8, 'Esempio: {my:sin α}{mink: = 3/5}, con {mv:α} nel\nsecondo quadrante, in alto a sinistra.'],
  [66.0, 69.8, 'Dalla relazione: {mx:cos² α}{mink: = 1 − }{my:sin² α}\n{mink:= 1 − 9/25 = 16/25}.'],
  [70.0, 74.0, 'Due numeri hanno quadrato 16/25:\n{mink:4/5} e {mink:−4/5}.'],
  [74.2, 78.7, '{mink:P} sta a sinistra dell’asse {my:y}: il\ncoseno è negativo, {mx:cos α}{mink: = −4/5}.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Da {my:sin² α}{mink: + }{mx:cos² α}{mink: = 1} ricavi {mx:cos² α};\nil segno di {mx:cos α} lo dà il quadrante.'],
];

// il piano: O al centro della circonferenza goniometrica, U pixel per unità (stessa unità sui due assi)
const O = [560, 455], U = 240;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const CARD = [130, 110, 900, 690];
const RAD = Math.PI / 180;
const A3 = 180 - Math.atan2(3, 4) / RAD;   // l'angolo del secondo quadrante con seno 3/5 (≈ 143,13°)
// l'angolo α in gradi: gira solo in questi tratti
const ANG = [[12.0, 0], [14.2, 60], [43.6, 60], [45.8, 120], [55.8, 120], [57.8, A3]];
const MOV = [[12.0, 14.2], [43.6, 45.8], [55.8, 57.8]];
const alfa = t => kf(t, ANG);
// il tempo delle scene: le animazioni sono scritte su un copione più corto; il fumetto «Ruoto…» e il fumetto
// «…e arrivo al punto P» hanno ciascuno il suo tratto, e fra i due il disegno sta fermo
const STIRA = [[0, 0], [11.8, 11.8], [14.6, 14.15], [15.6, 14.15], [17.45, 16.0], [19.6, 16.0], [200, 200 - 3.6]];
const tempoScena = t => { for (let i = 1; i < STIRA.length; i++) if (t <= STIRA[i][0]) { const [a, b] = STIRA[i - 1], [c, d] = STIRA[i]; return b + (d - b) * (t - a) / (c - a); } return t - 3.6; };
// mentre il punto gira le etichette che lo seguono si spengono: le linee tratteggiate le attraverserebbero
const fermo = t => 1 - Math.max(...MOV.map(([a, b]) => life(t, a - .3, b + .3, .3, .3)));
function linea(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// numeri degli assi, pieni su un fondino, fuori dalla circonferenza (lì non passa niente che si muove)
function numero(ctx, s, p, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.roundRect(p[0] - 26, p[1] - 21, 52, 42, 9); ctx.fill();
  txt(ctx, s, p[0], p[1], { size: 34, color: C.dim });
  ctx.restore();
}
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S(-1.42 * k, 0)); ctx.lineTo(...S(1.55 * k, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S(0, -1.3 * k)); ctx.lineTo(...S(0, 1.26 * k)); ctx.stroke();
  arrowHead(ctx, [S(1.55 * k, 0)[0] + 6, O[1]], 0, C.ink);
  arrowHead(ctx, [O[0], S(0, 1.26 * k)[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', S(1.55, 0)[0] + 40, O[1], { size: 44 });
  drawRich(ctx, '{my:y}', O[0] + 34, S(0, 1.26)[1] + 6, { size: 44 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, '{my:sin² α}{mink: + }{mx:cos² α}{mink: = 1}', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// il piano con la circonferenza, il punto P, il triangolo (7.5–FINE0)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE0 + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE0 - .6, FINE0 + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  const kc = P(t, 7.9, 9.0, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, -2 * Math.PI * kc, true); ctx.stroke(); ctx.restore();
  }
  const kn = P(t, 9.0, 9.5);
  if (kn > 0) {
    ctx.save(); ctx.globalAlpha *= kn; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    [1, -1].forEach(x => { ctx.beginPath(); ctx.moveTo(S(x, 0)[0], O[1] - 9); ctx.lineTo(S(x, 0)[0], O[1] + 9); ctx.stroke(); });
    [1, -1].forEach(y => { ctx.beginPath(); ctx.moveTo(O[0] - 9, S(0, y)[1]); ctx.lineTo(O[0] + 9, S(0, y)[1]); ctx.stroke(); });
    ctx.restore();
    numero(ctx, '1', S(1.1, -.11), kn); numero(ctx, '−1', S(-1.13, -.11), kn);
    numero(ctx, '1', S(-.11, 1.1), kn); numero(ctx, '−1', S(-.14, -1.1), kn);
  }

  const a = alfa(t) * RAD, c = Math.cos(a), s = Math.sin(a), Pp = S(c, s), H = S(c, 0), Y = S(0, s);
  const ferma = fermo(t);
  // l'angolo α: arco al centro; il nome a metà dell'arco, oltre i 100° vicino all'inizio
  const ka = P(t, 12.0, 12.4);
  if (ka > 0 && a > .01) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(O[0], O[1], .2 * U, 0, -a, true); ctx.stroke(); ctx.restore();
    const am = a <= 100 * RAD ? a / 2 : 18 * RAD, rm = a <= 100 * RAD ? .33 : .31;
    drawRich(ctx, '{mv:α}', ...S(rm * Math.cos(am), rm * Math.sin(am)), { size: 44, alpha: ka * P(t, 12.6, 13.0) * ferma });
  }
  // il triangolo rettangolo, sotto le linee
  const kt = P(t, 16.8, 17.4);
  if (kt > 0) {
    ctx.save(); ctx.globalAlpha *= kt * .14; ctx.fillStyle = css(C.v);
    ctx.beginPath(); ctx.moveTo(...O); ctx.lineTo(...H); ctx.lineTo(...Pp); ctx.closePath(); ctx.fill(); ctx.restore();
    const q = .08, sx = -Math.sign(c), sy = Math.sign(s);
    ctx.save(); ctx.globalAlpha *= kt; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(...S(c + sx * q, 0)); ctx.lineTo(...S(c + sx * q, sy * q)); ctx.lineTo(...S(c, sy * q)); ctx.stroke(); ctx.restore();
  }
  // le coordinate: coseno sull'asse x, seno sull'asse y, e la copia del seno sul lato del triangolo
  const kd = P(t, 14.4, 14.9), kcx = P(t, 14.6, 15.1), ksy = P(t, 14.9, 15.4);
  dashed(ctx, Pp, H, C.x, kd, .9);
  dashed(ctx, Pp, Y, C.y, kd, .9);
  if (kcx > 0) glowStroke(ctx, [O, S(c * kcx, 0)], 1, C.x, 8);
  if (ksy > 0) glowStroke(ctx, [O, S(0, s * ksy)], 1, C.y, 8);
  const kv = P(t, 16.2, 17.2);
  if (kv > 0) glowStroke(ctx, [S(c * kv, 0), S(c * kv, s)], 1, C.y, 8);
  const kr = P(t, 11.9, 12.3);
  if (kr > 0) linea(ctx, O, Pp, C.ink, 5, kr);
  dot(ctx, O, C.ink, P(t, 8.0, 8.3, E.back), 8);
  dot(ctx, Pp, C.v, P(t, 14.2, 14.6, E.back), 12);
  // le etichette, dalla parte opposta a P; dal secondo quadrante in poi i cateti sono i valori assoluti
  const ass = P(t, 46.4, 46.8);
  const lP = P(t, 14.3, 14.7) * ferma;
  if (lP > 0) drawRich(ctx, '{mink:P}', ...S(1.16 * c, 1.16 * s), { size: 44, alpha: lP });
  const lc = P(t, 15.0, 15.4) * ferma, pc = S(c >= 0 ? c / 2 : Math.min(c / 2, -.27), -.13);
  if (lc > 0) {
    drawRich(ctx, '{mx:cos α}', ...pc, { size: 40, alpha: lc * (1 - ass) });
    drawRich(ctx, '{mink:|}{mx:cos α}{mink:|}', ...pc, { size: 38, alpha: lc * ass });
  }
  const ls = P(t, 15.3, 15.7) * ferma, ps = S(c >= 0 ? -.25 : .3, Math.abs(s) < .65 ? .75 * s : s / 2);
  if (ls > 0) {
    drawRich(ctx, '{my:sin α}', ...ps, { size: 40, alpha: ls * (1 - ass) });
    drawRich(ctx, '{mink:|}{my:sin α}{mink:|}', ...ps, { size: 38, alpha: ls * ass });
  }
  // l'ipotenusa è il raggio: 1, dalla parte di fuori del triangolo
  const l1 = P(t, 20.6, 21.0) * ferma;
  if (l1 > 0) {
    let nx = -s, ny = c; if (nx * c > 0) { nx = -nx; ny = -ny; }
    drawRich(ctx, '{mink:1}', ...S(.6 * c + .13 * nx, .6 * s + .13 * ny), { size: 44, alpha: l1 });
  }
  ctx.restore();
}

// la scheda a destra
const XS = 1465, XA = 1300, XB = 1635;
const fr = (n, d) => ({ num: '{mink:' + n + '}', den: '{mink:' + d + '}' });
function riquadro(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .75); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 16); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 24.9 || t > FINE0 + .2) return;
  const la = P(t, 24.9, 25.5) * (1 - P(t, FINE0 - .6, FINE0 + .1));
  card(ctx, 1110, 120, 710, 680, la);
  ctx.save(); ctx.globalAlpha *= la;
  // la relazione, in cima per tutto il video
  riquadro(ctx, XS, 205, 560, 88, C.v, P(t, 25.1, 25.5));
  drawRich(ctx, '{my:sin² α}{mink: + }{mx:cos² α}{mink: = 1}', XS, 205, { size: 52, local: t - 25.1 });
  // 1–2 · che cosa vuol dire sin² α, e i conti a 60° e a 120°
  const f1 = 1 - P(t, 55.6, 56.0);
  if (f1 > 0) {
    ctx.save(); ctx.globalAlpha *= f1;
    drawRich(ctx, '{my:sin² α}{mink: = (}{my:sin α}{mink:)²}', XS, 305, { size: 44, local: t - 28.8 });
    const k60 = P(t, 33.5, 33.9), k120 = P(t, 45.8, 46.3);
    // mentre il raggio va da 60° a 120° i valori non valgono: si spengono e tornano a rotazione finita
    const kgira = 1 - life(t, 43.3, 46.1, .3, .3);
    ctx.save(); ctx.globalAlpha *= kgira;
    drawRich(ctx, 'con {v:α} = 60°', XS, 385, { size: 44, alpha: k60 * (1 - k120) });
    drawRich(ctx, 'con {v:α} = 120°', XS, 385, { size: 44, alpha: k120 });
    drawSeq(ctx, ['{my:sin α}{mink: =}', fr('√3', 2)], XA, 470, 40, { local: t - 33.6 });
    drawSeq(ctx, ['{mx:cos α}{mink: =}', fr(1, 2)], XA, 590, 40, { local: t - 34.6, alpha: 1 - k120 });
    drawSeq(ctx, ['{mx:cos α}{mink: = −}', fr(1, 2)], XA, 590, 40, { alpha: k120 });
    drawSeq(ctx, ['{my:sin² α}{mink: =}', fr(3, 4)], XB, 470, 40, { local: t - 37.6 });
    drawSeq(ctx, ['{mx:cos² α}{mink: =}', fr(1, 4)], XB, 590, 40, { local: t - 38.1 });
    drawSeq(ctx, [fr(3, 4), '{mink:+}', fr(1, 4), '{mink:=}', '{mg:1}'], XS, 705, 40, { local: t - 38.8 });
    // il quadrato di −1/2 è ancora 1/4
    riquadro(ctx, XB, 590, 250, 118, C.g, life(t, 51.1, 55.5, .3, .3));
    ctx.restore();
    ctx.restore();
  }
  // 3 · dal seno al coseno
  if (t > 57.9) {
    drawSeq(ctx, ['{my:sin α}{mink: =}', fr(3, 5)], XS, 330, 40, { local: t - 58.2 });
    drawRich(ctx, '{mx:cos² α}{mink: = 1 − }{my:sin² α}', XS, 440, { size: 44, local: t - 62.4 });
    drawSeq(ctx, ['{mink:= 1 −}', fr(9, 25), '{mink:=}', fr(16, 25)], XS, 545, 40, { local: t - 63.6 });
    const kmeno = P(t, 70.8, 71.2);
    drawSeq(ctx, ['{mx:cos α}{mink: = ±}', fr(4, 5)], XS, 680, 44, { local: t - 66.6, alpha: 1 - kmeno });
    drawSeq(ctx, ['{mx:cos α}{mink: = −}', { num: '{mg:4}', den: '{mg:5}' }], XS, 680, 44, { alpha: kmeno });
    riquadro(ctx, XS, 680, 290, 128, C.g, kmeno);
  }
  ctx.restore();
}

// chiusura (FINE0–durata)
function sceneFine(ctx, t) {
  if (t < FINE0) return;
  const al = 1 - P(t, FINE0 + 8.6, FINE0 + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE0 - .4 });
    drawRich(ctx, 'Per ogni angolo {my:sin² α}{mink: + }{mx:cos² α}{mink: = 1}:\nè il teorema di Pitagora.', W / 2, 290, { size: 64, weight: 600, local: t - FINE0 - .8, stagger: .08 });
  });
  const pills = [[490, '{my:sin² α}{mink: = (}{my:sin α}{mink:)²}', 40], [960, 'vale in tutti\ni quadranti', 34], [1430, 'il segno del coseno\nlo dà il quadrante', 34]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE0 + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 455, 430, 130);
    drawRich(ctx, s, px, 520, { size, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'sin² α + cos² α = 1', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 45.3, 'dal teorema di Pitagora'], [45.3, 59.3, 'negli altri quadranti'], [59.3, FINE, 'dal seno al coseno']],
    scena(ctx, t) { const u = tempoScena(t); sceneIntro(ctx, u); scenePiano(ctx, u); sceneScheda(ctx, u); sceneFine(ctx, u); },
  };
});
