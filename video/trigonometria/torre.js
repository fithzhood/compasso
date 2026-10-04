'use strict';
/* L’altezza di una torre — da 45 m la cima si vede sotto un angolo di elevazione di 40°; gli occhi sono a 1,6 m.
   x = 45 · tan 40° ≈ 37,8 m (tratto sopra gli occhi, secondo teorema), h ≈ 37,8 + 1,6 = 39,4 m. Figura in scala.
   Lettere come il sito: d distanza, α elevazione, x tratto sopra gli occhi, h altezza. Argomento: trigonometria. */
CVIDEO.registra('trigonometria/torre', M => {
  const { W, C, E, P, life, lerp, css, mix, TITOLI, conFont, drawRich, richW, dot, glowStroke, dashed, card } = M;

const SEQ = [
  ['torre', 4.3, 'Ecco la torre: la sua altezza {my:h}\nè quella che cerco.'],
  ['dist', 4.4, 'Mi metto a {mx:d}{mink: = 45} m dalla base:\nquesta distanza si misura.'],
  ['guardo', 4.3, 'Guardo la cima: la linea degli occhi\nsale sopra l’orizzontale.'],
  ['elev', 4.6, 'L’angolo fra le due è l’{v:angolo di}\n{v:elevazione}: {mv:α}{mink: = }40°.'],
  ['occhi', 4.8, 'Il triangolo parte dagli occhi,\nche sono a 1,6 m da terra.'],
  ['tri', 5.0, 'Occhi, cima e il punto della torre\nall’altezza degli occhi: è {g:rettangolo}.'],
  ['adi', 4.1, 'I 45 m sono il cateto {x:adiacente}\nall’angolo {mv:α}.'],
  ['x', 4.8, 'Il tratto {my:x} di torre sopra gli occhi\nè il cateto {y:opposto}.'],
  ['tan', 3.6, 'Due cateti: serve la {v:tangente}.\n{my:x}{mink: = }{mx:d}{mink: · tan α}.'],
  ['conto', 4.4, 'Con i numeri: {my:x}{mink: = 45 · tan }40°\n{mink:≈ 45 · 0,839 ≈ 37,8} m.'],
  ['somma', 4.2, 'Aggiungo l’altezza degli occhi:\n{my:h}{mink: ≈ 37,8 + 1,6 = 39,4} m.'],
  ['risult', 3.4, 'La torre è alta circa {g:39,4 m}!'],
  ['senza', 5.0, 'Se il problema non dà l’altezza degli\nocchi, l’osservatore è a terra: {my:h}{mink: = }{my:x}.', 1.6],   // l'occhio scende nella pausa
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Come si misura l’altezza di una torre\nsenza salirci?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Distanza per la tangente dell’angolo,\npiù l’altezza degli occhi.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.elev, 'felice'], [T.elev + 2.2, 'neutro'], [T.occhi, 'sorpreso'], [T.occhi + 2.2, 'neutro'],
  [T.tri, 'felice'], [T.tri + 2.4, 'neutro'], [T.tan, 'pensa'], [T.conto, 'neutro'],
  [T.risult, 'festa'], [T.senza, 'pensa'], [T.senza + 2.6, 'neutro'],
  [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];

// la figura in scala: 45 m = 600 px
const SC = 600 / 45, YG = 730, XO = 260, XT = 860, TW = 70;
const TANA = Math.tan(40 * Math.PI / 180), XM = 45 * TANA;           // 37,76 m sopra gli occhi
const EYE0 = [XO, YG - 1.6 * SC], TOP0 = [XT, EYE0[1] - XM * SC];
function seg(ctx, a, b, col, w = 4, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// quota: segmento con due stanghette, verticale (v) o orizzontale
function quota(ctx, a, b, col, al, v) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
  for (const p of [a, b]) { if (v) { ctx.moveTo(p[0] - 9, p[1]); ctx.lineTo(p[0] + 9, p[1]); } else { ctx.moveTo(p[0], p[1] - 9); ctx.lineTo(p[0], p[1] + 9); } }
  ctx.stroke(); ctx.restore();
}
// etichetta su un fondino della carta (copre la quota che le passa sotto)
function targa(ctx, s, x, y, al, size = 40) {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 24;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x - w / 2, y - size * .6, w, size * 1.2, 10); ctx.fill(); ctx.restore();
  drawRich(ctx, s, x, y, { size, alpha: al });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’altezza di una torre', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  // l'altro caso, nella pausa prima del fumetto: l'occhio scende a terra (stessi d e α), il triangolo lo segue e h = x
  const kGiu = P(t, T.senza - 1.6, T.senza - .2, E.io), giu = kGiu * 1.6 * SC;
  const EYE = [EYE0[0], EYE0[1] + giu], K = [XT, EYE[1]], TOP = [XT, TOP0[1] + giu];
  // terreno e torre
  seg(ctx, [210, YG], [985, YG], C.ink, 3, P(t, 7.7, 8.4));
  const kt = P(t, 8.0, 8.8);
  if (kt > 0) {
    ctx.save(); ctx.globalAlpha *= kt;
    ctx.fillStyle = css(C.dim, .16); ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(XT, TOP[1], TW, YG - TOP[1]); ctx.fill(); ctx.stroke();
    ctx.fillStyle = css(C.ink, .35);
    for (let y = TOP[1] + 40; y < YG - 60; y += 90) { ctx.beginPath(); ctx.roundRect(XT + TW / 2 - 9, y, 18, 30, [9, 9, 0, 0]); ctx.fill(); }
    ctx.beginPath(); ctx.roundRect(XT + TW / 2 - 14, YG - 44, 28, 44, [14, 14, 0, 0]); ctx.fill();
    ctx.restore();
  }
  // la quota h, a destra della torre
  const kh = P(t, T.torre + .3, T.torre + .8);
  quota(ctx, [XT + TW + 18, YG], [XT + TW + 18, TOP[1]], C.y, kh, true);
  drawRich(ctx, '{my:h}', XT + TW + 30, (YG + TOP[1]) / 2, { size: 46, align: 'left', alpha: kh });
  // l'osservatore, in scala (1,7 m)
  const ko = P(t, T.dist + .2, T.dist + .6) * (1 - kGiu);
  if (ko > 0) {
    ctx.save(); ctx.globalAlpha *= ko; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3; ctx.lineCap = 'round';
    const top = YG - 1.7 * SC;
    ctx.beginPath(); ctx.moveTo(XO - 5, YG); ctx.lineTo(XO, YG - 10); ctx.lineTo(XO + 5, YG); ctx.moveTo(XO, YG - 10); ctx.lineTo(XO, top + 8); ctx.stroke();
    ctx.beginPath(); ctx.arc(XO, top + 4.5, 4.5, 0, Math.PI * 2); ctx.fillStyle = css(C.ink); ctx.fill();
    ctx.restore();
  }
  // la distanza d, sotto il terreno
  const kd = P(t, T.dist + .4, T.dist + .9);
  quota(ctx, [XO, YG + 42], [XT, YG + 42], C.x, kd, false);
  targa(ctx, '{mx:d}{mink: = 45}{ink: m}', (XO + XT) / 2, YG + 42, kd);
  // l'orizzontale degli occhi e la linea verso la cima
  const kOr = P(t, T.guardo + .2, T.guardo + .9), kVis = P(t, T.guardo + .9, T.guardo + 1.9, E.lin);
  dashed(ctx, EYE, K, C.ink, kOr, .8 * (1 - kGiu));
  if (kVis > 0) glowStroke(ctx, [EYE, TOP], kVis, C.v, 4);
  // l'angolo di elevazione
  const ka = P(t, T.elev + .2, T.elev + .6);
  if (ka > 0) {
    const a1 = -40 * Math.PI / 180;
    ctx.save(); ctx.globalAlpha *= ka;
    ctx.beginPath(); ctx.moveTo(EYE[0], EYE[1]); ctx.arc(EYE[0], EYE[1], 110, 0, a1, true); ctx.closePath(); ctx.fillStyle = css(C.v, .16); ctx.fill();
    ctx.beginPath(); ctx.arc(EYE[0], EYE[1], 110, 0, a1, true); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{mv:α}{mink: = }{v:40°}', EYE[0] + 250 * Math.cos(-.21), EYE[1] + 250 * Math.sin(-.21), { size: 42, alpha: ka });
  }
  // gli occhi a 1,6 m
  const k16 = P(t, T.occhi + .3, T.occhi + .7) * (1 - P(t, T.senza - 1.7, T.senza - 1.2));
  quota(ctx, [XO - 35, YG], [XO - 35, EYE[1]], C.ink, k16, true);
  drawRich(ctx, '1,6 m', XO - 55, (YG + EYE[1]) / 2, { size: 40, align: 'right', alpha: k16 });
  dot(ctx, EYE, C.v, Math.max(k16, ka), 7);
  // il triangolo rettangolo
  const kTri = P(t, T.tri + .3, T.tri + .9);
  if (kTri > 0) {
    ctx.save(); ctx.globalAlpha *= kTri * .1; ctx.fillStyle = css(C.v);
    ctx.beginPath(); ctx.moveTo(...EYE); ctx.lineTo(...K); ctx.lineTo(...TOP); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha *= kTri; ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(K[0] - 26, K[1]); ctx.lineTo(K[0] - 26, K[1] - 26); ctx.lineTo(K[0], K[1] - 26); ctx.stroke(); ctx.restore();
  }
  // i due cateti
  const kAd = P(t, T.adi + .2, T.adi + .6), kX = P(t, T.x + .2, T.x + .8);
  if (kAd > 0) glowStroke(ctx, [EYE, K], kAd, C.x, 6);
  if (kX > 0) glowStroke(ctx, [K, TOP], kX, C.y, 7);
  drawRich(ctx, '{my:x}', XT - 30, (K[1] + TOP[1]) / 2 + 60, { size: 46, align: 'right', alpha: P(t, T.x + .6, T.x + 1.0) });
  ctx.restore();
}

const XP = 1450;
// la scheda a destra: i dati, poi il conto
function scenePannello(ctx, t) {
  if (t < T.dist || t > FINE + .2) return;
  const la = P(t, T.dist + .3, T.dist + .7) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'i dati', XP, 168, { size: 42, weight: 600 }));
  drawRich(ctx, '{mx:d}{mink: = 45}{ink: m}', XP, 236, { size: 44, local: t - T.dist - .6 });
  drawRich(ctx, '{mv:α}{mink: = }{ink:40°}', XP, 302, { size: 44, local: t - T.elev - .4 });
  const altroCaso = 1 - .6 * P(t, T.senza - 1.6, T.senza - .2);   // con l'occhio a terra, i dati degli occhi passano in secondo piano
  drawRich(ctx, 'occhi a 1,6 m da terra', XP, 366, { size: 40, local: t - T.occhi - .4, alpha: altroCaso });
  const kl = P(t, T.tan, T.tan + .4);
  if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1100, 412); ctx.lineTo(1800, 412); ctx.stroke(); ctx.restore(); }
  drawRich(ctx, '{my:x}{mink: = }{mx:d}{mink: · tan α}', XP, 476, { size: 50, local: t - T.tan - .3 });
  drawRich(ctx, '{dim:il secondo teorema sui triangoli rettangoli}', XP, 524, { size: 30, local: t - T.tan - .5 });
  drawRich(ctx, '{my:x}{mink: = 45 · tan }{ink:40°}{mink: ≈ 45 · 0,839 ≈ 37,8}{ink: m}', XP, 604, { size: 40, local: t - T.conto - .3 });
  drawRich(ctx, '{my:h}{mink: ≈ 37,8 + 1,6 = }{g:39,4}{ink: m}', XP, 680, { size: 48, local: t - T.somma - .3, alpha: altroCaso });
  drawRich(ctx, '{dim:senza l’altezza degli occhi: }{my:h}{mink: = }{my:x}', XP, 752, { size: 32, local: t - T.senza - .4 });
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L’altezza è la distanza per la {v:tangente}\ndell’angolo di elevazione, più gli occhi.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'angolo di\n{v:elevazione}', 34], [960, '{my:x}{mink: = }{mx:d}{mink: · tan α}', 44], [1430, '{my:h}{mink: ≈ }{g:39,4}{ink: m}', 44]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 510); ctx.scale(k, k); ctx.translate(-px, -510);
    card(ctx, px - 215, 445, 430, 130);
    drawRich(ctx, s, px, 512, { size, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L’altezza di una torre', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.occhi - .1, 'l’angolo di elevazione'], [T.occhi - .1, T.tan - .1, 'il triangolo rettangolo'],
      [T.tan - .1, FINE, 'il conto']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
