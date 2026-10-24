'use strict';
/* Piano piano, all’infinito — la serie armonica 1 + 1/2 + 1/3 + …: i termini tendono a 0, le somme parziali crescono
   pianissimo (S₁₀ ≈ 2,9, S₁₀₀ ≈ 5,2, S₁₀₀₀ ≈ 7,5, un milione di termini: appena sopra 14), ma a gruppi
   (1/3 + 1/4, da 1/5 a 1/8, da 1/9 a 1/16…) ogni gruppo supera 1/2, e i gruppi sono infiniti: diverge. Argomento: successioni. */
CVIDEO.registra('successioni/serie-armonica', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, txt, drawSeq, dot, arrowHead, card } = M;

const FINE = 82.2, DUR = 93.6;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [21.3, 'pensa'], [23.4, 'neutro'], [31.0, 'sorpreso'], [33.1, 'neutro'], [44.5, 'felice'], [46.6, 'neutro'],
  [54.3, 'felice'], [56.4, 'neutro'], [67.9, 'sorpreso'], [70.0, 'neutro'], [77.3, 'sorpreso'],
  [FINE, 'neutro'], [84.4, 'felice'], [89.4, 'occhiolino'],
];
// una frase per ogni cosa che succede; ogni gruppo si accende solo mentre Ada ne parla
const FUMETTI = [
  [2.1, 6.4, 'Se i termini diventano sempre più\npiccoli, la somma resta finita?'],
  // 1 · i termini e le somme parziali
  [7.9, 12.3, 'Sommo 1, poi {mink:1/2}, poi {mink:1/3}, {mink:1/4}…:\nè la {v:serie armonica}.'],
  [12.5, 16.7, 'Il termine di posto {mx:n} è {mink:1/}{mx:n}:\ntende a 0.'],
  [16.9, 21.1, 'Le {v:somme parziali} {mink:Sₙ} sommano\ni primi {mx:n} termini.'],
  [21.3, 26.6, 'Crescono piano: {mink:S₁₀ ≈ 2,9},\n{mink:S₁₀₀ ≈ 5,2}, {mink:S₁₀₀₀ ≈ 7,5}.'],
  [26.8, 30.8, 'Con un milione di termini\nsiamo appena sopra 14.'],
  [31.0, 35.0, 'Sembra fermarsi. Invece supera\n{g:qualunque} numero: vediamo perché.'],
  // 2 · a gruppi
  [35.3, 39.7, 'Metto i termini in fila\nsu una riga, uno dopo l’altro.'],
  [39.9, 44.3, 'Raggruppo: dopo 1 e {mink:1/2},\nprendo {mink:1/3 + 1/4}.'],
  [44.5, 49.3, '{mink:1/3} è più di {mink:1/4}: insieme fanno\npiù di {mink:1/4 + 1/4 = 1/2}.'],
  [49.5, 54.1, 'Poi da {mink:1/5} a {mink:1/8}: quattro termini,\nognuno almeno {mink:1/8}.'],
  [54.3, 58.1, 'Insieme fanno più di\n{mink:4 · 1/8 = 1/2}.'],
  [58.3, 62.9, 'Da {mink:1/9} a {mink:1/16}: otto termini,\ne di nuovo più di {mink:1/2}.'],
  [63.1, 67.7, 'Ogni gruppo ha il doppio dei termini\ne supera sempre {mink:1/2}.'],
  [67.9, 72.3, 'Dopo 16 termini la somma\nsupera già 3.'],
  [72.5, 77.1, 'I gruppi non finiscono mai: le mezze\nsi sommano senza fine.'],
  [77.3, 81.7, 'La somma supera ogni numero: la serie\narmonica {r:diverge} a {mink:+∞}.'],
  // chiusura
  [84.4, 90.8, 'I termini vanno a 0, ma la somma no:\nnon basta che si rimpiccioliscano.'],
];

const H = n => { let s = 0; for (let i = 1; i <= n; i++) s += 1 / i; return s; };
const fr = (a, b, col) => ({ num: `{m${col || 'ink'}:${a}}`, den: `{m${col || 'ink'}:${b}}` });

