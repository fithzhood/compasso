'use strict';
/* Le progressioni aritmetiche — a ogni passo si aggiunge la stessa ragione d: le colonne fanno una scala;
   il termine generale aₙ = a₁ + (n − 1)d; con d negativo la scala scende. Argomento: successioni. */
CVIDEO.registra('successioni/aritmetiche', M => {
  const { W, C, E, P, life, clamp, lerp, css, TITOLI, conFont, drawRich, richW, card } = M;

const FINE = 81.8, DUR = 93.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [24.4, 'felice'], [26.6, 'neutro'], [44.8, 'pensa'], [47.0, 'neutro'],
  [58.1, 'felice'], [61.8, 'festa'],
  [65.2, 'sorpreso'], [67.3, 'neutro'], [77.4, 'felice'], [79.5, 'neutro'],
  [FINE, 'neutro'], [84.2, 'felice'], [89.0, 'occhiolino'],
];
// una frase per ogni cosa che succede; le colonne si alzano fra un fumetto e l'altro
const FUMETTI = [
  [2.4, 6.4, 'E se a ogni passo aggiungi\nsempre {g:lo stesso numero}?'],
  // 1 · la scala
  [8.4, 12.3, 'Il primo termine è {mink:a₁ = 2}:\nuna colonna alta 2.'],
  [13.7, 17.2, 'Il secondo è 3 in più:\n{mink:a₂ = 5}.'],
  [18.6, 21.8, 'Il terzo: ancora {v:+3},\n{mink:a₃ = 8}.'],
  [24.4, 28.7, 'E così via: ogni gradino\nè alto {v:3}. È una {g:scala}.'],
  [28.8, 32.9, 'Quel numero fisso si chiama\n{v:ragione}, e si scrive {mv:d}.'],
  [33.0, 37.2, 'È la differenza fra un termine\ne il {g:precedente}: {mink:5 − 2 = 3}.'],
  [37.3, 40.8, '{mink:aₙ} è il termine al posto {mx:n}.'],
  [40.9, 44.6, 'Ogni termine è il precedente\n{g:più} {mv:d}.'],
  // 2 · il termine generale
  [44.8, 48.6, 'E {mink:a₁₀}? Senza salire\n{g:un gradino alla volta}?'],
  [49.4, 53.6, 'La colonna 6 è {mink:a₁}\npiù {g:5} gradini da 3.'],
  [53.7, 58.0, 'Da {mink:a₁} ad {mink:aₙ} i gradini\nsono {mink:n − 1}: uno in meno.'],
  [58.1, 61.7, 'Ecco il termine generale:\n{mink:aₙ = a₁ + (n − 1)d}.'],
  [61.8, 65.0, 'Per esempio\n{mink:a₁₀ = 2 + 9 · 3 = 29}.'],
  // 3 · d negativo
  [67.2, 71.2, 'Ora parto da {mink:a₁ = 20}\ne {r:tolgo} 3: {mink:a₂ = 17}.'],
  [73.9, 77.3, 'Ogni passo toglie 3:\n{mv:d}{mink: = −3}.'],
  [77.4, 81.2, 'Con {mv:d} negativo la scala {r:scende}:\nla progressione cala.'],
  // chiusura
  [83.8, 90.6, 'Progressione aritmetica: si aggiunge\nsempre la stessa {v:ragione} {mv:d}.'],
];

const CARD_L = [150, 110, 1000, 690], CARD_R = [1210, 110, 640, 690];
// le colonne: 26 px per unità; la colonna n sta in cx(n)
const GY = 700, SY = 26, CW = 90;
const cx = n => 260 + (n - 1) * 150;
const yv = v => GY - v * SY;

// formula con un pedice composto (aₙ₊₁): pezzi di testo ricco e {p: 'n+1'} per il pedice,
// che ha la stessa grandezza e la stessa discesa dei pedici di drawRich
function fp(ctx, parts, x, y, size, o = {}) {
  const k = o.local === undefined ? 1 : P(o.local, 0, .5, E.out), al = (o.alpha ?? 1) * k;
  if (al <= 0.002) return;
  const ps = size * .76 / 1.12;
  const w = parts.map(p => typeof p === 'string' ? richW(ctx, p, size) : richW(ctx, `{${p.k || 'mink'}:${p.p}}`, ps));
  const tot = w.reduce((a, b) => a + b, 0);
  let x0 = o.align === 'left' ? x : o.align === 'right' ? x - tot : x - tot / 2;
  ctx.save(); ctx.globalAlpha *= al; ctx.translate(0, (1 - k) * 16);
  parts.forEach((p, i) => {
    if (typeof p === 'string') drawRich(ctx, p, x0, y, { size, align: 'left' });
    else drawRich(ctx, `{${p.k || 'mink'}:${p.p}}`, x0, y + size * .26, { size: ps, align: 'left' });
    x0 += w[i];
  });
  ctx.restore();
}
function blocco(ctx, x, y0, y1, col, al, tratt = false) {   // rettangolo largo CW fra le quote y0 (sotto) e y1 (sopra)
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  if (!tratt) { ctx.fillStyle = css(col, .2); ctx.fillRect(x - CW / 2, y1, CW, y0 - y1); }
  ctx.strokeStyle = css(col); ctx.lineWidth = 3; if (tratt) ctx.setLineDash([10, 8]);
  ctx.strokeRect(x - CW / 2, y1, CW, y0 - y1);
  ctx.restore();
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Progressioni aritmetiche', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · la scala: a₁ = 2, d = 3. La colonna n è il blocco a₁ più n − 1 gradini da 3.
// Ogni colonna nasce come copia della precedente, poi le cade sopra un gradino nuovo.
const COPIA = [null, null, [12.4, 12.9], [17.3, 17.8], [21.9, 22.3], [22.75, 23.15], [23.6, 24.0]];
const CADE = [null, [7.7, 8.3], [13.0, 13.6], [17.9, 18.5], [22.3, 22.7], [23.15, 23.55], [24.0, 24.4]];
const valA = n => 2 + 3 * (n - 1);
function colonnaA(ctx, x, n, nuovo, al, etich) {   // base e gradini 1 … n − 1; il gradino n − 1 scende di «nuovo» px
  blocco(ctx, x, GY, yv(2), C.x, al);
  if (etich.base > 0) drawRich(ctx, '{mink:2}', x, yv(1), { size: 34, alpha: al * etich.base });
  for (let j = 1; j < n; j++) {
    const dy = j === n - 1 ? nuovo.dy : 0, a = j === n - 1 ? nuovo.al : 1;
    blocco(ctx, x, yv(valA(j)) + dy, yv(valA(j + 1)) + dy, C.v, al * a);
    const ym = yv(valA(j) + 1.5) + dy;
    drawRich(ctx, '{mv:+3}', x, ym, { size: 32, alpha: al * a * (j === n - 1 ? etich.piu : 1) });
  }
}
// la scheda a destra: la ragione e la regola, poi il termine generale, poi d negativo
function sceneScheda(ctx, t) {
  const ca = life(t, 28.6, FINE, .5, .6);
  if (ca <= 0) return;
  card(ctx, ...CARD_R, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const XC = 1530;
  const aA = 1 - P(t, 44.6, 45.0);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    conFont(TITOLI, () => drawRich(ctx, 'la ragione', XC, 170, { size: 38, weight: 600, local: t - 28.9 }));
    drawRich(ctx, '{mv:d}{mink: = 3}', XC, 255, { size: 64, local: t - 29.1 });
    drawRich(ctx, '{mv:d}{mink: = a₂ − a₁ = 5 − 2 = 3}', XC, 350, { size: 44, local: t - 33.1 });
    ctx.save(); ctx.globalAlpha *= P(t, 37.3, 37.6);
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 415); ctx.lineTo(1810, 415); ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{mink:a}{mx:ₙ}{ink:: termine al posto }{mx:n}', XC, 475, { size: 40, local: t - 37.4 });
    const L = 1340;
    fp(ctx, ['{mink:a}', { p: 'n+1' }, '{mink: = aₙ + }{mv:d}'], L, 590, 60, { align: 'left', local: t - 41.0 });
    const kc = P(t, 41.5, 41.9);
    if (kc > 0) {
      ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.lineCap = 'round';
      // una graffa sotto tutto il simbolo aₙ₊₁ (la a e il suo pedice)
      const wS = richW(ctx, '{mink:a}', 60) + richW(ctx, '{mink:n+1}', 60 * .76 / 1.12), xm = L + wS / 2;
      ctx.beginPath(); ctx.moveTo(L, 634); ctx.lineTo(L, 642); ctx.lineTo(L + wS, 642); ctx.lineTo(L + wS, 634);
      ctx.moveTo(xm, 642); ctx.lineTo(xm, 654); ctx.stroke(); ctx.restore();
      drawRich(ctx, '{dim:il termine dopo }{mink:aₙ}', xm, 686, { size: 32, alpha: kc });
    }
    ctx.restore();
  }
  const aB = life(t, 44.8, 65.4, .3, .4);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    drawRich(ctx, '{mink:a₁₀ = ?}', XC, 190, { size: 56, local: t - 44.9 });
    drawRich(ctx, '{mink:a₆ = 2 + 5 · 3 = 17}', XC, 300, { size: 46, local: t - 49.6 });
    drawRich(ctx, '{dim:da }{mink:a₁}{dim: ad }{mink:aₙ}{dim:: }{mink:n − 1}{dim: gradini}', XC, 400, { size: 40, local: t - 53.8 });
    const sF = '{mink:aₙ = a₁ + (n − 1)}{mv:d}';
    drawRich(ctx, sF, XC, 520, { size: 56, local: t - 58.2 });
    const kb = P(t, 58.8, 59.3);
    if (kb > 0) {
      const w = richW(ctx, sF, 56);
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XC - w / 2 - 24, 520 - 48, w + 48, 96, 14); ctx.stroke(); ctx.restore();
    }
    drawRich(ctx, '{mink:a₁₀ = 2 + 9 · 3 = }{mg:29}', XC, 660, { size: 46, local: t - 61.9 });
    ctx.restore();
  }
  if (t > 67.0) {
    drawRich(ctx, '{mink:a₁ = 20}', XC, 200, { size: 56, local: t - 67.3 });
    drawRich(ctx, '{mink:a₂ = 20 − 3 = 17}', XC, 300, { size: 46, local: t - 68.2 });
    drawRich(ctx, '{mv:d}{mink: = −3}', XC, 430, { size: 64, local: t - 74.0 });
    drawRich(ctx, '{mv:d}{mink: < 0}', XC, 570, { size: 52, local: t - 77.5 });
    drawRich(ctx, '{r:la progressione cala}', XC, 650, { size: 36, local: t - 77.8 });
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
    drawRich(ctx, 'In una progressione aritmetica si aggiunge\nsempre lo stesso numero, la {v:ragione}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[400, '{dim:a ogni passo}'], [960, '{dim:il termine generale}'], [1520, '']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 240, 445, 480, 150);
    if (testa) drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    if (i === 0) fp(ctx, ['{mink:a}', { p: 'n+1' }, '{mink: = aₙ + }{mv:d}'], x, 545, 44);
    if (i === 1) drawRich(ctx, '{mink:aₙ = a₁ + (n − 1)}{mv:d}', x, 545, { size: 44 });
    if (i === 2) drawRich(ctx, '{mv:d}{mink: > 0}{ink:  cresce}\n{mv:d}{mink: < 0}{ink:  cala}', x, 520, { size: 40, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

const valD = n => 20 - 3 * (n - 1);
const COPIA_D = [null, null, [66.2, 66.6], [71.3, 71.6], [71.95, 72.25], [72.6, 72.9], [73.25, 73.55]];
const TAGLIO = [null, null, [66.7, 67.1], [71.6, 71.9], [72.25, 72.55], [72.9, 73.2], [73.55, 73.85]];
function sceneColonne(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .5, .6);
  card(ctx, ...CARD_L, al);
  ctx.save(); ctx.globalAlpha *= al;
  // la linea di base
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(190, GY); ctx.lineTo(1110, GY); ctx.stroke();
  // nomi dei termini sotto le colonne: dal posto n in poi il pedice diventa azzurro
  const kn = P(t, 37.4, 37.9);
  const aA = 1 - P(t, 65.0, 65.5);   // la scala crescente esce quando arriva quella che scende
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    const dim = P(t, 48.7, 49.3);   // tutto in secondo piano tranne la colonna 6
    const dim2 = life(t, 33.1, 37.2, .4, .4);   // la differenza: in primo piano a₁ e a₂
    for (let n = 1; n <= 6; n++) {
      const [c0, c1] = COPIA[n] || [0, 0], [d0, d1] = CADE[n];
      if (t < (COPIA[n] ? c0 : d0)) continue;
      const kc = COPIA[n] ? P(t, c0, c1, E.io) : 1, kd = P(t, d0, d1, E.out);
      const x = lerp(cx(n - 1 || 1), cx(n), kc);
      const a = (n === 6 ? 1 : 1 - .7 * dim) * (n >= 3 ? 1 - .7 * dim2 : 1) * (COPIA[n] ? P(t, c0, c0 + .25) : 1);
      const piu = P(t, d1, d1 + .3), tre = n === 6 ? P(t, 49.0, 49.4) : 0;
      if (n === 1) {   // la prima colonna cresce dalla base
        ctx.save(); ctx.beginPath(); ctx.rect(x - CW, yv(2) + (1 - kd) * 2 * SY - 2, 2 * CW, 2 * SY + 4); ctx.clip();
        colonnaA(ctx, x, 1, { dy: 0, al: 1 }, a, { base: tre, piu: 0 });
        ctx.restore();
      } else colonnaA(ctx, x, n, { dy: -70 * (1 - kd), al: kd }, a, { base: tre, piu });
      const kv = P(t, d1, d1 + .3);
      drawRich(ctx, String(valA(n)), cx(n), yv(valA(n)) - 34, { size: 44, weight: 600, alpha: kv * a });
      const ki = COPIA[n] ? P(t, c1, c1 + .3) : P(t, d0, d1);
      drawRich(ctx, `{mink:a}{mink:${'₀₁₂₃₄₅₆'[n]}}`, cx(n), GY + 46, { size: 40, alpha: ki * a * (1 - kn) });
      drawRich(ctx, `{mink:a}{mx:${'₀₁₂₃₄₅₆'[n]}}`, cx(n), GY + 46, { size: 40, alpha: ki * a * kn });
    }
    // i 5 gradini della colonna 6, contati uno per uno alla sua destra
    for (let j = 1; j <= 5; j++) {
      const k = P(t, 49.4 + (j - 1) * .12, 49.7 + (j - 1) * .12);
      if (k > 0) drawRich(ctx, `{g:${j}}`, cx(6) + CW / 2 + 24, yv(valA(j) + 1.5), { size: 32, weight: 600, alpha: k });
    }
    ctx.restore();
  }
  // 3 · a₁ = 20, d = −3: ogni colonna è la copia della precedente, poi le si toglie il pezzo di 3 in cima
  if (t > 65.3) {
    for (let n = 1; n <= 6; n++) {
      const v = valD(n);
      if (n === 1) {
        const k = P(t, 65.5, 66.1, E.out);
        if (k > 0) blocco(ctx, cx(1), GY, GY - v * SY * k, C.x, 1);
        drawRich(ctx, String(v), cx(1), yv(v) + 34, { size: 40, weight: 600, alpha: P(t, 66.0, 66.3) });
      } else {
        const [c0, c1] = COPIA_D[n], [d0, d1] = TAGLIO[n];
        if (t < c0) continue;
        const kc = P(t, c0, c1, E.io), kt = P(t, d0, d1), x = lerp(cx(n - 1), cx(n), kc), a = P(t, c0, c0 + .2);
        blocco(ctx, x, GY, yv(v), C.x, a);
        blocco(ctx, x, yv(v), yv(v + 3), C.x, a * (1 - kt));
        blocco(ctx, x, yv(v), yv(v + 3), C.r, a * kt, true);
        drawRich(ctx, '{mr:−3}', x, yv(v + 1.5), { size: 32, alpha: kt });
        drawRich(ctx, String(v), cx(n), yv(v) + 34, { size: 40, weight: 600, alpha: P(t, d1, d1 + .3) });
      }
      const ki = n === 1 ? P(t, 65.5, 66.0) : P(t, COPIA_D[n][1], COPIA_D[n][1] + .3);
      drawRich(ctx, `{mink:a}{mx:${'₀₁₂₃₄₅₆'[n]}}`, cx(n), GY + 46, { size: 40, alpha: ki });
    }
  }
  ctx.restore();
}

  return {
    titolo: 'Progressioni aritmetiche', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 44.6, 'la scala'], [44.6, 65.0, 'il termine generale'], [65.0, FINE, 'se {mv:d} è negativo']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneColonne(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
