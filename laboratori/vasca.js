/* Laboratorio «La vasca» — l'integrale definito come area con segno.
   Il bordo della vasca è il grafico di f, il fondo è l'asse x, le pareti sono a e b.
   L'acqua che ci sta è l'integrale: sotto il fondo l'acqua manca (buco rosso, area negativa).
   I rettangoli col punto medio la approssimano; la primitiva la calcola esatta.
   Modello di riferimento: laboratori/bilancia.js (vedi SCHEMA-LAB.md). */
(function () {
  const STILE = `
    .lab-vasca .lab-scena { max-width: 760px; margin: 0 auto; background: var(--sup2); border-radius: 12px; overflow: hidden; touch-action: none; }
    .lab-vasca .compito { max-width: 760px; margin: 0 auto; text-align: center; padding: 4px 12px 10px; font-size: .95rem; color: var(--testo2); line-height: 1.6; }
    .lab-vasca .compito .katex { font-size: 1em; }
    .lab-vasca .dati { max-width: 760px; margin: 0 auto; display: flex; gap: 6px 18px; flex-wrap: wrap; justify-content: center; align-items: baseline; padding: 10px 12px 0; font-size: .95rem; color: var(--testo2); }
    .lab-vasca .dati .katex { font-size: 1em; }
    .lab-vasca .dati .somma { color: var(--testo); font-weight: 600; }
    .lab-vasca .esatto { max-width: 760px; margin: 0 auto; padding: 8px 12px 0; overflow-x: auto; overflow-y: hidden; }
    .lab-vasca .esatto .katex-display { margin: .3em 0; }
    .lab-vasca .lab-barra { max-width: 760px; margin: 0 auto; }
    .lab-vasca .lab-messaggio { max-width: 760px; margin: 0 auto; }
    .lab-vasca .lab-barra .btn[disabled] { opacity: .35; cursor: default; }
    .lab-vasca .conta-n { min-width: 32px; text-align: center; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--testo); }
    .lab-vasca .gruppo-risposta { display: inline-flex; gap: 6px; align-items: center; }
    .lab-vasca .risposta { width: 92px; padding: 8px 10px; min-height: 40px; border-radius: 9px; border: 1px solid var(--bordo2); background: var(--sup); color: var(--testo); font-family: var(--font); font-size: 1.05rem; font-weight: 700; text-align: center; user-select: text; -webkit-user-select: text; }
    .lab-vasca .risposta.sbagliata { border-color: var(--no); animation: lab-vasca-scuoti .4s; }
    @keyframes lab-vasca-scuoti { 0%,100% { transform: none } 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }
    .lab-vasca .legenda { max-width: 760px; margin: 0 auto; display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; padding: 4px 12px 10px; font-size: .82rem; color: var(--testo2); }
    .lab-vasca .legenda span { display: inline-flex; align-items: center; gap: 5px; }
    .lab-vasca .legenda i { display: inline-block; width: 14px; height: 14px; border-radius: 3px; border: 1px solid transparent; }
    .lab-vasca .q-acqua { background: var(--s1); opacity: .45; }
    .lab-vasca .q-buco { background: var(--no); opacity: .4; }
    .lab-vasca .q-rett { border-color: var(--accento) !important; background: var(--accento-tenue); }
    .lab-vasca .vinto { display: inline-block; animation: lab-vasca-pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes lab-vasca-pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
    .lab-vasca .acqua { fill: var(--s1); fill-opacity: .32; stroke: var(--s1); stroke-opacity: .35; stroke-width: 1; }
    .lab-vasca .buco { fill: var(--no); fill-opacity: .26; stroke: var(--no); stroke-opacity: .35; stroke-width: 1; }
    .lab-vasca .curva { fill: none; stroke: var(--accento); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
    .lab-vasca .curva-fuori { fill: none; stroke: var(--testo2); stroke-width: 2; opacity: .3; stroke-dasharray: 6 6; }
    .lab-vasca .parete { stroke: var(--testo); stroke-width: 6; stroke-linecap: round; opacity: .85; }
    .lab-vasca .fondo { stroke: var(--testo); stroke-width: 5; stroke-linecap: round; opacity: .8; }
    .lab-vasca .asse { stroke: var(--testo2); stroke-width: 1.5; opacity: .85; }
    .lab-vasca .tacca { stroke: var(--testo2); stroke-width: 1.2; opacity: .7; }
    .lab-vasca .numero { font: 15px var(--font); fill: var(--testo2); opacity: .9; }
    .lab-vasca .nome-asse { font: italic 700 16px var(--font); fill: var(--testo2); }
    .lab-vasca .rett { fill: var(--accento); fill-opacity: .12; stroke: var(--accento); stroke-linejoin: round; }
    .lab-vasca .rett.giu { fill: var(--no); fill-opacity: .12; stroke: var(--no); }
    .lab-vasca .punto-medio { fill: var(--accento); }
    .lab-vasca .binario { stroke: var(--bordo2); stroke-width: 3; stroke-linecap: round; }
    .lab-vasca .guida { stroke: var(--accento); stroke-width: 1.4; stroke-dasharray: 4 5; opacity: .45; }
    .lab-vasca .etichetta-parete { font: italic 700 16px var(--font); fill: var(--testo2); }
    .lab-vasca .maniglia .alone { fill: var(--accento); opacity: 0; transition: opacity .15s; }
    .lab-vasca .maniglia.presa .alone { opacity: .25; }
    .lab-vasca .maniglia .corpo { fill: var(--accento); stroke: var(--sup); stroke-width: 2.5; }
    .lab-vasca .maniglia .nome { font: italic 700 15px var(--font); fill: #fff; }
  `;

  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a, testo) => { const e = document.createElementNS(NS, n); for (const k in a || {}) e.setAttribute(k, a[k]); if (testo != null) e.textContent = testo; return e; };
  const svuota = g => { while (g.firstChild) g.removeChild(g.firstChild); };

  /* ---------- geometria della scena ---------- */
  const W = 600, H = 340, ML = 40, MR = 22, MT = 14, MB = 56, Y_RAIL = 302;
  const LARG = W - ML - MR, ALT = H - MT - MB;
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
      commento: 'Zero. Il buco è la copia esatta della pozza: l\'acqua che c\'è di qua manca di là. L\'integrale definito non somma le aree, le conta col segno — sopra il fondo positive, sotto negative.',
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
      commento: 'Zero, e si poteva dirlo senza conti: la funzione è dispari, f(−x) = −f(x), quindi ogni pozza a sinistra ha il suo buco identico a destra. La simmetria rispetto all\'origine, su un intervallo simmetrico, azzera sempre l\'integrale.',
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

  COMPASSO.registraLab({
    id: 'vasca',
    monta(radice, ctx) {
      if (!document.getElementById('stile-lab-vasca')) { const s = document.createElement('style'); s.id = 'stile-lab-vasca'; s.textContent = STILE; document.head.appendChild(s); }
      radice.classList.add('lab-vasca');
      radice.innerHTML = `
        <div class="compito"></div>
        <div class="lab-scena"></div>
        <div class="dati"></div>
        <div class="esatto" hidden></div>
        <div class="lab-messaggio"></div>
        <div class="lab-barra">
          <button type="button" class="btn piccolo m-meno" title="Meno rettangoli">− rett.</button>
          <span class="conta-n" aria-live="polite">4</span>
          <button type="button" class="btn piccolo m-piu" title="Più rettangoli">+ rett.</button>
          <span class="gruppo-risposta">
            <input type="text" class="risposta" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="?" aria-label="L'area che hai trovato">
            <button type="button" class="btn primario m-verifica">Verifica</button>
          </span>
          <button type="button" class="btn m-svela" disabled title="Mostra l'integrale esatto: prima però prova">Svela</button>
          <button type="button" class="btn piccolo m-ricomincia">Ricomincia</button>
          <button type="button" class="btn piccolo m-aiuto">?</button>
          <span class="lab-livello"></span>
        </div>
        <div class="legenda">
          <span><i class="q-acqua"></i> acqua: area positiva</span>
          <span><i class="q-buco"></i> buco: area negativa</span>
          <span><i class="q-rett"></i> rettangoli col punto medio</span>
        </div>`;

      const scena = radice.querySelector('.lab-scena');
      const compitoEl = radice.querySelector('.compito'), datiEl = radice.querySelector('.dati');
      const esattoEl = radice.querySelector('.esatto'), msg = radice.querySelector('.lab-messaggio'), livEl = radice.querySelector('.lab-livello');
      const contaN = radice.querySelector('.conta-n'), inp = radice.querySelector('.risposta');
      const bMeno = radice.querySelector('.m-meno'), bPiu = radice.querySelector('.m-piu'), bVer = radice.querySelector('.m-verifica');
      const bSvela = radice.querySelector('.m-svela'), bRic = radice.querySelector('.m-ricomincia'), bAiuto = radice.querySelector('.m-aiuto');

      /* ---------- scena ---------- */
      const svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Una vasca il cui bordo è il grafico di una funzione, riempita d\'acqua fino alla curva' });
      scena.appendChild(svg);
      const gAssi = el('g'), gAcqua = el('g'), gRett = el('g'), gVasca = el('g'), gCurva = el('g'), gMan = el('g');
      [gAssi, gAcqua, gRett, gVasca, gCurva, gMan].forEach(g => svg.appendChild(g));

      /* ---------- stato ---------- */
      let livello = 0, a = 0, b = 1, n = 4, V = LIVELLI[0].vista;
      let tentativi = 0, finito = false, svelato = false, trascino = null, raf = null;
      const completati = ctx.stato().livelli;
      livello = completati.length ? Math.max.apply(null, completati) + 1 : 0;
      if (!(livello >= 0) || livello >= LIVELLI.length) livello = 0;

      const PX = x => ML + (x - V.x0) / (V.x1 - V.x0) * LARG;
      const PY = y => MT + (V.y1 - y) / (V.y1 - V.y0) * ALT;
      const XW = px => V.x0 + (px - ML) / LARG * (V.x1 - V.x0);

      function conMate(s) {
        return s.split('$').map((p, i) => i % 2 ? ctx.tex(p)
          : p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')).join('');
      }
      function messaggio(t, cls) { msg.innerHTML = t; msg.className = 'lab-messaggio' + (cls ? ' ' + cls : ''); }
      function pulisci() { if (!finito && msg.className !== 'lab-messaggio') messaggio('', ''); }
      function scuoti() { inp.classList.remove('sbagliata'); void inp.offsetWidth; inp.classList.add('sbagliata'); }

      /* ---------- assi ---------- */
      function passoTacche(span) { const c = [0.25, 0.5, 1, 2, 5, 10, 20, 50]; for (let i = 0; i < c.length; i++) if (span / c[i] <= 7) return c[i]; return 100; }
      function disegnaAssi() {
        svuota(gAssi);
        const L = LIVELLI[livello], y0 = PY(0);
        gAssi.appendChild(el('line', { class: 'asse', x1: ML - 10, y1: y0, x2: W - MR + 4, y2: y0 }));
        gAssi.appendChild(el('path', { d: 'M' + (W - MR + 11) + ' ' + y0 + ' l-9 -5 v10 z', fill: 'var(--testo2)', opacity: .85 }));
        gAssi.appendChild(el('text', { class: 'nome-asse', x: W - MR + 2, y: y0 + 21 }, 'x'));
        const dentroY = V.x0 < 0 && V.x1 > 0, xa = dentroY ? PX(0) : ML;
        if (dentroY) {
          gAssi.appendChild(el('line', { class: 'asse', x1: xa, y1: MT + ALT + 6, x2: xa, y2: MT - 4 }));
          gAssi.appendChild(el('path', { d: 'M' + xa + ' ' + (MT - 11) + ' l-5 9 h10 z', fill: 'var(--testo2)', opacity: .85 }));
          gAssi.appendChild(el('text', { class: 'nome-asse', x: xa + 8, y: MT + 8 }, 'y'));
        }
        /* tacche sull'asse x */
        if (L.pi) {
          const q = PI / 2, nomi = { 1: 'π/2', 2: 'π', 3: '3π/2', 4: '2π' };
          for (let k = 1; k * q <= V.x1 + 1e-9; k++) {
            const X = PX(k * q);
            gAssi.appendChild(el('line', { class: 'tacca', x1: X, y1: y0 - 4, x2: X, y2: y0 + 4 }));
            gAssi.appendChild(el('text', { class: 'numero', x: X, y: y0 + 20, 'text-anchor': 'middle' }, nomi[k] || (k + 'π/2')));
          }
        } else {
          const p = passoTacche(V.x1 - V.x0);
          for (let k = Math.ceil(V.x0 / p - 1e-9); k <= Math.floor(V.x1 / p + 1e-9); k++) {
            const x = k * p; if (Math.abs(x) < 1e-9) continue;
            const X = PX(x);
            gAssi.appendChild(el('line', { class: 'tacca', x1: X, y1: y0 - 4, x2: X, y2: y0 + 4 }));
            gAssi.appendChild(el('text', { class: 'numero', x: X, y: y0 + 20, 'text-anchor': 'middle' }, fmt(x, intero(x) ? 0 : 1)));
          }
        }
        /* tacche sull'asse y */
        const py = passoTacche(V.y1 - V.y0);
        for (let k = Math.ceil(V.y0 / py - 1e-9); k <= Math.floor(V.y1 / py + 1e-9); k++) {
          const y = k * py; if (Math.abs(y) < 1e-9) continue;
          const Y = PY(y);
          gAssi.appendChild(el('line', { class: 'tacca', x1: xa - 4, y1: Y, x2: xa + 4, y2: Y }));
          gAssi.appendChild(el('text', { class: 'numero', x: xa - 8, y: Y + 5, 'text-anchor': 'end' }, fmt(y, intero(y) ? 0 : 1)));
        }
        if (dentroY) gAssi.appendChild(el('text', { class: 'numero', x: xa - 8, y: y0 + 20, 'text-anchor': 'end' }, '0'));
      }

      /* ---------- vasca, acqua, rettangoli ---------- */
      function disegnaScena() {
        const L = LIVELLI[livello], f = L.f, y0 = PY(0);
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
        let d1 = '';
        for (let i = 0; i <= 320; i++) { const x = V.x0 + (V.x1 - V.x0) * i / 320; d1 += (i ? ' L' : 'M') + PX(x).toFixed(1) + ' ' + PY(f(x)).toFixed(1); }
        gCurva.appendChild(el('path', { class: 'curva-fuori', d: d1 }));
        let d2 = '';
        for (let i = 0; i <= 200; i++) { const x = a + (b - a) * i / 200; d2 += (i ? ' L' : 'M') + PX(x).toFixed(1) + ' ' + PY(f(x)).toFixed(1); }
        gCurva.appendChild(el('path', { class: 'curva', d: d2 }));
        /* maniglie e lettere delle pareti */
        svuota(gMan);
        const mob = L.mobili || {};
        if (L.mobili) gMan.appendChild(el('line', { class: 'binario', x1: ML, y1: Y_RAIL, x2: W - MR, y2: Y_RAIL }));
        ['a', 'b'].forEach(k => {
          const x = k === 'a' ? a : b, X = PX(x);
          if (mob[k]) {
            gMan.appendChild(el('line', { class: 'guida', x1: X, y1: y0, x2: X, y2: Y_RAIL - 13 }));
            const g = el('g', { class: 'maniglia' + (trascino === k ? ' presa' : ''), transform: 'translate(' + X + ',' + Y_RAIL + ')' });
            g.appendChild(el('circle', { class: 'alone', cx: 0, cy: 0, r: 24 }));
            g.appendChild(el('circle', { class: 'corpo', cx: 0, cy: 0, r: 13 }));
            g.appendChild(el('text', { class: 'nome', x: 0, y: 5, 'text-anchor': 'middle' }, k));
            gMan.appendChild(g);
            gMan.appendChild(el('text', { class: 'numero', x: X, y: Y_RAIL + 26, 'text-anchor': 'middle' }, k + ' = ' + fmt(x, intero(x) ? 0 : 1)));
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
      function sommaOra() { return sommaMedi(LIVELLI[livello].f, a, b, n); }
      function aggiornaDati() {
        const L = LIVELLI[livello];
        const inter = L.intervalloTex || ('[\\,' + estremo(a) + ';\\ ' + estremo(b) + '\\,]');
        datiEl.innerHTML =
          '<span>' + ctx.tex(L.fTex) + '</span>' +
          '<span>' + ctx.tex('[\\,a;\\ b\\,] = ' + inter) + '</span>' +
          '<span>' + ctx.tex('n = ' + n) + '</span>' +
          '<span class="somma">somma dei rettangoli ≈ ' + ctx.tex(texNum(sommaOra(), 2)) + '</span>';
        contaN.textContent = n;
        if (svelato) esattoEl.innerHTML = ctx.tex(L.integraleTex(a, b), true);
        bMeno.disabled = n <= ENNE[0];
        bPiu.disabled = n >= ENNE[ENNE.length - 1];
        livEl.textContent = 'Livello ' + (livello + 1) + ' di ' + LIVELLI.length;
      }
      function svela() {
        svelato = true; esattoEl.hidden = false; bSvela.disabled = true;
        esattoEl.innerHTML = ctx.tex(LIVELLI[livello].integraleTex(a, b), true);
      }

      /* ---------- verifica ---------- */
      function vinci(testo, info) {
        finito = true;
        messaggio('<span class="vinto">' + testo + '</span>', 'ok');
        ctx.completato(livello);
        if (!svelato) svela();
        bVer.disabled = true; inp.disabled = true;
        bRic.textContent = livello < LIVELLI.length - 1 ? 'Prossimo livello ▶' : 'Ricomincia dal primo';
        const L = LIVELLI[livello];
        const c = typeof L.commento === 'function' ? L.commento(info) : L.commento;
        ctx.zenone(c, { espressione: tentativi <= 1 ? 'orgoglioso' : 'felice', durata: 11000 });
      }
      function verifica() {
        if (finito) return;
        const L = LIVELLI[livello];
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
        ctx.zenone('Non bastano: ' + fmt(scarto, 3) + ' è più di 0,05. Raddoppia i rettangoli e guarda cosa succede allo scarto — non cala a caso.', { tipo: 'suggerimento', espressione: 'pensa', durata: 9000 });
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
        if (LIVELLI[livello].mobili.b) t += 'Prova a scrivere l\'integrale con b al posto del numero: viene b³/3, e ti serve che faccia ' + L.bersaglio + '.';
        else t += 'Scrivi l\'integrale da a a 4: viene 8 − a²/2, e ti serve che faccia ' + L.bersaglio + '. Ricorda che il pezzo a sinistra dello zero è un buco e toglie acqua.';
        return t;
      }

      /* ---------- rettangoli ---------- */
      function cambiaN(d) {
        const i = ENNE.indexOf(n) + d;
        if (i < 0 || i >= ENNE.length) return;
        n = ENNE[i]; pulisci(); disegnaScena(); aggiornaDati();
      }

      /* ---------- maniglie col dito ---------- */
      const coord = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * W, y: (ev.clientY - r.top) / r.height * H }; };
      svg.addEventListener('pointerdown', ev => {
        const L = LIVELLI[livello];
        if (!L.mobili || finito) return;
        const c = coord(ev);
        let scelta = null, best = 1e9;
        for (const k in L.mobili) {
          const X = PX(k === 'a' ? a : b);
          const dMan = Math.hypot(c.x - X, c.y - Y_RAIL);
          const dPar = (c.y >= MT && c.y <= MT + ALT + 12) ? Math.abs(c.x - X) : 1e9;
          const d = Math.min(dMan, dPar);
          if (d < best) { best = d; scelta = k; }
        }
        if (best > 55) return;
        trascino = scelta; fermaAnimazione(); disegnaScena();
        try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ }
        ev.preventDefault();
      });
      svg.addEventListener('pointermove', ev => {
        if (!trascino) return;
        const L = LIVELLI[livello], lim = L.mobili[trascino];
        let v = Math.round(XW(coord(ev).x) * 2) / 2;
        v = Math.max(lim[0], Math.min(lim[1], v));
        if (trascino === 'a') v = Math.min(v, b - .5); else v = Math.max(v, a + .5);
        if (v === (trascino === 'a' ? a : b)) return;
        if (trascino === 'a') a = v; else b = v;
        pulisci(); disegnaScena(); aggiornaDati();
      });
      const molla = () => { if (!trascino) return; trascino = null; disegnaScena(); };
      svg.addEventListener('pointerup', molla);
      svg.addEventListener('pointercancel', molla);
      svg.addEventListener('pointerleave', molla);

      /* ---------- livelli ---------- */
      function avviaLivello(k) {
        livello = k; trascino = null;
        const L = LIVELLI[k];
        V = L.vista; a = L.a; b = L.b; n = L.n0;
        tentativi = 0; finito = false; svelato = false;
        compitoEl.innerHTML = conMate(L.compito);
        esattoEl.hidden = true; esattoEl.innerHTML = '';
        messaggio('', '');
        inp.value = ''; inp.disabled = false; inp.classList.remove('sbagliata');
        inp.hidden = L.tipo !== 'numero';
        bVer.disabled = false;
        bVer.textContent = L.tipo === 'numero' ? 'Verifica' : (L.tipo === 'pareti' ? 'Verifica le pareti' : 'Verifica n');
        bSvela.disabled = true; bRic.textContent = 'Ricomincia';
        disegnaAssi(); disegnaScena(); aggiornaDati(); animaRiempimento();
      }
      function aiuto() {
        const L = LIVELLI[livello];
        return 'L\'acqua è l\'area: quanta ne sta nella vasca fra le pareti a e b. I rettangoli la misurano senza formule — ognuno è alto quanto il bordo a metà del suo passo — e più sono fitti più ricalcano la curva. Dove il bordo scende sotto il fondo l\'acqua manca: quel pezzo si conta in negativo. Il valore esatto è l\'integrale definito: si cerca una primitiva F, cioè una funzione che derivata dà f, e si fa F(b) − F(a). ' + L.aiuto;
      }

      bMeno.addEventListener('click', () => cambiaN(-1));
      bPiu.addEventListener('click', () => cambiaN(1));
      bVer.addEventListener('click', verifica);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); verifica(); } });
      inp.addEventListener('input', pulisci);
      bSvela.addEventListener('click', () => { if (!svelato) svela(); });
      bRic.addEventListener('click', () => avviaLivello(finito ? (livello + 1) % LIVELLI.length : livello));
      bAiuto.addEventListener('click', () => ctx.zenone(aiuto(), { tipo: 'suggerimento', espressione: 'pensa', durata: 14000 }));

      avviaLivello(livello);

      return function smonta() { if (raf) cancelAnimationFrame(raf); raf = null; };
    }
  });
})();
