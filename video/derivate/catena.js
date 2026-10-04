'use strict';
/* La regola della catena: un piccolo spostamento passa per l'interna e per l'esterna, e i fattori si moltiplicano. Argomento: derivate. */
CVIDEO.registra('derivate/catena', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, txt, richW, ball, hole, arrowHead, card, crossMark } = M;

// Il capitolo 1 dura fino a 38,3; i capitoli 2 e 3 sono scritti nel loro tempo «locale» (da 25,6 a 85)
// e si spostano in avanti di D.
const D = 12.7, VFINE = 85.0, FINE = VFINE + D;
const sposta = l => l.map(([a, b, s]) => [a + D, b + D, s]);
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [2.0, 'pensa'], [6.6, 'neutro'],
  [7.9, 'neutro'], [14.2, 'felice'], [16.4, 'neutro'], [27.5, 'sorpreso'], [29.6, 'felice'], [34.1, 'festa'], [36.6, 'neutro'],
].concat([
  [34.6, 'sorpreso'], [37.6, 'felice'], [40.0, 'neutro'],
  [46.0, 'sorpreso'], [48.0, 'pensa'], [51.6, 'neutro'], [55.6, 'festa'], [58.4, 'felice'],
  [61.0, 'neutro'], [63.2, 'felice'], [66.1, 'pensa'], [72.7, 'neutro'], [76.6, 'felice'],
  [79.0, 'sorpreso'], [81.2, 'neutro'],
].map(([a, f]) => [a + D, f]), [
  [FINE, 'neutro'], [FINE + 2.2, 'felice'],
]);
const FUMETTI = [
  [2.0, 6.6, 'Come si deriva una funzione\nchiusa dentro un\'altra?'],
  [7.9, 14.1, 'In {mink:(x² + 1)³} prima calcoli\n{mv:x² + 1}, poi elevi al cubo.'],
  [14.2, 20.2, '{mv:g}, l\'{v:interna}, fa {mv:x² + 1}: quel\nche esce si chiama {mv:u}.'],
  [20.3, 25.4, '{my:f}, l\'{y:esterna}, fa il cubo\ndi {mv:u}: esce {my:y}.'],
  [27.5, 32.3, 'Con {mx:x} = 1, dentro\nesce {mv:u} = 2.'],
  [34.1, 38.0, 'E fuori esce {my:y} = 8.'],
].concat(sposta([
  [38.4 - D, 31.5, 'Guardo da vicino: {mx:x} si sposta\ndi poco, da 1 a 1,01.'],
  [31.6, 37.5, 'Allora {mv:u} si sposta circa\n{g:2 volte} tanto: da 2 a 2,02.'],
  [37.6, 42.0, 'È la derivata dell\'interna:\n{mv:g′(1) = 2}.'],
  [42.1, 48.2, 'E {my:y} si sposta circa\n{g:12 volte} tanto: da 8 a 8,24.'],
  [48.3, 54.9, 'È la derivata del cubo, ma in {mv:2}:\n{my:3}{mv:u}{my:²} con {mv:u} = 2 fa {my:12}.'],
  [55.0, 60.9, 'In tutto {my:y} si sposta circa\n{g:2 · 12 = 24} volte tanto.'],
  [61.0, 66.0, 'Ecco la regola: le due derivate\nsi {g:moltiplicano}.'],
  [66.1, 72.6, '{my:f′} si calcola in {mv:g(}{mx:x}{mv:)}: con {mx:x} = 1,\nin {mv:g(1) = 2}, {r:non} in 1.'],
  [72.7, 78.9, 'Per {mink:(x² + 1)³} viene\n{my:3(x² + 1)²} · {mv:2x}: in 1 fa {g:24}.'],
  [79.0, 84.6, 'Senza il fattore {mv:2x} verrebbe {r:12}:\nè l\'errore più comune.'],
]), [
  [FINE + 1.6, FINE + 8.2, 'Esterna per interna:\nle derivate si moltiplicano.'],
]);

