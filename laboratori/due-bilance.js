/* Laboratorio «Le due bilance» — i sistemi lineari 2×2 come due pesate.
   Due bilance a piatti in equilibrio. A sinistra mele (x) e pere (y) di peso ignoto, ed
   eventualmente dei pesi; a destra solo pesi. Ogni bilancia è un'equazione  m·x + p·y + g = d.
   Le mosse agiscono su quello che si è scelto: tutta la bilancia (la mossa tiene l'equilibrio),
   un piatto solo o un tipo di frutto solo (l'errore tipico: la bilancia pende e lo si vede).
     ×2 ×3 ÷2 ÷3   moltiplica o divide la scelta
     togli B        toglie dalla bilancia scelta il contenuto dell'altra (riduzione)
     togli … g      toglie i grammi che stanno accanto ai frutti
     sostituisci    una bilancia «1 pera = 300 g» si trascina sull'altra: le pere diventano grammi
   Da che parte pende una bilancia lo decide la fisica: i frutti hanno un peso vero (livello.pesi).
   Nei sistemi indeterminati e impossibili i pesi veri non sono unici o non esistono: lì conta
   anche da dove viene una bilancia (der = ottenuta solo con mosse su bilance intere).
   Contratto: SCHEMA-LAB.md — modelli: laboratori/bilancia.js, laboratori/tessere.js */
