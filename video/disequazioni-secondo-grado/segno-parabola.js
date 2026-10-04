'use strict';
/* Il segno sulla parabola — x² − x − 6 è la y della parabola y = x² − x − 6: positivo dove la curva sta sopra
   l'asse x (valori esterni agli zeri −2 e 3), negativo dove sta sotto (valori interni). Argomento: disequazioni-secondo-grado. */
CVIDEO.registra('disequazioni-secondo-grado/segno-parabola', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt,
    dot, hole, glowStroke, dashed, arrowHead, card } = M;
  const f = x => x * x - x - 6;

const FINE = 83.6, DURATA = 95.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [12.6, 'felice'], [14.8, 'neutro'],
  [19.0, 'sorpreso'], [21.1, 'neutro'], [28.3, 'pensa'], [33.1, 'felice'], [35.2, 'neutro'],
  [43.1, 'felice'], [45.2, 'neutro'], [53.1, 'felice'], [55.2, 'neutro'], [58.5, 'pensa'], [60.6, 'neutro'],
  [64.0, 'sorpreso'], [66.1, 'neutro'], [73.8, 'pensa'], [75.9, 'felice'], [78.0, 'neutro'],
  [FINE + 1.0, 'felice'], [89.8, 'occhiolino'], [91.9, 'felice'],
];
const TRI = '{mx:x}{mink:² − }{mx:x}{mink: − 6}';
// una frase per ogni cosa che succede, e solo mentre succede; i movimenti stanno fra un fumetto e l'altro
const FUMETTI = [
  [2.3, 6.3, 'Per quali {mx:x} il trinomio\n' + TRI + ' è positivo?'],
  // 1 · il trinomio come y
  [7.9, 12.3, 'Pensalo come la {my:y} della parabola\n{mink:y = }' + TRI + '.'],
  [12.6, 17.2, 'Per {mx:x}{mink: = 4} il trinomio vale {g:6}:\nil punto sta {g:sopra} l’asse.'],
  [19.0, 23.4, 'Per {mx:x}{mink: = 1} vale {r:−6}:\nil punto sta {r:sotto} l’asse.'],
  [23.5, 27.8, 'Sopra l’asse il trinomio è {g:positivo},\nsotto è {r:negativo}.'],
  // 2 · gli zeri
  [28.3, 33.0, 'Incontra l’asse negli {v:zeri}:\nle soluzioni di ' + TRI + '{mink: = 0}.'],
  [33.1, 37.6, 'Due numeri con somma 1 e prodotto −6:\nsono {v:−2} e {v:3}.'],
  [37.7, 42.9, 'Il numero davanti a {mx:x}{mink:²}, {mink:a}, vale 1:\nla parabola è rivolta {g:verso l’alto}.'],
  // 3 · valori esterni
  [43.1, 48.5, 'Sopra l’asse sta {g:fuori} dagli zeri:\na sinistra di −2, a destra di 3.'],
  [48.6, 53.0, 'Lì il trinomio è {g:positivo}:\nsono i {g:valori esterni}.'],
  [53.1, 58.4, 'Si scrive {mx:x}{mink: < −2 ∨ }{mx:x}{mink: > 3}:\nil simbolo {mink:∨} si legge «oppure».'],
  [58.5, 63.8, 'In −2 e in 3 il trinomio vale 0,\ne {mink:0 > 0} è falso: pallini {v:vuoti}.'],
  // 4 · valori interni
  [64.0, 68.6, 'Fra −2 e 3 la parabola sta {r:sotto}:\nil trinomio è {r:negativo}.'],
  [68.7, 73.6, 'Sono i {v:valori interni}: ' + TRI + '{mink: < 0}\nvale per {mink:−2 < }{mx:x}{mink: < 3}.'],
  [73.8, 79.1, 'Con {mink:≤}, «minore o uguale», vanno\nbene anche −2 e 3; e così con {mink:≥}.'],
  [79.3, 83.3, 'Si scrive {mink:−2 ≤ }{mx:x}{mink: ≤ 3},\ncon i pallini {g:pieni}.'],
  // chiusura
  [85.2, 92.8, 'Con {mink:a > 0}: positivo {g:fuori} dagli zeri,\nnegativo {r:fra} gli zeri.'],
];

