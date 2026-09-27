/* Laboratorio «Moltiplicare è girare» — il prodotto di numeri complessi come rotazione più allungamento.
   Il piano di Gauss è un prato visto dall'alto. Il razzo arancione è la freccia di z (fissa nel livello),
   il bersaglio viola è dove deve atterrare. Lo studente sceglie il moltiplicatore w trascinando il punto
   blu: w si aggancia alla griglia (punti interi, oppure cerchi ogni 0,5 e raggi ogni 15°), mai alla
   soluzione. «Moltiplica» anima le due cose separate: prima il razzo GIRA dell'argomento di w (arco blu),
   poi SI ALLUNGA del modulo di w (tratto blu). Se la punta cade sul bersaglio il livello è vinto.
   Contratto e regole: SCHEMA-LAB.md — modelli: laboratori/ruota.js, laboratori/regolo.js */
(function () {
  const STILE = `
    /* --- scena: il prato riempie tutto lo spazio (adatta() allarga il viewBox), il piano sta al centro --- */
    .lab-giostra .lab-scena { background: color-mix(in srgb, var(--s3) 13%, var(--sup)); overflow: hidden; }
    .lab-giostra .gs-svg { touch-action: none; cursor: crosshair; outline: none; }
    .lab-giostra .gs-svg.presa { cursor: grabbing; }
    .lab-giostra .gs-svg:focus-visible { outline: 3px solid var(--accento); outline-offset: -3px; }
    .lab-giostra .gs-maniglia { transition: r .2s var(--molla); }
    .lab-giostra .lab-aiuto .gs-aiuto-testo p { margin: 0 0 10px; }
    /* --- pannello --- */
    .lab-giostra .gs-obiettivo { font-size: clamp(1rem, 2.2cqmin, 1.08rem); line-height: 1.45; text-align: center; }
    .lab-giostra .gs-obiettivo .katex { font-size: 1.22em; }
    .lab-giostra .gs-obiettivo p { margin: 0; }
    .lab-giostra .gs-obiettivo strong { color: var(--accento-testo); }
    .lab-giostra .gs-obiettivo[hidden], .lab-giostra .gs-breve { display: none; }
    /* sul telefono la consegna è la frase essenziale: il resto sta nel «?» */
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 600px) { .lab-giostra .gs-lungo { display: none; } .lab-giostra .gs-breve { display: block; } }
    .lab-giostra .gs-carta { padding: 5px 10px; border-radius: 12px; background: var(--sup); border: 1px solid var(--bordo); display: flex; flex-direction: column; gap: 1px; }
    .lab-giostra .gs-riga { display: flex; align-items: baseline; gap: 0 8px; flex-wrap: wrap; min-height: 1.75em; }
    .lab-giostra .gs-et { font-size: .75rem; letter-spacing: .05em; text-transform: uppercase; color: var(--testo2); font-weight: 600; min-width: 8.4em; white-space: nowrap; }
    .lab-giostra .gs-et i { font-style: normal; display: inline-block; width: .7em; height: .7em; border-radius: 50%; margin-right: 5px; vertical-align: -.05em; }
    .lab-giostra .gs-tex { font-size: clamp(1rem, 2.5cqmin, 1.15rem); display: inline-flex; flex-wrap: wrap; gap: 0 12px; align-items: baseline; color: var(--testo); }
    .lab-giostra .gs-tex { max-width: 100%; }
    .lab-giostra .gs-vuoto { color: var(--testo3); font-size: .9rem; }
    /* sul telefono le righe della formula perdono la parola (resta il pallino colorato) */
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 600px) {
      .lab-giostra .gs-riga:not(.esito) .gs-et .t { display: none; }
      .lab-giostra .gs-riga:not(.esito) .gs-et { min-width: 0; }
      .lab-giostra .gs-riga { min-height: 1.6em; flex-wrap: nowrap; }
      .lab-giostra .gs-tex { flex: 1 1 0; min-width: 0; }
    }
    /* in orizzontale il pannello è stretto: la parola sopra, la formula sotto */
    @container lab (min-aspect-ratio: 5 / 4) {
      .lab-giostra .gs-riga { flex-direction: column; align-items: flex-start; min-height: 0; padding: 2px 0; }
      .lab-giostra .gs-et { min-width: 0; }
    }
    .lab-giostra .gs-riga.esito { margin-top: 3px; padding: 3px 8px; border-radius: 10px; animation: lab-giostra-pop .45s var(--molla); background: var(--sup2); }
    .lab-giostra .gs-riga.esito.ok { background: var(--ok-tenue); }
    .lab-giostra .gs-riga.esito.ok .gs-et { color: var(--ok); }
    .lab-giostra .gs-riga.esito.no { background: var(--no-tenue); }
    .lab-giostra .gs-riga.esito.no .gs-et { color: var(--no); }
    .lab-giostra .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.95rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-giostra .lab-messaggio:empty { display: none; }
    .lab-giostra .lab-messaggio .katex { font-size: 1.2em; }
    .lab-giostra.in-libero .lab-messaggio { color: var(--testo2); }
    .lab-giostra .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; }
    .lab-giostra .lab-barra .btn { min-height: clamp(40px, 6cqh, 50px); }
    .lab-giostra .b-molt { font-weight: 600; padding-left: 18px; padding-right: 18px; }
    .lab-giostra .b-molt .gs-x { font-size: 1.15em; line-height: 1; opacity: .9; margin-right: 4px; }
    .lab-giostra .btn[disabled] { opacity: .4; cursor: default; }
    .lab-giostra .lab-parametri { max-width: 460px; }
    .lab-giostra .lab-param .nome { min-width: 0; }
    .lab-giostra .gs-b-griglia { min-height: 38px; }
    .lab-giostra .vinto { display: inline-block; animation: lab-giostra-pop .5s var(--molla); }
    .lab-giostra .scuoti { animation: lab-giostra-no .38s ease; }
    @keyframes lab-giostra-pop { from { transform: scale(.8); opacity: 0 } to { transform: none; opacity: 1 } }
    @keyframes lab-giostra-no { 20%, 60% { transform: translateX(-5px) } 40%, 80% { transform: translateX(5px) } }
  `;

  /* ---------------- livelli ----------------
     z: il razzo (fisso), t: il bersaglio, agg: 'quadrato' (punti interi) o 'polare' (cerchi ogni 0,5 e raggi
     ogni 15°); volte: quante volte si moltiplica per w; sol: quante soluzioni diverse vanno trovate. */
  const R3 = Math.sqrt(3);
  const LIVELLI = [
    { z: [2, 0], t: [0, 2], tTex: '2i', tTesto: '2i', agg: 'quadrato',
      breve: 'Porta il razzo $z = 2$ sul bersaglio $2i$: scegli $w$, poi «Moltiplica».',
      testo: 'Il razzo $z = 2$ deve atterrare sul bersaglio $2i$. Scegli il numero $w$ trascinando il punto blu, poi premi «Moltiplica»: il razzo diventa $z \\cdot w$.',
      aiuto: 'Il punto blu è $w$. Quando premi «Moltiplica» il razzo fa due cose, una dopo l\'altra: prima **gira** dell\'angolo di $w$ (l\'angolo fra il semiasse reale positivo e il segmento blu, contato in senso antiorario), poi **si allunga** di tante volte quanto è lungo $w$. Guarda di quanto deve girare il razzo per puntare al bersaglio, e se deve cambiare lunghezza.',
      vittoria: 'Moltiplicare per i fa girare di un quarto di giro in senso antiorario, e la lunghezza resta quella perché |i| = 1. Così 2 · i fa 2i. La croce rossa è 2 + i: lì finirebbe il razzo se moltiplicare per i volesse dire aggiungere 1 alla parte immaginaria.',
      ponte: '2 \\cdot i = 2i \\qquad (\\text{non } 2 + i)', falso: { p: [2, 1], testo: '2 + i ?' } },
    { z: [1, 1], t: [-1, -1], tTex: '-1 - i', tTesto: '−1 − i', agg: 'quadrato',
      breve: 'Dal razzo $z = 1 + i$ al bersaglio $-1 - i$.',
      testo: 'Ora il razzo parte da $z = 1 + i$ e il bersaglio è $-1 - i$, dall\'altra parte dell\'origine.',
      aiuto: 'Confronta le lunghezze: se il bersaglio è lontano dall\'origine quanto la punta del razzo, $w$ deve essere lungo $1$, cioè stare sul cerchio tratteggiato. Poi conta di quanti gradi deve girare il razzo, sempre in senso antiorario.',
      vittoria: 'Moltiplicare per −1 fa mezzo giro, 180°. Ogni punto finisce dalla parte opposta dell\'origine, alla stessa distanza. Due mezzi giri fanno un giro intero: ecco perché (−1)·(−1) torna a 1.',
      ponte: '(1 + i)\\cdot(-1) = -1 - i' },
    { z: [1, 1], t: [3, 3], tTex: '3 + 3i', tTesto: '3 + 3i', agg: 'quadrato',
      breve: 'Dal razzo $z = 1 + i$ al bersaglio $3 + 3i$, nella stessa direzione.',
      testo: 'Il bersaglio $3 + 3i$ sta nella stessa direzione del razzo $z = 1 + i$, ma più lontano.',
      aiuto: 'Se la direzione è già giusta il razzo non deve girare: pensa a quali numeri hanno argomento $0^\\circ$. La lunghezza del prodotto è la lunghezza di $z$ **moltiplicata** per quella di $w$: guarda quante volte la distanza del bersaglio dall\'origine contiene la lunghezza del razzo.',
      vittoria: 'Un numero reale positivo non fa girare: allunga soltanto. Il razzo era lungo √2 ed è diventato lungo 3√2, tre volte tanto.',
      ponte: '(1 + i)\\cdot 3 = 3 + 3i' },
    { z: [1, 1], t: [-2, 2], tTex: '-2 + 2i', tTesto: '−2 + 2i', agg: 'quadrato',
      breve: 'Bersaglio $-2 + 2i$: il razzo deve girare **e** allungarsi.',
      testo: 'Bersaglio $-2 + 2i$: stavolta il razzo deve girare **e** allungarsi.',
      aiuto: 'Separa le due cose. Di quanti gradi deve girare il razzo per puntare verso il bersaglio? E quante volte deve diventare più lungo? Il $w$ che cerchi ha proprio quell\'argomento e quel modulo.',
      vittoria: 'w = 2i gira di 90° come i e raddoppia come 2. Nel prodotto gli argomenti si sommano, 45° + 90° = 135°, e i moduli si moltiplicano, √2 · 2 = 2√2.',
      ponte: '(1 + i)\\cdot 2i = 2i + 2i^2 = -2 + 2i' },
    { z: [2, 0], t: [1, R3], tTex: '1 + i\\sqrt{3}', tTesto: '1 + i√3', agg: 'polare',
      breve: 'Bersaglio $1 + i\\sqrt{3}$, con la griglia a cerchi e raggi.',
      testo: 'Il bersaglio è $1 + i\\sqrt{3}$. Qui la griglia è fatta di cerchi e di raggi ogni $15^\\circ$, e $w$ si aggancia a quelli.',
      aiuto: 'Trova il bersaglio sulla griglia a cerchi: su quale cerchio sta, e su quale raggio? Il razzo parte da $2$, sul semiasse reale, con argomento $0^\\circ$. Il modulo di $w$ è il rapporto fra le due lunghezze, l\'argomento di $w$ è la differenza fra i due angoli.',
      vittoria: 'Il bersaglio ha modulo 2, come il razzo, e argomento 60°. Quindi w ha modulo 1 e argomento 60°: in forma algebrica è ½ + i·√3/2, un numero che sulla griglia quadrata non avresti trovato.',
      ponte: '2\\left(\\cos 60^\\circ + i\\sin 60^\\circ\\right) = 1 + i\\sqrt{3}' },
    { z: [1, 0], t: [-1, 0], tTex: '-1', tTesto: '−1', agg: 'polare', volte: 2, sol: 2,
      breve: 'Il razzo parte da $1$ e arriva su $w^2$: trova i due $w$ con $w^2 = -1$.',
      testo: 'Ultimo livello. Il razzo parte da $1$ e «Moltiplica» lo moltiplica **due volte** per lo stesso $w$, quindi arriva su $w^2$. Trova i numeri $w$ con $w^2 = -1$: sono due, trovali tutti e due.',
      aiuto: 'Due moltiplicazioni per $w$ fanno girare due volte dello stesso angolo e allungano due volte dello stesso fattore. Quale lunghezza, moltiplicata per sé stessa, dà la distanza di $-1$ dall\'origine? Quale angolo, preso due volte, porta a $180^\\circ$? Ricorda che anche un giro in più, $360^\\circ$, riporta nello stesso punto.',
      vittoria: 'w = i e w = −i. Tutti e due hanno modulo 1: i gira di 90°, −i di 270°. Presi due volte fanno 180° e 540°, cioè mezzo giro e mezzo giro più un giro intero, e tutti e due portano 1 su −1. Per questo i² = −1 e anche (−i)² = −1.',
      ponte: 'i^2 = -1 \\qquad (-i)^2 = -1' }
  ];

  /* ---------------- geometria e aiuti ---------------- */
  const W = 400, H = 400, CX = 200, CY = 200, U = 44;      /* 1 unità del piano = 44 px; si vede da −4,5 a 4,5 */
  const LIM = 4;                                           /* w si aggancia dentro |Re|, |Im| ≤ 4 (o modulo ≤ 4) */
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const RAD = Math.PI / 180;
  const APICE = ['', '', '²', '³', '⁴', '⁵', '⁶'];
  const X = a => CX + a * U, Y = b => CY - b * U;
  const norm = a => ((a % 360) + 360) % 360;
  const dAng = (a, b) => { const d = Math.abs(norm(a) - norm(b)); return Math.min(d, 360 - d); };
  const pulito = v => (Math.abs(v) < 1e-12 ? 0 : v);
  const modulo = p => Math.hypot(p[0], p[1]);
  const argD = p => (modulo(p) < 1e-12 ? null : norm(Math.atan2(p[1], p[0]) / RAD));
  const per = (p, q) => [pulito(p[0] * q[0] - p[1] * q[1]), pulito(p[0] * q[1] + p[1] * q[0])];
  const vicini = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6;
  const liscia = u => 1 - Math.pow(1 - u, 3);
  const morbida = u => (u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

  /* numeri all'italiana */
  const dec = (v, c) => { const s = Number(v).toFixed(c).replace(/\.?0+$/, ''); return (s === '-0' ? '0' : s).replace('.', ','); };
  const decT = (v, c) => dec(v, c).replace(',', '{,}');
  /* riconosce x = ± k·√m / d con d ∈ {1, 2, 4}: tutti i moduli e le coordinate esatte che servono qui */
  function riconosci(x) {
    if (Math.abs(x) < 1e-9) return { s: 1, k: 0, m: 1, d: 1 };
    const q = x * x * 16, N = Math.round(q);
    if (Math.abs(q - N) > 1e-6 || N > 1e6) return null;
    let k = 1, m = N;
    for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; }
    let d = 4; while (d > 1 && k % 2 === 0) { k /= 2; d /= 2; }
    return { s: x < 0 ? -1 : 1, k, m, d };
  }
  /* LaTeX di un reale: esatto se possibile, altrimenti due decimali */
  function texR(x) {
    const r = riconosci(x);
    if (!r) return { t: decT(x, 2), esatto: false };
    if (r.k === 0) return { t: '0', esatto: true };
    const corpo = (r.k === 1 && r.m !== 1 ? '' : String(r.k)) + (r.m !== 1 ? '\\sqrt{' + r.m + '}' : '');
    return { t: (r.s < 0 ? '-' : '') + (r.d > 1 ? '\\frac{' + corpo + '}{' + r.d + '}' : corpo), esatto: true };
  }
  /* testo semplice (per le scritte nella scena) */
  function testoR(x) {
    const r = riconosci(x);
    if (!r) return dec(x, 2);
    if (r.m === 1) return (r.s < 0 ? '−' : '') + dec(r.k / r.d, 2);
    return (r.s < 0 ? '−' : '') + (r.k === 1 ? '' : r.k) + '√' + r.m + (r.d > 1 ? '/' + r.d : '');
  }
  /* LaTeX di un complesso a + bi */
  function texC(p) {
    const a = pulito(p[0]), b = pulito(p[1]);
    const ra = riconosci(a), rb = riconosci(b), esatto = !!(ra && rb);
    const re = esatto ? texR(a).t : decT(a, 2);
    if (Math.abs(b) < 1e-9) return { t: re, esatto };
    let im;
    if (esatto) {
      const r = rb;
      if (r.m === 1 && r.d === 1) im = (r.k === 1 ? '' : r.k) + 'i';
      else if (r.d === 1) im = (r.k === 1 ? '' : r.k) + 'i\\sqrt{' + r.m + '}';
      else im = texR(Math.abs(b)).t + 'i';
    } else im = decT(Math.abs(b), 2) + 'i';
    if (Math.abs(a) < 1e-9) return { t: (b < 0 ? '-' : '') + im, esatto };
    return { t: re + (b < 0 ? ' - ' : ' + ') + im, esatto };
  }
  const gEsatto = a => Math.abs(a - Math.round(a)) < 1e-6;
  const gT = a => (gEsatto(a) ? String(Math.round(a)) : decT(a, 1)) + '^\\circ';
  const gTesto = a => (gEsatto(a) ? String(Math.round(a)) : dec(a, 1)) + '°';

  const PRATO = 'color-mix(in srgb, var(--s3) 13%, var(--sup))';
  const PRATO2 = 'color-mix(in srgb, var(--s3) 21%, var(--sup))';
  const LINEA = 'color-mix(in srgb, var(--s3) 36%, var(--sup))';
  const LINEA2 = 'color-mix(in srgb, var(--s3) 58%, var(--sup))';
  const SCURO = c => 'color-mix(in srgb, ' + c + ' 62%, #000)';
  const C_Z = 'var(--s2)', C_W = 'var(--s1)', C_T = 'var(--s4)';

  COMPASSO.registraLab({
    id: 'giostra',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-giostra')) { const s = document.createElement('style'); s.id = 'stile-lab-giostra'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-giostra');
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="lab-aiuto" hidden data-scorre><div class="gs-aiuto-testo"></div><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: niente bersaglio, z e w li scegli tu">Libero</button></div>
            <div class="gs-obiettivo"></div>
            <div class="lab-parametri" hidden>
              <div class="didascalia">Trascina ${ctx.tex('w')} (il punto blu) o la punta del razzo ${ctx.tex('z')}; ${ctx.tex('n')} dice quante volte moltiplichi per ${ctx.tex('w')}.</div>
              <div class="lab-param" data-p="n"><span class="nome">${ctx.tex('n')}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="una moltiplicazione in meno">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="una moltiplicazione in più">+</button></div>
              <button type="button" class="btn piccolo gs-b-griglia">Griglia a cerchi</button>
            </div>
            <div class="gs-carta"></div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <button type="button" class="btn primario b-molt"><span class="gs-x">×</span><span class="b-molt-t">Moltiplica</span></button>
              <button type="button" class="btn piccolo b-ric">Ricomincia</button>
              <button type="button" class="btn piccolo b-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo b-aiuto" aria-label="Come si gioca" title="Come si gioca">?</button>
            </div>
          </div>
        </div>`;

      const scena = radice.querySelector('.lab-scena'), lato = radice.querySelector('.lab-lato');
      const objEl = radice.querySelector('.gs-obiettivo'), aiutoEl = radice.querySelector('.lab-aiuto'), aiutoTesto = radice.querySelector('.gs-aiuto-testo'), carta = radice.querySelector('.gs-carta');
      const msg = radice.querySelector('.lab-messaggio'), livelliEl = radice.querySelector('.lab-livelli');
      const bMolt = radice.querySelector('.b-molt'), bMoltT = radice.querySelector('.b-molt-t');
      const bRic = radice.querySelector('.b-ric'), bAiuto = radice.querySelector('.b-aiuto'), bCasuale = radice.querySelector('.b-casuale'), bLibero = radice.querySelector('.lab-libero');
      const parametriEl = radice.querySelector('.lab-parametri'), bGriglia = radice.querySelector('.gs-b-griglia');
      const scuro = ctx.tema() === 'scuro';

      /* KaTeX disegna il tratto della radice lungo 400000 unità e ne nasconde la coda con un overflow: a vederlo è
         giusto, ma per getBoundingClientRect (e per il misuratore della schermata) esce di metri. Lo si accorcia
         alla larghezza del radicando; il rapporto fra larghezza e altezza non cambia con la scala del testo. */
      function radiciCorte() {
        radice.querySelectorAll('.katex .hide-tail svg:not([data-corta])').forEach(s => {
          const w = s.parentNode.getBoundingClientRect().width, h = s.getBoundingClientRect().height, vb = String(s.getAttribute('viewBox')).split(/[\s,]+/).map(Number);
          if (!(w > 0 && h > 0 && vb[3] > 0)) return;   /* nascosta: si accorcia quando compare */
          const n = Math.ceil(w * vb[3] / h);   /* il tratto arriva a x = 400000: basta arrivare alla larghezza vera */
          s.querySelectorAll('path').forEach(p => p.setAttribute('d', p.getAttribute('d').replace(/H400000/g, 'H' + Math.max(n, 900))
            .replace(/M([\d.]+)[ ,]([-\d.]+)\s*h400000v([-\d.]+)h-400000/g, (_, x, y, v) => { const l = Math.max(10, n - x); return 'M' + x + ' ' + y + 'h' + l + 'v' + v + 'h-' + l; })));
          s.setAttribute('data-corta', '');
        });
      }
      const osservaTex = new MutationObserver(radiciCorte);
      osservaTex.observe(radice, { childList: true, subtree: true });

      /* ================= scena =================
         Il piano vero è il quadrato 400 × 400 attorno all'origine (da −4,5 a 4,5). Se lo spazio non è
         quadrato, adatta() allarga il viewBox da una parte sola e il prato continua: niente vuoti. */
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'gs-svg', role: 'img', tabindex: 0, preserveAspectRatio: 'xMidYMid meet',
        'aria-label': 'Piano di Gauss visto dall\'alto: tocca o trascina per scegliere w, frecce per spostarlo, Invio per moltiplicare' });
      scena.insertBefore(svg, aiutoEl);
      const BX = { x0: 0, y0: 0, x1: W, y1: H };     /* il rettangolo visibile, in coordinate del piano (px del viewBox) */
      const defs = el('defs'); svg.appendChild(defs);
      const ombra = el('filter', { id: 'gs-ombra', x: '-50%', y: '-50%', width: '200%', height: '200%' });
      ombra.appendChild(el('feDropShadow', { dx: 0, dy: 2, stdDeviation: 1.8, 'flood-color': '#000', 'flood-opacity': scuro ? .5 : .24 }));
      defs.appendChild(ombra);
      const vign = el('radialGradient', { id: 'gs-vign', cx: '50%', cy: '50%', r: '72%' });
      vign.appendChild(el('stop', { offset: '.62', 'stop-color': '#000', 'stop-opacity': 0 }));
      vign.appendChild(el('stop', { offset: '1', 'stop-color': '#000', 'stop-opacity': scuro ? .32 : .09 }));
      defs.appendChild(vign);

      const mondo = el('g'); svg.appendChild(mondo);
      const g = (cls, attr) => { const x = el('g', Object.assign({ class: cls }, attr || {})); mondo.appendChild(x); return x; };
      const scritta = (gr, x, y, t, stile, anc, col, alone) => gr.appendChild(el('text', { x, y, 'text-anchor': anc || 'middle', fill: col || 'var(--testo2)',
        stroke: alone || PRATO, 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: stile }, t));

      /* prato a strisce, come un campo appena tagliato */
      const gPrato = g('gs-prato');
      const gGriglia = g('gs-griglia');
      const gAssi = g('gs-assi');

      /* prato e assi coprono tutto il rettangolo visibile (si ridisegnano quando cambia forma) */
      function disegnaPrato() {
        vuota(gPrato); vuota(gAssi);
        const { x0, y0, x1, y1 } = BX, larg = x1 - x0, alt = y1 - y0;
        gPrato.appendChild(el('rect', { x: x0, y: y0, width: larg, height: alt, style: 'fill: ' + PRATO }));
        const ex = (x1 - CX) / U, ey = (y1 - CY) / U;
        for (let i = -2 * Math.ceil((ex + 1) / 2) - 1; i < ex + 1; i += 2) {   /* strisce tagliate al bordo: niente fuori dal riquadro */
          const a = Math.max(x0, X(i)), b = Math.min(x1, X(i) + U);
          if (b > a) gPrato.appendChild(el('rect', { x: a, y: y0, width: b - a, height: alt, style: 'fill: ' + PRATO2, opacity: .5 }));
        }
        gPrato.appendChild(el('rect', { x: x0, y: y0, width: larg, height: alt, fill: 'url(#gs-vign)' }));
        gPrato.appendChild(el('rect', { x: x0 + 7, y: y0 + 7, width: larg - 14, height: alt - 14, rx: 15, fill: 'none', style: 'stroke: ' + LINEA2, 'stroke-width': 1.6, opacity: .7 }));
        /* assi del piano */
        const AXx = ex - .18, AXy = ey - .18;
        gAssi.appendChild(el('line', { x1: X(-AXx), y1: Y(0), x2: X(AXx) - 4, y2: Y(0), stroke: 'var(--testo2)', 'stroke-width': 1.7, opacity: .85 }));
        gAssi.appendChild(el('line', { x1: X(0), y1: Y(-AXy), x2: X(0), y2: Y(AXy) + 4, stroke: 'var(--testo2)', 'stroke-width': 1.7, opacity: .85 }));
        gAssi.appendChild(el('path', { d: `M${X(AXx) + 3} ${Y(0)} l-10 -5 v10 Z`, fill: 'var(--testo2)', opacity: .85 }));
        gAssi.appendChild(el('path', { d: `M${X(0)} ${Y(AXy) - 3} l-5 10 h10 Z`, fill: 'var(--testo2)', opacity: .85 }));
        const kx = Math.min(6, Math.floor(ex - .45)), ky = Math.min(6, Math.floor(ey - .45));
        for (let k = -kx; k <= kx; k++) {
          if (!k) continue;
          gAssi.appendChild(el('line', { x1: X(k), y1: Y(0) - 4, x2: X(k), y2: Y(0) + 4, stroke: 'var(--testo2)', 'stroke-width': 1.4 }));
          scritta(gAssi, X(k), Y(0) + 17, (k < 0 ? '−' : '') + Math.abs(k), 'font: 500 12px var(--font)');
        }
        for (let k = -ky; k <= ky; k++) {
          if (!k) continue;
          gAssi.appendChild(el('line', { x1: X(0) - 4, y1: Y(k), x2: X(0) + 4, y2: Y(k), stroke: 'var(--testo2)', 'stroke-width': 1.4 }));
          scritta(gAssi, X(0) - 8, Y(k) + 4, (k < 0 ? '−' : '') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + 'i', 'font: italic 500 12px var(--font)', 'end');
        }
        scritta(gAssi, X(AXx) - 2, Y(0) - 9, 'Re', 'font: 600 12px var(--font)', 'end');
        scritta(gAssi, X(0) + 9, Y(AXy) + 8, 'Im', 'font: 600 12px var(--font)', 'start');
      }

      const gBers = g('gs-bersaglio');
      const gTraccia = g('gs-traccia');
      const gOrme = g('gs-orme');

      /* w: segmento tratteggiato, angolo, maniglia */
      const gW = g('gs-w');
      const wSettore = el('path', { style: 'fill: color-mix(in srgb, var(--s1) 16%, transparent)' }); gW.appendChild(wSettore);
      const wArco = el('path', { fill: 'none', stroke: C_W, 'stroke-width': 2, 'stroke-linecap': 'round' }); gW.appendChild(wArco);
      const wLinea = el('line', { x1: CX, y1: CY, x2: CX, y2: CY, stroke: C_W, 'stroke-width': 2.6, 'stroke-dasharray': '6 5', 'stroke-linecap': 'round' }); gW.appendChild(wLinea);
      const wAlone = el('circle', { r: 19, fill: C_W, opacity: .16 }); gW.appendChild(wAlone);
      const wPunto = el('circle', { class: 'gs-maniglia', r: 10.5, fill: C_W, stroke: 'var(--sup)', 'stroke-width': 3, filter: 'url(#gs-ombra)' }); gW.appendChild(wPunto);
      const wNome = el('text', { fill: C_W, stroke: PRATO, 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', 'text-anchor': 'middle', style: 'font: italic 700 17px var(--font-titoli)' }, 'w');
      gW.appendChild(wNome);

      /* impronta di z: resta dove partiva il razzo mentre il razzo si muove */
      const zOrma = el('g', { opacity: 0 }); mondo.appendChild(zOrma);
      const zOrmaLinea = el('line', { x1: CX, y1: CY, x2: CX, y2: CY, stroke: C_Z, 'stroke-width': 2.4, 'stroke-dasharray': '3 5', 'stroke-linecap': 'round', opacity: .8 }); zOrma.appendChild(zOrmaLinea);
      const zOrmaPunto = el('circle', { cx: CX, cy: CY, r: 4.5, fill: 'var(--sup)', stroke: C_Z, 'stroke-width': 2 }); zOrma.appendChild(zOrmaPunto);
      const zOrmaNome = el('text', { x: CX, y: CY, fill: C_Z, stroke: PRATO, 'stroke-width': 4, 'paint-order': 'stroke', 'text-anchor': 'middle', style: 'font: italic 700 15px var(--font-titoli)', opacity: .85 }, 'z');
      zOrma.appendChild(zOrmaNome);

      /* il razzo: scia dall'origine e razzo con la punta sul numero */
      const gRazzo = g('gs-razzo');
      const scia = el('line', { x1: CX, y1: CY, stroke: C_Z, 'stroke-width': 4.5, 'stroke-linecap': 'round' }); gRazzo.appendChild(scia);
      const razzo = el('g', { filter: 'url(#gs-ombra)' }); gRazzo.appendChild(razzo);
      const fiamma = el('path', { d: 'M-24 -3.6 Q-38 0 -24 3.6 Q-29 0 -24 -3.6 Z', fill: 'var(--avviso)', opacity: 0 }); razzo.appendChild(fiamma);
      razzo.appendChild(el('path', { d: 'M-17 -5.5 L-28 -12.5 L-25 -4.5 Z M-17 5.5 L-28 12.5 L-25 4.5 Z', fill: SCURO(C_Z) }));
      razzo.appendChild(el('path', { d: 'M0 0 C-4 -5.8 -11 -7.2 -20 -6.6 L-25 -5.4 L-25 5.4 L-20 6.6 C-11 7.2 -4 5.8 0 0 Z', fill: C_Z, stroke: SCURO(C_Z), 'stroke-width': 1.3, 'stroke-linejoin': 'round' }));
      razzo.appendChild(el('path', { d: 'M-4.5 -3.6 C-8 -5.2 -12 -5.6 -16 -5.2', fill: 'none', stroke: '#fff', 'stroke-width': 1.4, 'stroke-linecap': 'round', opacity: .55 }));
      razzo.appendChild(el('circle', { cx: -12, cy: 0, r: 2.9, fill: 'var(--sup)', stroke: SCURO(C_Z), 'stroke-width': 1.3 }));
      const zNome = el('text', { fill: C_Z, stroke: PRATO, 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', 'text-anchor': 'middle', style: 'font: italic 700 16px var(--font-titoli)' }, 'z');
      gRazzo.appendChild(zNome);
      /* in modalità libera la punta del razzo si prende col dito: un alone arancione lo dice */
      const zPresa = el('circle', { r: 17, fill: C_Z, 'fill-opacity': .15, opacity: 0, stroke: C_Z, 'stroke-width': 2, 'stroke-dasharray': '4 4', 'pointer-events': 'none' }); gRazzo.appendChild(zPresa);

      /* rampa di lancio nell'origine */
      const gPerno = g('gs-perno');
      gPerno.appendChild(el('circle', { cx: CX, cy: CY, r: 8.5, fill: 'var(--sup)', stroke: 'var(--testo2)', 'stroke-width': 2, filter: 'url(#gs-ombra)' }));
      gPerno.appendChild(el('circle', { cx: CX, cy: CY, r: 3, fill: 'var(--testo2)' }));
      mondo.insertBefore(gPerno, gRazzo);

      const gFx = g('gs-fx', { 'pointer-events': 'none' });

      /* ================= stato ================= */
      const completati = ctx.stato().livelli;
      let livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      let libero = false, salvato = null;              /* modalità libera, e lo stato del livello da cui ci si è entrati */
      const LIB = { z: [2, 0], t: null, agg: 'quadrato', volte: 1 };   /* il «livello» libero: niente bersaglio */
      const L = () => (libero ? LIB : LIVELLI[livello]);
      let w = { p: [1, 0], r: 1, th: 0 };
      let anim = false, fatto = false, vinto = false, colpito = false, prodotto = null, trovati = [], trascino = false, vivo = true;
      let rafAnim = 0, rafFx = 0, gen = 0, seq = 0, effetti = [], chiaveF = '';
      const timers = [];
      const dopo = (fn, ms) => { const t = setTimeout(() => { if (vivo) fn(); }, ms); timers.push(t); return t; };

      /* ================= disegno ================= */
      function arcoD(r, a0, a1) {                     /* arco in senso antiorario da a0 ad a1 (gradi), raggio in px */
        const span = a1 - a0;
        if (Math.abs(span) < .01 || r < .5) return 'M0 0';
        const pt = a => (CX + r * Math.cos(a * RAD)).toFixed(1) + ' ' + (CY - r * Math.sin(a * RAD)).toFixed(1);
        if (span >= 359.9) { const m = a0 + span / 2; return `M${pt(a0)} A${r} ${r} 0 1 0 ${pt(m)} A${r} ${r} 0 ${span - 180 > 180 ? 1 : 0} 0 ${pt(a1)}`; }
        return `M${pt(a0)} A${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${pt(a1)}`;
      }
      function disegnaGriglia() {
        vuota(gGriglia);
        const polare = L().agg === 'polare';
        const ex = Math.floor((BX.x1 - CX) / U), ey = Math.floor((BX.y1 - CY) / U);
        const st = { style: 'stroke: ' + LINEA, 'stroke-width': 1.2, opacity: polare ? .45 : 1 };
        for (let k = -ex; k <= ex; k++) if (k) gGriglia.appendChild(el('line', Object.assign({ x1: X(k), y1: BX.y0, x2: X(k), y2: BX.y1 }, st)));
        for (let k = -ey; k <= ey; k++) if (k) gGriglia.appendChild(el('line', Object.assign({ x1: BX.x0, y1: Y(k), x2: BX.x1, y2: Y(k) }, st)));
        if (polare) {
          for (let a = 0; a < 360; a += 15) {
            const forte = a % 30 === 0;
            gGriglia.appendChild(el('line', { x1: X(.5 * Math.cos(a * RAD)), y1: Y(.5 * Math.sin(a * RAD)), x2: X(4.3 * Math.cos(a * RAD)), y2: Y(4.3 * Math.sin(a * RAD)),
              style: 'stroke: ' + (forte ? LINEA2 : LINEA), 'stroke-width': forte ? 1.2 : .9 }));
          }
          for (let r = .5; r <= 4; r += .5) {
            const intero = r % 1 === 0;
            gGriglia.appendChild(el('circle', { cx: CX, cy: CY, r: r * U, fill: 'none', style: 'stroke: ' + (intero ? LINEA2 : LINEA), 'stroke-width': intero ? 1.4 : .9 }));
          }
          [30, 60, 120, 150, 210, 240, 300, 330].forEach(a => scritta(gGriglia, X(4.12 * Math.cos(a * RAD)), Y(4.12 * Math.sin(a * RAD)) + 4, a + '°', 'font: 500 12px var(--font)', 'middle', 'var(--testo3)'));
        }
        gGriglia.appendChild(el('circle', { cx: CX, cy: CY, r: U, fill: 'none', stroke: 'var(--testo2)', 'stroke-width': 1.5, 'stroke-dasharray': '3 5', opacity: .55 }));
      }
      /* quanti px dal centro si può andare nella direzione th restando a m px dal bordo del campo visibile */
      function rVis(th, m) {
        const dx = Math.cos(th * RAD), dy = -Math.sin(th * RAD); let t = Infinity;
        if (dx > 1e-9) t = Math.min(t, (BX.x1 - m - CX) / dx); else if (dx < -1e-9) t = Math.min(t, (BX.x0 + m - CX) / dx);
        if (dy > 1e-9) t = Math.min(t, (BX.y1 - m - CY) / dy); else if (dy < -1e-9) t = Math.min(t, (BX.y0 + m - CY) / dy);
        return Math.max(0, t);
      }
      function rientra(t) {                          /* una scritta che sborda dal campo si sposta dentro */
        let b; try { b = t.getBBox(); } catch (e) { return t; }
        if (!b || !b.width) return t;
        const dx = Math.max(BX.x0 + 4 - b.x, Math.min(0, BX.x1 - 4 - b.x - b.width)), dy = Math.max(BX.y0 + 4 - b.y, Math.min(0, BX.y1 - 4 - b.y - b.height));
        if (dx) t.setAttribute('x', +t.getAttribute('x') + dx);
        if (dy) t.setAttribute('y', +t.getAttribute('y') + dy);
        return t;
      }
      function etichetta(gr, pxX, pxY, ang, dist, t, col, stile) {
        const c = Math.cos(ang * RAD), s = Math.sin(ang * RAD);
        const x = Math.max(BX.x0 + 16, Math.min(BX.x1 - 16, pxX + c * dist)), y = Math.max(BX.y0 + 16, Math.min(BX.y1 - 10, pxY - s * dist + 5));
        const anc = c > .35 ? 'start' : c < -.35 ? 'end' : 'middle';
        return rientra(scritta(gr, x, y, t, stile, anc, col));
      }
      let bersaglio = null;
      function disegnaBersaglio() {
        vuota(gBers); bersaglio = null;
        if (!L().t) return;                            /* modalità libera: nessun bersaglio */
        const l = L(), bx = X(l.t[0]), by = Y(l.t[1]);
        bersaglio = el('g', { transform: `translate(${bx} ${by})` }); gBers.appendChild(bersaglio);
        bersaglio.appendChild(el('circle', { r: 22, fill: C_T, opacity: .13 }));
        bersaglio.appendChild(el('circle', { r: 15, fill: 'var(--sup)', stroke: C_T, 'stroke-width': 2.6, filter: 'url(#gs-ombra)' }));
        bersaglio.appendChild(el('circle', { r: 9.5, fill: 'none', stroke: C_T, 'stroke-width': 2 }));
        bersaglio.appendChild(el('circle', { r: 4, fill: C_T }));
        const at = argD(l.t) || 0;
        etichetta(gBers, bx, by, at + (l.t[1] === 0 ? 90 : 0), 28, l.tTesto, C_T, 'font: 700 13.5px var(--font)');
      }
      function posRazzo(r, th, nome) {
        const lim = rVis(th, 18), fuoriCampo = r * U > lim + .5, lun = Math.min(r * U, lim);
        const x = CX + lun * Math.cos(th * RAD), y = CY - lun * Math.sin(th * RAD);
        razzo.setAttribute('opacity', fuoriCampo ? .55 : 1);
        scia.setAttribute('stroke-dasharray', fuoriCampo ? '7 6' : 'none');
        const sc = Math.max(.55, Math.min(1, lun / 26 + .2));
        const cor = Math.max(0, lun - 14);
        scia.setAttribute('x2', (CX + cor * Math.cos(th * RAD)).toFixed(1)); scia.setAttribute('y2', (CY - cor * Math.sin(th * RAD)).toFixed(1));
        scia.setAttribute('opacity', lun > 16 ? .9 : 0);
        razzo.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(-th).toFixed(2)}) scale(${sc.toFixed(3)})`);
        if (nome != null) zNome.textContent = nome;
        const pa = th + 90, dx = 17 * Math.cos(pa * RAD) - 10 * Math.cos(th * RAD), dy = -17 * Math.sin(pa * RAD) + 10 * Math.sin(th * RAD);
        zNome.setAttribute('x', Math.max(BX.x0 + 14, Math.min(BX.x1 - 14, x + dx)).toFixed(1)); zNome.setAttribute('y', Math.max(BX.y0 + 18, Math.min(BX.y1 - 8, y + dy + 5)).toFixed(1));
        zPresa.setAttribute('cx', x.toFixed(1)); zPresa.setAttribute('cy', y.toFixed(1));
        zNome.setAttribute('opacity', zNome.textContent ? 1 : 0);
      }
      function razzoSu(p, nome) { posRazzo(modulo(p), argD(p) || 0, nome); }
      function aggiornaW() {
        const x = X(w.p[0]), y = Y(w.p[1]);
        wLinea.setAttribute('x2', x); wLinea.setAttribute('y2', y);
        wLinea.setAttribute('opacity', w.r * U > 14 ? 1 : 0);
        wAlone.setAttribute('cx', x); wAlone.setAttribute('cy', y);
        wPunto.setAttribute('cx', x); wPunto.setAttribute('cy', y);
        wPunto.setAttribute('r', trascino === 'w' ? 13 : 10.5);
        const conArco = w.r > 1e-9 && w.th > .5;
        wArco.setAttribute('d', conArco ? arcoD(24, 0, w.th) : 'M0 0');
        wSettore.setAttribute('d', conArco ? arcoD(24, 0, w.th) + ` L${CX} ${CY} Z` : 'M0 0');
        const la = w.r > 1e-9 && (dAng(w.th, 45) < 25 || dAng(w.th, 225) < 25) ? 135 : 45;   /* mai sopra il segmento blu */
        wNome.setAttribute('x', Math.max(BX.x0 + 12, Math.min(BX.x1 - 12, x + 19 * Math.cos(la * RAD))).toFixed(1));
        wNome.setAttribute('y', Math.max(BX.y0 + 18, Math.min(BX.y1 - 8, y - 19 * Math.sin(la * RAD) + 6)).toFixed(1));
      }
      function disegnaTrovati() {
        trovati.forEach((q, i) => {
          const x = X(q[0]), y = Y(q[1]);
          const gr = el('g'); gOrme.appendChild(gr);
          gr.appendChild(el('circle', { cx: x, cy: y, r: 13, fill: 'var(--ok-tenue)', stroke: 'var(--ok)', 'stroke-width': 2.4 }));
          gr.appendChild(el('path', { d: `M${x - 5} ${y} l3.5 4 l6.5 -8`, fill: 'none', stroke: 'var(--ok)', 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
          etichetta(gr, x, y, (argD(q) || 0) - 40, 24, 'w' + (i + 1) + ' = ' + texPiano(q), 'var(--ok)', 'font: 700 12.5px var(--font)');
        });
      }
      function texPiano(q) {                           /* complesso in testo semplice, per la scena */
        const a = pulito(q[0]), b = pulito(q[1]);
        const im = Math.abs(b) < 1e-9 ? '' : (Math.abs(Math.abs(b) - 1) < 1e-9 ? '' : testoR(Math.abs(b))) + 'i';
        if (!im) return testoR(a);
        if (Math.abs(a) < 1e-9) return (b < 0 ? '−' : '') + im;
        return testoR(a) + (b < 0 ? ' − ' : ' + ') + im;
      }

      /* ================= formula scritta ================= */
      const riga = (et, corpo, cls, pallino) => '<div class="gs-riga' + (cls ? ' ' + cls : '') + '"><span class="gs-et">' + (pallino ? '<i style="background:' + pallino + '"></i>' : '') + '<span class="t">' + et + '</span></span><span class="gs-tex">' + corpo + '</span></div>';
      function formula(forza) {
        const l = L(), volte = l.volte || 1;
        const chiave = [libero, livello, w.p.join(','), l.z.join(','), volte, fatto, vinto, colpito, trovati.length].join('|');
        if (!forza && chiave === chiaveF) return;
        chiaveF = chiave;
        const T = s => ctx.tex(s);
        const mz = modulo(l.z), az = argD(l.z) || 0;
        let h = '';
        const zc = texC(l.z);
        if (volte === 1 || libero) h += riga('razzo', T('z ' + (zc.esatto ? '=' : '\\approx') + ' ' + zc.t) + T('|z| = ' + texR(mz).t) + T('\\theta_z = ' + gT(az)), '', C_Z);
        else h += riga('razzo', T('z = 1') + T('z \\cdot w \\cdot w = w^2'), '', C_Z);
        /* w in forma algebrica e trigonometrica */
        let wt;
        if (w.r < 1e-12) wt = T('w = 0');
        else {
          const alg = texC(w.p), thE = gEsatto(w.th), rho = texR(w.r).t, uno = Math.abs(w.r - 1) < 1e-12;
          const trig = (uno ? '' : rho) + (uno ? '\\cos ' + gT(w.th) + ' + i\\sin ' + gT(w.th) : '\\left(\\cos ' + gT(w.th) + ' + i\\sin ' + gT(w.th) + '\\right)');
          wt = alg.esatto && thE ? T('w = ' + alg.t + ' = ' + trig) : T('w ' + (alg.esatto ? '=' : '\\approx') + ' ' + alg.t) + T('w ' + (thE ? '=' : '\\approx') + ' ' + trig);
        }
        h += riga('moltiplicatore', wt, '', C_W);
        if (libero) { carta.innerHTML = h + righeLibere(T, mz, az); return; }
        /* il prodotto: moduli che si moltiplicano, argomenti che si sommano */
        if (w.r < 1e-12) {
          h += riga('moduli', T(volte === 1 ? '|z\\cdot w| = ' + texR(mz).t + ' \\cdot 0 = 0' : '|w^2| = 0 \\cdot 0 = 0'));
          h += riga('argomenti', '<span class="gs-vuoto">con w = 0 l\'angolo non esiste</span>');
        } else {
          const rw = texR(w.r).t;
          let som, fin, esA = gEsatto(w.th) && gEsatto(az);
          if (volte === 1) {
            h += riga('moduli', T('|z\\cdot w| = |z|\\cdot|w| = ' + texR(mz).t + ' \\cdot ' + rw + ' = ' + texR(mz * w.r).t));
            som = '\\theta_z + \\theta_w = ' + gT(az) + ' + ' + gT(w.th); fin = az + w.th;
          } else {
            h += riga('moduli', T('|w^2| = |w|\\cdot|w| = ' + rw + ' \\cdot ' + rw + ' = ' + texR(w.r * w.r).t));
            som = '\\theta_w + \\theta_w = ' + gT(w.th) + ' + ' + gT(w.th); fin = 2 * w.th;
          }
          const rel = esA ? ' = ' : ' \\approx ';
          let coda = rel + gT(fin);
          if (fin >= 360 - 1e-9) coda += ' = 360^\\circ + ' + gT(fin - 360);
          h += riga('argomenti', T('\\theta = ' + som + coda));
        }
        if (fatto && prodotto && !vinto) {   /* a livello vinto lo dice già il messaggio */
          const nome = volte === 1 ? 'z\\cdot w' : 'w^2', pc = texC(prodotto);
          h += riga(colpito ? 'centrato' : 'atterrato su', T(nome + (pc.esatto ? ' = ' : ' \\approx ') + pc.t + (colpito ? '' : ' \\neq ' + l.tTex)), 'esito ' + (colpito ? 'ok' : 'no'));
        }
        if (vinto) h += riga('in formula', T(l.ponte), 'esito ok');
        carta.innerHTML = h;
      }

      /* modalità libera: z·wⁿ, moduli che si moltiplicano n volte, argomenti che si sommano n volte */
      function righeLibere(T, mz, az) {
        const n = LIB.volte, nome = n === 1 ? 'z\\cdot w' : 'z\\cdot w^{' + n + '}';
        let h = '';
        if (w.r < 1e-12) {
          h += riga('moduli', T('|' + nome + '| = ' + texR(mz).t + ' \\cdot 0 = 0'));
          h += riga('argomenti', '<span class="gs-vuoto">con w = 0 l\'angolo non esiste</span>');
        } else {
          const rw = texR(w.r).t, rwP = /^[0-9]+$/.test(rw) ? rw : '\\left(' + rw + '\\right)';
          const m = texR(mz * Math.pow(w.r, n));
          h += riga('moduli', T('|' + nome + '| = |z|\\cdot|w|' + (n > 1 ? '^{' + n + '}' : '') + ' = ' + texR(mz).t + ' \\cdot ' + (n > 1 ? rwP + '^{' + n + '}' : rw) + (m.esatto ? ' = ' : ' \\approx ') + m.t));
          const fin = az + n * w.th, esA = gEsatto(az) && gEsatto(w.th), giri = Math.floor((fin + 1e-9) / 360);
          let t = '\\theta = \\theta_z + ' + (n > 1 ? n + '\\,' : '') + '\\theta_w = ' + gT(az) + ' + ' + (n > 1 ? n + '\\cdot ' : '') + gT(w.th) + (esA ? ' = ' : ' \\approx ') + gT(fin);
          if (giri >= 1) t += ' = ' + (giri > 1 ? giri + '\\cdot ' : '') + '360^\\circ + ' + gT(fin - giri * 360);
          h += riga('argomenti', T(t));
        }
        if (fatto && prodotto) { const pc = texC(prodotto); h += riga('risultato', T(nome + (pc.esatto ? ' = ' : ' \\approx ') + pc.t), 'esito'); }
        return h;
      }

      function aggiornaComandi() {
        const l = L(), volte = l.volte || 1;
        bMolt.disabled = anim || vinto; bMolt.hidden = vinto;
        bMoltT.textContent = volte === 1 ? 'Moltiplica' : volte === 2 ? 'Moltiplica due volte' : 'Moltiplica ' + volte + ' volte';
        bRic.disabled = anim;
        bCasuale.disabled = anim; bGriglia.disabled = anim;
        if (libero) aggiornaParametri();
      }

      /* ================= animazioni ================= */
      function anima(dur, draw, fine) {               /* rAF, con una riserva a tempo se rAF è strozzato */
        const mio = ++gen; cancelAnimationFrame(rafAnim);
        const t0 = performance.now(); let chiuso = false;
        const chiudi = () => { if (chiuso || !vivo || mio !== gen) return; chiuso = true; cancelAnimationFrame(rafAnim); rafAnim = 0; draw(1); if (fine) fine(); };
        const passo = t => { if (chiuso || !vivo || mio !== gen) return; const u = Math.min(1, Math.max(0, (t - t0) / dur)); draw(u); if (u < 1) rafAnim = requestAnimationFrame(passo); else chiudi(); };
        rafAnim = requestAnimationFrame(passo);
        dopo(chiudi, dur + 250);
      }
      function tick(t) {
        effetti = effetti.filter(e => {
          const u = (t - e.t0) / e.dur;
          if (u < 0) return true;
          e.draw(Math.min(1, u));
          if (u >= 1) { if (e.fine) e.fine(); return false; }
          return true;
        });
        rafFx = effetti.length && vivo ? requestAnimationFrame(tick) : 0;
      }
      function effetto(e) { e.t0 = e.t0 || performance.now(); effetti.push(e); if (!rafFx) rafFx = requestAnimationFrame(tick); }
      function impulso(x, y, colore, rMax) {
        const c = el('circle', { cx: x, cy: y, r: 8, fill: 'none', stroke: colore, 'stroke-width': 3 }); gFx.appendChild(c);
        effetto({ dur: 650, draw: u => { c.setAttribute('r', 8 + (rMax - 8) * liscia(u)); c.setAttribute('opacity', .95 * (1 - u)); }, fine: () => c.remove() });
      }
      function festa() {
        const l = L(), bx = X(l.t[0]), by = Y(l.t[1]);
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--avviso)', 'var(--ok)'];
        impulso(bx, by, 'var(--ok)', 44); dopo(() => impulso(bx, by, 'var(--ok)', 30), 160);
        for (let i = 0; i < 18; i++) {
          const a = i / 18 * Math.PI * 2 + (i % 2 ? .15 : -.1), v = 34 + (i * 29) % 26;
          const n = i % 3 ? el('circle', { r: 3.2, fill: COL[i % COL.length] }) : el('rect', { width: 6.5, height: 6.5, rx: 1.5, fill: COL[i % COL.length] });
          gFx.appendChild(n);
          effetto({ dur: 820, draw: u => {
            const e = liscia(u), x = bx + Math.cos(a) * v * e, y = by + Math.sin(a) * v * e + 22 * u * u;
            if (n.tagName === 'circle') { n.setAttribute('cx', x); n.setAttribute('cy', y); }
            else { n.setAttribute('x', x - 3.2); n.setAttribute('y', y - 3.2); n.setAttribute('transform', `rotate(${i * 40 + u * 260} ${x} ${y})`); }
            n.setAttribute('opacity', u < .6 ? 1 : 1 - (u - .6) / .4);
          }, fine: () => n.remove() });
        }
        if (bersaglio) effetto({ dur: 520, draw: u => { const s = 1 + .35 * Math.sin(u * Math.PI); bersaglio.setAttribute('transform', `translate(${bx} ${by}) scale(${s.toFixed(3)})`); } });
      }

      /* ================= la moltiplicazione ================= */
      function rimetti() {
        const l = L();
        fatto = false; colpito = false; prodotto = null;
        vuota(gTraccia); vuota(gOrme); disegnaTrovati();
        zOrma.setAttribute('opacity', 0);
        fiamma.setAttribute('opacity', 0);
        razzoSu(l.z, 'z');
        zPresa.setAttribute('opacity', libero ? 1 : 0);
        if (!vinto) { msg.textContent = ''; msg.className = 'lab-messaggio'; }
      }
      function moltiplica() {
        if (anim || vinto) return;
        if (fatto) rimetti();
        const l = L(), volte = l.volte || 1, mio = seq;
        anim = true; aggiornaComandi(); zPresa.setAttribute('opacity', 0);
        msg.textContent = ''; msg.className = 'lab-messaggio';
        /* l'impronta di z resta dove partiva il razzo */
        const zx = X(l.z[0]), zy = Y(l.z[1]);
        zOrmaLinea.setAttribute('x2', zx); zOrmaLinea.setAttribute('y2', zy);
        zOrmaPunto.setAttribute('cx', zx); zOrmaPunto.setAttribute('cy', zy);
        const za = argD(l.z) || 0;
        zOrmaNome.setAttribute('x', zx + 16 * Math.cos((za - 90) * RAD)); zOrmaNome.setAttribute('y', zy - 16 * Math.sin((za - 90) * RAD) + 5);
        zOrma.setAttribute('opacity', 1);
        let r = modulo(l.z), th = za, k = 0, pEsatto = l.z.slice();
        const nomeDopo = n => (libero ? 'z·w' + (n > 1 ? APICE[n] : '') : volte === 1 ? 'z·w' : n === 1 ? 'w' : 'w²');
        const fiammeggia = () => fiamma.setAttribute('transform', `scale(${(0.85 + Math.random() * .45).toFixed(2)} 1)`);
        fiamma.setAttribute('opacity', 1);
        posRazzo(r, th, '');

        function prossima() {
          if (mio !== seq) return;
          if (k >= volte) return arrivo(pEsatto);
          k++;
          pEsatto = per(pEsatto, w.p);
          const r0 = r, th0 = th;
          /* 1) gira dell'argomento di w */
          const gira = w.r > 1e-12 && w.th > .01 && r0 > 1e-12;
          const arco = el('path', { d: 'M' + CX + ' ' + CY, fill: 'none', stroke: C_W, 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-dasharray': k > 1 ? '7 5' : null }); gTraccia.appendChild(arco);
          const punta = el('circle', { cx: CX, cy: CY, r: 3.4, fill: C_W, opacity: 0 }); gTraccia.appendChild(punta);   /* nell'origine finché non serve: in (0, 0) allargherebbe la traccia fino all'angolo */
          const faseGiro = fine => {
            if (!gira) return fine();
            const rp = Math.min(r0 * U + (k - 1) * 9, Math.min(BX.x1 - CX, CX - BX.x0, BX.y1 - CY, CY - BX.y0) - 8);
            anima(Math.min(580, 260 + w.th * 1.25), u => {
              const e = morbida(u), a = th0 + w.th * e;
              posRazzo(r0, a); fiammeggia();
              arco.setAttribute('d', arcoD(rp, th0, a));
              punta.setAttribute('cx', CX + rp * Math.cos(a * RAD)); punta.setAttribute('cy', CY - rp * Math.sin(a * RAD)); punta.setAttribute('opacity', u < 1 ? 1 : 0);
            }, () => {
              /* la scritta dell'angolo va fuori dall'arco, o dentro se fuori c'è il punto w */
              const am = th0 + w.th / 2, ca = Math.cos(am * RAD), sa = Math.sin(am * RAD), wx = X(w.p[0]), wy = Y(w.p[1]);
              const cand = [rp + 15, Math.max(24, rp - 16)].map(rr => [CX + rr * ca, CY - rr * sa]);
              const lontano = c => Math.hypot(c[0] - wx, c[1] - wy);
              const c = lontano(cand[0]) > 34 || lontano(cand[0]) >= lontano(cand[1]) ? cand[0] : cand[1];
              rientra(scritta(gTraccia, c[0], c[1] + 4.5, '+' + gTesto(w.th), 'font: 700 13px var(--font)', 'middle', C_W));
              fine();
            });
          };
          /* 2) si allunga del modulo di w */
          const faseAllunga = fine => {
            const r1 = r0 * w.r, a = th0 + (gira ? w.th : 0);
            if (Math.abs(r1 - r0) < 1e-9) return fine(r1, a);
            const tratto = el('line', { stroke: C_W, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: .3 }); gTraccia.appendChild(tratto);
            const ca = Math.cos(a * RAD), sa = Math.sin(a * RAD), lim = rVis(a, 8);
            anima(Math.min(560, 300 + Math.abs(r1 - r0) * 90), u => {
              const rr = r0 + (r1 - r0) * liscia(u), p0 = Math.min(r0 * U, lim), p1 = Math.min(rr * U, lim);
              posRazzo(rr, a); fiammeggia();
              tratto.setAttribute('x1', CX + p0 * ca); tratto.setAttribute('y1', CY - p0 * sa);
              tratto.setAttribute('x2', CX + p1 * ca); tratto.setAttribute('y2', CY - p1 * sa);
            }, () => {
              const rm = Math.min((r0 + r1) / 2 * U, lim - 10);
              etichetta(gTraccia, CX + rm * ca, CY - rm * sa, a - 90, 15, '×' + testoR(w.r), C_W, 'font: 700 13px var(--font)');
              fine(r1, a);
            });
          };
          faseGiro(() => dopo(() => { if (mio === seq) faseAllunga((r1, a) => { r = r1; th = norm(a); posRazzo(r, th, nomeDopo(k)); dopo(prossima, 150); }); }, 130));
        }
        prossima();
      }

      function arrivo(p) {
        const l = L();
        anim = false; fatto = true; prodotto = p;
        fiamma.setAttribute('opacity', 0);
        if (libero) {   /* niente bersaglio e niente verdetto: si dice solo che cosa è successo */
          colpito = false;
          razzoSu(p, 'z·w' + (LIB.volte > 1 ? APICE[LIB.volte] : ''));
          osserva(p);
          aggiornaComandi(); formula(true);
          return;
        }
        colpito = vicini(p, l.t);
        razzoSu(p, colpito ? '' : (l.volte || 1) === 2 ? 'w²' : 'z·w');   /* sul bersaglio la scritta coprirebbe il centro */
        if (colpito) {
          if (l.sol === 2) {
            if (trovati.some(q => vicini(q, w.p))) {
              msg.innerHTML = 'Centrato, ma questa soluzione l\'avevi già trovata. Ne manca un\'altra.';
              msg.className = 'lab-messaggio no';
            } else {
              trovati.push(w.p.slice());
              vuota(gOrme); disegnaTrovati();
              if (trovati.length < 2) {
                impulso(X(w.p[0]), Y(w.p[1]), 'var(--ok)', 30); impulso(X(l.t[0]), Y(l.t[1]), 'var(--ok)', 34);
                msg.innerHTML = '<span class="vinto">Trovata: ' + ctx.tex('w_1 = ' + texC(w.p).t) + '. Ce n\'è un\'altra.</span>';
                msg.className = 'lab-messaggio ok';
              } else vittoria();
            }
          } else vittoria();
        } else sbaglio(p);
        aggiornaComandi(); formula(true);
      }

      function vittoria() {
        const l = L();
        vinto = true;
        ctx.completato(livello); aggiornaLivelli();
        const cosa = l.sol === 2 ? 'Trovate tutte e due: ' + trovati.map((q, i) => ctx.tex('w_' + (i + 1) + ' = ' + texC(q).t)).join(' e ') : 'Centrato: ' + ctx.tex('z \\cdot w = ' + l.tTex);
        msg.innerHTML = '<span class="vinto">' + cosa + '</span>';
        msg.className = 'lab-messaggio ok';
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        festa();
        const mio = seq;
        if (l.falso) dopo(() => {                      /* dove sarebbe finito chi pensa che ·i aggiunga i */
          if (mio !== seq) return;
          const x = X(l.falso.p[0]), y = Y(l.falso.p[1]), gr = el('g', { opacity: 0 }); gOrme.appendChild(gr);
          gr.appendChild(el('circle', { cx: x, cy: y, r: 11, fill: 'none', stroke: 'var(--no)', 'stroke-width': 2, 'stroke-dasharray': '3 3' }));
          gr.appendChild(el('path', { d: `M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10`, stroke: 'var(--no)', 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
          scritta(gr, x + 16, y + 5, l.falso.testo, 'font: 700 12.5px var(--font)', 'start', 'var(--no)');
          effetto({ dur: 400, draw: u => gr.setAttribute('opacity', u) });
        }, 700);
        ctx.zenone(l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
        aggiornaComandi(); formula(true);
      }

      /* errori tipici: cosa ha pensato chi ha scelto questo w */
      function diagnosi(p) {
        const l = L(), z = l.z, t = l.t, volte = l.volte || 1;
        if (w.r < 1e-12) return {};
        const somma = [z[0] + w.p[0], z[1] + w.p[1]];
        if (volte === 1 && vicini(somma, t)) return { fantasma: somma,
          zen: 'Sommando w a z saresti arrivato proprio sul bersaglio: la croce tratteggiata è z + w. Moltiplicare fa un\'altra cosa, gira il razzo dell\'angolo di w e lo allunga di |w|.' };
        if (volte === 2 && vicini(w.p, [-1, 0])) return { zen: '−1 fa mezzo giro, e qui si moltiplica due volte: due mezzi giri fanno un giro intero, e il razzo torna su 1.' };
        if (vicini(w.p, t)) return { zen: 'Hai messo w sul bersaglio. Ma w è il numero per cui moltiplichi, e il razzo parte da z: gira dell\'angolo di w e si allunga di |w|.' };
        const mz = modulo(z), mt = modulo(t), mp = modulo(p), ap = argD(p), at = argD(t), az = argD(z) || 0;
        if (volte === 1 && Math.abs(mt - mz) > 1e-6 && Math.abs(w.r - (mt - mz)) < 1e-6 && Math.abs(w.r - mt / mz) > 1e-6)
          return { zen: 'Hai preso w lungo ' + testoR(w.r) + ', la differenza fra ' + testoR(mt) + ' e ' + testoR(mz) + ', come se le lunghezze si sommassero. Nel prodotto si moltiplicano: il razzo è diventato lungo ' + testoR(mz) + ' · ' + testoR(w.r) + ' = ' + testoR(mp) + '.' };
        const angOk = mp > 1e-9 && dAng(ap, at) < .01, modOk = Math.abs(mp - mt) < 1e-6;
        if (angOk && !modOk) return { zen: volte === 1
          ? 'La direzione è giusta, la lunghezza no. Il razzo diventa lungo |z| · |w| = ' + testoR(mz) + ' · ' + testoR(w.r) + ' = ' + testoR(mp) + ', e il bersaglio dista ' + testoR(mt) + ' dall\'origine.'
          : 'La direzione è giusta, ma il razzo si è allungato due volte di ' + testoR(w.r) + ': |w| · |w| = ' + testoR(mp) + ', e −1 dista 1 dall\'origine.' };
        if (modOk && !angOk) {
          if (volte === 2) return { zen: 'Il razzo ha girato due volte di ' + gTesto(w.th) + ', cioè di ' + gTesto(2 * w.th) + ' in tutto. Il bersaglio −1 sta a 180°.' };
          if (az > .01 && dAng(w.th, at) < .01) return { zen: 'Hai dato a w l\'angolo del bersaglio, ' + gTesto(at) + '. Ma il razzo partiva già inclinato di ' + gTesto(az) + ', e l\'angolo di w si aggiunge a quello.' };
          if (dAng(-w.th, at - az) < .01) return { zen: 'L\'argomento di w è ' + gTesto(w.th) + ': il razzo ha girato di ' + gTesto(w.th) + ' in senso antiorario, cioè dalla parte opposta a quella che serviva. Gli angoli si contano sempre in senso antiorario.' };
          return { zen: 'La lunghezza è giusta, la direzione no. Il razzo parte da ' + gTesto(az) + ' e il bersaglio sta a ' + gTesto(at) + ': di quanto deve girare?' };
        }
        return {};
      }

      function sbaglio(p) {
        const l = L(), nome = (l.volte || 1) === 2 ? 'w^2' : 'z\\cdot w', pc = texC(p);
        const fuori = X(p[0]) < BX.x0 + 6 || X(p[0]) > BX.x1 - 6 || Y(p[1]) < BX.y0 + 6 || Y(p[1]) > BX.y1 - 6;
        const aBordo = X(p[0]) < BX.x0 + 18 || X(p[0]) > BX.x1 - 18 || Y(p[1]) < BX.y0 + 18 || Y(p[1]) > BX.y1 - 18;
        if (!aBordo) {   /* il cerchio rosso solo se ci sta tutto */
          const x = X(p[0]), y = Y(p[1]);
          gOrme.appendChild(el('circle', { cx: x, cy: y, r: 15, fill: 'none', stroke: 'var(--no)', 'stroke-width': 2.2, 'stroke-dasharray': '4 3' }));
          impulso(x, y, 'var(--no)', 28);
        }
        let testo = w.r < 1e-12 ? 'Con w = 0 il prodotto fa 0: il razzo si accartoccia nell\'origine.'
          : 'Il razzo è atterrato su ' + ctx.tex(nome + (pc.esatto ? ' = ' : ' \\approx ') + pc.t) + (fuori ? ', fuori dal campo' : '') + '. Il bersaglio è ' + ctx.tex(l.tTex) + '.';
        const d = diagnosi(p);
        if (d.fantasma) {
          const zx = X(l.z[0]), zy = Y(l.z[1]), fx = X(d.fantasma[0]), fy = Y(d.fantasma[1]);
          gOrme.appendChild(el('line', { x1: zx, y1: zy, x2: fx, y2: fy, stroke: C_W, 'stroke-width': 2.2, 'stroke-dasharray': '4 4', opacity: .85 }));
          gOrme.appendChild(el('path', { d: `M${fx - 6} ${fy - 6} l12 12 M${fx + 6} ${fy - 6} l-12 12`, stroke: C_W, 'stroke-width': 2.6, 'stroke-linecap': 'round' }));
          const mx = (zx + fx) / 2, my = (zy + fy) / 2, nl = Math.hypot(mx - CX, my - CY) || 1;
          scritta(gOrme, mx + (mx - CX) / nl * 17, my + (my - CY) / nl * 17 + 4.5, 'z + w', 'font: 700 13px var(--font)', 'middle', C_W);
        }
        msg.innerHTML = testo; msg.className = 'lab-messaggio no';
        carta.classList.remove('scuoti'); void carta.offsetWidth; carta.classList.add('scuoti');
        if (d.zen) ctx.zenone(d.zen, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
      }

      /* ================= dito, mouse, tastiera ================= */
      function aggancia(u, v) {
        if (L().agg === 'quadrato') {
          const a = Math.max(-LIM, Math.min(LIM, Math.round(u))), b = Math.max(-LIM, Math.min(LIM, Math.round(v)));
          return { p: [pulito(a), pulito(b)], r: Math.hypot(a, b), th: argD([a, b]) || 0 };
        }
        return polare(Math.round(Math.hypot(u, v) * 2) / 2, Math.round(Math.atan2(v, u) / RAD / 15) * 15);
      }
      function polare(r, th) {
        r = Math.max(0, Math.min(LIM, r)); th = norm(Math.round(th));
        if (r < 1e-9) return { p: [0, 0], r: 0, th: 0 };
        return { p: [pulito(+(r * Math.cos(th * RAD)).toFixed(12)), pulito(+(r * Math.sin(th * RAD)).toFixed(12))], r, th };
      }
      function scegli(nuovo) {
        if (anim || vinto) return;
        if (vicini(nuovo.p, w.p) && nuovo.r === w.r) return;
        w = nuovo;
        if (fatto) rimetti();
        aggiornaW(); formula();
      }
      function scegliZ(nuovo) {                       /* solo in modalità libera: z non può essere 0 */
        if (anim || !libero || nuovo.r < 1e-9) return;
        if (vicini(nuovo.p, LIB.z)) { if (fatto) rimetti(); return; }
        LIB.z = nuovo.p;
        rimetti(); formula();
      }
      /* dal dito al piano: con preserveAspectRatio e il viewBox che cambia forma
         si passa dalla matrice dello schermo, mai dal rettangolo dell'svg */
      function puntoDa(ev) {
        const m = svg.getScreenCTM();
        if (!m) return null;
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
        return [(p.x - CX) / U, (CY - p.y) / U];
      }
      function giu(ev) {
        if (anim || vinto) return;
        const q = puntoDa(ev); if (!q) return;
        let cosa = 'w';
        if (libero) {   /* vicino alla punta di z (più che a w) si prende il razzo */
          const dz = Math.hypot(q[0] - LIB.z[0], q[1] - LIB.z[1]) * U, dw = Math.hypot(q[0] - w.p[0], q[1] - w.p[1]) * U;
          if (dz < 26 && dz < dw) cosa = 'z';
        }
        trascino = cosa; svg.classList.add('presa');
        fermaLato(true);   /* mentre il dito trascina il pannello non cambia altezza: la scena non si ridimensiona sotto il dito */
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        if (cosa === 'z') scegliZ(aggancia(q[0], q[1])); else scegli(aggancia(q[0], q[1]));
        aggiornaW();
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!trascino) return;
        const q = puntoDa(ev);
        if (q) { const a = aggancia(q[0], q[1]); if (trascino === 'z') scegliZ(a); else scegli(a); }
        ev.preventDefault();
      }
      function molla() { if (!trascino) return; trascino = false; svg.classList.remove('presa'); fermaLato(false); aggiornaW(); }
      /* durante un trascinamento il pannello tiene l'altezza che ha: se crescesse (una riga in più nella formula,
         un messaggio più lungo) la scena si rimpicciolirebbe e il punto sotto il dito non sarebbe più quello */
      function fermaLato(si) {
        if (si) { lato.style.height = lato.offsetHeight + 'px'; lato.style.overflow = 'hidden'; }
        else { lato.style.height = ''; lato.style.overflow = ''; }
      }
      function tasto(ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { moltiplica(); ev.preventDefault(); return; }
        const quad = L().agg === 'quadrato';
        const d = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[ev.key];
        if (!d) return;
        ev.preventDefault();
        if (quad) scegli(aggancia(w.p[0] + d[0], w.p[1] + d[1]));
        else scegli(polare(w.r + d[1] * .5, w.th - d[0] * 15));   /* ← → girano, ↑ ↓ allungano */
      }
      svg.addEventListener('pointerdown', giu);
      svg.addEventListener('keydown', tasto);
      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);

      /* ================= livelli ================= */
      function aggiornaLivelli() {
        const fatti = ctx.stato().livelli, sblocco = fatti.length ? Math.max(...fatti) + 1 : 0;
        [...livelliEl.querySelectorAll('.lab-pallino')].forEach((p, k) => {
          p.classList.toggle('fatto', fatti.includes(k));
          p.classList.toggle('attivo', !libero && k === livello);
          p.disabled = k > sblocco && k !== livello;
          p.setAttribute('aria-current', !libero && k === livello ? 'step' : 'false');
        });
        bLibero.setAttribute('aria-pressed', libero);
      }
      function avviaLivello(n) {
        seq++; gen++; cancelAnimationFrame(rafAnim);
        libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        livello = n; vinto = false; anim = false; trovati = []; trascino = false;
        const l = L();
        w = aggancia(1, 0);
        disegnaGriglia(); disegnaBersaglio();
        rimetti(); aggiornaW();
        msg.textContent = ''; msg.className = 'lab-messaggio';
        objEl.innerHTML = '<div class="gs-lungo">' + ctx.md(l.testo) + '</div><div class="gs-breve">' + ctx.md(l.breve || l.testo) + '</div>';
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        aggiornaLivelli(); aggiornaComandi(); formula(true);
        /* entrata: il razzo esce dalla rampa, il bersaglio si posa */
        const mz = modulo(l.z), az = argD(l.z) || 0, bx = X(l.t[0]), by = Y(l.t[1]);
        anima(460, u => {
          posRazzo(mz * liscia(u), az, u > .6 ? 'z' : '');
          const s = u < 1 ? .4 + .6 * liscia(u) + .12 * Math.sin(u * Math.PI) : 1;
          if (bersaglio) { bersaglio.setAttribute('transform', `translate(${bx} ${by}) scale(${s.toFixed(3)})`); bersaglio.setAttribute('opacity', Math.min(1, u * 2)); }
        });
      }

      bMolt.addEventListener('click', moltiplica);
      bRic.addEventListener('click', () => { if (anim) return; avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello); });
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        aiutoTesto.innerHTML = libero ? ctx.md(AIUTO_LIBERO) : ctx.md(L().testo) + ctx.md(L().aiuto);
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });

      /* ================= modalità libera: z e w li sceglie lo studente, e nessuno giudica ================= */
      const N_MAX = 6;
      const AIUTO_LIBERO = 'In modalità libera non c\'è nessun bersaglio. Trascina il punto blu per scegliere $w$, e la punta del razzo per scegliere $z$. Con − e + decidi quante volte moltiplicare per $w$: il razzo arriva su $z \\cdot w^n$.\n\nOgni moltiplicazione **gira** il razzo dell\'argomento di $w$ e lo **allunga** di $|w|$: quindi $|z \\cdot w^n| = |z| \\cdot |w|^n$, e l\'angolo diventa $\\theta_z + n\\,\\theta_w$.\n\n«Griglia a cerchi» fa agganciare i punti a cerchi ogni $0{,}5$ e a raggi ogni $15^\\circ$. «Casuale» propone due numeri a caso.';
      function aggiornaParametri() {
        const box = parametriEl.querySelector('.lab-param'), [meno, piu] = box.querySelectorAll('button');
        box.querySelector('output').textContent = String(LIB.volte);
        meno.disabled = anim || LIB.volte <= 1; piu.disabled = anim || LIB.volte >= N_MAX;
        bGriglia.textContent = LIB.agg === 'polare' ? 'Griglia quadrata' : 'Griglia a cerchi';
      }
      function osserva(p) {                           /* osservazioni neutre, mai valutazioni */
        const n = LIB.volte;
        if (w.r < 1e-12) { msg.textContent = 'Con w = 0 il prodotto fa 0: il razzo si accartoccia nell\'origine.'; msg.className = 'lab-messaggio'; return; }
        const giro = n * w.th, lung = Math.pow(w.r, n);
        const g = w.th < .01 ? 'non ha girato' : 'ha girato di ' + gTesto(giro) + (n > 1 ? ' (' + n + ' volte ' + gTesto(w.th) + ')' : '');
        const esatto = !!riconosci(lung), per = (esatto ? '' : 'circa ') + testoR(lung);
        const a = Math.abs(lung - 1) < 1e-9 ? 'la lunghezza è rimasta quella' : lung > 1 ? 'si è allungato ' + per + ' volte' : 'si è accorciato: la lunghezza è per ' + per;
        const fuori = X(p[0]) < BX.x0 + 6 || X(p[0]) > BX.x1 - 6 || Y(p[1]) < BX.y0 + 6 || Y(p[1]) > BX.y1 - 6;
        msg.textContent = 'Il razzo ' + g + ' e ' + a + '.' + (fuori ? ' È uscito dal campo.' : '');
        msg.className = 'lab-messaggio';
      }
      function mostraLibero() {
        parametriEl.hidden = !libero; objEl.hidden = libero; bCasuale.hidden = !libero; bRic.hidden = libero;
        radice.classList.toggle('in-libero', libero);
      }
      function entraLibero() {
        if (anim) return;
        salvato = { livello, w, trovati: trovati.map(q => q.slice()), vinto, fatto, prodotto, colpito,
          msg: msg.innerHTML, cls: msg.className, ric: bRic.textContent, ricPrim: bRic.classList.contains('primario') };
        seq++; gen++;
        const l = LIVELLI[livello];
        libero = true; mostraLibero(); aiutoEl.hidden = true;
        vinto = false; trovati = [];
        LIB.z = l.z.slice(); LIB.agg = l.agg; LIB.volte = l.volte || 1;
        w = aggancia(w.p[0], w.p[1]);
        disegnaGriglia(); disegnaBersaglio(); rimetti(); aggiornaW();
        msg.textContent = ''; msg.className = 'lab-messaggio'; bRic.classList.remove('primario');
        aggiornaLivelli(); aggiornaComandi(); formula(true);
      }
      function esciLibero() {                          /* si torna al livello com'era */
        if (anim) return;
        const z = salvato; libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        seq++; gen++;
        livello = z.livello; w = z.w; trovati = z.trovati; vinto = z.vinto;
        disegnaGriglia(); disegnaBersaglio(); rimetti(); aggiornaW();
        if (z.fatto && z.prodotto) {
          fatto = true; prodotto = z.prodotto; colpito = z.colpito;
          razzoSu(prodotto, colpito ? '' : (L().volte || 1) === 2 ? 'w²' : 'z·w');
        }
        msg.innerHTML = z.msg; msg.className = z.cls;
        bRic.textContent = z.ric; bRic.classList.toggle('primario', z.ricPrim);
        aggiornaLivelli(); aggiornaComandi(); formula(true);
      }
      function casuale() {
        if (anim || !libero) return;
        const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
        for (let giri = 0; giri < 300; giri++) {
          const polare_ = LIB.agg === 'polare';
          const z = polare_ ? polare(r(2, 6) / 2, r(0, 23) * 15) : aggancia(r(-3, 3), r(-3, 3));
          const ww = polare_ ? polare(r(1, 4) / 2, r(0, 23) * 15) : aggancia(r(-2, 2), r(-2, 2));
          const n = r(1, 3), fin = z.r * Math.pow(ww.r, n);
          if (z.r < 1e-9 || ww.r < 1e-9 || vicini(ww.p, [1, 0]) || fin > 4.3 || fin < .45) continue;
          if (vicini(z.p, LIB.z) && vicini(ww.p, w.p) && n === LIB.volte) continue;
          LIB.z = z.p; LIB.volte = n; w = ww; break;
        }
        rimetti(); aggiornaW(); aggiornaComandi(); formula(true);
      }
      bLibero.addEventListener('click', () => { if (anim) return; if (libero) esciLibero(); else entraLibero(); });
      bCasuale.addEventListener('click', casuale);
      bGriglia.addEventListener('click', () => {
        if (anim || !libero) return;
        LIB.agg = LIB.agg === 'polare' ? 'quadrato' : 'polare';
        const z = aggancia(LIB.z[0], LIB.z[1]); if (z.r > 1e-9) LIB.z = z.p;
        w = aggancia(w.p[0], w.p[1]);
        disegnaGriglia(); rimetti(); aggiornaW(); aggiornaComandi(); formula(true);
      });
      parametriEl.addEventListener('click', ev => {
        const b = ev.target.closest('button[data-d]'); if (!b || !libero || anim) return;
        LIB.volte = Math.max(1, Math.min(N_MAX, LIB.volte + +b.dataset.d));
        rimetti(); aggiornaComandi(); formula(true);
      });
      LIVELLI.forEach((_, i) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (i + 1)); p.innerHTML = '<span>' + (i + 1) + '</span>';
        p.addEventListener('click', () => { if (anim) return; if (libero || i !== livello || vinto) avviaLivello(i); });
        livelliEl.insertBefore(p, bLibero);
      });

      /* ================= la forma dello spazio decide il viewBox =================
         Il quadrato del piano resta intero e al centro; il prato si allunga dalla parte che avanza. */
      let forma = '';
      function adatta() {
        radiciCorte();
        const r = svg.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        const rapp = r.width / r.height;
        let vw = W, vh = H;
        if (rapp >= 1) vw = Math.min(1400, Math.ceil(H * rapp / 2) * 2); else vh = Math.min(1400, Math.ceil(W / rapp / 2) * 2);
        const chiave = vw + 'x' + vh;
        if (chiave === forma) return;
        forma = chiave;
        BX.x0 = CX - vw / 2; BX.x1 = CX + vw / 2; BX.y0 = CY - vh / 2; BX.y1 = CY + vh / 2;
        svg.setAttribute('viewBox', BX.x0 + ' ' + BX.y0 + ' ' + vw + ' ' + vh);
        disegnaPrato(); disegnaGriglia();
        if (!anim) { disegnaBersaglio(); aggiornaW(); razzoSu(fatto && prodotto ? prodotto : L().z, null); }
      }

      disegnaPrato();
      avviaLivello(livello);
      adatta();
      const ro = new ResizeObserver(adatta); ro.observe(radice); ro.observe(svg);

      return function smonta() {
        vivo = false; seq++; gen++;
        ro.disconnect(); osservaTex.disconnect();
        cancelAnimationFrame(rafAnim); cancelAnimationFrame(rafFx);
        timers.forEach(clearTimeout); effetti = [];
        window.removeEventListener('pointermove', muovi, { passive: false });
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