// ---------- 1 · le barre 1/n e la tabella delle somme parziali ----------
const LC = [150, 110, 880, 690], RC = [1090, 110, 770, 690];
const BX = n => 250 + (n - 1) * 56, BY = 720, BU = 520, NB = 12;
function sceneBarre(ctx, t) {
  if (t < 7.5 || t > 35.6) return;
  const al = life(t, 7.5, 35.4, .5, .5);
  card(ctx, ...LC, al);
  ctx.save(); ctx.globalAlpha *= al;
  // asse
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(200, BY); ctx.lineTo(980, BY); ctx.stroke();
  arrowHead(ctx, [986, BY], 0, C.ink);
  drawRich(ctx, '{mx:n}', 1004, BY - 30, { size: 40 });
  for (let n = 1; n <= NB; n++) {
    const a = n <= 4 ? 8.2 + (n - 1) * .8 : 11.4 + (n - 5) * .1;
    const k = P(t, a, a + .4, E.out); if (k <= 0) continue;
    const h = BU / n * k;
    ctx.fillStyle = css(C.v, .3); ctx.strokeStyle = css(C.v); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(BX(n) - 22, BY - h, 44, h); ctx.fill(); ctx.stroke();
    txt(ctx, String(n), BX(n), BY + 32, { size: 30, color: C.dim, alpha: k });
    if (n === 1) drawRich(ctx, '{mink:1}', BX(1), BY - BU - 40, { size: 44, alpha: k });
    else if (n <= 4) drawSeq(ctx, [fr(1, n)], BX(n), BY - BU / n - 66, 40, { alpha: k });
  }
  drawRich(ctx, '{mink:1/}{mx:n}{mink: → 0}', 800, 300, { size: 52, local: t - 12.9 });
  ctx.restore();
}
const RIGHE = [[17.2, '1', '1'], [17.6, '2', '1,5'], [18.0, '3', '≈ 1,8'], [18.4, '4', '≈ 2,1'],
  [21.6, '10', '≈ 2,9'], [22.4, '100', '≈ 5,2'], [23.2, '1000', '≈ 7,5'], [27.0, '1 000 000', '≈ 14,4']];
function sceneSomme(ctx, t) {
  const al = life(t, 16.9, 35.4, .5, .5);
  if (al <= 0) return;
  card(ctx, ...RC, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{mx:n}', 1290, 170, { size: 44 });
  drawRich(ctx, '{mink:Sₙ}', 1640, 170, { size: 44 });
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1130, 205); ctx.lineTo(1820, 205); ctx.moveTo(1460, 140); ctx.lineTo(1460, 760); ctx.stroke();
  RIGHE.forEach(([a, n, s], i) => {
    const k = P(t, a, a + .45, E.out); if (k <= 0) return;
    const y = 255 + i * 66 + (i >= 4 ? 40 : 0);
    txt(ctx, n, 1290, y, { size: 44, color: C.x, alpha: k });
    txt(ctx, s, 1640, y, { size: 44, weight: i === 7 ? 600 : 500, alpha: k });
  });
  drawRich(ctx, '{mink:⋮}', 1290, 506, { size: 40, alpha: P(t, 21.6, 22.0) });
  ctx.restore();
}

// ---------- 2 · i termini in fila su una riga, e i gruppi ----------
const RL = [150, 530, 1620, 270], RY = 722, RU = 300, RX = s => 220 + RU * s;
const NT = 64;
const SPARZ = []; for (let n = 0; n <= NT; n++) SPARZ.push(H(n));
// gruppo di ogni termine: 1 → 1, 2 → 2, 3–4 → 3, 5–8 → 4, 9–16 → 5, 17–32 → 6, 33–64 → 7
const GRUPPO = n => n === 1 ? 1 : Math.ceil(Math.log2(n)) + 1;
// [gruppo, primo, ultimo, istante della graffa, istante del «> 1/2», [inizio, fine] dell'evidenza]
const GRAFFE = [[3, 3, 4, 40.2, 44.7, [39.9, 49.3]], [4, 5, 8, 49.7, 54.5, [49.5, 58.1]], [5, 9, 16, 58.5, 59.6, [58.3, 62.9]],
  [6, 17, 32, 63.3, 63.4, [63.1, 67.7]], [7, 33, 64, 63.8, 63.9, [63.1, 67.7]]];
