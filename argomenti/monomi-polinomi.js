(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'monomi-polinomi',
  titolo: 'Monomi, polinomi e prodotti notevoli',

  introduzione: R`Un rettangolo ha i lati $x$ e $x + 3$. Quanto misura l'area? Non conosci $x$, ma puoi scriverla lo stesso: $x(x + 3) = x^2 + 3x$.

Questo è il **calcolo letterale**: fai i conti con le lettere. Le lettere stanno al posto di numeri che ancora non conosci.

Il pezzo più semplice è il **monomio**, come $3x^2$. Più monomi sommati fanno un **polinomio**, come $x^2 + 3x$. Qui impari a sommarli, moltiplicarli e dividerli.

Vedrai anche i **prodotti notevoli** e la **regola di Ruffini**. Ti servono le proprietà delle potenze.`,

  inBreve: [
    R`Nel prodotto di monomi gli esponenti della stessa lettera si **sommano**. Nella somma no: sommi solo monomi simili, e la parte letterale resta com'è.`,
    R`Due monomi sono simili se hanno **la stessa parte letterale**. $x^2y$ e $xy^2$ non lo sono, anche se hanno lo stesso grado.`,
    R`Per moltiplicare due polinomi moltiplica **ogni** termine del primo per **ogni** termine del secondo. Poi somma i termini simili.`,
    R`$(a + b)^2 = a^2 + 2ab + b^2$: non dimenticare il doppio prodotto $2ab$. E $(a + b)(a - b) = a^2 - b^2$.`,
    R`Con Ruffini il polinomio va scritto **completo**: per ogni grado che manca metti uno $0$.`,
    R`Il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$. Se $P(a) = 0$, la divisione è esatta.`
  ],

  sezioni: [
    { id: 'monomi', titolo: 'Monomi: definizione e grado', testo: R`$-5x^3y^2$ vuol dire $-5 \cdot x \cdot x \cdot x \cdot y \cdot y$: un numero e alcune lettere, tutto moltiplicato. Questo è un monomio.

>* Un **monomio** è un prodotto di numeri e lettere. Gli esponenti delle lettere sono numeri naturali. Niente somme, niente lettere al denominatore o sotto radice.

$3x^2y$ e $\dfrac{1}{2}a$ sono monomi. $3x + y$ non lo è: c'è una somma. Non lo sono nemmeno $\dfrac{5}{x}$ e $\sqrt{x}$.

Un monomio è in **forma normale** se c'è un numero e poi ogni lettera una volta sola: $-5x^3y^2$, non $x \cdot (-5) \cdot x^2 \cdot y^2$.

- Il **coefficiente** è il numero davanti: $-5$.
- La **parte letterale** sono le lettere con i loro esponenti: $x^3y^2$.

### Il grado

- Il **grado rispetto a una lettera** è l'esponente di quella lettera. In $-5x^3y^2$ è $3$ per la $x$ e $2$ per la $y$.
- Il **grado complessivo** è la somma di tutti gli esponenti: $3 + 2 = 5$.
- Un numero da solo, come $7$, ha grado $0$. Il monomio $0$ si chiama **nullo** e non ha grado.

?? Qual è il grado complessivo di $4x^2yz^3$?
[ ] $5$
[x] $6$
[ ] $9$
[ ] $24$
=> Gli esponenti sono $2$, $1$ e $3$: la somma è $6$. Chi risponde $5$ ha dimenticato la $y$: ha esponente $1$ anche se non si scrive. Il coefficiente non conta nel grado.

### Monomi simili

>* Due monomi sono **simili** se hanno la stessa parte letterale: stesse lettere, con gli stessi esponenti. I coefficienti possono essere diversi.

$3x^2y$ e $-7x^2y$ sono simili. $3x^2y$ e $3xy^2$ no: gli esponenti sono scambiati.

>! Lo stesso grado non basta: $x^2y$ e $xy^2$ hanno grado $3$, ma non sono simili. Confronta gli esponenti lettera per lettera.` },

    { id: 'operazioni-monomi', titolo: 'Operazioni con i monomi', testo: R`### Somma

$3$ mele più $5$ mele fanno $8$ mele. $3$ mele più $5$ pere restano $3$ mele e $5$ pere. Con i monomi è lo stesso: $3x^2y + 5x^2y = 8x^2y$.

>* Sommi solo monomi **simili**: sommi i coefficienti e la parte letterale **resta com'è**. Se non sono simili, la somma resta così: $3x^2 + 5x$.

Con il meno funziona allo stesso modo: $7a - 2a = 5a$.

?? Quanto fa $3x + 2x^2$?
[ ] $5x^3$
[ ] $5x^2$
[ ] $6x^3$
[x] non si semplifica: resta $3x + 2x^2$
=> $3x$ e $2x^2$ non sono simili, quindi la somma resta così. $5x^3$ è l'errore più comune: gli esponenti si sommano nel **prodotto**, non nella somma. $6x^3$ è il prodotto $3x \cdot 2x^2$.

### Prodotto

Nel prodotto puoi unire tutti i monomi. Moltiplica i coefficienti. Poi, lettera per lettera, somma gli esponenti.

~ (2x^3y) \cdot (-3xy^2) :: il prodotto da calcolare
~ \evid{2 \cdot (-3)} \cdot x^3 \cdot x \cdot y \cdot y^2 :: riordino: prima i numeri, poi le lettere uguali vicine
~ -6 \cdot x^{\evid{3+1}} \cdot y^{\evid{1+2}} :: stessa lettera: sommo gli esponenti ($x$ da sola ha esponente $1$)
~ \evidb{-6x^4y^3} :: il risultato

### Potenza

Eleva **ogni** fattore, anche il coefficiente. Gli esponenti delle lettere si moltiplicano.

~ (-2x^3y)^3 :: la potenza da calcolare
~ (\evid{-2})^3 \cdot (\evid{x^3})^3 \cdot \evid{y}^3 :: elevo al cubo ogni fattore
~ -8 \cdot x^{\evid{3 \cdot 3}} \cdot y^3 :: $(-2)^3 = -8$: esponente dispari, il segno meno resta
~ \evidb{-8x^9y^3} :: il risultato

Con esponente pari il segno diventa più: $(-2x^3)^2 = 4x^6$.

### Quoziente

Dividi i coefficienti. Poi, lettera per lettera, sottrai gli esponenti: $(12x^5y^2) : (4x^2y) = 3x^{5-2}y^{2-1} = 3x^3y$.

>! Il quoziente è un monomio solo se ogni lettera del divisore ha, nel dividendo, un esponente **uguale o maggiore**. $x^2 : x^5 = \dfrac{1}{x^3}$ non è un monomio.` },

    { id: 'mcd-mcm-monomi', titolo: 'MCD e mcm di monomi', testo: R`MCD e mcm dei monomi si calcolano come per i numeri. Le lettere fanno la parte dei fattori primi. Prima i coefficienti, poi le lettere una alla volta.

>* **MCD:** il MCD dei coefficienti, poi le lettere comuni a **tutti** i monomi, con l'esponente **più piccolo**.

>* **mcm:** il mcm dei coefficienti, poi **tutte** le lettere, con l'esponente **più grande**.

Con $12x^3y^2z$ e $18x^2y$:

~ 12x^3y^2z \qquad 18x^2y :: i due monomi
~ \text{MCD} = \evid{6} \cdot \ldots :: $\text{MCD}(12, 18) = 6$
~ \text{MCD} = 6\,x^{\evid{2}}\,y^{\evid{1}} = 6x^2y :: $x$ e $y$ sono comuni: esponente minimo. La $z$ è solo nel primo, quindi resta fuori
~ \text{mcm} = \evid{36} \cdot \ldots :: $\text{mcm}(12, 18) = 36$
~ \text{mcm} = 36\,x^{\evid{3}}\,y^{\evid{2}}\,\evid{z} = 36x^3y^2z :: tutte le lettere, anche la $z$, con l'esponente massimo

?? Qual è il MCD di $4a^2b$ e $6ab^3c$?
[x] $2ab$
[ ] $2ab^3c$
[ ] $12a^2b^3c$
[ ] $2abc$
=> $\text{MCD}(4, 6) = 2$. $a$ e $b$ sono in tutti e due, con esponente minimo $1$. La $c$ è solo nel secondo, quindi resta fuori: $2abc$ è l'errore tipico. $12a^2b^3c$ è il mcm.

>! Una lettera che non sta in tutti i monomi resta **fuori** dal MCD ed **entra** nel mcm.` },

    { id: 'polinomi', titolo: 'Polinomi: definizione e grado', testo: R`Se i monomi non sono simili, la somma resta scritta così: $3x^2 - 5x + 7$. Questo è un polinomio.

>* Un **polinomio** è una somma di monomi non simili fra loro. Ogni monomio è un **termine** del polinomio.

Con due termini è un **binomio** ($x^5 - 1$). Con tre è un **trinomio** ($x^2 + 2x + 1$). Con quattro è un **quadrinomio**.

>* Il **grado** di un polinomio è il grado più alto fra i suoi termini. $3x^2y - 5x + 7$ ha grado $3$: il termine $3x^2y$ ha grado $2 + 1 = 3$.

?? Qual è il grado di $x^5 - 1$?
[ ] $2$
[x] $5$
[ ] $6$
[ ] $4$
=> Il termine di grado più alto è $x^5$, quindi il grado è $5$. $2$ è il numero dei termini, non il grado. $6$ viene dal dare grado $1$ al $-1$: un numero da solo ha grado $0$.

Altre parole per descrivere un polinomio:

| parola | che cosa vuol dire | esempio |
|---|---|---|
| ridotto (forma normale) | non ci sono termini simili da sommare | $2x^2 + x$ sì, $x^2 + x + x^2$ no |
| ordinato | gli esponenti di una lettera vanno in ordine, crescente o decrescente | $x^3 - 2x^2 + 5$ |
| completo | rispetto a una lettera, ci sono tutti i gradi dal massimo fino a $0$ | $x^3 + x^2 - x + 4$ |
| omogeneo | tutti i termini hanno lo stesso grado | $x^3 - 3x^2y + xy^2$ (tutti di grado $3$) |

$x^3 - 2x^2 + 5$ è ordinato ma non completo: manca il termine con $x$. Nella divisione lo completi così: $x^3 - 2x^2 + 0x + 5$.

>! Prima di leggere il grado, riduci. In $x^3 + 2x - x^3$ i due $x^3$ si cancellano: resta $2x$, di grado $1$.` },

    { id: 'operazioni-polinomi', titolo: 'Operazioni con i polinomi', testo: R`### Somma e differenza

Togli le parentesi e somma i termini simili. Nella **differenza**, il meno davanti alla parentesi cambia il segno a **tutti** i termini dentro.

~ (3x^2 - 2x + 1) - (x^2 + 5x - 4) :: una differenza
~ 3x^2 - 2x + 1 \evid{- x^2 - 5x + 4} :: tolgo la seconda parentesi cambiando segno a tutti e tre i termini
~ (\evid{3x^2 - x^2}) + (\evid{-2x - 5x}) + (\evid{1 + 4}) :: raggruppo i termini simili
~ \evidb{2x^2 - 7x + 5} :: sommo i coefficienti

>! L'errore tipico è cambiare segno solo al primo termine: $-(x^2 + 5x - 4)$ fa $-x^2 - 5x + 4$, non $-x^2 + 5x - 4$.

### Prodotto

Monomio per polinomio: il monomio moltiplica ogni termine. È la proprietà distributiva: $2x \cdot (3x^2 - x + 4) = 6x^3 - 2x^2 + 8x$.

>* Per moltiplicare due polinomi moltiplica **ogni** termine del primo per **ogni** termine del secondo. Poi somma i termini simili. Il grado del prodotto è la somma dei gradi.

~ (x + 2)(x - 5) :: due binomi: in tutto $2 \cdot 2 = 4$ prodotti
~ \evid{x \cdot x} + \evid{x \cdot (-5)} + 2 \cdot x + 2 \cdot (-5) :: prima la $x$ del primo binomio per ciascun termine del secondo
~ x \cdot x + x \cdot (-5) + \evid{2 \cdot x} + \evid{2 \cdot (-5)} :: poi il $2$ per ciascun termine del secondo
~ x^2 \evid{- 5x + 2x} - 10 :: calcolo i quattro prodotti: i due termini in mezzo sono simili
~ \evidb{x^2 - 3x - 10} :: li sommo

?? Quanto fa $(x + 4)(x + 1)$?
[ ] $x^2 + 4$
[ ] $x^2 + 5x + 5$
[x] $x^2 + 5x + 4$
[ ] $x^2 + 4x + 1$
=> $(x + 4)(x + 1) = x^2 + x + 4x + 4 = x^2 + 5x + 4$. L'errore più comune è $x^2 + 4$: mancano i due prodotti in mezzo. In $x^2 + 5x + 5$ il termine noto è sommato, ma va moltiplicato: $4 \cdot 1 = 4$.

Guarda il risultato. In $(x + a)(x + b)$ il coefficiente di $x$ è la **somma** $a + b$. Il termine noto è il **prodotto** $ab$.

$$(x + a)(x + b) = x^2 + (a + b)\,x + ab$$

Con $a = 2$ e $b = -5$: somma $-3$, prodotto $-10$. Infatti il risultato era $x^2 - 3x - 10$.` },

    { id: 'prodotti-notevoli', titolo: 'I prodotti notevoli', testo: R`Alcuni prodotti tornano spesso. Conviene sapere il risultato a memoria: sono i **prodotti notevoli**.

| nome | formula |
|---|---|
| somma per differenza | $(a + b)(a - b) = a^2 - b^2$ |
| quadrato di binomio | $(a \pm b)^2 = a^2 \pm 2ab + b^2$ |
| quadrato di trinomio | $(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc$ |
| cubo di binomio | $(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3$ |

### Somma per differenza

Da dove viene $a^2 - b^2$? Fai il prodotto e guarda i termini in mezzo:

~ (a + b)(a - b) :: la somma di due termini per la loro differenza
~ a^2 \evid{- ab + ba} - b^2 :: ogni termine per ogni termine
~ a^2 - b^2 :: $-ab$ e $+ba$ sono opposti e si cancellano

>* **Somma per differenza:** $(a + b)(a - b) = a^2 - b^2$. Quadrato del primo meno quadrato del secondo: $(3x - 2)(3x + 2) = (3x)^2 - 2^2 = 9x^2 - 4$.

[[video:monomi-polinomi/somma-per-differenza]]

### Quadrato di binomio

Un quadrato è un prodotto per sé stesso: $(a + b)^2 = (a + b)(a + b)$. Questa volta i termini in mezzo si sommano.

~ (a + b)^2 = (a + b)(a + b) :: il quadrato è il binomio moltiplicato per sé stesso
~ a^2 \evid{+ ab + ba} + b^2 :: ogni termine per ogni termine
~ a^2 + \evid{2ab} + b^2 :: $ab$ e $ba$ sono uguali: sommati fanno $2ab$, il **doppio prodotto**

>* **Quadrato di binomio:** $(a + b)^2 = a^2 + 2ab + b^2$ e $(a - b)^2 = a^2 - 2ab + b^2$. Quadrato del primo, doppio prodotto, quadrato del secondo.

[[video:monomi-polinomi/quadrato-di-binomio]]

Guarda le aree: un quadrato di lato $a + b$ si divide in un quadrato $a^2$, un quadrato $b^2$ e **due** rettangoli $ab$.

[[animazione:quadrato-binomio]]

Con i monomi al posto di $a$ e $b$, attento ai coefficienti e ai segni:

~ (2x - 3y)^2 :: qui $a = 2x$ e $b = 3y$, con il meno
~ (\evid{2x})^2 - 2 \cdot \evid{2x} \cdot \evid{3y} + (\evid{3y})^2 :: applico la formula con il segno meno sul doppio prodotto
~ \evidb{4x^2 - 12xy + 9y^2} :: $(2x)^2 = 4x^2$: si eleva al quadrato anche il coefficiente

?? Quanto fa $(x + 5)^2$?
[ ] $x^2 + 25$
[ ] $x^2 + 5x + 25$
[x] $x^2 + 10x + 25$
[ ] $x^2 + 10x + 10$
=> Il doppio prodotto è $2 \cdot x \cdot 5 = 10x$: $(x + 5)^2 = x^2 + 10x + 25$. L'errore più frequente è $x^2 + 25$, senza doppio prodotto. Prova con $x = 1$: $(1 + 5)^2 = 36$, ma $1 + 25 = 26$.

### Quadrato di trinomio

Con tre termini: i tre quadrati, più il doppio prodotto di **ogni coppia**. Le coppie sono tre.

~ (x + y - 1)^2 :: qui $a = x$, $b = y$, $c = -1$
~ \evid{x^2 + y^2 + 1} + \ldots :: i tre quadrati: $(-1)^2 = 1$, sempre positivo
~ x^2 + y^2 + 1 \evid{+ 2xy - 2x - 2y} :: i doppi prodotti $2 \cdot x \cdot y$, $2 \cdot x \cdot (-1)$, $2 \cdot y \cdot (-1)$

### Cubo di binomio

$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. Con la differenza i segni si alternano: $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$.

~ (x - 2)^3 :: $a = x$, $b = 2$, con il meno
~ x^3 - 3 \cdot x^2 \cdot \evid{2} + 3 \cdot x \cdot \evid{2^2} - \evid{2^3} :: il cubo del primo, i due **tripli prodotti**, il cubo del secondo; segni $+ - + -$
~ \evidb{x^3 - 6x^2 + 12x - 8} :: faccio i conti

>! $(a + b)^3$ non è $a^3 + b^3$: mancano i tripli prodotti. Nel dubbio prova con numeri piccoli: $(1 + 1)^3 = 8$, ma $1^3 + 1^3 = 2$.` },

    { id: 'divisione-polinomi', titolo: 'La divisione fra polinomi', testo: R`$17 : 5$ fa $3$ con resto $2$. Infatti $17 = 3 \cdot 5 + 2$, e $2$ è minore di $5$. Con i polinomi è uguale, ma «minore» vuol dire «di grado più basso».

>* Dividi il **dividendo** $P(x)$ per il **divisore** $D(x)$. Trovi un **quoziente** $Q(x)$ e un **resto** $R(x)$ tali che $$P(x) = Q(x) \cdot D(x) + R(x)$$ Il grado di $R(x)$ è **minore** del grado di $D(x)$. Se $R(x) = 0$ la divisione è **esatta**.

La mossa è sempre la stessa:

1. Dividi il termine di grado più alto del dividendo per quello del divisore.
2. Moltiplica il divisore per il risultato e sottrai.
3. Ricomincia da quello che resta.
4. Fermati quando il resto ha grado minore del divisore.

~ (2x^3 - 3x^2 + 4x - 5) : (x^2 + 1) :: la divisione da fare
~ 2x^3 : x^2 = \evid{2x} :: termine di grado più alto diviso termine di grado più alto: è il primo pezzo del quoziente
~ \text{resta } \evid{-3x^2 + 2x - 5} :: dal dividendo sottraggo $2x \cdot (x^2 + 1) = 2x^3 + 2x$: il termine $2x^3$ sparisce
~ -3x^2 : x^2 = \evid{-3} :: ricomincio da quello che è rimasto: secondo pezzo del quoziente
~ \text{resta } \evid{2x - 2} :: da $-3x^2 + 2x - 5$ sottraggo $(-3) \cdot (x^2 + 1) = -3x^2 - 3$
~ Q(x) = \evidb{2x - 3} \qquad R(x) = \evidb{2x - 2} :: $2x - 2$ ha grado $1$, meno del divisore (grado $2$): mi fermo

Controlla con l'uguaglianza del riquadro: $(2x - 3)(x^2 + 1) + (2x - 2) = 2x^3 + 2x - 3x^2 - 3 + 2x - 2 = 2x^3 - 3x^2 + 4x - 5$. ✓

Se il dividendo ha già grado minore del divisore, il quoziente è $0$ e il resto è il dividendo.

>! Quando sottrai, cambia segno a **tutti** i termini: togliere $2x^3 + 2x$ vuol dire scrivere $-2x^3 - 2x$. Tieni il dividendo **ordinato**, dal grado più alto. Se un grado manca, scrivi $0$ al suo posto.` },

    { id: 'ruffini', titolo: 'La regola di Ruffini', testo: R`Se il divisore è della forma $(x - a)$, come $(x - 1)$ o $(x + 2)$, c'è uno schema più veloce: la **regola di Ruffini**. Usi solo i coefficienti, senza le lettere.

[[video:monomi-polinomi/ruffini]]

Per trovare $a$ cambia segno al numero. In $(x - 1)$ è $a = 1$. In $(x + 2)$ è $a = -2$.

?? Per dividere per $(x + 3)$ con Ruffini, che numero metti a sinistra nella tabella?
[ ] $3$
[x] $-3$
[ ] $x$
[ ] $1$
=> $x + 3 = x - (-3)$, quindi $a = -3$. L'errore più comune è mettere $3$: il segno di $a$ è l'opposto di quello scritto.

Dividiamo $2x^3 + 3x^2 - 8x + 3$ per $(x - 1)$, quindi $a = 1$:

~ 2 \quad 3 \quad -8 \quad 3 :: i coefficienti, dal grado più alto al termine noto
~ \evid{2} :: abbasso il primo coefficiente così com'è
~ 2 \cdot 1 = 2 \;\to\; 3 + 2 = \evid{5} :: moltiplico per $a = 1$ e sommo al coefficiente successivo
~ 5 \cdot 1 = 5 \;\to\; -8 + 5 = \evid{-3} :: ripeto con il numero appena trovato
~ -3 \cdot 1 = -3 \;\to\; 3 + (-3) = \evidb{0} :: ultima volta: questo è il resto

Nella tabella i coefficienti stanno in alto e $a$ a sinistra:

| | $2$ | $3$ | $-8$ | $3$ |
|---|---|---|---|---|
| $1$ | | $2$ | $5$ | $-3$ |
| | $2$ | $5$ | $-3$ | $0$ |

Leggi l'ultima riga. L'ultimo numero, $0$, è il resto. Gli altri sono i coefficienti del quoziente, che ha **un grado in meno**: $Q(x) = 2x^2 + 5x - 3$.

>! Il polinomio va scritto **completo**: per ogni grado che manca metti uno $0$. Per $x^3 - 4$ la prima riga è $1$, $0$, $0$, $-4$, non $1$, $-4$.

### Il resto senza dividere

Nell'esempio il resto era $0$. Calcola il polinomio in $x = 1$: $P(1) = 2 + 3 - 8 + 3 = 0$. Non è un caso.

>* **Teorema del resto:** il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$.

>* **Teorema di Ruffini:** $(x - a)$ divide esattamente $P(x)$ se e solo se $P(a) = 0$, cioè se $a$ è uno **zero** (o **radice**) del polinomio.

Perché? Nella divisione $P(x) = Q(x) \cdot (x - a) + R$. Metti $a$ al posto di $x$: il fattore $(x - a)$ diventa $0$. Resta $P(a) = R$.` },

    { id: 'triangolo-tartaglia', titolo: 'Il triangolo di Tartaglia', testo: R`I coefficienti di $(a + b)^2$ sono $1, 2, 1$. Quelli di $(a + b)^3$ sono $1, 3, 3, 1$. E per $(a + b)^4$? Il **triangolo di Tartaglia** li dà già pronti.

$$\begin{array}{c} 1 \\ 1 \quad 1 \\ 1 \quad 2 \quad 1 \\ 1 \quad 3 \quad 3 \quad 1 \\ 1 \quad 4 \quad 6 \quad 4 \quad 1 \\ 1 \quad 5 \quad 10 \quad 10 \quad 5 \quad 1 \end{array}$$

>* **Come si costruisce:** ogni riga comincia e finisce con $1$; ogni numero interno è la somma dei due che gli stanno sopra. Per esempio $6 = 3 + 3$ e $10 = 4 + 6$.

Le righe si contano da $0$. La riga $n$ dà i coefficienti di $(a + b)^n$: la riga $2$ è $1, 2, 1$, la riga $3$ è $1, 3, 3, 1$.

Poi metti gli esponenti. Quelli di $a$ scendono da $n$ a $0$. Quelli di $b$ salgono da $0$ a $n$.

~ (x + 2)^4 :: $a = x$, $b = 2$: serve la riga $4$, cioè $1, 4, 6, 4, 1$
~ x^4 + \evid{4} \cdot 2x^3 + \evid{6} \cdot 4x^2 + \evid{4} \cdot 8x + 16 :: i coefficienti dal triangolo; l'esponente di $x$ scende, le potenze di $2$ salgono: $2$, $4$, $8$, $16$
~ \evidb{x^4 + 8x^3 + 24x^2 + 32x + 16} :: faccio i conti: $4 \cdot 2 = 8$, $6 \cdot 4 = 24$, $4 \cdot 8 = 32$

Per $(a - b)^n$ i coefficienti sono gli stessi, ma i segni si alternano: $(a - b)^4 = a^4 - 4a^3b + 6a^2b^2 - 4ab^3 + b^4$.

?? Quali sono i coefficienti di $(a + b)^5$?
[ ] $1, 5, 5, 5, 5, 1$
[x] $1, 5, 10, 10, 5, 1$
[ ] $1, 4, 6, 4, 1$
[ ] $1, 5, 10, 5, 1$
=> È la riga $5$: $1$, poi $1 + 4 = 5$, $4 + 6 = 10$, $6 + 4 = 10$, $4 + 1 = 5$, e $1$. $1, 4, 6, 4, 1$ è la riga $4$: sbagli riga se cominci a contare da $1$. La riga $n$ ha $n + 1$ numeri.

Questi numeri si chiamano **coefficienti binomiali** e si scrivono $\binom{n}{k}$. Con loro lo sviluppo sta in una riga, il **binomio di Newton**: $(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$. Li ritroverai nel calcolo combinatorio.

>! In $(a - b)^n$ il primo segno è sempre $+$. Con $n$ dispari l'ultimo termine è negativo ($-b^3$), con $n$ pari è positivo ($+b^4$).` }
  ],

  grafici: {},

  esempi: [
    { titolo: 'Prodotto e potenza di monomi', problema: R`Semplifica $(2x^2y^3)\cdot(-3xy^2)^2$.`, passi: [
      R`Calcolo prima la potenza, che ha la precedenza sul prodotto: $(-3xy^2)^2 = 9x^2y^4$ (il segno diventa positivo perché l'esponente è pari).`,
      R`Moltiplico: $(2x^2y^3)\cdot(9x^2y^4)$.`,
      R`Coefficienti: $2\cdot9=18$. Lettera $x$: $x^{2+2}=x^4$. Lettera $y$: $y^{3+4}=y^7$.`
    ], risultato: R`$18x^4y^7$` },

    { titolo: 'MCD e mcm di due monomi', problema: R`Trova il MCD e il mcm dei monomi $12x^3y^2$ e $18x^2y$.`, passi: [
      R`MCD e mcm dei coefficienti: $\text{MCD}(12,18)=6$, $\text{mcm}(12,18)=36$.`,
      R`Per la lettera $x$: esponenti $3$ e $2$. Nel MCD prendo il minimo, $\min(3,2)=2$; nel mcm il massimo, $\max(3,2)=3$.`,
      R`Per la lettera $y$: esponenti $2$ e $1$. Minimo $1$, massimo $2$.`
    ], risultato: R`$\text{MCD}=6x^2y$, $\ \text{mcm}=36x^3y^2$` },

    { titolo: 'Prodotto di due binomi', problema: R`Calcola il prodotto $(x+2)(x-5)$.`, passi: [
      R`Moltiplico ogni termine del primo per ogni termine del secondo: $x\cdot x + x\cdot(-5) + 2\cdot x + 2\cdot(-5)$.`,
      R`Cioè $x^2 - 5x + 2x - 10$.`,
      R`Riduco i termini simili: $-5x+2x=-3x$.`
    ], risultato: R`$x^2 - 3x - 10$` },

    { titolo: 'Quadrato e cubo di binomio', problema: R`Sviluppa $(2x-3y)^2$ e $(x+2)^3$.`, passi: [
      R`$(2x-3y)^2$ è il quadrato di una differenza, con $a=2x$ e $b=3y$: userò $a^2 - 2ab + b^2$.`,
      R`I due quadrati: $a^2=(2x)^2=4x^2$ e $b^2=(3y)^2=9y^2$. Il coefficiente va elevato al quadrato insieme alla lettera.`,
      R`Il doppio prodotto, con il segno meno: $-2ab = -2\cdot 2x\cdot 3y=-12xy$. Quindi $(2x-3y)^2 = 4x^2-12xy+9y^2$.`,
      R`$(x+2)^3$ è il cubo di una somma, con $a=x$ e $b=2$: tutti i segni sono $+$. I due cubi: $a^3=x^3$ e $b^3=8$.`,
      R`I due tripli prodotti: $3a^2b=3\cdot x^2\cdot 2=6x^2$ e $3ab^2=3\cdot x\cdot 4=12x$. Quindi $(x+2)^3 = x^3+6x^2+12x+8$.`
    ], risultato: R`$4x^2-12xy+9y^2$ e $x^3+6x^2+12x+8$` },

    { titolo: 'Divisione fra due polinomi', problema: R`Dividi $x^3+2x^2-x+5$ per $x^2-x+1$.`, passi: [
      R`Divido il termine di grado più alto del dividendo per quello del divisore: $x^3:x^2=x$. È il primo termine del quoziente.`,
      R`Moltiplico tutto il divisore per $x$, $x\cdot(x^2-x+1)=x^3-x^2+x$, e lo sottraggo dal dividendo cambiando tutti i segni: $(x^3+2x^2-x+5)-(x^3-x^2+x) = 3x^2-2x+5$.`,
      R`Ricomincio da $3x^2-2x+5$, che ha ancora grado $2$: $3x^2:x^2=3$. È il secondo termine del quoziente.`,
      R`Moltiplico il divisore per $3$, $3x^2-3x+3$, e lo sottraggo: $(3x^2-2x+5)-(3x^2-3x+3)=x+2$.`,
      R`Il grado di $x+2$ (che è $1$) è minore del grado del divisore (che è $2$): mi fermo. Controllo: $(x+3)(x^2-x+1)+(x+2)=x^3+2x^2-2x+3+x+2=x^3+2x^2-x+5$. ✓`
    ], risultato: R`Quoziente $x+3$, resto $x+2$` },

    { titolo: 'Regola di Ruffini e teorema del resto', problema: R`Dividi $2x^3+3x^2-8x+3$ per $(x-1)$ con la regola di Ruffini, poi verifica con il teorema del resto.`, passi: [
      R`Il divisore è $(x-1)$, quindi $a=1$. Il polinomio è completo: i coefficienti sono $2,\ 3,\ -8,\ 3$. Abbasso il primo, $2$.`,
      R`Moltiplico per $a$ e sommo al coefficiente successivo: $2\cdot1=2$, $3+2=5$.`,
      R`Ripeto con il $5$: $5\cdot1=5$, $-8+5=-3$.`,
      R`Ripeto con il $-3$: $-3\cdot1=-3$, $3+(-3)=0$. Quest'ultimo numero è il resto.`,
      R`I numeri $2,\ 5,\ -3$ sono i coefficienti del quoziente, di un grado in meno del dividendo: quoziente $2x^2+5x-3$, resto $0$.`,
      R`Verifica con il teorema del resto: $P(1)=2+3-8+3=0$, uguale al resto trovato. Per il teorema di Ruffini, $x=1$ è una radice del polinomio.`
    ], risultato: R`Quoziente $2x^2+5x-3$, resto $0$` }
  ],

  formulario: [
    { nome: 'Prodotto di monomi', formula: R`a\,x^m \cdot b\,x^n = ab\,x^{m+n}` },
    { nome: 'Quoziente di monomi', formula: R`a\,x^m : b\,x^n = \frac{a}{b}\,x^{m-n}`, nota: R`Definito come monomio solo se $m \ge n$ e $b \ne 0$.` },
    { nome: 'Potenza di un monomio', formula: R`(a\,x^m)^n = a^n\,x^{mn}` },
    { nome: 'MCD di due monomi', formula: R`\text{MCD}(a\,x^m,\ b\,x^n) = \text{MCD}(a,b)\cdot x^{\min(m,n)}`, nota: R`Vale per le lettere comuni a tutti i monomi.` },
    { nome: 'mcm di due monomi', formula: R`\text{mcm}(a\,x^m,\ b\,x^n) = \text{mcm}(a,b)\cdot x^{\max(m,n)}`, nota: R`Vale per ogni lettera presente in almeno un monomio.` },
    { nome: 'Somma per differenza', formula: R`(a+b)(a-b) = a^2 - b^2` },
    { nome: 'Quadrato di binomio', formula: R`(a \pm b)^2 = a^2 \pm 2ab + b^2` },
    { nome: 'Quadrato di trinomio', formula: R`\begin{gathered} (a+b+c)^2 = \\ a^2+b^2+c^2+2ab+2ac+2bc \end{gathered}` },
    { nome: 'Cubo di binomio', formula: R`(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3`, nota: R`Nella differenza i segni si alternano: $+,-,+,-$.` },
    { nome: 'Identità della divisione', formula: R`P(x) = Q(x)\cdot D(x) + R(x)`, nota: R`Con il grado di $R(x)$ minore del grado di $D(x)$, oppure $R(x) = 0$.` },
    { nome: 'Teorema del resto', formula: R`R = P(a)`, nota: R`$R$ è il resto della divisione di $P(x)$ per $(x-a)$.` },
    { nome: 'Teorema di Ruffini', formula: R`P(a) = 0 \quad \Leftrightarrow \quad (x-a) \text{ divide } P(x)` },
    { nome: 'Binomio di Newton', formula: R`(a+b)^n = \sum_{k=0}^{n} \binom{n}{k}\, a^{n-k} b^k` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'monomi', tipo: 'definizione', fronte: R`Che cos'è un monomio?`, retro: R`Un'espressione formata solo da un prodotto di numeri e lettere con esponente naturale: niente somme, niente lettere al denominatore o sotto radice.` },
    { id: 'fc-02', sezione: 'monomi', tipo: 'definizione', fronte: R`Grado complessivo di un monomio`, retro: R`La somma degli esponenti di tutte le lettere che vi compaiono.` },
    { id: 'fc-03', sezione: 'monomi', tipo: 'concetto', fronte: R`Grado di un monomio rispetto a una lettera`, retro: R`L'esponente con cui quella lettera compare nel monomio.` },
    { id: 'fc-04', sezione: 'monomi', tipo: 'definizione', fronte: R`Quando due monomi sono simili?`, retro: R`Quando hanno la stessa parte letterale (stesse lettere, stessi esponenti); i coefficienti possono essere diversi.` },
    { id: 'fc-05', sezione: 'operazioni-monomi', tipo: 'procedura', fronte: R`Come si sommano monomi simili?`, retro: R`Si sommano i coefficienti e si lascia invariata la parte letterale.` },
    { id: 'fc-06', sezione: 'operazioni-monomi', tipo: 'formula', fronte: R`Prodotto di due monomi con la stessa lettera`, retro: R`$a x^m \cdot b x^n = ab\,x^{m+n}$: si moltiplicano i coefficienti, si sommano gli esponenti.` },
    { id: 'fc-07', sezione: 'operazioni-monomi', tipo: 'formula', fronte: R`Potenza di un monomio`, retro: R`$(a x^m)^n = a^n x^{mn}$: ogni fattore, coefficiente compreso, va elevato alla potenza.` },
    { id: 'fc-08', sezione: 'operazioni-monomi', tipo: 'concetto', fronte: R`Quando il quoziente di due monomi è ancora un monomio?`, retro: R`Quando l'esponente di ogni lettera nel dividendo è maggiore o uguale a quello nel divisore.` },
    { id: 'fc-09', sezione: 'mcd-mcm-monomi', tipo: 'procedura', fronte: R`Come si calcola il MCD di più monomi?`, retro: R`MCD dei coefficienti; per ogni lettera comune a tutti i monomi, l'esponente più piccolo.` },
    { id: 'fc-10', sezione: 'mcd-mcm-monomi', tipo: 'procedura', fronte: R`Come si calcola il mcm di più monomi?`, retro: R`mcm dei coefficienti; per ogni lettera presente in almeno un monomio, l'esponente più grande.` },
    { id: 'fc-11', sezione: 'polinomi', tipo: 'definizione', fronte: R`Che cos'è un polinomio?`, retro: R`Una somma algebrica di due o più monomi non simili tra loro; ciascun monomio è un termine.` },
    { id: 'fc-12', sezione: 'polinomi', tipo: 'definizione', fronte: R`Grado di un polinomio`, retro: R`Il più alto tra i gradi complessivi dei suoi termini.` },
    { id: 'fc-13', sezione: 'polinomi', tipo: 'concetto', fronte: R`Polinomio omogeneo`, retro: R`Tutti i suoi termini hanno lo stesso grado complessivo.` },
    { id: 'fc-14', sezione: 'polinomi', tipo: 'concetto', fronte: R`Polinomio completo rispetto a una lettera`, retro: R`Contiene, per quella lettera, tutti i gradi da quello massimo fino a $0$.` },
    { id: 'fc-15', sezione: 'operazioni-polinomi', tipo: 'procedura', fronte: R`Come si sommano due polinomi?`, retro: R`Si scrivono uno di seguito all'altro (cambiando i segni per la differenza) e si riducono i termini simili.` },
    { id: 'fc-16', sezione: 'operazioni-polinomi', tipo: 'procedura', fronte: R`Come si moltiplicano due polinomi?`, retro: R`Si moltiplica ogni termine del primo per ogni termine del secondo, poi si riducono i termini simili.` },
    { id: 'fc-17', sezione: 'prodotti-notevoli', tipo: 'formula', fronte: R`Somma per differenza`, retro: R`$(a+b)(a-b) = a^2 - b^2$` },
    { id: 'fc-18', sezione: 'prodotti-notevoli', tipo: 'formula', fronte: R`Quadrato di binomio`, retro: R`$(a \pm b)^2 = a^2 \pm 2ab + b^2$` },
    { id: 'fc-19', sezione: 'prodotti-notevoli', tipo: 'formula', fronte: R`Quadrato di trinomio`, retro: R`$(a+b+c)^2 = a^2+b^2+c^2+2ab+2ac+2bc$` },
    { id: 'fc-20', sezione: 'prodotti-notevoli', tipo: 'formula', fronte: R`Cubo di binomio`, retro: R`$(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3$, con i segni alternati nella differenza.` },
    { id: 'fc-21', sezione: 'divisione-polinomi', tipo: 'concetto', fronte: R`Identità della divisione fra polinomi`, retro: R`$P(x) = Q(x)\cdot D(x) + R(x)$, con il grado di $R(x)$ minore di quello di $D(x)$ (o $R(x)=0$).` },
    { id: 'fc-22', sezione: 'divisione-polinomi', tipo: 'concetto', fronte: R`Divisione esatta fra polinomi`, retro: R`Il resto $R(x)$ è $0$: il divisore $D(x)$ divide $P(x)$ senza resto.` },
    { id: 'fc-23', sezione: 'ruffini', tipo: 'concetto', fronte: R`Teorema del resto`, retro: R`Il resto della divisione di $P(x)$ per $(x-a)$ è uguale a $P(a)$.` },
    { id: 'fc-24', sezione: 'ruffini', tipo: 'concetto', fronte: R`Teorema di Ruffini`, retro: R`$(x-a)$ divide esattamente $P(x)$ se e solo se $P(a)=0$, cioè se $a$ è una radice di $P(x)$.` },
    { id: 'fc-25', sezione: 'ruffini', tipo: 'procedura', fronte: R`Passi della regola di Ruffini`, retro: R`Coefficienti di $P(x)$ (zero per i termini mancanti); abbassa il primo; moltiplica per $a$ e somma al successivo, ripetendo; l'ultimo numero è il resto.` },
    { id: 'fc-26', sezione: 'triangolo-tartaglia', tipo: 'procedura', fronte: R`Come si costruisce una riga del triangolo di Tartaglia dalla precedente?`, retro: R`Ogni numero interno è la somma dei due numeri sovrastanti nella riga precedente; ogni riga inizia e finisce con $1$.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $3x + 5x$.`, suggerimenti: [R`I due monomi sono simili: somma i coefficienti.`], risposta: { tipo: 'testo', accettate: ['8x'], segnaposto: 'es. 2x' }, soluzione: [R`$3x$ e $5x$ sono simili: la parte letterale è $x$ in tutti e due.`, R`Sommo i coefficienti: $3 + 5 = 8$. Il risultato è $8x$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $6a^2 - 9a^2$. Scrivi gli esponenti con ^: $a^2$ si scrive *a^2*.`, suggerimenti: [R`Monomi simili: sottrai i coefficienti, la parte letterale resta $a^2$.`, R`$6 - 9$ è un numero negativo.`], risposta: { tipo: 'testo', accettate: ['-3a^2', '-3*a^2'], segnaposto: 'es. 3a^2' }, soluzione: [R`$6a^2$ e $9a^2$ sono simili.`, R`$6 - 9 = -3$, e la parte letterale resta com'è: $-3a^2$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $2x \cdot 3x$. Esponenti con ^.`, suggerimenti: [R`Moltiplica i coefficienti. Poi $x \cdot x$.`], risposta: { tipo: 'testo', accettate: ['6x^2'], segnaposto: 'es. 4x^3' }, soluzione: [R`Coefficienti: $2 \cdot 3 = 6$.`, R`Lettere: $x \cdot x = x^{1 + 1} = x^2$. Il risultato è $6x^2$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola $4a^3 \cdot (-2a^2)$. Esponenti con ^.`, suggerimenti: [R`Nel prodotto gli esponenti della stessa lettera si sommano.`, R`Attento al segno: $4 \cdot (-2)$.`], risposta: { tipo: 'testo', accettate: ['-8a^5'], segnaposto: 'es. 4x^3' }, soluzione: [R`Coefficienti: $4 \cdot (-2) = -8$.`, R`Lettere: $a^3 \cdot a^2 = a^{3 + 2} = a^5$. Il risultato è $-8a^5$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Calcola $10x^5 : 2x^2$. Esponenti con ^.`, suggerimenti: [R`Dividi i coefficienti e sottrai gli esponenti.`], risposta: { tipo: 'testo', accettate: ['5x^3'], segnaposto: 'es. 4x^3' }, soluzione: [R`Coefficienti: $10 : 2 = 5$.`, R`Lettere: $x^5 : x^2 = x^{5 - 2} = x^3$. Il risultato è $5x^3$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola $(3x^2)^2$. Esponenti con ^.`, suggerimenti: [R`Eleva al quadrato anche il coefficiente.`, R`$(x^2)^2$: gli esponenti si moltiplicano.`], risposta: { tipo: 'testo', accettate: ['9x^4'], segnaposto: 'es. 4x^3' }, soluzione: [R`Coefficiente: $3^2 = 9$.`, R`Lettera: $(x^2)^2 = x^{2 \cdot 2} = x^4$. Il risultato è $9x^4$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola $2a^2b \cdot 3ab^3$. Esponenti con ^.`, suggerimenti: [R`Moltiplica i coefficienti. Poi le $a$ fra loro e le $b$ fra loro.`, R`$a$ da sola ha esponente $1$.`], risposta: { tipo: 'testo', accettate: ['6a^3b^4', '6b^4a^3'], segnaposto: 'es. 4x^2y' }, soluzione: [R`Coefficienti: $2 \cdot 3 = 6$.`, R`Lettera $a$: $a^2 \cdot a = a^3$. Lettera $b$: $b \cdot b^3 = b^4$.`, R`Il risultato è $6a^3b^4$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Calcola $4xy - 6xy + xy$.`, suggerimenti: [R`Sono tutti simili. $xy$ ha coefficiente $1$.`, R`$4 - 6 + 1$.`], risposta: { tipo: 'testo', accettate: ['-xy', '-yx', '-1xy'], segnaposto: 'es. 2ab' }, soluzione: [R`I tre monomi sono simili: la parte letterale è $xy$.`, R`Coefficienti: $4 - 6 + 1 = -1$.`, R`Il risultato è $-1xy$, che si scrive $-xy$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Calcola $(-3x^2)^3$. Esponenti con ^.`, suggerimenti: [R`Eleva al cubo il coefficiente, con il suo segno.`, R`$(-3)^3$: esponente dispari, il segno meno resta.`], risposta: { tipo: 'testo', accettate: ['-27x^6', '-27*x^6'], segnaposto: 'es. 4x^3' }, soluzione: [R`Coefficiente: $(-3)^3 = -27$.`, R`Lettera: $(x^2)^3 = x^{2 \cdot 3} = x^6$. Il risultato è $-27x^6$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Calcola $3x(x + 2)$. Esponenti con ^.`, suggerimenti: [R`Moltiplica $3x$ per ciascun termine della parentesi.`], risposta: { tipo: 'testo', accettate: ['3x^2+6x', '6x+3x^2'], segnaposto: 'es. 2x^2+5x' }, soluzione: [R`$3x \cdot x = 3x^2$.`, R`$3x \cdot 2 = 6x$. Il risultato è $3x^2 + 6x$.`] },
    { id: 'b-11', livello: 'base', difficolta: 1, testo: R`Calcola $(2x^2 + 3x - 1) + (x^2 - 5x + 4)$. Esponenti con ^.`, suggerimenti: [R`Togli le parentesi: davanti c'è un più, i segni non cambiano.`, R`Somma i termini simili: gli $x^2$, gli $x$, i numeri.`], risposta: { tipo: 'testo', accettate: ['3x^2-2x+3', '3-2x+3x^2'], segnaposto: 'es. 2x^2+x-1' }, soluzione: [R`Tolgo le parentesi: $2x^2 + 3x - 1 + x^2 - 5x + 4$.`, R`$2x^2 + x^2 = 3x^2$, $3x - 5x = -2x$, $-1 + 4 = 3$.`, R`Il risultato è $3x^2 - 2x + 3$.`] },
    { id: 'b-12', livello: 'base', difficolta: 1, testo: R`Calcola $(4x^2 + x) - (x^2 - 3x + 2)$. Esponenti con ^.`, suggerimenti: [R`Il meno davanti alla parentesi cambia il segno a tutti i termini dentro.`], risposta: { tipo: 'testo', accettate: ['3x^2+4x-2', '-2+4x+3x^2'], segnaposto: 'es. 2x^2+x-1' }, soluzione: [R`Tolgo la seconda parentesi cambiando tutti i segni: $4x^2 + x - x^2 + 3x - 2$.`, R`$4x^2 - x^2 = 3x^2$, $x + 3x = 4x$, resta $-2$.`, R`Il risultato è $3x^2 + 4x - 2$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Calcola $-2a(a^2 - 3a + 1)$. Esponenti con ^.`, suggerimenti: [R`Moltiplica $-2a$ per ciascuno dei tre termini.`, R`Meno per meno fa più: $-2a \cdot (-3a) = +6a^2$.`], risposta: { tipo: 'testo', accettate: ['-2a^3+6a^2-2a', '-2a+6a^2-2a^3'], segnaposto: 'es. 2x^3-x^2+x' }, soluzione: [R`$-2a \cdot a^2 = -2a^3$.`, R`$-2a \cdot (-3a) = +6a^2$.`, R`$-2a \cdot 1 = -2a$. Il risultato è $-2a^3 + 6a^2 - 2a$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Calcola $(x + 3)(x + 2)$. Esponenti con ^.`, suggerimenti: [R`Moltiplica ogni termine del primo per ogni termine del secondo: quattro prodotti.`, R`Scorciatoia: il coefficiente di $x$ è $3 + 2$, il termine noto è $3 \cdot 2$.`], risposta: { tipo: 'testo', accettate: ['x^2+5x+6', '6+5x+x^2'], segnaposto: 'es. x^2+2x+1' }, soluzione: [R`I quattro prodotti: $x \cdot x + x \cdot 2 + 3 \cdot x + 3 \cdot 2 = x^2 + 2x + 3x + 6$.`, R`Sommo i termini simili: $2x + 3x = 5x$.`, R`Il risultato è $x^2 + 5x + 6$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Calcola $(x - 4)(x + 1)$. Esponenti con ^.`, suggerimenti: [R`Quattro prodotti, poi somma i termini simili.`, R`Scorciatoia: somma $-4 + 1$, prodotto $-4 \cdot 1$.`], risposta: { tipo: 'testo', accettate: ['x^2-3x-4', '-4-3x+x^2'], segnaposto: 'es. x^2+2x+1' }, soluzione: [R`I quattro prodotti: $x^2 + x - 4x - 4$.`, R`Sommo i termini simili: $x - 4x = -3x$.`, R`Il risultato è $x^2 - 3x - 4$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Calcola $(x + 5)(x - 5)$ con la somma per differenza. Esponenti con ^.`, suggerimenti: [R`$(a + b)(a - b) = a^2 - b^2$, con $a = x$ e $b = 5$.`], risposta: { tipo: 'testo', accettate: ['x^2-25', '-25+x^2'], segnaposto: 'es. x^2-9' }, soluzione: [R`È una somma per differenza con $a = x$ e $b = 5$.`, R`$a^2 - b^2 = x^2 - 25$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Sviluppa $(x + 3)^2$. Esponenti con ^.`, suggerimenti: [R`Quadrato del primo, doppio prodotto, quadrato del secondo.`, R`Il doppio prodotto è $2 \cdot x \cdot 3$.`], risposta: { tipo: 'testo', accettate: ['x^2+6x+9', '9+6x+x^2'], segnaposto: 'es. x^2+2x+1' }, soluzione: [R`Quadrato del primo: $x^2$. Quadrato del secondo: $3^2 = 9$.`, R`Doppio prodotto: $2 \cdot x \cdot 3 = 6x$.`, R`Il risultato è $x^2 + 6x + 9$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Sviluppa $(a - 4)^2$. Esponenti con ^.`, suggerimenti: [R`$(a - b)^2 = a^2 - 2ab + b^2$: il doppio prodotto ha il meno.`], risposta: { tipo: 'testo', accettate: ['a^2-8a+16', '16-8a+a^2'], segnaposto: 'es. x^2-2x+1' }, soluzione: [R`Quadrati: $a^2$ e $4^2 = 16$, tutti e due positivi.`, R`Doppio prodotto con il meno: $-2 \cdot a \cdot 4 = -8a$.`, R`Il risultato è $a^2 - 8a + 16$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Sviluppa $(2x + 1)^2$. Esponenti con ^.`, suggerimenti: [R`Il primo termine è $2x$: il suo quadrato è $(2x)^2$.`, R`$(2x)^2 = 4x^2$, non $2x^2$.`], risposta: { tipo: 'testo', accettate: ['4x^2+4x+1', '1+4x+4x^2'], segnaposto: 'es. x^2+2x+1' }, soluzione: [R`Quadrato del primo: $(2x)^2 = 4x^2$.`, R`Doppio prodotto: $2 \cdot 2x \cdot 1 = 4x$. Quadrato del secondo: $1$.`, R`Il risultato è $4x^2 + 4x + 1$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Calcola $(2x + 3)(x - 1)$. Esponenti con ^.`, suggerimenti: [R`Moltiplica ogni termine del primo per ogni termine del secondo.`, R`I quattro prodotti sono $2x^2$, $-2x$, $3x$, $-3$.`], risposta: { tipo: 'testo', accettate: ['2x^2+x-3', '-3+x+2x^2', '2x^2+1x-3'], segnaposto: 'es. 2x^2+x-1' }, soluzione: [R`$2x \cdot x = 2x^2$ e $2x \cdot (-1) = -2x$.`, R`$3 \cdot x = 3x$ e $3 \cdot (-1) = -3$.`, R`Sommo i termini simili: $-2x + 3x = x$. Il risultato è $2x^2 + x - 3$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Calcola il prodotto $(3x^2y)\cdot(-2xy^3)$.`, suggerimenti: [R`Moltiplica prima i coefficienti, poi occupati delle lettere.`, R`Ricorda: nel prodotto di potenze della stessa lettera gli esponenti si sommano.`], risposta: { tipo: 'testo', accettate: ['-6x^3y^4', '-6x^3*y^4', '-6*x^3*y^4', '-6*x^3y^4'] }, soluzione: [R`Coefficienti: $3 \cdot (-2) = -6$.`, R`Lettera $x$: $x^2 \cdot x^1 = x^3$. Lettera $y$: $y^1 \cdot y^3 = y^4$.`, R`Il prodotto è $-6x^3y^4$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Calcola il quoziente $(15x^6y^4) : (5x^2y^3)$.`, suggerimenti: [R`Dividi separatamente i coefficienti e le potenze di ogni lettera.`, R`Nel quoziente di potenze della stessa lettera gli esponenti si sottraggono.`], risposta: { tipo: 'testo', accettate: ['3x^4y', '3x^4*y', '3*x^4*y', '3*x^4y', '3yx^4'] }, soluzione: [R`Coefficienti: $15:5=3$.`, R`Lettera $x$: $x^{6-2}=x^4$. Lettera $y$: $y^{4-3}=y^1=y$.`, R`Il quoziente è $3x^4y$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Qual è il grado complessivo del monomio $7a^4bc^2$?`, suggerimenti: [R`Il grado complessivo è la somma degli esponenti di tutte le lettere.`, R`Non dimenticare la lettera $b$, anche se il suo esponente è $1$.`], risposta: { tipo: 'numero', valore: 7, tolleranza: 0.01 }, soluzione: [R`Gli esponenti sono $4$ (per $a$), $1$ (per $b$) e $2$ (per $c$).`, R`La somma è $4+1+2=7$. Il coefficiente $7$ non conta nel grado.`] },

    { id: 'es-04', difficolta: 1, testo: R`Trova il MCD tra i monomi $8a^2b^3$ e $12a^3bc$.`, suggerimenti: [R`Il MCD dei coefficienti è $4$.`, R`Per ogni lettera comune, prendi l'esponente più piccolo. Una lettera che non è in tutti e due resta fuori.`], risposta: { tipo: 'testo', accettate: ['4a^2b', '4a^2*b', '4*a^2*b', '4*a^2b', '4ba^2'] }, soluzione: [R`MCD dei coefficienti: $\text{MCD}(8,12)=4$.`, R`Per $a$: $\min(2,3)=2$. Per $b$: $\min(3,1)=1$.`, R`La $c$ è solo nel secondo monomio, quindi resta fuori. Il MCD è $4a^2b$.`] },

    { id: 'es-05', difficolta: 1, testo: R`Trova il mcm tra i monomi $8a^2b^3$ e $12a^3bc$.`, suggerimenti: [R`Il mcm dei coefficienti è $24$.`, R`Per ogni lettera, anche se è in un solo monomio, prendi l'esponente più grande.`], risposta: { tipo: 'testo', accettate: ['24a^3b^3c', '24a^3*b^3*c', '24*a^3*b^3*c', '24*a^3b^3c'] }, soluzione: [R`mcm dei coefficienti: $\text{mcm}(8,12)=24$.`, R`Per $a$: $\max(2,3)=3$. Per $b$: $\max(3,1)=3$. La $c$ entra con esponente $1$.`, R`Il mcm è $24a^3b^3c$.`] },

    { id: 'es-06', difficolta: 1, testo: R`Sviluppa $(3x-2)^2$ usando il quadrato di binomio.`, suggerimenti: [R`$(a-b)^2=a^2-2ab+b^2$, con $a=3x$ e $b=2$.`, R`Attento al quadrato del coefficiente: $(3x)^2=9x^2$, non $3x^2$.`], risposta: { tipo: 'testo', accettate: ['9x^2-12x+4', '4-12x+9x^2'] }, soluzione: [R`$a=3x$, $b=2$: $a^2=9x^2$, $2ab=12x$, $b^2=4$.`, R`$(3x-2)^2 = 9x^2-12x+4$.`] },

    { id: 'es-07', difficolta: 1, testo: R`Calcola $(5x-2)(5x+2)$ con la somma per differenza.`, suggerimenti: [R`Riconosci lo schema $(a-b)(a+b)=a^2-b^2$.`, R`$a=5x$, $b=2$: calcola $a^2$ e $b^2$.`], risposta: { tipo: 'testo', accettate: ['25x^2-4'] }, soluzione: [R`$a=5x$, $b=2$: $a^2=25x^2$, $b^2=4$.`, R`$(5x-2)(5x+2)=25x^2-4$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Sviluppa $(x-3)^3$ usando il cubo di binomio.`, suggerimenti: [R`$(a-b)^3=a^3-3a^2b+3ab^2-b^3$, con $a=x$, $b=3$.`, R`Calcola i quattro termini uno alla volta prima di sommarli.`], risposta: { tipo: 'testo', accettate: ['x^3-9x^2+27x-27', '-27+27x-9x^2+x^3'] }, soluzione: [R`$a^3=x^3$, $3a^2b=3\cdot x^2\cdot 3=9x^2$, $3ab^2=3\cdot x\cdot 9=27x$, $b^3=27$.`, R`I segni si alternano: $(x-3)^3 = x^3-9x^2+27x-27$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Sviluppa il quadrato del trinomio $(x-y+2)^2$.`, suggerimenti: [R`$(a+b+c)^2=a^2+b^2+c^2+2ab+2ac+2bc$, con $a=x$, $b=-y$, $c=2$.`, R`Attento ai segni dei doppi prodotti che coinvolgono $b=-y$.`], soluzione: [R`Quadrati: $x^2$, $(-y)^2=y^2$, $2^2=4$.`, R`Doppi prodotti: $2x(-y)=-2xy$, $2 \cdot x \cdot 2=4x$, $2(-y) \cdot 2=-4y$.`, R`$(x-y+2)^2 = x^2+y^2+4-2xy+4x-4y$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Esegui la divisione $(2x^3 - x^2 - 4) : (x^2+2)$ con l'algoritmo generale.`, suggerimenti: [R`Dividi prima i termini di grado massimo: $2x^3 : x^2$.`, R`Dopo aver sottratto il primo prodotto, ripeti il procedimento sul resto parziale.`], soluzione: [R`$2x^3:x^2=2x$; $2x\cdot(x^2+2)=2x^3+4x$; resto parziale: $(2x^3-x^2-4)-(2x^3+4x) = -x^2-4x-4$.`, R`$-x^2:x^2=-1$; $-1\cdot(x^2+2)=-x^2-2$; resto: $(-x^2-4x-4)-(-x^2-2)=-4x-2$.`, R`Il grado di $-4x-2$ è minore del grado del divisore: ci si ferma. Quoziente $2x-1$, resto $-4x-2$.`] },

    { id: 'es-12', difficolta: 2, testo: R`Usa la regola di Ruffini per dividere $(x^3-2x^2+4):(x+1)$ e trova quoziente e resto. Poi controlla il resto con il teorema del resto.`, suggerimenti: [R`Il polinomio non è completo: manca il termine in $x$. I coefficienti sono $1,\ -2,\ 0,\ 4$.`, R`$x+1 = x-(-1)$, quindi $a=-1$.`, R`Per il controllo calcola $P(-1)$.`], soluzione: [R`Coefficienti: $1,\ -2,\ 0,\ 4$; $a=-1$.`, R`Abbasso $1$. Poi $1\cdot(-1)=-1$ e $-2+(-1)=-3$.`, R`$-3\cdot(-1)=3$ e $0+3=3$. Poi $3\cdot(-1)=-3$ e $4+(-3)=1$.`, R`Quoziente $x^2-3x+3$, resto $1$.`, R`Controllo: $P(-1)=-1-2+4=1$, uguale al resto trovato.`] },

    { id: 'es-13', difficolta: 3, testo: R`Per quale valore di $k$ il binomio $(x-2)$ divide esattamente il polinomio $x^3-kx+6$?`, suggerimenti: [R`Per il teorema di Ruffini, deve essere $P(2)=0$.`, R`Sostituisci $x=2$ nel polinomio e risolvi l'equazione in $k$.`], risposta: { tipo: 'numero', valore: 7, tolleranza: 0.01 }, soluzione: [R`$P(2) = 8-2k+6 = 14-2k$.`, R`Deve essere $14-2k=0$, cioè $k=7$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti espressioni è un monomio?`, opzioni: [R`$3x+y$`, R`$3x^2y$`, R`$\dfrac{5}{x}$`, R`$\sqrt{x}$`], corretta: 1, spiegazione: R`$3x^2y$ è un prodotto di numeri e lettere con esponente naturale. $3x+y$ è una somma (un binomio), $\dfrac{5}{x}$ ha una lettera al denominatore, $\sqrt{x}$ ha una lettera sotto radice: nessuna delle tre è un monomio.` },
    { id: 'q-02', domanda: R`Due monomi sono simili quando…`, opzioni: [R`hanno lo stesso grado complessivo`, R`hanno lo stesso coefficiente`, R`hanno la stessa parte letterale`, R`sono entrambi di grado $2$`], corretta: 2, spiegazione: R`La somiglianza riguarda solo lettere ed esponenti (la parte letterale); i coefficienti possono essere qualunque. Avere lo stesso grado complessivo non basta: $x^2y$ e $xy^2$ hanno grado $3$ ma non sono simili.` },
    { id: 'q-03', domanda: R`Qual è il grado di un monomio costante non nullo, per esempio $7$?`, opzioni: [R`Non è definito`, R`È sempre $1$`, R`È uguale al valore della costante`, R`È $0$`], corretta: 3, spiegazione: R`Un numero da solo non ha lettere, quindi la somma degli esponenti (il grado) è $0$. "Non definito" vale invece per il monomio nullo, cioè per $0$.` },
    { id: 'q-04', domanda: R`Nel prodotto $x^3 \cdot x^5$, gli esponenti…`, opzioni: [R`si moltiplicano, risultato $x^{15}$`, R`si sommano, risultato $x^8$`, R`si sottraggono, risultato $x^2$`, R`restano invariati`], corretta: 1, spiegazione: R`Nel prodotto di potenze con la stessa base gli esponenti si sommano: $x^3 \cdot x^5 = x^{3+5} = x^8$. Si moltiplicano invece nella potenza di una potenza, $(x^3)^5=x^{15}$.` },
    { id: 'q-05', domanda: R`Il quoziente $x^7 : x^4$ è ancora un monomio perché…`, opzioni: [R`i coefficienti di $x^7$ e di $x^4$ sono tutti e due $1$`, R`$7$ e $4$ sono tutti e due numeri naturali`, R`$7 \ge 4$: l'esponente non diventa negativo`, R`il quoziente di due monomi è sempre un monomio`], corretta: 2, spiegazione: R`Gli esponenti si sottraggono: $x^7:x^4=x^{7-4}=x^3$. Serve che l'esponente del dividendo non sia minore di quello del divisore. Anche con $4$ e $7$ naturali, $x^4:x^7=\dfrac{1}{x^3}$ non è un monomio: quindi il quoziente non lo è sempre. I coefficienti non c'entrano.` },
    { id: 'q-06', domanda: R`Nel calcolo del MCD di due monomi, una lettera che compare in uno solo dei due…`, opzioni: [R`va inclusa con l'esponente minimo`, R`va inclusa con l'esponente massimo`, R`va esclusa dal MCD`, R`annulla il MCD`], corretta: 2, spiegazione: R`Il MCD prende solo le lettere comuni a tutti i monomi, con l'esponente più piccolo. Una lettera presente in un solo monomio non è comune, quindi non entra nel MCD.` },
    { id: 'q-07', domanda: R`Nel calcolo del mcm di due monomi, l'esponente di ciascuna lettera è…`, opzioni: [R`il minimo tra i due`, R`uguale a $1$ per ogni lettera`, R`la somma dei due`, R`il massimo tra i due`], corretta: 3, spiegazione: R`Il mcm include ogni lettera presente in almeno un monomio, con l'esponente più grande con cui compare: è l'opposto del MCD. Se una lettera manca in un monomio, lì conta come esponente $0$, e il massimo è l'esponente dell'altro.` },
    { id: 'q-08', domanda: R`Il grado di un polinomio è…`, opzioni: [R`il grado più alto tra i suoi termini`, R`il numero dei suoi termini`, R`il grado del primo termine scritto`, R`la somma dei gradi di tutti i termini`], corretta: 0, spiegazione: R`Per esempio $x^5-1$ ha due termini ma grado $5$, non $2$: il grado si legge dal termine di grado più alto, non dal numero di termini.` },
    { id: 'q-09', domanda: R`Un polinomio si dice omogeneo quando…`, opzioni: [R`è ordinato rispetto a una lettera`, R`tutti i suoi termini hanno lo stesso grado complessivo`, R`ha lo stesso numero di termini di un altro polinomio`, R`contiene tutti i gradi da $0$ al massimo`], corretta: 1, spiegazione: R`Omogeneo di grado $n$ significa che ogni singolo termine ha grado complessivo $n$, come in $x^3-3x^2y+xy^2$ (grado $3$ ovunque). Le altre proprietà descrivono un polinomio ordinato o completo, non omogeneo.` },
    { id: 'q-10', domanda: R`Quale sviluppo del quadrato di binomio è corretto?`, opzioni: [R`$(a+b)^2=a^2+b^2$`, R`$(a+b)^2=a^2+ab+b^2$`, R`$(a+b)^2=a^2+2ab+b^2$`, R`$(a+b)^2=a^2-2ab+b^2$`], corretta: 2, spiegazione: R`Lo sviluppo corretto è $a^2+2ab+b^2$. In $a^2+b^2$ manca il doppio prodotto, in $a^2+ab+b^2$ il prodotto non è raddoppiato, e $a^2-2ab+b^2$ è il quadrato di $(a-b)$, non di $(a+b)$.` },
    { id: 'q-11', domanda: R`Il prodotto $(a+b)(a-b)$ si chiama…`, opzioni: [R`quadrato di binomio`, R`cubo di binomio`, R`quadrato di trinomio`, R`somma per differenza`], corretta: 3, spiegazione: R`È il prodotto di una somma per la differenza degli stessi due termini, e vale $a^2-b^2$: da qui il nome "somma per differenza".` },
    { id: 'q-12', domanda: R`Nello sviluppo del cubo di binomio $(a-b)^3$, i segni dei quattro termini sono…`, opzioni: [R`tutti positivi`, R`alternati, a partire da $+$`, R`alternati, a partire da $-$`, R`dipendono dai valori di $a$ e $b$`], corretta: 1, spiegazione: R`$(a-b)^3 = a^3-3a^2b+3ab^2-b^3$: i segni sono $+,-,+,-$, sempre a partire da $+$ per il primo termine.` },
    { id: 'q-13', domanda: R`Nella divisione fra polinomi $P(x) = Q(x)D(x)+R(x)$, il resto $R(x)$ (quando non è $0$)…`, opzioni: [R`ha grado maggiore del divisore`, R`è sempre un monomio`, R`ha grado minore del divisore`, R`è sempre negativo`], corretta: 2, spiegazione: R`È proprio questa condizione sul grado a dire quando ci si può fermare nell'algoritmo della divisione: appena il resto parziale ha grado minore del divisore, il procedimento finisce. Il resto può avere più termini, come $2x - 2$ nell'esempio della teoria. E non ha un segno fisso: dividendo $x^3-2x^2+4$ per $(x+1)$ il resto è $1$, positivo.` },
    { id: 'q-14', domanda: R`La regola di Ruffini permette di dividere velocemente un polinomio per un divisore del tipo…`, opzioni: [R`$(x-a)$`, R`un trinomio qualsiasi`, R`$(x^2+1)$`, R`un polinomio di grado qualunque`], corretta: 0, spiegazione: R`Ruffini funziona solo per divisori lineari della forma $(x-a)$. Per un divisore come $(x^2+1)$, di grado $2$, serve l'algoritmo generale della divisione.` },
    { id: 'q-15', domanda: R`Per il teorema del resto, il resto della divisione di $P(x)$ per $(x-a)$ è uguale a…`, opzioni: [R`$P(0)$`, R`$a$`, R`$P(a)$`, R`sempre $0$`], corretta: 2, spiegazione: R`Il teorema del resto dice che basta sostituire $x=a$ nel polinomio per ottenere il resto, senza eseguire alcuna divisione.` },
    { id: 'q-16', domanda: R`Per il teorema di Ruffini, $(x-a)$ divide esattamente $P(x)$ se e solo se…`, opzioni: [R`$a=0$`, R`$P(0)=a$`, R`il grado di $P$ è pari`, R`$P(a)=0$`], corretta: 3, spiegazione: R`$P(a)=0$ significa che $a$ è una radice di $P(x)$: in tal caso, e solo in tal caso, il resto della divisione per $(x-a)$ è $0$.` },
    { id: 'q-17', domanda: R`Nel triangolo di Tartaglia, ogni numero interno di una riga (che non sia agli estremi) si ottiene…`, opzioni: [R`sommando i due numeri della riga precedente che gli stanno sopra`, R`moltiplicando i due numeri della riga precedente che gli stanno sopra`, R`copiandolo dalla stessa posizione della riga precedente`, R`sommando tutta la riga precedente`], corretta: 0, spiegazione: R`È la regola di costruzione del triangolo: per esempio nella riga $1,4,6,4,1$ il $6$ è la somma dei due $3$ della riga precedente.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Sommare monomi non simili come se i termini letterali si potessero fondere: $3x + 2x^2$ non fa $5x^3$. Resta un binomio: gli esponenti si sommano solo nel prodotto, mai nella somma.` },
    { tipo: 'errore', testo: R`$(a+b)^2 \ne a^2+b^2$: manca il doppio prodotto $2ab$. È l'errore più comune di tutto l'argomento, e si ritrova identico in ogni prodotto notevole con due o più termini.` },
    { tipo: 'errore', testo: R`Nella regola di Ruffini, se dimentichi lo $0$ di un termine mancante, i coefficienti si sfasano tutti: un polinomio incompleto va sempre completato prima di leggerne i coefficienti.` },
    { tipo: 'errore', testo: R`Nel cubo di un binomio con la differenza, $(a-b)^3$, i segni si alternano $+,-,+,-$: dimenticare l'alternanza fa sparire un segno meno.` },
    { tipo: 'trucco', testo: R`Per verificare in fretta se $a$ è radice di $P(x)$, sostituisci: se $P(a)=0$ hai trovato un fattore $(x-a)$, senza bisogno di dividere.` },
    { tipo: 'trucco', testo: R`Per il MCD e il mcm di monomi, tratta separatamente il coefficiente numerico e ogni singola lettera: sono due calcoli indipendenti che poi si moltiplicano insieme.` },
    { tipo: 'metodo', testo: R`Prima di sommare due polinomi, scrivili entrambi ordinati rispetto alla stessa lettera: i termini simili si riconoscono a colpo d'occhio, uno sotto l'altro.` },
    { tipo: 'metodo', testo: R`Quando riconosci uno schema $(x+a)(x+b)$, guarda subito somma e prodotto di $a$ e $b$: ti danno il coefficiente di $x$ e il termine noto, senza sviluppare tutto il prodotto.` }
  ],

  aneddoti: [
    { matematico: 'Michael Stifel', anni: '1487–1567', titolo: 'Il pastore che sbagliò la fine del mondo', testo: R`Michael Stifel era un pastore luterano a Lochau, in Germania. In un libro del 1532 annunciò la fine del mondo. Sarebbe arrivata alle otto di mattina di un giorno di ottobre del 1533. Molti parrocchiani gli credettero. Vendettero i loro beni e quel mattino aspettarono in chiesa. Il mondo non finì, e Stifel perse il posto. Lutero e Melantone lo aiutarono, e dal 1535 fu pastore a Holzdorf. Nel 1544 pubblicò a Norimberga l'*Arithmetica integra*. Lì compare per la prima volta la parola «esponente». Stifel vi scrive anche la regola. Nel prodotto di potenze gli esponenti si sommano, nel quoziente si sottraggono. E la regola vale anche per gli esponenti negativi.`, legame: R`Sono le regole che usi per moltiplicare e dividere i monomi, lettera per lettera.` },
    { matematico: 'Paolo Ruffini', anni: '1765–1822', titolo: 'Il medico che divideva i polinomi', testo: R`Paolo Ruffini insegnava matematica all'università di Modena, ma era anche medico. Nel 1817 un'epidemia di tifo colpì la città. Ruffini continuò a visitare i malati e si ammalò anche lui. Guarito, scrisse un resoconto scientifico della malattia. Lo raccontava dal punto di vista, raro, di un medico che era stato anche paziente. In matematica il suo nome resta legato allo schema rapido per dividere un polinomio per $(x-a)$. Ma il suo risultato più ambizioso fu un altro. Tentò di dimostrare che le equazioni di quinto grado non si risolvono, in generale, con una formula di radicali. Fino al quarto grado, invece, quella formula esiste. La sua dimostrazione, pubblicata nel 1799, aveva delle lacune. Il norvegese Niels Abel ne diede una completa nel 1824. Oggi si parla di «teorema di Abel-Ruffini».`, legame: R`La regola che porta il suo nome è lo schema per dividere un polinomio per $(x-a)$.` },
    { matematico: 'al-Samaw\'al al-Maghribi', anni: '1130–1180 circa', titolo: 'Un trattato di algebra scritto a diciannove anni', testo: R`Al-Samaw'al nacque a Baghdad verso il 1130 e studiò medicina e matematica. Aveva circa diciannove anni quando scrisse *al-Bahir*, un trattato di algebra. Lì mette in fila le potenze dell'incognita: $x$, $x^2$, $x^3$ e così via. Poi continua la fila dall'altra parte, con $\dfrac{1}{x}$, $\dfrac{1}{x^2}$, $\dfrac{1}{x^3}$. Sono le potenze con esponente negativo, e lui ci fa i conti senza paura. Sa anche dividere un polinomio per un altro. Quando la divisione non è esatta, continua il quoziente con le potenze negative. Nel libro riporta poi i coefficienti binomiali di al-Karaji, vissuto più di un secolo prima. Le pagine di al-Karaji su questo tema sono andate perdute. Le conosciamo grazie a lui.`, legame: R`Nel suo trattato c'è già la divisione fra polinomi che studi in questa pagina.` },
    { matematico: 'Isaac Newton', anni: '1642–1727', titolo: 'Il binomio esteso a ogni esponente', testo: R`Fra il 1665 e il 1666 l'università di Cambridge restò chiusa per un'epidemia di peste. Newton, poco più che ventenne, si ritirò nella tenuta di famiglia, a Woolsthorpe. Lì lavorò da solo a una generalizzazione del triangolo di Tartaglia. Fino ad allora si sapeva sviluppare $(a+b)^n$ solo per $n$ intero positivo, riga per riga nel triangolo. Newton trovò una formula che vale anche con esponenti negativi o frazionari. Il prezzo è uno sviluppo con infiniti termini, invece che con un numero finito. La comunicò per lettera a Leibniz solo nel 1676, dieci anni dopo, senza una dimostrazione completa. Quegli anni di isolamento forzato oggi si chiamano i suoi «anni mirabili». Ne nacquero anche le prime idee sul calcolo infinitesimale.`, legame: R`Il «binomio di Newton» del formulario è la stessa formula del triangolo di Tartaglia. Al posto della riga del triangolo usa il simbolo $\binom{n}{k}$.` }
  ]
});
})();
