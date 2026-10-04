'use strict';
/* Il regolo calcolatore — su un righello a passi raddoppiati la distanza da 1 è il logaritmo in base 2;
   facendo scorrere un righello sull'altro le distanze si sommano: 4 · 8 = 32. Poi il regolo vero, in base 10: 2 · 3 = 6.
   Argomento: logaritmi. */
CVIDEO.registra('logaritmi/regolo', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, txt, card, arrowHead } = M;

const FINE = 71.2, DURATA = 83.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [12.7, 'felice'], [14.7, 'neutro'],
  [27.5, 'sorpreso'], [29.5, 'neutro'], [36.7, 'festa'], [39.0, 'felice'], [41.0, 'neutro'], [46.1, 'felice'],
  [48.1, 'neutro'], [61.8, 'pensa'], [66.1, 'festa'], [68.6, 'neutro'],
  [FINE + 1.0, 'felice'], [78.0, 'occhiolino'], [80.5, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [2.6, 6.3, 'Si può moltiplicare\nsommando due lunghezze?'],
  // 1 · un righello di potenze
  [7.9, 12.6, 'Su questo righello, a ogni passo\nil numero {g:raddoppia}.'],
  [12.7, 17.6, 'Da 1 a 8 ci sono 3 passi:\nproprio {mink:log₂ 8 = 3}.'],
  [17.7, 22.8, 'Ogni numero dista da 1 tanti passi\nquanto il suo logaritmo in base 2.'],
  // 2 · due righelli
  [23.0, 27.4, 'Sopra ne metto un altro,\ncon gli stessi passi.'],
  [27.5, 32.1, 'Lo faccio scorrere di 2 passi:\nil suo 1 va sul 4.'],
  [32.2, 36.6, 'Sopra, dall’1 all’8\nci sono altri 3 passi.'],
  [36.7, 40.9, 'Sotto l’8 leggo {g:32}:\n{mink:4 · 8 = 32}.'],
  [41.0, 46.0, '2 passi più 3 passi fanno 5:\n{mink:log₂ 4 + log₂ 8 = log₂ 32}.'],
  [46.1, 50.8, 'Sommare le distanze vuol dire\n{g:moltiplicare} i numeri.'],
  // 3 · il regolo vero
  [51.2, 56.2, 'Un regolo vero ha tutti i numeri\nda 1 a 10, in base 10.'],
  [56.3, 61.6, 'Se il righello è lungo 1, ogni numero\ndista da 1 quanto il suo logaritmo.'],
  [61.8, 66.0, 'Porto l’1 di sopra sul 2 di sotto…'],
  [66.1, 70.6, '…e sotto il 3 di sopra leggo {g:6}:\n{mink:2 · 3 = 6}.'],
  // chiusura
  [FINE + 1.4, 80.4, 'Sommare logaritmi vuol dire\nmoltiplicare i numeri.'],
];
const CAPITOLI = [[7.5, 22.9, 'un righello di potenze'], [22.9, 50.9, 'due righelli'], [50.9, FINE, 'il regolo vero']];

// i due righelli: si toccano sulla riga Y0; quello sotto ha i numeri in alto, quello sopra in basso
const Y0 = 400, X0 = 160, RH = 104;                  // RH: altezza di un righello
const U2 = 175, L10 = 1230, X2 = 360;
const x2 = k => X2 + U2 * k;                         // il numero 2^k sul righello in base 2
const x10 = n => X0 + L10 * Math.log10(n);           // il numero n sul regolo in base 10
// righello: tacche [x, etichetta, comparsa], sopra (dir = −1) o sotto (dir = 1)
function righello(ctx, tacche, xa, xb, dir, al, evid) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const y1 = Y0 + dir * RH;
  ctx.fillStyle = css(C.x, .06); ctx.strokeStyle = css(C.ink, .45); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.roundRect(xa, Math.min(Y0, y1), xb - xa, RH, 10); ctx.fill(); ctx.stroke();
  tacche.forEach(([x, s, k]) => {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x, Y0); ctx.lineTo(x, Y0 + dir * 28); ctx.stroke();
    const on = evid && evid(s);
    txt(ctx, s, x, Y0 + dir * 64, { size: 44, weight: on ? 700 : 500, color: on ? C.g : C.ink });
    ctx.restore();
  });
  ctx.restore();
}
// freccia orizzontale con l'etichetta (sopra se dir = −1, sotto se dir = 1; a destra della punta se dir = 0)
function freccia(ctx, xa, xb, y, s, col, k, dir = -1) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  const xe = lerp(xa, xb, k);
  ctx.beginPath(); ctx.moveTo(xa, y - 12); ctx.lineTo(xa, y + 12); ctx.moveTo(xa, y); ctx.lineTo(xe, y); ctx.stroke();
  arrowHead(ctx, [xe + 2, y], 0, col);
  ctx.restore();
  if (dir) drawRich(ctx, s, (xa + xb) / 2, y + dir * 36, { size: 36, alpha: P(k, .5, 1) });
  else drawRich(ctx, s, xb + 34, y, { size: 36, align: 'left', alpha: P(k, .5, 1) });
}
// graffa sotto un tratto, con il suo nome
function graffa(ctx, xa, xb, y, s, al, size = 36) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v, .85); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xa, y - 14); ctx.lineTo(xa, y); ctx.lineTo(xb, y); ctx.lineTo(xb, y - 14); ctx.stroke(); ctx.restore();
  drawRich(ctx, s, (xa + xb) / 2, y + 16 + size / 2, { size, alpha: al });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il regolo calcolatore', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function sceneScheda(ctx, t) {
  if (t < 7.4 || t > FINE + .4) return;
  card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .3, .6, .6));
}

