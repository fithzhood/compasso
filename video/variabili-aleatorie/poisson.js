'use strict';
/* Gli eventi rari — in media 2 chiamate all'ora: l'ora divisa in n pezzi, una chiamata per pezzo con p = 2/n;
   le binomiali con n = 10, 50, 1000 (n · p = 2 sempre) si posano sulla distribuzione di Poisson di λ = 2;
   P(X = 0) passa da ≈ 0,107 a ≈ 0,130 e ≈ 0,135, e per Poisson vale e⁻² ≈ 0,135. Argomento: variabili-aleatorie. */
CVIDEO.registra('variabili-aleatorie/poisson', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, fixedNum, dot, card } = M;

const FINE = 88.0, DUR = 100.0;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [22.1, 'felice'], [24.6, 'neutro'], [37.9, 'sorpreso'], [40.2, 'neutro'], [48.3, 'felice'], [50.6, 'neutro'],
  [58.1, 'felice'], [60.4, 'neutro'], [62.9, 'festa'], [65.2, 'neutro'], [76.6, 'felice'], [79.0, 'neutro'],
  [82.3, 'felice'], [84.6, 'neutro'], [FINE + 1.0, 'felice'], [FINE + 7.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.4, 'In media 2 chiamate all’ora:\nquante in un’ora qualunque?'],
  // 1 · dieci pezzi da 6 minuti: una binomiale
  [7.9, 12.4, 'Divido l’ora in {mink:n = 10} pezzi\nda 6 minuti l’uno.'],
  [12.6, 17.6, 'In ogni pezzo arriva una chiamata\ncon probabilità {mink:p = 0,2}.'],
  [17.8, 21.9, 'Per esempio così: una chiamata\nin 2 pezzi su 10.'],
  [22.1, 27.3, 'La media è {mink:E(X) = n · p = 2}:\nle 2 chiamate all’ora.'],
  [27.5, 32.9, 'Il numero di chiamate {mink:X} è {v:binomiale}:\nuna barra per ogni valore {mink:k}.'],
  [33.1, 37.7, 'Nessuna chiamata:\n{mink:P(X = 0) ≈ 0,107}.'],
  // 2 · pezzi più corti
  [37.9, 40.9, 'In 6 minuti\nne arrivano due…'],
  [41.1, 44.2, '…pezzi più corti:\n{mink:n = 50}.'],
  [44.4, 48.3, 'Ora {mink:p = 0,04}, e la media resta\n{mink:n · p = 50 · 0,04 = 2}.'],
  [48.5, 52.5, 'Le barre si spostano appena:\n{mink:P(X = 0) ≈ 0,130}.'],
  [52.7, 57.9, 'Ancora più corti: {mink:n = 1000}\ne {mink:p = 0,002}.'],
  [58.1, 62.7, 'Ora le barre quasi non si muovono:\n{mink:P(X = 0) ≈ 0,135}.'],
  // 3 · la distribuzione di Poisson
  [62.9, 67.2, 'Si posano su una forma precisa:\nla {v:distribuzione di Poisson}.'],
  [67.4, 71.6, 'Le basta la media, {mink:λ = E(X)}:\nqui {mink:λ = 2}.'],
  [71.8, 76.4, 'Ogni barra viene da questa formula,\ncon {mink:k!}, il fattoriale di {mink:k}.'],
  [76.6, 82.1, 'Con {mink:k = 0}:\n{mink:P(X = 0) = e⁻² ≈ 0,135}.'],
  [82.3, 87.4, 'Per questo Poisson descrive gli\n{v:eventi rari}: guasti, errori, chiamate.'],
  // chiusura
  [FINE + 1.0, DUR - 3.0, 'Tante prove e {mink:p} piccola:\nconta solo la media {mink:λ}.'],
];

// ---- i numeri: binomiali con n · p = 2 e la Poisson di λ = 2 (k da 0 a 8) ----
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
const BIN = n => { const p = 2 / n, a = []; for (let k = 0; k <= 8; k++) a.push(binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)); return a; };
const FATT = k => k ? k * FATT(k - 1) : 1;
const B10 = BIN(10), B50 = BIN(50), B1000 = BIN(1000);
const POI = []; for (let k = 0; k <= 8; k++) POI.push(Math.pow(2, k) / FATT(k) * Math.exp(-2));
// le barre: n = 10, poi 50 (48,4–49,4), poi 1000 (58,2–59,0)
function barre(t) {
  const k1 = P(t, 48.4, 49.4), k2 = P(t, 58.2, 59.0);
  return B10.map((v, k) => lerp(lerp(v, B50[k], k1), B1000[k], k2));
}

