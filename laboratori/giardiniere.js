/* Laboratorio «Il giardiniere» — ellisse (e, come sfida finale, iperbole) come luogo di punti.
   Un prato visto dall'alto, con la griglia in metri. Due picchetti F₁ e F₂ sull'asse x, simmetrici
   rispetto al centro (distanza 2c), e uno spago lungo 2a legato ai due picchetti. Lo studente
   trascina il bastoncino tenendo lo spago teso: il bastoncino sta solo dove d₁ + d₂ = 2a (va nel
   punto della curva più vicino al dito) e dove passa pianta fiori. L'aiuola è finita quando i fiori
   fanno tutto il giro; cambiando spago o picchetti il solco si cancella.
   Obiettivo di ogni livello: sistemare picchetti e spago perché l'aiuola passi per le bandierine
   (o tocchi i lati di un recinto, o abbia l'eccentricità chiesta), e poi disegnarla tutta.
   Ultimo livello: il rocchetto doppio tiene costante d₁ − d₂, cioè l'iperbole.
   Schermata singola (27/9/2026): il prato riempie la scena e il viewBox si allarga con l'erba
   invece di lasciare bande vuote; in verticale le formule stanno in cima alla scena, in orizzontale
   nel pannello. Modalità libera: spago e picchetti liberi, ellisse o iperbole, nessun obiettivo.
   Contratto: SCHEMA-LAB.md — modelli: bilancia.js, canestro.js, regolo.js */
