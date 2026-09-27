/* Laboratorio «Le tessere» — scomporre un polinomio componendo un rettangolo pieno.
   Tre tessere: il quadrato grande x² (lato x), la bacchetta x (x per 1), il quadratino 1.
   Il lato x vale 2,6 quadretti: di proposito NON è un numero intero, così una bacchetta non si
   confonde con tre quadratini e un lato che contiene x non si pareggia mai con pezzi da 1.
   Le posizioni sul tavolo sono tenute in forma esatta, come coppie [i, j] che valgono i + j·x:
   i lati della cornice si leggono direttamente come polinomi (x + 2, 2x + 3…) e il controllo
   «pieno, senza buchi né sovrapposizioni» non dipende da arrotondamenti.
   Aggancio: una tessera lasciata a meno di mezzo quadretto dal bordo di una vicina ci si accosta;
   altrimenti si ferma sui quadretti del tavolo. Nessuna calamita verso la soluzione.
   Schermata singola (SCHEMA-LAB.md): tavolo e vassoio stanno sempre nella scena; il vassoio va
   sopra o a destra, secondo dove le tessere vengono più grandi, e il tavolo si allarga nello
   spazio che avanza. Modalità libera: quante tessere x², x e 1 le sceglie lo studente.
   Contratto: SCHEMA-LAB.md — modelli: laboratori/bilancia.js, laboratori/canestro.js */
