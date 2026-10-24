'use strict';
/* L’angolo esterno — triangolo ABC con α, β, γ in A, B, C (come nel sito); si prolunga BC oltre C fino a D: l'angolo
   esterno δ = AĈD è adiacente a γ (γ + δ = 180°) e gli angoli interni sommano 180°, quindi δ = α + β, la somma dei due
   interni non adiacenti, e δ è maggiore di ciascuno. Le copie di α e β, portate in C, riempiono δ. Poi A si muove: gli
   angoli sono sempre interi (β e γ scorrono a gradi interi) e l'uguaglianza resta: 110° = 60° + 50°, 80° = 45° + 35°,
   140° = 75° + 65°. Argomento: geometria-piano-1 (oggi la teoria sta in geometria-euclidea). */
CVIDEO.registra('geometria-piano-1/angolo-esterno', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, glowStroke, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['tri', 5.0, 'Un triangolo {mink:ABC}, con gli angoli\ninterni {mx:α}, {my:β} e {mink:γ}.'],
  ['prol', 4.6, 'Prolungo il lato {mink:BC} oltre {mink:C},\nfino a un punto {mink:D}.'],
  ['est', 5.6, 'Fra il lato {mink:CA} e il prolungamento c’è\nl’{v:angolo esterno} in {mink:C}: lo chiamo {mv:δ}.'],
  ['adiac', 5.6, '{mv:δ} è {g:adiacente} a {mink:γ}: insieme\nformano un angolo piatto, {g:180°}.'],
  ['somma', 4.8, 'Anche i tre angoli interni\ndel triangolo sommano {g:180°}.'],
  ['togli', 5.4, 'Tolgo {mink:γ} da tutte e due le somme:\nresta {mv:δ}{mink: = }{mx:α}{mink: + }{my:β}.'],
  ['nonad', 5.0, '{mx:α} e {my:β} sono i due angoli interni\n{g:non adiacenti} a {mv:δ}.'],
  ['riempi', 5.6, 'Infatti, se li sposto in {mink:C}, {mx:α} e {my:β}\nriempiono {mv:δ} esattamente.'],
  ['magg', 5.6, 'Ognuno è solo un pezzo di {mv:δ}: {mv:δ} è\n{g:maggiore} sia di {mx:α} sia di {my:β}.'],
  ['misure', 5.0, 'Con le misure: {mv:110}{v:°}{mink: = }{mx:60}{x:°}{mink: + }{my:50}{y:°}.'],
  ['sposto', 4.4, 'Ora sposto il vertice {mink:A}…', .3],
  ['resta', 5.6, '…ora {mv:80}{v:°}{mink: = }{mx:45}{x:°}{mink: + }{my:35}{y:°}:\nl’uguaglianza {g:resta}.'],
  ['ancora', 4.0, 'Lo sposto ancora…'],
  ['sempre', 6.2, '…{mv:140}{v:°}{mink: = }{mx:75}{x:°}{mink: + }{my:65}{y:°}: vale\nper {g:ogni} triangolo.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Prolungo un lato di un triangolo:\nche angolo si forma, fuori?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'L’angolo esterno è la somma dei due interni\nnon adiacenti: è più grande di ciascuno.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.est + 2.0, 'sorpreso'], [T.adiac, 'neutro'], [T.togli + 2.4, 'felice'], [T.nonad + 1.0, 'neutro'],
  [T.riempi + 3.0, 'sorpreso'], [T.magg + 1.0, 'neutro'], [T.magg + 3.2, 'felice'], [T.misure + 1.5, 'neutro'],
  [T.resta, 'felice'], [T.resta + 2.4, 'neutro'], [T.sempre, 'festa'], [T.sempre + 2.6, 'felice'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// la figura: B e C fissi, D sul prolungamento; A si trova da β e γ, che scorrono a gradi interi
const RAD = Math.PI / 180, B = [170, 690], Cv = [640, 690], D = [945, 690], BC = Cv[0] - B[0];
const angB = t => Math.round(kf(t, [[T.sposto + .3, 50], [T.sposto + 3.6, 35], [T.ancora + .3, 35], [T.ancora + 3.4, 65]]));
const angC = t => Math.round(kf(t, [[T.sposto + .3, 70], [T.sposto + 3.6, 100], [T.ancora + .3, 100], [T.ancora + 3.4, 40]]));
function vertA(b, g) {   // legge dei seni: BA = BC · sin γ / sin α
  const a = 180 - b - g, L = BC * Math.sin(g * RAD) / Math.sin(a * RAD);
  return [B[0] + L * Math.cos(b * RAD), B[1] - L * Math.sin(b * RAD)];
}
const dirT = g => [Math.cos(g * RAD), -Math.sin(g * RAD)];   // direzione sulla tela di un angolo in gradi (antiorario)
// spicchio d'angolo in V fra le direzioni g1 e g2 (gradi, antiorario da g1 a g2)
function spicchio(ctx, V, g1, g2, r, col, al, riemp = .2, w = 3.5) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], r, -g1 * RAD, -g2 * RAD, true); ctx.closePath();
  ctx.fillStyle = css(col, riemp); ctx.fill();
  if (w > 0) { ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.beginPath(); ctx.arc(V[0], V[1], r, -g1 * RAD, -g2 * RAD, true); ctx.stroke(); }
  ctx.restore();
}
function seg(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };
// una riga di formula a pezzi colorati, a sinistra in x
function formula(ctx, s, x, y, size, al) { if (al > 0) drawRich(ctx, s, x, y, { size, align: 'left', alpha: al }); }

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’angolo esterno', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const b = angB(t), g = angC(t), A = vertA(b, g), gCA = 180 - g;
  // quando Ada parla di α e β (non adiacenti) i due spicchi si accendono, γ si fa da parte
  const hNon = life(t, T.nonad + .3, T.nonad + 5.0, .4, .4);
  const hPiatto = life(t, T.adiac + .3, T.adiac + 5.2, .4, .4);
  // gli angoli interni
  spicchio(ctx, A, b + 180, 360 - g, 58, C.x, P(t, T.tri + 1.6, T.tri + 2.0), .2 + .25 * hNon);
  spicchio(ctx, B, 0, b, 68, C.y, P(t, T.tri + 2.1, T.tri + 2.5), .2 + .25 * hNon);
  spicchio(ctx, Cv, gCA, 180, 55, C.ink, P(t, T.tri + 2.6, T.tri + 3.0) * (1 - .55 * hNon), .2 + .2 * hPiatto);
  // l'angolo esterno δ, fra CA e il prolungamento CD
  const kD = P(t, T.est + .5, T.est + 1.1);
  spicchio(ctx, Cv, 0, gCA, 92, C.v, kD, .14 + .2 * hPiatto);
  // l'angolo piatto γ + δ: un mezzo giro verde
  if (hPiatto > 0) {
    ctx.save(); ctx.globalAlpha *= hPiatto; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.arc(Cv[0], Cv[1], 126, 0, -Math.PI, true); ctx.stroke(); ctx.restore();
  }
  // il triangolo e il prolungamento
  glowStroke(ctx, [B, Cv, A, B], P(t, 8.0, 9.4, E.lin), C.ink, 4);
  seg(ctx, Cv, D, C.ink, 4, P(t, T.prol + .4, T.prol + 1.4));
  dot(ctx, D, C.ink, P(t, T.prol + 1.3, T.prol + 1.6, E.back), 7);
  // le copie di α e β portate in C: β scivola lungo BC, α gira di mezzo giro attorno al punto medio di AC
  const vis = life(t, T.riempi + .3, T.misure + .4, .3, .5);
  if (vis > 0) {
    const kb = P(t, T.riempi + .6, T.riempi + 2.2, E.io), ka = P(t, T.riempi + 2.0, T.riempi + 3.8, E.io);
    const Vb = [lerp(B[0], Cv[0], kb), B[1]];
    spicchio(ctx, Vb, 0, b, lerp(68, 92, kb), C.y, vis, .42);
    lab(ctx, '{my:β}', [Vb[0] + 64 * Math.cos(b / 2 * RAD), Vb[1] - 64 * Math.sin(b / 2 * RAD)], vis * P(t, T.riempi + 2.2, T.riempi + 2.6), 40);
    const Mx = (A[0] + Cv[0]) / 2, My = (A[1] + Cv[1]) / 2, th = -Math.PI * ka;   // gira dalla parte esterna: non passa sul nome di γ
    const dx = A[0] - Mx, dy = A[1] - My;
    const Va = [Mx + dx * Math.cos(th) + dy * Math.sin(th), My - dx * Math.sin(th) + dy * Math.cos(th)];
    spicchio(ctx, Va, b + 180 - 180 * ka, 360 - g - 180 * ka, lerp(58, 92, ka), C.x, vis, .42);
    const ma = (b + gCA) / 2;
    lab(ctx, '{mx:α}', [Cv[0] + 62 * Math.cos(ma * RAD), Cv[1] - 62 * Math.sin(ma * RAD)], vis * P(t, T.riempi + 3.8, T.riempi + 4.2), 40);
  }
  // i nomi degli angoli
  const ba = (b + 180 + 360 - g) / 2;
  lab(ctx, '{mx:α}', [A[0] + 100 * Math.cos(ba * RAD), A[1] - 100 * Math.sin(ba * RAD)], P(t, T.tri + 1.6, T.tri + 2.0));
  lab(ctx, '{my:β}', [B[0] + 112 * Math.cos(b / 2 * RAD), B[1] - 112 * Math.sin(b / 2 * RAD)], P(t, T.tri + 2.1, T.tri + 2.5));
  const bg = 180 - g / 2;
  const rg = Math.max(84, 34 / Math.sin(g / 2 * RAD));
  lab(ctx, '{mink:γ}', [Cv[0] + rg * Math.cos(bg * RAD), Cv[1] - rg * Math.sin(bg * RAD)], P(t, T.tri + 2.6, T.tri + 3.0));
  const bd = gCA / 2;
  lab(ctx, '{mv:δ}', [Cv[0] + 168 * Math.cos(bd * RAD), Cv[1] - 168 * Math.sin(bd * RAD)], P(t, T.est + 2.4, T.est + 2.8) * (1 - life(t, T.riempi + 2.1, T.riempi + 3.7, .25, .3)), 48);   // mentre la copia di α ci passa sopra, si fa da parte
  // i vertici
  const kN = P(t, 9.2, 9.7);
  lab(ctx, '{mink:A}', [A[0], A[1] - 44], kN);
  lab(ctx, '{mink:B}', [B[0] - 30, B[1] + 38], kN);
  lab(ctx, '{mink:C}', [Cv[0], Cv[1] + 44], kN);
  lab(ctx, '{mink:D}', [D[0], D[1] + 44], P(t, T.prol + 1.4, T.prol + 1.8));
  ctx.restore();
}

