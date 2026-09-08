(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'equazioni-secondo-grado',
  titolo: 'Equazioni di secondo grado',

  introduzione: R`Un'equazione di secondo grado è un'equazione in cui l'incognita compare elevata al quadrato: $ax^2 + bx + c = 0$. È il primo caso in cui una formula generale risolve *tutte* le equazioni di un certo tipo, ed è per questo che la formula risolutiva è tra le cose più ricordate (e più sbagliate) di tutta la matematica scolastica.

Le equazioni di secondo grado saltano fuori ovunque ci sia un'area, una traiettoria o un prodotto: il tempo che una palla impiega a cadere, le dimensioni di un rettangolo di cui si conoscono perimetro e area, il punto in cui una parabola taglia l'asse delle ascisse. I babilonesi le risolvevano già quattromila anni fa, senza simboli, con ricette a parole.

Per seguire bene serve saper risolvere le equazioni di primo grado, scomporre un polinomio e maneggiare le radici quadrate.`,

  sezioni: [
    { id: 'forma-normale', titolo: 'La forma normale', testo: R`Un'equazione è di **secondo grado** se, dopo aver portato tutto a primo membro e ridotto i termini simili, l'incognita compare al massimo con esponente 2.

>* **Forma normale:** $ax^2 + bx + c = 0$, con $a \ne 0$. Il numero $a$ è il coefficiente del termine di secondo grado, $b$ quello del termine di primo grado, $c$ è il **termine noto**.

Se $a = 0$ il termine quadratico sparisce e l'equazione diventa di primo grado: la condizione $a \ne 0$ non è un dettaglio, è ciò che rende l'equazione "di secondo grado".

Prima di risolvere, si riporta sempre in forma normale. Per esempio $(x-1)(x+2) = 4$ non è in forma normale: sviluppando, $x^2 + x - 2 = 4$, cioè $x^2 + x - 6 = 0$. Qui $a = 1$, $b = 1$, $c = -6$.

Un'equazione si dice **completa** se $b$ e $c$ sono entrambi diversi da zero, **incompleta** se manca almeno uno dei due. Le incomplete si risolvono senza formula, come vedremo.

>! Il segno dei coefficienti va letto dalla forma normale. In $3x^2 - 5x + 2 = 0$ si ha $b = -5$, non $5$: dimenticare il meno è l'errore più frequente nell'applicare la formula.

Un'equazione di secondo grado ha **al massimo due soluzioni** reali, chiamate anche **radici**. Possono essere due, una sola (si dice "doppia" o "coincidente") oppure nessuna.` },

    { id: 'incomplete', titolo: 'Le equazioni incomplete', testo: R`Quando manca $b$ o $c$ non serve la formula: bastano la scomposizione e le radici quadrate.

### Equazione pura: manca $b$

$ax^2 + c = 0$. Si isola $x^2$: $x^2 = -\dfrac{c}{a}$. Se $-\dfrac{c}{a} > 0$ ci sono due soluzioni opposte, $x = \pm\sqrt{-\dfrac{c}{a}}$; se è negativo l'equazione è **impossibile** (un quadrato non è mai negativo); se è zero l'unica soluzione è $x=0$.

Esempio: $2x^2 - 18 = 0 \Rightarrow x^2 = 9 \Rightarrow x = \pm 3$. Invece $x^2 + 4 = 0 \Rightarrow x^2 = -4$: impossibile in $\mathbb{R}$.

### Equazione spuria: manca $c$

$ax^2 + bx = 0$. Si raccoglie $x$: $x(ax + b) = 0$. Un prodotto è nullo quando lo è almeno un fattore (**legge di annullamento del prodotto**), quindi $x = 0$ oppure $x = -\dfrac{b}{a}$.

Esempio: $3x^2 - 12x = 0 \Rightarrow 3x(x - 4) = 0 \Rightarrow x = 0 \lor x = 4$.

>! Nella spuria non si divide per $x$: $3x^2 = 12x \Rightarrow 3x = 12 \Rightarrow x = 4$ perde la soluzione $x = 0$. Dividere per l'incognita è lecito solo se si è sicuri che non valga zero.

### Equazione monomia: mancano $b$ e $c$

$ax^2 = 0$ ha come unica soluzione $x = 0$, doppia.

>* Una spuria ha sempre la soluzione $x = 0$. Una pura ha soluzioni opposte, oppure nessuna.` },

    { id: 'formula-risolutiva', titolo: 'La formula risolutiva e il discriminante', testo: R`Per l'equazione completa si usa la **formula risolutiva**, che si ottiene con il *completamento del quadrato*: l'idea è aggiungere a $x^2 + bx$ il pezzo che manca per farne un quadrato perfetto. L'animazione lo mostra con $x^2 + 6x$: il pezzo mancante è $9$, e $x^2 + 6x + 9 = (x+3)^2$.

[[animazione:completamento-quadrato]]

Partendo da $ax^2 + bx + c = 0$ si moltiplica per $4a$: $4a^2x^2 + 4abx + 4ac = 0$. I primi due termini sono l'inizio del quadrato $(2ax + b)^2 = 4a^2x^2 + 4abx + b^2$, quindi

$$(2ax + b)^2 = b^2 - 4ac.$$

Da qui $2ax + b = \pm\sqrt{b^2 - 4ac}$ e infine:

>* **Formula risolutiva:** $$x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$ La quantità sotto radice si chiama **discriminante**: $\Delta = b^2 - 4ac$.

Il discriminante *discrimina*, cioè distingue, i tre casi possibili:

- $\Delta > 0$: due soluzioni reali e distinte;
- $\Delta = 0$: due soluzioni reali e coincidenti, $x_1 = x_2 = -\dfrac{b}{2a}$;
- $\Delta < 0$: nessuna soluzione reale (la radice di un numero negativo non esiste in $\mathbb{R}$).

Esempio: $2x^2 - 5x + 2 = 0$. Qui $a = 2$, $b = -5$, $c = 2$ e $\Delta = 25 - 16 = 9$. Allora
$$x_{1,2} = \frac{5 \pm 3}{4} \quad\Rightarrow\quad x_1 = 2,\ x_2 = \frac{1}{2}.$$

Sposta il cursore nel grafico: quando $c$ cresce la parabola sale e i punti in cui taglia l'asse $x$ si avvicinano, si fondono ($\Delta = 0$) e poi spariscono ($\Delta < 0$).

[[grafico:discriminante]]

>! Il segno meno davanti a $b$ e il $2a$ al denominatore valgono per *tutta* la frazione. Con $b = -5$ si ottiene $-(-5) = +5$: conviene scrivere prima i valori di $a$, $b$, $c$ e poi sostituirli tra parentesi.` },

    { id: 'formula-ridotta', titolo: 'La formula ridotta', testo: R`Quando $b$ è un numero **pari**, $b = 2k$, il calcolo si accorcia. Sostituendo nella formula risolutiva:

$$x_{1,2} = \frac{-2k \pm \sqrt{4k^2 - 4ac}}{2a} = \frac{-2k \pm 2\sqrt{k^2 - ac}}{2a} = \frac{-k \pm \sqrt{k^2 - ac}}{a}.$$

>* **Formula ridotta** (con $k = \dfrac{b}{2}$): $$x_{1,2} = \frac{-\frac{b}{2} \pm \sqrt{\left(\frac{b}{2}\right)^2 - ac}}{a}$$ La quantità $\dfrac{\Delta}{4} = \left(\dfrac{b}{2}\right)^2 - ac$ ha lo stesso segno di $\Delta$, quindi dice anche lei quante soluzioni ci sono.

Esempio: $x^2 - 6x + 5 = 0$. Qui $\dfrac{b}{2} = -3$, $\dfrac{\Delta}{4} = 9 - 5 = 4$ e
$$x_{1,2} = \frac{3 \pm 2}{1} \quad\Rightarrow\quad x_1 = 5,\ x_2 = 1.$$

Con la formula intera si sarebbe arrivati allo stesso risultato passando per $\sqrt{16} = 4$ e per la frazione $\dfrac{6 \pm 4}{2}$: numeri più grandi, stesse soluzioni.

> La ridotta non è obbligatoria: è una scorciatoia. Se non si è sicuri, la formula intera funziona sempre.` },

    { id: 'somma-prodotto', titolo: 'Somma e prodotto delle radici', testo: R`Se $x_1$ e $x_2$ sono le soluzioni di $ax^2 + bx + c = 0$ (con $\Delta \ge 0$), sommandole e moltiplicandole si trovano due relazioni molto comode:

>* $$x_1 + x_2 = -\frac{b}{a} \qquad\qquad x_1 \cdot x_2 = \frac{c}{a}$$

Si verificano a partire dalla formula: nella somma i termini $\pm\sqrt{\Delta}$ si cancellano e resta $\dfrac{-2b}{2a}$; nel prodotto si ottiene $\dfrac{b^2 - \Delta}{4a^2} = \dfrac{4ac}{4a^2}$.

Servono in due direzioni.

**Dalle radici all'equazione.** Un'equazione che ha soluzioni $x_1$ e $x_2$ è $x^2 - sx + p = 0$, dove $s$ è la somma e $p$ il prodotto. Con le radici $3$ e $-2$: $s = 1$, $p = -6$, equazione $x^2 - x - 6 = 0$.

**Dall'equazione alle radici, a mente.** In $x^2 - 5x + 6 = 0$ si cercano due numeri con somma $5$ e prodotto $6$: sono $2$ e $3$. Funziona bene quando le soluzioni sono intere e $a = 1$.

Dal prodotto si legge anche il segno delle soluzioni: se $\dfrac{c}{a} < 0$ le radici sono **discordi** (una positiva e una negativa); se $\dfrac{c}{a} > 0$ sono **concordi**, e il segno della somma dice se sono entrambe positive o entrambe negative.

Prova a trascinare le due radici nel grafico: la parabola $y = (x - x_1)(x - x_2)$ si ridisegna, e sopra vedi somma e prodotto, cioè $-b$ e $c$ dell'equazione $x^2 - sx + p = 0$.

[[grafico:radici]]

>! Le relazioni valgono solo se le soluzioni esistono, cioè se $\Delta \ge 0$. Con $\Delta < 0$ non ci sono radici da sommare.` },

    { id: 'scomposizione-trinomio', titolo: 'Scomporre il trinomio di secondo grado', testo: R`Le radici permettono di scomporre il trinomio $ax^2 + bx + c$ in fattori di primo grado.

>* Se $\Delta \ge 0$ e $x_1$, $x_2$ sono le radici: $$ax^2 + bx + c = a\,(x - x_1)(x - x_2)$$ Se $\Delta = 0$ i due fattori coincidono: $a\,(x - x_1)^2$. Se $\Delta < 0$ il trinomio è **irriducibile** in $\mathbb{R}$.

Esempio: $2x^2 - 5x + 2$ ha radici $2$ e $\dfrac{1}{2}$, quindi
$$2x^2 - 5x + 2 = 2\left(x - 2\right)\left(x - \frac{1}{2}\right) = (x - 2)(2x - 1).$$

Nell'ultimo passaggio il fattore $2$ è stato moltiplicato per la parentesi con la frazione, per eliminare il denominatore: è la forma che si trova sui libri.

Il legame con la scomposizione è a doppio senso: se un trinomio si scompone facilmente (per esempio con il trinomio speciale o come quadrato di binomio), le sue radici si leggono dai fattori, senza formula. $x^2 - 6x + 9 = (x-3)^2$ ha la radice doppia $x = 3$.

>! $a$ non va dimenticato: $2x^2 - 5x + 2 \ne (x-2)\left(x - \frac12\right)$. Il prodotto a destra ha coefficiente $1$ per $x^2$, il trinomio a sinistra ha $2$.` },

    { id: 'parabola-legame', titolo: 'Il significato grafico', testo: R`L'espressione $y = ax^2 + bx + c$ descrive una **parabola** con l'asse parallelo all'asse $y$. Le soluzioni dell'equazione $ax^2 + bx + c = 0$ sono le ascisse dei punti in cui la parabola incontra l'asse $x$, cioè gli **zeri** della funzione.

- $\Delta > 0$: la parabola taglia l'asse $x$ in due punti;
- $\Delta = 0$: la parabola è tangente all'asse $x$ nel suo vertice;
- $\Delta < 0$: la parabola sta tutta sopra (se $a > 0$) o tutta sotto (se $a < 0$) l'asse $x$.

Il vertice ha ascissa $x_V = -\dfrac{b}{2a}$: è esattamente il punto a metà fra le due radici, perché la parabola è simmetrica rispetto al suo asse. Con $\Delta = 0$ la radice doppia coincide con $x_V$.

Prova a cambiare $a$, $b$ e $c$ nel grafico e osserva dove finiscono i punti di intersezione: il segno di $a$ decide se la parabola è rivolta verso l'alto o verso il basso, $c$ è l'ordinata in cui taglia l'asse $y$.

[[grafico:parabola]]

> Questo legame è la chiave delle disequazioni di secondo grado: chiedersi dove $ax^2 + bx + c > 0$ significa chiedersi dove la parabola sta sopra l'asse $x$.` },

    { id: 'fratte', titolo: 'Equazioni fratte di secondo grado', testo: R`Un'equazione **fratta** ha l'incognita in almeno un denominatore. La strategia è la stessa del primo grado: si scrivono le **condizioni di esistenza** (c.e.), si riduce tutto allo stesso denominatore, si elimina il denominatore e si risolve l'equazione intera che resta. Alla fine si confrontano le soluzioni con le c.e.

Esempio: $\dfrac{1}{x-1} + \dfrac{1}{x+1} = \dfrac{3}{4}$.

1. C.e.: $x \ne 1$ e $x \ne -1$.
2. Denominatore comune $4(x-1)(x+1)$: $\dfrac{4(x+1) + 4(x-1)}{4(x^2-1)} = \dfrac{3(x^2-1)}{4(x^2-1)}$.
3. Numeratori uguali: $8x = 3x^2 - 3$, cioè $3x^2 - 8x - 3 = 0$.
4. $\Delta = 64 + 36 = 100$, $x_{1,2} = \dfrac{8 \pm 10}{6}$: $x_1 = 3$, $x_2 = -\dfrac{1}{3}$.
5. Entrambe rispettano le c.e., quindi sono accettabili.

>! Se una soluzione dell'equazione intera coincide con un valore escluso dalle c.e., va **scartata**: non è una soluzione dell'equazione di partenza. Non è raro che un'equazione fratta di secondo grado finisca con una sola soluzione, o con nessuna.` },

    { id: 'problemi', titolo: 'Problemi ed equazioni parametriche', testo: R`### Problemi

Molti problemi geometrici e numerici portano a un'equazione di secondo grado. Lo schema: si sceglie l'incognita, si traducono le condizioni, si risolve, e poi si **controlla che le soluzioni abbiano senso** nel problema.

Un rettangolo ha perimetro $28\ \text{cm}$ e area $48\ \text{cm}^2$. Dette $x$ e $y$ le dimensioni, $x + y = 14$ e $xy = 48$: le dimensioni sono due numeri di somma $14$ e prodotto $48$, cioè le radici di $t^2 - 14t + 48 = 0$. Si trova $t = 6$ oppure $t = 8$: il rettangolo è $6 \times 8$. Se una soluzione fosse venuta negativa, andava scartata: una lunghezza non è mai negativa.

### Equazioni parametriche

In un'equazione **parametrica** i coefficienti dipendono da una lettera, il parametro, e si chiede per quali valori del parametro l'equazione ha una certa proprietà. Gli strumenti sono sempre gli stessi: il discriminante e le relazioni fra radici e coefficienti.

Per esempio, $x^2 - 2kx + k + 2 = 0$ ha due soluzioni coincidenti quando $\dfrac{\Delta}{4} = k^2 - k - 2 = 0$, cioè per $k = 2$ oppure $k = -1$. Ha soluzioni opposte quando la somma è nulla: $2k = 0$, cioè $k = 0$ (e con $k = 0$ si ha $\Delta = -8 < 0$: le soluzioni non esistono, quindi la richiesta non ha risposta). Ha una soluzione uguale a $1$ quando $1 - 2k + k + 2 = 0$, cioè $k = 3$.

>* Prima di tutto ci si chiede *se* le soluzioni esistono ($\Delta \ge 0$); solo dopo si impongono le condizioni su somma, prodotto o segno.` }
  ],

  grafici: {
    radici: {
      tipo: 'piano', x: [-5, 5], y: [-7, 7],
      parametri: [
        { nome: 'x1', min: -4, max: 4, passo: 0.5, valore: -1, nascosto: true },
        { nome: 'x2', min: -4, max: 4, passo: 0.5, valore: 3, nascosto: true }
      ],
      funzioni: [{ f: '(x - x1)(x - x2)', etichetta: 'y = (x − x₁)(x − x₂)', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['x1', 0], trascina: true, etichetta: 'x₁ = {{x1}}', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['x2', 0], trascina: true, etichetta: 'x₂ = {{x2}}', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-4.7, 6.2], testo: 'somma s = {{x1 + x2}}    prodotto p = {{x1 * x2}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.7, 5.2], testo: 'x² − ({{x1 + x2}})x + ({{x1 * x2}}) = 0', ancora: 'start' }
      ],
      didascalia: 'Trascina x₁ e x₂ lungo l\'asse: l\'equazione con quelle radici è x² − s·x + p = 0.'
    },
    discriminante: {
      tipo: 'piano', x: [-2, 4], y: [-4, 5],
      funzioni: [{ f: 'x^2 - 2x + c', etichetta: 'y = x² − 2x + c', colore: 1 }],
      punti: [
        { x: '1 - sqrt(1 - c)', y: 0, etichetta: 'x₁', posizione: 'basso', colore: 2 },
        { x: '1 + sqrt(1 - c)', y: 0, etichetta: 'x₂', posizione: 'basso', colore: 2 }
      ],
      parametri: [{ nome: 'c', min: -3, max: 3, passo: 0.1, valore: -3, etichetta: 'c' }],
      didascalia: 'y = x² − 2x + c: il discriminante vale Δ = 4 − 4c. Per c < 1 due zeri, per c = 1 uno solo, per c > 1 nessuno.'
    },
    parabola: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      funzioni: [{ f: 'a x^2 + b x + c', etichetta: 'y = ax² + bx + c', colore: 1 }],
      punti: [
        { x: '(-b - sqrt(b^2 - 4 a c)) / (2a)', y: 0, etichetta: 'x₁', posizione: 'basso', colore: 2 },
        { x: '(-b + sqrt(b^2 - 4 a c)) / (2a)', y: 0, etichetta: 'x₂', posizione: 'basso', colore: 2 },
        { x: '-b/(2a)', y: 'c - b^2/(4a)', etichetta: 'V', posizione: 'alto', colore: 4 }
      ],
      elementi: [{ tipo: 'verticale', x: '-b/(2a)', tratteggio: true, colore: 4 }],
      parametri: [
        { nome: 'a', min: -3, max: 3, passo: 0.1, valore: 1, etichetta: 'a' },
        { nome: 'b', min: -6, max: 6, passo: 0.1, valore: -2, etichetta: 'b' },
        { nome: 'c', min: -6, max: 6, passo: 0.1, valore: -3, etichetta: 'c' }
      ],
      didascalia: 'Gli zeri x₁ e x₂ della parabola sono le soluzioni dell\'equazione; V è il vertice, a metà fra i due.'
    }
  },

  esempi: [
    { titolo: 'Un\'equazione pura', problema: R`Risolvi $4x^2 - 25 = 0$.`, passi: [
      R`Manca il termine in $x$: è un'equazione **pura**. Isolo $x^2$: $4x^2 = 25$, cioè $x^2 = \dfrac{25}{4}$.`,
      R`Il secondo membro è positivo, quindi ci sono due soluzioni opposte: $x = \pm\sqrt{\dfrac{25}{4}} = \pm\dfrac{5}{2}$.`,
      R`Verifica: $4 \cdot \dfrac{25}{4} - 25 = 0$. ✓`
    ], risultato: R`$x = -\dfrac{5}{2} \lor x = \dfrac{5}{2}$` },

    { titolo: 'Un\'equazione spuria', problema: R`Risolvi $x^2 = 7x$.`, passi: [
      R`Porto tutto a primo membro: $x^2 - 7x = 0$. Manca il termine noto: è **spuria**.`,
      R`Raccolgo $x$: $x(x - 7) = 0$.`,
      R`Legge di annullamento del prodotto: $x = 0$ oppure $x - 7 = 0$, cioè $x = 7$.`,
      R`Se avessi diviso per $x$ all'inizio, avrei trovato solo $x = 7$: la soluzione $x = 0$ sarebbe sparita.`
    ], risultato: R`$x = 0 \lor x = 7$` },

    { titolo: 'Con la formula risolutiva', problema: R`Risolvi $3x^2 + 5x - 2 = 0$.`, passi: [
      R`Coefficienti: $a = 3$, $b = 5$, $c = -2$.`,
      R`Discriminante: $\Delta = b^2 - 4ac = 25 - 4 \cdot 3 \cdot (-2) = 25 + 24 = 49$. È positivo: due soluzioni distinte, e $\sqrt{49} = 7$.`,
      R`Formula: $x_{1,2} = \dfrac{-5 \pm 7}{6}$.`,
      R`Con il più: $x_1 = \dfrac{2}{6} = \dfrac{1}{3}$. Con il meno: $x_2 = \dfrac{-12}{6} = -2$.`,
      R`Controllo con somma e prodotto: $\dfrac{1}{3} - 2 = -\dfrac{5}{3} = -\dfrac{b}{a}$ ✓ e $\dfrac{1}{3}\cdot(-2) = -\dfrac{2}{3} = \dfrac{c}{a}$ ✓.`
    ], risultato: R`$x = -2 \lor x = \dfrac{1}{3}$` },

    { titolo: 'Con la formula ridotta', problema: R`Risolvi $x^2 - 10x + 21 = 0$.`, passi: [
      R`$b = -10$ è pari: uso la ridotta con $\dfrac{b}{2} = -5$.`,
      R`$\dfrac{\Delta}{4} = \left(\dfrac{b}{2}\right)^2 - ac = 25 - 21 = 4$, radice $2$.`,
      R`$x_{1,2} = \dfrac{5 \pm 2}{1}$: $x_1 = 7$, $x_2 = 3$.`,
      R`A mente: due numeri con somma $10$ e prodotto $21$ sono proprio $3$ e $7$.`
    ], risultato: R`$x = 3 \lor x = 7$` },

    { titolo: 'Prima si riduce in forma normale', problema: R`Risolvi $(x + 3)^2 = 2(x + 3) + 8$.`, passi: [
      R`Sviluppo: $x^2 + 6x + 9 = 2x + 6 + 8$.`,
      R`Porto tutto a sinistra e riduco: $x^2 + 4x - 5 = 0$.`,
      R`$b = 4$ è pari: $\dfrac{\Delta}{4} = 4 + 5 = 9$, e $x_{1,2} = -2 \pm 3$.`,
      R`Soluzioni: $x_1 = 1$, $x_2 = -5$. Verifica con $x = 1$: $16 = 8 + 8$ ✓.`
    ], risultato: R`$x = -5 \lor x = 1$` },

    { titolo: 'Discriminante negativo', problema: R`Risolvi $x^2 - 3x + 5 = 0$.`, passi: [
      R`$\Delta = 9 - 20 = -11 < 0$.`,
      R`Una radice quadrata di numero negativo non esiste nei numeri reali: l'equazione è **impossibile** in $\mathbb{R}$.`,
      R`Graficamente: la parabola $y = x^2 - 3x + 5$ ha vertice in $x = \dfrac{3}{2}$ con ordinata $\dfrac{9}{4} - \dfrac{9}{2} + 5 = \dfrac{11}{4} > 0$, e non tocca mai l'asse $x$.`
    ], risultato: R`Nessuna soluzione reale` }
  ],

  formulario: [
    { nome: 'Forma normale', formula: R`ax^2 + bx + c = 0, \quad a \ne 0` },
    { nome: 'Discriminante', formula: R`\Delta = b^2 - 4ac`, nota: R`$\Delta > 0$: due soluzioni distinte; $\Delta = 0$: due coincidenti; $\Delta < 0$: nessuna reale.` },
    { nome: 'Formula risolutiva', formula: R`x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}` },
    { nome: 'Formula ridotta', formula: R`x_{1,2} = \frac{-\frac{b}{2} \pm \sqrt{\left(\frac{b}{2}\right)^2 - ac}}{a}`, nota: R`Conviene quando $b$ è pari.` },
    { nome: 'Equazione pura', formula: R`ax^2 + c = 0 \ \Rightarrow\ x = \pm\sqrt{-\frac{c}{a}}`, nota: R`Solo se $-\dfrac{c}{a} \ge 0$.` },
    { nome: 'Equazione spuria', formula: R`ax^2 + bx = 0 \ \Rightarrow\ x = 0 \ \lor\ x = -\frac{b}{a}` },
    { nome: 'Somma e prodotto delle radici', formula: R`x_1 + x_2 = -\frac{b}{a}, \qquad x_1 x_2 = \frac{c}{a}`, nota: R`Valgono se $\Delta \ge 0$.` },
    { nome: 'Equazione dalle radici', formula: R`x^2 - s\,x + p = 0`, nota: R`$s$ = somma, $p$ = prodotto delle radici volute.` },
    { nome: 'Scomposizione del trinomio', formula: R`ax^2 + bx + c = a\,(x - x_1)(x - x_2)`, nota: R`Se $\Delta < 0$ il trinomio è irriducibile in $\mathbb{R}$.` },
    { nome: 'Vertice della parabola', formula: R`x_V = -\frac{b}{2a}`, nota: R`È il punto medio fra le due radici.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'forma-normale', tipo: 'definizione', fronte: R`Forma normale di un'equazione di secondo grado`, retro: R`$ax^2 + bx + c = 0$ con $a \ne 0$.` },
    { id: 'fc-02', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Perché serve la condizione $a \ne 0$?`, retro: R`Con $a = 0$ sparisce il termine $x^2$ e l'equazione diventa di primo grado.` },
    { id: 'fc-03', sezione: 'forma-normale', tipo: 'definizione', fronte: R`Equazione completa e incompleta`, retro: R`Completa: $b \ne 0$ e $c \ne 0$. Incompleta: manca $b$ o $c$ (o entrambi).` },
    { id: 'fc-04', sezione: 'incomplete', tipo: 'definizione', fronte: R`Equazione pura`, retro: R`$ax^2 + c = 0$ (manca $b$). Soluzioni $x = \pm\sqrt{-c/a}$ se $-c/a \ge 0$, altrimenti impossibile.` },
    { id: 'fc-05', sezione: 'incomplete', tipo: 'definizione', fronte: R`Equazione spuria`, retro: R`$ax^2 + bx = 0$ (manca $c$). Si raccoglie $x$: soluzioni $x = 0$ e $x = -b/a$.` },
    { id: 'fc-06', sezione: 'incomplete', tipo: 'concetto', fronte: R`Perché non si divide per $x$ in $x^2 = 5x$?`, retro: R`Si perderebbe la soluzione $x = 0$. Si raccoglie: $x(x - 5) = 0$.` },
    { id: 'fc-07', sezione: 'incomplete', tipo: 'concetto', fronte: R`Legge di annullamento del prodotto`, retro: R`Un prodotto è zero se e solo se almeno un fattore è zero.` },
    { id: 'fc-08', sezione: 'formula-risolutiva', tipo: 'formula', fronte: R`Formula risolutiva`, retro: R`$x_{1,2} = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$` },
    { id: 'fc-09', sezione: 'formula-risolutiva', tipo: 'formula', fronte: R`Discriminante`, retro: R`$\Delta = b^2 - 4ac$` },
    { id: 'fc-10', sezione: 'formula-risolutiva', tipo: 'concetto', fronte: R`Cosa dice il segno di $\Delta$?`, retro: R`$\Delta > 0$: due soluzioni distinte. $\Delta = 0$: due coincidenti. $\Delta < 0$: nessuna soluzione reale.` },
    { id: 'fc-11', sezione: 'formula-risolutiva', tipo: 'formula', fronte: R`Soluzione quando $\Delta = 0$`, retro: R`$x_1 = x_2 = -\dfrac{b}{2a}$` },
    { id: 'fc-12', sezione: 'formula-risolutiva', tipo: 'procedura', fronte: R`Come si ricava la formula risolutiva?`, retro: R`Completando il quadrato: si moltiplica per $4a$ e si scrive $(2ax + b)^2 = b^2 - 4ac$.` },
    { id: 'fc-13', sezione: 'formula-ridotta', tipo: 'formula', fronte: R`Formula ridotta`, retro: R`$x_{1,2} = \dfrac{-\frac{b}{2} \pm \sqrt{\left(\frac{b}{2}\right)^2 - ac}}{a}$, quando $b$ è pari.` },
    { id: 'fc-14', sezione: 'formula-ridotta', tipo: 'formula', fronte: R`$\dfrac{\Delta}{4}$`, retro: R`$\left(\dfrac{b}{2}\right)^2 - ac$. Ha lo stesso segno di $\Delta$.` },
    { id: 'fc-15', sezione: 'somma-prodotto', tipo: 'formula', fronte: R`Somma delle radici`, retro: R`$x_1 + x_2 = -\dfrac{b}{a}$` },
    { id: 'fc-16', sezione: 'somma-prodotto', tipo: 'formula', fronte: R`Prodotto delle radici`, retro: R`$x_1 \cdot x_2 = \dfrac{c}{a}$` },
    { id: 'fc-17', sezione: 'somma-prodotto', tipo: 'procedura', fronte: R`Equazione con radici date $x_1$, $x_2$`, retro: R`$x^2 - s\,x + p = 0$ con $s = x_1 + x_2$ e $p = x_1 x_2$.` },
    { id: 'fc-18', sezione: 'somma-prodotto', tipo: 'concetto', fronte: R`Quando le radici sono discordi?`, retro: R`Quando il prodotto $\dfrac{c}{a}$ è negativo.` },
    { id: 'fc-19', sezione: 'scomposizione-trinomio', tipo: 'formula', fronte: R`Scomposizione di $ax^2 + bx + c$`, retro: R`$a\,(x - x_1)(x - x_2)$ se $\Delta \ge 0$; irriducibile in $\mathbb{R}$ se $\Delta < 0$.` },
    { id: 'fc-20', sezione: 'parabola-legame', tipo: 'concetto', fronte: R`Significato grafico delle soluzioni`, retro: R`Sono le ascisse dei punti in cui la parabola $y = ax^2 + bx + c$ incontra l'asse $x$.` },
    { id: 'fc-21', sezione: 'parabola-legame', tipo: 'concetto', fronte: R`Parabola e $\Delta < 0$`, retro: R`La parabola non tocca l'asse $x$: sta tutta sopra ($a > 0$) o tutta sotto ($a < 0$).` },
    { id: 'fc-22', sezione: 'fratte', tipo: 'procedura', fronte: R`Passi per un'equazione fratta`, retro: R`1) Condizioni di esistenza. 2) Denominatore comune. 3) Si risolve l'equazione dei numeratori. 4) Si scartano le soluzioni che violano le c.e.` },
    { id: 'fc-23', sezione: 'problemi', tipo: 'procedura', fronte: R`Equazione parametrica con soluzioni coincidenti`, retro: R`Si impone $\Delta = 0$ e si risolve rispetto al parametro.` },
    { id: 'fc-24', sezione: 'problemi', tipo: 'concetto', fronte: R`Soluzione negativa in un problema geometrico`, retro: R`Va scartata: lunghezze e aree non sono negative. Si controlla sempre che le soluzioni abbiano senso.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $x^2 - 7x + 12 = 0$.`, suggerimenti: [R`Calcola prima il discriminante.`, R`$\Delta = 49 - 48 = 1$: due soluzioni vicine.`], risposta: { tipo: 'numeri', valori: [3, 4] }, soluzione: [R`$a = 1$, $b = -7$, $c = 12$; $\Delta = 49 - 48 = 1$.`, R`$x_{1,2} = \dfrac{7 \pm 1}{2}$, cioè $x_1 = 4$ e $x_2 = 3$.`, R`Controllo: somma $7 = -b/a$, prodotto $12 = c/a$. ✓`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $3x^2 - 12 = 0$.`, suggerimenti: [R`Manca il termine in $x$: è un'equazione pura.`, R`Isola $x^2$ e ricorda che le soluzioni sono due, opposte.`], risposta: { tipo: 'numeri', valori: [-2, 2] }, soluzione: [R`$3x^2 = 12 \Rightarrow x^2 = 4$.`, R`$x = \pm 2$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi $5x^2 + 10x = 0$.`, suggerimenti: [R`Manca il termine noto: è spuria. Non dividere per $x$!`, R`Raccogli $5x$.`], risposta: { tipo: 'numeri', valori: [0, -2] }, soluzione: [R`$5x(x + 2) = 0$.`, R`$x = 0$ oppure $x + 2 = 0$, cioè $x = -2$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Risolvi $2x^2 + 3x - 2 = 0$.`, suggerimenti: [R`Formula risolutiva con $a = 2$, $b = 3$, $c = -2$.`, R`$\Delta = 9 + 16 = 25$.`], risposta: { tipo: 'numeri', valori: [0.5, -2] }, soluzione: [R`$\Delta = 9 - 4 \cdot 2 \cdot (-2) = 25$, $\sqrt{\Delta} = 5$.`, R`$x_{1,2} = \dfrac{-3 \pm 5}{4}$: $x_1 = \dfrac{2}{4} = \dfrac{1}{2}$, $x_2 = \dfrac{-8}{4} = -2$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi $x^2 + 4x + 5 = 0$. Se non ha soluzioni, scrivi "impossibile".`, suggerimenti: [R`Guarda il segno del discriminante prima di fare calcoli.`, R`$b$ è pari: usa $\dfrac{\Delta}{4} = 4 - 5$.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna', 'nessuna soluzione', 'nessuna soluzione reale', 'non ha soluzioni', 'insieme vuoto'] }, soluzione: [R`$\dfrac{\Delta}{4} = 2^2 - 5 = -1 < 0$.`, R`Il discriminante è negativo: nessuna soluzione reale. L'equazione è impossibile in $\mathbb{R}$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $(x - 2)^2 = 3x - 2$.`, suggerimenti: [R`Sviluppa il quadrato e porta tutto a primo membro.`, R`Dovresti arrivare a $x^2 - 7x + 6 = 0$.`], risposta: { tipo: 'numeri', valori: [1, 6] }, soluzione: [R`$x^2 - 4x + 4 = 3x - 2 \Rightarrow x^2 - 7x + 6 = 0$.`, R`$\Delta = 49 - 24 = 25$, $x_{1,2} = \dfrac{7 \pm 5}{2}$: $x_1 = 6$, $x_2 = 1$.`, R`A mente: somma $7$, prodotto $6$ → $1$ e $6$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Trova due numeri sapendo che la loro somma è $7$ e il loro prodotto è $10$.`, suggerimenti: [R`Due numeri con somma $s$ e prodotto $p$ sono le radici di $x^2 - sx + p = 0$.`, R`Risolvi $x^2 - 7x + 10 = 0$.`], risposta: { tipo: 'numeri', valori: [2, 5] }, soluzione: [R`I numeri sono le soluzioni di $x^2 - 7x + 10 = 0$.`, R`$\Delta = 49 - 40 = 9$, $x_{1,2} = \dfrac{7 \pm 3}{2}$: $5$ e $2$.`, R`Verifica: $2 + 5 = 7$, $2 \cdot 5 = 10$. ✓`] },
    { id: 'es-08', difficolta: 2, testo: R`Scomponi in fattori il trinomio $2x^2 - 5x + 2$.`, suggerimenti: [R`Trova prima le radici dell'equazione $2x^2 - 5x + 2 = 0$.`, R`Poi usa $a(x - x_1)(x - x_2)$, senza dimenticare $a = 2$.`], risposta: { tipo: 'testo', accettate: ['(2x-1)(x-2)', '(x-2)(2x-1)', '2(x-2)(x-1/2)', '2(x-1/2)(x-2)', '(2x−1)(x−2)', '(x−2)(2x−1)'] }, soluzione: [R`$\Delta = 25 - 16 = 9$, radici $x_1 = 2$ e $x_2 = \dfrac{1}{2}$.`, R`$2x^2 - 5x + 2 = 2(x - 2)\left(x - \dfrac{1}{2}\right) = (x - 2)(2x - 1)$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Risolvi l'equazione fratta $\dfrac{x^2}{x - 3} = \dfrac{2x + 3}{x - 3}$.`, suggerimenti: [R`Scrivi prima la condizione di esistenza: il denominatore non può essere zero.`, R`I denominatori sono uguali: basta uguagliare i numeratori, $x^2 = 2x + 3$.`, R`Trovate le due soluzioni di $x^2 - 2x - 3 = 0$, confrontale con la c.e.: una delle due non è accettabile.`], risposta: { tipo: 'numeri', valori: [-1] }, soluzione: [R`C.e.: $x - 3 \ne 0$, cioè $x \ne 3$.`, R`Stesso denominatore, quindi $x^2 = 2x + 3$, cioè $x^2 - 2x - 3 = 0$.`, R`$\dfrac{\Delta}{4} = 1 + 3 = 4$, $x = 1 \pm 2$: $x_1 = 3$, $x_2 = -1$.`, R`$x = 3$ viola la c.e. e va **scartata**. L'unica soluzione è $x = -1$. Verifica: $\dfrac{1}{-4} = \dfrac{1}{-4}$. ✓`] },
    { id: 'es-10', difficolta: 3, testo: R`Per quali valori di $k$ l'equazione $x^2 - 2kx + k + 2 = 0$ ha due soluzioni coincidenti?`, suggerimenti: [R`Soluzioni coincidenti significa $\Delta = 0$.`, R`$b = -2k$ è pari: usa $\dfrac{\Delta}{4} = k^2 - (k + 2)$.`, R`Risolvi $k^2 - k - 2 = 0$.`], risposta: { tipo: 'numeri', valori: [2, -1] }, soluzione: [R`$\dfrac{\Delta}{4} = k^2 - k - 2$.`, R`$k^2 - k - 2 = 0 \Rightarrow k = \dfrac{1 \pm 3}{2}$: $k = 2$ oppure $k = -1$.`, R`Controllo con $k = 2$: $x^2 - 4x + 4 = (x-2)^2$, radice doppia $2$. ✓`] },
    { id: 'es-11', difficolta: 3, testo: R`Un rettangolo ha perimetro $28\ \text{cm}$ e area $48\ \text{cm}^2$. Trova le sue dimensioni.`, suggerimenti: [R`Se $x$ e $y$ sono le dimensioni: $x + y = 14$ e $xy = 48$.`, R`Due numeri di cui conosci somma e prodotto sono le radici di $t^2 - 14t + 48 = 0$.`], risposta: { tipo: 'numeri', valori: [6, 8] }, soluzione: [R`Semiperimetro $14$: $x + y = 14$, $xy = 48$.`, R`$t^2 - 14t + 48 = 0$: $\dfrac{\Delta}{4} = 49 - 48 = 1$, $t = 7 \pm 1$.`, R`Le dimensioni sono $6\ \text{cm}$ e $8\ \text{cm}$ (entrambe positive: accettabili).`] },
    { id: 'es-12', difficolta: 3, testo: R`Un numero e il suo quadrato hanno somma $42$. Trova tutti i numeri possibili.`, suggerimenti: [R`Chiama $x$ il numero: $x + x^2 = 42$.`, R`Riporta in forma normale: $x^2 + x - 42 = 0$.`], risposta: { tipo: 'numeri', valori: [6, -7] }, soluzione: [R`$x^2 + x - 42 = 0$, $\Delta = 1 + 168 = 169 = 13^2$.`, R`$x_{1,2} = \dfrac{-1 \pm 13}{2}$: $x = 6$ oppure $x = -7$.`, R`Entrambi vanno bene: $6 + 36 = 42$ e $-7 + 49 = 42$. Qui non c'è nessuna condizione che escluda il negativo.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Nella forma normale $ax^2 + bx + c = 0$, quale condizione è indispensabile?`, opzioni: [R`$c \ne 0$`, R`$a \ne 0$`, R`$b \ne 0$`, R`$\Delta \ge 0$`], corretta: 1, spiegazione: R`Se $a = 0$ sparisce il termine di secondo grado. $b$ e $c$ possono essere nulli (equazioni incomplete), e $\Delta$ può essere negativo (equazione impossibile, ma sempre di secondo grado).` },
    { id: 'q-02', domanda: R`Se $\Delta < 0$, l'equazione…`, opzioni: [R`ha due soluzioni negative`, R`ha una sola soluzione`, R`non ha soluzioni reali`, R`ha due soluzioni opposte`], corretta: 2, spiegazione: R`Con $\Delta < 0$ la radice quadrata non esiste in $\mathbb{R}$: nessuna soluzione reale. Il segno delle soluzioni non c'entra con il segno di $\Delta$.` },
    { id: 'q-03', domanda: R`Se $\Delta = 0$, le soluzioni sono…`, opzioni: [R`due, coincidenti, uguali a $-\dfrac{b}{2a}$`, R`una sola, uguale a $0$`, R`due, opposte`, R`nessuna`], corretta: 0, spiegazione: R`Con $\Delta = 0$ la formula dà $x = \dfrac{-b \pm 0}{2a}$: le due soluzioni coincidono in $-\dfrac{b}{2a}$.` },
    { id: 'q-04', domanda: R`L'equazione $ax^2 + c = 0$ si chiama…`, opzioni: [R`spuria`, R`monomia`, R`completa`, R`pura`], corretta: 3, spiegazione: R`Manca il termine di primo grado: è pura. La spuria è quella senza termine noto, la monomia ha solo $ax^2$.` },
    { id: 'q-05', domanda: R`Quale soluzione ha sempre un'equazione spuria $ax^2 + bx = 0$?`, opzioni: [R`$x = -\dfrac{b}{a}$ soltanto`, R`$x = 0$`, R`$x = 1$`, R`$x = -\dfrac{c}{a}$`], corretta: 1, spiegazione: R`Raccogliendo $x$ si ottiene $x(ax + b) = 0$: un fattore è $x$, quindi $x = 0$ è sempre soluzione; l'altra è $-\dfrac{b}{a}$.` },
    { id: 'q-06', domanda: R`La somma delle radici di $ax^2 + bx + c = 0$ vale…`, opzioni: [R`$\dfrac{b}{a}$`, R`$\dfrac{c}{a}$`, R`$-\dfrac{b}{a}$`, R`$-\dfrac{c}{a}$`], corretta: 2, spiegazione: R`Sommando le due soluzioni della formula i termini con $\sqrt{\Delta}$ si elidono e resta $\dfrac{-2b}{2a} = -\dfrac{b}{a}$.` },
    { id: 'q-07', domanda: R`Il prodotto delle radici di $ax^2 + bx + c = 0$ vale…`, opzioni: [R`$\dfrac{c}{a}$`, R`$-\dfrac{c}{a}$`, R`$\dfrac{b}{a}$`, R`$\dfrac{\Delta}{4a^2}$`], corretta: 0, spiegazione: R`Moltiplicando le due soluzioni si ottiene $\dfrac{b^2 - \Delta}{4a^2} = \dfrac{4ac}{4a^2} = \dfrac{c}{a}$.` },
    { id: 'q-08', domanda: R`La formula ridotta conviene quando…`, opzioni: [R`$a = 1$`, R`$c$ è negativo`, R`$b$ è un numero pari`, R`$\Delta$ è un quadrato perfetto`], corretta: 2, spiegazione: R`La ridotta usa $\dfrac{b}{2}$: è comoda quando $b$ è pari, così $\dfrac{b}{2}$ è intero. Funziona comunque in ogni caso.` },
    { id: 'q-09', domanda: R`Quante soluzioni reali ha $x^2 + 9 = 0$?`, opzioni: [R`due: $\pm 3$`, R`una: $x = -3$`, R`nessuna`, R`una: $x = 3$`], corretta: 2, spiegazione: R`$x^2 = -9$: un quadrato non può essere negativo. L'errore tipico è confonderla con $x^2 - 9 = 0$, che ha soluzioni $\pm 3$.` },
    { id: 'q-10', domanda: R`Se $\Delta > 0$, il trinomio $ax^2 + bx + c$ si scompone come…`, opzioni: [R`$(x - x_1)(x - x_2)$`, R`$a(x - x_1)(x - x_2)$`, R`$a(x + x_1)(x + x_2)$`, R`$(ax - x_1)(ax - x_2)$`], corretta: 1, spiegazione: R`Il fattore $a$ è indispensabile: senza, il coefficiente di $x^2$ nel prodotto sarebbe $1$. I segni sono $x - x_1$, non $x + x_1$.` },
    { id: 'q-11', domanda: R`Graficamente, le soluzioni di $ax^2 + bx + c = 0$ sono…`, opzioni: [R`le ordinate dei punti in cui la parabola taglia l'asse $y$`, R`le coordinate del vertice`, R`le ascisse dei punti in cui la parabola incontra l'asse $x$`, R`i punti in cui la parabola incontra la retta $y = c$`], corretta: 2, spiegazione: R`Risolvere l'equazione significa cercare dove $y = ax^2 + bx + c$ vale zero, cioè dove la parabola tocca o taglia l'asse $x$.` },
    { id: 'q-12', domanda: R`Un'equazione di secondo grado ha radici $2$ e $-5$. Quale delle seguenti è?`, opzioni: [R`$x^2 - 3x - 10 = 0$`, R`$x^2 + 3x + 10 = 0$`, R`$x^2 - 7x + 10 = 0$`, R`$x^2 + 3x - 10 = 0$`], corretta: 3, spiegazione: R`Somma $s = -3$, prodotto $p = -10$: $x^2 - sx + p = x^2 + 3x - 10$. Attenzione al segno della somma: $-s = +3$.` },
    { id: 'q-13', domanda: R`In un'equazione fratta, le condizioni di esistenza servono a…`, opzioni: [R`escludere i valori che annullano i denominatori`, R`decidere il segno del discriminante`, R`trovare il denominatore comune`, R`stabilire se l'equazione è completa`], corretta: 0, spiegazione: R`Una frazione con denominatore zero non ha significato: i valori che lo annullano vanno esclusi, e le soluzioni che coincidono con essi si scartano.` },
    { id: 'q-14', domanda: R`Quante soluzioni reali può avere al massimo un'equazione di secondo grado?`, opzioni: [R`una`, R`due`, R`tre`, R`infinite`], corretta: 1, spiegazione: R`La formula risolutiva fornisce al più due valori, uno per ciascun segno davanti alla radice.` },
    { id: 'q-15', domanda: R`Risolvendo $x^2 - 3x = 0$ dividendo entrambi i membri per $x$ si ottiene $x = 3$. Che cosa è successo?`, opzioni: [R`Niente: $x = 3$ è l'unica soluzione`, R`Si è persa la soluzione $x = 0$`, R`Si è aggiunta una soluzione estranea`, R`L'equazione è diventata impossibile`], corretta: 1, spiegazione: R`Dividere per $x$ presuppone $x \ne 0$, ma $x = 0$ è soluzione: raccogliendo si trova $x(x - 3) = 0$, cioè $x = 0 \lor x = 3$.` },
    { id: 'q-16', domanda: R`Se $\dfrac{c}{a} < 0$, le radici (quando esistono) sono…`, opzioni: [R`entrambe negative`, R`entrambe positive`, R`discordi, una positiva e una negativa`, R`coincidenti`], corretta: 2, spiegazione: R`Il prodotto delle radici vale $\dfrac{c}{a}$: un prodotto negativo richiede fattori di segno opposto. In questo caso, tra l'altro, $\Delta = b^2 - 4ac > 0$ sempre.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di tutto la forma normale: tutto a sinistra, zero a destra, termini simili ridotti. Solo dopo si leggono $a$, $b$ e $c$.` },
    { tipo: 'errore', testo: R`Il $2a$ sta sotto a **tutta** la frazione, non solo sotto la radice. $\dfrac{-b \pm \sqrt{\Delta}}{2a}$ non è $-b \pm \dfrac{\sqrt{\Delta}}{2a}$.` },
    { tipo: 'errore', testo: R`Se $b$ è negativo, $-b$ è positivo. Sostituisci sempre tra parentesi: $-(-5) = 5$.` },
    { tipo: 'trucco', testo: R`Controllo lampo: la somma delle soluzioni deve fare $-\dfrac{b}{a}$ e il prodotto $\dfrac{c}{a}$. Se non torna, c'è un errore da qualche parte.` },
    { tipo: 'trucco', testo: R`Con $a = 1$ e soluzioni intere, cerca due numeri che abbiano somma $-b$ e prodotto $c$: spesso le trovi a mente in dieci secondi.` },
    { tipo: 'errore', testo: R`Nelle equazioni spurie non dividere mai per $x$: raccogli. Altrimenti perdi $x = 0$.` },
    { tipo: 'metodo', testo: R`Calcola $\Delta$ a parte e guardane il segno prima di scrivere la formula: se è negativo hai finito, l'equazione è impossibile.` },
    { tipo: 'trucco', testo: R`Se $b$ è pari, la formula ridotta ti risparmia una semplificazione e numeri grossi sotto radice.` },
    { tipo: 'errore', testo: R`In un problema geometrico una soluzione negativa non è "sbagliata": è da scartare, e va detto esplicitamente.` }
  ],

  aneddoti: [
    { matematico: 'Gli scribi babilonesi', anni: 'circa 1800 a.C.', titolo: 'Equazioni di secondo grado su tavolette d\'argilla', testo: R`Migliaia di anni prima dell'algebra, gli scribi di Babilonia risolvevano problemi come «l'area di un quadrato più il suo lato fa 45 (in base 60: cioè $\frac{45}{60} = \frac{3}{4}$): trova il lato». Sulle tavolette di argilla non ci sono simboli né formule, ma ricette a parole: «prendi la metà di 1, elevala al quadrato, aggiungi 45, estrai la radice, togli la metà». È esattamente la formula risolutiva, eseguita passo per passo sui numeri, con un sistema di numerazione in base 60 che usiamo ancora oggi per le ore e i gradi. Gli scribi la imparavano a memoria come procedura, senza mai scriverla in generale.`, legame: R`La ricetta babilonese è il completamento del quadrato: la stessa idea da cui nasce la formula con $\Delta$.` },
    { matematico: 'Brahmagupta', anni: '598–668', titolo: 'La prima formula scritta in generale', testo: R`Nel 628 l'astronomo indiano Brahmagupta scrisse il *Brahmasphutasiddhanta*, un trattato che, tra le regole per lo zero e per i numeri negativi, contiene la prima soluzione generale di un'equazione di secondo grado espressa a parole ma valida per qualunque coefficiente. Brahmagupta ammetteva anche le soluzioni negative, che chiamava "debiti", quando quasi tutti le scartavano come assurde. Non arrivò invece a dividere per zero correttamente: sostenne che $0 : 0 = 0$, un'affermazione che i matematici avrebbero corretto solo molti secoli dopo con l'idea di limite.`, legame: R`È il primo a scrivere qualcosa di equivalente alla nostra formula risolutiva, con il coraggio di accettare le radici negative.` },
    { matematico: 'Al-Khwarizmi', anni: '780–850 circa', titolo: 'Al-jabr, la parola che diventò "algebra"', testo: R`Nella Bagdad del IX secolo, Muhammad ibn Musa al-Khwarizmi scrisse un libro dal titolo lunghissimo, il *Kitab al-jabr wa l-muqabala*. *Al-jabr* vuol dire "ricomposizione" (era anche il termine per rimettere a posto un osso rotto) e indicava l'operazione di spostare un termine da un membro all'altro. Dal titolo del libro viene la parola **algebra**; dalla latinizzazione del suo nome viene **algoritmo**. Al-Khwarizmi classificò le equazioni di secondo grado in sei tipi (non usava i numeri negativi, quindi $x^2 + bx = c$ e $x^2 = bx + c$ erano problemi diversi) e le risolse tutte con costruzioni geometriche: il "completamento del quadrato" per lui era un quadrato vero, disegnato.`, legame: R`I "principi di equivalenza" con cui portiamo l'equazione in forma normale sono, alla lettera, l'al-jabr di al-Khwarizmi.` },
    { matematico: 'François Viète', anni: '1540–1603', titolo: 'Il crittografo che inventò le lettere', testo: R`Viète era un avvocato e consigliere del re di Francia, e decifrava per Enrico IV i messaggi cifrati degli spagnoli: il re di Spagna, convinto che il suo codice fosse inviolabile, lo denunciò al papa per stregoneria. Nel tempo libero Viète fece una cosa che oggi sembra ovvia: usò le **lettere** per indicare non solo le incognite, ma anche i coefficienti. Prima di lui si ragionava su equazioni con numeri specifici, una alla volta; con $a$, $b$, $c$ si poteva finalmente parlare di *tutte* le equazioni insieme. Le relazioni fra le radici e i coefficienti portano il suo nome: si chiamano ancora "formule di Viète".`, legame: R`Somma $= -\dfrac{b}{a}$ e prodotto $= \dfrac{c}{a}$ sono le formule di Viète per il secondo grado.` },
    { matematico: 'Niccolò Tartaglia e Girolamo Cardano', anni: '1500–1557 e 1501–1576', titolo: 'La sfida per il terzo grado', testo: R`Una volta risolto il secondo grado, la domanda successiva era ovvia: e il terzo? Nell'Italia del Cinquecento le formule erano segreti da usare nelle "disfide" pubbliche, dove i matematici si sfidavano a colpi di problemi davanti al pubblico. Niccolò Tartaglia, bresciano e balbuziente per una ferita di guerra ricevuta da bambino, trovò un metodo per le equazioni cubiche e lo confidò, sotto giuramento di segretezza, al medico milanese Girolamo Cardano. Cardano scoprì che Scipione del Ferro aveva trovato la formula prima di Tartaglia, si sentì libero dal giuramento e la pubblicò nel 1545 nell'*Ars Magna*. Tartaglia morì povero e furioso; la formula, ancora oggi, si chiama "di Cardano".`, legame: R`Il metodo del terzo grado nasce dagli stessi strumenti del secondo: sostituzioni per eliminare un termine e completamenti di quadrati e cubi.` }
  ]
});
})();
