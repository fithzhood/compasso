'use strict';
/* Crescere, decrescere, massimi e minimi: il segno della pendenza di x³ − 3x scritto sotto il grafico, e dove cambia c'è una cima o una valle. Argomento: studio-di-funzione. */
CVIDEO.registra('studio-di-funzione/monotonia', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, fixedNum, fmtN,
    dot, glowStroke, dashed, arrowHead, card } = M;
  const f = x => x * x * x - 3 * x, d1 = x => 3 * x * x - 3;

const FINE = 89.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  // mai due cambi a meno di 2 s (tranne l'accensione 1,45 → 2,0)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [6.6, 'neutro'],
  [13.3, 'felice'], [15.4, 'neutro'], [20.9, 'sorpreso'], [22.9, 'neutro'],
  [26.5, 'pensa'], [28.6, 'neutro'], [37.9, 'felice'], [40.0, 'neutro'], [63.5, 'felice'], [65.6, 'neutro'],
  [68.4, 'pensa'], [73.9, 'festa'], [76.0, 'felice'], [78.8, 'pensa'], [84.1, 'festa'], [86.2, 'felice'],
  [FINE, 'neutro'], [FINE + 2.4, 'felice'], [FINE + 6.4, 'occhiolino'], [FINE + 8.4, 'felice'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [1.9, 6.4, 'Come si capisce dove una curva\n{g:sale} e dove {r:scende}?'],
  [7.9, 13.0, 'Questa curva {g:sale}, poi {r:scende},\npoi {g:risale}. Dove, di preciso?'],
  [13.3, 18.8, 'Dove sale, la tangente punta {g:in su}:\nla pendenza è {g:positiva}.'],
  [20.9, 26.2, 'Dove scende, punta {r:in giù}:\nla pendenza è {r:negativa}.'],
  [26.5, 31.3, 'La pendenza della tangente è\nla {v:derivata}: {mink:f′(}{mx:x}{mink:)}.'],
  [31.5, 36.2, 'Sotto, scrivo il {v:segno} della\nderivata, punto per punto.'],
  [37.9, 42.8, 'Finché la curva sale: {g:più},\ne una freccia {g:in su}.'],
  [44.1, 48.8, 'In cima la tangente è {v:piatta}:\n{mink:f′(−1) = 0}.'],
  [50.7, 55.4, 'Poi scende: {r:meno},\ne una freccia {r:in giù}.'],
  [57.3, 62.0, 'In fondo è di nuovo {v:piatta}:\n{mink:f′(1) = 0}.'],
  [63.5, 67.6, 'E poi risale: di nuovo {g:più}.'],
  [68.4, 73.7, 'In {mink:−1} il segno cambia:\nda {g:più} a {r:meno}.'],
  [73.9, 78.6, 'Prima sale, poi scende:\nlì c\'è un {v:massimo}.'],
  [78.8, 83.9, 'In {mink:1} cambia da {r:meno} a {g:più}:\nprima scende, poi sale.'],
  [84.1, 88.4, 'Lì c\'è un {v:minimo}.'],
  [FINE + 2.4, FINE + 8.8, 'Dove {mink:f′} cambia segno, c\'è\nun {v:massimo} o un {v:minimo}.'],
];