// la scheda a destra: le due somme, la relazione, il confronto, le misure
const XL = 1095, XR = 1820;
const REL = '{mv:δ}{mink: = }{mx:α}{mink: + }{my:β}';
function scenePannello(ctx, t) {
  if (t < T.adiac || t > FINE + .2) return;
  const la = P(t, T.adiac, T.adiac + .5) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'l’angolo esterno', 1450, 172, { size: 40, weight: 600 }));
  const k1 = P(t, T.adiac + .8, T.adiac + 1.2), k2 = P(t, T.somma + .5, T.somma + .9);
  formula(ctx, '{mink:γ}{mink: + }{mv:δ}{mink: = 180}°', XL, 262, 50, k1);
  if (k1 > 0) drawRich(ctx, '{dim:angolo piatto}', XR, 262, { size: 32, align: 'right', alpha: k1 });
  formula(ctx, '{mx:α}{mink: + }{my:β}{mink: + }{mink:γ}{mink: = 180}°', XL, 352, 50, k2);
  if (k2 > 0) drawRich(ctx, '{dim:triangolo}', XR, 352, { size: 32, align: 'right', alpha: k2 });
  // tolto γ: la relazione, nel riquadro verde
  const k3 = P(t, T.togli + .8, T.togli + 1.3);
  if (k3 > 0) {
    ctx.save(); ctx.globalAlpha *= k3; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(1450 - 210, 418, 420, 110, 18); ctx.stroke(); ctx.restore();
    drawRich(ctx, REL, 1450, 473, { size: 60, alpha: k3 });
  }
  // δ è maggiore di ciascuno
  const k4 = P(t, T.magg + .8, T.magg + 1.3);
  if (k4 > 0) {
    drawRich(ctx, '{mv:δ}{mink: > }{mx:α}', 1290, 592, { size: 50, alpha: k4 });
    drawRich(ctx, '{mv:δ}{mink: > }{my:β}', 1610, 592, { size: 50, alpha: k4 });
  }
  // le misure: β e γ sono interi, quindi α = 180° − β − γ e δ = 180° − γ lo sono anche loro
  const k5 = P(t, T.misure + .4, T.misure + .9);
  if (k5 > 0) {
    const b = angB(t), g = angC(t), a = 180 - b - g;
    ctx.save(); ctx.globalAlpha *= k5;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 650); ctx.lineTo(1820, 650); ctx.stroke();
    drawRich(ctx, '{mv:' + (180 - g) + '}{v:°}{mink: = }{mx:' + a + '}{x:°}{mink: + }{my:' + b + '}{y:°}', 1450, 722, { size: 54 });
    ctx.restore();
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
    drawRich(ctx, 'L’angolo esterno è la somma dei due\nangoli interni {g:non adiacenti}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, 440, null], [960, 440, 'adiacenti:\n{mink:γ}{mink: + }{mv:δ}{mink: = 180}°'], [1470, 440, '{mv:δ} è più grande\ndi {mx:α} e di {my:β}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 445, w, 150);
    if (s) drawRich(ctx, s, x, 520, { size: 38, lh: 1.3 });
    else drawRich(ctx, REL, x, 522, { size: 50 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): quando A si muove, il tono segue la sua altezza
  // (stessa curva di kf, scritta qui perché i suoni si leggono senza motore)
  const io = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const tra = (s, a, b, va, vb) => Math.round(va + (vb - va) * io(Math.max(0, Math.min(1, (s - a) / (b - a)))));
  const campioni = (a, b, n, b0, b1, g0, g1) => {
    const o = [];
    for (let i = 0; i <= n; i++) { const s = a + (b - a) * i / n; o.push(+((690 - vertA(tra(s, a, b, b0, b1), tra(s, a, b, g0, g1))[1]) / 420).toFixed(2)); }
    return o;
  };
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 8.0, 9.4], ['pop', 9.2, .5],                    // il triangolo e i vertici
    ['pop', T.tri + 1.6, .4], ['pop', T.tri + 2.1, .5], ['pop', T.tri + 2.6, .6],                 // α, β, γ
    ['traccia', T.prol + .4, T.prol + 1.4], ['pop', T.prol + 1.3, .7],                            // il prolungamento fino a D
    ['pop', T.est + .5, .8],                                                                      // l'angolo esterno δ
    ['soffio', T.adiac], ['traccia', T.adiac + .3, T.adiac + 1.0], ['pop', T.adiac + .8, .5],     // l'angolo piatto, γ + δ = 180°
    ['pop', T.somma + .5, .6],                                                                    // α + β + γ = 180°
    ['ding', T.togli + .8],                                                                       // δ = α + β
    ['pop', T.nonad + .3, .5],                                                                    // i due non adiacenti
    ['tono', T.riempi + .6, T.riempi + 2.2, [.2, .2]], ['pop', T.riempi + 2.2, .5],               // β scivola in C
    ['tono', T.riempi + 2.0, T.riempi + 3.8, [.75, .6, .4, .2]], ['pop', T.riempi + 3.8, .7],     // α gira e scende in C
    ['pop', T.magg + .8, .6],                                                                     // δ > α, δ > β
    ['pop', T.misure + .4, .7],                                                                   // le misure
    ['tono', T.sposto + .3, T.sposto + 3.6, campioni(T.sposto + .3, T.sposto + 3.6, 6, 50, 35, 70, 100)],          // A si sposta
    ['tono', T.ancora + .3, T.ancora + 3.4, campioni(T.ancora + .3, T.ancora + 3.4, 6, 35, 65, 100, 40)],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'L’angolo esterno', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.adiac - .1, 'l’angolo esterno'], [T.adiac - .1, T.misure - .1, 'la somma dei non adiacenti'], [T.misure - .1, FINE, 'con le misure']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
