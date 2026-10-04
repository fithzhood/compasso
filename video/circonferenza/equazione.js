'use strict';
/* L'equazione della circonferenza — i punti a distanza r dal centro: con Pitagora diventano
   (x − α)² + (y − β)² = r². Argomento: circonferenza. */
CVIDEO.registra('circonferenza/equazione', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, txt, richW, drawSeq,
    dot, glowStroke, dashed, arrowHead, makePlane, card } = M;

// a 59,7 s la scena si ferma per 5,2 s (il fumetto dei segni): le scene usano il tempo rimappato tm(t)
const PAUSA = 59.7, SPOSTA = 5.2;
const tm = t => t < PAUSA ? t : t < PAUSA + SPOSTA ? PAUSA : t - SPOSTA;
const F0 = 89.4, FINE = F0 + SPOSTA;   // F0: fine delle scene nel tempo rimappato; FINE: nel tempo vero
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [17.6, 'felice'], [20.8, 'neutro'], [24.6, 'pensa'], [29.2, 'neutro'], [35.2, 'festa'], [38.6, 'neutro'],
  [44.8, 'felice'], [50.0, 'neutro'], [79.6, 'felice'], [84.8, 'neutro'], [90.2, 'felice'], [93.2, 'neutro'],
  [FINE + 1.0, 'felice'], [101.2, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.0, 6.6, 'Quali punti distano 5\nda un punto fisso?'],
  // 1 · i punti a distanza 5
  [7.9, 11.6, 'Questo punto è il centro, {mink:C(2; 1)}.'],
  [11.8, 16.6, 'Cerco i punti a distanza 5 da {mink:C}:\n5 è il {v:raggio}, {mink:r}.'],
  [16.8, 20.6, '{mink:(7; 1)} è 5 a destra di {mink:C}:\nci sta.'],
  [20.8, 24.4, '{mink:(2; 6)} è 5 sopra {mink:C}:\nanche lui.'],
  [24.6, 29.0, 'E {mink:P(5; 5)}? Non è sulla riga\nné sulla colonna di {mink:C}.'],
  [29.2, 33.6, 'Da {mink:C} a {mink:P}: 3 a destra\ne 4 in su.'],
  [33.8, 38.4, 'Pitagora: {mink:CP = √(3² + 4²) = 5}.\n{mink:P} ci sta!'],
  [38.6, 44.6, 'Faccio girare {mink:P}, sempre\na distanza 5 da {mink:C}…'],
  [44.8, 49.6, '…e disegna la {g:circonferenza}:\ni punti a distanza {mink:r} da {mink:C}.'],
  // 2 · l'equazione
  [50.0, 54.4, 'Ora prendo un punto qualunque\ndella circonferenza: {mink:P(x; y)}.'],
  [54.6, 59.6, 'Da {mink:C} vado di {mx:x − 2} in orizzontale\ne di {my:y − 1} in verticale.'],
  [59.8, 64.8, 'A sinistra o sotto {mink:C}, {mink:x − 2} o {mink:y − 1}\nsono negativi, ma i quadrati no.'],
  [65.0, 69.4, '{mink:P} sta sulla circonferenza\nquando {mink:CP = 5}.'],
  [69.6, 74.4, 'Con Pitagora, {mink:CP} è la radice\ndella somma dei quadrati.'],
  [74.6, 79.4, 'Elevo al quadrato i due membri:\nresta {mink:(x − 2)² + (y − 1)² = 25}.'],
  [79.6, 84.6, 'È l’{v:equazione della circonferenza}:\nvera solo per i suoi punti.'],
  [84.8, 90.0, 'Con centro {mink:C(α; β)} qualunque,\n{mink:α} e {mink:β} prendono il posto di 2 e 1.'],
  [90.2, 94.2, 'A destra c’è il raggio\n{g:al quadrato}: {mink:r²}.'],
  // chiusura
  [96.2, 103.8, 'Il centro, il raggio e Pitagora:\necco l’equazione della {g:circonferenza}.'],
];

