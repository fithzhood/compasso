'use strict';
/* Il triangolo isoscele, dimostrato — ipotesi AB = AC, tesi β = γ (gli angoli alla base). La bisettrice da A taglia BC
   in D: ABD e ACD hanno AB = AC (ipotesi), i due angoli in A congruenti (bisettrice) e AD in comune, quindi sono congruenti
   per LAL. Ribaltato su AD, ABD si posa su ACD e β finisce su γ. Lati congruenti coi trattini, angoli congruenti con gli
   archetti, come a scuola. Argomento: geometria-piano-1 (oggi la teoria sta in geometria-euclidea). */
CVIDEO.registra('geometria-piano-1/isoscele', M => {
  const { W, C, E, P, life, css, mix, TITOLI, conFont, drawRich, richW, txt, glowStroke, dot, card, checkMark } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['tri', 4.4, 'Ecco un triangolo isoscele: i lati\n{mink:AB} e {mink:AC} sono congruenti.'],
  ['tratt', 3.8, 'Lo dicono i {g:trattini},\nuno su ogni lato.'],
  ['base', 4.6, 'Gli angoli alla base sono\n{my:β} in {mink:B} e {my:γ} in {mink:C}.'],
  ['ipo', 4.4, 'L’{v:ipotesi} è quello che so già:\n{mink:AB = AC}.'],
  ['tesi', 4.6, 'La {v:tesi} è quello che devo\ndimostrare: {my:β = γ}.'],
  ['bis', 4.8, 'Dal vertice {mink:A} traccio la {v:bisettrice}:\ntaglia {mink:BC} nel punto {mink:D}.', .3],
  ['meta', 4.6, 'Divide l’angolo in due parti\n{g:congruenti}: lo dicono gli archetti.'],
  ['due', 4.4, 'Ora ci sono due triangoli:\n{mink:ABD} e {mink:ACD}.'],
  ['l1', 4.0, '{mink:AB = AC}: lo dice l’ipotesi.'],
  ['a1', 4.8, 'I due angoli in {mink:A} sono congruenti:\nlo dice la bisettrice.'],
  ['l2', 4.8, '{mink:AD} è un lato di tutti e due\ni triangoli: è {g:in comune}.'],
  ['lal', 5.4, 'Due lati e l’angolo fra loro: per il\ncriterio {v:LAL} sono {g:congruenti}.'],
  ['ribalta', 4.8, 'Ribalto {mink:ABD} lungo {mink:AD}: si posa\nesattamente su {mink:ACD}.'],
  ['corr', 5.0, '{my:β} finisce su {my:γ}: tutti e due stanno\ndi fronte al lato {mink:AD}.'],
  ['fine', 4.4, 'Quindi {my:β = γ}: la tesi\nè {g:dimostrata}.'],
];
const T = {}, FUMETTI = [[2.1, 7.0, 'Nel triangolo isoscele gli angoli\nalla base sono congruenti. Perché?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'La bisettrice taglia l’isoscele in due\ntriangoli congruenti: così {my:β = γ}.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.tesi, 'pensa'], [T.bis, 'neutro'], [T.lal, 'felice'], [T.lal + 2.4, 'neutro'],
  [T.ribalta + 2.0, 'sorpreso'], [T.corr, 'neutro'], [T.fine, 'festa'], [T.fine + 2.4, 'felice'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// la figura: A in alto, BC orizzontale; D è il piede della bisettrice
const A = [520, 215], B = [230, 690], Cv = [810, 690], D = [520, 690];
const dir = (V, Q) => Math.atan2(Q[1] - V[1], Q[0] - V[0]);
function apertura(V, P1, P2) {
  const a1 = dir(V, P1); let d = dir(V, P2) - a1;
  while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI;
  return [a1, d];
}
function seg(ctx, a, b, col, w = 5, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); ctx.stroke(); ctx.restore();
}
// archetto dell'angolo in V fra le direzioni verso P1 e P2: n archi concentrici, con la tacca se serve
function archetto(ctx, V, P1, P2, r, col, al, o = {}) {
  if (al <= 0) return;
  const n = o.n || 1, riemp = o.riemp != null ? o.riemp : .16, [a1, d] = apertura(V, P1, P2);
  ctx.save(); ctx.globalAlpha *= al;
  if (riemp > 0) { ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], r + (n - 1) * 12, a1, a1 + d, d < 0); ctx.closePath(); ctx.fillStyle = css(col, riemp); ctx.fill(); }
  ctx.strokeStyle = css(col); ctx.lineWidth = o.w || 3.5; ctx.lineCap = 'round';
  if (!o.soloColore) for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(V[0], V[1], r + i * 12, a1, a1 + d, d < 0); ctx.stroke(); }
  if (o.tacca) {
    const m = a1 + d / 2;
    ctx.beginPath(); ctx.moveTo(V[0] + (r - 13) * Math.cos(m), V[1] + (r - 13) * Math.sin(m));
    ctx.lineTo(V[0] + (r + 13) * Math.cos(m), V[1] + (r + 13) * Math.sin(m)); ctx.stroke();
  }
  ctx.restore();
}
// punto sulla bisettrice dell'angolo in V, a distanza r (per le etichette)
function sullaBis(V, P1, P2, r) { const [a1, d] = apertura(V, P1, P2), m = a1 + d / 2; return [V[0] + r * Math.cos(m), V[1] + r * Math.sin(m)]; }
// trattini a metà del segmento PQ, perpendicolari al segmento
function trattino(ctx, Pp, Q, col, al, n = 1, w = 4.5) {
  if (al <= 0) return;
  const mx = (Pp[0] + Q[0]) / 2, my = (Pp[1] + Q[1]) / 2, L = Math.hypot(Q[0] - Pp[0], Q[1] - Pp[1]);
  const ux = (Q[0] - Pp[0]) / L, uy = (Q[1] - Pp[1]) / L;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 12, cx = mx + ux * o, cy = my + uy * o;
    ctx.beginPath(); ctx.moveTo(cx + uy * 17, cy - ux * 17); ctx.lineTo(cx - uy * 17, cy + ux * 17); ctx.stroke();
  }
  ctx.restore();
}
// fascia trasparente lungo un lato, quando Ada lo cita
function fascia(ctx, a, b, col, al) { seg(ctx, a, b, col, 22, 1, .28 * al); }
// nome di un angolo con il cappello sulla lettera di mezzo, come B\widehat{A}D nel sito; restituisce la larghezza
function angH(ctx, s, x, y, size, al = 1, align = 'left') {
  const str = '{mink:' + s + '}';
  const w = richW(ctx, str, size), w0 = richW(ctx, '{mink:' + s[0] + '}', size), w1 = richW(ctx, '{mink:' + s[1] + '}', size);
  if (al <= 0) return w;
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  drawRich(ctx, str, x0, y, { size, alpha: al, align: 'left' });
  const mx = x0 + w0 + w1 / 2 + size * .05, hy = y - size * .5;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2, size * .05); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(mx - size * .24, hy); ctx.lineTo(mx, hy - size * .17); ctx.lineTo(mx + size * .24, hy); ctx.stroke(); ctx.restore();
  return w;
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Il triangolo isoscele', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// 1–3 · la figura, la bisettrice, il ribaltamento (7.5–FINE)
const kRib = t => P(t, T.ribalta + .5, T.ribalta + 2.7, E.io);
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  // i due triangoli ABD e ACD, colorati da quando Ada li nomina
  const kDue = P(t, T.due + .3, T.due + .9) * (1 + .6 * life(t, T.lal + .2, T.lal + 5.2, .4, .5));
  if (kDue > 0) {
    ctx.save();
    ctx.fillStyle = css(C.x, .12 * kDue); ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...B); ctx.lineTo(...D); ctx.closePath(); ctx.fill();
    ctx.fillStyle = css(C.y, .12 * kDue); ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...D); ctx.lineTo(...Cv); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  // i lati citati: AB e AC (ipotesi), AD (in comune)
  const h1 = life(t, T.l1, T.l1 + 4.0, .3, .3), h2 = life(t, T.l2, T.l2 + 4.4, .3, .3);
  if (h1 > 0) { fascia(ctx, A, B, C.g, h1); fascia(ctx, A, Cv, C.g, h1); }
  if (h2 > 0) fascia(ctx, A, D, C.g, h2);
  // il triangolo
  glowStroke(ctx, [A, B, Cv, A], P(t, 8.0, 9.4, E.lin), C.ink, 4);
  // la bisettrice AD
  seg(ctx, A, D, C.v, 5, P(t, T.bis + .4, T.bis + 1.4));
  dot(ctx, D, C.ink, P(t, T.bis + 1.3, T.bis + 1.6, E.back), 7);
  lab(ctx, '{mink:D}', [D[0], D[1] + 44], P(t, T.bis + 1.4, T.bis + 1.8));
  // i trattini: AB e AC congruenti
  const kT = P(t, T.tratt + .3, T.tratt + .7, E.back);
  trattino(ctx, A, B, h1 > 0 ? mix(C.ink, C.g, h1) : C.ink, kT);
  trattino(ctx, A, Cv, h1 > 0 ? mix(C.ink, C.g, h1) : C.ink, kT);
  // i due angoli in A, congruenti: un archetto con la tacca ciascuno
  const kM = P(t, T.meta + .3, T.meta + .8), ha = life(t, T.a1, T.a1 + 4.4, .3, .3);
  archetto(ctx, A, B, D, 106, C.v, kM, { tacca: true, riemp: .14 + .3 * ha });
  archetto(ctx, A, D, Cv, 106, C.v, kM, { tacca: true, riemp: .14 + .3 * ha });
  // gli angoli alla base: β e γ solo colorati; alla fine, a tesi dimostrata, due archetti verdi ciascuno (congruenti)
  const kB = P(t, T.base + .4, T.base + .8), kG = P(t, T.base + 1.6, T.base + 2.0);
  const hg = life(t, T.corr + .2, T.corr + 5.0, .3, .4), kD = P(t, T.fine + .3, T.fine + .9);
  archetto(ctx, B, A, Cv, 68, kD > 0 ? mix(C.y, C.g, kD) : C.y, kB, { soloColore: true, riemp: .24 });
  archetto(ctx, Cv, B, A, 68, kD > 0 ? mix(C.y, C.g, kD) : C.y, kG, { soloColore: true, riemp: .24 + .3 * hg });
  archetto(ctx, B, A, Cv, 62, C.g, kD, { n: 2, riemp: 0 });
  archetto(ctx, Cv, B, A, 62, C.g, kD, { n: 2, riemp: 0 });
  lab(ctx, '{my:β}', sullaBis(B, A, Cv, 118), kB);
  lab(ctx, '{my:γ}', sullaBis(Cv, B, A, 118), kG);
  // «in comune» dentro ACD, finché non arriva il ribaltamento
  lab(ctx, '{g:in comune}', [624, 575], life(t, T.l2 + .4, T.ribalta + .3, .3, .4), 32);
  // il ribaltamento: una copia di ABD gira attorno ad AD e si posa su ACD
  const vis = life(t, T.ribalta + .3, T.corr + 5.0, .3, .5);
  if (vis > 0) {
    const s = Math.cos(Math.PI * kRib(t));
    ctx.save(); ctx.globalAlpha *= vis;
    ctx.translate(A[0], 0); ctx.scale(s, 1); ctx.translate(-A[0], 0);
    ctx.fillStyle = css(C.x, .26); ctx.strokeStyle = css(C.x); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...B); ctx.lineTo(...D); ctx.closePath(); ctx.fill(); ctx.stroke();
    trattino(ctx, A, B, C.x, 1);
    archetto(ctx, B, A, Cv, 68, C.y, 1, { soloColore: true, riemp: .36 });
    ctx.restore();
  }
  // i vertici
  const kN = P(t, 9.2, 9.7);
  lab(ctx, '{mink:A}', [A[0], A[1] - 44], kN);
  lab(ctx, '{mink:B}', [B[0] - 38, B[1] + 30], kN);
  lab(ctx, '{mink:C}', [Cv[0] + 38, Cv[1] + 30], kN);
  ctx.restore();
}

