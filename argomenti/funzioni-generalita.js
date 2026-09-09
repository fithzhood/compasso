(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'funzioni-generalita',
  titolo: 'Le funzioni',

  introduzione: R`Una funzione è una macchina che trasforma un numero in un altro secondo una regola fissa: dai in input un valore, ne ricevi in output uno solo, sempre lo stesso per lo stesso input. È il concetto più importante di tutta l'analisi matematica, perché ogni fenomeno che dipende da qualcos'altro — la posizione di un oggetto nel tempo, il prezzo di un biglietto in base alla distanza, l'intensità di un segnale in base alla frequenza — si descrive con una funzione.

Da questo argomento in poi, quasi tutta la matematica del triennio parlerà di funzioni: esponenziali, logaritmi, seno e coseno, limiti, derivate e integrali sono tutti *tipi* di funzioni o *operazioni* su funzioni. Per questo vale la pena fissare bene il vocabolario di base — dominio, codominio, immagine, iniettiva, crescente, composta, inversa — prima di incontrarlo applicato a un caso specifico.

Per seguire senza intoppi serve conoscere il piano cartesiano, saper risolvere disequazioni (anche di secondo grado) e avere familiarità con le equazioni: il dominio di una funzione, per esempio, si trova risolvendo disequazioni e ponendo condizioni sui denominatori.`,

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è una funzione', testo: R`Una **funzione** è un tipo speciale di relazione tra due insiemi $A$ e $B$: una legge che ad ogni elemento di $A$ associa **uno e un solo** elemento di $B$. Si scrive $f: A \to B$, oppure $x \mapsto f(x)$, e si legge "$f$ da $A$ a $B$".

L'insieme $A$ si chiama **dominio** (gli elementi per cui la funzione è definita), l'insieme $B$ si chiama **codominio** (l'insieme in cui i risultati sono cercati). L'insieme dei valori effettivamente raggiunti, cioè $\{f(x) : x \in A\}$, si chiama **immagine** di $f$: è sempre un sottoinsieme del codominio, ma non sempre coincide con esso.

>* **Definizione:** una relazione tra $A$ e $B$ è una funzione se ad ogni $x \in A$ corrisponde uno e un solo $y \in B$. Questa proprietà si chiama **univocità**.

Non tutte le relazioni sono funzioni. "Ad ogni persona associa i suoi fratelli e sorelle" non è una funzione (una persona può averne zero, uno o più), mentre "ad ogni persona associa il suo codice fiscale" lo è: ciascuno ne ha esattamente uno.

Prova a trascinare il punto $p$ nel grafico qui sotto: a ogni posizione di $p$ sull'asse $x$ corrisponde uno ed un solo punto sulla curva, cioè un solo valore $f(p)$. È proprio questo che rende $y = x^3 - 3x$ una funzione.

[[grafico:immagine]]

>! Non confondere **codominio** e **immagine**. Il codominio è l'insieme in cui *si cercano* i risultati, scelto in partenza; l'immagine è l'insieme dei valori *effettivamente ottenuti*. Per $f(x) = x^2$ con codominio $\mathbb{R}$, l'immagine è solo $[0, +\infty)$.` },

    { id: 'grafico-funzione', titolo: 'Funzioni numeriche e il loro grafico', testo: R`Quando dominio e codominio sono sottoinsiemi di $\mathbb{R}$, la funzione si dice **funzione numerica** (o funzione reale di variabile reale), ed è quella che studieremo per tutto il triennio. Il modo più naturale di rappresentarla è il **grafico**: l'insieme dei punti $(x, f(x))$ nel piano cartesiano, uno per ogni $x$ del dominio.

Il grafico traduce visivamente l'univocità della definizione: fissata un'ascissa $x_0$, il valore $f(x_0)$ è uno solo, quindi sulla retta verticale $x = x_0$ il grafico ha **al massimo un punto**. Questo dà un modo rapido per riconoscere, guardando un disegno, se rappresenta una funzione oppure no.

>* **Test della retta verticale:** un grafico rappresenta una funzione se e solo se ogni retta verticale lo interseca in **al più un punto**.

Per esempio, la circonferenza $x^2 + y^2 = 1$ non è il grafico di una funzione: la retta $x = 0{,}5$ la interseca in due punti, $(0{,}5;\ 0{,}87)$ e $(0{,}5;\ -0{,}87)$, cioè a $x = 0{,}5$ corrisponderebbero due valori di $y$. La sola semicirconferenza superiore, $y = \sqrt{1 - x^2}$, è invece una funzione: ogni retta verticale la incontra al più una volta.

>! Non tutte le curve disegnabili sono grafici di funzioni. Prima di dire "la funzione $y = \ldots$" verifica che l'equazione dia davvero *un solo* $y$ per ogni $x$.` },

    { id: 'classificazione', titolo: 'Come si classificano le funzioni', testo: R`Le funzioni numeriche si classificano in base al tipo di espressione che le definisce.

Le funzioni **algebriche** sono quelle costruite con le quattro operazioni, le potenze e le radici:
- **razionali intere** (o polinomiali): $y = P(x)$, un polinomio, per esempio $y = x^3 - 2x + 1$;
- **razionali fratte**: $y = \dfrac{P(x)}{Q(x)}$, un rapporto di due polinomi, per esempio $y = \dfrac{x+1}{x-3}$;
- **irrazionali**: l'incognita compare sotto il segno di radice, per esempio $y = \sqrt{2x - 1}$.

Le funzioni **trascendenti** non si ottengono con un numero finito di operazioni algebriche: sono le funzioni **esponenziali** ($y = a^x$), **logaritmiche** ($y = \log_a x$) e **goniometriche** ($y = \sin x$, $y = \cos x$, e simili). Le studieremo nei prossimi argomenti; per ora basta saperle riconoscere.

| Tipo | Esempio |
|---|---|
| Razionale intera | $y = x^3 - 2x$ |
| Razionale fratta | $y = \dfrac{x+1}{x-3}$ |
| Irrazionale | $y = \sqrt{2x-1}$ |
| Trascendente | $y = 2^x$, $y = \log x$, $y = \sin x$ |

>* Una funzione è **razionale** se non contiene radici con l'incognita sotto il segno di radice: **intera** se non ha l'incognita a denominatore, **fratta** se ce l'ha.

>! "Razionale" qui non significa "con i coefficienti razionali": $y = \sqrt{2}\,x + 1$ è razionale intera anche se $\sqrt{2}$ è irrazionale. Il nome riguarda **come compare l'incognita**, non i coefficienti.` },

    { id: 'dominio-naturale', titolo: 'Il dominio naturale', testo: R`Quando di una funzione si dà solo l'espressione, senza specificare il dominio, si intende il **dominio naturale** (detto anche campo di esistenza, **c.e.**): l'insieme dei numeri reali per cui l'espressione ha senso. Le condizioni dipendono dal tipo di espressione, e vanno sempre messe **a sistema** (intersezione), non una alla volta.

| Espressione contiene… | Condizione |
|---|---|
| un denominatore $D(x)$ | $D(x) \ne 0$ |
| una radice di indice pari, $\sqrt[2n]{A(x)}$ | $A(x) \ge 0$ |
| una radice di indice dispari | nessuna condizione |
| un logaritmo, $\log A(x)$ | $A(x) > 0$ |

Esempio: $f(x) = \dfrac{\sqrt{x+1}}{x - 4}$. Ci sono due condizioni: $x + 1 \ge 0$ (radicando) e $x - 4 \ne 0$ (denominatore). Messe a sistema: $x \ge -1$ e $x \ne 4$, cioè il dominio è $[-1, 4) \cup (4, +\infty)$.

Il grafico seguente mostra $y = \dfrac{x-1}{x+2}$: il denominatore si annulla per $x = -2$, e proprio lì il grafico ha un **asintoto verticale**, la retta tratteggiata a cui il grafico si avvicina senza mai toccarla.

[[grafico:dominio-fratta]]

>* Il dominio naturale è sempre l'**intersezione** di tutte le condizioni richieste dai singoli pezzi dell'espressione, mai la loro unione.

>! Con più condizioni insieme (radice **e** frazione, per esempio) è facile dimenticarne una. Elenca tutte le condizioni prima di combinarle, una riga per ciascuna.` },

    { id: 'zeri-e-segno', titolo: 'Zeri e segno di una funzione', testo: R`Uno **zero** (o radice) di una funzione è un valore $x_0$ del dominio per cui $f(x_0) = 0$: graficamente, è l'ascissa di un punto in cui il grafico incontra l'asse $x$. Trovare gli zeri di $f$ significa risolvere l'equazione $f(x) = 0$, con le tecniche già viste per i vari tipi di equazione.

Studiare il **segno** di una funzione significa stabilire per quali $x$ del dominio si ha $f(x) > 0$ (il grafico sta sopra l'asse $x$) e per quali $f(x) < 0$ (il grafico sta sotto): si risolve la disequazione $f(x) > 0$. Quando $f$ è un prodotto o un quoziente di fattori più semplici, conviene studiare il segno di ciascun fattore e riassumerlo in una **tabella dei segni**, esattamente come per le disequazioni fratte.

Per esempio, per $f(x) = \dfrac{x - 1}{x + 2}$: il numeratore è positivo per $x > 1$, il denominatore per $x > -2$. Confrontando i segni nei tre intervalli individuati da $-2$ e $1$, si trova $f(x) > 0$ per $x < -2$ oppure $x > 1$, e $f(x) < 0$ per $-2 < x < 1$; lo zero è $x = 1$.

>* Zeri e segno si leggono anche direttamente dal grafico: gli zeri sono le intersezioni con l'asse $x$, il segno è "sopra" o "sotto" quell'asse.

>! "Positiva" e "crescente" non sono sinonimi. Una funzione può essere positiva e decrescente (per esempio, molto grande mentre diminuisce), oppure negativa e crescente: sono due informazioni diverse.` },

    { id: 'iniettive-suriettive', titolo: 'Funzioni iniettive, suriettive, biunivoche', testo: R`Una funzione $f: A \to B$ è **iniettiva** se a elementi diversi del dominio corrispondono sempre immagini diverse: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$. Equivalentemente, nessun valore dell'immagine viene raggiunto più di una volta. Graficamente si verifica con il **test della retta orizzontale**: se una retta orizzontale interseca il grafico in più di un punto, la funzione non è iniettiva.

Una funzione è **suriettiva** se l'immagine coincide con l'intero codominio: ogni elemento di $B$ viene raggiunto da almeno un elemento di $A$. La suriettività dipende dal codominio scelto: $f(x) = x^2$ da $\mathbb{R}$ a $\mathbb{R}$ non è suriettiva (i numeri negativi non vengono mai raggiunti), ma la stessa legge da $\mathbb{R}$ a $[0, +\infty)$ lo è.

Una funzione **sia** iniettiva **sia** suriettiva si dice **biunivoca** (o biiettiva): stabilisce una corrispondenza uno a uno fra dominio e codominio, e sarà proprio la condizione per costruire la funzione inversa.

Esempio: $f(x) = 2x + 3$ è iniettiva e suriettiva su $\mathbb{R}$, quindi biunivoca. $f(x) = x^2$ su $\mathbb{R}$ non è iniettiva, perché $f(-2) = f(2) = 4$; diventa iniettiva se si restringe il dominio a $[0, +\infty)$.

>* Iniettiva: valori distinti restano distinti. Suriettiva: tutto il codominio viene coperto. Biunivoca: entrambe le cose insieme.

>! Una funzione **pari** (diversa dalla funzione nulla) non è mai iniettiva sul suo intero dominio simmetrico: $f(-x) = f(x)$ significa che $-x$ e $x$ hanno sempre la stessa immagine.` },

    { id: 'crescenza-monotonia', titolo: 'Funzioni crescenti, decrescenti, monotone', testo: R`Una funzione $f$ è **crescente** in un intervallo $I$ del dominio se, presi comunque $x_1, x_2 \in I$ con $x_1 < x_2$, risulta $f(x_1) < f(x_2)$: aumentando $x$, aumenta anche $y$. È **decrescente** se invece $x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$. Una funzione **monotona** è crescente oppure decrescente in tutto l'intervallo considerato.

La definizione riguarda **un intervallo**, non due punti isolati: controllare $f(1) < f(3)$ non basta per dire che $f$ è crescente, perché potrebbe scendere e risalire fra $1$ e $3$.

Esempio: $f(x) = x^3$ è crescente su tutto $\mathbb{R}$. $f(x) = x^2$ non è monotona su $\mathbb{R}$: è decrescente su $(-\infty, 0]$ e crescente su $[0, +\infty)$, con il vertice come punto di cambio.

Una funzione **strettamente** monotona su tutto il dominio è sempre iniettiva: se $x_1 \ne x_2$, uno dei due è minore dell'altro, e la monotonia stretta garantisce immagini diverse. Non vale il viceversa: esistono funzioni iniettive non monotone.

>* Crescente: $x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$. Decrescente: $x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$. Vale sempre "per ogni $x_1, x_2$ nell'intervallo", non per una coppia scelta a caso.

>! Non dedurre la monotonia da un grafico osservato su una finestra troppo stretta: una funzione può sembrare crescente e invece avere una piccola discesa fuori dalla parte visibile.` },

    { id: 'parita-periodicita', titolo: 'Funzioni pari e dispari, cenni sulle periodiche', testo: R`Una funzione $f$, con dominio simmetrico rispetto a $0$ (cioè se $x$ è nel dominio, anche $-x$ lo è), si dice **pari** se $f(-x) = f(x)$ per ogni $x$ del dominio: il suo grafico è **simmetrico rispetto all'asse $y$**. Si dice **dispari** se $f(-x) = -f(x)$ per ogni $x$: il grafico è **simmetrico rispetto all'origine**.

Per stabilire se una funzione è pari, dispari o nessuna delle due, si calcola $f(-x)$ e lo si confronta con $f(x)$ e con $-f(x)$. La maggior parte delle funzioni non è né pari né dispari: per esempio $f(x) = x^2 + x$ non lo è, perché $f(-x) = x^2 - x$ non coincide né con $f(x)$ né con $-f(x)$.

Nel grafico qui sotto, $y = x^3$ è dispari: al punto $(2, 8)$ corrisponde, simmetrico rispetto all'origine, il punto $(-2, -8)$. $y = x^2$ è pari: al punto $(2, 4)$ corrisponde, simmetrico rispetto all'asse $y$, il punto $(-2, 4)$.

[[grafico:parita]]

Una funzione è **periodica** di periodo $T > 0$ se $f(x + T) = f(x)$ per ogni $x$ del dominio: il grafico si ripete identico ogni $T$ unità sull'asse $x$. È il comportamento tipico delle funzioni goniometriche, che vedremo nei prossimi argomenti; per ora basta conoscerne l'idea.

>* Pari: simmetria rispetto all'asse $y$. Dispari: simmetria rispetto all'origine. La maggior parte delle funzioni non è né l'una né l'altra.

>! "Non pari" non vuol dire "dispari": sono due proprietà indipendenti, ed esiste una terza possibilità, quella più comune, di non avere nessuna delle due simmetrie.` },

    { id: 'funzione-composta', titolo: 'La funzione composta', testo: R`Date due funzioni $f: A \to B$ e $g: B \to C$, la **funzione composta** $g \circ f: A \to C$ si ottiene applicando prima $f$ e poi $g$:

$$(g \circ f)(x) = g\big(f(x)\big).$$

Si legge "$g$ composto $f$", ma **si esegue da destra a sinistra**: prima $f$, poi $g$ sul risultato.

Perché $(g \circ f)(x)$ abbia senso, $f(x)$ deve appartenere al dominio di $g$: il dominio della composta è l'insieme delle $x$ del dominio di $f$ per cui questo accade, e può essere più piccolo del dominio di $f$.

Esempio: $f(x) = x - 1$, $g(x) = \sqrt{x}$. Allora $(g \circ f)(x) = \sqrt{x - 1}$, definita per $x \ge 1$, anche se $f$ da sola è definita su tutto $\mathbb{R}$: comporre ha aggiunto una condizione, perché $g$ richiede un argomento non negativo.

In generale $g \circ f \ne f \circ g$: con le stesse $f$ e $g$, $(f \circ g)(x) = \sqrt{x} - 1$, una funzione diversa dalla precedente, definita per $x \ge 0$. La composizione **non è commutativa**.

>* $(g \circ f)(x) = g(f(x))$: si calcola prima $f(x)$, poi si applica $g$ al risultato. L'ordine conta.

>! Scambiare l'ordine è l'errore più comune: $(g \circ f)(x)$ e $(f \circ g)(x)$ sono, quasi sempre, due funzioni diverse con domini diversi.` },

    { id: 'funzione-inversa', titolo: 'La funzione inversa', testo: R`Se $f: A \to B$ è **biunivoca**, esiste la **funzione inversa** $f^{-1}: B \to A$ che "disfa" $f$:

$$f^{-1}\big(f(x)\big) = x \ \text{per ogni } x \in A, \qquad f\big(f^{-1}(y)\big) = y \ \text{per ogni } y \in B.$$

Se $f$ non è iniettiva su tutto il dominio, si può comunque invertirla **restringendo** il dominio a un intervallo in cui lo diventa: $y = x^2$ non è invertibile su $\mathbb{R}$, ma lo è se si considera solo $x \ge 0$, con inversa $y = \sqrt{x}$.

Per trovare l'espressione dell'inversa, si parte da $y = f(x)$, si **scambiano** $x$ e $y$, ottenendo $x = f(y)$, e si risolve rispetto a $y$.

Il grafico qui sotto mostra $y = x^2$ ristretta a $x \in [0, 3]$ e la sua inversa $y = \sqrt{x}$: sono uno il **simmetrico** dell'altro rispetto alla bisettrice $y = x$, tratteggiata nel disegno.

[[grafico:inversa]]

>* Condizione per l'inversa: $f$ biunivoca (eventualmente dopo aver ristretto il dominio). Procedura: scambiare $x$ e $y$ in $y = f(x)$ e risolvere rispetto alla nuova $y$. Il grafico di $f^{-1}$ è simmetrico a quello di $f$ rispetto alla retta $y = x$.

>! $f^{-1}(x)$ **non** è $\dfrac{1}{f(x)}$: l'inversa non è il reciproco. Per esempio l'inversa di $f(x) = 2x$ è $f^{-1}(x) = \dfrac{x}{2}$, non $\dfrac{1}{2x}$.` },

    { id: 'traslazioni-dilatazioni', titolo: 'Traslazioni e dilatazioni del grafico', testo: R`A partire dal grafico di $y = f(x)$ si ottengono nuovi grafici con semplici trasformazioni.

- $y = f(x) + k$: **traslazione verticale**, verso l'alto se $k > 0$, verso il basso se $k < 0$.
- $y = f(x - h)$: **traslazione orizzontale**, verso destra se $h > 0$, verso sinistra se $h < 0$. Il segno è controintuitivo: conviene controllare dove si annulla l'argomento, $x - h = 0$, cioè $x = h$.
- $y = a \cdot f(x)$, con $a > 0$: **dilatazione verticale**, il grafico si allarga (se $a > 1$) o si stringe (se $0 < a < 1$) rispetto all'asse $x$. Se $a < 0$, si aggiunge anche una **simmetria rispetto all'asse $x$**.
- $y = f(-x)$: simmetria rispetto all'asse $y$.

Nel grafico qui sotto, $y = (x - h)^2 + k$ (curva continua) è la parabola $y = x^2$ (tratteggiata) traslata di $h$ a destra e di $k$ in alto: muovi i cursori e osserva come il vertice, che era in $(0, 0)$, si sposta esattamente in $(h, k)$.

[[grafico:traslazioni]]

>* Traslazione orizzontale $y = f(x - h)$: sposta a **destra** se $h > 0$. Traslazione verticale $y = f(x) + k$: sposta in **alto** se $k > 0$. Il punto di riferimento del grafico si sposta in $(h, k)$.

>! Non confondere $y = f(x) - 2$ (in basso di $2$) con $y = f(x - 2)$ (a destra di $2$): agiscono su parti diverse dell'espressione, una sul risultato, l'altra sull'argomento.` },

    { id: 'valore-assoluto', titolo: 'Il valore assoluto di una funzione', testo: R`Le trasformazioni con il valore assoluto agiscono in modo diverso a seconda di dove si trova la barra.

**$y = |f(x)|$** agisce sull'**uscita**: dove $f(x) \ge 0$ il grafico resta uguale; dove $f(x) < 0$, il valore assoluto lo rende positivo, quindi la parte di grafico che stava sotto l'asse $x$ viene **ribaltata sopra**, a specchio rispetto all'asse $x$ stesso.

**$y = f(|x|)$** agisce sull'**ingresso**: per $x \ge 0$, $|x| = x$ e il grafico coincide con quello di $f$; per $x < 0$, $f(|x|) = f(-x)$, cioè la parte di grafico a sinistra dell'asse $y$ viene **cancellata** e sostituita con il simmetrico, rispetto all'asse $y$, della parte a destra.

Nel grafico qui sotto, $y = |x^2 - 4|$ (curva continua) confrontata con $y = x^2 - 4$ (tratteggiata): dove la parabola tratteggiata è negativa, cioè fra $-2$ e $2$, il valore assoluto la ribalta sopra l'asse $x$; altrove le due curve coincidono.

[[grafico:valore-assoluto]]

>* $|f(x)|$: ribalta sopra l'asse $x$ le parti negative, lasciando invariato il resto. $f(|x|)$: tiene la parte con $x \ge 0$ e la specchia anche a sinistra dell'asse $y$, scartando l'eventuale parte originale con $x < 0$.

>! Le due trasformazioni non sono la stessa cosa e, in generale, danno grafici diversi: $|f(x)|$ tocca sempre l'asse $x$ dove $f$ si annullava, mentre $f(|x|)$ è sempre **simmetrica rispetto all'asse $y$**, qualunque fosse $f$ di partenza.` },

    { id: 'lettura-grafico', titolo: 'Leggere un grafico', testo: R`Da un grafico, senza conoscere l'espressione della funzione, si possono leggere direttamente molte informazioni.

- **Dominio**: si proietta il grafico sull'asse $x$; sono i valori "coperti" orizzontalmente.
- **Immagine**: si proietta il grafico sull'asse $y$; sono i valori "coperti" verticalmente.
- **Zeri**: le ascisse dei punti in cui il grafico attraversa o tocca l'asse $x$.
- **Segno**: dove il grafico sta sopra l'asse $x$ ($f(x) > 0$) e dove sta sotto ($f(x) < 0$).
- **Intervalli di crescenza e decrescenza**: dove il grafico "sale" leggendolo da sinistra a destra, e dove "scende".

Riprendiamo il grafico di $y = \dfrac{x - 1}{x + 2}$ già incontrato per il dominio.

[[grafico:dominio-fratta]]

**Dominio**: $x \ne -2$, perché lì il grafico ha l'asintoto verticale. **Zero**: $x = 1$, dove la curva attraversa l'asse $x$. **Segno**: positiva per $x < -2$ o $x > 1$, negativa per $-2 < x < 1$ (si legge osservando dove il grafico sta sopra o sotto l'asse). **Crescenza**: su ciascuno dei due rami, a sinistra e a destra dell'asintoto, il grafico sale: la funzione è crescente in $(-\infty, -2)$ e in $(-2, +\infty)$, separatamente. Guardando la finestra mostrata, i due rami sembrano avvicinarsi alla retta $y = 1$ senza mai toccarla: è un'anticipazione di quello che chiameremo asintoto orizzontale.

>* Un grafico si legge sempre nello stesso ordine: dominio e immagine (dagli assi), zeri e segno (rispetto all'asse $x$), crescenza e decrescenza (da sinistra a destra).

>! Il dominio si legge sull'asse $x$, l'immagine sull'asse $y$: sono proiezioni su assi diversi, e scambiarle è un errore frequente.` }
  ],

  grafici: {
    immagine: {
      tipo: 'piano', x: [-2.1, 2.1], y: [-3, 3],
      parametri: [ { nome: 'p', min: -1.9, max: 1.9, passo: 0.1, valore: 1.2, nascosto: true } ],
      funzioni: [ { f: 'x^3 - 3x', etichetta: 'y = x³ − 3x', colore: 1 } ],
      elementi: [
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'p = {{p}}', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['p', 'p^3-3p'], etichetta: 'f(p)', posizione: 'destra', colore: 4 },
        { tipo: 'segmento', da: ['p', 0], a: ['p', 'p^3-3p'], tratteggio: true },
        { tipo: 'testo', p: [-2.0, 2.7], testo: 'f(p) = {{p^3 - 3*p}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto p sull\'asse x: il punto colorato lo segue sulla curva, all\'altezza f(p).'
    },
    traslazioni: {
      tipo: 'piano', x: [-6, 6], y: [-4, 9],
      parametri: [
        { nome: 'h', min: -3, max: 3, passo: 0.5, valore: 2, etichetta: 'h' },
        { nome: 'k', min: -3, max: 3, passo: 0.5, valore: 1, etichetta: 'k' }
      ],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 3, tratteggio: true },
        { f: '(x-h)^2 + k', etichetta: 'y = (x − h)² + k', colore: 1 }
      ],
      elementi: [ { tipo: 'punto', p: ['h', 'k'], etichetta: 'V = (h, k)', posizione: 'alto', colore: 1 } ],
      didascalia: 'y = (x − h)² + k è la parabola y = x² traslata di h a destra e di k in alto: il vertice passa da (0, 0) a (h, k).'
    },
    parita: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-9, 9],
      funzioni: [
        { f: 'x^3', etichetta: 'y = x³ (dispari)', colore: 1 },
        { f: 'x^2', etichetta: 'y = x² (pari)', colore: 3 }
      ],
      punti: [
        { x: 2, y: 8, etichetta: '(2, 8)', posizione: 'destra', colore: 1 },
        { x: -2, y: -8, etichetta: '(−2, −8)', posizione: 'sinistra', colore: 1 },
        { x: 2, y: 4, etichetta: '(2, 4)', posizione: 'alto-destra', colore: 3 },
        { x: -2, y: 4, etichetta: '(−2, 4)', posizione: 'alto-sinistra', colore: 3 }
      ],
      didascalia: 'I punti sul cubo sono simmetrici rispetto all\'origine (ordinate opposte); i punti sul quadrato sono simmetrici rispetto all\'asse y (stessa ordinata).'
    },
    inversa: {
      tipo: 'piano', x: [-1, 9.5], y: [-1, 9.5],
      proporzioni: 'uguali',
      funzioni: [
        { f: 'x^2', etichetta: 'y = x² (x ∈ [0, 3])', colore: 1, dominio: [0, 3] },
        { f: 'sqrt(x)', etichetta: 'y = √x', colore: 2, dominio: [0, 9] }
      ],
      elementi: [ { tipo: 'retta', m: 1, q: 0, etichetta: 'y = x', tratteggio: true } ],
      didascalia: 'y = √x è l\'inversa di y = x² per x ≥ 0: il suo grafico è il simmetrico rispetto alla bisettrice y = x.'
    },
    'dominio-fratta': {
      tipo: 'piano', x: [-8, 8], y: [-6, 6],
      funzioni: [ { f: '(x-1)/(x+2)', etichetta: 'y = (x − 1)/(x + 2)', colore: 1 } ],
      elementi: [ { tipo: 'verticale', x: -2, asintoto: true, etichetta: 'x = −2' } ],
      didascalia: 'La funzione non è definita per x = −2: lì il denominatore si annulla e il grafico ha un asintoto verticale.'
    },
    'valore-assoluto': {
      tipo: 'piano', x: [-3, 3], y: [-5, 6],
      funzioni: [
        { f: 'x^2 - 4', etichetta: 'y = x² − 4', colore: 3, tratteggio: true },
        { f: 'abs(x^2-4)', etichetta: 'y = |x² − 4|', colore: 1 }
      ],
      didascalia: 'Dove x² − 4 è negativa (fra −2 e 2), il valore assoluto ribalta il grafico sopra l\'asse x.'
    }
  },

  esempi: [
    { titolo: 'Il dominio di una funzione fratta', problema: R`Trova il dominio naturale di $f(x) = \dfrac{3x}{x^2 - 9}$.`, passi: [
      R`È una funzione razionale fratta: il denominatore non può annullarsi. Impongo $x^2 - 9 \ne 0$.`,
      R`Risolvo l'equazione associata (pura): $x^2 = 9 \Rightarrow x = \pm 3$. Questi sono i valori da escludere.`,
      R`Il dominio naturale è $\mathbb{R} \setminus \{-3, 3\}$, cioè $x \ne -3$ e $x \ne 3$.`
    ], risultato: R`Dominio: $x \ne -3$ e $x \ne 3$.` },

    { titolo: 'Dominio con radice e frazione insieme', problema: R`Trova il dominio naturale di $f(x) = \dfrac{\sqrt{x+1}}{x-4}$.`, passi: [
      R`Ci sono due condizioni da imporre insieme: il radicando non negativo (indice pari) e il denominatore diverso da zero.`,
      R`Radicando: $x + 1 \ge 0 \Rightarrow x \ge -1$. Denominatore: $x - 4 \ne 0 \Rightarrow x \ne 4$.`,
      R`Metto le due condizioni a sistema (intersezione): $x \ge -1$ e $x \ne 4$.`,
      R`Il dominio è $[-1, 4) \cup (4, +\infty)$.`
    ], risultato: R`Dominio: $[-1, 4) \cup (4, +\infty)$.` },

    { titolo: 'Parità di una funzione', problema: R`Stabilisci se $f(x) = x^4 - 3x^2 + 1$ è pari, dispari o nessuna delle due.`, passi: [
      R`Il dominio è tutto $\mathbb{R}$, simmetrico rispetto a $0$: posso procedere con il test.`,
      R`Calcolo $f(-x) = (-x)^4 - 3(-x)^2 + 1 = x^4 - 3x^2 + 1$.`,
      R`Confronto: $f(-x) = f(x)$ per ogni $x$. La funzione è **pari**.`
    ], risultato: R`$f$ è pari: il suo grafico è simmetrico rispetto all'asse $y$.` },

    { titolo: 'Funzione composta e il suo dominio', problema: R`Date $f(x) = \dfrac{1}{x - 2}$ e $g(x) = x^2 + 3$, trova $(f \circ g)(x)$ e il suo dominio.`, passi: [
      R`$(f \circ g)(x) = f\big(g(x)\big) = f(x^2 + 3) = \dfrac{1}{(x^2 + 3) - 2} = \dfrac{1}{x^2 + 1}$.`,
      R`Il dominio richiede $g(x) \ne 2$ (perché $f$ non è definita in $2$), cioè $x^2 + 3 \ne 2 \Rightarrow x^2 \ne -1$.`,
      R`$x^2 \ne -1$ è vera per **ogni** $x$ reale, perché un quadrato non è mai negativo: nessuna $x$ va esclusa.`,
      R`Il dominio della composta è tutto $\mathbb{R}$, più ampio di quanto ci si aspetterebbe guardando solo $f$.`
    ], risultato: R`$(f \circ g)(x) = \dfrac{1}{x^2+1}$, dominio $\mathbb{R}$.` },

    { titolo: 'Trovare la funzione inversa', problema: R`Verifica che $f(x) = \dfrac{2x + 1}{3}$ è invertibile e trova $f^{-1}(x)$.`, passi: [
      R`$f$ è una funzione lineare non costante, quindi è iniettiva e suriettiva su $\mathbb{R}$: è biunivoca, dunque invertibile.`,
      R`Pongo $y = \dfrac{2x+1}{3}$ e scambio $x$ con $y$: $x = \dfrac{2y+1}{3}$.`,
      R`Risolvo rispetto a $y$: $3x = 2y + 1 \Rightarrow y = \dfrac{3x - 1}{2}$.`,
      R`Verifica: $f\big(f^{-1}(x)\big) = \dfrac{2 \cdot \frac{3x-1}{2} + 1}{3} = \dfrac{(3x - 1) + 1}{3} = \dfrac{3x}{3} = x$. ✓`
    ], risultato: R`$f^{-1}(x) = \dfrac{3x - 1}{2}$.` }
  ],

  formulario: [
    { nome: 'Dominio: denominatore', formula: R`D(x) \ne 0`, nota: R`Vale per ogni funzione razionale fratta.` },
    { nome: 'Dominio: radice di indice pari', formula: R`A(x) \ge 0`, nota: R`Il radicando non può essere negativo.` },
    { nome: 'Dominio: logaritmo', formula: R`A(x) > 0`, nota: R`L'argomento del logaritmo deve essere positivo.` },
    { nome: 'Funzione pari', formula: R`f(-x) = f(x)`, nota: R`Grafico simmetrico rispetto all'asse $y$.` },
    { nome: 'Funzione dispari', formula: R`f(-x) = -f(x)`, nota: R`Grafico simmetrico rispetto all'origine.` },
    { nome: 'Funzione periodica', formula: R`f(x + T) = f(x)`, nota: R`Per ogni $x$ del dominio, con $T > 0$ periodo.` },
    { nome: 'Funzione crescente', formula: R`x_1 < x_2 \Rightarrow f(x_1) < f(x_2)` },
    { nome: 'Funzione decrescente', formula: R`x_1 < x_2 \Rightarrow f(x_1) > f(x_2)` },
    { nome: 'Funzione iniettiva', formula: R`x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)` },
    { nome: 'Funzione suriettiva', formula: R`f(A) = B`, nota: R`L'immagine coincide con l'intero codominio.` },
    { nome: 'Funzione composta', formula: R`(g \circ f)(x) = g\big(f(x)\big)` },
    { nome: 'Funzione inversa', formula: R`f^{-1}\big(f(x)\big) = x`, nota: R`Vale per ogni $x$ del dominio di $f$; analogamente $f(f^{-1}(y)) = y$ per ogni $y$ del codominio.` },
    { nome: 'Traslazione del grafico', formula: R`y = f(x - h) + k`, nota: R`Sposta a destra di $h$ e in alto di $k$.` },
    { nome: 'Dilatazione e simmetria', formula: R`y = a \cdot f(x)`, nota: R`Dilata verticalmente per $|a| > 1$; se $a < 0$ ribalta anche rispetto all'asse $x$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Definizione di funzione`, retro: R`Una legge che ad ogni elemento del dominio associa uno e un solo elemento del codominio (proprietà di univocità).` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Differenza fra codominio e immagine`, retro: R`Il codominio è l'insieme in cui si cercano i valori; l'immagine è il sottoinsieme dei valori effettivamente raggiunti.` },
    { id: 'fc-03', sezione: 'grafico-funzione', tipo: 'concetto', fronte: R`Test della retta verticale`, retro: R`Un grafico rappresenta una funzione se e solo se ogni retta verticale lo interseca in al più un punto.` },
    { id: 'fc-04', sezione: 'classificazione', tipo: 'definizione', fronte: R`Funzione razionale intera`, retro: R`Un polinomio, $y = P(x)$: definita per ogni $x$ reale.` },
    { id: 'fc-05', sezione: 'classificazione', tipo: 'definizione', fronte: R`Funzione razionale fratta`, retro: R`Un rapporto di due polinomi, $y = \dfrac{P(x)}{Q(x)}$, con l'incognita anche a denominatore.` },
    { id: 'fc-06', sezione: 'dominio-naturale', tipo: 'procedura', fronte: R`Condizione di esistenza per un denominatore`, retro: R`Deve essere diverso da zero: $D(x) \ne 0$.` },
    { id: 'fc-07', sezione: 'dominio-naturale', tipo: 'procedura', fronte: R`Condizione di esistenza per una radice di indice pari`, retro: R`Il radicando deve essere non negativo: $A(x) \ge 0$.` },
    { id: 'fc-08', sezione: 'zeri-e-segno', tipo: 'definizione', fronte: R`Zero di una funzione`, retro: R`Un valore $x_0$ del dominio per cui $f(x_0) = 0$.` },
    { id: 'fc-09', sezione: 'zeri-e-segno', tipo: 'procedura', fronte: R`Come si studia il segno di $f$`, retro: R`Si risolve la disequazione $f(x) > 0$: dove è vera il grafico sta sopra l'asse $x$.` },
    { id: 'fc-10', sezione: 'iniettive-suriettive', tipo: 'definizione', fronte: R`Funzione iniettiva`, retro: R`A elementi distinti del dominio corrispondono immagini distinte: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$.` },
    { id: 'fc-11', sezione: 'iniettive-suriettive', tipo: 'definizione', fronte: R`Funzione biunivoca`, retro: R`Sia iniettiva sia suriettiva: corrispondenza uno a uno fra dominio e codominio.` },
    { id: 'fc-12', sezione: 'crescenza-monotonia', tipo: 'definizione', fronte: R`Funzione crescente in un intervallo`, retro: R`Per ogni $x_1 < x_2$ nell'intervallo, $f(x_1) < f(x_2)$.` },
    { id: 'fc-13', sezione: 'crescenza-monotonia', tipo: 'concetto', fronte: R`Funzione monotona`, retro: R`Crescente oppure decrescente in tutto l'intervallo considerato.` },
    { id: 'fc-14', sezione: 'parita-periodicita', tipo: 'definizione', fronte: R`Funzione pari`, retro: R`$f(-x) = f(x)$ per ogni $x$: grafico simmetrico rispetto all'asse $y$.` },
    { id: 'fc-15', sezione: 'parita-periodicita', tipo: 'definizione', fronte: R`Funzione dispari`, retro: R`$f(-x) = -f(x)$ per ogni $x$: grafico simmetrico rispetto all'origine.` },
    { id: 'fc-16', sezione: 'funzione-composta', tipo: 'formula', fronte: R`Funzione composta`, retro: R`$(g \circ f)(x) = g(f(x))$: si applica prima $f$, poi $g$.` },
    { id: 'fc-17', sezione: 'funzione-composta', tipo: 'concetto', fronte: R`Dominio della funzione composta`, retro: R`Le $x$ del dominio di $f$ per cui $f(x)$ appartiene al dominio di $g$.` },
    { id: 'fc-18', sezione: 'funzione-inversa', tipo: 'concetto', fronte: R`Condizione per l'esistenza dell'inversa`, retro: R`La funzione deve essere biunivoca (eventualmente restringendo il dominio).` },
    { id: 'fc-19', sezione: 'funzione-inversa', tipo: 'concetto', fronte: R`Grafico della funzione inversa`, retro: R`È il simmetrico del grafico di $f$ rispetto alla bisettrice $y = x$.` },
    { id: 'fc-20', sezione: 'traslazioni-dilatazioni', tipo: 'procedura', fronte: R`Traslazione orizzontale $y = f(x-h)$`, retro: R`Sposta il grafico a destra se $h > 0$, a sinistra se $h < 0$: segno controintuitivo.` },
    { id: 'fc-21', sezione: 'valore-assoluto', tipo: 'procedura', fronte: R`Effetto di $y = |f(x)|$`, retro: R`Ribalta sopra l'asse $x$ le parti di grafico che stavano sotto; lascia invariato il resto.` },
    { id: 'fc-22', sezione: 'lettura-grafico', tipo: 'procedura', fronte: R`Come si legge il dominio da un grafico`, retro: R`Si proietta il grafico sull'asse $x$: sono i valori coperti orizzontalmente.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Trova il dominio naturale di $f(x) = \dfrac{2x - 1}{x + 5}$.`, suggerimenti: [R`È una funzione razionale fratta: quale condizione riguarda il denominatore?`, R`Il denominatore si annulla per un solo valore di $x$.`], risposta: { tipo: 'testo', accettate: ['x≠-5', 'x!=-5', 'R-{-5}', 'x diverso da -5'] }, soluzione: [R`Essendo una funzione razionale fratta, il denominatore non può annullarsi: $x + 5 \ne 0$.`, R`Cioè $x \ne -5$.`, R`Il dominio naturale è $\mathbb{R} \setminus \{-5\}$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Trova il dominio naturale di $f(x) = \sqrt{x - 4}$.`, suggerimenti: [R`Il radicando ha indice pari: quale condizione impone?`, R`Deve essere $x - 4 \ge 0$.`], risposta: { tipo: 'intervallo', da: 4, a: 'inf', chiusoDa: true, chiusoA: false }, soluzione: [R`Indice pari: il radicando deve essere non negativo, $x - 4 \ge 0$.`, R`Cioè $x \ge 4$.`, R`Il dominio è $[4, +\infty)$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Trova gli zeri di $f(x) = x^2 - 5x + 6$.`, suggerimenti: [R`Uno zero è un valore di $x$ per cui $f(x) = 0$: risolvi l'equazione di secondo grado associata.`, R`Cerca due numeri con somma $5$ e prodotto $6$.`], risposta: { tipo: 'numeri', valori: [2, 3] }, soluzione: [R`Risolvo $x^2 - 5x + 6 = 0$: cerco due numeri con somma $5$ e prodotto $6$, cioè $2$ e $3$.`, R`Gli zeri sono $x = 2$ e $x = 3$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Date $f(x) = 3x - 2$ e $g(x) = x + 1$, calcola $(f \circ g)(2)$.`, suggerimenti: [R`Calcola prima $g(2)$.`, R`Poi applica $f$ al risultato ottenuto.`], risposta: { tipo: 'numero', valore: 7 }, soluzione: [R`$g(2) = 2 + 1 = 3$.`, R`$(f \circ g)(2) = f(3) = 3 \cdot 3 - 2 = 7$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Stabilisci se $f(x) = x^3 - x$ è pari, dispari o nessuna delle due.`, suggerimenti: [R`Calcola $f(-x)$ e confrontalo con $f(x)$.`, R`$f(-x) = (-x)^3 - (-x) = -x^3 + x$: raccogli il segno.`], risposta: { tipo: 'testo', accettate: ['dispari', 'è dispari', 'la funzione è dispari'] }, soluzione: [R`$f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$.`, R`Poiché $f(-x) = -f(x)$ per ogni $x$, la funzione è **dispari**.`] },
    { id: 'es-06', difficolta: 2, testo: R`Trova il dominio naturale di $f(x) = \sqrt{4 - x^2}$.`, suggerimenti: [R`Indice pari: imponi il radicando non negativo.`, R`Risolvi la disequazione $4 - x^2 \ge 0$, cioè $x^2 \le 4$.`], risposta: { tipo: 'intervallo', da: -2, a: 2, chiusoDa: true, chiusoA: true }, soluzione: [R`Condizione: $4 - x^2 \ge 0$, cioè $x^2 \le 4$.`, R`Risolvendo (disequazione pura), $-2 \le x \le 2$.`, R`Il dominio è $[-2, 2]$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Trova il dominio naturale di $f(x) = \log(x - 1) + \dfrac{1}{x - 3}$.`, suggerimenti: [R`Ci sono due condizioni distinte da mettere a sistema: una per il logaritmo, una per il denominatore.`, R`Argomento del logaritmo: $x - 1 > 0$. Denominatore: $x - 3 \ne 0$.`, R`Il dominio è l'insieme dei valori che rispettano entrambe le condizioni insieme.`], soluzione: [R`Argomento del logaritmo positivo: $x - 1 > 0 \Rightarrow x > 1$.`, R`Denominatore diverso da zero: $x - 3 \ne 0 \Rightarrow x \ne 3$.`, R`A sistema: $x > 1$ e $x \ne 3$, cioè il dominio è $(1, 3) \cup (3, +\infty)$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Verifica che $f(x) = 2x + 7$ è invertibile e trova $f^{-1}(x)$.`, suggerimenti: [R`Una funzione lineare non costante è sempre biunivoca su $\mathbb{R}$.`, R`Scambia $x$ e $y$ in $y = 2x + 7$ e risolvi rispetto alla nuova $y$.`], risposta: { tipo: 'testo', accettate: ['(x-7)/2', 'x/2-7/2', '(x−7)/2'] }, soluzione: [R`$f$ è lineare e non costante: è biunivoca su $\mathbb{R}$, quindi invertibile.`, R`Pongo $y = 2x + 7$, scambio $x$ e $y$: $x = 2y + 7$.`, R`Risolvo rispetto a $y$: $y = \dfrac{x - 7}{2}$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Date $f(x) = \sqrt{x - 2}$ e $g(x) = x^2 + 1$, trova il dominio di $(f \circ g)(x)$.`, suggerimenti: [R`Calcola prima l'espressione di $(f \circ g)(x) = f(g(x))$.`, R`Poi imponi che il radicando sia non negativo.`, R`Arrivi a $x^2 + 1 - 2 \ge 0$, cioè $x^2 \ge 1$.`], risposta: { tipo: 'testo', accettate: ['x≤-1 o x≥1', 'x<=-1 o x>=1', 'x<=-1 or x>=1', '(-inf,-1]u[1,+inf)'] }, soluzione: [R`$(f \circ g)(x) = f(x^2+1) = \sqrt{x^2 + 1 - 2} = \sqrt{x^2 - 1}$.`, R`Serve $x^2 - 1 \ge 0$, cioè $x^2 \ge 1$.`, R`Risolvendo (disequazione pura), $x \le -1$ oppure $x \ge 1$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Date $f(x) = \dfrac{1}{x}$ e $g(x) = x - 3$, scrivi l'espressione di $(g \circ f)(x)$ e stabilisci per quali $x$ è definita.`, suggerimenti: [R`$(g \circ f)(x) = g(f(x))$: sostituisci $f(x)$ dentro $g$.`, R`Il denominatore di $f$ impone già una condizione.`], risposta: { tipo: 'testo', accettate: ['1/x-3', '1/x - 3', '(1-3x)/x'] }, soluzione: [R`$(g \circ f)(x) = g\left(\dfrac{1}{x}\right) = \dfrac{1}{x} - 3$.`, R`È definita per $x \ne 0$, la stessa condizione richiesta da $f$: $g$ non aggiunge altre restrizioni, perché è definita per ogni numero reale.`] },
    { id: 'es-11', difficolta: 3, testo: R`Scrivi l'equazione della parabola ottenuta traslando $y = x^2$ di $3$ unità a destra e $2$ unità verso il basso.`, suggerimenti: [R`Una traslazione a destra di $h$ agisce sull'argomento: $y = f(x - h)$.`, R`Una traslazione verso il basso di $2$ significa $k = -2$ in $y = f(x) + k$.`], risposta: { tipo: 'testo', accettate: ['(x-3)^2-2', '(x-3)²-2', 'y=(x-3)^2-2'] }, soluzione: [R`Traslazione a destra di $3$: si sostituisce $x$ con $x - 3$, ottenendo $y = (x-3)^2$.`, R`Traslazione verso il basso di $2$: si aggiunge $k = -2$.`, R`Equazione finale: $y = (x - 3)^2 - 2$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti è la definizione corretta di funzione da $A$ a $B$?`, opzioni: [R`Una relazione che associa ad ogni elemento di $B$ uno o più elementi di $A$`, R`Una relazione qualsiasi fra due insiemi $A$ e $B$`, R`Una legge che associa ad ogni elemento di $A$ uno e un solo elemento di $B$`, R`Un'equazione con due incognite $x$ e $y$`], corretta: 2, spiegazione: R`La proprietà che distingue una funzione da una relazione generica è l'univocità: a ogni $x$ del dominio corrisponde uno e un solo $y$. Le altre opzioni descrivono relazioni non necessariamente univoche, o generiche equazioni.` },
    { id: 'q-02', domanda: R`L'immagine di una funzione $f: A \to B$ è…`, opzioni: [R`l'insieme dei valori di $B$ effettivamente raggiunti da $f$`, R`sempre uguale al codominio $B$`, R`l'insieme di partenza $A$`, R`l'insieme dei punti in cui $f$ si annulla`], corretta: 0, spiegazione: R`L'immagine è un sottoinsieme del codominio, formato solo dai valori realmente ottenuti; coincide col codominio solo se la funzione è suriettiva.` },
    { id: 'q-03', domanda: R`A che cosa serve il test della retta verticale?`, opzioni: [R`a trovare gli zeri di una funzione`, R`a stabilire se un grafico rappresenta una funzione`, R`a stabilire se una funzione è pari`, R`a trovare il dominio naturale`], corretta: 1, spiegazione: R`Se una retta verticale interseca il grafico in più di un punto, a quella $x$ corrisponderebbero due valori di $y$: la relazione non sarebbe una funzione.` },
    { id: 'q-04', domanda: R`Una funzione razionale fratta è caratterizzata dal fatto che…`, opzioni: [R`ha coefficienti razionali`, R`l'incognita compare sotto una radice`, R`è definita per ogni $x$ reale`, R`l'incognita compare anche a denominatore`], corretta: 3, spiegazione: R`"Razionale" indica l'assenza di radici con l'incognita; "fratta" significa che l'incognita compare anche a denominatore, il che introduce condizioni di esistenza.` },
    { id: 'q-05', domanda: R`Il dominio naturale di $y = \sqrt{x + 2}$ è…`, opzioni: [R`$x \ge -2$`, R`$x > -2$`, R`$x \le -2$`, R`$x \ne -2$`], corretta: 0, spiegazione: R`L'indice della radice è pari, quindi il radicando deve essere non negativo: $x + 2 \ge 0 \Rightarrow x \ge -2$.` },
    { id: 'q-06', domanda: R`Il dominio naturale di $y = \log(3 - x)$ è…`, opzioni: [R`$x \ne 3$`, R`$x > 3$`, R`$x < 3$`, R`$x \le 3$`], corretta: 2, spiegazione: R`L'argomento del logaritmo deve essere positivo: $3 - x > 0 \Rightarrow x < 3$.` },
    { id: 'q-07', domanda: R`Uno zero di una funzione $f$ è…`, opzioni: [R`un punto in cui il grafico ha un massimo`, R`un valore di $x$ in cui $f$ non è definita`, R`un intervallo in cui $f$ è crescente`, R`un valore di $x$ per cui $f(x) = 0$`], corretta: 3, spiegazione: R`Per definizione, uno zero (o radice) è un valore del dominio in cui la funzione vale zero: l'ascissa di un punto in cui il grafico incontra l'asse $x$.` },
    { id: 'q-08', domanda: R`Una funzione $f$ è iniettiva quando…`, opzioni: [R`l'immagine coincide con il codominio`, R`a valori distinti del dominio corrispondono sempre immagini distinte`, R`è crescente su tutto il dominio`, R`ogni $x$ ha almeno due immagini`], corretta: 1, spiegazione: R`L'iniettività riguarda il non ripetersi delle immagini: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$. La suriettività riguarda invece l'immagine coincidere col codominio.` },
    { id: 'q-09', domanda: R`Una funzione $f: A \to B$ è suriettiva quando…`, opzioni: [R`ogni elemento di $A$ ha una sola immagine`, R`è sempre anche iniettiva`, R`il suo grafico passa per l'origine`, R`l'immagine di $f$ coincide con l'intero codominio $B$`], corretta: 3, spiegazione: R`Suriettiva significa che nessun elemento del codominio resta "scoperto": ognuno è immagine di almeno un elemento del dominio.` },
    { id: 'q-10', domanda: R`Una funzione biunivoca è…`, opzioni: [R`solo iniettiva`, R`solo suriettiva`, R`sia iniettiva sia suriettiva`, R`né iniettiva né suriettiva`], corretta: 2, spiegazione: R`Biunivoca (o biiettiva) significa iniettiva e suriettiva insieme: è la condizione che permette di costruire la funzione inversa.` },
    { id: 'q-11', domanda: R`Una funzione $f$ è crescente in un intervallo $I$ se, per ogni $x_1, x_2 \in I$…`, opzioni: [R`$x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$`, R`$x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$`, R`$f(x_1) = f(x_2)$ sempre`, R`$x_1 = x_2 \Rightarrow f(x_1) = f(x_2)$`], corretta: 0, spiegazione: R`Crescente significa che a un $x$ maggiore corrisponde un $f(x)$ maggiore. La seconda opzione descrive invece una funzione decrescente.` },
    { id: 'q-12', domanda: R`Il grafico di una funzione pari è simmetrico rispetto…`, opzioni: [R`all'origine`, R`all'asse $y$`, R`all'asse $x$`, R`alla bisettrice $y=x$`], corretta: 1, spiegazione: R`Pari significa $f(-x) = f(x)$: i punti $(x, f(x))$ e $(-x, f(x))$ sono simmetrici rispetto all'asse $y$.` },
    { id: 'q-13', domanda: R`Una funzione dispari soddisfa la condizione…`, opzioni: [R`$f(-x) = -f(x)$`, R`$f(-x) = f(x)$`, R`$f(x) = -x$`, R`$f(0) = 0$ sempre e comunque`], corretta: 0, spiegazione: R`La condizione che definisce le funzioni dispari è $f(-x) = -f(x)$ per ogni $x$ del dominio; il grafico è simmetrico rispetto all'origine.` },
    { id: 'q-14', domanda: R`La funzione composta $(g \circ f)(x)$ si calcola…`, opzioni: [R`applicando prima $g$, poi $f$ al risultato`, R`moltiplicando $f(x)$ per $g(x)$`, R`applicando prima $f$, poi $g$ al risultato`, R`sommando $f(x)$ e $g(x)$`], corretta: 2, spiegazione: R`Nonostante si legga "g composto f", si esegue da destra a sinistra: prima $f$, poi $g$ sul risultato ottenuto.` },
    { id: 'q-15', domanda: R`Condizione necessaria perché una funzione ammetta inversa (sul suo dominio) è che sia…`, opzioni: [R`crescente`, R`pari`, R`periodica`, R`biunivoca`], corretta: 3, spiegazione: R`Solo una corrispondenza uno a uno fra dominio e codominio (biunivoca) può essere "disfatta" da una funzione inversa ben definita.` },
    { id: 'q-16', domanda: R`Il grafico della funzione inversa $f^{-1}$, rispetto al grafico di $f$, è…`, opzioni: [R`identico`, R`traslato di $1$ unità verso l'alto`, R`il simmetrico rispetto alla bisettrice $y = x$`, R`il simmetrico rispetto all'asse $x$`], corretta: 2, spiegazione: R`Scambiare $x$ e $y$ per trovare l'inversa corrisponde, graficamente, a riflettere il grafico rispetto alla retta $y = x$.` },
    { id: 'q-17', domanda: R`Il grafico di $y = |f(x)|$, rispetto a quello di $y = f(x)$…`, opzioni: [R`ha le parti sotto l'asse $x$ ribaltate sopra, il resto invariato`, R`è traslato verso l'alto di una unità`, R`è simmetrico rispetto all'asse $y$`, R`è identico a quello di $f$`], corretta: 0, spiegazione: R`Il valore assoluto rende positivo l'output: dove $f(x) < 0$ il grafico viene ribaltato sopra l'asse $x$; dove $f(x) \ge 0$ resta invariato.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Per il dominio naturale, elenca tutte le condizioni (denominatori, radicali, logaritmi) e mettile a sistema: il dominio è la loro **intersezione**, mai l'unione.` },
    { tipo: 'errore', testo: R`$|f(x)|$ e $f(|x|)$ non sono la stessa trasformazione: la prima agisce sul risultato (ribalta sopra l'asse $x$), la seconda sull'argomento (usa e specchia solo la parte con $x \ge 0$).` },
    { tipo: 'trucco', testo: R`Per stabilire se una funzione è pari o dispari, calcola $f(-x)$ e confrontalo sia con $f(x)$ sia con $-f(x)$: se non coincide con nessuno dei due, la funzione non è né pari né dispari (il caso più frequente).` },
    { tipo: 'errore', testo: R`Nella funzione composta $(g \circ f)(x)$ si applica prima $f$, poi $g$: leggila da destra a sinistra, non nell'ordine in cui è scritta.` },
    { tipo: 'metodo', testo: R`Per trovare l'inversa: scambia $x$ e $y$ in $y = f(x)$ e risolvi rispetto alla nuova $y$. Prima però controlla che $f$ sia biunivoca, altrimenti l'inversa non esiste.` },
    { tipo: 'trucco', testo: R`Il grafico di $f^{-1}$ si disegna "a specchio" rispetto alla bisettrice $y = x$, senza fare nessun calcolo: utile per un controllo veloce.` },
    { tipo: 'errore', testo: R`In $y = f(x - h)$ il grafico si sposta a **destra** se $h > 0$, non a sinistra: il segno è controintuitivo. Controlla dove si annulla l'argomento, $x - h = 0$.` },
    { tipo: 'trucco', testo: R`Per leggere dominio e immagine da un grafico, proietta la curva sull'asse $x$ (dominio) e sull'asse $y$ (immagine): sono due proiezioni su assi diversi.` },
    { tipo: 'metodo', testo: R`Il test della retta verticale dice se un grafico è una funzione; il test della retta orizzontale dice se quella funzione è iniettiva. Sono due controlli diversi.` }
  ],

  aneddoti: [
    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'La parola "funzione" compare per la prima volta', testo: R`Nel 1673, in un manoscritto sulle tangenti alle curve, Leibniz usò per primo la parola latina *functio* per indicare una quantità legata ai punti di una curva: la lunghezza della tangente, della sottotangente, del raggio di curvatura. Non era ancora il concetto moderno — pensava a curve geometriche, non a una corrispondenza fra numeri — ma il nome, e l'idea che valesse la pena dargli un nome, restarono. Leibniz discusse per anni, in lettere con Johann Bernoulli, come definire meglio il termine, e fu proprio in quella corrispondenza che la parola cominciò a indicare più in generale un'espressione costruita con una variabile.`, legame: R`È la prima comparsa storica della parola che dà il titolo a questo argomento: prima del 1673, semplicemente, non esisteva.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'La notazione $f(x)$', testo: R`Eulero fu il matematico più prolifico della storia (si stima abbia scritto più di ottocento lavori, molti dettati a memoria negli ultimi anni, quando era ormai completamente cieco). Nel 1734 introdusse, in un articolo per l'Accademia delle Scienze di San Pietroburgo, la notazione $f(x)$ per indicare "una funzione di $x$": prima di lui si scriveva a parole, o si usavano simboli diversi da autore ad autore. Eulero definì anche la funzione in modo più ampio dei suoi predecessori, come una qualunque "espressione analitica" costruita con una variabile, riunendo per la prima volta sotto lo stesso nome polinomi, radici, esponenziali e funzioni goniometriche.`, legame: R`La scrittura $f(x)$ che compare in ogni pagina di questo argomento è, alla lettera, un'invenzione di Eulero.` },
    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'La definizione che vale ancora oggi', testo: R`Nel 1837, studiando quando una serie di seni e coseni (le serie di Fourier) rappresenta davvero una funzione, Dirichlet si accorse che le definizioni precedenti erano troppo strette: legavano il concetto di funzione a un'unica formula o "espressione analitica". Propose allora la definizione che i libri di testo usano ancora oggi: $y$ è funzione di $x$ se ad ogni valore di $x$ in un certo insieme corrisponde uno ed un solo valore di $y$, **qualunque sia la legge** con cui questo valore è determinato — anche senza una formula, anche con regole diverse su parti diverse del dominio. Era, si racconta, un uomo di poche parole: alla nascita del suo primo figlio avrebbe telegrafato al suocero soltanto "$2 + 1 = 3$".`, legame: R`È esattamente la definizione con cui si apre questo argomento: una corrispondenza univoca, non necessariamente una formula.` },
    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'Una funzione impossibile da disegnare', testo: R`Per mostrare quanto fosse ampia la sua nuova definizione, Dirichlet costruì un esempio estremo: la funzione che vale $1$ se $x$ è razionale e $0$ se $x$ è irrazionale. È una funzione a tutti gli effetti — ad ogni $x$ corrisponde uno ed un solo valore — eppure non si può disegnare: fra due razionali, per quanto vicini, c'è sempre un irrazionale, e viceversa, quindi il grafico "salta" continuamente fra le altezze $0$ e $1$ senza che nessun tratto, per quanto piccolo, sia tracciabile con un tratto di penna continuo. Da allora si chiama, appunto, **funzione di Dirichlet**.`, legame: R`Ricorda che una funzione non deve avere per forza un grafico "bello" o tracciabile: bastano dominio, codominio e univocità, anche quando il test della retta verticale non si può nemmeno disegnare per intero.` }
  ]
});
})();
