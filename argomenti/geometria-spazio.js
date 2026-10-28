(function () {
const R = String.raw;
/* Geometria dello spazio (quarto anno): geometria sintetica, senza coordinate (quelle stanno in
   geometria-analitica-spazio). Rette e piani, perpendicolarità, diedri; poliedri e solidi di rotazione;
   aree e volumi con il principio di Cavalieri. Ogni numero di teoria, esempi, esercizi, quiz e flashcard
   è stato ricalcolato con node. I video usano le lettere della teoria: r e s per le rette (sghembe),
   B, h, V per base, altezza e volume (cavalieri), O per il vertice della piramide (piramide-terzo),
   r e la quota h per la semisfera e la scodella (sfera). */

/* ---- lo spazio in assonometria, la stessa di geometria-analitica-spazio e dei video ----
   proiezione ortogonale: chi guarda sta a 20° fra gli assi x e y, 22° più in alto.
   x viene verso chi guarda (in basso a sinistra), y va a destra, z sale. Il motore disegna nel piano:
   ogni punto (x; y; z) diventa la coppia pj(x, y, z), e le figure si fanno con segmenti e poligoni.
   Con coordinate scritte come espressioni (parametri dei cursori) pj restituisce espressioni. */
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180;
const KX = [-Math.sin(TH), Math.cos(TH), 0];
const KY = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH)];
const VD = [Math.cos(PH) * Math.cos(TH), Math.cos(PH) * Math.sin(TH), Math.sin(PH)];   /* verso chi guarda */
const SIN_PH = Math.sin(PH), COS_PH = Math.cos(PH);
const arr = v => Math.round(v * 10000) / 10000;
const str = c => typeof c === 'string';
function pj(x, y, z) {
  const v = [x, y, z];
  if (v.every(c => typeof c === 'number')) return [arr(KX[0] * x + KX[1] * y), arr(KY[0] * x + KY[1] * y + KY[2] * z)];
  const espr = K => v.map((c, i) => K[i] === 0 ? '' : (K[i] < 0 ? ' - ' : ' + ') + Math.abs(K[i]).toFixed(5) + '*(' + c + ')').join('').replace(/^ \+ /, '').replace(/^ - /, '-');
  return [espr(KX), espr(KY)];
}
/* spostamento sul foglio, per mettere più solidi uno accanto all'altro */
const spf = (p, dx, dy) => p.map((c, i) => {
  const d = i ? dy : dx;
  if (!d) return c;
  return str(c) ? '(' + c + ')' + (d < 0 ? ' - ' + (-d) : ' + ' + d) : arr(c + d);
});
/* combinazione lineare di punti dello spazio: lc([k1, P1], [k2, P2], …); numeri o espressioni */
function lc() {
  const t = Array.from(arguments);
  return [0, 1, 2].map(i => {
    if (t.every(([k, P]) => !str(k) && !str(P[i]))) return t.reduce((s, [k, P]) => s + k * P[i], 0);
    return t.map(([k, P]) => '(' + k + ')*(' + P[i] + ')').join(' + ');
  });
}
const P3 = (p, d) => d ? spf(pj(p[0], p[1], p[2]), d[0], d[1]) : pj(p[0], p[1], p[2]);
/* segmento, poligono e punto dello spazio (d: spostamento sul foglio, facoltativo) */
const seg3 = (a, b, extra, d) => Object.assign({ tipo: 'segmento', da: P3(a, d), a: P3(b, d) }, extra || {});
const poli3 = (pts, extra, d) => Object.assign({ tipo: 'poligono', punti: pts.map(p => P3(p, d)) }, extra || {});
const pt3 = (p, etichetta, posizione, colore, d) => ({ tipo: 'punto', p: P3(p, d), etichetta, posizione, colore });
/* angolo retto nello spazio: due trattini nel piano delle direzioni (unitarie) u e w uscenti da V */
function retto3(V, u, w, k, colore, d) {
  const q1 = lc([1, V], [k, u]), q3 = lc([1, V], [k, w]), q2 = lc([1, q1], [k, w]);
  return [seg3(q1, q2, { colore }, d), seg3(q2, q3, { colore }, d)];
}
const unit = v => { const n = Math.hypot(v[0], v[1], v[2]); return v.map(c => c / n); };
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const media = L => L.reduce((s, q) => [s[0] + q[0] / L.length, s[1] + q[1] / L.length, s[2] + q[2] / L.length], [0, 0, 0]);

/* ---- un poliedro convesso dato con i soli vertici (numeri) ----
   le facce si trovano col guscio convesso: tre vertici formano una faccia se tutti gli altri stanno da una parte
   sola del loro piano. Uno spigolo si vede se tocca almeno una faccia rivolta verso chi guarda (normale · VD > 0):
   gli spigoli visibili sono pieni, quelli nascosti tratteggiati. velo: le facce visibili leggermente colorate. */
function guscio(V) {
  const c = media(V), F = [], viste = new Set(), eps = 1e-7;
  for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) for (let k = j + 1; k < V.length; k++) {
    let n = cross(sub(V[j], V[i]), sub(V[k], V[i]));
    const l = Math.hypot(n[0], n[1], n[2]);
    if (l < 1e-9) continue;
    n = n.map(q => q / l);
    const d0 = dot(n, V[i]);
    let piu = false, meno = false;
    const su = [];
    V.forEach((q, m) => { const s = dot(n, q) - d0; if (s > eps) piu = true; else if (s < -eps) meno = true; else su.push(m); });
    if (piu && meno) continue;
    const chiave = su.slice().sort((a, b) => a - b).join(',');
    if (viste.has(chiave)) continue;
    viste.add(chiave);
    if (dot(n, c) - d0 > 0) n = n.map(q => -q);
    /* i vertici della faccia in ordine, girando attorno al suo centro */
    const fc = media(su.map(m => V[m])), e1 = unit(sub(V[su[0]], fc)), e2 = cross(n, e1);
    su.sort((a, b) => { const pa = sub(V[a], fc), pb = sub(V[b], fc); return Math.atan2(dot(pa, e2), dot(pa, e1)) - Math.atan2(dot(pb, e2), dot(pb, e1)); });
    F.push({ v: su, n });
  }
  return F;
}
function solido(V, opz) {
  opz = opz || {};
  const F = guscio(V), S = {}, out = [];
  F.forEach(f => {
    const vis = dot(f.n, VD) > 1e-9;
    if (vis && opz.velo) out.push(poli3(f.v.map(m => V[m]), { colore: opz.colore || 1, riempi: true }, opz.sposta));
    f.v.forEach((a, k) => {
      const b = f.v[(k + 1) % f.v.length], key = a < b ? a + ',' + b : b + ',' + a;
      if (!S[key]) S[key] = [a, b, false];
      if (vis) S[key][2] = true;
    });
  });
  Object.keys(S).forEach(key => {
    const [a, b, vis] = S[key];
    if (!vis && opz.nascosti === false) return;
    out.push(seg3(V[a], V[b], vis ? { colore: opz.colore || 1 } : { colore: opz.colore || 1, tratteggio: true }, opz.sposta));
  });
  return out;
}
/* arco di circonferenza orizzontale (centro c, raggio r) fra gli angoli f0 e f1 (radianti), a pezzetti.
   Tratteggiato: il tratteggio del motore ripartirebbe a ogni pezzetto (troppo corto per vederlo), quindi
   si disegna un pezzetto sì e uno no, pieni: sono loro i trattini. */
function arco(c, r, f0, f1, extra, d, N) {
  const trat = extra && extra.tratteggio;
  N = N || (trat ? 20 : 24);
  const ex = trat ? Object.assign({}, extra, { tratteggio: false }) : extra;
  const out = [];
  for (let i = 0; i < N; i++) {
    if (trat && i % 2) continue;
    const a = f0 + (f1 - f0) * i / N, b = f0 + (f1 - f0) * (i + 1) / N;
    out.push(seg3([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), c[2]], [c[0] + r * Math.cos(b), c[1] + r * Math.sin(b), c[2]], ex, d));
  }
  return out;
}
/* circonferenza orizzontale: davanti piena, dietro tratteggiata (sopra: tutta piena, la si vede dall'alto).
   Sul foglio è un'ellisse; i suoi estremi a destra e a sinistra stanno agli angoli TH ± 90°. */
function giro(c, r, colore, d, sopra) {
  return arco(c, r, TH - Math.PI / 2, TH + Math.PI / 2, { colore }, d)
    .concat(arco(c, r, TH + Math.PI / 2, TH + 1.5 * Math.PI, sopra ? { colore } : { colore, tratteggio: true }, d));
}
/* il piano orizzontale z = h, rettangolo coi lati paralleli agli assi */
const pianoZ = (h, x0, x1, y0, y1, colore, d) => poli3([[x1, y0, h], [x1, y1, h], [x0, y1, h], [x0, y0, h]], { colore }, d);

/* scritta vicino a un punto dello spazio, spostata sul foglio di (dx; dy) */
const scritta = (p, testo, dx, dy, ancora, d) => ({ tipo: 'testo', p: spf(P3(p, d), dx || 0, dy || 0), testo, ancora: ancora || 'middle' });
const G = gr => 'cos(' + gr + '*pi/180)', S = gr => 'sin(' + gr + '*pi/180)';

/* ---- le figure ---- */
/* § rette-piani: un piano α e tre rette, una per posizione */
const F_RETTA_PIANO = [pianoZ(0, -2, 2, -3, 3, 1)].concat([
  seg3([1.5, -2.5, 0], [-1.2, 2.0, 0], { colore: 2 }),
  seg3([0.5, -3.2, 1.7], [0.5, 3.2, 1.7], { colore: 3 }),
  seg3([0.5, 2.6, 1.7], [0.5, 2.6, 0], { colore: 3, tratteggio: true }),
  seg3([-1.02, -1.5, -1.2], [-0.6, -1.2, 0], { colore: 4, tratteggio: true }),
  seg3([-0.6, -1.2, 0], [0.17, -0.65, 2.2], { colore: 4 }),
  pt3([-0.6, -1.2, 0], 'P', 'sinistra', 4),
  scritta([2, 3, 0], 'α', -0.35, 0.22),
  scritta([1.5, -2.5, 0], 'r', 0.05, -0.32),
  scritta([0.5, 3.2, 1.7], 's', 0.22, 0.05),
  scritta([0.17, -0.65, 2.2], 't', 0.18, 0.05)
]);
/* § parallelismo: due piani paralleli (z = 0 e z = 2,2) tagliati dal piano β: x = −0,5z + 0,2 */
const F_PARALLELI = [
  pianoZ(0, -1.6, 1.6, -2.6, 2.6, 1),
  pianoZ(2.2, -1.6, 1.6, -2.6, 2.6, 1),
  poli3([[0.45, -2.2, -0.5], [0.45, 2.2, -0.5], [-1.15, 2.2, 2.7], [-1.15, -2.2, 2.7]], { colore: 3 }),
  seg3([0.2, -2.2, 0], [0.2, 2.2, 0], { colore: 2 }),
  seg3([-0.9, -2.2, 2.2], [-0.9, 2.2, 2.2], { colore: 2 }),
  scritta([1.6, -2.6, 0], 'α', -0.25, -0.05),
  scritta([1.6, -2.6, 2.2], 'α′', -0.3, -0.05),
  scritta([-1.15, -2.2, 2.7], 'β', -0.2, 0.1),
  scritta([0.2, 2.2, 0], 'a', 0.25, -0.05),
  scritta([-0.9, 2.2, 2.2], 'b', 0.25, -0.05)
];
/* § perpendicolarita: le tre perpendicolari. La retta r è x = 0 sul pavimento (corre verso destra),
   H(3; 0,5; 0) sta davanti, A(0; 0,5; 0) è il piede della perpendicolare da H: HA = 3. P sta sopra H a quota h */
const TP_H = [3, 0.5, 0], TP_A = [0, 0.5, 0], TP_P = [3, 0.5, 'h'];
const TP_L = 'sqrt(9 + h^2)';
const F_TRE_PERP = [pianoZ(0, -1.2, 3.8, -2.8, 3.4, 1)].concat([
  seg3([0, -2.6, 0], [0, 3.2, 0], { colore: 4 }),
  seg3(TP_H, TP_P, { colore: 1 }),
  seg3(TP_H, TP_A, { colore: 3 }),
  seg3(TP_A, TP_P, { colore: 2 })
], retto3(TP_H, [0, 0, 1], [-1, 0, 0], 0.35, 1),
  retto3(TP_A, [1, 0, 0], [0, -1, 0], 0.35, 3),
  retto3(TP_A, ['3/' + TP_L, 0, 'h/' + TP_L], [0, 1, 0], 0.35, 2), [
  pt3(TP_P, 'P', 'alto-destra', 1),
  pt3(TP_H, 'H', 'basso', 1),
  pt3(TP_A, '', 'basso', 2),
  scritta(TP_A, 'A', 0.3, -0.55),
  scritta([0, 3.2, 0], 'r', 0.2, 0.05),
  scritta([3.8, 3.4, 0], 'α', -0.3, 0.18),
  { tipo: 'testo', p: [-2.6, 4.9], testo: 'PH = {{h}}    HA = 3    PA = {{sqrt(h^2 + 9)}}', ancora: 'start' }
]);
/* § diedri-distanze: il diedro con spigolo sull'asse x; la faccia β gira di t gradi attorno allo spigolo.
   La sezione normale sta nel piano x = 1,2 (y e z si vedono quasi senza deformazione) */