// la scheda a destra: ipotesi, tesi, e i passi della dimostrazione
const XL = 1090, XF = 1290, XR = 1820;
function riga(ctx, t, y, a, sinistra, motivo) {
  const k = P(t, a, a + .4);
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  sinistra(y);
  if (motivo) drawRich(ctx, motivo, XR, y, { size: 32, align: 'right' });
  ctx.restore();
}
function scenePannello(ctx, t) {
  if (t < T.ipo || t > FINE + .2) return;
  const la = P(t, T.ipo, T.ipo + .5) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'ipotesi e tesi', 1450, 172, { size: 40, weight: 600 }));
  riga(ctx, t, 250, T.ipo + .4, y => { txt(ctx, 'ipotesi', XL, y, { size: 32, color: C.dim, align: 'left' }); drawRich(ctx, '{mink:AB = AC}', XF, y, { size: 46, align: 'left' }); });
  const kOk = P(t, T.fine + .3, T.fine + .8);
  riga(ctx, t, 330, T.tesi + .4, y => {
    txt(ctx, 'tesi', XL, y, { size: 32, color: C.dim, align: 'left' });
    drawRich(ctx, '{my:β = γ}', XF, y, { size: 46, align: 'left', alpha: 1 - kOk });
    drawRich(ctx, '{mg:β = γ}', XF, y, { size: 46, align: 'left', alpha: kOk });
    checkMark(ctx, 1520, y, P(t, T.fine + .4, T.fine + 1.4), C.g, .38);
  });
  const kDim = P(t, T.bis, T.bis + .5);
  if (kDim > 0) {
    ctx.save(); ctx.globalAlpha *= kDim;
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 375); ctx.lineTo(1820, 375); ctx.stroke();
    conFont(TITOLI, () => drawRich(ctx, 'dimostrazione', 1450, 420, { size: 38, weight: 600 }));
    ctx.restore();
  }
  riga(ctx, t, 486, T.l1 + .3, y => drawRich(ctx, '{mink:AB = AC}', XL, y, { size: 44, align: 'left' }), '{dim:per ipotesi}');
  riga(ctx, t, 550, T.a1 + .3, y => {
    let x = XL + angH(ctx, 'BAD', XL, y, 44);
    drawRich(ctx, '{mink: = }', x, y, { size: 44, align: 'left' }); x += richW(ctx, '{mink: = }', 44);
    angH(ctx, 'CAD', x, y, 44);
  }, '{dim:bisettrice}');
  riga(ctx, t, 614, T.l2 + .3, y => drawRich(ctx, '{mink:AD}', XL, y, { size: 44, align: 'left' }), '{dim:in comune}');
  riga(ctx, t, 680, T.lal + .4, y => drawRich(ctx, '{mink:ABD}{ink: e }{mink:ACD}{ink: congruenti}', XL, y, { size: 40, align: 'left' }), '{v:LAL}');
  riga(ctx, t, 746, T.corr + .4, y => drawRich(ctx, '{my:β = γ}', XL, y, { size: 44, align: 'left' }), '{dim:opposti ad }{mink:AD}');
  ctx.restore();
}

