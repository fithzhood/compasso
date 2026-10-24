'use strict';
/* Interessi sugli interessi — 1000 € al 5% annuo per 10 anni: l'interesse semplice M = C(1 + i · t) cresce a retta
   fino a 1500 €, il composto M = C(1 + i)ᵗ a curva fino a ≈ 1628,89 €. Nel primo anno coincidono (1050 €); il secondo
   anno il composto calcola il 5% anche sui 50 € di interessi (52,50 € invece di 50 €).
   Simboli dei libri italiani: C capitale, i tasso, t tempo in anni, M montante.
   Argomento: matematica-finanziaria (ancora da creare). */
CVIDEO.registra('matematica-finanziaria/interesse-composto', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, richW, txt, dot, glowStroke, arrowHead, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['C', 4.3, 'Il {v:capitale} {mink:C} è quello che versi:\n{mink:C} = 1000 €.'],
  ['i', 5.9, 'Il {v:tasso} {mink:i} è la percentuale annua:\n{mink:i} = 5% = 0,05.'],
  ['tM', 5.0, 'Gli anni si contano con {mink:t};\nil {v:montante} {mink:M} è capitale più interessi.'],
  ['anno1', 5.4, 'Il primo anno l’interesse è\nil 5% di 1000 €: {g:50 €}.'],
  ['M1', 3.0, 'Il montante diventa {g:1050 €}.'],
  ['sempl', 5.9, 'Secondo anno. {x:Semplice}: l’interesse\nsi calcola ancora su 1000 €: {x:50 €}.'],
  ['comp', 5.6, '{y:Composto}: si calcola su 1050 €,\ne fa {y:52,50 €}.'],
  ['ii', 5.6, 'Quei {v:2,50 €} in più sono {v:interessi}\n{v:sugli interessi} del primo anno.'],
  ['fs', 5.4, 'Il {x:semplice} aggiunge sempre {mink:C · i}:\n{mink:M = C(1 + i · t)}.'],
  ['fc', 5.0, 'Il {y:composto} moltiplica per {mink:1 + i}\nogni anno: in {mink:t} anni, {mink:t} volte.'],
  ['assi', 5.3, 'Gli anni in orizzontale, il montante\nin verticale, a partire da 1000 €.', .4],
  ['retta', 6.0, 'Il {x:semplice} sale di 50 € l’anno:\nuna {x:retta}, fino a {x:1500 €}.'],
  ['curva', 4.2, 'Il {y:composto} sale ogni anno di più:\nuna {y:curva esponenziale}.'],
  ['dieci', 6.8, 'Dopo 10 anni:\n{mink:1000 · 1,05¹⁰ ≈} {y:1628,89 €}.'],
  ['uno', 4.5, 'Nel primo anno le due crescite\n{v:coincidono}: 1050 €.'],
  ['stacca', 5.5, 'Poi il composto {g:stacca}: dopo 10 anni\nsono {g:≈ 129 €} in più.'],
];
const T = {}, FUMETTI = [[1.8, 6.4, '1000 € al 5% per 10 anni:\nquanto diventano?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Nel composto gli interessi producono\ninteressi: la curva stacca la retta.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.M1, 'felice'], [T.M1 + 2.2, 'neutro'], [T.ii, 'sorpreso'], [T.ii + 2.4, 'neutro'],
  [T.dieci + .6, 'felice'], [T.dieci + 3.0, 'neutro'], [T.stacca, 'festa'], [T.stacca + 2.6, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Interessi sugli interessi', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// M = C(1 + i)ᵗ: l'esponente t si scrive a mano (il motore ha solo gli apici ⁿ e ˣ)
function formulaComposto(ctx, x, y, size, al, align = 'center') {
  if (al <= 0) return;
  const base = '{mink:M = C(1 + i)}', w = richW(ctx, base, size), se = Math.round(size * .72);
  const tot = w + richW(ctx, '{mink:t}', se) + size * .06;
  const x0 = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x;
  drawRich(ctx, base, x0, y, { size, align: 'left', alpha: al });
  drawRich(ctx, '{mink:t}', x0 + w + size * .06, y - size * .38, { size: se, align: 'left', alpha: al });
}

// le due schede: a sinistra le barre e poi il grafico, a destra simboli e conti
function schede(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  card(ctx, 60, 110, 1120, 690, life(t, 7.5, FINE + .2, .6, .5));
  card(ctx, 1210, 110, 650, 690, life(t, T.C, FINE + .2, .5, .5));
}

// ---- 1–2 · le barre dei primi due anni (7.5–T.assi) ----
// il capitale è un blocco alto 150 px, tagliato a zigzag (non è in scala); gli interessi sono in scala, 3,3 px per euro
const BASE = 740, CAPH = 150, U = 3.3, BW = 150, X0 = 180, X1 = 420, XS = 680, XC = 900;
const yI = e => BASE - CAPH - e * U;   // la quota di e euro di interessi, sopra il capitale
function capitale(ctx, x, al, kh = 1) {
  if (al <= 0 || kh <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const h = CAPH * kh, y0 = BASE - h;
  ctx.fillStyle = css(C.dim, .14); ctx.fillRect(x - BW / 2, y0, BW, h);
  ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.strokeRect(x - BW / 2, y0, BW, h);
  if (kh >= 1) {
    // il taglio a zigzag: il blocco del capitale non è in scala
    const yz = BASE - 112, n = 6, dx = (BW + 12) / n, x0 = x - BW / 2 - 6;
    ctx.beginPath(); ctx.moveTo(x0, yz);
    for (let i = 1; i <= n; i++) ctx.lineTo(x0 + i * dx, yz + (i % 2 ? -7 : 7));
    for (let i = n; i >= 0; i--) ctx.lineTo(x0 + i * dx, yz + 14 + (i % 2 ? -7 : 7));
    ctx.closePath(); ctx.fillStyle = C.paper; ctx.fill();
    ctx.beginPath(); ctx.moveTo(x0, yz); for (let i = 1; i <= n; i++) ctx.lineTo(x0 + i * dx, yz + (i % 2 ? -7 : 7));
    ctx.moveTo(x0, yz + 14); for (let i = 1; i <= n; i++) ctx.lineTo(x0 + i * dx, yz + 14 + (i % 2 ? -7 : 7));
    ctx.lineWidth = 3; ctx.stroke();
    drawRich(ctx, '{mink:C}', x, BASE - 52, { size: 40 });
  }
  ctx.restore();
}
// un blocco di interessi da e0 a e1 euro, alzato di dy pixel
function blocco(ctx, x, e0, e1, col, al, dy = 0, lab, lal = 1) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  const y0 = yI(e1) + dy, h = (e1 - e0) * U;
  ctx.fillStyle = css(col, e1 - e0 < 5 ? .55 : .22); ctx.fillRect(x - BW / 2, y0, BW, h);
  ctx.strokeStyle = css(col); ctx.lineWidth = 3; ctx.strokeRect(x - BW / 2, y0, BW, h);
  if (lab) txt(ctx, lab, x, y0 + h / 2, { size: 30, alpha: lal });
  ctx.restore();
}
const prezzo = (ctx, s, x, y, col, al) => txt(ctx, s, x, y, { size: 44, weight: 600, color: col, alpha: al });
const didas = (ctx, s, x, al) => txt(ctx, s, x, 772, { size: 30, color: C.dim, alpha: al });
function cornice(ctx, x, e0, e1, al, sotto) {   // la base su cui si calcola il 5%: dal fondo (sotto) o da e0 a e1
  if (al <= 0) return;
  const y1 = sotto ? BASE : yI(e0), y0 = yI(e1);
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.v); ctx.lineWidth = 6;
  ctx.beginPath(); ctx.roundRect(x - BW / 2 - 10, y0 - 10, BW + 20, y1 - y0 + 20, 10); ctx.stroke(); ctx.restore();
}
function sceneBarre(ctx, t) {
  if (t < 7.5 || t > T.assi + .1) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, T.assi - .4, T.assi);
  // anno 0: il capitale
  capitale(ctx, X0, 1, P(t, T.C + .2, T.C + 1.0, E.out));
  prezzo(ctx, '1000 €', X0, BASE - CAPH - 40, C.ink, P(t, T.C + 1.0, T.C + 1.4));
  didas(ctx, 'anno 0', X0, P(t, T.C + .2, T.C + .8));
  // anno 1: una copia scivola a destra, poi cadono i 50 € di interessi
  if (t > T.anno1 + .3) {
    capitale(ctx, lerp(X0, X1, P(t, T.anno1 + .3, T.anno1 + 1.1, E.io)), 1);
    const kg = P(t, T.anno1 + 1.2, T.anno1 + 1.7, E.out);
    blocco(ctx, X1, 0, 50, C.g, kg, -60 * (1 - kg), '50 €');
    didas(ctx, 'anno 1', X1, P(t, T.anno1 + .6, T.anno1 + 1.1));
  }
  prezzo(ctx, '1050 €', X1, yI(50) - 40, C.ink, P(t, T.M1 + .2, T.M1 + .6));
  // anno 2: due copie dell'anno 1, una per modo
  didas(ctx, 'anno 2', (XS + XC) / 2, P(t, T.sempl + .6, T.sempl + 1.1));
  if (t > T.sempl + .3) {
    const x = lerp(X1, XS, P(t, T.sempl + .3, T.sempl + 1.1, E.io));
    capitale(ctx, x, 1); blocco(ctx, x, 0, 50, C.g, 1, 0, '50 €');
    const kg = P(t, T.sempl + 1.4, T.sempl + 1.9, E.out);
    blocco(ctx, XS, 50, 100, C.g, kg, -60 * (1 - kg), '50 €');
    cornice(ctx, XS, 0, 0, life(t, T.sempl + .9, T.comp, .4, .4), true);
    txt(ctx, 'semplice', XS, yI(100) - 88, { size: 32, color: C.x, alpha: P(t, T.sempl + .3, T.sempl + .8) });
    prezzo(ctx, '1100 €', XS, yI(100) - 40, C.x, P(t, T.sempl + 1.9, T.sempl + 2.3));
  }
  if (t > T.comp + .3) {
    const x = lerp(X1, XC, P(t, T.comp + .3, T.comp + 1.1, E.io));
    capitale(ctx, x, 1); blocco(ctx, x, 0, 50, C.g, 1, 0, '50 €');
    const kg = P(t, T.comp + 1.4, T.comp + 1.9, E.out), kii = P(t, T.ii + .2, T.ii + .6);
    blocco(ctx, XC, 50, 100, C.g, kg, -60 * (1 - kg));
    const ym = (yI(100) + yI(50)) / 2 - 60 * (1 - kg);
    txt(ctx, '52,50 €', XC, ym, { size: 30, alpha: kg * (1 - kii) });
    txt(ctx, '50 €', XC, ym, { size: 30, alpha: kg * kii });
    blocco(ctx, XC, 100, 102.5, C.v, kg, -60 * (1 - kg));
    cornice(ctx, XC, 0, 50, life(t, T.comp + .9, T.ii, .4, .4), true);
    txt(ctx, 'composto', XC, yI(102.5) - 88, { size: 32, color: C.y, alpha: P(t, T.comp + .3, T.comp + .8) });
    prezzo(ctx, '1102,50 €', XC, yI(102.5) - 40, C.y, P(t, T.comp + 1.9, T.comp + 2.3));
    // gli interessi sugli interessi: il 5% dei 50 € del primo anno
    const ki = life(t, T.ii + .2, T.assi, .4, .3);
    if (ki > 0) {
      cornice(ctx, XC, 0, 50, ki);
      ctx.save(); ctx.globalAlpha *= ki; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.lineCap = 'round';
      const xa = XC + BW / 2 + 22, ym = yI(101.25);
      ctx.beginPath(); ctx.moveTo(xa, yI(25)); ctx.lineTo(xa, ym + 18); ctx.stroke(); ctx.restore();
      arrowHead(ctx, [xa, ym + 10], -Math.PI / 2, C.v, ki);
      drawRich(ctx, '{v:2,50 €}', xa + 16, ym, { size: 40, align: 'left', alpha: ki });
      drawRich(ctx, '{v:5% di 50 €}', xa + 16, yI(25), { size: 30, align: 'left', alpha: ki });
    }
  }
  ctx.restore();
}

// ---- 3 · il grafico dei dieci anni (T.assi–FINE) ----
// l'asse del montante parte da 1000 € (scritto nell'origine); 78 px per anno, 0,8 px per euro
const OX = 180, OY = 720, UX = 78, UY = .8;
const toS = (a, m) => [OX + a * UX, OY - (m - 1000) * UY];
const semp = a => 1000 * (1 + .05 * a), comp = a => 1000 * Math.pow(1.05, a);
const RETTA = [], CURVA = [];
for (let i = 0; i <= 200; i++) { const a = i / 20; RETTA.push(toS(a, semp(a))); CURVA.push(toS(a, comp(a))); }
function assi(ctx, k) {
  if (k <= 0) return;
  ctx.save();
  const yTop = toS(0, 1700)[1];
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (let a = 1; a <= 10; a++) { const x = OX + a * UX; ctx.beginPath(); ctx.moveTo(x, OY); ctx.lineTo(x, OY - (OY - yTop) * k); ctx.stroke(); }
  for (let m = 1100; m <= 1700; m += 100) { const y = toS(0, m)[1]; ctx.beginPath(); ctx.moveTo(OX, y); ctx.lineTo(OX + 10 * UX * k, y); ctx.stroke(); }
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  const xe = OX + 10.45 * UX * k, ye = OY - (OY - toS(0, 1735)[1]) * k;
  ctx.beginPath(); ctx.moveTo(OX - 6, OY); ctx.lineTo(xe, OY); ctx.moveTo(OX, OY + 6); ctx.lineTo(OX, ye); ctx.stroke();
  arrowHead(ctx, [xe + 6, OY], 0, C.ink); arrowHead(ctx, [OX, ye - 6], -Math.PI / 2, C.ink);
  ctx.globalAlpha *= P(k, .6, 1);
  // i numeri: sotto l'asse dei tempi e a sinistra di quello dei montanti, dove le curve non passano mai
  for (let a = 0; a <= 10; a++) txt(ctx, String(a), OX + a * UX, OY + 32, { size: 30, color: C.dim });
  for (let m = 1000; m <= 1700; m += 100) txt(ctx, String(m), OX - 16, toS(0, m)[1], { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mink:t}', xe + 22, OY, { size: 40, align: 'left' });
  txt(ctx, '(anni)', xe + 46, OY + 2, { size: 30, color: C.dim, align: 'left' });
  drawRich(ctx, '{mink:M}', OX + 22, ye + 4, { size: 40, align: 'left' });
  txt(ctx, '(€)', OX + 76, ye + 6, { size: 30, color: C.dim, align: 'left' });
  ctx.restore();
}
function scenePiano(ctx, t) {
  if (t < T.assi - .4 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.assi - .4, T.assi) * (1 - P(t, FINE - .5, FINE + .1));
  assi(ctx, P(t, T.assi + .1, T.assi + 1.0));
  glowStroke(ctx, RETTA, P(t, T.retta + .2, T.retta + 1.8, E.lin), C.x, 5);
  glowStroke(ctx, CURVA, P(t, T.curva + .2, T.curva + 1.8, E.lin), C.y, 5);
  txt(ctx, 'semplice', 742, 500, { size: 32, color: C.x, alpha: P(t, T.retta + 1.6, T.retta + 2.0) });
  txt(ctx, 'composto', 520, 450, { size: 32, color: C.y, alpha: P(t, T.curva + 1.6, T.curva + 2.0) });
  dot(ctx, toS(10, 1500), C.x, P(t, T.retta + 1.8, T.retta + 2.2, E.back), 9);
  dot(ctx, toS(10, comp(10)), C.y, P(t, T.dieci + .3, T.dieci + .7, E.back), 9);
  // il primo anno: le due crescite coincidono
  const ku = life(t, T.uno + .2, T.stacca + .1, .4, .4);
  if (ku > 0) {
    const p = toS(1, 1050);
    ctx.save(); ctx.globalAlpha *= ku; ctx.strokeStyle = css(C.v); ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(p[0], p[1], 17, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p[0] + 12, p[1] - 14); ctx.lineTo(p[0] + 36, p[1] - 78); ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{v:1050 €}', p[0] + 52, 575, { size: 40, alpha: ku });
  }
  // dopo 10 anni il composto ha staccato il semplice
  const kb = P(t, T.stacca + .3, T.stacca + .8);
  if (kb > 0) {
    const a = toS(10, 1500), b = toS(10, comp(10)), x = a[0] + 22;
    ctx.save(); ctx.globalAlpha *= kb; ctx.strokeStyle = css(C.g); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - 8, a[1]); ctx.lineTo(x, a[1]); ctx.lineTo(x, b[1]); ctx.lineTo(x - 8, b[1]); ctx.stroke();
    ctx.restore();
    drawRich(ctx, '{g:≈ 129 €}', x + 14, (a[1] + b[1]) / 2, { size: 40, align: 'left', alpha: kb });
  }
  ctx.restore();
}

// ---- la scheda a destra: i simboli, i conti, le due formule, i valori dopo dieci anni ----
const XL = 1250, XR = 1820, XM = 1535;
function simbolo(ctx, s, nome, y, al) {
  if (al <= 0) return;
  drawRich(ctx, s, XL, y, { size: 44, align: 'left', alpha: al });
  txt(ctx, nome, XR, y, { size: 32, color: C.dim, align: 'right', alpha: al });
}
function sceneScheda(ctx, t) {
  if (t < T.C || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.C, T.C + .5) * (1 - P(t, FINE - .5, FINE + .1));
  // i simboli, finché non arriva il grafico
  const kl = 1 - P(t, T.assi - .3, T.assi + .2);
  if (kl > 0) {
    ctx.save(); ctx.globalAlpha *= kl;
    conFont(TITOLI, () => drawRich(ctx, 'i simboli', XM, 168, { size: 40, weight: 600 }));
    simbolo(ctx, '{mink:C = 1000} €', 'capitale', 238, P(t, T.C + .3, T.C + .7));
    simbolo(ctx, '{mink:i = 5% = 0,05}', 'tasso annuo', 303, P(t, T.i + .3, T.i + .7));
    simbolo(ctx, '{mink:t}', 'tempo in anni', 368, P(t, T.tM + .3, T.tM + .7));
    simbolo(ctx, '{mink:M}', 'montante', 433, P(t, T.tM + 1.6, T.tM + 2.0));
    ctx.restore();
  }
  const kd = P(t, T.anno1 + .2, T.anno1 + .6) * kl;
  if (kd > 0) { ctx.save(); ctx.globalAlpha *= kd; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 478); ctx.lineTo(XR, 478); ctx.stroke(); ctx.restore(); }
  // il primo anno
  const k1 = life(t, T.anno1 + .3, T.sempl + .2, .4, .4);
  if (k1 > 0) {
    ctx.save(); ctx.globalAlpha *= k1;
    txt(ctx, 'anno 1', XM, 540, { size: 32, color: C.dim });
    drawRich(ctx, '{mink:1000 · 0,05 =} {g:50 €}', XM, 610, { size: 44, local: t - T.anno1 - .3 });
    drawRich(ctx, '{mink:M = 1000 + 50 =} {g:1050 €}', XM, 700, { size: 44, local: t - T.M1 - .2 });
    ctx.restore();
  }
  // il secondo anno, nei due modi
  const k2 = life(t, T.sempl + .3, T.fs + .2, .4, .4);
  if (k2 > 0) {
    ctx.save(); ctx.globalAlpha *= k2;
    txt(ctx, 'semplice', XM, 535, { size: 32, color: C.x, alpha: P(t, T.sempl + .3, T.sempl + .7) });
    drawRich(ctx, '{mink:1000 · 0,05 =} {x:50 €}', XM, 595, { size: 44, local: t - T.sempl - .5 });
    txt(ctx, 'composto', XM, 672, { size: 32, color: C.y, alpha: P(t, T.comp + .3, T.comp + .7) });
    drawRich(ctx, '{mink:1050 · 0,05 =} {y:52,50 €}', XM, 732, { size: 44, local: t - T.comp - .5 });
    ctx.restore();
  }
  // le due formule: compaiono sotto, poi salgono quando arriva il grafico
  const ky = P(t, T.assi - .2, T.assi + .7, E.io);
  txt(ctx, 'semplice', XM, lerp(535, 172, ky), { size: 32, color: C.x, alpha: P(t, T.fs + .3, T.fs + .7) });
  drawRich(ctx, '{mink:M = C(1 + i · t)}', XM, lerp(598, 234, ky), { size: 48, local: t - T.fs - .5 });
  txt(ctx, 'composto', XM, lerp(672, 318, ky), { size: 32, color: C.y, alpha: P(t, T.fc + .3, T.fc + .7) });
  formulaComposto(ctx, XM, lerp(738, 382, ky), 48, P(t, T.fc + .5, T.fc + 1.0));
  // i valori dopo dieci anni
  const kv = P(t, T.assi + .4, T.assi + .8);
  if (kv > 0) {
    ctx.save(); ctx.globalAlpha *= kv; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(XL, 446); ctx.lineTo(XR, 446); ctx.stroke(); ctx.restore();
  }
  txt(ctx, 'dopo 10 anni', XM, 500, { size: 32, color: C.dim, alpha: P(t, T.retta + 1.8, T.retta + 2.2) });
  drawRich(ctx, '{mink:1000 + 10 · 50 =} {x:1500 €}', XM, 570, { size: 44, local: t - T.retta - 1.9 });
  drawRich(ctx, '{mink:1000 · 1,05¹⁰ ≈} {y:1628,89 €}', XM, 652, { size: 44, local: t - T.dieci - .3 });
  drawRich(ctx, '{mink:1628,89 − 1500 =} {g:128,89 €}', XM, 734, { size: 44, local: t - T.stacca - .3 });
  ctx.restore();
}

