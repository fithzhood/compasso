'use strict';
/* L’angolo che non cambia — circonferenza di centro O, A e B con l'angolo al centro di 100°: il vertice C scorre
   sull'arco grande e l'angolo alla circonferenza resta 50°, la metà; poi la corda AB si allarga fino al diametro:
   l'angolo al centro diventa piatto e quello in C retto, ovunque sia C. Nomi degli angoli come nel sito (A\widehat{O}B).
   Argomento: geometria-piano-2 (oggi la teoria sta in geometria-euclidea, § circonferenza). */
CVIDEO.registra('geometria-piano-2/angolo-alla-circonferenza', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, richW, txt, fixedNum, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['circ', 4.6, 'Una circonferenza di centro {mink:O},\ne due suoi punti, {mink:A} e {mink:B}.'],
  ['centro', 5.0, 'Unisco {mink:A} e {mink:B} con {mink:O}: è un\n{v:angolo al centro}, di {v:100°}.'],
  ['arco', 4.4, 'Insiste sull’{x:arco} {mink:AB}, quello\ndentro l’angolo.'],
  ['C', 5.0, 'Ora un punto {mink:C} sull’arco grande:\nl’{y:angolo alla circonferenza} in {mink:C}.'],
  ['stesso', 4.0, 'Anche lui insiste\nsull’arco {mink:AB}.'],
  ['meta', 4.6, 'Misura {y:50°}: proprio la {g:metà}\ndi {v:100°}.'],
  ['sposto', 4.6, 'Sposto {mink:C} lungo l’arco grande…'],
  ['resta', 4.6, '…e l’angolo resta {y:50°}: non\ndipende da dove sta {mink:C}.'],
  ['doppio', 5.4, 'L’angolo in {mink:C} è la {g:metà} di quello al\ncentro che insiste sullo stesso arco.'],
  ['allargo', 5.0, 'Ora allargo {mink:AB}: l’angolo al centro\ncresce, e quello in {mink:C} con lui.', .3],
  ['diam', 5.4, 'Quando {mink:AB} è un {g:diametro}, l’angolo\nal centro è {v:piatto}: {v:180°}.'],
  ['retto', 4.6, 'La metà di {v:180°} è {g:90°}:\nl’angolo in {mink:C} è {g:retto}.'],
  ['semi', 5.0, 'Sposto {mink:C} sulla semicirconferenza:\nl’angolo resta {g:retto}.'],
  ['rett', 5.0, 'Il triangolo {mink:ABC}, inscritto in una\nsemicirconferenza, è {g:rettangolo}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Un angolo con il vertice sulla\ncirconferenza: quanto misura?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'L’angolo alla circonferenza è la {g:metà}\ndi quello al centro sullo stesso arco.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.meta, 'felice'], [T.meta + 2.2, 'neutro'], [T.resta, 'sorpreso'], [T.resta + 2.2, 'neutro'],
  [T.doppio, 'felice'], [T.doppio + 2.4, 'neutro'], [T.diam, 'sorpreso'], [T.diam + 2.4, 'neutro'],
  [T.retto, 'festa'], [T.retto + 2.4, 'felice'], [T.semi, 'neutro'], [T.rett, 'felice'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// la circonferenza: centro O, raggio R; i punti per angolo in gradi (antiorario, da destra)
const RAD = Math.PI / 180, O = [520, 462], R = 275;
const Pc = (g, r = R) => [O[0] + r * Math.cos(g * RAD), O[1] - r * Math.sin(g * RAD)];
// l'angolo al centro cresce a gradi pari: così quello in C, la metà, è sempre un intero esatto
const centrale = t => 100 + 2 * Math.round(40 * P(t, T.allargo + .4, T.allargo + 3.6, E.io));
const gA = t => 270 - centrale(t) / 2, gB = t => 270 + centrale(t) / 2;
// il vertice C: si muove solo quando Ada lo sposta; resta fra 50° e 130°, così le corde non passano mai sotto O
const gC = t => kf(t, [[T.sposto + .3, 90], [T.sposto + 2.1, 55], [T.sposto + 4.3, 125], [T.semi + .3, 125], [T.semi + 2.2, 60], [T.semi + 4.4, 105]]);
function seg(ctx, a, b, col, w = 4, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// l'angolo in V fra le direzioni verso P1 e P2 (il più piccolo dei due): apertura in gradi e direzioni
function angoloIn(V, P1, P2) {
  const a1 = Math.atan2(P1[1] - V[1], P1[0] - V[0]); let d = Math.atan2(P2[1] - V[1], P2[0] - V[0]) - a1;
  while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI;
  return { a1, d, gradi: Math.abs(d) / RAD, bis: a1 + d / 2 };
}
// nome di un angolo con il cappello sulla lettera di mezzo, come A\widehat{O}B nel sito; restituisce la larghezza
function angH(ctx, s, x, y, size, al = 1, align = 'left') {
  const str = '{mink:' + s + '}';
  const w = richW(ctx, str, size), w0 = richW(ctx, '{mink:' + s[0] + '}', size), w1 = richW(ctx, '{mink:' + s[1] + '}', size);
  if (al <= 0) return w;
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  drawRich(ctx, str, x0, y, { size, alpha: al, align: 'left' });
  const mx = x0 + w0 + w1 / 2 + size * .05, hy = y - size * .5;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2, size * .05); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(mx - size * .24, hy); ctx.lineTo(mx, hy - size * .17); ctx.lineTo(mx + size * .24, hy); ctx.stroke(); ctx.restore();
  return w;
}
// «AÔB = 2 · AĈB», centrata in x
function relazione(ctx, x, y, size, al = 1) {
  const wU = richW(ctx, '{mink: = 2 · }', size), wA = richW(ctx, '{mink:AOB}', size), wB = richW(ctx, '{mink:ACB}', size);
  let x0 = x - (wA + wU + wB) / 2;
  x0 += angH(ctx, 'AOB', x0, y, size, al);
  drawRich(ctx, '{mink: = 2 · }', x0, y, { size, align: 'left', alpha: al }); x0 += wU;
  angH(ctx, 'ACB', x0, y, size, al);
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’angolo che non cambia', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const c = centrale(t), a = gA(t), b = gB(t), A = Pc(a), B = Pc(b);
  // la circonferenza
  const kc = P(t, T.circ + .2, T.circ + 1.5, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.arc(O[0], O[1], R, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * kc); ctx.stroke(); ctx.restore();
  }
  // l'arco AB su cui insistono i due angoli (quello dentro l'angolo al centro)
  const kArc = P(t, T.arco + .3, T.arco + 1.3), pulse = life(t, T.stesso + .2, T.stesso + 4.0, .3, .4);
  if (kArc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.x, .85); ctx.lineWidth = 9 + 5 * pulse; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(O[0], O[1], R, -a * RAD, -(a + (b - a) * kArc) * RAD, true); ctx.stroke(); ctx.restore();
  }
  // l'angolo al centro: i due raggi e lo spicchio dalla parte dell'arco AB
  const kR = P(t, T.centro + .3, T.centro + 1.0), kW = P(t, T.centro + 1.1, T.centro + 1.6);
  if (kW > 0) {
    ctx.save(); ctx.globalAlpha *= kW;
    ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.arc(O[0], O[1], 86, -b * RAD, -a * RAD, false); ctx.closePath(); ctx.fillStyle = css(C.v, .16); ctx.fill();
    ctx.beginPath(); ctx.arc(O[0], O[1], 86, -b * RAD, -a * RAD, false); ctx.strokeStyle = css(C.v); ctx.lineWidth = 3.5; ctx.stroke();
    ctx.restore();
  }
  seg(ctx, O, A, C.v, 4, kR); seg(ctx, O, B, C.v, 4, kR);
  lab(ctx, '{v:' + c + '°}', Pc(270, 128), P(t, T.centro + 1.4, T.centro + 1.8));
  // il diametro, quando AB lo diventa
  const kD = life(t, T.diam + .3, FINE, .4, .4) * (c === 180 ? 1 : 0);
  seg(ctx, A, B, C.g, 6, 1, kD);
  // il vertice C, le due corde e l'angolo alla circonferenza
  const g = gC(t), V = Pc(g), kCh = P(t, T.C + .8, T.C + 1.6);
  const kT = P(t, T.rett + .3, T.rett + .9);   // il triangolo rettangolo ABC
  if (kT > 0) { ctx.save(); ctx.fillStyle = css(C.g, .12 * kT); ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...B); ctx.lineTo(...V); ctx.closePath(); ctx.fill(); ctx.restore(); }
  seg(ctx, V, A, C.y, 4, kCh); seg(ctx, V, B, C.y, 4, kCh);
  const an = angoloIn(V, A, B), kI = P(t, T.C + 1.6, T.C + 2.1), kQ = P(t, T.retto + .2, T.retto + .7) * (c === 180 ? 1 : 0);
  if (kI > 0) {
    ctx.save(); ctx.globalAlpha *= kI * (1 - kQ);
    ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], 66, an.a1, an.a1 + an.d, an.d < 0); ctx.closePath(); ctx.fillStyle = css(C.y, .2); ctx.fill();
    ctx.beginPath(); ctx.arc(V[0], V[1], 66, an.a1, an.a1 + an.d, an.d < 0); ctx.strokeStyle = css(C.y); ctx.lineWidth = 3.5; ctx.stroke();
    ctx.restore();
  }
  if (kQ > 0) {   // l'angolo retto: il quadratino
    const u = [Math.cos(an.a1) * 34, Math.sin(an.a1) * 34], w = [Math.cos(an.a1 + an.d) * 34, Math.sin(an.a1 + an.d) * 34];
    ctx.save(); ctx.globalAlpha *= kQ; ctx.fillStyle = css(C.g, .2); ctx.strokeStyle = css(C.g); ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.lineTo(V[0] + u[0], V[1] + u[1]); ctx.lineTo(V[0] + u[0] + w[0], V[1] + u[1] + w[1]); ctx.lineTo(V[0] + w[0], V[1] + w[1]); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  const ins = Math.round(an.gradi);
  lab(ctx, '{' + (kQ > .5 ? 'g' : 'y') + ':' + ins + '°}', [V[0] + Math.cos(an.bis) * 138, V[1] + Math.sin(an.bis) * 138], P(t, T.meta + .3, T.meta + .7));
  // i punti e i loro nomi
  dot(ctx, O, C.ink, P(t, T.circ + .4, T.circ + .7, E.back), 7);
  lab(ctx, '{mink:O}', [O[0], O[1] + 36], P(t, T.circ + .5, T.circ + .9), 40);
  const kAB = P(t, T.circ + 2.0, T.circ + 2.4, E.back);
  dot(ctx, A, C.ink, kAB, 8); dot(ctx, B, C.ink, kAB, 8);
  lab(ctx, '{mink:A}', Pc(a, R + 42), P(t, T.circ + 2.1, T.circ + 2.5));
  lab(ctx, '{mink:B}', Pc(b, R + 42), P(t, T.circ + 2.6, T.circ + 3.0));
  dot(ctx, V, C.ink, P(t, T.C + .3, T.C + .6, E.back), 8);
  lab(ctx, '{mink:C}', Pc(g, R + 42), P(t, T.C + .4, T.C + .8));
  ctx.restore();
}

