(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'logaritmi',
  titolo: 'Logaritmi',

  introduzione: R`Il logaritmo risponde a una domanda che le potenze lasciano in sospeso: se $a^x = b$, quanto vale $x$? Il logaritmo in base $a$ di $b$, scritto $\log_a b$, è proprio quell'esponente: il numero a cui bisogna elevare $a$ per ottenere $b$. Non è un'operazione nuova, è l'operazione inversa dell'elevamento a potenza, allo stesso modo in cui la sottrazione è l'inversa dell'addizione e la radice quadrata è l'inversa dell'elevamento al quadrato.

Si usa ogni volta che una quantità cresce o decresce moltiplicandosi per un fattore fisso e si vuole sapere "dopo quanto tempo": quanti anni servono perché un capitale raddoppi a un certo tasso di interesse, quante generazioni servono perché un batterio arrivi a un miliardo di individui, di quanti decibel è più intenso un suono rispetto a un altro. Per questo motivo scale come il pH, la scala Richter e i decibel sono scale logaritmiche: comprimono numeri che vanno da uno a un miliardo in una manciata di unità leggibili.

Per affrontare questo argomento serve conoscere bene le potenze e, soprattutto, le funzioni esponenziali: il logaritmo nasce come loro funzione inversa, e il suo grafico si capisce meglio se si ha già chiaro quello di $y = a^x$.`,

  sezioni: [
    { id: 'definizione', titolo: 'Definizione di logaritmo', testo: R`Il logaritmo in base $a$ di un numero $b$ è l'esponente da dare ad $a$ per ottenere $b$.

>* **Definizione:** $\log_a b = x \iff a^x = b$, con $a > 0$, $a \ne 1$ e $b > 0$. Si legge "logaritmo in base $a$ di $b$".

Le tre condizioni non sono dettagli tecnici. $a > 0$ e $a \ne 1$ sono le stesse condizioni sulla base di una funzione esponenziale: con $a \le 0$ le potenze non sono definite per ogni esponente, con $a = 1$ ogni potenza vale $1$ e non si potrebbe più risalire all'esponente. $b > 0$: una potenza con base positiva è sempre positiva, quindi non esiste nessun esponente che dia come risultato un numero negativo o zero. Questa condizione riguarda l'**argomento** del logaritmo, e va sempre controllata per prima.

Esempio: $\log_2 8 = 3$ perché $2^3 = 8$. $\log_3 \dfrac{1}{9} = -2$ perché $3^{-2} = \dfrac{1}{9}$. $\log_5 5 = 1$ perché $5^1 = 5$.

Trascina il punto lungo la curva $y = \log_2 x$ e osserva come cambia il valore: più $p$ si avvicina a $0$, più $\log_2 p$ diventa molto negativo; raddoppiando $p$, $\log_2 p$ aumenta sempre di $1$.

[[grafico:puntoMobile]]

>! L'argomento deve essere positivo: $\log_2(-4)$ e $\log_2 0$ non esistono. Non va confuso con la base: $\log_2 8 \ne \log_8 2$ (il primo vale $3$, il secondo $\dfrac{1}{3}$).` },

    { id: 'logaritmi-notevoli', titolo: 'Logaritmi notevoli: decimale e naturale', testo: R`Due valori si ripetono così spesso da meritare un nome.

>* Per ogni base valida: $\log_a 1 = 0$ (perché $a^0 = 1$) e $\log_a a = 1$ (perché $a^1 = a$).

Fra tutte le basi possibili, due sono così usate da avere una notazione propria. Il **logaritmo decimale**, in base $10$, si scrive senza indicare la base: $\log b$ sta per $\log_{10} b$. È comodo perché il nostro sistema di numerazione è in base dieci: $\log 100 = 2$, $\log 1000 = 3$, $\log 0{,}01 = -2$. Il **logaritmo naturale**, in base $e \approx 2{,}718$ (il numero di Nepero, protagonista della crescita esponenziale continua), si scrive $\ln b$ al posto di $\log_e b$: è la base "naturale" perché rende più semplici le formule del calcolo differenziale, come si vedrà studiando le derivate.

Le due funzioni $y = \ln x$ e $y = \log x$ hanno lo stesso andamento (entrambe crescenti, stesso dominio) ma "salgono" a velocità diverse: confrontale nel grafico.

[[grafico:confrontoBasi]]

>! $\log 5$ senza base scritta è sempre in base $10$ a scuola e sulle calcolatrici scientifiche (tasto "log"); il tasto "ln" calcola invece il logaritmo naturale. Non sono la stessa funzione: $\log 10 = 1$ ma $\ln 10 \approx 2{,}303$.` },

    { id: 'proprieta', titolo: 'Le proprietà dei logaritmi', testo: R`Le proprietà dei logaritmi trasformano operazioni fra numeri in operazioni più semplici fra esponenti: è il motivo per cui furono inventati.

>* Con $a > 0$, $a \ne 1$, $b > 0$, $c > 0$: $$\log_a(b \cdot c) = \log_a b + \log_a c \qquad \log_a\frac{b}{c} = \log_a b - \log_a c \qquad \log_a b^k = k \log_a b$$

La prima proprietà (**prodotto**) trasforma una moltiplicazione in un'addizione: prima delle calcolatrici, per moltiplicare due numeri grandi si cercavano i loro logaritmi sulle tavole, si sommavano, e si tornava indietro. La seconda (**quoziente**) fa lo stesso con la divisione. La terza (**potenza**) porta giù l'esponente, qualunque esso sia, anche una frazione: $\log_a \sqrt[n]{b} = \log_a b^{1/n} = \dfrac{1}{n}\log_a b$.

Esempio: $\log_2 40 = \log_2(8 \cdot 5) = \log_2 8 + \log_2 5 = 3 + \log_2 5$. Oppure $\log_3 \dfrac{81}{9} = \log_3 81 - \log_3 9 = 4 - 2 = 2$ (qui si poteva anche semplificare prima: $\dfrac{81}{9}=9$, e $\log_3 9 = 2$ direttamente).

>! Le proprietà valgono per prodotto e quoziente **dentro** l'argomento, non per somma e differenza: $\log_a(b+c) \ne \log_a b + \log_a c$. Con $a=10$, $b=c=1$: $\log(1+1) = \log 2 \approx 0{,}301$, ma $\log 1 + \log 1 = 0$.` },

    { id: 'cambiamento-base', titolo: 'Il cambiamento di base', testo: R`Una calcolatrice scientifica di solito ha solo due tasti per i logaritmi: "log" (base $10$) e "ln" (base $e$). Per calcolare un logaritmo in una base diversa serve la formula del cambiamento di base.

>* $$\log_a b = \frac{\log_c b}{\log_c a}$$ con $c$ una base qualunque (di solito $10$ o $e$), $c > 0$, $c \ne 1$.

La formula si ricava dalla definizione: se $x = \log_a b$, allora $a^x = b$; prendendo il logaritmo in base $c$ di entrambi i membri, $x \log_c a = \log_c b$, quindi $x = \dfrac{\log_c b}{\log_c a}$.

Esempio: per calcolare $\log_2 5$ con la calcolatrice, $\log_2 5 = \dfrac{\ln 5}{\ln 2} \approx \dfrac{1{,}609}{0{,}693} \approx 2{,}322$. Si può verificare: $2^{2{,}322} \approx 5$.

Un caso particolare utile: scambiando base e argomento, $\log_a b = \dfrac{1}{\log_b a}$ (basta prendere $c = b$ nella formula, perché $\log_b b = 1$).

>! Il cambiamento di base non cambia il valore del logaritmo, solo il modo di calcolarlo: $\log_2 5$ è sempre lo stesso numero, che lo si scriva con $\ln$ o con $\log$.` },

    { id: 'inversa-esponenziale', titolo: 'Logaritmo ed esponenziale: funzioni inverse', testo: R`Ogni funzione esponenziale $y = a^x$ (con $a>0$, $a \ne 1$) è iniettiva: valori diversi di $x$ danno sempre valori diversi di $y$. Per questo ammette una funzione inversa, ed è proprio il logaritmo in base $a$.

>* Se $y = a^x$, allora $x = \log_a y$. Componendo le due funzioni si torna al punto di partenza: $a^{\log_a x} = x$ (per $x>0$) e $\log_a(a^x) = x$ (per ogni $x$).

Graficamente, il grafico di una funzione e quello della sua inversa sono sempre simmetrici rispetto alla bisettrice del primo e terzo quadrante, $y = x$: è il modo più rapido per capire come deve essere fatto un grafico senza calcolare nessun punto. Dove l'esponenziale ha l'asintoto orizzontale $y = 0$, il logaritmo ha l'asintoto verticale $x = 0$ (le due rette si scambiano riflettendosi); dove l'esponenziale passa per $(0;1)$, il logaritmo passa per $(1;0)$ (le coordinate si scambiano).

[[grafico:inversa]]

Questa proprietà è quella che rende i logaritmi utili per "disfare" le potenze: un'equazione come $2^x = 5$, che non si risolve con l'algebra elementare, si risolve applicando il logaritmo a entrambi i membri, come si vedrà più avanti.

>! "Funzione inversa" non vuol dire $\dfrac{1}{a^x}$: l'inversa di $y=a^x$ si trova scambiando $x$ e $y$ e risolvendo rispetto alla nuova $y$, non facendo il reciproco.` },

    { id: 'funzione-logaritmica', titolo: 'Dominio, andamento e asintoto', testo: R`La funzione $y = \log_a x$ ha sempre lo stesso dominio, lo stesso asintoto e lo stesso punto fisso, qualunque sia la base $a$; cambia invece l'andamento.

>* Dominio: $x > 0$. Asintoto verticale: la retta $x = 0$ (l'asse $y$), a cui la curva si avvicina senza mai toccarlo, sia per $a > 1$ che per $0 < a < 1$. Punto fisso: $(1; 0)$, perché $\log_a 1 = 0$ per ogni base.

Muovi il cursore che cambia la base $a$: per $a > 1$ la funzione è **crescente** su tutto il dominio (più $a$ è vicino a $1$, più cresce lentamente); per $0 < a < 1$ è **decrescente**. Il caso $a = 1$ non è ammesso: in ogni caso $1^x$ vale sempre $1$, quindi la funzione non potrebbe mai essere invertita.

[[grafico:baseVariabile]]

Vicino a $x = 0^+$ la funzione tende a $-\infty$ se $a>1$ (o a $+\infty$ se $0<a<1$); per $x$ molto grande succede il contrario. Non esiste invece un asintoto orizzontale: il logaritmo, per quanto lentamente, cresce (o decresce) senza limite.

>! Non tutte le funzioni crescenti "esplodono": $\log_a x$ cresce per ogni $a>1$, ma sempre più lentamente al crescere di $x$. Da $x=1000$ a $x=1\,000\,000$ (mille volte più grande) $\log_{10}x$ passa solo da $3$ a $6$.` },

    { id: 'equazioni-logaritmiche', titolo: 'Le equazioni logaritmiche', testo: R`Un'equazione logaritmica è un'equazione in cui l'incognita compare dentro un logaritmo. Si risolve sempre con lo stesso schema in tre passi.

>* 1) Si scrivono le **condizioni di esistenza**: ogni argomento di ogni logaritmo deve essere positivo. 2) Con le proprietà dei logaritmi si riduce l'equazione alla forma $\log_a f(x) = \log_a g(x)$, cioè un solo logaritmo per parte, nella stessa base. 3) Per l'iniettività del logaritmo, questo equivale a $f(x) = g(x)$; si risolve e si confronta con le c.e.

Esempio: $\log(x - 1) + \log(x + 2) = \log(2x + 10)$. C.e.: $x - 1 > 0$ e $x + 2 > 0$, cioè $x > 1$ (l'intersezione delle due, come nel grafico qui sotto). Con la proprietà del prodotto, $\log[(x-1)(x+2)] = \log(2x+10)$, quindi $(x-1)(x+2) = 2x+10$, cioè $x^2 + x - 2 = 2x + 10$, cioè $x^2 - x - 12 = 0$, con soluzioni $x=4$ e $x=-3$. Solo $x=4$ rispetta la c.e. $x>1$.

[[grafico:condizioniEsistenza]]

Alcune equazioni non hanno la stessa base a vista, ma si risolvono con una **sostituzione**: in $(\ln x)^2 - \ln x - 2 = 0$ (c.e. $x>0$) si pone $t = \ln x$, si risolve $t^2 - t - 2=0$ cioè $t=2$ o $t=-1$, e infine $\ln x = 2 \Rightarrow x = e^2$, oppure $\ln x = -1 \Rightarrow x = e^{-1}$.

>! Le c.e. si scrivono **prima** di applicare le proprietà, sugli argomenti originali: dopo aver unito i logaritmi in uno solo, il dominio apparente potrebbe allargarsi (per esempio $(x-1)(x+2) > 0$ è vera anche per $x<-2$, ma lì i due logaritmi di partenza non esistono separatamente).` },

    { id: 'disequazioni-logaritmiche', titolo: 'Le disequazioni logaritmiche', testo: R`Anche nelle disequazioni logaritmiche il primo passo sono sempre le condizioni di esistenza. Il passo che cambia rispetto alle equazioni è che, togliendo il logaritmo, bisogna decidere se il verso della disequazione si mantiene o si inverte: dipende dal fatto che la funzione logaritmica sia crescente o decrescente.

>* Con $a>1$ (funzione crescente): $\log_a f(x) > \log_a g(x) \iff f(x) > g(x)$ (verso invariato). Con $0<a<1$ (funzione decrescente): $\log_a f(x) > \log_a g(x) \iff f(x) < g(x)$ (verso **invertito**). In entrambi i casi vanno imposte le c.e. $f(x) > 0$ e $g(x) > 0$.

Esempio con base maggiore di $1$: $\log_2(x-1) \le 3$. C.e.: $x > 1$. Il $3$ si scrive come $\log_2 8$: $\log_2(x-1) \le \log_2 8 \Rightarrow x - 1 \le 8 \Rightarrow x \le 9$ (verso mantenuto, la base è maggiore di $1$). Intersecando con la c.e.: $1 < x \le 9$.

Esempio con base minore di $1$: $\log_{1/2}(x+3) \ge -2$. C.e.: $x > -3$. Si scrive $-2 = \log_{1/2} 4$: $\log_{1/2}(x+3) \ge \log_{1/2} 4 \Rightarrow x+3 \le 4$ (verso **invertito**, perché la base è fra $0$ e $1$) $\Rightarrow x \le 1$. Con la c.e.: $-3 < x \le 1$.

>! L'errore più comune è mantenere sempre lo stesso verso, dimenticando che con base minore di $1$ il logaritmo è decrescente e il verso si inverte, esattamente come succede dividendo per un numero negativo.` },

    { id: 'esponenziali-con-logaritmi', titolo: 'Risolvere le equazioni esponenziali con i logaritmi', testo: R`Alcune equazioni esponenziali non si risolvono uguagliando le basi, perché il secondo membro non è una potenza esatta della base: $2^x = 5$ non ha una soluzione "pulita" come $2^x = 8$. In questi casi si applica il logaritmo a entrambi i membri.

>* Da $a^x = b$ (con $a>0$, $a\ne1$, $b>0$), applicando il logaritmo in una base qualunque (spesso $10$ o $e$) a entrambi i membri: $\log(a^x) = \log b \Rightarrow x \log a = \log b \Rightarrow x = \dfrac{\log b}{\log a}$.

Esempio: $2^x = 5$. Si applica $\ln$: $\ln(2^x) = \ln 5 \Rightarrow x \ln 2 = \ln 5 \Rightarrow x = \dfrac{\ln 5}{\ln 2} \approx \dfrac{1{,}609}{0{,}693} \approx 2{,}32$. È lo stesso calcolo del cambiamento di base, letto al contrario: $x = \log_2 5$.

Lo stesso schema funziona quando l'incognita è più nascosta. Per $3^{x+1} = 20$: $\ln(3^{x+1}) = \ln 20 \Rightarrow (x+1)\ln 3 = \ln 20 \Rightarrow x = \dfrac{\ln 20}{\ln 3} - 1 \approx 2{,}727 - 1 = 1{,}727$.

Questo è anche il metodo con cui si affrontano i problemi di crescita e decrescita esponenziale ("dopo quanto tempo un capitale raddoppia", "dopo quante ore i batteri arrivano a un milione"): si scrive l'equazione esponenziale e la si risolve con il logaritmo.

>! Il logaritmo si applica a **entrambi** i membri dell'equazione, e va applicato all'intera espressione, non solo a un pezzo: da $2^x=5$ si scrive $\ln(2^x) = \ln 5$, non $x \ln 2 = 5$.` },

    { id: 'applicazioni', titolo: 'Le scale logaritmiche: decibel, pH e Richter', testo: R`Molte grandezze naturali variano su un intervallo enorme: l'energia di un terremoto, l'intensità di un suono, la concentrazione di ioni in una soluzione. Su una scala lineare numeri così diversi (da $1$ a un miliardo) sarebbero impossibili da leggere su un grafico o da confrontare a voce. Le **scale logaritmiche** risolvono il problema: comprimono un fattore mille in tre unità, un fattore un miliardo in nove.

>* Livello sonoro in **decibel**: $L = 10 \log_{10}\dfrac{I}{I_0}$, dove $I$ è l'intensità del suono e $I_0$ un'intensità di riferimento. Un suono $10$ volte più intenso ha $10$ dB in più; $100$ volte più intenso, $20$ dB in più: le moltiplicazioni diventano addizioni, come nella proprietà del prodotto.

Il **pH** di una soluzione è $\text{pH} = -\log_{10}[\text{H}^+]$, l'opposto del logaritmo della concentrazione di ioni idrogeno (in moli per litro). Una soluzione con $[\text{H}^+] = 10^{-7}$ ha pH $7$ (neutro); ogni unità di pH in meno corrisponde a una concentrazione di ioni $10$ volte maggiore, cioè una soluzione $10$ volte più acida.

La **scala Richter** misura l'energia di un terremoto in modo simile: un terremoto di magnitudo $6$ rilascia circa $10$ volte l'energia di uno di magnitudo $5$, non il doppio. Anche qui la differenza di un'unità sulla scala corrisponde a un fattore $10$ sulla grandezza fisica.

Un'ultima applicazione è il **tempo di raddoppio**: se una popolazione cresce come $P = P_0 \cdot 2^{t/T}$, il tempo $T$ perché raddoppi si trova risolvendo $2^{t/T}=2$ rispetto a $t$, cioè $t = T$: il raddoppio, per definizione, avviene ogni $T$.

>! "Il doppio in decibel" non vuol dire il doppio come numero: $+10$ dB corrisponde a un'intensità $10$ volte maggiore, non doppia. La confusione fra scala logaritmica e scala lineare è l'errore più comune con queste unità.` }
  ],

  grafici: {
    puntoMobile: {
      tipo: 'piano', x: [-1, 9], y: [-5, 5],
      parametri: [{ nome: 'p', min: 0.5, max: 8, passo: 0.1, valore: 2, nascosto: true }],
      funzioni: [{ f: 'log2(x)', etichetta: 'y = log₂x', dominio: [0.05, 8], colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', 'log2(p)'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-0.8, 4.2], testo: 'log₂(p) = {{log2(p)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto P lungo la curva: la sua altezza è sempre il logaritmo in base 2 della sua ascissa.'
    },
    confrontoBasi: {
      tipo: 'piano', x: [-2, 8], y: [-4, 3],
      funzioni: [
        { f: 'ln(x)', etichetta: 'y = ln x', dominio: [0.05, 8], colore: 1 },
        { f: 'log10(x)', etichetta: 'y = log x (base 10)', dominio: [0.05, 8], colore: 3 }
      ],
      elementi: [{ tipo: 'verticale', x: 0, asintoto: true, etichetta: 'x = 0' }],
      didascalia: 'Le due curve hanno lo stesso andamento, ma per x > 1 ln x sta sempre sopra log x: una base più piccola (e invece di 10) dà valori più grandi.'
    },
    inversa: {
      tipo: 'piano', x: [-4, 8], y: [-4, 8],
      proporzioni: 'uguali',
      funzioni: [
        { f: '2^x', etichetta: 'y = 2^x', colore: 1, dominio: [-4, 3] },
        { f: 'log2(x)', etichetta: 'y = log₂x', colore: 2, dominio: [0.05, 8] }
      ],
      elementi: [
        { tipo: 'retta', m: 1, q: 0, etichetta: 'y = x', tratteggio: true, colore: 3 }
      ],
      didascalia: 'Le due curve sono simmetriche rispetto alla bisettrice y = x: log₂x è la funzione inversa di 2^x.'
    },
    baseVariabile: {
      tipo: 'piano', x: [-2, 8], y: [-4, 4],
      funzioni: [{ f: 'ln(x)/ln(a)', etichetta: 'y = logₐx', dominio: [0.05, 8], colore: 1 }],
      elementi: [{ tipo: 'verticale', x: 0, asintoto: true, etichetta: 'x = 0' }],
      punti: [{ x: 1, y: 0, etichetta: '(1; 0)', posizione: 'basso-destra', colore: 2 }],
      parametri: [{ nome: 'a', min: 0.2, max: 5, passo: 0.1, valore: 2, etichetta: 'a' }],
      didascalia: 'Muovi il cursore: per a > 1 la funzione cresce, per 0 < a < 1 decresce. Passa sempre per (1; 0) e ha asintoto verticale x = 0.'
    },
    condizioniEsistenza: {
      tipo: 'retta-reale', x: [-4, 5],
      intervalli: [
        { da: 1, a: 'inf', chiusoDa: false, colore: 1, etichetta: 'x − 1 > 0: x > 1' },
        { da: -2, a: 'inf', chiusoDa: false, colore: 2, etichetta: 'x + 2 > 0: x > −2' },
        { da: 1, a: 'inf', chiusoDa: false, colore: 3, etichetta: 'c.e.: x > 1' }
      ],
      punti: [{ x: 1, etichetta: '1', escluso: true }, { x: -2, etichetta: '−2', escluso: true }],
      didascalia: 'Condizioni di esistenza di log(x − 1) + log(x + 2): servono x > 1 e x > −2 insieme, cioè x > 1.'
    }
  },

  esempi: [
    { titolo: 'Calcolare un logaritmo dalla definizione', problema: R`Calcola $\log_3 81$ e $\log_4 \dfrac{1}{16}$.`, passi: [
      R`Per la definizione, $\log_3 81$ è l'esponente da dare a $3$ per ottenere $81$: $3^4 = 81$, quindi $\log_3 81 = 4$.`,
      R`Per $\log_4 \frac{1}{16}$ bisogna trovare $x$ tale che $4^x = \frac{1}{16}$. Siccome $16 = 4^2$, si ha $\frac{1}{16} = 4^{-2}$, quindi $x = -2$.`
    ], risultato: R`$\log_3 81 = 4$, $\log_4\frac1{16} = -2$` },

    { titolo: 'Usare le proprietà dei logaritmi', problema: R`Calcola $2\log_3 2 + \log_3 18 - \log_3 8$.`, passi: [
      R`Proprietà della potenza: $2\log_3 2 = \log_3 2^2 = \log_3 4$.`,
      R`Proprietà del prodotto: $\log_3 4 + \log_3 18 = \log_3(4 \cdot 18) = \log_3 72$.`,
      R`Proprietà del quoziente: $\log_3 72 - \log_3 8 = \log_3\dfrac{72}{8} = \log_3 9$.`,
      R`$\log_3 9 = 2$ perché $3^2 = 9$.`
    ], risultato: R`$2$` },

    { titolo: 'Il cambiamento di base', problema: R`Calcola $\log_5 12$ con tre cifre decimali, usando il logaritmo naturale.`, passi: [
      R`Formula del cambiamento di base: $\log_5 12 = \dfrac{\ln 12}{\ln 5}$.`,
      R`$\ln 12 \approx 2{,}485$, $\ln 5 \approx 1{,}609$.`,
      R`$\log_5 12 \approx \dfrac{2{,}485}{1{,}609} \approx 1{,}544$.`
    ], risultato: R`$\log_5 12 \approx 1{,}544$` },

    { titolo: "Un'equazione logaritmica", problema: R`Risolvi $\log_2(x+3) - \log_2(x-1) = 2$.`, passi: [
      R`C.e.: $x+3>0$ e $x-1>0$, cioè $x>1$.`,
      R`Proprietà del quoziente: $\log_2 \dfrac{x+3}{x-1} = 2$.`,
      R`Per definizione di logaritmo: $\dfrac{x+3}{x-1} = 2^2 = 4$.`,
      R`$x+3 = 4(x-1) \Rightarrow x+3=4x-4 \Rightarrow 3x=7 \Rightarrow x=\dfrac{7}{3}$.`,
      R`Verifica c.e.: $\dfrac{7}{3} >1$. ✓`
    ], risultato: R`$x=\dfrac{7}{3}$` },

    { titolo: 'Una disequazione logaritmica', problema: R`Risolvi $\log_{1/3}(2x-1) > -2$.`, passi: [
      R`C.e.: $2x-1>0 \Rightarrow x>\dfrac{1}{2}$.`,
      R`Scrivo $-2$ come logaritmo in base $\frac13$: $-2 = \log_{1/3} 9$ (perché $\left(\frac13\right)^{-2}=9$).`,
      R`$\log_{1/3}(2x-1) > \log_{1/3} 9$: la base è minore di $1$, quindi il verso si inverte, $2x-1 < 9 \Rightarrow x<5$.`,
      R`Intersezione con la c.e.: $\dfrac{1}{2} < x < 5$.`
    ], risultato: R`$\dfrac{1}{2} < x < 5$` },

    { titolo: "Un'equazione esponenziale risolta con il logaritmo", problema: R`Risolvi $3^{2x-1} = 10$.`, passi: [
      R`Applico $\ln$ a entrambi i membri: $\ln(3^{2x-1}) = \ln 10 \Rightarrow (2x-1)\ln 3 = \ln 10$.`,
      R`$2x - 1 = \dfrac{\ln10}{\ln3} \approx \dfrac{2{,}303}{1{,}099} \approx 2{,}096$.`,
      R`$2x \approx 3{,}096 \Rightarrow x \approx 1{,}548$.`
    ], risultato: R`$x \approx 1{,}548$` }
  ],
  formulario: [
    { nome: 'Definizione di logaritmo', formula: R`\log_a b = x \iff a^x = b`, nota: R`Condizioni: $a > 0$, $a \ne 1$, $b > 0$.` },
    { nome: 'Logaritmo di 1', formula: R`\log_a 1 = 0` },
    { nome: 'Logaritmo della base', formula: R`\log_a a = 1` },
    { nome: 'Proprietà del prodotto', formula: R`\log_a(b \cdot c) = \log_a b + \log_a c`, nota: R`Con $b > 0$, $c > 0$.` },
    { nome: 'Proprietà del quoziente', formula: R`\log_a\frac{b}{c} = \log_a b - \log_a c`, nota: R`Con $b > 0$, $c > 0$.` },
    { nome: 'Proprietà della potenza', formula: R`\log_a b^k = k \log_a b` },
    { nome: 'Cambiamento di base', formula: R`\log_a b = \frac{\log_c b}{\log_c a}`, nota: R`Con $c > 0$, $c \ne 1$; spesso $c = 10$ o $c = e$.` },
    { nome: 'Basi scambiate', formula: R`\log_a b = \frac{1}{\log_b a}` },
    { nome: 'Logaritmo decimale', formula: R`\log b = \log_{10} b` },
    { nome: 'Logaritmo naturale', formula: R`\ln b = \log_e b`, nota: R`Con $e \approx 2{,}718$.` },
    { nome: 'Identità logaritmo-esponenziale', formula: R`a^{\log_a x} = x, \qquad \log_a(a^x) = x`, nota: R`La prima vale per $x > 0$, la seconda per ogni $x$.` },
    { nome: 'Equazione esponenziale con i logaritmi', formula: R`a^x = b \ \Rightarrow\ x = \frac{\log b}{\log a}`, nota: R`Con $a>0$, $a\ne1$, $b>0$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Definizione di logaritmo`, retro: R`$\log_a b = x \iff a^x = b$, con $a>0$, $a\ne1$, $b>0$.` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Condizioni per $\log_a b$`, retro: R`$a>0$, $a\ne1$ e $b>0$ (l'argomento deve essere positivo).` },
    { id: 'fc-03', sezione: 'definizione', tipo: 'concetto', fronte: R`Perché l'argomento di un logaritmo deve essere positivo?`, retro: R`Una potenza con base positiva è sempre positiva: nessun esponente dà un risultato negativo o nullo.` },
    { id: 'fc-04', sezione: 'logaritmi-notevoli', tipo: 'formula', fronte: R`$\log_a 1$`, retro: R`$=0$ per ogni base valida, perché $a^0=1$.` },
    { id: 'fc-05', sezione: 'logaritmi-notevoli', tipo: 'formula', fronte: R`$\log_a a$`, retro: R`$=1$ per ogni base valida, perché $a^1=a$.` },
    { id: 'fc-06', sezione: 'logaritmi-notevoli', tipo: 'definizione', fronte: R`Logaritmo decimale`, retro: R`$\log b$ senza base indicata: sottintende base $10$.` },
    { id: 'fc-07', sezione: 'logaritmi-notevoli', tipo: 'definizione', fronte: R`Logaritmo naturale`, retro: R`$\ln b$: logaritmo in base $e \approx 2{,}718$.` },
    { id: 'fc-08', sezione: 'proprieta', tipo: 'formula', fronte: R`Proprietà del prodotto`, retro: R`$\log_a(bc)=\log_a b+\log_a c$, con $b,c>0$.` },
    { id: 'fc-09', sezione: 'proprieta', tipo: 'formula', fronte: R`Proprietà del quoziente`, retro: R`$\log_a\frac{b}{c}=\log_a b-\log_a c$, con $b,c>0$.` },
    { id: 'fc-10', sezione: 'proprieta', tipo: 'formula', fronte: R`Proprietà della potenza`, retro: R`$\log_a b^k=k\log_a b$.` },
    { id: 'fc-11', sezione: 'proprieta', tipo: 'concetto', fronte: R`Vale $\log_a(b+c)=\log_a b+\log_a c$?`, retro: R`No: le proprietà valgono per prodotto e quoziente, non per somma e differenza.` },
    { id: 'fc-12', sezione: 'cambiamento-base', tipo: 'formula', fronte: R`Cambiamento di base`, retro: R`$\log_a b=\dfrac{\log_c b}{\log_c a}$, con $c>0$, $c\ne1$.` },
    { id: 'fc-13', sezione: 'cambiamento-base', tipo: 'formula', fronte: R`Basi scambiate`, retro: R`$\log_a b=\dfrac{1}{\log_b a}$.` },
    { id: 'fc-14', sezione: 'inversa-esponenziale', tipo: 'concetto', fronte: R`Di quale funzione è inverso il logaritmo?`, retro: R`Della funzione esponenziale $y=a^x$: $\log_a$ e l'elevamento a potenza in base $a$ si "disfano" a vicenda.` },
    { id: 'fc-15', sezione: 'inversa-esponenziale', tipo: 'formula', fronte: R`$a^{\log_a x}$`, retro: R`$=x$, per $x>0$.` },
    { id: 'fc-16', sezione: 'funzione-logaritmica', tipo: 'concetto', fronte: R`Dominio di $y=\log_a x$`, retro: R`$x>0$: l'argomento deve essere positivo.` },
    { id: 'fc-17', sezione: 'funzione-logaritmica', tipo: 'concetto', fronte: R`Asintoto di $y=\log_a x$`, retro: R`La retta verticale $x=0$ (l'asse $y$).` },
    { id: 'fc-18', sezione: 'funzione-logaritmica', tipo: 'concetto', fronte: R`Quando $y=\log_a x$ è decrescente?`, retro: R`Quando $0<a<1$. È crescente quando $a>1$.` },
    { id: 'fc-19', sezione: 'equazioni-logaritmiche', tipo: 'procedura', fronte: R`Passi per risolvere un'equazione logaritmica`, retro: R`1) Condizioni di esistenza. 2) Un solo logaritmo per parte, stessa base. 3) Uguagliare gli argomenti e risolvere.` },
    { id: 'fc-20', sezione: 'equazioni-logaritmiche', tipo: 'concetto', fronte: R`Quando si scrivono le c.e. di un'equazione logaritmica?`, retro: R`Prima di applicare le proprietà, sugli argomenti originali.` },
    { id: 'fc-21', sezione: 'disequazioni-logaritmiche', tipo: 'concetto', fronte: R`Verso di una disequazione logaritmica con $a>1$`, retro: R`Si mantiene: $\log_a f(x) > \log_a g(x) \iff f(x) > g(x)$.` },
    { id: 'fc-22', sezione: 'disequazioni-logaritmiche', tipo: 'concetto', fronte: R`Verso di una disequazione logaritmica con $0<a<1$`, retro: R`Si inverte: $\log_a f(x) > \log_a g(x) \iff f(x) < g(x)$.` },
    { id: 'fc-23', sezione: 'esponenziali-con-logaritmi', tipo: 'procedura', fronte: R`Come risolvere $a^x=b$ quando $b$ non è una potenza esatta di $a$?`, retro: R`Si applica il logaritmo a entrambi i membri: $x=\dfrac{\log b}{\log a}$.` },
    { id: 'fc-24', sezione: 'applicazioni', tipo: 'formula', fronte: R`Formula del pH`, retro: R`$\text{pH}=-\log_{10}[\text{H}^+]$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $\log_2 32$.`, suggerimenti: [R`Pensa a che potenza di $2$ fa $32$.`, R`$2^5 = 32$.`], risposta: { tipo: 'numero', valore: 5, tolleranza: 0.01 }, soluzione: [R`$2^5=32$, quindi $\log_2 32 = 5$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $\log_5 \dfrac{1}{25}$.`, suggerimenti: [R`Scrivi $\dfrac{1}{25}$ come potenza di $5$.`, R`$25 = 5^2$, quindi $\dfrac{1}{25} = 5^{-2}$.`], risposta: { tipo: 'numero', valore: -2, tolleranza: 0.01 }, soluzione: [R`$\dfrac{1}{25}=5^{-2}$, quindi $\log_5\dfrac{1}{25}=-2$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Usa le proprietà dei logaritmi per calcolare $\log_2 6 + \log_2 8 - \log_2 3$.`, suggerimenti: [R`Applica prima la proprietà del prodotto, poi quella del quoziente.`, R`Dovresti arrivare a $\log_2 16$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.01 }, soluzione: [R`$\log_2 6 + \log_2 8 = \log_2(6\cdot8) = \log_2 48$.`, R`$\log_2 48 - \log_2 3 = \log_2\dfrac{48}{3} = \log_2 16$.`, R`$\log_2 16 = 4$ perché $2^4=16$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Risolvi $\log_3 x = 4$.`, suggerimenti: [R`Usa direttamente la definizione di logaritmo.`, R`$x = 3^4$.`], risposta: { tipo: 'numero', valore: 81, tolleranza: 0.01 }, soluzione: [R`Per definizione, $x = 3^4 = 81$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola $\log_2 5$ con il cambiamento di base, sapendo che $\ln 5\approx1{,}609$ e $\ln 2\approx0{,}693$. Arrotonda a due cifre decimali.`, suggerimenti: [R`$\log_2 5 = \dfrac{\ln 5}{\ln 2}$.`, R`Esegui la divisione.`], risposta: { tipo: 'numero', valore: 2.32, tolleranza: 0.01 }, soluzione: [R`$\log_2 5 = \dfrac{\ln 5}{\ln 2} \approx \dfrac{1{,}609}{0{,}693} \approx 2{,}32$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $\log(x+2) + \log(x-2) = \log 5$.`, suggerimenti: [R`Scrivi prima la condizione di esistenza: entrambi gli argomenti devono essere positivi.`, R`Usa la proprietà del prodotto per unire i due logaritmi a sinistra.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01 }, soluzione: [R`C.e.: $x+2>0$ e $x-2>0$, cioè $x>2$.`, R`$\log[(x+2)(x-2)] = \log 5 \Rightarrow x^2-4=5 \Rightarrow x^2=9 \Rightarrow x=\pm3$.`, R`Solo $x=3$ rispetta la c.e. $x>2$; $x=-3$ va scartato.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi la disequazione $\log_2(x-3) \le 4$.`, suggerimenti: [R`C.e.: l'argomento deve essere positivo.`, R`Scrivi $4$ come $\log_2 16$: la base è maggiore di $1$, il verso non cambia.`], risposta: { tipo: 'intervallo', da: 3, a: 19, chiusoDa: false, chiusoA: true }, soluzione: [R`C.e.: $x-3>0 \Rightarrow x>3$.`, R`$4 = \log_2 16$, quindi $\log_2(x-3) \le \log_2 16$; la base $2>1$ mantiene il verso: $x-3\le16 \Rightarrow x\le19$.`, R`Con la c.e.: $3 < x \le 19$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Risolvi $2^x = 12$ (usa i logaritmi, arrotonda a tre cifre decimali).`, suggerimenti: [R`Applica $\ln$ a entrambi i membri.`, R`$x = \dfrac{\ln 12}{\ln 2}$.`], risposta: { tipo: 'numero', valore: 3.585, tolleranza: 0.01 }, soluzione: [R`$\ln(2^x) = \ln 12 \Rightarrow x \ln 2 = \ln 12 \Rightarrow x = \dfrac{\ln 12}{\ln 2}$.`, R`$x \approx \dfrac{2{,}485}{0{,}693} \approx 3{,}585$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi $(\log_2 x)^2 - 3\log_2 x + 2 = 0$.`, suggerimenti: [R`C.e.: $x>0$.`, R`Sostituisci $t = \log_2 x$ e risolvi l'equazione di secondo grado in $t$.`, R`Trovati i valori di $t$, ricava $x$ da $\log_2 x = t$.`], risposta: { tipo: 'numeri', valori: [2, 4] }, soluzione: [R`C.e.: $x>0$. Pongo $t=\log_2 x$: $t^2-3t+2=0 \Rightarrow t=1$ oppure $t=2$.`, R`$\log_2 x = 1 \Rightarrow x=2$. $\log_2 x = 2 \Rightarrow x=4$. Entrambe rispettano la c.e.`] },
    { id: 'es-10', difficolta: 3, testo: R`Una soluzione ha concentrazione di ioni idrogeno $[\text{H}^+] = 10^{-4}$ mol/L. Calcola il suo pH.`, suggerimenti: [R`Usa la formula $\text{pH} = -\log_{10}[\text{H}^+]$.`, R`$-\log_{10}(10^{-4}) = ?$`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.01 }, soluzione: [R`$\text{pH} = -\log_{10}(10^{-4}) = -(-4) = 4$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Un capitale cresce del $5\%$ ogni anno, cioè si moltiplica per $1{,}05$: $C = C_0 \cdot 1{,}05^{\,t}$. Dopo quanti anni raddoppia? (Approssima all'intero più vicino.)`, suggerimenti: [R`Devi risolvere $1{,}05^{\,t} = 2$.`, R`Applica il logaritmo a entrambi i membri: $t = \dfrac{\ln 2}{\ln 1{,}05}$.`], risposta: { tipo: 'numero', valore: 14, tolleranza: 0.5 }, soluzione: [R`$1{,}05^{\,t}=2 \Rightarrow t\ln(1{,}05) = \ln 2 \Rightarrow t = \dfrac{\ln 2}{\ln 1{,}05} \approx \dfrac{0{,}693}{0{,}0488} \approx 14{,}2$.`, R`Il capitale raddoppia dopo circa $14$ anni.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un terremoto di magnitudo $7$, rispetto a uno di magnitudo $5$, quante volte più energia rilascia? (Ogni unità in più sulla scala Richter corrisponde a un fattore $10$ di energia.)`, suggerimenti: [R`La differenza di magnitudo è $2$ unità.`, R`Un fattore $10$ per ogni unità, applicato due volte, si moltiplica.`], risposta: { tipo: 'numero', valore: 100, tolleranza: 1 }, soluzione: [R`La differenza è $2$ unità: il fattore di energia è $10^2 = 100$.`, R`Il terremoto di magnitudo $7$ rilascia circa $100$ volte l'energia di quello di magnitudo $5$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale condizione è indispensabile perché $\log_a b$ sia definito?`, opzioni: [R`$b>0$ soltanto`, R`$a>0$, $a\ne1$ e $b>0$`, R`$a\ne1$ soltanto`, R`$a>0$ e $b$ qualsiasi`], corretta: 1, spiegazione: R`Servono tutte e tre le condizioni insieme: $a>0$ e $a\ne1$ sulla base, $b>0$ sull'argomento. Nessuna delle tre da sola basta.` },
    { id: 'q-02', domanda: R`Quanto vale $\log_a 1$, qualunque sia la base valida $a$?`, opzioni: [R`$0$`, R`$1$`, R`$a$`, R`non è definito`], corretta: 0, spiegazione: R`$a^0=1$ per ogni $a>0$, $a\ne1$: quindi l'esponente da dare ad $a$ per ottenere $1$ è sempre $0$.` },
    { id: 'q-03', domanda: R`Quanto vale $\log_a a$?`, opzioni: [R`$0$`, R`$a$`, R`$a^2$`, R`$1$`], corretta: 3, spiegazione: R`$a^1=a$: l'esponente da dare ad $a$ per ottenere $a$ stesso è $1$.` },
    { id: 'q-04', domanda: R`Quale delle seguenti è la proprietà del prodotto dei logaritmi?`, opzioni: [R`$\log_a(bc) = \log_a b \cdot \log_a c$`, R`$\log_a(b+c) = \log_a b + \log_a c$`, R`$\log_a(bc) = \log_a b + \log_a c$`, R`$\log_a(bc) = \log_a b - \log_a c$`], corretta: 2, spiegazione: R`Il logaritmo di un prodotto è la somma dei logaritmi dei fattori. La prima opzione confonde prodotto e somma dei logaritmi; la terza e la seconda usano l'operazione sbagliata.` },
    { id: 'q-05', domanda: R`$\log_a b^k$ è uguale a…`, opzioni: [R`$k + \log_a b$`, R`$k \log_a b$`, R`$(\log_a b)^k$`, R`$\log_a(bk)$`], corretta: 1, spiegazione: R`La proprietà della potenza porta giù l'esponente come fattore moltiplicativo: $\log_a b^k = k\log_a b$.` },
    { id: 'q-06', domanda: R`La formula del cambiamento di base afferma che $\log_a b$ è uguale a…`, opzioni: [R`$\dfrac{\log_c b}{\log_c a}$`, R`$\dfrac{\log_c a}{\log_c b}$`, R`$\log_c b - \log_c a$`, R`$\log_b c \cdot \log_c a$`], corretta: 0, spiegazione: R`Si divide il logaritmo dell'argomento per il logaritmo della base, nella nuova base $c$. Scambiare numeratore e denominatore darebbe il reciproco.` },
    { id: 'q-07', domanda: R`Il grafico di $y=\log_a x$ è il simmetrico, rispetto alla bisettrice $y=x$, del grafico di…`, opzioni: [R`$y = x^2$`, R`$y = \dfrac{1}{x}$`, R`$y = a x$`, R`$y = a^x$`], corretta: 3, spiegazione: R`Il logaritmo in base $a$ è la funzione inversa dell'esponenziale in base $a$: i loro grafici sono sempre simmetrici rispetto a $y=x$.` },
    { id: 'q-08', domanda: R`L'asintoto della funzione $y = \log_a x$ è…`, opzioni: [R`la retta orizzontale $y = 0$`, R`la retta orizzontale $y = 1$`, R`la retta verticale $x = 0$`, R`la retta verticale $x = 1$`], corretta: 2, spiegazione: R`Il logaritmo ha dominio $x>0$ e si avvicina indefinitamente all'asse $y$ (la retta $x=0$) senza mai toccarlo. L'asintoto orizzontale $y=0$ appartiene invece all'esponenziale.` },
    { id: 'q-09', domanda: R`Per quali valori di $a$ la funzione $y = \log_a x$ è decrescente?`, opzioni: [R`$a > 1$`, R`$0 < a < 1$`, R`$a < 0$`, R`$a = 1$`], corretta: 1, spiegazione: R`Come per l'esponenziale, il comportamento dipende dal confronto con $1$: crescente per $a>1$, decrescente per $0<a<1$. $a\le0$ e $a=1$ non sono basi ammesse.` },
    { id: 'q-10', domanda: R`Il dominio della funzione $y = \log_a x$ è…`, opzioni: [R`$x > 0$`, R`tutto $\mathbb{R}$`, R`$x \ge 0$`, R`$x \ne 0$`], corretta: 0, spiegazione: R`L'argomento di un logaritmo deve essere positivo, quindi il dominio è $x>0$: $x=0$ resta escluso, non incluso come richiederebbe $x\ge0$.` },
    { id: 'q-11', domanda: R`Perché nelle equazioni logaritmiche si scrivono le condizioni di esistenza sugli argomenti originali, prima di usare le proprietà?`, opzioni: [R`Perché altrimenti l'equazione diventa di secondo grado`, R`Per abitudine: non cambia nulla`, R`Perché altrimenti la base cambia`, R`Perché unendo i logaritmi in uno solo il dominio apparente può allargarsi`], corretta: 3, spiegazione: R`Dopo aver applicato le proprietà, l'argomento unico può risultare positivo anche per valori di $x$ in cui uno degli argomenti originali non lo era: le c.e. vanno fissate prima.` },
    { id: 'q-12', domanda: R`In una disequazione logaritmica con base $0 < a < 1$, tolto il logaritmo il verso della disequazione…`, opzioni: [R`si mantiene sempre`, R`dipende dal segno di $b$`, R`si inverte sempre`, R`non si può togliere il logaritmo`], corretta: 2, spiegazione: R`Con base minore di $1$ la funzione logaritmica è decrescente, quindi togliendo il logaritmo il verso della disequazione si inverte sempre.` },
    { id: 'q-13', domanda: R`Come si risolve un'equazione come $3^x = 20$, dove $20$ non è una potenza esatta di $3$?`, opzioni: [R`Non si può risolvere con i numeri reali`, R`Si applica il logaritmo a entrambi i membri`, R`Si approssima per tentativi, non esiste un metodo esatto`, R`Si cambia la base dell'esponenziale finché non torna esatta`], corretta: 1, spiegazione: R`Applicando il logaritmo a entrambi i membri si ottiene $x\log 3 = \log 20$, quindi $x = \log 20 / \log 3$: un valore esatto, anche se irrazionale.` },
    { id: 'q-14', domanda: R`Il logaritmo naturale $\ln b$ è il logaritmo di $b$ in quale base?`, opzioni: [R`$e \approx 2{,}718$`, R`$10$`, R`$2$`, R`$1$`], corretta: 0, spiegazione: R`$\ln b = \log_e b$, dove $e$ è il numero di Nepero. La base $10$ corrisponde invece al logaritmo decimale $\log b$.` },
    { id: 'q-15', domanda: R`Dire che il pH è una scala logaritmica significa che…`, opzioni: [R`il pH cresce linearmente con la concentrazione di ioni`, R`il pH non ha un'unità di misura`, R`il pH è sempre un numero intero`, R`una differenza di un'unità di pH corrisponde a un fattore $10$ nella concentrazione di ioni idrogeno`], corretta: 3, spiegazione: R`$\text{pH}=-\log_{10}[\text{H}^+]$: una unità di pH in meno corrisponde a una concentrazione $10$ volte maggiore, non a una differenza lineare.` },
    { id: 'q-16', domanda: R`Un terremoto di magnitudo $6$, rispetto a uno di magnitudo $4$, sulla scala Richter rilascia un'energia…`, opzioni: [R`doppia`, R`uguale`, R`circa $100$ volte maggiore`, R`circa $6$ volte maggiore`], corretta: 2, spiegazione: R`La differenza è di $2$ unità di magnitudo, e ogni unità corrisponde a un fattore $10$ di energia: $10^2=100$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di tutto le condizioni di esistenza: l'argomento di ogni logaritmo deve essere positivo, in equazioni e disequazioni allo stesso modo.` },
    { tipo: 'errore', testo: R`Il logaritmo di una somma non è la somma dei logaritmi: $\log_a(b+c) \ne \log_a b + \log_a c$. Le proprietà valgono solo per prodotto, quoziente e potenza.` },
    { tipo: 'errore', testo: R`Con base $0<a<1$ la funzione logaritmica è decrescente: nelle disequazioni il verso si inverte, esattamente come dividendo per un numero negativo.` },
    { tipo: 'trucco', testo: R`Per calcolare un logaritmo con la calcolatrice quando la base non è $10$ né $e$: cambia base con $\log_a b = \ln b / \ln a$.` },
    { tipo: 'metodo', testo: R`In un'equazione logaritmica, riduci sempre a un solo logaritmo per parte, nella stessa base, prima di togliere i logaritmi.` },
    { tipo: 'trucco', testo: R`Controllo lampo: la definizione $\log_a b = x \iff a^x=b$ funziona anche al contrario per verificare un risultato, elevando $a$ al valore trovato.` },
    { tipo: 'errore', testo: R`$\log_2 8$ e $\log_8 2$ non sono la stessa cosa: la base e l'argomento non si possono scambiare senza cambiare il valore.` },
    { tipo: 'metodo', testo: R`Nelle scale logaritmiche (decibel, pH, Richter) una differenza costante di unità corrisponde sempre a uno stesso fattore moltiplicativo, non a una somma: pensa in termini di "quante volte", non di "quanto in più".` }
  ],

  aneddoti: [
    { matematico: 'John Napier', anni: '1550–1617', titolo: "Vent'anni di calcoli per evitare le moltiplicazioni", testo: R`John Napier (o Nepero), barone scozzese di Merchiston, dedicò circa vent'anni al problema di semplificare i calcoli degli astronomi, oberati da moltiplicazioni e divisioni fra numeri con molte cifre. Nel 1614 pubblicò la *Mirifici Logarithmorum Canonis Descriptio*, che introduceva i logaritmi insieme a una tavola per usarli: da allora, moltiplicare due numeri bastava sommare i loro logaritmi. Inventò anche i "bastoncini di Nepero", un abaco portatile per le moltiplicazioni. Nella sua tenuta aveva fama di stregone: si racconta che, sospettando un servitore di furto, li facesse entrare uno alla volta in una stanza buia ad accarezzare un gallo nero coperto di fuliggine, dicendo che l'uccello avrebbe "riconosciuto" il colpevole. Chi usciva con le mani pulite, per la paura di toccarlo, era proprio lui il ladro.`, legame: R`L'invenzione di Napier è l'oggetto stesso di questa pagina: il logaritmo come strumento per trasformare moltiplicazioni in addizioni.` },
    { matematico: 'Henry Briggs', anni: '1561–1630', titolo: "Il viaggio a Edimburgo che ci ha dato la base 10", testo: R`Quando lesse il lavoro di Napier, il matematico inglese Henry Briggs ne rimase così colpito da affrontare un viaggio di giorni a cavallo da Londra a Edimburgo solo per conoscerlo, nell'estate del 1615. Insieme concordarono che i logaritmi sarebbero stati più comodi calcolati in base $10$, legata al nostro sistema di numerazione, invece della base scelta inizialmente da Napier. Dopo la morte di Napier, Briggs proseguì il lavoro da solo, calcolando a mano, cifra dopo cifra, i logaritmi decimali di migliaia di numeri: li pubblicò nel 1624 nell'*Arithmetica Logarithmica*, con quattordici cifre di precisione. Per due secoli, chiunque dovesse affrontare un calcolo scientifico o commerciale complicato usava tavole come le sue.`, legame: R`Il logaritmo decimale di questa pagina, quello del tasto "log" della calcolatrice, è l'invenzione di Briggs.` },
    { matematico: 'Pierre-Simon Laplace', anni: '1749–1827', titolo: 'I logaritmi che raddoppiarono la vita degli astronomi', testo: R`Pierre-Simon Laplace, fra i più importanti astronomi e matematici a cavallo fra Settecento e Ottocento, scrisse che l'invenzione dei logaritmi, riducendo a poche settimane il lavoro di molti mesi, "raddoppia, per così dire, la vita degli astronomi". Non era un'esagerazione: prima dei logaritmi, calcolare a mano l'orbita di un pianeta richiedeva moltiplicazioni e divisioni fra numeri di molte cifre, ripetute migliaia di volte; con le tavole logaritmiche quei calcoli diventavano somme e sottrazioni. Per quasi tre secoli e mezzo, dalle tavole di Briggs fino agli anni Settanta del Novecento, ingegneri e scienziati calcolarono con le tavole logaritmiche o con il regolo calcolatore, un righello a scale logaritmiche scorrevoli capace di moltiplicare e dividere spostando due aste, reso superfluo solo dalle calcolatrici tascabili.`, legame: R`È la ragione pratica per cui i logaritmi furono inventati e usati per secoli: trasformare calcoli lunghi in calcoli brevi.` },
    { matematico: 'Charles Richter', anni: '1900–1985', titolo: 'Una scala pensata per non scrivere numeri enormi', testo: R`Nel 1935 il sismologo Charles Richter, insieme al collega Beno Gutenberg, cercava un modo per confrontare l'intensità dei terremoti della California registrati da stazioni a distanze diverse dall'epicentro. L'energia rilasciata da un terremoto forte può essere miliardi di volte quella di una scossa lieve: scriverla in numeri normali avrebbe prodotto cifre da capogiro, diverse per ogni evento. Richter ebbe l'idea di usare il logaritmo dell'ampiezza delle onde sismiche registrate da un sismografo: ogni unità in più sulla sua scala corrisponde a un fattore dieci nell'ampiezza, e a circa trentadue volte più energia. Lo stesso trucco, applicato a grandezze diverse, sta dietro ai decibel del suono, proposti pochi anni prima dai laboratori telefonici Bell, e al pH delle soluzioni, ideato nel 1909 dal chimico danese Søren Sørensen.`, legame: R`Richter, i decibel e il pH sono la stessa idea applicata a tre campi diversi: comprimere numeri enormi in una scala logaritmica leggibile.` }
  ]
});
})();
