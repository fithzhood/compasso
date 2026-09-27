/* Laboratorio «L'albero delle scelte» — calcolo combinatorio.
   Una gara di animaletti e un podio a tre posti. Ogni livello chiede prima una PREVISIONE (un numero,
   senza penalità: resta scritta per il confronto finale). Poi lo studente riempie il podio trascinando
   gli atleti, un gradino alla volta: quando un gradino si accende, dall'albero delle scelte esce un
   ventaglio di rami (uno per ogni atleta ancora in pista) e il ramo scelto si evidenzia. Dopo qualche
   podio fatto a mano, «Completa l'albero» fa crescere tutti i rami rimasti e conta le foglie.
     livelli 1-3: disposizioni (e permutazioni) — i rami calano di uno a ogni piano;
     livello 4: combinazioni — le foglie con gli stessi tre atleti si colorano uguale e si raggruppano;
     livello 5: disposizioni con ripetizione — chi vince resta in pista, i rami non calano;
     livello 6: niente albero — tre situazioni da abbinare al modello e da calcolare.
   Schermata singola (27/9/2026): pista e podio in alto, l'albero sotto, disegnato in pixel e adattato
   allo spazio (niente scorrimento: con molte foglie diventa un ventaglio di puntini, e sceglie da solo
   se crescere verso destra o verso il basso). Livello 6: sul telefono una situazione alla volta.
   Modalità libera: atleti, posti, ordine sì/no, ripetizione sì/no, e il conteggio con la formula.
   Contratto e regole: SCHEMA-LAB.md — modelli: bilancia.js, canestro.js, regolo.js */
