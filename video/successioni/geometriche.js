'use strict';
/* Le progressioni geometriche — a ogni passo si moltiplica per la stessa ragione q: con q = 2 ogni colonna è il doppio
   della precedente e i salti crescono; il termine generale aₙ = a₁ · qⁿ⁻¹; con q = 1/2 i termini calano verso 0. Argomento: successioni. */
CVIDEO.registra('successioni/geometriche', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, drawSeq, card, arrowHead } = M;

const FINE = 82.5, DUR = 94.2;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [24.7, 'sorpreso'], [26.8, 'neutro'], [37.7, 'pensa'], [39.8, 'neutro'],
  [53.5, 'felice'], [55.6, 'neutro'], [61.5, 'felice'],
  [65.0, 'sorpreso'], [67.3, 'neutro'], [77.3, 'pensa'], [79.4, 'neutro'],
  [FINE, 'neutro'], [84.6, 'felice'], [89.5, 'occhiolino'],
];
// una frase per ogni cosa che succede; le colonne si alzano fra un fumetto e l'altro
const FUMETTI = [
  [2.4, 6.4, 'E se a ogni passo moltiplichi\nper {g:lo stesso numero}?'],
  // 1 · i salti
  [8.4, 12.3, 'Il primo termine è {mink:a₁ = 3}:\nuna colonna alta 3.'],
  [13.7, 17.4, 'Il secondo è il doppio:\n{mink:a₂ = 3 · 2 = 6}.'],
  [18.8, 22.0, 'Il terzo: ancora {v:· 2},\n{mink:a₃ = 12}.'],
  [24.7, 29.0, 'Poi 24, 48, 96: ogni salto\nè {g:più grande} del precedente.'],
  [29.1, 33.2, 'Il numero fisso è la {v:ragione},\n{mv:q}. Qui {mv:q}{mink: = 2}.'],
  [33.3, 37.6, 'Si trova dividendo un termine\nper il {g:precedente}: 6 diviso 3.'],
  [37.7, 41.8, 'Con {mv:q}{mink: = 0} dopo {mink:a₁} verrebbero\ntutti 0: per questo {mv:q}{mink: ≠ 0}.'],
  [41.9, 45.3, '{mink:aₙ} è il termine al posto {mx:n}.'],
  [45.4, 49.0, 'Ogni termine è il precedente\n{g:per} {mv:q}.'],
  // 2 · il termine generale
  [49.3, 53.4, 'Per arrivare ad {mink:a₆} moltiplico\n{mink:3} per 2 {g:cinque volte}.'],
  [53.5, 57.0, 'Cinque volte per 2 è {mink:2⁵}:\n{mink:a₆ = 3 · 2⁵ = 96}.'],
  [57.1, 61.4, 'Da {mink:a₁} ad {mink:aₙ} i passi\nsono {mink:n − 1}: uno in meno.'],
  [61.5, 64.8, 'Ecco il termine generale:\n{mink:aₙ = a₁ · q ⁿ⁻¹}.'],
  // 3 · q fra 0 e 1
  [67.2, 71.0, 'Ora parto da {mink:a₁ = 96}\ne prendo la {g:metà}: {mink:a₂ = 48}.'],
  [73.7, 77.2, 'Moltiplico sempre per {mink:1/2}:\nla ragione è {mv:q}{mink: = 1/2}.'],
  [77.3, 81.9, 'I termini calano verso 0,\nma nessuno arriva a 0.'],
  // chiusura
  [84.4, 91.2, 'Progressione geometrica: si moltiplica\nsempre per la stessa {v:ragione} {mv:q}.'],
];

