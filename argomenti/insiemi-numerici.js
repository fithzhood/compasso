(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'insiemi-numerici',
  titolo: 'Insiemi numerici e potenze',

  introduzione: R`Per contare le pecore di un gregge bastano $0, 1, 2, 3, \dots$ Per scrivere un debito servono i numeri negativi. Per dividere una pizza in tre servono le frazioni. E la diagonale di un quadrato di lato $1$ non è nemmeno una frazione. Ogni volta che i numeri che hai non bastano più, se ne aggiunge un tipo nuovo.

Così nasce una catena di insiemi, ognuno dentro il successivo: $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$ (naturali, interi, razionali, reali). Il simbolo $\subset$ si legge «è contenuto in».

Nello stesso argomento trovi gli strumenti per lavorare con questi numeri: le **potenze** (un modo corto di scrivere prodotti ripetuti), la **notazione scientifica** (per i numeri enormi o piccolissimi), il **valore assoluto** (la distanza da zero) e la scomposizione in **fattori primi**, con MCD e mcm. Bastano le operazioni delle medie; tutta l'algebra del liceo si appoggia su queste basi.`,

  inBreve: [
    R`Ogni insieme nuovo nasce perché nel precedente un'equazione non aveva soluzione: $x + 5 = 3$ chiede i negativi, $2x = 3$ chiede le frazioni.`,
    R`Un numero si classifica nel **più piccolo** insieme che lo contiene: $\dfrac{6}{2} = 3$ è un intero, anche se è scritto come frazione.`,
    R`I decimali limitati e periodici sono frazioni, quindi razionali; un decimale infinito senza periodo, come $\sqrt{2}$ o $\pi$, è irrazionale.`,
    R`Nelle proprietà delle potenze serve la **stessa base**: nel prodotto gli esponenti si sommano, nella potenza di potenza si moltiplicano. E $a^{-n} = \dfrac{1}{a^n}$, con $a \ne 0$.`,
    R`$|x|$ è la distanza di $x$ da zero, quindi non è mai negativo; $|a - b|$ è la distanza fra $a$ e $b$.`,
    R`MCD: fattori primi comuni con l'esponente più piccolo. mcm: tutti i fattori con l'esponente più grande.`
  ],

  sezioni: [
    { id: 'insiemi-n-z-q', titolo: 'Naturali, interi, razionali', testo: R`Quanto fa $3 - 5$? Con i numeri per contare non si può fare: non esiste un numero di pecore che, aggiunto a $5$, dia $3$.

I **numeri naturali** $\mathbb{N} = \{0, 1, 2, 3, \dots\}$ sono quelli con cui si conta. Non ci sono naturali negativi, né naturali «in mezzo» fra $3$ e $4$. Per questo l'equazione $x + 5 = 3$ in $\mathbb{N}$ non ha soluzione.

Si aggiungono allora gli opposti dei naturali e si ottengono i **numeri interi** $\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}$. Con gli interi la sottrazione si fa sempre: $3 - 5 = -2$.

Anche gli interi hanno un limite: $2x = 3$ non ha soluzione, perché nessun intero moltiplicato per $2$ dà $3$. Servono i **numeri razionali**, cioè le frazioni:

$$\mathbb{Q} = \left\{ \frac{m}{n} \ \middle|\ m, n \in \mathbb{Z},\ n \ne 0 \right\}$$

Si legge: tutti i numeri $\dfrac{m}{n}$ con $m$ e $n$ interi e $n$ diverso da zero. Con i razionali si può sempre dividere, tranne per $0$.

| insieme | che cosa aggiunge | equazione che risolve |
|---|---|---|
| $\mathbb{N}$ | i numeri per contare | $x + 3 = 5$ |
| $\mathbb{Z}$ | i negativi | $x + 5 = 3$ |
| $\mathbb{Q}$ | le frazioni | $2x = 3$ |

Ogni intero è anche razionale: $5 = \dfrac{5}{1}$. Per questo si scrive $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q}$.

>* Un numero si classifica nel **più piccolo** insieme che lo contiene, guardando il numero e non come è scritto: $\dfrac{6}{2}$ è scritto come frazione, ma vale $3$, quindi è un intero.

?? Qual è il più piccolo insieme che contiene $-\dfrac{12}{4}$?
[ ] $\mathbb{N}$
[x] $\mathbb{Z}$
[ ] $\mathbb{Q}$
[ ] $\mathbb{R}$
=> $-\dfrac{12}{4} = -3$: è un intero negativo, quindi sta in $\mathbb{Z}$ (e di conseguenza anche in $\mathbb{Q}$ e $\mathbb{R}$). Rispondere $\mathbb{Q}$ perché «c'è una frazione» è l'errore tipico: prima si semplifica, poi si classifica. Non è in $\mathbb{N}$ perché è negativo.

>! «Intero» non vuol dire «positivo»: $-8$ è un intero a tutti gli effetti. Sono i **naturali** a escludere i negativi.` },

    { id: 'numeri-reali', titolo: 'I numeri reali e la retta', testo: R`Disegna un quadrato di lato $1$. La sua diagonale ha una lunghezza precisa: per il teorema di Pitagora è il numero che al quadrato fa $2$, cioè $\sqrt{2}$. Eppure nessuna frazione, elevata al quadrato, dà esattamente $2$ (la dimostrazione è nella sezione sui numeri irrazionali).

I numeri come $\sqrt{2}$, che non si possono scrivere come frazione, si chiamano **irrazionali**. Razionali e irrazionali, messi insieme, formano i **numeri reali** $\mathbb{R}$.

>* $\mathbb{R}$ = razionali + irrazionali. La catena completa è $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$.

Su una retta fissi un punto $O$ (l'origine, che corrisponde a $0$), un verso e un'unità di misura. A ogni numero reale corrisponde allora uno e un solo punto, e a ogni punto un solo numero: per questo si parla di **retta reale**. I negativi stanno a sinistra di $O$, i positivi a destra.

Sulla retta razionali e irrazionali sono mescolati fittissimi: fra due numeri qualsiasi ce ne sono infiniti dell'uno e dell'altro tipo.

?? Quale di questi numeri **non** è razionale?
[ ] $0{,}\overline{3}$
[ ] $\sqrt{9}$
[x] $\sqrt{8}$
[ ] $-\dfrac{5}{7}$
=> $8$ non è un quadrato perfetto ($2^2 = 4$, $3^2 = 9$), quindi $\sqrt{8}$ è irrazionale. Attenzione a $\sqrt{9}$: il simbolo di radice non basta a renderlo irrazionale, perché $\sqrt{9} = 3$. E $0{,}\overline{3} = \dfrac{1}{3}$ è una frazione.

Più avanti, per risolvere $x^2 = -1$ (nessun reale al quadrato dà un negativo), si userà un insieme ancora più grande, i **numeri complessi** $\mathbb{C}$.

>! «Reale» non vuol dire «razionale». $\pi$ e $\sqrt{2}$ sono numeri reali a pieno titolo: semplicemente non sono frazioni.` },

    { id: 'frazioni-decimali', titolo: 'Frazioni e numeri decimali', testo: R`Se dividi il numeratore per il denominatore, una frazione diventa un numero decimale. Può succedere una di due cose.

- Il decimale è **limitato**: ha un numero finito di cifre dopo la virgola, come $\dfrac{3}{8} = 0{,}375$.
- Il decimale è **periodico**: da un certo punto in poi un blocco di cifre, il **periodo**, si ripete per sempre. Si scrive con una lineetta sopra: $\dfrac{1}{3} = 0{,}333\dots = 0{,}\overline{3}$.

Un periodico è **semplice** se il periodo parte subito dopo la virgola ($0{,}\overline{3}$), **misto** se prima c'è qualche cifra che non si ripete, l'**antiperiodo**: in $\dfrac{1}{6} = 0{,}1\overline{6}$ l'antiperiodo è $1$ e il periodo è $6$.

Come fai a sapere in anticipo quale dei due casi ti capita? Riduci la frazione ai minimi termini e scomponi il denominatore: se contiene **solo** i fattori primi $2$ e $5$ (quelli di $10$), il decimale è limitato; altrimenti è periodico.

?? Quale di queste frazioni dà un decimale limitato?
[x] $\dfrac{9}{30}$
[ ] $\dfrac{1}{6}$
[ ] $\dfrac{5}{12}$
[ ] $\dfrac{2}{15}$
=> $\dfrac{9}{30}$ ridotta è $\dfrac{3}{10}$, e $10 = 2 \cdot 5$: fa $0{,}3$. La trappola è guardare il $30$ prima di ridurre, vedere il fattore $3$ e scartarla. Le altre, ridotte, hanno un $3$ al denominatore e sono periodiche.

### Dal decimale alla frazione

Anche il percorso inverso si può fare: ogni decimale periodico viene da una frazione, la sua **frazione generatrice**. Il trucco è far sparire il periodo con una sottrazione. Prova con $x = 0{,}41\overline{6}$:

~ x = 0{,}41666\dots :: il numero di partenza: antiperiodo $41$, periodo $6$
~ \evid{1000}x = 416{,}666\dots :: sposto la virgola dopo il primo periodo
~ \evid{100}x = 41{,}666\dots :: sposto la virgola dopo l'antiperiodo
~ 1000x - 100x = 416 - 41 :: sottraggo: le code di $6$ sono uguali e si cancellano
~ \evid{900}x = \evid{375} :: faccio le due sottrazioni
~ x = \dfrac{375}{900} = \evidb{\dfrac{5}{12}} :: divido per $900$ e semplifico per $75$

Da qui viene la regola del formulario: al numeratore il numero scritto fino al primo periodo meno l'antiperiodo ($416 - 41$), al denominatore tanti $9$ quante le cifre del periodo e tanti $0$ quante quelle dell'antiperiodo ($900$).

>* Ogni decimale limitato o periodico è una frazione, quindi è razionale. Un decimale con infinite cifre **senza** periodo non lo è.

>! $0{,}\overline{9}$ non è «quasi $1$»: con la regola del periodico semplice $0{,}\overline{9} = \dfrac{9}{9} = 1$. Sono lo stesso numero scritto in due modi.` },

    { id: 'densita-completezza', titolo: 'Densità di Q e non completezza', testo: R`Fra i naturali $3$ e $4$ non c'è nessun altro naturale: dopo il $3$ viene subito il $4$. Con le frazioni non succede mai. Fra due razionali diversi, per quanto vicini, ce n'è sempre un altro: la loro **media**.

~ \dfrac{1}{2} \text{ e } 1 :: due razionali qualsiasi
~ \dfrac{1}{2}\left(\dfrac{1}{2} + 1\right) = \evid{\dfrac{3}{4}} :: la media sta a metà strada, quindi in mezzo
~ \dfrac{1}{2}\left(\dfrac{1}{2} + \dfrac{3}{4}\right) = \evid{\dfrac{5}{8}} :: ripeto fra $\dfrac{1}{2}$ e $\dfrac{3}{4}$
~ \dfrac{1}{2}\left(\dfrac{1}{2} + \dfrac{5}{8}\right) = \evid{\dfrac{9}{16}} :: e si può andare avanti senza fine

La media di due frazioni è ancora una frazione, e il procedimento non si ferma mai. Questa proprietà si chiama **densità**.

>* **Densità di $\mathbb{Q}$:** fra due numeri razionali diversi ci sono sempre infiniti altri razionali.

Sembrerebbe che le frazioni riempiano tutta la retta. Invece no: ci sono punti della retta che non corrispondono a nessuna frazione. Uno è il punto $\sqrt{2}$. Puoi avvicinarti quanto vuoi con frazioni, $1{,}4$, $1{,}41$, $1{,}414$, $1{,}4142$, ma nessuna arriva proprio lì, perché $\sqrt{2}$ non è una frazione. Con i soli razionali, in quel punto la retta avrebbe un buco.

I numeri reali tappano tutti questi buchi: a ogni punto della retta corrisponde un numero reale. Questa proprietà si chiama **completezza**, ed è quella che $\mathbb{Q}$ non ha.

>! Densità e completezza sono due cose diverse. **Denso**: fra due razionali ce n'è sempre un altro. **Completo**: ogni punto della retta ha il suo numero. $\mathbb{Q}$ è denso ma non completo; $\mathbb{R}$ è tutte e due le cose.` },

    { id: 'irrazionali', titolo: 'I numeri irrazionali', testo: R`>* Un numero **irrazionale** è un numero reale che non si può scrivere come frazione $\dfrac{m}{n}$ con $m$ e $n$ interi. Scritto con la virgola, ha infinite cifre e nessun periodo.

Come si fa a essere sicuri che $\sqrt{2}$ non sia una frazione? Provare tutte le frazioni è impossibile: sono infinite. Si ragiona **per assurdo**: si suppone che lo sia e si arriva a una contraddizione.

Serve un fatto sui numeri pari: il quadrato di un numero dispari è dispari. Quindi, se un quadrato $p^2$ è pari, anche $p$ deve essere pari.

~ \sqrt{2} = \dfrac{p}{q} :: supponiamo che sia una frazione, già ridotta ai minimi termini ($p$ e $q$ senza fattori comuni)
~ 2 = \dfrac{\evid{p^2}}{\evid{q^2}} :: elevo al quadrato entrambi i membri
~ p^2 = \evid{2q^2} :: moltiplico per $q^2$: $p^2$ è il doppio di un intero, quindi è pari, e allora anche $p$ è pari
~ (\evid{2k})^2 = 2q^2 :: essendo pari, $p$ si scrive $2k$ con $k$ intero
~ 4k^2 = 2q^2 \;\Rightarrow\; \evid{q^2 = 2k^2} :: divido per $2$: ora è $q^2$ a essere pari, quindi anche $q$ è pari
~ \evidb{p \text{ e } q \text{ entrambi pari}} :: ma allora hanno il fattore $2$ in comune, contro l'ipotesi: assurdo

L'unica ipotesi fatta era che $\sqrt{2}$ fosse una frazione, quindi è quella a essere falsa: $\sqrt{2}$ è irrazionale.

Allo stesso modo sono irrazionali $\sqrt{3}$, $\sqrt{5}$ e la radice quadrata di ogni naturale che non sia un quadrato perfetto. Sono irrazionali anche $\pi$ (il rapporto fra circonferenza e diametro) ed $e$, che incontrerai con i logaritmi, anche se per loro la dimostrazione è molto più difficile.

>! Non basta guardare le prime cifre e «non vedere un periodo». $0{,}101001000100001\dots$ (con blocchi di zeri sempre più lunghi) è irrazionale perché si può dimostrare che nessun blocco si ripete mai, non perché a occhio il periodo non si vede. Un periodo potrebbe anche essere lunghissimo.` },

    { id: 'potenze', titolo: 'Potenze ed esponenti', testo: R`$2^5$ vuol dire $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2$. In generale, per un esponente naturale $n \ge 1$, la **potenza** $a^n$ è il prodotto di $n$ fattori uguali ad $a$: $a$ si chiama **base**, $n$ **esponente**.

Le proprietà delle potenze vengono tutte da qui: basta contare i fattori. Per esempio, perché $2^3 \cdot 2^2 = 2^5$?

~ 2^3 \cdot 2^2 :: stessa base, $2$
~ (\evid{2 \cdot 2 \cdot 2}) \cdot (\evid{2 \cdot 2}) :: scrivo i fattori: tre da una parte, due dall'altra
~ 2^{\evid{3 + 2}} = 2^5 :: in tutto sono $3 + 2 = 5$ fattori uguali a $2$

Ecco le cinque proprietà, che si usano per calcolare senza scrivere tutti i fattori:

| proprietà | regola |
|---|---|
| prodotto di potenze (stessa base) | $a^m \cdot a^n = a^{m+n}$ |
| quoziente di potenze (stessa base, $a \ne 0$) | $a^m : a^n = a^{m-n}$ |
| potenza di potenza | $(a^m)^n = a^{m \cdot n}$ |
| potenza di un prodotto | $(a \cdot b)^n = a^n \cdot b^n$ |
| potenza di un quoziente ($b \ne 0$) | $(a : b)^n = a^n : b^n$ |

>! Le proprietà del prodotto e del quoziente valgono solo con la **stessa base**: $2^3 \cdot 3^2$ **non** fa $6^5$ (fa $8 \cdot 9 = 72$). Con basi diverse si possono unire le potenze solo se hanno lo stesso esponente: $2^3 \cdot 5^3 = (2 \cdot 5)^3 = 10^3$.

### Esponente zero ed esponente negativo

Che cosa vuol dire $2^0$, o $2^{-2}$? «Moltiplicare $2$ per sé stesso zero volte» non ha senso. Si sceglie allora il significato che fa funzionare ancora la proprietà del quoziente.

~ \dfrac{2^3}{2^3} = 2^{3 - 3} = \evid{2^0} :: con la proprietà del quoziente
~ \dfrac{2^3}{2^3} = \dfrac{8}{8} = \evid{1} :: facendo il conto: un numero diviso per sé stesso
~ \evidb{2^0 = 1} :: le due strade devono dare lo stesso risultato

Con lo stesso ragionamento si trova il significato dell'esponente negativo:

~ \dfrac{2^3}{2^5} = 2^{3 - 5} = \evid{2^{-2}} :: con la proprietà del quoziente
~ \dfrac{2^3}{2^5} = \dfrac{\cancel{2 \cdot 2 \cdot 2}}{\cancel{2 \cdot 2 \cdot 2} \cdot 2 \cdot 2} = \evid{\dfrac{1}{2^2}} :: semplificando i fattori uguali
~ \evidb{2^{-2} = \dfrac{1}{2^2} = \dfrac{1}{4}} :: di nuovo, le due strade devono coincidere

>* Per ogni $a \ne 0$: $a^0 = 1$ e $a^{-n} = \dfrac{1}{a^n}$. L'esponente negativo **non** rende negativo il numero: indica il reciproco. Con queste definizioni le cinque proprietà valgono anche per gli esponenti negativi. Il caso $0^0$ non si definisce.

?? Quanto vale $2^{-3}$?
[ ] $-8$
[ ] $-6$
[x] $\dfrac{1}{8}$
[ ] $\dfrac{1}{6}$
=> $2^{-3} = \dfrac{1}{2^3} = \dfrac{1}{8}$. L'errore più comune è $-8$: il meno nell'esponente non passa davanti al numero, dice di prendere il reciproco. $-6$ e $\dfrac{1}{6}$ vengono dal moltiplicare base ed esponente, che non ha niente a che fare con le potenze.

### Il segno meno e le parentesi

In $-3^2$ la potenza si calcola prima del meno, quindi $-3^2 = -(3 \cdot 3) = -9$. Per elevare al quadrato anche il segno serve la parentesi: $(-3)^2 = (-3) \cdot (-3) = 9$.

### Perché si dice «al quadrato»

$n^2$ si legge «$n$ al quadrato» perché $n^2$ puntini si dispongono esattamente in un quadrato di lato $n$. Guarda l'animazione: aggiungendo ogni volta una «L» di puntini, con $1, 3, 5, 7, \dots$ puntini, il quadrato cresce di un lato alla volta. Quindi la somma dei primi $n$ numeri dispari è sempre $n^2$.

[[animazione:somma-dispari]]` },

    { id: 'notazione-scientifica', titolo: 'Notazione scientifica e ordine di grandezza', testo: R`La distanza fra la Terra e il Sole è circa $150\,000\,000$ km; il raggio di un atomo di idrogeno è circa $0{,}00000005$ mm. Scritti così, per leggerli devi contare gli zeri. Con le potenze di $10$ diventano $1{,}5 \times 10^8$ km e $5 \times 10^{-8}$ mm.

>* **Notazione scientifica:** un numero scritto come $a \times 10^n$, con $n$ intero e $1 \le |a| < 10$, cioè con **una sola cifra diversa da zero prima della virgola**. $a$ si chiama coefficiente, $n$ esponente.

Per passare alla notazione scientifica sposti la virgola finché davanti resta una sola cifra diversa da zero, e conti di quanti posti l'hai spostata.

~ 0{,}00068 :: numero minore di $1$
~ 0{,}00068 \to \evid{6{,}8} :: sposto la virgola di $4$ posti verso destra, fin dopo il $6$
~ 6{,}8 \times 10^{\evid{-4}} :: verso destra il numero diventa più grande, quindi compenso con esponente negativo, $-4$

Con i numeri grandi la virgola va verso sinistra e l'esponente è positivo: $346\,000 = 3{,}46 \times 10^5$.

La notazione scientifica rende facili i prodotti: moltiplichi i coefficienti fra loro e le potenze di $10$ fra loro.

~ (3 \times 10^4) \cdot (5 \times 10^{-7}) :: il prodotto da calcolare
~ (\evid{3 \cdot 5}) \times 10^{\evid{4 + (-7)}} :: coefficienti con coefficienti, potenze con potenze (si sommano gli esponenti)
~ 15 \times 10^{-3} :: il coefficiente $15$ ha due cifre prima della virgola: non è ancora notazione scientifica
~ \evidb{1{,}5 \times 10^{-2}} :: $15 = 1{,}5 \times 10$, quindi l'esponente sale di uno

### Ordine di grandezza

L'**ordine di grandezza** è la potenza di $10$ più vicina al numero: serve per le stime veloci e per confrontare numeri molto diversi. Scritto il numero come $a \times 10^n$, guardi il coefficiente:

| coefficiente | ordine di grandezza | esempio |
|---|---|---|
| $a < 5$ | $10^n$ | $3{,}46 \times 10^5 \to 10^5$ |
| $a \ge 5$ | $10^{n+1}$ | $6{,}8 \times 10^{-4} \to 10^{-3}$ |

Nel secondo esempio si sale da $10^{-4}$ a $10^{-3}$: è la potenza successiva, anche se l'esponente in valore assoluto diminuisce.

>! $34{,}6 \times 10^4$ vale proprio $346\,000$, ma non è notazione scientifica: davanti alla virgola ci sono due cifre. La forma corretta è $3{,}46 \times 10^5$.` },

    { id: 'valore-assoluto', titolo: 'Il valore assoluto', testo: R`Quanto è lontano $-5$ da zero? Cinque passi, verso sinistra. E $5$? Cinque passi, verso destra. La distanza è la stessa: cambia solo il verso.

>* Il **valore assoluto** (o modulo) di $x$, scritto $|x|$, è la distanza di $x$ da $0$ sulla retta. Una distanza non è mai negativa: $|5| = 5$, $|-5| = 5$, $|0| = 0$.

In pratica: se il numero è positivo o zero lo lasci com'è, se è negativo gli togli il segno meno. Con una lettera al posto del numero questa regola si scrive così:

$$|x| = \begin{cases} x & \text{se } x \ge 0 \\ -x & \text{se } x < 0 \end{cases}$$

La seconda riga spaventa: sembra dire che il valore assoluto può essere negativo. Invece se $x$ è negativo, $-x$ è positivo. Per esempio con $x = -5$ si ottiene $-x = -(-5) = 5$.

?? Se $x = -4$, quanto vale $-x$?
[ ] $-4$
[x] $4$
[ ] non si può dire
=> $-x$ vuol dire «l'opposto di $x$», e l'opposto di $-4$ è $4$. Pensare che $-x$ sia sempre negativo è l'errore tipico: il meno davanti a una lettera cambia il segno del numero che la lettera rappresenta, qualunque esso sia.

### Distanza fra due numeri

Con il valore assoluto si misura anche la distanza fra due numeri $a$ e $b$: è $|a - b|$. Trascina i punti $A$ e $B$ e confronta le due sottrazioni: $a - b$ e $b - a$ sono opposte, ma il loro valore assoluto è lo stesso ed è sempre la lunghezza del tratteggio.

[[grafico:distanza]]

Per esempio la distanza fra $3$ e $7$ è $|7 - 3| = |3 - 7| = 4$, e quella fra $-2$ e $3$ è $|3 - (-2)| = 5$.

>! $|a + b|$ non è sempre $|a| + |b|$: con $a = 3$ e $b = -5$ si ha $|3 + (-5)| = |-2| = 2$, mentre $|3| + |-5| = 8$. Il valore assoluto di una somma si calcola **dopo** aver fatto la somma.` },

    { id: 'numeri-primi-scomposizione', titolo: 'Numeri primi, scomposizione, MCD e mcm', testo: R`Il $12$ si può scrivere come $3 \cdot 4$, oppure $2 \cdot 6$. Il $7$ invece si può dividere solo per $1$ e per sé stesso: non si spezza in numeri più piccoli.

>* Un naturale maggiore di $1$ è **primo** se ha esattamente due divisori: $1$ e sé stesso. Gli altri naturali maggiori di $1$ si dicono **composti**. Il numero $1$ non è primo: ha un solo divisore.

Per trovare tutti i primi fino a un certo numero c'è un metodo antico, il **crivello di Eratostene**: parti dal $2$, cancelli tutti i suoi multipli, passi al primo numero non cancellato e ripeti. Quelli che restano sono i primi.

[[animazione:crivello]]

?? Quale di questi numeri è primo?
[ ] $51$
[ ] $57$
[x] $59$
[ ] $91$
=> $59$ non è divisibile né per $2$, né per $3$, né per $5$, né per $7$ (e $8^2 = 64$ supera già $59$, quindi non serve provare oltre). Gli altri sembrano primi ma non lo sono: $51 = 3 \cdot 17$, $57 = 3 \cdot 19$, $91 = 7 \cdot 13$. Il trucco per $51$ e $57$: la somma delle cifre è divisibile per $3$.

### Scomporre in fattori primi

Ogni numero composto si scrive come prodotto di numeri primi in **un solo modo** (a parte l'ordine dei fattori): è il **teorema fondamentale dell'aritmetica**. Per trovare i fattori si divide ripetutamente per i primi, partendo dal più piccolo.

~ 360 :: il numero da scomporre
~ 2 \cdot 180 :: $360$ è pari: divido per $2$
~ 2 \cdot 2 \cdot 90 = 2^{\evid{2}} \cdot 90 :: anche $180$ è pari
~ 2^{\evid{3}} \cdot 45 :: e anche $90$
~ 2^3 \cdot \evid{3^2} \cdot 5 :: $45$ è dispari; $45 = 9 \cdot 5 = 3^2 \cdot 5$

### MCD e mcm

Il **massimo comun divisore** (MCD) di due numeri è il più grande numero che li divide entrambi. Il **minimo comune multiplo** (mcm) è il più piccolo numero che è multiplo di entrambi. Con la scomposizione si trovano senza tentativi:

~ 36 = 2^2 \cdot 3^2 \qquad 60 = 2^2 \cdot 3 \cdot 5 :: scompongo tutti e due
~ \text{MCD} = 2^{\evid{2}} \cdot 3^{\evid{1}} = 12 :: solo i fattori **comuni** ($2$ e $3$), con l'esponente **più piccolo**
~ \text{mcm} = 2^{\evid{2}} \cdot 3^{\evid{2}} \cdot \evid{5} = 180 :: **tutti** i fattori, anche il $5$ che sta solo nel $60$, con l'esponente **più grande**

>* MCD: fattori comuni, esponente minimo. mcm: fattori comuni e non comuni, esponente massimo.

>! Scambiare le due regole è l'errore tipico. Un controllo rapido: il MCD non può superare il più piccolo dei numeri (qui $12 \le 36$); il mcm non può essere minore del più grande ($180 \ge 60$).` }
  ],

  grafici: {
    distanza: {
      tipo: 'piano', x: [-5.5, 5.5], y: [-1, 3], passo: [1, 1], griglia: false, etichette: { x: '', y: '' },
      parametri: [
        { nome: 'a', min: -5, max: 5, passo: 0.5, valore: -2, nascosto: true },
        { nome: 'b', min: -5, max: 5, passo: 0.5, valore: 3, nascosto: true }
      ],
      elementi: [
        { tipo: 'segmento', da: ['a', 0], a: ['b', 0], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [0, 0] },
        { tipo: 'punto', p: ['a', 0], trascina: true, etichetta: 'A', posizione: 'alto', colore: 1 },
        { tipo: 'punto', p: ['b', 0], trascina: true, etichetta: 'B', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-5.2, 2.5], testo: 'a − b = {{a - b}}      b − a = {{b - a}}', ancora: 'start' },
        { tipo: 'testo', p: [-5.2, 1.6], testo: 'distanza = |a − b| = {{abs(a - b)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B: le due sottrazioni cambiano segno, il valore assoluto resta la lunghezza del tratteggio.'
    }
  },

  esempi: [
    { titolo: 'Classificare alcuni numeri', problema: R`A quale insieme numerico appartengono $-7$, $\dfrac{2}{3}$ e $\sqrt{5}$? Per ciascuno, indica il più piccolo tra $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$ che lo contiene.`, passi: [
      R`$-7$ è un numero intero negativo: non può stare in $\mathbb{N}$ (che ha solo numeri non negativi), ma è un intero a tutti gli effetti. Il più piccolo insieme che lo contiene è $\mathbb{Z}$.`,
      R`$\dfrac{2}{3}$ è già una frazione ridotta ai minimi termini, e non è un numero intero (non esiste un intero uguale a $\dfrac{2}{3}$). Il più piccolo insieme che lo contiene è $\mathbb{Q}$.`,
      R`$5$ non è un quadrato perfetto ($2^2 = 4$, $3^2 = 9$), quindi $\sqrt{5}$ è irrazionale: non appartiene a $\mathbb{Q}$, ma appartiene a $\mathbb{R}$.`
    ], risultato: R`$-7 \in \mathbb{Z}$; $\dfrac{2}{3} \in \mathbb{Q}$; $\sqrt{5} \in \mathbb{R} \setminus \mathbb{Q}$` },

    { titolo: 'Una distanza sulla retta', problema: R`Calcola la distanza fra $-4$ e $7$ sulla retta reale.`, passi: [
      R`La distanza fra due numeri $a$ e $b$ è $|a - b|$, e non dipende dall'ordine in cui li si sottrae.`,
      R`$|7 - (-4)| = |11| = 11$.`,
      R`Verifica con l'altro ordine: $|-4 - 7| = |-11| = 11$: stesso risultato.`
    ], risultato: R`La distanza è $11$` },

    { titolo: 'Calcolare con le potenze', problema: R`Calcola $\dfrac{2^5 \cdot 2^{-2}}{2^4}$ usando le proprietà delle potenze, senza calcolare $2^5$ per esteso.`, passi: [
      R`Al numeratore, stessa base: $2^5 \cdot 2^{-2} = 2^{5 + (-2)} = 2^3$.`,
      R`Ora un quoziente di potenze con la stessa base: $\dfrac{2^3}{2^4} = 2^{3 - 4} = 2^{-1}$.`,
      R`Per l'esponente negativo, $2^{-1} = \dfrac{1}{2^1} = \dfrac{1}{2}$.`
    ], risultato: R`$\dfrac{1}{2} = 0{,}5$` },

    { titolo: 'Frazione generatrice di un periodico misto', problema: R`Trova la frazione generatrice, ridotta ai minimi termini, di $0{,}41\overline{6}$.`, passi: [
      R`Antiperiodo: $41$ (due cifre). Periodo: $6$ (una cifra).`,
      R`Numeratore: numero intero fino a un periodo, $416$, meno la parte non periodica, $41$: $416 - 41 = 375$.`,
      R`Denominatore: tanti $9$ quante le cifre del periodo (uno) seguiti da tanti $0$ quante le cifre dell'antiperiodo (due): $900$.`,
      R`Quindi $0{,}41\overline{6} = \dfrac{375}{900}$.`,
      R`Semplifico: $375 = 3 \cdot 5^3$ e $900 = 2^2 \cdot 3^2 \cdot 5^2$ hanno in comune $3 \cdot 5^2 = 75$. Divido sopra e sotto per $75$ e ottengo $\dfrac{5}{12}$. Controllo: $5 : 12 = 0{,}41666\dots$ ✓`
    ], risultato: R`$\dfrac{5}{12}$` },

    { titolo: 'Notazione scientifica e ordine di grandezza', problema: R`Scrivi $0{,}0000523$ in notazione scientifica e trova il suo ordine di grandezza.`, passi: [
      R`Si sposta la virgola finché resta una sola cifra non nulla prima di essa: da $0{,}0000523$ a $5{,}23$, spostando la virgola di $5$ posizioni verso destra, quindi l'esponente è $-5$.`,
      R`Notazione scientifica: $5{,}23 \times 10^{-5}$.`,
      R`Il coefficiente è $5{,}23 \ge 5$, quindi l'ordine di grandezza è la potenza successiva a $10^{-5}$, cioè $10^{-4}$.`
    ], risultato: R`$5{,}23 \times 10^{-5}$, ordine di grandezza $10^{-4}$` },

    { titolo: 'MCD e mcm dalla scomposizione', problema: R`Trova il MCD e il mcm di $84$ e $126$.`, passi: [
      R`Si scompongono i due numeri: $84 = 2^2 \cdot 3 \cdot 7$ e $126 = 2 \cdot 3^2 \cdot 7$.`,
      R`MCD: fattori comuni ($2$, $3$, $7$) con l'esponente più piccolo tra i due: $2^1 \cdot 3^1 \cdot 7^1 = 42$.`,
      R`mcm: tutti i fattori, comuni e non, con l'esponente più grande: $2^2 \cdot 3^2 \cdot 7^1 = 4 \cdot 9 \cdot 7 = 252$.`,
      R`Controllo: $\text{MCD} \cdot \text{mcm} = 42 \cdot 252 = 10\,584$, e infatti $84 \cdot 126 = 10\,584$. ✓`
    ], risultato: R`$\text{MCD} = 42$, $\text{mcm} = 252$` }
  ],

  formulario: [
    { nome: 'Frazione generatrice — decimale limitato', formula: R`0{,}\underbrace{a_1 a_2 \dots a_k}_{k \text{ cifre}} = \frac{a_1 a_2 \dots a_k}{10^k}` },
    { nome: 'Frazione generatrice — periodico semplice', formula: R`0{,}\overline{p_1 \dots p_k} = \frac{p_1 \dots p_k}{\underbrace{9 \dots 9}_{k}}`, nota: R`$k$ = numero di cifre del periodo.` },
    { nome: 'Frazione generatrice — periodico misto', formula: R`0{,}a_1 \dots a_h\overline{p_1 \dots p_k} = \frac{a_1 \dots a_h p_1 \dots p_k - a_1 \dots a_h}{\underbrace{9 \dots 9}_{k}\underbrace{0 \dots 0}_{h}}`, nota: R`$h$ = cifre dell'antiperiodo, $k$ = cifre del periodo.` },
    { nome: 'Prodotto di potenze', formula: R`a^m \cdot a^n = a^{m+n}` },
    { nome: 'Quoziente di potenze', formula: R`a^m : a^n = a^{m-n}`, nota: R`Richiede $a \ne 0$.` },
    { nome: 'Potenza di potenza', formula: R`(a^m)^n = a^{m \cdot n}` },
    { nome: 'Potenza di un prodotto', formula: R`(a \cdot b)^n = a^n \cdot b^n` },
    { nome: 'Potenza di un quoziente', formula: R`(a : b)^n = a^n : b^n`, nota: R`Richiede $b \ne 0$.` },
    { nome: 'Esponente zero', formula: R`a^0 = 1`, nota: R`Richiede $a \ne 0$; $0^0$ non si definisce.` },
    { nome: 'Esponente negativo', formula: R`a^{-n} = \frac{1}{a^n}`, nota: R`Richiede $a \ne 0$.` },
    { nome: 'Valore assoluto', formula: R`|x| = \begin{cases} x & \text{se } x \ge 0 \\ -x & \text{se } x < 0 \end{cases}` },
    { nome: 'Notazione scientifica', formula: R`a \times 10^n, \qquad 1 \le |a| < 10` },
    { nome: 'Ordine di grandezza', formula: R`10^n \text{ se } a < 5; \qquad 10^{n+1} \text{ se } a \ge 5`, nota: R`Con il numero scritto come $a \times 10^n$.` },
    { nome: 'MCD e mcm', formula: R`\text{MCD}(a, b) \cdot \text{mcm}(a, b) = a \cdot b` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'insiemi-n-z-q', tipo: 'definizione', fronte: R`Numeri naturali $\mathbb{N}$`, retro: R`$\{0, 1, 2, 3, \dots\}$: servono per contare, senza negativi né frazioni.` },
    { id: 'fc-02', sezione: 'insiemi-n-z-q', tipo: 'definizione', fronte: R`Numeri interi $\mathbb{Z}$`, retro: R`$\{\dots, -2, -1, 0, 1, 2, \dots\}$: naturali più i loro opposti. Rendono sempre possibile la sottrazione.` },
    { id: 'fc-03', sezione: 'insiemi-n-z-q', tipo: 'definizione', fronte: R`Numeri razionali $\mathbb{Q}$`, retro: R`Tutte le frazioni $\dfrac{m}{n}$ con $m, n$ interi e $n \ne 0$. Rendono sempre possibile la divisione (tranne per $0$).` },
    { id: 'fc-04', sezione: 'insiemi-n-z-q', tipo: 'concetto', fronte: R`Perché si passa da $\mathbb{N}$ a $\mathbb{Z}$ a $\mathbb{Q}$?`, retro: R`Ogni insieme nuovo risolve un'equazione che nel precedente non aveva soluzione: per $x + 5 = 3$ serve $\mathbb{Z}$, per $2x = 3$ serve $\mathbb{Q}$.` },
    { id: 'fc-05', sezione: 'numeri-reali', tipo: 'definizione', fronte: R`Numeri reali $\mathbb{R}$`, retro: R`Unione di numeri razionali e numeri irrazionali. Corrispondono, uno a uno, ai punti della retta.` },
    { id: 'fc-06', sezione: 'numeri-reali', tipo: 'concetto', fronte: R`C'è un insieme più grande di $\mathbb{R}$?`, retro: R`Sì, i numeri complessi $\mathbb{C}$, con $\mathbb{R} \subset \mathbb{C}$: servono per equazioni come $x^2 = -1$.` },
    { id: 'fc-07', sezione: 'frazioni-decimali', tipo: 'concetto', fronte: R`Quando una frazione dà un decimale limitato?`, retro: R`Quando, ridotta ai minimi termini, il denominatore ha come fattori primi solo $2$ e/o $5$.` },
    { id: 'fc-08', sezione: 'frazioni-decimali', tipo: 'definizione', fronte: R`Decimale periodico misto`, retro: R`Ha un antiperiodo (cifre che non si ripetono) seguito da un periodo che si ripete all'infinito: es. $0{,}1\overline{6}$.` },
    { id: 'fc-09', sezione: 'frazioni-decimali', tipo: 'procedura', fronte: R`Frazione generatrice di un periodico semplice`, retro: R`Numeratore: il periodo. Denominatore: tanti $9$ quante le cifre del periodo. Es. $0{,}\overline{27} = \dfrac{27}{99}$.` },
    { id: 'fc-10', sezione: 'densita-completezza', tipo: 'concetto', fronte: R`Densità di $\mathbb{Q}$`, retro: R`Tra due razionali distinti ce n'è sempre un altro: basta prenderne la media.` },
    { id: 'fc-11', sezione: 'densita-completezza', tipo: 'concetto', fronte: R`Perché $\mathbb{Q}$ non è completo?`, retro: R`Perché esistono "buchi": per esempio non c'è nessun razionale il cui quadrato sia $2$, anche se ci si può avvicinare quanto si vuole.` },
    { id: 'fc-12', sezione: 'irrazionali', tipo: 'definizione', fronte: R`Numero irrazionale`, retro: R`Un numero reale non esprimibile come frazione: decimale infinito e mai periodico.` },
    { id: 'fc-13', sezione: 'irrazionali', tipo: 'procedura', fronte: R`Idea della dimostrazione che $\sqrt{2}$ è irrazionale`, retro: R`Per assurdo, $\sqrt{2} = p/q$ ridotta ai minimi termini porta a $p$ e $q$ entrambi pari: contraddizione.` },
    { id: 'fc-14', sezione: 'potenze', tipo: 'formula', fronte: R`Prodotto di potenze stessa base`, retro: R`$a^m \cdot a^n = a^{m+n}$` },
    { id: 'fc-15', sezione: 'potenze', tipo: 'formula', fronte: R`Quoziente di potenze stessa base`, retro: R`$a^m : a^n = a^{m-n}$, con $a \ne 0$.` },
    { id: 'fc-16', sezione: 'potenze', tipo: 'formula', fronte: R`Potenza di potenza`, retro: R`$(a^m)^n = a^{m \cdot n}$` },
    { id: 'fc-17', sezione: 'potenze', tipo: 'formula', fronte: R`Esponente zero`, retro: R`$a^0 = 1$, con $a \ne 0$.` },
    { id: 'fc-18', sezione: 'potenze', tipo: 'formula', fronte: R`Esponente negativo`, retro: R`$a^{-n} = \dfrac{1}{a^n}$, con $a \ne 0$.` },
    { id: 'fc-19', sezione: 'notazione-scientifica', tipo: 'definizione', fronte: R`Notazione scientifica`, retro: R`$a \times 10^n$ con $1 \le |a| < 10$.` },
    { id: 'fc-20', sezione: 'notazione-scientifica', tipo: 'concetto', fronte: R`Come si trova l'ordine di grandezza?`, retro: R`Si scrive il numero come $a \times 10^n$: se $a < 5$ l'ordine è $10^n$, se $a \ge 5$ è $10^{n+1}$.` },
    { id: 'fc-21', sezione: 'valore-assoluto', tipo: 'definizione', fronte: R`Valore assoluto $|x|$`, retro: R`La distanza di $x$ da $0$: $|x| = x$ se $x \ge 0$, $|x| = -x$ se $x < 0$. Non è mai negativo.` },
    { id: 'fc-22', sezione: 'numeri-primi-scomposizione', tipo: 'definizione', fronte: R`Numero primo`, retro: R`Naturale maggiore di $1$ con esattamente due divisori: $1$ e se stesso.` },
    { id: 'fc-23', sezione: 'numeri-primi-scomposizione', tipo: 'procedura', fronte: R`MCD dalla scomposizione in fattori primi`, retro: R`Si prendono i fattori primi comuni, ciascuno con l'esponente più piccolo tra i due numeri.` },
    { id: 'fc-24', sezione: 'numeri-primi-scomposizione', tipo: 'procedura', fronte: R`mcm dalla scomposizione in fattori primi`, retro: R`Si prendono tutti i fattori primi, comuni e non, ciascuno con l'esponente più grande tra i due numeri.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Qual è il più piccolo fra gli insiemi $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$ che contiene $-\dfrac{9}{3}$? Rispondi con una lettera: N, Z oppure Q.`, suggerimenti: [R`Prima semplifica la frazione.`, R`$-\dfrac{9}{3} = -3$: è un numero negativo, quindi non può essere naturale.`], risposta: { tipo: 'testo', accettate: ['z', 'zeta', 'interi'] }, soluzione: [R`$-\dfrac{9}{3} = -3$, un numero intero negativo.`, R`Non è naturale (è negativo), ma è intero: il più piccolo insieme che lo contiene è $\mathbb{Z}$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Trova la frazione generatrice di $0{,}\overline{45}$, ridotta ai minimi termini.`, suggerimenti: [R`È un periodico semplice: niente antiperiodo.`, R`Numeratore = il periodo $45$; denominatore = tanti $9$ quante le cifre del periodo.`], risposta: { tipo: 'numero', valore: 0.454545, tolleranza: 0.0005 }, soluzione: [R`$0{,}\overline{45} = \dfrac{45}{99}$.`, R`Dividendo per $9$: $\dfrac{5}{11}$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Trova la frazione generatrice di $0{,}2\overline{3}$, ridotta ai minimi termini.`, suggerimenti: [R`Antiperiodo: $2$. Periodo: $3$.`, R`Numeratore: $23 - 2$. Denominatore: un $9$ (una cifra di periodo) e uno $0$ (una cifra di antiperiodo).`], risposta: { tipo: 'numero', valore: 0.233333, tolleranza: 0.0005 }, soluzione: [R`$0{,}2\overline{3} = \dfrac{23 - 2}{90} = \dfrac{21}{90}$.`, R`Dividendo per $3$: $\dfrac{7}{30}$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Calcola $2^3 \cdot 2^{-5}$.`, suggerimenti: [R`Stessa base: somma gli esponenti.`, R`$3 + (-5) = -2$.`], risposta: { tipo: 'numero', valore: 0.25, tolleranza: 0.001 }, soluzione: [R`$2^3 \cdot 2^{-5} = 2^{3-5} = 2^{-2}$.`, R`$2^{-2} = \dfrac{1}{2^2} = \dfrac{1}{4} = 0{,}25$.`] },
    { id: 'es-05', difficolta: 1, testo: R`Calcola $\left(\dfrac{2}{3}\right)^{-2}$.`, suggerimenti: [R`Un esponente negativo su una frazione la capovolge.`, R`$\left(\dfrac{2}{3}\right)^{-2} = \left(\dfrac{3}{2}\right)^2$.`], risposta: { tipo: 'numero', valore: 2.25, tolleranza: 0.001 }, soluzione: [R`$\left(\dfrac{2}{3}\right)^{-2} = \left(\dfrac{3}{2}\right)^2 = \dfrac{9}{4}$.`, R`$\dfrac{9}{4} = 2{,}25$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi in notazione scientifica il numero $0{,}00047$.`, suggerimenti: [R`Sposta la virgola finché resta una sola cifra non nulla prima di essa.`, R`Conta di quante posizioni ti sei spostato: quello è l'esponente (negativo, perché il numero è minore di $1$).`], risposta: { tipo: 'testo', accettate: ['4.7×10^-4', '4.7*10^-4', '4,7×10^-4', '4.7e-4', '4.7·10^-4', '4,7*10^-4', '4.7x10^-4'] }, soluzione: [R`Si sposta la virgola di $4$ posizioni verso destra: $4{,}7$.`, R`$0{,}00047 = 4{,}7 \times 10^{-4}$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Qual è l'ordine di grandezza del numero $68\,000$?`, suggerimenti: [R`Scrivilo prima in notazione scientifica.`, R`$68\,000 = 6{,}8 \times 10^4$: confronta il coefficiente con $5$.`], risposta: { tipo: 'testo', accettate: ['10^5', '10⁵', '1e5', '100000'] }, soluzione: [R`$68\,000 = 6{,}8 \times 10^4$.`, R`Il coefficiente $6{,}8$ è maggiore di $5$, quindi l'ordine di grandezza è la potenza successiva: $10^5$.`] },
    { id: 'es-08', difficolta: 1, testo: R`Risolvi $|x - 3| = 5$.`, suggerimenti: [R`$|x-3|=5$ significa "$x$ è a distanza $5$ da $3$".`, R`Ci sono due punti a distanza $5$ da $3$ sulla retta: uno a destra e uno a sinistra.`], risposta: { tipo: 'numeri', valori: [8, -2] }, soluzione: [R`$x - 3 = 5 \Rightarrow x = 8$, oppure $x - 3 = -5 \Rightarrow x = -2$.`, R`Verifica: $|8-3|=5$ ✓ e $|-2-3|=|-5|=5$ ✓.`] },
    { id: 'es-09', difficolta: 2, testo: R`Scomponi in fattori primi il numero $360$.`, suggerimenti: [R`Dividi ripetutamente per $2$, poi per $3$, poi per gli altri primi.`, R`$360 = 8 \cdot 45 = 2^3 \cdot 45$.`], risposta: { tipo: 'testo', accettate: ['2^3*3^2*5', '2^3 * 3^2 * 5', '2³·3²·5', '2^3×3^2×5', '2^3*3^2*5^1'] }, soluzione: [R`$360 = 2 \cdot 180 = 2^2 \cdot 90 = 2^3 \cdot 45$.`, R`$45 = 3^2 \cdot 5$, quindi $360 = 2^3 \cdot 3^2 \cdot 5$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Calcola il MCD e il mcm di $36$ e $60$.`, suggerimenti: [R`Scomponi entrambi in fattori primi.`, R`$36 = 2^2 \cdot 3^2$, $60 = 2^2 \cdot 3 \cdot 5$: quali fattori sono comuni?`], risposta: { tipo: 'numeri', valori: [12, 180] }, soluzione: [R`$36 = 2^2 \cdot 3^2$, $60 = 2^2 \cdot 3 \cdot 5$.`, R`MCD: fattori comuni con esponente minimo, $2^2 \cdot 3 = 12$.`, R`mcm: tutti i fattori con esponente massimo, $2^2 \cdot 3^2 \cdot 5 = 180$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Spiega, ripercorrendo l'idea della dimostrazione vista in questo argomento, perché non esiste nessun numero razionale $\dfrac{p}{q}$ (ridotto ai minimi termini) tale che $\left(\dfrac{p}{q}\right)^2 = 2$.`, suggerimenti: [R`Parti supponendo per assurdo che un tale $\dfrac{p}{q}$ esista, ridotto ai minimi termini.`, R`Da $p^2 = 2q^2$ deduci che $p$ deve essere pari, poi scrivi $p = 2k$.`, R`Sostituendo troverai che anche $q$ deve essere pari: dov'è l'assurdo?`], soluzione: [R`Se $\left(\dfrac{p}{q}\right)^2 = 2$ con $\dfrac{p}{q}$ ridotta ai minimi termini, allora $p^2 = 2q^2$: $p^2$ è pari, quindi $p$ è pari (il quadrato di un dispari è dispari). Si scrive $p = 2k$.`, R`Sostituendo: $4k^2 = 2q^2$, cioè $q^2 = 2k^2$: con lo stesso ragionamento, anche $q$ è pari.`, R`Ma $p$ e $q$ non possono essere entrambi pari, perché la frazione era ridotta ai minimi termini: è un assurdo, quindi un tale $\dfrac{p}{q}$ non esiste. Questo è esattamente il motivo per cui $\sqrt{2}$ è irrazionale.`] },
    { id: 'es-12', difficolta: 3, testo: R`Trova due numeri razionali distinti compresi tra $0{,}3$ e $0{,}31$, e spiega perché in realtà se ne possono trovare infiniti.`, suggerimenti: [R`Pensa ai numeri decimali con più cifre dopo la virgola: tra $0{,}30$ e $0{,}31$ ci sono anche $0{,}301$, $0{,}302$, ...`, R`Per avere infiniti numeri, ripeti il procedimento della media tra due numeri già trovati.`], soluzione: [R`Per esempio $0{,}301$ e $0{,}305$ sono entrambi compresi tra $0{,}3$ e $0{,}31$.`, R`Presi due razionali qualsiasi in quell'intervallo, la loro media è ancora un razionale nello stesso intervallo (o in un intervallo ancora più piccolo dentro di esso): ripetendo il procedimento senza fine si trovano sempre nuovi razionali. È proprio la densità di $\mathbb{Q}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale fra gli insiemi $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$ contiene tutti gli altri?`, opzioni: [R`$\mathbb{Q}$`, R`$\mathbb{Z}$`, R`$\mathbb{R}$`, R`$\mathbb{N}$`], corretta: 2, spiegazione: R`La catena è $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$: $\mathbb{R}$ è il più grande e contiene tutti gli altri. $\mathbb{Q}$ contiene $\mathbb{N}$ e $\mathbb{Z}$, ma non gli irrazionali come $\sqrt{2}$.` },
    { id: 'q-02', domanda: R`Il numero $-\dfrac{3}{4}$ appartiene…`, opzioni: [R`a $\mathbb{N}$ e a $\mathbb{Z}$`, R`solo a $\mathbb{Z}$`, R`a $\mathbb{Q}$ (e quindi a $\mathbb{R}$), ma non a $\mathbb{Z}$`, R`a $\mathbb{R}$, ma non a $\mathbb{Q}$`], corretta: 2, spiegazione: R`$-\dfrac{3}{4}$ non è un numero intero, quindi non appartiene a $\mathbb{Z}$; è una frazione, quindi appartiene a $\mathbb{Q}$ e di conseguenza a $\mathbb{R}$.` },
    { id: 'q-03', domanda: R`Quale affermazione sulla densità di $\mathbb{Q}$ è corretta?`, opzioni: [R`Tra due razionali distinti c'è sempre un altro razionale`, R`Tra due razionali distinti non c'è mai un altro razionale`, R`Solo tra alcune coppie di razionali c'è un altro razionale`, R`La densità riguarda solo i numeri interi`], corretta: 0, spiegazione: R`Basta prendere la media dei due razionali per trovarne sempre un altro compreso fra loro: si può ripetere all'infinito.` },
    { id: 'q-04', domanda: R`In che senso $\mathbb{Q}$ non è "completo"?`, opzioni: [R`Perché contiene troppi pochi numeri negativi`, R`Perché esistono punti della retta reale a cui non corrisponde nessun numero razionale`, R`Perché non tutte le frazioni sono in forma ridotta`, R`Perché non contiene lo $0$`], corretta: 1, spiegazione: R`Un punto come quello a distanza $\sqrt{2}$ dall'origine non corrisponde a nessun razionale: sono proprio questi "buchi" a rendere $\mathbb{Q}$ incompleto. $\mathbb{R}$ li colma.` },
    { id: 'q-05', domanda: R`Un numero decimale periodico è sempre…`, opzioni: [R`irrazionale`, R`razionale`, R`intero`, R`naturale`], corretta: 1, spiegazione: R`Ogni decimale periodico ha una frazione generatrice: è per definizione un numero razionale.` },
    { id: 'q-06', domanda: R`Nella dimostrazione che $\sqrt{2}$ è irrazionale, l'assurdo finale è che…`, opzioni: [R`$p$ e $q$ sono entrambi dispari`, R`$p$ e $q$ sono entrambi pari, pur avendo supposto che non avessero fattori comuni`, R`$p^2$ non è un numero intero`, R`$q$ è uguale a zero`], corretta: 1, spiegazione: R`Si era supposto $\dfrac{p}{q}$ ridotta ai minimi termini; scoprire che sono entrambi pari contraddice questa ipotesi.` },
    { id: 'q-07', domanda: R`Quale uguaglianza è corretta, per $a \ne 0$?`, opzioni: [R`$a^m \cdot a^n = a^{mn}$`, R`$a^m \cdot a^n = a^{m+n}$`, R`$a^m \cdot a^n = (a \cdot a)^{m+n}$`, R`$a^m \cdot a^n = a^m + a^n$`], corretta: 1, spiegazione: R`Il prodotto di potenze con la stessa base si calcola sommando gli esponenti, non moltiplicandoli né sommando le potenze stesse.` },
    { id: 'q-08', domanda: R`Quanto vale $a^0$, con $a \ne 0$?`, opzioni: [R`$0$`, R`$a$`, R`$1$`, R`Non è definito`], corretta: 2, spiegazione: R`Per convenzione (coerente con le proprietà delle potenze) $a^0 = 1$ per ogni $a \ne 0$. Il caso $0^0$ non si definisce.` },
    { id: 'q-09', domanda: R`Quanto vale $a^{-n}$, con $a \ne 0$?`, opzioni: [R`$-a^n$`, R`$\dfrac{1}{a^n}$`, R`$\dfrac{1}{a} \cdot n$`, R`$a^n$ cambiato di segno solo se $n$ è dispari`], corretta: 1, spiegazione: R`L'esponente negativo indica il reciproco della potenza con esponente positivo: $a^{-n} = \dfrac{1}{a^n}$.` },
    { id: 'q-10', domanda: R`Nella notazione scientifica $a \times 10^n$, quale condizione deve rispettare il coefficiente $a$?`, opzioni: [R`$0 < a < 1$`, R`$a$ deve essere un numero intero`, R`$1 \le |a| < 10$`, R`$a$ deve essere negativo`], corretta: 2, spiegazione: R`Il coefficiente ha esattamente una cifra non nulla prima della virgola: questo equivale a $1 \le |a| < 10$.` },
    { id: 'q-11', domanda: R`Per trovare l'ordine di grandezza di un numero scritto come $a \times 10^n$…`, opzioni: [R`si confronta $a$ con $5$: se $a < 5$ è $10^n$, altrimenti $10^{n+1}$`, R`è sempre $10^n$, qualunque sia $a$`, R`è sempre $10^{n+1}$, qualunque sia $a$`, R`dipende dal segno di $n$`], corretta: 0, spiegazione: R`Il coefficiente $a$ dice quale potenza di $10$ è più vicina al numero: sotto $5$ resta $10^n$, da $5$ in su si arrotonda a $10^{n+1}$.` },
    { id: 'q-12', domanda: R`Il valore assoluto $|x|$ rappresenta…`, opzioni: [R`il quadrato di $x$`, R`la distanza di $x$ dallo zero sulla retta reale`, R`l'opposto di $x$`, R`la parte intera di $x$`], corretta: 1, spiegazione: R`$|x|$ misura quanto $x$ è lontano da $0$, indipendentemente dal segno: per questo non è mai negativo.` },
    { id: 'q-13', domanda: R`Se $x < 0$, quanto vale $|x|$?`, opzioni: [R`$x$`, R`$-x$`, R`$0$`, R`$x^2$`], corretta: 1, spiegazione: R`Per $x < 0$ la definizione di valore assoluto dà $|x| = -x$, che in questo caso è un numero positivo.` },
    { id: 'q-14', domanda: R`Un numero primo è…`, opzioni: [R`un numero naturale dispari`, R`un numero naturale maggiore di $1$ con esattamente due divisori, $1$ e se stesso`, R`un numero naturale che non è multiplo di $2$`, R`qualunque numero naturale maggiore di $10$`], corretta: 1, spiegazione: R`La definizione richiede esattamente due divisori distinti: per questo il numero $1$, che ha un solo divisore, non è considerato primo.` },
    { id: 'q-15', domanda: R`Scomponendo $a = 2^2 \cdot 3$ e $b = 2 \cdot 3^2 \cdot 5$ in fattori primi, come si calcola il MCD$(a,b)$?`, opzioni: [R`Prendendo tutti i fattori, comuni e non, con l'esponente massimo`, R`Prendendo solo i fattori comuni, con l'esponente minimo tra i due`, R`Moltiplicando semplicemente $a$ per $b$`, R`Prendendo solo i fattori non comuni`], corretta: 1, spiegazione: R`Il MCD usa solo i fattori primi comuni a entrambi i numeri, ciascuno con l'esponente più basso: qui $2^1 \cdot 3^1 = 6$. La regola con l'esponente massimo, su tutti i fattori, è quella del mcm.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Nelle proprietà delle potenze con esponente zero o negativo, la base non può mai essere $0$: $0^{-2}$ e $0^0$ non hanno senso in questo contesto.` },
    { tipo: 'errore', testo: R`$-3^2$ e $(-3)^2$ non sono la stessa cosa: senza parentesi il segno meno non entra nell'elevamento a potenza. $-3^2 = -9$, ma $(-3)^2 = 9$.` },
    { tipo: 'metodo', testo: R`Per la frazione generatrice di un periodico misto, individua prima con chiarezza dove finisce l'antiperiodo e dove comincia il periodo: da lì la formula è automatica.` },
    { tipo: 'trucco', testo: R`Per stabilire se una frazione dà un decimale limitato, riducila ai minimi termini e guarda solo i fattori primi del denominatore: se sono soltanto $2$ e $5$, il decimale è limitato.` },
    { tipo: 'trucco', testo: R`Per trovare velocemente un razionale tra due dati, calcolane la media: funziona sempre, anche se i due numeri sono vicinissimi.` },
    { tipo: 'errore', testo: R`Nella notazione scientifica il coefficiente deve avere una sola cifra non nulla prima della virgola: $34{,}6 \times 10^4$ non è sbagliato come valore, ma non è forma scientifica corretta.` },
    { tipo: 'metodo', testo: R`Per MCD e mcm, scomponi sempre entrambi i numeri in fattori primi prima di ragionare: senza la scomposizione è facile sbagliare a "prendere" i fattori giusti.` },
    { tipo: 'trucco', testo: R`Controllo lampo su MCD e mcm: il MCD non supera mai il più piccolo dei due numeri, il mcm non è mai inferiore al più grande.` }
  ],

  aneddoti: [
    { matematico: 'Pitagora e Ippaso di Metaponto', anni: 'VI secolo a.C.', titolo: 'Il numero che non doveva esistere', testo: R`Per la scuola pitagorica, una comunità quasi religiosa fondata a Crotone, "tutto è numero": ogni lunghezza doveva potersi esprimere come rapporto tra due numeri interi. Fu quindi uno shock enorme scoprire che la diagonale di un quadrato di lato $1$, lunga $\sqrt{2}$, non si può scrivere come nessuna frazione: esisteva una lunghezza reale che il loro sistema numerico non riusciva a catturare. Si racconta che fu Ippaso di Metaponto a rendere pubblica questa scoperta, violando la segretezza della setta, e che per punizione venisse annegato in mare. È una leggenda tramandata dagli antichi e impossibile da verificare, ma rende bene l'idea di quanto la scoperta degli irrazionali sconvolgesse la visione del mondo dei pitagorici.`, legame: R`È la prima scoperta storica di un numero irrazionale: esattamente il $\sqrt{2}$ di cui in questo argomento si vede l'idea della dimostrazione.` },
    { matematico: 'Euclide', anni: 'IV–III secolo a.C.', titolo: 'Infiniti numeri primi, dimostrato senza contarli', testo: R`Negli "Elementi", il libro di geometria più ristampato della storia, Euclide non si limita alla geometria: nel nono libro dimostra che i numeri primi non finiscono mai, con un argomento che si può ripetere ancora oggi tale e quale. Si supponga che i numeri primi siano in numero finito, $p_1, p_2, \dots, p_n$: moltiplicandoli tutti insieme e aggiungendo $1$ si ottiene un numero che, diviso per uno qualsiasi dei $p_i$, dà sempre resto $1$. Questo numero, allora, o è esso stesso primo (e non era nell'elenco), oppure ha un fattore primo che non è nell'elenco: in entrambi i casi, l'elenco "completo" non lo era. Sempre negli Elementi, nel settimo libro, Euclide descrive anche un metodo per calcolare il massimo comun divisore di due numeri che i computer usano ancora oggi.`, legame: R`L'infinità dei numeri primi e l'algoritmo per il MCD vengono entrambi dagli Elementi di Euclide, duemilatrecento anni prima di questa pagina.` },
    { matematico: 'Eratostene di Cirene', anni: 'circa 276–194 a.C.', titolo: R`Un bastone, un'ombra e un crivello`, testo: R`Eratostene dirigeva la Biblioteca di Alessandria, il più grande centro di sapere del mondo antico, ed è ricordato soprattutto per un calcolo sorprendente: misurando l'ombra di un bastone verticale ad Alessandria e confrontandola con l'assenza di ombra nello stesso istante a Siene (l'odierna Assuan), stimò la circonferenza della Terra con un risultato sorprendentemente vicino al vero, usando solo geometria elementare. Ma Eratostene diede il suo nome anche a un metodo molto più semplice, che ogni studente può eseguire a mano: il "crivello", un setaccio che elimina via via tutti i multipli dei numeri già trovati, lasciando alla fine solo i numeri primi.`, legame: R`È il crivello dell'animazione nella sezione sui numeri primi: si cancellano i multipli, uno dopo l'altro, e restano i primi.` },
    { matematico: 'Georg Cantor', anni: '1845–1918', titolo: 'Infiniti di misure diverse', testo: R`Cantor si chiese se tutti gli insiemi infiniti avessero "la stessa quantità" di elementi, e trovò una risposta che scandalizzò molti matematici del suo tempo: $\mathbb{Q}$, per quanto denso, si può mettere in corrispondenza biunivoca con $\mathbb{N}$ (è "numerabile"), mentre $\mathbb{R}$ no. Con il suo celebre argomento diagonale, Cantor dimostrò che nessuna lista, per quanto lunga, può contenere tutti i numeri reali: esistono infiniti "più grandi" di altri infiniti. Matematici autorevoli come Leopold Kronecker lo attaccarono duramente, arrivando a definirlo un "ciarlatano" e un "corruttore della gioventù"; Cantor soffrì di gravi crisi depressive e trascorse gli ultimi anni in una clinica. La sua teoria degli insiemi, però, è oggi alla base di tutta la matematica moderna.`, legame: R`La differenza fra $\mathbb{Q}$, denso ma "numerabile" e pieno di buchi, e $\mathbb{R}$, che quei buchi li riempie, è la stessa distinzione che Cantor rese precisa con il concetto di cardinalità.` }
  ]
});
})();
