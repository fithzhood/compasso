'use strict';
/* Secante, tangente, esterna — la distanza d del centro dalla retta, confrontata con il raggio r,
   dice quanti punti hanno in comune. Argomento: circonferenza. */
CVIDEO.registra('circonferenza/retta-e-circonferenza', M => {
  const { W, C, E, P, life, kf, lerp, clamp, css, TITOLI, conFont, drawRich, txt, richW, drawSeq,
    dot, glowStroke, arrowHead, makePlane, card } = M;

const FINE = 70.8;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [36.1, 'felice'], [38.4, 'neutro'], [44.0, 'sorpreso'], [46.0, 'neutro'], [48.8, 'felice'], [51.0, 'neutro'],
  [61.2, 'sorpreso'], [63.4, 'neutro'], [65.6, 'felice'], [68.0, 'neutro'],
  [FINE + 1.0, 'felice'], [78.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Una retta e una circonferenza:\nquanti punti hanno in comune?'],
  // 1 · la distanza del centro dalla retta
  [7.9, 12.4, 'Circonferenza di centro {mink:C(5; 4)}\ne raggio {mink:r = 3}.'],
  [12.6, 16.4, 'E una retta: {mink:3x + 4y − 36 = 0}.'],
  [16.6, 21.4, 'La distanza {mink:d} del centro dalla retta\nsi misura in {v:perpendicolare}.'],
  [21.6, 26.6, 'La formula della distanza usa\n{mink:C(x₀; y₀)} e la retta {mink:ax + by + c = 0}.'],
  [26.8, 31.4, 'Con i numeri del disegno\nviene {mink:d = 1}.'],
  [31.6, 35.9, '{mink:d = 1} è minore di {mink:r = 3}:\nla retta passa vicino al centro.'],
  [36.1, 40.4, 'Taglia la circonferenza\nin due punti: è {v:secante}.'],
  // 2 · la retta si allontana
  [40.6, 43.8, 'Allontano la retta dal centro…'],
  [44.0, 48.6, 'Ora la retta è {mink:3x + 4y − 46 = 0}\ne {mink:d = 3}: proprio come {mink:r}.'],
  [48.8, 53.0, 'Un solo punto in comune:\nla retta è {v:tangente}.'],
  [53.2, 56.2, 'La allontano ancora…'],
  [56.4, 61.0, 'Ora è {mink:3x + 4y − 51 = 0}\ne {mink:d = 4}: più del raggio.'],
  [61.2, 65.4, 'Nessun punto in comune:\nla retta è {v:esterna}.'],
  [65.6, 70.4, 'Decide il confronto\nfra {mink:d} e {mink:r}.'],
  // chiusura
  [72.4, 80.0, 'Distanza dal centro contro raggio:\nconta i punti in comune.'],
];

// centro C(5; 4), raggio 3; le rette 3x + 4y − k = 0 hanno la normale n = (3/5; 4/5) e distano d = (k − 31)/5 da C
const PL = makePlane({ ox: 220, oy: 690, u: 62, x0: -0.8, x1: 10.4, y0: -0.8, y1: 8.6 });
const CARD = [130, 100, 820, 690];
const CX = 5, CY = 4, R = 3, N = [.6, .8], T = [-.8, .6];
const CS = PL.toS(CX, CY);
// k della retta: 36 (d = 1), poi 46 (d = 3), poi 51 (d = 4); ogni spostamento è un movimento a sé
const kRetta = t => 36 + 10 * P(t, 40.8, 43.0, E.io) + 5 * P(t, 53.4, 55.4, E.io);
const dist = k => (k - 31) / 5;
const piede = d => [CX + d * N[0], CY + d * N[1]];
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// griglia e assi, senza numeri: i numeri si scrivono alla fine, su un fondino
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
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * u - 8, { size: 44 });
  ctx.restore();
}
function numeri(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u } = PL;
  ctx.save(); ctx.globalAlpha *= P(k, .6, 1);
  const scrivi = (s, x, y, al) => {
    const w = richW(ctx, s, 29), x0 = al === 'right' ? x - w : x - w / 2;
    ctx.fillStyle = C.paper; ctx.fillRect(x0 - 5, y - 18, w + 10, 36);
    txt(ctx, s, x, y, { size: 29, color: C.dim, align: al });
  };
  for (let i = 1; i <= 10; i++) scrivi(String(i), ox + i * u, oy + 32, 'center');
  for (let j = 1; j <= 8; j++) scrivi(String(j), ox - 20, oy - j * u, 'right');
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Secante, tangente, esterna', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const kA = P(t, 7.7, 8.7);
  assi(ctx, kA);
  numeri(ctx, kA);
  // la circonferenza e il raggio
  const cerchio = []; for (let i = 0; i <= 200; i++) { const a = Math.PI + 2 * Math.PI * i / 200; cerchio.push(PL.toS(CX + R * Math.cos(a), CY + R * Math.sin(a))); }
  glowStroke(ctx, cerchio, P(t, 8.2, 9.6), C.y, 6);
  segmento(ctx, CS, PL.toS(CX - R, CY), C.y, P(t, 9.6, 10.1), 5);
  drawRich(ctx, '{my:r = 3}', PL.toS(CX - R / 2, CY)[0], CS[1] - 30, { size: 40, alpha: P(t, 10.0, 10.4) });

  // la retta, tagliata sul riquadro del piano e un po' sotto il bordo in alto: lassù c'è il nome dell'asse y
  const k = kRetta(t), d = dist(k), H = piede(d);
  ctx.save();
  ctx.beginPath(); const a0 = PL.toS(PL.x0 - .1, PL.y1 - .35), a1 = PL.toS(PL.x1 + .1, PL.y0 - .1);
  ctx.rect(a0[0], a0[1], a1[0] - a0[0], a1[1] - a0[1]); ctx.clip();
  glowStroke(ctx, [PL.toS(H[0] - 14 * T[0], H[1] - 14 * T[1]), PL.toS(H[0] + 14 * T[0], H[1] + 14 * T[1])], P(t, 12.7, 13.5), C.v, 6);
  ctx.restore();

  // la distanza d: in perpendicolare, con l'angolo retto nel piede
  const kd = P(t, 16.8, 17.5);
  if (kd > 0) {
    const HS = PL.toS(...H);
    segmento(ctx, CS, HS, C.x, kd, 6);
    const q = .32, p1 = PL.toS(H[0] - q * N[0], H[1] - q * N[1]), p2 = PL.toS(H[0] - q * N[0] + q * T[0], H[1] - q * N[1] + q * T[1]), p3 = PL.toS(H[0] + q * T[0], H[1] + q * T[1]);
    ctx.save(); ctx.globalAlpha *= P(t, 17.4, 17.8); ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(...p1); ctx.lineTo(...p2); ctx.lineTo(...p3); ctx.stroke(); ctx.restore();
    const L = PL.toS(CX + d / 2 * N[0] - .45 * T[0], CY + d / 2 * N[1] - .45 * T[1]);
    drawRich(ctx, '{mx:d}', L[0], L[1], { size: 44, alpha: P(t, 17.3, 17.7) });
  }

  // i punti in comune: due (secante), uno (tangente), nessuno (esterna)
  const due = P(t, 36.2, 36.6, E.back) * (1 - P(t, 40.6, 40.9));
  if (due > 0) {
    const h = Math.sqrt(R * R - 1), F = piede(1);
    dot(ctx, PL.toS(F[0] + h * T[0], F[1] + h * T[1]), C.g, due, 12);
    dot(ctx, PL.toS(F[0] - h * T[0], F[1] - h * T[1]), C.g, due, 12);
  }
  const uno = P(t, 48.9, 49.3, E.back) * (1 - P(t, 53.2, 53.5));
  if (uno > 0) dot(ctx, PL.toS(...piede(3)), C.g, uno, 12);

  dot(ctx, CS, C.ink, P(t, 8.4, 8.8, E.back), 11);
  drawRich(ctx, '{mink:C}', CS[0], CS[1] + 40, { size: 44, alpha: P(t, 8.6, 9.0) });
  ctx.restore();
}

