'use strict';
/* Due pendenze in un punto — le derivate parziali di z = 9 − x² − y² nel punto P(1; 2; 4) (9 − 1 − 4 = 4).
   Il piano y = 2 (parallelo a xz) taglia la curva z = 5 − x²: tangente in P di pendenza −2x = −2, cioè ∂z/∂x.
   Il piano x = 1 (parallelo a yz) taglia z = 8 − y²: pendenza −2y = −4, cioè ∂z/∂y. Due numeri diversi nello
   stesso punto. Assonometria e colori come in geometria-analitica-spazio; l'asse z nello spazio è in scala 0,4,
   i due grafici a destra sono in scala vera. Argomento: funzioni-due-variabili. */
CVIDEO.registra('funzioni-due-variabili/derivate-parziali', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, txt, arrowHead, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]: le durate danno tempo alla voce (meno di 14 caratteri al secondo)
const SEQ = [
  ['collina', 6.2, 'La collina è {mink:z = 9 − x² − y²}.'],
  ['punto', 7.2, 'Sopra {mink:(1; 2)} è alta {mink:9 − 1 − 4 = 4}:\nè il punto {mink:P(1; 2; 4)}.'],
  ['pianoY', 5.6, 'Taglio con il piano {mink:y = 2},\nparallelo al piano {mink:xz}.', .4],
  ['curvaY', 5.6, 'Il taglio è una curva:\n{mink:z = 9 − x² − 4 = 5 − x²}.'],
  ['ferma', 4.6, 'Qui {mink:y} resta ferma a 2:\ncambia solo {mink:x}.'],
  ['tangY', 6.2, 'La pendenza della tangente in {mink:P}\nè la derivata: {mink:−2x}, cioè {g:−2}.'],
  ['parziale', 6.2, 'È la {v:derivata parziale} rispetto a {mink:x}:\nderivo in {mink:x}, tengo ferma {mink:y}.'],
  ['simbolo', 5.8, 'Si scrive {mink:∂z/∂x}: il simbolo {mink:∂}\nsi legge «d tonda».'],
  ['pianoX', 5.2, 'Ora taglio con {mink:x = 1},\nparallelo al piano {mink:yz}.', .4],
  ['curvaX', 6.0, 'La curva è {mink:z = 8 − y²}:\nqui resta ferma {mink:x}.'],
  ['tangX', 7.0, 'Derivo rispetto a {mink:y}:\n{mink:∂z/∂y = −2y}, in {mink:P} vale {g:−4}.'],
  ['due', 6.4, 'Stesso punto, due pendenze {v:diverse}:\n{g:−2} verso {mink:x}, {g:−4} verso {mink:y}.', .4],
  ['doppio', 4.6, 'Verso {mink:y} la collina scende\ndue volte più in fretta.'],
];
const T = {}, FUMETTI = [[2.3, 6.3, 'Quanto è ripida una collina?\nDipende da dove vai.']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Ferma una variabile, derivi\nnell’altra: è la derivata parziale.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.punto + 2.0, 'felice'], [T.pianoY, 'neutro'], [T.tangY + 2.5, 'felice'], [T.parziale + 1.0, 'neutro'],
  [T.simbolo + 2.0, 'occhiolino'], [T.pianoX, 'neutro'], [T.tangX + 3.5, 'felice'], [T.due, 'sorpreso'],
  [T.due + 3.0, 'neutro'], [T.doppio + .4, 'pensa'], [T.doppio + 2.8, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// ---------- lo spazio in assonometria (come in geometria-analitica-spazio e in curve-di-livello) ----------
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const VR = [-Math.sin(TH), Math.cos(TH), 0];
const VU = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const DV = [Math.cos(PH) * Math.cos(TH), Math.cos(PH) * Math.sin(TH), Math.sin(PH)];   // verso chi guarda
const OX = 600, OY = 620, S = 80, ZS = .4, LQ = 3.6, PZ = 9.5;   // ZS: l'asse z in scala 0,4; PZ: altezza dei piani
const f = (x, y) => 9 - x * x - y * y;
const pr = (x, y, z) => [OX + S * (x * VR[0] + y * VR[1]), OY - S * (x * VU[0] + y * VU[1] + z * ZS * VU[2])];
function nascosto(x, y, z) {
  const pz = z * ZS;
  for (let t = .06; t < 11; t += .04) {
    const qx = x + t * DV[0], qy = y + t * DV[1], qz = pz + t * DV[2];
    if (qz > 9 * ZS) return false;
    const r2 = qx * qx + qy * qy;
    if (r2 <= 9 && qz < ZS * (9 - r2) - .004) return true;
  }
  return false;
}
// curva dello spazio: nascosta tratteggiata, oppure (soloVisibile) non disegnata; fuori dai riquadri vietati (etichette)
function curva3(ctx, pts, col, w, al, soloVisibile, vieta) {
  if (al <= .01 || pts.length < 2) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let run = [], vis = null;
  const flush = () => {
    if (run.length < 2 || (soloVisibile && !vis)) return;
    ctx.setLineDash(vis ? [] : [10, 9]); ctx.lineWidth = vis ? w : Math.max(2.5, w * .55);
    ctx.beginPath(); run.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  };
  for (const q of pts) {
    const p = pr(q[0], q[1], q[2]);
    if (vieta && vieta.some(r => p[0] > r[0] && p[0] < r[2] && p[1] > r[1] && p[1] < r[3])) { if (vis !== null) { flush(); run = []; vis = null; } continue; }
    const v = !nascosto(q[0], q[1], q[2]);
    if (vis === null) vis = v;
    if (v !== vis) { run.push(p); flush(); run = [p]; vis = v; } else run.push(p);
  }
  flush(); ctx.restore();
}
function poli(ctx, pts, fill, stroke, w = 2) {
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
}
// la collina in due reticoli: a righe (y costante) per il taglio y = 2, a colonne (x costante) per il taglio x = 1;
// i bordi delle righe e delle colonne passano proprio per y = 2 e x = 1, così il piano divide la collina senza tagliare pezzi
const LUCE = (() => { const l = [.35, -.55, .75], n = Math.hypot(l[0], l[1], l[2]); return l.map(v => v / n); })();
function reticolo(colonne) {
  const Q = [], NS = 28;
  for (let j = 0; j < 24; j++) {
    const u0 = -3 + j * .25, u1 = u0 + .25;
    for (let i = 0; i < NS; i++) {
      const s0 = -1 + 2 * i / NS, s1 = -1 + 2 * (i + 1) / NS;
      const c = [[u0, s0], [u1, s0], [u1, s1], [u0, s1]].map(([u, s]) => { const v = s * Math.sqrt(Math.max(0, 9 - u * u)); return colonne ? [u, v] : [v, u]; });
      const cx = (c[0][0] + c[1][0] + c[2][0] + c[3][0]) / 4, cy = (c[0][1] + c[1][1] + c[2][1] + c[3][1]) / 4;
      const nx = 2 * cx * ZS, ny = 2 * cy * ZS, nn = Math.hypot(nx, ny, 1);
      Q.push({ pts: c.map(q => pr(q[0], q[1], f(q[0], q[1]))), u: (u0 + u1) / 2, prof: cx * DV[0] + cy * DV[1] + f(cx, cy) * ZS * DV[2],
        luce: clamp((nx * LUCE[0] + ny * LUCE[1] + LUCE[2]) / nn) });
    }
  }
  return Q.sort((a, b) => a.prof - b.prof);
}
const RIGHE = reticolo(false), COLONNE = reticolo(true);
function collina(ctx, Q, al, ua, ub) {   // i pezzi con la coordinata u (y per le righe, x per le colonne) fra ua e ub
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al;
  for (const q of Q) {
    if (q.u < ua || q.u > ub) continue;
    const col = css(mix(C.paper, C.g, .1 + .3 * (1 - q.luce)));
    poli(ctx, q.pts, col, col, 1);
  }
  ctx.restore();
}
// le linee del reticolo sulla collina (x e y interi), solo dove si vedono; filtro: quali pezzi disegnare in questo passaggio
function linee(ctx, al, filtro, vieta) {
  if (al <= .01) return;
  for (let c = -2; c <= 2; c++) {
    const h = Math.sqrt(9 - c * c), a = [], b = [];
    for (let i = 0; i <= 60; i++) { const v = -h + 2 * h * i / 60; if (filtro(c, v)) a.push([c, v, f(c, v)]); if (filtro(v, c)) b.push([v, c, f(v, c)]); }
    curva3(ctx, a, mix(C.g, C.ink, .25), 1.6, .5 * al, true, vieta);
    curva3(ctx, b, mix(C.g, C.ink, .25), 1.6, .5 * al, true, vieta);
  }
}
const cerchio3 = (r, n = 120) => { const p = []; for (let i = 0; i <= n; i++) { const a = 2 * Math.PI * i / n; p.push([r * Math.cos(a), r * Math.sin(a), 0]); } return p; };
const FINI = [[4.7, 0, 0], [0, 4.6, 0], [0, 0, 10.6]];
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  FINI.forEach(e => {
    const pts = []; for (let i = 0; i <= 60; i++) pts.push([e[0] * i / 60, e[1] * i / 60, e[2] * i / 60]);
    curva3(ctx, pts, C.ink, 3, .8);
    const A = pr(e[0] * .97, e[1] * .97, e[2] * .97), B = pr(e[0], e[1], e[2]), ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    arrowHead(ctx, [B[0] + Math.cos(ang) * 6, B[1] + Math.sin(ang) * 6], ang, C.ink);
  });
  const ex = pr(...FINI[0]), ey = pr(...FINI[1]), ez = pr(...FINI[2]);
  drawRich(ctx, '{mx:x}', ex[0] - 30, ex[1] + 18, { size: 44 });
  drawRich(ctx, '{my:y}', ey[0] + 32, ey[1] + 2, { size: 44 });
  drawRich(ctx, '{mv:z}', ez[0] + 30, ez[1] - 2, { size: 44 });
  ctx.restore();
}
// i piani verticali y = 2 e x = 1
function pianoY(ctx, al) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, [pr(-3.4, 2, 0), pr(3.4, 2, 0), pr(3.4, 2, PZ), pr(-3.4, 2, PZ)], css(C.x, .12), css(C.x, .55), 2.5);
  ctx.restore();
}
function pianoX(ctx, al) {
  if (al <= .01) return;
  ctx.save(); ctx.globalAlpha *= al;
  poli(ctx, [pr(1, -3.4, 0), pr(1, 3.4, 0), pr(1, 3.4, PZ), pr(1, -3.4, PZ)], css(C.y, .12), css(C.y, .55), 2.5);
  ctx.restore();
}

