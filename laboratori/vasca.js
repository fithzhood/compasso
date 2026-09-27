/* Laboratorio «La vasca» — l'integrale definito come area con segno.
   Il bordo della vasca è il grafico di f, il fondo è l'asse x, le pareti sono a e b.
   L'acqua che ci sta è l'integrale: sotto il fondo l'acqua manca (buco rosso, area negativa).
   I rettangoli col punto medio la approssimano; la primitiva la calcola esatta.
   Schermata singola (SCHEMA-LAB.md): la scena è un SVG largo 600 e alto quanto lo spazio che
   c'è; le pareti mobili si trascinano con le coordinate della matrice dello schermo. */
(function () {
  const STILE = `
    .lab-vasca .lab-scena { overflow: hidden; touch-action: none; }
    .lab-vasca .lab-scena > svg { --k: 1; }
    .lab-vasca .piano-fondo { fill: var(--sup2); stroke: var(--bordo); stroke-width: 1; }
    /* --- pannello --- */
    .lab-vasca .compito { text-align: center; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); color: var(--testo2); line-height: 1.5; }
    .lab-vasca .compito .in-riga { display: inline-block; white-space: nowrap; }
    .lab-vasca .dati { display: flex; gap: 2px 14px; flex-wrap: wrap; justify-content: center; align-items: baseline; font-size: .95rem; color: var(--testo2); }
    .lab-vasca .dati span { white-space: nowrap; }
    .lab-vasca .dati .somma { color: var(--testo); font-weight: 600; }
    .lab-vasca .esatto { text-align: center; font-size: clamp(1.1rem, 2.6cqmin, 1.25rem); line-height: 1.9; }
    .lab-vasca.in-libero .compito { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-vasca.in-libero .legenda { display: none; } }
    .lab-vasca .esatto .katex { font-size: 1em; }
    .lab-vasca .lab-messaggio { padding: 0 4px; min-height: 1.5em; font-size: clamp(.9rem, 2.1cqmin, 1.05rem); text-align: center; line-height: 1.45; }
    .lab-vasca.in-libero .lab-messaggio:empty { display: none; }
    .lab-vasca .lab-barra { padding: 0; border: 0; gap: 8px; justify-content: center; flex-wrap: wrap; align-items: center; }
    .lab-vasca .lab-barra .btn { min-height: clamp(40px, 5.6cqh, 48px); }
    .lab-vasca .btn[disabled] { opacity: .35; cursor: default; }
    .lab-vasca .rettangoli { display: inline-flex; align-items: center; gap: 4px; }
    .lab-vasca .rettangoli .btn { min-width: 40px; padding: 0 8px; font-size: 1.15rem; }
    .lab-vasca .conta-n { min-width: 4.2em; text-align: center; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--testo); white-space: nowrap; }
    .lab-vasca .gruppo-risposta { display: inline-flex; gap: 6px; align-items: center; }
    .lab-vasca .risposta { width: 80px; padding: 8px 8px; min-height: 40px; border-radius: 9px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo); font-family: var(--font); font-size: 1.05rem; font-weight: 700; text-align: center; user-select: text; -webkit-user-select: text; }
    .lab-vasca .risposta.sbagliata { border-color: var(--no); animation: lab-vasca-scuoti .4s; }
    @keyframes lab-vasca-scuoti { 0%,100% { transform: none } 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }
    .lab-vasca .legenda { display: flex; gap: 2px 12px; flex-wrap: wrap; justify-content: center; font-size: .76rem; color: var(--testo2); }
    .lab-vasca .legenda span { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
    .lab-vasca .legenda i { display: inline-block; width: 13px; height: 13px; border-radius: 3px; border: 1px solid transparent; }
    .lab-vasca .q-acqua { background: var(--s1); opacity: .45; }
    .lab-vasca .q-buco { background: var(--no); opacity: .4; }
    .lab-vasca .q-rett { border-color: var(--accento) !important; background: var(--accento-tenue); }
    .lab-vasca .vinto { display: inline-block; animation: lab-vasca-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-vasca-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-vasca .lab-parametri .bordo { grid-column: 1 / -1; }
    .lab-vasca .lab-param.bordo output { flex: 1; min-width: 0; max-width: 16em; font-weight: 400; font-size: 1.1rem; white-space: nowrap; }
    .lab-vasca .lab-param.bordo output .katex, .lab-vasca .lab-param output .katex { font-size: 1em; }
    /* gli esponenti di KaTeX sono al 70%: nel pannello la formula sta un po' più grande del testo, o scendono sotto i 12 px */
    .lab-vasca .compito .katex, .lab-vasca .dati .katex { font-size: 1.2em; }
    /* sul telefono in verticale la consegna è quella breve; quella intera sta nel «?» */
    .lab-vasca .compito .c-breve { display: none; }
    @container lab (max-aspect-ratio: 5 / 4) and (max-width: 599px) { .lab-vasca .compito .c-breve { display: inline; } .lab-vasca .compito .c-breve + .c-lungo { display: none; } }
    .lab-vasca .lab-aiuto .consegna { color: var(--testo2); }
    .lab-vasca .lab-param output { min-width: 3em; }
    @container lab (max-aspect-ratio: 5 / 4) and (min-width: 600px) { .lab-vasca .lab-parametri { grid-template-columns: 2fr 1fr 1fr; } .lab-vasca .lab-parametri .bordo { grid-column: auto; } }
    /* --- scena --- */
    .lab-vasca .acqua { fill: var(--s1); fill-opacity: .32; stroke: var(--s1); stroke-opacity: .35; stroke-width: 1; }
    .lab-vasca .buco { fill: var(--no); fill-opacity: .26; stroke: var(--no); stroke-opacity: .35; stroke-width: 1; }
    .lab-vasca .curva { fill: none; stroke: var(--accento); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    .lab-vasca .curva-fuori { fill: none; stroke: var(--testo2); stroke-width: 2; opacity: .3; stroke-dasharray: 6 6; }
    .lab-vasca .parete { stroke: var(--testo); stroke-width: 6; stroke-linecap: round; opacity: .85; }
    .lab-vasca .fondo { stroke: var(--testo); stroke-width: 5; stroke-linecap: round; opacity: .8; }
    .lab-vasca .asse { stroke: var(--testo2); stroke-width: 1.5; opacity: .85; }
    .lab-vasca .tacca { stroke: var(--testo2); stroke-width: 1.2; opacity: .7; }
    .lab-vasca .numero { font: calc(15px * var(--k)) var(--font); fill: var(--testo2); opacity: .9; }
    .lab-vasca .nome-asse { font: italic 700 calc(16px * var(--k)) var(--font); fill: var(--testo2); }
    .lab-vasca .rett { fill: var(--accento); fill-opacity: .12; stroke: var(--accento); stroke-linejoin: round; }
    .lab-vasca .rett.giu { fill: var(--no); fill-opacity: .12; stroke: var(--no); }
    .lab-vasca .punto-medio { fill: var(--accento); }
    .lab-vasca .binario { stroke: var(--bordo2); stroke-width: 3; stroke-linecap: round; }
    .lab-vasca .guida { stroke: var(--accento); stroke-width: 1.4; stroke-dasharray: 4 5; opacity: .45; }
    .lab-vasca .etichetta-parete { font: italic 700 calc(16px * var(--k)) var(--font); fill: var(--testo2); }
    .lab-vasca .maniglia .alone { fill: var(--accento); opacity: 0; transition: opacity .15s; }
    .lab-vasca .maniglia.presa .alone { opacity: .25; }
    .lab-vasca .maniglia .corpo { fill: var(--accento); stroke: var(--sup); stroke-width: 2.5; }
    .lab-vasca .maniglia .nome { font: italic 700 15px var(--font); fill: #fff; }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  /* ---------- geometria della scena: larghezza fissa, altezza H decisa dallo spazio ---------- */
  const W = 600, MR = 22, MT = 14, H_MIN = 340, H_MAX = 640;
  const ENNE = [1, 2, 4, 8, 16, 32, 64];
  const PI = Math.PI;

  /* ---------- numeri all'italiana ---------- */
  function fmt(v, d) { d = d == null ? 2 : d; if (Math.abs(v) < Math.pow(10, -d) / 2) v = 0; return v.toFixed(d).replace('.', ',').replace('-', '−'); }
  function texNum(v, d) { d = d == null ? 2 : d; if (Math.abs(v) < Math.pow(10, -d) / 2) v = 0; return v.toFixed(d).replace('.', '{,}'); }
  const intero = v => Math.abs(v - Math.round(v)) < 1e-9;
  function texVal(v, d) { return intero(v) ? String(Math.round(v)) : texNum(v, d); }
  function estremo(v) { return intero(v) ? String(Math.round(v)) : texNum(v, 1); }
  function paren(v) { return (v < 0 || !intero(v)) ? '(' + estremo(v) + ')' : estremo(v); }

  /* «28/3», «9,33», «−2» → numero; null se non si legge */
  function leggiNumero(s) {
    s = String(s == null ? '' : s).trim().replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/,/g, '.');
    if (!s) return null;
    const fr = s.match(/^([+-]?\d*\.?\d+)\/([+-]?\d*\.?\d+)$/);
    if (fr) { const d = parseFloat(fr[2]); if (!d) return null; return parseFloat(fr[1]) / d; }
    if (!/^[+-]?\d*\.?\d+$/.test(s)) return null;
    const v = parseFloat(s);
    return isFinite(v) ? v : null;
  }

  /* ---------- integrazione ---------- */
  function simpson(f, a, b, n) {           /* valore esatto, per il disegno e le diagnosi */
    n = n || 2000; if (n % 2) n++;
    const h = (b - a) / n; let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
    return s * h / 3;
  }
  function sommaMedi(f, a, b, n) {         /* somma di Riemann col punto medio */
    const h = (b - a) / n; let s = 0;
    for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h);
    return s * h;
  }
  function areaAssoluta(f, a, b) { return simpson(x => Math.abs(f(x)), a, b, 2000); }
  function radiceIn(f, x0, x1) {
    let lo = x0, hi = x1, flo = f(lo);
    for (let k = 0; k < 44; k++) { const m = (lo + hi) / 2, fm = f(m); if ((fm > 0) === (flo > 0)) { lo = m; flo = fm; } else hi = m; }
    return (lo + hi) / 2;
  }
  /* spezza [a,b] nei tratti in cui f ha segno costante: uno per ogni pozza d'acqua o buco */
  function regioni(f, a, b) {
    const N = 240, eps = 1e-9, out = [];
    const segno = y => y > eps ? 1 : (y < -eps ? -1 : 0);
    let px = a, py = f(a), cur = { s: segno(py), pts: [{ x: px, y: py }] };
    for (let i = 1; i <= N; i++) {
      const x = a + (b - a) * i / N, y = f(x), s = segno(y);
      if (s !== 0 && cur.s !== 0 && s !== cur.s) {
        const r = radiceIn(f, px, x);
        cur.pts.push({ x: r, y: 0 }); out.push(cur);
        cur = { s: s, pts: [{ x: r, y: 0 }, { x: x, y: y }] };
      } else {
        if (cur.s === 0) cur.s = s;
        cur.pts.push({ x: x, y: y });
      }
      px = x; py = y;
    }
    out.push(cur);
    return out.filter(r => r.s !== 0 && r.pts.length > 2);
  }

  /* ---------- i livelli ---------- */
  const LIVELLI = [
    {
      f: () => 2, fTex: 'f(x) = 2', a: 0, b: 3, n0: 1,
      vista: { x0: -0.8, x1: 4.0, y0: -1.1, y1: 3.3 },
      tipo: 'numero', risposta: 6, toll: 0.05,
      compito: 'Il bordo è piatto: $f(x) = 2$, dalla parete $a = 0$ alla parete $b = 3$. Quanta acqua ci sta? È un rettangolo. Scrivi l\'area, tolleranza 0,05.',
      integraleTex: () => '\\int_{0}^{3} 2\\,dx = \\Big[\\,2x\\,\\Big]_{0}^{3} = 6 - 0 = 6',
      commento: 'Base 3, altezza 2: sei quadretti d\'acqua. Con un rettangolo solo la somma è già esatta, perché il bordo è dritto. E la primitiva di 2 è 2x: 2·3 − 2·0 fa 6.',
      aiuto: 'Qui il bordo è orizzontale: l\'acqua è un rettangolo, base per altezza.'
    },
    {
      f: x => x, fTex: 'f(x) = x', a: 0, b: 4, n0: 2,
      vista: { x0: -0.8, x1: 5.0, y0: -1.2, y1: 5.0 },
      tipo: 'numero', risposta: 8, toll: 0.05,
      compito: '$f(x) = x$ da 0 a 4: la vasca è un triangolo. Quanta acqua? Tolleranza 0,05.',
      integraleTex: () => '\\int_{0}^{4} x\\,dx = \\left[\\frac{x^{2}}{2}\\right]_{0}^{4} = 8 - 0 = 8',
      commento: 'Base 4, altezza 4: 4·4/2 = 8. La primitiva di x è x²/2, e 16/2 − 0 fa 8: due strade, stessa risposta. Nota che i rettangoli col punto medio ci prendono in pieno anche qui, perché quello che perdono a sinistra lo guadagnano a destra.',
      aiuto: 'Il bordo è una retta che parte da zero: l\'acqua è un triangolo rettangolo, base per altezza diviso 2.'
    },
    {
      f: x => 1 + x * x / 4, fTex: 'f(x) = 1 + \\frac{x^{2}}{4}', a: 0, b: 4, n0: 4,
      vista: { x0: -0.8, x1: 5.0, y0: -1.2, y1: 5.8 },
      tipo: 'numero', risposta: 28 / 3, toll: 0.3,
      compito: '$f(x) = 1 + \\frac{x^{2}}{4}$ da 0 a 4. Qui non c\'è una formula di geometria: infittisci i rettangoli, leggi la somma e scrivi l\'area a meno di 0,3.',
      integraleTex: () => '\\int_{0}^{4}\\left(1+\\frac{x^{2}}{4}\\right)dx = \\left[x+\\frac{x^{3}}{12}\\right]_{0}^{4} = \\frac{28}{3} \\approx 9{,}33',
      commento: 'Il valore esatto è 28/3, cioè 9,33. I rettangoli ci arrivano vicinissimi già in otto: quello che fanno loro alla cieca, la primitiva x + x³/12 lo fa in una riga.',
      aiuto: 'Nessuna figura elementare: i rettangoli servono proprio a questo. Aumenta n e guarda la somma stabilizzarsi sulle prime cifre.'
    },
    {
      f: x => 4 - x * x, fTex: 'f(x) = 4 - x^{2}', a: -2, b: 2, n0: 4,
      vista: { x0: -3.3, x1: 3.3, y0: -1.6, y1: 5.0 },
      tipo: 'numero', risposta: 32 / 3, toll: 0.3,
      compito: '$f(x) = 4 - x^{2}$ da $-2$ a 2: la vasca è un arco di parabola, e le pareti sono alte zero. Quanta acqua? Tolleranza 0,3.',
      integraleTex: () => '\\int_{-2}^{2}\\left(4-x^{2}\\right)dx = \\left[4x-\\frac{x^{3}}{3}\\right]_{-2}^{2} = \\frac{16}{3}+\\frac{16}{3} = \\frac{32}{3} \\approx 10{,}67',
      commento: '32/3, poco meno di 11. La vasca è simmetrica: bastava calcolare da 0 a 2 e raddoppiare. Attento al segno nella sostituzione: −(−2)³/3 è +8/3, non −8/3.',
      aiuto: 'Il bordo tocca il fondo in −2 e in 2: lì la vasca ha profondità zero. La primitiva di 4 − x² è 4x − x³/3.'
    },
    {
      f: Math.sin, fTex: 'f(x) = \\sin x', a: 0, b: PI, n0: 4,
      vista: { x0: -0.5, x1: 3.95, y0: -0.55, y1: 1.35 },
      pi: true, intervalloTex: '[\\,0;\\ \\pi\\,]',
      tipo: 'numero', risposta: 2, toll: 0.1,
      compito: '$f(x) = \\sin x$ da 0 a $\\pi$: una gobba sola. Quanta acqua? Tolleranza 0,1.',
      integraleTex: () => '\\int_{0}^{\\pi}\\sin x\\,dx = \\Big[-\\cos x\\Big]_{0}^{\\pi} = 1 + 1 = 2',
      commento: 'Esattamente 2. Un numero pulito da una curva che pulita non sembra: merito della primitiva −cos x, che agli estremi vale 1 e −1.',
      aiuto: 'La primitiva del seno è −cos x (col segno meno davanti). Poi F(π) − F(0).'
    },
    {
      f: Math.sin, fTex: 'f(x) = \\sin x', a: 0, b: 2 * PI, n0: 4,
      vista: { x0: -0.5, x1: 7.1, y0: -1.35, y1: 1.35 },
      pi: true, intervalloTex: '[\\,0;\\ 2\\pi\\,]',
      tipo: 'numero', risposta: 0, toll: 0.1, trappola: 4,
      compito: 'Stessa curva, ma fino a $2\\pi$: la seconda gobba scende sotto il fondo, e lì l\'acqua manca. Quanta acqua **netta**? Tolleranza 0,1.',
      integraleTex: () => '\\int_{0}^{2\\pi}\\sin x\\,dx = \\Big[-\\cos x\\Big]_{0}^{2\\pi} = -1 + 1 = 0',
      commento: 'Zero: il buco è la copia esatta della pozza, e l\'acqua che c\'è di qua manca di là. L\'integrale definito non somma le aree, le conta col segno: sopra il fondo positive, sotto negative.',
      aiuto: 'Guarda i colori: l\'azzurro conta positivo, il rosso negativo. Il totale è la differenza, non la somma.'
    },
    {
      f: x => x * x, fTex: 'f(x) = x^{2}', a: 0, b: 2, n0: 8,
      vista: { x0: -0.8, x1: 4.2, y0: -2.2, y1: 13.2 },
      mobili: { b: [0.5, 3.5] },
      tipo: 'pareti', bersaglio: 9, ok: (a, b) => Math.abs(b - 3) <= 0.05,
      compito: '$f(x) = x^{2}$, la parete $a$ è ferma in 0. Trascina la parete $b$ finché l\'acqua vale esattamente 9, poi premi Verifica (tolleranza 0,05).',
      integraleTex: (a, b) => '\\int_{0}^{' + estremo(b) + '} x^{2}\\,dx = \\left[\\frac{x^{3}}{3}\\right]_{0}^{' + estremo(b) + '} = \\frac{' + paren(b) + '^{3}}{3} ' + (intero(b * b * b / 3) ? '= ' : '\\approx ') + texVal(b * b * b / 3),
      commento: 'b = 3: b³/3 = 27/3 = 9. Qui l\'integrale è diventato un\'equazione — invece di chiedere quanto vale l\'area, si chiede fin dove arrivare per averne 9. E si vede che allargando di poco l\'acqua cresce in fretta, perché il bordo sale come x².',
      aiuto: 'La primitiva di x² è x³/3, e a = 0 non porta niente: l\'acqua vale b³/3. Quale cubo diviso 3 fa 9?'
    },
    {
      f: x => x, fTex: 'f(x) = x', a: 0.5, b: 4, n0: 8,
      vista: { x0: -3.6, x1: 4.9, y0: -3.8, y1: 5.0 },
      mobili: { a: [-3, 3.5] },
      tipo: 'pareti', bersaglio: 6, ok: (a) => Math.abs(a - 2) <= 0.05 || Math.abs(a + 2) <= 0.05,
      compito: '$f(x) = x$, la parete $b$ è ferma in 4. Trascina la parete $a$ finché l\'acqua vale esattamente 6, poi premi Verifica (tolleranza 0,05). Attento: $a$ può anche andare sotto zero.',
      integraleTex: (a) => '\\int_{' + estremo(a) + '}^{4} x\\,dx = \\left[\\frac{x^{2}}{2}\\right]_{' + estremo(a) + '}^{4} = 8 - \\frac{' + paren(a) + '^{2}}{2} ' + (intero(8 - a * a / 2) ? '= ' : '\\approx ') + texVal(8 - a * a / 2),
      commento: info => info.a > 0
        ? 'Da 2 a 4 l\'acqua è un trapezio: (2 + 4)/2 · 2 = 6, e con la primitiva 8 − 2 = 6. C\'era però una seconda parete buona, dall\'altra parte dello zero: l\'equazione era a² = 4, e le soluzioni di un quadrato sono due. Prova a cercarla.'
        : 'Hai trovato quella che si nasconde: da −2 a 0 c\'è un buco che vale −2, da 0 a 4 acqua per 8, e 8 − 2 fa 6 lo stesso. L\'equazione era 8 − a²/2 = 6, cioè a² = 4: andavano bene sia +2 sia −2.',
      aiuto: 'L\'acqua vale 8 − a²/2. Se a è negativo, il pezzo da a a 0 è un buco e si toglie: e allora a² non distingue il davanti dal dietro. Quante soluzioni ha a² = 4?'
    },
    {
      f: x => x * x * x / 4 - x, fTex: 'f(x) = \\frac{x^{3}}{4} - x', a: -2, b: 2, n0: 8,
      vista: { x0: -2.9, x1: 2.9, y0: -1.4, y1: 1.4 },
      tipo: 'numero', risposta: 0, toll: 0.1, trappola: 2,
      compito: '$f(x) = \\frac{x^{3}}{4} - x$ da $-2$ a 2: una pozza e un buco. Quanta acqua **netta**? Tolleranza 0,1.',
      integraleTex: () => '\\int_{-2}^{2}\\left(\\frac{x^{3}}{4}-x\\right)dx = \\left[\\frac{x^{4}}{16}-\\frac{x^{2}}{2}\\right]_{-2}^{2} = (1-2)-(1-2) = 0',
      commento: 'Zero, e si poteva dirlo senza conti: la funzione è dispari. Infatti f(−x) = −f(x), quindi ogni pozza a sinistra ha il suo buco identico a destra. La simmetria rispetto all\'origine, su un intervallo simmetrico, azzera sempre l\'integrale.',
      aiuto: 'Prima di calcolare, guarda la simmetria: girando il disegno di mezzo giro attorno all\'origine, la pozza va a finire esattamente sul buco.'
    },
    {
      f: x => 1 + x * x / 4, fTex: 'f(x) = 1 + \\frac{x^{2}}{4}', a: 0, b: 4, n0: 1,
      vista: { x0: -0.8, x1: 5.0, y0: -1.2, y1: 5.8 },
      tipo: 'enne', nMin: 8, esatta: 28 / 3,
      compito: 'Torna $f(x) = 1 + \\frac{x^{2}}{4}$ da 0 a 4, la cui area esatta è $\\frac{28}{3} \\approx 9{,}33$. Quanti rettangoli bastano perché la somma disti meno di 0,05 dall\'area? Scegli $n$ con i pulsanti e premi Verifica.',
      integraleTex: () => '\\int_{0}^{4}\\left(1+\\frac{x^{2}}{4}\\right)dx = \\left[x+\\frac{x^{3}}{12}\\right]_{0}^{4} = \\frac{28}{3} \\approx 9{,}33',
      commento: info => info.n === 8
        ? 'Otto: la somma fa 9,3125 contro 9,3333, distanza 0,02. Il punto medio è furbo, perché su ogni rettangolo perde da una parte quello che guadagna dall\'altra; con quattro rettangoli lo scarto era 0,08, cioè quattro volte tanto. Raddoppiare n divide l\'errore per quattro.'
        : 'Passa, ma erano più del necessario: ne bastavano 8, che danno già 0,02 di scarto. Raddoppiando i rettangoli l\'errore si divide per quattro, quindi si arriva sotto la soglia in fretta.',
      aiuto: 'Confronta la somma scritta qui sotto con 9,33 e guarda di quanto sbaglia: passando da n a 2n l\'errore si divide per 4. Da 4 rettangoli in poi il conto è breve.'
    }
  ];

  /* consegne brevi per il telefono in verticale (f e [a; b] sono già scritti sotto): la consegna
     intera si legge nel «?». null = la consegna è già corta. */
  const BREVI = [
    'Bordo piatto da 0 a 3: quanta acqua ci sta? Tolleranza 0,05.',
    null,
    'Infittisci i rettangoli, leggi la somma e scrivi l\'area. Tolleranza 0,3.',
    'Un arco di parabola da $-2$ a 2: quanta acqua? Tolleranza 0,3.',
    null,
    'Fino a $2\\pi$ la seconda gobba scende sotto il fondo. Quanta acqua **netta**? Tolleranza 0,1.',
    'Trascina la parete $b$ finché l\'acqua vale 9, poi premi Verifica.',
    'Trascina la parete $a$ finché l\'acqua vale 6, poi premi Verifica. $a$ può andare sotto zero.',
    'Una pozza e un buco: quanta acqua **netta**? Tolleranza 0,1.',
    'Scegli $n$ perché la somma disti meno di 0,05 dall\'area esatta, $\\frac{28}{3} \\approx 9{,}33$.'
  ];

  /* ---------- i bordi della modalità libera (con la primitiva, per scrivere l'integrale esatto) ---------- */
  const BORDI = [
    { f: () => 2, fTex: 'f(x) = 2', F: '2x', vista: { x0: -3.8, x1: 3.8, y0: -1.2, y1: 3.4 } },
    { f: x => x, fTex: 'f(x) = x', F: '\\frac{x^{2}}{2}', vista: { x0: -3.8, x1: 3.8, y0: -3.9, y1: 3.9 } },
    { f: x => x * x, fTex: 'f(x) = x^{2}', F: '\\frac{x^{3}}{3}', vista: { x0: -3.3, x1: 3.3, y0: -1.6, y1: 11.4 } },
    { f: x => 4 - x * x, fTex: 'f(x) = 4 - x^{2}', F: '4x - \\frac{x^{3}}{3}', vista: { x0: -3.3, x1: 3.3, y0: -7.3, y1: 4.9 } },
    { f: x => 1 + x * x / 4, fTex: 'f(x) = 1 + \\frac{x^{2}}{4}', F: 'x + \\frac{x^{3}}{12}', vista: { x0: -3.8, x1: 3.8, y0: -1.1, y1: 4.9 } },
    { f: x => x * x * x / 4 - x, fTex: 'f(x) = \\frac{x^{3}}{4} - x', F: '\\frac{x^{4}}{16} - \\frac{x^{2}}{2}', vista: { x0: -3.1, x1: 3.1, y0: -4.4, y1: 4.4 } },
    { f: Math.sin, fTex: 'f(x) = \\sin x', F: '-\\cos x', pi: true, vista: { x0: -0.5, x1: 7.1, y0: -1.35, y1: 1.35 } },
    { f: Math.cos, fTex: 'f(x) = \\cos x', F: '\\sin x', pi: true, vista: { x0: -0.5, x1: 7.1, y0: -1.35, y1: 1.35 } }
  ];

  COMPASSO.registraLab({
    id: 'vasca',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-vasca')) { const s = document.createElement('style'); s.id = 'stile-lab-vasca'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-vasca');
      radice.innerHTML = `
        <div class="lab-layout">
          <div class="lab-scena">
            <div class="lab-aiuto" hidden data-scorre><p class="consegna" hidden></p><p class="testo-aiuto"></p><button type="button" class="btn piccolo m-chiudi">Ho capito</button></div>
          </div>
          <div class="lab-lato">
            <div class="lab-livelli" role="group" aria-label="Livelli"><button type="button" class="btn piccolo lab-libero" aria-pressed="false" title="Modalità libera: nessuna domanda, la vasca la scegli tu">Libero</button></div>
            <div class="compito"></div>
            <div class="lab-parametri" hidden>
              <div class="lab-param bordo" data-p="f"><button type="button" class="btn piccolo" data-d="-1" aria-label="bordo precedente">◀</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="bordo successivo">▶</button></div>
              <div class="lab-param" data-p="a"><span class="nome">${ctx.tex('a')}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="parete a a sinistra">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="parete a a destra">+</button></div>
              <div class="lab-param" data-p="b"><span class="nome">${ctx.tex('b')}</span><button type="button" class="btn piccolo" data-d="-1" aria-label="parete b a sinistra">−</button><output></output><button type="button" class="btn piccolo" data-d="1" aria-label="parete b a destra">+</button></div>
            </div>
            <div class="dati"></div>
            <div class="esatto" hidden></div>
            <div class="lab-messaggio" aria-live="polite"></div>
            <div class="lab-barra">
              <span class="rettangoli"><button type="button" class="btn piccolo m-meno" aria-label="Meno rettangoli" title="Meno rettangoli">−</button><span class="conta-n" aria-live="polite">4</span><button type="button" class="btn piccolo m-piu" aria-label="Più rettangoli" title="Più rettangoli">+</button></span>
              <span class="gruppo-risposta">
                <input type="text" class="risposta" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="?" aria-label="L'area che hai trovato">
                <button type="button" class="btn primario m-verifica">Verifica</button>
              </span>
            </div>
            <div class="lab-barra">
              <button type="button" class="btn piccolo m-svela" disabled title="Mostra l'integrale esatto: prima però prova">Svela</button>
              <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
              <button type="button" class="btn piccolo m-casuale" hidden>Casuale</button>
              <button type="button" class="btn piccolo m-aiuto" aria-label="Come si gioca">?</button>
            </div>
            <div class="legenda">
              <span><i class="q-acqua"></i> acqua = area +</span>
              <span><i class="q-buco"></i> buco = area −</span>
              <span><i class="q-rett"></i> rettangoli</span>
            </div>
          </div>
        </div>`;

      const q = s => radice.querySelector(s);
      const scena = q('.lab-scena'), aiutoEl = q('.lab-aiuto');
      const compitoEl = q('.compito'), datiEl = q('.dati');
      const esattoEl = q('.esatto'), msg = q('.lab-messaggio');
      const contaN = q('.conta-n'), inp = q('.risposta'), gruppoRisp = q('.gruppo-risposta');
      const bMeno = q('.m-meno'), bPiu = q('.m-piu'), bVer = q('.m-verifica');
      const bSvela = q('.m-svela'), bRic = q('.m-ricomincia'), bAiuto = q('.m-aiuto'), bCasuale = q('.m-casuale');
      const livelliEl = q('.lab-livelli'), bLibero = q('.lab-libero'), parametriEl = q('.lab-parametri');

      /* ---------- scena ---------- */
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H_MIN, preserveAspectRatio: 'xMidYMid meet', role: 'img', 'aria-label': 'Una vasca il cui bordo è il grafico di una funzione, riempita d\'acqua fino alla curva' });
      scena.insertBefore(svg, aiutoEl);
      const fondoScena = el('rect', { class: 'piano-fondo', x: 4, y: 4, width: W - 8, rx: 14 });
      svg.appendChild(fondoScena);
      const gAssi = el('g'), gAcqua = el('g'), gRett = el('g'), gVasca = el('g'), gCurva = el('g'), gMan = el('g');
      [gAssi, gAcqua, gRett, gVasca, gCurva, gMan].forEach(g => svg.appendChild(g));

      /* ---------- stato ---------- */
      let livello = 0, a = 0, b = 1, n = 4, V = LIVELLI[0].vista, L = LIVELLI[0];
      let tentativi = 0, finito = false, svelato = false, trascino = null, raf = null;
      let libero = false, salvato = null, iBordo = 0;
      /* geometria che dipende dallo spazio */
      let H = H_MIN, kSc = 1, ML = 40, MB = 56, LARG = W - 40 - MR, ALT = H_MIN - MT - 56, Y_RAIL = H_MIN - 38;
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max.apply(null, completati) + 1 : 0;
      if (!(livello >= 0) || livello >= LIVELLI.length) livello = 0;

      const PX = x => ML + (x - V.x0) / (V.x1 - V.x0) * LARG;
      const PY = y => MT + (V.y1 - y) / (V.y1 - V.y0) * ALT;
      const XW = px => V.x0 + (px - ML) / LARG * (V.x1 - V.x0);

      function conMate(s) {
        return s.split('$').map((p, i) => i % 2 ? '<span class="in-riga">' + ctx.tex(p.replace(/\\frac/g, '\\dfrac')) + '</span>'
          : p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')).join('');
      }
      function messaggio(t, cls) { msg.innerHTML = t; msg.className = 'lab-messaggio' + (cls ? ' ' + cls : ''); }
      function pulisci() { if (!finito && !libero && msg.className !== 'lab-messaggio') messaggio('', ''); }
      function scuoti() { inp.classList.remove('sbagliata'); void inp.offsetWidth; inp.classList.add('sbagliata'); }
      /* estremi nei bordi col π: multipli di π/4 scritti come frazioni di π */
      const passoPareti = () => (libero && L.pi ? PI / 4 : 0.5);
      function testoPi(v) {
        const k = Math.round(v / (PI / 4)); if (!k) return '0';
        const g = [1, 2, 4].find(d => k % (4 / d) === 0), num = k / (4 / g), s = num < 0 ? '−' : '', m = Math.abs(num);
        return s + (m === 1 ? '' : m) + 'π' + (g === 1 ? '' : '/' + g);
      }
      function texPi(v) {
        const k = Math.round(v / (PI / 4)); if (!k) return '0';
        const g = [1, 2, 4].find(d => k % (4 / d) === 0), num = k / (4 / g), m = Math.abs(num);
        const corpo = (m === 1 ? '' : m) + '\\pi';
        return (num < 0 ? '-' : '') + (g === 1 ? corpo : '\\frac{' + corpo + '}{' + g + '}');
      }
      const testoEstremo = v => (libero && L.pi ? testoPi(v) : fmt(v, intero(v) ? 0 : 1));
      const texEstremo = v => (libero && L.pi ? texPi(v) : estremo(v));

      /* ---------- assi ---------- */
      function passoTacche(span) { const c = [0.25, 0.5, 1, 2, 5, 10, 20, 50]; for (let i = 0; i < c.length; i++) if (span / c[i] <= 7) return c[i]; return 100; }
      /* il margine sotto il piano: col binario delle pareti mobili serve più spazio */
      function margini() {
        MB = Math.round((mobili() ? 56 : 30) * kSc); Y_RAIL = H - Math.round(38 * kSc);
        LARG = W - ML - MR; ALT = H - MT - MB;
      }
      function disegnaAssi() {
        margini();
        svuota(gAssi);
        const y0 = PY(0), dy = 20 * kSc;
        gAssi.appendChild(el('line', { class: 'asse', x1: ML - 10, y1: y0, x2: W - MR + 4, y2: y0 }));
        gAssi.appendChild(el('path', { d: 'M' + (W - MR + 11) + ' ' + y0 + ' l-9 -5 v10 z', fill: 'var(--testo2)', opacity: .85 }));
        gAssi.appendChild(el('text', { class: 'nome-asse', x: W - MR + 2, y: y0 + dy + 1 }, 'x'));
        const dentroY = V.x0 < 0 && V.x1 > 0, xa = dentroY ? PX(0) : ML;
        if (dentroY) {
          gAssi.appendChild(el('line', { class: 'asse', x1: xa, y1: MT + ALT + 6, x2: xa, y2: MT - 4 }));
          gAssi.appendChild(el('path', { d: 'M' + xa + ' ' + (MT - 11) + ' l-5 9 h10 z', fill: 'var(--testo2)', opacity: .85 }));
          gAssi.appendChild(el('text', { class: 'nome-asse', x: xa + 8, y: MT + 8 + 6 * kSc }, 'y'));
        }
        /* tacche sull'asse x */
        if (L.pi) {
          const qq = PI / 2, nomi = { 1: 'π/2', 2: 'π', 3: '3π/2', 4: '2π' };
          for (let k = 1; k * qq <= V.x1 + 1e-9; k++) {
            const X = PX(k * qq);
            if (X > W - MR - 16 * kSc) continue;
            gAssi.appendChild(el('line', { class: 'tacca', x1: X, y1: y0 - 4, x2: X, y2: y0 + 4 }));
            gAssi.appendChild(el('text', { class: 'numero', x: X, y: y0 + dy, 'text-anchor': 'middle' }, nomi[k] || (k + 'π/2')));
          }
        } else {
          const p = passoTacche((V.x1 - V.x0) * kSc);
          for (let k = Math.ceil(V.x0 / p - 1e-9); k <= Math.floor(V.x1 / p + 1e-9); k++) {
            const x = k * p; if (Math.abs(x) < 1e-9) continue;
            const X = PX(x);
            if (X > W - MR - 16 * kSc) continue;   /* lì c'è il nome dell'asse */
            gAssi.appendChild(el('line', { class: 'tacca', x1: X, y1: y0 - 4, x2: X, y2: y0 + 4 }));
            gAssi.appendChild(el('text', { class: 'numero', x: X, y: y0 + dy, 'text-anchor': 'middle' }, fmt(x, intero(x) ? 0 : 1)));
          }
        }
        /* tacche sull'asse y: più fitte se la scena è alta */
        const py = passoTacche((V.y1 - V.y0) * 300 / ALT * kSc);
        for (let k = Math.ceil(V.y0 / py - 1e-9); k <= Math.floor(V.y1 / py + 1e-9); k++) {
          const y = k * py; if (Math.abs(y) < 1e-9) continue;
          const Y = PY(y);
          gAssi.appendChild(el('line', { class: 'tacca', x1: xa - 4, y1: Y, x2: xa + 4, y2: Y }));
          gAssi.appendChild(el('text', { class: 'numero', x: xa - 8, y: Y + 5, 'text-anchor': 'end' }, fmt(y, intero(y) ? 0 : 1)));
        }
        if (dentroY) gAssi.appendChild(el('text', { class: 'numero', x: xa - 8, y: y0 + dy, 'text-anchor': 'end' }, '0'));
      }

      /* ---------- vasca, acqua, rettangoli ---------- */
      function disegnaScena() {
        const f = L.f, y0 = PY(0);
        /* acqua e buchi */
        svuota(gAcqua);
        regioni(f, a, b).forEach(r => {
          const pts = r.pts;
          let d = 'M' + PX(pts[0].x).toFixed(1) + ' ' + y0.toFixed(1);
          for (let i = 0; i < pts.length; i++) d += ' L' + PX(pts[i].x).toFixed(1) + ' ' + PY(pts[i].y).toFixed(1);
          d += ' L' + PX(pts[pts.length - 1].x).toFixed(1) + ' ' + y0.toFixed(1) + ' Z';
          gAcqua.appendChild(el('path', { class: r.s > 0 ? 'acqua' : 'buco', d: d }));
        });
        /* rettangoli col punto medio */
        svuota(gRett);
        const h = (b - a) / n, sw = n > 32 ? .6 : (n > 8 ? 1 : 1.6);
        for (let i = 0; i < n; i++) {
          const xl = a + i * h, m = xl + h / 2, alt = f(m);
          const X = PX(xl), X2 = PX(xl + h), Y = PY(alt);
          gRett.appendChild(el('rect', {
            class: alt < 0 ? 'rett giu' : 'rett', x: Math.min(X, X2), y: Math.min(y0, Y),
            width: Math.abs(X2 - X), height: Math.max(.8, Math.abs(Y - y0)), 'stroke-width': sw
          }));
          if (n <= 8) gRett.appendChild(el('circle', { class: 'punto-medio', cx: (X + X2) / 2, cy: Y, r: 2.6 }));
        }
        /* fondo e pareti */
        svuota(gVasca);
        gVasca.appendChild(el('line', { class: 'fondo', x1: PX(a), y1: y0, x2: PX(b), y2: y0 }));
        const cime = {};
        ['a', 'b'].forEach(k => {
          const x = k === 'a' ? a : b, Y = PY(f(x));
          let cima = Y + (Y <= y0 ? -10 : 10);
          if (Math.abs(Y - y0) < 16) cima = y0 - 20;
          gVasca.appendChild(el('line', { class: 'parete', x1: PX(x), y1: y0, x2: PX(x), y2: cima }));
          cime[k] = cima;
        });
        /* la curva: tratteggiata fuori dalla vasca, spessa sul bordo */
        svuota(gCurva);
        /* fuori dalla scena la curva si interrompe (non deve uscire dallo spazio del laboratorio) */
        let d1 = '', aperto = false;
        for (let i = 0; i <= 320; i++) {
          const x = V.x0 + (V.x1 - V.x0) * i / 320, Y = PY(f(x));
          if (!(Y > 8 && Y < MT + ALT + 8)) { aperto = false; continue; }
          d1 += (aperto ? ' L' : ' M') + PX(x).toFixed(1) + ' ' + Y.toFixed(1); aperto = true;
        }
        gCurva.appendChild(el('path', { class: 'curva-fuori', d: d1 }));
        let d2 = '';
        for (let i = 0; i <= 200; i++) { const x = a + (b - a) * i / 200; d2 += (i ? ' L' : 'M') + PX(x).toFixed(1) + ' ' + PY(f(x)).toFixed(1); }
        gCurva.appendChild(el('path', { class: 'curva', d: d2 }));
        /* maniglie e lettere delle pareti */
        svuota(gMan);
        const mob = mobili();
        if (mob) gMan.appendChild(el('line', { class: 'binario', x1: ML, y1: Y_RAIL, x2: W - MR, y2: Y_RAIL }));
        ['a', 'b'].forEach(k => {
          const x = k === 'a' ? a : b, X = PX(x);
          if (mob && mob[k]) {
            gMan.appendChild(el('line', { class: 'guida', x1: X, y1: y0, x2: X, y2: Y_RAIL - 13 * kSc }));
            const g = el('g', { class: 'maniglia' + (trascino === k ? ' presa' : ''), transform: 'translate(' + X + ',' + Y_RAIL + ')' + (kSc === 1 ? '' : ' scale(' + kSc + ')') });
            g.appendChild(el('circle', { class: 'alone', cx: 0, cy: 0, r: 24 }));
            g.appendChild(el('circle', { class: 'corpo', cx: 0, cy: 0, r: 13 }));
            g.appendChild(el('text', { class: 'nome', x: 0, y: 5, 'text-anchor': 'middle' }, k));
            gMan.appendChild(g);
            /* l'etichetta sotto la maniglia: vicino ai bordi si sposta dentro, per non uscire dalla scena */
            const et = el('text', { class: 'numero', x: X, y: Y_RAIL + 27 * kSc, 'text-anchor': X < 70 ? 'start' : (X > W - 70 ? 'end' : 'middle') }, k + ' = ' + testoEstremo(x));
            if (X < 70) et.setAttribute('x', Math.max(10, X - 12 * kSc)); else if (X > W - 70) et.setAttribute('x', Math.min(W - 10, X + 12 * kSc));
            gMan.appendChild(et);
          } else {
            gMan.appendChild(el('text', { class: 'etichetta-parete', x: X + (k === 'a' ? -12 : 12), y: cime[k] - 4, 'text-anchor': 'middle' }, k));
          }
        });
      }

      /* riempimento: l'acqua sale dal fondo, mezzo secondo */
      function animaRiempimento() {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        const y0 = PY(0), t0 = performance.now(), dur = 450;
        const passo = now => {
          const t = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - t, 3);
          gAcqua.setAttribute('transform', 'translate(0,' + y0.toFixed(1) + ') scale(1,' + Math.max(k, .001).toFixed(4) + ') translate(0,' + (-y0).toFixed(1) + ')');
          if (t < 1) { raf = requestAnimationFrame(passo); return; }
          raf = null; gAcqua.removeAttribute('transform');
        };
        raf = requestAnimationFrame(passo);
      }
      function fermaAnimazione() { if (raf) { cancelAnimationFrame(raf); raf = null; gAcqua.removeAttribute('transform'); } }

      /* ---------- il ponte con la matematica scritta ---------- */
      function sommaOra() { return sommaMedi(L.f, a, b, n); }
      function integraleLibero() {   /* ∫ scritto con la primitiva del bordo scelto */
        const corpo = L.fTex.replace('f(x) = ', ''), val = simpson(L.f, a, b, 2000);
        const dentro = /[+-]/.test(corpo.replace(/^-/, '')) ? '\\left(' + corpo + '\\right)' : corpo;
        const ea = texEstremo(a), eb = texEstremo(b);
        return '\\int_{' + ea + '}^{' + eb + '} ' + dentro + '\\,dx = \\left[' + L.F + '\\right]_{' + ea + '}^{' + eb + '} ' + (intero(val) || Math.abs(val) < 5e-4 ? '= ' : '\\approx ') + texVal(Math.abs(val) < 5e-4 ? 0 : val, 2);
      }
      function aggiornaDati() {
        const inter = (!libero && L.intervalloTex) || ('[\\,' + texEstremo(a) + ';\\ ' + texEstremo(b) + '\\,]');
        datiEl.innerHTML =
          (libero ? '' : '<span>' + ctx.tex(L.fTex.replace(/\\frac/g, '\\dfrac')) + '</span>') +
          (libero ? '' : '<span>' + ctx.tex('[\\,a;\\ b\\,] = ' + inter) + '</span>') +
          '<span class="somma">somma dei rettangoli ≈ ' + ctx.tex(texNum(sommaOra(), 2)) + '</span>';
        contaN.textContent = 'n = ' + n;
        if (libero) esattoEl.innerHTML = ctx.tex('\\displaystyle ' + integraleLibero());
        else if (svelato) esattoEl.innerHTML = ctx.tex('\\displaystyle ' + L.integraleTex(a, b));
        bMeno.disabled = n <= ENNE[0];
        bPiu.disabled = n >= ENNE[ENNE.length - 1];
      }
      function svela() {
        svelato = true; esattoEl.hidden = false; bSvela.disabled = true;
        esattoEl.innerHTML = ctx.tex('\\displaystyle ' + L.integraleTex(a, b));
      }

      /* ---------- verifica ---------- */
      function vinci(testo, info) {
        finito = true;
        messaggio('<span class="vinto">' + testo + '</span>', 'ok');
        ctx.completato(livello); aggiornaLivelli();
        if (!svelato) svela();
        bVer.disabled = true; inp.disabled = true;
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        const c = typeof L.commento === 'function' ? L.commento(info) : L.commento;
        ctx.zenone(c, { espressione: tentativi <= 1 ? 'orgoglioso' : 'felice', durata: 11000 });
      }
      function verifica() {
        if (finito || libero) return;
        tentativi++; bSvela.disabled = svelato;
        if (L.tipo === 'numero') {
          const v = leggiNumero(inp.value);
          if (v === null) { messaggio('Scrivi un numero: va bene anche una frazione, per esempio 28/3.', 'no'); scuoti(); return; }
          if (Math.abs(v - L.risposta) <= L.toll) {
            vinci('Giusto: l\'acqua vale ' + ctx.tex(texVal(L.risposta, 2)) + '.', { v: v });
            return;
          }
          messaggio('Non è ' + fmt(v, intero(v) ? 0 : 2) + '.', 'no'); scuoti();
          ctx.zenone(diagnosiNumero(L, v), { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
          return;
        }
        if (L.tipo === 'pareti') {
          if (L.ok(a, b)) {
            vinci('Giusto: fra ' + fmt(a, intero(a) ? 0 : 1) + ' e ' + fmt(b, intero(b) ? 0 : 1) + ' l\'acqua vale ' + ctx.tex(texVal(L.bersaglio, 2)) + '.', { a: a, b: b });
            return;
          }
          const acqua = simpson(L.f, a, b, 2000);
          messaggio('Non ancora: qui l\'acqua non fa ' + fmt(L.bersaglio, 0) + '.', 'no');
          ctx.zenone(diagnosiPareti(L, acqua), { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
          return;
        }
        /* tipo 'enne' */
        const scarto = Math.abs(sommaOra() - L.esatta);
        if (n >= L.nMin) { vinci('Con ' + ctx.tex('n = ' + n) + ' lo scarto è ' + ctx.tex(texNum(scarto, 3)) + ', meno di 0,05.', { n: n }); return; }
        messaggio('Con ' + ctx.tex('n = ' + n) + ' la somma dista ancora ' + ctx.tex(texNum(scarto, 3)) + ' dall\'area.', 'no');
        ctx.zenone('Non bastano: ' + fmt(scarto, 3) + ' è più di 0,05. Raddoppia i rettangoli e guarda cosa succede allo scarto: non cala a caso.', { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
      }
      function diagnosiNumero(L, v) {
        if (L.trappola != null && Math.abs(v - L.trappola) <= Math.max(L.toll, .15))
          return 'Hai misurato l\'acqua e il buco come se fossero la stessa cosa. Guarda i colori: il pezzo rosso sta sotto il fondo, lì l\'acqua non c\'è, e nell\'integrale si conta col meno. Quanto resta se togli invece di sommare?';
        if (Math.abs(v - areaAssoluta(L.f, a, b)) <= Math.max(L.toll, .15) && Math.abs(areaAssoluta(L.f, a, b) - L.risposta) > L.toll)
          return 'Hai sommato tutte le aree in positivo. Sotto il fondo però l\'acqua manca: quel pezzo va sottratto.';
        const somma = sommaOra();
        if (Math.abs(v - somma) <= .02 && Math.abs(somma - L.risposta) > L.toll)
          return 'Hai copiato la somma dei rettangoli, ma con ' + (n === 1 ? 'un rettangolo solo' : n + ' rettangoli') + ' è ancora una stima grossolana: infittiscili e rileggi.';
        return (v > L.risposta ? 'Troppa acqua: la vasca ne tiene meno di così. ' : 'Troppo poca: nella vasca ce ne sta di più. ')
          + 'Aumenta i rettangoli e usa la somma come guida, poi arrotonda dentro la tolleranza.';
      }
      function diagnosiPareti(L, acqua) {
        const meno = acqua < L.bersaglio;
        let t = meno ? 'Così l\'acqua è ancora poca. ' : 'Così l\'acqua è troppa. ';
        if (L.mobili.b) t += 'Prova a scrivere l\'integrale con b al posto del numero: viene b³/3, e ti serve che faccia ' + L.bersaglio + '.';
        else t += 'Scrivi l\'integrale da a a 4: viene 8 − a²/2, e ti serve che faccia ' + L.bersaglio + '. Ricorda che il pezzo a sinistra dello zero è un buco e toglie acqua.';
        return t;
      }

      /* ---------- rettangoli ---------- */
      function cambiaN(d) {
        const i = ENNE.indexOf(n) + d;
        if (i < 0 || i >= ENNE.length) return;
        n = ENNE[i]; pulisci(); disegnaScena(); aggiornaDati();
      }

      /* ---------- pareti mobili: nei livelli quelle previste, in modalità libera tutte e due ---------- */
      function limitiLiberi() {
        const p = passoPareti();
        return [Math.ceil((V.x0 + .15) / p - 1e-9) * p, Math.floor((V.x1 - .15) / p + 1e-9) * p];
      }
      function mobili() { if (libero) { const l = limitiLiberi(); return { a: l, b: l }; } return L.mobili || null; }
      function sposta(k, v) {   /* porta la parete k in v (già sul passo), rispettando i limiti e l'ordine */
        const lim = mobili()[k], p = passoPareti();
        v = Math.max(lim[0], Math.min(lim[1], v));
        if (k === 'a') v = Math.min(v, b - p); else v = Math.max(v, a + p);
        if (Math.abs(v - (k === 'a' ? a : b)) < 1e-9) return false;
        if (k === 'a') a = v; else b = v;
        pulisci(); disegnaScena(); aggiornaDati();
        if (libero) { osserva(); aggiornaParametri(); }
        return true;
      }
      /* dal dito alle coordinate del viewBox con la matrice dello schermo (con meet il rettangolo sbaglia) */
      const coord = ev => { const m = svg.getScreenCTM(); if (!m) return { x: -999, y: -999 }; const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse()); return { x: p.x, y: p.y }; };
      svg.addEventListener('pointerdown', ev => {
        aiutoEl.hidden = true;
        const mob = mobili();
        if (!mob || (finito && !libero)) return;
        const c = coord(ev);
        let scelta = null, best = 1e9;
        for (const k in mob) {
          const X = PX(k === 'a' ? a : b);
          const dMan = Math.hypot(c.x - X, c.y - Y_RAIL);
          const dPar = (c.y >= MT && c.y <= MT + ALT + 12) ? Math.abs(c.x - X) : 1e9;
          const d = Math.min(dMan, dPar);
          if (d < best) { best = d; scelta = k; }
        }
        if (best > 55 * kSc) return;
        trascino = scelta; fermaAnimazione(); disegnaScena();
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      });
      svg.addEventListener('pointermove', ev => {
        if (!trascino) return;
        const p = passoPareti();
        sposta(trascino, Math.round(XW(coord(ev).x) / p) * p);
      });
      const molla = () => { if (!trascino) return; trascino = null; disegnaScena(); };
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('pointerleave', molla);

      /* ---------- livelli ---------- */
      function aggiornaLivelli() {
        const fatti = ctx.stato().livelli, sblocco = fatti.length ? Math.max(...fatti) + 1 : 0;
        [...livelliEl.querySelectorAll('.lab-pallino')].forEach((p, k) => {
          p.classList.toggle('fatto', fatti.includes(k));
          p.classList.toggle('attivo', !libero && k === livello);
          p.disabled = k > sblocco && k !== livello;
          p.setAttribute('aria-current', !libero && k === livello ? 'step' : 'false');
        });
        bLibero.setAttribute('aria-pressed', libero);
      }
      function mostraControlli() {
        gruppoRisp.hidden = libero; bSvela.hidden = libero;
        bCasuale.hidden = !libero; parametriEl.hidden = !libero;
        esattoEl.hidden = libero ? false : !svelato;
        radice.classList.toggle('in-libero', libero);
      }
      function avviaLivello(k) {
        libero = false; salvato = null;
        livello = k; trascino = null; L = LIVELLI[k];
        V = L.vista; a = L.a; b = L.b; n = L.n0;
        tentativi = 0; finito = false; svelato = false; aiutoEl.hidden = true;
        compitoEl.innerHTML = (BREVI[k] ? '<span class="c-breve">' + conMate(BREVI[k]) + '</span>' : '') + '<span class="c-lungo">' + conMate(L.compito) + '</span>';
        esattoEl.innerHTML = '';
        messaggio('', '');
        inp.value = ''; inp.disabled = false; inp.classList.remove('sbagliata');
        inp.hidden = L.tipo !== 'numero';
        bVer.disabled = false;
        bVer.textContent = L.tipo === 'numero' ? 'Verifica' : (L.tipo === 'pareti' ? 'Verifica le pareti' : 'Verifica n');
        bSvela.disabled = true; bRic.textContent = 'Ricomincia';
        mostraControlli(); aggiornaLivelli();
        disegnaAssi(); disegnaScena(); aggiornaDati(); animaRiempimento();
      }
      function aiuto() {
        return 'L\'acqua è l\'area: quanta ne sta nella vasca fra le pareti a e b. I rettangoli la misurano senza formule: ognuno è alto quanto il bordo a metà del suo passo, e più sono fitti più ricalcano la curva. Dove il bordo scende sotto il fondo l\'acqua manca: quel pezzo si conta in negativo. Il valore esatto è l\'integrale definito: si cerca una primitiva F, cioè una funzione che derivata dà f, e si fa F(b) − F(a). ' + L.aiuto;
      }

      /* ---------- modalità libera: nessuna domanda, bordo, pareti e rettangoli li sceglie lo studente ---------- */
      const AIUTO_LIBERO = 'In modalità libera non c\'è niente da indovinare. Scegli il bordo con ◀ e ▶, sposta le pareti a e b trascinandole (o con − e +) e cambia il numero di rettangoli. Sotto vedi l\'integrale scritto con la primitiva: confrontalo con la somma dei rettangoli. L\'azzurro conta positivo, il rosso negativo.';
      const bordoLibero = () => Object.assign({}, BORDI[iBordo]);
      function aggiornaParametri() {
        parametriEl.querySelector('.bordo output').innerHTML = ctx.tex(L.fTex.replace(/\\frac/g, '\\dfrac'));
        const lim = limitiLiberi(), p = passoPareti();
        ['a', 'b'].forEach(k => {
          const box = parametriEl.querySelector('[data-p="' + k + '"]'), v = k === 'a' ? a : b;
          box.querySelector('output').textContent = testoEstremo(v);
          const [giu, su] = box.querySelectorAll('button[data-d]');
          giu.disabled = k === 'a' ? v - p < lim[0] - 1e-9 : v - p < a + p - 1e-9;
          su.disabled = k === 'a' ? v + p > b - p + 1e-9 : v + p > lim[1] + 1e-9;
        });
      }
      function osserva() {   /* osservazioni neutre, mai valutazioni */
        const pos = simpson(x => Math.max(0, L.f(x)), a, b, 2000), neg = simpson(x => Math.max(0, -L.f(x)), a, b, 2000);
        let t;
        if (neg < .005) t = 'Solo acqua: l\'integrale è l\'area, ' + fmt(pos) + '.';
        else if (pos < .005) t = 'Solo buco: l\'integrale è negativo, ' + fmt(-neg) + '.';
        else t = 'Acqua ' + fmt(pos) + ' − buco ' + fmt(neg) + ' = ' + fmt(pos - neg) + '.';
        messaggio(t, '');
      }
      function nuovoBordo(aa, bb) {
        L = bordoLibero(); V = L.vista;
        a = aa != null ? aa : 0; b = bb != null ? bb : (L.pi ? PI : 2);
        trascino = null;
        disegnaAssi(); disegnaScena(); aggiornaDati(); aggiornaParametri(); osserva(); animaRiempimento();
      }
      function entraLibero() {
        salvato = { livello, a, b, n, tentativi, finito, svelato, compito: compitoEl.innerHTML, msg: msg.innerHTML, cls: msg.className, ric: bRic.textContent, inp: inp.value, inpDis: inp.disabled, verDis: bVer.disabled, svelaDis: bSvela.disabled, esatto: esattoEl.innerHTML };
        libero = true; finito = false; svelato = false; aiutoEl.hidden = true; fermaAnimazione();
        compitoEl.textContent = 'Modalità libera: scegli il bordo, sposta le pareti, cambia i rettangoli.';
        bRic.textContent = 'Ricomincia';
        mostraControlli(); aggiornaLivelli();
        nuovoBordo();
      }
      function esciLibero() {   /* si torna al livello com'era */
        const z = salvato; libero = false; salvato = null; aiutoEl.hidden = true; trascino = null; fermaAnimazione();
        livello = z.livello; L = LIVELLI[livello]; V = L.vista;
        a = z.a; b = z.b; n = z.n; tentativi = z.tentativi; finito = z.finito; svelato = z.svelato;
        compitoEl.innerHTML = z.compito; bRic.textContent = z.ric;
        inp.value = z.inp; inp.disabled = z.inpDis; bVer.disabled = z.verDis; bSvela.disabled = z.svelaDis;
        esattoEl.innerHTML = z.esatto;
        mostraControlli(); aggiornaLivelli();
        disegnaAssi(); disegnaScena(); aggiornaDati();
        messaggio(z.msg, ''); msg.className = z.cls;
      }
      function casuale() {
        const r = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
        iBordo = r(0, BORDI.length - 1);
        L = bordoLibero(); V = L.vista;
        const p = passoPareti(), lim = limitiLiberi(), passi = Math.round((lim[1] - lim[0]) / p);
        const i = r(0, passi - 2), j = r(i + 1, Math.min(passi, i + 10));
        nuovoBordo(lim[0] + i * p, lim[0] + j * p);
      }
      bLibero.addEventListener('click', () => { if (libero) esciLibero(); else entraLibero(); });
      bCasuale.addEventListener('click', casuale);
      parametriEl.addEventListener('click', ev => {
        const bt = ev.target.closest('button[data-d]'); if (!bt || !libero) return;
        const k = bt.closest('.lab-param').dataset.p, d = +bt.dataset.d;
        if (k === 'f') { iBordo = (iBordo + d + BORDI.length) % BORDI.length; nuovoBordo(); return; }
        sposta(k, (k === 'a' ? a : b) + d * passoPareti());
      });
      LIVELLI.forEach((_, k) => {
        const p = document.createElement('button'); p.type = 'button'; p.className = 'lab-pallino';
        p.setAttribute('aria-label', 'Livello ' + (k + 1)); p.innerHTML = '<span>' + (k + 1) + '</span>';
        p.addEventListener('click', () => avviaLivello(k));
        livelliEl.insertBefore(p, bLibero);
      });

      bMeno.addEventListener('click', () => { cambiaN(-1); if (libero) osserva(); });
      bPiu.addEventListener('click', () => { cambiaN(1); if (libero) osserva(); });
      bVer.addEventListener('click', verifica);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); verifica(); } });
      inp.addEventListener('input', pulisci);
      bSvela.addEventListener('click', () => { if (!svelato) svela(); });
      bRic.addEventListener('click', () => {
        if (libero) { n = 4; nuovoBordo(); return; }
        avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello);
      });
      bAiuto.addEventListener('click', () => {
        if (!aiutoEl.hidden) { aiutoEl.hidden = true; return; }
        aiutoEl.querySelector('.testo-aiuto').textContent = libero ? AIUTO_LIBERO : aiuto();
        /* se nel pannello c'è la consegna breve, quella intera si legge qui */
        const breve = compitoEl.querySelector('.c-breve'), consegna = aiutoEl.querySelector('.consegna');
        consegna.hidden = libero || !breve || getComputedStyle(breve).display === 'none';
        if (!consegna.hidden) consegna.innerHTML = conMate(L.compito);
        aiutoEl.hidden = false;
      });
      aiutoEl.querySelector('.m-chiudi').addEventListener('click', () => { aiutoEl.hidden = true; });

      /* ---------- la forma dello spazio decide l'altezza della scena e la scala delle scritte ---------- */
      function geometria() {
        const r = scena.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) return false;
        const nuova = Math.max(H_MIN, Math.min(H_MAX, Math.round(W * r.height / r.width / 10) * 10));
        const scala = Math.min(r.width / W, r.height / nuova);
        const k = Math.max(1, Math.round(12 / (15 * scala) * 100) / 100);
        if (nuova === H && k === kSc) return false;
        H = nuova; kSc = k;
        margini();
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        fondoScena.setAttribute('height', H - 8);
        svg.style.setProperty('--k', k);
        return true;
      }

      fondoScena.setAttribute('height', H - 8);
      geometria();
      avviaLivello(livello);
      const ro = new ResizeObserver(() => { if (geometria()) { disegnaAssi(); disegnaScena(); } });
      ro.observe(scena);

      return function smonta() { if (raf) cancelAnimationFrame(raf); raf = null; ro.disconnect(); };
    }
  });
})();



