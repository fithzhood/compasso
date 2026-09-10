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
  /* forma con il vertice: y = a(x − h)² + k   —  a in frazione, h e k come coordinate */
  function texVertice(a, h, k) {
    const n = Math.round(a * 20);
    const dentro = '(x - ' + virgola(h) + ')^2';
    const coda = k === 0 ? '' : (k > 0 ? ' + ' : ' - ') + virgola(Math.abs(k));
    return 'y = ' + (termine(n, 20, dentro, true) + coda || '0');
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
        p(0.72, 1.3, 0.98, 1.82);                               /* braccio del tiro */
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

      /* frase di Zenone quando il livello è vinto */
      const VITTORIE = [
        'Mano e canestro stanno alla stessa quota, e la parabola è simmetrica: il vertice non poteva che stare a metà, in x = 4.',
        'Di nuovo alla stessa quota: il vertice sta a metà fra 1 e 8, cioè in 4,5. La quota k l\'ha decisa il passaggio per la mano.',
        'Con a libero le soluzioni sono più d\'una: campana stretta e alta oppure larga e bassa, purché tocchi i due punti.',
        'Vertice inchiodato, un solo numero da cercare: a. Cambiando a la campana si stringe o si allarga, ma il punto più alto resta lì.',
        'Per scavalcare il difensore serve una campana più alta: il vertice sale, e a cresce in valore assoluto.',
        'Il difensore stava proprio sotto il vertice: lì la parabola è al massimo, e il massimo vale k.',
        'La formula era già il disegno: dentro la parentesi c\'è h col segno cambiato, dopo il + c\'è k, e davanti a dice l\'apertura.',
        'Il soffitto è un tetto su k. Se il vertice non può salire, per arrivare lontano la parabola deve allargarsi: a vicino a zero.',
        'Tre punti: la mano e i due anelli. Di parabole per tre punti ne passa una sola, quindi non restava nessuna libertà.',
        'Ancora uno. Con la mano fissa in (1; 2), scelto il vertice l\'apertura è già decisa, e viceversa.'
      ];
      const AIUTO = 'Il vertice V è il punto più alto del tiro: trascinalo. Il numero a dice quanto è stretta la campana: vicino a −2 è stretta e la palla ricade subito, vicino a −0,1 è larga e la palla va lontano. Nella scrittura y = a(x − h)² + k il vertice si legge dentro la parentesi, col segno cambiato, e subito dopo il +. La palla parte dal punto della parabola che sta sopra la mano: se lì la curva non passa per (1; 2), il tiro non vale.';

      let reti = [], rivelato = false;

      /* ---------------- disegno ---------------- */
      function disegnaCampo() {
        vuota(gCampo); reti = [];
        const L = liv();
        if (L.soffitto) {
          gCampo.appendChild(el('rect', { x: 20, y: 18, width: 460, height: Math.max(0, SY(L.soffitto) - 18), fill: 'var(--no)', opacity: .08 }));
          gCampo.appendChild(el('line', { x1: 20, y1: SY(L.soffitto), x2: 480, y2: SY(L.soffitto), stroke: 'var(--no)', 'stroke-width': 3, opacity: .7 }));
          gCampo.appendChild(el('text', { x: 26, y: SY(L.soffitto) - 8, fill: 'var(--no)', style: 'font: 600 14px var(--font)' }, 'soffitto ' + L.soffitto + ' m'));
        }
        if (L.difensore) {
          const d = L.difensore, c = 'var(--s4)';
          gCampo.appendChild(el('line', { x1: SX(d.x), y1: SY(0), x2: SX(d.x), y2: SY(d.h - 1.05), stroke: c, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: .8 }));
          gCampo.appendChild(el('circle', { cx: SX(d.x), cy: SY(d.h - 0.78), r: 8, fill: c, opacity: .8 }));
          gCampo.appendChild(el('line', { x1: SX(d.x), y1: SY(d.h - 1.05), x2: SX(d.x - 0.24), y2: SY(d.h), stroke: c, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: .8 }));
          gCampo.appendChild(el('line', { x1: SX(d.x), y1: SY(d.h - 1.05), x2: SX(d.x + 0.24), y2: SY(d.h), stroke: c, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: .8 }));
          gCampo.appendChild(el('line', { x1: SX(d.x - 0.75), y1: SY(d.h), x2: SX(d.x + 0.75), y2: SY(d.h), stroke: 'var(--no)', 'stroke-width': 2, 'stroke-dasharray': '5 4', opacity: .75 }));
          gCampo.appendChild(el('text', { x: SX(d.x), y: SY(d.h) - 9, 'text-anchor': 'middle', fill: 'var(--no)', style: 'font: 600 14px var(--font)' }, d.h + ' m'));
        }
        if (L.canestriNascosti && !rivelato) return;
        canestri.forEach(c => {
          const p = c[0], q = c[1], xb = p + 0.45;
          gCampo.appendChild(el('line', { x1: SX(xb) + 3, y1: SY(0), x2: SX(xb) + 3, y2: SY(q + 1.2), stroke: 'var(--testo2)', 'stroke-width': 4, opacity: .5 }));
          gCampo.appendChild(el('rect', { x: SX(xb), y: SY(q + 1.2), width: 7, height: 52, rx: 2, fill: 'var(--testo2)', opacity: .5 }));
          const rete = el('g', { class: 'rete' });
          for (let i = 0; i <= 4; i++) rete.appendChild(el('line', { x1: SX(p - 0.32 + i * 0.16), y1: SY(q), x2: SX(p - 0.17 + i * 0.085), y2: SY(q - 0.52), stroke: 'var(--testo2)', 'stroke-width': 1.4, opacity: .8 }));
          rete.appendChild(el('line', { x1: SX(p - 0.25), y1: SY(q - 0.26), x2: SX(p + 0.25), y2: SY(q - 0.26), stroke: 'var(--testo2)', 'stroke-width': 1.2, opacity: .6 }));
          gCampo.appendChild(rete); reti.push(rete);
          gCampo.appendChild(el('line', { x1: SX(p - 0.34), y1: SY(q), x2: SX(p + 0.34), y2: SY(q), stroke: '#e2622f', 'stroke-width': 5, 'stroke-linecap': 'round' }));
          gCampo.appendChild(el('text', { x: SX(p), y: SY(q - 0.6) + 15, 'text-anchor': 'middle', fill: 'var(--testo2)', style: 'font: 600 14px var(--font)' }, '(' + p + '; ' + q + ')'));
        });
      }

      function disegnaCurva() {
        const r = Math.sqrt((k + 1) / -a);
        const x0 = Math.max(0, h - r), x1 = Math.min(10.4, h + r);
        let d = '';
        if (x1 > x0) {
          const passi = 72;
          for (let i = 0; i <= passi; i++) {
            const x = x0 + (x1 - x0) * i / passi;
            d += (i ? 'L' : 'M') + SX(x).toFixed(1) + ' ' + SY(yy(x)).toFixed(1) + ' ';
          }
        }
        const ok = manoOk();
        curva.setAttribute('d', d || 'M0 0');
        curva.setAttribute('stroke', ok ? 'var(--accento)' : 'var(--testo2)');
        curva.setAttribute('stroke-width', ok ? 3.5 : 2.5);
        curva.setAttribute('opacity', ok ? 1 : .55);
        curva.setAttribute('stroke-dasharray', ok ? 'none' : '7 6');
        asse.setAttribute('x1', SX(h)); asse.setAttribute('x2', SX(h));
        asse.setAttribute('y1', SY(k)); asse.setAttribute('y2', SY(0));
      }

      function disegnaManiglia() {
        vuota(gManiglia);
        const fisso = !!liv().vFissa, cx = SX(h), cy = SY(k);
        gManiglia.appendChild(el('circle', { cx, cy, r: 11, fill: fisso ? 'var(--testo2)' : 'var(--accento)', stroke: 'var(--sup)', 'stroke-width': 3 }));
        if (!fisso) gManiglia.appendChild(el('path', { d: `M${cx - 5} ${cy} h10 M${cx} ${cy - 5} v10`, stroke: 'var(--sup)', 'stroke-width': 2, 'stroke-linecap': 'round' }));
        const sopra = k < 7.2;
        gManiglia.appendChild(el('text', { x: cx, y: sopra ? cy - 19 : cy + 32, 'text-anchor': 'middle', fill: 'var(--testo)', style: 'font: 700 15px var(--font)' },
          (fisso ? 'V fisso (' : 'V (') + virgolaTesto(h) + '; ' + virgolaTesto(k) + ')'));
      }

      function disegnaPalla(x, y) {
        vuota(gPalla);
        const cx = SX(x), cy = SY(Math.max(y, 0.18));
        gPalla.appendChild(el('circle', { cx, cy, r: 9, fill: '#e2622f', stroke: '#8c3a12', 'stroke-width': 1.5 }));
        gPalla.appendChild(el('path', { d: `M${cx - 9} ${cy} h18 M${cx} ${cy - 9} v18`, stroke: '#8c3a12', 'stroke-width': 1.1, fill: 'none', opacity: .8 }));
      }

      function aggiornaEq() {
        eqV.innerHTML = ctx.tex(texVertice(a, h, k));
        eqN.innerHTML = ctx.tex(texNormale(a, h, k));
        valA.textContent = virgolaTesto(a);
      }

      function ridisegna() {
        disegnaCurva(); disegnaManiglia(); disegnaPalla(LX, yy(LX)); aggiornaEq();
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length;
      }

      /* ---------------- livelli ---------------- */
      function avviaLivello(n) {
        cancelAnimationFrame(raf);
        livello = n; vinto = false; animando = false; trascino = false; rivelato = false;
        const L = LIVELLI[n];
        if (L.casuale) {
          let c, giri = 0;
          do { c = CASUALI[Math.floor(Math.random() * CASUALI.length)]; giri++; }
          while (giri < 12 && canestri.length && c[0] === canestri[0][0] && c[1] === canestri[0][1]);
          canestri = [c.slice()];
        } else canestri = L.canestri.map(c => c.slice());
        h = L.vertice ? L.vertice[0] : 2.5;
        k = L.vertice ? L.vertice[1] : 3;
        a = L.aFissa ? L.a : -0.6;
        slider.value = String(a);
        slider.disabled = !!L.aFissa;
        cursore.classList.toggle('spento', !!L.aFissa);
        objEl.innerHTML = L.testo + (L.formula ? '<br>Da riprodurre: ' + ctx.tex(texVertice(L.formula.a, L.formula.h, L.formula.k)) : '');
        msg.textContent = ''; msg.className = 'lab-messaggio';
        bRic.textContent = 'Ricomincia'; bRic.disabled = false; bTira.disabled = false;
        disegnaCampo(); ridisegna();
      }

      /* ---------------- il tiro ---------------- */
      function pianoTiro() {
        const L = liv();
        const formulaOk = !L.formula || (h === L.formula.h && k === L.formula.k && Math.abs(a - L.formula.a) < 1e-9);
        const attivi = (L.canestriNascosti && !formulaOk) ? [] : canestri;
        const presi = attivi.map(c => Math.abs(yy(c[0]) - c[1]) < TOL);
        const p = { esito: 'fuori', xFine: 10.3, presi, attivi, formulaOk, mano: manoOk(), mancato: -1, valutati: 0 };
        let difFatto = false;
        for (let x = LX; x <= 10.301; x += 0.02) {
          const y = yy(x);
          if (L.soffitto && y >= L.soffitto) { p.esito = 'soffitto'; p.xFine = x; return p; }
          if (L.difensore && !difFatto && x >= L.difensore.x) {
            difFatto = true;
            if (yy(L.difensore.x) <= L.difensore.h) { p.esito = 'bloccato'; p.xFine = L.difensore.x; return p; }
          }
          while (p.valutati < attivi.length && x >= attivi[p.valutati][0]) {
            if (!presi[p.valutati] && p.mancato < 0) p.mancato = p.valutati;
            p.valutati++;
            if (p.valutati === attivi.length && p.mancato < 0) { p.esito = 'canestro'; p.xFine = attivi[attivi.length - 1][0]; return p; }
          }
          if (y <= 0 && x > LX + 0.15) { p.esito = 'terra'; p.xFine = x; return p; }
        }
        return p;
      }

      function tira() {
        if (animando) return;
        const L = liv(), p = pianoTiro();
        if (L.canestriNascosti && p.formulaOk && !rivelato) { rivelato = true; disegnaCampo(); }
        animando = true; bTira.disabled = true; bRic.disabled = true; slider.disabled = true;
        const dx = p.xFine - LX, dur = Math.max(600, Math.min(1150, 520 + dx * 95)), t0 = performance.now();
        (function passo(t) {
          const u = Math.min(1, (t - t0) / Math.max(1, dur)), x = LX + dx * u;
          disegnaPalla(x, yy(x));
          if (u < 1) raf = requestAnimationFrame(passo); else coda(p);
        })(t0);
      }

      function coda(p) {
        if (p.esito === 'canestro' && reti.length) { const r = reti[reti.length - 1]; r.classList.remove('gonfia'); void svg.getBoundingClientRect().width; r.classList.add('gonfia'); }
        const xf = p.xFine, yf = Math.max(yy(xf), 0.18), t0 = performance.now(), dur = 460;
        (function passo(t) {
          const u = Math.min(1, (t - t0) / dur);
          let x, y;
          if (p.esito === 'canestro') { x = xf; y = yf - 1.2 * u; }
          else if (p.esito === 'bloccato') { x = xf - 0.9 * u; y = yf * (1 - u * u); }
          else if (p.esito === 'soffitto') { x = xf + 0.6 * u; y = yf * (1 - u * u); }
          else { x = xf + 1.1 * u; y = 0.6 * Math.sin(Math.PI * u) * (1 - u * .4); }
          disegnaPalla(x, y);
          if (u < 1) raf = requestAnimationFrame(passo); else concludi(p);
        })(t0);
      }

      function concludi(p) {
        animando = false; bRic.disabled = false; bTira.disabled = false;
        const L = liv();
        slider.disabled = !!L.aFissa;
        const dentro = p.esito === 'canestro' && p.presi.length > 0 && p.presi.every(Boolean);
        if (dentro && p.mano && p.formulaOk) {
          vinto = true;
          msg.innerHTML = '<span class="vinto">Dentro. ' + ctx.tex(texVertice(a, h, k)) + '</span>';
          msg.className = 'lab-messaggio ok';
          ctx.completato(livello);
          ctx.zenone(VITTORIE[livello] || 'Canestro.', { espressione: 'orgoglioso', durata: 7000 });
          bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Un altro tiro';
          return;
        }
        let testo, zen, tipoZen = 'errore';
        if (!p.formulaOk) {
          const f = L.formula;
          testo = 'Non è la parabola scritta.';
          zen = (h !== f.h || k !== f.k)
            ? 'Il vertice non è ancora quello della formula: dentro la parentesi c\'è x − h, quindi h si legge col segno cambiato, e k è il numero che segue.'
            : 'Il vertice è giusto, l\'apertura no: a è il numero che sta davanti alla parentesi.';
        } else if (!p.mano) {
          const sotto = yy(LX) < LY;
          testo = sotto ? 'La palla è partita da terra, non dalla mano.' : 'La palla è partita per aria, non dalla mano.';
          zen = 'In x = 1 la tua parabola vale ' + virgolaTesto(yy(LX)) + ', ma la mano sta a 2: il tiro non parte da lì e non vale. Sistema prima quello.';
        } else if (p.esito === 'bloccato') {
          testo = 'Stoppata dal difensore.';
          zen = 'In x = ' + L.difensore.x + ' la parabola deve stare sopra ' + L.difensore.h + ' m: serve una campana più alta, cioè un vertice più su.';
        } else if (p.esito === 'soffitto') {
          testo = 'Ha toccato il soffitto.';
          zen = 'Il punto più alto del tiro è il vertice, e la sua quota è k: tienila sotto ' + L.soffitto + '. Per arrivare lontano senza salire serve una parabola larga, con a più vicino a zero.';
        } else if (p.mancato >= 0) {
          const c = p.attivi[p.mancato], d = yy(c[0]) - c[1];
          testo = 'Fuori: ' + (d > 0 ? 'passata sopra' : 'passata sotto') + ' l\'anello di (' + c[0] + '; ' + c[1] + ').';
          zen = 'In x = ' + c[0] + ' la parabola vale ' + virgolaTesto(yy(c[0])) + ' invece di ' + c[1] + '. Sposta il vertice o cambia a e guarda come si muove quel punto.';
          tipoZen = 'commento';
        } else {
          testo = 'Caduta prima di arrivarci.';
          zen = 'La campana è troppo stretta: con a più vicino a zero la parabola si allarga e la palla va più lontano.';
          tipoZen = 'commento';
        }
        msg.textContent = testo; msg.className = 'lab-messaggio no';
        ctx.zenone(zen, { tipo: tipoZen, espressione: 'pensa', durata: 7000 });
      }

      /* ---------------- dito e mouse ---------------- */
      function mondo(ev) {
        const r = svg.getBoundingClientRect();
        if (!r.width || !r.height) return { x: 0, y: 0 };
        return { x: ((ev.clientX - r.left) * (500 / r.width) - 45) / 40, y: (355 - (ev.clientY - r.top) * (400 / r.height)) / 40 };
      }
      function giu(ev) {
        if (animando || liv().vFissa) return;
        const m = mondo(ev);
        if (Math.hypot(SX(m.x) - SX(h), SY(m.y) - SY(k)) > 58) return;
        trascino = true; offX = h - m.x; offY = k - m.y;
        gManiglia.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!trascino) return;
        const m = mondo(ev);
        const nh = morsa(mezzo(m.x + offX), H_MIN, H_MAX), nk = morsa(mezzo(m.y + offY), K_MIN, K_MAX);
        if (nh !== h || nk !== k) { h = nh; k = nk; ridisegna(); }
        ev.preventDefault();
      }
      function molla() { if (!trascino) return; trascino = false; gManiglia.classList.remove('presa'); }

      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi);
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);

      slider.addEventListener('input', () => {
        if (animando) return;
        a = morsa(Math.round(parseFloat(slider.value) * 20) / 20, A_MIN, A_MAX);
        ridisegna();
      });
      bTira.addEventListener('click', tira);
      bRic.addEventListener('click', () => avviaLivello(vinto && livello < LIVELLI.length - 1 ? livello + 1 : livello));
      bAiuto.addEventListener('click', () => ctx.zenone(AIUTO, { tipo: 'suggerimento', espressione: 'pensa', durata: 12000 }));

      avviaLivello(livello);

      return function smonta() {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
