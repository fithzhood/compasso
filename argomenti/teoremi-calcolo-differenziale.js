(function () {
const R = String.raw;
/* allenamento. Le risposte si controllano con le funzioni vere di compasso.js (normalizza toglie gli
   spazi, legge − come -, ≤ come <=, e la virgola come punto, sia qui sia in ciò che scrive lo studente).
   Per crescenza e decrescenza gli estremi si possono scrivere inclusi o esclusi: tutte e due le forme
   sono giuste (una funzione che cresce in (1, +∞) cresce anche in [1, +∞)).
   - dopo(k): x > k in tutte le scritture ragionevoli;  fra(a, b): a < x < b;
   - val(v): un numero (anche frazione o radice);  xs(…): più numeri, in ordine libero;  NO: «no». */
const SIMB_INT = ['<', '>', '≤', '≥', '∞', '(', ')', '[', ']', ',', '−'];
const INF = ['inf', '∞'], SEP = [';', ','];
const destraF = k => ['x>' + k, k + '<x', 'x>=' + k, k + '<=x'].concat(
  ['(', ']', '['].flatMap(ap => INF.flatMap(i => SEP.flatMap(s => ['+', ''].flatMap(p => [')', '['].map(ch => ap + k + s + p + i + ch))))));
const fraF = (a, b) => {
  const f = [];
  ['<', '<='].forEach(p => ['<', '<='].forEach(q => { f.push(a + p + 'x' + q + b, b + q.replace('<', '>') + 'x' + p.replace('<', '>') + a); }));
  ['x>' + a, 'x>=' + a].forEach(p => ['x<' + b, 'x<=' + b].forEach(q => ['e', 'ed', '∧', ',', ';'].forEach(o => f.push(p + o + q, q + o + p))));
  ['(', ']', '['].forEach(ap => [')', '[', ']'].forEach(ch => SEP.forEach(s => f.push(ap + a + s + b + ch))));
  return f;
};
const intv = f => ({ tipo: 'testo', accettate: f, segnaposto: 'es. −1 < x < 3', simboli: SIMB_INT });
const dopo = k => intv(destraF(k)), fra = (a, b) => intv(fraF(a, b));
const xs = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: 'es. 1; 3', simboli: [';', '−', '/', '√'] });
const val = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'un numero', simboli: ['−', '/', '√', '^'] });
const NO = { tipo: 'testo', accettate: ['no', 'no.', 'non si applica', 'non è applicabile', 'non e applicabile', 'non vale', 'no, non è continua', 'no, non è continua in 0', 'no perché non è continua in 0', 'no, perché non è continua in 0', 'no, non e continua in 0'], segnaposto: 'sì o no', simboli: [] };
COMPASSO.registra({
  id: 'teoremi-calcolo-differenziale',
  titolo: 'Teoremi del calcolo differenziale',

  introduzione: R`La derivata parla di un punto solo: dice quanto è ripida la curva lì. I teoremi del calcolo differenziale fanno un salto. Da quello che succede in ogni punto ricavano come si comporta la funzione su tutto un intervallo.

Il cuore è il teorema di Lagrange. Se in due ore percorri $180$ km, in qualche istante il tachimetro ha segnato $90$ km/h. Da qui viene la regola che userai in ogni studio di funzione: dove la derivata è positiva, la funzione cresce.

Altri due teoremi completano il quadro. Fermat dice dove cercare i massimi e i minimi. De l'Hôpital scioglie molti limiti nella forma $\frac{0}{0}$ o $\frac{\infty}{\infty}$. Ti servono i limiti, la continuità e le regole di derivazione. Tutto questo lo userai nell'argomento «Studio di funzione».`,

  inBreve: [
    R`Rolle: se il grafico parte e arriva alla stessa altezza, in qualche punto in mezzo la tangente è orizzontale.`,
    R`Lagrange: in qualche punto interno la tangente è parallela alla corda che unisce i due estremi del grafico.`,
    R`Su un intervallo, $f' > 0$ vuol dire $f$ crescente e $f' < 0$ decrescente. Se $f' = 0$ in tutto l'intervallo, $f$ è costante.`,
    R`Fermat: in un massimo o in un minimo interno, se $f$ è derivabile, $f'(x_0) = 0$. Il contrario non vale: lo mostra $y = x^3$ in $0$.`,
    R`De l'Hôpital vale solo per le forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$, e si derivano numeratore e denominatore separatamente.`,
    R`Ogni teorema ha ipotesi precise. Se ne manca una, la tesi può essere falsa: controllale sempre prima di usarlo.`
  ],

  sezioni: [
    { id: 'rolle', titolo: 'Il teorema di Rolle', testo: R`Parti dal livello del mare, cammini in montagna e torni al livello del mare. Da qualche parte sei stato in cima a una salita, o in fondo a una discesa. Lì, per un attimo, il sentiero era in piano.

>* **Teorema di Rolle.** Sia $f$ continua in $\Icc{a}{b}$ e derivabile in $\Iaa{a}{b}$, con $f(a) = f(b)$. Allora esiste almeno un punto $c \in \Iaa{a}{b}$ con $f'(c) = 0$.

In parole: il grafico parte e arriva alla stessa altezza. Allora in qualche punto in mezzo la tangente è orizzontale.

Esempio: $f(x) = \sin x$ su $\Icc{0}{\pi}$. È continua e derivabile, e $\sin 0 = \sin \pi = 0$. La derivata $\cos x$ si annulla in $c = \frac{\pi}{2}$, che sta dentro l'intervallo.

[[grafico:rolle]]

Servono tutte e tre le ipotesi. La tabella mostra che cosa succede se ne manca una.

| ipotesi che manca | esempio | che cosa succede |
|---|---|---|
| continuità in $\Icc{a}{b}$ | $f(x) = x$ per $0 \le x < 1$, $f(1) = 0$ | $f'(x) = 1$ sempre |
| derivabilità in $\Iaa{a}{b}$ | $\lvert x \rvert$ su $\Icc{-1}{1}$ | $f'$ vale $-1$ o $1$, mai $0$ |
| $f(a) = f(b)$ | $f(x) = x$ su $\Icc{0}{1}$ | $f'(x) = 1$ sempre |

?? $f(x) = x^2$ su $\Icc{-1}{2}$. Il teorema di Rolle garantisce un punto con tangente orizzontale?
[ ] Sì, e il punto è $c = 0$, dove la parabola ha il vertice.
[x] No: $f(-1) \ne f(2)$.
[ ] No, perché in $0$ la funzione non è derivabile.
=> I valori agli estremi sono diversi, quindi il teorema non si applica. La tangente orizzontale in $0$ c'è lo stesso, ma il teorema non la garantisce.

>! Il teorema dice che $c$ **esiste**. Non dice dove sia, né quanti siano: per $\sin x$ su $\Icc{0}{2\pi}$ sono due.

> La derivabilità serve solo nei punti interni. Agli estremi la tangente può anche essere verticale.` },

    { id: 'lagrange', titolo: 'Il teorema di Lagrange', testo: R`In due ore percorri $180$ km, quindi la media è $90$ km/h. Allora in almeno un istante il tachimetro ha segnato proprio $90$. Il teorema di Lagrange dice la stessa cosa per una funzione.

[[video:studio-di-funzione/lagrange]]

Chiama **corda** il segmento che unisce il primo e l'ultimo punto del grafico. La sua pendenza è la «media».

>* **Teorema di Lagrange** (o del valor medio). Se $f$ è continua in $\Icc{a}{b}$ e derivabile in $\Iaa{a}{b}$, esiste almeno un punto $c \in \Iaa{a}{b}$ tale che $$f'(c) = \frac{f(b) - f(a)}{b - a}.$$ In $c$ la tangente è parallela alla corda.

Nel grafico la corda arancio unisce $A$ e $B$. Le rette viola sono le tangenti nei punti $c$. Restano parallele alla corda, dovunque stiano $A$ e $B$.

[[grafico:lagrange]]

Se $f(a) = f(b)$ la corda è orizzontale e ritrovi $f'(c) = 0$. Quindi Rolle è un caso particolare di Lagrange.

> Lagrange si dimostra proprio con Rolle. Lo applichi alla differenza fra $f$ e la retta della corda: $$h(x) = f(x) - f(a) - m\,(x - a),$$ dove $m = \frac{f(b) - f(a)}{b - a}$ è la pendenza della corda. Questa $h$ vale zero sia in $a$ sia in $b$.

Esempio: $f(x) = x^2$ su $\Icc{0}{3}$.

~ \frac{f(3) - f(0)}{3 - 0} = \frac{9 - 0}{3} = \evid{3} :: la pendenza della corda
~ f'(c) = 2c :: la pendenza della tangente in un punto $c$
~ 2c = 3 :: il teorema promette un $c$ in cui sono uguali
~ c = \evidb{\frac{3}{2}} :: e infatti sta in $\Iaa{0}{3}$

>! La derivabilità deve valere in **tutti** i punti interni. Per $|x|$ su $\Icc{-1}{2}$ la corda ha pendenza $\frac{2 - 1}{3} = \frac{1}{3}$. Ma la derivata vale solo $-1$ o $1$, quindi nessun $c$ va bene: in $0$ la funzione non è derivabile.

> Scritta come $f(b) = f(a) + f'(c)\,(b - a)$, la tesi si chiama **formula degli incrementi finiti**.

> **Teorema di Cauchy.** Siano $f$ e $g$ continue in $\Icc{a}{b}$ e derivabili in $\Iaa{a}{b}$, con $g'(x) \ne 0$ in $\Iaa{a}{b}$. Allora esiste almeno un punto $c \in \Iaa{a}{b}$ tale che $$\frac{f'(c)}{g'(c)} = \frac{f(b) - f(a)}{g(b) - g(a)}.$$ Il punto $c$ è lo stesso per $f$ e per $g$. Con $g(x) = x$ ritrovi Lagrange.

[[video:studio-di-funzione/cauchy]]` },

    { id: 'conseguenze', titolo: 'Segno della derivata e monotonia', testo: R`Da Lagrange si ricava il legame fra il segno di $f'$ e l'andamento di $f$.

[[video:studio-di-funzione/monotonia]]

Prendi due punti $x_1 < x_2$. Lagrange dice che $f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$. Il fattore $x_2 - x_1$ è positivo. Quindi la differenza ha il segno di $f'(c)$.

>* **Criterio di monotonia.** Sia $f$ derivabile in un intervallo $I$. Se $f'(x) > 0$ nei punti interni di $I$, $f$ è strettamente **crescente** in $I$. Se $f'(x) < 0$, è strettamente **decrescente**.

>* **Derivata nulla.** Se $f'(x) = 0$ in tutto un **intervallo**, lì $f$ è costante. Quindi due funzioni con la stessa derivata differiscono per una costante.

Esempio: $f(x) = x^3 - 3x$.

~ f'(x) = 3x^2 - 3 :: derivo
~ f'(x) = \evid{3(x - 1)(x + 1)} :: scompongo, per studiarne il segno
~ f'(x) > 0 \iff \evidb{x < -1 \ \lor \ x > 1} :: una parabola verso l'alto è positiva fuori dagli zeri

Quindi $f$ cresce in $\Iac{-\infty}{-1}$, decresce in $\Icc{-1}{1}$ e cresce di nuovo in $\Ica{1}{+\infty}$.

>! La parola «intervallo» conta. $f(x) = \frac{1}{x}$ ha $f'(x) = -\frac{1}{x^2} < 0$ in tutto il dominio. Eppure $f(-1) = -1$ è minore di $f(1) = 1$. La funzione decresce **su ciascuno dei due rami**, separatamente.

?? $f$ è derivabile e strettamente crescente su $\mathbb{R}$. Che cosa si può dire di $f'$?
[x] $f'(x) \ge 0$ per ogni $x$
[ ] $f'(x) > 0$ per ogni $x$
[ ] niente
=> Da «crescente» si ricava solo $f' \ge 0$. Infatti $y = x^3$ è strettamente crescente, ma $f'(0) = 0$. Di sicuro $f'$ non è mai negativa, perché lì la funzione scenderebbe.` },

    { id: 'estremi', titolo: 'Massimi, minimi e teorema di Fermat', testo: R`Un **massimo relativo** è una cima più alta dei punti vicini. Il **massimo assoluto** è la cima più alta di tutta la catena.

>* $x_0$ è un punto di **massimo relativo** se $f(x) \le f(x_0)$ in un intorno di $x_0$. È di **massimo assoluto** se $f(x) \le f(x_0)$ per **ogni** $x$ del dominio. Per i minimi vale lo stesso con $\ge$.

Il numero $f(x_0)$ è il massimo. Il valore $x_0$ è il **punto** di massimo.

>* **Teorema di Fermat.** Sia $x_0$ un punto di massimo o di minimo relativo, **interno** al dominio. Se $f$ è **derivabile** in $x_0$, allora $f'(x_0) = 0$.

I punti con $f'(x_0) = 0$ si chiamano **punti stazionari**. Lì la tangente è orizzontale.

Il perché: prima della cima il rapporto incrementale è $\ge 0$, dopo è $\le 0$. Quindi il suo limite vale $0$.

>! $f'(x_0) = 0$ **non basta** per un estremo. $y = x^3$ ha $f'(0) = 0$, ma in $0$ c'è un flesso a tangente orizzontale.

Dove cercare massimi e minimi:

1. nei punti stazionari, dove $f'(x_0) = 0$;
2. nei punti dove $f$ non è derivabile: $|x|$ ha un minimo in $0$;
3. negli estremi del dominio: in $\Icc{a}{b}$ controlla $a$ e $b$ a parte.

Il criterio di monotonia dice poi **che cosa** c'è in un punto stazionario.

>* Se $f'$ passa da **positiva a negativa**, lì c'è un **massimo** relativo. Se passa da **negativa a positiva**, c'è un **minimo**. Se non cambia segno, non c'è né l'uno né l'altro.

Per $f(x) = x^3 - 3x$ la derivata $3(x - 1)(x + 1)$ passa da $+$ a $-$ in $-1$. Passa da $-$ a $+$ in $1$. Quindi $(-1; 2)$ è un massimo e $(1; -2)$ è un minimo.

[[grafico:cubica]]

?? $f(x) = x^2$ su $\Icc{1}{3}$. Dov'è il massimo assoluto?
[x] In $x = 3$, un estremo dell'intervallo.
[ ] Non c'è, perché $f'$ in $\Icc{1}{3}$ non si annulla mai.
[ ] In $x = 0$, dove $f' = 0$.
=> In $\Icc{1}{3}$ la derivata $2x$ è positiva: la funzione cresce. Il valore più alto è all'ultimo punto, $f(3) = 9$. Fermat vale solo nei punti interni.

> Il **teorema di Weierstrass** (argomento «Continuità e asintoti») garantisce che una funzione continua su $\Icc{a}{b}$ ha massimo e minimo assoluti. Fermat ti dice dove cercarli.` },

    { id: 'hopital', titolo: 'Il teorema di de l\'Hôpital', testo: R`Nei limiti trovi spesso la forma $\frac{0}{0}$ o $\frac{\infty}{\infty}$. Molti si sciolgono derivando **separatamente** il numeratore e il denominatore.

>* **Teorema di de l'Hôpital.** Siano $f$ e $g$ derivabili vicino a $x_0$, con $g'(x) \ne 0$. Supponi che $f$ e $g$ tendano tutte e due a $0$, oppure tutte e due all'infinito. Se esiste $$\lim_{x \to x_0} \frac{f'(x)}{g'(x)} = L,$$ allora anche $\lim_{x \to x_0} \frac{f(x)}{g(x)} = L$.

Vale anche per $x \to \pm\infty$. Se la forma indeterminata si ripresenta, puoi applicarlo di nuovo. Si dimostra con il teorema di Cauchy.

~ \lim_{x \to 0} \frac{1 - \cos x}{x^2} :: sostituendo $0$ viene $\frac{0}{0}$: il teorema si può usare
~ = \lim_{x \to 0} \frac{\evid{\sin x}}{\evid{2x}} :: derivo sopra, $(1 - \cos x)' = \sin x$, e sotto, $(x^2)' = 2x$
~ = \lim_{x \to 0} \frac{\evid{\cos x}}{\evid{2}} :: è ancora $\frac{0}{0}$: derivo di nuovo
~ = \evidb{\frac{1}{2}} :: ora basta sostituire: $\cos 0 = 1$

[[grafico:hopital]]

Con la forma $\frac{\infty}{\infty}$: $\lim_{x \to +\infty} \frac{\ln x}{x} = \lim_{x \to +\infty} \frac{1/x}{1} = 0$.

La forma $0 \cdot \infty$ va prima scritta come quoziente.

~ \lim_{x \to 0^+} x \ln x :: forma $0 \cdot (-\infty)$: così il teorema non si applica
~ = \lim_{x \to 0^+} \frac{\ln x}{\evid{1/x}} :: moltiplicare per $x$ è come dividere per $\frac{1}{x}$: ora è $\frac{-\infty}{+\infty}$
~ = \lim_{x \to 0^+} \frac{\evid{1/x}}{\evid{-1/x^2}} :: derivo sopra e sotto
~ = \lim_{x \to 0^+} (\evid{-x}) = \evidb{0} :: semplifico: $\frac{1}{x} \cdot (-x^2) = -x$

>! Si derivano numeratore e denominatore **separatamente**: $\frac{f'}{g'}$, mai $\left(\frac{f}{g}\right)'$ con la regola del quoziente.

?? Uno studente calcola $\lim_{x \to 0} \dfrac{x + 1}{x + 2}$ con de l'Hôpital e ottiene $1$. Dove sbaglia?
[x] la forma non è indeterminata: basta sostituire, e il limite vale $\frac{1}{2}$
[ ] ha derivato male: le derivate danno $\frac{1}{2}$
[ ] non sbaglia: il limite vale $1$
=> Sostituendo $x = 0$ viene $\frac{1}{2}$, un numero. Non c'è niente da sciogliere, quindi il teorema non si usa. Le derivate sono giuste: l'errore è non aver controllato la forma.

>! Se $\frac{f'}{g'}$ **non** ha limite, il teorema non dice niente su $\frac{f}{g}$. Allora prova un'altra strada.` }
  ],
  grafici: {
    rolle: {
      tipo: 'piano', x: [-0.6, 3.8], y: [-0.5, 1.4], passo: [1, 0.5],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1, dominio: [0, 'pi'] }],
      punti: [
        { x: 0, y: 0, etichetta: 'A', posizione: 'basso-sinistra', colore: 1 },
        { x: 'pi', y: 0, etichetta: 'B', posizione: 'basso-destra', colore: 1 },
        { x: 'pi/2', y: 1, etichetta: 'c = π/2', posizione: 'alto', colore: 2 }
      ],
      elementi: [
        { tipo: 'segmento', da: ['pi/2 - 0.9', 1], a: ['pi/2 + 0.9', 1], colore: 2 },
        { tipo: 'segmento', da: ['pi/2', 0], a: ['pi/2', 1], tratteggio: true, colore: 2 }
      ],
      didascalia: 'y = sin x su [0, π] parte da quota zero e torna a quota zero. In c = π/2 la tangente arancio è orizzontale, come promette Rolle.'
    },
    lagrange: {
      tipo: 'piano', x: [-2.6, 2.6], y: [-4.5, 4.5],
      parametri: [
        { nome: 'a', min: -2.2, max: -0.1, passo: 0.1, valore: -0.5, nascosto: true },
        { nome: 'b', min: 0.1, max: 2.2, passo: 0.1, valore: 2.2, nascosto: true }
      ],
      funzioni: [
        { f: 'x^3 - 3x', colore: 1 },
        { f: 'sqrt((a^2+a*b+b^2)/3)^3 - 3*sqrt((a^2+a*b+b^2)/3) + (a^2+a*b+b^2-3)*(x - sqrt((a^2+a*b+b^2)/3)) + 0*sqrt(b - sqrt((a^2+a*b+b^2)/3) - 0.000000001)', colore: 4, tratteggio: true },
        { f: '-sqrt((a^2+a*b+b^2)/3)^3 + 3*sqrt((a^2+a*b+b^2)/3) + (a^2+a*b+b^2-3)*(x + sqrt((a^2+a*b+b^2)/3)) + 0*sqrt(-sqrt((a^2+a*b+b^2)/3) - a - 0.000000001)', colore: 4, tratteggio: true }
      ],
      elementi: [
        { tipo: 'segmento', da: ['a', 'a^3 - 3a'], a: ['b', 'b^3 - 3b'], colore: 2 },
        { tipo: 'punto', p: ['sqrt((a^2+a*b+b^2)/3) + 0*sqrt(b - sqrt((a^2+a*b+b^2)/3) - 0.000000001)', 'sqrt((a^2+a*b+b^2)/3)^3 - 3*sqrt((a^2+a*b+b^2)/3)'], etichetta: 'c', posizione: 'basso', colore: 4 },
        { tipo: 'punto', p: ['-sqrt((a^2+a*b+b^2)/3) + 0*sqrt(-sqrt((a^2+a*b+b^2)/3) - a - 0.000000001)', '-sqrt((a^2+a*b+b^2)/3)^3 + 3*sqrt((a^2+a*b+b^2)/3)'], etichetta: 'c', posizione: 'alto', colore: 4 },
        { tipo: 'punto', p: ['a', 'a^3 - 3a'], trascina: true, etichetta: 'A', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: ['b', 'b^3 - 3b'], trascina: true, etichetta: 'B', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-2.5, 4.1], testo: 'corda: m = {{a^2 + a*b + b^2 - 3}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.5, 3.4], testo: 'a = {{a}}   b = {{b}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B lungo la curva. Le rette viola sono le tangenti nei punti c: restano sempre parallele alla corda arancio. Porta A verso sinistra e compare un secondo punto c. Poi metti a = −2 e b = 1: A e B sono alla stessa altezza, la corda è orizzontale ed è il caso di Rolle.'
    },
    cubica: {
      tipo: 'piano', x: [-2.6, 2.6], y: [-4.5, 4.5],
      funzioni: [{ f: 'x^3 - 3x', etichetta: 'y = x³ − 3x', colore: 1 }],
      punti: [
        { x: -1, y: 2, etichetta: 'M(−1; 2)', posizione: 'alto', colore: 2 },
        { x: 1, y: -2, etichetta: 'm(1; −2)', posizione: 'basso', colore: 2 }
      ],
      elementi: [
        { tipo: 'tangente', f: 'x^3-3x', x0: 'p', colore: 4, etichetta: false },
        { tipo: 'punto', p: ['p', 'p^3-3p'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [-2.4, 4], testo: "f'(p) = {{3*p^2 - 3}}", ancora: 'start' }
      ],
      parametri: [{ nome: 'p', min: -2, max: 2, passo: 0.05, valore: 0.5, etichetta: 'p' }],
      didascalia: "Trascina P lungo la curva: f'(p) è la pendenza della tangente. Si azzera nel massimo M e nel minimo m, e cambia segno proprio lì."
    },
    hopital: {
      tipo: 'piano', x: [-7, 7], y: [-0.1, 0.65], passo: [1, 0.5], altezza: 300,
      funzioni: [{ f: '(1 - cos(x))/x^2', colore: 1 }],
      punti: [{ x: 0, y: 0.5, vuoto: true, colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: 0.5, tratteggio: true, colore: 2, etichetta: 'y = 1/2' }
      ],
      didascalia: 'Vicino a x = 0 il grafico di y = (1 − cos x)/x² sale verso 1/2. In 0 la funzione non esiste (c\'è un buco), ma il limite vale 1/2.'
    }
  },
  esempi: [
    { titolo: 'Verificare Rolle e trovare il punto c', problema: R`Verifica che $f(x) = x^2 - 4x + 3$ soddisfa le ipotesi del teorema di Rolle in $\Icc{1}{3}$ e determina il punto $c$.`, passi: [
      R`$f$ è un polinomio: è continua e derivabile su tutto $\mathbb{R}$. Quindi è continua in $\Icc{1}{3}$ e derivabile in $\Iaa{1}{3}$.`,
      R`Terza ipotesi: $f(1) = 1 - 4 + 3 = 0$ e $f(3) = 9 - 12 + 3 = 0$. I valori agli estremi coincidono.`,
      R`Le ipotesi valgono, quindi il punto esiste. Per trovarlo imponi $f'(c) = 0$, con $f'(x) = 2x - 4$.`,
      R`$2c - 4 = 0$ dà $c = 2$, che sta in $\Iaa{1}{3}$. È il vertice della parabola, dove la tangente è orizzontale.`
    ], risultato: R`$c = 2$` },

    { titolo: 'Il punto di Lagrange per una radice', problema: R`Determina il punto $c$ previsto dal teorema di Lagrange per $f(x) = \sqrt{x}$ in $\Icc{0}{4}$.`, passi: [
      R`$f$ è continua in $\Icc{0}{4}$ e derivabile in $\Iaa{0}{4}$, con $f'(x) = \dfrac{1}{2\sqrt{x}}$. In $x = 0$ la derivata non esiste, ma non serve: la derivabilità si chiede solo nei punti interni.`,
      R`Pendenza della corda: $\dfrac{f(4) - f(0)}{4 - 0} = \dfrac{2 - 0}{4} = \dfrac{1}{2}$.`,
      R`Imponi $f'(c) = \dfrac{1}{2}$, cioè $\dfrac{1}{2\sqrt{c}} = \dfrac{1}{2}$. Quindi $\sqrt{c} = 1$.`,
      R`$c = 1$, che sta in $\Iaa{0}{4}$: nel punto $(1; 1)$ la tangente è parallela alla corda.`
    ], risultato: R`$c = 1$` },

    { titolo: 'Una funzione con derivata nulla', problema: R`Dimostra che $g(x) = \ln(2x) - \ln x$ è costante per $x > 0$ e trova il suo valore.`, passi: [
      R`Il dominio è $x > 0$: un **intervallo**. È questo che permette di usare il teorema sulla derivata nulla.`,
      R`Deriva: $(\ln(2x))' = \dfrac{1}{2x} \cdot 2 = \dfrac{1}{x}$, per la regola della funzione composta. Quindi $g'(x) = \dfrac{1}{x} - \dfrac{1}{x} = 0$.`,
      R`La derivata è nulla in tutto l'intervallo $\Iaa{0}{+\infty}$, quindi $g$ è costante lì.`,
      R`Per trovare la costante basta un punto qualsiasi: $g(1) = \ln 2 - \ln 1 = \ln 2$.`,
      R`Controllo con le proprietà dei logaritmi: $\ln(2x) - \ln x = \ln \dfrac{2x}{x} = \ln 2$. Le due funzioni $\ln(2x)$ e $\ln x$ hanno la stessa derivata e differiscono per la costante $\ln 2$.`
    ], risultato: R`$g(x) = \ln 2$ per ogni $x > 0$` },

    { titolo: 'Massimo e minimo assoluti su un intervallo chiuso', problema: R`Trova il massimo e il minimo assoluti di $f(x) = 2x^3 - 3x^2 - 12x$ in $\Icc{-2}{4}$.`, passi: [
      R`$f$ è continua in un intervallo chiuso e limitato: per Weierstrass massimo e minimo assoluti esistono. Vanno cercati fra i punti stazionari interni e gli estremi $-2$ e $4$.`,
      R`$f'(x) = 6x^2 - 6x - 12 = 6(x - 2)(x + 1)$. I punti stazionari sono $x = -1$ e $x = 2$, tutti e due dentro l'intervallo.`,
      R`Calcola $f$ nei quattro candidati: $f(-2) = -16 - 12 + 24 = -4$, $f(-1) = -2 - 3 + 12 = 7$, $f(2) = 16 - 12 - 24 = -20$, $f(4) = 128 - 48 - 48 = 32$.`,
      R`Il valore più alto è $32$, in $x = 4$: un estremo dell'intervallo, dove $f'(4) = 96 - 24 - 12 = 60 \ne 0$. Il più basso è $-20$, in $x = 2$.`,
      R`In $x = -1$ c'è un massimo **relativo** ($f'$ passa da $+$ a $-$), ma non assoluto: $7 < 32$.`
    ], risultato: R`Massimo assoluto $32$ in $x = 4$; minimo assoluto $-20$ in $x = 2$` },

    { titolo: 'De l\'Hôpital applicato tre volte', problema: R`Calcola $\lim_{x \to 0} \dfrac{x - \sin x}{x^3}$.`, passi: [
      R`Per $x \to 0$ numeratore e denominatore tendono tutti e due a $0$: è la forma $\dfrac{0}{0}$, il teorema si può applicare.`,
      R`Derivi separatamente: $\lim_{x \to 0} \dfrac{1 - \cos x}{3x^2}$. È ancora $\dfrac{0}{0}$.`,
      R`Applichi di nuovo: $\lim_{x \to 0} \dfrac{\sin x}{6x}$. Ancora $\dfrac{0}{0}$.`,
      R`Terza volta: $\lim_{x \to 0} \dfrac{\cos x}{6} = \dfrac{1}{6}$. La forma non è più indeterminata, quindi il limite di partenza vale $\dfrac{1}{6}$.`
    ], risultato: R`$\dfrac{1}{6}$` },

    { titolo: 'L\'esponenziale batte la potenza', problema: R`Calcola $\lim_{x \to +\infty} \dfrac{x^2}{e^x}$.`, passi: [
      R`Numeratore e denominatore tendono tutti e due a $+\infty$: forma $\dfrac{\infty}{\infty}$.`,
      R`Derivi sopra e sotto: $\lim_{x \to +\infty} \dfrac{2x}{e^x}$. La derivata di $e^x$ è ancora $e^x$. La forma è ancora $\dfrac{\infty}{\infty}$.`,
      R`Applichi di nuovo: $\lim_{x \to +\infty} \dfrac{2}{e^x}$. Ora il numeratore è fermo a $2$ e il denominatore cresce senza limite.`,
      R`Quindi il limite vale $0$. Con $x^n$ al posto di $x^2$ servono $n$ passaggi, ma il risultato non cambia: all'infinito $e^x$ cresce più in fretta di ogni potenza.`
    ], risultato: R`$0$` }
  ],

  formulario: [
    { nome: 'Teorema di Rolle', formula: R`f(a) = f(b) \ \Rightarrow \ \exists\, c \in \Iaa{a}{b} : f'(c) = 0`, nota: R`Serve $f$ continua in $\Icc{a}{b}$ e derivabile in $\Iaa{a}{b}$.` },
    { nome: 'Teorema di Lagrange', formula: R`f'(c) = \frac{f(b) - f(a)}{b - a}`, nota: R`La tangente in $c$ è parallela alla corda per $A(a; f(a))$ e $B(b; f(b))$.` },
    { nome: 'Formula degli incrementi finiti', formula: R`f(b) = f(a) + f'(c)\,(b - a)`, nota: R`È il teorema di Lagrange riscritto: $c$ è un opportuno punto interno.` },
    { nome: 'Teorema di Cauchy', formula: R`\frac{f'(c)}{g'(c)} = \frac{f(b) - f(a)}{g(b) - g(a)}`, nota: R`Con $f$, $g$ continue in $\Icc{a}{b}$, derivabili in $\Iaa{a}{b}$ e $g' \ne 0$. Con $g(x) = x$ è Lagrange.` },
    { nome: 'Derivata nulla su un intervallo', formula: R`f'(x) = 0 \ \text{ in } I \quad \Rightarrow \quad f(x) = k`, nota: R`Solo se $I$ è un **intervallo**. Due funzioni con la stessa derivata differiscono per una costante.` },
    { nome: 'Criterio di monotonia', formula: R`\begin{gathered} f'(x) > 0 \Rightarrow f \text{ crescente} \\ f'(x) < 0 \Rightarrow f \text{ decrescente} \end{gathered}`, nota: R`Su un intervallo. Su un dominio spezzato vale ramo per ramo.` },
    { nome: 'Teorema di Fermat', formula: R`x_0 \text{ estremo relativo interno} \ \Rightarrow \ f'(x_0) = 0`, nota: R`Vale se $f$ è derivabile in $x_0$. Non si inverte.` },
    { nome: 'Massimi e minimi dal segno di f\'', formula: R`\begin{gathered} f': + \to - \ \Rightarrow \ \text{massimo} \\ f': - \to + \ \Rightarrow \ \text{minimo} \end{gathered}`, nota: R`Se $f'$ non cambia segno, il punto non è né di massimo né di minimo.` },
    { nome: 'Teorema di de l\'Hôpital', formula: R`\lim_{x \to x_0} \frac{f(x)}{g(x)} = \lim_{x \to x_0} \frac{f'(x)}{g'(x)}`, nota: R`Solo per le forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$, e solo se il secondo limite esiste.` },
    { nome: 'Forma 0 · ∞ riscritta come quoziente', formula: R`f \cdot g = \frac{f}{1/g}`, nota: R`Così $0 \cdot \infty$ diventa $\frac{0}{0}$ o $\frac{\infty}{\infty}$, e de l'Hôpital si può usare.` }
  ],
  flashcards: [
    { id: 'fc-01', sezione: 'rolle', tipo: 'definizione', fronte: R`Enunciato del teorema di Rolle`, retro: R`Se $f$ è continua in $\Icc{a}{b}$, derivabile in $\Iaa{a}{b}$ e $f(a) = f(b)$, allora esiste $c \in \Iaa{a}{b}$ con $f'(c) = 0$.` },
    { id: 'fc-02', sezione: 'rolle', tipo: 'concetto', fronte: R`Significato geometrico di Rolle`, retro: R`Se il grafico parte e arriva alla stessa quota, in almeno un punto interno la tangente è orizzontale.` },
    { id: 'fc-03', sezione: 'rolle', tipo: 'concetto', fronte: R`Un controesempio a Rolle senza derivabilità`, retro: R`$f(x) = |x|$ in $\Icc{-1}{1}$: continua e con $f(-1) = f(1)$, ma la derivata vale $\pm 1$ e non si annulla mai.` },
    { id: 'fc-04', sezione: 'rolle', tipo: 'concetto', fronte: R`Il teorema di Rolle dice dove sta il punto $c$, e quanti sono?`, retro: R`No. Dice solo che **almeno un** $c$ esiste in $\Iaa{a}{b}$. Possono essere più di uno: per $\sin x$ su $\Icc{0}{2\pi}$ sono due.` },
    { id: 'fc-05', sezione: 'lagrange', tipo: 'formula', fronte: R`Tesi del teorema di Lagrange`, retro: R`Esiste $c \in \Iaa{a}{b}$ tale che $f'(c) = \dfrac{f(b) - f(a)}{b - a}$.` },
    { id: 'fc-06', sezione: 'lagrange', tipo: 'concetto', fronte: R`Significato geometrico di Lagrange`, retro: R`Esiste un punto interno in cui la tangente è parallela alla corda che unisce gli estremi del grafico.` },
    { id: 'fc-07', sezione: 'lagrange', tipo: 'concetto', fronte: R`Lagrange detto con la velocità`, retro: R`In almeno un istante la velocità istantanea è uguale alla velocità media del viaggio.` },
    { id: 'fc-08', sezione: 'lagrange', tipo: 'concetto', fronte: R`Che rapporto c'è fra Rolle e Lagrange?`, retro: R`Rolle è il caso particolare $f(a) = f(b)$. Lagrange si dimostra applicando Rolle alla differenza fra $f$ e la retta della corda.` },
    { id: 'fc-09', sezione: 'lagrange', tipo: 'formula', fronte: R`Formula degli incrementi finiti`, retro: R`$f(b) = f(a) + f'(c)\,(b - a)$, con $c$ opportuno in $\Iaa{a}{b}$: è la tesi di Lagrange riscritta.` },
    { id: 'fc-10', sezione: 'lagrange', tipo: 'formula', fronte: R`Tesi del teorema di Cauchy`, retro: R`Esiste $c \in \Iaa{a}{b}$ con $\dfrac{f'(c)}{g'(c)} = \dfrac{f(b) - f(a)}{g(b) - g(a)}$, purché $g' \ne 0$ in $\Iaa{a}{b}$.` },
    { id: 'fc-11', sezione: 'conseguenze', tipo: 'concetto', fronte: R`Se $f'(x) = 0$ in tutto un intervallo?`, retro: R`$f$ è costante in quell'intervallo. Due funzioni con la stessa derivata differiscono per una costante.` },
    { id: 'fc-12', sezione: 'conseguenze', tipo: 'procedura', fronte: R`Criterio di monotonia`, retro: R`In un intervallo: $f' > 0$ implica $f$ strettamente crescente, $f' < 0$ implica $f$ strettamente decrescente.` },
    { id: 'fc-13', sezione: 'conseguenze', tipo: 'concetto', fronte: R`Perché il criterio di monotonia richiede un intervallo?`, retro: R`Su un dominio spezzato non vale: $f(x) = \dfrac{1}{x}$ ha $f' < 0$ ovunque, ma decresce solo su ciascun ramo.` },
    { id: 'fc-14', sezione: 'conseguenze', tipo: 'concetto', fronte: R`Se $f$ è crescente e derivabile, quanto vale $f'$?`, retro: R`$f'(x) \ge 0$, non per forza $> 0$: $y = x^3$ è crescente ma $f'(0) = 0$.` },
    { id: 'fc-15', sezione: 'estremi', tipo: 'definizione', fronte: R`Massimo relativo e massimo assoluto`, retro: R`Relativo: $f(x) \le f(x_0)$ in un intorno di $x_0$. Assoluto: $f(x) \le f(x_0)$ per ogni $x$ del dominio.` },
    { id: 'fc-16', sezione: 'estremi', tipo: 'definizione', fronte: R`Punto stazionario`, retro: R`Un punto in cui $f'(x_0) = 0$: la tangente è orizzontale.` },
    { id: 'fc-17', sezione: 'estremi', tipo: 'definizione', fronte: R`Teorema di Fermat`, retro: R`Se $x_0$ è un estremo relativo interno al dominio e $f$ è derivabile in $x_0$, allora $f'(x_0) = 0$.` },
    { id: 'fc-18', sezione: 'estremi', tipo: 'procedura', fronte: R`Dove si cercano gli estremi assoluti?`, retro: R`Fra i punti stazionari, i punti di non derivabilità e gli estremi del dominio. Poi si confrontano i valori di $f$.` },
    { id: 'fc-19', sezione: 'estremi', tipo: 'procedura', fronte: R`Come si riconosce un massimo dal segno di $f'$?`, retro: R`$f'$ passa da positiva a negativa. Da negativa a positiva si ha un minimo; se non cambia segno, non c'è estremo.` },
    { id: 'fc-20', sezione: 'estremi', tipo: 'concetto', fronte: R`Perché $f'(x_0) = 0$ non basta per un massimo o un minimo?`, retro: R`Perché $f'$ può non cambiare segno: $y = x^3$ ha $f'(0) = 0$, ma in $0$ ha un flesso a tangente orizzontale.` },
    { id: 'fc-21', sezione: 'hopital', tipo: 'formula', fronte: R`Teorema di de l'Hôpital`, retro: R`Nelle forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$: $\lim \dfrac{f}{g} = \lim \dfrac{f'}{g'}$, purché il secondo limite esista.` },
    { id: 'fc-22', sezione: 'hopital', tipo: 'procedura', fronte: R`Che cosa si deriva applicando de l'Hôpital?`, retro: R`Numeratore e denominatore **separatamente**: $\dfrac{f'}{g'}$, mai la derivata del quoziente.` },
    { id: 'fc-23', sezione: 'hopital', tipo: 'procedura', fronte: R`Come si tratta la forma $0 \cdot \infty$?`, retro: R`Si riscrive come quoziente, per esempio $x \ln x = \dfrac{\ln x}{1/x}$, e si torna a $\frac{\infty}{\infty}$.` },
    { id: 'fc-24', sezione: 'hopital', tipo: 'procedura', fronte: R`Si può applicare de l'Hôpital più volte di fila?`, retro: R`Sì, finché la forma resta $\frac{0}{0}$ o $\frac{\infty}{\infty}$. Va controllata a ogni passaggio.` },
    { id: 'fc-25', sezione: 'hopital', tipo: 'concetto', fronte: R`Se $\lim \dfrac{f'}{g'}$ non esiste, che cosa dice il teorema su $\lim \dfrac{f}{g}$?`, retro: R`Niente. Il limite di partenza può esistere lo stesso: va cercato con un'altra strada.` }
  ],
  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`$f(x) = x^2 - 2x$ soddisfa le ipotesi di Rolle in $\Icc{0}{2}$. Trova il punto $c$.`, suggerimenti: [R`Il punto $c$ è dove $f'(c) = 0$.`], risposta: val(1), soluzione: [R`$f(0) = 0$ e $f(2) = 4 - 4 = 0$: i valori agli estremi coincidono.`, R`$f'(x) = 2x - 2$, che vale zero per $x = 1$.`, R`$c = 1$, dentro $\Iaa{0}{2}$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`$f(x) = x^2 - 5x + 4$ soddisfa le ipotesi di Rolle in $\Icc{1}{4}$. Trova il punto $c$.`, suggerimenti: [R`Deriva e poni la derivata uguale a zero.`], risposta: val(2.5), soluzione: [R`$f(1) = 0$ e $f(4) = 16 - 20 + 4 = 0$.`, R`$f'(x) = 2x - 5$, che vale zero per $x = \dfrac{5}{2}$.`, R`$c = \dfrac{5}{2}$, dentro $\Iaa{1}{4}$: è il vertice della parabola.`] },
    { id: 'b-03', livello: 'base', difficolta: 2, testo: R`$f(x) = x^4 - 2x^2$ soddisfa le ipotesi di Rolle in $\Icc{-2}{2}$. Trova **tutti** i punti $c$. Scrivi i valori separati da punto e virgola.`, suggerimenti: [R`Nella derivata raccogli $4x$.`, R`Il teorema non dice quanti sono: tieni tutti quelli dentro l'intervallo.`], risposta: xs(-1, 0, 1), soluzione: [R`$f(-2) = 16 - 8 = 8$ e $f(2) = 8$.`, R`$f'(x) = 4x^3 - 4x = 4x(x - 1)(x + 1)$.`, R`Si annulla in $-1$, $0$ e $1$, tutti dentro $\Iaa{-2}{2}$: i punti $c$ sono tre.`] },
    { id: 'b-04', livello: 'base', difficolta: 2, testo: R`$f(x) = x^3 - x$ soddisfa le ipotesi di Rolle in $\Icc{-1}{1}$. Trova tutti i punti $c$.`, suggerimenti: [R`Risolvi $3c^2 - 1 = 0$.`, R`Puoi scrivere le radici come $\sqrt{3}/3$.`], risposta: xs(-1 / Math.sqrt(3), 1 / Math.sqrt(3)), soluzione: [R`$f(-1) = -1 + 1 = 0$ e $f(1) = 0$.`, R`$f'(x) = 3x^2 - 1 = 0$ dà $x^2 = \dfrac{1}{3}$.`, R`$c = \pm\dfrac{1}{\sqrt{3}} = \pm\dfrac{\sqrt{3}}{3}$, circa $\pm 0{,}577$: tutti e due dentro $\Iaa{-1}{1}$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Il teorema di Rolle si applica a $f(x) = \dfrac{1}{x^2}$ in $\Icc{-1}{1}$? Rispondi sì o no.`, suggerimenti: [R`Controlla le ipotesi una per una.`, R`Dove non è definita $f$?`], risposta: NO, soluzione: [R`$f(-1) = f(1) = 1$: questa ipotesi vale.`, R`Ma in $x = 0$, che sta dentro l'intervallo, $f$ non è definita. Quindi non è continua in $\Icc{-1}{1}$.`, R`Il teorema non si applica. Infatti $f'(x) = -\dfrac{2}{x^3}$ non si annulla mai.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Trova il punto $c$ del teorema di Lagrange per $f(x) = x^2$ in $\Icc{1}{5}$.`, suggerimenti: [R`Calcola prima la pendenza della corda.`], risposta: val(3), soluzione: [R`Corda: $\dfrac{25 - 1}{5 - 1} = \dfrac{24}{4} = 6$.`, R`$f'(c) = 2c = 6$.`, R`$c = 3$, dentro $\Iaa{1}{5}$.`] },
    { id: 'b-07', livello: 'base', difficolta: 2, testo: R`Trova il punto $c$ del teorema di Lagrange per $f(x) = x^3$ in $\Icc{0}{3}$.`, suggerimenti: [R`Corda: $\dfrac{f(3) - f(0)}{3}$.`, R`Delle due soluzioni tieni quella dentro l'intervallo.`], risposta: val(Math.sqrt(3)), soluzione: [R`Corda: $\dfrac{27 - 0}{3} = 9$.`, R`$f'(c) = 3c^2 = 9$, quindi $c^2 = 3$.`, R`$c = -\sqrt{3}$ sta fuori da $\Iaa{0}{3}$. Resta $c = \sqrt{3}$, circa $1{,}73$.`] },
    { id: 'b-08', livello: 'base', difficolta: 2, testo: R`Trova il punto $c$ del teorema di Lagrange per $f(x) = \dfrac{1}{x}$ in $\Icc{1}{4}$.`, suggerimenti: [R`La corda ha pendenza negativa.`, R`$f'(x) = -\dfrac{1}{x^2}$.`], risposta: val(2), soluzione: [R`Corda: $\dfrac{\frac{1}{4} - 1}{4 - 1} = \dfrac{-\frac{3}{4}}{3} = -\dfrac{1}{4}$.`, R`$-\dfrac{1}{c^2} = -\dfrac{1}{4}$, quindi $c^2 = 4$.`, R`$c = 2$; il valore $-2$ sta fuori da $\Iaa{1}{4}$.`] },
    { id: 'b-09', livello: 'base', difficolta: 2, testo: R`Trova il punto $c$ del teorema di Lagrange per $f(x) = \sqrt{x}$ in $\Icc{1}{9}$.`, suggerimenti: [R`$f'(x) = \dfrac{1}{2\sqrt{x}}$.`], risposta: val(4), soluzione: [R`Corda: $\dfrac{3 - 1}{9 - 1} = \dfrac{1}{4}$.`, R`$\dfrac{1}{2\sqrt{c}} = \dfrac{1}{4}$, quindi $\sqrt{c} = 2$.`, R`$c = 4$, dentro $\Iaa{1}{9}$.`] },
    { id: 'b-10', livello: 'base', difficolta: 2, testo: R`Trova il punto $c$ del teorema di Lagrange per $f(x) = x^3 - x$ in $\Icc{0}{2}$.`, suggerimenti: [R`Corda: $\dfrac{f(2) - f(0)}{2}$.`, R`Risolvi $3c^2 - 1 = 3$ e tieni la soluzione positiva.`], risposta: val(2 / Math.sqrt(3)), soluzione: [R`$f(2) = 8 - 2 = 6$, $f(0) = 0$: la corda ha pendenza $3$.`, R`$3c^2 - 1 = 3$ dà $c^2 = \dfrac{4}{3}$.`, R`$c = \dfrac{2}{\sqrt{3}} = \dfrac{2\sqrt{3}}{3}$, circa $1{,}15$: sta in $\Iaa{0}{2}$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Calcola con de l'Hôpital $\lim_{x \to 0} \dfrac{\sin(3x)}{x}$.`, suggerimenti: [R`Forma $\frac{0}{0}$: deriva sopra e sotto.`, R`$(\sin(3x))' = 3\cos(3x)$.`], risposta: val(3), soluzione: [R`Per $x \to 0$ viene $\dfrac{0}{0}$.`, R`Derivando: $\lim_{x \to 0} \dfrac{3\cos(3x)}{1} = 3$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Calcola con de l'Hôpital $\lim_{x \to 0} \dfrac{e^{2x} - 1}{x}$.`, suggerimenti: [R`$(e^{2x})' = 2e^{2x}$.`], risposta: val(2), soluzione: [R`Forma $\dfrac{0}{0}$: $e^0 - 1 = 0$.`, R`Derivando: $\lim_{x \to 0} \dfrac{2e^{2x}}{1} = 2$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Calcola con de l'Hôpital $\lim_{x \to 1} \dfrac{\ln x}{x - 1}$.`, suggerimenti: [R`In $x = 1$ il numeratore vale $\ln 1 = 0$.`], risposta: val(1), soluzione: [R`Forma $\dfrac{0}{0}$.`, R`Derivando: $\lim_{x \to 1} \dfrac{1/x}{1} = 1$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Calcola con de l'Hôpital $\lim_{x \to +\infty} \dfrac{\ln x}{\sqrt{x}}$.`, suggerimenti: [R`$(\sqrt{x})' = \dfrac{1}{2\sqrt{x}}$.`, R`Semplifica la frazione di frazioni che ottieni.`], risposta: val(0), soluzione: [R`Forma $\dfrac{\infty}{\infty}$.`, R`Derivando: $\dfrac{1/x}{1/(2\sqrt{x})} = \dfrac{2\sqrt{x}}{x} = \dfrac{2}{\sqrt{x}}$.`, R`Per $x \to +\infty$ tende a $0$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Calcola $\lim_{x \to +\infty} \dfrac{x^3}{e^x}$.`, suggerimenti: [R`Applica de l'Hôpital finché la potenza sparisce.`], risposta: val(0), soluzione: [R`Forma $\dfrac{\infty}{\infty}$. Derivando tre volte: $\dfrac{3x^2}{e^x}$, poi $\dfrac{6x}{e^x}$, poi $\dfrac{6}{e^x}$.`, R`L'ultimo tende a $0$, quindi anche il limite di partenza vale $0$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`$f$ è derivabile in $\mathbb{R}$, $f'(x) = 0$ per ogni $x$ e $f(1) = 4$. Quanto vale $f(10)$?`, suggerimenti: [R`Che cosa dice il teorema sulla derivata nulla?`], risposta: val(4), soluzione: [R`$f' = 0$ su tutto $\mathbb{R}$, che è un intervallo: $f$ è costante.`, R`Il valore costante è $f(1) = 4$, quindi $f(10) = 4$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`Dove decresce $f(x) = x^3 - 27x$? Scrivi una disequazione, per esempio $1 < x < 5$.`, suggerimenti: [R`$f$ decresce dove $f'(x) < 0$.`, R`$f'$ è una parabola verso l'alto: è negativa fra gli zeri.`], risposta: fra(-3, 3), soluzione: [R`$f'(x) = 3x^2 - 27 = 3(x - 3)(x + 3)$.`, R`$f' < 0$ fra gli zeri: $f$ decresce per $-3 < x < 3$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Dove cresce $f(x) = x - \ln x$, che ha dominio $x > 0$?`, suggerimenti: [R`$f'(x) = 1 - \dfrac{1}{x}$.`, R`Per $x > 0$ puoi moltiplicare per $x$ senza cambiare il verso.`], risposta: dopo(1), soluzione: [R`$f'(x) = 1 - \dfrac{1}{x} = \dfrac{x - 1}{x}$.`, R`Per $x > 0$ il denominatore è positivo: $f' > 0$ quando $x > 1$.`, R`$f$ cresce per $x > 1$ e decresce per $0 < x < 1$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Trova il massimo assoluto di $f(x) = x^2 - 4x$ nell'intervallo $\Icc{0}{5}$.`, suggerimenti: [R`Candidati: il punto stazionario e i due estremi dell'intervallo.`], risposta: val(5), soluzione: [R`$f'(x) = 2x - 4$ si annulla in $x = 2$, con $f(2) = -4$.`, R`Agli estremi: $f(0) = 0$ e $f(5) = 25 - 20 = 5$.`, R`Il massimo assoluto è $5$, in $x = 5$: un estremo dell'intervallo.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Trova il minimo assoluto di $f(x) = x^3 - 3x^2$ nell'intervallo $\Icc{-1}{3}$.`, suggerimenti: [R`Calcola $f$ nei punti stazionari e negli estremi, poi confronta.`], risposta: val(-4), soluzione: [R`$f'(x) = 3x^2 - 6x = 3x(x - 2)$: punti stazionari $0$ e $2$.`, R`$f(-1) = -1 - 3 = -4$, $f(0) = 0$, $f(2) = 8 - 12 = -4$, $f(3) = 27 - 27 = 0$.`, R`Il minimo assoluto è $-4$, raggiunto in due punti: $x = -1$ e $x = 2$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Verifica le ipotesi del teorema di Rolle per $f(x) = x^2 - 6x + 8$ in $\Icc{2}{4}$ e determina il valore di $c$.`, suggerimenti: [R`È un polinomio: continuità e derivabilità sono automatiche. Controlla i valori agli estremi.`, R`Imponi $f'(c) = 0$ con $f'(x) = 2x - 6$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01 }, soluzione: [R`$f(2) = 4 - 12 + 8 = 0$ e $f(4) = 16 - 24 + 8 = 0$: i valori agli estremi coincidono.`, R`$f'(x) = 2x - 6$ si annulla per $x = 3$, che appartiene a $\Iaa{2}{4}$.`, R`$c = 3$: è il vertice della parabola.`] },
    { id: 'es-02', difficolta: 1, testo: R`Determina il punto $c$ del teorema di Lagrange per $f(x) = x^2 - 2x$ nell'intervallo $\Icc{0}{4}$.`, suggerimenti: [R`Calcola prima il coefficiente angolare della corda.`, R`Poi risolvi $f'(c) = \dfrac{f(4) - f(0)}{4 - 0}$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`$f(0) = 0$, $f(4) = 16 - 8 = 8$. La corda ha pendenza $\dfrac{8 - 0}{4} = 2$.`, R`$f'(x) = 2x - 2$, quindi $2c - 2 = 2$.`, R`$c = 2$, interno all'intervallo.`] },
    { id: 'es-03', difficolta: 1, testo: R`Calcola $\lim_{x \to 0} \dfrac{e^x - 1 - x}{x^2}$.`, suggerimenti: [R`Controlla che sia davvero una forma $\frac{0}{0}$: per $x = 0$ il numeratore vale $1 - 1 - 0 = 0$.`, R`Dopo la prima applicazione ottieni ancora $\frac{0}{0}$: applica il teorema una seconda volta.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.001 }, soluzione: [R`Forma $\dfrac{0}{0}$: derivi sopra e sotto e ottieni $\lim_{x \to 0} \dfrac{e^x - 1}{2x}$.`, R`Ancora $\dfrac{0}{0}$: applichi di nuovo, $\lim_{x \to 0} \dfrac{e^x}{2} = \dfrac{1}{2}$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Determina l'intervallo in cui $f(x) = x^3 - 12x$ è decrescente (estremi inclusi).`, suggerimenti: [R`Studia il segno di $f'(x) = 3x^2 - 12$.`, R`La derivata è negativa fra i suoi due zeri.`], risposta: { tipo: 'intervallo', da: -2, a: 2, chiusoDa: true, chiusoA: true }, soluzione: [R`$f'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$.`, R`$f'(x) < 0$ per $-2 < x < 2$, positiva all'esterno.`, R`La funzione è decrescente in $\Icc{-2}{2}$. In $x = -2$ ha un massimo relativo e in $x = 2$ un minimo relativo.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola $\lim_{x \to 0} \dfrac{\tan x - x}{x^3}$.`, suggerimenti: [R`È una forma $\frac{0}{0}$. Ricorda che la derivata di $\tan x$ è $1 + \tan^2 x$.`, R`Dopo la prima applicazione ottieni $\dfrac{\tan^2 x}{3x^2}$: concludi con il limite notevole $\dfrac{\tan x}{x} \to 1$.`], risposta: { tipo: 'numero', valore: 1 / 3, tolleranza: 0.01 }, soluzione: [R`Numeratore e denominatore tendono a $0$: forma $\dfrac{0}{0}$.`, R`Derivando: $\lim_{x \to 0} \dfrac{(1 + \tan^2 x) - 1}{3x^2} = \lim_{x \to 0} \dfrac{\tan^2 x}{3x^2}$.`, R`Poiché $\dfrac{\tan x}{x} \to 1$, il limite vale $\dfrac{1}{3}$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Il teorema di Rolle è applicabile a $f(x) = |x - 2|$ nell'intervallo $\Icc{1}{3}$? Rispondi sì o no.`, suggerimenti: [R`Controlla una per una le tre ipotesi.`, R`I valori agli estremi coincidono, ma che cosa succede in $x = 2$?`], risposta: { tipo: 'testo', accettate: ['no', 'no.', 'non e applicabile', 'non è applicabile', 'no, non e derivabile in 2', 'no, non è derivabile in 2', 'no, non è derivabile in x = 2', 'no, non è derivabile', 'no perché non è derivabile in 2', 'no, perché non è derivabile in 2'] }, soluzione: [R`$f$ è continua in $\Icc{1}{3}$ e $f(1) = f(3) = 1$: la prima e la terza ipotesi valgono.`, R`Ma in $x = 2$ c'è un punto angoloso: la derivata sinistra vale $-1$, la destra $+1$. Quindi $f$ non è derivabile in un punto interno.`, R`Il teorema non è applicabile. Infatti $f'(x)$ vale $\pm 1$ e non si annulla mai: la tesi è falsa.`] },
    { id: 'es-07', difficolta: 2, testo: R`Trova il punto $c$ del teorema di Cauchy per $f(x) = x^2$ e $g(x) = x^3$ in $\Icc{0}{1}$.`, suggerimenti: [R`Controlla che $g'(x) = 3x^2$ non si annulli dentro $\Iaa{0}{1}$.`, R`Risolvi $\dfrac{2c}{3c^2} = \dfrac{f(1) - f(0)}{g(1) - g(0)}$.`], risposta: val(2 / 3), soluzione: [R`$f$ e $g$ sono polinomi, e $g'(x) = 3x^2 \ne 0$ per $0 < x < 1$: le ipotesi valgono.`, R`Il secondo membro vale $\dfrac{1 - 0}{1 - 0} = 1$.`, R`$\dfrac{2c}{3c^2} = \dfrac{2}{3c} = 1$, quindi $c = \dfrac{2}{3}$, che sta in $\Iaa{0}{1}$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Calcola $\lim_{x \to 0} \dfrac{1 - \cos x}{x \sin x}$.`, suggerimenti: [R`Forma $\frac{0}{0}$. Al denominatore usa la regola del prodotto.`, R`Dopo la prima applicazione è ancora $\frac{0}{0}$.`], risposta: val(0.5), soluzione: [R`Derivando: $\lim_{x \to 0} \dfrac{\sin x}{\sin x + x\cos x}$, ancora $\dfrac{0}{0}$.`, R`Di nuovo: $\lim_{x \to 0} \dfrac{\cos x}{\cos x + \cos x - x\sin x} = \dfrac{1}{1 + 1 - 0} = \dfrac{1}{2}$.`, R`Si arriva allo stesso risultato con i limiti notevoli: $\dfrac{1 - \cos x}{x^2} \cdot \dfrac{x}{\sin x} \to \dfrac{1}{2} \cdot 1$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Di una funzione $f$ derivabile in $\mathbb{R}$ si sa che $f'(x) = 2x$ per ogni $x$ e che $f(1) = 5$. Quanto vale $f(3)$?`, suggerimenti: [R`Trova una funzione con derivata $2x$.`, R`Due funzioni con la stessa derivata su un intervallo differiscono per una costante.`], risposta: val(13), soluzione: [R`$x^2$ ha derivata $2x$. Quindi $f(x) - x^2$ ha derivata nulla su $\mathbb{R}$: è una costante $k$.`, R`$f(x) = x^2 + k$, e $f(1) = 1 + k = 5$ dà $k = 4$.`, R`$f(3) = 9 + 4 = 13$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Calcola $\lim_{x \to 0^+} x^x$.`, suggerimenti: [R`Scrivi la potenza come esponenziale: $x^x = e^{x \ln x}$.`, R`Calcola prima il limite dell'esponente.`], risposta: val(1), soluzione: [R`$x^x = e^{x \ln x}$: la forma $0^0$ diventa un problema sull'esponente.`, R`$\lim_{x \to 0^+} x \ln x = 0$, con de l'Hôpital dopo averlo scritto come $\dfrac{\ln x}{1/x}$.`, R`Quindi $x^x \to e^0 = 1$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Calcola $\lim_{x \to +\infty} \dfrac{x + \sin x}{x + \cos x}$ e spiega perché il teorema di de l'Hôpital qui non aiuta.`, suggerimenti: [R`Prova ad applicare de l'Hôpital e guarda che cosa ottieni.`, R`Raccogli $x$ a numeratore e a denominatore e usa il fatto che $\sin x$ e $\cos x$ sono limitate.`], risposta: { tipo: 'numero', valore: 1, tolleranza: 0.001 }, soluzione: [R`La forma è $\dfrac{\infty}{\infty}$. Il rapporto delle derivate però è $\dfrac{1 + \cos x}{1 - \sin x}$, che per $x \to +\infty$ **non ha limite**. In più il denominatore $1 - \sin x$ si annulla in infiniti punti, contro l'ipotesi $g' \ne 0$.`, R`Il teorema è a senso unico. Se il limite del rapporto delle derivate non esiste, non si conclude nulla: il limite di partenza potrebbe esistere lo stesso.`, R`Si procede in altro modo: $\dfrac{x + \sin x}{x + \cos x} = \dfrac{1 + \frac{\sin x}{x}}{1 + \frac{\cos x}{x}}$. Poiché $\dfrac{\sin x}{x} \to 0$ e $\dfrac{\cos x}{x} \to 0$, il limite vale $1$.`] },
    { id: 'es-12', difficolta: 2, testo: R`Dimostra che $e^x \ge 1 + x$ per ogni $x$ reale.`, suggerimenti: [R`Studia la differenza $g(x) = e^x - 1 - x$.`, R`Trova dove $g$ cresce e dove decresce: dov'è il suo minimo?`], soluzione: [R`Sia $g(x) = e^x - 1 - x$. Allora $g'(x) = e^x - 1$.`, R`$g'(x) < 0$ per $x < 0$ e $g'(x) > 0$ per $x > 0$. Per il criterio di monotonia $g$ decresce fino a $0$ e poi cresce.`, R`Quindi in $x = 0$ c'è il minimo assoluto, e vale $g(0) = 1 - 1 - 0 = 0$.`, R`Allora $g(x) \ge 0$ per ogni $x$, cioè $e^x \ge 1 + x$. L'uguaglianza vale solo in $x = 0$: la retta $y = 1 + x$ è la tangente al grafico di $e^x$ in $\Iaa{0}{1}$.`] }
  ],
  quiz: [
    { id: 'q-01', domanda: R`Quale ipotesi **non** è richiesta dal teorema di Rolle?`, opzioni: [R`$f$ continua in $\Icc{a}{b}$`, R`$f$ derivabile in $\Iaa{a}{b}$`, R`$f(a) = f(b)$`, R`$f$ derivabile anche negli estremi $a$ e $b$`], corretta: 3, spiegazione: R`La derivabilità si chiede solo nei punti interni: $f(x) = \sqrt{1 - x^2}$ in $\Icc{-1}{1}$ soddisfa Rolle pur avendo tangente verticale agli estremi. Continuità in $\Icc{a}{b}$, derivabilità in $\Iaa{a}{b}$ e $f(a) = f(b)$ sono proprio le ipotesi del teorema.` },
    { id: 'q-02', domanda: R`Perché il teorema di Rolle non si applica a $f(x) = |x|$ in $\Icc{-1}{1}$?`, opzioni: [R`perché $f(-1) \ne f(1)$`, R`perché $f$ non è continua in $0$`, R`perché $f$ non è derivabile in $0$`, R`perché l'intervallo non è chiuso`], corretta: 2, spiegazione: R`$f(-1) = f(1) = 1$ e la funzione è continua ovunque. Salta invece la derivabilità nel punto angoloso $x = 0$. Infatti $f'$ vale $\pm 1$ e non si annulla mai.` },
    { id: 'q-03', domanda: R`Il teorema di Lagrange garantisce l'esistenza di un punto interno in cui…`, opzioni: [R`la tangente è parallela alla corda`, R`la tangente è orizzontale, qualunque sia la funzione`, R`la funzione vale la media fra $f(a)$ e $f(b)$`, R`la derivata seconda si annulla in quel punto`], corretta: 0, spiegazione: R`La tesi è $f'(c) = \dfrac{f(b) - f(a)}{b - a}$: la pendenza della tangente uguaglia quella della corda. La tangente orizzontale si ha solo nel caso particolare di Rolle. Sulla derivata seconda il teorema non dice nulla.` },
    { id: 'q-04', domanda: R`Il teorema di Rolle è il caso particolare del teorema di Lagrange in cui…`, opzioni: [R`$f$ è costante`, R`$f(a) = f(b)$`, R`$a = b$`, R`$f'(a) = f'(b)$`], corretta: 1, spiegazione: R`Se $f(a) = f(b)$ il rapporto $\dfrac{f(b) - f(a)}{b - a}$ vale zero e la tesi di Lagrange diventa $f'(c) = 0$. Con $a = b$ non ci sarebbe nessun intervallo, e chiedere $f$ costante è molto di più.` },
    { id: 'q-05', domanda: R`Se $f'(x) = 0$ per ogni $x$ di un intervallo $I$, allora in $I$…`, opzioni: [R`$f(x) = 0$`, R`$f$ è crescente`, R`$f$ ha un flesso`, R`$f$ è costante`], corretta: 3, spiegazione: R`Per Lagrange $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) = 0$: la funzione assume sempre lo stesso valore. Attenzione: costante non vuol dire nulla. Il valore costante può essere qualunque.` },
    { id: 'q-06', domanda: R`Se $f$ è derivabile e strettamente crescente in un intervallo $I$, si può concludere che…`, opzioni: [R`$f'(x) > 0$ per ogni $x \in I$`, R`$f'(x) \ge 0$ per ogni $x \in I$`, R`$f'(x) \ne 0$ per ogni $x \in I$`, R`$f''(x) > 0$ per ogni $x \in I$`], corretta: 1, spiegazione: R`La derivata può annullarsi in qualche punto isolato senza che la crescenza si interrompa: $y = x^3$ è strettamente crescente ma $f'(0) = 0$. Da «strettamente crescente» si ricava solo $f' \ge 0$.` },
    { id: 'q-07', domanda: R`Prima di applicare il teorema di de l'Hôpital bisogna…`, opzioni: [R`verificare che il limite si presenti nella forma $\frac{0}{0}$ o $\frac{\infty}{\infty}$`, R`calcolare la derivata del quoziente $\frac{f}{g}$`, R`verificare che $f$ e $g$ siano continue in $x_0$`, R`conoscere già il valore del limite`], corretta: 0, spiegazione: R`Il teorema vale solo per quelle due forme indeterminate: applicato a $\lim_{x \to 0} \frac{x+1}{x+2}$ darebbe $1$ invece di $\frac{1}{2}$. Non si deriva il quoziente, e la continuità in $x_0$ non serve: $x_0$ può anche essere escluso dal dominio.` },
    { id: 'q-08', domanda: R`Se $\lim \dfrac{f'(x)}{g'(x)}$ non esiste, il limite di $\dfrac{f(x)}{g(x)}$…`, opzioni: [R`certamente non esiste nemmeno lui`, R`vale sempre $0$, qualunque siano $f$ e $g$`, R`può esistere lo stesso`, R`è certamente infinito, positivo o negativo`], corretta: 2, spiegazione: R`Il teorema funziona in un verso solo. Per $\lim_{x \to +\infty} \frac{x + \sin x}{x}$ il rapporto delle derivate è $1 + \cos x$, che non ha limite. Eppure il limite di partenza vale $1$.` },
    { id: 'q-09', domanda: R`Il teorema di Fermat afferma che, in un punto di estremo relativo interno in cui $f$ è derivabile…`, opzioni: [R`$f''(x_0) < 0$`, R`$f(x_0) = 0$`, R`$f'(x_0) \ne 0$`, R`$f'(x_0) = 0$`], corretta: 3, spiegazione: R`La tangente in un estremo relativo interno è orizzontale. Il segno di $f''$ serve poi a distinguere massimi e minimi, ma non fa parte del teorema di Fermat. Il valore $f(x_0)$ non c'entra.` },
    { id: 'q-10', domanda: R`Un punto in cui $f'(x_0) = 0$…`, opzioni: [R`è certamente un massimo relativo`, R`è certamente un minimo relativo`, R`è un punto stazionario, e può essere massimo, minimo o flesso`, R`è un punto di non derivabilità`], corretta: 2, spiegazione: R`$f'(x_0) = 0$ è condizione necessaria ma non sufficiente. $y = x^3$ ha $f'(0) = 0$ e in $0$ non ha né massimo né minimo, ma un flesso a tangente orizzontale.` },
    { id: 'q-11', domanda: R`In un intervallo chiuso $\Icc{a}{b}$, il massimo assoluto di una funzione continua e derivabile…`, opzioni: [R`può trovarsi anche in un estremo dell'intervallo`, R`si trova sempre in un punto stazionario`, R`esiste solo se $f'$ si annulla da qualche parte`, R`coincide sempre con il massimo relativo più alto all'interno`], corretta: 0, spiegazione: R`Fermat riguarda solo i punti **interni**: negli estremi la derivata non è tenuta ad annullarsi, eppure lì il massimo può cadere. Pensa a $f(x) = x$ in $\Icc{0}{1}$: nessun punto stazionario, massimo in $1$. Per Weierstrass il massimo esiste comunque.` },
    { id: 'q-12', domanda: R`Nel teorema di Cauchy si sceglie $g(x) = x$. Che cosa si ottiene?`, opzioni: [R`il teorema di Rolle`, R`il teorema di Lagrange`, R`il teorema di Fermat`, R`il criterio di monotonia`], corretta: 1, spiegazione: R`Con $g(x) = x$ si ha $g'(c) = 1$ e $g(b) - g(a) = b - a$. La tesi diventa $f'(c) = \dfrac{f(b) - f(a)}{b - a}$, cioè Lagrange. Rolle si ottiene solo aggiungendo $f(a) = f(b)$.` },
    { id: 'q-13', domanda: R`A quale di questi limiti si può applicare **subito** il teorema di de l'Hôpital?`, opzioni: [R`$\lim_{x \to 0} \dfrac{x + 1}{x + 2}$`, R`$\lim_{x \to 0^+} x \ln x$`, R`$\lim_{x \to +\infty} \dfrac{\ln x}{x}$`, R`$\lim_{x \to 0^+} \dfrac{\cos x}{x}$`], corretta: 2, spiegazione: R`$\frac{\ln x}{x}$ per $x \to +\infty$ è nella forma $\frac{\infty}{\infty}$. $\frac{x+1}{x+2}$ in $0$ vale $\frac{1}{2}$ e non è indeterminata. $x \ln x$ è $0 \cdot \infty$: va prima scritta come quoziente. $\frac{\cos x}{x}$ è $\frac{1}{0^+}$, che fa $+\infty$ senza teoremi.` },
    { id: 'q-14', domanda: R`Un'auto percorre $120$ km in un'ora e mezza, senza salti di velocità. Che cosa garantisce il teorema di Lagrange?`, opzioni: [R`la velocità è stata sempre di $80$ km/h`, R`la velocità massima è stata di $80$ km/h`, R`in almeno un istante la velocità è stata zero`, R`in almeno un istante il tachimetro ha segnato $80$ km/h`], corretta: 3, spiegazione: R`La velocità media è $\frac{120}{1{,}5} = 80$ km/h, la pendenza della «corda». Lagrange dice che in almeno un istante la velocità istantanea è uguale alla media. Non dice che sia sempre quella, né che sia la massima.` },
    { id: 'q-15', domanda: R`$f$ è derivabile in $\mathbb{R}$, con $f'(x) = 0$ per ogni $x$ e $f(2) = 5$. Quanto vale $f(7)$?`, opzioni: [R`$0$`, R`$5$`, R`$12$`, R`non si può sapere`], corretta: 1, spiegazione: R`Derivata nulla su un intervallo (qui tutto $\mathbb{R}$) vuol dire funzione costante. Il valore costante è $f(2) = 5$, quindi anche $f(7) = 5$. Lo zero è il valore della derivata, non della funzione.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di usare un teorema controlla le ipotesi una per una: continuità in $\Icc{a}{b}$, derivabilità in $\Iaa{a}{b}$ e, per Rolle, $f(a) = f(b)$. Se ne manca una, la tesi può essere falsa.` },
    { tipo: 'errore', testo: R`Il punto $c$ di Rolle e di Lagrange deve stare **dentro** $\Iaa{a}{b}$. Se l'equazione dà anche valori fuori, scartali.` },
    { tipo: 'errore', testo: R`Con de l'Hôpital si derivano numeratore e denominatore **separatamente**. Chi applica la regola del quoziente ottiene numeri sbagliati e non se ne accorge.` },
    { tipo: 'metodo', testo: R`Prima di applicare de l'Hôpital, prova con i limiti notevoli o con un raccoglimento. Spesso sono più veloci, e in qualche caso, come $\frac{x + \sin x}{x}$, la regola non conclude affatto.` },
    { tipo: 'errore', testo: R`Non si scrive «crescente in $\Iaa{-\infty}{0} \cup \Iaa{0}{+\infty}$». La monotonia si dichiara su un intervallo alla volta, perché l'unione non è un intervallo.` },
    { tipo: 'errore', testo: R`$f'(x_0) = 0$ non basta per dire «massimo». Controlla sempre il cambio di segno di $f'$: potrebbe essere un flesso a tangente orizzontale.` },
    { tipo: 'trucco', testo: R`Per il massimo assoluto su $\Icc{a}{b}$ fai una lista: punti stazionari, punti di non derivabilità, estremi $a$ e $b$. Calcola $f$ in ognuno e confronta i valori.` },
    { tipo: 'errore', testo: R`Fermat vale solo nei punti interni. In un estremo dell'intervallo il massimo può esserci anche con $f' \ne 0$.` }
  ],

  aneddoti: [
    { matematico: 'Michel Rolle', anni: '1652–1719', titolo: 'Il teorema di chi non credeva nel calcolo', testo: R`Rolle nacque in Alvernia da una famiglia modesta, lavorò come scrivano per un notaio e per alcuni avvocati e imparò la matematica da solo. Si fece notare risolvendo un problema di analisi indeterminata che aveva messo in difficoltà i dotti dell'epoca, e nel 1690 pubblicò il *Traité d'algèbre*, dove compare anche la notazione con l'indice sulla radice che usiamo ancora. Il risultato che oggi porta il suo nome lo dimostrò l'anno dopo, in forma puramente algebrica, per le equazioni polinomiali: serviva a separare le radici, non a fondare l'analisi. Il paradosso è che Rolle fu uno dei più accaniti oppositori del calcolo infinitesimale, che davanti all'Accademia delle Scienze definiva una raccolta di ragionamenti ingegnosi ma falsi. Il nome «teorema di Rolle» arrivò solo nell'Ottocento.`, legame: R`Il teorema di Rolle è il primo mattone: da lui si ricava Lagrange, e da Lagrange tutto il legame fra segno della derivata e andamento della funzione.` },

    { matematico: 'Joseph-Louis Lagrange', anni: '1736–1813', titolo: 'Il torinese che scrisse un libro senza figure', testo: R`Nato a Torino come Giuseppe Luigi Lagrangia, a diciannove anni era già professore alla Scuola di artiglieria. Eulero lo volle a Berlino come proprio successore, e più tardi Parigi lo accolse fra i suoi maggiori scienziati: presiedette la commissione che definì il sistema metrico decimale e Napoleone lo fece conte e senatore. La sua *Mécanique analytique* del 1788 apre con una dichiarazione orgogliosa: in quest'opera non si troverà nessuna figura. Tutta la meccanica, sosteneva, si può ridurre a calcolo. Morì a Parigi nel 1813 ed è sepolto al Panthéon.`, legame: R`Il teorema di Lagrange trasforma un'informazione locale, la derivata in un punto, in un'informazione globale: come si comporta la funzione su tutto un intervallo.` },

    { matematico: 'Augustin-Louis Cauchy', anni: '1789–1857', titolo: 'Il giuramento rifiutato e gli anni di esilio', testo: R`Cauchy era un cattolico fervente e un monarchico convinto. Nel 1830 la rivoluzione di luglio cacciò da Parigi il re Carlo X. Il nuovo re, Luigi Filippo, chiese ai professori un giuramento di fedeltà: Cauchy rifiutò, perse le cattedre e lasciò la Francia. Insegnò fisica matematica a Torino, poi andò a Praga come precettore del nipote del re deposto. Tornò a Parigi nel 1838, ma senza giuramento non poté riavere un posto all'università per altri dieci anni. Intanto non smise mai di pubblicare. Già nelle lezioni del 1823 all'École polytechnique aveva dimostrato il teorema del valor medio partendo dalla derivata come limite del rapporto incrementale. La versione con due funzioni, che oggi porta il suo nome, è lo strumento con cui si dimostra la regola di de l'Hôpital.`, legame: R`Il teorema di Cauchy estende Lagrange a due funzioni insieme, ed è la chiave per dimostrare il teorema di de l'Hôpital.` }
  ]
});
})();
