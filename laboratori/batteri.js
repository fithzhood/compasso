/* Laboratorio «La provetta» — la crescita esponenziale N(t) = N₀·bᵗ vista come colonia di batteri.
   Una provetta che si riempie (o si svuota), un orologio che scandisce i passi, un grafico che si
   traccia in tempo reale. Ogni livello chiede prima una previsione: il tempo si muove solo dopo.
   Contratto e regole: SCHEMA-LAB.md — modello di stile: laboratori/bilancia.js */
(function () {
  const STILE = `
    .lab-batteri { -webkit-user-select: none; user-select: none; }
    .lab-batteri input[type=text] { -webkit-user-select: text; user-select: text; }
    /* --- scena: provetta, orologio, lettura e grafico sono quattro blocchi che adatta() dispone --- */
    .lab-batteri .lab-scena { background: linear-gradient(180deg, var(--sup2), var(--sup)); overflow: hidden; touch-action: manipulation; }
    /* --- pannello --- */
    .lab-batteri .formule { display: flex; flex-direction: column; gap: 1px; text-align: center; }
    .lab-batteri .f-riga { display: flex; flex-wrap: wrap; justify-content: center; column-gap: 1.3em; font-size: clamp(1rem, 2.3cqmin, 1.15rem); }
    .lab-batteri .f-riga > span { white-space: nowrap; }
    .lab-batteri .f-riga.min { font-size: clamp(.86rem, 2cqmin, .98rem); color: var(--testo2); }
    .lab-batteri .f-riga .katex { font-size: 1.1em; }
    .lab-batteri .domanda { padding: 8px 10px; border-radius: 12px; background: var(--accento-tenue); border: 1px solid color-mix(in srgb, var(--accento) 35%, transparent); }
    .lab-batteri .domanda[hidden] { display: none; }
    .lab-batteri .dom-testo { font-size: clamp(.9rem, 2.1cqmin, 1.02rem); font-weight: 600; line-height: 1.45; }
    .lab-batteri .dom-testo b { color: var(--accento-testo); }
    .lab-batteri .dom-riga { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 6px; }
    .lab-batteri .dom-campo { width: 6.6em; min-height: 40px; padding: 8px 11px; border-radius: 10px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo); font: 700 1rem var(--font); font-variant-numeric: tabular-nums; }
    .lab-batteri .dom-campo:disabled { opacity: .5; }
    .lab-batteri .dom-riga[hidden] { display: none; }
    .lab-batteri .dom-unita { font-size: .86rem; color: var(--testo2); }
    .lab-batteri .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-batteri .lab-messaggio .katex { font-size: 1.05em; }
    .lab-batteri .lab-messaggio:empty { display: none; }   /* sul telefono ogni riga conta */
    .lab-batteri.in-libero .lab-messaggio { color: var(--testo2); font-size: clamp(.86rem, 2cqmin, 1rem); }
    .lab-batteri .lab-barra { padding: 0; border: 0; gap: 6px 8px; justify-content: center; }
    .lab-batteri .lab-barra .btn { min-height: clamp(40px, 6cqh, 48px); }
    @container lab (max-width: 420px) { .lab-batteri .lab-barra .btn { padding-left: 11px; padding-right: 11px; } }
    .lab-batteri .btn[disabled] { opacity: .38; cursor: default; }
    .lab-batteri .cursore { flex: 1 1 calc(100% - 64px); display: flex; align-items: center; gap: 10px; font-size: .86rem; color: var(--testo2); }
    .lab-batteri .cursore input[type=range] { flex: 1; min-width: 120px; accent-color: var(--accento); min-height: 36px; }
    .lab-batteri .cursore .val { font-variant-numeric: tabular-nums; font-weight: 700; color: var(--testo); min-width: 6.2em; text-align: right; }
    .lab-batteri .cursore.spento { opacity: .38; }
    .lab-batteri .lab-parametri { grid-template-columns: repeat(3, 1fr); max-width: 560px; }
    @container lab (max-width: 420px) { .lab-batteri .lab-parametri { grid-template-columns: 1fr 1fr; } }
    @container lab (min-aspect-ratio: 5 / 4) { .lab-batteri .lab-parametri { grid-template-columns: 1fr 1fr; } }
    .lab-batteri .lab-param .nome { min-width: 0; }
    .lab-batteri .lab-param output { min-width: 2.8em; }
    .lab-batteri .vinto { display: inline-block; animation: lab-batteri-pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-batteri-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    /* --- disegno (le dimensioni dei testi le regola adatta() con le variabili, così restano leggibili) --- */
    .lab-batteri .vetro-fondo { fill: var(--sup2); }
    .lab-batteri .vetro { fill: none; stroke: var(--bordo2); stroke-width: 2.6; stroke-linejoin: round; }
    .lab-batteri .tappo { fill: var(--sup2); stroke: var(--bordo2); stroke-width: 2.2; }
    .lab-batteri .riflesso { fill: #fff; opacity: .22; }
    .lab-batteri .colonia rect { fill: var(--s3); }
    .lab-batteri .colonia circle { fill: var(--s3); }
    .lab-batteri .colonia.morte rect { fill: var(--s2); }
    .lab-batteri .colonia.morte circle { fill: var(--s2); }
    .lab-batteri .pelo { stroke: var(--s3); stroke-width: 2; opacity: .8; }
    .lab-batteri .pelo.morte { stroke: var(--s2); }
    .lab-batteri .tacca-l { stroke: var(--testo3); stroke-width: 1.4; stroke-dasharray: 4 3; }
    .lab-batteri .tacca-t { font: 600 var(--fs-tacca, 13px) var(--font); fill: var(--testo2); }
    .lab-batteri .quadrante { fill: var(--sup); stroke: var(--bordo2); stroke-width: 2; }
    .lab-batteri .tacchetta { stroke: var(--testo3); stroke-width: 1.3; stroke-linecap: round; }
    .lab-batteri .tacchetta.grossa { stroke: var(--testo2); stroke-width: 2.6; }
    .lab-batteri .lancetta { stroke: var(--accento); stroke-width: 3.4; stroke-linecap: round; }
    .lab-batteri .perno { fill: var(--accento); }
    .lab-batteri .settore { fill: var(--accento); opacity: .15; }
    .lab-batteri .num-or { font: 600 var(--fs-or, 12px) var(--font); fill: var(--testo3); }
    .lab-batteri .let-n { font: 700 34px var(--font); fill: var(--testo); }
    .lab-batteri .let-et { font: 400 var(--fs-let, 14px) var(--font); fill: var(--testo3); }
    .lab-batteri .let-t { font: 600 var(--fs-lett, 18px) var(--font); fill: var(--accento-testo); }
    .lab-batteri .g-griglia { stroke: var(--g-griglia); stroke-width: 1; }
    .lab-batteri .g-asse { stroke: var(--g-asse); stroke-width: 1.6; stroke-linecap: round; }
    .lab-batteri .g-et { font: 400 var(--fs-g, 15px) var(--font); fill: var(--testo3); }
    .lab-batteri .g-et.forte { fill: var(--accento-testo); font-weight: 700; }
    .lab-batteri .g-curva { fill: none; stroke: var(--s3); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; }
    .lab-batteri .g-curva.morte { stroke: var(--s2); }
    .lab-batteri .g-lin { fill: none; stroke: var(--testo3); stroke-width: 2.2; stroke-dasharray: 6 5; }
    .lab-batteri .g-rif { stroke: var(--testo3); stroke-width: 1.3; stroke-dasharray: 4 4; }
    .lab-batteri .g-guida { stroke: var(--accento); stroke-width: 1.3; stroke-dasharray: 3 4; opacity: .65; }
    .lab-batteri .g-marker { fill: var(--s3); }
    .lab-batteri .g-marker.morte { fill: var(--s2); }
    .lab-batteri .g-ignoto { fill: none; stroke: var(--testo3); stroke-width: 2; stroke-dasharray: 4 4; }
    .lab-batteri .g-punto { fill: var(--accento); stroke: var(--sup); stroke-width: 2.2; }
    .lab-batteri .g-val { font: 700 var(--fs-gv, 16px) var(--font); fill: var(--accento-testo); }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* N(t) = N0 · b^t */
  const pot = (N0, b, t) => N0 * Math.pow(b, t);

  /* numeri all'italiana: interi secchi, altrimenti un decimale con la virgola */
  function fmtN(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
    return (Math.round(x * 10) / 10).toFixed(1).replace('.', ',');
  }
  const texN = x => fmtN(x).replace(',', '{,}');

  /* generatore deterministico: la colonia ha sempre la stessa forma nello stesso livello */
  function seme(s) { let x = (s >>> 0) || 7; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }

  /* ---------- geometria della scena (viewBox 600 × 340) ---------- */
  const TB = { x: 29, w: 70, top: 34, bot: 306, r: 35 };          /* provetta */
  TB.cx = TB.x + TB.w / 2;
  TB.yPieno = 46; TB.yVuoto = 302; TB.H = TB.yVuoto - TB.yPieno;  /* dove sta il liquido */
  const OR = { cx: 176, cy: 98, r: 54 };                          /* orologio */
  const GR = { x0: 300, x1: 580, y0: 286, y1: 44 };               /* area del grafico */

  const percorsoTubo = () => `M${TB.x} ${TB.top} L${TB.x} ${TB.bot - TB.r} A${TB.r} ${TB.r} 0 0 0 ${TB.x + TB.w} ${TB.bot - TB.r} L${TB.x + TB.w} ${TB.top} Z`;
  /* mezza larghezza interna del tubo all'altezza y (il fondo è tondo) */
  function semiLarg(y) {
    const yc = TB.bot - TB.r;
    if (y <= yc) return TB.w / 2 - 4;
    const dy = Math.min(TB.r, y - yc);
    return Math.max(2, Math.sqrt(TB.r * TB.r - dy * dy) - 4);
  }
  const yLiquido = f => TB.yVuoto - clamp(f, 0, 1) * TB.H;

  /* ---------- livelli ----------
     Ogni variante è un mondo completo: N0 (partenza), b (fattore a ogni passo),
     tMax (fine del cursore), cap (capienza della provetta), r (risposta esatta).
     t = istante chiesto · pieno = passo in cui la provetta trabocca · frazione = quota da trovare
     soglia = quanti ne devono restare · lin = retta grigia q + m·t · incognita = la base è nascosta.
     Le risposte sono verificate a mano, i conti stanno nei commenti. */
  function V(o) {
    if (o.tMax == null) o.tMax = o.t + 1;
    if (o.cap == null) o.cap = pot(o.N0, o.b, o.tMax);
    return o;
  }

  const LIVELLI = [
    { /* 1 */ unita: 'minuto', campo: 'batteri',
      varianti: [V({ N0: 1, b: 2, t: 5, r: 32 }), V({ N0: 1, b: 2, t: 6, r: 64 }), V({ N0: 1, b: 2, t: 7, r: 128 })],
      domanda: v => `Un batterio si divide in due <b>ogni minuto</b>. Nella provetta ne parte <b>${v.N0}</b>: quanti ce ne sono dopo <b>${v.t} minuti</b>?`,
      giusto: v => `Esatto: ${fmtN(v.r)}. Sono ${v.t} raddoppi di fila, cioè 2 moltiplicato per sé stesso ${v.t} volte — non ${v.t} per 2, che farebbe ${v.t * 2}.`,
      errato: () => 'Muovi il cursore del tempo e conta con me: 1, 2, 4, 8… Ogni minuto il numero si moltiplica per 2, non ci si aggiunge 2.' },

    { /* 2 */ unita: 'minuto', campo: 'batteri',
      varianti: [V({ N0: 1, b: 2, t: 10, r: 1024 }), V({ N0: 1, b: 2, t: 9, r: 512 }), V({ N0: 1, b: 2, t: 11, r: 2048 })],
      domanda: v => `Stesso batterio, stesso raddoppio al minuto. E dopo <b>${v.t} minuti</b>?`,
      giusto: v => `${fmtN(v.r)} = 2^${v.t}. Guarda la curva: per metà tempo sembra sdraiata sull'asse, poi impenna. È sempre la stessa regola, cambia solo quanto è grande il numero.`,
      errato: () => 'Prova a scorrere il tempo un minuto alla volta e a leggere il grafico: ogni tacca vale il doppio della precedente. Dieci raddoppi portano da 1 a più di mille.' },

    { /* 3 */ unita: 'passo', campo: 'batteri',
      varianti: [V({ N0: 3, b: 2, t: 6, r: 192 }), V({ N0: 5, b: 2, t: 5, r: 160 }), V({ N0: 7, b: 2, t: 6, r: 448 })],
      domanda: v => `Nella provetta partono <b>${v.N0} batteri</b>. Quanti dopo <b>${v.t} raddoppi</b>?`,
      giusto: v => `${fmtN(v.r)} = ${v.N0}·2^${v.t} = ${v.N0}·${Math.pow(2, v.t)}. Il numero di partenza <i>moltiplica</i> tutta la crescita: non si somma alla fine.`,
      errato: v => `Il numero di partenza non si aggiunge in fondo: moltiplica. Prima calcola 2^${v.t}, poi moltiplica per ${v.N0}. Scorri il tempo e controlla passo per passo.` },

    { /* 4 */ unita: 'minuto', campo: 'minuto',
      varianti: [V({ N0: 1, b: 2, pieno: 12, frazione: 0.5, r: 11, tMax: 12, cap: 4096 }),
                 V({ N0: 1, b: 2, pieno: 10, frazione: 0.5, r: 9, tMax: 10, cap: 1024 }),
                 V({ N0: 1, b: 2, pieno: 14, frazione: 0.5, r: 13, tMax: 14, cap: 16384 })],
      domanda: v => `I batteri raddoppiano ogni minuto e la provetta è <b>piena</b> al minuto <b>${v.pieno}</b>. A che minuto era piena <b>a metà</b>?`,
      giusto: v => `Il minuto ${v.r}: la metà arriva sempre un passo prima della fine, perché l'ultimo raddoppio da solo riempie tutto il resto. Un batterio che nuota in una provetta piena a metà non vede nessun problema — e gli resta un minuto.`,
      errato: v => `Non dividere il tempo per due: dimezzare i batteri è tornare indietro di <i>un raddoppio</i>. Porta il cursore al minuto ${v.pieno} e poi indietro di uno: guarda dov'è il pelo del liquido.` },

    { /* 5 */ unita: 'minuto', campo: 'minuto',
      varianti: [V({ N0: 1, b: 2, pieno: 12, frazione: 0.25, r: 10, tMax: 12, cap: 4096 }),
                 V({ N0: 1, b: 2, pieno: 10, frazione: 0.25, r: 8, tMax: 10, cap: 1024 }),
                 V({ N0: 1, b: 2, pieno: 14, frazione: 0.25, r: 12, tMax: 14, cap: 16384 })],
      domanda: v => `Stessa provetta, piena al minuto <b>${v.pieno}</b>. E a che minuto era piena <b>a un quarto</b>?`,
      giusto: v => `Minuto ${v.r}: un quarto vuol dire due raddoppi prima della fine. Indietro nel tempo la popolazione si dimezza ogni volta, quindi ogni passo all'indietro taglia a metà.`,
      errato: v => `Un quarto è la metà della metà: due passi indietro dal pieno, non quattro. Vai al minuto ${v.pieno} e torna indietro contando i dimezzamenti.` },

    { /* 6 */ unita: 'minuto', campo: 'minuto',
      /* 2^t contro q + m·t — sorpasso verificato: v1 t=10 → 1024<1100, t=11 → 2048>1200 */
      varianti: [V({ N0: 1, b: 2, lin: { q: 100, m: 100 }, r: 11, tMax: 12, cap: 4096 }),
                 V({ N0: 1, b: 2, lin: { q: 50, m: 50 }, r: 9, tMax: 11, cap: 2048 }),      /* t=8 → 256<450, t=9 → 512>500 */
                 V({ N0: 1, b: 2, lin: { q: 200, m: 200 }, r: 12, tMax: 13, cap: 8192 })],  /* t=11 → 2048<2400, t=12 → 4096>2600 */
      domanda: v => `La <b>linea grigia</b> parte da ${v.lin.q} batteri e ne aggiunge <b>${v.lin.m} al minuto</b>: cresce di un tanto fisso. I batteri della provetta partono da <b>1</b> e <b>raddoppiano</b>. Da che minuto i batteri <b>superano</b> la linea grigia?`,
      giusto: v => `Dal minuto ${v.r}. Per dieci minuti la linea grigia sembra vincere di gran lunga, poi l'esponenziale la passa e non la rivede più: chi moltiplica batte sempre chi somma, basta aspettare abbastanza.`,
      errato: () => 'Sblocco il tempo: scorri minuto per minuto e guarda quando la curva verde taglia la linea grigia. All\'inizio la grigia è avanti di parecchio, e sembra che non la raggiungerai mai.' },

    { /* 7 */ unita: 'passo', campo: 'batteri',
      varianti: [V({ N0: 2, b: 3, t: 4, r: 162 }), V({ N0: 2, b: 3, t: 5, r: 486 }), V({ N0: 1, b: 3, t: 5, r: 243 })],
      domanda: v => `Un ceppo più svelto: a ogni passo la popolazione si <b>triplica</b>. Da <b>${v.N0} ${v.N0 === 1 ? 'batterio' : 'batteri'}</b>, quanti dopo <b>${v.t} passi</b>?`,
      giusto: v => `${fmtN(v.r)} = ${v.N0}·3^${v.t} = ${v.N0}·${Math.pow(3, v.t)}. Cambiata la base, cambia tutto: con 3 al posto di 2 la curva impenna molto prima.`,
      errato: v => `Qui la base non è 2 ma 3: 3^${v.t} = ${Math.pow(3, v.t)}, e poi moltiplichi per ${v.N0}. Scorri i passi e guarda quanto in fretta sale.` },

    { /* 8 */ unita: 'minuto', campo: 'batteri',
      varianti: [V({ N0: 1000, b: 0.5, t: 3, r: 125, tMax: 8, cap: 1000 }),
                 V({ N0: 800, b: 0.5, t: 4, r: 50, tMax: 8, cap: 800 }),
                 V({ N0: 1600, b: 0.5, t: 5, r: 50, tMax: 9, cap: 1600 })],
      domanda: v => `Arriva il disinfettante: <b>ogni minuto muore metà</b> della popolazione. Da <b>${v.N0} batteri</b>, quanti ne restano dopo <b>${v.t} minuti</b>?`,
      giusto: v => `${fmtN(v.r)} = ${v.N0} diviso 2^${v.t}, cioè diviso ${Math.pow(2, v.t)}. Anche il decadimento è un esponenziale: la base è 1/2, e la curva scende sempre più piano invece di salire sempre più ripida.`,
      errato: v => `Dimezzare ${v.t} volte non è dividere per ${v.t * 2}: è dividere per 2 moltiplicato per sé stesso ${v.t} volte. Muovi il tempo e leggi i numeri sul grafico.` },

    { /* 9 */ unita: 'minuto', campo: 'minuti',
      /* 1000/2^6 = 15,625 ≥ 10 · 1000/2^7 = 7,8125 < 10 → 7 (idem per 500 → 6 e 2000 → 8) */
      varianti: [V({ N0: 1000, b: 0.5, soglia: 10, r: 7, tMax: 10, cap: 1000 }),
                 V({ N0: 500, b: 0.5, soglia: 10, r: 6, tMax: 10, cap: 500 }),
                 V({ N0: 2000, b: 0.5, soglia: 10, r: 8, tMax: 11, cap: 2000 })],
      domanda: v => `Sempre dimezzando, partendo da <b>${v.N0} batteri</b>: dopo <b>quanti minuti</b> ne restano <b>meno di ${v.soglia}</b>?`,
      giusto: v => `${v.r} minuti: al minuto ${v.r - 1} erano ancora ${fmtN(pot(v.N0, v.b, v.r - 1))}, al minuto ${v.r} sono ${fmtN(pot(v.N0, v.b, v.r))}, sotto ${v.soglia} per la prima volta. Dimezzando non si arriva mai a zero: ci si avvicina soltanto.`,
      errato: v => `Scorri il tempo e leggi la linea tratteggiata dei ${v.soglia}: cerca il primo minuto in cui la curva ci passa <i>sotto</i>. Attento, i numeri diventano decimali.` },

    { /* 10 */ unita: 'passo', campo: 'fattore', incognita: true,
      varianti: [V({ N0: 2, b: 3, t: 3, r: 3, incognita: true, tMax: 3, cap: 54 }),
                 V({ N0: 3, b: 2, t: 4, r: 2, incognita: true, tMax: 4, cap: 48 }),
                 V({ N0: 1, b: 4, t: 3, r: 4, incognita: true, tMax: 3, cap: 64 })],
      domanda: v => `Questa volta non so quanto sono veloci. So solo che partono in <b>${v.N0}</b> e che dopo <b>${v.t} passi</b> sono <b>${fmtN(pot(v.N0, v.b, v.t))}</b>. Per quanto viene moltiplicata la popolazione <b>a ogni passo</b>?`,
      giusto: v => `La base è ${v.r}: infatti ${v.N0}·${v.r}^${v.t} = ${fmtN(pot(v.N0, v.b, v.t))}, cioè ${v.r}^${v.t} = ${Math.pow(v.r, v.t)}. Cercare l'esponente invece della base è la domanda che, fra poco, ti porterà ai logaritmi.`,
      errato: v => `Non dividere ${fmtN(pot(v.N0, v.b, v.t))} per ${v.t}: devi trovare il numero che moltiplicato per sé stesso ${v.t} volte fa ${fmtN(pot(v.N0, v.b, v.t) / v.N0)}. Ti scopro la curva: guarda i passi intermedi.` }
  ];

  const AIUTO = 'Raddoppiare a ogni passo vuol dire moltiplicare per 2 tante volte quanti sono i passi: N(t) = N₀·2^t. Perciò il numero di partenza moltiplica, e i passi stanno in alto come esponente. E siccome ogni passo raddoppia, tornare indietro di un passo dimezza: la metà del totale è sempre l\'ultimo passo prima della fine, un quarto è due passi prima. Con la base 1/2 vale tutto uguale, ma al contrario: si dimezza e non si arriva mai a zero.';

  const ETICHETTA = { batteri: 'batteri', minuto: 'il minuto', minuti: 'minuti', fattore: '× a ogni passo' };
  const SEGNAPOSTO = { batteri: 'quanti?', minuto: 'minuto', minuti: 'minuti', fattore: 'per quanto?' };

  function fmtPerc(x) {
    if (x >= 0.995) return 'piena';
    if (x <= 0) return 'vuota';
    if (x < 0.005) return 'meno dell\'1%';
    return 'al ' + Math.round(x * 100) + '%';
  }

  COMPASSO.registraLab({
    id: 'batteri',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-batteri')) { const s = document.createElement('style'); s.id = 'stile-lab-batteri'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-batteri');
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="lab-aiuto" hidden data-scorre><p></p><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: nessuna domanda, scegli tu partenza, fattore e tempo">Libero</button></div>
            <div class="lab-parametri" hidden>
              <div class="lab-param" data-p="N0"><span class="nome">${ctx.tex('N_0')}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="meno batteri alla partenza">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="più batteri alla partenza">+</button></div>
              <div class="lab-param" data-p="b"><span class="nome">${ctx.tex('b')}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="fattore più piccolo">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="fattore più grande">+</button></div>
              <div class="lab-param" data-p="tMax"><span class="nome">passi</span><button type="button" class="btn piccolo" data-d="-1" aria-label="meno passi">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="più passi">+</button></div>
            </div>
            <div class="domanda">
              <div class="dom-testo"></div>
              <div class="dom-riga">
                <input type="text" class="dom-campo" inputmode="numeric" autocomplete="off" spellcheck="false" aria-label="La tua risposta">
                <span class="dom-unita"></span>
                <button type="button" class="btn primario b-verifica">Verifica</button>
              </div>
            </div>
            <div class="formule"></div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <span class="cursore"><input type="range" class="s-t" min="0" max="12" step="1" value="0" aria-label="Il tempo"><span class="val">min 0 / 12</span></span>
              <button type="button" class="btn piccolo b-aiuto" aria-label="Come si gioca">?</button>
              <button type="button" class="btn b-passo">▶ un passo</button>
              <button type="button" class="btn b-play">⏵ avvia</button>
              <button type="button" class="btn piccolo b-avanti">Ricomincia</button>
              <button type="button" class="btn piccolo b-casuale" hidden>Casuale</button>
            </div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), formule = q('.formule'), domTesto = q('.dom-testo'), campo = q('.dom-campo');
      const unitaEl = q('.dom-unita'), msg = q('.lab-messaggio'), domanda = q('.domanda'), aiutoEl = q('.lab-aiuto');
      const livelliEl = q('.lab-livelli'), parametriEl = q('.lab-parametri'), bLibero = q('.lab-libero');
      const cursoreEl = q('.cursore'), slider = q('.s-t'), cursVal = q('.cursore .val');
      const bt = { verifica: q('.b-verifica'), passo: q('.b-passo'), play: q('.b-play'), avanti: q('.b-avanti'), aiuto: q('.b-aiuto'), casuale: q('.b-casuale') };

      /* ---------- scheletro della scena (si costruisce una volta sola) ---------- */
      const svg = el('svg', { viewBox: '0 0 600 340', preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': 'La provetta, l\'orologio e il grafico della popolazione' });
      scena.insertBefore(svg, aiutoEl);
      const defs = el('defs'); svg.appendChild(defs);
      const cpTubo = el('clipPath', { id: 'lab-batteri-tubo' }); cpTubo.appendChild(el('path', { d: percorsoTubo() })); defs.appendChild(cpTubo);
      const rBanda = el('rect', { x: TB.x - 8, y: TB.yVuoto, width: TB.w + 16, height: 2 });
      const cpBanda = el('clipPath', { id: 'lab-batteri-banda' }); cpBanda.appendChild(rBanda); defs.appendChild(cpBanda);

      /* quattro blocchi (provetta, orologio, lettura, grafico): le coordinate interne restano quelle
         di sempre, adatta() li sposta e li scala con un transform secondo la forma della scena */
      const gP = el('g'); svg.appendChild(gP);
      gP.appendChild(el('path', { d: percorsoTubo(), class: 'vetro-fondo' }));
      const gTubo = el('g', { 'clip-path': 'url(#lab-batteri-tubo)' }); gP.appendChild(gTubo);
      const colonia = el('g', { class: 'colonia', 'clip-path': 'url(#lab-batteri-banda)' }); gTubo.appendChild(colonia);
      const brodo = el('rect', { x: TB.x - 8, y: TB.yVuoto, width: TB.w + 16, height: 2, opacity: .16 }); colonia.appendChild(brodo);
      const gPunti = el('g'); colonia.appendChild(gPunti);
      const pelo = el('line', { class: 'pelo', x1: TB.x + 2, y1: TB.yVuoto, x2: TB.x + TB.w - 2, y2: TB.yVuoto, opacity: 0 }); gTubo.appendChild(pelo);
      gP.appendChild(el('path', { d: percorsoTubo(), class: 'vetro' }));
      gP.appendChild(el('rect', { x: TB.x - 7, y: TB.top - 11, width: TB.w + 14, height: 15, rx: 6, class: 'tappo' }));
      gP.appendChild(el('rect', { x: TB.x + 9, y: TB.top + 24, width: 6, height: 140, rx: 3, class: 'riflesso' }));
      const gTacche = el('g'); gP.appendChild(gTacche);

      /* orologio */
      const gOr = el('g'); svg.appendChild(gOr);
      gOr.appendChild(el('circle', { cx: OR.cx, cy: OR.cy, r: OR.r, class: 'quadrante' }));
      const settore = el('path', { class: 'settore', d: '' }); gOr.appendChild(settore);
      for (let m = 0; m < 60; m++) {
        const a = (m * 6 - 90) * Math.PI / 180, gros = m % 5 === 0;
        const r1 = OR.r - (gros ? 10 : 5), r2 = OR.r - 3;
        gOr.appendChild(el('line', {
          class: 'tacchetta' + (gros ? ' grossa' : ''),
          x1: (OR.cx + r1 * Math.cos(a)).toFixed(1), y1: (OR.cy + r1 * Math.sin(a)).toFixed(1),
          x2: (OR.cx + r2 * Math.cos(a)).toFixed(1), y2: (OR.cy + r2 * Math.sin(a)).toFixed(1)
        }));
      }
      [[0, '0'], [15, '15'], [30, '30'], [45, '45']].forEach(([m, testo]) => {
        const a = (m * 6 - 90) * Math.PI / 180, rr = OR.r - 21;
        gOr.appendChild(el('text', { class: 'num-or', x: (OR.cx + rr * Math.cos(a)).toFixed(1), y: (OR.cy + rr * Math.sin(a) + 4).toFixed(1), 'text-anchor': 'middle' }, testo));
      });
      const lancetta = el('line', { class: 'lancetta', x1: OR.cx, y1: OR.cy, x2: OR.cx, y2: OR.cy - (OR.r - 14) });
      gOr.appendChild(lancetta);
      gOr.appendChild(el('circle', { cx: OR.cx, cy: OR.cy, r: 4, class: 'perno' }));

      /* lettura sotto l'orologio */
      const tN = el('text', { x: OR.cx, y: 210, 'text-anchor': 'middle', class: 'let-n' }, '1');
      const tEt = el('text', { x: OR.cx, y: 231, 'text-anchor': 'middle', class: 'let-et' }, 'batterio');
      const tT = el('text', { x: OR.cx, y: 262, 'text-anchor': 'middle', class: 'let-t' }, 'minuto 0');
      const tPerc = el('text', { x: OR.cx, y: 286, 'text-anchor': 'middle', class: 'let-et' }, '');
      const gL = el('g'); svg.appendChild(gL);
      [tN, tEt, tT, tPerc].forEach(n => gL.appendChild(n));

      /* grafico */
      const gG = el('g'); svg.appendChild(gG);
      const gAssi = el('g'); gG.appendChild(gAssi);
      const gRif = el('g'); gG.appendChild(gRif);
      const linGrigia = el('polyline', { class: 'g-lin', points: '' }); gG.appendChild(linGrigia);
      const etLin = el('text', { class: 'g-et', 'text-anchor': 'end' }, ''); gG.appendChild(etLin);
      const guida = el('line', { class: 'g-guida', x1: 0, y1: 0, x2: 0, y2: 0 }); gG.appendChild(guida);
      const curva = el('path', { class: 'g-curva', d: '' }); gG.appendChild(curva);
      const gMark = el('g'); gG.appendChild(gMark);
      const gIgnoto = el('g'); gG.appendChild(gIgnoto);
      const punto = el('circle', { class: 'g-punto', r: 5.5, cx: GR.x0, cy: GR.y0 }); gG.appendChild(punto);
      const etPunto = el('text', { class: 'g-val', 'text-anchor': 'middle', x: GR.x0, y: GR.y0 }, ''); gG.appendChild(etPunto);

      /* ---------- stato ---------- */
      let livello = 0, cfg = null, t = 0, tvis = 0, raf = null, tPlay = null, tSalto = null, fase = 'domanda';
      let libero = false, salvato = null;   /* modalità libera, e il livello da cui ci si è entrati */
      const iVar = LIVELLI.map(() => 0);
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.min(LIVELLI.length - 1, Math.max.apply(null, completati) + 1) : 0;
      if (!(livello >= 0)) livello = 0;

      const gx = t2 => GR.x0 + (t2 / cfg.tMax) * (GR.x1 - GR.x0);
      const gy = n => clamp(GR.y0 - (n / cfg.cap) * (GR.y0 - GR.y1), GR.y1 - 8, GR.y0);

      /* ---------- costruzione della scena per un livello ---------- */
      function preparaScena() {
        vuota(gPunti); vuota(gTacche); vuota(gAssi); vuota(gRif); vuota(gMark); vuota(gIgnoto);
        colonia.classList.toggle('morte', !!cfg.decad);
        pelo.classList.toggle('morte', !!cfg.decad);
        curva.classList.toggle('morte', !!cfg.decad);

        /* la colonia: un puntino ogni cap/M batteri, impilati dal fondo verso l'alto.
           Oltre i 512 i puntini non bastano più: si guarda la marea, non i singoli. */
        const M = Math.min(cfg.cap, 512);
        const rp = M <= 80 ? 3.4 : M <= 200 ? 2.8 : M <= 380 ? 2.4 : 2.1;
        const rnd = seme(Math.round(cfg.cap) * 31 + cfg.tMax * 7 + 3);
        for (let j = 0; j < M; j++) {
          const fr = clamp((j + 0.5) / M + (rnd() - 0.5) * (0.9 / M), 0, 1);
          const y = TB.yVuoto - fr * TB.H;
          const hw = Math.max(1, semiLarg(y) - rp);
          gPunti.appendChild(el('circle', { cx: (TB.cx + (rnd() * 2 - 1) * hw).toFixed(1), cy: y.toFixed(1), r: rp }));
        }

        /* tacche sul vetro */
        const tacche = [{ f: 1, testo: 'piena' }];
        if (cfg.frazione != null) {
          tacche.push({ f: 0.5, testo: '½' });
          if (cfg.frazione < 0.5) tacche.push({ f: 0.25, testo: '¼' });
        }
        if (cfg.soglia != null) tacche.push({ f: cfg.soglia / cfg.cap, testo: fmtN(cfg.soglia) });
        tacche.forEach(k => {
          const y = yLiquido(k.f);
          gTacche.appendChild(el('line', { class: 'tacca-l', x1: TB.x - 5, y1: y.toFixed(1), x2: TB.x + TB.w + 7, y2: y.toFixed(1) }));
          gTacche.appendChild(el('text', { class: 'tacca-t', x: TB.x + TB.w + 11, y: (y + 4).toFixed(1) }, k.testo));
        });

        /* assi */
        gAssi.appendChild(el('line', { class: 'g-asse', x1: GR.x0, y1: GR.y1 - 10, x2: GR.x0, y2: GR.y0 }));
        gAssi.appendChild(el('line', { class: 'g-asse', x1: GR.x0, y1: GR.y0, x2: GR.x1 + 10, y2: GR.y0 }));
        let div = 1;
        [4, 3, 2].some(d => { if (Math.abs(cfg.cap / d - Math.round(cfg.cap / d)) < 1e-9) { div = d; return true; } return false; });
        for (let i = 0; i <= div; i++) {
          const n = cfg.cap * i / div, y = gy(n);
          if (i) gAssi.appendChild(el('line', { class: 'g-griglia', x1: GR.x0, y1: y.toFixed(1), x2: GR.x1 + 10, y2: y.toFixed(1) }));
          gAssi.appendChild(el('text', { class: 'g-et', x: GR.x0 - 7, y: (y + 5).toFixed(1), 'text-anchor': 'end' }, fmtN(n)));
        }
        const passoT = cfg.tMax <= 8 ? 1 : 2;
        for (let i = 0; i <= cfg.tMax; i += passoT) {
          const x = gx(i);
          gAssi.appendChild(el('line', { class: 'g-griglia', x1: x.toFixed(1), y1: GR.y1 - 10, x2: x.toFixed(1), y2: GR.y0 }));
          gAssi.appendChild(el('text', { class: 'g-et', x: x.toFixed(1), y: GR.y0 + 21, 'text-anchor': 'middle' }, String(i)));
        }
        gAssi.appendChild(el('text', { class: 'g-et', x: GR.x1 + 10, y: GR.y0 + 36, 'text-anchor': 'end' }, cfg.unita === 'passo' ? 'passi' : 'minuti'));
        gAssi.appendChild(el('text', { class: 'g-et', x: GR.x0 - 7, y: GR.y1 - 16, 'text-anchor': 'end' }, 'batteri'));

        /* la retta grigia: crescita a passi fissi */
        if (cfg.lin) {
          const yFine = gy(cfg.lin.q + cfg.lin.m * cfg.tMax);
          linGrigia.setAttribute('points', gx(0).toFixed(1) + ',' + gy(cfg.lin.q).toFixed(1) + ' ' + gx(cfg.tMax).toFixed(1) + ',' + yFine.toFixed(1));
          linGrigia.style.display = '';
          etLin.setAttribute('x', GR.x1 + 8); etLin.setAttribute('y', (yFine + 20).toFixed(1));
          etLin.textContent = '+' + cfg.lin.m + ' al minuto';
        } else { linGrigia.style.display = 'none'; etLin.textContent = ''; }

        /* linee di riferimento */
        if (cfg.soglia != null) {
          const y = gy(cfg.soglia);
          gRif.appendChild(el('line', { class: 'g-rif', x1: GR.x0, y1: y.toFixed(1), x2: GR.x1 + 10, y2: y.toFixed(1) }));
          gRif.appendChild(el('text', { class: 'g-et', x: GR.x0 + 6, y: (y - 7).toFixed(1) }, 'meno di ' + fmtN(cfg.soglia)));
        }
        if (cfg.frazione != null) {
          [[0.5, 'metà'], [0.25, 'un quarto']].forEach(p => {
            if (p[0] < cfg.frazione) return;
            const y = gy(cfg.cap * p[0]);
            gRif.appendChild(el('line', { class: 'g-rif', x1: GR.x0, y1: y.toFixed(1), x2: GR.x1 + 10, y2: y.toFixed(1) }));
            gRif.appendChild(el('text', { class: 'g-et', x: GR.x0 + 6, y: (y - 7).toFixed(1) }, p[1]));
          });
        }

        /* pallini sui passi interi */
        for (let i = 0; i <= cfg.tMax; i++) gMark.appendChild(el('circle', { class: 'g-marker' + (cfg.decad ? ' morte' : ''), r: 3.2, cx: gx(i).toFixed(1), cy: GR.y0 }));

        /* livello con la base nascosta: si vedono solo i due dati */
        if (cfg.incognita) {
          const nF = pot(cfg.N0, cfg.b, cfg.t), yF = gy(nF);
          gIgnoto.appendChild(el('circle', { class: 'g-punto', cx: gx(0).toFixed(1), cy: gy(cfg.N0).toFixed(1), r: 5.5 }));
          gIgnoto.appendChild(el('circle', { class: 'g-ignoto', cx: gx(cfg.t).toFixed(1), cy: yF.toFixed(1), r: 7 }));
          gIgnoto.appendChild(el('text', { class: 'g-val', x: (gx(cfg.t) - 6).toFixed(1), y: (yF + 22).toFixed(1), 'text-anchor': 'end' }, fmtN(nF)));
          gIgnoto.appendChild(el('text', { class: 'g-val', x: ((gx(0) + gx(cfg.t)) / 2).toFixed(1), y: ((gy(cfg.N0) + yF) / 2).toFixed(1), 'text-anchor': 'middle' }, '?'));
        }
      }

      /* ---------- disegno (chiamato a ogni fotogramma) ---------- */
      function settoreD(tt) {
        const th = Math.min(tt, 59.5) * 6;
        if (th < 0.3) return '';
        const R = OR.r - 6, a0 = -Math.PI / 2, a1 = (th - 90) * Math.PI / 180;
        return 'M' + OR.cx + ' ' + OR.cy + ' L' + (OR.cx + R * Math.cos(a0)).toFixed(1) + ' ' + (OR.cy + R * Math.sin(a0)).toFixed(1) +
          ' A' + R + ' ' + R + ' 0 ' + (th > 180 ? 1 : 0) + ' 1 ' + (OR.cx + R * Math.cos(a1)).toFixed(1) + ' ' + (OR.cy + R * Math.sin(a1)).toFixed(1) + ' Z';
      }

      function disegna() {
        const noto = cfg.bNoto;
        const tt = noto ? tvis : 0;
        const nVis = pot(cfg.N0, cfg.b, tt);
        const f = clamp(nVis / cfg.cap, 0, 1);
        const yc = yLiquido(f), h = (TB.bot + 14 - yc);
        rBanda.setAttribute('y', yc.toFixed(1)); rBanda.setAttribute('height', h.toFixed(1));
        brodo.setAttribute('y', yc.toFixed(1)); brodo.setAttribute('height', h.toFixed(1));
        brodo.setAttribute('opacity', (0.12 + 0.5 * f).toFixed(3));
        pelo.setAttribute('y1', yc.toFixed(1)); pelo.setAttribute('y2', yc.toFixed(1));
        pelo.setAttribute('opacity', f > 0.006 ? 0.85 : 0);

        const ang = (tt * 6 - 90) * Math.PI / 180;
        lancetta.setAttribute('x2', (OR.cx + (OR.r - 14) * Math.cos(ang)).toFixed(1));
        lancetta.setAttribute('y2', (OR.cy + (OR.r - 14) * Math.sin(ang)).toFixed(1));
        settore.setAttribute('d', settoreD(tt));

        const tOra = noto ? t : 0, nOra = pot(cfg.N0, cfg.b, tOra);
        tN.textContent = fmtN(nOra);
        tEt.textContent = nOra === 1 ? 'batterio' : 'batteri';
        tT.textContent = (cfg.unita === 'passo' ? 'passo ' : 'minuto ') + tOra;
        tPerc.textContent = 'provetta ' + fmtPerc(nOra / cfg.cap);

        const mark = gMark.children;
        if (noto) {
          curva.style.display = ''; punto.style.display = ''; etPunto.style.display = ''; guida.style.display = '';
          let d = 'M' + gx(0).toFixed(1) + ' ' + gy(cfg.N0).toFixed(1);
          const P = 120;
          for (let i = 1; i <= P; i++) { const u = tvis * i / P; d += 'L' + gx(u).toFixed(1) + ' ' + gy(pot(cfg.N0, cfg.b, u)).toFixed(1); }
          curva.setAttribute('d', d);
          const px = gx(tvis), py = gy(pot(cfg.N0, cfg.b, tvis));
          punto.setAttribute('cx', px.toFixed(1)); punto.setAttribute('cy', py.toFixed(1));
          guida.setAttribute('x1', px.toFixed(1)); guida.setAttribute('y1', py.toFixed(1));
          guida.setAttribute('x2', px.toFixed(1)); guida.setAttribute('y2', GR.y0);
          /* vicino al bordo destro il numero si allinea a destra, così non esce dal disegno */
          const aDestra = px > GR.x1 - 40;
          etPunto.setAttribute('text-anchor', aDestra ? 'end' : 'middle');
          etPunto.setAttribute('x', (aDestra ? px + 6 : clamp(px, GR.x0 + 16, GR.x1 - 2)).toFixed(1));
          etPunto.setAttribute('y', clamp(py - 13, GR.y1 - 2, GR.y0 - 10).toFixed(1));
          etPunto.textContent = fmtN(nOra);
          for (let i = 0; i < mark.length; i++) {
            mark[i].setAttribute('cy', gy(pot(cfg.N0, cfg.b, i)).toFixed(1));
            mark[i].style.display = i <= tvis + 1e-6 ? '' : 'none';
          }
        } else {
          curva.style.display = 'none'; punto.style.display = 'none'; etPunto.style.display = 'none'; guida.style.display = 'none';
          for (let i = 0; i < mark.length; i++) mark[i].style.display = 'none';
        }
        gIgnoto.style.display = (cfg.incognita && !noto) ? '' : 'none';
      }

      function ciclo() {
        const d = t - tvis;
        if (Math.abs(d) < 0.006) { tvis = t; disegna(); raf = null; return; }
        tvis += d * 0.2; disegna();
        raf = requestAnimationFrame(ciclo);
      }
      function versoT() { if (raf == null) raf = requestAnimationFrame(ciclo); }

      /* ---------- formule ---------- */
      function aggiornaFormule() {
        const noto = cfg.bNoto, righe = [];
        const bTex = cfg.b === 0.5 ? '\\left(\\tfrac{1}{2}\\right)' : String(cfg.b).replace('.', '{,}');
        const prima = 'N(t) = ' + texN(cfg.N0) + ' \\cdot ' + (noto ? bTex : 'b') + '^{\\,t}';
        if (noto) righe.push([false, [prima, 'N(' + t + ') = ' + texN(cfg.N0) + ' \\cdot ' + bTex + '^{' + t + '} = ' + texN(pot(cfg.N0, cfg.b, t))]]);
        else righe.push([false, [prima, texN(cfg.N0) + ' \\cdot b^{' + cfg.t + '} = ' + texN(pot(cfg.N0, cfg.b, cfg.t)), 'b = \\;?']]);
        righe.push([true, (cfg.lin ? ['L(t) = ' + cfg.lin.q + ' + ' + cfg.lin.m + '\\,t', 'L(' + t + ') = ' + texN(cfg.lin.q + cfg.lin.m * t)] : [])
          .concat(['\\text{capienza della provetta: } ' + texN(cfg.cap)], cfg.soglia != null ? ['\\text{soglia: } ' + texN(cfg.soglia)] : [])]);
        /* ogni riga va a capo fra un pezzo e l'altro, mai dentro un pezzo */
        formule.innerHTML = righe.map(r => '<div class="f-riga' + (r[0] ? ' min' : '') + '">' + r[1].map(x => '<span>' + ctx.tex(x) + '</span>').join('') + '</div>').join('');
      }

      /* ---------- comandi ---------- */
      function fermaPlay() { if (tPlay) { clearInterval(tPlay); tPlay = null; } bt.play.textContent = '⏵ avvia'; }
      function avviaPlay() {
        if (fase === 'domanda') return;
        if (t >= cfg.tMax) setT(0);
        fermaPlay();
        tPlay = setInterval(() => { if (t >= cfg.tMax) { fermaPlay(); aggiornaPulsanti(); return; } setT(t + 1); }, 700);
        bt.play.textContent = '⏸ pausa';
      }
      function setT(v) {
        t = clamp(Math.round(v), 0, cfg.tMax);
        slider.value = String(t);
        cursVal.textContent = (cfg.unita === 'passo' ? 'passo ' : 'min ') + t + ' / ' + cfg.tMax;
        aggiornaFormule(); aggiornaPulsanti(); versoT();
      }
      function aggiornaPulsanti() {
        const bloccato = fase === 'domanda';
        slider.disabled = bloccato;
        cursoreEl.classList.toggle('spento', bloccato);
        bt.passo.disabled = bloccato || t >= cfg.tMax;
        bt.play.disabled = bloccato;
        bt.verifica.disabled = !bloccato;
        campo.disabled = !bloccato;
        q('.dom-riga').hidden = !bloccato;
        bt.avanti.textContent = fase === 'esplora'
          ? (livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo')
          : (fase === 'sbagliato' ? 'Riprova ↺' : 'Ricomincia');
        bt.avanti.classList.toggle('primario', fase !== 'domanda');
      }

      function avviaLivello(n) {
        fermaPlay(); clearTimeout(tSalto);
        libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        livello = n;
        const L = LIVELLI[n], v = L.varianti[iVar[n] % L.varianti.length];
        cfg = {};
        for (const k in v) cfg[k] = v[k];
        cfg.unita = L.unita; cfg.campo = L.campo;
        cfg.decad = cfg.b < 1;
        cfg.bNoto = !cfg.incognita;
        cfg.tSoluzione = (L.campo === 'batteri' || L.campo === 'fattore') ? cfg.t : cfg.r;
        fase = 'domanda'; t = 0; tvis = 0;
        slider.max = String(cfg.tMax);
        preparaScena();
        domTesto.innerHTML = L.domanda(cfg);
        campo.value = ''; campo.placeholder = SEGNAPOSTO[L.campo] || '';
        unitaEl.textContent = ETICHETTA[L.campo] || '';
        msg.textContent = ''; msg.className = 'lab-messaggio';
        setT(0); disegna(); aggiornaLivelli();
      }

      function testoRisposta() {
        const c = cfg.campo;
        if (c === 'batteri') return 'N(' + cfg.t + ') = ' + texN(cfg.r);
        if (c === 'fattore') return 'b = ' + texN(cfg.r);
        return 't = ' + texN(cfg.r);
      }

      function verifica() {
        if (fase !== 'domanda') return;
        const grezzo = String(campo.value).replace(',', '.').replace(/\s/g, '');
        const val = parseFloat(grezzo);
        if (!isFinite(val)) { msg.textContent = 'Scrivi un numero nel campo, poi premi Verifica.'; msg.className = 'lab-messaggio no'; return; }
        const L = LIVELLI[livello];
        if (cfg.incognita) cfg.bNoto = true;
        if (Math.abs(val - cfg.r) < 1e-6) {
          fase = 'esplora';
          msg.innerHTML = '<span class="vinto">Giusto: ' + ctx.tex(testoRisposta()) + '</span>';
          msg.className = 'lab-messaggio ok';
          ctx.completato(livello); aggiornaLivelli();
          ctx.zenone(L.giusto(cfg), { espressione: 'orgoglioso', durata: 9000 });
          tSalto = setTimeout(() => setT(cfg.tSoluzione), 450);
        } else {
          fase = 'sbagliato';
          msg.textContent = 'Non ci siamo. Il tempo però adesso è libero: muovilo e guarda cosa succede davvero, poi riprova con numeri nuovi.';
          msg.className = 'lab-messaggio no';
          ctx.zenone(L.errato(cfg), { tipo: 'suggerimento', espressione: 'pensa', durata: 10000 });
        }
        aggiornaFormule(); aggiornaPulsanti(); disegna();
      }

      bt.verifica.addEventListener('click', verifica);
      campo.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); verifica(); } });
      slider.addEventListener('input', () => { fermaPlay(); setT(+slider.value); });
      bt.passo.addEventListener('click', () => { fermaPlay(); if (t < cfg.tMax) setT(t + 1); });
      bt.play.addEventListener('click', () => { if (tPlay) { fermaPlay(); aggiornaPulsanti(); } else avviaPlay(); });
      bt.avanti.addEventListener('click', () => {
        if (fase === 'esplora') avviaLivello(livello < LIVELLI.length - 1 ? livello + 1 : 0);
        else if (fase === 'sbagliato') { iVar[livello]++; avviaLivello(livello); }
        else avviaLivello(livello);
      });
      bt.aiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        aiutoEl.querySelector('p').textContent = libero ? AIUTO_LIBERO : AIUTO;
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });

      /* ---------- modalità libera: partenza, fattore e passi li sceglie lo studente ---------- */
      const N0S = [1, 2, 3, 5, 10, 20, 50, 100, 500, 1000];
      const BS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 10];
      const NMAX = 1e6, T_MAX = 20;
      const lib = { iN: 0, iB: 5, tMax: 8 };
      const fmtB = b => String(b).replace('.', ',');
      const AIUTO_LIBERO = 'In modalità libera non ci sono domande. Con − e + scegli quanti batteri partono (N₀), per quanto si moltiplica la popolazione a ogni passo (b) e quanti passi guardare. Con b più grande di 1 la colonia cresce, con b uguale a 1 resta ferma, con b fra 0 e 1 si riduce senza arrivare mai a zero. Muovi il tempo col cursore o con «avvia»: la formula e il grafico seguono. «Casuale» propone una colonia a caso.';
      function passiPossibili() {   /* quanti passi si possono guardare senza superare il milione */
        const N0 = N0S[lib.iN], b = BS[lib.iB];
        if (b <= 1) return T_MAX;
        return Math.max(2, Math.min(T_MAX, Math.floor(Math.log(NMAX / N0) / Math.log(b) + 1e-9)));
      }
      function cfgLibero() {
        const N0 = N0S[lib.iN], b = BS[lib.iB], tMax = lib.tMax;
        return { N0, b, tMax, cap: Math.max(N0, pot(N0, b, tMax)), unita: 'passo', campo: null, decad: b < 1, bNoto: true, libero: true };
      }
      function descriviLibero() {   /* osservazione neutra, mai una valutazione */
        const b = BS[lib.iB];
        if (b > 1) return 'Con b = ' + fmtB(b) + ' ogni passo moltiplica la popolazione per ' + fmtB(b) + ': la curva sale sempre più ripida.';
        if (b === 1) return 'Con b = 1 la popolazione non cambia: moltiplicare per 1 lascia tutto com\'è.';
        return 'Con b = ' + fmtB(b) + ' a ogni passo ne resta solo una parte: la curva scende sempre più piano e non tocca mai lo zero.';
      }
      function nuovoLibero() {
        fermaPlay();
        lib.tMax = Math.min(lib.tMax, passiPossibili());
        cfg = cfgLibero(); fase = 'libero';
        slider.max = String(cfg.tMax);
        preparaScena();
        t = Math.min(t, cfg.tMax); tvis = t;
        setT(t); disegna(); aggiornaParametri();
        msg.textContent = descriviLibero(); msg.className = 'lab-messaggio';
      }
      function aggiornaParametri() {
        const limiti = { N0: [lib.iN, N0S.length - 1], b: [lib.iB, BS.length - 1], tMax: [lib.tMax, passiPossibili()] };
        parametriEl.querySelectorAll('.lab-param').forEach(box => {
          const p = box.dataset.p, [b1, b2] = box.querySelectorAll('button');
          box.querySelector('output').textContent = p === 'N0' ? String(N0S[lib.iN]) : p === 'b' ? fmtB(BS[lib.iB]) : String(lib.tMax);
          b1.disabled = p === 'tMax' ? lib.tMax <= 2 : limiti[p][0] <= 0;
          b2.disabled = limiti[p][0] >= limiti[p][1];
        });
      }
      function mostraLibero() {
        parametriEl.hidden = !libero; domanda.hidden = libero;
        bt.avanti.hidden = libero; bt.casuale.hidden = !libero;
        radice.classList.toggle('in-libero', libero);
      }
      function entraLibero() {
        fermaPlay(); clearTimeout(tSalto);
        salvato = { livello, cfg, t, fase, campo: campo.value, msg: msg.innerHTML, cls: msg.className };
        libero = true; aiutoEl.hidden = true; mostraLibero();
        t = 0; tvis = 0;
        nuovoLibero(); aggiornaLivelli();
      }
      function esciLibero() {   /* si torna al livello com'era */
        fermaPlay();
        const z = salvato; libero = false; salvato = null; aiutoEl.hidden = true;
        livello = z.livello; cfg = z.cfg; fase = z.fase; mostraLibero();
        slider.max = String(cfg.tMax);
        preparaScena();
        campo.value = z.campo; t = z.t; tvis = t;
        setT(t); disegna(); aggiornaLivelli();
        msg.innerHTML = z.msg; msg.className = z.cls;
      }
      function casuale() {
        const r = n => Math.floor(Math.random() * n);
        const prima = lib.iN + ',' + lib.iB;
        for (let g = 0; g < 30; g++) {
          lib.iN = r(N0S.length); lib.iB = r(BS.length);
          if (BS[lib.iB] !== 1 && lib.iN + ',' + lib.iB !== prima) break;
        }
        lib.tMax = 3 + r(Math.max(1, passiPossibili() - 2));
        t = 0; tvis = 0; nuovoLibero();
      }
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
      bLibero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      bt.casuale.addEventListener('click', casuale);
      parametriEl.addEventListener('click', ev => {
        const b = ev.target.closest('button[data-d]'); if (!b || !libero) return;
        const d = +b.dataset.d, p = b.closest('.lab-param').dataset.p;
        if (p === 'N0') lib.iN = clamp(lib.iN + d, 0, N0S.length - 1);
        else if (p === 'b') lib.iB = clamp(lib.iB + d, 0, BS.length - 1);
        else lib.tMax = clamp(lib.tMax + d, 2, passiPossibili());
        nuovoLibero();
      });
      LIVELLI.forEach((_, k) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (k + 1)); p.innerHTML = '<span>' + (k + 1) + '</span>';
        p.addEventListener('click', () => avviaLivello(k));
        livelliEl.insertBefore(p, bLibero);
      });

      /* ---------- la forma dello spazio decide dove stanno i quattro blocchi ----------
         Provetta a sinistra, alta quanto la scena; in cima a destra orologio e lettura; sotto il
         grafico. Solo se la scena è molto larga i blocchi stanno tutti in fila, come in origine.
         I testi del disegno si regolano perché sullo schermo restino fra 12,5 px e 1,3 volte la misura base. */
      const BL = { P: { x: 16, y: 16, w: 156, h: 298 }, O: { x: 118, y: 40, w: 116, h: 116 }, L: { x: 96, y: 170, w: 160, h: 126 }, G: { x: 238, y: 10, w: 358, h: 320 } };
      function fit(g, b, r, maxS) {
        const s = Math.min(r.w / b.w, r.h / b.h, maxS);
        const tx = r.x + (r.w - b.w * s) / 2 - b.x * s, ty = r.y + (r.h - b.h * s) / 2 - b.y * s;
        g.setAttribute('transform', 'translate(' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ') scale(' + s.toFixed(4) + ')');
        return s;
      }
      let misura = '';
      function adatta() {
        const r = svg.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        const W = Math.round(Math.max(440, Math.min(1400, r.width / 1.25))), H = Math.max(300, Math.round(W * r.height / r.width));
        if (misura === W + 'x' + H) return;
        misura = W + 'x' + H;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        let sP, sO, sL, sG;
        if (H <= W * 0.6) {
          const pw = W * 0.22, ow = W * 0.21;
          sP = fit(gP, BL.P, { x: 0, y: 0, w: pw, h: H }, 2.2);
          sO = fit(gOr, BL.O, { x: pw, y: 0, w: ow, h: H * 0.45 }, 2);
          sL = fit(gL, BL.L, { x: pw, y: H * 0.45, w: ow, h: H * 0.55 }, 2);
          sG = fit(gG, BL.G, { x: pw + ow, y: 0, w: W - pw - ow, h: H }, 2.2);
        } else {
          const pw = Math.min(W * 0.3, H * BL.P.w / BL.P.h), T = Math.min(H * 0.32, W * 0.3);
          sP = fit(gP, BL.P, { x: 0, y: 0, w: pw, h: H }, 2.2);
          sO = fit(gOr, BL.O, { x: pw, y: 0, w: T, h: T }, 2);
          sL = fit(gL, BL.L, { x: pw + T, y: 0, w: W - pw - T, h: T }, 1.8);
          sG = fit(gG, BL.G, { x: pw, y: T, w: W - pw, h: H - T }, 2.2);
        }
        const k0 = Math.min(r.width / W, r.height / H);
        const fs = (base, s, min) => { const px = Math.max(min || 12.5, Math.min(base * 1.3, base * s * k0)); return (px / (s * k0)).toFixed(2) + 'px'; };
        svg.style.setProperty('--fs-g', fs(15, sG)); svg.style.setProperty('--fs-gv', fs(16, sG));
        svg.style.setProperty('--fs-tacca', fs(13, sP)); svg.style.setProperty('--fs-or', fs(12, sO, 9));
        svg.style.setProperty('--fs-let', fs(14, sL)); svg.style.setProperty('--fs-lett', fs(18, sL));
      }

      avviaLivello(livello);
      adatta();
      const ro = new ResizeObserver(adatta); ro.observe(radice); ro.observe(svg);

      return function smonta() {
        ro.disconnect();
        if (raf != null) cancelAnimationFrame(raf);
        clearInterval(tPlay); clearTimeout(tSalto);
      };
    }
  });
})();
