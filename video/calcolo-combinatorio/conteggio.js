'use strict';
/* Il principio del conteggio — 2 magliette e 3 pantaloni: l'albero delle scelte, ogni percorso è un completo,
   2 · 3 = 6 perché ogni maglietta apre gli stessi 3 rami; la regola n₁ · n₂ · … · nₖ e la sua condizione
   (il numero di scelte di un passo non dipende da quello che hai scelto prima). Argomento: calcolo-combinatorio. */
CVIDEO.registra('calcolo-combinatorio/conteggio', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, txt, glowStroke, card, crossMark } = M;

const FINE = 75.6, DUR = 88;
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [8.0, 'neutro'],
  [25.4, 'felice'], [27.6, 'neutro'], [30.1, 'felice'], [32.2, 'neutro'], [38.5, 'festa'], [40.8, 'neutro'],
  [56.6, 'pensa'], [61.7, 'sorpreso'], [63.9, 'neutro'],
  [FINE, 'neutro'], [77.8, 'felice'], [82.6, 'occhiolino'],
];
// una frase per ogni cosa che succede; l'albero cresce un passo alla volta e sta fermo mentre Ada ne parla
const FUMETTI = [
  [2.4, 6.4, '2 magliette e 3 pantaloni:\nquanti completi puoi fare?'],
  // 1 · l'albero
  [8.0, 11.9, 'Disegno un albero delle scelte:\nsi parte da qui.'],
  [12.0, 16.4, 'Primo passo, la maglietta:\ndue rami, {x:A} oppure {x:B}.'],
  [16.5, 20.9, 'Secondo passo, i pantaloni:\ncon {x:A} ne posso mettere {y:3}.'],
  [21.0, 25.3, 'Anche con {x:B} ho gli stessi\n{y:3} pantaloni: altri 3 rami.'],
  [25.4, 30.0, 'Ogni percorso dall’inizio a una punta\nè un completo: questo è {x:A}{y:2}.'],
  [30.1, 33.8, 'Ecco tutti i completi:\nsono {g:6}.'],
  // 2 · perché si moltiplica
  [34.0, 38.4, 'Ogni maglietta apre lo stesso\nnumero di rami: {y:3}.'],
  [38.5, 42.7, 'Sono 2 gruppi da 3 rami:\n{mink:2 · 3 = 6} completi.'],
  [42.8, 46.2, 'È il {v:principio fondamentale}\n{v:del conteggio}.'],
  [46.3, 52.1, 'Una scelta in più passi: il primo\nsi fa in {mink:n₁} modi, il secondo in {mink:n₂}…'],
  [52.2, 56.5, '…e così via fino all’ultimo passo:\ni modi si {g:moltiplicano} tutti.'],
  // 3 · la condizione
  [56.6, 61.6, 'C’è una condizione: quante scelte hai\nnon deve dipendere da cosa hai scelto.'],
  [61.7, 65.9, 'Se con {x:B} il pantalone {y:3}\nnon si può mettere…'],
  [66.0, 70.5, '…da {x:B} partono solo 2 rami:\ni completi sono {mink:3 + 2 = 5}.'],
  [70.6, 75.1, 'Quante scelte ha il secondo passo\ndipende dal primo: {r:niente} {mink:2 · 3}.'],
  // chiusura
  [77.8, 85.0, 'Il numero di scelte di ogni passo\nnon dipende da prima: si {g:moltiplica}.'],
];

