/* Laboratorio «La mongolfiera» — somma di numeri relativi.
   Palloncini (+1, +3) tirano su, zavorre (−1, −3) tirano giù: la quota è la somma.
   Rifacimento di BaloonZ. Modello di riferimento: laboratori/bilancia.js (vedi SCHEMA-LAB.md). */
(function () {
  const STILE = `
    .lab-mongolfiera .lab-scena { position: relative; overflow: hidden; border-radius: 12px; background: var(--sup2); }
    .lab-mongolfiera .cielo { position: absolute; inset: 0; background: url('laboratori/immagini/cielo.jpg') center / cover no-repeat; }
    :root[data-tema="scuro"] .lab-mongolfiera .cielo { filter: brightness(.6) saturate(.85); }
    .lab-mongolfiera .lab-scena svg { position: relative; z-index: 1; }
    .lab-mongolfiera .obiettivo { position: absolute; z-index: 2; left: 10px; right: 10px; top: 8px; text-align: center; font-size: .92rem; font-weight: 600; line-height: 1.35; color: var(--testo); background: var(--sup); border: 1px solid var(--bordo); border-radius: 10px; padding: 7px 10px; opacity: .94; }
    .lab-mongolfiera .corpo { animation: lab-mong-onda 4.6s ease-in-out infinite alternate; }
    @keyframes lab-mong-onda { from { transform: translateY(-2px) } to { transform: translateY(3px) } }
    .lab-mongolfiera .ogg { cursor: pointer; }
    .lab-mongolfiera .ogg.svanisce { transform-box: fill-box; transform-origin: 50% 50%; animation: lab-mong-svanisce .42s ease forwards; }
    @keyframes lab-mong-svanisce { to { opacity: 0; transform: scale(.55) } }
    .lab-mongolfiera .arriva { transform-box: fill-box; transform-origin: 50% 50%; animation: lab-mong-arriva .32s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-mong-arriva { from { opacity: 0; transform: scale(.5) } to { opacity: 1; transform: none } }
    @media (prefers-reduced-motion: reduce) { .lab-mongolfiera .corpo, .lab-mongolfiera .arriva { animation: none } }
    .lab-mongolfiera .num { fill: #fff; paint-order: stroke; stroke: rgba(0,0,0,.5); stroke-width: 3px; font-family: var(--font); font-weight: 700; }
    .lab-mongolfiera .tacca { stroke: var(--testo2); stroke-width: 1.3; }
    .lab-mongolfiera .tacca.forte { stroke: var(--testo); stroke-width: 2; }
    .lab-mongolfiera .etichetta { font-family: var(--font); font-size: 10px; font-weight: 600; fill: var(--testo2); dominant-baseline: middle; }
    .lab-mongolfiera .etichetta.forte { fill: var(--testo); font-weight: 700; font-size: 12.5px; }
    .lab-mongolfiera .mira line { stroke: var(--accento); stroke-width: 1.6; stroke-dasharray: 5 5; opacity: .85; }
    .lab-mongolfiera .mira polygon { fill: var(--accento); }
    .lab-mongolfiera .nuvola { cursor: default; }
    .lab-mongolfiera .nuvola.via { animation: lab-mong-via .62s ease forwards; }
    @keyframes lab-mong-via { to { opacity: 0; transform: translate(-46px, -14px) } }
    .lab-mongolfiera .conto { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 2px 7px; padding: 10px 12px 0; font-size: 1.15rem; min-height: 2em; }
    .lab-mongolfiera .conto .vuoto { font-size: .92rem; color: var(--testo2); }
    .lab-mongolfiera .riga-quota { text-align: center; font-size: .95rem; color: var(--testo2); padding: 4px 12px 0; }
    .lab-mongolfiera .riga-quota b { color: var(--testo); font-size: 1.15rem; }
    .lab-mongolfiera .riga-quota b.su { color: var(--ok); } .lab-mongolfiera .riga-quota b.giu { color: var(--no); }
    .lab-mongolfiera .tavolozza { display: flex; gap: 6px; flex-wrap: wrap; }
    .lab-mongolfiera .tv { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 3px; min-width: 58px; min-height: 62px; padding: 5px 7px 6px; border: 1px solid var(--bordo2); border-radius: 11px; background: var(--sup); color: var(--testo); font-family: var(--font); font-size: .9rem; font-weight: 700; cursor: pointer; touch-action: manipulation; }
    .lab-mongolfiera .tv img { height: 30px; width: auto; display: block; pointer-events: none; }
    .lab-mongolfiera .tv img.grande { height: 34px; }
    .lab-mongolfiera .tv .et.su { color: var(--ok); } .lab-mongolfiera .tv .et.giu { color: var(--no); }
    .lab-mongolfiera .tv:active { transform: scale(.94); }
    .lab-mongolfiera .tv:disabled { opacity: .4; cursor: default; }
    .lab-mongolfiera .gruppo-indovina { display: flex; align-items: center; gap: 6px; }
    .lab-mongolfiera .gruppo-indovina[hidden] { display: none; }
    .lab-mongolfiera .risposta { width: 78px; padding: 8px 10px; min-height: 40px; border-radius: 9px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo); font-family: var(--font); font-size: 1.05rem; font-weight: 700; text-align: center; }
    .lab-mongolfiera .risposta.sbagliata { border-color: var(--no); animation: lab-mong-scuoti .4s; }
    @keyframes lab-mong-scuoti { 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }
    .lab-mongolfiera .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
    @media (max-width: 620px) {
      .lab-mongolfiera .tavolozza { flex: 1 1 100%; justify-content: center; }
      .lab-mongolfiera .conto { font-size: 1.05rem; }
      .lab-mongolfiera .obiettivo { font-size: .86rem; }
    }
  `;

  const DIR = 'laboratori/immagini/';
  const IMG = { mong: DIR + 'mongolfiera.png', p1: DIR + 'palloncino.png', p3: DIR + 'palloncino2.png', z: DIR + 'zavorra.png' };
  const MAX_OGG = 10, LIMITE = 10, DUR = 480;

  /* I livelli. `vincolo` guarda gli oggetti attaccati; `avviso` è il perché non vale ancora.
     `indovina: n` = livello «prima il conto, poi la nuvola si sposta» con n termini a caso. */
  const LIVELLI = [
    { obiettivo: 4, testo: 'Porta la mongolfiera a quota +4.' },
    { obiettivo: -3, testo: 'Porta la mongolfiera a quota −3.' },
    { obiettivo: 2, testo: 'Quota +2, usando almeno una zavorra.', vincolo: o => o.some(x => x.v < 0), avviso: 'Quota giusta, ma non c\'è nessuna zavorra: qui ne serve almeno una.' },
    { obiettivo: -5, testo: 'Quota −5, usando almeno un palloncino.', vincolo: o => o.some(x => x.v > 0), avviso: 'Quota giusta, ma non c\'è nessun palloncino: qui ne serve almeno uno.' },
    { obiettivo: 0, testo: 'Quota 0 con esattamente 4 oggetti, e almeno uno da 3.', vincolo: o => o.length === 4 && o.some(x => Math.abs(x.v) === 3), avviso: 'Quota 0, ma servono esattamente 4 oggetti e almeno uno da 3.' },
    { obiettivo: 7, testo: 'Quota +7 con al massimo 3 oggetti.', vincolo: o => o.length <= 3, avviso: 'Quota giusta, ma con più di 3 oggetti non vale: cerca i pezzi più grossi.' },
    { obiettivo: -8, testo: 'Quota −8 con al massimo 4 oggetti.', vincolo: o => o.length <= 4, avviso: 'Quota giusta, ma con più di 4 oggetti non vale.' },
    { obiettivo: -2, iniziali: [3, 3, -1], testo: 'Sei già a +5. Aggiungi il minimo di oggetti per arrivare a −2.', vincolo: o => o.filter(x => !x.fisso).length <= 3, avviso: 'Ci sei arrivato, ma con troppi oggetti: bastano tre.' },
    { indovina: 4, testo: 'La mongolfiera è dietro la nuvola: fai il conto, scrivi la quota, poi «Controlla».' },
    { indovina: 5, testo: 'Cinque oggetti stavolta. Prima il conto, poi la nuvola si sposta.' }
  ];

  const NS = 'http://www.w3.org/2000/svg';
  function el(n, a, testo) { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; }
  const segno = v => (v > 0 ? '+' + v : v < 0 ? '−' + (-v) : '0');       /* per il testo italiano */
  const segnoTex = v => (v > 0 ? '+' + v : v < 0 ? '-' + (-v) : '0');          /* per LaTeX */
  const arrotonda = x => Math.round(x * 100) / 100;

  function generaTermini(n) {
    const val = [1, 3, -1, -3];
    for (let t = 0; t < 600; t++) {
      const term = []; let s = 0;
      for (let i = 0; i < n; i++) { const v = val[Math.floor(Math.random() * 4)]; term.push(v); s += v; }
      if (Math.abs(s) > 8) continue;
      if (!term.some(v => v > 0) || !term.some(v => v < 0)) continue;
      if (term.every(v => Math.abs(v) === 1)) continue;
      if (term.every(v => Math.abs(v) === 3) && n > 4) continue;
      return term;
    }
    return n === 4 ? [3, -1, -3, 1] : [-3, 1, -1, -3, 3];
  }

  COMPASSO.registraLab({
    id: 'mongolfiera',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-mongolfiera')) { const s = document.createElement('style'); s.id = 'stile-lab-mongolfiera'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-mongolfiera');
      radice.innerHTML = `
        <div class="lab-scena"><div class="cielo"></div><div class="obiettivo"></div></div>
        <div class="conto"></div>
        <div class="riga-quota"></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <div class="tavolozza">
            <button type="button" class="tv" data-v="1" title="Palloncino +1"><img src="${IMG.p1}" alt=""><span class="et su">+1</span></button>
            <button type="button" class="tv" data-v="3" title="Palloncino +3"><img src="${IMG.p3}" class="grande" alt=""><span class="et su">+3</span></button>
            <button type="button" class="tv" data-v="-1" title="Zavorra −1"><img src="${IMG.z}" alt=""><span class="et giu">−1</span></button>
            <button type="button" class="tv" data-v="-3" title="Zavorra −3"><img src="${IMG.z}" class="grande" alt=""><span class="et giu">−3</span></button>
          </div>
          <span class="gruppo-indovina" hidden><input type="number" class="risposta" inputmode="numeric" step="1" min="-10" max="10" aria-label="La quota che hai calcolato"><button type="button" class="btn primario b-controlla">Controlla</button></span>
          <button type="button" class="btn piccolo b-semplifica">Semplifica</button>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <button type="button" class="btn piccolo b-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena'), obEl = radice.querySelector('.obiettivo');
      const contoEl = radice.querySelector('.conto'), quotaEl = radice.querySelector('.riga-quota'), msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const tavolozza = radice.querySelector('.tavolozza'), gruppoInd = radice.querySelector('.gruppo-indovina'), risposta = radice.querySelector('.risposta');
      const b = { controlla: radice.querySelector('.b-controlla'), semplifica: radice.querySelector('.b-semplifica'), ric: radice.querySelector('.b-ric'), aiuto: radice.querySelector('.b-aiuto') };

      /* ---------- stato ---------- */
      let livello = 0, liv = LIVELLI[0], oggetti = [], contatore = 0, esito = null, occupato = false, scoperto = true, spiegatoSemplifica = false;
      const timer = new Set();
      function attesa(fn, ms) { const t = setTimeout(() => { timer.delete(t); fn(); }, ms); timer.add(t); return t; }
      function fermaTimer() { timer.forEach(clearTimeout); timer.clear(); }
      let tVinci = null;

      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length || livello < 0) livello = 0;

      /* ---------- geometria ---------- */
      const G = {};
      function misura() {
        const larghezza = radice.clientWidth || 400;
        const largo = larghezza >= 620;
        const s = largo ? 0.95 : 1;
        G.largo = largo; G.s = s;
        G.W = largo ? 760 : 400;
        G.H = largo ? 470 : 520;
        G.mongW = 60 * s; G.mongH = 60 * s * 300 / 237;
        G.p1W = 18 * s; G.p1H = 18 * s * 180 / 101;
        G.p3W = 25 * s; G.p3H = 25 * s * 180 / 130;
        G.z1W = 20 * s; G.z1H = 20 * s * 150 / 126;
        G.z3W = 27 * s; G.z3H = 27 * s * 150 / 126;
        G.passoP = 22 * s; G.rigaP = 24 * s;      /* passo orizzontale e verticale dei palloncini */
        G.passoZ = 25 * s; G.rigaZ = 28 * s;
        /* spazio da lasciare in alto: la fascia dell'obiettivo, poi la mongolfiera e una fila di palloncini */
        const testata = Math.min(96, (obEl.offsetHeight || 34) * (G.W / larghezza) + 14);
        const sopra = testata + G.mongH + G.p3H + 6;
        const sotto = 12 * s + G.z3H + G.rigaZ + 6;
        G.top = arrotonda(sopra + 6);
        G.bot = arrotonda(G.H - sotto - 6);
        G.unita = (G.bot - G.top) / (2 * LIMITE);
        G.zero = (G.top + G.bot) / 2;
        G.assex = G.W - (largo ? 54 : 44);
        G.xm = arrotonda(largo ? G.assex * 0.44 : G.assex * 0.47);
      }
      const yDi = q => G.zero - q * G.unita;

      /* ---------- scena ---------- */
      let svg = null, volo = null, corpo = null, mira = null, nuvola = null;
      function costruisciScena() {
        if (svg) svg.remove();
        svg = el('svg', { viewBox: '0 0 ' + G.W + ' ' + G.H, role: 'img', 'aria-label': 'Una mongolfiera sopra il mare, con una scala delle quote' });
        const defs = el('defs');
        const gr = el('linearGradient', { id: 'lab-mong-acqua', x1: 0, y1: 0, x2: 0, y2: 1 });
        gr.appendChild(el('stop', { offset: '0%', 'stop-color': '#2f7fc4', 'stop-opacity': '.42' }));
        gr.appendChild(el('stop', { offset: '100%', 'stop-color': '#0d3560', 'stop-opacity': '.82' }));
        defs.appendChild(gr); svg.appendChild(defs);

        volo = el('g', { class: 'volo' }); corpo = el('g', { class: 'corpo' }); volo.appendChild(corpo); svg.appendChild(volo);

        /* acqua: sta sopra la mongolfiera, così sotto lo zero si vede annegata */
        const acqua = el('g', { class: 'acqua' });
        acqua.appendChild(el('rect', { x: 0, y: G.zero, width: G.W, height: G.H - G.zero, fill: 'url(#lab-mong-acqua)' }));
        let d = 'M0 ' + arrotonda(G.zero);
        for (let x = 0; x < G.W; x += 28) d += ' q 7 -5 14 0 t 14 0';
        acqua.appendChild(el('path', { d: d, fill: 'none', stroke: '#eaf4ff', 'stroke-width': 2.2, opacity: .75 }));
        acqua.appendChild(el('line', { x1: 0, y1: G.zero, x2: G.W, y2: G.zero, stroke: '#0d3560', 'stroke-width': 1, opacity: .35 }));
        svg.appendChild(acqua);

        svg.appendChild(disegnaScala());

        mira = el('g', { class: 'mira' });
        mira.appendChild(el('line', { x1: G.xm + G.mongW * 0.5 + 4, y1: 0, x2: G.assex - 2, y2: 0 }));
        mira.appendChild(el('polygon', { points: (G.assex - 9) + ',-6 ' + G.assex + ',0 ' + (G.assex - 9) + ',6' }));
        svg.appendChild(mira);

        nuvola = disegnaNuvola(); svg.appendChild(nuvola);
        scena.insertBefore(svg, obEl);
      }

      function disegnaScala() {
        const g = el('g', { class: 'scala' });
        g.appendChild(el('rect', { x: G.assex - 15, y: G.top - 16, width: G.W - G.assex + 15, height: G.bot - G.top + 32, rx: 8, fill: 'var(--sup)', opacity: .78 }));
        g.appendChild(el('line', { x1: G.assex, y1: G.top - 10, x2: G.assex, y2: G.bot + 10, stroke: 'var(--testo2)', 'stroke-width': 1.6 }));
        for (let q = LIMITE; q >= -LIMITE; q--) {
          const y = arrotonda(yDi(q)), forte = q % 5 === 0;
          g.appendChild(el('line', { x1: G.assex - (forte ? 11 : 6), y1: y, x2: G.assex, y2: y, class: 'tacca' + (forte ? ' forte' : '') }));
          g.appendChild(el('text', { x: G.assex + 5, y: y, class: 'etichetta' + (forte ? ' forte' : '') }, q > 0 ? '+' + q : String(q).replace('-', '−')));
        }
        return g;
      }

      function disegnaNuvola() {
        const g = el('g', { class: 'nuvola' }), cx = G.xm, cy = G.zero - G.unita * 1.5, k = G.largo ? 1.15 : 1;
        const bolle = [[-52, 6, 34], [-16, -14, 44], [26, -4, 38], [58, 12, 28], [4, 20, 34], [-40, 26, 26]];
        bolle.forEach(p => g.appendChild(el('ellipse', { cx: cx + p[0] * k, cy: cy + p[1] * k, rx: p[2] * k, ry: p[2] * k * 0.78, fill: '#f4f7fb', opacity: .97 })));
        bolle.forEach(p => g.appendChild(el('ellipse', { cx: cx + p[0] * k, cy: cy + p[1] * k + 6, rx: p[2] * k * .82, ry: p[2] * k * .5, fill: '#dbe4ef', opacity: .5 })));
        g.appendChild(el('text', { x: cx, y: cy + 4, 'text-anchor': 'middle', fill: '#5d6376', 'font-family': 'var(--font)', 'font-size': 15, 'font-weight': 700 }, 'quanto?'));
        return g;
      }
      function immagine(src, a) {
        const e = el('image', a);
        e.setAttribute('href', src);
        e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
        return e;
      }

      /* posizioni relative all'ancora della mongolfiera (0,0 = fondo del cesto) */
      function postoSu(i, n) {
        const r = Math.floor(i / 5), col = i % 5, inRiga = Math.min(5, n - r * 5);
        return { x: (col - (inRiga - 1) / 2) * G.passoP, yb: -G.mongH + 3 - r * G.rigaP };
      }
      function postoGiu(i, n) {
        const r = Math.floor(i / 5), col = i % 5, inRiga = Math.min(5, n - r * 5);
        return { x: (col - (inRiga - 1) / 2) * G.passoZ, yt: 12 * G.s + r * G.rigaZ };
      }

      function nodoOggetto(o, p, tipo) {
        const g = el('g', { class: 'ogg', 'data-id': o.id, role: 'button', 'aria-label': (o.v > 0 ? 'palloncino ' : 'zavorra ') + segno(o.v) });
        let x, y, w, h;
        if (tipo === 'su') {
          w = o.v === 3 ? G.p3W : G.p1W; h = o.v === 3 ? G.p3H : G.p1H;
          x = p.x; y = p.yb - h;
          const ax = p.x * 0.18, ay = -G.mongH * 0.66;
          g.appendChild(el('path', { d: 'M' + arrotonda(x) + ' ' + arrotonda(p.yb) + ' Q ' + arrotonda(x * 0.55) + ' ' + arrotonda((p.yb + ay) / 2 + 7) + ' ' + arrotonda(ax) + ' ' + arrotonda(ay), fill: 'none', stroke: 'rgba(255,255,255,.85)', 'stroke-width': 1.2 }));
          g.appendChild(immagine(o.v === 3 ? IMG.p3 : IMG.p1, { x: arrotonda(x - w / 2), y: arrotonda(y), width: arrotonda(w), height: arrotonda(h) }));
          if (o.v === 3) g.appendChild(el('text', { x: arrotonda(x), y: arrotonda(y + h * 0.44), 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'num', 'font-size': arrotonda(14 * G.s) }, '3'));
        } else {
          w = o.v === -3 ? G.z3W : G.z1W; h = o.v === -3 ? G.z3H : G.z1H;
          x = p.x; y = p.yt;
          g.appendChild(el('path', { d: 'M0 -2 Q ' + arrotonda(x * 0.4) + ' ' + arrotonda(y * 0.5) + ' ' + arrotonda(x) + ' ' + arrotonda(y + 2), fill: 'none', stroke: 'rgba(40,40,40,.75)', 'stroke-width': 1.2 }));
          g.appendChild(immagine(IMG.z, { x: arrotonda(x - w / 2), y: arrotonda(y), width: arrotonda(w), height: arrotonda(h) }));
          if (o.v === -3) g.appendChild(el('text', { x: arrotonda(x), y: arrotonda(y + h * 0.62), 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'num', 'font-size': arrotonda(14 * G.s) }, '3'));
        }
        g.appendChild(el('rect', { x: arrotonda(x - w / 2 - 5), y: arrotonda(y - 5), width: arrotonda(w + 10), height: arrotonda(h + 10), fill: 'transparent', 'pointer-events': 'all' }));
        return g;
      }

      function disegnaVolo() {
        while (corpo.firstChild) corpo.removeChild(corpo.firstChild);
        corpo.appendChild(immagine(IMG.mong, { x: arrotonda(-G.mongW / 2), y: arrotonda(-G.mongH), width: arrotonda(G.mongW), height: arrotonda(G.mongH) }));
        const su = oggetti.filter(o => o.v > 0), giu = oggetti.filter(o => o.v < 0);
        su.forEach((o, i) => corpo.appendChild(nodoOggetto(o, postoSu(i, su.length), 'su')));
        giu.forEach((o, i) => corpo.appendChild(nodoOggetto(o, postoGiu(i, giu.length), 'giu')));
      }

      /* ---------- movimento ---------- */
      let qDis = 0, qDa = 0, qA = 0, t0 = 0, raf = 0;
      function posiziona() {
        const y = arrotonda(yDi(qDis));
        volo.setAttribute('transform', 'translate(' + G.xm + ' ' + y + ')');
        mira.setAttribute('transform', 'translate(0 ' + y + ')');
      }
      function passo(t) {
        const k = Math.min(1, (t - t0) / DUR), e = 1 - Math.pow(1 - k, 3);
        qDis = qDa + (qA - qDa) * e;
        posiziona();
        raf = k < 1 ? requestAnimationFrame(passo) : 0;
      }
      function vaiA(q, anima) {
        if (anima === false) { if (raf) { cancelAnimationFrame(raf); raf = 0; } qDis = qA = q; posiziona(); return; }
        if (Math.abs(q - qA) < 0.001 && !raf) { return; }
        qDa = qDis; qA = q; t0 = performance.now();
        if (!raf) raf = requestAnimationFrame(passo);
      }

      /* ---------- conti ---------- */
      const quota = () => oggetti.reduce((s, o) => s + o.v, 0);
      const quotaVista = () => (liv.indovina && !scoperto ? 0 : quota());
      function messaggio(t, cl) { msg.textContent = t || ''; msg.className = 'lab-messaggio' + (cl ? ' ' + cl : ''); }

      function coppie() {
        const via = [];
        [1, 3].forEach(k => {
          const pos = [], neg = [];
          oggetti.forEach((o, i) => { if (o.v === k) pos.push(o.id); else if (o.v === -k) neg.push(o.id); });
          const n = Math.min(pos.length, neg.length);
          for (let i = 0; i < n; i++) via.push(pos[i], neg[i]);
        });
        return via;
      }

      function scriviConto() {
        const mostra = !liv.indovina || scoperto, q = quota();
        if (!oggetti.length) contoEl.innerHTML = '<span class="vuoto">Tocca un palloncino o una zavorra qui sotto per attaccarlo.</span>';
        else {
          const pezzi = [];
          oggetti.forEach((o, i) => { if (i) pezzi.push(ctx.tex('+')); pezzi.push(ctx.tex('(' + segnoTex(o.v) + ')')); });
          pezzi.push(ctx.tex('='), mostra ? ctx.tex(segnoTex(q)) : ctx.tex('?'));
          contoEl.innerHTML = pezzi.join('');
        }
        quotaEl.innerHTML = mostra
          ? 'quota: <b class="' + (q > 0 ? 'su' : q < 0 ? 'giu' : '') + '">' + segno(q) + '</b>'
          : 'quota: <b>?</b>';
      }

      function aggiornaPulsanti() {
        const bloccato = !!liv.indovina || esito === 'vinto' || occupato;
        tavolozza.querySelectorAll('.tv').forEach(t => { t.disabled = bloccato; });
        b.semplifica.disabled = bloccato || coppie().length === 0;
        gruppoInd.hidden = !liv.indovina;
        b.controlla.disabled = scoperto;
        risposta.disabled = scoperto;
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length;
      }

      /* ---------- mosse ---------- */
      function attacca(v) {
        if (occupato || esito === 'vinto' || liv.indovina) return;
        if (oggetti.length >= MAX_OGG) { messaggio('Dieci oggetti bastano: staccane uno prima di attaccarne un altro.'); return; }
        if (Math.abs(quota() + v) > LIMITE) { messaggio('Fuori scala: la scala si ferma a ' + segno(v > 0 ? LIMITE : -LIMITE) + '.'); return; }
        oggetti.push({ v: v, id: ++contatore });
        messaggio('');
        aggiorna();
        const n = corpo.querySelector('.ogg[data-id="' + contatore + '"]');
        if (n) n.classList.add('arriva');
      }
      function stacca(id) {
        if (occupato || esito === 'vinto' || liv.indovina) return;
        const o = oggetti.find(x => x.id === id);
        if (!o) return;
        if (o.fisso) { messaggio('Questo era già attaccato all\'inizio: qui non si può togliere.'); return; }
        oggetti = oggetti.filter(x => x.id !== id);
        messaggio('');
        aggiorna();
      }
      function semplifica() {
        if (occupato || esito === 'vinto' || liv.indovina) return;
        const ids = coppie();
        if (!ids.length) { messaggio('Non c\'è nessuna coppia che si annulla: ne serve una fatta di un +1 e un −1, oppure di un +3 e un −3.'); return; }
        occupato = true; aggiornaPulsanti();
        ids.forEach(id => { const n = corpo.querySelector('.ogg[data-id="' + id + '"]'); if (n) n.classList.add('svanisce'); });
        attesa(function () {
          oggetti = oggetti.filter(o => ids.indexOf(o.id) < 0);
          occupato = false;
          messaggio('La mongolfiera non si è mossa: quelle coppie valevano zero.');
          aggiorna();
          if (!spiegatoSemplifica) {
            spiegatoSemplifica = true;
            ctx.zenone('Togliere un +1 e un −1 insieme non sposta la mongolfiera: è per questo che si annullano. Lo stesso vale per un +3 con un −3.', { tipo: 'suggerimento', espressione: 'pensa', durata: 8000 });
          }
        }, 440);
      }

      /* ---------- vittoria ---------- */
      const APPLAUSI = [
        'Quattro palloncini da +1, oppure un +3 e un +1: strade diverse, stessa quota. La somma non guarda l\'ordine.',
        'Sotto lo zero si scende: −3 vuol dire tre passi sotto il pelo dell\'acqua.',
        'Una zavorra in mezzo ai palloncini toglie invece di aggiungere: +3 con un −1 fa +2.',
        'Anche partendo in su si finisce in giù, se le zavorre pesano più dei palloncini: +1 e −6 fanno −5.',
        'Quota zero non vuol dire «niente attaccato»: vuol dire che quello che tira su e quello che tira giù si pareggiano.',
        'Con i pezzi grossi si fa prima: +3 e +3 e +1. Sommare è anche scegliere bene i pezzi.',
        'Quattro pezzi per −8: due da −3 e due da −1, oppure tre da −3 e uno da +1. Il conto torna lo stesso.',
        'Da +5 a −2 il salto è di 7 in giù: meno di tre oggetti non bastava, perché il più pesante vale 3.',
        'Hai fatto il conto prima di vedere: è esattamente quello che serve saper fare con i numeri relativi.',
        'Cinque termini a mente e la nuvola non ti ha ingannato. Sommare relativi è contare quanto tira su e quanto tira giù.'
      ];
      function vinci() {
        if (esito === 'vinto') return;
        esito = 'vinto';
        clearTimeout(tVinci); tVinci = null;
        messaggio('Quota ' + segno(quota()) + ': ci sei.', 'ok');
        ctx.completato(livello);
        b.ric.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        aggiornaPulsanti();
        ctx.zenone(APPLAUSI[livello] || 'Quota raggiunta.', { espressione: 'orgoglioso', durata: 7000 });
      }
      function controllaVittoria() {
        clearTimeout(tVinci); tVinci = null;
        if (esito || liv.indovina || occupato || !oggetti.length) return;
        if (quota() !== liv.obiettivo) return;
        if (liv.vincolo && !liv.vincolo(oggetti)) { messaggio(liv.avviso, 'no'); return; }
        tVinci = setTimeout(vinci, 900);      /* mezzo secondo di fermo dopo il volo */
      }

      function aggiorna(anima) {
        disegnaVolo();
        vaiA(quotaVista(), anima);
        scriviConto();
        aggiornaPulsanti();
        controllaVittoria();
      }

      /* ---------- indovina prima ---------- */
      function controlla() {
        if (scoperto || !liv.indovina) return;
        const val = parseInt(risposta.value, 10);
        if (isNaN(val)) {
          risposta.classList.remove('sbagliata'); void risposta.offsetWidth; risposta.classList.add('sbagliata');
          messaggio('Scrivi un numero: la quota che ti aspetti.'); return;
        }
        scoperto = true;
        nuvola.classList.add('via');
        volo.style.opacity = '1';
        mira.style.display = '';
        attesa(() => { if (nuvola) nuvola.style.display = 'none'; }, 640);
        aggiorna(true);
        const q = quota(), su = oggetti.reduce((s, o) => s + (o.v > 0 ? o.v : 0), 0), giu = -oggetti.reduce((s, o) => s + (o.v < 0 ? o.v : 0), 0);
        if (val === q) attesa(vinci, 700);
        else {
          esito = 'sbagliato';
          messaggio('No: la mongolfiera si ferma a ' + segno(q) + '. Leggila sulla scala.', 'no');
          b.ric.textContent = 'Riprova ↺';
          aggiornaPulsanti();
          ctx.zenone('Conta prima quanto tira su e quanto tira giù, poi fai la differenza: i palloncini danno ' + segno(su) + ', le zavorre ' + segno(-giu) + ', e ' + su + ' − ' + giu + ' = ' + segno(q) + '.', { tipo: 'errore', espressione: 'pensa', durata: 9000 });
        }
      }

      /* ---------- scena e livelli ---------- */
      function rifaiScena() {
        misura();
        costruisciScena();
        const coperta = !!liv.indovina && !scoperto;
        nuvola.style.display = coperta ? '' : 'none';
        volo.style.opacity = coperta ? '0' : '1';
        mira.style.display = coperta ? 'none' : '';
        disegnaVolo();
        vaiA(quotaVista(), false);
      }
      function avviaLivello(n) {
        fermaTimer(); clearTimeout(tVinci); tVinci = null;
        livello = n; liv = LIVELLI[n];
        esito = null; occupato = false; oggetti = []; contatore = 0;
        scoperto = !liv.indovina;
        obEl.textContent = liv.testo;
        risposta.value = ''; risposta.classList.remove('sbagliata');
        b.ric.textContent = 'Ricomincia';
        messaggio('');
        if (liv.iniziali) liv.iniziali.forEach(v => oggetti.push({ v: v, id: ++contatore, fisso: true }));
        if (liv.indovina) generaTermini(liv.indovina).forEach(v => oggetti.push({ v: v, id: ++contatore, fisso: true }));
        rifaiScena();
        scriviConto();
        aggiornaPulsanti();
      }

      /* ---------- eventi ---------- */
      tavolozza.addEventListener('click', e => {
        const t = e.target.closest('.tv');
        if (!t || t.disabled) return;
        attacca(parseInt(t.dataset.v, 10));
      });
      scena.addEventListener('pointerdown', e => {
        const g = e.target.closest ? e.target.closest('.ogg') : null;
        if (!g) return;
        e.preventDefault();
        stacca(parseInt(g.getAttribute('data-id'), 10));
      });
      b.semplifica.addEventListener('click', semplifica);
      b.controlla.addEventListener('click', controlla);
      risposta.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); controlla(); } });
      b.ric.addEventListener('click', () => avviaLivello(esito === 'vinto' ? (livello + 1) % LIVELLI.length : livello));
      b.aiuto.addEventListener('click', () => ctx.zenone('I palloncini tirano su, le zavorre tirano giù: la quota dove si ferma la mongolfiera è la somma di tutto quello che le hai attaccato. Un +1 e un −1 insieme non fanno niente, si annullano: «Semplifica» li toglie e la mongolfiera non si muove. Sotto lo zero si finisce in acqua, e i numeri hanno il segno −.', { tipo: 'suggerimento', espressione: 'pensa', durata: 11000 }));

      let ro = null;
      if (window.ResizeObserver) {
        ro = new ResizeObserver(() => {
          const largo = (radice.clientWidth || 400) >= 620;
          if (largo !== G.largo) rifaiScena();
        });
        ro.observe(radice);
      }

      avviaLivello(livello);

      return function smonta() {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        clearTimeout(tVinci);
        fermaTimer();
        if (ro) ro.disconnect();
      };
    }
  });
})();