// il riquadro a destra
const PAN = [1000, 120, 830, 670], XS = 1050, XC = PAN[0] + PAN[2] / 2;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
// testo con pedici veri: il motore scrive ₀ quasi in linea, qui il pedice è più piccolo e più basso
function conPedici(ctx, items, x, y, size, al = 1, align = 'center', disegna = true) {
  const sub = it => '{mink:' + it.sub + '}', fs = Math.round(size * .72);
  const ws = items.map(it => typeof it === 'string' ? richW(ctx, it, size) : richW(ctx, sub(it), fs));
  const tot = ws.reduce((a, b) => a + b, 0);
  if (!disegna || al <= 0) return tot;
  let x0 = align === 'center' ? x - tot / 2 : x;
  ctx.save(); ctx.globalAlpha *= al;
  items.forEach((it, i) => {
    if (typeof it === 'string') drawRich(ctx, it, x0, y, { size, align: 'left' });
    else drawRich(ctx, sub(it), x0, y + size * .36, { size: fs, align: 'left' });
    x0 += ws[i];
  });
  ctx.restore();
  return tot;
}
// d = |ax₀ + by₀ + c| / √(a² + b²), come la scrive il sito
const NUM = ['{mink:|ax}', { sub: '0' }, '{mink: + by}', { sub: '0' }, '{mink: + c|}'];
function formulaDistanza(ctx, cx, cy, al) {
  if (al <= 0) return;
  const size = 46, wl = richW(ctx, '{mink:d = }', size), wn = conPedici(ctx, NUM, 0, 0, size, 1, 'left', false);
  const wd = richW(ctx, '{mink:√(a² + b²)}', size), wf = Math.max(wn, wd) + 16, x0 = cx - (wl + wf) / 2, xm = x0 + wl + wf / 2;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mink:d = }', x0, cy, { size, align: 'left' });
  conPedici(ctx, NUM, xm, cy - size * .72, size);
  drawRich(ctx, '{mink:√(a² + b²)}', xm, cy + size * .68, { size });
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0 + wl, cy); ctx.lineTo(x0 + wl + wf, cy); ctx.stroke();
  ctx.restore();
}
// i tre stati della retta: [entra, esce, k, |numeratore|, d, confronto, verdetto]
const STATI = [
  [12.8, 40.7, 36, 5, 1, '{mx:d = 1}{mink: < 3 = }{my:r}', '2 punti in comune: {v:secante}', 36.2],
  [44.0, 53.3, 46, 15, 3, '{mx:d}{mink: = }{my:r}{mink: = 3}', '1 punto in comune: {v:tangente}', 48.9],
  [56.4, 65.5, 51, 20, 4, '{mx:d = 4}{mink: > 3 = }{my:r}', 'nessun punto in comune: {v:esterna}', 61.3],
];
function scenePannello(ctx, t) {
  if (t < 12.6 || t > FINE + .3) return;
  const al = life(t, 12.7, FINE + .2, .5, .8);
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const via = 1 - P(t, 65.5, 65.9);   // tutto lascia il posto alla tabella
  if (via > 0) {
    ctx.save(); ctx.globalAlpha *= via;
    STATI.forEach(([a, b, k, num, d, cfr, ver, tv], i) => {
      const sa = life(t, a, b, .3, .3); if (sa <= 0) return;
      const primo = i === 0;
      ctx.save(); ctx.globalAlpha *= sa;
      drawRich(ctx, 'retta: {mv:3x + 4y − ' + k + ' = 0}', XS, 185, { size: 44, align: 'left', local: primo ? t - 12.8 : 99 });
      const tn = primo ? 27.0 : a;
      drawSeq(ctx, ['{mink:d =}', { num: '{mink:|3 · 5 + 4 · 4 − ' + k + '|}', den: '{mink:√(3² + 4²)}' }, '{mink:=}', { num: '{mink:' + num + '}', den: '{mink:5}' }, '{mink:=}', '{mx:' + d + '}'],
        XC, 485, 40, { local: primo ? t - tn : 99, alpha: P(t, tn, tn + .1) });
      drawRich(ctx, cfr, XC, 590, { size: 50, alpha: P(t, primo ? 31.7 : a, (primo ? 31.7 : a) + .4) });
      drawRich(ctx, ver, XC, 680, { size: 40, local: t - tv });
      ctx.restore();
    });
    // la formula, uguale per tutte le rette
    formulaDistanza(ctx, XC, 285, P(t, 21.8, 22.4));
    conPedici(ctx, ['{dim:con }{mink:C(x}', { sub: '0' }, '{mink:; y}', { sub: '0' }, '{mink:)}{dim:  e  }{mink:ax + by + c = 0}'], XC, 372, 42, P(t, 22.4, 23.0));
    separa(ctx, 415, P(t, 26.9, 27.3));
    ctx.restore();
  }
  // la tabella riassuntiva
  const tb = P(t, 66.0, 66.4);
  if (tb > 0) {
    ctx.save(); ctx.globalAlpha *= tb;
    const col = [1150, 1415, 1680];
    ['distanza', 'punti comuni', 'la retta è'].forEach((s, i) => txt(ctx, s, col[i], 215, { size: 32, color: C.dim }));
    separa(ctx, 260, 1);
    [['{mx:d}{mink: < }{my:r}', '2', 'secante'], ['{mx:d}{mink: = }{my:r}', '1', 'tangente'], ['{mx:d}{mink: > }{my:r}', '0', 'esterna']].forEach(([a, b, c], j) => {
      const y = 340 + j * 120, k = P(t, 66.2 + j * .3, 66.6 + j * .3);
      drawRich(ctx, a, col[0], y, { size: 52, alpha: k });
      drawRich(ctx, '{mink:' + b + '}', col[1], y, { size: 52, alpha: k });
      drawRich(ctx, '{v:' + c + '}', col[2], y, { size: 44, alpha: k });
    });
    ctx.restore();
  }
  ctx.restore();
}

// 3 · in una frase (FINE–82.8)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 80.6, 81.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Quanti punti in comune? Lo dice la distanza\n{mx:d} del centro confrontata con il raggio {my:r}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'secante', '{mx:d}{mink: < }{my:r}'], [960, 'tangente', '{mx:d}{mink: = }{my:r}'], [1430, 'esterna', '{mx:d}{mink: > }{my:r}']];
  pills.forEach(([px, testa, f], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - 215, 445, 430, 150);
    drawRich(ctx, '{v:' + testa + '}', px, 486, { size: 32, weight: 500 });
    drawRich(ctx, f, px, 548, { size: 48 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Secante, tangente, esterna', durata: 82.8, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 40.5, 'la distanza dal centro'], [40.5, FINE, 'la retta si allontana']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