// il piano: x da −5 a 6, y da −6,8 a 8,8; la y in scala più stretta, la griglia orizzontale ogni 2
const OX = 593, OY = 493, UX = 76, UY = 38, X0 = -5, X1 = 6, Y0 = -6.8, Y1 = 8.8;
const S = (x, y) => [OX + x * UX, OY - y * UY];
const CARD = [150, 110, 1000, 690];
const curva = (a, b, n = 160) => { const p = []; for (let i = 0; i <= n; i++) { const x = lerp(a, b, i / n); p.push(S(x, f(x))); } return p; };
const PAR = curva(-3.8, 4.8, 300), SX = curva(-3.8, -2, 80), DX = curva(3, 4.8, 80), IN = curva(-2, 3, 160);
function clipCard(ctx) { ctx.beginPath(); ctx.rect(CARD[0] + 8, CARD[1] + 8, CARD[2] - 16, CARD[3] - 16); ctx.clip(); }
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = X0; i <= X1; i++) { if (!i) continue; const x = OX + i * UX; ctx.beginPath(); ctx.moveTo(x, OY - Y1 * UY * k); ctx.lineTo(x, OY - Y0 * UY * k); ctx.stroke(); }
  for (let j = -6; j <= 8; j += 2) { if (!j) continue; const y = OY - j * UY; ctx.beginPath(); ctx.moveTo(OX + X0 * UX * k, y); ctx.lineTo(OX + X1 * UX * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(OX + (X0 - .1) * UX * k, OY); ctx.lineTo(OX + (X1 + .15) * UX * k, OY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(OX, OY - (Y0 - .1) * UY * k); ctx.lineTo(OX, OY - (Y1 + .2) * UY * k); ctx.stroke();
  arrowHead(ctx, [OX + (X1 + .15) * UX * k + 6, OY], 0, C.ink);
  arrowHead(ctx, [OX, OY - (Y1 + .2) * UY * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', OX + (X1 + .15) * UX + 38, OY, { size: 44 });
  drawRich(ctx, '{my:y}', OX + 30, OY - (Y1 + .2) * UY - 8, { size: 44 });
  ctx.restore();
}
const lab = v => (v < 0 ? '−' : '') + Math.abs(v);
// numero pieno su un fondino del colore della scheda
// dentro l'area rossa (fra la curva e l'asse, sotto) il fondino prende il colore dell'area: niente macchie chiare
const dentroRossa = (px, py) => { const x = (px - OX) / UX, y = (OY - py) / UY; return x > -2 && x < 3 && y < 0 && y > f(x); };
function numero(ctx, s, x, y, al, col = C.dim, size = 29, weight = 500, align = 'center', kr = 0) {
  if (al <= 0) return;
  const w = size * .62 * Array.from(s).length + 12, h = size + 6, cx = align === 'right' ? x - w / 2 + 6 : x;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.fillRect(cx - w / 2, y - h / 2, w, h);
  if (kr > 0 && dentroRossa(cx, y)) { ctx.globalAlpha *= kr; ctx.fillStyle = css(C.r, .15); ctx.fillRect(cx - w / 2, y - h / 2, w, h); }
  ctx.restore();
  txt(ctx, s, x, y, { size, weight, color: col, align, alpha: al });
}
// i numeri degli assi; −2 e 3 stanno un po' di lato, dalla parte dove la curva non passa:
// piccoli sotto l'asse, verso l'esterno; grandi (quando sono gli zeri) sopra l'asse, verso l'interno
const XZ = [[-2, -20, 30], [3, 16, -26]];
// sull'asse y −4 e −6 si spostano di lato: lì vicino passa la curva (−6 è proprio un suo punto, in x = 0)
const YN = [[-6, -44], [-4, -10], [-2, -20], [2, -20], [4, -20], [6, -20], [8, -20]];
function numeri(ctx, k, kz, kr) {
  const al = P(k, .6, 1); if (al <= 0) return;
  for (let i = X0; i <= X1; i++) if (i && i !== -2 && i !== 3) numero(ctx, lab(i), OX + i * UX, OY + 32, al, C.dim, 29, 500, 'center', kr);
  for (const [j, dx] of YN) numero(ctx, lab(j), OX + dx, OY - j * UY, al, C.dim, 29, 500, 'right', kr);
  for (const [v, dx, dxg] of XZ) {
    numero(ctx, lab(v), S(v, 0)[0] + dx, OY + 32, al * (1 - kz));
    numero(ctx, lab(v), S(v, 0)[0] + dxg, OY - 36, al * kz, C.v, 44, 600);
  }
}
// area fra la curva e l'asse, per x fra a e b
function area(ctx, a, b, col, al) {
  if (al <= 0) return;
  ctx.save(); clipCard(ctx); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .15);
  ctx.beginPath(); ctx.moveTo(...S(a, 0));
  for (let i = 0; i <= 120; i++) { const x = lerp(a, b, i / 120); ctx.lineTo(...S(x, Math.min(f(x), 11))); }
  ctx.lineTo(...S(b, 0)); ctx.closePath(); ctx.fill(); ctx.restore();
}
// il punto che si muove sulla curva: da x = 4 a x = 1 fra due fumetti
const xT = t => kf(t, [[17.3, 4], [18.8, 1]]);

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il segno sulla parabola', W / 2, 180, { size: 120, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
  drawRich(ctx, TRI + '{mink: > 0}', W / 2, 330, { size: 72, local: t - 2.6, alpha: al });
}

// 1–4 · il piano con la parabola (7.5–FINE)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const A = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= A;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const ka = P(t, 7.7, 8.7);
  // le aree: verde sopra (fuori dagli zeri), rossa sotto (fra gli zeri); con la rossa la verde si attenua
  const kg = P(t, 43.0, 43.6), kr = P(t, 63.9, 64.5), kv = kg * (1 - kr);
  area(ctx, X0 - .1, -2, C.g, kg * (1 - .6 * kr)); area(ctx, 3, X1 + .15, C.g, kg * (1 - .6 * kr)); area(ctx, -2, 3, C.r, kr);
  assi(ctx, ka);
  ctx.save(); clipCard(ctx);
  glowStroke(ctx, PAR, P(t, 8.4, 9.9), C.y, 5);
  if (kv > 0) { ctx.save(); ctx.globalAlpha *= kv; glowStroke(ctx, SX, 1, C.g, 8); glowStroke(ctx, DX, 1, C.g, 8); ctx.restore(); }
  if (kr > 0) { ctx.save(); ctx.globalAlpha *= kr; glowStroke(ctx, IN, 1, C.r, 8); ctx.restore(); }
  ctx.restore();
  // il segno della y, nelle due metà del piano, a sinistra dove la curva non passa
  const ks = life(t, 23.6, 28.0, .4, .4);
  drawRich(ctx, '{mg:y > 0}', S(-4.1, 2.3)[0], S(-4.1, 2.3)[1], { size: 40, alpha: ks });
  drawRich(ctx, '{mr:y < 0}', S(-4.1, -2.3)[0], S(-4.1, -2.3)[1], { size: 40, alpha: ks });
  // il punto che si muove: verde sopra l'asse, rosso sotto
  const kp = life(t, 12.5, 28.0, .4, .4);
  if (kp > 0) {
    const x = xT(t), y = f(x), col = mix(C.r, C.g, clamp(.5 + y / 2));
    dashed(ctx, S(x, 0), S(x, y), col, 1, kp);
    dot(ctx, S(x, 0), col, kp, 7);
    dot(ctx, S(x, y), col, P(t, 12.5, 12.9, E.back) * kp, 11);
  }
  // i numeri sopra il tratteggio, sul loro fondino
  numeri(ctx, ka, P(t, 33.1, 33.6), kr);
  // gli zeri
  const kz = P(t, 28.3, 28.7, E.back);
  // pieni finché sono solo gli zeri; vuoti con > e < (esclusi), di nuovo pieni con ≤
  const kvuoto = P(t, 53.2, 53.6) * (1 - P(t, 73.8, 74.2));
  for (const v of [-2, 3]) {
    dot(ctx, S(v, 0), C.v, kz * (1 - kvuoto), 10);
    hole(ctx, S(v, 0), C.v, kz * kvuoto, 11);
  }
  ctx.restore();
}

// la scheda a destra: i conti e, sotto, la retta delle soluzioni
const PX = 1210, PW = 640, PC = PX + PW / 2;
const LY = 690, LX = v => PC + (v - .5) * 44;
function riga2(ctx, sx, dx, y, al) {   // due colonne: a sinistra la x, a destra il conto
  if (al <= 0) return;
  drawRich(ctx, sx, PX + 44, y, { size: 44, align: 'left', alpha: al });
  drawRich(ctx, dx, PX + PW - 44, y, { size: 44, align: 'right', alpha: al });
}
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PX + 40, y); ctx.lineTo(PX + PW - 40, y); ctx.stroke(); ctx.restore();
}
function sfondo(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col, .13);
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.restore();
}
function scenePannello(ctx, t) {
  const pa = life(t, 8.2, FINE + .2, .5, .8);
  if (pa <= 0) return;
  card(ctx, PX, 110, PW, 690, pa);
  ctx.save(); ctx.globalAlpha *= pa;
  drawRich(ctx, '{mink:y = }' + TRI, PC, 172, { size: 52, local: t - 8.4 });
  separa(ctx, 224, 1);
  // 1 · due valori della x
  riga2(ctx, '{mx:x}{mink: = 4}', '{mink:4² − 4 − 6 = }{mg:6}', 290, life(t, 12.6, 28.0, .4, .4));
  riga2(ctx, '{mx:x}{mink: = 1}', '{mink:1² − 1 − 6 = }{mr:−6}', 362, life(t, 18.9, 28.0, .4, .4));
  // 2 · gli zeri e la a
  drawRich(ctx, TRI + '{mink: = 0}', PC, 290, { size: 44, alpha: P(t, 28.3, 28.8) });
  drawRich(ctx, '{dim:zeri:}  {mv:−2}{dim:  e  }{mv:3}', PC, 362, { size: 44, alpha: P(t, 33.1, 33.6) });
  drawRich(ctx, '{mink:a = 1 > 0}', PC, 432, { size: 44, alpha: P(t, 37.7, 38.2) });
  separa(ctx, 480, P(t, 43.0, 43.5));
  // 3–4 · la disequazione e la soluzione
  const kge = P(t, 73.8, 74.2);
  drawRich(ctx, TRI + '{mink: > 0}', PC, 536, { size: 48, alpha: life(t, 48.7, 64.3, .4, .4) });
  drawRich(ctx, TRI + '{mink: < 0}', PC, 536, { size: 48, alpha: life(t, 68.8, 99, .4, .1) * (1 - kge) });
  drawRich(ctx, TRI + '{mink: }{mv:≤}{mink: 0}', PC, 536, { size: 48, alpha: kge });
  const s1 = life(t, 53.2, 64.3, .4, .4), s2 = life(t, 68.8, 74.0, .4, .3), s3 = P(t, 79.3, 79.7);
  sfondo(ctx, PX + 60, 574, PW - 120, 68, C.v, Math.max(s1, s2, s3));
  drawRich(ctx, '{mx:x}{mink: < −2 ∨ }{mx:x}{mink: > 3}', PC, 608, { size: 50, alpha: s1 });
  drawRich(ctx, '{mink:−2 < }{mx:x}{mink: < 3}', PC, 608, { size: 50, alpha: s2 });
  drawRich(ctx, '{mink:−2 ≤ }{mx:x}{mink: ≤ 3}', PC, 608, { size: 50, alpha: s3 });
  // la retta delle soluzioni
  const kl = P(t, 53.1, 53.6);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(LX(-5.6), LY); ctx.lineTo(LX(6.4), LY); ctx.stroke();
    arrowHead(ctx, [LX(6.4) + 12, LY], 0, C.ink);
    ctx.lineWidth = 2.5;
    for (let i = -5; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(LX(i), LY - 9); ctx.lineTo(LX(i), LY + 9); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= kl;
    numero(ctx, '−2', LX(-2), LY + 46, 1, C.v, 44, 600); numero(ctx, '3', LX(3), LY + 46, 1, C.v, 44, 600);
    ctx.restore();
  }
  // valori esterni: due semirette; valori interni: il tratto fra gli zeri
  const kf1 = P(t, 53.3, 54.3) * (1 - P(t, 63.9, 64.3));
  if (kf1 > 0) {
    let e = glowStroke(ctx, [[LX(-2), LY], [LX(-5.5), LY]], kf1, C.v, 8); if (e) arrowHead(ctx, e[0], Math.PI, C.v, 1.3);
    e = glowStroke(ctx, [[LX(3), LY], [LX(6.3), LY]], kf1, C.v, 8); if (e) arrowHead(ctx, e[0], 0, C.v, 1.3);
  }
  const kf2 = P(t, 68.9, 69.7);
  if (kf2 > 0) glowStroke(ctx, [[LX(-2), LY], [LX(3), LY]], kf2, C.v, 8);
  // gli estremi: vuoti con > e <, pieni con ≤
  const kv = Math.max(P(t, 53.3, 53.7, E.back) * (1 - P(t, 63.9, 64.3)), P(t, 68.9, 69.3, E.back));
  sfondo(ctx, LX(-2) - 30, LY - 30, 60, 60, C.v, life(t, 58.6, 63.8, .3, .3));
  sfondo(ctx, LX(3) - 30, LY - 30, 60, 60, C.v, life(t, 58.6, 63.8, .3, .3));
  for (const v of [-2, 3]) {
    hole(ctx, [LX(v), LY], C.v, kv * (1 - kge), 13);
    dot(ctx, [LX(v), LY], C.v, kge, 13);
  }
  ctx.restore();
}

// chiusura (FINE–DURATA)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DURATA - 2.2, DURATA - 1.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il trinomio è {g:positivo} dove la parabola\nsta sopra l’asse, {r:negativo} dove sta sotto.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'trinomio {mink:> 0}:\nvalori {g:esterni}'], [960, 'trinomio {mink:< 0}:\nvalori {r:interni}'], [1450, 'con {mink:≤} o {mink:≥}:\nzeri {g:inclusi}']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 230, 445, 460, 130);
    drawRich(ctx, s, x, 512, { size: 36, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  drawRich(ctx, '{dim:con }{mink:a > 0}{dim: e due zeri}', W / 2, 630, { size: 34, alpha: P(t, FINE + 4.4, FINE + 4.9) });
  ctx.restore();
}

  return {
    titolo: 'Il segno sulla parabola', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 28.0, 'il trinomio è una {my:y}'], [28.0, 42.9, 'gli zeri'], [42.9, 63.8, 'valori esterni'], [63.8, FINE, 'valori interni']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