const tTermine = n => n === 1 ? 35.6 : n === 2 ? 36.2 : n === 3 ? 36.7 : n === 4 ? 37.1 : 37.5 + (n - 5) * .03;
function sceneRiga(ctx, t) {
  if (t < 35.0 || t > FINE + .4) return;
  const al = life(t, 35.3, FINE + .3, .5, .6);
  card(ctx, ...RL, al);
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, '{dim:la somma, un termine dopo l’altro}', 190, 568, { size: 30, align: 'left' });
  // la riga, le tacche intere sotto
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(RX(0) - 10, RY); ctx.lineTo(RX(H(NT)) + 6, RY); ctx.stroke();
  for (let i = 0; i <= 5; i++) {
    ctx.beginPath(); ctx.moveTo(RX(i), RY); ctx.lineTo(RX(i), RY + 14); ctx.stroke();
    txt(ctx, String(i), RX(i), RY + 40, { size: 30, color: C.dim });
  }
  // i termini, uno dopo l'altro; il gruppo di cui Ada parla si accende
  for (let n = 1; n <= NT; n++) {
    const k = P(t, tTermine(n), tTermine(n) + .3); if (k <= 0) continue;
    const g = GRUPPO(n), col = g % 2 ? C.x : C.v;
    const G = GRAFFE.find(q => q[0] === g);
    const ev = G ? life(t, G[5][0], G[5][1], .3, .3) : 0;
    const a = RX(SPARZ[n - 1]), b = lerp(a, RX(SPARZ[n]), k);
    ctx.fillStyle = css(col, .2 + .3 * ev); ctx.fillRect(a, RY - 46, b - a, 46);
    ctx.strokeStyle = css(col, .9); ctx.lineWidth = n > 16 ? 1 : 2; ctx.strokeRect(a, RY - 46, b - a, 46);
    if (n <= 4) drawRich(ctx, n === 1 ? '{mink:1}' : `{mink:1/${n}}`, (a + RX(SPARZ[n])) / 2, RY - 23, { size: n === 4 ? 34 : 40, alpha: k });
  }
  // le graffe sopra i gruppi, con «> 1/2»
  GRAFFE.forEach(([g, p, u, tg, tl]) => {
    const k = P(t, tg, tg + .4); if (k <= 0) return;
    const a = RX(SPARZ[p - 1]) + 3, b = RX(SPARZ[u]) - 3, y = RY - 62;
    ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(a, y + 12); ctx.lineTo(a, y); ctx.lineTo(b, y); ctx.lineTo(b, y + 12); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{mg:> 1/2}', (a + b) / 2, y - 30, { size: 40, local: t - tl });
  });
  // dopo 16 termini: oltre 3
  const k16 = P(t, 68.1, 68.5, E.back);
  if (k16 > 0) {
    dot(ctx, [RX(SPARZ[16]), RY], C.g, k16, 11);
    drawRich(ctx, '{mg:S₁₆}', RX(SPARZ[16]), RY + 44, { size: 36, alpha: k16 });
  }
  // la riga continua senza fine
  const ke = P(t, 72.8, 74.0);
  if (ke > 0) {
    const a = RX(H(NT)) + 6, b = lerp(a, 1745, ke);
    ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.moveTo(a, RY); ctx.lineTo(b, RY); ctx.stroke(); ctx.restore();
    arrowHead(ctx, [b + 4, RY], 0, C.r, ke);
  }
  drawRich(ctx, '{mr:+∞}', 1712, RY - 40, { size: 44, local: t - 77.6 });
  ctx.restore();
}
// le disuguaglianze dei gruppi, allineate sul segno «>»
const RIGHE_G = [
  ['{dim:2 termini}', '{mink:1/3 + 1/4}', '{mink:> 1/4 + 1/4 = }{mg:1/2}', 40.1, 44.7],
  ['{dim:4 termini}', '{mink:1/5 + 1/6 + 1/7 + 1/8}', '{mink:> 4 · 1/8 = }{mg:1/2}', 49.7, 54.5],
  ['{dim:8 termini}', '{mink:1/9 + … + 1/16}', '{mink:> 8 · 1/16 = }{mg:1/2}', 58.5, 59.6],
  ['', '{mink:S₁₆}', '{mink:> 1 + 1/2 + 1/2 + 1/2 + 1/2 = }{mg:3}', 68.1, 68.6],
];
function sceneGruppi(ctx, t) {
  const al = life(t, 39.9, FINE + .3, .5, .6);
  if (al <= 0) return;
  card(ctx, 150, 110, 1620, 400, al);
  ctx.save(); ctx.globalAlpha *= al;
  RIGHE_G.forEach(([eti, sx, dx, a, b], i) => {
    const y = 180 + i * 92;
    drawRich(ctx, eti, 200, y, { size: 32, align: 'left', local: t - a });
    drawRich(ctx, sx, 950, y, { size: 48, align: 'right', local: t - a });
    drawRich(ctx, dx, 975, y, { size: 48, align: 'left', local: t - b });
  });
  ctx.restore();
}