(function () {
  const STILE = `
    /* --- scena: il prato riempie tutto lo spazio; in verticale le formule stanno in cima, in orizzontale nel pannello --- */
    .lab-giardiniere .lab-scena { flex-direction: column; align-items: stretch; justify-content: flex-start; overflow: hidden; background: color-mix(in srgb, var(--s3) 22%, var(--sup)); }
    .lab-giardiniere .lab-scena > svg { flex: 1 1 0; min-height: 0; width: 100%; height: auto; cursor: grab; outline: none; touch-action: none; }
    .lab-giardiniere .lab-scena > svg.presa { cursor: grabbing; }
    .lab-giardiniere .lab-scena > svg:focus-visible { box-shadow: inset 0 0 0 3px var(--accento); }
    /* --- formule --- */
    .lab-giardiniere .gd-formula { flex: none; }
    .lab-giardiniere .gd-et { font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: var(--testo2); font-weight: 600; white-space: nowrap; }
    .lab-giardiniere .gd-tex { display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: 2px 16px; min-width: 0; font-size: clamp(1.1rem, 2.4cqmin, 1.3rem); }
    .lab-giardiniere .gd-tex .katex { white-space: nowrap; }
    .lab-giardiniere .gd-nota { font-size: .9rem; color: var(--no); }
    .lab-giardiniere .gd-r.ponte .gd-et { color: var(--ok); }
    .lab-giardiniere .gd-r.ponte .gd-tex { background: var(--ok-tenue); border-radius: 10px; padding: 2px 8px; animation: lab-gd-pop .5s var(--molla); }
    /* in cima alla scena: una fascia chiara, righe centrate */
    .lab-giardiniere .lab-scena > .gd-formula { display: grid; grid-template-columns: auto auto; justify-content: center; align-items: baseline; gap: 2px 12px; padding: clamp(6px, 1.2cqh, 12px) 12px; background: color-mix(in srgb, var(--sup) 88%, transparent); border-bottom: 1px solid var(--bordo); }
    .lab-giardiniere .lab-scena > .gd-formula .gd-r { display: grid; grid-template-columns: subgrid; grid-column: 1 / -1; align-items: baseline; }
    .lab-giardiniere .lab-scena > .gd-formula .gd-et { text-align: right; }
    /* sul telefono: niente etichette, le formule scorrono una dopo l'altra (la riga del bastoncino è già nel cartello del prato) */
    @container lab (max-width: 599px) {
      .lab-giardiniere .lab-scena > .gd-formula { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 1px 18px; padding: 5px 8px; }
      .lab-giardiniere .lab-scena > .gd-formula .gd-r, .lab-giardiniere .lab-scena > .gd-formula .gd-tex { display: contents; }
      .lab-giardiniere .lab-scena > .gd-formula .gd-et, .lab-giardiniere .lab-scena > .gd-formula .gd-r[data-r="bast"] { display: none; }
      .lab-giardiniere .lab-scena > .gd-formula .katex { font-size: 1.1rem; }
      .lab-giardiniere .lab-scena > .gd-formula .gd-r.ponte .katex { color: var(--ok); }
    }
    /* nel pannello (orizzontale): la carta con le righe, etichetta a sinistra */
    .lab-giardiniere .lab-lato > .gd-formula { display: flex; flex-direction: column; padding: 4px 12px; border-radius: 14px; background: var(--sup); border: 1px solid var(--bordo); }
    .lab-giardiniere .lab-lato .gd-r { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0 10px; padding: 4px 0; border-bottom: 1px dashed var(--bordo); }
    .lab-giardiniere .lab-lato .gd-r:last-child { border-bottom: 0; }
    .lab-giardiniere .lab-lato .gd-r .gd-et { min-width: 7.2em; }
    .lab-giardiniere .lab-lato .gd-tex { font-size: 1.1rem; gap: 2px 14px; }
    /* --- pannello --- */
    .lab-giardiniere .gd-obiettivo { font-size: clamp(.92rem, 2.1cqmin, 1.05rem); line-height: 1.45; text-align: center; color: var(--testo); }
    .lab-giardiniere .gd-obiettivo p { margin: 0; display: inline; }
    .lab-giardiniere .gd-obiettivo strong { color: var(--accento-testo); }
    .lab-giardiniere .gd-obiettivo .katex { font-size: 1.22em; }
    .lab-giardiniere .gd-obiettivo .c-breve { display: none; }
    /* consegna breve sul telefono e in orizzontale se lo spazio è basso; quella intera sta nel «?» */
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-giardiniere .gd-obiettivo .c-breve { display: inline; } .lab-giardiniere .gd-obiettivo .c-breve + .c-lungo { display: none; } }
    @container lab (min-aspect-ratio: 5 / 4) and (max-height: 900px) { .lab-giardiniere .gd-obiettivo .c-breve { display: inline; } .lab-giardiniere .gd-obiettivo .c-breve + .c-lungo { display: none; } }
    .lab-giardiniere .lab-aiuto .consegna { color: var(--testo2); margin-bottom: 10px; }
    .lab-giardiniere .lab-aiuto .consegna p, .lab-giardiniere .lab-aiuto .testo-aiuto p { margin: 0 0 8px; }
    .lab-giardiniere .lab-aiuto .katex { font-size: 1.1em; }
    .lab-giardiniere .gd-comandi { display: flex; flex-direction: column; gap: 2px; }
    .lab-giardiniere .gd-riga { display: grid; grid-template-columns: 7.6em 40px minmax(0, 1fr) 40px; align-items: center; gap: 6px; }
    .lab-giardiniere .gd-nome { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
    .lab-giardiniere .gd-val { font: 700 1.02rem var(--font); font-variant-numeric: tabular-nums; white-space: nowrap; color: var(--testo); }
    .lab-giardiniere .gd-riga[data-q="C"] .gd-val { color: var(--accento-testo); }
    .lab-giardiniere .gd-riga .btn { min-height: 40px; min-width: 40px; width: 40px; padding: 0; font-size: 1.3rem; line-height: 1; border-radius: 12px; }
    .lab-giardiniere .gd-riga input[type=range] { width: 100%; min-width: 0; height: 40px; margin: 0; accent-color: var(--accento); cursor: pointer; }
    .lab-giardiniere .gd-riga.bloccata .gd-val { color: var(--testo2); }
    .lab-giardiniere .gd-riga.bloccata input, .lab-giardiniere .gd-riga.bloccata .btn { opacity: .3; }
    .lab-giardiniere .btn[disabled] { opacity: .38; cursor: default; }
    .lab-giardiniere input[disabled] { cursor: default; }
    .lab-giardiniere .lab-messaggio { padding: 0 4px; min-height: 0; font-size: clamp(.88rem, 2cqmin, 1.02rem); text-align: center; line-height: 1.45; }
    .lab-giardiniere .lab-messaggio:empty { display: none; }
    .lab-giardiniere .lab-messaggio .katex { font-size: 1.2em; }
    .lab-giardiniere .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; }
    .lab-giardiniere .lab-barra .btn { min-height: 40px; }
    .lab-giardiniere .lab-parametri { grid-template-columns: 1fr; max-width: 460px; }
    .lab-giardiniere .lab-param.modo { gap: 6px; }
    .lab-giardiniere .lab-param.modo .btn { font-size: 1rem; padding: 0 16px; }
    .lab-giardiniere .lab-param.modo .btn[aria-pressed="true"] { background: var(--accento); border-color: var(--accento); color: #fff; }
    .lab-giardiniere .vinto { display: inline-block; animation: lab-gd-pop .45s var(--molla); }
    .lab-giardiniere .fiore { transform-box: fill-box; transform-origin: 50% 50%; }
    .lab-giardiniere .fiore.nuovo { animation: lab-gd-sboccia .42s var(--molla) both; }
    .lab-giardiniere .fiore.festa { animation: lab-gd-danza .6s var(--molla) both; }
    .lab-giardiniere .alone.invita { animation: lab-gd-invito 1.6s ease-in-out infinite; }
    .lab-giardiniere .bandiera .drappo, .lab-giardiniere .bandiera .base { transition: fill .25s; }
    .lab-giardiniere .gd-lato { transition: stroke .25s; }
    @keyframes lab-gd-sboccia { from { transform: scale(0) rotate(-70deg); } to { transform: none; } }
    @keyframes lab-gd-danza { 0% { transform: none } 45% { transform: scale(1.55) rotate(50deg) } 100% { transform: none } }
    @keyframes lab-gd-invito { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
    @keyframes lab-gd-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
  `;

  /* ---------------- misure del prato ----------------
     1 m = 40 unità del viewBox; x va da −7,5 a 7,5 m, y da −6,5 a 6,5 m. */
  const U = 40, W = 600, H = 520, OX = W / 2, OY = H / 2;
  const X = x => OX + U * x, Y = y => OY - U * y;
  const TOL = 0.05;      /* di quanto (in metri) l'aiuola può mancare una bandierina o un lato del recinto */
  const NE = 72;         /* spicchi dell'ellisse (5° di parametro l'uno): l'aiuola è finita quando sono tutti fioriti */
  const NI = 28;         /* spicchi di ciascun ramo dell'iperbole */
  const YI = 3.5, XI = 7.2;                 /* l'iperbole si disegna fra y = −3,5 e 3,5, e dentro il prato */
  const C_MAX = 75, A_MIN = 5, A_MAX = 70;  /* in decimi di metro: c fino a 7,5 m, a da 0,5 a 7 m */
  const DUE_PI = Math.PI * 2;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, t) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const morsa = (v, a, b) => Math.max(a, Math.min(b, v));
  const norm = t => ((t % DUE_PI) + DUE_PI) % DUE_PI;

  /* numeri all'italiana: fino a dec decimali, senza zeri inutili */
  const numero = (v, dec) => { const p = Math.pow(10, dec == null ? 2 : dec); const s = String(Math.round(v * p) / p); return (s === '-0' ? '0' : s).replace('.', ','); };
  const nTex = (v, dec) => numero(v, dec).replace(',', '{,}');
  const nTxt = (v, dec) => numero(v, dec).replace('-', '−');
  const tondo1 = v => Math.round(v * 10) / 10;
  const fisso1 = v => tondo1(v).toFixed(1).replace('.', ',').replace('-', '−');
  const fisso1Tex = v => tondo1(v).toFixed(1).replace('.', '{,}');

  /* ---------------- livelli ----------------
     A, C: spago e picchetti di partenza, in decimi di metro (A = 10·a, C = 10·c).
     fissiA / fissiC: spago o picchetti bloccati. meta: che cosa deve fare l'aiuola. */
  const LIVELLI = [
    { modo: 'ell', A: 50, C: 30, fissiA: true, fissiC: true, meta: { tipo: 'giro' },
      testo: 'Picchetti e spago sono già sistemati: lo spago è lungo $10$ m. **Trascina il bastoncino** tenendo lo spago teso e fai tutto il giro: dove passi pianti i fiori. Intanto guarda le due parti dello spago, $d_1$ e $d_2$.',
      aiuto: 'Appoggia il dito sul bastoncino (il pallino con l\'alone, a destra) e gira intorno ai picchetti senza staccarlo. Il bastoncino non va dove vuoi tu: resta dove lo spago è teso, e da lì segue il dito. L\'aiuola è finita quando i fiori fanno tutto il giro.',
      fatto: 'Aiuola finita. $d_1$ e $d_2$ sono cambiati a ogni passo, la somma è rimasta $10$ m.',
      ponte: ['d_1 + d_2 = 2a = 10'],
      vittoria: 'd₁ e d₂ sono cambiati a ogni passo, ma la loro somma è rimasta 10 m: è la lunghezza dello spago. Ogni punto dell\'aiuola ha d₁ + d₂ = 2a.' },
    { modo: 'ell', A: 40, C: 30, fissiA: true, meta: { tipo: 'bandiere', punti: [[4, 0], [-4, 0], [0, 4], [0, -4]], cerchio: true },
      testo: 'Lo spago è di $8$ m. Il committente vuole un\'aiuola **rotonda**, che passi per le quattro bandierine, tutte a $4$ m dal centro. Sposta i picchetti (trascinali, oppure usa $-$ e $+$) e poi disegnala.',
      aiuto: 'Prova a disegnare l\'aiuola così com\'è e guarda dove passa rispetto alle bandierine in alto e in basso. Poi cambia la distanza fra i picchetti e ridisegna: quando l\'aiuola si allarga e quando si stringe?',
      fatto: 'Aiuola rotonda: i picchetti sono uniti, $c = 0$.',
      ponte: ['c = 0 \\;\\Rightarrow\\; b = a = 4', 'x^2 + y^2 = 16'],
      vittoria: 'Con i picchetti uniti c = 0: lo spago fa da raggio, lungo 4 m, e b = a. La circonferenza è un\'ellisse con i due fuochi nello stesso punto.' },
    { modo: 'ell', A: 40, C: 20, meta: { tipo: 'bandiere', punti: [[5, 0], [-5, 0], [0, 3], [0, -3]] },
      testo: 'Le bandierine sono in $(\\pm 5;\\,0)$ e $(0;\\,\\pm 3)$. Scegli tu la lunghezza dello spago e il posto dei picchetti, poi disegna l\'aiuola.',
      aiuto: 'Pensa al bastoncino sulla bandierina (5; 0): quanto è lungo lo spago in tutto, d₁ + d₂? Poi pensalo sulla bandierina (0; 3): lì è alla stessa distanza dai due picchetti, quindi ogni parte dello spago è lunga metà spago. Quella parte è l\'ipotenusa di un triangolo rettangolo: un cateto è alto 3, l\'altro va dal centro al picchetto.',
      fatto: 'L\'aiuola passa per tutte e quattro le bandierine.',
      ponte: ['a^2 = b^2 + c^2', '25 = 9 + 16'],
      vittoria: 'Spago di 10 m e picchetti a 4 m dal centro. Sulla bandierina (0; 3) ogni parte dello spago è lunga 5: è l\'ipotenusa di un triangolo con cateti 3 e 4. Da qui viene b² = a² − c².' },
    { modo: 'ell', A: 45, C: 20, meta: { tipo: 'recinto', rx: 6.5, ry: 2.5 },
      testo: 'L\'aiuola deve stare dentro un recinto di $13$ m per $5$ m e **toccarne tutti e quattro i lati**, senza uscirne. Scegli spago e picchetti.',
      aiuto: 'Il bastoncino tocca un lato corto quando è sull\'asse x: lì quanto è lungo lo spago in tutto? I lati lunghi ti dicono b. I picchetti non vanno sul recinto, stanno dentro l\'aiuola: la loro distanza dal centro si trova con lo stesso triangolo del livello 3.',
      fatto: 'L\'aiuola tocca i quattro lati del recinto senza uscirne.',
      ponte: ['c^2 = a^2 - b^2 = 42{,}25 - 6{,}25 = 36', 'c = 6'],
      vittoria: 'a = 6,5 e b = 2,5, quindi c² = 42,25 − 6,25 = 36 e c = 6. L\'aiuola è molto allungata, e i picchetti stanno vicino alle punte.' },
    { modo: 'ell', A: 60, C: 20, fissiA: true, nascondiE: true, meta: { tipo: 'ecc', e: 0.8, C: 48 },
      testo: 'Lo spago è di $12$ m. Il committente vuole un\'aiuola **schiacciata**, con eccentricità $e = 0{,}8$. Dove pianti i picchetti? Il valore di $e$ compare nella formula solo quando l\'aiuola è finita.',
      aiuto: 'L\'eccentricità è un rapporto fra due lunghezze: e = c/a, dove c è la distanza di un picchetto dal centro (metà della distanza fra i picchetti) e a è metà dello spago. Con lo spago fisso, più allontani i picchetti più l\'aiuola si schiaccia.',
      fatto: 'Eccentricità $0{,}8$, come voleva il committente.',
      ponte: ['c = e \\cdot a = 0{,}8 \\cdot 6 = 4{,}8', 'b = \\sqrt{36 - 23{,}04} = 3{,}6'],
      vittoria: 'c = 0,8 · 6 = 4,8, quindi i picchetti stanno a 9,6 m l\'uno dall\'altro. Resta b = 3,6: l\'aiuola è lunga 12 m e larga 7,2.' },
    { modo: 'ip', A: 20, C: 30, rettangolo: [4, 3], meta: { tipo: 'bandiere', punti: [[4, 0], [-4, 0], [5, 2.25], [-5, -2.25]] },
      testo: 'Sfida finale, con un attrezzo nuovo: il **rocchetto doppio**. Srotola i due spaghi insieme, così uno resta sempre $2a$ più lungo dell\'altro: adesso è costante la **differenza** $d_1 - d_2$. Fai passare la curva per le quattro bandierine. Le diagonali del rettangolo tratteggiato, $8$ m per $6$ m, sono le rette a cui la curva si avvicina (gli asintoti).',
      aiuto: 'Sulle bandierine (±4; 0), le più vicine al centro, la differenza fra i due spaghi ti dice 2a. Qui i picchetti stanno fuori dal rettangolo, oltre quelle bandierine, quindi c è più grande di a. Il rettangolo è alto 2b: a, b e c formano ancora un triangolo rettangolo, e ti conviene chiederti quale dei tre è il lato più lungo.',
      fatto: 'La curva passa per tutte e quattro le bandierine.',
      ponte: ['|d_1 - d_2| = 2a = 8', 'c^2 = a^2 + b^2 = 16 + 9 = 25'],
      vittoria: 'Rocchetto di 8 m e picchetti a 5 m dal centro: nell\'iperbole c² = a² + b² = 16 + 9. Su un ramo resta costante d₁ − d₂, sull\'altro d₂ − d₁: tutti e due valgono 8.' }
  ];

  /* consegne brevi per il pannello quando lo spazio è poco: quella intera si legge nel «?» */
  const BREVI = [
    'Trascina il **bastoncino** con lo spago teso e fai tutto il giro. Guarda $d_1$ e $d_2$.',
    'Spago di $8$ m: fai un\'aiuola **rotonda** che passi per le quattro bandierine.',
    'Scegli spago e picchetti: l\'aiuola deve passare per le quattro bandierine.',
    'L\'aiuola deve **toccare i quattro lati** del recinto, senza uscirne.',
    'Spago di $12$ m: dove vanno i picchetti per avere $e = 0{,}8$?',
    'Col **rocchetto doppio** resta costante $d_1 - d_2$. Passa per le quattro bandierine.'
  ];
  /* la modalità libera: nessun obiettivo, spago e picchetti liberi */
  const TESTO_LIBERO = 'Scegli tu spago e picchetti, **ellisse** o **iperbole**, e disegna la curva.';
  const AIUTO_LIBERO = 'In modalità libera non c\'è niente da indovinare. Cambia spago e picchetti con $-$ e $+$ (o trascinando un picchetto), scegli **ellisse** (lo spago: $d_1 + d_2 = 2a$) o **iperbole** (il rocchetto doppio: $|d_1 - d_2| = 2a$), poi trascina il bastoncino. Le formule si aggiornano mentre cambi: guarda come cambia l\'eccentricità $e = c/a$. «Casuale» propone una curva a caso.';

  const PETALI = ['var(--a5)', 'var(--a4)', 'var(--a1)', 'var(--a6)'];

  COMPASSO.registraLab({
    id: 'giardiniere',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-giardiniere')) { const s = document.createElement('style'); s.id = 'stile-lab-giardiniere'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-giardiniere');
      const riga = (q, nome, meno, piu, min, max) => `
              <div class="gd-riga" data-q="${q}">
                <div class="gd-nome"><span class="gd-et">${nome}</span><span class="gd-val"></span></div>
                <button type="button" class="btn gd-meno" aria-label="${meno}">−</button>
                <input type="range" min="${min}" max="${max}" step="1" aria-label="${nome}">
                <button type="button" class="btn gd-piu" aria-label="${piu}">+</button>
              </div>`;
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="gd-formula"></div>
            <div class="lab-aiuto" hidden data-scorre><div class="consegna" hidden></div><div class="testo-aiuto"></div><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: spago e picchetti liberi, nessun obiettivo">Libero</button></div>
            <div class="gd-obiettivo"></div>
            <div class="lab-parametri" hidden>
              <div class="lab-param modo" role="group" aria-label="Che curva"><button type="button" class="btn piccolo" data-modo="ell" aria-pressed="true">Ellisse</button><button type="button" class="btn piccolo" data-modo="ip" aria-pressed="false">Iperbole</button></div>
            </div>
            <div class="gd-comandi">
              ${riga('C', 'picchetti', 'Avvicina i picchetti', 'Allontana i picchetti', 0, C_MAX)}
              ${riga('A', 'spago', 'Accorcia lo spago', 'Allunga lo spago', A_MIN, A_MAX)}
            </div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <button type="button" class="btn piccolo b-ric">Ricomincia</button>
              <button type="button" class="btn piccolo b-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo b-aiuto" title="Come si fa" aria-label="Come si fa">?</button>
            </div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), lato = q('.lab-lato'), objEl = q('.gd-obiettivo'), aiutoEl = q('.lab-aiuto'), formEl = q('.gd-formula'), msg = q('.lab-messaggio');
      const livelliEl = q('.lab-livelli'), bAiuto = q('.b-aiuto'), bRic = q('.b-ric'), bLibero = q('.lab-libero'), bCasuale = q('.b-casuale');
      const parametriEl = q('.lab-parametri'), barra = q('.lab-barra');
      const rigaC = q('.gd-riga[data-q="C"]'), rigaA = q('.gd-riga[data-q="A"]');
      const scuro = ctx.tema() === 'scuro';

      /* timer e animazioni: tutti registrati, così smonta li ferma */
      const timers = new Set();
      const dopo = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
      const annulla = t => { if (t) { clearTimeout(t); timers.delete(t); } };

      /* ================= la scena: il prato visto dall'alto ================= */
      /* il prato "vero" è W × H attorno a (OX; OY); il viewBox (vb) ne mostra almeno x ±7,5 e y ±6 m,
         e si allarga con altra erba nella direzione in cui la scena ha spazio */
      let vb = { x0: 0, y0: 0, w: W, h: H, x1: W, y1: H };
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMidYMid meet', role: 'img', tabindex: '0',
        'aria-label': 'Il prato visto dall\'alto. Trascina il bastoncino per disegnare l\'aiuola, o un picchetto per spostarlo. Con le frecce il bastoncino avanza lungo l\'aiuola.' });
      scena.insertBefore(svg, aiutoEl);
      const defs = el('defs'); svg.appendChild(defs);
      const ombra = el('filter', { id: 'gd-ombra', x: '-60%', y: '-60%', width: '220%', height: '220%' });
      ombra.appendChild(el('feDropShadow', { dx: 0, dy: 2, stdDeviation: 1.8, 'flood-color': '#000', 'flood-opacity': scuro ? .5 : .24 }));
      defs.appendChild(ombra);
      /* lo spago può essere tutto orizzontale (riquadro alto zero): la sua ombra ha una regione fissa, grande quanto il prato visibile */
      const ombraSpago = el('filter', { id: 'gd-ombra-spago', filterUnits: 'userSpaceOnUse', x: -40, y: -40, width: W + 80, height: H + 80 });
      ombraSpago.appendChild(el('feDropShadow', { dx: 0, dy: 2, stdDeviation: 1.6, 'flood-color': '#000', 'flood-opacity': scuro ? .5 : .22 }));
      defs.appendChild(ombraSpago);
      const mondo = el('g'); svg.appendChild(mondo);
      const g = nome => { const x = el('g', { class: nome }); mondo.appendChild(x); return x; };

      /* prato a strisce di tosatura, ciuffi d'erba, griglia in metri: si ridisegnano quando cambia il viewBox */
      const gFondo = g('gd-fondo');
      const gGriglia = g('gd-griglia');
      function disegnaFondo() {
        vuota(gFondo); vuota(gGriglia);
        const { x0, y0, x1, y1, w, h } = vb;
        gFondo.appendChild(el('rect', { x: x0, y: y0, width: w, height: h, style: `fill: color-mix(in srgb, var(--s3) ${scuro ? 16 : 22}%, var(--sup))` }));
        const striscia = `fill: color-mix(in srgb, var(--s3) ${scuro ? 24 : 32}%, var(--sup))`;
        for (let i = Math.floor((x0 - OX) / U / 2) * 2; X(i) - 20 < x1; i += 2) {
          const sx0 = Math.max(x0, X(i) - 20), sx1 = Math.min(x1, X(i) + 20);
          if (sx1 > sx0) gFondo.appendChild(el('rect', { x: sx0, y: y0, width: sx1 - sx0, height: h, style: striscia, opacity: .38 }));
        }
        let seme = 11;
        const caso = () => { seme = (seme * 16807) % 2147483647; return seme / 2147483647; };
        let dErba = '';
        const nErba = Math.round(110 * w * h / (W * H));
        for (let i = 0; i < nErba; i++) {
          const x = (x0 + 4 + caso() * (w - 9)).toFixed(1), y = (y0 + 8 + caso() * (h - 8)).toFixed(1);   /* i ciuffi restano dentro il prato */
          dErba += `M${x} ${y} l-3 -6 M${x} ${y} l1 -7 M${x} ${y} l4 -5 `;
        }
        gFondo.appendChild(el('path', { d: dErba, fill: 'none', style: 'stroke: color-mix(in srgb, var(--s3) 65%, var(--testo))', 'stroke-width': 1.4, 'stroke-linecap': 'round', opacity: scuro ? .3 : .28 }));
        /* griglia: una riga ogni metro, gli assi tratteggiati, i numeri sui bordi visibili */
        const mx0 = Math.ceil((x0 - OX) / U), mx1 = Math.floor((x1 - OX) / U), my0 = Math.ceil((OY - y1) / U), my1 = Math.floor((OY - y0) / U);
        for (let x = mx0; x <= mx1; x++) gGriglia.appendChild(el('line', { x1: X(x), y1: y0, x2: X(x), y2: y1, stroke: 'var(--testo)', 'stroke-width': x ? 1 : 1.5, opacity: x ? (scuro ? .07 : .09) : .24, 'stroke-dasharray': x ? null : '8 6' }));
        for (let y = my0; y <= my1; y++) gGriglia.appendChild(el('line', { x1: x0, y1: Y(y), x2: x1, y2: Y(y), stroke: 'var(--testo)', 'stroke-width': y ? 1 : 1.5, opacity: y ? (scuro ? .07 : .09) : .24, 'stroke-dasharray': y ? null : '8 6' }));
        const numGriglia = (x, y, t, anc) => gGriglia.appendChild(el('text', { x, y, 'text-anchor': anc || 'middle', fill: 'var(--testo2)', stroke: 'var(--sup)', 'stroke-width': 3, 'paint-order': 'stroke', opacity: .85, style: 'font: 500 16px var(--font)' }, t));
        const xMax = Math.floor(((x1 - OX) / U - .4) / 2) * 2, yMax = Math.floor(((OY - y0) / U - .4) / 2) * 2;
        for (let x = -xMax; x <= xMax; x += 2) if (x) numGriglia(X(x), y1 - 9, x === xMax ? nTxt(x) + ' m' : nTxt(x));
        for (let y = -yMax; y <= yMax; y += 2) if (y) numGriglia(x0 + 9, Y(y) + 5, nTxt(y), 'start');
        numGriglia(X(0) - 8, Y(0) + 19, 'O', 'end');
        ombraSpago.setAttribute('x', (x0 - 40).toFixed(0)); ombraSpago.setAttribute('y', (y0 - 40).toFixed(0));
        ombraSpago.setAttribute('width', (w + 80).toFixed(0)); ombraSpago.setAttribute('height', (h + 80).toFixed(0));
      }

      const gSotto = g('gd-sotto');           /* recinto, rettangolo, sagoma: cambiano col livello */
      const gSvanisce = g('gd-svanisce');     /* il solco vecchio che si dissolve */
      const gSolco = g('gd-solco');
      const solcoBase = el('path', { d: '', fill: 'none', style: 'stroke: color-mix(in srgb, var(--s2) 28%, #6b4526)', 'stroke-width': 17, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: scuro ? .8 : .72 });
      const solcoGrana = el('path', { d: '', fill: 'none', style: 'stroke: color-mix(in srgb, var(--s2) 18%, #3a2413)', 'stroke-width': 5, 'stroke-dasharray': '0.1 9', 'stroke-linecap': 'round', opacity: .55 });
      gSolco.appendChild(solcoBase); gSolco.appendChild(solcoGrana);
      const gFiori = g('gd-fiori');
      const gGap = g('gd-gap');
      const gBandiere = g('gd-bandiere');

      /* lo spago: due pezzi colorati, e il pezzo che manca quando lo spago è corto */
      const gSpago = g('gd-spago');
      gSpago.setAttribute('filter', 'url(#gd-ombra-spago)');
      const filo1 = el('line', { stroke: 'var(--s1)', 'stroke-width': 4, 'stroke-linecap': 'round' });
      const filo2 = el('line', { stroke: 'var(--s2)', 'stroke-width': 4, 'stroke-linecap': 'round' });
      gSpago.appendChild(filo1); gSpago.appendChild(filo2);
      const gManca = g('gd-manca');
      const mancaLinea = el('line', { stroke: 'var(--no)', 'stroke-width': 3, 'stroke-dasharray': '6 6', 'stroke-linecap': 'round' });
      const mancaTesto = el('text', { 'text-anchor': 'middle', fill: 'var(--no)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 700 17px var(--font)' });
      const capo = el('circle', { r: 5, fill: 'var(--s1)', stroke: 'var(--sup)', 'stroke-width': 2 });
      gManca.appendChild(mancaLinea); gManca.appendChild(mancaTesto); gManca.appendChild(capo);

      /* i picchetti, visti dall'alto */
      const gPicchetti = g('gd-picchetti');
      function picchetto(col, nome) {
        const p = el('g');
        p.appendChild(el('circle', { r: 38, fill: 'transparent' }));
        p.appendChild(el('circle', { r: 13, fill: 'var(--sup)', stroke: col, 'stroke-width': 4.5, filter: 'url(#gd-ombra)' }));
        p.appendChild(el('circle', { r: 4.5, fill: col }));
        const t = el('text', { x: 0, y: 36, 'text-anchor': 'middle', fill: col, stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 700 19px var(--font)' }, nome);
        p.appendChild(t);
        gPicchetti.appendChild(p);
        return { g: p, t };
      }
      const F1 = picchetto('var(--s1)', 'F₁'), F2 = picchetto('var(--s2)', 'F₂');

      /* il bastoncino: alone che invita a trascinarlo; col rocchetto doppio ha un anello in più */
      const gBastone = g('gd-bastone');
      const bastone = el('g');
      bastone.appendChild(el('circle', { r: 40, fill: 'transparent' }));
      const alone = el('circle', { r: 25, class: 'alone invita', fill: 'var(--accento)', 'fill-opacity': .14, stroke: 'var(--accento)', 'stroke-width': 2, 'stroke-dasharray': '5 5' });
      bastone.appendChild(alone);
      const rocchetto = el('circle', { r: 16, fill: 'var(--sup)', stroke: 'var(--testo2)', 'stroke-width': 3, 'stroke-dasharray': '4 3' });
      bastone.appendChild(rocchetto);
      bastone.appendChild(el('circle', { r: 10, style: 'fill: color-mix(in srgb, var(--s2) 45%, #5a3a20)', stroke: 'var(--sup)', 'stroke-width': 2.5, filter: 'url(#gd-ombra)' }));
      bastone.appendChild(el('circle', { cx: -3, cy: -3, r: 3, fill: '#fff', opacity: .45 }));
      gBastone.appendChild(bastone);

      /* cartellini con d₁ e d₂ a metà dei due pezzi di spago */
      const gEtichette = g('gd-etichette');
      function cartellino(col) {
        const c = el('g', { 'pointer-events': 'none' });
        const r = el('rect', { y: -14, height: 28, rx: 14, fill: col, stroke: 'var(--sup)', 'stroke-width': 1.5 });
        const t = el('text', { y: 6, 'text-anchor': 'middle', fill: '#fff', style: 'font: 700 17px var(--font); font-variant-numeric: tabular-nums' });
        c.appendChild(r); c.appendChild(t); gEtichette.appendChild(c);
        return { g: c, r, t };
      }
      const et1 = cartellino('var(--s1)'), et2 = cartellino('var(--s2)');
      function posaCartellino(c, testo, x, y) {
        c.t.textContent = testo;
        const w = testo.length * 9.4 + 18;
        c.r.setAttribute('x', (-w / 2).toFixed(1)); c.r.setAttribute('width', w.toFixed(1));
        c.g.setAttribute('transform', `translate(${morsa(x, vb.x0 + w / 2 + 4, vb.x1 - w / 2 - 4).toFixed(1)} ${morsa(y, vb.y0 + 18, vb.y1 - 18).toFixed(1)})`);
        c.g.style.display = '';
      }

      /* cartello in alto a sinistra: la somma (o la differenza) e i fiori piantati */
      const gCart = g('gd-cartello');
      const cartR = el('rect', { x: 10, y: 10, height: 60, rx: 14, fill: 'var(--sup)', opacity: .94, stroke: 'var(--bordo2)', 'stroke-width': 1 });
      const cart1 = el('text', { x: 24, y: 36, fill: 'var(--testo)', style: 'font: 700 20px var(--font); font-variant-numeric: tabular-nums' });
      const cart2 = el('text', { x: 24, y: 59, fill: 'var(--testo2)', style: 'font: 500 16px var(--font); font-variant-numeric: tabular-nums' });
      gCart.appendChild(cartR); gCart.appendChild(cart1); gCart.appendChild(cart2);
      function scriviCartello(pezzi, sotto) {
        vuota(cart1);
        let n = 0;
        pezzi.forEach(([t, col]) => { cart1.appendChild(el('tspan', col ? { fill: col } : {}, t)); n += t.length; });
        cart2.textContent = sotto;
        cartR.setAttribute('width', Math.max(n * 10.9, sotto.length * 8.6) + 30);
      }

      /* avviso in basso, quando spago e picchetti non disegnano niente */
      const gAvv = g('gd-avviso');
      const avvR = el('rect', { rx: 14, fill: 'var(--no-tenue)', stroke: 'var(--no)', 'stroke-width': 1.5, opacity: .96 });
      gAvv.appendChild(avvR);
      const avvT = [0, 1].map(() => { const t = el('text', { x: W / 2, 'text-anchor': 'middle', fill: 'var(--no)', style: 'font: 600 16px var(--font)' }); gAvv.appendChild(t); return t; });
      let avvisoOra = '';
      function avvisoScena(righe) {
        const chiave = righe ? righe.join('|') : '';
        if (chiave === avvisoOra) return;
        avvisoOra = chiave;
        if (!righe) { gAvv.style.display = 'none'; return; }
        gAvv.style.display = '';
        const y0 = H - 34 - righe.length * 21;
        avvT.forEach((t, i) => { t.textContent = righe[i] || ''; t.setAttribute('y', y0 + 18 + i * 21); });
        const w = Math.max(...righe.map(r => r.length)) * 8.4 + 30;
        avvR.setAttribute('x', W / 2 - w / 2); avvR.setAttribute('width', w);
        avvR.setAttribute('y', y0); avvR.setAttribute('height', righe.length * 21 + 12);
      }

      const gFx = g('gd-fx');
      /* cartello in alto a sinistra e avviso in basso seguono i bordi del prato visibile */
      function posaCornici() {
        gCart.setAttribute('transform', `translate(${vb.x0.toFixed(1)} ${vb.y0.toFixed(1)})`);
        gAvv.setAttribute('transform', `translate(0 ${(vb.y1 - H).toFixed(1)})`);
      }

      /* ================= stato ================= */
      const completati = ctx.stato().livelli;
      let livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      let A = 50, C = 30;                   /* valori veri, in decimi di metro */
      let vis = { a: 5, c: 3 };             /* valori disegnati (durante le transizioni inseguono A e C) */
      let par = { t: 0, s: 1, y: 0 };       /* dove sta il bastoncino: t sull'ellisse; ramo s e quota y sull'iperbole */
      let segni = new Uint8Array(NE), nSegni = 0, fiori = [];
      let completo = false, vinto = false, presa = null;
      let bandiere = [], lati = [];
      let rafTw = 0, timerTw = 0, rafFx = 0, effetti = [], timerZen = 0, timerFesta = 0;
      const detti = new Set();
      let libero = false, salvato = null;   /* modalità libera, e il livello da cui ci si è entrati */
      const LIBERO = { modo: 'ell', A: 50, C: 30, meta: { tipo: 'libero' }, testo: TESTO_LIBERO, aiuto: AIUTO_LIBERO, ponte: [] };
      const L = () => libero ? LIBERO : LIVELLI[livello];
      const ip = () => L().modo === 'ip';
      const nBin = () => ip() ? 2 * NI : NE;

      /* ================= geometria ================= */
      /* che cosa disegnano spago e picchetti: ellisse, segmento, niente (spago corto), iperbole */
      function forma(a, c) {
        if (!ip()) {
          if (a > c + 1e-9) return { tipo: 'ell', a, c, b: Math.sqrt(a * a - c * c) };
          if (a > c - 1e-9) return { tipo: 'seg', a, c, b: 0 };
          return { tipo: 'corto', a, c };
        }
        if (c > a + 1e-9) { const b = Math.sqrt(c * c - a * a); return { tipo: 'ip', a, c, b, ym: Math.min(YI, b * Math.sqrt(Math.max(0, (XI / a) * (XI / a) - 1))) }; }
        return { tipo: 'nulla', a, c };
      }
      const esatta = () => forma(A / 10, C / 10);
      const attuale = () => forma(vis.a, vis.c);
      const disegnabile = f => f.tipo === 'ell' || f.tipo === 'seg' || f.tipo === 'ip';
      function punto(f, p) {
        if (f.tipo === 'ell' || f.tipo === 'seg') return [f.a * Math.cos(p.t), f.b * Math.sin(p.t)];
        if (f.tipo === 'ip') { const y = morsa(p.y, -f.ym, f.ym); return [p.s * f.a * Math.sqrt(1 + y * y / (f.b * f.b)), y]; }
        return null;
      }
      /* il punto della curva più vicino a (mx; my): campioni fitti, poi ricerca ternaria attorno al migliore */
      function vicino(f, mx, my) {
        const d2 = p => { const v = punto(f, p); return (v[0] - mx) * (v[0] - mx) + (v[1] - my) * (v[1] - my); };
        const affina = (lo, hi, fa) => { for (let k = 0; k < 32; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (d2(fa(m1)) < d2(fa(m2))) hi = m2; else lo = m1; } return (lo + hi) / 2; };
        if (f.tipo === 'ell' || f.tipo === 'seg') {
          const N = 180; let bt = 0, bd = Infinity;
          for (let i = 0; i < N; i++) { const t = i / N * DUE_PI, d = d2({ t }); if (d < bd) { bd = d; bt = t; } }
          return { t: norm(affina(bt - DUE_PI / N, bt + DUE_PI / N, t => ({ t }))), s: 1, y: 0 };
        }
        if (f.tipo === 'ip') {
          const s = mx > 1e-9 ? 1 : mx < -1e-9 ? -1 : par.s, N = 140, h = 2 * f.ym / N;
          let by = 0, bd = Infinity;
          for (let i = 0; i <= N; i++) { const y = -f.ym + h * i, d = d2({ s, y }); if (d < bd) { bd = d; by = y; } }
          return { t: 0, s, y: affina(Math.max(-f.ym, by - h), Math.min(f.ym, by + h), y => ({ s, y })) };
        }
        return null;
      }
      /* spicchi: l'ellisse in 72 archi uguali di parametro; l'iperbole in 28 fasce di quota per ramo */
      function bin(f, p) {
        if (f.tipo === 'ip') { const u = (morsa(p.y, -f.ym, f.ym) + f.ym) / (2 * f.ym); return (p.s > 0 ? NI : 0) + Math.min(NI - 1, Math.floor(u * NI)); }
        return Math.floor(norm(p.t) / DUE_PI * NE) % NE;
      }
      function inBin(f, i, u) {
        if (f.tipo === 'ip') return { t: 0, s: i >= NI ? 1 : -1, y: -f.ym + ((i % NI) + u) / NI * 2 * f.ym };
        return { t: (i + u) / NE * DUE_PI, s: 1, y: 0 };
      }

      /* ================= effetti (un solo rAF) ================= */
      function tick(t) {
        effetti = effetti.filter(e => {
          const u = (t - e.t0) / e.dur;
          if (u < 0) return true;
          e.draw(Math.min(1, u));
          if (u >= 1) { if (e.fine) e.fine(); return false; }
          return true;
        });
        rafFx = effetti.length ? requestAnimationFrame(tick) : 0;
      }
      function effetto(e) { e.t0 = e.t0 || performance.now(); effetti.push(e); if (!rafFx) rafFx = requestAnimationFrame(tick); }
      function impulso(cx, cy, colore, rMax) {
        const c = el('circle', { cx, cy, r: 6, fill: 'none', stroke: colore, 'stroke-width': 3 }); gFx.appendChild(c);
        effetto({ dur: 600, draw: u => { c.setAttribute('r', 6 + (rMax - 6) * (1 - (1 - u) * (1 - u))); c.setAttribute('opacity', .95 * (1 - u)); }, fine: () => c.remove() });
        dopo(() => c.remove(), 900);
      }

      /* ================= fiori e solco ================= */
      function pianta(f, i) {
        const v = punto(f, inBin(f, i, .5));
        const fuori = el('g', { transform: `translate(${X(v[0]).toFixed(1)} ${Y(v[1]).toFixed(1)})` });
        const fiore = el('g', { class: 'fiore nuovo' });
        const col = PETALI[i % 4], r = i % 2 ? 3.9 : 4.7, R = r * 1.25;
        for (let k = 0; k < 5; k++) { const an = k / 5 * DUE_PI + i * .7; fiore.appendChild(el('circle', { cx: (Math.cos(an) * R).toFixed(1), cy: (Math.sin(an) * R).toFixed(1), r, fill: col })); }
        fiore.appendChild(el('circle', { r: r * .72, fill: 'var(--avviso)', stroke: 'var(--sup)', 'stroke-width': .8 }));
        fuori.appendChild(fiore); gFiori.appendChild(fuori);
        fiori[i] = fiore;
      }
      function disegnaSolco(f) {
        const n = nBin();
        const tratto = (i0, len) => {
          let s = '';
          for (let k = 0; k < len; k++) {
            const i = (i0 + k) % n;
            for (let j = 0; j < 4; j++) { const v = punto(f, inBin(f, i, j / 4)); s += (s ? 'L' : 'M') + X(v[0]).toFixed(1) + ' ' + Y(v[1]).toFixed(1) + ' '; }
          }
          const v = punto(f, inBin(f, (i0 + len - 1) % n, 1));
          return s + 'L' + X(v[0]).toFixed(1) + ' ' + Y(v[1]).toFixed(1) + ' ';
        };
        let d = '';
        if (f.tipo === 'ell') {
          if (nSegni >= n) d = tratto(0, n) + 'Z';
          else {
            const z = segni.indexOf(0);
            let k = 1;
            while (k < n) {
              const i = (z + k) % n;
              if (segni[i]) { let len = 0; while (len < n && segni[(i + len) % n]) len++; d += tratto(i, len); k += len; } else k++;
            }
          }
        } else if (f.tipo === 'ip') {
          for (let br = 0; br < 2; br++) {
            let j = 0;
            while (j < NI) {
              if (segni[br * NI + j]) { let len = 0; while (j + len < NI && segni[br * NI + j + len]) len++; d += tratto(br * NI + j, len); j += len; } else j++;
            }
          }
        }
        solcoBase.setAttribute('d', d); solcoGrana.setAttribute('d', d);
      }
      /* il bastoncino è passato da p0 a p1: si segnano tutti gli spicchi in mezzo (per la via più corta) */
      function semina(f, p0, p1) {
        if (vinto || rafTw || (f.tipo !== 'ell' && f.tipo !== 'ip')) return;
        let nuovi = 0;
        const marca = i => { if (!segni[i]) { segni[i] = 1; nSegni++; nuovi++; pianta(f, i); } };
        if (f.tipo === 'ell') {
          let d = norm(p1.t - p0.t); if (d > Math.PI) d -= DUE_PI;
          const n = Math.max(1, Math.ceil(Math.abs(d) / (DUE_PI / NE / 4)));
          for (let k = 0; k <= n; k++) marca(bin(f, { t: p0.t + d * k / n }));
        } else if (p0.s === p1.s) {
          const dy = p1.y - p0.y, n = Math.max(1, Math.ceil(Math.abs(dy) / (2 * f.ym / NI / 4)));
          for (let k = 0; k <= n; k++) marca(bin(f, { s: p1.s, y: p0.y + dy * k / n }));
        }
        if (!nuovi) return;
        alone.classList.remove('invita');
        disegnaSolco(f);
        aggiornaTraguardi(true);
        if (nSegni >= nBin() && !completo) completa();
      }
      /* spago o picchetti cambiati: il solco vecchio si dissolve, si riparte da zero */
      function cancellaSolco() {
        if (nSegni) {
          const via = el('g');
          via.appendChild(solcoBase.cloneNode(false)); via.appendChild(solcoGrana.cloneNode(false));
          while (gFiori.firstChild) via.appendChild(gFiori.firstChild);
          gSvanisce.appendChild(via);
          effetto({ dur: 320, draw: u => via.setAttribute('opacity', 1 - u), fine: () => via.remove() });
          dopo(() => via.remove(), 600);
        }
        vuota(gFiori);
        segni = new Uint8Array(nBin()); nSegni = 0; fiori = [];
        solcoBase.setAttribute('d', ''); solcoGrana.setAttribute('d', '');
      }

      /* ================= bandierine, recinto, rettangolo, sagoma ================= */
      function creaBandiera(x, y) {
        const b = { x, y, stato: '', passa: false, bin: -1, dist: null, q: null };
        const gb = el('g', { class: 'bandiera', transform: `translate(${X(x)} ${Y(y)})` });
        gb.appendChild(el('ellipse', { cx: 1, cy: 1, rx: 7, ry: 3.5, fill: '#000', opacity: .16 }));
        gb.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: -34, stroke: 'var(--testo2)', 'stroke-width': 3, 'stroke-linecap': 'round' }));
        b.drappo = el('path', { class: 'drappo', d: 'M1.5 -34 L26 -26.5 L1.5 -19 Z', fill: 'var(--accento2)', stroke: 'var(--sup)', 'stroke-width': 1.2 });
        b.base = el('circle', { class: 'base', r: 5, fill: 'var(--accento2)', stroke: 'var(--sup)', 'stroke-width': 2 });
        gb.appendChild(b.drappo); gb.appendChild(b.base);
        const testo = '(' + nTxt(x) + '; ' + nTxt(y) + ')';
        const aSinistra = X(x) + 30 + testo.length * 9.2 > Math.min(W, vb.x1) - 6;
        gb.appendChild(el('text', { x: aSinistra ? -7 : 30, y: -21, 'text-anchor': aSinistra ? 'end' : 'start', fill: 'var(--testo)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 600 16px var(--font)' }, testo));
        gBandiere.appendChild(gb);
        return b;
      }
      function coloraBandiera(b, festeggia) {
        const col = b.stato === 'ok' ? 'var(--ok)' : b.stato === 'no' ? 'var(--no)' : 'var(--accento2)';
        b.drappo.setAttribute('fill', col); b.base.setAttribute('fill', col);
        if (festeggia) impulso(X(b.x), Y(b.y), 'var(--ok)', 34);
      }
      /* per ogni bandierina: quanto dista dalla curva (con i valori veri) e in quale spicchio cade */
      function calcolaBandiere() {
        const fe = esatta();
        bandiere.forEach(b => {
          b.passa = false; b.bin = -1; b.dist = null; b.q = null;
          if (fe.tipo !== 'ell' && fe.tipo !== 'ip') return;
          const p = vicino(fe, b.x, b.y), v = punto(fe, p);
          b.dist = Math.hypot(v[0] - b.x, v[1] - b.y); b.passa = b.dist <= TOL; b.bin = bin(fe, p); b.q = v;
        });
      }
      function creaRecinto(rx, ry) {
        const legno = 'color-mix(in srgb, var(--s2) 38%, var(--testo2))';
        const def = [['dx', rx, -ry, rx, ry, 0], ['sx', -rx, -ry, -rx, ry, Math.PI], ['su', -rx, ry, rx, ry, Math.PI / 2], ['giu', -rx, -ry, rx, -ry, 3 * Math.PI / 2]];
        lati = def.map(([nome, x1, y1, x2, y2, ang]) => {
          const linea = el('line', { class: 'gd-lato', x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2), style: `stroke: ${legno}`, 'stroke-width': 6, 'stroke-linecap': 'round' });
          gSotto.appendChild(linea);
          return { nome, ang, linea, stato: '', legno };
        });
        for (let x = -rx; x <= rx + 1e-9; x += 1) [ry, -ry].forEach(y => gSotto.appendChild(el('circle', { cx: X(x), cy: Y(y), r: 5, style: `fill: ${legno}`, stroke: 'var(--sup)', 'stroke-width': 1.5 })));
        for (let y = -ry + 1; y < ry - 1e-9; y += 1) [rx, -rx].forEach(x => gSotto.appendChild(el('circle', { cx: X(x), cy: Y(y), r: 5, style: `fill: ${legno}`, stroke: 'var(--sup)', 'stroke-width': 1.5 })));
        gSotto.appendChild(el('text', { x: X(0), y: Y(ry) - 14, 'text-anchor': 'middle', fill: 'var(--testo)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 700 17px var(--font)' }, 'recinto ' + nTxt(2 * rx) + ' m × ' + nTxt(2 * ry) + ' m'));
      }
      /* un lato si colora quando il bastoncino ci è passato vicino: verde se lo tocca, rosso se l'aiuola esce */
      function aggiornaRecinto() {
        const m = L().meta, fe = esatta();
        lati.forEach(l => {
          let st = '';
          if (fe.tipo === 'ell') {
            let passato = false;
            for (let i = 0; i < NE && !passato; i++) {
              if (!segni[i]) continue;
              let d = Math.abs(norm((i + .5) / NE * DUE_PI - l.ang)); d = Math.min(d, DUE_PI - d);
              if (d < .45) passato = true;
            }
            const corto = l.nome === 'dx' || l.nome === 'sx', semi = corto ? fe.a : fe.b, lim = corto ? m.rx : m.ry;
            if (passato || completo) st = semi > lim + TOL ? 'no' : Math.abs(semi - lim) <= TOL ? 'ok' : completo ? 'manca' : '';
          }
          if (st === l.stato) return;
          l.stato = st;
          l.linea.style.stroke = st === 'ok' ? 'var(--ok)' : st === 'no' ? 'var(--no)' : st === 'manca' ? 'var(--avviso)' : l.legno;
          l.linea.setAttribute('stroke-dasharray', st === 'manca' ? '10 8' : '');
          if (st === 'ok') { const lx = l.nome === 'dx' ? m.rx : l.nome === 'sx' ? -m.rx : 0, ly = l.nome === 'su' ? m.ry : l.nome === 'giu' ? -m.ry : 0; impulso(X(lx), Y(ly), 'var(--ok)', 30); }
        });
      }
      function creaRettangolo(ra, rb) {
        const k = rb / ra, xe = Math.min(7.5, 5.9 / k);   /* gli asintoti restano dentro il prato sempre visibile */
        [1, -1].forEach(sg => gSotto.appendChild(el('line', { x1: X(-xe), y1: Y(-sg * k * xe), x2: X(xe), y2: Y(sg * k * xe), stroke: 'var(--testo2)', 'stroke-width': 1.6, 'stroke-dasharray': '3 7', 'stroke-linecap': 'round', opacity: .7 })));
        gSotto.appendChild(el('rect', { x: X(-ra), y: Y(rb), width: 2 * ra * U, height: 2 * rb * U, fill: 'var(--sup)', 'fill-opacity': .18, stroke: 'var(--testo2)', 'stroke-width': 2, 'stroke-dasharray': '8 6', rx: 2 }));
        gSotto.appendChild(el('text', { x: X(0), y: Y(rb) - 10, 'text-anchor': 'middle', fill: 'var(--testo2)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 600 16px var(--font)' }, nTxt(2 * ra) + ' m × ' + nTxt(2 * rb) + ' m'));
      }
      let sagoma = null;
      function mostraSagoma() {
        const m = L().meta, a = A / 10, b = a * Math.sqrt(1 - m.e * m.e);
        togliSagoma();
        sagoma = el('g');
        sagoma.appendChild(el('ellipse', { cx: OX, cy: OY, rx: a * U, ry: b * U, fill: 'none', stroke: 'var(--accento2)', 'stroke-width': 2.5, 'stroke-dasharray': '9 7' }));
        sagoma.appendChild(el('text', { x: OX, y: Y(b) + 24, 'text-anchor': 'middle', fill: 'var(--accento2)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 700 16px var(--font)' }, 'la forma chiesta: e = ' + nTxt(m.e)));
        gSotto.appendChild(sagoma);
      }
      function togliSagoma() { if (sagoma) { sagoma.remove(); sagoma = null; } }
      /* dopo un'aiuola finita: da ogni bandierina mancata, la distanza dalla curva */
      function mostraDistanze() {
        vuota(gGap);
        bandiere.forEach(b => {
          if (b.stato !== 'no' || !b.q) return;
          gGap.appendChild(el('line', { x1: X(b.x), y1: Y(b.y), x2: X(b.q[0]), y2: Y(b.q[1]), stroke: 'var(--no)', 'stroke-width': 2.5, 'stroke-dasharray': '4 4', 'stroke-linecap': 'round' }));
          const mx = X((b.x + b.q[0]) / 2), my = Y((b.y + b.q[1]) / 2);
          gGap.appendChild(el('text', { x: mx + 10, y: my + 18, fill: 'var(--no)', stroke: 'var(--sup)', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round', style: 'font: 700 15px var(--font)' }, nTxt(b.dist, 2) + ' m'));
        });
      }
      function aggiornaTraguardi(festeggia) {
        bandiere.forEach(b => {
          const st = b.passa && segni[b.bin] ? 'ok' : completo ? 'no' : '';
          if (st === b.stato) return;
          b.stato = st;
          coloraBandiera(b, festeggia && st === 'ok');
        });
        if (L().meta.tipo === 'recinto') aggiornaRecinto();
      }

      /* ================= disegno di picchetti, spago, bastoncino ================= */
      /* le due distanze, arrotondate in modo che somma (o differenza) torni esattamente 2a */
      function misure() {
        const f = attuale(), P = punto(f, par);
        if (!P) return null;
        const d1 = Math.hypot(P[0] + vis.c, P[1]), d2 = Math.hypot(P[0] - vis.c, P[1]), dueA = 2 * vis.a;
        if (f.tipo === 'ip') {
          if (P[0] >= 0) { const r1 = tondo1(d1); return { P, d1: r1, d2: tondo1(r1 - dueA), ramo: 1 }; }
          const r2 = tondo1(d2); return { P, d1: tondo1(r2 - dueA), d2: r2, ramo: -1 };
        }
        const r1 = tondo1(d1); return { P, d1: r1, d2: tondo1(dueA - r1), ramo: 0 };
      }

      function ridisegna() {
        const f = attuale(), c = vis.c;
        F1.g.setAttribute('transform', `translate(${X(-c).toFixed(1)} ${OY})`);
        F2.g.setAttribute('transform', `translate(${X(c).toFixed(1)} ${OY})`);
        F1.t.setAttribute('x', c < .7 ? -15 : 0); F2.t.setAttribute('x', c < .7 ? 15 : 0);
        const m = misure();
        const dueA = nTxt(2 * vis.a, 1);
        if (m) {
          const P = m.P, px = X(P[0]), py = Y(P[1]);
          filo1.setAttribute('x1', X(-c)); filo1.setAttribute('y1', OY); filo1.setAttribute('x2', px); filo1.setAttribute('y2', py);
          filo2.setAttribute('x1', X(c)); filo2.setAttribute('y1', OY); filo2.setAttribute('x2', px); filo2.setAttribute('y2', py);
          filo1.style.display = ''; filo2.style.display = ''; gManca.style.display = 'none';
          bastone.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`); gBastone.style.display = '';
          rocchetto.style.display = f.tipo === 'ip' ? '' : 'none';
          /* cartellini: a metà di ogni pezzo, dalla parte opposta al triangolo F₁ P F₂ */
          const gx = P[0] / 3, gy = P[1] / 3;
          const posa = (et, ax, testo, sopra) => {
            const lung = Math.hypot(P[0] - ax, P[1]) * U, w = testo.length * 9.4 + 18;
            if (lung < w + 30 && lung > 1) {       /* pezzo corto: il cartellino va oltre il bastoncino, lungo lo spago */
              const ux = (P[0] - ax) * U / lung, uy = P[1] * U / lung;
              /* spago quasi orizzontale: l'altro cartellino sta sopra (d₁) o sotto (d₂), questo va dalla parte opposta */
              const dy = Math.abs(uy) < .35 ? (sopra ? -30 : 30) : -uy * 30 - 4;
              posaCartellino(et, testo, X(P[0]) + ux * (w / 2 + 26), Y(P[1]) + dy);
              return;
            }
            const mx = (ax + P[0]) / 2, my = P[1] / 2;
            let nx = -P[1], ny = P[0] - ax; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
            const s = (mx - gx) * nx + (my - gy) * ny;
            if (Math.abs(s) < 1e-6) { nx = 0; ny = sopra ? 1 : -1; } else if (s < 0) { nx = -nx; ny = -ny; }
            posaCartellino(et, testo, X(mx) + nx * 24, Y(my) - ny * 24);
          };
          posa(et1, -c, 'd₁ = ' + fisso1(m.d1), true);
          posa(et2, c, 'd₂ = ' + fisso1(m.d2), false);
          if (f.tipo === 'ip') {
            const [pa, pb, ca, cb] = m.ramo > 0 ? ['d₁', 'd₂', m.d1, m.d2] : ['d₂', 'd₁', m.d2, m.d1];
            const colA = m.ramo > 0 ? 'var(--s1)' : 'var(--s2)', colB = m.ramo > 0 ? 'var(--s2)' : 'var(--s1)';
            scriviCartello([[pa, colA], [' − '], [pb, colB], [' = '], [fisso1(ca), colA], [' − '], [fisso1(cb), colB], [' = ' + dueA + ' m']], cartSotto());
          } else {
            scriviCartello([['d₁', 'var(--s1)'], [' + '], ['d₂', 'var(--s2)'], [' = '], [fisso1(m.d1), 'var(--s1)'], [' + '], [fisso1(m.d2), 'var(--s2)'], [' = ' + dueA + ' m']], cartSotto());
          }
        } else {
          gBastone.style.display = 'none'; et1.g.style.display = 'none'; et2.g.style.display = 'none'; filo2.style.display = 'none';
          if (f.tipo === 'corto') {
            /* lo spago parte da F₁, tirato verso F₂, e finisce prima */
            const xf = -c + 2 * vis.a;
            filo1.setAttribute('x1', X(-c)); filo1.setAttribute('y1', OY); filo1.setAttribute('x2', X(xf)); filo1.setAttribute('y2', OY); filo1.style.display = '';
            gManca.style.display = '';
            mancaLinea.setAttribute('x1', X(xf) + 8); mancaLinea.setAttribute('y1', OY); mancaLinea.setAttribute('x2', X(c) - 14); mancaLinea.setAttribute('y2', OY);
            capo.setAttribute('cx', X(xf)); capo.setAttribute('cy', OY);
            mancaTesto.setAttribute('x', (X(xf) + X(c)) / 2); mancaTesto.setAttribute('y', OY - 16);
            mancaTesto.textContent = 'mancano ' + nTxt(2 * (c - vis.a), 1) + ' m';
          } else { filo1.style.display = 'none'; gManca.style.display = 'none'; }
          scriviCartello([['2a = ' + dueA + ' m'], ['   '], ['2c = ' + nTxt(2 * c, 1) + ' m', 'var(--accento-testo)']], f.tipo === 'corto' ? 'lo spago non arriva' : 'nessuna curva');
        }
        avvisoScena(f.tipo === 'corto' ? ['Lo spago è più corto della distanza fra i picchetti:', 'non arriva da uno all\'altro.']
          : f.tipo === 'seg' ? ['Spago lungo quanto la distanza fra i picchetti:', 'resta teso sulla loro linea, l\'aiuola è un segmento.']
          : f.tipo === 'nulla' ? ['La differenza fra i due spaghi non può arrivare', 'alla distanza fra i picchetti: nessun punto va bene.'] : null);
        formula();
      }
      function cartSotto() {
        const f = attuale();
        if (f.tipo === 'seg') return 'niente fiori su un segmento';
        if (completo) return ip() ? 'curva finita' : 'aiuola finita';
        return 'fiori piantati: ' + nSegni + ' su ' + nBin();
      }

      /* ================= la formula (KaTeX), aggiornata a ogni movimento ================= */
      const memo = new Map();
      const T = s => { let h = memo.get(s); if (!h) { if (memo.size > 600) memo.clear(); h = ctx.tex(s); memo.set(s, h); } return h; };
      let cacheForm = '';
      function formula() {
        const l = L(), a = A / 10, c = C / 10, fe = esatta(), a2 = A * A / 100, c2 = C * C / 100;
        const r = (et, corpo, cls) => `<div class="gd-r${cls ? ' ' + cls : ''}"${et === 'il bastoncino' ? ' data-r="bast"' : ''}><span class="gd-et">${et}</span><span class="gd-tex">${corpo}</span></div>`;
        const bTex = b2 => { const b = Math.sqrt(b2); return Math.abs(tondo1(b) - b) < 1e-9 ? `b = ${nTex(b, 1)}` : `b \\approx ${nTex(b, 2)}`; };
        let h = r(ip() ? 'rocchetto e picchetti' : 'spago e picchetti', T(`2a = ${nTex(2 * a)} \\;\\Rightarrow\\; a = ${nTex(a)}`) + T(`2c = ${nTex(2 * c)} \\;\\Rightarrow\\; c = ${nTex(c)}`));
        const m = misure();
        if (m && m.ramo === 1) h += r('il bastoncino', T(`d_1 - d_2 = ${fisso1Tex(m.d1)} - ${fisso1Tex(m.d2)} = ${nTex(2 * vis.a, 1)}`));
        else if (m && m.ramo === -1) h += r('il bastoncino', T(`d_2 - d_1 = ${fisso1Tex(m.d2)} - ${fisso1Tex(m.d1)} = ${nTex(2 * vis.a, 1)}`));
        else if (m) h += r('il bastoncino', T(`d_1 + d_2 = ${fisso1Tex(m.d1)} + ${fisso1Tex(m.d2)} = ${nTex(2 * vis.a, 1)}`));
        else if (fe.tipo === 'corto') h += r('lo spago', T(`2a = ${nTex(2 * a)} < 2c = ${nTex(2 * c)}`) + '<span class="gd-nota">non arriva da un picchetto all\'altro</span>');
        else if (fe.tipo === 'nulla') h += r('il rocchetto', T(`2a = ${nTex(2 * a)} \\ge 2c = ${nTex(2 * c)}`) + '<span class="gd-nota">nessun punto va bene</span>');
        if (!ip()) {
          const b2 = (A * A - C * C) / 100;
          h += r('semiasse b', T(`b^2 = a^2 - c^2 = ${nTex(a2)} - ${nTex(c2)} = ${nTex(b2)}${b2 < -1e-9 ? ' < 0' : ''}`) + (b2 > 1e-9 ? T(bTex(b2)) : ''));
          if (fe.tipo === 'ell') h += r('l\'aiuola', T(`\\dfrac{x^2}{${nTex(a2)}} + \\dfrac{y^2}{${nTex(b2)}} = 1`) + (C === 0 ? T(`x^2 + y^2 = ${nTex(a2)}`) : ''));
          else if (fe.tipo === 'seg') h += r('l\'aiuola', '<span class="gd-nota">con b = 0 si schiaccia sul segmento F₁F₂</span>');
          else h += r('l\'aiuola', '<span class="gd-nota">nessuna: b² non può essere negativo</span>');
        } else {
          const b2 = (C * C - A * A) / 100;
          h += r('semiasse b', T(`b^2 = c^2 - a^2 = ${nTex(c2)} - ${nTex(a2)} = ${nTex(b2)}${b2 < -1e-9 ? ' < 0' : ''}`) + (b2 > 1e-9 ? T(bTex(b2)) : ''));
          if (fe.tipo === 'ip') h += r('la curva', T(`\\dfrac{x^2}{${nTex(a2)}} - \\dfrac{y^2}{${nTex(b2)}} = 1`));
        }
        if (fe.tipo === 'ell' || fe.tipo === 'ip') {
          const e = C / A, eR = Math.round(e * 100) / 100;
          const coda = l.nascondiE && !completo ? '= \\;?' : (Math.abs(eR - e) < 1e-9 ? '= ' : '\\approx ') + nTex(e, 2);
          h += r('eccentricità', T(`e = \\dfrac{c}{a} = \\dfrac{${nTex(c)}}{${nTex(a)}} ${coda}`));
        }
        if (vinto) h += r('la regola', l.ponte.map(T).join(''), 'ponte');
        if (h !== cacheForm) { formEl.innerHTML = h; cacheForm = h; }
      }

      /* ================= messaggi ================= */
      function avvisa(html, tipo) { msg.innerHTML = html; msg.className = 'lab-messaggio' + (tipo ? ' ' + tipo : ''); }
      function zenone(chiave, testo) {
        if (detti.has(chiave)) return;
        detti.add(chiave);
        ctx.zenone(testo, { tipo: 'errore', espressione: 'pensa', durata: 9000 });
      }
      /* spago e picchetti che non disegnano un'aiuola: lo dice la scena subito, Zenone solo se lo studente si ferma lì */
      function controllaForma() {
        const fe = esatta(), l = L(), m = l.meta;
        annulla(timerZen); timerZen = 0;
        let testo = '', chiave = '', zen = '';
        if (fe.tipo === 'corto') {
          testo = `Lo spago (2a = ${nTxt(2 * fe.a)} m) è più corto della distanza fra i picchetti (2c = ${nTxt(2 * fe.c)} m): non arriva da uno all'altro.`;
          chiave = 'corto'; zen = 'Lo spago deve essere più lungo della distanza fra i picchetti: 2a > 2c. Con uno spago più corto non si disegna niente.';
        } else if (fe.tipo === 'seg') {
          testo = `Spago e distanza fra i picchetti sono uguali (${nTxt(2 * fe.a)} m): lo spago resta teso sulla linea dei picchetti, e l'aiuola si schiaccia in un segmento.`;
          if (m.punti && m.punti.some(p => p[1] === 0 && Math.abs(Math.abs(p[0]) - fe.c) < 1e-9)) { chiave = 'seg-bandiere'; zen = 'Hai piantato i picchetti sulle bandierine: così lo spago resta teso fra loro. I picchetti stanno dentro l\'aiuola, non sul bordo.'; }
          else if (m.tipo === 'recinto' && Math.abs(fe.c - m.rx) < 1e-9) { chiave = 'seg-recinto'; zen = 'Hai piantato i picchetti sui lati corti del recinto: lo spago resta teso fra loro. I picchetti stanno dentro l\'aiuola, più vicini al centro.'; }
          else { chiave = 'seg'; zen = 'Se lo spago è lungo quanto la distanza fra i picchetti, resta teso sulla loro linea: 2a deve essere più grande di 2c.'; }
        } else if (fe.tipo === 'nulla') {
          testo = `Col rocchetto la differenza fra i due spaghi deve essere più corta della distanza fra i picchetti: qui 2a = ${nTxt(2 * fe.a)} m e 2c = ${nTxt(2 * fe.c)} m.`;
          if (A === 40 && (C === 26 || C === 27)) { chiave = 'nulla-ell'; zen = 'Hai usato c² = a² − b², la regola dell\'ellisse. Nell\'iperbole i picchetti stanno oltre le bandierine più vicine al centro: c è il più lungo dei tre.'; }
          else { chiave = 'nulla'; zen = 'Nel triangolo F₁ P F₂ la differenza di due lati è sempre minore del terzo: per l\'iperbole serve 2a < 2c, il contrario dell\'ellisse.'; }
        }
        if (libero) { avvisa(testo); return; }   /* in modalità libera: solo quello che succede, niente errori */
        if (testo) avvisa(testo, 'no');
        else if (!completo && msg.classList.contains('no')) avvisa('');
        if (zen) { const A0 = A, C0 = C; timerZen = dopo(() => { timerZen = 0; if (A === A0 && C === C0 && !vinto) zenone(chiave, zen); }, 1100); }
      }

      /* ================= fine del disegno: il controllo ================= */
      function completa() {
        completo = true;
        const l = L(), m = l.meta;
        aggiornaTraguardi(false);
        let ok = false, testo = '', zen = '', chiave = '';
        const cosa = ip() ? 'Curva finita' : 'Aiuola finita';
        if (m.tipo === 'libero') {   /* nessun verdetto e nessuna festa: si dice solo che cosa resta costante */
          avvisa(ctx.md(cosa + (ip() ? ': in ogni punto $|d_1 - d_2| = ' : ': in ogni punto $d_1 + d_2 = ') + nTex(A / 5) + '$ m.').replace(/^<p>|<\/p>$/g, ''));
          ridisegna(); return;
        }
        if (m.tipo === 'giro') ok = true;
        else if (m.tipo === 'bandiere') {
          const prese = bandiere.filter(b => b.stato === 'ok').length, tot = bandiere.length;
          ok = prese === tot && (!m.cerchio || C === 0);
          if (!ok && prese === tot) testo = `${cosa}: passa vicinissima alle bandierine, ma i picchetti sono ancora separati (2c = ${nTxt(C / 5)} m), quindi non è rotonda. Uniscili.`;
          else if (!ok) testo = `${cosa}, ma ${prese ? 'passa solo per ' + prese + (prese === 1 ? ' bandierina' : ' bandierine') + ' su ' + tot : 'non passa per nessuna bandierina'}: la linea rossa dice di quanto manca ciascuna delle altre.`;
          if (!ok) mostraDistanze();
          if (!ok && m.punti[2][0] === 0 && m.punti[2][1] === 3 && A === 50 && C === 30) { chiave = 'b-c'; zen = 'Le bandierine in (0; ±3) non dicono dove vanno i picchetti: dicono quanto è larga l\'aiuola. Mettici il bastoncino e guarda quanto sono lunghi d₁ e d₂.'; }
        } else if (m.tipo === 'recinto') {
          ok = lati.every(x => x.stato === 'ok');
          if (!ok) {
            const parti = [];
            [['dx', 'corti'], ['su', 'lunghi']].forEach(([n, nome]) => {
              const st = lati.find(x => x.nome === n).stato;
              if (st === 'no') parti.push('esce dal recinto sui lati ' + nome);
              else if (st !== 'ok') parti.push('non tocca i lati ' + nome);
            });
            testo = `${cosa}, ma ${parti.join(' e ').replace(' e esce', ' ed esce')}.`;
            if (C === 25) { chiave = 'c-b'; zen = 'Hai messo i picchetti a 2,5 m dal centro, cioè c = 2,5. Ma 2,5 è b, la metà della larghezza: c è un\'altra misura.'; }
          }
        } else if (m.tipo === 'ecc') {
          ok = C === m.C;
          if (!ok) {
            const e = C / A;
            testo = `${cosa}: e = c/a ≈ ${nTxt(e, 2)}. È più ${e < m.e ? 'tonda' : 'schiacciata'} di quella chiesta, che vedi tratteggiata.`;
            mostraSagoma();
            if (C === 36) { chiave = 'e-b'; zen = 'Hai reso b uguale a 0,8 · a. L\'eccentricità però confronta c con a: c = e · a.'; }
            else if (C === 24) { chiave = 'e-2c'; zen = 'Fra i picchetti c\'è 2c, non c. Se c = 0,8 · 6, la distanza fra i picchetti è il doppio.'; }
          }
        }
        if (ok) { vittoria(); return; }
        avvisa(testo, 'no');
        if (zen) zenone(chiave, zen);
        ridisegna();
      }

      function vittoria() {
        const l = L();
        vinto = true;
        ctx.completato(livello); pillole();
        avvisa('<span class="vinto">' + ctx.md(l.fatto).replace(/^<p>|<\/p>$/g, '') + '</span>', 'ok');
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        comandi(); ridisegna(); festa();
        ctx.zenone(l.vittoria, { espressione: 'orgoglioso', durata: 9000 });
      }
      /* festa: i fiori ballano in giro e dal centro volano petali */
      function festa() {
        const n = nBin();
        fiori.forEach((f, i) => { if (!f) return; f.classList.remove('nuovo'); f.style.animationDelay = Math.round(i / n * 520) + 'ms'; f.classList.add('festa'); });
        annulla(timerFesta);
        timerFesta = dopo(() => fiori.forEach(f => { if (f) { f.classList.remove('festa'); f.style.animationDelay = ''; } }), 1300);
        const COL = PETALI.concat(['var(--s3)', 'var(--ok)']);
        for (let i = 0; i < 26; i++) {
          const an = i / 26 * DUE_PI + (i % 3) * .2, v = 90 + (i * 47) % 90;
          const p = el('ellipse', { rx: 6, ry: 3.4, fill: COL[i % COL.length], opacity: 0 });
          gFx.appendChild(p);
          effetto({ dur: 850, draw: u => {
            const e = 1 - Math.pow(1 - u, 3), x = OX + Math.cos(an) * v * e, y = OY + Math.sin(an) * v * e + 30 * u * u;
            p.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(i * 40 + u * 300).toFixed(0)})`);
            p.setAttribute('opacity', u < .7 ? 1 : (1 - u) / .3);
          }, fine: () => p.remove() });
        }
        dopo(() => vuota(gFx), 1400);
      }

      /* ================= cambiare spago e picchetti ================= */
      function tween(da, a, dur) {
        cancelAnimationFrame(rafTw); annulla(timerTw);
        const t0 = performance.now();
        const fine = () => { cancelAnimationFrame(rafTw); rafTw = 0; annulla(timerTw); timerTw = 0; vis = { a: a.a, c: a.c }; ridisegna(); };
        const passo = t => {
          const u = Math.min(1, (t - t0) / dur);
          if (u >= 1) { fine(); return; }
          const e = 1 - Math.pow(1 - u, 3);
          vis = { a: da.a + (a.a - da.a) * e, c: da.c + (a.c - da.c) * e };
          ridisegna();
          rafTw = requestAnimationFrame(passo);
        };
        rafTw = requestAnimationFrame(passo);
        timerTw = dopo(fine, dur + 150);          /* se rAF è strozzato (scheda nascosta, banco headless) */
      }
      function imposta(nA, nC, anima) {
        nA = morsa(Math.round(nA), A_MIN, A_MAX); nC = morsa(Math.round(nC), 0, C_MAX);
        if (vinto || (nA === A && nC === C)) return;
        const da = { a: vis.a, c: vis.c };
        A = nA; C = nC;
        cancellaSolco();
        completo = false; togliSagoma(); vuota(gGap);
        avvisa('');
        calcolaBandiere(); aggiornaTraguardi(false);
        comandi();
        if (anima) tween(da, { a: A / 10, c: C / 10 }, 220);
        else { cancelAnimationFrame(rafTw); rafTw = 0; annulla(timerTw); vis = { a: A / 10, c: C / 10 }; ridisegna(); }
        controllaForma();
      }
      function comandi() {
        const l = L();
        const aggiornaRiga = (rg, val, fisso, nome, testo, min, max) => {
          rg.classList.toggle('bloccata', fisso);
          rg.querySelector('.gd-et').textContent = nome;
          rg.querySelector('.gd-val').textContent = testo;
          const inp = rg.querySelector('input'); inp.value = val; inp.disabled = fisso || vinto;
          rg.querySelector('.gd-meno').disabled = fisso || vinto || val <= min;
          rg.querySelector('.gd-piu').disabled = fisso || vinto || val >= max;
        };
        aggiornaRiga(rigaC, C, !!l.fissiC, 'picchetti' + (l.fissiC ? ' · fissi' : ''), '2c = ' + nTxt(C / 5) + ' m', 0, C_MAX);
        aggiornaRiga(rigaA, A, !!l.fissiA, (ip() ? 'rocchetto' : 'spago') + (l.fissiA ? ' · fisso' : ''), '2a = ' + nTxt(A / 5) + ' m', A_MIN, A_MAX);
      }
      /* − e +: un tocco = 0,2 m; tenendo premuto si ripete */
      const fermaRipetizioni = [];
      function ripeti(btn, fn) {
        let tRit = 0, tInt = 0, daPuntatore = false;
        const ferma = () => { clearTimeout(tRit); clearInterval(tInt); tRit = 0; tInt = 0; };
        btn.addEventListener('pointerdown', ev => {
          if (btn.disabled || (ev.button != null && ev.button > 0)) return;
          daPuntatore = true; ferma(); fn(false);
          tRit = setTimeout(() => { tInt = setInterval(() => { if (btn.disabled) ferma(); else fn(true); }, 70); }, 380);
        });
        ['pointerup', 'pointerleave', 'pointercancel'].forEach(t => btn.addEventListener(t, ferma));
        btn.addEventListener('click', () => { if (daPuntatore) { daPuntatore = false; return; } fn(false); });
        fermaRipetizioni.push(ferma);
      }
      ripeti(rigaC.querySelector('.gd-meno'), veloce => imposta(A, C - 1, !veloce));
      ripeti(rigaC.querySelector('.gd-piu'), veloce => imposta(A, C + 1, !veloce));
      ripeti(rigaA.querySelector('.gd-meno'), veloce => imposta(A - 1, C, !veloce));
      ripeti(rigaA.querySelector('.gd-piu'), veloce => imposta(A + 1, C, !veloce));
      rigaC.querySelector('input').addEventListener('input', ev => imposta(A, +ev.target.value, false));
      rigaA.querySelector('input').addEventListener('input', ev => imposta(+ev.target.value, C, false));

      /* ================= il dito sulla scena ================= */
      /* dal dito alle coordinate del prato: il viewBox cambia forma con lo spazio, quindi si passa
         dalla matrice dello schermo, mai dal rettangolo dell'svg */
      function mondoDa(ev) {
        const M = svg.getScreenCTM();
        if (!M) return null;
        const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(M.inverse());
        return { sx: p.x, sy: p.y, x: (p.x - OX) / U, y: (OY - p.y) / U };
      }
      const spostaPicchetti = m => imposta(A, Math.abs(m.x) * 10, false);
      function giu(ev) {
        if (ev.button != null && ev.button > 0) return;
        const m = mondoDa(ev); if (!m) return;
        const f = attuale(), P = punto(f, par);
        const dB = P ? Math.hypot(X(P[0]) - m.sx, Y(P[1]) - m.sy) : Infinity;
        const dF = Math.min(Math.hypot(X(-vis.c) - m.sx, OY - m.sy), Math.hypot(X(vis.c) - m.sx, OY - m.sy));
        if (!L().fissiC && !vinto && dF < 40 && dF + 14 < dB) { presa = 'F'; spostaPicchetti(m); }   /* a parità, vince il bastoncino */
        else if (P) {
          presa = 'B';
          const np = vicino(f, m.x, m.y);
          if (dB > 46) par = np;                 /* lontano dal bastoncino: si alza e si posa lì, senza solco */
          else { semina(f, par, np); par = np; }
          ridisegna();
        } else return;
        svg.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      }
      function muovi(ev) {
        if (!presa) return;
        const m = mondoDa(ev); if (!m) return;
        if (presa === 'F') spostaPicchetti(m);
        else {
          const f = attuale(), np = vicino(f, m.x, m.y);
          if (np) { semina(f, par, np); par = np; ridisegna(); }
        }
        ev.preventDefault();
      }
      function su() { if (!presa) return; presa = null; svg.classList.remove('presa'); if (rimandato) { rimandato = false; adatta(); } }
      svg.addEventListener('pointerdown', giu);
      window.addEventListener('pointermove', muovi, { passive: false });
      window.addEventListener('pointerup', su);
      window.addEventListener('pointercancel', su);
      /* tastiera: le frecce fanno avanzare il bastoncino di uno spicchio */
      svg.addEventListener('keydown', ev => {
        const f = attuale();
        if (!disegnabile(f)) return;
        const dir = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 0;
        if (!dir) return;
        let np;
        if (f.tipo === 'ip') {
          const y = par.y + dir * 2 * f.ym / NI;
          np = Math.abs(y) > f.ym + 1e-9 ? { t: 0, s: -par.s, y: morsa(par.y, -f.ym, f.ym) } : { t: 0, s: par.s, y };
        } else np = { t: norm(par.t + dir * DUE_PI / NE), s: 1, y: 0 };
        semina(f, par, np); par = np; ridisegna();
        ev.preventDefault();
      });

      /* ================= livelli ================= */
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
      /* nel pannello la consegna breve (se lo spazio è poco) e quella intera: il CSS sceglie quale si vede */
      function consegna() {
        const breve = libero ? null : BREVI[livello];
        return (breve ? '<span class="c-breve">' + ctx.md(breve) + '</span>' : '') + '<span class="c-lungo">' + ctx.md(L().testo) + '</span>';
      }
      /* prepara il prato per il livello corrente (o per la modalità libera): recinto, bandierine,
         rettangolo, e i fiori già piantati se si torna a un disegno lasciato a metà */
      function preparaScena(vecchiSegni) {
        cancelAnimationFrame(rafTw); rafTw = 0; annulla(timerTw); annulla(timerZen); annulla(timerFesta);
        cancelAnimationFrame(rafFx); rafFx = 0; effetti = []; vuota(gFx); vuota(gSvanisce);
        const l = L();
        vis = { a: A / 10, c: C / 10 };
        presa = null;
        vuota(gFiori); fiori = [];
        segni = vecchiSegni && vecchiSegni.length === nBin() ? vecchiSegni : new Uint8Array(nBin());
        nSegni = segni.reduce((t, v) => t + v, 0);
        const f = esatta();
        if (nSegni && (f.tipo === 'ell' || f.tipo === 'ip')) {
          for (let i = 0; i < segni.length; i++) if (segni[i]) { pianta(f, i); fiori[i].classList.remove('nuovo'); }
          disegnaSolco(f);
        } else { solcoBase.setAttribute('d', ''); solcoGrana.setAttribute('d', ''); }
        alone.classList.toggle('invita', !nSegni);
        vuota(gSotto); vuota(gBandiere); vuota(gGap); sagoma = null; lati = []; bandiere = [];
        if (l.rettangolo) creaRettangolo(l.rettangolo[0], l.rettangolo[1]);
        if (l.meta.tipo === 'recinto') creaRecinto(l.meta.rx, l.meta.ry);
        if (l.meta.punti) bandiere = l.meta.punti.map(p => creaBandiera(p[0], p[1]));
        objEl.innerHTML = consegna();
        aiutoEl.hidden = true;
        calcolaBandiere(); aggiornaTraguardi(false);
      }
      function avviaLivello(n) {
        libero = false; salvato = null; mostraLibero();
        livello = n;
        const l = L();
        A = l.A; C = l.C;
        par = { t: 0, s: 1, y: 0 };
        vinto = false; completo = false; detti.clear();
        preparaScena();
        avvisa('');
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        aggiornaLivelli(); comandi(); ridisegna(); controllaForma();
      }
      bRic.addEventListener('click', () => {
        if (libero) {   /* in modalità libera si cancella solo il disegno: spago e picchetti restano */
          cancellaSolco(); completo = false; alone.classList.add('invita');
          avvisa(''); ridisegna(); controllaForma(); return;
        }
        avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello);
      });
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        /* se nel pannello c'è la consegna breve, quella intera si legge qui */
        const breve = objEl.querySelector('.c-breve'), cEl = aiutoEl.querySelector('.consegna');
        cEl.hidden = libero || !breve || getComputedStyle(breve).display === 'none';
        if (!cEl.hidden) cEl.innerHTML = ctx.md(L().testo);
        aiutoEl.querySelector('.testo-aiuto').innerHTML = ctx.md(L().aiuto);
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });

      /* ================= modalità libera: spago e picchetti liberi, ellisse o iperbole, nessun obiettivo ================= */
      function mostraLibero() {
        parametriEl.hidden = !libero; bCasuale.hidden = !libero;
        radice.classList.toggle('in-libero', libero);
        parametriEl.querySelectorAll('[data-modo]').forEach(b => b.setAttribute('aria-pressed', b.dataset.modo === LIBERO.modo ? 'true' : 'false'));
      }
      function entraLibero() {
        salvato = { livello, A, C, par: Object.assign({}, par), segni: segni.slice(), completo, vinto, detti: new Set(detti),
          msg: msg.innerHTML, cls: msg.className, ric: bRic.textContent, prim: bRic.classList.contains('primario') };
        libero = true;
        LIBERO.modo = LIVELLI[livello].modo;
        mostraLibero();
        vinto = false; completo = false;
        preparaScena();
        avvisa(''); bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        aggiornaLivelli(); comandi(); ridisegna(); controllaForma();
      }
      function esciLibero() {   /* si torna al livello com'era, fiori compresi */
        const z = salvato; libero = false; salvato = null; mostraLibero();
        livello = z.livello; A = z.A; C = z.C; par = z.par; vinto = z.vinto; completo = z.completo;
        detti.clear(); z.detti.forEach(d => detti.add(d));
        preparaScena(z.segni);
        if (completo && !vinto) { if (bandiere.length) mostraDistanze(); if (L().meta.tipo === 'ecc') mostraSagoma(); }
        msg.innerHTML = z.msg; msg.className = z.cls;
        bRic.textContent = z.ric; bRic.classList.toggle('primario', z.prim);
        aggiornaLivelli(); comandi(); ridisegna();
      }
      function cambiaModo(m) {
        if (!libero || LIBERO.modo === m) return;
        LIBERO.modo = m;
        /* spago e picchetti restano, se disegnano ancora qualcosa; altrimenti si sistemano */
        if (m === 'ip' && C <= A) { A = morsa(Math.round(C * .6), A_MIN, 40); if (C <= A) C = Math.min(C_MAX, A + 15); }
        if (m === 'ell' && A <= C) { A = Math.min(A_MAX, C + 20); if (A <= C) C = A - 20; }
        par = { t: 0, s: 1, y: 0 }; completo = false;
        preparaScena(); mostraLibero(); avvisa('');
        comandi(); ridisegna(); controllaForma();
      }
      function casuale() {
        if (!libero) return;
        const r = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
        let nA, nC, giri = 0;
        do {
          if (LIBERO.modo === 'ip') { nA = r(2, 4) * 5; nC = nA + r(2, 6) * 5; }   /* a da 1 a 2 m, c più lungo */
          else { nA = r(6, 11) * 5; nC = r(0, nA / 5 - 2) * 5; }                  /* a da 3 a 5,5 m, c più corto */
          giri++;
        } while (giri < 20 && nA === A && nC === C);
        imposta(nA, nC, true);
      }
      bLibero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      bCasuale.addEventListener('click', casuale);
      parametriEl.addEventListener('click', ev => { const b = ev.target.closest('[data-modo]'); if (b) cambiaModo(b.dataset.modo); });
      LIVELLI.forEach((_, i) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (i + 1)); p.innerHTML = '<span>' + (i + 1) + '</span>';
        p.addEventListener('click', () => { if (libero || i !== livello || vinto) avviaLivello(i); });
        livelliEl.insertBefore(p, bLibero);
      });

      /* ================= la forma dello spazio decide il viewBox ================= */
      let misura = '', rimandato = false;
      function adatta() {
        if (presa) { rimandato = true; return; }     /* mentre si trascina si aspetta che il dito si stacchi */
        const orizz = radice.clientWidth * 4 >= radice.clientHeight * 5;   /* come la container query di .lab-layout */
        if (orizz && formEl.parentNode !== lato) lato.insertBefore(formEl, barra);
        else if (!orizz && formEl.parentNode !== scena) scena.insertBefore(formEl, scena.firstChild);
        const r = svg.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        /* il prato mostra almeno x da −7,5 a 7,5 m e y da −6 a 6 m; il resto dello spazio è altra erba */
        const s = Math.min(r.width / W, r.height / 480, 1.75), w = r.width / s, h = r.height / s;   /* su schermi enormi si vede più prato, non un prato gigante */
        const m = Math.round(w) + 'x' + Math.round(h);
        if (m === misura) return;
        misura = m;
        vb = { x0: OX - w / 2, y0: OY - h / 2, w, h, x1: OX + w / 2, y1: OY + h / 2 };
        svg.setAttribute('viewBox', `${vb.x0.toFixed(1)} ${vb.y0.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
        disegnaFondo(); posaCornici(); ridisegna();
      }

      disegnaFondo(); posaCornici();
      avviaLivello(livello);
      adatta();
      const ro = new ResizeObserver(adatta); ro.observe(radice); ro.observe(svg);

      return function smonta() {
        cancelAnimationFrame(rafTw); cancelAnimationFrame(rafFx); rafTw = 0; rafFx = 0; effetti = [];
        timers.forEach(t => clearTimeout(t)); timers.clear();
        fermaRipetizioni.forEach(f => f());
        ro.disconnect();
        window.removeEventListener('pointermove', muovi, { passive: false });
        window.removeEventListener('pointerup', su);
        window.removeEventListener('pointercancel', su);
      };
    }
  });
})();
