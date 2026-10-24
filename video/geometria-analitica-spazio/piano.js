'use strict';
/* Il piano e la sua freccia — vettore normale (1; 2; 2) e punto A(1; 1; 1): i punti P con AP perpendicolare
   alla freccia formano x + 2y + 2z − 5 = 0; la freccia ruota e il piano con lei. Argomento: geometria-analitica-spazio. */
CVIDEO.registra('geometria-analitica-spazio/piano', M => {
  const { W, C, E, P, life, kf, lerp, css, mix, TITOLI, conFont, drawRich, richW, txt, dot, glowStroke, dashed, arrowHead, card } = M;

const FINE = 86.6, DUR = 98.2;   // tempi «vecchi»: il fumetto in più e quelli allungati li sistema MAPPA, in fondo
const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'felice'], [4.0, 'pensa'], [7.9, 'neutro'],
  [15.5, 'felice'], [20.0, 'neutro'], [28.7, 'felice'], [33.1, 'sorpreso'], [35.5, 'neutro'],
  [38.0, 'pensa'], [42.7, 'neutro'], [50.0, 'festa'], [52.1, 'neutro'], [62.4, 'festa'], [66.1, 'neutro'],
  [71.7, 'sorpreso'], [76.1, 'felice'], [81.1, 'neutro'], [FINE + 2.4, 'felice'], [93.0, 'occhiolino'],
];
// una frase per ogni cosa che succede, e solo mentre succede
const FUMETTI = [
  [2.3, 6.3, 'Come si scrive l’equazione\ndi un piano nello spazio?'],
  // 1 · un punto e una freccia
  [7.9, 11.0, 'Ecco il punto {mink:A(1; 1; 1)}.'],
  [11.1, 15.4, 'Da {mink:A}  parte una {v:freccia}:\nil vettore {mv:(1; 2; 2)}.'],
  [15.5, 19.9, 'Il piano passa per {mink:A}  ed è\n{v:perpendicolare} alla freccia.'],
  [20.0, 24.1, 'Per questo la freccia si chiama\n{v:vettore normale} al piano.'],
  // 2 · chi sta sul piano
  [24.2, 28.6, 'Un punto {mink:P}  del piano:\nil segmento {mink:AP}  sta nel piano.'],
  [28.7, 33.0, '{mink:AP}  è {g:perpendicolare} alla freccia,\ncomunque scelgo {mink:P}.'],
  [33.1, 37.9, 'Un punto {r:fuori} dal piano non va:\n{mink:AQ}  non è perpendicolare alla freccia.'],
  // 3 · il conto
  [38.0, 42.6, 'Due vettori sono perpendicolari quando\nil {v:prodotto scalare} fa 0.'],
  [42.7, 47.2, 'Il vettore da {mink:A}  a {mink:P(3; 1; 0)} è\n{mink:P − A = (2; 0; −1)}.'],
  [47.3, 52.0, 'Moltiplico e sommo:\n{mink:1 · 2 + 2 · 0 + 2 · (−1) = 0}.'],
  [52.1, 56.7, 'Un punto qualunque {mink:P(x; y; z)}:\n{mink:P − A = (x − 1; y − 1; z − 1)}.'],
  [56.8, 61.4, 'Il prodotto scalare di {mink:P − A}\ncon la freccia deve fare 0.'],
  [61.5, 66.0, 'Svolgo i conti:\n{mink:x + 2y + 2z − 5 = 0}.'],
  [66.1, 71.6, 'È l’{v:equazione del piano}: davanti a\n{mink:x}, {mink:y}, {mink:z}  ci sono 1, 2, 2, la freccia.'],
  // 4 · la freccia ruota
  [71.7, 76.0, 'Se la freccia ruota,\nil piano ruota con lei.'],
  [76.1, 81.0, 'Freccia {mink:(0; 0; 1)}: il piano è\norizzontale, {mink:z − 1 = 0}.'],
  [81.1, 86.1, 'In generale, freccia {mink:(a; b; c)}:\n{mink:ax + by + cz + d = 0}.'],
  // chiusura
  [FINE + 2.4, DUR - 3.0, 'Un punto e una freccia bastano\na fissare un piano nello spazio.'],
];

