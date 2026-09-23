/* Laboratorio «La ruota panoramica» — equazioni goniometriche elementari sin x = k, cos x = k.
   Una ruota di raggio 1: la cabina colorata si trascina lungo il bordo, l'angolo x si conta dal
   raggio orizzontale di destra in senso antiorario. La quota della cabina rispetto al perno è sin x,
   la sua distanza orizzontale (col segno) è cos x. Lo studente segna TUTTI gli angoli in [0°, 360°)
   in cui la cabina è alla quota richiesta; a «Ho finito» una cabina fantasma fa un giro e controlla.
   Contratto e regole: SCHEMA-LAB.md — modelli: laboratori/bilancia.js, laboratori/canestro.js */
(function () {
  const STILE = `
    .lab-ruota { container-type: inline-size; }
    .lab-ruota .rp { display: grid; grid-template-columns: minmax(0, 1fr); }
    .lab-ruota .rp-sx { min-width: 0; }
    .lab-ruota .rp-dx { min-width: 0; padding: 4px 0 0; }
    @container (min-width: 720px) {
      .lab-ruota .rp { grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr); align-items: start; }
      .lab-ruota .rp-dx { padding: 14px 14px 0 4px; }
      .lab-ruota .rp-obiettivo { padding-left: 4px; padding-right: 4px; }
    }
    .lab-ruota .lab-scena { background: transparent; }
    .lab-ruota .lab-scena svg { max-width: 500px; margin: 0 auto; border-radius: 18px; }
    .lab-ruota .rp-ruota-svg { touch-action: none; cursor: grab; outline: none; }
    .lab-ruota .rp-ruota-svg.presa { cursor: grabbing; }
    .lab-ruota .rp-ruota-svg:focus-visible { box-shadow: 0 0 0 3px var(--accento); }
    .lab-ruota .rp-comandi { display: flex; gap: 5px; justify-content: center; align-items: center; flex-wrap: wrap; padding: 8px 4px 4px; }
    .lab-ruota .rp-comandi .btn { min-height: 44px; min-width: 44px; padding-left: 9px; padding-right: 9px; font-size: .93rem; }
    .lab-ruota .rp-comandi .b-fine { font-variant-numeric: tabular-nums; }
    .lab-ruota .rp-comandi .b-segna { min-width: 6.9em; }
    .lab-ruota .rp-comandi .b-segna.togli { background: var(--no-tenue); border-color: color-mix(in srgb, var(--no) 45%, var(--bordo)); color: var(--no); box-shadow: none; }
    .lab-ruota .btn[disabled] { opacity: .38; cursor: default; }
    .lab-ruota .rp-obiettivo { padding: 8px 14px 2px; font-size: .95rem; line-height: 1.5; }
    .lab-ruota .rp-obiettivo p { margin: 0 0 4px; }
    .lab-ruota .rp-carta { margin: 8px 12px 0; padding: 8px 10px 6px; border-radius: 16px; background: var(--sup); border: 1px solid var(--bordo); box-shadow: var(--ombra); }
    .lab-ruota .rp-et { font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; color: var(--testo2); font-weight: 600; }
    .lab-ruota .rp-grafico svg { display: block; width: 100%; height: auto; }
    .lab-ruota .rp-formula { display: flex; flex-direction: column; gap: 3px; }
    .lab-ruota .rp-riga { display: flex; align-items: baseline; gap: 4px 10px; flex-wrap: wrap; min-height: 1.9em; }
    .lab-ruota .rp-riga .rp-et { min-width: 7.2em; }
    .lab-ruota .rp-tex { font-size: 1.1rem; display: inline-flex; flex-wrap: wrap; gap: 2px 14px; align-items: baseline; }
    .lab-ruota .rp-riga.ponte { margin-top: 4px; padding: 6px 8px; border-radius: 12px; background: var(--ok-tenue); animation: lab-ruota-pop .5s var(--molla); }
    .lab-ruota .rp-riga.ponte .rp-et { color: var(--ok); }
    .lab-ruota .rp-vuoto { color: var(--testo3); font-size: .9rem; }
    .lab-ruota .lab-messaggio { padding-left: 14px; padding-right: 14px; }
    .lab-ruota .vinto { display: inline-block; animation: lab-ruota-pop .5s var(--molla); }
    @keyframes lab-ruota-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-ruota .segno .testa { transition: fill .25s, transform .35s var(--molla); transform-box: fill-box; transform-origin: 50% 50%; }
    .lab-ruota .segno.nuovo .testa { animation: lab-ruota-pianta .45s var(--molla); }
    @keyframes lab-ruota-pianta { from { transform: scale(0) } to { transform: none } }
    .lab-ruota .segno.acceso .testa { animation: lab-ruota-acceso .5s var(--molla); }
    @keyframes lab-ruota-acceso { 0% { transform: none } 40% { transform: scale(1.45) } 100% { transform: none } }
    .lab-ruota .segno.rosso .testa { animation: lab-ruota-no .42s ease; }
    @keyframes lab-ruota-no { 0%, 100% { transform: none } 25% { transform: translateX(-3px) } 75% { transform: translateX(3px) } }
    .lab-ruota .rp-lab-tag { font: 600 12px var(--font); }
  `;

  /* ---------------- livelli ----------------
     f: la funzione ('sin' = quota, 'cos' = distanza orizzontale); k: il valore richiesto;
     sol: le soluzioni in [0°, 360°); tol: di quanti gradi può sbagliare un segnaposto;
     passo: lo scatto della ruota; cifre: quante cifre mostra il cartello della quota. */
  const ASIN03 = Math.asin(0.3) * 180 / Math.PI;          /* 17,4576…° */
  const LIVELLI = [
    { f: 'sin', k: 0.5, kTex: '\\frac{1}{2}', kTesto: '½', sol: [30, 150], tol: 3, passo: 1, cifre: 2,
      testo: 'Il terrazzo è a quota $\\frac{1}{2}$ sopra il perno. Trova **tutti** gli angoli in cui la cabina è proprio all\'altezza del terrazzo e segnali uno per uno. Quando pensi di averli tutti, premi «Ho finito».',
      ponte: ['x_1 = 30^\\circ', 'x_2 = 180^\\circ - 30^\\circ = 150^\\circ'],
      vittoria: 'Due volte in un giro: a 30° salendo e a 150° scendendo. Le due posizioni sono simmetriche rispetto alla verticale del perno, per questo la seconda è 180° − 30°.' },
    { f: 'sin', k: 1, kTex: '1', kTesto: '1', sol: [90], tol: 3, passo: 1, cifre: 2,
      testo: 'Terrazzo in cima alla ruota, a quota $1$. Stesso compito: tutti gli angoli, nessuno escluso.',
      ponte: ['x = 90^\\circ', '\\alpha = 180^\\circ - \\alpha = 90^\\circ'],
      vittoria: 'Una volta sola: in cima la cabina tocca quota 1 e subito riscende. Qui α e 180° − α sono lo stesso angolo, 90°.' },
    { f: 'sin', k: -Math.sqrt(3) / 2, kTex: '-\\frac{\\sqrt{3}}{2}', kTesto: '−√3/2', sol: [240, 300], tol: 3, passo: 1, cifre: 2,
      testo: 'Stavolta il terrazzo sta **sotto** il perno, a quota $-\\frac{\\sqrt{3}}{2} \\approx -0{,}87$.',
      ponte: ['\\alpha = -60^\\circ', 'x_1 = 180^\\circ - \\alpha = 240^\\circ', 'x_2 = \\alpha + 360^\\circ = 300^\\circ'],
      vittoria: 'Quota negativa, soluzioni sotto il perno: 240° e 300°, di nuovo simmetriche rispetto alla verticale. La calcolatrice direbbe −60°, che è 300° contato all\'indietro.' },
    { f: 'sin', k: 0, kTex: '0', kTesto: '0', sol: [0, 180], tol: 3, passo: 1, cifre: 2,
      testo: 'Quota $0$: il terrazzo è alla stessa altezza del perno. Conta bene i passaggi in un giro completo, da $0^\\circ$ fino a tornare al punto di partenza.',
      ponte: ['x_1 = 0^\\circ', 'x_2 = 180^\\circ - 0^\\circ = 180^\\circ', '360^\\circ \\text{ è di nuovo } 0^\\circ'],
      vittoria: 'Due posizioni, 0° e 180°. Il 360° coincide con lo 0°: un giro intero riporta la cabina dove era partita, quindi non va contato un\'altra volta.' },
    { f: 'cos', k: -0.5, kTex: '-\\frac{1}{2}', kTesto: '−½', sol: [120, 240], tol: 3, passo: 1, cifre: 2,
      testo: 'Cambia la regola. Il fotografo è a terra, mezzo raggio **a sinistra** del perno, e scatta solo quando la cabina gli passa esattamente sopra. Conta la distanza orizzontale dal perno, cioè $\\cos x$.',
      ponte: ['x_1 = 120^\\circ', 'x_2 = 360^\\circ - 120^\\circ = 240^\\circ'],
      vittoria: 'Col coseno la simmetria cambia: le due posizioni stanno una sopra e una sotto l\'orizzontale del perno. Per questo le soluzioni sono α e 360° − α, cioè 120° e 240°.' },
    { f: 'sin', k: 0.3, kTex: '0{,}3', kTesto: '0,3', sol: [ASIN03, 180 - ASIN03], tol: 1, passo: 0.5, cifre: 1, alfaDato: true,
      testo: 'Quota $0{,}3$, un valore non notevole. La calcolatrice dà un angolo solo: $\\arcsin 0{,}3 \\approx 17{,}5^\\circ$. Il cartello della quota qui ha una cifra sola e la precisione richiesta è di un grado: l\'altra soluzione va ragionata.',
      ponte: ['x_1 = \\arcsin 0{,}3 \\approx 17{,}5^\\circ', 'x_2 = 180^\\circ - 17{,}5^\\circ \\approx 162{,}5^\\circ'],
      vittoria: 'La calcolatrice dà solo 17,5°. L\'altra viene dalla simmetria: 180° − 17,5° = 162,5°. Con i valori non notevoli questo conto è l\'unico modo di essere precisi.' }
  ];

  const AIUTO_SIN = 'Trascina la cabina arancione lungo il bordo: l\'angolo x si conta dal raggio orizzontale di destra, girando in senso antiorario. La quota della cabina rispetto al perno è sin x: sopra il perno è positiva, sotto è negativa. Quando il centro della cabina sta sulla linea tratteggiata, premi «Segna qui». Prima di dire «Ho finito» fai fare alla cabina un giro intero e conta quante volte attraversa la linea.';
  const AIUTO_COS = 'Qui non conta l\'altezza ma la distanza orizzontale dal perno, cioè cos x: a destra del perno è positiva, a sinistra negativa. La cabina è nella foto quando il suo centro sta sulla linea verticale del fotografo. Fai un giro intero e conta quante volte la attraversa.';
  const AIUTO_ALFA = 'La calcolatrice ti dà l\'angolo α del primo quadrante. La ruota è simmetrica rispetto alla verticale che passa per il perno: per ogni posizione a destra ce n\'è una a sinistra alla stessa altezza. Scrivi l\'angolo di quella posizione usando α, poi portaci la cabina con i tasti − e +.';

  /* ---------------- geometria della scena ---------------- */
  const W = 400, H = 380;
  const CX = 200, CY = 176, R = 116;          /* perno e raggio della ruota (raggio 1 = R) */
  const RA = 136, RL = 153;                    /* anello fisso dei gradi e posizione delle scritte */
  const Y_TERRA = 346;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const RAD = Math.PI / 180;
  const px = (ang, r) => CX + r * Math.cos(ang * RAD);
  const py = (ang, r) => CY - r * Math.sin(ang * RAD);
  const norm = a => ((a % 360) + 360) % 360;
  const dist = (a, b) => { const d = Math.abs(norm(a) - norm(b)); return Math.min(d, 360 - d); };
  const fz = (f, x) => f === 'cos' ? Math.cos(x * RAD) : Math.sin(x * RAD);

  /* numeri all'italiana */
  const virgola = (v, c) => { const s = Number(v).toFixed(c); return (s === '-0' || /^-0[.,]0*$/.test(s) ? s.slice(1) : s).replace('.', ','); };
  const gradiTesto = a => { const r = Math.round(a * 2) / 2; return (Number.isInteger(r) ? String(r) : virgola(r, 1)) + '°'; };
  const gradiTex = a => { const r = Math.round(a * 2) / 2; return (Number.isInteger(r) ? String(r) : virgola(r, 1).replace(',', '{,}')) + '^\\circ'; };
  const numTex = (v, c) => virgola(v, c).replace(',', '{,}');

  /* grafico della quota: x da 0° a 360°, valori da −1 a 1 */
  const GW = 400, GH = 156, GX0 = 42, GX1 = 386, GY0 = 76, GA = 56;
  const gx = a => GX0 + (GX1 - GX0) * a / 360, gy = v => GY0 - GA * v;

  COMPASSO.registraLab({
    id: 'ruota',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-ruota')) { const s = document.createElement('style'); s.id = 'stile-lab-ruota'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-ruota');
      radice.innerHTML = `
        <div class="rp">
          <div class="rp-sx">
            <div class="lab-scena"></div>
            <div class="rp-comandi">
              <button type="button" class="btn b-meno" aria-label="Indietro di un passo">−1°</button>
              <button type="button" class="btn primario b-segna">Segna qui</button>
              <button type="button" class="btn b-piu" aria-label="Avanti di un passo">+1°</button>
              <button type="button" class="btn b-fine">Ho finito</button>
            </div>
          </div>
          <div class="rp-dx">
            <div class="rp-obiettivo"></div>
            <div class="rp-carta rp-grafico"><div class="rp-et rp-graf-et"></div></div>
            <div class="rp-carta rp-formula"></div>
            <div class="lab-messaggio"></div>
          </div>
        </div>
        <div class="lab-barra">
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <button type="button" class="btn piccolo b-aiuto" aria-label="Come si gioca">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const objEl = radice.querySelector('.rp-obiettivo'), grafEl = radice.querySelector('.rp-grafico'), grafEt = radice.querySelector('.rp-graf-et');
      const formEl = radice.querySelector('.rp-formula'), msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const b = { meno: radice.querySelector('.b-meno'), piu: radice.querySelector('.b-piu'), segna: radice.querySelector('.b-segna'), fine: radice.querySelector('.b-fine'), ric: radice.querySelector('.b-ric'), aiuto: radice.querySelector('.b-aiuto') };
      const scuro = ctx.tema() === 'scuro';

      /* ================= scena: la ruota ================= */
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'rp-ruota-svg', role: 'img', tabindex: '0', 'aria-label': 'Ruota panoramica: trascina la cabina arancione lungo il bordo, oppure usa le frecce' });
      scena.appendChild(svg);
      const defs = el('defs'); svg.appendChild(defs);
      const cielo = el('linearGradient', { id: 'rp-cielo', x1: 0, y1: 0, x2: 0, y2: 1 });
      cielo.appendChild(el('stop', { offset: '0', style: `stop-color: color-mix(in srgb, var(--s1) ${scuro ? 26 : 22}%, var(--sup))` }));
      cielo.appendChild(el('stop', { offset: '1', style: 'stop-color: color-mix(in srgb, var(--s1) 5%, var(--sup))' }));
      defs.appendChild(cielo);
      const taglio = el('clipPath', { id: 'rp-taglio' }); taglio.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, rx: 18 })); defs.appendChild(taglio);
      const ombra = el('filter', { id: 'rp-ombra', x: '-40%', y: '-40%', width: '180%', height: '180%' });
      ombra.appendChild(el('feDropShadow', { dx: 0, dy: 2, stdDeviation: 1.6, 'flood-color': '#000', 'flood-opacity': scuro ? .45 : .22 }));
      defs.appendChild(ombra);

      const mondo = el('g', { 'clip-path': 'url(#rp-taglio)' }); svg.appendChild(mondo);
      const g = nome => { const x = el('g', { class: nome }); mondo.appendChild(x); return x; };

      /* cielo, astro, nuvole, colline, prato */
      const gFondo = g('rp-fondo');
      gFondo.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#rp-cielo)' }));
      if (scuro) {
        [[34, 96], [88, 30], [150, 70], [262, 40], [318, 96], [30, 250], [360, 150], [120, 120]].forEach(([x, y], i) =>
          gFondo.appendChild(el('circle', { cx: x, cy: y, r: i % 3 ? 1.1 : 1.6, fill: 'var(--testo)', opacity: .55 })));
        gFondo.appendChild(el('circle', { cx: 262, cy: 42, r: 13, fill: 'var(--avviso)', opacity: .75 }));
        gFondo.appendChild(el('circle', { cx: 268, cy: 37, r: 11.5, style: 'fill: color-mix(in srgb, var(--s1) 26%, var(--sup))' }));
      } else {
        gFondo.appendChild(el('circle', { cx: 262, cy: 42, r: 22, fill: 'var(--avviso)', opacity: .12 }));
        gFondo.appendChild(el('circle', { cx: 262, cy: 42, r: 13, fill: 'var(--avviso)', opacity: .55 }));
      }
      const nuvola = (x, y, s) => { const n = el('g', { opacity: scuro ? .12 : .75, fill: scuro ? 'var(--testo)' : 'var(--sup)' });
        n.appendChild(el('ellipse', { cx: x, cy: y, rx: 22 * s, ry: 9 * s })); n.appendChild(el('ellipse', { cx: x + 14 * s, cy: y - 6 * s, rx: 14 * s, ry: 10 * s })); n.appendChild(el('ellipse', { cx: x - 12 * s, cy: y - 3 * s, rx: 11 * s, ry: 8 * s })); gFondo.appendChild(n); };
      nuvola(112, 88, 1); nuvola(300, 58, .8);
      gFondo.appendChild(el('path', { d: `M0 ${Y_TERRA - 44} C 60 ${Y_TERRA - 86}, 120 ${Y_TERRA - 70}, 170 ${Y_TERRA - 40} S 290 ${Y_TERRA - 92}, 400 ${Y_TERRA - 52} L400 ${H} L0 ${H} Z`, style: 'fill: color-mix(in srgb, var(--s3) 20%, var(--sup2))' }));
      gFondo.appendChild(el('path', { d: `M0 ${Y_TERRA - 16} C 80 ${Y_TERRA - 38}, 150 ${Y_TERRA - 18}, 220 ${Y_TERRA - 24} S 340 ${Y_TERRA - 40}, 400 ${Y_TERRA - 20} L400 ${H} L0 ${H} Z`, style: 'fill: color-mix(in srgb, var(--s3) 34%, var(--sup2))' }));
      gFondo.appendChild(el('rect', { x: 0, y: Y_TERRA, width: W, height: H - Y_TERRA, style: 'fill: color-mix(in srgb, var(--s3) 42%, var(--sup3))' }));
      gFondo.appendChild(el('rect', { x: 0, y: Y_TERRA, width: W, height: 3, fill: 'var(--testo)', opacity: .12 }));
      /* alberelli sul prato */
      [[26, 1], [92, .8], [318, .9]].forEach(([x, s]) => {
        gFondo.appendChild(el('rect', { x: x - 2, y: Y_TERRA - 12 * s, width: 4, height: 12 * s, rx: 1.5, fill: 'var(--testo2)', opacity: .55 }));
        gFondo.appendChild(el('circle', { cx: x, cy: Y_TERRA - 18 * s, r: 10 * s, style: 'fill: color-mix(in srgb, var(--s3) 70%, var(--testo))', opacity: .8 }));
      });

      const gDietro = g('rp-dietro');          /* torre del terrazzo o fotografo: cambiano col livello */

      /* anello fisso dei gradi */
      const gAnello = g('rp-anello');
      gAnello.appendChild(el('circle', { cx: CX, cy: CY, r: RA, fill: 'none', stroke: 'var(--testo2)', 'stroke-width': 1.2, opacity: .35 }));
      for (let a = 0; a < 360; a += 15) {
        const lungo = a % 90 === 0, medio = a % 30 === 0;
        const r0 = RA - (lungo ? 7 : medio ? 4 : 2.5), r1 = RA + (lungo ? 7 : medio ? 4 : 2.5);
        gAnello.appendChild(el('line', { x1: px(a, r0), y1: py(a, r0), x2: px(a, r1), y2: py(a, r1), stroke: 'var(--testo2)', 'stroke-width': lungo ? 2 : 1.2, opacity: lungo ? .8 : .5 }));
      }
      [0, 90, 180, 270].forEach(a => gAnello.appendChild(el('text', { x: px(a, RL), y: py(a, RL) + 5, 'text-anchor': 'middle', fill: 'var(--testo2)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 600 13px var(--font)' }, a + '°')));

      /* telaio a cavalletto */
      const gTelaio = g('rp-telaio');
      [-42, 42].forEach(dx => gTelaio.appendChild(el('line', { x1: CX, y1: CY, x2: CX + dx, y2: Y_TERRA - 4, stroke: 'var(--testo2)', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: .85 })));
      [0.62, 0.84].forEach(t => { const y = CY + (Y_TERRA - 4 - CY) * t, dx = 42 * t;
        gTelaio.appendChild(el('line', { x1: CX - dx, y1: y, x2: CX + dx, y2: y, stroke: 'var(--testo2)', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: .6 })); });
      gTelaio.appendChild(el('rect', { x: CX - 54, y: Y_TERRA - 7, width: 108, height: 9, rx: 4, fill: 'var(--testo2)', opacity: .8 }));

      /* la ruota che gira */
      const gRuota = g('rp-ruota');
      gRuota.appendChild(el('circle', { cx: CX, cy: CY, r: R - 10, fill: 'none', stroke: 'var(--testo)', 'stroke-width': 1.8, opacity: .38 }));
      for (let i = 0; i < 16; i++) { const a = i * 22.5;
        gRuota.appendChild(el('line', { x1: px(a, 14), y1: py(a, 14), x2: px(a, R - 10), y2: py(a, R - 10), stroke: 'var(--testo)', 'stroke-width': 1.4, opacity: .38 })); }
      for (let i = 0; i < 32; i++) { const a = i * 11.25, b2 = a + 11.25;
        gRuota.appendChild(el('line', { x1: px(a, R), y1: py(a, R), x2: px(b2, R - 10), y2: py(b2, R - 10), stroke: 'var(--testo)', 'stroke-width': 1, opacity: .3 })); }
      gRuota.appendChild(el('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: 'var(--testo)', 'stroke-width': 3.6, opacity: .72 }));
      const lampadine = [];
      for (let i = 0; i < 24; i++) { const a = i * 15 + 7.5; const l = el('circle', { cx: px(a, R), cy: py(a, R), r: 2.4, fill: 'var(--avviso)', opacity: .8 }); gRuota.appendChild(l); lampadine.push(l); }

      /* guide: orizzontale e verticale del perno, raggio di partenza */
      const gGuide = g('rp-guide');
      const guidaO = el('line', { x1: CX - R, y1: CY, x2: CX + R, y2: CY, stroke: 'var(--testo)', 'stroke-width': 1.2, 'stroke-dasharray': '2 4', opacity: .5 });
      const guidaV = el('line', { x1: CX, y1: CY - R, x2: CX, y2: CY + R, stroke: 'var(--testo)', 'stroke-width': 1.2, 'stroke-dasharray': '2 4', opacity: .5 });
      gGuide.appendChild(guidaO); gGuide.appendChild(guidaV);
      const settore = el('path', { style: 'fill: color-mix(in srgb, var(--s2) 16%, transparent)' }); gGuide.appendChild(settore);
      const arco = el('path', { fill: 'none', stroke: 'var(--s2)', 'stroke-width': 2.4, 'stroke-linecap': 'round' }); gGuide.appendChild(arco);
      const xArco = el('text', { 'text-anchor': 'middle', fill: 'var(--s2)', style: 'font: italic 700 14px var(--font-titoli)' }, 'x'); gGuide.appendChild(xArco);
      const raggio = el('line', { x1: CX, y1: CY, stroke: 'var(--s2)', 'stroke-width': 3, 'stroke-linecap': 'round' }); gGuide.appendChild(raggio);
      const quotaSeg = el('line', { stroke: 'var(--s2)', 'stroke-width': 2.2, 'stroke-dasharray': '4 3' }); gGuide.appendChild(quotaSeg);

      /* perno */
      const gPerno = g('rp-perno');
      gPerno.appendChild(el('circle', { cx: CX, cy: CY, r: 13, fill: 'var(--testo2)', filter: 'url(#rp-ombra)' }));
      gPerno.appendChild(el('circle', { cx: CX, cy: CY, r: 6, fill: 'var(--sup)' }));
      gPerno.appendChild(el('circle', { cx: CX, cy: CY, r: 2.4, fill: 'var(--testo)' }));

      /* cabine: 7 grigie e quella arancione, sempre dritte (non girano con la ruota) */
      const gCabine = g('rp-cabine');
      const cabine = [];
      for (let i = 1; i < 8; i++) {
        const c = el('g', { opacity: .9 });
        c.appendChild(el('ellipse', { cx: 0, cy: 0, rx: 11, ry: 9, style: 'fill: color-mix(in srgb, var(--testo2) 40%, var(--sup))', stroke: 'var(--testo2)', 'stroke-width': 1.2 }));
        c.appendChild(el('rect', { x: -7.5, y: -4, width: 15, height: 5, rx: 2.5, fill: 'var(--sup)', opacity: .85 }));
        gCabine.appendChild(c); cabine.push(c);
      }
      const gLinea = g('rp-linea');            /* terrazzo o mira del fotografo, davanti alla ruota */
      const cabina = el('g', { filter: 'url(#rp-ombra)' });
      cabina.appendChild(el('ellipse', { cx: 0, cy: 0, rx: 16, ry: 13, fill: 'var(--s2)', stroke: 'color-mix(in srgb, var(--s2) 60%, #000)', 'stroke-width': 1.6 }));
      cabina.appendChild(el('path', { d: 'M-11 -3 Q0 -9 11 -3 L11 3 Q0 -2 -11 3 Z', fill: '#fff', opacity: .82 }));
      cabina.appendChild(el('path', { d: 'M-5 -13 Q0 -17 5 -13', fill: 'none', stroke: 'color-mix(in srgb, var(--s2) 60%, #000)', 'stroke-width': 2, 'stroke-linecap': 'round' }));
      cabina.appendChild(el('circle', { cx: 0, cy: 0, r: 3.2, fill: 'var(--sup)', stroke: 'color-mix(in srgb, var(--s2) 60%, #000)', 'stroke-width': 1.4 }));
      mondo.appendChild(cabina);

      const gSegni = g('rp-segni');
      const fantasma = el('g', { opacity: 0 });
      fantasma.appendChild(el('ellipse', { cx: 0, cy: 0, rx: 16, ry: 13, fill: 'var(--sup)', 'fill-opacity': .35, stroke: 'var(--testo)', 'stroke-width': 1.8, 'stroke-dasharray': '4 3' }));
      fantasma.appendChild(el('circle', { cx: 0, cy: 0, r: 2.6, fill: 'var(--testo)' }));
      mondo.appendChild(fantasma);
      const gFx = g('rp-fx');

      /* cartello con l'angolo e la quota */
      const gCartello = g('rp-cartello');
      mondo.insertBefore(gCartello, gCabine);    /* sotto cabine e segnaposto: un segno a 120°–150° deve restare visibile */
      gCartello.appendChild(el('rect', { x: 10, y: 10, width: 118, height: 50, rx: 12, fill: 'var(--sup)', opacity: .93, stroke: 'var(--bordo2)', 'stroke-width': 1 }));
      const cartX = el('text', { x: 22, y: 33, fill: 'var(--testo)', style: 'font: 700 18px var(--font); font-variant-numeric: tabular-nums' }); gCartello.appendChild(cartX);
      const cartQ = el('text', { x: 22, y: 51, fill: 'var(--testo2)', style: 'font: 500 12.5px var(--font); font-variant-numeric: tabular-nums' }); gCartello.appendChild(cartQ);
      const giroTag = el('g', { opacity: 0 });
      giroTag.appendChild(el('rect', { x: CX + 58, y: CY + 12, width: 84, height: 24, rx: 12, fill: 'var(--s2)' }));
      giroTag.appendChild(el('text', { x: CX + 100, y: CY + 29, 'text-anchor': 'middle', fill: '#fff', style: 'font: 700 13px var(--font)' }, '360° = 0°'));
      mondo.appendChild(giroTag);

      /* ================= grafico della quota ================= */
      const graf = el('svg', { viewBox: `0 0 ${GW} ${GH}`, role: 'img', 'aria-label': 'Grafico: il valore in funzione dell\'angolo x' });
      grafEl.appendChild(graf);
      const gAssi = el('g'); graf.appendChild(gAssi);
      for (let a = 0; a <= 360; a += 90) {
        gAssi.appendChild(el('line', { x1: gx(a), y1: gy(1), x2: gx(a), y2: gy(-1), stroke: 'var(--bordo)', 'stroke-width': 1 }));
        gAssi.appendChild(el('text', { x: gx(a), y: GH - 4, 'text-anchor': 'middle', fill: 'var(--testo2)', style: 'font: 12px var(--font)' }, a + '°'));
      }
      [1, -1].forEach(v => gAssi.appendChild(el('line', { x1: gx(0), y1: gy(v), x2: gx(360), y2: gy(v), stroke: 'var(--bordo)', 'stroke-width': 1 })));
      gAssi.appendChild(el('line', { x1: gx(0) - 4, y1: gy(0), x2: gx(360) + 6, y2: gy(0), stroke: 'var(--testo2)', 'stroke-width': 1.4 }));
      [[1, '1'], [0, '0'], [-1, '−1']].forEach(([v, t]) => gAssi.appendChild(el('text', { x: gx(0) - 8, y: gy(v) + 4, 'text-anchor': 'end', fill: 'var(--testo2)', style: 'font: 12px var(--font)' }, t)));
      const gRettaK = el('g'); graf.appendChild(gRettaK);
      const traccia = el('path', { fill: 'none', stroke: 'var(--s2)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); graf.appendChild(traccia);
      const gGrafSegni = el('g'); graf.appendChild(gGrafSegni);
      const guidaG = el('line', { stroke: 'var(--s2)', 'stroke-width': 1.4, 'stroke-dasharray': '3 3', opacity: .7 }); graf.appendChild(guidaG);
      const puntoG = el('circle', { r: 5.5, fill: 'var(--s2)', stroke: 'var(--sup)', 'stroke-width': 2 }); graf.appendChild(puntoG);
      const fantasmaG = el('circle', { r: 5, fill: 'none', stroke: 'var(--testo)', 'stroke-width': 1.6, 'stroke-dasharray': '3 2', opacity: 0 }); graf.appendChild(fantasmaG);

      /* ================= stato ================= */
      let livello = 0, x = 0, segni = [], vinto = false, controllo = false, trascino = false;
      let rafGiro = 0, rafFx = 0, timerGiro = 0, giroFino = 0, effetti = [];
      const visto = new Uint8Array(721);          /* mezzi gradi già percorsi: la traccia del grafico */
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      const L = () => LIVELLI[livello];
      const PARTENZA = [0, 0, 0, 270, 0, 0];

      /* ================= disegno ================= */
      function disegnaLivello() {
        const l = L();
        vuota(gDietro); vuota(gLinea); vuota(gRettaK);
        const tagW = 22 + 7.2 * ('k = ' + l.kTesto).length;
        if (l.f === 'sin') {
          const yK = CY - l.k * R;
          /* torre con il terrazzo, e una persona che guarda */
          gDietro.appendChild(el('rect', { x: 368, y: yK + 4, width: 26, height: Y_TERRA - yK - 4, rx: 3, style: 'fill: color-mix(in srgb, var(--testo2) 30%, var(--sup2))', stroke: 'var(--bordo2)', 'stroke-width': 1 }));
          for (let y = yK + 16; y < Y_TERRA - 14; y += 22) gDietro.appendChild(el('rect', { x: 375, y, width: 12, height: 9, rx: 2, fill: 'var(--avviso)', opacity: scuro ? .55 : .35 }));
          gDietro.appendChild(el('rect', { x: 352, y: yK, width: 44, height: 5, rx: 2, fill: 'var(--testo2)' }));
          gDietro.appendChild(el('path', { d: `M354 ${yK - 11} H396 M356 ${yK} V${yK - 11} M370 ${yK} V${yK - 11} M384 ${yK} V${yK - 11}`, stroke: 'var(--testo2)', 'stroke-width': 1.6, fill: 'none' }));
          gDietro.appendChild(el('circle', { cx: 389, cy: yK - 17, r: 3.6, fill: 'var(--s4)' }));
          gDietro.appendChild(el('path', { d: `M389 ${yK - 13} V${yK - 2} M389 ${yK - 10} L382 ${yK - 15}`, stroke: 'var(--s4)', 'stroke-width': 2.2, 'stroke-linecap': 'round', fill: 'none' }));
          gLinea.appendChild(el('line', { x1: 4, y1: yK, x2: 354, y2: yK, stroke: 'var(--accento2)', 'stroke-width': 2.4, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round' }));
          gLinea.appendChild(el('rect', { x: 396 - tagW, y: yK - 54, width: tagW, height: 22, rx: 11, fill: 'var(--accento2)' }));
          gLinea.appendChild(el('text', { x: 396 - tagW / 2, y: yK - 38.5, 'text-anchor': 'middle', fill: '#fff', style: 'font: 700 12.5px var(--font)' }, 'k = ' + l.kTesto));
        } else {
          const xK = CX + l.k * R;
          /* fotografo a terra con la macchina puntata in su */
          const piede = Y_TERRA;
          gDietro.appendChild(el('path', { d: `M${xK} ${piede - 22} L${xK - 9} ${piede} M${xK} ${piede - 22} L${xK + 9} ${piede} M${xK} ${piede - 22} V${piede}`, stroke: 'var(--testo)', 'stroke-width': 1.8, fill: 'none', opacity: .75 }));
          gLinea.appendChild(el('line', { x1: xK, y1: 8, x2: xK, y2: piede - 38, stroke: 'var(--accento2)', 'stroke-width': 2.4, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round' }));
          gLinea.appendChild(el('rect', { x: xK - 10, y: piede - 34, width: 20, height: 13, rx: 3.5, fill: 'var(--testo)', opacity: .88 }));
          gLinea.appendChild(el('rect', { x: xK - 4.5, y: piede - 39, width: 9, height: 6, rx: 1.5, fill: 'var(--accento2)' }));
          gLinea.appendChild(el('circle', { cx: xK + 5, cy: piede - 27.5, r: 1.6, fill: 'var(--avviso)' }));
          gLinea.appendChild(el('rect', { x: xK - 14 - tagW, y: piede - 62, width: tagW, height: 22, rx: 11, fill: 'var(--accento2)' }));
          gLinea.appendChild(el('text', { x: xK - 14 - tagW / 2, y: piede - 46.5, 'text-anchor': 'middle', fill: '#fff', style: 'font: 700 12.5px var(--font)' }, 'k = ' + l.kTesto));
        }
        guidaO.setAttribute('opacity', l.f === 'sin' ? .5 : .16);
        guidaV.setAttribute('opacity', l.f === 'cos' ? .5 : .16);
        /* grafico: retta y = k */
        gRettaK.appendChild(el('line', { x1: gx(0), y1: gy(l.k), x2: gx(360), y2: gy(l.k), stroke: 'var(--accento2)', 'stroke-width': 2, 'stroke-dasharray': '6 5' }));
        gRettaK.appendChild(el('text', { x: gx(360), y: gy(l.k) + (l.k > 0.8 ? 16 : -6), 'text-anchor': 'end', fill: 'var(--accento2)', stroke: 'var(--sup)', 'stroke-width': 3, 'paint-order': 'stroke', style: 'font: 700 12.5px var(--font)' }, 'y = ' + l.kTesto));
        grafEt.textContent = l.f === 'sin' ? 'quota della cabina, sin x, mentre la ruota gira' : 'distanza orizzontale dal perno, cos x, mentre la ruota gira';
        objEl.innerHTML = ctx.md(l.testo);
        const p = l.passo === 1 ? '1°' : '0,5°';
        b.meno.textContent = '−' + p; b.piu.textContent = '+' + p;
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length;
      }

      function disegnaTraccia() {
        const f = L().f; let d = '', dentro = false;
        for (let i = 0; i <= 720; i++) {
          if (visto[i]) { const a = i / 2; d += (dentro ? 'L' : 'M') + gx(a).toFixed(1) + ' ' + gy(fz(f, a)).toFixed(1) + ' '; dentro = true; }
          else dentro = false;
        }
        traccia.setAttribute('d', d || 'M0 0');
      }
      function marcaVisto(da, a) {
        const delta = ((a - da) % 360 + 540) % 360 - 180, n = Math.round(Math.abs(delta) * 2), s = Math.sign(delta);
        for (let j = 0; j <= n; j++) { const i = Math.round(norm(da + s * j / 2) * 2) % 720; visto[i] = 1; if (i === 0) visto[720] = 1; }
      }

      const colSegno = s => s.stato === 'ok' ? 'var(--ok)' : s.stato === 'no' ? 'var(--no)' : 'var(--s1)';
      function disegnaSegni() {
        vuota(gSegni); vuota(gGrafSegni);
        const f = L().f;
        segni.forEach((s, i) => {
          const c = colSegno(s);
          const gs = el('g', { class: 'segno' + (s.nuovo ? ' nuovo' : '') + (s.lampo ? ' ' + s.lampo : '') });
          gs.appendChild(el('line', { x1: px(s.a, R + 4), y1: py(s.a, R + 4), x2: px(s.a, RA + 4), y2: py(s.a, RA + 4), stroke: c, 'stroke-width': 3, 'stroke-linecap': 'round' }));
          const testa = el('g', { class: 'testa' });
          testa.appendChild(el('circle', { cx: px(s.a, RA + 12), cy: py(s.a, RA + 12), r: 9.5, fill: c, stroke: 'var(--sup)', 'stroke-width': 2 }));
          testa.appendChild(el('text', { x: px(s.a, RA + 12), y: py(s.a, RA + 12) + 4, 'text-anchor': 'middle', fill: '#fff', style: 'font: 700 11px var(--font)' }, s.stato === 'no' ? '✕' : String(i + 1)));
          gs.appendChild(testa); gSegni.appendChild(gs);
          const v = fz(f, s.a);
          gGrafSegni.appendChild(el('line', { x1: gx(s.a), y1: gy(0), x2: gx(s.a), y2: gy(v), stroke: c, 'stroke-width': 1.6, opacity: .8 }));
          gGrafSegni.appendChild(el('circle', { cx: gx(s.a), cy: gy(v), r: 5, fill: c, stroke: 'var(--sup)', 'stroke-width': 1.8 }));
          s.nuovo = false; s.lampo = '';
        });
      }

      function vicino() { return segni.findIndex(s => dist(s.a, x) < 4); }

      function formula() {
        const l = L(), fn = l.f === 'sin' ? '\\sin' : '\\cos';
        const val = fz(l.f, x), esatto = Math.abs(val - l.k) < 1e-9, soglia = l.cifre === 1 ? 0.05 : 0.005;
        let ora;
        if (esatto) ora = fn + ' ' + gradiTex(x) + ' = ' + l.kTex;
        else {
          const quasi = Math.abs(val - l.k) < soglia;
          const tondo = Math.abs(val * 2 - Math.round(val * 2)) < 1e-9;       /* 0, ±0,5, ±1: valori esatti */
          ora = fn + ' ' + gradiTex(x) + (tondo ? ' = ' + String(Math.round(val * 2) / 2).replace('.', '{,}') : ' \\approx ' + numTex(val, l.cifre));
          if (!(l.cifre === 1 && quasi)) ora += ' ' + (quasi ? '\\approx' : val > l.k ? '>' : '<') + ' ' + l.kTex;
        }
        const riga = (et, corpo, cls) => '<div class="rp-riga' + (cls ? ' ' + cls : '') + '"><span class="rp-et">' + et + '</span><span class="rp-tex">' + corpo + '</span></div>';
        let h = riga('equazione', ctx.tex(fn + ' x = ' + l.kTex) + ctx.tex('0^\\circ \\le x < 360^\\circ'));
        h += riga('la cabina ora', ctx.tex(ora));
        h += riga('segnaposto', segni.length ? segni.map((s, i) => ctx.tex('x_{' + (i + 1) + '} = ' + gradiTex(s.a))).join('') : '<span class="rp-vuoto">ancora nessuno</span>');
        if (vinto) {
          h += riga('la regola', ctx.tex(l.f === 'sin' ? 'x = \\alpha \\;\\text{ oppure }\\; x = 180^\\circ - \\alpha' : 'x = \\alpha \\;\\text{ oppure }\\; x = 360^\\circ - \\alpha'), 'ponte');
          h += riga('qui', l.ponte.map(t => ctx.tex(t)).join(''), 'ponte');
        }
        formEl.innerHTML = h;
      }

      function aggiorna() {
        const l = L(), cx = px(x, R), cy = py(x, R);
        gRuota.setAttribute('transform', `rotate(${-x} ${CX} ${CY})`);
        cabine.forEach((c, i) => c.setAttribute('transform', `translate(${px(x + 45 * (i + 1), R).toFixed(1)} ${py(x + 45 * (i + 1), R).toFixed(1)})`));
        cabina.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`);
        raggio.setAttribute('x2', cx); raggio.setAttribute('y2', cy);
        if (x > 0.01) {
          const grande = x > 180 ? 1 : 0, ax = px(x, 30), ay = py(x, 30);
          arco.setAttribute('d', `M${CX + 30} ${CY} A30 30 0 ${grande} 0 ${ax.toFixed(1)} ${ay.toFixed(1)}`);
          settore.setAttribute('d', `M${CX} ${CY} L${CX + 30} ${CY} A30 30 0 ${grande} 0 ${ax.toFixed(1)} ${ay.toFixed(1)} Z`);
        } else { arco.setAttribute('d', 'M0 0'); settore.setAttribute('d', 'M0 0'); }
        xArco.setAttribute('x', px(x / 2, 44)); xArco.setAttribute('y', py(x / 2, 44) + 5);
        xArco.setAttribute('opacity', x > 16 ? 1 : 0);
        if (l.f === 'sin') { quotaSeg.setAttribute('x1', cx); quotaSeg.setAttribute('y1', cy); quotaSeg.setAttribute('x2', cx); quotaSeg.setAttribute('y2', CY); }
        else { quotaSeg.setAttribute('x1', cx); quotaSeg.setAttribute('y1', cy); quotaSeg.setAttribute('x2', CX); quotaSeg.setAttribute('y2', cy); }
        const val = fz(l.f, x);
        cartX.textContent = 'x = ' + gradiTesto(x);
        cartQ.textContent = (l.f === 'sin' ? 'quota ' : 'ascissa ') + virgola(val, l.cifre).replace('-', '−');
        giroTag.setAttribute('opacity', performance.now() < giroFino ? 1 : 0);
        puntoG.setAttribute('cx', gx(x)); puntoG.setAttribute('cy', gy(val));
        guidaG.setAttribute('x1', gx(x)); guidaG.setAttribute('x2', gx(x)); guidaG.setAttribute('y1', gy(0)); guidaG.setAttribute('y2', gy(val));
        const vi = vicino();
        b.segna.textContent = vi >= 0 ? 'Togli segno' : 'Segna qui';
        b.segna.classList.toggle('togli', vi >= 0);
        const fermo = vinto || controllo;
        b.segna.disabled = fermo; b.fine.disabled = fermo; b.meno.disabled = controllo; b.piu.disabled = controllo;
        b.ric.disabled = controllo;
        formula();
      }

      /* ================= effetti (rAF unico) ================= */
      function tick(t) {
        effetti = effetti.filter(e => {
          const u = (t - e.t0) / e.dur;
          if (u < 0) return true;
          e.draw(Math.min(1, u));
          if (u >= 1) { if (e.fine) e.fine(); return false; }
          return true;
        });
        rafFx = effetti.length ? requestAnimationFrame(tick) : 0;
      }
      function effetto(e) { e.t0 = e.t0 || performance.now(); effetti.push(e); if (!rafFx) rafFx = requestAnimationFrame(tick); }
      function impulso(gruppo, cx0, cy0, colore, rMax) {
        const c = el('circle', { cx: cx0, cy: cy0, r: 6, fill: 'none', stroke: colore, 'stroke-width': 3 }); gruppo.appendChild(c);
        effetto({ dur: 650, draw: u => { c.setAttribute('r', 6 + (rMax - 6) * (1 - (1 - u) * (1 - u))); c.setAttribute('opacity', .95 * (1 - u)); }, fine: () => c.remove() });
      }
      function fuoco(cx0, cy0, ritardo) {
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--avviso)'];
        const t0 = performance.now() + ritardo;
        for (let i = 0; i < 14; i++) {
          const a = i / 14 * Math.PI * 2 + Math.random() * .3, v = 26 + Math.random() * 16;
          const c = el('circle', { cx: cx0, cy: cy0, r: 2.8, fill: COL[i % COL.length], opacity: 0 }); gFx.appendChild(c);
          effetto({ t0, dur: 820, draw: u => { const e = 1 - (1 - u) * (1 - u) * (1 - u);
            c.setAttribute('cx', cx0 + Math.cos(a) * v * e); c.setAttribute('cy', cy0 + Math.sin(a) * v * e + 16 * u * u); c.setAttribute('opacity', 1 - u); }, fine: () => c.remove() });
        }
      }
      function festa() {
        fuoco(92, 70, 0); fuoco(300, 52, 180); fuoco(214, 34, 360);
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)'];
        effetto({ dur: 1400, draw: u => lampadine.forEach((l, i) => { l.setAttribute('fill', COL[(i + Math.floor(u * 16)) % 4]); l.setAttribute('r', 2.4 + 1.4 * Math.abs(Math.sin(u * 12 + i))); }),
          fine: () => lampadine.forEach(l => { l.setAttribute('fill', 'var(--avviso)'); l.setAttribute('r', 2.4); }) });
      }

      /* ================= movimento della cabina ================= */
      function scatta(a) { const p = L().passo; return norm(Math.round(norm(a) / p) * p); }
      function porta(a) {
        a = scatta(a);
        cancelAnimationFrame(rafGiro);
        if (Math.abs(a - x) < 1e-9) return;
        const delta = ((a - x) % 360 + 540) % 360 - 180;
        if (x + delta < -1e-9 || x + delta >= 360 - 1e-9) {         /* ha passato lo 0°: un giro completo */
          giroFino = performance.now() + 1600;
          clearTimeout(timerGiro); timerGiro = setTimeout(aggiorna, 1650);
        }
        marcaVisto(x, a); x = a;
        disegnaTraccia(); aggiorna();
      }
      function angoloDa(ev) {
        const r = svg.getBoundingClientRect();
        if (!r.width) return null;
        const sx = (ev.clientX - r.left) * W / r.width, sy = (ev.clientY - r.top) * H / r.height;
        if (Math.hypot(sx - CX, sy - CY) < 20) return null;
        return Math.atan2(CY - sy, sx - CX) / RAD;
      }
      function giu(ev) {
        if (controllo) return;
        const a = angoloDa(ev); if (a === null) return;
        trascino = true; svg.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        porta(a); ev.preventDefault();
      }
      function muovi(ev) { if (!trascino) return; const a = angoloDa(ev); if (a !== null) porta(a); ev.preventDefault(); }
      function molla() { if (!trascino) return; trascino = false; svg.classList.remove('presa'); }

      function giraA(a, dur, poi) {                      /* rotazione animata, senza lasciare traccia */
        cancelAnimationFrame(rafGiro);
        const da = x, delta = ((a - da) % 360 + 540) % 360 - 180, t0 = performance.now();
        (function passo(t) {
          const u = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - u, 3);
          x = norm(da + delta * e); if (u >= 1) x = norm(a);
          aggiorna();
          if (u < 1) rafGiro = requestAnimationFrame(passo); else if (poi) poi();
        })(t0);
      }

      /* ================= segnaposto ================= */
      function segna() {
        if (vinto || controllo) return;
        const vi = vicino();
        segni.forEach(s => { s.stato = ''; });
        if (vi >= 0) { segni.splice(vi, 1); msg.textContent = ''; msg.className = 'lab-messaggio'; }
        else if (segni.length >= 6) { msg.textContent = 'Hai già 6 segnaposto: togline qualcuno prima di aggiungerne altri.'; msg.className = 'lab-messaggio no'; }
        else { segni.push({ a: x, stato: '', nuovo: true }); segni.sort((p, q) => p.a - q.a); msg.textContent = ''; msg.className = 'lab-messaggio'; }
        disegnaSegni(); aggiorna();
      }

      /* ================= «Ho finito»: la cabina fantasma fa un giro ================= */
      function controlla() {
        if (vinto || controllo) return;
        const l = L();
        if (!segni.length) {
          msg.textContent = 'Nessun segnaposto: porta la cabina sulla linea e premi «Segna qui».'; msg.className = 'lab-messaggio no'; return;
        }
        /* ogni segnaposto è giusto se è entro la tolleranza da una soluzione */
        segni.forEach(s => { s.stato = l.sol.some(z => dist(s.a, z) <= l.tol + 1e-9) ? 'ok' : 'no'; s.visto = false; });
        const eventi = [];
        l.sol.forEach(z => { const s = segni.find(t => t.stato === 'ok' && dist(t.a, z) <= l.tol + 1e-9);
          eventi.push({ a: norm(z), tipo: s ? 'ok' : 'manca', s }); });
        segni.filter(s => s.stato === 'no').forEach(s => eventi.push({ a: s.a, tipo: 'no', s }));
        eventi.sort((p, q) => p.a - q.a);
        const esito = { giusti: segni.filter(s => s.stato === 'ok').length, sbagliati: segni.filter(s => s.stato === 'no'), mancanti: eventi.filter(e => e.tipo === 'manca').length };
        /* durante il giro i segnaposto tornano neutri e si accendono al passaggio */
        const stati = segni.map(s => s.stato); segni.forEach(s => { s.stato = ''; }); disegnaSegni();
        controllo = true; msg.textContent = 'Controllo: la cabina fantasma fa un giro…'; msg.className = 'lab-messaggio';
        aggiorna();
        fantasma.setAttribute('opacity', .95); fantasmaG.setAttribute('opacity', .9);
        const dur = 1300, t0 = performance.now(); let prossimo = 0, ultimoI = 0;
        cancelAnimationFrame(rafGiro);
        (function passo(t) {
          const u = Math.min(1, (t - t0) / dur), a = 360 * u;
          const fx = px(a, R), fy = py(a, R), v = fz(l.f, a);
          fantasma.setAttribute('transform', `translate(${fx.toFixed(1)} ${fy.toFixed(1)})`);
          fantasmaG.setAttribute('cx', gx(a)); fantasmaG.setAttribute('cy', gy(v));
          const i = Math.min(720, Math.round(a * 2));
          for (let j = ultimoI; j <= i; j++) visto[j] = 1;
          ultimoI = i; if (i >= 720) visto[0] = 1;
          disegnaTraccia();
          while (prossimo < eventi.length && eventi[prossimo].a <= a + 1e-9) {
            const e = eventi[prossimo++];
            if (e.tipo === 'manca') { impulso(gFx, px(e.a, R), py(e.a, R), 'var(--no)', 30); impulso(graf, gx(e.a), gy(l.k), 'var(--no)', 18); }
            else { const k = segni.indexOf(e.s); e.s.stato = stati[k]; e.s.lampo = e.tipo === 'ok' ? 'acceso' : 'rosso'; disegnaSegni(); if (e.tipo === 'ok') impulso(gFx, px(e.a, R), py(e.a, R), 'var(--ok)', 26); }
          }
          if (u < 1) rafGiro = requestAnimationFrame(passo);
          else {
            fantasma.setAttribute('opacity', 0); fantasmaG.setAttribute('opacity', 0);
            segni.forEach((s, k) => { s.stato = stati[k]; }); disegnaSegni();
            controllo = false; concludi(esito);
          }
        })(t0);
      }

      function concludi(e) {
        const l = L();
        if (!e.sbagliati.length && !e.mancanti) {
          vinto = true;
          ctx.completato(livello);
          msg.innerHTML = '<span class="vinto">' + (l.sol.length === 1 ? 'Trovata, ed è l\'unica: ' : 'Trovate tutte: ') + segni.map(s => ctx.tex(gradiTex(s.a))).join(' e ') + '</span>';
          msg.className = 'lab-messaggio ok';
          b.ric.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
          aggiorna(); festa();
          ctx.zenone(l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
          return;
        }
        /* il messaggio dice quanti, non dove */
        const parti = [];
        if (e.giusti) parti.push(e.giusti === 1 ? '1 segnaposto giusto' : e.giusti + ' segnaposto giusti');
        if (e.sbagliati.length) parti.push(e.sbagliati.length === 1 ? '1 fuori posto (in rosso)' : e.sbagliati.length + ' fuori posto (in rosso)');
        let testo = parti.join(', ') + '.';
        if (e.mancanti) testo += e.mancanti === 1 ? ' E la cabina fantasma è passata sulla linea in un punto senza segno.' : ' E la cabina fantasma è passata sulla linea in punti senza segno.';
        msg.textContent = testo.charAt(0).toUpperCase() + testo.slice(1); msg.className = 'lab-messaggio no';

        /* Zenone interviene solo sugli errori tipici */
        const vicinoA = (a, v) => Math.abs(fz(l.f, a) - v) < 0.06;
        let zen = null;
        const sbag = e.sbagliati.map(s => s.a);
        if (l.f === 'sin' && l.k < 0 && sbag.some(a => Math.sin(a * RAD) > 0.05))
          zen = 'Quel segno sta sopra il perno, ma k è negativo: la quota giusta è sotto la linea orizzontale del perno.';
        else if (l.f === 'cos' && sbag.some(a => Math.abs(Math.sin(a * RAD) - l.k) < 0.06))
          zen = 'Hai cercato la quota, ma qui conta la distanza orizzontale: la cabina deve passare sulla linea verticale del fotografo.';
        else if (l.f === 'cos' && sbag.some(a => vicinoA(a, -l.k)))
          zen = 'Il fotografo sta a sinistra del perno, dove il coseno è negativo. Il tuo segno è a destra.';
        else if (l.f === 'sin' && l.k !== 0 && sbag.some(a => vicinoA(a, -l.k)))
          zen = 'Quel segno sta alla quota opposta, −k. Le due soluzioni stanno dalla stessa parte del perno, sopra o sotto, una a destra e una a sinistra.';
        else if (l.cifre === 1 && sbag.length)
          zen = 'Il cartello ha una cifra sola, quindi a occhio non basta: parti da α = 17,5° e ragiona sulla simmetria della ruota.';
        else if (e.mancanti && !sbag.length && e.giusti >= 1)
          zen = l.f === 'cos' ? 'Ne manca una. In un giro la cabina passa sulla linea del fotografo due volte: una sopra il perno e una sotto.'
            : l.k === 0 ? 'Ne manca una. A quota zero la cabina ci passa due volte in un giro: una a destra del perno e una a sinistra.'
            : 'Ne hai trovata una. In un giro la cabina passa due volte per quella quota: una salendo e una scendendo.';
        if (zen) ctx.zenone(zen, { tipo: 'errore', espressione: 'pensa', durata: 8000 });
        aggiorna();
      }

      /* ================= livelli ================= */
      function avviaLivello(n) {
        cancelAnimationFrame(rafGiro);
        livello = n; segni = []; vinto = false; controllo = false; visto.fill(0);
        fantasma.setAttribute('opacity', 0); fantasmaG.setAttribute('opacity', 0);
        msg.textContent = ''; msg.className = 'lab-messaggio';
        b.ric.textContent = 'Ricomincia';
        disegnaLivello(); disegnaSegni(); disegnaTraccia();
        const a0 = PARTENZA[n] || 0;
        giraA(a0, 520, () => { marcaVisto(x, x); disegnaTraccia(); aggiorna(); });
      }

      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);
      svg.addEventListener('keydown', ev => {
        if (controllo) return;
        const p = L().passo;
        if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') { porta(x + p); ev.preventDefault(); }
        else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') { porta(x - p); ev.preventDefault(); }
        else if (ev.key === 'Enter' || ev.key === ' ') { segna(); ev.preventDefault(); }
      });
      b.meno.addEventListener('click', () => { if (!controllo) porta(x - L().passo); });
      b.piu.addEventListener('click', () => { if (!controllo) porta(x + L().passo); });
      b.segna.addEventListener('click', segna);
      b.fine.addEventListener('click', controlla);
      b.ric.addEventListener('click', () => { if (controllo) return; avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello); });
      b.aiuto.addEventListener('click', () => { const l = L(); ctx.zenone(l.alfaDato ? AIUTO_ALFA : l.f === 'cos' ? AIUTO_COS : AIUTO_SIN, { tipo: 'suggerimento', espressione: 'pensa', durata: 14000 }); });

      avviaLivello(livello);

      return function smonta() {
        cancelAnimationFrame(rafGiro); cancelAnimationFrame(rafFx); clearTimeout(timerGiro);
        effetti = [];
        window.removeEventListener('pointermove', muovi, { passive: false });
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
