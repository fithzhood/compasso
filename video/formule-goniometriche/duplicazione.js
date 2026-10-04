'use strict';
/* Le formule di duplicazione — raddoppiare l'angolo non raddoppia il seno (30° e 60° sulla circonferenza);
   dalle formule di addizione con β = α: sin 2α = 2 sin α cos α e cos 2α nelle sue tre forme.
   Argomento: formule-goniometriche. */
CVIDEO.registra('formule-goniometriche/duplicazione', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, drawSeq, txt, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 76.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [21.2, 'sorpreso'], [23.4, 'neutro'],
  [35.8, 'felice'], [38.0, 'neutro'], [40.4, 'festa'], [42.6, 'neutro'], [53.4, 'felice'], [55.6, 'neutro'],
  [71.2, 'festa'], [73.6, 'felice'], [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];
// una frase per ogni cosa che succede; i raggi girano solo nei fumetti 1 e 3
const FUMETTI = [
  [2.0, 6.5, 'Se raddoppio un angolo,\nraddoppia anche il seno?'],
  // 1 · il doppio dell'angolo
  [7.9, 12.3, 'Sulla circonferenza goniometrica\nprendo un angolo {mv:α} (alfa) di 30°.'],
  [12.5, 16.6, 'Il seno di 30° è l’ordinata:\nvale {my:1/2}.'],
  [16.8, 21.0, 'Ora raddoppio l’angolo:\n{mink:2}{mv:α}{mink: =} 60°.'],
  [21.2, 26.0, 'Il seno di 60° è circa {my:0,87}:\n{r:non è} il doppio di {my:1/2}.'],
  // 2 · il seno
  [26.2, 30.8, 'Parto dalla formula di addizione,\ncon gli angoli {mv:α} e {mink:β} (beta).'],
  [31.0, 35.6, 'Se i due angoli sono uguali,\nal posto di {mink:β} metto {mv:α}.'],
  [35.8, 40.2, '{mv:α}{mink: + }{mv:α}{mink: = 2}{mv:α}, e i due termini\nsono uguali: {mink:sin 2}{mv:α}{mink: = 2 sin }{mv:α}{mink: cos }{mv:α}.'],
  [40.4, 44.8, 'Con 30°: {mink:2 · 1/2 · √3/2 = √3/2},\nproprio il seno di 60°.'],
  // 3 · il coseno
  [45.0, 49.4, 'Stesso trucco con la formula\ndel coseno della somma.'],
  [49.6, 53.2, 'Al posto di {mink:β} metto ancora {mv:α}.'],
  [53.4, 57.8, '{mink:cos }{mv:α}{mink: cos }{mv:α} è {mink:cos² }{mv:α}:\nè la prima forma di {mink:cos 2}{mv:α}.'],
  [58.0, 61.8, 'Grazie a {mink:sin² }{mv:α}{mink: + cos² }{mv:α}{mink: = 1}\nci sono altre due forme.'],
  [62.0, 66.4, 'Al posto di {mink:sin² }{mv:α} metto {mink:1 − cos² }{mv:α}:\nviene {mink:2 cos² }{mv:α}{mink: − 1}.'],
  [66.6, 71.0, 'Al posto di {mink:cos² }{mv:α} metto {mink:1 − sin² }{mv:α}:\nviene {mink:1 − 2 sin² }{mv:α}.'],
  [71.2, 75.6, 'Con 30°: 3/4 − 1/4 = 1/2,\nproprio {mx:cos} {x:60°}.'],
  // chiusura
  [FINE + 1.0, FINE + 8.0, 'Con {mink:β = }{mv:α} le formule di addizione\ndiventano quelle di duplicazione.'],
];

// il piano: un quarto di circonferenza goniometrica
const O = [250, 745], U = 540;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const CARD = [70, 110, 800, 690];
const RAD = Math.PI / 180;
const c30 = Math.cos(30 * RAD), s60 = Math.sin(60 * RAD);
const ang1 = t => kf(t, [[8.8, 0], [10.4, 30]]);
const ang2 = t => kf(t, [[17.2, 30], [19.0, 60]]);

function linea(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function numero(ctx, s, p, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper;
  ctx.beginPath(); ctx.roundRect(p[0] - 22, p[1] - 21, 44, 42, 9); ctx.fill();
  txt(ctx, s, p[0], p[1], { size: 34, color: C.dim });
  ctx.restore();
}
function arco(ctx, r, a0, a1, col, al, w = 4) {
  if (al <= 0 || Math.abs(a1 - a0) < .01) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w;
  ctx.beginPath(); ctx.arc(O[0], O[1], r * U, -a0 * RAD, -a1 * RAD, true); ctx.stroke(); ctx.restore();
}
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S(-.06, 0)); ctx.lineTo(...S(-.06 + 1.16 * k, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S(0, -.04)); ctx.lineTo(...S(0, -.04 + 1.12 * k)); ctx.stroke();
  arrowHead(ctx, [S(-.06 + 1.16 * k, 0)[0] + 6, O[1]], 0, C.ink);
  arrowHead(ctx, [O[0], S(0, -.04 + 1.12 * k)[1] - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', S(1.1, 0)[0] + 4, O[1] - 36, { size: 44 });
  drawRich(ctx, '{my:y}', O[0] + 34, S(0, 1.08)[1] + 4, { size: 44 });
  ctx.restore();
}
const fr = (n, d) => ({ num: n.includes('{') ? n : '{mink:' + n + '}', den: d.includes('{') ? d : '{mink:' + d + '}' });

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le formule di duplicazione', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la figura (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  const kc = P(t, 7.9, 9.0, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(O[0], O[1], U, 0, -Math.PI / 2 * kc, true); ctx.stroke(); ctx.restore();
  }
  const kn = P(t, 8.6, 9.0);
  numero(ctx, '1', S(.94, .065), kn); numero(ctx, '1', S(-.065, 1), kn);

  // la relazione fondamentale, in alto a destra dove la circonferenza non arriva
  const kId = P(t, 58.2, 58.7);
  if (kId > 0) {
    ctx.save(); ctx.globalAlpha *= kId; ctx.strokeStyle = css(C.dim, .6); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(470, 128, 380, 64, 14); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:sin² }{mv:α}{mink: + cos² }{mv:α}{mink: = 1}', 660, 160, { size: 40, alpha: kId });
  }

  // F4: il doppio di 1/2 sarebbe 1, e uscirebbe dalla circonferenza
  // i coseni (F8: cos 30°, F15: cos 60°), sull'asse x
  const k30 = life(t, 40.6, 45.2, .5, .4);
  if (k30 > 0) { ctx.save(); ctx.globalAlpha *= k30; glowStroke(ctx, [O, S(c30, 0)], 1, C.x, 8); ctx.restore(); }
  drawSeq(ctx, [fr('{mx:√3}', '{mx:2}')], ...S(.68, .11), 40, { alpha: k30 });
  const k60 = P(t, 71.4, 72.0);
  if (k60 > 0) glowStroke(ctx, [O, S(.5 * k60, 0)], 1, C.x, 8);
  drawSeq(ctx, [fr('{mx:1}', '{mx:2}')], ...S(.43, .13), 40, { alpha: P(t, 71.8, 72.2) });

  // i seni: 1/2 a 30°, √3/2 a 60°
  const ks1 = P(t, 12.8, 13.6);
  if (ks1 > 0) glowStroke(ctx, [S(c30, 0), S(c30, .5 * ks1)], 1, C.y, 8);
  drawSeq(ctx, [fr('{my:1}', '{my:2}')], ...S(c30 - .07, .25), 40, { alpha: P(t, 13.4, 13.8) });
  const ks2 = P(t, 21.6, 22.4), puls = 1 + .6 * life(t, 41.0, 44.6, .4, .5);
  if (ks2 > 0) glowStroke(ctx, [S(.5, 0), S(.5, s60 * ks2)], 1, C.y, 8 * puls);
  drawSeq(ctx, [fr('{my:√3}', '{my:2}')], ...S(.575, .45), 40, { alpha: P(t, 22.2, 22.6) });

  // i raggi e gli angoli: α = 30° resta, il secondo raggio arriva a 2α = 60°
  const a1 = ang1(t), a2 = ang2(t);
  linea(ctx, O, S(Math.cos(a1 * RAD), Math.sin(a1 * RAD)), C.ink, 4, 1, P(t, 8.8, 9.2) * (t > 17.2 ? .55 : 1));
  if (t > 17.2) linea(ctx, O, S(Math.cos(a2 * RAD), Math.sin(a2 * RAD)), C.ink, 5);
  arco(ctx, .16, 0, a1, C.v, P(t, 8.8, 9.0));
  drawRich(ctx, '{mv:α}', ...S(.27 * Math.cos(15 * RAD), .27 * Math.sin(15 * RAD)), { size: 44, alpha: P(t, 10.2, 10.6) });
  if (t > 17.2) arco(ctx, .37, 0, a2, C.v, P(t, 17.2, 17.4), 3);
  drawRich(ctx, '{mink:2}{mv:α}', ...S(.48 * Math.cos(45 * RAD), .48 * Math.sin(45 * RAD)), { size: 44, alpha: P(t, 18.8, 19.2) });
  dot(ctx, O, C.ink, P(t, 8.0, 8.3, E.back), 8);
  dot(ctx, S(Math.cos(a1 * RAD), Math.sin(a1 * RAD)), C.v, P(t, 8.8, 9.2, E.back), 11);
  if (t > 17.2) dot(ctx, S(Math.cos(a2 * RAD), Math.sin(a2 * RAD)), C.v, 1, 11);
  ctx.restore();
}