(function () {
  const STILE = `
    .lab-tessere [hidden] { display: none !important; }
    .lab-tessere .lab-scena { background: linear-gradient(180deg, var(--sup2), var(--sup)); overflow: hidden; touch-action: none; }
    .lab-tessere .lab-scena > svg { overflow: visible; }
    .lab-tessere .tavolo { fill: var(--sup); stroke: var(--bordo2); stroke-width: 1.5; filter: url(#lab-tessere-ombra); }
    .lab-tessere .quadretto { stroke: var(--bordo); stroke-width: 1; }
    .lab-tessere .pozzo { fill: var(--sup3); stroke: var(--bordo); stroke-width: 1.2; transition: fill .2s, stroke .2s; }
    .lab-tessere .pozzo.bersaglio { fill: var(--accento-tenue); stroke: var(--accento); stroke-width: 2; stroke-dasharray: 7 5; }
    .lab-tessere .conta rect { fill: var(--sup); stroke: var(--bordo2); stroke-width: 1; }
    .lab-tessere .conta text { fill: var(--testo2); font: 600 15px var(--font); }
    .lab-tessere .conta.zero text { fill: var(--testo3); }
    .lab-tessere .segnaposto { fill: none; stroke: var(--bordo2); stroke-width: 1.5; stroke-dasharray: 5 5; }
    .lab-tessere .pezzo { cursor: grab; }
    .lab-tessere .pezzo .corpo { stroke-width: 1.6; filter: url(#lab-tessere-ombra); }
    .lab-tessere .t-q .corpo { fill: color-mix(in srgb, var(--s1) 86%, var(--sup)); stroke: color-mix(in srgb, var(--s1) 58%, #000); }
    .lab-tessere .t-b .corpo { fill: var(--s3); stroke: color-mix(in srgb, var(--s3) 58%, #000); }
    .lab-tessere .t-u .corpo { fill: var(--s2); stroke: color-mix(in srgb, var(--s2) 58%, #000); }
    .lab-tessere .pezzo .luce { fill: none; stroke: rgba(255,255,255,.36); stroke-width: 1.4; }
    .lab-tessere .pezzo text { fill: #fff; font-family: var(--font); font-weight: 600; pointer-events: none; }
    .lab-tessere .pezzo .anello { fill: none; stroke: var(--testo); stroke-width: 2; stroke-dasharray: 6 4; opacity: 0; transition: opacity .2s; }
    .lab-tessere .pezzo.scelta .anello { opacity: .75; }
    .lab-tessere .pezzo.presa { cursor: grabbing; }
    .lab-tessere .pezzo.presa .corpo { filter: url(#lab-tessere-ombra-alta); }
    .lab-tessere .pila, .lab-tessere .in-volo { pointer-events: none; }
    .lab-tessere .fantasma { fill: color-mix(in srgb, var(--accento) 14%, transparent); stroke: var(--accento); stroke-width: 2; stroke-dasharray: 6 5; }
    .lab-tessere .tr-fondo { fill: color-mix(in srgb, var(--no) 10%, transparent); }
    .lab-tessere .tr-riga { stroke: var(--no); stroke-width: 2.6; opacity: .42; }
    .lab-tessere .cornice-bordo { fill: none; stroke: var(--testo2); stroke-width: 2; stroke-dasharray: 8 6; opacity: .8; }
    .lab-tessere .cornice-bordo.chiusa { stroke-dasharray: none; opacity: .9; }
    .lab-tessere .cornice-bordo.vinta { stroke: var(--ok); stroke-dasharray: none; stroke-width: 4; opacity: 1; }
    .lab-tessere .sovr { fill: color-mix(in srgb, var(--no) 38%, transparent); stroke: var(--no); stroke-width: 2; }
    .lab-tessere .quota line { stroke: var(--testo2); stroke-width: 1.5; }
    .lab-tessere .quota line.tacca { stroke-width: 1.2; opacity: .75; }
    .lab-tessere .quota rect { fill: var(--sup); stroke: var(--bordo2); stroke-width: 1.2; }
    .lab-tessere .quota text { fill: var(--testo); font: 600 17px var(--font); }
    .lab-tessere .quota.vinta line { stroke: var(--ok); }
    .lab-tessere .quota.vinta rect { stroke: var(--ok); stroke-width: 2; fill: var(--ok-tenue); }
    .lab-tessere .quota.vinta text { fill: var(--ok); }
    /* --- pannello --- */
    .lab-tessere .obiettivo { text-align: center; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); color: var(--testo2); line-height: 1.5; }
    .lab-tessere .obiettivo p { margin: 0; font-size: inherit; }
    .lab-tessere .obiettivo .katex { font-size: 1.25em; }   /* gli esponenti di KaTeX sono al 70%: così restano sopra i 12 px */
    .lab-tessere .obiettivo strong { color: var(--testo); }
    .lab-tessere .obiettivo .c-breve { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-tessere .obiettivo .c-breve { display: block; } .lab-tessere .obiettivo .c-breve + .c-lungo { display: none; } }
    .lab-tessere .formule { display: grid; gap: 1px; justify-content: center; }
    .lab-tessere .f-riga { display: flex; align-items: center; gap: 2px 8px; flex-wrap: wrap; min-height: 1.95em; }
    .lab-tessere .f-et { font-size: .75rem; letter-spacing: .04em; text-transform: uppercase; color: var(--testo2); min-width: 9.6em; }
    .lab-tessere .f-tex { font-size: 1.08rem; }
    .lab-tessere .f-obj { font-size: 1.2rem; }
    .lab-tessere .f-vuoto { font-size: .85rem; color: var(--testo3); }
    /* sul telefono le etichette si accorciano, così formula e cartellino stanno su una riga */
    @container lab (max-width: 520px) { .lab-tessere .f-et .lunga { display: none; } .lab-tessere .f-et { min-width: 7.8em; } }
    .lab-tessere .chip { display: inline-flex; align-items: center; gap: 4px; font-size: .8rem; padding: 1px 10px; border-radius: 999px; background: var(--sup2); border: 1px solid var(--bordo); color: var(--testo2); }
    .lab-tessere .chip.ok { background: var(--accento-tenue); color: var(--accento-testo); border-color: transparent; }
    .lab-tessere .chip.vinta { background: var(--ok-tenue); color: var(--ok); border-color: transparent; }
    .lab-tessere .chip.no { background: var(--no-tenue); color: var(--no); border-color: transparent; }
    .lab-tessere .chip .katex { font-size: 1.05em; }
    .lab-tessere .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-tessere.in-libero .lab-messaggio:empty { display: none; }
    .lab-tessere .vinto { display: inline-block; animation: lab-tessere-pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-tessere-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-tessere .lab-aiuto .consegna { color: var(--testo2); }
    .lab-tessere .lab-barra { padding: 0; border: 0; gap: 6px 8px; justify-content: center; flex-wrap: wrap; }
    .lab-tessere .lab-barra .btn { min-height: 40px; }
    .lab-tessere .lab-barra .btn[disabled] { opacity: .38; cursor: default; }
    .lab-tessere .b-ruota svg { width: 18px; height: 18px; }
    .lab-tessere .b-aiuto { min-width: 42px; }
    .lab-tessere .b-aiuto[aria-expanded="true"] { background: var(--accento-tenue); border-color: var(--accento); color: var(--accento-testo); }
    .lab-tessere .lab-parametri { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 14px; }
    .lab-tessere .lab-param .nome { font-weight: 600; min-width: 1.3em; }
  `;


  /* ---------------- misure ---------------- */
  const X = 2.6;          /* lato x, in quadretti: non intero di proposito */
  const U = 40;           /* unità SVG per quadretto */
  const EPS = 1e-6;
  const SOGLIA = 0.5;     /* entro mezzo quadretto una tessera si accosta al bordo di una vicina */
  const VICINO = 0.6;     /* quanto deve essere vicina, nell'altra direzione, perché conti come vicina */
  const PAD = 0.2;        /* margine di presa intorno alle tessere (il dito è grosso) */

  /* il tavolo sta sempre in (0; 0); il vassoio sopra (spazio verticale) o a destra (spazio largo).
     Si sceglie la disposizione in cui il quadretto viene più grande (al più U_MAX pixel), poi il
     tavolo si allarga fino a riempire la scena: 9 × 7 quadretti al minimo, abbastanza per ogni
     soluzione con le misure scritte intorno. */
  const U_MAX = 72;
  function disposizione(w, h) {
    const uSopra = Math.min(w / 9.5, h / 11.5, U_MAX), uDestra = Math.min(w / 13.4, h / 10.6, U_MAX);
    const sopra = uSopra > uDestra + 0.5 || (Math.abs(uSopra - uDestra) <= 0.5 && w / h < 1.2);
    if (sopra) {
      const u = uSopra;
      const W = Math.max(9, Math.min(16, Math.floor(w / u - 0.5 + 1e-6))), H = Math.max(7, Math.min(12, Math.floor(h / u - 4.5 + 1e-6)));
      const o = (W - 9) / 2;
      return { chiave: 's' + W + 'x' + H, W, H, vb: [-0.25, -4.25, W + 0.5, H + 4.5],
        pozzi: { q: [o, -4, 3.1, 3.7], b: [o + 3.3, -4, 3.5, 3.7], u: [o + 7, -4, 2, 3.7] } };
    }
    const u = uDestra;
    const W = Math.max(9, Math.min(18, Math.floor(w / u - 4.4 + 1e-6))), H = Math.max(10, Math.min(13, Math.floor(h / u - 0.6 + 1e-6)));
    const x = W + 0.4;
    return { chiave: 'd' + W + 'x' + H, W, H, vb: [-0.3, -0.3, W + 4.4, H + 0.6],
      pozzi: { q: [x, 0, 3.4, 3.7], b: [x, 3.9, 3.4, 3.7], u: [x, 7.8, 3.4, 2.2] } };
  }

  /* ---------------- coppie esatte [i, j] = i + j·x ---------------- */
  const V = p => p[0] + p[1] * X;
  const piu = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const meno = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const pari = (a, b) => a[0] === b[0] && a[1] === b[1];
  const UNO = [1, 0], ICS = [0, 1];
  /* [larghezza, altezza] di una tessera; una bacchetta girata è in piedi (1 per x) */
  function misure(tipo, rot) {
    if (tipo === 'q') return [ICS, ICS];
    if (tipo === 'u') return [UNO, UNO];
    return rot ? [UNO, ICS] : [ICS, UNO];
  }
  const scarto = (a0, a1, b0, b1) => Math.max(0, Math.max(a0, b0) - Math.min(a1, b1));

  /* ---------------- scrittura ---------------- */
  function lin(p) {                     /* [i, j] → «jx + i» */
    const i = p[0], j = p[1]; let s = '';
    if (j) s = (j === 1 ? '' : j === -1 ? '-' : String(j)) + 'x';
    if (i) s += s ? (i > 0 ? ' + ' : ' - ') + Math.abs(i) : String(i);
    return s || '0';
  }
  function poli(c) {                    /* [a, b, c] → ax² + bx + c */
    let s = '';
    [[c[0], 'x^2'], [c[1], 'x'], [c[2], '']].forEach(([k, m]) => {
      if (!k) return;
      const a = Math.abs(k), corpo = (a === 1 && m ? '' : String(a)) + m;
      s += s ? (k > 0 ? ' + ' : ' - ') + corpo : (k < 0 ? '-' : '') + corpo;
    });
    return s || '0';
  }
  const prodotto = (w, h) => [w[1] * h[1], w[0] * h[1] + w[1] * h[0], w[0] * h[0]];
  /* base e altezza come prodotto di fattori, nell'ordine dei libri: prima i monomi, poi i binomi */
  function fattori(w, h) {
    const mono = p => !(p[0] && p[1]);
    const [p, q] = [w, h].sort((a, b) => (mono(b) - mono(a)) || (a[1] - b[1]) || (a[0] - b[0]));
    if (mono(p) && mono(q)) return lin(p) + ' \\cdot ' + lin(q);
    if (pari(p, q)) return '(' + lin(p) + ')^2';
    if (mono(p)) return (pari(p, UNO) ? '1 \\cdot ' : lin(p)) + '(' + lin(q) + ')';
    return '(' + lin(p) + ')(' + lin(q) + ')';
  }
  const piano = s => s.replace(/ \\cdot /g, ' · ').replace(/\^2/g, '²').replace(/-/g, '−');

  /* ---------------- livelli ----------------
     q = quadrati grandi, b = bacchette, u = quadratini (Infinity: quanti se ne vogliono).
     Soluzioni (tutte uniche a meno di girare il rettangolo):
       1) 2(x + 3)   2) (x + 1)(x + 2)   3) (x + 2)(x + 3)   4) (x + 2)²   5) (x + 1)(2x + 3)   6) (x + 3)² con 9 quadratini */
  const LIVELLI = [
    { q: 0, b: 2, u: 6,
      testo: 'Componi un rettangolo pieno con **tutte** le tessere di $2x + 6$: niente vuoti e niente tessere una sopra l\'altra.',
      bravo: 'Due strisce uguali, ognuna lunga x + 3: quindi 2x + 6 = 2(x + 3). Il 2 raccolto davanti alla parentesi è lo spessore del rettangolo.' },
    { q: 1, b: 3, u: 2,
      testo: 'Arriva il quadrato grande. Rettangolo pieno con tutte le tessere di $x^2 + 3x + 2$.',
      bravo: 'Le bacchette si sono divise, una da un lato del quadrato e due dall\'altro. Nell\'angolo ci stanno 1 · 2 = 2 quadratini: x² + 3x + 2 = (x + 1)(x + 2).' },
    { q: 1, b: 5, u: 6,
      testo: 'Più bacchette e più quadratini: $x^2 + 5x + 6$.',
      bravo: 'Cinque bacchette divise in 2 e 3, e nell\'angolo 2 · 3 = 6 quadratini. Per scomporre x² + 5x + 6 servivano due numeri con somma 5 e prodotto 6.' },
    { q: 1, b: 4, u: 4,
      testo: 'Le tessere di $x^2 + 4x + 4$. Quando hai finito, guarda che forma è venuta.',
      bravo: 'Due bacchette per lato, e il rettangolo è venuto quadrato: x² + 4x + 4 = (x + 2)². Le due strisce da 2x sono il doppio prodotto del quadrato di binomio.' },
    { q: 2, b: 5, u: 3,
      testo: 'Due quadrati grandi: $2x^2 + 5x + 3$.',
      bravo: 'Con due quadrati grandi un lato misura 2x + 3 e l\'altro x + 1. Il 2 di 2x² sta tutto in uno dei due fattori.' },
    { q: 1, b: 6, u: Infinity, quadrato: true,
      testo: 'I quadratini qui li scegli tu, quanti ne vuoi: aggiungili a $x^2 + 6x$ in modo che le tessere formino un **quadrato** pieno.',
      bravo: 'Tre bacchette per lato e un quadrato 3 × 3 nell\'angolo: x² + 6x + 9 = (x + 3)². Il numero che completa il quadrato è il quadrato di metà delle bacchette, (6 : 2)² = 9.' }
  ];

  const AIUTO = [
    '**Come si muovono.** Trascina le tessere dal vassoio al tavolo. Se le lasci vicino al bordo di un\'altra tessera ci si accostano, altrimenti si fermano sui quadretti. Una bacchetta sul tavolo si gira toccandola, oppure con *Ruota*; toccando il mucchio delle bacchette nel vassoio le prendi già girate. Per togliere una tessera, riportala nel vassoio.',
    '**Le misure.** Il quadratino ha lato $1$. La bacchetta è lunga $x$ e larga $1$, il quadrato grande ha lato $x$. Qui $x$ non è un numero intero di quadretti: tre quadratini in fila non fanno una bacchetta.',
    '**Quando è giusto.** Le tessere devono formare un rettangolo pieno: niente vuoti (a righe) e niente sovrapposizioni (in rosso). Allora l\'area delle tessere, cioè il polinomio, è uguale a base per altezza, e i due lati misurati sono i fattori.'
  ].join('\n\n');

  /* consegne brevi per il telefono in verticale: quella intera si legge nel «?». null = già corta */
  const BREVI = [
    'Un rettangolo pieno con **tutte** le tessere di $2x + 6$.',
    'Rettangolo pieno con tutte le tessere di $x^2 + 3x + 2$.',
    null,
    null,
    null,
    'Aggiungi a $x^2 + 6x$ i quadratini che vuoi, per formare un **quadrato** pieno.'
  ];
  const MAX_LIBERO = { q: 4, b: 12, u: 20 };

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const imposta = (e, a) => { for (const k in a) e.setAttribute(k, typeof a[k] === 'number' ? +a[k].toFixed(2) : a[k]); };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };

  COMPASSO.registraLab({
    id: 'tessere',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-tessere')) { const s = document.createElement('style'); s.id = 'stile-lab-tessere'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-tessere');
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="lab-aiuto" hidden data-scorre><div class="consegna" hidden></div><div class="testo-aiuto"></div><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: scegli tu quante tessere avere">Libero</button></div>
            <div class="obiettivo"></div>
            <div class="lab-parametri" hidden>
              ${[['q', 'x²', 'quadrati grandi'], ['b', 'x', 'bacchette'], ['u', '1', 'quadratini']].map(([k, n, a]) => `<div class="lab-param" data-p="${k}"><span class="nome">${n}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="un ${a.slice(0, -1)}o in meno">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="un ${a.slice(0, -1)}o in più">+</button></div>`).join('')}
            </div>
            <div class="formule">
              <div class="f-riga"><span class="f-et">da scomporre</span><span class="f-tex f-obj"></span></div>
              <div class="f-riga"><span class="f-et">base × altezza</span><span class="f-tex f-cor"></span></div>
              <div class="f-riga"><span class="f-et"><span class="lunga">area delle </span>tessere</span><span class="f-tex f-tav"></span><span class="f-chip"></span></div>
            </div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <button type="button" class="btn b-ruota" title="Gira la bacchetta scelta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>Ruota</button>
              <button type="button" class="btn piccolo b-ric">Ricomincia</button>
              <button type="button" class="btn piccolo b-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo b-aiuto" aria-expanded="false" aria-label="Come si gioca" title="Come si gioca">?</button>
            </div>
          </div>
        </div>`;

      const $ = s => radice.querySelector(s);
      const scena = $('.lab-scena'), objEl = $('.obiettivo'), fObj = $('.f-obj'), fCor = $('.f-cor'), fTav = $('.f-tav'), fChip = $('.f-chip');
      const msg = $('.lab-messaggio'), aiutoEl = $('.lab-aiuto');
      const bRuota = $('.b-ruota'), bRic = $('.b-ric'), bAiuto = $('.b-aiuto'), bCasuale = $('.b-casuale');
      const livelliEl = $('.lab-livelli'), bLibero = $('.lab-libero'), parametriEl = $('.lab-parametri');
      aiutoEl.querySelector('.testo-aiuto').innerHTML = ctx.md(AIUTO);

      /* ---------------- scena SVG, a strati ---------------- */
      const svg = el('svg', { role: 'img', preserveAspectRatio: 'xMidYMid meet', 'aria-label': 'Tavolo a quadretti con le tessere algebriche e il vassoio' });
      scena.insertBefore(svg, aiutoEl);
      const defs = el('defs'); svg.appendChild(defs);
      defs.innerHTML =
        '<filter id="lab-tessere-ombra" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.5" flood-color="#000" flood-opacity=".2"/></filter>' +
        '<filter id="lab-tessere-ombra-alta" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity=".3"/></filter>' +
        '<pattern id="lab-tessere-tratteggio" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect class="tr-fondo" width="9" height="9"/><line class="tr-riga" x1="0" y1="0" x2="0" y2="9"/></pattern>';
      const strato = () => { const g = el('g'); svg.appendChild(g); return g; };
      const gFondo = strato(), gPile = strato(), gBuchi = strato(), gTessere = strato(), gSovr = strato(),
        gFant = strato(), gQuote = strato(), gFesta = strato(), gMano = strato();

      /* ---------------- stato ---------------- */
      let D = null;                 /* disposizione corrente */
      let livello = 0, vassoio = null, tavolo = [], presa = null, scelta = null, vinto = false;
      let girate = false;           /* le bacchette nel vassoio sono in piedi? */
      let raf = 0, festa = null, avvisi = {}, ultimo = null;
      let libero = false, salvato = null, kit = { q: 1, b: 3, u: 2 };   /* modalità libera: le tessere scelte dallo studente */
      const liv = () => libero ? kit : LIVELLI[livello];
      const animati = new Set();
      const pozziEl = {};
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = 0;

      /* ---------------- fondo: tavolo e vassoio ---------------- */
      function costruisciFondo() {
        vuota(gFondo);
        const vb = D.vb;
        svg.setAttribute('viewBox', vb.map(v => +(v * U).toFixed(2)).join(' '));
        gFondo.appendChild(el('rect', { class: 'tavolo', x: 0, y: 0, width: D.W * U, height: D.H * U, rx: 12 }));
        for (let i = 1; i < D.W; i++) gFondo.appendChild(el('line', { class: 'quadretto', x1: i * U, y1: 3, x2: i * U, y2: D.H * U - 3 }));
        for (let i = 1; i < D.H; i++) gFondo.appendChild(el('line', { class: 'quadretto', x1: 3, y1: i * U, x2: D.W * U - 3, y2: i * U }));
        ['q', 'b', 'u'].forEach(tipo => {
          const [x, y, w, h] = D.pozzi[tipo];
          pozziEl[tipo] = el('rect', { class: 'pozzo', 'data-tipo': tipo, x: x * U, y: y * U, width: w * U, height: h * U, rx: 14 });
          gFondo.appendChild(pozziEl[tipo]);
        });
      }

      /* ---------------- una tessera ---------------- */
      function grafica(tipo) {
        const g = el('g', { class: 'pezzo t-' + tipo, 'data-tipo': tipo });
        g.appendChild(el('rect', { class: 'anello', rx: 8 }));
        g.appendChild(el('rect', { class: 'corpo', rx: 6 }));
        g.appendChild(el('rect', { class: 'luce', rx: 4 }));
        g.appendChild(el('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central' }, tipo === 'q' ? 'x²' : tipo === 'b' ? 'x' : '1'));
        return g;
      }
      function forma(g, tipo, w, h) {    /* w, h in quadretti */
        const W = w * U, H = h * U, c = g.children;
        imposta(c[0], { x: -4, y: -4, width: W + 8, height: H + 8 });
        imposta(c[1], { x: 1, y: 1, width: Math.max(0, W - 2), height: Math.max(0, H - 2) });
        imposta(c[2], { x: 3.5, y: 3.5, width: Math.max(0, W - 7), height: Math.max(0, H - 7) });
        imposta(c[3], { x: W / 2, y: H / 2 + 1, 'font-size': tipo === 'q' ? 26 : 19 });
      }
      function nuova(tipo, rot, x, y) {
        const m = misure(tipo, rot);
        const t = { tipo, rot, pos: null, dx: x, dy: y, dw: V(m[0]), dh: V(m[1]), g: grafica(tipo), tw: null, scala: 1 };
        gTessere.appendChild(t.g); disegna(t);
        return t;
      }
      function disegna(t) {
        let tr = 'translate(' + (t.dx * U).toFixed(2) + ' ' + (t.dy * U).toFixed(2) + ')';
        if (t.scala !== 1) { const cx = (t.dw * U / 2).toFixed(2), cy = (t.dh * U / 2).toFixed(2); tr += ` translate(${cx} ${cy}) scale(${t.scala.toFixed(4)}) translate(${-cx} ${-cy})`; }
        t.g.setAttribute('transform', tr);
        forma(t.g, t.tipo, t.dw, t.dh);
      }
      const doveLogico = t => { const m = misure(t.tipo, t.rot); return { x: V(t.pos.x), y: V(t.pos.y), w: V(m[0]), h: V(m[1]) }; };

      /* ---------------- il vassoio: tre mucchi con il conto ---------------- */
      function cima(tipo) {
        const [x, y, w, h] = D.pozzi[tipo], m = misure(tipo, tipo === 'b' && girate);
        return { x: x + (w - V(m[0]) - 0.14) / 2, y: y + 0.2 + (h - 0.95 - V(m[1]) - 0.18) / 2 };
      }
      function disegnaPile() {
        vuota(gPile);
        ['q', 'b', 'u'].forEach(tipo => {
          const n = vassoio[tipo], c = cima(tipo), m = misure(tipo, tipo === 'b' && girate), [x, y, w, h] = D.pozzi[tipo];
          const vis = n === Infinity ? 3 : Math.min(n, 3);
          if (!vis) gPile.appendChild(el('rect', { class: 'segnaposto', x: c.x * U, y: c.y * U, width: V(m[0]) * U, height: V(m[1]) * U, rx: 6 }));
          for (let k = vis - 1; k >= 0; k--) {
            const g = grafica(tipo); g.classList.add('pila'); if (!k) g.classList.add('cima');
            forma(g, tipo, V(m[0]), V(m[1]));
            g.setAttribute('transform', 'translate(' + ((c.x + k * 0.07) * U).toFixed(2) + ' ' + ((c.y + k * 0.09) * U).toFixed(2) + ')');
            gPile.appendChild(g);
          }
          const testo = n === Infinity ? '× ∞' : '× ' + n;
          const cx = (x + w / 2) * U, cy = (y + h - 0.42) * U, lw = testo.length * 8.6 + 22;
          const gc = el('g', { class: 'conta' + (n === 0 ? ' zero' : '') });
          gc.appendChild(el('rect', { x: cx - lw / 2, y: cy - 13, width: lw, height: 26, rx: 13 }));
          gc.appendChild(el('text', { x: cx, y: cy + 5.5, 'text-anchor': 'middle' }, testo));
          gPile.appendChild(gc);
        });
      }

      /* ---------------- la cornice: rettangolo che contiene le tessere del tavolo ----------------
         sost = { t, pos } fa finta che la tessera t stia in pos (pos null: fuori dal tavolo). */
      function esito(sost) {
        const voci = [];
        tavolo.forEach(t => { if (!sost || sost.t !== t) voci.push({ t, x: t.pos.x, y: t.pos.y, m: misure(t.tipo, t.rot) }); });
        if (sost && sost.pos) voci.push({ t: sost.t, x: sost.pos.x, y: sost.pos.y, m: misure(sost.t.tipo, sost.t.rot) });
        const es = { n: voci.length, conta: { q: 0, b: 0, u: 0 }, voci, sovr: [], buchi: [], pieno: false };
        if (!voci.length) return es;
        let sx = null, dx = null, su = null, gi = null, area = 0;
        voci.forEach(v => {
          es.conta[v.t.tipo]++;
          const r = piu(v.x, v.m[0]), b = piu(v.y, v.m[1]);
          if (!sx || V(v.x) < V(sx) - EPS) sx = v.x;
          if (!dx || V(r) > V(dx) + EPS) dx = r;
          if (!su || V(v.y) < V(su) - EPS) su = v.y;
          if (!gi || V(b) > V(gi) + EPS) gi = b;
          v.r = [V(v.x), V(r), V(v.y), V(b)];
          area += V(v.m[0]) * V(v.m[1]);
        });
        for (let i = 0; i < voci.length; i++) for (let k = i + 1; k < voci.length; k++) {
          const a = voci[i].r, b = voci[k].r;
          const x0 = Math.max(a[0], b[0]), x1 = Math.min(a[1], b[1]), y0 = Math.max(a[2], b[2]), y1 = Math.min(a[3], b[3]);
          if (x1 - x0 > EPS && y1 - y0 > EPS) es.sovr.push([x0, x1, y0, y1]);
        }
        Object.assign(es, { sx, dx, su, gi, w: meno(dx, sx), h: meno(gi, su) });
        es.areaC = V(es.w) * V(es.h);
        es.pieno = !es.sovr.length && Math.abs(es.areaC - area) < 1e-6;
        es.poliC = prodotto(es.w, es.h);
        es.poliT = [es.conta.q, es.conta.b, es.conta.u];
        /* i vuoti: si taglia la cornice lungo tutti i bordi delle tessere e si guardano le celle scoperte */
        if (!es.pieno) {
          const xs = [...new Set(voci.flatMap(v => [v.r[0], v.r[1]]).map(v => +v.toFixed(6)))].sort((a, b) => a - b);
          const ys = [...new Set(voci.flatMap(v => [v.r[2], v.r[3]]).map(v => +v.toFixed(6)))].sort((a, b) => a - b);
          for (let i = 0; i + 1 < xs.length; i++) for (let k = 0; k + 1 < ys.length; k++) {
            const cx = (xs[i] + xs[i + 1]) / 2, cy = (ys[k] + ys[k + 1]) / 2;
            if (!voci.some(v => cx > v.r[0] && cx < v.r[1] && cy > v.r[2] && cy < v.r[3])) es.buchi.push([xs[i], xs[i + 1], ys[k], ys[k + 1]]);
          }
        }
        return es;
      }

      /* ---------------- disegno della cornice, delle misure e delle formule ---------------- */
      function quota(orizz, fisso, a, b, interni, testo, cls, inPiedi) {
        const g = el('g', { class: cls });
        const P = (s, o) => orizz ? [s * U, fisso * U + o] : [fisso * U + o, s * U];
        const seg = (s, l, c) => { const p1 = P(s, -l), p2 = P(s, l); g.appendChild(el('line', { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], class: c || '' })); };
        const q1 = P(a, 0), q2 = P(b, 0);
        g.appendChild(el('line', { x1: q1[0], y1: q1[1], x2: q2[0], y2: q2[1] }));
        seg(a, 8); seg(b, 8); interni.forEach(s => seg(s, 5, 'tacca'));
        const lw = testo.length * 9.6 + 20, c = P((a + b) / 2, 0);
        const giro = inPiedi ? { transform: 'rotate(-90 ' + c[0].toFixed(1) + ' ' + c[1].toFixed(1) + ')' } : {};
        g.appendChild(el('rect', Object.assign({ x: c[0] - lw / 2, y: c[1] - 14, width: lw, height: 28, rx: 14 }, giro)));
        g.appendChild(el('text', Object.assign({ x: c[0], y: c[1] + 6, 'text-anchor': 'middle' }, giro), testo));
        gQuote.appendChild(g);
      }
      function quote(es) {
        const X0 = V(es.sx), X1 = V(es.dx), Y0 = V(es.su), Y1 = V(es.gi), cls = 'quota' + (vinto ? ' vinta' : '');
        const vicini = (a, b) => Math.abs(a - b) < EPS;
        /* la base: sopra la cornice se c'è posto, se no sotto, se no dentro */
        const tb = piano(lin(es.w));
        let yq, riga;
        if (Y0 >= 0.75) { yq = Y0 - 0.45; riga = es.voci.filter(v => vicini(v.r[2], Y0)); }
        else if (Y1 <= D.H - 0.75) { yq = Y1 + 0.45; riga = es.voci.filter(v => vicini(v.r[3], Y1)); }
        else { yq = Y0 + 0.5; riga = es.voci.filter(v => vicini(v.r[2], Y0)); }
        const tx = [...new Set(riga.flatMap(v => [v.r[0], v.r[1]]).map(v => +v.toFixed(6)))].filter(v => v > X0 + EPS && v < X1 - EPS);
        quota(true, yq, X0, X1, tx, tb, cls);
        /* l'altezza: a sinistra se c'è posto, se no a destra, se no dentro */
        const th = piano(lin(es.h)), lu = (th.length * 9.6 + 20) / U;
        /* l'etichetta non deve coprire la cornice: orizzontale se c'è posto, se no scritta in piedi, se no dentro */
        let xq, col, inPiedi = false;
        const off = lu / 2 + 0.2, sin = () => es.voci.filter(v => vicini(v.r[0], X0)), des = () => es.voci.filter(v => vicini(v.r[1], X1));
        if (X0 - off - lu / 2 >= -0.2) { xq = X0 - off; col = sin(); }
        else if (X1 + off + lu / 2 <= D.W + 0.2) { xq = X1 + off; col = des(); }
        else if (X0 >= 0.75 && Y1 - Y0 >= lu + 0.3) { xq = X0 - 0.4; col = sin(); inPiedi = true; }
        else if (X1 + 0.75 <= D.W + 0.2 && Y1 - Y0 >= lu + 0.3) { xq = X1 + 0.4; col = des(); inPiedi = true; }
        else { xq = X0 + lu / 2 + 0.15; col = sin(); }
        const ty = [...new Set(col.flatMap(v => [v.r[2], v.r[3]]).map(v => +v.toFixed(6)))].filter(v => v > Y0 + EPS && v < Y1 - EPS);
        quota(false, xq, Y0, Y1, ty, th, cls, inPiedi);
      }
      function testoObiettivo(es) {
        const L = liv();
        if (L.u === Infinity) return 'x^2 + ' + L.b + 'x + \\boxed{' + (es && es.conta.u ? es.conta.u : '\\,?\\,') + '}';
        return poli([L.q, L.b, L.u]);
      }
      function formule(es) {
        fObj.innerHTML = ctx.tex(testoObiettivo(es) + (vinto ? ' = ' + fattori(es.w, es.h) : ''));
        if (!es.n) {
          fCor.innerHTML = '<span class="f-vuoto">il tavolo è vuoto</span>'; fTav.innerHTML = ''; fChip.innerHTML = ''; return;
        }
        fCor.innerHTML = ctx.tex(fattori(es.w, es.h) + ' = ' + poli(es.poliC));
        fTav.innerHTML = ctx.tex(poli(es.poliT));
        let chip;
        if (es.sovr.length) chip = '<span class="chip no">tessere sovrapposte</span>';
        else if (es.pieno) chip = '<span class="chip ' + (vinto ? 'vinta' : 'ok') + '">' + (pari(es.w, es.h) ? 'quadrato pieno' : 'rettangolo pieno') + '</span>';
        else {
          const d = es.poliC.map((c, i) => c - es.poliT[i]);
          chip = d.every(c => c >= 0) ? '<span class="chip">vuoti: ' + ctx.tex(poli(d)) + '</span>' : '<span class="chip">ci sono vuoti</span>';
        }
        fChip.innerHTML = chip;
      }
      function aggiorna(es) {
        ultimo = es;
        vuota(gBuchi); vuota(gSovr); vuota(gQuote);
        if (es.n) {
          es.buchi.forEach(r => gBuchi.appendChild(el('rect', { x: r[0] * U, y: r[2] * U, width: (r[1] - r[0]) * U, height: (r[3] - r[2]) * U, fill: 'url(#lab-tessere-tratteggio)' })));
          es.sovr.forEach(r => gSovr.appendChild(el('rect', { class: 'sovr', x: r[0] * U, y: r[2] * U, width: (r[1] - r[0]) * U, height: (r[3] - r[2]) * U, rx: 3 })));
          const X0 = V(es.sx) * U, X1 = V(es.dx) * U, Y0 = V(es.su) * U, Y1 = V(es.gi) * U;
          gQuote.appendChild(el('rect', { class: 'cornice-bordo' + (vinto ? ' vinta' : es.pieno ? ' chiusa' : ''), x: X0 - 3, y: Y0 - 3, width: X1 - X0 + 6, height: Y1 - Y0 + 6, rx: 8 }));
          quote(es);
        }
        formule(es);
      }

      /* ---------------- movimento: un solo ciclo requestAnimationFrame ---------------- */
      function vai(t, a, dur, fine) {
        t.tw = { t0: performance.now(), dur, da: { x: t.dx, y: t.dy, w: t.dw, h: t.dh }, a, fine };
        animati.add(t); avvia();
      }
      function avvia() { if (!raf) raf = requestAnimationFrame(ciclo); }
      function ciclo(ora) {
        raf = 0; let ancora = false;
        animati.forEach(t => {
          const tw = t.tw; if (!tw) { animati.delete(t); return; }
          const u = Math.max(0, Math.min(1, (ora - tw.t0) / tw.dur)), e = 1 - Math.pow(1 - u, 3);
          t.dx = tw.da.x + (tw.a.x - tw.da.x) * e; t.dy = tw.da.y + (tw.a.y - tw.da.y) * e;
          t.dw = tw.da.w + (tw.a.w - tw.da.w) * e; t.dh = tw.da.h + (tw.a.h - tw.da.h) * e;
          disegna(t);
          if (u >= 1) { t.tw = null; animati.delete(t); if (tw.fine) tw.fine(); } else ancora = true;
        });
        if (festa && passoFesta(ora)) ancora = true;
        if (ancora && !raf) raf = requestAnimationFrame(ciclo);
      }

      /* la festa: le tessere si gonfiano a onda e qualche coriandolo esce dalla cornice (< 600 ms) */
      function avviaFesta(es) {
        vuota(gFesta);
        const X0 = V(es.sx), X1 = V(es.dx), Y0 = V(es.su), Y1 = V(es.gi), cx = (X0 + X1) / 2, cy = (Y0 + Y1) / 2;
        const ordinate = tavolo.slice().sort((a, b) => (V(a.pos.x) + V(a.pos.y)) - (V(b.pos.x) + V(b.pos.y)));
        const colori = ['var(--s1)', 'var(--s3)', 'var(--s2)', 'var(--ok)'];
        const scintille = [];
        for (let i = 0; i < 20; i++) {
          const ang = (i / 20) * Math.PI * 2 + Math.random() * 0.25, co = Math.cos(ang), si = Math.sin(ang);
          const x = cx + co * (X1 - X0) / 2, y = cy + si * (Y1 - Y0) / 2, v = 0.7 + Math.random() * 0.9;
          const e = el('rect', { x: -5, y: -5, width: 10, height: 10, rx: 2.5, fill: colori[i % colori.length] });
          gFesta.appendChild(e);
          scintille.push({ e, x, y, vx: co * v, vy: si * v, r: Math.random() * 90 });
        }
        festa = { t0: performance.now(), ordinate, passo: Math.min(35, 240 / Math.max(1, ordinate.length)), scintille };
        avvia();
      }
      function passoFesta(ora) {
        const dt = ora - festa.t0; let vivo = false;
        festa.ordinate.forEach((t, i) => {
          const u = Math.max(0, Math.min(1, (dt - i * festa.passo) / 320));
          t.scala = 1 + 0.08 * Math.sin(Math.PI * u); if (u < 1) vivo = true; disegna(t);
        });
        const u = Math.max(0, Math.min(1, dt / 560)), e = 1 - Math.pow(1 - u, 2);
        festa.scintille.forEach(s => {
          s.e.setAttribute('transform', 'translate(' + ((s.x + s.vx * e) * U).toFixed(1) + ' ' + ((s.y + s.vy * e) * U).toFixed(1) + ') rotate(' + (s.r + 220 * e).toFixed(1) + ')');
          s.e.setAttribute('opacity', (1 - u).toFixed(3));
        });
        if (u < 1) vivo = true;
        if (!vivo) { festa.ordinate.forEach(t => { t.scala = 1; disegna(t); }); vuota(gFesta); festa = null; }
        return vivo;
      }

      /* ---------------- aggancio ----------------
         Per ogni asse: i bordi delle tessere vicine (a filo o di fianco) a meno di SOGLIA;
         se non ce n'è nessuno, il quadretto più vicino. Mai fuori dal tavolo. */
      function scegliAsse(raw, lung, limite, cand) {
        let best = null, bd = SOGLIA;
        cand.forEach(c => { const v = V(c); if (v < -EPS || v + lung > limite + EPS) return; const d = Math.abs(v - raw); if (d < bd) { bd = d; best = c; } });
        if (!best) best = [Math.round(raw), 0];
        if (V(best) < 0) best = [0, 0];
        if (V(best) + lung > limite + EPS) best = [Math.floor(limite - lung + EPS), 0];
        return best;
      }
      function aggancia(t, rx, ry) {
        const [w, h] = misure(t.tipo, t.rot), wv = V(w), hv = V(h), cx = [], cy = [];
        tavolo.forEach(s => {
          if (s === t) return;
          const [sw, sh] = misure(s.tipo, s.rot), sx0 = V(s.pos.x), sy0 = V(s.pos.y);
          if (scarto(ry, ry + hv, sy0, sy0 + V(sh)) < VICINO) cx.push(s.pos.x, piu(s.pos.x, sw), meno(s.pos.x, w), meno(piu(s.pos.x, sw), w));
          if (scarto(rx, rx + wv, sx0, sx0 + V(sw)) < VICINO) cy.push(s.pos.y, piu(s.pos.y, sh), meno(s.pos.y, h), meno(piu(s.pos.y, sh), h));
        });
        return { x: scegliAsse(rx, wv, D.W, cx), y: scegliAsse(ry, hv, D.H, cy) };
      }
      function destinazione(t) {      /* dove atterra la tessera se la lasci adesso (null: nel vassoio) */
        const cx = t.dx + t.dw / 2, cy = t.dy + t.dh / 2;
        if (cx < -0.35 || cy < -0.35 || cx > D.W + 0.35 || cy > D.H + 0.35) return null;
        return aggancia(t, t.dx, t.dy);
      }

      /* ---------------- dito e mouse ---------------- */
      function punto(ev) {
        const m = svg.getScreenCTM(); if (!m) return { x: -99, y: -99 };
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
        return { x: p.x / U, y: p.y / U };
      }
      function colpita(p) {
        let migliore = null, md = PAD;
        for (let i = tavolo.length - 1; i >= 0; i--) {
          const t = tavolo[i];
          const ex = Math.max(t.dx - p.x, 0, p.x - (t.dx + t.dw)), ey = Math.max(t.dy - p.y, 0, p.y - (t.dy + t.dh)), d = Math.hypot(ex, ey);
          if (d === 0) return t;
          if (d < md) { md = d; migliore = t; }
        }
        return migliore;
      }
      function pozzoIn(p) {
        for (const tipo of ['q', 'b', 'u']) { const [x, y, w, h] = D.pozzi[tipo]; if (p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h) return tipo; }
        return null;
      }
      function scegli(t) {
        if (scelta && scelta.g) scelta.g.classList.remove('scelta');
        scelta = t && t.tipo === 'b' ? t : null;
        if (scelta) scelta.g.classList.add('scelta');
        aggiornaPulsanti();
      }
      function aggiornaPulsanti() { bRuota.disabled = vinto || !scelta || !scelta.pos; }
      function evidenziaPozzo(tipo) { ['q', 'b', 'u'].forEach(k => pozziEl[k] && pozziEl[k].classList.toggle('bersaglio', k === tipo)); }
      function disegnaFantasma(t, dest) {
        vuota(gFant);
        if (!dest) return;
        const m = misure(t.tipo, t.rot);
        gFant.appendChild(el('rect', { class: 'fantasma', x: V(dest.x) * U + 1, y: V(dest.y) * U + 1, width: V(m[0]) * U - 2, height: V(m[1]) * U - 2, rx: 6 }));
      }

      function giu(ev) {
        if (presa || vinto || !D || (ev.button !== undefined && ev.button > 0)) return;
        const p = punto(ev);
        let t = colpita(p), daVassoio = false;
        if (!t) {
          const tipo = pozzoIn(p);
          if (!tipo || !(vassoio[tipo] > 0)) return;
          const c = cima(tipo);
          t = nuova(tipo, tipo === 'b' && girate, c.x, c.y); daVassoio = true;
          if (vassoio[tipo] !== Infinity) vassoio[tipo]--;
          disegnaPile();
        }
        if (t.tw) { t.tw = null; animati.delete(t); }
        const m = misure(t.tipo, t.rot); t.dw = V(m[0]); t.dh = V(m[1]); t.scala = 1;
        if (!daVassoio) { t.dx = V(t.pos.x); t.dy = V(t.pos.y); }
        disegna(t);
        presa = { t, id: ev.pointerId, ox: p.x - t.dx, oy: p.y - t.dy, cx: ev.clientX, cy: ev.clientY, mosso: false, daVassoio,
          alza: ev.pointerType === 'touch' ? 0.55 : 0, dest: undefined };
        gMano.appendChild(t.g); t.g.classList.add('presa');
        scegli(t);
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!presa || ev.pointerId !== presa.id) return;
        if (!presa.mosso) { if (Math.hypot(ev.clientX - presa.cx, ev.clientY - presa.cy) < 6) return; presa.mosso = true; }
        const p = punto(ev), t = presa.t;
        t.dx = p.x - presa.ox; t.dy = p.y - presa.oy - presa.alza;   /* col dito la tessera sta un po' sopra, per vederla */
        disegna(t);
        const dest = destinazione(t), chiave = dest ? dest.x.join() + '|' + dest.y.join() : 'via';
        if (chiave !== presa.dest) {
          presa.dest = chiave;
          disegnaFantasma(t, dest);
          aggiorna(esito({ t, pos: dest }));
          evidenziaPozzo(dest ? null : t.tipo);
        }
        ev.preventDefault();
      }
      function molla(ev) {
        if (!presa || ev.pointerId !== presa.id) return;
        const { t, mosso, daVassoio } = presa; presa = null;
        t.g.classList.remove('presa'); gTessere.appendChild(t.g); vuota(gFant); evidenziaPozzo(null);
        if (!mosso) {                             /* un tocco */
          if (daVassoio) {
            rientra(t, false);
            if (t.tipo === 'b') { girate = !girate; disegnaPile(); }   /* tocco sul mucchio: le bacchette si girano */
          } else if (t.tipo === 'b') { ruota(t); return; }
          valuta(); return;
        }
        const dest = destinazione(t);
        const i = tavolo.indexOf(t); if (i >= 0) tavolo.splice(i, 1);
        if (dest) { t.pos = dest; tavolo.push(t); vai(t, doveLogico(t), 170); }
        else { rientra(t, true); if (scelta === t) scegli(null); }
        valuta();
      }
      function rientra(t, anima) {                 /* la tessera torna nel vassoio */
        const i = tavolo.indexOf(t); if (i >= 0) tavolo.splice(i, 1);
        t.pos = null;
        if (vassoio[t.tipo] !== Infinity) vassoio[t.tipo]++;
        disegnaPile();
        const via = () => { if (t.g.parentNode) t.g.parentNode.removeChild(t.g); };
        if (!anima) { t.tw = null; animati.delete(t); via(); return; }
        t.rot = t.tipo === 'b' && girate;
        const c = cima(t.tipo), m = misure(t.tipo, t.rot);
        t.g.classList.add('in-volo'); t.g.classList.remove('scelta');
        vai(t, { x: c.x, y: c.y, w: V(m[0]), h: V(m[1]) }, 260, via);
      }
      function ruota(t) {                          /* la bacchetta si gira tenendo fermo l'angolo in alto a sinistra */
        if (vinto || !t.pos || t.tipo !== 'b') return;
        t.rot = !t.rot;
        const [w, h] = misure('b', t.rot);
        if (V(t.pos.x) + V(w) > D.W + EPS) t.pos = { x: [Math.floor(D.W - V(w) + EPS), 0], y: t.pos.y };
        if (V(t.pos.y) + V(h) > D.H + EPS) t.pos = { x: t.pos.x, y: [Math.floor(D.H - V(h) + EPS), 0] };
        tavolo.splice(tavolo.indexOf(t), 1); tavolo.push(t); gTessere.appendChild(t.g);
        vai(t, doveLogico(t), 220);
        scegli(t); valuta();
      }

      /* ---------------- il giudizio, dopo ogni mossa ---------------- */
      function avvisa(chiave, testo) {
        if (avvisi[chiave]) return;
        avvisi[chiave] = true;
        ctx.zenone(testo, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
      }
      function valuta() {
        const es = esito(null);
        aggiorna(es);
        if (libero) { osserva(es); aggiornaParametri(); return; }
        if (vinto) return;
        const L = LIVELLI[livello], infinito = L.u === Infinity;
        const tutte = vassoio.q === 0 && vassoio.b === 0 && (infinito || vassoio.u === 0);
        msg.className = 'lab-messaggio'; msg.textContent = '';
        if (!es.n) return;
        const banale = pari(es.w, UNO) || pari(es.h, UNO), quadrato = pari(es.w, es.h), fatt = fattori(es.w, es.h);
        if (es.pieno && tutte && !banale && (!L.quadrato || quadrato)) { vittoria(es); return; }
        if (es.pieno && tutte && banale) {
          const p = poli(es.poliT);
          msg.innerHTML = 'È un rettangolo, ma alto 1: dice solo che ' + ctx.tex(p + ' = 1 \\cdot (' + p + ')') + '.';
          msg.className += ' no';
          avvisa('banale', 'Una striscia alta 1 non scompone niente: il polinomio resta com\'era. Cerca un rettangolo più spesso.');
          return;
        }
        if (es.pieno && tutte && L.quadrato) {
          msg.innerHTML = 'Pieno, ma è un rettangolo: ' + ctx.tex(fatt) + '. Il livello chiede un quadrato.';
          msg.className += ' no';
          avvisa('quadrato', 'I due lati sono diversi. In un quadrato sono uguali: le bacchette vanno divise in parti uguali fra i due lati, e i quadratini riempiono l\'angolo che resta.');
          return;
        }
        /* l'errore tipico: bacchette tutte dalla stessa parte, il rettangolo si chiude e i quadratini restano fuori */
        if (es.pieno && vassoio.q === 0 && vassoio.b === 0 && !es.conta.u && !infinito && vassoio.u > 0 && es.w[1] >= 1 && es.h[1] >= 1) {
          msg.innerHTML = 'Il rettangolo ' + ctx.tex(fatt) + ' si è chiuso, e i quadratini sono rimasti fuori.';
          msg.className += ' no';
          avvisa('lati', 'Il rettangolo ' + piano(fatt) + ' è già chiuso, e i quadratini non hanno dove andare: attaccati a un lato che contiene x lasciano sempre uno scalino, perché x non è un numero intero di quadretti. Prova a dividere le bacchette fra due lati.');
          return;
        }
        /* livello 1: le due bacchette una dietro l'altra fanno una striscia sottile */
        if (L.q === 0 && es.pieno && vassoio.b === 0 && !es.conta.u && ((pari(es.w, UNO) && es.h[1] >= 2) || (pari(es.h, UNO) && es.w[1] >= 2))) {
          msg.textContent = 'Una dietro l\'altra, le bacchette fanno una striscia alta 1.';
          avvisa('striscia', 'Una striscia alta 1 direbbe solo 2x + 6 = 1 · (2x + 6), che non scompone niente. Prova ad accostare le bacchette dal lato lungo.');
          return;
        }
        if (es.sovr.length) { msg.textContent = 'Ci sono tessere una sopra l\'altra: la zona rossa va liberata.'; msg.className += ' no'; return; }
        if (tutte && !es.pieno) msg.textContent = 'Le tessere sono tutte sul tavolo, ma nella cornice restano dei vuoti (a righe).';
      }
      function vittoria(es) {
        vinto = true; scegli(null);
        const L = LIVELLI[livello];
        aggiorna(es);
        msg.innerHTML = '<span class="vinto">' + (pari(es.w, es.h) ? 'Quadrato' : 'Rettangolo') + ' pieno: i lati misurano ' +
          ctx.tex(lin(es.w)) + ' e ' + ctx.tex(lin(es.h)) + '.</span>';
        msg.className = 'lab-messaggio ok';
        ctx.completato(livello); aggiornaLivelli();
        ctx.zenone(L.bravo, { espressione: 'orgoglioso', durata: 8000 });
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        aggiornaPulsanti();
        avviaFesta(es);
      }

      /* ---------------- livelli ---------------- */
      function pulisciTavolo() {
        presa = null; festa = null; animati.clear();
        [gTessere, gMano, gFesta, gFant].forEach(vuota);
        tavolo = []; scelta = null; vinto = false; avvisi = {}; girate = false;
      }
      function avviaLivello(n) {
        libero = false; salvato = null; mostraLibero(); chiudiAiuto();
        livello = n;
        const L = LIVELLI[n];
        pulisciTavolo();
        vassoio = { q: L.q, b: L.b, u: L.u };
        mostraObiettivo();
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        evidenziaPozzo(null); disegnaPile(); valuta(); aggiornaPulsanti(); aggiornaLivelli();
      }
      function mostraObiettivo() {
        const L = LIVELLI[livello], breve = BREVI[livello];
        objEl.innerHTML = (breve ? '<div class="c-breve">' + ctx.md(breve) + '</div>' : '') + '<div class="c-lungo">' + ctx.md(L.testo) + '</div>';
      }
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

      /* ---------------- modalità libera: le tessere le sceglie lo studente, nessun giudizio ---------------- */
      const AIUTO_LIBERO = '**Modalità libera.** Con − e + scegli quante tessere x², x e 1 ci sono (si tolgono solo quelle ancora nel vassoio). Prova a comporre un rettangolo pieno: se ci riesci, i due lati sono i fattori del polinomio. Con certe tessere il rettangolo non si chiude mai: anche questo dice qualcosa. *Casuale* propone tessere con cui un rettangolo esiste.';
      function osserva(es) {   /* osservazioni neutre, mai valutazioni */
        msg.className = 'lab-messaggio'; msg.textContent = '';
        if (!es.n || !es.pieno) return;
        const tutte = vassoio.q === 0 && vassoio.b === 0 && vassoio.u === 0;
        const f = fattori(es.w, es.h);
        msg.innerHTML = (tutte ? 'Tutte le tessere in un rettangolo: ' : 'Le tessere sul tavolo fanno un rettangolo: ') + ctx.tex(poli(es.poliT) + ' = ' + f) + '.';
      }
      function aggiornaParametri() {
        parametriEl.querySelectorAll('.lab-param').forEach(box => {
          const k = box.dataset.p, [meno, piu] = box.querySelectorAll('button');
          box.querySelector('output').textContent = String(kit[k]);
          meno.disabled = !(vassoio[k] > 0); piu.disabled = kit[k] >= MAX_LIBERO[k];
        });
      }
      function mostraLibero() {
        parametriEl.hidden = !libero; bCasuale.hidden = !libero; objEl.hidden = libero;
        radice.classList.toggle('in-libero', libero);
      }
      function entraLibero() {
        if (presa) return;
        salvato = { livello, vassoio: Object.assign({}, vassoio), girate, vinto, avvisi,
          pezzi: tavolo.map(t => ({ tipo: t.tipo, rot: t.rot, pos: t.pos })), msg: msg.innerHTML, cls: msg.className, ric: bRic.textContent, ricPrim: bRic.classList.contains('primario') };
        const L = LIVELLI[livello];
        kit = { q: L.q, b: L.b, u: L.u === Infinity ? 9 : L.u };
        libero = true; mostraLibero(); chiudiAiuto();
        pulisciTavolo();
        vassoio = Object.assign({}, kit);
        bRic.classList.remove('primario');
        evidenziaPozzo(null); disegnaPile(); valuta(); aggiornaPulsanti(); aggiornaParametri(); aggiornaLivelli();
      }
      function esciLibero() {   /* si torna al livello com'era, tessere comprese */
        if (presa) return;
        const z = salvato; libero = false; salvato = null; mostraLibero(); chiudiAiuto();
        livello = z.livello;
        pulisciTavolo();
        vassoio = z.vassoio; girate = z.girate; avvisi = z.avvisi;
        z.pezzi.forEach(p => {
          const t = nuova(p.tipo, p.rot, 0, 0); t.pos = p.pos;
          const d = doveLogico(t);
          if (d.x + d.w > D.W + EPS || d.y + d.h > D.H + EPS) { if (vassoio[t.tipo] !== Infinity) vassoio[t.tipo]++; t.g.remove(); return; }
          Object.assign(t, { dx: d.x, dy: d.y, dw: d.w, dh: d.h }); disegna(t); tavolo.push(t);
        });
        mostraObiettivo();
        vinto = z.vinto;
        bRic.textContent = z.ric; bRic.classList.toggle('primario', z.ricPrim);
        evidenziaPozzo(null); disegnaPile(); valuta(); aggiornaPulsanti(); aggiornaLivelli();
        msg.innerHTML = z.msg; msg.className = z.cls;
      }
      function cambiaKit(k, d) {
        if (d < 0 && !(vassoio[k] > 0)) return;
        if (d > 0 && kit[k] >= MAX_LIBERO[k]) return;
        kit[k] += d; vassoio[k] += d;
        disegnaPile(); valuta(); aggiornaParametri();
      }
      function casuale() {
        if (presa) return;
        /* (a x + b)(c x + d) con i conti che stanno nei limiti, e non una striscia alta 1 */
        let k = null;
        for (let giri = 0; giri < 200 && !k; giri++) {
          const a = 1 + Math.floor(Math.random() * 2), c = Math.random() < 0.75 ? 1 : 2;
          const b = Math.floor(Math.random() * 5), d = 1 + Math.floor(Math.random() * 4);
          const q = a * c, bb = a * d + b * c, u = b * d;
          if (q > MAX_LIBERO.q || bb > MAX_LIBERO.b || u > MAX_LIBERO.u || bb < 2) continue;
          if (q === kit.q && bb === kit.b && u === kit.u) continue;
          k = { q, b: bb, u };
        }
        if (!k) return;
        tavolo.slice().forEach(t => rientra(t, true));
        kit = k; vassoio = Object.assign({}, k);
        scegli(null); disegnaPile(); valuta(); aggiornaParametri();
      }
      bLibero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      bCasuale.addEventListener('click', casuale);
      parametriEl.addEventListener('click', ev => {
        const b = ev.target.closest('button[data-d]'); if (!b || !libero || presa) return;
        cambiaKit(b.closest('.lab-param').dataset.p, +b.dataset.d);
      });
      LIVELLI.forEach((_, i) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (i + 1)); p.innerHTML = '<span>' + (i + 1) + '</span>';
        p.addEventListener('click', () => { if (!presa) avviaLivello(i); });
        livelliEl.insertBefore(p, bLibero);
      });
      function ricomincia() {
        tavolo.slice().forEach(t => rientra(t, true));
        scegli(null); avvisi = {};
        valuta();
        if (libero) aggiornaParametri();
      }

      /* ---------------- telefono o schermo largo ---------------- */
      function disponi() {
        const r = scena.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) { if (!D) D = disposizione(384, 400); else return; }
        const nuova = r.width < 10 ? D : disposizione(r.width, r.height);
        if (D && nuova.chiave === D.chiave && svg.getAttribute('viewBox')) return;
        D = nuova;
        costruisciFondo();
        if (!vassoio) return;
        if (presa) {                              /* una presa a metà: si annulla */
          const t = presa.t; presa = null;
          t.g.classList.remove('presa'); gTessere.appendChild(t.g); vuota(gFant);
          if (!t.pos) rientra(t, false);
        }
        animati.forEach(t => { t.tw = null; if (!t.pos && t.g.parentNode) t.g.parentNode.removeChild(t.g); });
        animati.clear();
        tavolo.slice().forEach(t => {
          const d = doveLogico(t);
          if (d.x + d.w > D.W + EPS || d.y + d.h > D.H + EPS) rientra(t, false);
          else { Object.assign(t, { dx: d.x, dy: d.y, dw: d.w, dh: d.h }); disegna(t); }
        });
        disegnaPile(); valuta();
      }

      /* ---------------- collegamenti ---------------- */
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi);
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);
      bRuota.addEventListener('click', () => { if (scelta) ruota(scelta); });
      bRic.addEventListener('click', () => { if (vinto) avviaLivello((livello + 1) % LIVELLI.length); else ricomincia(); });
      function chiudiAiuto() { aiutoEl.hidden = true; bAiuto.setAttribute('aria-expanded', 'false'); }
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { chiudiAiuto(); return; }
        /* se nel pannello c'è la consegna breve, quella intera si legge qui */
        const breve = objEl.querySelector('.c-breve'), consegna = aiutoEl.querySelector('.consegna');
        consegna.hidden = libero || !breve || getComputedStyle(breve).display === 'none';
        if (!consegna.hidden) consegna.innerHTML = ctx.md(LIVELLI[livello].testo);
        aiutoEl.querySelector('.testo-aiuto').innerHTML = ctx.md(libero ? AIUTO_LIBERO + '\n\n' + AIUTO : AIUTO);
        aiutoEl.hidden = false; bAiuto.setAttribute('aria-expanded', 'true');
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', chiudiAiuto);
      const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => disponi()) : null;
      if (ro) { ro.observe(radice); ro.observe(scena); }

      disponi();
      avviaLivello(livello);

      return function smonta() {
        cancelAnimationFrame(raf); raf = 0;
        animati.clear(); festa = null; presa = null;
        if (ro) ro.disconnect();
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
