(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'monomi-polinomi',
  titolo: 'Monomi, polinomi e prodotti notevoli',

  introduzione: R`Un rettangolo ha i lati lunghi $x$ e $x + 3$. Quanto misura la sua area? Non conosci $x$, ma puoi scrivere lo stesso il risultato: $x(x + 3) = x^2 + 3x$. Questo è **calcolo letterale**: si fanno le operazioni con le lettere, che stanno al posto di numeri che ancora non conosci.

Il pezzo più semplice è il **monomio**, un prodotto di numeri e lettere come $3x^2$. Sommando monomi diversi si ottiene un **polinomio**, come $x^2 + 3x$. Qui impari a sommarli, moltiplicarli e dividerli.

Alcuni prodotti tornano così spesso che conviene sapere il risultato a memoria: sono i **prodotti notevoli**, come $(a + b)^2$. Per la divisione per $(x - a)$ c'è invece una scorciatoia, la **regola di Ruffini**. Ti servono le proprietà delle potenze: sono le stesse dei numeri, applicate alle lettere.`,

  inBreve: [
    R`Nel prodotto di monomi gli esponenti della stessa lettera si **sommano**; nella somma no: si sommano solo monomi simili, e la parte letterale resta com'è.`,
    R`Due monomi sono simili se hanno **la stessa parte letterale**, lettera per lettera: $x^2y$ e $xy^2$ non lo sono, anche se hanno lo stesso grado.`,
    R`Per moltiplicare due polinomi moltiplichi **ogni** termine del primo per **ogni** termine del secondo, poi sommi i termini simili.`,
    R`$(a + b)^2 = a^2 + 2ab + b^2$: il doppio prodotto $2ab$ non si dimentica mai. E $(a + b)(a - b) = a^2 - b^2$.`,
    R`Con Ruffini il polinomio va scritto **completo**: per ogni grado che manca si mette uno $0$.`,
    R`Il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$: se $P(a) = 0$ la divisione è esatta.`
  ],

  sezioni: [
    { id: 'monomi', titolo: 'Monomi: definizione e grado', testo: R`$-5x^3y^2$ vuol dire $-5 \cdot x \cdot x \cdot x \cdot y \cdot y$: un numero e alcune lettere, tutto moltiplicato. Un'espressione fatta così si chiama monomio.

>* Un **monomio** è un prodotto di numeri e lettere, con le lettere elevate a esponenti naturali. Niente somme, niente lettere al denominatore, niente lettere sotto radice.

Quindi $3x^2y$ e $\dfrac{1}{2}a$ sono monomi; $3x + y$ (c'è una somma), $\dfrac{5}{x}$ (lettera al denominatore) e $\sqrt{x}$ (lettera sotto radice) no.

Un monomio è in **forma normale** quando è scritto come un numero seguito dalle lettere, ognuna una volta sola con il suo esponente: $-5x^3y^2$, non $x \cdot (-5) \cdot x^2 \cdot y^2$. Il numero davanti è il **coefficiente** ($-5$), le lettere con i loro esponenti sono la **parte letterale** ($x^3y^2$).

### Il grado

- Il **grado rispetto a una lettera** è l'esponente di quella lettera: $-5x^3y^2$ ha grado $3$ rispetto a $x$ e grado $2$ rispetto a $y$.
- Il **grado complessivo** è la somma degli esponenti di tutte le lettere: $3 + 2 = 5$.
- Un numero da solo, come $7$, è un monomio di grado $0$ (non ha lettere). Il monomio $0$, detto **nullo**, non ha grado.

?? Qual è il grado complessivo di $4x^2yz^3$?
[ ] $5$
[x] $6$
[ ] $9$
[ ] $24$
=> Gli esponenti sono $2$, $1$ e $3$: la somma è $6$. Chi risponde $5$ ha dimenticato la $y$, che ha esponente $1$ anche se non si scrive. $24$ viene dal moltiplicare il coefficiente per gli esponenti: il coefficiente non c'entra con il grado.

### Monomi simili

>* Due monomi sono **simili** se hanno la stessa parte letterale: le stesse lettere, ciascuna con lo stesso esponente. I coefficienti possono essere diversi.

$3x^2y$ e $-7x^2y$ sono simili. $3x^2y$ e $3xy^2$ no: hanno le stesse lettere, ma gli esponenti sono scambiati.

>! Avere lo stesso grado non basta: $x^2y$ e $xy^2$ hanno entrambi grado $3$, ma non sono simili. Bisogna confrontare gli esponenti lettera per lettera.` },

    { id: 'operazioni-monomi', titolo: 'Operazioni con i monomi', testo: R`### Somma

$3$ mele più $5$ mele fanno $8$ mele; $3$ mele più $5$ pere restano $3$ mele e $5$ pere. Con i monomi è lo stesso: $3x^2y + 5x^2y = 8x^2y$, perché la «cosa» che si conta, $x^2y$, è la stessa.

>* Si sommano solo monomi **simili**: si sommano i coefficienti e la parte letterale **resta com'è**. Se i monomi non sono simili, la somma non si semplifica: $3x^2 + 5x$ resta così.

?? Quanto fa $3x + 2x^2$?
[ ] $5x^3$
[ ] $5x^2$
[ ] $6x^3$
[x] non si semplifica: resta $3x + 2x^2$
=> $3x$ e $2x^2$ non sono simili ($x$ e $x^2$ sono «cose» diverse), quindi la somma resta così com'è. $5x^3$ è l'errore più comune: sommare gli esponenti è una regola del **prodotto**, non della somma. $6x^3$ è proprio il prodotto $3x \cdot 2x^2$.

### Prodotto

Nel prodotto invece tutti i monomi si possono unire. Moltiplichi i coefficienti fra loro e, lettera per lettera, sommi gli esponenti (è la regola $a^m \cdot a^n = a^{m+n}$).

~ (2x^3y) \cdot (-3xy^2) :: il prodotto da calcolare
~ \evid{2 \cdot (-3)} \cdot x^3 \cdot x \cdot y \cdot y^2 :: riordino: prima i numeri, poi le lettere uguali vicine
~ -6 \cdot x^{\evid{3+1}} \cdot y^{\evid{1+2}} :: stessa lettera: sommo gli esponenti ($x$ da sola ha esponente $1$)
~ \evidb{-6x^4y^3} :: il risultato

### Potenza

Per elevare a potenza un monomio elevi **ogni** fattore, coefficiente compreso, e moltiplichi gli esponenti delle lettere (regola $(a^m)^n = a^{m \cdot n}$).

~ (-2x^3y)^3 :: la potenza da calcolare
~ (\evid{-2})^3 \cdot (\evid{x^3})^3 \cdot \evid{y}^3 :: elevo al cubo ogni fattore
~ -8 \cdot x^{\evid{3 \cdot 3}} \cdot y^3 :: $(-2)^3 = -8$: esponente dispari, il segno meno resta
~ \evidb{-8x^9y^3} :: il risultato

Con esponente pari il segno diventa positivo: $(-2x^3)^2 = 4x^6$.

### Quoziente

Dividi i coefficienti e, lettera per lettera, sottrai gli esponenti (regola $a^m : a^n = a^{m-n}$): $(12x^5y^2) : (4x^2y) = 3x^{5-2}y^{2-1} = 3x^3y$.

>! Il quoziente è un monomio solo se ogni lettera del divisore compare nel dividendo con esponente **uguale o maggiore**. $x^2 : x^5$ darebbe $x^{-3} = \dfrac{1}{x^3}$, con la lettera al denominatore: non è un monomio.` },

    { id: 'mcd-mcm-monomi', titolo: 'MCD e mcm di monomi', testo: R`MCD e mcm dei monomi si calcolano come per i numeri: le lettere si comportano come fattori primi. Si lavora in due tempi, prima i coefficienti e poi le lettere, una alla volta.

>* **MCD:** MCD dei coefficienti, per le lettere comuni a **tutti** i monomi, ognuna con l'esponente **più piccolo**.

>* **mcm:** mcm dei coefficienti, per **tutte** le lettere che compaiono, ognuna con l'esponente **più grande**.

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
=> $\text{MCD}(4, 6) = 2$; $a$ e $b$ sono in tutti e due, con esponente minimo $1$; la $c$ è solo nel secondo, quindi non entra. $2abc$ è l'errore tipico: la lettera non comune va esclusa dal MCD. $12a^2b^3c$ è invece il mcm.

>! Le lettere che non sono in tutti i monomi si **escludono** dal MCD e si **includono** nel mcm, mai il contrario.` },

    { id: 'polinomi', titolo: 'Polinomi: definizione e grado', testo: R`Quando i monomi non sono simili, la somma non si semplifica e resta scritta così: $3x^2 - 5x + 7$. Questo è un polinomio.

>* Un **polinomio** è una somma di monomi non simili fra loro. Ogni monomio è un **termine** del polinomio.

Secondo il numero di termini si chiama **binomio** (due, come $x^5 - 1$), **trinomio** (tre, come $x^2 + 2x + 1$), **quadrinomio** (quattro).

>* Il **grado** di un polinomio è il grado più alto fra quelli dei suoi termini. $3x^2y - 5x + 7$ ha grado $3$: il termine $3x^2y$ ha grado $2 + 1 = 3$, gli altri meno.

?? Qual è il grado di $x^5 - 1$?
[ ] $2$
[x] $5$
[ ] $6$
[ ] $4$
=> Il termine di grado più alto è $x^5$, quindi il grado è $5$. $2$ è il numero dei termini (è un binomio), che non ha niente a che fare con il grado. $6$ viene dal contare il $-1$ come un termine di grado $1$: un numero da solo ha grado $0$.

Ci sono alcune parole da conoscere per descrivere un polinomio:

| parola | che cosa vuol dire | esempio |
|---|---|---|
| ridotto (forma normale) | non ci sono termini simili da sommare | $2x^2 + x$ sì, $x^2 + x + x^2$ no |
| ordinato | gli esponenti di una lettera vanno in ordine, crescente o decrescente | $x^3 - 2x^2 + 5$ |
| completo | rispetto a una lettera, ci sono tutti i gradi dal massimo fino a $0$ | $x^3 + x^2 - x + 4$ |
| omogeneo | tutti i termini hanno lo stesso grado | $x^3 - 3x^2y + xy^2$ (tutti di grado $3$) |

$x^3 - 2x^2 + 5$ è ordinato ma non completo: manca il termine con $x$. Quando serve (per esempio nella divisione e con Ruffini) lo si completa scrivendo $x^3 - 2x^2 + 0x + 5$.

>! Prima di leggere il grado, riduci il polinomio: $x^3 + 2x - x^3$ sembra di grado $3$, ma i due $x^3$ si cancellano e resta $2x$, di grado $1$.` },

    { id: 'operazioni-polinomi', titolo: 'Operazioni con i polinomi', testo: R`### Somma e differenza

Si tolgono le parentesi e si sommano i termini simili. Nella **differenza** il meno davanti alla parentesi cambia il segno a **tutti** i termini che ci sono dentro.

~ (3x^2 - 2x + 1) - (x^2 + 5x - 4) :: una differenza
~ 3x^2 - 2x + 1 \evid{- x^2 - 5x + 4} :: tolgo la seconda parentesi cambiando segno a tutti e tre i termini
~ (\evid{3x^2 - x^2}) + (\evid{-2x - 5x}) + (\evid{1 + 4}) :: raggruppo i termini simili
~ \evidb{2x^2 - 7x + 5} :: sommo i coefficienti

>! L'errore tipico è cambiare segno solo al primo termine della parentesi: $-(x^2 + 5x - 4)$ fa $-x^2 - 5x + 4$, non $-x^2 + 5x - 4$.

### Prodotto

Per moltiplicare un monomio per un polinomio si usa la proprietà distributiva: il monomio moltiplica ciascun termine. $2x \cdot (3x^2 - x + 4) = 6x^3 - 2x^2 + 8x$.

>* Per moltiplicare due polinomi si moltiplica **ogni** termine del primo per **ogni** termine del secondo, poi si sommano i termini simili. Il grado del prodotto è la somma dei gradi dei fattori.

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
=> $(x + 4)(x + 1) = x^2 + x + 4x + 4 = x^2 + 5x + 4$. Chi scrive $x^2 + 4$ ha moltiplicato solo primo con primo e ultimo con ultimo, dimenticando i due prodotti in mezzo: è l'errore più comune. In $x^2 + 5x + 5$ il termine noto è stato sommato invece che moltiplicato: $4 \cdot 1 = 4$.

Nell'esempio si vede una regola comoda: in $(x + a)(x + b)$ il coefficiente di $x$ è la **somma** $a + b$ e il termine noto è il **prodotto** $ab$.

$$(x + a)(x + b) = x^2 + (a + b)\,x + ab$$

Con $a = 2$ e $b = -5$: somma $-3$, prodotto $-10$, e infatti il risultato era $x^2 - 3x - 10$. Questa regola, letta al contrario, servirà per scomporre i trinomi.` },

    { id: 'prodotti-notevoli', titolo: 'I prodotti notevoli', testo: R`Alcuni prodotti tornano così spesso che conviene conoscerne il risultato a memoria, invece di rifare ogni volta tutte le moltiplicazioni. Si chiamano **prodotti notevoli**. Letti al contrario, saranno la base della scomposizione in fattori.

| nome | formula |
|---|---|
| somma per differenza | $(a + b)(a - b) = a^2 - b^2$ |
| quadrato di binomio | $(a \pm b)^2 = a^2 \pm 2ab + b^2$ |
| quadrato di trinomio | $(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc$ |
| cubo di binomio | $(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3$ |

### Somma per differenza

Da dove viene $a^2 - b^2$? Fai il prodotto come al solito e guarda che cosa succede ai termini in mezzo:

~ (a + b)(a - b) :: la somma di due termini per la loro differenza
~ a^2 \evid{- ab + ba} - b^2 :: ogni termine per ogni termine
~ a^2 - b^2 :: $-ab$ e $+ba$ sono opposti e si cancellano

>* **Somma per differenza:** $(a + b)(a - b) = a^2 - b^2$, il quadrato del primo meno il quadrato del secondo. Per esempio $(3x - 2)(3x + 2) = (3x)^2 - 2^2 = 9x^2 - 4$.

### Quadrato di binomio

Un quadrato è un prodotto per sé stesso: $(a + b)^2 = (a + b)(a + b)$. Questa volta i termini in mezzo non si cancellano, si sommano.

~ (a + b)^2 = (a + b)(a + b) :: il quadrato è il binomio moltiplicato per sé stesso
~ a^2 \evid{+ ab + ba} + b^2 :: ogni termine per ogni termine
~ a^2 + \evid{2ab} + b^2 :: $ab$ e $ba$ sono uguali: sommati fanno $2ab$, il **doppio prodotto**

>* **Quadrato di binomio:** $(a + b)^2 = a^2 + 2ab + b^2$ e $(a - b)^2 = a^2 - 2ab + b^2$. Quadrato del primo, doppio prodotto, quadrato del secondo.

L'animazione fa vedere la stessa cosa con le aree: un quadrato di lato $a + b$ si divide in un quadrato $a^2$, un quadrato $b^2$ e **due** rettangoli $ab$.

[[animazione:quadrato-binomio]]

Con i monomi al posto di $a$ e $b$ bisogna fare attenzione ai coefficienti e ai segni:

~ (2x - 3y)^2 :: qui $a = 2x$ e $b = 3y$, con il meno
~ (\evid{2x})^2 - 2 \cdot \evid{2x} \cdot \evid{3y} + (\evid{3y})^2 :: applico la formula con il segno meno sul doppio prodotto
~ \evidb{4x^2 - 12xy + 9y^2} :: $(2x)^2 = 4x^2$: si eleva al quadrato anche il coefficiente

?? Quanto fa $(x + 5)^2$?
[ ] $x^2 + 25$
[ ] $x^2 + 5x + 25$
[x] $x^2 + 10x + 25$
[ ] $x^2 + 10x + 10$
=> Il doppio prodotto è $2 \cdot x \cdot 5 = 10x$, quindi $(x + 5)^2 = x^2 + 10x + 25$. $x^2 + 25$ è l'errore più frequente di tutto l'argomento: dimentica il doppio prodotto. Prova con $x = 1$: $(1 + 5)^2 = 36$, mentre $1 + 25 = 26$.

### Quadrato di trinomio

Con tre termini la regola si allarga: i tre quadrati, più il doppio prodotto di **ogni coppia** di termini (le coppie sono tre).

~ (x + y - 1)^2 :: qui $a = x$, $b = y$, $c = -1$
~ \evid{x^2 + y^2 + 1} + \ldots :: i tre quadrati: $(-1)^2 = 1$, sempre positivo
~ x^2 + y^2 + 1 \evid{+ 2xy - 2x - 2y} :: i doppi prodotti $2 \cdot x \cdot y$, $2 \cdot x \cdot (-1)$, $2 \cdot y \cdot (-1)$

### Cubo di binomio

$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. Con la differenza i segni si alternano: $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$.

~ (x - 2)^3 :: $a = x$, $b = 2$, con il meno
~ x^3 - 3 \cdot x^2 \cdot \evid{2} + 3 \cdot x \cdot \evid{2^2} - \evid{2^3} :: il cubo del primo, i due **tripli prodotti**, il cubo del secondo; segni $+ - + -$
~ \evidb{x^3 - 6x^2 + 12x - 8} :: faccio i conti

>! $(a + b)^3$ non è $a^3 + b^3$, così come $(a + b)^2$ non è $a^2 + b^2$: mancano i termini con i prodotti. Se hai un dubbio, prova con due numeri piccoli: $(1 + 1)^3 = 8$, mentre $1^3 + 1^3 = 2$.` },

    { id: 'divisione-polinomi', titolo: 'La divisione fra polinomi', testo: R`$17 : 5$ fa $3$ con resto $2$, perché $17 = 3 \cdot 5 + 2$, e il resto $2$ è più piccolo del divisore $5$. Con i polinomi funziona allo stesso modo, solo che «più piccolo» vuol dire «di grado più basso».

>* Dividere $P(x)$ (**dividendo**) per $D(x)$ (**divisore**) vuol dire trovare un **quoziente** $Q(x)$ e un **resto** $R(x)$ tali che $$P(x) = Q(x) \cdot D(x) + R(x)$$ con il grado di $R(x)$ **minore** del grado di $D(x)$. Se $R(x) = 0$ la divisione è **esatta**: $D(x)$ divide $P(x)$.

Si procede a colpi ripetuti, sempre con la stessa mossa: dividi il termine di grado più alto del dividendo per il termine di grado più alto del divisore, moltiplichi il divisore per quello che hai trovato e lo sottrai. Poi ricominci da quello che resta.

~ (2x^3 - 3x^2 + 4x - 5) : (x^2 + 1) :: la divisione da fare
~ 2x^3 : x^2 = \evid{2x} :: termine di grado più alto diviso termine di grado più alto: è il primo pezzo del quoziente
~ \text{resta } \evid{-3x^2 + 2x - 5} :: dal dividendo sottraggo $2x \cdot (x^2 + 1) = 2x^3 + 2x$: il termine $2x^3$ sparisce
~ -3x^2 : x^2 = \evid{-3} :: ricomincio da quello che è rimasto: secondo pezzo del quoziente
~ \text{resta } \evid{2x - 2} :: da $-3x^2 + 2x - 5$ sottraggo $(-3) \cdot (x^2 + 1) = -3x^2 - 3$
~ Q(x) = \evidb{2x - 3} \qquad R(x) = \evidb{2x - 2} :: $2x - 2$ ha grado $1$, meno del divisore (grado $2$): mi fermo

Il controllo si fa con l'uguaglianza del riquadro: $(2x - 3)(x^2 + 1) + (2x - 2) = 2x^3 + 2x - 3x^2 - 3 + 2x - 2 = 2x^3 - 3x^2 + 4x - 5$. ✓

Se il dividendo ha già grado minore del divisore non c'è niente da dividere: il quoziente è $0$ e il resto è il dividendo stesso.

>! Nella sottrazione cambia segno a **tutti** i termini che togli: sottrarre $2x^3 + 2x$ vuol dire scrivere $-2x^3 - 2x$. E tieni il dividendo **ordinato**, dal grado più alto al più basso: se un grado manca, lascia il suo posto vuoto (o scrivi $0x$), altrimenti metti in colonna termini che non sono simili.` },

    { id: 'ruffini', titolo: 'La regola di Ruffini', testo: R`Quando il divisore è un binomio come $(x - 1)$, $(x - 3)$ o $(x + 2)$, cioè della forma $(x - a)$, la divisione si fa con uno schema molto più veloce: la **regola di Ruffini**. Si lavora solo con i coefficienti, senza scrivere le lettere.

Per trovare $a$ leggi il numero **con il segno cambiato**: in $(x - 1)$ è $a = 1$; in $(x + 2) = (x - (-2))$ è $a = -2$.

?? Per dividere per $(x + 3)$ con Ruffini, che numero metti a sinistra nella tabella?
[ ] $3$
[x] $-3$
[ ] $x$
[ ] $1$
=> $x + 3 = x - (-3)$, quindi $a = -3$. Mettere $3$ è l'errore più comune: il divisore è $(x - a)$, e il segno di $a$ è l'opposto di quello che vedi scritto.

Dividiamo $2x^3 + 3x^2 - 8x + 3$ per $(x - 1)$, quindi $a = 1$. Nella prima riga della tabella vanno i coefficienti, a sinistra $a$:

~ 2 \quad 3 \quad -8 \quad 3 :: i coefficienti, dal grado più alto al termine noto
~ \evid{2} :: abbasso il primo coefficiente così com'è
~ 2 \cdot 1 = 2 \;\to\; 3 + 2 = \evid{5} :: moltiplico per $a = 1$ e sommo al coefficiente successivo
~ 5 \cdot 1 = 5 \;\to\; -8 + 5 = \evid{-3} :: ripeto con il numero appena trovato
~ -3 \cdot 1 = -3 \;\to\; 3 + (-3) = \evidb{0} :: ultima volta: questo è il resto

La tabella finita si scrive così:

| | $2$ | $3$ | $-8$ | $3$ |
|---|---|---|---|---|
| $1$ | | $2$ | $5$ | $-3$ |
| | $2$ | $5$ | $-3$ | $0$ |

L'ultima riga si legge così: l'ultimo numero ($0$) è il resto; gli altri ($2$, $5$, $-3$) sono i coefficienti del quoziente, che ha **un grado in meno** del dividendo: $Q(x) = 2x^2 + 5x - 3$.

>! Il polinomio va scritto **completo**: per ogni grado che manca metti uno $0$. Per dividere $x^3 - 4$ per $(x - 2)$ la prima riga è $1$, $0$, $0$, $-4$, non $1$, $-4$. Se salti gli zeri, tutti i numeri successivi finiscono nel posto sbagliato.

### Il resto senza dividere

Nell'esempio il resto era $0$. Prova a calcolare il polinomio in $x = 1$: $P(1) = 2 + 3 - 8 + 3 = 0$. Non è un caso.

>* **Teorema del resto:** il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$.

>* **Teorema di Ruffini:** $(x - a)$ divide esattamente $P(x)$ se e solo se $P(a) = 0$, cioè se $a$ è uno **zero** (o **radice**) del polinomio.

Il motivo sta nell'uguaglianza della divisione: $P(x) = Q(x) \cdot (x - a) + R$. Se al posto di $x$ metti $a$, il fattore $(x - a)$ diventa $0$ e resta solo $P(a) = R$.` },

    { id: 'triangolo-tartaglia', titolo: 'Il triangolo di Tartaglia', testo: R`Guarda i coefficienti dei prodotti notevoli: $(a + b)^2$ ha $1, 2, 1$; $(a + b)^3$ ha $1, 3, 3, 1$. E $(a + b)^4$? Invece di moltiplicare tutto, c'è uno schema che li dà già pronti: il **triangolo di Tartaglia**.

$$\begin{array}{c} 1 \\ 1 \quad 1 \\ 1 \quad 2 \quad 1 \\ 1 \quad 3 \quad 3 \quad 1 \\ 1 \quad 4 \quad 6 \quad 4 \quad 1 \\ 1 \quad 5 \quad 10 \quad 10 \quad 5 \quad 1 \end{array}$$

>* **Come si costruisce:** ogni riga comincia e finisce con $1$; ogni numero interno è la somma dei due che gli stanno sopra. Per esempio $6 = 3 + 3$ e $10 = 4 + 6$.

Le righe si contano partendo da $0$: la riga $0$ è il solo $1$, la riga $2$ è $1, 2, 1$ (il quadrato), la riga $3$ è $1, 3, 3, 1$ (il cubo). In generale la riga $n$ dà i coefficienti di $(a + b)^n$. Gli esponenti fanno il resto: quelli di $a$ scendono da $n$ a $0$, quelli di $b$ salgono da $0$ a $n$.

~ (x + 2)^4 :: $a = x$, $b = 2$: serve la riga $4$, cioè $1, 4, 6, 4, 1$
~ x^4 + \evid{4} \cdot 2x^3 + \evid{6} \cdot 4x^2 + \evid{4} \cdot 8x + 16 :: i coefficienti dal triangolo; l'esponente di $x$ scende, le potenze di $2$ salgono: $2$, $4$, $8$, $16$
~ \evidb{x^4 + 8x^3 + 24x^2 + 32x + 16} :: faccio i conti: $4 \cdot 2 = 8$, $6 \cdot 4 = 24$, $4 \cdot 8 = 32$

Per $(a - b)^n$ i coefficienti sono gli stessi, ma i segni si alternano cominciando da $+$: $(a - b)^4 = a^4 - 4a^3b + 6a^2b^2 - 4ab^3 + b^4$.

?? Quali sono i coefficienti di $(a + b)^5$?
[ ] $1, 5, 5, 5, 5, 1$
[x] $1, 5, 10, 10, 5, 1$
[ ] $1, 4, 6, 4, 1$
[ ] $1, 5, 10, 5, 1$
=> È la riga $5$ del triangolo: $1$, poi $1 + 4 = 5$, $4 + 6 = 10$, $6 + 4 = 10$, $4 + 1 = 5$, e $1$. $1, 4, 6, 4, 1$ è la riga $4$: si sbaglia riga se si comincia a contare da $1$ invece che da $0$. La riga $n$ ha sempre $n + 1$ numeri.

Questi numeri si chiamano **coefficienti binomiali** e si scrivono $\binom{n}{k}$. Con loro lo sviluppo si scrive in una riga, il **binomio di Newton**: $(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$. Come calcolarli senza il triangolo lo vedrai nel calcolo combinatorio.

>! In $(a - b)^n$ i segni si alternano **sempre** a partire da $+$ sul primo termine. Con $n$ dispari l'ultimo termine è negativo ($-b^3$ nel cubo), con $n$ pari è positivo ($+b^4$).` }
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
    { nome: 'Quadrato di trinomio', formula: R`(a+b+c)^2 = a^2+b^2+c^2+2ab+2ac+2bc` },
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
    { id: 'es-01', difficolta: 1, testo: R`Calcola il prodotto $(3x^2y)\cdot(-2xy^3)$.`, suggerimenti: [R`Moltiplica prima i coefficienti, poi occupati delle lettere.`, R`Ricorda: nel prodotto di potenze della stessa lettera gli esponenti si sommano.`], risposta: { tipo: 'testo', accettate: ['-6x^3y^4', '-6x^3*y^4', '-6*x^3*y^4', '-6*x^3y^4'] }, soluzione: [R`Coefficienti: $3 \cdot (-2) = -6$.`, R`Lettera $x$: $x^2 \cdot x^1 = x^3$. Lettera $y$: $y^1 \cdot y^3 = y^4$.`, R`Il prodotto è $-6x^3y^4$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Calcola il quoziente $(12x^5y^3) : (4x^2y)$.`, suggerimenti: [R`Dividi separatamente i coefficienti e le potenze di ogni lettera.`, R`Nel quoziente di potenze della stessa lettera gli esponenti si sottraggono.`], risposta: { tipo: 'testo', accettate: ['3x^3y^2', '3x^3*y^2', '3*x^3*y^2', '3*x^3y^2'] }, soluzione: [R`Coefficienti: $12:4=3$.`, R`Lettera $x$: $x^{5-2}=x^3$. Lettera $y$: $y^{3-1}=y^2$.`, R`Il quoziente è $3x^3y^2$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Qual è il grado complessivo del monomio $-5x^3y^2z$?`, suggerimenti: [R`Il grado complessivo è la somma degli esponenti di tutte le lettere.`, R`Non dimenticare la lettera $z$, anche se il suo esponente è $1$.`], risposta: { tipo: 'numero', valore: 6, tolleranza: 0.01 }, soluzione: [R`Gli esponenti sono $3$ (per $x$), $2$ (per $y$) e $1$ (per $z$).`, R`La somma è $3+2+1=6$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Trova il MCD tra i monomi $12x^3y^2$ e $18x^2y$.`, suggerimenti: [R`Il MCD dei coefficienti è $6$.`, R`Per ogni lettera comune, prendi l'esponente più piccolo.`], risposta: { tipo: 'testo', accettate: ['6x^2y', '6x^2*y', '6*x^2*y', '6*x^2y'] }, soluzione: [R`MCD dei coefficienti: $\text{MCD}(12,18)=6$.`, R`Per $x$: $\min(3,2)=2$. Per $y$: $\min(2,1)=1$.`, R`Il MCD è $6x^2y$.`] },

    { id: 'es-05', difficolta: 1, testo: R`Trova il mcm tra i monomi $12x^3y^2$ e $18x^2y$.`, suggerimenti: [R`Il mcm dei coefficienti è $36$.`, R`Per ogni lettera, prendi l'esponente più grande.`], risposta: { tipo: 'testo', accettate: ['36x^3y^2', '36x^3*y^2', '36*x^3*y^2', '36*x^3y^2'] }, soluzione: [R`mcm dei coefficienti: $\text{mcm}(12,18)=36$.`, R`Per $x$: $\max(3,2)=3$. Per $y$: $\max(2,1)=2$.`, R`Il mcm è $36x^3y^2$.`] },

    { id: 'es-06', difficolta: 1, testo: R`Sviluppa $(2x-3)^2$ usando il quadrato di binomio.`, suggerimenti: [R`$(a-b)^2=a^2-2ab+b^2$, con $a=2x$ e $b=3$.`, R`Attento al quadrato del coefficiente: $(2x)^2=4x^2$, non $2x^2$.`], risposta: { tipo: 'testo', accettate: ['4x^2-12x+9'] }, soluzione: [R`$a=2x$, $b=3$: $a^2=4x^2$, $2ab=12x$, $b^2=9$.`, R`$(2x-3)^2 = 4x^2-12x+9$.`] },

    { id: 'es-07', difficolta: 1, testo: R`Calcola $(5x-2)(5x+2)$ con la somma per differenza.`, suggerimenti: [R`Riconosci lo schema $(a-b)(a+b)=a^2-b^2$.`, R`$a=5x$, $b=2$: calcola $a^2$ e $b^2$.`], risposta: { tipo: 'testo', accettate: ['25x^2-4'] }, soluzione: [R`$a=5x$, $b=2$: $a^2=25x^2$, $b^2=4$.`, R`$(5x-2)(5x+2)=25x^2-4$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Sviluppa $(x-2)^3$ usando il cubo di binomio.`, suggerimenti: [R`$(a-b)^3=a^3-3a^2b+3ab^2-b^3$, con $a=x$, $b=2$.`, R`Calcola i quattro termini uno alla volta prima di sommarli.`], risposta: { tipo: 'testo', accettate: ['x^3-6x^2+12x-8'] }, soluzione: [R`$a^3=x^3$, $3a^2b=3\cdot x^2\cdot 2=6x^2$, $3ab^2=3\cdot x\cdot 4=12x$, $b^3=8$.`, R`$(x-2)^3 = x^3-6x^2+12x-8$.`] },

    { id: 'es-09', difficolta: 2, testo: R`Sviluppa il quadrato del trinomio $(x+y-1)^2$.`, suggerimenti: [R`$(a+b+c)^2=a^2+b^2+c^2+2ab+2ac+2bc$, con $a=x$, $b=y$, $c=-1$.`, R`Attento ai segni dei doppi prodotti che coinvolgono $c=-1$.`], soluzione: [R`Quadrati: $x^2$, $y^2$, $(-1)^2=1$.`, R`Doppi prodotti: $2xy$, $2x(-1)=-2x$, $2y(-1)=-2y$.`, R`$(x+y-1)^2 = x^2+y^2+1+2xy-2x-2y$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Esegui la divisione $(2x^3 - x^2 - 4) : (x^2+2)$ con l'algoritmo generale.`, suggerimenti: [R`Dividi prima i termini di grado massimo: $2x^3 : x^2$.`, R`Dopo aver sottratto il primo prodotto, ripeti il procedimento sul resto parziale.`], soluzione: [R`$2x^3:x^2=2x$; $2x\cdot(x^2+2)=2x^3+4x$; resto parziale: $(2x^3-x^2-4)-(2x^3+4x) = -x^2-4x-4$.`, R`$-x^2:x^2=-1$; $-1\cdot(x^2+2)=-x^2-2$; resto: $(-x^2-4x-4)-(-x^2-2)=-4x-2$.`, R`Il grado di $-4x-2$ è minore del grado del divisore: ci si ferma. Quoziente $2x-1$, resto $-4x-2$.`] },

    { id: 'es-11', difficolta: 2, testo: R`Usa il teorema del resto per calcolare, senza dividere, il resto della divisione $(2x^3+3x^2-8x+3):(x-1)$.`, suggerimenti: [R`Il resto è il valore del polinomio calcolato in $x=1$.`, R`Sostituisci $x=1$ in $2x^3+3x^2-8x+3$.`], risposta: { tipo: 'numero', valore: 0, tolleranza: 0.01 }, soluzione: [R`Per il teorema del resto, $R = P(1)$.`, R`$P(1) = 2+3-8+3 = 0$.`, R`Il resto è $0$: significa anche che $(x-1)$ divide esattamente il polinomio.`] },

    { id: 'es-12', difficolta: 2, testo: R`Usa la regola di Ruffini per dividere $(2x^3+3x^2-8x+3):(x-1)$ e trova quoziente e resto.`, suggerimenti: [R`Scrivi i coefficienti $2,\ 3,\ -8,\ 3$ e usa $a=1$.`, R`Abbassa il primo coefficiente, poi moltiplica per $a$ e somma al successivo, ripetendo.`], soluzione: [R`Coefficienti: $2,\ 3,\ -8,\ 3$; $a=1$.`, R`Abbasso $2$; $2\cdot1=2$, $3+2=5$; $5\cdot1=5$, $-8+5=-3$; $-3\cdot1=-3$, $3+(-3)=0$.`, R`Quoziente $2x^2+5x-3$, resto $0$ (coerente con l'esercizio precedente).`] },

    { id: 'es-13', difficolta: 3, testo: R`Per quale valore di $k$ il binomio $(x-2)$ divide esattamente il polinomio $x^3-kx+6$?`, suggerimenti: [R`Per il teorema di Ruffini, deve essere $P(2)=0$.`, R`Sostituisci $x=2$ nel polinomio e risolvi l'equazione in $k$.`], risposta: { tipo: 'numero', valore: 7, tolleranza: 0.01 }, soluzione: [R`$P(2) = 8-2k+6 = 14-2k$.`, R`Deve essere $14-2k=0$, cioè $k=7$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti espressioni è un monomio?`, opzioni: [R`$3x+y$`, R`$3x^2y$`, R`$\dfrac{5}{x}$`, R`$\sqrt{x}$`], corretta: 1, spiegazione: R`$3x^2y$ è un prodotto di numeri e lettere con esponente naturale. $3x+y$ è una somma (un binomio), $\dfrac{5}{x}$ ha una lettera al denominatore, $\sqrt{x}$ ha una lettera sotto radice: nessuna delle tre è un monomio.` },
    { id: 'q-02', domanda: R`Due monomi sono simili quando…`, opzioni: [R`hanno lo stesso grado complessivo`, R`hanno lo stesso coefficiente`, R`hanno la stessa parte letterale`, R`sono entrambi di grado $2$`], corretta: 2, spiegazione: R`La somiglianza riguarda solo lettere ed esponenti (la parte letterale); i coefficienti possono essere qualunque. Avere lo stesso grado complessivo non basta: $x^2y$ e $xy^2$ hanno grado $3$ ma non sono simili.` },
    { id: 'q-03', domanda: R`Qual è il grado di un monomio costante non nullo, per esempio $7$?`, opzioni: [R`Non è definito`, R`È sempre $1$`, R`È uguale al valore della costante`, R`È $0$`], corretta: 3, spiegazione: R`Un numero da solo non ha lettere, quindi la somma degli esponenti (il grado) è $0$. "Non definito" vale invece per il monomio nullo, cioè per $0$.` },
    { id: 'q-04', domanda: R`Nel prodotto $x^3 \cdot x^5$, gli esponenti…`, opzioni: [R`si moltiplicano, risultato $x^{15}$`, R`si sommano, risultato $x^8$`, R`si sottraggono, risultato $x^2$`, R`restano invariati`], corretta: 1, spiegazione: R`Nel prodotto di potenze con la stessa base gli esponenti si sommano: $x^3 \cdot x^5 = x^{3+5} = x^8$. Si moltiplicano invece nella potenza di una potenza, $(x^3)^5=x^{15}$.` },
    { id: 'q-05', domanda: R`Il quoziente $x^7 : x^4$ è ancora un monomio perché…`, opzioni: [R`i coefficienti sono uguali`, R`il grado risultante è pari`, R`l'esponente del dividendo è maggiore o uguale a quello del divisore`, R`non è mai un monomio`], corretta: 2, spiegazione: R`Se l'esponente nel dividendo è minore di quello nel divisore, il risultato avrebbe una lettera al denominatore e non sarebbe un monomio. Qui $7 \ge 4$, quindi $x^7:x^4=x^3$.` },
    { id: 'q-06', domanda: R`Nel calcolo del MCD di due monomi, una lettera che compare in uno solo dei due…`, opzioni: [R`va inclusa con l'esponente minimo`, R`va inclusa con l'esponente massimo`, R`va esclusa dal MCD`, R`annulla il MCD`], corretta: 2, spiegazione: R`Il MCD prende solo le lettere comuni a tutti i monomi, con l'esponente più piccolo. Una lettera presente in un solo monomio non è comune, quindi non entra nel MCD.` },
    { id: 'q-07', domanda: R`Nel calcolo del mcm di due monomi, l'esponente di ciascuna lettera è…`, opzioni: [R`il minimo tra i due`, R`sempre $1$`, R`la somma dei due`, R`il massimo tra i due (trattando l'assenza come esponente $0$)`], corretta: 3, spiegazione: R`Il mcm include ogni lettera presente in almeno un monomio, con l'esponente più grande con cui compare: è l'opposto del MCD.` },
    { id: 'q-08', domanda: R`Il grado di un polinomio è…`, opzioni: [R`il grado più alto tra i suoi termini`, R`il numero dei suoi termini`, R`il grado del primo termine scritto`, R`la somma dei gradi di tutti i termini`], corretta: 0, spiegazione: R`Per esempio $x^5-1$ ha due termini ma grado $5$, non $2$: il grado si legge dal termine di grado più alto, non dal numero di termini.` },
    { id: 'q-09', domanda: R`Un polinomio si dice omogeneo quando…`, opzioni: [R`è ordinato rispetto a una lettera`, R`tutti i suoi termini hanno lo stesso grado complessivo`, R`ha lo stesso numero di termini di un altro polinomio`, R`contiene tutti i gradi da $0$ al massimo`], corretta: 1, spiegazione: R`Omogeneo di grado $n$ significa che ogni singolo termine ha grado complessivo $n$, come in $x^3-3x^2y+xy^2$ (grado $3$ ovunque). Le altre proprietà descrivono un polinomio ordinato o completo, non omogeneo.` },
    { id: 'q-10', domanda: R`Quale sviluppo del quadrato di binomio è corretto?`, opzioni: [R`$(a+b)^2=a^2+b^2$`, R`$(a+b)^2=a^2+ab+b^2$`, R`$(a+b)^2=a^2+2ab+b^2$`, R`$(a+b)^2=a^2-2ab+b^2$`], corretta: 2, spiegazione: R`Lo sviluppo corretto è $a^2+2ab+b^2$. In $a^2+b^2$ manca il doppio prodotto, in $a^2+ab+b^2$ il prodotto non è raddoppiato, e $a^2-2ab+b^2$ è il quadrato di $(a-b)$, non di $(a+b)$.` },
    { id: 'q-11', domanda: R`Il prodotto $(a+b)(a-b)$ si chiama…`, opzioni: [R`quadrato di binomio`, R`cubo di binomio`, R`quadrato di trinomio`, R`somma per differenza`], corretta: 3, spiegazione: R`È il prodotto di una somma per la differenza degli stessi due termini, e vale $a^2-b^2$: da qui il nome "somma per differenza".` },
    { id: 'q-12', domanda: R`Nello sviluppo del cubo di binomio $(a-b)^3$, i segni dei quattro termini sono…`, opzioni: [R`tutti positivi`, R`alternati, a partire da $+$`, R`alternati, a partire da $-$`, R`dipendono dai valori di $a$ e $b$`], corretta: 1, spiegazione: R`$(a-b)^3 = a^3-3a^2b+3ab^2-b^3$: i segni sono $+,-,+,-$, sempre a partire da $+$ per il primo termine.` },
    { id: 'q-13', domanda: R`Nella divisione fra polinomi $P(x) = Q(x)D(x)+R(x)$, il resto $R(x)$ (quando non è $0$)…`, opzioni: [R`deve avere grado maggiore del divisore`, R`deve essere un monomio`, R`deve avere grado minore del grado del divisore`, R`deve essere sempre negativo`], corretta: 2, spiegazione: R`È proprio questa condizione sul grado a dire quando ci si può fermare nell'algoritmo della divisione: appena il resto parziale ha grado minore del divisore, il procedimento finisce.` },
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
    { matematico: 'Diofanto di Alessandria', anni: 'III secolo d.C.', titolo: 'L\'enigma sulla tomba di Diofanto', testo: R`Diofanto scrisse l'*Arithmetica*, una raccolta di problemi risolti con numeri razionali positivi; da lui prendono il nome le "equazioni diofantee", quelle di cui si cercano le soluzioni intere. Della sua vita si sa pochissimo, ma è arrivato fino a noi un indovinello in versi, conservato nell'*Antologia Palatina*, che si racconta fosse inciso sulla sua tomba: dice che la sua infanzia durò un sesto della sua vita, poi passò un dodicesimo come adolescente e un settimo prima di sposarsi; cinque anni dopo nacque un figlio, che visse la metà degli anni del padre, e Diofanto gli sopravvisse altri quattro anni. Risolvendo l'equazione che ne segue si trova che visse $84$ anni. Non c'è modo di sapere se la storia sia vera: quel che è certo è che l'indovinello esiste, ed è scritto interamente a parole, come si scriveva l'algebra prima di avere lettere per le incognite.`, legame: R`L'indovinello si traduce in un'equazione con un polinomio in una sola incognita: lo stesso tipo di traduzione che serve per ogni problema con i polinomi.` },
    { matematico: 'Paolo Ruffini', anni: '1765–1822', titolo: 'Il medico che divideva i polinomi', testo: R`Paolo Ruffini insegnava matematica all'università di Modena, ma era anche medico praticante. Nel 1817 un'epidemia di tifo colpì la città: Ruffini continuò a visitare i malati, si ammalò lui stesso e, una volta guarito, scrisse un resoconto scientifico della malattia osservata dal punto di vista, raro, del paziente che è anche medico. In matematica il suo nome resta legato allo schema rapido per dividere un polinomio per un binomio $(x-a)$, ma il suo risultato più ambizioso fu un altro: tentò di dimostrare che le equazioni di quinto grado non si possono risolvere con una formula fatta di radicali, come invece accade fino al quarto grado. La dimostrazione, pubblicata nel 1799, aveva delle lacune; fu il norvegese Niels Abel a darne una dimostrazione completa, nel 1824. Oggi si parla di "teorema di Abel-Ruffini".`, legame: R`La regola che porta il suo nome è esattamente lo schema di calcolo che si usa per dividere un polinomio per $(x-a)$.` },
    { matematico: 'Yang Hui, Omar Khayyam e Niccolò Tartaglia', anni: 'XI–XVI secolo', titolo: 'Un triangolo con tre nomi diversi', testo: R`Lo schema che in Italia si chiama "triangolo di Tartaglia" ha una storia più lunga e più larga del nome che gli diamo. Il matematico persiano Omar Khayyam, più famoso come poeta, a cavallo fra XI e XII secolo lo usava già per calcolare le potenze del binomio (il suo trattato è andato perduto, ma lo citano autori successivi); il cinese Yang Hui lo pubblicò nel 1261, attribuendolo a sua volta a un matematico precedente, Jia Xian; in Italia comparve nel *General trattato di numeri et misure* di Niccolò Tartaglia, stampato nel 1556. In Francia lo stesso schema si chiama "triangolo di Pascal", da Blaise Pascal, che verso il 1654 ne studiò a fondo le proprietà, un secolo dopo Tartaglia. Ogni paese ricorda il matematico che glielo ha fatto conoscere in quella lingua, non necessariamente chi lo ha scoperto per primo.`, legame: R`È lo schema con cui, riga dopo riga, si leggono i coefficienti di ogni potenza del binomio, quadrato e cubo compresi.` },
    { matematico: 'Isaac Newton', anni: '1642–1727', titolo: 'Il binomio esteso a ogni esponente', testo: R`Fra il 1665 e il 1666, mentre l'università di Cambridge era chiusa per un'epidemia di peste e il ventitreenne Newton si era ritirato nella tenuta di famiglia a Woolsthorpe, lavorò per conto suo a una generalizzazione del triangolo di Tartaglia: fino ad allora si sapeva sviluppare $(a+b)^n$ solo per $n$ intero positivo, riga per riga nel triangolo. Newton trovò una formula che funziona anche quando l'esponente è negativo o frazionario, a patto di accettare uno sviluppo con infiniti termini invece che un numero finito. La comunicò per lettera a Leibniz solo dieci anni dopo, nel 1676, senza darne la dimostrazione completa. Quegli anni di isolamento forzato, che oggi si chiamano i suoi "anni mirabili", produssero anche le prime idee sul calcolo infinitesimale.`, legame: R`Il "binomio di Newton" del formulario è la stessa formula del triangolo di Tartaglia, scritta con il simbolo $\binom{n}{k}$ al posto della riga del triangolo.` }
  ]
});
})();
