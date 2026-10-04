'use strict';
/* Che cos'è un logaritmo — log₂ 8 = 3 è la domanda «2 alla quanto fa 8?»: il logaritmo è un esponente;
   poi log₃ 9 = 2, la definizione log_a b = x ⇔ aˣ = b e le condizioni a > 0, a ≠ 1, b > 0. Argomento: logaritmi. */
CVIDEO.registra('logaritmi/che-cos-e', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, txt, card, crossMark } = M;

const FINE = 84.0, DURATA = 96.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'], [12.5, 'felice'], [14.5, 'neutro'],
  [17.0, 'felice'], [19.0, 'neutro'], [22.0, 'sorpreso'], [24.0, 'neutro'], [36.5, 'felice'], [38.5, 'neutro'],
  [41.6, 'pensa'], [50.0, 'festa'], [52.4, 'felice'], [54.9, 'neutro'], [69.2, 'sorpreso'], [71.2, 'neutro'],
  [FINE + 1.0, 'felice'], [90.6, 'occhiolino'], [92.6, 'felice'],
];
// una frase per ogni cosa che succede; mentre Ada parla la scena sta ferma
const FUMETTI = [
  [2.6, 6.3, '{mink:2} alla quanto fa {mink:8}?'],
  // 1 · la domanda
  [7.9, 12.4, 'Moltiplico {mink:2} per sé stesso\nfinché arrivo a {mink:8}.'],
  [12.5, 16.9, 'Servono {g:tre} fattori uguali a {mink:2}:\n{mink:2 · 2 · 2 = 8}.'],
  [17.0, 21.6, 'Cioè {mink:2³ = 8}: la risposta\nè l’{v:esponente}, {v:3}.'],
  // 2 · il nome
  [22.0, 27.0, 'Questo 3 ha un nome: è il\n{v:logaritmo} in base 2 di 8.'],
  [27.1, 31.6, 'Il {x:2} in basso è la {x:base},\nl’{y:8} è l’{y:argomento}.'],
  [31.7, 36.4, 'Il risultato, {v:3}, è l’esponente\nda dare alla base per avere 8.'],
  [36.5, 41.2, '{mink:log₂ 8 = 3} vuol dire {mink:2³ = 8}:\nla stessa cosa, detta in due modi.'],
  [41.6, 45.4, 'Proviamo: quanto fa {mink:log₃ 9}?'],
  [45.5, 49.9, 'È la domanda: {mink:3} alla quanto fa {mink:9}?'],
  [50.0, 54.4, '{mink:3² = 9}, quindi {mink:log₃ 9 = 2}.'],
  // 3 · la definizione
  [54.9, 59.4, 'In generale, con base {mink:a}\ne argomento {mink:b}:'],
  [59.5, 64.3, '{mink:x} è l’esponente da dare\nalla base per ottenere l’argomento.'],
  [64.5, 69.1, 'Vale con base {mink:a > 0}, {mink:a ≠ 1}\ne argomento {mink:b > 0}.'],
  [69.2, 74.0, 'Le potenze di 2 sono tutte positive:\n{mink:log₂(−4)} {r:non esiste}.'],
  [74.1, 78.9, 'E {mink:1ˣ} vale sempre 1: per questo\nla base 1 è {r:esclusa}.'],
  [79.0, 83.5, 'E {mink:a > 0} perché con base negativa\ncerte potenze {r:non esistono}.'],
  // chiusura
  [FINE + 1.4, 93.2,'Un logaritmo è un {v:esponente}:\n{mink:log₂ 8 = 3} perché {mink:2³ = 8}.'],
];
const CAPITOLI = [[7.5, 21.8, 'la domanda'], [21.8, 54.6, 'il logaritmo'], [54.6, FINE, 'la definizione']];