const DQ = [1.2, 0, 0];
const D2 = s => [s, '2.8*' + G('t'), '2.8*' + S('t')];
const F_DIEDRO = [
  poli3([[2.4, 0, 0], [2.4, 2.8, 0], [-2.4, 2.8, 0], [-2.4, 0, 0]], { colore: 1 }),
  poli3([[2.4, 0, 0], D2(2.4), D2(-2.4), [-2.4, 0, 0]], { colore: 3 }),
  seg3([2.4, 0, 0], [-2.4, 0, 0], { colore: 4 }),
  seg3(DQ, [1.2, 2.8, 0], { colore: 2 }),
  seg3(DQ, D2(1.2), { colore: 2 })
].concat(
  Array.from({ length: 12 }, (z, i) => seg3([1.2, '0.9*' + G('t*' + i + '/12'), '0.9*' + S('t*' + i + '/12')], [1.2, '0.9*' + G('t*' + (i + 1) + '/12'), '0.9*' + S('t*' + (i + 1) + '/12')], { colore: 2 })),
  retto3(DQ, [1, 0, 0], [0, 1, 0], 0.3, 4),
  retto3(DQ, [1, 0, 0], [0, G('t'), S('t')], 0.3, 4), [
  scritta([-2.4, 0, 0], 'spigolo', 0.15, 0.2, 'start'),
  scritta([2.4, 2.8, 0], 'α', 0.1, -0.3),
  { tipo: 'testo', p: spf(pj(2.4, '3.1*' + G('t'), '3.1*' + S('t')), 0, 0.05), testo: 'β' },
  { tipo: 'testo', p: [-3.3, 3.6], testo: 'sezione normale: {{t}}°', ancora: 'start' }
]);
/* § prismi-piramidi: il parallelepipedo rettangolo a × b × c; O(0; 0; 0) è il vertice nascosto */
const PA_ = ['a', 0, 0], PB_ = ['a', 'b', 0], PC_ = [0, 'b', 0], PD_ = [0, 0, 'c'], PE_ = ['a', 0, 'c'], PF_ = ['a', 'b', 'c'], PG_ = [0, 'b', 'c'];
const F_PARALLELEPIPEDO = [
  seg3([0, 0, 0], PA_, { colore: 1, tratteggio: true }), seg3([0, 0, 0], PC_, { colore: 1, tratteggio: true }), seg3([0, 0, 0], PD_, { colore: 1, tratteggio: true }),
  seg3(PA_, PB_, { colore: 1 }), seg3(PB_, PC_, { colore: 1 }), seg3(PA_, PE_, { colore: 1 }), seg3(PB_, PF_, { colore: 1 }),
  seg3(PD_, PE_, { colore: 1 }), seg3(PE_, PF_, { colore: 1 }), seg3(PF_, PG_, { colore: 1 }), seg3(PG_, PD_, { colore: 1 }),
  seg3(PA_, PC_, { colore: 3, tratteggio: true }),
  seg3(PC_, PG_, { colore: 3 }),
  seg3(PA_, PG_, { colore: 2 })
].concat(retto3(PC_, ['a/sqrt(a^2 + b^2)', '-b/sqrt(a^2 + b^2)', 0], [0, 0, 1], 0.3, 3), [
  pt3(PA_, 'A', 'basso-sinistra', 2),
  pt3(PG_, 'G', 'alto', 2),
  pt3(PC_, 'C', 'alto-destra', 3),
  scritta(['a/2', 'b', 0], 'a', 0.22, -0.2),
  scritta(['a', 'b/2', 0], 'b', 0, -0.32),
  scritta(['a', 'b', 'c/2'], 'c', 0.22, 0),
  scritta(['a/2', 'b/2', 'c/2'], 'd', -0.05, 0.35),
  { tipo: 'testo', p: [-1.8, 5.3], testo: 'd = √(a² + b² + c²) = {{sqrt(a^2 + b^2 + c^2)}}', ancora: 'start' }
]);
/* la piramide regolare a base quadrata di lato 6 e altezza 4: apotema 5 */
const PIR = [[3, 3, 0], [3, -3, 0], [-3, -3, 0], [-3, 3, 0], [0, 0, 4]];
const F_PIRAMIDE = solido(PIR, { colore: 1 }).concat([
  seg3([0, 0, 0], [0, 0, 4], { colore: 4, tratteggio: true }),
  seg3([0, 0, 0], [0, 3, 0], { colore: 3, tratteggio: true }),
  seg3([0, 3, 0], [0, 0, 4], { colore: 2 })
], retto3([0, 0, 0], [0, 0, 1], [0, 1, 0], 0.45, 4), retto3([0, 3, 0], unit([0, -3, 4]), [1, 0, 0], 0.45, 2), [
  pt3([0, 0, 4], 'O', 'alto', 2),
  pt3([0, 0, 0], 'H', 'basso-sinistra', 4),
  pt3([0, 3, 0], 'M', 'basso-destra', 3),
  scritta([0, 0, 2], 'h', -0.3, 0),
  scritta([0, 1.5, 0], 'r', 0, -0.32),
  scritta([0, 1.5, 2], 'a', 0.3, 0.15)
]);
/* § poliedri-regolari: i cinque solidi, ognuno con raggio della sfera circoscritta 1,05 */
const PHI = (1 + Math.sqrt(5)) / 2;
const scala = (L, k) => L.map(p => p.map(c => c * k));
const ruotaZ = (L, gr) => { const c = Math.cos(gr * Math.PI / 180), s = Math.sin(gr * Math.PI / 180); return L.map(p => [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]]); };
const cicl = L => L.flatMap(p => [p, [p[2], p[0], p[1]], [p[1], p[2], p[0]]]);
const segni3 = (a, b, c) => [1, -1].flatMap(i => [1, -1].flatMap(j => [1, -1].map(k => [i * a, j * b, k * c])));
const TETRA = [[0, 0, 1], [Math.sqrt(8 / 9), 0, -1 / 3], [-Math.sqrt(2 / 9), Math.sqrt(2 / 3), -1 / 3], [-Math.sqrt(2 / 9), -Math.sqrt(2 / 3), -1 / 3]];
const CUBO = scala(segni3(1, 1, 1), 1 / Math.sqrt(3));
const OTTA = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const ICOSA = scala(cicl([1, -1].flatMap(j => [1, -1].map(k => [0, j, k * PHI]))), 1 / Math.hypot(1, PHI));
const DODECA = scala(segni3(1, 1, 1).concat(cicl([1, -1].flatMap(j => [1, -1].map(k => [0, j / PHI, k * PHI])))), 1 / Math.sqrt(3));
const PLATONICI = [
  ['tetraedro', ruotaZ(TETRA, 10), [-2.7, 1.0]], ['cubo', CUBO, [0, 1.0]], ['ottaedro', ruotaZ(OTTA, 15), [2.7, 1.0]],
  ['dodecaedro', ruotaZ(DODECA, 8), [-1.35, -1.85]], ['icosaedro', ruotaZ(ICOSA, 8), [1.35, -1.85]]
];
const F_PLATONICI = PLATONICI.flatMap(([nome, V, d], i) => solido(scala(V, 1.05), { colore: 1 + i % 4, sposta: d }).concat([
  { tipo: 'testo', p: [d[0], arr(d[1] - 1.35)], testo: nome }
]));
/* § rotazione: cilindro, cono e sfera (raggio 1, altezza 2) e la figura che li genera, girata di t gradi */
const RO = [[-3.1, -0.9], [0, -0.9], [3.1, -0.9]];
const ASSE = d => seg3([0, 0, -0.35], [0, 0, 2.45], { colore: 4, tratteggio: true }, d);
const SIL = TH + Math.PI / 2;                               /* il contorno del cilindro, a destra e a sinistra */
const PSI_CONO = Math.acos(-SIN_PH / (2 * COS_PH));         /* dove le generatrici di contorno toccano la base del cono */
const RUOTA = (rho, z) => ['(' + rho + ')*' + G('t'), '(' + rho + ')*' + S('t'), z];
const F_ROTAZIONE = [].concat(
  giro([0, 0, 0], 1, 1, RO[0]), giro([0, 0, 2], 1, 1, RO[0], true),
  [seg3([Math.cos(SIL), Math.sin(SIL), 0], [Math.cos(SIL), Math.sin(SIL), 2], { colore: 1 }, RO[0]),
   seg3([-Math.cos(SIL), -Math.sin(SIL), 0], [-Math.cos(SIL), -Math.sin(SIL), 2], { colore: 1 }, RO[0]),
   poli3([[0, 0, 0], RUOTA(1, 0), RUOTA(1, 2), [0, 0, 2]], { colore: 2 }, RO[0]), ASSE(RO[0])],
  arco([0, 0, 0], 1, TH - PSI_CONO, TH + PSI_CONO, { colore: 1 }, RO[1]),
  arco([0, 0, 0], 1, TH + PSI_CONO, TH - PSI_CONO + 2 * Math.PI, { colore: 1, tratteggio: true }, RO[1], 17),
  [seg3([0, 0, 2], [Math.cos(TH - PSI_CONO), Math.sin(TH - PSI_CONO), 0], { colore: 1 }, RO[1]),
   seg3([0, 0, 2], [Math.cos(TH + PSI_CONO), Math.sin(TH + PSI_CONO), 0], { colore: 1 }, RO[1]),
   poli3([[0, 0, 0], RUOTA(1, 0), [0, 0, 2]], { colore: 2 }, RO[1]), ASSE(RO[1])],
  [{ tipo: 'cerchio', centro: P3([0, 0, 1], RO[2]), raggio: 1, colore: 1 }],
  giro([0, 0, 1], 1, 1, RO[2]),
  [poli3(Array.from({ length: 13 }, (z, i) => RUOTA(arr(Math.sin(i * Math.PI / 12)), arr(1 + Math.cos(i * Math.PI / 12)))), { colore: 2 }, RO[2]), ASSE(RO[2])],
  RO.map((d, i) => ({ tipo: 'testo', p: [d[0], arr(d[1] - 0.85)], testo: ['cilindro', 'cono', 'sfera'][i] }))
);
/* § cavalieri: un prisma retto a base quadrata (lato 2) e un prisma obliquo a base triangolare (cateti 2 e 4),
   tutti e due con base di area 4 e altezza 3; il piano z = k li taglia in sezioni di area 4 */
const QB = [[1, -3.6, 0], [1, -1.6, 0], [-1, -1.6, 0], [-1, -3.6, 0]];
const TB = [[1, 0.6, 0], [-1, 0.6, 0], [1, 4.6, 0]], OBL = [0, 1.2, 3];
const F_CAVALIERI = [pianoZ('k', -1.7, 1.7, -4.4, 6.6, 3)].concat(
  solido(QB.concat(QB.map(p => [p[0], p[1], 3])), { colore: 1, velo: true }),
  solido(TB.concat(TB.map(p => lc([1, p], [1, OBL]))), { colore: 1, velo: true }), [
  poli3(QB.map(p => [p[0], p[1], 'k']), { colore: 2 }),
  poli3(TB.map(p => [p[0], p[1] + ' + 0.4*k', 'k']), { colore: 2 }),
  { tipo: 'testo', p: [-4.6, 4.25], testo: 'quota {{k}}: le due sezioni hanno area 4', ancora: 'start' }
]);
/* § volumi: due piramidi alte 3 con basi equivalenti (area 4): un quadrato e un triangolo isoscele */
const PQ = [[1, -3.2, 0], [1, -1.2, 0], [-1, -1.2, 0], [-1, -3.2, 0]], PQV = [0, -2.2, 3];
const PT = [[1, 0.8, 0], [1, 4.8, 0], [-1, 2.8, 0]], PTV = [0.2, 2.8, 3];
const sezione = (B, T) => B.map(p => lc(['1 - k/3', p], ['k/3', T]));
const F_PIRAMIDI = [pianoZ('k', -1.7, 1.7, -4.2, 5.8, 3)].concat(
  solido(PQ.concat([PQV]), { colore: 1, velo: true }),
  solido(PT.concat([PTV]), { colore: 1, velo: true }), [
  poli3(sezione(PQ, PQV), { colore: 2 }),
  poli3(sezione(PT, PTV), { colore: 2 }),
  { tipo: 'testo', p: [-4.5, 3.75], testo: 'area di ogni sezione: 4 · (1 − k/3)² = {{4*(1 - k/3)^2}}', ancora: 'start' }
]);

/* ---- allenamento: risposte ----
   num: un numero (la casella legge anche 5√3, 7/2 e l'unità in fondo); conPi: un multiplo di π, scritto «30π»;
   gradi: con 'numeri', che pesca il numero anche da «45°» o «45 gradi». */
const num = (v, seg) => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: seg || 'solo il numero, es. 12', simboli: ['/', '√'] });
const conPi = (v, seg) => ({ tipo: 'numero', valore: v * Math.PI, tolleranza: 0.01, segnaposto: seg || 'con π, es. 4π', simboli: ['π', '/'] });
const gradi = v => ({ tipo: 'numeri', valori: [v], segnaposto: 'in gradi, es. 40', simboli: ['°'] });
const PARALLELE = { tipo: 'testo', accettate: ['parallele', 'sono parallele', 'rette parallele', 'due rette parallele', 'parallele fra loro', 'parallele tra loro', 'sono parallele fra loro', 'sono parallele tra loro', 'sono rette parallele'], segnaposto: 'una parola', simboli: [] };

