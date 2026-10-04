'use strict';
/* La derivata: dalla pendenza di una retta alla funzione derivata di x². Argomento: derivate. */
CVIDEO.registra('derivate/derivata', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, drawSeq, fixedNum, fmtN,
    dot, glowStroke, dashed, makePlane, card, arrowHead } = M;
  const f = x => x * x;

const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [99.2, 190], [100.5, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [99.2, 1050], [100.5, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [99.2, 2.2], [100.5, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [99.2, 2], [100.5, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [99.2, -1.5], [100.5, -2]],
};
const FACCIA = [ // [t, faccia]: le reazioni (salto, scossa, lampo) partono da sole al cambio; mai due cambi in meno di 2 s
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [7.9, 'neutro'], [17.9, 'felice'], [20.0, 'neutro'],
  [24.7, 'felice'], [28.9, 'sorpreso'], [32.6, 'pensa'], [36.8, 'neutro'], [53.8, 'felice'], [58.2, 'neutro'],
  [61.1, 'festa'], [64.1, 'felice'], [68.8, 'neutro'], [73.0, 'felice'], [77.0, 'neutro'], [83.8, 'felice'],
  [87.5, 'neutro'], [92.0, 'festa'], [95.5, 'felice'], [99.2, 'neutro'], [101.9, 'felice'], [105.8, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.6, 6.3, 'Quanto è {g:ripida} una curva?\nProviamo a misurarlo.'],
  [7.9, 11.7, 'Partiamo da una retta:\nsale sempre {g:allo stesso modo}.'],
  [11.8, 16.1, 'La sua pendenza è quanto sale\ndiviso quanto avanza: {my:Δy} / {mx:Δx}.'],
  [16.2, 19.8, 'Più è ripida,\npiù il numero è {g:grande}.'],
  [20.0, 24.6, 'Con una curva è diverso:\nla pendenza {v:cambia} da punto a punto.'],
  [24.7, 27.6, 'Qui in fondo è {g:piatta}.'],
  [28.9, 31.3, 'Qui è {r:ripidissima}!'],
  [32.6, 36.7, 'Ma come si misura la pendenza\nin {v:un punto solo}?'],
  [36.8, 40.4, 'Prendo due punti sulla curva:\n{mink:P} e {mink:Q}.'],
  [40.5, 45.1, '{mink:P} ha ascissa 1, {mx:h} è la distanza\norizzontale fino a {mink:Q}.'],
  [45.2, 50.0, 'Li unisco: è una retta {v:secante},\ne la sua pendenza la so calcolare.'],
  [50.1, 53.7, 'Ora avvicino {mink:Q} a {mink:P},\nsempre di più…'],
  [53.8, 58.1, 'Guarda la colonna a destra:\nla pendenza si avvicina a {g:2}.'],
  [58.2, 61.0, 'Quando {mx:h} tende a 0…'],
  [61.1, 64.0, '…la secante diventa la {g:tangente}!'],
  [64.1, 68.7, 'Questo numero ha un nome:\nè la {v:derivata} di {mink:f} in 1.'],
  [68.8, 72.9, 'Si scrive {mink:f′(1)}: è il limite\ndelle pendenze delle secanti.'],
  [73.0, 76.9, 'In parole: la pendenza\ndella {g:tangente} in quel punto.'],
  [77.0, 80.4, 'Segno ogni pendenza\nnel grafico a destra.'],
  [80.5, 83.7, 'Qui la curva scende:\npendenze {r:negative}.'],
  [83.8, 87.4, 'In fondo alla valle è piatta:\npendenza {g:zero}.'],
  [87.5, 91.9, 'Poi sale, e sempre più in fretta:\npendenze {g:positive} e grandi.'],
  [92.0, 95.4, 'Le pendenze stanno\ntutte su una {g:retta}!'],
  [95.5, 99.0, 'È una funzione nuova, la {v:derivata}:\n{mink:f′(}{mx:x}{mink:) = 2}{mx:x}.'],
  [101.9, 107.1, 'Ripida, piatta, in discesa:\nla derivata lo dice {g:punto per punto}.'],
];
const PL = makePlane({ ox: 640, oy: 688, u: 82, x0: -2.6, x1: 3.4, y0: -.8, y1: 6.45 });
const CARD = [372, 110, 640, 690];
const PAR = PL.curve(f, -2.54, 2.54, 240);
// retta lunga di pendenza m per il punto (x0, y0), tagliata sul riquadro del piano
// e appena sotto l'asse x, così non passa mai sui numeri dell'asse né sul nome della curva
const Y_TAGLIO = PL.toS(0, -.22)[1];
function retta(ctx, x0, y0, m, col, w = 5, al = 1, mezza = 6) {
  if (al <= 0) return;
  const d = mezza / Math.hypot(1, m);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(CARD[0] + 8, CARD[1] + 8, CARD[2] - 16, Y_TAGLIO - CARD[1] - 8); ctx.clip();
  glowStroke(ctx, [PL.toS(x0 - d, y0 - m * d), PL.toS(x0 + d, y0 + m * d)], 1, col, w);
  ctx.restore();
}
function segmento(ctx, a, b, col, k = 1, w = 5) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function riga(ctx, label, val, y, col, al = 1, x0 = 1110, x1 = 1790) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, label, x0, y, { size: 44, align: 'left' });
  fixedNum(ctx, val, x1, y, 44, col);
  ctx.restore();
}