// la scheda a destra: i due angoli, e il legame fra loro
const XL = 1100;
function riga(ctx, nome, y, n, col, al, dopo) {   // col: chiave del colore (v, y, g)
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  txt(ctx, nome, XL, y - 62, { size: 32, color: C.dim, align: 'left' });
  let x = XL + angH(ctx, dopo, XL, y, 50);
  drawRich(ctx, '{mink: = }', x, y, { size: 50, align: 'left' });
  if (n != null) { fixedNum(ctx, String(n), 1500, y, 50, C[col]); drawRich(ctx, '{' + col + ':°}', 1499, y - 2, { size: 50, align: 'left' }); }
  else drawRich(ctx, '{dim:?}', 1500, y, { size: 50, align: 'right' });   // la misura arriva quando Ada la dice
  ctx.restore();
}
function scenePannello(ctx, t) {
  if (t < T.centro || t > FINE + .2) return;
  const la = P(t, T.centro, T.centro + .5) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'gli angoli', 1450, 172, { size: 40, weight: 600 }));
  const c = centrale(t), kQ = P(t, T.retto + .2, T.retto + .7);
  riga(ctx, 'angolo al centro', 320, P(t, T.centro + 1.4, T.centro + 1.8) > 0 ? c : null, 'v', P(t, T.centro + .5, T.centro + .9), 'AOB');
  const kN = P(t, T.meta + .3, T.meta + .7);
  riga(ctx, 'angolo alla circonferenza', 480, kN > 0 ? c / 2 : null, kQ > .5 ? 'g' : 'y', P(t, T.C + .5, T.C + .9), 'ACB');
  if (kQ > 0) drawRich(ctx, '{g:retto}', 1800, 480, { size: 40, align: 'right', alpha: kQ });
  const kB = P(t, T.doppio + .4, T.doppio + .9);
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(1450 - 290, 600, 580, 110, 18); ctx.stroke(); ctx.restore();
    relazione(ctx, 1450, 655, 50, kB);
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L’angolo alla circonferenza è la metà dell’angolo\nal centro che insiste sullo stesso arco.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, 500, null], [980, 420, 'il vertice si muove,\nl’angolo {g:no}'], [1460, 420, 'sul diametro:\nangolo {g:retto}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 445, w, 150);
    if (s) drawRich(ctx, s, x, 520, { size: 36, lh: 1.3 });
    else relazione(ctx, x, 524, 44);
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): quando C scorre, il tono segue la sua altezza
  const alt = g => +(.15 + .8 * Math.sin(g * RAD)).toFixed(2);
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5],
    ['traccia', T.circ + .2, T.circ + 1.5], ['pop', T.circ + .4, .5],                         // la circonferenza, O
    ['pop', T.circ + 2.0, .3], ['pop', T.circ + 2.6, .4],                                       // A e B
    ['soffio', T.centro], ['traccia', T.centro + .3, T.centro + 1.0], ['pop', T.centro + 1.4, .6],   // l'angolo al centro, 100°
    ['traccia', T.arco + .3, T.arco + 1.3],                                                     // l'arco AB
    ['pop', T.C + .3, .9], ['traccia', T.C + .8, T.C + 1.6], ['pop', T.C + 1.7, .7],             // C, le corde, l'angolo in C
    ['pop', T.stesso + .3, .3],                                                                 // lo stesso arco
    ['ding', T.meta + .3],                                                                      // 50°, la metà
    ['tono', T.sposto + .3, T.sposto + 2.1, [alt(90), alt(72), alt(55)]],                        // C scorre sull'arco
    ['tono', T.sposto + 2.1, T.sposto + 4.3, [alt(55), alt(90), alt(125)]],
    ['pop', T.doppio + .4, .7],                                                                 // il doppio
    ['tono', T.allargo + .4, T.allargo + 3.6, [.3, .4, .6, .8, .9]],                            // l'angolo al centro cresce fino a 180°
    ['traccia', T.diam + .3, T.diam + 1.0],                                                     // il diametro
    ['pop', T.retto + .3, .8],                                                                  // il quadratino dell'angolo retto
    ['tono', T.semi + .3, T.semi + 2.2, [alt(125), alt(90), alt(60)]],                           // C scorre sulla semicirconferenza
    ['tono', T.semi + 2.2, T.semi + 4.4, [alt(60), alt(85), alt(105)]],
    ['pop', T.rett + .3, .6],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'L’angolo che non cambia', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.C - .1, 'l’angolo al centro'], [T.C - .1, T.allargo - .2, 'l’angolo alla circonferenza'], [T.allargo - .2, FINE, 'sul diametro']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
