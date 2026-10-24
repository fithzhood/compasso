'use strict';
/* Le isometrie in coordinate — una bandierina nel piano cartesiano (asta da (1; 2) a (1; 5), drappo (1; 5), (3; 5),
   (1; 4); la punta è P(3; 5)) e tre regole sulle coordinate: (x; y) → (−x; y) è la simmetria rispetto all'asse y,
   P′(−3; 5); (x; y) → (y; x) è la simmetria rispetto alla bisettrice y = x, P′(5; 3); (x; y) → (x + 3; y − 1) è la
   traslazione di vettore (3; −1), P′(6; 4). Tutte e tre conservano le distanze: isometrie. Il sito non usa x′, y′:
   il punto trasformato si chiama P′ e la regola si scrive con la freccia.
   Argomento: trasformazioni-geometriche (l'argomento non c'è ancora: sezione «Le trasformazioni nel piano cartesiano»). */
CVIDEO.registra('trasformazioni-geometriche/equazioni', M => {
  const { W, C, E, P, life, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, dot, arrowHead, makePlane, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['band', 5.0, 'Una bandierina nel piano:\nla punta è il punto {mink:P(3; 5)}.'],
  ['regola1', 6.4, 'Regola: {mink:(}{mx:x}{mink:; }{my:y}{mink:) → (−}{mx:x}{mink:; }{my:y}{mink:)}.\nLa {mx:x} cambia segno, la {my:y} resta.'],
  ['P1', 6.4, '{mink:P} va in {mink:P′(−3; 5)}: stessa altezza,\ndall’altra parte dell’asse {my:y}.'],
  ['tutta1', 5.4, 'Così ogni punto: è la {v:simmetria}\nrispetto all’asse {my:y}.'],
  ['regola2', 5.6, 'Nuova regola: {mink:(}{mx:x}{mink:; }{my:y}{mink:) → (}{my:y}{mink:; }{mx:x}{mink:)}.\nLe coordinate si {v:scambiano}.', .3],
  ['P2', 4.2, '{mink:P(3; 5)} va in {mink:P′(5; 3)}.'],
  ['tutta2', 5.6, 'È la {v:simmetria} rispetto\nalla bisettrice {mink:y = x}.'],
  ['regola3', 5.2, 'Ultima regola:\n{mink:(}{mx:x}{mink:; }{my:y}{mink:) → (}{mx:x}{mink: + 3; }{my:y}{mink: − 1)}.', .3],
  ['P3', 5.2, '{mink:P} va in {mink:P′(6; 4)}:\n3 a destra e 1 in basso.'],
  ['tutta3', 6.2, 'Ogni punto fa lo stesso passo: è la\n{v:traslazione} di vettore {mink:(3; −1)}.'],
  ['iso', 6.4, 'Nessuna delle tre cambia le distanze:\nsono tutte {g:isometrie}.'],
];
const T = {}, FUMETTI = [[2.3, 6.8, 'Una trasformazione si può scrivere\ncon le coordinate?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'La regola dice dove va ogni punto:\nè la trasformazione, in coordinate.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.tutta1, 'felice'], [T.tutta1 + 2.2, 'neutro'], [T.P2, 'sorpreso'], [T.P2 + 2.2, 'neutro'],
  [T.tutta2, 'felice'], [T.tutta2 + 2.2, 'neutro'], [T.tutta3, 'felice'], [T.tutta3 + 2.4, 'neutro'],
  [T.iso, 'festa'], [T.iso + 2.4, 'felice'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

const RQ = [70, 110, 930, 690];
const PL = makePlane({ ox: 427, oy: 697, u: 72, x0: -4.4, x1: 7, y0: -.8, y1: 6 }), S = p => PL.toS(p[0], p[1]);
const lab = (ctx, s, x, y, al, size = 40, align = 'center') => { if (al > 0) drawRich(ctx, s, x, y, { size, alpha: al, align }); };
// la bandierina: [base, cima dell'asta, punta P, attacco basso del drappo], in coordinate
const F0 = [[1, 2], [1, 5], [3, 5], [1, 4]];
const R1 = p => [-p[0], p[1]], R2 = p => [p[1], p[0]], R3 = p => [p[0] + 3, p[1] - 1];
const PP = F0[2];
function bandiera(ctx, pts, col, al = 1) {
  if (al <= 0) return;
  const [b, c, p, m] = pts.map(S);
  ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(p[0], p[1]); ctx.lineTo(m[0], m[1]); ctx.closePath();
  ctx.fillStyle = css(col, .3); ctx.fill(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.stroke();
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.stroke();
  dot(ctx, b, C.ink, 1, 7);
  ctx.restore();
}
function tratteggio(ctx, a, b, col, al, w = 3) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.setLineDash([9, 9]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
}
function freccia(ctx, a, b, col, k, al) {   // da a verso b (pixel), disegnata fino alla frazione k
  if (k <= 0 || al <= 0) return;
  const e = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0] - 8 * Math.cos(ang), e[1] - 8 * Math.sin(ang)); ctx.stroke();
  arrowHead(ctx, e, ang, col); ctx.restore();
}
// gli assi: numeri a 30 px, pieni, sotto l'asse x e a sinistra dell'asse y (nessuna figura ci passa: controllato con uno script)
function assi(ctx, k, giu5 = 0) {   // giu5: il 5 dell'asse y scende sotto la sua riga mentre il percorso di P ci passa sopra
  if (k <= 0) return;
  const { ox, oy, u, x0, x1, y0, y1 } = PL;
  ctx.save(); ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(x0); i <= x1; i++) { if (!i) continue; const x = ox + i * u; ctx.beginPath(); ctx.moveTo(x, oy - y1 * u * k); ctx.lineTo(x, oy - y0 * u * k); ctx.stroke(); }
  for (let j = Math.ceil(y0); j <= y1; j++) { if (!j) continue; const y = oy - j * u; ctx.beginPath(); ctx.moveTo(ox + x0 * u * k, y); ctx.lineTo(ox + x1 * u * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + (x0 - .1) * u * k, oy); ctx.lineTo(ox + (x1 + .15) * u * k, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, oy - (y0 - .1) * u * k); ctx.lineTo(ox, oy - (y1 + .2) * u * k); ctx.stroke();
  arrowHead(ctx, [ox + (x1 + .15) * u * k + 6, oy], 0, C.ink);
  arrowHead(ctx, [ox, oy - (y1 + .2) * u * k - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  for (let i = Math.ceil(x0); i <= x1; i++) if (i) txt(ctx, (i < 0 ? '−' : '') + Math.abs(i), ox + i * u, oy + 32, { size: 30, color: C.dim });
  for (let j = 1; j <= y1; j++) txt(ctx, String(j), ox - 18, oy - j * u + (j === 5 ? 30 * giu5 : 0), { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', ox + (x1 + .15) * u + 34, oy, { size: 44 });
  drawRich(ctx, '{my:y}', ox + 32, oy - (y1 + .2) * u + 4, { size: 44 });
  ctx.restore();
}

// le tre fasi: [chiave della regola, trasformazione, fine della fase]
const FASI = [['regola1', R1, 'regola2'], ['regola2', R2, 'regola3'], ['regola3', R3, 'FINE']];
const fineDi = k => k === 'FINE' ? FINE : T[k];
function scenaPiano(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, ...RQ, P(t, 7.5, 8.2));
  ctx.save(); ctx.globalAlpha *= 1 - P(t, T.iso, T.iso + .5);   // alle isometrie il piano lascia il posto alla fila delle bandierine
  assi(ctx, P(t, 7.7, 8.7));
  // la bisettrice, nella seconda fase
  const kb = life(t, T.tutta2 + .3, T.regola3 + .1, .8, .45);
  if (kb > 0) {
    const a = S([-.3, -.3]), b = S([6, 6]), kk = P(t, T.tutta2 + .3, T.tutta2 + 1.1);
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], kk), lerp(a[1], b[1], kk)); ctx.stroke(); ctx.restore();
    const lb = S([6.3, 5.6]);
    lab(ctx, '{mv:y = x}', lb[0], lb[1], P(t, T.tutta2 + .9, T.tutta2 + 1.3) * (1 - P(t, T.regola3 - .35, T.regola3 + .1)), 40, 'left');
  }
  // la bandierina di partenza e P
  bandiera(ctx, F0, C.x, P(t, T.band + .2, T.band + .8));
  const kP = P(t, T.band + .6, T.band + 1.0, E.back);
  const lp = S([2.4, 5.62]);
  lab(ctx, '{mink:P(3; 5)}', lp[0], lp[1], P(t, T.band + .8, T.band + 1.2));
  // ogni fase: P scivola in P′, poi tutta la bandierina
  for (const [k, R, kFine] of FASI) {
    const t0 = T[k], t1 = fineDi(kFine), fuori = 1 - P(t, t1 - .4, t1);
    if (t < t0 || fuori <= 0) continue;
    const tP = T[k === 'regola1' ? 'P1' : k === 'regola2' ? 'P2' : 'P3'], tF = T[k === 'regola1' ? 'tutta1' : k === 'regola2' ? 'tutta2' : 'tutta3'];
    const Pd = R(PP), kp = P(t, tP + .3, tP + 1.8);
    if (kp <= 0) continue;
    ctx.save(); ctx.globalAlpha *= fuori;
    // la bandierina trasformata: si ribalta (simmetrie) o scivola (traslazione)
    const kf = P(t, tF + .5, tF + 2.3);
    if (kf > 0) {
      const pts = R === R3 ? F0.map(p => [p[0] + 3 * kf, p[1] - kf]) : F0.map(p => { const q = R(p); return [lerp(p[0], q[0], kf), lerp(p[1], q[1], kf)]; });
      bandiera(ctx, pts, mix(C.x, C.g, kf), R === R3 ? .55 + .45 * kf : 1);
    }
    // il percorso di P
    if (R === R3) {
      freccia(ctx, S(PP), S(Pd), C.v, kp, 1);
      freccia(ctx, S(F0[0]), S(R3(F0[0])), C.v, P(t, tF + .5, tF + 2.3), 1);
    } else {
      const qx = lerp(PP[0], Pd[0], kp), qy = lerp(PP[1], Pd[1], kp);
      if (R === R1) {   // il tratteggio si interrompe sul 5 dell'asse y, che resta al suo posto
        tratteggio(ctx, S(PP), S([Math.max(qx, -.12), 5]), C.dim, 1);
        if (qx < -.62) tratteggio(ctx, S([-.62, 5]), S([qx, 5]), C.dim, 1);
      } else tratteggio(ctx, S(PP), S([qx, qy]), C.dim, 1);
      if (R === R2) {   // PP′ è perpendicolare alla bisettrice e il suo punto medio (4; 4) ci sta sopra
        const kq = P(t, tF + 1.0, tF + 1.4);
        if (kq > 0) {
          const s = .22 * Math.SQRT1_2, a = S([4 - s, 4 - s]), c = S([4 - s + s, 4 - s - s]), b = S([4 + s, 4 - s]);   // lungo la bisettrice verso il basso, poi verso P′
          ctx.save(); ctx.globalAlpha *= kq; ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.lineJoin = 'round';
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore();
        }
      }
    }
    const q = [lerp(PP[0], Pd[0], kp), lerp(PP[1], Pd[1], kp)];
    dot(ctx, S(q), C.g, 1, 9);
    const nome = R === R1 ? ['{mink:P′(−3; 5)}', [-2.4, 5.62], 'center'] : R === R2 ? ['{mink:P′(5; 3)}', [5.35, 3.0], 'left'] : ['{mink:P′(6; 4)}', [6.45, 4.85], 'center'];
    const ln = S(nome[1]);
    lab(ctx, nome[0], ln[0], ln[1], P(t, tP + 1.7, tP + 2.1), 40, nome[2]);
    ctx.restore();
  }
  // P sopra tutto
  if (kP > 0) dot(ctx, S(PP), C.ink, kP, 9);
  ctx.restore();
  ctx.restore();
}
// isometrie: la partenza e le tre trasformate in fila, con le stesse tacche sull'asta e sul bordo alto del drappo
const FILA = [[F0, '{dim:partenza}', C.x], [F0.map(R1), '{mink:(−}{mx:x}{mink:; }{my:y}{mink:)}', C.g],
  [F0.map(R2), '{mink:(}{my:y}{mink:; }{mx:x}{mink:)}', C.g], [F0.map(R3), '{mink:(}{mx:x}{mink: + 3; }{my:y}{mink: − 1)}', C.g]];
function scenaFila(ctx, t) {
  if (t < T.iso || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.iso + .3, T.iso + .8) * (1 - P(t, FINE - .6, FINE + .1));
  const sc = 58, kt = P(t, T.iso + 1.0, T.iso + 1.4);
  FILA.forEach(([F, nome, col], i) => {
    const cx = 535 + (i - 1.5) * 225, cy = 420;
    const xs = F.map(p => p[0]), ys = F.map(p => p[1]);
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2;
    const Q = p => [cx + (p[0] - mx) * sc, cy - (p[1] - my) * sc];
    const [b, c, p, m] = F.map(Q);
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(p[0], p[1]); ctx.lineTo(m[0], m[1]); ctx.closePath();
    ctx.fillStyle = css(col, .3); ctx.fill(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.stroke();
    ctx.strokeStyle = css(C.ink); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.stroke();
    dot(ctx, b, C.ink, 1, 7); ctx.restore();
    tacche(ctx, b, c, 2, C.g, kt); tacche(ctx, c, p, 1, C.g, kt);
    drawRich(ctx, nome, cx, 640, { size: 32 });
  });
  ctx.restore();
}
function tacche(ctx, a, b, n, col, al) {
  if (al <= 0) return;
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 9, cx = mx + ux * o, cy = my + uy * o;
    ctx.beginPath(); ctx.moveTo(cx - uy * 13, cy + ux * 13); ctx.lineTo(cx + uy * 13, cy - ux * 13); ctx.stroke();
  }
  ctx.restore();
}

// la scheda a destra: la regola di ogni fase, poi le tre insieme
const XC = 1450;
const XY = '{mink:(}{mx:x}{mink:; }{my:y}{mink:) → }';
const REGOLE = [
  [XY + '{mink:(−}{mx:x}{mink:; }{my:y}{mink:)}', '{mink:(−}{mx:x}{mink:; }{my:y}{mink:)}', '{mink:P(3; 5) → P′(−3; 5)}', '{v:simmetria rispetto all’asse} {my:y}', 'P1', 'tutta1', 'regola2'],
  [XY + '{mink:(}{my:y}{mink:; }{mx:x}{mink:)}', '{mink:(}{my:y}{mink:; }{mx:x}{mink:)}', '{mink:P(3; 5) → P′(5; 3)}', '{v:simmetria rispetto a} {mv:y = x}', 'P2', 'tutta2', 'regola3'],
  [XY + '{mink:(}{mx:x}{mink: + 3; }{my:y}{mink: − 1)}', '{mink:(}{mx:x}{mink: + 3; }{my:y}{mink: − 1)}', '{mink:P(3; 5) → P′(6; 4)}', '{v:traslazione di vettore} {mink:(3; −1)}', 'P3', 'tutta3', 'iso'],
];
function scenaScheda(ctx, t) {
  if (t < T.regola1 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 1040, 110, 820, 690, P(t, T.regola1, T.regola1 + .5) * fuori);
  ctx.save(); ctx.globalAlpha *= fuori;
  const kS = P(t, T.iso, T.iso + .5);   // il riepilogo prende il posto della regola
  conFont(TITOLI, () => {
    drawRich(ctx, 'la regola', XC, 172, { size: 40, weight: 600, alpha: P(t, T.regola1, T.regola1 + .5) * (1 - kS) });
    drawRich(ctx, 'tre isometrie', XC, 172, { size: 40, weight: 600, alpha: kS });
  });
  ['regola1', 'regola2', 'regola3'].forEach((k, i) => {
    const [r, , es, nome, tP, tF, tFine] = REGOLE[i];
    const al = life(t, T[k], T[tFine] + (tFine === 'iso' ? .1 : 0), .4, .4);
    if (al <= 0) return;
    ctx.save(); ctx.globalAlpha *= al;
    drawRich(ctx, r, XC, 290, { size: 50, local: t - T[k] - .3, stagger: .08 });
    lab(ctx, es, XC, 410, P(t, T[tP] + 1.7, T[tP] + 2.1), 44);
    lab(ctx, nome, XC, 520, P(t, T[tF] + .4, T[tF] + .8), 38);
    ctx.restore();
  });
  if (kS > 0) {
    ctx.save(); ctx.globalAlpha *= kS;
    REGOLE.forEach(([, corta, , nome], i) => {
      const y = 262 + i * 130;
      lab(ctx, XY + corta, XC, y, 1, 42);
      lab(ctx, nome, XC, y + 52, 1, 32);
    });
    lab(ctx, '{dim:tutte} {g:conservano le distanze}', XC, 700, P(t, T.iso + .6, T.iso + 1.1), 38);
    ctx.restore();
  }
  ctx.restore();
}

// 0 · apertura (0–7.5)
function scenaIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Le isometrie in coordinate', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 4 · in una frase (FINE–DUR)
function scenaFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Una regola sulle coordinate dice dove va\nogni punto: è la trasformazione.', W / 2, 290, { size: 64, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, REGOLE[0][1], '{dim:simmetria, asse} {my:y}'], [960, REGOLE[1][1], '{dim:simmetria,} {mv:y = x}'], [1450, REGOLE[2][1], '{dim:traslazione}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 490, { size: 40 });
    drawRich(ctx, s, x, 550, { size: 32 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza di P mentre si sposta
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5], ['traccia', 7.7, 8.7],                                   // il piano
    ['pop', T.band + .3, .5], ['pop', T.band + .7, .85],                                       // la bandierina, P
    ['soffio', T.regola1], ['pop', T.regola1 + .4, .6],
    ['tono', T.P1 + .3, T.P1 + 1.8, [.85, .85, .85]], ['pop', T.P1 + 1.8, .85],                  // P va in (−3; 5)
    ['tono', T.tutta1 + .5, T.tutta1 + 2.3, [.6, .55, .6]], ['ding', T.tutta1 + 2.3],           // la bandierina si ribalta
    ['soffio', T.regola2 - .3], ['pop', T.regola2 + .4, .6],
    ['tono', T.P2 + .3, T.P2 + 1.8, [.85, .7, .55]], ['pop', T.P2 + 1.8, .55],                   // P va in (5; 3)
    ['traccia', T.tutta2 + .3, T.tutta2 + 1.1], ['tono', T.tutta2 + .5, T.tutta2 + 2.3, [.55, .45, .4]], ['ding', T.tutta2 + 2.3],
    ['soffio', T.regola3 - .3], ['pop', T.regola3 + .4, .6],
    ['tono', T.P3 + .3, T.P3 + 1.8, [.85, .8, .72]], ['pop', T.P3 + 1.8, .72],                   // P va in (6; 4)
    ['tono', T.tutta3 + .5, T.tutta3 + 2.3, [.55, .5, .45]], ['ding', T.tutta3 + 2.3],           // la traslazione
    ['soffio', T.iso], ['pop', T.iso + .5, .6], ['ding', T.iso + .8],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Le isometrie in coordinate', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.regola2 - .2, 'cambio segno alla {mx:x}'], [T.regola2 - .2, T.regola3 - .2, 'scambio le coordinate'],
      [T.regola3 - .2, T.iso - .1, 'aggiungo e tolgo'], [T.iso - .1, FINE, 'tre isometrie']],
    scena(ctx, t) { scenaIntro(ctx, t); scenaPiano(ctx, t); scenaFila(ctx, t); scenaScheda(ctx, t); scenaFine(ctx, t); },
  };
});