// piano con scale diverse in x e in y (la cubica è stretta e alta)
const CARD = [372, 110, 1448, 690];
const O = { ox: 930, oy: 345, ux: 220, uy: 58, x0: -2.1, x1: 2.1, y0: -3.1, y1: 3.1 };
const S = (x, y) => [O.ox + x * O.ux, O.oy - y * O.uy];
const X = x => O.ox + x * O.ux;
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, ux, uy, x0, x1, y0, y1 } = O;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = -2; i <= 2; i++) { if (!i) continue; ctx.beginPath(); ctx.moveTo(ox + i * ux, oy - y1 * uy * k); ctx.lineTo(ox + i * ux, oy - y0 * uy * k); ctx.stroke(); }
  for (let j = -3; j <= 3; j++) { if (!j) continue; ctx.beginPath(); ctx.moveTo(ox + x0 * ux * k, oy - j * uy); ctx.lineTo(ox + x1 * ux * k, oy - j * uy); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .05) * ux * k, oy); ctx.lineTo(ox + (x1 + .07) * ux * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * uy * k); ctx.lineTo(ox, oy - (y1 + .2) * uy * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .07) * ux * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * uy * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // le tacche di x stanno dalla parte opposta alla curva: sopra l'asse a sinistra, sotto a destra
  for (let i = -2; i <= 2; i++) if (i) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * ux, oy + (i < 0 ? -30 : 32), { size: 29, color: C.dim });
  for (let j = -3; j <= 3; j++) if (j) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), ox - 20, oy - j * uy, { size: 29, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', ox + (x1 + .07) * ux + 40, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * uy - 6, { size: 44 });
  ctx.restore();
}
const CURVA = []; for (let i = 0; i <= 300; i++) { const x = lerp(-2.1, 2.1, i / 300); CURVA.push(S(x, f(x))); }
// tangente in x: un segmento di lunghezza fissa sullo schermo, tagliato sulla scheda
function tangente(ctx, x, al) {
  if (al <= 0) return;
  const m = d1(x), dx = O.ux, dy = -m * O.uy, n = Math.hypot(dx, dy), L = 150;
  const p = S(x, f(x));
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.rect(CARD[0] + 8, CARD[1] + 8, CARD[2] - 16, 455); ctx.clip();
  glowStroke(ctx, [[p[0] - dx / n * L, p[1] - dy / n * L], [p[0] + dx / n * L, p[1] + dy / n * L]], 1, C.v, 5);
  ctx.restore();
}
function freccina(ctx, cx, cy, su, col, k) {
  if (k <= 0) return;
  const a = [cx - 38, cy + (su ? 20 : -20)], b = [cx + 38, cy + (su ? -20 : 20)];
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], .86), lerp(a[1], b[1], .86)); ctx.stroke();
  arrowHead(ctx, b, Math.atan2(b[1] - a[1], b[0] - a[0]), col, 1.3);
  ctx.restore();
}
const colSegno = v => v > .005 ? C.g : v < -.005 ? C.r : C.v;

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Crescere, decrescere,\nmassimi e minimi', W / 2, 180, { size: 110, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il grafico, la tangente, la riga dei segni, i massimi e minimi (7.5–FINE)
// il punto corre e si ferma: ogni fumetto parla del punto fermo
const XP = [[13.2, -1.6], [19.0, -1.6], [20.8, .5], [31.9, .5], [32.5, -1.9], [36.4, -1.9], [37.8, -1.5], [43.0, -1.5], [44.0, -1],
  [49.0, -1], [50.6, 0], [55.6, 0], [57.2, 1], [62.2, 1], [63.4, 1.6]];
