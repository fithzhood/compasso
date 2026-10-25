'use strict';
/* Polinomi che imitano il seno — intorno a 0, sin x ≈ x (la tangente in 0), poi x − x³/6, poi x − x³/6 + x⁵/120:
   i polinomi di Taylor di sin x di grado 1, 3 e 5. L'errore |polinomio − sin x| resta sotto 0,01 per |x| fino a
   ≈ 0,39, 1,04 e 1,76 (si mostrano i valori arrotondati per difetto: 0,39 → 0,00981; 1,04 → 0,00988; 1,76 → 0,00994).
   In x = 1: 1; 0,8333…; 0,841666… contro sin 1 ≈ 0,841471 (scarto ≈ 0,0002). Lontano da 0 si staccano: in x = 3,6
   il grado 5 vale ≈ 0,863 e sin 3,6 ≈ −0,443. Il fattoriale si dice la prima volta: 6 = 3! = 1 · 2 · 3, 120 = 5! = 1 · 2 · 3 · 4 · 5.
   Conti rifatti con node. Argomento: derivate. */
CVIDEO.registra('derivate/taylor', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, txt, dot, glowStroke, dashed, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 15 caratteri al secondo)
const SEQ = [
  ['seno', 4.6, 'Ecco {my:y = sin }{mx:x}, con {mx:x}\nin radianti.'],
  ['retta', 5.6, 'Prima prova, la retta {mv:y = }{mx:x}:\nè la {v:tangente} in 0.'],
  ['banda1', 6.0, 'L’errore, cioè la distanza dal seno,\nsta sotto {g:0,01} solo vicino a 0.'],
  ['uno1', 7.8, 'In {mx:x = 1} la retta vale 1,\nmentre {my:sin 1 ≈ 0,84147}.'],
  ['p3', 5.8, 'Aggiungo un termine:\n{mv:y = }{mx:x}{mv: − }{mx:x}{mv:³/6}.', .3],
  ['banda3', 7.4, 'Ora l’errore sta sotto {g:0,01}\nfra {g:−1,04} e {g:1,04}.'],
  ['uno3', 5.2, 'In {mx:x = 1} ora vale circa {v:0,8333}.'],
  ['p5', 8.4, 'Un altro termine:\n{mv:y = }{mx:x}{mv: − }{mx:x}{mv:³/6 + }{mx:x}{mv:⁵/120}.', .3],
  ['banda5', 6.4, 'Errore sotto {g:0,01} fra {g:−1,76} e {g:1,76}.'],
  ['uno5', 4.8, 'In {mx:x = 1} sbaglia di circa {g:0,0002}.'],
  ['fatt', 5.4, 'Il 6 è {mink:3!}, «3 fattoriale»:\n{mink:3! = 1 · 2 · 3 = 6}.'],
  ['fatt5', 7.0, 'E il 120 è {mink:5! = 1 · 2 · 3 · 4 · 5 = 120}.'],
  ['lontano', 6.0, 'Lontano da 0 si stacca: non è il seno,\nlo {v:approssima} solo vicino a 0.', .3],
  ['nome', 5.0, 'Sono i {v:polinomi di Taylor}\ndel seno, di grado 1, 3 e 5.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Un polinomio può imitare\nil seno?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Ogni termine in più allunga il tratto\nin cui il polinomio segue il seno.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.retta + .5, 'felice'], [T.banda1, 'neutro'], [T.uno1 + .5, 'pensa'], [T.p3, 'neutro'],
  [T.banda3 + .4, 'sorpreso'], [T.uno3, 'felice'], [T.p5, 'neutro'], [T.banda5 + .4, 'festa'], [T.banda5 + 3.0, 'neutro'],
  [T.uno5 + .3, 'felice'], [T.fatt, 'neutro'], [T.lontano + .4, 'pensa'], [T.nome + .3, 'felice'], [T.nome + 2.6, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- il piano ----------
const PCARD = [90, 110, 1210, 690], SCARD = [1330, 110, 500, 690];
const OX = 695, OY = 455, U = 125;
const X = x => OX + x * U, Y = y => OY - y * U, S = (x, y) => [X(x), Y(y)];
const POL = [x => x, x => x - x * x * x / 6, x => x - x * x * x / 6 + Math.pow(x, 5) / 120];
const BANDA = [.39, 1.04, 1.76];
const curva = (g, a = -4.3, b = 4.3, n = 300) => { const p = []; for (let i = 0; i <= n; i++) { const x = lerp(a, b, i / n); p.push(S(x, g(x))); } return p; };
const SENO = curva(Math.sin);
// il polinomio che si vede: si piega da un grado al successivo quando Ada aggiunge il termine
const kP3 = t => P(t, T.p3 + .3, T.p3 + 1.5), kP5 = t => P(t, T.p5 + .3, T.p5 + 1.5);
const polT = t => { const a = kP3(t), b = kP5(t); return x => POL[0](x) + a * (POL[1](x) - POL[0](x)) + b * (POL[2](x) - POL[1](x)); };
// i curve si tagliano sul riquadro del piano
function taglia(ctx) { ctx.beginPath(); ctx.rect(PCARD[0] + 6, PCARD[1] + 6, PCARD[2] - 12, PCARD[3] - 12); ctx.clip(); }
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Polinomi che imitano il seno', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1 · il piano (7.2–FINE)
function scenePiano(ctx, t) {
  if (t < 7.1 || t > FINE + .3) return;
  const al = life(t, 7.2, FINE, .6, .6);
  card(ctx, ...PCARD, al);
  ctx.save(); ctx.globalAlpha *= al;
  // gli assi; i numeri dove le curve non passano: x positivi sotto l'asse, x negativi sopra, y a sinistra
  const ka = P(t, 7.4, 8.2);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(-4.45), OY); ctx.lineTo(X(4.4), OY); ctx.moveTo(OX, Y(-2.5)); ctx.lineTo(OX, Y(2.45)); ctx.stroke();
    ctx.lineWidth = 2;
    for (let i = -4; i <= 4; i++) if (i) { ctx.beginPath(); ctx.moveTo(X(i), OY - 8); ctx.lineTo(X(i), OY + 8); ctx.stroke(); }
    for (let j = -2; j <= 2; j++) if (j) { ctx.beginPath(); ctx.moveTo(OX - 8, Y(j)); ctx.lineTo(OX + 8, Y(j)); ctx.stroke(); }
    ctx.restore();
    arrowHead(ctx, [X(4.4) + 6, OY], 0, C.ink); arrowHead(ctx, [OX, Y(2.45) - 6], -Math.PI / 2, C.ink);
    ctx.save(); ctx.globalAlpha *= P(ka, .6, 1);
    drawRich(ctx, '{mx:x}', X(4.4) + 36, OY, { size: 44 });
    drawRich(ctx, '{my:y}', OX + 32, Y(2.45) - 2, { size: 44 });
    for (let i = -4; i <= 4; i++) if (i) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), X(i), OY + (i < 0 ? -32 : 32), { size: 30, color: C.dim });
    for (let j = -2; j <= 2; j++) if (j) txt(ctx, (j < 0 ? '−' : '') + Math.abs(j), OX - 22, Y(j), { size: 30, color: C.dim, align: 'right' });
    ctx.restore();
  }
  // la fascia dove l'errore resta sotto 0,01, sull'asse x
  const a = BANDA[0] * P(t, T.banda1 + .3, T.banda1 + 1.2) + (BANDA[1] - BANDA[0]) * P(t, T.banda3 + .3, T.banda3 + 1.2) + (BANDA[2] - BANDA[1]) * P(t, T.banda5 + .3, T.banda5 + 1.2);
  if (a > .005) {
    ctx.save(); ctx.fillStyle = css(C.g, .35); ctx.fillRect(X(-a), OY - 9, 2 * a * U, 18);
    ctx.strokeStyle = css(C.g); ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(X(-a), OY - 13); ctx.lineTo(X(-a), OY + 13); ctx.moveTo(X(a), OY - 13); ctx.lineTo(X(a), OY + 13); ctx.stroke();
    ctx.restore();
  }
  ctx.save(); taglia(ctx);
  // il seno e il suo nome, a sinistra in alto: lì non passa nessun polinomio
  glowStroke(ctx, SENO, P(t, T.seno + .2, T.seno + 1.6, E.lin), C.y, 6);
  // i gradi precedenti, tenui, quando Ada li nomina tutti e tre
  const kn = P(t, T.nome + .3, T.nome + 1.0);
  if (kn > 0) {
    ctx.save(); ctx.globalAlpha *= .4 * kn; ctx.setLineDash([12, 10]);
    [POL[0], POL[1]].forEach(g => { const p = curva(g); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); });
    ctx.restore();
  }
  // il polinomio
  const kr = P(t, T.retta + .3, T.retta + 1.3, E.lin);
  if (kr > 0) glowStroke(ctx, curva(polT(t)), kr, C.v, 5);
  ctx.restore();
  lab(ctx, '{my:y = sin }{mx:x}', 200, 280, P(t, T.seno + 1.2, T.seno + 1.6));
  // in x = 1: il seno e il polinomio
  const ku = P(t, T.uno1 + .3, T.uno1 + .9);
  if (ku > 0) {
    const g = polT(t);
    dashed(ctx, S(1, 0), S(1, Math.sin(1)), C.x, ku, .9);
    dot(ctx, S(1, g(1)), C.v, ku, 9);
    dot(ctx, S(1, Math.sin(1)), C.y, ku, 9);
  }
  // lontano da 0: la distanza fra il polinomio di grado 5 e il seno, in x = 3,6
  const kl = life(t, T.lontano + .3, T.nome + .3, .5, .5);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = css(C.r); ctx.lineWidth = 6; ctx.lineCap = 'round';
    const p = S(3.6, POL[2](3.6)), q = S(3.6, Math.sin(3.6));
    ctx.beginPath(); ctx.moveTo(p[0], p[1] + 12); ctx.lineTo(q[0], q[1] - 12); ctx.stroke(); ctx.restore();
    dot(ctx, S(3.6, POL[2](3.6)), C.v, kl, 8); dot(ctx, S(3.6, Math.sin(3.6)), C.y, kl, 8);
  }
  ctx.restore();
}

