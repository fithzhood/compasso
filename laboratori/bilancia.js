/* Laboratorio «La bilancia» — equazioni di primo grado come equilibrio di pesi.
   Casse = x (peso ignoto), pesi = +1, palloncini = −1. Ogni mossa agisce su entrambi i piatti.
   Modello di riferimento per gli altri laboratori (vedi SCHEMA-LAB.md). */
(function () {
  const STILE = `
    .lab-bilancia .lab-scena { background: linear-gradient(180deg, var(--sup2), var(--sup)); }
    .lab-bilancia .lab-scena svg { max-width: 720px; margin: 0 auto; }
    .lab-bilancia .trave { transition: transform .35s cubic-bezier(.34,1.56,.64,1); transform-origin: 300px 118px; }
    .lab-bilancia .piatto-g { transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
    .lab-bilancia .cassa { fill: #c98a4b; stroke: #7a4b1d; stroke-width: 2; }
    .lab-bilancia .cassa-testo { font: 700 18px var(--font); fill: #3d2408; }
    .lab-bilancia .peso { fill: #6b7280; stroke: #374151; stroke-width: 2; }
    .lab-bilancia .peso-testo { font: 700 12px var(--font); fill: #fff; }
    .lab-bilancia .pallone { stroke: rgba(0,0,0,.25); stroke-width: 1.5; }
    .lab-bilancia .filo { stroke: var(--testo2); stroke-width: 1; fill: none; }
    .lab-bilancia .equazione { text-align: center; padding: 10px 12px 2px; font-size: 1.35rem; }
    .lab-bilancia .storia { text-align: center; padding: 0 12px 6px; font-size: .95rem; color: var(--testo2); line-height: 1.9; }
    .lab-bilancia .storia .katex { font-size: 1em; }
    .lab-bilancia .storia .freccia { margin: 0 6px; opacity: .6; }
    .lab-bilancia .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
    .lab-bilancia .mossa { display: inline-flex; align-items: center; gap: 6px; }
    .lab-bilancia .mossa svg { width: 20px; height: 20px; }
    .lab-bilancia .vinto { animation: lab-bilancia-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-bilancia-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-bilancia .legenda { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; padding: 4px 12px 8px; font-size: .82rem; color: var(--testo2); }
    .lab-bilancia .legenda span { display: inline-flex; align-items: center; gap: 5px; }
    .lab-bilancia .legenda i { display: inline-block; width: 14px; height: 14px; border-radius: 3px; }
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

  COMPASSO.registraLab({
    id: 'bilancia',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-bilancia')) { const s = document.createElement('style'); s.id = 'stile-lab-bilancia'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-bilancia');
      radice.innerHTML = `
        <div class="lab-scena"></div>
        <div class="equazione"></div>
        <div class="storia"></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn m-piu" title="Aggiungi un peso a tutti e due i piatti"><span class="mossa">+1 a entrambi</span></button>
          <button type="button" class="btn m-meno" title="Aggiungi un palloncino a tutti e due i piatti (toglie 1)"><span class="mossa">−1 a entrambi</span></button>
          <button type="button" class="btn m-x" title="Togli una cassa da tutti e due i piatti"><span class="mossa">−x a entrambi</span></button>
          <button type="button" class="btn m-div" title="Dividi i due piatti in parti uguali"><span class="mossa">÷ dividi</span></button>
          <button type="button" class="btn piccolo m-annulla">Annulla</button>
          <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo m-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>
        <div class="legenda"><span><i style="background:#c98a4b"></i> cassa = x (peso ignoto)</span><span><i style="background:#6b7280"></i> peso = +1</span><span><i style="background:var(--s1);border-radius:50%"></i> palloncino = −1</span></div>`;

      const scena = radice.querySelector('.lab-scena');
      const eqEl = radice.querySelector('.equazione'), storiaEl = radice.querySelector('.storia'), msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const b = { piu: radice.querySelector('.m-piu'), meno: radice.querySelector('.m-meno'), x: radice.querySelector('.m-x'), div: radice.querySelector('.m-div'), annulla: radice.querySelector('.m-annulla'), ric: radice.querySelector('.m-ricomincia'), aiuto: radice.querySelector('.m-aiuto') };

      let livello = 0, st, storia, pila, finito, timer = null;
      const completati = ctx.stato().livelli;
      livello = Math.min(LIVELLI.length - 1, completati.length ? Math.max(...completati) + 1 : 0);
      if (livello >= LIVELLI.length) livello = 0;

      /* ---------- scena SVG ---------- */
      const svg = el('svg', { viewBox: '0 0 600 330', class: 'bilancia-svg', role: 'img', 'aria-label': 'Bilancia a due piatti' });
      scena.appendChild(svg);
      const PIV = [300, 118], Y_PIATTO = 262, XS = 150, XD = 450, LARG = 190;
      svg.appendChild(el('path', { d: 'M260 318 h80 l-14 -22 h-52 z', fill: 'var(--testo2)', opacity: .55 }));
      svg.appendChild(el('rect', { x: 294, y: 122, width: 12, height: 176, rx: 4, fill: 'var(--testo2)', opacity: .7 }));
      const trave = el('g', { class: 'trave' });
      trave.appendChild(el('rect', { x: 110, y: 112, width: 380, height: 12, rx: 6, fill: 'var(--testo)', opacity: .8 }));
      trave.appendChild(el('circle', { cx: PIV[0], cy: PIV[1], r: 10, fill: 'var(--accento)' }));
      svg.appendChild(trave);
      const gruppi = {};
      ['s', 'd'].forEach(k => {
        const cx = k === 's' ? XS : XD;
        const g = el('g', { class: 'piatto-g' });
        g.appendChild(el('path', { d: `M${cx - 70} ${Y_PIATTO - 4} L${cx} 124 L${cx + 70} ${Y_PIATTO - 4}`, class: 'filo' }));
        g.appendChild(el('rect', { x: cx - LARG / 2, y: Y_PIATTO - 4, width: LARG, height: 10, rx: 5, fill: 'var(--testo)', opacity: .75 }));
        const contenuto = el('g', { class: 'contenuto' }); g.appendChild(contenuto);
        svg.appendChild(g); gruppi[k] = { g, contenuto, cx };
      });

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
        /* palloncini: legati al piatto, galleggiano sopra */
        const n = Math.max(0, -t.p);
        for (let i = 0; i < n; i++) {
          const px = cx - (n - 1) * 16 + i * 32, py = 168 - (i % 2) * 12;
          contenuto.appendChild(el('path', { d: `M${px} ${py + 16} Q${px + 4} ${Y_PIATTO - 30} ${cx + (px - cx) * .3} ${Y_PIATTO - 4}`, class: 'filo' }));
          contenuto.appendChild(el('ellipse', { cx: px, cy: py, rx: 13, ry: 16, fill: i % 2 ? 'var(--s2)' : 'var(--s1)', class: 'pallone' }));
          contenuto.appendChild(el('path', { d: `M${px - 3} ${py + 16} l3 5 l3 -5 z`, fill: i % 2 ? 'var(--s2)' : 'var(--s1)' }));
        }
      }

      function oscilla() {
        trave.style.transform = 'rotate(-2.5deg)';
        gruppi.s.g.style.transform = 'translateY(6px)'; gruppi.d.g.style.transform = 'translateY(-6px)';
        clearTimeout(timer);
        timer = setTimeout(() => { trave.style.transform = ''; gruppi.s.g.style.transform = ''; gruppi.d.g.style.transform = ''; }, 260);
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
        b.annulla.disabled = !pila.length;
      }
      function ridisegna() {
        disegnaLato('s'); disegnaLato('d');
        eqEl.innerHTML = ctx.tex(equazione(st));
        storiaEl.innerHTML = storia.map((e, i) => (i ? '<span class="freccia">⟶</span>' : '') + ctx.tex(e)).join('');
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length + ' · mosse: ' + pila.length;
        aggiornaPulsanti();
      }
      function avviaLivello(n) {
        livello = n; st = clona(LIVELLI[n]); storia = [equazione(st)]; pila = []; finito = false;
        msg.textContent = ''; msg.className = 'lab-messaggio';
        b.ric.textContent = 'Ricomincia';
        ridisegna();
      }
      function mossa(fn) {
        if (finito) return;
        pila.push(clona(st)); fn(st);
        storia.push(equazione(st)); oscilla(); ridisegna();
        const val = risolto();
        if (val !== null) {
          finito = true; aggiornaPulsanti();
          const min = mosseMinime(LIVELLI[livello]);
          msg.innerHTML = '<span class="vinto">Risolta: ' + ctx.tex('x = ' + val) + '</span>';
          msg.className = 'lab-messaggio ok';
          ctx.completato(livello);
          const bene = pila.length <= min;
          ctx.zenone(bene ? 'Perfetto: ' + pila.length + ' mosse, non si poteva fare meglio. Una cassa pesa ' + val + '.' : 'Risolta in ' + pila.length + ' mosse; si poteva in ' + min + '. Prova a togliere prima quello che sta dalla parte delle casse.', { espressione: bene ? 'orgoglioso' : 'felice', durata: 6000 });
          if (livello < LIVELLI.length - 1) { b.ric.textContent = 'Prossimo livello ▶'; }
          else b.ric.textContent = 'Ricomincia dal primo';
        }
      }
      b.piu.addEventListener('click', () => mossa(s => { s.s.p += 1; s.d.p += 1; }));
      b.meno.addEventListener('click', () => mossa(s => { s.s.p -= 1; s.d.p -= 1; }));
      b.x.addEventListener('click', () => mossa(s => { s.s.x -= 1; s.d.x -= 1; }));
      b.div.addEventListener('click', () => mossa(s => { if (s.s.x >= 2 && s.s.p === 0) { s.d.p /= s.s.x; s.s.x = 1; } else { s.s.p /= s.d.x; s.d.x = 1; } }));
      b.annulla.addEventListener('click', () => { if (!pila.length || finito) return; st = pila.pop(); storia.pop(); ridisegna(); });
      b.ric.addEventListener('click', () => { if (finito) avviaLivello((livello + 1) % LIVELLI.length); else avviaLivello(livello); });
      b.aiuto.addEventListener('click', () => ctx.zenone('La bilancia è in equilibrio perché i due piatti pesano uguale: questa è l\'equazione. Se aggiungi o togli la stessa cosa a tutti e due, resta in equilibrio. Un palloncino e un peso insieme si annullano. Quando su un piatto resta una cassa sola, l\'altro piatto dice quanto pesa: quello è x.', { tipo: 'suggerimento', espressione: 'pensa' }));

      avviaLivello(livello);
      return function smonta() { clearTimeout(timer); };
    }
  });
})();
