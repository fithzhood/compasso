(function () {
const R = String.raw;
/* allenamento: la soluzione si scrive come numero o frazione, anche «x = 5/2»; impossibile e indeterminata a parole.
   Dagli esercizi b-15 in poi il segnaposto è lo stesso per tutti, così non svela quali sono impossibili. */
const SEGNA = 'es. 4 oppure 5/2';
const SEGNA_CASI = 'un numero, impossibile o indeterminata';
const sol = (v, segna) => ({ tipo: 'numeri', valori: [v], segnaposto: segna || SEGNA });
const IMPOSSIBILE = { tipo: 'testo', segnaposto: SEGNA_CASI, accettate: ['impossibile', 'è impossibile', "l'equazione è impossibile", 'equazione impossibile', 'e impossibile', "e' impossibile", 'nessuna', 'nessuna soluzione', 'nessuna soluzione reale', 'non ha soluzioni', 'non ha soluzione', 'nessun numero', 'nessun valore', 'nessun x', 'insieme vuoto', 'vuoto', '∅', 'Ø', 'ø', 's=∅', 's=Ø', 's={}', '{}'] };
const INDETERMINATA = { tipo: 'testo', segnaposto: SEGNA_CASI, accettate: ['indeterminata', 'è indeterminata', "l'equazione è indeterminata", 'equazione indeterminata', 'e indeterminata', "e' indeterminata", 'indeterminato', 'identità', 'identita', "è un'identità", 'infinite', 'infinite soluzioni', 'ha infinite soluzioni', 'tutti i numeri', 'tutti i numeri reali', 'ogni numero', 'ogni numero reale', 'ogni x', 'per ogni x', 'qualsiasi numero', 'qualunque numero', 'qualsiasi x', 'qualunque x', 'r', 'ℝ', 's=r', 's=ℝ', 'x∈r', 'x∈ℝ', '∀x'] };
COMPASSO.registra({
  id: 'equazioni-primo-grado',
  titolo: 'Equazioni di primo grado',

  introduzione: R`Un taxi costa 3 € alla partenza e 1,50 € per ogni chilometro. Hai 15 €: quanti chilometri puoi fare? Chiama $x$ i chilometri. La domanda diventa $3 + 1{,}5x = 15$, e la risposta è $x = 8$.

Questa è un'**equazione di primo grado**. Il numero sconosciuto $x$ si chiama **incognita**, e qui compare senza esponenti. **Risolvere** l'equazione vuol dire trovare il valore di $x$ che rende vera l'uguaglianza.

Ti servono il calcolo con i polinomi e il minimo comune multiplo. Per le equazioni fratte serve anche la scomposizione.`,

  inBreve: [
    R`Un'equazione è vera solo per alcuni valori dell'incognita. Risolverla vuol dire trovarli tutti.`,
    R`Puoi aggiungere o togliere la stessa cosa ai due membri. Puoi moltiplicarli o dividerli per lo stesso numero **diverso da zero**. Le soluzioni non cambiano.`,
    R`Un termine che passa dall'altra parte dell'uguale cambia segno. Gli altri restano come sono.`,
    R`Alla fine arrivi a $ax = b$. Se $a \ne 0$, la soluzione è $x = \frac{b}{a}$. Se $a = 0$, l'equazione è impossibile oppure indeterminata.`,
    R`Nelle fratte scrivi prima le condizioni di esistenza. Alla fine scarta le soluzioni che non le rispettano.`,
    R`Controlla sempre: sostituisci la soluzione nell'equazione di partenza.`
  ],

  sezioni: [
    { id: 'identita-equazioni', titolo: 'Identità, equazioni e soluzioni', testo: R`Metti qualche numero al posto di $x$ in queste due uguaglianze:

$$2(x + 1) = 2x + 2 \qquad\qquad 2x + 1 = 7$$

Nella prima, i due lati danno sempre lo stesso risultato. Con $x = 0$ viene $2 = 2$, con $x = 5$ viene $12 = 12$. Nella seconda no. Con $x = 3$ viene $7 = 7$, vera. Con $x = 5$ viene $11 = 7$, falsa.

>* Un'**identità** è vera per **ogni** valore delle lettere. Un'**equazione** è vera solo per **alcuni** valori dell'**incognita**, o per nessuno. Ogni valore che la rende vera è una **soluzione**.

L'insieme delle soluzioni si chiama $S$. Per $2x + 1 = 7$ è $S = \{3\}$. Le due parti ai lati dell'uguale si chiamano **membri**.

Per **verificare** una soluzione, sostituiscila nell'equazione di partenza. I due membri devono dare lo stesso numero. Costa poco e trova quasi tutti gli errori.

Le parole per classificare le equazioni:

| parola | che cosa vuol dire | esempio |
|---|---|---|
| grado | l'esponente più alto dell'incognita, dopo aver fatto i calcoli | $3x - 5 = x + 1$ è di primo grado (o **lineare**) |
| numerica | oltre all'incognita ci sono solo numeri | $3x - 5 = x + 1$ |
| letterale | ci sono altre lettere, i parametri | $ax + 1 = 2a$ |
| intera | l'incognita non sta in nessun denominatore | $\dfrac{x}{2} - 1 = \dfrac{x + 3}{4}$ |
| fratta | l'incognita sta in almeno un denominatore | $\dfrac{2}{x - 1} = 5$ |

?? L'equazione $\dfrac{x}{3} + 1 = \dfrac{x - 2}{5}$ è…
[x] intera: sotto le linee di frazione ci sono solo numeri
[ ] fratta: ci sono delle frazioni
[ ] letterale: ci sono lettere dentro una frazione
=> Conta solo dove sta l'incognita. Sotto le linee ci sono $3$ e $5$, due numeri: l'equazione è intera. Sarebbe fratta con la $x$ sotto la linea, come in $\dfrac{3}{x}$.

>! Il grado si guarda **dopo** i calcoli. In $x^2 + 3x = x^2 + 5$ le $x^2$ si cancellano. Resta $3x = 5$, di primo grado.` },

    { id: 'principi-equivalenza', titolo: 'I principi di equivalenza', testo: R`Come passi da $5x - 3 = 2x + 9$ a $x = 4$? Trasformi l'equazione un passo alla volta. A ogni passo le soluzioni restano le stesse. Due equazioni con le stesse soluzioni si dicono **equivalenti**.

Pensa a una bilancia in equilibrio: i due piatti sono i due membri. Se aggiungi lo stesso peso a tutti e due, l'equilibrio resta. Se raddoppi il contenuto di tutti e due, anche.

>* **Primo principio.** Puoi aggiungere o togliere la stessa cosa a tutti e due i membri. Ottieni un'equazione equivalente.

>* **Secondo principio.** Puoi moltiplicare o dividere tutti e due i membri per lo stesso numero **diverso da zero**. Ottieni un'equazione equivalente.

Nella scheda **Laboratorio** puoi provare la bilancia.

Dai principi vengono tre regole pratiche:

- **Trasporto.** Un termine passa dall'altra parte dell'uguale cambiando segno. Da $3x + 5 = 11$ passi a $3x = 11 - 5$.
- **Cancellazione.** Un termine uguale nei due membri si cancella: $2x + 7 = x + 7$ diventa $2x = x$.
- **Cambio di segno.** Puoi cambiare segno a *tutti* i termini: $-x = -4$ diventa $x = 4$.

L'equazione dell'inizio si risolve così:

~ 5x - 3 = 2x + 9 :: si parte da qui
~ 5x \evid{- 2x} = 9 \evid{+ 3} :: porto $2x$ a sinistra e $-3$ a destra: tutti e due cambiano segno
~ \evid{3x} = \evid{12} :: sommo i termini simili
~ x = \evidb{4} :: divido entrambi i membri per $3$ (secondo principio)

Verifica nell'equazione di partenza: $5 \cdot 4 - 3 = 17$ e $2 \cdot 4 + 9 = 17$. ✓

?? Da $7 - 2x = 3$ uno studente scrive $-2x = 3 + 7$. Che cosa ha sbagliato?
[x] il $7$ passa a destra cambiando segno: doveva scrivere $-2x = 3 - 7$
[ ] niente, il passaggio è giusto
[ ] doveva cambiare segno anche a $-2x$
=> Il $7$ è positivo: spostato a destra diventa $-7$. Quindi $-2x = -4$ e $x = 2$. Il $-2x$ resta dov'è: cambia segno solo il termine che sposti.

>! Dividi solo per un numero sicuramente diverso da zero. Da $3x = 5x$, dividendo per $x$, verrebbe $3 = 5$. Ma $x$ può valere $0$. Trasportando trovi $-2x = 0$, cioè $x = 0$.` },

    { id: 'forma-normale', titolo: 'La forma normale e i tre casi', testo: R`Ogni equazione di primo grado intera, alla fine, ha la stessa forma. Le $x$ stanno a sinistra, i numeri a destra, e i termini simili sono sommati.

>* **Forma normale:** $ax = b$. Il numero $a$ è il **coefficiente** dell'incognita, $b$ è il **termine noto**.

Se $a$ non è zero, dividi per $a$. A volte però le $x$ si cancellano e resta $a = 0$. I casi sono tre:

| caso | l'equazione è | soluzioni |
|---|---|---|
| $a \ne 0$ | determinata | una sola: $x = \frac{b}{a}$ |
| $a = 0$, $b \ne 0$ | impossibile | nessuna: $S = \varnothing$ |
| $a = 0$, $b = 0$ | indeterminata | tutti i numeri: $S = \mathbb{R}$ |

Con $a = 0$ il primo membro fa sempre zero, perché $0 \cdot x = 0$. Se $b$ non è zero, nessun $x$ va bene. Se $b$ è zero, vanno bene tutti.

Le due equazioni qui sotto si somigliano. Guarda che cosa resta alla fine.

~ 3(x - 1) = x + 3 :: prima equazione
~ 3x - 3 = x + 3 :: tolgo la parentesi
~ \evid{2x} = \evid{6} :: $x$ a sinistra, numeri a destra: $a = 2$, che non è zero
~ x = \evidb{3} :: divido per $2$: determinata

~ 2(x + 1) = 2x + 5 :: seconda equazione
~ 2x + 2 = 2x + 5 :: tolgo la parentesi
~ \evid{0 \cdot x} = \evid{3} :: le $x$ si cancellano: $a = 0$, ma $b = 3$
~ S = \evidb{\varnothing} :: nessun numero moltiplicato per $0$ dà $3$: impossibile

Con $2(x + 1) = 2x + 2$, invece, resta $0 \cdot x = 0$: vera per ogni $x$. È indeterminata.

?? Riducendo un'equazione arrivi a $0 \cdot x = 0$. Che cosa scrivi?
[ ] $x = 0$
[ ] è impossibile
[x] è indeterminata: ogni numero reale è soluzione
=> $0 \cdot x$ fa $0$ per ogni $x$, quindi l'uguaglianza è sempre vera: $S = \mathbb{R}$. L'errore più comune è scrivere $x = 0$: è una soluzione, ma non l'unica.

>! «Impossibile» e «indeterminata» sono risposte precise: scrivile per esteso. Non scrivere mai $x = \dfrac{3}{0}$: la divisione per zero non esiste.` },

    { id: 'frazioni-numeriche', titolo: 'Equazioni con frazioni numeriche', testo: R`In $\dfrac{x}{2} - \dfrac{x - 1}{3} = 1$ ci sono frazioni. I denominatori però sono numeri, quindi l'equazione è intera. Le frazioni si tolgono moltiplicando tutto per il **minimo comune multiplo** (mcm) dei denominatori.

1. Calcola il mcm dei denominatori.
2. Scrivi ogni termine con quel denominatore.
3. Togli il denominatore.
4. Risolvi l'equazione che resta.

>* Moltiplica per il mcm **ogni** termine, anche quelli senza frazione.

~ \dfrac{x}{2} - \dfrac{x - 1}{3} = 1 :: il mcm di $2$ e $3$ è $6$
~ \dfrac{3x - 2\evid{(x - 1)}}{6} = \dfrac{\evid{6}}{6} :: tutto con denominatore $6$; il numeratore $x - 1$ va tra parentesi, e anche l'$1$ diventa $\frac{6}{6}$
~ 3x \evid{- 2x + 2} = 6 :: tolgo il $6$ (moltiplico per $6$) e poi la parentesi: il meno cambia segno a **tutti e due** i termini
~ x + 2 = 6 :: sommo i termini simili
~ x = \evidb{4} :: porto il $2$ a destra

Verifica: $\dfrac{4}{2} - \dfrac{3}{3} = 2 - 1 = 1$. ✓

Il meno davanti alla frazione vale per **tutto** il numeratore. Per questo il numeratore va tra parentesi.

?? Moltiplicando per $6$, il termine $-\dfrac{x - 1}{3}$ diventa…
[ ] $-2x - 2$
[x] $-2x + 2$
[ ] $-2x - 1$
=> $6 \cdot \left(-\dfrac{x - 1}{3}\right) = -2(x - 1) = -2x + 2$. Chi scrive $-2x - 2$ ha dato il meno solo alla $x$. Chi scrive $-2x - 1$ ha moltiplicato per $2$ solo la $x$.

Anche la virgola si toglie così. $0{,}5x + 1{,}2 = 2$, moltiplicato per $10$, diventa $5x + 12 = 20$. Quindi $x = \dfrac{8}{5}$.` },

    { id: 'fratte', titolo: 'Equazioni fratte e condizioni di esistenza', testo: R`In $\dfrac{3}{x - 2} = 1$ la $x$ sta al denominatore: l'equazione è **fratta**. Se $x$ valesse $2$, il denominatore farebbe $0$. Una frazione con denominatore zero non ha senso. Quel valore va escluso **prima** di cominciare.

>* **Condizioni di esistenza (c.e.):** i valori di $x$ per cui nessun denominatore vale zero. Scrivile all'inizio. Alla fine scarta le soluzioni che non le rispettano.

La procedura:

1. Scrivi le c.e.: ogni denominatore $\ne 0$. Se serve, scomponi prima.
2. Porta tutto al denominatore comune.
3. Togli il denominatore. Puoi farlo, perché con le c.e. non vale zero.
4. Risolvi e confronta le soluzioni con le c.e.

~ \dfrac{x + 1}{x - 2} = \dfrac{x - 3}{x + 2} :: c.e.: $x \ne 2$ e $x \ne -2$
~ (x + 1)\evid{(x + 2)} = (x - 3)\evid{(x - 2)} :: denominatore comune $(x - 2)(x + 2)$, che poi elimino
~ x^2 + 3x + 2 = x^2 - 5x + 6 :: svolgo i prodotti
~ \evid{8x} = \evid{4} :: le $x^2$ si cancellano; $x$ a sinistra e numeri a destra
~ x = \evidb{\dfrac{1}{2}} :: rispetta le c.e., quindi è accettabile

Verifica: $\dfrac{3/2}{-3/2} = -1$ e $\dfrac{-5/2}{5/2} = -1$. ✓

Se la soluzione non rispetta le c.e., si scarta:

~ \dfrac{2x}{x - 3} - 1 = \dfrac{6}{x - 3} :: c.e.: $x \ne 3$
~ 2x \evid{- (x - 3)} = 6 :: moltiplico per $x - 3$: l'$1$ diventa $x - 3$, con il meno davanti
~ x + 3 = 6 :: tolgo la parentesi e riduco
~ x = \evidb{3} :: ma $3$ viola la c.e.: si scarta, e l'equazione è **impossibile**

?? Quali sono le c.e. di $\dfrac{1}{x^2 - 4} = \dfrac{2}{x}$?
[ ] $x \ne 4$
[ ] $x \ne 2$ e $x \ne 0$
[x] $x \ne 2$, $x \ne -2$ e $x \ne 0$
=> $x^2 - 4 = (x - 2)(x + 2)$ vale zero in **due** punti, $2$ e $-2$. Il secondo denominatore aggiunge $x \ne 0$. Chi scrive $x \ne 2$ e $x \ne 0$ ha perso il $-2$.

>! $2 - x$ è l'opposto di $x - 2$. Riscrivilo come $-(x - 2)$ prima di cercare il denominatore comune.` },

    { id: 'letterali', titolo: 'Equazioni letterali: la discussione', testo: R`In $ax = 2a$ c'è una lettera in più. La $a$ è un **parametro**: un numero fissato che non conosci. Con $a = 3$ l'equazione è $3x = 6$. Con $a = 0$ è $0 \cdot x = 0$. Le due equazioni si comportano in modo diverso.

>* **Discutere** un'equazione letterale vuol dire risolverla per **ogni** valore del parametro. Portala alla forma $A\,x = B$. Dove $A \ne 0$, dividi: $x = \dfrac{B}{A}$. Dove $A = 0$, è impossibile se $B \ne 0$ e indeterminata se $B = 0$.

~ ax - 2 = x + a :: $a$ è il parametro, $x$ l'incognita
~ ax \evid{- x} = a \evid{+ 2} :: termini con la $x$ a sinistra, tutto il resto a destra
~ \evid{(a - 1)}\,x = a + 2 :: raccolgo la $x$: il coefficiente è $a - 1$
~ x = \evidb{\dfrac{a + 2}{a - 1}} :: divido, ma solo se $a - 1 \ne 0$, cioè $a \ne 1$

Resta il caso $a = 1$. Sostituisci: $(1 - 1)\,x = 1 + 2$, cioè $0 \cdot x = 3$. È impossibile. La risposta completa:

| valore del parametro | l'equazione è | soluzione |
|---|---|---|
| $a \ne 1$ | determinata | $x = \dfrac{a + 2}{a - 1}$ |
| $a = 1$ | impossibile | nessuna |

Controllo con $a = 3$: $3x - 2 = x + 3$ dà $x = \dfrac{5}{2}$. La formula dà proprio $\dfrac{3 + 2}{3 - 1} = \dfrac{5}{2}$. ✓

?? Per quale valore di $a$ l'equazione $(a + 2)\,x = 4$ è impossibile?
[x] $a = -2$
[ ] $a = 2$
[ ] $a = 0$
=> Con $a = -2$ il coefficiente $a + 2$ vale zero: resta $0 \cdot x = 4$, impossibile. Con $a = 0$ l'equazione è $2x = 4$, determinata. Conta quando vale zero il **coefficiente** della $x$.

> Se il parametro sta in un denominatore, come in $\dfrac{x}{a} = 1$, serve anche $a \ne 0$.

>! Non fermarti a $x = \dfrac{a + 2}{a - 1}$. Hai diviso per $a - 1$: chiediti quando vale zero.` },

    { id: 'problemi', titolo: 'Problemi risolti con le equazioni', testo: R`Un problema a parole si risolve traducendolo in un'equazione. La parte difficile è la traduzione. Segui sempre questo schema:

1. **Incognita.** Scegli che cosa chiamare $x$. Scrivilo, con l'unità di misura.
2. **Traduzione.** Scrivi le altre grandezze con la $x$. Poi scrivi l'equazione.
3. **Risoluzione.** Risolvi l'equazione.
4. **Senso.** Controlla che la soluzione vada bene per il problema.

Traduzioni che tornano spesso:

| il testo dice | si scrive |
|---|---|
| il doppio di un numero | $2x$ |
| un numero aumentato di 3 | $x + 3$ |
| la metà di un numero | $\dfrac{x}{2}$ |
| due numeri consecutivi | $x$ e $x + 1$ |
| la base supera l'altezza di 5 | base $= x + 5$ |
| fra $x$ anni avrà | età attuale $+\, x$ |

Esempio: la somma di tre numeri naturali consecutivi è $48$. Chiama $x$ il più piccolo. Gli altri due sono $x + 1$ e $x + 2$.

~ x + (x + 1) + (x + 2) = 48 :: la somma dei tre numeri è $48$
~ \evid{3x + 3} = 48 :: sommo i termini simili
~ 3x = \evid{45} :: porto il $3$ a destra
~ x = \evidb{15} :: divido per $3$

I numeri sono $15$, $16$ e $17$. La somma fa $48$. ✓

?? «Fra 4 anni Marco avrà il doppio degli anni che aveva 3 anni fa.» Se $x$ è l'età di Marco oggi, l'equazione è…
[x] $x + 4 = 2(x - 3)$
[ ] $2(x + 4) = x - 3$
[ ] $x + 4 = 2x - 3$
=> «Fra 4 anni» è $x + 4$. «3 anni fa» è $x - 3$, e il doppio va a questo. Quindi $x + 4 = 2(x - 3)$, da cui $x = 10$. La terza scrittura dimentica la parentesi e raddoppia solo la $x$.

>* Controlla il **senso**. Se $x$ conta persone e trovi $7{,}5$, qualcosa non va. Rileggi la traduzione. Se è giusta, il problema non ha soluzione.

>! Rispondi alla domanda del testo, con le unità di misura. Nell'esempio il testo chiede tre numeri: «$x = 15$» non basta.` },

    { id: 'interpretazione-grafica', titolo: 'Lo zero della retta', testo: R`L'espressione $2x - 4$ dà un numero per ogni $x$. Chiama $y$ quel numero. Se segni i punti $(x;\,y)$ nel piano cartesiano, stanno tutti su una **retta**.

| $x$ | $y = 2x - 4$ |
|---|---|
| $0$ | $-4$ |
| $1$ | $-2$ |
| $2$ | $0$ |
| $3$ | $2$ |

In quale riga $y$ vale zero? In quella con $x = 2$. È la soluzione di $2x - 4 = 0$. Nel disegno è il punto dove la retta taglia l'asse $x$: si chiama **zero** della retta.

[[grafico:zeroRetta]]

>* Risolvere $ax = b$ vuol dire cercare dove la retta $y = ax - b$ taglia l'asse $x$. Se $a \ne 0$, la retta è inclinata e lo taglia in un punto. Se $a = 0$, la retta è orizzontale: o non tocca l'asse (impossibile) o ci sta sopra (indeterminata).

?? La retta $y = 3x + 6$ taglia l'asse $x$ in…
[ ] $x = 6$
[ ] $x = 2$
[x] $x = -2$
=> Risolvi $3x + 6 = 0$: $3x = -6$, quindi $x = -2$. Chi risponde $6$ ha letto dove la retta taglia l'asse $y$. Chi risponde $2$ non ha cambiato segno al $6$.

>! Dal disegno leggi al massimo un valore approssimato. Il valore esatto lo dà il calcolo.` }
  ],

  grafici: {
    zeroRetta: {
      tipo: 'piano', x: [-2, 5], y: [-6, 5], passo: [1, 1],
      funzioni: [{ f: '2x - 4', etichetta: 'y = 2x − 4', colore: 1 }],
      punti: [
        { x: 2, y: 0, etichetta: 'x = 2', posizione: 'alto-sinistra', colore: 2 },
        { x: 0, y: -4, etichetta: '(0; −4)', posizione: 'destra', colore: 3 }
      ],
      didascalia: 'Passa il dito sulla retta: ritrovi i valori della tabella. Dove y vale 0, cioè dove la retta attraversa l\'asse x, c\'è la soluzione di 2x − 4 = 0.'
    }
  },

  esempi: [
    { titolo: 'Trasporto e verifica', problema: R`Risolvi $3x - 7 = 2x + 5$.`, passi: [
      R`Porto i termini con $x$ a sinistra e i numeri a destra, cambiando segno a ciò che sposto (regola del trasporto): $3x - 2x = 5 + 7$.`,
      R`Riduco i termini simili: $x = 12$. Il coefficiente è già $1$, non serve dividere.`,
      R`Verifica nell'equazione di partenza: primo membro $36 - 7 = 29$, secondo membro $24 + 5 = 29$. ✓`
    ], risultato: R`$x = 12$, cioè $S = \{12\}$` },

    { titolo: 'Parentesi e frazioni numeriche', problema: R`Risolvi $\dfrac{x + 3}{4} - \dfrac{x - 2}{6} = \dfrac{x}{3} + 1$.`, passi: [
      R`I denominatori sono solo numeri, quindi l'equazione è intera. Il mcm di $4$, $6$ e $3$ è $12$.`,
      R`Scrivo ogni termine con denominatore $12$, compreso l'$1$, che diventa $\dfrac{12}{12}$: $\dfrac{3(x + 3) - 2(x - 2)}{12} = \dfrac{4x + 12}{12}$.`,
      R`I denominatori sono uguali: li elimino moltiplicando entrambi i membri per $12$ (secondo principio). Resta $3(x + 3) - 2(x - 2) = 4x + 12$.`,
      R`Tolgo le parentesi. Il meno davanti a $2(x - 2)$ cambia segno a tutti e due i termini: $3x + 9 - 2x + 4 = 4x + 12$.`,
      R`Riduco i termini simili: $x + 13 = 4x + 12$.`,
      R`Porto le $x$ a sinistra e i numeri a destra: $x - 4x = 12 - 13$, cioè $-3x = -1$.`,
      R`Divido per $-3$: $x = \dfrac{-1}{-3} = \dfrac{1}{3}$.`,
      R`Verifica: primo membro $\dfrac{10/3}{4} - \dfrac{-5/3}{6} = \dfrac{5}{6} + \dfrac{5}{18} = \dfrac{10}{9}$; secondo membro $\dfrac{1}{9} + 1 = \dfrac{10}{9}$. ✓`
    ], risultato: R`$x = \dfrac{1}{3}$` },

    { titolo: 'Impossibile o indeterminata?', problema: R`Risolvi le due equazioni $3(x + 2) - 2x = x + 6$ e $2(x - 1) + 3 = 2x + 5$.`, passi: [
      R`Prima equazione. Tolgo la parentesi: $3x + 6 - 2x = x + 6$, cioè $x + 6 = x + 6$.`,
      R`Porto tutto a sinistra: le $x$ si cancellano e anche i numeri, resta $0 \cdot x = 0$.`,
      R`È vera per qualunque $x$: l'equazione è **indeterminata**, $S = \mathbb{R}$. Era un'identità travestita.`,
      R`Seconda equazione. Tolgo la parentesi: $2x - 2 + 3 = 2x + 5$, cioè $2x + 1 = 2x + 5$.`,
      R`Cancello $2x$ da entrambi i membri e porto l'$1$ a destra: resta $0 \cdot x = 4$.`,
      R`Nessun numero moltiplicato per $0$ dà $4$: l'equazione è **impossibile**, $S = \varnothing$.`
    ], risultato: R`La prima è indeterminata ($S = \mathbb{R}$), la seconda è impossibile ($S = \varnothing$)` },

    { titolo: 'Un\'equazione fratta', problema: R`Risolvi $\dfrac{3}{x - 1} - \dfrac{2}{x} = \dfrac{1}{x(x - 1)}$.`, passi: [
      R`L'incognita è nei denominatori: equazione fratta. Condizioni di esistenza: $x - 1 \ne 0$ e $x \ne 0$, cioè $x \ne 1$ e $x \ne 0$.`,
      R`Il mcm dei denominatori è $x(x - 1)$. Scrivo tutto con quel denominatore: $\dfrac{3x - 2(x - 1)}{x(x - 1)} = \dfrac{1}{x(x - 1)}$.`,
      R`Grazie alle c.e. il denominatore non è zero, quindi posso eliminarlo: $3x - 2(x - 1) = 1$.`,
      R`Tolgo la parentesi e riduco: $3x - 2x + 2 = 1$, cioè $x + 2 = 1$, da cui $x = -1$.`,
      R`Confronto con le c.e.: $-1$ è diverso da $0$ e da $1$, quindi è accettabile.`,
      R`Verifica: $\dfrac{3}{-2} - \dfrac{2}{-1} = -\dfrac{3}{2} + 2 = \dfrac{1}{2}$ e $\dfrac{1}{(-1)(-2)} = \dfrac{1}{2}$. ✓`
    ], risultato: R`$x = -1$` },

    { titolo: 'Un\'equazione letterale da discutere', problema: R`Risolvi e discuti $a^2 x - 1 = x + a$.`, passi: [
      R`Porto i termini con $x$ a sinistra e gli altri a destra: $a^2 x - x = a + 1$.`,
      R`Raccolgo l'incognita, così il coefficiente di $x$ è in vista: $(a^2 - 1)\,x = a + 1$.`,
      R`Scompongo il coefficiente: $a^2 - 1 = (a - 1)(a + 1)$, quindi $(a - 1)(a + 1)\,x = a + 1$. Il coefficiente si annulla per $a = 1$ e per $a = -1$: sono i valori da discutere a parte.`,
      R`Se $a \ne 1$ e $a \ne -1$ posso dividere: $x = \dfrac{a + 1}{(a - 1)(a + 1)} = \dfrac{1}{a - 1}$. Equazione determinata.`,
      R`Se $a = 1$: $0 \cdot x = 2$, impossibile. Se $a = -1$: $0 \cdot x = 0$, indeterminata.`,
      R`Controllo con $a = 2$: l'equazione è $4x - 1 = x + 2$, cioè $3x = 3$, $x = 1$, e infatti $\dfrac{1}{2 - 1} = 1$. ✓`
    ], risultato: R`$a \ne \pm 1$: $x = \dfrac{1}{a - 1}$; $a = 1$: impossibile; $a = -1$: indeterminata` },

    { titolo: 'Un problema', problema: R`Tre amici si dividono 120 €: il secondo riceve il doppio del primo e il terzo riceve 20 € più del primo. Quanto riceve ciascuno?`, passi: [
      R`**Incognita.** $x$ = euro ricevuti dal primo. Allora il secondo riceve $2x$ e il terzo $x + 20$.`,
      R`**Traduzione.** La somma delle tre parti è tutto il denaro: $x + 2x + (x + 20) = 120$.`,
      R`**Risoluzione.** $4x + 20 = 120$, quindi $4x = 100$ e $x = 25$.`,
      R`**Senso.** Le tre parti sono $25$, $50$ e $45$ euro: positive, la seconda è il doppio della prima, la terza supera la prima di $20$, e $25 + 50 + 45 = 120$. ✓`
    ], risultato: R`25 €, 50 € e 45 €` }
  ],

  formulario: [
    { nome: 'Forma normale', formula: R`ax = b`, nota: R`$a$ coefficiente dell'incognita, $b$ termine noto, dopo aver portato le $x$ a sinistra e i numeri a destra.` },
    { nome: 'Equazione determinata', formula: R`a \ne 0 \ \Rightarrow\ x = \frac{b}{a}`, nota: R`Una sola soluzione: $S = \left\{\dfrac{b}{a}\right\}$.` },
    { nome: 'Impossibile e indeterminata', formula: R`a = 0:\quad \begin{cases} b \ne 0 & \text{impossibile, } S = \varnothing \\ b = 0 & \text{indeterminata, } S = \mathbb{R} \end{cases}` },
    { nome: 'Primo principio di equivalenza', formula: R`A(x) = B(x) \iff A(x) + C = B(x) + C`, nota: R`$C$ è un numero o un'espressione intera nell'incognita.` },
    { nome: 'Secondo principio di equivalenza', formula: R`A(x) = B(x) \iff k \cdot A(x) = k \cdot B(x), \quad k \ne 0`, nota: R`Mai moltiplicare o dividere per zero, né per un'espressione che potrebbe valere zero.` },
    { nome: 'Regola del trasporto', formula: R`A + C = B \iff A = B - C`, nota: R`Il termine che cambia membro cambia segno.` },
    { nome: 'Regola di cancellazione', formula: R`A + C = B + C \iff A = B` },
    { nome: 'Eliminazione dei denominatori numerici', formula: R`\frac{A}{m} = \frac{B}{n} \iff nA = mB \qquad (m, n \ne 0)`, nota: R`In pratica si moltiplicano entrambi i membri per il mcm dei denominatori.` },
    { nome: 'Equazione fratta', formula: R`\frac{N(x)}{D(x)} = 0 \iff N(x) = 0 \ \land\ D(x) \ne 0`, nota: R`La seconda condizione sono le c.e.: le soluzioni che annullano $D(x)$ si scartano.` },
    { nome: 'Equazione letterale', formula: R`A(a)\,x = B(a)`, nota: R`Se $A(a) \ne 0$: $x = \dfrac{B(a)}{A(a)}$. Se $A(a) = 0$: impossibile quando $B(a) \ne 0$, indeterminata quando $B(a) = 0$.` },
    { nome: 'Zero della retta', formula: R`y = ax - b \ \Rightarrow\ y = 0 \text{ per } x = \frac{b}{a} \quad (a \ne 0)`, nota: R`La retta taglia l'asse $x$ nel punto $\left(\dfrac{b}{a};\,0\right)$; con $a = 0$ è orizzontale.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Che cos'è un'identità?`, retro: R`Un'uguaglianza vera per ogni valore delle lettere, come $2(x + 1) = 2x + 2$.` },
    { id: 'fc-02', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Che cos'è un'equazione?`, retro: R`Un'uguaglianza fra due espressioni, vera solo per certi valori dell'incognita (o per nessuno).` },
    { id: 'fc-03', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Soluzione di un'equazione`, retro: R`Un valore dell'incognita che rende vera l'uguaglianza. L'insieme di tutte le soluzioni si indica con $S$.` },
    { id: 'fc-04', sezione: 'identita-equazioni', tipo: 'concetto', fronte: R`Grado di un'equazione`, retro: R`L'esponente massimo con cui compare l'incognita, dopo aver svolto i calcoli. $3x - 5 = x + 1$ è di primo grado.` },
    { id: 'fc-05', sezione: 'identita-equazioni', tipo: 'definizione', fronte: R`Equazione intera o fratta?`, retro: R`Intera se l'incognita non compare in nessun denominatore, fratta se compare. $\dfrac{x}{2} = 3$ è intera, $\dfrac{2}{x} = 3$ è fratta.` },
    { id: 'fc-06', sezione: 'principi-equivalenza', tipo: 'definizione', fronte: R`Equazioni equivalenti`, retro: R`Equazioni che hanno lo stesso insieme delle soluzioni.` },
    { id: 'fc-07', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Primo principio di equivalenza`, retro: R`Aggiungendo o togliendo a entrambi i membri la stessa quantità si ottiene un'equazione equivalente.` },
    { id: 'fc-08', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Secondo principio di equivalenza`, retro: R`Moltiplicando o dividendo entrambi i membri per lo stesso numero **diverso da zero** si ottiene un'equazione equivalente.` },
    { id: 'fc-09', sezione: 'principi-equivalenza', tipo: 'procedura', fronte: R`Regola del trasporto`, retro: R`Un termine passa da un membro all'altro cambiando segno: $3x + 5 = 11 \Rightarrow 3x = 11 - 5$.` },
    { id: 'fc-10', sezione: 'principi-equivalenza', tipo: 'procedura', fronte: R`Regola di cancellazione`, retro: R`Termini uguali presenti in entrambi i membri si eliminano: $2x + 7 = x + 7 \Rightarrow 2x = x$.` },
    { id: 'fc-11', sezione: 'forma-normale', tipo: 'formula', fronte: R`Forma normale di un'equazione di primo grado`, retro: R`$ax = b$, con $a$ coefficiente dell'incognita e $b$ termine noto.` },
    { id: 'fc-12', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Quando $ax = b$ è determinata?`, retro: R`Se $a \ne 0$: l'unica soluzione è $x = \dfrac{b}{a}$.` },
    { id: 'fc-13', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Quando $ax = b$ è impossibile?`, retro: R`Se $a = 0$ e $b \ne 0$: $0 \cdot x = b$ non è vera per nessun $x$, quindi $S = \varnothing$.` },
    { id: 'fc-14', sezione: 'forma-normale', tipo: 'concetto', fronte: R`Quando $ax = b$ è indeterminata?`, retro: R`Se $a = 0$ e $b = 0$: $0 \cdot x = 0$ è vera per ogni $x$, quindi $S = \mathbb{R}$.` },
    { id: 'fc-15', sezione: 'frazioni-numeriche', tipo: 'procedura', fronte: R`Come si eliminano i denominatori numerici?`, retro: R`Si moltiplicano entrambi i membri per il mcm dei denominatori (secondo principio), senza dimenticare i termini senza frazione.` },
    { id: 'fc-16', sezione: 'frazioni-numeriche', tipo: 'concetto', fronte: R`Il segno meno davanti a una frazione`, retro: R`Vale per tutto il numeratore: $-\dfrac{x - 1}{3}$ moltiplicato per $6$ dà $-2(x - 1) = -2x + 2$.` },
    { id: 'fc-17', sezione: 'fratte', tipo: 'definizione', fronte: R`Condizioni di esistenza (c.e.)`, retro: R`I valori dell'incognita per cui ogni denominatore è diverso da zero. Si scrivono prima di risolvere.` },
    { id: 'fc-18', sezione: 'fratte', tipo: 'procedura', fronte: R`Passi per un'equazione fratta`, retro: R`1) C.e. 2) Denominatore comune. 3) Si eliminano i denominatori. 4) Si risolve e si scartano le soluzioni che violano le c.e.` },
    { id: 'fc-19', sezione: 'fratte', tipo: 'concetto', fronte: R`Che cosa si fa se la soluzione viola le c.e.?`, retro: R`Non è accettabile: si scarta. Se era l'unica, l'equazione è impossibile.` },
    { id: 'fc-20', sezione: 'letterali', tipo: 'definizione', fronte: R`Equazione letterale`, retro: R`Contiene, oltre all'incognita, altre lettere (parametri) che rappresentano numeri fissati ma non specificati.` },
    { id: 'fc-21', sezione: 'letterali', tipo: 'procedura', fronte: R`Discutere un'equazione letterale`, retro: R`Ridotta a $A\,x = B$: per i valori del parametro con $A = 0$ è impossibile o indeterminata; per gli altri $x = \dfrac{B}{A}$.` },
    { id: 'fc-22', sezione: 'problemi', tipo: 'procedura', fronte: R`Schema per risolvere un problema`, retro: R`1) Scegli l'incognita. 2) Traduci il testo in un'equazione. 3) Risolvi. 4) Controlla che la soluzione abbia senso nel problema.` },
    { id: 'fc-23', sezione: 'problemi', tipo: 'concetto', fronte: R`Perché controllare il senso della soluzione?`, retro: R`L'equazione non sa che $x$ è un'età o una lunghezza: un valore negativo o non intero può andare bene per l'equazione ma non per il problema.` },
    { id: 'fc-24', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Significato grafico della soluzione di $ax = b$`, retro: R`È l'ascissa del punto in cui la retta $y = ax - b$ taglia l'asse $x$: lo zero della retta.` },
    { id: 'fc-25', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Retta orizzontale ed equazione`, retro: R`Se $a = 0$ la retta $y = -b$ è orizzontale: non tocca l'asse $x$ (impossibile) oppure coincide con esso (indeterminata).` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Risolvi $x + 5 = 12$.`, suggerimenti: [R`Porta il $5$ a destra, cambiando segno.`], risposta: sol(7), soluzione: [R`Trasporto il $5$: $x = 12 - 5$.`, R`$x = 7$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Risolvi $3x = 18$.`, suggerimenti: [R`Dividi tutti e due i membri per $3$.`], risposta: sol(6), soluzione: [R`Divido per $3$: $x = \dfrac{18}{3}$.`, R`$x = 6$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Risolvi $x - 4 = -9$.`, suggerimenti: [R`Porta il $-4$ a destra: diventa $+4$.`], risposta: sol(-5), soluzione: [R`Trasporto il $-4$: $x = -9 + 4$.`, R`$x = -5$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Risolvi $-2x = 8$.`, suggerimenti: [R`Dividi per $-2$, segno compreso.`], risposta: sol(-4), soluzione: [R`Divido per $-2$: $x = \dfrac{8}{-2}$.`, R`$x = -4$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Risolvi $2x = 7$. Se il risultato non è intero, scrivi una frazione, come *5/2*.`, suggerimenti: [R`Dividi per $2$. Il risultato è una frazione.`], risposta: sol(7 / 2), soluzione: [R`Divido per $2$: $x = \dfrac{7}{2}$.`, R`La frazione non si semplifica. Vale $3{,}5$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Risolvi $2x + 3 = 11$.`, suggerimenti: [R`Prima porta il $3$ a destra, poi dividi.`], risposta: sol(4), soluzione: [R`Trasporto il $3$: $2x = 11 - 3$, cioè $2x = 8$.`, R`Divido per $2$: $x = 4$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Risolvi $5x - 4 = 3x + 6$.`, suggerimenti: [R`Porta le $x$ a sinistra e i numeri a destra.`], risposta: sol(5), soluzione: [R`Trasporto: $5x - 3x = 6 + 4$.`, R`$2x = 10$, quindi $x = 5$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Risolvi $7 - x = 10$.`, suggerimenti: [R`Porta il $7$ a destra. Poi cambia segno a tutti e due i membri.`], risposta: sol(-3), soluzione: [R`Trasporto il $7$: $-x = 10 - 7$, cioè $-x = 3$.`, R`Cambio segno a tutti e due i membri: $x = -3$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Risolvi $4x + 1 = 2x - 7$.`, suggerimenti: [R`Porta le $x$ a sinistra e i numeri a destra.`], risposta: sol(-4), soluzione: [R`Trasporto: $4x - 2x = -7 - 1$.`, R`$2x = -8$, quindi $x = -4$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Risolvi $3(x - 2) = 9$.`, suggerimenti: [R`Togli la parentesi: il $3$ moltiplica tutti e due i termini.`], risposta: sol(5), soluzione: [R`Tolgo la parentesi: $3x - 6 = 9$.`, R`$3x = 15$, quindi $x = 5$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Risolvi $2(x + 1) = 6x + 4$.`, suggerimenti: [R`Togli la parentesi, poi porta le $x$ a sinistra.`, R`Arrivi a $-4x = 2$.`], risposta: sol(-1 / 2), soluzione: [R`Tolgo la parentesi: $2x + 2 = 6x + 4$.`, R`Trasporto: $2x - 6x = 4 - 2$, cioè $-4x = 2$.`, R`Divido per $-4$: $x = -\dfrac{2}{4} = -\dfrac{1}{2}$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Risolvi $6x - 5 = 2x + 1$.`, suggerimenti: [R`Porta le $x$ a sinistra e i numeri a destra.`, R`Arrivi a $4x = 6$: semplifica la frazione.`], risposta: sol(3 / 2), soluzione: [R`Trasporto: $6x - 2x = 1 + 5$, cioè $4x = 6$.`, R`Divido per $4$: $x = \dfrac{6}{4} = \dfrac{3}{2}$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Risolvi $5 - 2(x - 1) = 1$.`, suggerimenti: [R`Il $-2$ moltiplica tutti e due i termini della parentesi.`, R`$-2 \cdot (-1) = +2$.`], risposta: sol(3), soluzione: [R`Tolgo la parentesi: $5 - 2x + 2 = 1$, cioè $7 - 2x = 1$.`, R`Trasporto il $7$: $-2x = 1 - 7 = -6$.`, R`Divido per $-2$: $x = 3$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Risolvi $3(x + 2) - 2(x - 1) = 10$.`, suggerimenti: [R`Togli le due parentesi. Attento al $-2$ davanti alla seconda.`], risposta: sol(2), soluzione: [R`Tolgo le parentesi: $3x + 6 - 2x + 2 = 10$.`, R`Sommo i termini simili: $x + 8 = 10$, quindi $x = 2$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Risolvi $2(x + 3) = 2x + 6$. Se non c'è una sola soluzione, scrivi *impossibile* o *indeterminata*.`, suggerimenti: [R`Togli la parentesi e confronta i due membri.`], risposta: INDETERMINATA, soluzione: [R`Tolgo la parentesi: $2x + 6 = 2x + 6$.`, R`Porto tutto a sinistra: $0 \cdot x = 0$.`, R`È vera per ogni $x$: l'equazione è **indeterminata**.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Risolvi $3x + 4 = 3(x + 1)$. Se non c'è una sola soluzione, scrivi *impossibile* o *indeterminata*.`, suggerimenti: [R`Togli la parentesi, poi porta le $x$ a sinistra.`], risposta: IMPOSSIBILE, soluzione: [R`Tolgo la parentesi: $3x + 4 = 3x + 3$.`, R`Trasporto: $3x - 3x = 3 - 4$, cioè $0 \cdot x = -1$.`, R`Nessun numero moltiplicato per $0$ dà $-1$: l'equazione è **impossibile**.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Risolvi $4(x - 1) - x = 2(x + 3)$. Se non c'è una sola soluzione, scrivi *impossibile* o *indeterminata*.`, suggerimenti: [R`Togli le parentesi e somma i termini simili.`], risposta: sol(10, SEGNA_CASI), soluzione: [R`Tolgo le parentesi: $4x - 4 - x = 2x + 6$, cioè $3x - 4 = 2x + 6$.`, R`Trasporto: $3x - 2x = 6 + 4$, quindi $x = 10$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Risolvi $5x - 2(x + 4) = 3(x - 1)$. Se non c'è una sola soluzione, scrivi *impossibile* o *indeterminata*.`, suggerimenti: [R`Togli le parentesi: il $-2$ cambia segno a tutti e due i termini.`], risposta: IMPOSSIBILE, soluzione: [R`Tolgo le parentesi: $5x - 2x - 8 = 3x - 3$, cioè $3x - 8 = 3x - 3$.`, R`Trasporto: $3x - 3x = -3 + 8$, cioè $0 \cdot x = 5$.`, R`Nessun numero moltiplicato per $0$ dà $5$: **impossibile**.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Risolvi $2(3x - 1) = 2x + 3$. Se non c'è una sola soluzione, scrivi *impossibile* o *indeterminata*.`, suggerimenti: [R`Togli la parentesi, poi porta le $x$ a sinistra.`], risposta: sol(5 / 4, SEGNA_CASI), soluzione: [R`Tolgo la parentesi: $6x - 2 = 2x + 3$.`, R`Trasporto: $6x - 2x = 3 + 2$, cioè $4x = 5$.`, R`Divido per $4$: $x = \dfrac{5}{4}$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Risolvi $3(x - 1) + 2(x + 2) = 5x + 1$. Se non c'è una sola soluzione, scrivi *impossibile* o *indeterminata*.`, suggerimenti: [R`Togli le parentesi e somma i termini simili a sinistra.`], risposta: INDETERMINATA, soluzione: [R`Tolgo le parentesi: $3x - 3 + 2x + 4 = 5x + 1$, cioè $5x + 1 = 5x + 1$.`, R`Porto tutto a sinistra: $0 \cdot x = 0$.`, R`È vera per ogni $x$: l'equazione è **indeterminata**.`] },
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $5x - 3 = 2x + 9$.`, suggerimenti: [R`Porta i termini con $x$ a sinistra e i numeri a destra, cambiando segno a quello che sposti.`, R`Dovresti arrivare a $3x = 12$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001 }, soluzione: [R`Trasporto: $5x - 2x = 9 + 3$, cioè $3x = 12$.`, R`Divido entrambi i membri per $3$: $x = 4$.`, R`Verifica: $20 - 3 = 17$ e $8 + 9 = 17$. ✓`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $4(x - 2) = 3x - 5$.`, suggerimenti: [R`Svolgi prima la parentesi.`, R`$4x - 8 = 3x - 5$: ora trasporta.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`$4x - 8 = 3x - 5$.`, R`$4x - 3x = -5 + 8$, cioè $x = 3$.`, R`Verifica: $4 \cdot 1 = 4$ e $9 - 5 = 4$. ✓`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi $\dfrac{x}{3} + 2 = \dfrac{x}{2}$.`, suggerimenti: [R`Il mcm dei denominatori è $6$: moltiplica tutti i termini per $6$, anche il $2$.`, R`$2x + 12 = 3x$.`], risposta: { tipo: 'numero', valore: 12, tolleranza: 0.001 }, soluzione: [R`mcm $= 6$: $\dfrac{2x + 12}{6} = \dfrac{3x}{6}$, quindi $2x + 12 = 3x$.`, R`$2x - 3x = -12$, cioè $-x = -12$ e $x = 12$.`, R`Verifica: $4 + 2 = 6$ e $\dfrac{12}{2} = 6$. ✓`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $2(x + 1) - 3(x - 2) = 8 - x$. Se non è determinata, scrivi «impossibile» o «indeterminata».`, suggerimenti: [R`Svolgi le parentesi con attenzione al $-3$ che moltiplica $(x - 2)$.`, R`Il primo membro diventa $-x + 8$. Confrontalo con il secondo.`], risposta: { tipo: 'testo', accettate: ['indeterminata', 'identita', 'identità', 'infinite soluzioni', 'tutti i numeri reali', 'ogni x', 'ogni numero', 'r', 's=r', 's=ℝ', 'ℝ'] }, soluzione: [R`$2x + 2 - 3x + 6 = 8 - x$, cioè $-x + 8 = 8 - x$.`, R`Porto tutto a sinistra: $-x + x + 8 - 8 = 0$, cioè $0 \cdot x = 0$.`, R`È vera per ogni $x$: equazione **indeterminata**, $S = \mathbb{R}$ (era un'identità).`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi $\dfrac{2x - 1}{3} - \dfrac{x}{4} = \dfrac{x + 2}{6}$.`, suggerimenti: [R`Il mcm di $3$, $4$ e $6$ è $12$.`, R`Dopo aver eliminato i denominatori: $4(2x - 1) - 3x = 2(x + 2)$.`], risposta: { tipo: 'numero', valore: 2.6667, tolleranza: 0.01 }, soluzione: [R`Denominatore comune $12$: $4(2x - 1) - 3x = 2(x + 2)$.`, R`$8x - 4 - 3x = 2x + 4$, cioè $5x - 2x = 4 + 4$ e $3x = 8$.`, R`$x = \dfrac{8}{3}$. Verifica: $\dfrac{13/3}{3} - \dfrac{2}{3} = \dfrac{13}{9} - \dfrac{6}{9} = \dfrac{7}{9}$ e $\dfrac{14/3}{6} = \dfrac{7}{9}$. ✓`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $\dfrac{x + 3}{x - 2} = 2$.`, suggerimenti: [R`Prima la c.e.: il denominatore non può valere zero.`, R`Moltiplica entrambi i membri per $x - 2$: $x + 3 = 2(x - 2)$.`], risposta: { tipo: 'numero', valore: 7, tolleranza: 0.001 }, soluzione: [R`C.e.: $x \ne 2$.`, R`$x + 3 = 2x - 4$, quindi $x - 2x = -4 - 3$, $-x = -7$, $x = 7$.`, R`$7 \ne 2$: accettabile. Verifica: $\dfrac{10}{5} = 2$. ✓`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\dfrac{3}{x - 2} = \dfrac{5}{2 - x} + 4$.`, suggerimenti: [R`$2 - x = -(x - 2)$: riscrivi la seconda frazione con denominatore $x - 2$.`, R`C.e. $x \ne 2$; poi l'equazione diventa $\dfrac{3}{x - 2} + \dfrac{5}{x - 2} = 4$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001 }, soluzione: [R`C.e.: $x \ne 2$. Poiché $\dfrac{5}{2 - x} = -\dfrac{5}{x - 2}$, l'equazione diventa $\dfrac{3}{x - 2} + \dfrac{5}{x - 2} = 4$, cioè $\dfrac{8}{x - 2} = 4$.`, R`Moltiplico per $x - 2$: $8 = 4x - 8$, quindi $4x = 16$ e $x = 4$.`, R`$4 \ne 2$: accettabile. Verifica: $\dfrac{3}{2} = 1{,}5$ e $\dfrac{5}{-2} + 4 = 1{,}5$. ✓`] },
    { id: 'es-08', difficolta: 3, testo: R`Risolvi $\dfrac{x}{x - 1} - \dfrac{2}{x + 1} = \dfrac{x^2 + 3}{x^2 - 1}$. Se non ha soluzioni, scrivi «impossibile».`, suggerimenti: [R`Scomponi $x^2 - 1 = (x - 1)(x + 1)$ prima di scrivere le c.e.`, R`Denominatore comune $(x - 1)(x + 1)$: $x(x + 1) - 2(x - 1) = x^2 + 3$.`, R`I termini $x^2$ si cancellano. Confronta la soluzione con le c.e.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna', 'nessuna soluzione', 'non ha soluzioni', 'insieme vuoto', 's=∅', '∅'] }, soluzione: [R`$x^2 - 1 = (x - 1)(x + 1)$. C.e.: $x \ne 1$ e $x \ne -1$.`, R`Denominatore comune $(x - 1)(x + 1)$: $x(x + 1) - 2(x - 1) = x^2 + 3$.`, R`$x^2 + x - 2x + 2 = x^2 + 3$, cioè $-x + 2 = 3$ e $x = -1$.`, R`Ma $x = -1$ viola le c.e.: va scartata. L'equazione è **impossibile**, $S = \varnothing$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi e discuti l'equazione letterale $(a - 1)\,x = a^2 - 1$.`, suggerimenti: [R`Il coefficiente di $x$ è $a - 1$: per quale valore di $a$ vale zero?`, R`Se $a \ne 1$ puoi dividere; ricorda che $a^2 - 1 = (a - 1)(a + 1)$.`, R`Se $a = 1$ sostituisci e guarda che cosa resta dell'equazione.`], soluzione: [R`Il coefficiente $a - 1$ si annulla per $a = 1$: quel valore va discusso a parte.`, R`$a \ne 1$: $x = \dfrac{a^2 - 1}{a - 1} = \dfrac{(a - 1)(a + 1)}{a - 1} = a + 1$. Equazione determinata.`, R`$a = 1$: $0 \cdot x = 0$, indeterminata: ogni $x$ è soluzione.`, R`Controllo con $a = 3$: $2x = 8$, $x = 4 = 3 + 1$. ✓`] },
    { id: 'es-10', difficolta: 2, testo: R`Il perimetro di un rettangolo è $46\ \text{cm}$ e la base supera l'altezza di $5\ \text{cm}$. Trova base e altezza.`, suggerimenti: [R`Chiama $x$ l'altezza: la base è $x + 5$.`, R`Il perimetro è il doppio della somma di base e altezza: $2(x + x + 5) = 46$.`], risposta: { tipo: 'numeri', valori: [9, 14] }, soluzione: [R`Altezza $x$, base $x + 5$. Perimetro: $2(x + x + 5) = 46$.`, R`$2(2x + 5) = 46$, cioè $4x + 10 = 46$, $4x = 36$, $x = 9$.`, R`Altezza $9\ \text{cm}$, base $14\ \text{cm}$. Senso: lunghezze positive, e $2(9 + 14) = 46$. ✓`] },
    { id: 'es-11', difficolta: 3, testo: R`Un padre ha $42$ anni e il figlio $12$. Fra quanti anni l'età del padre sarà il triplo di quella del figlio?`, suggerimenti: [R`Chiama $x$ gli anni che devono passare: fra $x$ anni il padre avrà $42 + x$ anni e il figlio $12 + x$.`, R`Traduci «sarà il triplo»: $42 + x = 3(12 + x)$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`Fra $x$ anni: padre $42 + x$, figlio $12 + x$. Condizione: $42 + x = 3(12 + x)$.`, R`$42 + x = 36 + 3x$, quindi $42 - 36 = 3x - x$, $6 = 2x$, $x = 3$.`, R`Senso: fra $3$ anni il padre avrà $45$ anni e il figlio $15$, e $45 = 3 \cdot 15$. ✓`] },
    { id: 'es-12', difficolta: 3, testo: R`Trova un numero naturale tale che il suo triplo diminuito di $7$ sia uguale al suo doppio diminuito di $10$. Se non esiste, scrivi «nessuno».`, suggerimenti: [R`Chiama $n$ il numero: $3n - 7 = 2n - 10$.`, R`Risolvi, poi chiediti se il valore trovato è davvero un numero naturale.`], risposta: { tipo: 'testo', accettate: ['nessuno', 'non esiste', 'nessun numero', 'impossibile', 'nessuna soluzione', 'nessuna'] }, soluzione: [R`$3n - 7 = 2n - 10$, quindi $3n - 2n = -10 + 7$ e $n = -3$.`, R`L'equazione è determinata, ma $-3$ non è un numero naturale: la soluzione non ha senso nel problema.`, R`Nessun numero naturale soddisfa la richiesta. Se il testo avesse detto «un numero intero», la risposta sarebbe stata $-3$: infatti $-9 - 7 = -16$ e $-6 - 10 = -16$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale delle seguenti uguaglianze è un'identità?`, opzioni: [R`$3x + 1 = 7$`, R`$(x + 1)^2 = x^2 + 2x + 1$`, R`$x + 2 = 2x$`, R`$2x = 0$`], corretta: 1, spiegazione: R`Il quadrato di binomio è vero per ogni $x$: è un'identità. Le altre sono equazioni, vere solo per un valore: $x = 2$, $x = 2$ e $x = 0$ rispettivamente.` },
    { id: 'q-02', domanda: R`Due equazioni si dicono equivalenti se…`, opzioni: [R`hanno lo stesso grado`, R`hanno gli stessi coefficienti`, R`hanno lo stesso termine noto`, R`hanno lo stesso insieme delle soluzioni`], corretta: 3, spiegazione: R`Conta solo l'insieme delle soluzioni: $2x = 6$ e $x - 3 = 0$ sono equivalenti pur avendo coefficienti e termini noti diversi.` },
    { id: 'q-03', domanda: R`Per quale principio $5x - 3 = 12$ diventa $5x = 15$?`, opzioni: [R`Secondo principio: si è moltiplicato per $5$`, R`Primo principio: si è aggiunto $3$ a entrambi i membri`, R`Regola di cancellazione`, R`Nessuno: è un passaggio errato`], corretta: 1, spiegazione: R`Aggiungere $3$ a entrambi i membri è il primo principio; la regola del trasporto ne è la versione pratica. Il secondo principio riguarda moltiplicazioni e divisioni.` },
    { id: 'q-04', domanda: R`Per quale numero NON è lecito moltiplicare entrambi i membri di un'equazione?`, opzioni: [R`$0$`, R`$-1$`, R`$\dfrac{1}{2}$`, R`$10$`], corretta: 0, spiegazione: R`Moltiplicando per $0$ ogni equazione diventa $0 = 0$, vera per ogni $x$: si perde ogni informazione. Il secondo principio richiede un fattore diverso da zero; $-1$, $\dfrac{1}{2}$ e $10$ vanno benissimo.` },
    { id: 'q-05', domanda: R`L'equazione $0 \cdot x = 5$ è…`, opzioni: [R`determinata, con $x = 5$`, R`determinata, con $x = 0$`, R`indeterminata`, R`impossibile`], corretta: 3, spiegazione: R`Zero per qualunque numero dà zero, mai $5$: nessun $x$ la rende vera, $S = \varnothing$. Non si può "dividere per zero" per ottenere $x = 5$.` },
    { id: 'q-06', domanda: R`L'equazione $0 \cdot x = 0$ è…`, opzioni: [R`impossibile`, R`determinata, con $x = 0$`, R`indeterminata`, R`non è un'equazione`], corretta: 2, spiegazione: R`È vera per ogni $x$: $S = \mathbb{R}$, equazione indeterminata (un'identità). $x = 0$ è soluzione, ma non l'unica.` },
    { id: 'q-07', domanda: R`Se $a \ne 0$, l'equazione $ax = b$…`, opzioni: [R`ha soluzione $x = \dfrac{a}{b}$`, R`ha due soluzioni`, R`è indeterminata`, R`ha una sola soluzione, $x = \dfrac{b}{a}$`], corretta: 3, spiegazione: R`Dividendo entrambi i membri per $a$ (lecito perché $a \ne 0$) si ottiene $x = \dfrac{b}{a}$: una sola soluzione. Attenzione a non invertire la frazione.` },
    { id: 'q-08', domanda: R`L'equazione $\dfrac{x}{3} - 2 = \dfrac{x + 1}{5}$ è…`, opzioni: [R`fratta`, R`intera`, R`letterale`, R`impossibile`], corretta: 1, spiegazione: R`I denominatori sono numeri, non contengono l'incognita: l'equazione è numerica intera. Si risolve moltiplicando per il mcm $15$ (e viene $x = 16{,}5$).` },
    { id: 'q-09', domanda: R`Che cosa sono le condizioni di esistenza di un'equazione fratta?`, opzioni: [R`I valori dell'incognita per cui tutti i denominatori sono diversi da zero`, R`I valori che annullano i numeratori`, R`Le soluzioni dell'equazione`, R`I valori per cui l'equazione è determinata`], corretta: 0, spiegazione: R`Le c.e. escludono i valori che annullano un denominatore, perché lì la frazione non ha significato. Non c'entrano con i numeratori né con le soluzioni, che vanno trovate dopo.` },
    { id: 'q-10', domanda: R`Risolvendo un'equazione fratta con c.e. $x \ne 2$ si trova come unico valore $x = 2$. Che cosa si conclude?`, opzioni: [R`L'equazione è impossibile`, R`$x = 2$ è la soluzione`, R`L'equazione è indeterminata`, R`Va rifatto il calcolo senza le c.e.`], corretta: 0, spiegazione: R`Il valore trovato viola le c.e. e si scarta: non resta nessuna soluzione, quindi $S = \varnothing$. Le c.e. non si tolgono per far tornare i conti.` },
    { id: 'q-11', domanda: R`Le condizioni di esistenza di $\dfrac{1}{x^2 - 9} = \dfrac{x}{x + 3}$ sono…`, opzioni: [R`$x \ne 9$`, R`$x \ne -3$`, R`$x \ne 3$ e $x \ne -3$`, R`$x \ne 0$`], corretta: 2, spiegazione: R`$x^2 - 9 = (x - 3)(x + 3)$ si annulla per $x = 3$ e $x = -3$; il secondo denominatore aggiunge di nuovo $x \ne -3$. Il numeratore $x$ non impone nulla.` },
    { id: 'q-12', domanda: R`In un'equazione letterale, il parametro è…`, opzioni: [R`l'incognita`, R`una seconda incognita da trovare`, R`il termine noto`, R`una lettera che rappresenta un numero fissato ma non specificato`], corretta: 3, spiegazione: R`Il parametro non si "trova": si suppone noto, e la soluzione viene espressa in funzione di esso. La discussione serve per i valori del parametro che annullano il coefficiente di $x$.` },
    { id: 'q-13', domanda: R`Nell'equazione $(k - 3)\,x = k - 3$, per $k = 3$ l'equazione è…`, opzioni: [R`determinata, con $x = 1$`, R`impossibile`, R`indeterminata`, R`determinata, con $x = 3$`], corretta: 2, spiegazione: R`Con $k = 3$ diventa $0 \cdot x = 0$: vera per ogni $x$, indeterminata. Per ogni altro $k$ si può dividere per $k - 3$ e si ottiene $x = 1$.` },
    { id: 'q-14', domanda: R`In un problema $x$ è un numero di persone e l'equazione dà $x = 7{,}5$. Che cosa si conclude?`, opzioni: [R`La soluzione non ha senso: si rilegge la traduzione, oppure il problema non ha soluzione`, R`Ci sono 7 persone`, R`Ci sono 8 persone`, R`L'equazione è impossibile`], corretta: 0, spiegazione: R`L'equazione è determinata, ma il valore non è accettabile per il problema: non si arrotonda, si controlla la traduzione o si conclude che con quei dati non esiste una soluzione.` },
    { id: 'q-15', domanda: R`Graficamente, la soluzione di $2x - 4 = 0$ è…`, opzioni: [R`l'ordinata in cui la retta $y = 2x - 4$ taglia l'asse $y$`, R`l'ascissa del punto in cui la retta $y = 2x - 4$ taglia l'asse $x$`, R`la pendenza della retta`, R`il punto $(0;\,-4)$`], corretta: 1, spiegazione: R`Risolvere $2x - 4 = 0$ è chiedere dove $y$ vale zero, cioè dove la retta attraversa l'asse $x$: in $x = 2$. Il punto $(0;\,-4)$ è l'intersezione con l'asse $y$.` },
    { id: 'q-16', domanda: R`Che cosa succede a un termine spostato da un membro all'altro?`, opzioni: [R`Cambia segno`, R`Resta uguale`, R`Viene diviso per il coefficiente di $x$`, R`Tutta l'equazione viene moltiplicata per $-1$`], corretta: 0, spiegazione: R`Trasportare un termine equivale a sottrarlo (o aggiungerlo) a entrambi i membri: il termine compare dall'altra parte con il segno opposto, e tutto il resto resta com'è.` },
    { id: 'q-17', domanda: R`Un'equazione di primo grado determinata ha…`, opzioni: [R`nessuna soluzione`, R`due soluzioni`, R`infinite soluzioni`, R`esattamente una soluzione`], corretta: 3, spiegazione: R`Determinata significa $a \ne 0$ e quindi un'unica soluzione $x = \dfrac{b}{a}$. Nessuna soluzione è il caso impossibile, infinite quello indeterminato; due soluzioni possono averle le equazioni di secondo grado.` },
    { id: 'q-18', domanda: R`Da $3x = 5x$, dividendo entrambi i membri per $x$, si ottiene $3 = 5$: "impossibile". Dov'è l'errore?`, opzioni: [R`Nessun errore: l'equazione è davvero impossibile`, R`Si è diviso per $x$, che può valere zero: infatti la soluzione è $x = 0$`, R`Bisognava dividere per $3$`, R`L'equazione è indeterminata`], corretta: 1, spiegazione: R`Il secondo principio permette di dividere solo per un numero diverso da zero. Trasportando, $3x - 5x = 0$ dà $-2x = 0$, cioè $x = 0$: l'equazione è determinata e la divisione per $x$ ha cancellato proprio la soluzione.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Ordine di lavoro: prima le parentesi, poi i denominatori, poi il trasporto (termini con $x$ a sinistra, numeri a destra). Solo alla fine si divide per il coefficiente di $x$.` },
    { tipo: 'errore', testo: R`Trasportare cambia il segno **solo** al termine che si sposta. $3x + 5 = 11$ diventa $3x = 11 - 5$, non $-3x = 11 - 5$.` },
    { tipo: 'errore', testo: R`Il meno davanti a una frazione vale per tutto il numeratore: dopo aver moltiplicato per il mcm, tieni il numeratore tra parentesi e svolgile nel passaggio dopo.` },
    { tipo: 'trucco', testo: R`Verifica sempre sostituendo nell'equazione *di partenza*, non nell'ultima riga: solo così scopri gli errori fatti a metà strada.` },
    { tipo: 'metodo', testo: R`Nelle fratte le c.e. si scrivono per prime, prima ancora di toccare l'equazione. E alla fine si rileggono: una soluzione che le viola si scarta.` },
    { tipo: 'errore', testo: R`Se sparisce la $x$ e resta $0 = 4$, non hai sbagliato: l'equazione è impossibile. Se resta $0 = 0$ è indeterminata. Non scrivere mai $x = \dfrac{4}{0}$.` },
    { tipo: 'metodo', testo: R`Equazione letterale: riducila a $A\,x = B$, poi chiediti per quali valori del parametro $A$ vale zero. La discussione è tutta lì.` },
    { tipo: 'trucco', testo: R`Nei problemi scegli come incognita la grandezza più piccola, o quella da cui si ricavano le altre: le espressioni vengono senza frazioni.` },
    { tipo: 'trucco', testo: R`Cambiare segno a tutti i termini è lecito (si moltiplica per $-1$): $-x = -7$ diventa $x = 7$, e $-3x = 12$ diventa $3x = -12$.` }
  ],

  aneddoti: [
    { matematico: 'Ahmes', anni: 'circa 1550 a.C.', titolo: 'Il mucchio e il suo settimo', testo: R`Il più antico manuale di matematica che possediamo è un rotolo di papiro lungo cinque metri, comprato a Luxor nel 1858 dall'antiquario scozzese Alexander Henry Rhind e oggi al British Museum. Lo scrisse uno scriba di nome Ahmes, copiandolo da un testo di due secoli prima. Fra i suoi 84 problemi ce n'è uno che suona così: «un mucchio e il suo settimo, messi insieme, fanno 19: quanto vale il mucchio?». L'incognita si chiamava *aha*, "mucchio", e non c'erano simboli: Ahmes prova con 7, ottiene $7 + 1 = 8$ invece di $19$, e corregge moltiplicando il tentativo per $19 : 8$. Il risultato, $16 + \frac{1}{2} + \frac{1}{8}$, è scritto con le frazioni unitarie care agli egizi. Il metodo si chiama *falsa posizione*, e ha funzionato per tremila anni.`, legame: R`Il problema del mucchio è l'equazione $x + \dfrac{x}{7} = 19$: in forma normale $\dfrac{8}{7}x = 19$, e infatti $x = \dfrac{133}{8}$.` },
    { matematico: 'Diofanto di Alessandria', anni: 'III secolo d.C.', titolo: 'Un epitaffio che si risolve', testo: R`Di Diofanto, autore dell'*Arithmetica* e primo a usare un simbolo per l'incognita, non sappiamo quasi nulla: nemmeno il secolo è sicuro. In compenso l'Antologia greca conserva un epigramma, forse scritto molto dopo, che si presenta come il suo epitaffio. Dice che fu fanciullo per un sesto della vita, che la barba gli crebbe dopo un altro dodicesimo, che si sposò dopo un ulteriore settimo, che cinque anni dopo ebbe un figlio, che il figlio visse la metà degli anni del padre, e che il padre morì quattro anni dopo di lui. Chi vuole sapere quanto visse Diofanto deve scrivere $\dfrac{x}{6} + \dfrac{x}{12} + \dfrac{x}{7} + 5 + \dfrac{x}{2} + 4 = x$ e risolvere: viene $84$. Nel margine di una copia dell'*Arithmetica*, quattordici secoli dopo, Fermat avrebbe scritto la sua nota più famosa.`, legame: R`L'epitaffio è un'equazione di primo grado con frazioni numeriche: il mcm dei denominatori è $84$, ed è anche la soluzione.` },
    { matematico: 'Al-Khwarizmi', anni: '780–850 circa', titolo: 'Trasporto e cancellazione hanno un nome arabo', testo: R`Nella Bagdad del califfo al-Ma'mun, alla Casa della Sapienza, Muhammad ibn Musa al-Khwarizmi scrisse intorno all'820 il *Kitab al-jabr wa l-muqabala*, «libro della ricomposizione e del confronto». Le due parole del titolo sono le nostre due regole pratiche: *al-jabr* è togliere un termine sottratto da un membro aggiungendolo all'altro, cioè il trasporto; *al-muqabala* è eliminare i termini uguali che compaiono da entrambe le parti, cioè la cancellazione. *Al-jabr* voleva dire anche rimettere a posto un osso rotto: in Spagna l'*algebrista* era per secoli il conciaossa, e nel *Don Chisciotte* è un algebrista a curare il baccelliere Sansone Carrasco dopo una caduta. Dal titolo del libro viene la parola **algebra**; dalla latinizzazione del nome dell'autore, *Algoritmi*, la parola **algoritmo**.`, legame: R`Le regole del trasporto e della cancellazione, che usiamo a ogni riga, sono le due operazioni del titolo del suo libro.` },
    { matematico: 'Robert Recorde', anni: '1512 circa–1558', titolo: 'Due linee parallele: nasce il segno uguale', testo: R`Fino al Cinquecento un'equazione si scriveva a parole: «è uguale a», o in latino *aequales*, ripetuto a ogni riga. Nel 1557 il medico e matematico gallese Robert Recorde, nel manuale di algebra *The Whetstone of Witte*, si stancò di quella ripetizione e propose di usare una coppia di segmenti paralleli della stessa lunghezza, perché, spiegò, non esistono due cose più uguali di due rette parallele. Il suo segno era molto più lungo del nostro, e per oltre un secolo fece fatica a imporsi: Descartes, nel 1637, ne usava ancora uno diverso. Recorde non vide la fortuna della sua idea: l'anno dopo, perduta una causa per diffamazione contro un potente conte, morì in una prigione per debitori di Londra.`, legame: R`Ogni equazione comincia da un segno $=$: l'idea che i due membri siano due cose "ugualmente lunghe" è la stessa immagine della bilancia.` },
    { matematico: 'François Viète', anni: '1540–1603', titolo: 'Una lettera anche per i numeri noti', testo: R`Viète era un avvocato e consigliere del re di Francia, e nel tempo libero decifrava per Enrico IV i dispacci segreti degli spagnoli: il re Filippo II, convinto che il suo codice fosse inviolabile, si lamentò con il papa che i francesi usassero la magia nera. Nel 1591, nell'*Isagoge*, Viète fece una cosa che oggi sembra ovvia e allora non lo era: usò le lettere non solo per l'incognita, ma anche per i numeri noti, con le vocali per le quantità cercate e le consonanti per quelle date. Prima di lui ogni equazione era un problema con numeri specifici, da rifare da capo ogni volta; dopo, si poteva scrivere una volta per tutte «$ax = b$» e risolvere tutte le equazioni insieme. Descartes, nel 1637, sistemò la convenzione che usiamo ancora: $x$, $y$, $z$ per le incognite, $a$, $b$, $c$ per i numeri noti.`, legame: R`La forma normale $ax = b$ e le equazioni letterali con il loro parametro esistono perché Viète diede una lettera anche ai coefficienti.` }
  ]
});
})();
