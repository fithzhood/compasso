/* Laboratorio «Tiro a segno» — l'equazione della retta y = mx + q.
   Due maniglie P e Q (agganciate ai punti interi) decidono una retta; il lampo la percorre
   e scoppia i palloncini che ci stanno sopra. Niente calamite: si vince solo mirando davvero. */
(function () {
  const STILE = `
    .lab-tiro .lab-scena { max-width: 520px; margin: 0 auto; background: var(--sup2); border-radius: 12px; overflow: hidden; touch-action: none; }
    .lab-tiro .griglia { stroke: var(--bordo); stroke-width: 1; opacity: .75; }
    .lab-tiro .asse { stroke: var(--testo2); stroke-width: 2; stroke-linecap: round; }
    .lab-tiro .numero { font: 13px var(--font); fill: var(--testo2); opacity: .8; }
    .lab-tiro .nome-asse { font: italic 700 15px var(--font); fill: var(--testo2); }
    .lab-tiro .retta { stroke: var(--accento); stroke-width: 3.5; stroke-linecap: round; }
    .lab-tiro .retta-grigia { stroke: var(--testo2); stroke-width: 2.5; stroke-dasharray: 8 6; opacity: .55; stroke-linecap: round; }
    .lab-tiro .etichetta-r { font: italic 700 15px var(--font); fill: var(--testo2); opacity: .9; }
    .lab-tiro .filo { stroke: var(--testo2); stroke-width: 1.2; fill: none; opacity: .65; }
    .lab-tiro .pallone { stroke: rgba(0,0,0,.22); stroke-width: 1.5; }
    .lab-tiro .luce { fill: #fff; opacity: .35; }
    .lab-tiro .bersaglio-punto { fill: #fff; stroke: rgba(0,0,0,.45); stroke-width: 1.4; }
    .lab-tiro .scudo { fill: none; stroke: var(--testo2); stroke-width: 1.5; stroke-dasharray: 4 5; opacity: .6; }
    .lab-tiro .maniglia .alone { fill: var(--accento); opacity: 0; transition: opacity .15s; }
    .lab-tiro .maniglia.presa .alone { opacity: .25; }
    .lab-tiro .maniglia .corpo { fill: var(--accento); stroke: var(--sup); stroke-width: 2.5; }
    .lab-tiro .maniglia .nome { font: 700 14px var(--font); fill: var(--testo); paint-order: stroke; stroke: var(--sup); stroke-width: 3.5; stroke-linejoin: round; }
    .lab-tiro .lampo { stroke: var(--accento); stroke-width: 6; stroke-linecap: round; opacity: .9; }
    .lab-tiro .lampo-b { stroke: #fff; stroke-width: 2; stroke-linecap: round; opacity: .85; }
    .lab-tiro .testa-lampo { fill: #fff; opacity: .9; }
    .lab-tiro .svanisce { transition: opacity .18s linear; opacity: 0 !important; }
    .lab-tiro .scoppio { transform-box: view-box; animation: lab-tiro-scoppio .42s ease-out forwards; }
    .lab-tiro .scoppio circle { stroke-width: 3; }
    .lab-tiro .scoppio .briciola { stroke: none; }
    @keyframes lab-tiro-scoppio { from { transform: scale(.35); opacity: 1 } to { transform: scale(2.2); opacity: 0 } }
    .lab-tiro .obiettivo { text-align: center; padding: 4px 12px 10px; font-size: .95rem; color: var(--testo2); line-height: 1.6; }
    .lab-tiro .obiettivo .katex { font-size: 1em; }
    .lab-tiro .equazione { text-align: center; padding: 12px 12px 0; font-size: 1.35rem; }
    .lab-tiro .dati { display: flex; gap: 6px 16px; flex-wrap: wrap; justify-content: center; padding: 8px 12px 0; font-size: .86rem; color: var(--testo2); }
    .lab-tiro .dati .katex { font-size: 1em; }
    .lab-tiro .vinto { animation: lab-tiro-pop .5s cubic-bezier(.34,1.56,.64,1); display: inline-block; }
    @keyframes lab-tiro-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-tiro .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  const W = 480, U = 36, CX = 240, CY = 240, MAX = 6, LIM = 6.35;
  const PX = x => CX + x * U, PY = y => CY - y * U;

  /* ---------- frazioni (m e q sono razionali, mai a virgola) ---------- */
  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  function fraz(n, d) { if (d < 0) { n = -n; d = -d; } const g = mcd(n, d); return { n: n / g, d: d / g }; }
  const uguali = (a, b) => (a === null || b === null) ? a === b : (a.n === b.n && a.d === b.d);
  function perpend(a, b) { if (a === null) return b !== null && b.n === 0; if (b === null) return a.n === 0; return a.n * b.n === -(a.d * b.d); }
  function texFraz(f) { return f.d === 1 ? String(f.n) : (f.n < 0 ? '-' : '') + '\\frac{' + Math.abs(f.n) + '}{' + f.d + '}'; }
  const meno = s => String(s).replace(/-/g, '−');
  const testoFraz = f => f.d === 1 ? meno(f.n) : meno(f.n) + '/' + f.d;
  const puntoTesto = (x, y) => '(' + meno(x) + ';' + meno(y) + ')';

  /* ---------- la retta per due punti ---------- */
  function calcola(P, Q) {
    if (P.x === Q.x) return { verticale: true, x: P.x, m: null, q: null };
    const m = fraz(Q.y - P.y, Q.x - P.x);
    const q = fraz(P.y * m.d - m.n * P.x, m.d);
    return { verticale: false, m, q };
  }
  function eqTex(r) {
    if (r.verticale) return 'x = ' + r.x;
    if (r.m.n === 0) return 'y = ' + r.q.n;
    let s = 'y = ';
    s += (r.m.d === 1 && Math.abs(r.m.n) === 1) ? (r.m.n < 0 ? '-x' : 'x') : texFraz(r.m) + 'x';
    if (r.q.n !== 0) s += (r.q.n > 0 ? ' + ' : ' - ') + texFraz({ n: Math.abs(r.q.n), d: r.q.d });
    return s;
  }
  function eqTesto(r) {
    if (r.verticale) return 'x = ' + meno(r.x);
    if (r.m.n === 0) return 'y = ' + meno(r.q.n);
    let s = 'y = ';
    s += (r.m.d === 1 && Math.abs(r.m.n) === 1) ? (r.m.n < 0 ? '−x' : 'x') : testoFraz(r.m) + ' x';
    if (r.q.n !== 0) s += (r.q.n > 0 ? ' + ' : ' − ') + testoFraz({ n: Math.abs(r.q.n), d: r.q.d });
    return s;
  }

  /* ---------- livelli ---------- */
  const P0 = [-4, -5], Q0 = [3, -5];   /* partenza uguale per tutti: y = −5, lontana da ogni palloncino */
  const LIVELLI = [
    { obiettivo: 'Due palloncini. Porta P su uno, Q sull\'altro e spara.', palloncini: [[-2, -1], [2, 3]] },
    { obiettivo: 'Tre palloncini in fila: bastano due per decidere la retta, il terzo verifica.', palloncini: [[-2, -3], [0, 1], [2, 5]] },
    { obiettivo: 'Tre in fila, ma stavolta la retta scende: che segno avrà $m$?', palloncini: [[-2, 5], [0, 1], [2, -3]] },
    { obiettivo: 'Tre in fila: qui la pendenza non è un numero intero.', palloncini: [[-4, -1], [0, 1], [4, 3]] },
    { obiettivo: 'Tutti alla stessa altezza. Che pendenza ha una retta così?', palloncini: [[-4, 3], [0, 3], [4, 3]] },
    { obiettivo: 'Tutti incolonnati. Attento: questa non si scrive nella forma $y = mx + q$.', palloncini: [[2, -4], [2, 1], [2, 5]] },
    { tipo: 'nascosti', obiettivo: 'Tre palloncini nascosti stanno sulla retta $y = -\\frac{1}{2}x + 2$. Portaci la tua e spara.', palloncini: [[-4, 4], [0, 2], [4, 0]] },
    { tipo: 'parallela', obiettivo: 'La tratteggiata è la retta $r$. Prendi il palloncino con una retta parallela a $r$.', r: { m: [2, 1], q: -4 }, palloncini: [[-1, 2]] },
    { tipo: 'perpendicolare', obiettivo: 'La tratteggiata è la retta $r$. Prendi il palloncino con una retta perpendicolare a $r$.', r: { m: [1, 2], q: 1 }, palloncini: [[1, 2]] },
    { tipo: 'trappola', obiettivo: 'Quattro palloncini, ma solo tre stanno sulla stessa retta: prendi quei tre.', palloncini: [[-2, -3], [1, 0], [4, 3], [0, 2]], falso: 3 }
  ];

  COMPASSO.registraLab({
    id: 'tiro-a-segno',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-tiro-a-segno')) { const s = document.createElement('style'); s.id = 'stile-lab-tiro-a-segno'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-tiro');
      radice.innerHTML = `
        <div class="obiettivo"></div>
        <div class="lab-scena"></div>
        <div class="equazione"></div>
        <div class="dati"></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn primario m-spara">🎯 Spara</button>
          <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo m-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const obEl = radice.querySelector('.obiettivo'), eqEl = radice.querySelector('.equazione');
      const datiEl = radice.querySelector('.dati'), msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const btnSpara = radice.querySelector('.m-spara'), btnRic = radice.querySelector('.m-ricomincia'), btnAiuto = radice.querySelector('.m-aiuto');

      /* ---------- scena: piano cartesiano disegnato a mano ---------- */
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, role: 'img', 'aria-label': 'Piano cartesiano con palloncini e una retta da orientare' });
      scena.appendChild(svg);
      const gGriglia = el('g', { class: 'griglia' });
      for (let i = -MAX; i <= MAX; i++) {
        gGriglia.appendChild(el('line', { x1: PX(i), y1: PY(MAX), x2: PX(i), y2: PY(-MAX) }));
        gGriglia.appendChild(el('line', { x1: PX(-MAX), y1: PY(i), x2: PX(MAX), y2: PY(i) }));
      }
      svg.appendChild(gGriglia);
      const gAssi = el('g');
      gAssi.appendChild(el('line', { class: 'asse', x1: PX(-MAX) - 10, y1: CY, x2: PX(MAX) + 10, y2: CY }));
      gAssi.appendChild(el('line', { class: 'asse', x1: CX, y1: PY(MAX) - 10, x2: CX, y2: PY(-MAX) + 10 }));
      gAssi.appendChild(el('path', { d: `M${PX(MAX) + 10} ${CY} l-9 -5 v10 z`, fill: 'var(--testo2)' }));
      gAssi.appendChild(el('path', { d: `M${CX} ${PY(MAX) - 10} l-5 9 h10 z`, fill: 'var(--testo2)' }));
      gAssi.appendChild(el('text', { class: 'nome-asse', x: PX(MAX) + 2, y: CY + 20 }, 'x'));
      gAssi.appendChild(el('text', { class: 'nome-asse', x: CX + 8, y: PY(MAX) - 2 }, 'y'));
      for (let i = -MAX; i <= MAX; i++) {
        if (!i) continue;
        gAssi.appendChild(el('text', { class: 'numero', x: PX(i), y: CY + 16, 'text-anchor': 'middle' }, meno(i)));
        gAssi.appendChild(el('text', { class: 'numero', x: CX - 7, y: PY(i) + 4, 'text-anchor': 'end' }, meno(i)));
      }
      gAssi.appendChild(el('text', { class: 'numero', x: CX - 7, y: CY + 16, 'text-anchor': 'end' }, '0'));
      svg.appendChild(gAssi);
      const gGrigia = el('g'); svg.appendChild(gGrigia);
      const retta = el('line', { class: 'retta' }); svg.appendChild(retta);
      const gPall = el('g'); svg.appendChild(gPall);
      const gEffetti = el('g'); svg.appendChild(gEffetti);
      const gMan = el('g'); svg.appendChild(gMan);

      function creaManiglia(nome) {
        const g = el('g', { class: 'maniglia' });
        g.appendChild(el('circle', { class: 'alone', cx: 0, cy: 0, r: 22 }));
        g.appendChild(el('circle', { class: 'corpo', cx: 0, cy: 0, r: 9 }));
        g.appendChild(el('text', { class: 'nome', x: 15, y: 6 }, nome));
        gMan.appendChild(g); return g;
      }
      const gP = creaManiglia('P'), gQ = creaManiglia('Q');

      /* ---------- stato ---------- */
      let livello = 0, P = { x: 0, y: 0 }, Q = { x: 1, y: 0 }, palloncini = [], nodi = [];
      let tentativi = 0, finito = false, animando = false, raf = null;
      const timers = [];
      const attesa = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max(...completati) + 1 : 0;
      if (livello >= LIVELLI.length) livello = 0;

      /* ---------- utilità della scena ---------- */
      function conMate(s) { return s.split('$').map((p, i) => i % 2 ? ctx.tex(p) : p.replace(/&/g, '&amp;').replace(/</g, '&lt;')).join(''); }
      function mRif() { const L = LIVELLI[livello]; return L.r ? fraz(L.r.m[0], L.r.m[1]) : null; }
      const sullaLinea = b => (b.x - P.x) * (Q.y - P.y) === (b.y - P.y) * (Q.x - P.x);

      /* taglia la retta (infinita) per A e B sul riquadro del piano: Liang-Barsky */
      function clip(A, B) {
        const x0 = PX(A.x), y0 = PY(A.y), dx = PX(B.x) - x0, dy = PY(B.y) - y0;
        const xm = PX(-LIM), xM = PX(LIM), ym = PY(LIM), yM = PY(-LIM);
        const p = [-dx, dx, -dy, dy], q = [x0 - xm, xM - x0, y0 - ym, yM - y0];
        let t0 = -1e6, t1 = 1e6;
        for (let i = 0; i < 4; i++) {
          if (p[i] === 0) { if (q[i] < 0) return null; }
          else { const t = q[i] / p[i]; if (p[i] < 0) t0 = Math.max(t0, t); else t1 = Math.min(t1, t); }
        }
        if (t0 > t1) return null;
        let ax = x0 + t0 * dx, ay = y0 + t0 * dy, bx = x0 + t1 * dx, by = y0 + t1 * dy;
        if (bx < ax - .01 || (Math.abs(bx - ax) <= .01 && by < ay)) { const tx = ax, ty = ay; ax = bx; ay = by; bx = tx; by = ty; }
        return { ax, ay, bx, by };
      }

      /* ---------- palloncini ---------- */
      function creaPalloncini() {
        const L = LIVELLI[livello];
        palloncini = L.palloncini.map(([x, y], i) => ({
          x, y, i, scoppiato: false,
          nascosto: L.tipo === 'nascosti',
          protetto: L.tipo === 'parallela' || L.tipo === 'perpendicolare',
          bersaglio: L.falso !== i,
          colore: 'var(--s' + (i % 4 + 1) + ')'
        }));
      }
      function disegnaPalloncini() {
        svuota(gPall); nodi = [];
        palloncini.forEach(b => {
          if (b.scoppiato || b.nascosto) { nodi.push(null); return; }
          const X = PX(b.x), Y = PY(b.y), g = el('g');
          g.appendChild(el('path', { class: 'filo', d: `M${X} ${Y + 13} c 6 8 -6 13 0 21` }));
          g.appendChild(el('path', { d: `M${X - 3.5} ${Y + 12} l3.5 5 l3.5 -5 z`, fill: b.colore }));
          g.appendChild(el('ellipse', { class: 'pallone', cx: X, cy: Y, rx: 11.5, ry: 13.5, fill: b.colore }));
          g.appendChild(el('ellipse', { class: 'luce', cx: X - 4, cy: Y - 5, rx: 3, ry: 4.5 }));
          g.appendChild(el('circle', { class: 'bersaglio-punto', cx: X, cy: Y, r: 2.2 }));
          if (b.protetto) g.appendChild(el('circle', { class: 'scudo', cx: X, cy: Y, r: 20 }));
          gPall.appendChild(g); nodi.push(g);
        });
      }
      function scoppia(b) {
        b.scoppiato = true;
        if (nodi[b.i]) { nodi[b.i].remove(); nodi[b.i] = null; }
        const X = PX(b.x), Y = PY(b.y), g = el('g', { class: 'scoppio', style: 'transform-origin: ' + X + 'px ' + Y + 'px' });
        g.appendChild(el('circle', { cx: X, cy: Y, r: 12, fill: 'none', stroke: b.colore }));
        for (let k = 0; k < 6; k++) {
          const a = k * Math.PI / 3;
          g.appendChild(el('circle', { class: 'briciola', cx: X + Math.cos(a) * 15, cy: Y + Math.sin(a) * 15, r: 3, fill: b.colore }));
        }
        gEffetti.appendChild(g);
        attesa(() => g.remove(), 480);
      }
      function disegnaGrigia() {
        svuota(gGrigia);
        const L = LIVELLI[livello];
        if (!L.r) return;
        const mm = L.r.m[0] / L.r.m[1];
        const seg = clip({ x: -MAX, y: L.r.q - mm * MAX }, { x: MAX, y: L.r.q + mm * MAX });
        if (!seg) return;
        gGrigia.appendChild(el('line', { class: 'retta-grigia', x1: seg.ax, y1: seg.ay, x2: seg.bx, y2: seg.by }));
        const tx = Math.max(20, Math.min(W - 20, seg.bx - 16)), ty = Math.max(24, Math.min(W - 12, seg.by + (seg.by < W / 2 ? 24 : -12)));
        gGrigia.appendChild(el('text', { class: 'etichetta-r', x: tx, y: ty, 'text-anchor': 'middle' }, 'r'));
      }

      /* ---------- ponte con la matematica scritta ---------- */
      function aggiornaTesta() { livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length + ' · spari: ' + tentativi; }
      function aggiornaManiglie() {
        gP.setAttribute('transform', 'translate(' + PX(P.x) + ',' + PY(P.y) + ')');
        gQ.setAttribute('transform', 'translate(' + PX(Q.x) + ',' + PY(Q.y) + ')');
      }
      function aggiornaRetta() {
        const seg = clip(P, Q);
        if (seg) { retta.setAttribute('x1', seg.ax); retta.setAttribute('y1', seg.ay); retta.setAttribute('x2', seg.bx); retta.setAttribute('y2', seg.by); }
        const r = calcola(P, Q);
        eqEl.innerHTML = ctx.tex(eqTex(r));
        let d = '<span>P ' + puntoTesto(P.x, P.y) + '</span><span>Q ' + puntoTesto(Q.x, Q.y) + '</span>';
        if (r.verticale) d += '<span>m non esiste: la retta è verticale</span>';
        else d += '<span>' + ctx.tex('m = ' + texFraz(r.m)) + '</span><span>' + ctx.tex('q = ' + texFraz(r.q)) + '</span>';
        datiEl.innerHTML = d;
        aggiornaManiglie();
      }

      /* ---------- lo sparo ---------- */
      function condizioneOk(r) {
        const L = LIVELLI[livello];
        if (L.tipo === 'parallela') return uguali(r.verticale ? null : r.m, mRif());
        if (L.tipo === 'perpendicolare') return perpend(r.verticale ? null : r.m, mRif());
        return true;
      }
      function lampo(seg, lista, fine) {
        const dur = 460;
        const a = el('line', { class: 'lampo', x1: seg.ax, y1: seg.ay, x2: seg.ax, y2: seg.ay });
        const b = el('line', { class: 'lampo-b', x1: seg.ax, y1: seg.ay, x2: seg.ax, y2: seg.ay });
        const testa = el('circle', { class: 'testa-lampo', cx: seg.ax, cy: seg.ay, r: 7 });
        gEffetti.appendChild(a); gEffetti.appendChild(b); gEffetti.appendChild(testa);
        const t0 = performance.now(); let k = 0;
        const passo = now => {
          const t = Math.min(1, (now - t0) / dur);
          const x = seg.ax + (seg.bx - seg.ax) * t, y = seg.ay + (seg.by - seg.ay) * t;
          a.setAttribute('x2', x); a.setAttribute('y2', y);
          b.setAttribute('x2', x); b.setAttribute('y2', y);
          testa.setAttribute('cx', x); testa.setAttribute('cy', y);
          while (k < lista.length && lista[k].t <= t) { scoppia(lista[k].b); k++; }
          if (t < 1) { raf = requestAnimationFrame(passo); return; }
          raf = null; testa.remove();
          a.classList.add('svanisce'); b.classList.add('svanisce');
          attesa(() => { a.remove(); b.remove(); }, 220);
          fine();
        };
        raf = requestAnimationFrame(passo);
      }
      function spara() {
        if (finito || animando) return;
        const seg = clip(P, Q);
        if (!seg) return;
        const r = calcola(P, Q), ok = condizioneOk(r);
        tentativi++; aggiornaTesta();
        msg.textContent = ''; msg.className = 'lab-messaggio';
        const dd = Math.pow(seg.bx - seg.ax, 2) + Math.pow(seg.by - seg.ay, 2) || 1;
        const lista = palloncini
          .filter(b => !b.scoppiato && sullaLinea(b) && (!b.protetto || ok))
          .map(b => ({ b, t: ((PX(b.x) - seg.ax) * (seg.bx - seg.ax) + (PY(b.y) - seg.ay) * (seg.by - seg.ay)) / dd }))
          .sort((u, v) => u.t - v.t);
        animando = true; btnSpara.disabled = true;
        lampo(seg, lista, () => { animando = false; btnSpara.disabled = finito; valuta(); });
      }

      /* ---------- esito ---------- */
      function valuta() {
        const L = LIVELLI[livello], r = calcola(P, Q);
        if (L.tipo === 'nascosti') {
          const restano = palloncini.filter(b => !b.scoppiato && b.nascosto);
          if (restano.length) { restano.forEach(b => { b.nascosto = false; }); disegnaPalloncini(); }
        }
        const bersagli = palloncini.filter(b => b.bersaglio);
        const presi = bersagli.filter(b => b.scoppiato).length;
        if (presi === bersagli.length) { vinci(r); return; }
        msg.textContent = presi + ' su ' + bersagli.length + '.';
        msg.className = 'lab-messaggio no';
        ctx.zenone(diagnosi(L, r, bersagli, presi), { tipo: 'suggerimento', espressione: presi ? 'pensa' : 'sorpreso', durata: 7000 });
      }
      function diagnosi(L, r, bersagli, presi) {
        if (L.tipo === 'parallela' || L.tipo === 'perpendicolare') {
          const b = bersagli[0], passa = sullaLinea(b), ok = condizioneOk(r);
          const nome = L.tipo === 'parallela' ? 'parallela' : 'perpendicolare';
          const regola = L.tipo === 'parallela'
            ? 'deve avere la stessa pendenza di r, cioè m = ' + testoFraz(mRif())
            : 'le due pendenze moltiplicate devono fare −1, e r ha m = ' + testoFraz(mRif());
          if (passa && !ok) return 'Ci passi sopra, ma la tua retta non è ' + nome + ' a r: ' + regola + '. Finché la pendenza non è quella, il palloncino resiste.';
          if (!passa && ok) return 'La pendenza è quella giusta: adesso è solo questione di q. Sposta la retta senza cambiarne l\'inclinazione finché non tocca ' + puntoTesto(b.x, b.y) + '.';
          return 'Né ' + nome + ' a r né sopra il palloncino. Parti dalla pendenza: ' + regola + '.';
        }
        if (L.tipo === 'nascosti' && !presi) return 'Non era quella. Adesso i palloncini si vedono: stavano sulla retta scritta. Appoggiaci P e Q e riprova.';
        if (L.tipo === 'trappola' && presi === 2) return 'Ne hai presi due, ma tre stanno su una retta sola: quale? Per due punti passa sempre una retta, il difficile è trovare i tre che sono in fila.';
        if (!presi) return 'La retta non ne tocca nemmeno uno. Appoggia P esattamente su un palloncino e Q su un altro: per due punti passa una retta sola.';
        const dentro = bersagli.find(b => sullaLinea(b)) || bersagli.find(b => b.scoppiato);
        const fuori = bersagli.find(b => !b.scoppiato && !sullaLinea(b)) || bersagli.find(b => !b.scoppiato);
        return 'Ne hai presi ' + presi + ' su ' + bersagli.length + ': la retta passa per ' + puntoTesto(dentro.x, dentro.y) + ' ma non per ' + puntoTesto(fuori.x, fuori.y) + '. Tieni ferma una maniglia e sposta l\'altra.';
      }
      function vinci(r) {
        finito = true; btnSpara.disabled = true;
        msg.innerHTML = '<span class="vinto">Tutti scoppiati in ' + tentativi + (tentativi === 1 ? ' sparo: ' : ' spari: ') + ctx.tex(eqTex(r)) + '</span>';
        msg.className = 'lab-messaggio ok';
        ctx.completato(livello);
        ctx.zenone(commentoVittoria(r), { espressione: tentativi === 1 ? 'orgoglioso' : 'felice', durata: 7000 });
        btnRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
      }
      function commentoVittoria(r) {
        const L = LIVELLI[livello];
        if (r.verticale) return 'Tutti avevano la stessa x, quindi la retta è x = ' + meno(r.x) + '. Una retta verticale non si scrive come y = mx + q: salendo non si sposta mai di lato, la pendenza non esiste.';
        if (L.tipo === 'parallela') return 'Parallela vuol dire stessa pendenza: r ha m = ' + testoFraz(mRif()) + ' e la tua anche. Cambia solo la q, cioè il punto in cui taglia l\'asse y: ' + eqTesto(r) + '.';
        if (L.tipo === 'perpendicolare') return 'Perpendicolare: ' + testoFraz(mRif()) + ' × ' + testoFraz(r.m) + ' fa −1. La tua retta è ' + eqTesto(r) + '.';
        if (r.m.n === 0) return 'Retta orizzontale: a ogni passo verso destra non sali di niente, quindi m = 0 e resta ' + eqTesto(r) + ', l\'altezza a cui vola tutta la retta.';
        const salita = r.m.n > 0 ? 'sale di ' + r.m.n : 'scende di ' + (-r.m.n);
        const passo = r.m.d === 1 ? 'a ogni passo verso destra ' + salita : 'ogni ' + r.m.d + ' passi verso destra ' + salita;
        return 'Presi: la retta è ' + eqTesto(r) + '. Vuol dire che ' + passo + ', e che taglia l\'asse y in ' + testoFraz(r.q) + '.';
      }
      function aiuto() {
        const L = LIVELLI[livello];
        let t = 'Una retta non verticale si scrive y = mx + q. La m è la pendenza: di quanto sali ogni volta che fai un passo verso destra (se scendi è negativa, se resti alla stessa altezza vale 0). La q dice dove la retta taglia l\'asse y. Per due punti passa una retta sola: appoggia P e Q su due palloncini e la retta è già decisa.';
        if (L.tipo === 'parallela') t += ' Parallela vuol dire stessa pendenza: conta di quanto sale r a ogni passo, dai alla tua lo stesso m e poi spostala, senza inclinarla, finché non tocca il palloncino.';
        else if (L.tipo === 'perpendicolare') t += ' Perpendicolare vuol dire che le due pendenze moltiplicate fanno −1: prendi la m di r, girala sottosopra e cambiale segno. Poi porta la retta sul palloncino.';
        else if (L.tipo === 'nascosti') t += ' Per costruire una retta scritta: parti dal punto (0; q) sull\'asse y, poi fai un passo verso destra e sali di m; se m è una frazione, fai tanti passi quanti dice il denominatore e sali quanto dice il numeratore.';
        else if (L.tipo === 'trappola') t += ' Qui uno dei quattro è fuori fila: tieni due palloncini sotto P e Q e guarda chi altro finisce sulla retta.';
        else if (L.palloncini.every(p => p[0] === L.palloncini[0][0])) t += ' Se tutti i punti hanno la stessa x la retta è verticale: si scrive x = numero, e la y può valere qualunque cosa.';
        else if (L.palloncini.every(p => p[1] === L.palloncini[0][1])) t += ' Se tutti i punti hanno la stessa y la retta è orizzontale: non sale mai, quindi m = 0 e resta y = q.';
        return t;
      }

      /* ---------- livelli ---------- */
      function avviaLivello(n) {
        livello = n;
        const L = LIVELLI[n];
        P = { x: (L.P || P0)[0], y: (L.P || P0)[1] };
        Q = { x: (L.Q || Q0)[0], y: (L.Q || Q0)[1] };
        tentativi = 0; finito = false; animando = false;
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        svuota(gEffetti);
        creaPalloncini(); disegnaPalloncini(); disegnaGrigia();
        obEl.innerHTML = conMate(L.obiettivo);
        msg.textContent = ''; msg.className = 'lab-messaggio';
        btnSpara.disabled = false; btnRic.textContent = 'Ricomincia';
        aggiornaRetta(); aggiornaTesta();
      }

      /* ---------- maniglie col dito ---------- */
      let trascino = null;
      const coordSvg = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * W, y: (ev.clientY - r.top) / r.height * W }; };
      svg.addEventListener('pointerdown', ev => {
        if (animando) return;
        const c = coordSvg(ev);
        const dP = Math.hypot(c.x - PX(P.x), c.y - PY(P.y)), dQ = Math.hypot(c.x - PX(Q.x), c.y - PY(Q.y));
        if (Math.min(dP, dQ) > 46) return;
        trascino = dP <= dQ ? 'P' : 'Q';
        (trascino === 'P' ? gP : gQ).classList.add('presa');
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      });
      svg.addEventListener('pointermove', ev => {
        if (!trascino) return;
        const c = coordSvg(ev);
        const nx = Math.max(-MAX, Math.min(MAX, Math.round((c.x - CX) / U)));
        const ny = Math.max(-MAX, Math.min(MAX, Math.round((CY - c.y) / U)));
        const mio = trascino === 'P' ? P : Q, altro = trascino === 'P' ? Q : P;
        if ((nx === altro.x && ny === altro.y) || (nx === mio.x && ny === mio.y)) return;
        mio.x = nx; mio.y = ny;
        if (msg.classList.contains('no')) { msg.textContent = ''; msg.className = 'lab-messaggio'; }
        aggiornaRetta();
      });
      const molla = () => { if (!trascino) return; (trascino === 'P' ? gP : gQ).classList.remove('presa'); trascino = null; };
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('pointerleave', molla);

      btnSpara.addEventListener('click', spara);
      btnRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      btnAiuto.addEventListener('click', () => ctx.zenone(aiuto(), { tipo: 'suggerimento', espressione: 'pensa', durata: 12000 }));

      avviaLivello(livello);

      return function smonta() {
        if (raf) cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
      };
    }
  });
})();