// una formula fatta a pezzi: stringhe di testo ricco, {sub} pedici e {sup} apici disegnati a mano
// (il pedice «a» di log_a non ha un carattere Unicode che il motore sappia abbassare).
// Restituisce [x, larghezza] di ogni pezzo, per puntarci le etichette.
function formula(ctx, parti, x, y, size, o = {}) {
  const ws = parti.map(p => typeof p === 'string' ? richW(ctx, p, size) : richW(ctx, p.sub || p.sup, size * .7) + size * .05);
  const tot = ws.reduce((a, b) => a + b, 0);
  let cx = o.align === 'left' ? x : o.align === 'right' ? x - tot : x - tot / 2;
  const pos = [];
  parti.forEach((p, i) => {
    const al = (o.alpha ?? 1) * (o.alphas && o.alphas[i] != null ? o.alphas[i] : 1);
    if (typeof p === 'string') drawRich(ctx, p, cx, y, { size, align: 'left', alpha: al });
    else drawRich(ctx, p.sub || p.sup, cx + size * .02, y + (p.sub ? size * .3 : -size * .4), { size: size * .7, align: 'left', alpha: al });
    pos.push([cx, ws[i]]); cx += ws[i];
  });
  return pos;
}
// etichetta con la sua lineetta verso il pezzo indicato
function etichetta(ctx, s, col, da, a, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col, .8); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(da[0], da[1]); ctx.lineTo(a[0], a[1]); ctx.stroke(); ctx.restore();
  drawRich(ctx, s, da[0], da[1] + (da[1] > a[1] ? 26 : -26), { size: 36, alpha: al });
}
// «vuol dire», con la doppia freccia, fra due formule
function vuolDire(ctx, x, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{dim:vuol dire}', x, y - 40, { size: 34 });
  ctx.strokeStyle = css(C.dim); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - 70, y + 6); ctx.lineTo(x + 70, y + 6); ctx.stroke();
  ctx.fillStyle = css(C.dim);
  [[x + 74, 0], [x - 74, Math.PI]].forEach(([px, ang]) => {
    ctx.save(); ctx.translate(px, y + 6); ctx.rotate(ang);
    ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-14, -10); ctx.lineTo(-10, 0); ctx.lineTo(-14, 10); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Che cos’è un logaritmo', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la scheda che resta per tutto il video
function sceneScheda(ctx, t) {
  if (t < 7.4 || t > FINE + .4) return;
  card(ctx, 80, 110, 1760, 690, life(t, 7.5, FINE + .3, .6, .6));
}

// 1 · la domanda: 2 · 2 · 2 = 8, cioè 2³ = 8 (7.5–21.8)
const TS = 116, XT = [670, 840, 1010], YT = 330;
const T_TESS = [8.4, 9.4, 10.4];
function tessera(ctx, x, y, k) {
  if (k <= 0) return;
  const L = TS * k;
  ctx.save();
  ctx.fillStyle = css(C.x, .13); ctx.strokeStyle = css(C.x); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - L / 2, y - L / 2, L, L, 18 * k); ctx.fill(); ctx.stroke();
  drawRich(ctx, '{mx:2}', x, y - 4 * k, { size: 70 * k });
  ctx.restore();
}
// la formula 2³ = 8: al centro in basso, poi scivola a destra (22,1–23,1)
const POT = ['{mx:2}', { sup: '{mv:3}' }, '{mink: = }{my:8}'];
const YF = 400;
function potenzaXY(t) { const k = P(t, 22.1, 23.1); return [lerp(960, 1400, k), lerp(650, YF, k), lerp(120, 110, k)]; }
function sceneDomanda(ctx, t) {
  if (t < 7.5 || t > 22.4) return;
  const al = 1 - P(t, 21.6, 22.2);
  ctx.save(); ctx.globalAlpha *= al;
  XT.forEach((x, i) => {
    const k = P(t, T_TESS[i], T_TESS[i] + .4, E.back);
    tessera(ctx, x, YT, k);
    if (i && k > .5) drawRich(ctx, '{mink:·}', (XT[i - 1] + x) / 2, YT, { size: 64 });
  });
  // il prodotto che cresce: 2, poi 4, poi 8
  // ogni risultato sta subito dopo l'ultima tessera, e se ne va prima che arrivi la tessera dopo
  const V = ['{mink:= }{mx:2}', '{mink:= 4}', '{mink:= }{my:8}'];
  V.forEach((s, i) => {
    const a = T_TESS[i] + .2, b = i < 2 ? T_TESS[i + 1] : 99;
    drawRich(ctx, s, XT[i] + TS / 2 + 42, YT, { size: 96, align: 'left', alpha: life(t, a, b, .3, .25) });
  });
  // i fattori contati, e la graffa
  const kc = P(t, 12.7, 13.2);
  if (kc > 0) {
    XT.forEach((x, i) => txt(ctx, String(i + 1), x, YT - 100, { size: 36, color: C.dim, alpha: kc }));
    ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.ink, .6); ctx.lineWidth = 3; ctx.lineCap = 'round';
    const x0 = XT[0] - TS / 2, x1 = XT[2] + TS / 2, yg = YT + 84;
    ctx.beginPath(); ctx.moveTo(x0, yg - 14); ctx.lineTo(x0, yg); ctx.lineTo(x1, yg); ctx.lineTo(x1, yg - 14); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{g:tre} fattori', XT[1], YT + 128, { size: 38, alpha: kc });
  }
  ctx.restore();
  // 2³ = 8, con l'esponente indicato
  const kp = P(t, 17.2, 17.7);
  if (kp > 0 && t < 22.1) {
    const pos = formula(ctx, POT, 960, 650, 120, { alpha: kp });
    const xe = pos[1][0] + pos[1][1] / 2;
    etichetta(ctx, '{v:esponente}', C.v, [xe + 200, 562], [xe + 26, 598], P(t, 18.0, 18.4) * al);
  }
}

