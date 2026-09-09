/* Compasso — motore dei grafici (SVG) e parser di espressioni.
   Nessuna dipendenza. Espone window.CGRAF.
   Specifiche accettate: vedi SCHEMA.md §Grafici. */
(function () {
  'use strict';

  /* ============================================================
     1. PARSER DI ESPRESSIONI
     Sintassi: x^2 - 2*x - 3, 2x, sin(x), sqrt(x+1), abs(x), pi, e
     Moltiplicazione implicita: 2x, 3(x+1), x(x-2), 2pi
     ============================================================ */
  const FUNZ = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    cot: x => 1 / Math.tan(x), sec: x => 1 / Math.cos(x), csc: x => 1 / Math.sin(x),
    asin: Math.asin, arcsin: Math.asin, acos: Math.acos, arccos: Math.acos,
    atan: Math.atan, arctan: Math.atan, sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
    exp: Math.exp, ln: Math.log, log: Math.log, log10: Math.log10, log2: Math.log2,
    sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, floor: Math.floor, ceil: Math.ceil,
    round: Math.round, sign: Math.sign, min: Math.min, max: Math.max, pow: Math.pow,
    fact: n => { if (n < 0 || n !== Math.floor(n)) return NaN; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  };
  const COST = { pi: Math.PI, 'π': Math.PI, e: Math.E, inf: Infinity, Infinity: Infinity };

  function tokenizza(s) {
    const t = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        if (s[j] === 'e' && /[0-9]/.test(s[j + 1] || '')) { j++; while (j < s.length && /[0-9]/.test(s[j])) j++; }
        t.push({ k: 'num', v: parseFloat(s.slice(i, j)) }); i = j; continue;
      }
      if (/[A-Za-zπ_]/.test(c)) {
        let j = i; while (j < s.length && /[A-Za-z0-9π_]/.test(s[j])) j++;
        t.push({ k: 'id', v: s.slice(i, j) }); i = j; continue;
      }
      if ('+-*/^(),!'.includes(c)) { t.push({ k: c }); i++; continue; }
      if (c === '·' || c === '×') { t.push({ k: '*' }); i++; continue; }
      if (c === '−') { t.push({ k: '-' }); i++; continue; }
      throw new Error('Carattere non valido "' + c + '" in "' + s + '"');
    }
    t.push({ k: 'fine' });
    return t;
  }

  function analizza(src) {
    const tk = tokenizza(String(src)); let p = 0;
    const vede = () => tk[p], prendi = () => tk[p++];
    function attesa(k) { if (vede().k !== k) throw new Error('Atteso "' + k + '" in "' + src + '"'); return prendi(); }
    function somma() {
      let n = prodotto();
      while (vede().k === '+' || vede().k === '-') { const op = prendi().k; n = { t: op, a: n, b: prodotto() }; }
      return n;
    }
    function iniziaFattore(x) { return x.k === 'num' || x.k === 'id' || x.k === '('; }
    function prodotto() {
      let n = unario();
      for (;;) {
        if (vede().k === '*' || vede().k === '/') { const op = prendi().k; n = { t: op, a: n, b: unario() }; }
        else if (iniziaFattore(vede())) { n = { t: '*', a: n, b: unario() }; }   // moltiplicazione implicita
        else break;
      }
      return n;
    }
    function unario() {
      if (vede().k === '-') { prendi(); return { t: 'neg', a: unario() }; }
      if (vede().k === '+') { prendi(); return unario(); }
      return potenza();
    }
    function potenza() {
      const base = postfisso();
      if (vede().k === '^') { prendi(); return { t: '^', a: base, b: unario() }; }
      return base;
    }
    function postfisso() {
      let n = atomo();
      while (vede().k === '!') { prendi(); n = { t: 'fn', f: 'fact', args: [n] }; }
      return n;
    }
    function atomo() {
      const x = prendi();
      if (x.k === 'num') return { t: 'num', v: x.v };
      if (x.k === 'id') {
        if (vede().k === '(' && FUNZ[x.v]) {
          prendi(); const args = [somma()];
          while (vede().k === ',') { prendi(); args.push(somma()); }
          attesa(')'); return { t: 'fn', f: x.v, args };
        }
        return { t: 'var', v: x.v };
      }
      if (x.k === '(') { const n = somma(); attesa(')'); return n; }
      throw new Error('Espressione non valida: "' + src + '"');
    }
    const ast = somma();
    if (vede().k !== 'fine') throw new Error('Testo in eccesso in "' + src + '"');
    return ast;
  }

  function variabili(ast, acc) {
    acc = acc || new Set();
    if (!ast) return acc;
    if (ast.t === 'var' && !(ast.v in COST)) acc.add(ast.v);
    if (ast.a) variabili(ast.a, acc);
    if (ast.b) variabili(ast.b, acc);
    if (ast.args) ast.args.forEach(a => variabili(a, acc));
    return acc;
  }

  function valuta(ast, v) {
    switch (ast.t) {
      case 'num': return ast.v;
      case 'var': return (v && ast.v in v) ? v[ast.v] : (ast.v in COST ? COST[ast.v] : NaN);
      case '+': return valuta(ast.a, v) + valuta(ast.b, v);
      case '-': return valuta(ast.a, v) - valuta(ast.b, v);
      case '*': return valuta(ast.a, v) * valuta(ast.b, v);
      case '/': return valuta(ast.a, v) / valuta(ast.b, v);
      case '^': return Math.pow(valuta(ast.a, v), valuta(ast.b, v));
      case 'neg': return -valuta(ast.a, v);
      case 'fn': return FUNZ[ast.f].apply(null, ast.args.map(a => valuta(a, v)));
    }
    return NaN;
  }

  const cacheComp = new Map();
  function compila(src) {
    if (typeof src === 'number') return () => src;
    const key = String(src);
    if (cacheComp.has(key)) return cacheComp.get(key);
    const ast = analizza(key);
    const f = v => valuta(ast, v);
    f.variabili = [...variabili(ast)];
    cacheComp.set(key, f);
    return f;
  }
  /* numero o espressione con parametri → numero */
  function num(x, vars) {
    if (x == null) return NaN;
    if (typeof x === 'number') return x;
    if (x === 'inf' || x === '+inf') return Infinity;
    if (x === '-inf') return -Infinity;
    return compila(x)(vars || {});
  }

  /* ============================================================
     2. UTILITÀ SVG
     ============================================================ */
  const NS = 'http://www.w3.org/2000/svg';
  function el(nome, attr, figli) {
    const e = document.createElementNS(NS, nome);
    if (attr) for (const k in attr) if (attr[k] != null) e.setAttribute(k, attr[k]);
    if (figli) (Array.isArray(figli) ? figli : [figli]).forEach(f => { if (f) e.appendChild(typeof f === 'string' ? document.createTextNode(f) : f); });
    return e;
  }
  const fmt = (n, d) => {
    if (!isFinite(n)) return '';
    const r = Math.round(n * 1e6) / 1e6;
    return String(Number(r.toFixed(d == null ? 2 : d))).replace('.', ',');
  };
  const colore = i => 'var(--s' + (((i || 1) - 1) % 4 + 1) + ')';
  let contatoreId = 0;

  /* passo "bello" per le tacche */
  function passoBello(range, target) {
    const grezzo = range / (target || 8);
    const mag = Math.pow(10, Math.floor(Math.log10(grezzo)));
    const n = grezzo / mag;
    const s = n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10;
    return s * mag;
  }
  function etichettaTacca(v, passo) {
    const d = passo >= 1 ? 0 : passo >= 0.1 ? 1 : 2;
    return fmt(v, d);
  }

  /* ============================================================
     3. PIANO CARTESIANO (funzioni + elementi geometrici)
     ============================================================ */
  /* trascinamento dei punti: i gestori stanno sull'svg (che sopravvive ai ridisegni) */
  function iniziaTrascinamento(svg) {
    if (svg.__dragInit) return; svg.__dragInit = true;
    const coord = ev => { const c = svg.__ctx; const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const q = pt.matrixTransform(svg.getScreenCTM().inverse()); return [c.xmin + (q.x - c.m.l) / c.pw * (c.xmax - c.xmin), c.ymax - (q.y - c.m.t) / c.ph * (c.ymax - c.ymin)]; };
    svg.addEventListener('pointermove', ev => { const d = svg.__drag; if (!d) return; ev.preventDefault(); const [x, y] = coord(ev); const c = svg.__ctx; if (d.px) c.vars[d.px] = c.limita(d.px, x, 'x'); if (d.py) c.vars[d.py] = c.limita(d.py, y, 'y'); c.aggiorna(); });
    const fine = () => { svg.__drag = null; };
    svg.addEventListener('pointerup', fine); svg.addEventListener('pointercancel', fine);
  }

  function renderPiano(spec, vars, svgEl, aggiorna) {
    const W = 600;
    const maniglie = [];
    const modello = s => String(s).replace(/\{\{([^}]+)\}\}/g, (_, e) => { try { return fmt(num(e.trim(), vars)); } catch (x) { return '?'; } });
    const xr = spec.x || [-5, 5], yr = spec.y || [-5, 5];
    let xmin = num(xr[0], vars), xmax = num(xr[1], vars), ymin = num(yr[0], vars), ymax = num(yr[1], vars);
    /* figure geometriche: stessa scala sui due assi, altrimenti i cerchi diventano ellissi */
    const geometrico = spec.proporzioni === 'uguali' || (spec.proporzioni !== 'libere' && (spec.assi === false || (spec.elementi || []).some(e => ['cerchio', 'angolo', 'poligono', 'ellisse'].includes(e.tipo))));
    const rapporto = (ymax - ymin) / (xmax - xmin);
    let H = Math.round(W * rapporto);
    if (spec.altezza) H = spec.altezza; else H = Math.max(220, Math.min(520, H));
    const m = { l: 34, r: 16, t: 14, b: 26 };
    const pw = W - m.l - m.r, ph = H - m.t - m.b;
    if (geometrico) {
      const kx = pw / (xmax - xmin), ky = ph / (ymax - ymin);
      if (kx > ky) { const w = pw / ky, cx = (xmin + xmax) / 2; xmin = cx - w / 2; xmax = cx + w / 2; }
      else if (ky > kx) { const hg = ph / kx, cy = (ymin + ymax) / 2; ymin = cy - hg / 2; ymax = cy + hg / 2; }
    }
    const sx = x => m.l + (x - xmin) / (xmax - xmin) * pw;
    const sy = y => m.t + (ymax - y) / (ymax - ymin) * ph;
    const id = 'clip' + (++contatoreId);

    const svg = svgEl || el('svg');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('class', 'cg-svg cg-piano');
    svg.setAttribute('role', 'img');
    if (spec.didascalia) svg.setAttribute('aria-label', spec.didascalia);

    svg.appendChild(el('defs', null, el('clipPath', { id }, el('rect', { x: m.l, y: m.t, width: pw, height: ph }))));
    svg.appendChild(el('rect', { x: m.l, y: m.t, width: pw, height: ph, class: 'cg-sfondo' }));

    /* griglia e assi */
    const px = spec.passo ? num(spec.passo[0], vars) : passoBello(xmax - xmin, 10);
    const py = spec.passo ? num(spec.passo[1], vars) : passoBello(ymax - ymin, 8);
    const gGriglia = el('g', { class: 'cg-griglia' });
    const gTacche = el('g', { class: 'cg-tacche' });
    if (spec.griglia !== false) {
      for (let x = Math.ceil(xmin / px) * px; x <= xmax + 1e-9; x += px) {
        gGriglia.appendChild(el('line', { x1: sx(x), x2: sx(x), y1: m.t, y2: m.t + ph }));
      }
      for (let y = Math.ceil(ymin / py) * py; y <= ymax + 1e-9; y += py) {
        gGriglia.appendChild(el('line', { x1: m.l, x2: m.l + pw, y1: sy(y), y2: sy(y) }));
      }
    }
    svg.appendChild(gGriglia);
    if (spec.assi !== false) {
      const gAssi = el('g', { class: 'cg-assi' });
      const y0 = (ymin <= 0 && ymax >= 0) ? sy(0) : (ymin > 0 ? sy(ymin) : sy(ymax));
      const x0 = (xmin <= 0 && xmax >= 0) ? sx(0) : (xmin > 0 ? sx(xmin) : sx(xmax));
      gAssi.appendChild(el('line', { x1: m.l, x2: m.l + pw, y1: y0, y2: y0, 'marker-end': 'url(#freccia-asse)' }));
      gAssi.appendChild(el('line', { x1: x0, x2: x0, y1: m.t + ph, y2: m.t }));
      /* frecce */
      gAssi.appendChild(el('path', { d: 'M' + (m.l + pw) + ',' + y0 + ' l-8,-4 v8 z', class: 'cg-freccia' }));
      gAssi.appendChild(el('path', { d: 'M' + x0 + ',' + m.t + ' l-4,8 h8 z', class: 'cg-freccia' }));
      const lx = (spec.etichette && spec.etichette.x) || 'x', ly = (spec.etichette && spec.etichette.y) || 'y';
      gAssi.appendChild(el('text', { x: m.l + pw - 4, y: y0 - 6, class: 'cg-nome-asse', 'text-anchor': 'end' }, lx));
      gAssi.appendChild(el('text', { x: x0 + 8, y: m.t + 12, class: 'cg-nome-asse' }, ly));
      /* tacche numeriche */
      for (let x = Math.ceil(xmin / px) * px; x <= xmax + 1e-9; x += px) {
        if (Math.abs(x) < 1e-9) continue;
        gTacche.appendChild(el('line', { x1: sx(x), x2: sx(x), y1: y0 - 3, y2: y0 + 3 }));
        gTacche.appendChild(el('text', { x: sx(x), y: y0 + 14, 'text-anchor': 'middle' }, etichettaTacca(x, px)));
      }
      for (let y = Math.ceil(ymin / py) * py; y <= ymax + 1e-9; y += py) {
        if (Math.abs(y) < 1e-9) continue;
        gTacche.appendChild(el('line', { x1: x0 - 3, x2: x0 + 3, y1: sy(y), y2: sy(y) }));
        gTacche.appendChild(el('text', { x: x0 - 6, y: sy(y) + 4, 'text-anchor': 'end' }, etichettaTacca(y, py)));
      }
      if (xmin <= 0 && xmax >= 0 && ymin <= 0 && ymax >= 0) gTacche.appendChild(el('text', { x: x0 - 6, y: y0 + 14, 'text-anchor': 'end' }, 'O'));
      svg.appendChild(gAssi);
      svg.appendChild(gTacche);
    }

    const gDati = el('g', { 'clip-path': 'url(#' + id + ')' });
    const gSopra = el('g');           /* etichette e punti, non ritagliati */
    svg.appendChild(gDati); svg.appendChild(gSopra);

    /* campionamento di una funzione → array di tratti */
    function campiona(fsrc, dom) {
      const f = compila(fsrc);
      const a = dom ? num(dom[0], vars) : xmin, b = dom ? num(dom[1], vars) : xmax;
      const N = 500, yrange = ymax - ymin;
      const tratti = []; let cur = [];
      let prev = null;
      for (let i = 0; i <= N; i++) {
        const x = a + (b - a) * i / N;
        let y = f(Object.assign({}, vars, { x }));
        if (!isFinite(y)) { if (cur.length) tratti.push(cur); cur = []; prev = null; continue; }
        /* salto verticale enorme → discontinuità (asintoto) */
        if (prev !== null && Math.abs(y - prev) > yrange * 1.5 && (y > ymax || y < ymin || prev > ymax || prev < ymin)) {
          if (cur.length) tratti.push(cur); cur = [];
        }
        const yc = Math.max(ymin - yrange * 2, Math.min(ymax + yrange * 2, y));
        cur.push([sx(x), sy(yc)]);
        prev = y;
      }
      if (cur.length) tratti.push(cur);
      return tratti;
    }
    const pathDa = tratti => tratti.map(t => 'M' + t.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L')).join(' ');

    /* elementi geometrici */
    const P = p => [sx(num(p[0], vars)), sy(num(p[1], vars))];
    const etich = (x, y, testo, cls, anchor) => el('text', { x, y, class: 'cg-etichetta ' + (cls || ''), 'text-anchor': anchor || 'middle' }, testo);
    const spostamento = { alto: [0, -10], basso: [0, 16], destra: [10, 4], sinistra: [-10, 4], 'alto-destra': [8, -8], 'alto-sinistra': [-8, -8], 'basso-destra': [8, 14], 'basso-sinistra': [-8, 14] };
    const anchorDi = pos => /destra/.test(pos || '') ? 'start' : /sinistra/.test(pos || '') ? 'end' : 'middle';

    (spec.elementi || []).forEach(e => {
      const col = colore(e.colore);
      const tratt = e.tratteggio ? '7 5' : null;
      switch (e.tipo) {
        case 'area': {
          const f = compila(e.f), g = e.g ? compila(e.g) : null;
          const a = num(e.da, vars), b = num(e.a, vars), N = 200;
          const sopra = [], sotto = [];
          for (let i = 0; i <= N; i++) {
            const x = a + (b - a) * i / N, v = Object.assign({}, vars, { x });
            let y1 = f(v), y2 = g ? g(v) : 0;
            if (!isFinite(y1)) y1 = 0; if (!isFinite(y2)) y2 = 0;
            sopra.push([sx(x), sy(y1)]); sotto.push([sx(x), sy(y2)]);
          }
          const d = 'M' + sopra.map(p => p.join(',')).join('L') + 'L' + sotto.reverse().map(p => p.join(',')).join('L') + 'Z';
          gDati.appendChild(el('path', { d, fill: col, 'fill-opacity': .22, stroke: 'none' }));
          if (e.etichetta) gSopra.appendChild(etich((sx(a) + sx(b)) / 2, sy(0) - 8, e.etichetta));
          break;
        }
        case 'tangente': {
          const f = compila(e.f), x0 = num(e.x0, vars), h = 1e-4;
          const y0 = f(Object.assign({}, vars, { x: x0 }));
          const der = (f(Object.assign({}, vars, { x: x0 + h })) - f(Object.assign({}, vars, { x: x0 - h }))) / (2 * h);
          const y1 = y0 + der * (xmin - x0), y2 = y0 + der * (xmax - x0);
          gDati.appendChild(el('line', { x1: sx(xmin), y1: sy(y1), x2: sx(xmax), y2: sy(y2), stroke: col, 'stroke-width': 2, 'stroke-dasharray': tratt }));
          gSopra.appendChild(el('circle', { cx: sx(x0), cy: sy(y0), r: 5, fill: col, class: 'cg-punto' }));
          if (e.etichetta !== false) gSopra.appendChild(etich(sx(x0), sy(y0) - 10, e.etichetta || ('m = ' + fmt(der))));
          break;
        }
        case 'retta': {
          let x1, y1, x2, y2;
          if (e.per) { const [p1, p2] = e.per; const ax = num(p1[0], vars), ay = num(p1[1], vars), bx = num(p2[0], vars), by = num(p2[1], vars);
            if (Math.abs(bx - ax) < 1e-12) { x1 = x2 = ax; y1 = ymin; y2 = ymax; } else { const mm = (by - ay) / (bx - ax); x1 = xmin; x2 = xmax; y1 = ay + mm * (xmin - ax); y2 = ay + mm * (xmax - ax); } }
          else { const mm = num(e.m, vars), q = num(e.q, vars); x1 = xmin; x2 = xmax; y1 = mm * xmin + q; y2 = mm * xmax + q; }
          gDati.appendChild(el('line', { x1: sx(x1), y1: sy(y1), x2: sx(x2), y2: sy(y2), stroke: col, 'stroke-width': 2, 'stroke-dasharray': tratt }));
          if (e.etichetta) { const xe = xmin + (xmax - xmin) * 0.8; const ye = y1 + (y2 - y1) * 0.8; gSopra.appendChild(etich(sx(xe), sy(ye) - 8, e.etichetta)); }
          break;
        }
        case 'verticale': {
          const x = num(e.x, vars);
          gDati.appendChild(el('line', { x1: sx(x), x2: sx(x), y1: m.t, y2: m.t + ph, stroke: col, 'stroke-width': 2, 'stroke-dasharray': tratt || (e.asintoto ? '7 5' : null) }));
          if (e.etichetta) gSopra.appendChild(etich(sx(x) + 6, m.t + 14, e.etichetta, '', 'start'));
          break;
        }
        case 'orizzontale': {
          const y = num(e.y, vars);
          gDati.appendChild(el('line', { y1: sy(y), y2: sy(y), x1: m.l, x2: m.l + pw, stroke: col, 'stroke-width': 2, 'stroke-dasharray': tratt || (e.asintoto ? '7 5' : null) }));
          if (e.etichetta) gSopra.appendChild(etich(m.l + pw - 6, sy(y) - 6, e.etichetta, '', 'end'));
          break;
        }
        case 'segmento': case 'vettore': {
          const a = P(e.da), b = P(e.a);
          const attr = { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': tratt, 'stroke-linecap': 'round' };
          if (e.tipo === 'vettore' || e.freccia) attr['marker-end'] = 'url(#freccia-' + ((e.colore || 1) - 1) % 4 + ')';
          gDati.appendChild(el('line', attr));
          if (e.etichetta) { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; const nx = -dy / L * 10, ny = dx / L * 10; gSopra.appendChild(etich((a[0] + b[0]) / 2 + nx, (a[1] + b[1]) / 2 + ny + 4, e.etichetta)); }
          break;
        }
        case 'poligono': {
          const pts = e.punti.map(P);
          gDati.appendChild(el('polygon', { points: pts.map(p => p.join(',')).join(' '), stroke: col, 'stroke-width': 2.5, fill: e.riempi === false ? 'none' : col, 'fill-opacity': e.riempi === false ? 0 : .15, 'stroke-linejoin': 'round' }));
          if (e.etichette) { const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
            pts.forEach((p, i) => { if (!e.etichette[i]) return; const dx = p[0] - cx, dy = p[1] - cy, L = Math.hypot(dx, dy) || 1; gSopra.appendChild(etich(p[0] + dx / L * 14, p[1] + dy / L * 14 + 4, e.etichette[i], 'cg-etichetta-punto')); }); }
          break;
        }
        case 'cerchio': {
          const c = P(e.centro), r = num(e.raggio, vars);
          const rx = r / (xmax - xmin) * pw, ry = r / (ymax - ymin) * ph;
          gDati.appendChild(el('ellipse', { cx: c[0], cy: c[1], rx, ry, stroke: col, 'stroke-width': 2.5, fill: e.riempi ? col : 'none', 'fill-opacity': e.riempi ? .12 : 0, 'stroke-dasharray': tratt }));
          if (e.etichetta) gSopra.appendChild(etich(c[0] + rx * 0.72, c[1] - ry * 0.72 - 4, e.etichetta));
          break;
        }
        case 'ellisse': {
          const c = P(e.centro), a = num(e.a, vars), b = num(e.b, vars);
          gDati.appendChild(el('ellipse', { cx: c[0], cy: c[1], rx: a / (xmax - xmin) * pw, ry: b / (ymax - ymin) * ph, stroke: col, 'stroke-width': 2.5, fill: 'none', 'stroke-dasharray': tratt }));
          break;
        }
        case 'angolo': {
          const v = [num(e.vertice[0], vars), num(e.vertice[1], vars)];
          const a1 = Math.atan2(num(e.da[1], vars) - v[1], num(e.da[0], vars) - v[0]);
          let a2 = Math.atan2(num(e.a[1], vars) - v[1], num(e.a[0], vars) - v[0]);
          const r = num(e.raggio == null ? 0.7 : e.raggio, vars);
          const rx = r / (xmax - xmin) * pw, ry = r / (ymax - ymin) * ph;
          let d = a2 - a1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
          const N = 24, pts = [];
          for (let i = 0; i <= N; i++) { const t = a1 + d * i / N; pts.push([sx(v[0]) + rx * Math.cos(t), sy(v[1]) - ry * Math.sin(t)]); }
          gDati.appendChild(el('path', { d: 'M' + sx(v[0]) + ',' + sy(v[1]) + 'L' + pts.map(p => p.join(',')).join('L') + 'Z', fill: col, 'fill-opacity': .25, stroke: col, 'stroke-width': 1.5 }));
          if (e.etichetta) { const t = a1 + d / 2; gSopra.appendChild(etich(sx(v[0]) + rx * 1.6 * Math.cos(t), sy(v[1]) - ry * 1.6 * Math.sin(t) + 4, e.etichetta)); }
          break;
        }
        case 'testo': {
          const p = P(e.p);
          gSopra.appendChild(etich(p[0], p[1], modello(e.testo), e.classe || '', e.ancora || 'middle'));
          break;
        }
        case 'punto': {
          const p = P(e.p);
          if (!isFinite(p[0]) || !isFinite(p[1])) break;   /* punto non definito (es. Δ<0): non si disegna */
          gSopra.appendChild(el('circle', { cx: p[0], cy: p[1], r: e.raggio || (e.trascina ? 7 : 5), fill: e.vuoto ? 'var(--g-sfondo)' : col, stroke: e.trascina ? 'var(--g-sfondo)' : col, 'stroke-width': 2, class: 'cg-punto' + (e.trascina ? ' cg-punto-trascinabile' : '') }));
          if (e.etichetta) { const s = spostamento[e.posizione || 'alto-destra'] || spostamento['alto-destra']; gSopra.appendChild(etich(p[0] + s[0], p[1] + s[1], modello(e.etichetta), 'cg-etichetta-punto', anchorDi(e.posizione || 'alto-destra'))); }
          if (e.trascina) {
            const nome = i => (typeof e.p[i] === 'string' && /^[A-Za-z_]\w*$/.test(e.p[i].trim())) ? e.p[i].trim() : null;
            const h = el('circle', { cx: p[0], cy: p[1], r: 18, fill: 'transparent', class: 'cg-maniglia' });
            h.addEventListener('pointerdown', ev => { svg.__drag = { px: nome(0), py: nome(1) }; try { svg.setPointerCapture(ev.pointerId); } catch (x) { /* niente */ } ev.preventDefault(); });
            maniglie.push(h);
          }
          break;
        }
      }
    });

    /* funzioni */
    const funzioni = spec.funzioni || [];
    funzioni.forEach((fs, i) => {
      const col = colore(fs.colore || (i + 1));
      const tratti = campiona(fs.f, fs.dominio);
      gDati.appendChild(el('path', { d: pathDa(tratti), fill: 'none', stroke: col, 'stroke-width': 2.5, 'stroke-dasharray': fs.tratteggio ? '7 5' : null, 'stroke-linejoin': 'round', class: 'cg-curva' }));
      if (fs.etichetta) {
        /* etichetta diretta: sull'ultimo punto visibile del tratto più lungo */
        let migliore = null;
        tratti.forEach(t => t.forEach(p => { if (p[1] > m.t + 14 && p[1] < m.t + ph - 6 && (!migliore || p[0] > migliore[0])) migliore = p; }));
        if (migliore) gSopra.appendChild(el('text', { x: Math.min(migliore[0], m.l + pw - 4), y: migliore[1] - 8, class: 'cg-etichetta cg-etichetta-serie', 'text-anchor': 'end', fill: col }, fs.etichetta));
      }
    });
    /* punti semplici (scorciatoia rispetto a elementi) */
    (spec.punti || []).forEach(pt => {
      const p = P([pt.x, pt.y]); const col = colore(pt.colore);
      if (!isFinite(p[0]) || !isFinite(p[1])) return;
      gSopra.appendChild(el('circle', { cx: p[0], cy: p[1], r: 5, fill: pt.vuoto ? 'var(--g-sfondo)' : col, stroke: col, 'stroke-width': 2, class: 'cg-punto' }));
      if (pt.etichetta) { const s = spostamento[pt.posizione || 'alto-destra'] || spostamento['alto-destra']; gSopra.appendChild(etich(p[0] + s[0], p[1] + s[1], pt.etichetta, 'cg-etichetta-punto', anchorDi(pt.posizione || 'alto-destra'))); }
    });

    /* mirino interattivo sulle funzioni */
    if (funzioni.length && spec.mirino !== false) {
      const gM = el('g', { class: 'cg-mirino', visibility: 'hidden' });
      const lv = el('line', { y1: m.t, y2: m.t + ph }); const cerchi = funzioni.map((_, i) => el('circle', { r: 4.5, fill: colore(funzioni[i].colore || (i + 1)) }));
      const box = el('g'); const rect = el('rect', { rx: 4, class: 'cg-tooltip-sfondo' }); const testo = el('text', { class: 'cg-tooltip-testo' });
      box.appendChild(rect); box.appendChild(testo);
      gM.appendChild(lv); cerchi.forEach(c => gM.appendChild(c)); gM.appendChild(box);
      svg.appendChild(gM);
      const cattura = el('rect', { x: m.l, y: m.t, width: pw, height: ph, fill: 'transparent', style: 'cursor:crosshair' });
      svg.appendChild(cattura);
      const muovi = ev => {
        const pt = svg.createSVGPoint(); const src = ev.touches ? ev.touches[0] : ev; pt.x = src.clientX; pt.y = src.clientY;
        const q = pt.matrixTransform(svg.getScreenCTM().inverse());
        const x = xmin + (q.x - m.l) / pw * (xmax - xmin);
        if (x < xmin || x > xmax) return;
        gM.setAttribute('visibility', 'visible');
        lv.setAttribute('x1', sx(x)); lv.setAttribute('x2', sx(x));
        const righe = ['x = ' + fmt(x)];
        funzioni.forEach((fs, i) => {
          const y = compila(fs.f)(Object.assign({}, vars, { x }));
          if (isFinite(y) && y >= ymin && y <= ymax) { cerchi[i].setAttribute('visibility', 'visible'); cerchi[i].setAttribute('cx', sx(x)); cerchi[i].setAttribute('cy', sy(y)); }
          else cerchi[i].setAttribute('visibility', 'hidden');
          righe.push((fs.etichetta ? fs.etichetta.replace(/\s*=.*$/, '') : 'y') + ' = ' + (isFinite(y) ? fmt(y) : '—'));
        });
        while (testo.firstChild) testo.removeChild(testo.firstChild);
        righe.forEach((r, i) => testo.appendChild(el('tspan', { x: 0, dy: i ? 15 : 0 }, r)));
        const bw = Math.max(...righe.map(r => r.length)) * 7 + 14, bh = righe.length * 15 + 8;
        let bx = sx(x) + 12; if (bx + bw > W - 4) bx = sx(x) - bw - 12;
        box.setAttribute('transform', 'translate(' + bx + ',' + (m.t + 8) + ')');
        rect.setAttribute('x', -7); rect.setAttribute('y', -13); rect.setAttribute('width', bw); rect.setAttribute('height', bh);
      };
      cattura.addEventListener('mousemove', muovi);
      cattura.addEventListener('touchstart', muovi, { passive: true });
      cattura.addEventListener('touchmove', muovi, { passive: true });
      cattura.addEventListener('mouseleave', () => gM.setAttribute('visibility', 'hidden'));
    }
    if (maniglie.length) {
      const g = el('g', { class: 'cg-maniglie' }); maniglie.forEach(x => g.appendChild(x)); svg.appendChild(g);
      svg.__ctx = { xmin, xmax, ymin, ymax, m, pw, ph, vars, aggiorna: aggiorna || (() => {}), limita: (nome, v, asse) => {
        const p = (spec.parametri || []).find(q => q.nome === nome);
        let lo = asse === 'x' ? xmin : ymin, hi = asse === 'x' ? xmax : ymax;
        if (p) { if (p.min != null) lo = num(p.min); if (p.max != null) hi = num(p.max); if (p.passo) v = Math.round(v / p.passo) * p.passo; }
        return Math.max(lo, Math.min(hi, Math.round(v * 1e6) / 1e6));
      } };
      iniziaTrascinamento(svg);
    }
    return svg;
  }

  /* ============================================================
     4. RETTA REALE (intervalli, per le disequazioni)
     ============================================================ */
  function renderRettaReale(spec, vars, svgEl) {
    const W = 600, H = 60 + 22 * Math.max(1, (spec.intervalli || []).length);
    const xr = spec.x || [-5, 5]; const xmin = num(xr[0], vars), xmax = num(xr[1], vars);
    const m = { l: 24, r: 24 }; const pw = W - m.l - m.r;
    const sx = x => m.l + (x - xmin) / (xmax - xmin) * pw;
    const svg = svgEl || el('svg'); while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('class', 'cg-svg cg-retta-reale');
    const yAsse = H - 26;
    svg.appendChild(el('line', { x1: m.l, x2: m.l + pw, y1: yAsse, y2: yAsse, class: 'cg-asse-reale' }));
    svg.appendChild(el('path', { d: 'M' + (m.l + pw) + ',' + yAsse + ' l-8,-4 v8 z', class: 'cg-freccia' }));
    const passo = spec.passo || passoBello(xmax - xmin, 10);
    for (let x = Math.ceil(xmin / passo) * passo; x <= xmax - passo / 2; x += passo) {
      svg.appendChild(el('line', { x1: sx(x), x2: sx(x), y1: yAsse - 4, y2: yAsse + 4, class: 'cg-asse-reale' }));
      svg.appendChild(el('text', { x: sx(x), y: yAsse + 18, 'text-anchor': 'middle', class: 'cg-tacche' }, etichettaTacca(x, passo)));
    }
    (spec.intervalli || []).forEach((iv, i) => {
      const col = colore(iv.colore || (i + 1));
      const a = num(iv.da, vars), b = num(iv.a, vars);
      const xa = isFinite(a) ? sx(a) : m.l, xb = isFinite(b) ? sx(b) : m.l + pw;
      const y = yAsse - 14 - i * 22;
      svg.appendChild(el('line', { x1: xa, x2: xb, y1: y, y2: y, stroke: col, 'stroke-width': 6, 'stroke-linecap': 'butt', opacity: .85 }));
      if (isFinite(a)) svg.appendChild(el('circle', { cx: xa, cy: y, r: 5.5, fill: iv.chiusoDa ? col : 'var(--g-sfondo)', stroke: col, 'stroke-width': 2.5 }));
      if (isFinite(b)) svg.appendChild(el('circle', { cx: xb, cy: y, r: 5.5, fill: iv.chiusoA ? col : 'var(--g-sfondo)', stroke: col, 'stroke-width': 2.5 }));
      if (iv.etichetta) svg.appendChild(el('text', { x: (xa + xb) / 2, y: y - 9, 'text-anchor': 'middle', class: 'cg-etichetta', fill: col }, iv.etichetta));
      /* proiezione tratteggiata sull'asse */
      [a, b].forEach(v => { if (isFinite(v)) svg.appendChild(el('line', { x1: sx(v), x2: sx(v), y1: y, y2: yAsse, class: 'cg-griglia', 'stroke-dasharray': '3 3' })); });
    });
    (spec.punti || []).forEach(pt => {
      const x = num(pt.x, vars); const col = colore(pt.colore);
      svg.appendChild(el('circle', { cx: sx(x), cy: yAsse, r: 5.5, fill: pt.escluso ? 'var(--g-sfondo)' : col, stroke: col, 'stroke-width': 2.5 }));
      if (pt.etichetta) svg.appendChild(el('text', { x: sx(x), y: yAsse - 10, 'text-anchor': 'middle', class: 'cg-etichetta' }, pt.etichetta));
    });
    return svg;
  }

  /* ============================================================
     5. BARRE (statistica)
     ============================================================ */
  function renderBarre(spec, vars, svgEl) {
    const W = 600, H = spec.altezza || 300;
    const m = { l: 44, r: 16, t: 18, b: 40 };
    const pw = W - m.l - m.r, ph = H - m.t - m.b;
    const cat = spec.categorie || [];
    const serie = spec.serie || [{ nome: spec.nome || '', valori: spec.valori || [] }];
    const tutti = serie.flatMap(s => s.valori.map(v => num(v, vars)));
    const vmax = spec.max != null ? spec.max : Math.max(0, ...tutti);
    const vmin = Math.min(0, ...tutti);
    const passo = passoBello(vmax - vmin, 6);
    const top = Math.ceil(vmax / passo) * passo || passo, bottom = Math.floor(vmin / passo) * passo;
    const sy = v => m.t + (top - v) / (top - bottom) * ph;
    const svg = svgEl || el('svg'); while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('class', 'cg-svg cg-barre');
    const gG = el('g', { class: 'cg-griglia' }), gT = el('g', { class: 'cg-tacche' });
    for (let v = bottom; v <= top + 1e-9; v += passo) {
      gG.appendChild(el('line', { x1: m.l, x2: m.l + pw, y1: sy(v), y2: sy(v) }));
      gT.appendChild(el('text', { x: m.l - 8, y: sy(v) + 4, 'text-anchor': 'end' }, etichettaTacca(v, passo)));
    }
    svg.appendChild(gG); svg.appendChild(gT);
    svg.appendChild(el('line', { x1: m.l, x2: m.l + pw, y1: sy(0), y2: sy(0), class: 'cg-assi' }));
    const n = cat.length, ns = serie.length;
    const gruppo = pw / n, gap = Math.min(18, gruppo * 0.25), bw = (gruppo - gap) / ns - (ns > 1 ? 2 : 0);
    cat.forEach((c, i) => {
      serie.forEach((s, j) => {
        const v = num(s.valori[i], vars); const col = colore(s.colore || (j + 1));
        const x = m.l + i * gruppo + gap / 2 + j * (bw + (ns > 1 ? 2 : 0));
        const y1 = sy(Math.max(0, v)), y2 = sy(Math.min(0, v)); const h = Math.max(0, y2 - y1);
        const r = el('rect', { x, y: y1, width: bw, height: h, fill: col, rx: 3, class: 'cg-barra' });
        r.appendChild(el('title', null, c + (s.nome ? ' — ' + s.nome : '') + ': ' + fmt(v)));
        svg.appendChild(r);
        if (spec.valori_visibili !== false && n * ns <= 12) svg.appendChild(el('text', { x: x + bw / 2, y: (v >= 0 ? y1 - 5 : y2 + 13), 'text-anchor': 'middle', class: 'cg-etichetta cg-valore' }, fmt(v)));
      });
      svg.appendChild(el('text', { x: m.l + i * gruppo + gruppo / 2, y: H - 22, 'text-anchor': 'middle', class: 'cg-tacche cg-categoria' }, String(c)));
    });
    if (spec.etichettaY) svg.appendChild(el('text', { x: m.l, y: 11, class: 'cg-nome-asse' }, spec.etichettaY));
    if (spec.etichettaX) svg.appendChild(el('text', { x: m.l + pw / 2, y: H - 4, 'text-anchor': 'middle', class: 'cg-nome-asse' }, spec.etichettaX));
    if (ns > 1) { /* legenda */
      let lx = m.l + pw; serie.slice().reverse().forEach((s, k) => { const j = ns - 1 - k; const t = el('text', { x: lx, y: 11, 'text-anchor': 'end', class: 'cg-legenda' }, s.nome || ''); svg.appendChild(t); const larg = (s.nome || '').length * 6.5 + 18; svg.appendChild(el('rect', { x: lx - larg + 2, y: 3, width: 10, height: 10, rx: 2, fill: colore(s.colore || (j + 1)) })); lx -= larg + 10; });
    }
    return svg;
  }

  /* ============================================================
     6. CIRCONFERENZA GONIOMETRICA (interattiva)
     ============================================================ */
  function renderCirconferenza(spec, vars, svgEl) {
    const W = 600, H = 400; const cx = 210, cy = 200, R = 150;
    const gradi = vars.angolo != null ? vars.angolo : (spec.angolo != null ? spec.angolo : 60);
    const t = gradi * Math.PI / 180;
    const svg = svgEl || el('svg'); while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('class', 'cg-svg cg-circonferenza');
    const gG = el('g', { class: 'cg-griglia' });
    for (let k = -1; k <= 1; k += .5) { gG.appendChild(el('line', { x1: cx + k * R, x2: cx + k * R, y1: cy - R - 20, y2: cy + R + 20 })); gG.appendChild(el('line', { y1: cy + k * R, y2: cy + k * R, x1: cx - R - 20, x2: cx + R + 20 })); }
    svg.appendChild(gG);
    const gA = el('g', { class: 'cg-assi' });
    gA.appendChild(el('line', { x1: cx - R - 30, x2: cx + R + 30, y1: cy, y2: cy })); gA.appendChild(el('line', { y1: cy + R + 30, y2: cy - R - 30, x1: cx, x2: cx }));
    svg.appendChild(gA);
    const gT = el('g', { class: 'cg-tacche' });
    [['1', cx + R, cy + 16], ['−1', cx - R, cy + 16], ['1', cx - 10, cy - R + 4], ['−1', cx - 14, cy + R + 4], ['O', cx - 8, cy + 14]].forEach(([s, x, y]) => gT.appendChild(el('text', { x, y, 'text-anchor': 'middle' }, s)));
    svg.appendChild(gT);
    svg.appendChild(el('circle', { cx, cy, r: R, fill: 'none', stroke: 'var(--g-asse)', 'stroke-width': 2 }));
    const px = cx + R * Math.cos(t), py = cy - R * Math.sin(t);
    const mostra = spec.mostra || ['sin', 'cos', 'tan'];
    /* arco dell'angolo */
    const ar = 34; const grande = Math.abs(t) > Math.PI ? 1 : 0; const verso = t >= 0 ? 0 : 1;
    svg.appendChild(el('path', { d: 'M' + (cx + ar) + ',' + cy + ' A' + ar + ',' + ar + ' 0 ' + grande + ',' + verso + ' ' + (cx + ar * Math.cos(t)) + ',' + (cy - ar * Math.sin(t)), fill: 'none', stroke: 'var(--s4)', 'stroke-width': 2 }));
    svg.appendChild(el('text', { x: cx + 48 * Math.cos(t / 2), y: cy - 48 * Math.sin(t / 2) + 4, class: 'cg-etichetta', fill: 'var(--s4)', 'text-anchor': 'middle' }, 'α'));
    if (mostra.includes('cos')) { svg.appendChild(el('line', { x1: cx, y1: cy, x2: px, y2: cy, stroke: 'var(--s2)', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: .9 })); svg.appendChild(el('line', { x1: px, y1: cy, x2: px, y2: py, class: 'cg-griglia', 'stroke-dasharray': '4 3' })); }
    if (mostra.includes('sin')) { svg.appendChild(el('line', { x1: px, y1: cy, x2: px, y2: py, stroke: 'var(--s1)', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: .9 })); }
    if (mostra.includes('tan') && Math.abs(Math.cos(t)) > 1e-6) {
      const tanv = Math.tan(t); const ty = cy - R * tanv;
      const tyc = Math.max(cy - R - 25, Math.min(cy + R + 25, ty));
      svg.appendChild(el('line', { x1: cx + R, y1: cy - R - 25, x2: cx + R, y2: cy + R + 25, class: 'cg-griglia' }));
      svg.appendChild(el('line', { x1: cx + R, y1: cy, x2: cx + R, y2: tyc, stroke: 'var(--s3)', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: .9 }));
      const L = 420; svg.appendChild(el('line', { x1: cx - L * Math.cos(t) * 0.35, y1: cy + L * Math.sin(t) * 0.35, x2: cx + L * Math.cos(t), y2: cy - L * Math.sin(t), class: 'cg-griglia', 'stroke-dasharray': '4 3' }));
    }
    svg.appendChild(el('line', { x1: cx, y1: cy, x2: px, y2: py, stroke: 'var(--g-testo)', 'stroke-width': 2 }));
    svg.appendChild(el('circle', { cx: px, cy: py, r: 6, fill: 'var(--s4)', stroke: 'var(--g-sfondo)', 'stroke-width': 2 }));
    svg.appendChild(el('text', { x: px + 10 * Math.cos(t) + 4, y: py - 10 * Math.sin(t) - 6, class: 'cg-etichetta' }, 'P'));
    /* pannello valori */
    const gV = el('g', { transform: 'translate(400,60)', class: 'cg-valori' });
    const righe = [['α', gradi + '°  (' + fmt(t, 3) + ' rad)', 'var(--s4)']];
    if (mostra.includes('sin')) righe.push(['sin α', fmt(Math.sin(t), 3), 'var(--s1)']);
    if (mostra.includes('cos')) righe.push(['cos α', fmt(Math.cos(t), 3), 'var(--s2)']);
    if (mostra.includes('tan')) righe.push(['tan α', Math.abs(Math.cos(t)) < 1e-6 ? 'non esiste' : fmt(Math.tan(t), 3), 'var(--s3)']);
    righe.forEach((r, i) => { gV.appendChild(el('rect', { x: 0, y: i * 34, width: 12, height: 12, rx: 3, fill: r[2] })); gV.appendChild(el('text', { x: 20, y: i * 34 + 11, class: 'cg-etichetta' }, r[0] + ' = ' + r[1])); });
    svg.appendChild(gV);
    return svg;
  }

  /* ============================================================
     7. RENDER GENERALE con cursori dei parametri
     ============================================================ */
  const RENDER = { piano: renderPiano, funzione: renderPiano, 'retta-reale': renderRettaReale, barre: renderBarre, 'circonferenza-goniometrica': renderCirconferenza };

  function render(spec, contenitore) {
    const wrap = document.createElement('figure'); wrap.className = 'cg-figura';
    if (spec.tipo === 'animazione') {
      wrap.classList.add('cg-anim');
      if (window.CANIM) window.CANIM.render(spec, wrap); else wrap.textContent = 'Animazioni non disponibili';
    } else if (spec.tipo === 'svg') {
      const div = document.createElement('div'); div.className = 'cg-svg-grezzo'; div.innerHTML = spec.codice; wrap.appendChild(div);
    } else {
      const fn = RENDER[spec.tipo];
      if (!fn) { wrap.textContent = 'Tipo di grafico sconosciuto: ' + spec.tipo; return wrap; }
      const vars = {};
      let parametri = (spec.parametri || []).slice();
      if ((spec.tipo === 'circonferenza-goniometrica') && !parametri.length && spec.interattiva !== false) parametri = [{ nome: 'angolo', min: 0, max: 360, passo: 1, valore: spec.angolo != null ? spec.angolo : 60, etichetta: 'α (gradi)' }];
      parametri.forEach(p => { vars[p.nome] = p.valore != null ? num(p.valore) : num(p.min || 0); });
      /* marker frecce condivisi */
      const defs = el('defs');
      for (let i = 0; i < 4; i++) defs.appendChild(el('marker', { id: 'freccia-' + i, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, el('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'var(--s' + (i + 1) + ')' })));
      const svg = el('svg'); wrap.appendChild(svg);
      const cursori = {};
      const aggiorna = () => { fn(spec, vars, svg, aggiorna); svg.insertBefore(defs, svg.firstChild); for (const n in cursori) { cursori[n].inp.value = vars[n]; cursori[n].val.textContent = fmt(vars[n]); } };
      aggiorna();
      const visibili = parametri.filter(p => !p.nascosto);
      if (visibili.length) {
        const pan = document.createElement('div'); pan.className = 'cg-parametri';
        visibili.forEach(p => {
          const riga = document.createElement('label'); riga.className = 'cg-parametro';
          const nome = document.createElement('span'); nome.className = 'cg-parametro-nome'; nome.textContent = p.etichetta || p.nome;
          const val = document.createElement('span'); val.className = 'cg-parametro-valore'; val.textContent = fmt(vars[p.nome]);
          const inp = document.createElement('input'); inp.type = 'range'; inp.min = num(p.min); inp.max = num(p.max); inp.step = p.passo || 0.1; inp.value = vars[p.nome];
          inp.addEventListener('input', () => { vars[p.nome] = parseFloat(inp.value); aggiorna(); });
          cursori[p.nome] = { inp, val };
          riga.appendChild(nome); riga.appendChild(inp); riga.appendChild(val); pan.appendChild(riga);
        });
        wrap.appendChild(pan);
      }
    }
    if (spec.didascalia) { const c = document.createElement('figcaption'); c.textContent = spec.didascalia; wrap.appendChild(c); }
    if (contenitore) contenitore.appendChild(wrap);
    return wrap;
  }

  /* verifica statica di una specifica (usata dal validatore e dall'app) */
  function verifica(spec) {
    const errori = [];
    if (!spec || typeof spec !== 'object') return ['specifica mancante'];
    if (spec.tipo === 'animazione') {
      const CA = (typeof window !== 'undefined' && window.CANIM) || null;
      if (CA && !CA.ANIM[spec.nome]) errori.push('animazione sconosciuta: ' + spec.nome + ' (disponibili: ' + CA.nomi().join(', ') + ')');
      return errori;
    }
    if (!RENDER[spec.tipo] && spec.tipo !== 'svg') errori.push('tipo sconosciuto: ' + spec.tipo);
    const nomiParamDich = new Set((spec.parametri || []).map(p => p.nome));
    (spec.elementi || []).forEach((e, i) => { if (e.tipo === 'punto' && e.trascina) [0, 1].forEach(k => { const v = e.p && e.p[k]; if (typeof v === 'string' && /^[A-Za-z_]\w*$/.test(v.trim()) && !nomiParamDich.has(v.trim())) errori.push('elementi[' + i + '](punto trascinabile): il parametro "' + v + '" va dichiarato in parametri (con valore iniziale, min e max)'); }); });
    const nomiParam = new Set((spec.parametri || []).map(p => p.nome));
    const consentite = new Set(['x', ...nomiParam]);
    if (spec.tipo === 'circonferenza-goniometrica') consentite.add('angolo');
    const controlla = (src, dove, conX) => {
      if (src == null || typeof src === 'number') return;
      if (src === 'inf' || src === '-inf' || src === '+inf') return;
      try { const f = compila(src); f.variabili.forEach(v => { if (!consentite.has(v) || (!conX && v === 'x')) errori.push(dove + ': variabile non definita "' + v + '" in "' + src + '"'); }); }
      catch (e) { errori.push(dove + ': ' + e.message); }
    };
    (spec.funzioni || []).forEach((f, i) => { if (!f.f) errori.push('funzioni[' + i + '] senza f'); else controlla(f.f, 'funzioni[' + i + ']', true); if (f.dominio) f.dominio.forEach(d => controlla(d, 'funzioni[' + i + '].dominio', false)); });
    (spec.elementi || []).forEach((e, i) => {
      const dove = 'elementi[' + i + '](' + e.tipo + ')';
      const tipi = ['area', 'tangente', 'retta', 'verticale', 'orizzontale', 'segmento', 'vettore', 'poligono', 'cerchio', 'ellisse', 'angolo', 'testo', 'punto'];
      if (!tipi.includes(e.tipo)) errori.push(dove + ': tipo elemento sconosciuto');
      const pt = (p, n) => { if (!Array.isArray(p) || p.length !== 2) errori.push(dove + ': ' + n + ' deve essere [x,y]'); else p.forEach(c => controlla(c, dove + '.' + n, false)); };
      if (e.f) controlla(e.f, dove + '.f', true); if (e.g) controlla(e.g, dove + '.g', true);
      if (e.tipo === 'area') { controlla(e.da, dove + '.da', false); controlla(e.a, dove + '.a', false); if (e.da == null || e.a == null) errori.push(dove + ': servono da e a'); }
      if (e.tipo === 'tangente') controlla(e.x0, dove + '.x0', false);
      if (e.tipo === 'retta') { if (e.per) e.per.forEach((p, k) => pt(p, 'per[' + k + ']')); else { controlla(e.m, dove + '.m', false); controlla(e.q, dove + '.q', false); if (e.m == null || e.q == null) errori.push(dove + ': serve m e q, oppure per'); } }
      if (e.tipo === 'verticale') controlla(e.x, dove + '.x', false);
      if (e.tipo === 'orizzontale') controlla(e.y, dove + '.y', false);
      if (e.tipo === 'segmento' || e.tipo === 'vettore') { pt(e.da, 'da'); pt(e.a, 'a'); }
      if (e.tipo === 'poligono') { if (!Array.isArray(e.punti) || e.punti.length < 3) errori.push(dove + ': servono almeno 3 punti'); else e.punti.forEach((p, k) => pt(p, 'punti[' + k + ']')); }
      if (e.tipo === 'cerchio') { pt(e.centro, 'centro'); controlla(e.raggio, dove + '.raggio', false); }
      if (e.tipo === 'ellisse') { pt(e.centro, 'centro'); controlla(e.a, dove + '.a', false); controlla(e.b, dove + '.b', false); }
      if (e.tipo === 'angolo') { pt(e.vertice, 'vertice'); pt(e.da, 'da'); pt(e.a, 'a'); }
      if (e.tipo === 'testo' || e.tipo === 'punto') pt(e.p, 'p');
    });
    (spec.punti || []).forEach((p, i) => { controlla(p.x, 'punti[' + i + '].x', false); controlla(p.y, 'punti[' + i + '].y', false); });
    (spec.intervalli || []).forEach((iv, i) => { controlla(iv.da, 'intervalli[' + i + '].da', false); controlla(iv.a, 'intervalli[' + i + '].a', false); });
    if (spec.tipo === 'barre') { if (!Array.isArray(spec.categorie)) errori.push('barre: manca categorie'); const s = spec.serie || [{ valori: spec.valori }]; s.forEach((sr, i) => { if (!Array.isArray(sr.valori) || sr.valori.length !== (spec.categorie || []).length) errori.push('barre: serie[' + i + '] deve avere tanti valori quante categorie'); }); }
    if ((spec.tipo === 'piano' || spec.tipo === 'funzione') && (!spec.x || !spec.y)) errori.push('piano: servono x:[min,max] e y:[min,max]');
    (spec.parametri || []).forEach(p => { if (!p.nome || p.min == null || p.max == null) errori.push('parametro incompleto: ' + JSON.stringify(p)); });
    return errori;
  }

  const api = { compila, analizza, num, render, verifica, fmt };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.CGRAF = api;
})();
