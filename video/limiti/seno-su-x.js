'use strict';
/* sin x / x → 1 — i numeri, poi triangolo, spicchio e triangolo sulla circonferenza goniometrica
   (sin x ≤ x ≤ tan x), i reciproci e i due carabinieri sul grafico. Argomento: limiti. */
CVIDEO.registra('limiti/seno-su-x', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, TITOLI, conFont, drawRich, txt, drawSeq, drawLim, fixedNum, fmtN,
    dot, glowStroke, hole, arrowHead, card } = M;

const POSA = { // x, y, s, sguardo (tempi del video)
  x: [[0, 760], [6.4, 760], [7.6, 190], [96.6, 190], [97.9, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [96.6, 1050], [97.9, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [96.6, 2.2], [97.9, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [96.6, 2], [97.9, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [96.6, -1.5], [97.9, -2]],
};
// le facce cambiano al massimo una volta ogni 2 s
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.45, 'pensa'], [6.4, 'neutro'],
  [8.4, 'sorpreso'], [10.4, 'neutro'], [17.7, 'felice'], [19.7, 'pensa'],
  [22.4, 'neutro'], [43.2, 'felice'], [45.2, 'neutro'], [54.1, 'sorpreso'], [56.1, 'neutro'],
  [63.8, 'pensa'], [66.2, 'neutro'], [78.7, 'pensa'], [81.2, 'neutro'],
  [84.4, 'festa'], [87.0, 'neutro'], [90.2, 'sorpreso'], [92.2, 'neutro'],
  [97.0, 'felice'], [99.0, 'neutro'], [102.6, 'felice'], [104.6, 'neutro'], [106.6, 'occhiolino'],
];
// tempi del video; la scena è scritta nei tempi «vecchi» e T() la ferma durante due pause
const FUMETTI = [
  [1.1, 6.4, 'Quanto fa sin {mx:x}{mink: / }{mx:x}\nquando {mx:x} tende a 0?'],
  // 1 · con i numeri
  [7.8, 12.6, 'Sostituendo esce {r:0/0}:\nil seno di 0 è 0.'],
  [12.65, 17.65, 'Provo con {mx:x} piccoli, in {v:radianti}:\n1, 0,5, 0,1, 0,01.'],
  [17.7, 22.2, 'Il rapporto si avvicina a {g:1}.\nMa perché?'],
  // 2 · sulla circonferenza
  [22.4, 27.8, 'Raggio 1, centro {mink:O}: un angolo {mx:x}\nfra 0 e {mink:π/2}.'],
  [27.9, 32.6, 'L\'arco da {mink:A} a {mink:B}\nè lungo proprio {mx:x}.'],
  [32.7, 37.7, 'Il {y:seno} è l\'altezza di {mink:B}\nsopra il raggio {mink:OA}.'],
  [37.8, 43.1, 'La {v:tangente} è il segmento {mink:AT}:\ntocca la circonferenza in {mink:A}.'],
  [43.2, 48.2, 'Tre figure, una dentro l\'altra:\ntriangolo, spicchio, triangolo.'],
  [48.3, 51.1, 'Le aree crescono in ordine.'],
  [51.2, 54.0, 'Moltiplico per 2:\nsin {mx:x}{mink: ≤ }{mx:x}{mink: ≤ }tan {mx:x}.'],
  [54.1, 59.1, 'Chiudo l\'angolo: le tre misure\ndiventano quasi {g:uguali}.'],
  [59.2, 63.7, 'Divido tutto per sin {mx:x},\nche è positivo.'],
  [63.8, 68.2, 'Passo ai reciproci:\ni versi si {v:girano}.'],
  // 3 · i due carabinieri
  [68.5, 72.9, 'Ecco il grafico di {y:sin }{mx:x}{my: / }{mx:x}.'],
  [73.0, 78.6, 'Vicino a 0 sta fra {v:cos }{mx:x}\ne {mg:y = 1}.'],
  // la parità prima della conclusione: si vede sui punti fermi a ±1,4, prima che convergano
  [78.7, 84.3, 'La funzione è {v:pari}: a sinistra\ndi 0 è lo stesso.'],
  [84.4, 90.1, 'I due carabinieri vanno a {g:1}:\nanche il rapporto va a {g:1}.'],
  [90.2, 96.2, 'In 0 non esiste: c\'è un {r:buco},\nma il limite è {g:1}.'],
  // chiusura
  [97.0, 102.4, 'Per angoli piccoli, in radianti,\nsin {mx:x} e {mx:x} quasi coincidono.'],
  [102.6, 107.4, 'Per questo sin {mx:x}{mink: / }{mx:x} va a {g:1}.'],
];
// le due pause: [istante della scena, durata]. Mentre la scena è ferma, Ada parla
const PAUSE = [[27.25, .6], [78.6, 5.2], [83.75, .6]];
function T(tn) {
  let acc = 0;
  for (const [a, d] of PAUSE) { if (tn < a + acc) return tn - acc; if (tn < a + acc + d) return a; acc += d; }
  return tn - acc;
}

const LC = [300, 110, 760, 690], RC = [1120, 110, 720, 690];
const SXX = 'sin {mx:x}{mink: / }{mx:x}';
// i nomi delle funzioni vanno dritti: nelle formule si scrivono col font di KaTeX non corsivo
const KM = '"KaTeX_Main", Cambria, Georgia, serif', fx = fn => conFont(KM, fn);

// ---------- 1 · i numeri ----------
const TAB = [[13.2, '1', '0,84147'], [14.4, '0,5', '0,95885'], [15.6, '0,1', '0,99833'], [16.8, '0,01', '0,99998']];
function sceneNumeri(ctx, t) {
  if (t < 7.5 || t > 22.6) return;
  const al = 1 - P(t, 21.9, 22.5);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LC, P(t, 7.6, 8.2));
  fx(() => drawSeq(ctx, [{ lim: '{mx:x}{mink:→0}' }, { num: 'sin {mx:x}', den: '{mx:x}' }], 680, 330, 84, { local: t - 7.9 }));
  drawRich(ctx, '{dim:sostituendo:}', 640, 590, { size: 44, align: 'right', local: t - 8.6 });
  fx(() => drawSeq(ctx, [{ num: 'sin {mink:0}', den: '{mink:0}' }, '{mink:=}', { num: '{mr:0}', den: '{mr:0}', bar: C.r }], 790, 590, 54, { local: t - 8.9 }));
  const tb = P(t, 12.8, 13.3);
  card(ctx, ...RC, tb);
  if (tb > 0) {
    ctx.save(); ctx.globalAlpha *= tb;
    drawRich(ctx, '{mx:x}', 1330, 190, { size: 42 });
    fx(() => drawRich(ctx, SXX, 1600, 190, { size: 42 }));
    ctx.strokeStyle = C.panelEdge; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(1170, 230); ctx.lineTo(1790, 230); ctx.moveTo(1450, 160); ctx.lineTo(1450, 520); ctx.stroke();
    TAB.forEach(([a, xv, r], i) => {
      const k = P(t, a - .1, a + .4, E.out); if (k <= 0) return;
      txt(ctx, xv, 1330, 285 + i * 60, { size: 42, color: C.x, alpha: k });
      txt(ctx, r, 1600, 285 + i * 60, { size: 42, color: C.y, alpha: k });
    });
    fx(() => drawRich(ctx, SXX + '{mink: → }{mg:1}', 1480, 650, { size: 56, local: t - 17.9 }));
    ctx.restore();
  }
  ctx.restore();
}

// ---------- 2 · la circonferenza ----------
const O = [390, 735], U = 420;
const S = (x, y) => [O[0] + x * U, O[1] - y * U];
const ang = t => kf(t, [[53.9, .9], [56.6, .3]]);
function arco(ctx, a0, a1, r, col, w) {
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(O[0], O[1], r * U, -a0, -a1, true); ctx.stroke(); ctx.restore();
}
function poligono(ctx, pts, col, a) {
  ctx.save(); ctx.fillStyle = css(col, a); ctx.beginPath();
  pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.restore();
}
function segmento(ctx, a, b, col, w, k = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function sceneCerchio(ctx, t) {
  if (t < 22 || t > 68.2) return;
  const al = 1 - P(t, 67.4, 68.1);
  ctx.save(); ctx.globalAlpha *= al;
  card(ctx, ...LC, P(t, 22.2, 22.8));
  const x = ang(t), c = Math.cos(x), s = Math.sin(x), tg = Math.tan(x);
  const A = S(1, 0), B = S(c, s), T = S(1, tg), H = S(c, 0);
  const lab = clamp((x - .55) / .15);   // le etichette lunghe spariscono quando l'angolo è piccolo
  // assi leggeri e quarto di circonferenza
  const k0 = P(t, 22.4, 23.4);
  ctx.save(); ctx.globalAlpha *= k0;
  ctx.strokeStyle = css(C.ink, .55); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(S(1.12, 0)[0], O[1]); ctx.moveTo(O[0], O[1]); ctx.lineTo(O[0], S(0, 1.08)[1]); ctx.stroke();
  ctx.restore();
  if (k0 > 0) arco(ctx, 0, Math.PI / 2 * k0, 1, C.dim, 3);
  // le tre figure (dal capitolo delle aree)
  const fT = P(t, 42.8, 43.4), fS = P(t, 43.6, 44.2), fP = P(t, 44.4, 45.0);
  if (fP > 0) poligono(ctx, [O, A, T], C.v, .13 * fP);
  if (fS > 0) { ctx.save(); ctx.fillStyle = css(C.x, .16 * fS); ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.arc(O[0], O[1], U, 0, -x, true); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if (fT > 0) poligono(ctx, [O, A, B], C.y, .22 * fT);
  // raggio OB e angolo
  const kr = P(t, 23.4, 24.2);
  segmento(ctx, O, B, C.ink, 4, kr);
  segmento(ctx, O, A, C.ink, 4, kr);
  if (kr > 0) {
    arco(ctx, 0, x * kr, .16, C.x, 4);
    drawRich(ctx, '{mx:x}', S(.25 * Math.cos(x / 2), .25 * Math.sin(x / 2))[0] + 6, S(.25 * Math.cos(x / 2), .25 * Math.sin(x / 2))[1], { size: 40, alpha: kr * clamp((x - .45) / .1) });
  }
  // l'arco AB, lungo x
  const ka = P(t, 27.5, 28.6);
  if (ka > 0) {
    arco(ctx, 0, x * ka, 1, C.x, 9);
    const m = S(.86 * Math.cos(x * .55), .86 * Math.sin(x * .55));
    drawRich(ctx, '{mx:x}', m[0], m[1], { size: 44, alpha: P(t, 28.4, 28.9) * lab });
  }
  // il seno
  const ks = P(t, 32.3, 33.2);
  if (ks > 0) {
    segmento(ctx, H, B, C.y, 8, ks);
    fx(() => drawRich(ctx, '{y:sin }{mx:x}', H[0] - 14, lerp(H[1], B[1], .45), { size: 36, align: 'right', alpha: P(t, 33.0, 33.5) * lab }));
  }
  // la tangente
  const kt = P(t, 37.4, 38.4);
  if (kt > 0) {
    ctx.save(); ctx.globalAlpha *= .6 * kt; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(A[0], S(0, 1.32)[1]); ctx.stroke(); ctx.restore();
    segmento(ctx, B, T, C.dim, 2.5, kt);
    segmento(ctx, A, T, C.v, 8, kt);
    dot(ctx, T, C.v, kt, 9);
    fx(() => drawRich(ctx, '{v:tan }{mx:x}', A[0] + 18, lerp(A[1], T[1], .5), { size: 36, align: 'left', alpha: P(t, 38.2, 38.7) * lab }));
    drawRich(ctx, '{mink:T}', T[0] + 22, T[1] - 6, { size: 38, align: 'left', alpha: kt * lab });
  }
  // i punti O, A, B
  dot(ctx, O, C.ink, k0, 8); dot(ctx, A, C.ink, k0, 8); dot(ctx, B, C.ink, kr, 9);
  drawRich(ctx, '{mink:O}', O[0] - 34, O[1] + 34, { size: 38, alpha: k0 });
  const kAB = P(t, 27.3, 27.7);   // A e B si vedono quando Ada li nomina
  drawRich(ctx, '{mink:A}', A[0] + 34, A[1] + 34, { size: 38, alpha: k0 * kAB });
  // B fuori dalla circonferenza, sul prolungamento del raggio
  // in diagonale fra la circonferenza e la retta BT, così nessuna delle due la attraversa
  const dB = [(c - s) / Math.SQRT2, (s + c) / Math.SQRT2];
  drawRich(ctx, '{mink:B}', B[0] + 50 * dB[0], B[1] - 50 * dB[1], { size: 38, alpha: kr * kAB * lab });

  // la scheda di destra
  const pa = life(t, 27.5, 67.9, .5, .5);
  card(ctx, ...RC, pa);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    // fase 0: i tre pezzi, man mano che Ada li nomina
    const f0 = 1 - P(t, 42.3, 42.7);
    if (f0 > 0) {
      ctx.save(); ctx.globalAlpha *= f0;
      conFont(TITOLI, () => drawRich(ctx, 'tre misure', 1480, 180, { size: 40, weight: 600 }));
      [[27.7, '{x:arco} {mink:AB}', '{mx:x}'], [32.4, '{y:seno}', 'sin {mx:x}'], [37.5, '{v:tangente} {mink:AT}', 'tan {mx:x}']].forEach(([a, nome, mis], i) => {
        const k = P(t, a, a + .5, E.out); if (k <= 0) return;
        drawRich(ctx, nome, 1170, 290 + i * 100, { size: 42, align: 'left', alpha: k });
        fx(() => drawRich(ctx, mis, 1790, 290 + i * 100, { size: 46, align: 'right', alpha: k }));
      });
      ctx.restore();
    }
    // fase A: le aree, poi le misure
    const fa = P(t, 42.6, 43.0) * (1 - P(t, 58.4, 58.9));
    if (fa > 0) {
      ctx.save(); ctx.globalAlpha *= fa;
      const nums = P(t, 53.7, 54.2);   // dalle formule delle aree ai numeri
      conFont(TITOLI, () => {
        drawRich(ctx, 'le aree', 1480, 180, { size: 40, weight: 600, alpha: 1 - nums });
        drawRich(ctx, 'le misure', 1480, 180, { size: 40, weight: 600, alpha: nums });
      });
      const R = [
        [43.0, '{y:triangolo} {mink:OAB}', '{mink:½ }sin {mx:x}', 'sin {mx:x}{mink: =}', s],
        [43.8, '{x:spicchio}', '{mink:½ }{mx:x}', '{mx:x}{mink: =}', x],
        [44.6, '{v:triangolo} {mink:OAT}', '{mink:½ }tan {mx:x}', 'tan {mx:x}{mink: =}', tg],
      ];
      R.forEach(([a, nome, area, lbl, v], i) => {
        const k = P(t, a, a + .5, E.out); if (k <= 0) return;
        const y = 270 + i * 72;
        drawRich(ctx, nome, 1170, y, { size: 40, align: 'left', alpha: k * (1 - nums) });
        fx(() => drawRich(ctx, area, 1790, y, { size: 42, align: 'right', alpha: P(t, 47.8 + i * .3, 48.3 + i * .3) * (1 - nums) }));
        if (nums > 0) {
          fx(() => drawRich(ctx, lbl, 1170, y, { size: 44, align: 'left', alpha: nums }));
          fixedNum(ctx, fmtN(v, 3), 1790, y, 46, [C.y, C.x, C.v][i], nums);
        }
      });
      fx(() => drawRich(ctx, '{mink:½ }sin {mx:x}{mink: ≤ ½ }{mx:x}{mink: ≤ ½ }tan {mx:x}', 1480, 510, { size: 44, local: t - 48.9, alpha: 1 - P(t, 53.6, 54.1) }));
      // il passaggio «· 2» si vede, col fumetto che lo dice (scena 50,6 = video 51,2)
      fx(() => drawRich(ctx, '{dim:↓ }{mink: · 2}', 1480, 575, { size: 38, alpha: P(t, 50.6, 51.0) * (1 - P(t, 53.6, 54.1)) }));
      fx(() => drawRich(ctx, 'sin {mx:x}{mink: ≤ }{mx:x}{mink: ≤ }tan {mx:x}', 1480, 640, { size: 52, local: t - 50.8 }));
      ctx.restore();
    }
    // fase B: la catena di disuguaglianze
    const fb = P(t, 58.6, 59.1);
    if (fb > 0) {
      ctx.save(); ctx.globalAlpha *= fb;
      fx(() => drawRich(ctx, 'sin {mx:x}{mink: ≤ }{mx:x}{mink: ≤ }tan {mx:x}', 1480, 220, { size: 50 }));
      fx(() => drawSeq(ctx, ['{mink:1 ≤}', { num: '{mx:x}', den: 'sin {mx:x}' }, '{mink:≤}', { num: '{mink:1}', den: 'cos {mx:x}' }], 1480, 390, 48, { local: t - 59.0 }));
      fx(() => drawSeq(ctx, ['cos {mx:x}{mink: ≤}', { num: '{y:sin }{mx:x}', den: '{mx:x}' }, '{mink:≤ 1}'], 1480, 590, 52, { local: t - 63.6 }));
      ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
}

// ---------- 3 · il grafico e i due carabinieri ----------
const G = { ox: 680, oy: 600, ux: 88, uy: 330, x0: -3.75, x1: 3.75, y0: -.4, y1: 1.25 };
const GS = (x, y) => [G.ox + x * G.ux, G.oy - y * G.uy];
const sx = x => Math.abs(x) < 1e-9 ? 1 : Math.sin(x) / x;
const CURVA = []; for (let i = 0; i <= 400; i++) { const x = lerp(G.x0 + .1, G.x1 - .1, i / 400); CURVA.push(GS(x, sx(x))); }
const COS = []; for (let i = 0; i <= 100; i++) { const x = lerp(-1.45, 1.45, i / 100); COS.push(GS(x, Math.cos(x))); }
function assiG(ctx, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k;
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1.5;
  for (const xv of [-Math.PI, Math.PI]) { ctx.beginPath(); ctx.moveTo(GS(xv, 0)[0], GS(0, G.y1)[1]); ctx.lineTo(GS(xv, 0)[0], GS(0, G.y0)[1]); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(GS(G.x0, 1)[0], GS(0, 1)[1]); ctx.lineTo(GS(G.x1, 1)[0], GS(0, 1)[1]); ctx.stroke();
  ctx.strokeStyle = css(C.ink, .8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(GS(G.x0, 0)[0], G.oy); ctx.lineTo(GS(G.x1 + .15, 0)[0], G.oy); ctx.moveTo(G.ox, GS(0, G.y0)[1]); ctx.lineTo(G.ox, GS(0, G.y1 + .05)[1]); ctx.stroke();
  arrowHead(ctx, [GS(G.x1 + .15, 0)[0] + 6, G.oy], 0, C.ink);
  arrowHead(ctx, [G.ox, GS(0, G.y1 + .05)[1] - 6], -Math.PI / 2, C.ink);
  txt(ctx, 'π', GS(Math.PI, 0)[0], G.oy + 32, { size: 30, color: C.dim });
  txt(ctx, '−π', GS(-Math.PI, 0)[0], G.oy + 32, { size: 30, color: C.dim });
  txt(ctx, '1', G.ox - 22, GS(0, 1)[1] - 24, { size: 30, color: C.dim, align: 'right' });
  drawRich(ctx, '{mx:x}', GS(G.x1 + .15, 0)[0] - 4, G.oy - 38, { size: 44 });
  ctx.restore();
}
function sceneGrafico(ctx, t) {
  if (t < 67.5 || t > 90.8) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 90.0, 90.7);
  card(ctx, ...LC, P(t, 67.7, 68.3));
  assiG(ctx, P(t, 67.9, 68.8));
  // i due carabinieri
  const kc = P(t, 72.6, 73.6);
  if (kc > 0) {
    glowStroke(ctx, COS, kc, C.v, 5);
    ctx.save(); ctx.strokeStyle = css(C.g); ctx.lineWidth = 5; ctx.setLineDash([14, 10]);
    ctx.beginPath(); ctx.moveTo(GS(-1.45, 1)[0], GS(0, 1)[1]); ctx.lineTo(lerp(GS(-1.45, 1)[0], GS(1.45, 1)[0], kc), GS(0, 1)[1]); ctx.stroke(); ctx.restore();
    fx(() => drawRich(ctx, '{v:cos }{mx:x}', GS(1.45, 0)[0] + 10, GS(0, .16)[1], { size: 34, align: 'left', alpha: P(t, 73.4, 73.9) }));
    drawRich(ctx, '{mg:y = 1}', GS(1.5, 1)[0] + 16, GS(0, 1)[1] - 28, { size: 36, align: 'left', alpha: P(t, 73.4, 73.9) });
  }
  glowStroke(ctx, CURVA, P(t, 68.4, 70.4), C.y, 6);
  if (t > 70.2) fx(() => drawRich(ctx, '{y:sin }{mx:x}{my: / }{mx:x}', GS(-3.7, .8)[0], GS(-3.7, .8)[1], { size: 38, align: 'left', local: t - 70.2 }));
  // i tre punti che scortano verso 0, da tutte e due le parti
  const ke = life(t, 78.2, 83.7, .4, .5);
  if (ke > 0) {
    const xe = kf(t, [[78.7, 1.4], [83.1, .25]]);
    ctx.save(); ctx.globalAlpha *= ke;
    for (const sg of [-1, 1]) {
      const xx = sg * xe;
      dot(ctx, GS(xx, Math.cos(xx)), C.v, 1, 9);
      dot(ctx, GS(xx, 1), C.g, 1, 9);
      dot(ctx, GS(xx, sx(xx)), C.y, 1, 10);
    }
    ctx.restore();
  }
  // il buco in (0; 1)
  const hp = t > 84.0 && t < 88.5 ? 1 + .25 * Math.max(0, Math.sin((t - 84.0) * 5)) : 1;
  hole(ctx, GS(0, 1), C.r, P(t, 70.0, 70.4, E.back) * hp, 12);

  // la scheda
  const pa = life(t, 67.7, 90.4, .5, .5);
  card(ctx, ...RC, pa);
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha *= pa;
    fx(() => drawSeq(ctx, ['{v:cos }{mx:x}{mink: ≤}', { num: '{y:sin }{mx:x}', den: '{mx:x}' }, '{mink:≤ }{mg:1}'], 1480, 230, 52));
    drawRich(ctx, '{dim:vicino a 0}', 1480, 330, { size: 32, local: t - 72.8 });
    fx(() => drawRich(ctx, '{v:cos }{mx:x}{mink: → }{mg:1}', 1480, 440, { size: 48, local: t - 78.7 }));
    fx(() => drawLim(ctx, '{mx:x}{mink:→0}', '{y:sin }{mx:x}{my: / }{mx:x}{mink: = }{mg:1}', 1480, 590, { size: 58, local: t - 82.0 }));
    ctx.restore();
  }
  ctx.restore();
}

// 0 · titolo
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  conFont(TITOLI, () => drawRich(ctx, 'Il limite di ' + SXX, W / 2, 180, { size: 116, weight: 600, local: t - 1.6, stagger: .15, alpha: 1 - P(t, 6.2, 7.0) }));
}

// 4 · in una frase
function sceneFine(ctx, t) {
  if (t < 90.4) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, 102.2, 103.2);
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 90.8 });
    drawRich(ctx, 'Per {mx:x} vicino a 0, in radianti,\nsin {mx:x} è quasi uguale a {mx:x}.', W / 2, 290, { size: 62, weight: 600, local: t - 91.2, stagger: .09 });
  });
  fx(() => drawLim(ctx, '{mx:x}{mink:→0}', '{y:sin }{mx:x}{my: / }{mx:x}{mink: = }{mg:1}', W / 2, 455, { size: 64, local: t - 92.8 }));
  const pills = [[470, '{y:seno} ≤ {x:arco} ≤ {v:tangente}'], [960, 'i {g:due carabinieri}'], [1450, '{mx:x} in {v:radianti}']];
  pills.forEach(([x, s], i) => {
    const a = 93.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 612); ctx.scale(k, k); ctx.translate(-x, -612);
    card(ctx, x - 225, 562, 450, 100);
    drawRich(ctx, s, x, 614, { size: 32, weight: 400 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Il limite di sin x / x', durata: 110, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [107.9, 108.9] },
    capitoli: [[7.5, 22.2, 'con i numeri'], [22.2, 68.3, 'sulla circonferenza'], [68.3, 96.4, 'i due carabinieri']],
    scena(ctx, tn) { const t = T(tn); sceneIntro(ctx, t); sceneNumeri(ctx, t); sceneCerchio(ctx, t); sceneGrafico(ctx, t); sceneFine(ctx, t); },
  };
});