// 2 · la scheda a destra (T.retta–FINE): il polinomio, il valore in x = 1, il tratto con errore sotto 0,01
const XL = 1370, XR = 1790, XC = 1580;
const FORM = ['{mv:x}', '{mv:x − x³/6}', '{mv:x − x³/6 + x⁵/120}'];
const VAL = ['{mv:1}', '{mink:≈ }{mv:0,8333}', '{mink:≈ }{mv:0,84167}'];
const FRA = ['{ink:fra  }{mg:−0,39}{ink:  e  }{mg:0,39}', '{ink:fra  }{mg:−1,04}{ink:  e  }{mg:1,04}', '{ink:fra  }{mg:−1,76}{ink:  e  }{mg:1,76}'];
// tre stati che si danno il cambio, a e b le due date: il vecchio esce del tutto prima che entri il nuovo
const tre = (t, a, b) => { const o1 = P(t, a, a + .25), i1 = P(t, a + .3, a + .55), o2 = P(t, b, b + .25), i2 = P(t, b + .3, b + .55); return [1 - o1, i1 * (1 - o2), i2]; };
function sceneScheda(ctx, t) {
  if (t < T.retta || t > FINE + .3) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...SCARD, P(t, T.retta, T.retta + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori * P(t, T.retta + .2, T.retta + .7);
  // il titolo: «il polinomio», poi «polinomi di Taylor» quando Ada li chiama per nome
  const kt0 = P(t, T.nome + .3, T.nome + .55), kt = P(t, T.nome + .6, T.nome + .85);
  conFont(TITOLI, () => {
    drawRich(ctx, 'il polinomio', XC, 165, { size: 38, weight: 600, alpha: 1 - kt0 });
    drawRich(ctx, 'polinomi di {v:Taylor}', XC, 165, { size: 38, weight: 600, alpha: kt });
  });
  drawRich(ctx, '{my:sin }{mx:x}{mink: ≈}', XC, 225, { size: 42 });
  const kf = tre(t, T.p3 + .3, T.p5 + .3);
  FORM.forEach((s, i) => lab(ctx, s, XC, 285, kf[i], 44));
  ['grado 1', 'grado 3', 'grado 5'].forEach((s, i) => txt(ctx, s, XC, 335, { size: 30, color: C.dim, alpha: kf[i] }));
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 368); ctx.lineTo(XR, 368); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= fuori;
  // in x = 1: il valore del polinomio sparisce quando cambia grado e torna quando Ada lo dice
  const ku = P(t, T.uno1 + .3, T.uno1 + .8);
  lab(ctx, '{dim:in }{mx:x}{dim: = 1}', XC, 405, ku, 32);
  const kv = [ku * (1 - P(t, T.p3 + .2, T.p3 + .6)), P(t, T.uno3 + .3, T.uno3 + .8) * (1 - P(t, T.p5 + .2, T.p5 + .6)), P(t, T.uno5 + .3, T.uno5 + .8)];
  VAL.forEach((s, i) => lab(ctx, s, XR, 455, kv[i], 44, 'right'));
  // l'etichetta «polinomio» c'è solo quando c'è anche il suo valore
  lab(ctx, '{dim:polinomio}', XL, 455, Math.max(kv[0], kv[1], kv[2]), 32, 'left');
  lab(ctx, '{my:sin 1}', XL, 512, ku, 40, 'left');
  lab(ctx, '{mink:≈ }{my:0,84147}', XR, 512, ku, 44, 'right');
  const kb = P(t, T.banda1 + .4, T.banda1 + .9);
  if (kb > 0) {
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 552); ctx.lineTo(XR, 552); ctx.stroke(); ctx.restore();
  }
  lab(ctx, '{dim:errore < 0,01}', XC, 590, kb, 32);
  const kfr = tre(t, T.banda3 + .4, T.banda5 + .4);
  FRA.forEach((s, i) => lab(ctx, s, XC, 642, kb * kfr[i], 42));
  // i denominatori
  const kd = P(t, T.fatt + .3, T.fatt + .8);
  lab(ctx, '{mink:3! = 1 · 2 · 3 = 6}', XC, 708, kd, 40);
  lab(ctx, '{mink:5! = 1 · 2 · 3 · 4 · 5 = 120}', XC, 760, P(t, T.fatt5 + .3, T.fatt5 + .8), 40);
  ctx.restore();
}