// ---------- lo spazio in assonometria (la stessa nei tre video dell'argomento) ----------
// proiezione ortogonale: l'osservatore guarda da 20° fra gli assi x e y, 22° più in alto;
// x viene verso chi guarda (in basso a sinistra), y va a destra, z sale
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const VD = [Math.cos(PH) * Math.cos(TH), Math.cos(PH) * Math.sin(TH), Math.sin(PH)];   // verso chi guarda
const OX = 600, OY = 470, S = 92;
const d3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const pr = (x, y, z) => [OX + S * (x * VR[0] + y * VR[1]), OY - S * (x * VU[0] + y * VU[1] + z * VU[2])];
const p3 = q => pr(q[0], q[1], q[2]);
const add = (a, b, k = 1) => [a[0] + k * b[0], a[1] + k * b[1], a[2] + k * b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = a => { const l = Math.hypot(a[0], a[1], a[2]); return [a[0] / l, a[1] / l, a[2] / l]; };

function seg(ctx, a, b, col, w, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function poli(ctx, pts, fill, stroke, w = 2) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
// angolo retto in 3D: quadratino nel piano delle direzioni a e b (unitarie) uscenti da V
function retto3(ctx, V, a, b, al, col, d = .45) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col || C.ink); ctx.lineWidth = 3; ctx.lineJoin = 'round';
  const q1 = p3(add(V, a, d)), q2 = p3(add(add(V, a, d), b, d)), q3 = p3(add(V, b, d));
  ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.lineTo(q3[0], q3[1]); ctx.stroke(); ctx.restore();
}
// freccia in 3D da a a b (punti dello spazio)
function freccia3(ctx, a, b, col, w, k = 1) {
  if (k <= 0) return;
  const A2 = p3(a), B2 = p3(add(a, [b[0] - a[0], b[1] - a[1], b[2] - a[2]], k));
  glowStroke(ctx, [A2, B2], 1, col, w);
  const ang = Math.atan2(B2[1] - A2[1], B2[0] - A2[0]);
  arrowHead(ctx, [B2[0] + Math.cos(ang) * 8, B2[1] + Math.sin(ang) * 8], ang, col, 1.5);
}
// etichetta su un fondino del colore della scheda
function etichetta(ctx, s, x, y, size, al = 1, align = 'center') {
  if (al <= 0) return;
  const w = richW(ctx, s, size) + 20, x0 = align === 'left' ? x - 10 : align === 'right' ? x - w + 10 : x - w / 2;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.roundRect(x0, y - size * .62, w, size * 1.24, 10); ctx.fill();
  drawRich(ctx, s, x, y, { size, align });
  ctx.restore();
}