// la scheda a destra
const XS = 1385;
function riquadro(ctx, y, al, w = 760, h = 76) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g, .75); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(XS - w / 2, y - h / 2, w, h, 16); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < 12.6 || t > FINE + .2) return;
  const la = P(t, 12.6, 13.2) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 910, 110, 950, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  // 1 · i valori a 30° e a 60°
  const k1 = 1 - P(t, 25.9, 26.3);
  if (k1 > 0) {
    drawSeq(ctx, ['{mink:sin}{ink: 30°}{mink: =}', fr('1', '2')], XS, 220, 50, { local: t - 13.6, alpha: k1 });
    drawSeq(ctx, ['{mink:sin}{ink: 60°}{mink: =}', fr('{mink:√3}', '2'), '{mink:≈ 0,87}'], XS, 380, 50, { local: t - 22.4, alpha: k1 });
    drawRich(ctx, '{mr:2 · sin}{r: 30°}{mr: = 1 ≠ sin}{r: 60°}', XS, 520, { size: 46, local: t - 23.4, alpha: k1 });
    drawRich(ctx, '{mink:sin 2}{mv:α}{mink: ≠ 2 sin }{mv:α}', XS, 630, { size: 48, local: t - 24.4, alpha: k1 });
  }
  // 2 · il seno di 2α
  const k2 = 1 - P(t, 45.0, 45.4);
  drawRich(ctx, '{mink:sin(}{mv:α}{mink: + β) = sin }{mv:α}{mink: cos β + cos }{mv:α}{mink: sin β}', XS, 200, { size: 42, local: t - 26.8, alpha: k2 });
  drawRich(ctx, '{mink:sin(}{mv:α}{mink: + }{mv:α}{mink:) = sin }{mv:α}{mink: cos }{mv:α}{mink: + cos }{mv:α}{mink: sin }{mv:α}', XS, 275, { size: 42, local: t - 31.8, alpha: k2 });
  const yB = lerp(365, 190, P(t, 45.2, 46.0));
  riquadro(ctx, yB, P(t, 36.4, 36.9), 600, 80);
  drawRich(ctx, '{mink:sin 2}{mv:α}{mink: = 2 sin }{mv:α}{mink: cos }{mv:α}', XS, yB, { size: 48, local: t - 36.2 });
  drawSeq(ctx, ['{mink:2 ·}', fr('1', '2'), '{mink:·}', fr('{mink:√3}', '2'), '{mink:=}', fr('{mink:√3}', '2'), '{mink:= sin}{ink: 60°}'], XS, 480, 46, { local: t - 41.0, alpha: k2 });
  // 3 · il coseno di 2α
  drawRich(ctx, '{mink:cos(}{mv:α}{mink: + β) = cos }{mv:α}{mink: cos β − sin }{mv:α}{mink: sin β}', XS, 300, { size: 42, local: t - 45.8 });
  drawRich(ctx, '{mink:cos 2}{mv:α}{mink: = cos }{mv:α}{mink: cos }{mv:α}{mink: − sin }{mv:α}{mink: sin }{mv:α}', XS, 372, { size: 42, local: t - 50.0 });
  riquadro(ctx, 455, P(t, 54.0, 54.5), 600, 80);
  drawRich(ctx, '{mink:cos 2}{mv:α}{mink: = cos² }{mv:α}{mink: − sin² }{mv:α}', XS, 455, { size: 48, local: t - 53.8 });
  drawRich(ctx, '{mink:cos 2}{mv:α}{mink: = 2 cos² }{mv:α}{mink: − 1}', XS, 545, { size: 46, local: t - 63.4 });
  drawRich(ctx, '{mink:cos 2}{mv:α}{mink: = 1 − 2 sin² }{mv:α}', XS, 615, { size: 46, local: t - 68.0 });
  drawSeq(ctx, ['{mink:cos² }{ink:30°}{mink: − sin² }{ink:30°}{mink: =}', fr('3', '4'), '{mink:−}', fr('1', '4'), '{mink:=}', fr('{mx:1}', '{mx:2}')], XS, 718, 46, { local: t - 71.6 });
  ctx.restore();
}

// chiusura (FINE–durata)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le formule di duplicazione sono\nl’addizione con due angoli uguali.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[350, '{mink:sin 2}{mv:α}{mink: = 2 sin }{mv:α}{mink: cos }{mv:α}', 40], [960, '{mink:cos 2}{mv:α}{mink: = cos² }{mv:α}{mink: − sin² }{mv:α}\n{dim:e altre due forme}', 40], [1570, '{mink:sin 2}{mv:α}{mink: ≠ 2 sin }{mv:α}', 40]];
  pills.forEach(([px, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 290, 450, 580, 140);
    drawRich(ctx, s, px, 520, { size, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Le formule di duplicazione', durata: Math.round((FINE + 10.8) * 10) / 10, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 26.1, 'il doppio dell’angolo'], [26.1, 44.9, 'il seno di 2α'], [44.9, FINE, 'il coseno di 2α']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
