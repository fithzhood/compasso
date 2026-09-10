/* Laboratorio «Sintonizza l'onda» — la sinusoide y = A sin(ωx + φ).
   Due maniglie sulla curva: C sta sulla prima cresta (su e giù = ampiezza, di lato = fase),
   T sta sulla cresta dopo (di lato = periodo). Niente calamite: gli snap sono uniformi
   (A a mezzi, T e φ a multipli di π/6) e non guardano dov'è il bersaglio. */
(function () {
  const STILE = `
    .lab-onda .lab-scena { max-width: 760px; margin: 0 auto; background: var(--sup2); border-radius: 12px; overflow: hidden; touch-action: none; }
    .lab-onda .griglia { stroke: var(--bordo); stroke-width: 1; }
    .lab-onda .griglia .mezza { opacity: .45; }
    .lab-onda .griglia .intera { opacity: .85; }
    .lab-onda .asse { stroke: var(--testo2); stroke-width: 2; stroke-linecap: round; }
    .lab-onda .tacca { stroke: var(--testo2); stroke-width: 1.6; stroke-linecap: round; }
    .lab-onda .numero-x { font: 16px var(--font); fill: var(--testo2); }
    .lab-onda .numero-y { font: 15px var(--font); fill: var(--testo2); paint-order: stroke; stroke: var(--sup2); stroke-width: 3.5; stroke-linejoin: round; }
    .lab-onda .nome-asse { font: italic 700 16px var(--font); fill: var(--testo2); }
    .lab-onda .onda-bers { fill: none; stroke: var(--testo2); stroke-width: 2.6; stroke-dasharray: 9 7; stroke-linecap: round; opacity: .5; }
    .lab-onda .onda-mia { fill: none; stroke: var(--s1); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; transition: stroke-width .18s; }
    .lab-onda .onda-mia.acceso { stroke-width: 5.5; filter: drop-shadow(0 0 5px var(--s1)); }
    .lab-onda .guida { stroke: var(--accento); stroke-width: 1.4; stroke-dasharray: 3 5; fill: none; opacity: .55; }
    .lab-onda .riga-T { stroke: var(--s2); stroke-width: 2; fill: none; opacity: .9; }
    .lab-onda .etichetta-T { font: 700 15px var(--font); fill: var(--s2); paint-order: stroke; stroke: var(--sup2); stroke-width: 4; stroke-linejoin: round; }
    .lab-onda .maniglia .alone { fill: var(--accento); opacity: 0; transition: opacity .15s; }
    .lab-onda .maniglia.presa .alone { opacity: .25; }
    .lab-onda .maniglia .corpo { fill: var(--accento); stroke: var(--sup); stroke-width: 2.5; }
    .lab-onda .maniglia .frecce { fill: var(--accento); opacity: .5; }
    .lab-onda .maniglia .nome { font: 700 16px var(--font); fill: var(--testo); paint-order: stroke; stroke: var(--sup2); stroke-width: 4; stroke-linejoin: round; }
    .lab-onda .maniglia.man-t .alone, .lab-onda .maniglia.man-t .corpo, .lab-onda .maniglia.man-t .frecce { fill: var(--s2); }
    .lab-onda .maniglia.bloccata .corpo { fill: var(--testo2); }
    .lab-onda .maniglia.bloccata { opacity: .4; }
    .lab-onda .maniglia .appesa { font: 700 17px var(--font); fill: var(--s2); }
    .lab-onda .obiettivo { text-align: center; padding: 6px 12px 10px; font-size: .95rem; color: var(--testo2); line-height: 1.7; }
    .lab-onda .obiettivo .katex { font-size: 1em; }
    .lab-onda .equazione { text-align: center; padding: 12px 12px 0; font-size: 1.35rem; min-height: 1.9em; }
    .lab-onda .equazione.muta { opacity: .32; font-size: 1.1rem; }
    .lab-onda .dati { display: flex; gap: 4px 18px; flex-wrap: wrap; justify-content: center; padding: 6px 12px 0; font-size: .86rem; color: var(--testo2); min-height: 1.2em; }
    .lab-onda .campi { display: flex; gap: 8px 12px; flex-wrap: wrap; align-items: center; justify-content: center; padding: 10px 12px 2px; }
    .lab-onda .campi label { display: inline-flex; align-items: center; gap: 6px; font-size: .95rem; color: var(--testo2); }
    .lab-onda .campi input { width: 82px; min-height: 38px; padding: 4px 8px; font: inherit; font-size: 1rem; text-align: center; color: var(--testo); background: var(--sup); border: 1px solid var(--bordo); border-radius: 8px; }
    .lab-onda .campi input:focus { outline: 2px solid var(--accento); outline-offset: 1px; }
    .lab-onda .vinto { display: inline-block; animation: lab-onda-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-onda-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-onda .legenda { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; padding: 4px 12px 8px; font-size: .82rem; color: var(--testo2); }
    .lab-onda .legenda span { display: inline-flex; align-items: center; gap: 6px; }
    .lab-onda .legenda i { display: inline-block; width: 22px; height: 0; border-top-width: 3px; border-top-style: solid; }
    .lab-onda .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
    @media (max-width: 600px) { .lab-onda .equazione { font-size: 1.15rem; padding-top: 8px; } }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const PI = Math.PI;
  const chiudi = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- il piano: x da −π a 3π, y da −3 a 3 ---------- */
  const XMIN = -PI, XMAX = 3 * PI, X0 = 16, LARG = 568;
  const SX = LARG / (XMAX - XMIN), SY = 40, Y0 = 142;
  const PX = x => X0 + (x - XMIN) * SX;
  const PY = y => Y0 - y * SY;
  const DESTRA = X0 + LARG;            /* bordo destro del piano */
  const NCAMP = 300;                   /* punti della curva */

  /* ---------- lo stato è tutto in interi: niente deriva sui decimali ----------
     A = kA/2  (kA da −6 a 6)      T = kT·π/6  (kT da 3 a 24)      φ = kF·π/6  (kF da −6 a 6) */
  const KA_MIN = -6, KA_MAX = 6, KT_MIN = 3, KT_MAX = 24, KF_MIN = -6, KF_MAX = 6;
  const ampiezza = s => s.kA / 2;
  const periodo = s => s.kT * PI / 6;
  const omega = s => 12 / s.kT;                       /* 2π/T, sempre razionale */
  const fase = s => s.kF * PI / 6;
  const xCresta = s => periodo(s) * (3 - s.kF) / 12;  /* (π/2 − φ)/ω */
  const xCresta2 = s => xCresta(s) + periodo(s);
  const onda = s => ({ a: ampiezza(s), w: omega(s), f: fase(s) });
  const val = (o, x) => o.a * Math.sin(o.w * x + o.f);

  /* due onde sono la stessa onda se le curve coincidono: così A = −2 e φ + π vanno bene uguale */
  function scarto(o1, o2) {
    let m = 0;
    for (let i = 0; i <= 100; i++) { const x = XMIN + (XMAX - XMIN) * i / 100; m = Math.max(m, Math.abs(val(o1, x) - val(o2, x))); }
    return m;
  }
  const combaciano = (o1, o2) => scarto(o1, o2) < 0.05;

  function percorso(o) {
    let d = '';
    for (let i = 0; i < NCAMP; i++) {
      const x = XMIN + (XMAX - XMIN) * i / (NCAMP - 1);
      d += (i ? 'L' : 'M') + PX(x).toFixed(1) + ' ' + PY(val(o, x)).toFixed(1);
    }
    return d;
  }

  /* ---------- scrittura ---------- */
  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  function fraz(n, d) { const g = mcd(n, d); return { n: n / g, d: d / g }; }
  const meno = s => String(s).replace(/-/g, '−');
  const virgola = v => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));

  function testoPi(k) {                 /* k in unità di π/6 → «3π/2», «−π/3», «0» */
    if (!k) return '0';
    const f = fraz(Math.abs(k), 6), num = f.n === 1 ? 'π' : f.n + 'π';
    return (k < 0 ? '−' : '') + (f.d === 1 ? num : num + '/' + f.d);
  }
  function texPi(k, conSegno) {         /* k in unità di π/6 → LaTeX */
    const f = fraz(Math.abs(k), 6), num = f.n === 1 ? '\\pi' : f.n + '\\pi';
    const corpo = f.d === 1 ? num : '\\frac{' + num + '}{' + f.d + '}';
    if (!conSegno) return (k < 0 ? '-' : '') + corpo;
    return (k < 0 ? ' - ' : ' + ') + corpo;
  }
  function texOmega(kT) {               /* ω = 12/kT davanti alla x, senza mai scrivere «1x» */
    const f = fraz(12, kT);
    if (f.d === 1) return f.n === 1 ? 'x' : f.n + 'x';
    return '\\frac{' + (f.n === 1 ? 'x' : f.n + 'x') + '}{' + f.d + '}';
  }
  function texEquazione(s) {
    if (!s.kA) return 'y = 0';
    let t = 'y = ';
    if (s.kA === -2) t += '-';
    else if (s.kA !== 2) t += (s.kA < 0 ? '-' : '') + virgola(Math.abs(s.kA) / 2).replace(',', '{,}');
    t += '\\sin\\left(' + texOmega(s.kT) + (s.kF ? texPi(s.kF, true) : '') + '\\right)';
    return t;
  }
  const testoDati = s => 'A = ' + meno(virgola(ampiezza(s))) + ', T = ' + testoPi(s.kT) + ', φ = ' + testoPi(s.kF);

  /* ---------- lettura dei campi del livello 8 ---------- */
  function leggiNumero(s) {
    s = String(s).trim().replace(/[−–—]/g, '-').replace(/\s+/g, '').replace(',', '.');
    return /^[+-]?(\d+\.?\d*|\.\d+)$/.test(s) ? parseFloat(s) : NaN;
  }
  function leggiPi(s) {
    s = String(s).toLowerCase().trim().replace(/[−–—]/g, '-').replace(/\s+/g, '').replace(/,/g, '.').replace(/π/g, 'pi').replace(/[*·×]/g, '');
    if (!s) return NaN;
    if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return parseFloat(s);
    const m = s.match(/^([+-]?)(\d+\.?\d*|\.\d+)?pi(?:\/(\d+\.?\d*|\.\d+))?$/);
    if (!m) return NaN;
    const den = m[3] ? parseFloat(m[3]) : 1;
    if (!den) return NaN;
    return (m[1] === '-' ? -1 : 1) * (m[2] === undefined ? 1 : parseFloat(m[2])) * PI / den;
  }

  /* ---------- i livelli ---------- */
  const DA = { kA: 2, kT: 12, kF: 0 };   /* si parte sempre da y = sin x */
  const LIVELLI = [
    { b: { kA: 4, kT: 12, kF: 0 }, libero: { A: 1, f: 0, T: 0 },
      testo: 'La maniglia C sta sulla cresta. Alzala finché la tua onda non copre quella grigia: cambia solo l\'ampiezza $A$.' },
    { b: { kA: 2, kT: 6, kF: 0 }, libero: { A: 0, f: 0, T: 1 },
      testo: 'Stessa altezza, onda più fitta. Tira la maniglia T verso la prima cresta: cambia solo il periodo $T$.' },
    { b: { kA: 4, kT: 6, kF: 0 }, libero: { A: 1, f: 0, T: 1 },
      testo: 'Adesso servono tutte e due: quanto è alta la cresta, e quanto distano due creste.' },
    { b: { kA: 2, kT: 12, kF: 2 }, libero: { A: 0, f: 1, T: 0 },
      testo: 'Stessa forma, spostata di $\\frac{\\pi}{3}$. Trascina C di lato: quello è lo sfasamento $\\varphi$.' },
    { b: { kA: 4, kT: 6, kF: -2 }, libero: { A: 1, f: 1, T: 1 },
      testo: 'Ampiezza, periodo e fase insieme.' },
    { b: { kA: -4, kT: 12, kF: 0 }, libero: { A: 1, f: 1, T: 1 },
      testo: 'Questa parte scendendo: si ottiene con $A$ negativa oppure spostando la fase di $\\pi$. Vanno bene tutte e due.' },
    { modo: 'formula', b: { kA: 3, kT: 24, kF: 2 }, libero: { A: 1, f: 1, T: 1 },
      testo: 'Il bersaglio è nascosto. Costruisci $y = 1{,}5\\sin\\left(\\frac{x}{2} + \\frac{\\pi}{3}\\right)$ e poi premi Confronta.' },
    { modo: 'campi', b: { kA: 3, kT: 6, kF: -3 }, libero: { A: 1, f: 1, T: 1 },
      testo: 'Qui l\'equazione non c\'è: ricalca l\'onda grigia, poi scrivi tu $A$, $T$ e $\\varphi$ e verifica.' },
    { b: { kA: 4, kT: 24, kF: -3 }, libero: { A: 1, f: 1, T: 1 },
      testo: 'Un\'onda lunghissima: la seconda cresta finisce fuori dal foglio e la maniglia T resta appesa al bordo. Tirala comunque.' },
    { b: { kA: 6, kT: 4, kF: 3 }, libero: { A: 1, f: 1, T: 1 },
      testo: 'L\'ultima: alta, fitta e spostata.' }
  ];
  COMPASSO.registraLab({
    id: 'onda',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-onda')) { const s = document.createElement('style'); s.id = 'stile-lab-onda'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-onda');
      radice.innerHTML = `
        <div class="obiettivo"></div>
        <div class="lab-scena"></div>
        <div class="equazione"></div>
        <div class="dati"></div>
        <div class="campi">
          <label>A <input type="text" class="c-a" inputmode="decimal" placeholder="es. 2"></label>
          <label>T <input type="text" class="c-t" inputmode="text" placeholder="es. 2pi"></label>
          <label>φ <input type="text" class="c-f" inputmode="text" placeholder="es. -pi/2"></label>
          <button type="button" class="btn primario m-verifica">Verifica</button>
        </div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn primario m-confronta">Confronta</button>
          <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo m-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>
        <div class="legenda">
          <span><i style="border-top-color: var(--testo2); opacity: .6"></i> onda bersaglio</span>
          <span><i style="border-top-color: var(--s1)"></i> la tua onda</span>
          <span>C = cresta · T = cresta dopo</span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const obEl = radice.querySelector('.obiettivo'), eqEl = radice.querySelector('.equazione');
      const datiEl = radice.querySelector('.dati'), msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const campiEl = radice.querySelector('.campi');
      const inA = radice.querySelector('.c-a'), inT = radice.querySelector('.c-t'), inF = radice.querySelector('.c-f');
      const btnVer = radice.querySelector('.m-verifica'), btnConf = radice.querySelector('.m-confronta');
      const btnRic = radice.querySelector('.m-ricomincia'), btnAiuto = radice.querySelector('.m-aiuto');

      /* ---------- la scena: piano, assi, tacche ---------- */
      const svg = el('svg', { viewBox: '0 0 600 300', role: 'img', 'aria-label': 'Piano con l\'onda bersaglio e la tua onda da sintonizzare' });
      scena.appendChild(svg);

      const gGriglia = el('g', { class: 'griglia' });
      for (let k = -6; k <= 6; k++) {                       /* orizzontali ogni mezzo */
        const y = PY(k / 2);
        gGriglia.appendChild(el('line', { class: k % 2 ? 'mezza' : 'intera', x1: X0, y1: y, x2: DESTRA, y2: y }));
      }
      for (let k = -2; k <= 6; k++) {                       /* verticali ogni π/2 */
        const x = PX(k * PI / 2);
        gGriglia.appendChild(el('line', { class: 'intera', x1: x, y1: PY(3), x2: x, y2: PY(-3) }));
      }
      svg.appendChild(gGriglia);

      const gAssi = el('g');
      gAssi.appendChild(el('line', { class: 'asse', x1: X0, y1: Y0, x2: DESTRA, y2: Y0 }));
      gAssi.appendChild(el('line', { class: 'asse', x1: PX(0), y1: PY(3) - 8, x2: PX(0), y2: PY(-3) + 4 }));
      gAssi.appendChild(el('path', { d: 'M' + DESTRA + ' ' + Y0 + ' l-9 -5 v10 z', fill: 'var(--testo2)' }));
      gAssi.appendChild(el('path', { d: 'M' + PX(0) + ' ' + (PY(3) - 8) + ' l-5 9 h10 z', fill: 'var(--testo2)' }));
      gAssi.appendChild(el('text', { class: 'nome-asse', x: DESTRA - 4, y: Y0 + 20, 'text-anchor': 'end' }, 'x'));
      gAssi.appendChild(el('text', { class: 'nome-asse', x: PX(0) + 7, y: PY(3) - 10 }, 'y'));
      for (let k = -2; k <= 6; k++) {                       /* tacche di x, etichettate in π/2 */
        const x = PX(k * PI / 2);
        gAssi.appendChild(el('line', { class: 'tacca', x1: x, y1: Y0 - 5, x2: x, y2: Y0 + 5 }));
        if (k) gAssi.appendChild(el('text', { class: 'numero-x', x: x, y: 284, 'text-anchor': 'middle' }, testoPi(k * 3)));
      }
      for (let k = -3; k <= 3; k++) {                       /* numeri di y, appoggiati all'asse */
        if (!k) continue;
        gAssi.appendChild(el('text', { class: 'numero-y', x: PX(0) - 8, y: PY(k) + 5, 'text-anchor': 'end' }, meno(k)));
      }
      gAssi.appendChild(el('text', { class: 'numero-y', x: PX(0) - 8, y: Y0 + 18, 'text-anchor': 'end' }, '0'));
      svg.appendChild(gAssi);

      const pathBers = el('path', { class: 'onda-bers' }); svg.appendChild(pathBers);
      const gGuide = el('path', { class: 'guida' }); svg.appendChild(gGuide);
      const pathMia = el('path', { class: 'onda-mia' }); svg.appendChild(pathMia);
      const rigaT = el('path', { class: 'riga-T' }); svg.appendChild(rigaT);
      const etT = el('text', { class: 'etichetta-T', 'text-anchor': 'middle' }); svg.appendChild(etT);
      const gMan = el('g'); svg.appendChild(gMan);

      function creaManiglia(nome, classe) {
        const g = el('g', { class: 'maniglia ' + classe });
        g.appendChild(el('circle', { class: 'alone', cx: 0, cy: 0, r: 26 }));
        const frecce = el('path', { class: 'frecce', d: '' }); g.appendChild(frecce);
        g.appendChild(el('circle', { class: 'corpo', cx: 0, cy: 0, r: 11 }));
        const appesa = el('text', { class: 'appesa', x: 15, y: 6 }, '»'); appesa.style.display = 'none'; g.appendChild(appesa);
        const testo = el('text', { class: 'nome', x: 0, y: -22, 'text-anchor': 'middle' }, nome); g.appendChild(testo);
        gMan.appendChild(g);
        return { g, frecce, testo, appesa };
      }
      const manC = creaManiglia('C', 'man-c'), manT = creaManiglia('T', 'man-t');

      /* ---------- stato ---------- */
      let livello = 0, st = { kA: DA.kA, kT: DA.kT, kF: DA.kF };
      let finito = false, rivelato = false, presa = null;
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = 0;

      function conMate(s) { return s.split('$').map((p, i) => i % 2 ? ctx.tex(p) : p.replace(/&/g, '&amp;').replace(/</g, '&lt;')).join(''); }
      const nascosto = () => LIVELLI[livello].modo === 'formula' && !rivelato;
      const pxCresta2 = () => Math.min(PX(xCresta2(st)), DESTRA - 14);

      /* ---------- disegno ---------- */
      function accendi(ok) { pathMia.classList.toggle('acceso', !!ok); }

      function ridisegna() {
        const L = LIVELLI[livello], a = ampiezza(st);
        pathMia.setAttribute('d', percorso(onda(st)));
        pathBers.setAttribute('d', percorso(onda(L.b)));
        pathBers.style.display = nascosto() ? 'none' : '';

        const pc = PX(xCresta(st)), py = PY(a);
        let p2 = PX(xCresta2(st));
        const appesa = p2 > DESTRA - 14;
        if (appesa) p2 = DESTRA - 14;

        /* guide di lettura: l'altezza della cresta sull'asse y, la sua posizione sull'asse x */
        gGuide.setAttribute('d', 'M' + PX(0).toFixed(1) + ' ' + py.toFixed(1) + 'H' + pc.toFixed(1) + 'V' + Y0);
        /* il righello del periodo, da una cresta all'altra */
        rigaT.setAttribute('d', 'M' + pc.toFixed(1) + ' ' + (py - 7).toFixed(1) + 'v14M' + pc.toFixed(1) + ' ' + py.toFixed(1) + 'H' + p2.toFixed(1) + 'M' + p2.toFixed(1) + ' ' + (py - 7).toFixed(1) + 'v14');
        etT.setAttribute('x', ((pc + p2) / 2).toFixed(1));
        etT.setAttribute('y', (py + (a >= 0 ? 21 : -12)).toFixed(1));
        etT.textContent = 'T = ' + testoPi(st.kT);

        manC.g.setAttribute('transform', 'translate(' + pc.toFixed(1) + ',' + py.toFixed(1) + ')');
        manT.g.setAttribute('transform', 'translate(' + p2.toFixed(1) + ',' + py.toFixed(1) + ')');
        const yNome = py < 46 ? 32 : -22;   /* con la cresta a ridosso del bordo il nome va sotto */
        manC.testo.setAttribute('y', yNome);
        manT.testo.setAttribute('y', yNome);
        manT.appesa.style.display = appesa ? '' : 'none';
        manC.g.classList.toggle('bloccata', !(L.libero.A || L.libero.f));
        manT.g.classList.toggle('bloccata', !L.libero.T);
        const fr = [];
        if (L.libero.A) fr.push('M0 -22 l-5 7 h10 z', 'M0 22 l-5 -7 h10 z');
        if (L.libero.f) fr.push('M-22 0 l7 -5 v10 z', 'M22 0 l-7 5 v-10 z');
        manC.frecce.setAttribute('d', fr.join(' '));
        manT.frecce.setAttribute('d', L.libero.T ? 'M-22 0 l7 -5 v10 zM22 0 l-7 5 v-10 z' : '');
      }

      function aggiornaTesti() {
        const L = LIVELLI[livello], muta = (L.modo === 'formula' || L.modo === 'campi') && !finito;
        if (muta) {
          eqEl.className = 'equazione muta';
          eqEl.innerHTML = ctx.tex('y = A\\sin(\\omega x + \\varphi)');
          datiEl.innerHTML = '<span>' + ctx.tex('\\omega = \\frac{2\\pi}{T}') + '</span>';
        } else {
          eqEl.className = 'equazione';
          eqEl.innerHTML = ctx.tex(texEquazione(st));
          const f = fraz(12, st.kT);
          datiEl.innerHTML = '<span>' + testoDati(st) + '</span><span>ω = ' + (f.d === 1 ? f.n : f.n + '/' + f.d) + '</span>';
        }
      }

      /* ---------- esito ---------- */
      function controlla() {
        if (finito || nascosto()) return false;
        const L = LIVELLI[livello], ok = combaciano(onda(st), onda(L.b));
        accendi(ok);
        if (L.modo === 'campi') {
          msg.className = 'lab-messaggio';
          msg.textContent = ok ? 'La curva combacia. Adesso scrivi A, T e φ e premi Verifica.' : '';
        } else if (ok) vinci();
        return ok;
      }

      function vinci() {
        finito = true; accendi(true); aggiornaTesti(); ridisegna();
        msg.innerHTML = '<span class="vinto">Sintonizzata: ' + ctx.tex(texEquazione(st)) + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.completato(livello);
        ctx.zenone(commentoVittoria(), { espressione: 'orgoglioso', durata: 9000 });
        btnRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        btnConf.disabled = true; btnVer.disabled = true;
      }

      function commentoVittoria() {
        const b = LIVELLI[livello].b;
        switch (livello) {
          case 0: return 'L\'ampiezza è la quota della cresta: A = 2 vuol dire che l\'onda sale fino a 2 e scende fino a −2. Periodo e fase non li hai toccati, e infatti l\'onda non si è spostata di lato né si è stretta.';
          case 1: return 'Hai dimezzato il periodo: T = π invece di 2π. Siccome ω = 2π/T, la pulsazione è raddoppiata e la scrittura è y = sin(2x). Più l\'onda è fitta, più grande è il numero che moltiplica la x.';
          case 2: return 'Due manopole indipendenti: la maniglia C decide quanto è alta l\'onda, la maniglia T quanto è larga. Adesso è y = 2 sin(2x): ampiezza 2, periodo π.';
          case 3: return 'La fase non cambia né l\'altezza né la larghezza: sposta e basta. Con φ = π/3 tutta l\'onda scivola a sinistra di π/3 diviso ω, cioè la cresta passa da π/2 a π/6.';
          case 4: return 'Tutte e tre insieme: ' + testoDati(st) + '. Nella scrittura y = 2 sin(2x − π/3) il 2 davanti è l\'ampiezza, il 2 dentro è ω = 2π/T, e il −π/3 sposta la cresta a destra.';
          case 5: return st.kA < 0
            ? 'Hai scelto A = −2: il seno viene ribaltato, e dove saliva scende. L\'altra strada era lasciare A = 2 e spostare la fase di π; le due scritture disegnano la stessa identica curva, e il gioco le accetta tutte e due.'
            : 'Hai spostato la fase di π invece di cambiare segno ad A: giusto lo stesso. Mezzo periodo di scarto ribalta l\'onda, esattamente come una A negativa.';
          case 6: return 'Nella formula ω era scritto come «x diviso 2», cioè ω = 1/2: da lì il periodo T = 2π/ω = 4π, il doppio del solito. E la fase π/3 porta la cresta in (π/2 − π/3)/ω = π/3.';
          case 7: return 'Letta dal disegno: la cresta arriva a 1,5, le due creste distano π, quindi ω = 2π/π = 2; e la cresta sta in π/2, quindi φ = π/2 − 2·(π/2) = −π/2. In effetti y = 1,5 sin(2x − π/2) è la stessa cosa di y = −1,5 cos(2x).';
          case 8: return 'T = 4π: dentro il foglio ci sta un solo giro d\'onda. La seconda cresta è a 4π da quella che vedi, cioè fuori dal bordo: per questo la maniglia T è rimasta appesa lì col segno ».';
          default: return 'A = 3, T = 2π/3, φ = π/2. E c\'è di più: spostare un seno di un quarto di periodo dà un coseno, quindi questa curva si scrive anche y = 3 cos(3x). Sono la stessa onda, con due nomi.';
        }
      }

      /* ---------- livello 7: costruisci dalla formula ---------- */
      function confronta() {
        const L = LIVELLI[livello];
        if (finito || L.modo !== 'formula') return;
        rivelato = true; ridisegna();
        if (combaciano(onda(st), onda(L.b))) { vinci(); return; }
        msg.textContent = 'Non è ancora quella. Adesso il bersaglio si vede: guarda dove le due curve si staccano.';
        msg.className = 'lab-messaggio no';
        accendi(false);
        const b = L.b, guai = [];
        if (Math.abs(st.kA) !== Math.abs(b.kA)) guai.push('la cresta non arriva alla quota giusta: A è il numero davanti al seno');
        if (st.kT !== b.kT) guai.push('il periodo non ci siamo: ω è il numero che moltiplica la x, e T = 2π/ω');
        if (!guai.length) guai.push('altezza e larghezza sono giuste, è la posizione: la cresta sta in x = (π/2 − φ)/ω');
        ctx.zenone('Guarda meglio: ' + guai.join('; ') + '.', { tipo: 'suggerimento', espressione: 'pensa', durata: 10000 });
      }

      /* ---------- livello 8: leggi dalla curva ---------- */
      function verifica() {
        const L = LIVELLI[livello];
        if (finito || L.modo !== 'campi') return;
        if (!combaciano(onda(st), onda(L.b))) {
          msg.textContent = 'La tua onda non combacia ancora con quella grigia: prima sistemala con le maniglie.';
          msg.className = 'lab-messaggio no'; return;
        }
        const a = leggiNumero(inA.value), T = leggiPi(inT.value), f = leggiPi(inF.value);
        if (isNaN(a) || isNaN(T) || isNaN(f)) {
          msg.textContent = 'Scrivi tutti e tre i valori. Per π puoi scrivere «pi»: per esempio 2pi, 3pi/2, -pi/2.';
          msg.className = 'lab-messaggio no'; return;
        }
        if (T <= 0) { msg.textContent = 'Il periodo è una distanza: deve essere positivo.'; msg.className = 'lab-messaggio no'; return; }
        if (combaciano({ a: a, w: 2 * PI / T, f: f }, onda(L.b))) { vinci(); return; }
        const Ab = Math.abs(ampiezza(L.b)), Tb = periodo(L.b);
        let t;
        if (Math.abs(T - Tb) > 0.02) t = 'Il periodo no: T è la distanza fra due creste, misurala sull\'asse x contando i π/2.';
        else if (Math.abs(Math.abs(a) - Ab) > 0.02) t = 'L\'ampiezza no: A è la quota a cui arriva la cresta, si legge sull\'asse y.';
        else if (a < 0) t = 'A e φ devono stare insieme: se scrivi A negativa, devi anche spostare φ di π rispetto al valore che leggi dalla cresta.';
        else t = 'Resta la fase: da T ricavi ω = 2π/T, poi φ = π/2 − ω per la x della cresta. Attento al segno: cresta spostata a destra, φ negativa.';
        msg.textContent = 'A, T e φ non descrivono ancora questa curva.';
        msg.className = 'lab-messaggio no';
        ctx.zenone(t, { tipo: 'suggerimento', espressione: 'pensa', durata: 10000 });
      }

      /* ---------- maniglie col dito ---------- */
      const coord = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * 600, y: (ev.clientY - r.top) / r.height * 300 }; };
      svg.addEventListener('pointerdown', ev => {
        if (finito) return;
        const L = LIVELLI[livello], c = coord(ev), py = PY(ampiezza(st));
        let quale = null, best = 46;
        if (L.libero.A || L.libero.f) { const d = Math.hypot(c.x - PX(xCresta(st)), c.y - py); if (d < best) { best = d; quale = 'C'; } }
        if (L.libero.T) { const d = Math.hypot(c.x - pxCresta2(), c.y - py); if (d < best) { best = d; quale = 'T'; } }
        if (!quale) return;
        presa = { quale, x: c.x, y: c.y, kA: st.kA, xc: xCresta(st), T: periodo(st) };
        (quale === 'C' ? manC : manT).g.classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      });
      svg.addEventListener('pointermove', ev => {
        if (!presa) return;
        const L = LIVELLI[livello], c = coord(ev);
        const ux = (c.x - presa.x) / SX, uy = (presa.y - c.y) / SY;
        let cambiato = false;
        if (presa.quale === 'C') {
          if (L.libero.A) { const k = chiudi(Math.round((presa.kA / 2 + uy) * 2), KA_MIN, KA_MAX); if (k !== st.kA) { st.kA = k; cambiato = true; } }
          if (L.libero.f) {
            const k = chiudi(Math.round(3 - 72 * (presa.xc + ux) / (st.kT * PI)), KF_MIN, KF_MAX);
            if (k !== st.kF) { st.kF = k; cambiato = true; }
          }
        } else {
          const k = chiudi(Math.round((presa.T + ux * 12 / (15 - st.kF)) * 6 / PI), KT_MIN, KT_MAX);
          if (k !== st.kT) { st.kT = k; cambiato = true; }
        }
        if (!cambiato) return;
        if (msg.classList.contains('no')) { msg.textContent = ''; msg.className = 'lab-messaggio'; }
        ridisegna(); aggiornaTesti(); controlla();
      });
      const molla = () => { if (!presa) return; (presa.quale === 'C' ? manC : manT).g.classList.remove('presa'); presa = null; };
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('pointerleave', molla);

      /* ---------- aiuto ---------- */
      function aiuto() {
        const L = LIVELLI[livello];
        let t = 'In y = A sin(ωx + φ) ogni lettera si vede nel disegno. La cresta dice l\'ampiezza: A è la quota a cui arriva l\'onda. La distanza fra due creste è il periodo T, e ω = 2π/T, cioè quante volte l\'onda si ripete: se T si dimezza, ω raddoppia. Spostare tutta l\'onda a destra o a sinistra, senza cambiarle né altezza né larghezza, è la fase φ: la prima cresta sta in x = (π/2 − φ)/ω.';
        if (livello === 1 || livello === 2) t += ' Tira la maniglia T verso C per stringere il periodo, allontanala per allargarlo: il righello fra le due creste dice quanto vale T.';
        else if (livello === 3) t += ' Qui C si muove solo di lato. Se la cresta va a destra la fase è negativa, se va a sinistra è positiva: nella parentesi si somma prima di fare il seno, quindi anticipa.';
        else if (livello === 5) t += ' Un\'onda capovolta si ottiene in due modi: A negativa, oppure la stessa A con la fase spostata di π. Provali tutti e due e guarda che disegnano la stessa curva.';
        else if (livello === 6) t += ' Parti da ω: è il numero che moltiplica la x, e da lì T = 2π/ω. Poi la fase, che sposta la cresta in x = (π/2 − φ)/ω. Quando pensi di esserci, premi Confronta.';
        else if (livello === 7) t += ' Leggi nell\'ordine: la quota della cresta è A; la distanza fra le due creste è T; da T ricavi ω = 2π/T; e dalla x della cresta ricavi φ = π/2 − ω·x. Nei campi, per π scrivi «pi»: per esempio 3pi/2 oppure -pi/2.';
        else if (livello === 8) t += ' Con un periodo così lungo la seconda cresta finisce fuori dal foglio: la maniglia T resta appesa al bordo col segno », ma si trascina lo stesso e il righello continua a dire quanto vale T.';
        return t;
      }

      /* ---------- livelli ---------- */
      function avviaLivello(n) {
        livello = n;
        const L = LIVELLI[n];
        st = { kA: DA.kA, kT: DA.kT, kF: DA.kF };
        finito = false; rivelato = false; molla();
        accendi(false);
        obEl.innerHTML = conMate(L.testo);
        msg.textContent = ''; msg.className = 'lab-messaggio';
        btnRic.textContent = 'Ricomincia';
        btnConf.style.display = L.modo === 'formula' ? '' : 'none'; btnConf.disabled = false;
        campiEl.style.display = L.modo === 'campi' ? '' : 'none'; btnVer.disabled = false;
        if (L.modo === 'campi') { inA.value = ''; inT.value = ''; inF.value = ''; }
        livEl.textContent = 'Livello ' + (n + 1) + ' di ' + LIVELLI.length;
        aggiornaTesti(); ridisegna();
      }

      btnConf.addEventListener('click', confronta);
      btnVer.addEventListener('click', verifica);
      [inA, inT, inF].forEach(i => i.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); verifica(); } }));
      btnRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      btnAiuto.addEventListener('click', () => ctx.zenone(aiuto(), { tipo: 'suggerimento', espressione: 'pensa', durata: 14000 }));

      avviaLivello(livello);

      return function smonta() { presa = null; };
    }
  });
})();
