'use strict';
/* Due cerchi che si toccano — A = divisori di 12, B = divisori di 18 in un diagramma di Venn: la parte comune
   A ∩ B = {1, 2, 3, 6} sono i divisori comuni (il più grande, 6, è il MCD); A ∪ B ha 8 elementi = 6 + 6 − 4.
   Argomento: insiemi-logica. */
CVIDEO.registra('insiemi-logica/venn', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, richW, card } = M;

const FINE = 65.2, DUR = 76.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [23.6, 'sorpreso'], [25.7, 'neutro'], [36.2, 'felice'], [38.4, 'neutro'],
  [45.6, 'festa'], [48.0, 'neutro'], [50.6, 'felice'], [52.8, 'neutro'], [60.0, 'felice'], [62.2, 'neutro'],
  [FINE + 2.2, 'felice'], [DUR - 5.4, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.1, 6.6, 'Che cosa hanno in comune\ni divisori di 12 e di 18?'],
  // 1 · due insiemi
  [7.9, 12.1, 'I divisori di 12 formano\nun insieme: lo chiamo {mx:A}.'],
  [12.3, 16.5, 'Si scrive elencando i suoi\n{g:elementi} fra parentesi graffe.'],
  [16.7, 20.9, 'Anche i divisori di 18\nformano un insieme: {my:B}.'],
  [21.1, 26.2, '1, 2, 3 e 6 stanno in tutti e due:\ni cerchi si {v:sovrappongono}.'],
  [26.3, 31.1, '9 e 18 dividono solo il 18:\nstanno in {my:B}, fuori da {mx:A}.'],
  [31.3, 35.0, '4 e 12 invece stanno\nsolo in {mx:A}.'],
  // 2 · l'intersezione
  [35.4, 40.2, 'La parte comune è l’{v:intersezione}:\nsi scrive {mink:A ∩ B}.'],
  [40.4, 45.1, 'Sono i numeri che dividono\nsia 12 sia 18: i divisori {g:comuni}.'],
  [45.3, 49.7, 'Il più grande è 6: è il\n{g:massimo comun divisore}.'],
  // 3 · l'unione
  [50.0, 54.4, 'Tutti i numeri dei due cerchi\nformano l’{v:unione}: {mink:A ∪ B}.'],
  [54.6, 59.0, 'Chi sta in tutti e due\nsi scrive {r:una volta sola}.'],
  [59.2, 64.5, 'Sono 8: 6 di {mx:A}, più 6 di {my:B},\nmeno i 4 contati due volte.'],
  // chiusura
  [67.4, 74.0, 'Intersezione: in tutti e due.\nUnione: in almeno uno.'],
];

// ---------- aiutanti ----------
const MATHF = s => `${Math.round(s * 1.12)}px "KaTeX_Main", Cambria, Georgia, serif`;
// un insieme scritto per elenco: testa (testo ricco, es. «A = ») e le graffe nel font della matematica;
// el = [[elemento, colore], …], colore come nei tag ('ink', 'v', 'x'…)
function insieme(ctx, testa, el, x, y, size, o = {}) {
  const al = o.alpha == null ? 1 : o.alpha;
  if (al <= 0.002) return;
  const corpo = el.map(([s, c], i) => `{m${c || 'ink'}:${s}}` + (i < el.length - 1 ? '{mink:, }' : '')).join('');
  ctx.save(); ctx.globalAlpha *= al;
  ctx.font = MATHF(size);
  const wg = ctx.measureText('{').width, pad = size * .1;
  const wt = testa ? richW(ctx, testa, size) : 0, wc = richW(ctx, corpo, size);
  const tot = wt + 2 * wg + 2 * pad + wc;
  const x0 = o.align === 'left' ? x : o.align === 'right' ? x - tot : x - tot / 2;
  if (testa) drawRich(ctx, testa, x0, y, { size, align: 'left' });
  const graffa = (s, gx) => {
    ctx.font = MATHF(size); ctx.fillStyle = css(C.ink); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(s, gx, y);
  };
  graffa('{', x0 + wt);
  drawRich(ctx, corpo, x0 + wt + wg + pad, y, { size, align: 'left' });
  graffa('}', x0 + wt + wg + 2 * pad + wc);
  ctx.restore();
}
// lo stesso insieme con alcuni elementi che cambiano colore (dissolvenza incrociata)
function insiemeColori(ctx, testa, nums, evid, col, k, x, y, size, al = 1) {
  if (al <= 0) return;
  const el0 = nums.map(n => [n, 'ink']), el1 = nums.map(n => [n, evid.indexOf(n) >= 0 ? col : 'ink']);
  if (k < 1) insieme(ctx, testa, el0, x, y, size, { alpha: al * (1 - k) });
  if (k > 0) insieme(ctx, testa, el1, x, y, size, { alpha: al * k });
}
function linea(ctx, x0, x1, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore();
}

