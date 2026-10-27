'use strict';
/* Quando un quadrilatero ha la sua circonferenza — circonferenza di centro O, A, B, C, D sulla circonferenza (a 140°,
   220°, 300° e 64°, poi D scorre a 20°: posizioni a gradi pari, così gli angoli alla circonferenza sono interi).
   α + γ = 102° + 78° e β + δ = 100° + 80°: angoli opposti supplementari. D scorre: α e γ cambiano (80° e 100°), la
   somma no. Perché: B e D dividono la circonferenza in due archi da 160° e 200°; α e γ sono le metà dei loro angoli
   al centro, quindi α + γ = 360° : 2. Poi D esce lungo il raggio: δ scende a 65° e β + δ = 165°; D entra: δ sale a 95°
   e β + δ = 195° (δ va a gradi interi, la distanza di D da O si trova per bisezione; il quadrilatero resta convesso).
   Regola: un quadrilatero convesso è inscrivibile se e solo se gli angoli opposti sono supplementari.
   Argomento: geometria-piano-2 (la teoria sta in geometria-piano-2, § quadrilateri-inscritti). */
CVIDEO.registra('geometria-piano-2/inscrivibile', M => {
  const { W, C, E, P, life, kf, lerp, css, TITOLI, conFont, drawRich, dot, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['circ', 5.0, 'Una circonferenza di centro {mink:O} e\nquattro suoi punti: {mink:A}, {mink:B}, {mink:C}, {mink:D}.'],
  ['quad', 5.4, 'Li unisco: {mink:ABCD} è {g:inscritto},\ncon i vertici sulla circonferenza.'],
  ['angoli', 5.6, 'I suoi angoli: {mx:α} in {mink:A}, {mv:β} in {mink:B},\n{my:γ} in {mink:C} e {mv:δ} in {mink:D}.'],
  ['somma1', 5.4, '{mx:α} è 102°, {my:γ} è 78°: insieme\nfanno {g:180°}.'],
  ['somma2', 4.8, 'Anche {mv:β}{mink: + }{mv:δ}{mink: = 100}°{mink: + 80}°{mink: = 180}°.'],
  ['suppl', 5.8, '{mx:α} e {my:γ} sono {v:opposti}, come {mv:β} e {mv:δ}:\ngli angoli opposti sono {g:supplementari}.'],
  ['sposto', 4.4, 'Sposto {mink:D} sulla circonferenza…'],
  ['resta', 5.0, '…{mx:α} e {my:γ} cambiano, ma la loro\nsomma resta {g:180°}.'],
  ['archi', 5.8, '{mink:B} e {mink:D} dividono la circonferenza\nin due archi: insieme fanno {v:360°}.'],
  ['meta', 6.0, '{mx:α} e {my:γ} sono angoli alla circonferenza:\nognuno è la {g:metà} del suo angolo al centro.'],
  ['quindi', 5.0, 'Quindi {mx:α}{mink: + }{my:γ} è la metà\ndi {v:360°}: {g:180°}.'],
  ['esce', 4.4, 'Ora porto {mink:D} {r:fuori} dalla circonferenza…'],
  ['scende', 5.6, '…l’angolo {mv:δ} {r:diminuisce}: {mv:β}{mink: + }{mv:δ}\nscende sotto {r:180°}.'],
  ['entra', 4.2, 'E se {mink:D} entra {x:dentro}…'],
  ['sale', 5.2, '…{mv:δ} {g:aumenta}, e {mv:β}{mink: + }{mv:δ}\nsupera {r:180°}.'],
  ['regola', 5.2, 'Un quadrilatero {v:convesso} è {v:inscrivibile}\nin una circonferenza…', 1.2],
  ['sse', 4.8, '…se e solo se i suoi angoli\nopposti sono {g:supplementari}.'],
];
const T = {}, FUMETTI = [[2.1, 7.0, 'Ogni quadrilatero ha una circonferenza\nche passa per i suoi vertici?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'In un quadrilatero convesso, inscrivibile\nvuol dire angoli opposti supplementari.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.somma1 + 2.0, 'felice'], [T.somma1 + 4.4, 'neutro'], [T.resta, 'sorpreso'], [T.resta + 2.4, 'neutro'],
  [T.archi, 'pensa'], [T.meta, 'neutro'], [T.quindi, 'festa'], [T.quindi + 2.4, 'felice'],
  [T.esce, 'neutro'], [T.scende, 'sorpreso'], [T.scende + 2.4, 'neutro'], [T.sale, 'sorpreso'], [T.sale + 2.4, 'neutro'],
  [T.sse, 'felice'],
  [FINE, 'neutro'], [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// la circonferenza: centro O, raggio R; i punti per angolo in gradi (antiorario, da destra)
const RAD = Math.PI / 180, O = [500, 455], R = 260;
const Pc = (g, r = R) => [O[0] + r * Math.cos(g * RAD), O[1] - r * Math.sin(g * RAD)];
const GA = 140, GB = 220, GC = 300, A = Pc(GA), B = Pc(GB), Cv = Pc(GC);
// D scorre sulla circonferenza a gradi pari (da 64° a 20°): così α = (D − B)/2 e γ sono interi
const gD = t => 2 * Math.round(kf(t, [[T.sposto + .3, 64], [T.sposto + 4.0, 20]]) / 2);
// fuori e dentro: δ va a gradi interi; la distanza di D da O, sul raggio a 20°, si trova per bisezione
const angDelta = r => { const D = Pc(20, r); return angolo(D, A, Cv).gradi; };
const deltaT = t => Math.round(kf(t, [[T.esce + .3, 80], [T.esce + 3.8, 65], [T.entra + .3, 65], [T.entra + 3.8, 95], [T.regola - 1.3, 95], [T.regola - .1, 80]]));
function raggioD(t) {
  const d = deltaT(t);
  if (t < T.esce + .3 || d === 80) return R;
  let lo = 120, hi = 600;   // δ cala quando D si allontana da O
  for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (angDelta(m) > d) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const vertD = t => { const r = raggioD(t); return { D: Pc(gD(t), r), r }; };
// l'angolo in V fra le direzioni verso P1 e P2 (il più piccolo dei due)
function angolo(V, P1, P2) {
  const a1 = Math.atan2(P1[1] - V[1], P1[0] - V[0]); let d = Math.atan2(P2[1] - V[1], P2[0] - V[0]) - a1;
  while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI;
  return { a1, d, gradi: Math.abs(d) / RAD, bis: a1 + d / 2 };
}
function spicchio(ctx, V, P1, P2, r, col, al, riemp = .2) {
  if (al <= 0) return;
  const an = angolo(V, P1, P2);
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], r, an.a1, an.a1 + an.d, an.d < 0); ctx.closePath(); ctx.fillStyle = css(col, riemp); ctx.fill();
  ctx.beginPath(); ctx.arc(V[0], V[1], r, an.a1, an.a1 + an.d, an.d < 0); ctx.strokeStyle = css(col); ctx.lineWidth = 3.5; ctx.stroke();
  ctx.restore();
}
function seg(ctx, a, b, col, w = 4, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 44) => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al }); };
// le misure, sempre intere: β e δ sul cerchio vengono dagli archi; fuori, δ è quello scelto e α + γ = 360° − β − δ
function misure(t) {
  const g = gD(t), d = deltaT(t), fuori = t >= T.esce + .3 && d !== 80;
  return { al: (360 + g - GB) / 2, ga: (GB + 360 - (360 + g)) / 2, be: (GA + 360 - GC) / 2, de: d, fuori };
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Quando un quadrilatero\nha la sua circonferenza', W / 2, 215, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.1 }));
}