// 0 · titolo
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Piano piano, all’infinito', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// chiusura
function sceneFine(ctx, t) {
  if (t < FINE) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, DUR - 2.4, DUR - 1.4);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Termini che tendono a 0 non bastano:\nla serie armonica {r:diverge}.', W / 2, 290, { size: 62, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[400, '{dim:i termini}', '{mink:1/}{mx:n}{mink: → 0}'], [960, '{dim:ogni gruppo}', '{mink:> }{mg:1/2}'], [1520, '{dim:la somma}', '{mink:Sₙ → }{mr:+∞}']];
  pills.forEach(([x, testa, corpo], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 545); ctx.scale(k, k); ctx.translate(-x, -545);
    card(ctx, x - 240, 445, 480, 200);
    drawRich(ctx, testa, x, 484, { size: 30, weight: 400 });
    drawRich(ctx, corpo, x, 568, { size: 54 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): le barre scendono, le somme salgono piano; ogni gruppo chiuso è un ding
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', 8.3, .9], ['pop', 9.1, .6], ['pop', 9.9, .45], ['pop', 10.7, .35],   // 1, 1/2, 1/3, 1/4
    ['tono', 11.4, 12.3, [.3, .2, .14, .1, .08]], ['pop', 13.0, .1],                 // i termini sempre più bassi, → 0
    ['soffio', 16.9], ['tono', 17.2, 18.8, [.2, .45, .55, .62]],                      // S₁ … S₄
    ['tono', 21.6, 23.6, [.65, .75, .82]], ['pop', 27.1, .9],                        // S₁₀, S₁₀₀, S₁₀₀₀; un milione
    ['soffio', 35.3], ['traccia', 35.6, 39.3],                                        // la riga
    ['pop', 35.7, .3], ['pop', 36.3, .45], ['pop', 36.8, .55], ['pop', 37.2, .6],     // 1, 1/2, 1/3, 1/4 in fila
    ['tono', 37.5, 39.3, [.62, .7, .76, .8]],                                         // gli altri, sempre più corti
    ['soffio', 39.9], ['traccia', 40.2, 40.6], ['ding', 44.9],                        // 1/3 + 1/4 > 1/2
    ['traccia', 49.7, 50.1], ['ding', 54.7],                                          // da 1/5 a 1/8
    ['traccia', 58.5, 58.9], ['ding', 59.8],                                          // da 1/9 a 1/16
    ['traccia', 63.3, 63.7], ['traccia', 63.8, 64.2], ['pop', 63.5, .65], ['pop', 64.0, .75],   // i gruppi dopo
    ['pop', 68.2, .7], ['ding', 68.8],                                                // S₁₆ > 3
    ['tono', 72.8, 74.0, [.6, .95]], ['pop', 77.7, .95],                              // la riga non finisce; +∞
    ['soffio', FINE + .4], ['pop', FINE + 2.3, .5], ['pop', FINE + 2.8, .6], ['pop', FINE + 3.3, .7],
  ];
  return {
    titolo: 'Piano piano, all’infinito', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 35.1, 'i termini e le somme'], [35.1, FINE, 'a gruppi']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneBarre(ctx, t); sceneSomme(ctx, t); sceneRiga(ctx, t); sceneGruppi(ctx, t); sceneFine(ctx, t); },
  };
});
