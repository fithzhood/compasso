'use strict';
/* L’ombra della piramide — raggi paralleli, bastone e piramide fanno triangoli simili: h : 219 = 2 : 3, h = 146 m.
   Metà base 115 m + ombra fuori 104 m = 219 m. Argomento: geometria-euclidea. */
CVIDEO.registra('geometria-euclidea/piramide', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, drawSeq, glowStroke, dashed, card } = M;

const FINE = 63.9, DUR = 75.9;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [56.1, 'pensa'], [60.0, 'festa'], [FINE, 'neutro'], [66.3, 'felice'], [70.7, 'occhiolino'],
];
const FUMETTI = [
  [2.5, 6.3, 'Come si misura una piramide\nsenza salirci in cima?'],
  [7.9, 12.5, 'Ecco la piramide: la sua altezza\n{mx:h} non si misura da vicino.'],
  [12.6, 16.4, 'Il sole è lontanissimo: i suoi\nraggi arrivano {g:paralleli}.'],
  [16.5, 20.6, 'La piramide fa ombra: fuori\nse ne vedono {y:104 m}.'],
  [20.7, 24.6, 'L’ombra va misurata dal {g:centro}:\nlì cade l’altezza.'],
  [24.7, 30.0, 'Il lato di base è {ink:230 m}: dal centro\nal bordo ne restano {y:115 m}.'],
  [30.1, 33.6, 'Dal centro alla punta dell’ombra:\n{mink:115 + 104 = 219} metri.'],
  [33.7, 38.5, 'Nello stesso momento, un bastone alto\n{x:2 m} fa un’ombra lunga {y:3 m}.'],
  [38.6, 42.6, 'Altezza, ombra e raggio formano\ndue triangoli {g:rettangoli}.'],
  [42.7, 46.8, 'Raggi paralleli tagliati dal terreno:\nangoli {g:corrispondenti}, congruenti.'],
  [46.9, 51.5, 'Due angoli congruenti: i triangoli\nsono {g:simili}, per il primo criterio.'],
  [51.6, 56.0, 'Nei triangoli simili altezza e ombra\nhanno lo stesso {g:rapporto}.'],
  [56.1, 59.9, 'Ricavo {mx:h}: vale i due terzi di {y:219 m}.'],
  [60.0, 63.3, 'La piramide è alta {g:146 m}!'],
  [66.3, 72.9, 'Raggi paralleli, triangoli simili:\nl’ombra misura l’altezza.'],
];

