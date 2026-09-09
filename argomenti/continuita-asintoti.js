(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'continuita-asintoti',
  titolo: 'Continuità e asintoti',

  introduzione: R`Una funzione è **continua** quando piccole variazioni della $x$ producono piccole variazioni della $y$: niente salti, niente buchi, niente voragini. È la proprietà che permette di dire «la temperatura è passata per i $37$ gradi» anche senza aver mai letto il termometro in quell'istante preciso: se sale da $36{,}5$ a $37{,}8$ senza saltare, da qualche parte i $37$ li ha toccati. Quella frase, detta bene, è il teorema dei valori intermedi.

Gli **asintoti** raccontano invece l'altra faccia della stessa storia: che cosa fa la funzione dove il grafico non può essere disegnato, cioè vicino ai punti esclusi dal dominio e all'infinito. Sono rette a cui la curva si avvicina indefinitamente senza (quasi sempre) raggiungerle. Insieme, continuità e asintoti sono gli strumenti con cui si passa da una formula a un grafico: prima si capisce dove la curva si spezza, poi verso quali rette si appoggia.

Serve saper calcolare i limiti, anche laterali e all'infinito, riconoscere le forme indeterminate $\frac{0}{0}$ e $\frac{\infty}{\infty}$, e determinare il dominio di una funzione.`,

  sezioni: [
    { id: 'definizione', titolo: 'Funzione continua in un punto e in un intervallo', testo: R`L'idea intuitiva è la solita: il grafico si disegna senza staccare la penna dal foglio. La definizione rigorosa, messa a punto da Cauchy e perfezionata da Weierstrass, traduce quell'immagine in un limite.

>* **Continuità in un punto.** Sia $f$ definita in un intorno di $x_0$. La funzione è **continua in $x_0$** se $$\lim_{x \to x_0} f(x) = f(x_0).$$

Dentro quell'uguaglianza ci sono tre richieste, ed è utile tenerle separate perché ogni discontinuità nasce dal fallimento di una di esse:

1. $x_0$ appartiene al dominio, cioè $f(x_0)$ esiste;
2. il limite $\lim_{x \to x_0} f(x)$ esiste ed è **finito**;
3. i due numeri coincidono.

Per esempio $f(x) = x^2 - 3x$ è continua in $x_0 = 2$: il limite vale $4 - 6 = -2$ e anche $f(2) = -2$.

Con i limiti laterali si parla di continuità **a destra** ($\lim_{x \to x_0^+} f(x) = f(x_0)$) e **a sinistra**. Una funzione è continua in $x_0$ se e solo se lo è da entrambe le parti.

>* **Continuità in un intervallo.** $f$ è continua in $[a, b]$ se è continua in ogni punto interno, continua a destra in $a$ e continua a sinistra in $b$.

>! Continua «nel suo dominio» non vuol dire «continua su $\mathbb{R}$». La funzione $f(x) = \frac{1}{x}$ è continua in ogni punto del suo dominio $\mathbb{R} \setminus \{0\}$, eppure il suo grafico è fatto di due rami separati: in $x = 0$ non è continua semplicemente perché lì non è definita, e la domanda non si pone.` },

    { id: 'funzioni-elementari', titolo: 'Le funzioni elementari sono continue', testo: R`Non serve verificare la definizione ogni volta: quasi tutte le funzioni che si incontrano a scuola sono continue in tutto il loro dominio.

>* Sono continue nel proprio dominio: le funzioni **polinomiali** (su tutto $\mathbb{R}$), le **razionali fratte**, le **irrazionali**, $\sin x$ e $\cos x$ (su tutto $\mathbb{R}$), $\tan x$, le **esponenziali** $a^x$, i **logaritmi** $\log_a x$, e il valore assoluto $|x|$.

A questo si aggiungono le regole di composizione, che si dimostrano con i teoremi sui limiti.

>* Se $f$ e $g$ sono continue in $x_0$, allora sono continue in $x_0$ anche $f + g$, $f - g$, $f \cdot g$, e $\frac{f}{g}$ purché $g(x_0) \ne 0$. Se $g$ è continua in $x_0$ e $f$ è continua in $g(x_0)$, la **composta** $f(g(x))$ è continua in $x_0$.

La conseguenza pratica è importante: per calcolare il limite di una funzione continua **basta sostituire**. Per esempio $$\lim_{x \to 0} \frac{e^x + \cos x}{x + 2} = \frac{1 + 1}{2} = 1,$$ perché numeratore e denominatore sono continui e il denominatore non si annulla in $0$.

Le discontinuità, allora, vanno cercate solo in pochi posti: dove un denominatore si annulla, dove l'argomento di un logaritmo o di una radice arriva al bordo del dominio, e dove una funzione **definita a tratti** cambia formula.

>! Continua non significa derivabile. La funzione $f(x) = |x|$ è continua in $0$ (il limite e il valore fanno entrambi $0$) ma il suo grafico lì ha un angolo. Il viceversa invece vale sempre: se una funzione è derivabile in un punto, in quel punto è continua.` },

    { id: 'discontinuita', titolo: 'I punti di discontinuità e la loro classificazione', testo: R`Un punto $x_0$ si dice di **discontinuità** per $f$ se $x_0$ appartiene al dominio o ne è un punto di accumulazione, ma la condizione di continuità non è soddisfatta. Si classificano confrontando i due limiti laterali $l^- = \lim_{x \to x_0^-} f(x)$ e $l^+ = \lim_{x \to x_0^+} f(x)$.

>* La specie di una discontinuità si legge **solo** dai due limiti laterali, senza guardare altro.

- **Prima specie (salto):** $l^-$ e $l^+$ esistono, sono **finiti** e **diversi**. Il numero $s = l^+ - l^-$ si chiama **salto**.
- **Seconda specie:** almeno uno dei due limiti laterali è infinito oppure non esiste.
- **Terza specie (eliminabile):** $l^- = l^+ = l$ finito, ma $f(x_0)$ non esiste oppure vale qualcosa di diverso da $l$.

La discontinuità eliminabile è la più mite: basta ridefinire $f$ in quel solo punto per rimettere tutto a posto. In $f(x) = \frac{x^2 - 4}{x - 2}$ il valore $x = 2$ è escluso dal dominio, ma semplificando si ottiene $x + 2$ per ogni $x \ne 2$, quindi il limite vale $4$. Il grafico è la retta $y = x + 2$ con un buco.

[[grafico:eliminabile]]

Una funzione definita a tratti da $x + 1$ e da $x - 2$ ha invece in $x = 1$ un salto: $l^- = 2$, $l^+ = -1$, salto $s = -3$.

[[grafico:salto]]

Infine $f(x) = \frac{1}{x^2}$ in $x = 0$: entrambi i limiti laterali valgono $+\infty$, quindi è di seconda specie. Lo è anche $\sin\frac{1}{x}$ in $0$, dove i limiti laterali non esistono affatto pur restando la funzione limitata.

[[grafico:secondaSpecie]]

>! La seconda specie non richiede che i limiti siano infiniti: basta che **uno solo** dei due sia infinito o non esista. Anche $f(x) = 2^{1/x}$ in $0$ è di seconda specie, con $l^- = 0$ e $l^+ = +\infty$.` },

    { id: 'teoremi', titolo: 'I teoremi sulle funzioni continue', testo: R`Tre teoremi giustificano quasi tutto ciò che si dà per scontato nel disegnare un grafico. Tutti chiedono la continuità su un intervallo **chiuso e limitato** $[a, b]$: le ipotesi non sono decorazioni.

>* **Teorema di Weierstrass.** Se $f$ è continua in $[a, b]$, allora ammette in $[a, b]$ un **massimo assoluto** e un **minimo assoluto**.

>* **Teorema degli zeri (Bolzano).** Se $f$ è continua in $[a, b]$ e $f(a) \cdot f(b) < 0$ (cioè agli estremi ha segni opposti), allora esiste almeno un $c \in (a, b)$ con $f(c) = 0$.

>* **Teorema dei valori intermedi (Darboux).** Se $f$ è continua in $[a, b]$, assume **tutti** i valori compresi fra il suo minimo e il suo massimo.

I controesempi mostrano perché ogni ipotesi serve. Su $(0, 1]$ la funzione $\frac{1}{x}$ è continua ma non ha massimo: l'intervallo non è chiuso. Su $[-1, 1]$ la funzione che vale $-1$ per $x < 0$ e $1$ per $x \ge 0$ ha segni opposti agli estremi ma non si annulla mai: non è continua. E su $[1, 2]$ la funzione $\frac{1}{x}$, pur continua, non assume mai il valore $3$, che non sta fra il suo minimo $\frac12$ e il suo massimo $1$.

Il teorema degli zeri è quello che si usa di più: dice che $x^3 - x - 1 = 0$ ha una soluzione fra $1$ e $2$, perché $f(1) = -1 < 0$ e $f(2) = 5 > 0$.

[[grafico:zeri]]

>! Il teorema degli zeri è una condizione **sufficiente**, non necessaria: $f(x) = x^2 - 1$ su $[-2, 2]$ ha $f(-2) \cdot f(2) = 9 > 0$ eppure di zeri ne ha due. E quando l'ipotesi vale, garantisce **almeno** uno zero, non esattamente uno.` }
,

    { id: 'bisezione', titolo: 'Il metodo di bisezione', testo: R`Il teorema degli zeri dice che una soluzione **c'è**, ma non dove sia. Il **metodo di bisezione** la rincorre dimezzando ogni volta l'intervallo: è il modo più semplice per risolvere numericamente un'equazione che non si sa risolvere con le formule.

>* **Procedimento.** Sia $f$ continua in $[a, b]$ con $f(a) \cdot f(b) < 0$. Si calcola il punto medio $m = \frac{a + b}{2}$ e il valore $f(m)$:
- se $f(m) = 0$ si è trovata la soluzione;
- se $f(a) \cdot f(m) < 0$ lo zero sta in $[a, m]$;
- altrimenti sta in $[m, b]$.

Si ripete il ragionamento sul nuovo intervallo, che è lungo la metà del precedente.

Ogni passo dimezza l'incertezza, quindi dopo $n$ passi l'intervallo è lungo $\frac{b - a}{2^n}$: prendendo come stima il suo punto medio, l'errore è al più $\frac{b - a}{2^{n+1}}$.

Esempio con $f(x) = x^3 - x - 1$ su $[1, 2]$, dove $f(1) = -1$ e $f(2) = 5$:

| passo | $m$ | $f(m)$ | nuovo intervallo |
|---|---|---|---|
| 1 | 1,5 | 0,875 | [1; 1,5] |
| 2 | 1,25 | −0,297 | [1,25; 1,5] |
| 3 | 1,375 | 0,225 | [1,25; 1,375] |

Dopo tre passi si sa che lo zero sta fra $1{,}25$ e $1{,}375$; il valore vero è $1{,}3247\ldots$

> Il metodo è lento (per guadagnare una cifra decimale servono più di tre passi) ma non fallisce mai: purché le ipotesi valgano, converge sempre. Metodi più veloci, come quello delle tangenti di Newton, in cambio possono divergere.

>! Se in $[a, b]$ ci sono più zeri, la bisezione ne trova **uno solo**, e non si sa quale. Conviene prima separare gli zeri con uno studio del segno o con un grafico.` },

    { id: 'asintoti-verticali-orizzontali', titolo: 'Asintoti verticali e orizzontali', testo: R`Un **asintoto** è una retta a cui il grafico si avvicina indefinitamente. Se ne cercano di tre tipi, e i primi due si leggono direttamente dai limiti.

>* **Asintoto verticale.** La retta $x = c$ è asintoto verticale per $f$ se almeno uno dei due limiti laterali è infinito: $$\lim_{x \to c^-} f(x) = \pm\infty \quad \text{oppure} \quad \lim_{x \to c^+} f(x) = \pm\infty.$$

Si cercano **solo** nei punti esclusi dal dominio: dove si annulla un denominatore, dove l'argomento di un logaritmo tende a zero, negli estremi esclusi. Per $f(x) = \frac{3x - 1}{x + 2}$ il candidato è $x = -2$: il numeratore lì vale $-7 \ne 0$, quindi la retta $x = -2$ è asintoto verticale, con $\lim_{x \to -2^-} f(x) = +\infty$ e $\lim_{x \to -2^+} f(x) = -\infty$.

>* **Asintoto orizzontale.** La retta $y = q$ è asintoto orizzontale se $$\lim_{x \to +\infty} f(x) = q \quad \text{oppure} \quad \lim_{x \to -\infty} f(x) = q, \text{ con } q \text{ finito}.$$

I due limiti vanno calcolati separatamente: possono dare risultati diversi. Per $f(x) = \arctan x$ ci sono due asintoti orizzontali, $y = \frac{\pi}{2}$ a destra e $y = -\frac{\pi}{2}$ a sinistra.

Per una funzione razionale fratta il confronto dei gradi basta: se il grado del numeratore è minore, l'asintoto orizzontale è $y = 0$; se i gradi sono uguali, è il rapporto dei coefficienti direttivi (per $\frac{3x-1}{x+2}$ è $y = 3$); se il numeratore ha grado maggiore di uno, l'asintoto orizzontale non c'è.

>! Un asintoto orizzontale può essere **attraversato**, anche infinite volte: $f(x) = \frac{\sin x}{x}$ ha asintoto $y = 0$ e lo taglia in tutti i punti $x = k\pi$. Il divieto di attraversare vale (di solito) solo per gli asintoti verticali, che il grafico non può toccare perché lì la funzione non è definita.` },

    { id: 'asintoto-obliquo', titolo: 'L\'asintoto obliquo', testo: R`Quando la funzione tende all'infinito ma «come una retta», l'asintoto esiste ancora, solo che è inclinato.

>* **Asintoto obliquo.** La retta $y = mx + q$ è asintoto obliquo per $x \to +\infty$ se $$m = \lim_{x \to +\infty} \frac{f(x)}{x} \quad\text{è finito e diverso da } 0, \qquad q = \lim_{x \to +\infty} \big(f(x) - mx\big) \quad\text{è finito}.$$ Lo stesso per $x \to -\infty$.

L'ordine conta: prima $m$, poi $q$ (che usa $m$). E servono **entrambi** finiti: se uno dei due limiti è infinito o non esiste, l'asintoto obliquo non c'è.

Esempio: $f(x) = \frac{x^2 + 1}{x - 1}$. Allora $$m = \lim_{x \to \infty} \frac{x^2 + 1}{x(x - 1)} = 1, \qquad q = \lim_{x \to \infty}\left(\frac{x^2 + 1}{x - 1} - x\right) = \lim_{x \to \infty} \frac{x + 1}{x - 1} = 1,$$ quindi l'asintoto obliquo è $y = x + 1$, sia a destra sia a sinistra. In più c'è l'asintoto verticale $x = 1$.

[[grafico:obliquo]]

Quando manca. Se $m = \pm\infty$ la funzione cresce troppo in fretta ($f(x) = x^2$: nessun asintoto). Se $m = 0$ e $q$ è finito si ricade nell'asintoto orizzontale. Se $m$ è finito ma il limite di $f(x) - mx$ non esiste, niente asintoto: per $f(x) = x + \sin x$ si ha $m = 1$, ma $f(x) - x = \sin x$ oscilla per sempre.

>* Su ciascun lato ($+\infty$ o $-\infty$) c'è **al massimo un asintoto**: o orizzontale o obliquo, mai tutti e due.

>! Per una razionale fratta l'asintoto obliquo c'è solo se il grado del numeratore supera di **esattamente uno** quello del denominatore. In quel caso la divisione fra polinomi lo regala: $\frac{x^2+1}{x-1} = x + 1 + \frac{2}{x-1}$, e il quoziente $x+1$ è proprio l'asintoto.` },

    { id: 'tratti-parametro', titolo: 'Funzioni a tratti, parametri e grafico probabile', testo: R`Una funzione **definita a tratti** cambia formula in certi punti: proprio lì va controllata la continuità, perché all'interno di ogni tratto le funzioni elementari ci pensano da sole.

>* Nel punto di raccordo $x_0$ si impone $$\lim_{x \to x_0^-} f(x) = \lim_{x \to x_0^+} f(x) = f(x_0).$$ Se compare un parametro, questa uguaglianza diventa un'equazione nel parametro.

Esempio: $$f(x) = \begin{cases} x^2 & x \le 1 \\ 2x + k & x > 1 \end{cases}$$ Il limite sinistro vale $1$, il destro vale $2 + k$, e $f(1) = 1$. La funzione è continua se e solo se $2 + k = 1$, cioè $k = -1$. Per ogni altro $k$ resta una discontinuità di prima specie con salto $s = (2 + k) - 1 = 1 + k$.

Muovi il cursore e guarda il ramo destro salire e scendere: il salto si chiude solo per un valore di $k$.

[[grafico:parametroK]]

### Il grafico probabile

Continuità, limiti e asintoti bastano per abbozzare un grafico anche senza derivate. Lo schema:

1. dominio e simmetrie (pari, dispari);
2. intersezioni con gli assi e studio del segno;
3. limiti agli estremi del dominio e nei punti esclusi;
4. asintoti verticali, orizzontali, obliqui;
5. si disegnano prima gli asintoti, poi si raccordano i tratti rispettando il segno trovato.

>! Il grafico probabile è probabile davvero: senza le derivate non si sa dove la curva sale, dove scende e dove sono i massimi. Si sa però dove non può passare, e spesso basta a smascherare un errore di calcolo.` }
  ],

  grafici: {
    eliminabile: {
      tipo: 'piano', x: [-5, 5], y: [-4, 8],
      funzioni: [{ f: '(x^2 - 4)/(x - 2)', etichetta: 'y = (x² − 4)/(x − 2)', colore: 1 }],
      punti: [{ x: 2, y: 4, etichetta: '(2; 4)', posizione: 'alto-sinistra', vuoto: true, colore: 2 }],
      didascalia: 'Semplificando si ottiene x + 2 per ogni x ≠ 2: il grafico è una retta con un buco. Il limite vale 4, ma la funzione in 2 non è definita: discontinuità eliminabile.'
    },
    salto: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      funzioni: [
        { f: 'x + 1', etichetta: 'y = x + 1', colore: 1, dominio: [-5, 1] },
        { f: 'x - 2', etichetta: 'y = x − 2', colore: 3, dominio: [1, 5] }
      ],
      punti: [
        { x: 1, y: 2, etichetta: 'limite sinistro = 2', posizione: 'alto-sinistra', vuoto: true, colore: 1 },
        { x: 1, y: -1, etichetta: 'f(1) = −1', posizione: 'basso-destra', vuoto: false, colore: 3 }
      ],
      didascalia: 'Discontinuità di prima specie in x = 1: i due limiti laterali sono finiti ma diversi. Il salto vale s = −1 − 2 = −3.'
    },
    secondaSpecie: {
      tipo: 'piano', x: [-4, 4], y: [-1, 8],
      funzioni: [{ f: '1/x^2', etichetta: 'y = 1/x²', colore: 1 }],
      elementi: [{ tipo: 'verticale', x: 0, asintoto: true, tratteggio: true, etichetta: 'x = 0', colore: 2 }],
      didascalia: 'y = 1/x²: in x = 0 entrambi i limiti laterali valgono +∞. Discontinuità di seconda specie, e la retta x = 0 è asintoto verticale.'
    },
    obliquo: {
      tipo: 'piano', x: [-6, 8], y: [-8, 12],
      funzioni: [{ f: '(x^2 + 1)/(x - 1)', etichetta: 'y = (x² + 1)/(x − 1)', colore: 1 }],
      elementi: [
        { tipo: 'retta', m: 1, q: 1, etichetta: 'y = x + 1', tratteggio: true, colore: 2 },
        { tipo: 'verticale', x: 1, asintoto: true, tratteggio: true, etichetta: 'x = 1', colore: 3 }
      ],
      didascalia: 'I due rami si appoggiano alla stessa retta obliqua y = x + 1, uno da sopra e uno da sotto; la retta x = 1 è l\'asintoto verticale.'
    },
    parametroK: {
      tipo: 'piano', x: [-4.5, 4.5], y: [-5, 12],
      parametri: [{ nome: 'k', min: -3, max: 3, passo: 0.5, valore: 1, etichetta: 'k' }],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [-4, 1] },
        { f: '2x + k', etichetta: 'y = 2x + k', colore: 3, dominio: [1, 4] }
      ],
      punti: [
        { x: 1, y: 1, etichetta: 'f(1) = 1', posizione: 'sinistra', vuoto: false, colore: 1 },
        { x: 1, y: '2 + k', etichetta: 'limite destro = {{2 + k}}', posizione: 'destra', vuoto: true, colore: 3 }
      ],
      elementi: [{ tipo: 'testo', p: [-4.2, 11], testo: 'salto in x = 1:  (2 + k) − 1 = {{2 + k - 1}}', ancora: 'start' }],
      didascalia: 'Muovi k: il salto vale 1 + k e si annulla solo per k = −1, l\'unico valore che rende continua la funzione a tratti.'
    },
    zeri: {
      tipo: 'piano', x: [-0.5, 2.5], y: [-3, 6],
      funzioni: [{ f: 'x^3 - x - 1', etichetta: 'y = x³ − x − 1', colore: 1, dominio: [0, 2] }],
      punti: [
        { x: 1, y: -1, etichetta: 'f(1) = −1', posizione: 'basso', colore: 2 },
        { x: 2, y: 5, etichetta: 'f(2) = 5', posizione: 'sinistra', colore: 2 }
      ],
      elementi: [{ tipo: 'orizzontale', y: 0, tratteggio: true, colore: 4 }],
      didascalia: 'Su [1; 2] la funzione è continua e cambia segno: per il teorema degli zeri il grafico taglia y = 0 almeno una volta. Lo zero vale circa 1,3247.'
    }
  },

  esempi: [
    { titolo: 'Una discontinuità eliminabile', problema: R`Studia la continuità di $f(x) = \dfrac{x^2 - 9}{x - 3}$ in $x_0 = 3$ e, se possibile, prolunga la funzione con continuità.`, passi: [
      R`Dominio: $x \ne 3$. Il punto $x_0 = 3$ non appartiene al dominio, quindi la prima delle tre condizioni di continuità già non vale.`,
      R`Calcolo il limite. La forma è $\dfrac{0}{0}$: scompongo il numeratore, $x^2 - 9 = (x-3)(x+3)$, e semplifico per $x \ne 3$: $$\lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x \to 3}(x+3) = 6.$$`,
      R`Il limite esiste ed è finito, e i due limiti laterali coincidono: la discontinuità è di **terza specie**, cioè eliminabile.`,
      R`Basta definire $g(3) = 6$: la funzione $g(x) = x + 3$ coincide con $f$ dove $f$ è definita ed è continua ovunque. È il **prolungamento per continuità**.`
    ], risultato: R`Discontinuità eliminabile in $x = 3$; il prolungamento continuo è $g(x) = x + 3$.` },

    { titolo: 'Un salto', problema: R`Classifica la discontinuità di $f(x) = \dfrac{|x - 2|}{x - 2}$ in $x_0 = 2$ e calcola il salto.`, passi: [
      R`Tolgo il valore assoluto: per $x > 2$ si ha $|x-2| = x-2$, quindi $f(x) = 1$; per $x < 2$ si ha $|x-2| = -(x-2)$, quindi $f(x) = -1$.`,
      R`Limite sinistro: $\lim_{x \to 2^-} f(x) = -1$. Limite destro: $\lim_{x \to 2^+} f(x) = 1$.`,
      R`Sono entrambi finiti ma diversi: discontinuità di **prima specie**.`,
      R`Salto: $s = l^+ - l^- = 1 - (-1) = 2$. Qui nessuna ridefinizione può salvare la continuità: il buco non è un punto, è una fenditura.`
    ], risultato: R`Prima specie (salto) in $x = 2$, con salto $s = 2$.` },

    { titolo: 'Trovare il parametro', problema: R`Determina $k$ in modo che $f(x) = \begin{cases} x^2 + 1 & x \le 2 \\ kx - 3 & x > 2 \end{cases}$ sia continua su tutto $\mathbb{R}$.`, passi: [
      R`Su $(-\infty, 2)$ e su $(2, +\infty)$ la funzione è polinomiale, quindi continua qualunque sia $k$: l'unico punto da controllare è il raccordo $x_0 = 2$.`,
      R`Valore e limite sinistro (dove vale la prima formula, che include $x = 2$): $f(2) = 4 + 1 = 5$ e $\lim_{x \to 2^-} f(x) = 5$.`,
      R`Limite destro: $\lim_{x \to 2^+} (kx - 3) = 2k - 3$.`,
      R`Impongo l'uguaglianza dei tre numeri: $2k - 3 = 5$, da cui $k = 4$.`,
      R`Controllo: con $k = 4$ il ramo destro è $4x - 3$, che in $2$ vale $5$. I due tratti si raccordano. ✓`
    ], risultato: R`$k = 4$` },

    { titolo: 'Asintoto verticale e orizzontale', problema: R`Trova gli asintoti di $f(x) = \dfrac{3x - 1}{x + 2}$.`, passi: [
      R`Dominio: $x \ne -2$. L'unico candidato per un asintoto verticale è $x = -2$.`,
      R`In $x = -2$ il numeratore vale $-7 \ne 0$, quindi il limite è infinito: $\lim_{x \to -2^-} f(x) = \dfrac{-7}{0^-} = +\infty$ e $\lim_{x \to -2^+} f(x) = \dfrac{-7}{0^+} = -\infty$. La retta $x = -2$ è asintoto verticale.`,
      R`All'infinito, numeratore e denominatore hanno lo stesso grado: $\lim_{x \to \pm\infty} \dfrac{3x-1}{x+2} = 3$, il rapporto dei coefficienti di $x$.`,
      R`La retta $y = 3$ è asintoto orizzontale da entrambe le parti; l'obliquo non si cerca nemmeno, perché su ogni lato c'è al massimo un asintoto non verticale.`
    ], risultato: R`Asintoto verticale $x = -2$, asintoto orizzontale $y = 3$.` },

    { titolo: 'Asintoto obliquo', problema: R`Trova tutti gli asintoti di $f(x) = \dfrac{2x^2 - x + 1}{x - 1}$.`, passi: [
      R`Dominio: $x \ne 1$. In $x = 1$ il numeratore vale $2 - 1 + 1 = 2 \ne 0$, quindi $x = 1$ è asintoto verticale ($-\infty$ da sinistra, $+\infty$ da destra).`,
      R`Orizzontale: $\lim_{x \to \pm\infty} f(x) = \pm\infty$, perché il numeratore ha grado maggiore. Non c'è.`,
      R`Coefficiente angolare: $$m = \lim_{x \to \pm\infty} \frac{f(x)}{x} = \lim_{x \to \pm\infty} \frac{2x^2 - x + 1}{x^2 - x} = 2,$$ finito e diverso da zero.`,
      R`Termine noto: $$q = \lim_{x \to \pm\infty}\left(\frac{2x^2 - x + 1}{x - 1} - 2x\right) = \lim_{x \to \pm\infty} \frac{2x^2 - x + 1 - 2x^2 + 2x}{x - 1} = \lim_{x \to \pm\infty} \frac{x + 1}{x - 1} = 1.$$`,
      R`Verifica con la divisione fra polinomi: $\dfrac{2x^2 - x + 1}{x - 1} = 2x + 1 + \dfrac{2}{x-1}$, e il resto $\dfrac{2}{x-1}$ tende a zero. ✓`
    ], risultato: R`Asintoto verticale $x = 1$ e asintoto obliquo $y = 2x + 1$ (da entrambe le parti).` },

    { titolo: 'Teorema degli zeri e bisezione', problema: R`Mostra che $x^3 - x - 1 = 0$ ha una soluzione in $[1, 2]$ e localizzala con tre passi di bisezione.`, passi: [
      R`$f(x) = x^3 - x - 1$ è polinomiale, quindi continua in $[1, 2]$. Inoltre $f(1) = 1 - 1 - 1 = -1 < 0$ e $f(2) = 8 - 2 - 1 = 5 > 0$: per il teorema degli zeri esiste $c \in (1, 2)$ con $f(c) = 0$.`,
      R`Primo passo: $m = 1{,}5$ e $f(1{,}5) = 3{,}375 - 2{,}5 = 0{,}875 > 0$. Lo zero sta dove i segni sono discordi, cioè in $[1;\ 1{,}5]$.`,
      R`Secondo passo: $m = 1{,}25$ e $f(1{,}25) = 1{,}953125 - 2{,}25 = -0{,}296875 < 0$. Ora il cambio di segno è fra $1{,}25$ e $1{,}5$: nuovo intervallo $[1{,}25;\ 1{,}5]$.`,
      R`Terzo passo: $m = 1{,}375$ e $f(1{,}375) = 2{,}599609\ldots - 2{,}375 = 0{,}2246\ldots > 0$. Nuovo intervallo $[1{,}25;\ 1{,}375]$, lungo $\dfrac{1}{8}$.`,
      R`Come stima si prende il punto medio, $1{,}3125$, con errore al più $0{,}0625$. Il valore esatto è $1{,}3247\ldots$ ✓`
    ], risultato: R`Lo zero esiste ed è compreso fra $1{,}25$ e $1{,}375$.` }
  ]
