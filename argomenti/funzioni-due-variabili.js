(function () {
const R = String.raw;
/* Funzioni di due variabili (quinto anno dei tecnici, AFM e CAT). Ogni numero di teoria, esempi, esercizi,
   quiz e flashcard è stato ricalcolato con node; i grafici sono stati controllati punto per punto.
   I video usano la stessa collina della teoria: z = 9 − x² − y², il punto P(1; 2; 4), le curve di livello a
   quota 8, 6, 4, 2, 0 (raggi 1, √3, √5, √7, 3), i tagli y = 2 (z = 5 − x², pendenza −2) e x = 1
   (z = 8 − y², pendenza −4).
   Notazione: f(x; y) con il punto e virgola, come nei video e come i punti (x; y); ∂z/∂x a frazione (nei video è
   in riga), f_x come scrittura breve, detta una volta in § derivate-parziali. */

/* ---- allenamento: risposte. La casella toglie gli spazi, legge − come - e la virgola come punto ---- */
const num = (v, seg) => ({ tipo: 'numero', valore: v, tolleranza: 0.01, segnaposto: seg || 'un numero', simboli: ['−', '/', '√'] });
const pt = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. (5; −7)', simboli: ['(', ')', ';', '−', '/'] });
const parola = (lista, seg) => ({ tipo: 'testo', accettate: lista, segnaposto: seg, simboli: [] });
const SI = parola(['sì', 'si', 'sì, appartiene', 'si, appartiene', 'appartiene', 'sì appartiene', 'sta nel dominio', 'sì, sta nel dominio', 'è nel dominio'], 'sì o no');
const NO = parola(['no', 'no, non appartiene', 'non appartiene', 'no non appartiene', 'non sta nel dominio', 'no, non sta nel dominio', 'non è nel dominio'], 'sì o no');
const SEG_TIPO = 'massimo, minimo o sella';
const MASSIMO = parola(['massimo', 'massimo relativo', 'un massimo', 'è un massimo', 'punto di massimo', 'un massimo relativo', 'è un massimo relativo', 'max'], SEG_TIPO);
const MINIMO = parola(['minimo', 'minimo relativo', 'un minimo', 'è un minimo', 'punto di minimo', 'un minimo relativo', 'è un minimo relativo', 'min'], SEG_TIPO);
const SELLA = parola(['sella', 'punto di sella', 'di sella', 'una sella', 'è una sella', 'un punto di sella', 'è un punto di sella', 'colle', 'punto di colle'], SEG_TIPO);
/* il piano z = ax + by + c (a, b, c interi non nulli) in tutte le forme ragionevoli: esplicita con i termini
   in ogni ordine, implicita con lo zero a destra (e con i segni cambiati), con il termine noto a destra */
function pianoZ(a, b, c) {
  const acc = new Set();
  const termine = (k, v, primo) => (k < 0 ? '-' : (primo ? '' : '+')) + (Math.abs(k) === 1 && v ? '' : Math.abs(k)) + v;
  const somma = t => t.map((p, i) => termine(p[0], p[1], i === 0)).join('');
  const perm = l => l.length < 2 ? [l] : l.flatMap((p, i) => perm(l.slice(0, i).concat(l.slice(i + 1))).map(r => [p].concat(r)));
  perm([[a, 'x'], [b, 'y'], [c, '']]).forEach(t => acc.add('z=' + somma(t)));
  [1, -1].forEach(s => {
    perm([[s * a, 'x'], [s * b, 'y'], [-s, 'z'], [s * c, '']]).forEach(t => acc.add(somma(t) + '=0'));
    perm([[s * a, 'x'], [s * b, 'y'], [-s, 'z']]).forEach(t => acc.add(somma(t) + '=' + (-s * c)));
  });
  return { tipo: 'testo', accettate: Array.from(acc), segnaposto: 'es. z = 3x − y + 2', simboli: ['x', 'y', 'z', '+', '−', '='] };
}

/* ---- lo spazio in assonometria, la stessa di geometria-analitica-spazio e dei video ----
   proiezione ortogonale: chi guarda sta a 20° fra gli assi x e y, 22° più in alto. x viene verso chi guarda
   (in basso a sinistra), y va a destra, z sale. L'asse z è accorciato (scala 0,4), come nei video: una collina
   alta 9 non entrerebbe. Il motore disegna nel piano: ogni punto (x; y; z) diventa la coppia pj(x, y, z), e le
   superfici si fanno con una rete di curve spezzate in segmenti. Con coordinate scritte come espressioni
   (parametri dei cursori) pj restituisce espressioni. */
const TH = 20 * Math.PI / 180, PH = 22 * Math.PI / 180, ZS = 0.4;
const KX = [-Math.sin(TH), Math.cos(TH), 0];
const KY = [-Math.sin(PH) * Math.cos(TH), -Math.sin(PH) * Math.sin(TH), Math.cos(PH) * ZS];
const VD = [Math.cos(PH) * Math.cos(TH), Math.cos(PH) * Math.sin(TH), Math.sin(PH)];   /* verso chi guarda */
const arr = v => Math.round(v * 10000) / 10000;
function pj(x, y, z) {
  const v = [x, y, z];
  if (v.every(c => typeof c === 'number')) return [arr(KX[0] * x + KX[1] * y), arr(KY[0] * x + KY[1] * y + KY[2] * z)];
  const espr = K => v.map((c, i) => K[i] === 0 ? '' : (K[i] < 0 ? ' - ' : ' + ') + Math.abs(K[i]).toFixed(5) + '*(' + c + ')').join('').replace(/^ \+ /, '').replace(/^ - /, '-');
  return [espr(KX), espr(KY)];
}
/* si vede il punto p = [x, y, z]? S = { f, dentro, alto }: la superficie z = f(x, y) sui punti dove dentro(x, y)
   è vero, alta al massimo alto. Dal punto si cammina verso chi guarda (con z accorciato): se si passa
   dall'altra parte della superficie, il punto è nascosto. */
function vede(S, p) {
  let s0 = 0;
  for (let t = 0.05; t < 14; t += 0.03) {
    const x = p[0] + t * VD[0], y = p[1] + t * VD[1], Z = p[2] * ZS + t * VD[2];
    if (Z > S.alto * ZS + 0.01 && s0 >= 0) break;
    if (!S.dentro(x, y)) continue;
    const d = Z - ZS * S.f(x, y);
    if (!s0) { s0 = d >= 0 ? 1 : -1; continue; }
    if (d * s0 < -0.004) return false;
  }
  return true;
}
/* una curva dello spazio (punti in fila) come segmenti: le parti viste con lo stile dato, le nascoste
   tratteggiate a pezzi più lunghi (se nascosta è null, non si disegnano) */
function curva3(S, punti, stile, nascosta) {
  const out = [], runs = [];
  for (let i = 0; i < punti.length - 1; i++) {
    const a = punti[i], b = punti[i + 1], v = vede(S, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]);
    if (!runs.length || runs[runs.length - 1].v !== v) runs.push({ v, pts: [a] });
    runs[runs.length - 1].pts.push(b);
  }
  runs.forEach(r => {
    if (!r.v && !nascosta) return;
    let pts = r.pts;
    if (!r.v) {   /* tratteggio: corde lunghe almeno 0,45 sul foglio, se no il trattino non si vede */
      const q = [pts[0]];
      let ultimo = pj(pts[0][0], pts[0][1], pts[0][2]);
      for (let i = 1; i < pts.length; i++) {
        const c = pj(pts[i][0], pts[i][1], pts[i][2]);
        if (Math.hypot(c[0] - ultimo[0], c[1] - ultimo[1]) >= 0.45 || i === pts.length - 1) { q.push(pts[i]); ultimo = c; }
      }
      pts = q;
    }
    for (let i = 0; i < pts.length - 1; i++) {
      out.push(Object.assign({ tipo: 'segmento', da: pj(pts[i][0], pts[i][1], pts[i][2]), a: pj(pts[i + 1][0], pts[i + 1][1], pts[i + 1][2]) }, r.v ? stile : nascosta));
    }
  });
  return out;
}
const fila = (n, f) => Array.from({ length: n + 1 }, (_, i) => f(i / n));
/* un asse dall'origine fino a fine (punto dello spazio): tratteggiato dove è nascosto, freccia e lettera in fondo */
function asse(S, fine, lettera, sposta) {
  const ult = fila(40, t => [fine[0] * t, fine[1] * t, fine[2] * t]);
  const tratti = curva3(S, ult.slice(0, 37), { colore: 4 }, { colore: 4, tratteggio: true });
  const e = pj(fine[0], fine[1], fine[2]);
  return tratti.concat([
    { tipo: 'vettore', da: pj(ult[36][0], ult[36][1], ult[36][2]), a: e, colore: 4 },
    { tipo: 'testo', p: [arr(e[0] + sposta[0]), arr(e[1] + sposta[1])], testo: lettera }
  ]);
}

/* ---- la collina z = 9 − x² − y² (la parte con z ≥ 0: fuori dal cerchio di raggio 3 scenderebbe sotto il
   pavimento). Per nascondere le linee conta anche il pavimento z = 0 intorno. ---- */
const COLLE = { f: (x, y) => Math.max(0, 9 - x * x - y * y), dentro: () => true, alto: 9 };
const QUOTE = [8, 6, 4, 2, 0];
const anello = (k, n) => fila(n || 72, t => { const r = Math.sqrt(9 - k), a = 2 * Math.PI * t; return [r * Math.cos(a), r * Math.sin(a), k]; });
const meridiano = a => fila(24, t => { const r = 3 * t; return [r * Math.cos(a), r * Math.sin(a), 9 - r * r]; });
/* il contorno: dove la superficie smette di guardare verso chi guarda. Lì la normale (2·0,4·x; 2·0,4·y; 1) è
   perpendicolare alla direzione di vista, cioè x cos 20° + y sin 20° = −tan 22° / 0,8: una retta del pavimento
   dietro l'origine, sopra la quale si prende la collina */
const CONTORNO = (function () {
  const d = -Math.tan(PH) / (2 * ZS), s = Math.sqrt(9 - d * d);
  return fila(48, t => { const w = -s + 2 * s * t; const x = d * Math.cos(TH) - w * Math.sin(TH), y = d * Math.sin(TH) + w * Math.cos(TH); return [x, y, 9 - x * x - y * y]; });
})();
function rete(colore, meridiani) {
  let el = [];
  for (let i = 0; i < CONTORNO.length - 1; i++) { const a = CONTORNO[i], b = CONTORNO[i + 1]; el.push({ tipo: 'segmento', da: pj(a[0], a[1], a[2]), a: pj(b[0], b[1], b[2]), colore }); }
  QUOTE.forEach(k => { el = el.concat(curva3(COLLE, anello(k), { colore }, null)); });
  for (let j = 0; j < meridiani; j++) el = el.concat(curva3(COLLE, meridiano(2 * Math.PI * j / meridiani), { colore }, null));
  return el;
}
const ASSI_COLLE = () => asse(COLLE, [4.8, 0, 0], 'x', [-0.25, -0.2])
  .concat(asse(COLLE, [0, 4.6, 0], 'y', [0.2, 0.2]), asse(COLLE, [0, 0, 11.5], 'z', [0.25, 0]));
/* la finestra giusta per una figura: il riquadro dei punti numerici, con un margine */
function finestra(el, m) {
  const xs = [], ys = [];
  const metti = p => { if (p && typeof p[0] === 'number' && typeof p[1] === 'number') { xs.push(p[0]); ys.push(p[1]); } };
  el.forEach(e => { metti(e.da); metti(e.a); metti(e.p); (e.punti || []).forEach(metti); });
  const r = v => Math.round(v * 10) / 10;
  return { x: [r(Math.min.apply(null, xs) - m), r(Math.max.apply(null, xs) + m)], y: [r(Math.min.apply(null, ys) - m), r(Math.max.apply(null, ys) + m)] };
}
function figura3(el, extra, m) {
  return Object.assign({ tipo: 'piano', assi: false, griglia: false, mirino: false }, finestra(el, m || 0.3), { elementi: el }, extra);
}

/* figura della collina con il punto P(1; 2; 4) e il suo palo */
const FIG_COLLE = (function () {
  const el = rete(1, 12).concat(ASSI_COLLE(), [
    { tipo: 'segmento', da: pj(1, 2, 0), a: pj(1, 2, 4), colore: 2, tratteggio: true },
    { tipo: 'punto', p: pj(1, 2, 0), etichetta: '(1; 2)', posizione: 'basso-destra', colore: 2 },
    { tipo: 'punto', p: pj(1, 2, 4), etichetta: 'P(1; 2; 4)', posizione: 'destra', colore: 2 },
    { tipo: 'punto', p: pj(0, 0, 9), etichetta: '(0; 0; 9)', posizione: 'alto-sinistra', colore: 1 }
  ]);
  return figura3(el, { didascalia: 'Il grafico di z = 9 − x² − y²: una collina con la cima in (0; 0; 9). Le circonferenze della rete stanno a quota 8, 6, 4, 2 e 0. Sopra il punto (1; 2) del pavimento la superficie è alta 4: il punto P(1; 2; 4). L\'asse z è accorciato; le linee dietro la collina non si vedono.' });
})();

/* la fetta a quota k: il piano z = k e il taglio, la circonferenza di raggio r = √(9 − k).
   Del taglio si vede l'arco rivolto verso chi guarda: nelle coordinate u (lungo la direzione di vista, sul
   pavimento) e v (di traverso), è la parte con u > d, dove d = −tan 22° / 0,8 ≈ −0,505 è la retta del contorno
   (vedi CONTORNO). Sulla cupola, che è convessa, i punti rivolti verso chi guarda sono proprio quelli visibili.
   Arco visto: u = d + (r − d)s, v = ±√(r² − u²); arco nascosto: u da −r a d, tratteggiato. Con k da 0 a 8,5
   il raggio va da 3 a 0,71 > 0,505, quindi l'arco visto esiste sempre (±100° a quota 0, ±120° a quota 8). */
const FIG_FETTA = (function () {
  const L = 3.4, D = -Math.tan(PH) / (2 * ZS), r2 = '(9 - k)', rk = '(sqrt(9 - k))';
  const c = Math.cos(TH).toFixed(5), sn = Math.sin(TH).toFixed(5);
  const pianoK = k => [pj(L, L, k), pj(L, -L, k), pj(-L, -L, k), pj(-L, L, k)];
  const el = [{ tipo: 'poligono', punti: pianoK('k'), colore: 3 }].concat(rete(1, 12), ASSI_COLLE());
  /* il punto dell'arco: u come espressione in k, v = segno·√(r² − u²) (abs contro gli arrotondamenti) */
  const punto = (u, segno) => {
    const v = (segno < 0 ? '-' : '') + 'sqrt(abs(' + r2 + ' - (' + u + ')^2))';
    return pj('(' + u + ')*' + c + ' - (' + v + ')*' + sn, '(' + u + ')*' + sn + ' + (' + v + ')*' + c, 'k');
  };
  const uVisto = t => { const q = 1 - (1 - t) * (1 - t); return arr(D) + ' + (' + rk + ' - (' + arr(D) + '))*' + q.toFixed(5); };
  const uDietro = t => { const q = t * t; return '-' + rk + ' + (' + arr(D) + ' + ' + rk + ')*' + q.toFixed(5); };
  [1, -1].forEach(sg => {
    for (let n = 0; n < 18; n++) el.push({ tipo: 'segmento', da: punto(uVisto(n / 18), sg), a: punto(uVisto((n + 1) / 18), sg), colore: 2 });
    for (let n = 0; n < 6; n++) el.push({ tipo: 'segmento', da: punto(uDietro(n / 6), sg), a: punto(uDietro((n + 1) / 6), sg), colore: 2, tratteggio: true });
  });
  /* la finestra: i punti fissi più i quattro angoli del piano alla quota più bassa e a quella più alta */
  const w = finestra(el.concat([{ tipo: 'poligono', punti: pianoK(0).concat(pianoK(8.5)) }]), 0.3);
  w.y[0] = arr(w.y[0] - 0.6);
  el.push({ tipo: 'testo', p: [arr(w.x[1] - 0.1), arr(w.y[0] + 0.75)], testo: 'quota k = {{k}}', ancora: 'end' });
  el.push({ tipo: 'testo', p: [arr(w.x[1] - 0.1), arr(w.y[0] + 0.25)], testo: 'raggio = {{sqrt(9 - k)}}', ancora: 'end' });
  return Object.assign({ tipo: 'piano', assi: false, griglia: false, mirino: false }, w, {
    elementi: el,
    parametri: [{ nome: 'k', min: 0, max: 8.5, passo: 0.5, valore: 4, etichetta: 'quota k del piano' }],
    didascalia: 'Il piano orizzontale z = k (in verde) taglia la collina lungo una circonferenza (in arancio), tratteggiata dove la collina la nasconde. Più il piano sale, più la circonferenza si stringe: a quota 8 il raggio è 1, a quota 0 è 3.'
  });
})();

/* le derivate parziali in P(1; 2; 4): i tagli y = 2 (z = 5 − x²) e x = 1 (z = 8 − y²), con le tangenti */
const FIG_DERIVATE = (function () {
  const a5 = Math.sqrt(5), a8 = Math.sqrt(8);
  const tY = fila(48, t => { const x = -a5 + 2 * a5 * t; return [x, 2, 5 - x * x]; });
  const tX = fila(48, t => { const y = -a8 + 2 * a8 * t; return [1, y, 8 - y * y]; });
  const el = rete(1, 12).concat(ASSI_COLLE(),
    curva3(COLLE, tY, { colore: 2 }, { colore: 2, tratteggio: true }),
    curva3(COLLE, tX, { colore: 3 }, { colore: 3, tratteggio: true }), [
      { tipo: 'segmento', da: pj(0, 2, 6), a: pj(2.2, 2, 1.6), colore: 2 },
      { tipo: 'segmento', da: pj(1, 1.4, 6.4), a: pj(1, 2.6, 1.6), colore: 3 },
      { tipo: 'punto', p: pj(1, 2, 4), etichetta: 'P', posizione: 'alto-destra', colore: 2 }
    ]);
  return figura3(el, { didascalia: 'In arancio il taglio con il piano y = 2: la curva z = 5 − x², che in P scende con pendenza −2. In verde il taglio con il piano x = 1: la curva z = 8 − y², che in P scende con pendenza −4. I due trattini sono le tangenti; le parti nascoste dalla collina sono tratteggiate.' });
})();

/* la sella z = y² − x² sul quadrato −2 ≤ x ≤ 2, −2 ≤ y ≤ 2 (con y² − x² la sella si legge meglio da questo
   punto di vista: y va di traverso sul foglio). È una superficie sottile, che si può vedere anche da sotto:
   si nasconde solo quello che sta dall'altra parte della superficie */
const SELLA_S = { f: (x, y) => y * y - x * x, dentro: (x, y) => Math.abs(x) <= 2.0001 && Math.abs(y) <= 2.0001, alto: 4 };
const FIG_SELLA = (function () {
  let el = [];
  for (let i = 0; i <= 8; i++) {
    const c = -2 + 0.5 * i;
    if (c === 0) continue;
    el = el.concat(curva3(SELLA_S, fila(40, t => { const y = -2 + 4 * t; return [c, y, y * y - c * c]; }), { colore: 1 }, null));
    el = el.concat(curva3(SELLA_S, fila(40, t => { const x = -2 + 4 * t; return [x, c, c * c - x * x]; }), { colore: 1 }, null));
  }
  const sx = pj(0, -2, 4), giu = pj(2, 0, -4);
  el = el.concat(
    curva3(SELLA_S, fila(48, t => { const x = -2 + 4 * t; return [x, 0, -x * x]; }), { colore: 2 }, { colore: 2, tratteggio: true }),
    curva3(SELLA_S, fila(48, t => { const y = -2 + 4 * t; return [0, y, y * y]; }), { colore: 3 }, { colore: 3, tratteggio: true }), [
      { tipo: 'punto', p: pj(0, 0, 0), etichetta: 'O', posizione: 'alto', colore: 4 },
      { tipo: 'testo', p: [arr(sx[0] + 0.2), arr(sx[1] + 0.35)], testo: 'lungo y: z = y²', ancora: 'start' },
      { tipo: 'testo', p: [arr(giu[0]), arr(giu[1] - 0.4)], testo: 'lungo x: z = −x²', ancora: 'middle' }
    ]);
  return figura3(el, { didascalia: 'La sella z = y² − x². Lungo l\'asse y (in verde) la superficie è la parabola z = y², che in O ha un minimo. Lungo l\'asse x (in arancio), che viene verso chi guarda, è z = −x², che in O ha un massimo. O è un punto stazionario, ma non è né un massimo né un minimo.' }, 0.45);
})();

COMPASSO.registra({
  id: 'funzioni-due-variabili',
  titolo: 'Funzioni di due variabili',

  introduzione: R`Il prezzo di un'auto usata dipende dall'età e dai chilometri. Il profitto di un'azienda con due prodotti dipende da quanto vende dell'uno e dell'altro. Molte grandezze dipendono da **due** variabili insieme.

Una **funzione di due variabili** associa a ogni coppia $(x; y)$ un numero $z$. Il suo grafico non è una curva ma una **superficie** nello spazio, come una collina. Per leggerla su un foglio si usano le **curve di livello**, come sulle carte dei sentieri.

Con le **derivate parziali** misuri quanto è ripida la superficie lungo i due assi. Poi cerchi massimi e minimi: il profitto più alto, la spesa migliore con un budget fisso. Ti servono le derivate, le disequazioni in due incognite e la geometria analitica nello spazio.`,

  inBreve: [
    R`$z = f(x; y)$ associa a ogni punto $(x; y)$ del dominio un solo numero. Il dominio è una **regione del piano**, da disegnare.`,
    R`Il grafico è una superficie. La **curva di livello** di quota $k$ è il taglio con il piano $z = k$ visto dall'alto: dove le curve sono fitte, la superficie è ripida.`,
    R`La **derivata parziale** $\dfrac{\partial f}{\partial x}$ si calcola derivando in $x$ con $y$ ferma. È la pendenza della superficie lungo l'asse $x$.`,
    R`Massimi e minimi liberi stanno fra i **punti stazionari**, dove $f_x = 0$ e $f_y = 0$. L'hessiano $H = f_{xx} f_{yy} - (f_{xy})^2$ decide: con $H > 0$ è un estremo, con $H < 0$ una sella.`,
    R`Con un vincolo lineare ricavi una variabile e la sostituisci: torni a una funzione di una variabile. Nel punto migliore la curva di livello è tangente al vincolo.`
  ],

  sezioni: [
    { id: 'funzione-due-variabili', titolo: 'Che cos\'è una funzione di due variabili', testo: R`Un'azienda produce due beni: $x$ pezzi del primo e $y$ del secondo. Il costo totale dipende da tutti e due i numeri. Per esempio, in euro: $$C(x; y) = 3x + 5y + 200.$$ Con $x = 10$ e $y = 20$ il costo è $C(10; 20) = 30 + 100 + 200 = 330$ euro. Se cambi uno solo dei due numeri, il costo cambia.

>* Una **funzione di due variabili** associa a ogni coppia $(x; y)$ di un insieme $D$ **un solo** numero reale $z$. Si scrive $z = f(x; y)$. $D$ è un insieme del piano, il **dominio**; $x$ e $y$ sono le variabili indipendenti, $z$ è la variabile dipendente.

Le due variabili si separano con il punto e virgola, come le coordinate di un punto. $f(1; 2)$ è il valore della funzione nel punto $(1; 2)$.

In tutto l'argomento torna una funzione guida, la stessa dei video: $$f(x; y) = 9 - x^2 - y^2.$$ Per calcolare un valore sostituisci tutti e due i numeri.

~ f(1; 2) = 9 - 1^2 - 2^2 :: metto $x = 1$ e $y = 2$
~ f(1; 2) = 9 - 1 - 4 = \evidb{4} :: il valore nel punto $(1; 2)$

I valori si possono raccogliere in una **tabella a doppia entrata**: le colonne danno $x$, le righe danno $y$.

| | $x = 0$ | $x = 1$ | $x = 2$ |
|---|---|---|---|
| $y = 0$ | $9$ | $8$ | $5$ |
| $y = 1$ | $8$ | $7$ | $4$ |
| $y = 2$ | $5$ | $4$ | $1$ |

Il valore più grande, $9$, sta in $(0; 0)$. Allontanandosi dall'origine i valori calano.

>! L'ordine conta: $(x; y)$ è una coppia **ordinata**. Con $g(x; y) = x - 2y$ hai $g(3; 1) = 1$, ma $g(1; 3) = -5$.

?? Quanto vale $f(x; y) = 9 - x^2 - y^2$ nel punto $(2; 1)$?
[ ] $1$
[ ] $6$
[x] $4$
=> $f(2; 1) = 9 - 4 - 1 = 4$. Chi trova $6$ ha dimenticato i quadrati: $9 - 2 - 1$. Chi trova $1$ ha messo $2$ al posto di tutte e due le variabili: $9 - 4 - 4$.` },

    { id: 'dominio', titolo: 'Il dominio: una regione del piano', testo: R`Per una funzione di una variabile il dominio è un insieme di numeri, sulla retta. Con due variabili è un insieme di **punti del piano** $xy$: una regione. Le condizioni di esistenza sono le solite, ma diventano disequazioni in due incognite.

>* Il **dominio** di $f(x; y)$ è l'insieme dei punti $(x; y)$ in cui la formula dà un numero reale. Si trova con le condizioni di esistenza: denominatori $\ne 0$, radicandi di indice pari $\ge 0$, argomenti dei logaritmi $> 0$.

Esempio: $f(x; y) = \sqrt{x + y - 2}$.

~ x + y - 2 \ge 0 :: il radicando non può essere negativo
~ y \ge -x + 2 :: isolo la $y$
~ \text{semipiano sopra la retta } \evidb{y = -x + 2} :: con l'uguale, la retta è compresa

Per scegliere il semipiano giusto prova un punto, per esempio l'origine. $0 + 0 - 2 \ge 0$ è falso: il dominio è il semipiano che **non** contiene l'origine.

[[grafico:gDominioRetta]]

Con un logaritmo il bordo resta fuori. $g(x; y) = \ln(y - x^2)$ esiste per $y - x^2 > 0$, cioè $y > x^2$. Sono i punti **sopra** la parabola $y = x^2$, senza la parabola.

[[grafico:gDominioParabola]]

Altri due casi tipici:

| funzione | condizione e dominio |
|---|---|
| $\dfrac{1}{x - y}$ | $x - y \ne 0$: il piano meno la retta $y = x$ |
| $\sqrt{9 - x^2 - y^2}$ | $x^2 + y^2 \le 9$: il cerchio di centro $O$ e raggio $3$, bordo compreso |

> Le disequazioni in due incognite e i semipiani sono spiegati nell'argomento «Piano cartesiano e retta».

>! Il dominio non è un intervallo. $y \ge -x + 2$ descrive un semipiano: va disegnato nel piano, non sulla retta dei numeri.

>! Il bordo compreso ($\ge$, $\le$) si disegna **continuo**. Il bordo escluso ($>$, $<$, $\ne$) si disegna **tratteggiato**.

?? Il punto $(1; 3)$ sta nel dominio di $h(x; y) = \sqrt{y - 2x}$?
[x] Sì, perché $3 - 2 \cdot 1 = 1 \ge 0$.
[ ] No, perché $1 - 2 \cdot 3 < 0$.
[ ] Non si può dire senza il disegno.
=> Si sostituiscono $x = 1$ e $y = 3$, nell'ordine giusto: il radicando vale $1$, che non è negativo. Chi risponde no ha scambiato $x$ e $y$.` },

    { id: 'grafico', titolo: 'Il grafico: una superficie nello spazio', testo: R`Il grafico di $y = f(x)$ è fatto dai punti $(x; f(x))$ del piano. Con due variabili serve una dimensione in più. Sopra ogni punto $(x; y)$ del dominio si alza un punto di quota $z = f(x; y)$.

>* Il **grafico** di $z = f(x; y)$ è l'insieme dei punti $(x; y; f(x; y))$ dello spazio: di solito è una **superficie**. Ogni retta verticale lo taglia al massimo in un punto, perché a ogni coppia corrisponde una sola quota.

Prendi la funzione guida $f(x; y) = 9 - x^2 - y^2$. Sopra $(1; 2)$ la quota è $4$, quindi il grafico passa per $P(1; 2; 4)$. Sopra l'origine la quota è $9$, il valore più alto. Lontano dall'origine $x^2 + y^2$ cresce e la quota cala. Il grafico è una **collina** con la cima in $(0; 0; 9)$: si chiama paraboloide.

[[grafico:gCollina]]

Il disegno usa l'assonometria dell'argomento «Geometria analitica nello spazio». L'asse $x$ viene verso di te, $y$ va a destra, $z$ sale. L'asse $z$ è **accorciato**, altrimenti la collina non entrerebbe. La superficie è disegnata come una rete di curve. Si vede solo la parte con $z \ge 0$: fuori dal cerchio di raggio $3$ la collina scende sotto il pavimento.

Alcune superfici le conosci già.

- $z = ax + by + c$ ha per grafico un **piano**. Per esempio $z = 6 - 2x - 3y$ si scrive $2x + 3y + z - 6 = 0$.
- $z = \sqrt{9 - x^2 - y^2}$ ha per grafico la metà superiore della **sfera** di centro $O$ e raggio $3$.

>! Non ogni superficie è un grafico. La sfera intera no: sopra un punto interno al cerchio ha due punti, uno in alto e uno in basso. A una coppia corrisponderebbero due quote.

?? Che grafico ha $f(x; y) = 4 - x - y$?
[ ] Una parabola nel piano $xy$.
[x] Un piano nello spazio.
[ ] Una retta nel piano $xy$.
=> $z = 4 - x - y$ si scrive $x + y + z - 4 = 0$: è l'equazione di un piano. La retta $x + y = 4$ è solo la sua curva di livello a quota $0$.` },

    { id: 'curve-di-livello', titolo: 'Le curve di livello', testo: R`Disegnare una superficie è faticoso. Le carte dei sentieri fanno un'altra cosa. Tagliano la montagna a quote fisse e disegnano i tagli visti dall'alto.

[[video:funzioni-due-variabili/curve-di-livello]]

>* La **curva di livello** di quota $k$ è l'insieme dei punti del piano $xy$ in cui $f(x; y) = k$. È il taglio del grafico con il piano orizzontale $z = k$, visto dall'alto.

Per la collina:

~ 9 - x^2 - y^2 = k :: fisso la quota $k$
~ x^2 + y^2 = 9 - k :: una circonferenza con il centro nell'origine
~ r = \evidb{\sqrt{9 - k}} :: c'è solo per $k \le 9$; con $k = 9$ resta il punto più alto

A quota $8$ il raggio è $1$, a quota $0$ è $3$. Più il piano sale, più il taglio si stringe.

[[grafico:gFetta]]

Viste dall'alto, queste curve formano la **mappa** della collina. Il punto $(1; 2)$ sta sulla curva di quota $4$: infatti $1 + 4 = 5 = 9 - 4$.

[[grafico:gMappa]]

Fra due curve vicine il dislivello è sempre $2$. In alto le curve sono **distanti**: da quota $8$ a quota $6$ il raggio passa da $1$ a circa $1{,}73$. In basso sono **fitte**: da $2$ a $0$ passa da circa $2{,}65$ a $3$. Curve fitte vogliono dire salita ripida: lo stesso dislivello in meno strada.

Anche le funzioni economiche hanno curve di livello. Per il costo $C(x; y) = 3x + 5y + 200$ sono le rette $3x + 5y + 200 = k$. Sono rette **parallele**, una per ogni costo: le rette di isocosto.

> Le curve di livello hanno tanti nomi. Sulle carte del meteo le **isobare** uniscono i punti con la stessa pressione. In economia gli **isoquanti** uniscono le combinazioni di lavoro e capitale che danno la stessa produzione.

>! Due curve di livello di quote diverse non si incontrano mai. In un punto comune la funzione avrebbe due valori.

?? Su una carta le curve di livello sono fitte vicino al punto $A$ e distanti vicino a $B$. Dove il sentiero è più ripido?
[x] Vicino ad $A$.
[ ] Vicino a $B$.
[ ] Uguale: il dislivello fra due curve è sempre lo stesso.
=> Fra due curve vicine il dislivello è fisso. Vicino ad $A$ lo superi in pochi passi, quindi lì la salita è più ripida.` },

    { id: 'derivate-parziali', titolo: 'Le derivate parziali', testo: R`Quanto è ripida la collina nel punto $P(1; 2; 4)$? Dipende da dove vai. Verso le $x$ la pendenza è diversa che verso le $y$. Per questo le derivate sono **due**.

[[video:funzioni-due-variabili/derivate-parziali]]

Taglia la collina con il piano $y = 2$, parallelo al piano $xz$. Sul taglio $y$ resta ferma e cambia solo $x$: è la curva $z = 9 - x^2 - 4 = 5 - x^2$. La sua pendenza in $x = 1$ è la derivata $-2x$, cioè $-2$.

>* La **derivata parziale rispetto a $x$** si calcola derivando in $x$ e trattando $y$ come una costante. Si scrive $\dfrac{\partial f}{\partial x}$, e si legge «d tonda $f$ su d tonda $x$». In breve si scrive anche $f_x$. Allo stesso modo $\dfrac{\partial f}{\partial y}$, o $f_y$, si calcola derivando in $y$ con $x$ costante.

Come per una variabile, è il limite di un rapporto incrementale, in cui si muove solo $x$: $$f_x(x_0; y_0) = \lim_{h \to 0} \frac{f(x_0 + h; y_0) - f(x_0; y_0)}{h}.$$ Con $z = f(x; y)$ si scrive anche $\dfrac{\partial z}{\partial x}$. Per la collina:

~ \dfrac{\partial z}{\partial x} = -2x :: derivo $9 - x^2 - y^2$ in $x$: $9$ e $y^2$ sono costanti
~ \dfrac{\partial z}{\partial y} = -2y :: ora la costante è $x^2$
~ \dfrac{\partial z}{\partial x}(1; 2) = \evidb{-2}, \quad \dfrac{\partial z}{\partial y}(1; 2) = \evidb{-4} :: due pendenze diverse nello stesso punto

Verso le $y$ la collina scende due volte più in fretta. Le due derivate sono le pendenze dei due tagli.

[[grafico:gDerivate]]

[[grafico:gTaglioX]]

[[grafico:gTaglioY]]

Un esempio senza collina: $f(x; y) = x^2 y + 3xy^2$.

~ f_x = 2xy + 3y^2 :: $y$ è costante: $x^2 y$ dà $2xy$, e $3xy^2$ dà $3y^2$
~ f_y = x^2 + 6xy :: ora è costante $x$: $x^2 y$ dà $x^2$, e $3xy^2$ dà $6xy$
~ f_x(1; 2) = \evidb{16}, \quad f_y(1; 2) = \evidb{13} :: i numeri si sostituiscono alla fine

>! Una costante si comporta come un numero. Rispetto a $x$, la derivata di $3xy^2$ è $3y^2$, non zero: $3y^2$ è il coefficiente di $x$.

### Il piano tangente (cenno)

Le tangenti ai due tagli in $P$ individuano un piano: il **piano tangente** alla superficie. Vicino a $P$ la superficie e il piano quasi si confondono. $$\begin{array}{l} z = f(x_0; y_0) \\ \quad + f_x(x_0; y_0)\,(x - x_0) \\ \quad + f_y(x_0; y_0)\,(y - y_0) \end{array}$$ Per la collina in $P(1; 2; 4)$ viene $z = 4 - 2(x - 1) - 4(y - 2)$, cioè $z = 14 - 2x - 4y$.

?? Quanto vale la derivata di $5x^3$ rispetto a $y$?
[ ] $15x^2$
[x] $0$
[ ] $5x^3$
=> $5x^3$ non contiene $y$: rispetto a $y$ è una costante, e la derivata di una costante è zero. $15x^2$ è la derivata rispetto a $x$.` },

    { id: 'punti-stazionari', titolo: 'Massimi e minimi liberi: i punti stazionari', testo: R`In cima alla collina non si sale più in nessuna direzione. Lì le due pendenze, verso le $x$ e verso le $y$, valgono zero.

>* $P_0(x_0; y_0)$ è un punto di **massimo relativo** se, vicino a $P_0$, vale sempre $f(x; y) \le f(x_0; y_0)$. È di **minimo relativo** se vale sempre $f(x; y) \ge f(x_0; y_0)$. In un massimo o in un minimo interno al dominio si annullano tutte e due le derivate parziali, se esistono.

I punti in cui $f_x = 0$ e $f_y = 0$ si chiamano **punti stazionari**. Si trovano risolvendo il sistema $$\begin{cases} f_x(x; y) = 0 \\ f_y(x; y) = 0 \end{cases}$$ Per la collina: $-2x = 0$ e $-2y = 0$. L'unico punto stazionario è $(0; 0)$, la cima, dove la funzione vale $9$.

Il viceversa non vale. Prendi $f(x; y) = y^2 - x^2$.

~ f_x = -2x, \quad f_y = 2y :: le due derivate parziali
~ (0; 0) :: si annullano tutte e due solo nell'origine
~ \text{lungo l'asse } y: \ z = y^2 :: con $x = 0$: una parabola con il **minimo** in $O$
~ \text{lungo l'asse } x: \ z = -x^2 :: con $y = 0$: una parabola con il **massimo** in $O$

L'origine non è né un massimo né un minimo. È un **punto di sella**: la superficie ha la forma di una sella da cavallo. Somiglia a un passo di montagna. Per chi attraversa il passo, è il punto più alto della strada. Per chi cammina sulla cresta, è il punto più basso.

[[grafico:gSella]]

>! Annullare una sola derivata non basta. Un punto stazionario annulla $f_x$ **e** $f_y$ insieme.

>! Un punto stazionario non è per forza un estremo: può essere una sella. Per decidere serve il test della prossima sezione.

?? In $P_0$ vale $f_x = 0$, ma $f_y = 3$. Che cosa puoi dire?
[ ] $P_0$ è un punto di sella.
[x] $P_0$ non è stazionario, quindi non è un estremo interno.
[ ] $P_0$ è un massimo lungo l'asse $x$, quindi è un massimo.
=> Lungo le $y$ la funzione in $P_0$ sale con pendenza $3$: vicino a $P_0$ ci sono valori più alti e più bassi. Non è nemmeno una sella, perché una sella è un punto stazionario.` },

    { id: 'hessiano', titolo: 'Il test dell\'hessiano', testo: R`Per sapere che cos'è un punto stazionario servono le **derivate seconde**. Derivando ancora $f_x$ e $f_y$ se ne ottengono quattro:

- $f_{xx}$: derivo due volte rispetto a $x$;
- $f_{yy}$: derivo due volte rispetto a $y$;
- $f_{xy}$ e $f_{yx}$: le derivate **miste**, una volta per variabile.

Per le funzioni di questo argomento le due miste sono uguali, $f_{xy} = f_{yx}$: è il teorema di Schwarz.

>* L'**hessiano** è il numero $H = f_{xx} f_{yy} - (f_{xy})^2$, con le derivate seconde calcolate nel punto stazionario. Con $H > 0$ e $f_{xx} > 0$ c'è un **minimo**; con $H > 0$ e $f_{xx} < 0$ un **massimo**. Con $H < 0$ c'è una **sella**. Con $H = 0$ il test non decide.

$H$ è il determinante della **matrice hessiana** $\begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$.

| $H$ | $f_{xx}$ | il punto è |
|---|---|---|
| positivo | positiva | un minimo relativo |
| positivo | negativa | un massimo relativo |
| negativo | qualunque | una sella |
| zero | qualunque | da studiare a parte |

Esempio completo: $f(x; y) = x^3 - 3x + y^2 - 2y$.

~ f_x = 3x^2 - 3, \quad f_y = 2y - 2 :: le derivate prime
~ x = \pm 1, \quad y = 1 :: le annullo: i punti stazionari sono $(1; 1)$ e $(-1; 1)$
~ f_{xx} = 6x, \quad f_{yy} = 2, \quad f_{xy} = 0 :: le derivate seconde
~ H = 6x \cdot 2 - 0^2 = 12x :: l'hessiano in un punto qualunque
~ H(1; 1) = 12 > 0, \ f_{xx} = 6 > 0 :: minimo, e $f(1; 1) = 1 - 3 + 1 - 2 = \evidb{-3}$
~ H(-1; 1) = -12 < 0 :: sella, e $f(-1; 1) = -1 + 3 + 1 - 2 = \evidb{1}$

Prova il test sulle due superfici di prima. La collina $9 - x^2 - y^2$ ha $f_{xx} = f_{yy} = -2$ e $f_{xy} = 0$: $H = 4 > 0$ con $f_{xx} < 0$, un massimo. La sella $y^2 - x^2$ ha $H = (-2) \cdot 2 - 0 = -4 < 0$.

>! Con $H > 0$, $f_{xx}$ e $f_{yy}$ hanno lo stesso segno: basta guardarne una. Con $H < 0$ il segno di $f_{xx}$ non conta: è una sella comunque.

>! Con $H = 0$ il test tace. $x^4 + y^4$ e $x^4 - y^4$ hanno tutte e due $H = 0$ nell'origine. La prima lì ha un minimo, la seconda una sella.

?? In un punto stazionario $f_{xx} = 2$, $f_{yy} = -3$ e $f_{xy} = 1$. Che punto è?
[ ] Un minimo, perché $f_{xx} > 0$.
[ ] Un massimo, perché $f_{yy} < 0$.
[x] Una sella, perché $H < 0$.
=> $H = 2 \cdot (-3) - 1^2 = -7$. Con $H$ negativo è una sella, qualunque sia il segno di $f_{xx}$.` },

    { id: 'vincolati', titolo: 'Massimi e minimi vincolati', testo: R`Spesso le variabili non sono libere. Un budget fisso, una capacità produttiva, un perimetro dato: sono **vincoli**. Qui il vincolo è un'equazione di primo grado, cioè una retta del piano. Si cercano i massimi e i minimi di $f$ **solo** fra i punti della retta.

>* **Metodo di sostituzione.** Dal vincolo ricavi una variabile e la sostituisci in $f$. Ottieni una funzione di **una** sola variabile, che studi con la derivata come sempre.

Esempio: il minimo di $f(x; y) = x^2 + y^2$ con il vincolo $x + 2y = 5$.

~ x = 5 - 2y :: ricavo $x$ dal vincolo
~ g(y) = (5 - 2y)^2 + y^2 = 5y^2 - 20y + 25 :: sostituisco: resta solo $y$
~ g'(y) = 10y - 20 :: derivo
~ y = 2, \quad x = 5 - 4 = 1 :: $g' < 0$ prima di $2$ e $g' > 0$ dopo: è un minimo
~ f(1; 2) = \evidb{5} :: il minimo di $f$ sulla retta del vincolo

Guarda le curve di livello. $x^2 + y^2 = k$ sono circonferenze con il centro nell'origine. La più piccola che tocca la retta è **tangente** alla retta, nel punto $T(1; 2)$. Il suo raggio è $\sqrt{5}$, la distanza dell'origine dalla retta.

[[grafico:gVincolo]]

>* Nel punto di massimo o di minimo vincolato, la curva di livello di $f$ è **tangente** alla retta del vincolo.

Sulla retta, invece, non c'è un massimo: allontanandosi, $x^2 + y^2$ cresce senza fine.

### I moltiplicatori di Lagrange (cenno)

Quando ricavare una variabile è scomodo, si usa la **funzione lagrangiana**. Con il vincolo $g(x; y) = c$ si scrive $$L(x; y; \lambda) = f(x; y) - \lambda \left[ g(x; y) - c \right]$$ e si annullano le sue tre derivate parziali. Nell'esempio: $L_x = 2x - \lambda$, $L_y = 2y - 2\lambda$, $L_\lambda = -(x + 2y - 5)$. Dalle prime due viene $y = 2x$, e nel vincolo $5x = 5$. Ritrovi $(1; 2)$, con $\lambda = 2$.

>! Il minimo **libero** di $x^2 + y^2$ è l'origine. Ma $(0; 0)$ non sta sulla retta: $0 + 0 \ne 5$. Con un vincolo i punti stazionari liberi in genere non servono: di solito non stanno sul vincolo.

>! Se le variabili devono essere positive, il vincolo è un **segmento**. Confronta anche i valori nei due estremi.

?? Nel punto di minimo vincolato, come sta la curva di livello di $f$ rispetto alla retta del vincolo?
[ ] La taglia in due punti.
[x] È tangente alla retta.
[ ] È perpendicolare alla retta.
=> Se la tagliasse, spostandosi un poco sulla retta si troverebbero valori di $f$ più bassi. Nel minimo la curva sfiora soltanto la retta.` },

    { id: 'economia', titolo: 'Applicazioni economiche', testo: R`### Il profitto con due beni

Un'azienda produce due beni in quantità $x$ e $y$, in tonnellate. Li vende a prezzi fissi: $10$ e $14$ migliaia di euro alla tonnellata. Il costo totale, in migliaia di euro, è $C(x; y) = x^2 + xy + y^2 + 20$. Il **profitto** $\Pi$ (pi greca maiuscola) è il ricavo meno il costo. In «Matematica per l'economia» si chiama $P$; qui $P$ indica già un punto: $$\Pi(x; y) = 10x + 14y - x^2 - xy - y^2 - 20.$$

~ \Pi_x = 10 - 2x - y = 0 :: la derivata rispetto a $x$
~ \Pi_y = 14 - x - 2y = 0 :: la derivata rispetto a $y$
~ x = 2, \quad y = 6 :: dalla prima $y = 10 - 2x$; nella seconda viene $3x - 6 = 0$
~ H = (-2)(-2) - (-1)^2 = 3 > 0, \ \Pi_{xx} = -2 < 0 :: è un massimo
~ \Pi(2; 6) = \evidb{32} :: il profitto massimo, in migliaia di euro

Conviene produrre $2$ tonnellate del primo bene e $6$ del secondo: il profitto è di $32\,000$ euro.

### Utilità e vincolo di bilancio

Un consumatore spende $40$ euro in due beni, che costano $2$ euro e $4$ euro l'unità. La sua soddisfazione è misurata dalla funzione di **utilità** $U(x; y) = xy$. Il **vincolo di bilancio** è $2x + 4y = 40$.

~ x = 20 - 2y :: ricavo $x$ dal vincolo
~ U = (20 - 2y)\,y = 20y - 2y^2 :: una sola variabile
~ U' = 20 - 4y = 0 \Rightarrow y = 5 :: $U'$ è positiva prima e negativa dopo: massimo
~ x = 10, \quad U(10; 5) = \evidb{50} :: spende $20$ euro per ciascun bene

Le curve di livello dell'utilità si chiamano **curve di indifferenza**. Lungo una di esse il consumatore è soddisfatto sempre allo stesso modo. Nella scelta migliore la curva di indifferenza $xy = 50$ è tangente alla retta del bilancio.

[[grafico:gBilancio]]

>* Il metodo è sempre lo stesso. Scrivi la funzione da ottimizzare e fissa il dominio economico. Poi cerchi i punti stazionari, oppure usi il vincolo. Alla fine controlli che il risultato abbia senso.

>! Le quantità non sono mai negative: il dominio economico sta in $x \ge 0$, $y \ge 0$. Un punto stazionario fuori da lì non è una soluzione.

> Con la produzione succede lo stesso. Le curve di livello di una funzione di produzione sono gli **isoquanti**. Il vincolo di spesa diventa una retta di isocosto.

?? Un bene costa $3$ euro, l'altro $5$ euro, e il reddito è di $60$ euro. Qual è il vincolo di bilancio?
[ ] $5x + 3y = 60$.
[ ] $x + y = 60$.
[x] $3x + 5y = 60$.
=> Si spende $3$ euro per ogni unità del primo bene e $5$ euro per ogni unità del secondo. La spesa totale $3x + 5y$ deve essere uguale al reddito.` }
  ],

  grafici: {
    /* ---- il dominio: regioni del piano ---- */
    gDominioRetta: {
      tipo: 'piano', x: [-3, 5], y: [-3, 5], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      elementi: [
        { tipo: 'area', f: '5', g: '2 - x', da: -3, a: 5, colore: 1 },
        { tipo: 'retta', m: -1, q: 2, colore: 1 },
        { tipo: 'testo', p: [3.3, -2.6], testo: 'y = −x + 2', ancora: 'end' },
        { tipo: 'testo', p: [2.4, 3.6], testo: 'x + y − 2 ≥ 0' },
        { tipo: 'punto', p: [0, 0], colore: 2 }
      ],
      didascalia: 'Il dominio di f(x; y) = √(x + y − 2): il semipiano colorato sopra la retta y = −x + 2. La retta fa parte del dominio (linea continua); l\'origine, in arancio, resta fuori.'
    },
    gDominioParabola: {
      tipo: 'piano', x: [-3, 3], y: [-1, 6], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      funzioni: [{ f: 'x^2', colore: 1, tratteggio: true }],
      elementi: [
        { tipo: 'area', f: '6', g: 'x^2', da: -2.449, a: 2.449, colore: 1 },
        { tipo: 'testo', p: [0.9, 3.3], testo: 'y > x²' },
        { tipo: 'testo', p: [2.9, 0.6], testo: 'y = x²', ancora: 'end' }
      ],
      didascalia: 'Il dominio di g(x; y) = ln(y − x²): i punti sopra la parabola y = x², colorati. La parabola non fa parte del dominio (tratteggio): lì il logaritmo avrebbe argomento zero.'
    },

    /* ---- il grafico, la fetta e la mappa della collina ---- */
    gCollina: FIG_COLLE,
    gFetta: FIG_FETTA,
    gMappa: {
      tipo: 'piano', x: [-3.8, 3.8], y: [-3.8, 3.8], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, colore: 1 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 1.7321, colore: 1 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 2.2361, colore: 1 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 2.6458, colore: 1 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, colore: 1 },
        /* ogni quota appena fuori dalla sua curva, poco sopra l'asse x, a sinistra */
        { tipo: 'testo', p: [-1.37, 0.3], testo: '8' },
        { tipo: 'testo', p: [-1.98, 0.3], testo: '6' },
        { tipo: 'testo', p: [-2.44, 0.3], testo: '4' },
        { tipo: 'testo', p: [-2.83, 0.3], testo: '2' },
        { tipo: 'testo', p: [-3.35, 0.3], testo: '0' },
        { tipo: 'punto', p: [1, 2], etichetta: '(1; 2)', posizione: 'alto-destra', colore: 2 }
      ],
      didascalia: 'La mappa di z = 9 − x² − y²: le curve di livello a quota 8, 6, 4, 2 e 0, con la quota scritta appena fuori da ogni curva. Vicino alla cima sono distanti, in basso sono fitte. Il punto (1; 2) sta sulla curva di quota 4.'
    },

    /* ---- le derivate parziali ---- */
    gDerivate: FIG_DERIVATE,
    gTaglioX: {
      tipo: 'piano', x: [-2.6, 3.4], y: [-2, 6.7], passo: [1, 1], altezza: 420, etichette: { x: 'x', y: 'z' },
      funzioni: [{ f: '5 - x^2', colore: 2 }],
      elementi: [{ tipo: 'tangente', f: '5 - x^2', x0: 1, colore: 1 }, { tipo: 'testo', p: [-2.5, 5.3], testo: 'z = 5 − x²', ancora: 'start' }],
      didascalia: 'Il taglio con il piano y = 2, visto di fronte: la curva z = 5 − x². In x = 1 la tangente ha pendenza −2: è la derivata parziale ∂z/∂x nel punto (1; 2).'
    },
    gTaglioY: {
      tipo: 'piano', x: [-3.2, 3.8], y: [-2, 9.6], passo: [1, 2], altezza: 420, etichette: { x: 'y', y: 'z' }, mirino: false,
      funzioni: [{ f: '8 - x^2', colore: 3 }],
      elementi: [{ tipo: 'tangente', f: '8 - x^2', x0: 2, colore: 1 }, { tipo: 'testo', p: [-3.1, 8.1], testo: 'z = 8 − y²', ancora: 'start' }],
      didascalia: 'Il taglio con il piano x = 1, visto di lato: la curva z = 8 − y², con y in orizzontale. In y = 2 la tangente ha pendenza −4: è la derivata parziale ∂z/∂y nel punto (1; 2).'
    },

    /* ---- massimi, minimi e selle ---- */
    gSella: FIG_SELLA,

    /* ---- il vincolo: la circonferenza di livello tangente alla retta ---- */
    gVincolo: {
      tipo: 'piano', x: [-3.4, 5.4], y: [-3.4, 4.2], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, colore: 1, tratteggio: true },
        { tipo: 'cerchio', centro: [0, 0], raggio: 2.2361, colore: 1 },
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, colore: 1, tratteggio: true },
        { tipo: 'retta', m: -0.5, q: 2.5, colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: [1, 2], colore: 3, tratteggio: true },
        { tipo: 'punto', p: [1, 2], etichetta: 'T(1; 2)', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [5.3, 3.6], testo: 'vincolo x + 2y = 5', ancora: 'end' },
        { tipo: 'testo', p: [-0.95, -1.0], testo: 'k = 1', ancora: 'end' },
        { tipo: 'testo', p: [-1.7, -1.75], testo: 'k = 5', ancora: 'end' },
        { tipo: 'testo', p: [-2.2, -2.45], testo: 'k = 9', ancora: 'end' }
      ],
      didascalia: 'Le curve di livello di x² + y²: circonferenze con il centro in O. Quella di quota 1 non arriva alla retta del vincolo, quella di quota 9 la taglia in due punti. Quella di quota 5 la tocca solo in T(1; 2): è tangente, e lì c\'è il minimo vincolato. Il raggio OT è √5.'
    },
    gBilancio: {
      tipo: 'piano', x: [0, 23], y: [0, 12.8], passo: [4, 2], altezza: 420, mirino: false,
      funzioni: [
        { f: '10 - x/2', colore: 2, dominio: [0, 20] },
        { f: '30/x', colore: 1, tratteggio: true, dominio: [2.6, 23] },
        { f: '50/x', colore: 1, dominio: [4.3, 23] },
        { f: '80/x', colore: 1, tratteggio: true, dominio: [6.8, 23] }
      ],
      punti: [{ x: 10, y: 5, etichetta: 'E(10; 5)', posizione: 'basso-sinistra', colore: 2 }],
      elementi: [
        { tipo: 'testo', p: [22.6, 11.6], testo: 'bilancio 2x + 4y = 40', ancora: 'end' },
        { tipo: 'testo', p: [2.6, 10.6], testo: '30', ancora: 'end' },
        { tipo: 'testo', p: [4.5, 10.6], testo: '50', ancora: 'end' },
        { tipo: 'testo', p: [7.3, 10.6], testo: '80', ancora: 'end' }
      ],
      didascalia: 'In arancio la retta del bilancio 2x + 4y = 40, in blu tre curve di indifferenza di U = xy, con il valore dell\'utilità scritto in alto. La curva di utilità 30 taglia la retta: si può fare meglio. Quella di utilità 80 non la raggiunge: costa troppo. Quella di utilità 50 la tocca in E(10; 5), la scelta migliore.'
    },

    /* ---- negli esempi ---- */
    gEsDominio: {
      tipo: 'piano', x: [-2.8, 2.8], y: [-1, 2.8], passo: [1, 1], proporzioni: 'uguali', mirino: false,
      funzioni: [{ f: 'sqrt(4 - x^2)', colore: 1, dominio: [-2, 2] }],
      punti: [{ x: -2, y: 0, vuoto: true, colore: 1 }, { x: 2, y: 0, vuoto: true, colore: 1 }],
      elementi: [
        { tipo: 'area', f: 'sqrt(4 - x^2)', g: '0', da: -2, a: 2, colore: 1 },
        { tipo: 'segmento', da: [-2, 0], a: [2, 0], colore: 1, tratteggio: true }
      ],
      didascalia: 'Il dominio di f(x; y) = √(4 − x² − y²) + ln y: il mezzo cerchio sopra l\'asse x. L\'arco fa parte del dominio (linea continua), il diametro no (tratteggio).'
    },
    gEsTriangolo: {
      tipo: 'piano', x: [-1, 12], y: [-1, 11], passo: [2, 2], proporzioni: 'uguali', mirino: false,
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [10, 0], [0, 10]], colore: 1 },
        { tipo: 'punto', p: [7, 3], etichetta: '(7; 3)', posizione: 'alto-destra', colore: 2 },
        { tipo: 'punto', p: [8, 4], etichetta: '(8; 4)', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [2.6, 2.6], testo: 'possibili' }
      ],
      didascalia: 'Le produzioni possibili: il triangolo x ≥ 0, y ≥ 0, x + y ≤ 10. Il massimo libero (8; 4), in viola, cade fuori. Il migliore fra le produzioni possibili è (7; 3), in arancio, sul lato x + y = 10.'
    },
    gEsLivello: {
      tipo: 'piano', x: [-3, 3], y: [-1.5, 5], passo: [1, 1], altezza: 300, mirino: false,
      funzioni: [
        { f: 'x^2 - 1', colore: 1 },
        { f: 'x^2', colore: 2 },
        { f: 'x^2 + 1', colore: 3 },
        { f: 'x^2 + 2', colore: 4 }
      ],
      didascalia: 'Le curve di livello di f(x; y) = y − x²: le parabole y = x² + k, tutte uguali e spostate in verticale di 1 alla volta. Dal basso: quota −1 in blu, 0 in arancio, 1 in verde, 2 in viola.'
    }
  },

  esempi: [
    { titolo: 'Un dominio fatto di due condizioni', problema: R`Trova e disegna il dominio di $f(x; y) = \sqrt{4 - x^2 - y^2} + \ln y$.`, passi: [
      R`La radice chiede $4 - x^2 - y^2 \ge 0$, cioè $x^2 + y^2 \le 4$: il cerchio di centro $O$ e raggio $2$, bordo compreso.`,
      R`Il logaritmo chiede $y > 0$: il semipiano sopra l'asse $x$, senza l'asse.`,
      R`Le due condizioni devono valere insieme, quindi il dominio è l'**intersezione**: il mezzo cerchio superiore. L'arco fa parte del dominio, il diametro no.

[[grafico:gEsDominio]]`,
      R`Controllo con due punti. $(0; 1)$ dà $4 - 0 - 1 = 3 \ge 0$ e $y = 1 > 0$: sta nel dominio. $(1; 0)$ sta sul diametro: $\ln 0$ non esiste, quindi è fuori.`
    ], risultato: R`Il mezzo cerchio $x^2 + y^2 \le 4$ con $y > 0$: arco compreso, diametro escluso` },

    { titolo: 'Le curve di livello di una funzione', problema: R`Descrivi le curve di livello di $f(x; y) = y - x^2$ e disegna quelle di quota $-1$, $0$, $1$ e $2$. Su quale curva sta il punto $(2; 3)$?`, passi: [
      R`Fisso la quota $k$: $y - x^2 = k$, cioè $y = x^2 + k$.`,
      R`Ogni curva è la parabola $y = x^2$ spostata in verticale di $k$. Sono tutte uguali e non si incontrano mai.

[[grafico:gEsLivello]]`,
      R`Per il punto: $f(2; 3) = 3 - 4 = -1$. Sta sulla curva di quota $-1$, la parabola $y = x^2 - 1$. Infatti $2^2 - 1 = 3$.`,
      R`Lungo una retta verticale le curve sono equidistanti: in verticale la funzione cresce sempre allo stesso ritmo. Infatti $f_y = 1$ in ogni punto.`
    ], risultato: R`Le parabole $y = x^2 + k$; il punto $(2; 3)$ sta sulla curva di quota $-1$` },

    { titolo: 'Derivate parziali e piano tangente', problema: R`Data $f(x; y) = x^3 + 2xy - y^2$, calcola le derivate parziali nel punto $(1; 2)$ e scrivi il piano tangente al grafico.`, passi: [
      R`Il valore: $f(1; 2) = 1 + 4 - 4 = 1$. Il punto del grafico è $(1; 2; 1)$.`,
      R`Rispetto a $x$, con $y$ costante: $f_x = 3x^2 + 2y$. In $(1; 2)$ vale $3 + 4 = 7$.`,
      R`Rispetto a $y$, con $x$ costante: $f_y = 2x - 2y$. In $(1; 2)$ vale $2 - 4 = -2$.`,
      R`Il piano tangente: $z = 1 + 7(x - 1) - 2(y - 2)$. Svolgendo, $z = 7x - 2y - 2$.`,
      R`Controllo: nel punto $(1; 2)$ il piano vale $7 - 4 - 2 = 1$, come la funzione.`
    ], risultato: R`$f_x(1; 2) = 7$, $f_y(1; 2) = -2$; piano tangente $z = 7x - 2y - 2$` },

    { titolo: 'Un minimo e una sella', problema: R`Trova e classifica i punti stazionari di $f(x; y) = x^3 + y^3 - 3xy$.`, passi: [
      R`Le derivate prime: $f_x = 3x^2 - 3y$ e $f_y = 3y^2 - 3x$.`,
      R`Il sistema. Dalla prima equazione $y = x^2$. Nella seconda: $3x^4 - 3x = 0$, cioè $3x(x^3 - 1) = 0$. Quindi $x = 0$ oppure $x = 1$: i punti sono $(0; 0)$ e $(1; 1)$.`,
      R`Le derivate seconde: $f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = -3$. Quindi $H = 36xy - 9$.`,
      R`In $(0; 0)$: $H = -9 < 0$, è una sella.`,
      R`In $(1; 1)$: $H = 36 - 9 = 27 > 0$ e $f_{xx} = 6 > 0$. È un minimo relativo, con $f(1; 1) = 1 + 1 - 3 = -1$.`,
      R`Il minimo non è assoluto. Lungo l'asse $x$ la funzione vale $x^3$, che scende senza fine.`
    ], risultato: R`Sella in $(0; 0)$; minimo relativo in $(1; 1)$, dove $f = -1$` },

    { titolo: 'Un massimo con il vincolo della somma', problema: R`Fra le coppie di numeri positivi con somma $6$, trova quella che rende massimo il prodotto $xy^2$.`, passi: [
      R`La funzione è $f(x; y) = xy^2$, il vincolo è $x + y = 6$ con $x > 0$ e $y > 0$: un segmento senza gli estremi.`,
      R`Dal vincolo $x = 6 - y$, con $0 < y < 6$. Sostituisco: $g(y) = (6 - y)\,y^2 = 6y^2 - y^3$.`,
      R`$g'(y) = 12y - 3y^2 = 3y(4 - y)$. Fra $0$ e $6$ si annulla solo in $y = 4$: è positiva prima e negativa dopo. Quindi è un massimo.`,
      R`Allora $x = 6 - 4 = 2$, e $f(2; 4) = 2 \cdot 16 = 32$.`,
      R`Agli estremi del segmento $g$ si avvicina a $0$: il massimo è davvero in $(2; 4)$.`
    ], risultato: R`$x = 2$ e $y = 4$; il prodotto massimo è $32$` },

    { titolo: 'Il costo minimo in due stabilimenti', problema: R`Un'azienda deve produrre $30$ pezzi in due stabilimenti: $x$ nel primo e $y$ nel secondo. Il costo, in euro, è $C(x; y) = x^2 + 2y^2 + 100$. Come conviene dividere la produzione?`, passi: [
      R`Il vincolo è $x + y = 30$, con $x \ge 0$ e $y \ge 0$: un segmento.`,
      R`Sostituisco $x = 30 - y$: $g(y) = (30 - y)^2 + 2y^2 + 100 = 3y^2 - 60y + 1000$.`,
      R`$g'(y) = 6y - 60$ si annulla per $y = 10$: è negativa prima e positiva dopo, quindi è un minimo.`,
      R`Allora $x = 20$, e $C(20; 10) = 400 + 200 + 100 = 700$ euro.`,
      R`Gli estremi del segmento: $g(0) = 1000$ e $g(30) = 1900$. Sono tutti e due più alti.`,
      R`Controllo con Lagrange: $L_x = 2x - \lambda = 0$ e $L_y = 4y - \lambda = 0$ danno $x = 2y$. Nel vincolo $3y = 30$: di nuovo $y = 10$.`,
      R`Nel secondo stabilimento il costo sale più in fretta, per via del $2y^2$: conviene affidargli meno pezzi.`
    ], risultato: R`$20$ pezzi nel primo stabilimento e $10$ nel secondo; costo minimo $700$ euro` }
  ],

  formulario: [
    { nome: 'Funzione di due variabili', formula: R`z = f(x; y)`, nota: R`A ogni punto $(x; y)$ del dominio corrisponde un solo numero $z$. Il dominio è una regione del piano.` },
    { nome: 'Curva di livello di quota k', formula: R`f(x; y) = k`, nota: R`È il taglio del grafico con il piano $z = k$, visto dall'alto. Curve fitte: superficie ripida.` },
    { nome: 'Derivata parziale rispetto a x', formula: R`f_x(x_0; y_0) = \lim_{h \to 0} \frac{f(x_0 + h; y_0) - f(x_0; y_0)}{h}`, nota: R`In pratica: si deriva in $x$ tenendo $y$ costante. Allo stesso modo $f_y$, con $x$ costante.` },
    { nome: 'Notazioni', formula: R`\frac{\partial f}{\partial x} = f_x \qquad \frac{\partial f}{\partial y} = f_y`, nota: R`Il simbolo $\partial$ si legge «d tonda». Con $z = f(x; y)$ si scrive anche $\dfrac{\partial z}{\partial x}$.` },
    { nome: 'Piano tangente', formula: R`\begin{array}{l} z = f(x_0; y_0) \\ \quad + f_x(x_0; y_0)\,(x - x_0) \\ \quad + f_y(x_0; y_0)\,(y - y_0) \end{array}` },
    { nome: 'Derivate seconde', formula: R`f_{xx} \qquad f_{yy} \qquad f_{xy} = f_{yx}`, nota: R`Le due derivate miste sono uguali per le funzioni che si incontrano a scuola (teorema di Schwarz).` },
    { nome: 'Punti stazionari', formula: R`\begin{cases} f_x(x; y) = 0 \\ f_y(x; y) = 0 \end{cases}`, nota: R`Un massimo o un minimo interno al dominio è un punto stazionario. Non vale il viceversa: c'è anche la sella.` },
    { nome: 'Hessiano', formula: R`H = f_{xx} f_{yy} - (f_{xy})^2 = \det \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}`, nota: R`Le derivate seconde si calcolano nel punto stazionario.` },
    { nome: 'Test dell\'hessiano', formula: R`\begin{array}{l} H > 0,\ f_{xx} > 0: \text{minimo} \\ H > 0,\ f_{xx} < 0: \text{massimo} \\ H < 0: \text{sella} \end{array}`, nota: R`Con $H = 0$ il test non decide.` },
    { nome: 'Funzione lagrangiana', formula: R`L(x; y; \lambda) = f(x; y) - \lambda \left[ g(x; y) - c \right]`, nota: R`Per il vincolo $g(x; y) = c$: si annullano $L_x$, $L_y$ e $L_\lambda$. Con un vincolo lineare basta anche la sostituzione.` },
    { nome: 'Profitto con due beni', formula: R`\Pi(x; y) = R(x; y) - C(x; y)`, nota: R`Il ricavo è $R = p_1 x + p_2 y$: $p_1$ e $p_2$ sono i prezzi di vendita, fissi in concorrenza perfetta.` },
    { nome: 'Vincolo di bilancio', formula: R`p_1 x + p_2 y = m`, nota: R`$m$ è il reddito da spendere. Le curve di livello dell'utilità $U(x; y)$ sono le curve di indifferenza.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'funzione-due-variabili', tipo: 'definizione', fronte: R`Che cos'è una funzione di due variabili?`, retro: R`Una legge che associa a ogni coppia ordinata $(x; y)$ del dominio un solo numero reale $z = f(x; y)$.` },
    { id: 'fc-02', sezione: 'funzione-due-variabili', tipo: 'concetto', fronte: R`Con $f(x; y) = 9 - x^2 - y^2$, quanto vale $f(1; 2)$?`, retro: R`$9 - 1 - 4 = 4$.` },
    { id: 'fc-03', sezione: 'dominio', tipo: 'definizione', fronte: R`Che cos'è il dominio di $f(x; y)$?`, retro: R`L'insieme dei punti $(x; y)$ del piano in cui la formula dà un numero reale: una regione del piano, da disegnare.` },
    { id: 'fc-04', sezione: 'dominio', tipo: 'procedura', fronte: R`Il dominio di $f(x; y) = \sqrt{x + y - 2}$`, retro: R`$x + y - 2 \ge 0$, cioè $y \ge -x + 2$: il semipiano sopra la retta $y = -x + 2$, retta compresa.` },
    { id: 'fc-05', sezione: 'dominio', tipo: 'concetto', fronte: R`Quando il bordo del dominio si disegna continuo e quando tratteggiato?`, retro: R`Continuo se fa parte del dominio ($\ge$, $\le$). Tratteggiato se è escluso ($>$, $<$, $\ne$).` },
    { id: 'fc-06', sezione: 'grafico', tipo: 'definizione', fronte: R`Che cos'è il grafico di $z = f(x; y)$?`, retro: R`L'insieme dei punti $(x; y; f(x; y))$ dello spazio: di solito una superficie. Ogni retta verticale lo taglia al massimo una volta.` },
    { id: 'fc-07', sezione: 'grafico', tipo: 'concetto', fronte: R`Che grafico ha $z = ax + by + c$?`, retro: R`Un piano: si riscrive $ax + by - z + c = 0$.` },
    { id: 'fc-08', sezione: 'curve-di-livello', tipo: 'definizione', fronte: R`Che cos'è la curva di livello di quota $k$?`, retro: R`L'insieme dei punti del piano con $f(x; y) = k$. È il taglio del grafico con il piano $z = k$, visto dall'alto.` },
    { id: 'fc-09', sezione: 'curve-di-livello', tipo: 'concetto', fronte: R`Che cosa vuol dire che le curve di livello sono fitte?`, retro: R`Che la superficie lì è ripida: lo stesso dislivello si supera in meno strada.` },
    { id: 'fc-10', sezione: 'curve-di-livello', tipo: 'formula', fronte: R`Le curve di livello di $z = 9 - x^2 - y^2$`, retro: R`Le circonferenze $x^2 + y^2 = 9 - k$, con il centro nell'origine e raggio $\sqrt{9 - k}$, per $k \le 9$.` },
    { id: 'fc-11', sezione: 'curve-di-livello', tipo: 'concetto', fronte: R`Isoquanti, curve di indifferenza, isobare: che cosa hanno in comune?`, retro: R`Sono tutte curve di livello: della produzione, dell'utilità, della pressione atmosferica.` },
    { id: 'fc-12', sezione: 'derivate-parziali', tipo: 'procedura', fronte: R`Come si calcola $\dfrac{\partial f}{\partial x}$?`, retro: R`Si deriva rispetto a $x$ trattando $y$ come una costante. Si scrive anche $f_x$.` },
    { id: 'fc-13', sezione: 'derivate-parziali', tipo: 'concetto', fronte: R`Che significato geometrico ha $f_x(x_0; y_0)$?`, retro: R`È la pendenza della tangente, nel punto, alla curva che il piano $y = y_0$ taglia sul grafico.` },
    { id: 'fc-14', sezione: 'derivate-parziali', tipo: 'formula', fronte: R`Le derivate parziali di $z = 9 - x^2 - y^2$ nel punto $(1; 2)$`, retro: R`$\dfrac{\partial z}{\partial x} = -2x = -2$ e $\dfrac{\partial z}{\partial y} = -2y = -4$.` },
    { id: 'fc-15', sezione: 'derivate-parziali', tipo: 'formula', fronte: R`Il piano tangente al grafico di $f$ in $(x_0; y_0)$`, retro: R`$z = f(x_0; y_0) + f_x(x_0; y_0)(x - x_0) + f_y(x_0; y_0)(y - y_0)$` },
    { id: 'fc-16', sezione: 'punti-stazionari', tipo: 'definizione', fronte: R`Che cos'è un punto stazionario di $f(x; y)$?`, retro: R`Un punto in cui si annullano insieme le due derivate parziali: $f_x = 0$ e $f_y = 0$.` },
    { id: 'fc-17', sezione: 'punti-stazionari', tipo: 'concetto', fronte: R`Che cos'è un punto di sella?`, retro: R`Un punto stazionario che non è né massimo né minimo: in una direzione la funzione ha un minimo, in un'altra un massimo. Esempio: $z = y^2 - x^2$ nell'origine.` },
    { id: 'fc-18', sezione: 'hessiano', tipo: 'formula', fronte: R`L'hessiano $H$`, retro: R`$H = f_{xx} f_{yy} - (f_{xy})^2$: il determinante della matrice delle derivate seconde.` },
    { id: 'fc-19', sezione: 'hessiano', tipo: 'procedura', fronte: R`Il test dell'hessiano in un punto stazionario`, retro: R`$H > 0$ e $f_{xx} > 0$: minimo. $H > 0$ e $f_{xx} < 0$: massimo. $H < 0$: sella. $H = 0$: il test non decide.` },
    { id: 'fc-20', sezione: 'hessiano', tipo: 'concetto', fronte: R`Che cosa dice il teorema di Schwarz?`, retro: R`Per le funzioni con derivate seconde continue, le due derivate miste sono uguali: $f_{xy} = f_{yx}$.` },
    { id: 'fc-21', sezione: 'vincolati', tipo: 'procedura', fronte: R`Il metodo di sostituzione per un vincolo lineare`, retro: R`Dal vincolo ricavi una variabile e la sostituisci in $f$. Studi la funzione di una variabile che resta; se il vincolo è un segmento, controlli anche gli estremi.` },
    { id: 'fc-22', sezione: 'vincolati', tipo: 'concetto', fronte: R`Nel punto di massimo o di minimo vincolato, come sta la curva di livello rispetto al vincolo?`, retro: R`È tangente alla retta del vincolo.` },
    { id: 'fc-23', sezione: 'vincolati', tipo: 'formula', fronte: R`La funzione lagrangiana per il vincolo $g(x; y) = c$`, retro: R`$L = f(x; y) - \lambda\left[g(x; y) - c\right]$. Si annullano $L_x$, $L_y$ e $L_\lambda$.` },
    { id: 'fc-24', sezione: 'economia', tipo: 'formula', fronte: R`Il profitto di un'azienda che vende due beni a prezzi fissi`, retro: R`$\Pi(x; y) = p_1 x + p_2 y - C(x; y)$: ricavo meno costo.` },
    { id: 'fc-25', sezione: 'economia', tipo: 'definizione', fronte: R`Che cos'è una curva di indifferenza?`, retro: R`Una curva di livello della funzione di utilità: tutte le combinazioni dei due beni che danno la stessa soddisfazione.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $f(2; -1)$ per $f(x; y) = 2x^2 - xy + 3$.`, suggerimenti: [R`Sostituisci $x = 2$ e $y = -1$. Attento al segno di $-xy$.`], risposta: num(13), soluzione: [R`$f(2; -1) = 2 \cdot 4 - 2 \cdot (-1) + 3$.`, R`$= 8 + 2 + 3 = 13$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Un laboratorio prepara $x$ torte e $y$ crostate. Il costo, in euro, è $C(x; y) = 4x + 7y + 150$. Quanto costa preparare $20$ torte e $10$ crostate?`, suggerimenti: [R`Calcola $C(20; 10)$.`], risposta: num(300, 'in euro'), soluzione: [R`$C(20; 10) = 4 \cdot 20 + 7 \cdot 10 + 150 = 80 + 70 + 150$.`, R`Il costo è $300$ euro.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Il punto $(1; -2)$ appartiene al dominio di $f(x; y) = \sqrt{y - 3x + 6}$?`, suggerimenti: [R`Il radicando deve essere $\ge 0$: calcolalo nel punto.`], risposta: SI, soluzione: [R`Nel punto il radicando vale $-2 - 3 + 6 = 1$.`, R`$1 \ge 0$: il punto appartiene al dominio.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Il punto $(3; 0)$ appartiene al dominio di $f(x; y) = \ln(x + y - 4)$?`, suggerimenti: [R`L'argomento del logaritmo deve essere positivo.`], risposta: NO, soluzione: [R`Nel punto l'argomento vale $3 + 0 - 4 = -1$.`, R`$-1$ non è positivo: il punto non appartiene al dominio.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Il dominio di $f(x; y) = \dfrac{1}{x^2 + y^2 - 16}$ è il piano senza una circonferenza. Quanto misura il suo raggio?`, suggerimenti: [R`Il denominatore non può valere zero.`], risposta: num(4), soluzione: [R`Va escluso $x^2 + y^2 - 16 = 0$, cioè $x^2 + y^2 = 16$.`, R`È la circonferenza di centro $O$ e raggio $\sqrt{16} = 4$.`] },
    { id: 'b-06', livello: 'base', difficolta: 2, testo: R`Il dominio di $f(x; y) = \ln(x - y)$ è un semipiano. Scrivilo come disequazione, per esempio $y \ge 2x$.`, suggerimenti: [R`L'argomento del logaritmo deve essere positivo.`, R`Isola la $y$: attento al verso.`], risposta: { tipo: 'testo', accettate: ['y<x', 'x>y', 'x-y>0', 'y-x<0', '0<x-y', '0>y-x', '-x+y<0', '-y+x>0'], segnaposto: 'es. y > 2x', simboli: ['<', '>', '≤', '≥', '−'] }, soluzione: [R`Serve $x - y > 0$, cioè $y < x$.`, R`È il semipiano sotto la retta $y = x$, con la retta esclusa (tratteggiata).`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`La curva di livello di quota $10$ di $f(x; y) = x^2 + y^2 + 1$ è una circonferenza. Quanto misura il suo raggio?`, suggerimenti: [R`Scrivi $f(x; y) = 10$.`], risposta: num(3), soluzione: [R`$x^2 + y^2 + 1 = 10$, cioè $x^2 + y^2 = 9$.`, R`Circonferenza di centro $O$ e raggio $3$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Le curve di livello di $f(x; y) = 4x + 2y$ sono rette parallele. Qual è il loro coefficiente angolare?`, suggerimenti: [R`Scrivi $4x + 2y = k$ e ricava $y$.`], risposta: num(-2), soluzione: [R`$4x + 2y = k$ dà $y = -2x + \dfrac{k}{2}$.`, R`Al variare di $k$ cambia solo il termine noto: il coefficiente angolare è $-2$ per tutte.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Su quale curva di livello di $f(x; y) = xy - x$ sta il punto $(2; 3)$? Scrivi la quota $k$.`, suggerimenti: [R`La quota della curva che passa per un punto è il valore della funzione in quel punto.`], risposta: num(4), soluzione: [R`$f(2; 3) = 2 \cdot 3 - 2 = 4$.`, R`Il punto sta sulla curva di livello $xy - x = 4$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Calcola $f_x(1; 2)$ per $f(x; y) = 3x^2 y - y^3$.`, suggerimenti: [R`Deriva rispetto a $x$: $y$ si comporta come un numero.`], risposta: num(12), soluzione: [R`$f_x = 6xy$, perché $y^3$ è una costante.`, R`$f_x(1; 2) = 6 \cdot 1 \cdot 2 = 12$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Calcola $f_y(1; 2)$ per $f(x; y) = 3x^2 y - y^3$.`, suggerimenti: [R`Ora $x$ è costante: $3x^2 y$ ha coefficiente $3x^2$.`], risposta: num(-9), soluzione: [R`$f_y = 3x^2 - 3y^2$.`, R`$f_y(1; 2) = 3 - 12 = -9$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Calcola $\dfrac{\partial f}{\partial y}$ nel punto $(3; 1)$, con $f(x; y) = 5x - 2xy + y^2$.`, suggerimenti: [R`$5x$ non contiene $y$: la sua derivata rispetto a $y$ è zero.`], risposta: num(-4), soluzione: [R`$\dfrac{\partial f}{\partial y} = -2x + 2y$.`, R`Nel punto $(3; 1)$: $-6 + 2 = -4$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Calcola $f_x(1; 2)$ per $f(x; y) = e^{2x - y}$.`, suggerimenti: [R`È una funzione composta: la derivata di $e^{u}$ è $e^{u} \cdot u'$.`, R`La derivata di $2x - y$ rispetto a $x$ è $2$.`], risposta: num(2), soluzione: [R`$f_x = 2\,e^{2x - y}$.`, R`In $(1; 2)$ l'esponente vale $2 - 2 = 0$: $f_x = 2e^0 = 2$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Calcola la derivata mista $f_{xy}$ nel punto $(1; 2)$, con $f(x; y) = x^3 y^2$.`, suggerimenti: [R`Deriva prima rispetto a $x$, poi il risultato rispetto a $y$.`], risposta: num(12), soluzione: [R`$f_x = 3x^2 y^2$.`, R`$f_{xy} = 6x^2 y$, che in $(1; 2)$ vale $6 \cdot 1 \cdot 2 = 12$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Trova il punto stazionario di $f(x; y) = x^2 + y^2 - 4x + 6y$.`, suggerimenti: [R`Annulla insieme $f_x$ e $f_y$.`], risposta: pt(2, -3), soluzione: [R`$f_x = 2x - 4 = 0$ dà $x = 2$.`, R`$f_y = 2y + 6 = 0$ dà $y = -3$. Il punto stazionario è $(2; -3)$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`$f(x; y) = x^2 + xy + y^2 - 3x$ ha un solo punto stazionario. Quanto vale lì l'hessiano $H$?`, suggerimenti: [R`Le derivate seconde di questa funzione sono numeri: non serve trovare il punto per calcolare $H$.`, R`$H = f_{xx} f_{yy} - (f_{xy})^2$.`], risposta: num(3), soluzione: [R`$f_x = 2x + y - 3$ e $f_y = x + 2y$: il punto stazionario è $(2; -1)$.`, R`$f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = 1$, quindi $H = 4 - 1 = 3$.`, R`$H > 0$ e $f_{xx} > 0$: è un minimo.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`L'origine è un punto stazionario di $f(x; y) = x^2 + 3xy + y^2$. È un massimo, un minimo o una sella?`, suggerimenti: [R`Calcola l'hessiano: le derivate seconde sono numeri.`], risposta: SELLA, soluzione: [R`$f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = 3$.`, R`$H = 4 - 9 = -5 < 0$: è una sella.`, R`Infatti lungo la retta $y = -x$ la funzione vale $-x^2$, e lungo l'asse $x$ vale $x^2$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Il punto $(2; 2)$ è stazionario per $f(x; y) = -x^2 - 2y^2 + 4x + 8y$. È un massimo, un minimo o una sella?`, suggerimenti: [R`Calcola $f_{xx}$, $f_{yy}$ e $f_{xy}$.`, R`Con $H > 0$ decide il segno di $f_{xx}$.`], risposta: MASSIMO, soluzione: [R`$f_{xx} = -2$, $f_{yy} = -4$, $f_{xy} = 0$: $H = 8 > 0$.`, R`$f_{xx} < 0$: è un massimo, e $f(2; 2) = -4 - 8 + 8 + 16 = 12$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Trova il valore minimo di $f(x; y) = x^2 + 3y^2$ con il vincolo $x + y = 8$.`, suggerimenti: [R`Dal vincolo $x = 8 - y$: sostituisci.`, R`Studia la funzione di $y$ che ottieni.`], risposta: num(48), soluzione: [R`$g(y) = (8 - y)^2 + 3y^2 = 4y^2 - 16y + 64$.`, R`$g'(y) = 8y - 16 = 0$ per $y = 2$: è un minimo, perché $g$ è una parabola verso l'alto.`, R`Allora $x = 6$ e $f(6; 2) = 36 + 12 = 48$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Un consumatore ha $60$ euro e compra due beni, a $5$ euro e a $2$ euro l'unità. La sua utilità è $U(x; y) = xy$. Quante unità di ciascun bene gli conviene comprare? Scrivi $(x; y)$.`, suggerimenti: [R`Il vincolo di bilancio è $5x + 2y = 60$.`, R`Ricava $y$ e sostituisci in $U$.`], risposta: pt(6, 15), soluzione: [R`Dal vincolo $y = 30 - \dfrac{5}{2}x$.`, R`$U = x\left(30 - \dfrac{5}{2}x\right) = 30x - \dfrac{5}{2}x^2$, e $U' = 30 - 5x = 0$ per $x = 6$.`, R`Allora $y = 30 - 15 = 15$: la scelta migliore è $(6; 15)$, con $U = 90$.`] },

    { id: 'es-01', difficolta: 2, testo: R`Descrivi il dominio di $f(x; y) = \ln(4 - x^2 - y^2) + \sqrt{y - x}$. Il punto $(-1; 1)$ ci sta?`, suggerimenti: [R`Ci sono due condizioni, una per il logaritmo e una per la radice.`, R`Il dominio è l'intersezione di un cerchio senza bordo e di un semipiano.`], risposta: SI, soluzione: [R`Il logaritmo chiede $x^2 + y^2 < 4$: l'interno del cerchio di centro $O$ e raggio $2$, senza la circonferenza.`, R`La radice chiede $y \ge x$: il semipiano sopra la bisettrice $y = x$, retta compresa.`, R`Il dominio è il mezzo cerchio sopra la bisettrice, con il diametro compreso e l'arco escluso. Gli estremi del diametro, sulla circonferenza, restano fuori.`, R`Per $(-1; 1)$: $4 - 1 - 1 = 2 > 0$ e $1 - (-1) = 2 \ge 0$. Il punto appartiene al dominio.`] },
    { id: 'es-02', difficolta: 2, testo: R`Descrivi le curve di livello di $f(x; y) = xy$. Qual è la quota della curva che passa per $(-2; 3)$?`, suggerimenti: [R`Per $k \ne 0$, $xy = k$ è un'iperbole equilatera.`, R`E per $k = 0$?`], risposta: num(-6), soluzione: [R`Per $k \ne 0$ la curva $xy = k$ è l'iperbole equilatera $y = \dfrac{k}{x}$, con gli assi come asintoti.`, R`Con $k > 0$ i rami stanno nel primo e nel terzo quadrante; con $k < 0$ nel secondo e nel quarto.`, R`Per $k = 0$ la curva è fatta dai due assi: $xy = 0$ vuol dire $x = 0$ oppure $y = 0$.`, R`$f(-2; 3) = -6$: il punto sta sul ramo di $xy = -6$ nel secondo quadrante.`] },
    { id: 'es-03', difficolta: 2, testo: R`Scrivi il piano tangente al grafico di $f(x; y) = x^2 y - 3y$ nel punto di coordinate $x = 2$, $y = 1$.`, suggerimenti: [R`Calcola $f(2; 1)$, $f_x(2; 1)$ e $f_y(2; 1)$.`, R`$z = f(x_0; y_0) + f_x(x_0; y_0)(x - x_0) + f_y(x_0; y_0)(y - y_0)$.`], risposta: pianoZ(4, 1, -8), soluzione: [R`$f(2; 1) = 4 - 3 = 1$.`, R`$f_x = 2xy$, che vale $4$; $f_y = x^2 - 3$, che vale $1$.`, R`$z = 1 + 4(x - 2) + (y - 1)$, cioè $z = 4x + y - 8$.`] },
    { id: 'es-04', difficolta: 3, testo: R`Trova e classifica i punti stazionari di $f(x; y) = x^3 + y^3 - 3x - 12y$. Scrivi le coordinate del punto di massimo.`, suggerimenti: [R`$f_x$ dipende solo da $x$ e $f_y$ solo da $y$: i punti stazionari sono quattro.`, R`$f_{xy} = 0$, quindi $H = f_{xx} f_{yy}$.`], risposta: pt(-1, -2), soluzione: [R`$f_x = 3x^2 - 3 = 0$ per $x = \pm 1$; $f_y = 3y^2 - 12 = 0$ per $y = \pm 2$.`, R`I punti stazionari sono $(1; 2)$, $(1; -2)$, $(-1; 2)$, $(-1; -2)$. Le derivate seconde: $f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = 0$, quindi $H = 36xy$.`, R`$(1; 2)$: $H = 72 > 0$, $f_{xx} = 6 > 0$, minimo con $f = -18$. $(-1; -2)$: $H = 72 > 0$, $f_{xx} = -6 < 0$, massimo con $f = 18$.`, R`$(1; -2)$ e $(-1; 2)$: $H = -72 < 0$, due selle.`] },
    { id: 'es-05', difficolta: 2, testo: R`Mostra che l'origine è un punto stazionario di $f(x; y) = x^4 + y^2$ in cui il test dell'hessiano non decide. Che cos'è l'origine: un massimo, un minimo o una sella?`, suggerimenti: [R`Calcola $H$ nell'origine.`, R`Confronta $f(x; y)$ con $f(0; 0)$: che segno ha $x^4 + y^2$?`], risposta: MINIMO, soluzione: [R`$f_x = 4x^3$ e $f_y = 2y$ si annullano nell'origine.`, R`$f_{xx} = 12x^2$ vale $0$, $f_{yy} = 2$, $f_{xy} = 0$: $H = 0$, il test non decide.`, R`Però $x^4 + y^2 \ge 0 = f(0; 0)$ per ogni punto: l'origine è un minimo, anzi il minimo assoluto.`] },
    { id: 'es-06', difficolta: 2, testo: R`Trova il massimo di $f(x; y) = xy$ con il vincolo $x + 3y = 12$, per $x \ge 0$ e $y \ge 0$. Scrivi il punto $(x; y)$.`, suggerimenti: [R`Ricava $x$ dal vincolo, con $0 \le y \le 4$.`, R`Controlla anche gli estremi del segmento.`], risposta: pt(6, 2), soluzione: [R`$x = 12 - 3y$, con $0 \le y \le 4$. Allora $g(y) = (12 - 3y)\,y = 12y - 3y^2$.`, R`$g'(y) = 12 - 6y = 0$ per $y = 2$, con $g' > 0$ prima e $g' < 0$ dopo.`, R`Agli estremi $g(0) = g(4) = 0$. Il massimo è in $(6; 2)$, dove $f = 12$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Con i moltiplicatori di Lagrange trova il minimo di $f(x; y) = 2x^2 + y^2$ con il vincolo $x + y = 6$.`, suggerimenti: [R`$L = 2x^2 + y^2 - \lambda(x + y - 6)$.`, R`Dalle prime due equazioni ricavi un legame fra $x$ e $y$.`], risposta: num(24), soluzione: [R`$L_x = 4x - \lambda = 0$, $L_y = 2y - \lambda = 0$, $L_\lambda = -(x + y - 6) = 0$.`, R`Dalle prime due $4x = 2y$, cioè $y = 2x$. Nel vincolo $3x = 6$: $x = 2$, $y = 4$, $\lambda = 8$.`, R`$f(2; 4) = 8 + 16 = 24$. È un minimo: sostituendo $y = 6 - x$ si trova la parabola $3x^2 - 12x + 36$, rivolta verso l'alto.`] },
    { id: 'es-08', difficolta: 2, testo: R`Un'azienda vende due prodotti a prezzi fissi: $18$ e $15$ migliaia di euro alla tonnellata. Il costo, in migliaia di euro, è $C(x; y) = x^2 + xy + y^2 + 50$. Trova il profitto massimo.`, suggerimenti: [R`$\Pi = 18x + 15y - C(x; y)$.`, R`Annulla le due derivate parziali e risolvi il sistema.`], risposta: num(43, 'in migliaia di euro'), soluzione: [R`$\Pi = 18x + 15y - x^2 - xy - y^2 - 50$.`, R`$\Pi_x = 18 - 2x - y = 0$ e $\Pi_y = 15 - x - 2y = 0$. Dalla prima $y = 18 - 2x$; nella seconda $3x - 21 = 0$, quindi $x = 7$ e $y = 4$.`, R`$\Pi_{xx} = -2$, $\Pi_{yy} = -2$, $\Pi_{xy} = -1$: $H = 3 > 0$ con $\Pi_{xx} < 0$, è un massimo.`, R`$\Pi(7; 4) = 126 + 60 - 49 - 28 - 16 - 50 = 43$: $43\,000$ euro.`] },
    { id: 'es-09', difficolta: 3, testo: R`**Problema completo.** Un'azienda produce due beni, A e B, in quantità $x$ e $y$ (tonnellate al mese). Li vende ai prezzi fissi di $20$ e $16$ migliaia di euro alla tonnellata. Il costo totale mensile, in migliaia di euro, è $C(x; y) = x^2 + xy + y^2 + 40$.

a) Scrivi la funzione del profitto e il suo dominio economico.
b) Trova la produzione che rende massimo il profitto senza altri vincoli, e verifica che è un massimo.
c) Gli impianti producono al massimo $10$ tonnellate al mese in tutto. La produzione del punto b) è possibile?
d) Rappresenta nel piano $xy$ le produzioni possibili. Trova la produzione migliore con la capacità piena, $x + y = 10$, e il profitto corrispondente.
e) Spiega perché nessuna produzione possibile dà di più.

Scrivi il profitto massimo del punto d), in migliaia di euro.`, suggerimenti: [R`Il profitto è ricavo meno costo, con $x \ge 0$ e $y \ge 0$.`, R`Per il punto d) sostituisci $y = 10 - x$ e studia la funzione di $x$, per $0 \le x \le 10$.`, R`Per il punto e) confronta il valore di d) con il profitto sui lati del triangolo che stanno sugli assi.`], risposta: num(69, 'in migliaia di euro'), soluzione: [
      R`a) $\Pi(x; y) = 20x + 16y - x^2 - xy - y^2 - 40$, con dominio economico $x \ge 0$, $y \ge 0$.`,
      R`b) $\Pi_x = 20 - 2x - y = 0$ e $\Pi_y = 16 - x - 2y = 0$. Dalla prima $y = 20 - 2x$; nella seconda $3x - 24 = 0$. Quindi $x = 8$, $y = 4$. Inoltre $H = (-2)(-2) - (-1)^2 = 3 > 0$ e $\Pi_{xx} = -2 < 0$: massimo, con $\Pi(8; 4) = 72$.`,
      R`c) Servirebbero $8 + 4 = 12$ tonnellate al mese: più delle $10$ possibili.`,
      R`d) Le produzioni possibili formano il triangolo $x \ge 0$, $y \ge 0$, $x + y \le 10$. Sul lato $x + y = 10$: $\Pi = 20x + 16(10 - x) - x^2 - x(10 - x) - (10 - x)^2 - 40 = -x^2 + 14x + 20$.`,
      R`La derivata $-2x + 14$ si annulla per $x = 7$: positiva prima, negativa dopo. Agli estremi $\Pi$ vale $20$ (con $x = 0$) e $60$ (con $x = 10$). Il migliore è $x = 7$, $y = 3$, con $\Pi = -49 + 98 + 20 = 69$.

[[grafico:gEsTriangolo]]`,
      R`e) $H$ e $\Pi_{xx}$ non dipendono dal punto: $\Pi$ è una cupola con un solo punto stazionario, fuori dal triangolo. Il massimo sul triangolo sta quindi sul bordo. Sugli assi il profitto arriva al massimo a $24$ (con $x = 0$, $y = 8$) e a $60$ (con $y = 0$, $x = 10$). Vince $(7; 3)$, con $69\,000$ euro al mese.`,
      R`Il limite di capacità costa all'azienda $72 - 69 = 3$ migliaia di euro al mese.`
    ] },
    { id: 'es-10', difficolta: 2, testo: R`L'utilità di un consumatore è $U(x; y) = x^2 y$. I due beni costano $3$ euro e $2$ euro l'unità, e il reddito è di $90$ euro. Quale paniere $(x; y)$ rende massima l'utilità?`, suggerimenti: [R`Il vincolo di bilancio è $3x + 2y = 90$.`, R`Ricava $y = 45 - \dfrac{3}{2}x$ e sostituisci.`], risposta: pt(20, 15), soluzione: [R`$U = x^2\left(45 - \dfrac{3}{2}x\right) = 45x^2 - \dfrac{3}{2}x^3$, con $0 \le x \le 30$.`, R`$U' = 90x - \dfrac{9}{2}x^2 = \dfrac{9}{2}x\,(20 - x)$: nell'intervallo si annulla in $x = 20$, positiva prima e negativa dopo.`, R`$y = 45 - 30 = 15$ e $U(20; 15) = 400 \cdot 15 = 6000$. Agli estremi $U = 0$.`, R`Il consumatore spende $60$ euro per il primo bene e $30$ per il secondo: due terzi e un terzo, come gli esponenti $2$ e $1$.`] },
    { id: 'es-11', difficolta: 2, testo: R`Su una carta in scala $1 : 25\,000$ le curve di livello sono ogni $10$ m di dislivello. Vicino al rifugio $A$ due curve vicine distano $2$ mm sulla carta, vicino al rifugio $B$ distano $8$ mm. Qual è la pendenza media vicino ad $A$, in percentuale? E vicino a $B$?`, suggerimenti: [R`Trasforma la distanza sulla carta in distanza vera: moltiplica per $25\,000$.`, R`La pendenza è il dislivello diviso la distanza in orizzontale.`], risposta: num(20, 'in percentuale'), soluzione: [R`Vicino ad $A$: $2\ \text{mm} \cdot 25\,000 = 50\,000\ \text{mm} = 50$ m.`, R`Pendenza: $\dfrac{10}{50} = 0{,}2$, cioè il $20\%$.`, R`Vicino a $B$: $8 \cdot 25\,000\ \text{mm} = 200$ m, e $\dfrac{10}{200} = 5\%$. Curve quattro volte più fitte, pendenza quattro volte più grande.`] },
    { id: 'es-12', difficolta: 3, testo: R`Per quali valori di $k$ il test dell'hessiano dice che l'origine è un minimo per $f(x; y) = x^2 + kxy + y^2$? Che cosa succede per gli altri valori?`, suggerimenti: [R`Le derivate seconde sono numeri: calcola $H$ in funzione di $k$.`, R`Con $k = 2$ la funzione è un quadrato: $(x + y)^2$.`], risposta: { tipo: 'testo', accettate: ['-2<k<2', 'k>-2ek<2', 'k<2ek>-2', 'k>-2,k<2', '|k|<2', '(-2,2)', '(-2;2)', ']-2;2[', ']-2,2[', 'k∈(-2,2)', 'k∈(-2;2)', 'k∈]-2;2[', '2>k>-2', 'k^2<4', 'k²<4'], segnaposto: 'es. −1 < k < 3', simboli: ['<', '>', '−', '|'] }, soluzione: [R`L'origine è stazionaria per ogni $k$: $f_x = 2x + ky$ e $f_y = kx + 2y$ si annullano in $(0; 0)$.`, R`$f_{xx} = 2$, $f_{yy} = 2$, $f_{xy} = k$, quindi $H = 4 - k^2$.`, R`$H > 0$ per $-2 < k < 2$: con $f_{xx} = 2 > 0$, il test dice minimo.`, R`Per $|k| > 2$: $H < 0$, sella. Per $k = \pm 2$: $H = 0$ e il test tace. Però $f = (x \pm y)^2 \ge 0$, quindi l'origine è ancora un minimo, non isolato: vale zero su tutta una retta.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Il dominio di una funzione di due variabili è…`, opzioni: [R`un intervallo della retta reale`, R`una regione del piano $xy$`, R`una superficie nello spazio`, R`una curva di livello`], corretta: 1, spiegazione: R`Il dominio è fatto di coppie $(x; y)$, cioè di punti del piano. Non è un intervallo, che contiene solo numeri. La superficie nello spazio è il grafico, non il dominio.` },
    { id: 'q-02', domanda: R`Con $f(x; y) = x - y^2$, quanto valgono $f(2; 1)$ e $f(1; 2)$?`, opzioni: [R`sono uguali, perché i numeri sono gli stessi`, R`$f(2; 1) = -3$ e $f(1; 2) = 1$`, R`$f(2; 1) = 1$ e $f(1; 2) = -3$`, R`non si possono calcolare senza il grafico`], corretta: 2, spiegazione: R`$f(2; 1) = 2 - 1 = 1$, mentre $f(1; 2) = 1 - 4 = -3$. La coppia è ordinata: il primo numero va al posto di $x$, il secondo al posto di $y$.` },
    { id: 'q-03', domanda: R`Il grafico di $z = f(x; y)$ è…`, opzioni: [R`una superficie nello spazio`, R`una curva nel piano`, R`una famiglia di rette parallele`, R`una regione del piano $xy$`], corretta: 0, spiegazione: R`Sopra ogni punto $(x; y)$ del dominio si mette un punto di quota $f(x; y)$: insieme formano una superficie. La regione del piano è il dominio. Le curve nel piano sono le curve di livello.` },
    { id: 'q-04', domanda: R`La curva di livello di quota $k$ di $f(x; y)$ è…`, opzioni: [R`il taglio del grafico con il piano $z = k$, visto dall'alto`, R`il taglio del grafico con il piano verticale $x = k$, visto di lato`, R`il grafico della derivata parziale $f_x$`, R`l'insieme dei punti in cui la pendenza vale $k$`], corretta: 0, spiegazione: R`È l'insieme dei punti con $f(x; y) = k$: quelli che stanno alla quota $k$. Il taglio con $x = k$ è verticale, e serve per le derivate parziali.` },
    { id: 'q-05', domanda: R`Due curve di livello della stessa funzione, di quote diverse…`, opzioni: [R`possono incrociarsi in un punto`, R`sono sempre parallele`, R`sono sempre circonferenze`, R`non si incontrano mai`], corretta: 3, spiegazione: R`In un punto comune la funzione avrebbe due valori diversi, e una funzione ne ha uno solo. Non sono però sempre parallele né circonferenze: dipende dalla funzione.` },
    { id: 'q-06', domanda: R`Su una carta le curve di livello sono molto vicine fra loro. In quel tratto la superficie…`, opzioni: [R`è quasi piana`, R`è ripida`, R`ha sicuramente un massimo`, R`ha sicuramente una sella`], corretta: 1, spiegazione: R`Fra due curve vicine il dislivello è fisso. Se le curve sono vicine, lo stesso dislivello si supera in poca strada: la salita è ripida.` },
    { id: 'q-07', domanda: R`Come si calcola la derivata parziale $f_y$?`, opzioni: [R`derivando rispetto a $x$ con $y$ costante`, R`derivando prima rispetto a $x$, poi rispetto a $y$`, R`derivando rispetto a $y$ con $x$ costante`, R`ponendo $x = 0$ e derivando il resto`], corretta: 2, spiegazione: R`Si deriva nella variabile scritta in basso, e l'altra si tratta come un numero. Derivare prima in $x$ e poi in $y$ dà una derivata seconda mista.` },
    { id: 'q-08', domanda: R`Quanto vale la derivata parziale di $xy^2$ rispetto a $x$?`, opzioni: [R`$2xy$`, R`$0$`, R`$2y$`, R`$y^2$`], corretta: 3, spiegazione: R`$y^2$ è una costante, coefficiente di $x$: la derivata è $y^2$. $2xy$ è la derivata rispetto a $y$.` },
    { id: 'q-09', domanda: R`$f_x(x_0; y_0)$ è la pendenza della tangente alla curva che il grafico ha in comune con il piano…`, opzioni: [R`$x = x_0$`, R`$z = 0$`, R`$y = y_0$`, R`$z = f(x_0; y_0)$`], corretta: 2, spiegazione: R`Per derivare rispetto a $x$ si tiene ferma $y$: si taglia con il piano verticale $y = y_0$, su cui cambia solo $x$. Il piano $z = f(x_0; y_0)$ dà invece la curva di livello.` },
    { id: 'q-10', domanda: R`Un punto stazionario di $f(x; y)$ è un punto in cui…`, opzioni: [R`$f$ vale zero`, R`$f_x = 0$ e $f_y = 0$`, R`$f_x = 0$ oppure $f_y = 0$`, R`l'hessiano vale zero`], corretta: 1, spiegazione: R`Servono tutte e due le derivate nulle, insieme: il piano tangente è orizzontale. Con una sola derivata nulla, nell'altra direzione la funzione sale o scende.` },
    { id: 'q-11', domanda: R`Un punto stazionario è sempre un massimo o un minimo relativo?`, opzioni: [R`no: può essere un punto di sella`, R`sì, perché lì il piano tangente è orizzontale`, R`sì, se la funzione è un polinomio`, R`no: è sempre un punto di sella`], corretta: 0, spiegazione: R`$y^2 - x^2$ ha un punto stazionario nell'origine, che non è né massimo né minimo. Ma un punto stazionario non è sempre una sella: la cima della collina è un massimo.` },
    { id: 'q-12', domanda: R`In un punto stazionario $H > 0$ e $f_{xx} < 0$. Il punto è…`, opzioni: [R`un minimo relativo`, R`una sella`, R`un punto in cui il test non decide`, R`un massimo relativo`], corretta: 3, spiegazione: R`Con $H > 0$ il punto è un estremo, e il segno di $f_{xx}$ dice quale. Negativo vuol dire concavità verso il basso: massimo.` },
    { id: 'q-13', domanda: R`In un punto stazionario $H < 0$ e $f_{xx} > 0$. Il punto è…`, opzioni: [R`un minimo, perché $f_{xx} > 0$`, R`un massimo`, R`una sella`, R`un punto in cui il test non decide`], corretta: 2, spiegazione: R`Con $H < 0$ è sempre una sella. Il segno di $f_{xx}$ conta solo quando $H > 0$.` },
    { id: 'q-14', domanda: R`In un punto stazionario l'hessiano vale $0$. Che cosa si può concludere?`, opzioni: [R`è sicuramente una sella`, R`è sicuramente un minimo`, R`il punto non è stazionario`, R`niente: il test non decide`], corretta: 3, spiegazione: R`$x^4 + y^4$ e $x^4 - y^4$ hanno tutte e due $H = 0$ nell'origine. La prima ha un minimo, la seconda una sella. Serve un altro ragionamento.` },
    { id: 'q-15', domanda: R`Con un vincolo lineare, il metodo di sostituzione…`, opzioni: [R`porta a una funzione di una sola variabile`, R`cerca i punti stazionari liberi e poi li controlla sul vincolo`, R`richiede sempre il calcolo dell'hessiano`, R`funziona solo se anche $f$ è lineare`], corretta: 0, spiegazione: R`Dal vincolo si ricava una variabile e la si sostituisce: resta una funzione di una variabile. I punti stazionari liberi in genere non stanno sul vincolo, e l'hessiano non serve.` },
    { id: 'q-16', domanda: R`Nel punto di massimo o di minimo vincolato, la curva di livello di $f$ che passa di lì…`, opzioni: [R`taglia la retta del vincolo in due punti`, R`è tangente alla retta del vincolo`, R`è perpendicolare alla retta del vincolo`, R`passa sempre per l'origine`], corretta: 1, spiegazione: R`Se la tagliasse, spostandosi sulla retta si troverebbero valori di $f$ più alti e più bassi. Nell'ottimo la curva tocca la retta senza attraversarla.` },
    { id: 'q-17', domanda: R`Che cos'è una curva di indifferenza?`, opzioni: [R`la retta del vincolo di bilancio del consumatore`, R`il grafico del prezzo di un bene`, R`l'insieme dei punti stazionari dell'utilità`, R`una curva di livello della funzione di utilità`], corretta: 3, spiegazione: R`Lungo una curva di indifferenza l'utilità è costante: il consumatore è soddisfatto allo stesso modo. La retta del bilancio è il vincolo, una cosa diversa.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Il dominio di una funzione di due variabili non è un intervallo. $x + y \ge 2$ è un semipiano: disegnalo, con il bordo continuo o tratteggiato.` },
    { tipo: 'metodo', testo: R`Per scegliere il semipiano giusto prova un punto fuori dal bordo, di solito l'origine. Se la disuguaglianza è vera, il semipiano è quello che lo contiene.` },
    { tipo: 'trucco', testo: R`Quando derivi rispetto a $x$, immagina che ogni $y$ sia un numero, per esempio $5$. Così $3xy^2$ diventa $75x$, e la derivata $3y^2$ viene da sé.` },
    { tipo: 'errore', testo: R`Un punto stazionario annulla **tutte e due** le derivate parziali. Con $f_x = 0$ e $f_y \ne 0$ il punto non è stazionario.` },
    { tipo: 'trucco', testo: R`Con $H > 0$ guarda il segno di $f_{xx}$: positivo minimo, negativo massimo. Con $H < 0$ è una sella, senza guardare altro.` },
    { tipo: 'errore', testo: R`Con $H = 0$ il test non dice niente. Non concludere «sella» né «minimo»: studia la funzione vicino al punto.` },
    { tipo: 'metodo', testo: R`Con un vincolo lineare ricava la variabile più comoda e sostituisci. Se il vincolo è un segmento, confronta anche i valori agli estremi.` },
    { tipo: 'trucco', testo: R`Controlla il risultato di un problema vincolato: il punto deve soddisfare il vincolo. E la curva di livello che passa di lì deve essere tangente alla retta.` },
    { tipo: 'metodo', testo: R`In economia scrivi prima il profitto come ricavo meno costo, e fissa $x \ge 0$, $y \ge 0$. Solo dopo deriva.` }
  ],

  aneddoti: [
    { matematico: 'Charles Hutton', anni: '1737–1823', titolo: 'Le curve di livello nate per pesare la Terra', testo: R`Nel 1774 l'astronomo reale Nevil Maskelyne portò i suoi strumenti sullo Schiehallion, un monte scozzese dalla forma molto regolare. Voleva misurare di quanto la massa del monte deviava un filo a piombo. Da quella deviazione si poteva ricavare la densità media della Terra. Serviva però il volume del monte, e la squadra ne misurò l'altezza in moltissimi punti. I calcoli toccarono a Charles Hutton, professore di matematica all'Accademia militare di Woolwich. Per orientarsi fra tanti numeri, Hutton unì con una linea i punti che stavano alla stessa altezza. Così il monte si leggeva a colpo d'occhio, e il volume si poteva calcolare a fette. Nel 1778 pubblicò il risultato: la Terra è in media circa $4{,}5$ volte più densa dell'acqua. Il valore di oggi è circa $5{,}5$. Linee simili esistevano già sulle carte dei fondali marini, ma da allora si diffusero sulle carte delle montagne.`, legame: R`Le linee di Hutton sono le curve di livello di questo argomento: i punti alla stessa quota, visti dall'alto, che fanno leggere una superficie su un foglio.` },

    { matematico: 'Paul Douglas e Charles Cobb', anni: '1892–1976 e 1875–1949', titolo: 'Una formula per la produzione di un Paese', testo: R`Nel 1927 l'economista Paul Douglas, dell'Università di Chicago, studiava l'industria degli Stati Uniti dal 1899 al 1922. Aveva tre serie di numeri: la quantità prodotta, i lavoratori impiegati e il capitale investito in macchine e fabbriche. Disegnò le tre serie sullo stesso grafico. La curva della produzione stava sempre fra le altre due, più vicina a quella del lavoro. Douglas chiese aiuto a Charles Cobb, un matematico dell'Amherst College. Insieme trovarono una formula semplice: la produzione era circa $1{,}01\,L^{3/4}K^{1/4}$, con $L$ il lavoro e $K$ il capitale. L'articolo uscì nel 1928 con il titolo *A Theory of Production*. Da allora la «funzione di Cobb-Douglas» sta in tutti i libri di economia. Douglas ebbe poi una seconda vita: dal 1949 al 1967 fu senatore dell'Illinois.`, legame: R`La funzione di Cobb-Douglas è una funzione di due variabili. Le sue curve di livello sono gli isoquanti: le combinazioni di lavoro e capitale che danno la stessa produzione.` },

    { matematico: 'Vilfredo Pareto', anni: '1848–1923', titolo: 'L\'ingegnere che non voleva misurare il piacere', testo: R`Vilfredo Pareto nacque a Parigi da un nobile genovese esule per motivi politici. Si laureò in ingegneria a Torino nel 1870 e per una ventina d'anni lavorò per le ferrovie e per l'industria del ferro, in Toscana. Solo dopo i quarant'anni si dedicò all'economia. Nel 1893 ebbe la cattedra di Losanna, al posto di Léon Walras, uno dei padri dell'economia matematica. Nel *Manuale di economia politica* del 1906 affrontò un problema spinoso: il piacere di una persona non si può misurare. Pareto osservò che non serve. Basta sapere quali combinazioni di beni una persona trova equivalenti, e quali preferisce. Le combinazioni equivalenti formano le curve di indifferenza, che l'inglese Francis Edgeworth aveva introdotto nel 1881. Con queste curve e con la retta del bilancio, la scelta migliore si trova senza misurare la felicità.`, legame: R`Le curve di indifferenza sono le curve di livello dell'utilità. Nella scelta migliore una di esse è tangente alla retta del vincolo di bilancio.` }
  ]
});
})();
