(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'piano-cartesiano-retta',
  titolo: 'Piano cartesiano e retta',

  introduzione: R`Un taxi costa $3$ euro alla partenza più $1{,}50$ euro per ogni chilometro. Dopo $x$ chilometri il prezzo è $y = 1{,}5x + 3$. Se segni su un foglio a quadretti i punti $(x; y)$ per $x = 0, 1, 2, 3, \ldots$, li trovi tutti allineati: l'equazione disegna una **retta**.

Il **piano cartesiano** serve proprio a questo. Con due assi perpendicolari ogni punto diventa una coppia di numeri, le sue coordinate, e ogni retta diventa un'equazione di primo grado in $x$ e $y$. Così le domande di geometria si risolvono con i conti: quanto sono lontani due punti, se due rette sono perpendicolari, dove si incontrano.

Servono le equazioni di primo grado e i sistemi lineari: dove due rette si incontrano c'è sempre un sistema da risolvere.`,

  inBreve: [
    R`Un punto si scrive $P(x; y)$: prima l'ascissa, che dice quanto andare a destra o a sinistra, poi l'ordinata, che dice quanto salire o scendere.`,
    R`La distanza fra due punti è Pitagora sui cateti $\Delta x$ e $\Delta y$; il punto medio si trova facendo la media delle ascisse e la media delle ordinate.`,
    R`In $y = mx + q$, $q$ è dove la retta taglia l'asse $y$ e $m$ è quanto sale la retta per ogni passo verso destra: $m = \dfrac{\Delta y}{\Delta x}$.`,
    R`Le rette verticali, $x = k$, non hanno coefficiente angolare e non si scrivono nella forma $y = mx + q$.`,
    R`Rette parallele hanno lo stesso $m$; rette perpendicolari hanno $m_1 \cdot m_2 = -1$, cioè una ha il coefficiente opposto e reciproco dell'altra.`,
    R`Dove due rette si incontrano c'è la soluzione del sistema fra le loro equazioni; per la distanza di un punto da una retta la retta va scritta nella forma $ax + by + c = 0$.`
  ],

  sezioni: [
    { id: 'coordinate-piano', titolo: 'Le coordinate e i quadranti', testo: R`Come si spiega a qualcuno dove sta un punto su un foglio? Si fissa un punto di partenza, l'**origine** $O$, e si dice quanti passi fare verso destra (o sinistra) e quanti verso l'alto (o il basso). Le due direzioni sono due rette perpendicolari che passano per $O$: quella orizzontale è l'asse delle **ascisse**, o asse $x$; quella verticale è l'asse delle **ordinate**, o asse $y$.

Il punto $P(3; -2)$ si raggiunge partendo da $O$, facendo $3$ passi verso destra e poi $2$ verso il basso. I due numeri sono le **coordinate** di $P$: $3$ è l'ascissa, $-2$ l'ordinata.

>* Le coordinate si scrivono sempre nell'ordine (ascissa; ordinata). $P(3; -2)$ e $Q(-2; 3)$ sono due punti diversi, anche se contengono gli stessi numeri.

I due assi dividono il piano in quattro regioni, i **quadranti**, numerati in senso antiorario a partire da quello in alto a destra:

| Quadrante | segno di $x$ | segno di $y$ |
|---|---|---|
| I | + | + |
| II | − | + |
| III | − | − |
| IV | + | − |

Per esempio, $A(2; 5)$ sta nel primo quadrante, $B(-4; 1)$ nel secondo, $C(-3; -3)$ nel terzo e $D(6; -2)$ nel quarto. Contano solo i segni: anche $(-100; 5)$ sta nel secondo.

Un punto con $x = 0$ non si sposta né a destra né a sinistra, quindi sta **sull'asse $y$**. Un punto con $y = 0$ sta **sull'asse $x$**. I punti sugli assi non appartengono a nessun quadrante; l'origine $O(0; 0)$ sta su tutti e due gli assi.

?? In quale quadrante sta il punto $(0; -3)$?
[x] in nessuno: sta sull'asse $y$
[ ] nel terzo
[ ] nel quarto
=> L'ascissa è $0$: partendo dall'origine non ci si sposta di lato, si scende soltanto di $3$. Il punto sta sull'asse $y$, al confine fra terzo e quarto quadrante, e non appartiene a nessuno dei due.

>! Si scambiano spesso gli assi: «$x = 0$» fa pensare all'asse $x$, invece descrive i punti dell'asse $y$. Pensa ai passi: $x = 0$ vuol dire zero passi di lato.` },

    { id: 'distanza-punto-medio', titolo: 'Distanza fra due punti, punto medio e baricentro', testo: R`Quanto dista $A(1; -2)$ da $B(5; 1)$? Per andare da $A$ a $B$ lungo la griglia fai $4$ passi a destra e $3$ in su. Questi due spostamenti sono i cateti di un triangolo rettangolo che ha per ipotenusa proprio il segmento $AB$, e la sua lunghezza la dà il teorema di Pitagora.

~ A(1; -2),\quad B(5; 1) :: i due punti
~ \Delta x = 5 - 1 = \evid{4}, \quad \Delta y = 1 - (-2) = \evid{3} :: spostamento orizzontale e verticale: sempre «arrivo meno partenza»
~ \overline{AB} = \sqrt{\evid{4^2 + 3^2}} :: Pitagora: l'ipotenusa è la radice della somma dei quadrati dei cateti
~ \overline{AB} = \sqrt{25} = \evidb{5} :: $16 + 9 = 25$

>* **Distanza fra due punti.** $$\overline{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$ Il quadrato rende positivo ogni cateto, quindi l'ordine dei punti non conta.

Il **punto medio** $M$ del segmento $AB$ sta a metà strada sia in orizzontale sia in verticale. Le sue coordinate sono la media delle ascisse e la media delle ordinate degli estremi.

>* **Punto medio.** $$M\left(\dfrac{x_A + x_B}{2};\ \dfrac{y_A + y_B}{2}\right)$$

?? Qual è il punto medio fra $A(-2; 4)$ e $B(6; 0)$?
[x] $(2; 2)$
[ ] $(4; -2)$
[ ] $(4; 4)$
=> Media delle ascisse $\dfrac{-2 + 6}{2} = 2$, media delle ordinate $\dfrac{4 + 0}{2} = 2$. Chi trova $(4; -2)$ ha diviso per $2$ la **differenza** delle coordinate, che serve per la distanza ma non per il punto medio: nella formula del punto medio c'è una somma.

La stessa idea con tre punti dà il **baricentro** $G$ di un triangolo $ABC$. È il punto in cui si incontrano le tre **mediane**, cioè i segmenti che uniscono ogni vertice al punto medio del lato opposto. Le sue coordinate sono la media di quelle dei tre vertici.

>* **Baricentro.** $$G\left(\dfrac{x_A + x_B + x_C}{3};\ \dfrac{y_A + y_B + y_C}{3}\right)$$ Su ogni mediana il baricentro sta a due terzi della strada dal vertice.

Per esempio, con $A(-4; -2)$, $B(4; -2)$ e $C(0; 4)$: $G\left(\dfrac{-4 + 4 + 0}{3}; \dfrac{-2 - 2 + 4}{3}\right) = G(0; 0)$.

>! Nella distanza le differenze si elevano al quadrato **prima** di sommarle: $\sqrt{4^2 + 3^2} = 5$, mentre $4 + 3 = 7$ è la strada fatta lungo la griglia, non la distanza in linea d'aria.` },

    { id: 'equazione-retta', titolo: 'L\'equazione della retta', testo: R`Prendi l'equazione $y = 2x + 1$ e dai a $x$ qualche valore: $x = 0$ dà $y = 1$, $x = 1$ dà $y = 3$, $x = 2$ dà $y = 5$. I punti $(0; 1)$, $(1; 3)$, $(2; 5)$ sono allineati, e ogni altra coppia che soddisfa l'equazione sta sulla stessa retta. Vale sempre: un'equazione di primo grado in $x$ e $y$ rappresenta una retta, e un punto sta sulla retta se e solo se le sue coordinate soddisfano l'equazione.

La scrittura più comoda è la **forma esplicita**, con la $y$ da sola:

>* **Forma esplicita.** $$y = mx + q$$ $q$ è l'**ordinata all'origine**: il valore di $y$ per $x = 0$, cioè il punto $(0; q)$ dove la retta taglia l'asse $y$. $m$ è il **coefficiente angolare**: di quanto cresce $y$ quando $x$ aumenta di $1$.

[[grafico:esplicita]]

La **forma implicita** mette tutto a sinistra: $ax + by + c = 0$, con $a$ e $b$ non entrambi nulli. Per passare alla forma esplicita si isola la $y$, come in un'equazione:

~ 2x + 3y - 6 = 0 :: forma implicita, con $a = 2$, $b = 3$, $c = -6$
~ 3y = \evid{-2x + 6} :: porto a destra tutto quello che non contiene $y$, cambiando segno
~ y = \evid{-\tfrac{2}{3}}x + \evidb{2} :: divido per $3$ entrambi i membri: $m = -\tfrac{2}{3}$ e $q = 2$

In generale, se $b \ne 0$, si ottiene $m = -\dfrac{a}{b}$ e $q = -\dfrac{c}{b}$.

?? Qual è il coefficiente angolare della retta $2x + y - 4 = 0$?
[x] $-2$
[ ] $2$
[ ] $4$
=> Isolando la $y$: $y = -2x + 4$, quindi $m = -2$. Il $2$ davanti alla $x$ cambia segno quando passa a destra. Il coefficiente angolare si legge solo nella forma esplicita; letto direttamente nella forma implicita ha il segno sbagliato.

Ci sono due casi particolari:

- se $b = 0$ l'equazione diventa $x = k$: è una retta **verticale**, parallela all'asse $y$, fatta di tutti i punti con la stessa ascissa. Non si può isolare la $y$ e non c'è coefficiente angolare;
- se $a = 0$ l'equazione diventa $y = k$: è una retta **orizzontale**, parallela all'asse $x$, con $m = 0$.

Una retta passa per l'**origine** quando $q = 0$, cioè $y = mx$ (nella forma implicita, $c = 0$): con $x = 0$ viene $y = 0$.

>! Non tutte le rette si scrivono come $y = mx + q$: le verticali restano $x = k$. La forma implicita invece va bene per tutte.` },

    { id: 'coefficiente-angolare', titolo: 'Il coefficiente angolare', testo: R`Un cartello stradale dice «pendenza $10\%$»: la strada sale di $10$ metri ogni $100$ in orizzontale. Il **coefficiente angolare** $m$ è la stessa idea per una retta: quanto sale, diviso quanto si va avanti. Presi due punti della retta, $A(x_A; y_A)$ e $B(x_B; y_B)$ con $x_A \ne x_B$:

>* **Coefficiente angolare.** $$m = \dfrac{\Delta y}{\Delta x} = \dfrac{y_B - y_A}{x_B - x_A}$$ Sopra la differenza delle **ordinate** (quanto si sale), sotto quella delle **ascisse** (quanto si va avanti). Su una retta il rapporto viene uguale con qualunque coppia di punti.

[[animazione:pendenza-retta]]

Per esempio, con $A(1; 2)$ e $B(4; 8)$: $m = \dfrac{8 - 2}{4 - 1} = \dfrac{6}{3} = 2$. Per ogni passo verso destra la retta sale di $2$.

?? Qual è il coefficiente angolare della retta per $A(1; 5)$ e $B(3; 1)$?
[x] $-2$
[ ] $-\dfrac{1}{2}$
[ ] $2$
=> $m = \dfrac{1 - 5}{3 - 1} = \dfrac{-4}{2} = -2$: andando verso destra la retta scende, quindi $m$ è negativo. $-\dfrac{1}{2}$ viene mettendo le $x$ sopra e le $y$ sotto, cioè il rapporto capovolto. $2$ viene sottraendo in ordine diverso sopra e sotto ($5 - 1$ sopra, $3 - 1$ sotto): se sopra parti da $B$, anche sotto devi partire da $B$.

Il segno e la grandezza di $m$ dicono come è fatta la retta:

| $m$ | la retta |
|---|---|
| $m > 0$ | sale da sinistra a destra (**crescente**) |
| $m < 0$ | scende da sinistra a destra (**decrescente**) |
| $m = 0$ | è **orizzontale** |
| $m$ lontano da $0$ | è ripida |

Una retta **verticale** non ha coefficiente angolare: fra due suoi punti $\Delta x = 0$, e non si può dividere per zero.

>! Il rapporto è $\dfrac{\Delta y}{\Delta x}$, non $\dfrac{\Delta x}{\Delta y}$. Capovolgerlo dà il reciproco della pendenza: una retta ripida sembrerebbe quasi piatta.` },

    { id: 'retta-punto-e-due-punti', titolo: 'Scrivere l\'equazione di una retta', testo: R`Se di una retta conosci un punto $P_0(x_0; y_0)$ e la pendenza $m$, la retta è una sola. La sua equazione dice che, fra $P_0$ e un punto qualunque $(x; y)$ della retta, il rapporto $\dfrac{y - y_0}{x - x_0}$ vale $m$. Moltiplicando per $x - x_0$:

>* **Retta per un punto, con $m$ noto.** $$y - y_0 = m(x - x_0)$$

Per esempio, per $P_0(2; -1)$ con $m = 3$: $y + 1 = 3(x - 2)$, cioè $y = 3x - 7$.

Anche per **due punti** passa una sola retta. Si calcola prima la pendenza con i due punti, poi si usa la formula di prima con uno dei due.

~ A(-3; 1),\quad B(1; 5) :: i due punti per cui deve passare la retta
~ m = \dfrac{5 - 1}{1 - (-3)} = \dfrac{4}{4} = \evid{1} :: pendenza: differenza delle ordinate diviso differenza delle ascisse
~ y - \evid{1} = 1 \cdot (x - (\evid{-3})) :: uso $y - y_A = m(x - x_A)$ con il punto $A$
~ y - 1 = x + 3 :: $x - (-3)$ diventa $x + 3$
~ y = \evidb{x + 4} :: isolo la $y$
~ 5 = 1 + 4 :: controllo con $B(1; 5)$: le sue coordinate soddisfano l'equazione

Muovi i due punti e guarda come cambiano $\Delta x$, $\Delta y$ e il loro rapporto.

[[grafico:duePunti]]

?? Qual è la retta che passa per $A(2; 1)$ e $B(2; 5)$?
=> I due punti hanno la stessa ascissa, quindi $\Delta x = 0$ e $m$ non si può calcolare: la retta è verticale, $x = 2$. Tutti i suoi punti hanno ascissa $2$, qualunque sia l'ordinata.

Se invece i due punti hanno la stessa ordinata, la retta è orizzontale, $y = y_A$, con $m = 0$.

Sul libro trovi anche la formula della retta per due punti scritta tutta insieme, $\dfrac{y - y_A}{y_B - y_A} = \dfrac{x - x_A}{x_B - x_A}$. Dà lo stesso risultato, ma si può usare solo se $x_A \ne x_B$ e $y_A \ne y_B$, altrimenti c'è uno zero al denominatore. Calcolare prima $m$ funziona anche con le rette orizzontali.

Nella scheda **Laboratorio** c'è *Tiro a segno*: sposti due maniglie finché la retta non passa sopra i bersagli, e ne leggi l'equazione.

>! Quando sostituisci il punto in $y - y_A = m(x - x_A)$, attento ai segni: con $x_A = -3$ si scrive $x - (-3)$, cioè $x + 3$. Scrivere $x - 3$ sposta la retta dall'altra parte.` },

    { id: 'parallele-perpendicolari', titolo: 'Rette parallele e perpendicolari', testo: R`Due rette con la stessa pendenza salgono allo stesso modo: se tagliano l'asse $y$ in punti diversi non si incontrano mai, e sono **parallele**. Se hanno anche la stessa $q$, sono la stessa retta scritta due volte (si dice **coincidenti**).

>* **Parallelismo.** Due rette non verticali sono parallele se e solo se $$m_1 = m_2$$

Per le **perpendicolari** la regola è meno intuitiva. Una retta con pendenza $2$ fa un passo a destra e due in su; girandola di un angolo retto, i passi si scambiano e uno cambia verso: due a sinistra e uno in su, cioè pendenza $-\dfrac{1}{2}$.

>* **Perpendicolarità.** Due rette non verticali sono perpendicolari se e solo se $$m_1 \cdot m_2 = -1$$ cioè $m_2 = -\dfrac{1}{m_1}$: il coefficiente della perpendicolare è l'**opposto del reciproco**.

Trascina il punto su $r$ per farla ruotare: $s$ la segue restando perpendicolare. Tieni d'occhio il prodotto dei due coefficienti.

[[grafico:perpendicolari]]

Per scrivere la perpendicolare a una retta data, passante per un punto, si usano insieme questa regola e la retta per un punto:

~ r:\ y = \tfrac{1}{2}x + 1,\quad P(2; 3) :: cerco la perpendicolare a $r$ che passa per $P$
~ m_1 = \tfrac{1}{2} \ \Rightarrow\ m_2 = \evid{-2} :: opposto del reciproco: il reciproco di $\tfrac12$ è $2$, l'opposto è $-2$
~ y - 3 = \evid{-2}(x - 2) :: retta per $P$ con pendenza $m_2$
~ y = \evidb{-2x + 7} :: sviluppo: $y - 3 = -2x + 4$

?? Qual è il coefficiente angolare di una retta perpendicolare a $y = -3x + 1$?
[x] $\dfrac{1}{3}$
[ ] $-\dfrac{1}{3}$
[ ] $3$
=> Il reciproco di $-3$ è $-\dfrac{1}{3}$, e l'opposto è $\dfrac{1}{3}$. Controllo: $-3 \cdot \dfrac{1}{3} = -1$. Con $-\dfrac{1}{3}$ si è fatto solo il reciproco, con $3$ solo l'opposto: servono tutte e due le operazioni.

Le rette verticali non hanno $m$, quindi seguono regole a parte: due verticali sono sempre parallele, e una verticale è sempre perpendicolare a qualunque orizzontale.

>! $m_1 \cdot m_2 = -1$ si usa solo quando **tutte e due** le rette hanno un coefficiente angolare. Con una retta verticale la formula non ha senso.` },

    { id: 'intersezione-rette', titolo: 'Intersezione fra due rette', testo: R`Il punto dove due rette si incontrano sta su tutte e due, quindi le sue coordinate soddisfano entrambe le equazioni. Trovarlo vuol dire risolvere il **sistema** fra le due equazioni.

>* Con le rette in forma esplicita, $y = m_1 x + q_1$ e $y = m_2 x + q_2$, nel punto d'incontro le due $y$ sono uguali: si risolve $$m_1 x + q_1 = m_2 x + q_2$$ e poi si trova la $y$ sostituendo in una delle due.

~ y = 2x - 3,\quad y = -x + 3 :: le due rette $r$ e $s$
~ 2x - 3 = -x + 3 :: nel punto comune le due $y$ coincidono
~ \evid{3x} = \evid{6} \Rightarrow x = 2 :: porto le $x$ a sinistra e i numeri a destra
~ y = 2 \cdot 2 - 3 = \evid{1} :: sostituisco $x = 2$ nella prima equazione
~ \evidb{(2; 1)} :: controllo nella seconda: $-2 + 3 = 1$, torna

Il numero di soluzioni del sistema dice come stanno le due rette:

| soluzioni | rette | coefficienti |
|---|---|---|
| una | **incidenti**: si tagliano in un punto | $m_1 \ne m_2$ |
| nessuna | **parallele distinte** | $m_1 = m_2$, $q_1 \ne q_2$ |
| infinite | **coincidenti** | $m_1 = m_2$, $q_1 = q_2$ |

?? Dove si incontrano $y = 2x + 1$ e $y = 2x - 5$?
=> Da nessuna parte. Uguagliando viene $2x + 1 = 2x - 5$, cioè $1 = -5$: impossibile. Le due rette hanno la stessa pendenza e un diverso $q$, quindi sono parallele. Guardare $m$ prima di fare conti lo dice subito.

>! Se una retta è verticale, $x = k$, non c'è una $y$ da uguagliare: si sostituisce $x = k$ nell'altra equazione e si trova subito la $y$.` },

    { id: 'distanza-punto-retta', titolo: 'Distanza di un punto da una retta', testo: R`Da un punto $P$ a una retta $r$ si possono tracciare tanti segmenti, tutti di lunghezza diversa. Il più corto è quello **perpendicolare** a $r$, e la sua lunghezza si chiama distanza di $P$ da $r$. Non serve disegnarlo: c'è una formula che usa la retta in forma implicita.

>* **Distanza di $P(x_0; y_0)$ da $r: ax + by + c = 0$.** $$d(P, r) = \dfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$$ Sopra si mettono le coordinate di $P$ nel primo membro dell'equazione della retta; il valore assoluto rende il risultato positivo.

~ P(1; 5),\quad r:\ 3x - 4y + 1 = 0 :: $a = 3$, $b = -4$, $c = 1$
~ |3 \cdot \evid{1} - 4 \cdot \evid{5} + 1| = |-16| = 16 :: numeratore: metto $x_0 = 1$ e $y_0 = 5$ al posto di $x$ e $y$
~ \sqrt{3^2 + (-4)^2} = \sqrt{25} = 5 :: denominatore: dipende solo dalla retta
~ d = \evidb{\tfrac{16}{5}} = 3{,}2 :: divido

Se $P$ sta sulla retta, le sue coordinate soddisfano l'equazione, il numeratore vale $0$ e anche la distanza.

Se la retta è data in forma esplicita, prima va portata in forma implicita: $y = mx + q$ diventa $mx - y + q = 0$, quindi $a = m$, $b = -1$, $c = q$.

?? Quanto dista $P(0; 1)$ dalla retta $y = 2x + 5$?
[x] $\dfrac{4}{\sqrt{5}}$
[ ] $\dfrac{6}{\sqrt{5}}$
[ ] $\dfrac{5}{\sqrt{29}}$
=> Prima la forma implicita: $2x - y + 5 = 0$. Poi $d = \dfrac{|2 \cdot 0 - 1 + 5|}{\sqrt{4 + 1}} = \dfrac{4}{\sqrt{5}}$. Chi trova $\dfrac{5}{\sqrt{29}}$ ha usato $m = 2$ e $q = 5$ come se fossero $a$ e $b$; chi trova $\dfrac{6}{\sqrt{5}}$ ha scritto $+y$ invece di $-y$ passando alla forma implicita.

>! La formula vuole la retta nella forma $ax + by + c = 0$, con **zero** a destra. Usare $m$ e $q$ direttamente, o dimenticare il segno meno davanti a $y$, dà un numero sbagliato.` },

    { id: 'fasci-di-rette', titolo: 'Fasci di rette (cenni)', testo: R`Nell'equazione $y - 2 = m(x - 1)$ il numero $m$ non è fissato. Per ogni valore di $m$ si ottiene una retta diversa, e tutte passano per $(1; 2)$. Un insieme di infinite rette che hanno in comune una proprietà si chiama **fascio di rette**. Se ne studiano due tipi.

Il **fascio proprio** è l'insieme di tutte le rette che passano per uno stesso punto $P_0(x_0; y_0)$, il **centro** del fascio:

>* **Fascio proprio di centro $P_0(x_0; y_0)$:** $$y - y_0 = m(x - x_0), \qquad m \in \mathbb{R}$$ Al variare di $m$ si ottengono tutte le rette per $P_0$, tranne una: manca la retta **verticale** $x = x_0$, che non ha coefficiente angolare e va aggiunta a parte.

Il **fascio improprio** è l'insieme di tutte le rette **parallele** a una direzione data, cioè con lo stesso coefficiente angolare $m$ fissato:

>* **Fascio improprio di direzione $m$:** $$y = mx + k, \qquad k \in \mathbb{R}$$ Al variare di $k$ la retta scorre su e giù restando parallela a sé stessa. Il nome «improprio» viene da un modo di dire dei geometri: le parallele si incontrerebbero in un punto «all'infinito», che non è un punto vero.

Per esempio, l'equazione $y - 2 = m(x - 1)$ rappresenta tutte le rette per $(1; 2)$: con $m = 0$ si ha la retta orizzontale $y = 2$, con $m = 1$ la retta $y = x + 1$, e così via, tranne la verticale $x = 1$.

> A questo livello basta riconoscere i due fasci e scrivere la loro equazione: il loro uso per trovare rette con condizioni particolari si approfondisce più avanti.` }
  ],

  grafici: {
    esplicita: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      parametri: [
        { nome: 'q', min: -5, max: 5, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'y1', min: -5.5, max: 5.5, passo: 0.5, valore: 3, nascosto: true }
      ],
      funzioni: [{ f: '(y1 - q)*x + q', etichetta: 'y = mx + q', colore: 1 }],
      elementi: [
        { tipo: 'segmento', da: [0, 'q'], a: [1, 'q'], colore: 3, tratteggio: true },
        { tipo: 'segmento', da: [1, 'q'], a: [1, 'y1'], colore: 3, etichetta: 'm' },
        { tipo: 'punto', p: [0, 'q'], trascina: true, etichetta: '(0; q)', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: [1, 'y1'], trascina: true, posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-4.7, 5.2], testo: 'm = {{y1 - q}},  q = {{q}}', ancora: 'start' }
      ],
      didascalia: "Trascina su e giù i due punti. Quello sull'asse y decide q; quello un passo più a destra decide quanto sale la retta in un passo, cioè m. Porta m a zero, poi fallo diventare negativo, e guarda la retta."
    },
    duePunti: {
      tipo: 'piano', x: [-6, 6], y: [-6, 6],
      parametri: [
        { nome: 'xa', min: -5, max: 5, passo: 0.5, valore: -3, nascosto: true },
        { nome: 'ya', min: -5, max: 5, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'xb', min: -5, max: 5, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'yb', min: -5, max: 5, passo: 0.5, valore: 5, nascosto: true }
      ],
      elementi: [
        { tipo: 'retta', per: [['xa', 'ya'], ['xb', 'yb']], colore: 1 },
        { tipo: 'segmento', da: ['xa', 'ya'], a: ['xb', 'ya'], colore: 3, tratteggio: true, etichetta: 'Δx' },
        { tipo: 'segmento', da: ['xb', 'ya'], a: ['xb', 'yb'], colore: 3, tratteggio: true, etichetta: 'Δy' },
        { tipo: 'punto', p: ['xa', 'ya'], trascina: true, etichetta: 'A', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'punto', p: ['xb', 'yb'], trascina: true, etichetta: 'B', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-5.7, -5.2], testo: 'Δx = {{xb-xa}},  Δy = {{yb-ya}},  m = {{(yb-ya)/(xb-xa)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B e leggi m = Δy/Δx. Prova a mettere B esattamente sopra A: Δx diventa 0 e m sparisce, perché la retta è verticale.'
    },
    perpendicolari: {
      tipo: 'piano', x: [-4, 4], y: [-4, 4],
      parametri: [ { nome: 'm1', min: -3, max: 3, passo: 0.1, valore: 2, nascosto: true } ],
      funzioni: [
        { f: 'm1*x', etichetta: 'r', colore: 1 },
        { f: '-x/m1', etichetta: 's', colore: 3 }
      ],
      elementi: [
        { tipo: 'angolo', vertice: [0, 0], da: [1, 'm1'], a: ['-m1', 1], raggio: 0.6, colore: 2 },
        { tipo: 'punto', p: [1, 'm1'], trascina: true, etichetta: 'trascina', posizione: 'destra', colore: 1 },
        { tipo: 'testo', p: [-3.8, 3.5], testo: 'm₁ = {{m1}},  m₂ = {{-1/m1}}', ancora: 'start' },
        { tipo: 'testo', p: [-3.8, 2.9], testo: 'm₁ · m₂ = {{m1*(-1/m1)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto blu su e giù: r ruota e s ruota con lei, sempre ad angolo retto. Il prodotto m₁ · m₂ resta −1. Che cosa succede a s quando r diventa orizzontale?'
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
    { nome: 'Retta per un punto, con la pendenza nota', formula: R`y - y_0 = m(x - x_0)` },
    { nome: 'Retta per due punti', formula: R`m = \dfrac{y_B - y_A}{x_B - x_A}, \qquad y - y_A = m(x - x_A)` },
    { nome: 'Condizione di parallelismo', formula: R`m_1 = m_2` },
    { nome: 'Condizione di perpendicolarità', formula: R`m_1 \cdot m_2 = -1` },
    { nome: 'Distanza punto-retta', formula: R`d(P, r) = \dfrac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}` },
    { nome: 'Fascio proprio di rette', formula: R`y - y_0 = m(x - x_0)`, nota: R`Tutte le rette per il centro $P_0(x_0; y_0)$, al variare di $m$, tranne la verticale $x = x_0$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'coordinate-piano', tipo: 'definizione', fronte: R`Cosa sono ascissa e ordinata?`, retro: R`In un punto $P(x; y)$, $x$ è l'ascissa (quanto ci si sposta a destra o a sinistra dell'origine), $y$ è l'ordinata (quanto si sale o si scende).` },
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

    { id: 'es-02', difficolta: 1, testo: R`Trova il punto medio del segmento di estremi $A(1; -3)$ e $B(5; 7)$. Scrivi le sue coordinate nella forma x; y.`, suggerimenti: [R`Il punto medio ha per coordinate la media delle coordinate degli estremi.`, R`Calcola separatamente la media delle ascisse e quella delle ordinate.`], risposta: { tipo: 'numeri', ordinati: true, valori: [3, 2] }, soluzione: [R`$x_M=\dfrac{1+5}{2}=3$.`, R`$y_M=\dfrac{-3+7}{2}=2$.`, R`$M(3; 2)$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Trova il baricentro del triangolo di vertici $A(-3; 0)$, $B(3; 0)$, $C(0; 9)$. Scrivi le sue coordinate nella forma x; y.`, suggerimenti: [R`Il baricentro è la media delle coordinate dei tre vertici.`, R`Somma le tre ascisse e dividi per 3; fai lo stesso con le ordinate.`], risposta: { tipo: 'numeri', ordinati: true, valori: [0, 3] }, soluzione: [R`$x_G=\dfrac{-3+3+0}{3}=0$.`, R`$y_G=\dfrac{0+0+9}{3}=3$.`, R`$G(0; 3)$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Scrivi l'equazione della retta passante per l'origine con coefficiente angolare $m=3$.`, suggerimenti: [R`Una retta per l'origine ha $q=0$.`, R`Usa $y=mx$.`], risposta: { tipo: 'testo', accettate: ['y=3x', 'y = 3x', '3x-y=0'] }, soluzione: [R`Passando per l'origine, $q=0$: $y=mx+0=mx$.`, R`Con $m=3$: $y=3x$.`] },

    { id: 'es-05', difficolta: 2, testo: R`Scrivi l'equazione della retta passante per $P(2; -1)$ con coefficiente angolare $m=-2$.`, suggerimenti: [R`Usa $y-y_0=m(x-x_0)$ con $P_0=P$.`, R`Sviluppa e isola $y$.`], risposta: { tipo: 'testo', accettate: ['y=-2x+3', 'y = -2x + 3', 'y = −2x + 3', '2x+y-3=0'] }, soluzione: [R`$y-(-1)=-2(x-2)$.`, R`$y+1=-2x+4$.`, R`$y=-2x+3$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Scrivi l'equazione della retta passante per $A(1; 2)$ e $B(3; 8)$.`, suggerimenti: [R`Calcola prima $m$ con la formula del coefficiente angolare.`, R`Poi usa $y-y_A=m(x-x_A)$.`], risposta: { tipo: 'testo', accettate: ['y=3x-1', 'y = 3x - 1', 'y = 3x − 1', '3x-y-1=0'] }, soluzione: [R`$m=\dfrac{8-2}{3-1}=\dfrac{6}{2}=3$.`, R`$y-2=3(x-1)$.`, R`$y=3x-1$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Trova il coefficiente angolare della retta perpendicolare a $y=\dfrac{2}{3}x-1$.`, suggerimenti: [R`Usa $m_2=-\dfrac{1}{m_1}$.`, R`$m_1=\dfrac{2}{3}$: il suo reciproco è $\dfrac{3}{2}$.`], risposta: { tipo: 'numero', valore: -1.5, tolleranza: 0.01 }, soluzione: [R`$m_1=\dfrac{2}{3}$.`, R`$m_2=-\dfrac{1}{m_1}=-\dfrac{3}{2}=-1{,}5$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Trova il punto di intersezione fra le rette $y=2x-1$ e $y=-x+8$. Scrivi le sue coordinate nella forma x; y.`, suggerimenti: [R`Uguaglia i due secondi membri.`, R`Risolvi prima per $x$, poi sostituisci per trovare $y$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [3, 5] }, soluzione: [R`$2x-1=-x+8 \Rightarrow 3x=9 \Rightarrow x=3$.`, R`$y=2\cdot3-1=5$.`, R`$(3; 5)$.`] },

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
    { id: 'q-07', domanda: R`Una retta ha equazione implicita $ax+by+c=0$ con $c=0$. Che cosa significa?`, opzioni: [R`È parallela all'asse $x$`, R`Passa per l'origine`, R`È verticale`, R`Ha coefficiente angolare nullo`], corretta: 1, spiegazione: R`Mettendo $x=0$ e $y=0$ nell'equazione resta solo $c$: l'origine $O(0; 0)$ la soddisfa proprio quando $c=0$. La direzione della retta dipende invece da $a$ e $b$.` },
    { id: 'q-08', domanda: R`Il coefficiente angolare $m$ di una retta rappresenta…`, opzioni: [R`l'ordinata del punto in cui la retta taglia l'asse $y$`, R`la distanza della retta dall'origine`, R`di quanto varia $y$ per ogni unità di aumento di $x$`, R`l'ascissa del punto in cui la retta taglia l'asse $x$`], corretta: 2, spiegazione: R`$m=\Delta y/\Delta x$: è il tasso di variazione di $y$ rispetto a $x$. L'ordinata del punto in cui la retta taglia l'asse $y$ è $q$, non $m$.` },
    { id: 'q-09', domanda: R`Se $m<0$, la retta $y=mx+q$…`, opzioni: [R`è decrescente: scende da sinistra a destra`, R`è crescente`, R`è orizzontale`, R`è parallela all'asse $y$`], corretta: 0, spiegazione: R`Un coefficiente angolare negativo vuol dire che $y$ diminuisce quando $x$ aumenta: la retta scende.` },
    { id: 'q-10', domanda: R`Perché $\dfrac{\Delta y}{\Delta x}$ non è definito per una retta verticale?`, opzioni: [R`Perché $\Delta y=0$ sempre`, R`Perché il rapporto darebbe sempre $1$`, R`Perché servono tre punti, non due`, R`Perché $\Delta x=0$ per ogni coppia di punti della retta, e non si può dividere per $0$`], corretta: 3, spiegazione: R`Su una retta verticale tutti i punti hanno la stessa ascissa, quindi $\Delta x = 0$ per qualunque coppia scelta.` },
    { id: 'q-11', domanda: R`Due rette con $m_1=m_2$ e $q_1\ne q_2$ sono…`, opzioni: [R`perpendicolari`, R`parallele e distinte`, R`coincidenti`, R`incidenti in un solo punto`], corretta: 1, spiegazione: R`Stessa pendenza ma diversa ordinata all'origine: le rette non si incontrano mai. Se anche $q_1=q_2$ sarebbero coincidenti.` },
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
