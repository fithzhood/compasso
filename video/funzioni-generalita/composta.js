'use strict';
/* La funzione composta — due macchine in fila: g ∘ f e f ∘ g danno risultati diversi, l'ordine conta.
   Argomento: funzioni-generalita. */
CVIDEO.registra('funzioni-generalita/composta', M => {
  const { W, C, E, P, rgb, TITOLI, conFont, drawRich, machine, drawRunIn, drawRunOut, machineFx, card } = M;
  // sullo schermo scuro della macchina serve sempre un colore chiaro
  const lum = c => { const [r, g, b] = rgb(c); return .3 * r + .59 * g + .11 * b; };
  const LU = () => lum(C.paper) > lum(C.ink) ? 'paper' : 'ink';

const POSA = {
  x: [[0, 760], [6.4, 760], [7.6, 190], [43.9, 190], [45.2, 420]],
  y: [[0, 900], [6.4, 900], [7.6, 1050], [43.9, 1050], [45.2, 1035]],
  s: [[0, 4.4], [6.4, 4.4], [7.6, 2.2], [43.9, 2.2], [45.2, 3.0]],
  lx: [[0, 0], [6.4, 0], [7.6, 2], [43.9, 2], [45.2, 1.5]],
  ly: [[0, 0], [6.4, 0], [7.6, -1.5], [43.9, -1.5], [45.2, -2]],
};
const FACCIA = [
  [0, 'neutro'], [1.45, 'sorpreso'], [3.5, 'pensa'], [6.4, 'neutro'],
  [14.8, 'felice'], [16.8, 'neutro'], [19.1, 'felice'], [21.1, 'neutro'],
  [32.6, 'felice'], [34.9, 'neutro'], [36.9, 'sorpreso'], [38.9, 'neutro'], [41.9, 'occhiolino'], [43.9, 'neutro'],
  [45.9, 'felice'], [50.9, 'occhiolino'],
];
const FUMETTI = [
  [2.2, 6.3, 'Due funzioni {v:in fila}:\nche cosa succede?'],
  // 1 · prima f, poi g
  [7.9, 12.6, 'Prima {mink:f}: aggiunge 1.\nPoi {mink:g}: fa il quadrato.'],
  [12.7, 17.1, 'Entra {mx:2}, e {mink:f}\nlo fa diventare 3…'],
  [17.2, 21.0, '…poi {mink:g} trasforma 3 in {my:9}.'],
  [21.1, 26.1, 'È la {v:composta} {mink:g ∘ f}:\nprima {mink:f}, poi {mink:g}.'],
  // 2 · nell'altro ordine
  [26.2, 30.3, 'Ora scambio l\'ordine:\nprima {mink:g}, poi {mink:f}.'],
  [30.4, 34.8, 'Entra {mx:2}, e {mink:g}\nlo fa diventare 4…'],
  [34.9, 38.7, '…poi {mink:f} trasforma 4 in {my:5}.'],
  [38.8, 43.8, '{mink:f ∘ g} non è {mink:g ∘ f}:\nl\'ordine {r:conta}.'],
  // chiusura
  [45.5, 50.9, 'La composta mette le funzioni\n{v:in fila}, e l\'ordine {r:conta}.'],
];

function sceneIntro(ctx, t) {
  if (t > 7.5) return;
  const al = 1 - P(t, 6.2, 7.0);
  conFont(TITOLI, () => drawRich(ctx, 'La funzione composta', W / 2, 180, { size: 130, weight: 600, local: t - 1.6, stagger: .15, alpha: al }));
}

// la regola sullo schermo di una macchina (anche scossa), scritta sempre dritta
function schermo(ctx, cx, cy, sc, sh, t, disegna) {
  if (sc <= 0) return;
  ctx.save(); ctx.translate(cx + Math.sin(t * 83) * 8 * sh, cy + Math.cos(t * 67) * 5 * sh); ctx.scale(sc, sc);
  disegna(LU()); ctx.restore();
}

// le due macchine in fila (7.5–44.1)
const CY = 330, MW = 300, MH = 230, MID = [903, CY], FINE = [1640, CY];
const R1 = { t0: 13.2, d: .9, inp: '2', from: [130, CY], outs: [{ label: '3', to: MID, fade: 17.0 }] };
const R2 = { t0: 17.5, d: .9, inp: '3', from: MID, outs: [{ label: '9', to: FINE, fade: 26.1 }] };
const R3 = { t0: 30.9, d: .9, inp: '2', from: [130, CY], outs: [{ label: '4', to: MID, fade: 34.9 }] };
const R4 = { t0: 35.2, d: .9, inp: '4', from: MID, outs: [{ label: '5', to: FINE, fade: 43.3 }] };
function sceneFila(ctx, t) {
  if (t < 7.5 || t > 44.1) return;
  const A = 1 - P(t, 43.5, 44.1);
  ctx.save(); ctx.globalAlpha *= A;
  // lo scambio: le due macchine si chiudono e si riaprono al posto dell'altra
  const dopo = t >= 27.3, sw = dopo ? P(t, 27.3, 27.9, E.back) : 1 - P(t, 26.7, 27.25, E.in);
  const F = { cx: dopo ? 1250 : 560, cy: CY, w: MW }, G = { cx: dopo ? 560 : 1250, cy: CY, w: MW };
  const fF = machineFx(t, [R1, R4]), fG = machineFx(t, [R2, R3]);
  const sF = P(t, 7.6, 8.4, E.back) * sw, sG = P(t, 8.0, 8.8, E.back) * sw;
  for (const R of [R1, R4]) drawRunIn(ctx, t, R, F);
  for (const R of [R2, R3]) drawRunIn(ctx, t, R, G);
  machine(ctx, F.cx, F.cy, { w: MW, h: MH, scale: sF, t, ...fF });
  machine(ctx, G.cx, G.cy, { w: MW, h: MH, scale: sG, t: t + 3, ...fG });
  schermo(ctx, F.cx, F.cy, sF, fF.shake, t, k => drawRich(ctx, `{m${k}:x + 1}`, 0, -22, { size: 60 }));
  schermo(ctx, G.cx, G.cy, sG, fG.shake, t + 3, k => drawRich(ctx, `{m${k}:x²}`, 0, -22, { size: 76 }));
  drawRich(ctx, '{mink:f}', F.cx, F.cy + 160, { size: 54, alpha: sF });
  drawRich(ctx, '{mink:g}', G.cx, G.cy + 160, { size: 54, alpha: sG });
  for (const R of [R1, R4]) drawRunOut(ctx, t, R, F);
  for (const R of [R2, R3]) drawRunOut(ctx, t, R, G);
  // la scheda dei conti
  const ca = P(t, 21.2, 21.7);
  if (ca > 0) {
    card(ctx, 260, 560, 1400, 220, ca);
    ctx.save(); ctx.globalAlpha *= ca;
    drawRich(ctx, '{mink:(g ∘ f)(}{mx:2}{mink:) = g(f(}{mx:2}{mink:)) = g(3) = }{my:9}', 320, 625, { size: 46, align: 'left', local: t - 21.4 });
    drawRich(ctx, '{mink:(f ∘ g)(}{mx:2}{mink:) = f(g(}{mx:2}{mink:)) = f(4) = }{my:5}', 320, 715, { size: 46, align: 'left', local: t - 36.9 });
    drawRich(ctx, '{my:9}{mr: ≠ }{my:5}', 1470, 670, { size: 64, local: t - 39.0 });
    ctx.restore();
  }
  ctx.restore();
}

// chiusura (43.9–53.7)
function sceneFine(ctx, t) {
  if (t < 43.9) return;
  conFont(TITOLI, () => {
    drawRich(ctx, '{v:in una frase}', W / 2, 150, { size: 42, weight: 500, local: t - 44.2 });
    drawRich(ctx, 'Comporre è mettere {v:in fila}:\nprima una funzione, poi l\'altra.', W / 2, 290, { size: 70, weight: 600, local: t - 44.6, stagger: .09 });
  });
  const pills = [[720, '{dim:prima }{mdim:f}{dim:, poi }{mdim:g}', '{mink:(g ∘ f)(}{mx:x}{mink:) = g(f(}{mx:x}{mink:))}'],
    [1200, '{dim:di solito}', '{mink:g ∘ f ≠ f ∘ g}']];
  pills.forEach(([x, testa, fo], i) => {
    const a = 45.9 + i * .5, k = P(t, a, a + .5, E.back);
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, 520); ctx.scale(k, k); ctx.translate(-x, -520);
    card(ctx, x - 215, 445, 430, 150);
    drawRich(ctx, testa, x, 486, { size: 30, weight: 400 });
    drawRich(ctx, fo, x, 545, { size: 38 });
    ctx.restore();
  });
}

  return {
    titolo: 'La funzione composta', durata: 53.7, copertina: 4.2,
    ada: { posa: POSA, facce: FACCIA, fumetti: FUMETTI, spegnimento: [51.6, 52.6] },
    capitoli: [[7.5, 26.2, 'prima {mink:f}, poi {mink:g}'], [26.2, 43.9, 'nell\'altro ordine']],
    scena(ctx, t) { sceneIntro(ctx, t); sceneFila(ctx, t); sceneFine(ctx, t); },
  };
});
