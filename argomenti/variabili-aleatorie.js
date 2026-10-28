(function () {
const R = String.raw;
/* risposte dell'allenamento: una probabilità (frazione o decimale) oppure un numero qualunque */
const pr = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: 'es. 3/4 o 0,75', simboli: ['/', '−'] });
const val = (v, tol) => ({ tipo: 'numero', valore: v, tolleranza: tol == null ? 0.01 : tol, segnaposto: 'un numero', simboli: ['−', '/', '√'] });
/* grafici: barre di un istogramma disegnate come poligoni (l'altezza può essere un'espressione con i parametri) */
const barra = (k, h, larg, colore) => ({ tipo: 'poligono', riempi: true, colore: colore || 1, punti: [[k - larg / 2, 0], [k + larg / 2, 0], [k + larg / 2, h], [k - larg / 2, h]] });
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const FATT = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
const daA = (a, b) => { const v = []; for (let k = a; k <= b; k++) v.push(k); return v; };
/* binomiale con n fisso e p parametro: P(X = k) come espressione */
const pBin = (n, k) => binom(n, k) + '*p^' + k + '*(1-p)^' + (n - k);
/* Poisson con λ parametro (si chiama L nelle espressioni) */
const pPoi = k => 'exp(-L)*L^' + k + '/' + FATT[k];
/* Φ(z) approssimata: 1/(1 + e^(−1,5976 z − 0,07056 z³)), errore < 0,0002 (controllato con node) */
const PHI = '1/(1 + exp(-1.5976*z - 0.07056*z^3))';

