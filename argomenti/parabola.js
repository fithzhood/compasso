(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'parabola',
  titolo: 'La parabola',

  introduzione: R`La parabola è la curva che si ottiene tagliando un cono con un piano parallelo a una delle sue generatrici, ma la definizione più utile in un piano cartesiano è un'altra: è l'insieme dei punti che stanno alla stessa distanza da un punto fisso, il **fuoco**, e da una retta fissa, la **direttrice**. Da questa idea semplice nasce l'equazione $y = ax^2+bx+c$, la stessa che compare come grafico nelle equazioni di secondo grado: risolvere $ax^2+bx+c=0$ significa proprio cercare dove quella parabola incontra l'asse $x$.

La parabola non è solo un esercizio di geometria analitica: è la traiettoria di ogni proiettile lanciato in aria (un pallone, un getto d'acqua), il profilo dei cavi di un ponte sospeso quando il carico è distribuito sulla campata, ed è la forma degli specchi delle antenne paraboliche e dei fari delle automobili, che sfruttano una proprietà del fuoco per concentrare o proiettare la luce in un'unica direzione.

Per seguire bene questo argomento servono le equazioni di secondo grado (discriminante, formula risolutiva) e i concetti base del piano cartesiano: distanza fra due punti, equazione di una retta, sistemi di equazioni.`,

  sezioni: [
    { id: 'definizione-luogo', titolo: 'La parabola come luogo geometrico', testo: R`Fissa nel piano un punto $F$, il **fuoco**, e una retta $d$ che non passa per $F$, la **direttrice**. La parabola di fuoco $F$ e direttrice $d$ è l'insieme dei punti $P$ del piano equidistanti da $F$ e da $d$.

>* **Definizione:** $P$ appartiene alla parabola se $PF = PH$, dove $H$ è il piede della perpendicolare condotta da $P$ alla direttrice $d$: la distanza di $P$ da $F$ è uguale alla distanza di $P$ da $d$.

La parabola ha un **asse** di simmetria: la retta perpendicolare a $d$ e passante per $F$. Il punto della curva più vicino sia a $F$ sia a $d$ è il **vertice** $V$, che sta esattamente a metà strada fra il fuoco e la direttrice, sull'asse.

Per ogni punto $H$ scelto sulla direttrice, il punto della parabola associato a $H$ si trova nell'intersezione fra l'asse del segmento $FH$ (i punti equidistanti da $F$ e da $H$) e la perpendicolare a $d$ passante per $H$: l'animazione costruisce così la curva punto per punto.

[[animazione:parabola-luogo]]

>! La distanza di un punto da una retta è sempre la distanza **perpendicolare**, la più breve possibile: non va confusa con la distanza lungo un'altra direzione, per esempio quella verticale se la direttrice non è orizzontale.` },

    { id: 'equazione-canonica', titolo: 'Dalla definizione all\'equazione: il caso y = ax²', testo: R`Metti il vertice della parabola nell'origine e l'asse lungo l'asse $y$: il fuoco è allora $F(0, p)$ e la direttrice è la retta $y = -p$, con $p \ne 0$ la distanza (con segno) fra vertice e fuoco.

Un punto $P(x, y)$ sta sulla parabola quando $PF$ è uguale alla distanza di $P$ dalla direttrice, cioè $|y + p|$:
$$\sqrt{x^2 + (y - p)^2} = |y + p|.$$
Elevando al quadrato entrambi i membri ed eliminando i termini uguali,
$$x^2 + y^2 - 2py + p^2 = y^2 + 2py + p^2 \quad\Rightarrow\quad x^2 = 4py \quad\Rightarrow\quad y = \frac{x^2}{4p}.$$

>* Ponendo $a = \dfrac{1}{4p}$ si ottiene la forma più familiare $y = ax^2$: il coefficiente $a$ e la distanza $p$ fra vertice e fuoco sono legati da $p = \dfrac{1}{4a}$.

Per esempio, con fuoco $F(0, 1)$ e direttrice $y = -1$ si ha $p = 1$ e quindi $y = \dfrac{x^2}{4}$. Trascina il punto $P$ nel grafico: qualunque sia la sua posizione sulla curva, le due distanze restano uguali.

[[grafico:luogoParabola]]

Se il vertice non sta nell'origine, la stessa curva $y = ax^2$ si trasla: sostituendo $x$ con $x - x_V$ e $y$ con $y - y_V$ e sviluppando i quadrati si arriva alla forma generale $y = ax^2 + bx + c$, con $a \ne 0$, che è l'equazione della parabola con asse parallelo all'asse $y$ (la ritroveremo nelle equazioni di secondo grado: risolvere $ax^2+bx+c=0$ significa cercare dove questa parabola incontra l'asse $x$).

>! Come per le equazioni di secondo grado, la condizione $a \ne 0$ è essenziale: con $a = 0$ l'equazione diventa quella di una retta, non di una parabola.` },

    { id: 'significato-a-b-c', titolo: 'Il significato di a, b e c', testo: R`Nell'equazione $y = ax^2 + bx + c$ ciascun coefficiente ha un effetto preciso e riconoscibile sul grafico.

**Il coefficiente $a$** decide la **concavità**: se $a > 0$ la parabola volge la concavità verso l'alto (ha un minimo nel vertice), se $a < 0$ verso il basso (ha un massimo). Il valore assoluto di $a$ decide invece l'**apertura**: confrontando $y = x^2$, $y = 3x^2$ e $y = 0{,}3x^2$ nel punto $x = 1$ si ottengono le ordinate $1$, $3$ e $0{,}3$, quindi $|a|$ grande dà una parabola stretta e ripida, $|a|$ piccolo una parabola larga e schiacciata.

**Il coefficiente $c$** è l'ordinata del punto in cui la parabola incontra l'asse $y$: per $x = 0$, infatti, $y = c$. Ogni parabola $y = ax^2+bx+c$ passa quindi per il punto $(0, c)$, qualunque siano $a$ e $b$.

**Il coefficiente $b$**, insieme ad $a$, sposta la posizione della parabola rispetto all'asse $y$: cambiando $b$ e lasciando fissi $a$ e $c$, la curva continua a passare per lo stesso punto $(0, c)$, ma il vertice scivola altrove. Il segno di $b$ da solo non basta a dire dove sta il vertice: bisogna guardare $a$ e $b$ insieme, perché l'ascissa del vertice è $-\dfrac{b}{2a}$.

>* $a$: concavità e apertura. $c$: intercetta con l'asse $y$. $b$: insieme ad $a$, posizione del vertice.

>! Occhio ai segni quando si legge $-\dfrac{b}{2a}$: se $b$ è negativo, $-b$ è positivo. In $y = 2x^2 - 8x + 3$ si ha $b = -8$, quindi $-\dfrac{b}{2a} = -\dfrac{-8}{4} = 2$, non $-2$.` },

    { id: 'vertice-asse-fuoco-direttrice', titolo: 'Vertice, asse, fuoco e direttrice', testo: R`Come per le equazioni di secondo grado, l'ascissa del vertice di $y = ax^2+bx+c$ è $x_V = -\dfrac{b}{2a}$; sostituendola nell'equazione si trova l'ordinata $y_V = c - \dfrac{b^2}{4a} = -\dfrac{\Delta}{4a}$, con $\Delta = b^2 - 4ac$.

>* **Vertice:** $$V = \left(-\frac{b}{2a}, -\frac{\Delta}{4a}\right)$$ **Asse** (retta di simmetria, verticale): $$x = -\frac{b}{2a}$$

Vicino al vertice, la parabola si comporta come la forma canonica traslata: la distanza fra vertice e fuoco vale $\dfrac{1}{4a}$, e la direttrice sta alla stessa distanza dalla parte opposta. Da qui si ricavano le formule generali:

>* **Fuoco:** $$F = \left(-\frac{b}{2a}, \frac{1 - \Delta}{4a}\right)$$ **Direttrice:** $$y = -\frac{1 + \Delta}{4a}$$

Per esempio, nella parabola $y = x^2 - 4x + 3$ si ha $a = 1$, $b = -4$, $c = 3$ e $\Delta = 16 - 12 = 4$: il vertice è $V(2, -1)$, il fuoco $F\!\left(2, -\dfrac{3}{4}\right)$ e la direttrice $y = -\dfrac{5}{4}$. Nel grafico puoi cambiare $a$, $b$, $c$ e osservare che fuoco e direttrice si muovono sempre alla stessa distanza $\dfrac{1}{4a}$ dal vertice, da parti opposte.

[[grafico:verticeFuocoDirettrice]]

>! Fuoco e direttrice si scambiano facilmente: il fuoco sta **dalla parte della concavità** (dove la parabola "si apre"), la direttrice dalla parte opposta al vertice rispetto al fuoco.` },

    { id: 'asse-parallelo-x', titolo: 'La parabola con asse parallelo all\'asse x', testo: R`Scambiando i ruoli di $x$ e $y$ nell'equazione generale si ottiene $x = ay^2 + by + c$, con $a \ne 0$: una parabola con **asse orizzontale**, parallelo all'asse $x$. Se $a > 0$ la concavità è rivolta verso destra, se $a < 0$ verso sinistra.

>! Questa equazione **non** rappresenta $y$ come funzione di $x$: a molti valori di $x$ corrispondono due valori distinti di $y$ (la curva non supera il test della retta verticale). È invece $x$ a essere funzione di $y$.

Tutte le formule della sezione precedente valgono scambiando $x$ con $y$:

>* Vertice: $V\!\left(c - \dfrac{b^2}{4a}, -\dfrac{b}{2a}\right)$. Asse (orizzontale): $y = -\dfrac{b}{2a}$. Fuoco: $F\!\left(\dfrac{1-\Delta}{4a}, -\dfrac{b}{2a}\right)$. Direttrice (verticale): $x = -\dfrac{1+\Delta}{4a}$, sempre con $\Delta = b^2-4ac$.

Per esempio, $x = y^2 - 2y - 3$ ha $a = 1$, $b = -2$, $c = -3$: l'ordinata del vertice è $-\dfrac{b}{2a} = 1$ e l'ascissa è $c - \dfrac{b^2}{4a} = -3 - 1 = -4$, quindi $V(-4, 1)$. Verifica diretta: per $y = 1$, $x = 1 - 2 - 3 = -4$.

Questa forma compare, per esempio, nel profilo di un canale visto di lato, o ogni volta che serve una curva simmetrica rispetto a una retta orizzontale.

>! Non applicare le formule con $-\dfrac{b}{2a}$ pensando che sia sempre l'ascissa del vertice: nella forma $x=ay^2+by+c$ è l'**ordinata**.` },

    { id: 'intersezioni-assi-rette', titolo: 'Intersezioni con gli assi e con una retta', testo: R`Con l'**asse $y$**: ponendo $x=0$ in $y=ax^2+bx+c$ si trova sempre un solo punto, $(0, c)$. Con l'**asse $x$**: si pone $y=0$ e si risolve $ax^2+bx+c=0$, esattamente come per le equazioni di secondo grado: $\Delta>0$ due punti, $\Delta=0$ un punto (la parabola è tangente all'asse $x$ nel vertice), $\Delta<0$ nessun punto.

Con una **retta generica** $y = mx+q$ il ragionamento è lo stesso: si sostituisce nell'equazione della parabola, si ottiene un'equazione di secondo grado in $x$ e si guarda il segno del suo discriminante (che in generale non è lo stesso $\Delta$ della parabola, perché dipende anche da $m$ e $q$).

>* Sistema retta-parabola: se il discriminante è **positivo** la retta è **secante** (due punti), se è **nullo** è **tangente** (un punto), se è **negativo** è **esterna** (nessun punto).

Per esempio, la parabola $y = x^2-4x+3$ e la retta $y = 2x+q$: sostituendo, $x^2 - 4x + 3 = 2x+q$, cioè $x^2 - 6x + (3-q) = 0$. Qui $\dfrac{\Delta}{4} = 9-(3-q) = 6+q$, quindi $x = 3 \pm \sqrt{6+q}$. Per $q > -6$ la retta è secante, per $q=-6$ è tangente nel punto $(3,0)$, per $q<-6$ è esterna: nel grafico i punti $A$ e $B$ scompaiono proprio quando $q$ scende sotto $-6$.

[[grafico:rettaParabola]]

>! Non confondere il $\Delta$ della parabola (che riguarda solo l'asse $x$) con il discriminante del sistema con una retta qualsiasi: sono due calcoli diversi, anche se la tecnica è la stessa.` },

    { id: 'tangenti-da-un-punto', titolo: 'Le rette tangenti condotte da un punto', testo: R`Dato un punto $P(x_0, y_0)$ che non sta sulla parabola, quante rette per $P$ sono tangenti alla curva? Si scrive il fascio di rette per $P$ (esclusa l'eventuale verticale, che per una parabola con asse verticale non è mai tangente): $y - y_0 = m(x - x_0)$, con $m$ da determinare. Sostituendo nell'equazione della parabola si ottiene un'equazione di secondo grado in $x$ i cui coefficienti dipendono da $m$; imponendo che il suo discriminante sia nullo si ottiene un'equazione in $m$.

Per esempio, le tangenti a $y = x^2$ condotte da $P(1, -3)$: la retta è $y = m(x-1) - 3$, quindi $x^2 = mx - m - 3$, cioè $x^2 - mx + (m+3) = 0$. Il discriminante è $\Delta = m^2 - 4(m+3) = m^2-4m-12$; ponendolo uguale a zero, $m = \dfrac{4 \pm 8}{2}$, cioè $m=6$ oppure $m=-2$. Le due tangenti sono $y = 6x-9$ e $y=-2x-1$, con punti di tangenza $(3,9)$ e $(-1,1)$.

>* Il numero di soluzioni per $m$ dice quante tangenti passano per $P$: **due** se $P$ sta dalla parte convessa della parabola, **una sola** se $P$ sta sulla parabola stessa, **nessuna** se $P$ sta dentro la concavità. Per esempio, da $(0,1)$ (interno alla concavità di $y=x^2$) non passa nessuna tangente: sostituendo si trova $m^2 + 4 = 0$, impossibile perché un quadrato non è mai negativo.

>! Non confondere questo procedimento con quello della sezione precedente: lì si cercava per quali $q$ **una retta già scritta**, di coefficiente angolare fissato, è tangente; qui si cercano **i coefficienti angolari** delle tangenti che passano per un punto dato.` },

    { id: 'determinare-equazione', titolo: 'Determinare l\'equazione di una parabola', testo: R`Per scrivere l'equazione $y=ax^2+bx+c$ di una parabola (asse verticale) servono tre condizioni indipendenti, perché tre sono le incognite $a$, $b$, $c$. I dati tipici sono di tre tipi.

**Tre punti** $A$, $B$, $C$ (con ascisse tutte diverse e non allineati): si sostituiscono le coordinate nell'equazione generale e si risolve il sistema lineare nelle incognite $a$, $b$, $c$. Se uno dei punti ha $x=0$, quel passaggio dà subito $c$.

**Vertice e un punto**: conviene partire dalla forma $y = a(x-x_V)^2 + y_V$, che ha il vertice già incorporato, e sostituire le coordinate del punto per trovare $a$. Per esempio, con $V(-1, 4)$ e passante per $(1, 0)$: $0 = a(1-(-1))^2+4 = 4a+4$, quindi $a=-1$ e $y = -(x+1)^2+4 = -x^2-2x+3$.

**Fuoco e direttrice**: il vertice sta a metà strada fra fuoco e direttrice, sulla perpendicolare alla direttrice per il fuoco; da lì si ricava $p$ (distanza vertice-fuoco) e $a = \dfrac{1}{4p}$. Con fuoco $F(2,3)$ e direttrice $y=1$: il vertice è $(2,2)$, $p=1$, $a=\dfrac14$, quindi $y = \dfrac{(x-2)^2}{4}+2 = \dfrac{x^2}{4}-x+3$.

>* Tre modi, stessa idea: contare le condizioni indipendenti e tradurle in equazioni su $a$, $b$, $c$ (o direttamente sulla forma con vertice).

>! Tre punti con la stessa ascissa non possono mai stare su una parabola $y=ax^2+bx+c$ (non sarebbe una funzione), e tre punti allineati non individuano nessuna parabola: il sistema risulta impossibile oppure dà $a=0$.` },

    { id: 'segmento-parabolico-problemi', titolo: 'Il segmento parabolico e i problemi', testo: R`Una retta secante taglia una parabola in due punti e divide il piano in due parti: la regione compresa fra l'arco di parabola e la corda si chiama **segmento parabolico**. Archimede dimostrò, oltre duemila anni fa e senza calcolo integrale, che la sua area è sempre i $\dfrac{2}{3}$ dell'area del rettangolo di base la corda e altezza la massima distanza fra la corda e l'arco (raggiunta nel punto dove la tangente alla parabola è parallela alla corda).

>* **Formula di Archimede:** $$A = \frac{2}{3}\, b \cdot h$$ dove $b$ è la lunghezza della corda e $h$ la distanza massima fra la corda e l'arco.

Quando la corda è orizzontale e l'arco è simmetrico, $h$ è semplicemente l'altezza del vertice sopra (o sotto) la corda: per $y=4-x^2$ tagliata dall'asse $x$ (corda fra $x=-2$ e $x=2$, quindi $b=4$) l'altezza è $h=4$ e l'area vale $\dfrac{2}{3}\cdot 4\cdot 4 = \dfrac{32}{3}$.

Molti problemi con la parabola si affrontano con lo stesso schema delle equazioni: si sceglie un riferimento comodo, si traducono i dati in condizioni su $a$, $b$, $c$ (o sul vertice), si risolve e si controlla che il risultato abbia senso. Per esempio: un proiettile lanciato da terra ha gittata $8\ \text{m}$ e raggiunge l'altezza massima di $5\ \text{m}$ a metà della gittata. La traiettoria passa per $(0,0)$ e $(8,0)$ (zeri della parabola) e ha vertice in $x=4$: scrivendo $y=ax(x-8)$ e imponendo che per $x=4$ sia $y=5$, si trova $-16a=5$, cioè $a=-\dfrac{5}{16}$, e la traiettoria è $y = -\dfrac{5}{16}x^2+\dfrac{5}{2}x$.

>! In un problema reale una soluzione va sempre controllata: un'altezza o una lunghezza negativa, o dati incompatibili fra loro, segnalano un errore nei calcoli o nei dati di partenza.` }
  ],

  grafici: {
    luogoParabola: {
      tipo: 'piano', x: [-5, 5], y: [-3, 6],
      parametri: [{ nome: 'px', min: -4, max: 4, passo: 0.1, valore: 2.4, nascosto: true }],
      funzioni: [{ f: 'x^2/4', etichetta: 'y = x²/4', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: -1, tratteggio: true, etichetta: 'direttrice: y = −1', colore: 3 },
        { tipo: 'punto', p: [0, 1], etichetta: 'F', posizione: 'sinistra', colore: 4 },
        { tipo: 'segmento', da: ['px', 'px^2/4'], a: [0, 1], tratteggio: true },
        { tipo: 'segmento', da: ['px', 'px^2/4'], a: ['px', -1], tratteggio: true },
        { tipo: 'punto', p: ['px', 'px^2/4'], trascina: true, etichetta: 'P', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-4.8, 5.3], testo: 'distanza da F = {{sqrt(px^2 + (px^2/4 - 1)^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.8, 4.5], testo: 'distanza dalla direttrice = {{px^2/4 + 1}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto P lungo la parabola: le due distanze restano sempre uguali.'
    },
    verticeFuocoDirettrice: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      funzioni: [{ f: 'a x^2 + b x + c', etichetta: 'y = ax² + bx + c', colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: '-b/(2a)', tratteggio: true, colore: 3 },
        { tipo: 'orizzontale', y: '-(1 + b^2 - 4 a c)/(4a)', tratteggio: true, etichetta: 'direttrice', colore: 3 },
        { tipo: 'punto', p: ['-b/(2a)', 'c - b^2/(4a)'], etichetta: 'V', posizione: 'basso', colore: 4 },
        { tipo: 'punto', p: ['-b/(2a)', '(1 - b^2 + 4 a c)/(4a)'], etichetta: 'F', posizione: 'alto', colore: 2 }
      ],
      parametri: [
        { nome: 'a', min: -3, max: 3, passo: 0.1, valore: 1, etichetta: 'a' },
        { nome: 'b', min: -6, max: 6, passo: 0.1, valore: -2, etichetta: 'b' },
        { nome: 'c', min: -6, max: 6, passo: 0.1, valore: -3, etichetta: 'c' }
      ],
      didascalia: 'Cambia a, b, c: il vertice V, il fuoco F e la direttrice (tratteggiata) si spostano insieme alla parabola, sempre alla stessa distanza 1/(4a) dal vertice.'
    },
    rettaParabola: {
      tipo: 'piano', x: [-4, 9], y: [-10, 16],
      funzioni: [
        { f: 'x^2 - 4x + 3', etichetta: 'y = x² − 4x + 3', colore: 1 },
        { f: '2x + q', etichetta: 'y = 2x + q', colore: 3 }
      ],
      punti: [
        { x: '3 - sqrt(6 + q)', y: '2(3 - sqrt(6 + q)) + q', etichetta: 'A', posizione: 'basso', colore: 2 },
        { x: '3 + sqrt(6 + q)', y: '2(3 + sqrt(6 + q)) + q', etichetta: 'B', posizione: 'alto', colore: 2 }
      ],
      parametri: [{ nome: 'q', min: -9, max: 3, passo: 0.5, valore: 0, etichetta: 'q' }],
      didascalia: 'Sposta q: per q > −6 la retta è secante (due punti), per q = −6 è tangente, per q < −6 è esterna e i punti scompaiono.'
    }
  },

  esempi: [
    { titolo: 'Dalla definizione all\'equazione', problema: R`Scrivi l'equazione della parabola con fuoco $F(0,2)$ e direttrice $y=-2$.`, passi: [
      R`Il vertice sta a metà strada fra fuoco e direttrice, quindi nell'origine; l'asse è l'asse $y$. La distanza fra vertice e fuoco è $p=2$.`,
      R`Un punto $P(x,y)$ della parabola verifica $\sqrt{x^2+(y-2)^2} = y+2$ (la distanza dalla direttrice $y=-2$ vale $y-(-2)=y+2$).`,
      R`Elevando al quadrato: $x^2+y^2-4y+4=y^2+4y+4$, cioè $x^2=8y$.`,
      R`Quindi $y=\dfrac{x^2}{8}$: infatti $a=\dfrac{1}{4p}=\dfrac{1}{8}$.`
    ], risultato: R`$y = \dfrac{x^2}{8}$` },

    { titolo: 'Vertice, asse, fuoco e direttrice', problema: R`Determina vertice, asse, fuoco e direttrice della parabola $y=x^2-4x+3$.`, passi: [
      R`Coefficienti: $a=1$, $b=-4$, $c=3$; discriminante $\Delta = 16-12=4$.`,
      R`Vertice: $x_V=-\dfrac{b}{2a}=2$, $y_V=c-\dfrac{b^2}{4a}=3-4=-1$; quindi $V(2,-1)$.`,
      R`Asse: $x=2$.`,
      R`Fuoco: $F\left(2, \dfrac{1-\Delta}{4a}\right)=F\left(2,-\dfrac34\right)$.`,
      R`Direttrice: $y=-\dfrac{1+\Delta}{4a}=-\dfrac54$.`
    ], risultato: R`$V(2,-1)$, asse $x=2$, $F\left(2,-\dfrac34\right)$, direttrice $y=-\dfrac54$` },

    { titolo: 'Retta e parabola: secante, tangente o esterna', problema: R`Studia, al variare di $q$, la posizione della retta $y=2x+q$ rispetto alla parabola $y=x^2-4x+3$, e verifica i casi $q=1$, $q=-6$, $q=-10$.`, passi: [
      R`Sostituendo: $x^2-4x+3=2x+q$, cioè $x^2-6x+(3-q)=0$. Il discriminante ridotto è $\dfrac{\Delta}{4}=9-(3-q)=6+q$.`,
      R`Per $q=1$: $\dfrac{\Delta}{4}=7>0$, due soluzioni $x=3\pm\sqrt7$. La retta è secante.`,
      R`Per $q=-6$: $\dfrac{\Delta}{4}=0$, soluzione doppia $x=3$, $y=0$. La retta è tangente nel punto $(3,0)$.`,
      R`Per $q=-10$: $\dfrac{\Delta}{4}=-4<0$, nessuna soluzione reale. La retta è esterna.`
    ], risultato: R`Secante per $q>-6$, tangente per $q=-6$, esterna per $q<-6$` },

    { titolo: 'Tangenti condotte da un punto esterno', problema: R`Determina le rette tangenti alla parabola $y=x^2$ condotte dal punto $P(1,-3)$.`, passi: [
      R`Fascio di rette per $P$: $y=m(x-1)-3$.`,
      R`Sostituendo in $y=x^2$: $x^2=mx-m-3$, cioè $x^2-mx+(m+3)=0$.`,
      R`Discriminante: $\Delta=m^2-4(m+3)=m^2-4m-12$. Ponendo $\Delta=0$: $m=\dfrac{4\pm\sqrt{16+48}}{2}=\dfrac{4\pm8}{2}$, cioè $m=6$ oppure $m=-2$.`,
      R`Con $m=6$: retta $y=6x-9$, punto di tangenza $(3,9)$. Con $m=-2$: retta $y=-2x-1$, punto di tangenza $(-1,1)$.`
    ], risultato: R`$y=6x-9$ e $y=-2x-1$` },

    { titolo: 'L\'equazione per tre punti', problema: R`Determina l'equazione della parabola passante per $A(-2,0)$, $B(4,0)$ e $C(0,-16)$.`, passi: [
      R`$A$ e $B$ sono i due zeri della parabola: $y=a(x+2)(x-4)$.`,
      R`Imponendo il passaggio per $C(0,-16)$: $-16=a\cdot 2\cdot(-4)=-8a$, quindi $a=2$.`,
      R`Sviluppando: $y=2(x+2)(x-4)=2(x^2-2x-8)=2x^2-4x-16$.`
    ], risultato: R`$y=2x^2-4x-16$` },

    { titolo: 'Il segmento parabolico: la formula di Archimede', problema: R`Un arco parabolico simmetrico è largo $40\ \text{m}$ alla base ed è alto $10\ \text{m}$ nel punto più alto. Calcola, con la formula di Archimede, l'area compresa fra l'arco e la base.`, passi: [
      R`La base è la corda: $b=40\ \text{m}$. L'altezza $h$ è la distanza massima fra corda e arco, cioè l'altezza del vertice: $h=10\ \text{m}$.`,
      R`Formula di Archimede: $A=\dfrac23\,b\cdot h$.`,
      R`$A=\dfrac23\cdot 40\cdot 10=\dfrac{800}{3}\approx 266{,}7\ \text{m}^2$.`
    ], risultato: R`$A=\dfrac{800}{3}\ \text{m}^2\approx 266{,}7\ \text{m}^2$` }
  ],

  formulario: [
    { nome: 'Definizione come luogo', formula: R`PF = PH`, nota: R`$F$ è il fuoco, $H$ il piede della perpendicolare da $P$ alla direttrice: ogni punto $P$ della parabola ha $PF=PH$.` },
    { nome: 'Forma canonica', formula: R`y = \frac{x^2}{4p}`, nota: R`Vertice nell'origine, fuoco $F(0,p)$, direttrice $y=-p$.` },
    { nome: 'Relazione fra a e p', formula: R`a = \frac{1}{4p}`, nota: R`$p$ è la distanza (con segno) fra vertice e fuoco.` },
    { nome: 'Equazione generale (asse verticale)', formula: R`y = ax^2+bx+c, \quad a \ne 0` },
    { nome: 'Vertice (asse verticale)', formula: R`V = \left(-\frac{b}{2a}, -\frac{\Delta}{4a}\right)`, nota: R`$\Delta = b^2-4ac$.` },
    { nome: 'Asse (asse verticale)', formula: R`x = -\frac{b}{2a}` },
    { nome: 'Fuoco (asse verticale)', formula: R`F = \left(-\frac{b}{2a}, \frac{1-\Delta}{4a}\right)` },
    { nome: 'Direttrice (asse verticale)', formula: R`y = -\frac{1+\Delta}{4a}` },
    { nome: 'Equazione generale (asse orizzontale)', formula: R`x = ay^2+by+c, \quad a \ne 0` },
    { nome: 'Vertice (asse orizzontale)', formula: R`V = \left(c-\frac{b^2}{4a}, -\frac{b}{2a}\right)`, nota: R`Ruoli di $x$ e $y$ scambiati rispetto al caso verticale.` },
    { nome: 'Condizione di tangenza retta-parabola', formula: R`\Delta_{\text{sistema}} = 0` },
    { nome: 'Segmento parabolico (Archimede)', formula: R`A = \frac{2}{3}\, b \cdot h`, nota: R`$b$ = lunghezza della corda, $h$ = distanza massima fra corda e arco.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione-luogo', tipo: 'definizione', fronte: R`Definizione di parabola come luogo`, retro: R`Insieme dei punti del piano equidistanti da un punto fisso $F$ (fuoco) e da una retta fissa $d$ (direttrice), con $F \notin d$.` },
    { id: 'fc-02', sezione: 'definizione-luogo', tipo: 'concetto', fronte: R`Perché il fuoco non può stare sulla direttrice?`, retro: R`Il luogo dei punti equidistanti da $F$ e da $d$ si ridurrebbe alla sola perpendicolare a $d$ per $F$: non si otterrebbe una parabola.` },
    { id: 'fc-03', sezione: 'equazione-canonica', tipo: 'formula', fronte: R`Equazione canonica (vertice nell'origine, asse verticale)`, retro: R`$y = \dfrac{x^2}{4p}$, con fuoco $(0,p)$ e direttrice $y = -p$.` },
    { id: 'fc-04', sezione: 'equazione-canonica', tipo: 'concetto', fronte: R`Relazione fra $a$ e $p$ nella forma canonica`, retro: R`$a = \dfrac{1}{4p}$, cioè $p = \dfrac{1}{4a}$: $p$ è la distanza (con segno) fra vertice e fuoco.` },
    { id: 'fc-05', sezione: 'significato-a-b-c', tipo: 'concetto', fronte: R`Che cosa stabilisce il segno di $a$?`, retro: R`La concavità: verso l'alto se $a>0$, verso il basso se $a<0$.` },
    { id: 'fc-06', sezione: 'significato-a-b-c', tipo: 'concetto', fronte: R`Che cosa stabilisce il valore assoluto di $a$?`, retro: R`L'apertura della parabola: $|a|$ grande dà una parabola stretta, $|a|$ piccolo una parabola larga.` },
    { id: 'fc-07', sezione: 'significato-a-b-c', tipo: 'concetto', fronte: R`Che cos'è $c$ in $y=ax^2+bx+c$?`, retro: R`L'ordinata del punto in cui la parabola incontra l'asse $y$, perché per $x=0$ si ha $y=c$.` },
    { id: 'fc-08', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Coordinate del vertice`, retro: R`$V\left(-\dfrac{b}{2a}, -\dfrac{\Delta}{4a}\right)$, con $\Delta=b^2-4ac$.` },
    { id: 'fc-09', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Equazione dell'asse di simmetria (asse verticale)`, retro: R`$x = -\dfrac{b}{2a}$.` },
    { id: 'fc-10', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Coordinate del fuoco (asse verticale)`, retro: R`$F\left(-\dfrac{b}{2a}, \dfrac{1-\Delta}{4a}\right)$.` },
    { id: 'fc-11', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Equazione della direttrice (asse verticale)`, retro: R`$y = -\dfrac{1+\Delta}{4a}$.` },
    { id: 'fc-12', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'concetto', fronte: R`Distanza fra vertice e fuoco`, retro: R`$\left|\dfrac{1}{4a}\right|$: la stessa distanza, dalla parte opposta, separa il vertice dalla direttrice.` },
    { id: 'fc-13', sezione: 'asse-parallelo-x', tipo: 'definizione', fronte: R`Equazione della parabola con asse orizzontale`, retro: R`$x = ay^2 + by + c$, con $a \ne 0$.` },
    { id: 'fc-14', sezione: 'asse-parallelo-x', tipo: 'concetto', fronte: R`Perché $x=ay^2+by+c$ non è il grafico di $y=f(x)$?`, retro: R`Perché a molti valori di $x$ corrispondono due valori di $y$: la curva non supera il test della retta verticale.` },
    { id: 'fc-15', sezione: 'intersezioni-assi-rette', tipo: 'concetto', fronte: R`Quando una retta è tangente a una parabola?`, retro: R`Quando il sistema fra le due equazioni ha discriminante nullo: un'unica soluzione, doppia.` },
    { id: 'fc-16', sezione: 'intersezioni-assi-rette', tipo: 'concetto', fronte: R`Quando una retta è esterna a una parabola?`, retro: R`Quando il sistema fra le due equazioni non ha soluzioni reali (discriminante negativo).` },
    { id: 'fc-17', sezione: 'tangenti-da-un-punto', tipo: 'procedura', fronte: R`Come si trovano le tangenti a una parabola condotte da un punto $P$?`, retro: R`Si scrive il fascio di rette per $P$, si sostituisce nell'equazione della parabola e si impone che il discriminante (nell'incognita $m$) sia nullo.` },
    { id: 'fc-18', sezione: 'tangenti-da-un-punto', tipo: 'concetto', fronte: R`Quante tangenti passano per un punto interno alla concavità della parabola?`, retro: R`Nessuna.` },
    { id: 'fc-19', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Come si trova l'equazione di una parabola per tre punti?`, retro: R`Si sostituiscono le coordinate dei tre punti in $y=ax^2+bx+c$ e si risolve il sistema nelle incognite $a$, $b$, $c$.` },
    { id: 'fc-20', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Come si trova l'equazione di una parabola dati vertice e un punto?`, retro: R`Si scrive $y = a(x-x_V)^2 + y_V$ e si sostituisce il punto per trovare $a$.` },
    { id: 'fc-21', sezione: 'segmento-parabolico-problemi', tipo: 'formula', fronte: R`Formula di Archimede per il segmento parabolico`, retro: R`$A = \dfrac{2}{3} \cdot b \cdot h$, dove $h$ è la distanza massima fra la corda e l'arco.` },
    { id: 'fc-22', sezione: 'segmento-parabolico-problemi', tipo: 'definizione', fronte: R`Che cos'è un segmento parabolico?`, retro: R`La regione di piano compresa fra un arco di parabola e la corda (retta secante) che lo taglia.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Trova le coordinate del vertice della parabola $y=2x^2-8x+3$ (scrivi la risposta come x; y).`, suggerimenti: [R`Calcola prima $x_V=-\dfrac{b}{2a}$.`, R`Poi sostituisci $x_V$ nell'equazione, oppure usa $y_V=c-\dfrac{b^2}{4a}$.`], risposta: { tipo: 'numeri', valori: [2, -5] }, soluzione: [R`$a=2$, $b=-8$, $c=3$.`, R`$x_V=-\dfrac{-8}{4}=2$.`, R`$y_V=3-\dfrac{64}{8}=3-8=-5$. Vertice $V(2,-5)$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Trova il vertice della parabola $y=-x^2+6x-5$ e stabilisci se è un massimo o un minimo (scrivi la risposta come x; y).`, suggerimenti: [R`Il segno di $a$ ti dice subito se il vertice è un massimo o un minimo.`, R`$x_V=-\dfrac{b}{2a}$ con $a=-1$, $b=6$.`], risposta: { tipo: 'numeri', valori: [3, 4] }, soluzione: [R`$a=-1<0$: la concavità è verso il basso, quindi il vertice è un massimo.`, R`$x_V=-\dfrac{6}{-2}=3$.`, R`$y_V=-5-\dfrac{36}{-4}=-5+9=4$. Vertice $V(3,4)$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Trova le ascisse dei punti in cui la parabola $y=x^2-x-6$ interseca l'asse $x$.`, suggerimenti: [R`Poni $y=0$ e risolvi l'equazione di secondo grado.`, R`Cerca due numeri con somma $1$ e prodotto $-6$.`], risposta: { tipo: 'numeri', valori: [3, -2] }, soluzione: [R`$x^2-x-6=0$: $\Delta=1+24=25$.`, R`$x_{1,2}=\dfrac{1\pm5}{2}$: $x_1=3$, $x_2=-2$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Determina le coordinate del fuoco della parabola $y=\dfrac{x^2}{12}$ (scrivi la risposta come x; y).`, suggerimenti: [R`È già nella forma canonica $y=\dfrac{x^2}{4p}$: confronta i denominatori.`, R`Il fuoco della forma canonica è $(0,p)$.`], risposta: { tipo: 'numeri', valori: [0, 3] }, soluzione: [R`$4p=12$, quindi $p=3$.`, R`Fuoco $F(0,3)$, direttrice $y=-3$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Per quali valori di $q$ la retta $y=2x+q$ è tangente alla parabola $y=x^2-4x+3$?`, suggerimenti: [R`Sostituisci la retta nell'equazione della parabola e imponi discriminante nullo.`, R`Dovresti arrivare a $\dfrac{\Delta}{4}=6+q$.`], risposta: { tipo: 'numero', valore: -6 }, soluzione: [R`$x^2-4x+3=2x+q \Rightarrow x^2-6x+(3-q)=0$.`, R`$\dfrac{\Delta}{4}=9-(3-q)=6+q$. Ponendo $6+q=0$ si trova $q=-6$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi l'equazione della parabola con vertice $V(1,-4)$ e passante per il punto $P(3,0)$.`, suggerimenti: [R`Parti da $y=a(x-1)^2-4$.`, R`Sostituisci le coordinate di $P$ per trovare $a$.`], risposta: { tipo: 'testo', accettate: ['y=x^2-2x-3', 'y=x²-2x-3', 'y = x^2 - 2x - 3', 'y = x² − 2x − 3'] }, soluzione: [R`$y=a(x-1)^2-4$. Sostituendo $P(3,0)$: $0=a(3-1)^2-4=4a-4$, quindi $a=1$.`, R`$y=(x-1)^2-4=x^2-2x+1-4=x^2-2x-3$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Scrivi l'equazione della parabola con asse orizzontale, di vertice $(2,1)$ e passante per il punto $(6,3)$.`, suggerimenti: [R`Parti da $x=a(y-1)^2+2$.`, R`Sostituisci il punto per trovare $a$.`], risposta: { tipo: 'testo', accettate: ['x=y^2-2y+3', 'x=y²-2y+3', 'x = y^2 - 2y + 3', 'x = y² − 2y + 3'] }, soluzione: [R`$x=a(y-1)^2+2$. Sostituendo $(6,3)$: $6=a(3-1)^2+2=4a+2$, quindi $a=1$.`, R`$x=(y-1)^2+2=y^2-2y+1+2=y^2-2y+3$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Per quale valore di $k$ la parabola $y=x^2-2x+k$ è tangente all'asse $x$?`, suggerimenti: [R`Tangente all'asse $x$ significa $\Delta=0$.`, R`$\dfrac{\Delta}{4}=1-k$.`], risposta: { tipo: 'numero', valore: 1 }, soluzione: [R`$\dfrac{\Delta}{4}=(-1)^2-k=1-k$.`, R`$1-k=0 \Rightarrow k=1$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Un tunnel stradale ha sezione a forma di arco parabolico: alla base è largo $6\ \text{m}$ e al centro è alto $4{,}5\ \text{m}$. Usando la formula di Archimede, calcola l'area della sezione del tunnel (in metri quadrati).`, suggerimenti: [R`Identifica base $b$ e altezza $h$ del segmento parabolico.`, R`Applica $A=\dfrac23\,b\cdot h$.`], risposta: { tipo: 'numero', valore: 18, tolleranza: 0.1 }, soluzione: [R`$b=6\ \text{m}$, $h=4{,}5\ \text{m}$.`, R`$A=\dfrac23\cdot 6\cdot 4{,}5=\dfrac23\cdot 27=18\ \text{m}^2$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Determina i coefficienti angolari delle rette tangenti alla parabola $y=x^2$ condotte dal punto $P(0,-1)$.`, suggerimenti: [R`Scrivi il fascio di rette per $P$: $y=mx-1$.`, R`Sostituisci nella parabola e imponi discriminante nullo nell'incognita $m$.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`$x^2=mx-1 \Rightarrow x^2-mx+1=0$.`, R`$\Delta=m^2-4$. Ponendo $\Delta=0$: $m^2=4$, cioè $m=2$ oppure $m=-2$.`, R`Le tangenti sono $y=2x-1$ (punto di tangenza $(1,1)$) e $y=-2x-1$ (punto di tangenza $(-1,1)$).`] },
    { id: 'es-11', difficolta: 3, testo: R`Una parabola con asse verticale passa per i punti $A(-2,0)$, $B(4,0)$ e $C(0,-16)$. Determina i suoi coefficienti $a$, $b$, $c$ (nell'ordine).`, suggerimenti: [R`$A$ e $B$ sono i due zeri: usa $y=a(x-x_1)(x-x_2)$.`, R`Sostituisci $C$ per trovare $a$, poi sviluppa il prodotto.`], risposta: { tipo: 'numeri', valori: [2, -4, -16] }, soluzione: [R`$y=a(x+2)(x-4)$. Sostituendo $C(0,-16)$: $-16=a\cdot2\cdot(-4)=-8a$, quindi $a=2$.`, R`$y=2(x+2)(x-4)=2(x^2-2x-8)=2x^2-4x-16$: $a=2$, $b=-4$, $c=-16$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un proiettile lanciato da terra descrive una traiettoria parabolica con gittata $8\ \text{m}$; l'altezza massima, $5\ \text{m}$, viene raggiunta a metà della gittata. Scrivi l'altezza $y$ raggiunta a $x=2\ \text{m}$ dal lancio (arrotonda a due cifre decimali).`, suggerimenti: [R`I punti $(0,0)$ e $(8,0)$ sono gli zeri della parabola: scrivi $y=ax(x-8)$.`, R`Usa il vertice $(4,5)$ per trovare $a$, poi valuta $y$ in $x=2$.`], risposta: { tipo: 'numero', valore: 3.75, tolleranza: 0.05 }, soluzione: [R`$y=ax(x-8)$; nel vertice $x=4$: $5=a\cdot4\cdot(-4)=-16a$, quindi $a=-\dfrac{5}{16}$.`, R`$y=-\dfrac{5}{16}x(x-8)$. Per $x=2$: $y=-\dfrac{5}{16}\cdot2\cdot(-6)=\dfrac{60}{16}=3{,}75\ \text{m}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale definizione di parabola è corretta?`, opzioni: [R`L'insieme dei punti equidistanti da un punto fisso (il fuoco) e da una retta fissa (la direttrice).`, R`L'insieme dei punti la cui differenza di distanza da due punti fissi è costante.`, R`L'insieme dei punti a distanza costante da un punto fisso (il centro).`, R`L'insieme dei punti equidistanti da due punti fissi (i fuochi).`], corretta: 0, spiegazione: R`È la definizione della parabola come luogo geometrico. La seconda descrive l'iperbole, la terza la circonferenza, la quarta l'asse di un segmento.` },
    { id: 'q-02', domanda: R`Nell'equazione $y=ax^2+bx+c$, il segno del coefficiente $a$ stabilisce…`, opzioni: [R`l'ordinata del vertice`, R`la concavità della parabola`, R`l'apertura della parabola`, R`l'ascissa del vertice`], corretta: 1, spiegazione: R`$a>0$ dà concavità verso l'alto, $a<0$ verso il basso. L'apertura dipende dal valore assoluto di $a$, non dal segno; vertice e ascissa dipendono anche da $b$ e $c$.` },
    { id: 'q-03', domanda: R`Il coefficiente $c$ nell'equazione $y=ax^2+bx+c$ rappresenta…`, opzioni: [R`l'ascissa del vertice`, R`l'ordinata del fuoco`, R`l'ordinata del punto in cui la parabola incontra l'asse $y$`, R`l'ascissa dei punti in cui la parabola incontra l'asse $x$`], corretta: 2, spiegazione: R`Per $x=0$ si ha $y=c$: è l'intercetta con l'asse $y$. Le altre grandezze dipendono anche da $a$ e $b$.` },
    { id: 'q-04', domanda: R`L'ascissa del vertice della parabola $y=ax^2+bx+c$ è…`, opzioni: [R`$\dfrac{b}{2a}$`, R`$-\dfrac{c}{2a}$`, R`$\dfrac{-b\pm\sqrt\Delta}{2a}$`, R`$-\dfrac{b}{2a}$`], corretta: 3, spiegazione: R`È la formula del vertice. L'opzione con $\dfrac{-b\pm\sqrt\Delta}{2a}$ è la formula risolutiva: dà le radici, non il vertice.` },
    { id: 'q-05', domanda: R`Se $\Delta=b^2-4ac=0$, la parabola $y=ax^2+bx+c$…`, opzioni: [R`è tangente all'asse $x$ nel vertice`, R`non incontra l'asse $x$`, R`incontra l'asse $x$ in due punti distinti`, R`ha il vertice sull'asse $y$`], corretta: 0, spiegazione: R`Con $\Delta=0$ l'equazione $ax^2+bx+c=0$ ha una soluzione doppia, che coincide con l'ascissa del vertice: la parabola tocca l'asse $x$ proprio lì.` },
    { id: 'q-06', domanda: R`Nella parabola canonica $y=\dfrac{x^2}{4p}$, con fuoco $(0,p)$ e vertice nell'origine, la distanza fra vertice e fuoco è…`, opzioni: [R`$4p$`, R`$|p|$`, R`$p^2$`, R`$2p$`], corretta: 1, spiegazione: R`Il fuoco è $(0,p)$ e il vertice è l'origine: la distanza fra i due è $|p|$, la stessa che separa il vertice dalla direttrice $y=-p$.` },
    { id: 'q-07', domanda: R`Una retta è tangente a una parabola quando il sistema fra le loro equazioni ha…`, opzioni: [R`discriminante negativo`, R`due soluzioni distinte`, R`discriminante nullo`, R`infinite soluzioni`], corretta: 2, spiegazione: R`Discriminante nullo significa una soluzione doppia: un solo punto di intersezione, cioè tangenza.` },
    { id: 'q-08', domanda: R`Una retta è esterna a una parabola quando il sistema fra le loro equazioni…`, opzioni: [R`ha discriminante nullo`, R`ha due soluzioni reali`, R`ha come soluzione il vertice`, R`non ha soluzioni reali`], corretta: 3, spiegazione: R`Nessuna soluzione reale (discriminante negativo) significa che la retta non incontra la parabola in nessun punto: è esterna.` },
    { id: 'q-09', domanda: R`Da un punto interno alla concavità di una parabola, quante rette tangenti alla parabola si possono condurre?`, opzioni: [R`nessuna`, R`una`, R`due`, R`infinite`], corretta: 0, spiegazione: R`L'equazione che dà il coefficiente angolare delle tangenti non ha soluzioni reali quando il punto è interno alla concavità: nessuna tangente passa per un punto del genere.` },
    { id: 'q-10', domanda: R`L'equazione $x=ay^2+by+c$ (con $a\ne0$) rappresenta…`, opzioni: [R`una parabola con asse parallelo all'asse $y$`, R`una parabola con asse parallelo all'asse $x$`, R`una retta`, R`una circonferenza`], corretta: 1, spiegazione: R`Scambiando i ruoli di $x$ e $y$ rispetto alla forma abituale, l'asse di simmetria diventa orizzontale, parallelo all'asse $x$.` },
    { id: 'q-11', domanda: R`Perché $x=ay^2+by+c$ non rappresenta $y$ come funzione di $x$?`, opzioni: [R`perché $a$ non può essere negativo`, R`perché manca il termine noto`, R`perché a certi valori di $x$ corrispondono due valori di $y$`, R`perché non ha vertice`], corretta: 2, spiegazione: R`Una parabola con asse orizzontale non supera il test della retta verticale: per alcuni valori di $x$ esistono due punti della curva con ordinate diverse.` },
    { id: 'q-12', domanda: R`La formula di Archimede per l'area di un segmento parabolico è…`, opzioni: [R`$A=b\cdot h$`, R`$A=\dfrac12\,b\cdot h$`, R`$A=\dfrac43\,b\cdot h$`, R`$A=\dfrac23\,b\cdot h$`], corretta: 3, spiegazione: R`L'area è i due terzi del rettangolo di base $b$ (la corda) e altezza $h$ (la distanza massima fra corda e arco); equivalentemente, è $\dfrac43$ dell'area del triangolo inscritto di base $b$ e altezza $h$.` },
    { id: 'q-13', domanda: R`Quanti punti, con ascisse tutte diverse e non allineati, servono in generale per determinare l'equazione $y=ax^2+bx+c$ di una parabola?`, opzioni: [R`tre`, R`due`, R`quattro`, R`cinque`], corretta: 0, spiegazione: R`Le incognite sono tre ($a$, $b$, $c$): servono tre condizioni indipendenti, cioè tre punti con ascisse diverse fra loro e non allineati.` },
    { id: 'q-14', domanda: R`La parabola $y=-3x^2+x-5$ ha concavità…`, opzioni: [R`verso destra`, R`verso il basso`, R`verso l'alto`, R`verso sinistra`], corretta: 1, spiegazione: R`Il coefficiente di $x^2$ è $a=-3<0$: la concavità è verso il basso. "Destra" e "sinistra" riguardano solo le parabole con asse orizzontale.` },
    { id: 'q-15', domanda: R`Nella parabola con asse orizzontale $x=ay^2+by+c$, l'ordinata del vertice è…`, opzioni: [R`$c-\dfrac{b^2}{4a}$`, R`$\dfrac{b}{2a}$`, R`$-\dfrac{b}{2a}$`, R`$-\dfrac{b}{a}$`], corretta: 2, spiegazione: R`Scambiando $x$ e $y$ rispetto al caso verticale, l'ordinata del vertice è $-\dfrac{b}{2a}$; l'espressione $c-\dfrac{b^2}{4a}$ è invece l'ascissa del vertice in questo caso.` },
    { id: 'q-16', domanda: R`Ogni punto di una parabola è equidistante da…`, opzioni: [R`fuoco e vertice`, R`due fuochi`, R`vertice e direttrice`, R`fuoco e direttrice`], corretta: 3, spiegazione: R`È la definizione stessa di parabola come luogo geometrico. Il vertice è solo il punto della parabola più vicino a entrambi.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Nelle formule di vertice, fuoco e direttrice il segno conta: $-\dfrac{b}{2a}$ non è $\dfrac{b}{2a}$, e $\dfrac{1-\Delta}{4a}$ (il fuoco) non è $-\dfrac{1+\Delta}{4a}$ (la direttrice).` },
    { tipo: 'metodo', testo: R`Per stabilire se una retta è secante, tangente o esterna a una parabola, sostituiscila nell'equazione e guarda il segno del discriminante dell'equazione di secondo grado che ottieni: non serve altro.` },
    { tipo: 'trucco', testo: R`Il termine noto $c$ si legge a colpo d'occhio: è sempre l'ordinata del punto in cui la parabola incontra l'asse $y$.` },
    { tipo: 'errore', testo: R`$x=ay^2+by+c$ non è il grafico di una funzione $y=f(x)$: prima di applicare le formule del vertice, controlla sempre quale sia la variabile al quadrato.` },
    { tipo: 'trucco', testo: R`La distanza fra vertice e fuoco (e fra vertice e direttrice) vale sempre $\left|\dfrac{1}{4a}\right|$: se $|a|$ è grande sono vicinissimi al vertice, se $|a|$ è piccolo sono lontani.` },
    { tipo: 'metodo', testo: R`Per le tangenti condotte da un punto esterno, scrivi il fascio di rette per quel punto, sostituisci nell'equazione della parabola e imponi che il discriminante sia nullo nell'incognita $m$, non in $x$.` },
    { tipo: 'errore', testo: R`La formula di Archimede vale solo per un segmento parabolico vero: un arco di parabola tagliato da una corda rettilinea. Non si applica a una regione qualsiasi delimitata da due curve.` },
    { tipo: 'trucco', testo: R`Nel metodo dei tre punti, se uno dei punti dati ha ascissa $0$, hai già trovato $c$ senza calcoli: è la sua ordinata.` }
  ],

  aneddoti: [
    { matematico: 'Menecmo', anni: '380–320 a.C. circa', titolo: 'Duplicare il cubo con due parabole', testo: R`Nel IV secolo a.C. i geometri greci cercavano di risolvere un problema classico: costruire, con riga e compasso, il lato di un cubo con volume doppio di un cubo dato (il celebre problema di Delo). Menecmo, allievo di Eudosso, capì che il problema si riduceva a trovare due medi proporzionali fra due segmenti, e che questi si potevano ottenere come intersezione di due curve nuove, ottenute tagliando un cono con un piano: quelle che oggi chiamiamo parabola e iperbole. Le opere originali di Menecmo sono andate perdute; la notizia arriva attraverso autori successivi, come Eratostene e il commentatore Proclo, alcuni secoli dopo.`, legame: R`È la prima comparsa storica della parabola, non ancora chiamata così, come intersezione di un piano e un cono.` },
    { matematico: 'Apollonio di Perga', anni: '262–190 a.C. circa', titolo: 'I nomi delle coniche', testo: R`Apollonio, chiamato dagli antichi "il Grande Geometra", raccolse e superò i risultati dei suoi predecessori in un trattato monumentale, le *Coniche*, otto libri di cui sette sono arrivati fino a noi (in parte solo in traduzione araba). Fu lui a introdurre i nomi che usiamo ancora oggi: ellisse, parabola e iperbole, scelti per analogia con termini geometrici che indicavano un'uguaglianza, un difetto o un eccesso in certe costruzioni. Prima di Apollonio le tre curve si ottenevano tagliando tre tipi diversi di cono; lui dimostrò che tutte e tre si possono ricavare da un unico cono, cambiando solo l'inclinazione del piano di taglio.`, legame: R`Il nome stesso "parabola" viene da qui: nasce come termine tecnico per una delle tre sezioni coniche.` },
    { matematico: 'Archimede', anni: '287–212 a.C. circa', titolo: 'La quadratura della parabola', testo: R`Archimede scrisse un intero trattato, *La quadratura della parabola*, per dimostrare che l'area di un segmento parabolico è $\dfrac43$ dell'area del triangolo inscritto con la stessa base e il vertice nel punto dell'arco più lontano dalla corda. Lo dimostrò in due modi: uno rigoroso, per doppia riduzione all'assurdo con il metodo di esaustione; e uno, scoperto solo nel 1906 in un manoscritto ritrovato a Istanbul (il Palinsesto di Archimede), in cui usava un bilanciamento meccanico immaginario, come se pesasse le fette della parabola su una leva, per intuire il risultato prima di dimostrarlo in modo formale. Fu uno dei primi calcoli d'area di una figura curvilinea della storia, quasi duemila anni prima del calcolo integrale.`, legame: R`Da quel rapporto $\dfrac43$ rispetto al triangolo viene direttamente la formula $A=\dfrac23\,b\cdot h$ per il segmento parabolico.` },
    { matematico: 'Diocle', anni: '240–180 a.C. circa', titolo: 'Gli specchi ustori e il fuoco della parabola', testo: R`Diocle, matematico greco poco conosciuto rispetto ad Apollonio o Archimede, scrisse un trattato dal titolo *Sugli specchi ustori*, dedicato al problema di costruire uno specchio capace di concentrare i raggi del Sole in un solo punto per accendere un fuoco. Diocle dimostrò che uno specchio a forma di paraboloide (la superficie generata ruotando una parabola attorno al suo asse) riflette tutti i raggi paralleli all'asse verso un unico punto: proprio il fuoco della parabola, che da questa proprietà prende il nome. Il testo di Diocle è arrivato fino a noi solo attraverso una traduzione araba, ritrovata e studiata a fondo solo nel Novecento.`, legame: R`Il nome stesso "fuoco" nasce da questa proprietà: è il punto dove i raggi paralleli all'asse, dopo la riflessione, si concentrano.` },
    { matematico: 'Galileo Galilei', anni: '1564–1642', titolo: 'La traiettoria dei proiettili è una parabola', testo: R`Nel 1638, ormai anziano e cieco, Galileo pubblicò a Leida i *Discorsi e dimostrazioni matematiche intorno a due nuove scienze*. Nella Giornata Quarta dimostrò che il moto di un proiettile lanciato in aria, trascurando la resistenza dell'aria, si può scomporre in un moto orizzontale a velocità costante e in una caduta verticale uniformemente accelerata, e che componendo i due la traiettoria risultante è esattamente una parabola. Era la prima descrizione matematica corretta della balistica, in aperto contrasto con la fisica aristotelica ancora insegnata nelle università, che immaginava le traiettorie dei proiettili come archi di cerchio raccordati a rette.`, legame: R`È l'esempio più citato di parabola fuori dalla matematica pura: ogni oggetto lanciato, in assenza di attrito, disegna un arco di parabola.` }
  ]
});
})();
