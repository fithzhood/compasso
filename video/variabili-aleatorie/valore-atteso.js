'use strict';
/* Il baricentro delle probabilità — X = numero di teste in tre lanci di una moneta: gli 8 esiti si impilano in
   barre alte 1/8, 3/8, 3/8, 1/8; le barre stanno su un'asta che resta in equilibrio solo se appoggiata in 1,5,
   il valore atteso E(X) = Σ xᵢ · pᵢ = 12/8 = 1,5. (La varianza sta in variabili-aleatorie/varianza.)
   Argomento: variabili-aleatorie. */
CVIDEO.registra('variabili-aleatorie/valore-atteso', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, card } = M;

const FINE = 68.4, DUR = 78.4;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'], [14.4, 'felice'],
  [17.4, 'neutro'], [22.6, 'felice'], [26.6, 'neutro'], [33.2, 'felice'], [36.4, 'neutro'], [42.4, 'sorpreso'],
  [45.4, 'neutro'], [49.9, 'festa'], [52.0, 'felice'], [54.0, 'neutro'], [64.6, 'felice'],
  [73.6, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.4, 6.4, 'Tre lanci di una moneta:\nquante teste, in media?'],
  // 1 · gli esiti e la variabile aleatoria
  [8.0, 12.6, 'Ogni lancio dà {mink:T}, testa, o {mink:C},\ncroce: in tutto {g:8} esiti.'],
  [12.8, 17.2, 'Per ogni esito conto le teste:\n{mink:TTC} ne ha {g:2}.'],
  [17.4, 21.6, 'Metto insieme gli esiti\ncon lo stesso numero di teste.'],
  [21.8, 26.4, 'Quel numero, {mink:X}, dipende dal caso:\nè una {v:variabile aleatoria}.'],
  [26.6, 31.2, 'Per esempio {mink:X = 1} in 3 esiti su 8:\n{mink:P(X = 1) = 3/8}.'],
  [31.4, 36.0, 'Ogni pila diventa una barra, alta\nquanto la sua probabilità {mink:pᵢ}.'],
  // 2 · il punto di equilibrio
  [36.4, 40.8, 'Ora l’asse è un’asta: ogni barra\n{v:pesa} quanto la sua probabilità.'],
  [41.0, 45.2, 'Se l’appoggio in {mink:0,5},\nl’asta {r:pende} a destra.'],
  [45.4, 49.6, 'Sposto l’appoggio verso destra…'],
  [49.8, 53.6, '…in {mink:1,5} l’asta sta {g:in equilibrio}!'],
  [53.8, 58.4, 'È il {v:valore atteso} {mink:E(X)}:\nla media di {mink:X}, il suo baricentro.'],
  [58.6, 63.4, 'Ogni valore per la sua probabilità,\ne poi la somma, {mink:Σ}.'],
  [63.6, 68.0, 'In media {g:1,5} teste, anche se\n1,5 teste non escono mai.'],
  // chiusura
  [69.2, 75.4, 'Valori pesati con le probabilità:\nil valore atteso è il {v:baricentro}.'],
];

// ---- gli esiti, le pile, l'asta ----
const CARD = [110, 110, 930, 690], PAN = [1075, 110, 735, 690];
const XV = v => 280 + v * 200, AY = 640, PT = 56, BU = 66, BW = 174, CW = 178;
const SEQ = ['TTT', 'TTC', 'TCT', 'TCC', 'CTT', 'CTC', 'CCT', 'CCC'];
const CONTA = [1, 3, 3, 1], FRAZ = ['1/8', '3/8', '3/8', '1/8'];
// scende prima la fila di sotto, poi quella di sopra: ogni esito si posa sopra quelli già arrivati
const teste = s => s.split('').filter(c => c === 'T').length;
const ORDINE = [4, 5, 6, 7, 0, 1, 2, 3];
const ESITI = SEQ.map((s, i) => {
  const k = teste(s), turno = ORDINE.indexOf(i);
  const liv = ORDINE.slice(0, turno).filter(j => teste(SEQ[j]) === k).length;
  return { s, k, liv, turno, x0: XV(i % 4), y0: 210 + Math.floor(i / 4) * 84, x1: XV(k), y1: AY - BU * liv - BU / 2 };
});
// l'appoggio: in 0,5, poi scivola fino a 1,5; l'asta pende in proporzione al momento Σ (xᵢ − appoggio) · pᵢ = 1,5 − appoggio
const appoggio = t => kf(t, [[45.6, .5], [48.8, 1.5]]);
const angolo = t => .085 * (1.5 - appoggio(t)) * P(t, 41.9, 42.9, E.out);

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il baricentro delle probabilità', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function rett(ctx, x, y, w, h, r, riempi, bordo, lw) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (riempi) { ctx.fillStyle = riempi; ctx.fill(); }
  if (bordo) { ctx.strokeStyle = bordo; ctx.lineWidth = lw || 3; ctx.stroke(); }
}