// ---- la striscia dell'ora ----
const SX0 = 230, SX1 = 1050, SY = 200, SH = 56, SW = SX1 - SX0;
const CHIAMATE = [.27, .71], OMBRA = .745;   // OMBRA: la seconda chiamata negli stessi 6 minuti
// gli n dei pezzi: 10 da 8,6; 50 da 39,8; 1000 da 53,2 (passaggi a dissolvenza)
const N_TAPPE = [[10, 8.6, 9.4], [50, 41.2, 42.0], [1000, 53.2, 54.0]];
// ---- l'istogramma ----
const CARD = [110, 110, 1060, 690], PAN = [1200, 110, 610, 690];
const XK = k => 250 + k * 96, AY = 730, HS = 1400, BW = 70;

function rett(ctx, x, y, w, h, r, riempi, bordo, lw) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (riempi) { ctx.fillStyle = riempi; ctx.fill(); }
  if (bordo) { ctx.strokeStyle = bordo; ctx.lineWidth = lw || 3; ctx.stroke(); }
}

// ---- formule con potenze e frazioni, disegnate qui ----
// pezzi: testo ricco | { pow: [base, esponente] } | { frac: [numeratore (testo o pow), denominatore] }
function largo(ctx, it, s) {
  if (typeof it === 'string') return richW(ctx, it, s);
  if (it.pow) return richW(ctx, it.pow[0], s) + richW(ctx, it.pow[1], s * .75) + s * .1;
  if (it.frac) return Math.max(largo(ctx, it.frac[0], s), richW(ctx, it.frac[1], s)) + s * .35;
  return 0;
}
function pezzo(ctx, it, x, cy, s) {
  if (typeof it === 'string') { drawRich(ctx, it, x, cy, { size: s, align: 'left' }); return; }
  if (it.pow) {
    const wb = richW(ctx, it.pow[0], s);
    drawRich(ctx, it.pow[0], x, cy, { size: s, align: 'left' });
    drawRich(ctx, it.pow[1], x + wb + s * .04, cy - s * .48, { size: s * .75, align: 'left' });
    return;
  }
  const w = largo(ctx, it, s), xm = x + w / 2, wn = largo(ctx, it.frac[0], s);
  pezzo(ctx, it.frac[0], xm - wn / 2, cy - s * .66, s);
  drawRich(ctx, it.frac[1], xm, cy + s * .7, { size: s });
  ctx.save(); ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2, s * .055); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x + s * .08, cy + s * .04); ctx.lineTo(x + w - s * .08, cy + s * .04); ctx.stroke(); ctx.restore();
}
function formula(ctx, items, cx, cy, s, o) {
  o = o || {};
  const al = o.alpha != null ? o.alpha : 1; if (al <= .002) return;
  const local = o.local != null ? o.local : 99, gap = s * .2;
  const ws = items.map(it => largo(ctx, it, s)), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - tot / 2;
  items.forEach((it, i) => {
    const k = P(local - i * .25, 0, .5, E.out);
    if (k > 0) { ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 14); pezzo(ctx, it, x, cy, s); ctx.restore(); }
    x += ws[i] + gap;
  });
}
const POISSON = ['{mink:P(X = k) =}', { frac: [{ pow: ['{mink:λ}', '{mink:k}'] }, '{mink:k!}'] }, '{mink:·}', { pow: ['{mink:e}', '{mink:−λ}'] }];

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Gli eventi rari', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// pesi dei tre n (dissolvenza ai passaggi)
function pesiN(t) {
  const a = P(t, 41.2, 42.0), b = P(t, 53.2, 54.0);
  return [1 - a, a * (1 - b), b];
}
// 1–3 · la striscia dell'ora (7.5–FINE)
function sceneStriscia(ctx, t) {
  const al = P(t, 7.7, 8.3) * (1 - P(t, FINE - .6, FINE + .2));
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{dim:un’ora}', SX0, SY - SH / 2 - 26, { size: 32, align: 'left' });
  rett(ctx, SX0, SY - SH / 2, SW, SH, 8, css(C.ink, .04), null);
  const w = pesiN(t);
  // i pezzi con una chiamata
  const kc = P(t, 18.0, 18.5);
  if (kc > 0) {
    N_TAPPE.forEach(([n], j) => {
      if (w[j] <= 0) return;
      CHIAMATE.forEach(T => {
        const i = Math.floor(T * n);
        ctx.save(); ctx.globalAlpha *= kc * w[j]; ctx.fillStyle = css(C.v, .3);
        ctx.fillRect(SX0 + SW * i / n, SY - SH / 2, Math.max(2, SW / n), SH); ctx.restore();
      });
    });
  }
  // la chiamata in più negli stessi 6 minuti: un cerchio rosso tratteggiato (37,9–43,7)
  const ko = life(t, 38.0, 44.2, .4, .4);
  if (ko > 0) {
    ctx.save(); ctx.globalAlpha *= ko;
    const n = w[0] > .5 ? 10 : 50, i = Math.floor(OMBRA * n);
    ctx.fillStyle = css(C.r, .18); ctx.fillRect(SX0 + SW * i / n, SY - SH / 2, SW / n, SH);
    ctx.strokeStyle = css(C.r); ctx.lineWidth = 3; ctx.strokeRect(SX0 + SW * i / n, SY - SH / 2, SW / n, SH);
    ctx.restore();
    // finché i pezzi sono da 6 minuti, la scritta sopra il pezzo con due chiamate
    drawRich(ctx, '{r:due in 6 minuti}', SX0 + SW * .75, SY - SH / 2 - 26, { size: 30, alpha: ko * (1 - P(t, 41.0, 41.4)) });
  }
  // le divisioni: n = 10, poi i tagli in più di n = 50 e n = 1000
  const tagli = (n, passo, a, lw, op) => {
    if (a <= 0) return;
    ctx.save(); ctx.strokeStyle = css(C.ink, op * a); ctx.lineWidth = lw; ctx.beginPath();
    for (let i = 1; i < n; i++) { if (passo && i % passo === 0) continue; const x = SX0 + SW * i / n; ctx.moveTo(x, SY - SH / 2); ctx.lineTo(x, SY + SH / 2); }
    ctx.stroke(); ctx.restore();
  };
  tagli(10, 0, P(t, 8.6, 9.4), 2.5, .6);
  tagli(50, 5, P(t, 41.2, 42.0), 1.5, .45);
  tagli(1000, 20, P(t, 53.2, 54.0), .6, .3);
  rett(ctx, SX0, SY - SH / 2, SW, SH, 8, null, css(C.ink, .55), 3);
  // le chiamate, sopra a tutto
  CHIAMATE.forEach((T, i) => dot(ctx, [SX0 + T * SW, SY], C.v, P(t, 18.0 + i * .3, 18.4 + i * .3, E.back), 9));
  if (ko > 0) { ctx.save(); ctx.globalAlpha *= ko; dot(ctx, [SX0 + OMBRA * SW, SY], C.r, P(t, 38.0, 38.4, E.back), 9); ctx.restore(); }
  // sotto la striscia: gli estremi e quanto è lungo un pezzo
  drawRich(ctx, '{dim:0}', SX0, SY + SH / 2 + 34, { size: 30 });
  drawRich(ctx, '{dim:60 min}', SX1, SY + SH / 2 + 34, { size: 30 });
  // le scritte sotto la striscia non si sovrappongono mai: prima esce una, poi entra l'altra
  const u1 = P(t, 41.2, 41.6), u2 = P(t, 53.2, 53.6), u3 = P(t, 82.4, 82.7);
  const cap = [['{mink:10}{dim: pezzi da 6 minuti}', P(t, 8.6, 9.2) * (1 - u1)],
    ['{mink:50}{dim: pezzi da 1,2 minuti}', P(t, 41.6, 42.0) * (1 - u2)],
    ['{mink:1000}{dim: pezzi da 3,6 secondi}', P(t, 53.6, 54.0) * (1 - u3)],
    ['{dim:tante prove, ognuna con }{mink:p}{dim: piccola}', P(t, 82.7, 83.0)]];
  cap.forEach(([s, a]) => drawRich(ctx, s, (SX0 + SX1) / 2, SY + SH / 2 + 34, { size: 32, alpha: a }));
  ctx.restore();
}

