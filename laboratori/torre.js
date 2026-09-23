/* Laboratorio «Misura la torre» — trigonometria del triangolo rettangolo (tangente).
   Un paesaggio in vista laterale, in scala: una torre, un personaggio con un clinometro all'altezza
   degli occhi (1,6 m). Lo studente inclina la linea di mira ruotandola attorno agli occhi; lo
   strumento legge l'angolo al grado, come uno vero. Poi scrive il risultato del suo conto: si vince
   se sta dentro la banda d'errore dovuta alla lettura al grado (calcolata per ogni livello).
   Dopo il controllo la scena disegna il triangolo rettangolo con i cateti, e la formula.
     1 piazza, 40 m: di quanto la cima sta sopra gli occhi (basta la tangente)
     2 piazza, 35 m: l'altezza della torre (l'errore tipico è dimenticare gli occhi)
     3 piazza, clinometro bloccato a 30°: si cammina, e si calcola la distanza
     4 poggio: la base della rocca è 5 m più in alto della strada
     5 faro: angolo di depressione verso una barca, si cerca la distanza
     6 fiume: la base non si raggiunge, due angoli da A e da B (20 m indietro)
   Contratto: SCHEMA-LAB.md — modelli: ruota.js, specchio.js */
(function () {
  const STILE = `
    .lab-torre { container-type: inline-size;
      --cielo-a: color-mix(in srgb, var(--s1) 34%, var(--sup)); --cielo-b: color-mix(in srgb, var(--s1) 7%, var(--sup));
      --tr-terra: color-mix(in srgb, var(--testo2) 16%, var(--sup3)); --tr-prato: color-mix(in srgb, var(--s3) 38%, var(--sup3));
      --tr-mare-a: color-mix(in srgb, var(--s1) 42%, var(--sup2)); --tr-mare-b: color-mix(in srgb, var(--s1) 62%, var(--sup3)); }
    :root[data-tema="scuro"] .lab-torre {
      --cielo-a: color-mix(in srgb, var(--s4) 18%, var(--bg)); --cielo-b: color-mix(in srgb, var(--s1) 22%, var(--sup));
      --tr-mare-a: color-mix(in srgb, var(--s1) 30%, var(--sup2)); --tr-mare-b: color-mix(in srgb, var(--s1) 14%, var(--bg)); }
    .lab-torre .tr { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: "ob" "sx" "dx"; }
    @container (min-width: 720px) {
      .lab-torre .tr { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); grid-template-areas: "sx ob" "sx dx"; grid-template-rows: auto 1fr; column-gap: 4px; }
      .lab-torre .tr-sx { padding-top: 12px; }
      .lab-torre .tr-ob { padding-top: 14px; }
    }
    .lab-torre .tr-ob { grid-area: ob; padding: 12px 16px 8px; font-size: .98rem; line-height: 1.55; color: var(--testo); }
    .lab-torre .tr-ob p { margin: 0; }
    .lab-torre .tr-ob strong { color: var(--accento-testo); }
    .lab-torre .tr-aiuto { margin: 8px 0 2px; padding: 10px 14px; border-radius: 12px; background: var(--accento-tenue); font-size: .92rem; line-height: 1.5; animation: lab-torre-pop .3s var(--morbido); }
    .lab-torre .tr-sx { grid-area: sx; min-width: 0; }
    .lab-torre .tr-dx { grid-area: dx; min-width: 0; padding-bottom: 4px; }
    .lab-torre .lab-scena { position: relative; background: transparent; margin: 0 10px; }
    .lab-torre .lab-scena svg { border-radius: 16px; box-shadow: var(--ombra); cursor: grab; outline: none; }
    .lab-torre .lab-scena svg.presa { cursor: grabbing; }
    .lab-torre .lab-scena svg.passi { cursor: ew-resize; }
    .lab-torre .lab-scena svg:focus-visible { box-shadow: 0 0 0 3px var(--accento); }
    .lab-torre .tr-cartiglio { position: absolute; top: 2.5%; left: 27%; width: 46%; box-sizing: border-box; padding: 5px 6px 6px; border-radius: 12px;
      background: color-mix(in srgb, var(--sup) 92%, transparent); border: 1px solid var(--bordo); box-shadow: var(--ombra); text-align: center;
      font-size: clamp(11px, 2.3cqw, 16px); line-height: 1.35; color: var(--testo); pointer-events: none;
      opacity: 0; transform: translateY(-8px) scale(.95); transition: opacity .3s ease, transform .45s var(--molla); }
    .lab-torre .tr-cartiglio.su { opacity: 1; transform: none; }
    .lab-torre .tr-cartiglio .katex { font-size: 1.08em; }
    .lab-torre .tr-cartiglio .ok { color: var(--ok); display: block; margin-top: 2px; }
    .lab-torre .tr-comandi { display: flex; gap: 6px; justify-content: center; align-items: center; flex-wrap: wrap; padding: 8px 10px 2px; }
    .lab-torre .tr-comandi .btn { min-height: 44px; min-width: 50px; padding-left: 10px; padding-right: 10px; font-size: .93rem; font-variant-numeric: tabular-nums; }
    .lab-torre .btn[disabled] { opacity: .38; cursor: default; }
    .lab-torre .tr-carta { margin: 8px 12px 0; padding: 9px 12px 8px; border-radius: 16px; background: var(--sup); border: 1px solid var(--bordo); box-shadow: var(--ombra); }
    .lab-torre .tr-et { font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; color: var(--testo2); font-weight: 600; }
    .lab-torre .tr-riga { display: flex; align-items: baseline; gap: 3px 10px; flex-wrap: wrap; min-height: 1.9em; padding: 2px 0; }
    .lab-torre .tr-riga .tr-et { min-width: 6.6em; }
    .lab-torre .tr-tex { font-size: 1.08rem; display: inline-flex; flex-wrap: wrap; gap: 2px 14px; align-items: baseline; }
    .lab-torre .tr-stato { font-size: .84rem; color: var(--testo2); }
    .lab-torre .tr-stato.ok { color: var(--ok); font-weight: 600; }
    .lab-torre .tr-riga.ponte { margin-top: 4px; padding: 6px 8px; border-radius: 12px; background: var(--ok-tenue); animation: lab-torre-pop .5s var(--molla); }
    .lab-torre .tr-riga.ponte .tr-et { color: var(--ok); }
    .lab-torre .tr-risposta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: 10px 12px 0; padding: 10px 12px; border-radius: 16px; background: var(--accento-tenue); border: 1px solid color-mix(in srgb, var(--accento) 22%, var(--bordo)); }
    .lab-torre .tr-risposta label { font-size: 1.12rem; color: var(--testo); }
    .lab-torre .tr-valore { width: 6.2em; min-height: 44px; box-sizing: border-box; padding: 8px 12px; border-radius: 11px; border: 1.5px solid var(--bordo2); background: var(--sup);
      color: var(--testo); font: 600 1.1rem var(--font); font-variant-numeric: tabular-nums; transition: border-color .2s, box-shadow .2s; -webkit-user-select: text; user-select: text; }
    .lab-torre .tr-valore:focus { outline: none; border-color: var(--accento); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accento) 25%, transparent); }
    .lab-torre .tr-valore.no { border-color: var(--no); }
    .lab-torre .tr-valore.ok { border-color: var(--ok); color: var(--ok); }
    .lab-torre .tr-valore:disabled { opacity: 1; }
    .lab-torre .tr-unita { color: var(--testo2); font-weight: 600; }
    .lab-torre .tr-risposta .btn { min-height: 44px; margin-left: auto; }
    .lab-torre .tr-nota { flex-basis: 100%; font-size: .8rem; color: var(--testo2); line-height: 1.4; }
    .lab-torre .lab-messaggio { padding-left: 14px; padding-right: 14px; line-height: 1.5; }
    .lab-torre .lab-messaggio.ok { font-weight: 500; }
    .lab-torre .lab-messaggio b { font-weight: 700; }
    .lab-torre .vinto { display: inline-block; font-weight: 700; animation: lab-torre-pop .45s var(--molla); }
    .lab-torre .tr-livelli { display: flex; gap: 6px; flex-wrap: wrap; }
    .lab-torre .pill { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup);
      color: var(--testo2); font: 700 .95rem var(--font); cursor: pointer; padding: 0; transition: transform .3s var(--molla), background .2s, color .2s; }
    .lab-torre .pill.fatto { background: var(--ok-tenue); color: var(--ok); border-color: color-mix(in srgb, var(--ok) 45%, var(--bordo)); }
    .lab-torre .pill.qui { background: var(--accento); color: #fff; border-color: var(--accento); transform: scale(1.07); }
    .lab-torre .pill[disabled] { opacity: .35; cursor: default; }
    .lab-torre .b-aiuto { min-width: 42px; }
    .lab-torre .scuoti { animation: lab-torre-no .38s ease; }
    @keyframes lab-torre-no { 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
    @keyframes lab-torre-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    /* scena */
    .lab-torre .tr-notte { display: none; }
    :root[data-tema="scuro"] .lab-torre .tr-notte { display: inline; }
    :root[data-tema="scuro"] .lab-torre .tr-giorno { display: none; }
    .lab-torre .tr-fin { fill: color-mix(in srgb, var(--testo) 58%, var(--sup3)); }
    :root[data-tema="scuro"] .lab-torre .tr-fin { fill: var(--avviso); fill-opacity: .72; }
    .lab-torre .tr-fin-casa { fill: color-mix(in srgb, var(--testo) 30%, var(--sup3)); }
    :root[data-tema="scuro"] .lab-torre .tr-fin-casa { fill: var(--avviso); fill-opacity: .42; }
    .lab-torre .tr-stella { animation: lab-torre-brilla 3.4s ease-in-out infinite; }
    @keyframes lab-torre-brilla { 50% { opacity: .2 } }
    .lab-torre .tr-bersaglio { transform-box: fill-box; transform-origin: center; animation: lab-torre-pulsa 1.8s ease-in-out infinite; }
    @keyframes lab-torre-pulsa { 50% { transform: scale(1.4); opacity: .5 } }
    .lab-torre .tr-disegna { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset .55s var(--morbido); }
    .lab-torre .via .tr-disegna { stroke-dashoffset: 0; }
    .lab-torre .tr-appare { opacity: 0; transition: opacity .4s ease .2s; }
    .lab-torre .via .tr-appare { opacity: 1; }
    .lab-torre .tr-pop { transform-box: fill-box; transform-origin: center; animation: lab-torre-pop .45s var(--molla); }
    .lab-torre .tr-allarme { animation: lab-torre-allarme .9s ease-in-out 3; }
    @keyframes lab-torre-allarme { 50% { opacity: .3 } }
    .lab-torre .tr-testo-svg { paint-order: stroke; stroke: var(--sup); stroke-width: 3.5px; stroke-linejoin: round; }
  `;

  /* ---------------- aiuti numerici ---------------- */
  const RAD = Math.PI / 180;
  const tg = a => Math.tan(a * RAD), sn = a => Math.sin(a * RAD), cs = a => Math.cos(a * RAD);
  const OCCHI = 1.6;
  const VW = 400, VH = 300;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const morsa = (v, a, b) => Math.max(a, Math.min(b, v));
  const dolce = t => .5 - .5 * Math.cos(Math.PI * t);
  const liscia = t => 1 - Math.pow(1 - t, 3);
  /* numeri all'italiana: virgola decimale, meno tipografico */
  const virgola = (v, c) => { let s = Number(v).toFixed(c); if (/^-0(\.0*)?$/.test(s)) s = s.slice(1); return s.replace('.', ',').replace('-', '−'); };
  const numTex = (v, c) => virgola(v, c).replace('−', '-').replace(',', '{,}');
  const leggiNumero = s => {
    const t = String(s).trim().replace(/\s+/g, '').replace(/m$/i, '').replace(/[−–]/g, '-').replace(',', '.');
    return /^-?(\d+(\.\d*)?|\.\d+)$/.test(t) ? parseFloat(t) : NaN;
  };
  const stretta = v => Math.max(0.2, 0.01 * Math.abs(v));     /* quanto deve somigliare una risposta a un errore tipico */

  /* ---------------- errori tipici (Zenone) ---------------- */
  const Z_RAD = r => 'La calcolatrice è in radianti: per lei «tan ' + r + '» vuol dire ' + r + ' radianti, non ' + r + ' gradi. Passa a DEG e rifai il conto.';
  const Z_SENO = 'Hai usato il seno. Il seno lega il cateto opposto all\'ipotenusa, cioè alla linea di mira, che nessuno ha misurato. Con i due cateti serve la tangente.';
  const Z_COSENO = 'Hai usato il coseno, che lega il cateto adiacente all\'ipotenusa. Qui conosci un cateto e cerchi l\'altro: serve la tangente.';
  const Z_DIVISO = 'Hai diviso per la tangente. Da tan α = opposto : adiacente viene opposto = adiacente · tan α: si moltiplica.';
  /* la formula giusta è d·tan r + c: gli sbagli che si fanno davvero con la calcolatrice */
  function erroriAltezza(d, c, r) {
    const e = [
      { v: d * Math.tan(r) + c, zen: Z_RAD(r) },
      { v: d * sn(r) + c, zen: Z_SENO },
      { v: d * cs(r) + c, zen: Z_COSENO },
      { v: d / tg(r) + c, zen: Z_DIVISO }
    ];
    if (c) e.push({ v: d * Math.tan(r), zen: Z_RAD(r) });
    return e;
  }

  /* ---------------- livelli ----------------
     scena: 'piazza' | 'poggio' | 'faro' | 'fiume'. vista: [xMin, xMax, y del suolo in px, quota massima da far stare].
     Coordinate del mondo in metri: la faccia della torre verso di te è x = 0, tu stai a sinistra (x < 0).
     giusto: il valore esatto della geometria; calcola(m): il conto fatto con le letture m = { r } o { rA, rB }. */
  const LIVELLI = [
    { scena: 'piazza', stile: 'campanile', d: 40, H: 31.8, w: 7, vista: [-47, 12, 272, 34], lente: [60, 58], astro: [248, 30], partenza: 14,
      incognita: 'x', nota: 'x = di quanti metri la cima sta più in alto dei tuoi occhi',
      giusto: 30.2, calcola: m => 40 * tg(m.r),
      regola: 'x = d\\tan\\alpha', conti: m => 'x = 40\\cdot\\tan ' + m.r + '^\\circ \\approx ' + numTex(40 * tg(m.r), 2) + '\\ \\text{m}',
      qui: m => '\\tan ' + m.r + '^\\circ = \\dfrac{?}{40\\ \\text{m}}',
      errori: m => [{ v: 40 * tg(m.r) + OCCHI, msg: 'Questa è l\'altezza della cima da terra. Qui la domanda è un\'altra: di quanto la cima sta sopra i tuoi occhi.' }].concat(erroriAltezza(40, 0, m.r)),
      testo: 'Sei a **40 m** dalla base della torre: lo dice la fettuccia stesa a terra. Trascina il pallino sulla linea di mira e ruotala finché tocca la cima, leggi l\'angolo sullo strumento e calcola **di quanti metri la cima sta più in alto dei tuoi occhi**. La calcolatrice del telefono va bene.',
      aiuto: 'Dai tuoi occhi parte una linea orizzontale che arriva alla torre: con la torre e con la linea di mira forma un triangolo rettangolo. I 40 m a terra sono il cateto adiacente all\'angolo α, il pezzo di torre sopra quella linea è il cateto opposto. La tangente di α è opposto diviso adiacente, quindi l\'opposto è 40 per tan α. Controlla che la calcolatrice sia in gradi (DEG).',
      vittoria: 'Il triangolo ha l\'angolo retto all\'altezza dei tuoi occhi. Il cateto adiacente è la distanza, 40 m; il cateto opposto è quello che cercavi, e vale 40 · tan α.' },

    { scena: 'piazza', stile: 'civica', d: 35, H: 32.0, w: 6.5, vista: [-42, 12, 272, 34.5], lente: [60, 58], astro: [232, 28], partenza: 18,
      incognita: 'h', nota: 'h = altezza della torre, da terra fino alla cima',
      giusto: 32.0, calcola: m => 35 * tg(m.r) + OCCHI,
      regola: 'h = d\\tan\\alpha + 1{,}6', conti: m => 'h = 35\\cdot\\tan ' + m.r + '^\\circ + 1{,}6 \\approx ' + numTex(35 * tg(m.r) + OCCHI, 2) + '\\ \\text{m}',
      qui: m => '\\tan ' + m.r + '^\\circ = \\dfrac{?}{35\\ \\text{m}}',
      errori: m => [{ v: 35 * tg(m.r), zen: 'Hai trovato il pezzo di torre sopra i tuoi occhi. Mancano 1,6 m: i tuoi occhi non stanno per terra.', msg: 'Ti manca un pezzo di torre: guarda il segmento rosso in basso.', segna: 'occhi' }].concat(erroriAltezza(35, OCCHI, m.r)),
      testo: 'Un\'altra torre, a **35 m**. Stavolta ti serve l\'**altezza della torre**, da terra fino alla cima.',
      aiuto: 'Il triangolo rettangolo parte dai tuoi occhi. La tangente ti dà il cateto opposto, cioè il pezzo di torre che sta sopra la linea orizzontale degli occhi. Guarda nella lente quanto c\'è fra i tuoi piedi e i tuoi occhi, e chiediti dove va a finire quel pezzo sulla torre.',
      vittoria: 'La tangente ti dà solo il pezzo di torre sopra i tuoi occhi. Il pezzo sotto, da terra agli occhi, è alto 1,6 m e va aggiunto: h = d · tan α + 1,6.' },

    { scena: 'piazza', stile: 'orologio', d: 62, H: 25.6, w: 6.5, vista: [-76, 12, 262, 30], lente: [60, 58], astro: [300, 40], cammina: true, fisso: 30,
      incognita: 'd', nota: 'd = distanza fra te e la torre',
      giusto: 24 / tg(30), banda: [-0.5, 0.5], calcola: () => 24 / tg(30),
      regola: 'd = \\dfrac{h - 1{,}6}{\\tan 30^\\circ}', conti: () => 'd = \\dfrac{25{,}6 - 1{,}6}{\\tan 30^\\circ} \\approx ' + numTex(24 / tg(30), 2) + '\\ \\text{m}',
      qui: () => '\\tan 30^\\circ = \\dfrac{?}{d}',
      errori: () => [
        { v: 24 * tg(30), zen: 'Hai moltiplicato. Stavolta l\'incognita è il cateto adiacente: da tan 30° = opposto : d viene d = opposto : tan 30°.' },
        { v: 25.6 / tg(30), zen: 'Il cateto opposto parte dai tuoi occhi, 1,6 m sopra terra: è 25,6 − 1,6.', msg: 'Il triangolo parte dai tuoi occhi: guarda il segmento rosso in basso sulla torre.', segna: 'occhi' },
        { v: 24 / sn(30), zen: 'Con il seno trovi la linea di mira, cioè l\'ipotenusa. La distanza a terra è il cateto adiacente: serve la tangente.' },
        { v: 25.6 / sn(30), zen: 'Con il seno trovi la linea di mira, cioè l\'ipotenusa. La distanza a terra è il cateto adiacente: serve la tangente.' },
        { v: 24 / cs(30), zen: Z_COSENO },
        { v: 24 / Math.tan(30), zen: Z_RAD(30) },
        { v: 25.6 * tg(30), zen: 'Hai moltiplicato. Stavolta l\'incognita è il cateto adiacente: da tan 30° = opposto : d viene d = opposto : tan 30°.' }
      ],
      testo: 'La torre dell\'orologio è alta **25,6 m**. Il tuo clinometro è bloccato a **30°**. Trascina il personaggio avanti e indietro finché la mira sfiora la cima, poi calcola **a che distanza dalla torre** ti trovi: la fettuccia è rimasta nello zaino.',
      aiuto: 'Stavolta conosci l\'angolo e il cateto opposto, e l\'incognita è il cateto adiacente, la distanza d. Il cateto opposto parte dall\'altezza dei tuoi occhi. Da tan 30° = opposto : d ricavi d dividendo l\'opposto per tan 30°.',
      vittoria: 'Qui l\'incognita era il cateto adiacente: d = (25,6 − 1,6) : tan 30°. Se ti avvicini l\'angolo cresce, se ti allontani cala: per vedere la cima proprio a 30° c\'è un posto solo.' },

    { scena: 'poggio', stile: 'rocca', d: 40, H: 21.6, w: 8, base: 5, vista: [-47, 18, 272, 29], lente: [60, 58], astro: [178, 32], partenza: 12,
      incognita: 'h', nota: 'h = altezza della rocca, dalla sua base alla cima',
      giusto: 21.6, calcola: m => 40 * tg(m.r) + OCCHI - 5,
      regola: 'h = d\\tan\\alpha + 1{,}6 - 5', conti: m => 'h = 40\\cdot\\tan ' + m.r + '^\\circ + 1{,}6 - 5 \\approx ' + numTex(40 * tg(m.r) + OCCHI - 5, 2) + '\\ \\text{m}',
      qui: m => '\\tan ' + m.r + '^\\circ = \\dfrac{?}{40\\ \\text{m}}',
      errori: m => [
        { v: 40 * tg(m.r) + OCCHI, zen: 'Quella è la quota della cima sopra la strada. La rocca però comincia sul poggio, 5 m più su.', segna: 'poggio' },
        { v: 40 * tg(m.r) + OCCHI + 5, zen: 'La base della rocca sta più in alto di te: quei 5 m di poggio non sono rocca, vanno tolti.', segna: 'poggio' },
        { v: 40 * tg(m.r) - 5, zen: 'Hai tolto il poggio ma ti sei scordato gli occhi: il triangolo parte 1,6 m sopra la strada.', segna: 'occhi' },
        { v: 40 * tg(m.r), msg: 'Questo è di quanto la cima sta sopra i tuoi occhi. Adesso conta che cosa c\'è sotto: i tuoi occhi da una parte, il poggio dall\'altra.' }
      ].concat(erroriAltezza(40, OCCHI - 5, m.r)),
      testo: 'La rocca sta su un poggio: la sua base è **5 m più in alto** della strada dove sei tu. In orizzontale la distanza è **40 m** (l\'hai presa dalla mappa). Quanto è **alta la rocca**, dalla sua base alla cima?',
      aiuto: 'Il triangolo parte sempre dai tuoi occhi, 1,6 m sopra la strada. La tangente ti dice di quanto la cima sta sopra i tuoi occhi. Da lì passa alla quota della cima sopra la strada, poi togli la parte che non è rocca.',
      vittoria: 'La cima sta 25 m sopra i tuoi occhi, quindi 26,6 m sopra la strada. La rocca però comincia a quota 5: è alta 26,6 − 5 = 21,6 m.' },

    { scena: 'faro', g: 24.5, D: 68, vista: [-14, 80, 250, 31], lente: [64, 55], astro: [330, 40], partenza: -6,
      incognita: 'd', nota: 'd = distanza della barca dal piede del faro',
      giusto: 68, calcola: m => (24.5 + OCCHI) / tg(m.r),
      regola: 'd = \\dfrac{24{,}5 + 1{,}6}{\\tan\\delta}', conti: m => 'd = \\dfrac{26{,}1}{\\tan ' + m.r + '^\\circ} \\approx ' + numTex(26.1 / tg(m.r), 2) + '\\ \\text{m}',
      qui: m => '\\tan ' + m.r + '^\\circ = \\dfrac{\\text{opposto}}{\\text{adiacente}}',
      errori: m => [
        { v: 24.5 / tg(m.r), zen: 'Hai usato l\'altezza della galleria. Il triangolo parte dai tuoi occhi, 1,6 m più su.', msg: 'Il cateto verticale va dal mare ai tuoi occhi: guarda il pezzo rosso in alto.', segna: 'occhi' },
        { v: 26.1 * tg(m.r), zen: 'Hai moltiplicato. Qui la distanza è il cateto adiacente e l\'altezza è l\'opposto: la distanza si trova dividendo per la tangente.' },
        { v: 24.5 * tg(m.r), zen: 'Hai moltiplicato. Qui la distanza è il cateto adiacente e l\'altezza è l\'opposto: la distanza si trova dividendo per la tangente.' },
        { v: 26.1 / sn(m.r), zen: 'Con il seno hai trovato la linea di mira fino alla barca, cioè l\'ipotenusa. La distanza sul mare è il cateto adiacente.' },
        { v: 26.1 / cs(m.r), zen: Z_COSENO },
        { v: 26.1 / Math.tan(m.r), zen: Z_RAD(m.r) }
      ],
      testo: 'Sei sulla galleria del faro, **24,5 m** sopra il mare. Punta la barca: l\'angolo fra l\'orizzontale e la mira verso il basso si chiama **angolo di depressione**. Quanto **dista la barca** dal piede del faro?',
      aiuto: 'Il triangolo ha i vertici nei tuoi occhi, nel piede del faro e nella barca. L\'angolo di depressione preso lassù è uguale all\'angolo sotto cui la barca vede i tuoi occhi: sono angoli alterni. Per quell\'angolo il cateto opposto è l\'altezza dei tuoi occhi sul mare, e la distanza è il cateto adiacente.',
      vittoria: 'L\'angolo di depressione lassù è uguale all\'angolo alla barca: sono alterni. Il cateto opposto è l\'altezza dei tuoi occhi, 24,5 + 1,6 = 26,1 m, e la distanza si trova dividendo: d = 26,1 : tan δ.' },

    { scena: 'fiume', stile: 'civica', H: 22.6, w: 6, xA: -25, xB: -45, vista: [-52, 12, 268, 25], lente: [60, 58], astro: [300, 36], partenza: 15,
      incognita: 'h', nota: 'h = altezza della torre, da terra fino alla cima',
      giusto: 22.6, calcola: m => 20 * tg(m.rA) * tg(m.rB) / (tg(m.rA) - tg(m.rB)) + OCCHI,
      regola: 'x\\tan\\alpha = (x + 20)\\tan\\beta',
      conti: m => { const x = 20 * tg(m.rB) / (tg(m.rA) - tg(m.rB)); return ['x = \\dfrac{20\\tan ' + m.rB + '^\\circ}{\\tan ' + m.rA + '^\\circ - \\tan ' + m.rB + '^\\circ} \\approx ' + numTex(x, 2) + '\\ \\text{m}', 'h = x\\tan ' + m.rA + '^\\circ + 1{,}6 \\approx ' + numTex(x * tg(m.rA) + OCCHI, 2) + '\\ \\text{m}']; },
      qui: m => [(m.rA != null ? '\\tan ' + m.rA + '^\\circ' : '\\tan\\alpha') + ' = \\dfrac{?}{x}', (m.rB != null ? '\\tan ' + m.rB + '^\\circ' : '\\tan\\beta') + ' = \\dfrac{?}{x + 20}'],
      errori: m => {
        const Z20 = '20 m è quanto hai camminato, non la distanza dalla torre. La distanza x da A non la conosci: servono tutti e due i triangoli.';
        const tA = Math.tan(m.rA), tB = Math.tan(m.rB);
        return [
          { v: 20 * tg(m.rA) + OCCHI, zen: Z20 }, { v: 20 * tg(m.rB) + OCCHI, zen: Z20 }, { v: 20 * tg(m.rA), zen: Z20 }, { v: 20 * tg(m.rB), zen: Z20 },
          { v: 20 * tg(m.rA) * tg(m.rB) / (tg(m.rA) - tg(m.rB)), zen: 'Hai trovato il pezzo di torre sopra i tuoi occhi. Manca il pezzo sotto, da terra agli occhi: 1,6 m.', segna: 'occhi' },
          { v: 20 * tA * tB / (tA - tB) + OCCHI, zen: Z_RAD(m.rA) },
          { v: 20 * tg(m.rA - m.rB) + OCCHI, zen: 'Hai sottratto gli angoli dentro la tangente, ma tan(α − β) non è tan α − tan β. Scrivi un\'equazione per ogni triangolo, con la stessa incognita x.' }
        ];
      },
      testo: 'La torre sta di là dal fiume e la fettuccia non ci arriva. Misura l\'angolo da **A**, poi fai **20 m indietro** e misuralo di nuovo da **B**. Con i due angoli trova l\'**altezza della torre**.',
      aiuto: 'Chiama x la distanza da A alla torre, che non conosci: da B la distanza è x + 20. Scrivi la tangente in tutti e due i triangoli. Il cateto opposto è lo stesso, il pezzo di torre sopra i tuoi occhi: uguaglia le due espressioni, ricava x e poi l\'altezza.',
      vittoria: 'Due triangoli con lo stesso cateto opposto: x · tan α = (x + 20) · tan β. Da lì esce x ≈ 25 m, e poi l\'altezza. Con due angoli letti al grado gli errori si sommano: per questo la tolleranza qui è più larga.' }
  ];

  COMPASSO.registraLab({
    id: 'torre',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-torre')) { const s = document.createElement('style'); s.id = 'stile-lab-torre'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-torre');
      radice.innerHTML = `
        <div class="tr">
          <div class="tr-ob"><div class="tr-testo"></div><div class="tr-aiuto" hidden></div></div>
          <div class="tr-sx">
            <div class="lab-scena"><div class="tr-cartiglio" aria-live="polite"></div></div>
            <div class="tr-comandi">
              <button type="button" class="btn b-meno"></button>
              <button type="button" class="btn b-piu"></button>
              <button type="button" class="btn b-stazione" hidden></button>
            </div>
          </div>
          <div class="tr-dx">
            <div class="tr-carta tr-formula"></div>
            <form class="tr-risposta" autocomplete="off" novalidate>
              <label class="tr-et-r" for="tr-valore"></label>
              <input id="tr-valore" class="tr-valore" type="text" inputmode="decimal" enterkeyhint="done" spellcheck="false" autocomplete="off">
              <span class="tr-unita">m</span>
              <button type="submit" class="btn primario b-controlla">Controlla</button>
              <div class="tr-nota"></div>
            </form>
            <div class="lab-messaggio" aria-live="polite"></div>
          </div>
        </div>
        <div class="lab-barra">
          <div class="tr-livelli" role="group" aria-label="Livelli"></div>
          <button type="button" class="btn piccolo b-aiuto" title="Come si fa" aria-label="Come si fa">?</button>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <span class="lab-livello"></span>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), cartiglio = q('.tr-cartiglio'), testoEl = q('.tr-testo'), aiutoEl = q('.tr-aiuto');
      const formEl = q('.tr-formula'), rispEl = q('.tr-risposta'), valEl = q('.tr-valore'), etR = q('.tr-et-r'), notaEl = q('.tr-nota');
      const msg = q('.lab-messaggio'), pillEl = q('.tr-livelli'), livEl = q('.lab-livello');
      const b = { meno: q('.b-meno'), piu: q('.b-piu'), stazione: q('.b-stazione'), controlla: q('.b-controlla'), aiuto: q('.b-aiuto'), ric: q('.b-ric') };
      /* Zenone parla; l'ultima frase resta anche in un attributo, così il banco di prova la può leggere */
      const zen = (t, o) => { radice.dataset.zenone = t; ctx.zenone(t, o); };

      /* ================= scena: strati fissi ================= */
      const svg = el('svg', { viewBox: `0 0 ${VW} ${VH}`, role: 'img', tabindex: '0', 'aria-label': 'Paesaggio in vista laterale: trascina per ruotare la linea di mira attorno agli occhi, oppure usa le frecce' });
      scena.insertBefore(svg, cartiglio);
      const defs = el('defs'); svg.appendChild(defs);
      const grad = (id, stops, attr) => { const g = el('linearGradient', Object.assign({ id, x1: 0, y1: 0, x2: 0, y2: 1 }, attr || {})); stops.forEach(([o, c, op]) => g.appendChild(el('stop', { offset: o, style: 'stop-color:' + c + (op != null ? ';stop-opacity:' + op : '') }))); defs.appendChild(g); };
      grad('tr-cielo', [[0, 'var(--cielo-a)'], [1, 'var(--cielo-b)']]);
      grad('tr-mare', [[0, 'var(--tr-mare-a)'], [1, 'var(--tr-mare-b)']]);
      const alone = el('radialGradient', { id: 'tr-alone' });
      alone.appendChild(el('stop', { offset: 0, style: 'stop-color:var(--avviso);stop-opacity:.45' }));
      alone.appendChild(el('stop', { offset: 1, style: 'stop-color:var(--avviso);stop-opacity:0' }));
      defs.appendChild(alone);
      const taglio = el('clipPath', { id: 'tr-taglio' }); taglio.appendChild(el('rect', { x: 0, y: 0, width: VW, height: VH, rx: 16 })); defs.appendChild(taglio);
      const taglioLente = el('clipPath', { id: 'tr-taglio-lente' }); const cerchioClip = el('circle', { r: 45 }); taglioLente.appendChild(cerchioClip); defs.appendChild(taglioLente);
      const ombra = el('filter', { id: 'tr-ombra', x: '-40%', y: '-40%', width: '180%', height: '180%' });
      ombra.appendChild(el('feDropShadow', { dx: 0, dy: 2, stdDeviation: 2, 'flood-color': '#000', 'flood-opacity': .28 }));
      defs.appendChild(ombra);

      const mondo = el('g', { 'clip-path': 'url(#tr-taglio)' }); svg.appendChild(mondo);
      const strato = nome => { const g = el('g', { class: nome }); mondo.appendChild(g); return g; };
      const gCielo = strato('tr-strato-cielo'), gSfondo = strato('tr-strato-sfondo'), gTerra = strato('tr-strato-terra'), gTorre = strato('tr-strato-torre');
      const gNastro = strato('tr-strato-nastro'), gTriangolo = strato('tr-strato-triangolo'), gRisposta = strato('tr-strato-risposta');
      const gMira = strato('tr-strato-mira'), gPersona = strato('tr-strato-persona'), gLente = strato('tr-strato-lente'), gFx = strato('tr-strato-fx');
      gFx.setAttribute('pointer-events', 'none');

      /* cielo: di giorno sole e nuvole, di sera luna e stelle (le classi scelgono col tema, anche se cambia a laboratorio aperto) */
      gCielo.appendChild(el('rect', { x: 0, y: 0, width: VW, height: VH, fill: 'url(#tr-cielo)' }));
      let seme = 7;
      const caso = () => { seme = (seme * 16807) % 2147483647; return (seme - 1) / 2147483646; };
      const stelle = el('g', { class: 'tr-notte' }); gCielo.appendChild(stelle);
      for (let i = 0; i < 46; i++) {
        const x = caso() * VW, y = caso() * 190, r = caso() < .18 ? 1.5 : .8 + caso() * .5;
        stelle.appendChild(el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: r.toFixed(2), fill: 'var(--testo)', opacity: (.45 + caso() * .4).toFixed(2), class: i % 3 ? null : 'tr-stella', style: i % 3 ? null : 'animation-delay:' + (caso() * 3).toFixed(2) + 's' }));
      }
      const astro = el('g'); gCielo.appendChild(astro);
      const luna = el('g', { class: 'tr-notte' }); astro.appendChild(luna);
      luna.appendChild(el('circle', { r: 30, fill: 'url(#tr-alone)', opacity: .7 }));
      luna.appendChild(el('circle', { r: 11, style: 'fill: color-mix(in srgb, var(--avviso) 55%, var(--testo))' }));
      luna.appendChild(el('circle', { cx: -3.5, cy: -2, r: 2.2, fill: '#000', opacity: .1 }));
      luna.appendChild(el('circle', { cx: 3, cy: 3.5, r: 1.6, fill: '#000', opacity: .1 }));
      const sole = el('g', { class: 'tr-giorno' }); astro.appendChild(sole);
      sole.appendChild(el('circle', { r: 34, fill: 'url(#tr-alone)', opacity: .8 }));
      sole.appendChild(el('circle', { r: 13, fill: 'var(--avviso)', opacity: .55 }));
      const nuvole = el('g', { class: 'tr-giorno', fill: 'var(--sup)', opacity: .8 }); gCielo.appendChild(nuvole);
      const nuvola = (x, y, k) => { [[0, 0, 22, 8], [13, -6, 14, 10], [-12, -3, 11, 8]].forEach(([dx, dy, rx, ry]) => nuvole.appendChild(el('ellipse', { cx: x + dx * k, cy: y + dy * k, rx: rx * k, ry: ry * k }))); };
      nuvola(150, 96, 1); nuvola(330, 150, .75); nuvola(40, 170, .6);

      /* ================= geometria del livello ================= */
      let G = null;
      const X = x => G.ox + G.s * x, Y = y => G.yg - G.s * y;
      const f1 = v => v.toFixed(1);

      /* collinette lontane, fatte con curve morbide */
      function colline(y0, a, fase, colore, op) {
        let d = `M0 ${VH} L0 ${f1(y0)}`;
        for (let x = 0; x < VW; x += 40) {
          const yy = y0 - a * (.6 * Math.sin((x + 20) / 61 + fase) + .4 * Math.sin((x + 20) / 27 + 2 * fase));
          const y1 = y0 - a * (.6 * Math.sin((x + 40) / 61 + fase) + .4 * Math.sin((x + 40) / 27 + 2 * fase));
          d += ` Q${x + 20} ${f1(yy)} ${x + 40} ${f1(y1)}`;
        }
        d += ` L${VW} ${VH} Z`;
        gSfondo.appendChild(el('path', { d, style: 'fill:' + colore, opacity: op }));
      }
      function cipresso(x, h) {
        const y = G.yg;
        gSfondo.appendChild(el('path', { d: `M${f1(x)} ${y} Q${f1(x - 6)} ${f1(y - h * .45)} ${f1(x)} ${f1(y - h)} Q${f1(x + 6)} ${f1(y - h * .45)} ${f1(x)} ${y} Z`, style: 'fill: color-mix(in srgb, var(--s3) 52%, var(--sup3))' }));
        gSfondo.appendChild(el('path', { d: `M${f1(x)} ${y} L${f1(x)} ${f1(y - h)} Q${f1(x + 6)} ${f1(y - h * .45)} ${f1(x)} ${y} Z`, fill: '#000', opacity: .14 }));
      }
      function casette(x0, x1) {
        const g = el('g', { opacity: .88 }); gSfondo.appendChild(g);
        let x = x0, i = 0;
        while (x < x1) {
          const w = 26 + (i * 17) % 19, h = 24 + (i * 29) % 30, top = G.yg - h;
          g.appendChild(el('rect', { x: f1(x), y: top, width: w - 1.5, height: h, style: 'fill: color-mix(in srgb, var(--s2) 13%, var(--sup3))' }));
          g.appendChild(el('path', { d: `M${f1(x - 2)} ${top} L${f1(x + w / 2)} ${top - 6} L${f1(x + w + .5)} ${top} Z`, style: 'fill: color-mix(in srgb, var(--s2) 40%, var(--sup3))' }));
          for (let yy = top + 6; yy < G.yg - 9; yy += 11) for (let xx = x + 5; xx < x + w - 7; xx += 9) g.appendChild(el('rect', { x: f1(xx), y: yy, width: 3.6, height: 5.5, rx: .8, class: 'tr-fin-casa' }));
          x += w; i++;
        }
        g.appendChild(el('rect', { x: x0, y: G.yg - 70, width: x1 - x0, height: 70, fill: 'url(#tr-cielo)', opacity: .22 }));
      }
      function pavimento() {
        gTerra.appendChild(el('rect', { x: 0, y: G.yg, width: VW, height: VH - G.yg, style: 'fill: var(--tr-terra)' }));
        gTerra.appendChild(el('rect', { x: 0, y: G.yg, width: VW, height: 2, fill: 'var(--testo)', opacity: .14 }));
        for (let yy = G.yg + 7; yy < VH; yy += 9) gTerra.appendChild(el('line', { x1: 0, x2: VW, y1: yy, y2: yy, stroke: 'var(--testo)', 'stroke-width': .6, opacity: .08 }));
        for (let xx = 6; xx < VW; xx += 17) gTerra.appendChild(el('line', { x1: xx, x2: xx - 7, y1: G.yg, y2: VH, stroke: 'var(--testo)', 'stroke-width': .6, opacity: .06 }));
      }

      /* la torre: faccia verso di te in x0, base a quota y0; la cima è lo spigolo in alto a sinistra del primo merlo */
      function torre(x0, y0, w, H, stile) {
        const g = gTorre, s = G.s;
        const L0 = X(x0), R0 = X(x0 + w), T0 = Y(y0 + H), B0 = Y(y0), W0 = R0 - L0;
        const muro = stile === 'rocca' ? 'color-mix(in srgb, var(--testo2) 26%, var(--sup3))' : stile === 'civica' ? 'color-mix(in srgb, var(--s2) 20%, var(--sup3))'
          : stile === 'orologio' ? 'color-mix(in srgb, var(--avviso) 22%, var(--sup3))' : 'color-mix(in srgb, var(--s2) 34%, var(--sup3))';
        const mh = 1.3, mw = 1.2, n = Math.max(2, Math.round((w + .9) / 2.1)), gap = (w - n * mw) / (n - 1);
        const yM = Y(y0 + H - mh);
        g.appendChild(el('ellipse', { cx: (L0 + R0) / 2 + 5, cy: B0, rx: W0 * .85, ry: 3, fill: '#000', opacity: .14 }));
        const corpo = el('g', { filter: 'url(#tr-ombra)' }); g.appendChild(corpo);
        corpo.appendChild(el('rect', { x: L0, y: yM, width: W0, height: B0 - yM, style: 'fill:' + muro }));
        let d = '';
        for (let i = 0; i < n; i++) { const a = x0 + i * (mw + gap); d += `M${f1(X(a))} ${f1(yM + .5)} L${f1(X(a))} ${f1(T0)} L${f1(X(a + mw / 2))} ${f1(Y(y0 + H - .5))} L${f1(X(a + mw))} ${f1(T0)} L${f1(X(a + mw))} ${f1(yM + .5)} Z `; }
        corpo.appendChild(el('path', { d, style: 'fill:' + muro }));
        g.appendChild(el('rect', { x: R0 - W0 * .3, y: yM, width: W0 * .3, height: B0 - yM, fill: '#000', opacity: .12 }));
        g.appendChild(el('rect', { x: L0, y: yM, width: Math.max(1.2, W0 * .06), height: B0 - yM, fill: '#fff', opacity: .14 }));
        if (stile === 'rocca') {                                  /* conci di pietra sfalsati */
          for (let y = y0 + 1.1, k = 0; y < y0 + H - mh; y += 1.1, k++) {
            g.appendChild(el('line', { x1: L0, x2: R0, y1: f1(Y(y)), y2: f1(Y(y)), stroke: 'var(--testo)', 'stroke-width': .6, opacity: .12 }));
            for (let x = x0 + (k % 2 ? .8 : 1.6); x < x0 + w; x += 1.6) g.appendChild(el('line', { x1: f1(X(x)), x2: f1(X(x)), y1: f1(Y(y)), y2: f1(Y(y - 1.1)), stroke: 'var(--testo)', 'stroke-width': .6, opacity: .1 }));
          }
        } else for (let y = y0 + 1.5; y < y0 + H - mh - .5; y += 1.5) g.appendChild(el('line', { x1: L0, x2: R0, y1: f1(Y(y)), y2: f1(Y(y)), stroke: 'var(--testo)', 'stroke-width': .6, opacity: .09 }));
        /* cornice con archetti sotto i merli */
        const yC = y0 + H - mh - .2;
        g.appendChild(el('rect', { x: L0, y: Y(yC), width: W0, height: Math.max(1.5, .45 * s), fill: '#000', opacity: .12 }));
        const archi = Math.max(3, Math.round(w / 1.15));
        for (let i = 0; i < archi; i++) { const ax = L0 + W0 * (i + .5) / archi, rr = W0 / archi * .36; g.appendChild(el('path', { d: `M${f1(ax - rr)} ${f1(Y(yC - .9))} A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(ax + rr)} ${f1(Y(yC - .9))}`, fill: 'none', stroke: 'var(--testo)', 'stroke-width': .8, opacity: .25 })); }
        /* porta ad arco */
        const pw = Math.min(1.8, w * .26), ph = 3.2, pc = x0 + w * .45;
        g.appendChild(el('path', { d: `M${f1(X(pc - pw / 2))} ${B0} V${f1(Y(y0 + ph - pw / 2))} A${f1(pw / 2 * s)} ${f1(pw / 2 * s)} 0 0 1 ${f1(X(pc + pw / 2))} ${f1(Y(y0 + ph - pw / 2))} V${B0} Z`, fill: '#000', opacity: .45 }));
        /* feritoie */
        const feritoia = (fx, fy, fw, fh) => g.appendChild(el('path', { d: `M${f1(X(fx - fw / 2))} ${f1(Y(fy))} V${f1(Y(fy + fh - fw / 2))} A${f1(fw / 2 * s)} ${f1(fw / 2 * s)} 0 0 1 ${f1(X(fx + fw / 2))} ${f1(Y(fy + fh - fw / 2))} V${f1(Y(fy))} Z`, class: 'tr-fin' }));
        if (stile === 'campanile') {
          feritoia(x0 + w * .45, y0 + H * .3, .5, 1.6); feritoia(x0 + w * .45, y0 + H * .52, .5, 1.6);
          const yb = y0 + H - mh - 6, hb = 4.6;                   /* cella campanaria: due fornici con le campane */
          [.28, .66].forEach(f => {
            const cx = x0 + w * f, fw = w * .27;
            g.appendChild(el('path', { d: `M${f1(X(cx - fw / 2))} ${f1(Y(yb))} V${f1(Y(yb + hb - fw / 2))} A${f1(fw / 2 * s)} ${f1(fw / 2 * s)} 0 0 1 ${f1(X(cx + fw / 2))} ${f1(Y(yb + hb - fw / 2))} V${f1(Y(yb))} Z`, fill: '#000', opacity: .55 }));
            g.appendChild(el('path', { d: `M${f1(X(cx - .55))} ${f1(Y(yb + 1.3))} Q${f1(X(cx - .5))} ${f1(Y(yb + 2.6))} ${f1(X(cx))} ${f1(Y(yb + 2.7))} Q${f1(X(cx + .5))} ${f1(Y(yb + 2.6))} ${f1(X(cx + .55))} ${f1(Y(yb + 1.3))} Z`, fill: 'var(--avviso)', opacity: .9 }));
          });
        } else if (stile === 'civica') {
          [.38, .64].forEach(f => { const fy = y0 + H * f; feritoia(x0 + w * .36, fy, .55, 1.9); feritoia(x0 + w * .54, fy, .55, 1.9);
            g.appendChild(el('line', { x1: f1(X(x0 + w * .45)), x2: f1(X(x0 + w * .45)), y1: f1(Y(fy)), y2: f1(Y(fy + 1.6)), stroke: 'var(--testo2)', 'stroke-width': 1, opacity: .7 })); });
          feritoia(x0 + w * .45, y0 + H * .18, .5, 1.4);
        } else if (stile === 'orologio') {
          feritoia(x0 + w * .45, y0 + H * .3, .5, 1.6); feritoia(x0 + w * .45, y0 + H * .5, .5, 1.6);
          const cx = X(x0 + w * .47), cy = Y(y0 + H * .74), r = Math.min(w * .3, 2) * s;
          g.appendChild(el('circle', { cx, cy, r: r + 1.5, fill: '#000', opacity: .2 }));
          g.appendChild(el('circle', { cx, cy, r, fill: 'var(--sup)', stroke: 'var(--testo2)', 'stroke-width': 1 }));
          for (let k = 0; k < 12; k++) { const a = k * 30 * RAD; g.appendChild(el('line', { x1: f1(cx + Math.cos(a) * r * .72), y1: f1(cy + Math.sin(a) * r * .72), x2: f1(cx + Math.cos(a) * r * .88), y2: f1(cy + Math.sin(a) * r * .88), stroke: 'var(--testo)', 'stroke-width': k % 3 ? .6 : 1.1 })); }
          g.appendChild(el('path', { d: `M${f1(cx)} ${f1(cy)} L${f1(cx - r * .38)} ${f1(cy - r * .3)} M${f1(cx)} ${f1(cy)} L${f1(cx + r * .12)} ${f1(cy - r * .68)}`, stroke: 'var(--testo)', 'stroke-width': 1.3, 'stroke-linecap': 'round' }));
        } else {
          feritoia(x0 + w * .3, y0 + H * .45, .45, 1.3); feritoia(x0 + w * .62, y0 + H * .7, .45, 1.3); feritoia(x0 + w * .3, y0 + H * .8, .45, 1.3);
        }
      }

      /* quota disegnata: segmento verticale con le stanghette, e la scritta girata */
      function quota(g, x, ya, yb, testo, colore, lato) {
        const px0 = X(x), p1 = Y(ya), p2 = Y(yb), gg = el('g', { class: 'tr-quota' }); g.appendChild(gg);
        gg.appendChild(el('line', { x1: px0, x2: px0, y1: p1, y2: p2, stroke: colore, 'stroke-width': 1.6 }));
        [p1, p2].forEach(p => gg.appendChild(el('line', { x1: px0 - 4, x2: px0 + 4, y1: p, y2: p, stroke: colore, 'stroke-width': 1.6 })));
        const tx = px0 + (lato > 0 ? 11 : -6), ty = (p1 + p2) / 2;
        gg.appendChild(el('text', { x: tx, y: ty, transform: `rotate(-90 ${f1(tx)} ${f1(ty)})`, 'text-anchor': 'middle', fill: colore, class: 'tr-testo-svg', style: 'font: 700 11.5px var(--font)' }, testo));
        return gg;
      }
      /* etichetta a pillola */
      function pillola(g, x, y, testo, fondo, colore, anchor, fermo) {
        const w = testo.length * 6.4 + 14, x0 = anchor === 'end' ? x - w : anchor === 'start' ? x : x - w / 2;
        const gg = el('g', { class: fermo ? null : 'tr-pop' }); g.appendChild(gg);
        gg.appendChild(el('rect', { x: f1(x0), y: f1(y - 10), width: f1(w), height: 20, rx: 10, fill: fondo, filter: 'url(#tr-ombra)' }));
        gg.appendChild(el('text', { x: f1(x0 + w / 2), y: f1(y + 4.2), 'text-anchor': 'middle', fill: colore, style: 'font: 700 11.5px var(--font); font-variant-numeric: tabular-nums' }, testo));
        return gg;
      }
      /* fettuccia metrica a terra, da xa a xb, con le tacche ogni 5 m */
      function fettuccia(xa, xb, testo) {
        const y = G.yg + 3, a = X(xa), bb = X(xb);
        gNastro.appendChild(el('rect', { x: Math.min(a, bb), y: y - 2, width: Math.abs(bb - a), height: 4, rx: 1, fill: 'var(--avviso)', opacity: .92 }));
        for (let x = Math.min(xa, xb); x <= Math.max(xa, xb) + 1e-9; x += 5) gNastro.appendChild(el('line', { x1: f1(X(x)), x2: f1(X(x)), y1: y - 2, y2: y + 2, stroke: 'var(--testo)', 'stroke-width': .8, opacity: .55 }));
        gNastro.appendChild(el('circle', { cx: a, cy: y - 1, r: 4.5, fill: 'var(--avviso)', stroke: 'color-mix(in srgb, var(--avviso) 60%, #000)', 'stroke-width': 1.2 }));
        pillola(gNastro, (a + bb) / 2, G.yg + 17, testo, 'var(--sup)', 'var(--testo)');
      }

      /* ================= scene ================= */
      function scenaPiazza(l) {
        colline(G.yg - 52, 16, .8, 'color-mix(in srgb, var(--s3) 20%, var(--sup2))', .9);
        casette(-6, X(-1) - 4); casette(X(l.w) + 5, VW + 30);
        [[.12, 46], [.3, 38], [.52, 42]].forEach(([f, h]) => cipresso(X(-l.d) + (X(-1) - X(-l.d)) * f + 14, h));
        pavimento();
        torre(0, 0, l.w, l.H, l.stile);
        G.ostacoli = [[-400, 0, 400, 0, 'terra'], [0, 0, 0, l.H, 'muro'], [0, l.H, l.w, l.H, 'tetto']];
        if (l.cammina) quota(gTorre, l.w + 1.8, 0, l.H, '25,6 m', 'var(--testo)', 1);
      }
      const POGGIO = w => [[-400, 0], [-15, 0], [-11, 1.2], [-6.5, 4.2], [-3.5, 5], [w + 7, 5], [w + 10, 3.8], [w + 16, 1], [w + 22, 0], [400, 0]];
      function scenaPoggio(l) {
        colline(G.yg - 70, 18, 2.1, 'color-mix(in srgb, var(--s3) 18%, var(--sup2))', .9);
        colline(G.yg - 40, 12, .3, 'color-mix(in srgb, var(--s3) 28%, var(--sup2))', .9);
        pavimento();
        const pts = POGGIO(l.w);
        let d = `M${f1(X(pts[1][0]))} ${VH}`;
        pts.slice(1, -1).forEach(([x, y]) => { d += ` L${f1(X(x))} ${f1(Y(y))}`; });
        d += ` L${f1(X(pts[pts.length - 2][0]))} ${VH} Z`;
        gTerra.appendChild(el('path', { d, style: 'fill: var(--tr-prato)' }));
        gTerra.appendChild(el('path', { d, fill: '#000', opacity: .05 }));
        for (let i = 0; i < 26; i++) { const x = -3 + i * .95, y = 5; gTerra.appendChild(el('path', { d: `M${f1(X(x))} ${f1(Y(y))} l1.5 -4 l1.5 4`, stroke: 'color-mix(in srgb, var(--s3) 70%, var(--testo))', 'stroke-width': 1, fill: 'none', opacity: .35 })); }
        cipresso(X(l.w + 4), 30); cipresso(X(-5.5), 22);
        torre(0, 5, l.w, l.H, 'rocca');
        G.ostacoli = [[0, 5, 0, 5 + l.H, 'muro'], [0, 5 + l.H, l.w, 5 + l.H, 'tetto']];
        for (let i = 0; i < pts.length - 1; i++) G.ostacoli.push([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], 'terra']);
        /* la distanza dalla mappa e il dislivello del poggio */
        const yq = G.yg + 16;
        gNastro.appendChild(el('line', { x1: X(-l.d), x2: X(0), y1: yq, y2: yq, stroke: 'var(--testo2)', 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
        [X(-l.d), X(0)].forEach(x => gNastro.appendChild(el('line', { x1: x, x2: x, y1: yq - 5, y2: yq + 5, stroke: 'var(--testo2)', 'stroke-width': 1.4 })));
        pillola(gNastro, (X(-l.d) + X(-15)) / 2, yq, '40 m in orizzontale', 'var(--sup)', 'var(--testo)');
        G.quotaPoggio = quota(gTorre, l.w + 3, 0, 5, '5 m', 'var(--testo)', 1);
        gTorre.appendChild(el('line', { x1: X(-15), x2: X(l.w + 3), y1: G.yg, y2: G.yg, stroke: 'var(--testo)', 'stroke-width': 1, 'stroke-dasharray': '2 3', opacity: .45 }));
      }
      function scenaFaro(l) {
        const g = gTorre, s = G.s;
        colline(G.yg - 6, 5, 1.2, 'color-mix(in srgb, var(--s3) 16%, var(--sup2))', .8);
        gTerra.appendChild(el('rect', { x: 0, y: G.yg, width: VW, height: VH - G.yg, fill: 'url(#tr-mare)' }));
        gTerra.appendChild(el('rect', { x: 0, y: G.yg, width: VW, height: 1.5, fill: 'var(--sup)', opacity: .5 }));
        for (let i = 0; i < 22; i++) { const x = (i * 53) % VW + 10, y = G.yg + 8 + (i * 13) % (VH - G.yg - 12); gTerra.appendChild(el('path', { d: `M${x} ${y} q4 -2.5 8 0 q4 2.5 8 0`, fill: 'none', stroke: 'var(--sup)', 'stroke-width': 1, opacity: .35 })); }
        /* scogli */
        g.appendChild(el('path', { d: `M${f1(X(-12))} ${G.yg + 3} Q${f1(X(-10))} ${f1(Y(2.6))} ${f1(X(-6.5))} ${f1(Y(1.6))} L${f1(X(.4))} ${f1(Y(1.4))} Q${f1(X(2.4))} ${f1(Y(.8))} ${f1(X(3.4))} ${G.yg + 3} Z`, style: 'fill: color-mix(in srgb, var(--testo2) 32%, var(--sup3))' }));
        g.appendChild(el('path', { d: `M${f1(X(-2))} ${G.yg + 3} Q${f1(X(1))} ${f1(Y(1.2))} ${f1(X(3.4))} ${G.yg + 3} Z`, fill: '#000', opacity: .12 }));
        /* fascio di luce, solo di sera: verso il largo alle tue spalle */
        g.appendChild(el('path', { class: 'tr-notte', d: `M${f1(X(-3.1))} ${f1(Y(26.8))} L${f1(X(-14.5))} ${f1(Y(31.5))} L${f1(X(-14.5))} ${f1(Y(21.5))} Z`, fill: 'var(--avviso)', opacity: .16 }));
        /* torre a righe, rastremata */
        const xa = y => -6.2 + (y - 1.4) / 23.1 * 1.0, xb = y => 0 - (y - 1.4) / 23.1 * 1.0;
        const corpo = el('g', { filter: 'url(#tr-ombra)' }); g.appendChild(corpo);
        corpo.appendChild(el('path', { d: `M${f1(X(xa(1.4)))} ${f1(Y(1.4))} L${f1(X(xa(24.5)))} ${f1(Y(24.5))} L${f1(X(xb(24.5)))} ${f1(Y(24.5))} L${f1(X(xb(1.4)))} ${f1(Y(1.4))} Z`, style: 'fill: color-mix(in srgb, var(--testo) 8%, var(--sup))' }));
        [[4, 7.5], [11, 14.5], [18, 21.5]].forEach(([ya, yb]) => g.appendChild(el('path', { d: `M${f1(X(xa(ya)))} ${f1(Y(ya))} L${f1(X(xa(yb)))} ${f1(Y(yb))} L${f1(X(xb(yb)))} ${f1(Y(yb))} L${f1(X(xb(ya)))} ${f1(Y(ya))} Z`, style: 'fill: color-mix(in srgb, var(--no) 78%, var(--sup))' })));
        g.appendChild(el('path', { d: `M${f1(X(-3.1))} ${f1(Y(1.4))} L${f1(X(-3.1))} ${f1(Y(24.5))} L${f1(X(xb(24.5)))} ${f1(Y(24.5))} L${f1(X(xb(1.4)))} ${f1(Y(1.4))} Z`, fill: '#000', opacity: .1 }));
        g.appendChild(el('rect', { x: X(-3.9), y: Y(4.2), width: 1.3 * s, height: 2.8 * s, rx: 2, fill: '#000', opacity: .45 }));
        [9.5, 16.5].forEach(y => g.appendChild(el('rect', { x: X(-3.4), y: Y(y + 1), width: .7 * s, height: 1.1 * s, rx: 1, class: 'tr-fin' })));
        /* lanterna e galleria */
        g.appendChild(el('rect', { x: X(-4.5), y: Y(28.4), width: 2.8 * s, height: 3.4 * s, rx: 1.5, fill: 'var(--avviso)', opacity: .55 }));
        g.appendChild(el('circle', { class: 'tr-notte', cx: X(-3.1), cy: Y(26.8), r: 14, fill: 'url(#tr-alone)' }));
        [-4.5, -3.1, -1.7].forEach(x => g.appendChild(el('line', { x1: X(x), x2: X(x), y1: Y(28.4), y2: Y(25), stroke: 'var(--testo2)', 'stroke-width': 1 })));
        g.appendChild(el('path', { d: `M${f1(X(-4.9))} ${f1(Y(28.4))} Q${f1(X(-3.1))} ${f1(Y(31.2))} ${f1(X(-1.3))} ${f1(Y(28.4))} Z`, style: 'fill: color-mix(in srgb, var(--no) 70%, var(--testo2))' }));
        g.appendChild(el('rect', { x: X(-6.4), y: Y(24.5), width: 6.9 * s, height: Math.max(2, .45 * s), rx: 1, fill: 'var(--testo2)' }));
        g.appendChild(el('line', { x1: X(-6.4), x2: X(.5), y1: Y(25.5), y2: Y(25.5), stroke: 'var(--testo2)', 'stroke-width': 1 }));
        for (let x = -6.2; x <= .5; x += 1.15) g.appendChild(el('line', { x1: f1(X(x)), x2: f1(X(x)), y1: Y(24.5), y2: Y(25.5), stroke: 'var(--testo2)', 'stroke-width': .8 }));
        quota(g, -9, 0, l.g, '24,5 m', 'var(--testo)', -1);
        /* la barca: la mira giusta la prende sulla linea di galleggiamento */
        const D = l.D, bg = el('g'); g.appendChild(bg);
        bg.appendChild(el('path', { d: `M${f1(X(D - 3.8))} ${f1(Y(1.1))} L${f1(X(D + 3.8))} ${f1(Y(1.1))} L${f1(X(D + 3))} ${f1(Y(-.3))} L${f1(X(D - 2.8))} ${f1(Y(-.3))} Z`, fill: 'var(--s2)', filter: 'url(#tr-ombra)' }));
        bg.appendChild(el('rect', { x: X(D - 3.6), y: Y(.75), width: 7.2 * s, height: 1.2, fill: 'var(--sup)', opacity: .8 }));
        bg.appendChild(el('rect', { x: X(D - 1.2), y: Y(3.1), width: 2.8 * s, height: 2 * s, rx: 1.5, style: 'fill: color-mix(in srgb, var(--testo) 6%, var(--sup))', stroke: 'var(--testo2)', 'stroke-width': .8 }));
        bg.appendChild(el('rect', { x: X(D - .7), y: Y(2.7), width: .9 * s, height: .8 * s, rx: .8, class: 'tr-fin' }));
        bg.appendChild(el('line', { x1: X(D + 2.4), x2: X(D + 2.4), y1: Y(1.1), y2: Y(6.8), stroke: 'var(--testo2)', 'stroke-width': 1.2 }));
        bg.appendChild(el('path', { d: `M${f1(X(D + 2.4))} ${f1(Y(6.8))} l7 2.5 l-7 2.5 Z`, fill: 'var(--s1)' }));
        [[-3, 3], [.5, 2.5], [-1.4, 1.6]].forEach(([dx, w2], i) => bg.appendChild(el('line', { x1: f1(X(D + dx)), x2: f1(X(D + dx + w2)), y1: G.yg + 4 + i * 3, y2: G.yg + 4 + i * 3, stroke: 'var(--s2)', 'stroke-width': 1.2, opacity: .35 })));
        G.ostacoli = [[-1, 0, 400, 0, 'mare'], [D - 3.8, 1.1, D + 3.8, 1.1, 'barca'], [D - 3.8, 1.1, D - 2.8, -.3, 'barca'], [D - 1.2, 1.1, D - 1.2, 3.1, 'barca'], [-6.4, l.g, .5, l.g, 'galleria']];
      }
      function scenaFiume(l) {
        colline(G.yg - 46, 14, 1.7, 'color-mix(in srgb, var(--s3) 20%, var(--sup2))', .9);
        [[-3, 30], [l.w + 2.5, 36], [l.w + 5.5, 26]].forEach(([x, h]) => cipresso(X(x), h));
        gTerra.appendChild(el('rect', { x: 0, y: G.yg, width: VW, height: VH - G.yg, style: 'fill: var(--tr-prato)' }));
        gTerra.appendChild(el('rect', { x: 0, y: G.yg, width: VW, height: 2, fill: 'var(--testo)', opacity: .12 }));
        const acqua = `M${f1(X(-19))} ${G.yg} L${f1(X(-18))} ${f1(Y(-1.1))} L${f1(X(-6))} ${f1(Y(-1.1))} L${f1(X(-5))} ${G.yg} L${f1(X(-5))} ${VH} L${f1(X(-19))} ${VH} Z`;
        gTerra.appendChild(el('path', { d: acqua, fill: 'url(#tr-mare)' }));
        gTerra.appendChild(el('line', { x1: X(-18), x2: X(-6), y1: Y(-1.1), y2: Y(-1.1), stroke: 'var(--sup)', 'stroke-width': 1.4, opacity: .55 }));
        for (let i = 0; i < 7; i++) { const x = X(-17.3 + i * 1.7), y = Y(-1.1) + 7 + (i % 3) * 5; gTerra.appendChild(el('path', { d: `M${f1(x)} ${y} q3 -2 6 0 q3 2 6 0`, fill: 'none', stroke: 'var(--sup)', 'stroke-width': 1, opacity: .4 })); }
        [-19.6, -18.9, -5.2, -4.4].forEach(x => { for (let k = 0; k < 3; k++) gTerra.appendChild(el('line', { x1: f1(X(x) + k * 2), x2: f1(X(x) + k * 2 + (k - 1) * 2), y1: G.yg, y2: G.yg - 8 - k * 2, stroke: 'color-mix(in srgb, var(--s3) 70%, var(--testo))', 'stroke-width': 1.2, 'stroke-linecap': 'round', opacity: .6 })); });
        torre(0, 0, l.w, l.H, l.stile);
        G.ostacoli = [[-400, 0, -19, 0, 'terra'], [-19, 0, -18, -1.1, 'terra'], [-18, -1.1, -6, -1.1, 'acqua'], [-6, -1.1, -5, 0, 'terra'], [-5, 0, 400, 0, 'terra'], [0, 0, 0, l.H, 'muro'], [0, l.H, l.w, l.H, 'tetto']];
        fettuccia(l.xB, l.xA, '20 m');
        [['A', l.xA], ['B', l.xB]].forEach(([t, x]) => {
          gNastro.appendChild(el('line', { x1: X(x), x2: X(x), y1: G.yg + 2, y2: G.yg - 9, stroke: 'var(--testo2)', 'stroke-width': 1.6 }));
          gNastro.appendChild(el('path', { d: `M${f1(X(x))} ${G.yg - 9} l8 3 l-8 3 Z`, fill: t === 'A' ? 'var(--s1)' : 'var(--s4)' }));
          gNastro.appendChild(el('text', { x: X(x) + (t === 'A' ? 4 : -4), y: G.yg + 26, 'text-anchor': t === 'A' ? 'start' : 'end', fill: t === 'A' ? 'var(--s1)' : 'var(--s4)', class: 'tr-testo-svg', style: 'font: 800 12px var(--font)' }, t));
        });
        /* la distanza che non si può misurare */
        G.incognitaX = el('g'); gNastro.appendChild(G.incognitaX);
        G.incognitaX.appendChild(el('line', { x1: X(l.xA) + 4, x2: X(0) - 2, y1: G.yg - 22, y2: G.yg - 22, stroke: 'var(--testo2)', 'stroke-width': 1.1, 'stroke-dasharray': '3 3' }));
        pillola(G.incognitaX, (X(l.xA) + X(0)) / 2, G.yg - 22, 'x = ?', 'var(--sup)', 'var(--testo)');
      }

      /* ================= stato ================= */
      const completati = ctx.stato().livelli;
      let livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      let ang = 0, pX = 0, stazione = 'A', letture = { A: null, B: null }, bandaL = [0, 0];
      let vinto = false, animando = false, controllato = false, evidenzia = null, presa = null, fase = 0;
      let raf = 0, rafFx = 0, fermaAnim = null, effetti = [], chiaveFormula = '';
      const timers = [];
      const dopo = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
      const L = () => LIVELLI[livello];
      const faro = () => L().scena === 'faro';
      const ETICHETTE = [['40 m', 'x'], ['35 m', 'h − 1,6'], ['d', '25,6 − 1,6'], ['40 m', 'h + 5 − 1,6'], ['d', '24,5 + 1,6'], ['x', 'h − 1,6']];

      /* occhi, piedi e bersaglio, in metri */
      const occhio = () => faro() ? { x: 0, y: L().g + OCCHI } : { x: pX, y: OCCHI };
      const piedi = () => faro() ? { x: -.1, y: L().g } : { x: pX - .1, y: 0 };
      const bersaglio = () => faro() ? { x: L().D, y: 0 } : { x: 0, y: (L().base || 0) + L().H };
      function angoloVero() { const E = occhio(), T = bersaglio(); return Math.atan2(T.y - E.y, T.x - E.x) / RAD; }
      /* lo strumento legge al grado; al faro legge la depressione, cioè l'angolo verso il basso */
      const lettura = () => L().fisso || Math.round(faro() ? -ang : ang);
      const letturaGiusta = () => L().fisso || Math.round(faro() ? -angoloVero() : angoloVero());
      const sullaCima = () => L().fisso ? Math.abs(angoloVero() - L().fisso) < .5 : lettura() === letturaGiusta();
      function misure() { return L().scena === 'fiume' ? { rA: letture.A ? letture.A.r : null, rB: letture.B ? letture.B.r : null } : { r: lettura() }; }
      function misureGiuste() {
        const l = L();
        if (l.scena === 'fiume') return { rA: Math.round(Math.atan((l.H - OCCHI) / -l.xA) / RAD), rB: Math.round(Math.atan((l.H - OCCHI) / -l.xB) / RAD) };
        return { r: letturaGiusta() };
      }
      const mireGiuste = () => L().scena === 'fiume' ? !!(letture.A && letture.A.ok && letture.B && letture.B.ok) : sullaCima();

      /* la banda d'errore: dove può cadere il risultato se l'angolo vero sta mezzo grado sopra o sotto la lettura */
      function calcolaBanda() {
        const l = L();
        if (l.banda) return [l.giusto + l.banda[0], l.giusto + l.banda[1]];
        let lo = Infinity, hi = -Infinity;
        const prova = v => { if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } };
        if (l.scena === 'fiume') {
          const a0 = Math.atan((l.H - OCCHI) / -l.xA) / RAD, b0 = Math.atan((l.H - OCCHI) / -l.xB) / RAD;
          for (let u = -.5; u <= .5001; u += .05) for (let v = -.5; v <= .5001; v += .05) prova(l.calcola({ rA: a0 + u, rB: b0 + v }));
        } else {
          const a0 = Math.abs(angoloVero());
          for (let u = -.5; u <= .5001; u += .02) prova(l.calcola({ r: a0 + u }));
        }
        return [lo, hi];
      }

      /* dove finisce la linea di mira: il primo ostacolo lungo il raggio */
      function colpo(E, a) {
        const dx = cs(a), dy = sn(a);
        let best = { t: 500, cosa: 'cielo' };
        for (const [x1, y1, x2, y2, cosa] of G.ostacoli) {
          const ex = x2 - x1, ey = y2 - y1, den = dx * ey - dy * ex;
          if (Math.abs(den) < 1e-12) continue;
          const t = ((x1 - E.x) * ey - (y1 - E.y) * ex) / den, u = ((x1 - E.x) * dy - (y1 - E.y) * dx) / den;
          if (t > .05 && u >= 0 && u <= 1 && t < best.t) best = { t, cosa };
        }
        return { x: E.x + dx * best.t, y: E.y + dy * best.t, cosa: best.cosa };
      }
      function descrivi(hit) {
        const l = L();
        if (sullaCima()) return faro() ? 'sulla barca' : 'sulla cima';
        if (faro()) return hit.x < l.D - 4 && hit.cosa !== 'cielo' ? 'finisce in mare prima della barca' : hit.x > l.D + 4 || hit.cosa === 'cielo' ? 'passa oltre la barca' : 'quasi sulla barca';
        if (hit.cosa === 'muro') return 'colpisce la torre sotto la cima';
        if (hit.cosa === 'terra') return l.scena === 'poggio' ? 'finisce sul poggio' : 'finisce a terra';
        return 'passa sopra la cima';
      }

      /* ================= disegno: mira, persona, lente ================= */
      function disegnaMira() {
        vuota(gMira);
        const l = L(), E = occhio(), hit = colpo(E, ang), sul = sullaCima();
        const ex = X(E.x), ey = Y(E.y), hx = X(hit.x), hy = Y(hit.y), col = sul ? 'var(--ok)' : 'var(--accento)';
        const T = bersaglio(), tx = X(T.x), ty = Y(T.y);
        /* il bersaglio: una stellina che pulsa */
        gMira.appendChild(el('circle', { cx: tx, cy: ty, r: sul ? 9 : 6.5, fill: 'none', stroke: sul ? 'var(--ok)' : 'var(--avviso)', 'stroke-width': 2, class: 'tr-bersaglio' }));
        gMira.appendChild(el('path', { d: `M${f1(tx)} ${f1(ty - 5)} L${f1(tx + 1.3)} ${f1(ty - 1.3)} L${f1(tx + 5)} ${f1(ty)} L${f1(tx + 1.3)} ${f1(ty + 1.3)} L${f1(tx)} ${f1(ty + 5)} L${f1(tx - 1.3)} ${f1(ty + 1.3)} L${f1(tx - 5)} ${f1(ty)} L${f1(tx - 1.3)} ${f1(ty - 1.3)} Z`, fill: sul ? 'var(--ok)' : 'var(--avviso)' }));
        if (!controllato && livello < 2) gMira.appendChild(el('text', { x: tx - 9, y: ty - 9, 'text-anchor': 'end', fill: 'var(--testo2)', class: 'tr-testo-svg', style: 'font: 600 11px var(--font)' }, 'cima'));
        if (!controllato && faro()) gMira.appendChild(el('text', { x: tx, y: ty - 26, 'text-anchor': 'middle', fill: 'var(--testo2)', class: 'tr-testo-svg', style: 'font: 600 11px var(--font)' }, 'barca'));
        /* la linea di mira */
        if (sul) gMira.appendChild(el('line', { x1: ex, y1: ey, x2: hx, y2: hy, stroke: 'var(--ok)', 'stroke-width': 7, 'stroke-linecap': 'round', opacity: .22 }));
        gMira.appendChild(el('line', { x1: ex, y1: ey, x2: hx, y2: hy, stroke: col, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-dasharray': sul ? null : '7 4' }));
        if (hit.cosa !== 'cielo' && !sul) gMira.appendChild(el('circle', { cx: hx, cy: hy, r: 3.6, fill: 'var(--sup)', stroke: col, 'stroke-width': 2 }));
        /* la manopola: si trascina per ruotare la mira attorno agli occhi */
        if (!l.fisso && !vinto) {
          const len = Math.hypot(hx - ex, hy - ey) || 1, k = Math.min(112, len * .72), kx = ex + (hx - ex) / len * k, ky = ey + (hy - ey) / len * k;
          const nx = -(hy - ey) / len, ny = (hx - ex) / len;
          const m = el('g', { filter: 'url(#tr-ombra)' }); gMira.appendChild(m);
          m.appendChild(el('circle', { cx: kx, cy: ky, r: 11, fill: 'var(--sup)', stroke: col, 'stroke-width': 2.5 }));
          m.appendChild(el('path', { d: `M${f1(kx + nx * 4.5 - (hx - ex) / len * 2.5)} ${f1(ky + ny * 4.5 - (hy - ey) / len * 2.5)} L${f1(kx + nx * 7.5)} ${f1(ky + ny * 7.5)} L${f1(kx + nx * 4.5 + (hx - ex) / len * 2.5)} ${f1(ky + ny * 4.5 + (hy - ey) / len * 2.5)} M${f1(kx - nx * 4.5 - (hx - ex) / len * 2.5)} ${f1(ky - ny * 4.5 - (hy - ey) / len * 2.5)} L${f1(kx - nx * 7.5)} ${f1(ky - ny * 7.5)} L${f1(kx - nx * 4.5 + (hx - ex) / len * 2.5)} ${f1(ky - ny * 4.5 + (hy - ey) / len * 2.5)}`, fill: 'none', stroke: col, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
        }
        return hit;
      }

      function disegnaPersona() {
        vuota(gPersona);
        const l = L(), E = occhio(), P = piedi(), s = G.s;
        const ex = X(E.x), ey = Y(E.y), fx = X(P.x), fy = Y(P.y), h = fy - ey, sw = Math.max(1.6, .17 * s), osc = Math.sin(fase) * .5;
        gPersona.appendChild(el('ellipse', { cx: fx, cy: fy - h * .5, rx: Math.max(8, h * .6), ry: Math.max(10, h * .85), fill: 'var(--s4)', opacity: .12 }));
        const ay = fy - h * .52;
        gPersona.appendChild(el('path', { d: `M${f1(fx)} ${f1(ay)} L${f1(fx - h * .12 + osc * h * .25)} ${f1(fy)} M${f1(fx)} ${f1(ay)} L${f1(fx + h * .12 - osc * h * .25)} ${f1(fy)}`, stroke: '#4a4560', 'stroke-width': sw, 'stroke-linecap': 'round', fill: 'none' }));
        gPersona.appendChild(el('line', { x1: fx, y1: ay, x2: fx + .6, y2: fy - h * .86, stroke: 'var(--s4)', 'stroke-width': sw * 1.6, 'stroke-linecap': 'round' }));
        gPersona.appendChild(el('circle', { cx: ex - Math.max(1.2, .09 * s), cy: ey, r: Math.max(2, .14 * s), fill: '#e5b08a' }));
        gPersona.appendChild(el('line', { x1: ex, y1: ey, x2: ex + cs(ang) * Math.max(5, .45 * s), y2: ey - sn(ang) * Math.max(5, .45 * s), stroke: 'var(--testo2)', 'stroke-width': Math.max(1.4, .08 * s), 'stroke-linecap': 'round' }));
        if (l.fisso && !vinto) {                                    /* maniglia per camminare */
          const g = el('g', { opacity: .95 }); gPersona.appendChild(g);
          g.appendChild(el('rect', { x: fx - 19, y: G.yg + 7, width: 38, height: 20, rx: 10, fill: 'var(--s4)', filter: 'url(#tr-ombra)' }));
          g.appendChild(el('path', { d: `M${f1(fx - 12)} ${G.yg + 17} l5 -4.5 v9 Z M${f1(fx + 12)} ${G.yg + 17} l-5 -4.5 v9 Z`, fill: '#fff' }));
        }
      }

      /* la lente: il personaggio visto da vicino, con il clinometro e i suoi 1,6 m */
      function disegnaLente() {
        vuota(gLente);
        const l = L(), [LX, LY] = l.lente, LR = 45, z = 34, E = occhio(), P = piedi(), sul = sullaCima();
        const cxW = P.x + .15, cyW = P.y + 1.02;
        const lx = x => LX + z * (x - cxW), ly = y => LY - z * (y - cyW);
        const pt = (x, y) => f1(lx(x)) + ' ' + f1(ly(y));
        /* il filo che collega la lente al personaggio nella scena */
        const hx = X(P.x + .05), hy = (Y(P.y) + Y(E.y)) / 2, dx = hx - LX, dy = hy - LY, dd = Math.hypot(dx, dy) || 1, rp = Math.max(8, (Y(P.y) - Y(E.y)) * .9);
        gLente.appendChild(el('line', { x1: f1(LX + dx / dd * LR), y1: f1(LY + dy / dd * LR), x2: f1(hx - dx / dd * rp), y2: f1(hy - dy / dd * rp), stroke: 'var(--testo2)', 'stroke-width': 1.2, 'stroke-dasharray': '2 3', opacity: .8 }));
        gLente.appendChild(el('circle', { cx: f1(hx), cy: f1(hy), r: f1(rp), fill: 'none', stroke: 'var(--testo2)', 'stroke-width': 1.2, 'stroke-dasharray': '2 3', opacity: .8 }));
        cerchioClip.setAttribute('cx', LX); cerchioClip.setAttribute('cy', LY);
        const vetro = el('g'); gLente.appendChild(vetro);
        vetro.appendChild(el('circle', { cx: LX, cy: LY, r: LR, fill: 'var(--sup)', filter: 'url(#tr-ombra)' }));
        const g = el('g', { 'clip-path': 'url(#tr-taglio-lente)' }); vetro.appendChild(g);
        g.appendChild(el('rect', { x: LX - LR, y: LY - LR, width: 2 * LR, height: 2 * LR, fill: 'url(#tr-cielo)' }));
        const fy = ly(P.y);
        if (faro()) {
          g.appendChild(el('rect', { x: LX - LR, y: fy, width: lx(-1) - (LX - LR), height: LR * 2, style: 'fill: color-mix(in srgb, var(--testo) 8%, var(--sup))' }));
          g.appendChild(el('rect', { x: LX - LR, y: fy, width: lx(.5) - (LX - LR), height: .4 * z, fill: 'var(--testo2)' }));
        } else {
          g.appendChild(el('rect', { x: LX - LR, y: fy, width: 2 * LR, height: LR * 2, style: 'fill: ' + (l.scena === 'fiume' ? 'var(--tr-prato)' : 'var(--tr-terra)') }));
          g.appendChild(el('rect', { x: LX - LR, y: fy, width: 2 * LR, height: 1.5, fill: 'var(--testo)', opacity: .15 }));
        }
        /* il personaggio */
        const osc = Math.sin(fase) * .12, pelle = '#e5b08a', giacca = 'var(--s4)', panta = '#4a4560';
        const anca = [P.x + .02, P.y + .92], spalla = [P.x + .04, P.y + 1.42];
        g.appendChild(el('path', { d: `M${pt(...anca)} L${pt(P.x - .1 + osc, P.y + .06)} M${pt(...anca)} L${pt(P.x + .13 - osc, P.y + .06)}`, stroke: panta, 'stroke-width': .15 * z, 'stroke-linecap': 'round', fill: 'none' }));
        [[P.x - .06 + osc, P.y + .03], [P.x + .17 - osc, P.y + .03]].forEach(([x, y]) => g.appendChild(el('ellipse', { cx: f1(lx(x)), cy: f1(ly(y)), rx: .12 * z, ry: .055 * z, fill: '#2f2b3a' })));
        g.appendChild(el('line', { x1: f1(lx(anca[0])), y1: f1(ly(anca[1])), x2: f1(lx(spalla[0])), y2: f1(ly(spalla[1])), stroke: giacca, 'stroke-width': .36 * z, 'stroke-linecap': 'round' }));
        const tc = [E.x - .09, E.y + .02];
        g.appendChild(el('circle', { cx: f1(lx(tc[0])), cy: f1(ly(tc[1])), r: .125 * z, fill: pelle }));
        g.appendChild(el('path', { d: `M${pt(tc[0] - .13, tc[1] - .01)} A${.13 * z} ${.13 * z} 0 0 1 ${pt(tc[0] + .08, tc[1] + .11)} L${pt(tc[0] - .02, tc[1] + .04)} Z`, fill: '#4a3426' }));
        g.appendChild(el('circle', { cx: f1(lx(E.x - .015)), cy: f1(ly(E.y)), r: 1.7, fill: '#1d1b24' }));
        /* il clinometro: cannocchiale, goniometro e filo a piombo (il filo resta sempre verticale) */
        const d = [cs(ang), sn(ang)], n = [sn(ang), -cs(ang)];
        const C = [E.x + d[0] * .34 + n[0] * .035, E.y + d[1] * .34 + n[1] * .035], r = .21;
        let arco = '';
        for (let i = 0; i <= 18; i++) { const t = i / 18 * Math.PI, x = C[0] + (-d[0] * Math.cos(t) + n[0] * Math.sin(t)) * r, y = C[1] + (-d[1] * Math.cos(t) + n[1] * Math.sin(t)) * r; arco += (i ? ' L' : 'M') + pt(x, y); }
        g.appendChild(el('path', { d: arco + ' Z', fill: 'var(--sup)', stroke: 'var(--testo2)', 'stroke-width': 1.1 }));
        for (let i = 1; i < 9; i++) { const t = i / 9 * Math.PI, u = [-d[0] * Math.cos(t) + n[0] * Math.sin(t), -d[1] * Math.cos(t) + n[1] * Math.sin(t)];
          g.appendChild(el('line', { x1: f1(lx(C[0] + u[0] * r * .74)), y1: f1(ly(C[1] + u[1] * r * .74)), x2: f1(lx(C[0] + u[0] * r)), y2: f1(ly(C[1] + u[1] * r)), stroke: 'var(--testo2)', 'stroke-width': .8 })); }
        g.appendChild(el('line', { x1: f1(lx(C[0])), y1: f1(ly(C[1])), x2: f1(lx(C[0])), y2: f1(ly(C[1] - .27)), stroke: 'var(--no)', 'stroke-width': 1.2 }));
        g.appendChild(el('circle', { cx: f1(lx(C[0])), cy: f1(ly(C[1] - .27)), r: 2.4, fill: 'var(--no)' }));
        g.appendChild(el('line', { x1: f1(lx(E.x + d[0] * .03)), y1: f1(ly(E.y + d[1] * .03)), x2: f1(lx(E.x + d[0] * .62)), y2: f1(ly(E.y + d[1] * .62)), stroke: 'color-mix(in srgb, var(--testo2) 75%, var(--sup))', 'stroke-width': .07 * z, 'stroke-linecap': 'round' }));
        const presaMano = [E.x + d[0] * .5 + n[0] * .05, E.y + d[1] * .5 + n[1] * .05];
        const gomito = [(spalla[0] + presaMano[0]) / 2 + .02, Math.min(spalla[1], presaMano[1]) - .12];
        g.appendChild(el('path', { d: `M${pt(...spalla)} L${pt(...gomito)} L${pt(...presaMano)}`, stroke: giacca, 'stroke-width': .1 * z, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' }));
        g.appendChild(el('circle', { cx: f1(lx(presaMano[0])), cy: f1(ly(presaMano[1])), r: .055 * z, fill: pelle }));
        if (faro()) {                                               /* la ringhiera della galleria, davanti */
          g.appendChild(el('line', { x1: LX - LR, x2: lx(.5), y1: f1(ly(P.y + 1)), y2: f1(ly(P.y + 1)), stroke: 'var(--testo2)', 'stroke-width': 2.2 }));
          [.45, -.7].forEach(x => g.appendChild(el('line', { x1: f1(lx(x)), x2: f1(lx(x)), y1: fy, y2: f1(ly(P.y + 1)), stroke: 'var(--testo2)', 'stroke-width': 1.6 })));
        }
        /* la mira dentro la lente */
        g.appendChild(el('line', { x1: f1(lx(E.x + d[0] * .64)), y1: f1(ly(E.y + d[1] * .64)), x2: f1(lx(E.x + d[0] * 4)), y2: f1(ly(E.y + d[1] * 4)), stroke: sul ? 'var(--ok)' : 'var(--accento)', 'stroke-width': 2, 'stroke-dasharray': sul ? null : '5 4' }));
        /* i suoi 1,6 m */
        const rosso = evidenzia === 'occhi', cq = rosso ? 'var(--no)' : 'var(--s3)', bx = lx(P.x - .45);
        const q = el('g', { class: rosso ? 'tr-allarme' : null }); g.appendChild(q);
        q.appendChild(el('line', { x1: f1(bx), x2: f1(bx), y1: f1(fy), y2: f1(ly(E.y)), stroke: cq, 'stroke-width': 2 }));
        [fy, ly(E.y)].forEach(y => q.appendChild(el('line', { x1: f1(bx - 4), x2: f1(bx + 4), y1: f1(y), y2: f1(y), stroke: cq, 'stroke-width': 2 })));
        q.appendChild(el('line', { x1: f1(bx), x2: f1(lx(E.x - .2)), y1: f1(ly(E.y)), y2: f1(ly(E.y)), stroke: cq, 'stroke-width': 1, 'stroke-dasharray': '2 2' }));
        const tyq = (fy + ly(E.y)) / 2;
        q.appendChild(el('text', { x: f1(bx - 6), y: f1(tyq), transform: `rotate(-90 ${f1(bx - 6)} ${f1(tyq)})`, 'text-anchor': 'middle', fill: cq, class: 'tr-testo-svg', style: 'font: 700 11px var(--font)' }, '1,6 m'));
        vetro.appendChild(el('circle', { cx: LX, cy: LY, r: LR, fill: 'none', stroke: 'var(--testo2)', 'stroke-width': 3 }));
        vetro.appendChild(el('circle', { cx: LX, cy: LY, r: LR - 2.6, fill: 'none', stroke: 'var(--sup)', 'stroke-width': 1, opacity: .6 }));
        /* la lettura dello strumento */
        const nome = faro() ? 'δ' : l.scena === 'fiume' && stazione === 'B' ? 'β' : 'α';
        pillola(gLente, LX, LY + LR + 3, nome + ' = ' + lettura() + '°' + (l.fisso ? ' fisso' : ''), sul ? 'var(--ok)' : 'var(--s1)', '#fff', null, true);
      }

      /* ================= formula ================= */
      function formula(hit) {
        const l = L(), m = misure(), nome = faro() ? '\\delta' : l.scena === 'fiume' && stazione === 'B' ? '\\beta' : '\\alpha', descr = descrivi(hit), sul = sullaCima();
        const chiave = [livello, lettura(), sul, descr, JSON.stringify(letture), vinto, stazione, Math.round(angoloVero())].join('|');
        if (chiave === chiaveFormula) return;
        chiaveFormula = chiave;
        const T = s => ctx.tex(s);
        const riga = (et, corpo, cls) => '<div class="tr-riga' + (cls ? ' ' + cls : '') + '"><span class="tr-et">' + et + '</span><span class="tr-tex">' + corpo + '</span></div>';
        const stato = (t, ok) => '<span class="tr-stato' + (ok ? ' ok' : '') + '">' + t + '</span>';
        let h = '';
        if (l.scena === 'fiume') {
          [['A', '\\alpha'], ['B', '\\beta']].forEach(([k, nm]) => {
            const x = letture[k];
            h += riga('da ' + k, x ? T(nm + ' = ' + x.r + '^\\circ') + stato(x.ok ? 'sulla cima' : stazione === k ? descr : 'la mira non era sulla cima', x.ok) : stato('non ancora misurato'));
          });
        } else if (l.fisso) {
          h += riga('strumento', T('\\alpha = 30^\\circ') + stato('bloccato'));
          h += riga('da qui', stato('la cima si vede a ' + Math.round(angoloVero()) + '°', sul));
        } else h += riga('strumento', T(nome + ' = ' + lettura() + '^\\circ') + stato(descr, sul));
        h += riga('triangolo', T('\\tan' + (faro() ? '\\delta' : '\\alpha') + ' = \\dfrac{\\text{cateto opposto}}{\\text{cateto adiacente}}'));
        h += riga('qui', [].concat(l.qui(m)).map(T).join(''));
        if (vinto) {
          h += riga('la regola', T(l.regola), 'ponte');
          h += riga('i conti', [].concat(l.conti(misureGiuste())).map(T).join(''), 'ponte');
        }
        formEl.innerHTML = h;
      }

      function comandi() {
        const l = L(), ferma = vinto || animando;
        b.meno.disabled = ferma; b.piu.disabled = ferma; b.stazione.disabled = ferma;
        b.controlla.disabled = vinto || animando; valEl.disabled = vinto;
        if (l.scena === 'fiume') b.stazione.textContent = stazione === 'A' ? '◀ 20 m indietro' : 'Torna in A ▶';
      }

      function aggiorna() {
        if (L().scena === 'fiume' && !animando) letture[stazione] = { r: lettura(), ok: sullaCima() };
        disegnaPersona();
        const hit = disegnaMira();
        disegnaLente();
        formula(hit);
        comandi();
      }

      /* ================= animazioni ================= */
      function anima(dur, passo, poi) {                          /* rAF, con la riserva a tempo se rAF è strozzato */
        if (fermaAnim) fermaAnim();
        animando = true;
        const t0 = performance.now();
        let chiuso = false;
        const fine = () => { if (chiuso) return; chiuso = true; cancelAnimationFrame(raf); raf = 0; fermaAnim = null; passo(1); animando = false; if (poi) poi(); };
        fermaAnim = () => { chiuso = true; cancelAnimationFrame(raf); raf = 0; fermaAnim = null; animando = false; };
        const frame = tt => { if (chiuso) return; const u = Math.min(1, (tt - t0) / dur); passo(dolce(u)); if (u < 1) raf = requestAnimationFrame(frame); else fine(); };
        raf = requestAnimationFrame(frame);
        dopo(fine, dur + 250);
      }
      function tick(t) {
        effetti = effetti.filter(e => { const u = (t - e.t0) / e.dur; if (u < 0) return true; e.draw(Math.min(1, u)); if (u >= 1) { e.fine(); return false; } return true; });
        rafFx = effetti.length ? requestAnimationFrame(tick) : 0;
      }
      function effetto(e) { e.t0 = e.t0 || performance.now(); effetti.push(e); if (!rafFx) rafFx = requestAnimationFrame(tick); dopo(() => { if (effetti.includes(e)) { effetti = effetti.filter(x => x !== e); e.fine(); } }, (e.t0 - performance.now()) + e.dur + 400); }
      function scintille(cx, cy, ritardo) {
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--avviso)', 'var(--ok)'], t0 = performance.now() + ritardo;
        for (let i = 0; i < 16; i++) {
          const a = i / 16 * Math.PI * 2 + (i % 2 ? .15 : -.1), v = 24 + (i * 7) % 16;
          const c = el('circle', { cx, cy, r: 2.8, fill: COL[i % COL.length], opacity: 0 }); gFx.appendChild(c);
          effetto({ t0, dur: 800, draw: u => { const e = liscia(u); c.setAttribute('cx', f1(cx + Math.cos(a) * v * e)); c.setAttribute('cy', f1(cy + Math.sin(a) * v * e + 16 * u * u)); c.setAttribute('opacity', 1 - u); }, fine: () => c.remove() });
        }
      }
      function festa() {
        const T = bersaglio(), tx = X(T.x), ty = Y(T.y);
        const anello = el('circle', { cx: tx, cy: ty, r: 5, fill: 'none', stroke: 'var(--ok)', 'stroke-width': 3 }); gFx.appendChild(anello);
        effetto({ dur: 650, draw: u => { anello.setAttribute('r', f1(5 + 34 * liscia(u))); anello.setAttribute('opacity', 1 - u); }, fine: () => anello.remove() });
        scintille(tx, ty, 0);
        scintille(morsa(tx - 70, 30, VW - 30), morsa(ty + 26, 30, 200), 170);
        scintille(morsa(tx - 130, 30, VW - 30), morsa(ty - 4, 30, 200), 340);
      }

      /* ================= il controllo, e che cosa mostra la scena ================= */
      const scuoti = n => { n.classList.remove('scuoti'); void n.offsetWidth; n.classList.add('scuoti'); };
      function avvisa(html, tipo) { msg.innerHTML = html; msg.className = 'lab-messaggio' + (tipo ? ' ' + tipo : ''); }
      function pulisciRisposta() { vuota(gRisposta); evidenzia = null; valEl.classList.remove('no'); }

      function mostraTriangolo(segna) {
        vuota(gTriangolo); gTriangolo.classList.remove('via');
        const l = L(), [etA, etO] = ETICHETTE[livello];
        if (G.incognitaX) G.incognitaX.setAttribute('opacity', 0);
        const P = (x, y) => [X(x), Y(y)];
        const tratto = (a, c, col, w, extra) => gTriangolo.appendChild(el('path', Object.assign({ d: `M${f1(a[0])} ${f1(a[1])} L${f1(c[0])} ${f1(c[1])}`, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', fill: 'none', pathLength: 1, class: 'tr-disegna' }, extra || {})));
        const scritta = (x, y, t, col, anchor, cls) => gTriangolo.appendChild(el('text', { x: f1(x), y: f1(y), 'text-anchor': anchor || 'middle', fill: col, class: 'tr-testo-svg tr-appare' + (cls ? ' ' + cls : ''), style: 'font: 700 11.5px var(--font)' }, t));
        /* angolo in e, angolo retto in p */
        function tri(Ew, Pw, Tw, o) {
          const e = P(...Ew), p = P(...Pw), t = P(...Tw);
          gTriangolo.appendChild(el('path', { d: `M${f1(e[0])} ${f1(e[1])} L${f1(p[0])} ${f1(p[1])} L${f1(t[0])} ${f1(t[1])} Z`, fill: o.tinta, 'fill-opacity': .17, class: 'tr-appare' }));
          tratto(e, p, o.colA, 3.2); if (!o.senzaO) tratto(p, t, 'var(--s2)', 3.2); tratto(e, t, 'var(--accento)', 1.6);
          const un = (a, c) => { const dx = c[0] - a[0], dy = c[1] - a[1], dd = Math.hypot(dx, dy) || 1; return [dx / dd, dy / dd]; };
          const u = un(p, e), v = un(p, t), k = 7;
          gTriangolo.appendChild(el('path', { d: `M${f1(p[0] + u[0] * k)} ${f1(p[1] + u[1] * k)} L${f1(p[0] + (u[0] + v[0]) * k)} ${f1(p[1] + (u[1] + v[1]) * k)} L${f1(p[0] + v[0] * k)} ${f1(p[1] + v[1] * k)}`, stroke: 'var(--testo)', 'stroke-width': 1.2, fill: 'none', class: 'tr-appare' }));
          const a1 = Math.atan2(p[1] - e[1], p[0] - e[0]), a2 = Math.atan2(t[1] - e[1], t[0] - e[0]), rr = 21;
          const sweep = ((a2 - a1 + 4 * Math.PI) % (2 * Math.PI)) < Math.PI ? 1 : 0, mid = sweep ? a1 + ((a2 - a1 + 4 * Math.PI) % (2 * Math.PI)) / 2 : a1 - ((a1 - a2 + 4 * Math.PI) % (2 * Math.PI)) / 2;
          gTriangolo.appendChild(el('path', { d: `M${f1(e[0] + rr * Math.cos(a1))} ${f1(e[1] + rr * Math.sin(a1))} A${rr} ${rr} 0 0 ${sweep} ${f1(e[0] + rr * Math.cos(a2))} ${f1(e[1] + rr * Math.sin(a2))}`, stroke: o.colA, 'stroke-width': 2, fill: 'none', class: 'tr-appare' }));
          scritta(e[0] + 32 * Math.cos(mid), e[1] + 32 * Math.sin(mid) + 4, o.etAng, o.colA);
          if (o.etA) scritta((e[0] + p[0]) / 2, (e[1] + p[1]) / 2 + (o.sopraA ? -7 : 15), o.etA, o.colA);
          if (o.etO) scritta(p[0] + (o.destraO ? 7 : -7), (p[1] + t[1]) / 2 + 4, o.etO, 'var(--s2)', o.destraO ? 'start' : 'end');
          return { e, p, t };
        }
        const segOcchi = (x, y0, lato) => {
          const rosso = segna === 'occhi', col = rosso ? 'var(--no)' : 'var(--s3)';
          tratto(P(x, y0), P(x, y0 + OCCHI), col, 4);
          if (lato > 0) scritta(X(x) + 5, Y(y0 + OCCHI) - 9, rosso ? 'mancano 1,6 m' : '1,6 m', col, 'start', rosso ? 'tr-allarme' : null);
          else scritta(X(x) - 7, (Y(y0) + Y(y0 + OCCHI)) / 2 + 4, rosso ? 'mancano 1,6 m' : '1,6 m', col, 'end', rosso ? 'tr-allarme' : null);
        };
        if (l.scena === 'faro') {
          const E = occhio(), B = bersaglio();
          tri([B.x, B.y], [0, 0], [E.x, E.y], { tinta: 'var(--s1)', colA: 'var(--s1)', etA: etA, etO: etO, etAng: 'δ', destraO: true, sopraA: true });
          const e = P(E.x, E.y);
          tratto(e, P(E.x + 24, E.y), 'var(--testo2)', 1.4);
          const a2 = Math.atan2(Y(B.y) - e[1], X(B.x) - e[0]), rr = 30;
          gTriangolo.appendChild(el('path', { d: `M${f1(e[0] + rr)} ${f1(e[1])} A${rr} ${rr} 0 0 1 ${f1(e[0] + rr * Math.cos(a2))} ${f1(e[1] + rr * Math.sin(a2))}`, stroke: 'var(--s1)', 'stroke-width': 2, fill: 'none', class: 'tr-appare' }));
          scritta(e[0] + 40 * Math.cos(a2 / 2), e[1] + 40 * Math.sin(a2 / 2) + 4, 'δ', 'var(--s1)');
          segOcchi(0, l.g, 1);
        } else if (l.scena === 'fiume') {
          tri([l.xB, OCCHI], [0, OCCHI], [0, l.H], { tinta: 'var(--s4)', colA: 'var(--s4)', etAng: 'β', senzaO: true });
          tri([l.xA, OCCHI], [0, OCCHI], [0, l.H], { tinta: 'var(--s1)', colA: 'var(--s1)', etA: etA, etO: etO, etAng: 'α', sopraA: true });
          scritta((X(l.xA) + X(l.xB)) / 2, Y(OCCHI) - 7, '20 m', 'var(--s4)');
          segOcchi(0, 0, -1);
        } else {
          const base = l.base || 0, E = occhio();
          tri([l.cammina ? -l.giusto : E.x, OCCHI], [0, OCCHI], [0, base + l.H], { tinta: 'var(--s1)', colA: 'var(--s1)', etA: etA, etO: etO, etAng: 'α', sopraA: true });
          segOcchi(0, 0, -1);
          if (l.scena === 'poggio') {
            const rosso = segna === 'poggio';
            quota(gTriangolo, l.w + 3, 5, 5 + l.H, 'h', 'var(--s2)', 1);
            if (rosso) { const qq = quota(gTriangolo, l.w + 3, 0, 5, '5 m', 'var(--no)', 1); qq.classList.add('tr-allarme'); }
          }
        }
        void gTriangolo.getBoundingClientRect();
        gTriangolo.classList.add('via');
      }

      function cartiglioSu(ok) {
        const l = L();
        let h = ctx.tex(l.regola);
        if (ok) h += '<span class="ok">' + ctx.tex(l.incognita + ' \\approx ' + numTex(l.calcola(misureGiuste()), 2) + '\\ \\text{m}') + '</span>';
        cartiglio.innerHTML = h; cartiglio.classList.add('su');
      }

      /* il valore scritto dallo studente, messo nella scena */
      function mostraRisposta(v, ok, poi) {
        vuota(gRisposta);
        const l = L(), col = ok ? 'var(--ok)' : 'var(--no)', t = 'tu: ' + virgola(v, 1) + ' m';
        if (l.cammina) {                                            /* il personaggio cammina fin dove dice lo studente */
          const meta = morsa(-v, -74, -3), da = pX, lungo = Math.abs(meta - da);
          const arriva = () => { pX = meta; aggiorna(); const E = occhio(); pillola(gRisposta, X(E.x), Y(E.y) - 22, (v > 74 || v < 3 ? '↔ ' : '') + t, col, '#fff'); if (poi) poi(); };
          if (lungo < .05) { arriva(); return; }
          anima(Math.min(600, 200 + lungo * 14), e => { pX = da + (meta - da) * e; fase = lungo * e * 1.4; aggiorna(); }, () => { fase = 0; arriva(); });
          return;
        }
        if (l.scena === 'faro') {                                    /* una boa alla distanza scritta */
          const x = morsa(v, -1, 79), bx = X(x), by = Y(0), E = occhio();
          gRisposta.appendChild(el('line', { x1: X(E.x), y1: Y(E.y), x2: bx, y2: by - 4, stroke: col, 'stroke-width': 1.6, 'stroke-dasharray': '3 3' }));
          const g = el('g', { class: 'tr-pop' }); gRisposta.appendChild(g);
          g.appendChild(el('path', { d: `M${f1(bx - 5)} ${by + 2} L${f1(bx - 3)} ${by - 8} L${f1(bx + 3)} ${by - 8} L${f1(bx + 5)} ${by + 2} Z`, fill: col }));
          g.appendChild(el('rect', { x: bx - 3.5, y: by - 5, width: 7, height: 2.2, fill: '#fff' }));
          g.appendChild(el('line', { x1: bx, x2: bx, y1: by - 8, y2: by - 15, stroke: col, 'stroke-width': 1.4 }));
          pillola(gRisposta, bx, by - 28, (v > 79 ? '→ ' : v < -1 ? '← ' : '') + t, col, '#fff', bx > VW - 50 ? 'end' : bx < 50 ? 'start' : null);
          if (poi) poi();
          return;
        }
        const yW = (l.incognita === 'x' ? OCCHI : 0) + (l.base || 0) + v, y = Y(yW), yy = morsa(y, 8, G.yg - 1);
        gRisposta.appendChild(el('line', { x1: X(-3), x2: X(l.w + 1.5), y1: f1(yy), y2: f1(yy), stroke: col, 'stroke-width': 2.2, 'stroke-dasharray': '5 3', class: 'tr-pop' }));
        gRisposta.appendChild(el('path', { d: `M${f1(X(-3))} ${f1(yy - 4.5)} l6 4.5 l-6 4.5 Z`, fill: col }));
        /* l'etichetta sta sulla torre, sotto il segno: il cartiglio della formula occupa il cielo al centro */
        const tp = (y < 8 ? '↑ ' : y > G.yg - 1 ? '↓ ' : '') + t, pw = tp.length * 6.4 + 14;
        pillola(gRisposta, Math.min(VW - pw / 2 - 4, Math.max(X(l.w / 2), VW * .74 + pw / 2 + 2)), yy + (yy + 30 > G.yg ? -15 : 15), tp, col, '#fff');
        if (poi) poi();
      }

      function controlla(ev) {
        if (ev) ev.preventDefault();
        if (vinto || animando) return;
        const l = L(), v = leggiNumero(valEl.value);
        if (!isFinite(v)) { avvisa('Scrivi un numero, in metri: per esempio 31,5.', 'no'); scuoti(valEl); return; }
        const m = misure();
        if (l.scena === 'fiume' && (m.rA == null || m.rB == null)) { avvisa('Ti manca la misura da B: fai 20 m indietro e punta di nuovo la cima.', 'no'); return; }
        controllato = true;
        pulisciRisposta();
        const [lo, hi] = bandaL;
        if (v >= lo - .05 && v <= hi + .05) { vittoria(v); return; }
        const err = l.errori(m).find(e => isFinite(e.v) && Math.abs(v - e.v) <= stretta(e.v));
        let testo;
        if (err) {
          testo = err.msg || err.zen;
          if (err.zen) zen(err.zen, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
          evidenzia = err.segna || null;
        } else if (!mireGiuste() && Math.abs(v - l.calcola(m)) <= stretta(v)) {
          if (l.scena === 'fiume') { const k = letture.A.ok ? 'B' : 'A'; testo = 'Con i tuoi due angoli i conti tornano, ma da ' + k + ' la mira non era sulla cima. Torna in ' + k + ', punta meglio e rifai il conto.'; }
          else testo = 'Con ' + m.r + '° i conti tornano, ma la mira non era ' + (faro() ? 'sulla barca' : 'sulla cima') + ': guarda dove finisce la linea. Punta meglio e rifai il conto.';
        } else if (v <= 0) testo = 'Non torna: ' + (l.incognita === 'd' ? 'una distanza' : 'un\'altezza') + ' negativa o nulla non esiste. Controlla anche che la calcolatrice sia in gradi.';
        else if (l.cammina) testo = 'Non torna: a quella distanza la mira a 30° ' + (v > hi ? 'passa sopra la cima.' : 'colpisce la torre sotto la cima.');
        else if (faro()) testo = 'Non torna: la tua boa è ' + (v < lo ? 'più vicina' : 'più lontana') + ' della barca.';
        else testo = 'Non torna: il tuo segno sulla torre sta ' + (v < lo ? 'sotto' : 'sopra') + ' la cima.';
        avvisa(testo, 'no');
        valEl.classList.add('no'); scuoti(valEl);
        mostraTriangolo(evidenzia); cartiglioSu(false);
        mostraRisposta(v, false);
        aggiorna();
      }

      function vittoria(v) {
        const l = L();
        vinto = true; evidenzia = null;
        ctx.completato(livello); pillole();
        valEl.classList.remove('no'); valEl.classList.add('ok');
        const [lo, hi] = bandaL, fra = 'va bene tutto fra ' + virgola(lo, 1) + ' e ' + virgola(hi, 1) + ' m';
        const tol = l.banda ? 'Qui l\'angolo è esatto e conta solo come arrotondi i conti: ' + fra + '.'
          : l.scena === 'fiume' ? 'Con due angoli letti al grado gli errori si sommano: ' + fra + '.'
          : 'Lo strumento legge al grado, e mezzo grado in più o in meno sposta il risultato: ' + fra + '.';
        const vt = virgola(v, Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? 1 : 2);
        avvisa('<span class="vinto">Giusto: ' + vt + ' m.</span> ' + tol, 'ok');
        b.ric.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        b.ric.classList.add('primario');
        mostraTriangolo(null); cartiglioSu(true);
        aggiorna();
        mostraRisposta(v, true, () => { festa(); zen(l.vittoria, { espressione: 'orgoglioso', durata: 10000 }); });
      }

      /* ================= comandi ================= */
      function imposta(a) {
        const l = L();
        if (l.fisso) return;
        ang = faro() ? morsa(a, -70, 0) : morsa(a, 0, 75);
        dopoMossa();
      }
      function cammina(x) { fase += Math.abs(x - pX) * 1.4; pX = morsa(x, -72, -8); dopoMossa(); }
      function dopoMossa() { if (controllato && !vinto) pulisciRisposta(); aggiorna(); }

      function puntoSvg(ev) {
        const r = svg.getBoundingClientRect();
        if (!r.width) return null;
        return { x: (ev.clientX - r.left) * VW / r.width, y: (ev.clientY - r.top) * VH / r.height };
      }
      const angoloVerso = p => { const E = occhio(); return Math.atan2(Y(E.y) - p.y, p.x - X(E.x)) / RAD; };
      function giu(ev) {
        if (animando || vinto) return;
        const p = puntoSvg(ev); if (!p) return;
        const E = occhio();
        if (L().fisso) presa = { tipo: 'passi', x0: p.x, p0: pX };
        else { if (Math.hypot(p.x - X(E.x), p.y - Y(E.y)) < 6) return; presa = { tipo: 'mira', a0: ang, g0: angoloVerso(p) }; }
        svg.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!presa || animando) return;
        const p = puntoSvg(ev); if (!p) return;
        if (presa.tipo === 'passi') cammina(presa.p0 + (p.x - presa.x0) / G.s);
        else {
          let dg = angoloVerso(p) - presa.g0;
          if (dg > 180) dg -= 360; if (dg < -180) dg += 360;
          imposta(presa.a0 + dg);
        }
        ev.preventDefault();
      }
      function molla() { if (!presa) return; presa = null; svg.classList.remove('presa'); }

      function cambiaStazione() {
        const l = L();
        if (animando || vinto || l.scena !== 'fiume') return;
        const verso = stazione === 'A' ? 'B' : 'A', da = pX, a = verso === 'A' ? l.xA : l.xB;
        if (controllato) pulisciRisposta();
        anima(600, e => { pX = da + (a - da) * e; fase = 20 * e * 1.4; aggiorna(); }, () => { fase = 0; pX = a; stazione = verso; aggiorna(); });
      }

      /* ================= livelli ================= */
      function pillole() {
        vuota(pillEl);
        const max = completati.length ? Math.max(...completati) : -1;
        LIVELLI.forEach((_, i) => {
          const bt = document.createElement('button');
          bt.type = 'button'; bt.className = 'pill' + (completati.includes(i) ? ' fatto' : '') + (i === livello ? ' qui' : '');
          bt.textContent = String(i + 1); bt.title = 'Livello ' + (i + 1);
          bt.disabled = i > max + 1;
          bt.addEventListener('click', () => { if (i !== livello || vinto) avviaLivello(i); });
          pillEl.appendChild(bt);
        });
      }

      function avviaLivello(n) {
        if (fermaAnim) fermaAnim();
        cancelAnimationFrame(rafFx); rafFx = 0; effetti.forEach(e => e.fine()); effetti = []; vuota(gFx);
        livello = n;
        const l = L(), [xMin, xMax, yg, yTop] = l.vista;
        const s = Math.min(VW / (xMax - xMin), (yg - 18) / yTop);
        G = { s, yg, ox: -xMin * s + (VW - s * (xMax - xMin)) / 2, ostacoli: [], incognitaX: null };
        [gSfondo, gTerra, gTorre, gNastro, gTriangolo, gRisposta, gMira, gPersona, gLente].forEach(vuota);
        gTriangolo.classList.remove('via');
        astro.setAttribute('transform', `translate(${l.astro[0]} ${l.astro[1]})`);
        if (l.scena === 'piazza') { scenaPiazza(l); if (!l.cammina) fettuccia(-l.d, 0, l.d + ' m'); }
        else if (l.scena === 'poggio') scenaPoggio(l);
        else if (l.scena === 'faro') scenaFaro(l);
        else scenaFiume(l);
        pX = l.scena === 'fiume' ? l.xA : faro() ? 0 : -l.d;
        stazione = 'A'; letture = { A: null, B: null };
        vinto = false; controllato = false; evidenzia = null; presa = null; fase = 0; chiaveFormula = '';
        ang = l.fisso || 0;
        bandaL = calcolaBanda();
        testoEl.innerHTML = ctx.md(l.testo);
        aiutoEl.hidden = true; aiutoEl.textContent = l.aiuto;
        etR.innerHTML = ctx.tex(l.incognita + ' =');
        notaEl.textContent = l.nota;
        valEl.value = ''; valEl.className = 'tr-valore'; valEl.disabled = false;
        cartiglio.classList.remove('su'); cartiglio.innerHTML = '';
        avvisa('');
        b.ric.textContent = 'Ricomincia'; b.ric.classList.remove('primario');
        b.stazione.hidden = l.scena !== 'fiume';
        if (l.fisso) { b.meno.textContent = '◀ 0,5 m'; b.piu.textContent = '0,5 m ▶'; b.meno.setAttribute('aria-label', 'Indietro di mezzo metro'); b.piu.setAttribute('aria-label', 'Avanti di mezzo metro'); }
        else { const nm = faro() ? 'δ' : 'α'; b.meno.textContent = nm + ' − 0,1°'; b.piu.textContent = nm + ' + 0,1°'; b.meno.setAttribute('aria-label', 'Angolo meno un decimo di grado'); b.piu.setAttribute('aria-label', 'Angolo più un decimo di grado'); }
        svg.classList.toggle('passi', !!l.fisso);
        livEl.textContent = 'Livello ' + (n + 1) + ' di ' + LIVELLI.length;
        pillole();
        delete radice.dataset.zenone;
        if (l.fisso) aggiorna();
        else anima(480, e => { ang = l.partenza * e; aggiorna(); }, () => { ang = l.partenza; aggiorna(); });
      }

      /* ================= ascoltatori ================= */
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);
      svg.addEventListener('keydown', ev => {
        if (animando || vinto) return;
        const l = L(), k = ev.key;
        if (l.fisso) { if (k === 'ArrowLeft') cammina(pX - .5); else if (k === 'ArrowRight') cammina(pX + .5); else return; }
        else if (k === 'ArrowUp' || k === 'ArrowRight') imposta(ang + .1);
        else if (k === 'ArrowDown' || k === 'ArrowLeft') imposta(ang - .1);
        else return;
        ev.preventDefault();
      });
      b.meno.addEventListener('click', () => { if (animando || vinto) return; if (L().fisso) cammina(pX - .5); else imposta(ang + (faro() ? .1 : -.1)); });
      b.piu.addEventListener('click', () => { if (animando || vinto) return; if (L().fisso) cammina(pX + .5); else imposta(ang + (faro() ? -.1 : .1)); });
      b.stazione.addEventListener('click', cambiaStazione);
      rispEl.addEventListener('submit', controlla);
      valEl.addEventListener('input', () => valEl.classList.remove('no'));
      b.ric.addEventListener('click', () => avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello));
      b.aiuto.addEventListener('click', () => { aiutoEl.hidden = !aiutoEl.hidden; });

      avviaLivello(livello);

      return function smonta() {
        if (fermaAnim) fermaAnim();
        cancelAnimationFrame(raf); cancelAnimationFrame(rafFx);
        effetti = [];
        timers.forEach(clearTimeout);
        window.removeEventListener('pointermove', muovi, { passive: false });
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
