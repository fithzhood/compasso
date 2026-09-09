(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'trigonometria',
  titolo: 'Trigonometria',

  introduzione: R`La trigonometria (dal greco «misura dei triangoli») collega gli angoli di un triangolo alle lunghezze dei suoi lati, attraverso seno, coseno e tangente. È lo strumento che permette di misurare ciò che non si può raggiungere con un metro: l'altezza di una torre senza salirci sopra, la distanza di una nave dalla costa, l'altitudine di una montagna vista da lontano. Ogni volta che un GPS calcola la posizione di un telefono incrociando le distanze da più satelliti, sta risolvendo triangoli.

Le formule di questa scheda si dividono in due famiglie: quelle per il **triangolo rettangolo**, che derivano direttamente dalle definizioni di seno, coseno e tangente, e quelle per il **triangolo qualunque** (teorema dei seni, teorema del coseno), che li generalizzano a triangoli senza angoli retti. Le seconde non sono formule nuove da imparare a memoria in modo slegato: nascono dalle prime con qualche passaggio in più, ed è per questo che qui si vede anche *da dove vengono*.

Per seguire bene serve conoscere seno, coseno e tangente di un angolo (definiti sulla circonferenza goniometrica) e i fatti principali della geometria euclidea sui triangoli: somma degli angoli, teorema di Pitagora, criteri di congruenza.`,

  sezioni: [
    { id: 'teoremi-triangoli-rettangoli', titolo: 'I teoremi sui triangoli rettangoli', testo: R`In un triangolo rettangolo con ipotenusa $c$ e cateti $a$, $b$, ogni angolo acuto ha, rispetto a sé, un cateto **opposto** (quello che non lo tocca) e un cateto **adiacente** (quello che lo tocca, escludendo l'ipotenusa). Chiamando $\alpha$ l'angolo opposto al cateto $a$ (e quindi adiacente a $b$), le definizioni di seno, coseno e tangente applicate a questo triangolo danno tre relazioni fondamentali.

>* **Primo teorema:** ogni cateto è uguale al prodotto dell'ipotenusa per il seno dell'angolo opposto, oppure per il coseno dell'angolo adiacente: $$a = c \sin\alpha \qquad\qquad b = c \cos\alpha$$ **Secondo teorema:** ogni cateto è uguale al prodotto dell'altro cateto per la tangente dell'angolo opposto: $$a = b \tan\alpha$$

Le tre formule sono coerenti fra loro: dividendo membro a membro $a = c\sin\alpha$ per $b = c\cos\alpha$ si ottiene $\dfrac{a}{b} = \tan\alpha$, che è proprio il secondo teorema. Non sono quindi tre fatti scollegati da mandare a memoria separatamente, ma un'unica idea vista da tre angolazioni.

Esempio: ipotenusa $c = 10\ \text{cm}$, angolo $\alpha = 30^\circ$. Allora $a = 10 \cdot \sin 30^\circ = 10 \cdot 0,5 = 5\ \text{cm}$ e $b = 10 \cdot \cos 30^\circ = 10 \cdot 0,866\ldots \approx 8,66\ \text{cm}$.

[[grafico:rettangoloAlpha]]

>! "Opposto" e "adiacente" dipendono da **quale** angolo si sta usando: lo stesso cateto $a$ è opposto ad $\alpha$ ma adiacente all'altro angolo acuto $\beta = 90^\circ - \alpha$. Prima di applicare una formula, bisogna sempre chiedersi rispetto a quale angolo il cateto in questione è opposto o adiacente.` },

    { id: 'risoluzione-triangoli-rettangoli', titolo: 'Risolvere un triangolo rettangolo', testo: R`«Risolvere» un triangolo vuol dire trovare tutti i suoi elementi (lati e angoli) a partire da alcuni di essi. In un triangolo rettangolo l'angolo retto è già noto, quindi bastano **due dati indipendenti**, oltre all'angolo retto, per determinarlo completamente. I casi possibili si riducono a quattro.

>* **I quattro casi.** 1) Ipotenusa e un angolo acuto: gli altri elementi si trovano subito con il primo teorema. 2) Un cateto e un angolo acuto: si usa il primo o il secondo teorema, a seconda di quale cateto e quale angolo sono noti. 3) I due cateti: l'ipotenusa si trova con Pitagora, un angolo con $\tan\alpha = a/b$ (e l'inversa, l'**arcotangente**). 4) L'ipotenusa e un cateto: l'altro cateto con Pitagora, un angolo con $\sin\alpha = a/c$.

In ogni caso, una volta trovato un angolo acuto, l'altro si ottiene per differenza da $90^\circ$: $\alpha + \beta = 90^\circ$, perché l'angolo retto vale già $90^\circ$ e la somma degli angoli interni di un triangolo è $180^\circ$.

Esempio del caso 3: cateti $a = 3\ \text{cm}$ e $b = 4\ \text{cm}$. Ipotenusa $c = \sqrt{9+16} = 5\ \text{cm}$; $\tan\alpha = 3/4 = 0,75$, quindi $\alpha = \arctan(0,75) \approx 36,87^\circ$ e $\beta \approx 53,13^\circ$.

>! Con la calcolatrice, $\arcsin$, $\arccos$ e $\arctan$ restituiscono sempre un angolo tra $0^\circ$ e $90^\circ$ se il dato è positivo: per un angolo acuto di un triangolo rettangolo va benissimo, ma non è la stessa cosa che succede nei triangoli qualunque (dove un angolo può essere ottuso).` },

    { id: 'applicazioni', titolo: 'Applicazioni: altezze, angoli di elevazione, pendenze', testo: R`Il primo e il secondo teorema diventano utili quando un problema reale nasconde un triangolo rettangolo.

**Altezza di un oggetto lontano.** Da un punto a distanza $d$ dalla base di una torre, se si misura l'angolo $\alpha$ sotto cui si vede la cima (rispetto all'orizzontale), l'altezza è $h = d \tan\alpha$: la torre e la sua base formano il cateto verticale opposto ad $\alpha$, la distanza $d$ è il cateto adiacente. Con $d = 40\ \text{m}$ e $\alpha = 35^\circ$, $h \approx 40 \cdot 0,700 \approx 28,0\ \text{m}$ (trascurando l'altezza degli occhi dell'osservatore, che andrebbe sommata per un calcolo più preciso).

>* **Angolo di elevazione:** l'angolo, misurato dall'orizzontale verso l'alto, sotto cui un osservatore vede un oggetto più in alto di lui. **Angolo di depressione:** lo stesso, ma verso il basso, per un oggetto più in basso (per esempio una nave vista da una scogliera). Se le due linee orizzontali sono parallele, l'angolo di depressione da $A$ a $B$ è congruente all'angolo di elevazione da $B$ ad $A$ (sono angoli alterni interni).

**Pendenza di una strada.** I cartelli stradali indicano la pendenza in percentuale: una pendenza del $10\%$ significa che, avanzando di $100\ \text{m}$ in orizzontale, si sale di $10\ \text{m}$, cioè $\tan\alpha = 0,10$. Non è l'angolo stesso: una pendenza del $100\%$ corrisponde a $\alpha = 45^\circ$, non a una parete verticale.

>! Nel calcolo dell'altezza di una torre, l'errore più comune è scambiare $\tan\alpha$ con $\sin\alpha$: la distanza orizzontale $d$ è nota, quindi va usato il cateto adiacente, cioè la tangente, non l'ipotenusa (che qui non è nemmeno data).` },

    { id: 'area-triangolo', titolo: "Area di un triangolo con due lati e l'angolo compreso", testo: R`Dato un triangolo di cui si conoscono due lati $a$, $b$ e l'angolo $\gamma$ compreso fra essi, l'area si calcola senza conoscere l'altezza in modo diretto: si ricava dall'angolo.

>* **Area con due lati e l'angolo compreso:** $$\text{Area} = \frac{1}{2}\,a\,b\,\sin\gamma$$

La formula viene dalla definizione di seno: se si prende $a$ come base, l'altezza relativa è $h = b \sin\gamma$ (il cateto opposto a $\gamma$ nel triangolo rettangolo formato dall'altezza), quindi $\text{Area} = \dfrac{1}{2} \cdot a \cdot h = \dfrac{1}{2} a b \sin\gamma$. Funziona anche se $\gamma$ è ottuso, perché il seno di un angolo ottuso è comunque positivo.

Esempio: $a = 8\ \text{cm}$, $b = 5\ \text{cm}$, $\gamma = 30^\circ$. Area $= \dfrac{1}{2} \cdot 8 \cdot 5 \cdot \sin 30^\circ = 20 \cdot 0,5 = 10\ \text{cm}^2$.

Trascinando il vertice nel grafico si vede che l'area dipende solo dalla base e dall'altezza, cioè in fondo sempre dalla stessa formula di sempre: qui è solo scritta usando l'angolo invece dell'altezza.

[[grafico:triangoloArea]]

>! L'angolo nella formula deve essere quello **compreso** fra i due lati usati, non uno qualunque degli altri due angoli: con $a$, $b$ e l'angolo opposto a uno di essi la formula $\frac{1}{2}ab\sin\gamma$ non è valida così com'è.` },

    { id: 'teorema-della-corda', titolo: 'Il teorema della corda', testo: R`In una circonferenza di raggio $R$, una corda $AB$ e un angolo alla circonferenza $\gamma$ che la sottende (con vertice su un punto qualunque dell'arco opposto) sono legati da una relazione semplice.

>* **Teorema della corda:** $$AB = 2R \sin\gamma$$

La dimostrazione usa un caso speciale: si traccia il diametro $AA'$ passante per $A$. Per il teorema di Talete, l'angolo $A\hat{B}A'$ è retto, perché è inscritto in una semicirconferenza. Nel triangolo rettangolo $ABA'$, l'ipotenusa è il diametro $2R$ e l'angolo in $A'$ è congruente a $\gamma$ (angoli alla circonferenza che insistono sullo stesso arco $AB$ sono congruenti). Per il primo teorema sui triangoli rettangoli, il cateto $AB$, opposto a quell'angolo, vale $AB = 2R \sin\gamma$. Poiché il ragionamento funziona per *qualunque* punto scelto sull'arco (l'angolo $\gamma$ resta lo stesso), la formula vale in generale, non solo per il triangolo con il diametro.

[[grafico:cordaCirconferenza]]

Esempio: in una circonferenza di raggio $7,5\ \text{cm}$, una corda lunga $10\ \text{cm}$ sottende un angolo alla circonferenza $\gamma$ con $\sin\gamma = \dfrac{10}{2 \cdot 7,5} = 0,\overline{6}$, quindi $\gamma \approx 41,81^\circ$ (l'angolo acuto; l'angolo alla circonferenza dalla parte opposta è il suo supplementare).

>! $2R$ è il **diametro**, non il raggio: dimenticare il $2$ è l'errore più comune in questa formula.` },

    { id: 'teorema-dei-seni', titolo: 'Il teorema dei seni e il caso ambiguo', testo: R`Il teorema della corda si applica a un triangolo qualunque inscrivendolo nella sua **circonferenza circoscritta**, di raggio $R$: ogni lato è una corda che sottende, come angolo alla circonferenza, l'angolo opposto del triangolo. Quindi $a = 2R\sin\alpha$, $b = 2R\sin\beta$, $c = 2R\sin\gamma$, da cui:

>* **Teorema dei seni:** $$\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R$$

Serve quando si conoscono due angoli e un lato, oppure due lati e un angolo non compreso fra essi. Proprio quest'ultimo caso nasconde un'insidia, il **caso ambiguo**: conoscendo $a$, $b$ e l'angolo $\alpha$ opposto ad $a$ (non compreso fra i due lati), l'equazione $\sin\beta = \dfrac{b\sin\alpha}{a}$ può avere **due** soluzioni valide per $\beta$ (un angolo acuto e il suo supplementare ottuso), una sola, o nessuna: dipende dal confronto fra $a$ e $b\sin\alpha$.

>* Con $\alpha$ acuto: se $a < b\sin\alpha$ nessun triangolo esiste; se $a = b\sin\alpha$ ne esiste uno solo (rettangolo in $\beta$); se $b\sin\alpha < a < b$ ne esistono **due**; se $a \ge b$ ne esiste uno solo.

Esempio: $a = 5$, $b = 8$, $\alpha = 30^\circ$. Da $\sin\beta = \dfrac{8 \cdot 0,5}{5} = 0,8$ si trova $\beta \approx 53,13^\circ$ oppure $\beta \approx 126,87^\circ$: poiché $b\sin\alpha = 4 < 5 < 8$, entrambe sono accettabili e danno due triangoli diversi, con $\gamma$ e $c$ diversi.

[[grafico:casoAmbiguo]]

>! Quando si trova $\beta$ con l'arcoseno, la calcolatrice restituisce solo la soluzione acuta: bisogna controllare *a mano* se esiste anche la soluzione ottusa $180^\circ - \beta$, verificando che $\alpha + (180^\circ - \beta)$ resti minore di $180^\circ$.` },

    { id: 'teorema-del-coseno', titolo: 'Il teorema del coseno (di Carnot)', testo: R`Il teorema di Pitagora, $c^2 = a^2 + b^2$, vale solo se l'angolo fra $a$ e $b$ è retto. Il teorema del coseno lo generalizza a un angolo $\gamma$ qualunque, compreso fra i lati $a$ e $b$, opposto al lato $c$.

[[animazione:pitagora]]

>* **Teorema del coseno (di Carnot):** $$c^2 = a^2 + b^2 - 2ab\cos\gamma$$

Quando $\gamma = 90^\circ$, $\cos\gamma = 0$ e il termine correttivo sparisce: si ritrova esattamente $c^2 = a^2+b^2$. Il teorema del coseno è quindi Pitagora **corretto** per tenere conto che l'angolo non è retto: se $\gamma$ è acuto, $\cos\gamma > 0$ e il termine si sottrae ($c$ più corto che nel caso rettangolo con gli stessi cateti); se $\gamma$ è ottuso, $\cos\gamma < 0$ e il termine si somma ($c$ più lungo).

Il teorema si scrive allo stesso modo permutando le lettere: $a^2 = b^2+c^2-2bc\cos\alpha$ e $b^2 = a^2+c^2-2ac\cos\beta$. Serve per trovare il terzo lato conoscendo gli altri due e l'angolo compreso, oppure per trovare un angolo conoscendo tutti e tre i lati (risolvendo la formula rispetto al coseno).

Esempio: $a = 6\ \text{cm}$, $b = 9\ \text{cm}$, $\gamma = 70^\circ$ (angolo compreso). $c^2 = 36 + 81 - 2\cdot 6\cdot 9\cdot\cos 70^\circ \approx 117 - 108 \cdot 0,342 \approx 80,04$, quindi $c \approx 8,95\ \text{cm}$.

>! Nel teorema del coseno l'angolo dev'essere quello **compreso** fra i due lati usati nella formula (o, per trovarlo dai tre lati, quello **opposto** al lato isolato a sinistra): usare l'angolo sbagliato è l'errore più frequente in questa formula.` },

    { id: 'risoluzione-triangoli-qualunque', titolo: 'Risolvere un triangolo qualunque', testo: R`Un triangolo qualunque ha sei elementi (tre lati, tre angoli), legati dalla somma $\alpha+\beta+\gamma=180^\circ$: bastano quindi tre dati indipendenti (non tutti e tre gli angoli, che darebbero solo la forma, non le dimensioni) per determinarlo. I casi si distinguono per come sono combinati.

>* **I quattro casi.** 1) **Tre lati (LLL):** il teorema del coseno dà un angolo, poi si procede con il teorema dei seni (o di nuovo il coseno) per gli altri due. 2) **Due lati e l'angolo compreso (LAL):** il teorema del coseno dà il terzo lato, poi il teorema dei seni un angolo, il terzo per differenza. 3) **Due angoli e un lato (ALA o AAL):** il terzo angolo per differenza da $180^\circ$, poi il teorema dei seni per gli altri lati. 4) **Due lati e un angolo non compreso (LLA):** teorema dei seni, con attenzione al caso ambiguo.

Nel caso LLL conviene trovare per primo l'angolo opposto al lato **più lungo**: se quel triangolo esiste, quell'angolo è il più ampio, ed è l'unico che potrebbe essere ottuso; gli altri due, trovati dopo, sono certamente acuti e non danno ambiguità.

Esempio (caso ALA): $\alpha = 50^\circ$, $\beta = 60^\circ$, $a = 10\ \text{cm}$. Allora $\gamma = 180^\circ - 50^\circ - 60^\circ = 70^\circ$; dal teorema dei seni, $\dfrac{a}{\sin\alpha} = \dfrac{10}{\sin 50^\circ} \approx 13,05$, quindi $b \approx 13,05 \cdot \sin 60^\circ \approx 11,30\ \text{cm}$ e $c \approx 13,05 \cdot \sin 70^\circ \approx 12,27\ \text{cm}$.

>! Nel caso LLA (due lati e un angolo non compreso) il teorema del coseno non aiuta a partire subito: darebbe un'equazione di secondo grado nel lato incognito, che è proprio l'origine algebrica del caso ambiguo. Conviene sempre il teorema dei seni, controllando poi se la seconda soluzione è accettabile.` },

    { id: 'problemi-geometria', titolo: 'Problemi di geometria: quadrilateri, poligoni, triangolazione', testo: R`La trigonometria estende alla geometria del piano strumenti che vanno oltre il singolo triangolo.

**Quadrilateri.** Un quadrilatero qualunque, non necessariamente regolare, si può sempre dividere in due triangoli con una diagonale, e la sua area si trova sommando le due aree con la formula $\frac{1}{2}ab\sin\gamma$. Se si conoscono le due diagonali $d_1$, $d_2$ e l'angolo $\theta$ fra loro nel punto di intersezione, vale anche la formula diretta $\text{Area} = \frac{1}{2}\,d_1 d_2 \sin\theta$: per esempio, con $d_1=8\ \text{cm}$, $d_2=10\ \text{cm}$ e $\theta=70^\circ$, l'area è $\approx \frac{1}{2}\cdot 8\cdot 10\cdot 0,940 \approx 37,59\ \text{cm}^2$.

**Poligoni regolari.** In un poligono regolare di $n$ lati e lato $l$, il centro è il vertice di $n$ triangoli isosceli congruenti, ciascuno con angolo al centro $\dfrac{360^\circ}{n}$. L'**apotema** (l'altezza di uno di questi triangoli, distanza del centro dai lati) si trova dimezzando il triangolo isoscele in due triangoli rettangoli: $$\text{apotema} = \frac{l}{2\tan\left(\frac{180^\circ}{n}\right)}$$ e l'area del poligono è $\frac{1}{2} \cdot \text{perimetro} \cdot \text{apotema}$.

**Cenni a navigazione e triangolazione.** Per misurare una distanza troppo grande o inaccessibile da percorrere direttamente (fra due città, fra una nave e la costa), basta misurare con precisione **una** distanza di riferimento (una base) e due angoli: il resto si ricava con il teorema dei seni, senza mai percorrere la distanza cercata. Incatenando molti triangoli così, uno addossato all'altro, si può misurare l'intero arco di un continente: è il principio della **triangolazione**, usato per secoli in cartografia e in navigazione.

>! Nel calcolo dell'area di un quadrilatero con le diagonali, l'angolo $\theta$ va preso nel punto in cui le diagonali **si intersecano davvero** (dentro il quadrilatero): la formula richiede quell'angolo, non uno degli angoli interni del quadrilatero.` }
  ],

  grafici: {
    rettangoloAlpha: {
      tipo: 'piano', x: [-1.5, 6], y: [-1, 6.2], assi: false, griglia: false,
      parametri: [
        { nome: 'alpha', min: 10, max: 80, passo: 1, valore: 35, etichetta: 'α (gradi)' }
      ],
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], ['5*cos(alpha*pi/180)', 0], ['5*cos(alpha*pi/180)', '5*sin(alpha*pi/180)']], etichette: ['A', 'B', 'C'], riempi: true, colore: 1 },
        { tipo: 'segmento', da: [0, 0], a: ['5*cos(alpha*pi/180)', 0], etichetta: 'b', colore: 2 },
        { tipo: 'segmento', da: ['5*cos(alpha*pi/180)', 0], a: ['5*cos(alpha*pi/180)', '5*sin(alpha*pi/180)'], etichetta: 'a', colore: 3 },
        { tipo: 'segmento', da: [0, 0], a: ['5*cos(alpha*pi/180)', '5*sin(alpha*pi/180)'], etichetta: 'c = 5', colore: 4 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['5*cos(alpha*pi/180)', '5*sin(alpha*pi/180)'], etichetta: 'α', raggio: 0.7, colore: 1 },
        { tipo: 'angolo', vertice: ['5*cos(alpha*pi/180)', 0], da: [0, 0], a: ['5*cos(alpha*pi/180)', '5*sin(alpha*pi/180)'], etichetta: '90°', raggio: 0.5, colore: 2 },
        { tipo: 'testo', p: [-1.4, 5.9], testo: 'a = {{5*sin(alpha*pi/180)}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.4, 5.3], testo: 'b = {{5*cos(alpha*pi/180)}}', ancora: 'start' }
      ],
      didascalia: "Muovi α: l'ipotenusa c resta 5, il cateto a (opposto ad α) e il cateto b (adiacente) si aggiornano da soli."
    },
    triangoloArea: {
      tipo: 'piano', x: [-2, 8], y: [-1, 7.5], assi: false, griglia: false,
      parametri: [
        { nome: 'cx', min: -1, max: 7, passo: 0.5, valore: 3, nascosto: true },
        { nome: 'cy', min: 0.5, max: 6.5, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [6, 0], etichetta: 'B', posizione: 'basso' },
        { tipo: 'punto', p: ['cx', 'cy'], trascina: true, etichetta: 'C', posizione: 'alto', colore: 2 },
        { tipo: 'segmento', da: [0, 0], a: [6, 0], etichetta: 'c = 6' },
        { tipo: 'segmento', da: [0, 0], a: ['cx', 'cy'], etichetta: 'b', colore: 1 },
        { tipo: 'segmento', da: [6, 0], a: ['cx', 'cy'], etichetta: 'a', colore: 3 },
        { tipo: 'testo', p: [-1.8, 7.1], testo: 'area = {{3*abs(cy)}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.8, 6.4], testo: 'b = {{sqrt(cx^2+cy^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-1.8, 5.7], testo: 'a = {{sqrt((6-cx)^2+cy^2)}}', ancora: 'start' }
      ],
      didascalia: "Trascina C: la base AB resta 6. L'area è metà base per altezza, cioè 3·|cy|; a e b sono le lunghezze degli altri due lati."
    },
    cordaCirconferenza: {
      tipo: 'piano', x: [-4, 4.2], y: [-1, 3.5], assi: false, griglia: false,
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso' },
        { tipo: 'punto', p: [-3, 0], etichetta: 'A', posizione: 'sinistra' },
        { tipo: 'punto', p: [3, 0], etichetta: "A′", posizione: 'destra' },
        { tipo: 'punto', p: [-1.72, 2.46], etichetta: 'B', posizione: 'alto', colore: 2 },
        { tipo: 'segmento', da: [-3, 0], a: [3, 0], etichetta: '2R', tratteggio: true },
        { tipo: 'segmento', da: [-3, 0], a: [-1.72, 2.46], etichetta: 'corda AB', colore: 2 },
        { tipo: 'segmento', da: [3, 0], a: [-1.72, 2.46], colore: 3 },
        { tipo: 'angolo', vertice: [3, 0], da: [-3, 0], a: [-1.72, 2.46], etichetta: 'γ', raggio: 0.8, colore: 3 },
        { tipo: 'angolo', vertice: [-1.72, 2.46], da: [-3, 0], a: [3, 0], etichetta: '90°', raggio: 0.4, colore: 2 }
      ],
      didascalia: "L'angolo alla circonferenza γ insiste sulla corda AB. Il triangolo ABA′ è rettangolo in B (teorema di Talete): quindi AB = A′A · sin γ = 2R sin γ."
    },
    casoAmbiguo: {
      tipo: 'piano', x: [-1, 9], y: [-1, 5.5], assi: false, griglia: false,
      elementi: [
        { tipo: 'punto', p: [0, 0], etichetta: 'A', posizione: 'basso' },
        { tipo: 'punto', p: [7, 0], etichetta: 'C', posizione: 'basso' },
        { tipo: 'punto', p: [7.7, 4.45], etichetta: 'B₁', posizione: 'alto', colore: 1 },
        { tipo: 'punto', p: [2.8, 1.62], etichetta: 'B₂', posizione: 'alto-destra', colore: 3 },
        { tipo: 'poligono', punti: [[0, 0], [7.7, 4.45], [7, 0]], riempi: false, colore: 1 },
        { tipo: 'poligono', punti: [[0, 0], [2.8, 1.62], [7, 0]], riempi: false, colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [7, 0], a: [2.8, 1.62], etichetta: 'α', raggio: 1.1, colore: 2 },
        { tipo: 'segmento', da: [7, 0], a: [7.7, 4.45], etichetta: 'a', colore: 1 },
        { tipo: 'segmento', da: [7, 0], a: [2.8, 1.62], etichetta: 'a', colore: 3 }
      ],
      didascalia: "Con α, b = AC e a fissati (b sin α < a < b), la circonferenza di raggio a centrata in C incontra la semiretta da A in due punti: B₁ e B₂, cioè due triangoli diversi."
    }
  },

  esempi: [
    { titolo: 'Risolvere un triangolo rettangolo: ipotenusa e angolo', problema: R`Un triangolo rettangolo ha ipotenusa $c = 12\ \text{cm}$ e un angolo acuto $\alpha = 42^\circ$. Trova i due cateti e l'altro angolo.`, passi: [
      R`L'altro angolo acuto si trova subito: $\beta = 90^\circ - 42^\circ = 48^\circ$.`,
      R`Il cateto opposto ad $\alpha$: $a = c\sin\alpha = 12 \cdot \sin 42^\circ \approx 12 \cdot 0,6691 \approx 8,03\ \text{cm}$.`,
      R`Il cateto adiacente ad $\alpha$: $b = c\cos\alpha = 12 \cdot \cos 42^\circ \approx 12 \cdot 0,7431 \approx 8,92\ \text{cm}$.`,
      R`Verifica con Pitagora: $a^2+b^2 \approx 64,5 + 79,6 = 144,1 \approx 12^2$. ✓ (la piccola differenza è dovuta agli arrotondamenti)`
    ], risultato: R`$a \approx 8,03\ \text{cm}$, $\ b \approx 8,92\ \text{cm}$, $\ \beta = 48^\circ$` },

    { titolo: "Applicazione: l'altezza di una torre", problema: R`Da un punto a $40\ \text{m}$ dalla base di una torre, l'angolo di elevazione della cima è $35^\circ$. Quanto è alta la torre? (Trascura l'altezza degli occhi dell'osservatore.)`, passi: [
      R`La distanza orizzontale ($40\ \text{m}$) è il cateto adiacente all'angolo di elevazione; l'altezza $h$ cercata è il cateto opposto: si usa il secondo teorema, $h = d\tan\alpha$.`,
      R`$h = 40 \cdot \tan 35^\circ \approx 40 \cdot 0,7002 \approx 28,01\ \text{m}$.`,
      R`Il risultato è ragionevole: con un angolo minore di $45^\circ$ (dove $\tan 45^\circ = 1$), l'altezza deve venire minore della distanza orizzontale, e infatti $28 < 40$.`
    ], risultato: R`$h \approx 28,0\ \text{m}$` },

    { titolo: "Area con due lati e l'angolo compreso", problema: R`Un triangolo ha $a = 8\ \text{cm}$, $b = 5\ \text{cm}$ e l'angolo compreso $\gamma = 30^\circ$. Calcola l'area.`, passi: [
      R`Si applica direttamente la formula $\text{Area} = \frac{1}{2}ab\sin\gamma$, senza bisogno di conoscere l'altezza.`,
      R`$\text{Area} = \frac{1}{2}\cdot 8\cdot 5\cdot \sin 30^\circ = 20 \cdot 0,5 = 10\ \text{cm}^2$.`
    ], risultato: R`$\text{Area} = 10\ \text{cm}^2$` },

    { titolo: 'Teorema dei seni: due angoli e un lato', problema: R`In un triangolo, $\alpha = 50^\circ$, $\beta = 60^\circ$ e il lato $a$ (opposto ad $\alpha$) misura $10\ \text{cm}$. Trova $\gamma$, $b$ e $c$.`, passi: [
      R`Il terzo angolo si trova per differenza: $\gamma = 180^\circ - 50^\circ - 60^\circ = 70^\circ$.`,
      R`Dal teorema dei seni, il rapporto comune è $\dfrac{a}{\sin\alpha} = \dfrac{10}{\sin 50^\circ} \approx \dfrac{10}{0,766} \approx 13,05$.`,
      R`$b = 13,05 \cdot \sin\beta = 13,05\cdot\sin 60^\circ \approx 13,05\cdot 0,866 \approx 11,30\ \text{cm}$.`,
      R`$c = 13,05\cdot\sin\gamma = 13,05\cdot\sin 70^\circ \approx 13,05\cdot 0,940 \approx 12,27\ \text{cm}$.`
    ], risultato: R`$\gamma = 70^\circ$, $\ b \approx 11,30\ \text{cm}$, $\ c \approx 12,27\ \text{cm}$` },

    { titolo: 'Il caso ambiguo del teorema dei seni', problema: R`In un triangolo, $a = 5\ \text{cm}$ (opposto ad $\alpha$), $b = 8\ \text{cm}$ e $\alpha = 30^\circ$. Trova tutte le possibili misure di $c$.`, passi: [
      R`Prima si controlla se il caso è ambiguo: $b\sin\alpha = 8 \cdot 0,5 = 4$. Poiché $4 < 5 < 8$ (cioè $b\sin\alpha < a < b$), esistono **due** triangoli.`,
      R`Dal teorema dei seni, $\sin\beta = \dfrac{b\sin\alpha}{a} = \dfrac{4}{5} = 0,8$, quindi $\beta_1 \approx 53,13^\circ$ oppure $\beta_2 = 180^\circ - 53,13^\circ \approx 126,87^\circ$.`,
      R`Primo triangolo: $\gamma_1 = 180^\circ - 30^\circ - 53,13^\circ \approx 96,87^\circ$. Il rapporto comune è $\dfrac{a}{\sin\alpha} = \dfrac{5}{0,5} = 10$, quindi $c_1 = 10\cdot\sin 96,87^\circ \approx 9,93\ \text{cm}$.`,
      R`Secondo triangolo: $\gamma_2 = 180^\circ - 30^\circ - 126,87^\circ \approx 23,13^\circ$, quindi $c_2 = 10\cdot\sin 23,13^\circ \approx 3,93\ \text{cm}$.`
    ], risultato: R`$c_1 \approx 9,93\ \text{cm}$ oppure $c_2 \approx 3,93\ \text{cm}$` },

    { titolo: 'Teorema del coseno: due lati e l\'angolo compreso', problema: R`Un triangolo ha $a = 6\ \text{cm}$, $b = 9\ \text{cm}$ e l'angolo compreso $\gamma = 70^\circ$. Trova il terzo lato $c$.`, passi: [
      R`Si applica il teorema del coseno: $c^2 = a^2+b^2-2ab\cos\gamma$.`,
      R`$c^2 = 36 + 81 - 2\cdot 6\cdot 9\cdot\cos 70^\circ \approx 117 - 108\cdot 0,342 \approx 117 - 36,96 \approx 80,04$.`,
      R`$c \approx \sqrt{80,04} \approx 8,95\ \text{cm}$.`,
      R`Controllo di ragionevolezza: se $\gamma$ fosse stato $90^\circ$ (Pitagora), sarebbe stato $c = \sqrt{36+81} = \sqrt{117} \approx 10,82\ \text{cm}$; con $\gamma = 70^\circ < 90^\circ$ il lato $c$ deve venire più corto, e infatti $8,95 < 10,82$.`
    ], risultato: R`$c \approx 8,95\ \text{cm}$` }
  ],

  formulario: [
    { nome: 'Primo teorema (con il seno)', formula: R`a = c \sin\alpha`, nota: R`$a$ è il cateto opposto ad $\alpha$, $c$ l'ipotenusa.` },
    { nome: 'Primo teorema (con il coseno)', formula: R`b = c \cos\alpha`, nota: R`$b$ è il cateto adiacente ad $\alpha$.` },
    { nome: 'Secondo teorema', formula: R`a = b \tan\alpha`, nota: R`$a$ è il cateto opposto ad $\alpha$, $b$ l'altro cateto.` },
    { nome: 'Somma degli angoli di un triangolo', formula: R`\alpha + \beta + \gamma = 180^\circ` },
    { nome: "Area con due lati e l'angolo compreso", formula: R`\text{Area} = \frac{1}{2}\,a\,b\,\sin\gamma`, nota: R`$\gamma$ è l'angolo compreso fra i lati $a$ e $b$.` },
    { nome: 'Teorema della corda', formula: R`AB = 2R\sin\gamma`, nota: R`$R$ è il raggio della circonferenza, $\gamma$ l'angolo alla circonferenza che sottende $AB$.` },
    { nome: 'Teorema dei seni', formula: R`\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R`, nota: R`$R$ è il raggio della circonferenza circoscritta al triangolo.` },
    { nome: 'Teorema del coseno (di Carnot)', formula: R`c^2 = a^2 + b^2 - 2ab\cos\gamma`, nota: R`$\gamma$ è l'angolo compreso fra $a$ e $b$, opposto a $c$. Con $\gamma = 90^\circ$ si ritrova Pitagora.` },
    { nome: 'Pendenza di una strada', formula: R`p\% = 100 \cdot \tan\alpha`, nota: R`$\alpha$ è l'angolo di inclinazione rispetto all'orizzontale.` },
    { nome: 'Apotema di un poligono regolare', formula: R`\text{apotema} = \frac{l}{2\tan\left(\frac{180^\circ}{n}\right)}`, nota: R`$l$ è il lato, $n$ il numero dei lati.` },
    { nome: 'Area di un quadrilatero dalle diagonali', formula: R`\text{Area} = \frac{1}{2}\,d_1 d_2 \sin\theta`, nota: R`$d_1$, $d_2$ le diagonali, $\theta$ l'angolo fra loro nel punto di intersezione. Vale per un quadrilatero qualunque.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'teoremi-triangoli-rettangoli', tipo: 'formula', fronte: R`Primo teorema sui triangoli rettangoli`, retro: R`$a = c\sin\alpha$ (cateto = ipotenusa × seno dell'angolo opposto) oppure $b = c\cos\alpha$ (cateto = ipotenusa × coseno dell'angolo adiacente).` },
    { id: 'fc-02', sezione: 'teoremi-triangoli-rettangoli', tipo: 'formula', fronte: R`Secondo teorema sui triangoli rettangoli`, retro: R`$a = b\tan\alpha$: un cateto è uguale all'altro cateto per la tangente dell'angolo opposto al primo.` },
    { id: 'fc-03', sezione: 'teoremi-triangoli-rettangoli', tipo: 'concetto', fronte: R`Cateto opposto e cateto adiacente: da cosa dipendono?`, retro: R`Dipendono da quale angolo acuto si considera: lo stesso cateto è opposto a un angolo e adiacente all'altro.` },
    { id: 'fc-04', sezione: 'risoluzione-triangoli-rettangoli', tipo: 'procedura', fronte: R`I quattro casi per risolvere un triangolo rettangolo`, retro: R`1) Ipotenusa e un angolo. 2) Un cateto e un angolo. 3) I due cateti (Pitagora + arcotangente). 4) Ipotenusa e un cateto (Pitagora + arcoseno).` },
    { id: 'fc-05', sezione: 'risoluzione-triangoli-rettangoli', tipo: 'concetto', fronte: R`Come si trova il secondo angolo acuto, noto il primo?`, retro: R`$\beta = 90^\circ - \alpha$, perché l'angolo retto vale già $90^\circ$ e la somma degli angoli è $180^\circ$.` },
    { id: 'fc-06', sezione: 'applicazioni', tipo: 'definizione', fronte: R`Angolo di elevazione`, retro: R`L'angolo, misurato dall'orizzontale verso l'alto, sotto cui si vede un oggetto più in alto dell'osservatore.` },
    { id: 'fc-07', sezione: 'applicazioni', tipo: 'definizione', fronte: R`Angolo di depressione`, retro: R`L'angolo, misurato dall'orizzontale verso il basso, sotto cui si vede un oggetto più in basso. È congruente all'angolo di elevazione visto dall'altro punto.` },
    { id: 'fc-08', sezione: 'applicazioni', tipo: 'concetto', fronte: R`Pendenza di una strada del 10%`, retro: R`Significa $\tan\alpha = 0,10$: ogni 100 m percorsi in orizzontale si sale di 10 m. Non è l'angolo in gradi.` },
    { id: 'fc-09', sezione: 'area-triangolo', tipo: 'formula', fronte: R`Area di un triangolo con due lati e l'angolo compreso`, retro: R`$\text{Area} = \dfrac{1}{2}ab\sin\gamma$, con $\gamma$ compreso fra $a$ e $b$.` },
    { id: 'fc-10', sezione: 'area-triangolo', tipo: 'concetto', fronte: R`Perché $\frac12 ab\sin\gamma$ funziona anche con $\gamma$ ottuso?`, retro: R`Perché il seno di un angolo ottuso è comunque positivo: la formula resta valida senza modifiche.` },
    { id: 'fc-11', sezione: 'teorema-della-corda', tipo: 'formula', fronte: R`Teorema della corda`, retro: R`$AB = 2R\sin\gamma$, con $\gamma$ angolo alla circonferenza che sottende la corda $AB$.` },
    { id: 'fc-12', sezione: 'teorema-della-corda', tipo: 'procedura', fronte: R`Idea della dimostrazione del teorema della corda`, retro: R`Si traccia il diametro da un estremo della corda: per Talete l'angolo opposto è retto, e si applica il primo teorema dei triangoli rettangoli.` },
    { id: 'fc-13', sezione: 'teorema-dei-seni', tipo: 'formula', fronte: R`Teorema dei seni`, retro: R`$\dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma} = 2R$, con $R$ raggio della circonferenza circoscritta.` },
    { id: 'fc-14', sezione: 'teorema-dei-seni', tipo: 'concetto', fronte: R`Quando può presentarsi il caso ambiguo?`, retro: R`Quando si conoscono due lati e l'angolo opposto a uno di essi (non compreso fra i due lati).` },
    { id: 'fc-15', sezione: 'teorema-dei-seni', tipo: 'concetto', fronte: R`Condizione per due triangoli nel caso ambiguo (con $\alpha$ acuto)`, retro: R`$b\sin\alpha < a < b$: la calcolatrice dà una soluzione acuta per $\beta$, ma va controllata anche $180^\circ - \beta$.` },
    { id: 'fc-16', sezione: 'teorema-dei-seni', tipo: 'concetto', fronte: R`Quando il caso ambiguo non ha soluzioni?`, retro: R`Quando $a < b\sin\alpha$ (con $\alpha$ acuto): il lato $a$ è troppo corto per chiudere il triangolo.` },
    { id: 'fc-17', sezione: 'teorema-del-coseno', tipo: 'formula', fronte: R`Teorema del coseno (di Carnot)`, retro: R`$c^2 = a^2+b^2-2ab\cos\gamma$, con $\gamma$ angolo compreso fra $a$ e $b$, opposto a $c$.` },
    { id: 'fc-18', sezione: 'teorema-del-coseno', tipo: 'concetto', fronte: R`Cosa diventa il teorema del coseno se $\gamma = 90^\circ$?`, retro: R`Il teorema di Pitagora: $\cos 90^\circ = 0$, quindi $c^2 = a^2+b^2$.` },
    { id: 'fc-19', sezione: 'teorema-del-coseno', tipo: 'concetto', fronte: R`Il termine $-2ab\cos\gamma$: quando allunga e quando accorcia $c$?`, retro: R`Se $\gamma$ è acuto il termine è negativo ($c$ più corto che nel caso rettangolo); se $\gamma$ è ottuso è positivo ($c$ più lungo).` },
    { id: 'fc-20', sezione: 'risoluzione-triangoli-qualunque', tipo: 'procedura', fronte: R`I quattro casi per risolvere un triangolo qualunque`, retro: R`LLL (tre lati), LAL (due lati e l'angolo compreso), ALA/AAL (due angoli e un lato), LLA (due lati e un angolo non compreso).` },
    { id: 'fc-21', sezione: 'risoluzione-triangoli-qualunque', tipo: 'concetto', fronte: R`Nel caso LLL, perché conviene partire dal lato più lungo?`, retro: R`L'angolo opposto al lato più lungo è il più ampio ed è l'unico che può essere ottuso: gli altri due, trovati dopo, sono sicuramente acuti.` },
    { id: 'fc-22', sezione: 'problemi-geometria', tipo: 'formula', fronte: R`Area di un quadrilatero dalle diagonali`, retro: R`$\text{Area} = \dfrac{1}{2}d_1 d_2 \sin\theta$, con $\theta$ angolo fra le diagonali nel loro punto di intersezione.` },
    { id: 'fc-23', sezione: 'problemi-geometria', tipo: 'formula', fronte: R`Apotema di un poligono regolare di $n$ lati`, retro: R`$\text{apotema} = \dfrac{l}{2\tan\left(\frac{180^\circ}{n}\right)}$, con $l$ lato del poligono.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Un triangolo rettangolo ha ipotenusa $c = 10\ \text{cm}$ e un angolo acuto $\alpha = 36,87^\circ$. Calcola i due cateti $a$ (opposto ad $\alpha$) e $b$ (adiacente), arrotondati al centesimo.`, suggerimenti: [
      R`Usa il primo teorema sui triangoli rettangoli: un cateto è ipotenusa per seno o coseno dell'angolo.`,
      R`$a = c\sin\alpha$, $b = c\cos\alpha$.`
    ], risposta: { tipo: 'numeri', valori: [6, 8], tolleranza: 0.05 }, soluzione: [
      R`$a = 10 \cdot \sin 36,87^\circ \approx 10 \cdot 0,6 = 6\ \text{cm}$.`,
      R`$b = 10 \cdot \cos 36,87^\circ \approx 10 \cdot 0,8 = 8\ \text{cm}$.`,
      R`Non è un caso: $36,87^\circ$ è l'angolo del triangolo 3-4-5, con $\sin\alpha = 0,6$ e $\cos\alpha = 0,8$ esatti.`
    ] },
    { id: 'es-02', difficolta: 1, testo: R`In un triangolo rettangolo un cateto misura $6\ \text{cm}$ ed è opposto a un angolo di $25^\circ$. Quanto misura l'ipotenusa? (arrotonda al centesimo)`, suggerimenti: [
      R`Il cateto è opposto all'angolo dato: quale dei tre teoremi lo lega direttamente all'ipotenusa?`,
      R`$a = c\sin\alpha$, quindi $c = a/\sin\alpha$.`
    ], risposta: { tipo: 'numero', valore: 14.2, tolleranza: 0.05 }, soluzione: [
      R`Da $a = c\sin\alpha$ si ricava $c = \dfrac{a}{\sin\alpha} = \dfrac{6}{\sin 25^\circ} \approx \dfrac{6}{0,4226} \approx 14,20\ \text{cm}$.`
    ] },
    { id: 'es-03', difficolta: 1, testo: R`Una strada ha una pendenza dell'$8\%$. Quanti gradi misura l'angolo di inclinazione rispetto all'orizzontale? (arrotonda al centesimo di grado)`, suggerimenti: [
      R`La pendenza in percentuale è $100\tan\alpha$.`,
      R`$\tan\alpha = 0,08$; usa l'arcotangente.`
    ], risposta: { tipo: 'numero', valore: 4.57, tolleranza: 0.1 }, soluzione: [
      R`$\tan\alpha = \dfrac{8}{100} = 0,08$.`,
      R`$\alpha = \arctan(0,08) \approx 4,57^\circ$.`
    ] },
    { id: 'es-04', difficolta: 2, testo: R`Da un punto a $25\ \text{m}$ dalla base di una torre, l'angolo di elevazione della cima è $40^\circ$. Quanto è alta la torre? (trascura l'altezza dell'osservatore; arrotonda al centesimo)`, suggerimenti: [
      R`La distanza orizzontale è il cateto adiacente all'angolo di elevazione.`,
      R`Usa il secondo teorema: $h = d\tan\alpha$.`
    ], risposta: { tipo: 'numero', valore: 20.98, tolleranza: 0.1 }, soluzione: [
      R`$h = 25\cdot\tan 40^\circ \approx 25\cdot 0,8391 \approx 20,98\ \text{m}$.`
    ] },
    { id: 'es-05', difficolta: 1, testo: R`Calcola l'area di un triangolo con lati $a = 8\ \text{cm}$, $b = 5\ \text{cm}$ e l'angolo compreso $\gamma = 30^\circ$.`, suggerimenti: [
      R`Non serve l'altezza: c'è una formula diretta con due lati e l'angolo compreso.`,
      R`$\text{Area} = \frac12 ab\sin\gamma$.`
    ], risposta: { tipo: 'numero', valore: 10, tolleranza: 0.05 }, soluzione: [
      R`$\text{Area} = \frac12\cdot 8\cdot 5\cdot\sin 30^\circ = 20\cdot 0,5 = 10\ \text{cm}^2$.`
    ] },
    { id: 'es-06', difficolta: 2, testo: R`In una circonferenza di raggio $7,5\ \text{cm}$, una corda lunga $10\ \text{cm}$ sottende un angolo alla circonferenza $\gamma$. Quanto misura $\gamma$, l'angolo acuto, in gradi? (arrotonda al centesimo)`, suggerimenti: [
      R`Usa il teorema della corda: $AB = 2R\sin\gamma$.`,
      R`$\sin\gamma = \dfrac{AB}{2R} = \dfrac{10}{15}$.`
    ], risposta: { tipo: 'numero', valore: 41.81, tolleranza: 0.1 }, soluzione: [
      R`$\sin\gamma = \dfrac{10}{2\cdot 7,5} = \dfrac{10}{15} \approx 0,6667$.`,
      R`$\gamma = \arcsin(0,6667) \approx 41,81^\circ$ (l'angolo acuto; dall'altra parte della corda l'angolo sarebbe il supplementare, $\approx 138,19^\circ$).`
    ] },
    { id: 'es-07', difficolta: 2, testo: R`In un triangolo, $\alpha = 50^\circ$, $\beta = 60^\circ$ e il lato $a$ (opposto ad $\alpha$) misura $10\ \text{cm}$. Trova i lati $b$ e $c$ (arrotonda al centesimo).`, suggerimenti: [
      R`Prima trova $\gamma$ per differenza da $180^\circ$.`,
      R`Usa il teorema dei seni: $\dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma}$.`
    ], risposta: { tipo: 'numeri', valori: [11.31, 12.27], tolleranza: 0.05 }, soluzione: [
      R`$\gamma = 180^\circ - 50^\circ - 60^\circ = 70^\circ$.`,
      R`Rapporto comune: $\dfrac{a}{\sin\alpha} = \dfrac{10}{\sin 50^\circ} \approx 13,05$.`,
      R`$b \approx 13,05\cdot\sin 60^\circ \approx 11,31\ \text{cm}$; $c \approx 13,05\cdot\sin 70^\circ \approx 12,27\ \text{cm}$.`
    ] },
    { id: 'es-08', difficolta: 3, testo: R`In un triangolo, $\alpha = 35^\circ$, $a = 7\ \text{cm}$ (opposto ad $\alpha$) e $b = 10\ \text{cm}$. Il problema ha due soluzioni: trova le due possibili misure del lato $c$ (arrotonda al centesimo).`, suggerimenti: [
      R`Controlla prima che sia davvero il caso ambiguo: confronta $a$ con $b\sin\alpha$ e con $b$.`,
      R`Trova $\beta$ con il teorema dei seni: ci sono due valori possibili, $\beta$ e $180^\circ - \beta$.`,
      R`Per ciascuno dei due $\beta$, trova $\gamma$ e poi $c$ con il teorema dei seni.`
    ], risposta: { tipo: 'numeri', valori: [12.2, 4.18], tolleranza: 0.05 }, soluzione: [
      R`$b\sin\alpha = 10\cdot\sin 35^\circ \approx 5,74$. Poiché $5,74 < 7 < 10$, ci sono due soluzioni.`,
      R`$\sin\beta = \dfrac{b\sin\alpha}{a} = \dfrac{5,74}{7} \approx 0,8194$, quindi $\beta_1 \approx 55,02^\circ$ oppure $\beta_2 \approx 124,98^\circ$.`,
      R`Rapporto comune: $\dfrac{a}{\sin\alpha} = \dfrac{7}{\sin 35^\circ} \approx 12,20$.`,
      R`Primo triangolo: $\gamma_1 = 180^\circ-35^\circ-55,02^\circ \approx 89,98^\circ$, $c_1 \approx 12,20\cdot\sin 89,98^\circ \approx 12,20\ \text{cm}$. Secondo: $\gamma_2 = 180^\circ-35^\circ-124,98^\circ \approx 20,02^\circ$, $c_2 \approx 12,20\cdot\sin 20,02^\circ \approx 4,18\ \text{cm}$.`
    ] },
    { id: 'es-09', difficolta: 3, testo: R`Un triangolo ha lati $a = 7\ \text{cm}$, $b = 8\ \text{cm}$, $c = 5\ \text{cm}$. Trova l'ampiezza dell'angolo $\gamma$, opposto al lato $c$, in gradi (arrotonda al centesimo).`, suggerimenti: [
      R`Con i tre lati noti serve il teorema del coseno, risolto rispetto al coseno.`,
      R`$\cos\gamma = \dfrac{a^2+b^2-c^2}{2ab}$.`
    ], risposta: { tipo: 'numero', valore: 38.21, tolleranza: 0.1 }, soluzione: [
      R`$\cos\gamma = \dfrac{49+64-25}{2\cdot 7\cdot 8} = \dfrac{88}{112} \approx 0,7857$.`,
      R`$\gamma = \arccos(0,7857) \approx 38,21^\circ$.`
    ] },
    { id: 'es-10', difficolta: 2, testo: R`Un esagono regolare ha lato $6\ \text{cm}$. Calcola la sua area (arrotonda al centesimo).`, suggerimenti: [
      R`L'esagono si divide in 6 triangoli isosceli dal centro; l'apotema è l'altezza di ciascuno.`,
      R`$\text{apotema} = \dfrac{l}{2\tan(180^\circ/n)}$, poi $\text{Area} = \dfrac12\cdot\text{perimetro}\cdot\text{apotema}$.`
    ], risposta: { tipo: 'numero', valore: 93.53, tolleranza: 0.1 }, soluzione: [
      R`$\text{apotema} = \dfrac{6}{2\tan 30^\circ} \approx \dfrac{6}{1,1547} \approx 5,20\ \text{cm}$.`,
      R`Perimetro $= 6\cdot 6 = 36\ \text{cm}$; $\text{Area} = \dfrac12\cdot 36\cdot 5,20 \approx 93,53\ \text{cm}^2$.`
    ] },
    { id: 'es-11', difficolta: 2, testo: R`Un quadrilatero ha le diagonali di $8\ \text{cm}$ e $10\ \text{cm}$, che si incontrano formando un angolo di $70^\circ$. Calcola l'area del quadrilatero (arrotonda al centesimo).`, suggerimenti: [
      R`C'è una formula diretta per l'area di un quadrilatero dalle sue diagonali e dall'angolo fra loro.`,
      R`$\text{Area} = \frac12 d_1 d_2\sin\theta$.`
    ], risposta: { tipo: 'numero', valore: 37.59, tolleranza: 0.1 }, soluzione: [
      R`$\text{Area} = \frac12\cdot 8\cdot 10\cdot\sin 70^\circ \approx 40\cdot 0,9397 \approx 37,59\ \text{cm}^2$.`
    ] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`In un triangolo rettangolo, il cateto adiacente a un angolo acuto $\alpha$ è...`, opzioni: [
      R`il cateto che, insieme all'ipotenusa, forma l'angolo $\alpha$`,
      R`il cateto opposto ad $\alpha$`,
      R`l'ipotenusa`,
      R`sempre il cateto più corto`
    ], corretta: 0, spiegazione: R`Il cateto adiacente è quello che "tocca" l'angolo, insieme all'ipotenusa. Il cateto opposto non lo tocca; l'ipotenusa è sempre opposta all'angolo retto, non ad $\alpha$; quale cateto sia più corto dipende dai valori, non dalla definizione.` },
    { id: 'q-02', domanda: R`Il teorema del coseno $c^2 = a^2+b^2-2ab\cos\gamma$, quando $\gamma = 90^\circ$, diventa...`, opzioni: [
      R`$c^2 = a^2 - b^2$`,
      R`il teorema di Pitagora, $c^2 = a^2+b^2$`,
      R`$c = a+b$`,
      R`$c^2 = 2ab$`
    ], corretta: 1, spiegazione: R`$\cos 90^\circ = 0$, quindi il termine $-2ab\cos\gamma$ sparisce e resta $c^2=a^2+b^2$: il teorema del coseno generalizza Pitagora.` },
    { id: 'q-03', domanda: R`Il teorema dei seni $\dfrac{a}{\sin\alpha} = \dfrac{b}{\sin\beta} = \dfrac{c}{\sin\gamma}$ è anche uguale a...`, opzioni: [
      R`il perimetro del triangolo`,
      R`il raggio $R$ della circonferenza circoscritta`,
      R`il diametro $2R$ della circonferenza circoscritta`,
      R`l'area del triangolo`
    ], corretta: 2, spiegazione: R`Ogni lato è una corda che sottende l'angolo opposto, quindi $a=2R\sin\alpha$ e così via: il rapporto comune vale $2R$, il diametro, non il raggio.` },
    { id: 'q-04', domanda: R`Quando si presenta il "caso ambiguo" nella risoluzione di un triangolo?`, opzioni: [
      R`quando si conoscono i tre lati`,
      R`quando si conoscono due angoli e un lato`,
      R`quando si conoscono due lati e l'angolo compreso fra essi`,
      R`quando si conoscono due lati e l'angolo opposto a uno di essi`
    ], corretta: 3, spiegazione: R`Nel caso LLA (due lati e un angolo non compreso) l'equazione del teorema dei seni può avere due soluzioni accettabili per l'angolo incognito. Negli altri casi (LLL, ALA, LAL) la soluzione, se esiste, è unica.` },
    { id: 'q-05', domanda: R`Con $\alpha$ acuto, se $a < b\sin\alpha$ nel caso ambiguo, quanti triangoli esistono?`, opzioni: [
      R`due`, R`uno`, R`nessuno`, R`infiniti`
    ], corretta: 2, spiegazione: R`$b\sin\alpha$ è la distanza minima che il lato $a$ deve poter "raggiungere" per chiudere il triangolo: se $a$ è più corto di questa distanza minima, nessun triangolo è possibile.` },
    { id: 'q-06', domanda: R`Per calcolare l'area di un triangolo con la formula $\frac12 ab\sin\gamma$, l'angolo $\gamma$ deve essere...`, opzioni: [
      R`un angolo qualunque del triangolo`,
      R`l'angolo opposto al lato $a$`,
      R`l'angolo compreso fra i lati $a$ e $b$`,
      R`sempre un angolo acuto`
    ], corretta: 2, spiegazione: R`La formula usa l'angolo compreso fra i due lati noti, perché è da lì che si ricava l'altezza $h = b\sin\gamma$. Un angolo qualsiasi del triangolo non basta.` },
    { id: 'q-07', domanda: R`Il teorema della corda lega la lunghezza di una corda $AB$ a...`, opzioni: [
      R`il raggio della circonferenza e l'angolo al centro`,
      R`il diametro della circonferenza e un angolo alla circonferenza che la sottende`,
      R`solo il raggio della circonferenza`,
      R`la lunghezza dell'arco sotteso`
    ], corretta: 1, spiegazione: R`$AB = 2R\sin\gamma$: compaiono il diametro $2R$ e un angolo alla circonferenza $\gamma$, non l'angolo al centro né la lunghezza dell'arco.` },
    { id: 'q-08', domanda: R`Nella risoluzione di un triangolo rettangolo, se sono noti i due cateti $a$ e $b$, come si trova un angolo acuto?`, opzioni: [
      R`con il teorema del coseno`,
      R`con $\tan\alpha = a/b$ e poi l'arcotangente`,
      R`con il teorema della corda`,
      R`non è possibile senza conoscere un angolo`
    ], corretta: 1, spiegazione: R`Il rapporto fra i due cateti è la tangente dell'angolo opposto al primo; l'arcotangente lo restituisce. Il teorema del coseno e quello della corda non sono necessari in un triangolo rettangolo con i cateti noti.` },
    { id: 'q-09', domanda: R`Una strada con pendenza del $100\%$ corrisponde a un'inclinazione di...`, opzioni: [
      R`$100^\circ$`, R`$90^\circ$ (parete verticale)`, R`$45^\circ$`, R`$50^\circ$`
    ], corretta: 2, spiegazione: R`Pendenza $100\%$ significa $\tan\alpha = 1$, cioè $\alpha = 45^\circ$: molto ripida, ma non verticale. La pendenza in percentuale non è l'angolo in gradi.` },
    { id: 'q-10', domanda: R`Dato un triangolo di cui si conoscono tutti e tre i lati (caso LLL), come si comincia a risolverlo?`, opzioni: [
      R`con il teorema dei seni, per trovare subito un angolo`,
      R`con il teorema del coseno, per trovare un angolo`,
      R`con $\frac12 ab\sin\gamma$, per trovare l'area`,
      R`non si può risolvere senza conoscere almeno un angolo`
    ], corretta: 1, spiegazione: R`Il teorema dei seni richiederebbe già un angolo, che non si conosce. Il teorema del coseno, risolto rispetto al coseno, dà un primo angolo usando solo i tre lati.` },
    { id: 'q-11', domanda: R`L'angolo di depressione da un punto $A$ a un punto $B$ più in basso è congruente...`, opzioni: [
      R`all'angolo di elevazione da $B$ ad $A$`,
      R`al doppio dell'angolo di elevazione da $B$ ad $A$`,
      R`al complementare dell'angolo di elevazione da $B$ ad $A$`,
      R`non c'è nessuna relazione generale`
    ], corretta: 0, spiegazione: R`Le due linee orizzontali (in $A$ e in $B$) sono parallele, e i due angoli sono alterni interni rispetto alla linea di vista $AB$: quindi sono congruenti.` },
    { id: 'q-12', domanda: R`Nel caso ambiguo del teorema dei seni, quando la calcolatrice restituisce l'arcoseno di un valore, quale soluzione dà?`, opzioni: [
      R`sempre entrambe le soluzioni possibili`,
      R`solo la soluzione ottusa`,
      R`solo la soluzione acuta; l'eventuale soluzione ottusa va cercata a mano`,
      R`nessuna delle due, serve un'altra funzione`
    ], corretta: 2, spiegazione: R`L'arcoseno restituisce per convenzione un valore fra $-90^\circ$ e $90^\circ$, quindi solo l'angolo acuto. La soluzione ottusa, se esiste, è il suo supplementare e va controllata separatamente.` },
    { id: 'q-13', domanda: R`In un poligono regolare di $n$ lati, l'apotema è...`, opzioni: [
      R`la distanza fra due vertici opposti`,
      R`la distanza dal centro a un vertice`,
      R`la distanza dal centro a un lato`,
      R`il perimetro diviso per $n$`
    ], corretta: 2, spiegazione: R`L'apotema è l'altezza dei triangoli isosceli in cui il centro divide il poligono, cioè la distanza (perpendicolare) dal centro a un lato. La distanza dal centro a un vertice è il raggio della circonferenza circoscritta, un'altra grandezza.` },
    { id: 'q-14', domanda: R`Per l'area di un quadrilatero qualunque dalle diagonali $d_1$, $d_2$ e dall'angolo $\theta$ fra loro, si usa...`, opzioni: [
      R`$\text{Area} = d_1\cdot d_2$`,
      R`$\text{Area} = \frac12 d_1 d_2 \sin\theta$`,
      R`$\text{Area} = \frac12 d_1 d_2 \cos\theta$`,
      R`la formula vale solo per i quadrati`
    ], corretta: 1, spiegazione: R`La formula $\frac12 d_1 d_2\sin\theta$ vale per qualunque quadrilatero, non solo per quelli regolari, ed è la stessa idea di $\frac12 ab\sin\gamma$ applicata due volte ai quattro triangoli che si formano.` },
    { id: 'q-15', domanda: R`Nel teorema del coseno, per trovare un angolo conoscendo i tre lati, quale lato va isolato a sinistra dell'uguale?`, opzioni: [
      R`uno qualunque dei tre, è indifferente`,
      R`il lato più corto`,
      R`il lato opposto all'angolo che si vuole trovare`,
      R`il lato più lungo, sempre`
    ], corretta: 2, spiegazione: R`La formula $c^2=a^2+b^2-2ab\cos\gamma$ lega $\gamma$ al lato $c$ che gli sta opposto: per trovare un certo angolo, va isolato il lato a esso opposto, non uno scelto a caso.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`"Opposto" e "adiacente" dipendono da quale angolo si sta usando: nello stesso triangolo, un cateto è opposto a un angolo e adiacente all'altro. Prima di scrivere una formula, individua sempre rispetto a *quale* angolo il cateto in questione è opposto o adiacente.` },
    { tipo: 'errore', testo: R`Nel teorema del coseno, l'angolo nella formula deve essere quello compreso fra i due lati noti (per trovare il terzo lato) oppure quello opposto al lato isolato a sinistra (per trovare un angolo dai tre lati). Usare l'angolo sbagliato è l'errore più comune.` },
    { tipo: 'trucco', testo: R`Dopo aver trovato tutti gli angoli di un triangolo, controlla sempre che la loro somma faccia $180^\circ$: è un controllo immediato che smaschera quasi ogni errore di calcolo.` },
    { tipo: 'errore', testo: R`Nel caso ambiguo, la calcolatrice con l'arcoseno dà solo la soluzione acuta. Prima di scartare la soluzione ottusa ($180^\circ$ meno quella trovata), controlla se, sommata all'angolo già noto, resta sotto $180^\circ$: se sì, è una seconda soluzione valida.` },
    { tipo: 'metodo', testo: R`Prima di scegliere una formula, individua che tipo di dati hai: tre lati (LLL), due lati e l'angolo compreso (LAL), due angoli e un lato (ALA/AAL), oppure due lati e un angolo non compreso (LLA). Ogni caso ha il suo punto di partenza naturale.` },
    { tipo: 'trucco', testo: R`La pendenza di una strada in percentuale è $100\tan\alpha$, non l'angolo stesso: una pendenza del $100\%$ è già un'inclinazione di $45^\circ$, molto ripida ma non verticale.` },
    { tipo: 'errore', testo: R`Nel teorema della corda e nel teorema dei seni compare $2R$, il diametro, non il raggio $R$. Dimenticare il $2$ è l'errore più frequente in queste due formule.` },
    { tipo: 'metodo', testo: R`Disegna sempre la figura con i dati noti scritti sopra, prima di scrivere qualunque formula: nella trigonometria quasi ogni errore nasce dall'aver scambiato un lato o un angolo con un altro, non da un calcolo sbagliato.` }
  ],

  aneddoti: [
    { matematico: 'Ipparco di Nicea', anni: '190–120 a.C. circa', titolo: 'Le tavole delle corde e la Terra che dondola', testo: R`Ipparco è considerato il padre della trigonometria: per calcolare le posizioni di Sole e Luna costruì la prima tavola delle corde della storia, un elenco che associava a ogni arco di circonferenza la lunghezza della corda corrispondente — l'antenato diretto delle nostre tavole di seni. Usò questo strumento anche per un risultato sorprendente: confrontando le sue osservazioni astronomiche con registrazioni babilonesi vecchie di circa 150 anni, si accorse che le stelle sembravano essersi spostate rispetto agli equinozi. Non erano le stelle a muoversi: era l'asse terrestre a "dondolare" lentamente come una trottola, un fenomeno oggi chiamato precessione degli equinozi, con un periodo di circa 26.000 anni. Quasi nessuna delle sue opere originali è sopravvissuta: le conosciamo soprattutto attraverso Tolomeo, che le riprese tre secoli dopo.`, legame: R`La tavola delle corde di Ipparco è esattamente l'oggetto descritto dal teorema della corda: la relazione fra un arco (o l'angolo che vede) e la lunghezza della corda sottesa.` },
    { matematico: 'Eratostene di Cirene', anni: '276–194 a.C.', titolo: "La circonferenza della Terra misurata con un bastone", testo: R`Bibliotecario ad Alessandria, Eratostene sapeva che a Siene (l'odierna Assuan), a mezzogiorno del solstizio d'estate, il Sole illuminava il fondo di un pozzo senza proiettare ombra: era allo zenit. Nello stesso istante, ad Alessandria, un bastone verticale (uno gnomone) proiettava un'ombra che formava un angolo di circa $7,2^\circ$ con la verticale, cioè un cinquantesimo di angolo giro. Se le due città stavano sullo stesso meridiano, quell'angolo doveva essere anche l'angolo al centro della Terra fra le due località. Conoscendo la distanza fra Alessandria e Siene (circa 5000 stadi, misurata da uomini addestrati a contare i passi con un ritmo costante), Eratostene moltiplicò per 50 e ottenne la circonferenza dell'intero pianeta: un risultato notevolmente vicino a quello reale, anche se la lunghezza esatta dello "stadio" usato resta incerta oggi.`, legame: R`Il metodo di Eratostene è lo stesso delle applicazioni con l'angolo di elevazione: un'ombra, un angolo e una distanza nota bastano per misurare qualcosa di irraggiungibile.` },
    { matematico: 'Regiomontano (Johannes Müller)', anni: '1436–1476', titolo: 'Il trattato che rese la trigonometria indipendente', testo: R`Il vero nome di Regiomontano era Johannes Müller, nato a Königsberg in Franconia ("monte del re", da cui il nome latinizzato). Nel 1464 completò il *De triangulis omnimodis*, il primo trattato europeo a studiare la trigonometria come disciplina a sé stante, staccata dall'astronomia che l'aveva sempre ospitata: vi compaiono il teorema dei seni per i triangoli piani e sferici e metodi sistematici per risolverli in ogni caso. Il libro fu pubblicato solo nel 1533, dopo la sua morte, ma le sue tavole astronomiche circolavano già prima: pare che Cristoforo Colombo, bloccato in Giamaica nel 1504 con le navi in avaria, le abbia usate per prevedere un'eclissi di Luna e convincere gli abitanti del posto, spaventati dalla scomparsa della Luna, a continuare a rifornirlo di cibo.`, legame: R`Il *De triangulis* è il primo libro a raccogliere in modo sistematico proprio quello che si fa qui: risolvere un triangolo qualunque conoscendo alcuni dei suoi elementi.` },
    { matematico: 'Willebrord Snellius', anni: '1580–1626', titolo: 'Misurare l\'Olanda senza percorrerla tutta', testo: R`Professore a Leida, nel 1615 Snellius affrontò un problema pratico: misurare la lunghezza di un grado di meridiano nei Paesi Bassi, per stimare le dimensioni della Terra senza ripetere il viaggio di Eratostene. Invece di percorrere a passi l'intera distanza fra due città, misurò con cura una sola breve base e una rete di triangoli che collegava torri e campanili visibili da un punto all'altro, per circa 130 km fra Alkmaar e Bergen op Zoom: misurando solo gli angoli di ogni triangolo, il teorema dei seni permetteva di calcolare tutti i lati della catena a partire da quell'unica base. Pubblicò il risultato nel 1617 in un'opera che chiamò, in suo onore, *Eratosthenes Batavus* ("l'Eratostene d'Olanda").`, legame: R`È il primo esempio moderno di triangolazione: la tecnica descritta a fine scheda per misurare grandi distanze incatenando triangoli risolti con il teorema dei seni.` },
    { matematico: 'Lazare Carnot', anni: '1753–1823', titolo: 'Un generale rivoluzionario e Pitagora generalizzato', testo: R`Ingegnere militare e matematico, Carnot fu anche una figura politica di primo piano nella Rivoluzione francese: come organizzatore degli eserciti della giovane Repubblica contro le monarchie europee coalizzate, guadagnò il soprannome di "l'organizzatore della vittoria". Nel tempo che gli restava alla matematica, nel trattato *Géométrie de position* (1803) trattò sistematicamente lunghezze e angoli con segno, ottenendo in forma generale la relazione che oggi porta il suo nome in Italia. La stessa relazione, però, era già nota: in forma puramente geometrica compare nel libro II degli *Elementi* di Euclide, e già nel Quattrocento l'astronomo persiano al-Kashi l'aveva usata a Samarcanda per costruire tavole trigonometriche accuratissime. Non a caso, in Francia lo stesso teorema si chiama spesso "teorema di al-Kashi": il nome cambia da un paese all'altro a seconda di chi se ne prende il merito.`, legame: R`Il teorema del coseno, generalizzazione di Pitagora a un angolo qualunque, è chiamato in Italia proprio "teorema di Carnot".` }
  ]
});
})();
