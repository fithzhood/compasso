(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'equazioni-primo-grado',
  titolo: 'Equazioni di primo grado',

  introduzione: R`Un'**equazione di primo grado** è un'uguaglianza fra due espressioni in cui compare un'incognita, di solito $x$, elevata al massimo alla prima potenza: per esempio $3x - 7 = 2x + 5$. Risolverla vuol dire scoprire per quali valori di $x$ i due membri diventano davvero uguali. È lo strumento più usato di tutta la matematica: ogni volta che un problema chiede «qual è quel numero che...», la risposta passa da un'equazione.

Un taxi costa 3 € fissi più 1,50 € al chilometro: con 15 € quanta strada si fa? La domanda è l'equazione $3 + 1{,}5x = 15$, e la soluzione $x = 8$ è il numero di chilometri. Lo stesso schema descrive la ricarica del telefono, la miscela di due soluzioni in laboratorio, l'età di due persone fra qualche anno, il punto in cui una retta attraversa un asse.

Per seguire bene servono il calcolo con monomi e polinomi (parentesi, prodotti), le frazioni con il minimo comune multiplo e, per le equazioni fratte, la scomposizione di una differenza di quadrati.`,

  sezioni: [
    { id: 'identita-equazioni', titolo: 'Identità, equazioni e soluzioni', testo: R`Un'**uguaglianza** fra due espressioni letterali, come $2(x + 1) = 2x + 2$ oppure $2x + 1 = 7$, ha due **membri**: il primo a sinistra e il secondo a destra del segno $=$. Sostituendo un numero alla lettera, l'uguaglianza può risultare vera o falsa, e questo distingue due oggetti molto diversi.

>* **Identità:** uguaglianza vera per *ogni* valore attribuito alle lettere. **Equazione:** uguaglianza vera solo per *alcuni* valori dell'**incognita**, o per nessuno. Un valore che rende vera l'equazione si chiama **soluzione** (o **radice**); l'insieme di tutte le soluzioni si indica con $S$.

$2(x + 1) = 2x + 2$ è un'identità: a sinistra e a destra c'è lo stesso polinomio, scritto in due modi. $2x + 1 = 7$ è un'equazione: con $x = 3$ diventa $7 = 7$, vera; con $x = 5$ diventa $11 = 7$, falsa. Quindi $3$ è soluzione, $5$ no, e $S = \{3\}$.

**Risolvere** un'equazione significa trovare tutte le sue soluzioni. **Verificare** una soluzione significa sostituirla nell'equazione di partenza e controllare che i due membri diano lo stesso numero: costa poco e scopre quasi tutti gli errori.

Il **grado** di un'equazione è l'esponente massimo con cui compare l'incognita, dopo aver svolto i calcoli: $3x - 5 = x + 1$ è di primo grado (si dice anche **lineare**), $x^2 = 4$ è di secondo. Un'equazione è **numerica** se oltre all'incognita contiene solo numeri, **letterale** se contiene altre lettere; è **intera** se l'incognita non compare in nessun denominatore, **fratta** altrimenti.

| equazione | tipo |
|---|---|
| $3x - 5 = x + 1$ | numerica intera |
| $\dfrac{x}{2} - 1 = \dfrac{x + 3}{4}$ | numerica intera (i denominatori sono numeri) |
| $\dfrac{2}{x - 1} = 5$ | numerica fratta |
| $ax + 1 = 2a$ | letterale intera |

>! Una frazione con un numero al denominatore non rende l'equazione fratta: è fratta solo se l'incognita sta *sotto* la linea di frazione. E un'identità non "si risolve": è vera sempre, non c'è niente da trovare.` },

    { id: 'principi-equivalenza', titolo: 'I principi di equivalenza', testo: R`Due equazioni sono **equivalenti** se hanno lo stesso insieme delle soluzioni. Risolvere un'equazione significa trasformarla, un passo alla volta, in equazioni equivalenti sempre più semplici, fino a leggere la soluzione. I passi leciti sono due.

>* **Primo principio.** Aggiungendo o sottraendo a entrambi i membri uno stesso numero, o una stessa espressione intera nell'incognita, si ottiene un'equazione equivalente.

>* **Secondo principio.** Moltiplicando o dividendo entrambi i membri per uno stesso numero **diverso da zero** si ottiene un'equazione equivalente.

L'immagine giusta è la **bilancia**: i due membri sono i piatti, e l'equilibrio non cambia se si toglie o si aggiunge la stessa cosa da tutte e due le parti, o se si raddoppia o dimezza tutto. Nel grafico i due membri di $2x + 1 = x + 4$ sono due rette: trascina il punto e osserva quando i loro valori coincidono.

[[grafico:bilancia]]

Dai due principi discendono le regole pratiche che si usano di continuo.

- **Regola del trasporto.** Un termine può passare da un membro all'altro cambiando segno: $3x + 5 = 11 \Rightarrow 3x = 11 - 5$. È il primo principio: si è sottratto $5$ da entrambi i membri.
- **Regola di cancellazione.** Due termini uguali che compaiono in entrambi i membri si eliminano: $2x + 7 = x + 7 \Rightarrow 2x = x$.
- **Cambio di segno.** Si possono cambiare i segni di *tutti* i termini di entrambi i membri: $-x = -4 \Rightarrow x = 4$. È il secondo principio con il fattore $-1$.

Esempio: $5x - 3 = 2x + 9$. Trasporto $2x$ a sinistra e $-3$ a destra: $5x - 2x = 9 + 3$, cioè $3x = 12$. Divido entrambi i membri per $3$: $x = 4$. Verifica: $20 - 3 = 17$ e $8 + 9 = 17$. ✓

>! Quando si trasporta un termine si cambia il segno **solo a quel termine**, non a tutti gli altri. E si può dividere solo per un numero sicuramente diverso da zero: da $3x = 5x$ non si può dividere per $x$ e concludere $3 = 5$, perché $x$ vale proprio $0$ (infatti $3x - 5x = 0$ dà $-2x = 0$, $x = 0$).` },

    { id: 'forma-normale', titolo: 'La forma normale e i tre casi', testo: R`Applicando i principi di equivalenza, ogni equazione di primo grado intera si riduce a una forma standard: tutti i termini con l'incognita a sinistra, tutti i numeri a destra, termini simili ridotti.

>* **Forma normale:** $$ax = b$$ dove $a$ è il coefficiente dell'incognita e $b$ è il termine noto. Da qui in poi tutto dipende da $a$ e da $b$.

- **$a \ne 0$: equazione determinata.** Dividendo per $a$ si trova l'unica soluzione $x = \dfrac{b}{a}$, e $S = \left\{\dfrac{b}{a}\right\}$.
- **$a = 0$ e $b \ne 0$: equazione impossibile.** $0 \cdot x = b$ chiede a zero di valere quanto un numero diverso da zero: nessun $x$ ci riesce. $S = \varnothing$.
- **$a = 0$ e $b = 0$: equazione indeterminata.** $0 \cdot x = 0$ è vera per qualunque $x$: era in realtà un'identità. $S = \mathbb{R}$.

Tre esempi, uno per caso. $3(x - 1) = x + 3$ dà $3x - 3 = x + 3$, cioè $2x = 6$ e $x = 3$: determinata. $2(x + 1) = 2x + 5$ dà $2x + 2 = 2x + 5$, cioè $0 \cdot x = 3$: impossibile. $2(x + 1) = 2x + 2$ dà $0 \cdot x = 0$: indeterminata.

Nel grafico $y = ax - b$ è una retta e la soluzione di $ax = b$ è il punto in cui la retta taglia l'asse $x$. Porta $a$ a zero con il cursore: la retta diventa orizzontale e il punto sparisce, perché una retta orizzontale non incontra mai l'asse $x$ (impossibile) oppure vi si sovrappone del tutto (indeterminata, quando anche $b = 0$).

[[grafico:rettaParametri]]

>! «Impossibile» non vuol dire «difficile» e «indeterminata» non vuol dire «non so risolverla»: sono due risposte precise, da scrivere per esteso. Scrivere $x = \dfrac{3}{0}$ oppure $x = \dfrac{0}{0}$ è un errore, perché la divisione per zero non esiste.` },

    { id: 'frazioni-numeriche', titolo: 'Equazioni con frazioni numeriche', testo: R`Se i denominatori sono numeri, l'equazione è ancora intera e ci si libera delle frazioni con il secondo principio: si moltiplicano entrambi i membri per il **minimo comune multiplo** dei denominatori.

>* **Procedura.** 1) Si calcola il mcm dei denominatori. 2) Si scrive ogni termine con quel denominatore, compresi i termini senza frazione: con mcm $6$, il termine $1$ diventa $\dfrac{6}{6}$. 3) Si eliminano i denominatori, ormai uguali nei due membri. 4) Si risolve l'equazione intera che resta.

Esempio: $\dfrac{x}{2} - \dfrac{x - 1}{3} = 1$. Il mcm è $6$:
$$\frac{3x - 2(x - 1)}{6} = \frac{6}{6} \quad\Rightarrow\quad 3x - 2x + 2 = 6 \quad\Rightarrow\quad x = 4.$$
Verifica: $\dfrac{4}{2} - \dfrac{3}{3} = 2 - 1 = 1$. ✓

Il passaggio delicato è il segno meno davanti a una frazione: vale per **tutto** il numeratore. Nell'esempio, $-\dfrac{x - 1}{3}$ moltiplicato per $6$ diventa $-2(x - 1) = -2x + 2$, non $-2x - 2$. Conviene mettere il numeratore tra parentesi e svolgerle nel passaggio successivo.

Anche i coefficienti decimali si trattano così: $0{,}5x + 1{,}2 = 2$ diventa, moltiplicando per $10$, $5x + 12 = 20$, da cui $x = \dfrac{8}{5}$.

>! Il denominatore comune si può eliminare solo se è **lo stesso in entrambi i membri**: moltiplicare per il mcm solo il primo membro, o dimenticare un termine intero, rompe l'equivalenza e cambia le soluzioni. Errore gemello: "semplificare" un denominatore che compare in un solo termine.` },

    { id: 'fratte', titolo: 'Equazioni fratte e condizioni di esistenza', testo: R`Un'equazione è **fratta** quando l'incognita compare in almeno un denominatore, come in $\dfrac{3}{x - 2} = 1$. Una frazione con denominatore zero non ha significato, quindi prima di tutto si escludono i valori di $x$ che annullano i denominatori.

>* **Condizioni di esistenza (c.e.):** i valori dell'incognita per cui tutti i denominatori sono diversi da zero. Si scrivono *prima* di fare qualunque calcolo, e alla fine ogni soluzione trovata va confrontata con esse: se le viola **non è accettabile** e si scarta.

La procedura:

1. C.e.: si pone ogni denominatore $\ne 0$, scomponendolo se serve.
2. Si porta tutto allo stesso denominatore, il mcm dei denominatori (che ora contiene $x$).
3. Si eliminano i denominatori: è lecito perché, grazie alle c.e., non valgono zero.
4. Si risolve l'equazione intera e si confrontano le soluzioni con le c.e.

Esempio: $\dfrac{x + 1}{x - 2} = \dfrac{x - 3}{x + 2}$. C.e.: $x \ne 2$ e $x \ne -2$. Denominatore comune $(x - 2)(x + 2)$, quindi $(x + 1)(x + 2) = (x - 3)(x - 2)$, cioè $x^2 + 3x + 2 = x^2 - 5x + 6$. I termini $x^2$ si cancellano: $8x = 4$, $x = \dfrac{1}{2}$, accettabile perché rispetta le c.e. Verifica: $\dfrac{3/2}{-3/2} = -1$ e $\dfrac{-5/2}{5/2} = -1$. ✓

Esempio con scarto: $\dfrac{2x}{x - 3} - 1 = \dfrac{6}{x - 3}$. C.e.: $x \ne 3$. Moltiplicando per $x - 3$: $2x - (x - 3) = 6$, $x + 3 = 6$, $x = 3$. Ma $3$ viola la c.e.: la soluzione si scarta e l'equazione è **impossibile**.

>! Un denominatore come $x^2 - 4$ va scomposto, $(x - 2)(x + 2)$, per vedere che esclude *due* valori. Un denominatore come $x^2 + 1$ invece non si annulla mai. E $2 - x$ è l'opposto di $x - 2$: conviene riscriverlo come $-(x - 2)$ prima di cercare il mcm.` },

    { id: 'letterali', titolo: 'Equazioni letterali: la discussione', testo: R`Un'equazione è **letterale** se, oltre all'incognita, contiene altre lettere, dette **parametri**: rappresentano numeri fissati ma non specificati, e la soluzione dipende da essi. $ax = 2a$ non è una sola equazione ma infinite, una per ogni valore di $a$, e non tutte si comportano allo stesso modo.

>* Si risolve come al solito, portando l'equazione alla forma $A\,x = B$, dove $A$ e $B$ contengono il parametro. Poi si **discute**: per i valori del parametro che annullano $A$ l'equazione è impossibile o indeterminata (a seconda che $B$ sia diverso da zero o nullo); per tutti gli altri è determinata, con $x = \dfrac{B}{A}$.

Esempio: $ax - 2 = x + a$. Porto i termini con $x$ a sinistra: $ax - x = a + 2$, e raccolgo l'incognita: $(a - 1)\,x = a + 2$.

- Se $a \ne 1$ posso dividere: $x = \dfrac{a + 2}{a - 1}$.
- Se $a = 1$ resta $0 \cdot x = 3$: impossibile.

Con $a = 3$, per controllo, l'equazione è $3x - 2 = x + 3$, cioè $2x = 5$ e $x = \dfrac{5}{2}$, che è proprio $\dfrac{3 + 2}{3 - 1}$. ✓

Se il parametro compare in un denominatore, per esempio in $\dfrac{x}{a} = 1$, serve anche una condizione sul parametro ($a \ne 0$), esattamente come le c.e. delle equazioni fratte.

>! Dividere per $a - 1$ senza chiedersi se possa essere zero è l'errore classico: la soluzione $x = \dfrac{a + 2}{a - 1}$ scritta da sola, senza discussione, è incompleta. Il parametro non "vale qualcosa": va trattato per tutti i suoi valori possibili.` },

    { id: 'problemi', titolo: 'Problemi risolti con le equazioni', testo: R`Un problema a parole si risolve traducendolo in un'equazione. La difficoltà non è quasi mai il calcolo, ma la traduzione: per questo conviene seguire sempre lo stesso schema.

>* **Schema.** 1) **Incognita:** si sceglie la grandezza da trovare (o quella da cui le altre si ricavano più facilmente), indicando l'unità di misura. 2) **Traduzione:** si esprimono le altre grandezze in funzione di $x$ e si scrive la condizione del testo come equazione. 3) **Risoluzione.** 4) **Verifica del senso:** la soluzione deve essere compatibile con il problema, non solo con l'equazione.

Qualche traduzione ricorrente:

| il testo dice | si scrive |
|---|---|
| il doppio di un numero | $2x$ |
| un numero aumentato di 3 | $x + 3$ |
| la metà di un numero | $\dfrac{x}{2}$ |
| due numeri consecutivi | $x$ e $x + 1$ |
| la base supera l'altezza di 5 | base $= x + 5$ |
| fra $x$ anni avrà | età attuale $+\, x$ |

Esempio: la somma di tre numeri naturali consecutivi è $48$. Incognita: $x$ il più piccolo; gli altri sono $x + 1$ e $x + 2$. Equazione: $x + (x + 1) + (x + 2) = 48$, cioè $3x + 3 = 48$, $x = 15$. I numeri sono $15$, $16$, $17$: naturali, consecutivi, e la loro somma è $48$. ✓

La verifica del senso non è un formalismo. Se in un problema $x$ conta persone e si trova $x = 7{,}5$, oppure $x$ è una lunghezza e viene $-3$, l'equazione può essere stata risolta benissimo, ma la risposta al problema è che *non esiste* una soluzione con quelle condizioni, oppure che la traduzione va riletta.

>! Rispondere «$x = 15$» non basta: il problema chiedeva tre numeri. La risposta finale è quella alla domanda del testo, con le unità di misura se ci sono.` },

    { id: 'interpretazione-grafica', titolo: 'Lo zero della retta', testo: R`L'espressione $y = 2x - 4$ associa a ogni $x$ un valore $y$. Riportando le coppie $(x;\,y)$ nel piano cartesiano si ottengono punti allineati: il grafico di un'espressione di primo grado è sempre una **retta** (la studierai a fondo nel capitolo sul piano cartesiano).

| $x$ | $y = 2x - 4$ |
|---|---|
| $0$ | $-4$ |
| $1$ | $-2$ |
| $2$ | $0$ |
| $3$ | $2$ |

Risolvere $2x - 4 = 0$ significa chiedersi per quale $x$ la $y$ vale zero: è l'ascissa del punto in cui la retta attraversa l'asse $x$, che si chiama **zero** della retta. Nel grafico è il punto $(2;\,0)$.

[[grafico:zeroRetta]]

>* L'equazione $ax = b$ e la retta $y = ax - b$ sono la stessa domanda vista in due modi: la soluzione $x = \dfrac{b}{a}$ è l'ascissa del punto in cui la retta taglia l'asse $x$. Se $a \ne 0$ la retta è obliqua e taglia l'asse in un solo punto (determinata); se $a = 0$ è orizzontale, e o non lo tocca mai ($b \ne 0$, impossibile) o coincide con esso ($b = 0$, indeterminata).

Quando l'incognita sta in entrambi i membri, come in $2x + 1 = x + 4$, i due membri sono due rette e la soluzione è l'ascissa del loro punto di incontro: è quello che mostra il grafico della bilancia, dove le rette si incrociano in $x = 3$. Due rette parallele, come $y = 2x + 1$ e $y = 2x + 5$, non si incontrano mai: l'equazione $2x + 1 = 2x + 5$ è impossibile.

>! Il grafico dà l'idea, il calcolo dà la risposta: da un disegno si legge $x \approx 2{,}3$, non $x = \dfrac{7}{3}$. Le due cose vanno insieme, non una al posto dell'altra.` }
  ],

  grafici: {
    bilancia: {
      tipo: 'piano', x: [-3, 6], y: [-4, 12], passo: [1, 2],
      parametri: [{ nome: 'p', min: -2, max: 5, passo: 0.5, valore: 0, nascosto: true }],
      funzioni: [
        { f: '2x + 1', etichetta: 'y = 2x + 1', colore: 1 },
        { f: 'x + 4', etichetta: 'y = x + 4', colore: 2 }
      ],
      elementi: [
        { tipo: 'verticale', x: 'p', tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['p', '2*p + 1'], etichetta: '{{2*p + 1}}', posizione: 'destra', colore: 1 },
        { tipo: 'punto', p: ['p', 'p + 4'], etichetta: '{{p + 4}}', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'x = {{p}}', posizione: 'basso', colore: 4 },
        { tipo: 'testo', p: [-2.8, 11.2], testo: 'primo membro  2x + 1 = {{2*p + 1}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.8, 10], testo: 'secondo membro  x + 4 = {{p + 4}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto sull\'asse x: i due membri di 2x + 1 = x + 4 valgono lo stesso solo per x = 3, dove le due rette si incontrano.'
    },
    rettaParametri: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      parametri: [
        { nome: 'a', min: -3, max: 3, passo: 0.5, valore: 2, etichetta: 'a' },
        { nome: 'b', min: -5, max: 5, passo: 0.5, valore: 4, etichetta: 'b' }
      ],
      funzioni: [{ f: 'a*x - b', etichetta: 'y = ax − b', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['b/a', 0], etichetta: 'x = {{b/a}}', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-4.8, 5.4], testo: 'ax = b  con  a = {{a}},  b = {{b}}   →   x = {{b/a}}', ancora: 'start' }
      ],
      didascalia: 'La soluzione di ax = b è il punto in cui la retta y = ax − b taglia l\'asse x. Con a = 0 la retta è orizzontale e il punto sparisce: impossibile (b ≠ 0) o indeterminata (b = 0).'
    },
    zeroRetta: {
      tipo: 'piano', x: [-2, 5], y: [-6, 5],
      funzioni: [{ f: '2x - 4', etichetta: 'y = 2x − 4', colore: 1 }],
      punti: [
        { x: 2, y: 0, etichetta: 'x = 2', posizione: 'alto-sinistra', colore: 2 },
        { x: 0, y: -4, etichetta: '(0; −4)', posizione: 'destra', colore: 3 }
      ],
      didascalia: 'La retta y = 2x − 4 taglia l\'asse x in x = 2: è la soluzione di 2x − 4 = 0. In x = 0 vale −4, il termine noto.'
    }
  },

  esempi: [
    { titolo: 'Trasporto e verifica', problema: R`Risolvi $3x - 7 = 2x + 5$.`, passi: [
      R`Porto i termini con $x$ a sinistra e i numeri a destra, cambiando segno a ciò che sposto (regola del trasporto): $3x - 2x = 5 + 7$.`,
      R`Riduco i termini simili: $x = 12$. Il coefficiente è già $1$, non serve dividere.`,
      R`Verifica nell'equazione di partenza: primo membro $36 - 7 = 29$, secondo membro $24 + 5 = 29$. ✓`
    ], risultato: R`$x = 12$, cioè $S = \{12\}$` },

    { titolo: 'Parentesi e frazioni numeriche', problema: R`Risolvi $\dfrac{x + 3}{4} - \dfrac{x - 2}{6} = \dfrac{x}{3} + 1$.`, passi: [
      R`I denominatori sono numeri: l'equazione è intera. Il mcm di $4$, $6$ e $3$ è $12$; scrivo ogni termine con denominatore $12$, compreso l'$1$: $\dfrac{3(x + 3) - 2(x - 2)}{12} = \dfrac{4x + 12}{12}$.`,
      R`I denominatori sono uguali: li elimino (secondo principio, moltiplico per $12$) e svolgo le parentesi, attenzione al meno davanti a $2(x - 2)$: $3x + 9 - 2x + 4 = 4x + 12$.`,
      R`Riduco: $x + 13 = 4x + 12$. Trasporto: $x - 4x = 12 - 13$, cioè $-3x = -1$.`,
      R`Divido per $-3$: $x = \dfrac{1}{3}$.`,
      R`Verifica: primo membro $\dfrac{10/3}{4} - \dfrac{-5/3}{6} = \dfrac{5}{6} + \dfrac{5}{18} = \dfrac{10}{9}$; secondo membro $\dfrac{1}{9} + 1 = \dfrac{10}{9}$. ✓`
    ], risultato: R`$x = \dfrac{1}{3}$` },

    { titolo: 'Impossibile o indeterminata?', problema: R`Risolvi le due equazioni $3(x + 2) - 2x = x + 6$ e $2(x - 1) + 3 = 2x + 5$.`, passi: [
      R`Prima equazione: $3x + 6 - 2x = x + 6$, cioè $x + 6 = x + 6$. Trasportando tutto a sinistra resta $0 \cdot x = 0$.`,
      R`È vera per qualunque $x$: l'equazione è **indeterminata**, $S = \mathbb{R}$. In effetti era un'identità travestita.`,
      R`Seconda equazione: $2x - 2 + 3 = 2x + 5$, cioè $2x + 1 = 2x + 5$. Cancellando $2x$ da entrambi i membri resta $0 \cdot x = 4$.`,
      R`Nessun numero moltiplicato per $0$ dà $4$: l'equazione è **impossibile**, $S = \varnothing$. Graficamente, $y = 2x + 1$ e $y = 2x + 5$ sono rette parallele, che non si incontrano mai.`
    ], risultato: R`La prima è indeterminata ($S = \mathbb{R}$), la seconda è impossibile ($S = \varnothing$)` },

    { titolo: 'Un\'equazione fratta', problema: R`Risolvi $\dfrac{3}{x - 1} - \dfrac{2}{x} = \dfrac{1}{x(x - 1)}$.`, passi: [
      R`L'incognita è nei denominatori: equazione fratta. Condizioni di esistenza: $x - 1 \ne 0$ e $x \ne 0$, cioè $x \ne 1$ e $x \ne 0$.`,
      R`Il mcm dei denominatori è $x(x - 1)$: $\dfrac{3x - 2(x - 1)}{x(x - 1)} = \dfrac{1}{x(x - 1)}$.`,
      R`Grazie alle c.e. il denominatore non è zero e posso eliminarlo: $3x - 2x + 2 = 1$, cioè $x + 2 = 1$, $x = -1$.`,
      R`Confronto con le c.e.: $-1$ è diverso da $0$ e da $1$, quindi è accettabile.`,
      R`Verifica: $\dfrac{3}{-2} - \dfrac{2}{-1} = -\dfrac{3}{2} + 2 = \dfrac{1}{2}$ e $\dfrac{1}{(-1)(-2)} = \dfrac{1}{2}$. ✓`
    ], risultato: R`$x = -1$` },

    { titolo: 'Un\'equazione letterale da discutere', problema: R`Risolvi e discuti $a^2 x - 1 = x + a$.`, passi: [
      R`Porto i termini con $x$ a sinistra e gli altri a destra: $a^2 x - x = a + 1$. Raccolgo l'incognita: $(a^2 - 1)\,x = a + 1$.`,
      R`Scompongo il coefficiente: $a^2 - 1 = (a - 1)(a + 1)$, quindi $(a - 1)(a + 1)\,x = a + 1$. Il coefficiente si annulla per $a = 1$ e per $a = -1$: sono i valori da discutere a parte.`,
      R`Se $a \ne 1$ e $a \ne -1$ posso dividere: $x = \dfrac{a + 1}{(a - 1)(a + 1)} = \dfrac{1}{a - 1}$. Equazione determinata.`,
      R`Se $a = 1$: $0 \cdot x = 2$, impossibile. Se $a = -1$: $0 \cdot x = 0$, indeterminata.`,
      R`Controllo con $a = 2$: l'equazione è $4x - 1 = x + 2$, cioè $3x = 3$, $x = 1$, e infatti $\dfrac{1}{2 - 1} = 1$. ✓`
    ], risultato: R`$a \ne \pm 1$: $x = \dfrac{1}{a - 1}$; $a = 1$: impossibile; $a = -1$: indeterminata` },

    { titolo: 'Un problema', problema: R`Tre amici si dividono 120 €: il secondo riceve il doppio del primo e il terzo riceve 20 € più del primo. Quanto riceve ciascuno?`, passi: [
      R`**Incognita.** $x$ = euro ricevuti dal primo. Allora il secondo riceve $2x$ e il terzo $x + 20$.`,
      R`**Traduzione.** La somma delle tre parti è tutto il denaro: $x + 2x + (x + 20) = 120$.`,
      R`**Risoluzione.** $4x + 20 = 120$, quindi $4x = 100$ e $x = 25$.`,
      R`**Senso.** Le tre parti sono $25$, $50$ e $45$ euro: positive, la seconda è il doppio della prima, la terza supera la prima di $20$, e $25 + 50 + 45 = 120$. ✓`
    ], risultato: R`25 €, 50 € e 45 €` }
  ],

  formulario: [
    { nome: 'Forma normale', formula: R`ax = b`, nota: R`$a$ coefficiente dell'incognita, $b$ termine noto, dopo aver portato le $x$ a sinistra e i numeri a destra.` },
    { nome: 'Equazione determinata', formula: R`a \ne 0 \ \Rightarrow\ x = \frac{b}{a}`, nota: R`Una sola soluzione: $S = \left\{\dfrac{b}{a}\right\}$.` },
    { nome: 'Impossibile e indeterminata', formula: R`a = 0:\quad \begin{cases} b \ne 0 & \text{impossibile, } S = \varnothing \\ b = 0 & \text{indeterminata, } S = \mathbb{R} \end{cases}` },
    { nome: 'Primo principio di equivalenza', formula: R`A(x) = B(x) \iff A(x) + C = B(x) + C`, nota: R`$C$ è un numero o un'espressione intera nell'incognita.` },
    { nome: 'Secondo principio di equivalenza', formula: R`A(x) = B(x) \iff k \cdot A(x) = k \cdot B(x), \quad k \ne 0`, nota: R`Mai moltiplicare o dividere per zero, né per un'espressione che potrebbe valere zero.` },
    { nome: 'Regola del trasporto', formula: R`A + C = B \iff A = B - C`, nota: R`Il termine che cambia membro cambia segno.` },
    { nome: 'Regola di cancellazione', formula: R`A + C = B + C \iff A = B` },
    { nome: 'Eliminazione dei denominatori numerici', formula: R`\frac{A}{m} = \frac{B}{n} \iff nA = mB \qquad (m, n \ne 0)`, nota: R`In pratica si moltiplicano entrambi i membri per il mcm dei denominatori.` },
    { nome: 'Equazione fratta', formula: R`\frac{N(x)}{D(x)} = 0 \iff N(x) = 0 \ \land\ D(x) \ne 0`, nota: R`La seconda condizione sono le c.e.: le soluzioni che annullano $D(x)$ si scartano.` },
    { nome: 'Equazione letterale', formula: R`A(a)\,x = B(a)`, nota: R`Se $A(a) \ne 0$: $x = \dfrac{B(a)}{A(a)}$. Se $A(a) = 0$: impossibile quando $B(a) \ne 0$, indeterminata quando $B(a) = 0$.` },
    { nome: 'Zero della retta', formula: R`y = ax - b \ \Rightarrow\ y = 0 \text{ per } x = \frac{b}{a}`, nota: R`La retta taglia l'asse $x$ nel punto $\left(\dfrac{b}{a};\,0\right)$; con $a = 0$ è orizzontale.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Che cos'è un'identità?`, retro: R`Un'uguaglianza vera per ogni valore delle lettere, come $2(x + 1) = 2x + 2$.` },
    { id: 'fc-02', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Che cos'è un'equazione?`, retro: R`Un'uguaglianza fra due espressioni, vera solo per certi valori dell'incognita (o per nessuno).` },
    { id: 'fc-03', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Soluzione di un'equazione`, retro: R`Un valore dell'incognita che rende vera l'uguaglianza. L'insieme di tutte le soluzioni si indica con $S$.` },
    { id: 'fc-04', sezione: 'identita-equazioni', tipo: 'concetto', fronte: R`Grado di un'equazione`, retro: R`L'esponente massimo con cui compare l'incognita, dopo aver svolto i calcoli. $3x - 5 = x + 1$ è di primo grado.` },
    { id: 'fc-05', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Equazione intera o fratta?`, retro: R`Intera se l'incognita non compare in nessun denominatore, fratta se compare. $\dfrac{x}{2} = 3$ è intera, $\dfrac{2}{x} = 3$ è fratta.` },
    { id: 'fc-06', sezione: 'principi-equivalenza', tipo: 'definizione', fronte: R`Equazioni equivalenti`, retro: R`Equazioni che hanno lo stesso insieme delle soluzioni.` },
    { id: 'fc-07', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Primo principio di equivalenza`, retro: R`Aggiungendo o togliendo a entrambi i membri la stessa quantità si ottiene un'equazione equivalente.` },
    { id: 'fc-08', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Secondo principio di equivalenza`, retro: R`Moltiplicando o dividendo entrambi i membri per lo stesso numero **diverso da zero** si ottiene un'equazione equivalente.` },
    { id: 'fc-09', sezione: 'principi-equivalenza', tipo: 'procedura', fronte: R`Regola del trasporto`, retro: R`Un termine passa da un membro all'altro cambiando segno: $3x + 5 = 11 \Rightarrow 3x = 11 - 5$.` },
    { id: 'fc-10', sezione: 'principi-equivalenza', tipo: 'procedura', fronte: R`Regola di cancellazione`, retro: R`Termini uguali presenti in entrambi i membri si eliminano: $2x + 7 = x + 7 \Rightarrow 2x = x$.` },
    { id: 'fc-11', sezione: 'forma-normale', tipo: 'formula', fronte: R`Forma normale di un'equazione di primo grado`, retro: R`$ax = b$, con $a$ coefficiente dell'incognita e $b$ termine noto.` },
    { id: 'fc-12', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Quando $ax = b$ è determinata?`, retro: R`Se $a \ne 0$: l'unica soluzione è $x = \dfrac{b}{a}$.` },
    { id: 'fc-13', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Quando $ax = b$ è impossibile?`, retro: R`Se $a = 0$ e $b \ne 0$: $0 \cdot x = b$ non è vera per nessun $x$, quindi $S = \varnothing$.` },
    { id: 'fc-14', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Quando $ax = b$ è indeterminata?`, retro: R`Se $a = 0$ e $b = 0$: $0 \cdot x = 0$ è vera per ogni $x$, quindi $S = \mathbb{R}$.` },
    { id: 'fc-15', sezione: 'frazioni-numeriche', tipo: 'procedura', fronte: R`Come si eliminano i denominatori numerici?`, retro: R`Si moltiplicano entrambi i membri per il mcm dei denominatori (secondo principio), senza dimenticare i termini senza frazione.` },
    { id: 'fc-16', sezione: 'frazioni-numeriche', tipo: 'concetto', fronte: R`Il segno meno davanti a una frazione`, retro: R`Vale per tutto il numeratore: $-\dfrac{x - 1}{3}$ moltiplicato per $6$ dà $-2(x - 1) = -2x + 2$.` },
    { id: 'fc-17', sezione: 'fratte', tipo: 'definizione', fronte: R`Condizioni di esistenza (c.e.)`, retro: R`I valori dell'incognita per cui ogni denominatore è diverso da zero. Si scrivono prima di risolvere.` },
    { id: 'fc-18', sezione: 'fratte', tipo: 'procedura', fronte: R`Passi per un'equazione fratta`, retro: R`1) C.e. 2) Denominatore comune. 3) Si eliminano i denominatori. 4) Si risolve e si scartano le soluzioni che violano le c.e.` },
    { id: 'fc-19', sezione: 'fratte', tipo: 'concetto', fronte: R`Che cosa si fa se la soluzione viola le c.e.?`, retro: R`Non è accettabile: si scarta. Se era l'unica, l'equazione è impossibile.` },
    { id: 'fc-20', sezione: 'letterali', tipo: 'definizione', fronte: R`Equazione letterale`, retro: R`Contiene, oltre all'incognita, altre lettere (parametri) che rappresentano numeri fissati ma non specificati.` },
    { id: 'fc-21', sezione: 'letterali', tipo: 'procedura', fronte: R`Discutere un'equazione letterale`, retro: R`Ridotta a $A\,x = B$: per i valori del parametro con $A = 0$ è impossibile o indeterminata; per gli altri $x = \dfrac{B}{A}$.` },
    { id: 'fc-22', sezione: 'problemi', tipo: 'procedura', fronte: R`Schema per risolvere un problema`, retro: R`1) Scegli l'incognita. 2) Traduci il testo in un'equazione. 3) Risolvi. 4) Controlla che la soluzione abbia senso nel problema.` },
    { id: 'fc-23', sezione: 'problemi', tipo: 'concetto', fronte: R`Perché controllare il senso della soluzione?`, retro: R`L'equazione non sa che $x$ è un'età o una lunghezza: un valore negativo o non intero può andare bene per l'equazione ma non per il problema.` },
    { id: 'fc-24', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Significato grafico della soluzione di $ax = b$`, retro: R`È l'ascissa del punto in cui la retta $y = ax - b$ taglia l'asse $x$: lo zero della retta.` },
    { id: 'fc-25', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Retta orizzontale ed equazione`, retro: R`Se $a = 0$ la retta $y = -b$ è orizzontale: non tocca l'asse $x$ (impossibile) oppure coincide con esso (indeterminata).` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $5x - 3 = 2x + 9$.`, suggerimenti: [R`Porta i termini con $x$ a sinistra e i numeri a destra, cambiando segno a quello che sposti.`, R`Dovresti arrivare a $3x = 12$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001 }, soluzione: [R`Trasporto: $5x - 2x = 9 + 3$, cioè $3x = 12$.`, R`Divido entrambi i membri per $3$: $x = 4$.`, R`Verifica: $20 - 3 = 17$ e $8 + 9 = 17$. ✓`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $4(x - 2) = 3x - 5$.`, suggerimenti: [R`Svolgi prima la parentesi.`, R`$4x - 8 = 3x - 5$: ora trasporta.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`$4x - 8 = 3x - 5$.`, R`$4x - 3x = -5 + 8$, cioè $x = 3$.`, R`Verifica: $4 \cdot 1 = 4$ e $9 - 5 = 4$. ✓`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi $\dfrac{x}{3} + 2 = \dfrac{x}{2}$.`, suggerimenti: [R`Il mcm dei denominatori è $6$: moltiplica tutti i termini per $6$, anche il $2$.`, R`$2x + 12 = 3x$.`], risposta: { tipo: 'numero', valore: 12, tolleranza: 0.001 }, soluzione: [R`mcm $= 6$: $\dfrac{2x + 12}{6} = \dfrac{3x}{6}$, quindi $2x + 12 = 3x$.`, R`$2x - 3x = -12$, cioè $-x = -12$ e $x = 12$.`, R`Verifica: $4 + 2 = 6$ e $\dfrac{12}{2} = 6$. ✓`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $2(x + 1) - 3(x - 2) = 8 - x$. Se non è determinata, scrivi «impossibile» o «indeterminata».`, suggerimenti: [R`Svolgi le parentesi con attenzione al $-3$ che moltiplica $(x - 2)$.`, R`Il primo membro diventa $-x + 8$. Confrontalo con il secondo.`], risposta: { tipo: 'testo', accettate: ['indeterminata', 'identita', 'identità', 'infinite soluzioni', 'tutti i numeri reali', 'ogni x', 'ogni numero', 'r', 's=r', 's=ℝ', 'ℝ'] }, soluzione: [R`$2x + 2 - 3x + 6 = 8 - x$, cioè $-x + 8 = 8 - x$.`, R`Porto tutto a sinistra: $-x + x + 8 - 8 = 0$, cioè $0 \cdot x = 0$.`, R`È vera per ogni $x$: equazione **indeterminata**, $S = \mathbb{R}$ (era un'identità).`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi $\dfrac{2x - 1}{3} - \dfrac{x}{4} = \dfrac{x + 2}{6}$.`, suggerimenti: [R`Il mcm di $3$, $4$ e $6$ è $12$.`, R`Dopo aver eliminato i denominatori: $4(2x - 1) - 3x = 2(x + 2)$.`], risposta: { tipo: 'numero', valore: 2.6667, tolleranza: 0.01 }, soluzione: [R`Denominatore comune $12$: $4(2x - 1) - 3x = 2(x + 2)$.`, R`$8x - 4 - 3x = 2x + 4$, cioè $5x - 2x = 4 + 4$ e $3x = 8$.`, R`$x = \dfrac{8}{3}$. Verifica: $\dfrac{13/3}{3} - \dfrac{2}{3} = \dfrac{13}{9} - \dfrac{6}{9} = \dfrac{7}{9}$ e $\dfrac{14/3}{6} = \dfrac{7}{9}$. ✓`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $\dfrac{x + 3}{x - 2} = 2$.`, suggerimenti: [R`Prima la c.e.: il denominatore non può valere zero.`, R`Moltiplica entrambi i membri per $x - 2$: $x + 3 = 2(x - 2)$.`], risposta: { tipo: 'numero', valore: 7, tolleranza: 0.001 }, soluzione: [R`C.e.: $x \ne 2$.`, R`$x + 3 = 2x - 4$, quindi $x - 2x = -4 - 3$, $-x = -7$, $x = 7$.`, R`$7 \ne 2$: accettabile. Verifica: $\dfrac{10}{5} = 2$. ✓`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\dfrac{3}{x - 2} = \dfrac{5}{2 - x} + 4$.`, suggerimenti: [R`$2 - x = -(x - 2)$: riscrivi la seconda frazione con denominatore $x - 2$.`, R`C.e. $x \ne 2$; poi l'equazione diventa $\dfrac{3}{x - 2} + \dfrac{5}{x - 2} = 4$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001 }, soluzione: [R`C.e.: $x \ne 2$. Poiché $\dfrac{5}{2 - x} = -\dfrac{5}{x - 2}$, l'equazione diventa $\dfrac{3}{x - 2} + \dfrac{5}{x - 2} = 4$, cioè $\dfrac{8}{x - 2} = 4$.`, R`Moltiplico per $x - 2$: $8 = 4x - 8$, quindi $4x = 16$ e $x = 4$.`, R`$4 \ne 2$: accettabile. Verifica: $\dfrac{3}{2} = 1{,}5$ e $\dfrac{5}{-2} + 4 = 1{,}5$. ✓`] },
    { id: 'es-08', difficolta: 3, testo: R`Risolvi $\dfrac{x}{x - 1} - \dfrac{2}{x + 1} = \dfrac{x^2 + 3}{x^2 - 1}$. Se non ha soluzioni, scrivi «impossibile».`, suggerimenti: [R`Scomponi $x^2 - 1 = (x - 1)(x + 1)$ prima di scrivere le c.e.`, R`Denominatore comune $(x - 1)(x + 1)$: $x(x + 1) - 2(x - 1) = x^2 + 3$.`, R`I termini $x^2$ si cancellano. Confronta la soluzione con le c.e.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna', 'nessuna soluzione', 'non ha soluzioni', 'insieme vuoto', 's=∅', '∅'] }, soluzione: [R`$x^2 - 1 = (x - 1)(x + 1)$. C.e.: $x \ne 1$ e $x \ne -1$.`, R`Denominatore comune $(x - 1)(x + 1)$: $x(x + 1) - 2(x - 1) = x^2 + 3$.`, R`$x^2 + x - 2x + 2 = x^2 + 3$, cioè $-x + 2 = 3$ e $x = -1$.`, R`Ma $x = -1$ viola le c.e.: va scartata. L'equazione è **impossibile**, $S = \varnothing$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi e discuti l'equazione letterale $(a - 1)\,x = a^2 - 1$.`, suggerimenti: [R`Il coefficiente di $x$ è $a - 1$: per quale valore di $a$ vale zero?`, R`Se $a \ne 1$ puoi dividere; ricorda che $a^2 - 1 = (a - 1)(a + 1)$.`, R`Se $a = 1$ sostituisci e guarda che cosa resta dell'equazione.`], soluzione: [R`Il coefficiente $a - 1$ si annulla per $a = 1$: quel valore va discusso a parte.`, R`$a \ne 1$: $x = \dfrac{a^2 - 1}{a - 1} = \dfrac{(a - 1)(a + 1)}{a - 1} = a + 1$. Equazione determinata.`, R`$a = 1$: $0 \cdot x = 0$, indeterminata: ogni $x$ è soluzione.`, R`Controllo con $a = 3$: $2x = 8$, $x = 4 = 3 + 1$. ✓`] },
    { id: 'es-10', difficolta: 2, testo: R`Il perimetro di un rettangolo è $46\ \text{cm}$ e la base supera l'altezza di $5\ \text{cm}$. Trova base e altezza.`, suggerimenti: [R`Chiama $x$ l'altezza: la base è $x + 5$.`, R`Il perimetro è il doppio della somma di base e altezza: $2(x + x + 5) = 46$.`], risposta: { tipo: 'numeri', valori: [9, 14] }, soluzione: [R`Altezza $x$, base $x + 5$. Perimetro: $2(x + x + 5) = 46$.`, R`$2(2x + 5) = 46$, cioè $4x + 10 = 46$, $4x = 36$, $x = 9$.`, R`Altezza $9\ \text{cm}$, base $14\ \text{cm}$. Senso: lunghezze positive, e $2(9 + 14) = 46$. ✓`] },
    { id: 'es-11', difficolta: 3, testo: R`Un padre ha $42$ anni e il figlio $12$. Fra quanti anni l'età del padre sarà il triplo di quella del figlio?`, suggerimenti: [R`Chiama $x$ gli anni che devono passare: fra $x$ anni il padre avrà $42 + x$ anni e il figlio $12 + x$.`, R`Traduci «sarà il triplo»: $42 + x = 3(12 + x)$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`Fra $x$ anni: padre $42 + x$, figlio $12 + x$. Condizione: $42 + x = 3(12 + x)$.`, R`$42 + x = 36 + 3x$, quindi $42 - 36 = 3x - x$, $6 = 2x$, $x = 3$.`, R`Senso: fra $3$ anni il padre avrà $45$ anni e il figlio $15$, e $45 = 3 \cdot 15$. ✓`] },
    { id: 'es-12', difficolta: 3, testo: R`Trova un numero naturale tale che il suo triplo diminuito di $7$ sia uguale al suo doppio diminuito di $10$. Se non esiste, scrivi «nessuno».`, suggerimenti: [R`Chiama $n$ il numero: $3n - 7 = 2n - 10$.`, R`Risolvi, poi chiediti se il valore trovato è davvero un numero naturale.`], risposta: { tipo: 'testo', accettate: ['nessuno', 'non esiste', 'nessun numero', 'impossibile', 'nessuna soluzione', 'nessuna'] }, soluzione: [R`$3n - 7 = 2n - 10$, quindi $3n - 2n = -10 + 7$ e $n = -3$.`, R`L'equazione è determinata, ma $-3$ non è un numero naturale: la soluzione non ha senso nel problema.`, R`Nessun numero naturale soddisfa la richiesta. Se il testo avesse detto «un numero intero», la risposta sarebbe stata $-3$: infatti $-9 - 7 = -16$ e $-6 - 10 = -16$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti uguaglianze è un'identità?`, opzioni: [R`$3x + 1 = 7$`, R`$(x + 1)^2 = x^2 + 2x + 1$`, R`$x + 2 = 2x$`, R`$2x = 0$`], corretta: 1, spiegazione: R`Il quadrato di binomio è vero per ogni $x$: è un'identità. Le altre sono equazioni, vere solo per un valore: $x = 2$, $x = 2$ e $x = 0$ rispettivamente.` },
    { id: 'q-02', domanda: R`Due equazioni si dicono equivalenti se…`, opzioni: [R`hanno lo stesso grado`, R`hanno gli stessi coefficienti`, R`hanno lo stesso termine noto`, R`hanno lo stesso insieme delle soluzioni`], corretta: 3, spiegazione: R`Conta solo l'insieme delle soluzioni: $2x = 6$ e $x - 3 = 0$ sono equivalenti pur avendo coefficienti e termini noti diversi.` },
    { id: 'q-03', domanda: R`Per quale principio $5x - 3 = 12$ diventa $5x = 15$?`, opzioni: [R`Secondo principio: si è moltiplicato per $5$`, R`Primo principio: si è aggiunto $3$ a entrambi i membri`, R`Regola di cancellazione`, R`Nessuno: è un passaggio errato`], corretta: 1, spiegazione: R`Aggiungere $3$ a entrambi i membri è il primo principio; la regola del trasporto ne è la versione pratica. Il secondo principio riguarda moltiplicazioni e divisioni.` },
    { id: 'q-04', domanda: R`Per quale numero NON è lecito moltiplicare entrambi i membri di un'equazione?`, opzioni: [R`$0$`, R`$-1$`, R`$\dfrac{1}{2}$`, R`$10$`], corretta: 0, spiegazione: R`Moltiplicando per $0$ ogni equazione diventa $0 = 0$, vera per ogni $x$: si perde ogni informazione. Il secondo principio richiede un fattore diverso da zero; $-1$, $\dfrac{1}{2}$ e $10$ vanno benissimo.` },
    { id: 'q-05', domanda: R`L'equazione $0 \cdot x = 5$ è…`, opzioni: [R`determinata, con $x = 5$`, R`determinata, con $x = 0$`, R`indeterminata`, R`impossibile`], corretta: 3, spiegazione: R`Zero per qualunque numero dà zero, mai $5$: nessun $x$ la rende vera, $S = \varnothing$. Non si può "dividere per zero" per ottenere $x = 5$.` },
    { id: 'q-06', domanda: R`L'equazione $0 \cdot x = 0$ è…`, opzioni: [R`impossibile`, R`determinata, con $x = 0$`, R`indeterminata`, R`non è un'equazione`], corretta: 2, spiegazione: R`È vera per ogni $x$: $S = \mathbb{R}$, equazione indeterminata (un'identità). $x = 0$ è soluzione, ma non l'unica.` },
    { id: 'q-07', domanda: R`Se $a \ne 0$, l'equazione $ax = b$…`, opzioni: [R`ha soluzione $x = \dfrac{a}{b}$`, R`ha due soluzioni`, R`è indeterminata`, R`ha una sola soluzione, $x = \dfrac{b}{a}$`], corretta: 3, spiegazione: R`Dividendo entrambi i membri per $a$ (lecito perché $a \ne 0$) si ottiene $x = \dfrac{b}{a}$: una sola soluzione. Attenzione a non invertire la frazione.` },
    { id: 'q-08', domanda: R`L'equazione $\dfrac{x}{3} - 2 = \dfrac{x + 1}{5}$ è…`, opzioni: [R`fratta`, R`intera`, R`letterale`, R`impossibile`], corretta: 1, spiegazione: R`I denominatori sono numeri, non contengono l'incognita: l'equazione è numerica intera. Si risolve moltiplicando per il mcm $15$ (e viene $x = 16{,}5$).` },
    { id: 'q-09', domanda: R`Che cosa sono le condizioni di esistenza di un'equazione fratta?`, opzioni: [R`I valori dell'incognita per cui tutti i denominatori sono diversi da zero`, R`I valori che annullano i numeratori`, R`Le soluzioni dell'equazione`, R`I valori per cui l'equazione è determinata`], corretta: 0, spiegazione: R`Le c.e. escludono i valori che annullano un denominatore, perché lì la frazione non ha significato. Non c'entrano con i numeratori né con le soluzioni, che vanno trovate dopo.` },
    { id: 'q-10', domanda: R`Risolvendo un'equazione fratta con c.e. $x \ne 2$ si trova come unico valore $x = 2$. Che cosa si conclude?`, opzioni: [R`L'equazione è impossibile`, R`$x = 2$ è la soluzione`, R`L'equazione è indeterminata`, R`Va rifatto il calcolo senza le c.e.`], corretta: 0, spiegazione: R`Il valore trovato viola le c.e. e si scarta: non resta nessuna soluzione, quindi $S = \varnothing$. Le c.e. non si tolgono per far tornare i conti.` },
    { id: 'q-11', domanda: R`Le condizioni di esistenza di $\dfrac{1}{x^2 - 9} = \dfrac{x}{x + 3}$ sono…`, opzioni: [R`$x \ne 9$`, R`$x \ne -3$`, R`$x \ne 3$ e $x \ne -3$`, R`$x \ne 0$`], corretta: 2, spiegazione: R`$x^2 - 9 = (x - 3)(x + 3)$ si annulla per $x = 3$ e $x = -3$; il secondo denominatore aggiunge di nuovo $x \ne -3$. Il numeratore $x$ non impone nulla.` },
    { id: 'q-12', domanda: R`In un'equazione letterale, il parametro è…`, opzioni: [R`l'incognita`, R`una seconda incognita da trovare`, R`il termine noto`, R`una lettera che rappresenta un numero fissato ma non specificato`], corretta: 3, spiegazione: R`Il parametro non si "trova": si suppone noto, e la soluzione viene espressa in funzione di esso. La discussione serve per i valori del parametro che annullano il coefficiente di $x$.` },
    { id: 'q-13', domanda: R`Nell'equazione $(k - 3)\,x = k - 3$, per $k = 3$ l'equazione è…`, opzioni: [R`determinata, con $x = 1$`, R`impossibile`, R`indeterminata`, R`determinata, con $x = 3$`], corretta: 2, spiegazione: R`Con $k = 3$ diventa $0 \cdot x = 0$: vera per ogni $x$, indeterminata. Per ogni altro $k$ si può dividere per $k - 3$ e si ottiene $x = 1$.` },
    { id: 'q-14', domanda: R`In un problema $x$ è un numero di persone e l'equazione dà $x = 7{,}5$. Che cosa si conclude?`, opzioni: [R`La soluzione non ha senso: si rilegge la traduzione, oppure il problema non ha soluzione`, R`Ci sono 7 persone`, R`Ci sono 8 persone`, R`L'equazione è impossibile`], corretta: 0, spiegazione: R`L'equazione è determinata, ma il valore non è accettabile per il problema: non si arrotonda, si controlla la traduzione o si conclude che con quei dati non esiste una soluzione.` },
    { id: 'q-15', domanda: R`Graficamente, la soluzione di $2x - 4 = 0$ è…`, opzioni: [R`l'ordinata in cui la retta $y = 2x - 4$ taglia l'asse $y$`, R`l'ascissa del punto in cui la retta $y = 2x - 4$ taglia l'asse $x$`, R`la pendenza della retta`, R`il punto $(0;\,-4)$`], corretta: 1, spiegazione: R`Risolvere $2x - 4 = 0$ è chiedere dove $y$ vale zero, cioè dove la retta attraversa l'asse $x$: in $x = 2$. Il punto $(0;\,-4)$ è l'intersezione con l'asse $y$.` },
    { id: 'q-16', domanda: R`Che cosa succede a un termine spostato da un membro all'altro?`, opzioni: [R`Cambia segno`, R`Resta uguale`, R`Viene diviso per il coefficiente di $x$`, R`Tutta l'equazione viene moltiplicata per $-1$`], corretta: 0, spiegazione: R`Trasportare un termine equivale a sottrarlo (o aggiungerlo) a entrambi i membri: il termine compare dall'altra parte con il segno opposto, e tutto il resto resta com'è.` },
    { id: 'q-17', domanda: R`Un'equazione di primo grado determinata ha…`, opzioni: [R`nessuna soluzione`, R`due soluzioni`, R`infinite soluzioni`, R`esattamente una soluzione`], corretta: 3, spiegazione: R`Determinata significa $a \ne 0$ e quindi un'unica soluzione $x = \dfrac{b}{a}$. Nessuna soluzione è il caso impossibile, infinite quello indeterminato; due soluzioni possono averle le equazioni di secondo grado.` },
    { id: 'q-18', domanda: R`Da $3x = 5x$, dividendo entrambi i membri per $x$, si ottiene $3 = 5$: "impossibile". Dov'è l'errore?`, opzioni: [R`Nessun errore: l'equazione è davvero impossibile`, R`Si è diviso per $x$, che può valere zero: infatti la soluzione è $x = 0$`, R`Bisognava dividere per $3$`, R`L'equazione è indeterminata`], corretta: 1, spiegazione: R`Il secondo principio permette di dividere solo per un numero diverso da zero. Trasportando, $3x - 5x = 0$ dà $-2x = 0$, cioè $x = 0$: l'equazione è determinata e la divisione per $x$ ha cancellato proprio la soluzione.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Ordine di lavoro: prima le parentesi, poi i denominatori, poi il trasporto (termini con $x$ a sinistra, numeri a destra). Solo alla fine si divide per il coefficiente di $x$.` },
    { tipo: 'errore', testo: R`Trasportare cambia il segno **solo** al termine che si sposta. $3x + 5 = 11$ diventa $3x = 11 - 5$, non $-3x = 11 - 5$.` },
    { tipo: 'errore', testo: R`Il meno davanti a una frazione vale per tutto il numeratore: dopo aver moltiplicato per il mcm, tieni il numeratore tra parentesi e svolgile nel passaggio dopo.` },
    { tipo: 'trucco', testo: R`Verifica sempre sostituendo nell'equazione *di partenza*, non nell'ultima riga: solo così scopri gli errori fatti a metà strada.` },
    { tipo: 'metodo', testo: R`Nelle fratte le c.e. si scrivono per prime, prima ancora di toccare l'equazione. E alla fine si rileggono: una soluzione che le viola si scarta.` },
    { tipo: 'errore', testo: R`Se sparisce la $x$ e resta $0 = 4$, non hai sbagliato: l'equazione è impossibile. Se resta $0 = 0$ è indeterminata. Non scrivere mai $x = \dfrac{4}{0}$.` },
    { tipo: 'metodo', testo: R`Equazione letterale: riducila a $A\,x = B$, poi chiediti per quali valori del parametro $A$ vale zero. La discussione è tutta lì.` },
    { tipo: 'trucco', testo: R`Nei problemi scegli come incognita la grandezza più piccola, o quella da cui si ricavano le altre: le espressioni vengono senza frazioni.` },
    { tipo: 'trucco', testo: R`Cambiare segno a tutti i termini è lecito (si moltiplica per $-1$): $-x = -7$ diventa $x = 7$, e $-3x = 12$ diventa $3x = -12$.` }
  ],

  aneddoti: [
    { matematico: 'Ahmes', anni: 'circa 1550 a.C.', titolo: 'Il mucchio e il suo settimo', testo: R`Il più antico manuale di matematica che possediamo è un rotolo di papiro lungo cinque metri, comprato a Luxor nel 1858 dall'antiquario scozzese Alexander Henry Rhind e oggi al British Museum. Lo scrisse uno scriba di nome Ahmes, copiandolo da un testo di due secoli prima. Fra i suoi 84 problemi ce n'è uno che suona così: «un mucchio e il suo settimo, messi insieme, fanno 19: quanto vale il mucchio?». L'incognita si chiamava *aha*, "mucchio", e non c'erano simboli: Ahmes prova con 7, ottiene $7 + 1 = 8$ invece di $19$, e corregge moltiplicando il tentativo per $19 : 8$. Il risultato, $16 + \frac{1}{2} + \frac{1}{8}$, è scritto con le frazioni unitarie care agli egizi. Il metodo si chiama *falsa posizione*, e ha funzionato per tremila anni.`, legame: R`Il problema del mucchio è l'equazione $x + \dfrac{x}{7} = 19$: in forma normale $\dfrac{8}{7}x = 19$, e infatti $x = \dfrac{133}{8}$.` },
    { matematico: 'Diofanto di Alessandria', anni: 'III secolo d.C.', titolo: 'Un epitaffio che si risolve', testo: R`Di Diofanto, autore dell'*Arithmetica* e primo a usare un simbolo per l'incognita, non sappiamo quasi nulla: nemmeno il secolo è sicuro. In compenso l'Antologia greca conserva un epigramma, forse scritto molto dopo, che si presenta come il suo epitaffio. Dice che fu fanciullo per un sesto della vita, che la barba gli crebbe dopo un altro dodicesimo, che si sposò dopo un ulteriore settimo, che cinque anni dopo ebbe un figlio, che il figlio visse la metà degli anni del padre, e che il padre morì quattro anni dopo di lui. Chi vuole sapere quanto visse Diofanto deve scrivere $\dfrac{x}{6} + \dfrac{x}{12} + \dfrac{x}{7} + 5 + \dfrac{x}{2} + 4 = x$ e risolvere: viene $84$. Nel margine di una copia dell'*Arithmetica*, quattordici secoli dopo, Fermat avrebbe scritto la sua nota più famosa.`, legame: R`L'epitaffio è un'equazione di primo grado con frazioni numeriche: il mcm dei denominatori è $84$, ed è anche la soluzione.` },
    { matematico: 'Al-Khwarizmi', anni: '780–850 circa', titolo: 'Trasporto e cancellazione hanno un nome arabo', testo: R`Nella Bagdad del califfo al-Ma'mun, alla Casa della Sapienza, Muhammad ibn Musa al-Khwarizmi scrisse intorno all'820 il *Kitab al-jabr wa l-muqabala*, «libro della ricomposizione e del confronto». Le due parole del titolo sono le nostre due regole pratiche: *al-jabr* è togliere un termine sottratto da un membro aggiungendolo all'altro, cioè il trasporto; *al-muqabala* è eliminare i termini uguali che compaiono da entrambe le parti, cioè la cancellazione. *Al-jabr* voleva dire anche rimettere a posto un osso rotto: in Spagna l'*algebrista* era per secoli il conciaossa, e nel *Don Chisciotte* è un algebrista a curare il baccelliere Sansone Carrasco dopo una caduta. Dal titolo del libro viene la parola **algebra**; dalla latinizzazione del nome dell'autore, *Algoritmi*, la parola **algoritmo**.`, legame: R`Le regole del trasporto e della cancellazione, che usiamo a ogni riga, sono le due operazioni del titolo del suo libro.` },
    { matematico: 'Robert Recorde', anni: '1512 circa–1558', titolo: 'Due linee parallele: nasce il segno uguale', testo: R`Fino al Cinquecento un'equazione si scriveva a parole: «è uguale a», o in latino *aequales*, ripetuto a ogni riga. Nel 1557 il medico e matematico gallese Robert Recorde, nel manuale di algebra *The Whetstone of Witte*, si stancò di quella ripetizione e propose di usare una coppia di segmenti paralleli della stessa lunghezza, perché, spiegò, non esistono due cose più uguali di due rette parallele. Il suo segno era molto più lungo del nostro, e per oltre un secolo fece fatica a imporsi: Descartes, nel 1637, ne usava ancora uno diverso. Recorde non vide la fortuna della sua idea: l'anno dopo, perduta una causa per diffamazione contro un potente conte, morì in una prigione per debitori di Londra.`, legame: R`Ogni equazione comincia da un segno $=$: l'idea che i due membri siano due cose "ugualmente lunghe" è la stessa immagine della bilancia.` },
    { matematico: 'François Viète', anni: '1540–1603', titolo: 'Una lettera anche per i numeri noti', testo: R`Viète era un avvocato e consigliere del re di Francia, e nel tempo libero decifrava per Enrico IV i dispacci segreti degli spagnoli: il re Filippo II, convinto che il suo codice fosse inviolabile, si lamentò con il papa che i francesi usassero la magia nera. Nel 1591, nell'*Isagoge*, Viète fece una cosa che oggi sembra ovvia e allora non lo era: usò le lettere non solo per l'incognita, ma anche per i numeri noti, con le vocali per le quantità cercate e le consonanti per quelle date. Prima di lui ogni equazione era un problema con numeri specifici, da rifare da capo ogni volta; dopo, si poteva scrivere una volta per tutte «$ax = b$» e risolvere tutte le equazioni insieme. Descartes, nel 1637, sistemò la convenzione che usiamo ancora: $x$, $y$, $z$ per le incognite, $a$, $b$, $c$ per i numeri noti.`, legame: R`La forma normale $ax = b$ e le equazioni letterali con il loro parametro esistono perché Viète diede una lettera anche ai coefficienti.` }
  ]
});
})();
