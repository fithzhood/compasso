'use strict';
/* Il teorema dei seni — triangolo ABC (α = 50°, β = 60°, γ = 70°) nella sua circonferenza circoscritta di raggio R.
   A scorre sull'arco fino ad A′, opposto a B: l'angolo resta α (angoli alla circonferenza sulla stessa corda),
   BA′ è un diametro, BCA′ è rettangolo in C, quindi a = 2R · sin α, cioè a / sin α = 2R; lo stesso per b e c.
   Lettere come il sito: a opposto ad α, b a β, c a γ. Argomento: trigonometria. */
CVIDEO.registra('trigonometria/seni', M => {
  const { W, C, E, P, kf, lerp, css, TITOLI, conFont, drawRich, drawSeq, richW, dot, card } = M;

const SEQ = [
  ['tri', 4.8, 'Un triangolo {mink:ABC}: il lato {mx:a} sta\ndi fronte all’angolo {mx:α} in {mink:A}.'],
  ['altri', 5.3, 'Allo stesso modo {my:b} sta di fronte a {my:β},\ne {mv:c} di fronte a {mv:γ}.'],
  ['circ', 4.0, 'Disegno la {g:circonferenza circoscritta}:\npassa per i tre vertici.'],
  ['R', 4.0, 'Il suo centro è {mink:O}, il raggio è {mg:R}.'],
  ['corda', 5.8, 'Il lato {mx:a} è una corda, e {mx:α} è un angolo\nalla circonferenza che insiste su {mx:a}.'],
  ['sposto', 4.4, 'Sposto {mink:A} lungo l’arco: l’angolo\nresta {mx:α}.'],
  ['diam', 4.4, 'Lo fermo in {mink:A′}, dove {mink:BA′} è\nun {g:diametro}: lungo {mg:2R}.'],
  ['retto', 4.6, 'L’angolo in {mink:C} è retto: {mink:BCA′} è\ninscritto in una semicirconferenza.'],
  ['cat', 4.6, 'Il lato {mx:a} è il cateto opposto ad {mx:α}:\n{mx:a}{mink: = }{mg:2R}{mink: · sin α}.'],
  ['div', 3.6, 'Divido per {mink:sin α}:\n{mx:a} diviso {mink:sin α = }{mg:2R}.'],
  ['bc', 4.8, 'Con {my:b} e {mv:c} il conto è identico:\nogni rapporto vale {mg:2R}.'],
  ['teo', 4.8, 'È il {v:teorema dei seni}: lato diviso\nseno dell’angolo opposto, sempre {mg:2R}.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Che legame c’è fra un lato\ne l’angolo opposto?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'In ogni triangolo, lato diviso seno\ndell’angolo opposto dà sempre {mg:2R}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.circ, 'felice'], [T.circ + 2.2, 'neutro'], [T.sposto, 'sorpreso'], [T.sposto + 2.2, 'neutro'],
  [T.retto, 'pensa'], [T.cat, 'felice'], [T.cat + 2.4, 'neutro'], [T.teo, 'festa'], [T.teo + 2.6, 'felice'],
  [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];

// la circonferenza circoscritta: centro O, raggio RR; i vertici per angolo (gradi, verso antiorario)
const RAD = Math.PI / 180, O = [520, 455], RR = 275;
const Pc = (th, r = RR) => [O[0] + r * Math.cos(th * RAD), O[1] - r * Math.sin(th * RAD)];
const TA = 80, TB = 220, TC = 320, TA2 = 40;                // archi: BC = 100° = 2α, CA = 120° = 2β, AB = 140° = 2γ
const VA = Pc(TA), VB = Pc(TB), VCc = Pc(TC), VA2 = Pc(TA2);   // A′ = opposto a B
const thV = t => kf(t, [[T.sposto + .5, TA], [T.sposto + 2.9, TA2]]);
function seg(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// l'angolo in V fra le direzioni verso P1 e P2: arco, spicchio, e il punto dove va l'etichetta
function angolo(ctx, V, P1, P2, r, col, al, rl = r + 34) {
  const a1 = Math.atan2(P1[1] - V[1], P1[0] - V[0]), a2 = Math.atan2(P2[1] - V[1], P2[0] - V[0]);
  let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI;
  if (al > 0) {
    ctx.save(); ctx.globalAlpha *= al;
    ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], r, a1, a1 + d, d < 0); ctx.closePath(); ctx.fillStyle = css(col, .18); ctx.fill();
    ctx.beginPath(); ctx.arc(V[0], V[1], r, a1, a1 + d, d < 0); ctx.strokeStyle = css(col); ctx.lineWidth = 3.5; ctx.stroke();
    ctx.restore();
  }
  const m = a1 + d / 2;
  return { p: [V[0] + rl * Math.cos(m), V[1] + rl * Math.sin(m)], gradi: Math.abs(d) / RAD, a: r2 => [V[0] + r2 * Math.cos(m), V[1] + r2 * Math.sin(m)] };
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };
// etichetta su un fondino della carta: la traccia del triangolo di partenza non la attraversa
function targa(ctx, s, p, al, size = 44) {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 16;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(p[0] - w / 2, p[1] - size * .6, w, size * 1.2, 10); ctx.fill(); ctx.restore();
  drawRich(ctx, s, p[0], p[1], { size, alpha: al });
}
// nome di un vertice, fuori dalla circonferenza
const nome = (ctx, s, th, al) => lab(ctx, '{mink:' + s + '}', Pc(th, RR + 40), al, 44);
// punto a distanza d dalla metà di PQ, dalla parte opposta al centro O
function fuori(Pp, Q, d) {
  const mx = (Pp[0] + Q[0]) / 2, my = (Pp[1] + Q[1]) / 2, dx = Q[0] - Pp[0], dy = Q[1] - Pp[1], L = Math.hypot(dx, dy);
  let nx = dy / L, ny = -dx / L;
  if ((O[0] - mx) * nx + (O[1] - my) * ny > 0) { nx = -nx; ny = -ny; }
  return [mx + nx * d, my + ny * d];
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il teorema dei seni', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const via = P(t, T.sposto, T.sposto + .4), torna = P(t, T.bc, T.bc + .5);
  const kOrig = 1 - .7 * via + .7 * torna;                    // il triangolo ABC: pieno, poi in traccia, poi di nuovo pieno
  const kAltri = P(t, T.altri + .3, T.altri + .7) * (1 - via) + torna;
  const kMob = P(t, T.sposto, T.sposto + .3) * (1 - torna);   // il vertice che scorre e il triangolo BCA′
  // la circonferenza
  const kc = P(t, T.circ + .2, T.circ + 1.5, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.g, .85); ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.arc(O[0], O[1], RR, -TB * RAD, -TB * RAD + 2 * Math.PI * kc); ctx.stroke(); ctx.restore();
  }
  // il raggio R e il centro O
  const kR = P(t, T.R + .3, T.R + .8);
  seg(ctx, O, Pc(190), C.g, 3.5, kR, .9);
  lab(ctx, '{mg:R}', [Pc(190, RR * .62)[0] - 6, Pc(190, RR * .62)[1] - 44], P(t, T.R + .7, T.R + 1.1));
  dot(ctx, O, C.ink, P(t, T.R + .2, T.R + .5, E.back), 7);
  lab(ctx, '{mink:O}', [O[0] + 30, O[1] + 26], P(t, T.R + .3, T.R + .7), 40);

  // il triangolo ABC
  const kd = [P(t, 7.9, 8.5), P(t, 8.3, 8.9), P(t, 8.7, 9.3)];
  ctx.save(); ctx.globalAlpha *= kOrig;
  if (kd[2] > 0) {
    ctx.save(); ctx.globalAlpha *= .07 * kd[2]; ctx.fillStyle = css(C.v);
    ctx.beginPath(); ctx.moveTo(...VA); ctx.lineTo(...VB); ctx.lineTo(...VCc); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  seg(ctx, VB, VCc, C.x, 6, kd[0]);
  seg(ctx, VCc, VA, C.y, 5, kd[1]);
  seg(ctx, VA, VB, C.v, 5, kd[2]);
  ctx.restore();
  // angoli e lati di ABC
  const kAl = P(t, T.tri + .4, T.tri + .8);
  const angA = angolo(ctx, VA, VB, VCc, 48, C.x, kAl * (1 - via) + torna, 84);
  lab(ctx, '{mx:α}', angA.p, kAl * (1 - via) + torna, 42);
  const angB = angolo(ctx, VB, VCc, VA, 48, C.y, kAltri, 84);
  lab(ctx, '{my:β}', angB.p, kAltri, 42);
  const angC = angolo(ctx, VCc, VA, VB, 48, C.v, kAltri, 84);
  lab(ctx, '{mv:γ}', angC.p, kAltri, 42);
  lab(ctx, '{mx:a}', [(VB[0] + VCc[0]) / 2, VB[1] + 42], P(t, T.tri + .3, T.tri + .7), 46);
  lab(ctx, '{my:b}', fuori(VCc, VA, 34), kAltri, 46);
  lab(ctx, '{mv:c}', fuori(VA, VB, 34), kAltri, 46);
  // i nomi dei vertici
  const kN = P(t, 9.0, 9.4);
  nome(ctx, 'B', TB, kN); nome(ctx, 'C', TC, kN);
  nome(ctx, 'A', TA, kN * (1 - via) + torna);

  // il vertice che scorre sull'arco, fino ad A′
  if (kMob > 0) {
    const th = thV(t), V = Pc(th);
    ctx.save(); ctx.globalAlpha *= kMob;
    const kTri = P(t, T.retto + .3, T.retto + .8);
    if (kTri > 0) {
      ctx.save(); ctx.globalAlpha *= .12 * kTri; ctx.fillStyle = css(C.g);
      ctx.beginPath(); ctx.moveTo(...VA2); ctx.lineTo(...VB); ctx.lineTo(...VCc); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    seg(ctx, V, VB, C.ink, 4);
    seg(ctx, V, VCc, C.ink, 4);
    seg(ctx, VB, VCc, C.x, 6);
    const ang = angolo(ctx, V, VB, VCc, 48, C.x, 1, 84);
    targa(ctx, '{mx:α}', ang.p, 1, 42);
    targa(ctx, '{x:' + Math.round(ang.gradi) + '°}', ang.a(134), 1, 44);
    dot(ctx, V, C.ink, 1, 8);
    const kNome = P(t, T.diam + .1, T.diam + .4);
    lab(ctx, '{mink:A}', Pc(th, RR + 40), 1 - kNome, 44);
    lab(ctx, '{mink:A′}', Pc(th, RR + 44), kNome, 44);
    // il diametro BA′
    const kDi = P(t, T.diam + .4, T.diam + 1.2);
    if (kDi > 0) {
      ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(...VB); ctx.lineTo(lerp(VB[0], VA2[0], kDi), lerp(VB[1], VA2[1], kDi)); ctx.stroke(); ctx.restore();
    }
    const dx = VA2[0] - VB[0], dy = VA2[1] - VB[1], L = Math.hypot(dx, dy);
    lab(ctx, '{mg:2R}', [VB[0] + dx * .3 - dy / L * 52, VB[1] + dy * .3 + dx / L * 52], P(t, T.diam + 1.1, T.diam + 1.5), 44);
    // l'angolo retto in C
    if (kTri > 0) {
      ctx.save(); ctx.globalAlpha *= kTri; ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(VCc[0] - 26, VCc[1]); ctx.lineTo(VCc[0] - 26, VCc[1] - 26); ctx.lineTo(VCc[0], VCc[1] - 26); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  dot(ctx, VB, C.ink, kN, 7); dot(ctx, VCc, C.ink, kN, 7);
  ctx.restore();
}

const XP = 1450;
const fr = (n, d) => ({ num: n, den: d });
const RAPP = [fr('{mx:a}', '{mink:sin }{mx:α}'), '{mink: = }', fr('{my:b}', '{mink:sin }{my:β}'), '{mink: = }', fr('{mv:c}', '{mink:sin }{mv:γ}'), '{mink: = }', '{mg:2R}'];
// la scheda a destra: dal cateto al rapporto, poi il teorema
function scenePannello(ctx, t) {
  if (t < T.tri || t > FINE + .2) return;
  const la = P(t, T.tri + .2, T.tri + .6) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  // prima parte: le coppie lato-angolo opposto, il raggio, l'angolo che resta uguale
  const kPrima = 1 - P(t, T.cat - .1, T.cat + .3);
  if (kPrima > 0) {
    ctx.save(); ctx.globalAlpha *= kPrima;
    conFont(TITOLI, () => drawRich(ctx, 'lato e angolo opposto', XP, 175, { size: 40, weight: 600 }));
    drawRich(ctx, '{mx:a}{ink:  di fronte ad  }{mx:α}', XP, 260, { size: 44, local: t - T.tri - .4 });
    drawRich(ctx, '{my:b}{ink:  di fronte a  }{my:β}', XP, 330, { size: 44, local: t - T.altri - .4 });
    drawRich(ctx, '{mv:c}{ink:  di fronte a  }{mv:γ}', XP, 400, { size: 44, local: t - T.altri - .9 });
    drawRich(ctx, '{ink:raggio della circonferenza: }{mg:R}', XP, 500, { size: 40, local: t - T.R - .6 });    ctx.restore();
  }
  if (t < T.cat) { ctx.restore(); return; }
  drawRich(ctx, '{dim:cateto = ipotenusa · seno dell’opposto}', XP, 170, { size: 30, local: t - T.cat - .4 });
  drawRich(ctx, '{mx:a}{mink: = }{mg:2R}{mink: · sin }{mx:α}', XP, 236, { size: 50, local: t - T.cat - .6 });
  drawSeq(ctx, [fr('{mx:a}', '{mink:sin }{mx:α}'), '{mink: = }', '{mg:2R}'], XP, 360, 48, { local: t - T.div - .3 });
  drawSeq(ctx, [fr('{my:b}', '{mink:sin }{my:β}'), '{mink: = }', '{mg:2R}'], 1250, 500, 46, { local: t - T.bc - .4 });
  drawSeq(ctx, [fr('{mv:c}', '{mink:sin }{mv:γ}'), '{mink: = }', '{mg:2R}'], 1650, 500, 46, { local: t - T.bc - 1.2 });
  const kt = P(t, T.teo + .3, T.teo + .8);
  if (kt > 0) {
    ctx.save(); ctx.globalAlpha *= kt; ctx.strokeStyle = css(C.v, .75); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(XP - 370, 598, 740, 150, 18); ctx.stroke(); ctx.restore();
    drawSeq(ctx, RAPP, XP, 668, 46, { local: t - T.teo - .4 });
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un lato diviso il seno dell’angolo opposto\ndà lo stesso numero per tutti e tre i lati.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[380, 640, null], [1010, 380, 'ogni lato è una\n{g:corda}'], [1500, 480, 'il rapporto è {mg:2R},\nil {g:diametro}']];
  pills.forEach(([px, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - w / 2, 445, w, 150);
    if (s) drawRich(ctx, s, px, 520, { size: 34, lh: 1.35 });
    else drawSeq(ctx, RAPP, px, 520, 40);
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il teorema dei seni', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.circ - .1, 'lati e angoli opposti'], [T.circ - .1, T.cat - .1, 'la circonferenza circoscritta'],
      [T.cat - .1, FINE, 'il rapporto è {mink:2R}']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