// 1–4 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const { D, r } = vertD(t), g = gD(t), fuori = Math.abs(r - R) > .5;
  // la circonferenza
  const kc = P(t, T.circ + .2, T.circ + 1.5, E.lin);
  if (kc > 0) {
    ctx.save(); ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.arc(O[0], O[1], R, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * kc); ctx.stroke(); ctx.restore();
  }
  // gli archi e gli angoli al centro della dimostrazione: arco BCD (di α) e arco DAB (di γ)
  const kArc = life(t, T.archi + .4, T.esce + .3, .5, .5);
  if (kArc > 0) {
    ctx.save(); ctx.globalAlpha *= kArc; ctx.lineCap = 'round';
    ctx.lineWidth = 10; ctx.strokeStyle = css(C.x, .8);
    ctx.beginPath(); ctx.arc(O[0], O[1], R, -GB * RAD, -(360 + g) * RAD, true); ctx.stroke();
    ctx.strokeStyle = css(C.y, .8);
    ctx.beginPath(); ctx.arc(O[0], O[1], R, -g * RAD, -GB * RAD, true); ctx.stroke();
    ctx.restore();
    const kW = P(t, T.meta + .6, T.meta + 1.2) * kArc;
    if (kW > 0) {
      ctx.save(); ctx.globalAlpha *= kW;
      // i due angoli al centro, spicchi grandi con il bordo: 160° verso C, 200° verso A
      ctx.beginPath(); ctx.moveTo(...O); ctx.arc(O[0], O[1], 78, -GB * RAD, -(360 + g) * RAD, true); ctx.closePath(); ctx.fillStyle = css(C.x, .22); ctx.fill();
      ctx.beginPath(); ctx.arc(O[0], O[1], 78, -GB * RAD, -(360 + g) * RAD, true); ctx.strokeStyle = css(C.x); ctx.lineWidth = 3.5; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(...O); ctx.arc(O[0], O[1], 78, -g * RAD, -GB * RAD, true); ctx.closePath(); ctx.fillStyle = css(C.y, .22); ctx.fill();
      ctx.beginPath(); ctx.arc(O[0], O[1], 78, -g * RAD, -GB * RAD, true); ctx.strokeStyle = css(C.y); ctx.stroke();
      ctx.restore();
      seg(ctx, O, B, C.dim, 3, 1, kW); seg(ctx, O, Pc(g), C.dim, 3, 1, kW);
      const mx = (GB + 360 + g) / 2;
      lab(ctx, '{x:' + (360 + g - GB) + '°}', Pc(mx, 112), kW, 40);
      lab(ctx, '{y:' + (GB - g) + '°}', Pc(90, R - 45), kW, 40);   // vicino al suo arco arancione, lontano da α
    }
  }
  // il quadrilatero
  const kQ = P(t, T.quad + .3, T.quad + 1.7, E.lin);
  if (kQ > 0) glowStroke4(ctx, [A, B, Cv, D, A], kQ);
  // gli angoli
  const kA = t2 => P(t, t2, t2 + .4);
  spicchio(ctx, A, B, D, 52, C.x, kA(T.angoli + .5));
  spicchio(ctx, B, A, Cv, 52, C.v, kA(T.angoli + 1.3));
  spicchio(ctx, Cv, B, D, 52, C.y, kA(T.angoli + 2.4));
  spicchio(ctx, D, A, Cv, 52, C.v, kA(T.angoli + 3.2), .2 + .2 * life(t, T.esce + .3, T.sale + 5.2, .4, .4));
  // il nome di δ si allontana da D quando D esce, così la circonferenza non ci passa sopra
  const nome = (V, P1, P2, s, k, d = 88) => { const an = angolo(V, P1, P2); lab(ctx, s, [V[0] + d * Math.cos(an.bis), V[1] + d * Math.sin(an.bis)], k, 44); };
  nome(A, B, D, '{mx:α}', kA(T.angoli + .5)); const kR0 = 1 - life(t, T.meta + .5, T.esce + .8, .4, .5);   // i raggi OB e OD passerebbero sui nomi di β e δ
  nome(B, A, Cv, '{mv:β}', kA(T.angoli + 1.3) * kR0);
  nome(Cv, B, D, '{my:γ}', kA(T.angoli + 2.4)); nome(D, A, Cv, '{mv:δ}', kA(T.angoli + 3.2) * kR0, 88 + .5 * Math.max(0, r - R));
  // i punti e i loro nomi (D fuori o dentro: rosso)
  dot(ctx, O, C.ink, P(t, T.circ + .3, T.circ + .6, E.back), 7);
  lab(ctx, '{mink:O}', [O[0] + 30, O[1] + 30], P(t, T.circ + .4, T.circ + .8), 40);
  const kP = i => P(t, T.circ + 1.6 + i * .4, T.circ + 1.9 + i * .4, E.back);
  [[A, GA], [B, GB], [Cv, GC]].forEach(([p, gg], i) => { dot(ctx, p, C.ink, kP(i), 8); lab(ctx, '{mink:' + 'ABC'[i] + '}', Pc(gg, R + 44), kP(i)); });
  dot(ctx, D, fuori ? C.r : C.ink, kP(3), 9);
  lab(ctx, '{mink:D}', Pc(g, r + 44 - 10 * Math.max(0, Math.min(1, (R - r) / 30))), kP(3));   // dentro: fra D e la circonferenza
  ctx.restore();
}
function glowStroke4(ctx, pts, k) { M.glowStroke(ctx, pts, k, C.ink, 4); }

