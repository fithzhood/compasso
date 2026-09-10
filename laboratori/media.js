/* Laboratorio «La tavola in equilibrio» — la media è il baricentro dei dati.
   Una tavola graduata 0…20 su un fulcro trascinabile, i dati sono pesi uguali posati
   alla loro ascissa: la tavola sta in piano solo quando il fulcro è nella media.
   La mediana è una linea tratteggiata: lascia tanti pesi a destra quanti a sinistra.
   Modello di riferimento: laboratori/bilancia.js (vedi SCHEMA-LAB.md). */
(function () {
  const STILE = `
    .lab-media .lab-scena { max-width: 760px; margin: 0 auto; background: linear-gradient(180deg, var(--sup2), var(--sup)); border-radius: 12px; overflow: hidden; touch-action: none; }
    .lab-media .obiettivo { max-width: 760px; margin: 0 auto; text-align: center; padding: 10px 12px 8px; font-size: .95rem; color: var(--testo2); line-height: 1.5; }
    .lab-media .tavola { transition: transform .3s cubic-bezier(.34,1.2,.64,1); }
    .lab-media .tavola.viva { transition: none; }
    .lab-media .asse-tavola { fill: #c19a6b; stroke: #8a6a42; stroke-width: 2; }
    .lab-media .tacca { stroke: #6b4f2e; stroke-width: 1.4; opacity: .75; }
    .lab-media .tacca.grande { stroke-width: 2.2; opacity: 1; }
    .lab-media .numero { font: 600 17px var(--font); fill: #4a3520; }
    .lab-media .peso { fill: var(--s1); stroke: rgba(0,0,0,.3); stroke-width: 1.5; }
    .lab-media .peso-luce { fill: #fff; opacity: .22; }
    .lab-media .peso-testo { font: 700 16px var(--font); fill: #fff; }
    .lab-media .peso-g.presa .peso { stroke: var(--accento); stroke-width: 3.5; }
    .lab-media .peso-g.mobile { cursor: grab; }
    .lab-media .fulcro { fill: var(--accento); stroke: rgba(0,0,0,.22); stroke-width: 1.5; }
    .lab-media .fulcro.bloccato { fill: var(--testo3); }
    .lab-media .fulcro-testo { font: 700 16px var(--font); fill: var(--testo2); }
    .lab-media .mediana-linea { stroke: var(--s2); stroke-width: 2; stroke-dasharray: 7 6; }
    .lab-media .mediana-linea.auto { opacity: .8; }
    .lab-media .mediana-bandiera { fill: var(--s2); stroke: none; }
    .lab-media .mediana-testo { font: 700 16px var(--font); fill: var(--s2); }
    .lab-media .suolo { stroke: var(--testo2); stroke-width: 2; opacity: .5; }
    .lab-media .zolla { stroke: var(--testo2); stroke-width: 1.2; opacity: .3; }
    .lab-media .cestino { fill: none; stroke: var(--no); stroke-width: 2; stroke-dasharray: 6 6; opacity: .8; }
    .lab-media .cestino-testo { font: 600 16px var(--font); fill: var(--no); }
    .lab-media .numeri { max-width: 760px; margin: 0 auto; text-align: center; padding: 8px 12px 0; }
    .lab-media .numeri .riga { display: flex; gap: 6px 22px; flex-wrap: wrap; justify-content: center; align-items: baseline; padding: 3px 0; min-height: 1.9em; }
    .lab-media .numeri .etichetta { font-size: .78rem; color: var(--testo3); text-transform: uppercase; letter-spacing: .05em; }
    .lab-media .numeri .nascosto { font-size: .85rem; color: var(--testo3); font-style: italic; }
    .lab-media .numeri .katex { font-size: 1.05em; }
    .lab-media .scelte { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; align-items: center; padding: 8px 12px 0; }
    .lab-media .scelte .domanda { font-size: .9rem; color: var(--testo2); width: 100%; text-align: center; }
    .lab-media .vinto { animation: lab-media-pop .5s cubic-bezier(.34,1.56,.64,1); display: inline-block; }
    @keyframes lab-media-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-media .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  /* ---------- geometria della scena ---------- */
  const W = 600, H = 300;
  const X0 = 44, X1 = 556, U = (X1 - X0) / 20;      /* 0…20 sulla tavola */
  const YTAV = 200, SPESS = 24, YPIV = YTAV + SPESS, YSUOLO = 266;
  const RP = 15, DY0 = 31, YP0 = YTAV - 18;          /* dischi: raggio, passo della pila, prima riga */
  const Y_TOGLI = YSUOLO + 4;                        /* sotto questa quota il peso si stacca */
  const FX = v => X0 + v * U;
  const VX = x => (x - X0) / U;
  const snap = v => Math.max(0, Math.min(20, Math.round(v * 2) / 2));
  const quasi = (a, b, t) => Math.abs(a - b) <= (t == null ? 1e-9 : t);

  /* ---------- statistica ---------- */
  const somma = v => v.reduce((a, b) => a + b, 0);
  const media = v => v.length ? somma(v) / v.length : 0;
  function mediana(v) {
    const o = v.slice().sort((a, b) => a - b), n = o.length;
    if (!n) return 0;
    return n % 2 ? o[(n - 1) / 2] : (o[n / 2 - 1] + o[n / 2]) / 2;
  }
  /* quanti pesi finiscono a sinistra, sopra, a destra di una linea */
  function conta(v, x) {
    let s = 0, c = 0, d = 0;
    v.forEach(k => { if (k < x - 1e-9) s++; else if (k > x + 1e-9) d++; else c++; });
    return { s, c, d };
  }
  /* quanti pesi sono stati spostati fra due configurazioni (differenza fra multinsiemi) */
  function spostati(a, b) {
    const m = new Map();
    a.forEach(v => m.set(v, (m.get(v) || 0) + 1));
    b.forEach(v => m.set(v, (m.get(v) || 0) - 1));
    let piu = 0, meno = 0;
    m.forEach(n => { if (n > 0) meno += n; else if (n < 0) piu += -n; });
    return Math.max(piu, meno);
  }

  /* ---------- scrittura dei numeri ---------- */
  const nTesto = x => String(Math.round(x * 100) / 100).replace('.', ',');
  const nTex = x => String(Math.round(x * 100) / 100).replace('.', '{,}');
  const datiTex = v => v.slice().sort((a, b) => a - b).map(nTex).join(',\\;');
  function mediaTex(v) {
    const o = v.slice().sort((a, b) => a - b);
    return '\\bar{x} = \\frac{' + o.map(nTex).join('+') + '}{' + o.length + '} = ' + nTex(media(o));
  }
  function medianaTex(v) {
    const o = v.slice().sort((a, b) => a - b), n = o.length;
    if (!n) return '\\text{mediana}';
    if (n % 2) return '\\text{mediana} = ' + nTex(o[(n - 1) / 2]);
    return '\\text{mediana} = \\frac{' + nTex(o[n / 2 - 1]) + '+' + nTex(o[n / 2]) + '}{2} = ' + nTex(mediana(o));
  }

  /* ---------- livelli ----------
     fulcro: 'sposta' (trascinabile) oppure un numero (bloccato lì)
     mediana: 'trascina' (la mette il giocatore) | 'auto' (segue i dati) | assente
     pesiMobili: i pesi si trascinano · maxPesi: quanti se ne possono avere · togli: si buttano giù
     togliSolo: si può staccare solo il peso di quel valore                                        */
  const LIVELLI = [
    {
      dati: [2, 3, 3, 5, 7], f0: 10, fulcro: 'sposta', verifica: 'fulcro',
      testo: 'La tavola pende. Sposta il fulcro finché sta in piano, poi premi Conferma.',
      fine: 'Equilibrio in 4: quello è il punto in cui la tavola sta ferma, ed è la media. Il 2 e il 3 sono più a sinistra, ma il 5 e il 7 sono lontani abbastanza da compensarli: conta la distanza dal fulcro, non solo quanti pesi ci sono.'
    },
    {
      dati: [1, 4, 4, 6, 10], f0: 10, fulcro: 'sposta', verifica: 'fulcro',
      testo: 'Dati nuovi. Trova di nuovo il punto in cui la tavola sta ferma.',
      fine: 'Equilibrio in 5, e infatti 1+4+4+6+10 fa 25, diviso 5 fa 5. Il 10 da solo tiene testa all\'1 e al 4: è il più lontano di tutti.'
    },
    {
      dati: [3, 4, 5, 6, 7], f0: 10, m0: 10, fulcro: 'sposta', mediana: 'trascina', verifica: 'fulcro+mediana',
      testo: 'Prima la mediana: porta la linea tratteggiata sul valore di mezzo, quello che lascia tanti pesi a destra quanti a sinistra. Poi metti il fulcro dove la tavola sta in piano.',
      fine: 'Qui cadono nello stesso posto, 5: i dati sono disposti in modo simmetrico attorno al centro. Capita spesso, ma non è una regola — al prossimo livello si separano.'
    },
    {
      dati: [2, 2, 3, 4, 14], f0: 10, m0: 10, fulcro: 'sposta', mediana: 'trascina', verifica: 'fulcro+mediana',
      testo: 'Di nuovo: la linea sul valore di mezzo, il fulcro dove la tavola sta in piano. Finiranno ancora insieme?',
      fine: 'Mediana 3, media 5: stavolta si separano di due passi. Il 14 è lontanissimo e trascina il fulcro verso destra, ma per la mediana conta solo il posto in fila, e il terzo dato resta 3. Un valore anomalo sposta la media e lascia stare la mediana.'
    },
    {
      dati: [1, 3, 5, 7], f0: 6, fulcro: 6, mediana: 'auto', pesiMobili: true, soloNuovi: true, maxPesi: 5,
      verifica: 'media', obMedia: 6,
      testo: 'Il fulcro è bloccato in 6. Aggiungi un peso e portalo dove serve perché la tavola torni in piano: la media deve valere 6.',
      fine: 'Il quinto peso va in 14. I quattro dati sommano 16, e cinque pesi con media 6 devono sommare 30: ne mancava esattamente 14. Un dato solo, se è lontano, tira la media da tutte le parti.'
    },
    {
      dati: [4, 6, 7, 8, 9], f0: 7, fulcro: 7, mediana: 'auto', pesiMobili: true, maxPesi: 5,
      verifica: 'sposta1', obMedia: 7, obMediana: 7,
      testo: 'Il fulcro è bloccato in 7. Sposta un solo peso perché la tavola torni in piano, senza far muovere la mediana.',
      fine: 'La somma era 34 e per avere media 7 ne serviva 35: bastava spostare un peso di mezzo passo o di un passo verso destra. La mediana però non deve cambiare: il terzo dato in fila deve restare 7, quindi il peso che sta proprio lì è meglio non toccarlo.'
    },
    {
      dati: [5, 6, 6, 7, 16], f0: 4, fulcro: 'sposta', mediana: 'auto', togli: true, togliSolo: 16,
      verifica: 'previsione',
      testo: 'Quattro dati vicini e uno lontanissimo. Se togli il peso in 16, che cosa cambia di più? Scegli, poi trascina quel peso giù dalla tavola. (Il fulcro puoi spostarlo per vedere dove sta l\'equilibrio, prima e dopo.)'
    },
    {
      dati: [6, 8, 10, 12, 14], f0: 10, fulcro: 'sposta', mediana: 'auto', pesiMobili: true, togli: true, maxPesi: 8,
      verifica: 'costruisci', nPesi: 5, obMedia: 8, obMediana: 6,
      testo: 'Adesso costruisci tu: cinque pesi con media 8 e mediana 6. Trascinali (il fulcro ti dice dov\'è la media, la linea dov\'è la mediana), poi Conferma.',
      fine: 'Media 8 e mediana 6 insieme: il terzo peso in fila resta in 6, e uno o due pesi molto a destra tirano la media più su. Media e mediana si possono spostare quasi separatamente: raccontano cose diverse.'
    },
    {
      dati: [6, 6, 6, 6, 6, 6], f0: 6, fulcro: 'sposta', mediana: 'auto', pesiMobili: true, togli: true, maxPesi: 8,
      verifica: 'costruisci', nPesi: 6, obMedia: 6, obMediana: 6, diversi: true,
      testo: 'Sei pesi, media 6 e mediana 6, ma non tutti nello stesso posto. Sono tutti in 6: allontanali senza rompere l\'equilibrio.',
      fine: 'Il trucco è muoverli a coppie, uno a destra e uno a sinistra dello stesso tanto: la tavola non se ne accorge. E finché il terzo e il quarto dato restano a cavallo del 6, la mediana non si muove. Media e mediana uguali non vogliono dire dati uguali.'
    },
    {
      dati: [1, 1, 2, 12, 13, 13], f0: 4, fulcro: 'sposta', mediana: 'auto', verifica: 'fulcro+scelta',
      testo: 'Due gruppi lontani, e niente in mezzo. Metti il fulcro nel punto di equilibrio e conferma: poi ti faccio una domanda.',
      fine: 'Equilibrio in 7, e anche la mediana cade in 7: eppure in 7 non c\'è nessun dato. Tre pesi stanno all\'inizio, tre alla fine, e la media indica il vuoto in mezzo. Quando i dati si dividono in due gruppi, un numero solo non li racconta: bisogna dire che i gruppi sono due.'
    }
  ];

  COMPASSO.registraLab({
    id: 'media',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-media')) { const s = document.createElement('style'); s.id = 'stile-lab-media'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-media');
      radice.innerHTML = `
        <div class="obiettivo"></div>
        <div class="lab-scena"></div>
        <div class="numeri">
          <div class="riga r-dati"></div>
          <div class="riga r-risultati"></div>
        </div>
        <div class="scelte" hidden></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn primario m-conferma">Conferma</button>
          <button type="button" class="btn m-piu" hidden>+ peso</button>
          <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo m-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const obEl = radice.querySelector('.obiettivo');
      const datiEl = radice.querySelector('.r-dati'), risEl = radice.querySelector('.r-risultati');
      const scelteEl = radice.querySelector('.scelte');
      const msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const btnConf = radice.querySelector('.m-conferma'), btnPiu = radice.querySelector('.m-piu');
      const btnRic = radice.querySelector('.m-ricomincia'), btnAiuto = radice.querySelector('.m-aiuto');

      /* ---------- stato ---------- */
      let livello = 0, L = LIVELLI[0];
      let pesi = [], idProssimo = 1, iniziali = [];
      let fulcro = 10, linea = 10, angolo = 0, dyPila = DY0;
      let finito = false, svelato = false, extraHtml = '', previsione = null, sceltaAperta = false;
      let presa = null, punt = { x: 0, y: 0 };

      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length || livello < 0) livello = 0;

      /* ---------- scena SVG ---------- */
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Una tavola graduata da 0 a 20 su un fulcro, con dei pesi da spostare' });
      scena.appendChild(svg);

      const gSuolo = el('g');
      gSuolo.appendChild(el('line', { class: 'suolo', x1: 18, y1: YSUOLO, x2: W - 18, y2: YSUOLO }));
      for (let x = 26; x < W - 18; x += 20) gSuolo.appendChild(el('line', { class: 'zolla', x1: x, y1: YSUOLO, x2: x - 9, y2: YSUOLO + 10 }));
      svg.appendChild(gSuolo);

      /* la tavola: ruota tutta intera attorno al fulcro, graduazione e pesi compresi */
      const gTav = el('g', { class: 'tavola' });
      gTav.appendChild(el('rect', { class: 'asse-tavola', x: X0 - 20, y: YTAV, width: (X1 - X0) + 40, height: SPESS, rx: 5 }));
      for (let i = 0; i <= 20; i++) {
        const x = FX(i), grande = i % 2 === 0;
        gTav.appendChild(el('line', { class: 'tacca' + (grande ? ' grande' : ''), x1: x, y1: YTAV, x2: x, y2: YTAV + (grande ? 8 : 5) }));
        if (grande) gTav.appendChild(el('text', { class: 'numero', x: x, y: YTAV + 20, 'text-anchor': 'middle' }, String(i)));
      }
      const gLinea = el('g'); gTav.appendChild(gLinea);   /* la mediana è piantata sulla tavola, sotto i pesi */
      const gPesi = el('g'); gTav.appendChild(gPesi);
      svg.appendChild(gTav);

      const gFulcro = el('g'); svg.appendChild(gFulcro);
      const gSopra = el('g'); svg.appendChild(gSopra);

      let primoErrore = true;

      /* ---------- disegno ---------- */
      const valori = () => pesi.map(p => p.v);
      function disponi() {
        const gruppi = new Map();
        pesi.forEach(p => { if (!gruppi.has(p.v)) gruppi.set(p.v, []); gruppi.get(p.v).push(p); });
        let alta = 0;
        gruppi.forEach(lista => { lista.forEach((p, i) => { p.riga = i; }); alta = Math.max(alta, lista.length - 1); });
        dyPila = alta > 0 ? Math.min(DY0, (YP0 - 42) / alta) : DY0;
      }
      const cyPeso = p => YP0 - p.riga * dyPila;
      /* quali pesi si possono prendere col dito: tutti, solo quelli nuovi, o solo quello da buttare */
      function prendibile(p) {
        if (finito) return false;
        if (L.pesiMobili) return !L.soloNuovi || !!p.nuovo;
        return L.togliSolo != null && p.v === L.togliSolo;
      }

      function disegnaPesi() {
        svuota(gPesi); svuota(gSopra);
        if (presa && presa.tipo === 'peso' && puoTogliere()) {
          gSopra.appendChild(el('rect', { class: 'cestino', x: 150, y: 271, width: 300, height: 25, rx: 12 }));
          gSopra.appendChild(el('text', { class: 'cestino-testo', x: 300, y: 288, 'text-anchor': 'middle' }, presa.fuori ? 'lascia qui: il peso si toglie' : 'trascina qui sotto per togliere'));
        }
        pesi.forEach(p => {
          const suo = presa && presa.tipo === 'peso' && presa.peso === p;
          const fuori = suo && presa.fuori;
          const cx = fuori ? punt.x : FX(p.v), cy = fuori ? punt.y : cyPeso(p);
          const testo = nTesto(p.v);
          const g = el('g', { class: 'peso-g' + (prendibile(p) ? ' mobile' : '') + (suo ? ' presa' : '') + (fuori ? ' fuori' : '') });
          g.appendChild(el('circle', { class: 'peso', cx: cx, cy: cy, r: RP }));
          g.appendChild(el('ellipse', { class: 'peso-luce', cx: cx - 4.5, cy: cy - 5.5, rx: 5, ry: 3.2 }));
          g.appendChild(el('text', { class: 'peso-testo', x: cx, y: cy + 5, 'text-anchor': 'middle', style: testo.length > 2 ? 'font-size:13px' : '' }, testo));
          (fuori ? gSopra : gPesi).appendChild(g);
        });
      }

      function disegnaFulcro() {
        svuota(gFulcro);
        const x = FX(fulcro), bloccato = L.fulcro !== 'sposta';
        gFulcro.appendChild(el('path', { class: 'fulcro' + (bloccato ? ' bloccato' : ''), d: 'M' + x + ' ' + YPIV + ' L' + (x - 24) + ' ' + YSUOLO + ' L' + (x + 24) + ' ' + YSUOLO + ' Z' }));
        if (!bloccato) {
          gFulcro.appendChild(el('rect', { x: x - 9, y: YPIV + 23, width: 18, height: 3, rx: 1.5, fill: '#fff', opacity: .75 }));
          gFulcro.appendChild(el('rect', { x: x - 9, y: YPIV + 30, width: 18, height: 3, rx: 1.5, fill: '#fff', opacity: .75 }));
        }
        if (!(presa && presa.tipo === 'peso' && puoTogliere())) {
          const tx = Math.max(70, Math.min(W - 70, x));
          gFulcro.appendChild(el('text', { class: 'fulcro-testo', x: tx, y: YSUOLO + 26, 'text-anchor': 'middle' }, (bloccato ? 'fulcro bloccato in ' : 'fulcro in ') + nTesto(fulcro)));
        }
      }

      function disegnaLinea() {
        svuota(gLinea);
        if (!L.mediana) return;
        const x = FX(linea), auto = L.mediana === 'auto';
        gLinea.appendChild(el('line', { class: 'mediana-linea' + (auto ? ' auto' : ''), x1: x, y1: 30, x2: x, y2: YPIV + 8 }));
        gLinea.appendChild(el('path', { class: 'mediana-bandiera', d: 'M' + x + ' 30 l 0 -13 l 17 6.5 z' }));
        gLinea.appendChild(el('text', { class: 'mediana-testo', x: Math.max(58, Math.min(W - 58, x + 6)), y: 14, 'text-anchor': 'middle' }, 'mediana ' + nTesto(linea)));
      }

      function aggiornaNumeri() {
        const v = valori();
        datiEl.innerHTML = '<span class="etichetta">dati ordinati</span>' + (v.length ? ctx.tex(datiTex(v)) : '<span class="nascosto">la tavola è vuota</span>');
        if (extraHtml) { risEl.innerHTML = extraHtml; return; }
        if (!svelato || !v.length) { risEl.innerHTML = '<span class="nascosto">media e mediana si scoprono quando il livello è risolto</span>'; return; }
        risEl.innerHTML = ctx.tex(mediaTex(v)) + ctx.tex(medianaTex(v));
      }

      function aggiornaBarra() {
        btnPiu.hidden = !(!finito && L.pesiMobili && L.maxPesi && pesi.length < L.maxPesi);
        btnConf.hidden = L.verifica === 'previsione';
        btnConf.disabled = finito || sceltaAperta;
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length + ' · pesi: ' + pesi.length;
      }

      function aggiorna() {
        disponi();
        const v = valori();
        if (L.mediana === 'auto') linea = v.length ? mediana(v) : 10;
        /* momento risultante: la tavola pende dalla parte più pesante, al massimo di 8°.
           La curva è ripida vicino allo zero, così anche un mezzo passo di squilibrio si vede. */
        const s = v.length ? media(v) - fulcro : 0;
        angolo = s === 0 ? 0 : Math.sign(s) * 8 * Math.min(1, Math.pow(Math.abs(s) / 3, 0.45));
        gTav.setAttribute('transform', 'rotate(' + angolo.toFixed(3) + ' ' + FX(fulcro).toFixed(2) + ' ' + YPIV + ')');
        disegnaPesi(); disegnaFulcro(); disegnaLinea();
        aggiornaNumeri(); aggiornaBarra();
      }

      /* ---------- il dito ---------- */
      const coord = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * W, y: (ev.clientY - r.top) / r.height * H }; };
      function inTavola(p, a) {   /* dal riquadro dello schermo al riferimento della tavola, che è inclinata */
        const r = -(a == null ? angolo : a) * Math.PI / 180, px = FX(fulcro), py = YPIV;
        const dx = p.x - px, dy = p.y - py, c = Math.cos(r), s = Math.sin(r);
        return { x: px + dx * c - dy * s, y: py + dx * s + dy * c };
      }
      const puoTogliere = () => !!L.togli && (L.verifica !== 'previsione' || previsione != null);
      function pulisci() { if (msg.classList.contains('no')) { msg.textContent = ''; msg.className = 'lab-messaggio'; } }

      svg.addEventListener('pointerdown', ev => {
        if (finito) return;
        const p = coord(ev); punt = p;
        const t = inTavola(p);
        let scelto = null, dist = 28;
        pesi.forEach(w => {
          if (!prendibile(w)) return;
          const d = Math.hypot(t.x - FX(w.v), t.y - cyPeso(w));
          if (d <= dist) { dist = d; scelto = w; }
        });
        if (scelto) {
          pesi.splice(pesi.indexOf(scelto), 1); pesi.push(scelto);   /* in cima alla pila */
          presa = { tipo: 'peso', peso: scelto, fuori: false, ang: angolo };
          gTav.classList.add('viva');
        } else if (L.fulcro === 'sposta' && p.y > YTAV + 4 && Math.abs(p.x - FX(fulcro)) < 42) {
          presa = { tipo: 'fulcro' };
        } else if (L.mediana === 'trascina' && t.y < YPIV + 16 && Math.abs(t.x - FX(linea)) < 30) {
          presa = { tipo: 'linea', ang: angolo };
        }
        if (!presa) return;
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
        pulisci(); aggiorna();
      });

      svg.addEventListener('pointermove', ev => {
        if (!presa) return;
        const p = coord(ev); punt = p;
        if (presa.tipo === 'peso') {
          presa.fuori = puoTogliere() && p.y > Y_TOGLI;
          if (!presa.fuori && L.pesiMobili) presa.peso.v = snap(VX(inTavola(p, presa.ang).x));
        } else if (presa.tipo === 'fulcro') fulcro = snap(VX(p.x));
        else if (presa.tipo === 'linea') linea = snap(VX(inTavola(p, presa.ang).x));
        pulisci(); aggiorna();
      });

      function molla() {
        if (!presa) return;
        const p = presa; presa = null; gTav.classList.remove('viva');
        if (p.tipo === 'peso' && p.fuori) togliPeso(p.peso); else aggiorna();
      }
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('lostpointercapture', molla);

      function togliPeso(w) {
        const prima = valori();
        pesi = pesi.filter(x => x !== w);
        aggiorna();
        if (L.verifica === 'previsione') valutaPrevisione(prima, valori(), w.v);
        else { msg.textContent = 'Peso tolto.'; msg.className = 'lab-messaggio'; }
      }

      /* ---------- esiti ---------- */
      function sbaglia(t) {
        msg.textContent = t; msg.className = 'lab-messaggio no';
        if (primoErrore) { primoErrore = false; ctx.zenone(t, { tipo: 'suggerimento', espressione: 'pensa', durata: 8000 }); }
      }
      function vinci(breve, testoZenone, bene) {
        finito = true; svelato = true; presa = null;
        gTav.classList.remove('viva');
        mostraScelte(null);
        msg.innerHTML = '<span class="vinto">' + breve + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.completato(livello);
        ctx.zenone(testoZenone, { espressione: bene ? 'orgoglioso' : 'felice', durata: 11000 });
        btnRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        aggiorna();
      }
      function versoTesto(M) {
        const d = M - fulcro;
        if (Math.abs(d) < 1e-9) return '';
        return 'La tavola scende ancora dalla parte ' + (d > 0 ? 'destra' : 'sinistra') + '.';
      }
      function diagnosiFulcro(M) {
        const d = M - fulcro;
        if (Math.abs(d) <= 0.75) return 'Ci sei vicino, ma la tavola non è ancora in piano: guarda da che parte scende.';
        return 'La tavola pende verso ' + (d > 0 ? 'destra' : 'sinistra') + ': da quella parte i pesi tirano di più, quindi il fulcro deve andare verso ' + (d > 0 ? 'destra' : 'sinistra') + '.';
      }
      const quanti = n => n === 0 ? 'non ce n\'è nessuno' : n === 1 ? 'ce n\'è uno' : 'ce ne sono ' + n;
      function diagnosiLinea(v) {
        const c = conta(v, linea);
        if (c.s === c.d) return 'Il conto dei pesi torna, ma la linea non è appoggiata su un dato: con un numero dispari di dati la mediana è proprio uno dei valori, quello di mezzo.';
        return 'Il conto non torna: a sinistra della linea ' + quanti(c.s) + ', a destra ' + quanti(c.d) + '. La mediana ne lascia lo stesso numero da tutte e due le parti.';
      }

      function valutaPrevisione(prima, dopo, tolto) {
        const m1 = media(prima), m2 = media(dopo), d1 = mediana(prima), d2 = mediana(dopo);
        const dm = Math.abs(m2 - m1), dd = Math.abs(d2 - d1);
        const giusto = previsione === 'media' ? dm > dd : dd > dm;
        extraHtml = '<span class="etichetta">prima</span>' + ctx.tex('\\bar{x} = ' + nTex(m1)) + ctx.tex('\\text{mediana} = ' + nTex(d1))
          + '<span class="etichetta">dopo</span>' + ctx.tex('\\bar{x} = ' + nTex(m2)) + ctx.tex('\\text{mediana} = ' + nTex(d2));
        const t = (giusto ? 'Previsione giusta. ' : 'La previsione era l\'altra. ')
          + 'Tolto il peso in ' + nTesto(tolto) + ', la media è passata da ' + nTesto(m1) + ' a ' + nTesto(m2) + ', cioè ' + nTesto(dm) + ' in meno; la mediana da ' + nTesto(d1) + ' a ' + nTesto(d2)
          + (dd < 1e-9 ? ', cioè non si è mossa di un dito.' : '.')
          + ' La media guarda quanto un dato è lontano, e quel peso era lontanissimo: da solo teneva su il fulcro. La mediana guarda solo il posto in fila, e in fila quel dato era comunque l\'ultimo: toglierlo cambia poco o niente.';
        vinci(giusto ? 'Previsione giusta.' : 'Adesso guarda i numeri.', t, giusto);
      }

      function mostraScelte(domanda, opzioni) {
        svuota(scelteEl);
        if (!opzioni) { scelteEl.hidden = true; sceltaAperta = false; aggiornaBarra(); return; }
        scelteEl.hidden = false; sceltaAperta = true;
        const d = document.createElement('span'); d.className = 'domanda'; d.textContent = domanda; scelteEl.appendChild(d);
        opzioni.forEach(o => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'btn'; b.textContent = o.testo;
          b.addEventListener('click', o.fn);
          scelteEl.appendChild(b);
        });
        aggiornaBarra();
      }
      function scegliPrevisione(quale) {
        previsione = quale;
        mostraScelte(null);
        msg.textContent = 'Hai scelto: ' + (quale === 'media' ? 'la media' : 'la mediana') + '. Adesso trascina il peso in ' + nTesto(L.togliSolo) + ' giù dalla tavola.';
        msg.className = 'lab-messaggio';
      }
      function apriScelta() {
        msg.textContent = 'Il fulcro è nel punto di equilibrio.';
        msg.className = 'lab-messaggio ok';
        mostraScelte('La media descrive bene questi dati?', [
          {
            testo: 'Sì', fn: () => {
              msg.textContent = 'Guarda meglio: c\'è qualche peso lì dove sta il fulcro?';
              msg.className = 'lab-messaggio no';
              ctx.zenone('Il fulcro è finito in un punto dove non c\'è nessun dato: tre pesi stanno molto prima, tre molto dopo. Un valore che non somiglia a nessuno dei dati li descrive bene?', { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
            }
          },
          { testo: 'No', fn: () => vinci('La media cade nel vuoto.', L.fine, true) }
        ]);
      }

      /* ---------- Conferma ---------- */
      function conferma() {
        if (finito || sceltaAperta) return;
        const v = valori(), M = media(v), Md = mediana(v);
        if (L.verifica === 'fulcro') {
          if (!quasi(fulcro, M, 0.25)) return sbaglia(diagnosiFulcro(M));
          return vinci('In piano: il fulcro è nella media.', L.fine, true);
        }
        if (L.verifica === 'fulcro+mediana') {
          if (!quasi(linea, Md, 0.25)) return sbaglia(diagnosiLinea(v));
          if (!quasi(fulcro, M, 0.25)) return sbaglia('La mediana è al posto giusto. ' + diagnosiFulcro(M));
          return vinci('Mediana e fulcro tutti e due a posto.', L.fine, true);
        }
        if (L.verifica === 'media') {
          if (pesi.length < L.maxPesi) return sbaglia('Manca un peso: premi «+ peso» e portalo dove serve.');
          if (!quasi(M, L.obMedia)) return sbaglia('Con i pesi lì la media non è ' + nTesto(L.obMedia) + '. ' + versoTesto(M));
          return vinci('Tavola in piano: media ' + nTesto(L.obMedia) + '.', L.fine, true);
        }
        if (L.verifica === 'sposta1') {
          const n = spostati(iniziali, v);
          if (n === 0) return sbaglia('Non hai ancora spostato niente.');
          if (n > 1) return sbaglia('Hai mosso ' + n + ' pesi, e te ne è concesso uno solo: premi Ricomincia e riprova.');
          if (!quasi(Md, L.obMediana)) return sbaglia('La mediana si è mossa: il dato di mezzo adesso è ' + nTesto(Md) + ' e deve restare ' + nTesto(L.obMediana) + '.');
          if (!quasi(M, L.obMedia)) return sbaglia('Un peso solo spostato, ma la media non è ancora ' + nTesto(L.obMedia) + '. ' + versoTesto(M));
          return vinci('Un peso solo, e la tavola è in piano.', L.fine, true);
        }
        if (L.verifica === 'costruisci') {
          if (pesi.length !== L.nPesi) return sbaglia('Servono ' + L.nPesi + ' pesi, sulla tavola ' + quanti(pesi.length) + '.');
          if (!quasi(M, L.obMedia)) return sbaglia('Il punto di equilibrio non è ' + nTesto(L.obMedia) + '. ' + versoTesto(M));
          if (!quasi(Md, L.obMediana)) return sbaglia('La mediana non è ' + nTesto(L.obMediana) + ': la linea tratteggiata sta in ' + nTesto(Md) + '.');
          if (L.diversi && new Set(v).size === 1) return sbaglia('Media e mediana ci sono, ma i pesi stanno tutti nello stesso posto: il livello ne vuole almeno due diversi.');
          return vinci('Costruito: media ' + nTesto(L.obMedia) + ', mediana ' + nTesto(L.obMediana) + '.', L.fine, true);
        }
        if (L.verifica === 'fulcro+scelta') {
          if (!quasi(fulcro, M, 0.25)) return sbaglia(diagnosiFulcro(M));
          return apriScelta();
        }
      }

      /* ---------- livelli ---------- */
      function avviaLivello(n) {
        livello = n; L = LIVELLI[n];
        idProssimo = 1;
        pesi = L.dati.map(v => ({ v: v, id: idProssimo++, riga: 0 }));
        iniziali = L.dati.slice();
        fulcro = typeof L.fulcro === 'number' ? L.fulcro : (L.f0 != null ? L.f0 : 10);
        linea = L.m0 != null ? L.m0 : 10;
        angolo = 0; presa = null;
        finito = false; svelato = false; extraHtml = ''; previsione = null; primoErrore = true;
        gTav.classList.remove('viva');
        obEl.textContent = L.testo;
        msg.textContent = ''; msg.className = 'lab-messaggio';
        btnRic.textContent = 'Ricomincia';
        if (L.verifica === 'previsione') {
          mostraScelte('Se togli il peso in ' + nTesto(L.togliSolo) + ', che cosa cambia di più?', [
            { testo: 'La media', fn: () => scegliPrevisione('media') },
            { testo: 'La mediana', fn: () => scegliPrevisione('mediana') }
          ]);
        } else mostraScelte(null);
        aggiorna();
      }

      btnConf.addEventListener('click', conferma);
      btnPiu.addEventListener('click', () => {
        if (finito || !L.maxPesi || pesi.length >= L.maxPesi) return;
        pesi.push({ v: 10, id: idProssimo++, riga: 0, nuovo: true });
        msg.textContent = 'Peso nuovo in 10: adesso trascinalo dove serve.';
        msg.className = 'lab-messaggio';
        aggiorna();
      });
      btnRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      btnAiuto.addEventListener('click', () => ctx.zenone(aiuto(), { tipo: 'suggerimento', espressione: 'pensa', durata: 14000 }));

      function aiuto() {
        let t = 'La media è il punto in cui la tavola sta in equilibrio: i pesi di destra e quelli di sinistra si compensano, ma non a testa — conta quanto sono lontani dal fulcro. Un peso a tre passi tira come tre pesi a un passo, ed è per questo che un dato lontanissimo sposta tutto. La mediana invece non pesa niente: si mettono i dati in fila e si prende quello di mezzo, così da una parte e dall\'altra della linea resta lo stesso numero di pesi.';
        if (L.verifica === 'media' || L.verifica === 'sposta1') t += ' Qui conviene ragionare sulla somma: n pesi con media m devono sommare n per m. Guarda quanto manca.';
        else if (L.verifica === 'costruisci') t += ' Qui conviene decidere prima il dato di mezzo, che fissa la mediana, e poi sistemare gli altri a destra e a sinistra finché la tavola sta in piano.';
        else if (L.verifica === 'previsione') t += ' Prova a immaginarlo prima di farlo: togliendo il dato più lontano, la mediana perde solo un posto in fila, la media perde tutta quella distanza.';
        return t;
      }

      avviaLivello(livello);

      /* niente animazioni a mano né timer: la tavola si inclina con una transizione CSS */
      return function smonta() { presa = null; gTav.classList.remove('viva'); };
    }
  });
})();