// ---------- l'albero ----------
const CT = [110, 110, 1240, 690], CC = [1390, 110, 450, 690];
const RAD = [260, 460];
const SX = 520, MAG = [['A', 305], ['B', 615]];
const PX = 830, PAN = { A: [210, 305, 400], B: [520, 615, 710] };
const LX = 1020;
// la maglietta e i pantaloni, centrati in (x, y), larghi circa 1,6 s e 0,9 s
function maglietta(ctx, x, y, s, col, lettera, k = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= Math.min(1, k); ctx.translate(x, y); ctx.scale(s * k, s * k);
  ctx.beginPath();
  ctx.moveTo(-.2, -.5); ctx.lineTo(-.55, -.38); ctx.lineTo(-.8, -.05); ctx.lineTo(-.58, .08); ctx.lineTo(-.42, -.1);
  ctx.lineTo(-.42, .55); ctx.lineTo(.42, .55); ctx.lineTo(.42, -.1); ctx.lineTo(.58, .08); ctx.lineTo(.8, -.05);
  ctx.lineTo(.55, -.38); ctx.lineTo(.2, -.5); ctx.quadraticCurveTo(0, -.3, -.2, -.5); ctx.closePath();
  ctx.fillStyle = css(col); ctx.fill();
  ctx.restore();
  if (lettera) txt(ctx, lettera, x, y + .1 * s, { size: Math.round(.48 * s), weight: 700, color: C.paper, alpha: Math.min(1, k) });
}
function pantaloni(ctx, x, y, s, col, numero, k = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= Math.min(1, k); ctx.translate(x, y); ctx.scale(s * k, s * k);
  ctx.beginPath();
  ctx.moveTo(-.4, -.55); ctx.lineTo(.4, -.55); ctx.lineTo(.47, .6); ctx.lineTo(.1, .6); ctx.lineTo(0, -.08);
  ctx.lineTo(-.1, .6); ctx.lineTo(-.47, .6); ctx.closePath();
  ctx.fillStyle = css(col); ctx.fill();
  ctx.restore();
  if (numero) txt(ctx, numero, x, y - .22 * s, { size: Math.round(.47 * s), weight: 700, color: C.paper, alpha: Math.min(1, k) });
}
// un ramo che cresce da a verso b (k fra 0 e 1)
function ramo(ctx, a, b, k, col, w = 4, al = 1, tratt = false) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  if (tratt) ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
// i capi dei rami: dal pallino alla maglietta, dalla maglietta ai pantaloni (le linee non toccano mai le figure)
const R1 = y => [[RAD[0] + 18, RAD[1] + (y - RAD[1]) * 18 / (SX - RAD[0])], [SX - 70, y - (y - RAD[1]) * 70 / (SX - RAD[0])]];
const R2 = (ys, yp) => [[SX + 68, ys + (yp - ys) * 68 / (PX - SX)], [PX - 38, yp - (yp - ys) * 38 / (PX - SX)]];
// n₁ · n₂ · … · nₖ: il pedice k non c'è fra i segni del motore, lo scrivo io piccolo e abbassato
function prodotto(ctx, cx, cy, size, al = 1, local = 99) {
  if (al <= 0) return;
  const s = '{mink:n₁ · n₂ · … · n}', w = richW(ctx, s, size), wk = richW(ctx, '{mink:k}', size * .68);
  const x0 = cx - (w + wk) / 2;
  drawRich(ctx, s, x0, cy, { size, align: 'left', alpha: al, local });
  drawRich(ctx, '{mink:k}', x0 + w, cy + size * .26, { size: size * .68, align: 'left', alpha: al, local: local - .5 });
}

