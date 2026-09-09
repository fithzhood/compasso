(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'probabilita',
  titolo: 'Probabilità',

  introduzione: R`La probabilità è la matematica dell'incertezza: serve a dare un numero a frasi come «è probabile che piova», «questo test è affidabile», «conviene cambiare porta». Il numero sta sempre fra $0$ (impossibile) e $1$ (certo), e più ci si avvicina a $1$ più l'evento è atteso.

Nasce nel Seicento dai giochi d'azzardo, ma oggi è ovunque: un'assicurazione calcola il premio a partire dalla probabilità di un sinistro, un ospedale interpreta un esame sapendo quanti falsi positivi produce, un filtro antispam decide se un messaggio è pubblicità, una previsione meteo dichiara «70% di pioggia». In tutti questi casi non si sa che cosa succederà, ma si sa *quanto pesa* ciascuna possibilità.

Per seguire bene servono il calcolo combinatorio (permutazioni, disposizioni e soprattutto le combinazioni $\binom{n}{k}$, che contano i casi possibili) e le idee di frequenza assoluta e relativa viste in statistica. Serve anche una certa disciplina: in probabilità l'intuizione sbaglia spesso, e il conto va fatto.`,

  sezioni: [
    { id: 'spazio-campionario', titolo: 'Eventi e spazio campionario', testo: R`Un **esperimento aleatorio** è una prova il cui esito non è prevedibile con certezza, anche conoscendo le condizioni in cui avviene: il lancio di un dado, l'estrazione di una carta, il sesso di un nascituro.

>* Lo **spazio campionario** $U$ (detto anche universo; molti libri lo indicano con $\Omega$) è l'insieme di tutti i risultati possibili dell'esperimento. Un **evento** è un sottoinsieme di $U$.

Per il lancio di un dado, $U = \{1, 2, 3, 4, 5, 6\}$. L'evento «esce un numero pari» è il sottoinsieme $A = \{2, 4, 6\}$; l'evento «esce il $5$» è $\{5\}$, formato da un solo risultato e perciò detto **evento elementare**. Un evento con più di un elemento si dice **composto**.

Tre eventi hanno un nome proprio:

- l'**evento certo** è $U$ stesso: si verifica sempre («esce un numero minore di $7$»);
- l'**evento impossibile** è l'insieme vuoto $\emptyset$: non si verifica mai («esce $8$»);
- l'**evento contrario** (o complementare) di $A$, indicato con $\overline{A}$, si verifica esattamente quando $A$ non si verifica. Per $A = \{2, 4, 6\}$ si ha $\overline{A} = \{1, 3, 5\}$.

Poiché gli eventi sono insiemi, si combinano con le operazioni insiemistiche:

- $A \cup B$ («$A$ **oppure** $B$») si verifica se almeno uno dei due si verifica;
- $A \cap B$ («$A$ **e** $B$») si verifica se si verificano entrambi.

Con $A = \{2, 4, 6\}$ e $B = \{4, 5, 6\}$ («esce più di $3$») si ottiene $A \cup B = \{2, 4, 5, 6\}$ e $A \cap B = \{4, 6\}$.

Due eventi si dicono **incompatibili** (o disgiunti) se non possono verificarsi insieme, cioè se $A \cap B = \emptyset$: «esce pari» e «esce $3$» sono incompatibili, «esce pari» e «esce più di $3$» no.

>! In matematica la «o» è sempre **inclusiva**: $A \cup B$ si verifica anche quando accadono tutti e due. Se serve l'alternativa esclusiva bisogna dirlo, e si scrive con l'unione dei due eventi incompatibili $A \cap \overline{B}$ e $\overline{A} \cap B$.` },

    { id: 'definizione-classica', titolo: 'La definizione classica', testo: R`La definizione che si incontra per prima è quella data da Laplace nel 1812, che riprende le idee di Pascal e Fermat.

>* **Definizione classica.** Se i casi possibili sono in numero **finito** e **ugualmente possibili**, la probabilità di un evento $E$ è $$P(E) = \frac{\text{numero dei casi favorevoli a } E}{\text{numero dei casi possibili}}$$

«Casi favorevoli» non significa «casi buoni»: sono semplicemente i risultati che realizzano $E$.

Esempi. Con un dado regolare, $P(\text{pari}) = \dfrac{3}{6} = \dfrac{1}{2}$. Con due dadi lo spazio campionario ha $6 \cdot 6 = 36$ coppie ordinate, e la somma $7$ si ottiene con $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$: sei casi, quindi $P = \dfrac{6}{36} = \dfrac{1}{6}$.

Da questa definizione seguono subito tre fatti: $0 \le P(E) \le 1$, perché i casi favorevoli sono fra $0$ e tutti; $P(\emptyset) = 0$; $P(U) = 1$.

Il conteggio dei casi è quasi sempre un problema di **calcolo combinatorio**. Estraendo $2$ palline da un'urna che ne contiene $10$, i casi possibili sono $\binom{10}{2} = 45$.

>! La condizione «ugualmente possibili» è la più trascurata. Lanciando due monete, i risultati «zero teste», «una testa», «due teste» **non** sono equiprobabili: lo spazio corretto è $\{TT, TC, CT, CC\}$ e $P(\text{una testa}) = \dfrac{2}{4} = \dfrac{1}{2}$, non $\dfrac{1}{3}$. Fu proprio questo l'errore di d'Alembert nel Settecento.

La definizione classica ha due limiti seri. Non si applica quando i casi sono infiniti (dove cade una goccia su un bersaglio), e non si applica quando i casi non sono equiprobabili: per un dado truccato, o per la domanda «che probabilità c'è che domani piova», la formula non dice nulla. Servono altre definizioni.` },

    { id: 'altre-definizioni', titolo: 'Frequentista, soggettiva, assiomatica', testo: R`### La definizione frequentista

Se l'esperimento si può ripetere molte volte nelle stesse condizioni, si osserva che cosa succede davvero.

>* **Legge empirica del caso.** In un gran numero di prove ripetute, la frequenza relativa di un evento $$f = \frac{\text{numero delle prove in cui } E \text{ si verifica}}{\text{numero delle prove}}$$ si avvicina alla probabilità di $E$, e vi si avvicina tanto più quanto più le prove sono numerose.

Si assume allora $P(E) \approx f$. Buffon lanciò una moneta $4040$ volte ottenendo $2048$ teste ($f = 0{,}5069$); Pearson arrivò a $24\,000$ lanci con $12\,012$ teste ($f = 0{,}5005$). È l'unica strada per un dado truccato o per la probabilità che un neonato sia maschio (circa $0{,}515$, misurata sui registri anagrafici).

>! La legge empirica **non** dice che dopo dieci teste è «più probabile» croce: la moneta non ha memoria. È lo *scarto* fra frequenza e probabilità che diventa trascurabile rispetto al numero di prove, non che si compensa. Crederci è la *fallacia del giocatore*.

### La definizione soggettiva

Per eventi non ripetibili («la mia squadra vince domenica») si usa il **grado di fiducia** di una persona, misurato dal prezzo che è disposta a pagare per una scommessa che rende $1$ se l'evento si verifica e $0$ altrimenti. È l'impostazione dell'italiano Bruno de Finetti: la probabilità è soggettiva, ma non arbitraria, perché le valutazioni devono essere **coerenti**, cioè non devono permettere all'avversario di vincere comunque.

### Gli assiomi

Kolmogorov nel 1933 tagliò corto: non definì la probabilità, la caratterizzò con tre proprietà.

>* 1) $P(E) \ge 0$;  2) $P(U) = 1$;  3) se $A$ e $B$ sono incompatibili, $P(A \cup B) = P(A) + P(B)$.

Tutto il resto, contrario e unione compresi, si dimostra a partire da qui. Le tre definizioni precedenti diventano modi diversi di *assegnare* i numeri; le regole di calcolo sono le stesse per tutti.` },

    { id: 'contrario-unione', titolo: 'Evento contrario e unione', testo: R`### L'evento contrario

>* $$P(\overline{E}) = 1 - P(E)$$

Si ricava dagli assiomi: $E$ e $\overline{E}$ sono incompatibili e la loro unione è $U$, quindi $P(E) + P(\overline{E}) = 1$.

È la formula più utile di tutte, perché trasforma i problemi che contengono «**almeno**» in problemi con «nessuno», di solito molto più corti. Lanciando tre monete, l'evento «almeno una testa» si realizza in $7$ modi su $8$; ma è più rapido dire che il contrario è «nessuna testa», cioè il solo caso $CCC$: $$P(\text{almeno una testa}) = 1 - \frac{1}{8} = \frac{7}{8}.$$

### Unione di eventi incompatibili

Se $A \cap B = \emptyset$ i casi favorevoli si sommano senza sovrapporsi:
$$P(A \cup B) = P(A) + P(B).$$
Con un dado, $P(\text{esce } 1 \text{ o } 6) = \dfrac{1}{6} + \dfrac{1}{6} = \dfrac{1}{3}$.

### Unione di eventi compatibili

Se invece i due eventi possono verificarsi insieme, sommando le probabilità si conterebbero **due volte** i casi comuni. Bisogna toglierli una volta:

>* $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

Da un mazzo di $40$ carte napoletane si estrae una carta. $A$ = «è un asso» ha $4$ casi favorevoli, $B$ = «è di bastoni» ne ha $10$, e l'asso di bastoni sta in tutti e due:
$$P(A \cup B) = \frac{4}{40} + \frac{10}{40} - \frac{1}{40} = \frac{13}{40} = 0{,}325.$$

La formula per gli eventi incompatibili è il caso particolare in cui $P(A \cap B) = 0$: non serve impararne due.

>! Se il risultato di una somma di probabilità supera $1$, quasi sempre si è dimenticato di sottrarre l'intersezione. Una probabilità maggiore di $1$ è sempre un errore di calcolo.`
    }
    ,

    { id: 'condizionata', titolo: 'Probabilità condizionata', testo: R`Spesso arriva un'informazione parziale e la valutazione cambia. Sapere che il dado ha dato un numero pari cambia la probabilità che sia uscito il $2$.

>* La **probabilità condizionata** di $A$ dato $B$ (con $P(B) \ne 0$) è $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$ e si legge «probabilità di $A$ sapendo che si è verificato $B$».

L'idea è che $B$ diventa il nuovo spazio campionario: si contano solo i casi dentro $B$, e fra questi quelli che stanno anche in $A$. Nel lancio del dado, con $A = \{2\}$ e $B = \{2, 4, 6\}$:
$$P(A \mid B) = \frac{1/6}{1/2} = \frac{1}{3}.$$
Ed è giusto: sapendo che è uscito pari, i casi rimasti sono tre e uno solo è il $2$.

Moltiplicando in croce si ottiene la formula che serve nei problemi in più passi:

>* **Regola del prodotto:** $$P(A \cap B) = P(B) \cdot P(A \mid B)$$

Esempio. Un'urna contiene $5$ palline bianche e $3$ nere; se ne estraggono due **senza rimetterle dentro**. Qual è la probabilità che siano entrambe bianche? La prima è bianca con probabilità $\dfrac{5}{8}$; dopo averla tolta restano $7$ palline di cui $4$ bianche, quindi la seconda è bianca con probabilità $\dfrac{4}{7}$:
$$P = \frac{5}{8} \cdot \frac{4}{7} = \frac{20}{56} = \frac{5}{14} \approx 0{,}357.$$

>! $P(A \mid B)$ e $P(B \mid A)$ sono due numeri diversi, e scambiarli è l'errore più costoso di tutto il capitolo. La probabilità che un malato risulti positivo a un test è alta; la probabilità che un positivo sia malato può essere bassissima. Il denominatore cambia, e cambia tutto.` },

    { id: 'indipendenza', titolo: 'Eventi indipendenti', testo: R`A volte l'informazione non serve a niente: sapere che il primo lancio ha dato testa non dice nulla sul secondo.

>* $A$ e $B$ sono **indipendenti** se $P(A \mid B) = P(A)$, cioè, per la regola del prodotto, se $$P(A \cap B) = P(A) \cdot P(B)$$ Altrimenti sono **dipendenti**.

La seconda scrittura è quella da usare come verifica, perché è simmetrica in $A$ e $B$ e non richiede $P(B) \ne 0$.

Il caso tipico è l'estrazione **con rimessa** (o reimmissione): dall'urna con $5$ bianche e $3$ nere, rimettendo dentro la prima pallina, $P(\text{due bianche}) = \dfrac{5}{8} \cdot \dfrac{5}{8} = \dfrac{25}{64}$. Senza rimessa, come si è visto, viene $\dfrac{5}{14}$: le due estrazioni sono dipendenti.

Con $n$ prove indipendenti, ciascuna con probabilità di successo $p$, la probabilità di non riuscire mai è $(1-p)^n$, e quindi:

>* $$P(\text{almeno un successo in } n \text{ prove}) = 1 - (1-p)^n$$

Lanciando quattro volte un dado, la probabilità di ottenere almeno un $6$ è $1 - \left(\dfrac{5}{6}\right)^4 = 1 - \dfrac{625}{1296} = \dfrac{671}{1296} \approx 0{,}518$: poco più di una volta su due. È il conto che rese ricco il cavaliere de Méré.

Nel grafico qui sotto muovi $p$ e osserva come cresce la probabilità di «almeno un successo» su tre prove: sale molto in fretta per $p$ piccoli, poi si appiattisce vicino a $1$.

[[grafico:almenoUno]]

>! **Incompatibili** e **indipendenti** non sono sinonimi, anzi sono quasi opposti. Se $A$ e $B$ sono incompatibili e hanno probabilità non nulla, allora $P(A \cap B) = 0 \ne P(A)P(B)$: sapere che è accaduto $B$ esclude $A$, quindi sono fortemente **dipendenti**.` },

    { id: 'totale-bayes', titolo: 'Probabilità totale e teorema di Bayes', testo: R`Spesso un evento può prodursi per cause diverse. Siano $H_1, H_2, \dots, H_n$ eventi a due a due incompatibili la cui unione è tutto $U$ (una **partizione**, cioè un elenco completo di cause che si escludono a vicenda).

>* **Teorema della probabilità totale:** $$P(E) = \sum_{i=1}^{n} P(H_i) \cdot P(E \mid H_i)$$

Si costruisce un **diagramma ad albero**: ogni percorso dalla radice a una foglia ha per probabilità il prodotto delle probabilità che vi si incontrano, e le probabilità dei percorsi che portano a $E$ si sommano.

[[grafico:albero]]

Il teorema di Bayes percorre l'albero al contrario: si osserva l'effetto e si chiede da quale causa venga.

>* **Teorema di Bayes:** $$P(H_i \mid E) = \frac{P(H_i) \cdot P(E \mid H_i)}{P(E)}$$ dove $P(E)$ si calcola con la probabilità totale.

$P(H_i)$ si chiama probabilità *a priori* (prima di sapere), $P(H_i \mid E)$ probabilità *a posteriori* (dopo aver osservato).

**Il test medico.** Una malattia colpisce l'$1\%$ della popolazione. Il test è positivo sul $99\%$ dei malati e, per errore, anche sul $5\%$ dei sani. Una persona presa a caso risulta positiva: è malata?

Probabilità totale di essere positivi:
$$P(T^+) = 0{,}01 \cdot 0{,}99 + 0{,}99 \cdot 0{,}05 = 0{,}0099 + 0{,}0495 = 0{,}0594.$$
Bayes:
$$P(M \mid T^+) = \frac{0{,}0099}{0{,}0594} = \frac{1}{6} \approx 16{,}7\%.$$

>! Il risultato sembra assurdo, ma il conto è corretto: su $10\,000$ persone ci sono $99$ malati positivi e $495$ sani positivi. I sani sono così tanti che il loro $5\%$ di errori supera di gran lunga tutti i malati. È il motivo per cui uno screening positivo si ripete sempre con un secondo esame.` },

    { id: 'binomiale', titolo: 'Prove ripetute e distribuzione binomiale', testo: R`Uno **schema di Bernoulli** è una successione di $n$ prove che soddisfano tre condizioni: ogni prova ha due soli esiti (successo e insuccesso), la probabilità di successo $p$ è la stessa in ogni prova, le prove sono indipendenti.

Una particolare sequenza con $k$ successi e $n-k$ insuccessi ha probabilità $p^k (1-p)^{n-k}$, per la regola del prodotto. Ma le sequenze con $k$ successi sono tante quante le scelte dei posti occupati dai successi, cioè $\binom{n}{k}$.

>* **Formula di Bernoulli:** la probabilità di ottenere esattamente $k$ successi in $n$ prove è $$P(k) = \binom{n}{k}\, p^k (1-p)^{n-k}$$

Esempio: lanciando $5$ volte un dado, la probabilità di ottenere esattamente due volte il $6$ è
$$P(2) = \binom{5}{2}\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^3 = 10 \cdot \frac{1}{36} \cdot \frac{125}{216} = \frac{1250}{7776} \approx 0{,}161.$$

La macchina di Galton mette in scena tutto questo: ogni pallina compie $n$ scelte indipendenti fra destra e sinistra, e la colonna in cui cade conta i successi.

[[animazione:galton]]

Facendo variare $k$ da $0$ a $n$ si ottiene la **distribuzione binomiale**, i cui valori sommano a $1$. Con $p = 0{,}5$ è simmetrica, e i suoi valori sono la riga $n$ del triangolo di Pascal divisa per $2^n$:

[[grafico:binomiale5]]

Con $p$ diverso da $0{,}5$ la campana si sbilancia verso il lato meno probabile:

[[grafico:binomialeSbilanciata]]

>! $\binom{n}{k}$ non va dimenticato. Scrivere $P(2) = \left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^3$ dà la probabilità di **una** sequenza precisa (per esempio $6, 6$ e poi tre non-$6$), non quella di due successi in qualunque ordine.` },

    { id: 'valore-atteso-paradossi', titolo: 'Valore atteso, gioco equo e paradossi', testo: R`### Valore atteso

Se una grandezza $X$ assume i valori $x_1, \dots, x_n$ con probabilità $p_1, \dots, p_n$, il suo **valore atteso** (o speranza matematica) è
$$E(X) = \sum_{i=1}^{n} x_i\, p_i.$$
È la media dei valori pesata con le probabilità: il guadagno medio per partita che si otterrebbe giocando moltissime volte.

>* Un gioco è **equo** quando il guadagno atteso è nullo, cioè quando la posta pagata è uguale al valore atteso della vincita.

Alla roulette francese ci sono $37$ numeri; puntando $1$ euro su un numero secco si incassano $36$ euro se esce. Il valore atteso della vincita è $36 \cdot \dfrac{1}{37} = \dfrac{36}{37} \approx 0{,}973$ euro contro $1$ euro di posta: il gioco non è equo, e la perdita media è di circa $2{,}7$ centesimi per euro giocato. Il banco non bara: gli basta la matematica.

### Monty Hall

Tre porte, dietro una c'è l'auto. Il concorrente ne sceglie una; il conduttore, che sa dove sta l'auto, apre una delle altre due mostrando una capra e offre di cambiare. Conviene?

Sì. La porta scelta all'inizio vale $\dfrac{1}{3}$ e resta $\dfrac{1}{3}$, perché il conduttore avrebbe comunque potuto aprire una porta con la capra: la sua mossa non porta informazione su quella scelta. Le altre due valgono insieme $\dfrac{2}{3}$, e quel $\dfrac{2}{3}$ si concentra tutto sull'unica porta rimasta chiusa. Cambiando si vince in due casi su tre.

### Il compleanno

In un gruppo di $23$ persone la probabilità che almeno due compiano gli anni lo stesso giorno supera il $50\%$. Si calcola con l'evento contrario: tutti compleanni diversi ha probabilità $\dfrac{365}{365}\cdot\dfrac{364}{365}\cdots\dfrac{343}{365} \approx 0{,}493$.

[[grafico:compleanno]]

>* In entrambi i paradossi l'intuizione sbaglia per lo stesso motivo: si guarda una singola coppia o una singola porta, invece di contare tutti i casi.` }
  ],

  grafici: {
    almenoUno: {
      tipo: 'piano', x: [0, 1], y: [0, 1.15], passo: [0.1, 0.1],
      proporzioni: 'libere',
      etichette: { x: 'p', y: 'P' },
      funzioni: [{ f: '1 - (1 - x)^3', etichetta: 'y = 1 − (1 − p)³', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', '1 - (1 - p)^3'], etichetta: 'p = {{p}}', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [0.03, 1.08], testo: 'P(almeno un successo in 3 prove) = {{1 - (1 - p)^3}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'p', min: 0, max: 1, passo: 0.05, valore: 0.2, etichetta: 'p' }],
      didascalia: 'Con tre prove indipendenti di probabilità p, la probabilità di almeno un successo è 1 − (1 − p)³: già con p = 0,3 supera il 65%.'
    },
    albero: {
      tipo: 'piano', x: [-1, 9.5], y: [-3.6, 3.6], assi: false, griglia: false,
      proporzioni: 'libere',
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [3, 2] },
        { tipo: 'segmento', da: [0, 0], a: [3, -2] },
        { tipo: 'segmento', da: [3, 2], a: [6, 3] },
        { tipo: 'segmento', da: [3, 2], a: [6, 1] },
        { tipo: 'segmento', da: [3, -2], a: [6, -1] },
        { tipo: 'segmento', da: [3, -2], a: [6, -3] },
        { tipo: 'punto', p: [0, 0], etichetta: 'persona', posizione: 'sinistra' },
        { tipo: 'punto', p: [3, 2], etichetta: 'M', posizione: 'alto', colore: 2 },
        { tipo: 'punto', p: [3, -2], etichetta: 'S', posizione: 'basso', colore: 3 },
        { tipo: 'testo', p: [1.4, 1.5], testo: '0,01' },
        { tipo: 'testo', p: [1.4, -1.5], testo: '0,99' },
        { tipo: 'testo', p: [4.6, 2.9], testo: '0,99' },
        { tipo: 'testo', p: [4.6, 1.1], testo: '0,01' },
        { tipo: 'testo', p: [4.6, -1.1], testo: '0,05' },
        { tipo: 'testo', p: [4.6, -2.9], testo: '0,95' },
        { tipo: 'testo', p: [6.3, 3], testo: 'T⁺  →  0,0099', ancora: 'start' },
        { tipo: 'testo', p: [6.3, 1], testo: 'T⁻  →  0,0001', ancora: 'start' },
        { tipo: 'testo', p: [6.3, -1], testo: 'T⁺  →  0,0495', ancora: 'start' },
        { tipo: 'testo', p: [6.3, -3], testo: 'T⁻  →  0,9405', ancora: 'start' }
      ],
      didascalia: 'Albero del test medico: M = malato, S = sano, T⁺ = test positivo. I due rami che finiscono in T⁺ danno P(T⁺) = 0,0099 + 0,0495 = 0,0594.'
    },
    binomiale5: {
      tipo: 'barre',
      categorie: ['0', '1', '2', '3', '4', '5'],
      valori: [0.03125, 0.15625, 0.3125, 0.3125, 0.15625, 0.03125],
      etichettaX: 'numero k di successi', etichettaY: 'probabilità',
      didascalia: 'Distribuzione binomiale con n = 5 e p = 0,5: i valori sono 1/32, 5/32, 10/32, 10/32, 5/32, 1/32, cioè la riga 5 del triangolo di Pascal divisa per 32. La somma fa 1.'
    },
    binomialeSbilanciata: {
      tipo: 'barre',
      categorie: ['0', '1', '2', '3', '4', '5'],
      valori: [0.328, 0.410, 0.205, 0.051, 0.006, 0.000],
      etichettaX: 'numero k di successi', etichettaY: 'probabilità',
      didascalia: 'Distribuzione binomiale con n = 5 e p = 0,2: il massimo si sposta su k = 1 e la coda destra quasi sparisce (P(5) = 0,00032, arrotondato a 0,000).'
    },
    compleanno: {
      tipo: 'piano', x: [1, 60], y: [0, 1.15], passo: [5, 0.1],
      proporzioni: 'libere',
      etichette: { x: 'n', y: 'P' },
      funzioni: [{ f: '1 - exp(-x*(x - 1)/730)', etichetta: 'P(almeno due compleanni uguali)', colore: 1, dominio: [1, 60] }],
      elementi: [
        { tipo: 'segmento', da: [1, 0.5], a: [60, 0.5], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['n', '1 - exp(-n*(n - 1)/730)'], etichetta: 'n = {{n}}', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [4, 1.08], testo: 'P = {{1 - exp(-n*(n - 1)/730)}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'n', min: 1, max: 60, passo: 1, valore: 23, etichetta: 'n' }],
      didascalia: 'Formula approssimata del paradosso del compleanno: con n = 23 si taglia la linea del 50%, con n = 50 si è già oltre il 97%.'
    }
  },

  esempi: [
    { titolo: 'Somma di due dadi', problema: R`Si lanciano due dadi regolari. Qual è la probabilità che la somma dei punti sia $7$?`, passi: [
      R`Lo spazio campionario è fatto di **coppie ordinate**: il primo dado può dare $6$ risultati e per ciascuno il secondo ne può dare $6$, quindi i casi possibili sono $6 \cdot 6 = 36$, tutti equiprobabili.`,
      R`I casi favorevoli sono le coppie con somma $7$: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$. Sono $6$. Attenzione: $(1,6)$ e $(6,1)$ sono due casi distinti, perché i dadi sono distinguibili.`,
      R`Definizione classica: $P = \dfrac{6}{36} = \dfrac{1}{6} \approx 0{,}167$.`,
      R`Controllo di ragionevolezza: $7$ è la somma più frequente, e infatti $\dfrac{1}{6}$ è il valore più alto fra tutte le somme da $2$ a $12$.`
    ], risultato: R`$P = \dfrac{1}{6} \approx 0{,}167$` },

    { titolo: 'Unione di eventi compatibili', problema: R`Da un mazzo di $40$ carte napoletane si estrae una carta. Qual è la probabilità che sia una figura **oppure** una carta di coppe?`, passi: [
      R`Le figure sono $3$ per ciascuno dei $4$ semi (fante, cavallo, re): $P(F) = \dfrac{12}{40}$.`,
      R`Le carte di coppe sono $10$: $P(C) = \dfrac{10}{40}$.`,
      R`I due eventi sono **compatibili**: le figure di coppe sono $3$, quindi $P(F \cap C) = \dfrac{3}{40}$.`,
      R`$P(F \cup C) = \dfrac{12}{40} + \dfrac{10}{40} - \dfrac{3}{40} = \dfrac{19}{40} = 0{,}475$.`,
      R`Verifica per conteggio diretto: le carte favorevoli sono le $10$ di coppe più le $9$ figure degli altri tre semi, cioè $19$. ✓`
    ], risultato: R`$P = \dfrac{19}{40} = 0{,}475$` },

    { titolo: 'Almeno uno: si passa al contrario', problema: R`Si lancia un dado $4$ volte. Qual è la probabilità di ottenere almeno un $6$?`, passi: [
      R`Contare direttamente «almeno un $6$» richiederebbe di sommare i casi con uno, due, tre o quattro $6$: lungo. Si passa all'evento **contrario**, «nessun $6$».`,
      R`I quattro lanci sono indipendenti e in ciascuno la probabilità di non fare $6$ è $\dfrac{5}{6}$, quindi $P(\text{nessun } 6) = \left(\dfrac{5}{6}\right)^4 = \dfrac{625}{1296}$.`,
      R`$P(\text{almeno un } 6) = 1 - \dfrac{625}{1296} = \dfrac{671}{1296} \approx 0{,}518$.`,
      R`Poco più di $\dfrac{1}{2}$: scommettere su questo evento è leggermente vantaggioso. Il cavaliere de Méré ci guadagnava, ed è da qui che parte la storia della probabilità.`
    ], risultato: R`$P = \dfrac{671}{1296} \approx 0{,}518$` },

    { titolo: 'Estrazioni senza rimessa', problema: R`Un'urna contiene $4$ palline rosse e $6$ blu. Si estraggono due palline **senza** rimetterle dentro. Qual è la probabilità che siano di colore diverso?`, passi: [
      R`«Colore diverso» si realizza in due modi incompatibili: prima rossa e poi blu, oppure prima blu e poi rossa. Le probabilità si sommano.`,
      R`Rossa e poi blu: $P = \dfrac{4}{10} \cdot \dfrac{6}{9}$, perché dopo la prima estrazione restano $9$ palline di cui $6$ blu. Vale $\dfrac{24}{90}$.`,
      R`Blu e poi rossa: $P = \dfrac{6}{10} \cdot \dfrac{4}{9} = \dfrac{24}{90}$.`,
      R`Totale: $\dfrac{24}{90} + \dfrac{24}{90} = \dfrac{48}{90} = \dfrac{8}{15} \approx 0{,}533$.`,
      R`Controllo con le combinazioni: casi possibili $\binom{10}{2} = 45$, favorevoli $4 \cdot 6 = 24$, e $\dfrac{24}{45} = \dfrac{8}{15}$. ✓`
    ], risultato: R`$P = \dfrac{8}{15} \approx 0{,}533$` },

    { titolo: 'Bayes: quanto vale un test positivo', problema: R`Una malattia colpisce l'$1\%$ della popolazione. Un test risulta positivo sul $99\%$ dei malati e sul $5\%$ dei sani. Una persona scelta a caso risulta positiva: qual è la probabilità che sia malata?`, passi: [
      R`Le due cause possibili sono $M$ (malato) e $S$ (sano), con $P(M) = 0{,}01$ e $P(S) = 0{,}99$: formano una partizione.`,
      R`Dati del test: $P(T^+ \mid M) = 0{,}99$ e $P(T^+ \mid S) = 0{,}05$.`,
      R`Probabilità totale: $P(T^+) = 0{,}01 \cdot 0{,}99 + 0{,}99 \cdot 0{,}05 = 0{,}0099 + 0{,}0495 = 0{,}0594$.`,
      R`Bayes: $P(M \mid T^+) = \dfrac{0{,}0099}{0{,}0594} = \dfrac{1}{6} \approx 0{,}167$.`,
      R`Lettura con i numeri interi: su $10\,000$ persone, $99$ sono malate e positive, $495$ sono sane e positive. Fra i $594$ positivi i malati sono $99$, cioè uno su sei.`
    ], risultato: R`$P(M \mid T^+) = \dfrac{1}{6} \approx 16{,}7\%$` },

    { titolo: 'Formula di Bernoulli', problema: R`Una macchina produce pezzi difettosi con probabilità $0{,}1$, indipendentemente l'uno dall'altro. Su $6$ pezzi, qual è la probabilità che ce ne sia esattamente uno difettoso? E che ce ne sia al più uno?`, passi: [
      R`Siamo in uno schema di Bernoulli: $n = 6$, successo = «pezzo difettoso», $p = 0{,}1$, prove indipendenti.`,
      R`$P(1) = \binom{6}{1}(0{,}1)^1(0{,}9)^5 = 6 \cdot 0{,}1 \cdot 0{,}59049 = 0{,}354294$.`,
      R`«Al più uno» significa nessuno oppure uno, due eventi incompatibili: si sommano. $P(0) = \binom{6}{0}(0{,}9)^6 = 0{,}531441$.`,
      R`$P(\text{al più uno}) = 0{,}531441 + 0{,}354294 = 0{,}885735 \approx 0{,}886$.`,
      R`Nota: $P(0)$ e $P(1)$ da sole coprono già l'$88{,}6\%$ dei casi, perché con $p$ piccolo la distribuzione è schiacciata sui valori bassi di $k$.`
    ], risultato: R`$P(1) \approx 0{,}354$ e $P(\text{al più uno}) \approx 0{,}886$` }
  ]
  ,

  formulario: [
    { nome: 'Definizione classica', formula: R`P(E) = \frac{\text{casi favorevoli}}{\text{casi possibili}}`, nota: R`Vale solo se i casi possibili sono in numero finito e ugualmente possibili.` },
    { nome: 'Frequenza relativa', formula: R`f = \frac{\text{prove in cui } E \text{ si verifica}}{\text{numero delle prove}}`, nota: R`Legge empirica del caso: per un gran numero di prove $f \approx P(E)$.` },
    { nome: 'Assiomi di Kolmogorov', formula: R`P(E) \ge 0, \quad P(U) = 1, \quad P(A \cup B) = P(A) + P(B) \ \text{ se } A \cap B = \emptyset`, nota: R`Da qui segue $0 \le P(E) \le 1$ e $P(\emptyset) = 0$.` },
    { nome: 'Evento contrario', formula: R`P(\overline{E}) = 1 - P(E)`, nota: R`La via più corta per i problemi con «almeno uno».` },
    { nome: 'Unione di eventi incompatibili', formula: R`P(A \cup B) = P(A) + P(B)`, nota: R`Solo se $A \cap B = \emptyset$.` },
    { nome: 'Unione di eventi qualsiasi', formula: R`P(A \cup B) = P(A) + P(B) - P(A \cap B)` },
    { nome: 'Probabilità condizionata', formula: R`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`, nota: R`Richiede $P(B) \ne 0$.` },
    { nome: 'Regola del prodotto', formula: R`P(A \cap B) = P(B) \cdot P(A \mid B)`, nota: R`Vale sempre; è la formula dei problemi in più passi (estrazioni senza rimessa).` },
    { nome: 'Eventi indipendenti', formula: R`P(A \cap B) = P(A) \cdot P(B)`, nota: R`Equivale a $P(A \mid B) = P(A)$.` },
    { nome: 'Almeno un successo', formula: R`P = 1 - (1 - p)^n`, nota: R`Con $n$ prove indipendenti di probabilità $p$ ciascuna.` },
    { nome: 'Probabilità totale', formula: R`P(E) = \sum_{i=1}^{n} P(H_i)\, P(E \mid H_i)`, nota: R`Gli $H_i$ devono essere incompatibili e coprire tutto $U$.` },
    { nome: 'Teorema di Bayes', formula: R`P(H_i \mid E) = \frac{P(H_i)\, P(E \mid H_i)}{P(E)}` },
    { nome: 'Formula di Bernoulli', formula: R`P(k) = \binom{n}{k}\, p^k (1-p)^{n-k}`, nota: R`$k$ successi in $n$ prove indipendenti con $p$ costante.` },
    { nome: 'Valore atteso', formula: R`E(X) = \sum_{i=1}^{n} x_i\, p_i`, nota: R`Il gioco è equo se il guadagno atteso è nullo.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Spazio campionario`, retro: R`L'insieme $U$ di tutti i risultati possibili di un esperimento aleatorio.` },
    { id: 'fc-02', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Evento`, retro: R`Un sottoinsieme dello spazio campionario. È **elementare** se contiene un solo risultato.` },
    { id: 'fc-03', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Evento certo ed evento impossibile`, retro: R`Certo: $U$, probabilità $1$. Impossibile: $\emptyset$, probabilità $0$.` },
    { id: 'fc-04', sezione: 'spazio-campionario', tipo: 'definizione', fronte: R`Eventi incompatibili`, retro: R`Due eventi con $A \cap B = \emptyset$: non possono verificarsi insieme.` },
    { id: 'fc-05', sezione: 'definizione-classica', tipo: 'formula', fronte: R`Definizione classica di probabilità`, retro: R`$P(E) = \dfrac{\text{casi favorevoli}}{\text{casi possibili}}$, con i casi finiti e ugualmente possibili.` },
    { id: 'fc-06', sezione: 'definizione-classica', tipo: 'concetto', fronte: R`Quali sono i limiti della definizione classica?`, retro: R`Non si applica se i casi sono infiniti né se non sono equiprobabili (dado truccato, eventi non ripetibili).` },
    { id: 'fc-07', sezione: 'altre-definizioni', tipo: 'concetto', fronte: R`Legge empirica del caso`, retro: R`In un gran numero di prove la frequenza relativa di un evento si avvicina alla sua probabilità.` },
    { id: 'fc-08', sezione: 'altre-definizioni', tipo: 'concetto', fronte: R`Definizione soggettiva`, retro: R`La probabilità è il grado di fiducia di una persona, misurato dal prezzo che pagherebbe per una scommessa che rende $1$ se l'evento accade.` },
    { id: 'fc-09', sezione: 'altre-definizioni', tipo: 'definizione', fronte: R`Gli assiomi di Kolmogorov`, retro: R`$P(E) \ge 0$; $P(U) = 1$; se $A \cap B = \emptyset$ allora $P(A \cup B) = P(A) + P(B)$.` },
    { id: 'fc-10', sezione: 'contrario-unione', tipo: 'formula', fronte: R`Probabilità dell'evento contrario`, retro: R`$P(\overline{E}) = 1 - P(E)$` },
    { id: 'fc-11', sezione: 'contrario-unione', tipo: 'procedura', fronte: R`Come si affronta un problema con «almeno uno»?`, retro: R`Si calcola la probabilità dell'evento contrario, «nessuno», e si sottrae da $1$.` },
    { id: 'fc-12', sezione: 'contrario-unione', tipo: 'formula', fronte: R`Probabilità dell'unione di due eventi qualsiasi`, retro: R`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$` },
    { id: 'fc-13', sezione: 'contrario-unione', tipo: 'formula', fronte: R`Unione di due eventi incompatibili`, retro: R`$P(A \cup B) = P(A) + P(B)$, perché $P(A \cap B) = 0$.` },
    { id: 'fc-14', sezione: 'condizionata', tipo: 'formula', fronte: R`Probabilità condizionata`, retro: R`$P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$, con $P(B) \ne 0$.` },
    { id: 'fc-15', sezione: 'condizionata', tipo: 'concetto', fronte: R`Che cosa cambia in $P(A \mid B)$ rispetto a $P(A)$?`, retro: R`Lo spazio campionario si restringe a $B$: si contano solo i casi dentro $B$.` },
    { id: 'fc-16', sezione: 'condizionata', tipo: 'formula', fronte: R`Regola del prodotto`, retro: R`$P(A \cap B) = P(B) \cdot P(A \mid B)$. Vale sempre, anche per eventi dipendenti.` },
    { id: 'fc-17', sezione: 'indipendenza', tipo: 'definizione', fronte: R`Eventi indipendenti`, retro: R`$P(A \cap B) = P(A) \cdot P(B)$, cioè $P(A \mid B) = P(A)$: sapere che $B$ è accaduto non cambia nulla.` },
    { id: 'fc-18', sezione: 'indipendenza', tipo: 'concetto', fronte: R`Incompatibili e indipendenti sono la stessa cosa?`, retro: R`No: due eventi incompatibili di probabilità non nulla sono **dipendenti**, perché se accade uno l'altro è escluso.` },
    { id: 'fc-19', sezione: 'indipendenza', tipo: 'formula', fronte: R`Almeno un successo in $n$ prove indipendenti`, retro: R`$P = 1 - (1-p)^n$` },
    { id: 'fc-20', sezione: 'totale-bayes', tipo: 'formula', fronte: R`Teorema della probabilità totale`, retro: R`$P(E) = \sum_i P(H_i)\,P(E \mid H_i)$, con gli $H_i$ incompatibili e che coprono tutto $U$.` },
    { id: 'fc-21', sezione: 'totale-bayes', tipo: 'formula', fronte: R`Teorema di Bayes`, retro: R`$P(H_i \mid E) = \dfrac{P(H_i)\,P(E \mid H_i)}{P(E)}$` },
    { id: 'fc-22', sezione: 'totale-bayes', tipo: 'concetto', fronte: R`Perché un test positivo per una malattia rara dice poco?`, retro: R`Perché i sani sono molti di più: i loro falsi positivi superano i veri positivi dei malati.` },
    { id: 'fc-23', sezione: 'binomiale', tipo: 'definizione', fronte: R`Schema di Bernoulli`, retro: R`$n$ prove indipendenti, ognuna con due soli esiti e con la stessa probabilità di successo $p$.` },
    { id: 'fc-24', sezione: 'binomiale', tipo: 'formula', fronte: R`Formula di Bernoulli`, retro: R`$P(k) = \dbinom{n}{k} p^k (1-p)^{n-k}$: esattamente $k$ successi su $n$ prove.` },
    { id: 'fc-25', sezione: 'valore-atteso-paradossi', tipo: 'formula', fronte: R`Valore atteso`, retro: R`$E(X) = \sum_i x_i p_i$: la media dei valori pesata con le probabilità.` },
    { id: 'fc-26', sezione: 'valore-atteso-paradossi', tipo: 'concetto', fronte: R`Quando un gioco è equo?`, retro: R`Quando il guadagno atteso è nullo, cioè quando la posta è uguale al valore atteso della vincita.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Si lancia un dado regolare. Qual è la probabilità che esca un numero pari? (come frazione o decimale)`, suggerimenti: [R`Elenca lo spazio campionario e conta i casi favorevoli.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`Casi possibili: $6$, tutti equiprobabili.`, R`Casi favorevoli: $\{2, 4, 6\}$, cioè $3$.`, R`$P = \dfrac{3}{6} = \dfrac{1}{2} = 0{,}5$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Un'urna contiene $5$ palline rosse, $4$ verdi e $3$ gialle. Si estrae una pallina: qual è la probabilità che **non** sia gialla? (come frazione o decimale)`, suggerimenti: [R`Conviene passare all'evento contrario.`, R`$P(\text{gialla}) = \dfrac{3}{12}$.`], risposta: { tipo: 'numero', valore: 0.75, tolleranza: 0.01 }, soluzione: [R`Le palline sono in tutto $5 + 4 + 3 = 12$.`, R`$P(\text{gialla}) = \dfrac{3}{12} = \dfrac{1}{4}$.`, R`$P(\text{non gialla}) = 1 - \dfrac{1}{4} = \dfrac{3}{4} = 0{,}75$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Da un mazzo di $40$ carte napoletane si estrae una carta. Qual è la probabilità che sia un asso oppure una carta di spade? (come frazione o decimale)`, suggerimenti: [R`I due eventi sono compatibili: c'è una carta che appartiene a entrambi.`, R`Usa $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ e ricorda l'asso di spade.`], risposta: { tipo: 'numero', valore: 0.325, tolleranza: 0.01 }, soluzione: [R`Assi: $4$, quindi $P(A) = \dfrac{4}{40}$. Carte di spade: $10$, quindi $P(S) = \dfrac{10}{40}$.`, R`L'asso di spade sta in entrambi: $P(A \cap S) = \dfrac{1}{40}$.`, R`$P(A \cup S) = \dfrac{4 + 10 - 1}{40} = \dfrac{13}{40} = 0{,}325$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Si lanciano due dadi regolari. Qual è la probabilità che la somma sia $9$? (come frazione o decimale)`, suggerimenti: [R`I casi possibili sono $36$ coppie ordinate.`, R`Elenca le coppie: $(3,6), (4,5), \dots$`], risposta: { tipo: 'numero', valore: 0.1111, tolleranza: 0.01 }, soluzione: [R`Casi possibili: $6 \cdot 6 = 36$.`, R`Coppie con somma $9$: $(3,6), (4,5), (5,4), (6,3)$, cioè $4$.`, R`$P = \dfrac{4}{36} = \dfrac{1}{9} \approx 0{,}111$.`] },

    { id: 'es-05', difficolta: 2, testo: R`Si lancia una moneta $4$ volte. Qual è la probabilità di ottenere almeno una croce? (come frazione o decimale)`, suggerimenti: [R`«Almeno una» chiede l'evento contrario.`, R`Il contrario è «tutte teste»: quanto vale la sua probabilità?`], risposta: { tipo: 'numero', valore: 0.9375, tolleranza: 0.01 }, soluzione: [R`Evento contrario: «nessuna croce», cioè quattro teste.`, R`I lanci sono indipendenti: $P(TTTT) = \left(\dfrac{1}{2}\right)^4 = \dfrac{1}{16}$.`, R`$P(\text{almeno una croce}) = 1 - \dfrac{1}{16} = \dfrac{15}{16} = 0{,}9375$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Un'urna contiene $6$ palline bianche e $4$ nere. Si estraggono due palline **senza** rimetterle dentro. Qual è la probabilità che siano entrambe nere? (come frazione o decimale)`, suggerimenti: [R`Le due estrazioni non sono indipendenti: usa la regola del prodotto con la probabilità condizionata.`, R`Dopo la prima nera restano $9$ palline di cui $3$ nere.`], risposta: { tipo: 'numero', valore: 0.1333, tolleranza: 0.01 }, soluzione: [R`Prima nera: $P = \dfrac{4}{10}$.`, R`Seconda nera sapendo che la prima lo era: $P = \dfrac{3}{9}$.`, R`$P(\text{entrambe nere}) = \dfrac{4}{10} \cdot \dfrac{3}{9} = \dfrac{12}{90} = \dfrac{2}{15} \approx 0{,}133$.`] },

    { id: 'es-07', difficolta: 2, testo: R`In una scuola il $30\%$ degli studenti gioca a calcio, il $20\%$ a pallavolo e il $10\%$ a entrambi. Scelto a caso uno studente che gioca a calcio, qual è la probabilità che giochi anche a pallavolo? (come frazione o decimale)`, suggerimenti: [R`Ti stanno chiedendo una probabilità condizionata.`, R`$P(V \mid C) = \dfrac{P(V \cap C)}{P(C)}$.`], risposta: { tipo: 'numero', valore: 0.3333, tolleranza: 0.01 }, soluzione: [R`$P(C) = 0{,}30$, $P(V) = 0{,}20$, $P(V \cap C) = 0{,}10$.`, R`$P(V \mid C) = \dfrac{0{,}10}{0{,}30} = \dfrac{1}{3} \approx 0{,}333$.`, R`Il valore di $P(V)$ da solo non serviva: lo spazio si è ristretto a chi gioca a calcio.`] },

    { id: 'es-08', difficolta: 2, testo: R`Due tiratori sparano indipendentemente a un bersaglio: il primo lo colpisce con probabilità $0{,}7$, il secondo con probabilità $0{,}6$. Qual è la probabilità che il bersaglio venga colpito almeno una volta? (come frazione o decimale)`, suggerimenti: [R`Contrario: nessuno dei due colpisce.`, R`I due eventi sono indipendenti, quindi le probabilità di mancare si moltiplicano.`], risposta: { tipo: 'numero', valore: 0.88, tolleranza: 0.01 }, soluzione: [R`Il primo manca con probabilità $0{,}3$, il secondo con $0{,}4$.`, R`Per indipendenza, $P(\text{nessuno colpisce}) = 0{,}3 \cdot 0{,}4 = 0{,}12$.`, R`$P(\text{almeno uno}) = 1 - 0{,}12 = 0{,}88$.`, R`Sommare $0{,}7 + 0{,}6 = 1{,}3$ sarebbe assurdo: una probabilità non supera mai $1$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Si lancia un dado $6$ volte. Qual è la probabilità di ottenere esattamente due volte il numero $6$? (come frazione o decimale)`, suggerimenti: [R`È uno schema di Bernoulli con $n = 6$ e $p = \dfrac{1}{6}$.`, R`Non dimenticare il coefficiente $\dbinom{6}{2}$.`], risposta: { tipo: 'numero', valore: 0.2009, tolleranza: 0.01 }, soluzione: [R`$P(2) = \dbinom{6}{2}\left(\dfrac{1}{6}\right)^2\left(\dfrac{5}{6}\right)^4$.`, R`$\dbinom{6}{2} = 15$ e $\left(\dfrac{5}{6}\right)^4 = \dfrac{625}{1296}$.`, R`$P(2) = 15 \cdot \dfrac{1}{36} \cdot \dfrac{625}{1296} = \dfrac{9375}{46656} \approx 0{,}201$.`] },

    { id: 'es-10', difficolta: 3, testo: R`L'urna $A$ contiene $3$ palline bianche e $7$ nere; l'urna $B$ contiene $6$ bianche e $4$ nere. Si sceglie a caso un'urna (con la stessa probabilità) e si estrae una pallina, che risulta bianca. Qual è la probabilità che provenga dall'urna $B$? (come frazione o decimale)`, suggerimenti: [R`Disegna l'albero: primo livello la scelta dell'urna, secondo livello il colore.`, R`Calcola prima $P(\text{bianca})$ con la probabilità totale.`, R`Poi applica Bayes: $P(B \mid \text{bianca}) = \dfrac{P(B)\,P(\text{bianca} \mid B)}{P(\text{bianca})}$.`], risposta: { tipo: 'numero', valore: 0.6667, tolleranza: 0.01 }, soluzione: [R`$P(A) = P(B) = 0{,}5$; $P(\text{bianca} \mid A) = 0{,}3$ e $P(\text{bianca} \mid B) = 0{,}6$.`, R`Probabilità totale: $P(\text{bianca}) = 0{,}5 \cdot 0{,}3 + 0{,}5 \cdot 0{,}6 = 0{,}15 + 0{,}30 = 0{,}45$.`, R`Bayes: $P(B \mid \text{bianca}) = \dfrac{0{,}30}{0{,}45} = \dfrac{2}{3} \approx 0{,}667$.`, R`Ha senso: l'urna $B$ ha il doppio delle palline bianche, quindi una bianca «accusa» $B$ con probabilità doppia rispetto ad $A$.`] },

    { id: 'es-11', difficolta: 3, testo: R`In un gioco si lanciano due dadi: si vincono $20$ euro se la somma è $7$, niente altrimenti. Quale posta rende il gioco equo? (rispondi in euro, come frazione o decimale)`, suggerimenti: [R`Calcola il valore atteso della vincita.`, R`$P(\text{somma } 7) = \dfrac{1}{6}$.`], risposta: { tipo: 'numero', valore: 3.3333, tolleranza: 0.02 }, soluzione: [R`$P(\text{somma } 7) = \dfrac{6}{36} = \dfrac{1}{6}$.`, R`Valore atteso della vincita: $E = 20 \cdot \dfrac{1}{6} + 0 \cdot \dfrac{5}{6} = \dfrac{20}{6} = \dfrac{10}{3}$ euro.`, R`Il gioco è equo se la posta vale quanto il valore atteso: circa $3{,}33$ euro. Con una posta di $5$ euro il giocatore perderebbe in media $1{,}67$ euro a partita.`] },

    { id: 'es-12', difficolta: 3, testo: R`In un gruppo di $4$ persone, qual è la probabilità che almeno due siano nate nello stesso giorno della settimana? (come frazione o decimale)`, suggerimenti: [R`È il paradosso del compleanno con $7$ giorni invece di $365$.`, R`Passa al contrario: tutte e quattro nate in giorni diversi.`, R`I casi possibili sono $7^4$; quelli con giorni tutti diversi sono $7 \cdot 6 \cdot 5 \cdot 4$.`], risposta: { tipo: 'numero', valore: 0.65, tolleranza: 0.01 }, soluzione: [R`Casi possibili: ogni persona può essere nata in $7$ giorni, quindi $7^4 = 2401$.`, R`Casi con tutti i giorni diversi: $7 \cdot 6 \cdot 5 \cdot 4 = 840$.`, R`$P(\text{tutti diversi}) = \dfrac{840}{2401} \approx 0{,}350$.`, R`$P(\text{almeno due uguali}) = 1 - \dfrac{840}{2401} = \dfrac{1561}{2401} \approx 0{,}650$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cos'è lo spazio campionario di un esperimento aleatorio?`, opzioni: [R`L'insieme dei risultati che ci interessano`, R`L'insieme di tutti i risultati possibili`, R`L'insieme dei risultati più probabili`, R`Il numero dei casi favorevoli`], corretta: 1, spiegazione: R`Lo spazio campionario $U$ contiene **tutti** i risultati possibili, non solo quelli che ci interessano: quelli formano un evento, cioè un suo sottoinsieme.` },
    { id: 'q-02', domanda: R`Quanto vale la probabilità dell'evento impossibile?`, opzioni: [R`$1$`, R`$-1$`, R`$0$`, R`Dipende dall'esperimento`], corretta: 2, spiegazione: R`L'evento impossibile è $\emptyset$: non ha casi favorevoli, quindi $P(\emptyset) = 0$. L'evento certo è $U$ e ha probabilità $1$; una probabilità non è mai negativa.` },
    { id: 'q-03', domanda: R`Se $P(E) = 0{,}3$, quanto vale $P(\overline{E})$?`, opzioni: [R`$0{,}7$`, R`$0{,}3$`, R`$-0{,}3$`, R`$1{,}3$`], corretta: 0, spiegazione: R`$P(\overline{E}) = 1 - P(E) = 1 - 0{,}3 = 0{,}7$. L'evento e il suo contrario si escludono e coprono tutto $U$, quindi le loro probabilità sommano a $1$.` },
    { id: 'q-04', domanda: R`Due eventi $A$ e $B$ si dicono incompatibili quando…`, opzioni: [R`$P(A) = P(B)$`, R`$P(A \cap B) = P(A) \cdot P(B)$`, R`$A \cup B = U$`, R`$A \cap B = \emptyset$`], corretta: 3, spiegazione: R`Incompatibili significa che non possono verificarsi insieme: la loro intersezione è vuota. La condizione $P(A \cap B) = P(A)P(B)$ è invece l'**indipendenza**, che è tutt'altro.` },
    { id: 'q-05', domanda: R`Per due eventi qualsiasi, $P(A \cup B)$ è uguale a…`, opzioni: [R`$P(A) + P(B)$`, R`$P(A) + P(B) - P(A \cap B)$`, R`$P(A) \cdot P(B)$`, R`$P(A) + P(B) + P(A \cap B)$`], corretta: 1, spiegazione: R`I casi comuni verrebbero contati due volte, quindi si sottrae $P(A \cap B)$. La formula $P(A) + P(B)$ vale solo se gli eventi sono incompatibili, cioè quando quel termine è nullo.` },
    { id: 'q-06', domanda: R`La definizione classica di probabilità richiede che…`, opzioni: [R`l'esperimento sia ripetibile molte volte`, R`i casi possibili siano finiti e ugualmente possibili`, R`gli eventi siano indipendenti`, R`la probabilità sia già nota per frequenza`], corretta: 1, spiegazione: R`Il rapporto «favorevoli su possibili» ha senso solo se i casi sono in numero finito e hanno tutti lo stesso peso. La ripetibilità serve invece alla definizione frequentista.` },
    { id: 'q-07', domanda: R`Che cosa afferma la legge empirica del caso?`, opzioni: [R`Dopo molte teste diventa più probabile croce`, R`La frequenza relativa, su molte prove, si avvicina alla probabilità`, R`Ogni evento ha probabilità $\dfrac{1}{2}$ se non si sa nulla`, R`La probabilità di un evento cambia con il numero di prove`], corretta: 1, spiegazione: R`È il legame fra dati osservati e probabilità teorica. La prima opzione è la *fallacia del giocatore*: la moneta non ha memoria e la probabilità di ogni singolo lancio resta $\dfrac{1}{2}$.` },
    { id: 'q-08', domanda: R`La formula $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$ ha senso…`, opzioni: [R`sempre`, R`solo se $A$ e $B$ sono indipendenti`, R`solo se $P(B) \ne 0$`, R`solo se $A \subseteq B$`], corretta: 2, spiegazione: R`Il denominatore non può essere nullo: non ha senso condizionare a un evento impossibile. L'indipendenza non è richiesta, anzi la formula serve soprattutto quando manca.` },
    { id: 'q-09', domanda: R`Quale uguaglianza caratterizza due eventi indipendenti?`, opzioni: [R`$P(A \cap B) = P(A) \cdot P(B)$`, R`$P(A \cup B) = P(A) + P(B)$`, R`$P(A \cap B) = 0$`, R`$P(A) + P(B) = 1$`], corretta: 0, spiegazione: R`Indipendenza significa $P(A \mid B) = P(A)$, che per la regola del prodotto equivale a $P(A \cap B) = P(A)P(B)$. Le altre due uguaglianze riguardano eventi incompatibili o contrari.` },
    { id: 'q-10', domanda: R`Due eventi incompatibili, entrambi con probabilità non nulla, sono anche indipendenti?`, opzioni: [R`Sì, sempre`, R`No: sono fortemente dipendenti`, R`Solo se hanno la stessa probabilità`, R`Solo se la loro unione è $U$`], corretta: 1, spiegazione: R`Se $A$ e $B$ sono incompatibili, sapere che è accaduto $B$ rende $A$ impossibile: $P(A \mid B) = 0 \ne P(A)$. Quindi sono dipendenti, e in effetti $P(A \cap B) = 0 \ne P(A)P(B)$.` },
    { id: 'q-11', domanda: R`Nel teorema di Bayes, che cosa sta al denominatore?`, opzioni: [R`La probabilità a priori $P(H)$`, R`La probabilità condizionata $P(E \mid H)$`, R`Il numero dei casi possibili`, R`La probabilità totale $P(E)$ dell'evento osservato`], corretta: 3, spiegazione: R`$P(H \mid E) = \dfrac{P(H)P(E \mid H)}{P(E)}$, e $P(E)$ si ottiene sommando i contributi di tutte le cause con il teorema della probabilità totale.` },
    { id: 'q-12', domanda: R`Un test per una malattia rara è positivo. Perché la probabilità di essere davvero malati può restare bassa?`, opzioni: [R`Perché i sani sono molti di più e i loro falsi positivi sono numerosi`, R`Perché il test non è affidabile sui malati`, R`Perché $P(M \mid T^+) = P(T^+ \mid M)$`, R`Perché la probabilità a priori non conta nel calcolo`], corretta: 0, spiegazione: R`Anche una piccola percentuale di errori su una popolazione grande produce più positivi di quanti ne producano i pochi malati. La probabilità a priori (la rarità della malattia) è invece decisiva, e $P(M \mid T^+)$ non è affatto uguale a $P(T^+ \mid M)$.` },
    { id: 'q-13', domanda: R`La formula di Bernoulli $\binom{n}{k}p^k(1-p)^{n-k}$ si può usare quando…`, opzioni: [R`le prove sono indipendenti e $p$ è costante`, R`le prove sono a due a due incompatibili`, R`i casi possibili sono equiprobabili`, R`$p = \dfrac{1}{2}$`], corretta: 0, spiegazione: R`Serve uno schema di Bernoulli: due soli esiti, probabilità di successo costante, prove indipendenti. Se $p$ cambia da una prova all'altra (per esempio estrazioni senza rimessa) la formula non vale.` },
    { id: 'q-14', domanda: R`In uno schema di Bernoulli con $n = 4$ e $p = 0{,}5$, quale numero di successi è il più probabile?`, opzioni: [R`$k = 0$`, R`$k = 1$`, R`$k = 2$`, R`$k = 4$`], corretta: 2, spiegazione: R`I valori sono $\dfrac{1}{16}, \dfrac{4}{16}, \dfrac{6}{16}, \dfrac{4}{16}, \dfrac{1}{16}$: la distribuzione è simmetrica e il massimo cade al centro, in $k = 2$.` },
    { id: 'q-15', domanda: R`Un gioco d'azzardo si dice equo quando…`, opzioni: [R`la probabilità di vincere è $\dfrac{1}{2}$`, R`il guadagno atteso del giocatore è nullo`, R`la vincita è maggiore della posta`, R`tutti i giocatori hanno la stessa posta`], corretta: 1, spiegazione: R`Equo significa che, giocando molte volte, in media non si guadagna né si perde: la posta è uguale al valore atteso della vincita. Alla roulette il valore atteso è minore della posta, e il gioco non è equo.` },
    { id: 'q-16', domanda: R`Nel problema di Monty Hall, cambiando porta la probabilità di vincere l'auto diventa…`, opzioni: [R`$\dfrac{1}{3}$, come all'inizio`, R`$\dfrac{1}{2}$, perché restano due porte`, R`$\dfrac{2}{3}$`, R`$1$`], corretta: 2, spiegazione: R`La porta scelta all'inizio vale $\dfrac{1}{3}$ e il conduttore, che sa dove sta l'auto, non porta informazione su di essa; il rimanente $\dfrac{2}{3}$ si concentra sull'unica altra porta ancora chiusa. Le due porte finali non sono equiprobabili.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di calcolare, scrivi qual è lo spazio campionario e quali eventi stai considerando. Metà degli errori di probabilità sono errori di conteggio dei casi possibili.` },
    { tipo: 'errore', testo: R`Una probabilità sta sempre fra $0$ e $1$. Se ti viene $1{,}3$ hai quasi certamente sommato le probabilità di eventi compatibili senza togliere l'intersezione.` },
    { tipo: 'trucco', testo: R`Quando leggi «almeno uno», pensa subito al contrario: $1 - P(\text{nessuno})$. Quasi sempre è un conto solo invece di quattro.` },
    { tipo: 'errore', testo: R`$P(A \mid B)$ e $P(B \mid A)$ sono numeri diversi. «La maggior parte dei malati è positiva» non significa «la maggior parte dei positivi è malata».` },
    { tipo: 'metodo', testo: R`Nei problemi in più passi (estrazioni, urne, test) disegna l'albero: lungo un ramo si moltiplica, fra rami diversi si somma. Le probabilità che escono da uno stesso nodo devono sommare a $1$.` },
    { tipo: 'errore', testo: R`Con o senza rimessa cambia tutto: con rimessa le prove sono indipendenti e si moltiplicano probabilità uguali, senza rimessa la seconda probabilità è condizionata dalla prima.` },
    { tipo: 'trucco', testo: R`Se un risultato di Bayes ti sembra assurdo, riscrivilo con una popolazione di $10\,000$ persone e conta le teste: i numeri interi convincono più delle frazioni.` },
    { tipo: 'errore', testo: R`Nella formula di Bernoulli non dimenticare $\binom{n}{k}$: senza, stai calcolando la probabilità di **una** particolare sequenza, non di $k$ successi in qualunque ordine.` },
    { tipo: 'metodo', testo: R`Controlla sempre la somma: le probabilità di tutti i valori di $k$ in una binomiale devono fare $1$, e $P(E) + P(\overline{E})$ pure.` },
    { tipo: 'trucco', testo: R`Il paradosso del compleanno diventa ovvio contando le coppie: fra $23$ persone ci sono $\binom{23}{2} = 253$ coppie, non $23$ persone da confrontare con te.` }
  ],

  aneddoti: [
    { matematico: 'Girolamo Cardano', anni: '1501–1576', titolo: 'Il primo manuale per vincere ai dadi', testo: R`Cardano era medico, astrologo, algebrista e giocatore d'azzardo incallito: per anni visse letteralmente di dadi e di carte. Verso il 1560 scrisse il *Liber de ludo aleae*, il primo testo che affronta il gioco con il calcolo invece che con la superstizione: ci sono già l'idea di contare i casi «ugualmente possibili», il conto dei modi di ottenere ciascuna somma con due dadi e perfino un capitolo su come barare, incluso per riconoscere chi bara. Il libro rimase nel cassetto e fu stampato solo nel 1663, quasi un secolo dopo la sua morte e nove anni dopo la corrispondenza fra Pascal e Fermat: se fosse uscito subito, la probabilità sarebbe nata con cent'anni di anticipo.`, legame: R`Il rapporto «casi favorevoli su casi possibili» compare per la prima volta nelle pagine di Cardano dedicate ai dadi.` },

    { matematico: 'Blaise Pascal e Pierre de Fermat', anni: '1623–1662 e 1601–1665', titolo: 'Il cavaliere, i dadi e sette lettere', testo: R`Nel 1654 Antoine Gombaud, cavaliere de Méré, giocatore e uomo di lettere, pose a Pascal due domande. La prima veniva dai suoi conti al tavolo: scommettere su «almeno un $6$ in quattro lanci» conveniva, scommettere su «almeno un doppio $6$ in ventiquattro lanci di due dadi» no, e lui non capiva perché. La seconda era il *problema delle parti*: come dividere la posta se una partita viene interrotta a punteggio incompleto. Pascal ne scrisse a Fermat, e in un carteggio di poche lettere i due fondarono il calcolo delle probabilità, arrivando per due strade diverse alla stessa risposta. Poco dopo, la notte del 23 novembre 1654, Pascal ebbe un'esperienza mistica: cucì il resoconto nella fodera della giacca e lasciò quasi del tutto la matematica.`, legame: R`Il problema di de Méré si risolve con $1 - (1-p)^n$: $1 - (5/6)^4 \approx 0{,}518$ contro $1 - (35/36)^{24} \approx 0{,}491$.` },

    { matematico: 'Jacob Bernoulli', anni: '1655–1705', titolo: 'Vent\'anni per dimostrare l\'ovvio', testo: R`Che lanciando molte volte una moneta la frequenza delle teste si avvicini a un mezzo lo sapevano tutti; Jacob Bernoulli volle **dimostrarlo**. Ci lavorò per vent'anni e lo chiamò il suo «teorema aureo»: è la prima legge dei grandi numeri, che quantifica quante prove servono perché la frequenza si discosti dalla probabilità meno di una soglia fissata, con la fiducia voluta. Scrisse anche che il risultato è tale «che perfino l'uomo più stupido lo riconosce per istinto naturale», e proprio per questo andava provato. L'opera, l'*Ars conjectandi*, restò incompiuta alla sua morte e fu pubblicata dal nipote Nicolaus nel 1713.`, legame: R`È la giustificazione teorica della legge empirica del caso e delle prove ripetute: da lui prendono nome lo schema di Bernoulli e la sua formula.` },

    { matematico: 'Thomas Bayes', anni: '1702–1761', titolo: 'Un teorema pubblicato dopo la morte', testo: R`Bayes era un pastore presbiteriano inglese che si occupava di matematica per interesse personale. Fra le sue carte, alla sua morte, l'amico Richard Price trovò un saggio inedito, *An Essay towards solving a Problem in the Doctrine of Chances*, e lo presentò alla Royal Society nel 1763. Il problema affrontato è il rovescio di quello di Pascal: non «date le cause, che effetti aspettarsi», ma «osservato l'effetto, quanto credere a ciascuna causa». Per due secoli il risultato rimase marginale e contestato, perché richiede di assegnare una probabilità a priori. Oggi regge i filtri antispam, la diagnostica medica, la ricerca dei relitti in mare e buona parte dell'apprendimento automatico. Bayes non lo seppe mai.`, legame: R`Il suo teorema è quello che trasforma $P(T^+ \mid M)$ in $P(M \mid T^+)$: il conto del test medico.` },

    { matematico: 'Andrej Nikolaevič Kolmogorov', anni: '1903–1987', titolo: 'Tre assiomi e la probabilità diventa matematica', testo: R`All'inizio del Novecento la probabilità era una tecnica utile ma senza fondamenta: Hilbert la mise nel 1900 fra i suoi problemi aperti, chiedendo di darle una base rigorosa come alla geometria. La risposta arrivò nel 1933 da un trentenne di Mosca: nel breve libro *Grundbegriffe der Wahrscheinlichkeitsrechnung*, Kolmogorov smise di chiedersi che cosa *sia* la probabilità e la definì con tre assiomi, appoggiandosi alla teoria della misura di Lebesgue. Da quel momento gli eventi sono insiemi, la probabilità è una misura di massa totale $1$, e tutto il resto si dimostra. Kolmogorov lavorò poi su turbolenza, complessità e balistica, e fu anche un instancabile organizzatore di scuole per ragazzi dotati.`, legame: R`Gli assiomi $P(E) \ge 0$, $P(U) = 1$ e l'additività sugli eventi incompatibili sono la base da cui si ricavano tutte le formule di questo argomento.` }
  ]
});
})();