// 0 · Ada si accende (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La derivata', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · la pendenza di una retta (7.5–20)
function sceneRetta(ctx, t) {
  if (t < 7.5 || t > 20.5) return;
  const al = 1 - P(t, 19.8, 20.4);
  const m = Math.round(kf(t, [[16.5, .5], [17.9, 2]]) * 100) / 100;   // a centesimi: Δy = 2·m torna sempre con i numeri mostrati
  const y0 = .5 * m + 1, y1 = 2.5 * m + 1;
  ctx.save(); ctx.globalAlpha *= al;
  retta(ctx, 0, 1, m, C.v, 5, P(t, 8.2, 9.0));
  const tk = P(t, 12.1, 12.9);
  if (tk > 0) {
    segmento(ctx, PL.toS(.5, y0), PL.toS(2.5, y0), C.x, tk, 6);
    segmento(ctx, PL.toS(2.5, y0), PL.toS(2.5, y1), C.y, P(t, 12.6, 13.3), 6);
    dot(ctx, PL.toS(.5, y0), C.ink, tk, 8); dot(ctx, PL.toS(2.5, y1), C.ink, P(t, 13.1, 13.5), 8);
    drawRich(ctx, '{mx:Δx}', PL.toS(1.5, y0)[0], PL.toS(1.5, y0)[1] + 36, { size: 40, alpha: tk });
    drawRich(ctx, '{my:Δy}', PL.toS(2.5, (y0 + y1) / 2)[0] + 22, PL.toS(2.5, (y0 + y1) / 2)[1], { size: 40, align: 'left', alpha: P(t, 12.9, 13.4) });
  }
  const pa = life(t, 12.3, 20.4, .5, .6);
  if (pa > 0) {
    card(ctx, 1080, 200, 740, 500, pa);
    ctx.save(); ctx.globalAlpha *= pa;
    conFont(TITOLI, () => drawRich(ctx, 'pendenza', 1450, 262, { size: 40, weight: 600 }));
    drawSeq(ctx, ['{mink:m =}', { num: '{my:Δy}', den: '{mx:Δx}' }], 1450, 380, 64, { local: t - 12.6 });
    riga(ctx, '{mx:Δx} =', fmtN(2), 500, C.x);
    riga(ctx, '{my:Δy} =', fmtN(2 * m), 560, C.y);
    riga(ctx, '{mink:m} =', fmtN(m), 630, C.g);
    ctx.restore();
  }
  ctx.restore();
}