// centro C(2; 1), raggio 5. Una sola unità per i due assi.
const PL = makePlane({ ox: 374, oy: 508, u: 54, x0: -3.6, x1: 8.0, y0: -4.6, y1: 6.8 });
const CARD = [140, 100, 760, 690];
const CX = 2, CY = 1, R = 5;
const CS = PL.toS(CX, CY);
const TH0 = Math.atan2(4, 3), TH1 = 65 * Math.PI / 180;   // P(5; 5) e il punto qualunque
const sulCerchio = th => [CX + R * Math.cos(th), CY + R * Math.sin(th)];
// P: fermo in (5; 5), poi fa un giro intero (giro), poi scivola sul punto qualunque
const GIRO = [39.0, 44.6], SCIVOLA = [50.1, 51.1];
function angP(t) {
  if (t < SCIVOLA[0]) return TH0 + 2 * Math.PI * P(t, GIRO[0], GIRO[1], E.io);
  return lerp(TH0, TH1, P(t, SCIVOLA[0], SCIVOLA[1], E.io));
}
function arco(a, b, n = 160) { const p = []; for (let i = 0; i <= n; i++) p.push(PL.toS(...sulCerchio(lerp(a, b, i / n)))); return p; }
function segmento(ctx, a, b, col, k = 1, w = 6) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function angoloRetto(ctx, K, sx, sy, al) {   // il quadratino in K, verso sx (±1) e sy (±1)
  if (al <= 0) return;
  const d = 20;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(K[0] + sx * d, K[1]); ctx.lineTo(K[0] + sx * d, K[1] - sy * d); ctx.lineTo(K[0], K[1] - sy * d); ctx.stroke(); ctx.restore();
}
// griglia e assi, senza numeri: i numeri si scrivono alla fine, su un fondino, sopra a tutto
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save();
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 38, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 30, oy - (y1 + .2) * u - 8, { size: 44 });
  ctx.restore();
}
// i numeri pari: nessuno sta sulla circonferenza (il più vicino ne dista 13 px)
function numeri(ctx, k, t) {   // durante il giro si spengono i numeri su cui passa il raggio
  if (k <= 0) return;
  const { ox, oy, u } = PL;
  ctx.save(); ctx.globalAlpha *= P(k, .6, 1); ctx.fillStyle = C.paper;
  const giro = 1 - life(t, 38.6, 44.9, .3, .3);
  const scrivi = (s, x, y, al) => {
    const d = Math.hypot((x - PL.ox) / u - CX, (PL.oy - y) / u - CY);
    ctx.save(); if (d < R + .2) ctx.globalAlpha *= giro;
    const w = richW(ctx, s, 29);
    const x0 = al === 'right' ? x - w : x - w / 2;
    ctx.fillStyle = C.paper; ctx.fillRect(x0 - 5, y - 18, w + 10, 36);
    txt(ctx, s, x, y, { size: 29, color: C.dim, align: al });
    ctx.restore();
  };
  for (const i of [-2, 2, 4, 6]) scrivi((i < 0 ? '−' : '') + Math.abs(i), ox + i * u, oy + 32, 'center');
  for (const j of [-4, -2, 2, 4, 6]) scrivi((j < 0 ? '−' : '') + Math.abs(j), ox - 20, oy - j * u, 'right');
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'L’equazione della circonferenza', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · il piano (7.5–F0)
function scenePiano(ctx, t) {
  if (t < 7.5 || t > F0 + .3) return;
  const al = 1 - P(t, F0 - .6, F0 + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const kA = P(t, 7.7, 8.7);
  assi(ctx, kA);

  // (7; 1) e (2; 6): 5 a destra, 5 sopra
  const A1 = PL.toS(7, 1), A2 = PL.toS(2, 6);
  const via = 1 - P(t, 24.4, 24.8);
  if (t > 16.9 && via > 0) {
    ctx.save(); ctx.globalAlpha *= via;
    dashed(ctx, CS, A1, C.x, P(t, 17.0, 17.6));
    drawRich(ctx, '{mx:5}', PL.toS(4.5, 1)[0], CS[1] - 30, { size: 44, alpha: P(t, 17.4, 17.8) });
    if (t > 20.9) {
      dashed(ctx, CS, A2, C.y, P(t, 21.0, 21.6));
      drawRich(ctx, '{my:5}', CS[0] - 16, PL.toS(2, 3.5)[1], { size: 44, align: 'right', alpha: P(t, 21.4, 21.8) });
    }
    ctx.restore();
  }

  // P(5; 5): i due cateti
  const K = PL.toS(5, 1), P55 = PL.toS(5, 5);
  const cat = 1 - P(t, 38.6, 39.0);
  if (t > 29.3 && cat > 0) {
    ctx.save(); ctx.globalAlpha *= cat;
    segmento(ctx, CS, K, C.x, P(t, 29.4, 30.1));
    segmento(ctx, K, P55, C.y, P(t, 30.1, 30.8));
    angoloRetto(ctx, K, -1, 1, P(t, 30.8, 31.2));
    drawRich(ctx, '{mx:3}', PL.toS(3.5, 1)[0], CS[1] + 32, { size: 44, alpha: P(t, 29.9, 30.3) });
    drawRich(ctx, '{my:4}', K[0] + 22, PL.toS(5, 3)[1], { size: 44, align: 'left', alpha: P(t, 30.6, 31.0) });
    ctx.restore();
  }

  // il punto qualunque: i cateti x − 2 e y − 1
  const G = sulCerchio(TH1), GS = PL.toS(...G), K2 = PL.toS(G[0], CY);
  if (t > 54.7) {
    segmento(ctx, CS, K2, C.x, P(t, 54.8, 55.4));
    segmento(ctx, K2, GS, C.y, P(t, 55.4, 56.0));
    angoloRetto(ctx, K2, -1, 1, P(t, 56.0, 56.4));
    drawRich(ctx, '{mx:x − 2}', (CS[0] + K2[0]) / 2 + 12, CS[1] + 30, { size: 40, alpha: P(t, 55.2, 55.6) });
    drawRich(ctx, '{my:y − 1}', K2[0] + 18, PL.toS(0, 2.4)[1], { size: 40, align: 'left', alpha: P(t, 55.8, 56.2) });
  }

  // la traccia: si disegna dietro a P mentre gira, poi resta
  const th = angP(t);
  if (t > GIRO[0]) glowStroke(ctx, t < GIRO[1] ? arco(TH0, Math.max(TH0 + .001, th)) : arco(TH0, TH0 + 2 * Math.PI, 240), 1, C.g, 6);
  // il raggio CP
  const PS = PL.toS(...sulCerchio(th));
  if (t > 33.9) glowStroke(ctx, [CS, PS], P(t, 33.9, 34.6), C.v, 6);

  numeri(ctx, kA, t);

  // i punti
  dot(ctx, A1, C.g, P(t, 17.0, 17.4, E.back), 11);
  dot(ctx, A2, C.g, P(t, 21.0, 21.4, E.back), 11);
  dot(ctx, CS, C.v, P(t, 8.4, 8.8, E.back), 11);
  dot(ctx, PS, mix(C.ink, C.g, P(t, 35.2, 35.6)), P(t, 24.8, 25.2, E.back), 12);

  // le etichette: C sparisce mentre il raggio gira (ci passerebbe sopra)
  const lc = P(t, 8.6, 9.0) * (1 - life(t, 38.7, 44.9, .3, .3));
  drawRich(ctx, '{mv:C}', CS[0] - 28, CS[1] - 30, { size: 44, alpha: lc });
  const l1 = life(t, 17.0, 24.8, .3, .4);
  drawRich(ctx, '{mink:(7; 1)}', A1[0] + 22, A1[1], { size: 40, align: 'left', alpha: l1 });
  drawRich(ctx, '{mink:(2; 6)}', A2[0] + 22, A2[1], { size: 40, align: 'left', alpha: life(t, 21.0, 24.8, .3, .4) });
  drawRich(ctx, '{mink:P(5; 5)}', P55[0] + 20, P55[1] - 36, { size: 40, align: 'left', alpha: life(t, 24.9, 38.9, .3, .3) });
  drawRich(ctx, '{mink:P(x; y)}', GS[0] + 20, GS[1] - 36, { size: 40, align: 'left', alpha: P(t, 51.0, 51.4) });
  ctx.restore();
}

// il riquadro a destra
const PAN = [990, 120, 830, 670], XS = 1040, XC = PAN[0] + PAN[2] / 2;
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAN[0] + 40, y); ctx.lineTo(PAN[0] + PAN[2] - 40, y); ctx.stroke(); ctx.restore();
}
function cornice(ctx, s, x, y, size, al, align = 'left') {   // riquadro verde attorno a una formula
  if (al <= 0) return;
  const w = richW(ctx, s, size), x0 = align === 'left' ? x : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x0 - 18, y - size * .85, w + 36, size * 1.7, 14); ctx.stroke(); ctx.restore();
}
const R2 = '{mink:(}{mx:x − 2}{mink:)² + (}{my:y − 1}{mink:)² = 25}';
const GEN = '{mink:(x − α)² + (y − β)² = r²}', GEN_V = '{mink:(x − α)² + (y − β)² = }{mg:r²}';
function scenePannello(ctx, t) {
  if (t < 7.9 || t > F0 + .3) return;
  const al = life(t, 8.0, F0 + .2, .5, .8);
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, 'centro {mv:C}{mink:(2; 1)}', XS, 195, { size: 44, align: 'left', local: t - 8.2 });
  drawRich(ctx, 'raggio {mink:r = 5}', XS, 265, { size: 44, align: 'left', local: t - 12.0 });
  separa(ctx, 315, P(t, 12.2, 12.6));
  // 1 · la distanza di P(5; 5)
  drawRich(ctx, '{mink:CP = √(3² + 4²) = √25 = }{mg:5}', XS, 390, { size: 46, align: 'left', local: t - 34.0, alpha: 1 - P(t, 49.6, 50.0) });
  // 2 · l'equazione
  drawRich(ctx, '{mink:CP = 5}', XS, 390, { size: 46, align: 'left', local: t - 60.0 });
  drawRich(ctx, '{mink:√((}{mx:x − 2}{mink:)² + (}{my:y − 1}{mink:)²) = 5}', XS, 480, { size: 46, align: 'left', local: t - 64.6 });
  drawRich(ctx, R2, XS, 570, { size: 46, align: 'left', local: t - 69.6 });
  cornice(ctx, R2, XS, 570, 46, P(t, 74.5, 74.9));
  separa(ctx, 630, P(t, 79.7, 80.1));
  const kV = P(t, 85.1, 85.5);
  drawRich(ctx, GEN, XC, 700, { size: 52, local: t - 79.8, alpha: 1 - kV });
  if (kV > 0) drawRich(ctx, GEN_V, XC, 700, { size: 52, alpha: kV });
  drawRich(ctx, '{dim:centro }{mink:C(α; β)}{dim:, raggio }{mink:r}', XC, 760, { size: 32, local: t - 80.2 });
  ctx.restore();
}

// 3 · in una frase (F0–101.4)
function sceneFine(ctx, t) {
  if (t < F0) return;
  const al = 1 - P(t, 99.2, 100.2);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - F0 - .4 });
    drawRich(ctx, 'La circonferenza è fatta dei punti\na distanza {mg:r} dal centro.', W / 2, 290, { size: 66, weight: 600, local: t - F0 - .8, stagger: .09 });
  });
  const pills = [[450, 380, 'il centro', '{mink:C(α; β)}'], [870, 380, 'il raggio', '{mink:r}'], [1380, 560, 'l’equazione', GEN]];
  pills.forEach(([px, w, testa, f], i) => {
    const a = F0 + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 520); ctx.scale(k, k); ctx.translate(-px, -520);
    card(ctx, px - w / 2, 445, w, 150);
    drawRich(ctx, testa, px, 486, { size: 30, weight: 400 });
    drawRich(ctx, f, px, 548, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'L’equazione della circonferenza', durata: 106.6, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 49.8, 'i punti a distanza 5'], [49.8, FINE, 'l’equazione']],
    scena(ctx, t) { const s = tm(t); sceneIntro(ctx, s); scenePiano(ctx, s); scenePannello(ctx, s); sceneFine(ctx, s); },
  };
});