// 0 · titolo (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il principio del conteggio', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · l'albero (7.5–FINE)
const T_PAN = { A: 16.6, B: 21.1 };
function sceneAlbero(ctx, t) {
  if (t < 7.5 || t > FINE + .7) return;
  const al = life(t, 7.5, FINE, .6, .6);
  card(ctx, ...CT, al);
  ctx.save(); ctx.globalAlpha *= al;
  const grigio = mixInk();
  // il ramo B → 3 diventa rosso e tratteggiato quando non si può più mettere
  const kNo = P(t, 61.8, 62.4);
  // intestazioni delle colonne
  txt(ctx, 'maglietta', SX, 150, { size: 32, color: C.dim, alpha: P(t, 12.1, 12.6) });
  txt(ctx, 'pantaloni', PX, 150, { size: 32, color: C.dim, alpha: P(t, 16.6, 17.1) });
  txt(ctx, 'completo', LX, 150, { size: 32, color: C.dim, alpha: P(t, 25.6, 26.1) });
  // inizio
  ball(ctx, RAD, P(t, 8.1, 8.5, E.back));
  txt(ctx, 'inizio', RAD[0] - 30, RAD[1], { size: 32, color: C.dim, align: 'right', alpha: P(t, 8.3, 8.8) });
  // primo passo
  MAG.forEach(([L, ys], i) => {
    const [a, b] = R1(ys);
    ramo(ctx, a, b, P(t, 12.1 + i * .15, 12.8 + i * .15), grigio, 4);
  });
  // secondo passo
  MAG.forEach(([L, ys]) => PAN[L].forEach((yp, j) => {
    const t0 = T_PAN[L] + j * .15, [a, b] = R2(ys, yp);
    const no = L === 'B' && j === 2 ? kNo : 0;
    ramo(ctx, a, b, P(t, t0, t0 + .6), grigio, 4, 1 - no);
    if (no > 0) ramo(ctx, a, b, 1, C.r, 4, no, true);
  }));
  // il percorso del completo A2
  const hp = life(t, 25.5, 30.0, .3, .4);
  if (hp > 0) {
    ctx.save(); ctx.globalAlpha *= hp;
    glowStroke(ctx, R1(305), P(t, 25.5, 25.9), C.v, 7);
    glowStroke(ctx, R2(305, 305), P(t, 25.9, 26.3), C.v, 7);
    ctx.restore();
  }
  // le figure sopra i rami
  MAG.forEach(([L, ys], i) => maglietta(ctx, SX, ys, 78, C.x, L, P(t, 12.6 + i * .15, 13.1 + i * .15, E.back)));
  MAG.forEach(([L]) => PAN[L].forEach((yp, j) => {
    const t0 = T_PAN[L] + .5 + j * .15, no = L === 'B' && j === 2 ? kNo : 0;
    ctx.save(); ctx.globalAlpha *= 1 - .65 * no;
    pantaloni(ctx, PX, yp, 64, C.y, String(j + 1), P(t, t0, t0 + .5, E.back));
    ctx.restore();
  }));
  // le punte: i completi
  let n = 0;
  MAG.forEach(([L]) => PAN[L].forEach((yp, j) => {
    const primo = L === 'A' && j === 1;
    const a0 = primo ? 26.3 : 30.2 + .18 * n++;
    const no = L === 'B' && j === 2 ? kNo : 0;
    drawRich(ctx, `{x:${L}}{y:${j + 1}}`, LX, yp, { size: 44, weight: 600, alpha: P(t, a0, a0 + .4) * (1 - .8 * no) });
    if (no > 0) crossMark(ctx, LX, yp, P(t, 62.0, 62.9), C.r, .45);
  }));
  // il completo A2, disegnato in grande accanto alla sua punta
  const ka = life(t, 26.5, 30.0, .4, .4);
  if (ka > 0) {
    ctx.save(); ctx.globalAlpha *= ka;
    maglietta(ctx, 1230, 268, 62, C.x, 'A');
    pantaloni(ctx, 1230, 350, 52, C.y, '2');
    ctx.restore();
  }
  // le parentesi dei gruppi: ogni maglietta apre 3 rami
  graffa(ctx, 175, 435, '{y:3}', P(t, 34.1, 34.6));
  const o = P(t, 66.1, 66.3), i2 = P(t, 66.35, 66.6);
  graffa(ctx, 485, 745, '{y:3}', P(t, 34.4, 34.9) * (1 - o));
  graffa(ctx, 485, 650, '{y:2}', i2);
  ctx.restore();
}
function mixInk() { return M.mix(C.ink, C.paper, .45); }
function graffa(ctx, y0, y1, s, k) {
  if (k <= 0) return;
  const x = 1110, ym = (y0 + y1) / 2;
  ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - 12, y0); ctx.lineTo(x, y0); ctx.lineTo(x, y1); ctx.lineTo(x - 12, y1);
  ctx.moveTo(x, ym); ctx.lineTo(x + 12, ym); ctx.stroke(); ctx.restore();
  drawRich(ctx, s, x + 48, ym, { size: 52, weight: 600, alpha: k });
}
function ball(ctx, p, k) { if (k > 0) M.dot(ctx, p, C.ink, k, 14); }

