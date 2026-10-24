'use strict';
/* La rata che non cambia — ammortamento francese: 10 000 € in 5 rate annue posticipate al 4%.
   R = S · i / (1 − (1 + i)⁻ⁿ) ≈ 2246,27 €. Quota interessi = debito residuo · i (400,00 → … → ≈ 86,40), quota capitale
   = R − quota interessi (1846,27 → … → 2159,88), e le quote capitale fanno 10 000 €. Valori al centesimo (l'ultima rata
   arrotondata verrebbe 2246,28 €: per questo la tabella dice «valori arrotondati al centesimo» e la rata ha «≈»).
   Argomento: matematica-finanziaria (ancora da creare). */
CVIDEO.registra('matematica-finanziaria/ammortamento', M => {
  const { W, C, E, P, life, lerp, css, TITOLI, conFont, drawRich, drawSeq, txt, card } = M;

// [chiave, durata del fumetto, testo, pausa prima]
const SEQ = [
  ['prestito', 6.7, 'Un prestito di {v:10 000 €}, al 4% annuo,\nda restituire in 5 rate annuali.'],
  ['uguali', 4.3, 'Le rate si pagano a fine anno\ne sono tutte {v:uguali}.'],
  ['francese', 3.6, 'Si chiama ammortamento {v:francese}:\n{v:rata costante}.'],
  ['simboli', 4.5, '{mink:S} è il debito, {mink:i} il tasso,\n{mink:n} il numero delle rate.'],
  ['formula', 3.6, 'La rata {mink:R} si trova con questa formula.'],
  ['R', 5.0, 'Con i nostri numeri:\n{mink:R ≈} {g:2246,27 €} all’anno.'],
  ['pezzi', 4.0, 'Ogni rata ha due pezzi:\n{y:quota interessi} e {g:quota capitale}.', .3],
  ['int1', 6.2, 'La quota interessi è il 4% del debito:\nil primo anno, {y:400 €}.'],
  ['cap1', 5.8, 'Il resto della rata è quota capitale:\n{mink:2246,27 − 400 =} {g:1846,27 €}.'],
  ['resta1', 6.4, 'La quota capitale {v:abbassa il debito}:\nrestano {v:8153,73 €}.'],
  ['int2', 6.9, 'Secondo anno: il debito è più piccolo,\ngli interessi scendono a {y:326,15 €}.'],
  ['cap2', 6.0, 'La rata è la stessa: la {g:quota capitale}\nsale a {g:1920,12 €}.'],
  ['calano', 3.6, 'Anno dopo anno gli interessi {y:calano}…', .2],
  ['cresce', 3.2, '…e la quota capitale {g:cresce}.'],
  ['ultimo', 4.4, 'L’ultimo anno gli interessi\nsono solo {y:≈ 86,40 €}.'],
  ['somma', 5.8, 'Le cinque quote capitale in fila\nfanno {g:10 000 €}: tutto il debito.'],
  ['tot', 5.0, 'Gli interessi pagati in tutto\nsono {y:≈ 1231,36 €}.'],
];
const T = {}, FUMETTI = [[1.8, 6.4, 'Un prestito si restituisce a rate.\nCom’è fatta ogni rata?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0, 'Rata fissa: gli interessi calano\ncol debito, la quota capitale cresce.']);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.R, 'felice'], [T.R + 2.4, 'neutro'], [T.resta1, 'felice'], [T.resta1 + 2.4, 'neutro'],
  [T.ultimo, 'sorpreso'], [T.ultimo + 2.4, 'neutro'], [T.somma, 'festa'], [T.somma + 2.6, 'neutro'],
  [FINE + 2.3, 'felice'], [FINE + 6.8, 'occhiolino'],
];

// i numeri, ricontrollati con node: R esatta, poi interessi e quote capitale arrotondati al centesimo
const S = 10000, I_ = .04, N = 5, R = S * I_ / (1 - Math.pow(1 + I_, -N));   // 2246,2711…
const INT = [400.00, 326.15, 249.34, 169.47, 86.40], CAP = [1846.27, 1920.12, 1996.93, 2076.80, 2159.88];
const RESTA = [10000, 8153.73, 6233.61, 4236.68, 2159.88, 0];
const eur = v => { const s = v.toFixed(2).replace('.', ','); return v >= 10000 ? s.slice(0, -6) + ' ' + s.slice(-6) : s; };   // 10 000,00

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La rata che non cambia', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

function schede(ctx, t) {
  if (t < 7.5 || t > FINE + .3) return;
  card(ctx, 60, 110, 1120, 690, life(t, 7.5, FINE + .2, .6, .5));
  card(ctx, 1210, 110, 650, 690, life(t, T.simboli, FINE + .2, .5, .5));
}

// ---- il debito: una barra orizzontale di 1000 px (0,1 px per euro), mangiata da sinistra dalle quote capitale ----
const DX = 120, DW = 1000, DY = 172, DH = 60, PE = DW / S;
const CUM = [0]; CAP.forEach((q, k) => CUM.push(CUM[k] + q));
// quando si disegna la quota capitale k sulla barra del debito
const SEG = () => [[T.resta1 + .3, T.resta1 + 1.1], [T.cap2 + 1.3, T.cap2 + 2.1],
  [T.cresce + .6, T.cresce + 1.1], [T.cresce + 1.1, T.cresce + 1.6], [T.cresce + 1.6, T.cresce + 2.1]];
function sceneDebito(ctx, t) {
  if (t < T.prestito || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.prestito + .2, T.prestito + .8) * (1 - P(t, FINE - .5, FINE));
  const seg = SEG();
  txt(ctx, 'debito', DX, DY - 36, { size: 30, color: C.dim, align: 'left' });
  // la parte che resta da pagare
  ctx.fillStyle = css(C.v, .18); ctx.fillRect(DX, DY, DW, DH);
  ctx.strokeStyle = css(C.v); ctx.lineWidth = 3; ctx.strokeRect(DX, DY, DW, DH);
  // le quote capitale già pagate
  CAP.forEach((q, k) => {
    const kk = P(t, seg[k][0], seg[k][1], E.io); if (kk <= 0) return;
    const x0 = DX + CUM[k] * PE, w = q * PE * kk;
    ctx.fillStyle = C.paper; ctx.fillRect(x0, DY, w, DH);
    ctx.fillStyle = css(C.g, .25); ctx.fillRect(x0, DY, w, DH);
    ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.strokeRect(x0, DY, w, DH);
    txt(ctx, eur(q), x0 + q * PE / 2, DY + DH / 2, { size: 30, alpha: P(kk, .8, 1) });
  });
  // il debito che resta, scritto in mezzo alla parte viola
  for (let k = 0; k < 5; k++) {
    const dopo = k ? seg[k - 1][1] : T.prestito + .6, via = seg[k][0];
    const a = P(t, dopo, dopo + .3) * (1 - P(t, via, via + .2));
    if (a <= 0) continue;
    const x0 = DX + CUM[k] * PE;
    txt(ctx, (k ? eur(RESTA[k]) : '10 000') + ' €', (x0 + DX + DW) / 2, DY + DH / 2, { size: 30, color: C.ink, alpha: a });
  }
  // tutte le quote capitale insieme: 10 000 €
  const ks = life(t, T.somma + .3, FINE, .5, .4);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks; ctx.strokeStyle = css(C.g); ctx.lineWidth = 6;
    ctx.beginPath(); ctx.roundRect(DX - 7, DY - 7, DW + 14, DH + 14, 10); ctx.stroke(); ctx.restore();
    drawRich(ctx, '{g:quote capitale in tutto: 10 000 €}', DX + DW, DY - 36, { size: 32, align: 'right', alpha: ks });
  }
  ctx.restore();
}

// ---- le cinque rate: barre alte 440 px, quota interessi sopra (arancio) e quota capitale sotto (verde) ----
const BX = [200, 420, 640, 860, 1080], BB = 752, HR = 440, BW = 150, SC = HR / R, TOP = BB - HR;
const kI = (t, k) => k === 0 ? P(t, T.pezzi + .3, T.pezzi + .8) : k === 1 ? P(t, T.int2 + .3, T.int2 + .8) : P(t, T.calano + .3 + .45 * (k - 2), T.calano + .8 + .45 * (k - 2));
const kQ = (t, k) => k === 0 ? P(t, T.pezzi + .3, T.pezzi + .8) : k === 1 ? P(t, T.cap2 + .3, T.cap2 + .8) : P(t, T.cresce + .2 + .2 * (k - 2), T.cresce + .6 + .2 * (k - 2));
const labI = (t, k) => k === 0 ? P(t, T.int1 + .3, T.int1 + .7) : kI(t, k);
const labQ = (t, k) => k === 0 ? P(t, T.cap1 + .3, T.cap1 + .7) : kQ(t, k);
function cornice(ctx, x, y, w, h, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = 5;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 8); ctx.stroke(); ctx.restore();
}
function sceneRate(ctx, t) {
  if (t < T.uguali || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .5, FINE);
  BX.forEach((x, k) => {
    const ko = P(t, T.uguali + .3 + .25 * k, T.uguali + .7 + .25 * k);
    if (ko <= 0) return;
    // la sagoma della rata, tratteggiata
    ctx.save(); ctx.globalAlpha *= ko * (1 - kQ(t, k)); ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
    ctx.strokeRect(x - BW / 2, TOP, BW, HR); ctx.restore();
    txt(ctx, 'anno ' + (k + 1), x, BB + 24, { size: 30, color: C.dim, alpha: ko });
    const hI = (k === 4 ? R - CAP[4] : INT[k]) * SC, yQ = TOP + hI;   // la quinta: l'interesse esatto, ≈ 86,40
    const ai = kI(t, k), aq = kQ(t, k);
    if (ai > 0) {
      ctx.save(); ctx.globalAlpha *= ai;
      ctx.fillStyle = css(C.y, .3); ctx.fillRect(x - BW / 2, TOP, BW, hI);
      ctx.strokeStyle = css(C.y); ctx.lineWidth = 3; ctx.strokeRect(x - BW / 2, TOP, BW, hI);
      ctx.restore();
    }
    if (aq > 0) {
      ctx.save(); ctx.globalAlpha *= aq;
      ctx.fillStyle = css(C.g, .22); ctx.fillRect(x - BW / 2, yQ, BW, BB - yQ);
      ctx.strokeStyle = css(C.g); ctx.lineWidth = 3; ctx.strokeRect(x - BW / 2, yQ, BW, BB - yQ);
      ctx.restore();
    }
    txt(ctx, eur(INT[k]), x, TOP - 26, { size: 30, color: C.y, weight: 600, alpha: labI(t, k) });
    txt(ctx, eur(CAP[k]), x, (yQ + BB) / 2, { size: 30, alpha: labQ(t, k) });
    // l'ultimo anno, e alla fine tutti gli interessi
    if (k === 4) cornice(ctx, x - BW / 2 - 10, TOP - 50, BW + 20, hI + 60, C.y, life(t, T.ultimo + .3, T.somma, .4, .4));
    cornice(ctx, x - BW / 2 - 6, TOP - 6, BW + 12, hI + 12, C.y, life(t, T.tot + .3 + .1 * k, FINE, .4, .4));
  });
  // la rata è sempre la stessa: una riga sola sopra le cinque barre
  const kr = P(t, T.francese + .3, T.francese + 1.1);
  if (kr > 0) {
    ctx.save(); ctx.strokeStyle = css(C.v); ctx.lineWidth = 4; ctx.globalAlpha *= 1 - P(t, T.pezzi, T.pezzi + .5);
    ctx.beginPath(); ctx.moveTo(105, TOP); ctx.lineTo(lerp(105, 1165, kr), TOP); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// ---- la scheda a destra: i dati e la formula, poi l'anno 1 e l'anno 2, poi la tabella delle cinque rate ----
const XL = 1250, XR = 1820, XM = 1535;
function simbolo(ctx, s, nome, y, al) {
  if (al <= 0) return;
  drawRich(ctx, s, XL, y, { size: 44, align: 'left', alpha: al });
  txt(ctx, nome, XR, y, { size: 32, color: C.dim, align: 'right', alpha: al });
}
function riga(ctx, nome, y, al, col) { txt(ctx, nome, XL, y, { size: 32, color: col || C.dim, align: 'left', alpha: al }); }
function valore(ctx, s, y, col, al) { txt(ctx, s, XR, y, { size: 44, weight: 600, color: col, align: 'right', alpha: al }); }
function linea(ctx, y, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(XL, y); ctx.lineTo(XR, y); ctx.stroke(); ctx.restore();
}
function sceneScheda(ctx, t) {
  if (t < T.simboli || t > FINE + .1) return;
  ctx.save(); ctx.globalAlpha *= P(t, T.simboli, T.simboli + .5) * (1 - P(t, FINE - .5, FINE));
  // 1 · i dati e la formula della rata
  const kA = 1 - P(t, T.pezzi, T.pezzi + .4);
  if (kA > 0) {
    ctx.save(); ctx.globalAlpha *= kA;
    conFont(TITOLI, () => drawRich(ctx, 'i dati', XM, 168, { size: 40, weight: 600 }));
    simbolo(ctx, '{mink:S = 10 000} €', 'debito', 238, P(t, T.simboli + .3, T.simboli + .7));
    simbolo(ctx, '{mink:i = 4% = 0,04}', 'tasso annuo', 303, P(t, T.simboli + 1.3, T.simboli + 1.7));
    simbolo(ctx, '{mink:n = 5}', 'numero di rate', 368, P(t, T.simboli + 2.3, T.simboli + 2.7));
    linea(ctx, 418, P(t, T.formula, T.formula + .4));
    drawSeq(ctx, ['{mink:R =}', { num: '{mink:S · i}', den: '{mink:1 − (1 + i)⁻ⁿ}' }], XM, 530, 48, { local: t - T.formula - .3 });
    drawRich(ctx, '{mink:R ≈} {g:2246,27 €}', XM, 680, { size: 52, local: t - T.R - .3 });
    ctx.restore();
  }
  // 2 · dentro le prime due rate
  const kB = life(t, T.pezzi + .3, T.calano + .3, .4, .4);
  if (kB > 0) {
    ctx.save(); ctx.globalAlpha *= kB;
    const k2 = P(t, T.int2, T.int2 + .4), u = 1 - k2;   // passaggio dall'anno 1 all'anno 2
    conFont(TITOLI, () => {
      drawRich(ctx, 'anno 1', XM, 168, { size: 40, weight: 600, alpha: u });
      drawRich(ctx, 'anno 2', XM, 168, { size: 40, weight: 600, alpha: k2 });
    });
    riga(ctx, 'debito', 245, 1); riga(ctx, 'quota interessi', 320, 1, C.y); riga(ctx, 'quota capitale', 395, 1, C.g); riga(ctx, 'debito che resta', 470, 1);
    valore(ctx, '10 000,00 €', 245, C.v, u); valore(ctx, '8153,73 €', 245, C.v, k2);
    valore(ctx, '400,00 €', 320, C.y, P(t, T.int1 + .3, T.int1 + .7) * u); valore(ctx, '326,15 €', 320, C.y, P(t, T.int2 + .3, T.int2 + .7));
    valore(ctx, '1846,27 €', 395, C.g, P(t, T.cap1 + .3, T.cap1 + .7) * u); valore(ctx, '1920,12 €', 395, C.g, P(t, T.cap2 + .3, T.cap2 + .7));
    valore(ctx, '8153,73 €', 470, C.v, P(t, T.resta1 + 1.0, T.resta1 + 1.4) * u); valore(ctx, '6233,61 €', 470, C.v, P(t, T.cap2 + 2.0, T.cap2 + 2.4));
    linea(ctx, 520, 1);
    // il conto di ciascun passo
    const conto = (s, a, b, y) => drawRich(ctx, s, XM, y, { size: 40, local: t - a, alpha: 1 - P(t, b, b + .3) });
    if (t < T.cap1 + .3) conto('{mink:10 000 · 0,04 = 400}', T.int1 + .3, T.cap1, 590);
    else if (t < T.resta1 + .3) conto('{mink:2246,27 − 400 = 1846,27}', T.cap1 + .3, T.resta1, 590);
    else if (t < T.int2 + .3) conto('{mink:10 000 − 1846,27 = 8153,73}', T.resta1 + .3, T.int2, 590);
    else if (t < T.cap2 + .3) conto('{mink:8153,73 · 0,04 ≈ 326,15}', T.int2 + .3, T.cap2, 590);
    else {
      conto('{mink:2246,27 − 326,15 = 1920,12}', T.cap2 + .3, T.calano + 9, 590);
      conto('{mink:8153,73 − 1920,12 = 6233,61}', T.cap2 + 2.0, T.calano + 9, 660);
    }
    txt(ctx, 'rata ≈ 2246,27 €', XM, 740, { size: 36, color: C.dim });
    ctx.restore();
  }
  // 3 · la tabella delle cinque rate
  const kC = P(t, T.calano + .2, T.calano + .6);
  if (kC > 0) {
    ctx.save(); ctx.globalAlpha *= kC;
    const XA = 1290, XI = 1575, XQ = 1815;
    txt(ctx, 'anno', XA, 175, { size: 32, color: C.dim });
    txt(ctx, 'interessi', XI, 175, { size: 32, color: C.y, align: 'right' });
    txt(ctx, 'capitale', XQ, 175, { size: 32, color: C.g, align: 'right' });
    for (let k = 0; k < 5; k++) {
      const y = 240 + 58 * k;
      txt(ctx, String(k + 1), XA, y, { size: 40, color: C.dim });
      txt(ctx, eur(INT[k]), XI, y, { size: 40, color: C.y, align: 'right', alpha: k < 2 ? 1 : kI(t, k) });
      txt(ctx, eur(CAP[k]), XQ, y, { size: 40, color: C.g, align: 'right', alpha: k < 2 ? 1 : kQ(t, k) });
    }
    cornice(ctx, XI - 150, 240 + 58 * 4 - 28, 164, 56, C.y, life(t, T.ultimo + .3, T.somma, .4, .4));
    linea(ctx, 522, 1);
    txt(ctx, 'totale', XA - 50, 575, { size: 32, color: C.dim, align: 'left' });
    txt(ctx, '≈ 1231,36', XI, 575, { size: 40, weight: 600, color: C.y, align: 'right', alpha: P(t, T.tot + .3, T.tot + .7) });
    txt(ctx, '10 000,00', XQ, 575, { size: 40, weight: 600, color: C.g, align: 'right', alpha: P(t, T.somma + .3, T.somma + .7) });
    cornice(ctx, XQ - 232, 575 - 30, 246, 60, C.g, life(t, T.somma + .3, T.tot, .4, .4));
    txt(ctx, 'rata ≈ 2246,27 €', XM, 665, { size: 36 });
    txt(ctx, 'valori arrotondati al centesimo', XM, 735, { size: 30, color: C.dim });
    ctx.restore();
  }
  ctx.restore();
}

// ---- in una frase (FINE–DUR) ----
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, DUR - 2.4, DUR - 1.4);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'La rata resta {v:uguale}: gli {y:interessi}\ncalano, la {g:quota capitale} cresce.', W / 2, 290, { size: 70, weight: 600, local: t - FINE - .8, stagger: .09 });
  });
  const pills = [[470, 'rata costante', '≈ 2246,27 €', C.ink], [960, 'quota interessi', '400 € → ≈ 86,40 €', C.y], [1450, 'quote capitale', '10 000 € in tutto', C.g]];
  pills.forEach(([x, testa, s, col], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 220, 445, 440, 150);
    txt(ctx, testa, x, 486, { size: 32, color: C.dim });
    txt(ctx, s, x, 548, { size: 38, weight: 600, color: col });
    ctx.restore();
  });
  ctx.restore();
}

  // effetti sonori (strumenti/suoni-sintesi.py)
  const SUONI = [
    ['soffio', 1.5],
    ['soffio', 7.5], ['pop', T.prestito + .5, .5],                                              // il debito
    ['pop', T.uguali + .4, .4], ['pop', T.uguali + .65, .4], ['pop', T.uguali + .9, .4], ['pop', T.uguali + 1.15, .4], ['pop', T.uguali + 1.4, .4],
    ['traccia', T.francese + .3, T.francese + 1.1],                                             // la rata costante
    ['soffio', T.simboli], ['pop', T.simboli + .4, .5], ['pop', T.simboli + 1.4, .55], ['pop', T.simboli + 2.4, .6],
    ['pop', T.formula + .4, .5], ['ding', T.R + .4],                                           // la formula, R ≈ 2246,27 €
    ['soffio', T.pezzi + .3], ['pop', T.int1 + .4, .7], ['pop', T.cap1 + .4, .4],               // i due pezzi della prima rata
    ['tono', T.resta1 + .3, T.resta1 + 1.1, [.9, .75]],                                        // il debito scende
    ['soffio', T.int2], ['pop', T.int2 + .4, .62], ['pop', T.cap2 + .4, .45], ['tono', T.cap2 + 1.3, T.cap2 + 2.1, [.75, .6]],
    ['tono', T.calano + .3, T.calano + 2.1, [.55, .45, .35]],                                  // gli interessi calano
    ['tono', T.cresce + .2, T.cresce + 2.1, [.5, .6, .7]],                                     // le quote capitale crescono
    ['pop', T.ultimo + .4, .3],                                                                // ≈ 86,40 €
    ['traccia', T.somma + .3, T.somma + .9],                                                   // 10 000 €
    ['pop', T.tot + .4, .6],                                                                   // ≈ 1231,36 €
    ['soffio', FINE + .4], ['pop', FINE + 2.6, .5], ['pop', FINE + 3.1, .6], ['pop', FINE + 3.6, .7],
  ];
  return {
    titolo: 'La rata che non cambia', durata: DUR, copertina: 4.2, suoni: SUONI,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.pezzi - .2, 'il prestito'], [T.pezzi - .2, T.calano - .1, 'dentro la rata'], [T.calano - .1, FINE, 'anno dopo anno']],
    scena(ctx, t) { schede(ctx, t); sceneIntro(ctx, t); sceneDebito(ctx, t); sceneRate(ctx, t); sceneScheda(ctx, t); sceneFine(ctx, t); },
  };
});