// 1–3 · l'istogramma (27.5–FINE)
function sceneIsto(ctx, t) {
  if (t < 27.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .6, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  const ka = P(t, 27.6, 28.1);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka; ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(XK(-.6), AY); ctx.lineTo(XK(8.6), AY); ctx.stroke();
    for (let k = 0; k <= 8; k++) drawRich(ctx, `{mink:${k}}`, XK(k), AY + 34, { size: 36 });
    drawRich(ctx, '{mink:k}', XK(8.95), AY + 34, { size: 40, align: 'left' });
    ctx.restore();
  }
  const d = barre(t), kz = life(t, 33.3, 37.7, .4, .4);
  d.forEach((v, k) => {
    const kb = P(t, 27.8 + k * .15, 28.4 + k * .15, E.out); if (kb <= 0) return;
    const h = HS * v * kb;
    rett(ctx, XK(k) - BW / 2, AY - h, BW, h, 4, css(C.y, .24), css(C.y, .9), 2.5);
    if (k === 0 && kz > 0) rett(ctx, XK(k) - BW / 2, AY - h, BW, h, 4, css(C.v, .25 * kz), css(C.v, kz), 4);
  });
  // la Poisson: contorni verdi
  POI.forEach((v, k) => {
    const kp = P(t, 63.1 + k * .1, 63.6 + k * .1, E.out); if (kp <= 0) return;
    ctx.save(); ctx.globalAlpha *= kp;
    const h = HS * v;
    ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(XK(k) - BW / 2 - 5, AY); ctx.lineTo(XK(k) - BW / 2 - 5, AY - h); ctx.lineTo(XK(k) + BW / 2 + 5, AY - h); ctx.lineTo(XK(k) + BW / 2 + 5, AY); ctx.stroke();
    ctx.restore();
  });
  ctx.restore();
}