// ---------- il diagramma ----------
const CARD = [130, 110, 1000, 690], R = 230, CY = 455;
// A da sola al centro, poi si sposta a sinistra mentre entra B (21,4–22,8)
const xA = t => kf(t, [[21.4, 630], [22.8, 520]]);
const XB = 740;
// i numeri: posizione con A da sola (a) e posizione finale (f)
const NUM = [
  ['1', [630, 330], [590, 385]], ['2', [760, 400], [670, 385]], ['3', [630, 580], [590, 525]], ['6', [760, 520], [670, 525]],
  ['4', [500, 390], [390, 390]], ['12', [505, 530], [395, 530]],
  ['9', null, [870, 390]], ['18', null, [865, 530]],
];
const COMUNI = ['1', '2', '3', '6'];
function cerchio(ctx, cx, cy, col, k, w = 6) {
  if (k <= 0) return;
  const pts = [];
  for (let i = 0; i <= 160; i++) { const a = -Math.PI / 2 - 2 * Math.PI * i / 160; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
  M.glowStroke(ctx, pts, k, col, w);
}
function sceneVenn(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = 1 - P(t, FINE - .6, FINE);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...CARD, P(t, 7.5, 8.2));
  const ax = xA(t);
  // l'unione (50,2) e l'intersezione (35,6), ombreggiate
  const ku = P(t, 50.2, 50.9);
  if (ku > 0) {
    ctx.save(); ctx.fillStyle = css(C.v, .12 * ku);
    ctx.beginPath(); ctx.arc(ax, CY, R, 0, 2 * Math.PI); ctx.moveTo(XB + R, CY); ctx.arc(XB, CY, R, 0, 2 * Math.PI); ctx.fill();
    ctx.restore();
  }
  const ki = P(t, 35.6, 36.3) * (1 - P(t, 50.2, 50.9));
  if (ki > 0) {
    ctx.save(); ctx.beginPath(); ctx.arc(ax, CY, R, 0, 2 * Math.PI); ctx.clip();
    ctx.fillStyle = css(C.v, .18 * ki); ctx.beginPath(); ctx.arc(XB, CY, R, 0, 2 * Math.PI); ctx.fill();
    ctx.restore();
  }
  // i due cerchi e i loro nomi
  cerchio(ctx, ax, CY, C.x, P(t, 8.3, 9.5));
  cerchio(ctx, XB, CY, C.y, P(t, 22.9, 24.1));
  drawRich(ctx, '{mx:A}', ax - 210, CY - 220, { size: 60, alpha: P(t, 9.3, 9.7) });
  drawRich(ctx, '{my:B}', XB + 210, CY - 220, { size: 60, alpha: P(t, 23.9, 24.3) });
  // i numeri
  const kMove = P(t, 21.4, 22.8);   // insieme ad A, prima che arrivi B
  NUM.forEach(([n, a, f], i) => {
    let x, y, k;
    if (a) {
      k = P(t, 9.7 + .16 * i, 10.1 + .16 * i, E.back);
      // 4 e 12 si spostano con A; gli altri vanno nella parte comune
      const sola = n === '4' || n === '12';
      x = sola ? a[0] + (ax - 630) : lerp(a[0], f[0], kMove);
      y = sola ? a[1] : lerp(a[1], f[1], kMove);
    } else {
      k = P(t, 26.6 + (n === '18' ? .3 : 0), 27.0 + (n === '18' ? .3 : 0), E.back);
      x = f[0]; y = f[1];
    }
    if (k <= 0) return;
    // colori: 4 e 12 azzurri da quando Ada lo dice, 9 e 18 arancio, i comuni viola con l'intersezione
    let col = C.ink, s = 1;
    if (n === '4' || n === '12') { const q = P(t, 31.4, 31.9); col = mix(C.ink, C.x, q); s = 1 + .25 * Math.sin(Math.PI * P(t, 31.4, 32.4)); }
    if (n === '9' || n === '18') col = C.y;
    if (COMUNI.indexOf(n) >= 0) col = mix(C.ink, C.v, P(t, 35.6, 36.3));
    if (n === '6') col = mix(col, C.g, P(t, 45.4, 45.9));
    ctx.save(); ctx.translate(x, y); ctx.scale(k * s, k * s);
    drawRich(ctx, n, 0, 0, { size: 52, weight: 600, fill: css(col) });
    ctx.restore();
  });
  // il MCD: un anello verde intorno al 6
  const kr = P(t, 45.4, 45.9);
  if (kr > 0) {
    ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(670, 525, 40, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * kr); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// ---------- la scheda a destra ----------
const PAN = [1170, 110, 680, 690], XC = PAN[0] + PAN[2] / 2;
const NA = ['1', '2', '3', '4', '6', '12'], NB = ['1', '2', '3', '6', '9', '18'], NU = ['1', '2', '3', '4', '6', '9', '12', '18'];
function sceneScheda(ctx, t) {
  const al = life(t, 12.3, FINE, .5, .6);
  if (al <= 0) return;
  card(ctx, ...PAN, al);
  ctx.save(); ctx.globalAlpha *= al;
  const kc = P(t, 21.3, 21.8);
  insiemeColori(ctx, '{mx:A}{mink: = }', NA, COMUNI, 'v', kc, XC, 175, 44, P(t, 12.5, 13.0));
  insiemeColori(ctx, '{my:B}{mink: = }', NB, COMUNI, 'v', kc, XC, 243, 44, P(t, 16.9, 17.4));
  linea(ctx, PAN[0] + 40, PAN[0] + PAN[2] - 40, 290, P(t, 35.6, 36.0));
  insieme(ctx, '{mx:A}{mink: ∩ }{my:B}{mink: = }', COMUNI.map(n => [n, 'v']), XC, 358, 48, { alpha: P(t, 35.8, 36.3) });
  drawRich(ctx, '{dim:i divisori comuni di 12 e 18}', XC, 416, { size: 32, local: t - 40.6 });
  drawRich(ctx, 'MCD{mink:(12, 18) = }{mg:6}', XC, 485, { size: 48, local: t - 45.6 });
  linea(ctx, PAN[0] + 40, PAN[0] + PAN[2] - 40, 533, P(t, 50.4, 50.8));
  drawRich(ctx, '{mx:A}{mink: ∪ }{my:B}{mink: =}', XC, 590, { size: 44, alpha: P(t, 50.6, 51.0) });
  insiemeColori(ctx, '', NU, COMUNI, 'v', P(t, 54.8, 55.3), XC, 652, 44, P(t, 50.8, 51.3));
  drawRich(ctx, '{mink:6 + 6 − 4 = }{mg:8}{dim: elementi}', XC, 728, { size: 44, local: t - 59.4 });
  ctx.restore();
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Due cerchi che si toccano', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'L’intersezione ha gli elementi {v:comuni},\nl’unione li ha {v:tutti}, presi una volta.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, 'inter'], [960, 'mcd'], [1430, 'unione']];
  pills.forEach(([x, q], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    if (q === 'inter') {
      insieme(ctx, '{mx:A}{mink: ∩ }{my:B}{mink: = }', COMUNI.map(n => [n, 'v']), x, 492, 38);
      drawRich(ctx, '{dim:in tutti e due}', x, 552, { size: 32 });
    } else if (q === 'mcd') {
      drawRich(ctx, 'MCD{mink:(12, 18) = }{mg:6}', x, 492, { size: 42 });
      drawRich(ctx, '{dim:il più grande dei comuni}', x, 552, { size: 32 });
    } else {
      drawRich(ctx, '{mx:A}{mink: ∪ }{my:B}{dim:: 8 elementi}', x, 492, { size: 42 });
      drawRich(ctx, '{dim:in almeno uno dei due}', x, 552, { size: 32 });
    }
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 8.3, 9.5],                                           // il cerchio A
    ['pop', 9.7, .45], ['pop', 9.86, .5], ['pop', 10.02, .55], ['pop', 10.18, .6], ['pop', 10.34, .65], ['pop', 10.5, .7],   // i sei divisori di 12
    ['soffio', 12.3], ['pop', 12.5, .5],                                              // A fra graffe
    ['pop', 16.9, .55],                                                               // B fra graffe
    ['pop', 21.3, .6],                                                                // 1, 2, 3, 6 in viola
    ['tono', 21.4, 22.8, [.5, .45, .35, .3]],                                         // A si sposta a sinistra
    ['traccia', 22.9, 24.1],                                                          // il cerchio B
    ['pop', 26.6, .6], ['pop', 26.9, .7],                                             // 9 e 18
    ['pop', 31.4, .4],                                                                // 4 e 12
    ['soffio', 35.6], ['pop', 35.8, .6],                                              // l'intersezione
    ['pop', 40.6, .4],                                                                // divisori comuni
    ['traccia', 45.4, 45.9],                                                          // l'anello intorno al 6 (il ding lo dà la festa)
    ['soffio', 50.2], ['pop', 50.6, .5], ['pop', 50.8, .6],                           // l'unione
    ['tono', 54.8, 55.3, [.4, .6]],                                                   // i comuni, una volta sola
    ['ding', 59.6],                                                                   // 6 + 6 − 4 = 8
    ['soffio', FINE + .4], ['pop', FINE + 2.2, .5], ['pop', FINE + 2.7, .6], ['pop', FINE + 3.2, .7],
  ];
  return {
    titolo: 'Due cerchi che si toccano', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 35.2, 'due insiemi'], [35.2, 49.8, 'l’intersezione'], [49.8, FINE, 'l’unione']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneVenn(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