// fin dove arriva la striscia colorata dei segni
const XS = [[36.4, -2.1], [37.8, -1.5], [43.0, -1.5], [44.0, -1], [49.0, -1], [50.6, 0], [55.6, 0], [57.2, 1], [62.2, 1], [63.4, 1.6], [67.6, 1.6], [68.4, 2.1]];
const SY = 640, AY = 722;
function sceneGrafico(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = life(t, 7.5, FINE + .2, .6, .7);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD);
  assi(ctx, P(t, 7.7, 8.7));
  glowStroke(ctx, CURVA, P(t, 8.4, 11.0), C.y);
  drawRich(ctx, '{my:f(}{mx:x}{my:) = }{mx:x}{my:³ − 3}{mx:x}', 1150, 172, { size: 40, local: t - 10.6 });

  // la tangente che corre sulla curva
  // a 31,9–32,5 la tangente sparisce e ricompare a sinistra, senza strisciare sulle tacche
  const ta = life(t, 13.2, 68.2, .4, .6) * (1 - life(t, 31.5, 32.9, .4, .4));
  const x = kf(t, XP);
  if (ta > 0) {
    tangente(ctx, x, ta);
    dot(ctx, S(x, f(x)), C.ink, ta, 11);
    ctx.save(); ctx.globalAlpha *= ta;
    conFont(TITOLI, () => drawRich(ctx, 'pendenza', 1650, 215, { size: 40, weight: 600 }));
    const m = d1(x);
    fixedNum(ctx, fmtN(Math.abs(m) < .005 ? 0 : m), 1760, 295, 64, colSegno(m));
    drawRich(ctx, '{dim:la derivata }{mink:f′(}{mx:x}{mink:)}', 1650, 370, { size: 34, local: t - 26.7 });
    ctx.restore();
  }

  // la riga dei segni
  const ra = P(t, 32.0, 33.0);
  if (ra > 0) {
    ctx.save();
    ctx.strokeStyle = css(C.ink, .7); ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X(-2.1), SY); ctx.lineTo(lerp(X(-2.1), X(2.1), ra), SY); ctx.stroke();
    ctx.globalAlpha *= ra;
    drawRich(ctx, '{dim:segno di }{mink:f′}', 1650, SY, { size: 36 });
    drawRich(ctx, '{dim:la curva}', 1650, AY, { size: 36 });
    ctx.restore();
    const xs = kf(t, XS);
    if (t > 36.4) {
      ctx.save(); ctx.lineWidth = 9; ctx.lineCap = 'butt';
      [[-2.1, -1, C.g], [-1, 1, C.r], [1, 2.1, C.g]].forEach(([a, b, col]) => {
        if (xs <= a) return;
        ctx.strokeStyle = css(col); ctx.beginPath(); ctx.moveTo(X(a), SY); ctx.lineTo(X(Math.min(b, xs)), SY); ctx.stroke();
      });
      ctx.restore();
    }
    // segno e freccia compaiono quando parte il fumetto, col punto fermo dentro il tratto
    const tratti = [[-1.55, '+', C.g, true, 38.0], [0, '−', C.r, false, 50.8], [1.55, '+', C.g, true, 63.6]];
    tratti.forEach(([c, s, col, su, ta2]) => {
      const k = P(t, ta2, ta2 + .5, E.back);
      if (k <= 0) return;
      txt(ctx, s, X(c), SY - 36, { size: 56, weight: 600, color: col, alpha: clamp(k) });
      freccina(ctx, X(c), AY, su, col, clamp(k));
    });
    // gli zeri della pendenza
    [[-1, 44.2], [1, 57.4]].forEach(([z, tz]) => {
      const k = P(t, tz, tz + .4);
      if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(X(z), SY - 16); ctx.lineTo(X(z), SY + 16); ctx.stroke(); ctx.restore();
      txt(ctx, '0', X(z), SY - 38, { size: 40, weight: 600, color: C.v, alpha: k });
      drawRich(ctx, '{mx:x}{mink: = ' + (z < 0 ? '−1' : '1') + '}', X(z), SY - 84, { size: 32, alpha: k });
    });
  }

  // 2 · il cambio di segno: massimo e minimo
  // il riquadro abbraccia i due segni ai lati dello zero; il primo si spegne quando arriva il secondo
  const ESTREMI = [[-1, 68.6, 74.0, 'massimo', -1, 78.6], [1, 78.9, 84.2, 'minimo', 1, 999]];
  ESTREMI.forEach(([z, th, tl, nome, lato, tb]) => {
    const kh = P(t, th, th + .6);
    if (kh <= 0) return;
    const pc = S(z, f(z));
    // il tratteggio salta la tacca «−1», che sta sopra l'asse
    if (lato < 0) {
      dashed(ctx, pc, [pc[0], O.oy - 52], C.v, kh, .9);
      dashed(ctx, [pc[0], O.oy], [pc[0], SY - 108], C.v, kh, .9);
    } else dashed(ctx, pc, [pc[0], SY - 108], C.v, kh, .9);
    const kb = kh * (1 - P(t, tb, tb + .5));
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    const xa = lato < 0 ? X(-1.55) - 50 : X(0) - 50, xb = lato < 0 ? X(0) + 50 : X(1.55) + 50;
    ctx.beginPath(); ctx.roundRect(xa, SY - 64, xb - xa, 96, 18); ctx.stroke(); ctx.restore();
    const kl = P(t, tl, tl + .5, E.back);
    if (kl > 0) {
      dot(ctx, pc, C.v, kl, 13);
      const lab = '{v:' + nome + '} {mink:(' + (z < 0 ? '−1; 2' : '1; −2') + ')}';
      if (lato < 0) drawRich(ctx, lab, pc[0], pc[1] - 48, { size: 38, local: t - tl });
      else drawRich(ctx, lab, pc[0] + 28, pc[1] + 44, { size: 38, align: 'left', local: t - tl });
    }
  });
  ctx.restore();
}

// 3 · in una frase (FINE–)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 9.4, FINE + 10.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il segno della derivata dice\ndove la curva {g:sale} e dove {r:scende}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[455, '{mink:f′ > 0}: la curva {g:sale}'], [960, '{mink:f′ < 0}: la curva {r:scende}'], [1465, '{v:cambio di segno}: cima o fondo']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.8 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.translate(-x, -500);
    card(ctx, x - 235, 450, 470, 100);
    drawRich(ctx, s, x, 502, { size: 30, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Crescere, decrescere, massimi e minimi', durata: FINE + 11.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 68.2, 'il segno della pendenza'], [68.2, FINE, 'massimi e minimi']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneGrafico(ctx, t); sceneFine(ctx, t); },
  };
});
