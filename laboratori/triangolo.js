/* Laboratorio «Il triangolo che si muove» — geometria euclidea.
   Tre vertici agganciati alla griglia intera: angoli, lati, area, perimetro e classificazione
   si aggiornano mentre trascini. Niente calamite: ogni livello si chiude con «Conferma». */
(function () {
  const STILE = `
    .lab-triangolo .lab-scena { max-width: 640px; margin: 0 auto; background: var(--sup2); border-radius: 12px; overflow: hidden; touch-action: none; }
    .lab-triangolo .griglia { stroke: var(--bordo); stroke-width: 1; opacity: .85; }
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
    .lab-triangolo .obiettivo { text-align: center; padding: 4px 12px 10px; font-size: .95rem; color: var(--testo2); line-height: 1.6; }
    .lab-triangolo .obiettivo em { font-style: normal; font-weight: 700; color: var(--testo); }
    .lab-triangolo .obiettivo .katex { font-size: 1em; }
    .lab-triangolo .pannello { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; padding: 10px 12px 0; }
    .lab-triangolo .chip { background: var(--sup2); border: 1px solid var(--bordo); border-radius: 999px; padding: 4px 12px; font-size: .85rem; color: var(--testo2); }
    .lab-triangolo .chip b { color: var(--testo); font-variant-numeric: tabular-nums; }
    .lab-triangolo .forma { text-align: center; padding: 8px 12px 0; font-size: 1rem; font-weight: 600; color: var(--testo); }
    .lab-triangolo .forma .nota { display: block; font-size: .8rem; font-weight: 400; color: var(--testo2); }
    .lab-triangolo .formule { text-align: center; padding: 8px 12px 0; font-size: 1.05rem; overflow-x: auto; }
    .lab-triangolo .formule .riga { padding: 3px 0; }
    .lab-triangolo .formule .nota { font-size: .82rem; color: var(--testo2); }
    .lab-triangolo .campo-eti { display: inline-flex; align-items: center; gap: 6px; font-size: .9rem; color: var(--testo2); }
    .lab-triangolo .campo-num { width: 5em; min-height: 40px; padding: 4px 8px; border: 1px solid var(--bordo2); border-radius: 8px; background: var(--sup); color: var(--testo); font: 600 1rem var(--font); text-align: center; }
    .lab-triangolo .vinto { animation: lab-tri-pop .5s cubic-bezier(.34,1.56,.64,1); display: inline-block; }
    @keyframes lab-tri-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-triangolo .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
    @media (max-width: 600px) {
      .lab-triangolo .formule { font-size: .92rem; }
      .lab-triangolo .chip { font-size: .8rem; padding: 3px 10px; }
      .lab-triangolo .obiettivo { font-size: .9rem; }
    }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, t) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  const W = 500, H = 420, FX = 12, FY = 10;
  const NOMI = ['A', 'B', 'C'], LETT = ['a', 'b', 'c'];
  const COL = ['var(--s1)', 'var(--s2)', 'var(--s3)'];
  const VERDE = 'var(--s3)', ARANCIO = 'var(--s2)', NEUTRO = 'var(--s4)';
  const GRD = Math.PI / 180;

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
        <div class="obiettivo"></div>
        <div class="lab-scena"></div>
        <div class="pannello"></div>
        <div class="forma"></div>
        <div class="formule"></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn primario m-conferma">Conferma</button>
          <label class="campo-eti"><span class="campo-nome">ipotenusa =</span><input type="text" class="campo-num" inputmode="decimal" autocomplete="off" spellcheck="false"></label>
          <button type="button" class="btn m-nonsipuo">Non si può</button>
          <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo m-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const obEl = radice.querySelector('.obiettivo'), panEl = radice.querySelector('.pannello');
      const formaEl = radice.querySelector('.forma'), formuleEl = radice.querySelector('.formule');
      const msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const btnConf = radice.querySelector('.m-conferma'), btnNo = radice.querySelector('.m-nonsipuo');
      const btnRic = radice.querySelector('.m-ricomincia'), btnAiuto = radice.querySelector('.m-aiuto');
      const etiCampo = radice.querySelector('.campo-eti'), campo = radice.querySelector('.campo-num'), campoNome = radice.querySelector('.campo-nome');
      const mostra = (nodo, v) => { nodo.style.display = v ? '' : 'none'; };

      /* ---------- scena ---------- */
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Un triangolo con i vertici da trascinare su una griglia' });
      scena.appendChild(svg);
      const gGriglia = el('g'), gExtra = el('g'), gQuad = el('g'), gFig = el('g'), gAng = el('g'), gEti = el('g'), gMan = el('g');
      [gGriglia, gExtra, gQuad, gFig, gAng, gEti, gMan].forEach(g => svg.appendChild(g));

      /* la camera: la griglia c'è sempre tutta, e all'occorrenza si allarga per i quadrati */
      let U = 35, OX = 40, OY = 385;
      function camera(extra) {
        let x0 = 0, x1 = FX, y0 = 0, y1 = FY;
        (extra || []).forEach(p => { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
        x0 = Math.floor(x0) - .7; x1 = Math.ceil(x1) + .7; y0 = Math.floor(y0) - .7; y1 = Math.ceil(y1) + .7;
        U = Math.min((W - 20) / (x1 - x0), (H - 20) / (y1 - y0));
        OX = W / 2 - (x0 + x1) / 2 * U;
        OY = H / 2 + (y0 + y1) / 2 * U;
      }
      const PX = x => OX + x * U, PY = y => OY - y * U;
      const sp = p => ({ x: PX(p.x), y: PY(p.y) });                       /* griglia → schermo */
      const gr = c => ({ x: (c.x - OX) / U, y: (OY - c.y) / U });          /* schermo → griglia */
      const norma = v => { const m = Math.hypot(v.x, v.y) || 1; return { x: v.x / m, y: v.y / m }; };
      const meno = (P, Q) => ({ x: P.x - Q.x, y: P.y - Q.y });

      function disegnaGriglia() {
        svuota(gGriglia);
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
        camera(quadri ? quadri.reduce((acc, q) => acc.concat(q.pts), []) : null);
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
        gExtra.appendChild(el('line', { class: 'tratteggio', stroke: 'var(--accento)', 'stroke-width': 2.5, opacity: .9, x1: P1.x, y1: P1.y, x2: P2.x, y2: P2.y }));
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
        formuleEl.innerHTML = '<div class="riga">' + ctx.tex('2 + 3 = 5 < 6') + '</div>' +
          '<div class="riga nota">le due astine, tutte distese, non arrivano dall\'altra parte</div>';
      }

      function ridisegna() { if (L.tipo === 'impossibile') disegnaAstine(); else disegnaTriangolo(); aggiornaTesta(); }

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

      function aggiornaFormule(g) {
        const a = g.gradi;
        let h = '<div class="riga">' + ctx.tex('\\hat A + \\hat B + \\hat C = ' + a[0] + '^\\circ + ' + a[1] + '^\\circ + ' + a[2] + '^\\circ = 180^\\circ') + '</div>';
        if (L.quadrati) {
          let i = g.retto;
          if (i < 0) i = g.s2.indexOf(Math.max(g.s2[0], g.s2[1], g.s2[2]));
          const altri = [0, 1, 2].filter(k => k !== i), j = altri[0], k = altri[1];
          const somma = g.s2[j] + g.s2[k], grande = g.s2[i];
          if (g.retto >= 0) {
            h += '<div class="riga">' + ctx.tex(LETT[j] + '^2 + ' + LETT[k] + '^2 = ' + g.s2[j] + ' + ' + g.s2[k] + ' = ' + somma + ' = ' + LETT[i] + '^2') + '</div>';
            const iv = g.s2.map(intero);
            if (iv.every(v => v !== null)) h += '<div class="riga">' + ctx.tex(iv[j] + '^2 + ' + iv[k] + '^2 = ' + iv[i] + '^2') + '</div>';
          } else {
            h += '<div class="riga">' + ctx.tex(g.s2[j] + ' + ' + g.s2[k] + (somma > grande ? ' > ' : ' < ') + grande) + '</div>' +
                 '<div class="riga nota">senza angolo retto i due quadrati piccoli ' + (somma > grande ? 'traboccano' : 'non bastano') + ': Pitagora vale solo per i triangoli rettangoli</div>';
          }
        }
        formuleEl.innerHTML = h;
      }

      function aggiornaTesta() { livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length; }

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
        ctx.completato(livello);
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
        mostra(etiCampo, !!L.campo); mostra(btnNo, L.tipo === 'impossibile');
        if (L.campo) { campoNome.textContent = L.campo; campo.value = ''; }
        man.forEach((m, k) => {
          m.g.style.display = (L.tipo === 'impossibile' && k === 2) ? 'none' : '';
          m.t.textContent = L.tipo === 'impossibile' ? '' : NOMI[k];
          m.g.classList.toggle('bloccata', !!(L.blocca && L.blocca.indexOf(k) >= 0));
          m.g.classList.remove('presa');
        });
        ridisegna();
      }

      /* ---------- il dito ---------- */
      const coordSvg = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * W, y: (ev.clientY - r.top) / r.height * H }; };
      svg.addEventListener('pointerdown', ev => {
        if (finito) return;
        const c = coordSvg(ev);
        if (L.tipo === 'impossibile') {
          const dP = dist(c, sp(puntaSx())), dQ = dist(c, sp(puntaDx()));
          if (Math.min(dP, dQ) > 50) return;
          trascino = dP <= dQ ? 0 : 1;
        } else {
          let scelto = -1, mind = 1e9;
          V.forEach((p, k) => {
            if (L.blocca && L.blocca.indexOf(k) >= 0) return;
            const d = dist(c, sp(p));
            if (d < mind) { mind = d; scelto = k; }
          });
          if (scelto < 0 || mind > 50) return;
          trascino = scelto;
        }
        man[trascino].g.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      });
      svg.addEventListener('pointermove', ev => {
        if (trascino < 0) return;
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
        pulisciMsg(); contatori(); ridisegna(); vittoriaAutomatica();
      });
      const molla = () => { if (trascino < 0) return; man[trascino].g.classList.remove('presa'); trascino = -1; };
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('pointerleave', molla);

      btnConf.addEventListener('click', conferma);
      campo.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); conferma(); } });
      btnNo.addEventListener('click', () => { if (!finito && L.tipo === 'impossibile') vinci(null); });
      btnRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      btnAiuto.addEventListener('click', () => ctx.zenone(L.aiuto, { tipo: 'suggerimento', espressione: 'pensa', durata: 14000 }));

      avviaLivello(livello);

      return function smonta() { trascino = -1; };
    }
  });
})();