// ---- aiutanti ----
function freccia(ctx, a, b, col, k = 1) {
  if (k <= 0) return;
  const e = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - 8, e[1]); ctx.stroke(); ctx.restore();
  arrowHead(ctx, e, Math.atan2(b[1] - a[1], b[0] - a[0]), col, 1.2);
}
// pezzi di formula uno dopo l'altro, centrati in cx; restituisce il centro di ogni pezzo
function pezzi(ctx, parti, cx, y, size, o = {}) {
  const ws = parti.map(s => richW(ctx, s, size));
  let x = cx - ws.reduce((a, b) => a + b, 0) / 2;
  return parti.map((s, i) => {
    drawRich(ctx, s, x, y, { size, align: 'left', alpha: o.alpha ?? 1, local: o.local });
    const c = x + ws[i] / 2; x += ws[i]; return [c, ws[i]];
  });
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La regola della catena', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1 · una dentro l'altra (7.5–38.3)
const NX = [460, 520], NU = [1150, 520], NY = [1730, 520], B1 = [805, 520, 400], B2 = [1440, 520, 300];
function scatola(ctx, b, nome, f, col, al, acceso) {
  const [cx, cy, w] = b, h = 160;
  card(ctx, cx - w / 2, cy - h / 2, w, h, al);
  if (acceso > 0) {
    ctx.save(); ctx.globalAlpha *= al * acceso; ctx.strokeStyle = css(col); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(cx - w / 2, cy - h / 2, w, h, 22); ctx.stroke(); ctx.restore();
  }
  txt(ctx, nome, cx, cy - 42, { size: 30, color: acceso > .5 ? col : C.dim, alpha: al });
  drawRich(ctx, f, cx, cy + 24, { size: 48, alpha: al });
}
function nodo(ctx, p, col, val, kv, nome, al) {
  ctx.save(); ctx.globalAlpha *= al;
  if (kv < 1) hole(ctx, p, col, 1 - kv, 30);
  if (kv > 0) ball(ctx, p[0], p[1], val, col, { r: 44, scale: P(kv, 0, 1, E.back) });
  drawRich(ctx, nome, p[0], p[1] + 84, { size: 48 });
  ctx.restore();
}
function sceneComposta(ctx, t) {
  if (t < 7.5 || t > 38.9) return;
  const al = 1 - P(t, 38.0, 38.6);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{my:y}{mink: = (}{mv:x² + 1}{mink:)³}', 1060, 245, { size: 84, local: t - 8.2 });
  const kd = P(t, 9.4, 10.2);
  const a1 = life(t, 14.4, 20.2, .4, .4), a2 = life(t, 20.5, 25.4, .4, .4);
  freccia(ctx, [NX[0] + 50, 520], [B1[0] - B1[2] / 2 - 10, 520], C.ink, P(t, 10.2, 10.7));
  freccia(ctx, [B1[0] + B1[2] / 2 + 10, 520], [NU[0] - 50, 520], C.ink, P(t, 10.8, 11.3));
  freccia(ctx, [NU[0] + 50, 520], [B2[0] - B2[2] / 2 - 10, 520], C.ink, P(t, 11.4, 11.9));
  freccia(ctx, [B2[0] + B2[2] / 2 + 10, 520], [NY[0] - 50, 520], C.ink, P(t, 12.0, 12.5));
  // le palline: 1 entra nell'interna e ne esce 2 (ferma durante il suo fumetto); poi 2 entra nell'esterna e ne esce 8
  const v1 = P(t, 25.5, 25.9), v2 = P(t, 27.3, 27.7), v3 = P(t, 33.9, 34.3);
  nodo(ctx, NX, C.x, '1', v1, '{mx:x}', kd);
  nodo(ctx, NU, C.v, '2', v2, '{mv:u}', P(t, 10.8, 11.4));
  nodo(ctx, NY, C.y, '8', v3, '{my:y}', P(t, 12.0, 12.6));
  const viaggio = (a, b, t0, val, col) => {
    const k = P(t, t0, t0 + .9);
    if (k <= 0 || k >= 1) return;
    ball(ctx, lerp(a[0], b[0], k), lerp(a[1], b[1], k), val, col, { r: 40, scale: 1 - P(k, .7, 1) });
  };
  viaggio(NX, [B1[0], 520], 25.9, '1', C.x);
  viaggio([B1[0], 520], NU, 26.6, '2', C.v);
  viaggio(NU, [B2[0], 520], 32.5, '2', C.v);
  viaggio([B2[0], 520], NY, 33.2, '8', C.y);
  scatola(ctx, B1, 'interna', '{mv:g(}{mx:x}{mv:) = x² + 1}', C.v, P(t, 10.4, 11.0), a1);
  scatola(ctx, B2, 'esterna', '{my:f(}{mv:u}{my:) = }{mv:u}{my:³}', C.y, P(t, 11.6, 12.2), a2);
  ctx.restore();
}

// 2 · la lente: tre righelli con la stessa scala (tempo locale 25,6–60,6)
const X0 = 520, SC = 4000;   // pixel per unità: 0,01 → 40 px
const RIGHE = [
  { y: 250, nome: '{mx:x}', base: '1', fine: '1,01', d: .01, t0: 27.6, dur: .8, val: '{mx:Δx}{mink: = 0,01}' },
  { y: 450, nome: '{mv:u}', base: '2', fine: '2,02', d: 1.01 * 1.01 + 1 - 2, t0: 31.7, dur: .9, val: '{mv:Δu}{mink: ≈ 0,02}' },
  { y: 650, nome: '{my:y}', base: '8', fine: '8,24', d: Math.pow(1.01 * 1.01 + 1, 3) - 8, t0: 43.0, dur: 1.8, val: '{my:Δy}{mink: ≈ 0,24}' },
];
function sceneLente(ctx, t) {
  if (t < 25.4 || t > 61.2) return;
  const al = life(t, 25.8, 60.8, .5, .6);
  ctx.save(); ctx.globalAlpha *= al;
  RIGHE.forEach((R, i) => {
    const kr = P(t, 26.0 + i * .3, 26.6 + i * .3);
    if (kr <= 0) return;
    ctx.save(); ctx.globalAlpha *= kr;
    drawRich(ctx, R.nome, 380, R.y, { size: 54 });
    ctx.strokeStyle = css(C.ink, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(440, R.y); ctx.lineTo(1500, R.y); ctx.stroke();
    ctx.lineWidth = 2; ctx.strokeStyle = css(C.dim, .7);
    for (let x = X0 - 80; x <= 1500; x += 40) { ctx.beginPath(); ctx.moveTo(x, R.y - 9); ctx.lineTo(x, R.y + 9); ctx.stroke(); }
    ctx.restore();
    const kc = [C.x, C.v, C.y][i];   // C cambia col tema: si legge a ogni fotogramma
    const k = P(t, R.t0, R.t0 + R.dur, E.io), L = R.d * SC * k;
    if (k > 0) {
      ctx.save(); ctx.strokeStyle = css(kc); ctx.lineWidth = 14; ctx.lineCap = 'round';
      ctx.shadowColor = css(kc, .6); ctx.shadowBlur = 16 * C.glow;
      ctx.beginPath(); ctx.moveTo(X0, R.y); ctx.lineTo(X0 + L, R.y); ctx.stroke(); ctx.restore();
    }
    M.dot(ctx, [X0, R.y], C.ink, kr, 10);
    txt(ctx, R.base, X0, R.y + 44, { size: 36, weight: 600, alpha: kr });
    const kf2 = P(t, R.t0 + R.dur, R.t0 + R.dur + .4);
    if (kf2 > 0) { M.dot(ctx, [X0 + L, R.y], kc, kf2, 9); txt(ctx, R.fine, X0 + L, R.y - 44, { size: 36, weight: 600, color: kc, alpha: kf2 }); }
    drawRich(ctx, R.val, 1545, R.y, { size: 40, align: 'left', alpha: P(t, R.t0 + R.dur + .4, R.t0 + R.dur + .9) });
  });
  // la prima volta che compare un Δ, si dice che cosa vuol dire
  drawRich(ctx, '{mink:Δ}{dim: = di quanto si sposta}', 1790, 175, { size: 30, align: 'right', alpha: P(t, 28.6, 29.1) });
  // i fattori fra una riga e l'altra
  const fattore = (s, s2, y, t1, t2) => {
    drawRich(ctx, s, 1535, y, { size: 38, align: 'left', local: t - t1 });
    drawRich(ctx, s2, 1535 + richW(ctx, s, 38) + 10, y, { size: 34, align: 'left', local: t - t2 });
  };
  fattore('{g:2 volte}', '{mink:= }{mv:g′(1)}', 350, 34.6, 38.0);
  fattore('{g:12 volte}', '{mink:= }{my:f′(}{mv:2}{my:)}', 550, 46.0, 49.0);
  drawRich(ctx, 'in tutto {g:2 · 12 = 24} volte', 1060, 748, { size: 46, local: t - 55.6 });
  ctx.restore();
}

// 3 · la regola (tempo locale 60,6–85)
function sceneRegola(ctx, t) {
  if (t < 60.4 || t > VFINE + .2) return;
  const al = life(t, 60.8, VFINE, .6, .6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'la regola della catena', 1060, 190, { size: 42, weight: 600 }));
  const c = pezzi(ctx, ['{mink:[f(}{mv:g(}{mx:x}{mv:)}{mink:)]′ = }', '{my:f′(}{mv:g(}{mx:x}{mv:)}{my:)}', '{mink: · }', '{mv:g′(}{mx:x}{mv:)}'], 1060, 305, 62, { local: t - 61.2 });
  const kl = P(t, 62.6, 63.2);
  drawRich(ctx, '{y:esterna}', c[1][0], 388, { size: 32, alpha: kl });
  drawRich(ctx, '{v:interna}', c[3][0], 388, { size: 32, alpha: kl });
  // «in g(x), non in x»: si sottolinea g(x) dentro f′
  const ks = life(t, 66.4, 72.6, .5, .4);
  if (ks > 0) {
    const w = richW(ctx, '{mv:g(}{mx:x}{mv:)}', 62), x0 = c[1][0] - c[1][1] / 2 + richW(ctx, '{my:f′(}', 62);
    ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = css(C.v); ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, 345); ctx.lineTo(x0 + w, 345); ctx.stroke(); ctx.restore();
  }
  ctx.save(); ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.globalAlpha *= P(t, 72.8, 73.3);
  ctx.beginPath(); ctx.moveTo(420, 445); ctx.lineTo(1700, 445); ctx.stroke(); ctx.restore();
  drawRich(ctx, '{mink:[(}{mv:x² + 1}{mink:)³]′ = }{my:3(}{mv:x² + 1}{my:)²}{mink: · }{mv:2x}', 1060, 525, { size: 54, local: t - 73.0 });
  drawRich(ctx, 'in {mx:x}{mink: = 1:   }{my:12}{mink: · }{mv:2}{mink: = }{g:24}', 1060, 625, { size: 54, local: t - 76.2 });
  drawRich(ctx, 'senza il fattore {mv:2x} verrebbe {r:12}', 1000, 728, { size: 40, local: t - 79.4 });
  crossMark(ctx, 1500, 728, P(t, 80.6, 81.4), C.r, .34);
  ctx.restore();
}

function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  card(ctx, 300, 120, 1520, 680, life(t, 7.5, FINE, .6, .6));
}

// 4 · in una frase
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 9.1, FINE + 10.1);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Le derivate in catena\nsi {g:moltiplicano}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [960, 470, 1110, 'derivata dell\'{y:esterna}{mink:  ·  }derivata dell\'{v:interna}', 0],
    [960, 604, 850, 'l\'esterna si calcola in {mv:g(}{mx:x}{mv:)}, non in {mx:x}', .6],
  ];
  pills.forEach(([x, y, w, s, d]) => {
    const a = FINE + 2.6 + d, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y);
    card(ctx, x - w / 2, y - 52, w, 104);
    drawRich(ctx, s, x, y + 2, { size: 40, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'La regola della catena', durata: FINE + 11, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 38.3, 'una dentro l\'altra'], [38.3, 60.6 + D, 'da vicino'], [60.6 + D, FINE, 'la regola']],
    scena(ctx, t) {
      sceneIntro(ctx, t); sceneScheda(ctx, t); sceneComposta(ctx, t);
      sceneLente(ctx, t - D); sceneRegola(ctx, t - D); sceneFine(ctx, t);
    },
  };
});
