(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'scomposizione',
  titolo: 'Scomposizione in fattori',

  introduzione: R`Scomporre un polinomio significa scriverlo come **prodotto** di polinomi più semplici, proprio come si scrive $12 = 2^2 \cdot 3$. Per esempio $x^2 - 5x + 6 = (x - 2)(x - 3)$: due scritture diverse dello stesso polinomio, uguali per ogni valore di $x$. La prima è comoda per calcolare, la seconda per *capire*: dice subito che il polinomio vale zero per $x = 2$ e per $x = 3$.

Scomporre serve dappertutto in algebra: per risolvere le equazioni di grado superiore al primo (un prodotto è zero solo se lo è uno dei fattori), per semplificare le frazioni algebriche, per calcolare MCD e mcm di polinomi e quindi il denominatore comune. Fuori dalla scuola la fattorizzazione conta così tanto che la sicurezza dei pagamenti online si regge su un fatto: scomporre un numero di centinaia di cifre nei suoi fattori primi è, in pratica, impossibile. Con i polinomi siamo più fortunati: esistono metodi che funzionano, e qui li trovi uno per uno, con lo schema per decidere quale provare.

Serve avere già confidenza con i prodotti notevoli (quadrato e cubo di binomio, somma per differenza) e con la divisione fra polinomi, in particolare con la regola di Ruffini.`,

  sezioni: [
    { id: 'perche-scomporre', titolo: 'Che cosa vuol dire scomporre, e perché', testo: R`Un numero si scompone in fattori primi: $60 = 2^2 \cdot 3 \cdot 5$. Con i polinomi si fa la stessa cosa.

>* **Scomporre** (o *fattorizzare*) un polinomio significa scriverlo come prodotto di polinomi di grado più basso. Un polinomio che non si può scomporre si dice **irriducibile**: è il corrispondente di un numero primo. La scomposizione è **completa** quando tutti i fattori sono irriducibili.

Per esempio $x^2 - 5x + 6 = (x - 2)(x - 3)$. Per convincersene basta rifare il prodotto: $(x - 2)(x - 3) = x^2 - 3x - 2x + 6 = x^2 - 5x + 6$. Invece $x^4 - 16 = (x^2 + 4)(x^2 - 4)$ è una scomposizione, ma non completa: $x^2 - 4$ si scompone ancora in $(x + 2)(x - 2)$.

Perché scomporre? Tre motivi che tornano in tutto il biennio.

1. **Equazioni.** Un prodotto vale zero solo se almeno un fattore vale zero (legge di annullamento del prodotto). Da $(x - 2)(x - 3) = 0$ si legge subito $x = 2$ oppure $x = 3$; dalla forma $x^2 - 5x + 6 = 0$ no.
2. **Frazioni algebriche.** Si semplificano solo dividendo numeratore e denominatore per uno stesso *fattore*: senza scomporre non si vede che cosa si può semplificare.
3. **MCD e mcm** di polinomi, che servono per il denominatore comune.

Nel grafico la parabola $y = x^2 - 5x + 6$ taglia l'asse $x$ proprio in $2$ e $3$: i fattori $(x - 2)$ e $(x - 3)$ sono gli **zeri** del polinomio resi visibili.

[[grafico:zeri]]

>! Scomporre è il contrario di sviluppare. $(x + 1)(x + 2)$ è un polinomio scomposto; $x^2 + 3x + 2$ è lo stesso polinomio sviluppato. Un errore frequente è "scomporre" e ottenere una somma, per esempio $x(x + 3) + 2$: non è una scomposizione, perché non è un prodotto.

Il controllo finale è sempre lo stesso: moltiplicare i fattori trovati e verificare che torni il polinomio di partenza.` },

    { id: 'raccoglimento', titolo: 'Raccoglimento totale e parziale', testo: R`### Raccoglimento totale

Se tutti i termini di un polinomio hanno un fattore in comune, lo si mette in evidenza con la proprietà distributiva letta al contrario: $AB + AC = A(B + C)$.

>* **Raccoglimento totale:** si raccoglie il **MCD dei termini**, cioè il MCD dei coefficienti moltiplicato per ogni lettera comune a tutti i termini, presa con l'esponente più piccolo. Dentro la parentesi resta il quoziente di ciascun termine per il fattore raccolto.

$6x^3 - 4x^2 + 2x = 2x(3x^2 - 2x + 1)$: il MCD di $6$, $4$, $2$ è $2$, e la $x$ compare in tutti i termini con esponente minimo $1$. Il fattore comune può anche essere un polinomio: $2a(x - 1) + 5(x - 1) = (x - 1)(2a + 5)$.

>! Quando un termine coincide con il fattore raccolto, nella parentesi resta $1$, non zero: $2x^2 + 2x = 2x(x + 1)$, non $2x \cdot x$. Se il primo termine è negativo conviene raccogliere anche il segno: $-x^2 - 3x = -x(x + 3)$.

### Raccoglimento parziale

Quando non c'è un fattore comune a *tutti* i termini, può esserci a gruppi. Si raccoglie in ogni gruppo e, se le parentesi che restano sono uguali, si raccoglie di nuovo:

$$ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b).$$

Esempio: $x^3 - 2x^2 + 3x - 6 = x^2(x - 2) + 3(x - 2) = (x - 2)(x^2 + 3)$.

Il metodo funziona solo se dopo il primo raccoglimento le parentesi coincidono; se non coincidono si prova a raggruppare in modo diverso (primo con terzo, secondo con quarto). Attenzione ai segni: in $x^3 + x^2 - x - 1$ il secondo gruppo è $-x - 1 = -(x + 1)$, e si ottiene $x^2(x + 1) - (x + 1) = (x + 1)(x^2 - 1)$, che si scompone ancora: $(x + 1)(x + 1)(x - 1) = (x + 1)^2(x - 1)$.

>* Il raccoglimento totale è **sempre** la prima cosa da provare: rende più piccoli i numeri e fa comparire i prodotti notevoli che altrimenti restano nascosti.` },

    { id: 'differenza-quadrati', titolo: 'Differenza di quadrati', testo: R`È il prodotto notevole "somma per differenza" letto al contrario.

>* **Differenza di quadrati:** $$A^2 - B^2 = (A + B)(A - B)$$ Si riconosce da tre indizi: **due** termini, entrambi **quadrati**, separati da un **meno**.

$A$ e $B$ sono le basi dei due quadrati: in $x^2 - 9$ sono $x$ e $3$, quindi $x^2 - 9 = (x + 3)(x - 3)$. Altri esempi:

- $4a^2 - 25b^2 = (2a + 5b)(2a - 5b)$, perché $4a^2 = (2a)^2$ e $25b^2 = (5b)^2$;
- $x^2 - \dfrac{1}{4} = \left(x + \dfrac{1}{2}\right)\left(x - \dfrac{1}{2}\right)$;
- $x^4 - 1 = (x^2 + 1)(x^2 - 1) = (x^2 + 1)(x + 1)(x - 1)$: il fattore $x^2 - 1$ è a sua volta una differenza di quadrati, e la scomposizione va portata fino in fondo.

Le basi possono essere polinomi: $(x + 1)^2 - 4 = (x + 1 + 2)(x + 1 - 2) = (x + 3)(x - 1)$.

La figura mostra perché la formula è vera: da un quadrato di lato $a$ si toglie un quadrato di lato $b$; quello che resta si taglia in due rettangoli che, affiancati, formano un rettangolo di lati $a + b$ e $a - b$.

[[grafico:differenza-quadrati]]

>! La **somma** di quadrati non si scompone: $x^2 + 9$ è irriducibile, perché non vale mai zero e nessun prodotto di binomi lo dà. E $x^2 - 9$ **non** è $(x - 3)^2$: quest'ultimo sviluppato fa $x^2 - 6x + 9$.

Prima di tutto, come sempre, si raccoglie: $3x^2 - 12 = 3(x^2 - 4) = 3(x + 2)(x - 2)$. Senza il raccoglimento $3x^2$ non è il quadrato di un monomio e si rischia di fermarsi.` },

    { id: 'quadrati', titolo: 'Quadrato di binomio e di trinomio', testo: R`### Quadrato di binomio

>* $$A^2 + 2AB + B^2 = (A + B)^2 \qquad A^2 - 2AB + B^2 = (A - B)^2$$ Si riconosce da **tre** termini: due sono quadrati (con il segno più), il terzo è il **doppio prodotto** delle basi, con il segno più o meno.

Il controllo decisivo è sul doppio prodotto. In $x^2 + 6x + 9$ le basi sono $x$ e $3$, e $2 \cdot x \cdot 3 = 6x$: è $(x + 3)^2$. In $4x^2 - 12x + 9$ le basi sono $2x$ e $3$, e $2 \cdot 2x \cdot 3 = 12x$: è $(2x - 3)^2$, con il meno perché il doppio prodotto è negativo. In $x^2 + 5x + 9$, invece, il doppio prodotto dovrebbe essere $6x$: **non** è un quadrato.

L'animazione mostra il quadrato di lato $x + 3$ costruito con i pezzi: un quadrato $x^2$, due rettangoli $3x$ e un quadratino $9$. Scomporre $x^2 + 6x + 9$ vuol dire rimettere insieme i pezzi.

[[animazione:completamento-quadrato]]

### Quadrato di trinomio

>* $$A^2 + B^2 + C^2 + 2AB + 2AC + 2BC = (A + B + C)^2$$ **Sei** termini: tre quadrati e tre doppi prodotti, uno per ogni coppia di basi.

$x^2 + 4y^2 + 1 + 4xy + 2x + 4y$: le basi sono $x$, $2y$, $1$; i doppi prodotti $2 \cdot x \cdot 2y = 4xy$, $2 \cdot x \cdot 1 = 2x$, $2 \cdot 2y \cdot 1 = 4y$ ci sono tutti. È $(x + 2y + 1)^2$. Con i segni misti si guarda ogni doppio prodotto: $x^2 + y^2 + 4 - 2xy + 4x - 4y = (x - y + 2)^2$, perché $-2xy$ dice che $x$ e $y$ hanno segni opposti, $+4x$ che $x$ e $2$ hanno lo stesso segno.

>! I quadrati sono sempre positivi: $-x^2 - 6x - 9$ non è un quadrato di binomio, ma lo diventa raccogliendo il segno: $-(x^2 + 6x + 9) = -(x + 3)^2$. E $x^2 + 9$ non è $(x + 3)^2$: manca il doppio prodotto.` },

    { id: 'cubi', titolo: 'Cubo di binomio, somma e differenza di cubi', testo: R`### Cubo di binomio

>* $$A^3 + 3A^2B + 3AB^2 + B^3 = (A + B)^3 \qquad A^3 - 3A^2B + 3AB^2 - B^3 = (A - B)^3$$ **Quattro** termini: due cubi e due **tripli prodotti**. Nel cubo di una differenza i segni si alternano.

$x^3 + 6x^2 + 12x + 8$: i cubi sono $x^3$ e $8 = 2^3$, le basi $x$ e $2$; i tripli prodotti sono $3 \cdot x^2 \cdot 2 = 6x^2$ e $3 \cdot x \cdot 2^2 = 12x$. Tutto torna: è $(x + 2)^3$. Allo stesso modo $8x^3 - 12x^2 + 6x - 1 = (2x - 1)^3$: basi $2x$ e $1$, tripli prodotti $3 \cdot (2x)^2 \cdot 1 = 12x^2$ e $3 \cdot 2x \cdot 1^2 = 6x$, segni alternati.

### Somma e differenza di cubi

>* $$A^3 + B^3 = (A + B)(A^2 - AB + B^2) \qquad A^3 - B^3 = (A - B)(A^2 + AB + B^2)$$ **Due** termini, entrambi cubi. Il secondo fattore si chiama **falso quadrato**: somiglia a un quadrato di binomio ma ha $AB$ al posto di $2AB$, ed è irriducibile.

$x^3 + 8 = (x + 2)(x^2 - 2x + 4)$ e $27a^3 - b^3 = (3a - b)(9a^2 + 3ab + b^2)$. Per ricordare i segni: nel binomio lo stesso segno del polinomio di partenza, nel falso quadrato il segno opposto sul termine di mezzo, e sempre più sull'ultimo quadrato.

A differenza dei quadrati, qui anche la **somma** si scompone: $x^3 + 8$ vale zero per $x = -2$, e infatti contiene il fattore $(x + 2)$.

>! $A^3 + B^3$ non è $(A + B)^3$: il cubo del binomio ha quattro termini. E il falso quadrato non va "scomposto": $x^2 - 2x + 4$ non è $(x - 2)^2$, che sviluppato fa $x^2 - 4x + 4$.` },

    { id: 'trinomio-speciale', titolo: 'Il trinomio speciale', testo: R`### Il caso $x^2 + sx + p$

Sviluppando $(x + m)(x + n)$ si ottiene $x^2 + (m + n)x + mn$: il coefficiente di $x$ è la **somma** dei due numeri, il termine noto è il loro **prodotto**. Letto al contrario:

>* **Trinomio speciale:** $x^2 + sx + p = (x + m)(x + n)$, dove $m$ e $n$ sono due numeri con $m + n = s$ e $m \cdot n = p$. Si parte dal prodotto, che ha meno possibilità, e si controlla la somma.

- $x^2 + 7x + 12$: prodotto $12$, somma $7$: sono $3$ e $4$, quindi $(x + 3)(x + 4)$;
- $x^2 - 5x + 6$: prodotto $6$, somma $-5$: sono $-2$ e $-3$, quindi $(x - 2)(x - 3)$;
- $x^2 + 2x - 15$: prodotto $-15$, somma $2$: sono $5$ e $-3$, quindi $(x + 5)(x - 3)$;
- $x^2 - x - 6$: prodotto $-6$, somma $-1$: sono $-3$ e $2$, quindi $(x - 3)(x + 2)$.

I segni si leggono dal prodotto: se $p > 0$ i due numeri sono **concordi**, con il segno di $s$; se $p < 0$ sono **discordi**, e quello più grande in valore assoluto ha il segno di $s$.

Nel grafico i due zeri $x_1$ e $x_2$ si trascinano: il prodotto $(x - x_1)(x - x_2)$ si ridisegna e sopra compare il trinomio corrispondente, $x^2 - (x_1 + x_2)\,x + x_1 x_2$. I numeri $m$ e $n$ del trinomio speciale sono gli opposti degli zeri.

[[grafico:radici]]

### Il caso $ax^2 + bx + c$

Se il coefficiente di $x^2$ non è $1$, si cercano due numeri $m$ e $n$ con $m + n = b$ e $m \cdot n = a \cdot c$; con essi si **spezza** il termine di primo grado, $bx = mx + nx$, e si conclude con un raccoglimento parziale.

$2x^2 + 7x + 3$: $a \cdot c = 6$ e $b = 7$, quindi $6$ e $1$. Allora $2x^2 + 6x + x + 3 = 2x(x + 3) + (x + 3) = (x + 3)(2x + 1)$.

$3x^2 - 5x - 2$: $a \cdot c = -6$ e $b = -5$, quindi $-6$ e $1$. Allora $3x^2 - 6x + x - 2 = 3x(x - 2) + (x - 2) = (x - 2)(3x + 1)$.

>! I due numeri trovati vanno nei fattori **con il loro segno**: per $x^2 - 5x + 6$ sono $-2$ e $-3$, quindi $(x - 2)(x - 3)$ e non $(x + 2)(x + 3)$. Se non esistono due interi con quella somma e quel prodotto, il trinomio può essere irriducibile oppure avere fattori con coefficienti non interi: se ne riparla con le equazioni di secondo grado.` },

    { id: 'ruffini', titolo: 'Scomporre con Ruffini', testo: R`Quando i metodi precedenti falliscono, per un polinomio in una sola lettera resta la strada di Ruffini, che si fonda su due teoremi.

>* **Teorema del resto:** il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$. **Teorema di Ruffini:** $P(x)$ è divisibile per $(x - a)$ se e solo se $P(a) = 0$, cioè se $a$ è uno **zero** del polinomio.

Trovato uno zero $a$, si può scrivere $P(x) = (x - a) \cdot Q(x)$, dove $Q(x)$ è il quoziente calcolato con la regola di Ruffini e ha un grado in meno. Poi si continua con $Q(x)$.

### Dove cercare gli zeri

Non si prova a caso. Se $P(x)$ ha coefficienti interi, gli **zeri interi** stanno fra i **divisori del termine noto**, positivi e negativi. Se il coefficiente del termine di grado massimo non è $1$, ci possono essere anche zeri frazionari $\dfrac{p}{q}$, con $p$ divisore del termine noto e $q$ divisore del primo coefficiente.

Esempio: $P(x) = x^3 - 2x^2 - 5x + 6$. Il termine noto è $6$: i candidati sono $\pm 1$, $\pm 2$, $\pm 3$, $\pm 6$. Si prova $P(1) = 1 - 2 - 5 + 6 = 0$: trovato. La tabella di Ruffini con $a = 1$:

| | $1$ | $-2$ | $-5$ | $6$ |
|---|---|---|---|---|
| $1$ | | $1$ | $-1$ | $-6$ |
| | $1$ | $-1$ | $-6$ | $0$ |

L'ultima riga dà il quoziente $Q(x) = x^2 - x - 6$ e il resto $0$, come deve essere. $Q(x)$ è un trinomio speciale: due numeri con somma $1$ e prodotto $-6$ sono $3$ e $-2$, quindi $Q(x) = (x - 3)(x + 2)$ e

$$x^3 - 2x^2 - 5x + 6 = (x - 1)(x - 3)(x + 2).$$

Due scorciatoie. Se la **somma dei coefficienti** è zero, allora $P(1) = 0$ e $(x - 1)$ è un fattore. Se la somma dei coefficienti di grado pari è uguale a quella dei coefficienti di grado dispari, allora $P(-1) = 0$ e $(x + 1)$ è un fattore. Nell'esempio, $1 - 2 - 5 + 6 = 0$: si vedeva senza calcoli.

>! Nella tabella vanno scritti **tutti** i coefficienti, in ordine di grado decrescente, compresi gli zeri dei termini mancanti: per $x^3 - 7x + 6$ la prima riga è $1$, $0$, $-7$, $6$. E un candidato che non funziona non vuol dire che il metodo fallisce: si prova il successivo.` },

    { id: 'schema-decisione', titolo: 'In che ordine provare i metodi', testo: R`Davanti a un polinomio nuovo la domanda giusta non è "quale formula", ma "in che ordine provo". Lo schema che segue basta per quasi tutti gli esercizi del biennio.

>* Prima il **raccoglimento totale**; poi si **contano i termini** e si prova il metodo adatto; se niente funziona, **Ruffini**. Ottenuto un prodotto, si ricomincia da **ogni fattore** finché sono tutti irriducibili, e si chiude con il **controllo**: moltiplicando i fattori deve tornare il polinomio di partenza.

| Termini | Che cosa provare |
|---|---|
| 2 | differenza di quadrati; somma o differenza di cubi |
| 3 | quadrato di binomio; trinomio speciale |
| 4 | cubo di binomio; raccoglimento parziale (2 + 2) |
| 6 | quadrato di trinomio; raccoglimento parziale (3 + 3 oppure 2 + 2 + 2) |
| qualunque | Ruffini, se c'è una sola lettera e il resto non funziona |

Tre esempi seguendo lo schema.

$2x^4 - 32$: raccolgo $2$ e ottengo $2(x^4 - 16)$; due termini, differenza di quadrati: $2(x^2 + 4)(x^2 - 4)$; il fattore $x^2 - 4$ è ancora una differenza di quadrati: $2(x^2 + 4)(x + 2)(x - 2)$. Il fattore $x^2 + 4$ è una somma di quadrati, irriducibile: fine.

$3x^2 + 6x + 3$: tre termini, ma nessun quadrato evidente. Raccolgo $3$: $3(x^2 + 2x + 1) = 3(x + 1)^2$. Senza il raccoglimento il quadrato non si vedeva.

$x^3 - x^2 - 4x + 4$: quattro termini; non è un cubo di binomio (mancano i tripli prodotti), quindi raccoglimento parziale: $x^2(x - 1) - 4(x - 1) = (x - 1)(x^2 - 4) = (x - 1)(x + 2)(x - 2)$.

>! L'errore più comune è fermarsi troppo presto: $(x^2 - 4)$ dentro un prodotto è una scomposizione a metà. Il secondo è saltare il raccoglimento e concludere che "non è un prodotto notevole".` },

    { id: 'mcd-mcm-frazioni', titolo: 'MCD, mcm e frazioni algebriche', testo: R`### MCD e mcm di polinomi

Come per i numeri, prima si scompongono tutti i polinomi.

>* Il **MCD** di più polinomi è il prodotto dei fattori **comuni**, presi con l'esponente **minimo**. Il **mcm** è il prodotto dei fattori **comuni e non comuni**, presi con l'esponente **massimo**. Per i coefficienti numerici si prendono, rispettivamente, il MCD e il mcm dei numeri.

Esempio: $A = x^2 - 1 = (x + 1)(x - 1)$, $B = x^2 + 2x + 1 = (x + 1)^2$, $C = 2x^2 - 2x = 2x(x - 1)$.

- $\text{MCD}(A, B) = x + 1$ e $\text{mcm}(A, B) = (x + 1)^2(x - 1)$;
- $\text{MCD}(A, B, C) = 1$, perché nessun fattore è comune a tutti e tre, e $\text{mcm}(A, B, C) = 2x(x + 1)^2(x - 1)$.

### Frazioni algebriche

Una **frazione algebrica** è il quoziente di due polinomi, come $\dfrac{x^2 - 4}{x^2 + 4x + 4}$. Ha senso solo se il denominatore non vale zero: le **condizioni di esistenza** (c.e.) si trovano scomponendo il denominatore e imponendo che ogni fattore sia diverso da zero. Qui $x^2 + 4x + 4 = (x + 2)^2$, quindi c.e.: $x \ne -2$.

Per **semplificare** si scompongono numeratore e denominatore e si dividono entrambi per i fattori comuni, cioè per il loro MCD:

$$\frac{x^2 - 4}{x^2 + 4x + 4} = \frac{(x + 2)(x - 2)}{(x + 2)^2} = \frac{x - 2}{x + 2}, \qquad x \ne -2.$$

Per sommare frazioni con denominatori diversi, il denominatore comune è il **mcm** dei denominatori: $\dfrac{1}{x - 1} + \dfrac{1}{x^2 - 1} = \dfrac{(x + 1) + 1}{(x + 1)(x - 1)} = \dfrac{x + 2}{(x + 1)(x - 1)}$, con c.e. $x \ne 1$ e $x \ne -1$.

>! Si semplificano i **fattori**, mai gli addendi: $\dfrac{x^2 + 4}{x^2}$ non è $4$ e $\dfrac{x + 3}{x}$ non è $3$. E le c.e. vanno scritte **prima** di semplificare: $\dfrac{x^2 - 1}{x - 1}$ si semplifica in $x + 1$, che sembra definito ovunque, ma per $x = 1$ la frazione di partenza non esiste.` }
  ],

  grafici: {
    zeri: {
      tipo: 'piano', x: [-1, 6], y: [-2, 7],
      funzioni: [{ f: 'x^2 - 5x + 6', etichetta: 'y = x² − 5x + 6', colore: 1 }],
      punti: [
        { x: 2, y: 0, etichetta: 'x = 2', posizione: 'basso', colore: 2 },
        { x: 3, y: 0, etichetta: 'x = 3', posizione: 'basso', colore: 2 }
      ],
      elementi: [
        { tipo: 'testo', p: [2.5, 3.2], testo: 'x² − 5x + 6 = (x − 2)(x − 3)' }
      ],
      didascalia: 'La parabola y = x² − 5x + 6 incontra l\'asse x in 2 e 3: sono gli zeri dei fattori (x − 2) e (x − 3).'
    },
    'differenza-quadrati': {
      tipo: 'piano', x: [-2.4, 16.8], y: [-1.6, 7.2], assi: false, griglia: false,
      elementi: [
        { tipo: 'poligono', punti: [[0, 0], [5, 0], [5, 3], [0, 3]], riempi: true, colore: 1 },
        { tipo: 'poligono', punti: [[0, 3], [3, 3], [3, 5], [0, 5]], riempi: true, colore: 2 },
        { tipo: 'poligono', punti: [[3, 3], [5, 3], [5, 5], [3, 5]], riempi: false, colore: 4 },
        { tipo: 'testo', p: [4, 3.85], testo: 'b²' },
        { tipo: 'testo', p: [2.5, -0.8], testo: 'a' },
        { tipo: 'testo', p: [-0.3, 1.4], testo: 'a − b', ancora: 'end' },
        { tipo: 'testo', p: [-0.3, 3.9], testo: 'b', ancora: 'end' },
        { tipo: 'testo', p: [1.5, 5.5], testo: 'a − b' },
        { tipo: 'testo', p: [4, 5.5], testo: 'b' },
        { tipo: 'testo', p: [2.5, 6.6], testo: 'a² − b²' },
        { tipo: 'testo', p: [6.4, 1.4], testo: '=' },
        { tipo: 'poligono', punti: [[7.5, 0], [12.5, 0], [12.5, 3], [7.5, 3]], riempi: true, colore: 1 },
        { tipo: 'poligono', punti: [[12.5, 0], [14.5, 0], [14.5, 3], [12.5, 3]], riempi: true, colore: 2 },
        { tipo: 'testo', p: [10, -0.8], testo: 'a' },
        { tipo: 'testo', p: [13.5, -0.8], testo: 'b' },
        { tipo: 'testo', p: [14.8, 1.4], testo: 'a − b', ancora: 'start' },
        { tipo: 'segmento', da: [14.5, 3.6], a: [7.5, 3.6], etichetta: 'a + b', colore: 4 },
        { tipo: 'testo', p: [11, 6.6], testo: '(a + b)(a − b)' }
      ],
      didascalia: 'Dal quadrato di lato a si toglie il quadratino b²; i due rettangoli che restano, affiancati, formano il rettangolo (a + b) × (a − b).'
    },
    radici: {
      tipo: 'piano', x: [-5, 5], y: [-7, 7],
      parametri: [
        { nome: 'x1', min: -4, max: 4, passo: 0.5, valore: 2, nascosto: true },
        { nome: 'x2', min: -4, max: 4, passo: 0.5, valore: 3, nascosto: true }
      ],
      funzioni: [{ f: '(x - x1)(x - x2)', etichetta: 'y = (x − x₁)(x − x₂)', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['x1', 0], trascina: true, etichetta: 'x₁ = {{x1}}', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['x2', 0], trascina: true, etichetta: 'x₂ = {{x2}}', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-4.7, 6.2], testo: 'x₁ + x₂ = {{x1 + x2}}      x₁ · x₂ = {{x1 * x2}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.7, 5.2], testo: '(x − x₁)(x − x₂) = x² − ({{x1 + x2}})x + ({{x1 * x2}})', ancora: 'start' }
      ],
      didascalia: 'Trascina x₁ e x₂: il trinomio ha per coefficiente di x l\'opposto della somma degli zeri e per termine noto il loro prodotto.'
    }
  },

  esempi: [
    { titolo: 'Raccoglimento totale', problema: R`Scomponi $12a^3b^2 - 18a^2b^3 + 6a^2b^2$.`, passi: [
      R`Cerco il MCD dei tre termini. Coefficienti $12$, $18$, $6$: il MCD è $6$. La lettera $a$ compare con esponenti $3$, $2$, $2$: prendo $a^2$. La $b$ con esponenti $2$, $3$, $2$: prendo $b^2$. Fattore comune: $6a^2b^2$.`,
      R`Divido ogni termine per $6a^2b^2$: $12a^3b^2 : 6a^2b^2 = 2a$, $-18a^2b^3 : 6a^2b^2 = -3b$, $6a^2b^2 : 6a^2b^2 = 1$.`,
      R`Quindi $12a^3b^2 - 18a^2b^3 + 6a^2b^2 = 6a^2b^2(2a - 3b + 1)$. Il terzo termine è diventato $1$, non zero: è l'errore da evitare.`,
      R`Controllo: $6a^2b^2 \cdot 2a = 12a^3b^2$, $6a^2b^2 \cdot (-3b) = -18a^2b^3$, $6a^2b^2 \cdot 1 = 6a^2b^2$. ✓`
    ], risultato: R`$6a^2b^2(2a - 3b + 1)$` },

    { titolo: 'Un quadrato nascosto dietro un raccoglimento', problema: R`Scomponi $2x^3 - 12x^2 + 18x$.`, passi: [
      R`Tre termini con un fattore comune: raccolgo $2x$ e ottengo $2x(x^2 - 6x + 9)$.`,
      R`Il trinomio nella parentesi ha due quadrati, $x^2$ e $9 = 3^2$, e il termine di mezzo vale $-6x$. Il doppio prodotto delle basi è $2 \cdot x \cdot 3 = 6x$: coincide, con il segno meno.`,
      R`È il quadrato di una differenza: $x^2 - 6x + 9 = (x - 3)^2$.`,
      R`Scomposizione completa: $2x(x - 3)^2$. Controllo: $(x - 3)^2 = x^2 - 6x + 9$, per $2x$ dà $2x^3 - 12x^2 + 18x$. ✓`
    ], risultato: R`$2x(x - 3)^2$` },

    { titolo: 'Trinomio con il coefficiente di $x^2$ diverso da 1', problema: R`Scomponi $6x^2 + 7x - 3$.`, passi: [
      R`Non c'è fattore comune e non è un quadrato di binomio ($6$ non è un quadrato perfetto). Provo il trinomio speciale con $a \ne 1$: cerco due numeri con somma $b = 7$ e prodotto $a \cdot c = 6 \cdot (-3) = -18$.`,
      R`Prodotto negativo: segni discordi. Le coppie con prodotto $-18$ sono $(18, -1)$, $(9, -2)$, $(6, -3)$ e le opposte; la somma $7$ la dà $9$ e $-2$.`,
      R`Spezzo il termine di primo grado: $7x = 9x - 2x$, quindi $6x^2 + 9x - 2x - 3$.`,
      R`Raccoglimento parziale: $3x(2x + 3) - (2x + 3) = (2x + 3)(3x - 1)$.`,
      R`Controllo: $(2x + 3)(3x - 1) = 6x^2 - 2x + 9x - 3 = 6x^2 + 7x - 3$. ✓`
    ], risultato: R`$(2x + 3)(3x - 1)$` },

    { titolo: 'Raccoglimento parziale e differenza di cubi', problema: R`Scomponi completamente $x^4 - x^3 + 8x - 8$.`, passi: [
      R`Quattro termini senza fattore comune; non è un cubo di binomio (mancano i tripli prodotti). Provo il raccoglimento parziale a coppie: $x^3(x - 1) + 8(x - 1)$.`,
      R`Le parentesi coincidono, raccolgo $(x - 1)$: $(x - 1)(x^3 + 8)$.`,
      R`Il secondo fattore è una somma di cubi, $x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)$.`,
      R`Il falso quadrato $x^2 - 2x + 4$ è irriducibile: non è un quadrato (il doppio prodotto sarebbe $4x$) e non è un trinomio speciale (nessuna coppia di interi ha prodotto $4$ e somma $-2$).`,
      R`Scomposizione completa: $(x - 1)(x + 2)(x^2 - 2x + 4)$. Controllo rapido: per $x = 1$ il polinomio vale $1 - 1 + 8 - 8 = 0$, e infatti c'è il fattore $(x - 1)$. ✓`
    ], risultato: R`$(x - 1)(x + 2)(x^2 - 2x + 4)$` },

    { titolo: 'Con la regola di Ruffini', problema: R`Scomponi $P(x) = x^3 + 2x^2 - 5x - 6$.`, passi: [
      R`Nessun fattore comune, nessun prodotto notevole, il raccoglimento parziale non dà parentesi uguali: uso Ruffini. Il termine noto è $-6$, quindi i candidati sono $\pm 1$, $\pm 2$, $\pm 3$, $\pm 6$.`,
      R`$P(1) = 1 + 2 - 5 - 6 = -8 \ne 0$. $P(-1) = -1 + 2 + 5 - 6 = 0$: $x = -1$ è uno zero, quindi $(x + 1)$ è un fattore.`,
      R`Tabella di Ruffini con $a = -1$ e coefficienti $1$, $2$, $-5$, $-6$: abbasso $1$; $-1 \cdot 1 = -1$, e $2 - 1 = 1$; $-1 \cdot 1 = -1$, e $-5 - 1 = -6$; $-1 \cdot (-6) = 6$, e $-6 + 6 = 0$. Quoziente $Q(x) = x^2 + x - 6$, resto $0$.`,
      R`$Q(x)$ è un trinomio speciale: prodotto $-6$, somma $1$, cioè $3$ e $-2$: $Q(x) = (x + 3)(x - 2)$.`,
      R`Quindi $P(x) = (x + 1)(x + 3)(x - 2)$. Controllo: $(x + 1)(x + 3) = x^2 + 4x + 3$, e $(x^2 + 4x + 3)(x - 2) = x^3 - 2x^2 + 4x^2 - 8x + 3x - 6 = x^3 + 2x^2 - 5x - 6$. ✓`
    ], risultato: R`$(x + 1)(x + 3)(x - 2)$` },

    { titolo: 'Semplificare una frazione algebrica', problema: R`Scrivi le condizioni di esistenza e semplifica $\dfrac{x^3 - 4x}{x^2 - 4x + 4}$.`, passi: [
      R`Scompongo il denominatore: $x^2 - 4x + 4 = (x - 2)^2$ (doppio prodotto $2 \cdot x \cdot 2 = 4x$ ✓). C.e.: $(x - 2)^2 \ne 0$, cioè $x \ne 2$.`,
      R`Scompongo il numeratore: raccolgo $x$, $x(x^2 - 4)$, poi differenza di quadrati: $x(x + 2)(x - 2)$.`,
      R`La frazione diventa $\dfrac{x(x + 2)(x - 2)}{(x - 2)^2}$: il fattore comune è $(x - 2)$, lo semplifico una volta sopra e una sotto.`,
      R`Risultato: $\dfrac{x(x + 2)}{x - 2}$, valido per $x \ne 2$. La condizione resta anche se il denominatore è cambiato: la frazione di partenza in $x = 2$ non esiste.`
    ], risultato: R`$\dfrac{x(x + 2)}{x - 2}$ con c.e. $x \ne 2$` }
  ],

  formulario: [
    { nome: 'Raccoglimento totale', formula: R`AB + AC = A\,(B + C)`, nota: R`$A$ è il MCD dei termini: MCD dei coefficienti e lettere comuni con l'esponente minimo.` },
    { nome: 'Raccoglimento parziale', formula: R`AX + AY + BX + BY = (A + B)(X + Y)`, nota: R`Funziona solo se, dopo il primo raccoglimento, le parentesi coincidono.` },
    { nome: 'Differenza di quadrati', formula: R`A^2 - B^2 = (A + B)(A - B)`, nota: R`La somma di quadrati $A^2 + B^2$ è irriducibile.` },
    { nome: 'Quadrato di binomio', formula: R`A^2 \pm 2AB + B^2 = (A \pm B)^2`, nota: R`Controllo: il termine di mezzo deve essere il doppio prodotto delle basi.` },
    { nome: 'Quadrato di trinomio', formula: R`A^2 + B^2 + C^2 + 2AB + 2AC + 2BC = (A + B + C)^2`, nota: R`Sei termini: tre quadrati e tre doppi prodotti.` },
    { nome: 'Cubo di binomio', formula: R`A^3 \pm 3A^2B + 3AB^2 \pm B^3 = (A \pm B)^3`, nota: R`Quattro termini: due cubi e due tripli prodotti.` },
    { nome: 'Somma di cubi', formula: R`A^3 + B^3 = (A + B)(A^2 - AB + B^2)`, nota: R`Il secondo fattore è il falso quadrato, irriducibile.` },
    { nome: 'Differenza di cubi', formula: R`A^3 - B^3 = (A - B)(A^2 + AB + B^2)` },
    { nome: 'Trinomio speciale', formula: R`x^2 + sx + p = (x + m)(x + n), \quad m + n = s,\ mn = p` },
    { nome: 'Trinomio con a ≠ 1', formula: R`ax^2 + bx + c = ax^2 + mx + nx + c, \quad m + n = b,\ mn = ac`, nota: R`Poi si conclude con un raccoglimento parziale.` },
    { nome: 'Teorema del resto', formula: R`P(x) : (x - a) \ \text{ha resto } P(a)` },
    { nome: 'Teorema di Ruffini', formula: R`(x - a) \mid P(x) \iff P(a) = 0`, nota: R`Gli zeri interi si cercano fra i divisori del termine noto; quelli frazionari $\frac{p}{q}$ con $q$ divisore del primo coefficiente.` },
    { nome: 'MCD e mcm di polinomi', formula: R`\text{MCD}: \text{fattori comuni, esponente minimo} \qquad \text{mcm}: \text{fattori comuni e non, esponente massimo}` },
    { nome: 'Frazione algebrica', formula: R`\frac{N(x)}{D(x)}, \qquad \text{c.e.: } D(x) \ne 0`, nota: R`Si semplifica dividendo numeratore e denominatore per i fattori comuni, mai per gli addendi.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'perche-scomporre', tipo: 'definizione', fronte: R`Scomporre un polinomio in fattori`, retro: R`Scriverlo come prodotto di polinomi di grado più basso.` },
    { id: 'fc-02', sezione: 'perche-scomporre', tipo: 'definizione', fronte: R`Polinomio irriducibile`, retro: R`Un polinomio che non si può scomporre: è l'analogo di un numero primo. Per esempio $x^2 + 1$.` },
    { id: 'fc-03', sezione: 'perche-scomporre', tipo: 'concetto', fronte: R`Perché la scomposizione serve nelle equazioni?`, retro: R`Per la legge di annullamento del prodotto: da $(x - 2)(x - 3) = 0$ si legge subito $x = 2$ oppure $x = 3$.` },
    { id: 'fc-04', sezione: 'perche-scomporre', tipo: 'procedura', fronte: R`Come si controlla una scomposizione?`, retro: R`Si moltiplicano i fattori: deve tornare il polinomio di partenza.` },
    { id: 'fc-05', sezione: 'raccoglimento', tipo: 'procedura', fronte: R`Che cosa si raccoglie nel raccoglimento totale?`, retro: R`Il MCD dei termini: MCD dei coefficienti per le lettere comuni a tutti i termini, con l'esponente minimo.` },
    { id: 'fc-06', sezione: 'raccoglimento', tipo: 'procedura', fronte: R`Raccoglimento parziale`, retro: R`Si raccoglie a gruppi; se le parentesi ottenute sono uguali si raccolgono a loro volta: $ax + ay + bx + by = (x + y)(a + b)$.` },
    { id: 'fc-07', sezione: 'raccoglimento', tipo: 'concetto', fronte: R`$2x^2 + 2x = 2x(x + \;?\;)$`, retro: R`$2x(x + 1)$: quando un termine coincide con il fattore raccolto resta $1$, non $0$.` },
    { id: 'fc-08', sezione: 'differenza-quadrati', tipo: 'formula', fronte: R`Differenza di quadrati`, retro: R`$A^2 - B^2 = (A + B)(A - B)$` },
    { id: 'fc-09', sezione: 'differenza-quadrati', tipo: 'concetto', fronte: R`$x^2 + 9$ si scompone?`, retro: R`No: la somma di due quadrati è irriducibile in $\mathbb{R}$ (non vale mai zero).` },
    { id: 'fc-10', sezione: 'quadrati', tipo: 'formula', fronte: R`Quadrato di binomio (al contrario)`, retro: R`$A^2 \pm 2AB + B^2 = (A \pm B)^2$` },
    { id: 'fc-11', sezione: 'quadrati', tipo: 'procedura', fronte: R`Come si riconosce un quadrato di binomio?`, retro: R`Tre termini: due quadrati (positivi) e un terzo termine uguale al doppio prodotto delle due basi, con segno più o meno.` },
    { id: 'fc-12', sezione: 'quadrati', tipo: 'formula', fronte: R`Quadrato di trinomio`, retro: R`$A^2 + B^2 + C^2 + 2AB + 2AC + 2BC = (A + B + C)^2$: sei termini.` },
    { id: 'fc-13', sezione: 'cubi', tipo: 'formula', fronte: R`Cubo di binomio (al contrario)`, retro: R`$A^3 \pm 3A^2B + 3AB^2 \pm B^3 = (A \pm B)^3$: due cubi e due tripli prodotti.` },
    { id: 'fc-14', sezione: 'cubi', tipo: 'formula', fronte: R`Somma di cubi`, retro: R`$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$` },
    { id: 'fc-15', sezione: 'cubi', tipo: 'formula', fronte: R`Differenza di cubi`, retro: R`$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$` },
    { id: 'fc-16', sezione: 'cubi', tipo: 'definizione', fronte: R`Falso quadrato`, retro: R`Il trinomio $A^2 \mp AB + B^2$ che compare nella somma e differenza di cubi: ha $AB$ al posto di $2AB$ ed è irriducibile.` },
    { id: 'fc-17', sezione: 'trinomio-speciale', tipo: 'procedura', fronte: R`Trinomio speciale $x^2 + sx + p$`, retro: R`Si cercano due numeri $m$, $n$ con $m + n = s$ e $mn = p$: allora $x^2 + sx + p = (x + m)(x + n)$.` },
    { id: 'fc-18', sezione: 'trinomio-speciale', tipo: 'procedura', fronte: R`Trinomio $ax^2 + bx + c$ con $a \ne 1$`, retro: R`Due numeri con somma $b$ e prodotto $ac$; si spezza $bx$ nei due addendi e si fa un raccoglimento parziale.` },
    { id: 'fc-19', sezione: 'trinomio-speciale', tipo: 'concetto', fronte: R`Segni dei due numeri nel trinomio speciale`, retro: R`Se $p > 0$ sono concordi, con il segno di $s$. Se $p < 0$ sono discordi, e il più grande in valore assoluto ha il segno di $s$.` },
    { id: 'fc-20', sezione: 'ruffini', tipo: 'definizione', fronte: R`Teorema del resto`, retro: R`Il resto della divisione di $P(x)$ per $(x - a)$ è $P(a)$.` },
    { id: 'fc-21', sezione: 'ruffini', tipo: 'definizione', fronte: R`Teorema di Ruffini`, retro: R`$P(x)$ è divisibile per $(x - a)$ se e solo se $P(a) = 0$.` },
    { id: 'fc-22', sezione: 'ruffini', tipo: 'procedura', fronte: R`Dove si cercano gli zeri per Ruffini?`, retro: R`Fra i divisori (positivi e negativi) del termine noto; se il primo coefficiente non è $1$, anche fra le frazioni $\frac{p}{q}$ con $q$ divisore del primo coefficiente.` },
    { id: 'fc-23', sezione: 'ruffini', tipo: 'concetto', fronte: R`Somma dei coefficienti uguale a zero`, retro: R`Allora $P(1) = 0$ e $(x - 1)$ è un fattore. Se coefficienti pari e dispari hanno la stessa somma, $P(-1) = 0$ e $(x + 1)$ è un fattore.` },
    { id: 'fc-24', sezione: 'schema-decisione', tipo: 'procedura', fronte: R`In che ordine si provano i metodi?`, retro: R`1) Raccoglimento totale. 2) Conta i termini: 2 → quadrati o cubi; 3 → quadrato di binomio o trinomio speciale; 4 → cubo o parziale; 6 → quadrato di trinomio o parziale. 3) Ruffini. Poi si ripete su ogni fattore.` },
    { id: 'fc-25', sezione: 'mcd-mcm-frazioni', tipo: 'procedura', fronte: R`MCD e mcm di polinomi`, retro: R`Si scompongono. MCD: fattori comuni con l'esponente minimo. mcm: fattori comuni e non comuni con l'esponente massimo.` },
    { id: 'fc-26', sezione: 'mcd-mcm-frazioni', tipo: 'procedura', fronte: R`Condizioni di esistenza di una frazione algebrica`, retro: R`Si scompone il denominatore e si impone che ogni fattore sia diverso da zero. Vanno scritte prima di semplificare.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Scomponi $3x^2 - 27$.`, suggerimenti: [R`Prima di tutto: c'è un fattore comune?`, R`Dopo aver raccolto $3$ resta una differenza di quadrati.`], risposta: { tipo: 'testo', accettate: ['3(x+3)(x-3)', '3(x-3)(x+3)', '3(x+3)(x−3)', '3(x−3)(x+3)', '(x+3)(x-3)3', '(x-3)(x+3)3', '3*(x+3)(x-3)', '3*(x-3)(x+3)'] }, soluzione: [R`Raccoglimento totale: $3x^2 - 27 = 3(x^2 - 9)$.`, R`$x^2 - 9$ è una differenza di quadrati con basi $x$ e $3$: $(x + 3)(x - 3)$.`, R`Scomposizione completa: $3(x + 3)(x - 3)$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Scomponi $x^2 - 8x + 16$.`, suggerimenti: [R`Tre termini, due dei quali sono quadrati: che cosa potrebbe essere?`, R`Controlla il doppio prodotto: $2 \cdot x \cdot 4 = 8x$.`], risposta: { tipo: 'testo', accettate: ['(x-4)^2', '(x-4)²', '(x−4)^2', '(x−4)²', '(x-4)(x-4)', '(x−4)(x−4)'] }, soluzione: [R`I quadrati sono $x^2$ e $16 = 4^2$; il doppio prodotto delle basi è $2 \cdot x \cdot 4 = 8x$, presente con il segno meno.`, R`È il quadrato di una differenza: $x^2 - 8x + 16 = (x - 4)^2$.`, R`Controllo: $(x - 4)^2 = x^2 - 8x + 16$. ✓`] },
    { id: 'es-03', difficolta: 1, testo: R`Scomponi $x^2 + 3x - 10$.`, suggerimenti: [R`Non è un quadrato: il doppio prodotto non torna. Prova il trinomio speciale.`, R`Cerca due numeri con prodotto $-10$ e somma $3$.`], risposta: { tipo: 'testo', accettate: ['(x+5)(x-2)', '(x-2)(x+5)', '(x+5)(x−2)', '(x−2)(x+5)'] }, soluzione: [R`Prodotto $-10$: i numeri sono discordi. Le coppie sono $(10, -1)$, $(5, -2)$ e le opposte.`, R`La somma $3$ la dà $5$ e $-2$: $x^2 + 3x - 10 = (x + 5)(x - 2)$.`, R`Controllo: $(x + 5)(x - 2) = x^2 - 2x + 5x - 10 = x^2 + 3x - 10$. ✓`] },
    { id: 'es-04', difficolta: 1, testo: R`Scomponi $x^3 - 27$.`, suggerimenti: [R`Due termini: $27$ è un cubo?`, R`Differenza di cubi: $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$ con $A = x$ e $B = 3$.`], risposta: { tipo: 'testo', accettate: ['(x-3)(x^2+3x+9)', '(x^2+3x+9)(x-3)', '(x−3)(x²+3x+9)', '(x-3)(x²+3x+9)', '(x²+3x+9)(x−3)', '(x²+3x+9)(x-3)', '(x−3)(x^2+3x+9)', '(x^2+3x+9)(x−3)'] }, soluzione: [R`$27 = 3^3$, quindi $x^3 - 27$ è una differenza di cubi con basi $x$ e $3$.`, R`$x^3 - 27 = (x - 3)(x^2 + 3x + 9)$.`, R`Il falso quadrato $x^2 + 3x + 9$ non si scompone: il doppio prodotto sarebbe $6x$, e nessuna coppia di interi ha prodotto $9$ e somma $3$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Scomponi $2x^3 - 3x^2 + 4x - 6$.`, suggerimenti: [R`Quattro termini senza fattore comune: raggruppa a coppie.`, R`$x^2(2x - 3) + 2(2x - 3)$: le parentesi coincidono.`], risposta: { tipo: 'testo', accettate: ['(2x-3)(x^2+2)', '(x^2+2)(2x-3)', '(2x−3)(x²+2)', '(x²+2)(2x−3)', '(2x-3)(x²+2)', '(x²+2)(2x-3)', '(2x−3)(x^2+2)', '(x^2+2)(2x−3)'] }, soluzione: [R`Raccoglimento parziale: $2x^3 - 3x^2 + 4x - 6 = x^2(2x - 3) + 2(2x - 3)$.`, R`Raccolgo $(2x - 3)$: $(2x - 3)(x^2 + 2)$.`, R`$x^2 + 2$ è sempre positivo, quindi non ha zeri ed è irriducibile: la scomposizione è completa.`] },
    { id: 'es-06', difficolta: 2, testo: R`Per quali valori di $k$ il trinomio $x^2 + kx + 25$ è il quadrato di un binomio?`, suggerimenti: [R`Le basi sono $x$ e $5$. Che cosa deve essere il termine di mezzo?`, R`Il doppio prodotto $2 \cdot x \cdot 5$ può avere segno più o meno.`], risposta: { tipo: 'numeri', valori: [10, -10] }, soluzione: [R`I quadrati sono $x^2$ e $25 = 5^2$; il termine di mezzo deve essere $\pm 2 \cdot x \cdot 5 = \pm 10x$.`, R`Quindi $k = 10$, e il trinomio è $(x + 5)^2$, oppure $k = -10$, e il trinomio è $(x - 5)^2$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Scomponi $2x^2 - 5x - 3$.`, suggerimenti: [R`Il coefficiente di $x^2$ è $2$: usa il trinomio speciale con $a \ne 1$.`, R`Cerca due numeri con somma $-5$ e prodotto $a \cdot c = -6$.`, R`Sono $-6$ e $1$: spezza $-5x = -6x + x$ e raccogli a coppie.`], risposta: { tipo: 'testo', accettate: ['(x-3)(2x+1)', '(2x+1)(x-3)', '(x−3)(2x+1)', '(2x+1)(x−3)'] }, soluzione: [R`$a \cdot c = 2 \cdot (-3) = -6$ e $b = -5$: i numeri sono $-6$ e $1$.`, R`$2x^2 - 6x + x - 3 = 2x(x - 3) + (x - 3) = (x - 3)(2x + 1)$.`, R`Controllo: $(x - 3)(2x + 1) = 2x^2 + x - 6x - 3 = 2x^2 - 5x - 3$. ✓`] },
    { id: 'es-08', difficolta: 2, testo: R`Scomponi $P(x) = x^3 - 7x + 6$ con Ruffini e indica i suoi zeri.`, suggerimenti: [R`La somma dei coefficienti è $1 + 0 - 7 + 6 = 0$: che cosa ti dice?`, R`Nella tabella la prima riga è $1$, $0$, $-7$, $6$: non dimenticare lo zero del termine in $x^2$.`, R`Il quoziente $x^2 + x - 6$ è un trinomio speciale.`], risposta: { tipo: 'numeri', valori: [1, 2, -3] }, soluzione: [R`Somma dei coefficienti nulla, quindi $P(1) = 0$ e $(x - 1)$ è un fattore.`, R`Ruffini con $a = 1$ e coefficienti $1$, $0$, $-7$, $6$: abbasso $1$; $0 + 1 = 1$; $-7 + 1 = -6$; $6 - 6 = 0$. Quoziente $x^2 + x - 6$.`, R`$x^2 + x - 6$: prodotto $-6$, somma $1$, cioè $3$ e $-2$: $(x + 3)(x - 2)$.`, R`$P(x) = (x - 1)(x - 2)(x + 3)$; gli zeri sono $1$, $2$ e $-3$. Controllo: $P(2) = 8 - 14 + 6 = 0$ e $P(-3) = -27 + 21 + 6 = 0$. ✓`] },
    { id: 'es-09', difficolta: 2, testo: R`Semplifica $\dfrac{x^2 - 9}{x^2 - 6x + 9}$ dopo aver scritto le condizioni di esistenza.`, suggerimenti: [R`Scomponi numeratore e denominatore prima di qualunque semplificazione.`, R`Il denominatore è un quadrato di binomio; il numeratore una differenza di quadrati.`], risposta: { tipo: 'testo', accettate: ['(x+3)/(x-3)', '(x+3)/(x−3)', '(x+3):(x-3)', '(x+3):(x−3)'] }, soluzione: [R`Denominatore: $x^2 - 6x + 9 = (x - 3)^2$. C.e.: $x \ne 3$.`, R`Numeratore: $x^2 - 9 = (x + 3)(x - 3)$.`, R`$\dfrac{(x + 3)(x - 3)}{(x - 3)^2} = \dfrac{x + 3}{x - 3}$, per $x \ne 3$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Scomponi completamente $x^4 - 5x^2 + 4$ e indica tutti i valori di $x$ che lo annullano.`, suggerimenti: [R`Non è un quadrato di binomio. Guardalo come un trinomio in $x^2$.`, R`Due numeri con prodotto $4$ e somma $-5$: $-1$ e $-4$.`, R`Ognuno dei due fattori ottenuti è una differenza di quadrati.`], risposta: { tipo: 'numeri', valori: [-2, -1, 1, 2] }, soluzione: [R`Trinomio speciale in $x^2$: $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4)$, perché $(-1) + (-4) = -5$ e $(-1)(-4) = 4$.`, R`Entrambi i fattori sono differenze di quadrati: $(x + 1)(x - 1)(x + 2)(x - 2)$.`, R`Il polinomio si annulla quando un fattore vale zero: $x = -1$, $x = 1$, $x = -2$, $x = 2$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Calcola MCD e mcm dei polinomi $A = x^3 - x$ e $B = x^2 - 2x + 1$.`, suggerimenti: [R`Scomponi entrambi fino in fondo.`, R`$A = x(x + 1)(x - 1)$ e $B = (x - 1)^2$: quali fattori sono comuni?`], soluzione: [R`$A = x^3 - x = x(x^2 - 1) = x(x + 1)(x - 1)$.`, R`$B = x^2 - 2x + 1 = (x - 1)^2$.`, R`Fattore comune: $(x - 1)$, con esponente minimo $1$. $\text{MCD}(A, B) = x - 1$.`, R`Tutti i fattori con l'esponente massimo: $\text{mcm}(A, B) = x(x + 1)(x - 1)^2$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Scrivi le condizioni di esistenza e semplifica $\dfrac{x^3 + 8}{x^2 - 4}$. Come risposta indica i valori di $x$ esclusi dalle c.e.`, suggerimenti: [R`Il denominatore è una differenza di quadrati: quali valori lo annullano?`, R`Il numeratore è una somma di cubi: $x^3 + 2^3$.`, R`Dopo la scomposizione un fattore compare sopra e sotto.`], risposta: { tipo: 'numeri', valori: [-2, 2] }, soluzione: [R`Denominatore: $x^2 - 4 = (x + 2)(x - 2)$. C.e.: $x \ne -2$ e $x \ne 2$.`, R`Numeratore: $x^3 + 8 = (x + 2)(x^2 - 2x + 4)$.`, R`$\dfrac{(x + 2)(x^2 - 2x + 4)}{(x + 2)(x - 2)} = \dfrac{x^2 - 2x + 4}{x - 2}$, con $x \ne \pm 2$.`, R`Il falso quadrato $x^2 - 2x + 4$ non si semplifica ulteriormente: è irriducibile.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Scomporre un polinomio in fattori significa…`, opzioni: [R`svilupparlo eliminando le parentesi`, R`scriverlo come prodotto di polinomi di grado più basso`, R`calcolarne il valore per $x = 0$`, R`dividerlo per il suo termine noto`], corretta: 1, spiegazione: R`Scomporre è l'operazione inversa dello sviluppare: si passa da una somma di termini a un prodotto di fattori. Le altre opzioni non producono un prodotto.` },
    { id: 'q-02', domanda: R`Qual è il primo metodo da provare, sempre, davanti a un polinomio da scomporre?`, opzioni: [R`il raccoglimento totale`, R`la regola di Ruffini`, R`la differenza di quadrati`, R`il trinomio speciale`], corretta: 0, spiegazione: R`Il raccoglimento totale va provato per primo: semplifica i numeri e fa comparire i prodotti notevoli. Ruffini è l'ultima risorsa, gli altri metodi dipendono dal numero di termini.` },
    { id: 'q-03', domanda: R`Il binomio $x^2 + 16$…`, opzioni: [R`si scompone come $(x + 4)^2$`, R`si scompone come $(x + 4)(x - 4)$`, R`è irriducibile in $\mathbb{R}$`, R`si scompone con Ruffini usando lo zero $x = 4$`], corretta: 2, spiegazione: R`Una somma di quadrati non si scompone. $(x + 4)^2 = x^2 + 8x + 16$ e $(x + 4)(x - 4) = x^2 - 16$ sono altri polinomi, e $P(4) = 32 \ne 0$.` },
    { id: 'q-04', domanda: R`Quale dei seguenti trinomi è il quadrato di un binomio?`, opzioni: [R`$x^2 + 5x + 25$`, R`$x^2 - 25$`, R`$x^2 + 10x - 25$`, R`$x^2 - 10x + 25$`], corretta: 3, spiegazione: R`Le basi sono $x$ e $5$, il doppio prodotto è $10x$: $x^2 - 10x + 25 = (x - 5)^2$. In $x^2 + 5x + 25$ il termine di mezzo non è il doppio prodotto; $x^2 - 25$ ha due termini; $x^2 + 10x - 25$ ha un quadrato negativo.` },
    { id: 'q-05', domanda: R`$A^3 + B^3$ è uguale a…`, opzioni: [R`$(A + B)^3$`, R`$(A + B)(A^2 - AB + B^2)$`, R`$(A + B)(A^2 + AB + B^2)$`, R`$(A - B)(A^2 + AB + B^2)$`], corretta: 1, spiegazione: R`Somma di cubi: binomio con lo stesso segno, falso quadrato con il segno opposto nel termine di mezzo. $(A + B)^3$ ha quattro termini; l'ultima opzione è la differenza di cubi.` },
    { id: 'q-06', domanda: R`Il raccoglimento parziale porta a una scomposizione quando…`, opzioni: [R`i termini sono almeno sei`, R`tutti i termini hanno un fattore comune`, R`dopo aver raccolto in ogni gruppo, le parentesi che restano sono uguali`, R`il polinomio ha grado pari`], corretta: 2, spiegazione: R`Solo se le parentesi coincidono si può raccogliere una seconda volta. Se tutti i termini hanno un fattore comune si usa il raccoglimento totale; numero di termini e grado non c'entrano.` },
    { id: 'q-07', domanda: R`Per scomporre $x^2 + sx + p$ come trinomio speciale si cercano due numeri che abbiano…`, opzioni: [R`somma $s$ e prodotto $p$`, R`somma $p$ e prodotto $s$`, R`differenza $s$ e prodotto $p$`, R`somma $-s$ e prodotto $-p$`], corretta: 0, spiegazione: R`Sviluppando $(x + m)(x + n)$ si ottiene $x^2 + (m + n)x + mn$: la somma è il coefficiente di $x$, il prodotto è il termine noto.` },
    { id: 'q-08', domanda: R`Nel trinomio speciale $x^2 + sx + p$, se $p < 0$ i due numeri cercati…`, opzioni: [R`sono entrambi negativi`, R`sono entrambi positivi`, R`non esistono mai`, R`hanno segni opposti`], corretta: 3, spiegazione: R`Un prodotto negativo richiede fattori di segno opposto; il segno di $s$ dice quale dei due è più grande in valore assoluto. Per esempio $x^2 + 3x - 10 = (x + 5)(x - 2)$.` },
    { id: 'q-09', domanda: R`Il teorema di Ruffini afferma che $P(x)$ è divisibile per $(x - a)$ se e solo se…`, opzioni: [R`$a$ è un divisore del termine noto`, R`$P(a) = 0$`, R`$P(0) = a$`, R`il grado di $P(x)$ è maggiore di $1$`], corretta: 1, spiegazione: R`Divisibile vuol dire resto zero, e il resto è $P(a)$ per il teorema del resto. I divisori del termine noto sono solo i candidati fra cui cercare $a$, non una garanzia.` },
    { id: 'q-10', domanda: R`Se $P(x)$ ha coefficienti interi, i suoi eventuali zeri interi vanno cercati…`, opzioni: [R`fra i divisori del coefficiente di grado massimo`, R`fra i numeri da $1$ al grado del polinomio`, R`fra i divisori, positivi e negativi, del termine noto`, R`solo fra $1$ e $-1$`], corretta: 2, spiegazione: R`Uno zero intero $a$ divide il termine noto (tutti gli altri termini contengono $a$ come fattore). Il primo coefficiente serve solo per i denominatori degli zeri frazionari.` },
    { id: 'q-11', domanda: R`Il resto della divisione di $P(x)$ per $(x + 2)$ è…`, opzioni: [R`$P(-2)$`, R`$P(2)$`, R`$P(0) + 2$`, R`sempre zero`], corretta: 0, spiegazione: R`$x + 2 = x - (-2)$, quindi $a = -2$ e il resto è $P(-2)$. Sbagliare il segno di $a$ è l'errore più frequente con il teorema del resto.` },
    { id: 'q-12', domanda: R`Il mcm di due polinomi scomposti è il prodotto…`, opzioni: [R`dei soli fattori comuni, con l'esponente minimo`, R`dei soli fattori comuni, con l'esponente massimo`, R`di tutti i fattori, ciascuno con l'esponente minimo`, R`dei fattori comuni e non comuni, ciascuno con l'esponente massimo`], corretta: 3, spiegazione: R`Come per i numeri: il mcm deve contenere ogni fattore di ciascun polinomio, con l'esponente più alto con cui compare. I soli fattori comuni con l'esponente minimo danno il MCD.` },
    { id: 'q-13', domanda: R`Dopo aver semplificato $\dfrac{x^2 - 1}{x - 1}$ in $x + 1$, le condizioni di esistenza…`, opzioni: [R`non servono più, perché il denominatore è sparito`, R`restano $x \ne 1$: la frazione di partenza non è definita per $x = 1$`, R`diventano $x \ne -1$`, R`diventano $x \ne 0$`], corretta: 1, spiegazione: R`Le c.e. si riferiscono alla frazione di partenza, che per $x = 1$ ha denominatore zero. La semplificazione vale solo dove la frazione esiste.` },
    { id: 'q-14', domanda: R`Quale semplificazione è corretta?`, opzioni: [R`$\dfrac{x^2 - 4}{x - 2} = x + 2$, per $x \ne 2$`, R`$\dfrac{x^2 + 4}{x^2} = 4$`, R`$\dfrac{x + 3}{x} = 3$`, R`$\dfrac{2x + 1}{2} = x + 1$`], corretta: 0, spiegazione: R`Si semplificano solo i fattori: $x^2 - 4 = (x + 2)(x - 2)$ e il fattore $(x - 2)$ si elide. Nelle altre si "semplificano" addendi, che non è lecito: per esempio con $x = 1$, $\dfrac{1 + 4}{1} = 5 \ne 4$.` },
    { id: 'q-15', domanda: R`Se la somma dei coefficienti di un polinomio $P(x)$ è zero, allora…`, opzioni: [R`il polinomio è irriducibile`, R`$P(0) = 0$, quindi si può raccogliere $x$`, R`$P(1) = 0$, quindi $(x - 1)$ è un fattore`, R`$P(-1) = 0$, quindi $(x + 1)$ è un fattore`], corretta: 2, spiegazione: R`Sostituendo $x = 1$ ogni termine diventa il suo coefficiente: $P(1)$ è la somma dei coefficienti. Se vale zero, per Ruffini $(x - 1)$ divide $P(x)$. $P(0)$ è invece il termine noto.` },
    { id: 'q-16', domanda: R`Lo sviluppo di $(A + B + C)^2$ ha…`, opzioni: [R`tre termini: i tre quadrati`, R`quattro termini`, R`nove termini tutti diversi`, R`sei termini: tre quadrati e tre doppi prodotti`], corretta: 3, spiegazione: R`$(A + B + C)^2 = A^2 + B^2 + C^2 + 2AB + 2AC + 2BC$: un doppio prodotto per ogni coppia di basi. I nove prodotti del calcolo si riducono a sei perché $AB$ e $BA$ sono uguali.` },
    { id: 'q-17', domanda: R`Il trinomio $x^2 + x + 1$, detto *falso quadrato*…`, opzioni: [R`è il quadrato di $(x + 1)$`, R`è irriducibile in $\mathbb{R}$ e compare nella scomposizione di $x^3 - 1$`, R`si scompone come $(x + 1)(x - 1)$`, R`si scompone con Ruffini`], corretta: 1, spiegazione: R`$x^3 - 1 = (x - 1)(x^2 + x + 1)$. Il falso quadrato non ha zeri ($P(1) = 3$, $P(-1) = 1$, e non vale mai zero), quindi né Ruffini né altri metodi lo scompongono. $(x + 1)^2 = x^2 + 2x + 1$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima raccogli, poi conta i termini: due, tre, quattro o sei. Il numero di termini ti dice quali prodotti notevoli provare.` },
    { tipo: 'errore', testo: R`$x^2 - 9$ non è $(x - 3)^2$, e $x^2 + 9$ non si scompone affatto. La differenza di quadrati dà $(x + 3)(x - 3)$.` },
    { tipo: 'trucco', testo: R`Per un quadrato di binomio fai il test del doppio prodotto: prendi le due basi, raddoppia il loro prodotto e confrontalo con il termine di mezzo. Se non coincide, non è un quadrato.` },
    { tipo: 'trucco', testo: R`Somma dei coefficienti uguale a zero? Allora $(x - 1)$ è un fattore. Coefficienti di grado pari e di grado dispari con la stessa somma? Allora c'è $(x + 1)$.` },
    { tipo: 'errore', testo: R`Una scomposizione finita a metà è sbagliata come una non fatta: se dentro un prodotto vedi $x^2 - 4$ o $x^2 - 1$, continua.` },
    { tipo: 'metodo', testo: R`Ultimo passo, sempre: moltiplica i fattori. Se non torna il polinomio di partenza, hai sbagliato un segno o un numero.` },
    { tipo: 'errore', testo: R`Nelle frazioni si semplificano i fattori, non gli addendi: $\dfrac{x + 3}{x}$ non è $3$. Prima scomponi, poi cancella.` },
    { tipo: 'trucco', testo: R`Nel trinomio speciale guarda prima il prodotto: se è negativo i due numeri hanno segni opposti, se è positivo hanno tutti e due il segno della somma.` },
    { tipo: 'errore', testo: R`Nella tabella di Ruffini i termini mancanti valgono $0$: per $x^3 - 7x + 6$ la prima riga è $1$, $0$, $-7$, $6$. Saltare lo zero sposta tutti i calcoli.` }
  ],

  aneddoti: [
    { matematico: 'Euclide', anni: 'circa 300 a.C.', titolo: 'L\'algoritmo più antico ancora in uso', testo: R`Degli *Elementi* di Euclide si ricordano i triangoli e i cerchi, ma tre dei tredici libri parlano di numeri interi. Il libro VII si apre con un procedimento per trovare la "massima misura comune" di due numeri: si toglie il più piccolo dal più grande, poi si ripete con il resto, finché non si arriva a zero. È l'**algoritmo di Euclide**, lo stesso che i computer usano oggi per il MCD, e funziona anche con i polinomi, sostituendo le sottrazioni con divisioni con resto. Di Euclide non si sa quasi nulla: insegnò ad Alessandria sotto Tolomeo I. Si racconta che uno studente, dopo il primo teorema, gli chiese che cosa ci avrebbe guadagnato; Euclide fece dare al ragazzo una moneta, «visto che deve guadagnare qualcosa da ciò che impara», e lo congedò.`, legame: R`Il MCD di polinomi che qui si calcola scomponendo in fattori è lo stesso oggetto che Euclide calcolava per i numeri, con l'algoritmo che porta il suo nome.` },
    { matematico: 'Blaise Pascal', anni: '1623–1662', titolo: 'Il triangolo con quattro nomi', testo: R`I coefficienti del cubo di binomio, $1, 3, 3, 1$, sono una riga del triangolo in cui ogni numero è la somma dei due sopra di lui. In Francia si chiama triangolo di Pascal, perché nel 1654 Pascal ne scrisse un trattato intero, il *Traité du triangle arithmétique*, dimostrandone le proprietà con il principio di induzione, che fu fra i primi a usare in modo esplicito. In Italia però si chiama triangolo di Tartaglia, che lo aveva pubblicato un secolo prima; in Iran si chiama di Khayyam, in Cina di Yang Hui, che lo disegnò nel 1261, e i matematici indiani lo conoscevano da secoli. Pascal era un prodigio: a sedici anni scrisse un trattato sulle coniche, a diciannove costruì una macchina calcolatrice per aiutare il padre, esattore delle tasse. A trentun anni abbandonò quasi del tutto la matematica per la religione.`, legame: R`Le righe del triangolo sono i coefficienti di $(A + B)^n$: quella del cubo, $1, 3, 3, 1$, è la firma da riconoscere per scomporre un cubo di binomio.` },
    { matematico: 'Sophie Germain', anni: '1776–1831', titolo: 'La scomposizione che porta il nome di una donna', testo: R`A tredici anni, chiusa in casa a Parigi durante la Rivoluzione, Sophie Germain lesse della morte di Archimede e decise di studiare matematica. I genitori le tolsero il fuoco e le candele per farla smettere; lei studiava di notte avvolta nelle coperte. L'École Polytechnique non ammetteva donne, così si procurò le dispense e mandò i compiti sotto il nome di uno studente, Antoine-Auguste Le Blanc. Con lo stesso nome scrisse per anni a Gauss, che scoprì la verità solo dopo che lei, nel 1806, fece intervenire un generale francese per proteggerlo durante l'occupazione di Braunschweig. Gauss le rispose con una lettera di ammirazione rimasta famosa. Fu la prima donna premiata dall'Accademia delle Scienze di Parigi, per uno studio sulle vibrazioni delle lastre. Porta il suo nome l'identità $a^4 + 4b^4 = (a^2 + 2b^2 + 2ab)(a^2 + 2b^2 - 2ab)$.`, legame: R`L'identità di Sophie Germain si dimostra con i metodi di questo argomento: si aggiunge e toglie $4a^2b^2$ per completare il quadrato $(a^2 + 2b^2)^2$, e poi si applica la differenza di quadrati.` },
    { matematico: 'Paolo Ruffini', anni: '1765–1822', titolo: 'Il medico che divideva i polinomi', testo: R`Paolo Ruffini era un medico di Modena, e lo restò per tutta la vita: la matematica la faceva nel tempo che avanzava fra i pazienti. Nel 1798 rifiutò di giurare fedeltà alla Repubblica Cisalpina e perse la cattedra all'università; tornò a curare i malati e intanto scrisse, nel 1799, un libro di cinquecento pagine in cui sosteneva che per le equazioni di quinto grado non può esistere una formula risolutiva. Quasi nessuno lo lesse, e la dimostrazione aveva una lacuna, ma l'idea era giusta: oggi si parla di teorema di Abel–Ruffini. La regola che porta il suo nome compare in una memoria del 1804, premiata dalla Società Italiana delle Scienze, sul calcolo delle radici delle equazioni numeriche. Divenuto rettore dell'università, durante l'epidemia di tifo del 1817 continuò a visitare i malati, si contagiò e non si riprese mai del tutto.`, legame: R`La regola di Ruffini è il metodo con cui, trovato uno zero fra i divisori del termine noto, si abbassa il grado del polinomio e si continua a scomporre.` },
    { matematico: 'Niels Henrik Abel', anni: '1802–1829', titolo: 'Sei pagine per chiudere una domanda di tre secoli', testo: R`Dopo la formula di Cardano per il terzo grado e quella di Ferrari per il quarto, per quasi trecento anni i matematici cercarono la formula per il quinto. Nel 1824 un norvegese di ventun anni, Niels Henrik Abel, dimostrò che non esiste: nessuna formula con radici può risolvere l'equazione generale di quinto grado. Povero, stampò la dimostrazione a proprie spese e la compresse in sei pagine per risparmiare sulla tipografia, tanto che quasi nessuno riuscì a seguirla; Gauss non la lesse nemmeno. Un lungo lavoro spedito all'Accademia di Parigi fu smarrito da Cauchy. Abel si ammalò di tubercolosi e morì nell'aprile del 1829, a ventisei anni. Due giorni dopo arrivò da Berlino la lettera che gli offriva la cattedra universitaria che aveva sempre sperato. Il Premio Abel, istituito dalla Norvegia nel 2002, è oggi il riconoscimento più importante della matematica.`, legame: R`Poiché dal quinto grado in su non esiste una formula, per scomporre un polinomio di grado alto non c'è scorciatoia: si cerca uno zero fra i divisori del termine noto e si abbassa il grado con Ruffini.` }
  ]
});
})();