// 1–2 · in base 2: un righello di potenze, poi due (7.5–51)
const SLIDE2 = t => U2 * 2 * P(t, 27.7, 29.2);
function sceneBase2(ctx, t) {
  if (t < 7.6 || t > 51.6) return;
  const al = 1 - P(t, 50.9, 51.5);
  ctx.save(); ctx.globalAlpha *= al;
  // il righello sotto: 1, 2, 4, … 128, le tacche compaiono una alla volta
  const sotto = Array.from({ length: 8 }, (_, k) => [x2(k), String(2 ** k), P(t, 8.2 + k * .25, 8.5 + k * .25)]);
  const evidSotto = s => s === '32' && t > 36.9;
  righello(ctx, sotto, x2(0) - 60, x2(7) + 60, 1, P(t, 7.8, 8.3), evidSotto);
  // 3 passi da 1 a 8
  const kg = life(t, 12.9, 17.7, .4, .4);
  graffa(ctx, x2(0), x2(3), Y0 + RH + 40, '{v:3 passi}', kg);
  drawRich(ctx, '{mink:log₂ 8 = }{mv:3}', x2(1.5), Y0 + 270, { size: 54, alpha: kg });
  // i passi di ogni numero
  const kp = life(t, 17.9, 23.0, .4, .4);
  if (kp > 0) {
    drawRich(ctx, '{dim:passi da 1:}', x2(0) - 70, Y0 + 160, { size: 32, align: 'right', alpha: kp });
    for (let k = 0; k < 8; k++) txt(ctx, String(k), x2(k), Y0 + 160, { size: 44, weight: 600, color: C.v, alpha: kp * P(t, 17.9 + k * .12, 18.2 + k * .12) });
  }
  // il righello sopra: 1, 2, … 32, che scorre di 2 passi
  const ks = P(t, 23.2, 23.8);
  if (ks > 0) {
    const dx = SLIDE2(t);
    const sopra = Array.from({ length: 6 }, (_, k) => [x2(k) + dx, String(2 ** k), 1]);
    righello(ctx, sopra, x2(0) - 60 + dx, x2(5) + 60 + dx, -1, ks, s => s === '8' && t > 36.9);
  }
  // 2 passi: lo scorrimento, sotto
  freccia(ctx, x2(0), x2(2), Y0 + RH + 46, '{x:2 passi}', C.x, P(t, 27.7, 29.2, E.lin), 1);
  // 3 passi sopra: dall'1 all'8 del righello di sopra
  freccia(ctx, x2(2), x2(5), Y0 - RH - 36, '{y:3 passi}', C.y, P(t, 32.4, 33.6, E.lin), -1);
  // l'8 di sopra e il 32 di sotto, e il prodotto scritto
  const kv = P(t, 36.9, 37.3);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(x2(5) - 48, Y0 - 98, 96, 196, 16); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mx:4}{mink: · }{my:8}{mink: = }{mg:32}', 520, Y0 + 325, { size: 56, alpha: kv });
  }
  // la somma dei passi: 2 + 3 = 5 passi, fino al riquadro verde
  const kk = P(t, 41.2, 41.7);
  if (kk > 0) { ctx.save(); ctx.globalAlpha *= kk; freccia(ctx, x2(0), x2(5), Y0 + RH + 136, '{g:5 passi}', C.g, 1, 0); ctx.restore(); }
  if (kk > 0) drawRich(ctx, '{mink:log₂ }{mx:4}{mink: + log₂ }{my:8}{mink: = log₂ }{mg:32}', 1240, Y0 + 325, { size: 54, alpha: kk });
  ctx.restore();
}

// 3 · il regolo vero, in base 10 (51–FINE)
function sceneBase10(ctx, t) {
  if (t < 51.0 || t > FINE + .4) return;
  const al = life(t, 51.2, FINE + .3, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  const N = Array.from({ length: 10 }, (_, i) => i + 1);
  righello(ctx, N.map(n => [x10(n), String(n), 1]), X0 - 50, x10(10) + 50, 1, 1, s => s === '6' && t > 66.3);
  const dx = L10 * Math.log10(2) * P(t, 62.0, 63.4);
  righello(ctx, N.map(n => [x10(n) + dx, String(n), 1]), X0 - 50 + dx, x10(10) + 50 + dx, -1, 1, s => s === '3' && t > 66.3);
  // le lunghezze: tutto il righello vale 1, da 1 a 2 vale log₁₀ 2
  const kb = life(t, 56.5, 61.8, .4, .4);
  graffa(ctx, x10(1), x10(10), Y0 + RH + 40, '{dim:lunghezza} {mink:1}', kb);
  graffa(ctx, x10(1), x10(2), Y0 + RH + 150, '{mink:log₁₀ 2 ≈ 0,30}', kb * P(t, 57.3, 57.8), 44);
  // sotto il 3 di sopra, il 6
  const kv = P(t, 66.3, 66.7);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(x10(6) - 36, Y0 - 98, 72, 196, 16); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:2 · 3 = }{mg:6}', 960, Y0 + 270, { size: 60 });
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Sul regolo le distanze sono logaritmi:\nsommarle vuol dire moltiplicare.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{dim:da 1 a 8: 3 passi}', '{mink:log₂ 8 = 3}'], [960, '{dim:2 passi + 3 passi}', '{mink:4 · 8 = 32}'], [1490, '{dim:sul regolo vero}', '{mink:2 · 3 = 6}']];
  pills.forEach(([x, testa, fo], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 230, 440, 460, 160);
    drawRich(ctx, testa, x, 484, { size: 32, weight: 400 });
    drawRich(ctx, fo, x, 548, { size: 46 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il regolo calcolatore', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneScheda(ctx, t); sceneBase2(ctx, t); sceneBase10(ctx, t); sceneFine(ctx, t); },
  };
});
