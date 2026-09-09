(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'insiemi-numerici',
  titolo: 'Insiemi numerici e potenze',

  introduzione: R`I numeri che usiamo non sono tutti dello stesso tipo: contare le pecore di un gregge, misurare un debito, dividere una pizza in tre parti uguali o calcolare la diagonale di un quadrato richiedono insiemi di numeri via via più ampi. La matematica organizza questa crescita in una catena di insiemi, ognuno contenuto nel successivo: $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$. Ogni ampliamento nasce per risolvere un'equazione che, nell'insieme precedente, non aveva soluzione.

A questi insiemi si affiancano le potenze, che sono prima di tutto un modo compatto di scrivere prodotti ripetuti, e la notazione scientifica, che serve a scrivere senza fatica numeri enormi (la distanza Terra-Sole) o piccolissimi (il diametro di un atomo). Il valore assoluto, infine, è il modo di misurare "quanto è lontano un numero da zero", ignorando il segno.

Per seguire questo argomento bastano le operazioni aritmetiche imparate alle medie: addizione, sottrazione, moltiplicazione, divisione e le prime potenze. Da qui in poi tutta l'algebra del liceo — equazioni, disequazioni, funzioni — lavora dentro questi insiemi, quindi vale la pena avere le idee chiare fin da subito.`,

  sezioni: [
    { id: 'insiemi-n-z-q', titolo: 'Naturali, interi, razionali', testo: R`I **numeri naturali** $\mathbb{N} = \{0, 1, 2, 3, \dots\}$ sono quelli con cui si conta: non esistono naturali negativi né naturali "tra" $3$ e $4$.

>* $\mathbb{N}$ serve per contare, ma non basta: l'equazione $x + 5 = 3$ non ha soluzione in $\mathbb{N}$, perché non esiste un naturale che sommato a $5$ dia $3$.

Per risolvere equazioni come questa si introducono i **numeri interi** $\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}$, che aggiungono ai naturali i loro opposti. Con $\mathbb{Z}$ la sottrazione è sempre possibile: $3 - 5 = -2$.

Ma anche $\mathbb{Z}$ ha un limite: $2x = 3$ non ha soluzione intera, perché non esiste un intero che moltiplicato per $2$ dia $3$. Servono i **numeri razionali**, l'insieme delle frazioni:

$$\mathbb{Q} = \left\{ \frac{m}{n} \ \middle|\ m, n \in \mathbb{Z},\ n \ne 0 \right\}$$

Ogni intero è anche razionale (basta scriverlo con denominatore $1$: $5 = \dfrac{5}{1}$), quindi $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q}$. In $\mathbb{Q}$ la divisione è sempre possibile, tranne che per $0$.

Attenzione a non confondere l'insieme con la scrittura: $\dfrac{6}{2}$ è una frazione, ma il numero che rappresenta, $3$, è intero. Un numero appartiene sempre al **più piccolo** insieme che lo contiene: $\dfrac{6}{2} \in \mathbb{Z}$ (e quindi anche $\in \mathbb{Q}$), non solo $\in \mathbb{Q}$.

>! Errore frequente: pensare che "intero" voglia dire "positivo". $-8$ è un numero intero a tutti gli effetti; "naturale" invece esclude i negativi.` },

    { id: 'numeri-reali', titolo: 'I numeri reali e la retta', testo: R`Nemmeno $\mathbb{Q}$ basta: come vedremo più avanti, non esiste nessuna frazione $\dfrac{m}{n}$ il cui quadrato sia $2$, eppure un quadrato di lato $1$ ha una diagonale ben precisa, lunga $\sqrt{2}$. I numeri come $\sqrt{2}$, che non si scrivono come frazione, si dicono **irrazionali**. L'unione dei razionali e degli irrazionali è l'insieme dei **numeri reali** $\mathbb{R}$.

>* $\mathbb{R}$ = numeri razionali $\cup$ numeri irrazionali. La catena completa è $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$.

A ogni numero reale corrisponde uno e un solo punto della retta orientata (fissata un'origine e un'unità di misura), e viceversa: per questo si parla di **retta reale**. I numeri negativi stanno a sinistra dell'origine, quelli positivi a destra, e la distanza dall'origine cresce con il valore assoluto del numero.

[[grafico:retta]]

Sulla retta, razionali e irrazionali convivono senza lasciare spazi vuoti visibili: tra $-2$ e $\pi$ si affollano infiniti numeri di entrambi i tipi. La sezione sulla densità mostra perché, nonostante questo affollamento, $\mathbb{Q}$ da solo non "riempie" completamente la retta.

Il percorso di ampliamento non finisce qui: più avanti, per risolvere equazioni come $x^2 = -1$ (nessun numero reale elevato al quadrato è negativo), si introdurrà un insieme ancora più grande, i **numeri complessi** $\mathbb{C}$, con $\mathbb{R} \subset \mathbb{C}$.

>! Errore frequente: credere che "numero reale" sia sinonimo di "numero razionale". $\pi$ e $\sqrt{2}$ sono reali a pieno titolo, semplicemente non sono frazioni.` },

    { id: 'frazioni-decimali', titolo: 'Frazioni e numeri decimali', testo: R`Dividendo il numeratore per il denominatore, ogni frazione produce un numero decimale di uno di questi due tipi.

Un decimale **limitato** ha un numero finito di cifre dopo la virgola: $\dfrac{3}{8} = 0{,}375$. Questo succede sempre e solo quando, ridotta ai minimi termini, la frazione ha al denominatore soltanto i fattori primi $2$ e $5$ (quelli della base $10$).

Un decimale **periodico** ripete all'infinito lo stesso blocco di cifre, il **periodo**: $\dfrac{1}{3} = 0{,}\overline{3} = 0{,}333\dots$ è periodico **semplice** (il periodo comincia subito dopo la virgola); $\dfrac{1}{6} = 0{,}1\overline{6} = 0{,}1666\dots$ è periodico **misto**, con un **antiperiodo** ($1$) prima del periodo ($6$).

Il percorso inverso, dal decimale alla frazione che lo genera (la **frazione generatrice**), segue una regola precisa: al numeratore la differenza tra il numero scritto senza virgola (fino a un periodo) e la sua parte non periodica; al denominatore tanti $9$ quante le cifre del periodo, seguiti da tanti $0$ quante le cifre dell'antiperiodo (vedi formulario). Per esempio $0{,}41\overline{6} = \dfrac{416 - 41}{900} = \dfrac{375}{900} = \dfrac{5}{12}$.

>* Ogni numero decimale limitato o periodico è razionale (è una frazione); un decimale con infinite cifre **senza** alcun periodo non lo è.

>! Errore frequente: pensare che $0{,}\overline{9}$ sia "quasi $1$, ma non proprio". Applicando la formula del periodico semplice, $0{,}\overline{9} = \dfrac{9}{9} = 1$: sono esattamente lo stesso numero, scritto in due modi.` },

    { id: 'densita-completezza', titolo: 'Densità di Q e non completezza', testo: R`I numeri razionali hanno una proprietà sorprendente: tra due razionali distinti qualsiasi, per quanto vicini, ce n'è sempre un altro. Basta prendere la loro **media**: tra $\dfrac{1}{2}$ e $1$ c'è $\dfrac{3}{4}$; tra $\dfrac{1}{2}$ e $\dfrac{3}{4}$ c'è $\dfrac{5}{8}$; e così via, senza fine. Questa proprietà si chiama **densità**: $\mathbb{Q}$ è denso in $\mathbb{R}$.

>* **Densità di $\mathbb{Q}$:** tra due numeri razionali qualsiasi esistono infiniti altri numeri razionali.

Eppure, per quanto denso, $\mathbb{Q}$ ha dei "buchi". Si considerino tutti i razionali il cui quadrato è minore di $2$: questo insieme cresce (per esempio contiene $1$, $1{,}4$, $1{,}41$, $1{,}414\dots$) ma non ha un confine superiore razionale che gli appartenga o che sia il "più piccolo" tra i confini razionali possibili — il candidato naturale sarebbe $\sqrt{2}$, che, come si vede nella prossima sezione, non è razionale. La retta dei soli razionali, vista da vicino, avrebbe un vuoto proprio dove dovrebbe stare $\sqrt{2}$.

$\mathbb{R}$ risolve il problema: aggiungendo tutti gli irrazionali, ogni punto della retta trova un numero che gli corrisponde. Questa proprietà si chiama **completezza**, e distingue $\mathbb{R}$ da $\mathbb{Q}$.

>! Errore frequente: confondere densità e completezza. Denso vuol dire "non ci sono coppie di razionali senza un altro razionale in mezzo"; completo vuol dire "non mancano numeri per rappresentare ogni punto della retta". $\mathbb{Q}$ ha la prima proprietà ma non la seconda.` },

    { id: 'irrazionali', titolo: 'I numeri irrazionali', testo: R`Un numero **irrazionale** è un numero reale che non si può scrivere come frazione $\dfrac{m}{n}$ con $m, n$ interi: nella sua rappresentazione decimale ha infinite cifre, senza che nessun blocco si ripeta mai in modo periodico.

Il primo esempio scoperto nella storia, e il più famoso, è $\sqrt{2}$. Se ne può dare l'idea della dimostrazione per assurdo: si suppone che $\sqrt{2}$ sia razionale, cioè $\sqrt{2} = \dfrac{p}{q}$ con $p, q$ interi senza fattori comuni (frazione ridotta ai minimi termini). Elevando al quadrato, $p^2 = 2q^2$: quindi $p^2$ è pari, e questo costringe anche $p$ a essere pari (il quadrato di un dispari è sempre dispari). Scrivendo $p = 2k$, si ottiene $4k^2 = 2q^2$, cioè $q^2 = 2k^2$: con lo stesso ragionamento, anche $q$ deve essere pari. Ma allora $p$ e $q$ sono entrambi pari, contraddicendo l'ipotesi che non avessero fattori comuni. L'assurdo dimostra che $\sqrt{2}$ non può essere scritto come frazione.

Sono irrazionali anche $\sqrt{3}$, $\sqrt{5}$ e, in generale, la radice quadrata di ogni naturale che non sia un quadrato perfetto; e sono irrazionali due costanti che si incontreranno più avanti, $\pi$ (rapporto tra circonferenza e diametro) ed $e$ (base dei logaritmi naturali), anche se dimostrarlo è molto più difficile che per $\sqrt{2}$.

>* $\mathbb{R} = \mathbb{Q} \cup \{\text{numeri irrazionali}\}$. Esattamente come $\mathbb{Q}$, anche l'insieme degli irrazionali è denso in $\mathbb{R}$: tra due razionali c'è sempre un irrazionale, e viceversa.

>! Errore frequente: pensare che basti "non vedere un periodo nelle prime cifre" per concludere che un numero è irrazionale. Un numero come $0{,}101001000100001\dots$ (con blocchi di zeri sempre più lunghi) è davvero irrazionale, ma solo perché si può dimostrare che non esiste **alcun** periodo, non perché non se ne vede uno a occhio nelle prime cifre.` },

    { id: 'potenze', titolo: 'Potenze ed esponenti', testo: R`Per un esponente **naturale** $n \ge 1$, la potenza $a^n$ è il prodotto di $n$ fattori uguali ad $a$: $a^n = a \cdot a \cdots a$. Per completare la definizione a $n = 0$ si pone $a^0 = 1$, purché $a \ne 0$ (il caso $0^0$ non ha un valore univoco e qui non si definisce).

Da queste definizioni seguono le proprietà che permettono di calcolare senza sviluppare i prodotti:

| proprietà | regola |
|---|---|
| prodotto di potenze (stessa base) | $a^m \cdot a^n = a^{m+n}$ |
| quoziente di potenze (stessa base, $a \ne 0$) | $a^m : a^n = a^{m-n}$ |
| potenza di potenza | $(a^m)^n = a^{m \cdot n}$ |
| potenza di un prodotto | $(a \cdot b)^n = a^n \cdot b^n$ |
| potenza di un quoziente ($b \ne 0$) | $(a : b)^n = a^n : b^n$ |

La proprietà del quoziente, applicata quando $n > m$, produce un esponente negativo: per esempio $\dfrac{2^3}{2^5} = 2^{3-5} = 2^{-2}$. Per dare senso a questo scritto si estende la potenza all'**esponente intero negativo**: $a^{-n} = \dfrac{1}{a^n}$, con $a \ne 0$. Con questa definizione le stesse cinque proprietà continuano a valere anche con esponenti negativi, senza eccezioni.

Un quadrato è sempre non negativo, ma occhio all'ordine delle operazioni: in $-3^2$ l'elevamento a potenza si esegue prima del meno, quindi $-3^2 = -9$; per elevare al quadrato anche il segno serve la parentesi, $(-3)^2 = 9$.

Le potenze con esponente naturale sono anche legate a una figura sorprendente: la somma dei primi $n$ numeri dispari è sempre un quadrato perfetto, $n^2$.

[[animazione:somma-dispari]]

>! Errore frequente: applicare la proprietà del prodotto a basi diverse, scrivendo $2^3 \cdot 3^2 = 6^5$. Le proprietà delle potenze richiedono la **stessa base** (o lo stesso esponente, per prodotti e quozienti "in croce" come $a^n \cdot b^n = (ab)^n$).` },

    { id: 'notazione-scientifica', titolo: 'Notazione scientifica e ordine di grandezza', testo: R`Per scrivere numeri molto grandi o molto piccoli senza contare gli zeri a mano, si usa la **notazione scientifica**: $a \times 10^n$, dove $1 \le |a| < 10$ (il **coefficiente**, o mantissa) e $n$ è un intero (l'**esponente**).

Per esempio la distanza media Terra-Sole, circa $150\,000\,000$ km, si scrive $1{,}5 \times 10^8$ km; il raggio di un atomo di idrogeno, circa $0{,}00000005$ mm, si scrive $5 \times 10^{-8}$ mm. Per passare dalla forma estesa alla notazione scientifica si sposta la virgola fino a lasciare una sola cifra diversa da zero prima di essa, e si conta di quante posizioni ci si è spostati: quel numero (con il segno giusto) è l'esponente.

Legato alla notazione scientifica c'è l'**ordine di grandezza**: la potenza di $10$ più vicina al numero. Per trovarlo si scrive il numero in notazione scientifica $a \times 10^n$ e si guarda il coefficiente $a$: se $a < 5$, l'ordine di grandezza è $10^n$; se $a \ge 5$, è la potenza successiva, $10^{n+1}$. Per esempio $346\,000 = 3{,}46 \times 10^5$ ha ordine di grandezza $10^5$ (perché $3{,}46 < 5$); invece $0{,}00068 = 6{,}8 \times 10^{-4}$ ha ordine di grandezza $10^{-3}$ (perché $6{,}8 \ge 5$, si sale di una potenza).

L'ordine di grandezza è comodo per stime rapide e per capire subito quanto sono diversi due numeri: la popolazione di un paese (ordine $10^7$) e quella del pianeta (ordine $10^{10}$) differiscono di tre ordini di grandezza, cioè di un fattore vicino a mille.

>! Errore frequente: lasciare il coefficiente fuori dall'intervallo $[1, 10)$, per esempio scrivendo $34{,}6 \times 10^4$ invece di $3{,}46 \times 10^5$. Non è sbagliato come numero, ma non è notazione scientifica corretta.` },

    { id: 'valore-assoluto', titolo: 'Il valore assoluto', testo: R`Il **valore assoluto** (o modulo) di un numero $x$, scritto $|x|$, è la distanza di $x$ dallo zero sulla retta reale, senza tener conto del segno:

$$|x| = \begin{cases} x & \text{se } x \ge 0 \\ -x & \text{se } x < 0 \end{cases}$$

Per esempio $|5| = 5$ e $|-5| = 5$: due numeri opposti hanno lo stesso valore assoluto, perché sono alla stessa distanza da $0$, uno a destra e uno a sinistra. Più in generale, $|a - b|$ è la distanza fra i due numeri $a$ e $b$ sulla retta, in qualunque ordine si sottraggano: $|7 - 3| = |3 - 7| = 4$.

Prova a trascinare il punto $P$ nel grafico: qualunque posizione scegli, $|p|$ misura sempre quanto $P$ è lontano dall'origine, e non è mai negativo.

[[grafico:distanza]]

Il valore assoluto compare spesso in geometria (la lunghezza di un segmento non è mai negativa) e in fisica (l'intensità di una grandezza, indipendentemente dal verso). Più avanti si studieranno equazioni e disequazioni che contengono il valore assoluto di un'espressione, ma il concetto di base è già tutto qui: una distanza.

>! Errore frequente: pensare che $-x$ sia sempre un numero negativo. Se $x = -5$, allora $-x = 5$ è positivo: il segno "meno" davanti a una lettera cambia il segno del valore che la lettera rappresenta, non rende negativo il risultato per forza. Per questo, nella definizione di $|x|$, il caso $x < 0$ dà come risultato $-x$, che in quel caso è positivo.` },

    { id: 'numeri-primi-scomposizione', titolo: 'Numeri primi, scomposizione, MCD e mcm', testo: R`Un numero naturale maggiore di $1$ è **primo** se ha esattamente due divisori distinti: $1$ e se stesso. Il numero $1$ non è considerato primo (ha un solo divisore); i numeri maggiori di $1$ che non sono primi si dicono **composti**. Un modo antico ed efficace per trovarli tutti fino a un certo limite è il crivello di Eratostene: si scrivono i numeri in ordine e si cancellano via via tutti i multipli di ogni numero non ancora cancellato, a partire da $2$.

[[animazione:crivello]]

Ogni numero composto si può scrivere in un unico modo (a meno dell'ordine dei fattori) come prodotto di numeri primi: è il **teorema fondamentale dell'aritmetica**. Per esempio $360 = 2^3 \cdot 3^2 \cdot 5$.

>* La scomposizione in fattori primi è unica: per questo è lo strumento giusto per confrontare due numeri, come nel calcolo di MCD e mcm.

Il **massimo comun divisore** (MCD) di due o più numeri è il più grande numero che li divide tutti; il **minimo comune multiplo** (mcm) è il più piccolo numero che è multiplo di tutti loro. Scomponendo in fattori primi, si trovano così: il MCD prendendo i fattori primi **comuni** con l'esponente **più piccolo**; il mcm prendendo tutti i fattori primi (comuni e non comuni) con l'esponente **più grande**.

Esempio: $36 = 2^2 \cdot 3^2$ e $60 = 2^2 \cdot 3 \cdot 5$. Il MCD prende $2$ e $3$ con l'esponente minimo tra i due numeri: $2^2 \cdot 3 = 12$. Il mcm prende $2$, $3$ e $5$ con l'esponente massimo: $2^2 \cdot 3^2 \cdot 5 = 180$.

>! Errore frequente: scambiare le due regole, cioè usare l'esponente massimo per il MCD o dimenticare nel mcm i fattori che compaiono in un solo numero. Un controllo rapido: il MCD non può mai essere più grande del più piccolo dei numeri di partenza; il mcm non può mai essere più piccolo del più grande.` }
  ],

  grafici: {
    retta: {
      tipo: 'retta-reale', x: [-3, 4],
      intervalli: [],
      punti: [
        { x: -2, etichetta: '−2' },
        { x: -0.5, etichetta: '−1/2' },
        { x: 0, etichetta: '0' },
        { x: 1.41421356, etichetta: '√2' },
        { x: 3.14159265, etichetta: 'π' }
      ],
      didascalia: 'Razionali (−2, −1/2, 0) e irrazionali (√2, π) sulla stessa retta: ogni numero reale ha il suo posto, senza vuoti.'
    },
    distanza: {
      tipo: 'piano', x: [-6, 6], y: [-2, 3],
      parametri: [{ nome: 'p', min: -5, max: 5, passo: 0.5, valore: 3, nascosto: true }],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: ['p', 0], etichetta: '', tratteggio: true, colore: 2 },
        { tipo: 'punto', p: [0, 0], etichetta: 'O', posizione: 'basso' },
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-5.5, 2.2], testo: 'p = {{p}}    |p| = {{abs(p)}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P lungo l\'asse: |p| è sempre la distanza fra P e l\'origine O, a destra o a sinistra non cambia nulla.'
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
      R`$0{,}41\overline{6} = \dfrac{375}{900}$. Dividendo numeratore e denominatore per $75$: $\dfrac{5}{12}$.`
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
    { id: 'fc-04', sezione: 'insiemi-n-z-q', tipo: 'concetto', fronte: R`Perché si passa da $\mathbb{N}$ a $\mathbb{Z}$ a $\mathbb{Q}$?`, retro: R`Ogni insieme nuovo risolve un'equazione che nel precedente non aveva soluzione: $x + 5 = 3$ serve $\mathbb{Z}$, $2x = 3$ serve $\mathbb{Q}$.` },
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
    { id: 'es-01', difficolta: 1, testo: R`A quale insieme, tra $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, indicalo come "N", "Z" o "Q", appartiene $-\dfrac{9}{3}$, scegliendo il più piccolo possibile?`, suggerimenti: [R`Prima semplifica la frazione.`, R`$-\dfrac{9}{3} = -3$: è un numero negativo, quindi non può essere naturale.`], risposta: { tipo: 'testo', accettate: ['z', 'zeta', 'interi'] }, soluzione: [R`$-\dfrac{9}{3} = -3$, un numero intero negativo.`, R`Non è naturale (è negativo), ma è intero: il più piccolo insieme che lo contiene è $\mathbb{Z}$.`] },
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
    { id: 'q-01', domanda: R`Qual è il più piccolo tra gli insiemi $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$ che contiene tutti gli altri?`, opzioni: [R`$\mathbb{Q}$`, R`$\mathbb{Z}$`, R`$\mathbb{R}$`, R`$\mathbb{N}$`], corretta: 2, spiegazione: R`La catena è $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$: $\mathbb{R}$ è il più grande e contiene tutti gli altri.` },
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
    { matematico: 'Pitagora e Ippaso di Metaponto', anni: 'VI secolo a.C.', titolo: 'Il numero che non doveva esistere', testo: R`Per la scuola pitagorica, una comunità quasi religiosa fondata a Crotone, "tutto è numero": ogni lunghezza doveva potersi esprimere come rapporto tra due numeri interi. Fu quindi uno shock enorme scoprire che la diagonale di un quadrato di lato $1$, lunga $\sqrt{2}$, non si può scrivere come nessuna frazione: esisteva una lunghezza reale che il loro sistema numerico non riusciva a catturare. Si racconta che fu Ippaso di Metaponto a rendere pubblica questa scoperta, violando la segretezza della setta, e che per punizione venisse annegato in mare — una leggenda tramandata dagli antichi, impossibile da verificare con certezza, ma che rende bene l'idea di quanto la scoperta degli irrazionali sconvolgesse la visione del mondo dei pitagorici.`, legame: R`È la prima scoperta storica di un numero irrazionale: esattamente il $\sqrt{2}$ di cui in questo argomento si vede l'idea della dimostrazione.` },
    { matematico: 'Euclide', anni: 'IV–III secolo a.C.', titolo: 'Infiniti numeri primi, dimostrato senza contarli', testo: R`Negli "Elementi", il libro di geometria più ristampato della storia, Euclide non si limita alla geometria: nel nono libro dimostra che i numeri primi non finiscono mai, con un argomento che si può ripetere ancora oggi tale e quale. Si supponga che i numeri primi siano in numero finito, $p_1, p_2, \dots, p_n$: moltiplicandoli tutti insieme e aggiungendo $1$ si ottiene un numero che, diviso per uno qualsiasi dei $p_i$, dà sempre resto $1$. Questo numero, allora, o è esso stesso primo (e non era nell'elenco), oppure ha un fattore primo che non è nell'elenco: in entrambi i casi, l'elenco "completo" non lo era. Sempre negli Elementi, nel settimo libro, Euclide descrive anche un metodo — ancora oggi il più efficiente — per calcolare il massimo comun divisore di due numeri.`, legame: R`L'infinità dei numeri primi e l'algoritmo per il MCD vengono entrambi dagli Elementi di Euclide, duemilatrecento anni prima di questa pagina.` },
    { matematico: 'Eratostene di Cirene', anni: 'circa 276–194 a.C.', titolo: R`Un bastone, un'ombra e un crivello`, testo: R`Eratostene dirigeva la Biblioteca di Alessandria, il più grande centro di sapere del mondo antico, ed è ricordato soprattutto per un calcolo sorprendente: misurando l'ombra di un bastone verticale ad Alessandria e confrontandola con l'assenza di ombra nello stesso istante a Siene (l'odierna Assuan), stimò la circonferenza della Terra con un errore di pochi punti percentuali, usando solo geometria elementare. Ma Eratostene diede il suo nome anche a un metodo molto più semplice, che ogni studente può eseguire a mano: il "crivello", un setaccio che elimina via via tutti i multipli dei numeri già trovati, lasciando alla fine solo i numeri primi.`, legame: R`È esattamente il crivello dell'animazione qui sopra: cancellare i multipli, uno per uno, per isolare i numeri primi.` },
    { matematico: 'Georg Cantor', anni: '1845–1918', titolo: 'Infiniti di misure diverse', testo: R`Cantor si chiese se tutti gli insiemi infiniti avessero "la stessa quantità" di elementi, e trovò una risposta che scandalizzò molti matematici del suo tempo: $\mathbb{Q}$, per quanto denso, si può mettere in corrispondenza biunivoca con $\mathbb{N}$ (è "numerabile"), mentre $\mathbb{R}$ no. Con il suo celebre argomento diagonale, Cantor dimostrò che nessuna lista, per quanto lunga, può contenere tutti i numeri reali: esistono infiniti "più grandi" di altri infiniti. Matematici autorevoli come Leopold Kronecker lo attaccarono duramente, arrivando a definirlo un "ciarlatano" e un "corruttore della gioventù"; Cantor soffrì di gravi crisi depressive e trascorse gli ultimi anni in una clinica. La sua teoria degli insiemi, però, è oggi alla base di tutta la matematica moderna.`, legame: R`La differenza fra $\mathbb{Q}$, denso ma "numerabile" e pieno di buchi, e $\mathbb{R}$, che quei buchi li riempie, è la stessa distinzione che Cantor rese precisa con il concetto di cardinalità.` }
  ]
});
})();
