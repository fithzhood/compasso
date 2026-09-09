(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'monomi-polinomi',
  titolo: 'Monomi, polinomi e prodotti notevoli',

  introduzione: R`Un monomio è la forma più semplice di espressione algebrica: un prodotto di numeri e lettere, senza somme. Un polinomio è quello che si ottiene sommando più monomi non simili, ed è il modo naturale in cui si scrive quasi ogni espressione algebrica: l'area di un rettangolo di lati $x$ e $x+3$, per esempio, è il polinomio $x^2+3x$.

I **prodotti notevoli** sono scorciatoie per alcuni prodotti di polinomi che ricorrono così spesso — il quadrato di un binomio, la somma per differenza — da meritare una formula pronta, verificata una volta per tutte invece che ricalcolata ogni volta. La **regola di Ruffini** fa lo stesso per la divisione: quando si divide per un binomio del tipo $(x-a)$, uno schema di pochi calcoli sostituisce la divisione intera.

Per seguire bene serve conoscere gli insiemi numerici e le proprietà delle potenze: qui si tratta di applicarle a espressioni con le lettere, non solo ai numeri.`,

  sezioni: [
    { id: 'monomi', titolo: 'Monomi: definizione e grado', testo: R`Un **monomio** è un'espressione algebrica formata da un prodotto di numeri e lettere, dove ogni lettera ha esponente naturale: niente somme, niente lettere al denominatore, niente lettere sotto radice.

>* **Monomio in forma normale:** un numero (il **coefficiente**) moltiplicato per un prodotto di potenze di lettere diverse (la **parte letterale**), per esempio $-5x^3y^2$. Il coefficiente è $-5$, la parte letterale è $x^3y^2$.

Il **grado complessivo** di un monomio è la somma degli esponenti di tutte le sue lettere: il grado di $-5x^3y^2$ è $3+2=5$. Il **grado rispetto a una lettera** è invece l'esponente di quella sola lettera: rispetto a $x$ il monomio ha grado $3$, rispetto a $y$ ha grado $2$.

Un numero da solo (per esempio $7$) è un monomio di grado $0$: non ha lettere. Il monomio $0$ (detto **monomio nullo**) non ha un grado definito.

Due monomi si dicono **simili** quando hanno la stessa parte letterale, cioè le stesse lettere con gli stessi esponenti: $3x^2y$ e $-7x^2y$ sono simili, $3x^2y$ e $3xy^2$ no, anche se hanno lo stesso grado complessivo.

>! Il grado complessivo non basta a decidere se due monomi sono simili: $x^2y$ e $xy^2$ hanno entrambi grado $3$, ma non sono simili perché gli esponenti delle singole lettere sono scambiati.` },

    { id: 'operazioni-monomi', titolo: 'Operazioni con i monomi', testo: R`Le quattro operazioni fondamentali sui monomi seguono le proprietà delle potenze.

**Somma.** Si possono sommare solo monomi simili: si sommano i coefficienti e si lascia invariata la parte letterale. $3x^2y + (-7x^2y) = -4x^2y$. La somma di monomi non simili, per esempio $3x^2 + 5x$, non si riduce a un monomio: resta un polinomio.

**Prodotto.** Si moltiplicano i coefficienti e, per ogni lettera, si sommano gli esponenti (prodotto di potenze con la stessa base): $(2x^3y)\cdot(-3xy^2) = -6x^4y^3$.

**Potenza.** Ogni fattore del monomio, coefficiente compreso, va elevato alla potenza: $(-2x^3)^2 = 4x^6$ (esponente pari: il segno diventa positivo), $(-2x^3)^3 = -8x^9$ (esponente dispari: il segno resta negativo).

>* **Regola delle potenze:** $a^m \cdot a^n = a^{m+n}$, $\ a^m : a^n = a^{m-n}$ (con $a \ne 0$), $\ (a^m)^n = a^{mn}$. Sono le stesse regole delle potenze numeriche, applicate a ogni lettera.

**Quoziente.** Si dividono i coefficienti e, per ogni lettera, si sottraggono gli esponenti: $(12x^5y^2):(4x^2y) = 3x^3y$. Il risultato è un monomio solo se l'esponente di ogni lettera nel dividendo è maggiore o uguale a quello nel divisore: $(x^2):(x^5)$ non è un monomio, perché darebbe $x^{-3}$, cioè una lettera al denominatore.

>! Sommare monomi non simili come se gli esponenti si sommassero è un errore frequente: $3x + 2x^2$ non fa $5x^3$. Resta $3x + 2x^2$, un binomio: le lettere si sommano negli esponenti solo nel **prodotto**, mai nella somma.` },

    { id: 'mcd-mcm-monomi', titolo: 'MCD e mcm di monomi', testo: R`Il MCD e il mcm si calcolano sui monomi allo stesso modo che sui numeri, occupandosi separatamente del coefficiente e di ogni lettera.

>* **MCD di più monomi:** il MCD dei coefficienti, moltiplicato, per ogni lettera comune a **tutti** i monomi, per quella lettera elevata al suo esponente più piccolo. Le lettere che non compaiono in ognuno dei monomi non entrano nel MCD.

>* **mcm di più monomi:** il mcm dei coefficienti, moltiplicato, per ogni lettera che compare in **almeno uno** dei monomi, elevata al suo esponente più grande.

Esempio: tra $12x^3y^2$ e $18x^2y$, $\text{MCD}(12,18)=6$; l'esponente minimo di $x$ è $\min(3,2)=2$, quello di $y$ è $\min(2,1)=1$: il MCD è $6x^2y$. Per il mcm, $\text{mcm}(12,18)=36$; gli esponenti massimi sono $3$ per $x$ e $2$ per $y$: il mcm è $36x^3y^2$.

Se una lettera compare in un solo monomio, per esempio $z$ in $5x^2z$ e non in $3x^2$, quella lettera non entra nel MCD (perché non è comune) ma entra nel mcm con il suo esponente, come se nell'altro monomio comparisse con esponente $0$.

>! Un errore tipico è dimenticare le lettere non comuni: vanno **escluse** dal MCD ma **incluse** nel mcm, mai il contrario.` },

    { id: 'polinomi', titolo: 'Polinomi: definizione e grado', testo: R`Un **polinomio** è una somma algebrica di due o più monomi non simili tra loro; ciascun monomio si chiama **termine** del polinomio. Un polinomio con due termini si chiama **binomio**, con tre **trinomio**, con quattro **quadrinomio**.

>* **Grado di un polinomio:** il più alto tra i gradi complessivi dei suoi termini. $3x^2y - 5x + 7$ ha grado $3$ (dal termine $3x^2y$, di grado $2+1$), non grado $2$.

Un polinomio è in **forma normale** (o ridotto) quando non contiene termini simili tra loro: se ce ne fossero, andrebbero prima sommati. È **ordinato** rispetto a una lettera quando i suoi termini sono scritti con gli esponenti di quella lettera in ordine crescente o decrescente; è **completo** rispetto a una lettera quando contiene tutti i gradi da quello massimo fino a $0$ (anche con coefficiente nullo, se serve per l'ordine).

Un polinomio si dice **omogeneo** quando tutti i suoi termini hanno lo stesso grado complessivo: $x^3 - 3x^2y + xy^2$ è omogeneo di grado $3$ (ogni termine ha grado $3$), mentre $x^3 - 3x^2y + x$ non lo è.

>! Il grado di un polinomio non è il numero dei suoi termini: un binomio come $x^5 - 1$ ha grado $5$, non $2$.` },

    { id: 'operazioni-polinomi', titolo: 'Operazioni con i polinomi', testo: R`**Somma e differenza.** Si scrivono i due polinomi uno di seguito all'altro (cambiando il segno di ogni termine nel caso della differenza) e si riducono i termini simili: $(3x^2 - 2x + 1) + (x^2 + 5x - 4) = 4x^2 + 3x - 3$.

**Prodotto per un monomio.** Si applica la proprietà distributiva: si moltiplica il monomio per ciascun termine del polinomio. $2x\cdot(3x^2 - x + 4) = 6x^3 - 2x^2 + 8x$.

>* **Prodotto di due polinomi:** si moltiplica ogni termine del primo per ogni termine del secondo, poi si riducono i termini simili. Il grado del prodotto è la somma dei gradi dei due fattori.

Un caso molto frequente è il prodotto di due binomi nella stessa lettera, per esempio $(x+2)(x-5)$: si moltiplicano tutti e quattro i prodotti incrociati, $x^2 - 5x + 2x - 10$, e si riduce a $x^2 - 3x - 10$. In generale, $(x+a)(x+b) = x^2 + (a+b)x + ab$: il coefficiente di $x$ è la somma di $a$ e $b$, il termine noto è il loro prodotto.

[[grafico:prodottoBinomi]]

Muovi i cursori $a$ e $b$: la parabola $y=(x+a)(x+b)$ cambia, ma i suoi zeri restano sempre $x=-a$ e $x=-b$, esattamente i valori che annullano i due fattori.

>! Nel prodotto di due polinomi bisogna moltiplicare **ogni** termine del primo per **ogni** termine del secondo: dimenticare uno dei prodotti incrociati (per esempio scrivere solo $x^2 - 10$ invece di $x^2 - 3x - 10$) è l'errore più comune.` },

    { id: 'prodotti-notevoli', titolo: 'I prodotti notevoli', testo: R`Quando i due fattori di un prodotto hanno una relazione particolare, il risultato segue sempre lo stesso schema: sono i **prodotti notevoli**, formule pronte che evitano di rifare ogni volta tutto il prodotto.

>* **Somma per differenza:** $(a+b)(a-b) = a^2 - b^2$. È il caso del prodotto $(x+a)(x+b)$ visto nella sezione precedente in cui i due termini noti sono opposti: il termine di primo grado sparisce e resta solo la differenza dei quadrati. Esempio: $(3x-2)(3x+2) = 9x^2 - 4$.

**Quadrato di binomio.** Quando i due fattori sono uguali, $(a+b)(a+b) = (a+b)^2$, e sviluppando si ottiene $(a+b)^2 = a^2+2ab+b^2$ (e $(a-b)^2 = a^2-2ab+b^2$): il quadrato del primo termine, più il doppio prodotto dei due termini, più il quadrato del secondo. L'animazione mostra perché, scomponendo un quadrato di lato $a+b$ in due quadrati e due rettangoli uguali.

[[animazione:quadrato-binomio]]

>! Il quadrato di un binomio **non** è la somma dei quadrati: manca il doppio prodotto. Il grafico confronta $y=(x+1)^2$ e $y=x^2+1$: sono due parabole diverse, che coincidono solo in un punto.

[[grafico:confrontoQuadrati]]

**Quadrato di trinomio.** Con tre termini la regola si allarga: $(a+b+c)^2 = a^2+b^2+c^2+2ab+2ac+2bc$, cioè la somma dei tre quadrati più il doppio di ogni possibile prodotto tra due termini diversi. Esempio: $(x+y-1)^2 = x^2+y^2+1+2xy-2x-2y$.

**Cubo di binomio.** $(a+b)^3 = a^3+3a^2b+3ab^2+b^3$; con la differenza i segni si alternano, $(a-b)^3 = a^3-3a^2b+3ab^2-b^3$. Esempio: $(x-2)^3 = x^3-6x^2+12x-8$.

>* Questi prodotti vanno **imparati a memoria** come schemi: applicarli è molto più veloce che moltiplicare tutto ogni volta, e riconoscerli al contrario sarà la base della scomposizione in fattori.` },

    { id: 'divisione-polinomi', titolo: 'La divisione fra polinomi', testo: R`La divisione fra due polinomi funziona come la divisione fra numeri interi: dati un dividendo $P(x)$ e un divisore $D(x)$ non nullo, si cercano un quoziente $Q(x)$ e un resto $R(x)$ tali che

$$P(x) = Q(x)\cdot D(x) + R(x)$$

con il grado di $R(x)$ **minore** del grado di $D(x)$ (oppure $R(x) = 0$). Se il grado di $P(x)$ è minore del grado di $D(x)$, il quoziente è $0$ e il resto è $P(x)$ stesso.

>* **Procedimento:** si divide il termine di grado massimo del dividendo per il termine di grado massimo del divisore; si moltiplica tutto il divisore per il risultato e lo si sottrae dal dividendo; si ripete sul resto parziale, finché il suo grado non scende sotto quello del divisore.

Esempio: $(2x^3-3x^2+4x-5):(x^2+1)$. Il primo termine del quoziente è $2x^3:x^2=2x$; $2x\cdot(x^2+1)=2x^3+2x$, e sottraendo resta $-3x^2+2x-5$. Il termine successivo è $-3x^2:x^2=-3$; $-3\cdot(x^2+1)=-3x^2-3$, e sottraendo resta $2x-2$, di grado $1$, minore del grado $2$ del divisore: ci si ferma. Quoziente $2x-3$, resto $2x-2$.

Quando $R(x) = 0$ la divisione si dice **esatta**: il divisore $D(x)$ **divide** $P(x)$.

>! Prima di dividere, conviene scrivere il dividendo in forma normale e **completa** rispetto alla lettera: un grado mancante va comunque tenuto in conto (con coefficiente $0$) durante i passaggi, altrimenti si sbagliano i conti.` },

    { id: 'ruffini', titolo: 'La regola di Ruffini', testo: R`Quando il divisore è un binomio del tipo $(x-a)$ — per esempio $(x-3)$, oppure $(x+2) = (x-(-2))$ — la divisione si può eseguire con uno schema molto più rapido dell'algoritmo generale: la **regola di Ruffini**.

>* **Regola di Ruffini:** si scrivono in riga i coefficienti di $P(x)$, ordinato e **completo** (con $0$ per ogni grado mancante); si scrive $a$ a parte; si abbassa il primo coefficiente; si moltiplica per $a$ e si somma al coefficiente successivo, ripetendo fino all'ultimo. I numeri trovati, tranne l'ultimo, sono i coefficienti del quoziente (di grado una unità in meno di $P(x)$); l'ultimo è il resto.

Esempio: $(2x^3+3x^2-8x+3):(x-1)$, con $a=1$. Coefficienti $2,\ 3,\ -8,\ 3$: si abbassa $2$; $2\cdot1=2$, $3+2=5$; $5\cdot1=5$, $-8+5=-3$; $-3\cdot1=-3$, $3+(-3)=0$. Quoziente $2x^2+5x-3$, resto $0$.

Due teoremi collegano il resto al valore del polinomio, senza bisogno di dividere.

>* **Teorema del resto:** il resto della divisione di $P(x)$ per $(x-a)$ è uguale a $P(a)$. Nell'esempio sopra, $P(1) = 2+3-8+3 = 0$: coincide con il resto trovato con Ruffini.

>* **Teorema di Ruffini:** $(x-a)$ divide esattamente $P(x)$ (resto $0$) se e solo se $P(a) = 0$, cioè se $a$ è una **radice** (uno zero) di $P(x)$. Nell'esempio, $x=1$ è una radice di $2x^3+3x^2-8x+3$.

>! L'errore più comune nella regola di Ruffini è dimenticare di scrivere $0$ per un grado mancante: dividendo $x^3 - 4$ per $(x-2)$, i coefficienti sono $1,\ 0,\ 0,\ -4$, non $1,\ -4$.` },

    { id: 'triangolo-tartaglia', titolo: 'Il triangolo di Tartaglia', testo: R`Il **triangolo di Tartaglia** è uno schema triangolare di numeri che dà rapidamente i coefficienti dello sviluppo di una potenza di binomio, senza eseguire tutti i prodotti.

- $1$
- $1 \quad 1$
- $1 \quad 2 \quad 1$
- $1 \quad 3 \quad 3 \quad 1$
- $1 \quad 4 \quad 6 \quad 4 \quad 1$

>* **Regola di costruzione:** ogni riga inizia e finisce con $1$; ogni altro numero è la somma dei due numeri della riga precedente che gli stanno sopra (per esempio, nella quinta riga $6 = 3+3$).

La riga numero $n$ (a partire da $n=0$) dà i coefficienti di $(a+b)^n$: la riga $2$, $1,\ 2,\ 1$, è proprio il quadrato di binomio $a^2+2ab+b^2$; la riga $3$, $1,\ 3,\ 3,\ 1$, è il cubo di binomio. La riga $4$ dà $(a+b)^4 = a^4+4a^3b+6a^2b^2+4ab^3+b^4$.

Per $(a-b)^n$ i coefficienti sono gli stessi, ma i segni si alternano a partire da $+$: $(a-b)^4 = a^4-4a^3b+6a^2b^2-4ab^3+b^4$.

Questi numeri si chiamano anche **coefficienti binomiali** e si indicano $\binom{n}{k}$; il **binomio di Newton** scrive in generale $(a+b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$. Il calcolo dei coefficienti binomiali con il fattoriale si vedrà con il calcolo combinatorio: qui basta saperli leggere dal triangolo.

>! Nello sviluppo di $(a-b)^n$ l'errore più comune è dimenticare l'alternanza dei segni, o farla partire dal segno sbagliato: si parte sempre con $+$ per il primo termine.` }
  ],

  grafici: {
    prodottoBinomi: {
      tipo: 'piano', x: [-6, 6], y: [-8, 8],
      parametri: [
        { nome: 'a', min: -4, max: 4, passo: 0.5, valore: 2, etichetta: 'a' },
        { nome: 'b', min: -4, max: 4, passo: 0.5, valore: -3, etichetta: 'b' }
      ],
      funzioni: [{ f: '(x+a)*(x+b)', etichetta: 'y = (x + a)(x + b)', colore: 1 }],
      punti: [
        { x: '-a', y: 0, etichetta: '−a', posizione: 'basso', colore: 2 },
        { x: '-b', y: 0, etichetta: '−b', posizione: 'basso', colore: 2 }
      ],
      didascalia: 'Muovi i cursori a e b: gli zeri della parabola sono sempre x = −a e x = −b.'
    },
    confrontoQuadrati: {
      tipo: 'piano', x: [-3, 2], y: [-1, 10],
      funzioni: [
        { f: '(x+1)^2', etichetta: 'y = (x + 1)²', colore: 1 },
        { f: 'x^2+1', etichetta: 'y = x² + 1', colore: 2 }
      ],
      punti: [{ x: 0, y: 1, etichetta: 'unico punto in comune', posizione: 'alto-destra' }],
      didascalia: 'Le due curve coincidono solo in x = 0: il quadrato di un binomio non è la somma dei quadrati.'
    }
  },

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
      R`Quadrato di binomio con $a=2x$, $b=3y$: $a^2=4x^2$, $2ab=12xy$, $b^2=9y^2$, quindi $(2x-3y)^2 = 4x^2-12xy+9y^2$.`,
      R`Cubo di binomio con $a=x$, $b=2$: $a^3=x^3$, $3a^2b=6x^2$, $3ab^2=12x$, $b^3=8$, quindi $(x+2)^3 = x^3+6x^2+12x+8$.`
    ], risultato: R`$4x^2-12xy+9y^2$ e $x^3+6x^2+12x+8$` },

    { titolo: 'Divisione fra due polinomi', problema: R`Dividi $x^3+2x^2-x+5$ per $x^2-x+1$.`, passi: [
      R`Divido i termini di grado massimo: $x^3:x^2=x$. Moltiplico il divisore per $x$: $x^3-x^2+x$, e sottraggo: $(x^3+2x^2-x+5)-(x^3-x^2+x) = 3x^2-2x+5$.`,
      R`Ripeto: $3x^2:x^2=3$. Moltiplico il divisore per $3$: $3x^2-3x+3$, e sottraggo: $(3x^2-2x+5)-(3x^2-3x+3)=x+2$.`,
      R`Il grado di $x+2$ (che è $1$) è minore del grado del divisore (che è $2$): il procedimento finisce qui.`
    ], risultato: R`Quoziente $x+3$, resto $x+2$` },

    { titolo: 'Regola di Ruffini e teorema del resto', problema: R`Dividi $2x^3+3x^2-8x+3$ per $(x-1)$ con la regola di Ruffini, poi verifica con il teorema del resto.`, passi: [
      R`Coefficienti $2,\ 3,\ -8,\ 3$, con $a=1$. Abbasso $2$.`,
      R`$2\cdot1=2$, $3+2=5$. $\ 5\cdot1=5$, $-8+5=-3$. $\ -3\cdot1=-3$, $3+(-3)=0$.`,
      R`Quoziente $2x^2+5x-3$, resto $0$.`,
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
    { id: 'q-10', domanda: R`Quale sviluppo del quadrato di binomio è corretto?`, opzioni: [R`$(a+b)^2=a^2+b^2$`, R`$(a+b)^2=a^2+ab+b^2$`, R`$(a+b)^2=a^2+2ab+b^2$`, R`$(a+b)^2=a^2-2ab+b^2$`], corretta: 2, spiegazione: R`Manca il doppio prodotto nella prima opzione, e il segno del doppio prodotto è sbagliato nell'ultima: lo sviluppo corretto è $a^2+2ab+b^2$.` },
    { id: 'q-11', domanda: R`Il prodotto $(a+b)(a-b)$ si chiama…`, opzioni: [R`quadrato di binomio`, R`cubo di binomio`, R`quadrato di trinomio`, R`somma per differenza`], corretta: 3, spiegazione: R`È il prodotto di una somma per la differenza degli stessi due termini, e vale $a^2-b^2$: da qui il nome "somma per differenza".` },
    { id: 'q-12', domanda: R`Nello sviluppo del cubo di binomio $(a-b)^3$, i segni dei quattro termini sono…`, opzioni: [R`tutti positivi`, R`alternati, a partire da $+$`, R`alternati, a partire da $-$`, R`dipendono dai valori di $a$ e $b$`], corretta: 1, spiegazione: R`$(a-b)^3 = a^3-3a^2b+3ab^2-b^3$: i segni sono $+,-,+,-$, sempre a partire da $+$ per il primo termine.` },
    { id: 'q-13', domanda: R`Nella divisione fra polinomi $P(x) = Q(x)D(x)+R(x)$, il resto $R(x)$ (quando non è $0$)…`, opzioni: [R`deve avere grado maggiore del divisore`, R`deve essere un monomio`, R`deve avere grado minore del grado del divisore`, R`deve essere sempre negativo`], corretta: 2, spiegazione: R`È proprio questa condizione sul grado a dire quando ci si può fermare nell'algoritmo della divisione: appena il resto parziale ha grado minore del divisore, il procedimento finisce.` },
    { id: 'q-14', domanda: R`La regola di Ruffini permette di dividere velocemente un polinomio per un binomio del tipo…`, opzioni: [R`$(x-a)$`, R`un trinomio qualsiasi`, R`$(x^2+1)$`, R`un polinomio di grado qualunque`], corretta: 0, spiegazione: R`Ruffini funziona solo per divisori lineari della forma $(x-a)$. Per un divisore come $(x^2+1)$, di grado $2$, serve l'algoritmo generale della divisione.` },
    { id: 'q-15', domanda: R`Per il teorema del resto, il resto della divisione di $P(x)$ per $(x-a)$ è uguale a…`, opzioni: [R`$P(0)$`, R`$a$`, R`$P(a)$`, R`sempre $0$`], corretta: 2, spiegazione: R`Il teorema del resto dice che basta sostituire $x=a$ nel polinomio per ottenere il resto, senza eseguire alcuna divisione.` },
    { id: 'q-16', domanda: R`Per il teorema di Ruffini, $(x-a)$ divide esattamente $P(x)$ se e solo se…`, opzioni: [R`$a=0$`, R`$P(0)=a$`, R`il grado di $P$ è pari`, R`$P(a)=0$`], corretta: 3, spiegazione: R`$P(a)=0$ significa che $a$ è una radice di $P(x)$: in tal caso, e solo in tal caso, il resto della divisione per $(x-a)$ è $0$.` },
    { id: 'q-17', domanda: R`Nel triangolo di Tartaglia, ogni numero interno di una riga (che non sia agli estremi) si ottiene…`, opzioni: [R`sommando i due numeri della riga precedente che gli stanno sopra`, R`moltiplicando i due numeri della riga precedente che gli stanno sopra`, R`copiandolo dalla stessa posizione della riga precedente`, R`sommando tutta la riga precedente`], corretta: 0, spiegazione: R`È la regola di costruzione del triangolo: per esempio nella riga $1,4,6,4,1$ il $6$ è la somma dei due $3$ della riga precedente.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Sommare monomi non simili come se i termini letterali si potessero fondere: $3x + 2x^2$ non fa $5x^3$. Resta un binomio: gli esponenti si sommano solo nel prodotto, mai nella somma.` },
    { tipo: 'errore', testo: R`$(a+b)^2 \ne a^2+b^2$: manca il doppio prodotto $2ab$. È l'errore più comune di tutto l'argomento, e si ritrova identico in ogni prodotto notevole con due o più termini.` },
    { tipo: 'errore', testo: R`Nella regola di Ruffini, dimentica di scrivere lo $0$ per un termine mancante e i coefficienti si sfaseranno tutti: un polinomio incompleto va sempre completato prima di leggerne i coefficienti.` },
    { tipo: 'errore', testo: R`Nel cubo di un binomio con la differenza, $(a-b)^3$, i segni si alternano $+,-,+,-$: dimenticare l'alternanza fa sparire un segno meno.` },
    { tipo: 'trucco', testo: R`Per verificare in fretta se $a$ è radice di $P(x)$, sostituisci: se $P(a)=0$ hai trovato un fattore $(x-a)$, senza bisogno di dividere.` },
    { tipo: 'trucco', testo: R`Per il MCD e il mcm di monomi, tratta separatamente il coefficiente numerico e ogni singola lettera: sono due calcoli indipendenti che poi si moltiplicano insieme.` },
    { tipo: 'metodo', testo: R`Prima di sommare due polinomi, scrivili entrambi ordinati rispetto alla stessa lettera: i termini simili si riconoscono a colpo d'occhio, uno sotto l'altro.` },
    { tipo: 'metodo', testo: R`Quando riconosci uno schema $(x+a)(x+b)$, guarda subito somma e prodotto di $a$ e $b$: ti danno il coefficiente di $x$ e il termine noto, senza sviluppare tutto il prodotto.` }
  ],

  aneddoti: [
    { matematico: 'Diofanto di Alessandria', anni: 'III secolo d.C.', titolo: 'L\'enigma sulla tomba di Diofanto', testo: R`Diofanto scrisse l'*Arithmetica*, una raccolta di problemi su equazioni con più incognite a soluzioni intere, che oggi si chiamano ancora "equazioni diofantee". Della sua vita si sa pochissimo, ma è arrivato fino a noi un indovinello in versi, conservato nell'*Antologia Palatina*, che si racconta fosse inciso sulla sua tomba: dice che la sua infanzia durò un sesto della sua vita, poi passò un dodicesimo come adolescente e un settimo prima di sposarsi; cinque anni dopo nacque un figlio, che visse la metà degli anni del padre, e Diofanto gli sopravvisse altri quattro anni. Risolvendo l'equazione che ne segue si trova che visse $84$ anni. Non c'è modo di sapere se la storia sia vera: quel che è certo è che l'indovinello esiste, ed è scritto interamente a parole, come si scriveva l'algebra prima di avere lettere per le incognite.`, legame: R`L'indovinello si traduce in un'equazione con un polinomio in una sola incognita: lo stesso tipo di traduzione che serve per ogni problema con i polinomi.` },
    { matematico: 'Paolo Ruffini', anni: '1765–1833', titolo: 'Il medico che divideva i polinomi', testo: R`Paolo Ruffini insegnava matematica all'università di Modena, ma era anche medico praticante. Nel 1817 un'epidemia di tifo colpì la città: Ruffini continuò a visitare i malati, si ammalò lui stesso e, una volta guarito, scrisse un resoconto scientifico della malattia osservata dal punto di vista, raro, del paziente che è anche medico. In matematica il suo nome resta legato allo schema rapido per dividere un polinomio per un binomio $(x-a)$, ma il suo risultato più ambizioso fu un altro: tentò di dimostrare che le equazioni di quinto grado non si possono risolvere con una formula fatta di radicali, come invece accade fino al quarto grado. La dimostrazione, pubblicata nel 1799, aveva delle lacune; fu il norvegese Niels Abel a completarla in modo rigoroso una trentina d'anni dopo. Oggi si parla di "teorema di Abel-Ruffini".`, legame: R`La regola che porta il suo nome è esattamente lo schema di calcolo che si usa per dividere un polinomio per $(x-a)$.` },
    { matematico: 'Yang Hui, Omar Khayyam e Niccolò Tartaglia', anni: 'XI–XVI secolo', titolo: 'Un triangolo con tre nomi diversi', testo: R`Lo schema che in Italia si chiama "triangolo di Tartaglia" ha una storia più lunga e più larga del nome che gli diamo. Il matematico persiano Omar Khayyam, più famoso come poeta, lo descrisse già nell'XI secolo per calcolare le potenze del binomio; il cinese Yang Hui lo pubblicò nel 1261, attribuendolo a sua volta a un matematico precedente, Jia Xian; in Italia comparve nel *General trattato di numeri et misure* di Niccolò Tartaglia, stampato nel 1556. In Francia lo stesso schema si chiama "triangolo di Pascal", da Blaise Pascal, che verso il 1654 ne studiò a fondo le proprietà, un secolo dopo Tartaglia. Ogni paese ricorda il matematico che glielo ha fatto conoscere in quella lingua, non necessariamente chi lo ha scoperto per primo.`, legame: R`È lo schema con cui, riga dopo riga, si leggono i coefficienti di ogni potenza del binomio, quadrato e cubo compresi.` },
    { matematico: 'Isaac Newton', anni: '1642–1727', titolo: 'Il binomio esteso a ogni esponente', testo: R`Fra il 1665 e il 1666, mentre l'università di Cambridge era chiusa per un'epidemia di peste e il ventitreenne Newton si era ritirato nella tenuta di famiglia a Woolsthorpe, lavorò per conto suo a una generalizzazione del triangolo di Tartaglia: fino ad allora si sapeva sviluppare $(a+b)^n$ solo per $n$ intero positivo, riga per riga nel triangolo. Newton trovò una formula che funziona anche quando l'esponente è negativo o frazionario, a patto di accettare uno sviluppo con infiniti termini invece che un numero finito. La comunicò per lettera a Leibniz solo dieci anni dopo, nel 1676, senza darne la dimostrazione completa. Quegli anni di isolamento forzato, che Newton chiamò poi i suoi "anni mirabili", produssero anche le prime idee sul calcolo infinitesimale.`, legame: R`Il "binomio di Newton" del formulario è la stessa formula del triangolo di Tartaglia, scritta con il simbolo $\binom{n}{k}$ al posto della riga del triangolo.` }
  ]
});
})();