// 1–2 · le pile, le barre, l'asta (7.5–FINE)
function sceneAsta(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  // la linea del terreno e l'appoggio non si inclinano
  const kg = P(t, 36.6, 37.2);
  if (kg > 0) {
    ctx.save(); ctx.globalAlpha *= kg; ctx.strokeStyle = css(C.ink, .5); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(150, AY + PT + 64); ctx.lineTo(1000, AY + PT + 64); ctx.stroke(); ctx.restore();
  }
  const kf0 = P(t, 41.2, 41.7, E.back);
  if (kf0 > 0) {
    const px = XV(appoggio(t)), py = AY + PT;
    ctx.save(); ctx.translate(px, py + 64); ctx.scale(kf0, kf0); ctx.translate(-px, -py - 64);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 40, py + 64); ctx.lineTo(px - 40, py + 64); ctx.closePath();
    ctx.fillStyle = css(C.v, .22); ctx.fill(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.stroke();
    ctx.restore();
  }
  // tutto quello che sta sull'asta ruota intorno al punto d'appoggio
  const a = angolo(t), px = XV(appoggio(t)), py = AY + PT;
  ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.translate(-px, -py);
  const kp = P(t, 7.7, 8.4);
  if (kp > 0) {
    ctx.save(); ctx.globalAlpha *= kp;
    rett(ctx, XV(-.55), AY, XV(3.55) - XV(-.55), PT, 10, css(C.ink, .07), css(C.ink, .6), 3);
    for (let v = 0; v <= 3; v++) drawRich(ctx, `{mink:${v}}`, XV(v), AY + PT / 2, { size: 44 });
    ctx.restore();
  }
  // le barre (dopo che le pile si sono fuse)
  const kb = P(t, 31.6, 32.6), peso = P(t, 36.8, 37.6);
  CONTA.forEach((n, v) => {
    if (kb > 0) {
      ctx.save(); ctx.globalAlpha *= kb;
      rett(ctx, XV(v) - BW / 2, AY - n * BU, BW, n * BU, 8, css(C.y, lerp(.16, .36, peso)), css(C.y, .9), 3);
      ctx.restore();
    }
    const ke = v === 1 ? P(t, 27.6, 28.1) : P(t, 32.4 + v * .2, 32.8 + v * .2);
    drawRich(ctx, `{mink:${FRAZ[v]}}`, XV(v), AY - n * BU - 40, { size: 44, alpha: ke });
  });
  // gli esiti: compaiono in due file, prendono il loro numero di teste, poi scendono nelle pile
  const kc = 1 - P(t, 31.6, 32.6);
  if (kc > 0) ESITI.forEach((e, i) => {
    const k = P(t, 8.4 + i * .2, 8.9 + i * .2, E.back);
    if (k <= 0) return;
    const u = P(t, 17.6 + e.turno * .14, 18.4 + e.turno * .14), x = lerp(e.x0, e.x1, u), y = lerp(e.y0, e.y1, u), w = lerp(CW, BW, u);
    ctx.save(); ctx.globalAlpha *= kc; ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-x, -y);
    rett(ctx, x - w / 2, y - 30, w, 60, 8, css(C.y, .16), css(C.y, .9), 3);
    drawRich(ctx, `{mink:${e.s}}`, x - w / 2 + 16, y, { size: 40, align: 'left' });
    drawRich(ctx, `{mv:${e.k}}`, x + w / 2 - 20, y, { size: 44, align: 'right', alpha: P(t, 13.0 + i * .15, 13.4 + i * .15) });
    // TTC, l'esito di cui parla Ada
    if (i === 1) { const kr = life(t, 13.6, 17.3, .3, .4); if (kr > 0) rett(ctx, x - w / 2 - 7, y - 37, w + 14, 74, 12, null, css(C.g, kr), 4); }
    ctx.restore();
  });
  // la pila di X = 1
  const kh = life(t, 26.8, 31.4, .4, .4);
  if (kh > 0) rett(ctx, XV(1) - BW / 2 - 9, AY - 3 * BU - 9, BW + 18, 3 * BU + 9, 12, null, css(C.v, kh), 4);
  // il valore atteso: la verticale per il punto d'appoggio
  const km = P(t, 54.0, 54.6);
  if (km > 0) {
    ctx.save(); ctx.globalAlpha *= km; ctx.strokeStyle = css(C.v, .85); ctx.lineWidth = 3; ctx.setLineDash([9, 9]);
    ctx.beginPath(); ctx.moveTo(XV(1.5), AY - 4); ctx.lineTo(XV(1.5), 222); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mink:E(X) = }{mv:1,5}', XV(1.5), 190, { size: 44, alpha: P(t, 54.3, 54.8) });
  }
  ctx.restore();
  // il nome della variabile, sotto l'asta finché non arriva il terreno
  drawRich(ctx, '{mink:X}{dim: = numero di teste}', XV(1.5), 752, { size: 36, local: t - 22.0, alpha: 1 - P(t, 36.4, 36.9) });
  ctx.restore();
}