,

  formulario: [
    { nome: 'Continuità in un punto', formula: R`\lim_{x \to x_0} f(x) = f(x_0)`, nota: R`Richiede tre cose insieme: $f(x_0)$ esiste, il limite esiste finito, i due valori coincidono.` },
    { nome: 'Continuità con i limiti laterali', formula: R`\lim_{x \to x_0^-} f(x) = \lim_{x \to x_0^+} f(x) = f(x_0)`, nota: R`È la forma da usare nelle funzioni definite a tratti.` },
    { nome: 'Discontinuità di prima specie (salto)', formula: R`l^- \ne l^+ \ \text{entrambi finiti}, \qquad s = l^+ - l^-`, nota: R`Il numero $s$ è il salto; non si può eliminare ridefinendo $f$.` },
    { nome: 'Discontinuità di seconda specie', formula: R`l^- = \pm\infty \quad \text{oppure} \quad l^+ = \pm\infty \quad \text{oppure un limite laterale non esiste}` },
    { nome: 'Discontinuità di terza specie (eliminabile)', formula: R`\lim_{x \to x_0} f(x) = l \ \text{finito}, \quad \text{ma } f(x_0) \ne l \ \text{o non definita}`, nota: R`Si elimina ponendo $f(x_0) = l$: è il prolungamento per continuità.` },
    { nome: 'Teorema di Weierstrass', formula: R`f \ \text{continua in} \ [a, b] \ \Rightarrow \ \exists \ \max_{[a,b]} f \ \text{e} \ \min_{[a,b]} f`, nota: R`Servono intervallo chiuso e limitato, e continuità su tutto l'intervallo.` },
    { nome: 'Teorema degli zeri (Bolzano)', formula: R`f \ \text{continua in} \ [a,b], \ f(a) \cdot f(b) < 0 \ \Rightarrow \ \exists \, c \in (a,b) : f(c) = 0`, nota: R`Garantisce almeno uno zero, non esattamente uno.` },
    { nome: 'Teorema dei valori intermedi (Darboux)', formula: R`f \ \text{continua in} \ [a,b] \ \Rightarrow \ f \ \text{assume ogni valore fra} \ \min f \ \text{e} \ \max f` },
    { nome: 'Bisezione: ampiezza dopo n passi', formula: R`\frac{b - a}{2^n}`, nota: R`Prendendo il punto medio come stima, l'errore è al più $\dfrac{b-a}{2^{n+1}}$.` },
    { nome: 'Asintoto verticale', formula: R`\lim_{x \to c^-} f(x) = \pm\infty \ \ \text{o} \ \ \lim_{x \to c^+} f(x) = \pm\infty \ \Rightarrow \ x = c`, nota: R`Si cerca solo nei punti esclusi dal dominio.` },
    { nome: 'Asintoto orizzontale', formula: R`\lim_{x \to +\infty} f(x) = q \ \text{finito} \ \Rightarrow \ y = q`, nota: R`Da calcolare separatamente per $x \to +\infty$ e per $x \to -\infty$.` },
    { nome: 'Asintoto obliquo', formula: R`m = \lim_{x \to \pm\infty} \frac{f(x)}{x}, \qquad q = \lim_{x \to \pm\infty} \big(f(x) - mx\big)`, nota: R`Esiste solo se $m$ è finito e diverso da $0$ e $q$ è finito.` },
    { nome: 'Asintoti di una funzione razionale fratta', formula: R`\frac{a_n x^n + \ldots}{b_m x^m + \ldots} \ : \quad n < m \Rightarrow y = 0; \quad n = m \Rightarrow y = \frac{a_n}{b_m}; \quad n = m + 1 \Rightarrow \text{obliquo}` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Funzione continua in $x_0$`, retro: R`$\lim_{x \to x_0} f(x) = f(x_0)$, con il limite finito e $x_0$ nel dominio.` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Le tre condizioni della continuità in $x_0$`, retro: R`1) $f(x_0)$ esiste; 2) il limite per $x \to x_0$ esiste finito; 3) i due numeri coincidono.` },
    { id: 'fc-03', sezione: 'definizione', tipo: 'definizione', fronte: R`Funzione continua in $[a, b]$`, retro: R`Continua in ogni punto interno, continua a destra in $a$ e a sinistra in $b$.` },
    { id: 'fc-04', sezione: 'definizione', tipo: 'concetto', fronte: R`$f(x) = \dfrac{1}{x}$ è continua?`, retro: R`Sì, in tutto il suo dominio $\mathbb{R} \setminus \{0\}$. In $0$ non è definita, quindi non si parla né di continuità né di discontinuità della funzione lì definita.` },
    { id: 'fc-05', sezione: 'funzioni-elementari', tipo: 'concetto', fronte: R`Quali funzioni elementari sono continue nel loro dominio?`, retro: R`Tutte: polinomiali, razionali, irrazionali, goniometriche, esponenziali, logaritmiche, valore assoluto.` },
    { id: 'fc-06', sezione: 'funzioni-elementari', tipo: 'procedura', fronte: R`Limite di una funzione continua in $x_0$`, retro: R`Si calcola sostituendo: $\lim_{x \to x_0} f(x) = f(x_0)$.` },
    { id: 'fc-07', sezione: 'funzioni-elementari', tipo: 'concetto', fronte: R`Somma, prodotto e quoziente di funzioni continue`, retro: R`Somma, differenza e prodotto sono continue; il quoziente $\dfrac{f}{g}$ lo è dove $g(x_0) \ne 0$. Anche la composta è continua.` },
    { id: 'fc-08', sezione: 'funzioni-elementari', tipo: 'concetto', fronte: R`Continuità e derivabilità`, retro: R`Derivabile $\Rightarrow$ continua. Il viceversa è falso: $|x|$ è continua in $0$ ma non derivabile.` },
    { id: 'fc-09', sezione: 'discontinuita', tipo: 'definizione', fronte: R`Discontinuità di prima specie`, retro: R`I due limiti laterali esistono, sono finiti e diversi. Si chiama anche salto.` },
    { id: 'fc-10', sezione: 'discontinuita', tipo: 'formula', fronte: R`Salto in un punto di prima specie`, retro: R`$s = l^+ - l^-$, differenza fra limite destro e limite sinistro.` },
    { id: 'fc-11', sezione: 'discontinuita', tipo: 'definizione', fronte: R`Discontinuità di seconda specie`, retro: R`Almeno uno dei due limiti laterali è infinito oppure non esiste.` },
    { id: 'fc-12', sezione: 'discontinuita', tipo: 'definizione', fronte: R`Discontinuità di terza specie`, retro: R`Il limite esiste finito, ma $f(x_0)$ non esiste o è diverso dal limite. Si dice eliminabile.` },
    { id: 'fc-13', sezione: 'discontinuita', tipo: 'procedura', fronte: R`Come si classifica una discontinuità`, retro: R`Si calcolano i due limiti laterali: diversi e finiti $\to$ prima specie; almeno uno infinito o inesistente $\to$ seconda; uguali e finiti $\to$ terza.` },
    { id: 'fc-14', sezione: 'discontinuita', tipo: 'concetto', fronte: R`Prolungamento per continuità`, retro: R`Nel caso eliminabile, si ridefinisce $f(x_0) = \lim_{x \to x_0} f(x)$ e la nuova funzione è continua.` },
    { id: 'fc-15', sezione: 'teoremi', tipo: 'definizione', fronte: R`Teorema di Weierstrass`, retro: R`Se $f$ è continua in $[a, b]$ (chiuso e limitato), ammette massimo e minimo assoluti in $[a, b]$.` },
    { id: 'fc-16', sezione: 'teoremi', tipo: 'definizione', fronte: R`Teorema degli zeri`, retro: R`Se $f$ è continua in $[a,b]$ e $f(a) \cdot f(b) < 0$, esiste almeno un $c \in (a,b)$ con $f(c) = 0$.` },
    { id: 'fc-17', sezione: 'teoremi', tipo: 'definizione', fronte: R`Teorema dei valori intermedi`, retro: R`Una funzione continua in $[a,b]$ assume tutti i valori compresi fra il suo minimo e il suo massimo.` },
    { id: 'fc-18', sezione: 'teoremi', tipo: 'concetto', fronte: R`Controesempio a Weierstrass`, retro: R`$f(x) = \dfrac{1}{x}$ su $(0, 1]$: continua, ma senza massimo. L'intervallo non è chiuso.` },
    { id: 'fc-19', sezione: 'bisezione', tipo: 'procedura', fronte: R`I passi del metodo di bisezione`, retro: R`Si calcola $m = \dfrac{a+b}{2}$ e $f(m)$; si tiene la metà agli estremi della quale $f$ cambia segno; si ripete.` },
    { id: 'fc-20', sezione: 'bisezione', tipo: 'formula', fronte: R`Ampiezza dell'intervallo dopo $n$ bisezioni`, retro: R`$\dfrac{b-a}{2^n}$.` },
    { id: 'fc-21', sezione: 'asintoti-verticali-orizzontali', tipo: 'definizione', fronte: R`Asintoto verticale`, retro: R`La retta $x = c$, quando almeno uno dei limiti laterali di $f$ in $c$ è infinito.` },
    { id: 'fc-22', sezione: 'asintoti-verticali-orizzontali', tipo: 'definizione', fronte: R`Asintoto orizzontale`, retro: R`La retta $y = q$, quando $\lim_{x \to +\infty} f(x) = q$ (o lo stesso per $x \to -\infty$), con $q$ finito.` },
    { id: 'fc-23', sezione: 'asintoti-verticali-orizzontali', tipo: 'concetto', fronte: R`Il grafico può tagliare un asintoto orizzontale?`, retro: R`Sì, anche infinite volte: $\dfrac{\sin x}{x}$ ha asintoto $y = 0$ e lo attraversa in ogni $x = k\pi$.` },
    { id: 'fc-24', sezione: 'asintoto-obliquo', tipo: 'formula', fronte: R`Come si trovano $m$ e $q$ dell'asintoto obliquo`, retro: R`$m = \lim_{x \to \pm\infty} \dfrac{f(x)}{x}$ e poi $q = \lim_{x \to \pm\infty} (f(x) - mx)$.` },
    { id: 'fc-25', sezione: 'asintoto-obliquo', tipo: 'concetto', fronte: R`Quando l'asintoto obliquo non esiste`, retro: R`Se $m$ è infinito, se $m = 0$ (allora è orizzontale), o se il limite di $f(x) - mx$ non è finito.` },
    { id: 'fc-26', sezione: 'tratti-parametro', tipo: 'procedura', fronte: R`Trovare il parametro che rende continua una funzione a tratti`, retro: R`Nel punto di raccordo si impone limite sinistro $=$ limite destro $=$ valore della funzione, e si risolve rispetto al parametro.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Determina $k$ in modo che $f(x) = \begin{cases} 3x + k & x \le 1 \\ x^2 & x > 1 \end{cases}$ sia continua in $x = 1$.`, suggerimenti: [R`L'unico punto da controllare è il raccordo $x = 1$.`, R`Calcola $f(1)$ con la prima formula e il limite destro con la seconda, poi uguagliali.`], risposta: { tipo: 'numero', valore: -2, tolleranza: 0.01 }, soluzione: [R`Limite sinistro e valore: $f(1) = 3 + k$.`, R`Limite destro: $\lim_{x \to 1^+} x^2 = 1$.`, R`Continuità: $3 + k = 1$, quindi $k = -2$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Di che specie è la discontinuità di $f(x) = \dfrac{x^2 - 1}{x - 1}$ in $x = 1$?`, suggerimenti: [R`Semplifica la frazione: il numeratore è una differenza di quadrati.`, R`Se il limite esiste finito ma il punto non appartiene al dominio, la discontinuità è eliminabile.`], risposta: { tipo: 'testo', accettate: ['terza specie', 'terza', '3', 'eliminabile', 'discontinuità eliminabile', 'terza specie o eliminabile'] }, soluzione: [R`$\dfrac{x^2-1}{x-1} = \dfrac{(x-1)(x+1)}{x-1} = x + 1$ per $x \ne 1$.`, R`$\lim_{x \to 1} f(x) = 2$, finito, ma $f(1)$ non esiste.`, R`È una discontinuità di **terza specie**, cioè eliminabile: ponendo $f(1) = 2$ la funzione diventa continua.`] },

    { id: 'es-03', difficolta: 1, testo: R`Trova l'asintoto orizzontale di $f(x) = \dfrac{2x + 5}{x - 3}$.`, suggerimenti: [R`Numeratore e denominatore hanno lo stesso grado.`, R`In questo caso il limite all'infinito è il rapporto dei coefficienti di $x$.`], risposta: { tipo: 'testo', accettate: ['y=2', 'y = 2', '2'] }, soluzione: [R`$\lim_{x \to \pm\infty} \dfrac{2x+5}{x-3} = \dfrac{2}{1} = 2$.`, R`L'asintoto orizzontale è la retta $y = 2$, sia a destra sia a sinistra.`] },

    { id: 'es-04', difficolta: 1, testo: R`Trova l'asintoto verticale di $f(x) = \dfrac{x + 1}{x - 4}$.`, suggerimenti: [R`Cerca i punti esclusi dal dominio.`, R`Controlla che in quel punto il numeratore non si annulli.`], risposta: { tipo: 'testo', accettate: ['x=4', 'x = 4', '4'] }, soluzione: [R`Il denominatore si annulla per $x = 4$, dove il numeratore vale $5 \ne 0$.`, R`$\lim_{x \to 4^-} f(x) = -\infty$ e $\lim_{x \to 4^+} f(x) = +\infty$: la retta $x = 4$ è asintoto verticale.`] },

    { id: 'es-05', difficolta: 2, testo: R`Classifica la discontinuità di $f(x) = \dfrac{1}{x - 2}$ in $x = 2$.`, suggerimenti: [R`Calcola i due limiti laterali.`, R`Se anche uno solo dei due è infinito, la specie è già decisa.`], risposta: { tipo: 'testo', accettate: ['seconda specie', 'seconda', '2', 'specie seconda'] }, soluzione: [R`$\lim_{x \to 2^-} \dfrac{1}{x-2} = \dfrac{1}{0^-} = -\infty$ e $\lim_{x \to 2^+} \dfrac{1}{x-2} = +\infty$.`, R`Entrambi i limiti laterali sono infiniti: discontinuità di **seconda specie**. La retta $x = 2$ è asintoto verticale.`] },

    { id: 'es-06', difficolta: 2, testo: R`Trova l'asintoto obliquo di $f(x) = \dfrac{x^2 + 3x}{x - 1}$.`, suggerimenti: [R`Il grado del numeratore supera di uno quello del denominatore: l'asintoto obliquo c'è.`, R`Calcola prima $m = \lim \dfrac{f(x)}{x}$, poi $q = \lim (f(x) - mx)$.`, R`In alternativa, esegui la divisione fra polinomi e guarda il quoziente.`], risposta: { tipo: 'testo', accettate: ['y=x+4', 'y = x + 4', 'x+4', 'x + 4'] }, soluzione: [R`$m = \lim_{x \to \pm\infty} \dfrac{x^2+3x}{x(x-1)} = 1$.`, R`$q = \lim_{x \to \pm\infty}\left(\dfrac{x^2+3x}{x-1} - x\right) = \lim_{x \to \pm\infty} \dfrac{x^2+3x-x^2+x}{x-1} = \lim_{x \to \pm\infty} \dfrac{4x}{x-1} = 4$.`, R`L'asintoto obliquo è $y = x + 4$. Verifica con la divisione: $\dfrac{x^2+3x}{x-1} = x + 4 + \dfrac{4}{x-1}$. ✓`] },

    { id: 'es-07', difficolta: 2, testo: R`Calcola il salto di $f(x) = \dfrac{x - 3}{|x - 3|}$ nel suo punto di discontinuità.`, suggerimenti: [R`Il punto critico è $x = 3$: togli il valore assoluto distinguendo $x > 3$ e $x < 3$.`, R`Il salto è $s = l^+ - l^-$, e l'ordine dei due limiti conta.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`Per $x > 3$: $|x-3| = x-3$, quindi $f(x) = 1$ e $l^+ = 1$.`, R`Per $x < 3$: $|x-3| = 3-x$, quindi $f(x) = -1$ e $l^- = -1$.`, R`Prima specie, con salto $s = 1 - (-1) = 2$.`] },

    { id: 'es-08', difficolta: 2, testo: R`L'equazione $x^3 + x - 3 = 0$ ha una soluzione in $[1, 2]$. Applica **due** passi di bisezione e indica l'intervallo che ottieni.`, suggerimenti: [R`Verifica prima che $f(1)$ e $f(2)$ abbiano segni opposti.`, R`Primo punto medio: $m = 1{,}5$. Calcola $f(1{,}5)$ e guarda con quale estremo ha segno discorde.`], risposta: { tipo: 'intervallo', da: 1, a: 1.25, chiusoDa: true, chiusoA: true }, soluzione: [R`$f(1) = 1 + 1 - 3 = -1 < 0$ e $f(2) = 8 + 2 - 3 = 7 > 0$: le ipotesi del teorema degli zeri valgono.`, R`Primo passo: $f(1{,}5) = 3{,}375 + 1{,}5 - 3 = 1{,}875 > 0$. Il segno cambia fra $1$ e $1{,}5$: nuovo intervallo $[1;\ 1{,}5]$.`, R`Secondo passo: $f(1{,}25) = 1{,}953125 + 1{,}25 - 3 = 0{,}203125 > 0$. Il segno cambia fra $1$ e $1{,}25$.`, R`Intervallo finale $[1;\ 1{,}25]$, di ampiezza $0{,}25$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Quale valore bisogna assegnare a $f(2)$ perché $f(x) = \dfrac{x^2 - 5x + 6}{x - 2}$ diventi continua in $x = 2$?`, suggerimenti: [R`Scomponi il numeratore: le sue radici sono $2$ e $3$.`, R`Il valore da assegnare è il limite per $x \to 2$.`], risposta: { tipo: 'numero', valore: -1, tolleranza: 0.01 }, soluzione: [R`$x^2 - 5x + 6 = (x-2)(x-3)$, quindi per $x \ne 2$ si ha $f(x) = x - 3$.`, R`$\lim_{x \to 2} f(x) = 2 - 3 = -1$: la discontinuità è eliminabile.`, R`Ponendo $f(2) = -1$ la funzione è continua su tutto $\mathbb{R}$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Determina $a$ e $b$ perché $f(x) = \begin{cases} x^2 + a & x < 2 \\ bx - 1 & x \ge 2 \end{cases}$ sia continua in $x = 2$ e valga $f(2) = 5$.`, suggerimenti: [R`Comincia dalla condizione $f(2) = 5$: il punto $x = 2$ è governato dalla seconda formula.`, R`Trovato $b$, imponi che il limite sinistro valga anch'esso $5$.`], risposta: { tipo: 'numeri', valori: [1, 3] }, soluzione: [R`$f(2) = 2b - 1 = 5$, quindi $b = 3$.`, R`Limite sinistro: $\lim_{x \to 2^-}(x^2 + a) = 4 + a$. Per la continuità deve valere $5$, quindi $a = 1$.`, R`Con $a = 1$ e $b = 3$ i due rami si raccordano in $(2;\ 5)$.`] },

    { id: 'es-11', difficolta: 3, testo: R`Sia $f(x) = \dfrac{x^2 - k^2}{x - k}$ per $x \ne k$ e $f(k) = 6$, con $k > 0$. Per quale valore di $k$ la funzione è continua?`, suggerimenti: [R`Scomponi il numeratore come differenza di quadrati.`, R`Calcola il limite per $x \to k$ e imponi che valga $6$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01 }, soluzione: [R`$\dfrac{x^2 - k^2}{x - k} = \dfrac{(x-k)(x+k)}{x-k} = x + k$ per $x \ne k$.`, R`$\lim_{x \to k} f(x) = 2k$.`, R`Continuità: $2k = 6$, cioè $k = 3$ (accettabile perché positivo).`] },

    { id: 'es-12', difficolta: 3, testo: R`Trova tutti gli asintoti di $f(x) = \dfrac{2x^2 + 3}{x + 1}$ e scrivi l'equazione di quello obliquo.`, suggerimenti: [R`Il dominio esclude un solo punto: lì cerca l'asintoto verticale.`, R`Il grado del numeratore supera di uno quello del denominatore: niente orizzontale, ma c'è l'obliquo.`, R`$m = \lim \dfrac{2x^2+3}{x^2+x}$, poi $q = \lim \left(f(x) - mx\right)$.`], risposta: { tipo: 'testo', accettate: ['y=2x-2', 'y = 2x - 2', '2x-2', 'y=2x−2'] }, soluzione: [R`Dominio $x \ne -1$; in $-1$ il numeratore vale $5 \ne 0$, quindi $x = -1$ è asintoto verticale.`, R`$m = \lim_{x \to \pm\infty} \dfrac{2x^2+3}{x^2+x} = 2$.`, R`$q = \lim_{x \to \pm\infty}\left(\dfrac{2x^2+3}{x+1} - 2x\right) = \lim_{x \to \pm\infty} \dfrac{2x^2+3-2x^2-2x}{x+1} = \lim_{x \to \pm\infty}\dfrac{3-2x}{x+1} = -2$.`, R`Asintoto obliquo $y = 2x - 2$. Verifica: $\dfrac{2x^2+3}{x+1} = 2x - 2 + \dfrac{5}{x+1}$. ✓`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Una funzione $f$ è continua in $x_0$ quando…`, opzioni: [R`$f$ è definita in $x_0$`, R`il limite di $f$ per $x \to x_0$ esiste finito`, R`il limite di $f$ per $x \to x_0$ esiste, è finito e vale $f(x_0)$`, R`i limiti laterali in $x_0$ sono entrambi infiniti`], corretta: 2, spiegazione: R`Servono tutte e tre le condizioni insieme: esistenza di $f(x_0)$, esistenza del limite finito, e coincidenza dei due valori. Le prime due opzioni sono ciascuna solo un pezzo della definizione; la quarta descrive una discontinuità di seconda specie.` },

    { id: 'q-02', domanda: R`In $x_0$ il limite sinistro di $f$ vale $3$ e il limite destro vale $-1$. La discontinuità è…`, opzioni: [R`di prima specie, con salto $-4$`, R`di prima specie, con salto $4$`, R`di seconda specie`, R`eliminabile`], corretta: 0, spiegazione: R`I limiti laterali sono finiti e diversi: prima specie. Il salto è $s = l^+ - l^- = -1 - 3 = -4$; scriverlo $+4$ significa aver invertito destra e sinistra. Non è di seconda specie (nessun limite infinito) né eliminabile (i limiti sono diversi).` },

    { id: 'q-03', domanda: R`Il teorema di Weierstrass richiede che la funzione sia…`, opzioni: [R`derivabile in $(a, b)$`, R`continua in un intervallo chiuso e limitato`, R`continua in un intervallo qualsiasi`, R`monotòna in $[a, b]$`], corretta: 1, spiegazione: R`Le due ipotesi sono continuità e intervallo chiuso e limitato: su $(0, 1]$ la funzione continua $\frac1x$ non ha massimo. La derivabilità non serve ($|x|$ su $[-1,1]$ ha massimo e minimo), la monotonia nemmeno.` },

    { id: 'q-04', domanda: R`Quali sono le ipotesi del teorema degli zeri?`, opzioni: [R`$f$ continua in $[a,b]$ e $f(a) \cdot f(b) > 0$`, R`$f$ derivabile in $[a,b]$`, R`$f$ continua in $[a,b]$ e $f(a) \cdot f(b) < 0$`, R`$f$ continua in $(a,b)$ e $f(a) = f(b)$`], corretta: 2, spiegazione: R`Serve la continuità sull'intervallo chiuso e il cambio di segno agli estremi, cioè prodotto **negativo**. Con prodotto positivo il teorema non dice nulla; $f(a) = f(b)$ è l'ipotesi del teorema di Rolle, che riguarda le derivate.` },

    { id: 'q-05', domanda: R`Che tipo di discontinuità presenta $f(x) = \dfrac{1}{x - 1}$ in $x = 1$?`, opzioni: [R`di prima specie`, R`di terza specie, eliminabile`, R`nessuna, perché in $1$ la funzione non è definita`, R`di seconda specie`], corretta: 3, spiegazione: R`I limiti laterali valgono $-\infty$ e $+\infty$: basta che uno sia infinito perché la discontinuità sia di seconda specie. Il fatto che $1$ non appartenga al dominio non annulla la domanda: $1$ è punto di accumulazione del dominio, e la retta $x = 1$ è asintoto verticale.` },

    { id: 'q-06', domanda: R`Perché nella ricerca dell'asintoto obliquo si richiede $m \ne 0$?`, opzioni: [R`perché altrimenti il limite di $f(x) - mx$ non esiste`, R`perché con $m = 0$ la retta è orizzontale, e si ricade nell'asintoto orizzontale`, R`perché con $m = 0$ la funzione non è continua`, R`perché $m$ compare a denominatore`], corretta: 1, spiegazione: R`Se $m = 0$ la retta $y = q$ è orizzontale: non è un caso escluso, è semplicemente un asintoto di un altro tipo, già trovato con il limite di $f(x)$. Il limite di $f(x) - mx$ esiste eccome (vale $q$), e $m$ non sta a nessun denominatore.` },

    { id: 'q-07', domanda: R`Quante volte il grafico di una funzione può intersecare un suo asintoto orizzontale?`, opzioni: [R`mai`, R`al massimo una volta`, R`anche infinite volte`, R`esattamente due volte`], corretta: 2, spiegazione: R`L'asintoto descrive il comportamento all'infinito, non vieta gli incontri al finito: $f(x) = \frac{\sin x}{x}$ ha asintoto $y = 0$ e lo taglia in tutti i punti $x = k\pi$. Sono gli asintoti verticali a non poter essere attraversati, perché lì la funzione non è definita.` },

    { id: 'q-08', domanda: R`Una discontinuità si dice eliminabile quando…`, opzioni: [R`i limiti laterali sono finiti e diversi`, R`il limite esiste finito ma non coincide con $f(x_0)$, oppure $f(x_0)$ non esiste`, R`almeno un limite laterale è infinito`, R`la funzione non è derivabile in $x_0$`], corretta: 1, spiegazione: R`Se il limite esiste finito, basta ridefinire (o definire) $f(x_0)$ uguale al limite. Limiti laterali diversi danno la prima specie, un limite infinito la seconda; la derivabilità non c'entra con la classificazione delle discontinuità.` },

    { id: 'q-09', domanda: R`La funzione $f(x) = \dfrac{1}{x}$ è continua su $(0, 1]$ ma non ha massimo. Perché questo non contraddice Weierstrass?`, opzioni: [R`perché $f$ non è continua`, R`perché l'intervallo non è chiuso`, R`perché $f$ non è limitata inferiormente`, R`perché Weierstrass vale solo per i polinomi`], corretta: 1, spiegazione: R`L'estremo $0$ è escluso: l'intervallo non è chiuso, quindi un'ipotesi del teorema non vale. La funzione è continua in tutto $(0,1]$, ed è limitata inferiormente (vale sempre almeno $1$); il teorema si applica a qualunque funzione continua, non solo ai polinomi.` },

    { id: 'q-10', domanda: R`Partendo da $[a, b]$, dopo $n$ passi di bisezione l'intervallo è lungo…`, opzioni: [R`$\dfrac{b-a}{n}$`, R`$\dfrac{b-a}{2n}$`, R`$(b-a) \cdot 2^n$`, R`$\dfrac{b-a}{2^n}$`], corretta: 3, spiegazione: R`Ogni passo dimezza l'ampiezza, quindi dopo $n$ passi si è diviso $n$ volte per $2$: il fattore è $2^n$, non $n$ né $2n$. La lunghezza diminuisce, quindi non può moltiplicarsi per $2^n$.` },

    { id: 'q-11', domanda: R`La funzione di Dirichlet, che vale $1$ sui razionali e $0$ sugli irrazionali…`, opzioni: [R`è continua solo in $x = 0$`, R`è continua su tutto $\mathbb{R}$`, R`non è continua in nessun punto`, R`ha una discontinuità di prima specie in ogni numero intero`], corretta: 2, spiegazione: R`In ogni intervallo, per piccolo che sia, ci sono sia razionali sia irrazionali: nessun limite laterale esiste, in nessun punto. Non è quindi di prima specie da nessuna parte, e non è continua da nessuna parte, nemmeno in $0$.` },

    { id: 'q-12', domanda: R`Quali asintoti orizzontali ha $y = e^x$?`, opzioni: [R`$y = 0$, ma solo per $x \to -\infty$`, R`$y = 0$, sia per $x \to +\infty$ sia per $x \to -\infty$`, R`$y = 1$ per $x \to +\infty$`, R`nessuno`], corretta: 0, spiegazione: R`$\lim_{x \to -\infty} e^x = 0$, quindi $y = 0$ è asintoto a sinistra; a destra $\lim_{x \to +\infty} e^x = +\infty$, e non c'è asintoto orizzontale. È un buon promemoria: i due limiti all'infinito vanno calcolati separatamente.` },

    { id: 'q-13', domanda: R`Se $f$ e $g$ sono continue in $x_0$, la funzione $\dfrac{f}{g}$…`, opzioni: [R`è sempre continua in $x_0$`, R`è continua in $x_0$ purché $g(x_0) \ne 0$`, R`non è mai continua in $x_0$`, R`è continua solo se $f(x_0) = 0$`], corretta: 1, spiegazione: R`Il quoziente di funzioni continue è continuo dove il denominatore non si annulla; se $g(x_0) = 0$ il punto è addirittura escluso dal dominio. La condizione riguarda $g$, non $f$.` },

    { id: 'q-14', domanda: R`Una funzione può avere, per $x \to +\infty$, sia un asintoto orizzontale sia uno obliquo?`, opzioni: [R`sì, se è periodica`, R`sì, sempre`, R`no: il limite di $\dfrac{f(x)}{x}$ è unico, o vale $0$ o vale $m \ne 0$`, R`sì, se ha anche un asintoto verticale`], corretta: 2, spiegazione: R`Su ogni lato c'è al massimo un asintoto non verticale, perché il limite di $\frac{f(x)}{x}$, se esiste, è un solo numero: se è $0$ l'asintoto (eventuale) è orizzontale, altrimenti è obliquo. La presenza di asintoti verticali o la periodicità non cambiano nulla.` },

    { id: 'q-15', domanda: R`Se $f$ è continua in $[a,b]$ e $f(a) \cdot f(b) > 0$, allora…`, opzioni: [R`$f$ non ha zeri in $[a,b]$`, R`$f$ ha esattamente due zeri`, R`il teorema degli zeri non dice nulla: zeri possono esserci oppure no`, R`$f$ ha almeno uno zero`], corretta: 2, spiegazione: R`Il teorema dà una condizione **sufficiente**, non necessaria. Con $f(x) = x^2 - 1$ su $[-2, 2]$ il prodotto vale $9 > 0$ eppure ci sono due zeri; con $f(x) = x^2 + 1$ non ce n'è nessuno. Senza il cambio di segno non si può concludere niente.` },

    { id: 'q-16', domanda: R`Dove si cercano gli asintoti verticali di una funzione?`, opzioni: [R`nei punti in cui la funzione si annulla`, R`nei punti esclusi dal dominio e negli estremi finiti esclusi`, R`solo in $x = 0$`, R`nei punti di massimo e di minimo`], corretta: 1, spiegazione: R`Un asintoto verticale nasce da un limite infinito, che può accadere solo dove la funzione non è definita: denominatori che si annullano, argomenti di logaritmi che tendono a zero, estremi esclusi del dominio. Dove la funzione vale zero il grafico taglia l'asse $x$, il contrario di un asintoto verticale.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Per classificare una discontinuità calcola sempre i **due** limiti laterali separatamente: la specie si legge da lì, senza altre considerazioni.` },
    { tipo: 'errore', testo: R`«Continua nel suo dominio» non è «continua su $\mathbb{R}$». $\dfrac{1}{x}$ è continua ovunque sia definita, ma il suo grafico è spezzato in due rami.` },
    { tipo: 'trucco', testo: R`Per una razionale fratta il confronto dei gradi decide tutto: numeratore di grado minore $\to$ asintoto $y = 0$; gradi uguali $\to$ rapporto dei coefficienti direttivi; numeratore di un grado in più $\to$ asintoto obliquo.` },
    { tipo: 'errore', testo: R`Nell'asintoto obliquo l'ordine non è invertibile: prima $m$, perché $q = \lim (f(x) - mx)$ ha bisogno di $m$ già calcolato.` },
    { tipo: 'trucco', testo: R`Se la funzione è una frazione di polinomi, la divisione fra polinomi regala l'asintoto obliquo senza calcolare limiti: è il quoziente, e il resto tende a zero.` },
    { tipo: 'errore', testo: R`Un denominatore che si annulla non garantisce l'asintoto verticale: se si annulla anche il numeratore, semplifica prima. In $\dfrac{x^2-4}{x-2}$ il punto $x = 2$ dà un buco, non un asintoto.` },
    { tipo: 'metodo', testo: R`In una funzione definita a tratti controlla solo i punti di raccordo: dentro ogni tratto ci sono funzioni elementari, già continue per conto loro.` },
    { tipo: 'errore', testo: R`Weierstrass e il teorema degli zeri chiedono un intervallo **chiuso e limitato**: su un intervallo aperto le conclusioni cadono, e non per un cavillo.` },
    { tipo: 'trucco', testo: R`I limiti per $x \to +\infty$ e per $x \to -\infty$ vanno sempre calcolati separatamente: una funzione può avere un asintoto orizzontale da una parte e uno obliquo dall'altra.` }
  ],

  aneddoti: [
    { matematico: 'Bernard Bolzano', anni: '1781–1848', titolo: 'Il prete di Praga che diffidava dei disegni', testo: R`Bolzano era un sacerdote cattolico e insegnava scienza della religione all'Università di Praga. Le sue prediche pacifiste e le sue idee sociali non piacquero alle autorità austriache: nel 1819 fu rimosso dalla cattedra, messo sotto sorveglianza dalla polizia e gli fu proibito di pubblicare. Due anni prima, nel 1817, aveva stampato un opuscolo dal titolo che è già un programma: *Dimostrazione puramente analitica del teorema che fra due valori di segno opposto sta almeno una radice dell'equazione*. Fino ad allora quel fatto si dava per ovvio guardando il grafico: la curva passa dall'altra parte, quindi da qualche parte taglia l'asse. Bolzano rifiutò l'evidenza del disegno e pretese una dimostrazione fatta solo di disuguaglianze. Stampate in poche copie a Praga, le sue opere restarono quasi sconosciute per decenni; quando furono riscoperte si vide che aveva anticipato Cauchy e Weierstrass.`, legame: R`Il teorema degli zeri porta il suo nome: è lui a trasformare un'evidenza grafica in un teorema dimostrato.` },

    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Il professore di ginnastica che rifondò l\'analisi', testo: R`Il padre lo voleva funzionario delle imposte e lo mandò a studiare legge a Bonn: Weierstrass passò quattro anni fra scherma e birra e tornò a casa senza laurea. Ripiegò sull'insegnamento e per quattordici anni fece il professore in licei di provincia, con in orario anche ginnastica e calligrafia, facendo matematica di notte e senza una biblioteca. Nel 1854 un suo lavoro sulle funzioni abeliane, uscito su una rivista che contava, fece il giro d'Europa: Königsberg gli diede la laurea honoris causa e due anni dopo era professore a Berlino, saltando tutta la gavetta. È lui a dare al limite e alla continuità la definizione con $\varepsilon$ e $\delta$ che si usa ancora. Nel 1872 presentò all'Accademia di Berlino una funzione continua in ogni punto e derivabile in nessuno: molti colleghi la giudicarono una mostruosità inutile.`, legame: R`La definizione rigorosa di funzione continua e il teorema del massimo e del minimo sono suoi.` },

    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'La funzione che non si può disegnare', testo: R`Dirichlet insegnò a Berlino e poi a Gottinga, sulla cattedra che era stata di Gauss, e sposò Rebecka Mendelssohn, sorella del compositore Felix. Era famoso per essere laconico: si racconta che alla nascita del primo figlio abbia mandato al suocero un telegramma con scritto soltanto «$2+1=3$». Nel 1829, studiando la convergenza delle serie di Fourier, ebbe bisogno di un esempio estremo e costruì la funzione che oggi porta il suo nome: vale $1$ se $x$ è razionale e $0$ se $x$ è irrazionale. In ogni intervallo, per quanto piccolo, si trovano sia razionali sia irrazionali, quindi la funzione salta di continuo fra $0$ e $1$ ed è discontinua in **ogni** punto della retta reale. Non la si può disegnare, eppure è definita in modo perfettamente preciso.`, legame: R`È il controesempio che misura quanto sia forte la richiesta di continuità: senza di essa nessuno dei tre teoremi funziona.` },

    { matematico: 'Giuseppe Peano', anni: '1858–1932', titolo: 'La curva che riempie tutto il quadrato', testo: R`Nato in una cascina vicino a Cuneo e diventato professore a Torino, Peano aveva il gusto del controesempio: correggeva i colleghi in pubblico e si divertiva a trovare errori nei manuali più diffusi. Nel 1890 pubblicò un articolo di poche pagine, senza una sola figura, in cui costruiva una curva continua che passa per **tutti** i punti di un quadrato. Fino a quel momento sembrava ovvio che una curva fosse un oggetto a una dimensione e che la continuità bastasse a garantirlo: Peano dimostrò di no, con una costruzione puramente aritmetica basata sulle cifre dei numeri scritti in base tre. Negli ultimi anni si dedicò al *latino sine flexione*, una lingua internazionale ottenuta dal latino togliendo le declinazioni, e ci scriveva perfino articoli di matematica.`, legame: R`Un promemoria severo: «continua» non significa «come me l'aspetto», e l'intuizione grafica va sempre controllata con la definizione.` }
  ]
});
})();