// ---------- il piano, la freccia, i punti ----------
const A = [1, 1, 1], N0 = unit([1, 2, 2]), E1 = unit([2, 0, -1]), E2 = cross(N0, E1);   // E1 punta verso P(3; 1; 0)
const LN = 3, LP = 1.8;                    // lunghezza della freccia; mezzo lato del pezzo di piano (P(3; 1; 0) sta sulla sua diagonale)
const Q = [1, 4, 2];                          // fuori dal piano: Q − A = (0; 3; 1), prodotto scalare 8, distanza 8/3
const PIEDE = [1 / 9, 20 / 9, 2 / 9];          // Q − 8/9 · (1; 2; 2): sta sul piano (1/9 + 40/9 + 4/9 = 5)
// la rotazione che porta la freccia da (1; 2; 2) a (0; 0; 1) (Rodrigues, asse N0 × z)
const KR = unit(cross(N0, [0, 0, 1])), ANG = Math.acos(N0[2]);
function rot(v, a) {
  const c = Math.cos(a), s = Math.sin(a), kv = d3(KR, v), cr = cross(KR, v);
  return [0, 1, 2].map(i => v[i] * c + cr[i] * s + KR[i] * kv * (1 - c));
}
const kRot = t => P(t, 72.0, 74.8, E.io);
const lungo = t => lerp(LN, 1.2, kRot(t));    // (0; 0; 1) è più corta: la freccia si accorcia ruotando
const R2 = Math.SQRT1_2;
// il pezzo di piano ha i lati lungo (E1 − E2) e (E1 + E2): così E1, la direzione di P(3; 1; 0), è la sua diagonale
function telaio(t) {
  const a = ANG * kRot(t), e1 = rot(E1, a), e2 = rot(E2, a);
  return { n: rot(N0, a), f1: [0, 1, 2].map(i => (e1[i] - e2[i]) * R2), f2: [0, 1, 2].map(i => (e1[i] + e2[i]) * R2) };
}
// P scorre sul piano: P = A + r (cos u · E1 + sin u · E2); alla fine è P(3; 1; 0), cioè u = 0 e r = √5
const U_KEYS = [[28.9, 1.3], [30.3, 2.0], [31.7, -0.4], [32.6, 0]];
const R_KEYS = [[28.9, 1.9], [30.3, 1.5], [31.7, 1.7], [32.6, Math.sqrt(5)]];
function puntoP(t) {
  const u = kf(t, U_KEYS), r = kf(t, R_KEYS);
  return add(add(A, E1, r * Math.cos(u)), E2, r * Math.sin(u));
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il piano e la sua freccia', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// gli assi, tagliati dove passano dietro al piano: fase 0 = la parte dietro (prima del piano), 1 = davanti
const ASSI = [[4.8, 0, 0], [0, 4.2, 0], [0, 0, 3.8]];
function assi(ctx, t, n, kp, fase) {
  const ka = P(t, 7.7, 8.7);
  if (ka <= 0) return;
  const nA = d3(n, A), lato = Math.sign(d3(n, VD));
  ctx.save(); ctx.globalAlpha *= ka;
  ASSI.forEach((e, i) => {
    const dd = d3(n, e);
    let tagli = [0, 1];
    if (kp > 0 && Math.abs(dd) > 1e-9) { const s = nA / dd; if (s > 0 && s < 1) tagli = [0, s, 1]; }
    for (let j = 0; j < tagli.length - 1; j++) {
      const m = (tagli[j] + tagli[j + 1]) / 2;
      const davanti = kp <= 0 || Math.sign(d3(n, [e[0] * m, e[1] * m, e[2] * m]) - nA) === lato;
      if ((fase === 1) !== davanti) continue;
      const a = p3([e[0] * tagli[j], e[1] * tagli[j], e[2] * tagli[j]]), b = p3([e[0] * tagli[j + 1], e[1] * tagli[j + 1], e[2] * tagli[j + 1]]);
      // assi grigi (i nomi restano colorati): la freccia viola non si confonde con l'asse z
      ctx.save(); ctx.globalAlpha *= .7;
      seg(ctx, a, b, C.ink, 3);
      if (j === tagli.length - 2) {
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
        arrowHead(ctx, [b[0] + Math.cos(ang) * 6, b[1] + Math.sin(ang) * 6], ang, C.ink);
      }
      ctx.restore();
    }
  });
  if (fase === 1) {
    const ex = p3(ASSI[0]), ey = p3(ASSI[1]), ez = p3(ASSI[2]), o = pr(0, 0, 0);
    drawRich(ctx, '{mx:x}', ex[0] - 30, ex[1] + 20, { size: 44 });
    drawRich(ctx, '{my:y}', ey[0] + 34, ey[1] + 2, { size: 44 });
    drawRich(ctx, '{mv:z}', ez[0] + 30, ez[1] - 4, { size: 44 });
    drawRich(ctx, '{mink:O}', o[0] - 30, o[1] - 24, { size: 40 });
  }
  ctx.restore();
}
// il pavimento (piano xy) appena accennato, con l'ombra del pezzo di piano
function pavimento(ctx, t, quad, kp) {
  const k = P(t, 7.7, 8.7);
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = css(C.ink, .09); ctx.lineWidth = 1.5; ctx.beginPath();
  for (let i = 0; i <= 4; i++) { let a = pr(i, 0, 0), b = pr(i, 4, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); a = pr(0, i, 0); b = pr(4, i, 0); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
  ctx.stroke();
  if (kp > 0) { ctx.globalAlpha *= kp; poli(ctx, quad.map(q => pr(q[0], q[1], 0)), css(C.ink, .05)); }
  ctx.restore();
}
function pezzoDiPiano(ctx, quad, f1, f2, kp) {
  if (kp <= 0) return;
  ctx.save(); ctx.globalAlpha *= kp;
  poli(ctx, quad.map(p3), css(C.x, .14), css(C.x, .6), 2.5);
  ctx.strokeStyle = css(C.x, .22); ctx.lineWidth = 1.5; ctx.beginPath();
  for (const s of [-.9, 0, .9]) {
    let a = p3(add(add(A, f1, s), f2, -LP)), b = p3(add(add(A, f1, s), f2, LP)); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
    a = p3(add(add(A, f2, s), f1, -LP)); b = p3(add(add(A, f2, s), f1, LP)); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
  }
  ctx.stroke(); ctx.restore();
}

// 1–4 · lo spazio: il punto, la freccia, il piano, P e Q, la rotazione (7.5–FINE)
function sceneSpazio(ctx, t, tr) {   // tr: il tempo vero (i passi della freccia stanno nel fumetto aggiunto)
  if (t < 7.5 || t > FINE + .3) return;
  const al = 1 - P(t, FINE - .5, FINE + .2);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, 230, 110, 860, 690, P(t, 7.5, 8.2));
  const { n, f1, f2 } = telaio(t);
  const kp = P(t, 15.7, 16.7);
  const quad = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => add(add(A, f1, u * LP), f2, v * LP));
  pavimento(ctx, t, quad, kp);
  assi(ctx, t, n, kp, 0);
  pezzoDiPiano(ctx, quad, f1, f2, kp);
  assi(ctx, t, n, kp, 1);
  const a2 = p3(A);
  retto3(ctx, A, n, f2, P(t, 15.9, 16.6) * (1 - P(t, 28.6, 29.0)), C.v);
  // P sul piano e il segmento AP (prima neutro, verde quando Ada dice che è perpendicolare)
  const kP = life(t, 24.4, 71.9, .4, .5);
  if (kP > 0) {
    const pp = puntoP(t), q2 = p3(pp), ap = unit([pp[0] - A[0], pp[1] - A[1], pp[2] - A[2]]);
    const verde = P(t, 28.7, 29.2);
    ctx.save(); ctx.globalAlpha *= kP;
    seg(ctx, a2, q2, mix(C.ink, C.g, verde), 5, P(t, 25.0, 25.6));
    retto3(ctx, A, ap, n, P(t, 28.9, 29.3), C.g);
    const kv = life(t, 42.8, 72.0, .4, .4);
    if (kv > 0) { const ang = Math.atan2(q2[1] - a2[1], q2[0] - a2[0]); ctx.save(); ctx.globalAlpha *= kv; arrowHead(ctx, [q2[0] - Math.cos(ang) * 10, q2[1] - Math.sin(ang) * 10], ang, C.g, 1.4); ctx.restore(); }
    dot(ctx, q2, C.ink, P(t, 24.4, 24.8, E.back), 10);
    const nome = t < 42.8 ? '{mink:P}' : t < 52.2 ? '{mink:P(3; 1; 0)}' : '{mink:P(x; y; z)}';
    const kn = t < 42.8 ? P(t, 24.6, 25.0) : t < 52.2 ? P(t, 42.8, 43.2) : P(t, 52.2, 52.6);
    etichetta(ctx, nome, q2[0] + 26, q2[1] + 16, 40, kn, 'left');
    ctx.restore();
  }
  // Q fuori dal piano: AQ rosso, e l'angolo con la freccia che non è retto
  const kQ = life(t, 33.3, 38.3, .4, .4);
  if (kQ > 0) {
    const q2 = p3(Q), tip = p3(add(A, n, lungo(t))), pd = p3(PIEDE);
    ctx.save(); ctx.globalAlpha *= kQ;
    dashed(ctx, q2, pd, C.r, P(t, 33.6, 34.2), .9);
    dot(ctx, pd, C.r, P(t, 34.1, 34.4), 6);
    seg(ctx, a2, q2, C.r, 5, P(t, 33.5, 34.1));
    const a1 = Math.atan2(q2[1] - a2[1], q2[0] - a2[0]), aT = Math.atan2(tip[1] - a2[1], tip[0] - a2[0]);
    ctx.strokeStyle = css(C.r); ctx.lineWidth = 3; let dA = a1 - aT; while (dA > Math.PI) dA -= 2 * Math.PI; while (dA < -Math.PI) dA += 2 * Math.PI;
    ctx.beginPath(); ctx.arc(a2[0], a2[1], 50, aT, aT + dA, dA < 0); ctx.stroke();
    dot(ctx, q2, C.r, P(t, 33.3, 33.7, E.back), 10);
    drawRich(ctx, '{mr:Q}', q2[0] + 4, q2[1] - 36, { size: 40 });
    ctx.restore();
  }
  // la freccia (davanti al piano), con le sue componenti
  // le componenti: 1 passo lungo x, 2 lungo y, 2 in su (nel fumetto aggiunto, tempo vero)
  const kS = life(tr, 15.7, 20.3, .4, .5);
  if (kS > 0) {
    const b1 = p3([2, 1, 1]), b2 = p3([2, 3, 1]), b3 = p3([2, 3, 3]);
    ctx.save(); ctx.globalAlpha *= kS;
    seg(ctx, a2, b1, C.x, 6, P(tr, 15.9, 16.5)); seg(ctx, b1, b2, C.y, 6, P(tr, 16.5, 17.3)); seg(ctx, b2, b3, C.v, 6, P(tr, 17.3, 18.1));
    etichetta(ctx, '{x:1}', b1[0] - 6, b1[1] + 42, 40, P(tr, 16.3, 16.6));   // sotto il primo passo: a sinistra c'è O
    etichetta(ctx, '{y:2}', (b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2 + 34, 40, P(tr, 17.1, 17.4));
    etichetta(ctx, '{v:2}', b2[0] + 26, (b2[1] + b3[1]) / 2 + 20, 40, P(tr, 17.9, 18.2), 'left');
    ctx.restore();
  }
  freccia3(ctx, A, add(A, n, lungo(t)), C.v, 7, P(t, 11.3, 12.3));
  const tip = p3(add(A, n, lungo(t)));
  etichetta(ctx, '{mv:(1; 2; 2)}', tip[0] + 30, tip[1] - 6, 40, life(t, 12.5, 71.9, .4, .3) * (1 - life(t, 33.2, 38.4, .3, .4)), 'left');
  etichetta(ctx, '{mv:(0; 0; 1)}', tip[0] + 30, tip[1] - 6, 40, P(t, 76.2, 76.6), 'left');
  dot(ctx, a2, C.ink, P(t, 8.4, 8.8, E.back), 10);
  drawRich(ctx, '{mink:A}', a2[0] - 22, a2[1] - 24, { size: 40, alpha: P(t, 8.6, 9.0) });
  ctx.restore();
}

// la scheda a destra: i dati, poi il conto, poi le rotazioni
function riga(ctx, s, y, size, a, local) { drawRich(ctx, s, 1485, y, { size, alpha: a, local }); }
function separa(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1150, y); ctx.lineTo(1820, y); ctx.stroke(); ctx.restore();
}
const EQ = '{mink:x + }{mv:2}{mink:y + }{mv:2}{mink:z − 5 = 0}';
function scenePannello(ctx, t) {
  if (t < 7.9 || t > FINE + .3) return;
  const al = life(t, 8.0, FINE + .2, .5, .7);
  card(ctx, 1110, 115, 750, 685, al);
  ctx.save(); ctx.globalAlpha *= al;
  riga(ctx, '{mink:A(1; 1; 1)}', 170, 44, P(t, 8.4, 8.9));
  riga(ctx, 'freccia {mv:(1; 2; 2)}', 232, 44, P(t, 12.5, 13.0) * (1 - P(t, 72.0, 72.4)));
  riga(ctx, 'freccia {mv:(0; 0; 1)}', 232, 44, P(t, 76.2, 76.6));
  separa(ctx, 275, P(t, 38.1, 38.5));
  // il conto (38–72)
  const kc = 1 - P(t, 71.7, 72.2);
  if (kc > 0 && t > 38) {
    ctx.save(); ctx.globalAlpha *= kc;
    conFont(TITOLI, () => drawRich(ctx, 'il prodotto scalare', 1485, 316, { size: 36, weight: 600, local: t - 38.2 }));
    drawRich(ctx, '{dim:moltiplico le componenti e sommo}', 1485, 360, { size: 30, local: t - 38.6 });
    riga(ctx, '{mink:P − A = (3 − 1; 1 − 1; 0 − 1)}', 410, 42, 1, t - 43.0);
    riga(ctx, '{mink:= (2; 0; −1)}', 462, 42, 1, t - 44.2);
    riga(ctx, '{mv:1}{mink: · 2 + }{mv:2}{mink: · 0 + }{mv:2}{mink: · (−1) = }{mg:0}', 516, 42, 1, t - 47.6);
    separa(ctx, 552, P(t, 52.2, 52.6));
    riga(ctx, '{mink:P − A = (x − 1; y − 1; z − 1)}', 596, 42, 1, t - 52.4);
    riga(ctx, '{mv:1}{mink:(x − 1) + }{mv:2}{mink:(y − 1) + }{mv:2}{mink:(z − 1) = 0}', 650, 40, 1, t - 57.0);
    const kr = P(t, 62.2, 62.7);
    if (kr > 0) {
      ctx.save(); ctx.globalAlpha *= kr; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
      const wr = richW(ctx, EQ, 50) + 48; ctx.beginPath(); ctx.roundRect(1485 - wr / 2, 678, wr, 80, 16); ctx.stroke(); ctx.restore();
    }
    riga(ctx, EQ, 718, 50, 1, t - 61.7);
    ctx.restore();
  }
  // la freccia verticale, poi il caso generale (76–FINE)
  if (t > 76) {
    riga(ctx, '{mink:z − 1 = 0}', 345, 50, 1, t - 77.2);
    separa(ctx, 400, P(t, 81.2, 81.6));
    drawRich(ctx, '{dim:in generale}', 1485, 445, { size: 32, local: t - 81.3 });
    riga(ctx, 'freccia {mv:(a; b; c)}', 505, 44, 1, t - 81.6);
    riga(ctx, '{mink:ax + by + cz + d = 0}', 575, 48, 1, t - 82.2);
    drawRich(ctx, '{dim:con }{mink:d}{dim: un numero}', 1485, 635, { size: 32, local: t - 83.0 });
  }
  ctx.restore();
}