// 4 · in una frase (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La bisettrice divide l’isoscele in due triangoli\ncongruenti: gli angoli alla base sono {g:congruenti}.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[470, 480, '{v:ipotesi}: {mink:AB = AC}'], [960, 380, 'criterio {v:LAL}'], [1450, 420, '{v:tesi}: {my:β = γ}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 510); ctx.scale(k, k); ctx.translate(-x, -510);
    card(ctx, x - w / 2, 445, w, 130);
    drawRich(ctx, s, x, 512, { size: 40, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['traccia', 8.0, 9.4], ['pop', 9.2, .5],                                  // il triangolo e i vertici
    ['pop', T.tratt + .3, .6],                                                                 // i trattini
    ['pop', T.base + .4, .4], ['pop', T.base + 1.6, .45],                                      // β e γ
    ['soffio', T.ipo], ['pop', T.ipo + .4, .5], ['pop', T.tesi + .4, .6],                      // ipotesi e tesi
    ['tono', T.bis + .4, T.bis + 1.4, [.85, .1]], ['pop', T.bis + 1.3, .3],                    // la bisettrice scende fino a D
    ['pop', T.meta + .3, .7],                                                                  // i due archetti in A
    ['soffio', T.due + .3],                                                                    // i due triangoli
    ['pop', T.l1 + .3, .5], ['pop', T.a1 + .3, .6], ['pop', T.l2 + .3, .7],                    // i tre passi
    ['ding', T.lal + .4],                                                                      // congruenti per LAL
    ['tono', T.ribalta + .5, T.ribalta + 2.7, [.2, .3, .5, .7, .8]], ['pop', T.ribalta + 2.8, .8],   // il ribaltamento
    ['pop', T.corr + .2, .6],                                                                  // β su γ
    ['pop', T.fine + .4, .8],                                                                  // la tesi, spuntata
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Il triangolo isoscele', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.ipo - .1, 'il triangolo isoscele'], [T.ipo - .1, T.bis - .2, 'ipotesi e tesi'],
      [T.bis - .2, T.ribalta - .1, 'la bisettrice'], [T.ribalta - .1, FINE, 'gli angoli alla base']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