// 2–5 · la curva, la secante, la definizione, la funzione derivata (20–99)
const H_KEYS = [[50.3, 1.5], [51.2, 1], [51.5, 1], [52.3, .5], [52.6, .5], [53.4, .1], [54.0, .1], [55.0, .01]];
const RIGHE = [[46.6, '1,50', '3,50'], [51.2, '1,00', '3,00'], [52.3, '0,50', '2,50'], [53.4, '0,10', '2,10'], [55.0, '0,01', '2,01']];   // stesso formato delle righe in alto
// piano delle pendenze: i numeri stanno nei quadranti dove la retta y = 2x non passa mai
const PDO = { ox: 1450, oy: 570, u: 48, x0: -2.6, x1: 2.8, y0: -4.8, y1: 4.8 };
const PD = makePlane(PDO);
function assiPD(ctx, k, kNome) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PDO;
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
  for (let i = Math.ceil(x0); i <= x1; i++) if (i) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * u, oy + (i < 0 ? -32 : 32), { size: 29, color: C.dim });
  for (let j = Math.ceil(y0); j <= y1; j++) if (j && j % 2 === 0) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox + (j < 0 ? 18 : -18), oy - j * u, { size: 29, color: C.dim, align: j < 0 ? 'left' : 'right' });
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  const yt = oy - (y1 + .2) * u - 8;
  // l'asse si chiama «pendenza» finché Ada non ha detto che cos'è f′(x); il nome sta a sinistra della freccia,
  // perché a destra in alto arriva la retta delle pendenze
  if (kNome < 1) txt(ctx, 'pendenza', ox - 22, yt, { size: 32, color: C.dim, align: 'right', alpha: 1 - kNome });
  if (kNome > 0) drawRich(ctx, '{mink:f′(}{mx:x}{mink:)}', ox - 22, yt, { size: 44, align: 'right', alpha: kNome });
  ctx.restore();
}
// la tangente parte da P (x = 1), dove la lascia la parte 4, e scorre fino a −2,2
const xTan = t => kf(t, [[77.6, 1], [78.6, -2.2], [80.6, -2.2], [83.6, 0], [87.6, 0], [91.6, 2.2]]);
function sceneCurva(ctx, t) {
  if (t < 7.5 || t > 99.8) return;
  const al = 1 - P(t, 99.0, 99.7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  PL.axes(ctx, P(t, 7.7, 8.7));
  ctx.restore();
  if (t < 20) return;
  ctx.save(); ctx.globalAlpha *= al;
  glowStroke(ctx, PAR, P(t, 20.3, 21.9), C.y);
  // il nome della curva sta sotto l'asse x, a destra: lì non passa mai nessuna retta
  if (t > 21.8) drawRich(ctx, '{my:f(}{mx:x}{my:) = }{mx:x}{my:²}', PL.toS(1.28, 0)[0], PL.toS(0, 0)[1] + 80, { size: 40, align: 'left', local: t - 21.8 });

  // 2 · un punto che corre sulla curva: la pendenza si vede, ma non si sa ancora misurare
  const ra = life(t, 22.0, 36.9, .4, .5);
  if (ra > 0) {
    // fermo in fondo mentre Ada dice «piatta», in alto mentre dice «ripidissima», in x = 1 mentre chiede
    const x = kf(t, [[22.4, -2.3], [24.6, 0], [27.6, 0], [28.8, 2.3], [31.3, 2.3], [32.5, 1]]);
    retta(ctx, x, f(x), 2 * x, C.v, 5, ra, 1.1);
    dot(ctx, PL.toS(x, f(x)), C.ink, ra, 10);
    card(ctx, 1080, 300, 740, 220, ra);
    ctx.save(); ctx.globalAlpha *= ra;
    conFont(TITOLI, () => drawRich(ctx, 'pendenza qui', 1450, 360, { size: 40, weight: 600 }));
    txt(ctx, '?', 1450, 448, { size: 72, weight: 600, color: C.v });
    ctx.restore();
  }

  // 3 · la secante PQ
  const sa = 1 - P(t, 76.9, 77.5);
  const P1 = PL.toS(1, 1);
  if (t > 36.6 && sa > 0) {
    ctx.save(); ctx.globalAlpha *= sa;
    const h = kf(t, H_KEYS), Q = PL.toS(1 + h, f(1 + h));
    // secante → tangente: tutto cambia insieme quando Ada lo dice (61,1)
    const qa = P(t, 37.6, 38.0, E.back) * (1 - P(t, 61.1, 61.8));
    const toTan = P(t, 61.1, 61.8);
    const sec = life(t, 45.3, 200, .6, .1);
    if (sec > 0) retta(ctx, 1, 1, 2 + h * (1 - toTan), mix(C.v, C.g, toTan), 5, sec, 6);
    // l'ascissa di P
    const asc = life(t, 40.6, 45.2, .4, .5);
    if (asc > 0) dashed(ctx, P1, PL.toS(1, 0), C.x, 1, asc);
    const ta = clamp((h - .3) / .3) * P(t, 40.7, 41.3) * qa;   // h e i due lati spariscono prima che Q tocchi P
    if (ta > 0) {
      ctx.save(); ctx.globalAlpha *= ta;
      segmento(ctx, P1, PL.toS(1 + h, 1), C.x, 1, 6);
      segmento(ctx, PL.toS(1 + h, 1), Q, C.y, 1, 6);
      drawRich(ctx, '{mx:h}', PL.toS(1 + h / 2, 1)[0], P1[1] + 32, { size: 40 });
      ctx.restore();
    }
    if (qa > 0) {
      dot(ctx, Q, C.y, qa, 11);
      drawRich(ctx, '{my:Q}', Q[0] - 32, Q[1] - 20, { size: 40, alpha: qa * clamp((h - .2) / .3) });
    }
    // P sopra Q: quando Q gli è vicinissimo, P resta nero
    dot(ctx, P1, C.ink, P(t, 36.9, 37.3, E.back), 11);
    drawRich(ctx, '{mink:P}', P1[0] - 30, P1[1] - 30, { size: 40, local: t - 37.0 });
    if (t > 61.1) drawRich(ctx, '{g:tangente}', PL.toS(2.1, 1.95)[0], PL.toS(2.1, 1.95)[1], { size: 34, align: 'left', local: t - 61.1, alpha: 1 - P(t, 76.7, 77.3) });
    // pannello della secante
    const pa = life(t, 46.0, 64.4, .5, .5);
    if (pa > 0) {
      card(ctx, 1080, 130, 740, 670, pa);
      ctx.save(); ctx.globalAlpha *= pa;
      conFont(TITOLI, () => drawRich(ctx, 'pendenza della secante', 1450, 185, { size: 38, weight: 600 }));
      drawSeq(ctx, [{ num: '{mink:f(1 + }{mx:h}{mink:) − f(1)}', den: '{mx:h}' }], 1450, 282, 48, { local: t - 46.2 });
      // quando h tende a 0 il pannello dice dove si va: il vecchio valore esce, poi entra il nuovo
      const kOut = P(t, 61.1, 61.4), kIn = P(t, 61.45, 61.8);
      const hq = Math.round(h * 100) / 100;   // la pendenza mostrata viene dall'h mostrato
      riga(ctx, '{mx:h} =', fmtN(hq, 2), 380, C.x, 1 - kOut, 1130, 1770);
      riga(ctx, 'pendenza =', fmtN(2 + hq, 2), 436, C.v, 1 - kOut, 1130, 1770);
      riga(ctx, '{mx:h} →', '0', 380, C.x, kIn, 1130, 1770);
      riga(ctx, 'pendenza →', '2', 436, C.g, kIn, 1130, 1770);
      ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1120, 476); ctx.lineTo(1780, 476); ctx.stroke();
      drawRich(ctx, '{mx:h}', 1300, 508, { size: 36 }); txt(ctx, 'pendenza', 1600, 508, { size: 32, color: C.dim });
      RIGHE.forEach(([ta2, a, b], i) => {
        const k = P(t, ta2, ta2 + .45, E.out); if (k <= 0) return;
        const last = i === RIGHE.length - 1;
        txt(ctx, a, 1300, 558 + i * 48, { size: 44, color: C.x, alpha: k });
        txt(ctx, b, 1600, 558 + i * 48, { size: 44, weight: last ? 600 : 500, color: last ? C.g : C.ink, alpha: k });
      });
      ctx.restore();
    }
    ctx.restore();
  }

  // 4 · la definizione
  const da = life(t, 64.2, 77.5, .6, .6);
  if (da > 0) {
    card(ctx, 1045, 190, 820, 520, da);
    ctx.save(); ctx.globalAlpha *= da;
    conFont(TITOLI, () => drawRich(ctx, 'la derivata in 1', 1455, 255, { size: 40, weight: 600 }));
    drawSeq(ctx, ['{mink:f′(1) =}', { lim: '{mx:h}{mink:→0}' }, { num: '{mink:f(1 + }{mx:h}{mink:) − f(1)}', den: '{mx:h}' }], 1455, 400, 55, { local: t - 64.6 });
    drawRich(ctx, '{mink:= }{mg:2}', 1455, 548, { size: 80, local: t - 66.4 });
    drawRich(ctx, '{dim:la pendenza della tangente in }{mink:P}', 1455, 645, { size: 32, local: t - 73.1 });
    ctx.restore();
  }

  // 5 · la tangente scorre, e le pendenze disegnano una funzione nuova
  const fa = life(t, 77.0, 99.7, .6, .6);
  if (fa > 0) {
    const x = xTan(t), xq = Math.round(x * 100) / 100 || 0;   // i numeri mostrati vengono dalla x arrotondata
    retta(ctx, x, f(x), 2 * x, C.g, 5, fa, 1.5);
    dot(ctx, PL.toS(x, f(x)), C.ink, fa, 10);
    card(ctx, 1140, 120, 620, 700, fa);
    ctx.save(); ctx.globalAlpha *= fa;
    const kAssi = P(t, 77.4, 78.4);
    assiPD(ctx, kAssi, P(t, 95.5, 96.1));
    // la traccia lasciata dalle pendenze
    const pts = []; for (let i = 0; i <= 80; i++) { const u = lerp(-2.2, x, i / 80); pts.push(PD.toS(u, 2 * u)); }
    if (t > 80.6) glowStroke(ctx, pts, 1, C.g, 5);
    const full = P(t, 92.2, 93.2);
    if (full > 0) glowStroke(ctx, [PD.toS(-2.4, -4.8), PD.toS(2.4, 4.8)], full, C.g, 5);
    // pallino e tratteggio compaiono con gli assi, non prima
    const kPunto = P(kAssi, .6, 1);
    dot(ctx, PD.toS(x, 2 * x), C.g, kPunto, 10);
    dashed(ctx, PD.toS(x, 0), PD.toS(x, 2 * x), C.x, 1, .7 * kPunto);
    drawRich(ctx, '{mink:f′(}{mx:x}{mink:) = 2}{mx:x}', PD.toS(1.3, -3.0)[0], PD.toS(1.3, -3.0)[1], { size: 40, align: 'left', local: t - 95.7 });
    riga(ctx, '{mx:x} =', fmtN(xq), 180, C.x, 1, 1185, 1720);
    riga(ctx, 'pendenza =', fmtN(2 * xq), 236, C.g, 1, 1185, 1720);
    // "pendenza 0" in fondo alla valle, su un fondino che copre l'asse y
    const z = life(t, 83.7, 87.5, .3, .4);
    if (z > 0) {
      const [zx, zy] = PL.toS(0, 2.5);
      ctx.save(); ctx.globalAlpha *= z;
      ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(zx - 104, zy - 22, 208, 44, 10); ctx.fill();
      drawRich(ctx, '{g:pendenza 0}', zx, zy, { size: 34 });
      ctx.restore();
    }
    ctx.restore();
  }
}

// 6 · riassunto (99–110)
function sceneFine(ctx, t) {
  if (t < 99.3) return;
  const al = 1 - P(t, 107.5, 108.5);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 99.5 });
    drawRich(ctx, 'La derivata dice quanto è {g:ripida}\nuna curva, in ogni suo punto.', W / 2, 290, { size: 70, weight: 600, local: t - 99.9, stagger: .09 });
  });
  const pills = [[490, 'pendenza\ndella {g:tangente}'], [960, 'limite delle pendenze\ndelle {v:secanti}'], [1430, 'una nuova\n{x:funzione}']];
  pills.forEach(([x, s], i) => {
    const a = 101.5 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 445, 430, 130);
    drawRich(ctx, s, x, 512, { size: 33, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La derivata', durata: 110, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 19.9, 'la pendenza di una retta'], [19.9, 36.7, 'e una curva?'], [36.7, 64.0, 'la secante'],
      [64.0, 77.0, 'la derivata in un punto'], [77.0, 99.0, 'la funzione derivata']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneCurva(ctx, t); sceneRetta(ctx, t); sceneFine(ctx, t); },
  };
});