(function () {
  const STILE = `
    .lab-albero [hidden] { display: none !important; }
    /* --- scena: in alto la pista con il podio, sotto l'albero che prende tutto il resto (livello 6: le tre situazioni) --- */
    .lab-albero .lab-scena { flex-direction: column; align-items: stretch; justify-content: flex-start; overflow: hidden; container: abscena / size; background: var(--sup); }
    .lab-albero .ab-podio { flex: none; position: relative; min-height: 0; }
    .lab-albero .ab-podio > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    .lab-albero .ab-albero { flex: 1 1 0; min-height: 60px; position: relative; border-top: 1px solid var(--bordo); background: color-mix(in srgb, var(--s3) 5%, var(--sup)); }
    .lab-albero .ab-albero > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    .lab-albero .ab-tok { cursor: grab; outline: none; }
    .lab-albero .ab-tok.presa { cursor: grabbing; }
    .lab-albero .ab-tok.sul { cursor: pointer; }
    .lab-albero .ab-tok:focus-visible .ab-anello { stroke: var(--accento); stroke-width: 3; }
    .lab-albero .ab-attesa { animation: lab-albero-attesa 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes lab-albero-attesa { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .45; transform: scale(1.1); } }
    /* l'albero: tutto in pixel, disegnato da disegnaAlbero() */
    .lab-albero .ab-ramo { fill: none; stroke: var(--testo3); stroke-width: 1.4; stroke-opacity: .6; stroke-linecap: round; }
    .lab-albero .ab-ramo.fatto { stroke: var(--accento); stroke-width: 2.4; stroke-opacity: .42; }
    .lab-albero .ab-ramo.corr { stroke: var(--accento); stroke-width: 3.4; stroke-opacity: 1; }
    .lab-albero .ab-t { font: 600 12px var(--font); fill: var(--testo2); }
    .lab-albero .ab-t.acc { fill: var(--accento-testo); }
    .lab-albero .ab-cnt { font: 700 17px var(--font); fill: var(--testo); font-variant-numeric: tabular-nums; }
    .lab-albero .ab-cnt.batte { animation: lab-albero-batte .22s ease; transform-box: fill-box; transform-origin: center; }
    /* gruppi (livello 4): prendono il posto del podio */
    .lab-albero .ab-gruppi { flex: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; padding: 6px 8px; align-content: center; min-height: 0; }
    @container abscena (min-width: 640px) { .lab-albero .ab-gruppi { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; padding: 10px 14px; } }
    .lab-albero .ab-gr { border-radius: 12px; padding: 5px 9px 6px; background: var(--sup); border: 1.5px solid var(--bordo); animation: lab-albero-pop .35s var(--molla); }
    .lab-albero .ab-gr-testa { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
    .lab-albero .ab-gr-facce { display: flex; }
    .lab-albero .ab-gr-facce svg { width: 24px; height: 31px; margin-right: -3px; }
    .lab-albero .ab-gr-n { font: 700 1rem var(--font); color: var(--testo); }
    .lab-albero .ab-gr-ordini { display: flex; flex-wrap: wrap; gap: 1px 8px; margin-top: 3px; font: 700 12px var(--font); letter-spacing: .05em; }
    .lab-albero .ab-gr-ordini > span { opacity: .14; transition: opacity .25s; }
    .lab-albero .ab-gr-ordini > span.on { opacity: 1; }
    /* livello 6: le tre situazioni. Sul telefono una alla volta, con le linguette; su schermo largo tutte e tre in colonna */
    .lab-albero .ab-modelli { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 10px; }
    .lab-albero .ab-schede { display: flex; gap: 6px; }
    .lab-albero .ab-scheda { flex: 1 1 0; min-width: 0; min-height: 40px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup2); color: var(--testo2); font: 600 .86rem var(--font); padding: 2px 6px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .lab-albero .ab-scheda[aria-selected="true"] { border-color: var(--accento); background: var(--accento-tenue); color: var(--accento-testo); }
    .lab-albero .ab-scheda.ok { color: var(--ok); } .lab-albero .ab-scheda.ok::after { content: ' ✓'; }
    .lab-albero .ab-scheda.no { color: var(--no); } .lab-albero .ab-scheda.no::after { content: ' ✗'; }
    .lab-albero .ab-casi { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; align-content: start; min-height: 0; }
    .lab-albero .ab-caso:not(.aperto) { display: none; }
    @container abscena (min-width: 760px) {
      .lab-albero .ab-schede { display: none; }
      .lab-albero .ab-casi { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .lab-albero .ab-caso:not(.aperto) { display: flex; }
      .lab-albero .ab-modelli { justify-content: center; padding: 14px; }
    }
    .lab-albero .ab-caso { display: flex; flex-direction: column; padding: 10px 12px 12px; border-radius: 16px; background: var(--sup2); border: 1.5px solid var(--bordo); transition: border-color .2s, background .2s; }
    .lab-albero .ab-caso.ok { border-color: var(--ok); background: color-mix(in srgb, var(--ok-tenue) 75%, var(--sup)); animation: lab-albero-pop .45s var(--molla); }
    .lab-albero .ab-caso.no { border-color: var(--no); }
    .lab-albero .ab-caso.ok .ab-in:disabled { opacity: 1; border-color: color-mix(in srgb, var(--ok) 55%, var(--bordo)); color: var(--ok); background: var(--sup); }
    .lab-albero .ab-caso.ok .ab-mod:not(.sel) { opacity: .5; }
    .lab-albero .ab-caso-testo { margin: 4px 0 9px; font-size: clamp(.92rem, 2.2cqmin, 1.02rem); line-height: 1.45; }
    .lab-albero .ab-caso-testo p { margin: 0; }
    .lab-albero .ab-scelte { display: flex; flex-wrap: wrap; gap: 6px; }
    .lab-albero .ab-mod { flex: 1 1 auto; min-height: 40px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup); color: var(--testo);
      font: 600 .86rem var(--font); padding: 4px 10px; cursor: pointer; transition: transform .25s var(--molla), background .2s, border-color .2s, color .2s; }
    .lab-albero .ab-mod:active { transform: scale(.97); }
    .lab-albero .ab-mod.sel { border-color: var(--accento); background: var(--accento-tenue); color: var(--accento-testo); }
    .lab-albero .ab-mod:disabled { cursor: default; }
    .lab-albero .ab-calcola { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 1.1rem; min-height: 44px; flex-wrap: wrap; }
    .lab-albero .ab-sim { min-width: 3.2em; color: var(--testo); }
    .lab-albero .ab-sim .vuoto { font-size: .86rem; color: var(--testo3); }
    .lab-albero .ab-caso-nota { font-size: .86rem; line-height: 1.4; color: var(--no); margin-top: 4px; }
    .lab-albero .ab-caso-nota:empty { display: none; }
    .lab-albero .ab-controlla { display: flex; justify-content: center; }
    .lab-albero .ab-controlla .btn { min-height: 44px; min-width: 11em; font-weight: 600; }
    /* --- pannello --- */
    .lab-albero .ab-obiettivo { font-size: clamp(.92rem, 2.1cqmin, 1.05rem); line-height: 1.45; text-align: center; color: var(--testo); }
    .lab-albero .ab-obiettivo p { margin: 0; display: inline; }
    .lab-albero .ab-obiettivo strong { color: var(--accento-testo); }
    .lab-albero .ab-obiettivo .c-breve { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-albero .ab-obiettivo .c-breve { display: inline; } .lab-albero .ab-obiettivo .c-breve + .c-lungo { display: none; } }
    @container lab (min-aspect-ratio: 5 / 4) and (max-height: 900px) { .lab-albero .ab-obiettivo .c-breve { display: inline; } .lab-albero .ab-obiettivo .c-breve + .c-lungo { display: none; } }
    .lab-albero .lab-aiuto .consegna, .lab-albero .lab-aiuto .dopo { color: var(--testo2); margin-bottom: 10px; }
    .lab-albero .lab-aiuto p { margin: 0 0 8px; }
    .lab-albero .ab-in { width: 5.6em; min-height: 42px; font: 600 1.15rem var(--font); text-align: center; border-radius: 12px; border: 1.5px solid var(--bordo2);
      background: var(--sup2); color: var(--testo); padding: 4px 8px; -webkit-user-select: text; user-select: text; }
    .lab-albero .ab-in:focus { outline: none; border-color: var(--accento); box-shadow: 0 0 0 3px var(--accento-tenue); }
    .lab-albero .ab-in:disabled { opacity: .45; }
    .lab-albero .ab-prev { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 6px 10px 8px; border-radius: 14px; background: var(--sup); border: 1.5px solid color-mix(in srgb, var(--accento) 35%, var(--bordo)); }
    .lab-albero .ab-prev-dom { font-size: clamp(.92rem, 2.1cqmin, 1.05rem); line-height: 1.4; text-align: center; }
    .lab-albero .ab-prev-dom p { margin: 0; }
    .lab-albero .ab-prev-riga { display: flex; gap: 8px; align-items: center; justify-content: center; }
    .lab-albero .ab-prev .btn { min-height: 42px; font-weight: 600; }
    .lab-albero .ab-prev-nota { font-size: .86rem; color: var(--no); text-align: center; }
    .lab-albero .ab-prev-nota:empty { display: none; }
    .lab-albero .ab-comandi { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px 12px; }
    .lab-albero .ab-comandi .btn { min-height: 42px; font-weight: 600; }
    .lab-albero .ab-comandi .btn[disabled] { opacity: .4; cursor: default; box-shadow: none; }
    .lab-albero .ab-stato { font-size: .9rem; color: var(--testo2); }
    .lab-albero .ab-stato b { color: var(--testo); }
    .lab-albero .ab-stato:empty { display: none; }
    .lab-albero .ab-carta { display: flex; flex-direction: column; padding: 2px 12px; border-radius: 14px; background: var(--sup); border: 1px solid var(--bordo); }
    .lab-albero .ab-riga { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0 10px; padding: 3px 0; }
    .lab-albero .ab-riga + .ab-riga { border-top: 1px dashed var(--bordo); }
    .lab-albero .ab-et { font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--testo2); font-weight: 600; min-width: 7.2em; }
    .lab-albero .ab-tex { font-size: 1.1rem; display: inline-flex; flex-wrap: wrap; gap: 2px 14px; align-items: baseline; color: var(--testo); }
    .lab-albero .ab-tex .katex { white-space: nowrap; }
    .lab-albero .ab-riga.esito .ab-tex { border-radius: 8px; padding: 0 6px; animation: lab-albero-pop .45s var(--molla); }
    .lab-albero .ab-riga.esito.ok .ab-tex { background: var(--ok-tenue); } .lab-albero .ab-riga.esito.ok .ab-et { color: var(--ok); }
    .lab-albero .ab-riga.esito.no .ab-tex { background: var(--no-tenue); } .lab-albero .ab-riga.esito.no .ab-et { color: var(--no); }
    .lab-albero .ab-vuoto { color: var(--testo3); font-size: .9rem; }
    .lab-albero .lab-messaggio { padding: 0 4px; min-height: 0; font-size: clamp(.88rem, 2cqmin, 1.02rem); text-align: center; line-height: 1.45; }
    .lab-albero .lab-messaggio:empty { display: none; }
    .lab-albero .lab-messaggio.ok { font-weight: 500; }
    /* sul telefono il messaggio di fine livello resta corto: la spiegazione la dice Ada, e sta anche nel «?» */
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-albero .lab-messaggio .ab-lungo { display: none; } }
    .lab-albero .vinto { display: inline-block; animation: lab-albero-pop .5s var(--molla); font-weight: 600; }
    .lab-albero .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; }
    .lab-albero .lab-barra .btn { min-height: 40px; }
    .lab-albero .lab-barra .btn[disabled], .lab-albero .lab-libero[disabled] { opacity: .38; cursor: default; }
    .lab-albero .lab-param .ab-sw { min-width: 0; width: 100%; font-size: .95rem; }
    .lab-albero .lab-param .ab-sw[aria-pressed="true"] { background: var(--accento-tenue); border-color: var(--accento); color: var(--accento-testo); }
    .lab-albero .lab-param .nome { font-size: .95rem; min-width: 0; }
    .lab-albero .ab-caso-calcolo { margin-top: 6px; font-size: 1.1rem; color: var(--ok); }
    .lab-albero .ab-caso-calcolo:empty { display: none; }
    /* modalità libera sul telefono: al posto della consegna un riassunto dei parametri, che apre e chiude i controlli */
    .lab-albero .ab-riassunto { display: none; min-height: 38px; font-size: .92rem; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) {
      .lab-albero.in-libero .ab-obiettivo .c-lungo { display: none; }
      .lab-albero.in-libero .ab-riassunto { display: inline-flex; align-items: center; gap: 6px; }
      .lab-albero.in-libero.param-aperti .ab-riassunto span { display: inline-block; transform: rotate(180deg); }
      .lab-albero.in-libero:not(.param-aperti) .lab-parametri { display: none; }
      .lab-albero.ab-l6 .ab-carta { display: none; }   /* sul telefono il conto sta dentro ogni situazione */
    }
    .lab-albero .scuoti { animation: lab-albero-no .38s ease; }
    @keyframes lab-albero-pop { from { transform: scale(.8); opacity: 0 } to { transform: none; opacity: 1 } }
    @keyframes lab-albero-no { 20%, 60% { transform: translateX(-5px) } 40%, 80% { transform: translateX(5px) } }
    @keyframes lab-albero-batte { 50% { transform: scale(1.25); } }
  `;

  /* ---------------- gli atleti ---------------- */
  const ATLETI = [
    { id: 'volpe', nome: 'Volpe', ini: 'V', col: 'var(--s2)' },
    { id: 'rana', nome: 'Rana', ini: 'R', col: 'var(--s3)' },
    { id: 'pinguino', nome: 'Pinguino', ini: 'P', col: 'var(--s1)' },
    { id: 'gufo', nome: 'Gufo', ini: 'G', col: 'var(--s4)' },
    { id: 'lepre', nome: 'Lepre', ini: 'L', col: 'var(--a5)' }
  ];
  const INK = '#1d2230';
  /* la faccia di un atleta, disegnata attorno a (0,0) con la testa di raggio 20 */
  function faccia(a) {
    const c = a.col, sc = 'color-mix(in srgb, ' + c + ' 60%, #000)';
    const pelle = `style="fill:${c};stroke:${sc}" stroke-width="1.6" stroke-linejoin="round"`;
    const testa = `<circle class="ab-anello" r="20" ${pelle}/><ellipse cx="-6" cy="-11" rx="7" ry="4" fill="#fff" opacity=".22" transform="rotate(-25 -6 -11)"/>`;
    const occhi = (dx, y, r) => `<circle cx="${-dx}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${dx}" cy="${y}" r="${r}" fill="${INK}"/>` +
      `<circle cx="${(-dx + r * .38).toFixed(2)}" cy="${(y - r * .38).toFixed(2)}" r="${(r * .36).toFixed(2)}" fill="#fff"/><circle cx="${(dx + r * .38).toFixed(2)}" cy="${(y - r * .38).toFixed(2)}" r="${(r * .36).toFixed(2)}" fill="#fff"/>`;
    const guance = `<circle cx="-12.5" cy="6" r="3" fill="#ff8fa3" opacity=".45"/><circle cx="12.5" cy="6" r="3" fill="#ff8fa3" opacity=".45"/>`;
    switch (a.id) {
      case 'volpe':
        return `<path d="M-17 -6 L-15 -28 L-2 -17 Z M17 -6 L15 -28 L2 -17 Z" ${pelle}/><path d="M-13.5 -10 L-13.8 -21.5 L-6.5 -15.5 Z M13.5 -10 L13.8 -21.5 L6.5 -15.5 Z" fill="${INK}" opacity=".3"/>` + testa +
          `<path d="M-16 1 Q-8 -3 0 4 Q8 -3 16 1 Q13 17.5 0 19.5 Q-13 17.5 -16 1 Z" fill="#fff" opacity=".93"/>` + occhi(7.5, -4, 2.6) + `<ellipse cx="0" cy="6.5" rx="3.3" ry="2.4" fill="${INK}"/>`;
      case 'rana':
        return `<circle cx="-9.5" cy="-14.5" r="8.5" ${pelle}/><circle cx="9.5" cy="-14.5" r="8.5" ${pelle}/>` + testa +
          `<circle cx="-9.5" cy="-14.5" r="5.8" fill="#fff"/><circle cx="9.5" cy="-14.5" r="5.8" fill="#fff"/><circle cx="-8.8" cy="-13.8" r="3" fill="${INK}"/><circle cx="10.2" cy="-13.8" r="3" fill="${INK}"/>` +
          `<path d="M-11 4.5 Q0 14.5 11 4.5" fill="none" stroke="${INK}" stroke-width="2.1" stroke-linecap="round"/>` + guance;
      case 'pinguino':
        return testa + `<path d="M-3 -19.5 Q0 -27 5 -21" fill="none" style="stroke:${sc}" stroke-width="2.2" stroke-linecap="round"/>` +
          `<path d="M-15 0 C-15 -12 -4 -13 0 -6 C4 -13 15 -12 15 0 C15 12 8 18.5 0 18.5 C-8 18.5 -15 12 -15 0 Z" fill="#fff"/>` + occhi(5.6, -2.5, 2.5) +
          `<path d="M-4.8 3.5 L4.8 3.5 L0 9.8 Z" style="fill:var(--avviso)" stroke="${INK}" stroke-opacity=".35" stroke-width=".8" stroke-linejoin="round"/>` + guance;
      case 'gufo':
        return `<path d="M-17.5 -7 L-16 -27 L-5.5 -17 Z M17.5 -7 L16 -27 L5.5 -17 Z" ${pelle}/>` + testa +
          `<circle cx="-7.8" cy="-3" r="7.4" fill="#fff"/><circle cx="7.8" cy="-3" r="7.4" fill="#fff"/><circle cx="-7.2" cy="-2.6" r="3.6" fill="${INK}"/><circle cx="8.4" cy="-2.6" r="3.6" fill="${INK}"/>` +
          `<circle cx="-6" cy="-4" r="1.2" fill="#fff"/><circle cx="9.6" cy="-4" r="1.2" fill="#fff"/>` +
          `<path d="M-3.2 4.5 L3.2 4.5 L0 10.5 Z" style="fill:var(--avviso)"/><path d="M-7 14 q1.75 2.2 3.5 0 q1.75 2.2 3.5 0 q1.75 2.2 3.5 0 q1.75 2.2 3.5 0" fill="none" style="stroke:${sc}" stroke-width="1.4" stroke-linecap="round"/>`;
      default: /* lepre */
        return `<ellipse cx="-7.5" cy="-25" rx="5.2" ry="13" transform="rotate(-12 -7.5 -25)" ${pelle}/><ellipse cx="7.5" cy="-25" rx="5.2" ry="13" transform="rotate(12 7.5 -25)" ${pelle}/>` +
          `<ellipse cx="-7.5" cy="-24" rx="2.4" ry="8.5" transform="rotate(-12 -7.5 -24)" fill="#ffc2cf" opacity=".85"/><ellipse cx="7.5" cy="-24" rx="2.4" ry="8.5" transform="rotate(12 7.5 -24)" fill="#ffc2cf" opacity=".85"/>` + testa +
          occhi(7, -3.5, 2.5) + `<path d="M-2.8 3.5 L2.8 3.5 L0 6.8 Z" fill="#ff7f99"/><path d="M0 6.8 L0 9.5 M0 9.5 Q-3 12.5 -5.5 10.5 M0 9.5 Q3 12.5 5.5 10.5" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>` +
          `<path d="M-9 6 L-17 4.5 M-9 8 L-17 9 M9 6 L17 4.5 M9 8 L17 9" stroke="${INK}" stroke-opacity=".4" stroke-width=".9" stroke-linecap="round"/>`;
    }
  }
  const facciaMini = a => `<svg viewBox="-24 -42 48 64" aria-hidden="true">${faccia(a)}</svg>`;

  /* ---------------- livelli ----------------
     n atleti, k posti; modo: 'podio' (gradini diversi), 'finale' (posti uguali: l'ordine non conta),
     'gare' (un piedistallo per gara); rip: chi sale resta in pista; mano: podi da fare a mano prima di
     completare l'albero; giusto: la risposta alla domanda della previsione. */
  const LIVELLI = [
    { n: 3, k: 3, modo: 'podio', mano: 2, giusto: 6,
      domanda: 'Tre atleti e tre gradini. In quanti modi diversi può finire la gara?',
      testo: 'Sul podio salgono **Volpe**, **Rana** e **Pinguino**: tre atleti per tre gradini. Prima scrivi quanti podi diversi secondo te ci sono. Poi trascina gli atleti sul gradino che brilla, un posto alla volta, e guarda crescere l\'albero.',
      aiuto: 'Il gradino che brilla è quello da riempire adesso: prima il 1°, poi il 2°, poi il 3°. Quando un gradino si accende, dall\'albero escono tanti rami quanti sono gli atleti ancora in pista: ogni ramo è una scelta possibile. Con il podio pieno arrivi in fondo a un ramo, su una **foglia**. Se hai messo l\'atleta sbagliato, tocca l\'ultimo salito e torna giù.',
      vittoria: 'Tre scelte per l\'oro, due per l\'argento, una sola per il bronzo: 3 · 2 · 1 = 6. Mettere in fila tutti gli atleti si chiama permutazione, e 3 · 2 · 1 si scrive 3!.',
      ponte: 'P_3 = 3! = 3 \\cdot 2 \\cdot 1 = 6' },
    { n: 4, k: 3, modo: 'podio', mano: 2, giusto: 24,
      domanda: 'Quattro atleti e tre gradini. Quanti podi diversi?',
      testo: 'Arriva il **Gufo**: gli atleti sono quattro, i gradini sempre tre, e uno resterà giù. Prevedi quanti podi ci sono, poi costruiscine due a mano e fai completare l\'albero.',
      aiuto: 'Guarda quanti rami escono a ogni piano dell\'albero: al primo piano uno per ogni atleta, al secondo uno per ogni atleta ancora in pista, e così via. Ogni ramo di un piano si divide nello stesso numero di rami, quindi le foglie si contano con una moltiplicazione.',
      vittoria: 'Quattro scelte per il 1° posto, tre per il 2°, due per il 3°: 4 · 3 · 2 = 24. Ti fermi al 2 perché i gradini sono tre e un atleta resta giù.',
      ponte: 'D_{4,3} = 4 \\cdot 3 \\cdot 2 = \\frac{4!}{1!} = 24' },
    { n: 5, k: 3, modo: 'podio', mano: 1, giusto: 60,
      domanda: 'Cinque atleti e tre gradini. Quanti podi diversi? Prova a contarli senza disegnare niente.',
      testo: 'Con la **Lepre** gli atleti sono cinque. Stavolta prevedi senza costruire: quanti podi? Poi fanne uno a mano e lascia crescere il resto dell\'albero.',
      aiuto: 'Non serve immaginare tutte le foglie. Chiediti quanti atleti puoi scegliere per il 1° posto, quanti ne restano per il 2° e quanti per il 3°. Ogni scelta del 1° posto va d\'accordo con ogni scelta del 2°, e ognuna di queste con ogni scelta del 3°.',
      vittoria: '5 · 4 · 3 = 60. Sessanta foglie non si disegnano a mano: basta sapere quanti rami escono a ogni piano e moltiplicare.',
      ponte: 'D_{5,3} = 5 \\cdot 4 \\cdot 3 = \\frac{5!}{2!} = \\frac{120}{2} = 60' },
    { n: 4, k: 3, modo: 'finale', mano: 2, giusto: 4, gruppi: true,
      domanda: 'Quattro atleti, tre posti in finale. Quanti gruppi diversi di finalisti?',
      testo: 'Qui non c\'è un podio: tre atleti su quattro passano **in finale**, e in finale non c\'è un primo o un secondo. Prevedi quanti gruppi di finalisti ci sono. Poi manda in finale **gli stessi tre atleti due volte, in un ordine diverso**, e guarda dove finiscono nell\'albero.',
      aiuto: 'L\'albero tiene conto dell\'ordine in cui scegli, anche se in finale l\'ordine non conta. Scegli tre atleti, poi rifai gli stessi tre cominciando da un altro: sono due foglie diverse, ma il gruppo è uno. Quando l\'albero è completo, «Raggruppa» mette insieme le foglie con gli stessi atleti: conta quante ne finiscono in ogni gruppo.',
      vittoria: 'Le terne in ordine sono 4 · 3 · 2 = 24, ma ogni gruppo compare 6 volte, una per ogni modo di mettere in fila i suoi tre atleti: 3! = 6. I gruppi sono 24 : 6 = 4.',
      ponte: 'C_{4,3} = \\frac{D_{4,3}}{3!} = \\frac{24}{6} = 4' },
    { n: 3, k: 3, modo: 'gare', mano: 2, giusto: 27, rip: true,
      domanda: 'Tre gare, tre atleti, e si può vincere più di una gara. In quanti modi diversi possono andare le tre gare?',
      testo: 'Tre gare di fila, sempre fra **Volpe**, **Rana** e **Pinguino**. Per ogni gara trascina il vincitore sul suo piedistallo: chi vince **resta in pista** e può vincere anche la gara dopo. Prevedi quanti modi ci sono, poi costruiscine due.',
      aiuto: 'Stavolta chi sale sul piedistallo resta anche in pista, quindi ogni gara è una scelta fra tutti e tre. Guarda quanti rami escono da ogni nodo, e se diminuiscono da un piano all\'altro.',
      vittoria: 'Ogni gara ha 3 possibili vincitori, sempre gli stessi tre: 3 · 3 · 3 = 27. Quando si può ripetere, i rami non calano da un piano all\'altro.',
      ponte: 'D\'_{3,3} = 3 \\cdot 3 \\cdot 3 = 3^3 = 27' },
    { modelli: true,
      testo: 'Ultimo livello, senza albero. Per ogni situazione scegli il modello, poi calcola quanti sono i casi. Prima di scegliere fatti due domande: **l\'ordine conta?** **Si può ripetere?**',
      aiuto: 'L\'ordine conta se scambiando due atleti ottieni un caso diverso: oro e argento scambiati sono un altro podio. Si ripete se lo stesso atleta può comparire più di una volta. Ordine sì e niente ripetizioni: disposizione. Ordine no: combinazione, cioè le disposizioni divise per i modi di mettere in fila gli scelti. Ordine sì e ripetizioni sì: disposizione con ripetizione.',
      vittoria: 'Bastano due domande. Il podio: l\'ordine conta e nessuno sale due volte. Il sorteggio: l\'ordine non conta, e si divide per 3!. La schedina: l\'ordine conta e si ripete, quindi è una potenza.' }
  ];

  /* livello 6: le situazioni. m: 'D' disposizione, 'C' combinazione, 'R' disposizione con ripetizione */
  const CASI = [
    { et: 'Il sorteggio', n: 7, k: 3, m: 'C', ris: 35, calcolo: 'C_{7,3} = \\frac{7 \\cdot 6 \\cdot 5}{3!} = 35',
      testo: 'Sette atleti in gara. Alla fine la giuria ne sorteggia **tre** per il controllo antidoping. Quanti gruppi diversi di tre può sorteggiare?' },
    { et: 'La schedina', n: 3, k: 4, m: 'R', ris: 81, calcolo: 'D\'_{3,4} = 3^4 = 81',
      testo: 'Quattro batterie di fila, e in ognuna corrono **gli stessi tre** atleti. Sulla schedina scrivi il vincitore di ogni batteria, e uno può vincerne più d\'una. Quante schedine diverse?' },
    { et: 'Il podio', n: 6, k: 3, m: 'D', ris: 120, calcolo: 'D_{6,3} = 6 \\cdot 5 \\cdot 4 = 120',
      testo: 'Sei atleti in finale. Quanti podi diversi, con oro, argento e bronzo?' }
  ];
  const MODELLI = { D: 'Disposizione', C: 'Combinazione', R: 'Con ripetizione' };
  const simbolo = (m, n, k) => (m === 'C' ? 'C' : m === 'R' ? 'D\'' : 'D') + '_{' + n + ',' + k + '}';

  /* ---------------- conti ---------------- */
  const fatt = x => (x <= 1 ? 1 : x * fatt(x - 1));
  const disp = (n, k) => fatt(n) / fatt(n - k);
  const NUMERI = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette'];
  const fattori = l => Array.from({ length: l.k }, (_, j) => (l.rip ? l.n : l.n - j));
  const foglieTot = l => fattori(l).reduce((a, b) => a * b, 1);

  /* cosa ha pensato chi ha previsto p (solo gli errori tipici; null se non si riconosce) */
  function diagPrev(l, p) {
    const n = l.n, k = l.k, D = disp(n, k), C = D / fatt(k);
    if (p === l.giusto) return null;
    if (l.rip) {
      if (p === D) return 'Avevi previsto ' + p + ', come se chi vince una gara non potesse vincere la successiva. Ma resta in pista: ogni gara ha di nuovo ' + n + ' possibili vincitori.';
      if (p === n * n) return 'Avevi previsto ' + p + ', cioè ' + n + ' · ' + n + '. Le gare però sono tre, e ogni gara aggiunge un fattore.';
      return null;
    }
    if (l.gruppi) {
      if (p === D) return 'Avevi previsto ' + p + ': sono le terne in ordine. In finale Volpe, Rana, Pinguino e Pinguino, Rana, Volpe sono lo stesso gruppo, e ogni gruppo compare 3! = 6 volte.';
      if (p === D / k) return 'Avevi diviso ' + D + ' per 3. I modi di mettere in fila tre atleti però sono 3! = 6, non 3.';
      if (p === Math.pow(n, k)) return 'Avevi previsto ' + p + ', come se un atleta potesse occupare due posti in finale.';
      return null;
    }
    if (p === Math.pow(n, k)) return 'Avevi previsto ' + n + ' · ' + n + ' · ' + n + ' = ' + p + ', come se lo stesso atleta potesse salire su due gradini. Chi è già sul podio non si sceglie di nuovo: a ogni gradino c\'è una scelta in meno.';
    if (n > k && p === fatt(n)) return 'Avevi previsto ' + n + '! = ' + p + ', che mette in fila tutti e ' + NUMERI[n] + ' gli atleti. I gradini sono solo tre: ti fermi dopo tre fattori.';
    if (p === C) return 'Avevi diviso per 3!, come se l\'ordine non contasse. Sul podio conta: oro e argento scambiati sono un altro podio.';
    if (p === n * (n - 1)) return 'Avevi previsto ' + n + ' · ' + (n - 1) + ' = ' + p + ': manca il terzo gradino, che aggiunge un fattore.';
    if (p === n + (n - 1) + (n - 2)) return 'Avevi sommato le scelte: ' + n + ' + ' + (n - 1) + ' + ' + (n - 2) + ' = ' + p + '. Ogni scelta del 1° posto va con ogni scelta del 2°: le scelte si moltiplicano.';
    return null;
  }
  /* cosa ha pensato chi ha scelto il modello m e scritto v nella situazione c (livello 6) */
  function diagCaso(c, m, v) {
    if (c.m === 'C') {
      if (m === 'D' || v === 210) return 'Nel sorteggio i tre vengono presi insieme: non c\'è un primo sorteggiato che conti più degli altri. 7 · 6 · 5 = 210 conta ogni gruppo 3! = 6 volte.';
      if (m === 'R' || v === 343) return 'Nel sorteggio lo stesso atleta non può uscire due volte.';
    }
    if (c.m === 'R') {
      if (v === 64) return 'Base ed esponente sono scambiati: ogni batteria ha 3 vincitori possibili e le batterie sono 4, quindi 3 · 3 · 3 · 3.';
      if (m !== 'R' || v === 6 || v === 24) return 'Chi vince una batteria corre anche la successiva: lo stesso atleta può comparire più volte, e le scelte non calano.';
    }
    if (c.m === 'D') {
      if (m === 'C' || v === 20) return 'Sul podio l\'ordine conta: oro e argento scambiati sono un altro podio. Qui non si divide per 3!.';
      if (m === 'R' || v === 216) return 'Un atleta non sale su due gradini: dopo l\'oro restano 5 atleti, dopo l\'argento 4.';
    }
    return null;
  }

  /* consegne brevi per il pannello quando lo spazio è poco: quella intera si legge nel «?» */
  const BREVI = [
    'Prevedi quanti podi ci sono, poi trascina gli atleti sul **gradino che brilla**.',
    'Arriva il **Gufo**: quattro atleti, tre gradini. Prevedi, poi fanne due a mano.',
    'Cinque atleti, tre gradini: prevedi **senza costruire**, poi fanne uno.',
    'In **finale** l\'ordine non conta. Manda in finale gli stessi tre due volte, in ordine diverso.',
    'Tre gare: **chi vince resta in pista**. Prevedi, poi costruiscine due.',
    'Per ogni situazione: **l\'ordine conta? Si può ripetere?** Poi calcola.'
  ];
  /* modalità libera */
  const TESTO_LIBERO = 'Scegli atleti e posti, se **l\'ordine conta** e se **si ripete**: l\'albero conta i casi.';
  const AIUTO_LIBERO = 'In modalità libera non c\'è niente da prevedere. Scegli quanti sono gli atleti e i posti, se l\'ordine conta e se uno stesso atleta può occupare più posti. Puoi riempire i posti a mano oppure premere «Completa l\'albero»: le foglie si contano, e la formula sotto dice lo stesso numero. Se l\'ordine non conta, «Raggruppa» tiene una sola foglia per ogni gruppo di atleti. «Casuale» sceglie tutto a caso.';

  /* ---------------- geometria della pista ---------------- */
  const SW = 360, SH = 240, PIANO = 150, YP = 196;          /* pista: base del podio, riga degli atleti in pista */
  /* i posti: il podio classico a tre gradini; con un numero diverso di posti (modalità libera) una scala */
  function posti(modo, k) {
    k = k || 3;
    if (modo === 'podio' && k === 3) return [
      { x: 180, top: 86, et: '1', med: 'var(--a6)' },
      { x: 110, top: 104, et: '2', med: 'var(--testo3)' },
      { x: 250, top: 118, et: '3', med: 'color-mix(in srgb, var(--s2) 62%, #5a3312)' }];
    const passo = k <= 3 ? 70 : 76, xs = j => 180 + (j - (k - 1) / 2) * passo;
    const MED = ['var(--a6)', 'var(--testo3)', 'color-mix(in srgb, var(--s2) 62%, #5a3312)', 'var(--s4)'];
    if (modo === 'podio') return Array.from({ length: k }, (_, j) => ({ x: xs(j), top: 86 + j * 14, et: String(j + 1), med: MED[j] }));
    return Array.from({ length: k }, (_, j) => ({ x: xs(j), top: 104, et: modo === 'gare' ? 'gara ' + (j + 1) : '', med: modo === 'gare' ? 'var(--s1)' : 'var(--s4)' }));
  }
  const xPista = (i, n) => 180 + (i - (n - 1) / 2) * (n <= 3 ? 84 : n === 4 ? 74 : 66);
  const etPosto = (modo, j) => (modo === 'podio' ? (j + 1) + '°' : modo === 'gare' ? 'gara ' + (j + 1) : (j + 1) + 'ª scelta');
  /* in testo e non come esponente: sotto i fattori un esponente scenderebbe sotto i 12 px */
  const texPosto = (modo, j) => '\\text{' + (modo === 'podio' ? (j + 1) + '°' : modo === 'gare' ? 'gara ' + (j + 1) : (j + 1) + 'a') + '}';   /* «1a» e non «1ª»: KaTeX non ha la ª */

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const f1 = v => (Math.round(v * 10) / 10).toString();
  const liscia = u => 1 - Math.pow(1 - u, 3);
  const morbida = u => (u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
  const GCOL = ['var(--a6)', 'var(--a5)', 'var(--accento)', 'var(--a3)'];
  const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

  COMPASSO.registraLab({
    id: 'albero',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-albero')) { const s = document.createElement('style'); s.id = 'stile-lab-albero'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-albero');
      const uid = 'ab' + Math.random().toString(36).slice(2, 7);
      const param = (p, nome, meno, piu) => `<div class="lab-param" data-p="${p}"><span class="nome">${nome}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="${meno}">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="${piu}">+</button></div>`;
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="ab-podio"></div>
            <div class="ab-gruppi" hidden></div>
            <div class="ab-albero"></div>
            <div class="ab-modelli" hidden></div>
            <div class="lab-aiuto" hidden data-scorre><div class="consegna" hidden></div><div class="testo-aiuto"></div><div class="dopo" hidden></div><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: scegli atleti e posti, niente da prevedere">Libero</button></div>
            <div class="ab-obiettivo"></div>
            <div class="lab-parametri" hidden>
              ${param('n', 'atleti', 'Un atleta in meno', 'Un atleta in più')}
              ${param('k', 'posti', 'Un posto in meno', 'Un posto in più')}
              <div class="lab-param"><button type="button" class="btn piccolo ab-sw" data-sw="ordine" aria-pressed="true"></button></div>
              <div class="lab-param"><button type="button" class="btn piccolo ab-sw" data-sw="rip" aria-pressed="false"></button></div>
            </div>
            <div class="ab-prev">
              <div class="ab-prev-dom" id="${uid}-dom"></div>
              <div class="ab-prev-riga">
                <input class="ab-in ab-prev-in" type="text" inputmode="numeric" maxlength="5" autocomplete="off" aria-labelledby="${uid}-dom" placeholder="?">
                <button type="button" class="btn primario b-prev">Prevedo</button>
              </div>
              <div class="ab-prev-nota" aria-live="polite"></div>
            </div>
            <div class="ab-comandi">
              <button type="button" class="btn primario b-completa">Completa l'albero</button>
              <button type="button" class="btn primario b-gruppi" hidden>Raggruppa</button>
              <span class="ab-stato" aria-live="polite"></span>
            </div>
            <div class="ab-carta"></div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <button type="button" class="btn piccolo b-ric">Ricomincia</button>
              <button type="button" class="btn piccolo b-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo b-aiuto" aria-label="Come si gioca" title="Come si gioca">?</button>
            </div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), podioEl = q('.ab-podio'), gruppiEl = q('.ab-gruppi'), alberoEl = q('.ab-albero'), modEl = q('.ab-modelli'), aiutoEl = q('.lab-aiuto');
      const objEl = q('.ab-obiettivo'), prevEl = q('.ab-prev'), prevDom = q('.ab-prev-dom'), inPrev = q('.ab-prev-in'), bPrev = q('.b-prev'), prevNota = q('.ab-prev-nota');
      const comEl = q('.ab-comandi'), bCompleta = q('.b-completa'), bGruppi = q('.b-gruppi'), statoEl = q('.ab-stato');
      const carta = q('.ab-carta'), msg = q('.lab-messaggio'), livelliEl = q('.lab-livelli'), parametriEl = q('.lab-parametri');
      const bAiuto = q('.b-aiuto'), bRic = q('.b-ric'), bLibero = q('.lab-libero'), bCasuale = q('.b-casuale');
      const scuro = ctx.tema() === 'scuro';
      const T = s => ctx.tex(s);

      /* ================= stato ================= */
      const st0 = ctx.stato().livelli;
      let livello = st0.length ? Math.max(...st0) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      let libero = false, salvato = null;            /* modalità libera, e il livello da cui ci si è entrati */
      const LIB = { n: 4, k: 3, ordine: true, rip: false };
      const livLibero = () => ({ n: LIB.n, k: LIB.k, rip: LIB.rip, ordine: LIB.ordine, libero: true, mano: 0,
        modo: LIB.rip ? (LIB.ordine ? 'gare' : 'premi') : (LIB.ordine ? 'podio' : 'finale'), testo: TESTO_LIBERO, aiuto: AIUTO_LIBERO });
      let LIBERO = livLibero();
      const L = () => libero ? LIBERO : LIVELLI[livello];
      let fase = 'prev';          /* prev → mano → cresce → contato (→ gruppi) → vinto; 'modelli'; in libero: mano → cresce → contato (→ gruppi) → fine */
      let prev = null, podio = [], fatti = [], pista = [], sulPodio = [], occupato = false, presa = null, contando = false;
      let nodi = new Map(), radiceAlb = null, contatore = 0, ultimaContata = null, batte = false;
      let scelte = [], aperta = 0, vivo = true, seq = 0;
      const timers = [];
      const dopo = (fn, ms) => { const s = seq; const t = setTimeout(() => { if (vivo && s === seq) fn(); }, ms); timers.push(t); return t; };

      /* ================= animazioni: rAF, con una riserva a tempo se rAF è strozzato ================= */
      const anims = new Set(); let raf = 0;
      function tick(t) {
        raf = 0;
        for (const a of Array.from(anims)) { const u = (t - a.t0) / a.dur; if (u >= 1) chiudi(a); else a.draw(Math.max(0, u)); }
        if (anims.size && vivo) raf = requestAnimationFrame(tick);
      }
      function chiudi(a) { if (a.fatto) return; a.fatto = true; anims.delete(a); a.draw(1); if (a.fine) a.fine(); }
      function anima(dur, draw, fine) {
        const a = { t0: performance.now(), dur, draw, fine, fatto: false };
        anims.add(a); draw(0);
        const s = seq; setTimeoutRiserva(() => { if (s === seq) chiudi(a); }, dur + 260);
        if (!raf && vivo) raf = requestAnimationFrame(tick);
        return a;
      }
      function setTimeoutRiserva(fn, ms) { timers.push(setTimeout(() => { if (vivo) fn(); }, ms)); }
      const ferma = a => { if (a && !a.fatto) { a.fatto = true; anims.delete(a); } };
      function fermaTutte() { anims.forEach(a => { a.fatto = true; }); anims.clear(); cancelAnimationFrame(raf); raf = 0; }

      /* ================= scena: pista e podio =================
         Il disegno vero sta in x 0…360, y 38…240; il viewBox (vbP) si allarga con altro cielo e altra
         pista nella direzione in cui c'è spazio, con il prato sempre in basso. */
      const svgS = el('svg', { viewBox: `0 0 ${SW} ${SH}`, preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': 'Pista con gli atleti e podio: trascina un atleta sul posto che brilla, oppure toccalo' });
      podioEl.appendChild(svgS);
      let vbP = { x0: 0, y0: 0, w: SW, h: SH };
      const defs = el('defs'); svgS.appendChild(defs);
      defs.innerHTML = `<linearGradient id="${uid}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb, var(--s1) 16%, var(--sup))"/><stop offset="1" style="stop-color:var(--sup)"/></linearGradient>
          <linearGradient id="${uid}-blocco" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sup)"/><stop offset="1" style="stop-color:var(--sup3)"/></linearGradient>
          <filter id="${uid}-ombra" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity="${scuro ? .5 : .22}"/></filter>`;
      const gSfondo = el('g'), gPosti = el('g'), gVuoti = el('g'), gSlot = el('g', { 'pointer-events': 'none' }), gTok = el('g'), gFx = el('g', { 'pointer-events': 'none' });
      [gSfondo, gPosti, gVuoti, gSlot, gTok, gFx].forEach(x => svgS.appendChild(x));

      function stella(cx, cy, r) {
        let d = '';
        for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + f1(cx + rr * Math.cos(a)) + ' ' + f1(cy + rr * Math.sin(a)); }
        return d + 'Z';
      }
      /* cielo, festoni e pista: coprono tutto il viewBox, qualunque forma abbia */
      function disegnaSfondo() {
        const { x0, y0, w, h } = vbP, x1 = x0 + w, y1 = y0 + h;
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--a6)'];
        const yt = y0 + 4, arco = x => { const t = (((x % 180) + 180) % 180) / 180; return yt + 2 + 2 * t * (1 - t) * 32; };
        let s = `<rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(w)}" height="${f1(PIANO - y0 + 1)}" fill="url(#${uid}-cielo)"/>`;
        /* la corda dei festoni: campionata dentro il viewBox, così niente esce dai bordi */
        let corda = '';
        for (let x = x0; x <= x1 + .01; x += Math.min(6, w)) corda += (corda ? 'L' : 'M') + f1(Math.min(x, x1)) + ' ' + f1(arco(Math.min(x, x1))) + ' ';
        s += `<path d="${corda}" fill="none" style="stroke:var(--testo3)" stroke-width="1" opacity=".55"/>`;
        for (let i = Math.ceil((x0 - 5.5) / 24); i * 24 + 18.5 <= x1; i++) {
          const x = i * 24 + 12, yy = arco(x);
          s += `<path d="M${f1(x - 6.5)} ${f1(yy)} L${f1(x + 6.5)} ${f1(yy)} L${f1(x)} ${f1(yy + 12)} Z" style="fill:${COL[((i % 5) + 5) % 5]}" opacity=".78"/>`;
        }
        s += `<rect x="${f1(x0)}" y="${PIANO}" width="${f1(w)}" height="14" style="fill:color-mix(in srgb, var(--s3) 36%, var(--sup))"/>
          <rect x="${f1(x0)}" y="${PIANO + 12}" width="${f1(w)}" height="${f1(y1 - PIANO - 12)}" style="fill:color-mix(in srgb, var(--s2) 22%, var(--sup))"/>
          <line x1="${f1(x0)}" x2="${f1(x1)}" y1="${PIANO + 16}" y2="${PIANO + 16}" stroke="#fff" stroke-width="2" opacity="${scuro ? .18 : .7}"/>
          <line x1="${f1(x0)}" x2="${f1(x1)}" y1="${SH - 5}" y2="${SH - 5}" stroke="#fff" stroke-width="2" opacity="${scuro ? .18 : .7}"/>`;
        gSfondo.innerHTML = s;
      }
      function costruisciScena() {
        const l = L(), P = posti(l.modo, l.k);
        let s = '';
        P.forEach(p => {
          const h = PIANO - p.top;
          s += `<g filter="url(#${uid}-ombra)"><rect x="${p.x - 34}" y="${p.top}" width="68" height="${h + 2}" rx="6" fill="url(#${uid}-blocco)" style="stroke:var(--bordo2)" stroke-width="1.2"/></g>
            <rect x="${p.x - 33.4}" y="${p.top + .6}" width="66.8" height="5" rx="3" style="fill:${p.med}" opacity=".85"/>`;
          if (l.modo === 'podio') { const fs = h > 40 ? 26 : h > 28 ? 21 : 16; s += `<text x="${p.x}" y="${f1(p.top + h / 2 + fs * .38)}" text-anchor="middle" style="font:700 ${fs}px var(--font-titoli);fill:var(--testo2)">${p.et}</text>`; }   /* il 4° gradino è basso: numero più piccolo */
          else if (l.modo === 'gare') s += `<text x="${p.x}" y="${p.top + 30}" text-anchor="middle" style="font:600 12px var(--font);fill:var(--testo2)">${p.et}</text>`;
          else s += `<path d="${stella(p.x, p.top + 25, 9)}" style="fill:color-mix(in srgb, var(--s4) 55%, var(--sup))"/>`;
        });
        if (l.modo === 'finale') s += `<text x="180" y="${P[0].top - 58}" text-anchor="middle" style="font:700 11px var(--font);letter-spacing:.14em;fill:var(--s4)">FINALE</text>`;
        gPosti.innerHTML = s;
        gVuoti.innerHTML = ''; gTok.innerHTML = ''; gSlot.innerHTML = ''; gFx.innerHTML = '';
        /* gli atleti in pista */
        pista = [];
        for (let i = 0; i < l.n; i++) {
          const a = ATLETI[i], hx = xPista(i, l.n);
          gVuoti.appendChild(el('text', { x: hx, y: SH - 12, 'text-anchor': 'middle', class: 'ab-nome', style: 'font: 600 11px var(--font); fill: var(--testo)', stroke: 'color-mix(in srgb, var(--s2) 22%, var(--sup))', 'stroke-width': 3, 'paint-order': 'stroke' }, a.nome));
          const vuoto = el('circle', { cx: hx, cy: YP, r: 19, fill: 'none', style: 'stroke: var(--testo3)', 'stroke-width': 1.6, 'stroke-dasharray': '4 4', opacity: 0 });
          gVuoti.appendChild(vuoto);
          const t = { i, hx, hy: YP, x: hx, y: YP, s: 1, g: token(i, false), su: false, vuoto };
          gTok.appendChild(t.g); posa(t);
          t.g.addEventListener('pointerdown', ev => giu(ev, t));
          t.g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); piazza(t.i, [t.x, t.y]); } });
          pista.push(t);
        }
        sulPodio = [];
        aggiornaPista(); aggiornaSlot();
      }
      function token(i, sul) {
        const a = ATLETI[i];
        const g = el('g', { class: 'ab-tok' + (sul ? ' sul' : ''), tabindex: sul ? null : 0, role: sul ? null : 'button', 'data-atleta': a.id,
          'aria-label': sul ? a.nome + ' sul podio: tocca per farlo scendere' : a.nome });
        g.innerHTML = `<ellipse cx="0" cy="22" rx="15" ry="3.6" fill="#000" opacity="${scuro ? .35 : .15}"/><g filter="url(#${uid}-ombra)">${faccia(a)}</g><circle r="27" fill="transparent"/>`;
        return g;
      }
      function posa(t) { t.g.setAttribute('transform', `translate(${f1(t.x)} ${f1(t.y)}) scale(${t.s.toFixed(3)})`); }
      function vola(t, x, y, s, dur, fine) {
        const x0 = t.x, y0 = t.y, s0 = t.s, salto = Math.hypot(x - x0, y - y0) > 30 ? 20 : 0;
        return anima(dur, u => { const e = morbida(u); t.x = x0 + (x - x0) * e; t.y = y0 + (y - y0) * e - Math.sin(Math.PI * u) * salto; t.s = s0 + (s - s0) * e; posa(t); }, fine);
      }
      function aggiornaPista() {
        pista.forEach(t => {
          t.g.style.display = t.su ? 'none' : '';
          t.vuoto.setAttribute('opacity', t.su ? .8 : 0);
        });
      }
      function aggiornaSlot() {
        while (gSlot.firstChild) gSlot.removeChild(gSlot.firstChild);
        const l = L(); if (!l || l.modelli) return;
        const P = posti(l.modo, l.k);
        if (fase === 'prev' || fase === 'cresce' || occupato || podio.length >= l.k) return;
        const p = P[podio.length];
        gSlot.appendChild(el('circle', { cx: p.x, cy: p.top - 21, r: 24, style: 'fill: color-mix(in srgb, var(--accento) 12%, transparent)' }));
        gSlot.appendChild(el('circle', { class: 'ab-attesa', cx: p.x, cy: p.top - 21, r: 21, fill: 'none', style: 'stroke: var(--accento)', 'stroke-width': 2.4, 'stroke-dasharray': '5 4' }));
        gSlot.appendChild(el('rect', { x: p.x - 33, y: p.top - 1, width: 66, height: 4, rx: 2, style: 'fill: var(--accento)', class: 'ab-attesa' }));
      }
      function coriandoli(cx, cy) {
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--a6)', 'var(--ok)'];
        for (let i = 0; i < 22; i++) {
          const a = i / 22 * Math.PI * 2 + (i % 2 ? .12 : -.1), v = 40 + (i * 31) % 34;
          const n = i % 3 ? el('circle', { r: 3.2, style: 'fill:' + COL[i % COL.length] }) : el('rect', { width: 6.5, height: 6.5, rx: 1.5, style: 'fill:' + COL[i % COL.length] });
          gFx.appendChild(n);
          anima(880, u => {
            const e = liscia(u), x = cx + Math.cos(a) * v * e, y = cy + Math.sin(a) * v * e * .8 + 30 * u * u;
            if (n.tagName === 'circle') { n.setAttribute('cx', f1(x)); n.setAttribute('cy', f1(y)); }
            else { n.setAttribute('x', f1(x - 3.2)); n.setAttribute('y', f1(y - 3.2)); n.setAttribute('transform', `rotate(${f1(i * 40 + u * 280)} ${f1(x)} ${f1(y)})`); }
            n.setAttribute('opacity', u < .6 ? 1 : 1 - (u - .6) / .4);
          }, () => n.remove());
        }
      }

      /* ================= l'albero =================
         Disegnato in pixel: il viewBox è grande quanto il riquadro, e l'albero si adatta allo spazio
         invece di scorrere. Due orientamenti: 'h' (radice a sinistra, foglie in colonna a destra) e
         'v' (radice in alto, foglie in riga in basso); si sceglie quello che lascia più spazio a ogni
         foglia dell'albero completo, così non cambia mentre l'albero cresce. Con poco spazio le foglie
         diventano puntini senza scritte: la forma a ventaglio e il contatore bastano. */
      const svgT = el('svg', { viewBox: '0 0 360 200', preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': 'Albero delle scelte' });
      alberoEl.appendChild(svgT);
      let AW = 360, AH = 200, G = null;
      const HEAD = 38, LEFT = 62;
      const chiave = path => path.join('');
      const chiaveGruppo = p => Array.from(typeof p === 'string' ? p : p.join('')).sort().join('');   /* indici < 10: basta una cifra */
      let gruppiOrd = [];                       /* le chiavi dei gruppi, in ordine fisso (per i colori) */
      function nuovoNodo(path, padre) {
        const n = { id: chiave(path), path, d: path.length, padre, aperto: false, figli: [], mano: false, contato: 0, gruppo: null, dup: false, rapp: false,
          x: padre ? padre.x : 0, y: padre ? padre.y : 0, a: padre ? 0 : 1, sx: 0, sy: 0, sa: 0, tx: 0, ty: 0, tr: 0 };
        nodi.set(n.id, n);
        return n;
      }
      function apri(n) {
        const l = L();
        if (!n || n.aperto || n.d >= l.k) return false;
        n.aperto = true;
        for (let i = 0; i < l.n; i++) if (l.rip || !n.path.includes(i)) n.figli.push(nuovoNodo(n.path.concat(i), n));
        return true;
      }
      function geometria(righe) {
        const l = L(), k = l.k, tot = foglieTot(l);
        const bH = AH - HEAD - 6, bV = AW - LEFT - 10;
        let o = bV / tot > (bH / tot) * 1.1 ? 'v' : 'h';
        if (o === 'h' && AW - 90 < k * 46) o = 'v';
        if (o === 'v' && (AH - 58) / k < 18 && bH / tot > 3) o = 'h';   /* in verticale servono almeno 18 px fra un piano e l'altro */
        const largo = o === 'h' ? bH : bV;
        const passo = Math.min(o === 'v' ? 96 : 44, largo / Math.max(1, righe));
        const fs = Math.min(13, passo * .8);
        /* le lettere sotto le foglie solo se c'è posto: in verticale servono anche piani abbastanza distanti */
        const R = Math.max(1.4, Math.min(11, passo * .42));
        /* sotto ogni foglia: le lettere (se ci sono), la spunta e la fogliolina contata */
        const sotto = e => R + (e ? fs * .95 * k : 0) + 28;
        const etich = passo >= 12 && (o === 'h' || (AH - 30 - sotto(true)) / k >= 30);
        const g = { o, passo, fs, etich, R };
        if (o === 'h') {
          const lw = etich ? fs * (.72 * k + .32 * (k - 1)) + 64 : 58;
          const dx = Math.min(150, (AW - 20 - lw) / k);
          const x0 = 18 + Math.max(0, (AW - 20 - lw - dx * k) / 2);
          g.dep = d => x0 + d * dx; g.b0 = HEAD + (bH - righe * passo) / 2;
        } else {
          const lh = sotto(etich);
          const dy = Math.min(130, (AH - 30 - lh) / k);
          const y0 = 24 + Math.max(0, (AH - 30 - lh - dy * k) / 2);
          g.dep = d => y0 + d * dy; g.b0 = LEFT + (bV - righe * passo) / 2;
          g.rami = dy >= 32;                    /* la riga «N rami» accanto al piano, se non si pesta con il piano dopo */
        }
        return g;
      }
      function layout() {
        let righe = 0;
        const visita = n => {
          if (n.aperto && n.figli.length) { n.figli.forEach(visita); n.tr = (n.figli[0].tr + n.figli[n.figli.length - 1].tr) / 2; }
          else n.tr = righe++;
        };
        visita(radiceAlb);
        G = geometria(righe);
        nodi.forEach(n => { const b = G.b0 + (n.tr + .5) * G.passo, d = G.dep(n.d); if (G.o === 'h') { n.tx = d; n.ty = b; } else { n.tx = b; n.ty = d; } });
      }
      const fissa = () => nodi.forEach(n => { n.x = n.tx; n.y = n.ty; });
      let alberoAnim = null;
      function ricomponi(dur, fine) {
        layout();
        nodi.forEach(n => { n.sx = n.x; n.sy = n.y; n.sa = n.a; });
        ferma(alberoAnim);
        alberoAnim = anima(dur, u => {
          const e = morbida(u);
          nodi.forEach(n => { n.x = n.sx + (n.tx - n.sx) * e; n.y = n.sy + (n.ty - n.sy) * e; n.a = n.sa + (1 - n.sa) * Math.min(1, e * 1.3); });
          disegnaAlbero();
        }, () => { alberoAnim = null; if (fine) fine(); });
      }
      function nuovoAlbero() {
        nodi = new Map(); contatore = 0; ultimaContata = null;
        radiceAlb = nuovoNodo([], null);
        const l = L();
        gruppiOrd = [];
        if (l.gruppi) {
          const giro = (da, scelti) => { if (scelti.length === l.k) { gruppiOrd.push(scelti.join('')); return; } for (let i = da; i < l.n; i++) giro(i + 1, scelti.concat(i)); };
          giro(0, []);
        }
        layout(); fissa();
        disegnaAlbero();
      }
      const nodoDi = path => nodi.get(chiave(path));
      const foglie = () => Array.from(nodi.values()).filter(n => n.d === L().k).sort((a, b) => a.tr - b.tr);
      const visto = j => Array.from(nodi.values()).some(n => n.d === j && n.aperto);
      const gruppiLiberi = () => libero && !L().ordine && (fase === 'gruppi' || fase === 'fine');

      function disegnaAlbero() {
        const l = L(); if (!l || l.modelli || !G || !radiceAlb) return;
        const corr = new Set(['']); podio.forEach((_, j) => corr.add(chiave(podio.slice(0, j + 1))));
        const fatto = new Set(); fatti.forEach(id => { for (let j = 0; j <= id.length; j++) fatto.add(id.slice(0, j)); });
        const { o, R, fs, etich, passo } = G, k = l.k, oriz = o === 'h';
        const lw = fs * (.72 * k + .32 * (k - 1));
        let r0 = '', r1 = '', r2 = '', bande = '', nn = '', et = '', testa = '';
        nodi.forEach(n => {
          if (n.padre) {
            const p = n.padre;
            const dd = oriz ? `M${f1(p.x)} ${f1(p.y)} C${f1((p.x + n.x) / 2)} ${f1(p.y)} ${f1((p.x + n.x) / 2)} ${f1(n.y)} ${f1(n.x)} ${f1(n.y)}`
              : `M${f1(p.x)} ${f1(p.y)} C${f1(p.x)} ${f1((p.y + n.y) / 2)} ${f1(n.x)} ${f1((p.y + n.y) / 2)} ${f1(n.x)} ${f1(n.y)}`;
            const d = `<path class="ab-ramo${corr.has(n.id) ? ' corr' : fatto.has(n.id) ? ' fatto' : ''}" d="${dd}" opacity="${(n.a * (n.dup ? .3 : 1)).toFixed(2)}"/>`;
            if (corr.has(n.id)) r2 += d; else if (fatto.has(n.id)) r1 += d; else r0 += d;
          } else {
            nn += `<g transform="translate(${f1(n.x)} ${f1(n.y)})"><circle r="8.5" style="fill:var(--testo2)"/><path d="${oriz ? 'M-2.6 -4.2 L4.4 0 L-2.6 4.2 Z' : 'M-4.2 -2.6 L0 4.4 L4.2 -2.6 Z'}" style="fill:var(--sup)"/></g>`;
            return;
          }
          const a = ATLETI[n.path[n.d - 1]], acceso = corr.has(n.id), op = (n.a * (n.dup ? .25 : 1)).toFixed(2);
          nn += `<g transform="translate(${f1(n.x)} ${f1(n.y)})" opacity="${op}">` +
            (acceso ? `<circle r="${f1(R + 3.2)}" style="fill:none;stroke:var(--accento)" stroke-width="2.2"/>` : '') +
            (n.rapp ? `<circle r="${f1(R + 2.6)}" style="fill:none;stroke:var(--accento)" stroke-width="2"/>` : '') +
            `<circle r="${f1(R)}" style="fill:${a.col};stroke:var(--sup)" stroke-width="${f1(Math.min(1.5, R * .4))}"/>` +
            (R >= 6 ? `<text y="${f1(R * .42)}" text-anchor="middle" style="font:700 ${f1(R * 1.18)}px var(--font);fill:#fff">${a.ini}</text>` : '') + '</g>';
          if (n.d !== k) return;
          const y = n.y, x = n.x;
          const foglia = (cx, cy, sc) => `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${sc.toFixed(2)})" opacity="${op}"><path d="M-6 0 C-3.5 -5.5 3 -6 6.5 -.5 C3 5 -3.5 5 -6 0 Z" style="fill:var(--s3);stroke:color-mix(in srgb, var(--s3) 60%, #000)" stroke-width=".8"/><path d="M-6 0 L4 -.4" style="stroke:color-mix(in srgb, var(--s3) 50%, #fff)" stroke-width=".8"/></g>`;
          const spunta = (cx, cy) => `<path d="M${f1(cx)} ${f1(cy)} l3 3.4 l6 -7" fill="none" style="stroke:var(--accento)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`;
          const scF = (n === ultimaContata ? 1.35 : 1) * Math.min(1, passo / 14);
          if (oriz) {
            const LX = x + R + 7;
            if (n.gruppo != null) bande += `<rect x="${f1(x - R - 3)}" y="${f1(y - passo / 2 + 1)}" width="${f1(AW - 4 - (x - R - 3))}" height="${f1(Math.max(1, passo - 2))}" rx="${f1(Math.min(7, passo / 3))}" style="fill:${GCOL[n.gruppo % GCOL.length]}" opacity="${scuro ? .3 : .22}"/>`;
            if (etich) et += `<text x="${f1(LX)}" y="${f1(y + fs * .36)}" opacity="${op}" style="font:700 ${f1(fs)}px var(--font)">` +
              n.path.map((i, j) => `<tspan ${j ? 'dx="' + f1(fs * .32) + '"' : ''} style="fill:${ATLETI[i].col}">${ATLETI[i].ini}</tspan>`).join('') + '</text>';
            const xs = etich ? LX + lw + 6 : x + R + 5;
            if (n.mano) et += spunta(xs, y);
            if (n.contato) {
              et += foglia(xs + 20, y, scF);
              if (etich && passo >= 14) et += `<text x="${f1(AW - 6)}" y="${f1(y + fs * .34)}" text-anchor="end" style="font:600 ${f1(fs * .92)}px var(--font);fill:var(--testo2)">${n.contato}</text>`;
            }
          } else {
            if (n.gruppo != null) bande += `<rect x="${f1(x - passo / 2 + 1)}" y="${f1(y - R - 3)}" width="${f1(Math.max(1, passo - 2))}" height="${f1(AH - 4 - (y - R - 3))}" rx="${f1(Math.min(7, passo / 3))}" style="fill:${GCOL[n.gruppo % GCOL.length]}" opacity="${scuro ? .3 : .22}"/>`;
            if (etich) n.path.forEach((i, j) => { et += `<text x="${f1(x)}" y="${f1(y + R + 3 + fs * .95 * (j + 1))}" text-anchor="middle" opacity="${op}" style="font:700 ${f1(fs)}px var(--font);fill:${ATLETI[i].col}">${ATLETI[i].ini}</text>`; });
            const yb = y + R + 3 + (etich ? fs * .95 * k : 0);
            if (n.mano) et += spunta(x - 4.5, yb + 7);
            if (n.contato) et += foglia(x, yb + 18, scF);
          }
        });
        /* intestazione: che posto è ogni piano e quanti rami ne escono; in alto a destra il contatore */
        const fat = fattori(l);
        for (let j = 0; j < k; j++) {
          const nome = etPosto(l.modo, j).replace(' scelta', ''), rami = visto(j) ? fat[j] + (fat[j] === 1 ? ' ramo' : ' rami') : '';
          if (oriz) testa += `<text class="ab-t" x="${f1(G.dep(j + 1))}" y="15" text-anchor="middle">${nome}</text>` + (rami ? `<text class="ab-t acc" x="${f1(G.dep(j + 1))}" y="30" text-anchor="middle">${rami}</text>` : '');
          else if (G.rami) testa += `<text class="ab-t" x="8" y="${f1(G.dep(j + 1) - 2)}">${nome}</text>` + (rami ? `<text class="ab-t acc" x="8" y="${f1(G.dep(j + 1) + 12)}">${rami}</text>` : '');
          else testa += `<text class="ab-t" x="8" y="${f1(G.dep(j + 1) + 4)}">${nome}` + (rami ? `<tspan class="acc" style="fill:var(--accento-testo)"> ×${fat[j]}</tspan>` : '') + '</text>';   /* piani vicini: una riga sola */
        }
        testa += `<text class="ab-t" x="${AW - 8}" y="15" text-anchor="end">${gruppiLiberi() ? 'gruppi' : 'foglie'}</text><text class="ab-cnt${batte ? ' batte' : ''}" x="${AW - 8}" y="33" text-anchor="end">${contatore > 0 ? contatore : '–'}</text>`;
        let vuoto = '';
        if (nodi.size === 1 && fase === 'prev') vuoto = oriz ? `<text class="ab-t" x="${f1(radiceAlb.x + 16)}" y="${f1(radiceAlb.y + 4)}">Prima la previsione: poi l'albero comincia a crescere.</text>`
          : `<text class="ab-t" x="${f1(radiceAlb.x)}" y="${f1(radiceAlb.y + 26)}" text-anchor="middle">Prima la previsione: poi l'albero comincia a crescere.</text>`;
        svgT.innerHTML = bande + r0 + r1 + r2 + nn + et + testa + vuoto;
      }
      const testa = () => disegnaAlbero();

      /* ================= dito, mouse, tastiera ================= */
      let gruppoTrovato = false;
      const scrivi = (t, tipo) => { msg.innerHTML = t || ''; msg.className = 'lab-messaggio' + (tipo ? ' ' + tipo : ''); };
      const elenco = ids => { const v = ids.map(i => ATLETI[+i].nome); return v.length > 1 ? v.slice(0, -1).join(', ') + ' e ' + v[v.length - 1] : v[0]; };
      /* dal dito alle coordinate della pista: il viewBox cambia forma, quindi si passa dalla matrice dello schermo */
      function puntoScena(ev) { const M = svgS.getScreenCTM(); if (!M) return null; const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(M.inverse()); return [p.x, p.y]; }
      function richiamaPrev() {
        prevEl.classList.remove('scuoti'); void prevEl.offsetWidth; prevEl.classList.add('scuoti');
        prevNota.textContent = 'Prima scrivi la tua previsione.';
        try { inPrev.focus({ preventScroll: true }); } catch (e) { /* niente */ }
      }
      function puoScegliere(i) {
        const l = L();
        return !l.modelli && fase !== 'prev' && fase !== 'cresce' && !occupato && podio.length < l.k && (l.rip || !podio.includes(i));
      }
      function giu(ev, t) {
        if (fase === 'prev') { richiamaPrev(); ev.preventDefault(); return; }
        if (!puoScegliere(t.i)) return;
        const p = puntoScena(ev); if (!p) return;
        presa = { t, p0: p, dx: t.x - p[0], dy: t.y - p[1], mosso: false };
        gTok.appendChild(t.g); t.g.classList.add('presa');
        try { t.g.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!presa) return;
        const p = puntoScena(ev); if (!p) return;
        if (!presa.mosso && Math.hypot(p[0] - presa.p0[0], p[1] - presa.p0[1]) > 6) presa.mosso = true;
        if (presa.mosso) { const t = presa.t; t.x = Math.max(vbP.x0 + 10, Math.min(vbP.x0 + vbP.w - 10, p[0] + presa.dx)); t.y = Math.max(vbP.y0 + 10, Math.min(SH - 10, p[1] + presa.dy)); t.s = 1.12; posa(t); }
        ev.preventDefault();
      }
      function dopoPresa() { if (rimandato) { rimandato = false; adatta(); } }
      function su() {
        if (!presa) return;
        const pr = presa, t = pr.t; presa = null;
        t.g.classList.remove('presa');
        if (!pr.mosso) { piazza(t.i, [t.x, t.y]); dopoPresa(); return; }              /* un tocco vale come trascinare */
        const l = L(), P = posti(l.modo, l.k), j = podio.length, x = t.x, y = t.y;
        const sopra = p => Math.abs(x - p.x) < 38 && y < PIANO + 6 && y > p.top - 64;
        if (j < l.k && (sopra(P[j]) || Math.hypot(x - P[j].x, y - (P[j].top - 21)) < 46)) { piazza(t.i, [x, y]); dopoPresa(); return; }
        if (P.some((p, qq) => qq !== j && sopra(p))) scrivi(l.modo === 'gare' ? 'Una gara alla volta: adesso tocca al piedistallo che brilla.' : 'Un posto alla volta: adesso tocca a quello che brilla.', 'no');
        vola(t, t.hx, t.hy, 1, 320);
        dopoPresa();
      }
      function lascia() { if (!presa) return; const t = presa.t; presa = null; t.g.classList.remove('presa'); vola(t, t.hx, t.hy, 1, 300); dopoPresa(); }

      /* ================= il podio ================= */
      function piazza(i, da) {
        if (fase === 'prev') { richiamaPrev(); return; }
        if (!puoScegliere(i)) return;
        const l = L(), j = podio.length, p = posti(l.modo, l.k)[j], t = pista[i];
        podio.push(i);
        const c = { i, x: da[0], y: da[1], s: 1.12, sy: p.top - 21, g: token(i, true) };
        c.g.addEventListener('click', () => { if (sulPodio[sulPodio.length - 1] === c) togli(); });
        gTok.appendChild(c.g); posa(c); sulPodio.push(c);
        vola(c, p.x, c.sy, 1, 380);
        if (l.rip) { if (Math.hypot(t.x - t.hx, t.y - t.hy) > 1) vola(t, t.hx, t.hy, 1, 320); else { t.s = 1; posa(t); } }
        else { t.su = true; t.x = t.hx; t.y = t.hy; t.s = 1; posa(t); }
        aggiornaPista(); aggiornaSlot();
        if (podio.length < l.k) { apri(nodoDi(podio)); ricomponi(480); scrivi(''); }
        else { disegnaAlbero(); foglia(); }
        testa(); formula(); comandi();
      }
      function togli() {
        const l = L();
        if (occupato || !podio.length || podio.length >= l.k) return;
        const i = podio.pop(), c = sulPodio.pop(), t = pista[i];
        vola(c, t.hx, t.hy, 1, 340, () => { c.g.remove(); if (!l.rip) { t.su = false; aggiornaPista(); } });
        aggiornaSlot(); disegnaAlbero(); formula(); comandi(); scrivi('');
      }
      const ETF = { podio: 'Podio: ', finale: 'In finale: ', gare: 'Vincitori: ', premi: 'Premiati: ' };
      function foglia() {
        const l = L(), n = nodoDi(podio), nuovo = !n.mano, nomi = podio.map(i => ATLETI[i].nome).join(', ');
        const dopoCompleto = fase !== 'mano';
        occupato = true; aggiornaSlot(); comandi();
        if (nuovo) { n.mano = true; fatti.push(n.id); }
        let testo, tipo = '';
        if (!nuovo) { testo = 'Questa foglia c\'era già: ' + (l.modo === 'gare' ? 'stessi vincitori nello stesso ordine' : 'stessi atleti nello stesso ordine') + ', stesso ramo. Prova un ordine diverso.'; tipo = 'no'; }
        else if (dopoCompleto) testo = ETF[l.modo] + nomi + '. È la foglia con la spunta.';
        else if (l.libero) testo = ETF[l.modo] + nomi + '.';
        else if (l.gruppi) {
          const g = chiaveGruppo(podio), stessi = fatti.filter(id => chiaveGruppo(id) === g);
          if (stessi.length >= 2) {
            const gi = gruppiOrd.indexOf(g);
            stessi.forEach(id => { nodi.get(id).gruppo = gi; });
            gruppoTrovato = true;
            testo = 'Due foglie diverse, un gruppo solo: sono sempre ' + elenco(g.split('')) + '. Le due foglie ora hanno lo stesso colore. Completa l\'albero e guarda quante volte succede.';
            tipo = 'ok';
          } else if (!gruppoTrovato) testo = fatti.length === 1 ? 'In finale: ' + nomi + '. Ora rimanda in finale gli stessi tre, cominciando da un altro.' : 'Questo è un gruppo diverso. Rifai una finale già fatta, con gli stessi tre in un altro ordine.';
          else testo = 'In finale: ' + nomi + '.';
        } else {
          const manca = l.mano - fatti.length;
          testo = (l.modo === 'gare' ? 'Vincitori: ' : 'Podio: ') + nomi + '. ' + (manca > 0 ? (manca === 1 ? 'Fanne ancora uno.' : 'Ne mancano ' + manca + '.') : 'Adesso puoi completare l\'albero, o fare altri ' + (l.modo === 'gare' ? 'giri' : 'podi') + ' a mano.');
        }
        scrivi(testo, tipo);
        disegnaAlbero(); comandi();
        /* un saltello sul podio, poi tutti tornano in pista */
        if (nuovo) dopo(() => sulPodio.forEach((c, j) => dopo(() => anima(340, u => { c.y = c.sy - Math.sin(Math.PI * u) * 11; posa(c); }), j * 70)), 400);
        dopo(() => {
          sulPodio.forEach(c => { const t = pista[c.i]; vola(c, t.hx, t.hy, 1, 420); });
          dopo(() => {
            sulPodio.forEach(c => c.g.remove()); sulPodio = [];
            pista.forEach(t => { t.su = false; });
            podio = []; occupato = false;
            aggiornaPista(); aggiornaSlot(); disegnaAlbero(); formula(); comandi();
          }, 470);
        }, nuovo ? 1050 : 800);
      }

      /* ================= l'albero completo e le foglie contate ================= */
      function completa() {
        const l = L();
        if (fase !== 'mano' || occupato || podio.length) return;
        if (radice.classList.contains('param-aperti')) {   /* sul telefono i parametri si richiudono: lo spazio serve all'albero */
          radice.classList.remove('param-aperti');
          const r = objEl.querySelector('.ab-riassunto'); if (r) r.setAttribute('aria-expanded', 'false');
        }
        fase = 'cresce'; comandi(); aggiornaSlot(); scrivi('');
        let d = 0;
        const passo = () => {
          if (d >= l.k) { conta(); return; }
          const da = Array.from(nodi.values()).filter(n => n.d === d && !n.aperto);
          d++;
          if (!da.length) { passo(); return; }
          da.forEach(apri); formula();
          ricomponi(560, () => dopo(passo, 140));
        };
        passo();
      }
      function conta() {
        contando = true; comandi();
        const ff = foglie(), dt = Math.max(24, Math.min(120, 1500 / ff.length));
        let k = 0;
        const passo = () => {
          if (k >= ff.length) { ultimaContata = null; disegnaAlbero(); fineConta(); return; }
          const n = ff[k++]; n.contato = k; contatore = k; ultimaContata = n;
          batte = true; disegnaAlbero(); batte = false;
          statoEl.innerHTML = '<b>' + k + '</b> foglie';
          dopo(passo, dt);
        };
        passo();
      }
      function fineConta() {
        const l = L();
        contando = false;
        fase = 'contato'; comandi(); formula();
        if (l.libero) {   /* in modalità libera nessun verdetto: si dice solo quante sono */
          if (l.ordine) { fase = 'fine'; scrivi('L\'albero ha ' + contatore + ' foglie: una per ogni modo di riempire i posti.'); }
          else scrivi(contatore + ' foglie, ma l\'ordine non conta: «Raggruppa» tiene una foglia sola per ogni gruppo di atleti.');
          comandi(); formula(); disegnaAlbero(); return;
        }
        if (l.gruppi) { scrivi(contatore + ' foglie: sono i modi di scegliere tre finalisti uno dopo l\'altro. Ma quanti gruppi diversi? Premi «Raggruppa».'); return; }
        vittoria();
      }
      /* livello 4: le carte dei gruppi prendono il posto del podio */
      function mostraGruppi(tutti) {
        const ff = foglie(), per = gruppiOrd.map(g => ff.filter(n => chiaveGruppo(n.path) === g));
        podioEl.hidden = true; gruppiEl.hidden = false;
        gruppiEl.innerHTML = gruppiOrd.map((g, gi) => `<div class="ab-gr" style="border-color:color-mix(in srgb, ${GCOL[gi]} 55%, var(--bordo));background:color-mix(in srgb, ${GCOL[gi]} 10%, var(--sup))">
            <div class="ab-gr-testa"><span class="ab-gr-facce">${g.split('').map(i => facciaMini(ATLETI[+i])).join('')}</span><span class="ab-gr-n">× <b>${tutti ? per[gi].length : 0}</b></span></div>
            <div class="ab-gr-ordini">${per[gi].map(n => '<span' + (tutti ? ' class="on"' : '') + '>' + n.path.map(i => `<i style="font-style:normal;color:${ATLETI[i].col}">${ATLETI[i].ini}</i>`).join('') + '</span>').join('')}</div></div>`).join('');
        if (tutti) per.forEach((m, gi) => m.forEach(n => { n.gruppo = gi; }));
        adatta();
        return per;
      }
      function raggruppa() {
        const l = L(); if (fase !== 'contato') return;
        if (l.libero) { raggruppaLibero(); return; }
        if (!l.gruppi) return;
        fase = 'gruppi'; contando = true; comandi(); scrivi('');
        const per = mostraGruppi(false);
        const carte = gruppiEl.querySelectorAll('.ab-gr');
        let gi = 0;
        const passo = () => {
          if (gi >= gruppiOrd.length) { dopo(() => { contando = false; vittoria(); }, 250); return; }
          const g = gi++, membri = per[g], ordini = carte[g].querySelectorAll('.ab-gr-ordini > span'), num = carte[g].querySelector('.ab-gr-n b');
          membri.forEach((n, j) => dopo(() => { n.gruppo = g; ultimaContata = n; disegnaAlbero(); ordini[j].classList.add('on'); num.textContent = j + 1; }, j * 75));
          dopo(() => { ultimaContata = null; disegnaAlbero(); passo(); }, membri.length * 75 + 280);
        };
        passo();
      }
      /* modalità libera, ordine che non conta: di ogni gruppo resta la foglia con gli atleti in ordine, le altre si spengono */
      function raggruppaLibero() {
        const l = L();
        fase = 'gruppi'; contando = true; comandi(); scrivi('');
        const ff = foglie();
        const rapp = ff.filter(n => n.path.every((v, j) => !j || (l.rip ? v >= n.path[j - 1] : v > n.path[j - 1])));
        ff.forEach(n => { n.dup = !rapp.includes(n); n.contato = 0; });
        contatore = 0; disegnaAlbero();
        const dt = Math.max(40, Math.min(160, 1400 / rapp.length));
        let k = 0;
        const passo = () => {
          if (k >= rapp.length) {
            contando = false; fase = 'fine'; ultimaContata = null;
            const quante = {}; ff.forEach(n => { const g = chiaveGruppo(n.path); quante[g] = (quante[g] || 0) + 1; });
            const misure = Object.values(quante), uguali = misure.every(m => m === misure[0]);
            scrivi(rapp.length + ' gruppi diversi su ' + ff.length + ' foglie. ' + (uguali ? 'Ogni gruppo compare ' + misure[0] + (misure[0] === 1 ? ' volta.' : ' volte, una per ogni ordine: ' + ff.length + ' : ' + misure[0] + ' = ' + rapp.length + '.')
              : 'Qui i gruppi non hanno tutti lo stesso numero di foglie: per questo non basta dividere.'));
            disegnaAlbero(); formula(); comandi(); return;
          }
          const n = rapp[k++]; n.rapp = true; n.contato = k; contatore = k; ultimaContata = n;
          batte = true; disegnaAlbero(); batte = false;
          dopo(passo, dt);
        };
        passo();
      }
      function vittoria() {
        const l = L();
        fase = 'vinto';
        ctx.completato(livello); aggiornaLivelli();
        const tot = l.gruppi ? gruppiOrd.length : contatore;
        scrivi('<span class="vinto">' + (l.gruppi ? tot + ' gruppi diversi di finalisti.' : tot + (l.modo === 'gare' ? ' modi' : ' podi') + ', uno per foglia.') + '</span><span class="ab-lungo" style="color:var(--testo)"> ' + l.vittoria + '</span>', 'ok');
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        comandi(); testa(); formula();
        if (!podioEl.hidden) coriandoli(180, 66);
        if (prev === l.giusto) ctx.zenone('Previsione giusta: ' + l.giusto + '. ' + l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
        else {
          const d = diagPrev(l, prev);
          if (d) ctx.zenone(d, { tipo: 'errore', espressione: 'pensa', durata: 10000 });
          else ctx.zenone('Avevi previsto ' + prev + ', sono ' + l.giusto + '. ' + l.vittoria, { espressione: 'pensa', durata: 9000 });
        }
      }

      /* ================= comandi e formula ================= */
      function comandi() {
        const l = L();
        bLibero.disabled = fase === 'cresce' || occupato || contando;
        if (l.modelli) return;
        comEl.hidden = fase === 'prev';
        const pronti = l.libero ? true : l.gruppi ? gruppoTrovato : fatti.length >= l.mano;
        bCompleta.hidden = fase !== 'mano';
        bCompleta.disabled = fase !== 'mano' || !pronti || occupato || podio.length > 0;
        bCompleta.classList.toggle('primario', !bCompleta.disabled);
        const conGruppi = l.libero ? !l.ordine : !!l.gruppi;
        bGruppi.hidden = !(conGruppi && ['contato', 'gruppi', 'vinto', 'fine'].includes(fase));
        bGruppi.disabled = fase !== 'contato';
        let s = '';
        if (fase === 'mano') s = l.libero ? (fatti.length ? 'fatti a mano: <b>' + fatti.length + '</b>' : '') : l.gruppi ? (gruppoTrovato ? 'stesso gruppo trovato ✓' : 'finali fatte a mano: <b>' + fatti.length + '</b>') : 'fatti a mano: <b>' + Math.min(fatti.length, l.mano) + '</b> di ' + l.mano;
        else if (fase === 'cresce') s = 'l\'albero cresce…';
        else if (fase !== 'prev') s = '<b>' + foglie().length + '</b> foglie';
        statoEl.innerHTML = s;
      }
      const riga = (et, corpo, cls) => '<div class="ab-riga' + (cls ? ' ' + cls : '') + '"><span class="ab-et">' + et + '</span><span class="ab-tex">' + corpo + '</span></div>';
      /* il conteggio della modalità libera, con la formula del modello scelto */
      function formulaLibera(l) {
        const n = l.n, k = l.k, fat = fattori(l), tot = foglieTot(l);
        if (l.ordine && !l.rip) return 'D_{' + n + ',' + k + '} = ' + (k > 1 ? fat.join(' \\cdot ') + ' = ' : '') + tot;
        if (l.ordine) return 'D\'_{' + n + ',' + k + '} = ' + n + '^{' + k + '} = ' + tot;
        if (!l.rip) return 'C_{' + n + ',' + k + '} = \\dfrac{D_{' + n + ',' + k + '}}{' + k + '!} = \\dfrac{' + tot + '}{' + fatt(k) + '} = ' + (tot / fatt(k));
        return 'C\'_{' + n + ',' + k + '} = \\dbinom{' + (n + k - 1) + '}{' + k + '} = ' + binom(n + k - 1, k);
      }
      function formula() {
        const l = L();
        if (l.modelli) { formulaModelli(); return; }
        const fat = fattori(l), tot = foglieTot(l), tutti = fat.every((_, j) => visto(j));
        let h = '';
        const pezzi = fat.map((f, j) => '\\underset{' + texPosto(l.modo, j) + '}{' + (visto(j) ? f : '\\square') + '}');
        h += riga(l.gruppi || (l.libero && !l.ordine) ? 'scelte in fila' : l.modo === 'gare' ? 'rami per gara' : 'rami per posto',
          visto(0) ? T(pezzi.join(' \\cdot ') + (tutti ? ' = ' + tot : '')) : '<span class="ab-vuoto">i fattori compaiono mentre l\'albero cresce</span>');
        if (l.libero) { h += riga('il conteggio', T(formulaLibera(l)), fase === 'fine' ? 'esito ok' : ''); carta.innerHTML = h; return; }
        if (prev != null) {
          const vero = l.gruppi ? gruppiOrd.length : tot;
          const chiuso = l.gruppi ? fase === 'vinto' : (fase === 'contato' || fase === 'vinto');
          if (chiuso) { const ok = prev === vero; h += riga('previsione', T('\\text{tu: } ' + prev + (ok ? ' = ' : ' \\neq ') + vero), 'esito ' + (ok ? 'ok' : 'no')); }
          else h += riga('previsione', T('\\text{tu: } ' + prev));
        }
        if (fase === 'vinto') h += riga('in formula', T('\\displaystyle ' + l.ponte), 'esito ok');
        carta.innerHTML = h;
      }

      /* ================= livello 6: il modello giusto ================= */
      function apriScheda(qi) {
        aperta = qi;
        modEl.querySelectorAll('.ab-caso').forEach((c, i) => c.classList.toggle('aperto', i === qi));
        modEl.querySelectorAll('.ab-scheda').forEach((t, i) => t.setAttribute('aria-selected', i === qi ? 'true' : 'false'));
      }
      function scegliModello(qi, m) {
        const card = modEl.querySelectorAll('.ab-caso')[qi];
        scelte[qi].m = m;
        card.querySelectorAll('.ab-mod').forEach(x => { const on = x.dataset.m === m; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        card.querySelector('.ab-sim').innerHTML = T(simbolo(m, CASI[qi].n, CASI[qi].k));
        card.querySelector('.ab-in').disabled = false;
      }
      function costruisciModelli() {
        scelte = CASI.map(() => ({ m: null, v: '', ok: false })); aperta = 0;
        modEl.innerHTML = '<div class="ab-schede" role="tablist" aria-label="Situazioni">' + CASI.map((c, qi) => `<button type="button" class="ab-scheda" role="tab" data-q="${qi}" aria-selected="${qi === 0}">${String.fromCharCode(65 + qi)} · ${c.et.replace(/^(Il|La) /, '')}</button>`).join('') + '</div>' +
          '<div class="ab-casi">' + CASI.map((c, qi) => `<div class="ab-caso${qi === 0 ? ' aperto' : ''}">
            <span class="ab-et">${String.fromCharCode(65 + qi)} · ${c.et}</span>
            <div class="ab-caso-testo">${ctx.md(c.testo)}</div>
            <div class="ab-scelte" role="group" aria-label="Modello">${['D', 'C', 'R'].map(m => `<button type="button" class="ab-mod" data-m="${m}" aria-pressed="false">${MODELLI[m]}</button>`).join('')}</div>
            <div class="ab-calcola"><span class="ab-sim"><span class="vuoto">scegli il modello</span></span><span>=</span><input class="ab-in" type="text" inputmode="numeric" maxlength="5" autocomplete="off" disabled aria-label="Numero dei casi" placeholder="?"></div>
            <div class="ab-caso-nota" aria-live="polite"></div><div class="ab-caso-calcolo"></div></div>`).join('') + '</div>' +
          '<div class="ab-controlla"><button type="button" class="btn primario b-controlla">Controlla</button></div>';
        modEl.querySelectorAll('.ab-scheda').forEach((t, qi) => t.addEventListener('click', () => apriScheda(qi)));
        modEl.querySelectorAll('.ab-caso').forEach((card, qi) => {
          const inp = card.querySelector('.ab-in'), nota = card.querySelector('.ab-caso-nota');
          card.querySelectorAll('.ab-mod').forEach(b => b.addEventListener('click', () => {
            if (fase !== 'modelli' || scelte[qi].ok) return;
            scegliModello(qi, b.dataset.m);
            card.classList.remove('no'); nota.textContent = '';
            formula();
          }));
          inp.addEventListener('input', () => { scelte[qi].v = inp.value; card.classList.remove('no'); nota.textContent = ''; formula(); });
          inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); controlla(); } });
        });
        modEl.querySelector('.b-controlla').addEventListener('click', controlla);
      }
      function controlla() {
        if (fase !== 'modelli') return;
        let giuste = 0, zen = null, manca = false, primaSbagliata = -1;
        const schede = modEl.querySelectorAll('.ab-scheda');
        modEl.querySelectorAll('.ab-caso').forEach((card, qi) => {
          const c = CASI[qi], s = scelte[qi], nota = card.querySelector('.ab-caso-nota');
          if (s.ok) { giuste++; return; }
          const t = s.v.trim(), v = /^\d+$/.test(t) ? +t : null, mOk = s.m === c.m;
          if (mOk && v === c.ris) {
            s.ok = true; giuste++;
            card.querySelector('.ab-caso-calcolo').innerHTML = T('\\displaystyle ' + c.calcolo);
            card.classList.remove('no', 'scuoti'); card.classList.add('ok'); nota.textContent = '';
            card.querySelectorAll('button, input').forEach(x => { x.disabled = true; });
            schede[qi].classList.remove('no'); schede[qi].classList.add('ok');
            return;
          }
          if (primaSbagliata < 0) primaSbagliata = qi;
          schede[qi].classList.add('no');
          card.classList.remove('ok', 'no', 'scuoti'); void card.offsetWidth; card.classList.add('no', 'scuoti');
          if (!s.m) { nota.textContent = 'Scegli prima il modello.'; manca = true; }
          else if (!mOk) nota.textContent = 'Non è il modello giusto. L\'ordine conta? Si può ripetere?';
          else if (v == null) { nota.textContent = 'Scrivi quanti sono i casi.'; manca = true; }
          else nota.textContent = 'Il modello è giusto, il conto no: rifallo.';
          if (!zen && s.m) zen = diagCaso(c, s.m, v);
        });
        formula();
        if (giuste === CASI.length) { vittoriaModelli(); return; }
        if (primaSbagliata >= 0) apriScheda(primaSbagliata);
        scrivi('Giuste ' + giuste + ' su ' + CASI.length + '.' + (manca ? ' Completa quelle che mancano.' : ''), 'no');
        if (zen) ctx.zenone(zen, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
      }
      function vittoriaModelli() {
        const l = L();
        fase = 'vinto';
        ctx.completato(livello); aggiornaLivelli();
        scrivi('<span class="vinto">Tutte e tre giuste.</span><span class="ab-lungo" style="color:var(--testo)"> ' + l.vittoria + '</span>', 'ok');
        bRic.textContent = 'Ricomincia dal primo'; bRic.classList.add('primario');
        const bc = modEl.querySelector('.b-controlla'); if (bc) bc.disabled = true;
        formula();
        ctx.zenone(l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
      }
      function formulaModelli() {
        let h = '';
        CASI.forEach((c, qi) => {
          const s = scelte[qi] || {}, t = (s.v || '').trim(), v = /^\d+$/.test(t) ? t : '\\,?';
          const corpo = s.ok ? T('\\displaystyle ' + c.calcolo) : s.m ? T(simbolo(s.m, c.n, c.k) + ' = ' + v) : '<span class="ab-vuoto">scegli il modello</span>';
          h += riga(String.fromCharCode(65 + qi) + ' · ' + c.et.replace(/^(Il|La) /, ''), corpo, s.ok ? 'esito ok' : '');
        });
        carta.innerHTML = h;
      }

      /* ================= livelli ================= */
      function prevedi() {
        if (fase !== 'prev') return;
        const t = inPrev.value.trim();
        if (!/^\d{1,5}$/.test(t)) {
          prevNota.textContent = 'Scrivi un numero intero, anche a occhio.';
          prevEl.classList.remove('scuoti'); void prevEl.offsetWidth; prevEl.classList.add('scuoti');
          return;
        }
        const l = L();
        prev = +t; fase = 'mano';
        prevEl.hidden = true;                  /* la previsione resta scritta nella carta delle formule */
        try { inPrev.blur(); } catch (e) { /* niente */ }
        apri(radiceAlb); ricomponi(520);
        aggiornaSlot(); comandi(); formula();
        scrivi(l.modo === 'gare' ? 'Trascina il vincitore della gara 1 sul piedistallo che brilla, oppure toccalo.' : 'Trascina un atleta sul ' + (l.modo === 'finale' ? 'posto' : 'gradino') + ' che brilla, oppure toccalo.');
      }
      function aggiornaLivelli() {
        const fattiL = ctx.stato().livelli, sblocco = fattiL.length ? Math.max(...fattiL) + 1 : 0;
        [...livelliEl.querySelectorAll('.lab-pallino')].forEach((p, i) => {
          p.classList.toggle('fatto', fattiL.includes(i));
          p.classList.toggle('attivo', !libero && i === livello);
          p.disabled = i > sblocco && i !== livello;
          p.setAttribute('aria-current', !libero && i === livello ? 'step' : 'false');
        });
        bLibero.setAttribute('aria-pressed', libero);
      }
      const pillole = aggiornaLivelli;
      /* nel pannello la consegna breve (se lo spazio è poco) e quella intera: il CSS sceglie quale si vede */
      function consegna() {
        if (libero) return '<span class="c-lungo">' + ctx.md(L().testo) + '</span>' +
          `<button type="button" class="btn piccolo ab-riassunto" aria-expanded="${radice.classList.contains('param-aperti')}">${LIB.n} atleti, ${LIB.k} ${LIB.k === 1 ? 'posto' : 'posti'} · ${LIB.ordine ? 'ordine sì' : 'ordine no'} · ${LIB.rip ? 'ripete' : 'non ripete'} <span aria-hidden="true">▾</span></button>`;
        const breve = BREVI[livello];
        return (breve ? '<span class="c-breve">' + ctx.md(breve) + '</span>' : '') + '<span class="c-lungo">' + ctx.md(L().testo) + '</span>';
      }
      function azzera() {
        seq++; fermaTutte(); presa = null; contando = false; ferma(alberoAnim); alberoAnim = null;
        prev = null; podio = []; fatti = []; sulPodio = []; occupato = false; gruppoTrovato = false; contatore = 0; ultimaContata = null;
        aiutoEl.hidden = true;
        gruppiEl.hidden = true; gruppiEl.innerHTML = '';
      }
      function avviaLivello(nuovo) {
        azzera();
        libero = false; salvato = null; mostraLibero();
        livello = nuovo;
        const l = L();
        fase = l.modelli ? 'modelli' : 'prev';
        objEl.innerHTML = consegna();
        radice.classList.toggle('ab-l6', !!l.modelli);
        podioEl.hidden = !!l.modelli; alberoEl.hidden = !!l.modelli; prevEl.hidden = !!l.modelli; comEl.hidden = !!l.modelli;
        modEl.hidden = !l.modelli;
        if (l.modelli) { svgT.innerHTML = ''; radiceAlb = null; costruisciModelli(); }
        else {
          prevEl.classList.remove('scuoti'); prevDom.innerHTML = ctx.md(l.domanda); inPrev.value = ''; prevNota.textContent = '';
          costruisciScena(); nuovoAlbero();
        }
        scrivi('');
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        aggiornaLivelli(); comandi(); formula(); adatta();
      }

      bPrev.addEventListener('click', prevedi);
      inPrev.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); prevedi(); } });
      inPrev.addEventListener('input', () => { prevNota.textContent = ''; });
      bCompleta.addEventListener('click', completa);
      bGruppi.addEventListener('click', raggruppa);
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        const l = L();
        /* se nel pannello c'è la consegna breve, quella intera si legge qui; a livello finito anche la spiegazione */
        const breve = objEl.querySelector('.c-breve'), cEl = aiutoEl.querySelector('.consegna'), dEl = aiutoEl.querySelector('.dopo');
        cEl.hidden = libero || !breve || getComputedStyle(breve).display === 'none';
        if (!cEl.hidden) cEl.innerHTML = ctx.md(l.testo);
        aiutoEl.querySelector('.testo-aiuto').innerHTML = ctx.md(l.aiuto);
        const lungo = msg.querySelector('.ab-lungo');
        dEl.hidden = !(fase === 'vinto' && lungo && getComputedStyle(lungo).display === 'none');
        if (!dEl.hidden) dEl.innerHTML = ctx.md(l.vittoria);
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });
      bRic.addEventListener('click', () => {
        if (libero) { avviaLibero(); return; }
        avviaLivello(fase === 'vinto' ? (livello + 1) % LIVELLI.length : livello);
      });

      /* ================= modalità libera: atleti, posti, ordine e ripetizioni li sceglie lo studente ================= */
      const valido = (n, k, rip) => n >= 2 && n <= 5 && k >= 1 && k <= 4 && (rip ? Math.pow(n, k) <= 125 : k <= n);
      function aggiornaParametri() {
        parametriEl.querySelectorAll('.lab-param[data-p]').forEach(box => {
          const p = box.dataset.p;
          box.querySelector('output').textContent = LIB[p];
          box.querySelectorAll('button[data-d]').forEach(b => {
            const d = +b.dataset.d;
            b.disabled = !valido(LIB.n + (p === 'n' ? d : 0), LIB.k + (p === 'k' ? d : 0), LIB.rip);
          });
        });
        const so = parametriEl.querySelector('[data-sw="ordine"]'), sr = parametriEl.querySelector('[data-sw="rip"]');
        so.textContent = LIB.ordine ? 'l\'ordine conta' : 'l\'ordine non conta'; so.setAttribute('aria-pressed', LIB.ordine ? 'true' : 'false');
        sr.textContent = LIB.rip ? 'si può ripetere' : 'non si ripete'; sr.setAttribute('aria-pressed', LIB.rip ? 'true' : 'false');
      }
      function mostraLibero() {
        parametriEl.hidden = !libero; bCasuale.hidden = !libero;
        radice.classList.toggle('in-libero', libero);
        if (libero) aggiornaParametri();
      }
      function avviaLibero() {
        azzera();
        LIBERO = livLibero(); libero = true; mostraLibero();
        fase = 'mano';
        objEl.innerHTML = consegna();
        podioEl.hidden = false; alberoEl.hidden = false; prevEl.hidden = true; modEl.hidden = true; comEl.hidden = false;
        costruisciScena(); nuovoAlbero(); apri(radiceAlb); layout(); fissa(); nodi.forEach(n => { n.a = 1; }); disegnaAlbero();
        scrivi('');
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        aggiornaSlot(); aggiornaLivelli(); comandi(); formula(); adatta();
      }
      /* uscendo dalla modalità libera si torna al livello com'era: si fotografa lo stato e poi si ricostruisce */
      function istantanea() {
        return { livello, fase, prev, fatti: fatti.slice(), gruppoTrovato, prevVal: inPrev.value, prevNota: prevNota.textContent,
          scelte: scelte.map(s => Object.assign({}, s)), aperta, schede: [...modEl.querySelectorAll('.ab-scheda')].map(t => t.className),
          note: [...modEl.querySelectorAll('.ab-caso')].map(c => [c.className, c.querySelector('.ab-caso-nota').textContent]),
          msg: msg.innerHTML, cls: msg.className, ric: bRic.textContent, prim: bRic.classList.contains('primario') };
      }
      function ripristina(z) {
        avviaLivello(z.livello);
        const l = L();
        if (l.modelli) {
          const carte = modEl.querySelectorAll('.ab-caso'), schede = modEl.querySelectorAll('.ab-scheda');
          z.scelte.forEach((s, qi) => {
            if (s.m) scegliModello(qi, s.m);
            carte[qi].querySelector('.ab-in').value = s.v;
            carte[qi].className = z.note[qi][0]; carte[qi].querySelector('.ab-caso-nota').textContent = z.note[qi][1];
            schede[qi].className = z.schede[qi];
            if (s.ok) carte[qi].querySelectorAll('button, input').forEach(x => { x.disabled = true; });
          });
          scelte = z.scelte; apriScheda(z.aperta);
          fase = z.fase;
          if (fase === 'vinto') { const bc = modEl.querySelector('.b-controlla'); if (bc) bc.disabled = true; }
        } else if (z.fase === 'prev') { inPrev.value = z.prevVal; prevNota.textContent = z.prevNota; }
        else {
          prev = z.prev; fase = 'mano'; prevEl.hidden = true;
          apri(radiceAlb);
          fatti = z.fatti.slice(); gruppoTrovato = z.gruppoTrovato;
          fatti.forEach(id => { const p = id.split('').map(Number); for (let j = 0; j < p.length; j++) apri(nodoDi(p.slice(0, j))); nodoDi(p).mano = true; });
          if (l.gruppi && gruppoTrovato) {
            const per = {}; fatti.forEach(id => { const g = chiaveGruppo(id); (per[g] = per[g] || []).push(id); });
            Object.keys(per).forEach(g => { if (per[g].length >= 2) per[g].forEach(id => { nodi.get(id).gruppo = gruppiOrd.indexOf(g); }); });
          }
          if (z.fase !== 'mano') {
            for (let d = 0; d < l.k; d++) Array.from(nodi.values()).filter(n => n.d === d).forEach(apri);
            layout();
            const ff = foglie(); ff.forEach((n, i) => { n.contato = i + 1; }); contatore = ff.length;
            fase = z.fase;
            if (l.gruppi && (fase === 'gruppi' || fase === 'vinto')) mostraGruppi(true);
          }
          layout(); fissa(); nodi.forEach(n => { n.a = 1; });
          disegnaAlbero(); aggiornaSlot();
        }
        msg.innerHTML = z.msg; msg.className = z.cls;
        bRic.textContent = z.ric; bRic.classList.toggle('primario', z.prim);
        aggiornaLivelli(); comandi(); formula(); adatta();
      }
      function casuale() {
        let giri = 0, n, k, o, r;
        do {
          n = 2 + Math.floor(Math.random() * 4); k = 1 + Math.floor(Math.random() * 4);
          o = Math.random() < .5; r = Math.random() < .4; giri++;
        } while (giri < 60 && (!valido(n, k, r) || k === 1 || (n === LIB.n && k === LIB.k && o === LIB.ordine && r === LIB.rip)));
        if (!valido(n, k, r)) return;
        Object.assign(LIB, { n, k, ordine: o, rip: r });
        avviaLibero();
      }
      bLibero.addEventListener('click', () => {
        if (bLibero.disabled) return;
        if (libero) { const z = salvato; salvato = null; ripristina(z); }
        else { salvato = istantanea(); avviaLibero(); }
      });
      bCasuale.addEventListener('click', () => { if (libero) casuale(); });
      objEl.addEventListener('click', ev => {
        const b = ev.target.closest('.ab-riassunto'); if (!b) return;
        const aperti = radice.classList.toggle('param-aperti'); b.setAttribute('aria-expanded', aperti);
      });
      parametriEl.addEventListener('click', ev => {
        if (!libero) return;
        const b = ev.target.closest('button'); if (!b || b.disabled) return;
        if (b.dataset.sw) {
          if (b.dataset.sw === 'ordine') LIB.ordine = !LIB.ordine;
          else { LIB.rip = !LIB.rip; while (!valido(LIB.n, LIB.k, LIB.rip) && LIB.k > 1) LIB.k--; }
          avviaLibero(); return;
        }
        const p = b.closest('.lab-param').dataset.p, d = +b.dataset.d;
        const n = LIB.n + (p === 'n' ? d : 0), k = LIB.k + (p === 'k' ? d : 0);
        if (!valido(n, k, LIB.rip)) return;
        LIB.n = n; LIB.k = k; avviaLibero();
      });
      LIVELLI.forEach((_, i) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (i + 1)); p.innerHTML = '<span>' + (i + 1) + '</span>';
        p.addEventListener('click', () => { if (bLibero.disabled && libero) return; if (libero || i !== livello || fase === 'vinto') avviaLivello(i); });
        livelliEl.insertBefore(p, bLibero);
      });

      /* ================= la forma dello spazio decide podio e albero =================
         Il podio prende una fascia in alto (più alta in orizzontale), l'albero tutto il resto. */
      let rimandato = false, misP = '', misT = '';
      function adatta() {
        if (presa) { rimandato = true; return; }     /* mentre si trascina si aspetta che il dito si stacchi */
        const l = L(); if (l.modelli) return;
        const Hr = radice.clientHeight, Hs = scena.clientHeight, orizz = radice.clientWidth * 4 >= Hr * 5;
        if (Hs < 10) return;
        const P = Math.round(Math.max(150, Math.min(orizz ? Hr * .4 : Hr * .3, orizz ? 360 : 330, Hs * .55)));
        podioEl.style.height = P + 'px'; gruppiEl.style.height = P + 'px';
        if (!podioEl.hidden) {
          const w = podioEl.clientWidth, h = podioEl.clientHeight;
          if (w > 10 && h > 10) {
            /* il disegno vero (x 0…360, y 38…240) sta tutto dentro; il resto è cielo e pista in più */
            const s = Math.min(w / SW, h / 202), vw = w / s, vh = h / s, m = Math.round(vw) + 'x' + Math.round(vh);
            if (m !== misP) { misP = m; vbP = { x0: 180 - vw / 2, y0: SH - vh, w: vw, h: vh }; svgS.setAttribute('viewBox', `${f1(vbP.x0)} ${f1(vbP.y0)} ${f1(vw)} ${f1(vh)}`); disegnaSfondo(); }
          }
        }
        const aw = alberoEl.clientWidth, ah = alberoEl.clientHeight, mt = aw + 'x' + ah;
        if (aw > 10 && ah > 10 && mt !== misT) {
          misT = mt; AW = aw; AH = ah; svgT.setAttribute('viewBox', `0 0 ${AW} ${AH}`);
          if (radiceAlb) { layout(); if (!alberoAnim) fissa(); disegnaAlbero(); }
        }
      }

      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', su);
      window.addEventListener('pointercancel', lascia);

      disegnaSfondo();
      avviaLivello(livello);
      const ro = new ResizeObserver(() => adatta()); ro.observe(radice); ro.observe(scena); ro.observe(alberoEl);

      return function smonta() {
        vivo = false; seq++;
        fermaTutte(); timers.forEach(clearTimeout);
        ro.disconnect();
        window.removeEventListener('pointermove', muovi, { passive: false });
        window.removeEventListener('pointerup', su);
        window.removeEventListener('pointercancel', lascia);
      };
    }
  });
})();