// 3 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Più termini, più lungo il tratto\nin cui il polinomio imita il {y:seno}.', W / 2, 290, { size: 68, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'grado 1', FORM[0], 'fra −0,39 e 0,39'], [960, 'grado 3', FORM[1], 'fra −1,04 e 1,04'], [1450, 'grado 5', FORM[2], 'fra −1,76 e 1,76']];
  pills.forEach(([x, testa, s, piede], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 535); ctx.scale(k, k); ctx.translate(-x, -535);
    card(ctx, x - 220, 445, 440, 180);
    txt(ctx, testa, x, 482, { size: 30, color: C.dim });
    drawRich(ctx, s, x, 535, { size: 40 });
    txt(ctx, piede, x, 590, { size: 30, color: C.g });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue le curve e la fascia che si allarga
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.2], ['traccia', 7.4, 8.2],                                                        // gli assi
    ['tono', T.seno + .2, T.seno + 1.6, [.7, .2, .2, .7, .9, .5, .5, .9, .7]], ['pop', T.seno + 1.3, .6],   // il seno, onda dopo onda
    ['traccia', T.retta + .3, T.retta + 1.3], ['tono', T.retta + .3, T.retta + 1.3, [0, .5, 1]], ['soffio', T.retta],   // la retta y = x
    ['tono', T.banda1 + .3, T.banda1 + 1.2, [.2, .3]], ['pop', T.banda1 + .6, .4],                   // la fascia, stretta
    ['traccia', T.uno1 + .3, T.uno1 + .9], ['pop', T.uno1 + .6, .7], ['pop', T.uno1 + .8, .6],        // x = 1: retta e seno
    ['tono', T.p3 + .3, T.p3 + 1.5, [.5, .35]], ['pop', T.p3 + .5, .55],                             // il grado 3 si piega
    ['tono', T.banda3 + .3, T.banda3 + 1.2, [.3, .5]], ['pop', T.banda3 + .6, .5],                   // la fascia si allarga
    ['pop', T.uno3 + .4, .62],                                                                        // 0,8333
    ['tono', T.p5 + .3, T.p5 + 1.5, [.4, .55]], ['pop', T.p5 + .5, .6],                              // il grado 5
    ['tono', T.banda5 + .3, T.banda5 + 1.2, [.5, .75]], ['ding', T.banda5 + .8],                     // ancora più larga
    ['pop', T.uno5 + .4, .64],                                                                        // 0,84167
    ['pop', T.fatt + .4, .5], ['pop', T.fatt5 + .4, .6],                                              // 3! e 5!
    ['traccia', T.lontano + .3, T.lontano + .8], ['pop', T.lontano + .5, .3],                        // lontano da 0 si stacca
    ['pop', T.nome + .4, .5], ['ding', T.nome + .8],                                                  // i polinomi di Taylor
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Polinomi che imitano il seno', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.2, T.p3 - .3, 'la retta tangente'], [T.p3 - .3, T.lontano - .3, 'un termine alla volta'], [T.lontano - .3, FINE, 'solo vicino a 0']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
