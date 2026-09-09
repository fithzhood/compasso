(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'successioni',
  titolo: 'Successioni e progressioni',

  introduzione: R`Una successione è un elenco ordinato di numeri, uno per ogni numero naturale: il primo termine, il secondo, il terzo, e così via senza fine. Formalmente è una funzione che ha come dominio l'insieme $\mathbb{N}$ (a partire da $1$) e come codominio $\mathbb{R}$: invece di scrivere $f(n)$ si scrive $a_n$, e invece di un grafico continuo si ottiene una nuvola di punti isolati, uno per ogni intero.

Le successioni descrivono tutto ciò che cresce (o cala) un passo alla volta: il capitale su un conto che matura interessi anno dopo anno, il numero di batteri che raddoppia ogni ora, la posizione di una pallina che rimbalza perdendo un po' di energia a ogni colpo, il numero di operazioni di un algoritmo ricorsivo. Due famiglie sono così comuni da avere un nome proprio: le **progressioni aritmetiche**, che crescono di una quantità fissa a ogni passo, e le **progressioni geometriche**, che vengono moltiplicate per un fattore fisso.

Per seguire questo argomento serve conoscere le funzioni (dominio, codominio, grafico) e le potenze con esponente intero; le progressioni geometriche richiamano direttamente le funzioni esponenziali.`,

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è una successione', testo: R`Una **successione** $(a_n)$ è una funzione il cui dominio è l'insieme dei numeri naturali (a partire da $1$, o talvolta da $0$) e il cui codominio è $\mathbb{R}$. Invece della notazione $f(n)$ usata per le funzioni comuni, si usa il **pedice**: $a_n$ indica il valore che la successione assume in corrispondenza del numero naturale $n$, e si legge "a con indice enne" oppure "termine ennesimo".

>* **Definizione:** una successione è una funzione $a: \mathbb{N} \to \mathbb{R}$. Si scrive $a_n$ al posto di $a(n)$, e la successione si indica con $(a_n)_{n \in \mathbb{N}}$ oppure semplicemente $(a_n)$.

Una successione si può definire in due modi.

**Per termine generale.** Si dà una formula esplicita che calcola $a_n$ direttamente da $n$, senza passare dai termini precedenti. Per esempio $a_n = 3n - 1$ dà, per $n = 1, 2, 3, 4, \dots$, i termini $2, 5, 8, 11, \dots$

**Per ricorrenza.** Si dà uno o più **termini iniziali** e una **legge ricorsiva** che calcola ogni termine a partire da quelli precedenti. La stessa successione di prima si ottiene anche così: $a_1 = 2$, $a_{n+1} = a_n + 3$. Per calcolare $a_4$ servono tutti i termini precedenti, uno dopo l'altro: non si può "saltare" a metà elenco come con il termine generale.

Le due definizioni descrivono spesso la stessa successione, ma con logiche opposte: il termine generale guarda direttamente al posto $n$, la ricorrenza guarda al passo precedente. Alcune successioni molto naturali, come quella di Fibonacci, hanno una ricorrenza semplicissima ma un termine generale complicato.

>! L'indice $n$ è sempre un numero naturale: non ha senso chiedersi quanto vale $a_{2,5}$ o $a_{-1}$. Questo distingue le successioni dalle funzioni di variabile reale studiate finora, il cui dominio è di solito un intervallo.` },

    { id: 'grafico-monotonia', titolo: 'Grafico, successioni monotone e limitate', testo: R`Poiché il dominio di una successione è $\mathbb{N}$, il suo grafico non è una curva continua ma un insieme di **punti isolati**: uno per ogni $n = 1, 2, 3, \dots$, di coordinate $(n, a_n)$. Non ha senso "unire i puntini": tra $n = 3$ e $n = 4$ la successione non è definita, esattamente come non ha senso l'interesse maturato dopo $3,5$ anni se la banca lo accredita una volta l'anno.

Guardando la disposizione dei punti si riconoscono due proprietà.

**Monotonia.** Una successione è **crescente** se $a_{n+1} > a_n$ per ogni $n$ (ogni punto sta più in alto del precedente), **decrescente** se $a_{n+1} < a_n$. Con le disuguaglianze deboli ($\ge$, $\le$) si parla di successione **non decrescente** o **non crescente**. Una successione è **monotona** se è, in senso stretto o largo, sempre crescente oppure sempre decrescente: non deve cambiare comportamento a metà strada.

**Limitatezza.** Una successione è **limitata superiormente** se esiste un numero $M$ tale che $a_n \le M$ per ogni $n$; **limitata inferiormente** se esiste $m$ con $a_n \ge m$ per ogni $n$; è **limitata** se lo è in entrambi i sensi.

>* $a_n = \dfrac{1}{n}$ è decrescente (perché $\frac{1}{n+1} < \frac{1}{n}$) e limitata: $0 < a_n \le 1$ per ogni $n$. $a_n = n^2$ è crescente ma limitata solo inferiormente ($a_n \ge 1$): cresce senza fermarsi mai.

Non tutte le successioni sono monotone: $a_n = (-1)^n$ vale alternativamente $-1$ e $1$, quindi non è né crescente né decrescente, ma è limitata, perché sta sempre tra $-1$ e $1$.

>! Verificare la monotonia calcolando due o tre termini non basta: $a_{n+1} > a_n$ deve valere per *ogni* $n$, e va dimostrato in generale, per esempio studiando il segno di $a_{n+1} - a_n$, non solo controllato sui primi valori.` },

    { id: 'progressioni-aritmetiche', titolo: 'Le progressioni aritmetiche', testo: R`Una **progressione aritmetica** è una successione in cui ogni termine si ottiene dal precedente sommando sempre lo stesso numero, chiamato **ragione** e indicato con $d$: $$a_{n+1} = a_n + d.$$

>* **Termine generale:** $$a_n = a_1 + (n-1)d.$$ Il termine $a_n$ si ottiene da $a_1$ sommando $d$ tante volte quanti sono i passi da $1$ a $n$, cioè $n-1$ volte.

Il segno di $d$ decide la monotonia: se $d > 0$ la progressione è crescente, se $d < 0$ è decrescente, se $d = 0$ è costante (tutti i termini uguali ad $a_1$). È sempre non limitata, sia sopra sia sotto, a meno che $d = 0$.

Esempio: $a_1 = 5$, $d = 3$. I termini sono $5, 8, 11, 14, 17, \dots$ e il decimo vale $a_{10} = 5 + 9 \cdot 3 = 32$.

Graficamente, i punti $(n, a_n)$ di una progressione aritmetica stanno tutti allineati: la retta che li contiene è $y = a_1 + (x-1)d$, la stessa formula del termine generale con $x$ al posto di $n$. Non è un caso: una progressione aritmetica è, per così dire, una funzione lineare "campionata" solo sui numeri naturali.

Prova a cambiare $a_1$ e $d$ nel grafico: i punti restano sempre allineati sulla retta tratteggiata, e cambia solo la loro posizione.

[[grafico:progressione-aritmetica]]

>! $d$ è la differenza *tra un termine e il precedente* ($a_{n+1} - a_n$), non $a_n$ diviso $n$ o altre combinazioni. Si calcola facendo la differenza di due termini consecutivi qualunque: $d = a_3 - a_2 = a_2 - a_1$.` },

    { id: 'somma-aritmetica', titolo: 'La somma di una progressione aritmetica', testo: R`Quanto vale la somma dei primi $n$ termini di una progressione aritmetica? Carl Friedrich Gauss, ancora bambino, trovò la scorciatoia sommando i numeri da $1$ a $100$ in coppie: primo più ultimo, secondo più penultimo, e così via. Ogni coppia dà la stessa somma, $a_1 + a_n$, e le coppie sono $\dfrac{n}{2}$.

[[animazione:gauss]]

>* **Somma dei primi $n$ termini:** $$S_n = a_1 + a_2 + \dots + a_n = \frac{(a_1 + a_n)\,n}{2}.$$ È "la media tra primo e ultimo termine, moltiplicata per quanti sono i termini".

Sostituendo $a_n = a_1 + (n-1)d$ si ottiene una forma equivalente che non richiede di conoscere $a_n$: $$S_n = \frac{\bigl(2a_1 + (n-1)d\bigr)\,n}{2}.$$

Esempio: la somma dei primi $10$ termini di $5, 8, 11, 14, \dots$ ($a_1 = 5$, $d = 3$, $a_{10} = 32$): $$S_{10} = \frac{(5 + 32) \cdot 10}{2} = 185.$$

### Inserire medi aritmetici

"Inserire $k$ medi aritmetici tra $a$ e $b$" significa costruire una progressione aritmetica che parte da $a$, arriva a $b$ dopo $k$ termini intermedi, e trovare quei termini intermedi. In totale la progressione ha $k + 2$ termini ($a$, i $k$ medi, $b$), quindi $b = a + (k+1)d$, da cui $$d = \frac{b - a}{k+1}.$$

Esempio: inserire $3$ medi aritmetici tra $2$ e $14$. Qui $k = 3$, quindi $d = \dfrac{14-2}{4} = 3$: la progressione è $2, 5, 8, 11, 14$.

Il caso $k = 1$ è il più comune: un solo medio aritmetico tra $a$ e $b$ è semplicemente la loro **media aritmetica**, $\dfrac{a+b}{2}$.

>! $n$ nella formula della somma è il numero di **termini**, non l'ultimo indice se la successione non parte da $1$. Se si sommano i termini da $a_5$ ad $a_{12}$, i termini sono $12 - 5 + 1 = 8$, non $12$.` },

    { id: 'progressioni-geometriche', titolo: 'Le progressioni geometriche', testo: R`Una **progressione geometrica** è una successione in cui ogni termine si ottiene dal precedente moltiplicandolo sempre per lo stesso numero, la **ragione** $q$ (con $a_1 \ne 0$ e $q \ne 0$): $$a_{n+1} = a_n \cdot q.$$

>* **Termine generale:** $$a_n = a_1 \cdot q^{\,n-1}.$$ Ogni termine è il primo moltiplicato per $q$ tante volte quanti sono i passi da $1$ a $n$.

Il comportamento dipende tutto dal valore di $q$ (supponendo $a_1 > 0$):

- $q > 1$: i termini crescono sempre più in fretta (crescita esponenziale);
- $q = 1$: successione costante;
- $0 < q < 1$: i termini calano, avvicinandosi a $0$ senza mai raggiungerlo;
- $q = -1$: i termini oscillano tra $a_1$ e $-a_1$, senza crescere né calare;
- $-1 < q < 0$: i termini oscillano di segno, avvicinandosi a $0$;
- $q < -1$: i termini oscillano di segno e crescono in valore assoluto.

Esempio: $a_1 = 3$, $q = 2$: la progressione è $3, 6, 12, 24, 48, \dots$, e $a_6 = 3 \cdot 2^5 = 96$.

Una progressione geometrica è, come quella aritmetica, una funzione già nota "campionata" sui naturali: qui è la funzione esponenziale $f(x) = a_1 \cdot q^{x-1}$ a passare esattamente per i punti $(n, a_n)$, quando $q > 0$. Il grafico qui sotto mostra i punti $1, q, q^2, \dots, q^7$ (cioè $a_1 = 1$): muovi il cursore di $q$ tra $-1{,}5$ e $1{,}5$ e osserva i comportamenti descritti sopra.

[[grafico:progressione-geometrica]]

>! Il segno di $q$ non è il segno dei termini: con $a_1 > 0$ e $q < 0$ i termini **alternano** segno (positivo, negativo, positivo, …), non sono tutti negativi. Controlla sempre qualche termine a mano per evitare errori di segno.` },

    { id: 'serie-geometrica', titolo: 'La somma di una progressione geometrica e un cenno alla serie infinita', testo: R`Anche per la somma dei primi $n$ termini di una progressione geometrica c'è una scorciatoia. Si parte da $S_n = a_1 + a_1 q + a_1 q^2 + \dots + a_1 q^{n-1}$ e si moltiplica per $q$: $qS_n = a_1 q + a_1 q^2 + \dots + a_1 q^n$. Sottraendo, quasi tutti i termini si cancellano e resta $S_n - qS_n = a_1 - a_1 q^n$, da cui:

>* **Somma dei primi $n$ termini** (se $q \ne 1$): $$S_n = a_1 \cdot \frac{q^n - 1}{q - 1}.$$ Se $q = 1$ la formula non si può usare (denominatore nullo): la progressione è costante e $S_n = n \cdot a_1$.

Esempio: $a_1 = 3$, $q = 2$, $n = 6$: $S_6 = 3 \cdot \dfrac{2^6 - 1}{2 - 1} = 3 \cdot 63 = 189$.

### Un cenno alla serie infinita

Che cosa succede a $S_n$ se si sommano **infiniti** termini? Se $|q| < 1$, la potenza $q^n$ si avvicina sempre di più a $0$ al crescere di $n$, perché moltiplicare ripetutamente per un numero minore di $1$ in valore assoluto rimpicciolisce. Nella formula della somma, $q^n \to 0$ e resta: $$S_n \to \frac{a_1}{1 - q}.$$ Sommare infiniti numeri, tutti diversi da zero, dà un risultato **finito**: è il cuore del paradosso di Achille e la tartaruga, che Zenone propose 24 secoli fa proprio per mettere in crisi questa idea.

[[animazione:achille-tartaruga]]

Esempio: $\dfrac{1}{2} + \dfrac{1}{4} + \dfrac{1}{8} + \dots$ è una progressione geometrica con $a_1 = \dfrac{1}{2}$ e $q = \dfrac{1}{2}$: la somma della serie vale $\dfrac{1/2}{1 - 1/2} = 1$. Il grafico mostra le somme parziali che si avvicinano a $1$ senza mai superarlo.

[[grafico:serie-dimezzata]]

>! La formula $S = \dfrac{a_1}{1-q}$ vale **solo** se $|q| < 1$. Se $|q| \ge 1$ la serie infinita non ha somma finita: o cresce senza limite, o, con $q = -1$, oscilla senza mai stabilizzarsi.` },

    { id: 'fibonacci', titolo: 'La successione di Fibonacci e il rapporto aureo', testo: R`La successione di Fibonacci è definita per ricorrenza, e non con un termine generale semplice (che pure esiste, ma è un'espressione con $\sqrt{5}$, tutt'altro che immediata):

>* $$F_1 = 1, \quad F_2 = 1, \quad F_{n+1} = F_n + F_{n-1} \quad (n \ge 2).$$ Ogni termine, da $F_3$ in poi, è la somma dei **due** precedenti: $1, 1, 2, 3, 5, 8, 13, 21, 34, \dots$

È una ricorrenza del secondo ordine: per calcolare un termine non basta conoscere il precedente, ne servono due. Leonardo Fibonacci la presentò nel 1202, nel *Liber Abaci*, come soluzione di un problema su una coppia di conigli che si riproducono un mese dopo l'altro.

Il rapporto tra un termine e il precedente, $\dfrac{F_{n+1}}{F_n}$, non è costante (altrimenti sarebbe una progressione geometrica), ma **si avvicina** sempre di più, al crescere di $n$, a un numero preciso:

>* **Rapporto aureo:** $$\varphi = \frac{1 + \sqrt{5}}{2} \approx 1{,}618\dots$$ $\varphi$ è l'unico numero positivo che soddisfa $\varphi^2 = \varphi + 1$: aggiungendo $1$ si ottiene il suo quadrato.

Disegnando quadrati di lato $F_1, F_2, F_3, \dots$ accostati a spirale, e tracciando un arco in ognuno, si ottiene una spirale che approssima, non esattamente, la disposizione di semi, squame e conchiglie osservabile in molte piante e animali.

[[animazione:fibonacci-spirale]]

>! $\varphi$ non è "il numero che sta in ogni cosa bella": la sua presenza in natura è reale in alcuni casi (fillotassi delle piante) ma è stata esagerata in molti altri (opere d'arte, corpo umano). Meglio restare sui fatti verificabili: il limite del rapporto tra termini consecutivi di Fibonacci è $\varphi$, punto.` },

    { id: 'induzione', titolo: 'Il principio di induzione', testo: R`Il **principio di induzione** è una tecnica per dimostrare che una proprietà $P(n)$ è vera per **tutti** i numeri naturali, da un certo punto in poi, senza controllarla uno per uno: sarebbe impossibile, essendo infiniti.

Lo schema ha due passi:

1. **Base:** si verifica che $P(n_0)$ è vera (di solito $n_0 = 1$).
2. **Passo induttivo:** si suppone che $P(k)$ sia vera per un generico $k \ge n_0$ (l'**ipotesi induttiva**) e si dimostra che, di conseguenza, è vera anche $P(k+1)$.

>* Se valgono entrambi i passi, $P(n)$ è vera per **ogni** $n \ge n_0$: è come una fila di tessere del domino, ognuna abbastanza vicina alla successiva da farla cadere. Far cadere la prima e garantire che ogni tessera fa cadere quella dopo basta per l'intera fila, per quanto lunga.

**Esempio: la somma dei primi $n$ numeri dispari.** Si vuole dimostrare che $1 + 3 + 5 + \dots + (2n - 1) = n^2$ per ogni $n \ge 1$.

*Base* ($n=1$): il primo membro è $1$ (un solo termine, il primo dispari), il secondo è $1^2 = 1$. Verificata.

*Passo induttivo:* si suppone vera l'ipotesi $1 + 3 + \dots + (2k-1) = k^2$ e si dimostra che vale anche per $k+1$, cioè che $1 + 3 + \dots + (2k-1) + (2k+1) = (k+1)^2$. Per ipotesi la somma dei primi $k$ dispari è $k^2$, quindi il primo membro diventa $k^2 + (2k+1)$, che è proprio $(k+1)^2$. Passo verificato.

Per il principio di induzione, la formula vale per ogni $n \ge 1$.

[[animazione:somma-dispari]]

>! Nel passo induttivo non si dimostra $P(n)$ in generale: si dimostra un'implicazione, "*se* $P(k)$ è vera *allora* è vera anche $P(k+1)$". Dare per buona $P(k)$ non è un errore logico, è proprio l'ipotesi da cui si parte per quel passo.` },

    { id: 'limite-e-applicazioni', titolo: 'Il comportamento al crescere di n e qualche applicazione', testo: R`### Il comportamento per n grande

Che cosa succede ai termini di una successione quando $n$ diventa sempre più grande? Tre comportamenti sono particolarmente comuni (la definizione rigorosa si studia con i limiti delle funzioni; qui basta l'idea intuitiva).

- **Successione convergente:** i termini si avvicinano sempre di più a un numero $L$, senza necessariamente raggiungerlo. Si scrive $\lim_{n \to \infty} a_n = L$. Esempio: $a_n = \dfrac{1}{n}$ dà $1, \ 0{,}5, \ 0{,}33\dots, \ 0{,}25, \dots$, sempre più vicino a $0$.
- **Successione divergente:** i termini crescono, o calano, senza fermarsi mai, superando qualunque valore fissato in anticipo. Si scrive $\lim_{n \to \infty} a_n = +\infty$ (o $-\infty$). Esempio: $a_n = n^2$ dà $1, 4, 9, 16, \dots$, senza alcun limite superiore.
- **Successione irregolare (o indeterminata):** non converge e non diverge. Esempio: $a_n = (-1)^n$ oscilla per sempre tra $-1$ e $1$, senza avvicinarsi a nessun valore fisso.

>* Una progressione geometrica con $|q| < 1$ **converge a $0$**; con $q > 1$ (e $a_1 > 0$) **diverge a $+\infty$**; con $q \le -1$ è **irregolare**. Una progressione aritmetica con $d \ne 0$ **diverge sempre**: a $+\infty$ se $d>0$, a $-\infty$ se $d<0$.

### Interesse semplice, interesse composto, decadimento

Un capitale $C_0$ investito con **interesse semplice** al tasso $i$ (per esempio $i = 0{,}03$ per il $3\%$) matura ogni anno lo stesso importo, $C_0 \cdot i$: è una progressione **aritmetica** di ragione $d = C_0 i$, e dopo $n$ anni vale $C_n = C_0(1 + ni)$. Con l'**interesse composto**, invece, gli interessi maturano anche sugli interessi già accumulati: ogni anno il capitale viene moltiplicato per lo stesso fattore $1+i$, è una progressione **geometrica** di ragione $q = 1+i > 1$, e $C_n = C_0(1+i)^n$: diverge, e per $n$ grandi cresce molto più in fretta di quella aritmetica.

Un **decadimento** (radioattivo, la temperatura di un corpo che si raffredda, un farmaco smaltito dall'organismo) segue di solito una progressione geometrica con $0 < q < 1$: a ogni passo resta una frazione fissa della quantità precedente, e la successione converge a $0$. Il caso $q = \dfrac{1}{2}$ si chiama **dimezzamento**: dopo ogni passo ne resta la metà.

>! "Convergere a $0$" non vuol dire "diventare $0$ dopo un po'": una progressione geometrica con $0 < q < 1$ si avvicina a $0$ quanto si vuole, ma nessun termine è mai esattamente $0$, a meno che $a_1 = 0$.` }
  ],

  grafici: {
    'progressione-aritmetica': {
      tipo: 'piano', x: [0, 9], y: [-15, 15], passo: [1, 5],
      parametri: [
        { nome: 'a1', min: -3, max: 3, passo: 1, valore: 1, etichetta: 'a₁' },
        { nome: 'd', min: -1.5, max: 1.5, passo: 0.5, valore: 1, etichetta: 'd' }
      ],
      punti: [
        { x: 1, y: 'a1', etichetta: 'a₁ = {{a1}}', posizione: 'basso', colore: 1 },
        { x: 2, y: 'a1+d', colore: 1 },
        { x: 3, y: 'a1+2d', colore: 1 },
        { x: 4, y: 'a1+3d', colore: 1 },
        { x: 5, y: 'a1+4d', colore: 1 },
        { x: 6, y: 'a1+5d', colore: 1 },
        { x: 7, y: 'a1+6d', colore: 1 },
        { x: 8, y: 'a1+7d', etichetta: 'a₈ = {{a1+7d}}', posizione: 'alto', colore: 1 }
      ],
      elementi: [
        { tipo: 'retta', m: 'd', q: 'a1 - d', tratteggio: true, colore: 3, etichetta: 'y = a₁ + (x−1)d' }
      ],
      didascalia: 'I primi 8 termini della progressione aritmetica: stanno tutti allineati sulla retta y = a₁ + (x−1)d. Trascina i cursori a₁ e d per vedere come cambiano.'
    },
    'progressione-geometrica': {
      tipo: 'piano', x: [-1, 8], y: [-6, 6],
      parametri: [
        { nome: 'q', min: -1.5, max: 1.5, passo: 0.1, valore: 0.5, etichetta: 'q' }
      ],
      punti: [
        { x: 0, y: '1', etichetta: 'a₁ = 1', posizione: 'basso', colore: 1 },
        { x: 1, y: 'q', colore: 1 },
        { x: 2, y: 'q^2', colore: 1 },
        { x: 3, y: 'q^3', colore: 1 },
        { x: 4, y: 'q^4', colore: 1 },
        { x: 5, y: 'q^5', colore: 1 },
        { x: 6, y: 'q^6', colore: 1 },
        { x: 7, y: 'q^7', etichetta: 'a₈ = {{q^7}}', posizione: 'alto', colore: 1 }
      ],
      didascalia: 'I termini 1, q, q², …, q⁷ per q tra −1,5 e 1,5: osserva quando si avvicinano a zero (|q|<1), quando crescono senza limite (|q|>1) e quando oscillano di segno (q<0).'
    },
    'serie-dimezzata': {
      tipo: 'piano', x: [0, 9], y: [0, 1.2], passo: [1, 0.2],
      punti: [
        { x: 1, y: 0.5, colore: 1 },
        { x: 2, y: 0.75, colore: 1 },
        { x: 3, y: 0.875, colore: 1 },
        { x: 4, y: 0.9375, colore: 1 },
        { x: 5, y: 0.96875, colore: 1 },
        { x: 6, y: 0.984375, colore: 1 },
        { x: 7, y: 0.9921875, colore: 1 },
        { x: 8, y: 0.99609375, etichetta: 'S₈', posizione: 'alto', colore: 1 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: 1, tratteggio: true, colore: 3, etichetta: 'y = 1' }
      ],
      didascalia: 'Le somme parziali di 1/2 + 1/4 + 1/8 + … si avvicinano a 1 (la somma della serie) ma non lo raggiungono mai.'
    }
  },

  esempi: [
    { titolo: 'Termine generale', problema: R`Data la successione di termine generale $a_n = \dfrac{2n+1}{n+1}$, calcola i primi quattro termini.`, passi: [
      R`Sostituisco $n = 1, 2, 3, 4$ nella formula, uno alla volta.`,
      R`$a_1 = \dfrac{2 \cdot 1 + 1}{1+1} = \dfrac{3}{2}$; $\ a_2 = \dfrac{5}{3}$; $\ a_3 = \dfrac{7}{4}$; $\ a_4 = \dfrac{9}{5}$.`,
      R`I valori decimali sono $1{,}5$; $\ 1{,}67$; $\ 1{,}75$; $\ 1{,}8$: crescono, ma sempre più lentamente, avvicinandosi a $2$.`
    ], risultato: R`$a_1 = \dfrac{3}{2}, \ a_2 = \dfrac{5}{3}, \ a_3 = \dfrac{7}{4}, \ a_4 = \dfrac{9}{5}$` },

    { titolo: 'Successione per ricorrenza', problema: R`La successione è definita da $a_1 = 20$, $a_{n+1} = a_n - 3$. Calcola i primi cinque termini e stabilisci se è monotona e se è limitata inferiormente.`, passi: [
      R`Applico la legge ricorsiva partendo da $a_1 = 20$: $a_2 = 20 - 3 = 17$, $a_3 = 14$, $a_4 = 11$, $a_5 = 8$.`,
      R`$a_{n+1} - a_n = -3 < 0$ per ogni $n$: la successione è **decrescente**, quindi monotona.`,
      R`È una progressione aritmetica di ragione $d = -3 \ne 0$: sottraendo sempre $3$ si supera qualunque valore negativo, quindi **non** è limitata inferiormente.`
    ], risultato: R`$20, 17, 14, 11, 8, \dots$: decrescente, non limitata inferiormente` },

    { titolo: 'Progressione aritmetica: termine e somma', problema: R`Di una progressione aritmetica si sa che $a_1 = 5$ e $d = 3$. Calcola $a_{10}$ e la somma dei primi $10$ termini.`, passi: [
      R`Termine generale: $a_{10} = a_1 + 9d = 5 + 9 \cdot 3 = 32$.`,
      R`Somma: $S_{10} = \dfrac{(a_1 + a_{10}) \cdot 10}{2} = \dfrac{(5+32)\cdot 10}{2} = \dfrac{370}{2} = 185$.`
    ], risultato: R`$a_{10} = 32, \ S_{10} = 185$` },

    { titolo: 'Inserire medi aritmetici', problema: R`Inserisci $3$ medi aritmetici tra $2$ e $14$.`, passi: [
      R`I termini totali sono $k + 2 = 3 + 2 = 5$: $2$, tre medi, $14$.`,
      R`La ragione è $d = \dfrac{b-a}{k+1} = \dfrac{14-2}{4} = 3$.`,
      R`La progressione è $2, 5, 8, 11, 14$: i tre medi cercati sono $5$, $8$ e $11$.`
    ], risultato: R`$5, \ 8, \ 11$ (con $d = 3$)` },

    { titolo: 'Progressione geometrica: termine, somma finita e somma infinita', problema: R`Una progressione geometrica ha $a_1 = 8$ e $q = \dfrac{1}{2}$. Calcola $a_5$, la somma dei primi $5$ termini e la somma dell'intera serie infinita.`, passi: [
      R`Termine generale: $a_5 = a_1 \cdot q^4 = 8 \cdot \left(\dfrac{1}{2}\right)^4 = \dfrac{8}{16} = 0{,}5$.`,
      R`I primi cinque termini sono $8, 4, 2, 1, 0{,}5$: la somma è $S_5 = 15{,}5$. Con la formula: $S_5 = 8 \cdot \dfrac{(1/2)^5 - 1}{1/2 - 1} = 8 \cdot \dfrac{-31/32}{-1/2} = 15{,}5$. ✓`,
      R`Poiché $|q| = \dfrac{1}{2} < 1$, la serie infinita ha somma finita: $S = \dfrac{a_1}{1-q} = \dfrac{8}{1/2} = 16$.`
    ], risultato: R`$a_5 = 0{,}5, \ S_5 = 15{,}5, \ S_{\infty} = 16$` },

    { titolo: 'Dimostrazione per induzione', problema: R`Dimostra per induzione che, per ogni $n \ge 1$, $1 + 3 + 5 + \dots + (2n-1) = n^2$.`, passi: [
      R`**Base** ($n=1$): il primo membro ha un solo termine, $1$; il secondo è $1^2 = 1$. La proprietà è vera per $n=1$.`,
      R`**Ipotesi induttiva:** suppongo vera $1 + 3 + \dots + (2k-1) = k^2$ per un generico $k \ge 1$.`,
      R`**Passo induttivo:** dimostro che vale anche per $k+1$, cioè che $1 + 3 + \dots + (2k-1) + (2k+1) = (k+1)^2$. Per l'ipotesi induttiva, la somma dei primi $k$ termini è $k^2$, quindi il primo membro diventa $k^2 + (2k+1)$.`,
      R`$k^2 + 2k + 1 = (k+1)^2$: è esattamente il secondo membro cercato. Il passo induttivo è verificato.`,
      R`Per il principio di induzione, la formula $1 + 3 + \dots + (2n-1) = n^2$ vale per ogni $n \ge 1$.`
    ], risultato: R`Dimostrato per ogni $n \ge 1$: la somma dei primi $n$ dispari è $n^2$` }
  ],

  formulario: [
    { nome: 'Successione (notazione)', formula: R`a: \mathbb{N} \to \mathbb{R}, \quad a_n = a(n)` },
    { nome: 'Progressione aritmetica: termine generale', formula: R`a_n = a_1 + (n-1)d` },
    { nome: 'Progressione aritmetica: somma', formula: R`S_n = \frac{(a_1+a_n)\,n}{2} = \frac{\bigl(2a_1+(n-1)d\bigr)\,n}{2}` },
    { nome: 'Medi aritmetici: ragione', formula: R`d = \frac{b-a}{k+1}`, nota: R`Inserendo $k$ medi aritmetici tra $a$ e $b$.` },
    { nome: 'Progressione geometrica: termine generale', formula: R`a_n = a_1 \cdot q^{\,n-1}` },
    { nome: 'Progressione geometrica: somma', formula: R`S_n = a_1 \cdot \frac{q^n - 1}{q-1}`, nota: R`Valida per $q \ne 1$; se $q=1$, $S_n = n \cdot a_1$.` },
    { nome: 'Somma della serie geometrica infinita', formula: R`S = \frac{a_1}{1-q}`, nota: R`Valida solo se $|q| < 1$.` },
    { nome: 'Successione di Fibonacci', formula: R`F_1 = F_2 = 1, \quad F_{n+1} = F_n + F_{n-1}` },
    { nome: 'Rapporto aureo', formula: R`\varphi = \frac{1+\sqrt{5}}{2} \approx 1{,}618\dots`, nota: R`Limite di $F_{n+1}/F_n$.` },
    { nome: 'Principio di induzione', formula: R`P(n_0) \text{ vera}, \quad P(k) \text{ vera} \Rightarrow P(k+1) \text{ vera} \quad\Longrightarrow\quad P(n) \text{ vera per ogni } n \ge n_0` },
    { nome: 'Somma dei primi n numeri dispari', formula: R`1 + 3 + 5 + \dots + (2n-1) = n^2` },
    { nome: 'Interesse semplice', formula: R`C_n = C_0(1 + ni)`, nota: R`Progressione aritmetica di ragione $d = C_0 i$.` },
    { nome: 'Interesse composto', formula: R`C_n = C_0(1+i)^n`, nota: R`Progressione geometrica di ragione $q = 1+i$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Che cos'è una successione?`, retro: R`Una funzione il cui dominio è $\mathbb{N}$ e il cui codominio è $\mathbb{R}$; si scrive $a_n$ al posto di $f(n)$.` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Quali sono i due modi per definire una successione?`, retro: R`Per termine generale (formula esplicita in $n$) o per ricorrenza (termine iniziale più legge che lo ricava dai precedenti).` },
    { id: 'fc-03', sezione: 'definizione', tipo: 'definizione', fronte: R`Successione definita per ricorrenza`, retro: R`Si danno uno o più termini iniziali e una regola che calcola ogni termine dai precedenti, es. $a_1=2$, $a_{n+1}=a_n+3$.` },
    { id: 'fc-04', sezione: 'grafico-monotonia', tipo: 'concetto', fronte: R`Perché il grafico di una successione è fatto di punti isolati?`, retro: R`Perché il dominio $\mathbb{N}$ è discreto: la successione non è definita per valori non interi di $n$.` },
    { id: 'fc-05', sezione: 'grafico-monotonia', tipo: 'definizione', fronte: R`Successione crescente`, retro: R`$a_{n+1} > a_n$ per ogni $n$.` },
    { id: 'fc-06', sezione: 'grafico-monotonia', tipo: 'definizione', fronte: R`Successione limitata`, retro: R`Esistono $m$ ed $M$ tali che $m \le a_n \le M$ per ogni $n$ (limitata sia sopra sia sotto).` },
    { id: 'fc-07', sezione: 'progressioni-aritmetiche', tipo: 'definizione', fronte: R`Ragione di una progressione aritmetica`, retro: R`$d = a_{n+1} - a_n$, costante per ogni $n$.` },
    { id: 'fc-08', sezione: 'progressioni-aritmetiche', tipo: 'formula', fronte: R`Termine generale della progressione aritmetica`, retro: R`$a_n = a_1 + (n-1)d$` },
    { id: 'fc-09', sezione: 'progressioni-aritmetiche', tipo: 'concetto', fronte: R`Che forma ha il grafico di una progressione aritmetica?`, retro: R`Punti allineati sulla retta $y = a_1 + (x-1)d$.` },
    { id: 'fc-10', sezione: 'somma-aritmetica', tipo: 'formula', fronte: R`Somma dei primi $n$ termini di una progressione aritmetica`, retro: R`$S_n = \dfrac{(a_1+a_n)\cdot n}{2}$` },
    { id: 'fc-11', sezione: 'somma-aritmetica', tipo: 'procedura', fronte: R`Come si trova la ragione per inserire $k$ medi aritmetici tra $a$ e $b$?`, retro: R`$d = \dfrac{b-a}{k+1}$` },
    { id: 'fc-12', sezione: 'somma-aritmetica', tipo: 'concetto', fronte: R`Come pensò Gauss di sommare $1+2+\dots+100$?`, retro: R`In coppie: primo più ultimo, secondo più penultimo, ecc. Ogni coppia dà $101$, e le coppie sono $50$.` },
    { id: 'fc-13', sezione: 'progressioni-geometriche', tipo: 'definizione', fronte: R`Ragione di una progressione geometrica`, retro: R`$q = a_{n+1}/a_n$, costante per ogni $n$ (con $a_n \ne 0$).` },
    { id: 'fc-14', sezione: 'progressioni-geometriche', tipo: 'formula', fronte: R`Termine generale della progressione geometrica`, retro: R`$a_n = a_1 \cdot q^{\,n-1}$` },
    { id: 'fc-15', sezione: 'progressioni-geometriche', tipo: 'concetto', fronte: R`Cosa succede a una progressione geometrica con $-1<q<0$?`, retro: R`I termini oscillano di segno, avvicinandosi a $0$.` },
    { id: 'fc-16', sezione: 'serie-geometrica', tipo: 'formula', fronte: R`Somma dei primi $n$ termini di una progressione geometrica ($q \ne 1$)`, retro: R`$S_n = a_1 \cdot \dfrac{q^n-1}{q-1}$` },
    { id: 'fc-17', sezione: 'serie-geometrica', tipo: 'formula', fronte: R`Somma della serie geometrica infinita`, retro: R`$S = \dfrac{a_1}{1-q}$, valida solo se $|q|<1$.` },
    { id: 'fc-18', sezione: 'serie-geometrica', tipo: 'concetto', fronte: R`Che cosa mostra il paradosso di Achille e la tartaruga?`, retro: R`Che una somma di infiniti termini positivi può essere finita, se i termini formano una progressione geometrica con $|q|<1$.` },
    { id: 'fc-19', sezione: 'fibonacci', tipo: 'formula', fronte: R`Ricorrenza della successione di Fibonacci`, retro: R`$F_1=F_2=1$, $F_{n+1}=F_n+F_{n-1}$.` },
    { id: 'fc-20', sezione: 'fibonacci', tipo: 'formula', fronte: R`Rapporto aureo $\varphi$`, retro: R`$\varphi = \dfrac{1+\sqrt5}{2} \approx 1{,}618\dots$, limite del rapporto $F_{n+1}/F_n$.` },
    { id: 'fc-21', sezione: 'induzione', tipo: 'procedura', fronte: R`I due passi del principio di induzione`, retro: R`1) Base: si verifica $P(n_0)$. 2) Passo induttivo: si assume $P(k)$ vera e si dimostra $P(k+1)$.` },
    { id: 'fc-22', sezione: 'induzione', tipo: 'concetto', fronte: R`Somma dei primi $n$ numeri dispari`, retro: R`$1+3+5+\dots+(2n-1) = n^2$, dimostrabile per induzione.` },
    { id: 'fc-23', sezione: 'limite-e-applicazioni', tipo: 'definizione', fronte: R`Successione convergente`, retro: R`I termini si avvicinano sempre di più a un numero $L$ al crescere di $n$.` },
    { id: 'fc-24', sezione: 'limite-e-applicazioni', tipo: 'concetto', fronte: R`Interesse semplice e interesse composto: che progressioni sono?`, retro: R`Semplice: aritmetica, $C_n=C_0(1+ni)$. Composto: geometrica, $C_n=C_0(1+i)^n$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Una successione è definita da $a_1 = 3$, $a_{n+1} = a_n + 4$. Quanto vale $a_5$?`, suggerimenti: [R`Calcola i termini uno alla volta, partendo da $a_1$.`, R`$a_2 = 7$, $a_3 = 11$: continua fino a $a_5$.`], risposta: { tipo: 'numero', valore: 19 }, soluzione: [R`$a_1=3$, $a_2=7$, $a_3=11$, $a_4=15$, $a_5=19$.`, R`È una progressione aritmetica di ragione $4$: $a_5 = a_1+4d = 3+4\cdot4=19$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Data $a_n = \dfrac{n}{n+2}$, calcola $a_4$.`, suggerimenti: [R`Sostituisci $n=4$ nella formula.`, R`Non semplificare $n$ con $n+2$: sono legati da un $+2$, non da un fattore comune.`], risposta: { tipo: 'numero', valore: 2/3, tolleranza: 0.001 }, soluzione: [R`$a_4 = \dfrac{4}{4+2} = \dfrac{4}{6} = \dfrac{2}{3} \approx 0{,}667$.`] },
    { id: 'es-03', difficolta: 1, testo: R`In una progressione aritmetica $a_1 = 7$ e $d = -2$. Calcola $a_{12}$.`, suggerimenti: [R`Usa $a_n = a_1 + (n-1)d$.`, R`Attento al segno: $d$ è negativo.`], risposta: { tipo: 'numero', valore: -15 }, soluzione: [R`$a_{12} = 7 + 11 \cdot (-2) = 7 - 22 = -15$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Calcola la somma dei primi $15$ termini della progressione aritmetica con $a_1=4$ e $d=5$.`, suggerimenti: [R`Trova prima $a_{15}$.`, R`Poi usa $S_n = \dfrac{(a_1+a_n)\cdot n}{2}$.`], risposta: { tipo: 'numero', valore: 585 }, soluzione: [R`$a_{15} = 4 + 14\cdot 5 = 74$.`, R`$S_{15} = \dfrac{(4+74)\cdot 15}{2} = \dfrac{1170}{2} = 585$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Inserendo $4$ medi aritmetici tra $3$ e $23$, quanto vale la ragione $d$?`, suggerimenti: [R`I termini totali sono $k+2$, con $k=4$.`, R`Usa $d = \dfrac{b-a}{k+1}$.`], risposta: { tipo: 'numero', valore: 4 }, soluzione: [R`$d = \dfrac{23-3}{4+1} = \dfrac{20}{5} = 4$.`, R`La progressione è $3, 7, 11, 15, 19, 23$: i quattro medi sono $7, 11, 15, 19$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Di una progressione geometrica si sa che $a_1=5$ e $q=3$. Calcola $a_5$.`, suggerimenti: [R`Usa $a_n = a_1 \cdot q^{n-1}$.`, R`Occhio all'esponente: per $a_5$ è $n-1=4$.`], risposta: { tipo: 'numero', valore: 405 }, soluzione: [R`$a_5 = 5 \cdot 3^4 = 5 \cdot 81 = 405$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Calcola la somma dei primi $5$ termini della progressione geometrica con $a_1=2$ e $q=3$.`, suggerimenti: [R`Usa $S_n = a_1 \cdot \dfrac{q^n-1}{q-1}$.`], risposta: { tipo: 'numero', valore: 242 }, soluzione: [R`$S_5 = 2 \cdot \dfrac{3^5-1}{3-1} = 2 \cdot \dfrac{242}{2} = 242$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Calcola la somma della serie geometrica infinita con $a_1=5$ e $q=0{,}2$.`, suggerimenti: [R`Controlla prima che $|q|<1$: solo allora la serie ha somma finita.`, R`Usa $S = \dfrac{a_1}{1-q}$.`], risposta: { tipo: 'numero', valore: 6.25 }, soluzione: [R`$|q| = 0{,}2 < 1$: la serie converge.`, R`$S = \dfrac{5}{1-0{,}2} = \dfrac{5}{0{,}8} = 6{,}25$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Nella successione di Fibonacci ($F_1=F_2=1$), calcola $F_8$.`, suggerimenti: [R`Calcola i termini uno alla volta: ogni termine è la somma dei due precedenti.`, R`$F_6 = 8$, $F_7=13$: manca solo l'ultimo passo.`], risposta: { tipo: 'numero', valore: 21 }, soluzione: [R`$1, 1, 2, 3, 5, 8, 13, 21$: l'ottavo termine è $F_8 = 21$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Due termini consecutivi di una progressione aritmetica di ragione $5$ hanno somma $37$. Quali sono i due termini?`, suggerimenti: [R`Chiama $x$ il primo termine: il secondo è $x+5$.`, R`Risolvi $x + (x+5) = 37$.`], risposta: { tipo: 'numeri', valori: [16, 21] }, soluzione: [R`$2x + 5 = 37 \Rightarrow 2x = 32 \Rightarrow x = 16$.`, R`I due termini sono $16$ e $16+5=21$. Verifica: $16+21=37$. ✓`] },
    { id: 'es-11', difficolta: 1, testo: R`Stabilisci se la successione $a_n = 10 - n$ è crescente, decrescente o costante, e se è limitata superiormente, inferiormente, in entrambi i modi o in nessuno dei due.`, suggerimenti: [R`Calcola $a_{n+1} - a_n$.`, R`Guarda cosa succede al primo termine e a cosa tende la successione per $n$ molto grande.`], soluzione: [R`$a_{n+1} - a_n = \bigl(10-(n+1)\bigr) - (10-n) = -1 < 0$ per ogni $n$: la successione è **decrescente**.`, R`È una progressione aritmetica di ragione $d=-1$: $a_1 = 9$ è il valore più grande, quindi la successione è **limitata superiormente** (per esempio da $9$).`, R`Diminuendo sempre di $1$, i termini superano qualunque valore negativo: la successione **non è limitata inferiormente**.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un capitale di $2000$ € è investito per $4$ anni al tasso del $4\%$ annuo, a interesse composto. Quanto vale il montante finale (arrotonda ai centesimi)?`, suggerimenti: [R`Il capitale segue una progressione geometrica: $C_n = C_0(1+i)^n$.`, R`Qui $C_0=2000$, $i=0{,}04$, $n=4$.`], risposta: { tipo: 'numero', valore: 2339.72, tolleranza: 0.02 }, soluzione: [R`$C_4 = 2000 \cdot (1{,}04)^4$.`, R`$(1{,}04)^4 = 1{,}16985856$, quindi $C_4 = 2000 \cdot 1{,}16985856 = 2339{,}71712$.`, R`Arrotondato ai centesimi: $C_4 \approx 2339{,}72$ €.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Il dominio di una successione è…`, opzioni: [R`$\mathbb{R}$`, R`un intervallo di $\mathbb{R}$`, R`$\mathbb{N}$`, R`$\mathbb{Z}$`], corretta: 2, spiegazione: R`Una successione è, per definizione, una funzione $\mathbb{N} \to \mathbb{R}$: il suo dominio è discreto, non un intervallo continuo.` },
    { id: 'q-02', domanda: R`Qual è la notazione corretta per il termine ennesimo di una successione?`, opzioni: [R`$a_n$`, R`$a^n$`, R`$a[n]$`, R`$n_a$`], corretta: 0, spiegazione: R`Si usa il pedice, non l'esponente: $a_n$ sta per $a(n)$.` },
    { id: 'q-03', domanda: R`Quali sono i due modi per definire una successione?`, opzioni: [R`Per somma e per prodotto`, R`Per crescenza e per limitatezza`, R`Per intervalli e per punti isolati`, R`Per termine generale e per ricorrenza`], corretta: 3, spiegazione: R`Il termine generale dà $a_n$ direttamente da $n$; la ricorrenza dà $a_n$ a partire dai termini precedenti.` },
    { id: 'q-04', domanda: R`Una successione è monotona se…`, opzioni: [R`è sempre positiva`, R`è sempre crescente oppure sempre decrescente`, R`è limitata`, R`ha limite finito`], corretta: 1, spiegazione: R`La monotonia riguarda il confronto tra termini consecutivi, non il segno né la limitatezza né l'esistenza di un limite.` },
    { id: 'q-05', domanda: R`Una successione è limitata se…`, opzioni: [R`esistono $m$ ed $M$ tali che $m \le a_n \le M$ per ogni $n$`, R`è monotona`, R`il suo termine generale è un polinomio`, R`tende a zero`], corretta: 0, spiegazione: R`La limitatezza richiede che i termini restino sempre tra due valori fissati; non ha nulla a che vedere con la monotonia o con l'esistenza di un limite.` },
    { id: 'q-06', domanda: R`Nella progressione aritmetica, la ragione $d$ è…`, opzioni: [R`il rapporto tra due termini consecutivi`, R`il primo termine`, R`la somma di tutti i termini`, R`la differenza tra un termine e il precedente`], corretta: 3, spiegazione: R`$d = a_{n+1} - a_n$: è una differenza, non un rapporto (quello è $q$, la ragione della progressione geometrica).` },
    { id: 'q-07', domanda: R`Il termine generale di una progressione aritmetica è…`, opzioni: [R`$a_n = a_1 \cdot d^{\,n-1}$`, R`$a_n = a_1 + (n-1)d$`, R`$a_n = a_1 + nd$`, R`$a_n = a_1 \cdot n + d$`], corretta: 1, spiegazione: R`Da $a_1$ a $a_n$ ci sono $n-1$ passi, non $n$: l'errore più comune è dimenticare il $-1$.` },
    { id: 'q-08', domanda: R`La somma dei primi $n$ termini di una progressione aritmetica è…`, opzioni: [R`$S_n = \dfrac{(a_1+a_n)\cdot n}{2}$`, R`$S_n = n \cdot a_1 \cdot d$`, R`$S_n = a_1 \cdot q^{\,n-1}$`, R`$S_n = \dfrac{a_1 - a_n}{2}$`], corretta: 0, spiegazione: R`È la media tra primo e ultimo termine, moltiplicata per il numero dei termini: l'idea di Gauss.` },
    { id: 'q-09', domanda: R`Nella progressione geometrica, la ragione $q$ è…`, opzioni: [R`la differenza tra due termini consecutivi`, R`sempre un numero positivo`, R`il primo termine diviso l'ultimo`, R`il rapporto tra un termine e il precedente`], corretta: 3, spiegazione: R`$q = a_{n+1}/a_n$: è un rapporto, e può essere anche negativo (i termini allora alternano segno).` },
    { id: 'q-10', domanda: R`La somma della serie geometrica infinita $a_1 + a_1q + a_1q^2 + \dots$ esiste finita se e solo se…`, opzioni: [R`$q > 1$`, R`$|q| < 1$`, R`$q = 1$`, R`$q < 0$`], corretta: 1, spiegazione: R`Solo se $|q|<1$ le potenze $q^n$ si avvicinano a $0$, rendendo finita la somma $S = a_1/(1-q)$.` },
    { id: 'q-11', domanda: R`Se $a_1 > 0$ e $q > 1$, la progressione geometrica…`, opzioni: [R`converge a $0$`, R`oscilla senza convergere né divergere`, R`diverge a $+\infty$`, R`è costante`], corretta: 2, spiegazione: R`Con $q>1$ ogni termine è maggiore del precedente e la crescita è esponenziale: i termini superano qualunque valore fissato.` },
    { id: 'q-12', domanda: R`La successione di Fibonacci è definita da…`, opzioni: [R`$F_1=F_2=1$, $F_{n+1}=F_n+F_{n-1}$`, R`$F_n = 2 \cdot F_{n-1}$`, R`$F_n = n^2$`, R`$F_1=0$, $F_{n+1}=F_n - 1$`], corretta: 0, spiegazione: R`È una ricorrenza del secondo ordine: ogni termine, da $F_3$ in poi, è la somma dei due precedenti.` },
    { id: 'q-13', domanda: R`Il rapporto tra due termini consecutivi di Fibonacci, al crescere di $n$, si avvicina a…`, opzioni: [R`un numero razionale`, R`$2$`, R`$0$`, R`$\varphi = \dfrac{1+\sqrt5}{2}$`], corretta: 3, spiegazione: R`È il rapporto aureo, un numero irrazionale: $F_{n+1}/F_n \to \varphi \approx 1{,}618$.` },
    { id: 'q-14', domanda: R`Nel principio di induzione, la "base" consiste nel…`, opzioni: [R`dimostrare che $P(k)$ implica $P(k+1)$ per ogni $k$`, R`verificare che la proprietà è vera per il primo valore considerato`, R`dimostrare la proprietà per tutti gli $n$ contemporaneamente`, R`supporre vera la proprietà per ogni $n$`], corretta: 1, spiegazione: R`La base è la verifica diretta di $P(n_0)$; l'implicazione $P(k) \Rightarrow P(k+1)$ è il passo induttivo, non la base.` },
    { id: 'q-15', domanda: R`Nel passo induttivo del principio di induzione si assume…`, opzioni: [R`che $P(n)$ sia vera per ogni $n$`, R`che $P(1)$ sia falsa`, R`che $P(k)$ sia vera per un generico $k$, per dimostrare $P(k+1)$`, R`niente: si dimostra $P(n)$ direttamente, senza ipotesi`], corretta: 2, spiegazione: R`L'ipotesi induttiva è $P(k)$ vera per un $k$ generico; da lì si dimostra $P(k+1)$, non $P(n)$ per ogni $n$ insieme (sarebbe circolare).` },
    { id: 'q-16', domanda: R`Un capitale con interesse composto, rispetto a uno con interesse semplice allo stesso tasso, dopo molti anni…`, opzioni: [R`cresce meno`, R`cresce allo stesso modo`, R`cresce di più, perché gli interessi maturano anche sugli interessi`, R`non cresce affatto`], corretta: 2, spiegazione: R`L'interesse semplice è una progressione aritmetica (crescita lineare), quello composto una progressione geometrica con $q>1$ (crescita esponenziale): per $n$ grande, il composto supera sempre il semplice.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Quando incontri una successione, guarda prima se è definita per termine generale o per ricorrenza: cambia completamente il modo di calcolare i termini.` },
    { tipo: 'errore', testo: R`$d$ è la differenza tra un termine e il precedente ($a_{n+1}-a_n$), non un rapporto: non confonderla con la ragione $q$ delle progressioni geometriche.` },
    { tipo: 'trucco', testo: R`Per capire a colpo d'occhio se una successione è aritmetica o geometrica, calcola le differenze ($a_2-a_1$, $a_3-a_2$, …) e i rapporti ($a_2/a_1$, $a_3/a_2$, …): se le differenze sono uguali è aritmetica, se lo sono i rapporti è geometrica.` },
    { tipo: 'errore', testo: R`$n$ nella formula della somma è il numero di termini che stai sommando, non l'ultimo indice: se sommi da $a_5$ ad $a_{12}$ i termini sono $8$, non $12$.` },
    { tipo: 'trucco', testo: R`La somma $S = a_1/(1-q)$ della serie geometrica funziona solo se $|q|<1$: controlla sempre questa condizione prima di usarla.` },
    { tipo: 'metodo', testo: R`Per dimostrare una formula per induzione, scrivi sempre per esteso che cosa dice $P(k)$ e che cosa dice $P(k+1)$: spesso l'errore sta nel confondere i due enunciati.` },
    { tipo: 'errore', testo: R`Con $q$ negativo, i termini di una progressione geometrica cambiano segno a ogni passo: non dare per scontato che siano tutti positivi o tutti negativi.` },
    { tipo: 'trucco', testo: R`Se un problema chiede due numeri di cui conosci somma e prodotto, sono le radici di $x^2 - (\text{somma})x + (\text{prodotto}) = 0$: torna utile anche per problemi su progressioni.` }
  ],

  aneddoti: [
    { matematico: 'Leonardo Fibonacci', anni: '1170–1250 circa', titolo: 'I conigli del Liber Abaci', testo: R`Leonardo da Pisa, detto Fibonacci, viaggiò da ragazzo nel Nord Africa al seguito del padre, mercante, e vi apprese il sistema di numerazione indo-arabo. Tornato in Italia, nel 1202 scrisse il *Liber Abaci*, un libro che mostrava quanto fosse più semplice calcolare con le nuove cifre (0-9) rispetto ai numeri romani. Tra i tanti problemi pratici del libro ce n'era uno curioso: partendo da una coppia di conigli, quante coppie si hanno dopo un anno, se ogni coppia adulta ne genera una nuova ogni mese? La soluzione è la successione $1, 1, 2, 3, 5, 8, 13, \dots$, che oggi porta il suo nome, anche se lui la propose solo come esercizio ricreativo, senza immaginarne l'importanza futura.`, legame: R`La successione nasce esattamente come si è vista qui: definita per ricorrenza, un termine dalla somma dei due precedenti.` },
    { matematico: 'Carl Friedrich Gauss', anni: '1777–1855', titolo: 'Il bambino che sommò fino a cento in un lampo', testo: R`Si racconta che il maestro di un piccolo Gauss, per tenere occupata la classe, avesse assegnato la somma di tutti i numeri da $1$ a $100$. Il bambino alzò la mano dopo pochi istanti, con il risultato esatto: $5050$. Aveva capito che sommando il primo e l'ultimo numero ($1+100$), il secondo e il penultimo ($2+99$), e così via, si ottengono sempre $101$, in $50$ coppie: $50 \times 101 = 5050$. L'aneddoto è probabilmente abbellito nei dettagli (l'età di Gauss, le cifre esatte cambiano a seconda di chi lo racconta), ma il trucco delle coppie è autentico ed è tuttora il modo più elegante per ricordare la formula della somma.`, legame: R`È esattamente la dimostrazione della formula $S_n = (a_1+a_n)n/2$ per la somma di una progressione aritmetica.` },
    { matematico: 'Zenone di Elea', anni: '490–430 a.C. circa', titolo: 'Achille non raggiunge mai la tartaruga', testo: R`Il filosofo greco Zenone propose una serie di paradossi per difendere l'idea, del suo maestro Parmenide, che il movimento fosse un'illusione. Il più famoso: Achille, velocissimo, gareggia con una tartaruga a cui concede un vantaggio. Quando Achille raggiunge il punto di partenza della tartaruga, questa si è già spostata un po' più avanti; quando Achille raggiunge quel nuovo punto, la tartaruga si è spostata ancora, all'infinito. Sembra che Achille non possa mai raggiungerla, eppure sappiamo che nella realtà lo farebbe in pochi secondi. Il paradosso resistette oltre duemila anni, finché la matematica non trovò il modo di sommare infiniti intervalli di tempo (sempre più piccoli) ottenendo un totale finito.`, legame: R`La soluzione moderna è proprio la somma della serie geometrica con $|q|<1$: infiniti termini, ma un totale finito.` },
    { matematico: 'Giuseppe Peano', anni: '1858–1932', titolo: 'Cinque assiomi per fondare i numeri naturali', testo: R`Professore a Torino, Peano si chiese come fondare rigorosamente qualcosa che tutti davano per scontato: i numeri naturali. Nel 1889 pubblicò un sistema di pochi assiomi (tra cui: "$1$ è un numero naturale", "ogni numero naturale ha un successivo", e l'assioma di induzione) da cui si può ricavare tutta l'aritmetica elementare per via puramente logica, senza appoggiarsi all'intuizione. Peano era anche un originale appassionato di linguistica: inventò il *Latino sine Flexione*, un latino semplificato senza declinazioni, sperando diventasse una lingua internazionale, e tenne conferenze in questo idioma lasciando spesso il pubblico interdetto.`, legame: R`L'ultimo dei suoi assiomi è proprio il principio di induzione: la base per dimostrare che una proprietà vale per ogni numero naturale.` },
    { matematico: 'Leggenda indiana (il saggio Sessa)', anni: 'origine incerta, spesso ambientata nel Medioevo', titolo: 'Il chicco di grano sulla scacchiera', testo: R`Si racconta che l'inventore del gioco degli scacchi, per premiare la sua invenzione, avesse chiesto al sovrano un compenso apparentemente modesto: un chicco di grano sulla prima casella della scacchiera, il doppio sulla seconda, il doppio ancora sulla terza, e così via fino alla sessantaquattresima. Il sovrano accettò, ridendo della richiesta, ma i chicchi da versare sull'ultima casella erano già $2^{63}$, e il totale su tutte le $64$ caselle supera i $18$ trilioni di miliardi di chicchi: più grano di quanto se ne sia mai raccolto nella storia dell'umanità. È una leggenda di origine incerta, tramandata in diverse versioni, ma il calcolo che la sostiene è del tutto reale.`, legame: R`È l'esempio più drammatico di progressione geometrica con $q=2$: mostra quanto in fretta esplode una crescita che raddoppia ogni passo.` }
  ]
});
})();