COMPASSO.registra({
  id: 'variabili-aleatorie',
  titolo: 'Variabili aleatorie',

  introduzione: R`Lanci tre volte una moneta e conti le teste. Prima di lanciare non sai quante saranno: zero, una, due o tre. Sai però quanto è probabile ciascun caso. Un numero che dipende dal caso si chiama **variabile aleatoria**.

Le variabili aleatorie sono dappertutto: i clienti in coda, i pezzi difettosi in una scatola, l'attesa del bus, il peso di una confezione. Per ognuna ti chiedi quali valori può prendere e con che probabilità. Poi quanto vale in media, e quanto si allontana dalla media.

Ti servono la probabilità e il calcolo combinatorio. Per le variabili continue servono anche gli integrali. Le tre distribuzioni di questo argomento sono la binomiale, la Poisson e la normale. Sono quelle che si incontrano più spesso, anche all'esame di Stato.`,

  inBreve: [
    R`Una variabile aleatoria è un numero che dipende dal caso. È **discreta** se i suoi valori si possono elencare, **continua** se riempiono un intervallo.`,
    R`Il valore atteso $E(X) = \sum x_i\, p_i$ è la media dei valori pesata con le probabilità: il baricentro della distribuzione.`,
    R`La varianza misura quanto i valori si allontanano dalla media. Si calcola anche come $E(X^2) - [E(X)]^2$.`,
    R`Binomiale: $E(X) = np$ e $\text{Var}(X) = np(1-p)$. Poisson, per gli eventi rari: $E(X) = \text{Var}(X) = \lambda$.`,
    R`Per una variabile continua la probabilità è un'area sotto la densità. L'area totale è $1$, e un punto solo ha probabilità $0$.`,
    R`Per la normale si standardizza, $Z = \frac{X - \mu}{\sigma}$, e si legge la probabilità sulla tavola di $\Phi$.`
  ],

  sezioni: [
    { id: 'cos-e', titolo: 'Che cos\'è una variabile aleatoria', testo: R`Lanci una moneta tre volte. Gli esiti possibili sono $8$: $TTT$, $TTC$, $TCT$, e così via fino a $CCC$. A te però interessa solo **quante teste** escono. Allora a ogni esito associ un numero: $TTC$ ha $2$ teste, $CCC$ ne ha $0$.

>* Una **variabile aleatoria** $X$ associa un numero reale a ogni esito di un esperimento aleatorio. Il suo valore dipende dal caso.

Qui $X$ è il numero di teste, e può valere $0$, $1$, $2$ o $3$. Prima dei lanci non sai quale valore uscirà. Sai però con che probabilità esce ciascuno.

La scrittura $X = 2$ indica un **evento**: «escono esattamente due teste». È fatto di tre esiti, $TTC$, $TCT$ e $CTT$. Quindi $P(X = 2) = \dfrac{3}{8}$.

Le variabili aleatorie sono di due tipi.

- **Discreta**: i valori sono isolati e si possono elencare. Per esempio il numero di teste, il punteggio di un dado, le chiamate in un'ora.
- **Continua**: i valori riempiono un intervallo. Per esempio l'attesa del bus, l'altezza di una persona, il peso di una mela.

Di solito una variabile discreta **conta** qualcosa, una continua **misura** qualcosa.

?? Quale di queste è una variabile aleatoria continua?
[ ] Il numero di gol in una partita.
[x] La durata di una telefonata.
[ ] Il numero di figli di una famiglia.
[ ] La somma dei punti di due dadi.
=> La durata si misura: può valere $2$ minuti, $2{,}5$ minuti, $2{,}51$ minuti, e così via. Gli altri tre numeri si contano: prendono valori interi, che si possono elencare.

>! $X$ non è un numero fisso: è un numero che aspetta il caso. Le maiuscole come $X$ e $Y$ indicano le variabili, le minuscole come $x_1$ e $x_2$ i loro valori.` },

    { id: 'distribuzione', titolo: 'La distribuzione di probabilità', testo: R`Una variabile discreta si descrive con la sua **distribuzione di probabilità**. È l'elenco dei valori, ognuno con la sua probabilità. Di solito si scrive in una tabella.

Per $X$ = numero di teste in tre lanci, conta gli esiti di ogni valore. Lo $0$ ha un esito solo, $CCC$. L'$1$ ne ha tre: $TCC$, $CTC$, $CCT$.

| $x_i$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| $p_i$ | $\dfrac{1}{8}$ | $\dfrac{3}{8}$ | $\dfrac{3}{8}$ | $\dfrac{1}{8}$ |

>* Una tabella è una distribuzione di probabilità se rispetta due condizioni: ogni $p_i \ge 0$, e la somma di tutte le $p_i$ vale $1$.

La somma vale $1$ perché i valori coprono tutti i casi, senza sovrapporsi. Qui $\dfrac{1 + 3 + 3 + 1}{8} = 1$.

La distribuzione si disegna con un **istogramma**. Su ogni valore c'è una barra alta quanto la sua probabilità. Le barre sono larghe $1$, quindi anche l'area di ogni barra è la sua probabilità.

[[grafico:treMonete]]

Con la tabella calcoli la probabilità di qualunque evento: sommi le barre che ti interessano.

~ P(X \ge 2) = P(X = 2) + P(X = 3) :: «almeno due teste» vuol dire due oppure tre: eventi incompatibili, quindi sommo
~ = \dfrac{3}{8} + \dfrac{1}{8} :: leggo le probabilità nella tabella
~ = \dfrac{4}{8} = \evidb{\dfrac{1}{2}} :: metà dei casi: due o tre teste escono una volta su due

?? In una tabella i valori sono $1$, $2$, $3$, con probabilità $0{,}2$, $k$ e $0{,}5$. Quanto vale $k$?
[x] $0{,}3$
[ ] $0{,}5$
[ ] $0{,}7$
=> Le probabilità sommano a $1$: $0{,}2 + k + 0{,}5 = 1$, quindi $k = 0{,}3$. Con $k = 0{,}7$ la somma supererebbe $1$.

### La funzione di ripartizione

A volte serve la probabilità di stare **sotto** una soglia. La **funzione di ripartizione** è $F(x) = P(X \le x)$: somma le probabilità di tutti i valori fino a $x$. Per le tre monete vale $\dfrac{1}{8}$, $\dfrac{4}{8}$, $\dfrac{7}{8}$ e infine $1$. Il suo grafico è una scala che sale da $0$ a $1$.

[[grafico:ripartizione]]

>! $F$ salta proprio nei valori di $X$, e lì prende già il valore più alto. Per esempio $F(1) = \dfrac{4}{8}$, non $\dfrac{1}{8}$.` },

    { id: 'valore-atteso', titolo: 'Il valore atteso', testo: R`Lanci tre monete tante volte, e ogni volta conti le teste. Quante teste ottieni **in media**? Ogni valore conta tanto quanto è probabile: $1$ e $2$ escono spesso, $0$ e $3$ di rado.

[[video:variabili-aleatorie/valore-atteso]]

>* Il **valore atteso** (o media) di una variabile discreta è $$E(X) = \sum_i x_i\, p_i$$ Si indica anche con $\mu$.

~ E(X) = 0 \cdot \tfrac{1}{8} + 1 \cdot \tfrac{3}{8} + 2 \cdot \tfrac{3}{8} + 3 \cdot \tfrac{1}{8} :: ogni valore per la sua probabilità
~ = \dfrac{0 + 3 + 6 + 3}{8} = \dfrac{12}{8} :: sommo i prodotti
~ = \evidb{1{,}5} :: in media una testa e mezza

Il risultato non è un valore possibile: $1{,}5$ teste non escono mai. È la media su moltissime ripetizioni. Sull'istogramma è il **baricentro**: il punto in cui le barre starebbero in equilibrio su un'asta.

>! Il valore atteso non è il valore più probabile. Con tre monete i più probabili sono $1$ e $2$, e $E(X) = 1{,}5$ sta in mezzo.

### Guadagno atteso e gioco equo

Nell'argomento «Probabilità» hai visto il gioco equo. Con le variabili aleatorie si dice così: se $G$ è il guadagno, il gioco è equo quando $E(G) = 0$.

Paghi $1$ euro e lanci due monete. Con due teste ricevi $3$ euro, con una testa $1$ euro, con nessuna testa niente. Il guadagno $G$ è quello che ricevi meno l'euro pagato.

~ P(G = 2) = \tfrac{1}{4} :: due teste: ricevi $3$ euro, ne hai pagato $1$
~ P(G = 0) = \tfrac{1}{2} :: una testa: ricevi l'euro che hai pagato
~ P(G = -1) = \tfrac{1}{4} :: nessuna testa: perdi l'euro
~ E(G) = 2 \cdot \tfrac{1}{4} + 0 \cdot \tfrac{1}{2} - 1 \cdot \tfrac{1}{4} :: il valore atteso del guadagno
~ = \evidb{0{,}25} :: positivo: in media il giocatore guadagna $25$ centesimi a partita

### Due proprietà

>* Se $a$ e $b$ sono numeri, $E(aX + b) = a\,E(X) + b$. Per due variabili qualsiasi, $E(X + Y) = E(X) + E(Y)$.

Ogni testa vale $2$ euro, e in più ricevi $1$ euro fisso. Con tre monete ricevi in media $2 \cdot 1{,}5 + 1 = 4$ euro.

?? Il punteggio di un dado ha $E(X) = 3{,}5$. Quanto vale il valore atteso della somma di due dadi?
[x] $7$
[ ] $3{,}5$
[ ] $12{,}25$
=> $E(X + Y) = E(X) + E(Y) = 3{,}5 + 3{,}5 = 7$. E $7$ è anche la somma più probabile. $12{,}25$ è $3{,}5^2$: le medie si sommano, non si moltiplicano.` },

    { id: 'varianza', titolo: 'Varianza e deviazione standard', testo: R`Due variabili possono avere la stessa media ed essere molto diverse. Prendi $X$, le teste in tre lanci. Poi prendi una $Y$ con gli stessi valori, ma con le probabilità spostate sui lati: $\dfrac{3}{8}$, $\dfrac{1}{8}$, $\dfrac{1}{8}$, $\dfrac{3}{8}$. Tutte e due hanno media $1{,}5$. Però $Y$ sta più spesso lontano dalla media.

[[grafico:dueVariabili]]

Per misurare quanto i valori sono sparsi, guardi lo **scarto** di ogni valore dalla media, $x_i - \mu$. Poi lo elevi al quadrato e lo pesi con la probabilità, come in statistica.

[[video:variabili-aleatorie/varianza]]

>* La **varianza** è $$\text{Var}(X) = \sum_i (x_i - \mu)^2\, p_i$$ con $\mu = E(X)$. Si scrive anche $\sigma^2$. La **deviazione standard** è la sua radice: $\sigma(X) = \sqrt{\text{Var}(X)}$.

~ x_i - \mu = -1{,}5, \ \ -0{,}5, \ \ 0{,}5, \ \ 1{,}5 :: gli scarti di $0$, $1$, $2$, $3$ dalla media $1{,}5$
~ \text{Var}(X) = 2 \cdot 2{,}25 \cdot \tfrac{1}{8} + 2 \cdot 0{,}25 \cdot \tfrac{3}{8} :: scarti al quadrato, pesati con le probabilità: $0$ e $3$ danno lo stesso termine, e così $1$ e $2$
~ = 0{,}5625 + 0{,}1875 = \evid{0{,}75} :: la varianza
~ \sigma(X) = \sqrt{0{,}75} \approx \evidb{0{,}87} :: la radice riporta all'unità di misura di $X$, cioè alle teste

Con lo stesso conto, per $Y$ viene $\text{Var}(Y) = 1{,}75$ e $\sigma(Y) \approx 1{,}32$. La deviazione standard è più grande: $Y$ è più sparsa.

### La formula rapida

Spesso conviene un'altra strada: la media dei quadrati meno il quadrato della media. È la stessa formula rapida della statistica.

>* $$\text{Var}(X) = E(X^2) - [E(X)]^2$$ dove $E(X^2) = \sum_i x_i^2\, p_i$ è la media dei quadrati.

Per le tre monete $E(X^2) = \dfrac{0 + 3 + 12 + 9}{8} = 3$, e $3 - 1{,}5^2 = 0{,}75$. È lo stesso risultato.

>! $E(X^2)$ e $[E(X)]^2$ sono numeri diversi. Il primo è la media dei quadrati, qui $3$. Il secondo è il quadrato della media, qui $2{,}25$.

>* Se $X$ e $Y$ sono **indipendenti**, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$. Senza indipendenza non vale: per esempio $\text{Var}(X + X) = \text{Var}(2X) = 4\,\text{Var}(X)$.

>* $\text{Var}(aX + b) = a^2\, \text{Var}(X)$. Sommare $b$ sposta tutti i valori ma non li sparpaglia. Moltiplicare per $a$ allarga gli scarti di $a$ volte.

?? Se $\text{Var}(X) = 4$, quanto vale $\text{Var}(3X + 5)$?
[ ] $17$
[ ] $12$
[x] $36$
=> $\text{Var}(3X + 5) = 3^2 \cdot 4 = 36$. Il $+5$ sposta tutti i valori della stessa quantità e non cambia la dispersione. Il $3$ entra al quadrato, perché la varianza lavora con gli scarti al quadrato.` },

    { id: 'binomiale', titolo: 'La distribuzione binomiale', testo: R`Nell'argomento «Probabilità» hai incontrato lo **schema di Bernoulli**: $n$ prove indipendenti, ognuna con due esiti, e la stessa probabilità $p$ di successo. Il numero $X$ di successi è una variabile aleatoria discreta.

>* $X$ ha **distribuzione binomiale** di parametri $n$ e $p$, e si scrive $X \sim B(n, p)$, se $$P(X = k) = \binom{n}{k}\, p^k (1-p)^{n-k}$$ per $k = 0, 1, \dots, n$.

$\binom{n}{k}$ è il coefficiente binomiale del calcolo combinatorio. Conta in quante posizioni possono cadere i $k$ successi.

[[video:variabili-aleatorie/binomiale]]

### Media e varianza

Non serve sommare $n + 1$ prodotti. Guarda una prova alla volta. La prova numero $i$ dà $X_i = 1$ con probabilità $p$, e $X_i = 0$ con probabilità $1 - p$.

~ E(X_i) = 1 \cdot p + 0 \cdot (1-p) = p :: il valore atteso di una prova sola
~ \text{Var}(X_i) = p - p^2 = p(1-p) :: formula rapida, con $E(X_i^2) = p$: infatti $X_i^2 = X_i$, perché $0^2 = 0$ e $1^2 = 1$
~ X = X_1 + X_2 + \dots + X_n :: i successi in tutto sono la somma delle $n$ prove
~ E(X) = \evidb{np}, \quad \text{Var}(X) = \evidb{np(1-p)} :: le medie si sommano sempre; le varianze si sommano perché le prove sono indipendenti

>* Se $X \sim B(n, p)$, allora $$E(X) = np$$ $$\text{Var}(X) = np(1-p)$$ e la deviazione standard è $\sigma(X) = \sqrt{np(1-p)}$.

Nel grafico $n = 10$ e $p$ cambia. La barra più alta resta sempre vicino a $np$.

[[grafico:binomiale10]]

Un quiz ha $8$ domande, ognuna con $4$ risposte di cui una sola giusta. Chi risponde a caso indovina ogni domanda con $p = \dfrac{1}{4}$. Le risposte giuste sono $X \sim B\left(8, \dfrac{1}{4}\right)$.

~ E(X) = 8 \cdot \tfrac{1}{4} = \evid{2} :: in media due risposte giuste
~ \text{Var}(X) = 8 \cdot \tfrac{1}{4} \cdot \tfrac{3}{4} = 1{,}5 :: qui $1 - p = \tfrac{3}{4}$
~ \sigma(X) = \sqrt{1{,}5} \approx \evidb{1{,}22} :: la distanza tipica da $2$

?? Lanci un dado $30$ volte. $X$ è il numero di volte che esce il $6$. Quanto vale $E(X)$?
[ ] $6$
[x] $5$
[ ] $\dfrac{1}{6}$
=> $X \sim B\left(30, \dfrac{1}{6}\right)$, quindi $E(X) = np = 30 \cdot \dfrac{1}{6} = 5$. Il $6$ è il nome della faccia, non entra nel conto. $\dfrac{1}{6}$ è la probabilità di un lancio solo.

>! La binomiale vale solo con prove indipendenti e $p$ costante. Estrarre palline **senza** rimetterle dentro non è uno schema binomiale: $p$ cambia a ogni estrazione.` },

    { id: 'poisson', titolo: 'La distribuzione di Poisson', testo: R`Un centralino riceve in media $2$ chiamate all'ora. Quanto è probabile che in un'ora non chiami nessuno? Dividi l'ora in tanti pezzi piccoli. In ogni pezzo arriva una chiamata con probabilità piccola, e il numero di chiamate è binomiale. Più i pezzi sono piccoli, più la binomiale si avvicina a una forma precisa.

[[video:variabili-aleatorie/poisson]]

>* $X$ ha **distribuzione di Poisson** di parametro $\lambda > 0$ se $$P(X = k) = e^{-\lambda}\,\frac{\lambda^k}{k!}$$ per $k = 0, 1, 2, \dots$ La sua media e la sua varianza valgono tutte e due $\lambda$: $E(X) = \text{Var}(X) = \lambda$.

La Poisson descrive gli **eventi rari**: tante occasioni, ognuna con probabilità piccola. Per esempio i guasti di una macchina in un mese, o i refusi in una pagina. Oppure gli incidenti su una strada in una settimana. Basta conoscere la media $\lambda$.

Un libro ha in media $0{,}5$ refusi per pagina. Qual è la probabilità che una pagina ne abbia almeno due?

~ P(X = 0) = e^{-0{,}5} \approx 0{,}607 :: $\lambda^0 = 1$ e $0! = 1$
~ P(X = 1) = e^{-0{,}5} \cdot 0{,}5 \approx 0{,}303 :: $\lambda^1 = 0{,}5$ e $1! = 1$
~ P(X \ge 2) = 1 - P(X \le 1) :: i valori sono infiniti: passo al contrario
~ \approx 1 - (0{,}607 + 0{,}303) = \evidb{0{,}090} :: circa una pagina su undici

[[grafico:poisson]]

### Quando la binomiale diventa Poisson

>* Con $n$ grande e $p$ piccola, $B(n, p)$ diventa quasi una Poisson con $\lambda = np$.

Una regola pratica: $n \ge 50$ e $np \le 5$. Con $n = 1000$ e $p = 0{,}002$ la binomiale dà $P(X = 0) \approx 0{,}1351$. La Poisson con $\lambda = 2$ dà $0{,}1353$.

?? Le auto che arrivano a un casello in un minuto seguono una Poisson con $\lambda = 4$. Quanto vale la deviazione standard?
[x] $2$
[ ] $4$
[ ] $16$
=> Nella Poisson la varianza è uguale alla media: $\text{Var}(X) = 4$. La deviazione standard è la sua radice, $\sigma = 2$. $16$ è $\lambda^2$.

>! I valori della Poisson non finiscono a un certo $n$: sono $0, 1, 2, \dots$ senza fine. Per «almeno uno» o «almeno due» si passa sempre al contrario.` },

    { id: 'continue', titolo: 'Variabili continue e densità', testo: R`L'attesa del bus può durare $3$ minuti, $3{,}2$, $3{,}21$, e così via. I valori di una variabile continua riempiono un intervallo: non si possono elencare. Allora la probabilità si descrive con una curva, la **densità**.

[[video:variabili-aleatorie/densita]]

>* Una **densità di probabilità** è una funzione con $f(x) \ge 0$ e con area totale sotto il grafico uguale a $1$. La probabilità che $X$ stia fra $a$ e $b$ è l'area sotto la curva fra $a$ e $b$: $$P(a \le X \le b) = \int_a^b f(x)\,dx$$

### Il primo esempio: la uniforme

Un bus passa ogni $10$ minuti e tu arrivi a caso. L'attesa $X$ sta fra $0$ e $10$, e nessun valore è privilegiato. La densità è costante: un rettangolo di base $10$. Perché l'area sia $1$, l'altezza è $\dfrac{1}{10}$.

[[grafico:uniforme]]

~ P(2 \le X \le 5) = \text{base} \cdot \text{altezza} :: l'area di un rettangolo: qui l'integrale non serve
~ = (5 - 2) \cdot \tfrac{1}{10} :: la base va da $2$ a $5$, l'altezza è la densità
~ = \dfrac{3}{10} = \evidb{0{,}3} :: tre volte su dieci aspetti fra $2$ e $5$ minuti

>* **Uniforme** su $\Icc{a}{b}$: $f(x) = \dfrac{1}{b - a}$ dentro l'intervallo, $0$ fuori. Media e varianza sono $$E(X) = \frac{a + b}{2}$$ $$\text{Var}(X) = \frac{(b - a)^2}{12}$$

### Un punto solo ha probabilità zero

Quanto vale $P(X = 5)$? Sopra un punto c'è un segmento, non un rettangolo, e un segmento ha area $0$.

>* Per una variabile continua $P(X = a) = 0$ per ogni $a$. Quindi $P(a \le X \le b) = P(a < X < b)$: gli estremi non contano.

?? $X$ è uniforme su $\Icc{0}{10}$. Quanto vale $P(X = 4)$?
[x] $0$
[ ] $\dfrac{1}{10}$
[ ] $\dfrac{4}{10}$
=> Sopra il solo punto $4$ c'è un segmento, che ha area zero. $\dfrac{1}{10}$ è il valore della densità, non una probabilità. $\dfrac{4}{10}$ è $P(X \le 4)$.

### Densità curve

Se la densità è una curva, l'area si calcola con un integrale. Nel grafico c'è la densità $f(x) = \dfrac{3}{32}x(4 - x)$ fra $0$ e $4$. Fra $1$ e $2$ l'area vale $\dfrac{11}{32} \approx 0{,}34$.

[[grafico:densita]]

Anche il valore atteso si calcola come per le discrete: la somma diventa un integrale, $E(X) = \int x\,f(x)\,dx$.

### La funzione di ripartizione

Anche per una variabile continua $F(x) = P(X \le x)$. Ora è l'area sotto la densità a sinistra di $x$:

>* $$F(x) = \int_{-\infty}^{x} f(t)\,dt$$ e quindi $$P(a \le X \le b) = F(b) - F(a)$$

Per l'attesa del bus $F(x) = \dfrac{x}{10}$ fra $0$ e $10$. Quindi $P(2 \le X \le 5) = \dfrac{5}{10} - \dfrac{2}{10} = 0{,}3$, come prima. Una continua ha una $F$ senza salti, che sale da $0$ a $1$. La $\Phi$ della tavola della normale è proprio la $F$ della normale standard.

>! La densità non è una probabilità: $f(x)$ può superare $1$. La uniforme su $\Icc{0}{0{,}5}$, per esempio, vale $2$. È l'**area** che sta sempre fra $0$ e $1$.` },

    { id: 'normale', titolo: 'La distribuzione normale', testo: R`Nell'argomento «Statistica» hai visto la **campana** di Gauss: è la forma di altezze, pesi ed errori di misura. Come variabile aleatoria si chiama **normale**. È la variabile continua più importante.

>* $X$ ha distribuzione **normale** di media $\mu$ e deviazione standard $\sigma$ se ha densità $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}}$$ Si scrive $X \sim N(\mu, \sigma)$; allora $E(X) = \mu$ e $\text{Var}(X) = \sigma^2$.

>! Alcuni libri scrivono $N(\mu, \sigma^2)$, con la varianza al secondo posto. Prima di calcolare, controlla quale dei due numeri ti danno.

La curva ha quattro proprietà da ricordare:

- è simmetrica rispetto alla retta $x = \mu$, dove ha il massimo;
- ha due flessi, in $x = \mu - \sigma$ e in $x = \mu + \sigma$;
- ai due lati si avvicina all'asse $x$, senza toccarlo;
- l'area sotto la curva vale $1$: metà a sinistra di $\mu$, metà a destra.

Vale la regola della statistica. Fra $\mu - \sigma$ e $\mu + \sigma$ c'è circa il $68\%$ della probabilità. Entro $2\sigma$ dalla media circa il $95\%$, entro $3\sigma$ circa il $99{,}7\%$.

?? Il peso delle confezioni di pasta è normale, con media $500$ g e deviazione standard $4$ g. Circa quante confezioni su $100$ pesano fra $492$ e $508$ g?
[ ] circa $68$
[x] circa $95$
[ ] circa $99$
=> $492$ e $508$ distano $8$ g dalla media, cioè $2\sigma$. Entro $2\sigma$ sta circa il $95\%$ della probabilità. Il $68\%$ vale entro un solo $\sigma$, fra $496$ e $504$ g.

### Dalla binomiale alla normale

Con molte prove, l'istogramma di una binomiale ha già la forma di una campana. Si avvicina alla normale con la stessa media e la stessa deviazione standard.

>* Se $np \ge 5$ e $n(1-p) \ge 5$, allora $B(n, p)$ si approssima con la normale $$N\left(np, \sqrt{np(1-p)}\right)$$

Nel grafico $n = 20$ e $p$ cambia. Con $p$ vicino a $0{,}5$ la campana copre bene le barre. Con $p = 0{,}1$ l'istogramma è storto, e la campana no.

[[grafico:binomialeNormale]]

La macchina di Galton mostra la stessa cosa con le palline. A ogni chiodo la pallina va a destra o a sinistra, con probabilità $\dfrac{1}{2}$. Le palline si ammucchiano a campana.

[[animazione:galton]]

> Le approssimazioni della binomiale sono due. Con $p$ piccola e $np$ piccolo si usa la Poisson. Con $np$ e $n(1-p)$ tutti e due grandi si usa la normale.` },

    { id: 'standardizzazione', titolo: 'Standardizzare e usare la tavola', testo: R`Le normali sono infinite, una per ogni coppia $\mu$, $\sigma$. Le loro aree non si calcolano con le primitive elementari. Però basta una tabella sola: quella della normale **standard**, con media $0$ e deviazione standard $1$.

>* **Standardizzazione.** Se $X \sim N(\mu, \sigma)$, allora $$Z = \frac{X - \mu}{\sigma}$$ è normale standard: $Z \sim N(0, 1)$. Il numero $z$ dice di quante deviazioni standard un valore si allontana dalla media.

La **tavola** dà $\Phi(z) = P(Z \le z)$, l'area a sinistra di $z$, per $z \ge 0$. Ecco alcuni valori.

| $z$ | $\Phi(z)$ |
|---|---|
| $0$ | $0{,}5000$ |
| $0{,}5$ | $0{,}6915$ |
| $1$ | $0{,}8413$ |
| $1{,}5$ | $0{,}9332$ |
| $1{,}96$ | $0{,}9750$ |
| $2$ | $0{,}9772$ |
| $2{,}5$ | $0{,}9938$ |
| $3$ | $0{,}9987$ |

Per le altre aree bastano la simmetria della campana e l'evento contrario.

>* Le tre regole della tavola: $$P(Z > z) = 1 - \Phi(z)$$ $$\Phi(-z) = 1 - \Phi(z)$$ $$P(a \le Z \le b) = \Phi(b) - \Phi(a)$$

[[grafico:normaleZ]]

Il peso $X$ delle confezioni di pasta è normale, con media $500$ g e deviazione standard $4$ g. Quante confezioni pesano meno di $494$ g?

~ z = \dfrac{494 - 500}{4} = -1{,}5 :: $494$ g sta $1{,}5$ deviazioni standard sotto la media
~ P(X < 494) = P(Z < -1{,}5) :: lo stesso evento, scritto con $Z$
~ = \Phi(-1{,}5) = 1 - \Phi(1{,}5) :: la tavola ha solo gli $z$ positivi: uso la simmetria
~ = 1 - 0{,}9332 = \evidb{0{,}0668} :: circa $7$ confezioni su $100$

?? Sempre con media $500$ g e deviazione standard $4$ g, quanto vale $P(494 \le X \le 510)$?
[ ] $0{,}0606$
[x] $0{,}9270$
[ ] $0{,}9938$
=> Standardizzo i due estremi: $z = -1{,}5$ e $z = \dfrac{510 - 500}{4} = 2{,}5$. Allora $P = \Phi(2{,}5) - \Phi(-1{,}5) = 0{,}9938 - 0{,}0668 = 0{,}9270$. $0{,}0606$ dimentica il segno meno di $-1{,}5$. $0{,}9938$ dimentica di togliere l'area a sinistra.

>! Disegna sempre la campana e colora l'area che cerchi. Così vedi subito se il risultato deve stare sopra o sotto $0{,}5$.` }
  ],

  grafici: {
    treMonete: {
      tipo: 'piano', x: [-0.8, 3.8], y: [-0.07, 0.47], altezza: 300,
      proporzioni: 'libere', griglia: false, assi: false,
      elementi: [
        barra(0, 1 / 8, 1), barra(1, 3 / 8, 1), barra(2, 3 / 8, 1), barra(3, 1 / 8, 1),
        { tipo: 'testo', p: [0, 0.155], testo: '1/8' },
        { tipo: 'testo', p: [1, 0.405], testo: '3/8' },
        { tipo: 'testo', p: [2, 0.405], testo: '3/8' },
        { tipo: 'testo', p: [3, 0.155], testo: '1/8' },
        { tipo: 'segmento', da: [-0.7, 0], a: [3.7, 0] },
        { tipo: 'testo', p: [0, -0.045], testo: '0' },
        { tipo: 'testo', p: [1, -0.045], testo: '1' },
        { tipo: 'testo', p: [2, -0.045], testo: '2' },
        { tipo: 'testo', p: [3, -0.045], testo: '3' }
      ],
      didascalia: 'X = numero di teste in tre lanci. Ogni barra è larga 1 e alta quanto la probabilità del suo valore: l\'area di ogni barra è la probabilità, e le quattro aree insieme fanno 1.'
    },
    ripartizione: {
      tipo: 'piano', x: [-1.5, 4.5], y: [-0.12, 1.15], passo: [1, 0.5], altezza: 300,
      proporzioni: 'libere', etichette: { x: 'x', y: 'F(x)' },
      elementi: [
        { tipo: 'segmento', da: [-1.5, 0], a: [0, 0], colore: 1 },
        { tipo: 'segmento', da: [0, 0.125], a: [1, 0.125], colore: 1 },
        { tipo: 'segmento', da: [1, 0.5], a: [2, 0.5], colore: 1 },
        { tipo: 'segmento', da: [2, 0.875], a: [3, 0.875], colore: 1 },
        { tipo: 'segmento', da: [3, 1], a: [4.5, 1], colore: 1 },
        { tipo: 'testo', p: [0.5, 0.2], testo: '1/8' },
        { tipo: 'testo', p: [1.5, 0.575], testo: '4/8' },
        { tipo: 'testo', p: [2.5, 0.95], testo: '7/8' }
      ],
      punti: [
        { x: 0, y: 0, vuoto: true }, { x: 0, y: 0.125 },
        { x: 1, y: 0.125, vuoto: true }, { x: 1, y: 0.5 },
        { x: 2, y: 0.5, vuoto: true }, { x: 2, y: 0.875 },
        { x: 3, y: 0.875, vuoto: true }, { x: 3, y: 1 }
      ],
      didascalia: 'La funzione di ripartizione F(x) = P(X ≤ x) per le teste in tre lanci. Sale a gradini nei valori 0, 1, 2, 3: il pallino pieno dice quanto vale F proprio lì, quello vuoto il valore che non prende.'
    },
    dueVariabili: {
      tipo: 'barre', categorie: ['0', '1', '2', '3'], valori_visibili: false,
      serie: [
        { nome: 'X', valori: [1 / 8, 3 / 8, 3 / 8, 1 / 8], colore: 1 },
        { nome: 'Y', valori: [3 / 8, 1 / 8, 1 / 8, 3 / 8], colore: 2 }
      ],
      etichettaX: 'valore', etichettaY: 'probabilità',
      didascalia: 'X (blu) e Y (arancio): stessi valori e stessa media 1,5. Le probabilità di X sono 1/8, 3/8, 3/8, 1/8; quelle di Y sono 3/8, 1/8, 1/8, 3/8. Y mette più probabilità sui valori lontani da 1,5: è più sparsa.'
    },
    binomiale10: {
      tipo: 'piano', x: [-0.8, 10.8], y: [-0.05, 0.5], altezza: 360,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'p', min: 0.1, max: 0.9, passo: 0.05, valore: 0.5, etichetta: 'probabilità di successo p' }],
      elementi: daA(0, 10).map(k => barra(k, pBin(10, k), 0.8)).concat(
        [{ tipo: 'segmento', da: [-0.7, 0], a: [10.7, 0] }],
        daA(0, 10).map(k => ({ tipo: 'testo', p: [k, -0.03], testo: String(k) })),
        [
          { tipo: 'segmento', da: ['10*p', 0], a: ['10*p', 0.43], tratteggio: true, colore: 2 },
          { tipo: 'testo', p: [-0.6, 0.47], testo: 'n = 10    E(X) = np = {{10*p}}    σ = {{sqrt(10*p*(1-p))}}', ancora: 'start' }
        ]),
      didascalia: 'La binomiale B(10, p): una barra per ogni numero k di successi. La linea arancione tratteggiata segna la media np: la barra più alta le resta sempre vicino. Con p = 0,5 l\'istogramma è simmetrico, con p piccola ha la coda a destra.'
    },
    poisson: {
      tipo: 'piano', x: [-0.8, 10.8], y: [-0.08, 0.76], altezza: 360,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'L', min: 0.5, max: 6, passo: 0.1, valore: 0.5, etichetta: 'media λ' }],
      elementi: daA(0, 10).map(k => barra(k, pPoi(k), 0.8, 3)).concat(
        [{ tipo: 'segmento', da: [-0.7, 0], a: [10.7, 0] }],
        daA(0, 10).map(k => ({ tipo: 'testo', p: [k, -0.045], testo: String(k) })),
        [
          { tipo: 'segmento', da: ['L', 0], a: ['L', 0.55], tratteggio: true, colore: 2 },
          { tipo: 'testo', p: [-0.6, 0.71], testo: 'λ = {{L}}    P(X = 0) ≈ {{100*exp(-L)}} %    σ = {{sqrt(L)}}', ancora: 'start' }
        ]),
      didascalia: 'La distribuzione di Poisson, disegnata per k da 0 a 10: con λ vicino a 6 restano fuori, oltre il 10, alcune barre basse. Con λ = 0,5 sono i refusi per pagina: la barra di k = 0 è la più alta. Più λ cresce, più la montagna si sposta a destra e si allarga, perché la varianza è λ.'
    },
    uniforme: {
      tipo: 'piano', x: [-1.5, 12.5], y: [-0.03, 0.17], passo: [2, 0.05], altezza: 260,
      proporzioni: 'libere', etichette: { x: 'x', y: 'f' },
      funzioni: [{ f: '0.1', colore: 1, dominio: [0, 10] }],
      elementi: [
        { tipo: 'area', f: '0.1', da: 2, a: 5, etichetta: '0,3', colore: 2 },
        { tipo: 'segmento', da: [-1.5, 0], a: [0, 0], colore: 1 },
        { tipo: 'segmento', da: [10, 0], a: [11.5, 0], colore: 1 }
      ],
      didascalia: 'L\'attesa del bus, uniforme fra 0 e 10 minuti: la densità vale 1/10 dentro l\'intervallo e 0 fuori. Il rettangolo arancione va da 2 a 5: la sua area, 3 · 1/10 = 0,3, è la probabilità di aspettare fra 2 e 5 minuti.'
    },
    densita: {
      tipo: 'piano', x: [-0.4, 4.6], y: [-0.06, 0.48], passo: [1, 0.1], altezza: 320,
      proporzioni: 'libere', etichette: { x: 'x', y: 'f(x)' },
      parametri: [
        { nome: 'a', min: 0, max: 2, passo: 0.1, valore: 1, etichetta: 'estremo a' },
        { nome: 'b', min: 2, max: 4, passo: 0.1, valore: 2, etichetta: 'estremo b' }
      ],
      funzioni: [{ f: '3/32*x*(4 - x)', colore: 1, dominio: [0, 4] }],
      elementi: [
        { tipo: 'area', f: '3/32*x*(4 - x)', da: 'a', a: 'b', colore: 1 },
        { tipo: 'testo', p: [2, 0.44], testo: 'P(a ≤ X ≤ b) = {{((6*b^2 - b^3) - (6*a^2 - a^3))/32}}' }
      ],
      didascalia: 'La densità f(x) = 3/32 · x(4 − x) fra 0 e 4: l\'area colorata fra a e b è la probabilità che X cada fra a e b. Con a = 1 e b = 2 vale 11/32 ≈ 0,34; con a = 0 e b = 4 vale 1; con a = b = 2 l\'area sparisce e la probabilità è 0.'
    },
    binomialeNormale: {
      tipo: 'piano', x: [-0.8, 20.8], y: [-0.05, 0.36], altezza: 340,
      proporzioni: 'libere', griglia: false, assi: false,
      parametri: [{ nome: 'p', min: 0.1, max: 0.9, passo: 0.05, valore: 0.5, etichetta: 'probabilità di successo p' }],
      funzioni: [{ f: 'exp(-(x - 20*p)^2/(40*p*(1-p)))/sqrt(40*pi*p*(1-p))', colore: 2, dominio: [-0.8, 20.8] }],
      elementi: daA(0, 20).map(k => barra(k, pBin(20, k), 1)).concat(
        [{ tipo: 'segmento', da: [-0.7, 0], a: [20.7, 0] }],
        daA(0, 10).map(k => ({ tipo: 'testo', p: [2 * k, -0.03], testo: String(2 * k) })),
        [{ tipo: 'testo', p: [-0.6, 0.33], testo: 'np = {{20*p}}    n(1 − p) = {{20*(1-p)}}', ancora: 'start' }]),
      didascalia: 'Le barre sono la binomiale B(20, p); la curva arancione è la normale con la stessa media np e la stessa deviazione standard √(np(1 − p)). Quando np e n(1 − p) superano 5 le due quasi coincidono; con p = 0,1 o 0,9 la campana non segue più l\'istogramma, che è storto.'
    },
    normaleZ: {
      tipo: 'piano', x: [-3.6, 3.6], y: [-0.05, 0.5], passo: [1, 0.1], altezza: 320,
      proporzioni: 'libere', etichette: { x: 'z', y: '' },
      parametri: [{ nome: 'z', min: -3, max: 3, passo: 0.05, valore: 1, etichetta: 'z' }],
      funzioni: [{ f: 'exp(-x^2/2)/sqrt(2*pi)', colore: 1 }],
      elementi: [
        { tipo: 'area', f: 'exp(-x^2/2)/sqrt(2*pi)', da: -3.6, a: 'z', colore: 1 },
        { tipo: 'verticale', x: 'z', tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [-3.4, 0.45], testo: 'Φ({{z}}) ≈ {{100*' + PHI + '}} %', ancora: 'start' }
      ],
      didascalia: 'La normale standard: l\'area colorata a sinistra di z è Φ(z) = P(Z ≤ z), qui scritta in percentuale. Con z = 0 l\'area è metà, il 50%; con z = 1 è circa l\'84%; con z = −1 è circa il 16%, cioè 100% − 84%.'
    }
  },

  esempi: [
    { titolo: 'Distribuzione, media e varianza', problema: R`Un'urna contiene $2$ palline rosse e $3$ blu. Ne estrai $2$ senza rimetterle dentro. $X$ è il numero di palline rosse estratte. Trova la distribuzione di $X$, il valore atteso e la deviazione standard.`, passi: [
      R`I valori possibili sono $0$, $1$, $2$. Le coppie di palline sono $\binom{5}{2} = 10$, tutte ugualmente probabili.`,
      R`$X = 0$: due blu, $\binom{3}{2} = 3$ coppie, quindi $P(X = 0) = \frac{3}{10}$. $X = 2$: due rosse, una sola coppia, $P(X = 2) = \frac{1}{10}$.`,
      R`$X = 1$: una rossa e una blu, $2 \cdot 3 = 6$ coppie, $P(X = 1) = \frac{6}{10}$. Controllo: $\frac{3 + 6 + 1}{10} = 1$.`,
      R`Valore atteso: $E(X) = 0 \cdot \frac{3}{10} + 1 \cdot \frac{6}{10} + 2 \cdot \frac{1}{10} = 0{,}8$.`,
      R`Formula rapida: $E(X^2) = 1 \cdot \frac{6}{10} + 4 \cdot \frac{1}{10} = 1$. Allora $\text{Var}(X) = 1 - 0{,}8^2 = 0{,}36$ e $\sigma(X) = 0{,}6$.`,
      R`Non è una binomiale: senza rimessa la probabilità di pescare rosso cambia dopo la prima estrazione.`
    ], risultato: R`$P(X = 0) = 0{,}3$, $P(X = 1) = 0{,}6$, $P(X = 2) = 0{,}1$; $E(X) = 0{,}8$, $\sigma(X) = 0{,}6$` },

    { titolo: 'Il guadagno atteso di un\'assicurazione', problema: R`Un'assicurazione sul telefono costa $25$ euro all'anno. In un anno il telefono viene rubato con probabilità $0{,}02$, e allora la compagnia paga $500$ euro. Si rompe con probabilità $0{,}05$, e allora paga $100$ euro. Quanto guadagna in media la compagnia su ogni contratto?`, passi: [
      R`Sia $X$ quanto paga la compagnia: $500$ con probabilità $0{,}02$, $100$ con probabilità $0{,}05$, $0$ negli altri casi, cioè con probabilità $0{,}93$.`,
      R`$E(X) = 500 \cdot 0{,}02 + 100 \cdot 0{,}05 + 0 \cdot 0{,}93 = 10 + 5 = 15$ euro.`,
      R`Il guadagno della compagnia è $G = 25 - X$. Per la proprietà $E(aX + b) = a\,E(X) + b$, con $a = -1$ e $b = 25$: $E(G) = 25 - 15 = 10$ euro.`,
      R`Su un singolo contratto la compagnia può anche perdere $475$ euro. Ma su migliaia di contratti guadagna in media $10$ euro l'uno: per lei il gioco non è equo, e lo sa.`
    ], risultato: R`$E(G) = 10$ euro a contratto` },

    { titolo: 'Una binomiale: i semi che non germogliano', problema: R`Il $10\%$ dei semi di una bustina non germoglia, indipendentemente dagli altri. Pianti $20$ semi. $X$ è il numero di semi che non germogliano. Trova media e deviazione standard di $X$, e la probabilità che non germogli al massimo un seme.`, passi: [
      R`Ogni seme è una prova con due esiti, $p = 0{,}1$ è costante e le prove sono indipendenti. Quindi $X$ è binomiale, con $n = 20$ e $p = 0{,}1$.`,
      R`$E(X) = np = 20 \cdot 0{,}1 = 2$. $\text{Var}(X) = np(1-p) = 2 \cdot 0{,}9 = 1{,}8$, quindi $\sigma(X) = \sqrt{1{,}8} \approx 1{,}34$.`,
      R`«Al massimo uno» vuol dire $X = 0$ oppure $X = 1$. $P(X = 0) = 0{,}9^{20} \approx 0{,}1216$.`,
      R`$P(X = 1) = \binom{20}{1} \cdot 0{,}1 \cdot 0{,}9^{19} = 2 \cdot 0{,}9^{19} \approx 0{,}2702$.`,
      R`$P(X \le 1) \approx 0{,}1216 + 0{,}2702 = 0{,}3918$: in circa $4$ bustine su $10$ al massimo un seme non germoglia.`
    ], risultato: R`$E(X) = 2$, $\sigma(X) \approx 1{,}34$, $P(X \le 1) \approx 0{,}392$` },

    { titolo: 'Una Poisson: gli incidenti in una settimana', problema: R`Su un tratto di strada avvengono in media $1{,}5$ incidenti a settimana. Usa la distribuzione di Poisson. Qual è la probabilità che in una settimana ce ne siano almeno $3$?`, passi: [
      R`Gli incidenti sono eventi rari e indipendenti, con media costante: $X$ segue una Poisson con $\lambda = 1{,}5$.`,
      R`$P(X = 0) = e^{-1{,}5} \approx 0{,}2231$.`,
      R`$P(X = 1) = e^{-1{,}5} \cdot 1{,}5 \approx 0{,}3347$. $\quad P(X = 2) = e^{-1{,}5} \cdot \frac{1{,}5^2}{2} \approx 0{,}2510$.`,
      R`«Almeno $3$» ha infiniti casi, quindi passo al contrario: $P(X \ge 3) = 1 - (0{,}2231 + 0{,}3347 + 0{,}2510) = 1 - 0{,}8088$.`,
      R`$P(X \ge 3) \approx 0{,}191$: circa una settimana su cinque.`
    ], risultato: R`$P(X \ge 3) \approx 0{,}191$` },

    { titolo: 'Una densità con un parametro', problema: R`La funzione $f(x) = k(2 - x)$ per $0 \le x \le 2$, e $f(x) = 0$ altrove, è la densità di una variabile continua $X$. Trova $k$, poi $P(X \le 1)$ e $E(X)$.`, passi: [
      R`L'area totale deve valere $1$. Il grafico è un triangolo di base $2$ e altezza $f(0) = 2k$, quindi l'area è $\frac{2 \cdot 2k}{2} = 2k$. Da $2k = 1$ viene $k = \frac{1}{2}$.`,
      R`$P(X \le 1) = \int_0^1 \frac{1}{2}(2 - x)\,dx = \frac{1}{2}\left[2x - \frac{x^2}{2}\right]_0^1 = \frac{1}{2} \cdot \frac{3}{2} = \frac{3}{4}$.`,
      R`Controllo con la geometria: fra $1$ e $2$ resta un triangolo di base $1$ e altezza $f(1) = \frac{1}{2}$, area $\frac{1}{4}$. E $1 - \frac{1}{4} = \frac{3}{4}$.`,
      R`$E(X) = \int_0^2 x \cdot \frac{1}{2}(2 - x)\,dx = \frac{1}{2}\left[x^2 - \frac{x^3}{3}\right]_0^2 = \frac{1}{2}\left(4 - \frac{8}{3}\right) = \frac{2}{3}$.`,
      R`La media sta a sinistra di $1$, il centro dell'intervallo: la densità è più alta vicino a $0$, e lì si concentra la probabilità.`
    ], risultato: R`$k = \frac{1}{2}$, $P(X \le 1) = \frac{3}{4}$, $E(X) = \frac{2}{3}$` },

    { titolo: 'La normale con la tavola', problema: R`I tempi di una gara di corsa seguono una normale con $\mu = 50$ s e $\sigma = 5$ s. Trova la probabilità che un atleta impieghi meno di $45$ s, e quella che impieghi fra $45$ e $60$ s. Poi trova il tempo superato solo dal $2{,}5\%$ degli atleti.`, passi: [
      R`$45$ s standardizzato: $z = \frac{45 - 50}{5} = -1$. Allora $P(X < 45) = \Phi(-1) = 1 - \Phi(1) = 1 - 0{,}8413 = 0{,}1587$.`,
      R`$60$ s standardizzato: $z = \frac{60 - 50}{5} = 2$. Allora $P(45 \le X \le 60) = \Phi(2) - \Phi(-1) = 0{,}9772 - 0{,}1587 = 0{,}8185$.`,
      R`Ora il problema è rovesciato: si conosce l'area e si cerca $z$. A destra deve restare $0{,}025$, quindi $\Phi(z) = 0{,}975$.`,
      R`Sulla tavola $\Phi(1{,}96) = 0{,}9750$: $z = 1{,}96$. Si torna a $X$ con $x = \mu + z\sigma = 50 + 1{,}96 \cdot 5 = 59{,}8$ s.`,
      R`Controllo con la regola del $95\%$: entro $2\sigma$ dalla media sta circa il $95\%$, e $1{,}96$ è appena sotto $2$.`
    ], risultato: R`$P(X < 45) \approx 0{,}159$; $P(45 \le X \le 60) \approx 0{,}819$; il tempo cercato è $59{,}8$ s` }
  ],

  formulario: [
    { nome: 'Distribuzione di una variabile discreta', formula: R`p_i \ge 0, \qquad \sum_i p_i = 1`, nota: R`Il primo controllo su ogni tabella.` },
    { nome: 'Valore atteso (discreta)', formula: R`\mu = E(X) = \sum_i x_i\, p_i`, nota: R`La media dei valori pesata con le probabilità: il baricentro dell'istogramma.` },
    { nome: 'Varianza (definizione)', formula: R`\text{Var}(X) = \sum_i (x_i - \mu)^2\, p_i`, nota: R`Si scrive anche $\sigma^2$. Non è mai negativa.` },
    { nome: 'Varianza (formula rapida)', formula: R`\text{Var}(X) = E(X^2) - [E(X)]^2`, nota: R`Media dei quadrati meno quadrato della media.` },
    { nome: 'Deviazione standard', formula: R`\sigma(X) = \sqrt{\text{Var}(X)}`, nota: R`Ha la stessa unità di misura di $X$.` },
    { nome: 'Trasformazioni lineari e somme', formula: R`\begin{gathered} E(aX + b) = a\,E(X) + b \\ \text{Var}(aX + b) = a^2\, \text{Var}(X) \\ \text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) \end{gathered}`, nota: R`$E(X + Y) = E(X) + E(Y)$ vale sempre; la regola della varianza della somma solo se $X$ e $Y$ sono indipendenti.` },
    { nome: 'Binomiale', formula: R`\begin{gathered} P(X = k) = \binom{n}{k} p^k (1-p)^{n-k} \\ E(X) = np \qquad \text{Var}(X) = np(1-p) \end{gathered}`, nota: R`$n$ prove indipendenti, $p$ costante, $k = 0, 1, \dots, n$.` },
    { nome: 'Poisson', formula: R`\begin{gathered} P(X = k) = e^{-\lambda}\frac{\lambda^k}{k!} \\ E(X) = \text{Var}(X) = \lambda \end{gathered}`, nota: R`Eventi rari, $k = 0, 1, 2, \dots$ Approssima $B(n, p)$ con $\lambda = np$ se $n$ è grande e $p$ è piccola.` },
    { nome: 'Densità e probabilità', formula: R`\begin{gathered} P(a \le X \le b) = \int_a^b f(x)\,dx \\ \int_{-\infty}^{+\infty} f(x)\,dx = 1 \end{gathered}`, nota: R`Con $f(x) \ge 0$. Per una continua $P(X = a) = 0$.` },
    { nome: 'Valore atteso (continua)', formula: R`E(X) = \int_{-\infty}^{+\infty} x\, f(x)\,dx`, nota: R`La somma delle discrete diventa un integrale.` },
    { nome: 'Uniforme su [a, b]', formula: R`\begin{gathered} f(x) = \frac{1}{b - a} \\ E(X) = \frac{a + b}{2} \qquad \text{Var}(X) = \frac{(b - a)^2}{12} \end{gathered}`, nota: R`Densità costante dentro $\Icc{a}{b}$, nulla fuori.` },
    { nome: 'Normale', formula: R`f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}}`, nota: R`Media $\mu$, deviazione standard $\sigma$; simmetrica rispetto a $x = \mu$, flessi in $\mu \pm \sigma$.` },
    { nome: 'Standardizzazione', formula: R`Z = \frac{X - \mu}{\sigma} \sim N(0, 1)`, nota: R`$z$ conta quante deviazioni standard separano un valore dalla media.` },
    { nome: 'Uso della tavola', formula: R`\begin{gathered} \Phi(-z) = 1 - \Phi(z) \\ P(a \le Z \le b) = \Phi(b) - \Phi(a) \end{gathered}`, nota: R`$\Phi(z) = P(Z \le z)$ è l'area a sinistra di $z$. Inoltre $P(Z > z) = 1 - \Phi(z)$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'cos-e', tipo: 'definizione', fronte: R`Variabile aleatoria`, retro: R`Una funzione che associa un numero reale a ogni esito di un esperimento aleatorio: un numero che dipende dal caso.` },
    { id: 'fc-02', sezione: 'cos-e', tipo: 'concetto', fronte: R`Variabile aleatoria discreta e continua`, retro: R`Discreta: valori isolati che si possono elencare (di solito conta). Continua: valori che riempiono un intervallo (di solito misura).` },
    { id: 'fc-03', sezione: 'distribuzione', tipo: 'definizione', fronte: R`Distribuzione di probabilità di una variabile discreta`, retro: R`L'elenco dei valori $x_i$ con le loro probabilità $p_i$, con $p_i \ge 0$ e $\sum p_i = 1$.` },
    { id: 'fc-04', sezione: 'distribuzione', tipo: 'definizione', fronte: R`Funzione di ripartizione`, retro: R`$F(x) = P(X \le x)$. Per una discreta è una scala che sale da $0$ a $1$, con un gradino in ogni valore di $X$.` },
    { id: 'fc-05', sezione: 'valore-atteso', tipo: 'formula', fronte: R`Valore atteso di una variabile discreta`, retro: R`$E(X) = \sum_i x_i\, p_i$: ogni valore per la sua probabilità, poi la somma.` },
    { id: 'fc-06', sezione: 'valore-atteso', tipo: 'concetto', fronte: R`Che cosa rappresenta il valore atteso?`, retro: R`La media su moltissime ripetizioni, il baricentro dell'istogramma. Può non essere un valore possibile: in tre lanci $E(X) = 1{,}5$ teste.` },
    { id: 'fc-07', sezione: 'valore-atteso', tipo: 'formula', fronte: R`Valore atteso di $aX + b$ e di $X + Y$`, retro: R`$E(aX + b) = a\,E(X) + b$; $\ E(X + Y) = E(X) + E(Y)$.` },
    { id: 'fc-08', sezione: 'valore-atteso', tipo: 'concetto', fronte: R`Quando un gioco è equo, con le variabili aleatorie?`, retro: R`Quando il guadagno $G$ del giocatore ha valore atteso nullo: $E(G) = 0$.` },
    { id: 'fc-09', sezione: 'varianza', tipo: 'formula', fronte: R`Varianza e deviazione standard`, retro: R`$\text{Var}(X) = \sum_i (x_i - \mu)^2 p_i$, con $\mu = E(X)$; $\ \sigma(X) = \sqrt{\text{Var}(X)}$.` },
    { id: 'fc-10', sezione: 'varianza', tipo: 'formula', fronte: R`Formula rapida della varianza`, retro: R`$\text{Var}(X) = E(X^2) - [E(X)]^2$, con $E(X^2) = \sum_i x_i^2 p_i$.` },
    { id: 'fc-11', sezione: 'varianza', tipo: 'formula', fronte: R`Varianza di $aX + b$`, retro: R`$\text{Var}(aX + b) = a^2\, \text{Var}(X)$: $b$ non conta, $a$ entra al quadrato.` },
    { id: 'fc-12', sezione: 'binomiale', tipo: 'definizione', fronte: R`Distribuzione binomiale $B(n, p)$`, retro: R`Il numero di successi in $n$ prove indipendenti con probabilità $p$ costante: $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$.` },
    { id: 'fc-13', sezione: 'binomiale', tipo: 'formula', fronte: R`Media e varianza della binomiale`, retro: R`$E(X) = np$, $\ \text{Var}(X) = np(1-p)$, $\ \sigma(X) = \sqrt{np(1-p)}$.` },
    { id: 'fc-14', sezione: 'binomiale', tipo: 'concetto', fronte: R`Quando non si può usare la binomiale?`, retro: R`Quando le prove non sono indipendenti o $p$ cambia: per esempio nelle estrazioni senza rimessa.` },
    { id: 'fc-15', sezione: 'poisson', tipo: 'definizione', fronte: R`Distribuzione di Poisson`, retro: R`$P(X = k) = e^{-\lambda}\dfrac{\lambda^k}{k!}$ per $k = 0, 1, 2, \dots$, con $E(X) = \text{Var}(X) = \lambda$.` },
    { id: 'fc-16', sezione: 'poisson', tipo: 'concetto', fronte: R`Che cosa descrive la Poisson?`, retro: R`Gli eventi rari e indipendenti, con media costante: guasti, refusi, incidenti, chiamate in un intervallo di tempo.` },
    { id: 'fc-17', sezione: 'poisson', tipo: 'procedura', fronte: R`Quando si approssima la binomiale con la Poisson?`, retro: R`Con $n$ grande e $p$ piccola (per esempio $n \ge 50$ e $np \le 5$), usando $\lambda = np$.` },
    { id: 'fc-18', sezione: 'continue', tipo: 'definizione', fronte: R`Densità di probabilità`, retro: R`Una funzione $f(x) \ge 0$ con area totale $1$. $P(a \le X \le b) = \int_a^b f(x)\,dx$, l'area sotto la curva.` },
    { id: 'fc-19', sezione: 'continue', tipo: 'concetto', fronte: R`Quanto vale $P(X = a)$ per una variabile continua?`, retro: R`Zero: sopra un punto l'area è nulla. Per questo $P(a \le X \le b) = P(a < X < b)$.` },
    { id: 'fc-20', sezione: 'continue', tipo: 'formula', fronte: R`Distribuzione uniforme su $\Icc{a}{b}$`, retro: R`$f(x) = \dfrac{1}{b - a}$ dentro l'intervallo; $E(X) = \dfrac{a + b}{2}$, $\ \text{Var}(X) = \dfrac{(b - a)^2}{12}$.` },
    { id: 'fc-21', sezione: 'normale', tipo: 'definizione', fronte: R`Le proprietà della curva normale $N(\mu, \sigma)$`, retro: R`Simmetrica rispetto a $x = \mu$, dove ha il massimo; flessi in $\mu \pm \sigma$; asintoto $y = 0$; area totale $1$.` },
    { id: 'fc-22', sezione: 'normale', tipo: 'concetto', fronte: R`La regola 68 - 95 - 99,7`, retro: R`Per una normale, entro $1\sigma$ dalla media sta circa il $68\%$ della probabilità, entro $2\sigma$ il $95\%$, entro $3\sigma$ il $99{,}7\%$.` },
    { id: 'fc-23', sezione: 'normale', tipo: 'procedura', fronte: R`Quando si approssima la binomiale con la normale?`, retro: R`Quando $np \ge 5$ e $n(1-p) \ge 5$: $B(n, p) \approx N\left(np, \sqrt{np(1-p)}\right)$.` },
    { id: 'fc-24', sezione: 'standardizzazione', tipo: 'formula', fronte: R`Standardizzazione`, retro: R`$Z = \dfrac{X - \mu}{\sigma}$ trasforma $X \sim N(\mu, \sigma)$ nella normale standard $N(0, 1)$.` },
    { id: 'fc-25', sezione: 'standardizzazione', tipo: 'procedura', fronte: R`Come si leggono sulla tavola le aree che non sono $\Phi(z)$ con $z \ge 0$?`, retro: R`$\Phi(-z) = 1 - \Phi(z)$; $\ P(Z > z) = 1 - \Phi(z)$; $\ P(a \le Z \le b) = \Phi(b) - \Phi(a)$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`$X$ vale $1$, $2$, $3$, $4$, con probabilità $k$, $2k$, $3k$, $4k$. Quanto vale $k$?`, suggerimenti: [R`Le probabilità di tutti i valori sommano a $1$.`, R`$k + 2k + 3k + 4k = 10k$.`], risposta: pr(0.1), soluzione: [R`$k + 2k + 3k + 4k = 1$, cioè $10k = 1$.`, R`Quindi $k = 0{,}1$, e le probabilità sono $0{,}1$, $0{,}2$, $0{,}3$, $0{,}4$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Lanci due monete. $X$ è il numero di teste. Quanto vale $P(X = 1)$?`, suggerimenti: [R`Elenca gli esiti: $TT$, $TC$, $CT$, $CC$.`], risposta: pr(0.5), soluzione: [R`Gli esiti sono $4$, tutti con probabilità $\frac{1}{4}$.`, R`Una testa sola esce con $TC$ e $CT$: $P(X = 1) = \frac{2}{4} = \frac{1}{2}$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`$X$ vale $1$, $2$ o $3$, con probabilità $0{,}1$, $0{,}6$ e $0{,}3$. Quanto vale $P(X \ge 2)$?`, suggerimenti: [R`$X \ge 2$ vuol dire $X = 2$ oppure $X = 3$.`], risposta: pr(0.9), soluzione: [R`$P(X \ge 2) = P(X = 2) + P(X = 3) = 0{,}6 + 0{,}3 = 0{,}9$.`, R`Oppure con il contrario: $1 - P(X = 1) = 1 - 0{,}1 = 0{,}9$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`$X$ vale $2$, $4$ o $6$, con probabilità $0{,}5$, $0{,}3$ e $0{,}2$. Calcola $E(X)$.`, suggerimenti: [R`Moltiplica ogni valore per la sua probabilità, poi somma.`], risposta: val(3.4), soluzione: [R`$E(X) = 2 \cdot 0{,}5 + 4 \cdot 0{,}3 + 6 \cdot 0{,}2$.`, R`$= 1 + 1{,}2 + 1{,}2 = 3{,}4$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Un dado ha quattro facce, numerate da $1$ a $4$, tutte ugualmente probabili. Qual è il valore atteso del punteggio?`, suggerimenti: [R`Ogni faccia ha probabilità $\frac{1}{4}$.`], risposta: val(2.5), soluzione: [R`$E(X) = (1 + 2 + 3 + 4) \cdot \frac{1}{4} = \frac{10}{4}$.`, R`$E(X) = 2{,}5$: un valore che il dado non può dare.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`$X$ vale $0$ oppure $4$, ognuno con probabilità $\frac{1}{2}$. Calcola $\text{Var}(X)$ con la definizione.`, suggerimenti: [R`Prima trova la media.`, R`Gli scarti dalla media sono $-2$ e $2$.`], risposta: val(4), soluzione: [R`$\mu = 0 \cdot \frac{1}{2} + 4 \cdot \frac{1}{2} = 2$.`, R`$\text{Var}(X) = (0 - 2)^2 \cdot \frac{1}{2} + (4 - 2)^2 \cdot \frac{1}{2} = 2 + 2 = 4$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Sai che $E(X) = 2$ ed $E(X^2) = 7$. Quanto vale $\text{Var}(X)$?`, suggerimenti: [R`Usa la formula rapida: media dei quadrati meno quadrato della media.`], risposta: val(3), soluzione: [R`$\text{Var}(X) = E(X^2) - [E(X)]^2 = 7 - 2^2$.`, R`$\text{Var}(X) = 3$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Se $E(X) = 5$, quanto vale $E(2X + 3)$?`, suggerimenti: [R`$E(aX + b) = a\,E(X) + b$.`], risposta: val(13), soluzione: [R`$E(2X + 3) = 2 \cdot 5 + 3 = 13$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Se $\text{Var}(X) = 2$, quanto vale $\text{Var}(3X)$?`, suggerimenti: [R`Il numero che moltiplica $X$ entra al quadrato.`], risposta: val(18), soluzione: [R`$\text{Var}(3X) = 3^2 \cdot \text{Var}(X) = 9 \cdot 2 = 18$.`] },
    { id: 'b-10', livello: 'base', difficolta: 2, testo: R`Paghi $1$ euro e lanci un dado: se esce $6$ ricevi $6$ euro, altrimenti niente. Quanto vale il guadagno atteso?`, suggerimenti: [R`Il guadagno è quello che ricevi meno l'euro pagato.`, R`Con il $6$ guadagni $5$ euro, negli altri casi perdi $1$ euro.`], risposta: val(0), soluzione: [R`$G = 5$ con probabilità $\frac{1}{6}$, $G = -1$ con probabilità $\frac{5}{6}$.`, R`$E(G) = 5 \cdot \frac{1}{6} - 1 \cdot \frac{5}{6} = 0$: il gioco è equo.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Lanci una moneta $4$ volte. Qual è la probabilità di ottenere esattamente $2$ teste?`, suggerimenti: [R`È una binomiale con $n = 4$ e $p = \frac{1}{2}$.`, R`$P(X = 2) = \binom{4}{2} \left(\frac{1}{2}\right)^2 \left(\frac{1}{2}\right)^2$.`], risposta: pr(0.375), soluzione: [R`$\binom{4}{2} = 6$ e $\left(\frac{1}{2}\right)^4 = \frac{1}{16}$.`, R`$P(X = 2) = \frac{6}{16} = 0{,}375$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`$X$ è binomiale con $n = 3$ e $p = 0{,}2$. Quanto vale $P(X = 0)$?`, suggerimenti: [R`Nessun successo: tre insuccessi di fila, ognuno con probabilità $0{,}8$.`], risposta: pr(0.512), soluzione: [R`$P(X = 0) = \binom{3}{0} \cdot 0{,}2^0 \cdot 0{,}8^3$.`, R`$= 1 \cdot 1 \cdot 0{,}512 = 0{,}512$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Lanci una moneta $50$ volte. Qual è il valore atteso del numero di teste?`, suggerimenti: [R`Per una binomiale $E(X) = np$.`], risposta: val(25), soluzione: [R`$n = 50$ e $p = \frac{1}{2}$.`, R`$E(X) = 50 \cdot \frac{1}{2} = 25$.`] },
    { id: 'b-14', livello: 'base', difficolta: 1, testo: R`$X$ è binomiale con $n = 100$ e $p = 0{,}1$. Quanto vale la deviazione standard $\sigma(X)$?`, suggerimenti: [R`Prima la varianza: $np(1-p)$.`], risposta: val(3), soluzione: [R`$\text{Var}(X) = 100 \cdot 0{,}1 \cdot 0{,}9 = 9$.`, R`$\sigma(X) = \sqrt{9} = 3$.`] },
    { id: 'b-15', livello: 'base', difficolta: 1, testo: R`Una binomiale ha $n = 800$ e $p = 0{,}005$. Si approssima con una Poisson: quanto vale $\lambda$?`, suggerimenti: [R`Il parametro della Poisson è la media della binomiale.`], risposta: val(4), soluzione: [R`$\lambda = np = 800 \cdot 0{,}005 = 4$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`$X$ segue una Poisson con $\lambda = 3$. Quanto vale $P(X = 0)$?`, suggerimenti: [R`$P(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}$, e con $k = 0$ resta solo $e^{-\lambda}$.`], risposta: pr(Math.exp(-3)), soluzione: [R`$P(X = 0) = e^{-3} \cdot \frac{3^0}{0!} = e^{-3}$.`, R`$e^{-3} \approx 0{,}0498$: circa $5\%$.`] },
    { id: 'b-17', livello: 'base', difficolta: 1, testo: R`$X$ segue una Poisson con $\lambda = 1$. Quanto vale $P(X = 1)$?`, suggerimenti: [R`Con $\lambda = 1$ le potenze di $\lambda$ valgono tutte $1$.`], risposta: pr(Math.exp(-1)), soluzione: [R`$P(X = 1) = e^{-1} \cdot \frac{1^1}{1!} = e^{-1}$.`, R`$e^{-1} \approx 0{,}368$.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`$X$ è uniforme su $\Icc{0}{20}$. Quanto vale $P(X \le 5)$?`, suggerimenti: [R`La densità vale $\frac{1}{20}$: la probabilità è l'area di un rettangolo.`], risposta: pr(0.25), soluzione: [R`Il rettangolo ha base $5$ e altezza $\frac{1}{20}$.`, R`$P(X \le 5) = 5 \cdot \frac{1}{20} = 0{,}25$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`$X$ è normale con $\mu = 60$ e $\sigma = 5$. Standardizza il valore $x = 70$: quanto vale $z$?`, suggerimenti: [R`$z = \frac{x - \mu}{\sigma}$.`], risposta: val(2), soluzione: [R`$z = \frac{70 - 60}{5} = 2$.`, R`$70$ sta due deviazioni standard sopra la media.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Sulla tavola leggi $\Phi(1) = 0{,}8413$. Quanto vale $P(Z > 1)$?`, suggerimenti: [R`$\Phi(1)$ è l'area a sinistra di $1$. Ti serve quella a destra.`], risposta: pr(0.1587), soluzione: [R`$P(Z > 1) = 1 - \Phi(1)$.`, R`$= 1 - 0{,}8413 = 0{,}1587$.`] },

    { id: 'es-01', difficolta: 2, testo: R`La variabile continua $X$ ha densità $f(x) = 2x$ per $0 \le x \le 1$, e $f(x) = 0$ altrove. Trova la funzione di ripartizione $F(x)$ per $0 \le x \le 1$, poi usala per calcolare $P(0{,}5 \le X \le 0{,}8)$.`, suggerimenti: [R`$F(x) = \int_0^x f(t)\,dt$: a sinistra di $0$ la densità vale zero.`, R`$P(a \le X \le b) = F(b) - F(a)$.`], risposta: pr(0.39), soluzione: [R`Controllo che sia una densità: $f(x) \ge 0$ e $\int_0^1 2x\,dx = \left[x^2\right]_0^1 = 1$.`, R`Per $0 \le x \le 1$: $F(x) = \int_0^x 2t\,dt = \left[t^2\right]_0^x = x^2$. Fuori, $F(x) = 0$ per $x < 0$ e $F(x) = 1$ per $x > 1$.`, R`$P(0{,}5 \le X \le 0{,}8) = F(0{,}8) - F(0{,}5) = 0{,}64 - 0{,}25 = 0{,}39$.`] },
    { id: 'es-02', difficolta: 2, testo: R`$X$ vale $0$, $1$, $2$ con probabilità $a$, $0{,}5$, $b$. Sai che $E(X) = 1{,}2$. Trova $a$ e $b$ (scrivi $a$ e $b$ in quest'ordine, separati da punto e virgola).`, suggerimenti: [R`Hai due condizioni: la somma delle probabilità e il valore atteso.`, R`Il valore atteso dà $0{,}5 + 2b = 1{,}2$.`], risposta: { tipo: 'numeri', valori: [0.15, 0.35], ordinati: true, segnaposto: 'es. 0,1; 0,4', simboli: [';'] }, soluzione: [R`$E(X) = 0 \cdot a + 1 \cdot 0{,}5 + 2b = 1{,}2$, quindi $2b = 0{,}7$ e $b = 0{,}35$.`, R`Dalla somma: $a + 0{,}5 + 0{,}35 = 1$, quindi $a = 0{,}15$.`, R`Tutte e due sono fra $0$ e $1$: la distribuzione va bene.`] },
    { id: 'es-03', difficolta: 2, testo: R`Una lotteria vende $1000$ biglietti a $2$ euro l'uno. Mette in palio un premio da $500$ euro e quattro premi da $100$ euro. Qual è il guadagno atteso di chi compra un biglietto?`, suggerimenti: [R`Calcola prima il valore atteso della vincita.`, R`Il guadagno è la vincita meno i $2$ euro del biglietto.`], risposta: val(-1.1), soluzione: [R`La vincita $V$ vale $500$ con probabilità $\frac{1}{1000}$, $100$ con probabilità $\frac{4}{1000}$, $0$ altrimenti.`, R`$E(V) = \frac{500}{1000} + \frac{400}{1000} = 0{,}9$ euro.`, R`$E(G) = E(V) - 2 = -1{,}1$ euro: in media chi gioca perde $1{,}10$ euro a biglietto.`] },
    { id: 'es-04', difficolta: 2, testo: R`Un tiratore colpisce il bersaglio con probabilità $0{,}3$, e i tiri sono indipendenti. Tira $5$ volte. Qual è la probabilità che colpisca almeno $2$ volte?`, suggerimenti: [R`$X \sim B(5, p)$ con $p = 0{,}3$.`, R`Passa al contrario: $1 - P(X = 0) - P(X = 1)$.`], risposta: pr(1 - Math.pow(0.7, 5) - 5 * 0.3 * Math.pow(0.7, 4)), soluzione: [R`$P(X = 0) = 0{,}7^5 \approx 0{,}1681$.`, R`$P(X = 1) = \binom{5}{1} \cdot 0{,}3 \cdot 0{,}7^4 = 1{,}5 \cdot 0{,}2401 \approx 0{,}3602$.`, R`$P(X \ge 2) = 1 - 0{,}1681 - 0{,}3602 \approx 0{,}472$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Una variabile binomiale ha media $6$ e varianza $4{,}2$. Trova $n$ e $p$ (scrivi $n$ e $p$ in quest'ordine, separati da punto e virgola).`, suggerimenti: [R`$np = 6$ e $np(1-p) = 4{,}2$.`, R`Dividi la seconda uguaglianza per la prima.`], risposta: { tipo: 'numeri', valori: [20, 0.3], ordinati: true, segnaposto: 'es. 10; 0,5', simboli: [';'] }, soluzione: [R`$\frac{np(1-p)}{np} = \frac{4{,}2}{6}$, cioè $1 - p = 0{,}7$.`, R`Quindi $p = 0{,}3$, e da $np = 6$ viene $n = \frac{6}{0{,}3} = 20$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Una macchina ha in media $1{,}2$ guasti al mese, secondo una Poisson. Qual è la probabilità che in un mese abbia almeno $2$ guasti?`, suggerimenti: [R`$\lambda = 1{,}2$. I valori sono infiniti: passa al contrario.`, R`$P(X \ge 2) = 1 - P(X = 0) - P(X = 1)$.`], risposta: pr(1 - Math.exp(-1.2) * 2.2), soluzione: [R`$P(X = 0) = e^{-1{,}2} \approx 0{,}3012$.`, R`$P(X = 1) = e^{-1{,}2} \cdot 1{,}2 \approx 0{,}3614$.`, R`$P(X \ge 2) = 1 - e^{-1{,}2}(1 + 1{,}2) \approx 1 - 0{,}6626 = 0{,}337$: un mese su tre circa.`] },
    { id: 'es-07', difficolta: 2, testo: R`In una fabbrica ogni pezzo è difettoso con probabilità $0{,}002$, indipendentemente dagli altri. Una scatola contiene $1500$ pezzi. Con l'approssimazione di Poisson, qual è la probabilità che la scatola contenga al massimo un pezzo difettoso?`, suggerimenti: [R`$n$ è grande e $p$ è piccola: $\lambda = np$.`, R`«Al massimo uno» vuol dire $X = 0$ oppure $X = 1$.`], risposta: pr(Math.exp(-3) * 4), soluzione: [R`$\lambda = 1500 \cdot 0{,}002 = 3$.`, R`$P(X \le 1) = e^{-3} + e^{-3} \cdot 3 = 4e^{-3}$.`, R`$4e^{-3} \approx 0{,}199$. La binomiale esatta dà $0{,}1988$: l'approssimazione è ottima.`] },
    { id: 'es-08', difficolta: 2, testo: R`Un treno parte a un orario uniforme fra le $10{:}10$ e le $10{:}30$. Misura il tempo in minuti dopo le $10$: $X$ è uniforme su $\Icc{10}{30}$. Trova $E(X)$ e la deviazione standard $\sigma(X)$ (scrivi la deviazione standard).`, suggerimenti: [R`Per la uniforme $\text{Var}(X) = \frac{(b - a)^2}{12}$.`], risposta: val(Math.sqrt(400 / 12), 0.05), soluzione: [R`$E(X) = \frac{10 + 30}{2} = 20$: in media il treno parte alle $10{:}20$.`, R`$\text{Var}(X) = \frac{20^2}{12} = \frac{100}{3} \approx 33{,}3$.`, R`$\sigma(X) = \sqrt{\frac{100}{3}} = \frac{10}{\sqrt{3}} \approx 5{,}77$ minuti.`] },
    { id: 'es-09', difficolta: 3, testo: R`*Problema in stile seconda prova.* La variabile continua $X$ ha densità $f(x) = kx^2$ per $0 \le x \le 3$, e $f(x) = 0$ altrove.

a) Trova $k$.
b) Calcola $P(X \le 2)$.
c) Calcola $E(X)$.
d) Calcola la probabilità che $X$ superi la sua media, e commenta il risultato.

Scrivi $k$, $P(X \le 2)$ ed $E(X)$ in quest'ordine, separati da punto e virgola.`, suggerimenti: [R`L'area totale sotto la densità deve valere $1$: $\int_0^3 kx^2\,dx = 1$.`, R`Una primitiva di $kx^2$ è $\frac{k x^3}{3}$. Per la media integra $x \cdot f(x) = kx^3$.`, R`Per d): $P(X > E(X)) = \int_{E(X)}^{3} f(x)\,dx$.`], risposta: { tipo: 'numeri', valori: [1 / 9, 8 / 27, 9 / 4], ordinati: true, tolleranza: 0.005, segnaposto: 'es. 1/3; 0,5; 2', simboli: [';', '/'] }, soluzione: [R`a) $\int_0^3 kx^2\,dx = k\left[\frac{x^3}{3}\right]_0^3 = 9k = 1$, quindi $k = \frac{1}{9}$. Inoltre $f(x) \ge 0$: è davvero una densità.`, R`b) $P(X \le 2) = \frac{1}{9}\left[\frac{x^3}{3}\right]_0^2 = \frac{8}{27} \approx 0{,}296$.`, R`c) $E(X) = \int_0^3 x \cdot \frac{x^2}{9}\,dx = \frac{1}{9}\left[\frac{x^4}{4}\right]_0^3 = \frac{81}{36} = \frac{9}{4} = 2{,}25$.`, R`d) Per $0 \le t \le 3$ vale $P(X \le t) = \frac{t^3}{27}$. Quindi $P(X > 2{,}25) = 1 - \frac{2{,}25^3}{27} = 1 - 0{,}421875 \approx 0{,}578$.`, R`Più di metà della probabilità sta sopra la media. Non è un errore: la densità cresce verso $3$, ed è asimmetrica. La media coincide con il «punto di metà» solo per le distribuzioni simmetriche.`] },
    { id: 'es-10', difficolta: 2, testo: R`Il quoziente d'intelligenza segue una normale con $\mu = 100$ e $\sigma = 15$. Qual è la probabilità che una persona scelta a caso abbia un QI maggiore di $130$? Sulla tavola $\Phi(2) = 0{,}9772$.`, suggerimenti: [R`Standardizza $130$.`, R`Ti serve l'area a destra: $1 - \Phi(z)$.`], risposta: pr(0.0228), soluzione: [R`$z = \frac{130 - 100}{15} = 2$.`, R`$P(X > 130) = P(Z > 2) = 1 - 0{,}9772 = 0{,}0228$: circa $2$ persone su $100$.`] },
    { id: 'es-11', difficolta: 3, testo: R`I punteggi di un test seguono una normale con $\mu = 65$ e $\sigma = 10$. Si premia il $5\%$ dei punteggi più alti. Da quale punteggio parte il premio? Sulla tavola $\Phi(1{,}645) \approx 0{,}95$.`, suggerimenti: [R`Sopra la soglia deve restare un'area di $0{,}05$, quindi a sinistra $0{,}95$.`, R`Trova $z$, poi torna a $X$ con $x = \mu + z\sigma$.`], risposta: val(81.45, 0.1), soluzione: [R`Cerco $z$ con $\Phi(z) = 0{,}95$: sulla tavola $z \approx 1{,}645$.`, R`$x = 65 + 1{,}645 \cdot 10 = 81{,}45$.`, R`Il premio parte da circa $81{,}5$ punti.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un test ha $10$ domande, ognuna con $4$ risposte di cui una sola giusta. Si supera con almeno $6$ risposte giuste. Qual è la probabilità di superarlo rispondendo a caso?`, suggerimenti: [R`$X \sim B(10, p)$ con $p = \frac{1}{4}$.`, R`$P(X \ge 6) = P(6) + P(7) + P(8) + P(9) + P(10)$.`, R`$P(6) = \binom{10}{6} \cdot 0{,}25^6 \cdot 0{,}75^4 \approx 0{,}0162$.`], risposta: Object.assign(pr(0.019727706909179688), { tolleranza: 0.001 }), soluzione: [R`$P(6) \approx 0{,}01622$, $\ P(7) \approx 0{,}00309$, $\ P(8) \approx 0{,}00039$.`, R`$P(9)$ e $P(10)$ sono minori di $0{,}00003$.`, R`$P(X \ge 6) \approx 0{,}0197$: circa $2$ volte su $100$. Rispondere a caso non conviene.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cos'è una variabile aleatoria?`, opzioni: [R`La probabilità che si verifichi un certo evento aleatorio`, R`Un numero associato a ogni esito di un esperimento aleatorio`, R`Un numero fisso che non conosciamo ancora prima dell'esperimento`, R`L'insieme di tutti gli esiti possibili`], corretta: 1, spiegazione: R`Una variabile aleatoria fa corrispondere un numero a ogni esito, come «numero di teste» a ogni sequenza di lanci. Non è una probabilità e non è lo spazio campionario. Non è nemmeno un numero fisso: il suo valore cambia con l'esito.` },
    { id: 'q-02', domanda: R`Quale di queste liste di probabilità **non** può essere una distribuzione?`, opzioni: [R`$0{,}2$; $0{,}3$; $0{,}5$`, R`$0{,}1$; $0{,}1$; $0{,}8$`, R`$0{,}4$; $0{,}4$; $0{,}3$`, R`$\frac{1}{3}$; $\frac{1}{3}$; $\frac{1}{3}$`], corretta: 2, spiegazione: R`Le probabilità di una distribuzione sommano a $1$. $0{,}4 + 0{,}4 + 0{,}3 = 1{,}1$: troppo. Le altre tre liste sommano esattamente a $1$ e hanno tutti i termini positivi.` },
    { id: 'q-03', domanda: R`Il numero di teste in tre lanci ha $E(X) = 1{,}5$. Che cosa vuol dire?`, opzioni: [R`Su molte serie di tre lanci, le teste sono in media $1{,}5$`, R`In ogni serie di tre lanci escono una oppure due teste`, R`$1{,}5$ è il numero di teste più probabile in una serie di lanci`, R`In metà delle serie escono più di una testa e mezza`], corretta: 0, spiegazione: R`Il valore atteso è una media su tante ripetizioni. Non dice che cosa succede in una serie: si può avere anche $0$ o $3$ teste. E $1{,}5$ teste non escono mai, quindi non può essere il valore più probabile.` },
    { id: 'q-04', domanda: R`Il valore atteso di una variabile discreta è sempre uno dei suoi valori?`, opzioni: [R`Sì, è il valore che esce più spesso`, R`Sì, se la distribuzione è simmetrica rispetto alla media`, R`No, ma solo per le variabili continue`, R`No: per esempio con un dado $E(X) = 3{,}5$`], corretta: 3, spiegazione: R`Il valore atteso è un baricentro e può cadere fra due valori. Il dado dà $3{,}5$, che non è una faccia. Anche una distribuzione simmetrica può avere la media fuori dai valori: le tre monete danno $1{,}5$.` },
    { id: 'q-05', domanda: R`Se $E(X) = 4$, quanto vale $E(3X - 2)$?`, opzioni: [R`$12$`, R`$10$`, R`$-2$`, R`$14$`], corretta: 1, spiegazione: R`$E(aX + b) = a\,E(X) + b$, quindi $E(3X - 2) = 3 \cdot 4 - 2 = 10$. $12$ dimentica il $-2$; $14$ lo somma invece di toglierlo.` },
    { id: 'q-06', domanda: R`Che relazione c'è fra $\text{Var}(X + 5)$ e $\text{Var}(X)$?`, opzioni: [R`Sono uguali`, R`$\text{Var}(X) + 5$`, R`$\text{Var}(X) + 25$`, R`$\text{Var}(X + 5)$ è $5$ volte più grande`], corretta: 0, spiegazione: R`Sommare $5$ sposta tutti i valori e anche la media della stessa quantità. Gli scarti dalla media non cambiano, quindi neanche la varianza. Conta solo un numero che **moltiplica** $X$, e conta al quadrato.` },
    { id: 'q-07', domanda: R`Quale uguaglianza dà la varianza di $X$?`, opzioni: [R`$\text{Var}(X) = [E(X)]^2 - E(X^2)$`, R`$\text{Var}(X) = E(X^2)$`, R`$\text{Var}(X) = E(X - \mu)$`, R`$\text{Var}(X) = E(X^2) - [E(X)]^2$`], corretta: 3, spiegazione: R`È la formula rapida: media dei quadrati meno quadrato della media. Al contrario verrebbe un numero negativo o nullo. $E(X - \mu)$ vale sempre $0$, perché gli scarti positivi e negativi si compensano: per questo si elevano al quadrato.` },
    { id: 'q-08', domanda: R`In quale caso il numero di successi **non** è una binomiale?`, opzioni: [R`I $6$ in $10$ lanci di un dado`, R`I rigori segnati su $5$, se ogni rigore entra con probabilità $0{,}8$`, R`Le palline rosse in $3$ estrazioni senza rimessa da un'urna con $4$ palline`, R`I pezzi difettosi su $20$, se ognuno lo è con probabilità $0{,}05$ e indipendentemente dagli altri`], corretta: 2, spiegazione: R`Senza rimessa, con un'urna piccola, la probabilità di pescare rosso cambia dopo ogni estrazione: le prove non sono indipendenti. Negli altri casi le prove sono indipendenti e $p$ è sempre la stessa.` },
    { id: 'q-09', domanda: R`Per una binomiale $B(n, p)$, che cosa si può dire di varianza e media?`, opzioni: [R`La varianza non supera mai la media`, R`Sono sempre uguali`, R`La varianza è sempre il quadrato della media`, R`La varianza supera sempre la media`], corretta: 0, spiegazione: R`$\text{Var}(X) = np(1-p) = E(X) \cdot (1-p)$, e $1 - p$ sta fra $0$ e $1$. Quindi la varianza è minore o uguale alla media. Varianza uguale alla media è la proprietà della Poisson.` },
    { id: 'q-10', domanda: R`Quale grandezza descriveresti con una distribuzione di Poisson?`, opzioni: [R`L'altezza di uno studente scelto a caso nella scuola`, R`Il punteggio di un dado`, R`Il numero di teste in $10$ lanci di una moneta`, R`Il numero di incidenti a un incrocio in un mese`], corretta: 3, spiegazione: R`Gli incidenti sono eventi rari e indipendenti, con una media nel tempo: è il caso tipico della Poisson. L'altezza è continua. Il dado è uniforme su sei valori. Le teste in $10$ lanci sono una binomiale.` },
    { id: 'q-11', domanda: R`Una variabile di Poisson ha varianza $9$. Quanto vale la media?`, opzioni: [R`$3$`, R`$9$`, R`$81$`, R`$4{,}5$`], corretta: 1, spiegazione: R`Nella Poisson media e varianza sono uguali, tutte e due $\lambda$. Quindi la media è $9$. $3$ è la deviazione standard, non la media.` },
    { id: 'q-12', domanda: R`$X$ è una variabile continua con densità $f$. Quanto vale $P(X = 2)$?`, opzioni: [R`$f(2)$`, R`Dipende dalla densità`, R`$0$`, R`$\frac{1}{2}$`], corretta: 2, spiegazione: R`Per una continua la probabilità è un'area, e sopra un punto solo l'area è nulla. Vale per qualunque densità. $f(2)$ è l'altezza della curva, non una probabilità.` },
    { id: 'q-13', domanda: R`Una densità di probabilità può valere $3$ in qualche punto?`, opzioni: [R`No, perché le probabilità non possono mai superare $1$`, R`Sì, purché l'area totale sotto la curva sia $1$`, R`Sì, ma solo se la variabile è normale`, R`No, una densità vale al massimo $\frac{1}{2}$`], corretta: 1, spiegazione: R`La densità non è una probabilità: lo è l'area sotto la curva. La uniforme su $\Icc{0}{\frac{1}{3}}$ vale $3$ dentro l'intervallo, e l'area totale è $\frac{1}{3} \cdot 3 = 1$.` },
    { id: 'q-14', domanda: R`In una normale $N(\mu, \sigma)$ aumenti $\sigma$ e lasci fermo $\mu$. Che cosa succede alla campana?`, opzioni: [R`Si allarga e si abbassa`, R`Si sposta verso destra`, R`Diventa più stretta e più alta`, R`Resta uguale, cambia solo l'area`], corretta: 0, spiegazione: R`$\sigma$ misura la larghezza: con $\sigma$ più grande i valori sono più sparsi. L'area resta $1$, quindi se la campana si allarga deve abbassarsi. A spostarla è $\mu$, non $\sigma$.` },
    { id: 'q-15', domanda: R`Un valore $x$ di una normale ha punteggio standard $z = -2$. Che cosa vuol dire?`, opzioni: [R`$x$ vale $-2$`, R`La probabilità di ottenere $x$ è un numero negativo`, R`$x$ sta $2$ unità sotto la media, qualunque sia $\sigma$`, R`$x$ sta $2$ deviazioni standard sotto la media`], corretta: 3, spiegazione: R`$z = \frac{x - \mu}{\sigma}$ conta quante deviazioni standard separano $x$ dalla media; il segno meno dice che $x$ sta sotto. Le unità vere sono $2\sigma$, non $2$.` },
    { id: 'q-16', domanda: R`Sulla tavola della normale standard, $\Phi(-1)$ è uguale a…`, opzioni: [R`$-\Phi(1)$`, R`$\Phi(1)$`, R`$1 - \Phi(1)$`, R`$\Phi(1) - 1$`], corretta: 2, spiegazione: R`Per simmetria l'area a sinistra di $-1$ è uguale a quella a destra di $1$, cioè $1 - \Phi(1) \approx 0{,}16$. $-\Phi(1)$ e $\Phi(1) - 1$ sono negativi: un'area non lo è mai.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di ogni calcolo controlla la tabella: probabilità tutte positive e somma uguale a $1$. Se la somma non torna, l'errore è a monte.` },
    { tipo: 'errore', testo: R`$E(X^2)$ e $[E(X)]^2$ sono numeri diversi. Se la varianza ti viene negativa, li hai scambiati.` },
    { tipo: 'trucco', testo: R`Per $aX + b$: la media diventa $a\,E(X) + b$, la varianza $a^2\,\text{Var}(X)$. Il $b$ sposta e basta, quindi nella varianza sparisce.` },
    { tipo: 'metodo', testo: R`Prima di usare la binomiale controlla le tre condizioni: due esiti, $p$ costante, prove indipendenti. Le estrazioni senza rimessa non le rispettano.` },
    { tipo: 'trucco', testo: R`«Almeno uno» o «almeno due», con la binomiale o con la Poisson: passa al contrario e togli da $1$ i pochi casi che mancano.` },
    { tipo: 'errore', testo: R`Con una variabile continua $\le$ e $<$ danno la stessa probabilità. Con una discreta no: $P(X \le 2)$ comprende $P(X = 2)$, $P(X < 2)$ no.` },
    { tipo: 'metodo', testo: R`Con la normale: standardizza, disegna la campana, colora l'area cercata. Poi riportala alla tavola con la simmetria e il contrario.` },
    { tipo: 'errore', testo: R`Leggi bene come è scritta la normale: $N(\mu, \sigma)$ oppure $N(\mu, \sigma^2)$. Con $N(10, 4)$ la deviazione standard può essere $4$ oppure $2$.` },
    { tipo: 'trucco', testo: R`Controllo veloce sulla binomiale: la barra più alta sta vicino a $np$. Se il tuo $k$ più probabile è lontano da $np$, rifai i conti.` }
  ],

  aneddoti: [
    { matematico: 'Christiaan Huygens', anni: '1629–1695', titolo: 'Il libretto da cui viene la «speranza»', testo: R`Nel 1655 il giovane olandese Christiaan Huygens era a Parigi. Lì sentì parlare dei problemi sui dadi risolti per lettera da Pascal e Fermat. Le loro soluzioni però non circolavano, e Huygens rifece i conti da solo. Nel 1657 uscì il suo breve trattato, tradotto in latino come *De ratiociniis in ludo aleae*: «sui ragionamenti nel gioco dei dadi». Fu il primo libro stampato sulla probabilità. L'idea centrale è il valore di una posta incerta: quanto è giusto pagare per entrare in un gioco. Nella traduzione latina quel valore diventò *expectatio*, l'aspettativa. Da qui vengono il nome «valore atteso» e il vecchio sinonimo «speranza matematica». Per mezzo secolo il libretto di Huygens fu il manuale su cui si studiava la materia.`, legame: R`Il valore atteso $E(X) = \sum x_i\, p_i$ è l'*expectatio* di Huygens: il prezzo giusto di un gioco.` },

    { matematico: 'Daniel Bernoulli', anni: '1700–1782', titolo: 'Il gioco che vale una somma infinita', testo: R`Nel 1713 Nicolaus Bernoulli propose per lettera a Pierre de Montmort un gioco strano, con un dado. Si lancia finché esce il $6$, e la vincita raddoppia a ogni lancio andato a vuoto. Nel 1738 il cugino Daniel lo raccontò con una moneta, e così è rimasto famoso. Si lancia finché esce testa. Se esce al primo lancio vinci $2$ ducati, al secondo $4$, al terzo $8$, e così via. Quanto pagheresti per giocare? Il valore atteso è $2 \cdot \frac{1}{2} + 4 \cdot \frac{1}{4} + 8 \cdot \frac{1}{8} + \dots = 1 + 1 + 1 + \dots$, cioè infinito. Eppure nessuno pagherebbe più di pochi ducati. Daniel pubblicò la sua risposta negli atti dell'Accademia di San Pietroburgo: da lì il nome di «paradosso di San Pietroburgo». Secondo Daniel non conta la somma, ma quanto quella somma vale per chi la riceve. Cento ducati cambiano la vita a un povero, e quasi niente a un ricco. Da quest'idea è nato il concetto di utilità, ancora centrale in economia.`, legame: R`Il valore atteso di una variabile con infiniti valori è una serie, e la serie può anche non avere una somma finita.` },

    { matematico: 'Ladislaus Bortkiewicz', anni: '1868–1931', titolo: 'I soldati uccisi dal calcio di un cavallo', testo: R`Bortkiewicz era uno statistico nato a San Pietroburgo, che lavorò in Germania. Nel 1898 pubblicò un libro dal titolo curioso: *La legge dei piccoli numeri*. Voleva mostrare che gli eventi rari seguono la formula pubblicata da Siméon-Denis Poisson nel 1837. L'esempio rimasto famoso è macabro: i soldati dell'esercito prussiano uccisi dal calcio di un cavallo. Nella versione più citata ci sono dieci corpi d'armata per vent'anni, cioè $200$ casi «corpo-anno», con $122$ morti in tutto. La media è $0{,}61$ morti per corpo e per anno. La Poisson prevede che non muoia nessuno in $200 \cdot e^{-0{,}61} \approx 109$ casi, e nei dati sono proprio $109$. Anche i casi con uno, due e tre morti tornano molto bene.`, legame: R`È l'esempio classico della distribuzione di Poisson: tanti soldati, una probabilità minuscola per ciascuno, una media $\lambda$ nota.` },

    { matematico: 'Abraham de Moivre', anni: '1667–1754', titolo: 'La campana nasce dalle monete', testo: R`De Moivre era un protestante francese. Dopo la revoca dell'editto di Nantes, nel 1685, fu imprigionato e poi riparò a Londra. Non ottenne mai una cattedra. Viveva di lezioni private e di consigli a giocatori e assicuratori, che riceveva in un caffè, lo Slaughter's. Nel 1733 scrisse un breve articolo in latino sulla binomiale con $n$ molto grande. Sommare tanti termini era impossibile a mano, e lui li sostituì con l'area sotto una curva. Era la campana, che compariva per la prima volta. Si racconta anche, forse è leggenda, che previde la propria morte. Si accorse di dormire ogni giorno un quarto d'ora in più. Calcolò il giorno in cui avrebbe dormito ventiquattr'ore. Morì il 27 novembre 1754: secondo la storia, proprio quel giorno.`, legame: R`L'approssimazione di de Moivre è quella di questo argomento: $B(n, p)$ si sostituisce con una normale di media $np$.` },

    { matematico: 'Carl Friedrich Gauss', anni: '1777–1855', titolo: 'La campana sulla banconota da dieci marchi', testo: R`Nel 1809 Gauss pubblicò un trattato sul moto dei corpi celesti. Lì ricavò la legge degli errori di misura. Gli errori piccoli sono frequenti, quelli grandi rari, e si distribuiscono a campana intorno al valore vero. Da allora la normale si chiama anche gaussiana, anche se de Moivre l'aveva trovata prima. La Germania gli fece un omaggio raro. Negli anni Novanta, fino all'arrivo dell'euro, la banconota da $10$ marchi portava il suo ritratto. Accanto c'erano la curva normale e la sua formula. Capita di rado che una banconota porti stampata una funzione. Sul retro c'erano un sestante e i triangoli del rilievo del regno di Hannover, che Gauss aveva diretto.`, legame: R`La formula stampata sulla banconota è la densità normale di questo argomento, con la media $\mu$ e la deviazione standard $\sigma$.` }
  ]
});
})();
