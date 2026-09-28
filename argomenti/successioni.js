(function () {
const R = String.raw;
/* allenamento: tutte le risposte sono un numero (anche frazione: 1/3) */
const val = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005 });
COMPASSO.registra({
  id: 'successioni',
  titolo: 'Successioni e progressioni',

  introduzione: R`Metti $1000$ euro in banca al $2\%$ all'anno. Dopo un anno hai $1020$ euro. Dopo due anni ne hai $1040{,}40$, dopo tre $1061{,}21$. Questi importi, uno per anno, formano una **successione**: un elenco di numeri in fila che non finisce mai.

Le successioni descrivono le cose che cambiano a passi. Due tipi hanno un nome.

- Nella **progressione aritmetica** a ogni passo aggiungi sempre lo stesso numero.
- Nella **progressione geometrica** a ogni passo moltiplichi sempre per lo stesso numero.

Il conto in banca è una progressione geometrica, perché ogni anno l'importo si moltiplica per $1{,}02$. Ti servono le funzioni e le potenze.`,

  inBreve: [
    R`Una successione è un elenco infinito di numeri in fila: $a_1, a_2, a_3, \dots$. La assegni con una formula in $n$, oppure per ricorrenza: dici come si passa da un termine al successivo.`,
    R`In una progressione **aritmetica** aggiungi sempre la stessa ragione $d$: $a_n = a_1 + (n-1)d$.`,
    R`La somma dei primi $n$ termini di una progressione aritmetica è $S_n = \dfrac{(a_1 + a_n)\,n}{2}$.`,
    R`In una progressione **geometrica** moltiplichi sempre per la ragione $q$: $a_n = a_1 q^{n-1}$.`,
    R`Se $|q| < 1$, la somma di tutti gli infiniti termini della progressione geometrica vale $\dfrac{a_1}{1 - q}$.`,
    R`Il principio di induzione dimostra una proprietà per ogni $n$ in due passi. Controlli che valga per il primo $n$. Poi dimostri che, se vale per $k$, vale anche per $k + 1$.`
  ],

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è una successione', testo: R`In una successione ogni numero ha il suo posto: primo, secondo, terzo… Il numero al posto $n$ si chiama **termine $n$-esimo** e si scrive $a_n$. Nell'elenco $2, 5, 8, 11, \dots$ hai $a_1 = 2$, $a_2 = 5$ e $a_4 = 11$.

>* Una **successione** è una funzione che a ogni numero naturale $n$ associa un numero reale $a_n$. La successione intera si indica con $(a_n)$.

Puoi assegnare una successione in due modi.

**Con il termine generale**, cioè una formula in $n$. Con $a_n = 3n - 1$ il decimo termine è $a_{10} = 3 \cdot 10 - 1 = 29$.

**Per ricorrenza**: dai il primo termine e la regola per passare al successivo. La stessa successione diventa $a_1 = 2$, $a_{n+1} = a_n + 3$. Vuol dire che ogni termine è il precedente più $3$. Per arrivare al decimo, però, devi calcolare tutti quelli prima.

?? Con $a_1 = 2$ e $a_{n+1} = 3a_n - 1$, quanto vale $a_3$?
[x] $14$
[ ] $5$
[ ] $8$
=> Vai un passo alla volta: $a_2 = 3 \cdot 2 - 1 = 5$, poi $a_3 = 3 \cdot 5 - 1 = 14$. Il $5$ è solo il secondo termine. L'$8$ viene da $3 \cdot 3 - 1$: hai messo l'indice al posto del termine precedente.

>! L'indice $n$ è un numero naturale: $a_{2{,}5}$ e $a_{-1}$ non esistono.` },

    { id: 'grafico-monotonia', titolo: 'Grafico, successioni monotone e limitate', testo: R`Il grafico di una successione è fatto di **punti staccati** $(n;\ a_n)$, uno per ogni $n$. I punti non si uniscono, perché fra $n = 3$ e $n = 4$ la successione non esiste.

Dai punti leggi due proprietà.

>* **Monotonia.** $(a_n)$ è **crescente** se $a_{n+1} > a_n$ per ogni $n$. È **decrescente** se $a_{n+1} < a_n$ per ogni $n$. Con $\ge$ o $\le$ si dice non decrescente o non crescente. Se fa sempre la stessa cosa, la successione è **monotona**.

>* **Limitatezza.** $(a_n)$ è **limitata** se tutti i termini stanno fra due numeri fissi: $m \le a_n \le M$ per ogni $n$. Se c'è solo $M$ è limitata superiormente, se c'è solo $m$ inferiormente.

Tre esempi:
- $a_n = \dfrac{1}{n}$ è decrescente e limitata fra $0$ e $1$.
- $a_n = n^2$ è crescente e non limitata.
- $a_n = (-1)^n$ salta fra $-1$ e $1$: non è monotona, ma è limitata.

Per dimostrare che una successione cresce, studia il segno di $a_{n+1} - a_n$. Con $a_n = \dfrac{n}{n+1}$:

~ a_{n+1} - a_n = \dfrac{n+1}{n+2} - \dfrac{n}{n+1} :: il termine dopo meno il termine prima
~ = \dfrac{\evid{(n+1)^2 - n(n+2)}}{(n+1)(n+2)} :: faccio il denominatore comune
~ = \dfrac{\evid{n^2 + 2n + 1 - n^2 - 2n}}{(n+1)(n+2)} :: sviluppo il numeratore
~ = \dfrac{1}{(n+1)(n+2)} \evidb{> 0} :: resta $1$ fratto un numero positivo: ogni termine supera il precedente, la successione è crescente

>! Tre termini che crescono non bastano. La disuguaglianza deve valere per **ogni** $n$, quindi va dimostrata in generale.` },

    { id: 'progressioni-aritmetiche', titolo: 'Le progressioni aritmetiche', testo: R`Una palestra costa $30$ euro di iscrizione più $20$ euro al mese. Dopo $1, 2, 3, \dots$ mesi hai speso $50, 70, 90, \dots$ euro. Ogni volta aggiungi $20$.

>* Una **progressione aritmetica** è una successione in cui ogni termine è il precedente **più** un numero fisso $d$. Il numero $d$ si chiama **ragione**: $a_{n+1} = a_n + d$. Il termine generale è $$a_n = a_1 + (n-1)d.$$

Perché $n - 1$? Da $a_1$ ad $a_n$ ci sono $n - 1$ passi, e ogni passo aggiunge $d$. Per la palestra, dopo un anno: $a_{12} = 50 + 11 \cdot 20 = 270$ euro.

Trascina su e giù i primi due punti, $a_1$ e $a_2$.

[[grafico:progressione-aritmetica]]

Gli altri termini li seguono e restano in fila su una retta, che ha pendenza $d$. Se $d > 0$ la progressione cresce, se $d < 0$ cala.

>! La ragione è la differenza fra un termine e **il precedente**: $d = a_2 - a_1$. Se i due termini che conosci sono lontani, conta i passi fra loro.

?? In una progressione aritmetica $a_3 = 10$ e $a_7 = 22$. Quanto vale $d$?
[x] $3$
[ ] $12$
[ ] $2{,}4$
=> Da $a_3$ ad $a_7$ ci sono $7 - 3 = 4$ passi. In tutto sali di $22 - 10 = 12$, quindi $d = \frac{12}{4} = 3$. Il $12$ è la salita totale, non quella di un passo. Il $2{,}4$ viene dal dividere per $5$: hai contato i termini invece dei passi.` },

    { id: 'somma-aritmetica', titolo: 'La somma di una progressione aritmetica', testo: R`Quanto fa $1 + 2 + 3 + \dots + 100$? Si racconta che Gauss, da bambino, sommò i numeri a coppie: il primo con l'ultimo, il secondo con il penultimo, e così via.

[[animazione:gauss]]

In colonna il trucco è questo:

~ S = 1 + 2 + \dots + 99 + 100 :: la somma che voglio
~ S = \evid{100 + 99 + \dots + 2 + 1} :: la stessa somma, scritta al contrario
~ 2S = \evid{101 + 101 + \dots + 101} :: sommo le due righe in colonna: ogni colonna fa $101$
~ 2S = 100 \cdot 101 :: le colonne sono tante quanti i termini, cioè $100$
~ S = \evidb{5050} :: divido per $2$

In ogni progressione aritmetica succede lo stesso: ogni colonna vale primo più ultimo, cioè $a_1 + a_n$.

>* **Somma dei primi $n$ termini** di una progressione aritmetica: $$S_n = \frac{(a_1 + a_n)\,n}{2}.$$ È la media fra il primo e l'ultimo termine, per il numero dei termini.

Per esempio, somma i primi $10$ termini di $5, 8, 11, \dots$
1. Trova l'ultimo termine: $a_{10} = 5 + 9 \cdot 3 = 32$.
2. Applica la formula: $S_{10} = \dfrac{(5 + 32) \cdot 10}{2} = 185$.

>! Nella formula $n$ è il **numero dei termini** che sommi. Da $a_5$ ad $a_{12}$ i termini sono $12 - 5 + 1 = 8$.

?? Quanti termini ci sono nella somma $a_4 + a_5 + \dots + a_{20}$?
[x] $17$
[ ] $16$
[ ] $20$
=> Fai ultimo indice meno primo indice, **più uno**: $20 - 4 + 1 = 17$. Il $16$ dimentica il $+1$, cioè conta i passi e non i termini. Il $20$ conta anche $a_1, a_2, a_3$, che non ci sono.

### Inserire medi aritmetici

Inserire $k$ **medi aritmetici** fra $a$ e $b$ vuol dire mettere $k$ numeri in mezzo. Tutta la fila deve diventare una progressione aritmetica. La fila ha $k + 2$ termini, quindi da $a$ a $b$ ci sono $k + 1$ passi: $$d = \frac{b - a}{k + 1}.$$

Esempio: $3$ medi fra $2$ e $14$. Hai $d = \dfrac{14 - 2}{4} = 3$, e la fila è $2, 5, 8, 11, 14$.` },

    { id: 'progressioni-geometriche', titolo: 'Le progressioni geometriche', testo: R`Una colonia di batteri raddoppia ogni ora: $100$, $200$, $400$, $800$, … Qui a ogni passo **moltiplichi** sempre per lo stesso numero.

>* Una **progressione geometrica** è una successione in cui ogni termine è il precedente **per** un numero fisso $q \ne 0$. Anche $q$ si chiama **ragione**: $a_{n+1} = a_n \cdot q$, con $a_1 \ne 0$. Il termine generale è $$a_n = a_1 \cdot q^{\,n-1}.$$

L'esponente è $n - 1$ per lo stesso motivo di prima: da $a_1$ ad $a_n$ ci sono $n - 1$ passi. Con $a_1 = 3$ e $q = 2$ hai $3, 6, 12, 24, \dots$ e $a_6 = 3 \cdot 2^5 = 96$.

L'andamento dipende da $q$. Nel grafico $a_1 = 1$, quindi il secondo punto vale proprio $q$. Trascinalo e prova $q > 1$, $0 < q < 1$, $-1 < q < 0$ e $q < -1$.

[[grafico:progressione-geometrica]]

Con $a_1 > 0$ succede questo:

| ragione | i termini… |
|---|---|
| $q > 1$ | crescono sempre più in fretta |
| $q = 1$ | restano tutti uguali |
| $0 < q < 1$ | calano e si avvicinano a $0$, senza arrivarci |
| $-1 < q < 0$ | cambiano segno a ogni passo e si avvicinano a $0$ |
| $q = -1$ | saltano fra $a_1$ e $-a_1$ |
| $q < -1$ | cambiano segno a ogni passo e si allontanano da $0$ |

>! Con $q < 0$ i termini **cambiano segno** a ogni passo. Non sono tutti negativi.

?? Con $a_1 = 3$ e $q = -2$, quanto vale $a_4$?
[x] $-24$
[ ] $24$
[ ] $48$
=> $a_4 = 3 \cdot (-2)^3 = 3 \cdot (-8) = -24$. Tre moltiplicazioni per un negativo danno un negativo. Il $24$ perde il segno. Il $48$ usa l'esponente $4$ invece di $n - 1 = 3$.` },

    { id: 'serie-geometrica', titolo: 'La somma di una progressione geometrica e un cenno alla serie infinita', testo: R`Per sommare una progressione geometrica c'è un altro trucco: moltiplica tutta la somma per $q$. I termini scivolano di un posto e quasi tutti si cancellano.

~ S_n = a_1 + a_1 q + a_1 q^2 + \dots + a_1 q^{n-1} :: la somma dei primi $n$ termini
~ qS_n = \evid{a_1 q + a_1 q^2 + \dots + a_1 q^{n-1}} + a_1 q^n :: moltiplico per $q$: ogni termine diventa il successivo
~ S_n - qS_n = a_1 - a_1 q^n :: sottraggo le due righe: il pezzo evidenziato è uguale in tutte e due e sparisce
~ S_n(1 - q) = a_1(1 - q^n) :: raccolgo $S_n$ a sinistra e $a_1$ a destra
~ S_n = \evidb{a_1 \cdot \dfrac{1 - q^n}{1 - q}} :: divido per $1 - q$, che non è zero se $q \ne 1$

>* **Somma dei primi $n$ termini** di una progressione geometrica con $q \ne 1$: $$S_n = a_1 \cdot \frac{1 - q^n}{1 - q} = a_1 \cdot \frac{q^n - 1}{q - 1}.$$ Se $q = 1$, invece, $S_n = n \cdot a_1$.

Esempio con $a_1 = 3$, $q = 2$ e $n = 6$: $S_6 = 3 \cdot \dfrac{2^6 - 1}{2 - 1} = 3 \cdot 63 = 189$.

### Sommare infiniti termini

Infiniti numeri positivi possono dare una somma finita? Zenone pensava di no, e ne ricavò il paradosso di Achille e la tartaruga.

[[animazione:achille-tartaruga]]

Se $|q| < 1$, la potenza $q^n$ diventa piccolissima al crescere di $n$. Allora $1 - q^n$ si avvicina a $1$, e la somma si avvicina a un numero preciso.

>* Se $|q| < 1$, la somma di **tutti** gli infiniti termini vale $$S = \frac{a_1}{1 - q}.$$ Per esempio $\frac12 + \frac14 + \frac18 + \dots = \dfrac{1/2}{1 - 1/2} = 1$.

Nel grafico vedi le **somme parziali** $S_1, S_2, \dots, S_{15}$ con $a_1 = 1$: la somma del primo termine, dei primi due, e così via. Muovi $q$ e guarda come si avvicinano alla linea tratteggiata, che vale $\frac{1}{1-q}$.

[[grafico:somme-parziali]]

?? Quanto fa $1 + 2 + 4 + 8 + \dots$, sommando tutti gli infiniti termini?
=> Non ha una somma finita, perché i termini crescono. La formula darebbe $\frac{1}{1 - 2} = -1$, un risultato assurdo. Quindi, prima di usare $\frac{a_1}{1-q}$, controlla che $|q| < 1$.

>! $\dfrac{a_1}{1 - q}$ vale **solo** se $|q| < 1$. Con $|q| \ge 1$ la somma infinita non ha un valore finito.` },

    { id: 'fibonacci', titolo: 'La successione di Fibonacci e il rapporto aureo', testo: R`Nel 1202 Leonardo Fibonacci contava le coppie di conigli di un allevamento. Mese dopo mese le coppie erano $1, 1, 2, 3, 5, 8, 13, \dots$ Ogni numero è la somma dei due prima.

>* La **successione di Fibonacci** si definisce per ricorrenza: $F_1 = 1$, $F_2 = 1$ e $F_{n+1} = F_n + F_{n-1}$ per $n \ge 2$. Da $F_3$ in poi ogni termine è la somma dei **due** precedenti.

Qui il termine precedente non basta: ne servono due. Per questo all'inizio si danno due termini. Nell'animazione il lato di ogni quadrato è la somma dei lati dei due quadrati prima.

[[animazione:fibonacci-spirale]]

Fibonacci non è una progressione geometrica, perché il rapporto fra un termine e il precedente cambia. Però si stabilizza: $\frac{8}{5} = 1{,}6$, $\frac{13}{8} = 1{,}625$, $\frac{21}{13} \approx 1{,}615$, $\frac{34}{21} \approx 1{,}619$.

>* Al crescere di $n$, il rapporto $\dfrac{F_{n+1}}{F_n}$ si avvicina al **rapporto aureo** $$\varphi = \frac{1 + \sqrt{5}}{2} \approx 1{,}618.$$` },

    { id: 'induzione', titolo: 'Il principio di induzione', testo: R`Somma i primi numeri dispari: $1 = 1$, $1 + 3 = 4$, $1 + 3 + 5 = 9$, $1 + 3 + 5 + 7 = 16$. Escono i quadrati. Nell'animazione ogni nuovo dispari è una «L» che allarga il quadrato.

[[animazione:somma-dispari]]

La formula $1 + 3 + \dots + (2n - 1) = n^2$ vale per **tutti** gli $n$? Non puoi controllarli uno per uno. Allora usi il **principio di induzione**.

>* **Principio di induzione.** Una proprietà $P(n)$ vale per ogni $n \ge n_0$ se dimostri due cose. La **base**: $P(n_0)$ è vera. Il **passo induttivo**: se $P(k)$ è vera, allora è vera anche $P(k + 1)$.

Pensa a una fila di tessere del domino. La base fa cadere la prima tessera, e il passo induttivo fa cadere ogni tessera dopo una caduta. Quindi cadono tutte.

Per la somma dei dispari la base è $n = 1$: a sinistra c'è $1$, a destra $1^2 = 1$. Nel passo induttivo parti dall'**ipotesi induttiva** $1 + 3 + \dots + (2k - 1) = k^2$ e aggiungi il dispari successivo, $2k + 1$:

~ 1 + 3 + \dots + (2k-1) + (2k+1) :: il primo membro di $P(k+1)$: i primi $k+1$ dispari
~ = \evid{k^2} + (2k+1) :: per l'ipotesi induttiva, i primi $k$ dispari sommano $k^2$
~ = k^2 + 2k + 1 :: tolgo la parentesi
~ = \evidb{(k+1)^2} :: è il quadrato di un binomio: proprio il secondo membro di $P(k+1)$

Base e passo sono dimostrati, quindi la formula vale per ogni $n \ge 1$.

>! Nel passo induttivo dimostri un'implicazione: «**se** vale per $k$, **allora** vale per $k + 1$». Per questo puoi usare $P(k)$: è l'ipotesi.

?? La proprietà «$n = n + 1$» è falsa, ma il passo induttivo funziona: se $k = k + 1$, aggiungendo $1$ ai due membri si ha $k + 1 = k + 2$. Dov'è il trucco?
=> Manca la base: $1 = 2$ è falso. La prima tessera non cade, quindi la catena non parte. Per questo la base va sempre controllata.` },

    { id: 'limite-e-applicazioni', titolo: 'Il comportamento al crescere di n e qualche applicazione', testo: R`### Dove va una successione

Che cosa fanno i termini quando $n$ diventa grandissimo? Ci sono tre possibilità.

- **Convergente**: i termini si avvicinano quanto vuoi a un numero $L$. Scrivi $\lim\limits_{n \to \infty} a_n = L$. Esempio: $a_n = \frac{1}{n}$ converge a $0$.
- **Divergente**: i termini superano qualunque numero, e scrivi $\lim\limits_{n \to \infty} a_n = +\infty$. Se scendono sotto ogni numero, il limite è $-\infty$. Esempio: $a_n = n^2$.
- **Irregolare**: né l'una né l'altra cosa. Esempio: $a_n = (-1)^n$ salta fra $-1$ e $1$.

>* Una progressione geometrica con $|q| < 1$ **converge a $0$**. Con $q > 1$ e $a_1 > 0$ **diverge a $+\infty$**. Con $q \le -1$ è **irregolare**. Una progressione aritmetica con $d \ne 0$ **diverge**: a $+\infty$ se $d > 0$, a $-\infty$ se $d < 0$.

>! Convergere a $0$ non vuol dire arrivare a $0$. Con $q = \frac12$ i termini diventano piccolissimi, ma nessuno vale $0$.

### Interesse semplice e interesse composto

Metti un capitale $C_0$ al tasso annuo $i$. Per esempio $i = 0{,}03$ vuol dire $3\%$.

Con l'**interesse semplice** ogni anno aggiungi lo stesso importo $C_0 \cdot i$. È una progressione **aritmetica**: dopo $n$ anni hai $C_n = C_0(1 + ni)$.

Con l'**interesse composto** gli interessi entrano nel capitale, e l'anno dopo fruttano anche loro. Ogni anno il capitale si moltiplica per $1 + i$. È una progressione **geometrica**: $C_n = C_0(1 + i)^n$.

Con $0 < q < 1$ lo stesso schema descrive le cose che calano, come un farmaco nel sangue. Se a ogni passo ne resta metà, si parla di **dimezzamento**.

?? Un'auto da $20\,000$ euro perde il $15\%$ del suo valore ogni anno. Quanto vale dopo $3$ anni?
[x] $20\,000 \cdot 0{,}85^3 = 12\,282{,}50$ euro
[ ] $20\,000 \cdot (1 - 3 \cdot 0{,}15) = 11\,000$ euro
[ ] $20\,000 \cdot 0{,}15^3 = 67{,}50$ euro
=> Ogni anno resta l'$85\%$. Quindi moltiplichi tre volte per $0{,}85$. Il conto $1 - 3 \cdot 0{,}15$ calcola il $15\%$ sempre sul prezzo **iniziale**. Il conto $0{,}15^3$ usa la parte che si perde.` }
  ],

  grafici: {
    'progressione-aritmetica': {
      tipo: 'piano', x: [0, 9], y: [-15, 15], passo: [1, 5],
      parametri: [
        { nome: 'a1', min: -6, max: 6, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'a2', min: -6, max: 6, passo: 0.5, valore: 3, nascosto: true }
      ],
      punti: [
        { x: 3, y: 'a1 + 2*(a2 - a1)', colore: 1 },
        { x: 4, y: 'a1 + 3*(a2 - a1)', colore: 1 },
        { x: 5, y: 'a1 + 4*(a2 - a1)', colore: 1 },
        { x: 6, y: 'a1 + 5*(a2 - a1)', colore: 1 },
        { x: 7, y: 'a1 + 6*(a2 - a1)', colore: 1 },
        { x: 8, y: 'a1 + 7*(a2 - a1)', colore: 1 }
      ],
      elementi: [
        { tipo: 'retta', m: 'a2 - a1', q: '2*a1 - a2', tratteggio: true, colore: 3 },
        { tipo: 'punto', p: [1, 'a1'], trascina: true, colore: 2, etichetta: 'a₁', posizione: 'sinistra' },
        { tipo: 'punto', p: [2, 'a2'], trascina: true, colore: 2, etichetta: 'a₂', posizione: 'sinistra' },
        { tipo: 'testo', p: [0.3, 13], testo: 'd = {{a2 - a1}} ;  a₈ = {{a1 + 7*(a2 - a1)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina su e giù i primi due termini, a₁ e a₂: gli altri li seguono. Guarda la ragione d e la retta tratteggiata.'
    },
    'progressione-geometrica': {
      tipo: 'piano', x: [0, 9], y: [-3, 3],
      parametri: [
        { nome: 'q', min: -1.5, max: 1.5, passo: 0.05, valore: 0.7, etichetta: 'q' }
      ],
      punti: [
        { x: 1, y: 1, colore: 1 },
        { x: 3, y: 'q^2', colore: 1 },
        { x: 4, y: 'q^3', colore: 1 },
        { x: 5, y: 'q^4', colore: 1 },
        { x: 6, y: 'q^5', colore: 1 },
        { x: 7, y: 'q^6', colore: 1 },
        { x: 8, y: 'q^7', colore: 1 }
      ],
      elementi: [
        { tipo: 'punto', p: [2, 'q'], trascina: true, colore: 2, etichetta: 'a₂ = q', posizione: 'alto' },
        { tipo: 'testo', p: [0.3, 2.6], testo: 'q = {{q}} ;  a₈ = q⁷ = {{q^7}}', ancora: 'start' }
      ],
      didascalia: 'Qui a₁ = 1. Trascina il secondo punto (che vale q) o usa il cursore: prova q > 1, 0 < q < 1, −1 < q < 0 e q < −1.'
    },
    'somme-parziali': {
      tipo: 'piano', x: [0, 16], y: [0, '1.25/(1 - q) + 0.45'], altezza: 330,
      parametri: [
        { nome: 'q', min: -0.8, max: 0.8, passo: 0.05, valore: 0.5, etichetta: 'q' }
      ],
      punti: [
        { x: 1, y: '(1 - q^1)/(1 - q)', colore: 1 },
        { x: 2, y: '(1 - q^2)/(1 - q)', colore: 1 },
        { x: 3, y: '(1 - q^3)/(1 - q)', colore: 1 },
        { x: 4, y: '(1 - q^4)/(1 - q)', colore: 1 },
        { x: 5, y: '(1 - q^5)/(1 - q)', colore: 1 },
        { x: 6, y: '(1 - q^6)/(1 - q)', colore: 1 },
        { x: 7, y: '(1 - q^7)/(1 - q)', colore: 1 },
        { x: 8, y: '(1 - q^8)/(1 - q)', colore: 1 },
        { x: 9, y: '(1 - q^9)/(1 - q)', colore: 1 },
        { x: 10, y: '(1 - q^10)/(1 - q)', colore: 1 },
        { x: 11, y: '(1 - q^11)/(1 - q)', colore: 1 },
        { x: 12, y: '(1 - q^12)/(1 - q)', colore: 1 },
        { x: 13, y: '(1 - q^13)/(1 - q)', colore: 1 },
        { x: 14, y: '(1 - q^14)/(1 - q)', colore: 1 },
        { x: 15, y: '(1 - q^15)/(1 - q)', colore: 1 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: '1/(1 - q)', tratteggio: true, colore: 3 },
        { tipo: 'testo', p: [15.7, '1.25/(1 - q) + 0.12'], testo: 'somma infinita = {{1/(1 - q)}}', ancora: 'end' }
      ],
      didascalia: 'Le somme parziali S₁, S₂, …, S₁₅ di 1 + q + q² + … Muovi q: con q positivo salgono verso la linea tratteggiata, con q negativo le saltano attorno.'
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
      R`I primi cinque termini sono pochi, si possono scrivere: $8, 4, 2, 1, 0{,}5$. Sommati danno $S_5 = 15{,}5$.`,
      R`Controllo con la formula della somma, per essere sicuro: $S_5 = 8 \cdot \dfrac{1 - (1/2)^5}{1 - 1/2} = 8 \cdot \dfrac{31/32}{1/2} = 15{,}5$. ✓`,
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
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Con $a_n = 2n + 1$, calcola $a_5$.`, suggerimenti: [R`Metti $5$ al posto di $n$.`], risposta: val(11), soluzione: [R`Metto $n = 5$ nella formula: $a_5 = 2 \cdot 5 + 1$.`, R`$a_5 = 10 + 1 = 11$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`La progressione aritmetica $3, 7, 11, 15, \dots$ che ragione $d$ ha?`, suggerimenti: [R`Fai un termine meno il precedente.`], risposta: val(4), soluzione: [R`La ragione è un termine meno il precedente: $d = 7 - 3 = 4$.`, R`Controllo: anche $11 - 7 = 4$ e $15 - 11 = 4$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`La progressione geometrica $2, 6, 18, 54, \dots$ che ragione $q$ ha?`, suggerimenti: [R`Dividi un termine per il precedente.`], risposta: val(3), soluzione: [R`La ragione è un termine diviso il precedente: $q = \dfrac{6}{2} = 3$.`, R`Controllo: anche $\dfrac{18}{6} = 3$ e $\dfrac{54}{18} = 3$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Con $a_1 = 5$ e $a_{n+1} = a_n + 2$, calcola $a_3$.`, suggerimenti: [R`Ogni termine è il precedente più $2$. Parti da $a_1$.`], risposta: val(9), soluzione: [R`$a_2 = a_1 + 2 = 5 + 2 = 7$.`, R`$a_3 = a_2 + 2 = 7 + 2 = 9$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Con $a_1 = 2$ e $a_{n+1} = 3a_n$, calcola $a_3$.`, suggerimenti: [R`Ogni termine è il precedente per $3$. Parti da $a_1$.`], risposta: val(18), soluzione: [R`$a_2 = 3 \cdot a_1 = 3 \cdot 2 = 6$.`, R`$a_3 = 3 \cdot a_2 = 3 \cdot 6 = 18$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Progressione aritmetica con $a_1 = 2$ e $d = 3$. Calcola $a_{10}$.`, suggerimenti: [R`Usa $a_n = a_1 + (n-1)d$.`, R`Da $a_1$ ad $a_{10}$ ci sono $9$ passi.`], risposta: val(29), soluzione: [R`Uso $a_n = a_1 + (n-1)d$ con $n = 10$: $a_{10} = 2 + 9 \cdot 3$.`, R`$a_{10} = 2 + 27 = 29$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Progressione geometrica con $a_1 = 3$ e $q = 2$. Calcola $a_5$.`, suggerimenti: [R`Usa $a_n = a_1 \cdot q^{n-1}$.`, R`Per $a_5$ l'esponente è $4$.`], risposta: val(48), soluzione: [R`Uso $a_n = a_1 \cdot q^{n-1}$ con $n = 5$: $a_5 = 3 \cdot 2^4$.`, R`$2^4 = 16$, quindi $a_5 = 3 \cdot 16 = 48$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Progressione aritmetica con $a_1 = 20$ e $d = -4$. Calcola $a_6$.`, suggerimenti: [R`Usa $a_n = a_1 + (n-1)d$. Attento al segno di $d$.`], risposta: val(0), soluzione: [R`Da $a_1$ ad $a_6$ ci sono $5$ passi: $a_6 = 20 + 5 \cdot (-4)$.`, R`$a_6 = 20 - 20 = 0$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Progressione geometrica con $a_1 = 81$ e $q = \dfrac13$. Calcola $a_4$.`, suggerimenti: [R`Moltiplicare per $\frac13$ vuol dire dividere per $3$.`], risposta: val(3), soluzione: [R`Da $a_1$ ad $a_4$ ci sono $3$ passi: $a_4 = 81 \cdot \left(\dfrac13\right)^3 = \dfrac{81}{27}$.`, R`$a_4 = 3$. Controllo: $81, 27, 9, 3$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Progressione aritmetica con $a_1 = 1$ e $a_{10} = 19$. Calcola la somma dei primi $10$ termini.`, suggerimenti: [R`Usa $S_n = \dfrac{(a_1 + a_n)\,n}{2}$.`], risposta: val(100), soluzione: [R`Uso $S_n = \dfrac{(a_1 + a_n)\,n}{2}$ con $n = 10$.`, R`$S_{10} = \dfrac{(1 + 19) \cdot 10}{2} = \dfrac{200}{2} = 100$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Progressione geometrica con $a_1 = 1$ e $q = -2$. Calcola $a_4$.`, suggerimenti: [R`Usa $a_n = a_1 \cdot q^{n-1}$. Attento al segno.`], risposta: val(-8), soluzione: [R`$a_4 = 1 \cdot (-2)^3$.`, R`Tre fattori negativi danno un negativo: $(-2)^3 = -8$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Con $a_1 = 1$ e $a_{n+1} = 2a_n + 1$, calcola $a_4$.`, suggerimenti: [R`Calcola $a_2$, poi $a_3$, poi $a_4$.`], risposta: val(15), soluzione: [R`$a_2 = 2 \cdot 1 + 1 = 3$.`, R`$a_3 = 2 \cdot 3 + 1 = 7$.`, R`$a_4 = 2 \cdot 7 + 1 = 15$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Progressione aritmetica con $a_1 = 3$ e $d = 2$. Calcola la somma dei primi $8$ termini.`, suggerimenti: [R`Prima trova l'ultimo termine, $a_8$.`, R`Poi usa $S_n = \dfrac{(a_1 + a_n)\,n}{2}$.`], risposta: val(80), soluzione: [R`Trovo l'ultimo termine: $a_8 = 3 + 7 \cdot 2 = 17$.`, R`Applico la formula della somma: $S_8 = \dfrac{(3 + 17) \cdot 8}{2}$.`, R`$S_8 = \dfrac{160}{2} = 80$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`In una progressione aritmetica $a_2 = 7$ e $a_5 = 16$. Calcola la ragione $d$.`, suggerimenti: [R`Quanti passi ci sono da $a_2$ ad $a_5$?`, R`Dividi la salita totale per il numero dei passi.`], risposta: val(3), soluzione: [R`Da $a_2$ ad $a_5$ ci sono $5 - 2 = 3$ passi.`, R`In tutto si sale di $16 - 7 = 9$.`, R`Ogni passo vale $d = \dfrac{9}{3} = 3$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Progressione geometrica con $a_1 = 2$ e $q = 3$. Calcola la somma dei primi $4$ termini.`, suggerimenti: [R`Usa $S_n = a_1 \cdot \dfrac{q^n - 1}{q - 1}$.`, R`Oppure scrivi i quattro termini e sommali.`], risposta: val(80), soluzione: [R`Uso la formula con $n = 4$: $S_4 = 2 \cdot \dfrac{3^4 - 1}{3 - 1}$.`, R`$3^4 = 81$, quindi $S_4 = 2 \cdot \dfrac{80}{2} = 80$.`, R`Controllo: $2 + 6 + 18 + 54 = 80$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Con $a_1 = 2$, $a_2 = 3$ e $a_{n+2} = a_{n+1} + a_n$, calcola $a_5$.`, suggerimenti: [R`Ogni termine è la somma dei due precedenti.`, R`$a_3 = 3 + 2 = 5$. Continua.`], risposta: val(13), soluzione: [R`Ogni termine è la somma dei due prima: $a_3 = 3 + 2 = 5$.`, R`$a_4 = 5 + 3 = 8$.`, R`$a_5 = 8 + 5 = 13$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Progressione aritmetica con $a_1 = 5$ e $d = 4$. A quale posto $n$ si trova il termine $41$?`, suggerimenti: [R`Scrivi $41 = 5 + (n-1) \cdot 4$.`, R`Risolvi l'equazione in $n$.`], risposta: val(10), soluzione: [R`Uso il termine generale: $5 + (n-1) \cdot 4 = 41$.`, R`Tolgo $5$: $(n-1) \cdot 4 = 36$, quindi $n - 1 = 9$.`, R`$n = 10$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Progressione geometrica con $a_1 = 3$ e $a_3 = 12$. Calcola la ragione $q$, sapendo che è positiva.`, suggerimenti: [R`Da $a_1$ ad $a_3$ moltiplichi due volte per $q$.`, R`Arrivi a $q^2 = 4$.`], risposta: val(2), soluzione: [R`Da $a_1$ ad $a_3$ ci sono due passi: $a_3 = a_1 \cdot q^2$, cioè $12 = 3q^2$.`, R`Divido per $3$: $q^2 = 4$.`, R`$q$ è positiva, quindi $q = 2$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Calcola $2 + 4 + 6 + \dots + 20$.`, suggerimenti: [R`È una progressione aritmetica con $d = 2$. Quanti termini ha?`, R`I termini sono $10$. Usa $S_n = \dfrac{(a_1 + a_n)\,n}{2}$.`], risposta: val(110), soluzione: [R`È una progressione aritmetica con $a_1 = 2$ e $d = 2$.`, R`Conto i termini: sono i pari da $2$ a $20$, cioè $10$.`, R`$S_{10} = \dfrac{(2 + 20) \cdot 10}{2} = 110$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Progressione geometrica con $a_1 = 1$ e $q = -2$. Calcola la somma dei primi $5$ termini.`, suggerimenti: [R`Scrivi i cinque termini: il segno cambia a ogni passo.`, R`Oppure usa $S_n = a_1 \cdot \dfrac{1 - q^n}{1 - q}$.`], risposta: val(11), soluzione: [R`I termini sono $1, -2, 4, -8, 16$.`, R`Li sommo: $1 - 2 + 4 - 8 + 16 = 11$.`, R`Con la formula: $\dfrac{1 - (-2)^5}{1 - (-2)} = \dfrac{1 + 32}{3} = 11$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Una successione è definita da $a_1 = 3$, $a_{n+1} = a_n + 4$. Quanto vale $a_5$?`, suggerimenti: [R`Calcola i termini uno alla volta, partendo da $a_1$.`, R`$a_2 = 7$, $a_3 = 11$: continua fino a $a_5$.`], risposta: { tipo: 'numero', valore: 19 }, soluzione: [R`$a_1=3$, $a_2=7$, $a_3=11$, $a_4=15$, $a_5=19$.`, R`È una progressione aritmetica di ragione $4$: $a_5 = a_1+4d = 3+4\cdot4=19$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Data $a_n = \dfrac{n}{n+2}$, calcola $a_4$.`, suggerimenti: [R`Sostituisci $n=4$ nella formula.`, R`Non semplificare $n$ con $n+2$: sono legati da un $+2$, non da un fattore comune.`], risposta: { tipo: 'numero', valore: 2/3, tolleranza: 0.005 }, soluzione: [R`$a_4 = \dfrac{4}{4+2} = \dfrac{4}{6} = \dfrac{2}{3} \approx 0{,}667$.`] },
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
    { id: 'q-05', domanda: R`Una successione è limitata se…`, opzioni: [R`esistono $m$ ed $M$ tali che $m \le a_n \le M$ per ogni $n$`, R`è monotona`, R`il suo termine generale è un polinomio`, R`tende a zero`], corretta: 0, spiegazione: R`La limitatezza richiede che i termini restino sempre tra due valori fissati. Non basta essere monotona ($a_n = n$ è crescente e non limitata), e non serve tendere a zero ($a_n = (-1)^n$ è limitata e non tende a niente).` },
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
    { matematico: 'Leggenda indiana (il saggio Sessa)', anni: 'origine incerta, spesso ambientata nel Medioevo', titolo: 'Il chicco di grano sulla scacchiera', testo: R`Si racconta che l'inventore del gioco degli scacchi, per premiare la sua invenzione, avesse chiesto al sovrano un compenso apparentemente modesto: un chicco di grano sulla prima casella della scacchiera, il doppio sulla seconda, il doppio ancora sulla terza, e così via fino alla sessantaquattresima. Il sovrano accettò, ridendo della richiesta, ma i chicchi da versare sull'ultima casella erano già $2^{63}$, e il totale su tutte le $64$ caselle supera i $18$ miliardi di miliardi di chicchi: più grano di quanto se ne sia mai raccolto nella storia dell'umanità. È una leggenda di origine incerta, tramandata in diverse versioni, ma il calcolo che la sostiene è del tutto reale.`, legame: R`È l'esempio più drammatico di progressione geometrica con $q=2$: mostra quanto in fretta esplode una crescita che raddoppia ogni passo.` },
    { matematico: 'Ada Lovelace', anni: '1815–1852', titolo: 'Il primo programma calcolava una successione', testo: R`Ada Lovelace era figlia del poeta Lord Byron, ma crebbe con la madre, che la fece studiare matematica. A diciassette anni conobbe Charles Babbage, che progettava la **macchina analitica**: un calcolatore meccanico a ingranaggi, programmabile con schede perforate. Nel 1843 Ada tradusse dal francese un articolo su quella macchina e ci aggiunse delle note, più lunghe dell'articolo stesso. Nell'ultima, la nota G, spiegava passo per passo come far calcolare alla macchina i **numeri di Bernoulli**. È considerato il primo programma per un calcolatore mai pubblicato. La macchina non fu mai costruita, quindi il programma non girò mai. Ada scrisse anche che una macchina così avrebbe potuto trattare simboli e non solo numeri, per esempio comporre musica: un'idea che sarebbe diventata vera un secolo dopo. La mascotte di questo sito porta il suo nome.`, legame: R`I numeri di Bernoulli si calcolano uno dopo l'altro, ognuno a partire dai precedenti: il programma di Ada seguiva una successione definita per ricorrenza.` }
  ]
});
})();