// ---------- i tempi ----------
const kPY = t => life(t, T.pianoY + .3, T.pianoX + .2, .7, .5);
const kPX = t => life(t, T.pianoX + .7, T.due + .4, .7, .5);
const aX = t => Math.max(1 - P(t, T.pianoX, T.pianoX + .4), P(t, T.due + .5, T.due + 1.0));   // il taglio in x si spegne durante quello in y
const xViaggio = t => kf(t, [[T.ferma + .3, 1], [T.ferma + 1.6, -1.4], [T.ferma + 3.2, 1.9], [T.ferma + 4.2, 1]]);
const SEZX = [], SEZY = [];   // le due curve di taglio
for (let i = 0; i <= 100; i++) { const x = -Math.sqrt(5) + 2 * Math.sqrt(5) * i / 100; SEZX.push([x, 2, 5 - x * x]); }
for (let i = 0; i <= 100; i++) { const y = -Math.sqrt(8) + 2 * Math.sqrt(8) * i / 100; SEZY.push([1, y, 8 - y * y]); }
const TANX = [], TANY = [];   // le due tangenti in P: pendenza −2 lungo x, −4 lungo y
for (let i = 0; i <= 40; i++) { const s = -1.25 + 2.3 * i / 40; TANX.push([1 + s, 2, 4 - 2 * s]); }
for (let i = 0; i <= 40; i++) { const s = -.75 + 1.35 * i / 40; TANY.push([1, 2 + s, 4 - 4 * s]); }
const PP = pr(1, 2, 4);
const parte = (pts, k) => pts.slice(0, Math.max(2, Math.round(pts.length * k)));

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Due pendenze in un punto', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 1–4 · la collina, i tagli, le tangenti (7.5–FINE)
function sceneSpazio(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  const fuori = 1 - P(t, FINE - .6, FINE + .1);
  ctx.save(); ctx.globalAlpha *= fuori;
  card(ctx, 70, 110, 1060, 690, P(t, 7.5, 8.2));
  ctx.save(); ctx.globalAlpha *= .8 * P(t, 7.6, 8.4);
  poli(ctx, [pr(LQ, LQ, 0), pr(LQ, -LQ, 0), pr(-LQ, -LQ, 0), pr(-LQ, LQ, 0)], css(C.dim, .13), css(C.dim, .55), 2);
  ctx.restore();
  const ks = P(t, 7.9, 9.0), ky = kPY(t), kx = kPX(t);
  // il nome di P solo finché non arrivano i piani: poi lì passano le curve (nei grafici a destra P ha il suo nome)
  const kL = life(t, T.punto + 1.0, T.pianoY + .3, .5, .4);
  const vieta = [];
  if (kL > .01) vieta.push([PP[0] + 6, PP[1] - 52, PP[0] + 42, PP[1] - 6]);
  if (ky > 0) {
    collina(ctx, RIGHE, ks, -9, 2); linee(ctx, ks, (x, y) => y <= 2, vieta);
    pianoY(ctx, ky);
    collina(ctx, RIGHE, ks, 2, 9); linee(ctx, ks, (x, y) => y >= 2, vieta);
  } else if (kx > 0) {
    collina(ctx, COLONNE, ks, -9, 1); linee(ctx, ks, (x, y) => x <= 1, vieta);
    pianoX(ctx, kx);
    collina(ctx, COLONNE, ks, 1, 9); linee(ctx, ks, (x, y) => x >= 1, vieta);
  } else { collina(ctx, RIGHE, ks, -9, 9); linee(ctx, ks, () => true, vieta); }
  assi(ctx, P(t, 7.7, 8.7));
  drawRich(ctx, '{dim:asse} {mv:z} {dim:accorciato}', 98, 772, { size: 30, align: 'left', alpha: P(t, 8.2, 8.7) });
  assi(ctx, P(t, 7.7, 8.7));
  // i tagli e le tangenti
  const cx = P(t, T.curvaY + .3, T.curvaY + 1.3), tx = P(t, T.tangY + .4, T.tangY + 1.2), ax = aX(t);
  if (cx > 0) curva3(ctx, parte(SEZX, cx), C.x, 4, ax);
  if (tx > 0) curva3(ctx, parte(TANX, tx), C.x, 7, ax);
  const cy = P(t, T.curvaX + .3, T.curvaX + 1.3), ty = P(t, T.tangX + .4, T.tangX + 1.2);
  if (cy > 0) curva3(ctx, parte(SEZY, cy), C.y, 4, 1);
  if (ty > 0) curva3(ctx, parte(TANY, ty), C.y, 7, 1);
  // il punto che corre sul taglio y = 2
  const kv = life(t, T.ferma + .2, T.ferma + 4.4, .3, .3);
  if (kv > 0) { const x = xViaggio(t), q = [x, 2, 5 - x * x]; dot(ctx, pr(...q), C.x, kv * (nascosto(...q) ? .45 : 1), 10); }
  // P
  dot(ctx, PP, C.ink, P(t, T.punto + .4, T.punto + .8, E.back), 10);
  drawRich(ctx, '{mink:P}', PP[0] + 24, PP[1] - 30, { size: 40, alpha: kL });
  // i nomi dei piani, accanto al loro spigolo in alto a destra
  const ey = pr(-3.4, 2, PZ), ex = pr(1, 3.4, PZ);
  drawRich(ctx, '{mink:y = 2}', ey[0] + 16, ey[1] + 6, { size: 40, align: 'left', alpha: ky });
  drawRich(ctx, '{mink:x = 1}', ex[0] + 16, ex[1] + 6, { size: 40, align: 'left', alpha: kx });
  ctx.restore();
}

