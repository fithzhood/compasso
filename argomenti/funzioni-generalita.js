(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'funzioni-generalita',
  titolo: 'Le funzioni',

  introduzione: R`Un taxi chiede $3$ euro alla partenza più $1{,}20$ euro al chilometro. Quanto costa una corsa di $8$ km? La risposta è una sola: $3 + 1{,}20 \cdot 8 = 12{,}60$ euro. Per ogni distanza c'è un prezzo, e uno soltanto. Questa regola è una **funzione**: prende un numero (i chilometri) e ne restituisce un altro (il prezzo), $f(x) = 3 + 1{,}2\,x$.

Da qui in avanti quasi tutta la matematica del triennio parla di funzioni. Esponenziali, logaritmi, seno e coseno sono *tipi* di funzioni; limiti, derivate e integrali sono *operazioni* che si fanno sulle funzioni. Conviene quindi imparare adesso il vocabolario comune (dominio, immagine, iniettiva, crescente, composta, inversa), che poi si userà sempre.

Serve saper leggere il piano cartesiano e risolvere equazioni e disequazioni, anche di secondo grado: il dominio di una funzione, per esempio, si trova proprio risolvendo disequazioni.`,

  inBreve: [
    R`Una funzione associa a **ogni** $x$ del dominio **un solo** valore $f(x)$. Sul grafico: ogni retta verticale lo taglia al massimo una volta.`,
    R`Il dominio naturale si trova scrivendo una condizione per ogni pezzo delicato (denominatore diverso da zero, radicando di indice pari non negativo, argomento del logaritmo positivo) e prendendo i valori che le rispettano **tutte insieme**.`,
    R`L'immagine è l'insieme dei valori che escono davvero: si legge proiettando il grafico sull'asse $y$, mentre il dominio si legge sull'asse $x$.`,
    R`Iniettiva vuol dire che $x$ diversi danno sempre $y$ diversi: ogni retta orizzontale taglia il grafico al massimo una volta. Solo una funzione biunivoca ha l'inversa, e il grafico dell'inversa è il simmetrico rispetto alla retta $y = x$.`,
    R`Nella composta $(g \circ f)(x) = g(f(x))$ si calcola prima $f$ e poi $g$: scambiando l'ordine si ottiene quasi sempre un'altra funzione.`,
    R`$y = f(x - h) + k$ è il grafico di $f$ spostato di $h$ verso destra e di $k$ verso l'alto: il meno davanti ad $h$ inganna.`
  ],

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è una funzione', testo: R`«A ogni persona associa il suo codice fiscale» è una funzione: ciascuno ne ha uno, e uno solo. «A ogni persona associa i suoi fratelli» invece non lo è: c'è chi non ne ha e chi ne ha tre. Quello che conta è che a ogni elemento di partenza corrisponda **esattamente un** risultato.

>* Una **funzione** $f: A \to B$ è una regola che a **ogni** elemento $x$ dell'insieme $A$ associa **uno e un solo** elemento $f(x)$ dell'insieme $B$. Nessun $x$ resta senza risultato, nessun $x$ ne ha due.

$f(x)$ si legge «$f$ di $x$» ed è il valore che la funzione associa a $x$. Si scrive anche $x \mapsto f(x)$: «$x$ va in $f(x)$».

Intorno a una funzione ci sono tre insiemi, e hanno nomi diversi:

| nome | che cos'è | per $f(x) = x^2$, da $\mathbb{R}$ a $\mathbb{R}$ |
|---|---|---|
| **dominio** | i valori di $x$ che si possono mettere dentro | $\mathbb{R}$ |
| **codominio** | l'insieme in cui si cercano i risultati, scelto in partenza | $\mathbb{R}$ |
| **immagine** | i risultati che escono davvero | $[0, +\infty)$ |

L'immagine sta sempre dentro il codominio, ma può essere più piccola. Nel grafico qui sotto c'è $f(x) = x^2 - 2x$: prova a far uscire un risultato qualunque.

[[grafico:immagine]]

Sotto $-1$ non si scende, perché $x^2 - 2x = (x-1)^2 - 1$ e un quadrato non è mai negativo. L'immagine di questa funzione è $[-1, +\infty)$, anche se il codominio è tutto $\mathbb{R}$.

>! Codominio e immagine non sono la stessa cosa. Il codominio lo scegli tu quando scrivi $f: A \to B$; l'immagine la decide la regola, ed è fatta solo dei valori che la funzione raggiunge davvero.

?? Qual è l'immagine di $f(x) = x^2 + 1$, da $\mathbb{R}$ a $\mathbb{R}$?
[x] $[1, +\infty)$
[ ] $\mathbb{R}$
[ ] $[0, +\infty)$
=> $x^2$ vale almeno $0$, quindi $x^2 + 1$ vale almeno $1$, e ogni numero da $1$ in su si raggiunge. $\mathbb{R}$ è il codominio, non l'immagine: i numeri sotto $1$ non escono mai. $[0, +\infty)$ è l'immagine di $x^2$: manca lo spostamento di $+1$.` },

    { id: 'grafico-funzione', titolo: 'Funzioni numeriche e il loro grafico', testo: R`Da qui in poi dominio e codominio saranno insiemi di numeri reali: si parla di **funzioni numeriche** (o funzioni reali di variabile reale). Una funzione così si disegna: il suo **grafico** è l'insieme dei punti $(x;\ f(x))$ del piano, uno per ogni $x$ del dominio.

Guardando un disegno, come fai a capire se è il grafico di una funzione? Fissa un'ascissa, per esempio $x = 2$. La funzione dà un solo valore $f(2)$, quindi sulla retta verticale $x = 2$ il grafico può avere un punto solo, oppure nessuno se $2$ non sta nel dominio. Mai due.

>* **Test della retta verticale:** una curva è il grafico di una funzione se ogni retta verticale la taglia **al massimo in un punto**.

La circonferenza $x^2 + y^2 = 1$ non passa il test: la retta $x = 0{,}5$ la taglia in $(0{,}5;\ 0{,}87)$ e in $(0{,}5;\ -0{,}87)$, cioè a $x = 0{,}5$ corrisponderebbero due valori di $y$. La metà superiore da sola, $y = \sqrt{1 - x^2}$, invece è una funzione.

>! Non ogni equazione in $x$ e $y$ definisce una funzione. Prima di scrivere «la funzione $y = \ldots$» controlla che a ogni $x$ corrisponda davvero *un solo* $y$.

?? Quale di queste curve è il grafico di una funzione?
[x] la parabola $y = x^2 - 4$
[ ] la parabola $x = y^2$
[ ] la retta $x = 3$
[ ] la circonferenza $x^2 + y^2 = 4$
=> Nella $y = x^2 - 4$ ogni $x$ dà un solo $y$. La parabola $x = y^2$ è coricata: per $x = 4$ si ha $y = 2$ e $y = -2$. La retta $x = 3$ è proprio una retta verticale, che contiene infiniti punti con la stessa ascissa. La circonferenza ha due punti su quasi ogni verticale.` },

    { id: 'classificazione', titolo: 'Come si classificano le funzioni', testo: R`Il nome di una funzione dice come compare la $x$ nella sua espressione. Conta saperlo, perché ogni tipo porta con sé le sue condizioni sul dominio.

Le funzioni **algebriche** si costruiscono con le quattro operazioni, le potenze e le radici. Le **trascendenti** no: sono le esponenziali, i logaritmi e le funzioni goniometriche, che si studiano negli argomenti successivi.

| tipo | come compare la $x$ | esempio |
|---|---|---|
| razionale intera (polinomio) | solo somme, prodotti, potenze | $y = x^3 - 2x + 1$ |
| razionale fratta | anche al denominatore | $y = \dfrac{x+1}{x-3}$ |
| irrazionale | sotto una radice | $y = \sqrt{2x - 1}$ |
| trascendente | in un esponente, in un logaritmo, in un seno… | $y = 2^x$, $y = \log x$, $y = \sin x$ |

>* **Razionale** vuol dire che la $x$ non sta sotto nessuna radice. Razionale **intera** se la $x$ non compare al denominatore, **fratta** se ci compare.

>! «Razionale» non riguarda i coefficienti. $y = \sqrt{2}\,x + 1$ è razionale intera anche se $\sqrt{2}$ è irrazionale: sotto la radice c'è il numero $2$, non la $x$.

?? Di che tipo è la funzione $y = \dfrac{\sqrt{3}\,x^2}{5}$?
[x] razionale intera
[ ] irrazionale
[ ] razionale fratta
=> La $x$ non sta sotto la radice (lì c'è solo il $3$) e non sta al denominatore (lì c'è solo il $5$): è il polinomio $\frac{\sqrt 3}{5}x^2$. Una radice o una frazione fanno cambiare tipo solo se contengono la $x$.` },

    { id: 'dominio-naturale', titolo: 'Il dominio naturale', testo: R`Quanto vale $\dfrac{1}{x-3}$ per $x = 3$? Niente: non si divide per zero. Quando di una funzione ti danno solo l'espressione, il suo dominio è l'insieme dei numeri reali per cui quell'espressione si può calcolare. Si chiama **dominio naturale**, o **campo di esistenza** (c.e.).

Per trovarlo si guardano i pezzi dell'espressione che non accettano qualunque numero:

| se l'espressione contiene… | serve che… |
|---|---|
| un denominatore $D(x)$ | $D(x) \ne 0$ |
| una radice di indice pari, $\sqrt{A(x)}$, $\sqrt[4]{A(x)}$, … | $A(x) \ge 0$ |
| una radice di indice dispari, $\sqrt[3]{A(x)}$, … | nessuna condizione |
| un logaritmo $\log A(x)$ | $A(x) > 0$ |

Se i pezzi delicati sono più di uno, le condizioni devono valere **tutte insieme**: si mettono a sistema.

~ f(x) = \dfrac{\sqrt{x+1}}{x-4} :: due pezzi delicati: una radice quadrata e un denominatore
~ \evid{x+1 \ge 0} :: la radice quadrata vuole il radicando non negativo
~ \evid{x-4 \ne 0} :: il denominatore non deve annullarsi
~ x \ge -1 \ \text{ e } \ x \ne 4 :: risolvo le due condizioni e le tengo insieme
~ D = \evidb{[-1, 4) \cup (4, +\infty)} :: da $-1$ compreso in su, saltando il $4$

>* Il dominio naturale è fatto dai valori di $x$ che rispettano **tutte** le condizioni: è l'intersezione delle soluzioni, mai l'unione.

>! Con più pezzi delicati è facile dimenticarne uno. Prima di risolvere, scrivi una riga per ogni condizione.

?? Qual è il dominio di $f(x) = \dfrac{1}{\sqrt{x-2}}$?
[x] $x > 2$
[ ] $x \ge 2$
[ ] $x \ne 2$
=> La radice vuole $x - 2 \ge 0$, ma sta anche al denominatore, che non può valere zero: quindi $x - 2 > 0$. Chi risponde $x \ge 2$ ha guardato solo la radice; con $x = 2$ si otterrebbe $\frac{1}{0}$.` },

    { id: 'zeri-e-segno', titolo: 'Zeri e segno di una funzione', testo: R`Dove il grafico incontra l'asse $x$, l'ordinata vale zero. Le ascisse di quei punti sono gli **zeri** della funzione.

>* Uno **zero** di $f$ è un valore $x_0$ **del dominio** per cui $f(x_0) = 0$. Si trovano risolvendo l'equazione $f(x) = 0$. Il **segno** di $f$ dice dove $f(x) > 0$ (grafico sopra l'asse $x$) e dove $f(x) < 0$ (grafico sotto).