// il riquadro dei conti (32.6–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1112, VX = i => 1398 + i * 111;
function sceneConti(ctx, t) {
  const al = life(t, 32.6, FINE + .2, .6, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => drawRich(ctx, 'la distribuzione di {mink:X}', PX, 168, { size: 38, weight: 600, local: t - 33.0 }));
  const riga = (nome, valori, y, a, colore) => {
    drawRich(ctx, nome, LX, y, { size: 30, align: 'left', alpha: P(t, a - .2, a + .2) });
    valori.forEach((s, i) => drawRich(ctx, `{m${colore(i)}:${s}}`, VX(i), y, { size: 44, alpha: P(t, a + i * .15, a + i * .15 + .4) }));
  };
  riga('{dim:valori} {mink:xᵢ}', ['0', '1', '2', '3'], 238, 33.4, () => 'ink');
  riga('{dim:probabilità} {mink:pᵢ}', FRAZ, 306, 34.0, () => 'ink');
  const ks = P(t, 58.7, 59.0);
  if (ks > 0) { ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 380); ctx.lineTo(PAN[0] + PAN[2] - 40, 380); ctx.stroke(); ctx.restore(); }
  // il valore atteso
  drawRich(ctx, '{mink:E(X) = Σ xᵢ · pᵢ}', PX, 450, { size: 46, local: t - 58.8 });
  drawRich(ctx, '{mink:= 0 · 1/8 + 1 · 3/8}', PX, 540, { size: 46, local: t - 59.6 });
  drawRich(ctx, '{mink:+ 2 · 3/8 + 3 · 1/8}', PX, 620, { size: 46, local: t - 60.4 });
  drawRich(ctx, '{mink:= 12/8 = }{mg:1,5}', PX, 710, { size: 50, local: t - 63.8 });
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il valore atteso è il punto in cui\nle probabilità stanno in {g:equilibrio}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[390, '{dim:valore atteso}'], [960, '{dim:tre lanci}'], [1530, '{dim:il baricentro}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 270, 445, 540, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mink:E(X) = Σ xᵢ · pᵢ}', x, 568, { size: 44 });
    if (i === 1) { drawRich(ctx, '{mink:E(X) = }{mg:1,5}', x, 545, { size: 46 }); drawRich(ctx, 'anche se 1,5 teste non escono mai', x, 610, { size: 30 }); }
    if (i === 2) drawRich(ctx, 'lì l’asta delle probabilità\nsta in equilibrio', x, 572, { size: 34, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.4],                                            // l'asse
    ['pop', 8.5, .3], ['pop', 9.1, .45], ['pop', 9.7, .6], ['pop', 10.3, .75],          // gli otto esiti
    ['pop', 13.1, .4], ['pop', 13.7, .55], ['pop', 14.3, .7],                           // il numero di teste
    ['tono', 17.6, 19.4, [.8, .6, .4, .25]],                                            // gli esiti scendono nelle pile
    ['pop', 22.1, .5],                                                                  // X
    ['traccia', 26.8, 27.3], ['pop', 27.7, .6],                                         // la pila di X = 1, 3/8
    ['soffio', 31.6], ['pop', 32.5, .3], ['pop', 32.9, .5], ['pop', 33.3, .7],           // le barre, il riquadro
    ['traccia', 36.6, 37.2],                                                            // l'asta sul terreno
    ['pop', 41.3, .4], ['tono', 41.9, 42.9, [.5, .15]],                                 // l'appoggio in 0,5: pende
    ['tono', 45.6, 48.8, [.15, .3, .42, .5]],                                           // l'appoggio scivola, l'asta si raddrizza
    ['traccia', 54.0, 54.6], ['pop', 54.4, .6],                                         // E(X) = 1,5
    ['pop', 58.9, .4], ['pop', 59.7, .5], ['pop', 60.5, .6], ['ding', 64.4],            // il conto, 12/8 = 1,5
    ['soffio', FINE + .2], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il baricentro delle probabilità', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 36.2, 'tre lanci, otto esiti'], [36.2, FINE, 'il punto di equilibrio']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneAsta(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