// la piramide di profilo, in metri: base da −115 a 115, vertice a 146; i raggi scendono di 2 ogni 3,
// quindi l’ombra del vertice cade a 146 · 3 / 2 = 219 m dal centro
const SC = 2.4, XC = 400, YG = 640;
const Pm = (x, y) => [XC + SC * x, YG - SC * y];
const PEND = 2 / 3, HP = 146, MB = 115, OMBRA = 219;
// raggio che toccherebbe il terreno in g: y = (2/3)(g − x); dove incontra la faccia sinistra (se ci arriva)
function raggio(g) {
  const x0 = -110, y0 = PEND * (g - x0);
  if (g === OMBRA) return [[x0, y0], [OMBRA, 0]];
  const x = (PEND * g - HP) / (HP / MB + PEND);
  return [[x0, y0], [x, HP * (1 + x / MB)]];
}
function seg(ctx, a, b, col, w, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function poli(ctx, pts, fill, stroke, w = 3) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
function retto(ctx, p, al, l = 18, ev = 0) {   // angolo retto: in alto a destra del punto; ev lo accende di verde
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(ev > 0 ? C.g : C.ink); ctx.lineWidth = 2 + 2 * ev;
  ctx.beginPath(); ctx.moveTo(p[0] + l, p[1]); ctx.lineTo(p[0] + l, p[1] - l); ctx.lineTo(p[0], p[1] - l); ctx.stroke(); ctx.restore();
}
function arcoSole(ctx, p, al, r = 56) {   // l’angolo fra il terreno e il raggio, nella punta dell’ombra
  if (al <= 0) return;
  const a = Math.atan(PEND);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.arc(p[0], p[1], r, Math.PI + a, Math.PI, true); ctx.closePath();
  ctx.fillStyle = css(C.g, .3); ctx.fill(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’ombra della piramide', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · la piramide, i raggi, l’ombra (7.5–FINE)
function scenePiramide(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .4, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  // il terreno e la piramide
  seg(ctx, Pm(-140, 0), Pm(300, 0), C.ink, 3, P(t, 7.6, 8.4));
  const kp = P(t, 8.0, 8.8);
  if (kp > 0) { ctx.save(); ctx.globalAlpha *= kp; poli(ctx, [Pm(-MB, 0), Pm(0, HP), Pm(MB, 0)], css(C.y, .2), css(C.ink), 3); ctx.restore(); }
  // il triangolo di altezza, ombra e raggio
  const kt = P(t, 38.8, 39.5);
  if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt; poli(ctx, [Pm(0, 0), Pm(0, HP), Pm(OMBRA, 0)], css(C.v, .14)); ctx.restore(); }
  // l’altezza h
  const kh = P(t, 9.4, 10.2);
  if (kh > 0) dashed(ctx, Pm(0, HP), Pm(0, 0), C.x, kh, 1);
  drawRich(ctx, '{mx:h}', ...Pm(-16, HP / 2), { size: 44, alpha: P(t, 9.9, 10.4) });
  retto(ctx, Pm(0, 0), P(t, 20.9, 21.4), 18, Math.max(life(t, 21.2, 24.6, .3, .3), life(t, 47.1, 51.5, .3, .3)));
  // i raggi del sole
  [[OMBRA, 12.8], [120, 13.3], [40, 13.8]].forEach(([g, ta]) => {
    const [a, b] = raggio(g);
    const k = P(t, ta, ta + .9, E.lin); if (k <= 0) return;
    ctx.save(); glowStroke(ctx, [Pm(...a), Pm(lerp(a[0], b[0], k), lerp(a[1], b[1], k))], 1, C.v, g === OMBRA ? 4 : 3); ctx.restore();
  });
  // l’ombra: fuori dalla piramide, poi la parte nascosta sotto
  const ko = P(t, 16.7, 17.5);
  if (ko > 0) glowStroke(ctx, [Pm(MB, 0), Pm(lerp(MB, OMBRA, ko), 0)], 1, C.y, 9);
  drawRich(ctx, '{y:104 m}', Pm((MB + OMBRA) / 2, 0)[0], YG + 40, { size: 44, alpha: P(t, 17.2, 17.7) });
  const kn = P(t, 27.0, 27.8);
  if (kn > 0) {
    ctx.save(); ctx.strokeStyle = css(C.y); ctx.lineWidth = 6; ctx.setLineDash([14, 10]);
    const a = Pm(MB, 0), b = Pm(lerp(MB, 0, kn), 0);
    ctx.beginPath(); ctx.moveTo(a[0], a[1] - 4); ctx.lineTo(b[0], b[1] - 4); ctx.stroke(); ctx.restore();
  }
  drawRich(ctx, '{y:115 m}', Pm(MB / 2, 0)[0], YG + 40, { size: 44, alpha: P(t, 27.6, 28.1) });
  // il lato di base, misurabile a terra: esce prima che arrivi la misura totale
  const kb = life(t, 24.9, 30.2, .5, .4);
  if (kb > 0) {
    const a = Pm(-MB, 0), b = Pm(MB, 0), y = YG + 76;
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(a[0], y - 10); ctx.lineTo(a[0], y); ctx.lineTo(b[0], y); ctx.lineTo(b[0], y - 10); ctx.stroke(); ctx.restore();
    drawRich(ctx, 'lato di base 230 m', (a[0] + b[0]) / 2, y + 36, { size: 44, alpha: kb });
  }
  // la misura totale, con una graffa piatta
  const kg = P(t, 30.3, 31.0);
  if (kg > 0) {
    const a = Pm(0, 0), b = Pm(OMBRA, 0), y = YG + 76;
    ctx.save(); ctx.globalAlpha *= kg; ctx.strokeStyle = css(C.y); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(a[0], y - 10); ctx.lineTo(a[0], y); ctx.lineTo(b[0], y); ctx.lineTo(b[0], y - 10); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{y:219 m}', (a[0] + b[0]) / 2, y + 36, { size: 44, alpha: kg });
  }
  // l’angolo del sole
  arcoSole(ctx, Pm(OMBRA, 0), P(t, 42.9, 43.5));
  // il risultato
  drawRich(ctx, '{mx:h}{mink: = }{mg:146}{g: m}', 440, 262, { size: 44, align: 'left', local: t - 60.2 });
  ctx.restore();
}

// 2 · il bastone, ingrandito, e i conti (29–FINE)
const frazione = (n, d) => ({ num: n, den: d });
function sceneBastone(ctx, t) {
  if (t < 33.8 || t > FINE + .3) return;
  const ca = life(t, 33.9, FINE + .2, .5, .6);
  card(ctx, 1200, 120, 640, 350, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  conFont(TITOLI, () => drawRich(ctx, 'il bastone, ingrandito', 1520, 170, { size: 38, weight: 600, local: t - 34.0 }));
  const piede = [1330, 400], cima = [1330, 260], punta = [1540, 400];
  if (kt(t) > 0) { ctx.save(); ctx.globalAlpha *= kt(t); poli(ctx, [piede, cima, punta], css(C.v, .14)); ctx.restore(); }
  seg(ctx, [1250, 400], [1800, 400], C.ink, 3, P(t, 34.1, 34.6));
  seg(ctx, piede, cima, C.x, 8, P(t, 34.4, 34.9));
  seg(ctx, piede, punta, C.y, 9, P(t, 35.0, 35.6));
  const kr = P(t, 35.4, 36.1, E.lin);
  if (kr > 0) glowStroke(ctx, [[1270, 220], [lerp(1270, punta[0], kr), lerp(220, punta[1], kr)]], 1, C.v, 4);
  retto(ctx, piede, P(t, 35.2, 35.7), 16, life(t, 47.1, 51.5, .3, .3));
  drawRich(ctx, '{x:2 m}', 1274, 330, { size: 44, alpha: P(t, 34.8, 35.2) });
  drawRich(ctx, '{y:3 m}', 1435, 438, { size: 44, alpha: P(t, 35.5, 35.9) });
  arcoSole(ctx, punta, P(t, 43.1, 43.7), 50);
  ctx.restore();
  // la scheda dei conti
  if (t < 47.0) return;
  const cb = life(t, 47.1, FINE + .2, .5, .6);
  card(ctx, 1200, 490, 640, 305, cb);
  ctx.save(); ctx.globalAlpha *= cb;
  drawRich(ctx, 'triangoli {g:simili} (primo criterio)', 1520, 532, { size: 34, local: t - 47.2 });
  drawSeq(ctx, [frazione('{mx:h}', '{my:219}'), '{mink:=}', frazione('{mx:2}', '{my:3}')], 1520, 612, 44, { local: t - 51.8 });
  drawSeq(ctx, ['{mx:h}{mink: =}', frazione('{my:219}{mink: · }{mx:2}', '{my:3}'), '{mink:=}', '{mg:146}{g: m}'], 1520, 738, 44, { local: t - 56.3 });
  ctx.restore();
}
const kt = t => P(t, 38.8, 39.5);

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Con i raggi paralleli, altezza e ombra hanno,\nnello stesso istante, lo stesso {g:rapporto}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 430, 'raggi del sole\n{g:paralleli}', 34], [960, 430, 'triangoli\n{g:simili}', 34], [1430, 430, '{mx:h}{mink: = }{mg:146}{g: m}', 44]];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L’ombra della piramide', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 33.6, 'l’ombra della piramide'], [33.6, 51.5, 'il bastone'], [51.5, 63.3, 'la proporzione']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiramide(ctx, t); sceneBastone(ctx, t); sceneFine(ctx, t); },
  };
});
