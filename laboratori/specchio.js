/* Laboratorio «Lo specchio» — disequazioni di primo grado.
   Un binario (la retta dei numeri) con due gettoni: A sopra, B sotto, e fra loro il verso.
   Ogni mossa agisce su TUTTI E DUE i gettoni. Sommare fa scivolare, moltiplicare per un positivo
   allunga, moltiplicare per un negativo ribalta il binario attorno allo zero, come in uno specchio.
   Dopo ogni mossa il verso diventa «?» e lo sceglie lo studente.
     parte 1 (livelli 1-3): A e B sono numeri, il verso giusto si legge dalla scena;
     parte 2 (livelli 4-6): A è un'espressione in x, la sua zona è quella che dice lo studente;
       quando resta solo x la scena controlla con un valore campione nella disequazione di partenza.
   Contratto: SCHEMA-LAB.md — modelli: bilancia.js, regolo.js */
(function () {
  const STILE = `
    .lab-specchio .lab-scena { background: radial-gradient(130% 110% at 50% 0%, var(--sup), var(--sup2)); overflow: hidden; }
    .lab-specchio .lab-scena svg { cursor: default; }
    .lab-specchio .lab-scena.sonda-ok svg { cursor: crosshair; }
    .lab-specchio .obiettivo { padding: 12px 16px 8px; font-size: 1rem; line-height: 1.55; color: var(--testo); }
    .lab-specchio .obiettivo p { margin: 0; }
    .lab-specchio .obiettivo b, .lab-specchio .obiettivo strong { color: var(--accento-testo); }
    .lab-specchio .obiettivo .parte { display: block; font-size: .68rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--testo2); margin-bottom: 2px; }
    .lab-specchio .aiuto { margin: 0 16px 10px; padding: 10px 14px; border-radius: 12px; background: var(--accento-tenue); color: var(--testo); font-size: .92rem; line-height: 1.5; animation: lab-specchio-pop .3s var(--morbido); }
    .lab-specchio .pin { filter: drop-shadow(0 1px 1px rgba(30,30,50,.18)) drop-shadow(0 4px 6px rgba(30,30,50,.16)); }
    :root[data-tema="scuro"] .lab-specchio .pin { filter: drop-shadow(0 1px 2px rgba(0,0,0,.5)) drop-shadow(0 5px 9px rgba(0,0,0,.45)); }
    .lab-specchio .binario { filter: drop-shadow(0 2px 3px rgba(30,30,50,.14)); }
    :root[data-tema="scuro"] .lab-specchio .binario { filter: drop-shadow(0 2px 4px rgba(0,0,0,.5)); }
    .lab-specchio .rel { display: flex; align-items: center; justify-content: center; gap: 8px 14px; flex-wrap: wrap; padding: 14px 12px 0; min-height: 70px; }
    .lab-specchio .lato { display: inline-flex; flex-direction: column; align-items: center; font-size: 1.55rem; line-height: 1.1; }
    .lab-specchio .lato small { font: 700 .66rem var(--font); letter-spacing: .08em; opacity: .85; margin-bottom: 1px; }
    .lab-specchio .lato-a { color: var(--s1); }
    .lab-specchio .lato-b { color: var(--s2); }
    .lab-specchio .lato .katex { font-size: 1em; }
    .lab-specchio .verso { display: inline-flex; gap: 8px; align-items: center; perspective: 300px; }
    .lab-specchio .v-btn { width: 52px; height: 52px; padding: 0; border-radius: 50%; border: 2px solid var(--bordo2); background: var(--sup);
      color: var(--testo); font: 600 1.55rem/1 var(--font); display: grid; place-items: center; box-shadow: var(--ombra);
      transition: transform .25s var(--molla), background .2s, border-color .2s, color .2s; }
    .lab-specchio .v-btn:hover { transform: translateY(-1px); border-color: var(--accento); }
    .lab-specchio .v-btn:disabled { opacity: .45; cursor: default; transform: none; }
    .lab-specchio .v-scelta { border-style: dashed; border-color: var(--accento); color: var(--accento-testo); background: var(--accento-tenue); animation: lab-specchio-attesa 1.6s ease-in-out infinite; }
    .lab-specchio .v-scelta:disabled { animation: none; }
    .lab-specchio .v-gira.ok { border-color: var(--ok); color: var(--ok); background: var(--ok-tenue); }
    .lab-specchio .v-gira.no { border-color: var(--no); color: var(--no); background: var(--no-tenue); }
    .lab-specchio .v-gira.gira { animation: lab-specchio-gira .42s var(--morbido); }
    @keyframes lab-specchio-gira { from { transform: rotateY(180deg) scale(.9); } to { transform: none; } }
    @keyframes lab-specchio-attesa { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accento) 40%, transparent); } 50% { box-shadow: 0 0 0 6px transparent; } }
    .lab-specchio .verso-nota { text-align: center; font-size: .84rem; color: var(--testo2); min-height: 1.5em; padding: 6px 16px 0; line-height: 1.4; }
    .lab-specchio .verso-nota.no { color: var(--no); }
    .lab-specchio .mosse { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 10px 12px 6px; }
    .lab-specchio .mossa { min-width: 62px; min-height: 46px; font: 600 1.06rem var(--font); border-radius: 14px; padding: 6px 12px; box-shadow: var(--ombra); }
    .lab-specchio .mossa:disabled { box-shadow: none; }
    .lab-specchio .storia { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px 4px; padding: 4px 12px 2px; font-size: .9rem; color: var(--testo2); }
    .lab-specchio .storia .katex { font-size: 1em; }
    .lab-specchio .rel-s { padding: 2px 9px; border-radius: 9px; background: var(--sup2); border: 1px solid var(--bordo); white-space: nowrap; }
    .lab-specchio .rel-s.errato { background: var(--no-tenue); border-color: var(--no); color: var(--no); }
    .lab-specchio .passo { display: inline-flex; flex-direction: column; align-items: center; line-height: 1; font-size: .74rem; color: var(--testo3); padding: 0 2px; }
    .lab-specchio .passo b { font-weight: 600; color: var(--accento-testo); margin-bottom: 1px; }
    .lab-specchio .livelli { display: flex; gap: 6px; flex-wrap: wrap; }
    .lab-specchio .pill { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid var(--bordo2); background: var(--sup);
      color: var(--testo2); font: 700 .95rem var(--font); cursor: pointer; padding: 0; transition: transform .3s var(--molla), background .2s, color .2s; }
    .lab-specchio .pill.fatto { background: var(--ok-tenue); color: var(--ok); border-color: color-mix(in srgb, var(--ok) 45%, var(--bordo)); }
    .lab-specchio .pill.qui { background: var(--accento); color: #fff; border-color: var(--accento); transform: scale(1.07); }
    .lab-specchio .pill[disabled] { opacity: .35; cursor: default; }
    .lab-specchio .lab-barra .btn[disabled] { opacity: .38; cursor: default; }
    .lab-specchio .b-aiuto { min-width: 42px; }
    .lab-specchio .lab-messaggio { line-height: 1.5; }
    .lab-specchio .lab-messaggio .katex { font-size: 1em; }
    .lab-specchio .vinto { display: inline-block; animation: lab-specchio-pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-specchio-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-specchio .scuoti { animation: lab-specchio-no .38s ease; }
    @keyframes lab-specchio-no { 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
    @media (min-width: 700px) { .lab-specchio .lato { font-size: 1.85rem; } .lab-specchio .v-btn { width: 58px; height: 58px; font-size: 1.75rem; } .lab-specchio .storia { font-size: 1rem; } }
  `;

  /* ---------------- frazioni (i conti restano esatti anche con :3 o ×(−1/2)) ---------------- */
  const mcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; };
  const F = (n, d) => { d = d == null ? 1 : d; if (d < 0) { n = -n; d = -d; } const g = mcd(n, d); return { n: n / g, d: d / g }; };
  const somma = (x, y) => F(x.n * y.d + y.n * x.d, x.d * y.d);
  const prodotto = (x, y) => F(x.n * y.n, x.d * y.d);
  const val = x => x.n / x.d;
  const MENO = '−';
  const fTex = x => x.d === 1 ? String(x.n) : (x.n < 0 ? '-' : '') + '\\dfrac{' + Math.abs(x.n) + '}{' + x.d + '}';
  const fTxt = x => (x.n < 0 ? MENO : '') + Math.abs(x.n) + (x.d === 1 ? '' : '/' + x.d);

  /* espressione a·x + b, in LaTeX e in testo semplice (per il gettone) */
  function espTex(a, b) {
    let s;
    if (a.d === 1) s = a.n === 1 ? 'x' : a.n === -1 ? '-x' : a.n + 'x';
    else { const p = Math.abs(a.n); s = (a.n < 0 ? '-' : '') + '\\dfrac{' + (p === 1 ? '' : p) + 'x}{' + a.d + '}'; }
    if (b.n) s += (b.n > 0 ? ' + ' : ' - ') + fTex(F(Math.abs(b.n), b.d));
    return s;
  }
  function espTxt(a, b) {
    let s;
    if (a.d === 1) s = a.n === 1 ? 'x' : a.n === -1 ? MENO + 'x' : fTxt(a) + 'x';
    else { const p = Math.abs(a.n); s = (a.n < 0 ? MENO : '') + (p === 1 ? '' : p) + 'x/' + a.d; }
    if (b.n) s += (b.n > 0 ? ' + ' : ' ' + MENO + ' ') + fTxt(F(Math.abs(b.n), b.d));
    return s;
  }

  /* il verso: 'lt' (A a sinistra di B) o 'gt'; stretto = < >, largo = ≤ ≥ */
  const opposto = d => d === 'lt' ? 'gt' : 'lt';
  const simbolo = (d, stretto) => d === 'lt' ? (stretto ? '<' : '≤') : (stretto ? '>' : '≥');
  const simTex = (d, stretto) => d === 'lt' ? (stretto ? '<' : '\\le') : (stretto ? '>' : '\\ge');
  const confronta = (x, y, d, stretto) => { const a = val(x), b = val(y); return d === 'lt' ? (stretto ? a < b : a <= b) : (stretto ? a > b : a >= b); };

  /* le mosse, scritte come sui pulsanti: +3, −3, ×2, ×(−1), :2, :(−2) */
  function mossa(et) {
    const s = et.replace(/−/g, '-').replace(/[()]/g, '');
    if (s[0] === '+' || s[0] === '-') return { et, tipo: 'somma', k: F(+s) };
    const n = +s.slice(1);
    return s[0] === '×' ? { et, tipo: 'per', m: F(n) } : { et, tipo: 'per', m: F(1, n) };
  }
  const specchia = m => m.tipo === 'per' && val(m.m) < 0;
  const par = x => x < 0 ? '(' + x + ')' : String(x);

  /* ---------------- livelli ----------------
     parte 1: A e B numeri. meta: 'bandiera' (porta B su v) o 'sorpasso' (B a sinistra di A).
     parte 2: A = a·x + b, B = c, verso di partenza dir. sost(x) = il primo membro con x sostituito, in LaTeX. */
  const LIVELLI = [
    { parte: 1, A: 2, B: 5, mosse: ['+1', '−1', '+3', '−3'], meta: { tipo: 'bandiera', v: -1 },
      testo: 'Due gettoni sul binario: **A** vale 2 e **B** vale 5, quindi $2 < 5$, perché A sta più a sinistra. Ogni pulsante agisce su **tutti e due**. Porta **B** sulla sagoma tratteggiata, e dopo ogni mossa scegli tu il verso.',
      aiuto: 'Un pulsante come −3 toglie 3 a tutti e due i gettoni: scivolano insieme verso sinistra, uno accanto all\'altro come prima. Dopo la mossa guarda il binario: se A sta a sinistra di B il verso è <, se sta a destra è >.',
      vittoria: 'In tutto hai tolto 6 a tutti e due: sono scivolati insieme e A è rimasto a sinistra di B. Da 2 < 5 a −4 < −1: sommando o togliendo lo stesso numero il verso non cambia.' },
    { parte: 1, A: -1, B: 2, mosse: ['+1', '−1', '×2', '×3', ':2'], meta: { tipo: 'bandiera', v: 12 },
      testo: 'Adesso A vale −1 e B vale 2. Porta **B** sulla sagoma, sul 12, usando anche le moltiplicazioni. Guarda che cosa fanno ai gettoni e al verso.',
      aiuto: '×2 raddoppia tutti e due i numeri: ogni gettone si allontana dallo zero restando dalla sua parte, e A che è negativo va ancora più a sinistra. Cerca quali moltiplicazioni portano il 2 fino a 12. Un pulsante spento vuol dire che un gettone uscirebbe dal binario o non finirebbe su un numero intero.',
      vittoria: 'Moltiplicando per un numero positivo ogni gettone si allontana dallo zero restando dalla sua parte. A è sempre a sinistra di B, e il verso resta <.' },
    { parte: 1, A: 2, B: 5, mosse: ['+1', '−1', '×2', '×(−1)'], meta: { tipo: 'sorpasso' },
      testo: 'Di nuovo $2 < 5$. Stavolta fai passare **B** a sinistra di **A**. Con le somme ci riesci? Prova tutti i pulsanti.',
      aiuto: 'Sommare e togliere fa scivolare i gettoni insieme; ×2 li allontana dallo zero, ognuno dalla sua parte. Serve una mossa che mandi ogni numero dall\'altra parte dello zero. Quando l\'hai trovata, guarda bene chi sta a sinistra prima di scegliere il verso.',
      vittoria: 'Moltiplicare per −1 manda ogni numero nel suo opposto, dall\'altra parte dello zero: il binario si specchia e chi stava a sinistra finisce a destra. Per questo il verso si gira.' },
    { parte: 2, a: F(1), b: F(3), c: F(7), dir: 'lt', stretto: true, mosse: ['+1', '−1', '+3', '−3', '×(−1)'],
      sost: x => par(x) + ' + 3',
      testo: 'Adesso **A** è un numero che non conosci: vale $x + 3$, e $x + 3 < 7$ dice che sta a sinistra di **B**. La fascia colorata sono tutti i posti dove può stare. Fai mosse su tutti e due i lati finché a sinistra resta solo $x$, e dopo ogni mossa scegli tu il verso.',
      aiuto: 'Per togliere il + 3 che sta con la x serve la mossa opposta, fatta a tutti e due i lati. Dopo ogni mossa chiediti che cosa ha fatto al binario: se l\'ha solo fatto scivolare, A resta dalla stessa parte di B. Quando resta solo x la scena controlla la tua fascia, e puoi toccare il binario per provare un valore.',
      vittoria: 'Togliere 3 da tutti e due i lati fa scivolare insieme la fascia e il 7: la fascia resta a sinistra e il verso resta <. Le soluzioni sono tutti i numeri minori di 4.' },
    { parte: 2, a: F(-2), b: F(0), c: F(6), dir: 'gt', stretto: true, mosse: ['+2', '−2', '×2', ':2', '×(−1)', ':(−2)'],
      sost: x => '-2\\cdot ' + par(x),
      testo: 'Risolvi $-2x > 6$. Per liberare la $x$ bisogna dividere, e il numero davanti alla $x$ è negativo.',
      aiuto: 'Per lasciare sola la x dividi per il numero che la moltiplica, segno compreso (oppure in due passi: prima ×(−1), poi :2). Ripensa al livello 3: prima di scegliere il verso chiediti se la mossa ha specchiato il binario. Quando resta solo x, tocca il binario per provare un valore nella disequazione di partenza.',
      vittoria: 'Dividendo per −2 il binario si specchia: la fascia che stava a destra del 6 finisce a sinistra del −3. Le soluzioni sono x < −3; con x = −5, per esempio, −2·(−5) = 10 > 6 è vero.' },
    { parte: 2, a: F(-1, 2), b: F(1), c: F(4), dir: 'gt', stretto: false, mosse: ['+1', '−1', '×2', ':2', '×(−1)', '×(−2)'],
      sost: x => '-\\dfrac{' + x + '}{2} + 1',
      testo: 'L\'ultima: $-\\dfrac{x}{2} + 1 \\ge 4$. Servono almeno due mosse, e il verso lo decidi tu ogni volta.',
      aiuto: 'Prima togli il numero che sta insieme alla x, poi liberala dalla frazione e dal segno meno: ×(−2) fa le due cose in una volta sola. Il ≥ si comporta come il >: una somma lo lascia com\'è, un numero negativo lo gira in ≤.',
      vittoria: 'Il −1 ha fatto scivolare tutto, il ×(−2) ha specchiato il binario: x ≤ −6. Il pallino pieno dice che anche −6 va bene, perché −(−6)/2 + 1 = 4 e 4 ≥ 4 è vero.' }
  ];

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) if (a[k] != null) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const morsa = (v, a, b) => Math.max(a, Math.min(b, v));
  const dolce = t => .5 - .5 * Math.cos(Math.PI * t);
  const liscia = t => 1 - Math.pow(1 - t, 3);
  const R = 12;                                  /* il binario va da −12 a 12 */

  /* geometria in pixel veri: il viewBox è largo quanto la scena */
  function geometria(W) {
    const largo = W >= 560;
    const k = largo ? Math.min(1.35, .95 + W / 2400) : 1;
    const M = largo ? Math.round(Math.max(48, W * .06)) : 24;
    const ppu = (W - 2 * M) / (2 * R);
    const H = Math.round(196 * k);
    const yR = Math.round(96 * k);               /* centro del binario */
    return { W, H, M, k, largo, ppu, X0: W / 2, yR, yA: Math.round(36 * k), yB: H - Math.round(32 * k), yN: yR + Math.round(25 * k),
      X: v => W / 2 + v * ppu };
  }

  COMPASSO.registraLab({
    id: 'specchio',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-specchio')) { const s = document.createElement('style'); s.id = 'stile-lab-specchio'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-specchio');
      radice.innerHTML = `
        <div class="obiettivo"></div>
        <div class="aiuto" hidden></div>
        <div class="lab-scena"></div>
        <div class="rel"><span class="lato lato-a"></span><span class="verso"></span><span class="lato lato-b"></span></div>
        <div class="verso-nota"></div>
        <div class="mosse" role="group" aria-label="Mosse, fatte a tutti e due i gettoni"></div>
        <div class="storia" aria-label="Passaggi"></div>
        <div class="lab-messaggio" aria-live="polite"></div>
        <div class="lab-barra">
          <div class="livelli" role="group" aria-label="Livelli"></div>
          <button type="button" class="btn piccolo b-aiuto" title="Come si fa">?</button>
          <button type="button" class="btn piccolo b-annulla">Annulla</button>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <span class="lab-livello"></span>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), objEl = q('.obiettivo'), aiutoEl = q('.aiuto');
      const latoA = q('.lato-a'), latoB = q('.lato-b'), versoEl = q('.verso'), notaEl = q('.verso-nota');
      const mosseEl = q('.mosse'), storiaEl = q('.storia'), msg = q('.lab-messaggio'), pillEl = q('.livelli'), livEl = q('.lab-livello');
      const bAiuto = q('.b-aiuto'), bAnnulla = q('.b-annulla'), bRic = q('.b-ric');

      /* ---------------- stato ---------------- */
      const completati = ctx.stato().livelli;
      let livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = LIVELLI.length - 1;
      let st = null, pila = [], vinto = false, animando = false, tr = null, sw = 1;
      let sonda = null, mostraErrori = false, zenDetto = false, avvisoSonda = false;
      let G = null, raf = 0, rafFesta = 0, fermaAnim = null;
      const timers = [];
      const dopo = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
      const liv = () => LIVELLI[livello];
      const p1 = () => liv().parte === 1;
      const stretto = () => p1() ? true : liv().stretto;
      const risolto = s => !p1() && s.a.n === 1 && s.a.d === 1 && s.b.n === 0;

      /* ---------------- scena SVG ---------------- */
      const svg = el('svg', { role: 'img', 'aria-label': 'Binario dei numeri con due gettoni, A sopra e B sotto' });
      scena.appendChild(svg);
      let gFissi, gDin, gFesta;

      function costruisci() {
        const W = Math.max(300, Math.round(scena.clientWidth || 360));
        G = geometria(W);
        const { H, k } = G;
        vuota(svg);
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svg.setAttribute('height', H);
        const defs = el('defs'); svg.appendChild(defs);
        const binG = el('linearGradient', { id: 'lab-specchio-bin', x1: 0, y1: 0, x2: 0, y2: 1 });
        binG.appendChild(el('stop', { offset: 0, style: 'stop-color:var(--sup)' }));
        binG.appendChild(el('stop', { offset: 1, style: 'stop-color:var(--bordo2)' }));
        defs.appendChild(binG);
        const vetro = el('linearGradient', { id: 'lab-specchio-vetro', x1: 0, y1: 0, x2: 1, y2: 0 });
        [[0, 0], [.5, .55], [1, 0]].forEach(([o, a]) => vetro.appendChild(el('stop', { offset: o, style: `stop-color:var(--accento);stop-opacity:${a}` })));
        defs.appendChild(vetro);

        /* numeri sotto il binario: restano fermi, sono i posti della retta */
        gFissi = el('g'); svg.appendChild(gFissi);
        const passo = G.ppu >= 24 ? 1 : 2;
        for (let i = -R; i <= R; i += passo) {
          gFissi.appendChild(el('text', { x: G.X(i), y: G.yN, 'text-anchor': 'middle', fill: i ? 'var(--testo2)' : 'var(--testo)',
            style: `font: ${i ? 500 : 700} ${Math.round(10.5 * k)}px var(--font)`, 'paint-order': 'stroke', stroke: 'var(--sup2)', 'stroke-width': 3 }, i < 0 ? MENO + (-i) : String(i)));
        }
        gDin = el('g'); svg.insertBefore(gDin, gFissi);
        gFesta = el('g', { 'pointer-events': 'none' }); svg.appendChild(gFesta);
        disegna();
      }

      /* dove si vede un gettone che valeva v0 mentre la mossa op è a metà (e da 0 a 1).
         Le mosse che specchiano ruotano il binario attorno allo zero, in prospettiva. */
      const VMAX = R + .7;
      function statico(v) { return { x: G.X(morsa(v, -VMAX, VMAX)), s: 1, c: 1, fuori: Math.abs(v) > VMAX ? Math.sign(v) : 0 }; }
      function proietta(u, th) {                     /* u = pixel dallo zero prima di girare */
        const D = G.ppu * R * 2.4, z = u * Math.sin(th) * .6, s = D / (D + z);
        return { x: G.X0 + u * Math.cos(th) * s, s, c: Math.cos(th), fuori: 0 };
      }
      function posa(v0, op, e) {
        if (!op || e >= 1) return statico(op ? applicaV(v0, op) : v0);
        if (op.tipo === 'somma') return statico(v0 + val(op.k) * e);
        const m = val(op.m);
        if (m > 0) return statico(v0 * (1 + (m - 1) * e));
        const mag = 1 + (Math.abs(m) - 1) * e;
        return proietta(morsa(v0 * mag, -VMAX, VMAX) * G.ppu, Math.PI * e);
      }
      const applicaV = (v, op) => op.tipo === 'somma' ? v + val(op.k) : v * val(op.m);
      const yP = (y, s) => G.yR + (y - G.yR) * s;

      function binario(th) {
        const k = G.k, hh = 6 * k, U = R * G.ppu + 14 * k, g = el('g', { class: 'binario' });
        if (th) {
          const a = proietta(-U, th), b = proietta(U, th);
          g.appendChild(el('path', { d: `M${a.x} ${yP(G.yR - hh, a.s)} L${b.x} ${yP(G.yR - hh, b.s)} L${b.x} ${yP(G.yR + hh, b.s)} L${a.x} ${yP(G.yR + hh, a.s)} Z`,
            fill: 'url(#lab-specchio-bin)', stroke: 'var(--testo3)', 'stroke-width': 1, 'stroke-opacity': .6 }));
        } else {
          g.appendChild(el('rect', { x: G.X0 - U, y: G.yR - hh, width: 2 * U, height: 2 * hh, rx: hh, fill: 'url(#lab-specchio-bin)', stroke: 'var(--testo3)', 'stroke-width': 1, 'stroke-opacity': .6 }));
        }
        for (let i = -R; i <= R; i++) {                 /* traversine: una per ogni intero */
          const p = th ? proietta(i * G.ppu, th) : { x: G.X(i), s: 1 };
          const t = hh * p.s * (i % 5 === 0 ? 1.25 : .75);
          g.appendChild(el('line', { x1: p.x, y1: G.yR - t, x2: p.x, y2: G.yR + t, stroke: i ? 'var(--testo3)' : 'var(--testo)', 'stroke-width': i ? (i % 5 ? 1 : 1.6) : 2.2, opacity: i ? .6 : .9 }));
        }
        gDin.appendChild(g);
      }

      /* lo specchio: una lastra di vetro in piedi sullo zero, si accende mentre il binario gira */
      function lastra(luce) {
        const x = G.X0, k = G.k, y0 = 8 * k, y1 = G.H - 8 * k;
        gDin.appendChild(el('rect', { x: x - 9 * k, y: y0, width: 18 * k, height: y1 - y0, rx: 9 * k, fill: 'url(#lab-specchio-vetro)', opacity: .22 + .7 * luce }));
        gDin.appendChild(el('line', { x1: x, y1: y0 + 6 * k, x2: x, y2: y1 - 6 * k, stroke: 'var(--accento)', 'stroke-width': 1, opacity: .28 + .5 * luce, 'stroke-dasharray': '3 4' }));
      }

      /* un gettone: A sta sopra il binario, B sotto. p = {x, s, c}; c è il coseno della rotazione (la moneta che gira) */
      function gettone(chi, p, testo, opz) {
        opz = opz || {};
        const k = G.k, sopra = chi === 'A', col = chi === 'A' ? 'var(--s1)' : 'var(--s2)';
        const g = el('g', { class: 'pin', opacity: opz.op != null ? opz.op : 1 });
        const yh = yP(sopra ? G.yA : G.yB, p.s), yE = yP(G.yR + (sopra ? -7 : 7) * k, p.s);
        const sx = Math.max(.06, Math.abs(p.c)) * p.s, r = 16 * k * p.s;
        g.appendChild(el('line', { x1: p.x, y1: yE, x2: p.x, y2: yh + (sopra ? r * .8 : -r * .8), stroke: col, 'stroke-width': 2.6 * k, 'stroke-linecap': 'round' }));
        const f = Math.round(13 * k);
        const largo = opz.pillola ? Math.max(34 * k, testo.length * f * .6 + 18 * k) : 32 * k;
        if (opz.pillola) g.appendChild(el('rect', { x: p.x - largo * sx / 2, y: yh - 15 * k * p.s, width: largo * sx, height: 30 * k * p.s, rx: 15 * k * Math.min(sx, p.s), fill: col, stroke: 'var(--sup)', 'stroke-width': 2 }));
        else g.appendChild(el('ellipse', { cx: p.x, cy: yh, rx: r * Math.max(.06, Math.abs(p.c)), ry: r, fill: col, stroke: 'var(--sup)', 'stroke-width': 2 }));
        if (Math.abs(p.c) > .22) g.appendChild(el('text', { transform: `translate(${p.x.toFixed(1)} ${yh.toFixed(1)}) scale(${sx.toFixed(3)} ${p.s.toFixed(3)})`, y: f * .36, 'text-anchor': 'middle', fill: '#fff', style: `font: 700 ${f}px var(--font)` }, testo));
        /* la lettera, fuori dalla testa */
        if (Math.abs(p.c) > .5) {
          const dx = (opz.pillola ? largo * sx / 2 : r) + 7 * k;
          g.appendChild(el('text', { x: p.x + dx, y: yh + 4 * k, 'text-anchor': 'start', fill: col, style: `font: 800 ${Math.round(11 * k)}px var(--font)` }, chi));
        }
        if (opz.dubbio) {                               /* A in attesa del verso */
          const bx = p.x - (opz.pillola ? largo * sx / 2 : r) - 2 * k, by = yh - 13 * k;
          g.appendChild(el('circle', { cx: bx, cy: by, r: 9 * k, fill: 'var(--accento)', stroke: 'var(--sup)', 'stroke-width': 2 }));
          g.appendChild(el('text', { x: bx, y: by + 4 * k, 'text-anchor': 'middle', fill: '#fff', style: `font: 800 ${Math.round(12 * k)}px var(--font)` }, '?'));
        }
        if (p.fuori) {                                  /* oltre la fine del binario */
          const xa = p.x + p.fuori * 10 * k;
          g.appendChild(el('path', { d: `M${xa} ${G.yR - 5 * k} l${p.fuori * 7 * k} ${5 * k} l${-p.fuori * 7 * k} ${5 * k} Z`, fill: col }));
        }
        if (!opz.senzaPunta) g.appendChild(el('circle', { cx: p.x, cy: G.yR, r: 4.2 * k * p.s, fill: col, stroke: 'var(--sup)', 'stroke-width': 1.5 }));
        gDin.appendChild(g);
        return g;
      }

      /* sagoma tratteggiata: dove deve arrivare B (parte 1) */
      function sagoma(v) {
        const k = G.k, x = G.X(v), g = el('g', { opacity: .75 });
        g.appendChild(el('line', { x1: x, y1: G.yR + 8 * k, x2: x, y2: G.yB - 16 * k, stroke: 'var(--s2)', 'stroke-width': 2, 'stroke-dasharray': '3 4' }));
        g.appendChild(el('circle', { cx: x, cy: G.yB, r: 16 * k, fill: 'var(--sup)', stroke: 'var(--s2)', 'stroke-width': 2, 'stroke-dasharray': '5 4' }));
        g.appendChild(el('text', { x, y: G.yB + 4.5 * k, 'text-anchor': 'middle', fill: 'var(--s2)', style: `font: 700 ${Math.round(12.5 * k)}px var(--font)` }, fTxt(F(v))));
        gDin.appendChild(g);
      }

      /* la fascia dove può stare A (parte 2): parte dal pallino di B e va verso un'estremità */
      function fascia(cv, d, frac, op, stato) {
        if (frac <= 0 || op <= 0) return;
        const k = G.k, col = stato === 'no' ? 'var(--no)' : stato === 'ok' ? 'var(--ok)' : 'var(--s1)';
        const xc = G.X(morsa(cv, -VMAX, VMAX)), xf = d === 'gt' ? G.X(R) + 14 * k : G.X(-R) - 14 * k;
        const x1 = xc + (xf - xc) * frac, a = Math.min(xc, x1), b = Math.max(xc, x1);
        const g = el('g', { opacity: op });
        g.appendChild(el('rect', { x: a, y: G.yR - 13 * k, width: Math.max(0, b - a), height: 26 * k, rx: 8 * k, fill: col, opacity: .18 }));
        g.appendChild(el('line', { x1: xc, y1: G.yR, x2: x1 - (d === 'gt' ? 6 : -6) * k, y2: G.yR, stroke: col, 'stroke-width': 5 * k, 'stroke-linecap': 'round', opacity: .85 }));
        if (Math.abs(x1 - xc) > 12 * k) g.appendChild(el('path', { d: `M${x1} ${G.yR} l${d === 'gt' ? -11 * k : 11 * k} ${-7 * k} l0 ${14 * k} Z`, fill: col }));
        gDin.appendChild(g);
        return col;
      }
      function pallino(cv, col) {
        const x = G.X(morsa(cv, -VMAX, VMAX));
        gDin.appendChild(el('circle', { cx: x, cy: G.yR, r: 6.5 * G.k, fill: stretto() ? 'var(--sup)' : col, stroke: col, 'stroke-width': 2.8 * G.k }));
      }
      /* centro della fascia, dove si mette il gettone A */
      function centroFascia(cv, d) {
        const c = morsa(cv, -R, R), fine = d === 'gt' ? R : -R;
        return c + (fine - c) / 2;
      }

      /* la sonda: un valore di prova messo dallo studente, o dalla scena dopo un errore */
      function disegnaSonda() {
        if (sonda == null) return;
        const k = G.k, x = G.X(sonda), esito = esitoSonda(sonda), col = esito.torna ? 'var(--ok)' : 'var(--no)';
        const testo = 'x = ' + fTxt(F(sonda)) + (esito.vero ? '  ✓' : '  ✗'), f = Math.round(11.5 * k), w = testo.length * f * .58 + 14 * k;
        const y = G.yR - 30 * k, cx = morsa(x, w / 2 + 2, G.W - w / 2 - 2);
        const g = el('g');
        g.appendChild(el('line', { x1: x, y1: y + 9 * k, x2: x, y2: G.yR - 8 * k, stroke: col, 'stroke-width': 2, 'stroke-dasharray': '3 3' }));
        g.appendChild(el('path', { d: `M${x - 5 * k} ${G.yR - 12 * k} L${x + 5 * k} ${G.yR - 12 * k} L${x} ${G.yR - 5 * k} Z`, fill: col }));
        g.appendChild(el('rect', { x: cx - w / 2, y: y - 10 * k, width: w, height: 20 * k, rx: 10 * k, fill: col }));
        g.appendChild(el('text', { x: cx, y: y + 4 * k, 'text-anchor': 'middle', fill: '#fff', style: `font: 700 ${f}px var(--font)` }, testo));
        gDin.appendChild(g);
      }

      function disegna() {
        if (!G) return;
        vuota(gDin);
        const L = liv(), e = tr ? tr.e : 1;
        const flip = tr && specchia(tr.op) && e < 1 ? Math.PI * e : 0;
        lastra(flip ? Math.sin(flip) : 0);
        binario(flip);
        if (L.parte === 1) {
          if (L.meta.tipo === 'bandiera' && !vinto) sagoma(L.meta.v);
          const s0 = tr ? tr.st0 : st;
          const pA = tr ? posa(val(s0.A), tr.op, e) : statico(val(st.A));
          const pB = tr ? posa(val(s0.B), tr.op, e) : statico(val(st.B));
          /* chi è più lontano (in prospettiva) va disegnato prima */
          const ordine = pA.s < pB.s ? [['A', pA, st.A], ['B', pB, st.B]] : [['B', pB, st.B], ['A', pA, st.A]];
          /* il numero sul gettone cambia a metà mossa: nel ribaltamento è quando la moneta è di taglio */
          ordine.forEach(([chi, p, v]) => gettone(chi, p, fTxt(tr && e < .5 ? (chi === 'A' ? s0.A : s0.B) : v), {}));
        } else {
          const s0 = tr ? tr.st0 : st;
          const pB = tr ? posa(val(s0.c), tr.op, e) : statico(val(st.c));
          const sT = tr && e < .5 ? s0 : st, testoB = fTxt(sT.c), testoA = espTxt(sT.a, sT.b);
          let col = 'var(--s1)';
          if (tr) {                                    /* la fascia vecchia si spegne, A torna sopra B in attesa */
            if (s0.dir) fascia(val(s0.c), s0.dir, 1, Math.max(0, 1 - e * 3.5));
            const x0 = s0.dir ? G.X(centroFascia(val(s0.c), s0.dir)) : G.X(val(s0.c)), q = Math.min(1, e * 2.5);
            gettone('B', pB, testoB, { senzaPunta: true });
            gettone('A', { x: x0 + (pB.x - x0) * q, s: pB.s, c: q < 1 ? 1 : pB.c, fuori: 0 }, testoA, { pillola: true, dubbio: true, senzaPunta: true });
            gDin.appendChild(el('circle', { cx: pB.x, cy: G.yR, r: 6 * G.k * pB.s, fill: 'var(--s2)', stroke: 'var(--sup)', 'stroke-width': 1.5 }));
          } else {
            const cv = val(st.c);
            const stato = vinto ? 'ok' : (mostraErrori && st.dir !== st.giusto ? 'no' : null);
            if (st.dir) col = fascia(cv, st.dir, sw, 1, stato) || col;
            gettone('B', pB, testoB, { senzaPunta: true });
            const xa = st.dir ? G.X(cv) + (G.X(centroFascia(cv, st.dir)) - G.X(cv)) * liscia(sw) : G.X(morsa(cv, -VMAX, VMAX));
            gettone('A', { x: xa, s: 1, c: 1, fuori: 0 }, testoA, { pillola: true, dubbio: !st.dir, senzaPunta: true });
            pallino(cv, st.dir ? col : 'var(--s2)');
            disegnaSonda();
          }
        }
        scena.classList.toggle('sonda-ok', !p1() && risolto(st) && !!st.dir && !animando);
      }

      /* animazione generica: rAF, con la riserva a tempo se rAF è strozzato (anteprime, schede nascoste) */
      function anima(dur, passo, poi) {
        if (fermaAnim) fermaAnim();
        animando = true;
        const t0 = performance.now();
        let chiuso = false;
        const fine = () => { if (chiuso) return; chiuso = true; cancelAnimationFrame(raf); raf = 0; fermaAnim = null; passo(1); animando = false; if (poi) poi(); };
        fermaAnim = () => { chiuso = true; cancelAnimationFrame(raf); raf = 0; fermaAnim = null; animando = false; };
        const frame = tt => {
          if (chiuso) return;
          const u = Math.min(1, (tt - t0) / dur);
          passo(dolce(u));
          if (u < 1) raf = requestAnimationFrame(frame); else fine();
        };
        raf = requestAnimationFrame(frame);
        dopo(fine, dur + 250);
      }

      /* festa a livello superato: scintille dal punto d'arrivo */
      function festa(cx) {
        const k = G.k, cy = G.yR;
        vuota(gFesta);
        const colori = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--ok)', 'var(--accento)'];
        const anello = el('circle', { cx, cy, r: 4, fill: 'none', stroke: 'var(--ok)', 'stroke-width': 3 }); gFesta.appendChild(anello);
        const pezzi = [];
        for (let i = 0; i < 20; i++) {
          const ang = -Math.PI * (.05 + .9 * i / 19) + (i % 2 ? .12 : -.12), v = (58 + (i * 37) % 54) * k;
          const n = i % 3 ? el('circle', { r: 3.3 * k, fill: colori[i % colori.length] }) : el('rect', { width: 6 * k, height: 6 * k, rx: 1.5, fill: colori[i % colori.length] });
          gFesta.appendChild(n); pezzi.push({ n, ang, v, rot: i * 40 });
        }
        const t0 = performance.now(), dur = 720;
        let chiuso = false;
        const chiudi = () => { if (chiuso) return; chiuso = true; cancelAnimationFrame(rafFesta); rafFesta = 0; vuota(gFesta); };
        const passo = tt => {
          if (chiuso) return;
          const u = Math.min(1, (tt - t0) / dur);
          anello.setAttribute('r', (4 + 34 * liscia(u)) * k); anello.setAttribute('opacity', 1 - u);
          pezzi.forEach(p => {
            const d = p.v * liscia(u), x = cx + Math.cos(p.ang) * d, y = cy + Math.sin(p.ang) * d + 40 * k * u * u;
            if (p.n.tagName === 'circle') { p.n.setAttribute('cx', x); p.n.setAttribute('cy', y); }
            else { p.n.setAttribute('x', x - 3 * k); p.n.setAttribute('y', y - 3 * k); p.n.setAttribute('transform', `rotate(${p.rot + u * 220} ${x} ${y})`); }
            p.n.setAttribute('opacity', u < .6 ? 1 : 1 - (u - .6) / .4);
          });
          if (u < 1) rafFesta = requestAnimationFrame(passo); else chiudi();
        };
        rafFesta = requestAnimationFrame(passo);
        dopo(chiudi, dur + 300);
      }

      /* ---------------- logica ---------------- */
      function applica(s, m) {
        const f = x => m.tipo === 'somma' ? somma(x, m.k) : prodotto(x, m.m);
        if (p1()) { const A = f(s.A), B = f(s.B); return { A, B, dir: null, giusto: val(A) < val(B) ? 'lt' : 'gt', op: m }; }
        return { a: m.tipo === 'somma' ? s.a : prodotto(s.a, m.m), b: f(s.b), c: f(s.c), dir: null, giusto: specchia(m) ? opposto(s.giusto) : s.giusto, op: m };
      }
      function possibile(m) {
        const n = applica(st, m);
        if (p1()) return [n.A, n.B].every(x => x.d === 1 && Math.abs(x.n) <= R);
        return Math.abs(val(n.c)) <= 99 && n.c.d <= 24 && n.a.d <= 24;
      }
      function relTex(s) {
        const sy = s.dir ? simTex(s.dir, stretto()) : '\\;?\\;';
        return p1() ? fTex(s.A) + ' ' + sy + ' ' + fTex(s.B) : espTex(s.a, s.b) + ' ' + sy + ' ' + fTex(s.c);
      }
      const esc = t => t.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      /* la prova con un valore: vale nella disequazione di partenza? sta nella fascia dello studente? */
      function esitoSonda(x0) {
        const L = liv(), X = F(x0), Lx = somma(prodotto(L.a, X), L.b);
        const vero = confronta(Lx, L.c, L.dir, L.stretto);
        const dentro = !!st.dir && confronta(X, st.c, st.dir, L.stretto);
        return { Lx, vero, dentro, torna: vero === dentro };
      }
      function testoSonda(x0) {
        const L = liv(), es = esitoSonda(x0), xs = fTxt(F(x0));
        const conto = ctx.tex(L.sost(x0) + ' = ' + fTex(es.Lx) + ' ' + simTex(L.dir, L.stretto) + ' ' + fTex(L.c));
        let s = 'Prova con ' + ctx.tex('x = ' + x0) + ' nella disequazione di partenza: ' + conto + (es.vero ? ' è vero' : ' è falso');
        if (es.torna) s += es.dentro ? ', e ' + xs + ' sta nella tua fascia: torna.' : ', e infatti ' + xs + ' è fuori dalla tua fascia: torna.';
        else s += es.dentro ? ', ma ' + xs + ' sta nella tua fascia.' : ', ma ' + xs + ' è fuori dalla tua fascia.';
        return s;
      }
      function sceltaSonda() {
        const k = val(st.c), sg = st.dir === 'gt' ? 1 : -1, cand = [0];
        for (let d = 2; d <= 2 * R; d++) cand.push(Math.round(k) + sg * d);
        for (const x of cand) {
          if (Math.abs(x) > R || x === k) continue;
          const es = esitoSonda(x);
          if (es.dentro && !es.vero) return x;
        }
        return null;
      }

      /* ---------------- testi, formula, pulsanti ---------------- */
      let cacheVerso = '';
      function aggiorna() {
        const L = liv(), S = stretto();
        latoA.innerHTML = '<small>A</small>' + ctx.tex(p1() ? fTex(st.A) : espTex(st.a, st.b));
        latoB.innerHTML = '<small>B</small>' + ctx.tex(p1() ? fTex(st.B) : fTex(st.c));
        const blocca = animando || vinto ? ' disabled' : '';
        let h;
        if (!st.dir) {
          h = `<button type="button" class="v-btn v-scelta" data-d="lt" aria-label="A a sinistra di B"${blocca}>${esc(simbolo('lt', S))}</button>` +
              `<button type="button" class="v-btn v-scelta" data-d="gt" aria-label="A a destra di B"${blocca}>${esc(simbolo('gt', S))}</button>`;
        } else {
          const falso = p1() ? st.dir !== st.giusto : (mostraErrori && st.dir !== st.giusto);
          const cl = falso ? ' no' : (p1() || vinto ? ' ok' : '');
          h = `<button type="button" class="v-btn v-gira${cl}" title="Tocca per girare il verso" aria-label="Verso ${esc(simbolo(st.dir, S))}: tocca per girarlo"${blocca}>${esc(simbolo(st.dir, S))}</button>`;
        }
        if (h !== cacheVerso) { versoEl.innerHTML = h; cacheVerso = h; }

        let nota = '', notaNo = false;
        const segni = '(' + simbolo('lt', S) + ') o a destra (' + simbolo('gt', S) + ')';
        if (vinto) nota = p1() ? '' : 'Tocca il binario per provare altri valori di x.';
        else if (!st.dir) nota = animando ? '' : (p1() ? 'Dopo la mossa A sta a sinistra di B ' + segni + '?' : 'Dopo la mossa la fascia di A sta a sinistra di B ' + segni + '?');
        else if (p1() && st.dir !== st.giusto) { nota = 'Guarda il binario: il numero più piccolo è quello più a sinistra.'; notaNo = true; }
        else if (!p1()) nota = risolto(st) ? 'Tocca il binario per provare un valore di x.' : 'Tocca il segno se vuoi girarlo.';
        notaEl.textContent = nota; notaEl.className = 'verso-nota' + (notaNo ? ' no' : '');

        const tutti = pila.concat([st]);
        storiaEl.innerHTML = tutti.map((s, i) => (i ? `<span class="passo"><b>${esc(s.op.et)}</b><span>⟶</span></span>` : '') +
          `<span class="rel-s${mostraErrori && s.dir !== s.giusto ? ' errato' : ''}">${ctx.tex(relTex(s))}</span>`).join('');

        const ferme = vinto || animando || !st.dir || (p1() && st.dir !== st.giusto);
        Array.from(mosseEl.children).forEach(b => {
          const ok = possibile(b._m);
          b.disabled = ferme || !ok;
          b.title = ok ? 'Fai ' + b._m.et + ' a tutti e due' : 'Un gettone uscirebbe dal binario o non finirebbe su un numero intero';
        });
        bAnnulla.disabled = vinto || animando || !pila.length;
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length + ' · mosse: ' + pila.length;
      }
      const scuoti = n => { n.classList.remove('scuoti'); void n.offsetWidth; n.classList.add('scuoti'); };
      function avvisa(html, tipo) { msg.innerHTML = html; msg.className = 'lab-messaggio' + (tipo ? ' ' + tipo : ''); }

      /* ---------------- mosse e verso ---------------- */
      function faiMossa(m) {
        if (vinto || animando || !st.dir || (p1() && st.dir !== st.giusto) || !possibile(m)) return;
        const st0 = st;
        pila.push(st0); st = applica(st0, m);
        sonda = null; mostraErrori = false; avvisa('');
        tr = { st0, op: m, e: 0 };
        anima(specchia(m) ? 580 : 420, e => { if (tr) tr.e = e; disegna(); }, () => { tr = null; disegna(); aggiorna(); });
        aggiorna();
      }
      function scegli(d) {
        if (vinto || animando) return;
        st.dir = d;
        if (p1()) {
          aggiorna();
          const b = versoEl.querySelector('.v-gira'); if (b) b.classList.add('gira');
          if (d !== st.giusto) {
            avvisa('Falso: ' + ctx.tex(relTex(st)) + ' non è vero.', 'no');
            scuoti(versoEl);
            if (st.op && specchia(st.op) && !zenDetto) {
              zenDetto = true;
              ctx.zenone('Guarda il binario: la mossa l\'ha specchiato, e i gettoni si sono scambiati di posto. Il più piccolo è sempre quello che sta più a sinistra.', { tipo: 'errore', espressione: 'sorpreso', durata: 8000 });
            }
          } else {
            avvisa('');
            const L = liv(), fatto = L.meta.tipo === 'bandiera' ? val(st.B) === L.meta.v : val(st.B) < val(st.A);
            if (fatto) vittoria();
          }
          disegna();
        } else {
          mostraErrori = false; sonda = null; avvisa('');
          sw = 0;
          anima(360, e => { sw = e; disegna(); }, () => { sw = 1; disegna(); aggiorna(); if (risolto(st)) controllaFinale(); });
          aggiorna();
          const b = versoEl.querySelector('.v-gira'); if (b) b.classList.add('gira');
        }
      }
      versoEl.addEventListener('click', ev => {
        const b = ev.target.closest('button'); if (!b || b.disabled) return;
        if (b.dataset.d) scegli(b.dataset.d); else if (st.dir) scegli(opposto(st.dir));
      });

      function vittoria() {
        const L = liv();
        vinto = true; sonda = null;
        ctx.completato(livello); pillole();
        avvisa('<span class="vinto">' + (p1() ? 'Fatto: ' : 'Risolta: ') + ctx.tex(relTex(st)) + '</span>', 'ok');
        ctx.zenone(L.vittoria, { espressione: 'orgoglioso', durata: 9000 });
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        bRic.classList.add('primario');
        aggiorna(); disegna();
        festa(G.X(morsa(p1() ? val(st.B) : val(st.c), -R, R)));
      }

      /* parte 2: quando resta solo x, la scena controlla ogni verso scelto */
      function controllaFinale() {
        const tutti = pila.concat([st]);
        const primo = tutti.findIndex(s => s.dir !== s.giusto);
        if (primo < 0) { vittoria(); return; }
        mostraErrori = true;
        const sp = tutti[primo], prec = tutti[primo - 1];
        const tipico = sp.op && specchia(sp.op) && sp.dir === prec.dir;
        const aCaso = sp.op && !specchia(sp.op) && sp.dir !== prec.dir;
        let t;
        if (st.dir !== st.giusto) {
          sonda = sceltaSonda();
          t = (sonda != null ? testoSonda(sonda) + ' ' : '') + 'La tua fascia non è quella delle soluzioni: il verso si è rotto nel passaggio in rosso.';
        } else {
          t = 'Il verso finale è giusto, ma quello del passaggio in rosso no: due errori si sono annullati. Torna indietro con Annulla e rifallo.';
        }
        if (aCaso) t += ' Lì hai girato il verso dopo una mossa che non specchia il binario.';
        avvisa(t, 'no');
        scuoti(msg);
        if (tipico) {
          const n = sp.op.et.slice(1).replace(/[()]/g, '');
          ctx.zenone('Hai ' + (sp.op.et[0] === ':' ? 'diviso' : 'moltiplicato') + ' per ' + n + ' e hai lasciato il verso com\'era. Un numero negativo specchia il binario: chi stava a destra passa a sinistra, e il verso si gira.', { tipo: 'errore', espressione: 'pensa', durata: 9000 });
        }
        aggiorna(); disegna();
      }

      /* toccare il binario = provare un valore di x (solo quando a sinistra resta x) */
      svg.addEventListener('pointerdown', ev => {
        if (!G || p1() || animando) return;
        if (!risolto(st) || !st.dir) {
          if (!avvisoSonda) { avvisoSonda = true; avvisa('Il binario si prova quando a sinistra è rimasta solo x: prima finisci le mosse.'); }
          return;
        }
        const r = svg.getBoundingClientRect(), x = (ev.clientX - r.left) * (G.W / (r.width || 1));
        const x0 = morsa(Math.round((x - G.X0) / G.ppu), -R, R);
        sonda = x0;
        const es = esitoSonda(x0);
        if (!vinto) avvisa(testoSonda(x0), es.torna ? '' : 'no');
        else avvisa('<span class="vinto">Risolta: ' + ctx.tex(relTex(st)) + '</span> <span style="font-weight:400;color:var(--testo)">' + testoSonda(x0) + '</span>', 'ok');
        disegna();
        ev.preventDefault();
      });

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
      function avviaLivello(n) {
        if (fermaAnim) fermaAnim();
        cancelAnimationFrame(rafFesta); rafFesta = 0; if (gFesta) vuota(gFesta);
        livello = n;
        const L = liv();
        st = L.parte === 1 ? { A: F(L.A), B: F(L.B), dir: L.A < L.B ? 'lt' : 'gt', op: null } : { a: L.a, b: L.b, c: L.c, dir: L.dir, op: null };
        st.giusto = st.dir;
        pila = []; vinto = false; animando = false; tr = null; sw = 1; sonda = null;
        mostraErrori = false; zenDetto = false; avvisoSonda = false; cacheVerso = '';
        objEl.innerHTML = '<span class="parte">' + (L.parte === 1 ? 'Parte 1 · due numeri sul binario' : 'Parte 2 · A diventa un\'incognita') + '</span>' + ctx.md(L.testo);
        aiutoEl.hidden = true; aiutoEl.textContent = L.aiuto;
        vuota(mosseEl);
        L.mosse.forEach(et => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'btn mossa'; b.textContent = et; b.dataset.m = et; b._m = mossa(et);
          b.addEventListener('click', () => faiMossa(b._m));
          mosseEl.appendChild(b);
        });
        avvisa('');
        bRic.textContent = 'Ricomincia'; bRic.classList.remove('primario');
        pillole(); aggiorna(); disegna();
      }
      bAnnulla.addEventListener('click', () => {
        if (vinto || animando || !pila.length) return;
        st = pila.pop(); sonda = null; mostraErrori = false; sw = 1; avvisa('');
        aggiorna(); disegna();
      });
      bRic.addEventListener('click', () => avviaLivello(vinto ? (livello + 1) % LIVELLI.length : livello));
      bAiuto.addEventListener('click', () => { aiutoEl.hidden = !aiutoEl.hidden; });

      /* la scena si ridisegna quando cambia larghezza (telefono girato, schermo intero) */
      let largo0 = 0;
      const ro = new ResizeObserver(() => { const w = Math.round(scena.clientWidth); if (w && Math.abs(w - largo0) > 2) { largo0 = w; costruisci(); } });
      ro.observe(scena);
      largo0 = Math.round(scena.clientWidth);
      avviaLivello(livello);
      costruisci();

      return function smonta() {
        if (fermaAnim) fermaAnim();
        cancelAnimationFrame(raf); cancelAnimationFrame(rafFesta);
        timers.forEach(clearTimeout);
        ro.disconnect();
      };
    }
  });
})();