// 2 · il nome: log₂ 8 = 3, poi l'esempio log₃ 9 = 2 (21.8–54.6)
const XL = 560, XR = 1400, XM = 980;
// le etichette sotto (base, esponente) e sopra (argomento) di una formula col logaritmo
function etichetteLog(ctx, pos, kb, ka, ke) {
  const cx = i => pos[i][0] + pos[i][1] / 2;
  etichetta(ctx, '{x:base}', C.x, [cx(1) - 70, YF + 120], [cx(1) - 8, YF + 72], kb);
  etichetta(ctx, '{y:argomento}', C.y, [cx(2) + 30, YF - 120], [cx(2) + 22, YF - 52], ka);
  etichetta(ctx, '{v:esponente}', C.v, [cx(4) + 70, YF + 120], [cx(4) + 6, YF + 52], ke);
}
function sceneNome(ctx, t) {
  if (t < 21.6 || t > 54.9) return;
  // log₂ 8 = 3 e 2³ = 8
  const aB = 1 - P(t, 41.1, 41.7);
  if (t < 41.8) {
    ctx.save(); ctx.globalAlpha *= aB;
    const [px, py, ps] = potenzaXY(t);
    if (t >= 22.1) formula(ctx, POT, px, py, ps);
    const kl = P(t, 23.2, 23.8);
    if (kl > 0) {
      const pos = formula(ctx, ['{mink:log}', { sub: '{mx:2}' }, '{mink: }{my:8}', '{mink: = }', '{mv:3}'], XL, YF, 110, { alpha: kl });
      etichetteLog(ctx, pos, P(t, 27.3, 27.7), P(t, 28.3, 28.7), P(t, 31.9, 32.3));
    }
    vuolDire(ctx, XM, YF, P(t, 36.7, 37.2));
    ctx.restore();
  }
  // log₃ 9 = ?  e  3^? = 9
  if (t > 41.7) {
    const aC = 1 - P(t, 54.3, 54.8);
    ctx.save(); ctx.globalAlpha *= aC;
    const kL = P(t, 41.9, 42.4), kR = P(t, 45.7, 46.2), kRs = P(t, 50.2, 50.6), kLs = P(t, 50.8, 51.2);
    formula(ctx, ['{mink:log}', { sub: '{mx:3}' }, '{mink: }{my:9}{mink: = }', '{mv:?}'], XL, YF, 110, { alpha: kL, alphas: [1, 1, 1, 1 - kLs] });
    if (kLs > 0) formula(ctx, ['{mink:log}', { sub: '{mx:3}' }, '{mink: }{my:9}{mink: = }', '{mg:2}'], XL, YF, 110, { alphas: [0, 0, 0, kLs] });
    if (kR > 0) {
      formula(ctx, ['{mx:3}', { sup: '{mv:?}' }, '{mink: = }{my:9}'], XR, YF, 110, { alpha: kR, alphas: [1, 1 - kRs, 1] });
      if (kRs > 0) formula(ctx, ['{mx:3}', { sup: '{mg:2}' }, '{mink: = }{my:9}'], XR, YF, 110, { alphas: [0, kRs, 0] });
    }
    vuolDire(ctx, XM, YF, P(t, 45.9, 46.4));
    ctx.restore();
  }
}

