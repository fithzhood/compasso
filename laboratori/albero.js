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
   Contratto e regole: SCHEMA-LAB.md — modelli: laboratori/giostra.js, laboratori/specchio.js */
(function () {
  const STILE = `
    .lab-albero { container-type: inline-size; }
    .lab-albero .ab { display: flex; flex-direction: column; }
    .lab-albero .ab-sx, .lab-albero .ab-dx { display: contents; }
    .lab-albero .ab-obiettivo { order: 1; } .lab-albero .ab-aiuto { order: 2; } .lab-albero .ab-prev { order: 3; }
    .lab-albero .lab-scena, .lab-albero .ab-modelli { order: 4; } .lab-albero .ab-comandi { order: 5; }
    .lab-albero .ab-albero { order: 6; } .lab-albero .ab-gruppi { order: 7; } .lab-albero .ab-carta { order: 8; }
    .lab-albero .lab-messaggio { order: 9; }
    @container (min-width: 720px) {
      .lab-albero .ab { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; gap: 0 2px; }
      .lab-albero .ab-sx, .lab-albero .ab-dx { display: flex; flex-direction: column; min-width: 0; }
      .lab-albero .ab-dx { padding: 10px 0 0; }
      .lab-albero .ab-rami { max-height: 640px; }
    }
    .lab-albero [hidden] { display: none !important; }
    .lab-albero .ab-obiettivo { padding: 12px 16px 2px; font-size: .97rem; line-height: 1.55; }
    .lab-albero .ab-obiettivo p { margin: 0; }
    .lab-albero .ab-obiettivo strong { color: var(--accento-testo); }
    .lab-albero .ab-aiuto { margin: 8px 12px 0; padding: 10px 14px; border-radius: 14px; background: var(--accento-tenue); color: var(--testo); font-size: .92rem; line-height: 1.5; animation: lab-albero-pop .3s var(--morbido); }
    .lab-albero .ab-aiuto p { margin: 0; }
    .lab-albero .ab-et { font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; color: var(--testo2); font-weight: 600; }

    /* previsione */
    .lab-albero .ab-prev { margin: 10px 12px 0; padding: 10px 12px 12px; border-radius: 16px; background: var(--sup); border: 1.5px solid color-mix(in srgb, var(--accento) 35%, var(--bordo)); box-shadow: var(--ombra); transition: background .25s, border-color .25s, padding .25s; }
    .lab-albero .ab-prev-dom { font-size: .93rem; line-height: 1.45; margin: 3px 0 9px; }
    .lab-albero .ab-prev-dom p { margin: 0; }
    .lab-albero .ab-prev-riga { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .lab-albero .ab-in { width: 6.2em; min-height: 46px; font: 600 1.2rem var(--font); text-align: center; border-radius: 12px; border: 1.5px solid var(--bordo2);
      background: var(--sup2); color: var(--testo); padding: 4px 8px; -webkit-user-select: text; user-select: text; }
    .lab-albero .ab-in:focus { outline: none; border-color: var(--accento); box-shadow: 0 0 0 3px var(--accento-tenue); }
    .lab-albero .ab-in:disabled { opacity: .45; }
    .lab-albero .ab-prev .btn { min-height: 46px; font-weight: 600; }
    .lab-albero .ab-prev-nota { font-size: .84rem; color: var(--no); min-height: 0; }
    .lab-albero .ab-prev.chiusa { background: var(--sup2); border-color: var(--bordo); box-shadow: none; padding: 8px 14px; }
    .lab-albero .ab-prev-fatto { display: flex; align-items: baseline; gap: 4px 10px; flex-wrap: wrap; font-size: .92rem; color: var(--testo2); animation: lab-albero-pop .35s var(--molla); }
    .lab-albero .ab-prev-fatto b { font: 700 1.35rem var(--font); color: var(--accento-testo); }

    /* scena */
    .lab-albero .lab-scena { background: transparent; padding: 10px 10px 0; }
    .lab-albero .lab-scena svg { max-width: 520px; margin: 0 auto; border-radius: 20px; box-shadow: var(--ombra); }
    .lab-albero .ab-tok { cursor: grab; outline: none; }
    .lab-albero .ab-tok.presa { cursor: grabbing; }
    .lab-albero .ab-tok.sul { cursor: pointer; }
    .lab-albero .ab-tok:focus-visible .ab-anello { stroke: var(--accento); stroke-width: 3; }
    .lab-albero .ab-attesa { animation: lab-albero-attesa 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes lab-albero-attesa { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .45; transform: scale(1.1); } }

    /* comandi */
    .lab-albero .ab-comandi { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px 12px; padding: 10px 12px 0; }
    .lab-albero .ab-comandi .btn { min-height: 46px; font-weight: 600; }
    .lab-albero .ab-comandi .btn[disabled] { opacity: .4; cursor: default; box-shadow: none; }
    .lab-albero .ab-stato { font-size: .84rem; color: var(--testo2); }
    .lab-albero .ab-stato b { color: var(--testo); }

    /* albero */
    .lab-albero .ab-albero { margin: 10px 12px 0; border-radius: 18px; background: var(--sup); border: 1px solid var(--bordo); box-shadow: var(--ombra); overflow: hidden; }
    .lab-albero .ab-testa { position: relative; height: 42px; max-width: 440px; margin: 0 auto; }
    .lab-albero .ab-albero-testa { border-bottom: 1px solid var(--bordo); background: var(--sup2); }
    .lab-albero .ab-col { position: absolute; top: 6px; transform: translateX(-50%); text-align: center; font-size: .72rem; line-height: 1.25; color: var(--testo2); font-weight: 600; white-space: nowrap; }
    .lab-albero .ab-col small { display: block; font-size: .7rem; font-weight: 600; color: var(--accento-testo); min-height: 1.2em; }
    .lab-albero .ab-col small.nuovo { animation: lab-albero-pop .4s var(--molla); }
    .lab-albero .ab-conta { left: auto; right: 10px; transform: none; text-align: right; }
    .lab-albero .ab-conta b { display: block; font: 700 1rem var(--font); color: var(--testo); }
    .lab-albero .ab-conta b.batte { animation: lab-albero-batte .22s ease; }
    .lab-albero .ab-rami { max-height: min(66vh, 520px); overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y;
      background: color-mix(in srgb, var(--s3) 5%, var(--sup)); }
    .lab-albero .ab-rami svg { display: block; width: 100%; max-width: 440px; margin: 0 auto; height: auto; }
    .lab-albero .ab-ramo { fill: none; stroke: var(--testo3); stroke-width: 1.4; stroke-opacity: .6; stroke-linecap: round; }
    .lab-albero .ab-ramo.fatto { stroke: var(--accento); stroke-width: 2.4; stroke-opacity: .42; }
    .lab-albero .ab-ramo.corr { stroke: var(--accento); stroke-width: 3.4; stroke-opacity: 1; }

    /* gruppi (livello 4) */
    .lab-albero .ab-gruppi { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 10px 12px 0; }
    .lab-albero .ab-gr { border-radius: 14px; padding: 8px 10px 9px; background: var(--sup); border: 1.5px solid var(--bordo); box-shadow: var(--ombra); animation: lab-albero-pop .35s var(--molla); }
    .lab-albero .ab-gr-testa { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
    .lab-albero .ab-gr-facce { display: flex; }
    .lab-albero .ab-gr-facce svg { width: 25px; height: 32px; margin-right: -3px; }
    .lab-albero .ab-gr-n { font: 700 1rem var(--font); color: var(--testo); }
    .lab-albero .ab-gr-ordini { display: flex; flex-wrap: wrap; gap: 3px 8px; margin-top: 5px; font: 700 .76rem var(--font); letter-spacing: .05em; }
    .lab-albero .ab-gr-ordini > span { opacity: .14; transition: opacity .25s; }
    .lab-albero .ab-gr-ordini > span.on { opacity: 1; }

    /* livello 6: i modelli */
    .lab-albero .ab-modelli { display: flex; flex-direction: column; gap: 10px; padding: 10px 12px 0; }
    .lab-albero .ab-caso { padding: 10px 12px 12px; border-radius: 16px; background: var(--sup); border: 1.5px solid var(--bordo); box-shadow: var(--ombra); transition: border-color .2s, background .2s; }
    .lab-albero .ab-caso.ok { border-color: var(--ok); background: color-mix(in srgb, var(--ok-tenue) 75%, var(--sup)); animation: lab-albero-pop .45s var(--molla); }
    .lab-albero .ab-caso.no { border-color: var(--no); }
    .lab-albero .ab-caso.ok .ab-in:disabled { opacity: 1; border-color: color-mix(in srgb, var(--ok) 55%, var(--bordo)); color: var(--ok); background: var(--sup); }
    .lab-albero .ab-caso.ok .ab-mod:not(.sel) { opacity: .5; }
    .lab-albero .ab-caso-testo { margin: 4px 0 9px; font-size: .93rem; line-height: 1.5; }
    .lab-albero .ab-caso-testo p { margin: 0; }
    .lab-albero .ab-scelte { display: flex; flex-wrap: wrap; gap: 6px; }
    .lab-albero .ab-mod { flex: 1 1 auto; min-height: 42px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup2); color: var(--testo);
      font: 600 .86rem var(--font); padding: 4px 10px; cursor: pointer; transition: transform .25s var(--molla), background .2s, border-color .2s, color .2s; }
    .lab-albero .ab-mod:active { transform: scale(.97); }
    .lab-albero .ab-mod.sel { border-color: var(--accento); background: var(--accento-tenue); color: var(--accento-testo); }
    .lab-albero .ab-mod:disabled { cursor: default; }
    .lab-albero .ab-calcola { display: flex; align-items: center; gap: 8px; margin-top: 9px; font-size: 1.08rem; min-height: 46px; flex-wrap: wrap; }
    .lab-albero .ab-sim { min-width: 3.2em; color: var(--testo); }
    .lab-albero .ab-sim .vuoto { font-size: .82rem; color: var(--testo3); }
    .lab-albero .ab-caso-nota { font-size: .85rem; line-height: 1.45; color: var(--no); margin-top: 6px; }
    .lab-albero .ab-caso-nota:empty { display: none; }
    .lab-albero .ab-controlla { display: flex; justify-content: center; padding: 2px 0 0; }
    .lab-albero .ab-controlla .btn { min-height: 48px; min-width: 11em; font-weight: 600; }

    /* formula */
    .lab-albero .ab-carta { margin: 10px 12px 0; padding: 8px 12px; border-radius: 16px; background: var(--sup); border: 1px solid var(--bordo); box-shadow: var(--ombra); display: flex; flex-direction: column; gap: 2px; }
    .lab-albero .ab-riga { display: flex; align-items: baseline; gap: 2px 10px; flex-wrap: wrap; min-height: 1.95em; }
    .lab-albero .ab-riga .ab-et { min-width: 7.6em; }
    .lab-albero .ab-tex { font-size: 1.06rem; display: inline-flex; flex-wrap: wrap; gap: 2px 14px; align-items: baseline; color: var(--testo); }
    .lab-albero .ab-tex .katex { white-space: nowrap; }
    .lab-albero .ab-riga.esito { margin-top: 4px; padding: 5px 8px; border-radius: 12px; animation: lab-albero-pop .45s var(--molla); }
    .lab-albero .ab-riga.esito.ok { background: var(--ok-tenue); } .lab-albero .ab-riga.esito.ok .ab-et { color: var(--ok); }
    .lab-albero .ab-riga.esito.no { background: var(--no-tenue); } .lab-albero .ab-riga.esito.no .ab-et { color: var(--no); }
    .lab-albero .ab-vuoto { color: var(--testo3); font-size: .9rem; }
    @media (max-width: 600px) { .lab-albero .ab-tex { font-size: .98rem; } .lab-albero .ab-riga .ab-et { min-width: 100%; } .lab-albero .ab-riga { min-height: 0; padding-top: 3px; } }

    .lab-albero .lab-messaggio { padding-left: 16px; padding-right: 16px; line-height: 1.5; }
    .lab-albero .lab-messaggio.ok { font-weight: 500; }
    .lab-albero .vinto { display: inline-block; animation: lab-albero-pop .5s var(--molla); font-weight: 600; }
    .lab-albero .livelli { display: flex; gap: 6px; flex-wrap: wrap; }
    .lab-albero .pill { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup);
      color: var(--testo2); font: 700 .95rem var(--font); cursor: pointer; padding: 0; transition: transform .3s var(--molla), background .2s, color .2s; }
    .lab-albero .pill.fatto { background: var(--ok-tenue); color: var(--ok); border-color: color-mix(in srgb, var(--ok) 45%, var(--bordo)); }
    .lab-albero .pill.qui { background: var(--accento); color: #fff; border-color: var(--accento); transform: scale(1.07); }
    .lab-albero .pill[disabled] { opacity: .35; cursor: default; }
    .lab-albero .b-aiuto { min-width: 42px; }
    .lab-albero .lab-barra .btn[disabled] { opacity: .38; cursor: default; }
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

  /* ---------------- geometria ---------------- */
  const SW = 360, SH = 240, PIANO = 150, YP = 196;          /* scena: base del podio, riga degli atleti in pista */
  const TW = 360, COLX = [16, 90, 164, 238], LX = 254, PADT = 10, PADB = 12;   /* albero */
  function posti(modo) {
    if (modo === 'podio') return [
      { x: 180, top: 86, et: '1', med: 'var(--a6)' },
      { x: 110, top: 104, et: '2', med: 'var(--testo3)' },
      { x: 250, top: 118, et: '3', med: 'color-mix(in srgb, var(--s2) 62%, #5a3312)' }];
    return [110, 180, 250].map((x, i) => ({ x, top: 104, et: modo === 'gare' ? 'gara ' + (i + 1) : '', med: modo === 'gare' ? 'var(--s1)' : 'var(--s4)' }));
  }
  const xPista = (i, n) => 180 + (i - (n - 1) / 2) * (n <= 3 ? 84 : n === 4 ? 74 : 66);
  const etPosto = (modo, j) => (modo === 'podio' ? (j + 1) + '°' : modo === 'finale' ? (j + 1) + 'ª scelta' : 'gara ' + (j + 1));
  const texPosto = (modo, j) => (modo === 'podio' ? (j + 1) + '^\\circ' : modo === 'finale' ? (j + 1) + '^{\\text{a}}' : '\\text{gara ' + (j + 1) + '}');

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const f1 = v => (Math.round(v * 10) / 10).toString();
  const liscia = u => 1 - Math.pow(1 - u, 3);
  const morbida = u => (u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
  const GCOL = ['var(--a6)', 'var(--a5)', 'var(--accento)', 'var(--a3)'];

  COMPASSO.registraLab({
    id: 'albero',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-albero')) { const s = document.createElement('style'); s.id = 'stile-lab-albero'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-albero');
      const uid = 'ab' + Math.random().toString(36).slice(2, 7);
      radice.innerHTML = `
        <div class="ab">
          <div class="ab-sx">
            <div class="ab-obiettivo"></div>
            <div class="ab-aiuto" hidden></div>
            <div class="ab-prev">
              <div class="ab-prev-chiedi">
                <span class="ab-et">la tua previsione</span>
                <div class="ab-prev-dom" id="${uid}-dom"></div>
                <div class="ab-prev-riga">
                  <input class="ab-in ab-prev-in" type="text" inputmode="numeric" maxlength="5" autocomplete="off" aria-labelledby="${uid}-dom" placeholder="?">
                  <button type="button" class="btn primario b-prev">Prevedo</button>
                  <span class="ab-prev-nota" aria-live="polite"></span>
                </div>
              </div>
              <div class="ab-prev-fatto" hidden></div>
            </div>
            <div class="lab-scena"></div>
            <div class="ab-modelli" hidden></div>
            <div class="ab-comandi">
              <button type="button" class="btn primario b-completa">Completa l'albero</button>
              <button type="button" class="btn primario b-gruppi" hidden>Raggruppa</button>
              <span class="ab-stato" aria-live="polite"></span>
            </div>
            <div class="ab-carta"></div>
            <div class="lab-messaggio" aria-live="polite"></div>
          </div>
          <div class="ab-dx">
            <div class="ab-albero">
              <div class="ab-albero-testa"><div class="ab-testa"></div></div>
              <div class="ab-rami"></div>
            </div>
            <div class="ab-gruppi" hidden></div>
          </div>
        </div>
        <div class="lab-barra">
          <div class="livelli" role="group" aria-label="Livelli"></div>
          <button type="button" class="btn piccolo b-aiuto" aria-label="Come si gioca" title="Come si gioca">?</button>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <span class="lab-livello"></span>
        </div>`;

      const q = s => radice.querySelector(s);
      const objEl = q('.ab-obiettivo'), aiutoEl = q('.ab-aiuto'), prevEl = q('.ab-prev'), prevChiedi = q('.ab-prev-chiedi'), prevDom = q('.ab-prev-dom');
      const inPrev = q('.ab-prev-in'), bPrev = q('.b-prev'), prevNota = q('.ab-prev-nota'), prevFatto = q('.ab-prev-fatto');
      const scena = q('.lab-scena'), modEl = q('.ab-modelli'), comEl = q('.ab-comandi'), bCompleta = q('.b-completa'), bGruppi = q('.b-gruppi'), statoEl = q('.ab-stato');
      const carta = q('.ab-carta'), msg = q('.lab-messaggio'), alberoEl = q('.ab-albero'), testaEl = q('.ab-testa'), ramiEl = q('.ab-rami'), gruppiEl = q('.ab-gruppi');
      const pillEl = q('.livelli'), livEl = q('.lab-livello'), bAiuto = q('.b-aiuto'), bRic = q('.b-ric');
      const scuro = ctx.tema() === 'scuro';
      const T = s => ctx.tex(s);

      /* ================= stato ================= */
      const st0 = ctx.stato().livelli;
      let livello = st0.length ? Math.max(...st0) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      const L = () => LIVELLI[livello];
      let fase = 'prev';          /* prev → mano → cresce → contato (→ gruppi) → vinto; oppure 'modelli' */
      let prev = null, podio = [], fatti = [], pista = [], sulPodio = [], occupato = false, presa = null;
      let nodi = new Map(), radiceAlb = null, rowH = 34, altezza = 60, altCorr = 60, contatore = 0, ultimaContata = null;
      let scelte = [], vivo = true, seq = 0;
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

      /* ================= scena: pista e podio ================= */
      const svgS = el('svg', { viewBox: `0 0 ${SW} ${SH}`, role: 'group', 'aria-label': 'Pista con gli atleti e podio: trascina un atleta sul posto che brilla, oppure toccalo' });
      scena.appendChild(svgS);
      let gSfondo, gVuoti, gSlot, gTok, gFx;

      function festoni() {
        const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--a6)'];
        const y = x => { const t = x <= 180 ? (x + 5) / 185 : (x - 180) / 185, m = 1 - t; return x <= 180 ? m * m * 6 + 2 * m * t * 24 + t * t * 8 : m * m * 8 + 2 * m * t * 24 + t * t * 6; };
        let s = '<path d="M-5 6 Q90 42 180 8 Q270 42 365 6" fill="none" style="stroke:var(--testo3)" stroke-width="1" opacity=".55"/>';
        for (let i = 0; i < 15; i++) { const x = 12 + i * 24.0, yy = y(x); s += `<path d="M${f1(x - 6.5)} ${f1(yy)} L${f1(x + 6.5)} ${f1(yy)} L${f1(x)} ${f1(yy + 12)} Z" style="fill:${COL[i % COL.length]}" opacity=".78"/>`; }
        return s;
      }
      function stella(cx, cy, r) {
        let d = '';
        for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + f1(cx + rr * Math.cos(a)) + ' ' + f1(cy + rr * Math.sin(a)); }
        return d + 'Z';
      }
      function costruisciScena() {
        const l = L(), P = posti(l.modo);
        while (svgS.firstChild) svgS.removeChild(svgS.firstChild);
        let s = `<defs>
          <linearGradient id="${uid}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb, var(--s1) 16%, var(--sup))"/><stop offset="1" style="stop-color:var(--sup)"/></linearGradient>
          <linearGradient id="${uid}-blocco" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sup)"/><stop offset="1" style="stop-color:var(--sup3)"/></linearGradient>
          <filter id="${uid}-ombra" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity="${scuro ? .5 : .22}"/></filter>
          <clipPath id="${uid}-taglio"><rect width="${SW}" height="${SH}" rx="20"/></clipPath>
        </defs><g clip-path="url(#${uid}-taglio)">
          <rect width="${SW}" height="${SH}" fill="url(#${uid}-cielo)"/>` + festoni() +
          `<rect y="${PIANO}" width="${SW}" height="14" style="fill:color-mix(in srgb, var(--s3) 36%, var(--sup))"/>
          <rect y="${PIANO + 12}" width="${SW}" height="${SH - PIANO - 12}" style="fill:color-mix(in srgb, var(--s2) 22%, var(--sup))"/>
          <line x1="0" x2="${SW}" y1="${PIANO + 16}" y2="${PIANO + 16}" stroke="#fff" stroke-width="2" opacity="${scuro ? .18 : .7}"/>
          <line x1="0" x2="${SW}" y1="${SH - 5}" y2="${SH - 5}" stroke="#fff" stroke-width="2" opacity="${scuro ? .18 : .7}"/>`;
        P.forEach(p => {
          const h = PIANO - p.top;
          s += `<g filter="url(#${uid}-ombra)"><rect x="${p.x - 34}" y="${p.top}" width="68" height="${h + 2}" rx="6" fill="url(#${uid}-blocco)" style="stroke:var(--bordo2)" stroke-width="1.2"/></g>
            <rect x="${p.x - 33.4}" y="${p.top + .6}" width="66.8" height="5" rx="3" style="fill:${p.med}" opacity=".85"/>`;
          if (l.modo === 'podio') s += `<text x="${p.x}" y="${f1(p.top + h / 2 + 10)}" text-anchor="middle" style="font:700 ${h > 40 ? 26 : 21}px var(--font-titoli);fill:var(--testo2)">${p.et}</text>`;
          else if (l.modo === 'gare') s += `<text x="${p.x}" y="${p.top + 30}" text-anchor="middle" style="font:600 12px var(--font);fill:var(--testo2)">${p.et}</text>`;
          else s += `<path d="${stella(p.x, p.top + 25, 9)}" style="fill:color-mix(in srgb, var(--s4) 55%, var(--sup))"/>`;
        });
        if (l.modo === 'finale') s += `<text x="180" y="${P[0].top - 58}" text-anchor="middle" style="font:700 11px var(--font);letter-spacing:.14em;fill:var(--s4)">FINALE</text>`;
        s += '</g>';
        gSfondo = el('g'); gSfondo.innerHTML = s; svgS.appendChild(gSfondo);
        gVuoti = el('g'); svgS.appendChild(gVuoti);
        gSlot = el('g', { 'pointer-events': 'none' }); svgS.appendChild(gSlot);
        gTok = el('g'); svgS.appendChild(gTok);
        gFx = el('g', { 'pointer-events': 'none' }); svgS.appendChild(gFx);
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
      let slotAnello = null;
      function aggiornaSlot() {
        while (gSlot.firstChild) gSlot.removeChild(gSlot.firstChild);
        const l = L(); if (!l || l.modelli) return;
        const P = posti(l.modo);
        if (fase === 'prev' || fase === 'cresce' || occupato || podio.length >= l.k) { slotAnello = null; return; }
        const p = P[podio.length];
        gSlot.appendChild(el('circle', { cx: p.x, cy: p.top - 21, r: 24, style: 'fill: color-mix(in srgb, var(--accento) 12%, transparent)' }));
        slotAnello = el('circle', { class: 'ab-attesa', cx: p.x, cy: p.top - 21, r: 21, fill: 'none', style: 'stroke: var(--accento)', 'stroke-width': 2.4, 'stroke-dasharray': '5 4' });
        gSlot.appendChild(slotAnello);
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

      /* ================= l'albero ================= */
      const svgT = el('svg', { viewBox: `0 0 ${TW} 60`, role: 'img', 'aria-label': 'Albero delle scelte' });
      ramiEl.appendChild(svgT);
      const chiave = path => path.join('');
      const chiaveGruppo = p => Array.from(typeof p === 'string' ? p : p.join('')).sort().join('');   /* indici < 10: basta una cifra */
      let gruppiOrd = [];                       /* le chiavi dei gruppi, in ordine fisso (per i colori) */
      function nuovoNodo(path, padre) {
        const n = { id: chiave(path), path, d: path.length, padre, aperto: false, figli: [], mano: false, contato: 0, gruppo: null,
          x: padre ? padre.x : COLX[0], y: padre ? padre.y : PADT + 17, a: padre ? 0 : 1, sx: 0, sy: 0, sa: 0, tx: 0, ty: 0 };
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
      function layout() {
        let righe = 0;
        const visita = n => {
          if (n.aperto && n.figli.length) { n.figli.forEach(visita); n.tr = (n.figli[0].tr + n.figli[n.figli.length - 1].tr) / 2; }
          else n.tr = righe++;
        };
        visita(radiceAlb);
        rowH = righe <= 6 ? 34 : righe <= 12 ? 26 : 17;
        nodi.forEach(n => { n.tx = COLX[n.d]; n.ty = PADT + (n.tr + .5) * rowH; });
        altezza = Math.max(60, PADT + righe * rowH + PADB);
      }
      let alberoAnim = null;
      function ricomponi(dur, fine) {
        layout();
        nodi.forEach(n => { n.sx = n.x; n.sy = n.y; n.sa = n.a; });
        const h0 = altCorr, h1 = altezza;
        ferma(alberoAnim);
        alberoAnim = anima(dur, u => {
          const e = morbida(u);
          nodi.forEach(n => { n.x = n.sx + (n.tx - n.sx) * e; n.y = n.sy + (n.ty - n.sy) * e; n.a = n.sa + (1 - n.sa) * Math.min(1, e * 1.3); });
          altCorr = h0 + (h1 - h0) * e;
          disegnaAlbero();
        }, () => { alberoAnim = null; if (fine) fine(); });
        segui(dur);
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
        layout(); nodi.forEach(n => { n.x = n.tx; n.y = n.ty; });
        altCorr = altezza; ramiEl.scrollTop = 0;
        disegnaAlbero(); testa();
      }
      const nodoDi = path => nodi.get(chiave(path));
      const foglie = () => Array.from(nodi.values()).filter(n => n.d === L().k).sort((a, b) => a.ty - b.ty);
      const visto = j => Array.from(nodi.values()).some(n => n.d === j && n.aperto);

      function disegnaAlbero() {
        const l = L(); if (!l || l.modelli) return;
        svgT.setAttribute('viewBox', `0 0 ${TW} ${f1(altCorr)}`);
        const corr = new Set(['']); podio.forEach((_, j) => corr.add(chiave(podio.slice(0, j + 1))));
        const fatto = new Set(); fatti.forEach(id => { for (let j = 0; j <= id.length; j++) fatto.add(id.slice(0, j)); });
        const R = Math.min(10.5, rowH * .44), fs = Math.min(12, rowH * .68);
        let r0 = '', r1 = '', r2 = '', bande = '', nn = '', et = '';
        nodi.forEach(n => {
          if (n.padre) {
            const p = n.padre, xm = (p.x + n.x) / 2;
            const d = `<path class="ab-ramo${corr.has(n.id) ? ' corr' : fatto.has(n.id) ? ' fatto' : ''}" d="M${f1(p.x)} ${f1(p.y)} C${f1(xm)} ${f1(p.y)} ${f1(xm)} ${f1(n.y)} ${f1(n.x)} ${f1(n.y)}" opacity="${n.a.toFixed(2)}"/>`;
            if (corr.has(n.id)) r2 += d; else if (fatto.has(n.id)) r1 += d; else r0 += d;
          }
          if (!n.padre) {
            nn += `<g transform="translate(${f1(n.x)} ${f1(n.y)})"><circle r="8.5" style="fill:var(--testo2)"/><path d="M-2.6 -4.2 L4.4 0 L-2.6 4.2 Z" style="fill:var(--sup)"/></g>`;
            return;
          }
          const a = ATLETI[n.path[n.d - 1]], acceso = corr.has(n.id);
          nn += `<g transform="translate(${f1(n.x)} ${f1(n.y)})" opacity="${n.a.toFixed(2)}">` +
            (acceso ? `<circle r="${f1(R + 3.2)}" style="fill:none;stroke:var(--accento)" stroke-width="2.2"/>` : '') +
            `<circle r="${f1(R)}" style="fill:${a.col};stroke:var(--sup)" stroke-width="1.5"/>` +
            `<text y="${f1(R * .42)}" text-anchor="middle" style="font:700 ${f1(R * 1.18)}px var(--font);fill:#fff">${a.ini}</text></g>`;
          if (n.d === l.k) {
            const y = n.y, op = n.a.toFixed(2);
            if (n.gruppo != null) bande += `<rect x="${LX - 8}" y="${f1(y - rowH / 2 + 1)}" width="${TW - LX + 6}" height="${f1(rowH - 2)}" rx="${f1(Math.min(7, rowH / 3))}" style="fill:${GCOL[n.gruppo % GCOL.length]}" opacity="${scuro ? .3 : .22}"/>`;
            et += `<text x="${LX}" y="${f1(y + fs * .36)}" opacity="${op}" style="font:700 ${f1(fs)}px var(--font)">` +
              n.path.map((i, j) => `<tspan ${j ? 'dx="' + f1(fs * .32) + '"' : ''} style="fill:${ATLETI[i].col}">${ATLETI[i].ini}</tspan>`).join('') + '</text>';
            if (n.mano) et += `<path d="M${LX + 45} ${f1(y)} l3 3.4 l6 -7" fill="none" style="stroke:var(--accento)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`;
            if (n.contato) {
              const sc = n === ultimaContata ? 1.35 : 1;
              et += `<g transform="translate(${LX + 70} ${f1(y)}) scale(${sc})"><path d="M-6 0 C-3.5 -5.5 3 -6 6.5 -.5 C3 5 -3.5 5 -6 0 Z" style="fill:var(--s3);stroke:color-mix(in srgb, var(--s3) 60%, #000)" stroke-width=".8"/><path d="M-6 0 L4 -.4" style="stroke:color-mix(in srgb, var(--s3) 50%, #fff)" stroke-width=".8"/></g>` +
                `<text x="${TW - 6}" y="${f1(y + fs * .34)}" text-anchor="end" style="font:600 ${f1(fs * .92)}px var(--font);fill:var(--testo2)">${n.contato}</text>`;
            }
          }
        });
        let vuoto = '';
        if (nodi.size === 1) vuoto = `<text x="${COLX[0] + 18}" y="${f1(radiceAlb.y + 4)}" style="font:500 12px var(--font);fill:var(--testo3)">${fase === 'prev' ? 'Prima la previsione: poi l\'albero comincia a crescere.' : ''}</text>`;
        svgT.innerHTML = bande + r0 + r1 + r2 + nn + et + vuoto;
      }
      function testa() {
        const l = L(); if (!l || l.modelli) return;
        const fat = fattori(l);
        let h = '';
        for (let j = 0; j < l.k; j++) {
          const v = visto(j);
          h += `<span class="ab-col" style="left:${(COLX[j + 1] / TW * 100).toFixed(2)}%">${etPosto(l.modo, j).replace(' scelta', '')}<small class="${v ? 'nuovo' : ''}">${v ? fat[j] + (fat[j] === 1 ? ' ramo' : ' rami') : ''}</small></span>`;
        }
        h += `<span class="ab-col ab-conta">foglie<b>${contatore > 0 ? contatore : '–'}</b></span>`;
        const vecchio = testaEl.querySelectorAll('small');
        testaEl.innerHTML = h;
        testaEl.querySelectorAll('small').forEach((s, j) => { if (vecchio[j] && vecchio[j].textContent === s.textContent) s.classList.remove('nuovo'); });
      }
      function segui(dur) {
        /* tiene in vista il nodo dove si sta scegliendo */
        const n = nodoDi(podio) || radiceAlb; if (!n) return;
        dopo(() => {
          const scala = (svgT.clientWidth || TW) / TW, y = n.ty * scala, h = ramiEl.clientHeight;
          if (!h || ramiEl.scrollHeight <= h + 2) return;
          if (y < ramiEl.scrollTop + 30 || y > ramiEl.scrollTop + h - 30) ramiEl.scrollTo({ top: Math.max(0, y - h / 2), behavior: 'smooth' });
        }, Math.min(dur || 0, 200));
      }

      /* ================= dito, mouse, tastiera ================= */
      let gruppoTrovato = false;
      const scrivi = (t, tipo) => { msg.innerHTML = t || ''; msg.className = 'lab-messaggio' + (tipo ? ' ' + tipo : ''); };
      const elenco = ids => { const v = ids.map(i => ATLETI[+i].nome); return v.length > 1 ? v.slice(0, -1).join(', ') + ' e ' + v[v.length - 1] : v[0]; };
      function puntoScena(ev) { const r = svgS.getBoundingClientRect(); if (!r.width) return null; return [(ev.clientX - r.left) * SW / r.width, (ev.clientY - r.top) * SH / r.height]; }
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
        if (presa.mosso) { const t = presa.t; t.x = Math.max(10, Math.min(SW - 10, p[0] + presa.dx)); t.y = Math.max(10, Math.min(SH - 10, p[1] + presa.dy)); t.s = 1.12; posa(t); }
        ev.preventDefault();
      }
      function su() {
        if (!presa) return;
        const pr = presa, t = pr.t; presa = null;
        t.g.classList.remove('presa');
        if (!pr.mosso) { piazza(t.i, [t.x, t.y]); return; }              /* un tocco vale come trascinare */
        const l = L(), P = posti(l.modo), j = podio.length, x = t.x, y = t.y;
        const sopra = p => Math.abs(x - p.x) < 38 && y < PIANO + 6 && y > p.top - 64;
        if (j < l.k && (sopra(P[j]) || Math.hypot(x - P[j].x, y - (P[j].top - 21)) < 46)) { piazza(t.i, [x, y]); return; }
        if (P.some((p, qq) => qq !== j && sopra(p))) scrivi(l.modo === 'gare' ? 'Una gara alla volta: adesso tocca al piedistallo che brilla.' : 'Un posto alla volta: adesso tocca a quello che brilla.', 'no');
        vola(t, t.hx, t.hy, 1, 320);
      }
      function lascia() { if (!presa) return; const t = presa.t; presa = null; t.g.classList.remove('presa'); vola(t, t.hx, t.hy, 1, 300); }

      /* ================= il podio ================= */
      function piazza(i, da) {
        if (fase === 'prev') { richiamaPrev(); return; }
        if (!puoScegliere(i)) return;
        const l = L(), j = podio.length, p = posti(l.modo)[j], t = pista[i];
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
        aggiornaSlot(); disegnaAlbero(); segui(0); formula(); comandi(); scrivi('');
      }
      function foglia() {
        const l = L(), n = nodoDi(podio), nuovo = !n.mano, nomi = podio.map(i => ATLETI[i].nome).join(', ');
        const dopoCompleto = fase !== 'mano';
        occupato = true; aggiornaSlot();
        if (nuovo) { n.mano = true; fatti.push(n.id); }
        let testo, tipo = '';
        if (!nuovo) { testo = 'Questa foglia c\'era già: ' + (l.modo === 'gare' ? 'stessi vincitori nello stesso ordine' : 'stessi atleti nello stesso ordine') + ', stesso ramo. Prova un ordine diverso.'; tipo = 'no'; }
        else if (dopoCompleto) testo = (l.modo === 'finale' ? 'In finale: ' : l.modo === 'gare' ? 'Vincitori: ' : 'Podio: ') + nomi + '. È la foglia con la spunta.';
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
        disegnaAlbero(); segui(0); comandi();
        /* un saltello sul podio, poi tutti tornano in pista */
        if (nuovo) dopo(() => sulPodio.forEach((c, j) => dopo(() => anima(340, u => { c.y = c.sy - Math.sin(Math.PI * u) * 11; posa(c); }), j * 70)), 400);
        dopo(() => {
          sulPodio.forEach(c => { const t = pista[c.i]; vola(c, t.hx, t.hy, 1, 420); });
          dopo(() => {
            sulPodio.forEach(c => c.g.remove()); sulPodio = [];
            pista.forEach(t => { t.su = false; });
            podio = []; occupato = false;
            aggiornaPista(); aggiornaSlot(); disegnaAlbero(); segui(0); formula(); comandi();
          }, 470);
        }, nuovo ? 1050 : 800);
      }

      /* ================= l'albero completo e le foglie contate ================= */
      function completa() {
        const l = L();
        if (fase !== 'mano' || occupato || podio.length) return;
        fase = 'cresce'; comandi(); aggiornaSlot(); scrivi('');
        let d = 0;
        const passo = () => {
          if (d >= l.k) { conta(); return; }
          const da = Array.from(nodi.values()).filter(n => n.d === d && !n.aperto);
          d++;
          if (!da.length) { passo(); return; }
          da.forEach(apri); testa(); formula();
          ricomponi(560, () => dopo(passo, 140));
        };
        passo();
      }
      function conta() {
        const ff = foglie(), dt = Math.max(24, Math.min(120, 1500 / ff.length));
        let k = 0;
        const passo = () => {
          if (k >= ff.length) { ultimaContata = null; disegnaAlbero(); fineConta(); return; }
          const n = ff[k++]; n.contato = k; contatore = k; ultimaContata = n;
          disegnaAlbero();
          const b = testaEl.querySelector('.ab-conta b');
          if (b) { b.textContent = k; b.classList.remove('batte'); void b.offsetWidth; b.classList.add('batte'); }
          const scala = (svgT.clientWidth || TW) / TW, h = ramiEl.clientHeight;
          if (h && ramiEl.scrollHeight > h + 2) ramiEl.scrollTop = Math.max(0, n.ty * scala - h * .6);
          statoEl.innerHTML = '<b>' + k + '</b> foglie';
          dopo(passo, dt);
        };
        passo();
      }
      function fineConta() {
        const l = L();
        fase = 'contato'; testa(); comandi(); formula();
        if (l.gruppi) { scrivi(contatore + ' foglie: sono i modi di scegliere tre finalisti uno dopo l\'altro. Ma quanti gruppi diversi? Premi «Raggruppa».'); return; }
        vittoria();
      }
      function raggruppa() {
        const l = L(); if (fase !== 'contato' || !l.gruppi) return;
        fase = 'gruppi'; comandi(); scrivi('');
        const ff = foglie(), per = gruppiOrd.map(g => ff.filter(n => chiaveGruppo(n.path) === g));
        gruppiEl.hidden = false;
        gruppiEl.innerHTML = gruppiOrd.map((g, gi) => `<div class="ab-gr" style="border-color:color-mix(in srgb, ${GCOL[gi]} 55%, var(--bordo));background:color-mix(in srgb, ${GCOL[gi]} 10%, var(--sup))">
            <div class="ab-gr-testa"><span class="ab-gr-facce">${g.split('').map(i => facciaMini(ATLETI[+i])).join('')}</span><span class="ab-gr-n">× <b>0</b></span></div>
            <div class="ab-gr-ordini">${per[gi].map(n => '<span>' + n.path.map(i => `<i style="font-style:normal;color:${ATLETI[i].col}">${ATLETI[i].ini}</i>`).join('') + '</span>').join('')}</div></div>`).join('');
        const carte = gruppiEl.querySelectorAll('.ab-gr');
        let gi = 0;
        const passo = () => {
          if (gi >= gruppiOrd.length) { dopo(vittoria, 250); return; }
          const g = gi++, membri = per[g], ordini = carte[g].querySelectorAll('.ab-gr-ordini > span'), num = carte[g].querySelector('.ab-gr-n b');
          membri.forEach((n, j) => dopo(() => { n.gruppo = g; ultimaContata = n; disegnaAlbero(); ordini[j].classList.add('on'); num.textContent = j + 1; }, j * 75));
          dopo(() => { ultimaContata = null; disegnaAlbero(); passo(); }, membri.length * 75 + 280);
        };
        passo();
      }
      function vittoria() {
        const l = L();
        fase = 'vinto';
        ctx.completato(livello); pillole();
        const tot = l.gruppi ? gruppiOrd.length : contatore;
        scrivi('<span class="vinto">' + (l.gruppi ? tot + ' gruppi diversi di finalisti.' : tot + (l.modo === 'gare' ? ' modi' : ' podi') + ', uno per foglia.') + '</span> <span style="color:var(--testo)">' + l.vittoria + '</span>', 'ok');
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        comandi(); testa(); formula();
        coriandoli(180, 66);
        if (prev === l.giusto) ctx.zenone('Previsione giusta: ' + l.giusto + '. ' + l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
        else {
          const d = diagPrev(l, prev);
          if (d) ctx.zenone(d, { tipo: 'errore', espressione: 'pensa', durata: 10000 });
          else ctx.zenone('Avevi previsto ' + prev + ', sono ' + l.giusto + '. ' + l.vittoria, { espressione: 'pensa', durata: 9000 });
        }
      }

      /* ================= comandi e formula ================= */
      function comandi() {
        const l = L(); if (l.modelli) return;
        const pronti = l.gruppi ? gruppoTrovato : fatti.length >= l.mano;
        bCompleta.hidden = !(fase === 'prev' || fase === 'mano');
        bCompleta.disabled = fase !== 'mano' || !pronti || occupato || podio.length > 0;
        bCompleta.classList.toggle('primario', !bCompleta.disabled);
        bGruppi.hidden = !(l.gruppi && (fase === 'contato' || fase === 'gruppi' || fase === 'vinto'));
        bGruppi.disabled = fase !== 'contato';
        let s = '';
        if (fase === 'mano') s = l.gruppi ? (gruppoTrovato ? 'stesso gruppo trovato ✓' : 'finali fatte a mano: <b>' + fatti.length + '</b>') : 'fatti a mano: <b>' + Math.min(fatti.length, l.mano) + '</b> di ' + l.mano;
        else if (fase === 'cresce') s = 'l\'albero cresce…';
        else if (fase !== 'prev') s = '<b>' + contatore + '</b> foglie';
        statoEl.innerHTML = s;
      }
      const riga = (et, corpo, cls) => '<div class="ab-riga' + (cls ? ' ' + cls : '') + '"><span class="ab-et">' + et + '</span><span class="ab-tex">' + corpo + '</span></div>';
      function formula() {
        const l = L();
        if (l.modelli) { formulaModelli(); return; }
        const fat = fattori(l), tot = foglieTot(l), tutti = fat.every((_, j) => visto(j));
        let h = '';
        const pezzi = fat.map((f, j) => '\\underset{' + texPosto(l.modo, j) + '}{' + (visto(j) ? f : '\\square') + '}');
        h += riga(l.gruppi ? 'scelte in fila' : l.modo === 'gare' ? 'rami per gara' : 'rami per posto',
          visto(0) ? T(pezzi.join(' \\cdot ') + (tutti ? ' = ' + tot : '')) : '<span class="ab-vuoto">i fattori compaiono mentre l\'albero cresce</span>');
        if (prev != null) {
          const vero = l.gruppi ? gruppiOrd.length : tot;
          const chiuso = l.gruppi ? fase === 'vinto' : (fase === 'contato' || fase === 'vinto');
          if (chiuso) { const ok = prev === vero; h += riga('previsione', T('\\text{tu: } ' + prev + (ok ? ' = ' : ' \\neq ') + vero), 'esito ' + (ok ? 'ok' : 'no')); }
          else h += riga('previsione', T('\\text{tu: } ' + prev));
        }
        if (fase === 'vinto') h += riga('in formula', T(l.ponte), 'esito ok');
        carta.innerHTML = h;
      }

      /* ================= livello 6: il modello giusto ================= */
      function costruisciModelli() {
        scelte = CASI.map(() => ({ m: null, v: '', ok: false }));
        modEl.innerHTML = CASI.map((c, qi) => `<div class="ab-caso">
            <span class="ab-et">${String.fromCharCode(65 + qi)} · ${c.et}</span>
            <div class="ab-caso-testo">${ctx.md(c.testo)}</div>
            <div class="ab-scelte" role="group" aria-label="Modello">${['D', 'C', 'R'].map(m => `<button type="button" class="ab-mod" data-m="${m}" aria-pressed="false">${MODELLI[m]}</button>`).join('')}</div>
            <div class="ab-calcola"><span class="ab-sim"><span class="vuoto">scegli il modello</span></span><span>=</span><input class="ab-in" type="text" inputmode="numeric" maxlength="5" autocomplete="off" disabled aria-label="Numero dei casi" placeholder="?"></div>
            <div class="ab-caso-nota" aria-live="polite"></div></div>`).join('') +
          '<div class="ab-controlla"><button type="button" class="btn primario b-controlla">Controlla</button></div>';
        modEl.querySelectorAll('.ab-caso').forEach((card, qi) => {
          const inp = card.querySelector('.ab-in'), sim = card.querySelector('.ab-sim'), nota = card.querySelector('.ab-caso-nota');
          card.querySelectorAll('.ab-mod').forEach(b => b.addEventListener('click', () => {
            if (fase !== 'modelli' || scelte[qi].ok) return;
            scelte[qi].m = b.dataset.m;
            card.querySelectorAll('.ab-mod').forEach(x => { const on = x === b; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
            sim.innerHTML = T(simbolo(b.dataset.m, CASI[qi].n, CASI[qi].k));
            inp.disabled = false; card.classList.remove('no'); nota.textContent = '';
            formula();
          }));
          inp.addEventListener('input', () => { scelte[qi].v = inp.value; card.classList.remove('no'); nota.textContent = ''; formula(); });
          inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); controlla(); } });
        });
        modEl.querySelector('.b-controlla').addEventListener('click', controlla);
      }
      function controlla() {
        if (fase !== 'modelli') return;
        let giuste = 0, zen = null, manca = false;
        modEl.querySelectorAll('.ab-caso').forEach((card, qi) => {
          const c = CASI[qi], s = scelte[qi], nota = card.querySelector('.ab-caso-nota');
          if (s.ok) { giuste++; return; }
          const t = s.v.trim(), v = /^\d+$/.test(t) ? +t : null, mOk = s.m === c.m;
          if (mOk && v === c.ris) {
            s.ok = true; giuste++;
            card.classList.remove('no', 'scuoti'); card.classList.add('ok'); nota.textContent = '';
            card.querySelectorAll('button, input').forEach(x => { x.disabled = true; });
            return;
          }
          card.classList.remove('ok', 'no', 'scuoti'); void card.offsetWidth; card.classList.add('no', 'scuoti');
          if (!s.m) { nota.textContent = 'Scegli prima il modello.'; manca = true; }
          else if (!mOk) nota.textContent = 'Non è il modello giusto. L\'ordine conta? Si può ripetere?';
          else if (v == null) { nota.textContent = 'Scrivi quanti sono i casi.'; manca = true; }
          else nota.textContent = 'Il modello è giusto, il conto no: rifallo.';
          if (!zen && s.m) zen = diagCaso(c, s.m, v);
        });
        formula();
        if (giuste === CASI.length) { vittoriaModelli(); return; }
        scrivi('Giuste ' + giuste + ' su ' + CASI.length + '.' + (manca ? ' Completa quelle che mancano.' : ''), 'no');
        if (zen) ctx.zenone(zen, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
      }
      function vittoriaModelli() {
        const l = L();
        fase = 'vinto';
        ctx.completato(livello); pillole();
        scrivi('<span class="vinto">Tutte e tre giuste.</span> <span style="color:var(--testo)">' + l.vittoria + '</span>', 'ok');
        bRic.textContent = 'Ricomincia dal primo'; bRic.classList.add('primario');
        const bc = modEl.querySelector('.b-controlla'); if (bc) bc.disabled = true;
        formula();
        ctx.zenone(l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
      }
      function formulaModelli() {
        let h = '';
        CASI.forEach((c, qi) => {
          const s = scelte[qi] || {}, t = (s.v || '').trim(), v = /^\d+$/.test(t) ? t : '\\,?';
          const corpo = s.ok ? T(c.calcolo) : s.m ? T(simbolo(s.m, c.n, c.k) + ' = ' + v) : '<span class="ab-vuoto">scegli il modello</span>';
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
        prevChiedi.hidden = true; prevFatto.hidden = false; prevEl.classList.add('chiusa');
        prevFatto.innerHTML = '<span class="ab-et">la tua previsione</span><b>' + prev + '</b><span>resta qui: alla fine la confronti con l\'albero.</span>';
        try { inPrev.blur(); } catch (e) { /* niente */ }
        apri(radiceAlb); ricomponi(520); testa();
        aggiornaSlot(); comandi(); formula();
        scrivi(l.modo === 'gare' ? 'Trascina il vincitore della gara 1 sul piedistallo che brilla, oppure toccalo.' : 'Trascina un atleta sul ' + (l.modo === 'finale' ? 'posto' : 'gradino') + ' che brilla, oppure toccalo.');
      }
      function pillole() {
        const fattiL = ctx.stato().livelli, max = fattiL.length ? Math.max(...fattiL) : -1;
        pillEl.innerHTML = '';
        LIVELLI.forEach((_, i) => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'pill' + (fattiL.includes(i) ? ' fatto' : '') + (i === livello ? ' qui' : '');
          b.textContent = String(i + 1); b.title = 'Livello ' + (i + 1);
          b.disabled = i > max + 1;
          b.addEventListener('click', () => { if (i !== livello || fase === 'vinto') avviaLivello(i); });
          pillEl.appendChild(b);
        });
      }
      function avviaLivello(nuovo) {
        seq++; fermaTutte(); presa = null;
        livello = nuovo;
        const l = L();
        fase = l.modelli ? 'modelli' : 'prev';
        prev = null; podio = []; fatti = []; sulPodio = []; occupato = false; gruppoTrovato = false; contatore = 0;
        objEl.innerHTML = ctx.md(l.testo);
        aiutoEl.innerHTML = ctx.md(l.aiuto); aiutoEl.hidden = true;
        [prevEl, scena, comEl, alberoEl].forEach(x => { x.hidden = !!l.modelli; });
        modEl.hidden = !l.modelli;
        gruppiEl.hidden = true; gruppiEl.innerHTML = '';
        if (l.modelli) { svgT.innerHTML = ''; costruisciModelli(); }
        else {
          prevEl.classList.remove('chiusa', 'scuoti'); prevChiedi.hidden = false; prevFatto.hidden = true;
          prevDom.innerHTML = ctx.md(l.domanda); inPrev.value = ''; prevNota.textContent = '';
          costruisciScena(); nuovoAlbero();
        }
        scrivi('');
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        livEl.textContent = 'Livello ' + (nuovo + 1) + ' di ' + LIVELLI.length;
        pillole(); comandi(); formula();
      }

      bPrev.addEventListener('click', prevedi);
      inPrev.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); prevedi(); } });
      inPrev.addEventListener('input', () => { prevNota.textContent = ''; });
      bCompleta.addEventListener('click', completa);
      bGruppi.addEventListener('click', raggruppa);
      bAiuto.addEventListener('click', () => { aiutoEl.hidden = !aiutoEl.hidden; });
      bRic.addEventListener('click', () => avviaLivello(fase === 'vinto' ? (livello + 1) % LIVELLI.length : livello));
      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', su);
      window.addEventListener('pointercancel', lascia);

      avviaLivello(livello);

      return function smonta() {
        vivo = false; seq++;
        fermaTutte(); timers.forEach(clearTimeout);
        window.removeEventListener('pointermove', muovi, { passive: false });
        window.removeEventListener('pointerup', su);
        window.removeEventListener('pointercancel', lascia);
      };
    }
  });
})();
