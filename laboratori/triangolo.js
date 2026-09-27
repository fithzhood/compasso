/* Laboratorio «Il triangolo che si muove» — geometria euclidea.
   Tre vertici agganciati alla griglia intera: angoli, lati, area, perimetro e classificazione
   si aggiornano mentre trascini. Niente calamite: ogni livello si chiude con «Conferma». */
(function () {
  const STILE = `
    /* --- scena: la griglia riempie lo spazio, il viewBox si sceglie misurando (vedi adatta) --- */
    .lab-triangolo .lab-scena { background: var(--sup2); overflow: hidden; touch-action: none; }
    .lab-triangolo .griglia { stroke: var(--bordo); stroke-width: 1; opacity: .85; }
    .lab-triangolo .griglia-fuori { stroke: var(--bordo); stroke-width: 1; opacity: .35; }
    .lab-triangolo .campo-bordo { fill: none; stroke: var(--bordo2); stroke-width: 1.5; opacity: .8; }
    .lab-triangolo .dentro { fill: var(--accento); opacity: .10; }
    .lab-triangolo .lato { fill: none; stroke: var(--testo); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
    .lab-triangolo .astina { fill: none; stroke: var(--testo); stroke-width: 5; stroke-linecap: round; }
    .lab-triangolo .perno { fill: var(--testo2); }
    .lab-triangolo .misura { font: 700 14px var(--font); fill: var(--testo2); paint-order: stroke; stroke: var(--sup2); stroke-width: 4.5; stroke-linejoin: round; }
    .lab-triangolo .gradi { font: 700 14px var(--font); paint-order: stroke; stroke: var(--sup2); stroke-width: 4.5; stroke-linejoin: round; }
    .lab-triangolo .settore { stroke: none; }
    .lab-triangolo .arco { fill: none; stroke-width: 2.6; stroke-linecap: round; }
    .lab-triangolo .squadra { fill: none; stroke-width: 2.6; stroke-linejoin: round; }
    .lab-triangolo .quadrato { stroke-width: 1.6; stroke-linejoin: round; }
    .lab-triangolo .q-testo { font: 700 13px var(--font); paint-order: stroke; stroke: var(--sup2); stroke-width: 4; stroke-linejoin: round; }
    .lab-triangolo .tratteggio { fill: none; stroke: var(--testo2); stroke-width: 2; stroke-dasharray: 7 6; opacity: .75; }
    .lab-triangolo .maniglia .alone { fill: var(--accento); opacity: 0; transition: opacity .15s; }
    .lab-triangolo .maniglia.presa .alone { opacity: .25; }
    .lab-triangolo .maniglia .corpo { fill: var(--accento); stroke: var(--sup); stroke-width: 2.5; }
    .lab-triangolo .maniglia.bloccata .corpo { fill: var(--testo2); }
    .lab-triangolo .maniglia .nome { font: 700 15px var(--font); fill: var(--testo); paint-order: stroke; stroke: var(--sup); stroke-width: 4; stroke-linejoin: round; }
    .lab-triangolo .notevole { fill: none; stroke-width: 2.2; stroke-linecap: round; }
    .lab-triangolo .notevole.oltre { stroke-dasharray: 5 5; opacity: .6; }
    .lab-triangolo .cerchio-n { fill: none; stroke-width: 1.6; stroke-dasharray: 3 5; opacity: .7; }
    .lab-triangolo .punto-n { stroke: var(--sup2); stroke-width: 2; }
    .lab-triangolo .nome-n { font: 700 15px var(--font); paint-order: stroke; stroke: var(--sup2); stroke-width: 4; stroke-linejoin: round; }
    /* --- pannello --- */
    .lab-triangolo .obiettivo { text-align: center; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); color: var(--testo2); line-height: 1.5; }
    .lab-triangolo .obiettivo em { font-style: normal; font-weight: 700; color: var(--testo); }
    .lab-triangolo .obiettivo .katex { font-size: 1em; }
    .lab-triangolo .misure { display: flex; gap: 4px 6px; flex-wrap: wrap; justify-content: center; align-items: center; }
    .lab-triangolo .chip { background: var(--sup2); border: 1px solid var(--bordo); border-radius: 999px; padding: 2px 10px; font-size: .82rem; color: var(--testo2); white-space: nowrap; }
    .lab-triangolo .chip b { color: var(--testo); font-variant-numeric: tabular-nums; }
    .lab-triangolo .forma { font-size: .95rem; font-weight: 600; color: var(--testo); white-space: nowrap; padding: 0 4px; }
    .lab-triangolo .misure > span { display: contents; }
    .lab-triangolo .nota { flex-basis: 100%; text-align: center; font-size: .8rem; font-weight: 400; color: var(--testo2); line-height: 1.35; white-space: normal; }
    /* le formule vanno a capo fra un pezzo e l'altro, mai dentro un pezzo */
    .lab-triangolo .formule { text-align: center; font-size: clamp(1.02rem, 2.3cqmin, 1.15rem); }
    .lab-triangolo .formule .riga { display: flex; flex-wrap: wrap; justify-content: center; column-gap: .3em; padding: 1px 0; }
    .lab-triangolo .formule .riga > span { white-space: nowrap; }
    .lab-triangolo .formule .nota { font-size: .8rem; }
    .lab-triangolo .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-triangolo .lab-messaggio .katex { font-size: 1.05em; }
    .lab-triangolo.in-libero .lab-messaggio { color: var(--testo2); font-size: clamp(.86rem, 2cqmin, 1rem); }
    .lab-triangolo .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; }
    .lab-triangolo .lab-barra .btn { min-height: clamp(40px, 6cqh, 50px); }
    @container lab (max-width: 420px) { .lab-triangolo .lab-barra { gap: 6px; } .lab-triangolo .lab-barra .btn { padding-left: 11px; padding-right: 11px; } }
    .lab-triangolo .campo-eti { display: inline-flex; align-items: center; gap: 6px; font-size: .9rem; color: var(--testo2); }
    .lab-triangolo .campo-num { width: 5em; min-height: 40px; padding: 4px 8px; border: 1px solid var(--bordo2); border-radius: 8px; background: var(--sup); color: var(--testo); font: 600 1rem var(--font); text-align: center; }
    .lab-triangolo .lab-parametri { max-width: 520px; }
    .lab-triangolo .lab-param .linea { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: .92rem; }
    .lab-triangolo .lab-param .linea i { display: inline-block; width: 18px; height: 5px; border-radius: 3px; opacity: .45; }
    .lab-triangolo .lab-param .linea[aria-pressed="true"] { background: var(--accento-tenue); border-color: var(--accento); box-shadow: inset 0 0 0 1px var(--accento); color: var(--testo); font-weight: 650; }
    .lab-triangolo .lab-param .linea[aria-pressed="true"] i { opacity: 1; }
    .lab-triangolo .vinto { animation: lab-tri-pop .5s cubic-bezier(.34,1.56,.64,1); display: inline-block; }
    @keyframes lab-tri-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-triangolo .btn[disabled] { opacity: .35; cursor: default; }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, t) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  const FX = 12, FY = 10;          /* il campo: i vertici stanno sui punti interi da (0; 0) a (12; 10) */
  const NOMI = ['A', 'B', 'C'], LETT = ['a', 'b', 'c'];
  const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)'];
  const VERDE = 'var(--s3)', ARANCIO = 'var(--s2)', NEUTRO = 'var(--s4)';
  const GRD = Math.PI / 180;
  /* modalità libera: le quattro famiglie di linee notevoli e il punto dove si incontrano */
  const LINEE = [
    { id: 'altezze', nome: 'Altezze', punto: 'H', colore: 'var(--no)', titolo: 'Le tre altezze e l\'ortocentro H' },
    { id: 'mediane', nome: 'Mediane', punto: 'G', colore: 'var(--s4)', titolo: 'Le tre mediane e il baricentro G' },
    { id: 'bisettrici', nome: 'Bisettrici', punto: 'I', colore: '#c08a12', titolo: 'Le tre bisettrici, l\'incentro I e il cerchio inscritto' },
    { id: 'assi', nome: 'Assi', punto: 'O', colore: 'var(--testo2)', titolo: 'I tre assi dei lati, il circocentro O e il cerchio circoscritto' }
  ];

  /* ---------- numeri all'italiana ---------- */
  function num(v) {
    const r = Math.round(v * 10) / 10;
    if (Math.abs(r - Math.round(r)) < 1e-9) return String(Math.round(r));
    return r.toFixed(1).replace('.', ',');
  }
  const texNum = v => num(v).replace(',', '{,}');

  /* ---------- geometria (coordinate intere: quasi tutto è esatto) ---------- */
  const d2 = (P, Q) => (P.x - Q.x) * (P.x - Q.x) + (P.y - Q.y) * (P.y - Q.y);
  const intero = n => { const r = Math.round(Math.sqrt(n)); return r * r === n ? r : null; };

  function arrotonda180(a) {
    const f = a.map(Math.floor);
    let resto = 180 - (f[0] + f[1] + f[2]);
    const ord = [0, 1, 2].sort((i, j) => (a[j] - f[j]) - (a[i] - f[i]));
    const out = f.slice();
    for (let k = 0; k < resto; k++) out[ord[k % 3]]++;
    return out;
  }

  function classifica(g) {
    const l = g.lati.slice().sort((x, y) => x - y);
    const uguale = (u, v) => Math.abs(u - v) < 0.05;
    const lat = uguale(l[0], l[2]) ? 'equilatero' : (uguale(l[0], l[1]) || uguale(l[1], l[2])) ? 'isoscele' : 'scaleno';
    const ang = g.retto >= 0 ? 'rettangolo' : g.ottuso >= 0 ? 'ottusangolo' : 'acutangolo';
    return { lat, ang, testo: lat === 'equilatero' ? 'equilatero' : lat + ' ' + ang, quasiEq: lat !== 'equilatero' && l[2] - l[0] < 0.35 };
  }

  function geo(V) {
    const [A, B, C] = V;
    const s2 = [d2(B, C), d2(C, A), d2(A, B)];          /* a = BC, b = CA, c = AB */
    const lati = s2.map(Math.sqrt);
    const dop = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
    const dot = [
      (B.x - A.x) * (C.x - A.x) + (B.y - A.y) * (C.y - A.y),
      (C.x - B.x) * (A.x - B.x) + (C.y - B.y) * (A.y - B.y),
      (A.x - C.x) * (B.x - C.x) + (A.y - C.y) * (B.y - C.y)
    ];
    const cr = Math.abs(dop);
    const ang = dot.map(d => Math.atan2(cr, d) / GRD);
    const g = {
      V, s2, lati, dop, dot, ang, gradi: arrotonda180(ang),
      area: cr / 2, perimetro: lati[0] + lati[1] + lati[2],
      retto: dot.indexOf(0), ottuso: dot.findIndex(d => d < 0),
      altezze: [0, 1, 2].map(k => cr / lati[k])           /* altezza relativa al lato k */
    };
    g.forma = classifica(g);
    return g;
  }

  /* ---------- livelli ---------- */
  const LIVELLI = [
    {
      testo: 'Fai un triangolo *rettangolo in C*: l\'angolo in C deve segnare esattamente 90°.',
      V: [[2, 2], [9, 3], [4, 8]],
      ok: g => g.retto === 2,
      perche: g => g.retto >= 0
        ? 'Il quadratino c\'è, ma sta in ' + NOMI[g.retto] + '. L\'angolo retto deve stare in C: muovi C, oppure scambia i ruoli spostando gli altri due.'
        : 'In C hai ' + g.gradi[2] + '°. Due lati sono perpendicolari quando uno va in orizzontale e l\'altro in verticale: prova a mettere A e C sulla stessa colonna, e B alla stessa altezza di C.',
      vinto: g => 'Rettangolo in C. I due lati che escono da C si chiamano cateti; il terzo, quello che sta di fronte all\'angolo retto, è l\'ipotenusa, e in un triangolo rettangolo è sempre il lato più lungo.',
      aiuto: 'L\'angolo è retto quando i due lati sono perpendicolari. Il modo più semplice sulla griglia: un lato tutto orizzontale e l\'altro tutto verticale. Quando ci riesci l\'arco diventa un quadratino.'
    },
    {
      testo: 'Ora *rettangolo in A* e per giunta *isoscele*: due lati uguali.',
      V: [[2, 2], [9, 2], [6, 7]],
      ok: g => g.retto === 0 && g.s2[1] === g.s2[2],
      perche: g => g.retto !== 0
        ? (g.retto >= 0 ? 'L\'angolo retto sta in ' + NOMI[g.retto] + ', deve stare in A.' : 'Comincia dall\'angolo retto in A: in A hai ' + g.gradi[0] + '°.')
        : 'Retto in A ce l\'hai. Adesso i due cateti devono essere uguali: AB misura ' + num(g.lati[2]) + ' e AC misura ' + num(g.lati[1]) + '.',
      vinto: g => 'Rettangolo isoscele: i due cateti sono uguali, e i 90° che restano si dividono in parti uguali fra gli altri due angoli. Infatti leggi 45° e 45°. È mezzo quadrato tagliato lungo la diagonale.',
      aiuto: 'In un triangolo rettangolo l\'ipotenusa è il lato più lungo, quindi i due lati uguali possono essere solo i cateti. Parti dall\'angolo retto in A e conta i quadretti: stessa lunghezza in orizzontale e in verticale.'
    },
    {
      testo: 'Triangolo *isoscele con base AB*, alto *4* quadretti: CA e CB uguali, e C a distanza 4 dalla retta AB.',
      V: [[2, 2], [8, 2], [4, 7]],
      ok: g => g.s2[0] === g.s2[1] && Math.abs(g.altezze[2] - 4) < 1e-6,
      perche: g => g.s2[0] !== g.s2[1]
        ? 'I due lati obliqui non sono uguali: CB misura ' + num(g.lati[0]) + ' e CA misura ' + num(g.lati[1]) + '. Metti C sulla colonna che sta a metà fra A e B.'
        : 'Uguali sì, ma l\'altezza da C alla base è ' + num(g.altezze[2]) + ': ne serve 4.',
      vinto: g => 'Base ' + num(g.lati[2]) + ' e altezza 4, quindi area ' + num(g.area) + '. E hai notato dove cade l\'altezza? Nel punto di mezzo di AB: in un triangolo isoscele l\'altezza, la mediana e la bisettrice che partono dal vertice sono la stessa identica linea.',
      aiuto: 'Base AB vuol dire che i lati uguali sono gli altri due, CA e CB. Tieni A e B sulla stessa riga: allora C deve stare sulla colonna di mezzo, e l\'altezza è semplicemente quanti quadretti C sta più in alto della base.'
    },
    {
      testo: 'Fai un triangolo *ottusangolo*, con l\'angolo ottuso *in B*: più di 90°.',
      V: [[2, 3], [6, 7], [10, 3]],
      ok: g => g.dot[1] < 0,
      perche: g => g.ottuso >= 0
        ? 'L\'angolo ottuso sta in ' + NOMI[g.ottuso] + ' e misura ' + g.gradi[g.ottuso] + '°: ti serve in B.'
        : 'In B hai ' + g.gradi[1] + '°: ancora troppo poco. Schiaccia B verso il segmento AC, o allarga A e C.',
      vinto: g => 'In B ' + g.gradi[1] + '°, e gli altri due per forza acuti: se ce ne fosse un secondo oltre i 90° la somma sfonderebbe i 180°. Di angoli ottusi un triangolo ne può avere al massimo uno.',
      aiuto: 'Un angolo è ottuso quando è più aperto di un angolo retto. Se schiacci B verso il lato AC l\'angolo in B si apre; se lo allontani si chiude. Guarda il numero sull\'arco: deve passare 90.'
    },
    {
      testo: 'Porta l\'*area* esattamente a *12*.',
      V: [[2, 2], [7, 2], [4, 6]],
      ok: g => Math.abs(g.dop) === 24,
      perche: g => 'Sei a ' + num(g.area) + '. L\'area è base × altezza : 2, quindi base per altezza deve fare 24: 6 e 4, 8 e 3, 12 e 2…',
      vinto: g => 'Area 12: base ' + num(g.lati[2]) + ' e altezza ' + num(g.altezze[2]) + ', e la metà del prodotto fa 12. Il triangolo è mezzo rettangolo: quello intero misurerebbe 24.',
      aiuto: 'Area = base × altezza : 2. Scegli come base un lato orizzontale, così la base sono i quadretti fra i due vertici e l\'altezza è quanti quadretti il terzo vertice sta più in alto. Devi far venire 24 il prodotto.'
    },
    {
      testo: 'Perimetro *12* con tutti e tre i lati *interi*. Ce n\'è uno solo: trovalo.',
      V: [[2, 2], [7, 2], [4, 6]],
      ok: g => g.s2.every(s => intero(s) !== null) && Math.abs(g.perimetro - 12) < 1e-6,
      perche: g => {
        const int = g.s2.map(intero);
        if (int.some(v => v === null)) {
          const k = int.indexOf(null);
          return 'Il lato ' + LETT[k] + ' misura ' + num(g.lati[k]) + ', che non è intero. Un lato è intero quando è tutto orizzontale, tutto verticale, oppure quando i quadretti in orizzontale e in verticale sono 3 e 4 (che dà 5).';
        }
        return 'Lati interi ' + int.join(', ') + ': perimetro ' + (int[0] + int[1] + int[2]) + '. Ne serve 12.';
      },
      vinto: g => '3, 4 e 5: il triangolo più famoso che ci sia, e l\'unico con perimetro 12 e lati interi. Guarda l\'angolo fra il 3 e il 4: è retto. Chi ha i lati 3, 4, 5 non può che essere rettangolo, perché 9 + 16 fa proprio 25.',
      aiuto: 'Sulla griglia un lato viene intero se è orizzontale, se è verticale, oppure se scende di 3 e va di lato di 4 (o viceversa): quello misura 5. Con tre numeri interi che sommano 12 e che possano chiudersi in triangolo la scelta è pochissima.'
    },
    {
      testo: 'Triangolo rettangolo con i *cateti 6 e 8*. Guarda i quadrati costruiti sui lati, poi scrivi quanto misura l\'ipotenusa.',
      V: [[2, 2], [8, 2], [2, 7]],
      quadrati: true, campo: 'ipotenusa =',
      ok: (g, st) => {
        if (g.retto < 0) return false;
        const cat = [0, 1, 2].filter(k => k !== g.retto).map(k => g.s2[k]).sort((x, y) => x - y);
        if (cat[0] !== 36 || cat[1] !== 64) return false;
        return Math.abs(st.valore - 10) < 1e-9;
      },
      perche: (g, st) => {
        if (g.retto < 0) return 'Prima serve l\'angolo retto: adesso il triangolo non ne ha nessuno, e senza angolo retto Pitagora non c\'entra niente.';
        const cat = [0, 1, 2].filter(k => k !== g.retto).map(k => g.lati[k]).sort((x, y) => x - y);
        if (Math.abs(cat[0] - 6) > 1e-9 || Math.abs(cat[1] - 8) > 1e-9) return 'Rettangolo sì, ma i cateti misurano ' + num(cat[0]) + ' e ' + num(cat[1]) + ': ne servono 6 e 8.';
        if (isNaN(st.valore)) return 'Il triangolo è quello giusto. Adesso scrivi nel campo quanto misura l\'ipotenusa: i due quadrati piccoli valgono 36 e 64, quello grande vale 100.';
        return 'Il triangolo è giusto, il numero no: il quadrato sull\'ipotenusa vale 36 + 64 = 100, e il lato di un quadrato di area 100 è la radice di 100.';
      },
      vinto: g => 'Il quadrato grande vale 100, cioè esattamente 36 + 64: i due piccoli, messi insieme, riempiono il grande. Questo è il teorema di Pitagora, e l\'ipotenusa è la radice di 100, cioè 10.',
      aiuto: 'Costruisci l\'angolo retto e conta i quadretti: un cateto 6, l\'altro 8. Ogni quadrato disegnato sul lato ha area uguale al lato per se stesso: 6 × 6 = 36 e 8 × 8 = 64. Sommali e avrai l\'area del quadrato sull\'ipotenusa; l\'ipotenusa è il lato di quel quadrato.'
    },
    {
      testo: 'Prova a chiudere un triangolo con i lati *2, 3 e 6*: gira le due astine finché le punte non si toccano. Se pensi che non si possa, dillo.',
      tipo: 'impossibile', lati: [2, 3, 6],
      ok: () => false,
      perche: () => 'Le punte non si toccano. Continua a girarle, oppure — se ti sei convinto — premi «Non si può».',
      vinto: () => 'Non si chiude, e non si chiuderà mai: 2 + 3 fa 5, e 5 è meno di 6. Le due astine messe in fila non arrivano dall\'altra parte. È la disuguaglianza triangolare: ogni lato deve essere più corto della somma degli altri due, perché la strada più breve fra due punti è il segmento che li unisce, e passare per il terzo vertice non può mai convenire.',
      aiuto: 'Il caso più favorevole è quando le due astine sono distese in fila lungo il lato lungo: allora coprono 2 + 3 = 5 quadretti su 6. Ne avanza sempre uno. Prova, guarda la distanza fra le punte, e poi decidi.'
    },
    {
      testo: 'A e B sono bloccati. Sposta *C* in *tre posizioni diverse* tenendo l\'*area sempre uguale*.',
      tipo: 'stessaArea', V: [[2, 2], [8, 2], [4, 7]], blocca: [0, 1],
      ok: (g, st) => st.conta >= 3,
      perche: (g, st) => 'Per ora hai trovato ' + st.conta + ' posizioni su 3 con l\'area di partenza (' + num(st.areaTarget) + '). Adesso l\'area è ' + num(g.area) + '.',
      vinto: g => 'Tutte le posizioni buone stanno sulla stessa riga, e non è un caso: la base AB non cambia, e finché C resta su una retta parallela ad AB non cambia nemmeno l\'altezza. Base per altezza diviso due dà sempre lo stesso numero. Triangoli diversissimi, stessa area.',
      aiuto: 'L\'area è base × altezza : 2. La base è AB e non la puoi toccare. Quindi l\'area resta la stessa finché non cambia l\'altezza, cioè finché C non sale né scende: spostalo solo di lato.'
    },
    {
      testo: 'Costruisci *cinque triangoli diversi* muovendo i vertici e tieni d\'occhio la *somma dei tre angoli*.',
      tipo: 'somma', V: [[2, 2], [9, 3], [5, 8]],
      ok: (g, st) => st.conta >= 5,
      perche: (g, st) => 'Triangoli diversi finora: ' + st.conta + ' su 5. Muovi un vertice in modo da cambiare davvero la forma, non solo la posizione.',
      vinto: g => 'Sempre 180°, comunque tu li muova. Guarda la retta che ho tracciato per C, parallela ad AB: l\'angolo di A si ritrova alla sinistra di C e quello di B alla sua destra, perché sono angoli alterni interni. I tre angoli, uno accanto all\'altro sopra quella retta, formano un angolo piatto: ecco perché fanno 180°.',
      aiuto: 'La somma non cambia mai, e il motivo si vede con una riga sola: traccia per C la parallela ad AB. L\'angolo in A ricompare a sinistra di C, quello in B a destra, e insieme all\'angolo C riempiono esattamente mezzo giro.'
    }
  ];

  COMPASSO.registraLab({
    id: 'triangolo',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-triangolo')) { const s = document.createElement('style'); s.id = 'stile-lab-triangolo'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-triangolo');
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="lab-aiuto" hidden data-scorre><p></p><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: nessun obiettivo, i vertici dove vuoi">Libero</button></div>
            <div class="obiettivo"></div>
            <div class="lab-parametri" hidden>
              ${LINEE.map(l => `<div class="lab-param"><button type="button" class="btn piccolo linea" data-l="${l.id}" aria-pressed="false" title="${l.titolo}"><i style="background:${l.colore}"></i>${l.nome}</button></div>`).join('')}
            </div>
            <div class="misure"><span class="chips"></span><span class="forma"></span></div>
            <div class="formule"></div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <button type="button" class="btn primario m-conferma">Conferma</button>
              <label class="campo-eti"><span class="campo-nome">ipotenusa =</span><input type="text" class="campo-num" inputmode="decimal" autocomplete="off" spellcheck="false"></label>
              <button type="button" class="btn m-nonsipuo">Non si può</button>
              <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
              <button type="button" class="btn piccolo m-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo m-aiuto" aria-label="Come si gioca">?</button>
            </div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), aiutoEl = q('.lab-aiuto');
      const obEl = q('.obiettivo'), panEl = q(".misure .chips");
      const formaEl = q(".misure .forma"), formuleEl = q('.formule');
      const msg = q('.lab-messaggio'), livelliEl = q('.lab-livelli'), parametriEl = q('.lab-parametri');
      const btnConf = q('.m-conferma'), btnNo = q('.m-nonsipuo');
      const btnRic = q('.m-ricomincia'), btnAiuto = q('.m-aiuto'), btnCasuale = q('.m-casuale'), btnLibero = q('.lab-libero');
      const etiCampo = q('.campo-eti'), campo = q('.campo-num'), campoNome = q('.campo-nome');
      const mostra = (nodo, v) => { nodo.style.display = v ? '' : 'none'; };

      /* ---------- scena ----------
         Il viewBox ha la forma dello spazio (lo sceglie adatta): la griglia del campo sta al centro,
         e intorno si vede ancora la quadrettatura, più tenue, così non restano buchi. */
      let W = 500, H = 420;
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': 'Un triangolo con i vertici da trascinare su una griglia' });
      scena.insertBefore(svg, aiutoEl);
      const gGriglia = el('g'), gExtra = el('g'), gQuad = el('g'), gFig = el('g'), gAng = el('g'), gEti = el('g'), gMan = el('g');
      [gGriglia, gExtra, gQuad, gFig, gAng, gEti, gMan].forEach(g => svg.appendChild(g));

      /* la camera: la griglia c'è sempre tutta, e all'occorrenza si allarga per i quadrati */
      let U = 35, OX = 40, OY = 385;
      function camera(extra) {
        let x0 = 0, x1 = FX, y0 = 0, y1 = FY;
        (extra || []).forEach(p => { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
        x0 = Math.floor(x0); x1 = Math.ceil(x1); y0 = Math.floor(y0); y1 = Math.ceil(y1);
        const bordo = 38;   /* posto per i nomi dei vertici e le misure, anche quando un vertice sta sul bordo del campo */
        U = Math.min((W - 2 * bordo) / (x1 - x0), (H - 2 * bordo) / (y1 - y0));
        OX = W / 2 - (x0 + x1) / 2 * U;
        OY = H / 2 + (y0 + y1) / 2 * U;
      }
      const PX = x => OX + x * U, PY = y => OY - y * U;
      const sp = p => ({ x: PX(p.x), y: PY(p.y) });                       /* griglia → schermo */
      const gr = c => ({ x: (c.x - OX) / U, y: (OY - c.y) / U });          /* schermo → griglia */
      const norma = v => { const m = Math.hypot(v.x, v.y) || 1; return { x: v.x / m, y: v.y / m }; };
      const meno = (P, Q) => ({ x: P.x - Q.x, y: P.y - Q.y });
      /* le linee lunghe (assi, parallela, cerchi grandi) si tagliano sul bordo del viewBox:
         niente disegno che esce dalla scena (Liang-Barsky) */
      function ritaglia(P, Q) {
        let t0 = 0, t1 = 1;
        const dx = Q.x - P.x, dy = Q.y - P.y;
        const lati = [[-dx, P.x], [dx, W - P.x], [-dy, P.y], [dy, H - P.y]];
        for (const [pp, qq] of lati) {
          if (pp === 0) { if (qq < 0) return null; continue; }
          const r = qq / pp;
          if (pp < 0) { if (r > t1) return null; if (r > t0) t0 = r; } else { if (r < t0) return null; if (r < t1) t1 = r; }
        }
        return [{ x: P.x + dx * t0, y: P.y + dy * t0 }, { x: P.x + dx * t1, y: P.y + dy * t1 }];
      }
      function segmento(g, P, Q, attr) {
        const c = ritaglia(P, Q); if (!c) return;
        g.appendChild(el('line', Object.assign({ x1: c[0].x, y1: c[0].y, x2: c[1].x, y2: c[1].y }, attr)));
      }
      function cerchio(g, C, r, attr) {   /* un cerchio fatto di corde, ognuna ritagliata */
        let d = '', ultimo = null;
        for (let i = 0; i < 144; i++) {
          const a1 = i / 144 * 2 * Math.PI, a2 = (i + 1) / 144 * 2 * Math.PI;
          const c = ritaglia({ x: C.x + r * Math.cos(a1), y: C.y + r * Math.sin(a1) }, { x: C.x + r * Math.cos(a2), y: C.y + r * Math.sin(a2) });
          if (!c) { ultimo = null; continue; }
          if (!ultimo || Math.abs(ultimo.x - c[0].x) > .01 || Math.abs(ultimo.y - c[0].y) > .01) d += 'M' + c[0].x.toFixed(1) + ' ' + c[0].y.toFixed(1);
          d += 'L' + c[1].x.toFixed(1) + ' ' + c[1].y.toFixed(1);
          ultimo = c[1];
        }
        if (d) g.appendChild(el('path', Object.assign({ d }, attr)));
      }

      function disegnaGriglia() {
        svuota(gGriglia);
        /* fuori dal campo: la stessa quadrettatura, tenue, fino ai bordi del viewBox */
        const f = el('g', { class: 'griglia-fuori' });
        const i0 = Math.ceil(-OX / U), i1 = Math.floor((W - OX) / U), j0 = Math.ceil((OY - H) / U), j1 = Math.floor(OY / U);
        for (let i = i0; i <= i1; i++) f.appendChild(el('line', { x1: PX(i), y1: 0, x2: PX(i), y2: H }));
        for (let j = j0; j <= j1; j++) f.appendChild(el('line', { x1: 0, y1: PY(j), x2: W, y2: PY(j) }));
        gGriglia.appendChild(f);
        const g = el('g', { class: 'griglia' });
        for (let i = 0; i <= FX; i++) g.appendChild(el('line', { x1: PX(i), y1: PY(0), x2: PX(i), y2: PY(FY) }));
        for (let j = 0; j <= FY; j++) g.appendChild(el('line', { x1: PX(0), y1: PY(j), x2: PX(FX), y2: PY(j) }));
        gGriglia.appendChild(g);
        gGriglia.appendChild(el('rect', { class: 'campo-bordo', x: PX(0), y: PY(FY), width: FX * U, height: FY * U, rx: 3 }));
      }

      function creaManiglia(nome) {
        const g = el('g', { class: 'maniglia' });
        g.appendChild(el('circle', { class: 'alone', cx: 0, cy: 0, r: 23 }));
        g.appendChild(el('circle', { class: 'corpo', cx: 0, cy: 0, r: 10 }));
        const t = el('text', { class: 'nome', x: 0, y: 0, 'text-anchor': 'middle' }, nome);
        g.appendChild(t);
        gMan.appendChild(g);
        return { g, t };
      }
      const man = NOMI.map(creaManiglia);

      /* ---------- disegno degli angoli ---------- */
      function arcoAngolo(Vs, Ps, Qs, colore, valore, retto) {
        const u = norma(meno(Ps, Vs)), w = norma(meno(Qs, Vs));
        const bis = norma({ x: u.x + w.x, y: u.y + w.y });
        const lung = Math.min(Math.hypot(Ps.x - Vs.x, Ps.y - Vs.y), Math.hypot(Qs.x - Vs.x, Qs.y - Vs.y));
        if (retto) {
          const s = Math.min(18, lung * .3);
          gAng.appendChild(el('path', {
            class: 'squadra', stroke: colore,
            d: 'M' + (Vs.x + u.x * s) + ' ' + (Vs.y + u.y * s) +
               ' L' + (Vs.x + (u.x + w.x) * s) + ' ' + (Vs.y + (u.y + w.y) * s) +
               ' L' + (Vs.x + w.x * s) + ' ' + (Vs.y + w.y * s)
          }));
          const q = 1.55 * s;
          gEti.appendChild(el('text', { class: 'gradi', fill: colore, x: Vs.x + bis.x * (q + 14), y: Vs.y + bis.y * (q + 14) + 5, 'text-anchor': 'middle' }, '90°'));
          return;
        }
        const r = Math.max(13, Math.min(30, lung * .32));
        const cross = u.x * w.y - u.y * w.x;
        const sweep = cross > 0 ? 1 : 0;
        const a = { x: Vs.x + u.x * r, y: Vs.y + u.y * r }, b = { x: Vs.x + w.x * r, y: Vs.y + w.y * r };
        const arco = 'M' + a.x + ' ' + a.y + ' A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + b.x + ' ' + b.y;
        gAng.appendChild(el('path', { class: 'settore', fill: colore, opacity: .16, d: 'M' + Vs.x + ' ' + Vs.y + ' L' + a.x + ' ' + a.y + ' A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + b.x + ' ' + b.y + ' Z' }));
        gAng.appendChild(el('path', { class: 'arco', stroke: colore, d: arco }));
        gEti.appendChild(el('text', { class: 'gradi', fill: colore, x: Vs.x + bis.x * (r + 17), y: Vs.y + bis.y * (r + 17) + 5, 'text-anchor': 'middle' }, valore + '°'));
      }

      /* ---------- disegno dei lati ---------- */
      function etichettaLato(Ps, Qs, Os, testo) {
        const M = { x: (Ps.x + Qs.x) / 2, y: (Ps.y + Qs.y) / 2 };
        let n = norma({ x: -(Qs.y - Ps.y), y: Qs.x - Ps.x });
        if (n.x * (M.x - Os.x) + n.y * (M.y - Os.y) < 0) n = { x: -n.x, y: -n.y };
        gEti.appendChild(el('text', { class: 'misura', x: M.x + n.x * 17, y: M.y + n.y * 17 + 5, 'text-anchor': 'middle' }, testo));
      }

      /* ---------- i quadrati sui lati (livello di Pitagora) ---------- */
      function quadratiDi(g) {
        const V = g.V, verso = g.dop > 0 ? 1 : -1, out = [];
        [[1, 2, 0], [2, 0, 1], [0, 1, 2]].forEach(([i, j, k]) => {     /* lato k = da V[i] a V[j] */
          const P = V[i], Q = V[j], d = { x: Q.x - P.x, y: Q.y - P.y };
          const n = verso > 0 ? { x: d.y, y: -d.x } : { x: -d.y, y: d.x };
          const pts = [P, Q, { x: Q.x + n.x, y: Q.y + n.y }, { x: P.x + n.x, y: P.y + n.y }];
          out.push({ k, pts, centro: { x: (pts[0].x + pts[2].x) / 2, y: (pts[0].y + pts[2].y) / 2 } });
        });
        return out;
      }

      /* ---------- stato ---------- */
      let livello = 0, L = LIVELLI[0], V = [], finito = false, rivela = false, trascino = -1;
      let visti = new Set(), conta = 0, dopTarget = 0, areaTarget = 0;
      let angSx = 62, angDx = 118;                       /* livello impossibile: le due astine */
      const PSX = { x: 3, y: 3 }, PDX = { x: 9, y: 3 };
      let libero = false, salvato = null, accese = new Set(), ultima = null;   /* modalità libera */
      const LIBERO = { tipo: 'libero', testo: 'Trascina *A*, *B* e *C* dove vuoi e accendi le linee.' };

      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = 0;

      const chiave = p => p.x + ',' + p.y;
      const firma = g => g.gradi.slice().sort((a, b) => a - b).join('-');
      const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
      const puntaSx = () => ({ x: PSX.x + 2 * Math.cos(angSx * GRD), y: PSX.y + 2 * Math.sin(angSx * GRD) });
      const puntaDx = () => ({ x: PDX.x + 3 * Math.cos(angDx * GRD), y: PDX.y + 3 * Math.sin(angDx * GRD) });
      const valNum = () => parseFloat(String(campo.value).replace(',', '.'));
      const statoLiv = () => ({ valore: valNum(), conta, areaTarget });
      function conMate(s) {
        return s.split('$').map((p, i) => i % 2 ? ctx.tex(p)
          : p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*([^*]+)\*/g, '<em>$1</em>')).join('');
      }
      function pulisciMsg() { if (msg.classList.contains('no')) { msg.textContent = ''; msg.className = 'lab-messaggio'; } }

      /* ---------- disegno: il triangolo ---------- */
      function disegnaTriangolo() {
        const g = geo(V);
        const quadri = (L.quadrati && g.retto >= 0) ? quadratiDi(g) : null;   /* i quadrati servono solo se c'è l'angolo retto */
        /* durante un trascinamento la camera resta ferma: la griglia non deve scappare da sotto il dito */
        if (trascino < 0) camera(quadri ? quadri.reduce((acc, q) => acc.concat(q.pts), []) : null);
        [gExtra, gQuad, gFig, gAng, gEti].forEach(svuota);
        disegnaGriglia();
        const S = V.map(sp);
        const punti = S.map(p => p.x + ',' + p.y).join(' ');

        if (quadri) {
          quadri.forEach(q => {
            const col = g.retto < 0 ? NEUTRO : (q.k === g.retto ? ARANCIO : VERDE);
            gQuad.appendChild(el('polygon', { class: 'quadrato', points: q.pts.map(p => PX(p.x) + ',' + PY(p.y)).join(' '), fill: col, 'fill-opacity': .16, stroke: col }));
            const c = sp(q.centro);
            gQuad.appendChild(el('text', { class: 'q-testo', fill: col, x: c.x, y: c.y + 5, 'text-anchor': 'middle' }, LETT[q.k] + '² = ' + g.s2[q.k]));
          });
        }

        gFig.appendChild(el('polygon', { class: 'dentro', points: punti }));
        gFig.appendChild(el('polygon', { class: 'lato', points: punti }));

        for (let k = 0; k < 3; k++) arcoAngolo(S[k], S[(k + 1) % 3], S[(k + 2) % 3], COL[k], g.gradi[k], g.dot[k] === 0);
        for (let k = 0; k < 3; k++) {
          const i = (k + 1) % 3, j = (k + 2) % 3;
          etichettaLato(S[i], S[j], S[k], (L.quadrati ? LETT[k] + ' = ' : '') + num(g.lati[k]));
        }
        disegnaExtra(g, S);
        if (libero) disegnaNotevoli(g);

        S.forEach((s, k) => {
          const u = norma(meno(S[(k + 1) % 3], s)), w = norma(meno(S[(k + 2) % 3], s));
          const bis = norma({ x: u.x + w.x, y: u.y + w.y });
          man[k].g.setAttribute('transform', 'translate(' + s.x + ',' + s.y + ')');
          man[k].t.setAttribute('x', -bis.x * 27);
          man[k].t.setAttribute('y', -bis.y * 27 + 5);
        });
        aggiornaPannello(g);
        aggiornaFormule(g);
      }

      /* altezza, retta parallela, angoli alterni interni: compaiono dove servono */
      function disegnaExtra(g, S) {
        const [A, B, C] = V;
        if (L.tipo === 'stessaArea') {
          const t = ((C.x - A.x) * (B.x - A.x) + (C.y - A.y) * (B.y - A.y)) / d2(A, B);
          const F = { x: A.x + t * (B.x - A.x), y: A.y + t * (B.y - A.y) };
          const Fs = sp(F);
          if (t < 0 || t > 1) gExtra.appendChild(el('line', { class: 'tratteggio', opacity: .4, x1: S[t < 0 ? 0 : 1].x, y1: S[t < 0 ? 0 : 1].y, x2: Fs.x, y2: Fs.y }));
          gExtra.appendChild(el('line', { class: 'tratteggio', x1: S[2].x, y1: S[2].y, x2: Fs.x, y2: Fs.y }));
          const M = { x: (S[2].x + Fs.x) / 2, y: (S[2].y + Fs.y) / 2 };
          gEti.appendChild(el('text', { class: 'misura', x: M.x + 16, y: M.y + 5 }, 'h = ' + num(g.altezze[2])));
        }
        if (!rivela || (L.tipo !== 'stessaArea' && L.tipo !== 'somma')) return;
        const d = norma(meno(sp(B), sp(A))), lungo = W + H;
        const P1 = { x: S[2].x - d.x * lungo, y: S[2].y - d.y * lungo };
        const P2 = { x: S[2].x + d.x * lungo, y: S[2].y + d.y * lungo };
        segmento(gExtra, P1, P2, { class: 'tratteggio', stroke: 'var(--accento)', 'stroke-width': 2.5, opacity: .9 });
        if (L.tipo === 'somma') {
          const R1 = { x: S[2].x - d.x * 70, y: S[2].y - d.y * 70 }, R2 = { x: S[2].x + d.x * 70, y: S[2].y + d.y * 70 };
          arcoAngolo(S[2], R1, S[0], COL[0], g.gradi[0], false);
          arcoAngolo(S[2], R2, S[1], COL[1], g.gradi[1], false);
        }
      }

      /* ---------- disegno: le tre astine che non si chiudono ---------- */
      function disegnaAstine() {
        camera(null);
        [gExtra, gQuad, gFig, gAng, gEti].forEach(svuota);
        disegnaGriglia();
        const Ls = sp(PSX), Rs = sp(PDX), P = puntaSx(), Q = puntaDx(), Ps = sp(P), Qs = sp(Q);
        const M = { x: (Ps.x + Qs.x) / 2, y: (Ps.y + Qs.y) / 2 };
        gFig.appendChild(el('line', { class: 'astina', x1: Ls.x, y1: Ls.y, x2: Rs.x, y2: Rs.y }));
        gFig.appendChild(el('line', { class: 'astina', stroke: COL[0], x1: Ls.x, y1: Ls.y, x2: Ps.x, y2: Ps.y }));
        gFig.appendChild(el('line', { class: 'astina', stroke: COL[1], x1: Rs.x, y1: Rs.y, x2: Qs.x, y2: Qs.y }));
        gFig.appendChild(el('circle', { class: 'perno', cx: Ls.x, cy: Ls.y, r: 5 }));
        gFig.appendChild(el('circle', { class: 'perno', cx: Rs.x, cy: Rs.y, r: 5 }));
        gExtra.appendChild(el('line', { class: 'tratteggio', stroke: rivela ? 'var(--no)' : 'var(--testo2)', x1: Ps.x, y1: Ps.y, x2: Qs.x, y2: Qs.y }));
        etichettaLato(Ls, Rs, M, '6');
        etichettaLato(Ls, Ps, Rs, '2');
        etichettaLato(Rs, Qs, Ls, '3');
        const buco = dist(P, Q);
        gEti.appendChild(el('text', { class: 'misura', fill: 'var(--no)', x: M.x, y: M.y - 12, 'text-anchor': 'middle' }, num(buco)));
        man[0].g.setAttribute('transform', 'translate(' + Ps.x + ',' + Ps.y + ')');
        man[1].g.setAttribute('transform', 'translate(' + Qs.x + ',' + Qs.y + ')');
        panEl.innerHTML = '<span class="chip">lati <b>2, 3, 6</b></span><span class="chip">distanza fra le punte <b>' + num(buco) + '</b></span>';
        formaEl.innerHTML = buco < 1.05 ? 'Più vicine di così non ci arrivano.' : 'Le due punte non si toccano.';
        formuleEl.innerHTML = riga(['2 + 3 = 5', '< 6']) +
          '<div class="riga nota">le due astine, tutte distese, non arrivano dall\'altra parte</div>';
      }

      function ridisegna() { if (L.tipo === 'impossibile') disegnaAstine(); else disegnaTriangolo(); }

      /* ---------- modalità libera: altezze, mediane, bisettrici, assi e i loro punti d'incontro ---------- */
      function notevoli(g) {
        const [A, B, C] = V, [a, b, c] = g.lati;
        const piu = (P, Q, k) => ({ x: P.x + (Q.x - P.x) * k, y: P.y + (Q.y - P.y) * k });
        const dd = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
        const q2 = P => P.x * P.x + P.y * P.y;
        const O = { x: (q2(A) * (B.y - C.y) + q2(B) * (C.y - A.y) + q2(C) * (A.y - B.y)) / dd,
                    y: (q2(A) * (C.x - B.x) + q2(B) * (A.x - C.x) + q2(C) * (B.x - A.x)) / dd };
        const Hc = { x: A.x + B.x + C.x - 2 * O.x, y: A.y + B.y + C.y - 2 * O.y };   /* retta di Eulero: OH = OA + OB + OC */
        const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
        const I = { x: (a * A.x + b * B.x + c * C.x) / (a + b + c), y: (a * A.y + b * B.y + c * C.y) / (a + b + c) };
        const lati = [0, 1, 2].map(k => {
          const i = (k + 1) % 3, j = (k + 2) % 3, P = V[i], Q = V[j];
          const t = ((V[k].x - P.x) * (Q.x - P.x) + (V[k].y - P.y) * (Q.y - P.y)) / d2(P, Q);
          return { k, i, j, t, piede: piu(P, Q, t), medio: piu(P, Q, .5), bis: piu(P, Q, g.lati[j] / (g.lati[i] + g.lati[j])) };
        });
        return { O, R: Math.sqrt(d2(O, A)), H: Hc, G, I, r: 2 * g.area / g.perimetro, lati };
      }
      function disegnaNotevoli(g) {
        const n = notevoli(g), S = V.map(sp);
        const linea = (P, Q, col, oltre) => segmento(gExtra, P, Q, { class: 'notevole' + (oltre ? ' oltre' : ''), stroke: col });
        const punto = (P, nome, col, dx, dy) => {
          const s = sp(P);
          if (s.x < 24 || s.x > W - 24 || s.y < 24 || s.y > H - 24) return;   /* fuori dalla scena: si vedono solo le linee che ci vanno */
          gEti.appendChild(el('circle', { class: 'punto-n', cx: s.x, cy: s.y, r: 5.5, fill: col }));
          gEti.appendChild(el('text', { class: 'nome-n', fill: col, x: s.x + dx, y: s.y + dy, 'text-anchor': 'middle' }, nome));
        };
        const col = id => LINEE.find(l => l.id === id).colore;
        if (accese.has('assi')) {
          const c = col('assi'), Os = sp(n.O);
          cerchio(gExtra, Os, n.R * U, { class: 'cerchio-n', stroke: c });
          n.lati.forEach(l => {
            const M = sp(l.medio), d = norma({ x: -(S[l.j].y - S[l.i].y), y: S[l.j].x - S[l.i].x }), L2 = W + H;
            linea({ x: M.x - d.x * L2, y: M.y - d.y * L2 }, { x: M.x + d.x * L2, y: M.y + d.y * L2 }, c, false);
          });
        }
        if (accese.has('bisettrici')) {
          const c = col('bisettrici'), Is = sp(n.I);
          cerchio(gExtra, Is, n.r * U, { class: 'cerchio-n', stroke: c });
          n.lati.forEach(l => linea(S[l.k], sp(l.bis), c, false));
        }
        if (accese.has('mediane')) n.lati.forEach(l => linea(S[l.k], sp(l.medio), col('mediane'), false));
        if (accese.has('altezze')) {
          const c = col('altezze');
          n.lati.forEach(l => {
            const F = sp(l.piede), Vk = S[l.k];
            linea(Vk, F, c, false);
            if (l.t < 0 || l.t > 1) linea(S[l.t < 0 ? l.i : l.j], F, c, true);       /* il piede cade sul prolungamento del lato */
            const Hs = sp(n.H), u = { x: F.x - Vk.x, y: F.y - Vk.y }, lu = u.x * u.x + u.y * u.y;
            const s = lu ? ((Hs.x - Vk.x) * u.x + (Hs.y - Vk.y) * u.y) / lu : 0;
            if (s < -0.01) linea(Vk, Hs, c, true); else if (s > 1.01) linea(F, Hs, c, true);   /* l'ortocentro è fuori */
            if (lu > 1 && F.x > 12 && F.x < W - 12 && F.y > 12 && F.y < H - 12) {                                                             /* il quadratino dell'angolo retto nel piede */
              const e = norma({ x: Vk.x - F.x, y: Vk.y - F.y }), Ms = sp(l.medio);
              let w = norma({ x: S[l.j].x - S[l.i].x, y: S[l.j].y - S[l.i].y });
              if ((Ms.x - F.x) * w.x + (Ms.y - F.y) * w.y < 0) w = { x: -w.x, y: -w.y };
              const z = 8;
              gExtra.appendChild(el('path', { class: 'notevole', stroke: c, 'stroke-width': 1.6, d: 'M' + (F.x + e.x * z) + ' ' + (F.y + e.y * z) + ' l' + (w.x * z) + ' ' + (w.y * z) + ' l' + (-e.x * z) + ' ' + (-e.y * z) }));
            }
          });
        }
        if (accese.has('assi')) punto(n.O, 'O', col('assi'), -14, 20);
        if (accese.has('bisettrici')) punto(n.I, 'I', col('bisettrici'), -14, -9);
        if (accese.has('mediane')) punto(n.G, 'G', col('mediane'), 14, 20);
        if (accese.has('altezze')) punto(n.H, 'H', col('altezze'), 14, -9);
      }
      /* osservazioni neutre, sulla famiglia di linee toccata per ultima */
      function osserva() {
        if (!libero) return;
        const g = geo(V), f = g.forma;
        const ang = f.ang, iso = f.lat !== 'scaleno';
        let t = '';
        if (!accese.size) t = 'Accendi una famiglia di linee: le tre linee si incontrano sempre in un punto.';
        else if (accese.size >= 2 && iso) t = 'Triangolo isoscele: i punti accesi stanno tutti sull\'asse di simmetria.';
        else if (ultima === 'altezze') t = ang === 'rettangolo' ? 'Triangolo rettangolo: l\'ortocentro H è proprio il vertice dell\'angolo retto.' : ang === 'ottusangolo' ? 'Triangolo ottusangolo: l\'ortocentro H cade fuori.' : 'Triangolo acutangolo: l\'ortocentro H sta dentro.';
        else if (ultima === 'assi') t = ang === 'rettangolo' ? 'Triangolo rettangolo: il circocentro O sta a metà dell\'ipotenusa.' : ang === 'ottusangolo' ? 'Triangolo ottusangolo: il circocentro O cade fuori, oltre il lato più lungo.' : 'Il circocentro O ha la stessa distanza da A, B e C.';
        else if (ultima === 'mediane') t = 'Il baricentro G sta sempre dentro, a due terzi di ogni mediana partendo dal vertice.';
        else if (ultima === 'bisettrici') t = 'L\'incentro I sta sempre dentro: ha la stessa distanza dai tre lati.';
        msg.textContent = t; msg.className = 'lab-messaggio';
      }

      /* ---------- pannellino, classificazione, formule ---------- */
      function aggiornaPannello(g) {
        let h = '<span class="chip">Area <b>' + num(g.area) + '</b></span>' +
                '<span class="chip">Perimetro <b>' + num(g.perimetro) + '</b></span>';
        if (L.tipo === 'stessaArea') h += '<span class="chip">stessa area <b>' + conta + ' di 3</b></span>';
        if (L.tipo === 'somma') h += '<span class="chip">triangoli diversi <b>' + conta + ' di 5</b></span>';
        panEl.innerHTML = h;
        let f = g.forma.testo;
        if (g.forma.quasiEq) f += '<span class="nota">quasi equilatero: con i vertici sui punti della griglia l\'equilatero esatto non esiste</span>';
        formaEl.innerHTML = f;
      }

      /* una formula a pezzi: va a capo fra un pezzo e l'altro se il pannello è stretto */
      const riga = pezzi => '<div class="riga">' + pezzi.map(p => '<span>' + ctx.tex(p) + '</span>').join('') + '</div>';
      function aggiornaFormule(g) {
        const a = g.gradi;
        let h = riga(['\\hat A + \\hat B + \\hat C', '= ' + a[0] + '^\\circ + ' + a[1] + '^\\circ + ' + a[2] + '^\\circ', '= 180^\\circ']);
        if (L.quadrati) {
          let i = g.retto;
          if (i < 0) i = g.s2.indexOf(Math.max(g.s2[0], g.s2[1], g.s2[2]));
          const altri = [0, 1, 2].filter(k => k !== i), j = altri[0], k = altri[1];
          const somma = g.s2[j] + g.s2[k], grande = g.s2[i];
          if (g.retto >= 0) {
            h += riga([LETT[j] + '^2 + ' + LETT[k] + '^2', '= ' + g.s2[j] + ' + ' + g.s2[k], '= ' + somma, '= ' + LETT[i] + '^2']);
            const iv = g.s2.map(intero);
            if (iv.every(v => v !== null)) h += riga([iv[j] + '^2 + ' + iv[k] + '^2', '= ' + iv[i] + '^2']);
          } else {
            h += riga([g.s2[j] + ' + ' + g.s2[k], (somma > grande ? '> ' : '< ') + grande]) +
                 '<div class="riga nota">senza angolo retto i due quadrati piccoli ' + (somma > grande ? 'traboccano' : 'non bastano') + ': Pitagora vale solo per i triangoli rettangoli</div>';
          }
        }
        formuleEl.innerHTML = h;
      }


      /* ---------- mosse ---------- */
      function valido() {
        const [A, B, C] = V;
        if ((A.x === B.x && A.y === B.y) || (A.x === C.x && A.y === C.y) || (B.x === C.x && B.y === C.y)) return false;
        return (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x) !== 0;
      }
      function contatori() {
        if (finito) return;
        const g = geo(V);
        if (L.tipo === 'stessaArea') {
          const k = chiave(V[2]);
          if (Math.abs(g.dop) === dopTarget && !visti.has(k)) { visti.add(k); conta++; }
        }
        if (L.tipo === 'somma') { visti.add(firma(g)); conta = visti.size; }
      }
      function vittoriaAutomatica() {
        if (finito || (L.tipo !== 'stessaArea' && L.tipo !== 'somma')) return;
        const g = geo(V);
        if (L.ok(g, statoLiv())) vinci(g);
      }

      function conferma() {
        if (finito) return;
        if (L.tipo === 'impossibile') {
          msg.textContent = 'Non si chiude.'; msg.className = 'lab-messaggio no';
          ctx.zenone(L.perche(), { tipo: 'suggerimento', espressione: 'pensa', durata: 8000 });
          return;
        }
        const g = geo(V), s = statoLiv();
        if (L.ok(g, s)) { vinci(g); return; }
        msg.textContent = 'Non ancora.'; msg.className = 'lab-messaggio no';
        ctx.zenone(L.perche(g, s), { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
      }

      function vinci(g) {
        finito = true; rivela = true;
        btnConf.disabled = true; btnNo.disabled = true;
        ctx.completato(livello); aggiornaLivelli();
        const titolo = L.tipo === 'impossibile' ? 'Hai ragione: non si può.'
          : L.tipo === 'somma' ? 'Cinque triangoli, sempre 180°.'
          : L.tipo === 'stessaArea' ? 'Tre posizioni, stessa area: ' + num(g.area) + '.'
          : 'Fatto: ' + g.forma.testo + '.';
        msg.innerHTML = '<span class="vinto">' + titolo + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.zenone(L.vinto(g), { espressione: 'orgoglioso', durata: 12000 });
        btnRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        ridisegna();
      }

      /* ---------- livelli ---------- */
      function avviaLivello(n) {
        libero = false; salvato = null; mostraLibero(); aiutoEl.hidden = true;
        livello = n; L = LIVELLI[n];
        finito = false; rivela = false; trascino = -1; conta = 0; visti = new Set();
        btnConf.disabled = false; btnNo.disabled = false;
        if (L.tipo === 'impossibile') { angSx = 62; angDx = 118; }
        else {
          V = L.V.map(p => ({ x: p[0], y: p[1] }));
          const g0 = geo(V);
          dopTarget = Math.abs(g0.dop); areaTarget = g0.area;
          if (L.tipo === 'stessaArea') visti.add(chiave(V[2]));
          if (L.tipo === 'somma') { visti.add(firma(g0)); conta = 1; }
        }
        obEl.innerHTML = conMate(L.testo);
        msg.textContent = ''; msg.className = 'lab-messaggio';
        btnRic.textContent = 'Ricomincia';
        if (L.campo) { campoNome.textContent = L.campo; campo.value = ''; }
        preparaPulsanti(); preparaManiglie();
        ridisegna(); aggiornaLivelli();
      }
      function preparaPulsanti() {
        mostra(btnConf, !libero); btnRic.hidden = libero; btnCasuale.hidden = !libero;
        mostra(etiCampo, !libero && !!L.campo); mostra(btnNo, !libero && L.tipo === 'impossibile');
        btnConf.disabled = finito; btnNo.disabled = finito;
      }
      function preparaManiglie() {
        man.forEach((m, k) => {
          m.g.style.display = (L.tipo === 'impossibile' && k === 2) ? 'none' : '';
          m.t.textContent = L.tipo === 'impossibile' ? '' : NOMI[k];
          m.g.classList.toggle('bloccata', !!(L.blocca && L.blocca.indexOf(k) >= 0));
          m.g.classList.remove('presa');
        });
      }
      function aggiornaLivelli() {
        const fatti = ctx.stato().livelli, sblocco = fatti.length ? Math.max(...fatti) + 1 : 0;
        [...livelliEl.querySelectorAll('.lab-pallino')].forEach((p, k) => {
          p.classList.toggle('fatto', fatti.includes(k));
          p.classList.toggle('attivo', !libero && k === livello);
          p.disabled = k > sblocco && k !== livello;
          p.setAttribute('aria-current', !libero && k === livello ? 'step' : 'false');
        });
        btnLibero.setAttribute('aria-pressed', libero);
      }

      /* ---------- entrare e uscire dalla modalità libera ---------- */
      const AIUTO_LIBERO = 'In modalità libera non c\'è niente da indovinare: trascina A, B e C dove vuoi. I quattro pulsanti accendono le linee notevoli, e ogni terna si incontra in un punto. Le altezze partono da un vertice e scendono perpendicolari al lato opposto: si incontrano nell\'ortocentro H. Le mediane uniscono un vertice al punto medio del lato opposto: si incontrano nel baricentro G. Le bisettrici tagliano a metà gli angoli: si incontrano nell\'incentro I, centro del cerchio che tocca i tre lati. Gli assi sono le perpendicolari ai lati nel loro punto medio: si incontrano nel circocentro O, centro del cerchio che passa per A, B e C. «Casuale» propone un triangolo a caso.';
      function mostraLibero() {
        parametriEl.hidden = !libero;
        radice.classList.toggle('in-libero', libero);
        preparaPulsanti();
      }
      function entraLibero() {
        salvato = { livello, V: V.map(p => ({ x: p.x, y: p.y })), finito, rivela, conta, visti: new Set(visti), angSx, angDx, dopTarget, areaTarget,
          campo: campo.value, ob: obEl.innerHTML, msg: msg.innerHTML, cls: msg.className, ric: btnRic.textContent };
        const daAstine = L.tipo === 'impossibile' || V.length !== 3;
        libero = true; L = LIBERO; finito = false; rivela = false; trascino = -1;
        if (daAstine) V = [{ x: 2, y: 2 }, { x: 9, y: 3 }, { x: 5, y: 8 }];
        aiutoEl.hidden = true; mostraLibero(); preparaManiglie();
        obEl.innerHTML = conMate(L.testo);
        ridisegna(); osserva(); aggiornaLivelli();
      }
      function esciLibero() {   /* si torna al livello com'era */
        const z = salvato; libero = false; salvato = null;
        livello = z.livello; L = LIVELLI[livello]; V = z.V; finito = z.finito; rivela = z.rivela; conta = z.conta; visti = z.visti;
        angSx = z.angSx; angDx = z.angDx; dopTarget = z.dopTarget; areaTarget = z.areaTarget; trascino = -1;
        aiutoEl.hidden = true; mostraLibero(); preparaManiglie();
        campo.value = z.campo; obEl.innerHTML = z.ob; btnRic.textContent = z.ric;
        ridisegna(); aggiornaLivelli();
        msg.innerHTML = z.msg; msg.className = z.cls;
      }
      function casuale() {
        const r = n => Math.floor(Math.random() * (n + 1));
        for (let tent = 0; tent < 300; tent++) {
          const P = [0, 1, 2].map(() => ({ x: r(FX), y: r(FY) })), g = geo(P);
          if (g.area < 8 || Math.min(...g.lati) < 3) continue;
          if (P.every((p, k) => p.x === V[k].x && p.y === V[k].y)) continue;
          V = P; ridisegna(); osserva(); return;
        }
      }

      /* ---------- il dito ----------
         dal dito alle coordinate del viewBox con la matrice dello schermo (mai col rettangolo dell'svg:
         con preserveAspectRatio e il viewBox che cambia forma sbaglierebbe) */
      function coordSvg(ev) {
        const m = svg.getScreenCTM();
        if (!m) return { x: -9999, y: -9999 };
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
        return { x: p.x, y: p.y };
      }
      /* il raggio di presa: 50 unità, ma mai meno di 34 px veri sullo schermo */
      function raggioPresa() { const m = svg.getScreenCTM(); return m ? Math.max(50, 34 / (m.a || 1)) : 50; }
      function giu(ev) {
        if (finito) return;
        const c = coordSvg(ev), rp = raggioPresa();
        if (L.tipo === 'impossibile') {
          const dP = dist(c, sp(puntaSx())), dQ = dist(c, sp(puntaDx()));
          if (Math.min(dP, dQ) > rp) return;
          trascino = dP <= dQ ? 0 : 1;
        } else {
          let scelto = -1, mind = 1e9;
          V.forEach((p, k) => {
            if (L.blocca && L.blocca.indexOf(k) >= 0) return;
            const d = dist(c, sp(p));
            if (d < mind) { mind = d; scelto = k; }
          });
          if (scelto < 0 || mind > rp) return;
          trascino = scelto;
        }
        man[trascino].g.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      }
      function muovi(ev) {
        if (trascino < 0) return;
        ev.preventDefault();
        const G = gr(coordSvg(ev));
        if (L.tipo === 'impossibile') {
          const perno = trascino === 0 ? PSX : PDX;
          const a = Math.atan2(G.y - perno.y, G.x - perno.x) / GRD;
          if (trascino === 0) angSx = a; else angDx = a;
          pulisciMsg(); ridisegna();
          return;
        }
        const nx = Math.max(0, Math.min(FX, Math.round(G.x))), ny = Math.max(0, Math.min(FY, Math.round(G.y)));
        const p = V[trascino];
        if (nx === p.x && ny === p.y) return;
        const vx = p.x, vy = p.y;
        p.x = nx; p.y = ny;
        if (!valido()) { p.x = vx; p.y = vy; return; }
        pulisciMsg(); contatori(); ridisegna(); vittoriaAutomatica(); osserva();
      }
      function molla() {
        if (trascino < 0) return;
        man[trascino].g.classList.remove('presa'); trascino = -1;
        ridisegna(); adatta();   /* se lo spazio è cambiato durante il trascinamento, il viewBox si aggiorna adesso */
      }
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi);
      window.addEventListener('pointerup', molla);
      window.addEventListener('pointercancel', molla);

      btnConf.addEventListener('click', conferma);
      campo.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); conferma(); } });
      btnNo.addEventListener('click', () => { if (!finito && L.tipo === 'impossibile') vinci(null); });
      btnRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      btnAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        aiutoEl.querySelector('p').textContent = libero ? AIUTO_LIBERO : L.aiuto;
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });
      btnLibero.addEventListener('click', () => { if (trascino >= 0) return; if (libero) esciLibero(); else entraLibero(); });
      btnCasuale.addEventListener('click', casuale);
      parametriEl.addEventListener('click', ev => {
        const b = ev.target.closest('button[data-l]'); if (!b || !libero) return;
        const id = b.dataset.l;
        if (accese.has(id)) { accese.delete(id); ultima = [...accese].pop() || null; } else { accese.add(id); ultima = id; }
        b.setAttribute('aria-pressed', accese.has(id));
        ridisegna(); osserva();
      });
      LIVELLI.forEach((_, k) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (k + 1)); p.innerHTML = '<span>' + (k + 1) + '</span>';
        p.addEventListener('click', () => { if (trascino < 0) avviaLivello(k); });
        livelliEl.insertBefore(p, btnLibero);
      });

      /* ---------- la forma dello spazio decide il viewBox ----------
         Circa 1,4 px per unità (mai meno di 420 unità di larghezza, così sul telefono il testo resta
         leggibile); l'altezza segue la forma della scena. Durante un trascinamento non si tocca. */
      function adatta() {
        if (trascino >= 0) return;
        const r = svg.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        const nW = Math.round(Math.max(420, Math.min(1400, r.width / 1.4)));
        const nH = Math.round(nW * r.height / r.width);
        if (nW === W && nH === H) return;
        W = nW; H = nH;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        ridisegna();
      }

      avviaLivello(livello);
      adatta();
      const ro = new ResizeObserver(adatta); ro.observe(radice); ro.observe(svg);

      return function smonta() {
        trascino = -1; ro.disconnect();
        window.removeEventListener('pointermove', muovi);
        window.removeEventListener('pointerup', molla);
        window.removeEventListener('pointercancel', molla);
      };
    }
  });
})();
