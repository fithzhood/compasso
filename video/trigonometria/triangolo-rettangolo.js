'use strict';
/* Seno, coseno e tangente nel triangolo — il triangolo con ipotenusa 1 ha cateti sin α e cos α; ingrandito c volte
   dà a = c · sin α, b = c · cos α, e dividendo a = b · tan α. Poi la scala del sito: 5 m a 60°, h ≈ 4,33 m, piede 2,5 m.
   Lettere come il sito: c ipotenusa, a opposto ad α, b adiacente. Argomento: trigonometria. */
CVIDEO.registra('trigonometria/triangolo-rettangolo', M => {
  const { W, C, E, P, life, kf, clamp, lerp, css, mix, TITOLI, conFont, drawRich, richW, card } = M;

// i fumetti in fila: [chiave, durata, testo, pausa prima]; le animazioni partono dalle chiavi
const SEQ = [
  // 1 · i nomi
  ['tri', 4.3, 'Un triangolo rettangolo: di fronte\nall’angolo retto c’è l’ipotenusa {mink:c}.'],
  ['alfa', 3.2, 'Guardo l’angolo acuto {mv:α} (alfa).'],
  ['opp', 4.6, 'Il cateto {my:a} sta di fronte ad {mv:α}:\nè il cateto {y:opposto}.'],
  ['adi', 4.4, 'Il cateto {mx:b} forma {mv:α} con l’ipotenusa:\nè il cateto {x:adiacente}.'],
  // 2 · ipotenusa 1
  ['uno', 4.7, 'Disegno dentro un triangolo con\nlo stesso {mv:α} e l’ipotenusa lunga 1.'],
  ['sin', 4.6, 'Seno: cateto opposto diviso ipotenusa.\nCon ipotenusa 1, l’opposto è {my:sin α}.'],
  ['cos', 3.4, 'Allo stesso modo l’adiacente\nè {mx:cos α}.'],
  // 3 · ingrandito c volte
  ['ingr', 5.0, 'Lo ingrandisco fino al triangolo\ngrande: ogni lato si moltiplica per {mink:c}.'],
  ['aopp', 3.4, 'Il cateto opposto diventa\n{my:a}{mink: = c · }{my:sin α}.'],
  ['badi', 3.2, 'E l’adiacente diventa\n{mx:b}{mink: = c · }{mx:cos α}.'],
  ['reg1', 4.1, 'Un cateto è l’ipotenusa per il seno\ndell’angolo {y:opposto}…'],
  ['reg2', 3.4, '…o per il coseno\ndell’angolo {x:adiacente}.'],
  // 4 · la tangente
  ['div', 3.9, 'Divido {my:a} per {mx:b}: la {mr:c} si semplifica.'],
  ['tan', 3.4, 'Seno diviso coseno è la {v:tangente}.'],
  ['per', 3.4, 'Moltiplico per {mx:b}:\n{my:a}{mink: = }{mx:b}{mink: · }{mv:tan α}.'],
  ['reg3', 4.4, 'Un cateto è l’altro cateto per\nla tangente dell’angolo {y:opposto}.'],
  // 5 · l'altro angolo
  ['beta', 3.4, 'L’altro angolo acuto è {mink:β} (beta).'],
  ['bad', 4.6, 'Per {mink:β} lo stesso cateto {my:a} è adiacente:\n{my:a}{mink: = c · cos β}.'],
  // 6 · la scala
  ['scala', 5.4, 'Ora il triangolo è una scala lunga\n5 m, appoggiata a un muro, a 60°.', 2.4],   // la figura cambia nella pausa
  ['alt', 4.6, 'L’altezza {my:h} sul muro è opposta a 60°:\n{my:h}{mink: = 5 · sin }60°{mink: ≈ 4,33} m.'],
  ['piede', 3.8, 'Il piede dista dal muro\n{mink:5 · cos }60°{mink: = 2,5} m.'],
];
const T = {}, FUMETTI = [[2.3, 6.6, 'Quanto è lungo un cateto, se conosci\nl’ipotenusa e un angolo?']];
let tt = 7.9;
for (const [k, d, s, pausa = 0] of SEQ) { tt = +(tt + pausa).toFixed(2); T[k] = tt; FUMETTI.push([tt, +(tt + d).toFixed(2), s]); tt = +(tt + d + .1).toFixed(2); }
const FINE = +(tt + .3).toFixed(2), DUR = +(FINE + 10.8).toFixed(1);
FUMETTI.push([FINE + 1.0, FINE + 8.0,'Ipotenusa per il seno dell’opposto,\no per il coseno dell’adiacente.']);
// il triangolo diventa la scala nella pausa prima del fumetto, e poi sta fermo: tutto finisce a TS + 2.4
const TS = +(T.scala - 2.5).toFixed(2);

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [FINE, 190], [FINE + 1.3, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [FINE, 1050], [FINE + 1.3, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [FINE, 2.2], [FINE + 1.3, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [FINE, 2], [FINE + 1.3, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [FINE, -1.5], [FINE + 1.3, -2]],
};
const FACCIA = [ // mai due cambi in meno di 2 s (tranne l'accensione)
  [0, 'neutro'], [1.45, 'sorpreso'], [2.0, 'pensa'], [7.9, 'neutro'],
  [T.sin, 'felice'], [T.sin + 2.2, 'neutro'], [T.ingr, 'sorpreso'], [T.ingr + 2.2, 'neutro'],
  [T.reg1, 'felice'], [T.reg1 + 2.4, 'neutro'], [T.per, 'festa'], [T.per + 2.4, 'neutro'],
  [T.bad, 'sorpreso'], [T.bad + 2.2, 'neutro'], [T.alt, 'pensa'], [T.piede, 'felice'], [T.piede + 2.2, 'neutro'],
  [FINE + 4.5, 'occhiolino'], [FINE + 6.6, 'felice'],
];

const RAD = Math.PI / 180, YB = 700;
// il triangolo: A con l'angolo α in basso a sinistra, B con l'angolo retto, C in alto; alla fine diventa la scala
function geo(t) {
  const m = P(t, TS + .4, TS + 1.8, E.io);
  const ax = lerp(150, 380, m), c = lerp(760, 600, m), al = lerp(35, 60, m);
  const A = [ax, YB], B = [ax + c * Math.cos(al * RAD), YB], Cv = [B[0], YB - c * Math.sin(al * RAD)];
  return { A, B, Cv, c, al, m };
}
function seg(ctx, a, b, col, w = 4, k = 1, al = 1) {
  if (k <= 0 || al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); ctx.stroke(); ctx.restore();
}
function poli(ctx, pts, col, al) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = css(col);
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.restore();
}
// arco d'angolo nel vertice V, da a0 ad a1 (radianti della tela), con lo spicchio appena colorato
function arco(ctx, V, r, a0, a1, col, al, w = 4) {
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al;
  ctx.beginPath(); ctx.moveTo(V[0], V[1]); ctx.arc(V[0], V[1], r, a0, a1, a1 < a0); ctx.closePath();
  ctx.fillStyle = css(col, .16); ctx.fill();
  ctx.beginPath(); ctx.arc(V[0], V[1], r, a0, a1, a1 < a0); ctx.strokeStyle = css(col); ctx.lineWidth = w; ctx.stroke();
  ctx.restore();
}
function retto(ctx, V, al, l = 26) {   // angolo retto in B: verso sinistra e verso l'alto
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = css(C.ink, .85); ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(V[0] - l, V[1]); ctx.lineTo(V[0] - l, V[1] - l); ctx.lineTo(V[0], V[1] - l); ctx.stroke(); ctx.restore();
}
const lab = (ctx, s, p, al, size = 44, align = 'center') => { if (al > 0) drawRich(ctx, s, p[0], p[1], { size, alpha: al, align }); };
// punto a distanza d dalla metà di PQ, dalla parte in alto a sinistra (fuori dal triangolo)
function fuori(Pp, Q, d) {
  const mx = (Pp[0] + Q[0]) / 2, my = (Pp[1] + Q[1]) / 2, dx = Q[0] - Pp[0], dy = Q[1] - Pp[1], L = Math.hypot(dx, dy);
  return [mx + dy / L * d, my - dx / L * d];
}

// 0 · apertura (0–7.5)
function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'Seno, coseno e tangente\nnel triangolo', W / 2, 215, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al, lh: 1.15 }));
}

