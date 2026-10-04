'use strict';
/* In che ordine provare — la scaletta del sito, raccoglimento → conta i termini → Ruffini,
   su tre esempi risolti da tre gradini diversi. Argomento: scomposizione (sezione «In che ordine provare i metodi»). */
CVIDEO.registra('scomposizione/in-che-ordine', M => {
  const { W, C, E, P, life, kf, css, TITOLI, conFont, drawRich, txt, card, checkMark } = M;

const FINE = 98.5;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [29.8, 'felice'], [34.0, 'neutro'], [47.6, 'felice'], [52.2, 'neutro'], [59.6, 'pensa'], [70.3, 'sorpreso'],
  [74.8, 'neutro'], [89.4, 'felice'], [93.9, 'festa'], [96.4, 'felice'], [104.2, 'occhiolino'],
];
// tre gradini, come il sito; mentre Ada parla la freccia sta ferma sul gradino di cui parla
const FUMETTI = [
  [2.4, 6.6, 'Un polinomio da scomporre:\nda quale metodo si parte?'],
  [7.9, 11.6, 'C\'è un ordine. Primo gradino:\nil {v:raccoglimento totale}.'],
  [11.8, 16.6, 'Secondo: conta i termini. Ti dicono\nquale di questi metodi provare.'],
  [16.8, 20.6, 'Se nessuno si applica,\nl\'ultimo gradino è {v:Ruffini}.'],
  [21.0, 24.4, 'Primo esempio: {mink:2x² − 8x}.'],
  [24.6, 29.4, 'Gradino 1: c\'è un fattore comune,\n{mg:2x}. Lo porto fuori.'],
  [29.6, 33.6, '{mink:x − 4} non si scompone più:\nfinito al primo gradino.'],
  [34.0, 37.2, 'Secondo esempio: {mink:x² − 9}.'],
  [37.4, 42.2, 'Gradino 1: nessun fattore comune.\nIl raccoglimento non si applica.'],
  [42.4, 47.2, 'Gradino 2: due termini, quadrati,\ncon il meno: {v:differenza di quadrati}.'],
  [47.4, 51.8, 'Quindi {mink:x² − 9 = (x + 3)(x − 3)}.\nFinito al secondo gradino.'],
  [52.2, 55.6, 'Terzo esempio: {mink:x³ − 7x + 6}.'],
  [55.8, 59.4, 'Gradino 1: nessun fattore comune.'],
  [59.6, 64.6, 'Gradino 2: tre termini. Quadrato\ndi binomio? No: {mink:x³} non è un quadrato.'],
  [64.8, 69.4, 'Trinomio speciale? No: quello\nha grado 2, questo ha grado 3.'],
  [69.6, 74.6, 'Gradino 3: Ruffini. Provo i divisori\ndi 6: con {mx:x}{mink: = 1} vale {mink:1 − 7 + 6 = }{mg:0}.'],
  [74.8, 80.2, 'Allora {mink:x − 1} è un fattore. Divido:\nil quoziente è {mink:x² + x − 6}.'],
  [80.4, 83.8, 'Da capo con {mink:x² + x − 6}:\nnessun fattore comune.'],
  [84.0, 89.0, 'Gradino 2: con {mink:−6} niente quadrato\ndi binomio, ma è un {v:trinomio speciale}.'],
  [89.2, 93.4, 'Somma 1 e prodotto {mink:−6}: sono {mg:3} e {mg:−2},\n{mink:x² + x − 6 = (x + 3)(x − 2)}.'],
  [93.6, 98.1, 'Nessun fattore si scompone più:\n{mink:x³ − 7x + 6 = (x − 1)(x + 3)(x − 2)}.'],
  [100.2, 105.8, 'Si scende un gradino alla volta,\nfinché nessun fattore si scompone più.'],
];

// ---- la scaletta, a sinistra: i tre passi del sito ----
// [compare, nome, voci della tabella del sito, y in alto, altezza]
const GRADINI = [
  [8.3, 'raccoglimento totale', [], 200, 100],
  [12.0, 'conta i termini', ['prodotti notevoli', 'trinomio speciale', 'raccoglimento parziale'], 325, 230, ['2, 3, 4, 6', '3', '4, 6']],
  [17.0, 'Ruffini', [], 580, 100],
];
const GX = k => 130 + 15 * k, GW = 545;
const RIGA_NOME = k => GRADINI[k][3] + (GRADINI[k][2].length ? 40 : GRADINI[k][4] / 2);   // y del nome del gradino
// su quale gradino sta la freccia: scende fra un fumetto e l'altro, e per il quoziente riparte dal primo
const passo = t => kf(t, [[0, 0], [42.4, 0], [42.8, 1], [52.1, 1], [52.2, 0], [59.6, 0], [60.0, 1], [69.6, 1], [70.0, 2],
  [80.4, 2], [80.9, 0], [84.0, 0], [84.4, 1]]);
const vista = t => Math.max(life(t, 24.7, 33.8, .4, .4), life(t, 37.5, 52.0, .4, .4), life(t, 55.9, FINE + .6, .4, .5));
// quale voce del gradino 2 è in esame
const voce = (t, j) => j === 0 ? Math.max(life(t, 42.6, 52.0, .3, .4), life(t, 59.8, 64.7, .3, .3))
  : j === 1 ? Math.max(life(t, 64.9, 69.5, .3, .3), life(t, 84.2, FINE + .6, .3, .5)) : 0;
function sceneScaletta(ctx, t) {
  if (t < 7.5 || t > FINE + .8) return;
  const al = 1 - P(t, FINE, FINE + .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 80, 110, 640, 680, P(t, 7.5, 8.1));
  conFont(TITOLI, () => drawRich(ctx, 'i metodi, in ordine', 400, 160, { size: 38, weight: 600, local: t - 7.8 }));
  const s = passo(t), v = vista(t);
  GRADINI.forEach(([ta, nome, voci, y0, h], k) => {
    const a = P(t, ta, ta + .5, E.out);
    if (a <= 0) return;
    const on = v * Math.max(0, 1 - Math.abs(s - k) * 2);
    const x = GX(k), yn = RIGA_NOME(k);
    ctx.save(); ctx.globalAlpha *= a;
    ctx.translate(0, (1 - a) * 20);
    ctx.fillStyle = css(C.v, .05 + .1 * on); ctx.strokeStyle = on > .5 ? css(C.v) : css(C.panelEdge);
    ctx.lineWidth = 2 + 2.5 * on;
    ctx.beginPath(); ctx.roundRect(x, y0, GW, h, 16); ctx.fill(); ctx.stroke();
    ctx.fillStyle = css(C.v); ctx.beginPath(); ctx.arc(x + 44, yn, 25, 0, Math.PI * 2); ctx.fill();
    txt(ctx, String(k + 1), x + 44, yn + 1, { size: 30, weight: 600, color: C.chip });
    drawRich(ctx, nome, x + 86, yn, { size: 34, align: 'left' });
    const nt = GRADINI[k][5];
    if (nt) drawRich(ctx, '{dim:termini}', x + GW - 18, yn, { size: 30, align: 'right', alpha: P(t, ta + .5, ta + .9) });
    // le voci della tabella, una sotto l'altra; quella in esame si accende
    voci.forEach((w, j) => {
      const yv = y0 + 95 + 46 * j, aj = P(t, ta + .5 + .3 * j, ta + .9 + .3 * j), kv = voce(t, j);
      if (aj <= 0) return;
      ctx.save(); ctx.globalAlpha *= aj;
      if (kv > 0) { ctx.fillStyle = css(C.v, .14 * kv); ctx.beginPath(); ctx.roundRect(x + 70, yv - 21, GW - 90, 42, 10); ctx.fill(); }
      drawRich(ctx, '{dim:· }' + (kv > .5 ? '{v:' + w + '}' : '{dim:' + w + '}'), x + 86, yv, { size: 30, align: 'left' });
      if (nt) drawRich(ctx, '{dim:' + nt[j] + '}', x + GW - 18, yv, { size: 30, align: 'right' });
      ctx.restore();
    });
    ctx.restore();
  });
  // la freccia che scende (e riparte dall'alto) i gradini
  if (v > 0) {
    const i = Math.min(1, Math.floor(s)), f = s - i;
    const y = RIGA_NOME(i) + (RIGA_NOME(i + 1) - RIGA_NOME(i)) * f, x = GX(s) - 16;
    ctx.save(); ctx.globalAlpha *= v; ctx.fillStyle = css(C.v);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30, y - 20); ctx.lineTo(x - 30, y + 20); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  drawRich(ctx, '{dim:poi: da capo su }{v:ogni fattore}', 400, 735, { size: 30, local: t - 80.6, alpha: P(t, 80.6, 81.1) });
  ctx.restore();
}


// ---- gli esempi, a destra ----
const EX = 1285;   // centro della scheda degli esempi
function riga(ctx, t, t0, y, n, s, size = 40) {   // riga con il numero del gradino davanti
  if (t < t0) return;
  if (n) {
    const a = P(t, t0, t0 + .35, E.out);
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = css(C.v);
    ctx.beginPath(); ctx.arc(812, y, 21, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    txt(ctx, String(n), 812, y + 1, { size: 30, weight: 600, color: C.chip, alpha: a });
  }
  drawRich(ctx, s, 850, y, { size, align: 'left', local: t - t0 });
}
function testa(ctx, t, t0, nome, poli) {
  drawRich(ctx, '{dim:' + nome + '}', EX, 165, { size: 30, alpha: P(t, t0, t0 + .4) });
  drawRich(ctx, poli, EX, 238, { size: 60, local: t - t0 - .1 });
}
function bollino(ctx, y, n, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = css(C.v);
  ctx.beginPath(); ctx.arc(812, y, 21, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  txt(ctx, String(n), 812, y + 1, { size: 30, weight: 600, color: C.chip, alpha: a });
}
function sceneEsempi(ctx, t) {
  if (t < 20.6 || t > FINE + .8) return;
  const al = 1 - P(t, FINE, FINE + .6);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 760, 110, 1060, 680, P(t, 20.6, 21.2));
  // 1 · 2x² − 8x: basta il raccoglimento
  const a1 = life(t, 21.0, 33.8, .4, .4);
  if (a1 > 0) {
    ctx.save(); ctx.globalAlpha *= a1;
    testa(ctx, t, 21.1, 'esempio 1', '{mink:2x² − 8x}');
    riga(ctx, t, 24.9, 340, 1, '{dim:fattore comune: }{mg:2x}');
    if (t > 25.5) drawRich(ctx, '{mink:2x² − 8x = }{mg:2x}{mink:(x − 4)}', EX, 450, { size: 52, local: t - 25.5 });
    if (t > 29.8) drawRich(ctx, '{mink:x − 4}{dim: non si scompone più}', EX, 560, { size: 40, local: t - 29.8 });
    checkMark(ctx, 1665, 450, P(t, 30.0, 30.7), C.g, .3);
    ctx.restore();
  }
  // 2 · x² − 9: si arriva al secondo gradino
  const a2 = life(t, 33.8, 52.0, .4, .4);
  if (a2 > 0) {
    ctx.save(); ctx.globalAlpha *= a2;
    testa(ctx, t, 34.1, 'esempio 2', '{mink:x² − 9}');
    riga(ctx, t, 37.7, 340, 1, '{dim:nessun fattore comune}');
    riga(ctx, t, 43.0, 410, 2, '{dim:due quadrati, con il meno in mezzo}');
    if (t > 47.6) drawRich(ctx, '{mink:x² − 9 = (x + 3)(x − 3)}', EX, 520, { size: 52, local: t - 47.6 });
    checkMark(ctx, 1640, 520, P(t, 48.0, 48.7), C.g, .3);
    ctx.restore();
  }
  // 3 · x³ − 7x + 6: tutta la scaletta, poi da capo sul quoziente
  const a3 = P(t, 52.0, 52.4);
  if (a3 > 0) {
    ctx.save(); ctx.globalAlpha *= a3;
    testa(ctx, t, 52.3, 'esempio 3', '{mink:x³ − 7x + 6}');
    riga(ctx, t, 56.1, 330, 1, '{dim:nessun fattore comune}');
    riga(ctx, t, 59.9, 395, 2, '{dim:non è un quadrato di binomio}');
    riga(ctx, t, 65.1, 460, 2, '{dim:non è un trinomio speciale: grado 3}');
    riga(ctx, t, 69.9, 528, 3, '{mx:x}{mink: = 1:   1 − 7 + 6 = }{mg:0}', 44);
    riga(ctx, t, 75.0, 600, 0, '{mink:x³ − 7x + 6 = (x − 1)(x² + x − 6)}');
    // il quoziente riparte dal gradino 1, poi passa al 2; la scritta cambia sul posto
    bollino(ctx, 670, 1, P(t, 80.6, 80.95) * (1 - P(t, 84.0, 84.2)));
    bollino(ctx, 670, 2, P(t, 84.2, 84.5));
    if (t > 80.6) drawRich(ctx, '{mink:x² + x − 6}{dim:: nessun fattore comune}', 850, 670, { size: 40, align: 'left', local: t - 80.6, alpha: 1 - P(t, 84.0, 84.2) });
    if (t > 84.2) drawRich(ctx, '{mink:x² + x − 6}{dim:: trinomio speciale}', 850, 670, { size: 40, align: 'left', alpha: P(t, 84.2, 84.5) * (1 - P(t, 89.4, 89.55)) });
    if (t > 89.55) drawRich(ctx, '{mink:x² + x − 6 = (x + }{mg:3}{mink:)(x − }{mg:2}{mink:)}', 850, 670, { size: 44, align: 'left', alpha: P(t, 89.55, 89.85) });
    if (t > 93.8) drawRich(ctx, '{mink:x³ − 7x + 6 = (x − 1)(x + 3)(x − 2)}', EX - 20, 748, { size: 46, local: t - 93.8 });
    checkMark(ctx, 1765, 748, P(t, 94.3, 95.0), C.g, .3);
    ctx.restore();
  }
  ctx.restore();
}


// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'In che ordine provare', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// in una frase (FINE–108.8)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, 106.4, 107.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un gradino alla volta, dall’alto;\npoi da capo su {g:ogni fattore}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[490, 'prima il\n{v:raccoglimento}'], [960, 'poi conta\ni {v:termini}'], [1430, '{v:Ruffini}\nper ultimo']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - 215, 445, 430, 130);
    drawRich(ctx, s, x, 512, { size: 34, weight: 400, lh: 1.3 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'In che ordine provare', durata: 108.8, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 20.8, 'la scaletta'], [20.8, 33.8, 'primo esempio'], [33.8, 52.0, 'secondo esempio'], [52.0, FINE - .2, 'terzo esempio']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneScaletta(ctx, t); sceneEsempi(ctx, t); sceneFine(ctx, t); },
  };
});
