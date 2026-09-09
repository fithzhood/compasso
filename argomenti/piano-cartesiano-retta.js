(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'piano-cartesiano-retta',
  titolo: 'Piano cartesiano e retta',

  introduzione: R`Il piano cartesiano è una griglia con due assi perpendicolari che permette di descrivere ogni punto con una coppia di numeri, le sue coordinate, e ogni retta con un'equazione di primo grado in due incognite. È lo strumento che unisce l'algebra alla geometria: un problema geometrico (due rette si incontrano? un punto è più vicino a una retta o a un'altra?) diventa un calcolo, e un calcolo (risolvere un sistema, confrontare due numeri) diventa un disegno.

Lo si incontra ovunque ci sia bisogno di localizzare qualcosa con due numeri: le coordinate di una mappa, i pixel di uno schermo, il grafico di un costo che cresce in modo costante nel tempo. In fisica il moto rettilineo uniforme è descritto da una retta nel piano spazio-tempo; in economia il punto di pareggio fra costi e ricavi è l'intersezione di due rette.

Per affrontare bene questo argomento serve saper risolvere le equazioni di primo grado e i sistemi lineari a due incognite: ogni volta che due rette si incontrano, dietro c'è un sistema da risolvere.`,

  sezioni: [
    { id: 'coordinate-piano', titolo: 'Le coordinate e i quadranti', testo: R`Il piano cartesiano si costruisce con due rette perpendicolari che si incontrano nell'origine $O$: quella orizzontale è l'asse delle **ascisse** (asse $x$), quella verticale è l'asse delle **ordinate** (asse $y$). Ogni punto $P$ del piano è individuato da una coppia ordinata di numeri, le sue coordinate: $P(x_P; y_P)$.

>* Le coordinate si scrivono sempre nell'ordine (ascissa; ordinata). $P(3; -2)$ e $P(-2; 3)$ sono due punti diversi, anche se contengono gli stessi numeri.

I due assi dividono il piano in quattro regioni, i **quadranti**, numerati in senso antiorario a partire da quello in alto a destra:

| Quadrante | segno di $x$ | segno di $y$ |
|---|---|---|
| I | + | + |
| II | − | + |
| III | − | − |
| IV | + | − |

Un punto con $x = 0$ sta sull'asse $y$; uno con $y = 0$ sta sull'asse $x$. L'origine $O(0; 0)$ appartiene a entrambi gli assi e non sta in nessun quadrante.

Per esempio, $A(2; 5)$ sta nel primo quadrante, $B(-4; 1)$ nel secondo, $C(-3; -3)$ nel terzo e $D(6; -2)$ nel quarto.

>! Il quadrante si legge dai *segni* delle coordinate, non dal loro valore assoluto: $(-100; 5)$ sta comunque nel secondo quadrante, non serve che i numeri siano "piccoli".` },

    { id: 'distanza-punto-medio', titolo: 'Distanza fra due punti, punto medio e baricentro', testo: R`Per calcolare la **distanza** fra due punti $A(x_A; y_A)$ e $B(x_B; y_B)$ si costruisce un triangolo rettangolo con i cateti paralleli agli assi, lunghi $|x_B - x_A|$ e $|y_B - y_A|$: l'ipotenusa è il segmento $AB$, e il teorema di Pitagora dà la distanza.

>* **Distanza fra due punti:** $$\overline{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$

Per esempio, fra $A(1; -2)$ e $B(5; 1)$: $\overline{AB} = \sqrt{(5-1)^2 + (1-(-2))^2} = \sqrt{16 + 9} = \sqrt{25} = 5$.

Il **punto medio** $M$ del segmento $AB$ ha per coordinate la media delle coordinate degli estremi:

>* **Punto medio:** $$M\left(\dfrac{x_A + x_B}{2};\ \dfrac{y_A + y_B}{2}\right)$$

La stessa idea, estesa a tre punti, dà il **baricentro** di un triangolo $ABC$: è il punto in cui si incontrano le tre **mediane** (i segmenti che uniscono ogni vertice al punto medio del lato opposto), e le sue coordinate sono la media delle coordinate dei tre vertici.

>* **Baricentro:** $$G\left(\dfrac{x_A + x_B + x_C}{3};\ \dfrac{y_A + y_B + y_C}{3}\right)$$

Il baricentro divide ogni mediana in due parti, quella verso il vertice doppia dell'altra: sta sempre a due terzi del cammino dal vertice verso il punto medio del lato opposto. Nel grafico qui sotto un triangolo con le sue tre mediane: si incontrano tutte nel baricentro $G$, esattamente come calcolato con la formula.

[[grafico:baricentro]]

>! Nella formula della distanza le differenze vanno **elevate al quadrato**, non prese in valore assoluto e basta: $(x_B - x_A)^2$, non $|x_B - x_A|$. Il quadrato è ciò che permette di sommare cateti orizzontale e verticale con Pitagora, e rende automaticamente positivo il risultato sotto radice.` },

    { id: 'equazione-retta', titolo: 'L\'equazione della retta', testo: R`Una retta del piano si scrive con un'equazione di primo grado in due incognite. La **forma implicita** è la più generale:

>* **Forma implicita:** $$ax + by + c = 0, \qquad \text{con } a \text{ e } b \text{ non entrambi nulli}$$

Se $b \ne 0$ si può isolare $y$ e ottenere la **forma esplicita**:

>* **Forma esplicita:** $$y = mx + q, \qquad m = -\dfrac{a}{b}, \quad q = -\dfrac{c}{b}$$ $m$ è il **coefficiente angolare**, $q$ è l'**ordinata all'origine**: il valore di $y$ quando $x = 0$, cioè l'ordinata del punto in cui la retta taglia l'asse $y$.

Nel grafico, muovi $m$ e $q$: la retta ruota cambiando $m$ e trasla verticalmente cambiando $q$; il punto $(0; q)$ resta sempre sull'asse $y$.

[[grafico:esplicita]]

Due casi non rientrano nella forma esplicita generale.

- Se $b = 0$ (e quindi $a \ne 0$), l'equazione diventa $x = -\dfrac{c}{a}$: una retta **verticale**, parallela all'asse $y$. Non esiste $m$: la forma esplicita non si può scrivere.
- Se $a = 0$ (e $b \ne 0$), resta $y = -\dfrac{c}{b}$: una retta **orizzontale**, parallela all'asse $x$, con $m = 0$.

Una retta passa per **l'origine** quando $c = 0$: l'equazione implicita diventa $ax + by = 0$, quella esplicita $y = mx$ (cioè $q = 0$), perché sostituendo $x = 0$ si ottiene sempre $y = 0$.

>! "Ogni retta si scrive come $y = mx + q$" è falso: le rette verticali (parallele all'asse $y$) non hanno coefficiente angolare e restano scritte come $x = k$. Solo l'equazione implicita descrive davvero *tutte* le rette del piano.` },

    { id: 'coefficiente-angolare', titolo: 'Il coefficiente angolare', testo: R`Il **coefficiente angolare** $m$ misura la pendenza di una retta: quanto sale (o scende) $y$ per ogni unità che $x$ avanza. Presi due punti qualsiasi della retta, $A(x_A; y_A)$ e $B(x_B; y_B)$, con $x_A \ne x_B$:

>* **Coefficiente angolare:** $$m = \dfrac{\Delta y}{\Delta x} = \dfrac{y_B - y_A}{x_B - x_A}$$ Il rapporto è lo stesso qualunque coppia di punti della retta si scelga: è una proprietà della retta, non dei due punti particolari.

[[animazione:pendenza-retta]]

Per esempio, sulla retta che passa per $A(1; 2)$ e $B(4; 8)$: $m = \dfrac{8-2}{4-1} = \dfrac{6}{3} = 2$. Per ogni passo di $1$ verso destra, la retta sale di $2$.

Il segno e il valore di $m$ raccontano la forma della retta:

- $m > 0$: la retta è **crescente** (sale da sinistra a destra);
- $m < 0$: la retta è **decrescente** (scende da sinistra a destra);
- $m = 0$: la retta è **orizzontale**;
- $|m|$ grande: retta ripida; $|m|$ vicino a $0$: retta quasi orizzontale.

Una retta **verticale** non ha coefficiente angolare: $\Delta x = 0$ per qualunque coppia di suoi punti, e il rapporto $\dfrac{\Delta y}{0}$ non è definito.

>! Il rapporto è $\dfrac{\Delta y}{\Delta x}$, cioè (differenza delle ordinate) diviso (differenza delle ascisse), **non** il contrario. Invertire numeratore e denominatore è l'errore più comune: dà il reciproco della pendenza vera, non la pendenza.` },

    { id: 'retta-punto-e-due-punti', titolo: 'Scrivere l\'equazione di una retta', testo: R`Se si conosce un punto $P_0(x_0; y_0)$ della retta e il suo coefficiente angolare $m$, l'equazione si scrive subito:

>* **Retta per un punto, con $m$ noto:** $$y - y_0 = m(x - x_0)$$

Per esempio, la retta per $P_0(2; -1)$ con $m = 3$: $y - (-1) = 3(x - 2)$, cioè $y = 3x - 7$.

Se invece si conoscono **due punti** $A(x_A; y_A)$ e $B(x_B; y_B)$ della retta (con $x_A \ne x_B$), il metodo più sicuro è calcolare prima il coefficiente angolare e poi usare la formula precedente con uno dei due punti:

>* **Retta per due punti:** si calcola $m = \dfrac{y_B - y_A}{x_B - x_A}$, poi si scrive $y - y_A = m(x - x_A)$.

Per esempio, per $A(-3; 1)$ e $B(1; 5)$: $m = \dfrac{5-1}{1-(-3)} = \dfrac{4}{4} = 1$, quindi $y - 1 = 1 \cdot (x + 3)$, cioè $y = x + 4$.

Trascina i punti $A$ e $B$ nel grafico: il coefficiente angolare e la distanza $\overline{AB}$ si aggiornano da soli, e la retta ruota per passare sempre per $A$ e $B$.

[[grafico:duePunti]]

Se $A$ e $B$ hanno la stessa ascissa ($x_A = x_B$), non esiste $m$: la retta è verticale, $x = x_A$. Se hanno la stessa ordinata ($y_A = y_B$), la retta è orizzontale, $y = y_A$, e in questo caso $m = 0$ senza bisogno di calcoli.

>! Con la formula "a incrocio" $\dfrac{y - y_A}{y_B - y_A} = \dfrac{x - x_A}{x_B - x_A}$ si arriva allo stesso risultato, ma solo se $x_A \ne x_B$ **e** $y_A \ne y_B$: conviene calcolare $m$ a parte e usare $y - y_A = m(x - x_A)$, che funziona anche quando la retta è orizzontale.` },

    { id: 'parallele-perpendicolari', titolo: 'Rette parallele e perpendicolari', testo: R`Due rette non verticali, con coefficienti angolari $m_1$ e $m_2$, sono **parallele** se e solo se hanno la stessa pendenza:

>* **Parallelismo:** $$m_1 = m_2$$

Sono invece **perpendicolari** (formano un angolo di $90°$) se e solo se il prodotto dei coefficienti angolari vale $-1$:

>* **Perpendicolarità:** $$m_1 \cdot m_2 = -1 \qquad \text{cioè} \qquad m_2 = -\dfrac{1}{m_1}$$ Il coefficiente angolare della perpendicolare è l'**opposto del reciproco** di $m_1$.

Per esempio, la retta $r: y = 2x + 1$ ha $m_1 = 2$; la retta $s: y = -\dfrac{1}{2}x + 3$ ha $m_2 = -\dfrac{1}{2}$. Poiché $2 \cdot \left(-\dfrac{1}{2}\right) = -1$, $r$ e $s$ sono perpendicolari, come mostra il grafico.

[[grafico:perpendicolari]]

Attenzione a una sottigliezza: due rette con $m_1 = m_2$ possono essere davvero parallele, senza punti in comune, oppure essere la stessa retta scritta due volte. Dipende da $q$: se $m_1 = m_2$ e $q_1 \ne q_2$ sono parallele distinte; se anche $q_1 = q_2$ sono coincidenti.

Due casi non seguono la formula del prodotto perché una delle due rette non ha coefficiente angolare:

- una retta **verticale** ($x = k$) e una **orizzontale** ($y = h$) sono sempre perpendicolari fra loro, qualunque siano $k$ e $h$;
- due rette **verticali** sono sempre parallele fra loro.

>! Il prodotto $m_1 \cdot m_2 = -1$ vale solo se **entrambe** le rette hanno un coefficiente angolare, cioè se nessuna delle due è verticale. Applicare la formula a una retta verticale porta a usare un $m$ che non esiste.` },

    { id: 'intersezione-rette', titolo: 'Intersezione fra due rette', testo: R`Il punto in cui due rette si incontrano è la soluzione del **sistema** formato dalle loro due equazioni: le coordinate $(x; y)$ che soddisfano entrambe.

>* Per trovare l'intersezione di $r: y = m_1 x + q_1$ e $s: y = m_2 x + q_2$ si risolve $$\begin{cases} y = m_1 x + q_1 \\ y = m_2 x + q_2 \end{cases}$$ uguagliando i due secondi membri: $m_1 x + q_1 = m_2 x + q_2$.

Per esempio, fra $r: y = 2x - 3$ e $s: y = -x + 3$: $2x - 3 = -x + 3 \Rightarrow 3x = 6 \Rightarrow x = 2$, e sostituendo $y = 2 \cdot 2 - 3 = 1$. Le due rette si incontrano in $(2; 1)$.

Il numero di soluzioni del sistema dice come sono disposte le due rette:

- una sola soluzione: le rette sono **incidenti**, si tagliano in un punto ($m_1 \ne m_2$);
- nessuna soluzione: le rette sono **parallele distinte** ($m_1 = m_2$, $q_1 \ne q_2$): l'equazione $m_1 x + q_1 = m_2 x + q_2$ diventa impossibile;
- infinite soluzioni: le due equazioni descrivono **la stessa retta** ($m_1 = m_2$, $q_1 = q_2$).

>! Se una delle due rette è verticale ($x = k$), non ha forma esplicita: si sostituisce direttamente $x = k$ nell'altra equazione, senza mettere a sistema due equazioni in $y = \ldots$.` },

    { id: 'distanza-punto-retta', titolo: 'Distanza di un punto da una retta', testo: R`La distanza di un punto $P(x_0; y_0)$ da una retta $r: ax + by + c = 0$ è la lunghezza del segmento perpendicolare condotto da $P$ a $r$: è il più corto fra tutti i segmenti che uniscono $P$ a un punto di $r$.

>* **Distanza punto-retta:** $$d(P, r) = \dfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$$

Per esempio, la distanza di $P(1; 5)$ dalla retta $r: 3x - 4y + 1 = 0$: si sostituiscono le coordinate di $P$ al posto di $x$ e $y$ nella formula.

$$d = \dfrac{|3 \cdot 1 - 4 \cdot 5 + 1|}{\sqrt{3^2 + (-4)^2}} = \dfrac{|3 - 20 + 1|}{\sqrt{25}} = \dfrac{16}{5} = 3{,}2$$

Il grafico mostra $P$, la retta $r$ e il segmento tratteggiato che realizza questa distanza: è perpendicolare a $r$, non un segmento qualunque fra $P$ e la retta.

[[grafico:distanzaRetta]]

Se $P$ appartiene alla retta, il numeratore $ax_0 + by_0 + c$ vale $0$ e la distanza è $0$, coerentemente: un punto della retta dista $0$ dalla retta stessa.

>! La formula richiede la retta in **forma implicita** $ax + by + c = 0$. Partendo da $y = mx + q$ va prima riscritta come $mx - y + q = 0$ (quindi $a = m$, $b = -1$, $c = q$): usare direttamente $m$ e $q$ al posto di $a$ e $b$ è un errore frequente.` },

    { id: 'fasci-di-rette', titolo: 'Fasci di rette (cenni)', testo: R`Un **fascio di rette** è un insieme infinito di rette che hanno tutte una proprietà in comune. Se ne studiano due tipi.

Il **fascio proprio** è l'insieme di tutte le rette che passano per uno stesso punto $P_0(x_0; y_0)$, il **centro** del fascio:

>* **Fascio proprio di centro $P_0(x_0; y_0)$:** $$y - y_0 = m(x - x_0), \qquad m \in \mathbb{R}$$ Al variare di $m$ si ottengono tutte le rette per $P_0$, tranne una: manca la retta **verticale** $x = x_0$, che non ha coefficiente angolare e va aggiunta a parte.

Il **fascio improprio** è l'insieme di tutte le rette **parallele** a una direzione data, cioè con lo stesso coefficiente angolare $m$ fissato:

>* **Fascio improprio di direzione $m$:** $$y = mx + k, \qquad k \in \mathbb{R}$$ Al variare di $k$ le rette scorrono parallele, senza mai incontrarsi (si dice che si incontrano "all'infinito", da cui il nome improprio).

Per esempio, l'equazione $y - 2 = m(x - 1)$ rappresenta tutte le rette per $(1; 2)$: con $m = 0$ si ha la retta orizzontale $y = 2$, con $m = 1$ la retta $y = x + 1$, e così via, tranne la verticale $x = 1$.

> A questo livello basta riconoscere i due fasci e scrivere la loro equazione: il loro uso per trovare rette con condizioni particolari si approfondisce più avanti.` }
  ],

  grafici: {
    esplicita: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      funzioni: [{ f: 'm*x + q', etichetta: 'y = mx + q', colore: 1 }],
      punti: [{ x: 0, y: 'q', etichetta: '(0; q)', posizione: 'destra', colore: 2 }],
      parametri: [
        { nome: 'm', min: -3, max: 3, passo: 0.1, valore: 1, etichetta: 'm' },
        { nome: 'q', min: -4, max: 4, passo: 0.5, valore: 1, etichetta: 'q' }
      ],
      didascalia: 'Muovi m e q: m ruota la retta, q la trasla lungo l\'asse y. Il punto (0; q) è dove la retta taglia l\'asse y.'
    },
    duePunti: {
      tipo: 'piano', x: [-6, 6], y: [-6, 6],
      parametri: [
        { nome: 'xa', min: -5, max: 5, passo: 0.5, valore: -3, nascosto: true },
        { nome: 'ya', min: -5, max: 5, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'xb', min: -5, max: 5, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'yb', min: -5, max: 5, passo: 0.5, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'retta', per: [['xa', 'ya'], ['xb', 'yb']], etichetta: 'r', colore: 1 },
        { tipo: 'punto', p: ['xa', 'ya'], trascina: true, etichetta: 'A', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'punto', p: ['xb', 'yb'], trascina: true, etichetta: 'B', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-5.7, 5.3], testo: 'm = {{(yb-ya)/(xb-xa)}}     AB = {{sqrt((xb-xa)^2+(yb-ya)^2)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B: si ricalcolano il coefficiente angolare della retta AB e la distanza fra i due punti.'
    },
    perpendicolari: {
      tipo: 'piano', x: [-4, 4], y: [-6, 6],
      elementi: [
        { tipo: 'retta', m: 2, q: 0, etichetta: 'r: y = 2x', colore: 1 },
        { tipo: 'retta', m: -0.5, q: 0, etichetta: 's: y = −x/2', colore: 3 },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 2], a: [-2, 1], etichetta: '90°', raggio: 0.7, colore: 2 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso-destra', colore: 4 }
      ],
      didascalia: 'r ha m₁ = 2, s ha m₂ = −1/2: m₁ · m₂ = −1, quindi le due rette sono perpendicolari.'
    },
    distanzaRetta: {
      tipo: 'piano', x: [-2, 6], y: [-2, 7],
      funzioni: [{ f: '(3*x+1)/4', etichetta: 'r: 3x − 4y + 1 = 0', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: [1, 5], etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'punto', p: [2.92, 2.44], etichetta: 'H', posizione: 'basso-destra', colore: 4 },
        { tipo: 'segmento', da: [1, 5], a: [2.92, 2.44], etichetta: 'd', tratteggio: true, colore: 3 }
      ],
      didascalia: 'H è il piede della perpendicolare da P a r: il segmento PH, lungo 16/5 = 3,2, è la distanza di P dalla retta.'
    },
    baricentro: {
      tipo: 'piano', x: [-6, 6], y: [-4, 6],
      elementi: [
        { tipo: 'poligono', punti: [[-4, -2], [4, -2], [0, 4]], etichette: ['A', 'B', 'C'], riempi: true },
        { tipo: 'segmento', da: [-4, -2], a: [2, 1], colore: 2 },
        { tipo: 'segmento', da: [4, -2], a: [-2, 1], colore: 3 },
        { tipo: 'segmento', da: [0, 4], a: [0, -2], colore: 4 },
        { tipo: 'punto', p: [0, 0], etichetta: 'G', posizione: 'basso-destra', colore: 1 }
      ],
      didascalia: 'A(−4; −2), B(4; −2), C(0; 4): le tre mediane si incontrano nel baricentro G(0; 0), media delle coordinate dei vertici.'
    }
  },

  esempi: [
    { titolo: 'Distanza fra due punti', problema: R`Calcola la distanza fra $A(1; -2)$ e $B(5; 1)$.`, passi: [
      R`Calcolo le differenze: $\Delta x = 5 - 1 = 4$, $\Delta y = 1 - (-2) = 3$.`,
      R`Applico il teorema di Pitagora: $\overline{AB} = \sqrt{4^2 + 3^2} = \sqrt{16 + 9} = \sqrt{25} = 5$.`
    ], risultato: R`$\overline{AB} = 5$` },

    { titolo: 'Punto medio e baricentro', problema: R`Dati $A(-1; 2)$, $B(5; -2)$ e $C(2; 6)$, trova il punto medio di $AB$ e il baricentro del triangolo $ABC$.`, passi: [
      R`Punto medio di $AB$: $M\left(\dfrac{-1+5}{2}; \dfrac{2-2}{2}\right) = M(2; 0)$.`,
      R`Baricentro: $G\left(\dfrac{-1+5+2}{3}; \dfrac{2-2+6}{3}\right) = G\left(\dfrac{6}{3}; \dfrac{6}{3}\right) = G(2; 2)$.`
    ], risultato: R`$M(2; 0)$, $G(2; 2)$` },

    { titolo: 'Equazione della retta per due punti', problema: R`Scrivi l'equazione della retta passante per $A(-3; 1)$ e $B(1; 5)$.`, passi: [
      R`Calcolo il coefficiente angolare: $m = \dfrac{5 - 1}{1 - (-3)} = \dfrac{4}{4} = 1$.`,
      R`Uso $y - y_A = m(x - x_A)$ con $A(-3; 1)$: $y - 1 = 1 \cdot (x + 3)$, cioè $y = x + 4$.`,
      R`Verifico con $B(1; 5)$: $y = 1 + 4 = 5$. ✓`
    ], risultato: R`$y = x + 4$` },

    { titolo: 'Retta perpendicolare a una retta data', problema: R`Data la retta $r: y = \dfrac{1}{2}x + 1$, scrivi l'equazione della retta perpendicolare a $r$ passante per $P(2; 3)$.`, passi: [
      R`Il coefficiente angolare di $r$ è $m_1 = \dfrac{1}{2}$; quello della perpendicolare è $m_2 = -\dfrac{1}{m_1} = -2$.`,
      R`Scrivo la retta per $P(2; 3)$ con $m_2 = -2$: $y - 3 = -2(x - 2)$, cioè $y = -2x + 7$.`,
      R`Verifico la perpendicolarità: $m_1 \cdot m_2 = \dfrac{1}{2} \cdot (-2) = -1$. ✓`
    ], risultato: R`$y = -2x + 7$` },

    { titolo: 'Intersezione di due rette', problema: R`Trova il punto di intersezione fra $r: y = 2x - 3$ e $s: y = -x + 3$.`, passi: [
      R`Uguaglio i due secondi membri: $2x - 3 = -x + 3 \Rightarrow 3x = 6 \Rightarrow x = 2$.`,
      R`Sostituisco in $r$: $y = 2 \cdot 2 - 3 = 1$.`,
      R`Verifico in $s$: $y = -2 + 3 = 1$. ✓ Le rette si incontrano in $(2; 1)$.`
    ], risultato: R`$(2; 1)$` },

    { titolo: 'Distanza di un punto da una retta', problema: R`Calcola la distanza del punto $P(1; 5)$ dalla retta $r: 3x - 4y + 1 = 0$.`, passi: [
      R`Individuo i coefficienti della forma implicita: $a = 3$, $b = -4$, $c = 1$.`,
      R`Sostituisco le coordinate di $P$ nel numeratore: $|3 \cdot 1 - 4 \cdot 5 + 1| = |3 - 20 + 1| = 16$.`,
      R`Calcolo il denominatore: $\sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.`,
      R`$d(P, r) = \dfrac{16}{5} = 3{,}2$.`
    ], risultato: R`$d(P, r) = \dfrac{16}{5} = 3{,}2$` }
  ],

  formulario: [
    { nome: 'Distanza fra due punti', formula: R`\overline{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}` },
    { nome: 'Punto medio', formula: R`M\left(\dfrac{x_A + x_B}{2};\ \dfrac{y_A + y_B}{2}\right)` },
    { nome: 'Baricentro del triangolo', formula: R`G\left(\dfrac{x_A + x_B + x_C}{3};\ \dfrac{y_A + y_B + y_C}{3}\right)` },
    { nome: 'Equazione implicita della retta', formula: R`ax + by + c = 0`, nota: R`$a$ e $b$ non entrambi nulli.` },
    { nome: 'Equazione esplicita della retta', formula: R`y = mx + q`, nota: R`Esiste solo se la retta non è verticale, cioè se $b \ne 0$.` },
    { nome: 'Retta parallela all\'asse x', formula: R`y = k` },
    { nome: 'Retta parallela all\'asse y', formula: R`x = k`, nota: R`Non ha coefficiente angolare né forma esplicita.` },
    { nome: 'Coefficiente angolare fra due punti', formula: R`m = \dfrac{y_B - y_A}{x_B - x_A}`, nota: R`Richiede $x_A \ne x_B$.` },
    { nome: 'Retta per un punto con $m$ noto', formula: R`y - y_0 = m(x - x_0)` },
    { nome: 'Retta per due punti', formula: R`m = \dfrac{y_B - y_A}{x_B - x_A}, \qquad y - y_A = m(x - x_A)` },
    { nome: 'Condizione di parallelismo', formula: R`m_1 = m_2` },
    { nome: 'Condizione di perpendicolarità', formula: R`m_1 \cdot m_2 = -1` },
    { nome: 'Distanza punto-retta', formula: R`d(P, r) = \dfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}` },
    { nome: 'Fascio proprio di centro $P_0(x_0; y_0)$', formula: R`y - y_0 = m(x - x_0)`, nota: R`Manca la retta verticale $x = x_0$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'coordinate-piano', tipo: 'definizione', fronte: R`Cosa sono ascissa e ordinata?`, retro: R`In un punto $P(x; y)$, $x$ è l'ascissa (posizione rispetto all'asse orizzontale), $y$ è l'ordinata (posizione rispetto all'asse verticale).` },
    { id: 'fc-02', sezione: 'coordinate-piano', tipo: 'concetto', fronte: R`Segni delle coordinate nei quattro quadranti`, retro: R`I: $(+,+)$. II: $(-,+)$. III: $(-,-)$. IV: $(+,-)$, numerati in senso antiorario a partire da quello in alto a destra.` },
    { id: 'fc-03', sezione: 'coordinate-piano', tipo: 'concetto', fronte: R`Dove sta un punto con $y = 0$?`, retro: R`Sull'asse $x$. Analogamente, $x = 0$ vuol dire punto sull'asse $y$.` },
    { id: 'fc-04', sezione: 'distanza-punto-medio', tipo: 'formula', fronte: R`Formula della distanza fra due punti`, retro: R`$\overline{AB} = \sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$.` },
    { id: 'fc-05', sezione: 'distanza-punto-medio', tipo: 'formula', fronte: R`Formula del punto medio`, retro: R`$M\left(\dfrac{x_A+x_B}{2};\dfrac{y_A+y_B}{2}\right)$: media delle ascisse e media delle ordinate.` },
    { id: 'fc-06', sezione: 'distanza-punto-medio', tipo: 'formula', fronte: R`Formula del baricentro di un triangolo`, retro: R`$G\left(\dfrac{x_A+x_B+x_C}{3};\dfrac{y_A+y_B+y_C}{3}\right)$: media delle coordinate dei tre vertici.` },
    { id: 'fc-07', sezione: 'distanza-punto-medio', tipo: 'concetto', fronte: R`Cos'è il baricentro di un triangolo?`, retro: R`Il punto in cui si incontrano le tre mediane; divide ciascuna mediana in due parti, quella verso il vertice doppia dell'altra.` },
    { id: 'fc-08', sezione: 'equazione-retta', tipo: 'definizione', fronte: R`Forma implicita della retta`, retro: R`$ax+by+c=0$, con $a$ e $b$ non entrambi nulli.` },
    { id: 'fc-09', sezione: 'equazione-retta', tipo: 'definizione', fronte: R`Forma esplicita della retta`, retro: R`$y=mx+q$, possibile solo se $b\ne0$ (la retta non è verticale).` },
    { id: 'fc-10', sezione: 'equazione-retta', tipo: 'concetto', fronte: R`Equazione di una retta parallela all'asse $x$`, retro: R`$y=k$: è orizzontale, ha $m=0$.` },
    { id: 'fc-11', sezione: 'equazione-retta', tipo: 'concetto', fronte: R`Equazione di una retta parallela all'asse $y$`, retro: R`$x=k$: è verticale, non ha coefficiente angolare né forma esplicita.` },
    { id: 'fc-12', sezione: 'equazione-retta', tipo: 'concetto', fronte: R`Quando una retta passa per l'origine?`, retro: R`Quando $c=0$ nella forma implicita, cioè $q=0$ nella forma esplicita: $y=mx$.` },
    { id: 'fc-13', sezione: 'coefficiente-angolare', tipo: 'definizione', fronte: R`Definizione di coefficiente angolare`, retro: R`$m=\dfrac{\Delta y}{\Delta x}=\dfrac{y_B-y_A}{x_B-x_A}$, calcolato con due punti qualsiasi della retta.` },
    { id: 'fc-14', sezione: 'coefficiente-angolare', tipo: 'concetto', fronte: R`Cosa indica il segno di $m$?`, retro: R`$m>0$: retta crescente. $m<0$: retta decrescente. $m=0$: retta orizzontale.` },
    { id: 'fc-15', sezione: 'coefficiente-angolare', tipo: 'concetto', fronte: R`Perché una retta verticale non ha coefficiente angolare?`, retro: R`Perché $\Delta x=0$ per ogni coppia di suoi punti, e il rapporto $\Delta y/\Delta x$ non è definito.` },
    { id: 'fc-16', sezione: 'retta-punto-e-due-punti', tipo: 'formula', fronte: R`Retta per un punto $P_0(x_0;y_0)$ con $m$ noto`, retro: R`$y-y_0=m(x-x_0)$.` },
    { id: 'fc-17', sezione: 'retta-punto-e-due-punti', tipo: 'procedura', fronte: R`Come si scrive la retta per due punti $A$ e $B$?`, retro: R`Si calcola $m=\dfrac{y_B-y_A}{x_B-x_A}$, poi si scrive $y-y_A=m(x-x_A)$.` },
    { id: 'fc-18', sezione: 'parallele-perpendicolari', tipo: 'formula', fronte: R`Condizione di parallelismo fra due rette`, retro: R`$m_1=m_2$.` },
    { id: 'fc-19', sezione: 'parallele-perpendicolari', tipo: 'formula', fronte: R`Condizione di perpendicolarità fra due rette`, retro: R`$m_1\cdot m_2=-1$, cioè $m_2=-\dfrac{1}{m_1}$.` },
    { id: 'fc-20', sezione: 'parallele-perpendicolari', tipo: 'concetto', fronte: R`Una verticale e un'orizzontale sono perpendicolari?`, retro: R`Sì, sempre: ma la formula $m_1 m_2=-1$ non si applica, perché la verticale non ha coefficiente angolare.` },
    { id: 'fc-21', sezione: 'intersezione-rette', tipo: 'procedura', fronte: R`Come si trova il punto di intersezione fra due rette?`, retro: R`Si risolve il sistema formato dalle due equazioni; se sono in forma esplicita, si uguagliano i secondi membri.` },
    { id: 'fc-22', sezione: 'intersezione-rette', tipo: 'concetto', fronte: R`Sistema senza soluzioni: cosa significa per le due rette?`, retro: R`Le rette sono parallele e distinte ($m_1=m_2$, $q_1\ne q_2$): non hanno punti in comune.` },
    { id: 'fc-23', sezione: 'distanza-punto-retta', tipo: 'formula', fronte: R`Formula della distanza di un punto da una retta`, retro: R`$d(P,r)=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$, con la retta in forma implicita.` },
    { id: 'fc-24', sezione: 'fasci-di-rette', tipo: 'definizione', fronte: R`Differenza fra fascio proprio e improprio`, retro: R`Proprio: tutte le rette per uno stesso punto, $y-y_0=m(x-x_0)$. Improprio: tutte le rette parallele a una direzione data, $y=mx+k$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola la distanza fra i punti $A(-2; 3)$ e $B(4; -5)$.`, suggerimenti: [R`Applica il teorema di Pitagora ai cateti $\Delta x$ e $\Delta y$.`, R`$\Delta x = 4-(-2)=6$, $\Delta y=-5-3=-8$.`], risposta: { tipo: 'numero', valore: 10, tolleranza: 0.01 }, soluzione: [R`$\Delta x = 4-(-2)=6$, $\Delta y=-5-3=-8$.`, R`$\overline{AB}=\sqrt{6^2+(-8)^2}=\sqrt{36+64}=\sqrt{100}=10$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Trova il punto medio del segmento di estremi $A(1; -3)$ e $B(5; 7)$. Scrivi le sue coordinate nella forma x; y.`, suggerimenti: [R`Il punto medio ha per coordinate la media delle coordinate degli estremi.`, R`Calcola separatamente la media delle ascisse e quella delle ordinate.`], risposta: { tipo: 'numeri', valori: [3, 2] }, soluzione: [R`$x_M=\dfrac{1+5}{2}=3$.`, R`$y_M=\dfrac{-3+7}{2}=2$.`, R`$M(3; 2)$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Trova il baricentro del triangolo di vertici $A(-3; 0)$, $B(3; 0)$, $C(0; 9)$.`, suggerimenti: [R`Il baricentro è la media delle coordinate dei tre vertici.`, R`Somma le tre ascisse e dividi per 3; fai lo stesso con le ordinate.`], risposta: { tipo: 'numeri', valori: [0, 3] }, soluzione: [R`$x_G=\dfrac{-3+3+0}{3}=0$.`, R`$y_G=\dfrac{0+0+9}{3}=3$.`, R`$G(0; 3)$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Scrivi l'equazione della retta passante per l'origine con coefficiente angolare $m=3$.`, suggerimenti: [R`Una retta per l'origine ha $q=0$.`, R`Usa $y=mx$.`], risposta: { tipo: 'testo', accettate: ['y=3x', 'y = 3x', '3x-y=0'] }, soluzione: [R`Passando per l'origine, $q=0$: $y=mx+0=mx$.`, R`Con $m=3$: $y=3x$.`] },

    { id: 'es-05', difficolta: 2, testo: R`Scrivi l'equazione della retta passante per $P(2; -1)$ con coefficiente angolare $m=-2$.`, suggerimenti: [R`Usa $y-y_0=m(x-x_0)$ con $P_0=P$.`, R`Sviluppa e isola $y$.`], risposta: { tipo: 'testo', accettate: ['y=-2x+3', 'y = -2x + 3', 'y = −2x + 3', '2x+y-3=0'] }, soluzione: [R`$y-(-1)=-2(x-2)$.`, R`$y+1=-2x+4$.`, R`$y=-2x+3$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Scrivi l'equazione della retta passante per $A(1; 2)$ e $B(3; 8)$.`, suggerimenti: [R`Calcola prima $m$ con la formula del coefficiente angolare.`, R`Poi usa $y-y_A=m(x-x_A)$.`], risposta: { tipo: 'testo', accettate: ['y=3x-1', 'y = 3x - 1', 'y = 3x − 1', '3x-y-1=0'] }, soluzione: [R`$m=\dfrac{8-2}{3-1}=\dfrac{6}{2}=3$.`, R`$y-2=3(x-1)$.`, R`$y=3x-1$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Trova il coefficiente angolare della retta perpendicolare a $y=\dfrac{2}{3}x-1$.`, suggerimenti: [R`Usa $m_2=-\dfrac{1}{m_1}$.`, R`$m_1=\dfrac{2}{3}$: il suo reciproco è $\dfrac{3}{2}$.`], risposta: { tipo: 'numero', valore: -1.5, tolleranza: 0.01 }, soluzione: [R`$m_1=\dfrac{2}{3}$.`, R`$m_2=-\dfrac{1}{m_1}=-\dfrac{3}{2}=-1{,}5$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Trova il punto di intersezione fra le rette $y=2x-1$ e $y=-x+8$.`, suggerimenti: [R`Uguaglia i due secondi membri.`, R`Risolvi prima per $x$, poi sostituisci per trovare $y$.`], risposta: { tipo: 'numeri', valori: [3, 5] }, soluzione: [R`$2x-1=-x+8 \Rightarrow 3x=9 \Rightarrow x=3$.`, R`$y=2\cdot3-1=5$.`, R`$(3; 5)$.`] },

    { id: 'es-09', difficolta: 3, testo: R`Calcola la distanza del punto $P(4; 1)$ dalla retta $3x+4y-12=0$.`, suggerimenti: [R`La retta è già in forma implicita: individua $a$, $b$, $c$.`, R`Applica $d=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`], risposta: { tipo: 'numero', valore: 0.8, tolleranza: 0.01 }, soluzione: [R`$a=3$, $b=4$, $c=-12$.`, R`$d=\dfrac{|3\cdot4+4\cdot1-12|}{\sqrt{3^2+4^2}}=\dfrac{|12+4-12|}{5}=\dfrac{4}{5}=0{,}8$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Dati $A(-1; -1)$, $B(5; -1)$, $C(2; 5)$, stabilisci se il triangolo $ABC$ è isoscele, calcolando i tre lati.`, suggerimenti: [R`Calcola $\overline{AB}$, $\overline{AC}$ e $\overline{BC}$ con la formula della distanza.`, R`Confronta i tre valori: due lati uguali bastano per dire che è isoscele.`], soluzione: [R`$\overline{AB}=\sqrt{(5-(-1))^2+(-1-(-1))^2}=\sqrt{36}=6$.`, R`$\overline{AC}=\sqrt{(2-(-1))^2+(5-(-1))^2}=\sqrt{9+36}=\sqrt{45}=3\sqrt5$.`, R`$\overline{BC}=\sqrt{(2-5)^2+(5-(-1))^2}=\sqrt{9+36}=\sqrt{45}=3\sqrt5$.`, R`$\overline{AC}=\overline{BC}$: il triangolo è isoscele sulla base $AB$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`In quale quadrante si trova un punto con $x<0$ e $y<0$?`, opzioni: [R`Terzo quadrante`, R`Primo quadrante`, R`Secondo quadrante`, R`Quarto quadrante`], corretta: 0, spiegazione: R`Il terzo quadrante raccoglie i punti con entrambe le coordinate negative; i quadranti si numerano in senso antiorario a partire da quello con coordinate entrambe positive.` },
    { id: 'q-02', domanda: R`Un punto ha ascissa $x=0$. Dove si trova?`, opzioni: [R`Sull'asse $x$`, R`Sull'asse $y$`, R`Nell'origine, sempre`, R`In nessun quadrante ma non necessariamente sugli assi`], corretta: 1, spiegazione: R`Ascissa nulla significa che il punto sta sull'asse delle ordinate (asse $y$), qualunque sia $y$; sta nell'origine solo se anche $y=0$.` },
    { id: 'q-03', domanda: R`Quale delle seguenti è la formula corretta della distanza fra $A(x_A;y_A)$ e $B(x_B;y_B)$?`, opzioni: [R`$(x_B-x_A)+(y_B-y_A)$`, R`$\sqrt{x_B^2+y_B^2}$`, R`$\dfrac{x_B-x_A}{y_B-y_A}$`, R`$\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$`], corretta: 3, spiegazione: R`È il teorema di Pitagora applicato ai cateti $\Delta x$ e $\Delta y$: le altre opzioni non corrispondono a nessuna proprietà della distanza.` },
    { id: 'q-04', domanda: R`Il punto medio di $A(2;6)$ e $B(8;2)$ è…`, opzioni: [R`$(3;4)$`, R`$(10;8)$`, R`$(5;4)$`, R`$(6;3)$`], corretta: 2, spiegazione: R`$M=\left(\dfrac{2+8}{2};\dfrac{6+2}{2}\right)=(5;4)$: media delle ascisse e media delle ordinate, non la loro somma.` },
    { id: 'q-05', domanda: R`Il baricentro di un triangolo è…`, opzioni: [R`la media delle coordinate dei tre vertici`, R`il punto medio di uno dei lati`, R`il punto di intersezione delle altezze`, R`sempre l'origine degli assi`], corretta: 0, spiegazione: R`Si ottiene mediando le coordinate di $A$, $B$ e $C$; è anche il punto in cui si incontrano le tre mediane, non le altezze.` },
    { id: 'q-06', domanda: R`Perché una retta verticale non si può scrivere in forma esplicita $y=mx+q$?`, opzioni: [R`Perché ha $q=0$`, R`Perché ha $m=0$`, R`Perché non ha equazione`, R`Perché non esiste il coefficiente angolare $m$ per una retta verticale`], corretta: 3, spiegazione: R`La forma esplicita richiede di isolare $y$, possibile solo se $b\ne0$; una retta verticale ($x=k$) non ha $y$ nell'equazione.` },
    { id: 'q-07', domanda: R`Una retta ha equazione implicita $ax+by+c=0$ con $c=0$. Che cosa significa?`, opzioni: [R`È parallela all'asse $x$`, R`Passa per l'origine`, R`È verticale`, R`Ha coefficiente angolare nullo`], corretta: 1, spiegazione: R`Con $c=0$, sostituendo $x=0$ si ottiene $by=0$ cioè $y=0$ (se $b\ne0$): l'origine soddisfa l'equazione.` },
    { id: 'q-08', domanda: R`Il coefficiente angolare $m$ di una retta rappresenta…`, opzioni: [R`l'ordinata del punto in cui la retta taglia l'asse $y$`, R`la distanza della retta dall'origine`, R`di quanto varia $y$ per ogni unità di aumento di $x$`, R`l'ascissa del punto in cui la retta taglia l'asse $x$`], corretta: 2, spiegazione: R`$m=\Delta y/\Delta x$: è il tasso di variazione di $y$ rispetto a $x$. Il primo distrattore descrive $q$, non $m$.` },
    { id: 'q-09', domanda: R`Se $m<0$, la retta $y=mx+q$…`, opzioni: [R`è decrescente: scende da sinistra a destra`, R`è crescente`, R`è orizzontale`, R`è parallela all'asse $y$`], corretta: 0, spiegazione: R`Un coefficiente angolare negativo vuol dire che $y$ diminuisce quando $x$ aumenta: la retta scende.` },
    { id: 'q-10', domanda: R`Perché $\dfrac{\Delta y}{\Delta x}$ non è definito per una retta verticale?`, opzioni: [R`Perché $\Delta y=0$ sempre`, R`Perché il rapporto darebbe sempre $1$`, R`Perché servono tre punti, non due`, R`Perché $\Delta x=0$ per ogni coppia di punti della retta, e non si può dividere per $0$`], corretta: 3, spiegazione: R`Su una retta verticale tutti i punti hanno la stessa ascissa, quindi $\Delta x = 0$ per qualunque coppia scelta.` },
    { id: 'q-11', domanda: R`Due rette con $m_1=m_2$ e $q_1\ne q_2$ sono…`, opzioni: [R`perpendicolari`, R`parallele e distinte`, R`coincidenti`, R`incidenti in un solo punto`], corretta: 1, spiegazione: R`Stessa pendenza ma diversa intercetta: le rette non si incontrano mai. Se anche $q_1=q_2$ sarebbero coincidenti.` },
    { id: 'q-12', domanda: R`Quale coppia di coefficienti angolari corrisponde a rette perpendicolari?`, opzioni: [R`$m_1=2$, $m_2=2$`, R`$m_1=2$, $m_2=\dfrac{1}{2}$`, R`$m_1=2$, $m_2=-\dfrac{1}{2}$`, R`$m_1=-2$, $m_2=-\dfrac{1}{2}$`], corretta: 2, spiegazione: R`$2\cdot\left(-\dfrac12\right)=-1$: prodotto $-1$, condizione di perpendicolarità. Nelle altre il prodotto vale $4$, $1$ o $1$.` },
    { id: 'q-13', domanda: R`Un sistema fra le equazioni di due rette ha infinite soluzioni. Cosa significa?`, opzioni: [R`Le due equazioni descrivono la stessa retta`, R`Le rette sono parallele distinte`, R`Le rette sono perpendicolari`, R`Non esiste alcuna retta con quell'equazione`], corretta: 0, spiegazione: R`Infinite soluzioni vogliono dire che ogni punto che soddisfa una equazione soddisfa anche l'altra: sono la stessa retta scritta in due modi.` },
    { id: 'q-14', domanda: R`Nella formula $d(P,r)=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$, cosa succede se $P$ appartiene a $r$?`, opzioni: [R`La formula non si può applicare`, R`Il denominatore si annulla`, R`La distanza diventa negativa`, R`Il numeratore vale $0$ e quindi $d=0$`], corretta: 3, spiegazione: R`Se $P$ sta sulla retta, le sue coordinate soddisfano $ax_0+by_0+c=0$: il numeratore è nullo e la distanza, correttamente, è $0$.` },
    { id: 'q-15', domanda: R`Che cos'è un fascio proprio di rette?`, opzioni: [R`L'insieme di tutte le rette parallele a una direzione data`, R`L'insieme di tutte le rette che passano per uno stesso punto`, R`L'insieme delle rette con lo stesso $q$`, R`L'insieme delle rette con $m=0$`], corretta: 1, spiegazione: R`"Proprio" indica un centro reale, un punto comune a tutte le rette del fascio; le rette parallele fra loro formano invece il fascio improprio.` },
    { id: 'q-16', domanda: R`Nell'equazione del fascio proprio $y-y_0=m(x-x_0)$, quale retta per $P_0$ manca?`, opzioni: [R`La retta orizzontale $y=y_0$`, R`Nessuna: sono comprese tutte`, R`La retta verticale $x=x_0$`, R`La retta con $m=1$`], corretta: 2, spiegazione: R`La retta orizzontale corrisponde a $m=0$ ed è compresa; quella verticale non ha coefficiente angolare e va aggiunta a parte.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di applicare qualunque formula, scrivi con chiarezza le coordinate dei punti o l'equazione della retta: $A(x_A;y_A)$, $B(x_B;y_B)$, oppure $ax+by+c=0$. Metà degli errori nasce da un segno letto di fretta.` },
    { tipo: 'errore', testo: R`Il coefficiente angolare è $\dfrac{\Delta y}{\Delta x}$, cioè (differenza delle ordinate) diviso (differenza delle ascisse): invertire numeratore e denominatore dà il reciproco della pendenza vera, non la pendenza.` },
    { tipo: 'errore', testo: R`Per la perpendicolare non basta cambiare segno, e non basta nemmeno fare il reciproco: servono entrambe le operazioni insieme. Da $m_1=\dfrac{2}{3}$ la perpendicolare ha $m_2=-\dfrac{3}{2}$, non $-\dfrac23$ né $\dfrac32$.` },
    { tipo: 'trucco', testo: R`Controllo lampo su una retta trovata per due punti: sostituisci entrambi i punti nell'equazione trovata. Se anche uno solo non torna, c'è un errore nel calcolo di $m$ o di $q$.` },
    { tipo: 'metodo', testo: R`Prima di mettere a sistema due rette per trovarne l'intersezione, controlla se hanno lo stesso coefficiente angolare: se $m_1=m_2$ non serve risolvere nulla, sono parallele (o coincidenti se anche $q_1=q_2$).` },
    { tipo: 'errore', testo: R`Nella formula della distanza punto-retta la retta va in forma implicita $ax+by+c=0$. Partendo da $y=mx+q$, riscrivila come $mx-y+q=0$ prima di sostituire $a$, $b$, $c$: usare direttamente $m$ e $q$ al posto di $a$ e $b$ è un errore frequente.` },
    { tipo: 'trucco', testo: R`Se un problema chiede una lunghezza, un'area o una dimensione, e trovi una soluzione negativa, quasi sempre va scartata: nel piano cartesiano le coordinate possono essere negative, ma le misure geometriche no.` },
    { tipo: 'metodo', testo: R`Per stabilire se un triangolo ha un angolo retto, confronta i coefficienti angolari dei lati (deve valere $m_1 \cdot m_2=-1$ per due di essi); per stabilire se è isoscele, confronta le lunghezze dei lati con la formula della distanza.` }
  ],

  aneddoti: [
    { matematico: 'Nicole Oresme', anni: 'circa 1320–1382', titolo: 'Il grafico medievale prima di Cartesio', testo: R`Tre secoli prima della *Géométrie* di Descartes, il filosofo e vescovo normanno Nicole Oresme insegnava a Parigi un modo per disegnare le grandezze che cambiano. Nel suo *Tractatus de configurationibus qualitatum et motuum* rappresentava ogni istante di una grandezza (per esempio la velocità di un corpo) con un segmento verticale, la "latitudine", innalzato su una base orizzontale, la "longitudine": i punti più alti del disegno corrispondevano ai valori maggiori. Con questa tecnica arrivò a mostrare, con un disegno, che un corpo che accelera in modo uniforme percorre la stessa distanza di uno che si muove a velocità costante pari alla media: un teorema che oggi si dimostra con l'area sotto un grafico velocità-tempo. Oresme non aveva assi perpendicolari né equazioni, ma l'idea di una grandezza rappresentata da un'altezza su un piano era già la sua.`, legame: R`L'idea di Oresme, un'altezza (ordinata) sopra una base (ascissa), è il seme del piano cartesiano: mancano solo gli assi fissi e le equazioni per farne la geometria analitica.` },
    { matematico: 'René Descartes', anni: '1596–1650', titolo: 'Il piano nato in appendice, non da una mosca', testo: R`Si racconta che a Descartes venne l'idea del piano cartesiano osservando una mosca volare sul soffitto mentre restava a letto fino a tardi, come amava fare: è un aneddoto senza fonti nei suoi scritti, quasi certamente una leggenda nata più tardi. Il fatto documentato è diverso: nel 1637 Descartes pubblicò il *Discorso sul metodo*, un trattato di filosofia, con tre appendici scientifiche che dovevano mostrarne il metodo all'opera; una di queste, *La Géométrie*, traduceva i problemi di geometria in equazioni algebriche. Non è nemmeno il testo in cui compare per la prima volta il sistema a due assi perpendicolari come lo usiamo oggi: Descartes lavorava soprattutto con un solo asse orizzontale, e furono altri, nei decenni successivi, a fissare la forma che si studia ora a scuola.`, legame: R`Da *La Géométrie* viene il nome "piano cartesiano" e l'idea centrale di questo argomento: tradurre una retta in un'equazione algebrica, e viceversa.` },
    { matematico: 'Pierre de Fermat', anni: '1601–1665', titolo: 'Lo stesso metodo, pubblicato quarant\'anni dopo', testo: R`Mentre Descartes scriveva *La Géométrie*, l'avvocato e magistrato Pierre de Fermat arrivava per conto suo, senza saperlo, alla stessa idea: usare equazioni per descrivere le figure geometriche. Il suo lavoro, l'*Ad locos planos et solidos isagoge* (Introduzione ai luoghi piani e solidi), circolava già in copie manoscritte fra i matematici francesi verso il 1636, ma Fermat, come faceva spesso, non lo pubblicò: uscì a stampa solo nel 1679, quattordici anni dopo la sua morte, curato dal figlio Samuel. Nel testo Fermat afferma con chiarezza che, se un'equazione contiene due incognite di primo grado, essa descrive una retta: è una delle prime formulazioni scritte di quello che oggi chiamiamo, semplicemente, "l'equazione della retta".`, legame: R`L'osservazione di Fermat, un'equazione di primo grado in due incognite è sempre una retta, è esattamente il punto di partenza di questo argomento.` },
    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'Le parole che Cartesio non usò mai', testo: R`Cartesio inventò il metodo, ma non il vocabolario con cui lo studiamo oggi: nei suoi scritti non compaiono le parole "ascissa", "ordinata" o "coordinate". Fu Gottfried Wilhelm Leibniz, alla fine del Seicento, a fissare questi termini nel senso moderno: in uno scritto del 1692 usa la parola latina *coordinatae* per indicare la coppia di numeri che individua un punto. Leibniz, filosofo e matematico instancabile (inventò anche, in parallelo e in polemica con Newton, il calcolo differenziale), amava costruire un linguaggio preciso per ogni idea nuova: "ascissa" viene dal latino *linea abscissa*, la linea tagliata sull'asse, "ordinata" da *linea ordinata*, la linea disposta in un certo ordine.`, legame: R`Ogni volta che si scrive "ascissa" o "ordinata" si usa il vocabolario fissato da Leibniz, non quello di Descartes: il piano cartesiano porta il nome dell'uno, le parole dell'altro.` }
  ]
});
})();
