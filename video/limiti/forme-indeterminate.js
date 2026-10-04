'use strict';
/* Le forme indeterminate — tre limiti che danno tutti 0/0 e finiscono in 2, 0 e +∞; poi tre ∞ − ∞ che danno
   3, +∞ e −∞. Si sciolgono riscrivendo prima di sostituire. Argomento: limiti. */
CVIDEO.registra('limiti/forme-indeterminate', M => {
  const { W, C, E, P, life, css, richW, TITOLI, conFont, drawRich, txt, card } = M;
  // come drawSeq del motore, ma un denominatore con l'esponente scende un poco: l'apice non tocca la linea
  const KM = '"KaTeX_Main", Cambria, Georgia, serif';
  function drawSeq(ctx, items, cx, cy, size, o = {}) {
    const al = o.alpha ?? 1; if (al <= 0.002) return;
    const local = o.local ?? 99, gap = size * .12;
    const limW = () => { ctx.font = `${Math.round(size * 1.12)}px ${KM}`; return ctx.measureText('lim').width; };
    const ws = items.map(it => typeof it === 'string' ? richW(ctx, it, size) : it.lim ? limW() + size * .4 : Math.max(richW(ctx, it.num, size), richW(ctx, it.den, size)) + size * .35);
    const total = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
    let x = cx - total / 2;
    items.forEach((it, i) => {
      const k = P(local, i * .3, i * .3 + .5, E.out);
      if (k > 0) {
        ctx.save(); ctx.globalAlpha *= al * k; ctx.translate(0, (1 - k) * 16);
        if (typeof it === 'string') drawRich(ctx, it, x, cy, { size, align: 'left' });
        else if (it.lim) {
          ctx.font = `${Math.round(size * 1.12)}px ${KM}`; ctx.fillStyle = css(C.ink); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
          ctx.fillText('lim', x + size * .15, cy);
          drawRich(ctx, it.lim, x + size * .15 + (ws[i] - size * .4) / 2, cy + size * .72, { size: Math.round(size * .55) });
        } else {
          const m = x + ws[i] / 2, giu = /[²³]/.test(it.den) ? size * .2 : 0;
          drawRich(ctx, it.num, m, cy - size * .6, { size });
          drawRich(ctx, it.den, m, cy + size * .66 + giu, { size });
          ctx.strokeStyle = css(it.bar || C.ink); ctx.lineWidth = Math.max(2, size * .055); ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x + size * .08, cy + size * .04); ctx.lineTo(x + ws[i] - size * .08, cy + size * .04); ctx.stroke();
        }
        ctx.restore();
      }
      x += ws[i] + gap;
    });
  }

const NB = ' ';   // spazio unificatore per le migliaia: 1 000, 999 000
const POSA = { // x, y, s, sguardo
  x: [[0, 760], [6.4, 760], [7.6, 190], [74.5, 190], [75.8, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [74.5, 1050], [75.8, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [74.5, 2.2], [75.8, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [74.5, 2], [75.8, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [74.5, -1.5], [75.8, -2]],
};
// le facce cambiano al massimo una volta ogni 2 s
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.45, 'pensa'], [6.4, 'neutro'],
  [13.0, 'sorpreso'], [15.0, 'neutro'], [17.1, 'pensa'], [21.3, 'felice'], [23.3, 'neutro'],
  [31.8, 'sorpreso'], [33.8, 'neutro'], [37.5, 'pensa'], [42.9, 'neutro'], [48.3, 'festa'], [50.7, 'neutro'],
  [60.3, 'pensa'], [64.8, 'sorpreso'], [66.8, 'neutro'], [69.9, 'felice'], [71.9, 'neutro'],
  [80.1, 'felice'], [82.1, 'neutro'], [84.1, 'occhiolino'],
];
const FUMETTI = [
  [1.4, 6.4, 'Numeratore e denominatore vanno a 0:\nquanto fa il limite?'],
  // 1 · stessa forma
  [7.9, 12.9, 'Ecco tre limiti, tutti\nper {mx:x} che va verso 0.'],
  [13.0, 17.0, 'Sostituendo, tutti e tre\ndanno {r:0/0}.'],
  [17.1, 21.2, 'Allora proviamo con\nnumeri vicini a 0.'],
  // 2 · tre risultati
  [21.3, 26.6, 'Il primo vale sempre {g:2}:\nsopra c\'è il doppio di sotto.'],
  [26.7, 31.7, 'Il secondo va a {g:0}:\nil numeratore è {g:più veloce}.'],
  [31.8, 37.4, 'Il terzo va a {g:+∞}: qui corre\npiù in fretta il denominatore.'],
  [37.5, 42.7, 'Stessa forma, tre risultati:\n{mink:0/0} è una forma {v:indeterminata}.'],
  // 3 · come si scioglie
  [42.9, 48.2, 'Semplifico la {mx:x}: si può,\nperché {mx:x} non vale mai 0.'],
  [48.3, 54.5, 'Ora si vede: {g:2}, {g:0}, e {my:1/}{mx:x}\nper {mx:x}{mink: → 0⁺} va a {g:+∞}.'],
  // 4 · anche ∞ − ∞
  [54.6, 60.2, 'Anche {mink:∞ − ∞} è indeterminata.\nTre limiti per {mx:x}{mink: → +∞}:'],
  [60.3, 64.7, 'Provo con {mx:x} grande:\n10, 100, 1' + NB + '000.'],
  [64.8, 69.8, 'Uno resta {g:3}, uno va a {g:+∞},\nuno a {g:−∞}.'],
  [69.9, 74.3, 'Semplifico o raccolgo:\nora il risultato si {g:vede}.'],
  // chiusura
  [75.0, 80.0, 'Conta {g:chi corre più in fretta}\nverso il limite.'],
  [80.1, 85.7, 'Davanti a {mink:0/0} o {mink:∞ − ∞}\nnon si conclude: si {v:riscrive}.'],
];

const CX = [380, 960, 1540];
// le due serie di tre limiti: formula, valori in tabella, risultato, riscrittura
const ZERO = [
  { f: [{ lim: '{mx:x}{mink:→0}' }, { num: '{mink:2}{mx:x}', den: '{mx:x}' }], v: ['2', '2', '2'], r: '{mg:2}',
    s: [{ num: '{mink:2}{mx:x}', den: '{mx:x}' }, '{mink:= 2}'] },
  { f: [{ lim: '{mx:x}{mink:→0}' }, { num: '{mx:x}{mink:²}', den: '{mx:x}' }], v: ['0,1', '0,01', '0,001'], r: '{mg:0}',
    s: [{ num: '{mx:x}{mink:²}', den: '{mx:x}' }, '{mink:= }{mx:x}'] },
  { f: [{ lim: '{mx:x}{mink:→0⁺}' }, { num: '{mx:x}', den: '{mx:x}{mink:²}' }], v: ['10', '100', '1' + NB + '000'], r: '{mg:+∞}',
    s: [{ num: '{mx:x}', den: '{mx:x}{mink:²}' }, '{mink:=}', { num: '{mink:1}', den: '{mx:x}' }] },
];
const INF = [
  { f: [{ lim: '{mx:x}{mink:→+∞}' }, '{mink:[(}{mx:x}{mink: + 3) − }{mx:x}{mink:]}'], v: ['3', '3', '3'], r: '{mg:3}',
    s: '{mink:(}{mx:x}{mink: + 3) − }{mx:x}{mink: = 3}', n: '{dim:le }{mx:x}{dim: si cancellano}' },
  { f: [{ lim: '{mx:x}{mink:→+∞}' }, '{mink:(}{mx:x}{mink:² − }{mx:x}{mink:)}'], v: ['90', '9' + NB + '900', '999' + NB + '000'], r: '{mg:+∞}',
    s: '{mx:x}{mink:² − }{mx:x}{mink: = }{mx:x}{mink:(}{mx:x}{mink: − 1)}', n: '{dim:grande per grande}' },
  { f: [{ lim: '{mx:x}{mink:→+∞}' }, '{mink:(}{mx:x}{mink: − }{mx:x}{mink:²)}'], v: ['−90', '−9' + NB + '900', '−999' + NB + '000'], r: '{mg:−∞}',
    s: '{mx:x}{mink: − }{mx:x}{mink:² = }{mx:x}{mink:(1 − }{mx:x}{mink:)}', n: '{dim:grande per negativo grande}' },
];
const X_ZERO = ['0,1', '0,01', '0,001'], X_INF = ['10', '100', '1' + NB + '000'];
// quando si guarda una colonna sola, le altre si spengono un po'
const FOCO = [[21.3, 26.6], [26.7, 31.7], [31.8, 37.4]];
const VAL_Z = [21.6, 27.0, 32.1], RIS_Z = [23.6, 29.0, 34.2];

function riga(ctx, x, v, y, k) {
  txt(ctx, x, -110, y, { size: 38, color: C.x, alpha: k });
  txt(ctx, v, 110, y, { size: 38, color: C.y, alpha: k });
}
function intestazione(ctx, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-220, 395); ctx.lineTo(220, 395); ctx.moveTo(0, 410); ctx.lineTo(0, 615); ctx.stroke();
  drawRich(ctx, '{mx:x}', -110, 435, { size: 34 });
  drawRich(ctx, '{dim:valore}', 110, 435, { size: 32 });
  ctx.restore();
}

// 0 · titolo (0–7.5): sopra Ada, la frazione di cui si parla
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le forme indeterminate', W / 2, 160, { size: 120, weight: 600, local: t - 1.0, stagger: .15, alpha: al }));
  drawSeq(ctx, [{ num: 'numeratore {mink:→ 0}', den: 'denominatore {mink:→ 0}' }], W / 2, 335, 42, { local: t - 1.8, alpha: al });
}

// 1–4 · le tre schede (7.5–74.5)
function sceneSchede(ctx, t) {
  if (t < 7.5 || t > 74.7) return;
  const fine = 1 - P(t, 74.0, 74.6);
  const dim = P(t, 21.2, 21.6) * (1 - P(t, 37.4, 37.9));
  CX.forEach((cx, i) => {
    const a = 8.0 + i * .35, k = P(t, a, a + .6, E.back), ka = P(t, a, a + .4, E.out);
    if (ka <= 0) return;
    ctx.save(); ctx.globalAlpha *= ka * fine;
    ctx.translate(cx, 450); ctx.scale(k, k); ctx.translate(-cx, -450);
    card(ctx, cx - 260, 120, 520, 670);
    // la colonna di cui si parla resta piena, le altre si attenuano (ma restano leggibili)
    const foco = 1 - dim * (1 - life(t, FOCO[i][0], FOCO[i][1], .3, .3)) * .5;
    ctx.globalAlpha *= foco;
    // ---- prima serie: 0/0 (fino a 54,5) ----
    const z = 1 - P(t, 54.1, 54.6);
    if (z > 0) {
      const Z = ZERO[i];
      ctx.save(); ctx.globalAlpha *= z;
      drawSeq(ctx, Z.f, cx, 215, 56, { local: t - a - .3 });
      // in riga, come «sostituendo: ∞ − ∞» della seconda serie: le cifre restano a 40 px
      drawRich(ctx, '{dim:sostituendo: }{mr:0/0}', cx, 335, { size: 40, local: t - 13.2 - i * .3 });
      ctx.translate(cx, 0);
      const tab = life(t, 17.3, 43.3, .4, .4);
      intestazione(ctx, tab);
      if (tab > 0) {
        X_ZERO.forEach((xv, j) => {
          const kx = P(t, 17.6 + j * .4, 18.0 + j * .4, E.out);
          const kv = P(t, VAL_Z[i] + j * .6 - .1, VAL_Z[i] + j * .6 + .3, E.out);
          txt(ctx, xv, -110, 490 + j * 50, { size: 38, color: C.x, alpha: kx * tab });
          txt(ctx, Z.v[j], 110, 490 + j * 50, { size: 38, color: C.y, alpha: kv * tab });
        });
      }
      // la riscrittura, al posto della tabella
      const sa = P(t, 43.1 + i * .3, 43.7 + i * .3);
      if (sa > 0) drawSeq(ctx, Z.s, 0, 515, 50, { local: (t - 43.1 - i * .3) * 2, alpha: sa });
      // il risultato
      const rk = P(t, RIS_Z[i], RIS_Z[i] + .5, E.back);
      if (rk > 0) {
        const pul = t > 48.3 && t < 49.9 ? 1 + .12 * Math.sin((t - 48.3 + i * .3) * 6) : 1;
        ctx.save(); ctx.translate(0, 700); ctx.scale(rk * pul, rk * pul);
        drawRich(ctx, '{mink:→ }' + Z.r, 0, 0, { size: 64 });
        ctx.restore();
      }
      ctx.restore();
    }
    // ---- seconda serie: ∞ − ∞ (da 54,6) ----
    const q = P(t, 54.6, 55.1);
    if (q > 0) {
      const Q = INF[i];
      ctx.save(); ctx.globalAlpha *= q;
      drawSeq(ctx, Q.f, cx, 215, 56, { local: t - 54.8 - i * .3 });
      drawRich(ctx, '{dim:sostituendo: }{mr:∞ − ∞}', cx, 335, { size: 40, local: t - 55.8 - i * .3 });
      ctx.translate(cx, 0);
      const tab = life(t, 60.4, 70.1, .4, .4);
      intestazione(ctx, tab);
      if (tab > 0) {
        X_INF.forEach((xv, j) => {
          const kr = P(t, 60.8 + j * .8, 61.2 + j * .8, E.out);
          if (kr > 0) riga(ctx, xv, Q.v[j], 490 + j * 50, kr * tab);
        });
      }
      const sa = P(t, 70.1 + i * .3, 70.7 + i * .3);
      if (sa > 0) {
        drawRich(ctx, Q.s, 0, 500, { size: 42, local: (t - 70.1 - i * .3) * 2, alpha: sa });
        drawRich(ctx, Q.n, 0, 580, { size: 30, alpha: sa * P(t, 71.0 + i * .3, 71.5 + i * .3) });
      }
      const rk = P(t, 65.0 + i * .4, 65.5 + i * .4, E.back);
      if (rk > 0) {
        ctx.save(); ctx.translate(0, 700); ctx.scale(rk, rk);
        drawRich(ctx, '{mink:→ }' + Q.r, 0, 0, { size: 64 });
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();
  });
}

// 5 · in una frase (74.5–88)
function sceneFine(ctx, t) {
  if (t < 74.6) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 86.6, 87.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 75.1 });
    drawRich(ctx, 'Una forma indeterminata non dice il risultato:\nprima si {v:riscrive}, poi si sostituisce.', W / 2, 300, { size: 60, weight: 600, local: t - 75.5, stagger: .08 });
  });
  const pills = [[445, 'stessa forma, {r:risultati diversi}'], [960, 'conta {g:chi corre più in fretta}'], [1475, 'si {v:semplifica} o si {v:raccoglie}']];
  pills.forEach(([x, s], i) => {
    const a = 77.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 540); ctx.scale(k, k); ctx.translate(-x, -540);
    card(ctx, x - 245, 490, 490, 100);
    drawRich(ctx, s, x, 542, { size: 31, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Le forme indeterminate', durata: 88, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [86.2, 87.1] },
    capitoli: [[7.5, 21.2, 'stessa forma'], [21.2, 42.8, 'tre risultati diversi'], [42.8, 54.4, 'come si scioglie'],
      [54.4, 74.5, 'anche {mink:∞ − ∞}']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSchede(ctx, t); sceneFine(ctx, t); },
  };
});