Per il segno si risolve la disequazione $f(x) > 0$. Se $f$ è un prodotto o un quoziente, si studia il segno di ogni fattore e si mette tutto in una **tabella dei segni**, come per le disequazioni fratte. Per $f(x) = \dfrac{x-1}{x+2}$: il numeratore è positivo per $x > 1$, il denominatore per $x > -2$.

| | $x < -2$ | $-2 < x < 1$ | $x > 1$ |
|---|---|---|---|
| $x - 1$ | $-$ | $-$ | $+$ |
| $x + 2$ | $-$ | $+$ | $+$ |
| $f(x)$ | $+$ | $-$ | $+$ |

Quindi $f$ è positiva per $x < -2$ e per $x > 1$, negativa fra $-2$ e $1$. Lo zero è $x = 1$. In $x = -2$ la funzione non esiste: lì il segno non c'è.

>! «Positiva» e «crescente» sono due cose diverse. Il segno dice se il grafico sta sopra o sotto l'asse $x$; la crescenza dice se sale o scende. Una funzione può essere positiva e scendere, oppure negativa e salire.

?? Quali sono gli zeri di $f(x) = \dfrac{x^2 - 4}{x + 2}$?
[x] solo $x = 2$
[ ] $x = 2$ e $x = -2$
[ ] solo $x = -2$
=> Il numeratore si annulla in $2$ e in $-2$, ma $x = -2$ annulla anche il denominatore, quindi non sta nel dominio: lì la funzione non vale zero, non esiste proprio. Uno zero deve stare nel dominio: resta solo $x = 2$.` },

    { id: 'iniettive-suriettive', titolo: 'Funzioni iniettive, suriettive, biunivoche', testo: R`Con $f(x) = x^2$ si ha $f(2) = 4$ e anche $f(-2) = 4$: due ingressi diversi danno lo stesso risultato. Se ti dico solo che è uscito $4$, non puoi sapere da dove si è partiti. Le funzioni in cui questo non succede mai si chiamano iniettive.

>* $f$ è **iniettiva** se valori diversi di $x$ danno sempre valori diversi di $f(x)$: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$. Sul grafico: **ogni retta orizzontale lo taglia al massimo una volta**.

Nel grafico trascina la retta orizzontale e conta i punti in cui taglia la parabola. Poi usa il cursore per far cominciare il dominio più a destra, e riprova.

[[grafico:iniettiva]]

Quando il dominio parte da $0$, ogni retta orizzontale taglia la curva una volta sola: $x^2$ ristretta a $[0, +\infty)$ è iniettiva. Togliere un pezzo di dominio può rendere iniettiva una funzione che non lo era.

Per dimostrarlo con i calcoli si parte da due ingressi con lo stesso risultato e si guarda se sono per forza uguali. Per $f(x) = 2x + 3$:

~ f(x_1) = f(x_2) :: supponiamo che due ingressi diano lo stesso risultato
~ 2x_1 + 3 = 2x_2 + 3 :: scrivo la regola di $f$ per tutti e due
~ \evid{2x_1 = 2x_2} :: tolgo $3$ da entrambi i membri
~ \evidb{x_1 = x_2} :: divido per $2$: i due ingressi erano lo stesso numero, quindi $f$ è iniettiva

Con $x^2$ lo stesso conto si ferma a $x_1^2 = x_2^2$, che vale anche per $x_1 = -x_2$: non è iniettiva.

L'altra proprietà guarda il codominio. $f: A \to B$ è **suriettiva** se ogni elemento di $B$ viene raggiunto, cioè se l'immagine coincide con tutto il codominio. Dipende da come si sceglie $B$: $x^2$ da $\mathbb{R}$ a $\mathbb{R}$ non è suriettiva (i negativi non escono mai), da $\mathbb{R}$ a $[0, +\infty)$ sì.

Una funzione iniettiva **e** suriettiva si dice **biunivoca**: ogni elemento di $B$ viene da uno e un solo elemento di $A$. È la condizione per poterla invertire. $f(x) = 2x + 3$ da $\mathbb{R}$ a $\mathbb{R}$ è biunivoca.