const CARD_L = [150, 110, 1000, 690], CARD_R = [1210, 110, 640, 690];
// le colonne: 5 px per unità, la stessa scala per tutto il video
const GY = 700, CW = 90;
const cx = n => 260 + (n - 1) * 150;
let sy = 5;   // ricalcolata a ogni fotogramma da sceneColonne, prima di ogni uso
const yv = v => GY - v * sy;
const PED = '₀₁₂₃₄₅₆';

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
function blocco(ctx, x, y0, y1, col, al) {   // rettangolo largo CW fra le quote y0 (sotto) e y1 (sopra)
  if (al <= 0 || y0 - y1 < .5) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = css(col, .2); ctx.fillRect(x - CW / 2, y1, CW, y0 - y1);
  ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.strokeRect(x - CW / 2, y1, CW, y0 - y1);
  ctx.restore();
}
// il fattore fra un termine e il successivo, scritto fra i loro nomi sotto la base
function fattore(ctx, n, s, al) {
  if (al <= 0) return;
  const xm = (cx(n) + cx(n + 1)) / 2;
  drawRich(ctx, s, xm, GY + 30, { size: 30, alpha: al });
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(xm - 34, GY + 62); ctx.lineTo(xm + 26, GY + 62); ctx.stroke(); ctx.restore();
  arrowHead(ctx, [xm + 34, GY + 62], 0, C.v, .8 * al);
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Progressioni geometriche', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–2 · a₁ = 3, q = 2: la colonna nuova è la copia della precedente più un'altra copia sopra (il salto)
const COPIA = [null, null, [12.4, 12.9], [17.5, 18.0], [22.7, 23.0], [23.35, 23.65], [24.0, 24.3]];
const CADE = [null, [7.7, 8.3], [13.0, 13.6], [18.1, 18.7], [23.0, 23.3], [23.65, 23.95], [24.3, 24.6]];
const valG = n => 3 * 2 ** (n - 1);
function colonnaG(ctx, x, n, nuovo, al) {   // la base 3 e i salti 3, 6, 12, … fino al salto n − 1, che scende di «nuovo»
  blocco(ctx, x, GY, yv(3), C.x, al);
  for (let j = 1; j < n; j++) {
    const dy = j === n - 1 ? nuovo.dy : 0, a = j === n - 1 ? nuovo.al : 1;
    blocco(ctx, x, yv(valG(j)) + dy, yv(valG(j + 1)) + dy, C.y, al * a);
  }
}
// 3 · a₁ = 96, q = 1/2: la colonna nuova è la copia della precedente, che si abbassa fino alla metà
const COPIA_D = [null, null, [66.1, 66.5], [71.1, 71.4], [71.7, 72.0], [72.3, 72.6], [72.9, 73.2]];
const META = [null, null, [66.6, 67.1], [71.4, 71.7], [72.0, 72.3], [72.6, 72.9], [73.2, 73.5]];
const valH = n => 96 / 2 ** (n - 1);
function sceneColonne(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  sy = 5;
  const al = life(t, 7.5, FINE, .5, .6);
  card(ctx, ...CARD_L, al);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(190, GY); ctx.lineTo(1110, GY); ctx.stroke();
  const aA = 1 - P(t, 64.9, 65.4);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    const dim = P(t, 49.2, 49.8);   // in primo piano la colonna 6
    const kn = P(t, 42.0, 42.5);    // dal posto n in poi il pedice è azzurro
    for (let n = 1; n <= 6; n++) {
      const [c0, c1] = COPIA[n] || [0, 0], [d0, d1] = CADE[n];
      if (t < (COPIA[n] ? c0 : d0)) continue;
      const kc = COPIA[n] ? P(t, c0, c1, E.io) : 1, kd = P(t, d0, d1, E.out);
      const x = lerp(cx(n - 1 || 1), cx(n), kc);
      const a = (n === 6 ? 1 : 1 - .7 * dim) * (COPIA[n] ? P(t, c0, c0 + .25) : 1);
      if (n === 1) {
        ctx.save(); ctx.beginPath(); ctx.rect(x - CW, yv(3) + (1 - kd) * 3 * sy - 2, 2 * CW, 3 * sy + 4); ctx.clip();
        colonnaG(ctx, x, 1, { dy: 0, al: 1 }, a);
        ctx.restore();
      } else colonnaG(ctx, x, n, { dy: -70 * (1 - kd), al: kd }, a);
      drawRich(ctx, String(valG(n)), cx(n), yv(valG(n)) - 34, { size: 44, weight: 600, alpha: P(t, d1, d1 + .3) * a });
      const ki = COPIA[n] ? P(t, c1, c1 + .3) : P(t, d0, d1);
      drawRich(ctx, `{mink:a}{mink:${PED[n]}}`, cx(n), GY + 46, { size: 40, alpha: ki * a * (1 - kn) });
      drawRich(ctx, `{mink:a}{mx:${PED[n]}}`, cx(n), GY + 46, { size: 40, alpha: ki * a * kn });
      if (n > 1) fattore(ctx, n - 1, '{mv:· 2}', P(t, d0, d1));
    }
    ctx.restore();
  }
  if (t > 65.2) {
    for (let n = 1; n <= 6; n++) {
      const v = valH(n);
      let x = cx(n), h = v, a = 1, kv;
      if (n === 1) { h = v * P(t, 65.4, 66.0, E.out); kv = P(t, 65.9, 66.2); if (h <= 0) continue; }
      else {
        const [c0, c1] = COPIA_D[n], [m0, m1] = META[n];
        if (t < c0) continue;
        x = lerp(cx(n - 1), cx(n), P(t, c0, c1, E.io)); a = P(t, c0, c0 + .2);
        h = lerp(2 * v, v, P(t, m0, m1, E.io)); kv = P(t, m1, m1 + .3);
        fattore(ctx, n - 1, '{mv:· 1/2}', P(t, m0, m1));
      }
      blocco(ctx, x, GY, yv(h), C.x, a);
      drawRich(ctx, String(v).replace('.', ','), cx(n), yv(v) - 34, { size: 44, weight: 600, alpha: kv });
      const ki = n === 1 ? P(t, 65.4, 65.9) : P(t, COPIA_D[n][1], COPIA_D[n][1] + .3);
      drawRich(ctx, `{mink:a}{mx:${PED[n]}}`, cx(n), GY + 46, { size: 40, alpha: ki });
    }
  }
  ctx.restore();
}