// ---------- la scheda a destra: i due tagli in piano, in scala vera ----------
const XC = 1505;
const GA = { u: 56, h0: -2.6, h1: 2.6, z0: -.5, z1: 6.4, nome: '{mx:x}', col: 'x', g: h => 5 - h * h, hp: 1, m: -2, ta: 0, tb: 2.5, nh: [-2, -1, 1, 2], nz: [2, 4, 6] };
const GB = { u: 40, h0: -3.3, h1: 3.3, z0: -.5, z1: 8.7, nome: '{my:y}', col: 'y', g: h => 8 - h * h, hp: 2, m: -4, ta: 1.1, tb: 2.9, nh: [-2, 2], nz: [2, 4, 6, 8] };
const GOY = 624;
function grafico(ctx, G, al, kc, kt, viaggio) {
  if (al <= .01) return;
  const { u, h0, h1, z0, z1 } = G, col = C[G.col], S2 = (h, z) => [XC + u * h, GOY - u * z];
  ctx.save(); ctx.globalAlpha *= al;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let i = Math.ceil(h0); i <= h1; i++) { if (!i) continue; ctx.beginPath(); ctx.moveTo(...S2(i, z0)); ctx.lineTo(...S2(i, z1)); ctx.stroke(); }
  for (let j = Math.ceil(z0); j <= z1; j++) { if (!j) continue; ctx.beginPath(); ctx.moveTo(...S2(h0, j)); ctx.lineTo(...S2(h1, j)); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(...S2(h0 - .1, 0)); ctx.lineTo(...S2(h1 + .1, 0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(...S2(0, z0 - .1)); ctx.lineTo(...S2(0, z1 + .1)); ctx.stroke();
  const fx = S2(h1 + .1, 0), fz = S2(0, z1 + .1);
  arrowHead(ctx, [fx[0] + 6, fx[1]], 0, C.ink); arrowHead(ctx, [fz[0], fz[1] - 6], -Math.PI / 2, C.ink);
  drawRich(ctx, G.nome, fx[0] + 32, fx[1] + 4, { size: 44 });
  drawRich(ctx, '{mv:z}', fz[0] + 28, fz[1] + 6, { size: 44 });
  for (const n of G.nh) { const p = S2(n, 0); txt(ctx, (n < 0 ? '−' : '') + Math.abs(n), p[0], p[1] + 30, { size: 30, color: C.dim }); }
  for (const n of G.nz) { const p = S2(0, n); txt(ctx, String(n), p[0] - 28, p[1], { size: 30, color: C.dim }); }
  // la curva del taglio (solo dove la collina c'è, z ≥ 0), la tangente in P, P
  const hm = Math.sqrt(G.g(0)), pts = [];
  for (let i = 0; i <= 80; i++) { const h = -hm + 2 * hm * i / 80; pts.push(S2(h, G.g(h))); }
  if (kc > 0) { ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); parte(pts, kc).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
  const zp = G.g(G.hp), pp = S2(G.hp, zp);
  if (kt > 0) {
    ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.shadowColor = css(col, .5); ctx.shadowBlur = 10;
    const a = S2(G.ta, zp + G.m * (G.ta - G.hp)), b = S2(G.tb, zp + G.m * (G.tb - G.hp));
    ctx.beginPath(); ctx.moveTo(lerp(pp[0], a[0], kt), lerp(pp[1], a[1], kt)); ctx.lineTo(lerp(pp[0], b[0], kt), lerp(pp[1], b[1], kt)); ctx.stroke(); ctx.restore();
  }
  if (kc > .99) {
    ctx.save(); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2.5; ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(pp[0], pp[1]); ctx.lineTo(...S2(G.hp, 0)); ctx.stroke(); ctx.restore();
    dot(ctx, pp, C.ink, 1, 9);
    drawRich(ctx, '{mink:P}', pp[0] + 28, pp[1] - 6, { size: 40 });
  }
  if (viaggio != null) dot(ctx, S2(viaggio, G.g(viaggio)), col, 1, 10);
  ctx.restore();
}
function riga(ctx, s, y, size, al) { if (al > .01) drawRich(ctx, s, XC, y, { size, alpha: al }); }
function sceneScheda(ctx, t) {
  if (t < T.collina || t > FINE + .2) return;
  const al = life(t, T.collina + .2, FINE + .1, .5, .7);
  card(ctx, 1160, 110, 690, 690, al);
  ctx.save(); ctx.globalAlpha *= al;
  // pagina 0: la collina e il punto
  const p0 = 1 - P(t, T.pianoY, T.pianoY + .4);
  riga(ctx, '{mink:z = 9 − x² − y²}', 165, 46, p0);
  riga(ctx, '{dim:sopra} {mink:(1; 2)}{dim::}', 260, 40, P(t, T.punto + .5, T.punto + 1.0) * p0);
  riga(ctx, '{mink:z = 9 − 1 − 4 = 4}', 325, 46, P(t, T.punto + 1.0, T.punto + 1.5) * p0);
  riga(ctx, '{mink:P(1; 2; 4)}', 420, 52, P(t, T.punto + 2.0, T.punto + 2.5) * p0);
  // pagina A: il taglio y = 2
  const pA = P(t, T.pianoY + .3, T.pianoY + .8) * (1 - P(t, T.pianoX, T.pianoX + .4));
  const kpa = P(t, T.parziale + .3, T.parziale + .8), ksA = P(t, T.simbolo + .3, T.simbolo + .8);
  riga(ctx, '{dim:taglio con} {mink:y = 2}', 165, 40, pA * (1 - kpa));
  riga(ctx, '{v:derivata parziale} {dim:rispetto a} {mink:x}', 165, 38, pA * kpa);
  riga(ctx, '{mink:z = 9 − x² − 4 = 5 − x²}', 225, 42, pA * P(t, T.curvaY + .4, T.curvaY + .9));
  const vA = t > T.ferma + .2 && t < T.ferma + 4.4 ? xViaggio(t) : null;
  grafico(ctx, GA, pA * P(t, T.pianoY + 1.0, T.pianoY + 1.5), P(t, T.curvaY + .3, T.curvaY + 1.3), P(t, T.tangY + .4, T.tangY + 1.2), vA);
  riga(ctx, '{dim:derivata:} {mink:−2x}', 705, 42, pA * P(t, T.tangY + 1.0, T.tangY + 1.5) * (1 - ksA));
  riga(ctx, '{mink:∂z/∂x = −2x}', 705, 46, pA * ksA);
  riga(ctx, '{dim:in} {mink:P}{dim:, con} {mink:x = 1}{dim::}   {mg:−2}', 760, 42, pA * P(t, T.tangY + 1.8, T.tangY + 2.3));
  // pagina B: il taglio x = 1
  const pB = P(t, T.pianoX + .5, T.pianoX + 1.0) * (1 - P(t, T.due, T.due + .4));
  const kpb = P(t, T.tangX + .3, T.tangX + .8);
  riga(ctx, '{dim:taglio con} {mink:x = 1}', 165, 40, pB * (1 - kpb));
  riga(ctx, '{v:derivata parziale} {dim:rispetto a} {mink:y}', 165, 38, pB * kpb);
  riga(ctx, '{mink:z = 9 − 1 − y² = 8 − y²}', 225, 42, pB * P(t, T.curvaX + .4, T.curvaX + .9));
  grafico(ctx, GB, pB * P(t, T.pianoX + 1.5, T.pianoX + 2.0), P(t, T.curvaX + .3, T.curvaX + 1.3), P(t, T.tangX + .4, T.tangX + 1.2), null);
  riga(ctx, '{mink:∂z/∂y = −2y}', 705, 46, pB * P(t, T.tangX + .8, T.tangX + 1.3));
  riga(ctx, '{dim:in} {mink:P}{dim:, con} {mink:y = 2}{dim::}   {mg:−4}', 760, 42, pB * P(t, T.tangX + 1.8, T.tangX + 2.3));
  // pagina C: le due pendenze
  const pC = P(t, T.due + .4, T.due + .9);
  riga(ctx, '{dim:due pendenze in} {mink:P}', 165, 40, pC);
  riga(ctx, '{mx:∂z/∂x}{mink: = −2x}', 270, 48, pC);
  riga(ctx, '{dim:in} {mink:P}{dim::}   {mg:−2}', 335, 46, P(t, T.due + 1.4, T.due + 1.9));
  riga(ctx, '{my:∂z/∂y}{mink: = −2y}', 455, 48, pC);
  riga(ctx, '{dim:in} {mink:P}{dim::}   {mg:−4}', 520, 46, P(t, T.due + 2.6, T.due + 3.1));
  riga(ctx, '{mink:−4 = 2 · (−2)}', 640, 48, P(t, T.doppio + .4, T.doppio + .9));
  riga(ctx, '{dim:verso} {mink:y} {dim:due volte più in fretta}', 705, 34, P(t, T.doppio + .8, T.doppio + 1.3));
  ctx.restore();
}

// 5 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La derivata parziale è la pendenza\nin una direzione, con l’altra variabile ferma.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 'ferma {mink:y}', '{mx:∂z/∂x}{mink: = −2x}'], [960, 'ferma {mink:x}', '{my:∂z/∂y}{mink: = −2y}'], [1450, 'in {mink:P(1; 2; 4)}', '{mg:−2}{mink:  e  }{mg:−4}']];
  pills.forEach(([x, testa, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 225, 445, 450, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, s, x, 548, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 7.7, 8.7], ['soffio', T.collina + .2],                       // la collina, la scheda
    ['pop', T.punto + .4, .45], ['pop', T.punto + 1.0, .5], ['pop', T.punto + 2.0, .6],          // P
    ['soffio', T.pianoY + .3],                                                                // il piano y = 2
    ['tono', T.curvaY + .3, T.curvaY + 1.3, [.1, .6, .75, .6, .1]],                           // la curva z = 5 − x²
    ['tono', T.ferma + .3, T.ferma + 1.6, [.75, .6, .3]], ['tono', T.ferma + 1.6, T.ferma + 3.2, [.3, .75, .2]],
    ['tono', T.ferma + 3.2, T.ferma + 4.2, [.2, .6]],                                         // il punto che corre
    ['traccia', T.tangY + .4, T.tangY + 1.2], ['ding', T.tangY + 1.8],                        // la tangente, −2
    ['pop', T.parziale + .3, .5], ['pop', T.simbolo + .3, .6],
    ['soffio', T.pianoX + .7],                                                                // il piano x = 1
    ['tono', T.curvaX + .3, T.curvaX + 1.3, [.1, .7, .9, .7, .1]],                            // la curva z = 8 − y²
    ['traccia', T.tangX + .4, T.tangX + 1.2], ['pop', T.tangX + .8, .5], ['ding', T.tangX + 1.8],   // la tangente, −4
    ['soffio', T.due + .4], ['pop', T.due + 1.4, .45], ['pop', T.due + 2.6, .3],              // le due pendenze
    ['pop', T.doppio + .4, .5],
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Due pendenze in un punto', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.pianoY - .2, 'la collina e il punto'], [T.pianoY - .2, T.pianoX - .2, 'tagliare con y = 2'],
      [T.pianoX - .2, T.due - .2, 'tagliare con x = 1'], [T.due - .2, FINE, 'due pendenze']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneSpazio(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