// 1–6 · la figura (7.5–FINE)
function sceneFigura(ctx, t) {
  if (t < 7.5 || t > FINE + .2) return;
  ctx.save(); ctx.globalAlpha *= 1 - P(t, FINE - .6, FINE + .1);
  card(ctx, 70, 110, 930, 690, P(t, 7.5, 8.2));
  const { A, B, Cv, c, al, m } = geo(t);
  const via = 1 - P(t, TS, TS + .4);           // quello che esce prima che il triangolo cambi forma
  const kScala = P(t, TS + 1.8, TS + 2.3);      // il muro, il pavimento, la scala
  // muro e pavimento, dietro a tutto
  if (kScala > 0) {
    ctx.save(); ctx.globalAlpha *= kScala; ctx.strokeStyle = css(C.dim); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(B[0], YB + 30); ctx.lineTo(B[0], 150); ctx.moveTo(250, YB); ctx.lineTo(B[0] + 60, YB); ctx.stroke();
    ctx.lineWidth = 2;
    for (let y = 170; y <= YB; y += 34) { ctx.beginPath(); ctx.moveTo(B[0], y); ctx.lineTo(B[0] + 20, y - 20); ctx.stroke(); }
    for (let x = 270; x <= B[0] + 40; x += 34) { ctx.beginPath(); ctx.moveTo(x, YB); ctx.lineTo(x - 20, YB + 20); ctx.stroke(); }
    ctx.restore();
  }
  // il triangolo grande
  const kd = [P(t, 7.9, 8.5), P(t, 8.4, 9.0), P(t, 8.9, 9.6)];
  poli(ctx, [A, B, Cv], C.v, .06 * kd[2]);
  const kOpp = P(t, T.opp + .2, T.opp + .6), kAdi = P(t, T.adi + .2, T.adi + .6);
  const kH = P(t, T.alt + .2, T.alt + .6), kPi = P(t, T.piede + .2, T.piede + .6);
  seg(ctx, A, B, mix(C.ink, C.x, Math.max(kAdi * via, kPi)), 4 + 2 * Math.max(kAdi * via, kPi), kd[0]);
  seg(ctx, B, Cv, mix(C.ink, C.y, Math.max(kOpp * via, kH)), 4 + 2 * Math.max(kOpp * via, kH), kd[1]);
  seg(ctx, A, Cv, C.ink, 5, kd[2], 1 - kScala);
  if (kScala > 0) {   // l'ipotenusa diventa una scala a pioli
    const dx = Cv[0] - A[0], dy = Cv[1] - A[1], L = Math.hypot(dx, dy), nx = -dy / L * 9, ny = dx / L * 9;
    ctx.save(); ctx.globalAlpha *= kScala; ctx.strokeStyle = css(C.ink); ctx.lineWidth = 4; ctx.lineCap = 'round';
    const u0 = 12 / L, u1 = 1 - 16 / L, Pa = [A[0] + dx * u0, A[1] + dy * u0], Pc = [A[0] + dx * u1, A[1] + dy * u1];
    ctx.beginPath(); ctx.moveTo(Pa[0] + nx, Pa[1] + ny); ctx.lineTo(Pc[0] + nx, Pc[1] + ny); ctx.moveTo(Pa[0] - nx, Pa[1] - ny); ctx.lineTo(Pc[0] - nx, Pc[1] - ny); ctx.stroke();
    ctx.lineWidth = 3;
    for (let s = 40; s < L - 30; s += 48) { const x = A[0] + dx * s / L, y = A[1] + dy * s / L; ctx.beginPath(); ctx.moveTo(x + nx, y + ny); ctx.lineTo(x - nx, y - ny); ctx.stroke(); }
    ctx.restore();
  }
  retto(ctx, B, P(t, 9.4, 9.8));
  // l'angolo α in A, l'angolo β in C
  arco(ctx, A, 95, 0, -al * RAD, C.v, P(t, T.alfa + .2, T.alfa + .6));
  lab(ctx, '{mv:α}', [A[0] + 140 * Math.cos(al / 2 * RAD), YB - 140 * Math.sin(al / 2 * RAD)], P(t, T.alfa + .4, T.alfa + .8) * (1 - P(t, TS + .1, TS + .4)));
  lab(ctx, '{v:60°}', [A[0] + 150 * Math.cos(al / 2 * RAD), YB - 150 * Math.sin(al / 2 * RAD)], kScala);
  const kB = P(t, T.beta + .2, T.beta + .6) * via;
  arco(ctx, Cv, 80, Math.PI / 2, Math.PI - al * RAD, C.ink, kB, 3);
  lab(ctx, '{mink:β}', [Cv[0] + 125 * Math.cos((Math.PI * 1.5 - al * RAD) / 2), Cv[1] + 125 * Math.sin((Math.PI * 1.5 - al * RAD) / 2)], kB);
  // i nomi dei lati
  lab(ctx, '{mink:c}', fuori(A, Cv, 42), P(t, T.tri + .9, T.tri + 1.3) * via);
  lab(ctx, '{my:a}', [B[0] + 30, (B[1] + Cv[1]) / 2], kOpp * via, 46, 'left');
  lab(ctx, '{mx:b}', [(A[0] + B[0]) / 2, YB + 46], kAdi * via, 46);
  // la scala: 5 m, l'altezza h, il piede
  lab(ctx, '{ink:5 m}', fuori(A, Cv, 66), kScala, 44);
  lab(ctx, '{my:h}', [B[0] + 58, (B[1] + Cv[1]) / 2], kH, 46, 'left');
  lab(ctx, '{x:2,5 m}', [(A[0] + B[0]) / 2, YB + 50], kPi, 44);

  // il triangolo con ipotenusa 1, dentro: poi si ingrandisce fino al grande
  if (t > T.uno && t < T.ingr + 2.7) {
    const s = kf(t, [[T.ingr + .6, 300], [T.ingr + 2.6, c]]);
    const B1 = [A[0] + s * Math.cos(al * RAD), YB], C1 = [B1[0], YB - s * Math.sin(al * RAD)];
    const kd1 = P(t, T.uno + .2, T.uno + 1.4);
    const kSin = P(t, T.sin + .3, T.sin + .7), kCos = P(t, T.cos + .2, T.cos + .6);
    const lbl = 1 - P(t, T.ingr + .1, T.ingr + .5);
    poli(ctx, [A, B1, C1], C.v, .12 * kd1 * (1 - P(t, T.ingr + 2.0, T.ingr + 2.6)));
    seg(ctx, A, C1, C.ink, 5, kd1);
    seg(ctx, B1, C1, mix(C.ink, C.y, kSin), 4 + 2 * kSin, kd1);
    seg(ctx, A, B1, mix(C.ink, C.x, kCos), 4 + 2 * kCos, kd1);
    retto(ctx, B1, P(t, T.uno + 1.2, T.uno + 1.5) * lbl, 20);
    lab(ctx, '{mink:1}', fuori(A, C1, 34), P(t, T.uno + 1.3, T.uno + 1.7) * lbl, 42);
    lab(ctx, '{my:sin α}', [B1[0] + 16, (B1[1] + C1[1]) / 2], kSin * lbl, 40, 'left');
    lab(ctx, '{mx:cos α}', [(A[0] + B1[0]) / 2, YB + 44], kCos * lbl, 40);
  }
  ctx.restore();
}

