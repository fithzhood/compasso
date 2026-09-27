/* Laboratorio «Il microscopio» — il limite è il valore a cui la funzione si avvicina,
   non il valore nel punto. Una lente d'ingrandimento centrata su x₀ mostra la zona ingrandita
   Z volte; un puntino esploratore cammina sulla curva a passi di 1/Z e riempie la tabella dei
   valori, da sinistra e da destra. In x₀ il puntino non si ferma mai: lì non c'è niente da leggere.
   Schermata singola (SCHEMA-LAB.md): la scena è un SVG la cui forma segue lo spazio che c'è
   (ResizeObserver), il dito si legge con la matrice dello schermo; modalità libera: la funzione
   e il punto li sceglie lo studente. Modelli: laboratori/bilancia.js, laboratori/vasca.js. */
(function () {
  const STILE = `
    .lab-microscopio [hidden] { display: none !important; }
    .lab-microscopio .lab-scena { overflow: hidden; touch-action: none; background: var(--sup2); }
    .lab-microscopio .lab-scena > svg { --k: 1; }
    /* lo zoom sta in un angolo della scena, in alto a sinistra, dove le curve dei livelli non passano */
    .lab-microscopio .gruppo-zoom { position: absolute; z-index: 2; top: 8px; left: 8px; display: flex; align-items: center; gap: 4px; padding: 3px; border-radius: 12px; background: color-mix(in srgb, var(--sup) 88%, transparent); border: 1px solid var(--bordo); box-shadow: var(--ombra); }
    .lab-microscopio .gruppo-zoom .btn { min-width: 40px; padding: 0 8px; font-size: 1.15rem; }
    .lab-microscopio .conta-z { min-width: 3.6em; text-align: center; font-weight: 700; font-size: .9rem; font-variant-numeric: tabular-nums; color: var(--testo); white-space: nowrap; }
    /* --- pannello --- */
    .lab-microscopio .compito { text-align: center; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); color: var(--testo2); line-height: 1.5; }
    .lab-microscopio .compito .katex { font-size: 1.05em; }
    /* sul telefono in verticale la consegna è quella breve; quella intera sta nel «?» */
    .lab-microscopio .compito .c-breve { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-microscopio .compito .c-breve { display: inline; } .lab-microscopio .compito .c-breve + .c-lungo { display: none; } }
    .lab-microscopio .mic-formula { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0 18px; font-size: clamp(1rem, 2.7cqmin, 1.3rem); line-height: 1.25; text-align: center; }
    .lab-microscopio .mic-formula .lim { color: var(--testo2); }
    .lab-microscopio .mic-formula .lim.risolto { color: var(--ok); }
    .lab-microscopio .tabella { display: flex; justify-content: center; }
    .lab-microscopio table { border-collapse: collapse; font-size: clamp(.8rem, 2.1cqmin, 1rem); font-variant-numeric: tabular-nums; color: var(--testo); }
    .lab-microscopio th, .lab-microscopio td { padding: 1px 9px; text-align: right; white-space: nowrap; line-height: 1.45; }
    .lab-microscopio thead th { color: var(--testo2); font-weight: 600; font-size: max(12.5px, .95em); border-bottom: 1px solid var(--bordo); }
    .lab-microscopio .sep { border-left: 1px solid var(--bordo); }
    .lab-microscopio td.vuoto { color: var(--testo3); }
    .lab-microscopio td.ultima { color: var(--accento-testo); font-weight: 700; }
    @container lab (max-width: 440px) { .lab-microscopio th, .lab-microscopio td { padding: 1px 5px; } .lab-microscopio table { font-size: .78rem; } }
    .lab-microscopio .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-microscopio .lab-messaggio .katex { font-size: 1.05em; }
    .lab-microscopio.in-libero .lab-messaggio:empty { display: none; }
    .lab-microscopio .lab-barra { padding: 0; border: 0; gap: 6px 8px; justify-content: center; flex-wrap: wrap; align-items: center; }
    .lab-microscopio .lab-barra .btn { min-height: 40px; }
    .lab-microscopio .btn[disabled] { opacity: .35; cursor: default; }
    .lab-microscopio .tastiera { display: flex; flex-basis: 100%; justify-content: center; gap: 6px; flex-wrap: wrap; }
    .lab-microscopio .gruppo-risposta { display: inline-flex; gap: 6px; align-items: center; flex-wrap: wrap; justify-content: center; }
    .lab-microscopio .camp { display: inline-flex; align-items: center; gap: 5px; font-size: .82rem; color: var(--testo2); }
    .lab-microscopio .camp .et:empty { display: none; }
    .lab-microscopio .risposta { width: 80px; padding: 8px 8px; min-height: 40px; border-radius: 9px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo); font-family: var(--font); font-size: 1.05rem; font-weight: 700; text-align: center; user-select: text; -webkit-user-select: text; }
    .lab-microscopio .risposta:disabled { opacity: .4; }
    .lab-microscopio .sbagliata { border-color: var(--no); animation: lab-mic-scuoti .4s; }
    @keyframes lab-mic-scuoti { 0%,100% { transform: none } 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }
    .lab-microscopio .t-opt.sel { background: var(--accento-tenue); border-color: var(--accento); color: var(--accento-testo); }
    .lab-microscopio .vinto { display: inline-block; animation: lab-mic-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-mic-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-microscopio.finito .tastiera, .lab-microscopio.finito .gruppo-risposta,
    .lab-microscopio.in-libero .compito, .lab-microscopio.in-libero .tastiera, .lab-microscopio.in-libero .gruppo-risposta { display: none !important; }
    .lab-microscopio .lab-parametri { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 14px; }
    .lab-microscopio .lab-param.p-fun output { min-width: 7.6em; white-space: nowrap; }
    .lab-microscopio .lab-param .nome { font-style: italic; font-weight: 600; }
    .lab-microscopio .lab-aiuto .consegna { color: var(--testo2); }
    /* --- scena --- */
    .lab-microscopio .griglia { stroke: var(--bordo); stroke-width: 1; opacity: .8; }
    .lab-microscopio .asse { stroke: var(--testo2); stroke-width: 1.6; opacity: .9; }
    .lab-microscopio .numero { font: calc(14px * var(--k)) var(--font); fill: var(--testo2); opacity: .85; }
    .lab-microscopio .nome-asse { font: italic 700 calc(16px * var(--k)) var(--font); fill: var(--testo2); }
    .lab-microscopio .curva { fill: none; stroke: var(--accento); stroke-width: 3.4; stroke-linecap: round; stroke-linejoin: round; }
    .lab-microscopio .buco { fill: var(--sup2); stroke: var(--accento); stroke-width: 2.6; }
    .lab-microscopio .buco-lente { fill: var(--sup); stroke: var(--accento); stroke-width: 3; }
    .lab-microscopio .pieno { fill: var(--accento); stroke: var(--sup2); stroke-width: 2; }
    .lab-microscopio .vetro { fill: var(--sup); stroke: none; }
    .lab-microscopio .bordo-lente { fill: none; stroke: var(--testo2); stroke-width: 7; opacity: .9; }
    .lab-microscopio .bordo-lente-int { fill: none; stroke: var(--sup2); stroke-width: 1.6; opacity: .7; }
    .lab-microscopio .manico { stroke: var(--testo2); stroke-width: 13; stroke-linecap: round; opacity: .9; }
    .lab-microscopio .riflesso { fill: #fff; opacity: .14; }
    .lab-microscopio .griglia-lente { stroke: var(--bordo2); stroke-width: 1; opacity: .5; }
    .lab-microscopio .linea-x0 { stroke: var(--no); stroke-width: 1.6; stroke-dasharray: 5 5; opacity: .65; }
    .lab-microscopio .espl { fill: var(--s1); stroke: var(--sup); stroke-width: 2; }
    .lab-microscopio .espl-alone { fill: var(--s1); opacity: 0; transition: opacity .15s; }
    .lab-microscopio .presa .espl-alone { opacity: .3; }
    .lab-microscopio .mic-etic { font: 700 calc(16px * var(--k)) var(--font); fill: var(--testo); paint-order: stroke; stroke: var(--sup2); stroke-width: 4.5; stroke-linejoin: round; }
    .lab-microscopio .lampo-lente { animation: lab-mic-lampo .35s ease-out; }
    @keyframes lab-mic-lampo { from { opacity: .35 } to { opacity: .9 } }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  /* margini del piano dentro la scena; larghezza e altezza della scena le decide lo spazio */
  const ML = 46, MR = 24, MT = 16, MB = 42;
  const ZOOM = [1, 2, 4, 8, 16, 32, 64, 128, 256];
  const TASTIERA = [{ k: 'num', testo: 'un numero' }, { k: 'inf+', testo: '+∞' }, { k: 'inf-', testo: '−∞' }, { k: 'no', testo: 'non esiste' }];
  const SUP = { 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷' };
  let contatore = 0;

  /* ---------- numeri ---------- */
  const virg = s => String(s).replace(/-/g, '−').replace('.', ',');
  function fmt(v, d) {
    if (v == null || !isFinite(v)) return '—';
    if (Math.abs(v) >= 1e6) return virg(v.toExponential(2));
    return virg(v.toFixed(d));
  }
  function fmtCorto(v) {
    if (v == null || !isFinite(v)) return '—';
    if (Math.abs(v) >= 1e7) return virg(v.toExponential(2));
    const s = v.toPrecision(8);
    return virg((s.indexOf('.') < 0 ? s : s.replace(/0+$/, '').replace(/\.$/, '')));
  }
  /* «7/2», «1,25», «−3» → numero; null se non si legge */
  function leggiNumero(s) {
    s = String(s == null ? '' : s).trim().replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/,/g, '.');
    if (!s) return null;
    const fr = s.match(/^([+-]?\d*\.?\d+)\/([+-]?\d*\.?\d+)$/);
    if (fr) { const d = parseFloat(fr[2]); if (!d) return null; return parseFloat(fr[1]) / d; }
    if (!/^[+-]?\d*\.?\d+$/.test(s)) return null;
    const v = parseFloat(s);
    return isFinite(v) ? v : null;
  }
  const quasi = (v, val, toll) => v != null && Math.abs(v - val) <= (toll == null ? 0.005 : toll);
  function passoBello(minimo) {
    if (!(minimo > 0)) return 1;
    const e = Math.floor(Math.log10(minimo)), b = minimo / Math.pow(10, e);
    const m = b <= 1 ? 1 : b <= 2 ? 2 : b <= 5 ? 5 : 10;
    return m * Math.pow(10, e);
  }
  const passoAsse = span => passoBello(span / 9);

  /* ---------- livelli ---------- */
  const LIVELLI = [
    {
      ftex: 'f(x)=\\frac{x^2-1}{x-1}',
      f: x => (x * x - 1) / (x - 1),
      x0: 1, xtex: '1',
      vista: { xa: -1.6, xb: 3.6, ya: -0.8, yb: 4.4 },
      centro: 2, buchi: [[1, 2]],
      risultato: '\\lim_{x \\to 1} \\frac{x^2-1}{x-1} = 2',
      domande: [{ tipo: 'numero', testo: 'Porta il puntino vicino a $x=1$, prima da una parte e poi dall\'altra. A che valore si avvicina $f(x)$?', val: 2 }],
      vinto: 'In x = 1 la frazione fa 0 diviso 0: lì la funzione non esiste, ed è il buco che vedi. Ma tutt\'intorno vale x + 1, e più ti avvicini più f(x) si stringe su 2. Il limite è 2 anche se f(1) non c\'è.',
      aiuto: 'Il numeratore si scompone: x² − 1 = (x − 1)(x + 1). Per ogni x diverso da 1 la funzione vale x + 1, e solo in x = 1 resta il buco.'
    },
    {
      ftex: 'f(x)=\\frac{x^2-4}{x-2}',
      f: x => (x * x - 4) / (x - 2),
      x0: 2, xtex: '2',
      vista: { xa: -1.2, xb: 5.2, ya: -0.8, yb: 7.4 },
      centro: 4, buchi: [[2, 4]],
      risultato: '\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = 4',
      domande: [{ tipo: 'numero', testo: 'Stesso gioco, altra funzione: a che valore si avvicina $f(x)$ quando $x$ si avvicina a $2$?', val: 4 }],
      vinto: 'Anche qui 0 diviso 0, anche qui il buco: x² − 4 = (x − 2)(x + 2), quindi fuori da x = 2 la funzione è x + 2. Avvicinandosi a 2 si arriva a 4.',
      aiuto: 'Scomponi il numeratore con la differenza di quadrati e semplifica: che funzione ti resta, e quanto vale in 2?'
    },
    {
      ftex: 'f(x)=\\frac{\\sin x}{x}',
      f: x => Math.sin(x) / x,
      x0: 0, xtex: '0',
      vista: { xa: -7.5, xb: 7.5, ya: -0.6, yb: 1.6 },
      centro: 1, buchi: [[0, 1]],
      risultato: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
      domande: [{ tipo: 'numero', testo: 'In $0$ questa funzione non esiste. Ingrandisci con la lente e avvicinati: a che valore tende $f(x)$?', val: 1, toll: 0.004 }],
      vinto: 'È un limite notevole: per angoli piccolissimi il seno e l\'angolo sono quasi la stessa cosa, e il loro rapporto tende a 1. Con la lente al massimo la curva sembra una retta orizzontale.',
      aiuto: 'Qui non si semplifica niente: si guarda. Sali con lo zoom e leggi f(x) sempre più vicino a 0, da tutte e due le parti. Attento: x è in radianti.'
    },
    {
      ftex: 'f(x)=\\frac{|x|}{x}',
      f: x => Math.abs(x) / x,
      x0: 0, xtex: '0',
      vista: { xa: -3.2, xb: 3.2, ya: -2.4, yb: 2.4 },
      centro: 0, buchi: [[0, -1], [0, 1]],
      risultato: '\\lim_{x \\to 0^-} f(x) = -1 \\qquad \\lim_{x \\to 0^+} f(x) = +1',
      domande: [
        {
          tipo: 'due', testo: 'Questa funzione vale sempre $-1$ oppure $+1$. Da sinistra a che valore si avvicina? E da destra?', valS: -1, valD: 1,
          poi: 'Esatto: −1 arrivando da sinistra, +1 arrivando da destra. Questi due si chiamano limite sinistro e limite destro, e si scrivono con 0⁻ e 0⁺ sotto il segno di limite.'
        },
        {
          tipo: 'scelta', testo: 'Due valori diversi. Allora: il limite per $x \\to 0$ esiste?',
          opzioni: [{ k: 'si', testo: 'Sì' }, { k: 'no', testo: 'No' }], giusta: 'no',
          sbagli: [{ k: 'si', testo: 'Il limite è uno solo: è il valore a cui si arriva da tutte e due le parti. Qui da sinistra si arriva a −1 e da destra a +1, quindi non c\'è un valore solo.' }]
        }
      ],
      vinto: 'Da sinistra si arriva a −1, da destra a +1: sono il limite sinistro e il limite destro. Il limite esiste solo se i due coincidono, e qui no: la funzione fa un salto.',
      aiuto: 'Per x negativo |x| = −x, quindi f(x) = −1; per x positivo f(x) = +1. Qui la lente non serve: serve arrivare prima da una parte e poi dall\'altra.'
    },
    {
      ftex: 'f(x)=\\frac{1}{x^2}',
      f: x => 1 / (x * x),
      x0: 0, xtex: '0',
      vista: { xa: -2.6, xb: 2.6, ya: -1.5, yb: 9.5 },
      centro: 1.5,
      risultato: '\\lim_{x \\to 0} \\frac{1}{x^2} = +\\infty',
      domande: [{
        tipo: 'scelta', testo: 'Avvicinati a $0$ e guarda la colonna $f(x)$: a che valore tende?',
        opzioni: TASTIERA, giusta: 'inf+', campo: 'num',
        sbagli: [
          { k: 'num', testo: 'Nessun numero regge: avvicinati ancora e guarda f(x) crescere — 4, 16, 64, 256… Quando cresce senza fermarsi non si scrive un numero, si scrive +∞.' },
          { k: 'no', testo: 'Qualcosa succede, però: da tutte e due le parti f(x) cresce e basta. Quando le due parti fanno la stessa cosa il limite si scrive, anche se non è un numero.' },
          { k: 'inf-', testo: 'Guarda il segno: x² è positivo sia a destra sia a sinistra, quindi 1/x² è sempre positivo. Sale, non scende.' }
        ]
      }],
      vinto: 'Non si ferma su nessun numero: più x si avvicina a 0 più f(x) cresce, da tutte e due le parti. Si scrive che il limite è +∞, e la retta x = 0 è un asintoto verticale.',
      aiuto: 'x² è sempre positivo, e dividere 1 per un numero piccolissimo dà un numero enorme. Guarda i numeri della tabella: si fermano da qualche parte, o no?'
    },
    {
      ftex: 'f(x)=\\frac{1}{x}',
      f: x => 1 / x,
      x0: 0, xtex: '0',
      vista: { xa: -2.6, xb: 2.6, ya: -7, yb: 7 },
      centro: 0,
      risultato: '\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty \\qquad \\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty',
      domande: [{
        tipo: 'scelta', testo: 'Stessa domanda, funzione diversa: per $x \\to 0$, a che valore tende $f(x)$?',
        opzioni: TASTIERA, giusta: 'no', campo: 'num',
        sbagli: [
          { k: 'inf+', testo: 'Da destra sì, sale a +∞. Ma prova a passare dall\'altra parte: da sinistra f(x) è negativo e precipita. Due direzioni diverse.' },
          { k: 'inf-', testo: 'Da sinistra sì, precipita a −∞. Ma da destra sale a +∞. Se le due parti non vanno nello stesso posto, il limite non c\'è.' },
          { k: 'num', testo: 'Nessun numero: i valori scappano, e per giunta in due direzioni opposte. Guarda il segno di f(x) prima e dopo lo zero.' }
        ]
      }],
      vinto: 'Da sinistra precipita a −∞, da destra sale a +∞: due destini diversi, quindi il limite per x → 0 non esiste. I due limiti laterali però esistono, e l\'asintoto verticale c\'è lo stesso.',
      aiuto: 'Prova prima da destra e poi da sinistra, e guarda il segno di f(x). Il limite esiste solo se le due parti arrivano nello stesso posto.'
    },
    {
      ftex: 'f(x)=\\begin{cases} x+1 & x<2 \\\\ 5-x & x\\ge 2 \\end{cases}',
      f: x => x < 2 ? x + 1 : 5 - x,
      x0: 2, xtex: '2', rotture: [2],
      vista: { xa: -0.8, xb: 4.8, ya: -0.8, yb: 4.4 },
      centro: 3, pieni: [[2, 3]],
      risultato: '\\lim_{x \\to 2} f(x) = 3 = f(2)',
      domande: [{ tipo: 'numero', testo: 'La funzione è fatta di due pezzi. A che valore si avvicina $f(x)$ per $x \\to 2$?', val: 3 }],
      vinto: 'Le due parti arrivano nello stesso punto, e il punto c\'è: f(2) = 3, il pallino pieno. Limite e valore coincidono, e questo si chiama essere continua in 2: la curva si disegna senza staccare la matita.',
      aiuto: 'Segui il pezzo di sinistra (x + 1) fin quasi a 2, poi quello di destra (5 − x). Dove arrivano? E dove sta il pallino pieno?'
    },
    {
      ftex: 'f(x)=\\begin{cases} x+1 & x<2 \\\\ 5 & x=2 \\\\ 5-x & x>2 \\end{cases}',
      f: x => x < 2 ? x + 1 : (x === 2 ? 5 : 5 - x),
      x0: 2, xtex: '2', rotture: [2],
      vista: { xa: -0.8, xb: 4.8, ya: -0.8, yb: 6.2 },
      centro: 3, buchi: [[2, 3]], pieni: [[2, 5]],
      risultato: '\\lim_{x \\to 2} f(x) = 3 \\qquad f(2) = 5',
      domande: [
        {
          tipo: 'numero', testo: 'Stessa funzione di prima, ma il punto in $x=2$ è stato spostato in alto. Il limite per $x \\to 2$ vale…?', val: 3,
          sbagli: [{ val: 5, testo: 'Cinque è f(2), il valore nel punto: sta lì da solo, staccato. Il limite non guarda il punto, guarda dove punta la curva avvicinandosi.' }]
        },
        {
          tipo: 'numero', testo: 'E $f(2)$, cioè il valore della funzione proprio in $2$, quanto vale?', val: 5,
          sbagli: [{ val: 3, testo: 'Tre è il limite, cioè dove punta la curva. f(2) è l\'altezza del pallino pieno: il puntino lì non ci arriva, ma il pallino si vede.' }]
        }
      ],
      vinto: 'Il limite resta 3, perché dipende solo da quello che succede intorno a 2 e non in 2. Ma f(2) = 5: il valore c\'è, ed è un altro. Qui la funzione non è continua, e il punto si chiama discontinuità eliminabile.',
      aiuto: 'Il buco dice dove punta la curva, il pallino pieno dice quanto vale davvero la funzione nel punto. Sono due domande diverse, e qui hanno due risposte diverse.'
    },
    {
      tipo: 'corsa',
      ftex: 'f(x)=\\left(1+\\frac{1}{x}\\right)^{x}',
      f: x => Math.pow(1 + 1 / x, x),
      xtex: '+\\infty', decadi: [0, 6],
      vista: { ya: 1.85, yb: 3.05 },
      risultato: '\\lim_{x \\to +\\infty} \\left(1+\\frac{1}{x}\\right)^{x} = e \\approx 2{,}718',
      domande: [{ tipo: 'numero', testo: 'Qui la lente non serve: serve correre verso destra. Trascina il puntino su $10$, $100$, $1000$… a che valore tende $f(x)$? Bastano due decimali.', val: Math.E, toll: 0.01, accetta: ['e'] }],
      vinto: 'Quel numero è e = 2,71828…, il numero di Nepero: è definito proprio così, come il valore a cui tende questa espressione. Non ci si arriva mai, ci si avvicina.',
      aiuto: 'La base 1 + 1/x scende verso 1 mentre l\'esponente x cresce: una gara fra chi schiaccia e chi gonfia. Corri fino a 100000 e guarda le prime cifre: si fermano.'
    },
    {
      tipo: 'corsa',
      ftex: 'f(x)=\\frac{2x^2+1}{x^2-3}',
      f: x => (2 * x * x + 1) / (x * x - 3),
      xtex: '+\\infty', decadi: [1, 6],
      vista: { ya: 1.85, yb: 2.35 },
      risultato: '\\lim_{x \\to +\\infty} \\frac{2x^2+1}{x^2-3} = 2',
      domande: [{ tipo: 'numero', testo: 'Ultima corsa: a che valore tende $f(x)$ quando $x$ va a $+\\infty$?', val: 2, toll: 0.05 }],
      vinto: 'Per x enormi il +1 e il −3 non contano più niente: resta 2x² diviso x², cioè 2. La retta y = 2 è un asintoto orizzontale, e la curva ci si appoggia sopra senza mai toccarla.',
      aiuto: 'Guarda chi comanda quando x è gigantesco: i termini di grado più alto. Prova a dividere sopra e sotto per x² e vedi cosa resta.'
    }
  ];

  /* fermate della «corsa»: 1, 2, 5, 10, 20, 50, 100… */
  function fermate(decadi) {
    const out = [];
    for (let e = decadi[0]; e <= decadi[1]; e++) {
      [1, 2, 5].forEach(m => { const v = m * Math.pow(10, e); if (v <= Math.pow(10, decadi[1]) + 1e-9) out.push(v); });
    }
    return out;
  }

  /* consegne brevi per il telefono in verticale, una per domanda: quella intera si legge nel «?».
     null = la consegna è già corta. */
  const BREVI = [
    ['Avvicinati a $x=1$ da tutte e due le parti: a che valore tende $f(x)$?'],
    ['A che valore tende $f(x)$ quando $x$ si avvicina a $2$?'],
    ['Ingrandisci e avvicinati a $0$: a che valore tende $f(x)$?'],
    ['Da sinistra a che valore si avvicina $f(x)$? E da destra?', null],
    [null],
    ['Per $x \\to 0$, a che valore tende $f(x)$?'],
    ['Due pezzi: a che valore tende $f(x)$ per $x \\to 2$?'],
    ['Il punto in $x=2$ è stato spostato. Quanto vale il limite per $x \\to 2$?', 'E $f(2)$ quanto vale?'],
    ['Trascina il puntino verso destra: a che valore tende $f(x)$? Bastano due decimali.'],
    [null]
  ];

  /* ---------- le funzioni della modalità libera (il punto x₀ lo sceglie lo studente) ---------- */
  const LIBERE = [
    { nome: 'x²', ftex: 'f(x)=x^2', f: x => x * x, vista: { xa: -3.2, xb: 3.2, ya: -1.5, yb: 9.5 }, x0: 1 },
    { nome: '(x²−1)/(x−1)', ftex: 'f(x)=\\frac{x^2-1}{x-1}', f: x => (x * x - 1) / (x - 1), vista: { xa: -2.6, xb: 3.6, ya: -1.8, yb: 4.8 }, x0: 1, rotture: [1] },
    { nome: 'sin x / x', ftex: 'f(x)=\\frac{\\sin x}{x}', f: x => Math.sin(x) / x, vista: { xa: -7.5, xb: 7.5, ya: -0.6, yb: 1.6 }, x0: 0, rotture: [0] },
    { nome: '|x| / x', ftex: 'f(x)=\\frac{|x|}{x}', f: x => Math.abs(x) / x, vista: { xa: -3.2, xb: 3.2, ya: -2.4, yb: 2.4 }, x0: 0, rotture: [0] },
    { nome: '1 / x²', ftex: 'f(x)=\\frac{1}{x^2}', f: x => 1 / (x * x), vista: { xa: -2.6, xb: 2.6, ya: -1.5, yb: 9.5 }, x0: 0, rotture: [0] },
    { nome: '1 / x', ftex: 'f(x)=\\frac{1}{x}', f: x => 1 / x, vista: { xa: -2.6, xb: 2.6, ya: -7, yb: 7 }, x0: 0, rotture: [0] },
    { nome: 'a tre pezzi', ftex: 'f(x)=\\begin{cases} x+1 & x<2 \\\\ 5 & x=2 \\\\ 5-x & x>2 \\end{cases}', f: x => x < 2 ? x + 1 : (x === 2 ? 5 : 5 - x), vista: { xa: -0.8, xb: 4.8, ya: -0.8, yb: 6.2 }, x0: 2, rotture: [2] }
  ];
  const puntiLiberi = F => { const out = []; for (let x = Math.ceil(F.vista.xa + 0.6); x <= Math.floor(F.vista.xb - 0.6); x++) out.push(x); return out; };

  /* limite da una parte, letto a un passo piccolissimo: arrotondato a tre decimali, o ±∞ */
  function laterale(f, x0, verso) {
    const y = f(x0 + verso * 1e-7);
    if (isNaN(y)) return { v: NaN, esatto: true };
    if (!isFinite(y) || Math.abs(y) > 1e5) return { v: y > 0 ? Infinity : -Infinity, esatto: true };
    let r = Math.round(y * 1000) / 1000; if (Math.abs(r) < 1e-9) r = 0;
    return { v: r, esatto: Math.abs(y - r) < 1e-5 };
  }
  const texNum = v => v === Infinity ? '+\\infty' : v === -Infinity ? '-\\infty' : String(v).replace('.', '{,}');
  /* il livello «libero»: stessa forma dei livelli, costruito dalla funzione e dal punto */
  function livelloLibero(i, x0) {
    const F = LIBERE[i], f = F.f, V = F.vista;
    const s = laterale(f, x0, -1), d = laterale(f, x0, 1), y = f(x0), def = isFinite(y);
    const rel = (s.esatto && d.esatto) ? ' = ' : ' \\approx ';
    const risultato = s.v === d.v
      ? '\\lim_{x \\to ' + x0 + '} f(x)' + rel + texNum(s.v)
      : '\\lim_{x \\to ' + x0 + '^-} f(x)' + (s.esatto ? ' = ' : ' \\approx ') + texNum(s.v) + ' \\qquad \\lim_{x \\to ' + x0 + '^+} f(x)' + (d.esatto ? ' = ' : ' \\approx ') + texNum(d.v);
    const dentro = v => isFinite(v) && v >= V.ya && v <= V.yb;
    const buchi = [], pieni = [];
    [s.v, d.v].forEach((v, k) => { if (dentro(v) && (!def || Math.abs(y - v) > 2e-3) && !(k === 1 && v === s.v)) buchi.push([x0, v]); });
    if (def && dentro(y)) pieni.push([x0, y]);
    const centro = isFinite(s.v) && isFinite(d.v) ? (s.v + d.v) / 2 : (V.ya + V.yb) / 2;
    return { libero: true, ftex: F.ftex, f, x0, xtex: String(x0), vista: V, centro, buchi, pieni, rotture: (F.rotture || []).concat([x0]), risultato, domande: [], lat: [s.v, d.v], y0: def ? y : null };
  }
  /* nei pedici dei limiti il segno di 0⁻ e 0⁺ scenderebbe sotto i 12 px: lo si tiene alla misura del pedice */
  const pediciLeggibili = s => s.replace(/\^([+-])/g, '^{\\scriptstyle $1}');

  COMPASSO.registraLab({
    id: 'microscopio',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-microscopio')) { const s = document.createElement('style'); s.id = 'stile-lab-microscopio'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-microscopio');
      const CLIP = 'lab-mic-clip-' + (++contatore);
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="gruppo-zoom" role="group" aria-label="Ingrandimento della lente">
              <button type="button" class="btn piccolo m-zmeno" aria-label="Riduci l'ingrandimento" title="Riduci l'ingrandimento">−</button>
              <span class="conta-z" aria-live="polite">🔍 ×1</span>
              <button type="button" class="btn piccolo m-zpiu" aria-label="Ingrandisci" title="Ingrandisci">+</button>
            </div>
            <div class="lab-aiuto" hidden data-scorre><p class="consegna" hidden></p><p class="testo-aiuto"></p><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: nessuna domanda, funzione e punto li scegli tu">Libero</button></div>
            <div class="compito"></div>
            <div class="lab-parametri" hidden>
              <div class="lab-param p-fun" data-p="f"><button type="button" class="btn piccolo" data-d="-1" aria-label="funzione precedente">◀</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="funzione successiva">▶</button></div>
              <div class="lab-param" data-p="x0"><span class="nome">x₀</span><button type="button" class="btn piccolo" data-d="-1" aria-label="punto più a sinistra">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="punto più a destra">+</button></div>
            </div>
            <div class="mic-formula"></div>
            <div class="tabella"></div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <span class="tastiera"></span>
              <span class="gruppo-risposta">
                <label class="camp c1"><span class="et"></span><input type="text" class="risposta r1" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="?" aria-label="La tua risposta"></label>
                <label class="camp c2"><span class="et">da destra</span><input type="text" class="risposta r2" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="?" aria-label="Il valore da destra"></label>
                <button type="button" class="btn primario m-verifica">Verifica</button>
              </span>
              <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
              <button type="button" class="btn piccolo m-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo m-aiuto" aria-label="Come si gioca">?</button>
            </div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), aiutoEl = q('.lab-aiuto');
      const compitoEl = q('.compito'), formulaEl = q('.mic-formula');
      const tabEl = q('.tabella'), msg = q('.lab-messaggio');
      const contaZ = q('.conta-z'), gruppoZoom = q('.gruppo-zoom'), tastieraEl = q('.tastiera');
      const camp1 = q('.c1'), camp2 = q('.c2');
      const inp1 = q('.r1'), inp2 = q('.r2');
      const et1 = camp1.querySelector('.et');
      const bZmeno = q('.m-zmeno'), bZpiu = q('.m-zpiu');
      const bVer = q('.m-verifica'), bRic = q('.m-ricomincia'), bAiuto = q('.m-aiuto'), bCasuale = q('.m-casuale');
      const livelliEl = q('.lab-livelli'), bLibero = q('.lab-libero'), parametriEl = q('.lab-parametri');

      /* ---------- scena: larga W e alta H unità, scelte da geometria() sulla forma dello spazio ---------- */
      let W = 600, H = 400, LARG = W - ML - MR, ALT = H - MT - MB, R = 80, kSc = 1;
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': 'Il grafico di una funzione con una lente d\'ingrandimento sul punto e un puntino da trascinare sulla curva' });
      scena.insertBefore(svg, gruppoZoom);
      const defs = el('defs'); svg.appendChild(defs);
      const clipC = el('circle', { cx: 0, cy: 0, r: R });
      const clipP = el('clipPath', { id: CLIP }); clipP.appendChild(clipC); defs.appendChild(clipP);
      const gAssi = el('g'), gCurva = el('g'), gPunti = el('g'), gEspl = el('g'), gLente = el('g'), gEtic = el('g');
      [gAssi, gCurva, gPunti, gEspl, gLente, gEtic].forEach(g => svg.appendChild(g));
      const gDentro = el('g', { 'clip-path': 'url(#' + CLIP + ')' });
      const gLenteEspl = el('g');

      /* la scena è larga almeno 440 unità (sul telefono le scritte restano leggibili) e al più 900;
         l'altezza segue la forma dello spazio, così il piano lo riempie senza bande vuote */
      function geometria() {
        const r = scena.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return false;
        const w = Math.round(Math.max(440, Math.min(900, r.width)));
        const h = Math.max(260, Math.round(w * r.height / r.width));
        const scala = Math.min(r.width / w, r.height / h);
        const k = Math.max(1, Math.round(12.5 / (14 * scala) * 100) / 100);
        if (w === W && h === H && k === kSc) return false;
        W = w; H = h; kSc = k;
        LARG = W - ML - MR; ALT = H - MT - MB;
        R = Math.round(Math.max(62, Math.min(125, Math.min(LARG, ALT) * 0.24)));
        clipC.setAttribute('r', R);
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svg.style.setProperty('--k', k);
        return true;
      }

      /* ---------- stato ---------- */
      let livello = 0, L = LIVELLI[0], Z = 1, k = 1, iFerm = 0, ferm = [];
      let dom = 0, finito = false, scelta = null, trascino = false;
      let visS = [], visD = [], cx = 0, cy = 0;
      let libero = false, salvato = null, iLib = 0, x0Lib = 1;   /* modalità libera, e il livello da cui ci si è entrati */
      const timers = [];
      const attesa = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max.apply(null, completati) + 1 : 0;
      if (!(livello >= 0) || livello >= LIVELLI.length) livello = 0;

      /* ---------- mappe ---------- */
      const corsa = () => L.tipo === 'corsa';
      const ux = () => LARG / (L.vista.xb - L.vista.xa);
      const uy = () => ALT / (L.vista.yb - L.vista.ya);
      function PX(x) {
        if (corsa()) return ML + (Math.log(x) / Math.LN10 - L.decadi[0]) / (L.decadi[1] - L.decadi[0]) * LARG;
        return ML + (x - L.vista.xa) * ux();
      }
      function PY(y) { return MT + (L.vista.yb - y) * uy(); }
      const LX = x => cx + (PX(x) - cx) * Z;
      const LY = y => cy + (PY(y) - cy) * Z;

      /* ---------- il tracciato della curva, spezzato dove la funzione si rompe ---------- */
      function tracce(xa, xb, ya, yb, n, fx, fy) {
        const rot = (L.rotture || (L.x0 != null ? [L.x0] : [])).filter(r => r > xa && r < xb).sort((a, b) => a - b);
        const tagli = [xa].concat(rot, [xb]);
        const out = [];
        for (let s = 0; s < tagli.length - 1; s++) {
          const a = tagli[s], b = tagli[s + 1];
          if (!(b > a)) continue;
          const d = (b - a) * 1e-6;
          const m = Math.max(10, Math.round(n * (b - a) / (xb - xa)));
          let dd = '';
          for (let i = 0; i <= m; i++) {
            const x = (a + d) + (b - a - 2 * d) * (i / m), y = L.f(x);
            if (!isFinite(y) || y < ya || y > yb) { if (dd) { out.push(dd); dd = ''; } continue; }
            dd += (dd ? 'L' : 'M') + fx(x).toFixed(1) + ' ' + fy(y).toFixed(1) + ' ';
          }
          if (dd) out.push(dd);
        }
        return out;
      }
      function tracceCorsa(n) {
        const la = L.decadi[0], lb = L.decadi[1];
        let dd = '';
        const out = [];
        for (let i = 0; i <= n; i++) {
          const x = Math.pow(10, la + (lb - la) * i / n), y = L.f(x);
          if (!isFinite(y) || y < L.vista.ya || y > L.vista.yb) { if (dd) { out.push(dd); dd = ''; } continue; }
          dd += (dd ? 'L' : 'M') + PX(x).toFixed(1) + ' ' + PY(y).toFixed(1) + ' ';
        }
        if (dd) out.push(dd);
        return out;
      }

      /* ---------- assi ---------- */
      function disegnaAssi() {
        svuota(gAssi);
        const V = L.vista;
        const yAsse = Math.max(MT, Math.min(MT + ALT, PY(0)));
        const xAsse = corsa() ? ML : Math.max(ML, Math.min(ML + LARG, PX(0)));
        const py = passoAsse(V.yb - V.ya);
        const gG = el('g', { class: 'griglia' });
        if (corsa()) {
          for (let e = L.decadi[0]; e <= L.decadi[1]; e++) {
            const X = PX(Math.pow(10, e));
            gG.appendChild(el('line', { x1: X, y1: MT, x2: X, y2: MT + ALT }));
          }
        } else {
          const px = passoAsse(V.xb - V.xa);
          for (let i = Math.ceil(V.xa / px); i * px <= V.xb; i++) {
            const X = PX(i * px);
            gG.appendChild(el('line', { x1: X, y1: MT, x2: X, y2: MT + ALT }));
          }
        }
        for (let j = Math.ceil(V.ya / py); j * py <= V.yb; j++) {
          const Y = PY(j * py);
          gG.appendChild(el('line', { x1: ML, y1: Y, x2: ML + LARG, y2: Y }));
        }
        gAssi.appendChild(gG);
        gAssi.appendChild(el('line', { class: 'asse', x1: ML, y1: yAsse, x2: ML + LARG + 8, y2: yAsse }));
        gAssi.appendChild(el('line', { class: 'asse', x1: xAsse, y1: MT - 8, x2: xAsse, y2: MT + ALT }));
        gAssi.appendChild(el('text', { class: 'nome-asse', x: W - 3, y: yAsse - 7, 'text-anchor': 'end' }, 'x'));
        gAssi.appendChild(el('text', { class: 'nome-asse', x: xAsse + 7, y: MT + 9 }, 'y'));
        /* numeri sull'asse x */
        if (corsa()) {
          for (let e = L.decadi[0]; e <= L.decadi[1]; e++) {
            const X = PX(Math.pow(10, e));
            const t = e <= 3 ? String(Math.pow(10, e)) : '10' + (SUP[e] || '');
            gAssi.appendChild(el('text', { class: 'numero', x: X, y: yAsse + 17, 'text-anchor': 'middle' }, t));
          }
        } else {
          const px = passoAsse(V.xb - V.xa);
          for (let i = Math.ceil(V.xa / px); i * px <= V.xb; i++) {
            const v = i * px;
            if (Math.abs(v) < px / 100) continue;
            gAssi.appendChild(el('text', { class: 'numero', x: PX(v), y: yAsse + 17, 'text-anchor': 'middle' }, fmtCorto(v)));
          }
        }
        /* numeri sull'asse y */
        for (let j = Math.ceil(V.ya / py); j * py <= V.yb; j++) {
          const v = j * py;
          if (!corsa() && Math.abs(v) < py / 100) continue;
          gAssi.appendChild(el('text', { class: 'numero', x: xAsse - 7, y: PY(v) + 4, 'text-anchor': 'end' }, fmtCorto(v)));
        }
        if (!corsa() && V.ya < 0 && V.yb > 0 && V.xa < 0 && V.xb > 0) gAssi.appendChild(el('text', { class: 'numero', x: xAsse - 7, y: yAsse + 15, 'text-anchor': 'end' }, '0'));
      }

      /* ---------- curva e punti nel piano grande ---------- */
      function disegnaCurva() {
        svuota(gCurva); svuota(gPunti);
        const V = L.vista;
        const dd = corsa() ? tracceCorsa(900) : tracce(V.xa, V.xb, V.ya, V.yb, 1400, PX, PY);
        dd.forEach(d => gCurva.appendChild(el('path', { class: 'curva', d: d })));
        (L.buchi || []).forEach(p => gPunti.appendChild(el('circle', { class: 'buco', cx: PX(p[0]), cy: PY(p[1]), r: 5.5 })));
        (L.pieni || []).forEach(p => gPunti.appendChild(el('circle', { class: 'pieno', cx: PX(p[0]), cy: PY(p[1]), r: 5.5 })));
      }

      /* ---------- la lente ---------- */
      function disegnaLente() {
        svuota(gLente);
        if (corsa()) return;
        cx = PX(L.x0); cy = PY(L.centro);
        clipC.setAttribute('cx', cx); clipC.setAttribute('cy', cy);
        gLente.appendChild(el('line', { class: 'manico', x1: cx + R * 0.72, y1: cy + R * 0.72, x2: cx + R * 1.12, y2: cy + R * 1.12 }));
        gLente.appendChild(el('circle', { class: 'vetro', cx: cx, cy: cy, r: R }));
        svuota(gDentro);
        /* carta millimetrata che si infittisce con lo zoom */
        const gG = el('g', { class: 'griglia-lente' });
        const px = passoBello(34 / (ux() * Z)), py = passoBello(34 / (uy() * Z));
        const nx = Math.ceil(R / (ux() * Z * px)), ny = Math.ceil(R / (uy() * Z * py));
        for (let i = -nx; i <= nx; i++) { const X = LX(L.x0 + i * px); gG.appendChild(el('line', { x1: X, y1: cy - R, x2: X, y2: cy + R })); }
        for (let j = -ny; j <= ny; j++) { const Y = LY(L.centro + j * py); gG.appendChild(el('line', { x1: cx - R, y1: Y, x2: cx + R, y2: Y })); }
        gDentro.appendChild(gG);
        gDentro.appendChild(el('line', { class: 'linea-x0', x1: cx, y1: cy - R, x2: cx, y2: cy + R }));
        const semiX = (R + 10) / (ux() * Z), semiY = (R + 10) / (uy() * Z);
        const xa = Math.max(L.vista.xa, L.x0 - semiX), xb = Math.min(L.vista.xb, L.x0 + semiX);
        tracce(xa, xb, L.centro - semiY, L.centro + semiY, 500, LX, LY).forEach(d => gDentro.appendChild(el('path', { class: 'curva', d: d })));
        (L.buchi || []).forEach(p => gDentro.appendChild(el('circle', { class: 'buco-lente', cx: LX(p[0]), cy: LY(p[1]), r: 6 })));
        (L.pieni || []).forEach(p => gDentro.appendChild(el('circle', { class: 'pieno', cx: LX(p[0]), cy: LY(p[1]), r: 6 })));
        gDentro.appendChild(gLenteEspl);
        gLente.appendChild(gDentro);
        gLente.appendChild(el('path', { class: 'riflesso', d: 'M' + (cx - R * 0.62) + ' ' + (cy - R * 0.42) + ' a ' + R + ' ' + R + ' 0 0 1 ' + (R * 0.44) + ' ' + (-R * 0.42) + ' l 14 16 a ' + (R * 0.8) + ' ' + (R * 0.8) + ' 0 0 0 ' + (-R * 0.36) + ' ' + (R * 0.34) + ' z' }));
        gLente.appendChild(el('circle', { class: 'bordo-lente', cx: cx, cy: cy, r: R }));
        gLente.appendChild(el('circle', { class: 'bordo-lente-int', cx: cx, cy: cy, r: R - 4 }));
      }

      /* ---------- il puntino esploratore ---------- */
      function passo() { return (L.passo || 1) / Z; }
      function limitiK() {
        const marg = (L.vista.xb - L.vista.xa) * 0.018, p = passo();
        return { min: Math.ceil((L.vista.xa + marg - L.x0) / p), max: Math.floor((L.vista.xb - marg - L.x0) / p) };
      }
      function fissaK(kk) {
        const lim = limitiK();
        let v = Math.max(lim.min, Math.min(lim.max, Math.round(kk)));
        if (v === 0) v = kk >= 0 ? 1 : -1;
        if (v > lim.max) v = -1;
        if (v < lim.min) v = 1;
        return v;
      }
      const xEspl = () => corsa() ? ferm[iFerm] : L.x0 + k * passo();
      const yEspl = () => L.f(xEspl());

      function ricorda(x, y) {
        const arr = (corsa() || x > L.x0) ? visD : visS;
        const i = arr.findIndex(p => p.x === x);
        if (i >= 0) arr.splice(i, 1);
        arr.push({ x: x, y: y });
        while (arr.length > 5) arr.shift();
      }

      function etichetta(X, Y, x, y) {
        svuota(gEtic);
        const testo = 'x = ' + fmtCorto(x) + '   ·   f(x) = ' + fmtCorto(y);
        const larg = testo.length * 7.2 * kSc;
        let tx, ty = Math.max(MT + 14 * kSc, Math.min(H - 6, Y - 18)), anc;
        if (X + 16 + larg < W - 4) { tx = X + 16; anc = 'start'; }
        else if (X - 16 - larg > 4) { tx = X - 16; anc = 'end'; }
        else { tx = W / 2; anc = 'middle'; ty = MT + 14 * kSc; }
        gEtic.appendChild(el('text', { class: 'mic-etic', x: tx, y: ty, 'text-anchor': anc }, testo));
      }

      function aggiornaEspl(registra) {
        const x = xEspl(), y = yEspl();
        if (registra) ricorda(x, y);
        svuota(gEspl); svuota(gLenteEspl);
        const X = PX(x);
        const Y = Math.max(MT, Math.min(MT + ALT, isFinite(y) ? PY(y) : (y > 0 ? MT : MT + ALT)));
        const g = el('g', { class: 'maniglia' + (trascino ? ' presa' : '') });
        g.appendChild(el('circle', { class: 'espl-alone', cx: X, cy: Y, r: 20 }));
        g.appendChild(el('circle', { class: 'espl', cx: X, cy: Y, r: 7 }));
        gEspl.appendChild(g);
        let Xd = X, Yd = Y;
        if (!corsa()) {
          const XL = LX(x), YL = isFinite(y) ? LY(y) : (y > 0 ? cy - R : cy + R);
          if (Math.hypot(XL - cx, YL - cy) <= R - 3) {
            gLenteEspl.appendChild(el('circle', { class: 'espl', cx: XL, cy: YL, r: 8 }));
            Xd = XL; Yd = YL;
          }
        }
        etichetta(Xd, Yd, x, y);
        aggiornaTabella();
      }

      /* ---------- la tabella dei valori: 5 righe, 3 sul telefono in verticale (le più vicine a x₀) ---------- */
      const righeTab = () => (radice.clientWidth * 4 < radice.clientHeight * 5 && radice.clientHeight < 900) ? 3 : 5;
      function riga(p, ultima, sep) {
        const cl = (piu) => { const c = [].concat(sep ? ['sep'] : [], piu || []); return c.length ? ' class="' + c.join(' ') + '"' : ''; };
        if (!p) return '<td' + cl(['vuoto']) + '>·</td><td class="vuoto">·</td>';
        const u = ultima ? ['ultima'] : [];
        return '<td' + cl(u) + '>' + (corsa() ? fmtCorto(p.x) : fmt(p.x, 4)) + '</td>'
          + '<td' + (ultima ? ' class="ultima"' : '') + '>' + fmt(p.y, 4) + '</td>';
      }
      function colonna(arr, verso, n) {
        const l = arr.slice().sort((a, b) => verso * (a.x - b.x)).slice(-n);
        while (l.length < n) l.unshift(null);
        return l;
      }
      function aggiornaTabella() {
        const n = righeTab();
        let html;
        if (corsa()) {
          const d = colonna(visD, 1, n);
          html = '<table><thead><tr><th colspan="2">x che corre verso +∞</th></tr><tr><th>x</th><th>f(x)</th></tr></thead><tbody>';
          for (let i = 0; i < n; i++) html += '<tr>' + riga(d[i], i === n - 1 && !!d[n - 1], false) + '</tr>';
        } else {
          const s = colonna(visS, 1, n), d = colonna(visD, -1, n);
          html = '<table><thead><tr><th colspan="2">da sinistra</th><th colspan="2" class="sep">da destra</th></tr>'
            + '<tr><th>x</th><th>f(x)</th><th class="sep">x</th><th>f(x)</th></tr></thead><tbody>';
          for (let i = 0; i < n; i++) html += '<tr>' + riga(s[i], i === n - 1 && !!s[n - 1], false) + riga(d[i], i === n - 1 && !!d[n - 1], true) + '</tr>';
        }
        tabEl.innerHTML = html + '</tbody></table>';
      }

      /* ---------- testi ---------- */
      function conMate(s) { return String(s).split('$').map((p, i) => i % 2 ? ctx.tex(p) : p.replace(/&/g, '&amp;').replace(/</g, '&lt;')).join(''); }
      /* in stile «display»: le frazioni non rimpiccioliscono e gli esponenti restano sopra i 12 px */
      const texD = s => ctx.tex('\\displaystyle ' + pediciLeggibili(s));
      function messaggio(html, cls, tipo) { msg.innerHTML = html; msg.className = 'lab-messaggio' + (cls ? ' ' + cls : ''); msg.dataset.tipo = tipo || ''; }
      function aggiornaFormula() {
        const risolto = finito || libero;
        formulaEl.innerHTML = '<span class="fun">' + texD(L.ftex) + '</span>'
          + '<span class="lim' + (finito && !libero ? ' risolto' : '') + '">'
          + texD(risolto ? L.risultato : '\\lim_{x \\to ' + L.xtex + '} f(x) = \\;?') + '</span>';
      }
      function scuoti(e) { e.classList.remove('sbagliata'); void e.getBoundingClientRect(); e.classList.add('sbagliata'); }
      function suggerisciBuco() {
        if (msg.textContent && msg.dataset.tipo !== 'buco') return;
        messaggio('In ' + (corsa() ? 'quel punto' : 'x = ' + fmtCorto(L.x0)) + ' il puntino non si ferma: lì non c\'è niente da leggere.', '', 'buco');
        attesa(() => { if (msg.dataset.tipo === 'buco') { if (libero) osserva(); else messaggio('', ''); } }, 2600);
      }

      /* ---------- domande ---------- */
      function aggiornaTastiera(d, fuoco) {
        Array.prototype.forEach.call(tastieraEl.children, b => b.classList.toggle('sel', b.dataset.k === scelta));
        if (d.campo) {
          const attivo = scelta === d.campo;
          camp1.hidden = !attivo; inp1.disabled = !attivo;
          if (attivo && fuoco !== false) inp1.focus();
        }
      }
      function mostraDomanda() {
        const d = L.domande[dom], breve = (BREVI[livello] || [])[dom];
        compitoEl.innerHTML = (breve ? '<span class="c-breve">' + conMate(breve) + '</span>' : '') + '<span class="c-lungo">' + conMate(d.testo) + '</span>';
        scelta = null;
        tastieraEl.innerHTML = '';
        tastieraEl.hidden = d.tipo !== 'scelta';
        if (d.tipo === 'scelta') {
          d.opzioni.forEach(o => {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'btn piccolo t-opt'; b.dataset.k = o.k; b.textContent = o.testo;
            b.addEventListener('click', () => { if (finito) return; scelta = o.k; aggiornaTastiera(d); if (msg.classList.contains('no')) messaggio('', ''); });
            tastieraEl.appendChild(b);
          });
        }
        inp1.value = ''; inp2.value = '';
        inp1.disabled = false; inp2.disabled = false;
        inp1.classList.remove('sbagliata'); inp2.classList.remove('sbagliata');
        camp2.hidden = d.tipo !== 'due';
        et1.textContent = d.tipo === 'due' ? 'da sinistra' : '';
        if (d.tipo === 'scelta') { camp1.hidden = true; inp1.disabled = true; }
        else camp1.hidden = false;
        bVer.disabled = false;
      }
      function spiegazione(d, v) {
        const el2 = (d.sbagli || []).find(s => (s.k != null ? s.k === scelta : quasi(v, s.val, 0.02)));
        if (el2) return el2.testo;
        if (v != null && d.val != null && Math.abs(v - d.val) < 0.08) return 'Ci sei quasi, ma il limite è un numero preciso: quello che hai scritto è un valore che f(x) assume avvicinandosi, non quello su cui si stringe. Guarda le cifre che smettono di cambiare.';
        if (d.tipo === 'due') return 'Guarda le due colonne della tabella: a sinistra i valori si stringono su un numero, a destra su un altro. Sono quelli.';
        return 'Non è quello. Avvicinati ancora a ' + (corsa() ? 'destra' : fmtCorto(L.x0)) + ' e guarda la colonna f(x): i numeri si stringono attorno a un valore solo.';
      }
      function verifica() {
        if (finito || libero) return;
        const d = L.domande[dom];
        let ok = false, v = null;
        if (d.tipo === 'numero') {
          const grezzo = String(inp1.value || '').trim().toLowerCase();
          if ((d.accetta || []).indexOf(grezzo) >= 0) ok = true;
          else {
            v = leggiNumero(inp1.value);
            if (v === null) { scuoti(inp1); messaggio('Scrivi un numero (va bene anche con la virgola).', 'no'); return; }
            ok = quasi(v, d.val, d.toll);
          }
        } else if (d.tipo === 'due') {
          const a = leggiNumero(inp1.value), b = leggiNumero(inp2.value);
          if (a === null || b === null) { scuoti(a === null ? inp1 : inp2); messaggio('Servono tutti e due i valori.', 'no'); return; }
          ok = quasi(a, d.valS, d.toll) && quasi(b, d.valD, d.toll);
          v = a;
        } else {
          if (!scelta) { messaggio('Scegli una delle risposte.', 'no'); return; }
          if (d.campo && scelta === d.campo) {
            v = leggiNumero(inp1.value);
            if (v === null) { scuoti(inp1); messaggio('Hai scelto «un numero»: scrivilo.', 'no'); return; }
            ok = d.giusta === d.campo && quasi(v, d.val, d.toll);
          } else ok = scelta === d.giusta;
        }
        if (ok) { avanti(d); return; }
        if (d.tipo !== 'scelta' || (d.campo && scelta === d.campo)) scuoti(inp1);
        messaggio('Non ci siamo.', 'no');
        ctx.zenone(spiegazione(d, v), { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
      }
      function avanti(d) {
        if (dom < L.domande.length - 1) {
          dom++;
          messaggio('Giusto. Ancora una domanda.', 'ok');
          if (d.poi) ctx.zenone(d.poi, { espressione: 'felice', durata: 9000 });
          mostraDomanda();
          return;
        }
        finito = true;
        bVer.disabled = true; inp1.disabled = true; inp2.disabled = true;
        /* il risultato compare in verde nella formula qui sopra: il messaggio resta corto */
        messaggio('<span class="vinto">Esatto.</span>', 'ok');
        aggiornaFormula(); segnaFinito();
        ctx.completato(livello); aggiornaLivelli();
        ctx.zenone(L.vinto, { espressione: 'orgoglioso', durata: 11000 });
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
      }

      /* ---------- zoom ---------- */
      function aggiornaZoom() {
        contaZ.textContent = '🔍 ×' + Z;
        const i = ZOOM.indexOf(Z);
        bZmeno.disabled = i <= 0; bZpiu.disabled = i >= ZOOM.length - 1;
      }
      function cambiaZ(dir) {
        if (corsa()) return;
        const i = ZOOM.indexOf(Z), j = Math.max(0, Math.min(ZOOM.length - 1, i + dir));
        if (j === i) return;
        const x = xEspl();
        Z = ZOOM[j];
        k = fissaK((x - L.x0) / passo());
        aggiornaZoom(); disegnaLente();
        gLente.classList.remove('lampo-lente'); void gLente.getBoundingClientRect(); gLente.classList.add('lampo-lente');
        aggiornaEspl(true);
      }

      /* ---------- livelli ---------- */
      function aggiornaLivelli() {
        const fatti = ctx.stato().livelli, sblocco = fatti.length ? Math.max(...fatti) + 1 : 0;
        [...livelliEl.querySelectorAll('.lab-pallino')].forEach((p, i) => {
          p.classList.toggle('fatto', fatti.includes(i));
          p.classList.toggle('attivo', !libero && i === livello);
          p.disabled = i > sblocco && i !== livello;
          p.setAttribute('aria-current', !libero && i === livello ? 'step' : 'false');
        });
        bLibero.setAttribute('aria-pressed', libero);
      }
      function segnaFinito() { radice.classList.toggle('finito', finito && !libero); bRic.classList.toggle('primario', finito && !libero); }
      function disegnaTutto() { disegnaAssi(); disegnaCurva(); disegnaLente(); }
      function avviaLivello(n) {
        libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        livello = n; L = LIVELLI[n];
        Z = 1; dom = 0; finito = false; scelta = null; trascino = false;
        visS = []; visD = [];
        ferm = corsa() ? fermate(L.decadi) : [];
        iFerm = 0;
        k = corsa() ? 0 : limitiK().min;
        gruppoZoom.hidden = corsa();
        aggiornaZoom();
        disegnaTutto();
        mostraDomanda(); aggiornaFormula();
        messaggio('', '');
        bRic.textContent = 'Ricomincia'; segnaFinito();
        aggiornaEspl(true); aggiornaLivelli();
      }
      function aiuto() {
        const base = 'Il limite è il valore a cui f(x) si avvicina quando x si avvicina a ' + (corsa() ? '+∞' : fmtCorto(L.x0)) + ', non il valore che la funzione ha lì: nel punto può mancare, o valere tutt\'altro. Per leggerlo ci si accosta da sinistra e da destra e si guarda su quale numero si stringono i valori. Se le due parti arrivano a due numeri diversi, il limite non c\'è. ';
        return base + L.aiuto;
      }

      /* ---------- modalità libera: nessuna domanda, funzione e punto li sceglie lo studente ---------- */
      const AIUTO_LIBERO = 'In modalità libera non ci sono domande. Scegli la funzione con ◀ ▶ e il punto x₀ con − e +: la lente si mette lì. Trascina il puntino da sinistra e da destra e guarda la tabella. Sotto la formula c\'è il limite, e il messaggio dice quanto vale f proprio nel punto. «Casuale» sceglie una funzione e un punto a caso.';
      const numTesto = v => v === Infinity ? '+∞' : v === -Infinity ? '−∞' : fmtCorto(Math.round(v * 1000) / 1000);
      function osserva() {   /* osservazioni neutre, mai valutazioni */
        const s = L.lat[0], d = L.lat[1], x = fmtCorto(L.x0), y0 = L.y0;
        const nelPunto = y0 == null ? 'f(' + x + ') non esiste' : 'f(' + x + ') = ' + numTesto(y0);
        let t;
        if (s !== d) t = nelPunto + '. Da sinistra si arriva a ' + numTesto(s) + ', da destra a ' + numTesto(d) + ': il limite non esiste.';
        else if (!isFinite(s)) t = nelPunto + ', e intorno f(x) va a ' + numTesto(s) + ': la retta x = ' + x + ' è un asintoto verticale.';
        else if (y0 == null) t = nelPunto + ', ma intorno f(x) si avvicina a ' + numTesto(s) + ': al posto del punto c\'è un buco.';
        else if (Math.abs(y0 - s) < 2e-3) t = nelPunto + ', uguale al limite: qui la funzione è continua.';
        else t = nelPunto + ', ma il limite è ' + numTesto(s) + ': il punto è staccato dalla curva.';
        messaggio(t, '', 'osserva');
      }
      function aggiornaParametri() {
        const [oF, oX] = parametriEl.querySelectorAll('output');
        oF.textContent = LIBERE[iLib].nome;
        oX.textContent = String(x0Lib).replace('-', '−');
        const punti = puntiLiberi(LIBERE[iLib]);
        parametriEl.querySelectorAll('[data-p="x0"] button').forEach(b => { b.disabled = +b.dataset.d < 0 ? x0Lib <= punti[0] : x0Lib >= punti[punti.length - 1]; });
      }
      function impostaLibero() {
        L = livelloLibero(iLib, x0Lib);
        Z = 1; dom = 0; finito = false; scelta = null; trascino = false;
        visS = []; visD = []; ferm = []; iFerm = 0;
        k = limitiK().min;
        gruppoZoom.hidden = false; aggiornaZoom();
        disegnaTutto(); aggiornaFormula(); aggiornaParametri();
        osserva();
        aggiornaEspl(true);
      }
      function mostraLibero() {
        parametriEl.hidden = !libero; bCasuale.hidden = !libero; bRic.hidden = libero;
        radice.classList.toggle('in-libero', libero);
      }
      function entraLibero() {
        salvato = { livello, Z, k, iFerm, visS: visS.slice(), visD: visD.slice(), dom, finito, scelta, v1: inp1.value, v2: inp2.value,
          msg: msg.innerHTML, cls: msg.className, tipo: msg.dataset.tipo, ric: bRic.textContent };
        libero = true; mostraLibero(); aiutoEl.hidden = true;
        const P = LIVELLI[livello], i = LIBERE.findIndex(F => F.ftex === P.ftex);
        iLib = i >= 0 ? i : 0;
        x0Lib = i >= 0 && P.x0 != null ? P.x0 : LIBERE[iLib].x0;
        impostaLibero(); segnaFinito(); aggiornaLivelli();
      }
      function esciLibero() {   /* si torna al livello com'era */
        const z = salvato; libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        livello = z.livello; L = LIVELLI[livello];
        ferm = corsa() ? fermate(L.decadi) : [];
        Z = z.Z; k = z.k; iFerm = z.iFerm; visS = z.visS; visD = z.visD; dom = z.dom; finito = z.finito; trascino = false;
        gruppoZoom.hidden = corsa(); aggiornaZoom();
        disegnaTutto();
        mostraDomanda();
        scelta = z.scelta; inp1.value = z.v1; inp2.value = z.v2;
        if (L.domande[dom].tipo === 'scelta') aggiornaTastiera(L.domande[dom], false);
        if (finito) { bVer.disabled = true; inp1.disabled = true; inp2.disabled = true; }
        aggiornaFormula();
        bRic.textContent = z.ric; segnaFinito();
        messaggio(z.msg, '', z.tipo); msg.className = z.cls;
        aggiornaEspl(false); aggiornaLivelli();
      }
      function casuale() {
        let i, x, giri = 0;
        do {
          i = Math.floor(Math.random() * LIBERE.length);
          const punti = puntiLiberi(LIBERE[i]);
          x = Math.random() < 0.5 ? LIBERE[i].x0 : punti[Math.floor(Math.random() * punti.length)];
          giri++;
        } while (giri < 30 && i === iLib && x === x0Lib);
        iLib = i; x0Lib = x; impostaLibero();
      }
      parametriEl.addEventListener('click', ev => {
        const b = ev.target.closest('button[data-d]'); if (!b || !libero) return;
        const dd = +b.dataset.d;
        if (b.closest('.lab-param').dataset.p === 'f') {
          iLib = (iLib + dd + LIBERE.length) % LIBERE.length;
          x0Lib = LIBERE[iLib].x0;
        } else {
          const punti = puntiLiberi(LIBERE[iLib]);
          x0Lib = Math.max(punti[0], Math.min(punti[punti.length - 1], x0Lib + dd));
        }
        impostaLibero();
      });
      bLibero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      bCasuale.addEventListener('click', casuale);
      LIVELLI.forEach((_, i) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (i + 1)); p.innerHTML = '<span>' + (i + 1) + '</span>';
        p.addEventListener('click', () => avviaLivello(i));
        livelliEl.insertBefore(p, bLibero);
      });

      /* ---------- trascinamento col dito: le coordinate passano dalla matrice dello schermo ---------- */
      function coord(ev) {
        const m = svg.getScreenCTM();
        if (!m) return { x: -99, y: -99 };
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
        return { x: p.x, y: p.y };
      }
      function portaA(c) {
        if (corsa()) {
          let best = iFerm, bd = Infinity;
          ferm.forEach((v, i) => { const d = Math.abs(PX(v) - c.x); if (d < bd) { bd = d; best = i; } });
          if (best === iFerm) return false;
          iFerm = best; return true;
        }
        const dentro = Math.hypot(c.x - cx, c.y - cy) <= R;
        const x = dentro ? L.x0 + (c.x - cx) / (ux() * Z) : L.vista.xa + (c.x - ML) / ux();
        const grezzo = (x - L.x0) / passo();
        if (Math.abs(grezzo) < 0.6) suggerisciBuco();
        const nuovo = fissaK(grezzo >= 0 ? Math.max(1, Math.round(grezzo)) : Math.min(-1, Math.round(grezzo)));
        if (nuovo === k) return false;
        k = nuovo; return true;
      }
      function giu(ev) {
        if (ev.button !== undefined && ev.button > 0) return;
        trascino = true;
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        if (portaA(coord(ev))) aggiornaEspl(true); else aggiornaEspl(false);
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!trascino) return;
        if (portaA(coord(ev))) aggiornaEspl(true);
        ev.preventDefault();
      }
      function molla() { if (!trascino) return; trascino = false; aggiornaEspl(false); }
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi);
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);

      bZmeno.addEventListener('click', () => cambiaZ(-1));
      bZpiu.addEventListener('click', () => cambiaZ(1));
      bVer.addEventListener('click', verifica);
      [inp1, inp2].forEach(i => {
        i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); verifica(); } });
        i.addEventListener('input', () => { i.classList.remove('sbagliata'); if (msg.classList.contains('no')) messaggio('', ''); });
      });
      bRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        /* se nel pannello c'è la consegna breve, quella intera si legge qui */
        const breve = compitoEl.querySelector('.c-breve'), consegna = aiutoEl.querySelector('.consegna');
        consegna.hidden = libero || !breve || getComputedStyle(breve).display === 'none';
        if (!consegna.hidden) consegna.innerHTML = conMate(L.domande[dom].testo);
        aiutoEl.querySelector('.testo-aiuto').textContent = libero ? AIUTO_LIBERO : aiuto();
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });

      /* ---------- la forma dello spazio decide la scena; il pannello decide quante righe di tabella ---------- */
      let righe = 0;
      function adatta() {
        if (geometria()) { disegnaTutto(); aggiornaEspl(false); }
        else if (righeTab() !== righe) aggiornaTabella();
        righe = righeTab();
      }

      geometria();
      avviaLivello(livello);
      righe = righeTab();
      const ro = new ResizeObserver(adatta); ro.observe(radice); ro.observe(scena);

      return function smonta() {
        timers.forEach(clearTimeout); ro.disconnect();
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
