/* Laboratorio «Il regolo calcolatore» — i logaritmi come lunghezze.
   Righello fisso in alto (scala D, con il bordo in centimetri), righello mobile sotto (scala C),
   cursore di vetro con il filo rosso. Lo stato è in «regoli»: 1 regolo = 25 cm = log 10.
     s = di quanto è spostato il righello mobile (log del numero di sopra che sta sopra il suo 1)
     h = dove sta il filo (log del numero di sopra che sta sotto il filo)
   Lo studente legge e scrive il numero: niente calamite, tolleranza da regolo (2–3 %).
   Contratto: SCHEMA-LAB.md — modelli: bilancia.js, canestro.js */
(function () {
  const STILE = `
    .lab-regolo { --legno: #f5ead0; --legno2: #eadbb3; --legno3: #dcc899; --mobile: #fffaec; --mobile2: #f3e8c8;
      --legno-bordo: #c4ad7c; --inchiostro: #2b2317; --inchiostro2: #6c5b3d; --vetro: rgba(255,255,255,.30);
      --vetro-bordo: rgba(70,55,30,.30); --filo: #d2382b; }
    :root[data-tema="scuro"] .lab-regolo { --legno: #4b402d; --legno2: #3e3525; --legno3: #30291d; --mobile: #5b4f38; --mobile2: #4c422f;
      --legno-bordo: #6f5f40; --inchiostro: #f4ecd8; --inchiostro2: #cdbd96; --vetro: rgba(255,255,255,.07);
      --vetro-bordo: rgba(255,240,210,.32); --filo: #ff6f5e; }
    .lab-regolo .lab-scena { background: radial-gradient(130% 100% at 50% 0%, var(--sup), var(--sup2)); overflow: hidden; }
    .lab-regolo .corpo { filter: drop-shadow(0 1px 1px rgba(40,30,10,.14)) drop-shadow(0 7px 12px rgba(40,30,10,.16)); }
    :root[data-tema="scuro"] .lab-regolo .corpo { filter: drop-shadow(0 1px 2px rgba(0,0,0,.45)) drop-shadow(0 8px 16px rgba(0,0,0,.5)); }
    .lab-regolo .mobile { cursor: grab; outline: none; transition: opacity .35s; }
    .lab-regolo .mobile.presa { cursor: grabbing; }
    .lab-regolo .cursore { cursor: ew-resize; outline: none; }
    .lab-regolo .mobile:focus-visible .corpo-mobile, .lab-regolo .cursore:focus-visible .linguetta { stroke: var(--accento); stroke-width: 2.5; }
    .lab-regolo .linguetta { filter: drop-shadow(0 3px 6px rgba(30,30,50,.18)); }
    .lab-regolo .obiettivo { padding: 12px 16px 2px; font-size: 1rem; line-height: 1.55; color: var(--testo); }
    .lab-regolo .obiettivo p { margin: 0; }
    .lab-regolo .obiettivo b, .lab-regolo .obiettivo strong { color: var(--accento-testo); }
    .lab-regolo .aiuto { margin: 8px 16px 0; padding: 10px 14px; border-radius: 12px; background: var(--accento-tenue); color: var(--testo); font-size: .92rem; line-height: 1.5; animation: lab-regolo-pop .3s var(--morbido); }
    .lab-regolo .formula { display: grid; gap: 2px; padding: 8px 16px 2px; }
    .lab-regolo .f-riga { display: flex; align-items: baseline; gap: 4px 10px; flex-wrap: wrap; min-height: 1.95em; }
    .lab-regolo .f-et { font-size: .68rem; letter-spacing: .05em; text-transform: uppercase; color: var(--testo2); min-width: 6.6em; }
    .lab-regolo .f-tex { font-size: 1.08rem; color: var(--testo); }
    .lab-regolo .f-tex .katex { white-space: nowrap; }
    @media (max-width: 600px) { .lab-regolo .f-tex { font-size: .98rem; } .lab-regolo .f-et { min-width: 5.6em; } }
    .lab-regolo .risposta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; padding: 10px 16px 0; margin: 0; }
    .lab-regolo .risposta label { font-size: .92rem; color: var(--testo2); }
    .lab-regolo .risposta input { font: 600 1.1rem var(--font); width: 6.5em; min-height: 44px; padding: 6px 12px; border-radius: 12px;
      border: 1.5px solid var(--bordo2); background: var(--sup); color: var(--testo); user-select: text; -webkit-user-select: text;
      transition: border-color .2s, box-shadow .2s; }
    .lab-regolo .risposta input:focus { outline: none; border-color: var(--accento); box-shadow: 0 0 0 3px var(--accento-tenue); }
    .lab-regolo .risposta input.sbagliata { border-color: var(--no); }
    .lab-regolo .risposta input.giusta { border-color: var(--ok); background: var(--ok-tenue); }
    .lab-regolo .livelli { display: flex; gap: 6px; flex-wrap: wrap; }
    .lab-regolo .pill { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup);
      color: var(--testo2); font: 700 .95rem var(--font); cursor: pointer; padding: 0; transition: transform .3s var(--molla), background .2s, color .2s; }
    .lab-regolo .pill.fatto { background: var(--ok-tenue); color: var(--ok); border-color: color-mix(in srgb, var(--ok) 45%, var(--bordo)); }
    .lab-regolo .pill.qui { background: var(--accento); color: #fff; border-color: var(--accento); transform: scale(1.07); }
    .lab-regolo .pill[disabled] { opacity: .35; cursor: default; }
    .lab-regolo .lab-barra .btn[disabled] { opacity: .38; cursor: default; }
    .lab-regolo .vinto { display: inline-block; animation: lab-regolo-pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-regolo-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-regolo .scuoti { animation: lab-regolo-no .38s ease; }
    @keyframes lab-regolo-no { 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
  `;

  const LOG = Math.log10;
  const CM = 25;                         /* il regolo è lungo 25 cm: 1 regolo = 25 cm = log 10 */

  /* ---------------- livelli ----------------
     modo: 'misura' (solo il righello fisso e il filo), 'per', 'diviso'.
     ris: il numero da scrivere; tol: tolleranza relativa; sol: posizione esatta mostrata a livello vinto.
     errori: risposte sbagliate tipiche, con la frase di Zenone che le spiega. */
  const LIVELLI = [
    { modo: 'misura', ris: 8, tol: .02, s0: 0, h0: .1, sol: { s: 0, h: LOG(8) }, catena: { base: 2, volte: 3 },
      testo: 'Sul bordo di sopra c\'è un righello normale, in centimetri. Il **2** sta a 7,5 cm dall\'1. Trascina il filo rosso: dove sta il 4? E quale numero sta al **triplo** della distanza del 2?',
      domanda: 'Al triplo c\'è il',
      aiuto: 'Il bordo di sopra misura in centimetri, i numeri grandi sono quelli del regolo. Trascina il filo rosso, oppure tocca il regolo dove vuoi: la freccia verde dice a quanti centimetri dall\'1 si trova il filo. Calcola il triplo di 7,5 cm, porta il filo lì e leggi il numero che c\'è sotto.',
      errori: [
        { v: 6, zen: 'Il 6 sta a 19,5 cm, non a 22,6. Sul regolo le distanze non crescono come i numeri: guarda dove sta il 4, al doppio della distanza del 2.' },
        { v: 3, zen: 'Il 3 sta a 11,9 cm dall\'1. Andando verso destra i numeri si stringono: il triplo della distanza porta molto più in là.' },
        { v: 4, zen: 'Il 4 sta al doppio della distanza del 2, a 15,1 cm. Il triplo è ancora più in là.' }
      ],
      vittoria: 'Il 4 sta al doppio della distanza del 2 e l\'8 al triplo, perché 4 = 2·2 e 8 = 2·2·2. Moltiplicare per 2 vuol dire fare sempre lo stesso passo: log 8 = 3 · log 2.',
      finale: '\\log 8 = 3\\log 2' },
    { modo: 'per', ris: 6, tol: .02, s0: 0, h0: .16, sol: { s: LOG(2), h: LOG(6) },
      testo: 'Calcola $2 \\times 3$ con il regolo: metti l\'**1** del righello di sotto sotto il **2**, poi leggi sopra il **3** del righello di sotto.',
      domanda: '2 × 3 =',
      aiuto: 'Trascina il righello di sotto finché il suo 1 sta esattamente sotto il 2 di sopra (aiutati col filo). Poi porta il filo sul 3 del righello di sotto e leggi il numero di sopra, sullo stesso filo.',
      errori: [
        { v: 5, zen: '5 è 2 + 3: hai sommato i numeri. Sul regolo si sommano le lunghezze, e sommare le lunghezze vuol dire moltiplicare i numeri.' }
      ],
      vittoria: 'Il tratto fino al 2 più il tratto fino al 3 arriva al 6. Si sommano le lunghezze, cioè i logaritmi, e così si moltiplicano i numeri.',
      finale: '\\log 2 + \\log 3 = \\log 6' },
    { modo: 'per', ris: 7.5, tol: .02, s0: .05, h0: .2, sol: { s: LOG(2.5), h: LOG(7.5) },
      testo: 'Calcola $2{,}5 \\times 3$. Stavolta l\'1 va sotto un numero che non è scritto: cerca le tacche giuste.',
      domanda: '2,5 × 3 =',
      aiuto: 'Fra il 2 e il 3 le tacche corte sono i decimi (2,1 · 2,2 · …) e quella un po\' più lunga, a metà, è il 2,5. Metti l\'1 del righello di sotto proprio lì, porta il filo sul 3 di sotto e leggi sopra: il risultato cade anche lui fra due numeri scritti.',
      errori: [
        { v: 5.5, zen: '5,5 è 2,5 + 3: hai sommato i numeri. Sul regolo si sommano le lunghezze, non i numeri.' },
        { v: 7, zen: 'Il filo non sta sul 7: guarda le tacche fra i due numeri scritti vicino al filo e conta dove cade.', vicino: true },
        { v: 8, zen: 'Il filo non sta sull\'8: guarda le tacche fra i due numeri scritti vicino al filo e conta dove cade.', vicino: true }
      ],
      vittoria: 'Stessa mossa, con le tacche fini. Il regolo dà due o tre cifre giuste, e la tacca a metà fra 7 e 8 è proprio 7,5.',
      finale: '\\log 2{,}5 + \\log 3 = \\log 7{,}5' },
    { modo: 'diviso', ris: 4, tol: .02, s0: 0, h0: .5, sol: { s: LOG(4), h: LOG(8) },
      testo: 'Calcola $8 : 2$. Dividere è il contrario di moltiplicare, quindi qui le lunghezze si **tolgono**.',
      domanda: '8 : 2 =',
      aiuto: 'Porta il filo sull\'8 di sopra. Poi fai scorrere il righello di sotto finché il suo 2 sta sotto il filo. Dalla lunghezza dell\'8 hai tolto quella del 2: il risultato lo leggi sopra l\'1 del righello di sotto.',
      errori: [
        { v: 6, zen: '6 è 8 − 2: hai tolto i numeri. Per dividere si tolgono le lunghezze, e il risultato sta sopra l\'1 del righello di sotto.' },
        { v: 16, zen: '16 è 8 · 2: così si moltiplica. Per dividere la freccia del 2 va all\'indietro.' }
      ],
      vittoria: 'Dalla lunghezza dell\'8 hai tolto quella del 2 e sei arrivato al 4: log 8 − log 2 = log 4.',
      finale: '\\log 8 - \\log 2 = \\log 4' },
    { modo: 'per', ris: 20, tol: .02, s0: 0, h0: .25, sol: { s: LOG(4) - 1, h: LOG(2) }, uscita: { a: 4, b: 5 },
      testo: 'Calcola $4 \\times 5$.',
      domanda: '4 × 5 =',
      aiuto: 'Se il numero del righello di sotto finisce oltre il 10 di sopra, usa l\'altra estremità: metti il 10 del righello di sotto (al posto dell\'1) sotto il primo numero, e leggi sopra il secondo come al solito. Il regolo ti dà le cifre, la virgola la metti tu: chiediti se il risultato è più o meno di 10.',
      errori: [
        { v: 2, zen: 'Il 2 l\'hai letto bene, ma 4 · 5 è più di 10: il regolo ti dà le cifre, dove va la virgola lo decidi tu.' },
        { v: 9, zen: '9 è 4 + 5: hai sommato i numeri. Sul regolo si sommano le lunghezze.' }
      ],
      vittoria: 'Le due lunghezze insieme uscivano dal regolo di un pezzo lungo log 2. Usare il 10 vuol dire tornare indietro di un regolo intero, cioè di log 10 = 1: per questo 20 = 10 · 2.',
      finale: '\\log 4 + \\log 5 = \\log 20 = 1 + \\log 2' },
    { modo: 'per', ris: 3.375, tol: .03, s0: 0, h0: .3, sol: { s: LOG(2.25), h: LOG(3.375) }, catena: { base: 1.5, volte: 2 },
      testo: 'Calcola $1{,}5^3$, cioè $1{,}5 \\cdot 1{,}5 \\cdot 1{,}5$. Sul regolo vuol dire mettere **tre volte** la lunghezza dell\'1,5.',
      domanda: '1,5³ ≈',
      aiuto: 'Fai una moltiplicazione alla volta. Prima 1,5 · 1,5: lascia il filo sul risultato, senza leggerlo per forza, perché il filo fa da segnalibro. Poi porta l\'1 del righello di sotto sotto il filo e moltiplica ancora per 1,5.',
      errori: [
        { v: 4.5, zen: '4,5 è 1,5 · 3: hai moltiplicato per l\'esponente. La potenza mette tre volte la lunghezza dell\'1,5, cioè moltiplica tre volte per 1,5.' },
        { v: 2.25, zen: '2,25 è 1,5 · 1,5: ne hai messi due. Ne manca ancora uno.' }
      ],
      vittoria: 'Tre volte la stessa lunghezza: log 1,5³ = 3 · log 1,5. Il filo ha tenuto il posto al risultato a metà strada, 2,25.',
      finale: '\\log\\left(1{,}5^3\\right) = 3\\log 1{,}5 \\approx \\log 3{,}38' }
  ];

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const morsa = (v, a, b) => Math.max(a, Math.min(b, v));
  const liscia = t => 1 - Math.pow(1 - t, 3);
  /* numeri all'italiana: testo e LaTeX */
  const num = (v, d) => v.toFixed(d).replace('.', ',');
  const numT = (v, d) => v.toFixed(d).replace('.', '{,}');

  /* tacche della scala logaritmica, fitte quanto lo permette la larghezza (liv 0 = intero, 1 = metà, 2 = decimo, 3 = ventesimo) */
  function tacche(L) {
    const tratti = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 10]], passi = [1, .5, .1, .05], out = [], visti = new Set();
    tratti.forEach(([a, b]) => passi.forEach((p, liv) => {
      const spazio = L * LOG(b / (b - p));
      if (liv > 0 && spazio < 3) return;
      const n = Math.round((b - a) / p);
      for (let i = 0; i <= n; i++) {
        const v = +(a + i * p).toFixed(3), c = Math.round(v * 1000);
        if (visti.has(c)) continue;
        visti.add(c); out.push({ v, liv });
      }
    }));
    return out;
  }

  /* geometria in pixel veri: il viewBox è largo quanto la scena, così i caratteri hanno la loro misura */
  function geometria(W) {
    const largo = W >= 560;
    const k = largo ? Math.min(1.3, .95 + W / 2400) : 1;
    const M = largo ? Math.round(Math.max(64, W * .085)) : 26;
    const L = W - 2 * M;
    const yR = Math.round(32 * k);             /* corsia della freccia verde, sopra il regolo */
    const yS = Math.round(50 * k);             /* bordo alto del righello fisso */
    const yA = yS + Math.round(46 * k);        /* corsia della freccia blu, dentro il righello fisso */
    const yB = yS + Math.round(96 * k);        /* linea dove si toccano i due righelli */
    const yBf = yB + Math.round(50 * k);       /* corsia della freccia arancione, dentro il righello mobile */
    const yC = yB + Math.round(64 * k);        /* bordo basso del righello mobile */
    const yT = yC + 12;                        /* linguetta del cursore */
    const H = yT + 46 + 8;
    return { W, H, M, L, k, largo, yR, yS, yA, yB, yBf, yC, yT, X: u => M + u * L };
  }

  COMPASSO.registraLab({
    id: 'regolo',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-regolo')) { const st = document.createElement('style'); st.id = 'stile-lab-regolo'; st.textContent = STILE; document.head.appendChild(st); }
      radice.classList.add('lab-regolo');
      radice.innerHTML = `
        <div class="lab-scena"></div>
        <div class="obiettivo"></div>
        <div class="aiuto" hidden></div>
        <div class="formula">
          <div class="f-riga"><span class="f-et f-et1"></span><span class="f-tex f-1"></span></div>
          <div class="f-riga"><span class="f-et f-et2"></span><span class="f-tex f-2"></span></div>
        </div>
        <form class="risposta" autocomplete="off">
          <label for="lab-regolo-in" class="domanda"></label>
          <input id="lab-regolo-in" type="text" inputmode="decimal" enterkeyhint="done" spellcheck="false" placeholder="risultato">
          <button type="submit" class="btn primario b-controlla">Controlla</button>
        </form>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <div class="livelli" role="group" aria-label="Livelli"></div>
          <button type="button" class="btn piccolo b-aiuto" title="Come si usa">?</button>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const objEl = radice.querySelector('.obiettivo'), f1 = radice.querySelector('.f-1'), f2 = radice.querySelector('.f-2');
      const et1 = radice.querySelector('.f-et1'), et2 = radice.querySelector('.f-et2');
      const form = radice.querySelector('.risposta'), input = radice.querySelector('input'), domEl = radice.querySelector('.domanda');
      const msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello'), pillEl = radice.querySelector('.livelli');
      const bRic = radice.querySelector('.b-ric'), bAiuto = radice.querySelector('.b-aiuto'), aiutoEl = radice.querySelector('.aiuto');
      const bControlla = radice.querySelector('.b-controlla');

      /* ---------------- stato ---------------- */
      const completati = ctx.stato().livelli;
      let livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      let s = 0, h = .1, G = null, presa = null, off = 0, raf = 0, rafDisegno = 0, rafFesta = 0;
      let vinto = false, animando = false, segno = null, pCatena = 0, uscitaDetta = false, cache1 = '', cache2 = '';
      const liv = () => LIVELLI[livello];
      const conMobile = () => liv().modo !== 'misura';

      /* ---------------- scena SVG ---------------- */
      const svg = el('svg', { role: 'img', 'aria-label': 'Regolo calcolatore: righello fisso in alto, righello mobile in basso, cursore con il filo' });
      scena.appendChild(svg);
      let gFisso, gMobile, gFrecce, gFesta, gCursore;

      function costruisci() {
        const W = Math.max(300, Math.round(scena.clientWidth || 360));
        G = geometria(W);
        const { H, M, L, k, X, yS, yB, yC, yT } = G;
        vuota(svg);
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        const defs = el('defs'); svg.appendChild(defs);
        const grad = (id, c1, c2) => { const g = el('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }); g.appendChild(el('stop', { offset: 0, style: 'stop-color:' + c1 })); g.appendChild(el('stop', { offset: 1, style: 'stop-color:' + c2 })); defs.appendChild(g); };
        grad('lab-regolo-legno', 'var(--legno)', 'var(--legno2)');
        grad('lab-regolo-mobile', 'var(--mobile)', 'var(--mobile2)');
        const xa = X(-.045), xb = X(1.045), fs = n => `font: ${n} var(--font)`;
        const T = (g, x, y, t, st, anc, col) => g.appendChild(el('text', { x, y, 'text-anchor': anc || 'middle', fill: col || 'var(--inchiostro)', style: st }, t));

        /* binario: la scanalatura dove scorre il righello mobile, e la guida sotto */
        gFisso = el('g'); svg.appendChild(gFisso);
        gFisso.appendChild(el('rect', { x: xa, y: yB, width: xb - xa, height: yC - yB + 8, rx: 6, fill: 'var(--legno3)', opacity: .55 }));
        const guida = el('g', { class: 'corpo' }); gFisso.appendChild(guida);
        guida.appendChild(el('rect', { x: xa, y: yC + 1, width: xb - xa, height: 7, rx: 3.5, fill: 'url(#lab-regolo-legno)', stroke: 'var(--legno-bordo)', 'stroke-width': 1 }));

        /* righello fisso */
        const corpo = el('g', { class: 'corpo' }); gFisso.appendChild(corpo);
        corpo.appendChild(el('rect', { x: xa, y: yS, width: xb - xa, height: yB - yS, rx: 9, fill: 'url(#lab-regolo-legno)', stroke: 'var(--legno-bordo)', 'stroke-width': 1 }));
        for (let i = 0; i < 5; i++) {                    /* venatura leggera */
          const y = yS + 12 + i * (yB - yS - 20) / 4, o = (i % 2 ? 5 : -4) * k;
          gFisso.appendChild(el('path', { d: `M${xa + 6} ${y} C${X(.3)} ${y + o} ${X(.6)} ${y - o} ${xb - 6} ${y + o * .4}`, stroke: 'var(--inchiostro2)', 'stroke-width': 1.2, fill: 'none', opacity: .07 }));
        }
        /* bordo in centimetri */
        const yCm = yS + Math.round(30 * k);
        gFisso.appendChild(el('line', { x1: xa + 4, y1: yCm, x2: xb - 4, y2: yCm, stroke: 'var(--legno-bordo)', 'stroke-width': 1 }));
        const pxCm = L / CM, mm = pxCm / 10 >= 2.6, mezzo = pxCm / 2 >= 3.5;
        const passoCm = mm ? .1 : (mezzo ? .5 : 1);
        for (let i = 0; i <= Math.round(CM / passoCm); i++) {
          const c = +(i * passoCm).toFixed(2), x = X(c / CM);
          const lung = (Math.abs(c % 5) < 1e-6 ? 12 : Math.abs(c % 1) < 1e-6 ? 8 : Math.abs(c % .5) < 1e-6 ? 5.5 : 3.5) * k;
          gFisso.appendChild(el('line', { x1: x, y1: yS + 1, x2: x, y2: yS + 1 + lung, stroke: 'var(--inchiostro2)', 'stroke-width': .9 }));
        }
        for (let c = 0; c <= CM; c += 5) T(gFisso, X(c / CM), yS + 24 * k, c === CM && !G.largo ? '25 cm' : String(c), fs(`500 ${Math.round(10 * k)}px`), c === CM && !G.largo ? 'end' : 'middle', 'var(--inchiostro2)');
        if (G.largo) T(gFisso, xb - 3, yS + 24 * k, 'cm', fs(`500 ${Math.round(9 * k)}px`), 'end', 'var(--inchiostro2)');
        /* scritta nel binario, visibile solo finché il righello mobile non c'è */
        gFisso.appendChild(el('text', { class: 'binario-vuoto', x: X(.5), y: (yB + yC) / 2 + 4, 'text-anchor': 'middle', fill: 'var(--inchiostro2)', opacity: .7, style: fs(`500 ${Math.round(11.5 * k)}px`) }, 'qui arriva il righello mobile, dal livello 2'));

        /* scala D: tacche che salgono dalla linea di contatto */
        const LT = [16, 11, 7, 4.5].map(v => v * k), elenco = tacche(L);
        const scala = (g, x0, y0, verso) => {
          elenco.forEach(t => {
            const x = x0 + LOG(t.v) * L;
            g.appendChild(el('line', { x1: x, y1: y0, x2: x, y2: y0 + verso * LT[t.liv], stroke: 'var(--inchiostro)', 'stroke-width': t.liv === 0 ? 1.4 : 1, opacity: t.liv > 1 ? .8 : 1 }));
          });
          const yN = verso < 0 ? y0 - 21 * k : y0 + 32 * k;
          for (let n = 1; n <= 10; n++) {
            const px = G.largo ? (n === 1 || n === 10 ? 15 : 14) : (n === 10 ? 13 : n >= 7 ? 12.5 : 14);
            T(g, x0 + LOG(n) * L + (n === 10 && !G.largo ? 1.5 : 0), yN, String(n), fs(`600 ${Math.round(px * k)}px`));
          }
          T(g, x0 + LOG(1.5) * L, verso < 0 ? y0 - 19 * k : y0 + 29 * k, '1,5', fs(`500 ${Math.round(9.5 * k)}px`), 'middle', 'var(--inchiostro2)');
        };
        scala(gFisso, M, yB, -1);
        if (G.largo) T(gFisso, xa + 5 * k, yB - 5 * k, 'D', fs(`700 ${Math.round(9 * k)}px`), 'start', 'var(--inchiostro2)');

        /* righello mobile (disegnato con s = 0, poi spostato) */
        gMobile = el('g', { class: 'mobile', tabindex: 0, role: 'slider', 'aria-label': 'Righello mobile: frecce per spostarlo' }); svg.appendChild(gMobile);
        const cm = el('g', { class: 'corpo' }); gMobile.appendChild(cm);
        const ma = X(-.035), mb = X(1.035);
        cm.appendChild(el('rect', { class: 'corpo-mobile', x: ma, y: yB + 2, width: mb - ma, height: yC - yB - 2, rx: 6, fill: 'url(#lab-regolo-mobile)', stroke: 'var(--legno-bordo)', 'stroke-width': 1 }));
        [ma + 7, mb - 7].forEach(x => { for (let i = -1; i <= 1; i++) gMobile.appendChild(el('line', { x1: x + i * 3.5, y1: yC - 18 * k, x2: x + i * 3.5, y2: yC - 6 * k, stroke: 'var(--inchiostro2)', 'stroke-width': 1.2, opacity: .35, 'stroke-linecap': 'round' })); });
        scala(gMobile, M, yB + 2, 1);
        if (G.largo) T(gMobile, ma + 5 * k, yB + 14 * k, 'C', fs(`700 ${Math.round(9 * k)}px`), 'start', 'var(--inchiostro2)');

        gFrecce = el('g'); svg.appendChild(gFrecce);
        gFesta = el('g', { 'pointer-events': 'none' }); svg.appendChild(gFesta);

        /* cursore: vetro, filo, linguetta sotto (il dito non copre la lettura) */
        gCursore = el('g', { class: 'cursore', tabindex: 0, role: 'slider', 'aria-label': 'Cursore con il filo: frecce per spostarlo' }); svg.appendChild(gCursore);
        const vy0 = yS - 9, vy1 = yC + 10;
        gCursore.appendChild(el('rect', { x: -17, y: vy0, width: 34, height: vy1 - vy0, rx: 7, fill: 'var(--vetro)', stroke: 'var(--vetro-bordo)', 'stroke-width': 1.2 }));
        gCursore.appendChild(el('rect', { x: -13, y: vy0 + 3, width: 6, height: vy1 - vy0 - 6, rx: 3, fill: '#fff', opacity: .16 }));
        gCursore.appendChild(el('line', { x1: 0, y1: vy0 + 1, x2: 0, y2: vy1 - 1, stroke: 'var(--filo)', 'stroke-width': 1.6 }));
        const lin = el('rect', { class: 'linguetta', x: -23, y: yT, width: 46, height: 42, rx: 12, fill: 'var(--sup)', stroke: 'var(--bordo2)', 'stroke-width': 1.2 });
        gCursore.appendChild(lin);
        gCursore.appendChild(el('path', { d: `M-6 ${yT + 1} L0 ${yT - 6} L6 ${yT + 1} Z`, fill: 'var(--filo)' }));
        for (let i = -1; i <= 1; i++) gCursore.appendChild(el('line', { x1: i * 6, y1: yT + 13, x2: i * 6, y2: yT + 29, stroke: 'var(--testo2)', 'stroke-width': 2, 'stroke-linecap': 'round', opacity: .55 }));

        svg.setAttribute('height', H);
        gMobile.addEventListener('keydown', ev => tasto(ev, 'mobile'));
        gCursore.addEventListener('keydown', ev => tasto(ev, 'cursore'));
        disegna(true);
      }

      /* ---------------- frecce: le lunghezze che si sommano ---------------- */
      const BLU = 'var(--s1)', ARANCIO = 'var(--s2)', VERDE = 'var(--s3)', VIOLA = 'var(--s4)';
      const numC = v => num(v, 2).replace(/,?0+$/, '');           /* 2,00 → 2 · 2,50 → 2,5 */
      const timers = [];
      const dopo = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

      function etichetta(g, x0, x1, y, testo, col) {
        const f = Math.round(11.5 * G.k), w = testo.length * f * .57 + 14, hh = f + 8, len = Math.abs(x1 - x0);
        let cx = (x0 + x1) / 2;
        if (len < w + 18) {                         /* freccia corta: l'etichetta va di fianco */
          const dx = Math.max(x0, x1) + 8 + w / 2;
          cx = dx + w / 2 < G.W - 2 ? dx : Math.min(x0, x1) - 8 - w / 2;
        }
        cx = morsa(cx, w / 2 + 2, G.W - w / 2 - 2);
        g.appendChild(el('rect', { x: cx - w / 2, y: y - hh / 2, width: w, height: hh, rx: hh / 2, fill: 'var(--sup)', stroke: col, 'stroke-width': 1.4 }));
        g.appendChild(el('text', { x: cx, y: y + f * .36, 'text-anchor': 'middle', fill: col, style: `font: 600 ${f}px var(--font)` }, testo));
      }
      function freccia(x0, x1, y, col, testo, opz) {
        opz = opz || {};
        const g = el('g', { opacity: opz.op != null ? opz.op : 1 }); gFrecce.appendChild(g);
        const k = G.k, dir = x1 >= x0 ? 1 : -1, len = Math.abs(x1 - x0);
        if (len >= 1.5) {
          const punta = Math.min(9 * k, len * .55);
          g.appendChild(el('line', { x1: x0, y1: y - 6 * k, x2: x0, y2: y + 6 * k, stroke: col, 'stroke-width': 2, 'stroke-linecap': 'round' }));
          g.appendChild(el('line', { x1: x0, y1: y, x2: x1 - dir * punta * .7, y2: y, stroke: col, 'stroke-width': 3 * k, 'stroke-linecap': 'round', 'stroke-dasharray': opz.tratto || null }));
          g.appendChild(el('path', { d: `M${x1.toFixed(1)} ${y} L${(x1 - dir * punta).toFixed(1)} ${y - 5.5 * k} L${(x1 - dir * punta).toFixed(1)} ${y + 5.5 * k} Z`, fill: col }));
        }
        if (testo && !opz.muta) etichetta(g, x0, x1, y, testo, col);
      }
      /* a livello vinto: la stessa lunghezza messa più volte, un tratto dopo l'altro */
      function catena(c, y) {
        const passo = LOG(c.base), X = G.X, nome = 'log ' + num(c.base, c.base % 1 ? 1 : 0);
        const stretti = passo * G.L < nome.length * 11.5 * G.k * .57 + 24;   /* tratti troppo corti per un'etichetta ciascuno */
        for (let i = 0; i < c.volte; i++) {
          const f = morsa(pCatena * c.volte - i, 0, 1);
          if (f <= 0) break;
          freccia(X(i * passo), X((i + f) * passo), y, i % 2 ? VIOLA : BLU, nome, { muta: f < 1 || stretti });
        }
        if (stretti && pCatena >= 1) etichetta(gFrecce, X(0), X(c.volte * passo), y, c.volte + ' · ' + nome, BLU);
      }

      function frecce() {
        if (!G) return;
        vuota(gFrecce);
        const L = liv(), X = G.X;
        if (L.modo === 'misura') {
          if (vinto && L.catena) catena(L.catena, G.yA);
          else freccia(X(0), X(LOG(2)), G.yA, BLU, '7,5 cm', { op: .8 });
          freccia(X(0), X(h), G.yR, VERDE, num(h * CM, 1) + ' cm');
        } else {
          const idx10 = s < 0, uI = idx10 ? s + 1 : s, t = h - s, bOk = t >= -1e-9 && t <= 1 + 1e-9;
          const b = Math.pow(10, t);
          if (L.modo === 'per') {
            const a = Math.pow(10, uI);
            if (vinto && L.catena) catena(L.catena, G.yA);
            else freccia(X(0), X(uI), G.yA, BLU, 'log ' + numC(a));
            if (bOk) {
              freccia(X(uI), X(h), G.yBf, ARANCIO, idx10 ? 'log ' + numC(b) + ' − 1' : 'log ' + numC(b), { tratto: idx10 ? '7 5' : null });
              freccia(X(0), X(h), G.yR, VERDE, idx10 ? 'log(' + numC(a) + '·' + numC(b) + ') − 1' : 'log(' + numC(a) + '·' + numC(b) + ')');
            }
          } else {
            const a = Math.pow(10, h);
            freccia(X(0), X(h), G.yA, BLU, 'log ' + numC(a));
            if (bOk) {
              freccia(X(h), X(uI), G.yBf, ARANCIO, idx10 ? '1 − log ' + numC(b) : '− log ' + numC(b), { tratto: idx10 ? '7 5' : null });
              freccia(X(0), X(uI), G.yR, VERDE, idx10 ? 'log(10·' + numC(a) + ' : ' + numC(b) + ')' : 'log(' + numC(a) + ' : ' + numC(b) + ')');
            }
          }
        }
        if (segno) {                                   /* dove sta il numero scritto dallo studente */
          const v = segno.v, u = v >= 1 && v <= 10 ? LOG(v) : (v > 10 && v <= 100 ? LOG(v / 10) : null);
          if (u != null) {
            const x = X(u), g = el('g', { class: 'segno' }); gFrecce.appendChild(g);
            g.appendChild(el('line', { x1: x, y1: 20 * G.k, x2: x, y2: G.yB, stroke: 'var(--no)', 'stroke-width': 2, 'stroke-dasharray': '4 4' }));
            g.appendChild(el('path', { d: `M${x - 6} ${G.yB - 12} L${x + 6} ${G.yB - 12} L${x} ${G.yB - 2} Z`, fill: 'var(--no)' }));
            const f = Math.round(11.5 * G.k), testo = 'tu: ' + String(v).replace('.', ','), w = testo.length * f * .57 + 14, cx = morsa(x, w / 2 + 2, G.W - w / 2 - 2), yy = 11 * G.k;
            g.appendChild(el('rect', { x: cx - w / 2, y: yy - (f + 8) / 2, width: w, height: f + 8, rx: (f + 8) / 2, fill: 'var(--no)' }));
            g.appendChild(el('text', { x: cx, y: yy + f * .36, 'text-anchor': 'middle', fill: '#fff', style: `font: 700 ${f}px var(--font)` }, testo));
          }
        }
      }

      /* ---------------- formula scritta, aggiornata mentre si muove ---------------- */
      function formula() {
        const L = liv(), cmT = u => numT(u * CM, 1) + '\\text{ cm}';
        let e1, e2, t1, t2;
        if (L.modo === 'misura') {
          e1 = 'la regola'; t1 = '\\text{distanza dall\'1} = 25\\text{ cm}\\cdot \\log x';
          e2 = 'il filo'; t2 = numT(h * CM, 1) + '\\text{ cm} \\;\\Rightarrow\\; \\log x = ' + numT(h * CM, 1) + ' : 25 = ' + numT(h, 3);
        } else {
          const idx10 = s < 0, uI = idx10 ? s + 1 : s, t = h - s, bOk = t >= -1e-9 && t <= 1 + 1e-9;
          const b = numT(Math.pow(10, t), 2), fuori = '\\text{porta il filo su un numero del righello di sotto}';
          e1 = 'numeri'; e2 = 'lunghezze';
          if (L.modo === 'per') {
            const a = numT(Math.pow(10, uI), 2);
            if (!bOk) { t1 = `\\log ${a} + \\log b = \\log(${a}\\cdot b)`; t2 = fuori; }
            else if (!idx10) { t1 = `\\log ${a} + \\log ${b} = \\log(${a}\\cdot ${b})`; t2 = `${cmT(uI)} + ${cmT(t)} = ${cmT(h)}`; }
            else { t1 = `\\log ${a} + \\log ${b} - \\log 10 = \\log(${a}\\cdot ${b} : 10)`; t2 = `${cmT(uI)} + ${cmT(t)} - 25\\text{ cm} = ${cmT(h)}`; }
          } else {
            const a = numT(Math.pow(10, h), 2);
            if (!bOk) { t1 = `\\log ${a} - \\log b = \\log(${a} : b)`; t2 = fuori; }
            else if (!idx10) { t1 = `\\log ${a} - \\log ${b} = \\log(${a} : ${b})`; t2 = `${cmT(h)} - ${cmT(t)} = ${cmT(uI)}`; }
            else { t1 = `\\log ${a} - \\log ${b} + \\log 10 = \\log(10\\cdot ${a} : ${b})`; t2 = `${cmT(h)} - ${cmT(t)} + 25\\text{ cm} = ${cmT(uI)}`; }
          }
        }
        et1.textContent = e1; et2.textContent = e2;
        if (t1 !== cache1) { f1.innerHTML = ctx.tex(t1); cache1 = t1; }
        if (t2 !== cache2) { f2.innerHTML = ctx.tex(t2); cache2 = t2; }
      }

      function disegna() {
        if (!G) return;
        const vis = conMobile();
        gMobile.setAttribute('transform', `translate(${(s * G.L).toFixed(2)} 0)`);
        gMobile.style.opacity = vis ? '' : '0';
        gMobile.style.pointerEvents = vis ? '' : 'none';
        gMobile.setAttribute('tabindex', vis ? 0 : -1);
        const vuoto = svg.querySelector('.binario-vuoto'); if (vuoto) vuoto.style.display = vis ? 'none' : '';
        gCursore.setAttribute('transform', `translate(${G.X(h).toFixed(2)} 0)`);
        frecce(); formula();
      }
      function pianifica() { if (!rafDisegno) rafDisegno = requestAnimationFrame(() => { rafDisegno = 0; disegna(); }); }
      function cambiato() {
        if (segno) segno = null;
        if (!vinto && input.className) input.className = '';
        pianifica();
      }

      /* scorrimento animato verso una posizione (con riserva a tempo, se rAF è strozzato) */
      function vaiA(s1, h1, dur, poi) {
        cancelAnimationFrame(raf); animando = true;
        const s0 = s, h0 = h, t0 = performance.now();
        let chiuso = false;
        const fine = () => { if (chiuso) return; chiuso = true; cancelAnimationFrame(raf); raf = 0; s = s1; h = h1; animando = false; disegna(); if (poi) poi(); };
        const passo = tt => {
          if (chiuso) return;
          const u = Math.min(1, (tt - t0) / dur), e = liscia(u);
          s = s0 + (s1 - s0) * e; h = h0 + (h1 - h0) * e; disegna();
          if (u < 1) raf = requestAnimationFrame(passo); else fine();
        };
        raf = requestAnimationFrame(passo);
        dopo(fine, dur + 250);
      }

      /* piccola festa a livello superato: scintille dal punto del risultato e catena delle lunghezze */
      function festa() {
        const L = liv(), X = G.X;
        const uR = L.modo === 'diviso' ? (s < 0 ? s + 1 : s) : h;
        const cx = X(uR), cy = G.yB - 30 * G.k;
        vuota(gFesta);
        const colori = [BLU, ARANCIO, VERDE, VIOLA, 'var(--ok)', 'var(--accento)'];
        const anello = el('circle', { cx, cy: G.yB, r: 4, fill: 'none', stroke: 'var(--ok)', 'stroke-width': 3 }); gFesta.appendChild(anello);
        const pezzi = [];
        for (let i = 0; i < 18; i++) {
          const ang = -Math.PI * (.08 + .84 * i / 17) + (i % 2 ? .12 : -.12), v = (60 + (i * 37) % 50) * G.k;
          const n = i % 3 ? el('circle', { r: 3.2 * G.k, fill: colori[i % colori.length] }) : el('rect', { width: 6 * G.k, height: 6 * G.k, rx: 1.5, fill: colori[i % colori.length] });
          gFesta.appendChild(n); pezzi.push({ n, ang, v, rot: i * 40 });
        }
        const t0 = performance.now(), dur = 720;
        let chiuso = false;
        const chiudi = () => { if (chiuso) return; chiuso = true; cancelAnimationFrame(rafFesta); rafFesta = 0; vuota(gFesta); pCatena = 1; frecce(); };
        const passo = tt => {
          if (chiuso) return;
          const u = Math.min(1, (tt - t0) / dur);
          pCatena = L.catena ? Math.min(1, u * 1.2) : 0;
          frecce();
          anello.setAttribute('r', (4 + 30 * liscia(u)) * G.k); anello.setAttribute('opacity', 1 - u);
          pezzi.forEach(p => {
            const d = p.v * liscia(u), x = cx + Math.cos(p.ang) * d, y = cy + Math.sin(p.ang) * d + 40 * G.k * u * u;
            if (p.n.tagName === 'circle') { p.n.setAttribute('cx', x); p.n.setAttribute('cy', y); }
            else { p.n.setAttribute('x', x - 3 * G.k); p.n.setAttribute('y', y - 3 * G.k); p.n.setAttribute('transform', `rotate(${p.rot + u * 220} ${x} ${y})`); }
            p.n.setAttribute('opacity', u < .6 ? 1 : 1 - (u - .6) / .4);
          });
          if (u < 1) rafFesta = requestAnimationFrame(passo); else chiudi();
        };
        rafFesta = requestAnimationFrame(passo);
        dopo(chiudi, dur + 300);
      }

      /* ---------------- dito, mouse e tastiera ---------------- */
      function punto(ev) {
        const r = svg.getBoundingClientRect();
        const x = (ev.clientX - r.left) * (G.W / (r.width || 1)), y = (ev.clientY - r.top) * (G.H / (r.height || 1));
        return { x, y, u: (x - G.M) / G.L };
      }
      function giu(ev) {
        if (animando || !G) return;
        const p = punto(ev);
        const suMobile = conMobile() && p.y >= G.yB && p.y <= G.yC + 4 && p.x >= G.X(s - .035) && p.x <= G.X(s + 1.035);
        if (suMobile) { presa = 'mobile'; off = s - p.u; gMobile.classList.add('presa'); }
        else {
          presa = 'cursore';
          if (Math.abs(p.x - G.X(h)) <= 26) off = h - p.u;
          else { off = 0; h = morsa(p.u, 0, 1); cambiato(); }
        }
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!presa) return;
        const p = punto(ev);
        if (presa === 'cursore') h = morsa(p.u + off, 0, 1);
        else s = morsa(p.u + off, -.985, .985);
        cambiato();
        ev.preventDefault();
      }
      function molla() {
        if (!presa) return;
        presa = null; gMobile.classList.remove('presa');
        controllaUscita();
      }
      /* livello 5: il numero del righello di sotto finisce oltre il 10 di sopra */
      function controllaUscita() {
        const U = liv().uscita;
        if (!U || uscitaDetta || vinto || s < 0) return;
        if (s + LOG(U.b) > 1.01 && Math.abs(s - LOG(U.a)) < .05) {
          uscitaDetta = true;
          ctx.zenone('Il ' + U.b + ' del righello di sotto è finito oltre il 10 di sopra: lì non c\'è niente da leggere. Il righello di sotto ha anche un 10, all\'altra estremità.', { tipo: 'suggerimento', espressione: 'sorpreso', durata: 8000 });
        }
      }
      function tasto(ev, chi) {
        if (animando) return;
        const passo = ev.shiftKey ? .01 : .002;
        let d = 0;
        if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') d = passo;
        else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') d = -passo;
        else return;
        if (chi === 'cursore') h = morsa(h + d, 0, 1); else s = morsa(s + d, -.985, .985);
        cambiato(); ev.preventDefault();
      }
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi);
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);

      /* ---------------- livelli ---------------- */
      function pillole() {
        vuota(pillEl);
        const max = completati.length ? Math.max(...completati) : -1;
        LIVELLI.forEach((_, i) => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'pill' + (completati.includes(i) ? ' fatto' : '') + (i === livello ? ' qui' : '');
          b.textContent = String(i + 1); b.title = 'Livello ' + (i + 1);
          b.disabled = i > max + 1;
          b.addEventListener('click', () => { if (i !== livello || vinto) avviaLivello(i); });
          pillEl.appendChild(b);
        });
      }
      let mobileVisto = false;
      function avviaLivello(n) {
        cancelAnimationFrame(rafFesta); rafFesta = 0; vuota(gFesta || el('g'));
        livello = n; vinto = false; segno = null; pCatena = 0; uscitaDetta = false; presa = null;
        const L = liv();
        objEl.innerHTML = ctx.md(L.testo);
        aiutoEl.hidden = true; aiutoEl.textContent = L.aiuto;
        domEl.textContent = L.domanda;
        input.value = ''; input.className = ''; input.disabled = false; bControlla.disabled = false;
        msg.textContent = ''; msg.className = 'lab-messaggio';
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        livEl.textContent = 'Livello ' + (n + 1) + ' di ' + LIVELLI.length;
        pillole();
        if (conMobile() && !mobileVisto) s = -1.15;          /* il righello mobile entra da sinistra */
        mobileVisto = conMobile();
        vaiA(L.s0, L.h0, 480);
      }

      function vittoria() {
        const L = liv();
        vinto = true; segno = null;
        input.className = 'giusta'; input.disabled = true; bControlla.disabled = true;
        ctx.completato(livello); pillole();
        msg.innerHTML = '<span class="vinto">Giusto. ' + ctx.tex(L.finale) + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.zenone(L.vittoria, { espressione: 'orgoglioso', durata: 8000 });
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        vaiA(conMobile() ? L.sol.s : s, L.sol.h, 520, festa);
      }
      function sbaglio(v) {
        const L = liv();
        segno = { v }; frecce();
        input.className = 'sbagliata';
        form.classList.remove('scuoti'); void form.offsetWidth; form.classList.add('scuoti');
        const e = L.errori.find(x => Math.abs(v - x.v) <= x.v * .02 + 1e-9);
        if (e) {
          msg.textContent = e.zen.split(/(?<=\.)\s/)[0];
          ctx.zenone(e.zen, { tipo: 'errore', espressione: 'pensa', durata: 8000 });
        } else {
          msg.textContent = 'Non ancora: il segno rosso mostra dove sta il tuo ' + String(v).replace('.', ',') + ' sul regolo. Confrontalo con il filo.';
        }
        msg.className = 'lab-messaggio no';
      }
      form.addEventListener('submit', ev => {
        ev.preventDefault();
        if (vinto || animando) return;
        const testo = input.value.replace(/\s/g, '').replace(',', '.');
        if (!/^\d*\.?\d+$/.test(testo)) { msg.textContent = 'Scrivi un numero, per esempio 7,5.'; msg.className = 'lab-messaggio no'; input.focus(); return; }
        const v = parseFloat(testo), L = liv();
        if (Math.abs(v - L.ris) <= L.ris * L.tol) vittoria(); else sbaglio(v);
      });
      bRic.addEventListener('click', () => avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello));
      bAiuto.addEventListener('click', () => { aiutoEl.hidden = !aiutoEl.hidden; });

      /* la scena si ridisegna quando cambia larghezza (telefono girato, schermo intero) */
      let largo0 = 0;
      const ro = new ResizeObserver(() => { const w = Math.round(scena.clientWidth); if (w && Math.abs(w - largo0) > 2) { largo0 = w; costruisci(); } });
      ro.observe(scena);
      largo0 = Math.round(scena.clientWidth);
      costruisci();
      avviaLivello(livello);

      return function smonta() {
        cancelAnimationFrame(raf); cancelAnimationFrame(rafDisegno); cancelAnimationFrame(rafFesta);
        timers.forEach(clearTimeout);
        ro.disconnect();
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