// frazione centrata in cx
function frazione(ctx, num, den, cx, cy, size, al) {
  if (al <= 0) return;
  const w = Math.max(richW(ctx, num, size), richW(ctx, den, size)) + size * .35;
  ctx.save(); ctx.globalAlpha *= al;
  drawRich(ctx, num, cx, cy - size * .6, { size }); drawRich(ctx, den, cx, cy + size * .66, { size });
  ctx.strokeStyle = css(C.ink); ctx.lineWidth = Math.max(2, size * .055); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx - w / 2 + size * .08, cy + size * .04); ctx.lineTo(cx + w / 2 - size * .08, cy + size * .04); ctx.stroke();
  ctx.restore();
}
const XP = 1450;
// la scheda a destra: le formule; poi i conti della scala
function scenePannello(ctx, t) {
  if (t < T.sin || t > FINE + .2) return;
  const fuoriScala = 1 - P(t, TS, TS + .4);
  const la = P(t, T.sin, T.sin + .4) * (1 - P(t, FINE - .6, FINE + .1));
  card(ctx, 1040, 110, 820, 690, la);
  ctx.save(); ctx.globalAlpha *= la;
  // le definizioni, finché c'è il triangolo con ipotenusa 1
  const kDef = 1 - P(t, T.aopp - .4, T.aopp);
  if (kDef > 0) {
    ctx.save(); ctx.globalAlpha *= kDef;
    conFont(TITOLI, () => drawRich(ctx, 'le definizioni', XP, 180, { size: 42, weight: 600 }));
    const k1 = P(t, T.sin + .3, T.sin + .7), k2 = P(t, T.cos + .2, T.cos + .6);
    drawRich(ctx, '{my:sin α}{mink: =}', 1250, 330, { size: 48, alpha: k1, align: 'right' });
    frazione(ctx, '{y:cateto opposto}', 'ipotenusa', 1500, 330, 42, k1);
    drawRich(ctx, '{mx:cos α}{mink: =}', 1250, 560, { size: 48, alpha: k2, align: 'right' });
    frazione(ctx, '{x:cateto adiacente}', 'ipotenusa', 1500, 560, 42, k2);
    ctx.restore();
  }
  if (fuoriScala > 0 && t > T.aopp) {
    ctx.save(); ctx.globalAlpha *= fuoriScala;
    drawRich(ctx, '{my:a}{mink: = c · }{my:sin α}', XP, 196, { size: 50, local: t - T.aopp - .2 });
    drawRich(ctx, '{dim:seno dell’angolo }{y:opposto}', XP, 250, { size: 30, local: t - T.reg1 - .2 });
    drawRich(ctx, '{mx:b}{mink: = c · }{mx:cos α}', XP, 318, { size: 50, local: t - T.badi - .2 });
    drawRich(ctx, '{dim:coseno dell’angolo }{x:adiacente}', XP, 372, { size: 30, local: t - T.reg2 - .2 });
    // a : b, la c si semplifica
    const k1 = P(t, T.div + .2, T.div + .6), k2 = P(t, T.div + .9, T.div + 1.3), k3 = P(t, T.div + 1.6, T.div + 2.0), k4 = P(t, T.tan + .3, T.tan + .7);
    frazione(ctx, '{my:a}', '{mx:b}', 1120, 486, 46, k1);
    drawRich(ctx, '{mink:=}', 1182, 486, { size: 46, alpha: k2 });
    frazione(ctx, '{mr:c}{mink: · }{my:sin α}', '{mr:c}{mink: · }{mx:cos α}', 1315, 486, 46, k2);
    drawRich(ctx, '{mink:=}', 1448, 486, { size: 46, alpha: k3 });
    frazione(ctx, '{my:sin α}', '{mx:cos α}', 1550, 486, 46, k3);
    drawRich(ctx, '{mink:= }{mv:tan α}', 1638, 486, { size: 46, alpha: k4, align: 'left' });
    drawRich(ctx, '{my:a}{mink: = }{mx:b}{mink: · }{mv:tan α}', XP, 612, { size: 50, local: t - T.per - .3 });
    drawRich(ctx, '{dim:tangente dell’angolo }{y:opposto}', XP, 666, { size: 30, local: t - T.reg3 - .2 });
    drawRich(ctx, '{my:a}{mink: = c · cos β}', XP, 744, { size: 50, local: t - T.bad - .3 });
    ctx.restore();
  }
  // la scala
  const ks = P(t, TS + 2.0, TS + 2.4);
  if (ks > 0) {
    ctx.save(); ctx.globalAlpha *= ks;
    conFont(TITOLI, () => drawRich(ctx, 'la scala', XP, 190, { size: 42, weight: 600 }));
    drawRich(ctx, '{ink:ipotenusa 5 m, }{mv:α}{mink: = }{ink:60°}', XP, 280, { size: 40 });
    drawRich(ctx, '{my:h}{mink: = 5 · sin }{ink:60°}{mink: ≈ }{my:4,33}{ink: m}', XP, 420, { size: 50, local: t - T.alt - .3 });
    drawRich(ctx, '{dim:altezza: cateto }{y:opposto}', XP, 474, { size: 30, local: t - T.alt - .3 });
    drawRich(ctx, '{x:piede}{mink: = 5 · cos }{ink:60°}{mink: = }{mx:2,5}{ink: m}', XP, 590, { size: 50, local: t - T.piede - .3 });
    drawRich(ctx, '{dim:piede: cateto }{x:adiacente}', XP, 644, { size: 30, local: t - T.piede - .3 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (FINE–DUR)
function sceneFine(ctx, t) {
  if (t < FINE) return;
  const al = 1 - P(t, FINE + 8.6, FINE + 9.6);
  ctx.save(); ctx.globalAlpha *= al;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - FINE - .4 });
    drawRich(ctx, 'Un cateto è l’ipotenusa per il {y:seno}\ndell’angolo opposto.', W / 2, 290, { size: 66, weight: 600, local: t - FINE - .8, stagger: .08 });
  });
  const pills = [[490, '{my:a}{mink: = c · sin α}'], [960, '{mx:b}{mink: = c · cos α}'], [1430, '{my:a}{mink: = }{mx:b}{mink: · tan α}']];
  pills.forEach(([px, s], i) => {
    const a = FINE + 2.6 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(px, 510); ctx.scale(k, k); ctx.translate(-px, -510);
    card(ctx, px - 215, 445, 430, 130);
    drawRich(ctx, s, px, 512, { size: 44 });
    ctx.restore();
  });
  ctx.restore();
}

  return {
    titolo: 'Seno, coseno e tangente nel triangolo', durata: DUR, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI },
    capitoli: [[7.5, T.uno - .1, 'cateto opposto e adiacente'], [T.uno - .1, T.ingr - .1, 'ipotenusa 1'],
      [T.ingr - .1, T.div - .1, 'ingrandito {mink:c} volte'], [T.div - .1, T.beta - .1, 'la tangente'],
      [T.beta - .1, TS - .1, 'l’altro angolo'], [TS - .1, FINE, 'la scala']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFigura(ctx, t); scenePannello(ctx, t); sceneFine(ctx, t); },
  };
});