// la scheda a destra: i salti, la ragione, la regola; poi il termine generale; poi q = 1/2
const fr = (a, b) => ({ num: `{mink:${a}}`, den: `{mink:${b}}` });
function sceneScheda(ctx, t) {
  const ca = life(t, 24.5, FINE, .5, .6);
  if (ca <= 0) return;
  card(ctx, ...CARD_R, ca);
  ctx.save(); ctx.globalAlpha *= ca;
  const XC = 1530;
  const aA = 1 - P(t, 49.1, 49.5);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha *= aA;
    drawRich(ctx, '{y:+3}   {y:+6}   {y:+12}   {y:+24}   {y:+48}', XC, 165, { size: 44, weight: 600, local: t - 25.1, stagger: .12 });
    drawRich(ctx, '{mv:q}{mink: = 2}', XC, 258, { size: 64, local: t - 29.3 });
    drawSeq(ctx, ['{mv:q}{mink: = }', fr('a₂', 'a₁'), '{mink: = }', fr(6, 3), '{mink: = 2}'], XC, 372, 46, { local: t - 33.5 });
    drawRich(ctx, '{mv:q}{mink: ≠ 0}', XC, 482, { size: 48, local: t - 37.9 });
    ctx.save(); ctx.globalAlpha *= P(t, 41.9, 42.2);
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1250, 530); ctx.lineTo(1810, 530); ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{mink:a}{mx:ₙ}{ink:: termine al posto }{mx:n}', XC, 578, { size: 40, local: t - 42.0 });
    const L = 1350;
    fp(ctx, ['{mink:a}', { p: 'n+1' }, '{mink: = aₙ · }{mv:q}'], L, 662, 58, { align: 'left', local: t - 45.5 });
    const kc = P(t, 46.0, 46.4);
    if (kc > 0) {
      ctx.save(); ctx.globalAlpha *= kc; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.lineCap = 'round';
      // una graffa sotto tutto il simbolo aₙ₊₁ (la a e il suo pedice)
      const wS = richW(ctx, '{mink:a}', 58) + richW(ctx, '{mink:n+1}', 58 * .76 / 1.12), xm = L + wS / 2;
      ctx.beginPath(); ctx.moveTo(L, 704); ctx.lineTo(L, 712); ctx.lineTo(L + wS, 712); ctx.lineTo(L + wS, 704);
      ctx.moveTo(xm, 712); ctx.lineTo(xm, 724); ctx.stroke(); ctx.restore();
      drawRich(ctx, '{dim:il termine dopo }{mink:aₙ}', xm, 752, { size: 30, alpha: kc });
    }
    ctx.restore();
  }
  const aB = life(t, 49.3, 65.3, .3, .4);
  if (aB > 0) {
    ctx.save(); ctx.globalAlpha *= aB;
    drawRich(ctx, '{mink:a₆ = 3 · 2 · 2 · 2 · 2 · 2}', XC, 190, { size: 46, local: t - 49.4 });
    drawRich(ctx, '{mink:= 3 · 2⁵ = }{mg:96}', XC, 290, { size: 46, local: t - 53.6 });
    drawRich(ctx, '{dim:da }{mink:a₁}{dim: ad }{mink:aₙ}{dim:: }{mink:n − 1}{dim: passi}', XC, 400, { size: 40, local: t - 57.2 });
    const sF = '{mink:aₙ = a₁ · }{mv:q}{mink: ⁿ⁻¹}';
    drawRich(ctx, sF, XC, 525, { size: 60, local: t - 61.6 });
    const kb = P(t, 62.2, 62.7);
    if (kb > 0) {
      const w = richW(ctx, sF, 60);
      ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(XC - w / 2 - 28, 525 - 54, w + 56, 104, 14); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  if (t > 67.0) {
    drawRich(ctx, '{mink:a₁ = 96}', XC, 190, { size: 56, local: t - 67.3 });
    drawSeq(ctx, ['{mink:a₂ = 96 · }', fr(1, 2), '{mink: = 48}'], XC, 305, 46, { local: t - 68.4 });
    drawSeq(ctx, ['{mv:q}{mink: = }', fr(1, 2)], XC, 440, 60, { local: t - 73.8 });
    drawRich(ctx, '{mink:a₇ = 1,5}{ink:     }{mink:a₈ = 0,75}', XC, 565, { size: 44, local: t - 77.4 });
    drawRich(ctx, '{dim:e così via}', XC, 632, { size: 32, local: t - 77.8 });
    drawRich(ctx, '{g:sempre più vicini a 0, mai 0}', XC, 700, { size: 36, local: t - 78.4 });
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
    drawRich(ctx, 'In una progressione geometrica si moltiplica\nsempre per lo stesso numero, la {v:ragione}.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[400, '{dim:a ogni passo}'], [960, '{dim:il termine generale}'], [1520, '{dim:con }{mink:a₁ > 0}']];
  pills.forEach(([x, testa], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - 240, 445, 480, 195);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    if (i === 0) fp(ctx, ['{mink:a}', { p: 'n+1' }, '{mink: = aₙ · }{mv:q}'], x, 562, 46);
    if (i === 1) drawRich(ctx, '{mink:aₙ = a₁ · }{mv:q}{mink: ⁿ⁻¹}', x, 562, { size: 46 });
    if (i === 2) drawRich(ctx, '{mv:q}{mink: > 1}{ink:  crescono}\n{mink:0 < }{mv:q}{mink: < 1}{ink:  calano}', x, 572, { size: 38, lh: 1.4 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Progressioni geometriche', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 49.1, 'i salti'], [49.1, 64.9, 'il termine generale'], [64.9, FINE, 'se {mv:q} sta fra 0 e 1']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneColonne(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