// ---- 4 · in una frase (FINE–DUR) ----
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Nel composto gli {v:interessi}\nproducono altri {v:interessi}.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'semplice', C.x], [960, 'composto', C.y], [1450, '10 anni al 5%', C.dim]];
  pills.forEach(([x, testa, col], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    txt(ctx, testa, x, 486, { size: 32, color: col });
    if (i === 0) drawRich(ctx, '{mink:M = C(1 + i · t)}', x, 548, { size: 44 });
    else if (i === 1) formulaComposto(ctx, x, 552, 44, 1);
    else drawRich(ctx, '{x:1500 €}  e  {y:≈ 1628,89 €}', x, 548, { size: 36 });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py): il tono segue l'altezza dei blocchi e delle curve
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['tono', T.C + .2, T.C + 1.0, [.05, .3]], ['pop', T.C + 1.1, .3],          // il capitale
    ['pop', T.i + .4, .5], ['pop', T.tM + .4, .5], ['pop', T.tM + 1.7, .55],                     // i simboli
    ['traccia', T.anno1 + .3, T.anno1 + 1.1], ['tono', T.anno1 + 1.2, T.anno1 + 1.7, [.65, .5]],  // i 50 € del primo anno
    ['pop', T.M1 + .3, .5],                                                                      // 1050 €
    ['traccia', T.sempl + .3, T.sempl + 1.1], ['tono', T.sempl + 1.4, T.sempl + 1.9, [.85, .7]], ['pop', T.sempl + 2.0, .7],
    ['traccia', T.comp + .3, T.comp + 1.1], ['tono', T.comp + 1.4, T.comp + 1.9, [.87, .72]], ['pop', T.comp + 2.0, .72],
    ['ding', T.ii + .3],                                                                         // interessi sugli interessi
    ['pop', T.fs + .5, .5], ['pop', T.fc + .5, .6],                                              // le due formule
    ['soffio', T.assi], ['traccia', T.assi + .1, T.assi + 1.0],                                  // il grafico
    ['tono', T.retta + .2, T.retta + 1.8, [0, .71]], ['pop', T.retta + 1.9, .7],                 // la retta fino a 1500 €
    ['tono', T.curva + .2, T.curva + 1.8, [0, .09, .19, .29, .39, .51, .64, .76, .9]],          // la curva esponenziale
    ['ding', T.dieci + .4],                                                                      // ≈ 1628,89 €
    ['pop', T.uno + .3, .3],                                                                     // il primo anno: 1050 €
    ['traccia', T.stacca + .3, T.stacca + .8], ['pop', T.stacca + .4, .4],                       // ≈ 129 € in più
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'Interessi sugli interessi', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.anno1 - .1, 'capitale, tasso, montante'], [T.anno1 - .1, T.fs - .1, 'primo e secondo anno'], [T.fs - .1, T.assi - .2, 'le due formule'], [T.assi - .2, FINE, 'dieci anni']],
    scena(ctx, t) { schede(ctx, t); sceneIntro(ctx, t); sceneBarre(ctx, t); scenePiano(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