// la scheda dei conti, a destra (34–FINE)
function sceneConti(ctx, t) {
  if (t < 33.9 || t > FINE + .7) return;
  const al = life(t, 38.2, FINE, .5, .6);
  card(ctx, ...CC, al);
  ctx.save(); ctx.globalAlpha *= al;
  const xl = CC[0] + 36, xr = CC[0] + CC[2] - 36, xm = CC[0] + CC[2] / 2;
  // 2 · perché si moltiplica
  const p1 = 1 - P(t, 56.6, 57.0);
  if (p1 > 0) {
    ctx.save(); ctx.globalAlpha *= p1;
    const kn = P(t, 46.5, 46.9);
    const r = (lab, n, sim, y, a, col) => {
      const k = P(t, a, a + .4); if (k <= 0) return;
      txt(ctx, lab, xl, y, { size: 32, color: C.dim, align: 'left', alpha: k });
      txt(ctx, n, xr, y, { size: 60, weight: 600, color: col, align: 'right', alpha: k });
      drawRich(ctx, `{mink:${sim} =}`, xr - 50, y, { size: 46, align: 'right', alpha: k * kn });
    };
    r('magliette', '2', 'n₁', 190, 38.6, C.x);
    r('pantaloni', '3', 'n₂', 285, 38.9, C.y);
    const kl = P(t, 39.2, 39.6);
    if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xl, 340); ctx.lineTo(xr, 340); ctx.stroke(); ctx.restore(); }
    txt(ctx, 'completi', xl, 392, { size: 32, color: C.dim, align: 'left', alpha: kl });
    drawRich(ctx, '{mx:2}{mink: · }{my:3}{mink: = }{mg:6}', xm, 470, { size: 64, local: t - 39.5 });
    conFont(TITOLI, () => drawRich(ctx, '{v:regola del prodotto}', xm, 590, { size: 38, weight: 600, local: t - 42.9 }));
    prodotto(ctx, xm, 670, 52, P(t, 52.3, 52.8), t - 52.3);
    drawRich(ctx, '{mink:k}{dim: = numero dei passi}', xm, 745, { size: 32, local: t - 53.0 });
    ctx.restore();
  }
  // 3 · la condizione
  const p2 = P(t, 57.0, 57.5);
  if (p2 > 0) {
    ctx.save(); ctx.globalAlpha *= p2;
    conFont(TITOLI, () => drawRich(ctx, '{v:la condizione}', xm, 175, { size: 38, weight: 600 }));
    drawRich(ctx, 'il numero di scelte\ndi un passo non dipende\ndalle scelte di prima', xm, 285, { size: 32, weight: 400, lh: 1.3, local: t - 57.2, stagger: .04 });
    const kl = P(t, 66.1, 66.5);
    if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xl, 395); ctx.lineTo(xr, 395); ctx.stroke(); ctx.restore(); }
    drawRich(ctx, 'con {x:A}: {y:3} rami', xm, 450, { size: 40, local: t - 66.2 });
    drawRich(ctx, 'con {x:B}: {y:2} rami', xm, 520, { size: 40, local: t - 66.5 });
    drawRich(ctx, '{mink:3 + 2 = }{mg:5}', xm, 610, { size: 64, local: t - 66.9 });
    // «non 2 · 3»: la moltiplicazione barrata
    const kb = P(t, 70.7, 71.1);
    if (kb > 0) {
      drawRich(ctx, '{r:non}', xm - 70, 715, { size: 40, alpha: kb });
      drawRich(ctx, '{mink:2 · 3}', xm + 50, 715, { size: 50, alpha: kb });
      const w = richW(ctx, '{mink:2 · 3}', 50), ks = P(t, 71.2, 71.7);
      if (ks > 0) { ctx.save(); ctx.strokeStyle = css(C.r); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xm + 50 - w / 2 - 8, 718); ctx.lineTo(xm + 50 - w / 2 - 8 + (w + 16) * ks, 718); ctx.stroke(); ctx.restore(); }
    }
    ctx.restore();
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
    drawRich(ctx, 'Scelte fatte una dopo l’altra:\ni modi si {g:moltiplicano}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[420, 'ogni percorso\ndell’albero è un {g:completo}'], [960, ''], [1500, 'il numero di scelte\n{v:non dipende} da prima']];
  pills.forEach(([x, s], i) => {
    const a = FINE + 2.2 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 530); ctx.scale(k, k); ctx.translate(-x, -530);
    card(ctx, x - 240, 450, 480, 160);
    if (s) drawRich(ctx, s, x, 530, { size: 34, weight: 400, lh: 1.3 });
    else { drawRich(ctx, '{dim:regola del prodotto}', x, 492, { size: 30, weight: 400 }); prodotto(ctx, x, 560, 48); }
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il principio del conteggio', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, 33.9, 'l’albero delle scelte'], [33.9, 56.5, 'perché si moltiplica'], [56.5, FINE, 'la condizione']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneAlbero(ctx, t); sceneConti(ctx, t); sceneFine(ctx, t); },
  };
});