// la scheda a destra: le due somme, la dimostrazione, la regola
const XL = 1095, XR = 1820;
const gr = (n, col) => '{m' + col + ':' + n + '}{' + col + ':°}';
function scenePannello(ctx, t) {
  if (t < T.somma1 || t > FINE + .2) return;
  const la = P(t, T.somma1, T.somma1 + .5) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  conFont(TITOLI, () => drawRich(ctx, 'gli angoli opposti', 1450, 170, { size: 40, weight: 600 }));
  const m = misure(t);
  // α + γ
  const k1 = P(t, T.somma1 + .6, T.somma1 + 1.0);
  if (k1 > 0) {
    const s = m.fuori ? '{mx:α}{mink: + }{my:γ}{mink: = }' + gr(360 - m.be - m.de, 'r')
      : '{mx:α}{mink: + }{my:γ}{mink: = }' + gr(m.al, 'x') + '{mink: + }' + gr(m.ga, 'y') + '{mink: = }' + gr(180, 'g');
    // con D fuori o dentro Ada parla solo di β + δ: la riga di α + γ si fa da parte
    drawRich(ctx, s, XL, 262, { size: 46, align: 'left', alpha: k1 * (1 - life(t, T.esce + .1, T.regola + .2, .3, .3)) });
  }
  // β + δ
  const k2 = P(t, T.somma2 + .6, T.somma2 + 1.0);
  if (k2 > 0) {
    const tot = m.be + m.de;
    drawRich(ctx, '{mv:β}{mink: + }{mv:δ}{mink: = }' + gr(m.be, 'v') + '{mink: + }' + gr(m.de, 'v') + '{mink: = }' + gr(tot, tot === 180 ? 'g' : 'r'), XL, 342, { size: 46, align: 'left', alpha: k2 });
  }
  ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  const kS = P(t, T.archi + .4, T.archi + .8);
  if (kS > 0) { ctx.save(); ctx.globalAlpha *= kS; ctx.beginPath(); ctx.moveTo(1080, 398); ctx.lineTo(1820, 398); ctx.stroke(); ctx.restore(); }
  // la dimostrazione: le metà dei due angoli al centro
  const kD = 1 - P(t, T.esce + .1, T.esce + .5);
  const riga = (a, s, y, nota) => {
    const k = P(t, a, a + .4) * kD;
    if (k <= 0) return;
    drawRich(ctx, s, XL, y, { size: 46, align: 'left', alpha: k });
    drawRich(ctx, nota, XR, y, { size: 32, align: 'right', alpha: k });
  };
  riga(T.archi + 1.6, gr(160, 'x') + '{mink: + }' + gr(200, 'y') + '{mink: = }' + gr(360, 'v'), 462, '{dim:i due archi}');
  riga(T.meta + 2.6, '{mx:α}{mink: = }' + gr(80, 'x') + '{ink:   e   }{my:γ}{mink: = }' + gr(100, 'y'), 540, '{dim:le metà}');
  riga(T.quindi + .6, '{mx:α}{mink: + }{my:γ}{mink: = }' + gr(180, 'g'), 618, '{dim:metà di 360°}');
  // la regola
  const kR = P(t, T.regola + .6, T.regola + 1.1);
  if (kR > 0) {
    ctx.save(); ctx.globalAlpha *= kR; ctx.strokeStyle = css(C.g); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(1080, 432, 740, 330, 18); ctx.stroke(); ctx.restore();
    drawRich(ctx, 'quadrilatero {v:convesso}:', 1450, 488, { size: 38, alpha: kR });
    drawRich(ctx, '{v:inscrivibile}', 1450, 560, { size: 46, weight: 600, alpha: kR });
    drawRich(ctx, 'se e solo se', 1450, 628, { size: 34, alpha: P(t, T.sse + .3, T.sse + .7) });
    drawRich(ctx, 'angoli opposti {g:supplementari}', 1450, 700, { size: 40, alpha: P(t, T.sse + .9, T.sse + 1.3) });
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
    drawRich(ctx, 'Un quadrilatero convesso è inscrivibile se e solo\nse gli angoli opposti sono {g:supplementari}.', W / 2, 290, { size: 60, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[450, 460, '{mx:α}{mink: + }{my:γ}{mink: = 180}°\n{mv:β}{mink: + }{mv:δ}{mink: = 180}°'], [980, 480, 'ognuno è la {g:metà}\ndel suo angolo al centro'], [1470, 440, '{mink:D} fuori o dentro:\nla somma {r:non torna}']];
  pills.forEach(([x, w, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - w / 2, 435, w, 170);
    drawRich(ctx, s, x, 520, { size: i ? 36 : 42, lh: 1.35 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): D che scorre sul cerchio (tono = altezza), poi esce ed entra (tono = δ)
  const altD = g => +((715 - (O[1] - R * Math.sin(g * RAD))) / 520).toFixed(2);
  const SUONI = [
    ['soffio', 1.5], ['soffio', 7.5],
    ['traccia', T.circ + .2, T.circ + 1.5], ['pop', T.circ + .3, .4],                               // la circonferenza, O
    ['pop', T.circ + 1.6, .5], ['pop', T.circ + 2.0, .3], ['pop', T.circ + 2.4, .4], ['pop', T.circ + 2.8, .8],   // A, B, C, D
    ['traccia', T.quad + .3, T.quad + 1.7],                                                            // ABCD
    ['pop', T.angoli + .5, .5], ['pop', T.angoli + 1.3, .55], ['pop', T.angoli + 2.4, .6], ['pop', T.angoli + 3.2, .65],   // α, β, γ, δ
    ['soffio', T.somma1], ['ding', T.somma1 + .6], ['ding', T.somma2 + .6],                           // le due somme: 180°
    ['tono', T.sposto + .3, T.sposto + 4.0, [altD(64), altD(50), altD(35), altD(20)]],               // D scende sulla circonferenza
    ['traccia', T.archi + .4, T.archi + 1.0], ['pop', T.archi + 1.6, .6],                             // i due archi
    ['pop', T.meta + .6, .5], ['pop', T.meta + 2.6, .7],                                               // gli angoli al centro, le metà
    ['pop', T.quindi + .6, .8],                                                                        // α + γ = 180°
    ['tono', T.esce + .3, T.esce + 3.8, [.6, .5, .4, .3]],                                             // δ scende
    ['tono', T.entra + .3, T.entra + 3.8, [.3, .5, .7, .9]],                                           // δ sale
    ['tono', T.regola - 1.3, T.regola - .1, [.9, .6]],                                                 // D torna sulla circonferenza
    ['soffio', T.regola + .6], ['pop', T.sse + .3, .5], ['ding', T.sse + .9],                          // la regola
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Quando un quadrilatero ha la sua circonferenza', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.sposto - .1, 'angoli opposti'], [T.sposto - .1, T.archi - .1, 'il vertice scorre'], [T.archi - .1, T.esce - .1, 'perché 180°'],
      [T.esce - .1, T.regola - 1.2, 'fuori e dentro'], [T.regola - 1.2, FINE, 'la regola']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
