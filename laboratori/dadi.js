/* Laboratorio «Il banco e le tre porte» — probabilità come frequenza che si stabilizza
   (legge dei grandi numeri) e ragionamento sui casi (Monty Hall).
   Due stanze: il banco (moneta, un dado, somma di due dadi) e le tre porte.
   Contratto e regole: SCHEMA-LAB.md; modello di stile: laboratori/bilancia.js. */
(function () {
  const STILE = `
    .lab-dadi .schede { display: flex; gap: 6px; max-width: 760px; margin: 0 auto; padding: 10px 12px 0; }
    .lab-dadi .lab-scheda { flex: 1; min-height: 44px; padding: 9px 8px; border: 1px solid var(--bordo); border-bottom: none; border-radius: 11px 11px 0 0; background: var(--sup2); color: var(--testo2); font-weight: 600; font-size: .92rem; }
    .lab-dadi .lab-scheda.att { background: var(--accento-tenue); color: var(--accento-testo); border-color: var(--accento); }
    .lab-dadi .lab-scena { background: linear-gradient(180deg, var(--sup2), var(--sup)); border-top: 1px solid var(--bordo); padding: 6px 0 2px; touch-action: pan-y; }
    .lab-dadi .interno { max-width: 760px; margin: 0 auto; padding: 0 12px; }
    .lab-dadi .esperimenti { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; padding: 4px 0 8px; }
    .lab-dadi .esp-btn { min-height: 34px; padding: 5px 13px; border-radius: 999px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo2); font-size: .85rem; font-weight: 600; }
    .lab-dadi .esp-btn.att { background: var(--accento); border-color: var(--accento); color: #fff; }
    .lab-dadi .esp-btn:disabled { opacity: .4; cursor: default; }
    .lab-dadi .tavolo { display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 104px; }
    .lab-dadi .lab-scena .svg-dadi { width: 214px; max-width: 56%; flex: none; }
    .lab-dadi .gira { animation: lab-dadi-gira .16s linear infinite; }
    @keyframes lab-dadi-gira { 0% { transform: scale(1) } 50% { transform: scale(.88) } 100% { transform: scale(1) } }
    .lab-dadi .ultimo { font-size: .9rem; color: var(--testo2); line-height: 1.5; min-width: 92px; }
    .lab-dadi .ultimo b { display: block; font-size: 1.25rem; color: var(--testo); font-weight: 700; }
    .lab-dadi .legenda { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; padding: 2px 0 6px; font-size: .8rem; color: var(--testo2); }
    .lab-dadi .legenda span { display: inline-flex; align-items: center; gap: 6px; }
    .lab-dadi .q-barra { display: inline-block; width: 13px; height: 13px; border-radius: 3px; background: var(--s1); }
    .lab-dadi .q-tacca { display: inline-block; width: 16px; height: 3px; border-radius: 2px; background: var(--testo3); }
    .lab-dadi .barra-isto { fill: var(--s1); }
    .lab-dadi .barra-isto.sel { stroke: var(--accento); stroke-width: 2.5; }
    .lab-dadi .tacca { stroke: var(--testo3); stroke-width: 3.5; stroke-linecap: round; }
    .lab-dadi .griglia { stroke: var(--g-griglia); stroke-width: 1; }
    .lab-dadi .et-y { font: 400 16px var(--font); fill: var(--testo3); }
    .lab-dadi .et-x { fill: var(--testo2); font-family: var(--font); font-weight: 600; }
    .lab-dadi .et-x.sel { fill: var(--accento-testo); }
    .lab-dadi .et-top { font: 700 17px var(--font); fill: var(--accento-testo); }
    .lab-dadi .fascia { fill: var(--avviso); opacity: .18; }
    .lab-dadi .hit { fill: transparent; cursor: pointer; }
    .lab-dadi .ponte { text-align: center; padding: 4px 4px 2px; font-size: 1.05rem; }
    .lab-dadi .riassunto { text-align: center; padding: 2px 4px 8px; font-size: .88rem; color: var(--testo2); line-height: 1.6; }
    .lab-dadi .domanda { max-width: 760px; margin: 0 auto; padding: 10px 12px 0; }
    .lab-dadi .dom-testo { font-size: .95rem; font-weight: 600; margin-bottom: 7px; }
    .lab-dadi .dom-riga { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .lab-dadi .dom-campo { flex: 1; min-width: 130px; max-width: 240px; min-height: 42px; padding: 9px 12px; border-radius: 10px; border: 1px solid var(--bordo2); background: var(--sup); }
    .lab-dadi .dom-scelte { display: flex; gap: 8px; flex-wrap: wrap; }
    .lab-dadi .porta-anta { transition: transform .38s ease-in; }
    .lab-dadi .porta-anta.aperta { transform: scaleX(.14); }
    .lab-dadi .porta-corpo { fill: #b07541; stroke: #6f4622; stroke-width: 3; }
    .lab-dadi .porta-vano { fill: #241a12; }
    .lab-dadi .porta-num { font: 700 27px var(--font); fill: #f3e7d8; }
    .lab-dadi .porta-tocco { fill: transparent; cursor: pointer; }
    .lab-dadi .porta-alone { fill: none; stroke: var(--accento); stroke-width: 4; opacity: 0; transition: opacity .2s; }
    .lab-dadi .porta-alone.att { opacity: 1; }
    .lab-dadi .porta-et { font: 600 17px var(--font); fill: var(--testo2); }
    .lab-dadi .tabellone { display: grid; gap: 8px; padding: 4px 0 8px; }
    .lab-dadi .conto { display: grid; grid-template-columns: 74px 1fr auto; gap: 8px; align-items: center; font-size: .87rem; }
    .lab-dadi .conto .cosa { font-weight: 700; }
    .lab-dadi .barretta { position: relative; height: 14px; border-radius: 7px; background: var(--sup2); border: 1px solid var(--bordo); overflow: hidden; }
    .lab-dadi .barretta i { display: block; height: 100%; width: 0; transition: width .2s linear; }
    .lab-dadi .barretta u { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--testo3); display: none; }
    .lab-dadi .et-top, .lab-dadi .et-x, .lab-dadi .tacca, .lab-dadi .griglia { pointer-events: none; }
    .lab-dadi .conto .val { min-width: 96px; text-align: right; color: var(--testo2); font-variant-numeric: tabular-nums; }
    .lab-dadi .lab-barra .gruppo { display: contents; }
    .lab-dadi .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
    .lab-dadi .vinto { animation: lab-dadi-pop .45s cubic-bezier(.34,1.56,.64,1); display: inline-block; }
    @keyframes lab-dadi-pop { from { transform: scale(.75); opacity: 0 } to { transform: none; opacity: 1 } }
    @media (max-width: 600px) {
      .lab-dadi .interno { padding: 0 8px; }
      .lab-dadi .lab-scheda { font-size: .86rem; padding: 8px 4px; }
      .lab-dadi .esp-btn { font-size: .8rem; padding: 5px 10px; }
      .lab-dadi .conto { grid-template-columns: 62px 1fr; }
      .lab-dadi .conto .val { grid-column: 1 / -1; text-align: left; }
    }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const vuota = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const num = (v, d) => (isFinite(v) ? v : 0).toFixed(d).replace('.', ',');
  const texn = (v, d) => num(v, d).replace(',', '{,}');
  const dado6 = () => 1 + Math.floor(Math.random() * 6);
  const serie = (n, f) => { const a = []; for (let i = 0; i < n; i++) a.push(f(i)); return a; };
  const MODI = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];   /* coppie che danno la somma 2…12 */

  /* ---------- i tre esperimenti del banco ---------- */
  const ESP = {
    moneta: {
      id: 'moneta', etichette: ['testa', 'croce'], fontX: 21, fuoco: 0,
      teo: [.5, .5], teoTex: ['\\frac{1}{2}', '\\frac{1}{2}'],
      lancia() { return { i: Math.random() < .5 ? 0 : 1, facce: null }; },
      frase(i, k) { return (i === 0 ? 'testa' : 'croce') + ' è uscita ' + k + ' volte'; },
      breve(i) { return i === 0 ? 'testa' : 'croce'; }
    },
    dado: {
      id: 'dado', etichette: serie(6, i => String(i + 1)), fontX: 21, fuoco: 5,
      teo: serie(6, () => 1 / 6), teoTex: serie(6, () => '\\frac{1}{6}'),
      lancia() { const a = dado6(); return { i: a - 1, facce: [a] }; },
      frase(i, k) { return 'la faccia ' + (i + 1) + ' è uscita ' + k + ' volte'; },
      breve(i) { return 'la faccia ' + (i + 1); }
    },
    somma: {
      id: 'somma', etichette: serie(11, i => String(i + 2)), fontX: 17, fuoco: 5,
      teo: MODI.map(m => m / 36), teoTex: MODI.map(m => '\\frac{' + m + '}{36}'),
      lancia() { const a = dado6(), b = dado6(); return { i: a + b - 2, facce: [a, b] }; },
      frase(i, k) { return 'la somma ' + (i + 2) + ' è uscita ' + k + ' volte'; },
      breve(i) { return 'la somma ' + (i + 2); }
    }
  };

  /* scala verticale dell'istogramma: gradini fissi, così non balla a ogni lancio */
  const SCALE = [{ c: .2, p: .05 }, { c: .3, p: .1 }, { c: .4, p: .1 }, { c: .5, p: .1 }, { c: .6, p: .2 }, { c: 1, p: .25 }];
  function scalaPer(v) { for (const s of SCALE) if (s.c >= v) return s; return SCALE[SCALE.length - 1]; }

  /* legge «1/2», «0,5», «.5», «50%» → 0.5 ; null se non è un numero */
  function leggiNumero(t) {
    let s = String(t == null ? '' : t).trim().replace(/\s+/g, '').replace(/,/g, '.');
    if (!s) return null;
    let perc = false;
    if (s.slice(-1) === '%') { perc = true; s = s.slice(0, -1); }
    let v;
    const fr = s.match(/^(\d*\.?\d+)\/(\d*\.?\d+)$/);
    if (fr) v = parseFloat(fr[1]) / parseFloat(fr[2]);
    else if (/^\d*\.?\d+$/.test(s)) v = parseFloat(s);
    else return null;
    if (!isFinite(v)) return null;
    return perc ? v / 100 : v;
  }

  COMPASSO.registraLab({
    id: 'dadi',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-dadi')) { const s = document.createElement('style'); s.id = 'stile-lab-dadi'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-dadi');
      radice.innerHTML = `
        <div class="schede">
          <button type="button" class="lab-scheda att" data-st="banco">🎲 Il banco</button>
          <button type="button" class="lab-scheda" data-st="porte">🚪 Le tre porte</button>
        </div>
        <div class="lab-scena">
          <div class="interno">
            <div class="stanza s-banco">
              <div class="esperimenti">
                <button type="button" class="esp-btn att" data-e="moneta">Moneta</button>
                <button type="button" class="esp-btn" data-e="dado">Un dado</button>
                <button type="button" class="esp-btn" data-e="somma">Somma di 2 dadi</button>
              </div>
              <div class="tavolo"><svg class="svg-dadi" viewBox="0 0 214 116" role="img" aria-label="Il lancio"></svg><div class="ultimo"></div></div>
              <svg class="svg-isto" viewBox="0 0 480 232" role="img" aria-label="Istogramma delle frequenze"></svg>
              <div class="legenda"><span><i class="q-barra"></i> frequenza (quello che è uscito)</span><span class="l-teo" hidden><i class="q-tacca"></i> probabilità teorica</span></div>
            </div>
            <div class="stanza s-porte" hidden>
              <svg class="svg-porte" viewBox="0 0 480 264" role="img" aria-label="Le tre porte"></svg>
              <div class="tabellone">
                <div class="conto c-resto"><span class="cosa">Resto</span><span class="barretta"><i style="background:var(--s1)"></i><u class="tick"></u></span><span class="val">—</span></div>
                <div class="conto c-cambio"><span class="cosa">Cambio</span><span class="barretta"><i style="background:var(--s2)"></i><u class="tick"></u></span><span class="val">—</span></div>
              </div>
            </div>
            <div class="ponte"></div>
            <div class="riassunto"></div>
          </div>
        </div>
        <div class="domanda" hidden>
          <div class="dom-testo"></div>
          <div class="dom-riga"><input type="text" class="dom-campo" autocomplete="off" spellcheck="false"><button type="button" class="btn primario dom-ok">Conferma</button></div>
          <div class="dom-scelte"></div>
        </div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <span class="gruppo g-banco">
            <button type="button" class="btn b-1">Lancia 1</button>
            <button type="button" class="btn b-10">×10</button>
            <button type="button" class="btn b-100">×100</button>
            <button type="button" class="btn b-1000">×1000</button>
          </span>
          <span class="gruppo g-porte" hidden>
            <button type="button" class="btn b-resto">Resto</button>
            <button type="button" class="btn b-cambio">Cambio</button>
            <button type="button" class="btn b-nuova">Nuova partita</button>
            <button type="button" class="btn piccolo b-sim-resto" title="Gioca 100 partite da solo restando sulla prima scelta">100 restando</button>
            <button type="button" class="btn piccolo b-sim-cambio" title="Gioca 100 partite da solo cambiando porta">100 cambiando</button>
          </span>
          <button type="button" class="btn piccolo b-ric">Ricomincia</button>
          <button type="button" class="btn piccolo b-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const q = s => radice.querySelector(s);
      const svgDadi = q('.svg-dadi'), svgIsto = q('.svg-isto'), svgPorte = q('.svg-porte');
      const elUltimo = q('.ultimo'), elFormula = q('.ponte'), elRiass = q('.riassunto'), elLegTeo = q('.l-teo');
      const msg = q('.lab-messaggio'), livEl = q('.lab-livello');
      const domanda = q('.domanda'), domTesto = q('.dom-testo'), domRiga = q('.dom-riga'), domCampo = q('.dom-campo'), domOk = q('.dom-ok'), domScelte = q('.dom-scelte');
      const stanzaBanco = q('.s-banco'), stanzaPorte = q('.s-porte');
      const grBanco = q('.g-banco'), grPorte = q('.g-porte');
      const bt = {
        l1: q('.b-1'), l10: q('.b-10'), l100: q('.b-100'), l1000: q('.b-1000'),
        resto: q('.b-resto'), cambio: q('.b-cambio'), nuova: q('.b-nuova'),
        simR: q('.b-sim-resto'), simC: q('.b-sim-cambio'), ric: q('.b-ric'), aiuto: q('.b-aiuto')
      };

      /* ---------- stato ---------- */
      const dati = {};                                  /* per esperimento: conteggi, lanci, fuoco, fascia */
      for (const k in ESP) dati[k] = { c: ESP[k].teo.map(() => 0), n: 0, sel: ESP[k].fuoco, ultimo: null, entrata: null, ingresso: null };
      const porte = { fase: 'scegli', tesoro: 0, scelta: null, apertaCond: null, finale: null, vinta: null, strategia: null, aperte: [] };
      const conta = { resto: { v: 0, n: 0 }, cambio: { v: 0, n: 0 } };
      const mano = { resto: 0, cambio: 0 };
      const svelato = { moneta: false, dado: false, somma: false, porte: false };
      let esp = ESP.moneta, stanza = 'banco', occupato = false;
      let raf = null; const timer = new Set();
      const attesa = (ms, f) => { const t = setTimeout(() => { timer.delete(t); f(); }, ms); timer.add(t); return t; };

      /* =====================================================================
         STANZA 1 — IL BANCO: disegno
         ===================================================================== */
      function faccia(g, x, y, s, v) {
        g.appendChild(el('rect', { x: x, y: y, width: s, height: s, rx: s * .17, fill: '#f7f4ed', stroke: '#8b8578', 'stroke-width': 2.5 }));
        const P = [[.26, .26], [.5, .26], [.74, .26], [.26, .5], [.5, .5], [.74, .5], [.26, .74], [.5, .74], [.74, .74]];
        const M = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
        (M[v] || []).forEach(i => g.appendChild(el('circle', { cx: x + P[i][0] * s, cy: y + P[i][1] * s, r: s * .086, fill: '#252a33' })));
      }

      function disegnaDadi(r, girando) {
        vuota(svgDadi);
        const g = el('g', { style: 'transform-origin:107px 58px' });
        if (girando) g.setAttribute('class', 'gira');
        svgDadi.appendChild(g);
        if (esp.id === 'moneta') {
          g.appendChild(el('circle', { cx: 107, cy: 58, r: 44, fill: '#e0b350', stroke: '#a97b25', 'stroke-width': 4 }));
          g.appendChild(el('circle', { cx: 107, cy: 58, r: 36, fill: 'none', stroke: '#c39537', 'stroke-width': 2 }));
          g.appendChild(el('text', { x: 107, y: 58, 'text-anchor': 'middle', 'dominant-baseline': 'central', style: 'font:700 44px var(--font);fill:#5a3f10' }, r && r.i === 1 ? 'C' : 'T'));
        } else if (esp.id === 'dado') {
          faccia(g, 69, 20, 76, r ? r.facce[0] : 1);
        } else {
          faccia(g, 6, 27, 62, r ? r.facce[0] : 1);
          faccia(g, 76, 27, 62, r ? r.facce[1] : 1);
          g.appendChild(el('text', { x: 152, y: 58, 'text-anchor': 'middle', 'dominant-baseline': 'central', style: 'font:600 22px var(--font);fill:var(--testo2)' }, '='));
          g.appendChild(el('text', { x: 186, y: 58, 'text-anchor': 'middle', 'dominant-baseline': 'central', style: 'font:700 34px var(--font);fill:var(--testo)' }, r ? String(r.i + 2) : '?'));
        }
      }

      const IX0 = 52, IX1 = 474, IY0 = 20, IY1 = 194, IETY = 218;
      let iso = null;

      function costruisciIsto() {
        vuota(svgIsto);
        const n = esp.etichette.length, slot = (IX1 - IX0) / n;
        iso = { n: n, slot: slot, griglia: [], etY: [], barre: [], tacche: [], etX: [], fascia: null, etTop: null };
        for (let i = 0; i < 6; i++) {
          const l = el('line', { class: 'griglia', x1: IX0 - 6, x2: IX1, y1: IY1, y2: IY1 });
          const t = el('text', { class: 'et-y', x: IX0 - 11, y: IY1, 'text-anchor': 'end', 'dominant-baseline': 'middle' });
          svgIsto.appendChild(l); svgIsto.appendChild(t); iso.griglia.push(l); iso.etY.push(t);
        }
        iso.fascia = el('rect', { class: 'fascia', x: 0, y: 0, width: 0, height: 0 });
        iso.fascia.style.display = 'none'; svgIsto.appendChild(iso.fascia);
        svgIsto.appendChild(el('line', { x1: IX0 - 6, x2: IX1, y1: IY1, y2: IY1, stroke: 'var(--g-asse)', 'stroke-width': 1.5 }));
        iso.etTop = el('text', { class: 'et-top', 'text-anchor': 'middle', x: 0, y: 0 });
        svgIsto.appendChild(iso.etTop);
        for (let i = 0; i < n; i++) {
          const cx = IX0 + slot * (i + .5), bw = Math.min(70, slot * .64), tw = Math.min(bw * .68, slot * .42);
          const b = el('rect', { class: 'barra-isto', x: cx - bw / 2, width: bw, y: IY1, height: 0, rx: 3 });
          const t = el('line', { class: 'tacca', x1: cx - tw, x2: cx + tw, y1: IY1, y2: IY1 });
          t.style.display = 'none';
          const e = el('text', { class: 'et-x', x: cx, y: IETY, 'text-anchor': 'middle', 'font-size': esp.fontX }, esp.etichette[i]);
          const h = el('rect', { class: 'hit', x: cx - slot / 2, y: IY0 - 10, width: slot, height: IY1 - IY0 + 34 });
          h.addEventListener('click', () => { if (occupato) return; dati[esp.id].sel = i; disegnaBanco(); });
          svgIsto.appendChild(b); svgIsto.appendChild(t); svgIsto.appendChild(e); svgIsto.appendChild(h);
          iso.barre.push(b); iso.tacche.push(t); iso.etX.push(e);
        }
      }

      function aggiornaIsto() {
        const d = dati[esp.id], mostra = svelato[esp.id];
        elLegTeo.hidden = !mostra;
        const freq = d.c.map(k => (d.n ? k / d.n : 0));
        const maxF = Math.max.apply(null, freq), maxT = mostra ? Math.max.apply(null, esp.teo) : 0;
        const sc = scalaPer(Math.max(.12, maxF * 1.06, maxT * 1.1));
        const alt = IY1 - IY0, y = v => IY1 - (v / sc.c) * alt;
        const passi = Math.round(sc.c / sc.p);
        for (let k = 0; k < 6; k++) {
          const usa = k <= passi;
          iso.griglia[k].style.display = usa ? '' : 'none';
          iso.etY[k].style.display = usa ? '' : 'none';
          if (!usa) continue;
          const v = k * sc.p, yy = y(v);
          iso.griglia[k].setAttribute('y1', yy); iso.griglia[k].setAttribute('y2', yy);
          iso.etY[k].setAttribute('y', yy); iso.etY[k].textContent = v === 0 ? '0' : num(v, 2);
        }
        for (let i = 0; i < iso.n; i++) {
          const yy = y(freq[i]);
          iso.barre[i].setAttribute('y', yy);
          iso.barre[i].setAttribute('height', Math.max(0, IY1 - yy));
          iso.barre[i].classList.toggle('sel', i === d.sel);
          const yt = y(esp.teo[i]);
          iso.tacche[i].style.display = mostra ? '' : 'none';
          iso.tacche[i].setAttribute('y1', yt); iso.tacche[i].setAttribute('y2', yt);
          iso.etX[i].classList.toggle('sel', i === d.sel);
        }
        if (d.n) {
          const cx = IX0 + iso.slot * (d.sel + .5), yy = y(freq[d.sel]);
          iso.etTop.style.display = '';
          iso.etTop.setAttribute('x', cx); iso.etTop.setAttribute('y', Math.max(IY0 - 6, yy - 7));
          iso.etTop.textContent = num(freq[d.sel], 3);
        } else iso.etTop.style.display = 'none';
        const banda = LIVELLI[livello].fascia && esp.id === 'somma';
        iso.fascia.style.display = banda ? '' : 'none';
        if (banda) {
          const cx = IX0 + iso.slot * 5.5, y1 = y(.18), y2 = y(.15);
          iso.fascia.setAttribute('x', cx - iso.slot / 2); iso.fascia.setAttribute('width', iso.slot);
          iso.fascia.setAttribute('y', y1); iso.fascia.setAttribute('height', Math.max(0, y2 - y1));
        }
      }

      function disegnaBanco() {
        const d = dati[esp.id];
        disegnaDadi(d.ultimo, false);
        if (!d.ultimo) elUltimo.innerHTML = '<b>—</b>nessun lancio';
        else if (esp.id === 'somma') elUltimo.innerHTML = '<b>' + (d.ultimo.i + 2) + '</b>' + d.ultimo.facce[0] + ' + ' + d.ultimo.facce[1];
        else elUltimo.innerHTML = '<b>' + esp.etichette[d.ultimo.i] + '</b>ultimo lancio';
        aggiornaIsto(); aggiornaTesti();
      }

      /* =====================================================================
         STANZA 2 — LE TRE PORTE: disegno
         ===================================================================== */
      const PX = [26, 175, 324], PY = 26, PW = 130, PH = 192;
      let pgr = [];

      function costruisciPorte() {
        vuota(svgPorte); pgr = [];
        for (let i = 0; i < 3; i++) {
          const x = PX[i], cy = PY + PH / 2;
          const g = el('g');
          g.appendChild(el('rect', { x: x, y: PY, width: PW, height: PH, rx: 6, class: 'porta-vano' }));
          const premio = el('text', { x: x + PW / 2, y: cy, 'text-anchor': 'middle', 'dominant-baseline': 'central', style: 'font-size:62px' });
          g.appendChild(premio);
          const anta = el('g', { class: 'porta-anta', style: 'transform-origin:' + x + 'px ' + cy + 'px' });
          anta.appendChild(el('rect', { x: x, y: PY, width: PW, height: PH, rx: 6, class: 'porta-corpo' }));
          anta.appendChild(el('rect', { x: x + 14, y: PY + 54, width: PW - 28, height: PH - 78, rx: 4, fill: 'none', stroke: '#8a5a2c', 'stroke-width': 3 }));
          anta.appendChild(el('circle', { cx: x + PW - 22, cy: cy + 14, r: 7, fill: '#f0d9a8', stroke: '#7a5220', 'stroke-width': 2 }));
          anta.appendChild(el('text', { x: x + PW / 2, y: PY + 38, 'text-anchor': 'middle', class: 'porta-num' }, String(i + 1)));
          g.appendChild(anta);
          const alone = el('rect', { x: x - 6, y: PY - 6, width: PW + 12, height: PH + 12, rx: 10, class: 'porta-alone' });
          g.appendChild(alone);
          const et = el('text', { x: x + PW / 2, y: PY + PH + 26, 'text-anchor': 'middle', class: 'porta-et' });
          g.appendChild(et);
          const tocco = el('rect', { x: x - 6, y: PY - 6, width: PW + 12, height: PH + 12, class: 'porta-tocco' });
          tocco.addEventListener('click', () => scegliPorta(i));
          g.appendChild(tocco);
          svgPorte.appendChild(g);
          pgr.push({ anta: anta, premio: premio, alone: alone, et: et });
        }
      }

      function disegnaPorte() {
        for (let i = 0; i < 3; i++) {
          const p = pgr[i], apr = porte.aperte.indexOf(i) >= 0;
          p.anta.classList.toggle('aperta', apr);
          p.premio.textContent = apr ? (i === porte.tesoro ? '🏆' : '🐐') : '';
          p.alone.classList.toggle('att', porte.scelta === i && porte.fase !== 'esito');
          let e = '';
          if (porte.scelta === i && porte.fase !== 'esito') e = 'la tua';
          else if (porte.apertaCond === i) e = 'il conduttore';
          else if (porte.finale === i) e = porte.vinta ? 'hai vinto' : 'hai perso';
          p.et.textContent = e;
        }
        aggiornaTabellone(); aggiornaTesti();
      }

      function aggiornaTabellone() {
        ['resto', 'cambio'].forEach(k => {
          const c = conta[k], riga = radice.querySelector('.c-' + k);
          const f = c.n ? c.v / c.n : 0;
          riga.querySelector('i').style.width = (f * 100) + '%';
          riga.querySelector('.val').textContent = c.n ? c.v + ' vinte su ' + c.n + ' · ' + num(f, 2) : 'nessuna partita';
          const t = riga.querySelector('.tick');
          t.style.display = svelato.porte ? 'block' : 'none';
          t.style.left = 'calc(' + (k === 'resto' ? 33.33 : 66.67) + '% - 1px)';
        });
      }

      /* =====================================================================
         PONTE CON LA MATEMATICA SCRITTA (KaTeX) + riassunto
         ===================================================================== */
      function aggiornaTesti() {
        if (stanza === 'banco') {
          const d = dati[esp.id], i = d.sel, k = d.c[i], f = d.n ? k / d.n : 0;
          let t = d.n ? 'f = \\frac{' + k + '}{' + d.n + '} \\approx ' + texn(f, 3) : 'f = \\dfrac{\\text{volte uscito}}{\\text{lanci}}';
          let html = ctx.tex(t);
          if (svelato[esp.id]) html += ' &nbsp; ' + ctx.tex('p = ' + esp.teoTex[i] + ' \\approx ' + texn(esp.teo[i], 3));
          elFormula.innerHTML = html;
          let r = d.n ? 'lanci: ' + d.n + ' · ' + esp.frase(i, k) + ' · frequenza ' + num(f, 2) : 'lanci: 0 · non hai ancora lanciato niente';
          if (LIVELLI[livello].fascia && esp.id === 'somma') {
            const f7 = d.n ? d.c[5] / d.n : 0;
            let s = 'il 7 è a ' + num(f7, 3) + ' · fascia 0,15–0,18: ';
            if (d.ingresso !== null) s += 'entrata al lancio ' + d.ingresso + ' e ci è rimasta';
            else if (d.entrata !== null) s += 'dentro da ' + (d.n - d.entrata) + ' lanci su 100';
            else s += 'fuori';
            r += '<br>' + s;
          }
          elRiass.innerHTML = r;
        } else {
          const a = conta.resto, b = conta.cambio;
          const fr = (nome, c) => nome + ' = ' + (c.n ? '\\frac{' + c.v + '}{' + c.n + '} \\approx ' + texn(c.v / c.n, 2) : '\\;?');
          let html = ctx.tex(fr('f_{\\text{resto}}', a)) + ' &nbsp; ' + ctx.tex(fr('f_{\\text{cambio}}', b));
          if (svelato.porte) html += '<br>' + ctx.tex('p_{\\text{resto}} = \\frac{1}{3}') + ' &nbsp; ' + ctx.tex('p_{\\text{cambio}} = \\frac{2}{3}');
          elFormula.innerHTML = html;
          let r = 'partite: ' + (a.n + b.n) + ' · a mano: ' + mano.resto + ' restando, ' + mano.cambio + ' cambiando';
          if (LIVELLI[livello].soloMano) r += '<br>ne servono 10 e 10, giocate a mano';
          elRiass.innerHTML = r;
        }
      }

      /* =====================================================================
         LANCI (stanza 1)
         ===================================================================== */
      function applica(d, r) {
        d.c[r.i]++; d.n++; d.ultimo = r;
        if (LIVELLI[livello].fascia && esp.id === 'somma') {
          const f = d.c[5] / d.n;
          if (f >= .15 && f <= .18) { if (d.entrata === null) d.entrata = d.n; }
          else d.entrata = null;
          if (d.ingresso === null && d.entrata !== null && d.n - d.entrata >= 100) d.ingresso = d.entrata;
        }
      }

      function lancia(n) {
        if (occupato || statoLiv.aperta) return;
        const d = dati[esp.id], ris = [];
        for (let i = 0; i < n; i++) ris.push(esp.lancia());
        occupato = true; aggiornaPulsanti();
        const durata = n > 10 ? 560 : 400, t0 = performance.now();
        let fatti = 0, ultimoCambio = -999;
        const passo = t => {
          const dt = t - t0;
          if (n === 1) {
            if (dt < durata) {
              if (dt - ultimoCambio > 55) { ultimoCambio = dt; disegnaDadi(esp.lancia(), true); }
              raf = requestAnimationFrame(passo); return;
            }
            applica(d, ris[0]);
          } else {
            const bersaglio = Math.min(n, Math.round(Math.min(1, dt / durata) * n));
            while (fatti < bersaglio) applica(d, ris[fatti++]);
            if (dt < durata) {
              if (n <= 10 && fatti > 0) disegnaDadi(ris[fatti - 1], true);
              aggiornaIsto(); aggiornaTesti();
              raf = requestAnimationFrame(passo); return;
            }
            while (fatti < n) applica(d, ris[fatti++]);
          }
          raf = null; occupato = false;
          disegnaBanco(); aggiornaPulsanti(); controllaLivello();
        };
        raf = requestAnimationFrame(passo);
      }

      /* =====================================================================
         PARTITA (stanza 2)
         ===================================================================== */
      function nuovaPartita() {
        porte.tesoro = Math.floor(Math.random() * 3);
        porte.scelta = null; porte.apertaCond = null; porte.finale = null; porte.vinta = null;
        porte.strategia = null; porte.aperte = []; porte.fase = 'scegli';
        if (!statoLiv.finito && !statoLiv.aperta) { msg.textContent = 'Tocca una porta.'; msg.className = 'lab-messaggio'; }
        disegnaPorte(); aggiornaPulsanti();
      }

      function scegliPorta(i) {
        if (occupato || statoLiv.aperta || porte.fase !== 'scegli') return;
        porte.scelta = i; porte.fase = 'conduttore';
        disegnaPorte(); aggiornaPulsanti();
        msg.textContent = 'Il conduttore apre una porta con la capra…'; msg.className = 'lab-messaggio';
        attesa(340, () => {
          const cand = [0, 1, 2].filter(x => x !== porte.scelta && x !== porte.tesoro);
          porte.apertaCond = cand[Math.floor(Math.random() * cand.length)];
          porte.aperte.push(porte.apertaCond);
          porte.fase = 'decidi';
          disegnaPorte(); aggiornaPulsanti();
          msg.textContent = 'Adesso decidi: resti sulla porta ' + (porte.scelta + 1) + ' o cambi?';
        });
      }

      function decidi(strategia) {
        if (occupato || porte.fase !== 'decidi') return;
        porte.strategia = strategia;
        porte.finale = strategia === 'resto' ? porte.scelta : [0, 1, 2].filter(x => x !== porte.scelta && x !== porte.apertaCond)[0];
        porte.vinta = porte.finale === porte.tesoro;
        porte.aperte.push(porte.finale);
        porte.fase = 'esito';
        conta[strategia].n++; if (porte.vinta) conta[strategia].v++;
        mano[strategia]++;
        disegnaPorte(); aggiornaPulsanti();
        msg.innerHTML = '<span class="vinto">' + (porte.vinta ? '🏆 Vinto: il tesoro era dietro la ' + (porte.finale + 1) + '.' : '🐐 Persa: il tesoro era dietro la ' + (porte.tesoro + 1) + '.') + '</span>';
        msg.className = 'lab-messaggio ' + (porte.vinta ? 'ok' : 'no');
        attesa(520, () => { porte.aperte = [0, 1, 2]; disegnaPorte(); controllaLivello(); });
      }

      function simula(strategia, n) {
        if (occupato || statoLiv.aperta) return;
        const esiti = [];
        for (let i = 0; i < n; i++) {
          const t = Math.floor(Math.random() * 3), s = Math.floor(Math.random() * 3);
          const cand = [0, 1, 2].filter(x => x !== s && x !== t);
          const ap = cand[Math.floor(Math.random() * cand.length)];
          const fin = strategia === 'resto' ? s : [0, 1, 2].filter(x => x !== s && x !== ap)[0];
          esiti.push(fin === t ? 1 : 0);
        }
        occupato = true; aggiornaPulsanti();
        const t0 = performance.now(); let fatti = 0;
        const passo = t => {
          const bersaglio = Math.min(n, Math.round(Math.min(1, (t - t0) / 560) * n));
          while (fatti < bersaglio) { conta[strategia].n++; conta[strategia].v += esiti[fatti++]; }
          aggiornaTabellone(); aggiornaTesti();
          if (fatti < n) { raf = requestAnimationFrame(passo); return; }
          raf = null; occupato = false;
          msg.textContent = 'Cento partite ' + (strategia === 'resto' ? 'restando' : 'cambiando') + ': ' + esiti.reduce((a, b) => a + b, 0) + ' vinte.';
          msg.className = 'lab-messaggio';
          aggiornaPulsanti(); controllaLivello();
        };
        raf = requestAnimationFrame(passo);
      }

      /* =====================================================================
         I LIVELLI
         ===================================================================== */
      let livello = 0, statoLiv = { passo: 0, risposte: [], finito: false, aperta: false, errori: 0 };

      const LIVELLI = [
        {
          stanza: 'banco', esp: 'moneta',
          domande: [{
            testo: 'Prima di lanciare: quanto vale la probabilità che esca testa?',
            segnaposto: '1/2 oppure 0,5',
            ok: v => v !== null && Math.abs(v - .5) < 1e-9,
            errore: 'No. Le facce sono due e non c\'è motivo di preferirne una: scrivi 1/2 oppure 0,5.',
            aiuto: 'Casi favorevoli diviso casi possibili: la testa è uno dei due lati.',
            dopo: () => { svelato.moneta = true; }
          }],
          compito: 'Adesso lancia almeno 100 volte, e guarda dove si posa la barra. La tacca grigia è la probabilità teorica.',
          fatto: () => dati.moneta.n >= 100,
          chiusura: () => {
            const d = dati.moneta, f = d.c[0] / d.n;
            return {
              testo: 'Fatto: ' + d.n + ' lanci, testa a frequenza ' + num(f, 3) + '.',
              zenone: 'La frequenza balla intorno a 0,5, e più lanci fai meno balla. Occhio però: non è che la moneta recuperi le teste che mancano. I primi lanci non vengono corretti, vengono solo annegati in mezzo a tutti gli altri.'
            };
          }
        },
        {
          stanza: 'banco', esp: 'dado',
          domande: [{
            testo: 'Un dado a sei facce. Prima di lanciare: quanto vale la probabilità che esca 6?',
            segnaposto: 'una frazione, oppure 0,167',
            ok: v => v !== null && Math.abs(v - 1 / 6) < .01,
            errore: 'No. Le facce sono sei e pesano uguale: scrivilo come frazione.',
            aiuto: 'Casi favorevoli: uno solo, il 6. Casi possibili: sei. Uno diviso sei.',
            dopo: () => { svelato.dado = true; }
          }],
          compito: 'Adesso lancia almeno 200 volte. Puoi toccare una barra per seguire un\'altra faccia.',
          fatto: () => dati.dado.n >= 200,
          chiusura: () => {
            const d = dati.dado, f = d.c[5] / d.n;
            return {
              testo: 'Fatto: ' + d.n + ' lanci, il 6 a frequenza ' + num(f, 3) + ' contro 0,167 teorico.',
              zenone: 'Un sesto fa 0,167 e tu sei arrivato a ' + num(f, 3) + '. Non ci sei sopra preciso, e non ci finirai mai: la frequenza somiglia alla probabilità, non è la probabilità.'
            };
          }
        },
        {
          stanza: 'banco', esp: 'somma',
          domande: [
            {
              testo: 'Si lanciano due dadi e si somma. Prima di lanciare: qual è la somma più probabile?',
              segnaposto: 'un numero da 2 a 12', modo: 'numerico',
              ok: v => v === 7,
              errore: 'No. Conta in quanti modi si può fare ogni somma: il 2 in un modo solo, il 3 in due…',
              aiuto: 'Le coppie di dadi sono 6 × 6 = 36, e non danno tutte la stessa somma. Cerca quella che si fa nel maggior numero di modi.'
            },
            {
              testo: 'E quanto vale la probabilità che la somma sia 7?',
              segnaposto: 'una frazione, oppure 0,167',
              ok: v => v !== null && Math.abs(v - 1 / 6) < .01,
              errore: 'No. I casi possibili sono 36, non 11. Quante coppie danno 7?',
              aiuto: 'Il 7 si fa con 1+6, 2+5, 3+4 e i tre rovesci: sei coppie su trentasei.',
              dopo: () => { svelato.somma = true; }
            }
          ],
          compito: 'Adesso lancia almeno 300 volte e guarda che forma prende l\'istogramma.',
          fatto: () => dati.somma.n >= 300,
          chiusura: () => ({
            testo: 'Fatto: ' + dati.somma.n + ' lanci. Il 7 in cima, il 2 e il 12 ai bordi: è una campana.',
            zenone: 'Le somme non sono undici casi uguali: le coppie sono 36. Il 7 si fa in sei modi, il 2 in uno solo. Per questo viene una campana e non un rettangolo.'
          })
        },
        {
          stanza: 'banco', esp: 'somma', fascia: true,
          domande: [{
            testo: 'Quanti lanci servono perché la frequenza del 7 finisca nella fascia 0,15–0,18 e ci resti per almeno 100 lanci? Scrivi la tua stima.',
            segnaposto: 'per esempio 500', modo: 'numerico',
            ok: v => v !== null && v >= 1,
            errore: 'Scrivi un numero di lanci, anche a occhio: è una stima, non c\'è una risposta giusta.'
          }],
          compito: 'Lancia a blocchi: la fascia gialla è sulla colonna del 7, e io segno quando ci entra per restarci.',
          fatto: () => dati.somma.ingresso !== null,
          chiusura: () => ({
            testo: 'È entrata al lancio ' + dati.somma.ingresso + ' e ci è rimasta. Tu avevi detto ' + Math.round(statoLiv.risposte[0]) + '.',
            zenone: 'Adesso premi Ricomincia e rifallo: ti verrà un altro numero, magari il doppio o la metà. Non esiste il numero di lanci giusto — esiste il caso, che si calma piano e con i suoi tempi.'
          })
        },
        {
          stanza: 'porte', soloMano: true,
          domande: [{
            testo: 'Il conduttore apre sempre una porta con la capra, e poi ti lascia decidere. Prima di giocare: conviene cambiare, restare, o è uguale?',
            scelte: ['Conviene cambiare', 'Conviene restare', 'È uguale'],
            ok: () => true, errore: ''
          }],
          compito: 'Adesso gioca a mano: almeno 10 partite restando e 10 cambiando. In questo livello la simulazione è spenta.',
          fatto: () => mano.resto >= 10 && mano.cambio >= 10,
          chiusura: () => {
            const p = statoLiv.risposte[0];
            const detto = p === 0 ? 'Avevi previsto che convenisse cambiare. ' : p === 1 ? 'Avevi previsto che convenisse restare. ' : 'Avevi previsto che fosse uguale. ';
            return {
              testo: 'Giocate a mano: restando ' + conta.resto.v + ' su ' + conta.resto.n + ', cambiando ' + conta.cambio.v + ' su ' + conta.cambio.n + '.',
              faccia: 'pensa',
              zenone: detto + 'Ma una ventina di partite non prova niente: a questi numeri il caso mente senza fatica. Al livello dopo se ne fanno cento per parte, e lì la frequenza smette di scherzare.'
            };
          }
        },
        {
          stanza: 'porte', domandePrima: false,
          pronta: () => conta.resto.n >= 100 && conta.cambio.n >= 100,
          domande: [{
            testo: 'Guarda il tabellone: quanto vale la probabilità di vincere cambiando porta?',
            segnaposto: 'una frazione, oppure 0,67',
            ok: v => v !== null && Math.abs(v - 2 / 3) <= .08,
            errore: 'Non ci siamo. Leggi la frequenza con cui hai vinto cambiando e scrivila come frazione o come numero.',
            aiuto: 'La riga «Cambio» del tabellone ti dà il numero misurato: cerca la frazione semplice che gli sta vicino.',
            dopo: () => { svelato.porte = true; }
          }],
          compito: 'Simula 100 partite restando e 100 cambiando, poi ti chiedo la probabilità.',
          fatto: () => true,
          chiusura: () => ({
            testo: 'Sì: cambiando si vince 2/3 delle volte, restando 1/3.',
            zenone: 'Ecco il perché, adesso che l\'hai visto. Al primo colpo indovini una volta su tre: se resti, vinci solo in quel caso, cioè 1/3. Cambiare invece vince esattamente quando la prima scelta era sbagliata, e succede due volte su tre. Il conduttore non porta fortuna: toglie una porta perdente e ti regala il caso in cui avevi sbagliato.'
          })
        }
      ];

      /* =====================================================================
         DOMANDE, LIVELLI, BARRA
         ===================================================================== */
      const sched = Array.prototype.slice.call(radice.querySelectorAll('.lab-scheda'));
      const espBtn = Array.prototype.slice.call(radice.querySelectorAll('.esp-btn'));

      function aggiornaPulsanti() {
        const lv = LIVELLI[livello], fermo = occupato || statoLiv.aperta;
        bt.l1.disabled = bt.l10.disabled = bt.l100.disabled = bt.l1000.disabled = fermo;
        espBtn.forEach(x => { x.disabled = fermo; x.classList.toggle('att', x.dataset.e === esp.id); });
        bt.resto.disabled = bt.cambio.disabled = fermo || porte.fase !== 'decidi';
        bt.nuova.disabled = fermo || porte.fase !== 'esito';
        bt.simR.disabled = bt.simC.disabled = fermo || lv.soloMano === true;
        bt.ric.disabled = occupato;
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length + ' · ' + (lv.stanza === 'banco' ? 'il banco' : 'le tre porte');
      }

      function mostraStanza(k) {
        stanza = k;
        stanzaBanco.hidden = k !== 'banco'; stanzaPorte.hidden = k !== 'porte';
        grBanco.hidden = k !== 'banco'; grPorte.hidden = k !== 'porte';
        sched.forEach(b => b.classList.toggle('att', b.dataset.st === k));
      }

      function disegnaTutto() { if (stanza === 'banco') disegnaBanco(); else disegnaPorte(); }

      function apriDomanda() {
        const d = LIVELLI[livello].domande[statoLiv.passo];
        if (!d) return;
        statoLiv.aperta = true; statoLiv.errori = 0;
        domanda.hidden = false; domTesto.textContent = d.testo;
        vuota(domScelte);
        if (d.scelte) {
          domRiga.hidden = true; domScelte.hidden = false;
          d.scelte.forEach((s, i) => {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'btn'; b.textContent = s;
            b.addEventListener('click', () => rispondi(i));
            domScelte.appendChild(b);
          });
        } else {
          domRiga.hidden = false; domScelte.hidden = true;
          domCampo.value = ''; domCampo.placeholder = d.segnaposto || '';
          domCampo.setAttribute('inputmode', d.modo === 'numerico' ? 'numeric' : 'text');
        }
        msg.textContent = ''; msg.className = 'lab-messaggio';
        aggiornaPulsanti();
      }

      function chiudiDomanda() { statoLiv.aperta = false; domanda.hidden = true; aggiornaPulsanti(); }

      function rispondi(v) {
        const lv = LIVELLI[livello], d = lv.domande[statoLiv.passo];
        if (!d || !statoLiv.aperta) return;
        if (!d.ok(v)) {
          msg.textContent = v === null ? 'Non ho capito il numero: scrivilo come 1/6, come 0,167 oppure come 17%.' : d.errore;
          msg.className = 'lab-messaggio no';
          statoLiv.errori++;
          if (d.aiuto && statoLiv.errori >= 2) ctx.zenone(d.aiuto, { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
          return;
        }
        statoLiv.risposte.push(v); statoLiv.passo++;
        if (d.dopo) d.dopo(v);
        if (statoLiv.passo < lv.domande.length && lv.domandePrima !== false) { apriDomanda(); disegnaTutto(); return; }
        chiudiDomanda();
        msg.textContent = lv.compito || ''; msg.className = 'lab-messaggio';
        disegnaTutto(); controllaLivello();
      }

      function controllaLivello() {
        const lv = LIVELLI[livello];
        if (statoLiv.finito || statoLiv.aperta) return;
        if (statoLiv.passo < lv.domande.length) {
          if (lv.domandePrima === false && lv.pronta && lv.pronta()) apriDomanda();
          return;
        }
        if (lv.fatto()) chiudiLivello();
      }

      function chiudiLivello() {
        statoLiv.finito = true;
        const c = LIVELLI[livello].chiusura();
        msg.innerHTML = '<span class="vinto">' + c.testo + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.completato(livello);
        ctx.zenone(c.zenone, { espressione: c.faccia || 'orgoglioso', durata: 11000 });
        bt.ric.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        disegnaTutto(); aggiornaPulsanti();
      }

      function azzera(k) { dati[k] = { c: ESP[k].teo.map(() => 0), n: 0, sel: ESP[k].fuoco, ultimo: null, entrata: null, ingresso: null }; }

      function avviaLivello(n) {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        timer.forEach(t => clearTimeout(t)); timer.clear();
        occupato = false; livello = n;
        const lv = LIVELLI[n];
        statoLiv = { passo: 0, risposte: [], finito: false, aperta: false, errori: 0 };
        mostraStanza(lv.stanza);
        if (lv.esp) { esp = ESP[lv.esp]; azzera(lv.esp); costruisciIsto(); }
        if (lv.stanza === 'porte') {
          conta.resto.v = conta.resto.n = conta.cambio.v = conta.cambio.n = 0;
          mano.resto = mano.cambio = 0;
          nuovaPartita();
        }
        bt.ric.textContent = 'Ricomincia';
        domanda.hidden = true;
        msg.textContent = lv.compito || ''; msg.className = 'lab-messaggio';
        if (lv.domande.length && lv.domandePrima !== false) apriDomanda();
        disegnaTutto(); aggiornaPulsanti();
      }

      /* ---------- eventi ---------- */
      sched.forEach(b => b.addEventListener('click', () => {
        if (occupato) return;
        const k = b.dataset.st;
        if (k === stanza) return;
        const compl = ctx.stato().livelli;
        let n = -1;
        for (let i = 0; i < LIVELLI.length; i++) if (LIVELLI[i].stanza === k && compl.indexOf(i) < 0) { n = i; break; }
        if (n < 0) for (let i = 0; i < LIVELLI.length; i++) if (LIVELLI[i].stanza === k) { n = i; break; }
        if (n >= 0) avviaLivello(n);
      }));
      espBtn.forEach(b => b.addEventListener('click', () => {
        if (occupato || statoLiv.aperta || esp.id === b.dataset.e) return;
        esp = ESP[b.dataset.e]; costruisciIsto(); disegnaBanco(); aggiornaPulsanti();
      }));
      bt.l1.addEventListener('click', () => lancia(1));
      bt.l10.addEventListener('click', () => lancia(10));
      bt.l100.addEventListener('click', () => lancia(100));
      bt.l1000.addEventListener('click', () => lancia(1000));
      bt.resto.addEventListener('click', () => decidi('resto'));
      bt.cambio.addEventListener('click', () => decidi('cambio'));
      bt.nuova.addEventListener('click', () => { if (occupato || statoLiv.aperta) return; nuovaPartita(); });
      bt.simR.addEventListener('click', () => simula('resto', 100));
      bt.simC.addEventListener('click', () => simula('cambio', 100));
      domOk.addEventListener('click', () => rispondi(leggiNumero(domCampo.value)));
      domCampo.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); rispondi(leggiNumero(domCampo.value)); } });
      bt.ric.addEventListener('click', () => {
        if (occupato) return;
        avviaLivello(statoLiv.finito ? (livello + 1) % LIVELLI.length : livello);
      });
      bt.aiuto.addEventListener('click', () => {
        const t = stanza === 'banco'
          ? 'La frequenza è le volte che è uscito diviso i lanci fatti, e cambia a ogni lancio. La probabilità teorica invece sta ferma: casi favorevoli diviso casi possibili, e i casi possibili devi contarli tu. Con due dadi attento: le coppie sono 6 × 6 = 36, non undici somme uguali.'
          : 'Il conduttore sa dove sta il tesoro: non apre mai la porta col tesoro, e non apre mai la tua. Prova a contare a parte i due casi, quando la prima porta era quella giusta e quando era sbagliata: quante volte capita l\'uno e quante l\'altro?';
        ctx.zenone(t, { tipo: 'suggerimento', espressione: 'pensa', durata: 12000 });
      });

      /* ---------- avvio ---------- */
      const completati = ctx.stato().livelli;
      if (completati.indexOf(0) >= 0) svelato.moneta = true;
      if (completati.indexOf(1) >= 0) svelato.dado = true;
      if (completati.indexOf(2) >= 0) svelato.somma = true;
      if (completati.indexOf(5) >= 0) svelato.porte = true;
      costruisciPorte(); costruisciIsto();
      let primo = completati.length ? Math.max.apply(null, completati) + 1 : 0;
      if (!(primo >= 0 && primo < LIVELLI.length)) primo = 0;
      avviaLivello(primo);

      return function smonta() {
        if (raf) cancelAnimationFrame(raf);
        timer.forEach(t => clearTimeout(t)); timer.clear();
      };
    }
  });
})();