// 5 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Il piano per {mink:A}  è fatto dei punti {mink:P}\ncon {mink:AP}  perpendicolare alla freccia.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [
    [490, 430, 'freccia {mv:(a; b; c)}', 40],
    [960, 460, '{mink:ax + by + cz + d = 0}', 40],
    [1430, 430, 'prodotto scalare {g:= 0}', 36],
  ];
  pills.forEach(([x, w, s, size], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7], ['pop', 8.5, .5],                         // gli assi, il punto A
    ['traccia', 11.3, 12.3], ['tono', 11.3, 12.3, [.45, .8]], ['pop', 12.6, .7],      // la freccia sale da A
    ['soffio', 15.7], ['pop', 16.4, .45],                                             // il piano
    ['pop', 24.5, .35], ['traccia', 25.0, 25.6],                                      // P e il segmento AP
    ['ding', 29.0],                                                                   // l'angolo retto
    ['tono', 28.9, 32.6, [.3, .5, .2, .35, .25]],                                     // P scorre sul piano
    ['pop', 33.4, .55], ['traccia', 33.5, 34.1],                                      // Q fuori dal piano
    ['soffio', 38.1], ['pop', 43.1, .5],                                              // il prodotto scalare; AP = (2; 0; −1)
    ['pop', 47.7, .5], ['ding', 49.6],                                                // 1 · 2 + 2 · 0 + 2 · (−1) = 0
    ['pop', 52.5, .5], ['pop', 57.2, .55],                                            // AP generico, il prodotto
    ['pop', 61.9, .7], ['ding', 62.4],                                                // x + 2y + 2z − 5 = 0
    ['soffio', 71.8], ['tono', 72.0, 74.8, [.75, .8, .9, 1]],                         // la freccia ruota fino a verticale
    ['pop', 76.3, .8], ['pop', 77.4, .6],                                             // (0; 0; 1), z − 1 = 0
    ['soffio', 81.3], ['pop', 82.3, .6],                                              // il caso generale
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  // il fumetto sulle componenti si inserisce a 15,5 (4,6 s, la scena resta ferma); tre fumetti si allungano per la voce
  // (52,1–56,7 di 0,6 s; 61,5–66,0 di 0,5; 81,1–86,1 di 0,5). La scena lavora nei tempi «vecchi», il motore riceve i «nuovi».
  const MAPPA = [[0, 0], [15.45, 15.45], [15.45, 20.05], [52.05, 56.65], [56.75, 61.95], [61.45, 66.65], [66.05, 71.75],
    [81.05, 86.75], [86.15, 92.35], [1000, 1006.2]];
  function converti(t, da, a) {
    for (let i = 1; i < MAPPA.length; i++) {
      const p = MAPPA[i - 1], q = MAPPA[i];
      if (t <= q[da] || i === MAPPA.length - 1) return q[da] === p[da] ? q[a] : p[a] + (t - p[da]) * (q[a] - p[a]) / (q[da] - p[da]);
    }
  }
  const nuovo = t => Math.round(converti(t, 0, 1) * 100) / 100, vecchio = t => converti(t, 1, 0);
  const posa = {}; Object.keys(POSA).forEach(c => { posa[c] = POSA[c].map(([t, v]) => [nuovo(t), v]); });
  const suoni = SUONI.map(x => x[0] === 'traccia' || x[0] === 'tono' ? [x[0], nuovo(x[1]), nuovo(x[2])].concat(x.slice(3)) : [x[0], nuovo(x[1])].concat(x.slice(2)))
    .concat([['traccia', 15.9, 16.5], ['traccia', 16.5, 17.3], ['traccia', 17.3, 18.1], ['tono', 17.3, 18.1, [.4, .75]]]);   // i passi della freccia
  const fumetti = FUMETTI.map(([a, b, x]) => [nuovo(a), nuovo(b), x]);
  fumetti.splice(3, 0, [15.5, 20.0, 'Componenti: {x:1} passo lungo {mx:x},' + String.fromCharCode(10) + '{y:2} lungo {my:y}, {v:2} in su.']);
  return {
    titolo: 'Il piano e la sua freccia', durata: nuovo(DUR), copertina: 4.2, suoni,
    ada: { posa, facce: FACCIA.map(([t, x]) => [nuovo(t), x]), fumetti },
    capitoli: [[7.5, 24.1, 'un punto e una freccia'], [24.1, 37.9, 'chi sta sul piano'], [37.9, 71.6, 'il conto'], [71.6, FINE - .5, 'la freccia ruota']].map(([a, b, x]) => [nuovo(a), nuovo(b), x]),
    scena(ctx, t) { const v = vecchio(t); sceneIntro(ctx, v); sceneSpazio(ctx, v, t); scenePannello(ctx, v); sceneFine(ctx, v); },
  };
});
