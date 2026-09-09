(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'derivate',
  titolo: 'Derivate',

  introduzione: R`La derivata risponde a una domanda molto pratica: quanto velocemente sta cambiando una quantità, proprio in questo istante? Nasce da due problemi antichi — trovare la retta tangente a una curva in un punto, e calcolare la velocità istantanea di un corpo in moto — che si rivelano essere, matematicamente, lo stesso problema: il limite di un rapporto quando l'intervallo su cui lo si calcola tende a zero.

Le derivate sono ovunque appena si parla di "quanto in fretta": la pendenza di una strada in salita, la velocità segnata dal tachimetro di un'automobile, il tasso a cui cresce una popolazione di batteri, il costo di produrre un'unità in più di un bene. È anche lo strumento che, nella prossima tappa, permetterà di studiare a fondo il grafico di una funzione: dove cresce, dove ha massimi e minimi, come è curvato.

Per affrontare questo argomento servono i limiti — in particolare il calcolo del limite di un rapporto — e la continuità delle funzioni: la derivata userà entrambi fin dalla prima definizione.`,

  sezioni: [
    { id: 'tangente-velocita', titolo: 'Il problema della tangente e della velocità istantanea', testo: R`Il calcolo differenziale nasce da due domande che sembrano lontane, ma sono in fondo la stessa domanda.

La prima è geometrica: data una curva e un suo punto, qual è la retta **tangente** in quel punto, cioè la retta che "tocca" la curva assecondandone la direzione proprio lì? Per una circonferenza la tangente era nota fin dall'antichità (perpendicolare al raggio), ma per una curva qualunque — una parabola, una sinusoide — non è affatto chiaro cosa voglia dire "avere la stessa direzione" in un unico punto.

La seconda è fisica: un corpo si muove secondo una legge oraria $s(t)$, che dà la posizione al tempo $t$. La sua velocità media tra gli istanti $t_0$ e $t_0+h$ è $\dfrac{s(t_0+h)-s(t_0)}{h}$: spazio percorso diviso tempo impiegato. Ma quanto vale la velocità in un istante preciso, quella segnata dal tachimetro proprio ora? Un istante da solo non ha durata: non si può dividere per un intervallo di tempo nullo.

>* **L'idea che risolve entrambi i problemi:** si calcola il rapporto (pendenza di una secante, oppure velocità media) su un intervallo piccolo, e si osserva che cosa succede quando l'intervallo si restringe verso zero. Se quel valore si stabilizza attorno a un numero, quel numero è la risposta: la pendenza della tangente, oppure la velocità istantanea.

Un sasso lasciato cadere segue, in caduta libera, la legge $s(t) = 5t^2$ (metri, $t$ in secondi). La velocità media tra $t=1$ e $t=1+h$ è $\dfrac{5(1+h)^2-5}{h} = 10+5h$: al diminuire di $h$ questo numero si avvicina sempre di più a $10$.

| $h$ | velocità media (m/s) |
|---|---|
| 0,1 | 10,5 |
| 0,01 | 10,05 |
| 0,001 | 10,005 |

La velocità istantanea in $t=1$ è il valore a cui questi numeri tendono: $10$ m/s.

>! Velocità media e velocità istantanea non sono la stessa cosa: un'automobile può percorrere $100\ \text{km}$ in un'ora (velocità media $100\ \text{km/h}$) pur avendo, istante per istante, una velocità che sale e scende. Il tachimetro mostra la velocità istantanea, non quella media.` },

    { id: 'rapporto-incrementale', titolo: 'Il rapporto incrementale e la derivata come limite', testo: R`Il numero a cui tendono la pendenza della secante e la velocità media si chiama **derivata**, e si ottiene formalizzando l'idea della sezione precedente.

>* **Rapporto incrementale** di $f$ in $x_0$: $$\frac{f(x_0+h)-f(x_0)}{h}, \qquad h \ne 0.$$ È la pendenza della retta secante che passa per i punti $(x_0, f(x_0))$ e $(x_0+h, f(x_0+h))$.

>* **Derivata** di $f$ in $x_0$: $$f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h},$$ quando questo limite esiste ed è finito. Si dice allora che $f$ è **derivabile** in $x_0$. Si scrive anche $\dfrac{df}{dx}(x_0)$.

Al diminuire di $h$, il punto $(x_0+h, f(x_0+h))$ scivola verso $(x_0, f(x_0))$ e la secante ruota fino a diventare la tangente: è esattamente quello che mostra l'animazione.

[[animazione:secante-tangente]]

**Calcolo per $f(x) = x^2$.** Il rapporto incrementale è $\dfrac{(x+h)^2-x^2}{h} = \dfrac{2xh+h^2}{h} = 2x+h$; il limite per $h \to 0$ dà $f'(x) = 2x$.

**Calcolo per $f(x) = \dfrac{1}{x}$** (con $x \ne 0$). Riducendo allo stesso denominatore, il rapporto incrementale vale $-\dfrac{1}{x(x+h)}$; il limite per $h \to 0$ dà $f'(x) = -\dfrac{1}{x^2}$.

Il grafico seguente calcola il rapporto incrementale di $\sin x$ in $x_0=1$ per un valore di $h$ che puoi cambiare: riducendo $h$ il valore numerico si avvicina a $\cos(1)$ (circa 0,54), e la secante per i due punti si avvicina alla tangente.

[[grafico:rapporto-sin]]

>! Il rapporto incrementale **da solo** non è la derivata: è un numero che dipende da $h$. La derivata è il valore-limite, non un valore calcolato con un $h$ qualunque, per quanto piccolo.` },

    { id: 'significato-geometrico', titolo: 'Significato geometrico: la retta tangente', testo: R`La derivata $f'(x_0)$, quando esiste, ha un significato geometrico preciso: è il **coefficiente angolare** (la pendenza) della retta tangente al grafico di $f$ nel punto $(x_0, f(x_0))$.

>* **Equazione della retta tangente** al grafico di $f$ in $x_0$: $$y = f(x_0) + f'(x_0)(x-x_0).$$ Servono due numeri: il valore della funzione $f(x_0)$ e il valore della derivata $f'(x_0)$.

Per esempio, per $f(x) = \dfrac{x^2}{4}$ si ha $f'(x) = \dfrac{x}{2}$ (regola della potenza, vista più avanti in questo argomento). Nel punto di ascissa $p$ la tangente ha pendenza $f'(p) = \dfrac{p}{2}$: trascinando il punto nel grafico qui sotto la tangente ruota, e la pendenza cambia con continuità, senza salti.

[[grafico:tangente-mobile]]

Quando $f'(x_0) = 0$ la tangente è orizzontale: il grafico, in quel punto, non sta né salendo né scendendo (è il caso tipico dei punti di massimo o minimo relativo, che si studieranno con lo studio di funzione). Quando $|f'(x_0)|$ è molto grande, il grafico sale o scende ripidamente.

>! Nell'equazione della tangente bisogna svolgere il prodotto $f'(x_0)(x-x_0)$ prima di semplificare: scrivere $y = f(x_0) + f'(x_0)x - x_0$ (senza il prodotto per $x_0$ dentro la parentesi) è un errore che cambia completamente la retta.` },

    { id: 'continuita-derivabilita', titolo: 'Derivata destra e sinistra; continuità e derivabilità', testo: R`Il rapporto incrementale può avere limiti diversi a seconda che $h$ tenda a $0$ da destra o da sinistra.

>* **Derivata destra e sinistra**: $$f'_+(x_0) = \lim_{h \to 0^+} \frac{f(x_0+h)-f(x_0)}{h}, \qquad f'_-(x_0) = \lim_{h \to 0^-} \frac{f(x_0+h)-f(x_0)}{h}.$$ $f$ è derivabile in $x_0$ se e solo se $f'_+(x_0)$ e $f'_-(x_0)$ esistono, sono finite e coincidono; il loro valore comune è $f'(x_0)$.

C'è un legame stretto, ma a senso unico, tra derivabilità e continuità:

>* Se $f$ è derivabile in $x_0$, allora $f$ è continua in $x_0$. Il viceversa è **falso**: esistono funzioni continue ma non derivabili.

L'esempio classico è $f(x) = |x|$ in $x_0 = 0$. La funzione è continua (non ha salti né buchi), ma
$$f'_-(0) = \lim_{h \to 0^-} \frac{|h|-0}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1, \qquad f'_+(0) = \lim_{h \to 0^+} \frac{|h|-0}{h} = \lim_{h \to 0^+} \frac{h}{h} = 1.$$
Le due derivate esistono, sono finite, ma sono diverse: $f$ non è derivabile in $0$. Il grafico ha uno "spigolo".

[[grafico:valore-assoluto]]

>! "Continua" non vuol dire "derivabile": si può disegnare $|x|$ senza staccare la penna dal foglio (continuità), ma nel vertice la direzione cambia bruscamente, e lì non esiste un'unica tangente.` },

    { id: 'punti-non-derivabili', titolo: 'Punti di non derivabilità', testo: R`Quando le derivate destra e sinistra non coincidono in uno stesso numero finito, il punto si chiama **punto di non derivabilità**. Ce ne sono di tre tipi, a seconda di come si comportano quei due limiti:

- **Punto angoloso**: $f'_+(x_0)$ e $f'_-(x_0)$ esistono finite ma sono diverse. Il grafico ha uno spigolo, con due tangenti distinte da destra e da sinistra (è il caso di $|x|$ in $x_0=0$, visto nella sezione precedente).
- **Cuspide**: le derivate destra e sinistra sono infinite e di **segno opposto**. Il caso tipico è $f(x) = \sqrt[3]{x^2}$ in $x_0=0$: da destra la pendenza tende a $+\infty$, da sinistra a $-\infty$. Il grafico ha una "punta" appuntita.
- **Flesso a tangente verticale**: le derivate destra e sinistra sono infinite ma dello **stesso segno**. Il caso tipico è $f(x) = \sqrt[3]{x}$ in $x_0=0$: da entrambi i lati la pendenza tende a $+\infty$. La tangente è verticale, ma il grafico non ha uno spigolo: lo attraversa con un cambio di concavità, come un flesso.

>* Nei tre casi la funzione resta **continua**: non ci sono salti, solo direzioni che non si "aggiustano" in un'unica tangente finita.

[[grafico:cuspide]]

[[grafico:flesso-verticale]]

>! Cuspide e flesso a tangente verticale si confondono facilmente: guarda il **segno** delle due derivate agli estremi. Se sono opposte è una cuspide (il grafico "punta"); se sono uguali è un flesso (il grafico "scivola" attraverso, in verticale).` },

    { id: 'derivate-elementari', titolo: 'Le derivate delle funzioni elementari', testo: R`Applicando la definizione di derivata a ciascuna funzione elementare si ottiene una tabella di risultati che si usa sempre, senza rifare il limite ogni volta.

| $f(x)$ | $f'(x)$ | condizione |
|---|---|---|
| $c$ (costante) | $0$ | — |
| $x^n$ | $n\,x^{n-1}$ | dove $x^n$ è definita |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $x>0$ |
| $\sin x$ | $\cos x$ | — |
| $\cos x$ | $-\sin x$ | — |
| $\tan x$ | $\dfrac{1}{\cos^2 x}$ | $\cos x \ne 0$ |
| $e^x$ | $e^x$ | — |
| $a^x$ | $a^x \ln a$ | $a>0,\ a \ne 1$ |
| $\ln x$ | $\dfrac{1}{x}$ | $x>0$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ | $x>0,\ a>0,\ a\ne 1$ |

Le prime due righe non dette a parole sono già state ricavate con la definizione nella sezione precedente, per $n=2$ e per $n=-1$ (visto che $\dfrac{1}{x}=x^{-1}$): la regola $(x^n)' = n\,x^{n-1}$ le contiene entrambe come casi particolari, e vale anche per $n$ non intero. Per esempio $\sqrt{x}=x^{1/2}$ dà $\dfrac{1}{2}x^{-1/2} = \dfrac{1}{2\sqrt{x}}$, coerente con la tabella.

La derivata di $\tan x = \dfrac{\sin x}{\cos x}$ si ottiene con la regola del quoziente (prossima sezione): $\dfrac{\cos x \cdot \cos x - \sin x\cdot(-\sin x)}{\cos^2 x} = \dfrac{\cos^2 x+\sin^2 x}{\cos^2 x} = \dfrac{1}{\cos^2 x}$.

>* Le funzioni $e^x$, $\sin x$ e $\cos x$ sono le più "comode" da derivare: $e^x$ è l'unica funzione (a meno di un fattore costante) che coincide con la propria derivata; $\sin$ e $\cos$ si scambiano ciclicamente derivando quattro volte.

>! La derivata di $a^x$ **non** è $x\,a^{x-1}$ (quella è la regola della potenza, che vale quando è la base a essere la variabile, con esponente fisso): qui è l'esponente a variare, e compare un fattore $\ln a$. Per esempio $(2^x)' = 2^x \ln 2$, non $x\cdot 2^{x-1}$.` },

    { id: 'regole-derivazione', titolo: 'Le regole di derivazione', testo: R`Calcolare ogni derivata con la definizione sarebbe scomodo: le **regole di derivazione** permettono di derivare funzioni complicate combinando le derivate note delle funzioni elementari.

>* **Somma**: $(f+g)' = f'+g'$. **Prodotto**: $(fg)' = f'g+fg'$. **Quoziente**: $\left(\dfrac{f}{g}\right)' = \dfrac{f'g-fg'}{g^2}$, con $g \ne 0$.

Un errore frequente è pensare che il prodotto si derivi come la somma, cioè $(fg)'=f'g'$: non è vero. Per esempio con $f(x)=x$ e $g(x)=x$ si ha $fg=x^2$, la cui derivata è $2x$; ma $f'g' = 1 \cdot 1 = 1 \ne 2x$.

**Esempio di prodotto**: $f(x) = x^2\sin x$. Con $u=x^2$, $v=\sin x$: $f'(x) = 2x\sin x + x^2\cos x$.

**Esempio di quoziente**: $f(x) = \dfrac{x}{x^2+1}$. Con $u=x$, $v=x^2+1$: $f'(x) = \dfrac{1\cdot(x^2+1)-x\cdot 2x}{(x^2+1)^2} = \dfrac{1-x^2}{(x^2+1)^2}$.

>* **Funzione composta (regola della catena)**: se $y=f(g(x))$, allora $$[f(g(x))]' = f'(g(x)) \cdot g'(x).$$ Si deriva prima la funzione "esterna" $f$, calcolata nel punto interno $g(x)$, e si moltiplica per la derivata della funzione "interna" $g$.

Per esempio $f(x) = \sqrt{x^2+1}$: l'esterna è $\sqrt{u}$ con derivata $\dfrac{1}{2\sqrt{u}}$, l'interna è $u=x^2+1$ con derivata $2x$; quindi $f'(x) = \dfrac{1}{2\sqrt{x^2+1}}\cdot 2x = \dfrac{x}{\sqrt{x^2+1}}$.

**Cenni sulla funzione inversa.** Se $f$ è invertibile e derivabile, con $f'(x_0) \ne 0$, e $y_0=f(x_0)$, allora anche $f^{-1}$ è derivabile in $y_0$ e $$(f^{-1})'(y_0) = \frac{1}{f'(x_0)}.$$ L'idea: i grafici di $f$ e $f^{-1}$ sono simmetrici rispetto alla bisettrice $y=x$, e la simmetria scambia le pendenze con i loro reciproci.

>! Nella regola della catena si dimentica spesso il fattore $g'(x)$: derivare $\sin(3x)$ come $\cos(3x)$ e fermarsi è un errore. La derivata corretta è $\cos(3x)\cdot 3$, perché l'interna $3x$ ha derivata $3$, non $1$.` },

    { id: 'derivate-successive-differenziale', titolo: 'Derivate di ordine superiore e il differenziale', testo: R`Derivando la funzione derivata $f'(x)$ si ottiene la **derivata seconda**, indicata $f''(x)$ oppure $\dfrac{d^2y}{dx^2}$; derivando ancora si ottengono la derivata terza $f'''(x)$, la quarta $f^{(4)}(x)$, e così via, per ogni ordine $n$: $f^{(n)}(x)$.

Per esempio, se $f(x) = x^4 - 2x^3$: $$f'(x) = 4x^3-6x^2, \qquad f''(x) = 12x^2-12x, \qquad f'''(x) = 24x-12, \qquad f^{(4)}(x)=24.$$ Dalla quinta derivata in poi, per questo polinomio di quarto grado, si ottiene sempre $0$.

>* Le derivate successive misurano come cambia il **tasso di variazione**: se $f$ è una posizione, $f'$ è la velocità e $f''$ è l'accelerazione (si vedrà nella prossima sezione). In generale $f''$ descrive come varia la pendenza del grafico di $f$, cioè la sua concavità — argomento dello studio di funzione.

**Cenni sul differenziale.** Il differenziale di $f$ in $x_0$ è $$df = f'(x_0)\,dx,$$ dove $dx$ è un incremento, piccolo ma non nullo, della variabile $x$. È l'approssimazione **lineare** della variazione reale $f(x_0+dx)-f(x_0)$: tanto più $dx$ è piccolo, tanto migliore è l'approssimazione, perché vicino a $x_0$ il grafico di $f$ si confonde con la sua retta tangente.

>! $f''$ non è $(f')^2$: sono due oggetti diversi. $(f')^2$ è il quadrato della funzione derivata; $f''$ è la derivata della derivata. Con $f(x)=x^2$: $f'(x)=2x$, quindi $(f')^2 = 4x^2$, mentre $f''(x) = 2$.` },

    { id: 'applicazioni', titolo: 'Applicazioni: velocità, accelerazione e tasso di variazione', testo: R`La derivata, in ogni contesto e non solo geometrico, misura il **tasso di variazione istantaneo** di una quantità rispetto a un'altra.

>* Se $s(t)$ è la posizione di un corpo in funzione del tempo: $$v(t) = s'(t) \quad \text{(velocità)}, \qquad a(t) = v'(t) = s''(t) \quad \text{(accelerazione)}.$$ La velocità è il tasso di variazione della posizione; l'accelerazione è il tasso di variazione della velocità.

Il segno di $f'(x)$ dice se $f$ sta crescendo o decrescendo: dove $f'(x)>0$ il grafico sale, dove $f'(x)<0$ scende. Il grafico seguente mostra $f(x)=x^3-3x$ insieme alla sua derivata $f'(x)=3x^2-3$: dove la curva di $f'$ sta sopra l'asse $x$ (cioè $f'(x)>0$, per $x<-1$ oppure $x>1$) la cubica $f$ sta salendo; dove sta sotto (per $-1<x<1$) la cubica sta scendendo; nei punti $x=\pm 1$, dove $f'=0$, $f$ ha un massimo o un minimo relativo.

[[grafico:crescita-segno]]

Un esempio di moto: un punto con legge oraria $s(t)=t^3-6t^2+9t$ (metri, secondi) ha $v(t)=3t^2-12t+9$; in $t=1$ risulta $v(1)=0$ (il punto è momentaneamente fermo) e $a(1)=v'(1) = 6\cdot 1-12=-6\ \text{m/s}^2$ (l'accelerazione è negativa: il punto sta per invertire il verso di marcia).

La stessa idea vale fuori dalla fisica: se $P(t)$ è una popolazione, $P'(t)$ è il tasso di crescita (individui per anno); se $C(x)$ è un costo di produzione, $C'(x)$ è il **costo marginale**, cioè il costo approssimativo di produrre un'unità in più.

>! Velocità e accelerazione possono essere **negative**: il segno indica solo il verso rispetto a quello scelto come positivo, non che il corpo "torni indietro nel tempo". Non va confusa la velocità (con segno) con la **rapidità**, che è il suo valore assoluto $|v(t)|$.` }
  ],

  grafici: {
    'tangente-mobile': {
      tipo: 'piano', x: [-4, 4], y: [-1, 5],
      parametri: [{ nome: 'p', min: -3.5, max: 3.5, passo: 0.1, valore: 2, etichetta: 'p' }],
      funzioni: [{ f: 'x^2/4', etichetta: 'y = x²/4', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', 'p^2/4'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'tangente', f: 'x^2/4', x0: 'p', colore: 3 },
        { tipo: 'testo', p: [-3.8, 4.5], testo: "f'(p) = {{p/2}}", ancora: 'start' }
      ],
      didascalia: "Trascina P: la tangente ruota, e la sua pendenza f'(p) = p/2 cambia con continuità."
    },
    'rapporto-sin': {
      tipo: 'piano', x: [-1, 3.5], y: [-1.7, 1.9],
      parametri: [{ nome: 'h', min: 0.05, max: 2, passo: 0.05, valore: 1, etichetta: 'h' }],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1 }],
      punti: [
        { x: 1, y: 'sin(1)', etichetta: 'P', posizione: 'basso', colore: 2 },
        { x: '1+h', y: 'sin(1+h)', etichetta: 'Q', posizione: 'alto', colore: 3 }
      ],
      elementi: [
        { tipo: 'retta', per: [[1, 'sin(1)'], ['1+h', 'sin(1+h)']], etichetta: 'secante', colore: 3 },
        { tipo: 'testo', p: [-0.9, 1.65], testo: 'rapporto incrementale = {{(sin(1+h)-sin(1))/h}}', ancora: 'start' }
      ],
      didascalia: 'Al diminuire di h la secante per P e Q si avvicina alla tangente in P, e il rapporto incrementale si avvicina a cos(1).'
    },
    'valore-assoluto': {
      tipo: 'piano', x: [-3, 3], y: [-1, 3.2],
      funzioni: [{ f: 'abs(x)', etichetta: 'y = |x|', colore: 1 }],
      elementi: [{ tipo: 'punto', p: [0, 0], etichetta: 'punto angoloso', posizione: 'basso', colore: 2 }],
      didascalia: 'In x = 0 la funzione è continua ma ha un punto angoloso: le pendenze da sinistra e da destra sono −1 e +1.'
    },
    'cuspide': {
      tipo: 'piano', x: [-3, 3], y: [-0.5, 2.5],
      funzioni: [{ f: 'cbrt(x)^2', etichetta: 'y = ∛(x²)', colore: 1 }],
      elementi: [{ tipo: 'punto', p: [0, 0], etichetta: 'cuspide', posizione: 'alto', colore: 2 }],
      didascalia: 'In x = 0 le due tangenti diventano verticali con pendenze di segno opposto: una cuspide.'
    },
    'flesso-verticale': {
      tipo: 'piano', x: [-3, 3], y: [-2, 2],
      funzioni: [{ f: 'cbrt(x)', etichetta: 'y = ∛x', colore: 1 }],
      elementi: [{ tipo: 'punto', p: [0, 0], etichetta: 'flesso a tangente verticale', posizione: 'destra', colore: 2 }],
      didascalia: "In x = 0 la tangente è verticale, ma non c'è uno spigolo: è un flesso a tangente verticale."
    },
    'crescita-segno': {
      tipo: 'piano', x: [-2.5, 2.5], y: [-4, 4],
      funzioni: [
        { f: 'x^3 - 3x', etichetta: 'f(x) = x³ − 3x', colore: 1 },
        { f: '3x^2 - 3', etichetta: "f'(x) = 3x² − 3", colore: 2 }
      ],
      elementi: [
        { tipo: 'verticale', x: -1, tratteggio: true, colore: 4 },
        { tipo: 'verticale', x: 1, tratteggio: true, colore: 4 }
      ],
      punti: [
        { x: -1, y: 2, etichetta: 'max', posizione: 'alto', colore: 4 },
        { x: 1, y: -2, etichetta: 'min', posizione: 'basso', colore: 4 }
      ],
      didascalia: "Dove f' > 0 (fuori da [−1, 1]) la cubica f cresce; dove f' < 0 (dentro [−1, 1]) decresce; in x = ±1, dove f' = 0, f ha un massimo o un minimo relativo."
    }
  },

  esempi: [
    { titolo: 'Una derivata calcolata con la definizione (potenza)', problema: R`Calcola $f'(x)$ per $f(x) = x^2$ usando la **definizione** di derivata.`, passi: [
      R`Scrivo il rapporto incrementale: $\dfrac{f(x+h)-f(x)}{h} = \dfrac{(x+h)^2 - x^2}{h}$.`,
      R`Sviluppo il quadrato: $(x+h)^2 = x^2+2xh+h^2$, quindi il numeratore diventa $2xh+h^2$.`,
      R`Metto in evidenza $h$ e semplifico, lecito perché nel rapporto incrementale $h \ne 0$: $\dfrac{h(2x+h)}{h} = 2x+h$.`,
      R`Calcolo il limite per $h \to 0$: il termine $h$ sparisce e resta $2x$.`
    ], risultato: R`$f'(x) = 2x$` },

    { titolo: 'Una derivata calcolata con la definizione (reciproco)', problema: R`Calcola $f'(x)$ per $f(x) = \dfrac{1}{x}$ (con $x \ne 0$) usando la definizione di derivata.`, passi: [
      R`Scrivo il rapporto incrementale: $\dfrac{\frac{1}{x+h}-\frac{1}{x}}{h}$.`,
      R`Riduco il numeratore allo stesso denominatore: $\dfrac{1}{x+h}-\dfrac{1}{x} = \dfrac{x-(x+h)}{x(x+h)} = \dfrac{-h}{x(x+h)}$.`,
      R`Divido per $h$ (lecito perché $h \ne 0$): $\dfrac{-h}{x(x+h)} \cdot \dfrac{1}{h} = \dfrac{-1}{x(x+h)}$.`,
      R`Calcolo il limite per $h \to 0$: $x(x+h) \to x^2$, quindi il rapporto tende a $-\dfrac{1}{x^2}$.`
    ], risultato: R`$f'(x) = -\dfrac{1}{x^2}$, con $x \ne 0$` },

    { titolo: "L'equazione della retta tangente", problema: R`Scrivi l'equazione della retta tangente al grafico di $f(x) = x^3$ nel punto di ascissa $x_0 = 2$.`, passi: [
      R`Calcolo $f(x_0)$: $f(2) = 2^3 = 8$.`,
      R`Calcolo la derivata con la regola della potenza: $f'(x) = 3x^2$, quindi $f'(2) = 3 \cdot 4 = 12$.`,
      R`Uso l'equazione della tangente $y = f(x_0) + f'(x_0)(x-x_0)$: $y = 8 + 12(x-2)$.`,
      R`Svolgo il prodotto e riduco: $y = 8 + 12x - 24 = 12x - 16$.`
    ], risultato: R`$y = 12x - 16$` },

    { titolo: 'Derivata di un prodotto', problema: R`Deriva $f(x) = x^2 \sin x$.`, passi: [
      R`Riconosco un prodotto di due funzioni: $u(x) = x^2$ e $v(x) = \sin x$.`,
      R`Uso la regola del prodotto $(uv)' = u'v + uv'$, con $u' = 2x$ e $v' = \cos x$.`,
      R`Sostituisco: $f'(x) = 2x \sin x + x^2 \cos x$.`
    ], risultato: R`$f'(x) = 2x\sin x + x^2\cos x$` },

    { titolo: 'Derivata di una funzione composta', problema: R`Deriva $f(x) = \sqrt{x^2+1}$.`, passi: [
      R`Riconosco una funzione composta: la funzione esterna è $\sqrt{u}$, quella interna è $u = x^2+1$.`,
      R`Derivata dell'esterna rispetto a $u$: $\dfrac{1}{2\sqrt{u}}$. Derivata dell'interna: $u' = 2x$.`,
      R`Regola della catena: $f'(x) = \dfrac{1}{2\sqrt{x^2+1}} \cdot 2x$.`,
      R`Semplifico il fattore $2$: $f'(x) = \dfrac{x}{\sqrt{x^2+1}}$.`
    ], risultato: R`$f'(x) = \dfrac{x}{\sqrt{x^2+1}}$` },

    { titolo: 'Velocità e accelerazione di un moto', problema: R`Un punto materiale si muove secondo la legge oraria $s(t) = t^3 - 6t^2 + 9t$ (metri, $t$ in secondi, $t \ge 0$). Trova velocità e accelerazione all'istante $t=1$ e interpreta i risultati.`, passi: [
      R`La velocità è la derivata della posizione: $v(t) = s'(t) = 3t^2 - 12t + 9$.`,
      R`Calcolo $v(1) = 3 - 12 + 9 = 0$: all'istante $t=1$ il punto è momentaneamente fermo.`,
      R`L'accelerazione è la derivata della velocità: $a(t) = v'(t) = 6t - 12$.`,
      R`Calcolo $a(1) = 6 - 12 = -6$: l'accelerazione è negativa, quindi la velocità sta diminuendo (subito dopo $t=1$ il punto inizia a muoversi nel verso opposto).`
    ], risultato: R`$v(1) = 0\ \text{m/s}$, $a(1) = -6\ \text{m/s}^2$` }
  ],

  formulario: [
    { nome: 'Definizione di derivata', formula: R`f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}`, nota: R`Vale se il limite esiste ed è finito; si dice allora che $f$ è derivabile in $x_0$.` },
    { nome: 'Retta tangente', formula: R`y = f(x_0) + f'(x_0)(x - x_0)` },
    { nome: 'Derivata di una costante', formula: R`\frac{d}{dx}(c) = 0`, nota: R`Vale per ogni $c \in \mathbb{R}$.` },
    { nome: 'Derivata della potenza', formula: R`(x^n)' = n\,x^{n-1}`, nota: R`Vale per ogni $n$ reale, dove $x^n$ è definita.` },
    { nome: 'Derivata della radice quadrata', formula: R`(\sqrt{x})' = \frac{1}{2\sqrt{x}}`, nota: R`Richiede $x > 0$.` },
    { nome: 'Derivata del seno', formula: R`(\sin x)' = \cos x` },
    { nome: 'Derivata del coseno', formula: R`(\cos x)' = -\sin x` },
    { nome: R`Derivata dell'esponenziale`, formula: R`(e^x)' = e^x` },
    { nome: 'Derivata del logaritmo naturale', formula: R`(\ln x)' = \frac{1}{x}`, nota: R`Richiede $x > 0$.` },
    { nome: 'Regola della somma', formula: R`(f(x)+g(x))' = f'(x) + g'(x)` },
    { nome: 'Regola del prodotto', formula: R`(f(x)\,g(x))' = f'(x)\,g(x) + f(x)\,g'(x)` },
    { nome: 'Regola del quoziente', formula: R`\left(\frac{f(x)}{g(x)}\right)' = \frac{f'(x)\,g(x) - f(x)\,g'(x)}{[g(x)]^2}`, nota: R`Richiede $g(x) \ne 0$.` },
    { nome: 'Regola della catena', formula: R`[f(g(x))]' = f'(g(x)) \cdot g'(x)`, nota: R`Si deriva la funzione esterna nel punto $g(x)$ e si moltiplica per $g'(x)$.` },
    { nome: 'Differenziale', formula: R`df = f'(x_0)\, dx`, nota: R`Approssima linearmente la variazione di $f$ vicino a $x_0$, per $dx$ piccolo.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'tangente-velocita', tipo: 'concetto', fronte: R`Che cosa hanno in comune il problema della tangente e quello della velocità istantanea?`, retro: R`Entrambi si risolvono calcolando un rapporto (pendenza di una secante, oppure velocità media) su un intervallo che si fa sempre più piccolo, fino al limite.` },
    { id: 'fc-02', sezione: 'tangente-velocita', tipo: 'concetto', fronte: R`Velocità media e velocità istantanea`, retro: R`La velocità media è $\dfrac{s(t_0+h)-s(t_0)}{h}$ su un intervallo; quella istantanea è il limite di questo rapporto per $h \to 0$.` },
    { id: 'fc-03', sezione: 'rapporto-incrementale', tipo: 'definizione', fronte: R`Rapporto incrementale di $f$ in $x_0$`, retro: R`$\dfrac{f(x_0+h)-f(x_0)}{h}$, con $h \ne 0$: è la pendenza della secante per $(x_0,f(x_0))$ e $(x_0+h,f(x_0+h))$.` },
    { id: 'fc-04', sezione: 'rapporto-incrementale', tipo: 'definizione', fronte: R`Derivata di $f$ in $x_0$`, retro: R`$f'(x_0) = \displaystyle\lim_{h \to 0}\dfrac{f(x_0+h)-f(x_0)}{h}$, quando il limite esiste finito.` },
    { id: 'fc-05', sezione: 'rapporto-incrementale', tipo: 'formula', fronte: R`Derivata di $f(x)=x^2$ con la definizione`, retro: R`Il rapporto incrementale è $2x+h$; il limite per $h\to 0$ dà $f'(x)=2x$.` },
    { id: 'fc-06', sezione: 'rapporto-incrementale', tipo: 'formula', fronte: R`Derivata di $f(x)=\dfrac{1}{x}$ con la definizione`, retro: R`Il rapporto incrementale è $-\dfrac{1}{x(x+h)}$; il limite per $h\to 0$ dà $f'(x)=-\dfrac{1}{x^2}$.` },
    { id: 'fc-07', sezione: 'significato-geometrico', tipo: 'concetto', fronte: R`Cosa rappresenta $f'(x_0)$ geometricamente?`, retro: R`Il coefficiente angolare della retta tangente al grafico di $f$ nel punto $(x_0,f(x_0))$.` },
    { id: 'fc-08', sezione: 'significato-geometrico', tipo: 'formula', fronte: R`Equazione della retta tangente in $x_0$`, retro: R`$y = f(x_0)+f'(x_0)(x-x_0)$` },
    { id: 'fc-09', sezione: 'continuita-derivabilita', tipo: 'definizione', fronte: R`Derivata destra e sinistra`, retro: R`Limiti del rapporto incrementale per $h\to 0^+$ e $h\to 0^-$; $f$ è derivabile in $x_0$ se coincidono.` },
    { id: 'fc-10', sezione: 'continuita-derivabilita', tipo: 'concetto', fronte: R`La derivabilità implica la continuità?`, retro: R`Sì: se $f$ è derivabile in $x_0$ allora è continua in $x_0$. Il viceversa è falso.` },
    { id: 'fc-11', sezione: 'continuita-derivabilita', tipo: 'concetto', fronte: R`Un controesempio di funzione continua ma non derivabile`, retro: R`$f(x)=|x|$ in $x_0=0$: è continua, ma le derivate destra e sinistra valgono $1$ e $-1$.` },
    { id: 'fc-12', sezione: 'punti-non-derivabili', tipo: 'definizione', fronte: R`Punto angoloso`, retro: R`Le derivate destra e sinistra esistono, sono finite, ma sono diverse tra loro.` },
    { id: 'fc-13', sezione: 'punti-non-derivabili', tipo: 'definizione', fronte: R`Cuspide`, retro: R`Le derivate destra e sinistra sono infinite e di segno opposto (per esempio $\sqrt[3]{x^2}$ in $x_0=0$).` },
    { id: 'fc-14', sezione: 'punti-non-derivabili', tipo: 'definizione', fronte: R`Flesso a tangente verticale`, retro: R`Le derivate destra e sinistra sono infinite e dello stesso segno (per esempio $\sqrt[3]{x}$ in $x_0=0$): la tangente è verticale.` },
    { id: 'fc-15', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivata di $x^n$`, retro: R`$(x^n)' = n\,x^{n-1}$` },
    { id: 'fc-16', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivate di $\sin x$ e $\cos x$`, retro: R`$(\sin x)' = \cos x$; $(\cos x)' = -\sin x$.` },
    { id: 'fc-17', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivate di $e^x$ e $a^x$`, retro: R`$(e^x)' = e^x$; $(a^x)' = a^x\ln a$.` },
    { id: 'fc-18', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivate di $\ln x$ e $\log_a x$`, retro: R`$(\ln x)' = \dfrac1x$; $(\log_a x)' = \dfrac{1}{x\ln a}$.` },
    { id: 'fc-19', sezione: 'derivate-elementari', tipo: 'formula', fronte: R`Derivata di $\tan x$`, retro: R`$(\tan x)' = \dfrac{1}{\cos^2 x}$` },
    { id: 'fc-20', sezione: 'regole-derivazione', tipo: 'formula', fronte: R`Regola del prodotto`, retro: R`$(fg)' = f'g+fg'$` },
    { id: 'fc-21', sezione: 'regole-derivazione', tipo: 'formula', fronte: R`Regola del quoziente`, retro: R`$\left(\dfrac{f}{g}\right)' = \dfrac{f'g-fg'}{g^2}$, con $g\ne 0$.` },
    { id: 'fc-22', sezione: 'regole-derivazione', tipo: 'procedura', fronte: R`Regola della catena (funzione composta)`, retro: R`$[f(g(x))]' = f'(g(x))\cdot g'(x)$: si deriva l'esterna nel punto interno e si moltiplica per la derivata dell'interna.` },
    { id: 'fc-23', sezione: 'regole-derivazione', tipo: 'concetto', fronte: R`Derivata della funzione inversa`, retro: R`$(f^{-1})'(y_0) = \dfrac{1}{f'(x_0)}$, con $y_0=f(x_0)$ e $f'(x_0)\ne 0$.` },
    { id: 'fc-24', sezione: 'derivate-successive-differenziale', tipo: 'definizione', fronte: R`Derivata seconda`, retro: R`$f''(x)$ è la derivata di $f'(x)$; si indica anche $\dfrac{d^2y}{dx^2}$.` },
    { id: 'fc-25', sezione: 'derivate-successive-differenziale', tipo: 'definizione', fronte: R`Differenziale di $f$ in $x_0$`, retro: R`$df = f'(x_0)\,dx$: l'approssimazione lineare della variazione di $f$ vicino a $x_0$.` },
    { id: 'fc-26', sezione: 'applicazioni', tipo: 'formula', fronte: R`Velocità e accelerazione da $s(t)$`, retro: R`$v(t)=s'(t)$, $a(t)=v'(t)=s''(t)$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $f'(x)$ per $f(x) = x^3 - 2x$.`, suggerimenti: [R`Deriva termine per termine usando la regola della potenza.`, R`La derivata di $-2x$ è semplicemente $-2$.`], risposta: { tipo: 'testo', accettate: ['3x^2-2', '3x²-2', '3x^2 - 2'] }, soluzione: [R`Deriva $x^3$: $(x^3)' = 3x^2$.`, R`Deriva $-2x$: $(-2x)' = -2$.`, R`Somma i risultati: $f'(x) = 3x^2 - 2$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $f'(x)$ per $f(x) = 5x^4 + 3x^2 - 7$.`, suggerimenti: [R`Applica la regola della potenza a ciascun termine.`, R`La derivata di una costante (qui $-7$) è $0$.`], risposta: { tipo: 'testo', accettate: ['20x^3+6x', '20x³+6x', '20x^3 + 6x'] }, soluzione: [R`$(5x^4)' = 20x^3$.`, R`$(3x^2)' = 6x$.`, R`$(-7)' = 0$.`, R`$f'(x) = 20x^3 + 6x$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Scrivi l'equazione della retta tangente al grafico di $f(x)=x^2$ nel punto di ascissa $x_0=2$.`, suggerimenti: [R`Calcola $f(2)$ e $f'(2)$ separatamente.`, R`Usa $y = f(x_0) + f'(x_0)(x-x_0)$.`], risposta: { tipo: 'testo', accettate: ['y=4x-4', 'y = 4x - 4', 'y = 4x − 4', 'y=4x−4'] }, soluzione: [R`$f(2) = 4$.`, R`$f'(x) = 2x$, quindi $f'(2) = 4$.`, R`$y = 4 + 4(x-2)$.`, R`Semplifico: $y = 4x - 4$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Usando la **definizione** di derivata, calcola $f'(x)$ per $f(x) = 3x^2$.`, suggerimenti: [R`Scrivi il rapporto incrementale $\dfrac{f(x+h)-f(x)}{h}$ con $f(x)=3x^2$.`, R`Sviluppa $(x+h)^2$ e semplifica prima di fare il limite.`], risposta: { tipo: 'testo', accettate: ['6x'] }, soluzione: [R`Rapporto incrementale: $\dfrac{3(x+h)^2 - 3x^2}{h}$.`, R`Sviluppo: $3(x^2+2xh+h^2)-3x^2 = 6xh+3h^2$.`, R`Divido per $h$: $6x+3h$.`, R`Limite per $h \to 0$: $f'(x) = 6x$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Deriva $f(x) = (x^2+1)(x-3)$.`, suggerimenti: [R`Riconosci un prodotto $u \cdot v$ con $u=x^2+1$, $v=x-3$.`, R`Usa $(uv)'=u'v+uv'$.`], risposta: { tipo: 'testo', accettate: ['3x^2-6x+1', '3x²-6x+1'] }, soluzione: [R`$u' = 2x$, $v' = 1$.`, R`$f'(x) = 2x(x-3) + (x^2+1)\cdot 1$.`, R`Sviluppo: $2x^2-6x+x^2+1$.`, R`Sommo i termini simili: $f'(x) = 3x^2-6x+1$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Deriva $f(x) = \dfrac{x}{x^2+1}$.`, suggerimenti: [R`Usa $\left(\dfrac{u}{v}\right)' = \dfrac{u'v-uv'}{v^2}$ con $u=x$ e $v=x^2+1$.`, R`$u'=1$, $v'=2x$.`], risposta: { tipo: 'testo', accettate: ['(1-x^2)/(x^2+1)^2', '(1-x²)/(x²+1)²'] }, soluzione: [R`$u'=1$, $v'=2x$.`, R`Numeratore: $1\cdot(x^2+1) - x\cdot 2x = x^2+1-2x^2 = 1-x^2$.`, R`Denominatore: $(x^2+1)^2$.`, R`$f'(x) = \dfrac{1-x^2}{(x^2+1)^2}$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Deriva $f(x) = (3x-1)^4$.`, suggerimenti: [R`Riconosci la funzione composta: esterna $u^4$, interna $u=3x-1$.`, R`Deriva l'esterna ($4u^3$) e moltiplica per la derivata dell'interna.`], risposta: { tipo: 'testo', accettate: ['12(3x-1)^3', '12(3x-1)³'] }, soluzione: [R`Derivata dell'esterna in $u$: $4u^3$, cioè $4(3x-1)^3$.`, R`Derivata dell'interna: $(3x-1)'=3$.`, R`Regola della catena: $f'(x) = 4(3x-1)^3 \cdot 3 = 12(3x-1)^3$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Stabilisci per quale valore di $x$ la funzione $f(x) = |x-2|$ non è derivabile.`, suggerimenti: [R`Pensa al grafico di $|x-2|$: è una traslazione di $|x|$.`, R`Cerca il punto in cui il grafico ha uno spigolo.`], risposta: { tipo: 'numero', valore: 2 }, soluzione: [R`Il grafico di $f(x)=|x-2|$ è quello di $|x|$ traslato di $2$ verso destra.`, R`Lo spigolo di $|x|$ in $x=0$ si sposta in $x=2$.`, R`In $x=2$ le derivate destra e sinistra valgono $+1$ e $-1$: sono diverse, quindi $f$ non è derivabile in $x=2$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Un punto si muove secondo la legge oraria $s(t)=t^3-9t^2+24t$ ($t\ge 0$, $s$ in metri, $t$ in secondi). Trova gli istanti in cui la velocità è nulla.`, suggerimenti: [R`Calcola $v(t) = s'(t)$.`, R`Risolvi $v(t)=0$: è un'equazione di secondo grado in $t$.`], risposta: { tipo: 'numeri', valori: [2, 4] }, soluzione: [R`$v(t) = 3t^2 - 18t + 24$.`, R`Pongo $v(t)=0$: $3t^2-18t+24=0$, cioè $t^2-6t+8=0$.`, R`$\dfrac{\Delta}{4} = 9-8=1$, $t = 3 \pm 1$: $t=2$ oppure $t=4$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Per quale valore di $k$ la retta $y = kx$ è tangente alla parabola $y = x^2+1$?`, suggerimenti: [R`Una retta è tangente a una parabola quando il sistema retta-parabola ha una sola soluzione doppia.`, R`Sostituisci $y=kx$ nell'equazione della parabola e imponi $\Delta = 0$.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`Sostituendo: $x^2+1 = kx$, cioè $x^2-kx+1=0$.`, R`Condizione di tangenza: $\Delta = k^2 - 4 = 0$.`, R`$k = 2$ oppure $k = -2$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Determina $a$ e $b$ affinché la funzione $f(x) = \begin{cases} x^2 & x\le 1 \\ ax+b & x>1\end{cases}$ sia derivabile in $x=1$.`, suggerimenti: [R`Prima imponi la continuità in $x=1$: i due pezzi devono dare lo stesso valore.`, R`Poi imponi che le derivate destra e sinistra in $x=1$ coincidano.`], soluzione: [R`Continuità in $x=1$: $1^2 = a\cdot 1+b$, cioè $a+b=1$.`, R`Derivata a sinistra di $x^2$ in $x=1$: $2\cdot 1 = 2$. Derivata a destra di $ax+b$: $a$.`, R`Uguagliando: $a=2$.`, R`Dalla continuità: $b = 1-a = -1$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Cos'è il rapporto incrementale di $f$ in $x_0$?`, opzioni: [R`$\dfrac{f(x_0+h)-f(x_0)}{h}$`, R`$\dfrac{f(x_0+h)-f(x_0)}{x_0}$`, R`$\dfrac{f(x_0)+h}{h}$`, R`$\dfrac{f(h)-f(x_0)}{h-x_0}$`], corretta: 0, spiegazione: R`È il rapporto fra la variazione della funzione, $f(x_0+h)-f(x_0)$, e la variazione della variabile, $h$: rappresenta la pendenza della secante fra i due punti.` },
    { id: 'q-02', domanda: R`La derivata $f'(x_0)$ è definita come…`, opzioni: [R`il rapporto incrementale calcolato ponendo $h=0$`, R`il limite del rapporto incrementale per $h \to 0$`, R`la pendenza di una secante qualunque`, R`il valore di $f$ in $x_0$`], corretta: 1, spiegazione: R`Ponendo $h=0$ nel rapporto incrementale si otterrebbe una divisione per zero: serve il limite. Una secante qualunque ha, in generale, una pendenza diversa da quella della tangente.` },
    { id: 'q-03', domanda: R`Se $f$ è derivabile in $x_0$, allora $f$ è sicuramente…`, opzioni: [R`crescente in $x_0$`, R`pari`, R`continua in $x_0$`, R`invertibile`], corretta: 2, spiegazione: R`Derivabilità implica continuità. Non implica invece che $f$ sia crescente, pari o invertibile: sono proprietà indipendenti.` },
    { id: 'q-04', domanda: R`Una funzione continua in un punto è sempre derivabile in quel punto?`, opzioni: [R`Sì, sempre`, R`Sì, se è un polinomio`, R`No, nessuna funzione continua è derivabile`, R`No: per esempio $f(x)=|x|$ in $x_0=0$ è continua ma non derivabile`], corretta: 3, spiegazione: R`La continuità non implica la derivabilità: $|x|$ è l'esempio classico. Un polinomio, in particolare, è sempre derivabile ovunque, ma questa non è la regola generale.` },
    { id: 'q-05', domanda: R`In un punto angoloso, le derivate destra e sinistra sono…`, opzioni: [R`infinite e di segno opposto`, R`finite ma diverse tra loro`, R`finite e uguali`, R`infinite e dello stesso segno`], corretta: 1, spiegazione: R`Nel punto angoloso i due limiti esistono e sono finiti, ma diversi: il grafico ha uno spigolo con due direzioni distinte.` },
    { id: 'q-06', domanda: R`In una cuspide le derivate destra e sinistra sono…`, opzioni: [R`finite e uguali`, R`finite e diverse`, R`infinite e dello stesso segno`, R`infinite e di segno opposto`], corretta: 3, spiegazione: R`Nella cuspide entrambe le derivate divergono, ma con segni opposti (una a $+\infty$, l'altra a $-\infty$): il grafico forma una "punta".` },
    { id: 'q-07', domanda: R`In un flesso a tangente verticale, le derivate destra e sinistra sono…`, opzioni: [R`infinite e dello stesso segno`, R`infinite e di segno opposto`, R`finite e diverse`, R`entrambe nulle`], corretta: 0, spiegazione: R`In questo caso le due derivate divergono con lo stesso segno: la tangente è verticale, ma il grafico attraversa il punto senza formare una punta.` },
    { id: 'q-08', domanda: R`Qual è la derivata di $f(x)=\sqrt{x}$?`, opzioni: [R`$\dfrac{1}{\sqrt{x}}$`, R`$2\sqrt{x}$`, R`$\dfrac{1}{2\sqrt{x}}$`, R`$\dfrac{\sqrt{x}}{2}$`], corretta: 2, spiegazione: R`Scrivendo $\sqrt{x}=x^{1/2}$ e applicando $(x^n)'=n\,x^{n-1}$ si ottiene $\dfrac12 x^{-1/2} = \dfrac{1}{2\sqrt{x}}$.` },
    { id: 'q-09', domanda: R`Qual è la derivata di $f(x)=a^x$ (con $a>0$, $a\ne 1$)?`, opzioni: [R`$x\,a^{x-1}$`, R`$a^x$`, R`$\dfrac{a^x}{\ln a}$`, R`$a^x \ln a$`], corretta: 3, spiegazione: R`Qui la variabile è all'esponente, non alla base: la regola della potenza non si applica. Compare invece il fattore $\ln a$; con $a=e$ si ritrova $(e^x)'=e^x$, perché $\ln e = 1$.` },
    { id: 'q-10', domanda: R`La regola del prodotto dice che $(fg)'$ è uguale a…`, opzioni: [R`$f'g+fg'$`, R`$f'g'$`, R`$f'g-fg'$`, R`$\dfrac{f'g-fg'}{g^2}$`], corretta: 0, spiegazione: R`$(fg)'=f'g+fg'$. La seconda opzione è l'errore tipico di trattare il prodotto come la somma; la terza e la quarta sono, rispettivamente, una formula sbagliata e la regola del quoziente.` },
    { id: 'q-11', domanda: R`La regola della catena per $f(g(x))$ dà come derivata…`, opzioni: [R`$f'(x)\cdot g'(x)$`, R`$f'(g(x)) \cdot g'(x)$`, R`$f'(g(x))$`, R`$f(g'(x))$`], corretta: 1, spiegazione: R`Bisogna derivare la funzione esterna $f$ nel punto interno $g(x)$, e moltiplicare per la derivata dell'interna $g'(x)$: dimenticare quest'ultimo fattore è l'errore più comune.` },
    { id: 'q-12', domanda: R`La derivata seconda $f''(x)$ è…`, opzioni: [R`il quadrato di $f'(x)$`, R`la derivata di $f(x^2)$`, R`la derivata di $f'(x)$`, R`sempre uguale a $f(x)$`], corretta: 2, spiegazione: R`$f''(x)$ si ottiene derivando $f'(x)$ una seconda volta; non ha nulla a che vedere con $(f'(x))^2$ né con $f(x^2)$.` },
    { id: 'q-13', domanda: R`Il differenziale $df$ in $x_0$ è…`, opzioni: [R`$f'(x_0)$`, R`$f(x_0+dx)-f(x_0)$ esatto`, R`$f'(x_0)\,dx$`, R`$\dfrac{dx}{f'(x_0)}$`], corretta: 2, spiegazione: R`$df=f'(x_0)\,dx$ è l'approssimazione lineare della variazione reale $f(x_0+dx)-f(x_0)$, tanto migliore quanto più $dx$ è piccolo.` },
    { id: 'q-14', domanda: R`Se $v(t)=s'(t)$ è negativa in un istante, il corpo…`, opzioni: [R`si muove nel verso opposto a quello scelto come positivo`, R`è fermo`, R`sta accelerando`, R`ha velocità nulla`], corretta: 0, spiegazione: R`Il segno della velocità indica solo il verso del moto rispetto a un riferimento scelto, non se il corpo è fermo o accelera: quello dipende dal segno di $a(t)$.` },
    { id: 'q-15', domanda: R`Se $f'(x) > 0$ in un intervallo, la funzione $f$ in quell'intervallo…`, opzioni: [R`è costante`, R`è decrescente`, R`ha un massimo assoluto`, R`è crescente`], corretta: 3, spiegazione: R`Una derivata positiva significa che il grafico sta salendo: la funzione è crescente in quell'intervallo.` },
    { id: 'q-16', domanda: R`L'accelerazione $a(t)$ è…`, opzioni: [R`la derivata prima della posizione`, R`la derivata seconda della posizione`, R`l'integrale della velocità`, R`uguale alla velocità media`], corretta: 1, spiegazione: R`$a(t)=v'(t)=s''(t)$: l'accelerazione è la derivata della velocità, cioè la derivata seconda della posizione.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Il rapporto incrementale calcolato per un $h$ fissato non è la derivata: è solo un'approssimazione. La derivata è il valore-limite per $h \to 0$.` },
    { tipo: 'errore', testo: R`Nella regola del quoziente l'ordine conta: $\left(\dfrac{f}{g}\right)' = \dfrac{f'g-fg'}{g^2}$, non $\dfrac{fg'-f'g}{g^2}$.` },
    { tipo: 'errore', testo: R`Nella regola della catena non basta derivare la funzione esterna: va sempre moltiplicata per la derivata della funzione interna. $[\sin(3x)]' = 3\cos(3x)$, non $\cos(3x)$.` },
    { tipo: 'metodo', testo: R`Per stabilire se una funzione "sospetta" (valore assoluto, radice, funzione a tratti) è derivabile in un punto, calcola separatamente la derivata destra e quella sinistra e confrontale.` },
    { tipo: 'errore', testo: R`$|x|$ è continua ovunque ma non è derivabile in $x=0$: la continuità non implica la derivabilità, anche se il viceversa è sempre vero.` },
    { tipo: 'trucco', testo: R`Il segno di $f'(x)$ si studia come quello di una qualunque espressione algebrica (tabella dei segni): non serve disegnare $f$ per sapere dove cresce o decresce.` },
    { tipo: 'metodo', testo: R`Per la retta tangente calcola sempre due numeri, in quest'ordine: $f(x_0)$ e $f'(x_0)$; poi sostituisci in $y = f(x_0)+f'(x_0)(x-x_0)$ e solo alla fine semplifica.` },
    { tipo: 'errore', testo: R`La derivata di $a^x$ ha un fattore $\ln a$ che sparisce spesso per distrazione: $(a^x)' = a^x \ln a$, non $a^x$ soltanto (che vale solo per $a=e$).` },
    { tipo: 'errore', testo: R`Velocità e accelerazione possono essere negative: il segno indica il verso, non che il corpo stia "tornando indietro nel tempo".` }
  ],

  aneddoti: [
    { matematico: R`Pierre de Fermat`, anni: R`1601–1665`, titolo: R`Il metodo dei massimi e dei minimi, prima del calcolo`, testo: R`Trent'anni prima che Newton e Leibniz sistemassero il calcolo infinitesimale, l'avvocato e matematico dilettante Pierre de Fermat aveva già in mano un pezzo importante del problema. In un manoscritto del 1636, il *Methodus ad disquirendam maximam et minimam*, descrisse una tecnica per trovare i punti di massimo e minimo di una curva: si confronta $f(x)$ con $f(x+e)$ per un incremento $e$ molto piccolo, si sviluppano i calcoli, si dividono i termini per $e$ e infine si pone $e$ uguale a zero. È, alla lettera, il calcolo di un rapporto incrementale seguito da un passaggio al limite, fatto quasi mezzo secolo prima che esistesse un linguaggio per giustificarlo con rigore. Fermat non parlava di "derivata" né di "limite": trattava $e$ come una quantità che, alla fine, si annulla senza troppe spiegazioni.`, legame: R`Il metodo di Fermat è, in sostanza, il rapporto incrementale di questo argomento applicato a un problema specifico: trovare dove la tangente è orizzontale.` },
    { matematico: R`Isaac Newton e Gottfried Wilhelm Leibniz`, anni: R`1642–1727 e 1646–1716`, titolo: R`Due invenzioni indipendenti, una disputa furiosa`, testo: R`Tra il 1665 e il 1675, a distanza e senza saperlo, Newton in Inghilterra e Leibniz in Germania inventarono lo stesso strumento matematico partendo da problemi diversi: Newton pensava alla velocità ("flussioni", con la notazione $\dot x$, un punto sopra la lettera), Leibniz pensava al rapporto fra incrementi infinitesimi ("differenziali", con la notazione $\dfrac{dy}{dx}$ che usiamo ancora oggi). Quando Leibniz pubblicò per primo, nel 1684, scoppiò una disputa sulla priorità che durò decenni e avvelenò i rapporti tra la matematica inglese e quella continentale. La Royal Society nominò una commissione per stabilire chi avesse ragione: il suo presidente, guarda caso, era Newton, che ne scrisse anche in parte il rapporto finale senza firmarlo. Il verdetto, prevedibilmente, fu a suo favore. Oggi si riconosce che entrambi arrivarono al risultato in modo indipendente; la notazione di Leibniz, più flessibile, è quella che si usa nei libri di analisi.`, legame: R`La derivata $f'(x_0)$ di questo argomento è la stessa idea di Newton e Leibniz: solo la notazione ($\dot x$ oppure $\dfrac{dy}{dx}$) racconta chi l'ha pensata come.` },
    { matematico: R`Guillaume de L'Hôpital e Johann Bernoulli`, anni: R`1661–1704 e 1667–1748`, titolo: R`Il primo libro di analisi, comprato per abbonamento`, testo: R`Nel 1696 il marchese Guillaume de L'Hôpital pubblicò *Analyse des infiniment petits*, il primo manuale a stampa di calcolo differenziale: conteneva, sistemate in un ordine chiaro, le regole di derivazione (somma, prodotto, quoziente, funzione composta) che ancora oggi si insegnano quasi allo stesso modo. Quello che i lettori dell'epoca non sapevano è che L'Hôpital, nobile facoltoso ma matematico modesto, pagava uno stipendio regolare al giovane e brillantissimo Johann Bernoulli in cambio delle sue scoperte, che poi pubblicava a proprio nome: un accordo scritto, ritrovato molto più tardi, lo dimostra senza ambiguità. Anche la regola per calcolare limiti di forme indeterminate che porta ancora il nome di "de L'Hôpital" era, quasi certamente, farina del sacco di Bernoulli.`, legame: R`Le regole di derivazione (somma, prodotto, quoziente, catena) di questo argomento sono, storicamente, il contenuto di quel libro: il primo a raccoglierle tutte insieme per gli studenti.` },
    { matematico: R`Joseph-Louis Lagrange`, anni: R`1736–1813`, titolo: R`La notazione f', nata per fare a meno degli infinitesimi`, testo: R`Alla fine del Settecento gli infinitesimi di Leibniz (quantità "più piccole di ogni numero ma non nulle") mettevano a disagio molti matematici: non si capiva bene cosa fossero. Lagrange, nella sua *Théorie des fonctions analytiques* del 1797, tentò di fondare il calcolo senza infinitesimi né limiti, usando gli sviluppi in serie di potenze; il tentativo non reggerà del tutto (il rigore arriverà solo con Cauchy e Weierstrass nell'Ottocento), ma da quel libro resta un'eredità che si usa ancora ogni giorno: la notazione $f'(x)$, $f''(x)$, $f'''(x)$ per le derivate successive, più compatta sia della notazione a punto di Newton sia delle frazioni $\dfrac{dy}{dx}$ di Leibniz.`, legame: R`La notazione $f'(x)$ usata in tutto questo argomento è quella di Lagrange; conta il fatto che siano rimaste in uso, fianco a fianco, tre notazioni diverse per la stessa idea.` }
  ]
});
})();