// la scheda di destra: i numeri, poi la Poisson (8.4–FINE)
const PX = PAN[0] + PAN[2] / 2, LX = 1245, RX = 1765;
function riga(ctx, nome, val, y, col, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  if (nome) drawRich(ctx, nome, LX, y, { size: 44, align: 'left' });
  if (val) fixedNum(ctx, val, RX, y, 44, col);
  ctx.restore();
}
// un valore che cambia: il vecchio esce, poi entra il nuovo
const cambia = (t, a) => [1 - P(t, a, a + .3), P(t, a + .3, a + .6)];
function scenePannello(ctx, t) {
  const al = life(t, 8.4, FINE + .2, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  // quando arriva la Poisson, la parte della binomiale esce
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 62.9, 63.4);
  conFont(TITOLI, () => drawRich(ctx, 'binomiale', PX, 160, { size: 38, weight: 600, local: t - 27.6 }));
  // n
  const [n1, n2] = cambia(t, 41.2), [n3, n4] = cambia(t, 53.2);
  riga(ctx, '{mink:n =}', null, 220, C.ink, P(t, 8.6, 9.0));
  riga(ctx, null, '10', 220, C.ink, P(t, 8.6, 9.0) * n1);
  riga(ctx, null, '50', 220, C.ink, n2 * n3);
  riga(ctx, null, '1000', 220, C.ink, n4);
  // p: sparisce quando cambiano i pezzi, torna quando Ada lo dice
  const pv = P(t, 12.8, 13.2) * (1 - P(t, 41.2, 41.5)), p50 = P(t, 44.5, 44.9) * n3;
  riga(ctx, '{mink:p =}', null, 285, C.x, Math.max(pv, p50, n4));
  riga(ctx, null, '0,2', 285, C.x, pv);
  riga(ctx, null, '0,04', 285, C.x, p50);
  riga(ctx, null, '0,002', 285, C.x, n4);
  // n · p
  riga(ctx, '{mink:E(X) = n · p =}', '2', 350, C.v, P(t, 22.3, 22.7));
  // P(X = 0): esce coi pezzi nuovi, torna con le barre nuove
  const z1 = P(t, 33.3, 33.7) * (1 - P(t, 41.2, 41.5)), z2 = P(t, 48.6, 49.0) * (1 - P(t, 53.2, 53.5)), z3 = P(t, 58.4, 58.8);
  riga(ctx, '{mink:P(X = 0) ≈}', null, 415, C.g, Math.max(z1, z2, z3));
  riga(ctx, null, '0,107', 415, C.g, z1);
  riga(ctx, null, '0,130', 415, C.g, z2);
  riga(ctx, null, '0,135', 415, C.g, z3);
  ctx.restore();
  // la Poisson, al posto della binomiale
  if (t > 63.3) conFont(TITOLI, () => drawRich(ctx, 'distribuzione di {g:Poisson}', PX, 170, { size: 40, weight: 600, local: t - 63.4 }));
  if (t > 67.5) drawRich(ctx, '{mink:λ = E(X) = n · p = 2}', PX, 265, { size: 48, local: t - 67.6 });
  if (t > 71.9) formula(ctx, POISSON, PX, 405, 52, { local: t - 72.0 });
  if (t > 76.7) {
    drawRich(ctx, '{mink:P(X = 0) = e⁻² ≈ }{mg:0,135}', PX, 545, { size: 46, local: t - 76.8 });
    drawRich(ctx, '{dim:perché }{mink:2⁰ = 1}{dim: e }{mink:0! = 1}', PX, 608, { size: 32, local: t - 78.0 });
    const kb = P(t, 79.0, 79.5);
    if (kb > 0) {
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(PAN[0] + 40, 660); ctx.lineTo(PAN[0] + PAN[2] - 40, 660); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, '{dim:la binomiale con }{mink:n = 1000}{dim::}', PX, 708, { size: 32, local: t - 79.1 });
    drawRich(ctx, '{mink:P(X = 0) ≈ 0,135}', PX, 758, { size: 40, local: t - 79.5 });
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Tante prove, probabilità piccola:\nconta solo la media {mink:λ}.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[455, '{dim:la media}', 225], [960, '{dim:la distribuzione di Poisson}', 255], [1465, '{dim:nessun evento}', 225]];
  pills.forEach(([x, testa, mw], i) => {
    const a = FINE + 2.4 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - mw, 445, 2 * mw, 215);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) drawRich(ctx, '{mink:λ = E(X) = n · p}', x, 570, { size: 40 });
    if (i === 1) formula(ctx, POISSON, x, 575, 40);
    if (i === 2) drawRich(ctx, '{mink:P(X = 0) = e⁻²}\n{mink:≈ 0,135}', x, 570, { size: 40, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.3], ['traccia', 8.6, 9.4], ['pop', 8.8, .4],    // la striscia dell'ora, i 10 pezzi
    ['pop', 12.9, .5],                                                                   // p = 0,2
    ['pop', 18.1, .45], ['pop', 18.4, .7],                                               // le due chiamate
    ['pop', 22.4, .6], ['ding', 22.8],                                                   // n · p = 2
    ['soffio', 27.6], ['traccia', 27.6, 28.1],
    ['tono', 27.8, 29.6, [.36, .89, 1, .67, .29, .09, .02, 0, 0]],                      // le barre crescono
    ['pop', 33.4, .35],                                                                  // P(X = 0)
    ['pop', 38.1, .3], ['traccia', 41.2, 42.0],                                          // la chiamata in più; 50 pezzi
    ['pop', 44.6, .4],                                                                   // p = 0,04
    ['tono', 48.4, 49.4, [.36, .43]], ['pop', 48.7, .5],                                 // le barre si spostano; 0,130
    ['traccia', 53.2, 54.0], ['pop', 53.6, .3],                                          // 1000 pezzi
    ['tono', 58.2, 59.0, [.43, .45]], ['pop', 58.5, .55],                                // quasi ferme; 0,135
    ['soffio', 63.0], ['traccia', 63.1, 64.4],                                           // la Poisson
    ['pop', 67.7, .6], ['pop', 72.1, .6],                                                // λ = 2, la formula
    ['ding', 77.2], ['pop', 78.1, .3],                                                   // e⁻² ≈ 0,135
    ['soffio', 82.4],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Gli eventi rari', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 37.7, 'pezzi da 6 minuti'], [37.7, 62.7, 'pezzi più corti'], [62.7, FINE, 'la distribuzione di Poisson']],
    scena(ctx, t) {
      if (t > 7.4 && t < FINE + .4) card(ctx, ...CARD, P(t, 7.5, 8.2) * (1 - P(t, FINE - .6, FINE + .2)));
      sceneIntro(ctx, t); sceneStriscia(ctx, t); sceneIsto(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t);
    },
  };
});