>! Una funzione pari non è iniettiva: $f(-x) = f(x)$ vuol dire che $x$ e $-x$ danno sempre lo stesso risultato (l'unica eccezione è il caso limite di un dominio fatto solo dallo $0$).

?? $f(x) = x^2$, con dominio $[0, +\infty)$ e codominio $\mathbb{R}$, è…
[x] iniettiva ma non suriettiva
[ ] biunivoca
[ ] suriettiva ma non iniettiva
[ ] né iniettiva né suriettiva
=> Con il dominio ristretto a $x \ge 0$ ogni risultato viene da un solo $x$: è iniettiva. Ma i numeri negativi del codominio non escono mai, quindi non è suriettiva, e per questo non è biunivoca. Diventerebbe biunivoca scegliendo come codominio $[0, +\infty)$.` },

    { id: 'crescenza-monotonia', titolo: 'Funzioni crescenti, decrescenti, monotone', testo: R`Leggendo il grafico da sinistra a destra, ci sono tratti in cui sale e tratti in cui scende. Crescente e decrescente sono i nomi precisi di queste due cose.

>* $f$ è **crescente** in un intervallo $I$ se, **per ogni** coppia $x_1 < x_2$ di $I$, vale $f(x_1) < f(x_2)$: più grande l'ingresso, più grande il risultato. È **decrescente** se invece $x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$. È **monotona** in $I$ se è crescente in tutto $I$ oppure decrescente in tutto $I$.

$f(x) = x^3$ è crescente su tutto $\mathbb{R}$. $f(x) = x^2$ invece non è monotona su $\mathbb{R}$: è decrescente su $(-\infty, 0]$ e crescente su $[0, +\infty)$. Cambia comportamento nel vertice.

La definizione chiede di confrontare **tutte** le coppie di punti dell'intervallo, non una sola coppia scelta a caso.

?? Sai che $f(1) = 2$ e $f(3) = 5$. Puoi concludere che $f$ è crescente in $[1, 3]$?
=> No. Fra $1$ e $3$ la funzione potrebbe scendere e poi risalire: per esempio potrebbe valere $0$ in $x = 2$. Due valori dicono solo come stanno quei due punti, non come si comporta la funzione in mezzo.

Se una funzione è crescente (o decrescente) su tutto il dominio, è anche iniettiva: presi due ingressi diversi, uno è più piccolo dell'altro, e quindi anche i risultati sono diversi. Il contrario non vale: esistono funzioni iniettive che non sono monotone, come $f(x) = \dfrac{1}{x}$.

>! Non fidarti di un grafico disegnato su una finestra troppo stretta: una funzione che lì sembra crescente può scendere appena fuori dal disegno.` },

    { id: 'parita-periodicita', titolo: 'Funzioni pari e dispari, cenni sulle periodiche', testo: R`Che cosa succede se al posto di $x$ metti $-x$? Con $x^2$ il risultato non cambia: $(-3)^2 = 3^2 = 9$. Con $x^3$ cambia solo il segno: $(-2)^3 = -8$, mentre $2^3 = 8$. Queste due regolarità hanno un nome.

>* Se il dominio è simmetrico rispetto a $0$ (con $x$ contiene anche $-x$): $f$ è **pari** se $f(-x) = f(x)$ per ogni $x$, e il suo grafico è simmetrico rispetto all'**asse $y$**; $f$ è **dispari** se $f(-x) = -f(x)$ per ogni $x$, e il suo grafico è simmetrico rispetto all'**origine**.

Trascina uno dei due punti pieni: il gemello in $-a$ si muove con lui.

[[grafico:parita]]

Sulla parabola il gemello sta alla stessa altezza, sulla curva del cubo sta all'altezza opposta. Il segmento che li unisce è orizzontale nel primo caso, e passa per l'origine nel secondo.

Per decidere con i calcoli si scrive $f(-x)$ e lo si confronta con $f(x)$ e con $-f(x)$. Per $f(x) = x^2 + x$:

~ f(-x) = (-x)^2 + (-x) :: metto $-x$ al posto di **ogni** $x$, con le parentesi
~ f(-x) = \evid{x^2 - x} :: il quadrato si mangia il segno, il termine di primo grado lo tiene
~ x^2 - x \ne x^2 + x :: non è uguale a $f(x)$: la funzione non è pari
~ x^2 - x \ne \evid{-x^2 - x} :: non è uguale nemmeno a $-f(x)$: non è dispari

>! «Non pari» non vuol dire «dispari». Quasi tutte le funzioni non sono né pari né dispari, come $x^2 + x$ qui sopra.

?? $f(x) = x^3 + 1$ è pari, dispari o nessuna delle due?
[x] nessuna delle due
[ ] dispari
[ ] pari
=> $f(-x) = -x^3 + 1$. Non è $f(x) = x^3 + 1$, e non è nemmeno $-f(x) = -x^3 - 1$: il $+1$ non cambia segno. Chi risponde «dispari» guarda solo il cubo. Un controllo veloce: una funzione dispari definita in $0$ vale per forza $0$ in $0$, e qui $f(0) = 1$.

Una funzione è **periodica** di periodo $T > 0$ se $f(x + T) = f(x)$ per ogni $x$: il grafico si ripete uguale ogni $T$ unità. Succede con le funzioni goniometriche, che si studiano più avanti.` },

    { id: 'funzione-composta', titolo: 'La funzione composta', testo: R`Un negozio fa lo sconto di $10$ euro e poi applica l'IVA; un altro applica prima l'IVA e poi fa lo sconto. Il prezzo finale non è lo stesso. Mettere due funzioni una dopo l'altra si chiama **comporle**, e l'ordine conta.

>* La **funzione composta** $g \circ f$ si ottiene applicando **prima $f$, poi $g$** al risultato: $$(g \circ f)(x) = g\big(f(x)\big).$$ Si legge «$g$ composto $f$», ma si esegue da destra a sinistra.

Con $f(x) = x - 1$ e $g(x) = \sqrt{x}$:

~ (g \circ f)(x) = g\big(f(x)\big) :: prima $f$, poi $g$ su quello che esce
~ = g(\evid{x - 1}) :: al posto di $f(x)$ scrivo la sua regola
~ = \sqrt{\evid{x - 1}} :: $g$ fa la radice di qualunque cosa riceva
~ x - 1 \ge 0 \ \Rightarrow \ \evidb{x \ge 1} :: la radice mette la sua condizione: è il dominio della composta

$f$ da sola accetta ogni numero, ma $g$ accetta solo ingressi non negativi, quindi la composta perde tutti gli $x < 1$. In generale il dominio di $g \circ f$ è fatto dagli $x$ del dominio di $f$ per cui $f(x)$ sta nel dominio di $g$.

Nell'altro ordine: $(f \circ g)(x) = f(\sqrt{x}) = \sqrt{x} - 1$, definita per $x \ge 0$. È un'altra funzione, con un altro dominio.

?? Con $f(x) = x + 2$ e $g(x) = x^2$, quanto vale $(g \circ f)(1)$?
[x] $9$
[ ] $3$
[ ] $4$
=> Prima $f$: $f(1) = 3$. Poi $g$ sul risultato: $g(3) = 9$. Il $3$ esce facendo le cose al contrario, $f(g(1)) = f(1) = 3$: è $(f \circ g)(1)$, non $(g \circ f)(1)$.` },

    { id: 'funzione-inversa', titolo: 'La funzione inversa', testo: R`Se $f$ trasforma i chilometri nel prezzo del taxi, la funzione inversa fa il viaggio al contrario: dal prezzo pagato ricava i chilometri percorsi. Perché si possa tornare indietro senza ambiguità, ogni risultato deve venire da un solo ingresso, e ogni elemento del codominio deve essere raggiunto: $f$ deve essere biunivoca.

>* Se $f: A \to B$ è **biunivoca**, la **funzione inversa** $f^{-1}: B \to A$ disfa quello che fa $f$: $f^{-1}(f(x)) = x$. Per trovarla si scambiano $x$ e $y$ in $y = f(x)$ e si ricava la nuova $y$. Il grafico di $f^{-1}$ è il simmetrico di quello di $f$ rispetto alla retta $y = x$.

Per $f(x) = 3x - 6$:

~ y = 3x - 6 :: parto dalla regola di $f$
~ \evid{x} = 3\evid{y} - 6 :: scambio $x$ e $y$: ora l'incognita da ricavare è $y$
~ x + 6 = 3y :: porto il $-6$ dall'altra parte
~ y = \evidb{\dfrac{x + 6}{3}} :: divido per $3$: questa è $f^{-1}(x)$

Controllo: $f\!\left(\dfrac{x+6}{3}\right) = 3 \cdot \dfrac{x+6}{3} - 6 = x$. L'inversa riporta al punto di partenza.

Scambiare $x$ e $y$ ha un effetto preciso sul grafico. Trascina $P$ sulla parabola e guarda le coordinate di $Q$.

[[grafico:inversa]]

$Q$ ha le coordinate di $P$ scambiate, e la retta $y = x$ taglia a metà il segmento $PQ$, ad angolo retto: i due grafici sono uno lo specchio dell'altro. Qui $y = x^2$ è stata ristretta a $x \ge 0$, dove è iniettiva, e la sua inversa è $y = \sqrt{x}$. Su tutto $\mathbb{R}$ non si potrebbe invertire.

>! $f^{-1}(x)$ **non** è $\dfrac{1}{f(x)}$: l'esponente $-1$ qui non indica il reciproco.

?? Qual è l'inversa di $f(x) = 2x$?
[x] $f^{-1}(x) = \dfrac{x}{2}$
[ ] $f^{-1}(x) = \dfrac{1}{2x}$
[ ] $f^{-1}(x) = -2x$
=> $f$ raddoppia, quindi l'inversa dimezza: $f^{-1}(f(3)) = f^{-1}(6) = 3$. $\dfrac{1}{2x}$ è il reciproco di $f(x)$: con $x = 6$ darebbe $\frac{1}{12}$, non $3$. $-2x$ è la funzione opposta, non l'inversa.` },

    { id: 'traslazioni-dilatazioni', titolo: 'Traslazioni e dilatazioni del grafico', testo: R`Se conosci il grafico di $y = f(x)$, puoi disegnare senza calcoli quelli di $f(x) + 3$, $f(x - 2)$, $-f(x)$: sono lo stesso grafico spostato, allungato o ribaltato. Prova prima con la parabola $y = x^2$: trascina il vertice $V$ e muovi il cursore $a$.

[[grafico:traslazioni]]

Il vertice, che stava in $(0;\ 0)$, va dove lo porti, e l'equazione diventa $y = a(x - h)^2 + k$. Il cursore $a$ allunga la parabola in verticale (che quindi sembra più stretta) se $a > 1$, la schiaccia se $0 < a < 1$, la ribalta sotto se $a < 0$. Per una funzione qualunque valgono le stesse regole:

| scrivi | il grafico di $f$… |
|---|---|
| $f(x) + k$ | sale di $k$ (scende se $k < 0$) |
| $f(x - h)$ | va a **destra** di $h$ (a sinistra se $h < 0$) |
| $a \cdot f(x)$, $a > 0$ | si allunga in verticale se $a > 1$, si schiaccia se $a < 1$ |
| $-f(x)$ | si ribalta rispetto all'asse $x$ |
| $f(-x)$ | si ribalta rispetto all'asse $y$ |

>* $y = f(x - h) + k$ è il grafico di $f$ spostato di $h$ verso **destra** e di $k$ verso l'**alto**. Il meno davanti ad $h$ inganna: per ritrovare lo spostamento guarda dove si annulla la parentesi, $x - h = 0$, cioè $x = h$.

>! $y = f(x) - 2$ e $y = f(x - 2)$ sono diversi. Il primo cambia il risultato (il grafico scende di $2$), il secondo cambia l'ingresso (il grafico va a destra di $2$).

?? Rispetto a $y = x^2$, il grafico di $y = (x + 3)^2$ è spostato…
[x] di $3$ verso sinistra
[ ] di $3$ verso destra
[ ] di $3$ verso l'alto
=> $(x + 3)^2 = (x - (-3))^2$: qui $h = -3$, quindi il grafico va a sinistra. Controllo: la parentesi si annulla per $x = -3$, ed è lì che ora sta il vertice. Chi risponde «a destra» si è fidato del $+$.` },

    { id: 'valore-assoluto', titolo: 'Il valore assoluto di una funzione', testo: R`Il valore assoluto si può mettere in due posti: attorno a tutta la funzione, $|f(x)|$, oppure attorno alla sola $x$, $f(|x|)$. I grafici che si ottengono sono molto diversi.

**$y = |f(x)|$ agisce sul risultato.** Dove $f(x) \ge 0$ non cambia niente. Dove $f(x) < 0$, il valore assoluto cambia segno al risultato: il pezzo di grafico che stava sotto l'asse $x$ viene ribaltato sopra, come in uno specchio appoggiato sull'asse. Trascina il vertice della parabola tratteggiata e guarda la curva piena.

[[grafico:valore-assoluto]]

Se la parabola sta tutta sopra l'asse, le due curve coincidono; appena un pezzo scende sotto, la curva piena lo rimanda su.

**$y = f(|x|)$ agisce sull'ingresso.** Per $x \ge 0$ si ha $|x| = x$, e il grafico è quello di $f$. Per $x < 0$ si ha $f(|x|) = f(-x)$: a sinistra dell'asse $y$ si vede lo specchio della parte destra, e quello che $f$ faceva a sinistra sparisce. Trascina di nuovo il vertice, anche a sinistra dell'asse $y$.

[[grafico:f-modulo]]

>* $|f(x)|$ ribalta sopra l'asse $x$ le parti negative e lascia il resto com'è. $f(|x|)$ tiene la parte con $x \ge 0$ e la copia allo specchio a sinistra dell'asse $y$: il grafico che ne esce è sempre simmetrico rispetto all'asse $y$.

?? Per $f(x) = x - 2$, quanto valgono $|f(-1)|$ e $f(|-1|)$?
[x] $3$ e $-1$
[ ] $3$ e $3$
[ ] $-3$ e $-1$
=> $|f(-1)|$: prima la funzione, $f(-1) = -3$, poi il valore assoluto, $3$. $f(|-1|)$: prima il valore assoluto, $|-1| = 1$, poi la funzione, $f(1) = -1$. L'ordine in cui si fanno le operazioni cambia il risultato, e $f(|x|)$ può ancora essere negativa.` },

    { id: 'lettura-grafico', titolo: 'Leggere un grafico', testo: R`Spesso, in una verifica, di una funzione hai solo il disegno. Anche senza la formula, dal grafico si leggono quasi tutte le informazioni studiate finora.

| cosa | dove si guarda |
|---|---|
| **dominio** | le $x$ «coperte» dal grafico: lo si schiaccia sull'asse $x$ |
| **immagine** | le $y$ «coperte» dal grafico: lo si schiaccia sull'asse $y$ |
| **zeri** | dove il grafico tocca o attraversa l'asse $x$ |
| **segno** | positiva dove il grafico sta sopra l'asse $x$, negativa dove sta sotto |
| **crescenza** | dove il grafico sale, leggendolo da sinistra a destra |

>* Il dominio si legge sull'asse $x$, l'immagine sull'asse $y$. Zeri e segno si leggono rispetto all'asse $x$, la crescenza seguendo la curva da sinistra a destra.

Prova con il grafico di $y = \dfrac{x-1}{x+2}$. Passa il dito sulla curva per leggere le coordinate dei punti, e rispondi alle domande sotto.

[[grafico:dominio-fratta]]

?? Per quali $x$ la funzione è negativa?
=> Per $-2 < x < 1$: è il tratto in cui la curva sta sotto l'asse $x$, fra la retta tratteggiata $x = -2$ e il punto in cui la curva attraversa l'asse, $x = 1$. È lo stesso risultato della tabella dei segni nella sezione su zeri e segno.

?? Qual è l'immagine della funzione?
=> Tutti i numeri reali tranne $1$. Schiacciando il grafico sull'asse $y$, i due rami coprono tutto tranne la quota $y = 1$, a cui si avvicinano senza arrivarci mai: il ramo di destra resta sotto, quello di sinistra resta sopra. Lo conferma il calcolo: $\dfrac{x-1}{x+2} = 1$ porterebbe a $-1 = 2$, impossibile.

Su ciascuno dei due rami, a sinistra e a destra di $x = -2$, la curva sale: la funzione è crescente in $(-\infty, -2)$ e in $(-2, +\infty)$, presi separatamente.

>! Crescente su ogni ramo non vuol dire crescente su tutto il dominio: $f(-3) = 4$ è più grande di $f(0) = -\frac12$, anche se $-3 < 0$.` }
  ],

  grafici: {
    immagine: {
      tipo: 'piano', x: [-2, 4], y: [-2.5, 6],
      parametri: [ { nome: 'p', min: -1.5, max: 3.5, passo: 0.1, valore: 2.8, nascosto: true } ],
      funzioni: [ { f: 'x^2 - 2*x', etichetta: 'y = x² − 2x', colore: 1 } ],
      elementi: [
        { tipo: 'segmento', da: ['p', 0], a: ['p', 'p^2 - 2*p'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: ['p', 'p^2 - 2*p'], a: [0, 'p^2 - 2*p'], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [0, 'p^2 - 2*p'], colore: 4 },
        { tipo: 'punto', p: ['p', 'p^2 - 2*p'], colore: 4 },
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'p', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [0.25, 5.3], testo: 'f({{p}}) = {{p^2 - 2*p}}', ancora: 'start' }
      ],
      didascalia: 'Trascina p lungo l\'asse x: il risultato f(p) si legge sull\'asse y. Qual è il valore più basso che riesci a ottenere?'
    },
    iniettiva: {
      tipo: 'piano', x: [-3, 3], y: [-1.5, 6.5],
      parametri: [
        { nome: 'a', min: -2.5, max: 0, passo: 0.1, valore: -2.5, etichetta: 'inizio del dominio' },
        { nome: 'k', min: -1, max: 6, passo: 0.1, valore: 2.5, nascosto: true }
      ],
      funzioni: [ { f: 'x^2', dominio: ['a', 2.5], etichetta: 'y = x²', colore: 1 } ],
      elementi: [
        { tipo: 'orizzontale', y: 'k', colore: 2 },
        { tipo: 'punto', p: ['sqrt(k) + 0*sqrt(2.5 - sqrt(k))', 'k'], colore: 4 },
        { tipo: 'punto', p: ['-sqrt(k) + 0*sqrt(-sqrt(k) - a)', 'k'], colore: 4 },
        { tipo: 'punto', p: [2.75, 'k'], trascina: true, etichetta: 'y = {{k}}', posizione: 'alto-sinistra', colore: 2 }
      ],
      didascalia: 'Trascina la retta orizzontale e conta i punti in cui taglia la curva. Poi porta il cursore «inizio del dominio» fino a 0 e riprova.'
    },
    parita: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-9, 9],
      parametri: [ { nome: 'a', min: 0.3, max: 2, passo: 0.1, valore: 1.6, nascosto: true } ],
      funzioni: [
        { f: 'x^3', etichetta: 'y = x³ (dispari)', colore: 1 },
        { f: 'x^2', etichetta: 'y = x² (pari)', colore: 3 }
      ],
      elementi: [
        { tipo: 'segmento', da: ['a', 'a^3'], a: ['-a', '-a^3'], tratteggio: true, colore: 1 },
        { tipo: 'segmento', da: ['a', 'a^2'], a: ['-a', 'a^2'], tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['-a', '-a^3'], vuoto: true, colore: 1, etichetta: '({{-a}}; {{-a^3}})', posizione: 'destra' },
        { tipo: 'punto', p: ['-a', 'a^2'], vuoto: true, colore: 3, etichetta: '({{-a}}; {{a^2}})', posizione: 'alto-destra' },
        { tipo: 'punto', p: ['a', 'a^3'], trascina: true, colore: 1, etichetta: '({{a}}; {{a^3}})', posizione: 'sinistra' },
        { tipo: 'punto', p: ['a', 'a^2'], trascina: true, colore: 3, etichetta: '({{a}}; {{a^2}})', posizione: 'basso-sinistra' }
      ],
      didascalia: 'Trascina uno dei punti pieni: il punto vuoto è il suo gemello in −a. Confronta le ordinate dei gemelli sulle due curve.'
    },
    inversa: {
      tipo: 'piano', x: [-1, 9.5], y: [-1, 9.5],
      proporzioni: 'uguali',
      parametri: [ { nome: 'a', min: 0, max: 3, passo: 0.05, valore: 2, nascosto: true } ],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [0, 3] },
        { f: 'sqrt(x)', etichetta: 'y = √x', colore: 2, dominio: [0, 9.5] }
      ],
      elementi: [
        { tipo: 'retta', m: 1, q: 0, etichetta: 'y = x', tratteggio: true, colore: 3 },
        { tipo: 'segmento', da: ['a', 'a^2'], a: ['a^2', 'a'], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['a^2', 'a'], colore: 2, etichetta: 'Q ({{a^2}}; {{a}})', posizione: 'basso-destra' },
        { tipo: 'punto', p: ['a', 'a^2'], trascina: true, colore: 1, etichetta: 'P ({{a}}; {{a^2}})', posizione: 'alto-sinistra' }
      ],
      didascalia: 'Trascina P lungo la parabola: Q sta sulla curva della radice e ha le coordinate di P scambiate.'
    },
    traslazioni: {
      tipo: 'piano', x: [-6, 6], y: [-5, 9],
      parametri: [
        { nome: 'h', min: -4, max: 4, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'k', min: -4, max: 7, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'a', min: -2, max: 2, passo: 0.25, valore: 1, etichetta: 'a' }
      ],
      funzioni: [
        { f: 'x^2', colore: 3, tratteggio: true },
        { f: 'a*(x - h)^2 + k', etichetta: 'y = a(x − h)² + k', colore: 1 }
      ],
      elementi: [
        { tipo: 'punto', p: ['h', 'k'], trascina: true, colore: 1, etichetta: 'V', posizione: 'basso' },
        { tipo: 'testo', p: [-5.7, -4.3], testo: 'h = {{h}} ;  k = {{k}}', ancora: 'start' }
      ],
      didascalia: 'La tratteggiata è y = x². Trascina il vertice V e muovi il cursore a: guarda come cambiano h, k e la forma della parabola.'
    },
    'valore-assoluto': {
      tipo: 'piano', x: [-4, 4], y: [-4, 6],
      parametri: [
        { nome: 'h', min: -2.5, max: 2.5, passo: 0.1, valore: 0.5, nascosto: true },
        { nome: 'k', min: -3.5, max: 3, passo: 0.1, valore: -3, nascosto: true }
      ],
      funzioni: [
        { f: '(x - h)^2 + k', colore: 3, tratteggio: true },
        { f: 'abs((x - h)^2 + k)', etichetta: 'y = |f(x)|', colore: 1 }
      ],
      elementi: [ { tipo: 'punto', p: ['h', 'k'], trascina: true, colore: 3, etichetta: 'V', posizione: 'basso' } ],
      didascalia: 'La tratteggiata è f(x), la piena è |f(x)|. Trascina il vertice V: portalo sotto l\'asse x, poi sopra.'
    },
    'f-modulo': {
      tipo: 'piano', x: [-4, 4], y: [-4, 6],
      parametri: [
        { nome: 'h', min: -2.5, max: 2.5, passo: 0.1, valore: 1.5, nascosto: true },
        { nome: 'k', min: -3.5, max: 3, passo: 0.1, valore: -2, nascosto: true }
      ],
      funzioni: [
        { f: '(x - h)^2 + k', colore: 3, tratteggio: true },
        { f: '(abs(x) - h)^2 + k', etichetta: 'y = f(|x|)', colore: 2 }
      ],
      elementi: [ { tipo: 'punto', p: ['h', 'k'], trascina: true, colore: 3, etichetta: 'V', posizione: 'basso' } ],
      didascalia: 'La tratteggiata è f(x), la piena è f(|x|). Trascina il vertice V a destra e a sinistra dell\'asse y.'
    },
    'dominio-fratta': {
      tipo: 'piano', x: [-8, 8], y: [-6, 6],
      funzioni: [ { f: '(x-1)/(x+2)', etichetta: 'y = (x − 1)/(x + 2)', colore: 1 } ],
      elementi: [ { tipo: 'verticale', x: -2, asintoto: true }, { tipo: 'testo', p: [-2.3, -5.2], testo: 'x = −2', ancora: 'end' } ],
      didascalia: 'Passa il dito sulla curva per leggere le coordinate. Dove manca il grafico? Dove taglia l\'asse x? A quale quota non arriva mai?'
    }
  },

  esempi: [
    { titolo: 'Il dominio di una funzione fratta', problema: R`Trova il dominio naturale di $f(x) = \dfrac{3x}{x^2 - 9}$.`, passi: [
      R`È una funzione razionale fratta: il denominatore non può annullarsi. Impongo $x^2 - 9 \ne 0$.`,
      R`Risolvo l'equazione associata (pura): $x^2 = 9 \Rightarrow x = \pm 3$. Questi sono i valori da escludere.`,
      R`Il dominio naturale è $\mathbb{R} \setminus \{-3, 3\}$, cioè $x \ne -3$ e $x \ne 3$.`
    ], risultato: R`Dominio: $x \ne -3$ e $x \ne 3$.` },

    { titolo: 'Dominio con radice e frazione insieme', problema: R`Trova il dominio naturale di $f(x) = \dfrac{\sqrt{x+1}}{x-4}$.`, passi: [
      R`Ci sono due condizioni da imporre insieme: il radicando non negativo (indice pari) e il denominatore diverso da zero.`,
      R`Radicando: $x + 1 \ge 0 \Rightarrow x \ge -1$. Denominatore: $x - 4 \ne 0 \Rightarrow x \ne 4$.`,
      R`Metto le due condizioni a sistema (intersezione): $x \ge -1$ e $x \ne 4$.`,
      R`Il dominio è $[-1, 4) \cup (4, +\infty)$.`
    ], risultato: R`Dominio: $[-1, 4) \cup (4, +\infty)$.` },

    { titolo: 'Parità di una funzione', problema: R`Stabilisci se $f(x) = x^4 - 3x^2 + 1$ è pari, dispari o nessuna delle due.`, passi: [
      R`Il dominio è tutto $\mathbb{R}$, simmetrico rispetto a $0$: posso procedere con il test.`,
      R`Calcolo $f(-x) = (-x)^4 - 3(-x)^2 + 1 = x^4 - 3x^2 + 1$.`,
      R`Confronto: $f(-x) = f(x)$ per ogni $x$. La funzione è **pari**.`
    ], risultato: R`$f$ è pari: il suo grafico è simmetrico rispetto all'asse $y$.` },

    { titolo: 'Funzione composta e il suo dominio', problema: R`Date $f(x) = \dfrac{1}{x - 2}$ e $g(x) = x^2 + 3$, trova $(f \circ g)(x)$ e il suo dominio.`, passi: [
      R`Nella composta $f \circ g$ si applica prima $g$, poi $f$: $(f \circ g)(x) = f\big(g(x)\big) = f(x^2 + 3)$.`,
      R`Applico la regola di $f$ mettendo $x^2 + 3$ al posto della $x$: $\dfrac{1}{(x^2 + 3) - 2} = \dfrac{1}{x^2 + 1}$.`,
      R`Il dominio richiede $g(x) \ne 2$ (perché $f$ non è definita in $2$), cioè $x^2 + 3 \ne 2 \Rightarrow x^2 \ne -1$.`,
      R`$x^2 \ne -1$ è vera per **ogni** $x$ reale, perché un quadrato non è mai negativo: nessuna $x$ va esclusa.`,
      R`Il dominio della composta è tutto $\mathbb{R}$, più ampio di quanto ci si aspetterebbe guardando solo $f$.`
    ], risultato: R`$(f \circ g)(x) = \dfrac{1}{x^2+1}$, dominio $\mathbb{R}$.` },

    { titolo: 'Trovare la funzione inversa', problema: R`Verifica che $f(x) = \dfrac{2x + 1}{3}$ è invertibile e trova $f^{-1}(x)$.`, passi: [
      R`$f$ è una funzione lineare non costante, quindi è iniettiva e suriettiva su $\mathbb{R}$: è biunivoca, dunque invertibile.`,
      R`Pongo $y = \dfrac{2x+1}{3}$ e scambio $x$ con $y$: $x = \dfrac{2y+1}{3}$.`,
      R`Risolvo rispetto a $y$: $3x = 2y + 1 \Rightarrow y = \dfrac{3x - 1}{2}$.`,
      R`Verifica: $f\big(f^{-1}(x)\big) = \dfrac{2 \cdot \frac{3x-1}{2} + 1}{3} = \dfrac{(3x - 1) + 1}{3} = \dfrac{3x}{3} = x$. ✓`
    ], risultato: R`$f^{-1}(x) = \dfrac{3x - 1}{2}$.` }
  ],

  formulario: [
    { nome: 'Dominio: denominatore', formula: R`D(x) \ne 0`, nota: R`Vale per ogni funzione razionale fratta.` },
    { nome: 'Dominio: radice di indice pari', formula: R`A(x) \ge 0`, nota: R`Il radicando non può essere negativo.` },
    { nome: 'Dominio: logaritmo', formula: R`A(x) > 0`, nota: R`L'argomento del logaritmo deve essere positivo.` },
    { nome: 'Funzione pari', formula: R`f(-x) = f(x)`, nota: R`Grafico simmetrico rispetto all'asse $y$.` },
    { nome: 'Funzione dispari', formula: R`f(-x) = -f(x)`, nota: R`Grafico simmetrico rispetto all'origine.` },
    { nome: 'Funzione periodica', formula: R`f(x + T) = f(x)`, nota: R`Per ogni $x$ del dominio, con $T > 0$ periodo.` },
    { nome: 'Funzione crescente', formula: R`x_1 < x_2 \Rightarrow f(x_1) < f(x_2)` },
    { nome: 'Funzione decrescente', formula: R`x_1 < x_2 \Rightarrow f(x_1) > f(x_2)` },
    { nome: 'Funzione iniettiva', formula: R`x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)` },
    { nome: 'Funzione suriettiva', formula: R`f(A) = B`, nota: R`L'immagine coincide con l'intero codominio.` },
    { nome: 'Funzione composta', formula: R`(g \circ f)(x) = g\big(f(x)\big)` },
    { nome: 'Funzione inversa', formula: R`f^{-1}\big(f(x)\big) = x`, nota: R`Vale per ogni $x$ del dominio di $f$; analogamente $f(f^{-1}(y)) = y$ per ogni $y$ del codominio.` },
    { nome: 'Traslazione del grafico', formula: R`y = f(x - h) + k`, nota: R`Sposta a destra di $h$ e in alto di $k$.` },
    { nome: 'Dilatazione e simmetria', formula: R`y = a \cdot f(x)`, nota: R`Dilata verticalmente per $|a| > 1$; se $a < 0$ ribalta anche rispetto all'asse $x$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Definizione di funzione`, retro: R`Una legge che ad ogni elemento del dominio associa uno e un solo elemento del codominio (proprietà di univocità).` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Differenza fra codominio e immagine`, retro: R`Il codominio è l'insieme in cui si cercano i valori; l'immagine è il sottoinsieme dei valori effettivamente raggiunti.` },
    { id: 'fc-03', sezione: 'grafico-funzione', tipo: 'concetto', fronte: R`Test della retta verticale`, retro: R`Un grafico rappresenta una funzione se e solo se ogni retta verticale lo interseca in al più un punto.` },
    { id: 'fc-04', sezione: 'classificazione', tipo: 'definizione', fronte: R`Funzione razionale intera`, retro: R`Un polinomio, $y = P(x)$: definita per ogni $x$ reale.` },
    { id: 'fc-05', sezione: 'classificazione', tipo: 'definizione', fronte: R`Funzione razionale fratta`, retro: R`Un rapporto di due polinomi, $y = \dfrac{P(x)}{Q(x)}$, con l'incognita anche a denominatore.` },
    { id: 'fc-06', sezione: 'dominio-naturale', tipo: 'procedura', fronte: R`Condizione di esistenza per un denominatore`, retro: R`Deve essere diverso da zero: $D(x) \ne 0$.` },
    { id: 'fc-07', sezione: 'dominio-naturale', tipo: 'procedura', fronte: R`Condizione di esistenza per una radice di indice pari`, retro: R`Il radicando deve essere non negativo: $A(x) \ge 0$.` },
    { id: 'fc-08', sezione: 'zeri-e-segno', tipo: 'definizione', fronte: R`Zero di una funzione`, retro: R`Un valore $x_0$ del dominio per cui $f(x_0) = 0$.` },
    { id: 'fc-09', sezione: 'zeri-e-segno', tipo: 'procedura', fronte: R`Come si studia il segno di $f$`, retro: R`Si risolve la disequazione $f(x) > 0$: dove è vera il grafico sta sopra l'asse $x$.` },
    { id: 'fc-10', sezione: 'iniettive-suriettive', tipo: 'definizione', fronte: R`Funzione iniettiva`, retro: R`A elementi distinti del dominio corrispondono immagini distinte: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$.` },
    { id: 'fc-11', sezione: 'iniettive-suriettive', tipo: 'definizione', fronte: R`Funzione biunivoca`, retro: R`Sia iniettiva sia suriettiva: corrispondenza uno a uno fra dominio e codominio.` },
    { id: 'fc-12', sezione: 'crescenza-monotonia', tipo: 'definizione', fronte: R`Funzione crescente in un intervallo`, retro: R`Per ogni $x_1 < x_2$ nell'intervallo, $f(x_1) < f(x_2)$.` },
    { id: 'fc-13', sezione: 'crescenza-monotonia', tipo: 'concetto', fronte: R`Funzione monotona`, retro: R`Crescente oppure decrescente in tutto l'intervallo considerato.` },
    { id: 'fc-14', sezione: 'parita-periodicita', tipo: 'definizione', fronte: R`Funzione pari`, retro: R`$f(-x) = f(x)$ per ogni $x$: grafico simmetrico rispetto all'asse $y$.` },
    { id: 'fc-15', sezione: 'parita-periodicita', tipo: 'definizione', fronte: R`Funzione dispari`, retro: R`$f(-x) = -f(x)$ per ogni $x$: grafico simmetrico rispetto all'origine.` },
    { id: 'fc-16', sezione: 'funzione-composta', tipo: 'formula', fronte: R`Funzione composta`, retro: R`$(g \circ f)(x) = g(f(x))$: si applica prima $f$, poi $g$.` },
    { id: 'fc-17', sezione: 'funzione-composta', tipo: 'concetto', fronte: R`Dominio della funzione composta`, retro: R`Le $x$ del dominio di $f$ per cui $f(x)$ appartiene al dominio di $g$.` },
    { id: 'fc-18', sezione: 'funzione-inversa', tipo: 'concetto', fronte: R`Condizione per l'esistenza dell'inversa`, retro: R`La funzione deve essere biunivoca (eventualmente restringendo il dominio).` },
    { id: 'fc-19', sezione: 'funzione-inversa', tipo: 'concetto', fronte: R`Grafico della funzione inversa`, retro: R`È il simmetrico del grafico di $f$ rispetto alla bisettrice $y = x$.` },
    { id: 'fc-20', sezione: 'traslazioni-dilatazioni', tipo: 'procedura', fronte: R`Traslazione orizzontale $y = f(x-h)$`, retro: R`Sposta il grafico a destra se $h > 0$, a sinistra se $h < 0$: segno controintuitivo.` },
    { id: 'fc-21', sezione: 'valore-assoluto', tipo: 'procedura', fronte: R`Effetto di $y = |f(x)|$`, retro: R`Ribalta sopra l'asse $x$ le parti di grafico che stavano sotto; lascia invariato il resto.` },
    { id: 'fc-22', sezione: 'lettura-grafico', tipo: 'procedura', fronte: R`Come si legge il dominio da un grafico`, retro: R`Si proietta il grafico sull'asse $x$: sono i valori coperti orizzontalmente.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Trova il dominio naturale di $f(x) = \dfrac{2x - 1}{x + 5}$.`, suggerimenti: [R`È una funzione razionale fratta: quale condizione riguarda il denominatore?`, R`Il denominatore si annulla per un solo valore di $x$.`], risposta: { tipo: 'testo', accettate: ['x≠-5', 'x!=-5', 'R-{-5}', 'x diverso da -5'] }, soluzione: [R`Essendo una funzione razionale fratta, il denominatore non può annullarsi: $x + 5 \ne 0$.`, R`Cioè $x \ne -5$.`, R`Il dominio naturale è $\mathbb{R} \setminus \{-5\}$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Trova il dominio naturale di $f(x) = \sqrt{x - 4}$.`, suggerimenti: [R`Il radicando ha indice pari: quale condizione impone?`, R`Deve essere $x - 4 \ge 0$.`], risposta: { tipo: 'intervallo', da: 4, a: 'inf', chiusoDa: true, chiusoA: false }, soluzione: [R`Indice pari: il radicando deve essere non negativo, $x - 4 \ge 0$.`, R`Cioè $x \ge 4$.`, R`Il dominio è $[4, +\infty)$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Trova gli zeri di $f(x) = x^2 - 5x + 6$.`, suggerimenti: [R`Uno zero è un valore di $x$ per cui $f(x) = 0$: risolvi l'equazione di secondo grado associata.`, R`Cerca due numeri con somma $5$ e prodotto $6$.`], risposta: { tipo: 'numeri', valori: [2, 3] }, soluzione: [R`Risolvo $x^2 - 5x + 6 = 0$: cerco due numeri con somma $5$ e prodotto $6$, cioè $2$ e $3$.`, R`Gli zeri sono $x = 2$ e $x = 3$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Date $f(x) = 3x - 2$ e $g(x) = x + 1$, calcola $(f \circ g)(2)$.`, suggerimenti: [R`Calcola prima $g(2)$.`, R`Poi applica $f$ al risultato ottenuto.`], risposta: { tipo: 'numero', valore: 7 }, soluzione: [R`$g(2) = 2 + 1 = 3$.`, R`$(f \circ g)(2) = f(3) = 3 \cdot 3 - 2 = 7$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Stabilisci se $f(x) = x^3 - x$ è pari, dispari o nessuna delle due.`, suggerimenti: [R`Calcola $f(-x)$ e confrontalo con $f(x)$.`, R`$f(-x) = (-x)^3 - (-x) = -x^3 + x$: raccogli il segno.`], risposta: { tipo: 'testo', accettate: ['dispari', 'è dispari', 'la funzione è dispari'] }, soluzione: [R`$f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$.`, R`Poiché $f(-x) = -f(x)$ per ogni $x$, la funzione è **dispari**.`] },
    { id: 'es-06', difficolta: 2, testo: R`Trova il dominio naturale di $f(x) = \sqrt{4 - x^2}$.`, suggerimenti: [R`Indice pari: imponi il radicando non negativo.`, R`Risolvi la disequazione $4 - x^2 \ge 0$, cioè $x^2 \le 4$.`], risposta: { tipo: 'intervallo', da: -2, a: 2, chiusoDa: true, chiusoA: true }, soluzione: [R`Condizione: $4 - x^2 \ge 0$, cioè $x^2 \le 4$.`, R`Risolvendo (disequazione pura), $-2 \le x \le 2$.`, R`Il dominio è $[-2, 2]$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Trova il dominio naturale di $f(x) = \log(x - 1) + \dfrac{1}{x - 3}$.`, suggerimenti: [R`Ci sono due condizioni distinte da mettere a sistema: una per il logaritmo, una per il denominatore.`, R`Argomento del logaritmo: $x - 1 > 0$. Denominatore: $x - 3 \ne 0$.`, R`Il dominio è l'insieme dei valori che rispettano entrambe le condizioni insieme.`], soluzione: [R`Argomento del logaritmo positivo: $x - 1 > 0 \Rightarrow x > 1$.`, R`Denominatore diverso da zero: $x - 3 \ne 0 \Rightarrow x \ne 3$.`, R`A sistema: $x > 1$ e $x \ne 3$, cioè il dominio è $(1, 3) \cup (3, +\infty)$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Verifica che $f(x) = 2x + 7$ è invertibile e trova $f^{-1}(x)$.`, suggerimenti: [R`Una funzione lineare non costante è sempre biunivoca su $\mathbb{R}$.`, R`Scambia $x$ e $y$ in $y = 2x + 7$ e risolvi rispetto alla nuova $y$.`], risposta: { tipo: 'testo', accettate: ['(x-7)/2', 'x/2-7/2', '(x−7)/2', 'y=(x-7)/2', 'x/2-3.5', 'y=x/2-7/2'] }, soluzione: [R`$f$ è lineare e non costante: è biunivoca su $\mathbb{R}$, quindi invertibile.`, R`Pongo $y = 2x + 7$, scambio $x$ e $y$: $x = 2y + 7$.`, R`Risolvo rispetto a $y$: $y = \dfrac{x - 7}{2}$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Date $f(x) = \sqrt{x - 2}$ e $g(x) = x^2 + 1$, trova il dominio di $(f \circ g)(x)$.`, suggerimenti: [R`Calcola prima l'espressione di $(f \circ g)(x) = f(g(x))$.`, R`Poi imponi che il radicando sia non negativo.`, R`Arrivi a $x^2 + 1 - 2 \ge 0$, cioè $x^2 \ge 1$.`], risposta: { tipo: 'testo', accettate: ['x≤-1 o x≥1', 'x<=-1 o x>=1', 'x<=-1 or x>=1', 'x≤-1 ∨ x≥1', '(-inf,-1]u[1,+inf)', '(-inf;-1]u[1;+inf)', ']-inf;-1]u[1;+inf[', '|x|≥1'] }, soluzione: [R`$(f \circ g)(x) = f(x^2+1) = \sqrt{x^2 + 1 - 2} = \sqrt{x^2 - 1}$.`, R`Serve $x^2 - 1 \ge 0$, cioè $x^2 \ge 1$.`, R`Risolvendo (disequazione pura), $x \le -1$ oppure $x \ge 1$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Date $f(x) = \dfrac{1}{x}$ e $g(x) = x - 3$, scrivi l'espressione di $(g \circ f)(x)$ e stabilisci per quali $x$ è definita.`, suggerimenti: [R`$(g \circ f)(x) = g(f(x))$: sostituisci $f(x)$ dentro $g$.`, R`Il denominatore di $f$ impone già una condizione.`], risposta: { tipo: 'testo', accettate: ['1/x-3', '1/x - 3', '(1-3x)/x', 'y=1/x-3', '1/x-3, x≠0', '1/x-3 con x≠0'] }, soluzione: [R`$(g \circ f)(x) = g\left(\dfrac{1}{x}\right) = \dfrac{1}{x} - 3$.`, R`È definita per $x \ne 0$, la stessa condizione richiesta da $f$: $g$ non aggiunge altre restrizioni, perché è definita per ogni numero reale.`] },
    { id: 'es-11', difficolta: 3, testo: R`Scrivi l'equazione della parabola ottenuta traslando $y = x^2$ di $3$ unità a destra e $2$ unità verso il basso.`, suggerimenti: [R`Una traslazione a destra di $h$ agisce sull'argomento: $y = f(x - h)$.`, R`Una traslazione verso il basso di $2$ significa $k = -2$ in $y = f(x) + k$.`], risposta: { tipo: 'testo', accettate: ['(x-3)^2-2', '(x-3)²-2', 'y=(x-3)^2-2'] }, soluzione: [R`Traslazione a destra di $3$: si sostituisce $x$ con $x - 3$, ottenendo $y = (x-3)^2$.`, R`Traslazione verso il basso di $2$: si aggiunge $k = -2$.`, R`Equazione finale: $y = (x - 3)^2 - 2$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti è la definizione corretta di funzione da $A$ a $B$?`, opzioni: [R`Una relazione che associa ad ogni elemento di $B$ uno o più elementi di $A$`, R`Una relazione qualsiasi fra due insiemi $A$ e $B$`, R`Una legge che associa ad ogni elemento di $A$ uno e un solo elemento di $B$`, R`Un'equazione con due incognite $x$ e $y$`], corretta: 2, spiegazione: R`La proprietà che distingue una funzione da una relazione generica è l'univocità: a ogni $x$ del dominio corrisponde uno e un solo $y$. Le altre opzioni descrivono relazioni non necessariamente univoche, o generiche equazioni.` },
    { id: 'q-02', domanda: R`L'immagine di una funzione $f: A \to B$ è…`, opzioni: [R`l'insieme dei valori di $B$ effettivamente raggiunti da $f$`, R`sempre uguale al codominio $B$`, R`l'insieme di partenza $A$`, R`l'insieme dei punti in cui $f$ si annulla`], corretta: 0, spiegazione: R`L'immagine è un sottoinsieme del codominio, formato solo dai valori realmente ottenuti; coincide col codominio solo se la funzione è suriettiva.` },
    { id: 'q-03', domanda: R`A che cosa serve il test della retta verticale?`, opzioni: [R`a trovare gli zeri di una funzione`, R`a stabilire se un grafico rappresenta una funzione`, R`a stabilire se una funzione è pari`, R`a trovare il dominio naturale`], corretta: 1, spiegazione: R`Se una retta verticale interseca il grafico in più di un punto, a quella $x$ corrisponderebbero due valori di $y$: la relazione non sarebbe una funzione.` },
    { id: 'q-04', domanda: R`Una funzione razionale fratta è caratterizzata dal fatto che…`, opzioni: [R`ha coefficienti razionali`, R`l'incognita compare sotto una radice`, R`è definita per ogni $x$ reale`, R`l'incognita compare anche a denominatore`], corretta: 3, spiegazione: R`"Razionale" indica l'assenza di radici con l'incognita; "fratta" significa che l'incognita compare anche a denominatore, il che introduce condizioni di esistenza.` },
    { id: 'q-05', domanda: R`Il dominio naturale di $y = \sqrt{x + 2}$ è…`, opzioni: [R`$x \ge -2$`, R`$x > -2$`, R`$x \le -2$`, R`$x \ne -2$`], corretta: 0, spiegazione: R`L'indice della radice è pari, quindi il radicando deve essere non negativo: $x + 2 \ge 0 \Rightarrow x \ge -2$.` },
    { id: 'q-06', domanda: R`Il dominio naturale di $y = \log(3 - x)$ è…`, opzioni: [R`$x \ne 3$`, R`$x > 3$`, R`$x < 3$`, R`$x \le 3$`], corretta: 2, spiegazione: R`L'argomento del logaritmo deve essere positivo: $3 - x > 0 \Rightarrow x < 3$.` },
    { id: 'q-07', domanda: R`Uno zero di una funzione $f$ è…`, opzioni: [R`un punto in cui il grafico ha un massimo`, R`un valore di $x$ in cui $f$ non è definita`, R`un intervallo in cui $f$ è crescente`, R`un valore di $x$ per cui $f(x) = 0$`], corretta: 3, spiegazione: R`Per definizione, uno zero (o radice) è un valore del dominio in cui la funzione vale zero: l'ascissa di un punto in cui il grafico incontra l'asse $x$.` },
    { id: 'q-08', domanda: R`Una funzione $f$ è iniettiva quando…`, opzioni: [R`l'immagine coincide con il codominio`, R`a valori distinti del dominio corrispondono sempre immagini distinte`, R`è crescente su tutto il dominio`, R`ogni $x$ ha almeno due immagini`], corretta: 1, spiegazione: R`L'iniettività riguarda il non ripetersi delle immagini: $x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)$. «L'immagine coincide con il codominio» descrive invece la suriettività; essere crescente basta per essere iniettiva, ma non è necessario ($\frac1x$ è iniettiva e non è crescente).` },
    { id: 'q-09', domanda: R`Una funzione $f: A \to B$ è suriettiva quando…`, opzioni: [R`ogni elemento di $A$ ha una sola immagine`, R`è sempre anche iniettiva`, R`il suo grafico passa per l'origine`, R`l'immagine di $f$ coincide con l'intero codominio $B$`], corretta: 3, spiegazione: R`Suriettiva significa che nessun elemento del codominio resta "scoperto": ognuno è immagine di almeno un elemento del dominio.` },
    { id: 'q-10', domanda: R`Una funzione biunivoca è…`, opzioni: [R`solo iniettiva`, R`solo suriettiva`, R`sia iniettiva sia suriettiva`, R`né iniettiva né suriettiva`], corretta: 2, spiegazione: R`Biunivoca (o biiettiva) significa iniettiva e suriettiva insieme: è la condizione che permette di costruire la funzione inversa.` },
    { id: 'q-11', domanda: R`Una funzione $f$ è crescente in un intervallo $I$ se, per ogni $x_1, x_2 \in I$…`, opzioni: [R`$x_1 < x_2 \Rightarrow f(x_1) < f(x_2)$`, R`$x_1 < x_2 \Rightarrow f(x_1) > f(x_2)$`, R`$f(x_1) = f(x_2)$ sempre`, R`$x_1 = x_2 \Rightarrow f(x_1) = f(x_2)$`], corretta: 0, spiegazione: R`Crescente significa che a un $x$ maggiore corrisponde un $f(x)$ maggiore. Con $f(x_1) > f(x_2)$ si descrive invece una funzione decrescente.` },
    { id: 'q-12', domanda: R`Il grafico di una funzione pari è simmetrico rispetto…`, opzioni: [R`all'origine`, R`all'asse $y$`, R`all'asse $x$`, R`alla bisettrice $y=x$`], corretta: 1, spiegazione: R`Pari significa $f(-x) = f(x)$: i punti $(x, f(x))$ e $(-x, f(x))$ sono simmetrici rispetto all'asse $y$.` },
    { id: 'q-13', domanda: R`Una funzione dispari soddisfa la condizione…`, opzioni: [R`$f(-x) = -f(x)$`, R`$f(-x) = f(x)$`, R`$f(x) = -x$`, R`$f(0) = 0$ sempre e comunque`], corretta: 0, spiegazione: R`La condizione che definisce le funzioni dispari è $f(-x) = -f(x)$ per ogni $x$ del dominio; il grafico è simmetrico rispetto all'origine.` },
    { id: 'q-14', domanda: R`La funzione composta $(g \circ f)(x)$ si calcola…`, opzioni: [R`applicando prima $g$, poi $f$ al risultato`, R`moltiplicando $f(x)$ per $g(x)$`, R`applicando prima $f$, poi $g$ al risultato`, R`sommando $f(x)$ e $g(x)$`], corretta: 2, spiegazione: R`Nonostante si legga "g composto f", si esegue da destra a sinistra: prima $f$, poi $g$ sul risultato ottenuto.` },
    { id: 'q-15', domanda: R`Condizione necessaria perché una funzione ammetta inversa (sul suo dominio) è che sia…`, opzioni: [R`crescente`, R`pari`, R`periodica`, R`biunivoca`], corretta: 3, spiegazione: R`Solo una corrispondenza uno a uno fra dominio e codominio (biunivoca) può essere "disfatta" da una funzione inversa ben definita.` },
    { id: 'q-16', domanda: R`Il grafico della funzione inversa $f^{-1}$, rispetto al grafico di $f$, è…`, opzioni: [R`identico`, R`traslato di $1$ unità verso l'alto`, R`il simmetrico rispetto alla bisettrice $y = x$`, R`il simmetrico rispetto all'asse $x$`], corretta: 2, spiegazione: R`Scambiare $x$ e $y$ per trovare l'inversa corrisponde, graficamente, a riflettere il grafico rispetto alla retta $y = x$.` },
    { id: 'q-17', domanda: R`Il grafico di $y = |f(x)|$, rispetto a quello di $y = f(x)$…`, opzioni: [R`ha le parti sotto l'asse $x$ ribaltate sopra, il resto invariato`, R`è traslato verso l'alto di una unità`, R`è simmetrico rispetto all'asse $y$`, R`è identico a quello di $f$`], corretta: 0, spiegazione: R`Il valore assoluto rende positivo l'output: dove $f(x) < 0$ il grafico viene ribaltato sopra l'asse $x$; dove $f(x) \ge 0$ resta invariato.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Per il dominio naturale, elenca tutte le condizioni (denominatori, radicali, logaritmi) e mettile a sistema: il dominio è la loro **intersezione**, mai l'unione.` },
    { tipo: 'errore', testo: R`$|f(x)|$ e $f(|x|)$ non sono la stessa trasformazione: la prima agisce sul risultato (ribalta sopra l'asse $x$), la seconda sull'argomento (usa e specchia solo la parte con $x \ge 0$).` },
    { tipo: 'trucco', testo: R`Per stabilire se una funzione è pari o dispari, calcola $f(-x)$ e confrontalo sia con $f(x)$ sia con $-f(x)$: se non coincide con nessuno dei due, la funzione non è né pari né dispari (il caso più frequente).` },
    { tipo: 'errore', testo: R`Nella funzione composta $(g \circ f)(x)$ si applica prima $f$, poi $g$: leggila da destra a sinistra, non nell'ordine in cui è scritta.` },
    { tipo: 'metodo', testo: R`Per trovare l'inversa: scambia $x$ e $y$ in $y = f(x)$ e risolvi rispetto alla nuova $y$. Prima però controlla che $f$ sia biunivoca, altrimenti l'inversa non esiste.` },
    { tipo: 'trucco', testo: R`Il grafico di $f^{-1}$ si disegna "a specchio" rispetto alla bisettrice $y = x$, senza fare nessun calcolo: utile per un controllo veloce.` },
    { tipo: 'errore', testo: R`In $y = f(x - h)$ il grafico si sposta a **destra** se $h > 0$, non a sinistra: il segno è controintuitivo. Controlla dove si annulla l'argomento, $x - h = 0$.` },
    { tipo: 'trucco', testo: R`Per leggere dominio e immagine da un grafico, proietta la curva sull'asse $x$ (dominio) e sull'asse $y$ (immagine): sono due proiezioni su assi diversi.` },
    { tipo: 'metodo', testo: R`Il test della retta verticale dice se un grafico è una funzione; il test della retta orizzontale dice se quella funzione è iniettiva. Sono due controlli diversi.` }
  ],

  aneddoti: [
    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'La parola "funzione" compare per la prima volta', testo: R`Nel 1673, in un manoscritto sulle tangenti alle curve, Leibniz usò per primo la parola latina *functio* per indicare una quantità legata ai punti di una curva: la lunghezza della tangente, della sottotangente, del raggio di curvatura. Non era ancora il concetto moderno (pensava a curve geometriche, non a una corrispondenza fra numeri), ma il nome, e l'idea che valesse la pena dargli un nome, restarono. Leibniz discusse per anni, in lettere con Johann Bernoulli, come definire meglio il termine, e fu proprio in quella corrispondenza che la parola cominciò a indicare più in generale un'espressione costruita con una variabile.`, legame: R`È la prima comparsa storica della parola che dà il titolo a questo argomento: prima del 1673, semplicemente, non esisteva.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'La notazione $f(x)$', testo: R`Eulero fu il matematico più prolifico della storia (si stima abbia scritto più di ottocento lavori, molti dettati a memoria negli ultimi anni, quando era ormai completamente cieco). Nel 1734 introdusse, in un articolo per l'Accademia delle Scienze di San Pietroburgo, la notazione $f(x)$ per indicare "una funzione di $x$": prima di lui si scriveva a parole, o si usavano simboli diversi da autore ad autore. Eulero definì anche la funzione in modo più ampio dei suoi predecessori, come una qualunque "espressione analitica" costruita con una variabile, riunendo per la prima volta sotto lo stesso nome polinomi, radici, esponenziali e funzioni goniometriche.`, legame: R`La scrittura $f(x)$ che compare in ogni pagina di questo argomento è, alla lettera, un'invenzione di Eulero.` },
    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'La definizione che vale ancora oggi', testo: R`Nel 1837, studiando quando una serie di seni e coseni (le serie di Fourier) rappresenta davvero una funzione, Dirichlet si accorse che le definizioni precedenti erano troppo strette: legavano il concetto di funzione a un'unica formula o "espressione analitica". Propose allora la definizione che i libri di testo usano ancora oggi: $y$ è funzione di $x$ se ad ogni valore di $x$ in un certo insieme corrisponde uno ed un solo valore di $y$, **qualunque sia la legge** con cui questo valore è determinato: anche senza una formula, anche con regole diverse su parti diverse del dominio. Era, si racconta, un uomo di poche parole: alla nascita del suo primo figlio avrebbe telegrafato al suocero soltanto "$2 + 1 = 3$".`, legame: R`È esattamente la definizione con cui si apre questo argomento: una corrispondenza univoca, non necessariamente una formula.` },
    { matematico: 'Peter Gustav Lejeune Dirichlet', anni: '1805–1859', titolo: 'Una funzione impossibile da disegnare', testo: R`Per mostrare quanto possa essere ampia l'idea di funzione, Dirichlet costruì (già nel 1829, sempre studiando le serie di Fourier) un esempio estremo: la funzione che vale $1$ se $x$ è razionale e $0$ se $x$ è irrazionale. È una funzione a tutti gli effetti, perché a ogni $x$ corrisponde un solo valore, eppure non si può disegnare: fra due razionali, per quanto vicini, c'è sempre un irrazionale, e viceversa, quindi il grafico "salta" continuamente fra le altezze $0$ e $1$ senza che nessun tratto, per quanto piccolo, sia tracciabile con un tratto di penna continuo. Da allora si chiama, appunto, **funzione di Dirichlet**.`, legame: R`Ricorda che una funzione non deve avere per forza un grafico "bello" o tracciabile: bastano dominio, codominio e univocità, anche quando il grafico non si può nemmeno disegnare.` }
  ]
});
})();