// 3 · la definizione e le condizioni (54.6–FINE)
const XC = [620, 960, 1300], YC = 635, YX = 735;
function anello(ctx, x, y, w, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.r); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - 34, w, 68, 16); ctx.stroke(); ctx.restore();
}
function sceneDefinizione(ctx, t) {
  if (t < 54.8 || t > FINE + .4) return;
  const al = 1 - P(t, FINE - .3, FINE + .3);
  ctx.save(); ctx.globalAlpha *= al;
  const kd = P(t, 55.1, 55.6);
  const pos = formula(ctx, ['{mink:log}', { sub: '{mx:a}' }, '{mink: }{my:b}', '{mink: = }', '{mv:x}'], XL, YF, 110, { alpha: kd });
  formula(ctx, ['{mx:a}', { sup: '{mv:x}' }, '{mink: = }{my:b}'], XR, YF, 110, { alpha: kd });
  vuolDire(ctx, XM, YF, kd);
  etichetteLog(ctx, pos, P(t, 55.5, 55.9), P(t, 56.5, 56.9), P(t, 59.7, 60.1));
  // le condizioni
  ['{mink:a > 0}', '{mink:a ≠ 1}', '{mink:b > 0}'].forEach((s, i) => drawRich(ctx, s, XC[i], YC, { size: 52, alpha: P(t, 64.7 + i * .6, 65.1 + i * .6) }));
  // perché l'argomento deve essere positivo
  const kn = P(t, 69.4, 69.9);
  anello(ctx, XC[2], YC, 210, kn);
  if (kn > 0) {
    drawRich(ctx, '{mr:log₂(−4)}', XC[2] - 40, YX, { size: 46, alpha: kn });
    crossMark(ctx, XC[2] + 150, YX, P(t, 69.9, 70.4), C.r, .45);
  }
  // perché la base 1 è esclusa
  const ku = P(t, 74.3, 74.8);
  anello(ctx, XC[1], YC, 210, ku);
  if (ku > 0) drawRich(ctx, '{mink:1ˣ = 1}', XC[1], YX, { size: 46, alpha: ku });
  // perché la base deve essere positiva: (−2) elevato a 1/2 sarebbe √(−2)
  const kb = P(t, 79.2, 79.7);
  anello(ctx, XC[0], YC, 210, kb);
  if (kb > 0) {
    formula(ctx, ['{mr:(−2)}', { sup: '{mr:1/2}' }], XC[0] - 50, YX, 46, { alpha: kb });
    crossMark(ctx, XC[0] + 112, YX, P(t, 79.7, 80.2), C.r, .45);
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
    drawRich(ctx, 'Il logaritmo è l’esponente da dare\nalla base per ottenere l’argomento.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[430, '{dim:2 alla quanto fa 8?}', 'log'], [960, '{dim:la base}', '{mink:a > 0},  {mink:a ≠ 1}'], [1490, '{dim:l’argomento}', '{mink:b > 0}']];
  pills.forEach(([x, testa, fo], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 230, 440, 460, 160);
    drawRich(ctx, testa, x, 484, { size: 32, weight: 400 });
    if (fo === 'log') formula(ctx, ['{mink:log}', { sub: '{mx:2}' }, '{mink: }{my:8}{mink: = }{mv:3}'], x, 548, 48);
    else drawRich(ctx, fo, x, 548, { size: 46 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Che cos’è un logaritmo', durata: DURATA, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: CAPITOLI,
    scena(ctx, t) { sceneIntro(ctx, t); sceneScheda(ctx, t); sceneDomanda(ctx, t); sceneNome(ctx, t); sceneDefinizione(ctx, t); sceneFine(ctx, t); },
  };
});
