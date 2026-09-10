/* Laboratorio «Il canestro» — la parabola y = a(x − h)² + k come traiettoria di un tiro.
   Il vertice V = (h; k) si trascina (passo 0,5), l'apertura a si regola col cursore (−2 … −0,1).
   Il tiro vale solo se la parabola passa per la mano L = (1; 2) e per l'anello.
   Contratto e regole: SCHEMA-LAB.md — modello di stile: laboratori/bilancia.js */
(function () {
  const STILE = `
    .lab-canestro .lab-scena { background: linear-gradient(180deg, var(--sup2), var(--sup)); overflow: hidden; }
    .lab-canestro .lab-scena svg { max-width: 620px; margin: 0 auto; }
    .lab-canestro .obiettivo { padding: 8px 14px 0; font-size: .95rem; color: var(--testo); }
    .lab-canestro .obiettivo b { color: var(--accento-testo); }
    .lab-canestro .eq { display: flex; flex-direction: column; gap: 2px; padding: 8px 14px 2px; }
    .lab-canestro .eq-riga { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
    .lab-canestro .eq-et { font-size: .68rem; letter-spacing: .04em; text-transform: uppercase; color: var(--testo2); min-width: 8.4em; }
    .lab-canestro .eq-tex { font-size: 1.12rem; }
    .lab-canestro .cursore { display: inline-flex; align-items: center; gap: 6px; font-size: .82rem; color: var(--testo2); }
    .lab-canestro .cursore input[type=range] { width: 108px; accent-color: var(--accento); min-height: 30px; }
    .lab-canestro .cursore.spento { opacity: .38; }
    .lab-canestro .cursore .val { font-variant-numeric: tabular-nums; font-weight: 700; color: var(--testo); min-width: 3.6em; }
    .lab-canestro .lab-barra .btn[disabled] { opacity: .38; cursor: default; }
    .lab-canestro .maniglia { cursor: grab; }
    .lab-canestro .maniglia.presa { cursor: grabbing; }
    .lab-canestro .rete.gonfia { animation: lab-canestro-rete .55s ease-out; transform-box: fill-box; transform-origin: 50% 0; }
    @keyframes lab-canestro-rete { 0% { transform: none } 35% { transform: scaleY(1.45) } 70% { transform: scaleY(.9) } 100% { transform: none } }
    .lab-canestro .vinto { display: inline-block; animation: lab-canestro-pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-canestro-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
  `;

  /* ---------------- livelli ----------------
     Ogni soluzione è stata verificata sulla griglia: h e k multipli di 0,5, a multiplo di 0,05,
     con la tolleranza di 0,15 su mano e anello. Fra parentesi la (o le) soluzioni possibili. */
  const LIVELLI = [
    { canestri: [[7, 2]], a: -0.5, aFissa: true,
      testo: 'Il canestro è a <b>(7; 2)</b> e l\'apertura è già decisa: sposta solo il <b>vertice</b>.' },            /* V(4; 6,5) */
    { canestri: [[8, 2]], a: -0.25, aFissa: true,
      testo: 'Canestro più lontano, <b>(8; 2)</b>, apertura ancora bloccata: dove va il vertice?' },                  /* V(4,5; 5) */
    { canestri: [[6, 4]],
      testo: 'Canestro alto, <b>(6; 4)</b>. Adesso l\'apertura la scegli tu: di soluzioni ce n\'è più d\'una.' },      /* 3 soluzioni */
    { canestri: [[9, 2]], vertice: [5, 6], vFissa: true,
      testo: 'Il vertice è inchiodato in <b>(5; 6)</b>: resta solo <b>a</b> da trovare.' },                            /* a = −0,25 */
    { canestri: [[8, 2]], difensore: { x: 4, h: 5 },
      testo: 'Un difensore in <b>x = 4</b> arriva a <b>5 m</b>: passaci sopra e fai canestro in (8; 2).' },            /* a −0,4 / −0,45 */
    { canestri: [[9, 2]], difensore: { x: 5, h: 6 },
      testo: 'Difensore più alto (<b>6 m</b> in x = 5) e canestro più lontano, <b>(9; 2)</b>.' },                      /* V(5; 7,5), a −0,35 */
    { formula: { h: 3, k: 6, a: -1 }, canestri: [[5, 2]], canestriNascosti: true,
      testo: 'Nessun canestro in vista: riproduci la parabola scritta qui sotto, poi tira e si vedrà dov\'è.' },
    { canestri: [[9, 2]], soffitto: 5,
      testo: 'Palestra bassa: il <b>soffitto è a 5 m</b>. Il tiro non deve toccarlo e deve arrivare in (9; 2).' },      /* a −0,1 / −0,15 */
    { canestri: [[6, 4], [8, 2]],
      testo: 'Due anelli in fila, <b>(6; 4)</b> e <b>(8; 2)</b>: la palla deve passare per tutti e due.' },            /* V(4,5; 4,5), a −0,2 */
    { casuale: true,
      testo: 'Tiro libero: il canestro cambia ogni volta. Vertice e apertura sono tutti tuoi.' }
  ];

  /* canestri estratti al livello 10: tutti raggiungibili con la griglia (verificato) */
  const CASUALI = [[5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [4, 3], [5, 3], [4, 4], [6, 4], [8, 4]];

  const TOL = 0.15;              /* quanto può sbagliare la parabola su mano e anello */
  const LX = 1, LY = 2;          /* la mano del giocatore */
  const H_MIN = 1.5, H_MAX = 9, K_MIN = 1, K_MAX = 8;
  const A_MIN = -2, A_MAX = -0.1, A_PASSO = 0.05;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const morsa = (v, a, b) => Math.max(a, Math.min(b, v));
  const mezzo = v => Math.round(v * 2) / 2;

  /* piano cartesiano: x 0…10, y 0…8 dentro un viewBox 500×400 (rapporto 5/4) */
  const SX = x => 45 + 40 * x, SY = y => 355 - 40 * y;

  /* ---------------- numeri e formule ---------------- */
  const virgola = v => String(Math.round(v * 100) / 100).replace('.', '{,}');
  const virgolaTesto = v => String(Math.round(v * 100) / 100).replace('.', ',');
  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  /* un termine "± coefficiente·simbolo" in LaTeX; num/den è il coefficiente */
  function termine(num, den, simbolo, primo) {
    if (num === 0) return '';
    const seg = num < 0 ? -1 : 1;
    let n = Math.abs(num), d = den, g = mcd(n, d);
    n /= g; d /= g;
    const uno = (n === 1 && d === 1 && simbolo);
    const corpo = uno ? '' : (d === 1 ? String(n) : '\\frac{' + n + '}{' + d + '}');
    const s = primo ? (seg < 0 ? '-' : '') : (seg < 0 ? ' - ' : ' + ');
    return s + corpo + simbolo;
  }
  /* forma con il vertice: y = a(x − h)² + k   —  a = n/20, h = m/2, k = j/2 */
  function texVertice(a, h, k) {
    const n = Math.round(a * 20), j = Math.round(k * 2);
    const dentro = '(x - ' + virgola(h) + ')^2';
    let s = termine(n, 20, dentro, true) + termine(j, 2, '', false);
    return 'y = ' + (s || '0');
  }
  /* forma normale: y = ax² + bx + c, con b = −2ah e c = ah² + k (esatti sulla griglia) */
  function texNormale(a, h, k) {
    const n = Math.round(a * 20), m = Math.round(h * 2), j = Math.round(k * 2);
    let s = termine(n, 20, 'x^2', true) + termine(-n * m, 20, 'x', false) + termine(n * m * m + 40 * j, 80, '', false);
    return 'y = ' + (s || '0');
  }

  COMPASSO.registraLab({
    id: 'canestro',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-canestro')) { const s = document.createElement('style'); s.id = 'stile-lab-canestro'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-canestro');
      radice.innerHTML = `
        <div class="lab-scena"></div>
        <div class="obiettivo"></div>
        <div class="eq">
          <div class="eq-riga"><span class="eq-et">forma con il vertice</span><span class="eq-tex eq-v"></span></div>
          <div class="eq-riga"><span class="eq-et">forma normale</span><span class="eq-tex eq-n"></span></div>
        </div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn primario b-tira">Tira</button>
          <label class="cursore" title="Apertura della parabola">a
            <input type="range" class="s-a" min="${A_MIN}" max="${A_MAX}" step="${A_PASSO}" aria-label="apertura a">
            <span class="val"></span></label>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <button type="button" class="btn piccolo b-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const objEl = radice.querySelector('.obiettivo'), eqV = radice.querySelector('.eq-v'), eqN = radice.querySelector('.eq-n');
      const msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const bTira = radice.querySelector('.b-tira'), bRic = radice.querySelector('.b-ric'), bAiuto = radice.querySelector('.b-aiuto');
      const cursore = radice.querySelector('.cursore'), slider = radice.querySelector('.s-a'), valA = radice.querySelector('.val');

      /* ---------------- scena SVG ---------------- */
      const svg = el('svg', { viewBox: '0 0 500 400', role: 'img', 'aria-label': 'Campo da basket con la traiettoria della palla' });
      scena.appendChild(svg);
      const defs = el('defs');
      const clip = el('clipPath', { id: 'lab-canestro-clip' });
      clip.appendChild(el('rect', { x: 18, y: 18, width: 470, height: 339 }));
      defs.appendChild(clip); svg.appendChild(defs);

      /* fondo: pavimento, griglia, assi */
      const gFondo = el('g'); svg.appendChild(gFondo);
      gFondo.appendChild(el('rect', { x: 0, y: 356, width: 500, height: 44, fill: '#b5813f', opacity: .38 }));
      for (let i = 0; i <= 10; i++) gFondo.appendChild(el('line', { x1: SX(i), y1: SY(0), x2: SX(i), y2: SY(8), stroke: 'var(--bordo)', 'stroke-width': 1 }));
      for (let i = 0; i <= 8; i++) gFondo.appendChild(el('line', { x1: SX(0), y1: SY(i), x2: SX(10), y2: SY(i), stroke: 'var(--bordo)', 'stroke-width': 1 }));
      gFondo.appendChild(el('line', { x1: 20, y1: SY(0), x2: 480, y2: SY(0), stroke: 'var(--testo)', 'stroke-width': 2.5, opacity: .75 }));
      gFondo.appendChild(el('line', { x1: SX(0), y1: SY(0) + 6, x2: SX(0), y2: 24, stroke: 'var(--testo)', 'stroke-width': 2, opacity: .5 }));
      for (let i = 2; i <= 10; i += 2) gFondo.appendChild(el('text', { x: SX(i), y: SY(0) + 20, 'text-anchor': 'middle', fill: 'var(--testo2)', style: 'font: 15px var(--font)' }, String(i)));
      for (let i = 2; i <= 8; i += 2) gFondo.appendChild(el('text', { x: SX(0) - 8, y: SY(i) + 5, 'text-anchor': 'end', fill: 'var(--testo2)', style: 'font: 15px var(--font)' }, String(i)));
      gFondo.appendChild(el('text', { x: 480, y: SY(0) + 20, 'text-anchor': 'end', fill: 'var(--testo2)', style: 'font: 13px var(--font)', opacity: .8 }, 'metri'));

      const gCampo = el('g'); svg.appendChild(gCampo);          /* canestri, difensore, soffitto: cambia col livello */
      const gCurva = el('g', { 'clip-path': 'url(#lab-canestro-clip)' }); svg.appendChild(gCurva);
      const curva = el('path', { fill: 'none', 'stroke-linecap': 'round' }); gCurva.appendChild(curva);
      const asse = el('line', { stroke: 'var(--accento)', 'stroke-width': 1.5, 'stroke-dasharray': '4 5', opacity: .4 }); gCurva.appendChild(asse);
      const gMano = el('g'); svg.appendChild(gMano);            /* giocatore */
      const gManiglia = el('g', { class: 'maniglia' }); svg.appendChild(gManiglia);
      const gPalla = el('g'); svg.appendChild(gPalla);

      /* giocatore stilizzato: piedi a terra, mano in L = (1; 2) */
      (function giocatore() {
        const c = 'var(--testo)', w = 4;
        const p = (x1, y1, x2, y2) => gMano.appendChild(el('line', { x1: SX(x1), y1: SY(y1), x2: SX(x2), y2: SY(y2), stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', opacity: .82 }));
        p(0.5, 0, 0.72, 0.72); p(0.94, 0, 0.72, 0.72);          /* gambe */
        p(0.72, 0.72, 0.72, 1.34);                              /* busto */
        p(0.72, 1.28, 0.5, 0.95);                               /* braccio libero */
        p(0.72, 1.3, 0.96, 1.8);                                /* braccio del tiro */
        gMano.appendChild(el('circle', { cx: SX(0.72), cy: SY(1.52), r: 7.5, fill: c, opacity: .82 }));
        gMano.appendChild(el('circle', { cx: SX(LX), cy: SY(LY), r: 3.5, fill: 'var(--accento)' }));
        gMano.appendChild(el('text', { x: SX(LX) + 12, y: SY(LY) - 8, fill: 'var(--testo2)', style: 'font: 600 14px var(--font)' }, 'mano (1; 2)'));
      })();

      /* ---------------- stato ---------------- */
      let livello = 0, h = 2.5, k = 3, a = -0.6, canestri = [], animando = false, trascino = false, offX = 0, offY = 0, raf = 0, vinto = false;
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;

      const yy = x => a * (x - h) * (x - h) + k;
      const liv = () => LIVELLI[livello];
      const manoOk = () => Math.abs(yy(LX) - LY) < TOL;

      /*__CONTINUA__*/

      return function smonta() {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