(function () {
  const STILE = `
    .lab-due-bilance { --dbl-metallo: #59606f; --dbl-metallo2: #8d95a6; --dbl-filo: #9aa0ac; --dbl-piatto: #7b8394; --dbl-piatto2: #c5cad4;
      --dbl-ottone: #e9c46a; --dbl-ottone2: #b8862b; --dbl-ottone3: #fbe7ae; --dbl-inchiostro: #4a3206; --dbl-ombra: rgba(30,30,50,.16); }
    :root[data-tema="scuro"] .lab-due-bilance { --dbl-metallo: #b4bcc8; --dbl-metallo2: #7d8695; --dbl-filo: #6f7886; --dbl-piatto: #9aa3b1; --dbl-piatto2: #5b6472;
      --dbl-ottone: #c99a3c; --dbl-ottone2: #8f6a22; --dbl-ottone3: #e8c77a; --dbl-inchiostro: #2e1f03; --dbl-ombra: rgba(0,0,0,.5); }
    .lab-due-bilance .carta { fill: var(--sup); stroke: var(--bordo); stroke-width: 1.5; filter: url(#dbl-ombra); transition: fill .3s, stroke .3s; }
    .lab-due-bilance .bil.scelta-tutta .carta { stroke: var(--accento); stroke-width: 2.5; }
    .lab-due-bilance .bil.pende .carta { fill: color-mix(in srgb, var(--no) 7%, var(--sup)); stroke: color-mix(in srgb, var(--no) 55%, var(--bordo)); }
    .lab-due-bilance .bil.bersaglio .carta { stroke: var(--accento); stroke-width: 3; stroke-dasharray: 10 7; fill: var(--accento-tenue); }
    .lab-due-bilance .bil.vinta .carta { stroke: var(--ok); stroke-width: 3; }
    .lab-due-bilance .sigla circle { fill: var(--accento-tenue); stroke: color-mix(in srgb, var(--accento) 40%, transparent); stroke-width: 1.5; }
    .lab-due-bilance .sigla text { fill: var(--accento-testo); font: 700 21px var(--font-titoli); }
    .lab-due-bilance .stato-pill rect { fill: var(--sup2); stroke: var(--bordo); stroke-width: 1.2; }
    .lab-due-bilance .stato-pill text { fill: var(--testo2); font: 600 16px var(--font); }
    .lab-due-bilance .stato-pill.ok rect { fill: var(--ok-tenue); stroke: color-mix(in srgb, var(--ok) 45%, transparent); }
    .lab-due-bilance .stato-pill.ok text { fill: var(--ok); }
    .lab-due-bilance .stato-pill.no rect { fill: var(--no-tenue); stroke: color-mix(in srgb, var(--no) 45%, transparent); }
    .lab-due-bilance .stato-pill.no text { fill: var(--no); }
    .lab-due-bilance .quadrante { fill: none; stroke: var(--bordo2); stroke-width: 5; stroke-linecap: round; }
    .lab-due-bilance .tacca0 { stroke: var(--testo3); stroke-width: 3; stroke-linecap: round; transition: stroke .3s; }
    .lab-due-bilance .bil.pari .tacca0 { stroke: var(--ok); }
    .lab-due-bilance .ago { stroke: var(--testo2); stroke-width: 3; stroke-linecap: round; transition: stroke .3s; }
    .lab-due-bilance .bil.pende .ago { stroke: var(--no); }
    .lab-due-bilance .trave { fill: url(#dbl-metallo); stroke: color-mix(in srgb, var(--dbl-metallo) 70%, #000); stroke-width: 1; }
    .lab-due-bilance .colonna { fill: url(#dbl-metallo); }
    .lab-due-bilance .piede { fill: var(--dbl-metallo); opacity: .9; }
    .lab-due-bilance .perno { fill: var(--accento); stroke: var(--sup); stroke-width: 2.5; }
    .lab-due-bilance .gancio { fill: var(--sup); stroke: var(--dbl-metallo); stroke-width: 2.5; }
    .lab-due-bilance .filo { stroke: var(--dbl-filo); stroke-width: 1.6; }
    .lab-due-bilance .piatto-corpo { fill: url(#dbl-piatto); stroke: color-mix(in srgb, var(--dbl-piatto) 70%, #000); stroke-width: 1; }
    .lab-due-bilance .presa-piatto { fill: transparent; }
    .lab-due-bilance .alone { fill: color-mix(in srgb, var(--accento) 9%, transparent); stroke: var(--accento); stroke-width: 2.2; stroke-dasharray: 7 6; pointer-events: none; }
    .lab-due-bilance .corpo-mela { fill: url(#dbl-mela); stroke: rgba(90,10,5,.35); stroke-width: 1; }
    .lab-due-bilance .corpo-pera { fill: url(#dbl-pera); stroke: rgba(60,70,10,.35); stroke-width: 1; }
    .lab-due-bilance .picciolo { stroke: #6b4423; stroke-width: 2.4; stroke-linecap: round; fill: none; }
    .lab-due-bilance .foglia { fill: #3f9b4a; }
    .lab-due-bilance .riflesso { fill: #fff; opacity: .38; }
    .lab-due-bilance .peso .corpo { fill: url(#dbl-ottone); stroke: var(--dbl-ottone2); stroke-width: 1.3; }
    .lab-due-bilance .peso .pomo { fill: var(--dbl-ottone); stroke: var(--dbl-ottone2); stroke-width: 1.3; }
    .lab-due-bilance .peso text { fill: var(--dbl-inchiostro); font: 700 15px var(--font); pointer-events: none; }
    .lab-due-bilance .frutto, .lab-due-bilance .peso { filter: url(#dbl-ombra-p); }
    .lab-due-bilance .trascinabile { cursor: grab; }
    .lab-due-bilance .anello { fill: none; stroke: var(--accento); stroke-width: 2; stroke-dasharray: 4 4; animation: lab-dbl-anello 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; pointer-events: none; }
    @keyframes lab-dbl-anello { 0%, 100% { opacity: .35; transform: scale(.94) } 50% { opacity: 1; transform: scale(1.06) } }
    .lab-due-bilance .mano { pointer-events: none; }
    .lab-due-bilance .mano .cartellino rect { fill: var(--testo); }
    .lab-due-bilance .mano .cartellino text { fill: var(--sup); font: 700 15px var(--font); }
    .lab-due-bilance { -webkit-user-select: none; user-select: none; }
    /* --- scena: le due bilance, una sopra l'altra o affiancate (lo decide disponi() misurando lo spazio) --- */
    .lab-due-bilance .lab-scena { background: radial-gradient(120% 90% at 50% 0%, var(--sup), var(--sup2)); overflow: hidden; }
    .lab-due-bilance .lab-scena > svg { padding: 6px; box-sizing: border-box; touch-action: none; }
    .lab-due-bilance .stato-pill text { font-size: var(--dbl-fs-pill, 16px); }
    /* --- pannello --- */
    .lab-due-bilance .obiettivo { font-size: clamp(.92rem, 2.1cqmin, 1.05rem); line-height: 1.45; text-align: center; }
    .lab-due-bilance .obiettivo p { margin: 0; display: inline; }
    .lab-due-bilance .obiettivo .c-breve { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-due-bilance .obiettivo .c-breve { display: inline; } .lab-due-bilance .obiettivo .c-breve + .c-lungo { display: none; } }
    .lab-due-bilance .lab-aiuto .consegna { color: var(--testo2); margin-bottom: 10px; }
    .lab-due-bilance .lab-aiuto .consegna p { margin: 0; }
    .lab-due-bilance .lab-aiuto .legenda { justify-content: flex-start; margin-bottom: 10px; }
    .lab-due-bilance .strumenti { display: grid; gap: 6px; }
    .lab-due-bilance .scelta { font-size: clamp(.86rem, 1.9cqmin, .95rem); color: var(--testo2); text-align: center; line-height: 1.35; }
    .lab-due-bilance .scelta b { color: var(--accento-testo); font-weight: 600; }
    .lab-due-bilance .mosse { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
    .lab-due-bilance .mosse .btn { min-height: clamp(40px, 5.6cqh, 48px); min-width: 44px; padding: 6px 10px; font-weight: 600; }
    .lab-due-bilance .mosse .btn.op { font-size: 1.05rem; font-variant-numeric: tabular-nums; }
    .lab-due-bilance .mosse .btn[disabled] { opacity: .38; cursor: default; }
    .lab-due-bilance .mosse .gruppo { display: inline-flex; gap: 0; border-radius: 12px; box-shadow: var(--ombra); }
    .lab-due-bilance .mosse .gruppo .btn { border-radius: 0; margin-left: -1px; }
    .lab-due-bilance .mosse .gruppo .btn:first-child { border-radius: 12px 0 0 12px; margin-left: 0; }
    .lab-due-bilance .mosse .gruppo .btn:last-child { border-radius: 0 12px 12px 0; }
    @container lab (max-width: 420px) { .lab-due-bilance .mosse .btn { padding: 6px 8px; } .lab-due-bilance .mosse .btn.op { min-width: 42px; } }
    .lab-due-bilance .scuoti { animation: lab-dbl-no .38s ease; }
    @keyframes lab-dbl-no { 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
    /* il sistema con la legenda accanto (x = mela, y = pera), e sotto l'ultima mossa */
    .lab-due-bilance .formula { display: grid; gap: 2px; justify-items: center; }
    .lab-due-bilance .f-sis-riga { display: flex; align-items: center; justify-content: center; gap: 6px 14px; }
    .lab-due-bilance .f-sis { font-size: clamp(1.02rem, 2.3cqmin, 1.2rem); white-space: nowrap; }
    .lab-due-bilance .legenda { display: flex; flex-direction: column; gap: 0; font-size: 12.5px; color: var(--testo2); line-height: 1.25; }
    .lab-due-bilance .legenda span { display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; }
    .lab-due-bilance .legenda svg { width: 16px; height: 19px; }
    .lab-due-bilance .f-mossa { font-size: clamp(.9rem, 2cqmin, 1rem); color: var(--testo); width: 100%; overflow: hidden; white-space: nowrap; text-align: center; line-height: 1.6; }
    .lab-due-bilance .f-mossa .f-et { font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--testo2); margin-right: 6px; }
    .lab-due-bilance .f-vuoto { font-size: .85rem; color: var(--testo3); }
    .lab-due-bilance .dbl-pende { color: var(--no); }
    .lab-due-bilance .lab-messaggio { padding: 0 4px; min-height: 1.45em; font-size: clamp(.88rem, 2cqmin, 1.02rem); text-align: center; line-height: 1.45; }
    .lab-due-bilance .lab-messaggio:empty { display: none; }
    .lab-due-bilance .lab-messaggio .katex { font-size: 1em; }
    .lab-due-bilance .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; }
    .lab-due-bilance .lab-barra .btn { min-height: 40px; }
    .lab-due-bilance .lab-barra .btn[disabled] { opacity: .38; cursor: default; }
    /* modalità libera: mele, pere e grammi delle due bilance */
    /* sul telefono in verticale i pulsanti Annulla, Ricomincia e ? seguono le mosse, senza una riga tutta loro */
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) {
      .lab-due-bilance .strumenti { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
      .lab-due-bilance .strumenti .scelta { flex-basis: 100%; }
      .lab-due-bilance .strumenti .mosse, .lab-due-bilance .strumenti .lab-barra { display: contents; }
      .lab-due-bilance .strumenti .lab-barra .btn { min-height: 40px; }
    }
    .lab-due-bilance .lab-parametri { grid-template-columns: auto minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr); gap: 4px; max-width: 460px; }
    .lab-due-bilance .lab-param output { display: inline-flex; align-items: center; justify-content: center; gap: 1px; white-space: nowrap; }
    .lab-due-bilance .lab-param output svg { width: 13px; height: 16px; }
    .lab-due-bilance .lab-parametri .riga { font: 700 1rem var(--font-titoli); color: var(--accento-testo); }
    .lab-due-bilance .lab-param { gap: 2px; }
    .lab-due-bilance .param-fine { grid-column: 1 / -1; display: flex; justify-content: center; gap: 8px; }
    .lab-due-bilance .b-param, .lab-due-bilance .b-param-chiudi { display: none; }
    /* sul telefono in verticale, in modalità libera, i numeri delle bilance si aprono con un tocco e prendono il posto delle mosse */
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) {
      .lab-due-bilance.in-libero .b-param, .lab-due-bilance.in-libero .b-param-chiudi { display: inline-flex; }
      .lab-due-bilance.in-libero:not(.param-aperti) .lab-parametri { display: none; }
      .lab-due-bilance.in-libero.param-aperti .strumenti, .lab-due-bilance.in-libero.param-aperti .lab-messaggio { display: none; }
    }
    .lab-due-bilance .lab-param .btn { min-width: 36px; padding: 0 4px; }
    .lab-due-bilance .lab-param output { min-width: 2em; font-size: .95rem; }
    .lab-due-bilance .vinto { display: inline-block; animation: lab-dbl-pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-dbl-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
  `;

  /* ---------------- livelli ----------------
     A, B: [mele, pere, grammi a sinistra, grammi a destra].
     pesi: i pesi veri (uno se il sistema è determinato; due soluzioni diverse di A se è
     indeterminato o impossibile, così una mossa sbagliata pende sempre da qualche parte).
     tipo: 'det' si vince trovando x e y; 'indet' con una bilancia vuota in equilibrio (0 = 0);
     'imposs' con una bilancia senza frutti che pende (0 = 100). */
  const LIVELLI = [
    { A: [1, 1, 0, 500], B: [1, 0, 0, 200], pesi: [{ m: 200, p: 300 }], tipo: 'det',
      testo: 'La bilancia **B** dice già quanto pesa una mela. Trascina quella mela sulla bilancia **A**: al suo posto ci vanno 200 g. Poi scopri quanto pesa una pera.',
      bravo: 'Al posto della mela hai messo 200 g, poi hai tolto 200 g da tutti e due i piatti di A: una pera pesa 500 − 200 = 300 g. Questo è il metodo di sostituzione.' },
    { A: [2, 1, 0, 800], B: [1, 1, 0, 500], pesi: [{ m: 300, p: 200 }], tipo: 'det',
      testo: 'Su A c\'è tutto quello che c\'è su B, più una mela. Scegli la bilancia A e togli da lei il contenuto di B: cosa resta? Poi trova anche la pera.',
      bravo: 'A meno B lascia la mela in più: (2x + y) − (x + y) = 800 − 500, cioè x = 300. Togliere una bilancia dall\'altra è il metodo di riduzione.' },
    { A: [3, 2, 0, 1300], B: [1, 1, 0, 500], pesi: [{ m: 300, p: 200 }], tipo: 'det',
      testo: 'Quanto pesano una mela e una pera? Stavolta, se togli B da A una volta sola, su A restano ancora frutti di due tipi.',
      bravo: 'Per far sparire le pere da A, su B ne servivano tante quante su A: due volte B, cioè 2x + 2y = 1000. A − 2B lascia x = 300. Togliere B due volte di fila porta allo stesso punto.' },
    { A: [2, 1, 0, 800], B: [1, 2, 0, 700], pesi: [{ m: 300, p: 200 }], tipo: 'det',
      testo: 'Quanto pesano una mela e una pera? Qui nessuna bilancia contiene l\'altra: da A non puoi togliere B, né da B puoi togliere A.',
      bravo: 'Hai reso uguale il numero di pere (o di mele) sulle due bilance, e solo dopo hai tolto. È la riduzione nel caso generale: si moltiplica un\'equazione finché un\'incognita ha lo stesso coefficiente nelle due.' },
    { A: [2, 2, 0, 1000], B: [1, 1, 0, 500], pesi: [{ m: 200, p: 300 }, { m: 350, p: 150 }], tipo: 'indet',
      testo: 'Quanto pesano una mela e una pera? Prova a scoprirlo come prima, e guarda bene cosa ti rispondono le bilance.',
      bravo: 'La bilancia è rimasta vuota e sta in equilibrio: 0 = 0 è sempre vero e non dice niente. A era B pesata due volte, quindi le pesate vere erano una sola. Mela e pera possono pesare 200 e 300 g, 100 e 400 g, e in infiniti altri modi: il sistema è indeterminato.' },
    { A: [1, 1, 0, 500], B: [2, 2, 0, 900], pesi: [{ m: 200, p: 300 }, { m: 350, p: 150 }], tipo: 'imposs',
      testo: 'Ultima pesata: quanto pesano una mela e una pera? Controlla che le due bilance possano avere ragione insieme.',
      bravo: 'Una bilancia senza frutti che pende: 0 = 100 non può essere vero. Due mele e due pere dovrebbero pesare il doppio di una mela e una pera, 1000 g e non 900: le due pesate non possono essere giuste insieme. Il sistema è impossibile.' }
  ];

  const AIUTO = [
    '**Scegliere.** Tocca una bilancia fuori dai piatti (o la sua lettera) per sceglierla tutta. Tocca un piatto per sceglierne uno solo, un frutto per scegliere solo quel tipo di frutto. Toccando di nuovo la stessa cosa la scelta si allarga. Quello che hai scelto è scritto sopra le mosse.',
    '**Le mosse.** ×2 e ×3 moltiplicano quello che hai scelto; ÷2 e ÷3 lo dividono in parti uguali e ne tengono una. «Togli B» toglie dalla bilancia scelta tutto quello che c\'è sull\'altra, piatto per piatto: si può solo se c\'è abbastanza roba da togliere. «Togli … g» toglie i pesi che stanno accanto ai frutti.',
    '**Sostituire.** Quando una bilancia dice quanto pesa un frutto solo (per esempio una pera contro 300 g), trascina quel frutto sull\'altra bilancia: lì ogni pera diventa 300 g di pesi. Il pulsante *sostituisci* fa la stessa cosa.',
    '**L\'equilibrio.** Una mossa fatta su tutta la bilancia la lascia in equilibrio. Fatta su un piatto solo, o su un frutto solo, di solito la fa pendere: allora quello che la bilancia dice non è più vero, e conviene *Annulla*.',
    '**Quando hai finito.** Ti serve una bilancia con una mela sola contro dei pesi e una con una pera sola contro dei pesi. Se una bilancia resta senza frutti, guarda se sta in equilibrio: anche quello dice qualcosa.'
  ].join('\n\n');
  /* le consegne brevi, per il telefono in verticale (quella intera si legge nel «?») */
  const BREVI = [
    'Trascina la mela di **B** sulla bilancia **A** (al suo posto 200 g), poi trova la pera.',
    'Scegli **A** e togli da lei il contenuto di **B**: cosa resta? Poi trova la pera.',
    'Quanto pesano mela e pera? Togliere **B** da **A** una volta sola non basta.',
    'Quanto pesano mela e pera? Qui nessuna bilancia contiene l\'altra.',
    'Quanto pesano mela e pera? Guarda bene che cosa rispondono le bilance.',
    'Ultima pesata: le due bilance possono avere ragione insieme?'
  ];
  const AIUTO_LIBERO = '**Modalità libera.** Nessun livello da superare: con − e + scegli quante mele, quante pere e quanti grammi ci sono su ciascuna bilancia, poi prova le mosse. Le bilance partono in equilibrio; quando una mossa ne fa pendere una, vuol dire che quello che dice non è più vero. «Casuale» propone due pesate a caso.';

  /* ---------------- misure della scena (unità SVG) ---------------- */
  const BW = 520, BH = 262;                 /* una bilancia */
  const PIV = [260, 54], BRACCIO = 130;     /* perno e mezzo giogo */
  const PIANO = 232;                        /* quota del piatto a riposo */
  const CXP = { s: 130, d: 390 };           /* centri dei piatti */
  const RIGA = 47, LARGF = 42, MAXW = 212;  /* righe di oggetti sul piatto */
  const ES = 1.22;                          /* ingrandimento di frutti e pesi */
  const ANG = 7.5;                          /* inclinazione quando pende, in gradi */
  const MAXFRUTTI = 12, MAXGRAMMI = 9999;
  const DISPOSIZIONI = {
    stretta: { vb: [0, 0, BW, BH * 2 + 10], o: { A: [0, 0], B: [0, BH + 10] } },
    larga: { vb: [0, 0, BW * 2 + 28, BH], o: { A: [0, 0], B: [BW + 28, 0] } }
  };

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const f2 = v => +v.toFixed(2);
  const altra = k => k === 'A' ? 'B' : 'A';
  const nuovaBil = v => ({ m: v[0], p: v[1], g: v[2], d: v[3], der: true });
  const copia = b => ({ m: b.m, p: b.p, g: b.g, d: b.d, der: b.der });
  const frutti = b => b.m + b.p;

  /* ---------------- scrittura ---------------- */
  function sinistra(b) {             /* m·x + p·y + g */
    const parti = [];
    if (b.m) parti.push((b.m === 1 ? '' : b.m) + 'x');
    if (b.p) parti.push((b.p === 1 ? '' : b.p) + 'y');
    if (b.g) parti.push(String(b.g));
    return parti.length ? parti.join(' + ') : '0';
  }
  const nomeFr = (f, n) => f === 'm' ? (n === 1 ? 'mela' : 'mele') : (n === 1 ? 'pera' : 'pere');
  const piano = s => s.replace(/\\cdot/g, '·').replace(/-/g, '−');

  /* ---------------- disegni: mela, pera, peso (origine in basso al centro) ---------------- */
  function nodoMela() {
    const g = el('g', { class: 'frutto mela' });
    g.appendChild(el('path', { class: 'corpo-mela', d: 'M0 -26 C-5 -31 -16.5 -31 -16.5 -17.5 C-16.5 -6 -8.5 0 -4 -1 C-2 -1.6 2 -1.6 4 -1 C8.5 0 16.5 -6 16.5 -17.5 C16.5 -31 5 -31 0 -26 Z' }));
    g.appendChild(el('ellipse', { class: 'riflesso', cx: -7.5, cy: -19, rx: 3.4, ry: 5.8, transform: 'rotate(-18 -7.5 -19)' }));
    g.appendChild(el('path', { class: 'picciolo', d: 'M0 -25 Q0.5 -31 3 -35' }));
    g.appendChild(el('path', { class: 'foglia', d: 'M2.5 -31 Q9 -38.5 15 -33.5 Q8.5 -27.5 2.5 -31 Z' }));
    return g;
  }
  function nodoPera() {
    const g = el('g', { class: 'frutto pera' });
    g.appendChild(el('path', { class: 'corpo-pera', d: 'M0 -37 C-4.5 -37 -6.5 -33 -7 -27.5 C-7.5 -22 -15.5 -17.5 -15.5 -9.5 C-15.5 -2 -8 0 0 0 C8 0 15.5 -2 15.5 -9.5 C15.5 -17.5 7.5 -22 7 -27.5 C6.5 -33 4.5 -37 0 -37 Z' }));
    g.appendChild(el('ellipse', { class: 'riflesso', cx: -6.5, cy: -11, rx: 3, ry: 5.2, transform: 'rotate(-12 -6.5 -11)' }));
    g.appendChild(el('path', { class: 'picciolo', d: 'M0 -36 Q0 -40.5 2.5 -44' }));
    g.appendChild(el('path', { class: 'foglia', d: 'M1.5 -40 Q-6 -46 -10.5 -41 Q-4 -37 1.5 -40 Z' }));
    return g;
  }
  const largPeso = g => Math.max(58, (String(g).length + 2) * 9.4 + 20);
  function formaPeso(n, gr) {
    const w = largPeso(gr), h = w / 2, c = n.children;
    c[0].setAttribute('x', -9); c[0].setAttribute('y', -35); c[0].setAttribute('width', 18); c[0].setAttribute('height', 10); c[0].setAttribute('rx', 4);
    c[1].setAttribute('d', `M${f2(-h + 7)} -28 H${f2(h - 7)} Q${f2(h - 1)} -28 ${f2(h)} -22 L${f2(h + 2)} -5 Q${f2(h + 2)} 0 ${f2(h - 3)} 0 H${f2(-h + 3)} Q${f2(-h - 2)} 0 ${f2(-h - 2)} -5 L${f2(-h)} -22 Q${f2(-h + 1)} -28 ${f2(-h + 7)} -28 Z`);
    c[2].textContent = gr + ' g';
  }
  function nodoPeso(gr) {
    const g = el('g', { class: 'peso' });
    g.appendChild(el('rect', { class: 'pomo' }));
    g.appendChild(el('path', { class: 'corpo' }));
    g.appendChild(el('text', { x: 0, y: -9, 'text-anchor': 'middle' }));
    formaPeso(g, gr);
    return g;
  }
  const iconaLegenda = tipo => '<svg viewBox="-19 -46 38 48" aria-hidden="true">' + (tipo === 'm' ? nodoMela() : nodoPera()).outerHTML + '</svg>';

  COMPASSO.registraLab({
    id: 'due-bilance',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-due-bilance')) { const s = document.createElement('style'); s.id = 'stile-lab-due-bilance'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-due-bilance');
      const cella = (b, c, nome) => `<div class="lab-param" data-b="${b}" data-c="${c}"><button type="button" class="btn piccolo" data-d="-1" aria-label="${nome} di ${b}: meno">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="${nome} di ${b}: più">+</button></div>`;
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="lab-aiuto" hidden data-scorre><div class="consegna" hidden></div><div class="testo-aiuto"></div><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: le bilance le scegli tu">Libero</button></div>
            <div class="obiettivo"></div>
            <div class="lab-parametri" hidden>
              <span class="riga">A</span>${cella('A', 'm', 'mele')}${cella('A', 'p', 'pere')}${cella('A', 'd', 'grammi')}
              <span class="riga">B</span>${cella('B', 'm', 'mele')}${cella('B', 'p', 'pere')}${cella('B', 'd', 'grammi')}
              <div class="param-fine"><button type="button" class="btn piccolo b-casuale">Casuale</button><button type="button" class="btn piccolo primario b-param-chiudi">Fatto</button></div>
            </div>
            <div class="formula">
              <div class="f-sis-riga"><div class="legenda"><span>${iconaLegenda('m')} = x</span><span>${iconaLegenda('p')} = y</span></div><span class="f-sis" aria-label="Il sistema"></span></div>
              <div class="f-mossa"></div>
            </div>
            <div class="strumenti">
              <div class="scelta" aria-live="polite"></div>
              <div class="mosse">
                <span class="gruppo" role="group" aria-label="Moltiplica o dividi quello che hai scelto">
                  <button type="button" class="btn op" data-op="x2" title="Moltiplica per 2 quello che hai scelto">×2</button>
                  <button type="button" class="btn op" data-op="x3" title="Moltiplica per 3 quello che hai scelto">×3</button>
                  <button type="button" class="btn op" data-op="d2" title="Dividi in 2 parti uguali quello che hai scelto e tienine una">÷2</button>
                  <button type="button" class="btn op" data-op="d3" title="Dividi in 3 parti uguali quello che hai scelto e tienine una">÷3</button>
                </span>
                <button type="button" class="btn m-togli"></button>
                <button type="button" class="btn m-grammi"></button>
                <button type="button" class="btn m-sost"></button>
              </div>
              <div class="lab-barra">
                <button type="button" class="btn piccolo b-annulla">Annulla</button>
                <button type="button" class="btn piccolo b-ric">Ricomincia</button>
                <button type="button" class="btn piccolo b-aiuto" aria-label="Come si gioca">?</button>
                <button type="button" class="btn piccolo b-param" title="Scegli mele, pere e grammi delle due bilance">Bilance…</button>
              </div>
            </div>
            <div class="lab-messaggio" aria-live="polite"></div>
          </div>
        </div>`;

      const $ = s => radice.querySelector(s);
      const scena = $('.lab-scena'), objEl = $('.obiettivo'), sceltaEl = $('.scelta'), strumEl = $('.strumenti');
      const fSis = $('.f-sis'), fMossa = $('.f-mossa'), msg = $('.lab-messaggio'), aiutoEl = $('.lab-aiuto');
      const livelliEl = $('.lab-livelli'), parametriEl = $('.lab-parametri'), bLibero = $('.lab-libero'), bCasuale = $('.b-casuale');
      const bOp = [...radice.querySelectorAll('.btn.op')], bTogli = $('.m-togli'), bGrammi = $('.m-grammi'), bSost = $('.m-sost');
      const bAnnulla = $('.b-annulla'), bRic = $('.b-ric'), bAiuto = $('.b-aiuto');

      /* ---------------- scena SVG ---------------- */
      const svg = el('svg', { role: 'img', 'aria-label': 'Due bilance a piatti con mele, pere e pesi', preserveAspectRatio: 'xMidYMid meet' });
      scena.insertBefore(svg, aiutoEl);
      const defs = el('defs'); svg.appendChild(defs);
      const stop = (o, c) => `<stop offset="${o}" style="stop-color:${c}"/>`;
      defs.innerHTML =
        `<radialGradient id="dbl-mela" cx=".36" cy=".34" r=".78">${stop(0, '#ff9f86')}${stop(.42, '#e4442f')}${stop(1, '#a3201a')}</radialGradient>` +
        `<radialGradient id="dbl-pera" cx=".36" cy=".6" r=".82">${stop(0, '#f6f0a0')}${stop(.5, '#c6d046')}${stop(1, '#7c9826')}</radialGradient>` +
        `<linearGradient id="dbl-ottone" x1="0" y1="0" x2="0" y2="1">${stop(0, 'var(--dbl-ottone3)')}${stop(.55, 'var(--dbl-ottone)')}${stop(1, 'var(--dbl-ottone2)')}</linearGradient>` +
        `<linearGradient id="dbl-metallo" x1="0" y1="0" x2="0" y2="1">${stop(0, 'var(--dbl-metallo2)')}${stop(1, 'var(--dbl-metallo)')}</linearGradient>` +
        `<linearGradient id="dbl-piatto" x1="0" y1="0" x2="0" y2="1">${stop(0, 'var(--dbl-piatto2)')}${stop(1, 'var(--dbl-piatto)')}</linearGradient>` +
        '<filter id="dbl-ombra" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity=".12"/></filter>' +
        '<filter id="dbl-ombra-p" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="1.4" stdDeviation="1.3" flood-color="#000" flood-opacity=".25"/></filter>';
      const gBil = el('g'), gFesta = el('g', { class: 'festa' }), gMano = el('g', { class: 'mano' });
      svg.appendChild(gBil); svg.appendChild(gFesta); svg.appendChild(gMano);

      /* una bilancia: carta, sigla, stato, quadrante, colonna, giogo che ruota, due piatti appesi */
      const B = {};
      function costruisci(k) {
        const G = el('g', { class: 'bil pari', 'data-sel': k + '|tutta' });
        G.appendChild(el('rect', { class: 'carta', x: 4, y: 4, width: BW - 8, height: BH - 8, rx: 22 }));
        const sig = el('g', { class: 'sigla' });
        sig.appendChild(el('circle', { cx: 38, cy: 36, r: 21 }));
        sig.appendChild(el('text', { x: 38, y: 43.5, 'text-anchor': 'middle' }, k));
        G.appendChild(sig);
        const pill = el('g', { class: 'stato-pill' });
        pill.appendChild(el('rect', { y: 20, height: 32, rx: 16 }));
        pill.appendChild(el('text', { x: BW - 34, y: 41.5, 'text-anchor': 'end' }));
        G.appendChild(pill);
        const r = 36, a = 36 * Math.PI / 180;
        G.appendChild(el('path', { class: 'quadrante', d: `M${f2(PIV[0] - r * Math.sin(a))} ${f2(PIV[1] - r * Math.cos(a))} A${r} ${r} 0 0 1 ${f2(PIV[0] + r * Math.sin(a))} ${f2(PIV[1] - r * Math.cos(a))}` }));
        G.appendChild(el('line', { class: 'tacca0', x1: PIV[0], y1: PIV[1] - r - 6, x2: PIV[0], y2: PIV[1] - r + 5 }));
        G.appendChild(el('rect', { class: 'colonna', x: PIV[0] - 7, y: PIV[1], width: 14, height: 196, rx: 5 }));
        G.appendChild(el('path', { class: 'piede', d: `M${PIV[0] - 34} 252 Q${PIV[0] - 32} 241 ${PIV[0] - 20} 241 H${PIV[0] + 20} Q${PIV[0] + 32} 241 ${PIV[0] + 34} 252 Z` }));
        const piatti = {};
        ['s', 'd'].forEach(lato => {
          const pg = el('g', { class: 'piatto', 'data-sel': k + '|' + lato });
          pg.appendChild(el('rect', { class: 'presa-piatto', x: -110, y: -168, width: 220, height: 186 }));
          const dy = PIV[1] - PIANO;
          pg.appendChild(el('line', { class: 'filo', x1: 0, y1: dy + 4, x2: -101, y2: -3 }));
          pg.appendChild(el('line', { class: 'filo', x1: 0, y1: dy + 4, x2: 101, y2: -3 }));
          pg.appendChild(el('line', { class: 'filo', x1: 0, y1: dy + 4, x2: 0, y2: -3, opacity: .35 }));
          pg.appendChild(el('path', { class: 'piatto-corpo', d: 'M-108 -4 H108 Q101 10 0 13 Q-101 10 -108 -4 Z' }));
          const alone = el('rect', { class: 'alone', rx: 16 }); alone.style.display = 'none';
          pg.appendChild(alone);
          const contenuto = el('g'); pg.appendChild(contenuto);
          G.appendChild(pg);
          piatti[lato] = { g: pg, alone, contenuto, ogg: new Map() };
        });
        const trave = el('g');
        trave.appendChild(el('line', { class: 'ago', x1: PIV[0], y1: PIV[1], x2: PIV[0], y2: PIV[1] - 33 }));
        trave.appendChild(el('rect', { class: 'trave', x: CXP.s - 8, y: PIV[1] - 5, width: CXP.d - CXP.s + 16, height: 10, rx: 5 }));
        trave.appendChild(el('circle', { class: 'gancio', cx: CXP.s, cy: PIV[1], r: 5.5 }));
        trave.appendChild(el('circle', { class: 'gancio', cx: CXP.d, cy: PIV[1], r: 5.5 }));
        trave.appendChild(el('circle', { class: 'perno', cx: PIV[0], cy: PIV[1], r: 8.5 }));
        G.appendChild(trave);
        gBil.appendChild(G);
        B[k] = { G, pill, trave, piatti, ang: 0, tw: null };
      }
      costruisci('A'); costruisci('B');

      /* ---------------- stato ---------------- */
      let D = null, livello = 0, st = null, pila = [], ultima = null, cambiata = null, sel = { b: 'A', parte: 'tutta' };
      let vinto = false, avvisi = {}, raf = 0, festa = null, presa = null;
      const animati = new Set();
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = 0;
      let libero = false, salvato = null, LIB = null;   /* modalità libera, il livello da cui ci si è entrati, e la pesata scelta */
      const L = () => libero ? LIB : LIVELLI[livello];

      /* ---------------- fisica: da che parte pende ---------------- */
      /* (in modalità libera i pesi veri possono avere la virgola: si confronta con tolleranza) */
      const sgn = v => Math.abs(v) < 1e-6 ? 0 : Math.sign(v);
      const soddisfa = b => L().pesi.every(w => !sgn(b.m * w.m + b.p * w.p + b.g - b.d));
      const valida = b => b.der || soddisfa(b);
      function pendenza(b) {                  /* +1 pesa di più il piatto di sinistra, −1 quello di destra */
        if (!frutti(b)) return Math.sign(b.g - b.d);
        if (valida(b)) return 0;
        for (const w of L().pesi) { const s = sgn(b.m * w.m + b.p * w.p + b.g - b.d); if (s) return s; }
        return 0;
      }
      function noto(k) {                      /* la bilancia k dice quanto pesa un frutto? */
        const b = st[k];
        if (pendenza(b) || !valida(b) || b.g) return null;
        if (b.m === 1 && b.p === 0) return { f: 'm', v: b.d };
        if (b.p === 1 && b.m === 0) return { f: 'p', v: b.d };
        return null;
      }

      /* ---------------- disposizione degli oggetti sui piatti ---------------- */
      function layout(b, lato) {
        const lista = [];
        const gr = lato === 's' ? b.g : b.d;
        if (gr) lista.push({ key: 'g', tipo: 'g', w: largPeso(gr) * ES + 8, val: gr });
        if (lato === 's') {
          for (let i = 0; i < b.m; i++) lista.push({ key: 'm' + i, tipo: 'm', w: LARGF });
          for (let i = 0; i < b.p; i++) lista.push({ key: 'p' + i, tipo: 'p', w: LARGF });
        }
        const righe = []; let cur = [], cw = 0;
        lista.forEach(o => { if (cur.length && cw + o.w > MAXW) { righe.push(cur); cur = []; cw = 0; } cur.push(o); cw += o.w; });
        if (cur.length) righe.push(cur);
        righe.forEach((r, ri) => {
          const tot = r.reduce((s, o) => s + o.w, 0); let x = -tot / 2;
          r.forEach(o => { o.x = x + o.w / 2; o.y = -3 - ri * RIGA; x += o.w; });
        });
        return { lista, righe: righe.length };
      }
      function disegnaIt(it) {
        it.nodo.setAttribute('transform', 'translate(' + f2(it.x) + ' ' + f2(it.y) + ')' + (Math.abs(it.s * (it.es || 1) - 1) > 1e-3 ? ' scale(' + Math.max(0, it.s * (it.es || 1)).toFixed(3) + ')' : ''));
        it.nodo.style.opacity = it.o < 1 ? Math.max(0, it.o).toFixed(3) : '';
      }
      function vai(it, a, dur, ritardo, fine, bump) {
        it.tw = { t0: performance.now() + (ritardo || 0), dur, da: { x: it.x, y: it.y, s: it.s, o: it.o }, a, fine, bump };
        animati.add(it); avvia();
      }
      /* allinea i disegni allo stato; eff: { cadono, uscita:[dx,dy], scalaUscita, ritardo } */
      function sincronizza(k, eff) {
        eff = eff || {};
        ['s', 'd'].forEach(lato => {
          const P = B[k].piatti[lato], { lista, righe } = layout(st[k], lato);
          const visti = new Set(); let n = 0;
          lista.forEach(o => {
            visti.add(o.key);
            let it = P.ogg.get(o.key);
            if (!it) {
              const nodo = o.tipo === 'm' ? nodoMela() : o.tipo === 'p' ? nodoPera() : nodoPeso(o.val);
              if (o.tipo !== 'g') nodo.setAttribute('data-sel', k + '|' + o.tipo);
              it = { key: o.key, tipo: o.tipo, nodo, es: ES, x: o.x, y: o.y - (eff.cadono ? 70 : 0), s: eff.cadono ? 1 : 0, o: eff.cadono ? 0 : 1, val: o.val };
              P.contenuto.appendChild(nodo); P.ogg.set(o.key, it); disegnaIt(it);
              vai(it, { x: o.x, y: o.y, s: 1, o: 1 }, eff.cadono ? 420 : 340, (eff.ritardo || 0) + n++ * (eff.cadono ? 45 : 35));
            } else {
              it.uscendo = false;
              const pulsa = o.tipo === 'g' && it.val !== o.val;
              if (pulsa) { it.val = o.val; formaPeso(it.nodo, o.val); }
              vai(it, { x: o.x, y: o.y, s: 1, o: 1 }, 320, pulsa ? (eff.ritardo || 0) : 0, null, pulsa);
            }
          });
          P.ogg.forEach((it, key) => {
            if (visti.has(key) || it.uscendo) return;
            it.uscendo = true;
            const u = eff.uscita || [0, -34];
            vai(it, { x: it.x + u[0], y: it.y + u[1], s: eff.scalaUscita != null ? eff.scalaUscita : .6, o: 0 }, 430, 0, () => { it.nodo.remove(); P.ogg.delete(key); });
          });
          P.righe = righe;
        });
      }

      /* ---------------- animazione: un solo ciclo requestAnimationFrame ---------------- */
      const morbida = u => 1 - Math.pow(1 - u, 3);
      const molla = u => { const c = 1.9; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
      function avvia() { if (!raf) raf = requestAnimationFrame(ciclo); }
      function posaTrave(k) {
        const b = B[k], t = b.ang * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
        b.trave.setAttribute('transform', 'rotate(' + b.ang.toFixed(3) + ' ' + PIV[0] + ' ' + PIV[1] + ')');
        b.piatti.s.g.setAttribute('transform', 'translate(' + f2(CXP.s + BRACCIO * (1 - c)) + ' ' + f2(PIANO - BRACCIO * s) + ')');
        b.piatti.d.g.setAttribute('transform', 'translate(' + f2(CXP.d - BRACCIO * (1 - c)) + ' ' + f2(PIANO + BRACCIO * s) + ')');
      }
      function inclina(k, subito) {
        const b = B[k], meta = -pendenza(st[k]) * ANG;
        if (subito) { b.ang = meta; b.tw = null; posaTrave(k); return; }
        if (Math.abs(meta - b.ang) < 1e-3 && !b.tw) return;
        b.tw = { t0: performance.now() + 120, dur: 560, da: b.ang, a: meta };
        avvia();
      }
      function ciclo(ora) {
        raf = 0; let ancora = false;
        animati.forEach(it => {
          const tw = it.tw; if (!tw) { animati.delete(it); return; }
          const u = Math.max(0, Math.min(1, (ora - tw.t0) / tw.dur));
          if (u <= 0) { ancora = true; return; }
          const e = morbida(u);
          it.x = tw.da.x + (tw.a.x - tw.da.x) * e; it.y = tw.da.y + (tw.a.y - tw.da.y) * e;
          it.s = tw.da.s + (tw.a.s - tw.da.s) * e; it.o = tw.da.o + (tw.a.o - tw.da.o) * e;
          if (tw.bump) it.s *= 1 + .16 * Math.sin(Math.PI * u);
          disegnaIt(it);
          if (u >= 1) { it.tw = null; animati.delete(it); if (tw.fine) tw.fine(); } else ancora = true;
        });
        ['A', 'B'].forEach(k => {
          const b = B[k], tw = b.tw; if (!tw) return;
          const u = Math.max(0, Math.min(1, (ora - tw.t0) / tw.dur));
          b.ang = tw.da + (tw.a - tw.da) * (u <= 0 ? 0 : molla(u));
          posaTrave(k);
          if (u >= 1) { b.ang = tw.a; posaTrave(k); b.tw = null; } else ancora = true;
        });
        if (festa && passoFesta(ora)) ancora = true;
        if (ancora && !raf) raf = requestAnimationFrame(ciclo);
      }

      /* la festa: coriandoli dalle bilance e frutti che saltellano (< 600 ms) */
      function avviaFesta(chi) {
        vuota(gFesta);
        const colori = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--ok)', 'var(--dbl-ottone)'];
        const pezzi = [];
        chi.forEach(k => {
          const [ox, oy] = D.o[k], cx = ox + BW / 2, cy = oy + BH * .45;
          for (let i = 0; i < 16; i++) {
            const a = (i / 16) * Math.PI * 2 + Math.random() * .3, v = 120 + Math.random() * 110;
            const e = el('rect', { x: -5, y: -3, width: 10, height: 6, rx: 2, fill: colori[i % colori.length] });
            gFesta.appendChild(e);
            pezzi.push({ e, x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v * .7 - 40, r: Math.random() * 180 });
          }
          let i = 0;
          ['s', 'd'].forEach(lato => B[k].piatti[lato].ogg.forEach(it => { if (!it.uscendo) vai(it, { x: it.x, y: it.y, s: 1, o: 1 }, 380, i++ * 40, null, true); }));
        });
        festa = { t0: performance.now(), pezzi };
        avvia();
      }
      function passoFesta(ora) {
        const u = Math.max(0, Math.min(1, (ora - festa.t0) / 580)), e = morbida(u);
        festa.pezzi.forEach(p => {
          p.e.setAttribute('transform', 'translate(' + f2(p.x + p.vx * e) + ' ' + f2(p.y + p.vy * e + 90 * u * u) + ') rotate(' + (p.r + 260 * e).toFixed(1) + ')');
          p.e.setAttribute('opacity', (1 - u * u).toFixed(3));
        });
        if (u >= 1) { vuota(gFesta); festa = null; return false; }
        return true;
      }

      /* ---------------- telefono o schermo largo ---------------- */
      /* si sceglie la disposizione che fa le bilance più grandi nello spazio che c'è */
      function disponi() {
        const r = svg.getBoundingClientRect();
        if (r.width < 20 || r.height < 20) { if (!D) { D = DISPOSIZIONI.stretta; svg.setAttribute('viewBox', D.vb.join(' ')); ['A', 'B'].forEach(k => B[k].G.setAttribute('transform', 'translate(' + D.o[k][0] + ' ' + D.o[k][1] + ')')); } return; }
        const w = r.width - 12, h = r.height - 12;   /* il padding dell'svg */
        const sc = d => Math.min(w / d.vb[2], h / d.vb[3]);
        const nuova = sc(DISPOSIZIONI.larga) > sc(DISPOSIZIONI.stretta) ? DISPOSIZIONI.larga : DISPOSIZIONI.stretta;
        /* le scritte dentro le bilance non scendono sotto i 12 px veri */
        const fsPill = Math.max(16, Math.min(20, 12 / sc(nuova))).toFixed(1) + 'px';
        if (svg.style.getPropertyValue('--dbl-fs-pill') !== fsPill) { svg.style.setProperty('--dbl-fs-pill', fsPill); if (st) { aggiornaPill('A'); aggiornaPill('B'); } }
        if (nuova === D) return;
        D = nuova;
        svg.setAttribute('viewBox', D.vb.join(' '));
        ['A', 'B'].forEach(k => B[k].G.setAttribute('transform', 'translate(' + D.o[k][0] + ' ' + D.o[k][1] + ')'));
        if (presa && presa.fantasma) annullaTrascina();
      }

      /* ---------------- aggiornare testi, scelta, stato delle bilance ---------------- */
      const rigaB = b => { const pe = pendenza(b); const r = sinistra(b) + (pe > 0 ? ' > ' : pe < 0 ? ' < ' : ' = ') + b.d; return pe ? '\\htmlClass{dbl-pende}{' + r + '}' : r; };
      const tra = s => /\+/.test(s) ? '(' + s + ')' : s;
      const PARTI = { tutta: ['m', 'p', 'g', 'd'], s: ['m', 'p', 'g'], d: ['d'], m: ['m'], p: ['p'] };
      function descrScelta(s) {
        const b = st[s.b];
        if (s.parte === 'tutta') return 'tutta la bilancia ' + s.b;
        if (s.parte === 's') return 'solo il piatto di sinistra di ' + s.b;
        if (s.parte === 'd') return 'solo il piatto di destra di ' + s.b;
        const n = b[s.parte];
        return 'solo ' + (n === 1 ? (s.parte === 'm' ? 'la mela' : 'la pera') : 'le ' + nomeFr(s.parte, 2)) + ' di ' + s.b;
      }
      function parteDi(s) {                  /* «le mele di A», «il piatto di sinistra di A» */
        if (s.parte === 'm' || s.parte === 'p') return 'le ' + nomeFr(s.parte, 2) + ' di ' + s.b;
        return 'il piatto di ' + (s.parte === 's' ? 'sinistra' : 'destra') + ' di ' + s.b;
      }
      function aggiornaScelta() {
        if ((sel.parte === 'm' || sel.parte === 'p') && !st[sel.b][sel.parte]) sel = { b: sel.b, parte: 's' };
        ['A', 'B'].forEach(k => {
          B[k].G.classList.toggle('scelta-tutta', sel.b === k && sel.parte === 'tutta' && !vinto);
          ['s', 'd'].forEach(lato => {
            const P = B[k].piatti[lato], a = P.alone;
            let r = null;
            if (!vinto && sel.b === k && sel.parte === lato) {
              const h = Math.max(1, P.righe || 0) * RIGA + 14;
              r = [-112, -h, 224, h + 20];
            } else if (!vinto && sel.b === k && lato === 's' && (sel.parte === 'm' || sel.parte === 'p')) {
              const pos = layout(st[k], 's').lista.filter(o => o.tipo === sel.parte);
              if (pos.length) {
                const x0 = Math.min(...pos.map(o => o.x)) - 25, x1 = Math.max(...pos.map(o => o.x)) + 25;
                const y0 = Math.min(...pos.map(o => o.y)) - 60, y1 = Math.max(...pos.map(o => o.y)) + 6;
                r = [x0, y0, x1 - x0, y1 - y0];
              }
            }
            if (r) { a.setAttribute('x', f2(r[0])); a.setAttribute('y', f2(r[1])); a.setAttribute('width', f2(r[2])); a.setAttribute('height', f2(r[3])); a.style.display = ''; }
            else a.style.display = 'none';
          });
        });
        sceltaEl.innerHTML = vinto ? '<span>Livello superato.</span>' : 'Scelta: <b>' + descrScelta(sel) + '</b>';
        const o = altra(sel.b), g = st[sel.b].g;
        bTogli.textContent = 'togli ' + o; bTogli.title = 'Togli da ' + sel.b + ' quello che c\'è su ' + o;
        bGrammi.textContent = g ? 'togli ' + g + ' g' : 'togli grammi'; bGrammi.title = 'Togli i pesi che stanno accanto ai frutti';
        bSost.textContent = 'sostituisci in ' + o; bSost.title = 'Usa quello che dice ' + sel.b + ' per sostituire un frutto su ' + o;
        [...bOp, bTogli, bGrammi, bSost].forEach(b => { b.disabled = vinto; });
        bAnnulla.disabled = vinto || !pila.length;
      }
      function aggiornaPill(k) {
        const b = st[k], pe = pendenza(b), n = noto(k), P = B[k].pill;
        let t, c = '';
        if (n) { t = '1 ' + nomeFr(n.f, 1) + ' = ' + n.v + ' g'; c = 'ok'; }
        else if (!frutti(b) && !pe) { t = 'vuota, in equilibrio'; c = !libero && L().tipo === 'indet' && b.der ? 'ok' : ''; }
        else if (!frutti(b)) t = 'senza frutti, e pende', c = 'no';
        else if (pe) t = 'pende', c = 'no';
        else t = 'in equilibrio';
        P.setAttribute('class', 'stato-pill' + (c ? ' ' + c : ''));
        const tx = P.children[1], r = P.children[0];
        tx.textContent = t;
        let w = 0; try { w = tx.getComputedTextLength(); } catch (e) { w = 0; }
        if (!w) w = t.length * 8.6;
        r.setAttribute('x', f2(BW - 34 - w - 16)); r.setAttribute('width', f2(w + 32));
        B[k].G.classList.toggle('pende', !!pe);
        B[k].G.classList.toggle('pari', !pe);
      }
      function aggiornaAnelli() {
        ['A', 'B'].forEach(k => {
          const n = !vinto && noto(k);
          B[k].piatti.s.ogg.forEach(it => {
            const vuole = !!n && !it.uscendo && it.key === n.f + '0';
            if (vuole && !it.anello) {
              it.anello = el('ellipse', { class: 'anello', cx: 0, cy: n.f === 'm' ? -16 : -19, rx: 22, ry: 26 });
              it.nodo.insertBefore(it.anello, it.nodo.firstChild);
              it.nodo.setAttribute('data-trascina', '1'); it.nodo.classList.add('trascinabile');
            } else if (!vuole && it.anello) {
              it.anello.remove(); it.anello = null;
              it.nodo.removeAttribute('data-trascina'); it.nodo.classList.remove('trascinabile');
            }
          });
        });
      }
      function aggiorna() {
        const ev = k => cambiata === k ? '\\evid{' + rigaB(st[k]) + '}' : rigaB(st[k]);
        fSis.innerHTML = ctx.tex('\\begin{cases} ' + ev('A') + ' & \\textsf{A} \\\\ ' + ev('B') + ' & \\textsf{B} \\end{cases}');
        fMossa.innerHTML = ultima ? ctx.tex(ultima) : '<span class="f-vuoto">ultima mossa: nessuna, per ora</span>';
        aggiornaPill('A'); aggiornaPill('B');
        aggiornaAnelli(); aggiornaScelta();
        if (libero) aggiornaParametri();
        stringi();
      }
      /* formule su una riga: se non ci stanno, il carattere si stringe (mai sotto i 12 px) */
      const formulaEl = $('.formula');
      function stringi() {
        [[fSis, formulaEl], [fMossa, fMossa]].forEach(([e, box]) => {
          e.style.fontSize = '';
          let f = parseFloat(getComputedStyle(e).fontSize);
          while (box.scrollWidth > box.clientWidth + 1 && f > 12) { f = Math.max(12, f - 1); e.style.fontSize = f + 'px'; }
        });
      }

      /* ---------------- messaggi ---------------- */
      function rifiuta(testo) {
        msg.textContent = testo; msg.className = 'lab-messaggio no';
        strumEl.classList.remove('scuoti'); void strumEl.offsetWidth; strumEl.classList.add('scuoti');
      }
      function avvisa(chiave, testo) {
        if (!testo || avvisi[chiave]) return;
        avvisi[chiave] = true;
        ctx.zenone(testo, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
      }
      function neutro() {
        const a = st.A, b = st.B, pari = x => !pendenza(x) && valida(x);
        const [na, nb] = [noto('A'), noto('B')];
        if (na && nb && na.f === nb.f) return 'Tutte e due le bilance parlano ' + (na.f === 'm' ? 'delle mele' : 'delle pere') + ': per l\'altro frutto non resta nessuna pesata. Annulla qualche mossa.';
        if (na || nb) { const k = na ? 'A' : 'B', n = na || nb; return 'La bilancia ' + k + ' dice che una ' + nomeFr(n.f, 1) + ' pesa ' + n.v + ' g. Manca la ' + nomeFr(n.f === 'm' ? 'p' : 'm', 1) + '.'; }
        if (pari(a) && pari(b) && frutti(a) && a.m === b.m && a.p === b.p && a.g === b.g)
          return a.d === b.d ? 'Adesso A e B sono uguali: dicono la stessa cosa.' : 'Sul piatto di sinistra A e B hanno le stesse cose, ma a destra pesi diversi.';
        return '';
      }
      function vola(k, lato, testo) {            /* un'etichetta che sale e sparisce sopra un piatto */
        const P = B[k].piatti[lato], g = el('g', { class: 'volo' });
        g.appendChild(el('text', { x: 0, y: 0, 'text-anchor': 'middle', style: 'fill: var(--accento-testo); font: 700 19px var(--font); paint-order: stroke; stroke: var(--sup); stroke-width: 4px;' }, testo));
        P.g.appendChild(g);
        const y = -Math.max(1, P.righe || 0) * RIGA - 22, it = { nodo: g, x: 0, y, s: .8, o: 1 };
        disegnaIt(it);
        vai(it, { x: 0, y: y - 38, s: 1, o: 0 }, 560, 60, () => g.remove());
      }

      /* ---------------- le mosse ---------------- */
      function applica(r) {
        pila.push({ A: copia(st.A), B: copia(st.B), ultima, cambiata, sel: { b: sel.b, parte: sel.parte } });
        const k = r.chi, prima = pendenza(st[k]) !== 0;
        st = { A: r.A || st.A, B: r.B || st.B };
        ultima = r.tex; cambiata = k;
        if (r.sel) sel = r.sel;
        sincronizza(k, r.eff);
        (r.voli || []).forEach(v => vola(k, v[0], v[1]));
        inclina('A'); inclina('B');
        msg.className = 'lab-messaggio'; msg.textContent = '';
        aggiorna();
        if (controlla()) return;
        const pe = pendenza(st[k]);
        if (pe && prima) { msg.textContent = 'La bilancia ' + k + ' pendeva già: quello che dice non è vero. Conviene annullare.'; msg.className += ' no'; }
        else if (pe && r.usaPendente) { msg.textContent = 'Hai usato ' + altra(k) + ', che pende: quello che dice non è vero, e ora pende anche ' + k + '.'; msg.className += ' no'; }
        else if (pe) { msg.textContent = 'La bilancia ' + k + ' pende: ' + (r.perche || 'la mossa non l\'ha lasciata in equilibrio') + '. Annulla e rifai la mossa su tutta la bilancia.'; msg.className += ' no'; if (!libero) avvisa(r.chiave, r.zen); }
        else if (libero) msg.innerHTML = osservaLibero();
        else msg.textContent = neutro();
      }
      const statoCon = (k, b) => { const s = { A: st.A, B: st.B }; s[k] = b; return s; };
      function moltiplica(op) {
        if (vinto) return;
        const k = sel.b, X = st[k], P = PARTI[sel.parte], per = op[0] === 'x', q = +op[1];
        if (P.every(c => !X[c])) return rifiuta('Su quello che hai scelto non c\'è niente da ' + (per ? 'moltiplicare.' : 'dividere.'));
        const Y = copia(X);
        for (const c of P) {
          if (per) { Y[c] = X[c] * q; continue; }
          if (X[c] % q) return rifiuta(c === 'm' || c === 'p'
            ? X[c] + ' ' + nomeFr(c, X[c]) + ' non ' + (X[c] === 1 ? 'si divide' : 'si dividono') + ' in ' + q + ' parti uguali: i frutti non si tagliano.'
            : X[c] + ' g diviso ' + q + ' non fa un numero intero di grammi.');
          Y[c] = X[c] / q;
        }
        if (frutti(Y) > MAXFRUTTI || Y.g > MAXGRAMMI || Y.d > MAXGRAMMI) return rifiuta('Il piatto non regge tanta roba: prova una mossa più piccola.');
        const tutta = sel.parte === 'tutta';
        Y.der = tutta && valida(X);
        const segno = per ? q + '\\cdot ' : '', dopo = per ? '' : ' : ' + q, sx = sinistra(X);
        let tex;
        if (tutta) tex = segno + tra(sx) + dopo + ' = ' + segno + X.d + dopo + ' \\;\\Rightarrow\\; ' + rigaB(Y);
        else tex = '\\text{solo ' + parteDi(sel) + (per ? ' per ' : ' diviso ') + q + ':}\\; ' + rigaB(Y);
        const tutto = copia(X); ['m', 'p', 'g', 'd'].forEach(c => { tutto[c] = per ? X[c] * q : X[c] / q; });
        const frutto = sel.parte === 'm' || sel.parte === 'p';
        applica(Object.assign(statoCon(k, Y), {
          chi: k, tex, eff: per ? {} : { uscita: [0, -30] },
          voli: (tutta ? ['s', 'd'] : [sel.parte === 'd' ? 'd' : 's']).map(l => [l, (per ? '×' : '÷') + q]),
          perche: 'hai ' + (per ? 'moltiplicato' : 'diviso') + ' ' + parteDi(sel) + ' e il resto no',
          chiave: frutto ? 'molt-frutto' : 'molt-piatto',
          zen: frutto
            ? 'Hai ' + (per ? 'moltiplicato' : 'diviso') + ' solo le ' + nomeFr(sel.parte, 2) + ': il resto è rimasto com\'era e la bilancia pende. ' + (per ? 'Moltiplicare' : 'Dividere') + ' una bilancia vuol dire farlo con tutto: ' + piano((per ? q + '·' : '') + tra(sx) + (per ? '' : ' : ' + q)) + ' = ' + piano(sinistra(tutto)) + ', e anche i grammi a destra.'
            : 'Hai ' + (per ? 'moltiplicato' : 'diviso') + ' un piatto solo: i due piatti non pesano più uguale e la bilancia pende. Una mossa tiene l\'equilibrio solo se la fai su tutti e due i piatti.'
        }));
      }
      function manca(c, k, o, a, b) {
        if (c === 'm' || c === 'p') {
          const qui = a === 0 ? 'non ci sono ' + nomeFr(c, 2) : a === 1 ? 'c\'è una ' + nomeFr(c, 1) + ' sola' : 'ci sono ' + a + ' ' + nomeFr(c, 2);
          return 'Su ' + k + ' ' + qui + ', su ' + o + ' ' + b + ': non puoi toglierne ' + b + '.';
        }
        return (c === 'g' ? 'A sinistra' : 'A destra') + ' su ' + k + (a ? ' ci sono ' + a + ' g' : ' non ci sono pesi') + ', su ' + o + ' ' + b + ' g: non puoi toglierne ' + b + '.';
      }
      function togli() {
        if (vinto) return;
        const k = sel.b, o = altra(k), X = st[k], Y = st[o], P = PARTI[sel.parte];
        if (P.every(c => !Y[c])) return rifiuta('Su ' + o + ' non c\'è niente da togliere' + (sel.parte === 'tutta' ? '.' : ' da lì.'));
        for (const c of P) if (X[c] < Y[c]) return rifiuta(manca(c, k, o, X[c], Y[c]));
        const Z = copia(X); P.forEach(c => { Z[c] = X[c] - Y[c]; });
        const tutta = sel.parte === 'tutta';
        Z.der = tutta && valida(X) && valida(Y);
        const tex = tutta
          ? tra(sinistra(X)) + ' - ' + tra(sinistra(Y)) + ' = ' + X.d + ' - ' + Y.d + ' \\;\\Rightarrow\\; ' + rigaB(Z)
          : '\\text{solo da ' + parteDi(sel) + ' tolgo quello di ' + o + ':}\\; ' + rigaB(Z);
        const voli = [];
        if (P.includes('d') && Y.d) voli.push(['d', '−' + Y.d + ' g']);
        if (P.includes('g') && Y.g) voli.push(['s', '−' + Y.g + ' g']);
        const du = [(D.o[o][0] - D.o[k][0]) * .3, (D.o[o][1] - D.o[k][1]) * .3];
        applica(Object.assign(statoCon(k, Z), {
          chi: k, tex, voli, eff: { uscita: du, scalaUscita: .5 }, usaPendente: !!pendenza(Y) && tutta,
          perche: 'hai tolto il contenuto di ' + o + ' solo da ' + parteDi(sel),
          chiave: 'togli-parte',
          zen: 'Hai tolto da una parte sola, e la bilancia pende. Il contenuto di ' + o + ' si può togliere perché i suoi due piatti pesano uguale: quello che togli a sinistra lo devi togliere anche a destra, tutto insieme.'
        }));
      }
      function grammi() {
        if (vinto) return;
        const k = sel.b, X = st[k], G = X.g;
        if (sel.parte === 'm' || sel.parte === 'p') return rifiuta('Per togliere dei pesi scegli un piatto o tutta la bilancia.');
        if (!G) return rifiuta('Sul piatto di sinistra di ' + k + ' non ci sono pesi accanto ai frutti: questa mossa serve quando ci sono.');
        const Z = copia(X);
        if (sel.parte !== 'd') Z.g -= G;
        if (sel.parte !== 's') { if (X.d < G) return rifiuta('A destra su ' + k + ' ci sono solo ' + X.d + ' g: non puoi toglierne ' + G + '.'); Z.d -= G; }
        const tutta = sel.parte === 'tutta';
        Z.der = tutta && valida(X);
        const tex = tutta
          ? sinistra(X) + ' - ' + G + ' = ' + X.d + ' - ' + G + ' \\;\\Rightarrow\\; ' + rigaB(Z)
          : '\\text{solo ' + parteDi(sel) + ' meno ' + G + ':}\\; ' + rigaB(Z);
        applica(Object.assign(statoCon(k, Z), {
          chi: k, tex, eff: { uscita: [0, -46], scalaUscita: 1 },
          voli: sel.parte !== 's' ? [['d', '−' + G + ' g']] : [],
          perche: 'hai tolto ' + G + ' g da un piatto solo',
          chiave: 'grammi-piatto',
          zen: 'Hai tolto ' + G + ' g da un piatto solo, e la bilancia pende. Gli stessi grammi vanno tolti anche dall\'altro piatto.'
        }));
      }
      function sostituisci(k, o) {
        if (vinto) return;
        const S = st[k], T = st[o];
        const f = !S.g && S.m === 1 && !S.p ? 'm' : !S.g && S.p === 1 && !S.m ? 'p' : null;
        if (!f || !S.d) return rifiuta('Per sostituire serve una bilancia con un frutto solo da una parte e dei pesi dall\'altra, come una pera contro 300 g. La bilancia ' + k + ' non è così.');
        if (pendenza(S)) return rifiuta('La bilancia ' + k + ' pende: quello che dice non è vero, e non lo puoi usare.');
        if (!T[f]) return rifiuta('Su ' + o + ' non ci sono ' + nomeFr(f, 2) + ' da sostituire.');
        const Z = copia(T); Z.g = T.g + T[f] * S.d; Z[f] = 0;
        if (Z.g > MAXGRAMMI) return rifiuta('Il piatto non regge tanta roba.');
        Z.der = valida(T) && valida(S);
        const v = f === 'm' ? 'x' : 'y', n = T[f], parti = [];
        if (T.m) parti.push(f === 'm' ? '\\evid{' + (n === 1 ? '' : n + '\\cdot ') + S.d + '}' : (T.m === 1 ? '' : T.m) + 'x');
        if (T.p) parti.push(f === 'p' ? '\\evid{' + (n === 1 ? '' : n + '\\cdot ') + S.d + '}' : (T.p === 1 ? '' : T.p) + 'y');
        if (T.g) parti.push(String(T.g));
        const tex = v + ' = ' + S.d + '\\;\\text{ in ' + o + ':}\\; ' + parti.join(' + ') + ' = ' + T.d + ' \\;\\Rightarrow\\; ' + rigaB(Z);
        applica(Object.assign(statoCon(o, Z), {
          chi: o, tex, sel: { b: o, parte: 'tutta' }, eff: { uscita: [0, -6], scalaUscita: .15 }, usaPendente: false
        }));
      }

      /* ---------------- vittoria ---------------- */
      function controlla() {
        if (libero) return false;   /* in modalità libera niente verdetto */
        const tipo = L().tipo;
        if (tipo === 'det') {
          const a = noto('A'), b = noto('B');
          if (a && b && a.f !== b.f) {
            const m = a.f === 'm' ? a.v : b.v, p = a.f === 'p' ? a.v : b.v;
            vittoria(['A', 'B'], 'Una mela pesa ' + m + ' g e una pera ' + p + ' g: ' + ctx.tex('x = ' + m + ',\\; y = ' + p));
            return true;
          }
          return false;
        }
        for (const k of ['A', 'B']) {
          const b = st[k];
          if (!b.der || frutti(b)) continue;
          if (tipo === 'indet' && b.g === b.d) { vittoria([k], 'La bilancia ' + k + ' è vuota e sta in equilibrio: ' + ctx.tex(sinistra(b) + ' = ' + b.d) + '. Il sistema è indeterminato.'); return true; }
          if (tipo === 'imposs' && b.g !== b.d) { vittoria([k], 'La bilancia ' + k + ' non ha frutti e pende: ' + ctx.tex(sinistra(b) + ' \\neq ' + b.d) + '. Il sistema è impossibile.'); return true; }
        }
        return false;
      }
      function vittoria(chi, testo) {
        vinto = true;
        ctx.completato(livello); pillole();
        chi.forEach(k => B[k].G.classList.add('vinta'));
        msg.innerHTML = '<span class="vinto">' + testo + '</span>'; msg.className = 'lab-messaggio ok';
        ctx.zenone(L().bravo, { espressione: 'orgoglioso', durata: 9000 });
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        aggiorna();
        avviaFesta(chi);
      }

      /* ---------------- dito e mouse: scegliere, trascinare per sostituire ---------------- */
      function punto(ev) {
        const m = svg.getScreenCTM(); if (!m) return { x: -1e4, y: -1e4 };
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
        return { x: p.x, y: p.y };
      }
      function bilIn(p) {
        for (const k of ['A', 'B']) { const [ox, oy] = D.o[k]; if (p.x >= ox && p.x <= ox + BW && p.y >= oy && p.y <= oy + BH) return k; }
        return null;
      }
      function scegli(b, parte) {
        if (sel.b === b && sel.parte === parte) parte = parte === 'm' || parte === 'p' ? 's' : 'tutta';
        sel = { b, parte };
        aggiornaScelta();
      }
      function iniziaTrascina(pr, ev) {
        const n = noto(pr.b); if (!n) return;
        const g = el('g');
        const fr = n.f === 'm' ? nodoMela() : nodoPera(); fr.setAttribute('transform', 'scale(1.55)'); g.appendChild(fr);
        const t = '= ' + n.v + ' g', w = t.length * 9.2 + 22, cart = el('g', { class: 'cartellino' });
        cart.appendChild(el('rect', { x: 28, y: -50, width: f2(w), height: 30, rx: 15 }));
        cart.appendChild(el('text', { x: f2(28 + w / 2), y: -29.5, 'text-anchor': 'middle' }, t));
        g.appendChild(cart); gMano.appendChild(g);
        pr.fantasma = { nodo: g, x: 0, y: 0, s: 1, o: 1, da: pr.b };
        pr.alza = ev.pointerType === 'touch' ? 40 : 8;
        muoviFantasma(pr, ev);
      }
      function muoviFantasma(pr, ev) {
        const p = punto(ev), F = pr.fantasma;
        F.x = p.x; F.y = p.y - pr.alza + 22; disegnaIt(F);
        const k = bilIn(p), bers = k && k !== F.da ? k : null;
        ['A', 'B'].forEach(j => B[j].G.classList.toggle('bersaglio', j === bers));
      }
      function annullaTrascina() {
        if (!presa || !presa.fantasma) return;
        presa.fantasma.nodo.remove(); presa = null;
        ['A', 'B'].forEach(j => B[j].G.classList.remove('bersaglio'));
      }
      function giu(ev) {
        if (presa || (ev.button !== undefined && ev.button > 0)) return;
        const t = ev.target && ev.target.closest ? ev.target.closest('[data-sel]') : null;
        if (!t || !svg.contains(t)) return;
        const [b, parte] = t.getAttribute('data-sel').split('|');
        presa = { id: ev.pointerId, b, parte, cx: ev.clientX, cy: ev.clientY, mosso: false, trascina: !vinto && !!ev.target.closest('[data-trascina]') };
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!presa || ev.pointerId !== presa.id) return;
        if (!presa.mosso) {
          if (Math.hypot(ev.clientX - presa.cx, ev.clientY - presa.cy) < 7) return;
          presa.mosso = true;
          if (presa.trascina) iniziaTrascina(presa, ev);
        }
        if (presa.fantasma) { muoviFantasma(presa, ev); ev.preventDefault(); }
      }
      function lascia(ev) {
        if (!presa || ev.pointerId !== presa.id) return;
        const pr = presa; presa = null;
        if (!pr.mosso) { scegli(pr.b, pr.parte); return; }
        if (!pr.fantasma) return;
        const F = pr.fantasma;
        ['A', 'B'].forEach(j => B[j].G.classList.remove('bersaglio'));
        const k = ev.type === 'pointercancel' ? null : bilIn(punto(ev));
        vai(F, { x: F.x, y: F.y, s: .4, o: 0 }, 240, 0, () => F.nodo.remove());
        if (k && k !== F.da) sostituisci(F.da, k);
        else if (!k) { msg.textContent = 'Per sostituire, lascia il frutto sopra l\'altra bilancia.'; msg.className = 'lab-messaggio'; }
      }

      /* ---------------- livelli ---------------- */
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
      const pillole = aggiornaLivelli;
      /* le bilance ripartono da capo: via gli oggetti vecchi, quelli nuovi cadono sui piatti */
      function preparaBilance(a, b) {
        if (presa && presa.fantasma) annullaTrascina();
        presa = null; festa = null; vuota(gFesta);
        st = { A: nuovaBil(a), B: nuovaBil(b) };
        pila = []; ultima = null; cambiata = null; sel = { b: 'A', parte: 'tutta' }; vinto = false; avvisi = {};
        ['A', 'B'].forEach(k => {
          ['s', 'd'].forEach(l => { const P = B[k].piatti[l]; P.ogg.forEach(it => animati.delete(it)); P.ogg.clear(); vuota(P.contenuto); P.righe = 0; });
          B[k].G.classList.remove('vinta', 'bersaglio');
          inclina(k, true);
        });
        sincronizza('A', { cadono: true }); sincronizza('B', { cadono: true, ritardo: 140 });
        msg.textContent = ''; msg.className = 'lab-messaggio';
      }
      function consegna(n) {
        const breve = BREVI[n];
        return (breve ? '<span class="c-breve">' + ctx.md(breve) + '</span>' : '') + '<span class="c-lungo">' + ctx.md(LIVELLI[n].testo) + '</span>';
      }
      function avviaLivello(n) {
        libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        livello = n;
        preparaBilance(L().A, L().B);
        objEl.innerHTML = consegna(n);
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        pillole(); aggiorna();
      }
      function annulla() {
        if (vinto || !pila.length) return;
        const p = pila.pop();
        st = { A: p.A, B: p.B }; ultima = p.ultima; cambiata = p.cambiata; sel = p.sel;
        sincronizza('A'); sincronizza('B');
        inclina('A'); inclina('B');
        msg.textContent = ''; msg.className = 'lab-messaggio';
        aggiorna();
      }

      /* ---------------- modalità libera: le due pesate le sceglie lo studente ---------------- */
      const LIM = { m: [0, 4, 1], p: [0, 4, 1], d: [50, 3000, 50] };
      let lib = null;                            /* { A: {m, p, d}, B: {m, p, d} } */
      const virgola = v => String(Math.round(v * 10) / 10).replace('.', ',').replace('-', '−');
      function pesiDi(a, b) {                    /* i pesi veri che decidono da che parte pende una bilancia */
        const det = a.m * b.p - a.p * b.m;
        if (det) return { tipo: 'det', pesi: [{ m: (a.d * b.p - a.p * b.d) / det, p: (a.m * b.d - a.d * b.m) / det }] };
        /* coefficienti proporzionali: due pesi diversi che vanno bene per A (come nei livelli 5 e 6) */
        let pesi;
        if (a.m && a.p) pesi = [{ m: a.d / (2 * a.m), p: a.d / (2 * a.p) }, { m: 3 * a.d / (4 * a.m), p: a.d / (4 * a.p) }];
        else if (a.m) pesi = [{ m: a.d / a.m, p: 100 }, { m: a.d / a.m, p: 250 }];
        else pesi = [{ m: 100, p: a.d / a.p }, { m: 250, p: a.d / a.p }];
        const pari = a.m * b.d === b.m * a.d && a.p * b.d === b.p * a.d;
        return { tipo: pari ? 'indet' : 'imposs', pesi };
      }
      function osservaLibero() {                 /* osservazioni neutre, mai valutazioni */
        const a = noto('A'), b = noto('B');
        if (a && b && a.f !== b.f) {
          const m = a.f === 'm' ? a.v : b.v, p = a.f === 'p' ? a.v : b.v;
          return 'Una mela pesa ' + m + ' g e una pera ' + p + ' g: ' + ctx.tex('x = ' + m + ',\\; y = ' + p);
        }
        for (const k of ['A', 'B']) {
          const x = st[k];
          if (!x.der || frutti(x)) continue;
          if (x.g === x.d) return 'La bilancia ' + k + ' è vuota e sta in equilibrio: ' + ctx.tex(sinistra(x) + ' = ' + x.d) + ' non dice niente. Il sistema è indeterminato.';
          return 'La bilancia ' + k + ' non ha frutti e pende: ' + ctx.tex(sinistra(x) + ' \\neq ' + x.d) + '. Il sistema è impossibile.';
        }
        return neutro();
      }
      function osservaInizio() {
        if (LIB.tipo !== 'det') return '';
        const w = LIB.pesi[0];
        for (const [f, v] of [['m', w.m], ['p', w.p]]) {
          if (v <= 0) return 'Con questi numeri una ' + nomeFr(f, 1) + ' dovrebbe pesare ' + virgola(v) + ' g: nessun frutto vero pesa così.';
        }
        if (!Number.isInteger(w.m) || !Number.isInteger(w.p)) return 'Con questi numeri i pesi veri hanno la virgola: una mela ' + virgola(w.m) + ' g, una pera ' + virgola(w.p) + ' g.';
        return '';
      }
      function nuovaPesata() {
        const v = k => [lib[k].m, lib[k].p, 0, lib[k].d];
        LIB = Object.assign({ libero: true, A: v('A'), B: v('B') }, pesiDi(lib.A, lib.B));
        preparaBilance(LIB.A, LIB.B);
        aggiorna();
        msg.textContent = osservaInizio(); msg.className = 'lab-messaggio';
      }
      function aggiornaParametri() {
        parametriEl.querySelectorAll('.lab-param').forEach(box => {
          const b = box.dataset.b, c = box.dataset.c, v = lib[b][c], [lo, hi] = LIM[c], [bm, bp] = box.querySelectorAll('button');
          box.querySelector('output').innerHTML = v + (c === 'd' ? ' g' : iconaLegenda(c));
          const altro = c === 'm' ? lib[b].p : c === 'p' ? lib[b].m : 1;   /* almeno un frutto per bilancia */
          bm.disabled = v <= lo || (c !== 'd' && v === 1 && !altro);
          bp.disabled = v >= hi;
        });
      }
      function mostraLibero() {
        parametriEl.hidden = !libero; objEl.hidden = libero; bRic.hidden = libero;
        radice.classList.toggle('in-libero', libero);
        radice.classList.toggle('param-aperti', libero);
        aggiornaLivelli();
      }
      function entraLibero() {
        if (presa && presa.fantasma) annullaTrascina();
        salvato = { livello, st, pila: pila.slice(), ultima, cambiata, sel, vinto, avvisi,
          vinte: ['A', 'B'].filter(k => B[k].G.classList.contains('vinta')), msg: msg.innerHTML, cls: msg.className, ric: bRic.textContent, ricP: bRic.classList.contains('primario') };
        const Lv = LIVELLI[livello], da = v => ({ m: v[0], p: v[1], d: v[3] });
        lib = { A: da(Lv.A), B: da(Lv.B) };
        libero = true; aiutoEl.hidden = true; mostraLibero();
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        nuovaPesata();
      }
      function esciLibero() {   /* si torna al livello com'era */
        if (presa && presa.fantasma) annullaTrascina();
        const z = salvato; libero = false; salvato = null; aiutoEl.hidden = true;
        livello = z.livello; mostraLibero();
        presa = null; festa = null; vuota(gFesta);
        st = z.st; pila = z.pila; ultima = z.ultima; cambiata = z.cambiata; sel = z.sel; vinto = z.vinto; avvisi = z.avvisi;
        ['A', 'B'].forEach(k => {
          ['s', 'd'].forEach(l => { const P = B[k].piatti[l]; P.ogg.forEach(it => animati.delete(it)); P.ogg.clear(); vuota(P.contenuto); P.righe = 0; });
          B[k].G.classList.toggle('vinta', z.vinte.includes(k)); B[k].G.classList.remove('bersaglio');
          inclina(k, true);
        });
        sincronizza('A', { cadono: true }); sincronizza('B', { cadono: true, ritardo: 140 });
        objEl.innerHTML = consegna(livello);
        bRic.textContent = z.ric; bRic.classList.toggle('primario', z.ricP);
        aggiorna();
        msg.innerHTML = z.msg; msg.className = z.cls;
      }
      function casuale() {
        const r = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
        for (let g = 0; g < 300; g++) {
          const x = 50 * r(2, 8), y = 50 * r(2, 8);
          const a = { m: r(0, 3), p: r(0, 3) }, b = { m: r(0, 3), p: r(0, 3) };
          if (!a.m + !a.p > 1 || !b.m + !b.p > 1 || !(a.m + a.p) || !(b.m + b.p) || a.m * b.p === a.p * b.m) continue;
          a.d = a.m * x + a.p * y; b.d = b.m * x + b.p * y;
          if (a.d > LIM.d[1] || b.d > LIM.d[1]) continue;
          if (lib && a.m === lib.A.m && a.p === lib.A.p && a.d === lib.A.d) continue;
          lib = { A: a, B: b }; nuovaPesata(); return;
        }
      }

      /* ---------------- collegamenti ---------------- */
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', lascia);
      window.addEventListener('pointercancel', lascia);
      bOp.forEach(b => b.addEventListener('click', () => moltiplica(b.dataset.op)));
      bTogli.addEventListener('click', togli);
      bGrammi.addEventListener('click', grammi);
      bSost.addEventListener('click', () => sostituisci(sel.b, altra(sel.b)));
      bAnnulla.addEventListener('click', annulla);
      bRic.addEventListener('click', () => {
        if (libero) { nuovaPesata(); return; }
        avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello);
      });
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        /* se nel pannello c'è la consegna breve, quella intera si legge qui */
        const breve = objEl.querySelector('.c-breve'), cEl = aiutoEl.querySelector('.consegna');
        cEl.hidden = libero || !breve || getComputedStyle(breve).display === 'none';
        if (!cEl.hidden) cEl.innerHTML = ctx.md(LIVELLI[livello].testo);
        aiutoEl.querySelector('.testo-aiuto').innerHTML = ctx.md(libero ? AIUTO_LIBERO + '\n\n' + AIUTO : AIUTO);
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });
      bLibero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      bCasuale.addEventListener('click', casuale);
      $('.b-param').addEventListener('click', () => radice.classList.add('param-aperti'));
      $('.b-param-chiudi').addEventListener('click', () => radice.classList.remove('param-aperti'));
      parametriEl.addEventListener('click', ev => {
        const bt = ev.target.closest('button[data-d]'); if (!bt || !libero || bt.disabled) return;
        const box = bt.closest('.lab-param'), b = box.dataset.b, c = box.dataset.c, [lo, hi, passo] = LIM[c];
        lib[b][c] = Math.max(lo, Math.min(hi, lib[b][c] + +bt.dataset.d * passo));
        nuovaPesata();
      });
      LIVELLI.forEach((_, i) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (i + 1)); p.innerHTML = '<span>' + (i + 1) + '</span>';
        p.addEventListener('click', () => { if (libero || i !== livello || vinto) avviaLivello(i); });
        livelliEl.insertBefore(p, bLibero);
      });
      const ro = new ResizeObserver(() => { disponi(); if (st) stringi(); });
      ro.observe(radice); ro.observe(svg);

      avviaLivello(livello);
      disponi();

      return function smonta() {
        cancelAnimationFrame(raf); raf = 0;
        animati.clear(); festa = null; presa = null;
        ro.disconnect();
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', lascia);
        window.removeEventListener('pointercancel', lascia);
      };
    }
  });
})();
