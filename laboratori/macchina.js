/* Laboratorio «La macchina sulla curva» — la derivata è la pendenza della tangente.
   Si trascina una macchinina lungo una strada (il grafico di f): la macchina si inclina
   come la strada, dal fanale esce un fascio di luce che è la retta tangente, e un
   tachimetro legge f'(x). Segno ↔ salita/discesa, zero ↔ massimi e minimi, valore ↔ ripidità.
   Contratto e regole: SCHEMA-LAB.md; modello di stile: laboratori/bilancia.js. */
(function () {
  const STILE = `
    .lab-macchina .compito { max-width: 760px; margin: 0 auto; text-align: center; padding: 4px 14px 10px; font-size: .95rem; line-height: 1.55; color: var(--testo2); }
    .lab-macchina .compito .katex { font-size: 1em; }
    .lab-macchina .lab-scena { max-width: 760px; margin: 0 auto; background: linear-gradient(180deg, var(--sup2), var(--sup)); border-radius: 12px; overflow: hidden; touch-action: none; }
    .lab-macchina .lab-scena svg { display: block; width: 100%; height: auto; }
    .lab-macchina .lab-scena svg:focus-visible { outline: 2px solid var(--accento); outline-offset: -2px; }
    .lab-macchina .pannello-d { max-width: 760px; margin: 8px auto 0; }
    .lab-macchina .pannello-d svg { display: block; width: 100%; height: auto; }
    .lab-macchina .dati { max-width: 760px; margin: 0 auto; display: flex; gap: 4px 24px; flex-wrap: wrap; justify-content: center; padding: 12px 12px 0; font-size: 1.1rem; }
    .lab-macchina .lab-messaggio, .lab-macchina .lab-barra { max-width: 760px; margin: 0 auto; }
    .lab-macchina .gruppo-stima { display: flex; align-items: center; gap: 6px; }
    .lab-macchina [hidden] { display: none !important; }
    .lab-macchina .stima { width: 92px; padding: 8px 10px; min-height: 40px; border-radius: 9px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo); font-family: var(--font); font-size: 1.05rem; font-weight: 700; text-align: center; }
    .lab-macchina .stima.sbagliata { border-color: var(--no); animation: lab-mac-scuoti .4s; }
    @keyframes lab-mac-scuoti { 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }
    .lab-macchina .vinto { display: inline-block; animation: lab-mac-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-mac-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-macchina .terreno { fill: var(--s3); opacity: .14; }
    .lab-macchina .griglia { stroke: var(--bordo); stroke-width: 1; opacity: .9; }
    .lab-macchina .asse { stroke: var(--testo2); stroke-width: 1.5; opacity: .7; }
    .lab-macchina .numero { font: 11px var(--font); fill: var(--testo2); opacity: .85; }
    .lab-macchina .strada { fill: none; stroke: var(--testo); stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; opacity: .85; }
    .lab-macchina .mezzeria { fill: none; stroke: var(--sup); stroke-width: 1.7; stroke-dasharray: 9 12; opacity: .8; }
    .lab-macchina .palo { stroke: var(--testo2); stroke-width: 3; stroke-linecap: round; opacity: .55; }
    .lab-macchina .tangente { stroke: #eab126; stroke-width: 2; stroke-dasharray: 7 7; opacity: .45; }
    .lab-macchina .fascio-asse { stroke: #ffd166; stroke-width: 1.6; opacity: .55; }
    .lab-macchina .scocca { fill: var(--s1); stroke: rgba(0,0,0,.32); stroke-width: 1.3; }
    .lab-macchina .vetro { fill: #dcebff; opacity: .9; }
    .lab-macchina .gomma { fill: #24252d; }
    .lab-macchina .cerchione { fill: #9aa0ad; }
    .lab-macchina .fanale { fill: #ffe9a8; stroke: rgba(0,0,0,.25); stroke-width: 1; }
    .lab-macchina .tach-fondo { fill: var(--sup); stroke: var(--bordo2); stroke-width: 1.2; }
    .lab-macchina .tach-arco { fill: none; stroke-width: 8; }
    .lab-macchina .tach-tacca { stroke: var(--testo2); stroke-width: 1.4; opacity: .65; }
    .lab-macchina .tach-lab { font: 10px var(--font); fill: var(--testo2); text-anchor: middle; }
    .lab-macchina .tach-num { font: 700 14px var(--font); text-anchor: middle; }
    .lab-macchina .tach-coperto { font: 700 30px var(--font); fill: var(--testo2); text-anchor: middle; opacity: .8; }
    .lab-macchina .lancetta { stroke-width: 4; stroke-linecap: round; }
    .lab-macchina .perno { fill: var(--testo); }
    .lab-macchina .pd-fondo { fill: var(--sup2); stroke: var(--bordo); stroke-width: 1; }
    .lab-macchina .pd-zero { stroke: var(--testo2); stroke-width: 1.4; stroke-dasharray: 6 6; opacity: .7; }
    .lab-macchina .pd-traccia { fill: none; stroke: var(--accento); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .lab-macchina .pd-completa { fill: none; stroke: var(--ok); stroke-width: 2.5; stroke-dasharray: 5 6; opacity: .9; }
    .lab-macchina .pd-punto { fill: var(--accento); stroke: var(--sup); stroke-width: 2; }
    .lab-macchina .pd-guida { stroke: var(--accento); stroke-width: 1; stroke-dasharray: 3 4; opacity: .5; }
    .lab-macchina .pd-titolo { font: italic 700 13px var(--font); fill: var(--testo2); }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, t) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };
  const morsa = (v, a, b) => (v < a ? a : (v > b ? b : v));
  const mostra = (n, si) => { n.style.display = si ? '' : 'none'; };

  /* derivata numerica: rapporto incrementale simmetrico */
  const H = 0.001;
  const der = (f, x) => (f(x + H) - f(x - H)) / (2 * H);

  const meno = s => String(s).replace(/-/g, '−');
  function num(v, d) {
    if (d == null) d = 2;
    let s = v.toFixed(d);
    if (parseFloat(s) === 0) s = (0).toFixed(d);
    return meno(s).replace('.', ',');
  }
  function texNum(v, d) {
    if (d == null) d = 2;
    let s = v.toFixed(d);
    if (parseFloat(s) === 0) s = (0).toFixed(d);
    return s.replace('.', '{,}');
  }

  /* geometria della scena */
  const W = 600, ALT = 340, CX = 300, BANDA_ALTA = 150, BANDA_BASSA = 330, PLOT_W = 540;
  const BANDA_CY = (BANDA_ALTA + BANDA_BASSA) / 2, BANDA_H = BANDA_BASSA - BANDA_ALTA;
  /* tachimetro */
  const GX = 515, GY = 72, GR = 42;

  const R2 = Math.SQRT2;

  const LIVELLI = [
    {
      f: x => x * x / 4 - 1, tex: 'f(x) = \\frac{x^2}{4} - 1', dom: [-4, 4], start: -3.2,
      compito: 'Ferma la macchina dove la strada è piatta, cioè dove la pendenza vale 0. Va bene se il tachimetro segna fra −0,15 e +0,15.',
      verifica: { tipo: 'pendenza', bersaglio: 0, tol: .15 },
      sbaglio: (x, m) => m > 0
        ? 'Il tachimetro segna +' + num(m) + ': stai ancora salendo. Piatta vuol dire lancetta ferma sullo zero.'
        : 'Il tachimetro segna ' + num(m) + ': stai ancora scendendo. Cerca il punto in cui la lancetta passa per lo zero.',
      commento: 'Piatta vuol dire pendenza zero: lì la strada ha finito di scendere e non ha ancora cominciato a salire. È il punto più basso, e la derivata ci vale 0.'
    },
    {
      f: x => -x * x / 4 + 2, tex: 'f(x) = -\\frac{x^2}{4} + 2', dom: [-3.6, 3.6], start: -3.2,
      compito: 'Ferma la macchina in cima alla salita: dove ha smesso di salire e non è ancora scesa. Tolleranza: il tachimetro fra −0,15 e +0,15.',
      verifica: { tipo: 'pendenza', bersaglio: 0, tol: .15 },
      sbaglio: (x, m) => m > 0
        ? 'Segna +' + num(m) + ': la lancetta è ancora nel verde, quindi la cima è più avanti.'
        : 'Segna ' + num(m) + ': la lancetta è già nel rosso, la cima l\'hai passata.',
      commento: 'In cima la lancetta passa dal verde al rosso attraversando lo zero: prima salivi, subito dopo scendi. Massimo: f′ = 0.'
    },
    {
      f: x => x * x * x / 6 - x, tex: 'f(x) = \\frac{x^3}{6} - x', dom: [-2.8, 2.8], start: -2.7,
      compito: 'Questa strada ha due punti piatti. Fermati su quello in alto, il massimo. Tolleranza: 0,2 su $x$.',
      verifica: { tipo: 'x', bersaglio: -R2, tol: .2 },
      sbaglio: (x, m) => Math.abs(x - R2) < .5
        ? 'Anche quello è un punto piatto, ma è il fondo della conca: subito dopo la strada risale. Il massimo è l\'altro.'
        : 'La lancetta segna ' + num(m) + '. Su un punto piatto deve segnare zero: rallenta e guardala mentre cambia colore.',
      commento: 'Il massimo è a x = −√2 ≈ −1,41: prima la lancetta è verde, subito dopo è rossa, e nel mezzo passa per lo zero.'
    },
    {
      f: x => x * x * x / 6 - x, tex: 'f(x) = \\frac{x^3}{6} - x', dom: [-2.8, 2.8], start: 2.7,
      compito: 'Stessa strada: adesso fermati sull\'altro punto piatto, quello in fondo alla conca (il minimo). Tolleranza: 0,2 su $x$.',
      verifica: { tipo: 'x', bersaglio: R2, tol: .2 },
      sbaglio: (x, m) => Math.abs(x + R2) < .5
        ? 'Quello è il punto piatto in cima, il massimo: da lì la strada scende. Il minimo è dall\'altra parte.'
        : 'La lancetta segna ' + num(m) + '. Cerca dove passa per lo zero risalendo dal rosso al verde.',
      commento: 'Il minimo è a x = √2 ≈ 1,41: la lancetta torna nel verde passando per lo zero. Due punti piatti sulla stessa strada, uno in cima e uno in fondo.'
    },
    {
      f: x => x * x / 4, tex: 'f(x) = \\frac{x^2}{4}', dom: [-3.6, 3.6], start: -3.2,
      compito: 'Fermati dove la pendenza vale 1: un quadretto in su per ogni quadretto verso destra, cioè fascio di luce a 45°. Tolleranza: 0,1 sul tachimetro.',
      verifica: { tipo: 'pendenza', bersaglio: 1, tol: .1 },
      sbaglio: (x, m) => 'Il tachimetro segna ' + num(m) + ', ti serve 1,00. ' + (m > 1 ? 'Qui la strada è già più ripida di 45°.' : 'Qui la strada sale meno di 45° (o non sale affatto).'),
      commento: 'Pendenza 1 vuol dire 45°: il fascio sale esattamente quanto avanza. Su questa strada capita a x = 2.'
    },
    {
      f: x => Math.sin(x), tex: 'f(x) = \\sin x', dom: [-1, 7], start: 0,
      compito: 'Fermati nel punto in cui la strada scende più ripida che mai. Tolleranza: 0,2 su $x$.',
      verifica: { tipo: 'x', bersaglio: Math.PI, tol: .2 },
      sbaglio: (x, m) => m >= 0
        ? 'Qui la lancetta segna ' + num(m) + ': non stai nemmeno scendendo. La discesa più ripida è dove la lancetta arriva più in basso di tutte.'
        : 'Segni ' + num(m) + ': scendi, ma non è il punto peggiore. Percorri la discesa guardando fin dove scende la lancetta.',
      commento: 'La discesa più ripida è a x = π, dove f′ = cos π = −1. Occhio: lì la strada non è né in cima né in fondo — la derivata è al minimo, non la funzione.'
    },
    {
      f: x => x * x * x / 6 - x, tex: 'f(x) = \\frac{x^3}{6} - x', dom: [-2.8, 2.8], start: 2.4,
      compito: 'Su questa strada ci sono due punti con pendenza −0,5. Fermati su quello a sinistra dell\'origine. Tolleranza: 0,15 su $x$.',
      verifica: { tipo: 'x', bersaglio: -1, tol: .15 },
      sbaglio: (x, m) => Math.abs(x - 1) < .35
        ? 'La pendenza è quella giusta, ma questo è il punto a destra dell\'origine: ce n\'è un altro con la stessa pendenza dall\'altra parte.'
        : 'Il tachimetro segna ' + num(m) + ', serve −0,50, e a sinistra dello zero.',
      commento: 'La stessa pendenza −0,5 compare a x = −1 e a x = 1: sapere quanto sale la strada non basta a dire dove sei.'
    },
    {
      f: x => x * x / 3 - x, tex: 'f(x) = \\frac{x^2}{3} - x', dom: [-1.5, 4], start: 3, fisso: true, coperto: true,
      compito: 'Tachimetro coperto. La macchina è ferma dove l\'ho messa io: guarda il fascio di luce e stima la pendenza, poi scrivila. Tolleranza: 0,3.',
      verifica: { tipo: 'stima', tol: .3 },
      commento: 'Il fascio saliva di un quadretto ogni quadretto verso destra: pendenza 1, cioè 45°. Il tachimetro adesso è scoperto e dice la stessa cosa.'
    },
    {
      f: x => x * x / 3 - x, tex: 'f(x) = \\frac{x^2}{3} - x', dom: [-1.5, 4], start: -0.75, fisso: true, coperto: true,
      compito: 'Ancora coperto, altro punto. Prima guarda da che parte punta il fascio, poi quanto è ripido. Tolleranza: 0,25.',
      verifica: { tipo: 'stima', tol: .25 },
      commento: 'Il fascio scendeva di un quadretto e mezzo ogni quadretto verso destra: pendenza −1,5. Il segno lo dà la direzione, il numero la ripidità.'
    },
    {
      f: x => x * x * x / 6 - x, tex: 'f(x) = \\frac{x^3}{6} - x', dom: [-2.8, 2.8], start: -2.8, derivata: true,
      compito: 'Percorri tutta la strada, da un capo all\'altro senza saltare pezzi: sotto resta il segno di quello che diceva il tachimetro.',
      verifica: { tipo: 'percorso' }, pulsante: 'Ho finito',
      commento: 'Ecco il grafico della derivata: una parabola. Dove sta sopra lo zero la strada sale, dove sta sotto scende, e la taglia proprio nei due punti piatti. Il punto più basso della parabola è dove la discesa era più ripida.'
    }
  ];

  COMPASSO.registraLab({
    id: 'macchina',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-macchina')) { const s = document.createElement('style'); s.id = 'stile-lab-macchina'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-macchina');
      radice.innerHTML = `
        <div class="compito"></div>
        <div class="lab-scena"></div>
        <div class="pannello-d" hidden></div>
        <div class="dati"></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn primario b-fermati">Fermati qui</button>
          <span class="gruppo-stima" hidden><input type="text" class="stima" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="es. 0,5" aria-label="La pendenza che hai stimato"><button type="button" class="btn primario b-verifica">Verifica</button></span>
          <button type="button" class="btn piccolo b-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo b-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena'), pannelloD = radice.querySelector('.pannello-d');
      const compitoEl = radice.querySelector('.compito'), datiEl = radice.querySelector('.dati');
      const msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const bFermati = radice.querySelector('.b-fermati'), gruppoStima = radice.querySelector('.gruppo-stima');
      const campo = radice.querySelector('.stima'), bVerifica = radice.querySelector('.b-verifica');
      const bRic = radice.querySelector('.b-ricomincia'), bAiuto = radice.querySelector('.b-aiuto');

      /* ---------- stato ---------- */
      let livello = 0, L = LIVELLI[0], vista = { U: 50, x0: 0, y0: 0 };
      let xCorr = 0, finito = false, svelato = false, trascino = false, scarto = 0;
      let bin = [], nBin = 0, passoBin = 1, dvista = null, raf = null, ultimiDati = '';
      const timers = [];
      const attesa = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

      const PX = x => CX + (x - vista.x0) * vista.U;
      const PY = y => BANDA_CY - (y - vista.y0) * vista.U;
      const invX = sx => vista.x0 + (sx - CX) / vista.U;
      const invY = sy => vista.y0 + (BANDA_CY - sy) / vista.U;

      /* ---------- scena ---------- */
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + ALT, tabindex: '0', role: 'img', 'aria-label': 'Una strada curva con una macchinina da trascinare e un tachimetro della pendenza' });
      scena.appendChild(svg);
      const defs = el('defs');
      const grad = el('linearGradient', { id: 'lm-fascio', x1: '0', y1: '0', x2: '1', y2: '0' });
      grad.appendChild(el('stop', { offset: '0', 'stop-color': '#ffd166', 'stop-opacity': '.55' }));
      grad.appendChild(el('stop', { offset: '1', 'stop-color': '#ffd166', 'stop-opacity': '0' }));
      defs.appendChild(grad); svg.appendChild(defs);

      const gTerreno = el('g'), gGriglia = el('g'), gAssi = el('g'), gStrada = el('g'), gAuto = el('g'), gTach = el('g');
      [gTerreno, gGriglia, gAssi, gStrada, gAuto, gTach].forEach(g => svg.appendChild(g));

      /* ---------- la macchinina (costruita una volta, il punto di contatto è l'origine) ---------- */
      gAuto.appendChild(el('line', { class: 'tangente', x1: -140, y1: 0, x2: 260, y2: 0 }));
      gAuto.appendChild(el('polygon', { points: '32,-18 258,-48 258,12', fill: 'url(#lm-fascio)' }));
      gAuto.appendChild(el('line', { class: 'fascio-asse', x1: 32, y1: -18, x2: 258, y2: -18 }));
      gAuto.appendChild(el('ellipse', { cx: 1, cy: 2, rx: 30, ry: 4, fill: '#000', opacity: .16 }));
      gAuto.appendChild(el('path', { class: 'scocca', d: 'M-14 -28 L-8 -41 L11 -41 L17 -28 Z' }));
      gAuto.appendChild(el('path', { class: 'vetro', d: 'M-9 -29 L-5 -38 L9 -38 L13 -29 Z' }));
      gAuto.appendChild(el('rect', { class: 'scocca', x: -30, y: -29, width: 62, height: 19, rx: 6 }));
      [-17, 17].forEach(cx => {
        gAuto.appendChild(el('circle', { class: 'gomma', cx: cx, cy: -9, r: 9 }));
        gAuto.appendChild(el('circle', { class: 'cerchione', cx: cx, cy: -9, r: 3.5 }));
      });
      gAuto.appendChild(el('circle', { class: 'fanale', cx: 29, cy: -18, r: 4.6 }));

      /* ---------- tachimetro ---------- */
      const puntoG = (v, r) => { const t = (180 - 30 * (v + 3)) * Math.PI / 180; return [GX + r * Math.cos(t), GY - r * Math.sin(t)]; };
      const arcoG = (v1, v2, r) => { const A = puntoG(v1, r), B = puntoG(v2, r); return 'M' + A[0].toFixed(1) + ' ' + A[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + B[0].toFixed(1) + ' ' + B[1].toFixed(1); };
      const GIALLO = '#e0a92b';
      gTach.appendChild(el('rect', { class: 'tach-fondo', x: 436, y: 6, width: 158, height: 104, rx: 12 }));
      const gQuadrante = el('g');
      gQuadrante.appendChild(el('path', { class: 'tach-arco', d: arcoG(-3, -0.06, GR), stroke: 'var(--no)', opacity: .75 }));
      gQuadrante.appendChild(el('path', { class: 'tach-arco', d: arcoG(-0.06, 0.06, GR), stroke: GIALLO }));
      gQuadrante.appendChild(el('path', { class: 'tach-arco', d: arcoG(0.06, 3, GR), stroke: 'var(--ok)', opacity: .75 }));
      for (let v = -3; v <= 3; v++) {
        const A = puntoG(v, GR - 7), B = puntoG(v, GR - 13);
        gQuadrante.appendChild(el('line', { class: 'tach-tacca', x1: A[0], y1: A[1], x2: B[0], y2: B[1] }));
      }
      gQuadrante.appendChild(el('text', { class: 'tach-lab', x: GX - GR - 2, y: GY + 14 }, '−3'));
      gQuadrante.appendChild(el('text', { class: 'tach-lab', x: GX + GR + 2, y: GY + 14 }, '+3'));
      const lancetta = el('line', { class: 'lancetta', x1: GX, y1: GY, x2: GX, y2: GY - (GR - 9) });
      gQuadrante.appendChild(lancetta);
      gQuadrante.appendChild(el('circle', { class: 'perno', cx: GX, cy: GY, r: 5 }));
      const numTach = el('text', { class: 'tach-num', x: GX, y: 103 }, 'f′(x) = 0,00');
      gQuadrante.appendChild(numTach);
      gTach.appendChild(gQuadrante);
      const gCoperto = el('g');
      gCoperto.appendChild(el('rect', { x: 444, y: 14, width: 142, height: 88, rx: 9, fill: 'var(--sup2)', stroke: 'var(--bordo2)', 'stroke-width': 1.2, 'stroke-dasharray': '6 5' }));
      gCoperto.appendChild(el('text', { class: 'tach-coperto', x: GX, y: 62 }, '?'));
      gCoperto.appendChild(el('text', { class: 'tach-lab', x: GX, y: 84 }, 'tachimetro coperto'));
      gTach.appendChild(gCoperto);

      /* ---------- pannello della derivata (solo l'ultimo livello) ---------- */
      const svgD = el('svg', { viewBox: '0 0 600 180', role: 'img', 'aria-label': 'Il grafico della derivata che si costruisce mentre guidi' });
      pannelloD.appendChild(svgD);
      svgD.appendChild(el('rect', { class: 'pd-fondo', x: 2, y: 2, width: 596, height: 176, rx: 10 }));
      const gDfondo = el('g'), gDtraccia = el('g');
      svgD.appendChild(gDfondo); svgD.appendChild(gDtraccia);
      svgD.appendChild(el('text', { class: 'pd-titolo', x: 14, y: 22 }, 'f′(x)'));

      let completoD = false;
      const PDY = v => 158 - (v - dvista.min) * dvista.k;
      const conMate = s => s.split('$').map((p, i) => (i % 2 ? ctx.tex(p) : p.replace(/&/g, '&amp;').replace(/</g, '&lt;'))).join('');

      /* ---------- la finestra sul piano: scala uguale sui due assi, o le pendenze mentirebbero ---------- */
      function calcolaVista(Lv) {
        const a = Lv.dom[0], b = Lv.dom[1];
        let ymin = Infinity, ymax = -Infinity;
        for (let i = 0; i <= 300; i++) { const y = Lv.f(a + (b - a) * i / 300); if (y < ymin) ymin = y; if (y > ymax) ymax = y; }
        const alt = Math.max(.8, ymax - ymin);
        return { U: Math.min(PLOT_W / (b - a), BANDA_H / alt), x0: (a + b) / 2, y0: (ymin + ymax) / 2 };
      }

      function camminoStrada() {
        const a = L.dom[0], b = L.dom[1];
        let d = '';
        for (let i = 0; i <= 240; i++) { const x = a + (b - a) * i / 240; d += (i ? 'L' : 'M') + PX(x).toFixed(1) + ' ' + PY(L.f(x)).toFixed(1) + ' '; }
        return d;
      }

      function disegnaFondo() {
        const a = L.dom[0], b = L.dom[1];
        svuota(gTerreno); svuota(gGriglia); svuota(gAssi); svuota(gStrada);
        const cammino = camminoStrada();
        gTerreno.appendChild(el('path', { class: 'terreno', d: cammino + 'L' + PX(b).toFixed(1) + ' 348 L' + PX(a).toFixed(1) + ' 348 Z' }));

        const XS = PX(a) - 16, XD = PX(b) + 16;
        for (let k = Math.ceil(a - 1e-6); k <= Math.floor(b + 1e-6); k++) gGriglia.appendChild(el('line', { class: 'griglia', x1: PX(k), y1: 64, x2: PX(k), y2: 336 }));
        const yAlto = invY(64), yBasso = invY(336);
        for (let k = Math.ceil(yBasso); k <= Math.floor(yAlto); k++) gGriglia.appendChild(el('line', { class: 'griglia', x1: XS, y1: PY(k), x2: XD, y2: PY(k) }));

        const yAsse = PY(0), xAsse = PX(0);
        const asseXvisibile = yAsse >= 64 && yAsse <= 336, asseYvisibile = xAsse >= XS && xAsse <= XD;
        if (asseXvisibile) gAssi.appendChild(el('line', { class: 'asse', x1: XS - 6, y1: yAsse, x2: XD + 6, y2: yAsse }));
        if (asseYvisibile) gAssi.appendChild(el('line', { class: 'asse', x1: xAsse, y1: 60, x2: xAsse, y2: 336 }));
        const passoEt = vista.U >= 52 ? 1 : 2;
        const yEt = asseXvisibile ? yAsse + 14 : 334;
        for (let k = Math.ceil(a - 1e-6); k <= Math.floor(b + 1e-6); k++) {
          if (k % passoEt || (k === 0 && asseYvisibile)) continue;
          gAssi.appendChild(el('text', { class: 'numero', x: PX(k), y: yEt, 'text-anchor': 'middle' }, meno(k)));
        }
        const xEt = asseYvisibile ? xAsse - 6 : Math.max(18, XS - 4);
        for (let k = Math.ceil(yBasso); k <= Math.floor(yAlto); k++) {
          if (k % passoEt || k === 0) continue;
          gAssi.appendChild(el('text', { class: 'numero', x: xEt, y: PY(k) + 4, 'text-anchor': 'end' }, meno(k)));
        }

        gStrada.appendChild(el('path', { class: 'strada', d: cammino }));
        gStrada.appendChild(el('path', { class: 'mezzeria', d: cammino }));
        [a, b].forEach(x => gStrada.appendChild(el('line', { class: 'palo', x1: PX(x), y1: PY(L.f(x)) - 4, x2: PX(x), y2: PY(L.f(x)) - 22 })));
      }

      /* ---------- pannello della derivata ---------- */
      function preparaD() {
        const a = L.dom[0], b = L.dom[1];
        let dmin = Infinity, dmax = -Infinity;
        for (let i = 0; i <= 200; i++) { const v = der(L.f, a + (b - a) * i / 200); if (v < dmin) dmin = v; if (v > dmax) dmax = v; }
        const pad = Math.max(.3, (dmax - dmin) * .12);
        dmin -= pad; dmax += pad;
        dvista = { min: dmin, max: dmax, k: 132 / (dmax - dmin) };
        svuota(gDfondo); svuota(gDtraccia);
        const XS = Math.max(16, PX(a) - 16), XD = Math.min(584, PX(b) + 16);
        for (let k = Math.ceil(dmin); k <= Math.floor(dmax); k++) {
          gDfondo.appendChild(el('line', { class: k === 0 ? 'pd-zero' : 'griglia', x1: XS, y1: PDY(k), x2: XD, y2: PDY(k) }));
          gDfondo.appendChild(el('text', { class: 'numero', x: XS - 4, y: PDY(k) + 4, 'text-anchor': 'end' }, meno(k)));
        }
        if (a < 0 && b > 0) gDfondo.appendChild(el('line', { class: 'asse', x1: PX(0), y1: 24, x2: PX(0), y2: 160 }));
      }
      function camminoTraccia() {
        const a = L.dom[0];
        let d = '', aperto = false;
        for (let i = 0; i < nBin; i++) {
          if (!bin[i]) { aperto = false; continue; }
          const x = a + (i + .5) * passoBin;
          d += (aperto ? 'L' : 'M') + PX(x).toFixed(1) + ' ' + PDY(der(L.f, x)).toFixed(1) + ' ';
          aperto = true;
        }
        return d;
      }
      function camminoDerivataPiena() {
        const a = L.dom[0], b = L.dom[1];
        let d = '';
        for (let i = 0; i <= 160; i++) { const x = a + (b - a) * i / 160; d += (i ? 'L' : 'M') + PX(x).toFixed(1) + ' ' + PDY(der(L.f, x)).toFixed(1) + ' '; }
        return d;
      }
      function aggiornaD(x) {
        svuota(gDtraccia);
        const t = camminoTraccia();
        if (t) gDtraccia.appendChild(el('path', { class: 'pd-traccia', d: t }));
        if (completoD) gDtraccia.appendChild(el('path', { class: 'pd-completa', d: camminoDerivataPiena() }));
        gDtraccia.appendChild(el('line', { class: 'pd-guida', x1: PX(x), y1: 24, x2: PX(x), y2: 160 }));
        gDtraccia.appendChild(el('circle', { class: 'pd-punto', cx: PX(x), cy: PDY(morsa(der(L.f, x), dvista.min, dvista.max)), r: 5 }));
      }

      /* ---------- disegno ---------- */
      function aggiornaTach(m) {
        const P = puntoG(morsa(m, -3, 3), GR - 9);
        lancetta.setAttribute('x2', P[0].toFixed(1)); lancetta.setAttribute('y2', P[1].toFixed(1));
        const col = Math.abs(m) < .05 ? GIALLO : (m > 0 ? 'var(--ok)' : 'var(--no)');
        lancetta.setAttribute('stroke', col);
        numTach.setAttribute('fill', col);
        numTach.textContent = 'f′(x) = ' + num(m);
      }
      function disegna() {
        const x = xCorr, m = der(L.f, x);
        gAuto.setAttribute('transform', 'translate(' + PX(x).toFixed(2) + ',' + PY(L.f(x)).toFixed(2) + ') rotate(' + (-Math.atan(m) * 180 / Math.PI).toFixed(2) + ')');
        const coperto = !!L.coperto && !svelato;
        mostra(gQuadrante, !coperto); mostra(gCoperto, coperto);
        if (!coperto) aggiornaTach(m);
        const chiave = L.tex + '|' + texNum(x);
        if (chiave !== ultimiDati) {
          ultimiDati = chiave;
          datiEl.innerHTML = '<span>' + ctx.tex(L.tex) + '</span><span>' + ctx.tex('x = ' + texNum(x)) + '</span>';
        }
        if (L.derivata) aggiornaD(x);
      }
      function chiediDisegno() { if (raf == null) raf = requestAnimationFrame(() => { raf = null; disegna(); }); }

      /* ---------- movimento ---------- */
      function segnaBin(x1, x2) {
        const a = L.dom[0];
        let i1 = morsa(Math.floor((x1 - a) / passoBin), 0, nBin - 1), i2 = morsa(Math.floor((x2 - a) / passoBin), 0, nBin - 1);
        if (i1 > i2) { const t = i1; i1 = i2; i2 = t; }
        for (let i = i1; i <= i2; i++) bin[i] = true;
      }
      function muoviA(x, continuo) {
        const prec = xCorr;
        xCorr = x;
        if (L.derivata) segnaBin(continuo ? prec : x, x);
        if (msg.classList.contains('no')) { msg.textContent = ''; msg.className = 'lab-messaggio'; }
        chiediDisegno();
        if (L.derivata && !finito && bin.every(Boolean)) completaPercorso();
      }

      /* ---------- esiti ---------- */
      function vinci(html, commento, espressione) {
        finito = true;
        bFermati.disabled = true; bVerifica.disabled = true; campo.disabled = true;
        msg.innerHTML = '<span class="vinto">' + html + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.completato(livello);
        ctx.zenone(commento, { espressione: espressione || 'felice', durata: 9000 });
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
      }
      function sbaglia(breve, lungo) {
        msg.textContent = breve;
        msg.className = 'lab-messaggio no';
        if (lungo) ctx.zenone(lungo, { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
      }
      function completaPercorso() {
        completoD = true;
        chiediDisegno();
        vinci('Strada percorsa tutta: ecco il grafico di ' + ctx.tex("f'(x)") + '.', L.commento, 'orgoglioso');
      }
      function controlla() {
        if (finito) return;
        const V = L.verifica, x = xCorr, m = der(L.f, x);
        if (V.tipo === 'percorso') {
          const mancano = bin.reduce((n, b) => n + (b ? 0 : 1), 0);
          if (mancano) sbaglia('Ti mancano ancora ' + mancano + ' pezzi di strada su ' + nBin + '.', 'Trascina la macchina senza staccare il dito: se salti da una parte all\'altra, i pezzi in mezzo restano vuoti.');
          else completaPercorso();
          return;
        }
        const ok = V.tipo === 'pendenza' ? Math.abs(m - V.bersaglio) <= V.tol : Math.abs(x - V.bersaglio) <= V.tol;
        if (ok) vinci('Fermata giusta: ' + ctx.tex('x = ' + texNum(x)) + ' con ' + ctx.tex("f'(x) = " + texNum(m)), L.commento, 'orgoglioso');
        else sbaglia('Non è questo il punto.', L.sbaglio(x, m));
      }
      function verificaStima() {
        if (finito) return;
        const grezzo = campo.value.replace(/−/g, '-').replace(',', '.').trim();
        const v = parseFloat(grezzo);
        if (!grezzo || !isFinite(v)) { scuoti(); sbaglia('Scrivi un numero, anche con la virgola.', 'La pendenza è un numero: quanto sale il fascio ogni passo verso destra. Se scende, mettici il meno davanti.'); return; }
        const vero = der(L.f, xCorr);
        if (Math.abs(v - vero) <= L.verifica.tol) {
          svelato = true; chiediDisegno();
          vinci('Stima accettata: la pendenza vera è ' + ctx.tex("f'(x) = " + texNum(vero)), L.commento, 'orgoglioso');
          return;
        }
        scuoti();
        let hint;
        if ((v >= 0) !== (vero >= 0)) hint = 'Il segno non torna: guarda se il fascio di luce, andando verso destra, punta in su o in giù.';
        else if (Math.abs(v) > Math.abs(vero)) hint = 'Hai esagerato: il fascio è meno ripido di così. Conta di quanti quadretti sale (o scende) quando avanza di un quadretto.';
        else hint = 'Sei rimasto sotto: il fascio è più ripido di così. Conta di quanti quadretti sale (o scende) quando avanza di un quadretto.';
        sbaglia('Non ci siamo.', hint);
      }
      function scuoti() { campo.classList.add('sbagliata'); attesa(() => campo.classList.remove('sbagliata'), 460); }

      function aiuto() {
        let t = 'Il fascio di luce è la retta tangente: tocca la strada nel punto dove sta la macchina e ha la sua stessa inclinazione. La lancetta dice quanto sale quel fascio ogni volta che avanzi di un passo verso destra: in salita il numero è positivo e la lancetta va nel verde, in discesa è negativo e va nel rosso, e più la strada è ripida più la lancetta si allontana dal centro. In cima a una salita e in fondo a una discesa, per un istante il fascio è orizzontale: lì la lancetta segna zero. Quel numero è f′(x), la derivata.';
        if (L.coperto) t += ' Con il tachimetro coperto si legge lo stesso, contando i quadretti: se il fascio, avanzando di un quadretto verso destra, sale di mezzo quadretto, la pendenza è 0,5.';
        if (L.derivata) t += ' Qui sotto ogni punto che lasci è alto quanto segnava la lancetta: passa dappertutto e comparirà il grafico della derivata.';
        return t;
      }

      /* ---------- livelli ---------- */
      function avviaLivello(n) {
        livello = n; L = LIVELLI[n];
        finito = false; svelato = false; trascino = false; completoD = false; ultimiDati = '';
        vista = calcolaVista(L);
        xCorr = L.start;
        compitoEl.innerHTML = conMate(L.compito);
        msg.textContent = ''; msg.className = 'lab-messaggio';
        const stima = L.verifica.tipo === 'stima';
        bFermati.hidden = stima; gruppoStima.hidden = !stima;
        bFermati.textContent = L.pulsante || 'Fermati qui';
        bFermati.disabled = false; bVerifica.disabled = false; campo.disabled = false; campo.value = '';
        bRic.textContent = 'Ricomincia';
        pannelloD.hidden = !L.derivata;
        if (L.derivata) {
          nBin = 56; passoBin = (L.dom[1] - L.dom[0]) / nBin;
          bin = new Array(nBin);
          for (let i = 0; i < nBin; i++) bin[i] = false;
          preparaD(); segnaBin(xCorr, xCorr);
        } else { nBin = 0; bin = []; }
        disegnaFondo();
        disegna();
        livEl.textContent = 'Livello ' + (n + 1) + ' di ' + LIVELLI.length;
      }

      /* ---------- il dito ---------- */
      const sxDa = ev => { const r = svg.getBoundingClientRect(); return (ev.clientX - r.left) / r.width * W; };
      const inStrada = x => morsa(x, L.dom[0], L.dom[1]);
      svg.addEventListener('pointerdown', ev => {
        if (L.fisso) return;
        const sx = sxDa(ev), xTocco = inStrada(invX(sx));
        const vicino = Math.abs(sx - PX(xCorr)) <= 70;
        trascino = true;
        scarto = vicino ? xCorr - xTocco : 0;
        if (!vicino) muoviA(xTocco, false);
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      });
      svg.addEventListener('pointermove', ev => { if (!trascino) return; muoviA(inStrada(invX(sxDa(ev)) + scarto), true); });
      const molla = () => { trascino = false; };
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('pointerleave', molla);
      svg.addEventListener('keydown', ev => {
        if (L.fisso) return;
        let verso = 0;
        if (ev.key === 'ArrowLeft') verso = -1; else if (ev.key === 'ArrowRight') verso = 1; else return;
        ev.preventDefault();
        muoviA(inStrada(xCorr + verso * (ev.shiftKey ? .01 : .05)), true);
      });

      bFermati.addEventListener('click', controlla);
      bVerifica.addEventListener('click', verificaStima);
      campo.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); verificaStima(); } });
      bRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      bAiuto.addEventListener('click', () => ctx.zenone(aiuto(), { tipo: 'suggerimento', espressione: 'pensa', durata: 14000 }));

      const completati = ctx.stato().livelli;
      let iniziale = completati.length ? Math.max.apply(null, completati) + 1 : 0;
      if (iniziale >= LIVELLI.length || iniziale < 0) iniziale = 0;
      avviaLivello(iniziale);

      return function smonta() {
        if (raf) cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
      };
    }
  });
})();
