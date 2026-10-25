'use strict';
/* Il massimo si raggiunge in un vertice — programmazione lineare col metodo grafico. Vincoli x ≥ 0, y ≥ 0, x + y ≤ 6, x ≤ 4,
   y ≤ 5: la regione ammissibile è il poligono O(0; 0), A(4; 0), B(4; 2), C(1; 5), D(0; 5). La funzione obiettivo
   z = 3x + 2y vale 0, 12, 16, 13, 10 nei vertici. Le rette 3x + 2y = k sono parallele: k cresce, la retta scorre e
   l'ultimo punto della regione che tocca è B(4; 2), dove z = 16 è il massimo. Se il massimo esiste, si raggiunge in
   un vertice. Argomento: ricerca-operativa (non c'è ancora: sezione «La programmazione lineare: metodo grafico»). */
CVIDEO.registra('ricerca-operativa/vertice', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, dot, glowStroke, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['xy', 5.6, 'Scelgo due quantità, {mx:x} e {my:y}:\nnon possono essere negative.'],
  ['v1', 6.0, 'Primo vincolo: {mink:x + y ≤ 6}.\nSi resta sotto questa retta.'],
  ['v2', 5.2, 'Poi {mink:x ≤ 4}: a sinistra\ndella retta verticale.'],
  ['v3', 4.6, 'E {mink:y ≤ 5}: sotto\nla retta orizzontale.'],
  ['regione', 6.0, 'Restano i punti che rispettano tutto:\nla {v:regione ammissibile}.'],
  ['vertici', 5.8, 'È un poligono con cinque {v:vertici}:\n{mink:O}, {mink:A}, {mink:B}, {mink:C} e {mink:D}.'],
  ['z', 7.0, 'Cerco il punto dove {mink:z = 3x + 2y}\nè più grande: la {g:funzione obiettivo}.', .3],
  ['k', 7.4, 'Dove {mink:z} vale un numero fisso {mink:k},\ni punti sono sulla retta {mink:3x + 2y = k}.'],
  ['scorre', 5.4, 'Se {mink:k} cresce, la retta scorre\n{v:parallela} a se stessa…'],
  ['esce', 6.4, '…e l’ultimo punto che tocca\nprima di uscire è {mink:B(4; 2)}.'],
  ['vale', 5.6, 'Lì {mink:z = 3 · 4 + 2 · 2 =} {g:16}:\nè il {g:massimo}.'],
  ['tabella', 5.0, 'Controllo: calcolo {mink:z}\nin ogni vertice.', .3],
  ['conferma', 5.0, 'Il più grande è proprio\nquello di {mink:B}: {g:16}.'],
  ['teorema', 6.8, 'Se il massimo esiste, si raggiunge\nin un {v:vertice}: basta provare quelli.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Tante scelte, dei limiti da rispettare:\nqual è la migliore?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'La retta scorre e lascia la regione\nin un vertice: lì c’è il massimo.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.regione, 'felice'], [T.regione + 2.4, 'neutro'], [T.z, 'pensa'], [T.z + 2.6, 'neutro'],
  [T.esce + 1.2, 'sorpreso'], [T.esce + 3.4, 'neutro'], [T.vale + 1.0, 'festa'], [T.vale + 3.4, 'neutro'],
  [T.conferma, 'felice'], [T.conferma + 2.4, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// il piano: solo il primo quadrante, dove stanno i vincoli x ≥ 0 e y ≥ 0
const RQ = [70, 110, 830, 690];
const PL = { ox: 150, oy: 745, u: 84, x1: 7.6, y1: 6.8 };
const S = (x, y) => [PL.ox + x * PL.u, PL.oy - y * PL.u];
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// ritaglio di un poligono con il semipiano a·x + b·y ≤ c (Sutherland–Hodgman)
function taglia(poli, a, b, c) {
  const out = [], f = p => a * p[0] + b * p[1] - c;
  for (let i = 0; i < poli.length; i++) {
    const p = poli[i], q = poli[(i + 1) % poli.length], fp = f(p), fq = f(q);
    if (fp <= 1e-9) out.push(p);
    if ((fp < -1e-9 && fq > 1e-9) || (fp > 1e-9 && fq < -1e-9)) { const s = fp / (fp - fq); out.push([lerp(p[0], q[0], s), lerp(p[1], q[1], s)]); }
  }
  return out;
}
const VINC = [[1, 1, 6], [1, 0, 4], [0, 1, 5]];   // x + y ≤ 6, x ≤ 4, y ≤ 5
const REG = [[[0, 0], [PL.x1, 0], [PL.x1, PL.y1], [0, PL.y1]]];
VINC.forEach(([a, b, c]) => REG.push(taglia(REG[REG.length - 1], a, b, c)));
// la retta a·x + b·y = c dentro il primo quadrante del piano
function segmentoRetta(a, b, c, Y1 = PL.y1) {   // Y1 più basso per la retta che scorre: in alto c'è il nome dell'asse y
  const pts = [];
  if (b) { pts.push([0, c / b]); pts.push([PL.x1, (c - a * PL.x1) / b]); }
  if (a) { pts.push([c / a, 0]); pts.push([(c - b * Y1) / a, Y1]); }
  const dentro = pts.filter(([x, y]) => x > -1e-9 && x < PL.x1 + 1e-9 && y > -1e-9 && y < Y1 + 1e-9);
  dentro.sort((p, q) => p[0] - q[0] || q[1] - p[1]);
  return dentro.length >= 2 ? [dentro[0], dentro[dentro.length - 1]] : null;
}
const LINEE = VINC.map(([a, b, c]) => segmentoRetta(a, b, c));
function poligono(ctx, pts) { ctx.beginPath(); pts.forEach((p, i) => { const q = S(p[0], p[1]); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath(); }
function assi(ctx, k) {
  if (k <= 0) return;
  const { ox, oy, u, x1, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = 1; i <= x1; i++) { const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy + 8); ctx.stroke(); }
  for (let j = 1; j <= y1; j++) { const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox - 8, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox - 14, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy + 14); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // numeri sotto l'asse x e a sinistra dell'asse y: le rette restano nel primo quadrante e non ci passano mai
  for (let i = 1; i <= x1; i++) txt(ctx, String(i), ox + i * u, oy + 34, { size: 30, color: C.dim });
  for (let j = 2; j <= y1; j += 2) txt(ctx, String(j), ox - 20, oy - j * u, { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}
// i vertici: [nome, x, y, spostamento dell'etichetta in pixel], etichette dove le rette dei vincoli non passano
const VERT = [['O', 0, 0, -28, 30], ['A', 4, 0, 30, -30], ['B', 4, 2, 30, -30], ['C', 1, 5, -24, 34], ['D', 0, 5, -32, 0]];
const VAL = VERT.map(([, x, y]) => 3 * x + 2 * y);   // 0, 12, 16, 13, 10
// k della retta 3x + 2y = k: fermo a 6, scorre fino a 14 mentre Ada lo dice, poi arriva a 16 e si ferma
const kRetta = t => kf2(t, [[T.scorre + .4, 6], [T.scorre + 4.4, 14], [T.esce + .2, 14], [T.esce + 1.4, 16]]);
function kf2(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], P(t, keys[i - 1][0], keys[i][0], i === keys.length - 1 ? E.out : E.io));
  return keys[keys.length - 1][1];
}
// distanza in pixel fra un punto (pixel) e un segmento (pixel)
function distSeg(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1;
  const s = clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2);
  return Math.hypot(p[0] - a[0] - s * dx, p[1] - a[1] - s * dy);
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il massimo si raggiunge\nin un vertice', W / 2, 205, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · il piano: i vincoli tagliano la regione, la retta della funzione obiettivo scorre (7.5–FINE)
const T_V = ['v1', 'v2', 'v3'];
function scenePiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  assi(ctx, P(t, 7.7, 8.7));
  // la regione: il primo quadrante, poi ogni vincolo ne toglie un pezzo (in rosso, che sfuma)
  let n = 0; T_V.forEach(k => { if (t > T[k] + 1.2) n++; });
  const kq = P(t, T.xy + .3, T.xy + 1.1);
  if (kq > 0) {
    ctx.save(); ctx.fillStyle = css(C.v, .14 * kq); poligono(ctx, REG[n]); ctx.fill(); ctx.restore();
    if (n > 0) {
      const kc = 1 - P(t, T[T_V[n - 1]] + 3.4, T[T_V[n - 1]] + 4.4);
      if (kc > 0) {
        ctx.save(); ctx.fillStyle = css(C.r, .2 * kc);
        ctx.beginPath();
        [REG[n - 1], REG[n]].forEach(pts => pts.forEach((p, i) => { const q = S(p[0], p[1]); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }));
        ctx.fill('evenodd'); ctx.restore();
      }
    }
  }
  // le rette dei vincoli: si disegnano mentre Ada le nomina, più spesse finché se ne parla
  T_V.forEach((k, i) => {
    const kd = P(t, T[k] + .3, T[k] + 1.1, E.lin);
    if (kd <= 0) return;
    const [a, b] = LINEE[i], spessa = 1 - P(t, T[k] + 4.2, T[k] + 4.8);
    glowStroke(ctx, [S(a[0], a[1]), S(b[0], b[1])], kd, mix(mix(C.v, C.paper, .35), C.v, spessa), 3 + 2 * spessa);
  });
  // il bordo della regione ammissibile
  const kb = P(t, T.regione + .3, T.regione + 1.3, E.lin);
  if (kb > 0) {
    const pts = REG[3].concat([REG[3][0]]).map(p => S(p[0], p[1]));
    glowStroke(ctx, pts, kb, C.v, 5);
  }
  // la retta 3x + 2y = k, solo nel primo quadrante
  const kr = P(t, T.k + .3, T.k + 1.0);
  let seg = null;
  if (kr > 0) {
    const k = kRetta(t), sr = segmentoRetta(3, 2, k, 6.3);
    // le posizioni già passate (k = 6 e k = 10) restano tratteggiate: si vede che le rette sono parallele
    [6, 10].forEach(kg => {
      const g = segmentoRetta(3, 2, kg, 6.3), a = clamp((k - kg - .3) / .8);
      if (g && a > 0) { ctx.save(); ctx.globalAlpha *= .55 * a * kr; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.setLineDash([10, 10]);
        ctx.beginPath(); ctx.moveTo(...S(g[0][0], g[0][1])); ctx.lineTo(...S(g[1][0], g[1][1])); ctx.stroke(); ctx.restore(); }
    });
    if (sr) { seg = [S(sr[0][0], sr[0][1]), S(sr[1][0], sr[1][1])]; glowStroke(ctx, seg, P(t, T.k + .3, T.k + 1.1, E.lin), C.g, 5); }
  }
  // i vertici e le loro lettere; una lettera sfuma solo se la retta che scorre le passa vicino
  const kv = P(t, T.vertici + .3, T.vertici + 1.5);
  VERT.forEach(([nome, x, y, dx, dy], i) => {
    const ki = P(t, T.vertici + .3 + i * .25, T.vertici + .7 + i * .25, E.back);
    if (ki <= .01) return;
    const p = S(x, y), verde = nome === 'B' ? P(t, T.esce + 1.2, T.esce + 1.7) : 0;
    dot(ctx, p, mix(C.ink, C.g, verde), ki, 9 + 3 * verde);
    const q = [p[0] + dx, p[1] + dy];
    let a = kv;
    if (seg) { const d = distSeg(q, seg[0], seg[1]); a *= 1 - kr * (1 - clamp((d - 26) / 10)); }
    lab(ctx, '{mink:' + nome + '}', q[0], q[1], a);
  });
  ctx.restore();
}

// la scheda a destra: i vincoli, poi la funzione obiettivo e k, poi la tabella dei vertici
const XL = 1010, XR = 1800, XC = 1405;
const RIGHE_V = [['xy', '{mx:x}{mink: ≥ 0,   }{my:y}{mink: ≥ 0}'], ['v1', '{mx:x}{mink: + }{my:y}{mink: ≤ 6}'], ['v2', '{mx:x}{mink: ≤ 4}'], ['v3', '{my:y}{mink: ≤ 5}']];
function sceneScheda(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 950, 110, 910, 690, P(t, 7.5, 8.2) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  // i vincoli, finché non arriva la funzione obiettivo
  const kV = 1 - P(t, T.z, T.z + .4);
  if (kV > 0) {
    ctx.save(); ctx.globalAlpha *= kV;
    conFont(TITOLI, () => drawRich(ctx, 'vincoli', XC, 172, { size: 40, weight: 600, alpha: P(t, T.xy, T.xy + .5) }));
    RIGHE_V.forEach(([k, s], i) => {
      const a = P(t, T[k] + .3, T[k] + .8); if (a <= 0) return;
      const viva = i > 0 ? 1 - P(t, T[k] + 4.2, T[k] + 4.8) : 0;
      if (viva > 0) { ctx.save(); ctx.globalAlpha *= a * viva; ctx.fillStyle = css(C.v, .1); ctx.beginPath(); ctx.roundRect(XC - 260, 256 + i * 82 - 34, 520, 68, 14); ctx.fill(); ctx.restore(); }
      lab(ctx, s, XC, 256 + i * 82, a, 50);
    });
    lab(ctx, '{v:regione ammissibile}', XC, 640, P(t, T.regione + .4, T.regione + .9), 44);
    lab(ctx, '{dim:5 vertici:} {mink:O, A, B, C, D}', XC, 716, P(t, T.vertici + .5, T.vertici + 1.0), 40);
    ctx.restore();
  }
  if (t > T.z) {
    conFont(TITOLI, () => drawRich(ctx, 'funzione obiettivo', XC, 172, { size: 40, weight: 600, alpha: P(t, T.z + .3, T.z + .8) }));
    lab(ctx, '{mink:z = 3}{mx:x}{mink: + 2}{my:y}', XC, 262, P(t, T.z + .4, T.z + .9), 56);
    // la retta e il suo k, finché non arriva la tabella
    const kK = life(t, T.k + .3, T.tabella + .2, .5, .4);
    if (kK > 0) {
      ctx.save(); ctx.globalAlpha *= kK;
      lab(ctx, '{dim:retta}  {mg:3x + 2y = k}', XC, 378, 1, 44);
      const k = Math.round(kRetta(t));
      drawRich(ctx, '{mink:k =}', XC - 20, 470, { size: 56, align: 'right' });
      txt(ctx, String(k), XC + 6, 470, { size: 60, weight: 600, align: 'left', color: k === 16 && t > T.esce + 1.2 ? C.g : C.ink });
      lab(ctx, '{mink:z = 3 · 4 + 2 · 2 =} {mg:16}', XC, 580, P(t, T.vale + .3, T.vale + .8), 48);
      lab(ctx, '{g:massimo,} {dim:in} {mink:B(4; 2)}', XC, 672, P(t, T.vale + 1.2, T.vale + 1.7), 44);
      ctx.restore();
    }
    // la tabella dei vertici
    const kT = P(t, T.tabella + .2, T.tabella + .6);
    if (kT > 0) {
      ctx.save(); ctx.globalAlpha *= kT;
      txt(ctx, 'vertice', XC - 130, 356, { size: 32, color: C.dim });
      drawRich(ctx, '{mink:z}', XC + 170, 356, { size: 40 });
      ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XC - 300, 386); ctx.lineTo(XC + 300, 386); ctx.stroke();
      const kB = P(t, T.conferma + .3, T.conferma + .8);
      if (kB > 0) { ctx.save(); ctx.globalAlpha *= kB; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(XC - 300, 422 + 2 * 62 - 28, 600, 56, 14); ctx.stroke(); ctx.restore(); }
      VERT.forEach(([nome, x, y], i) => {
        const a = P(t, T.tabella + .6 + i * .4, T.tabella + 1.0 + i * .4); if (a <= 0) return;
        const yy = 422 + i * 62, top = nome === 'B' && kB > 0;
        lab(ctx, '{mink:' + nome + '(' + x + '; ' + y + ')}', XC - 130, yy, a, 44);
        txt(ctx, String(VAL[i]), XC + 170, yy, { size: 44, weight: top ? 600 : 500, color: top ? C.g : C.ink, alpha: a });
      });
      ctx.restore();
    }
    lab(ctx, '{dim:se esiste, il massimo si raggiunge in un} {v:vertice}', XC, 740, P(t, T.teorema + .5, T.teorema + 1.0), 36);
  }
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Se il massimo esiste,\nsi raggiunge in un vertice della regione.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'regione', '{v:ammissibile}'], [960, 'la retta', '{mg:3x + 2y = k}{dim: scorre}'], [1450, 'massimo', '{mg:16}{dim: in }{mink:B(4; 2)}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: 40 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue k mentre la retta sale
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],                                  // il piano
    ['pop', T.xy + .3, .4],                                                                   // il primo quadrante
    ['traccia', T.v1 + .3, T.v1 + 1.1], ['pop', T.v1 + .3, .5],                               // x + y ≤ 6
    ['traccia', T.v2 + .3, T.v2 + 1.1], ['pop', T.v2 + .3, .55],                              // x ≤ 4
    ['traccia', T.v3 + .3, T.v3 + 1.1], ['pop', T.v3 + .3, .6],                               // y ≤ 5
    ['traccia', T.regione + .3, T.regione + 1.3], ['ding', T.regione + .5],                   // la regione ammissibile
    ['pop', T.vertici + .3, .3], ['pop', T.vertici + .55, .4], ['pop', T.vertici + .8, .5], ['pop', T.vertici + 1.05, .6], ['pop', T.vertici + 1.3, .7],
    ['soffio', T.z], ['pop', T.z + .4, .6],                                                   // z = 3x + 2y
    ['traccia', T.k + .3, T.k + 1.1],                                                         // la retta con k = 6
    ['tono', T.scorre + .4, T.scorre + 4.4, [.2, .3, .5, .7, .75]],                           // k sale da 6 a 14
    ['tono', T.esce + .2, T.esce + 1.4, [.75, .85, .9]], ['ding', T.esce + 1.3],              // si ferma in B, a 16
    ['pop', T.vale + .5, .7],
    ['soffio', T.tabella + .2],
    ['pop', T.tabella + .6, .2], ['pop', T.tabella + 1.0, .55], ['pop', T.tabella + 1.4, .75], ['pop', T.tabella + 1.8, .6], ['pop', T.tabella + 2.2, .45],
    ['ding', T.conferma + .4], ['pop', T.teorema + .5, .6],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il massimo si raggiunge in un vertice', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.z - .2, 'la regione ammissibile'], [T.z - .2, T.tabella - .2, 'la retta che scorre'], [T.tabella - .2, FINE, 'il conto nei vertici']],
    scena(ctx, t) { sceneIntro(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
