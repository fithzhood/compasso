/* Compasso — animazioni didattiche (motion graphics in SVG, guidate da un tempo t ∈ [0,1]).
   Ogni animazione: { W, H, durata (ms), fasi: [[t0, 'didascalia'], ...], disegna(svg, t) }.
   Espone window.CANIM = { render, nomi, ANIM }. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  function el(n, a, f) { const e = document.createElementNS(NS, n); if (a) for (const k in a) if (a[k] != null) e.setAttribute(k, a[k]); if (f) (Array.isArray(f) ? f : [f]).forEach(x => { if (x != null) e.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); }); return e; }
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ease = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  const f = (t, a, b) => ease((t - a) / (b - a));           /* avanzamento di una fase */
  const S = ['var(--s1)', '--s2', '--s3', '--s4'].map((c, i) => 'var(--s' + (i + 1) + ')');
  const T = 'var(--g-testo)', SF = 'var(--g-sfondo)', AS = 'var(--g-asse)', GR = 'var(--g-griglia)';
  const P = (svg, pts, attr) => svg.appendChild(el('polygon', Object.assign({ points: pts.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ') }, attr)));
  const L = (svg, x1, y1, x2, y2, attr) => svg.appendChild(el('line', Object.assign({ x1, y1, x2, y2, stroke: AS, 'stroke-width': 1.5 }, attr)));
  const C = (svg, cx, cy, r, attr) => svg.appendChild(el('circle', Object.assign({ cx, cy, r }, attr)));
  const R = (svg, x, y, w, h, attr) => svg.appendChild(el('rect', Object.assign({ x, y, width: w, height: h }, attr)));
  const X = (svg, x, y, s, attr) => svg.appendChild(el('text', Object.assign({ x, y, class: 'cg-etichetta', 'text-anchor': 'middle' }, attr), s));
  const fmt = (n, d) => String(Number(n.toFixed(d == null ? 2 : d))).replace('.', ',');
  const rad = g => g * Math.PI / 180;
  /* settore circolare in coordinate schermo, angoli in radianti con verso matematico (antiorario) */
  function settore(svg, cx, cy, r, a1, a2, attr) {
    const N = 20, pts = ['M' + cx + ',' + cy];
    for (let i = 0; i <= N; i++) { const a = a1 + (a2 - a1) * i / N; pts.push('L' + (cx + r * Math.cos(a)).toFixed(2) + ',' + (cy - r * Math.sin(a)).toFixed(2)); }
    return svg.appendChild(el('path', Object.assign({ d: pts.join(' ') + 'Z' }, attr)));
  }
  function arco(svg, cx, cy, r, a1, a2, attr) {
    const N = 24, pts = [];
    for (let i = 0; i <= N; i++) { const a = a1 + (a2 - a1) * i / N; pts.push((i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(2) + ',' + (cy - r * Math.sin(a)).toFixed(2)); }
    return svg.appendChild(el('path', Object.assign({ d: pts.join(' '), fill: 'none' }, attr)));
  }
  const ang = (p, q) => Math.atan2(-(q[1] - p[1]), q[0] - p[0]);
  const op = (t, a, b) => f(t, a, b);   /* opacità che sale nella fase [a,b] */

  const ANIM = {};

  /* ---------------- PITAGORA: dimostrazione per riordinamento ---------------- */
  ANIM.pitagora = {
    W: 600, H: 380, durata: 9000,
    fasi: [[0, 'Un quadrato di lato a + b contiene quattro triangoli rettangoli uguali (cateti a e b) e, in mezzo, un quadrato di lato c.'], [0.32, 'Spostiamo i triangoli con semplici traslazioni: l\'area libera non cambia.'], [0.72, 'Ora la parte libera è fatta da due quadrati, a² e b². Quindi c² = a² + b².']],
    disegna(svg, t) {
      const k = 40, ox = 150, oy = 350, a = 3, b = 4, n = a + b;
      const M = p => [ox + k * p[0], oy - k * p[1]];
      R(svg, ox, oy - k * n, k * n, k * n, { fill: 'none', stroke: AS, 'stroke-width': 2 });
      const tri = [[[0, 0], [a, 0], [0, b]], [[n, 0], [n, a], [a, 0]], [[n, n], [b, n], [n, a]], [[0, n], [0, b], [b, n]]];
      const sposta = [[b, 0], [-a, b], [0, -a], [0, 0]];
      const u = f(t, 0.32, 0.72);
      const o1 = 1 - f(t, 0.2, 0.4), o2 = f(t, 0.72, 0.9);
      if (o1 > 0) { P(svg, [[a, 0], [n, a], [b, n], [0, b]].map(M), { fill: S[0], 'fill-opacity': .25 * o1, stroke: 'none' }); X(svg, ...M([3.5, 3.5]), 'c²', { 'font-size': 22, opacity: o1 }); }
      if (o2 > 0) { R(svg, ...M([0, b]), k * b, k * b, { fill: S[2], 'fill-opacity': .3 * o2 }); R(svg, ...M([b, n]), k * a, k * a, { fill: S[3], 'fill-opacity': .3 * o2 }); X(svg, ...M([2, 2]), 'b²', { 'font-size': 22, opacity: o2 }); X(svg, ...M([5.5, 5.5]), 'a²', { 'font-size': 22, opacity: o2 }); }
      tri.forEach((tr, i) => { const d = sposta[i]; P(svg, tr.map(p => M([p[0] + d[0] * u, p[1] + d[1] * u])), { fill: S[1], 'fill-opacity': .55, stroke: SF, 'stroke-width': 2, 'stroke-linejoin': 'round' }); });
      /* etichette dei lati */
      X(svg, ...M([a / 2, -0.35]), 'a', { opacity: o1, 'font-style': 'italic' }); X(svg, ...M([a + b / 2, -0.35]), 'b', { opacity: o1, 'font-style': 'italic' });
      X(svg, ...M([(a + n) / 2 + 0.35, a / 2]), 'c', { opacity: o1, 'font-style': 'italic', fill: S[0] });
      X(svg, 470, 60, 'c² = a² + b²', { 'font-size': 24, opacity: o2 });
      X(svg, 470, 90, '(3² + 4² = 5²)', { opacity: o2, fill: 'var(--testo2)' });
    }
  };

  /* ---------------- SOMMA DEGLI ANGOLI DI UN TRIANGOLO ---------------- */
  ANIM['somma-angoli'] = {
    W: 600, H: 350, durata: 7000,
    fasi: [[0, 'I tre angoli di un triangolo: α, β e γ.'], [0.25, 'Stacchiamoli e portiamoli uno accanto all\'altro, sullo stesso vertice.'], [0.78, 'Formano un angolo piatto: α + β + γ = 180°.']],
    disegna(svg, t) {
      const A = [150, 240], B = [450, 240], C = [270, 60], Pt = [300, 320], r = 44;
      P(svg, [A, B, C], { fill: 'none', stroke: AS, 'stroke-width': 2 });
      const al = ang(A, C), be = Math.PI - ang(B, C), c1 = ang(C, A), c2 = ang(C, B);
      const ga = c2 - c1;
      const u = f(t, 0.25, 0.78);
      const set = [[A, 0, al, 0], [B, Math.PI - be, Math.PI, al + be - Math.PI], [C, c1, c2, al + be - c1]];
      const nomi = ['α', 'β', 'γ'];
      set.forEach(([V, s1, s2, rot], i) => {
        const cx = lerp(V[0], Pt[0], u), cy = lerp(V[1], Pt[1], u), rr = rot * u;
        settore(svg, cx, cy, r, s1 + rr, s2 + rr, { fill: S[i], 'fill-opacity': .55, stroke: S[i], 'stroke-width': 1.5 });
        const am = (s1 + s2) / 2 + rr;
        X(svg, cx + (r + 14) * Math.cos(am), cy - (r + 14) * Math.sin(am) + 5, nomi[i], { fill: S[i] });
      });
      const o = f(t, 0.78, 0.95);
      L(svg, 120, Pt[1], 480, Pt[1], { opacity: o, 'stroke-width': 2 });
      X(svg, 300, 345, 'α + β + γ = 180°', { 'font-size': 20, opacity: o });
      X(svg, A[0] - 14, A[1] + 6, 'A'); X(svg, B[0] + 14, B[1] + 6, 'B'); X(svg, C[0], C[1] - 10, 'C');
    }
  };

  /* ---------------- AREA DEL CERCHIO: gli spicchi diventano un rettangolo ---------------- */
  ANIM['area-cerchio'] = {
    W: 600, H: 340, durata: 8000,
    fasi: [[0, 'Dividiamo il cerchio in tanti spicchi uguali.'], [0.2, 'Li disponiamo alternati, una punta in su e una in giù.'], [0.7, 'Con molti spicchi la figura è quasi un rettangolo: base πr (metà circonferenza) e altezza r. Area = πr · r = πr².']],
    disegna(svg, t) {
      const n = 14, r = 88, O = [130, 175], w = 2 * r * Math.sin(Math.PI / n), x0 = 262, yb = 250;
      const u = f(t, 0.2, 0.7);
      for (let i = 0; i < n; i++) {
        const bis0 = (i + 0.5) * 2 * Math.PI / n;
        const pari = i % 2 === 0, j = Math.floor(i / 2);
        const apice = pari ? [x0 + j * w + w / 2, yb] : [x0 + (j + 1) * w, yb - r];
        const bis1 = pari ? Math.PI / 2 : -Math.PI / 2;
        let d = bis1 - bis0; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
        const cx = lerp(O[0], apice[0], u), cy = lerp(O[1], apice[1], u), bis = bis0 + d * u;
        settore(svg, cx, cy, r, bis - Math.PI / n, bis + Math.PI / n, { fill: S[pari ? 0 : 2], 'fill-opacity': .5, stroke: SF, 'stroke-width': 1.5 });
      }
      const o = f(t, 0.7, 0.9);
      const larg = (n / 2) * w + w / 2;
      L(svg, x0, yb + 16, x0 + larg, yb + 16, { opacity: o, stroke: S[1], 'stroke-width': 2 }); X(svg, x0 + larg / 2, yb + 34, 'base ≈ πr', { opacity: o, fill: S[1] });
      L(svg, x0 - 14, yb, x0 - 14, yb - r, { opacity: o, stroke: S[3], 'stroke-width': 2 }); X(svg, x0 - 30, yb - r / 2 + 5, 'r', { opacity: o, fill: S[3], 'font-style': 'italic' });
      X(svg, 430, 60, 'Area = πr · r = πr²', { 'font-size': 20, opacity: o });
      L(svg, O[0], O[1], O[0] + r, O[1], { opacity: 1 - u, stroke: S[3], 'stroke-width': 2 }); X(svg, O[0] + r / 2, O[1] - 8, 'r', { opacity: 1 - u, 'font-style': 'italic', fill: S[3] });
    }
  };

  /* ---------------- CIRCONFERENZA → SINUSOIDE ---------------- */
  ANIM['circonferenza-sinusoide'] = {
    W: 600, H: 300, durata: 8000,
    fasi: [[0, 'Il punto P gira sulla circonferenza goniometrica: la sua altezza è sin α.'], [0.5, 'Riportando l\'altezza in funzione dell\'angolo si disegna la sinusoide: dopo un giro completo (2π) ricomincia uguale.']],
    disegna(svg, t) {
      const O = [110, 150], r = 90, gx = 250, gw = 320, th = 2 * Math.PI * t;
      L(svg, 10, O[1], 210, O[1]); L(svg, O[0], 40, O[0], 260);
      C(svg, O[0], O[1], r, { fill: 'none', stroke: AS, 'stroke-width': 2 });
      L(svg, gx, O[1], gx + gw + 10, O[1]); L(svg, gx, 40, gx, 260);
      [['π', 0.5], ['2π', 1]].forEach(([s, q]) => { L(svg, gx + gw * q, O[1] - 4, gx + gw * q, O[1] + 4); X(svg, gx + gw * q, O[1] + 18, s, { class: 'cg-tacche' }); });
      X(svg, gx - 12, O[1] - r + 4, '1', { class: 'cg-tacche' }); X(svg, gx - 14, O[1] + r + 4, '−1', { class: 'cg-tacche' });
      const px = O[0] + r * Math.cos(th), py = O[1] - r * Math.sin(th);
      settore(svg, O[0], O[1], 26, 0, th, { fill: S[3], 'fill-opacity': .3 });
      L(svg, O[0], O[1], px, py, { stroke: T, 'stroke-width': 2 });
      L(svg, px, O[1], px, py, { stroke: S[0], 'stroke-width': 4, 'stroke-linecap': 'round' });
      const N = Math.max(2, Math.round(200 * t)), pts = [];
      for (let i = 0; i <= N; i++) { const a = th * i / N; pts.push((i ? 'L' : 'M') + (gx + gw * a / (2 * Math.PI)).toFixed(1) + ',' + (O[1] - r * Math.sin(a)).toFixed(1)); }
      svg.appendChild(el('path', { d: pts.join(''), fill: 'none', stroke: S[0], 'stroke-width': 2.5 }));
      const qx = gx + gw * t;
      L(svg, px, py, qx, py, { stroke: GR, 'stroke-dasharray': '4 3' });
      C(svg, qx, py, 5, { fill: S[0] }); C(svg, px, py, 5, { fill: S[3] });
      X(svg, px + 12, py - 8, 'P'); X(svg, O[0] + 40, O[1] - 14, 'α', { fill: S[3] });
      X(svg, 480, 60, 'y = sin α', { fill: S[0], 'font-size': 16 });
      X(svg, 110, 285, 'α = ' + Math.round(th * 180 / Math.PI) + '°', { fill: 'var(--testo2)' });
    }
  };

  /* ---------------- SECANTE → TANGENTE (derivata) ---------------- */
  ANIM['secante-tangente'] = {
    W: 600, H: 340, durata: 7000,
    fasi: [[0, 'La retta per P e Q è una secante: la sua pendenza è il rapporto incrementale Δy/Δx.'], [0.4, 'Avviciniamo Q a P: h diventa sempre più piccolo e la secante ruota.'], [0.85, 'Al limite la secante diventa la tangente in P: la sua pendenza è la derivata f\'(x₀).']],
    disegna(svg, t) {
      const fx = x => x * x / 4, X0 = 2;
      const sx = x => 60 + (x + 1) * 70, sy = y => 300 - y * 55;
      L(svg, 40, sy(0), 580, sy(0)); L(svg, sx(0), 20, sx(0), 320);
      const pts = []; for (let i = 0; i <= 100; i++) { const x = -1 + 7 * i / 100; pts.push((i ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(fx(x)).toFixed(1)); }
      svg.appendChild(el('path', { d: pts.join(''), fill: 'none', stroke: S[0], 'stroke-width': 2.5 }));
      const h = 3 * (1 - f(t, 0, 0.85)) + 0.001, x1 = X0 + h;
      const m = (fx(x1) - fx(X0)) / h;
      const xa = -1, xb = 6.4; L(svg, sx(xa), sy(fx(X0) + m * (xa - X0)), sx(xb), sy(fx(X0) + m * (xb - X0)), { stroke: S[1], 'stroke-width': 2 });
      L(svg, sx(X0), sy(fx(X0)), sx(x1), sy(fx(X0)), { stroke: GR, 'stroke-dasharray': '4 3' }); L(svg, sx(x1), sy(fx(X0)), sx(x1), sy(fx(x1)), { stroke: GR, 'stroke-dasharray': '4 3' });
      C(svg, sx(X0), sy(fx(X0)), 5, { fill: S[3] }); C(svg, sx(x1), sy(fx(x1)), 5, { fill: S[1] });
      X(svg, sx(X0) - 12, sy(fx(X0)) + 16, 'P'); if (h > 0.15) X(svg, sx(x1) + 12, sy(fx(x1)) - 8, 'Q', { fill: S[1] });
      X(svg, 440, 50, 'h = ' + fmt(h, 2), { 'font-size': 15 });
      X(svg, 440, 74, 'pendenza = ' + fmt(m, 3), { 'font-size': 15, fill: S[1] });
      X(svg, 440, 98, 'f\'(2) = 1', { 'font-size': 15, opacity: f(t, 0.85, 1), fill: S[3] });
      X(svg, 560, sy(0) + 16, 'x', { class: 'cg-nome-asse' }); X(svg, sx(X0), sy(0) + 16, '2', { class: 'cg-tacche' });
    }
  };

  /* ---------------- SOMME DI RIEMANN ---------------- */
  ANIM.riemann = {
    W: 600, H: 320, durata: 8000,
    fasi: [[0, 'Approssimiamo l\'area sotto la curva con rettangoli.'], [0.3, 'Aumentando il numero di rettangoli l\'errore diminuisce…'], [0.85, '…e la somma delle aree tende all\'integrale definito: qui 28/3 ≈ 9,33.']],
    disegna(svg, t) {
      const fx = x => 1 + x * x / 4, a = 0, b = 4;
      const sx = x => 60 + x * 110, sy = y => 290 - y * 48;
      const n = [2, 4, 8, 16, 32, 64][Math.min(5, Math.floor(t * 6))];
      let somma = 0;
      for (let i = 0; i < n; i++) { const x = a + (b - a) * i / n, hgt = fx(x); somma += hgt * (b - a) / n; R(svg, sx(x), sy(hgt), sx(x + (b - a) / n) - sx(x), sy(0) - sy(hgt), { fill: S[0], 'fill-opacity': .35, stroke: S[0], 'stroke-width': 1 }); }
      const pts = []; for (let i = 0; i <= 100; i++) { const x = -0.2 + 4.6 * i / 100; pts.push((i ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(fx(x)).toFixed(1)); }
      svg.appendChild(el('path', { d: pts.join(''), fill: 'none', stroke: S[1], 'stroke-width': 2.5 }));
      L(svg, 40, sy(0), 580, sy(0)); L(svg, sx(0), 20, sx(0), 300);
      X(svg, sx(4), sy(0) + 16, '4', { class: 'cg-tacche' }); X(svg, sx(0) - 10, sy(0) + 16, '0', { class: 'cg-tacche' });
      X(svg, 470, 60, 'n = ' + n, { 'font-size': 16 }); X(svg, 470, 84, 'somma ≈ ' + fmt(somma, 3), { 'font-size': 16, fill: S[0] }); X(svg, 470, 108, 'area esatta = 9,333…', { 'font-size': 15, fill: S[1] });
    }
  };

  /* ---------------- QUADRATO DI BINOMIO ---------------- */
  ANIM['quadrato-binomio'] = {
    W: 600, H: 340, durata: 7000,
    fasi: [[0, 'Un quadrato di lato a ha area a².'], [0.25, 'Allunghiamo il lato di b: compaiono due rettangoli a·b…'], [0.7, '…e un quadratino b² nell\'angolo. In tutto: (a + b)² = a² + 2ab + b².']],
    disegna(svg, t) {
      const k = 45, a = 4, b = 2, ox = 80, oy = 310;
      const M = (x, y) => [ox + k * x, oy - k * y];
      const u1 = f(t, 0.25, 0.5), u2 = f(t, 0.45, 0.7), u3 = f(t, 0.7, 0.9);
      R(svg, ...M(0, a), k * a, k * a, { fill: S[0], 'fill-opacity': .35, stroke: S[0], 'stroke-width': 2 }); X(svg, ...M(a / 2, a / 2), 'a²', { 'font-size': 20 });
      if (u1 > 0) { R(svg, ...M(a, a), k * b * u1, k * a, { fill: S[1], 'fill-opacity': .35, stroke: S[1], 'stroke-width': 2 }); X(svg, ...M(a + b / 2, a / 2), 'ab', { 'font-size': 18, opacity: u1 }); }
      if (u2 > 0) { R(svg, ...M(0, a + b * u2), k * a, k * b * u2, { fill: S[1], 'fill-opacity': .35, stroke: S[1], 'stroke-width': 2 }); X(svg, ...M(a / 2, a + b / 2), 'ab', { 'font-size': 18, opacity: u2 }); }
      if (u3 > 0) { R(svg, ...M(a, a + b * u3), k * b * u3, k * b * u3, { fill: S[2], 'fill-opacity': .4, stroke: S[2], 'stroke-width': 2 }); X(svg, ...M(a + b / 2, a + b / 2), 'b²', { 'font-size': 18, opacity: u3 }); }
      X(svg, ...M(a / 2, -0.4), 'a', { 'font-style': 'italic' }); X(svg, ...M(a + b / 2, -0.4), 'b', { 'font-style': 'italic', opacity: u1 });
      X(svg, ...M(-0.4, a / 2), 'a', { 'font-style': 'italic' }); X(svg, ...M(-0.4, a + b / 2), 'b', { 'font-style': 'italic', opacity: u2 });
      X(svg, 450, 80, '(a + b)²', { 'font-size': 20 });
      X(svg, 450, 110, '= a²' + (u1 > 0 ? ' + ab' : '') + (u2 > 0 ? ' + ab' : '') + (u3 > 0 ? ' + b²' : ''), { 'font-size': 18 });
      X(svg, 450, 140, '= a² + 2ab + b²', { 'font-size': 18, opacity: u3, fill: S[3] });
    }
  };

  /* ---------------- SOMMA DEI DISPARI = QUADRATO ---------------- */
  ANIM['somma-dispari'] = {
    W: 600, H: 320, durata: 7000,
    fasi: [[0, 'Partiamo da un quadratino: 1.'], [0.15, 'Ogni "L" aggiunge il dispari successivo (3, 5, 7…) e il quadrato resta un quadrato.'], [0.9, 'Quindi 1 + 3 + 5 + … + (2n − 1) = n².']],
    disegna(svg, t) {
      const n = 7, c = 32, ox = 60, oy = 290;
      const k = Math.min(n, Math.floor(t * n * 1.02) + 1);
      for (let g = 1; g <= k; g++) {
        const col = S[(g - 1) % 4];
        for (let i = 0; i < g; i++) { R(svg, ox + (g - 1) * c, oy - i * c - c, c - 2, c - 2, { fill: col, 'fill-opacity': .6 }); if (i < g - 1) R(svg, ox + i * c, oy - (g - 1) * c - c, c - 2, c - 2, { fill: col, 'fill-opacity': .6 }); }
      }
      const termini = []; for (let g = 1; g <= k; g++) termini.push(2 * g - 1);
      X(svg, 420, 90, termini.join(' + '), { 'font-size': 17 });
      X(svg, 420, 125, '= ' + (k * k) + ' = ' + k + '²', { 'font-size': 22, fill: S[3] });
      X(svg, 420, 170, '1 + 3 + 5 + … + (2n − 1) = n²', { 'font-size': 15, opacity: f(t, 0.9, 1), fill: 'var(--testo2)' });
    }
  };

  /* ---------------- GAUSS: 1 + 2 + … + n ---------------- */
  ANIM.gauss = {
    W: 600, H: 320, durata: 7000,
    fasi: [[0, 'La somma 1 + 2 + … + 8 è una scala di quadratini.'], [0.3, 'Una seconda scala uguale, capovolta, si incastra sulla prima…'], [0.75, '…e insieme formano un rettangolo 8 × 9. Quindi la somma vale 8 · 9 / 2 = 36.']],
    disegna(svg, t) {
      const n = 8, c = 26, ox = 60, oy = 280;
      const u = f(t, 0.3, 0.75), dx = 240 * (1 - u);
      for (let r = 0; r < n; r++) { for (let i = 0; i < r + 1; i++) R(svg, ox + i * c, oy - (n - r) * c, c - 2, c - 2, { fill: S[0], 'fill-opacity': .6 }); }
      for (let r = 0; r < n; r++) { for (let i = 0; i < n - r; i++) R(svg, ox + (r + 1 + i) * c + dx, oy - (n - r) * c, c - 2, c - 2, { fill: S[1], 'fill-opacity': .6 }); }
      const o = f(t, 0.75, 0.92);
      R(svg, ox - 3, oy - n * c - 3, (n + 1) * c + 4, n * c + 4, { fill: 'none', stroke: S[3], 'stroke-width': 2, opacity: o });
      X(svg, ox + (n + 1) * c / 2, oy + 20, '9', { opacity: o, fill: S[3] }); X(svg, ox - 16, oy - n * c / 2 + 5, '8', { opacity: o, fill: S[3] });
      X(svg, 440, 70, '1 + 2 + … + 8', { 'font-size': 18 });
      X(svg, 440, 100, '= 8 · 9 / 2 = 36', { 'font-size': 20, opacity: o, fill: S[3] });
      X(svg, 440, 140, 'in generale: n(n + 1) / 2', { 'font-size': 15, opacity: o, fill: 'var(--testo2)' });
    }
  };

  /* ---------------- PARABOLA COME LUOGO ---------------- */
  ANIM['parabola-luogo'] = {
    W: 600, H: 340, durata: 8000,
    fasi: [[0, 'Un fuoco F e una retta d (direttrice). Il punto P si muove restando alla stessa distanza da F e da d.'], [0.5, 'La traccia di P è una parabola: ogni suo punto ha PF = distanza da d.']],
    disegna(svg, t) {
      const F = [300, 200], V = [300, 260], yd = 320, p = 60;
      const x = -260 + 520 * t, yP = 260 - x * x / (4 * p);
      L(svg, 20, yd, 580, yd, { stroke: S[1], 'stroke-width': 2 }); X(svg, 560, yd - 8, 'd', { fill: S[1], 'font-style': 'italic' });
      L(svg, 300, 20, 300, 330, { stroke: GR, 'stroke-dasharray': '4 3' });
      const pts = []; for (let i = 0; i <= 80; i++) { const xx = -260 + (x + 260) * i / 80; pts.push((i ? 'L' : 'M') + (300 + xx).toFixed(1) + ',' + (260 - xx * xx / (4 * p)).toFixed(1)); }
      svg.appendChild(el('path', { d: pts.join(''), fill: 'none', stroke: S[0], 'stroke-width': 2.5 }));
      const Px = 300 + x;
      L(svg, Px, yP, F[0], F[1], { stroke: S[3], 'stroke-width': 2 }); L(svg, Px, yP, Px, yd, { stroke: S[3], 'stroke-width': 2 });
      C(svg, F[0], F[1], 5, { fill: S[1] }); X(svg, F[0] + 14, F[1] + 4, 'F', { fill: S[1] });
      C(svg, Px, yP, 5, { fill: S[0] }); X(svg, Px + 14, yP - 8, 'P');
      C(svg, V[0], V[1], 3, { fill: AS }); X(svg, V[0] + 12, V[1] + 14, 'V', { class: 'cg-tacche' });
      const d = 60 + x * x / 240;
      X(svg, 110, 60, 'PF = ' + fmt(d / 60, 2), { 'font-size': 15, fill: S[3] }); X(svg, 110, 84, 'dist(P, d) = ' + fmt(d / 60, 2), { 'font-size': 15, fill: S[3] });
    }
  };

  /* ---------------- ELLISSE DEL GIARDINIERE ---------------- */
  ANIM['ellisse-giardiniere'] = {
    W: 600, H: 320, durata: 8000,
    fasi: [[0, 'Due chiodi (i fuochi) e uno spago di lunghezza fissa: la matita tiene lo spago teso.'], [0.5, 'La somma delle distanze dai fuochi è costante (2a): la curva è un\'ellisse.']],
    disegna(svg, t) {
      const O = [300, 160], a = 200, b = 120, c = Math.sqrt(a * a - b * b), th = 2 * Math.PI * t;
      const F1 = [O[0] - c, O[1]], F2 = [O[0] + c, O[1]];
      const Pt = [O[0] + a * Math.cos(th), O[1] - b * Math.sin(th)];
      const pts = []; for (let i = 0; i <= 100; i++) { const q = th * i / 100; pts.push((i ? 'L' : 'M') + (O[0] + a * Math.cos(q)).toFixed(1) + ',' + (O[1] - b * Math.sin(q)).toFixed(1)); }
      svg.appendChild(el('path', { d: pts.join(''), fill: 'none', stroke: S[0], 'stroke-width': 2.5 }));
      L(svg, F1[0], F1[1], Pt[0], Pt[1], { stroke: S[1], 'stroke-width': 2.5 }); L(svg, F2[0], F2[1], Pt[0], Pt[1], { stroke: S[1], 'stroke-width': 2.5 });
      C(svg, F1[0], F1[1], 5, { fill: T }); C(svg, F2[0], F2[1], 5, { fill: T }); C(svg, Pt[0], Pt[1], 6, { fill: S[0] });
      X(svg, F1[0], F1[1] + 20, 'F₁'); X(svg, F2[0], F2[1] + 20, 'F₂'); X(svg, Pt[0] + 14, Pt[1] - 8, 'P');
      const d1 = Math.hypot(Pt[0] - F1[0], Pt[1] - F1[1]) / 100, d2 = Math.hypot(Pt[0] - F2[0], Pt[1] - F2[1]) / 100;
      X(svg, 300, 300, 'PF₁ + PF₂ = ' + fmt(d1, 2) + ' + ' + fmt(d2, 2) + ' = ' + fmt(d1 + d2, 2) + ' = 2a', { 'font-size': 15, fill: S[1] });
    }
  };

  /* ---------------- ACHILLE E LA TARTARUGA ---------------- */
  ANIM['achille-tartaruga'] = {
    W: 600, H: 260, durata: 9000,
    fasi: [[0, 'Achille corre dieci volte più veloce, ma la tartaruga parte con 10 metri di vantaggio.'], [0.3, 'Quando Achille arriva dove era la tartaruga, lei si è spostata di 1 metro; poi di 0,1; poi di 0,01…'], [0.8, 'Infiniti tratti, ma la loro somma è finita: 10 + 1 + 0,1 + … = 11,11… metri. Achille la raggiunge.']],
    disegna(svg, t) {
      const x0 = 40, k = 43, tau = (10 / 9) * (1 - Math.pow(1 - t, 2.2));
      const A = 10 * tau, Tt = 10 + tau;
      const sx = v => x0 + k * v;
      L(svg, x0, 170, 580, 170, { 'stroke-width': 2 });
      for (let v = 0; v <= 12; v++) { L(svg, sx(v), 166, sx(v), 174); if (v % 2 === 0) X(svg, sx(v), 190, v + ' m', { class: 'cg-tacche' }); }
      const tappe = [10, 11, 11.1, 11.11]; tappe.forEach((v, i) => { if (A >= v - 0.02) L(svg, sx(v), 120, sx(v), 170, { stroke: S[1], 'stroke-dasharray': '3 3' }); });
      /* Achille */
      const ax = sx(A); C(svg, ax, 140, 9, { fill: S[0] }); L(svg, ax, 149, ax, 165, { stroke: S[0], 'stroke-width': 3 }); L(svg, ax - 8, 158, ax + 8, 158, { stroke: S[0], 'stroke-width': 3 }); X(svg, ax, 122, 'Achille', { fill: S[0] });
      /* tartaruga */
      const tx = sx(Tt); svg.appendChild(el('ellipse', { cx: tx, cy: 160, rx: 14, ry: 9, fill: S[2] })); C(svg, tx + 15, 158, 5, { fill: S[2] }); X(svg, tx, 142, 'tartaruga', { fill: S[2] });
      const termini = ['10']; if (A >= 10) termini.push('1'); if (A >= 11) termini.push('0,1'); if (A >= 11.1) termini.push('0,01'); if (A >= 11.11) termini.push('…');
      X(svg, 300, 40, 'distanze percorse: ' + termini.join(' + '), { 'font-size': 15 });
      X(svg, 300, 68, 'Achille: ' + fmt(A, 2) + ' m   tartaruga: ' + fmt(Tt, 2) + ' m', { 'font-size': 14, fill: 'var(--testo2)' });
      X(svg, 300, 235, '10 + 1 + 0,1 + 0,01 + … = 10 / (1 − 0,1) = 11,11…', { 'font-size': 15, opacity: f(t, 0.8, 0.95), fill: S[3] });
    }
  };

  /* ---------------- CRIVELLO DI ERATOSTENE ---------------- */
  ANIM.crivello = {
    W: 600, H: 320, durata: 10000,
    fasi: [[0, 'I numeri da 2 a 60.'], [0.12, 'Teniamo il 2 e cancelliamo tutti i suoi multipli.'], [0.34, 'Il primo sopravvissuto è 3: cancelliamo i suoi multipli.'], [0.56, 'Poi il 5…'], [0.74, '…e il 7. Basta arrivare a √60 < 8.'], [0.9, 'Quelli rimasti sono i numeri primi fino a 60.']],
    disegna(svg, t) {
      const cols = 10, cw = 52, ch = 40, ox = 40, oy = 20;
      const primi = [2, 3, 5, 7], inizio = [0.12, 0.34, 0.56, 0.74], fine = [0.32, 0.54, 0.72, 0.88];
      const cancellato = {}; const multipli = {};
      primi.forEach((p, i) => { const u = f(t, inizio[i], fine[i]); for (let n = 2 * p; n <= 60; n += p) { const ordine = (n - 2 * p) / p / Math.floor((60 - 2 * p) / p + 1); if (u > ordine) { cancellato[n] = cancellato[n] || p; } } });
      for (let n = 2; n <= 60; n++) {
        const i = n - 1, cx = ox + (i % cols) * cw, cy = oy + Math.floor(i / cols) * ch;
        const ePrimo = !cancellato[n] && primi.every((p, j) => t < inizio[j] || n === p || n % p !== 0 || n < p * p) && t >= 0.9 && [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59].includes(n);
        const inCorso = primi.some((p, j) => n === p && t >= inizio[j] && t < fine[j]);
        R(svg, cx, cy, cw - 4, ch - 4, { rx: 6, fill: ePrimo ? S[2] : inCorso ? S[1] : SF, 'fill-opacity': ePrimo ? .5 : inCorso ? .6 : 1, stroke: cancellato[n] ? GR : AS, 'stroke-width': 1 });
        X(svg, cx + (cw - 4) / 2, cy + ch / 2 + 3, String(n), { fill: cancellato[n] ? GR : T, 'font-weight': cancellato[n] ? 400 : 600 });
        if (cancellato[n]) L(svg, cx + 8, cy + ch - 10, cx + cw - 12, cy + 6, { stroke: S[primi.indexOf(cancellato[n]) % 4], 'stroke-width': 2 });
      }
    }
  };

  /* ---------------- TALETE: rette parallele e segmenti proporzionali ---------------- */
  ANIM.talete = {
    W: 600, H: 320, durata: 8000,
    fasi: [[0, 'Due rette che si incontrano in O, tagliate da rette parallele.'], [0.2, 'Spostando una parallela cambiano i segmenti, ma i rapporti fra segmenti corrispondenti restano uguali.']],
    disegna(svg, t) {
      const O = [60, 280], u = [Math.cos(-0.62), Math.sin(-0.62)], dir = [-0.38, -1];
      const nd = Math.hypot(dir[0], dir[1]); dir[0] /= nd; dir[1] /= nd;
      L(svg, O[0], O[1], 580, O[1], { 'stroke-width': 2 }); L(svg, O[0], O[1], O[0] + 480 * u[0], O[1] + 480 * u[1], { 'stroke-width': 2 });
      const xA = 200, xB = 330 + 190 * Math.sin(Math.PI * f(t, 0.2, 1) * 0.999);
      function inter(px) { /* retta per (px, O.y) con direzione dir, intersecata con il raggio O + s u */
        const s = ((px - O[0]) * dir[1] - 0 * dir[0]) / (u[0] * dir[1] - u[1] * dir[0]); return [O[0] + s * u[0], O[1] + s * u[1]];
      }
      const A = [xA, O[1]], B = [xB, O[1]], A1 = inter(xA), B1 = inter(xB);
      [[A, A1], [B, B1]].forEach(([p, q], i) => { const ext = 40; L(svg, p[0] - dir[0] * ext, p[1] - dir[1] * ext, q[0] + dir[0] * ext, q[1] + dir[1] * ext, { stroke: S[1], 'stroke-width': 2 }); });
      L(svg, O[0], O[1], A[0], A[1], { stroke: S[0], 'stroke-width': 5, opacity: .7 }); L(svg, A[0], A[1], B[0], B[1], { stroke: S[2], 'stroke-width': 5, opacity: .7 });
      L(svg, O[0], O[1], A1[0], A1[1], { stroke: S[0], 'stroke-width': 5, opacity: .7 }); L(svg, A1[0], A1[1], B1[0], B1[1], { stroke: S[2], 'stroke-width': 5, opacity: .7 });
      [[O, 'O', -12, 18], [A, 'A', 0, 20], [B, 'B', 0, 20], [A1, 'A\'', 10, -8], [B1, 'B\'', 10, -8]].forEach(([p, s, dx, dy]) => X(svg, p[0] + dx, p[1] + dy, s));
      const OA = (A[0] - O[0]) / 50, AB = (B[0] - A[0]) / 50, OA1 = Math.hypot(A1[0] - O[0], A1[1] - O[1]) / 50, A1B1 = Math.hypot(B1[0] - A1[0], B1[1] - A1[1]) / 50;
      X(svg, 380, 60, 'AB / OA = ' + fmt(AB / OA, 2), { 'font-size': 16, fill: S[2] });
      X(svg, 380, 88, 'A\'B\' / OA\' = ' + fmt(A1B1 / OA1, 2), { 'font-size': 16, fill: S[2] });
      X(svg, 380, 118, 'OA : AB = OA\' : A\'B\'', { 'font-size': 15, fill: 'var(--testo2)' });
    }
  };

  /* ---------------- MACCHINA DI GALTON ---------------- */
  ANIM.galton = {
    W: 600, H: 340, durata: 12000,
    fasi: [[0, 'Ogni pallina, a ogni chiodo, va a destra o a sinistra con la stessa probabilità.'], [0.4, 'Le palline si accumulano nei contenitori…'], [0.85, '…e disegnano una campana: è la distribuzione binomiale. I percorsi verso il centro sono molti di più di quelli verso i bordi.']],
    palline: null,
    disegna(svg, t) {
      const Rw = 8, N = 70, cx = 300, y0 = 40, dy = 22, dx = 26;
      if (!this.palline) { let seme = 12345; const rnd = () => { seme = (seme * 1103515245 + 12345) & 0x7fffffff; return seme / 0x7fffffff; }; this.palline = []; for (let k = 0; k < N; k++) { const passi = []; for (let r = 0; r < Rw; r++) passi.push(rnd() < 0.5 ? 0 : 1); this.palline.push(passi); } }
      for (let r = 0; r < Rw; r++) for (let i = 0; i <= r; i++) C(svg, cx + (i - r / 2) * dx, y0 + r * dy, 3, { fill: AS });
      const durataVolo = 0.16, passo = (1 - durataVolo) / N;
      const bins = new Array(Rw + 1).fill(0);
      const yb = y0 + Rw * dy + 20;
      this.palline.forEach((passi, k) => {
        const inizio = k * passo, u = (t - inizio) / durataVolo;
        if (u < 0) return;
        let pos = 0; const percorso = [[cx, y0 - 16]];
        for (let r = 0; r < Rw; r++) { pos += passi[r]; percorso.push([cx + (pos - (r + 1) / 2) * dx, y0 + (r + 1) * dy]); }
        if (u >= 1) { const b = pos; bins[b]++; C(svg, cx + (b - Rw / 2) * dx, yb + 100 - bins[b] * 9, 4.5, { fill: S[0] }); return; }
        const seg = u * Rw, i = Math.floor(seg), q = seg - i;
        const p = [lerp(percorso[i][0], percorso[i + 1][0], q), lerp(percorso[i][1], percorso[i + 1][1], q)];
        C(svg, p[0], p[1], 5, { fill: S[1] });
      });
      for (let b = 0; b <= Rw; b++) { const x = cx + (b - Rw / 2) * dx; L(svg, x - dx / 2, yb - 4, x - dx / 2, yb + 106, { stroke: GR }); if (bins[b]) X(svg, x, yb + 122, String(bins[b]), { class: 'cg-tacche' }); }
      L(svg, cx - (Rw / 2 + 0.5) * dx, yb + 106, cx + (Rw / 2 + 0.5) * dx, yb + 106);
    }
  };

  /* ---------------- ANGOLI ASSOCIATI ---------------- */
  ANIM['angoli-associati'] = {
    W: 600, H: 320, durata: 9000,
    fasi: [[0, 'Il punto P sulla circonferenza goniometrica, di angolo α.'], [0.25, 'Simmetrico rispetto all\'asse y: angolo π − α. Stesso seno, coseno opposto.'], [0.5, 'Simmetrico rispetto all\'origine: angolo π + α. Seno e coseno cambiano segno.'], [0.75, 'Simmetrico rispetto all\'asse x: angolo −α (o 2π − α). Stesso coseno, seno opposto.']],
    disegna(svg, t) {
      const O = [170, 160], r = 110, al = rad(35);
      L(svg, 30, O[1], 310, O[1]); L(svg, O[0], 20, O[0], 300); C(svg, O[0], O[1], r, { fill: 'none', stroke: AS, 'stroke-width': 2 });
      const punti = [[al, 'P', 'α', 0, 0], [Math.PI - al, 'P₁', 'π − α', 0.25, 1], [Math.PI + al, 'P₂', 'π + α', 0.5, 2], [-al, 'P₃', '−α', 0.75, 3]];
      const righe = [];
      punti.forEach(([a, nome, eti, t0, i]) => {
        const o = t0 === 0 ? 1 : f(t, t0, t0 + 0.12); if (o <= 0) return;
        const px = O[0] + r * Math.cos(a), py = O[1] - r * Math.sin(a);
        L(svg, px, O[1], px, py, { stroke: S[0], 'stroke-width': 3, opacity: o }); L(svg, O[0], O[1], px, O[1], { stroke: S[1], 'stroke-width': 3, opacity: o });
        L(svg, O[0], O[1], px, py, { stroke: T, opacity: o }); C(svg, px, py, 5, { fill: S[i], opacity: o }); X(svg, px + 16 * Math.cos(a), py - 16 * Math.sin(a) + 4, nome, { opacity: o });
        righe.push([eti, 'sin = ' + fmt(Math.sin(a), 2) + '   cos = ' + fmt(Math.cos(a), 2), S[i], o]);
      });
      righe.forEach(([e, v, col, o], i) => { X(svg, 450, 70 + i * 52, e, { 'font-size': 17, fill: col, opacity: o }); X(svg, 450, 92 + i * 52, v, { 'font-size': 14, opacity: o, fill: 'var(--testo2)' }); });
    }
  };

  /* ---------------- FUNZIONE INTEGRALE: l'area che si accumula ---------------- */
  ANIM['integrale-accumulo'] = {
    W: 600, H: 320, durata: 8000,
    fasi: [[0, 'A sinistra la funzione f; spostando x, l\'area colorata da 0 a x cresce.'], [0.3, 'A destra riportiamo il valore dell\'area: è la funzione integrale F(x).'], [0.8, 'F cresce tanto più in fretta quanto più f è alta: la derivata di F è f (teorema fondamentale).']],
    disegna(svg, t) {
      const fx = x => 1.2 + Math.sin(x) * 0.8, b = 6, xt = b * t;
      const sx = x => 40 + x * 40, sy = y => 270 - y * 60, gx = x => 330 + x * 40, gy = y => 270 - y * 28;
      L(svg, 30, sy(0), 300, sy(0)); L(svg, sx(0), 60, sx(0), 280); L(svg, 320, gy(0), 590, gy(0)); L(svg, gx(0), 40, gx(0), 280);
      let A = 0; const dxn = 0.02; const area = ['M' + sx(0) + ',' + sy(0)], F = [];
      for (let x = 0; x <= b + 1e-9; x += dxn) { if (x <= xt) { area.push('L' + sx(x).toFixed(1) + ',' + sy(fx(x)).toFixed(1)); A += fx(x) * dxn; F.push((F.length ? 'L' : 'M') + gx(x).toFixed(1) + ',' + gy(A).toFixed(1)); } }
      area.push('L' + sx(xt).toFixed(1) + ',' + sy(0) + 'Z');
      svg.appendChild(el('path', { d: area.join(''), fill: S[0], 'fill-opacity': .3 }));
      const cur = []; for (let i = 0; i <= 100; i++) { const x = b * i / 100; cur.push((i ? 'L' : 'M') + sx(x).toFixed(1) + ',' + sy(fx(x)).toFixed(1)); }
      svg.appendChild(el('path', { d: cur.join(''), fill: 'none', stroke: S[0], 'stroke-width': 2.5 }));
      if (F.length > 1) svg.appendChild(el('path', { d: F.join(''), fill: 'none', stroke: S[1], 'stroke-width': 2.5 }));
      L(svg, sx(xt), sy(0), sx(xt), sy(fx(xt)), { stroke: S[3], 'stroke-width': 2 }); C(svg, gx(xt), gy(A), 5, { fill: S[1] });
      X(svg, sx(xt), sy(0) + 16, 'x', { class: 'cg-nome-asse' }); X(svg, gx(xt), gy(0) + 16, 'x', { class: 'cg-nome-asse' });
      X(svg, 170, 50, 'f(x)  —  area = ' + fmt(A, 2), { fill: S[0], 'font-size': 15 }); X(svg, 460, 30, 'F(x) = area da 0 a x', { fill: S[1], 'font-size': 15 });
    }
  };

  /* ---------------- COMPLETAMENTO DEL QUADRATO ---------------- */
  ANIM['completamento-quadrato'] = {
    W: 600, H: 340, durata: 8000,
    fasi: [[0, 'x² + 6x: un quadrato di lato x e un rettangolo 6 × x.'], [0.2, 'Dividiamo il rettangolo in due strisce 3 × x e le appoggiamo su due lati del quadrato.'], [0.65, 'Manca un angolo: un quadratino 3 × 3 = 9. Aggiungendolo, x² + 6x + 9 = (x + 3)².']],
    disegna(svg, t) {
      const k = 34, x = 4, h = 3, ox = 70, oy = 300;
      const M = (a, b) => [ox + k * a, oy - k * b];
      const u = f(t, 0.2, 0.65), o = f(t, 0.65, 0.85);
      R(svg, ...M(0, x), k * x, k * x, { fill: S[0], 'fill-opacity': .35, stroke: S[0], 'stroke-width': 2 }); X(svg, ...M(x / 2, x / 2), 'x²', { 'font-size': 20 });
      /* striscia 1: resta a destra */
      R(svg, ...M(x + 0.6 * (1 - u), x), k * h, k * x, { fill: S[1], 'fill-opacity': .35, stroke: S[1], 'stroke-width': 2 }); X(svg, ...M(x + 0.6 * (1 - u) + h / 2, x / 2), '3x', { 'font-size': 17 });
      /* striscia 2: ruota e sale sopra */
      const sx2 = lerp(x + h + 0.6, 0, u), sy2 = lerp(x, x + h, u), w2 = lerp(h, x, u), h2 = lerp(x, h, u);
      R(svg, ...M(sx2, sy2), k * w2, k * h2, { fill: S[1], 'fill-opacity': .35, stroke: S[1], 'stroke-width': 2 }); X(svg, ...M(sx2 + w2 / 2, sy2 - h2 / 2), '3x', { 'font-size': 17 });
      if (o > 0) { R(svg, ...M(x, x + h), k * h, k * h, { fill: S[2], 'fill-opacity': .4 * o, stroke: S[2], 'stroke-width': 2, 'stroke-dasharray': o < 1 ? '5 4' : null }); X(svg, ...M(x + h / 2, x + h / 2), '9', { 'font-size': 18, opacity: o }); }
      X(svg, ...M(x / 2, -0.4), 'x', { 'font-style': 'italic' }); X(svg, ...M(x + h / 2, -0.4), '3', { opacity: u });
      X(svg, 440, 70, 'x² + 6x', { 'font-size': 20 }); X(svg, 440, 100, '= x² + 3x + 3x', { 'font-size': 17, opacity: u });
      X(svg, 440, 130, '+ 9 = (x + 3)²', { 'font-size': 20, opacity: o, fill: S[3] });
    }
  };

  /* ---------------- SPIRALE DI FIBONACCI ---------------- */
  ANIM['fibonacci-spirale'] = {
    W: 600, H: 360, durata: 8000,
    fasi: [[0, 'Quadrati con i lati della successione di Fibonacci: 1, 1, 2, 3, 5, 8, 13…'], [0.5, 'Ogni quadrato ha per lato la somma dei due precedenti, e un quarto di cerchio in ciascuno disegna la spirale.']],
    disegna(svg, t) {
      const k = 15, ox = 300 + 3 * k - 5 * k, oy = 40 + 5 * k;
      const M = (x, y) => [ox + k * x, oy + k * y];
      /* quadrati: [x, y, lato, centro dell'arco, angolo iniziale] in unità, y verso il basso */
      const PI = Math.PI;
      const Q = [[0, 0, 1, [1, 1], PI, 1.5 * PI], [1, 0, 1, [1, 1], 1.5 * PI, 2 * PI], [0, 1, 2, [0, 1], 0, PI / 2], [-3, 0, 3, [0, 0], PI / 2, PI], [-3, -5, 5, [2, 0], PI, 1.5 * PI], [2, -5, 8, [2, 3], 1.5 * PI, 2 * PI], [-3, 3, 13, [-3, 3], 0, PI / 2]];
      const n = Math.min(Q.length, Math.floor(t * Q.length * 1.02) + 1);
      const fib = [1, 1, 2, 3, 5, 8, 13];
      for (let i = 0; i < n; i++) {
        const [x, y, s, c, a1, a2] = Q[i]; const [X0, Y0] = M(x, y);
        R(svg, X0, Y0, k * s, k * s, { fill: S[i % 4], 'fill-opacity': .25, stroke: S[i % 4], 'stroke-width': 1.5 });
        X(svg, X0 + k * s / 2, Y0 + k * s / 2 + 5, String(s), { 'font-size': Math.min(22, 8 + s * 2) });
        const [cxu, cyu] = M(c[0], c[1]);
        const frazione = i < n - 1 ? 1 : ease((t * Q.length * 1.02 - i));
        const pts = []; const N = 20; for (let j = 0; j <= N * frazione; j++) { const a = a1 + (a2 - a1) * j / N; pts.push((j ? 'L' : 'M') + (cxu + k * s * Math.cos(a)).toFixed(1) + ',' + (cyu + k * s * Math.sin(a)).toFixed(1)); }
        if (pts.length > 1) svg.appendChild(el('path', { d: pts.join(''), fill: 'none', stroke: S[3], 'stroke-width': 3 }));
      }
      X(svg, 470, 300, fib.slice(0, n).join(', ') + (n < 7 ? ', …' : ''), { 'font-size': 15 });
    }
  };

  /* ---------------- TEOREMA DI EUCLIDE (primo) ---------------- */
  ANIM['euclide-primo'] = {
    W: 600, H: 340, durata: 8000,
    fasi: [[0, 'Triangolo rettangolo: il cateto b e la sua proiezione m sull\'ipotenusa.'], [0.25, 'Il quadrato costruito sul cateto…'], [0.55, '…ha la stessa area del rettangolo con lati l\'ipotenusa c e la proiezione m: b² = c · m.']],
    disegna(svg, t) {
      const k = 18, A = [110, 160], B = [110 + k * 9, 160], H = [110 + k * 4, 160], Cc = [110 + k * 4, 160 - k * Math.sqrt(20)];
      P(svg, [A, B, Cc], { fill: 'none', stroke: AS, 'stroke-width': 2 });
      L(svg, Cc[0], Cc[1], H[0], H[1], { stroke: GR, 'stroke-dasharray': '4 3' });
      const bx = Cc[0] - A[0], by = Cc[1] - A[1], b = Math.hypot(bx, by);
      const nx = by / b, ny = -bx / b;   /* normale verso l'alto/sinistra */
      const o1 = f(t, 0.25, 0.45), o2 = f(t, 0.55, 0.8);
      P(svg, [A, Cc, [Cc[0] + nx * b, Cc[1] + ny * b], [A[0] + nx * b, A[1] + ny * b]], { fill: S[0], 'fill-opacity': .35 * o1, stroke: S[0], 'stroke-width': 2, opacity: o1 });
      X(svg, A[0] + bx / 2 + nx * b / 2, A[1] + by / 2 + ny * b / 2 + 5, 'b²', { 'font-size': 20, opacity: o1 });
      const m = H[0] - A[0], c = B[0] - A[0];
      R(svg, A[0], A[1] + 8, m, c, { fill: S[1], 'fill-opacity': .35 * o2, stroke: S[1], 'stroke-width': 2, opacity: o2 });
      X(svg, A[0] + m / 2, A[1] + 8 + c / 2 + 5, 'c · m', { 'font-size': 20, opacity: o2 });
      X(svg, A[0] + m / 2, A[1] + 22, 'm', { opacity: o2 }); X(svg, A[0] - 16, A[1] + 8 + c / 2, 'c', { opacity: o2 });
      X(svg, A[0] + bx / 2 - 14, A[1] + by / 2, 'b', { 'font-style': 'italic', fill: S[0] }); X(svg, (A[0] + B[0]) / 2, B[1] + 20 - (o2 > 0 ? 30 : 0), o2 > 0 ? '' : 'c', {});
      X(svg, 440, 60, 'b² = c · m', { 'font-size': 22, opacity: o2 }); X(svg, 440, 90, '(qui b = 6, c = 9, m = 4: 36 = 9 · 4 ✓)', { 'font-size': 13, opacity: o2, fill: 'var(--testo2)' });
      X(svg, A[0] - 14, A[1] + 6, 'A'); X(svg, B[0] + 14, B[1] + 6, 'B'); X(svg, Cc[0], Cc[1] - 10, 'C'); X(svg, H[0], H[1] + 20, 'H', { opacity: 1 - o2 });
    }
  };

  /* ---------------- RETTA: pendenza come rapporto ---------------- */
  ANIM['pendenza-retta'] = {
    W: 600, H: 320, durata: 7000,
    fasi: [[0, 'Su una retta, spostandosi di 1 in orizzontale…'], [0.3, '…si sale sempre della stessa quantità m: il coefficiente angolare.'], [0.75, 'Qualunque coppia di punti dà lo stesso rapporto Δy/Δx = m.']],
    disegna(svg, t) {
      const m = 0.6, q = 0.5, sx = x => 60 + x * 60, sy = y => 280 - y * 60;
      L(svg, 30, sy(0), 580, sy(0)); L(svg, sx(0), 20, sx(0), 300);
      L(svg, sx(-0.5), sy(m * -0.5 + q), sx(8.5), sy(m * 8.5 + q), { stroke: S[0], 'stroke-width': 2.5 });
      const n = Math.min(6, Math.floor(f(t, 0, 0.75) * 6.5));
      for (let i = 0; i < n; i++) { const x = 1 + i; L(svg, sx(x), sy(m * x + q), sx(x + 1), sy(m * x + q), { stroke: S[1], 'stroke-width': 2.5 }); L(svg, sx(x + 1), sy(m * x + q), sx(x + 1), sy(m * (x + 1) + q), { stroke: S[2], 'stroke-width': 2.5 }); X(svg, sx(x + 0.5), sy(m * x + q) + 16, '1', { fill: S[1], class: 'cg-tacche' }); X(svg, sx(x + 1) + 12, sy(m * x + q + m / 2) + 4, 'm', { fill: S[2], 'font-style': 'italic' }); }
      const o = f(t, 0.75, 0.9);
      L(svg, sx(1), sy(m + q), sx(7), sy(m + q), { stroke: S[3], 'stroke-width': 2, opacity: o, 'stroke-dasharray': '6 4' }); L(svg, sx(7), sy(m + q), sx(7), sy(7 * m + q), { stroke: S[3], 'stroke-width': 2, opacity: o, 'stroke-dasharray': '6 4' });
      X(svg, sx(4), sy(m + q) - 8, 'Δx = 6', { fill: S[3], opacity: o }); X(svg, sx(7) + 40, sy(4 * m + q), 'Δy = 3,6', { fill: S[3], opacity: o });
      X(svg, 440, 60, 'm = Δy / Δx = 0,6', { 'font-size': 18, opacity: o });
    }
  };

  /* ---------------- CRESCITA ESPONENZIALE vs LINEARE ---------------- */
  ANIM['crescita-esponenziale'] = {
    W: 600, H: 320, durata: 8000,
    fasi: [[0, 'Due crescite: una aggiunge 2 a ogni passo (lineare), l\'altra raddoppia (esponenziale).'], [0.4, 'All\'inizio sono vicine…'], [0.75, '…poi quella esponenziale sfugge: nessuna retta la raggiunge.']],
    disegna(svg, t) {
      const n = 8, k = f(t, 0, 0.95) * n;
      const sx = x => 50 + x * 62, sy = y => 290 - y * 1.9;
      L(svg, 30, sy(0), 570, sy(0)); L(svg, sx(0), 20, sx(0), 300);
      for (let i = 0; i <= Math.floor(k); i++) { const lin = 2 * i + 1, esp = Math.pow(2, i); R(svg, sx(i) - 18, sy(lin), 16, sy(0) - sy(lin), { fill: S[0], 'fill-opacity': .6 }); R(svg, sx(i) + 2, sy(esp), 16, sy(0) - sy(esp), { fill: S[1], 'fill-opacity': .6 }); X(svg, sx(i), sy(0) + 16, String(i), { class: 'cg-tacche' }); }
      const i = Math.floor(k);
      X(svg, 150, 40, 'lineare: 2n + 1 → ' + (2 * i + 1), { fill: S[0], 'font-size': 15 }); X(svg, 150, 64, 'esponenziale: 2ⁿ → ' + Math.pow(2, i), { fill: S[1], 'font-size': 15 });
    }
  };

  /* ===================== LETTORE ===================== */
  const nomi = () => Object.keys(ANIM);
  function render(spec, wrap) {
    const A = ANIM[spec.nome];
    if (!A) { wrap.textContent = 'Animazione sconosciuta: ' + spec.nome; return; }
    const svg = el('svg', { viewBox: '0 0 ' + A.W + ' ' + A.H, class: 'cg-svg cg-anim-svg', role: 'img', 'aria-label': spec.didascalia || spec.nome });
    wrap.appendChild(svg);
    const ctrl = document.createElement('div'); ctrl.className = 'cg-anim-ctrl';
    ctrl.innerHTML = '<button type="button" class="cg-anim-play" aria-label="Avvia">▶</button><button type="button" class="cg-anim-replay" aria-label="Ricomincia">↺</button><input type="range" min="0" max="1000" value="0" aria-label="Avanzamento"><span class="cg-anim-fase"></span>';
    wrap.appendChild(ctrl);
    const play = ctrl.querySelector('.cg-anim-play'), range = ctrl.querySelector('input'), fase = ctrl.querySelector('.cg-anim-fase');
    let t = 0, inCorso = false, ultimo = 0, giaPartita = false;
    function didascalia() { let s = ''; (A.fasi || []).forEach(([t0, testo]) => { if (t >= t0) s = testo; }); return s; }
    function disegna() { while (svg.firstChild) svg.removeChild(svg.firstChild); A.disegna(svg, t); range.value = Math.round(t * 1000); fase.textContent = didascalia(); play.textContent = inCorso ? '❚❚' : (t >= 1 ? '↺' : '▶'); }
    function ciclo(ts) { if (!inCorso) return; t = Math.min(1, t + (ts - ultimo) / (A.durata || 7000)); ultimo = ts; disegna(); if (t >= 1) { inCorso = false; disegna(); return; } requestAnimationFrame(ciclo); }
    function avvia() { if (t >= 1) t = 0; inCorso = true; giaPartita = true; ultimo = performance.now(); requestAnimationFrame(ciclo); disegna(); }
    function ferma() { inCorso = false; disegna(); }
    play.addEventListener('click', () => inCorso ? ferma() : avvia());
    ctrl.querySelector('.cg-anim-replay').addEventListener('click', () => { t = 0; avvia(); });
    range.addEventListener('input', () => { inCorso = false; t = range.value / 1000; disegna(); });
    svg.addEventListener('click', () => inCorso ? ferma() : avvia());
    disegna();
    if (spec.autoplay !== false && 'IntersectionObserver' in window) {
      const oss = new IntersectionObserver(e => { if (e[0].isIntersecting && !giaPartita) { setTimeout(() => { if (!giaPartita && document.body.contains(svg)) avvia(); }, 400); oss.disconnect(); } }, { threshold: 0.5 });
      oss.observe(svg);
    }
  }

  const api = { render, nomi, ANIM };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.CANIM = api;
})();