COMPASSO.registra({
  id: 'geometria-spazio',
  titolo: 'Geometria dello spazio',

  introduzione: R`Una scatola di scarpe, una lattina, un pallone, un cono gelato: sono tutti solidi. Per costruirli o riempirli servono le loro misure. Quanta latta serve per la lattina? Quanta acqua ci sta in una piscina? Quanto cartone per una scatola?

La **geometria dello spazio** porta in tre dimensioni la geometria del piano. Prima guarda come stanno fra loro rette e piani: paralleli, perpendicolari, oppure **sghembi**. Le rette sghembe sono una novità: nel piano non esistono. Poi studia i solidi: prismi, piramidi, poliedri regolari, cilindri, coni e sfere. Per ognuno impari a calcolare la superficie e il volume.

Ti servono la geometria del piano, soprattutto il teorema di Pitagora e le aree dei poligoni e del cerchio. Qui non si usano coordinate: per quelle c'è la geometria analitica nello spazio.`,

  inBreve: [
    R`Due rette nello spazio possono essere incidenti, parallele o **sghembe**. Le sghembe non si incontrano e non stanno su nessun piano.`,
    R`Una retta è perpendicolare a un piano se è perpendicolare a due rette del piano che passano per il suo piede. Il teorema delle tre perpendicolari dice come trovare la distanza di un punto da una retta.`,
    R`L'ampiezza di un diedro si misura sulla sua sezione normale. L'angolo fra una retta e un piano è quello fra la retta e la sua proiezione sul piano.`,
    R`I poliedri regolari sono soltanto cinque. In ogni poliedro convesso vertici, spigoli e facce rispettano $V - S + F = 2$.`,
    R`Prismi e cilindri valgono $B \cdot h$, piramidi e coni un terzo: $\frac{1}{3}B \cdot h$. La sfera ha volume $\frac{4}{3}\pi r^3$ e superficie $4\pi r^2$.`,
    R`Il principio di Cavalieri: due solidi tagliati a ogni altezza in sezioni della stessa area hanno lo stesso volume.`
  ],

  sezioni: [
    { id: 'rette-piani', titolo: 'Punti, rette e piani nello spazio', testo: R`Nello spazio i protagonisti sono gli stessi del piano: punti, rette e piani. Sono **enti primitivi**: non si definiscono, se ne fissano le proprietà con alcuni postulati.

- Per tre punti non allineati passa uno e un solo piano.
- Se una retta ha due punti su un piano, sta tutta sul piano.
- Se due piani distinti hanno un punto in comune, hanno in comune una retta.

Un piano si indica con una lettera greca: $\alpha$, $\beta$, $\pi$. Pensa a una porta aperta, che gira sui cardini. La retta dei cardini non basta a bloccarla. Basta però un punto in più: il fermaporta.

>* Un piano è individuato da tre punti non allineati. Bastano anche una retta e un punto fuori di essa, due rette incidenti, o due rette parallele distinte.

### Due rette

Due rette che stanno su uno stesso piano si dicono **complanari**. Possono essere **incidenti**, con un solo punto in comune, oppure **parallele**. Nello spazio c'è una terza possibilità.

>* Due rette sono **sghembe** se non esiste un piano che le contenga entrambe. Non si incontrano, eppure non sono parallele.

[[video:geometria-spazio/sghembe]]

In una stanza, prendi uno spigolo del pavimento e uno spigolo verticale della parete di fronte. Non si toccano e non sono parallele: sono sghembi.

?? Due rette dello spazio non hanno punti in comune. Che cosa puoi concludere?
[ ] Sono parallele.
[x] Sono parallele oppure sghembe.
[ ] Sono sghembe.
=> Senza punti in comune i casi sono due. Se le rette stanno su un piano sono parallele, altrimenti sono sghembe. Per decidere bisogna sapere se sono complanari.

### Retta e piano, due piani

| punti in comune | la retta è |
|---|---|
| infiniti | giacente sul piano |
| uno solo | incidente al piano |
| nessuno | parallela al piano |

[[grafico:gRettaPiano]]

Due piani distinti possono avere in comune una retta: sono **incidenti**. Oppure non hanno punti in comune: sono **paralleli**.

>! In un disegno due rette sghembe sembrano spesso incrociarsi. Quel punto d'incrocio esiste solo sul foglio: nello spazio una retta passa dietro l'altra.` },

    { id: 'parallelismo', titolo: 'Rette e piani paralleli', testo: R`Nel piano due rette che non si incontrano sono parallele. Nello spazio invece possono anche essere sghembe. Per questo il parallelismo nello spazio chiede qualcosa in più: stare su un piano.

>* Due rette sono **parallele** se stanno su uno stesso piano e non hanno punti in comune, oppure se coincidono. Una retta è **parallela a un piano** se non ha punti in comune con il piano, oppure se ci giace.

Anche nello spazio vale la proprietà transitiva: due rette parallele a una terza sono parallele fra loro.

### Riconoscere il parallelismo

Per dire che una retta è parallela a un piano non serve controllare tutti i suoi punti.

>* **Criterio.** Una retta esterna a un piano è parallela al piano se è parallela a una retta del piano.

In una scatola chiusa, ogni spigolo del coperchio è parallelo a uno spigolo del fondo. Quindi è parallelo al piano del fondo.

>* **Criterio.** Due piani sono paralleli se uno dei due contiene due rette incidenti parallele all'altro.

Una retta sola non basta. Il tetto di una casa contiene la linea di colmo, che è orizzontale. Eppure il tetto non è parallelo al pavimento.

### Piani paralleli tagliati da un piano

>* Un piano che taglia due piani paralleli li taglia lungo rette parallele.

Pensa agli scaffali di una libreria: il fianco li taglia lungo segmenti paralleli. Le due rette stanno sullo stesso piano, il fianco. Non si incontrano, perché gli scaffali non hanno punti in comune.

[[grafico:gParalleli]]

> Vale anche il teorema di Talete: piani paralleli tagliano su due rette qualunque segmenti proporzionali.

?? La retta $r$ è parallela al piano $\alpha$ e non giace su $\alpha$. Allora $r$ è parallela a ogni retta di $\alpha$?
[ ] Sì, per la proprietà transitiva.
[x] No: con molte rette di $\alpha$ è sghemba.
[ ] No: con molte rette di $\alpha$ è incidente.
=> Solo le rette di $\alpha$ con la direzione di $r$ sono parallele a $r$. Le altre non incontrano $r$, perché $r$ sta fuori da $\alpha$ e non lo tocca. Non sono parallele e non si incontrano: sono sghembe con $r$.

>! «Parallela a un piano» non vuol dire «parallela a tutte le rette del piano». Vuol dire parallela ad almeno una.` },

    { id: 'perpendicolarita', titolo: 'Perpendicolari a un piano e tre perpendicolari', testo: R`Un palo piantato bene nel prato è dritto in tutte le direzioni. Il carpentiere lo controlla con la squadra, ma in due direzioni diverse.

>* La retta $r$ incontra il piano $\alpha$ nel punto $H$. È **perpendicolare** ad $\alpha$ se è perpendicolare a tutte le rette di $\alpha$ passanti per $H$.

Controllarle tutte è impossibile. Per fortuna ne bastano due.

>* **Criterio di perpendicolarità.** Una retta perpendicolare a due rette incidenti di un piano, nel loro punto d'incontro, è perpendicolare al piano.

Ecco perché si usa la squadra due volte. Con una sola direzione il palo potrebbe pendere nell'altra.

### Distanza e oblique

Da un punto $P$ esterno ad $\alpha$ parte una sola perpendicolare al piano. Il suo piede $H$ si chiama **proiezione** di $P$ su $\alpha$. La lunghezza di $PH$ è la **distanza** di $P$ dal piano.

Ogni altro segmento $PA$, con $A$ su $\alpha$, è un'**obliqua**. Il triangolo $PHA$ è rettangolo in $H$:
$$\overline{PA}^2 = \overline{PH}^2 + \overline{HA}^2$$
Per questo l'obliqua è sempre più lunga della distanza.

### Il teorema delle tre perpendicolari

>* **Teorema delle tre perpendicolari.** $PH$ è perpendicolare al piano $\alpha$, e $r$ è una retta di $\alpha$ che non passa per $H$. Se $HA$ è perpendicolare a $r$, con $A$ su $r$, allora anche $PA$ è perpendicolare a $r$.

[[grafico:gTrePerp]]

~ \overline{AB} = \overline{AC} :: prendo su $r$ due punti $B$ e $C$ alla stessa distanza da $A$
~ \overline{HB} = \overline{HC} :: nel piano $\alpha$ la retta $HA$ è l'asse di $BC$: è perpendicolare a $r$ nel punto medio $A$
~ \triangle PHB \cong \triangle PHC :: sono rettangoli in $H$, con il cateto $PH$ in comune e $HB = HC$
~ \overline{PB} = \overline{PC} :: lati corrispondenti: il triangolo $PBC$ è isoscele
~ \evidb{PA \perp r} :: nel triangolo isoscele la mediana $PA$ è anche altezza

Così $PA$ è la distanza di $P$ dalla retta $r$. Con $\overline{PH} = 4$ e $\overline{HA} = 3$ viene $\overline{PA} = \sqrt{16 + 9} = 5$.

>! Il punto $A$ non è un punto qualunque di $r$: è il piede della perpendicolare da $H$. Con un altro punto di $r$ ottieni un'obliqua, più lunga della distanza.` },

    { id: 'diedri-distanze', titolo: 'Diedri, angoli e distanze', testo: R`Apri un libro a metà. Le due metà sono due semipiani con lo stesso bordo, la costola.

>* Un **diedro** è ciascuna delle due parti di spazio delimitate da due semipiani con la stessa retta d'origine. La retta è lo **spigolo**, i semipiani sono le **facce**.

Per misurarlo lo tagli con un piano perpendicolare allo spigolo. Il taglio è un angolo del piano: la **sezione normale**.

>* L'**ampiezza di un diedro** è l'ampiezza della sua sezione normale. Tutte le sezioni normali di uno stesso diedro sono congruenti.

[[grafico:gDiedro]]

Due piani incidenti formano quattro diedri. I piani sono **perpendicolari** quando i quattro diedri sono retti.

>* Se un piano contiene una retta perpendicolare a un altro piano, i due piani sono perpendicolari.

Una porta contiene la retta dei cardini, perpendicolare al pavimento. Per questo la porta resta perpendicolare al pavimento in ogni posizione.

?? Due pareti di una stanza sono perpendicolari al pavimento. Sono parallele fra loro?
[ ] Sì, sempre.
[x] Non per forza: due pareti vicine sono perpendicolari fra loro.
[ ] No, mai.
=> Due piani perpendicolari a uno stesso piano possono essere paralleli, come due pareti opposte. Possono però anche incontrarsi, come due pareti vicine, che si toccano lungo lo spigolo verticale.

### L'angolo fra una retta e un piano

Una retta incontra il piano $\alpha$ nel punto $A$, senza essere perpendicolare. Un suo punto $P$ ha per proiezione $H$. La retta $AH$ è la **proiezione** della retta sul piano.

>* L'**angolo fra una retta e un piano** è l'angolo acuto fra la retta e la sua proiezione sul piano: qui $\widehat{PAH}$.

Per esempio $P$ dista $5$ dal piano e l'obliqua $PA$ è lunga $10$. Nel triangolo rettangolo $PHA$ vale $\sin\widehat{PAH} = \frac{5}{10} = \frac{1}{2}$, quindi l'angolo è di $30^\circ$.

### Le distanze

Fra due piani paralleli la distanza è la lunghezza di un segmento perpendicolare a tutti e due. Lo stesso vale fra una retta e un piano paralleli.

>* La **distanza fra due rette sghembe** è la lunghezza della loro **perpendicolare comune**. È il segmento che le incontra entrambe ad angolo retto, il più corto fra quelli che le uniscono.

In un cubo due spigoli sghembi distano quanto lo spigolo. La loro perpendicolare comune è proprio un terzo spigolo, che li collega.

>! L'angolo fra una retta e un piano non si misura con una retta qualunque del piano. Serve la proiezione: è la retta del piano che forma l'angolo più piccolo.` },

    { id: 'prismi-piramidi', titolo: 'Prismi e piramidi', testo: R`Un **poliedro** è un solido limitato da poligoni, le **facce**. I lati delle facce sono gli **spigoli**, i loro estremi sono i **vertici**.

### Il prisma

>* Un **prisma** ha due facce congruenti su piani paralleli, le **basi**. Le altre facce sono parallelogrammi. L'**altezza** $h$ è la distanza fra i piani delle basi.

Il prisma è **retto** se gli spigoli laterali sono perpendicolari alle basi: allora le facce laterali sono rettangoli. È **regolare** se è retto e ha per base un poligono regolare.

Un prisma con basi parallelogrammi è un **parallelepipedo**. Se tutte le facce sono rettangoli è un **parallelepipedo rettangolo**, con tre dimensioni $a$, $b$, $c$. Il cubo ha le tre dimensioni uguali.

~ d_b^2 = a^2 + b^2 :: la diagonale di base, nel rettangolo di lati $a$ e $b$
~ d^2 = \evid{d_b^2} + c^2 :: un triangolo rettangolo in piedi: i cateti sono $d_b$ e lo spigolo $c$
~ d = \evidb{\sqrt{a^2 + b^2 + c^2}} :: con $a = 2$, $b = 4$, $c = 4$: $d = \sqrt{36} = 6$

[[grafico:gParallelepipedo]]

Nel cubo di spigolo $\ell$ la diagonale è $\ell\sqrt{3}$.

Le facce laterali di un prisma retto sono rettangoli alti $h$. Messe in fila formano un rettangolo lungo quanto il perimetro di base $2p$. Quindi la **superficie laterale** è $S_l = 2p \cdot h$. La **superficie totale** aggiunge le due basi: $S_t = S_l + 2B$.

### La piramide

>* Una **piramide** ha per base un poligono. Le facce laterali sono triangoli con un vertice in comune, il **vertice** $O$. L'**altezza** $h$ è la distanza di $O$ dal piano di base.

La piramide è **retta** se la base ha una circonferenza inscritta, con centro nel piede $H$ dell'altezza. Allora le facce laterali hanno tutte la stessa altezza: è l'**apotema** $a$. Una piramide retta con base regolare si dice **regolare**.

[[grafico:gPiramide]]

>* Nella piramide retta $a^2 = h^2 + r^2$, con $r$ raggio della circonferenza inscritta nella base. La superficie laterale è $S_l = p \cdot a$, con $p$ semiperimetro di base.

Con base quadrata di lato $6$ e $h = 4$: $r = 3$ e $a = 5$. Ogni faccia vale $\frac{6 \cdot 5}{2} = 15$, quindi $S_l = 60$. Con la base, $S_t = 60 + 36 = 96$.

Un piano parallelo alla base taglia la piramide in due pezzi. Quello con la base è un **tronco di piramide**: ha due basi simili e facce laterali trapezi.

>! Nella formula $S_l = p \cdot a$ ci sono il **semi**perimetro e l'apotema. Con il perimetro intero o con l'altezza $h$ il risultato è sbagliato.` },

    { id: 'poliedri-regolari', titolo: 'Poliedri regolari e formula di Eulero', testo: R`Nel piano i poligoni regolari sono infiniti: triangolo equilatero, quadrato, pentagono, esagono e così via. Nello spazio le cose vanno in modo molto diverso.

>* Un **poliedro regolare** è un poliedro convesso con facce poligoni regolari tutti congruenti. In ogni vertice concorre lo stesso numero di facce.

### Perché sono solo cinque

In un vertice si incontrano almeno tre facce. La somma dei loro angoli deve stare sotto $360^\circ$. A $360^\circ$ le facce stanno piatte e il vertice sparisce.

| in un vertice | somma degli angoli | poliedro |
|---|---|---|
| 3 triangoli | $180^\circ$ | tetraedro |
| 4 triangoli | $240^\circ$ | ottaedro |
| 5 triangoli | $300^\circ$ | icosaedro |
| 3 quadrati | $270^\circ$ | cubo |
| 3 pentagoni | $324^\circ$ | dodecaedro |

Sei triangoli fanno già $360^\circ$, e così quattro quadrati. Tre esagoni fanno $3 \cdot 120^\circ = 360^\circ$. Con poligoni più grandi la somma supera $360^\circ$.

>* Esistono solo **cinque** poliedri regolari: tetraedro, cubo, ottaedro, dodecaedro e icosaedro.

[[grafico:gPlatonici]]

### La formula di Eulero

Conta vertici $V$, spigoli $S$ e facce $F$ di un cubo: $8 - 12 + 6 = 2$. Prova una piramide a base pentagonale: $6 - 10 + 6 = 2$. Non è un caso.

>* **Formula di Eulero.** In ogni poliedro convesso $$V - S + F = 2$$

| poliedro | $V$ | $S$ | $F$ |
|---|---|---|---|
| tetraedro | $4$ | $6$ | $4$ |
| cubo | $8$ | $12$ | $6$ |
| ottaedro | $6$ | $12$ | $8$ |
| dodecaedro | $20$ | $30$ | $12$ |
| icosaedro | $12$ | $30$ | $20$ |

Gli spigoli si contano dalle facce. L'icosaedro ha $20$ triangoli, cioè $60$ lati di faccia. Ogni spigolo è il lato di due facce: $S = 30$. Poi Eulero dà $V = 2 + S - F = 12$.

?? Un poliedro convesso ha $6$ vertici e $9$ spigoli. Quante facce ha?
=> Cinque: $F = 2 - V + S = 2 - 6 + 9 = 5$. È un prisma a base triangolare.

>! In questa formula $V$ conta i vertici, non il volume. E $S$ conta gli spigoli, non la superficie.` },

    { id: 'solidi-rotazione', titolo: 'Cilindro, cono e sfera', testo: R`Fai girare una figura piana attorno a una retta del suo piano, l'**asse**. In un giro completo descrive un **solido di rotazione**.

- Un rettangolo che gira attorno a un lato genera un **cilindro**.
- Un triangolo rettangolo che gira attorno a un cateto genera un **cono**.
- Un trapezio rettangolo che gira attorno al lato perpendicolare alle basi genera un **tronco di cono**.
- Un semicerchio che gira attorno al diametro genera una **sfera**.

[[grafico:gRotazione]]

Nel cilindro e nel cono $r$ è il raggio di base e $h$ l'altezza. Nel cono l'ipotenusa del triangolo che gira si chiama **apotema** $a$, e $a^2 = r^2 + h^2$.

Il piano che contiene l'asse taglia il cilindro in un rettangolo $2r \times h$ e il cono in un triangolo isoscele: è la **sezione assiale**. Il cilindro è **equilatero** se la sezione assiale è un quadrato, cioè $h = 2r$. Il cono è **equilatero** se è un triangolo equilatero, cioè $a = 2r$.

### Le superfici

Taglia la superficie laterale di un cilindro lungo un'altezza e stendila sul tavolo. Ottieni un rettangolo di base $2\pi r$ e altezza $h$. Quella del cono si stende in un **settore circolare** di raggio $a$, con arco lungo $2\pi r$. L'area del settore è metà dell'arco per il raggio: $\frac{1}{2} \cdot 2\pi r \cdot a$.

>* Superficie laterale: $S_l = 2\pi r h$ per il cilindro, $S_l = \pi r a$ per il cono, $S_l = \pi(r + r')\,a$ per il tronco di cono. Per la superficie totale si aggiungono i cerchi di base.

Per esempio un cono con $r = 3$ e $h = 4$ ha $a = 5$. Allora $S_l = 15\pi$ e $S_t = 15\pi + 9\pi = 24\pi$.

### La sfera

La sfera è fatta dai punti che distano al più $r$ dal centro $C$. Il suo bordo è la **superficie sferica**. Un piano a distanza $d$ dal centro, con $d < r$, la taglia in un cerchio di raggio $\sqrt{r^2 - d^2}$: è Pitagora.

La superficie sferica non si può stendere sul tavolo senza strapparla. Archimede dimostrò che vale quanto la superficie laterale del cilindro che avvolge la sfera: $2\pi r \cdot 2r$.

>* La superficie sferica vale $S = 4\pi r^2$: quattro cerchi massimi.

>! Nella superficie laterale del cono c'è l'apotema $a$, non l'altezza $h$. Con $r = 3$ e $h = 4$, il prodotto $\pi r h = 12\pi$ è sbagliato: il valore giusto è $15\pi$.` },

    { id: 'cavalieri', titolo: 'Il principio di Cavalieri: prismi e cilindri', testo: R`Il **volume** misura quanto spazio occupa un solido. Due solidi con lo stesso volume si dicono **equivalenti**. L'unità di misura è il cubo di spigolo $1$.

Un parallelepipedo rettangolo $3 \times 4 \times 5$ contiene $3 \cdot 4 = 12$ cubetti in ogni strato, e gli strati sono $5$. In tutto $60$ cubetti. In generale $V = abc$: area di base per altezza.

E un prisma storto? Lo si confronta con un parallelepipedo, fetta per fetta.

[[video:geometria-spazio/cavalieri]]

>* **Principio di Cavalieri.** Due solidi stanno fra due piani paralleli. Se ogni piano parallelo a quei due li taglia in sezioni equivalenti, allora i due solidi sono equivalenti.

Le sezioni devono avere la stessa **area**, non la stessa forma. Nella figura un quadrato e un triangolo di area $4$ bastano.

[[grafico:gCavalieri]]

Ogni piano parallelo alla base taglia un prisma in una copia della base. Confronta il prisma con un parallelepipedo rettangolo che ha base equivalente e la stessa altezza. A ogni quota le sezioni hanno area $B$: per Cavalieri i volumi sono uguali. Lo stesso vale per il cilindro, che ha per sezioni cerchi di area $\pi r^2$.

>* **Prisma**, retto od obliquo: $V = B \cdot h$. **Cilindro**: $V = \pi r^2 h$.

Un cilindro con $r = 2$ e $h = 5$ ha volume $\pi \cdot 4 \cdot 5 = 20\pi$.

?? Un prisma obliquo ha base di area $5$, spigoli laterali lunghi $10$ e altezza $8$. Quanto vale il volume?
[x] $40$
[ ] $50$
[ ] $400$
=> $V = B \cdot h = 5 \cdot 8 = 40$. L'altezza è la distanza fra le basi, non lo spigolo laterale: nel prisma obliquo lo spigolo è più lungo.

>! Nel prisma obliquo l'altezza non è lo spigolo laterale. È la distanza fra i piani delle basi.` },

    { id: 'volumi', titolo: 'Volumi di piramide, cono e sfera', testo: R`Una piramide e un prisma hanno la stessa base e la stessa altezza. Quanto è più piccola la piramide? Esattamente tre volte.

[[video:geometria-spazio/piramide-terzo]]

Un cubo di lato $a$ si divide in tre piramidi congruenti, con il vertice $O$ in comune. Ognuna vale un terzo del cubo, $\frac{1}{3}a^2 \cdot a$. Se il cubo si stira fino all'altezza $h$, i tre pezzi crescono allo stesso modo. Ognuno resta un terzo del prisma: $\frac{1}{3}a^2 h$. Per le basi qualsiasi serve Cavalieri.

Un piano a quota $k$ taglia una piramide alta $h$ in una copia rimpicciolita della base. Le lunghezze si riducono nel rapporto $\frac{h - k}{h}$, l'area nel rapporto al quadrato. Così due piramidi con basi equivalenti e la stessa altezza hanno sezioni equivalenti a ogni quota.

[[grafico:gPiramidi]]

>* **Piramide**: $V = \frac{1}{3}B \cdot h$. **Cono**: $V = \frac{1}{3}\pi r^2 h$.

Una piramide di base quadrata con lato $6$ e altezza $4$ vale $\frac{1}{3} \cdot 36 \cdot 4 = 48$. Un cono con $r = 3$ e $h = 4$ vale $\frac{1}{3} \cdot 9\pi \cdot 4 = 12\pi$.

Un tronco è la differenza fra due piramidi, o fra due coni. Con le basi $B$ e $B'$, oppure con i raggi $r$ e $r'$:
$$\begin{gathered} V = \frac{h}{3}\left(B + B' + \sqrt{B B'}\right) \\ V = \frac{\pi h}{3}\left(r^2 + r r' + r'^2\right) \end{gathered}$$

### La sfera

[[video:geometria-spazio/sfera]]

Metti accanto una semisfera di raggio $r$ e una **scodella**: un cilindro di raggio $r$ e altezza $r$, scavato da un cono. La semisfera poggia sul suo cerchio massimo. Il cono ha il vertice al centro del fondo e la base in cima.

>! Da qui in poi, come nel video, $h$ non è più un'altezza. È la **quota** del piano che taglia i due solidi: la $d$ della sezione sulla sfera.

Taglia tutti e due con un piano alla quota $h$.

~ \rho^2 = r^2 - h^2 :: semisfera: per Pitagora, con ipotenusa $r$ e un cateto $h$, il raggio $\rho$ della sezione
~ \pi\rho^2 = \evid{\pi(r^2 - h^2)} :: l'area del cerchio di sezione
~ \pi r^2 - \pi h^2 :: scodella: una corona circolare; il buco ha raggio $h$, perché il cono è largo quanto alto
~ \evidb{\pi(r^2 - h^2)} :: la stessa area, a ogni quota

Per Cavalieri semisfera e scodella hanno lo stesso volume.

~ V_{cil} = \pi r^2 \cdot r = \pi r^3 :: il cilindro della scodella
~ V_{cono} = \frac{1}{3}\pi r^3 :: il cono ha la stessa base e la stessa altezza: un terzo
~ V_{semisfera} = \pi r^3 - \frac{1}{3}\pi r^3 = \evid{\frac{2}{3}\pi r^3} :: la semisfera vale quanto la scodella
~ V = \evidb{\frac{4}{3}\pi r^3} :: la sfera è il doppio della semisfera

>* **Sfera**: $V = \frac{4}{3}\pi r^3$.

Dal volume si ritrova anche la superficie. Dividi la sfera in tante piramidi sottilissime con il vertice nel centro. Le basi coprono la superficie $S$ e le altezze valgono tutte $r$. Quindi $V = \frac{1}{3}S \cdot r$, e $S = \frac{3V}{r} = 4\pi r^2$.

>! Se raddoppi il raggio, la superficie diventa $4$ volte più grande e il volume $8$ volte. Le aree crescono col quadrato, i volumi col cubo.` }
  ],

  grafici: {
    gRettaPiano: {
      tipo: 'piano', x: [-3.7, 3.7], y: [-1.4, 2.4], assi: false, griglia: false, mirino: false,
      elementi: F_RETTA_PIANO,
      didascalia: 'Il piano α (in azzurro) e tre rette. La retta r giace su α. La retta s è parallela ad α: corre a quota costante e non lo tocca mai. La retta t è incidente: buca il piano nel punto P, e sotto il piano è tratteggiata.'
    },
    gParalleli: {
      tipo: 'piano', x: [-3.5, 3.2], y: [-1.2, 3.5], assi: false, griglia: false, mirino: false,
      elementi: F_PARALLELI,
      didascalia: 'I piani α e α′ sono paralleli. Il piano β, in verde, li taglia lungo le rette a e b, in arancio. Le due rette stanno su β e non si incontrano, perché α e α′ non hanno punti in comune: sono parallele.'
    },
    gTrePerp: {
      tipo: 'piano', x: [-4.1, 3.9], y: [-2.0, 5.2], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 'h', min: 1, max: 5, passo: 0.5, valore: 4, etichetta: 'distanza PH' }],
      elementi: F_TRE_PERP,
      didascalia: 'PH è perpendicolare al piano α, HA è perpendicolare alla retta r del piano. Allora anche PA è perpendicolare a r: i tre angoli retti sono segnati. Al variare della distanza PH, PA cambia, ma l\'angolo in A resta retto, e PA² = PH² + HA².'
    },
    gDiedro: {
      tipo: 'piano', x: [-3.9, 3.7], y: [-1.7, 3.9], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 't', min: 20, max: 180, passo: 5, valore: 70, etichetta: 'apertura del diedro (gradi)' }],
      elementi: F_DIEDRO,
      didascalia: 'Il diedro fra i semipiani α e β, con lo spigolo in viola. Il piano perpendicolare allo spigolo lo taglia nella sezione normale, in arancio: due semirette perpendicolari allo spigolo nello stesso punto. L\'angolo fra loro è l\'ampiezza del diedro.'
    },
    gParallelepipedo: {
      tipo: 'piano', x: [-1.9, 5.0], y: [-2.2, 5.6], assi: false, griglia: false, mirino: false,
      parametri: [
        { nome: 'a', min: 1, max: 4, passo: 0.5, valore: 2, etichetta: 'a' },
        { nome: 'b', min: 1, max: 5, passo: 0.5, valore: 4, etichetta: 'b' },
        { nome: 'c', min: 1, max: 4.5, passo: 0.5, valore: 4, etichetta: 'c' }
      ],
      elementi: F_PARALLELEPIPEDO,
      didascalia: 'Il parallelepipedo rettangolo di dimensioni a, b, c. La diagonale AG, in arancio, è l\'ipotenusa di un triangolo rettangolo: un cateto è la diagonale di base AC (tratteggiata), l\'altro è lo spigolo verticale c. Pitagora due volte: d² = a² + b² + c².'
    },
    gPiramide: {
      tipo: 'piano', x: [-4.1, 4.1], y: [-1.8, 4.2], assi: false, griglia: false, mirino: false,
      elementi: F_PIRAMIDE,
      didascalia: 'Una piramide regolare a base quadrata, di lato 6 e altezza h = 4. H è il centro della base, M il punto medio di un lato: HM = r = 3. L\'apotema OM, in arancio, è l\'altezza di una faccia laterale. Il triangolo OHM è rettangolo in H, quindi a = √(16 + 9) = 5.'
    },
    gPlatonici: {
      tipo: 'piano', x: [-3.8, 4.0], y: [-3.4, 2.2], assi: false, griglia: false, mirino: false,
      elementi: F_PLATONICI,
      didascalia: 'I cinque poliedri regolari, con gli spigoli nascosti tratteggiati. Tetraedro, ottaedro e icosaedro hanno facce triangolari (3, 4 e 5 in ogni vertice); il cubo ha facce quadrate, il dodecaedro pentagonali.'
    },
    gRotazione: {
      tipo: 'piano', x: [-4.3, 4.3], y: [-2.0, 1.6], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 't', min: 0, max: 360, passo: 5, valore: 110, etichetta: 'giro della figura (gradi)' }],
      elementi: F_ROTAZIONE,
      didascalia: 'Un rettangolo, un triangolo rettangolo e un semicerchio, in arancio, girano attorno all\'asse tratteggiato. In un giro completo descrivono un cilindro, un cono e una sfera.'
    },
    gCavalieri: {
      tipo: 'piano', x: [-5.0, 7.0], y: [-1.2, 4.6], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 'k', min: 0, max: 3, passo: 0.1, valore: 1.5, etichetta: 'quota k del piano' }],
      elementi: F_CAVALIERI,
      didascalia: 'Un prisma retto a base quadrata e un prisma obliquo a base triangolare: basi di area 4, altezza 3. Il piano verde a quota k li taglia in un quadrato e in un triangolo che hanno sempre area 4. Per Cavalieri hanno lo stesso volume: 4 · 3 = 12.'
    },
    gPiramidi: {
      tipo: 'piano', x: [-4.8, 6.3], y: [-1.2, 4.1], assi: false, griglia: false, mirino: false,
      parametri: [{ nome: 'k', min: 0, max: 2.9, passo: 0.1, valore: 1, etichetta: 'quota k del piano' }],
      elementi: F_PIRAMIDI,
      didascalia: 'Due piramidi alte 3 con basi equivalenti: un quadrato e un triangolo, entrambi di area 4. A quota k le sezioni sono le basi rimpicciolite del rapporto (3 − k)/3, quindi hanno ancora la stessa area. Per Cavalieri le due piramidi hanno lo stesso volume.'
    }
  },
  esempi: [
    { titolo: 'La distanza di un punto da una retta', problema: R`Il punto $P$ dista $8$ dal piano $\alpha$, e $H$ è la sua proiezione. Nel piano $\alpha$ la retta $r$ dista $6$ da $H$. Quanto dista $P$ dalla retta $r$?`, passi: [
      R`Da $H$ traccio nel piano la perpendicolare a $r$: il piede è $A$, e $\overline{HA} = 6$ perché è la distanza di $H$ da $r$.`,
      R`$PH$ è perpendicolare ad $\alpha$ e $HA$ è perpendicolare a $r$. Per il teorema delle tre perpendicolari anche $PA$ è perpendicolare a $r$: è la distanza cercata.`,
      R`$PH$ è perpendicolare a tutte le rette di $\alpha$ per $H$, quindi anche ad $HA$. Il triangolo $PHA$ è rettangolo in $H$.`,
      R`Per Pitagora: $\overline{PA} = \sqrt{8^2 + 6^2} = \sqrt{100} = 10$.`
    ], risultato: R`$P$ dista $10$ dalla retta $r$.` },

    { titolo: 'La diagonale del cubo e il suo angolo con la base', problema: R`Un cubo ha spigolo $4$. Calcola la diagonale del cubo e l'angolo che forma con il piano della base.`, passi: [
      R`La diagonale della base è la diagonale di un quadrato: $4\sqrt{2}$.`,
      R`La diagonale del cubo è l'ipotenusa del triangolo che ha per cateti la diagonale di base e uno spigolo verticale: $d = \sqrt{32 + 16} = \sqrt{48} = 4\sqrt{3} \approx 6{,}93$.`,
      R`Lo spigolo verticale è perpendicolare alla base. Quindi la diagonale di base è la proiezione della diagonale del cubo sul piano della base.`,
      R`L'angolo $\theta$ cercato sta fra la diagonale e la sua proiezione: $\tan\theta = \frac{4}{4\sqrt{2}} = \frac{1}{\sqrt{2}}$.`,
      R`Con la calcolatrice: $\theta \approx 35{,}26^\circ$.`
    ], risultato: R`$d = 4\sqrt{3} \approx 6{,}93$; angolo con la base $\approx 35{,}26^\circ$` },

    { titolo: 'Superficie e volume di una piramide regolare', problema: R`Una piramide regolare ha per base un quadrato di lato $10$ e altezza $12$. Calcola l'apotema, la superficie totale e il volume.`, passi: [
      R`Il piede dell'altezza è il centro $H$ del quadrato. La circonferenza inscritta nella base ha raggio metà lato: $r = 5$.`,
      R`Nel triangolo rettangolo formato da altezza, raggio $r$ e apotema: $a = \sqrt{12^2 + 5^2} = \sqrt{169} = 13$.`,
      R`Superficie laterale: il semiperimetro è $p = 20$, quindi $S_l = p \cdot a = 20 \cdot 13 = 260$.`,
      R`Superficie totale: aggiungo la base, $S_t = 260 + 100 = 360$.`,
      R`Volume: $V = \frac{1}{3} \cdot 100 \cdot 12 = 400$.`
    ], risultato: R`$a = 13$, $S_t = 360$, $V = 400$` },

    { titolo: 'Lo stesso triangolo, due coni diversi', problema: R`Un triangolo rettangolo ha cateti $6$ e $8$. Lo si fa girare prima attorno al cateto $8$, poi attorno al cateto $6$. Quale dei due coni ha la superficie totale maggiore? E il volume maggiore?`, passi: [
      R`L'ipotenusa è $\sqrt{36 + 64} = 10$: è l'apotema di tutti e due i coni.`,
      R`Attorno al cateto $8$: $r = 6$ e $h = 8$. Allora $S_t = \pi \cdot 6 \cdot 10 + 36\pi = 96\pi$ e $V = \frac{1}{3} \cdot 36\pi \cdot 8 = 96\pi$.`,
      R`Attorno al cateto $6$: $r = 8$ e $h = 6$. Allora $S_t = \pi \cdot 8 \cdot 10 + 64\pi = 144\pi$ e $V = \frac{1}{3} \cdot 64\pi \cdot 6 = 128\pi$.`,
      R`Vince il secondo, in tutti e due i casi. Nel volume il raggio conta di più, perché compare al quadrato.`
    ], risultato: R`Il cono con $r = 8$: $S_t = 144\pi$ e $V = 128\pi$, contro $96\pi$ e $96\pi$.` },

    { titolo: 'La sfera nel cilindro', problema: R`Una sfera di raggio $3$ è chiusa in un cilindro che la tocca sopra, sotto e tutto intorno. Confronta volumi e superfici totali.`, passi: [
      R`Il cilindro ha raggio $3$ e altezza uguale al diametro: $h = 6$.`,
      R`Sfera: $V = \frac{4}{3}\pi \cdot 27 = 36\pi$ e $S = 4\pi \cdot 9 = 36\pi$.`,
      R`Cilindro: $V = \pi \cdot 9 \cdot 6 = 54\pi$ e $S_t = 2\pi \cdot 3 \cdot 6 + 2 \cdot 9\pi = 54\pi$.`,
      R`I rapporti: $\frac{36\pi}{54\pi} = \frac{2}{3}$ per i volumi, e ancora $\frac{2}{3}$ per le superfici: la scoperta di Archimede.`
    ], risultato: R`Sfera e cilindro stanno nel rapporto $\frac{2}{3}$, sia nei volumi sia nelle superfici.` },

    { titolo: 'Il pallone da calcio e la formula di Eulero', problema: R`Il pallone da calcio classico è un poliedro con $12$ facce pentagonali e $20$ facce esagonali. Quanti spigoli e quanti vertici ha?`, passi: [
      R`Le facce sono $F = 12 + 20 = 32$.`,
      R`Conto i lati di tutte le facce: $12 \cdot 5 + 20 \cdot 6 = 180$. Ogni spigolo è il lato di due facce, quindi $S = 90$.`,
      R`Con la formula di Eulero: $V = 2 - F + S = 2 - 32 + 90 = 60$.`,
      R`Controllo: in ogni vertice si incontrano tre facce, quindi i vertici sono $\frac{180}{3} = 60$. Torna.`
    ], risultato: R`$90$ spigoli e $60$ vertici` }
  ],

  formulario: [
    { nome: 'Diagonale del parallelepipedo rettangolo', formula: R`d = \sqrt{a^2 + b^2 + c^2}`, nota: R`Nel cubo di spigolo $\ell$: $d = \ell\sqrt{3}$.` },
    { nome: 'Obliqua e distanza da un piano', formula: R`\overline{PA}^2 = \overline{PH}^2 + \overline{HA}^2`, nota: R`$H$ è la proiezione di $P$. Se $HA$ è perpendicolare a una retta $r$ del piano, $PA$ è la distanza di $P$ da $r$ (tre perpendicolari).` },
    { nome: 'Apotema della piramide retta', formula: R`a^2 = h^2 + r^2`, nota: R`$r$ è il raggio della circonferenza inscritta nella base.` },
    { nome: 'Superfici del prisma retto', formula: R`S_l = 2p \cdot h \qquad S_t = S_l + 2B`, nota: R`$2p$ è il perimetro di base, $B$ l'area di base.` },
    { nome: 'Superficie laterale della piramide retta', formula: R`S_l = p \cdot a`, nota: R`$p$ semiperimetro di base, $a$ apotema. Tronco di piramide retta: $S_l = (p + p')\,a$.` },
    { nome: 'Formula di Eulero', formula: R`V - S + F = 2`, nota: R`Vertici, spigoli e facce di un poliedro convesso.` },
    { nome: 'Cilindro', formula: R`S_l = 2\pi r h \qquad V = \pi r^2 h`, nota: R`$S_t = 2\pi r h + 2\pi r^2$.` },
    { nome: 'Cono', formula: R`\begin{gathered} a = \sqrt{r^2 + h^2} \qquad S_l = \pi r a \\ V = \frac{1}{3}\pi r^2 h \end{gathered}`, nota: R`$S_t = \pi r a + \pi r^2$.` },
    { nome: 'Tronco di cono', formula: R`\begin{gathered} S_l = \pi (r + r')\,a \\ V = \frac{\pi h}{3}\left(r^2 + r r' + r'^2\right) \end{gathered}` },
    { nome: 'Sfera', formula: R`S = 4\pi r^2 \qquad V = \frac{4}{3}\pi r^3`, nota: R`Un piano a distanza $d < r$ dal centro la taglia in un cerchio di raggio $\sqrt{r^2 - d^2}$.` },
    { nome: 'Prisma e cilindro', formula: R`V = B \cdot h`, nota: R`Vale anche per il prisma obliquo: $h$ è la distanza fra le basi.` },
    { nome: 'Piramide e cono', formula: R`V = \frac{1}{3}B \cdot h`, nota: R`Un terzo del prisma, o del cilindro, con la stessa base e la stessa altezza.` },
    { nome: 'Tronco di piramide', formula: R`V = \frac{h}{3}\left(B + B' + \sqrt{B B'}\right)`, nota: R`$B$ e $B'$ sono le aree delle due basi.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'rette-piani', tipo: 'definizione', fronte: R`Quando due rette dello spazio sono sghembe?`, retro: R`Quando non esiste un piano che le contenga entrambe. Non si incontrano e non sono parallele.` },
    { id: 'fc-02', sezione: 'rette-piani', tipo: 'concetto', fronte: R`Con che cosa si individua un piano?`, retro: R`Con tre punti non allineati, una retta e un punto fuori di essa, due rette incidenti, oppure due rette parallele distinte.` },
    { id: 'fc-03', sezione: 'rette-piani', tipo: 'concetto', fronte: R`Quali posizioni può avere una retta rispetto a un piano?`, retro: R`Giacente (infiniti punti in comune), incidente (un punto), parallela (nessun punto).` },
    { id: 'fc-04', sezione: 'parallelismo', tipo: 'procedura', fronte: R`Come si riconosce che una retta esterna a un piano è parallela al piano?`, retro: R`Basta che sia parallela a una retta del piano.` },
    { id: 'fc-05', sezione: 'parallelismo', tipo: 'procedura', fronte: R`Come si riconosce che due piani sono paralleli?`, retro: R`Uno dei due contiene due rette incidenti, entrambe parallele all'altro piano.` },
    { id: 'fc-06', sezione: 'parallelismo', tipo: 'concetto', fronte: R`Due piani paralleli sono tagliati da un terzo piano. Che cosa sono le rette di intersezione?`, retro: R`Due rette parallele.` },
    { id: 'fc-07', sezione: 'perpendicolarita', tipo: 'definizione', fronte: R`Quando una retta è perpendicolare a un piano?`, retro: R`Quando incontra il piano in un punto $H$ ed è perpendicolare a tutte le rette del piano che passano per $H$.` },
    { id: 'fc-08', sezione: 'perpendicolarita', tipo: 'procedura', fronte: R`Criterio di perpendicolarità fra retta e piano`, retro: R`Basta che la retta sia perpendicolare a due rette incidenti del piano, nel loro punto d'incontro.` },
    { id: 'fc-09', sezione: 'perpendicolarita', tipo: 'concetto', fronte: R`Teorema delle tre perpendicolari`, retro: R`Se $PH$ è perpendicolare al piano $\alpha$ e $HA$ è perpendicolare a una retta $r$ di $\alpha$ (con $A$ su $r$), allora $PA$ è perpendicolare a $r$.` },
    { id: 'fc-10', sezione: 'perpendicolarita', tipo: 'definizione', fronte: R`Che cos'è la distanza di un punto da un piano?`, retro: R`La lunghezza del segmento perpendicolare $PH$, con $H$ proiezione di $P$ sul piano. Ogni obliqua $PA$ è più lunga.` },
    { id: 'fc-11', sezione: 'diedri-distanze', tipo: 'definizione', fronte: R`Come si misura l'ampiezza di un diedro?`, retro: R`Con la sezione normale: l'angolo staccato da un piano perpendicolare allo spigolo.` },
    { id: 'fc-12', sezione: 'diedri-distanze', tipo: 'definizione', fronte: R`Che cos'è l'angolo fra una retta e un piano?`, retro: R`L'angolo acuto fra la retta e la sua proiezione sul piano.` },
    { id: 'fc-13', sezione: 'diedri-distanze', tipo: 'definizione', fronte: R`Distanza fra due rette sghembe`, retro: R`La lunghezza della perpendicolare comune, il segmento che le incontra entrambe ad angolo retto.` },
    { id: 'fc-14', sezione: 'diedri-distanze', tipo: 'procedura', fronte: R`Quando due piani sono perpendicolari?`, retro: R`Quando formano quattro diedri retti. Succede se uno dei due contiene una retta perpendicolare all'altro.` },
    { id: 'fc-15', sezione: 'prismi-piramidi', tipo: 'formula', fronte: R`Diagonale del parallelepipedo rettangolo di dimensioni $a$, $b$, $c$`, retro: R`$d = \sqrt{a^2 + b^2 + c^2}$; nel cubo di spigolo $\ell$, $d = \ell\sqrt{3}$.` },
    { id: 'fc-16', sezione: 'prismi-piramidi', tipo: 'formula', fronte: R`Apotema $a$ di una piramide retta`, retro: R`$a^2 = h^2 + r^2$, con $h$ altezza e $r$ raggio della circonferenza inscritta nella base.` },
    { id: 'fc-17', sezione: 'prismi-piramidi', tipo: 'formula', fronte: R`Superficie laterale di prisma retto e piramide retta`, retro: R`Prisma: $S_l = 2p \cdot h$. Piramide: $S_l = p \cdot a$, con $p$ semiperimetro e $a$ apotema.` },
    { id: 'fc-18', sezione: 'poliedri-regolari', tipo: 'concetto', fronte: R`Quali sono i poliedri regolari?`, retro: R`Cinque: tetraedro, cubo, ottaedro, dodecaedro e icosaedro.` },
    { id: 'fc-19', sezione: 'poliedri-regolari', tipo: 'concetto', fronte: R`Perché i poliedri regolari sono solo cinque?`, retro: R`In un vertice concorrono almeno tre facce, e i loro angoli devono sommare meno di $360^\circ$. Funzionano solo 3, 4 o 5 triangoli, 3 quadrati e 3 pentagoni.` },
    { id: 'fc-20', sezione: 'poliedri-regolari', tipo: 'formula', fronte: R`Formula di Eulero`, retro: R`$V - S + F = 2$: vertici meno spigoli più facce, in ogni poliedro convesso.` },
    { id: 'fc-21', sezione: 'solidi-rotazione', tipo: 'formula', fronte: R`Superficie laterale di cilindro e cono`, retro: R`Cilindro: $S_l = 2\pi r h$. Cono: $S_l = \pi r a$, con $a = \sqrt{r^2 + h^2}$ apotema.` },
    { id: 'fc-22', sezione: 'solidi-rotazione', tipo: 'formula', fronte: R`Superficie della sfera`, retro: R`$S = 4\pi r^2$: quanto la superficie laterale del cilindro che la avvolge.` },
    { id: 'fc-23', sezione: 'cavalieri', tipo: 'concetto', fronte: R`Principio di Cavalieri`, retro: R`Se ogni piano parallelo a un piano dato taglia due solidi in sezioni equivalenti, i due solidi sono equivalenti.` },
    { id: 'fc-24', sezione: 'cavalieri', tipo: 'formula', fronte: R`Volume di prisma e cilindro`, retro: R`$V = B \cdot h$, anche obliqui; per il cilindro $V = \pi r^2 h$.` },
    { id: 'fc-25', sezione: 'volumi', tipo: 'formula', fronte: R`Volume di piramide e cono`, retro: R`$V = \frac{1}{3}B \cdot h$: un terzo del prisma con stessa base e stessa altezza. Cono: $\frac{1}{3}\pi r^2 h$.` },
    { id: 'fc-26', sezione: 'volumi', tipo: 'formula', fronte: R`Volume della sfera`, retro: R`$V = \frac{4}{3}\pi r^3$: il doppio della semisfera, che vale cilindro meno cono.` }
  ],
  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`In un cubo fissa uno spigolo. Quanti degli altri $11$ spigoli sono sghembi rispetto a lui?`, suggerimenti: [R`Dividi gli altri spigoli in tre gruppi: paralleli, incidenti, sghembi.`, R`Gli spigoli paralleli sono $3$; quelli incidenti partono dai suoi due estremi, due per estremo.`], risposta: num(4, 'un numero'), soluzione: [R`Paralleli: i $3$ spigoli con la stessa direzione.`, R`Incidenti: da ogni estremo partono altri $2$ spigoli, quindi $4$.`, R`Sghembi: $11 - 3 - 4 = 4$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Cinque punti sono disposti in modo che mai quattro stiano su uno stesso piano. Quanti piani passano per tre di essi?`, suggerimenti: [R`Tre punti non allineati individuano un solo piano: conta i gruppi di tre punti.`, R`I gruppi di $3$ punti scelti fra $5$ sono $\binom{5}{3}$.`], risposta: num(10, 'un numero'), soluzione: [R`Nessuna terna è allineata, altrimenti quattro punti starebbero su un piano. Quindi ogni terna individua un piano.`, R`Piani diversi per terne diverse, perché quattro punti non sono mai complanari.`, R`Le terne sono $\binom{5}{3} = \frac{5 \cdot 4 \cdot 3}{6} = 10$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Un piano taglia due piani paralleli. Come sono fra loro le due rette di intersezione? Rispondi con una parola.`, suggerimenti: [R`Le due rette stanno tutte e due sul piano che taglia.`, R`Possono incontrarsi, se i piani paralleli non hanno punti in comune?`], risposta: PARALLELE, soluzione: [R`Le due rette stanno sullo stesso piano, quello che taglia: sono complanari.`, R`Non si incontrano, perché stanno su due piani paralleli, senza punti in comune.`, R`Complanari e senza punti in comune: sono parallele.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`$PH$ è perpendicolare al piano $\alpha$, con $\overline{PH} = 5$. Nel piano, la retta $r$ dista $12$ da $H$. Quanto dista $P$ dalla retta $r$?`, suggerimenti: [R`Usa il teorema delle tre perpendicolari: la distanza è $PA$, con $A$ piede della perpendicolare da $H$ a $r$.`, R`Il triangolo $PHA$ è rettangolo in $H$.`], risposta: num(13), soluzione: [R`Sia $A$ il piede della perpendicolare da $H$ a $r$: $\overline{HA} = 12$. Per le tre perpendicolari $PA$ è perpendicolare a $r$.`, R`$\overline{PA} = \sqrt{5^2 + 12^2} = \sqrt{169} = 13$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Il punto $P$ dista $9$ da un piano. Un'obliqua $PA$ è lunga $15$. Quanto dista $A$ dalla proiezione $H$ di $P$?`, suggerimenti: [R`Il triangolo $PHA$ è rettangolo in $H$, con ipotenusa $PA$.`], risposta: num(12), soluzione: [R`$\overline{HA}^2 = \overline{PA}^2 - \overline{PH}^2 = 225 - 81 = 144$.`, R`$\overline{HA} = 12$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Il punto $P$ dista $6$ dal piano $\alpha$, e la sua proiezione $H$ dista $6$ dal punto $A$ di $\alpha$. Che angolo forma la retta $PA$ con il piano?`, suggerimenti: [R`L'angolo cercato è $\widehat{PAH}$: la proiezione di $PA$ sul piano è $HA$.`, R`Il triangolo $PHA$ è rettangolo in $H$, con i due cateti uguali.`], risposta: gradi(45), soluzione: [R`La proiezione della retta $PA$ è la retta $HA$, quindi l'angolo è $\widehat{PAH}$.`, R`Il triangolo $PHA$ è rettangolo in $H$ e isoscele, con cateti $6$ e $6$.`, R`Gli angoli acuti di un triangolo rettangolo isoscele valgono $45^\circ$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Due piani incidenti formano quattro diedri. Uno misura $65^\circ$. Quanto misura uno dei due diedri accanto a lui?`, suggerimenti: [R`Guarda la sezione normale: è una coppia di rette incidenti, con quattro angoli.`], risposta: gradi(115), soluzione: [R`Un piano perpendicolare allo spigolo taglia i due piani lungo due rette incidenti.`, R`I due diedri vicini hanno per sezioni normali due angoli adiacenti: insieme fanno $180^\circ$.`, R`$180^\circ - 65^\circ = 115^\circ$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Un cubo ha spigolo $7$. Quanto distano due suoi spigoli sghembi?`, suggerimenti: [R`Cerca il segmento perpendicolare a tutti e due.`, R`È un terzo spigolo del cubo.`], risposta: num(7), soluzione: [R`Due spigoli sghembi del cubo sono collegati da un terzo spigolo, perpendicolare a entrambi.`, R`È la loro perpendicolare comune: la distanza vale $7$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Un parallelepipedo rettangolo ha dimensioni $2$, $3$ e $6$. Quanto è lunga la sua diagonale?`, suggerimenti: [R`$d = \sqrt{a^2 + b^2 + c^2}$.`], risposta: num(7), soluzione: [R`$d = \sqrt{4 + 9 + 36} = \sqrt{49}$.`, R`$d = 7$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Un cubo ha spigolo $5$. Quanto è lunga la sua diagonale?`, suggerimenti: [R`Nel cubo le tre dimensioni sono uguali: $d = \sqrt{3\ell^2}$.`], risposta: num(5 * Math.sqrt(3), 'es. 2√7 o 5,29'), soluzione: [R`$d = \sqrt{25 + 25 + 25} = \sqrt{75}$.`, R`$\sqrt{75} = 5\sqrt{3} \approx 8{,}66$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Una piramide regolare ha per base un quadrato di lato $16$ e altezza $6$. Quanto misura l'apotema?`, suggerimenti: [R`Il raggio della circonferenza inscritta in un quadrato è metà lato.`, R`$a^2 = h^2 + r^2$.`], risposta: num(10), soluzione: [R`Il raggio della circonferenza inscritta nella base è $r = 8$.`, R`$a = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Una piramide regolare ha per base un quadrato di lato $5$ e apotema $9$. Calcola la superficie laterale.`, suggerimenti: [R`$S_l = p \cdot a$, con $p$ semiperimetro di base.`], risposta: num(90), soluzione: [R`Il semiperimetro di base è $p = \frac{4 \cdot 5}{2} = 10$.`, R`$S_l = 10 \cdot 9 = 90$. Controllo: quattro triangoli di area $\frac{5 \cdot 9}{2} = 22{,}5$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Un poliedro convesso ha $10$ vertici e $15$ spigoli. Quante facce ha?`, suggerimenti: [R`Usa la formula di Eulero $V - S + F = 2$.`], risposta: num(7, 'un numero'), soluzione: [R`$F = 2 - V + S = 2 - 10 + 15$.`, R`$F = 7$: per esempio un prisma a base pentagonale.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Un prisma ha $18$ spigoli. Quante facce ha?`, suggerimenti: [R`Un prisma con base di $n$ lati ha $n$ spigoli in ogni base e $n$ spigoli laterali.`, R`Quindi gli spigoli sono $3n$.`], risposta: num(8, 'un numero'), soluzione: [R`$3n = 18$, quindi la base è un esagono: $n = 6$.`, R`Le facce sono le $6$ laterali più le $2$ basi: $8$.`, R`Controllo con Eulero: $V = 12$, e $12 - 18 + 8 = 2$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Un cilindro ha raggio $3$ e altezza $5$. Calcola la superficie laterale. Scrivi il risultato con $\pi$.`, suggerimenti: [R`$S_l = 2\pi r h$.`], risposta: conPi(30), soluzione: [R`$S_l = 2\pi \cdot 3 \cdot 5$.`, R`$S_l = 30\pi$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Un cono ha raggio $5$ e altezza $12$. Calcola la superficie laterale. Scrivi il risultato con $\pi$.`, suggerimenti: [R`Prima l'apotema: $a = \sqrt{r^2 + h^2}$.`, R`Poi $S_l = \pi r a$.`], risposta: conPi(65), soluzione: [R`$a = \sqrt{25 + 144} = 13$.`, R`$S_l = \pi \cdot 5 \cdot 13 = 65\pi$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Calcola la superficie di una sfera di raggio $5$. Scrivi il risultato con $\pi$.`, suggerimenti: [R`$S = 4\pi r^2$.`], risposta: conPi(100), soluzione: [R`$S = 4\pi \cdot 25$.`, R`$S = 100\pi$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Un prisma retto ha per base un triangolo rettangolo con cateti $3$ e $4$, e altezza $7$. Calcola il volume.`, suggerimenti: [R`Prima l'area di base, poi $V = B \cdot h$.`], risposta: num(42), soluzione: [R`$B = \frac{3 \cdot 4}{2} = 6$.`, R`$V = 6 \cdot 7 = 42$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Un cilindro ha raggio $4$ e altezza $3$. Calcola il volume. Scrivi il risultato con $\pi$.`, suggerimenti: [R`$V = \pi r^2 h$.`], risposta: conPi(48), soluzione: [R`$V = \pi \cdot 16 \cdot 3$.`, R`$V = 48\pi$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Una piramide ha base di area $30$ e altezza $7$. Calcola il volume.`, suggerimenti: [R`$V = \frac{1}{3}B \cdot h$.`], risposta: num(70), soluzione: [R`$V = \frac{1}{3} \cdot 30 \cdot 7$.`, R`$V = 70$.`] },

    { id: 'es-01', difficolta: 2, testo: R`Il triangolo $ABC$ è rettangolo in $A$, con $\overline{AB} = 6$ e $\overline{AC} = 8$. Da $A$ si alza il segmento $AP$ perpendicolare al piano del triangolo, lungo $3{,}6$. Quanto dista $P$ dalla retta $BC$?`, suggerimenti: [R`Tre perpendicolari: da $A$ traccia la perpendicolare $AD$ a $BC$ nel piano del triangolo.`, R`$AD$ è l'altezza relativa all'ipotenusa: $\frac{\overline{AB} \cdot \overline{AC}}{\overline{BC}}$.`, R`Poi $\overline{PD} = \sqrt{\overline{AP}^2 + \overline{AD}^2}$.`], risposta: num(6), soluzione: [R`L'ipotenusa è $\overline{BC} = 10$. L'altezza relativa all'ipotenusa è $\overline{AD} = \frac{6 \cdot 8}{10} = 4{,}8$.`, R`$AP$ è perpendicolare al piano e $AD$ è perpendicolare a $BC$: per le tre perpendicolari $PD$ è perpendicolare a $BC$.`, R`$\overline{PD} = \sqrt{3{,}6^2 + 4{,}8^2} = \sqrt{12{,}96 + 23{,}04} = \sqrt{36} = 6$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Una piramide regolare ha per base un quadrato di lato $6$ e altezza $3\sqrt{3}$. Quanto misura il diedro fra una faccia laterale e la base?`, suggerimenti: [R`La sezione normale del diedro sta nel piano per l'altezza e per il punto medio $M$ di un lato di base.`, R`L'angolo cercato è $\widehat{OMH}$, nel triangolo rettangolo $OHM$.`], risposta: gradi(60), soluzione: [R`Sia $M$ il punto medio di un lato. $HM$ e l'apotema $OM$ sono perpendicolari al lato nello stesso punto $M$: l'angolo $\widehat{OMH}$ è la sezione normale.`, R`$\overline{HM} = 3$ e $\overline{OH} = 3\sqrt{3}$, quindi $\tan\widehat{OMH} = \sqrt{3}$.`, R`L'angolo è di $60^\circ$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Un parallelepipedo rettangolo ha dimensioni di base $3$ e $4$ e altezza $12$. Quanto è lunga la diagonale? Che angolo forma con il piano della base? Scrivi l'angolo in gradi, ai centesimi.`, suggerimenti: [R`La proiezione della diagonale sulla base è la diagonale di base.`, R`Nel triangolo rettangolo i cateti sono la diagonale di base e l'altezza.`], risposta: { tipo: 'numeri', valori: [67.38], tolleranza: 0.02, segnaposto: 'l\'angolo in gradi, es. 41,25', simboli: ['°'] }, soluzione: [R`Diagonale di base: $\sqrt{9 + 16} = 5$. Diagonale: $\sqrt{25 + 144} = 13$.`, R`L'angolo $\theta$ con la base ha $\tan\theta = \frac{12}{5}$.`, R`$\theta \approx 67{,}38^\circ$.`] },
    { id: 'es-04', difficolta: 3, testo: R`Calcola il volume di un tetraedro regolare di spigolo $6$.`, suggerimenti: [R`La base è un triangolo equilatero: area $\frac{\sqrt{3}}{4}\ell^2$.`, R`Il piede dell'altezza è il centro del triangolo, che dista $\frac{\ell}{\sqrt{3}}$ da ogni vertice.`, R`L'altezza è un cateto: l'ipotenusa è uno spigolo laterale.`], risposta: num(18 * Math.sqrt(2), 'es. 12√3 o 20,78'), soluzione: [R`Area di base: $B = \frac{\sqrt{3}}{4} \cdot 36 = 9\sqrt{3}$.`, R`Il centro della base dista dai vertici $\frac{6}{\sqrt{3}} = 2\sqrt{3}$. Altezza: $h = \sqrt{36 - 12} = \sqrt{24} = 2\sqrt{6}$.`, R`$V = \frac{1}{3} \cdot 9\sqrt{3} \cdot 2\sqrt{6} = 6\sqrt{18} = 18\sqrt{2} \approx 25{,}46$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Un poliedro convesso ha $6$ facce quadrate e $8$ facce esagonali. Quanti vertici ha?`, suggerimenti: [R`Conta i lati di tutte le facce, poi dividi per due: sono gli spigoli.`, R`Poi usa $V - S + F = 2$.`], risposta: num(24, 'un numero'), soluzione: [R`Lati di faccia: $6 \cdot 4 + 8 \cdot 6 = 72$. Ogni spigolo è il lato di due facce: $S = 36$.`, R`$F = 14$, quindi $V = 2 - 14 + 36 = 24$.`, R`È l'ottaedro troncato: in ogni vertice si incontrano tre facce, e infatti $\frac{72}{3} = 24$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Un tronco di cono ha raggi $6$ e $3$ e altezza $4$. Calcola il volume, con $\pi$. Poi calcola anche la superficie laterale.`, suggerimenti: [R`$V = \frac{\pi h}{3}(r^2 + r r' + r'^2)$.`, R`Per la superficie serve l'apotema del tronco: un cateto è $h$, l'altro è $r - r'$.`], risposta: conPi(84), soluzione: [R`$V = \frac{4\pi}{3}(36 + 18 + 9) = \frac{4\pi}{3} \cdot 63 = 84\pi$.`, R`Controllo: il tronco è un cono con $r = 6$ e $h = 8$ meno un cono con $r = 3$ e $h = 4$. Fa $96\pi - 12\pi = 84\pi$.`, R`Apotema: $a = \sqrt{16 + 9} = 5$. Superficie laterale: $S_l = \pi(6 + 3) \cdot 5 = 45\pi$.`] },
    { id: 'es-07', difficolta: 1, testo: R`Un cono è equilatero. Quante volte la sua superficie laterale contiene l'area di base?`, suggerimenti: [R`Nel cono equilatero l'apotema è il diametro: $a = 2r$.`], risposta: num(2, 'un numero'), soluzione: [R`$S_l = \pi r a = \pi r \cdot 2r = 2\pi r^2$.`, R`$\frac{S_l}{B} = \frac{2\pi r^2}{\pi r^2} = 2$.`] },
    { id: 'es-08', difficolta: 2, testo: R`In un cubo di spigolo $6$ è inscritta una sfera, che tocca tutte le facce. Quanto spazio resta fra la sfera e il cubo? Approssima ai centesimi.`, suggerimenti: [R`Il diametro della sfera è lo spigolo del cubo.`, R`Sottrai il volume della sfera da quello del cubo.`], risposta: num(216 - 36 * Math.PI, 'es. 51,13'), soluzione: [R`Il raggio della sfera è $3$, quindi $V_{sfera} = \frac{4}{3}\pi \cdot 27 = 36\pi$.`, R`$V_{cubo} = 216$.`, R`Resta $216 - 36\pi \approx 102{,}90$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Un bicchiere conico alto $12$, con raggio $4$, è pieno d'acqua. La verso in un bicchiere cilindrico di raggio $4$. Fino a che altezza arriva l'acqua?`, suggerimenti: [R`Il volume dell'acqua non cambia.`, R`Cono e cilindro hanno la stessa base: pensa al fattore $\frac{1}{3}$.`], risposta: num(4), soluzione: [R`Volume dell'acqua: $\frac{1}{3}\pi \cdot 16 \cdot 12 = 64\pi$.`, R`Nel cilindro: $\pi \cdot 16 \cdot h = 64\pi$, quindi $h = 4$.`, R`Era prevedibile: stessa base, quindi un terzo dell'altezza.`] },
    { id: 'es-10', difficolta: 2, testo: R`Da un cubo di spigolo $6$ si taglia via un vertice, con il piano che passa per i tre vertici a lui vicini. Che volume ha il pezzo tagliato?`, suggerimenti: [R`Il pezzo è una piramide: la base è mezza faccia del cubo.`, R`L'altezza è lo spigolo che parte dal vertice tagliato.`], risposta: num(36), soluzione: [R`Il pezzo è un tetraedro con tre spigoli lunghi $6$, a due a due perpendicolari.`, R`Prendo per base il triangolo rettangolo su una faccia: $B = \frac{6 \cdot 6}{2} = 18$. L'altezza è il terzo spigolo, $6$.`, R`$V = \frac{1}{3} \cdot 18 \cdot 6 = 36$, cioè un sesto del cubo.`] },
    { id: 'es-11', difficolta: 2, testo: R`Una sfera ha superficie $64\pi$. Calcola il volume. Scrivi il risultato con $\pi$.`, suggerimenti: [R`Da $4\pi r^2 = 64\pi$ ricava il raggio.`], risposta: conPi(256 / 3, 'con π, es. 4π/3'), soluzione: [R`$r^2 = 16$, quindi $r = 4$.`, R`$V = \frac{4}{3}\pi \cdot 64 = \frac{256}{3}\pi \approx 268{,}08$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un cono alto $8$ è inscritto in una sfera di raggio $5$: il vertice e la circonferenza di base stanno sulla sfera. Calcola il volume del cono, con $\pi$.`, suggerimenti: [R`Disegna la sezione assiale: un triangolo isoscele inscritto in un cerchio di raggio $5$.`, R`Il centro della sfera sta sull'altezza, a distanza $8 - 5 = 3$ dalla base.`, R`Il raggio di base è un cateto: $r^2 = 5^2 - 3^2$.`], risposta: conPi(128 / 3, 'con π, es. 4π/3'), soluzione: [R`Il centro $C$ della sfera sta sull'altezza del cono, a distanza $5$ dal vertice: dista $8 - 5 = 3$ dal centro della base.`, R`Un punto della circonferenza di base dista $5$ da $C$. Quindi $r = \sqrt{25 - 9} = 4$.`, R`$V = \frac{1}{3}\pi \cdot 16 \cdot 8 = \frac{128}{3}\pi$.`] }
  ],
  quiz: [
    { id: 'q-01', domanda: R`Due rette dello spazio non si incontrano e non sono parallele. Come si chiamano?`, opzioni: [R`perpendicolari`, R`incidenti`, R`sghembe`, R`coincidenti`], corretta: 2, spiegazione: R`Sono sghembe: non esiste un piano che le contenga. Incidenti vuol dire con un punto in comune, e due rette perpendicolari sono incidenti.` },
    { id: 'q-02', domanda: R`Quanti piani passano per una retta?`, opzioni: [R`infiniti`, R`uno solo`, R`due`, R`nessuno`], corretta: 0, spiegazione: R`Sono infiniti: il piano può girare attorno alla retta, come una porta sui cardini. Per fissarne uno serve un punto in più, fuori dalla retta.` },
    { id: 'q-03', domanda: R`Quale di questi dati individua un solo piano?`, opzioni: [R`tre punti allineati`, R`due rette sghembe`, R`una retta e un suo punto`, R`due rette incidenti`], corretta: 3, spiegazione: R`Due rette incidenti stanno su un solo piano. Per tre punti allineati, o per una retta e un suo punto, ne passano infiniti. Due rette sghembe non stanno su nessun piano.` },
    { id: 'q-04', domanda: R`La retta $r$ è parallela al piano $\alpha$ e non giace su $\alpha$. Quale affermazione è vera?`, opzioni: [R`$r$ è parallela a tutte le rette di $\alpha$`, R`$r$ è parallela ad almeno una retta di $\alpha$`, R`$r$ incontra $\alpha$ in un punto`, R`$r$ è perpendicolare a tutte le rette di $\alpha$`], corretta: 1, spiegazione: R`In $\alpha$ ci sono rette parallele a $r$, ma con molte altre rette del piano $r$ è sghemba. E siccome sta fuori dal piano ed è parallela, non lo incontra. Non è perpendicolare a nessuna retta per un suo punto di $\alpha$, perché non ne ha.` },
    { id: 'q-05', domanda: R`Per essere sicuri che una retta sia perpendicolare a un piano, basta che sia perpendicolare a…`, opzioni: [R`una retta del piano che passa per il suo piede`, R`due rette parallele del piano, anche lontane dal piede`, R`due rette del piano che passano per il suo piede`, R`una retta qualunque del piano, anche lontana dal piede`], corretta: 2, spiegazione: R`Servono due rette incidenti del piano, nel punto in cui la retta lo buca. Con una sola retta, o con due parallele, la retta potrebbe essere inclinata nell'altra direzione.` },
    { id: 'q-06', domanda: R`$PH$ è perpendicolare al piano $\alpha$ e $r$ è una retta di $\alpha$. Quando $PA$ è perpendicolare a $r$, con $A$ su $r$?`, opzioni: [R`quando $HA$ è perpendicolare a $r$`, R`sempre, per ogni punto $A$ di $r$`, R`quando $A$ è il punto di $r$ più lontano da $H$`, R`mai, perché $PA$ non sta in $\alpha$`], corretta: 0, spiegazione: R`È il teorema delle tre perpendicolari: se $HA$ è perpendicolare a $r$, anche $PA$ lo è. Per gli altri punti di $r$ il segmento $PA$ è obliquo rispetto a $r$.` },
    { id: 'q-07', domanda: R`Come si misura l'ampiezza di un diedro?`, opzioni: [R`con l'angolo fra due rette qualunque delle due facce`, R`con l'angolo fra lo spigolo e una faccia`, R`con la lunghezza dello spigolo comune alle due facce`, R`con la sua sezione normale`], corretta: 3, spiegazione: R`Si usa la sezione normale, l'angolo staccato da un piano perpendicolare allo spigolo. Quel piano taglia le facce lungo due semirette perpendicolari allo spigolo. Due rette qualunque delle facce danno angoli diversi.` },
    { id: 'q-08', domanda: R`Due piani sono perpendicolari a uno stesso piano. Allora fra loro sono…`, opzioni: [R`sempre paralleli fra loro, come due pareti opposte`, R`paralleli oppure incidenti`, R`sempre perpendicolari fra loro, come due pareti vicine`, R`sempre coincidenti, cioè lo stesso piano`], corretta: 1, spiegazione: R`Pensa alle pareti di una stanza, tutte perpendicolari al pavimento. Due pareti opposte sono parallele, due pareti vicine si incontrano lungo uno spigolo.` },
    { id: 'q-09', domanda: R`Che cos'è l'angolo fra una retta e un piano?`, opzioni: [R`l'angolo acuto fra la retta e la sua proiezione sul piano`, R`l'angolo fra la retta e una retta qualunque del piano`, R`l'angolo ottuso fra la retta e la sua proiezione sul piano`, R`l'angolo fra la retta e la perpendicolare al piano`], corretta: 0, spiegazione: R`Si usa la proiezione della retta sul piano: fra le rette del piano è quella che forma l'angolo più piccolo. Dei due angoli fra retta e proiezione si prende quello acuto. L'angolo con la perpendicolare al piano è il suo complementare.` },
    { id: 'q-10', domanda: R`Come si misura la distanza fra due rette sghembe?`, opzioni: [R`con un segmento qualunque che le unisce`, R`con l'angolo fra le loro direzioni`, R`con la perpendicolare comune alle due rette`, R`non si può misurare, perché non si incontrano mai`], corretta: 2, spiegazione: R`Esiste un solo segmento che incontra le due rette ad angolo retto: la perpendicolare comune. È il più corto fra tutti i segmenti che le uniscono.` },
    { id: 'q-11', domanda: R`Quanti sono i poliedri regolari?`, opzioni: [R`quattro`, R`sei`, R`infiniti, come i poligoni regolari`, R`cinque`], corretta: 3, spiegazione: R`Sono cinque: tetraedro, cubo, ottaedro, dodecaedro, icosaedro. Gli angoli delle facce in un vertice devono sommare meno di $360^\circ$, e le scelte possibili sono solo cinque.` },
    { id: 'q-12', domanda: R`Perché non esiste un poliedro regolare con facce esagonali?`, opzioni: [R`perché i suoi angoli sono troppo piccoli per chiudere un vertice`, R`perché tre esagoni in un vertice fanno già $360^\circ$`, R`perché l'esagono regolare non si costruisce con riga e compasso`, R`perché due esagoni non possono avere uno spigolo in comune`], corretta: 1, spiegazione: R`Ogni angolo dell'esagono regolare vale $120^\circ$: è troppo grande, non troppo piccolo. Tre esagoni in un vertice fanno $360^\circ$ e stanno piatti, come le celle di un alveare. L'esagono si costruisce con riga e compasso, e due esagoni possono avere un lato in comune.` },
    { id: 'q-13', domanda: R`Una piramide a base esagonale ha $7$ vertici e $7$ facce. Quanti spigoli ha?`, opzioni: [R`$12$`, R`$14$`, R`$10$`, R`$7$`], corretta: 0, spiegazione: R`Per Eulero $S = V + F - 2 = 12$: sei spigoli di base e sei laterali. Chi risponde $14$ somma vertici e facce senza togliere $2$.` },
    { id: 'q-14', domanda: R`Che figura si ottiene stendendo sul piano la superficie laterale di un cono?`, opzioni: [R`un triangolo isoscele`, R`un trapezio`, R`un settore circolare`, R`un cerchio intero`], corretta: 2, spiegazione: R`È un settore circolare: il raggio è l'apotema $a$ e l'arco è lungo quanto la circonferenza di base, $2\pi r$. Per questo $S_l = \pi r a$.` },
    { id: 'q-15', domanda: R`Il principio di Cavalieri dice che due solidi sono equivalenti se, a ogni quota, le loro sezioni…`, opzioni: [R`sono congruenti`, R`hanno lo stesso perimetro`, R`sono simili`, R`hanno la stessa area`], corretta: 3, spiegazione: R`Conta solo l'area delle sezioni, non la forma. Un quadrato e un triangolo di area $4$, tagliati a ogni quota, bastano a dare lo stesso volume.` },
    { id: 'q-16', domanda: R`Un cono e un cilindro hanno la stessa base e la stessa altezza. Che parte del cilindro è il cono?`, opzioni: [R`la metà`, R`un terzo`, R`due terzi`, R`un quarto`], corretta: 1, spiegazione: R`Come la piramide rispetto al prisma: $V_{cono} = \frac{1}{3}\pi r^2 h$. I due terzi sono invece il rapporto fra la sfera e il cilindro che la contiene.` },
    { id: 'q-17', domanda: R`Il raggio di una sfera raddoppia. Che cosa succede al volume?`, opzioni: [R`raddoppia`, R`diventa $4$ volte`, R`diventa $8$ volte`, R`diventa $6$ volte`], corretta: 2, spiegazione: R`Nel volume il raggio compare al cubo: $2^3 = 8$. Diventa $4$ volte la superficie, dove il raggio è al quadrato.` },
    { id: 'q-18', domanda: R`Un prisma obliquo e un prisma retto hanno basi equivalenti. Quando hanno lo stesso volume?`, opzioni: [R`quando hanno la stessa altezza`, R`quando hanno spigoli laterali uguali`, R`mai: l'obliquo è sempre più grande`, R`mai: l'obliquo è sempre più piccolo`], corretta: 0, spiegazione: R`Per Cavalieri contano base e altezza: $V = B \cdot h$. Con spigoli laterali uguali l'obliquo è più basso, quindi ha meno volume.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Nei problemi sui solidi cerca un triangolo rettangolo: altezza, apotema, raggio, diagonale. Disegnalo a parte, nel piano, e usa Pitagora.` },
    { tipo: 'errore', testo: R`Due rette che non si incontrano non sono per forza parallele. Nello spazio possono essere sghembe.` },
    { tipo: 'errore', testo: R`La superficie laterale del cono è $\pi r a$, con l'apotema $a$. Non $\pi r h$: l'altezza sta dentro il cono, non sulla sua superficie.` },
    { tipo: 'trucco', testo: R`Per contare gli spigoli di un poliedro somma i lati di tutte le facce e dividi per due. Poi Eulero ti dà il numero di vertici.` },
    { tipo: 'errore', testo: R`Nel prisma obliquo l'altezza è la distanza fra le basi, non lo spigolo laterale.` },
    { tipo: 'metodo', testo: R`Per l'ampiezza di un diedro cerca due segmenti perpendicolari allo spigolo nello stesso punto, uno per faccia. L'angolo fra loro è la sezione normale.` },
    { tipo: 'trucco', testo: R`Piramide e cono valgono un terzo del prisma e del cilindro con la stessa base e altezza. La sfera vale due terzi del cilindro che la contiene.` },
    { tipo: 'trucco', testo: R`Controlla le unità: una superficie ha un quadrato ($\text{cm}^2$), un volume un cubo ($\text{cm}^3$). Se in un volume vedi $\pi r^2$ senza un'altra lunghezza, manca qualcosa.` }
  ],

  aneddoti: [
    { matematico: 'Eudosso di Cnido', anni: 'circa 408–355 a.C.', titolo: 'Democrito lo intuì, Eudosso lo dimostrò', testo: R`Che una piramide valga un terzo del prisma con la stessa base e la stessa altezza era noto da tempo. A dirlo per primo, racconta Archimede, fu Democrito, il filosofo degli atomi, che però non lo dimostrò. Democrito si poneva anche un dubbio famoso, riferito da Plutarco. Se tagli un cono con un piano parallelo alla base, le due sezioni sono uguali o diverse? Se sono uguali, il cono diventa un cilindro. Se sono diverse, la superficie del cono è fatta a gradini. La prima dimostrazione rigorosa la diede Eudosso di Cnido, con il metodo di esaustione. Archimede lo scrive nella lettera a Eratostene che apre il *Metodo*. Euclide raccolse quelle dimostrazioni nel libro XII degli *Elementi*. Le date della vita di Eudosso sono incerte.`, legame: R`Sono le formule $V = \frac{1}{3}B \cdot h$ della piramide e del cono, e il dubbio di Democrito sulle sezioni è lo stesso da cui nasce il principio di Cavalieri.` },
    { matematico: 'Zu Geng', anni: 'V–VI secolo d.C.', titolo: 'Il principio di Cavalieri, mille anni prima', testo: R`Nel 263 il matematico cinese Liu Hui commentò i *Nove capitoli*, il grande manuale della matematica cinese. Si accorse che la regola del libro per il volume della sfera era sbagliata. Immaginò allora un solido strano: la parte comune a due cilindri incrociati dentro un cubo. Lo chiamò «due ombrelli quadrati uniti». Capì che la sfera sta a quel solido come il cerchio sta al quadrato. Non riuscì però a calcolarne il volume, e lasciò il problema a chi fosse venuto dopo. Oltre due secoli più tardi lo risolse Zu Geng, figlio del matematico Zu Chongzhi. Usò un principio: se a ogni altezza le sezioni hanno la stessa area, i volumi non possono essere diversi. È il principio di Cavalieri, più di mille anni prima di Cavalieri.`, legame: R`Zu Geng usò il principio di Cavalieri per arrivare al volume della sfera, come si fa nella sezione sui volumi con la scodella.` },
    { matematico: 'Johannes Kepler', anni: '1571–1630', titolo: 'Il sistema solare dentro i poliedri', testo: R`Nel luglio del 1595 il giovane Keplero insegnava matematica a Graz. Durante una lezione disegnò alla lavagna una figura e gli venne un'idea che lo entusiasmò. I pianeti allora conosciuti erano sei, quindi gli spazi fra le loro orbite erano cinque. E i poliedri regolari sono proprio cinque. Pensò che Dio avesse costruito il sistema solare annidando i cinque solidi fra sfere, una per pianeta. Fra Saturno e Giove mise il cubo, poi il tetraedro, il dodecaedro, l'icosaedro e infine l'ottaedro fra Venere e Mercurio. Pubblicò l'idea nel 1596 nel *Mysterium cosmographicum*. Propose perfino al duca del Württemberg di farne un modello in argento. L'idea era sbagliata. Ma per controllarla Keplero cercò misure precise, e quella ricerca lo portò alle sue leggi sulle orbite.`, legame: R`Keplero contava sul fatto, dimostrato in questo argomento, che i poliedri regolari sono esattamente cinque.` },
    { matematico: 'René Descartes', anni: '1596–1650', titolo: 'Il manoscritto caduto nella Senna', testo: R`Descartes morì a Stoccolma nel 1650. I suoi manoscritti furono spediti a Parigi, a un amico che doveva curarne la pubblicazione. Secondo il racconto di un suo biografo, vicino a Parigi la barca che li trasportava affondò nella Senna. La cassa restò tre giorni sott'acqua, e i fogli furono stesi ad asciugare uno per uno. Fra quelle carte c'era un breve scritto sui poliedri. Nel 1676 Leibniz, a Parigi, ne fece una copia; poi l'originale si perse. La copia fu ritrovata solo nel 1860, fra le carte di Leibniz ad Hannover. Dentro c'era un risultato da cui segue la relazione fra vertici, spigoli e facce. Eulero l'aveva intanto ritrovata da solo: la annunciò a Goldbach nel 1750 e la pubblicò nel 1758.`, legame: R`La formula $V - S + F = 2$ porta il nome di Eulero, ma Descartes ci era arrivato vicino più di un secolo prima.` }
  ]
});
})();
