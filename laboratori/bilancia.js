/* Laboratorio «La bilancia» — equazioni di primo grado come equilibrio di pesi.
   Casse = x (peso ignoto), pesi = +1, palloncini = −1. Ogni mossa agisce su entrambi i piatti.
   Modello di riferimento per gli altri laboratori (vedi SCHEMA-LAB.md): schermata singola con
   .lab-layout, scena SVG che si adatta alla forma dello spazio, pallini dei livelli e modalità libera. */
(function () {
  const STILE = `
    /* --- scena: equazione in alto, bilancia sotto che prende tutto il resto --- */
    .lab-bilancia .lab-scena { flex-direction: column; align-items: stretch; justify-content: flex-start; background: linear-gradient(180deg, var(--sup2), var(--sup)); overflow: hidden; }
    .lab-bilancia .testa-scena { flex: none; text-align: center; padding: clamp(8px, 2.4cqh, 26px) 14px 0; }
    .lab-bilancia .equazione { font-size: clamp(1.4rem, 4.4cqmin, 2.6rem); line-height: 1.35; min-height: 1.35em; }
    .lab-bilancia .storia { font-size: clamp(.88rem, 2cqmin, 1.12rem); color: var(--testo2); line-height: 1.9; max-height: 3.8em; overflow: hidden; }
    .lab-bilancia .storia .katex { font-size: 1em; }
    .lab-bilancia .storia .freccia { margin: 0 6px; opacity: .6; }
    /* in orizzontale equazione e passi stanno nel pannello: i passi uno sotto l'altro, come sul quaderno */
    .lab-bilancia .lab-lato > .testa-scena { padding: 0; flex: 0 1 auto; min-height: 0; display: flex; flex-direction: column; }
    .lab-bilancia .lab-lato .storia { max-height: none; flex: 0 1 auto; min-height: 0; line-height: 1.75; }
    .lab-bilancia .lab-lato .storia .passo { display: block; }
    .lab-bilancia .lab-lato .storia .freccia { display: none; }
    .lab-bilancia .lab-lato .storia .passo:last-child { color: var(--testo); }
    .lab-bilancia .lab-scena > svg { flex: 1 1 0; min-height: 0; width: 100%; height: auto; overflow: visible; }
    .lab-bilancia .trave { transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
    .lab-bilancia .piatto-g { transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
    .lab-bilancia .cassa { fill: #c98a4b; stroke: #7a4b1d; stroke-width: 2; }
    .lab-bilancia .cassa-testo { font: 700 18px var(--font); fill: #3d2408; }
    .lab-bilancia .peso { fill: #6b7280; stroke: #374151; stroke-width: 2; }
    .lab-bilancia .peso-testo { font: 700 13px var(--font); fill: #fff; }
    .lab-bilancia .pallone { stroke: rgba(0,0,0,.25); stroke-width: 1.5; }
    .lab-bilancia .filo { stroke: var(--testo2); stroke-width: 1; fill: none; }
    /* --- pannello --- */
    .lab-bilancia .lab-lato > * { width: 100%; max-width: 760px; margin-left: auto; margin-right: auto; }
    .lab-bilancia .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-bilancia .lab-messaggio .katex { font-size: 1.05em; }
    .lab-bilancia .mosse { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .lab-bilancia .mosse .btn { min-height: clamp(40px, 6.2cqh, 54px); padding: 6px 8px; font-size: clamp(.9rem, 2.2cqmin, 1.05rem); }
    @container lab (max-aspect-ratio: 5 / 4) and (min-width: 600px) { .lab-bilancia .mosse { grid-template-columns: repeat(4, 1fr); } }
    .lab-bilancia .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; }
    .lab-bilancia .lab-barra .btn { min-height: 40px; }
    .lab-bilancia .btn[disabled] { opacity: .35; cursor: default; }
    .lab-bilancia .conta-mosse { position: absolute; right: 12px; bottom: 8px; margin: 0; font-size: .8rem; white-space: nowrap; }
    .lab-bilancia.in-libero .lab-messaggio:empty { display: none; }
    .lab-bilancia .vinto { display: inline-block; animation: lab-bilancia-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-bilancia-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-bilancia .legenda { display: flex; gap: 2px 10px; flex-wrap: wrap; justify-content: center; font-size: .75rem; color: var(--testo2); }
    .lab-bilancia .legenda span { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
    .lab-bilancia .legenda i { display: inline-block; width: 13px; height: 13px; border-radius: 3px; }

    /* --- pezzi comuni ai laboratori a schermata singola (candidati per compasso.css) --- */
    .lab-bilancia .lab-livelli { display: flex; align-items: center; gap: 2px; }
    .lab-bilancia .lab-pallino { flex: 1 1 0; min-width: 0; max-width: 40px; height: 36px; padding: 0; border: 0; background: none; display: grid; place-items: center; cursor: pointer; font: 600 12px var(--font); color: var(--testo2); }
    .lab-bilancia .lab-pallino span { width: min(26px, 100%); aspect-ratio: 1; border-radius: 50%; border: 1.5px solid var(--bordo2); background: var(--sup); display: grid; place-items: center; transition: transform .25s var(--molla); }
    .lab-bilancia .lab-pallino.fatto span { background: var(--ok); border-color: var(--ok); color: #fff; }
    .lab-bilancia .lab-pallino.attivo span { border-color: var(--accento); box-shadow: 0 0 0 3px var(--accento-tenue); color: var(--testo); transform: scale(1.08); }
    .lab-bilancia .lab-pallino.fatto.attivo span { color: #fff; }
    .lab-bilancia .lab-pallino:disabled { opacity: .35; cursor: default; }
    .lab-bilancia .lab-libero { flex: none; margin-left: auto; min-height: 36px; padding: 4px 12px; }
    .lab-bilancia .lab-libero[aria-pressed="true"] { background: var(--accento); border-color: var(--accento); color: #fff; }
    .lab-bilancia .lab-aiuto { position: absolute; z-index: 3; top: 10px; left: 50%; transform: translateX(-50%); width: min(560px, calc(100% - 20px)); max-height: calc(100% - 20px); overflow: auto; padding: 14px 16px 12px; background: var(--sup); border: 1px solid var(--bordo); border-radius: 14px; box-shadow: var(--ombra); font-size: clamp(.95rem, 2.2cqmin, 1.1rem); line-height: 1.55; animation: lab-bilancia-pop .3s ease-out; }
    .lab-bilancia .lab-aiuto[hidden] { display: none; }
    .lab-bilancia .lab-aiuto p { margin: 0 0 10px; }
    .lab-bilancia .lab-aiuto .btn { min-height: 40px; }
    .lab-bilancia .lab-parametri { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 10px; align-items: center; }
    .lab-bilancia .lab-parametri .didascalia { grid-column: 1 / -1; text-align: center; font-size: .82rem; color: var(--testo2); }
    .lab-bilancia .lab-parametri[hidden] { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (min-width: 600px) { .lab-bilancia .lab-parametri { grid-template-columns: repeat(4, 1fr); } }
    .lab-bilancia .lab-param { display: flex; align-items: center; justify-content: center; gap: 4px; }
    .lab-bilancia .lab-param .nome { min-width: 1.4em; text-align: right; font-size: 1.05rem; }
    .lab-bilancia .lab-param .btn { min-height: 38px; min-width: 38px; padding: 0 8px; font-size: 1.15rem; }
    .lab-bilancia .lab-param output { min-width: 2.2em; text-align: center; font-weight: 600; font-variant-numeric: tabular-nums; }
  `;

  /* livelli: ax + b = cx + d, scritti come piatti {x, p} (p > 0 pesi, p < 0 palloncini) */
  const LIVELLI = [
    { s: { x: 1, p: 3 }, d: { x: 0, p: 5 } },
    { s: { x: 2, p: 0 }, d: { x: 0, p: 6 } },
    { s: { x: 2, p: 1 }, d: { x: 0, p: 7 } },
    { s: { x: 3, p: 2 }, d: { x: 1, p: 6 } },
    { s: { x: 2, p: -3 }, d: { x: 0, p: 5 } },
    { s: { x: 1, p: 4 }, d: { x: 2, p: 1 } },
    { s: { x: 4, p: -2 }, d: { x: 2, p: 4 } },
    { s: { x: 3, p: 5 }, d: { x: 2, p: 2 } },
    { s: { x: 5, p: -4 }, d: { x: 3, p: -8 } },
    { s: { x: 2, p: 7 }, d: { x: 4, p: -1 } }
  ];

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const clona = o => ({ s: { x: o.s.x, p: o.s.p }, d: { x: o.d.x, p: o.d.p } });

  function lato(t) {   /* {x, p} → LaTeX */
    const parti = [];
    if (t.x) parti.push((t.x === 1 ? '' : t.x) + 'x');
    if (t.p) parti.push(parti.length ? (t.p > 0 ? ' + ' + t.p : ' - ' + (-t.p)) : String(t.p));
    return parti.length ? parti.join('') : '0';
  }
  const equazione = st => lato(st.s) + ' = ' + lato(st.d);

  function mosseMinime(l) {
    const a = l.s.x, b = l.s.p, c = l.d.x, d = l.d.p;
    const sin = a > c ? c + Math.abs(b) + (a - c > 1 ? 1 : 0) : Infinity;
    const des = c > a ? a + Math.abs(d) + (c - a > 1 ? 1 : 0) : Infinity;
    return Math.min(sin, des);
  }

  /* geometria della bilancia: la larghezza è fissa (viewBox da x = 20 a 580), l'altezza no.
     E = quanto si allunga verso l'alto (colonna e fili più lunghi) per riempire uno spazio alto. */
  const VB_X = 20, VB_W = 560, VB_Y = 92, VB_H = 232, E_MAX = 240;
  const Y_PIATTO = 262, XS = 150, XD = 450, LARG = 190;

  COMPASSO.registraLab({
    id: 'bilancia',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-bilancia')) { const s = document.createElement('style'); s.id = 'stile-lab-bilancia'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-bilancia');
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="testa-scena"><div class="equazione"></div><div class="storia"></div></div>
            <span class="lab-livello conta-mosse"></span>
            <div class="lab-aiuto" hidden data-scorre><p></p><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: scegli tu l'equazione">Libero</button></div>
            <div class="lab-parametri" hidden>
              <div class="didascalia">Scegli i numeri di ${ctx.tex('ax + b = cx + d')}</div>
              ${['a', 'b', 'c', 'd'].map(n => `<div class="lab-param" data-p="${n}"><span class="nome">${ctx.tex(n)}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="${n} meno uno">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="${n} più uno">+</button></div>`).join('')}
            </div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="mosse">
              <button type="button" class="btn m-piu" title="Aggiungi un peso a tutti e due i piatti">+1 a entrambi</button>
              <button type="button" class="btn m-meno" title="Aggiungi un palloncino a tutti e due i piatti (toglie 1)">−1 a entrambi</button>
              <button type="button" class="btn m-x" title="Togli una cassa da tutti e due i piatti">−x a entrambi</button>
              <button type="button" class="btn m-div" title="Dividi i due piatti in parti uguali">÷ dividi</button>
            </div>
            <div class="lab-barra">
              <button type="button" class="btn piccolo m-annulla">Annulla</button>
              <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
              <button type="button" class="btn piccolo m-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo m-aiuto" aria-label="Come si gioca">?</button>
            </div>
            <div class="legenda"><span><i style="background:#c98a4b"></i> cassa = x (peso ignoto)</span><span><i style="background:#6b7280"></i> peso = +1</span><span><i style="background:var(--s1);border-radius:50%"></i> palloncino = −1</span></div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), lato = q('.lab-lato'), testa = q('.testa-scena'), aiutoEl = q('.lab-aiuto');
      const eqEl = q('.equazione'), storiaEl = q('.storia'), msg = q('.lab-messaggio'), livEl = q('.lab-livello'), livelliEl = q('.lab-livelli');
      const b = { piu: q('.m-piu'), meno: q('.m-meno'), x: q('.m-x'), div: q('.m-div'), annulla: q('.m-annulla'), ric: q('.m-ricomincia'), aiuto: q('.m-aiuto'), chiudi: q('.m-chiudi'), casuale: q('.m-casuale'), libero: q('.lab-libero') };
      const parametriEl = q('.lab-parametri');

      let livello = 0, st, storia, pila, finito, timer = null;
      let libero = false, salvato = null;   /* modalità libera, e il livello da cui ci si è entrati */
      const completati = ctx.stato().livelli;
      livello = Math.min(LIVELLI.length - 1, completati.length ? Math.max(...completati) + 1 : 0);
      if (livello >= LIVELLI.length) livello = 0;

      /* ---------- scena SVG (si ricostruisce quando cambia la forma dello spazio) ---------- */
      const svg = el('svg', { class: 'bilancia-svg', role: 'img', 'aria-label': 'Bilancia a due piatti', preserveAspectRatio: 'xMidYMid meet' });
      scena.insertBefore(svg, aiutoEl);
      let E = -1, trave, gruppi = {};

      function costruisci(nuovaE) {
        E = nuovaE;
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        svg.setAttribute('viewBox', VB_X + ' ' + (VB_Y - E) + ' ' + VB_W + ' ' + (VB_H + E));
        const yT = 118 - E;   /* altezza del fulcro */
        svg.appendChild(el('path', { d: 'M260 318 h80 l-14 -22 h-52 z', fill: 'var(--testo2)', opacity: .55 }));
        svg.appendChild(el('rect', { x: 294, y: yT + 4, width: 12, height: 294 - yT, rx: 4, fill: 'var(--testo2)', opacity: .7 }));
        trave = el('g', { class: 'trave' });
        trave.style.transformOrigin = '300px ' + yT + 'px';
        trave.appendChild(el('rect', { x: 110, y: yT - 6, width: 380, height: 12, rx: 6, fill: 'var(--testo)', opacity: .8 }));
        trave.appendChild(el('circle', { cx: 300, cy: yT, r: 10, fill: 'var(--accento)' }));
        svg.appendChild(trave);
        gruppi = {};
        ['s', 'd'].forEach(k => {
          const cx = k === 's' ? XS : XD;
          const g = el('g', { class: 'piatto-g' });
          g.appendChild(el('path', { d: `M${cx - 70} ${Y_PIATTO - 4} L${cx} ${yT + 6} L${cx + 70} ${Y_PIATTO - 4}`, class: 'filo' }));
          g.appendChild(el('rect', { x: cx - LARG / 2, y: Y_PIATTO - 4, width: LARG, height: 10, rx: 5, fill: 'var(--testo)', opacity: .75 }));
          const contenuto = el('g', { class: 'contenuto' }); g.appendChild(contenuto);
          svg.appendChild(g); gruppi[k] = { g, contenuto, cx };
        });
        if (st) { disegnaLato('s'); disegnaLato('d'); inclina(); }
      }

      function disegnaLato(k) {
        const { contenuto, cx } = gruppi[k]; while (contenuto.firstChild) contenuto.removeChild(contenuto.firstChild);
        const t = st[k];
        const oggetti = [];
        for (let i = 0; i < t.x; i++) oggetti.push('x');
        for (let i = 0; i < Math.max(0, t.p); i++) oggetti.push('p');
        /* casse e pesi in righe da 5, dal piatto in su */
        const perRiga = 5, largOgg = 36;
        oggetti.forEach((o, i) => {
          const riga = Math.floor(i / perRiga), col = i % perRiga, n = Math.min(perRiga, oggetti.length - riga * perRiga);
          const x0 = cx - (n * largOgg) / 2 + col * largOgg + 2;
          if (o === 'x') {
            const y = Y_PIATTO - 6 - (riga + 1) * 34;
            contenuto.appendChild(el('rect', { x: x0, y, width: 32, height: 32, rx: 4, class: 'cassa' }));
            contenuto.appendChild(el('text', { x: x0 + 16, y: y + 22, 'text-anchor': 'middle', class: 'cassa-testo' }, 'x'));
          } else {
            const y = Y_PIATTO - 6 - riga * 34 - 26;
            contenuto.appendChild(el('rect', { x: x0 + 4, y, width: 24, height: 22, rx: 3, class: 'peso' }));
            contenuto.appendChild(el('text', { x: x0 + 16, y: y + 16, 'text-anchor': 'middle', class: 'peso-testo' }, '1'));
          }
        });
        /* palloncini: legati al piatto, galleggiano sopra (più in alto se la colonna è lunga) */
        const n = Math.max(0, -t.p), su = Math.round(E * .55);
        for (let i = 0; i < n; i++) {
          const px = cx - (n - 1) * 16 + i * 32, py = 168 - su - (i % 2) * 12;
          contenuto.appendChild(el('path', { d: `M${px} ${py + 16} Q${px + 4} ${Y_PIATTO - 30} ${cx + (px - cx) * .3} ${Y_PIATTO - 4}`, class: 'filo' }));
          contenuto.appendChild(el('ellipse', { cx: px, cy: py, rx: 13, ry: 16, fill: i % 2 ? 'var(--s2)' : 'var(--s1)', class: 'pallone' }));
          contenuto.appendChild(el('path', { d: `M${px - 3} ${py + 16} l3 5 l3 -5 z`, fill: i % 2 ? 'var(--s2)' : 'var(--s1)' }));
        }
      }

      /* la forma dello spazio decide quanto allungare la bilancia: niente buchi sopra e sotto */
      function adatta() {
        const orizz = radice.clientWidth * 4 >= radice.clientHeight * 5;   /* come la container query di .lab-layout */
        if (orizz && testa.parentNode !== lato) lato.insertBefore(testa, parametriEl.nextSibling);
        else if (!orizz && testa.parentNode !== scena) scena.insertBefore(testa, scena.firstChild);
        const r = svg.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return;
        const voluta = Math.max(0, Math.min(E_MAX, Math.round((VB_W * r.height / r.width - VB_H) / 10) * 10));
        if (voluta !== E) costruisci(voluta);
        adattaStoria();
      }

      /* inclinazione a riposo: in pari, salvo i casi (solo in modalità libera) in cui nessuna x la pareggia */
      function inclina(scossa) {
        let ang = 0, dy = 0;
        if (st.s.x === st.d.x && st.s.p !== st.d.p) { const sinPesa = st.s.p > st.d.p; ang = sinPesa ? -6 : 6; dy = sinPesa ? 15 : -15; }
        if (scossa) { ang -= 2.5; dy += 6; }
        trave.style.transform = ang ? 'rotate(' + ang + 'deg)' : '';
        gruppi.s.g.style.transform = dy ? 'translateY(' + dy + 'px)' : '';
        gruppi.d.g.style.transform = dy ? 'translateY(' + (-dy) + 'px)' : '';
      }
      function oscilla() {
        inclina(true);
        clearTimeout(timer);
        timer = setTimeout(() => inclina(false), 260);
      }

      /* la storia sta su una o due righe: se non ci sta, si tengono i passi più recenti */
      function adattaStoria() {
        const pezzi = storia.map((e, i) => '<span class="passo">' + (i ? '<span class="freccia">⟶</span>' : '') + ctx.tex(e) + '</span>');
        storiaEl.innerHTML = pezzi.join('');
        for (let via = 1; storiaEl.scrollHeight > storiaEl.clientHeight + 1 && via < pezzi.length - 1; via++) {
          storiaEl.innerHTML = '<span class="passo">⋯</span>' + pezzi.slice(via).join('');
        }
      }

      /* ---------- logica ---------- */
      function risolto() {
        const { s, d } = st;
        if (s.x === 1 && s.p === 0 && d.x === 0) return d.p;
        if (d.x === 1 && d.p === 0 && s.x === 0) return s.p;
        return null;
      }
      function aggiornaPulsanti() {
        const { s, d } = st;
        b.x.disabled = finito || !(s.x >= 1 && d.x >= 1);
        const divS = s.x >= 2 && s.p === 0 && d.x === 0 && d.p % s.x === 0, divD = d.x >= 2 && d.p === 0 && s.x === 0 && s.p % d.x === 0;
        b.div.disabled = finito || !(divS || divD);
        b.piu.disabled = finito; b.meno.disabled = finito;
        b.annulla.disabled = !pila.length || finito;
      }
      function aggiornaLivelli() {
        const fatti = ctx.stato().livelli, sblocco = fatti.length ? Math.max(...fatti) + 1 : 0;
        [...livelliEl.querySelectorAll('.lab-pallino')].forEach((p, k) => {
          p.classList.toggle('fatto', fatti.includes(k));
          p.classList.toggle('attivo', !libero && k === livello);
          p.disabled = k > sblocco && k !== livello;
          p.setAttribute('aria-current', !libero && k === livello ? 'step' : 'false');
        });
        b.libero.setAttribute('aria-pressed', libero);
      }
      function ridisegna() {
        disegnaLato('s'); disegnaLato('d'); inclina();
        eqEl.innerHTML = ctx.tex(equazione(st));
        adattaStoria();
        livEl.textContent = 'mosse: ' + pila.length;
        if (libero) aggiornaParametri();
        aggiornaPulsanti(); aggiornaLivelli();
      }
      function avviaLivello(n) {
        libero = false; salvato = null; mostraLibero();
        livello = n; st = clona(LIVELLI[n]); storia = [equazione(st)]; pila = []; finito = false;
        msg.textContent = ''; msg.className = 'lab-messaggio';
        b.ric.textContent = 'Ricomincia';
        ridisegna();
      }
      function mossa(fn) {
        if (finito) return;
        pila.push(clona(st)); fn(st);
        storia.push(equazione(st)); oscilla(); ridisegna();
        if (libero) { osserva(); return; }   /* in modalità libera niente verdetto */
        const val = risolto();
        if (val !== null) {
          finito = true; aggiornaPulsanti();
          const min = mosseMinime(LIVELLI[livello]);
          msg.innerHTML = '<span class="vinto">Risolta: ' + ctx.tex('x = ' + val) + '</span>';
          msg.className = 'lab-messaggio ok';
          ctx.completato(livello); aggiornaLivelli();
          const bene = pila.length <= min;
          ctx.zenone(bene ? 'Perfetto: ' + pila.length + ' mosse, non si poteva fare meglio. Una cassa pesa ' + val + '.' : 'Risolta in ' + pila.length + ' mosse; si poteva in ' + min + '. Prova a togliere prima quello che sta dalla parte delle casse.', { espressione: bene ? 'orgoglioso' : 'felice', durata: 6000 });
          if (livello < LIVELLI.length - 1) { b.ric.textContent = 'Prossimo livello ▶'; }
          else b.ric.textContent = 'Ricomincia dal primo';
        }
      }
      const AIUTO = 'La bilancia è in equilibrio perché i due piatti pesano uguale: questa è l\'equazione. Se aggiungi o togli la stessa cosa a tutti e due, resta in equilibrio. Un palloncino e un peso insieme si annullano. Quando su un piatto resta una cassa sola, l\'altro piatto dice quanto pesa: quello è x.';
      function mostraAiuto(testo) {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        aiutoEl.querySelector('p').textContent = testo; aiutoEl.hidden = false;
      }

      b.piu.addEventListener('click', () => mossa(s => { s.s.p += 1; s.d.p += 1; }));
      b.meno.addEventListener('click', () => mossa(s => { s.s.p -= 1; s.d.p -= 1; }));
      b.x.addEventListener('click', () => mossa(s => { s.s.x -= 1; s.d.x -= 1; }));
      b.div.addEventListener('click', () => mossa(s => { if (s.s.x >= 2 && s.s.p === 0) { s.d.p /= s.s.x; s.s.x = 1; } else { s.s.p /= s.d.x; s.d.x = 1; } }));
      b.annulla.addEventListener('click', () => { if (!pila.length || finito) return; st = pila.pop(); storia.pop(); ridisegna(); });
      b.ric.addEventListener('click', () => {
        if (libero) { if (pila.length) st = pila[0]; storia = [equazione(st)]; pila = []; ridisegna(); osserva(); return; }
        if (finito) avviaLivello((livello + 1) % LIVELLI.length); else avviaLivello(livello);
      });
      b.aiuto.addEventListener('click', () => mostraAiuto(libero ? AIUTO + ' ' + AIUTO_LIBERO : AIUTO));
      b.chiudi.addEventListener('click', () => { aiutoEl.hidden = true; });

      /* ---------- modalità libera: l'equazione la sceglie lo studente, e nessuno giudica ---------- */
      const LIM = { x: [0, 5], p: [-8, 10] };
      const AIUTO_LIBERO = 'In modalità libera scegli tu i numeri di ax + b = cx + d con − e +, poi prova a risolverla con le mosse. Casuale ne propone una che si risolve con x intera.';
      const campo = n => ({ a: ['s', 'x'], b: ['s', 'p'], c: ['d', 'x'], d: ['d', 'p'] })[n];
      function puoCambiare(n, dd) {
        const [k, f] = campo(n), v = st[k][f] + dd, [lo, hi] = LIM[f];
        if (v < lo || v > hi) return false;
        if (f === 'x' && v + st[k === 's' ? 'd' : 's'].x === 0) return false;   /* almeno una cassa da qualche parte */
        return true;
      }
      function aggiornaParametri() {
        parametriEl.querySelectorAll('.lab-param').forEach(box => {
          const n = box.dataset.p, [k, f] = campo(n);
          box.querySelector('output').textContent = String(st[k][f]).replace('-', '−');
          box.querySelectorAll('button').forEach(bt => { bt.disabled = !puoCambiare(n, +bt.dataset.d); });
        });
      }
      function osserva() {   /* osservazioni neutre, mai valutazioni */
        const { s, d } = st, val = risolto();
        let t = '';
        if (s.x === d.x && s.p !== d.p) t = 'Stesse casse, pesi diversi: nessuna x rimette in pari la bilancia. È impossibile.';
        else if (s.x === d.x) t = 'Piatti identici: la bilancia sta in pari con qualunque x. È indeterminata.';
        else if (val !== null) t = 'Su un piatto c\'è una cassa sola: ' + ctx.tex('x = ' + val);
        msg.innerHTML = t; msg.className = 'lab-messaggio';
      }
      function nuovaEquazione(nuovo) { st = nuovo; storia = [equazione(st)]; pila = []; finito = false; ridisegna(); osserva(); }
      function mostraLibero() {
        parametriEl.hidden = !libero; b.casuale.hidden = !libero;
        radice.classList.toggle('in-libero', libero);
      }
      function entraLibero() {
        salvato = { livello, st: clona(st), storia: storia.slice(), pila: pila.map(clona), finito, msg: msg.innerHTML, cls: msg.className, ric: b.ric.textContent };
        libero = true; mostraLibero();
        b.ric.textContent = 'Ricomincia'; aiutoEl.hidden = true;
        nuovaEquazione(clona(LIVELLI[livello]));
      }
      function esciLibero() {   /* si torna al livello com'era */
        const z = salvato; libero = false; salvato = null; mostraLibero();
        livello = z.livello; st = z.st; storia = z.storia; pila = z.pila; finito = z.finito;
        b.ric.textContent = z.ric; ridisegna();
        msg.innerHTML = z.msg; msg.className = z.cls;
      }
      function casuale() {
        const r = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
        for (let tent = 0; tent < 200; tent++) {
          const a = r(1, 4), c = r(0, 3), x = r(-3, 5), bb = r(-6, 7);
          const dd = (a - c) * x + bb;
          if (a === c || !x || dd < LIM.p[0] || dd > LIM.p[1] || (bb === 0 && dd === 0)) continue;
          const e = { s: { x: a, p: bb }, d: { x: c, p: dd } };
          if (equazione(e) === equazione(st)) continue;
          nuovaEquazione(Math.random() < .5 ? e : { s: e.d, d: e.s }); return;
        }
      }
      b.libero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      b.casuale.addEventListener('click', casuale);
      parametriEl.addEventListener('click', ev => {
        const bt = ev.target.closest('button[data-d]'); if (!bt || !libero) return;
        const n = bt.closest('.lab-param').dataset.p, dd = +bt.dataset.d;
        if (!puoCambiare(n, dd)) return;
        const nuovo = clona(st), [k, f] = campo(n); nuovo[k][f] += dd;
        nuovaEquazione(nuovo);
      });

      /* pallini dei livelli */
      LIVELLI.forEach((_, k) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (k + 1)); p.innerHTML = '<span>' + (k + 1) + '</span>';
        p.addEventListener('click', () => avviaLivello(k));
        livelliEl.insertBefore(p, b.libero);
      });

      costruisci(0);
      avviaLivello(livello);
      adatta();
      const ro = new ResizeObserver(adatta); ro.observe(radice); ro.observe(svg); ro.observe(testa);
      return function smonta() { clearTimeout(timer); ro.disconnect(); };
    }
  });
})();
