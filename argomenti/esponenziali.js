(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'esponenziali',
  titolo: 'Esponenziali',

  introduzione: R`La funzione esponenziale è quella in cui la variabile non sta più alla base, ma all'**esponente**: $y = a^x$, con $a$ un numero positivo fisso. È un cambiamento profondo nel modo in cui le cose crescono: in una funzione lineare l'incremento a ogni passo è sempre lo stesso, mentre in una funzione esponenziale è la grandezza raggiunta a decidere quanto crescerà nel passo successivo. Per questo una crescita esponenziale, anche se all'inizio sembra lenta, finisce sempre per superare qualunque crescita lineare o polinomiale.

Si incontra ogni volta che una quantità cambia di una **percentuale costante** a ogni intervallo di tempo: un capitale che frutta un interesse composto, una popolazione di batteri che raddoppia a intervalli regolari, il numero di persone raggiunte da un messaggio condiviso a catena, la dose di un farmaco che si dimezza nel sangue ogni tante ore. Anche il decadimento radioattivo, alla base della datazione con il carbonio-14, segue una legge esponenziale, solo con base minore di $1$.

Per seguire bene questo argomento servono le funzioni in generale (dominio, immagine, crescenza) e le proprietà delle potenze con esponente intero e razionale, oltre a saper maneggiare i radicali.`,

  sezioni: [
    { id: 'potenze-esponente-reale', titolo: 'Potenze con esponente reale', testo: R`Fin qui l'esponente di una potenza è stato un numero intero: $a^n$ significa "$a$ moltiplicato per sé stesso $n$ volte", e $a^{-n} = \dfrac{1}{a^n}$. Con l'esponente **razionale** si estende la definizione mantenendo le stesse proprietà delle potenze:

>* **Potenza con esponente razionale:** $$a^{\frac{m}{n}} = \sqrt[n]{a^m}, \qquad a > 0.$$ Per esempio $8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4$: prima la radice, poi il quadrato (o nell'ordine opposto, il risultato non cambia).

Perché la condizione $a>0$? Con basi negative alcune radici non esistono in $\mathbb{R}$ (per esempio $\sqrt{-4}$), e scritture equivalenti dello stesso esponente come frazione darebbero risultati diversi: una situazione poco maneggevole, che si evita richiedendo $a>0$.

Resta un ultimo passo: che senso ha $2^{\sqrt2}$, dove l'esponente non è nemmeno una frazione? Non si può scrivere come radice, ma si può **avvicinare**: $\sqrt2 = 1{,}41421\ldots$ è il limite delle approssimazioni razionali $1$, $1{,}4$, $1{,}41$, $1{,}414$, $\ldots$, e i valori $2^1$, $2^{1{,}4}$, $2^{1{,}41}$, $2^{1{,}414}$, $\ldots$ si avvicinano a loro volta a un unico numero: quello è, per definizione, $2^{\sqrt2}$. Non è una dimostrazione rigorosa (quella richiede i limiti, visti più avanti), ma basta per accettare che, se $a>0$, l'espressione $a^x$ ha senso per **ogni** numero reale $x$, non solo per interi o frazioni.

[[grafico:scopriPotenza]]

>! $a^{1/n}$ non è definita in $\mathbb{R}$ se $a<0$ e $n$ è pari (per esempio $(-4)^{1/2}=\sqrt{-4}$ non esiste), mentre se $n$ è dispari lo è ($(-8)^{1/3}=-2$). Per evitare queste eccezioni, da qui in avanti si lavora sempre con basi $a>0$.` },

    { id: 'proprieta-potenze', titolo: 'Le proprietà delle potenze', testo: R`Le proprietà delle potenze imparate con gli esponenti interi restano valide, senza eccezioni, anche con esponenti razionali o reali qualsiasi, purché le basi siano positive.

>* **Proprietà delle potenze**, per $a,b>0$ e $x,y \in \mathbb{R}$: $$a^x \cdot a^y = a^{x+y}, \qquad \dfrac{a^x}{a^y} = a^{x-y}, \qquad \left(a^x\right)^y = a^{xy}, \qquad (ab)^x = a^x b^x, \qquad a^0=1.$$

Servono per manipolare le espressioni prima di risolvere un'equazione o una disequazione. Per esempio $9^x$ si riscrive come $\left(3^2\right)^x = 3^{2x}$, e $\sqrt{2^x} = 2^{x/2}$: trasformazioni di questo tipo, basate su $\left(a^x\right)^y=a^{xy}$, servono continuamente per ricondurre due potenze alla stessa base.

Un altro uso frequente è raccogliere un fattore comune: $2^{x+2} = 2^x \cdot 2^2 = 4 \cdot 2^x$, quindi un'equazione come $2^{x+2} - 2^x = 24$ diventa $4 \cdot 2^x - 2^x = 24$, cioè $3 \cdot 2^x = 24$, da cui $2^x = 8$.

>! $a^x \cdot b^x$ **non** diventa $a^x+b^x$ né $(a+b)^x$: le basi si moltiplicano fra loro, $a^x \cdot b^x = (ab)^x$, solo se gli **esponenti** sono uguali. E $a^x + a^y$ non si semplifica in $a^{x+y}$: le proprietà valgono per prodotti, quozienti e potenze di potenze, mai per le somme.` },

    { id: 'funzione-esponenziale', titolo: 'La funzione esponenziale e il suo grafico', testo: R`La **funzione esponenziale** di base $a$ è $y=a^x$, con $a>0$ e $a \ne 1$: la variabile è l'esponente, non la base.

[[animazione:crescita-esponenziale]]

>* **Funzione esponenziale:** $y=a^x$, con $a>0$, $a \ne 1$. Dominio $\mathbb{R}$, immagine $(0,+\infty)$: il grafico passa sempre per $(0;1)$ (perché $a^0=1$) e ha come asintoto orizzontale la retta $y=0$, che non tocca mai, perché $a^x$ non è mai né nulla né negativa.

Il comportamento dipende dal confronto fra $a$ e $1$:

- se $a>1$ la funzione è **crescente**: più cresce $x$, più cresce $a^x$, sempre più in fretta;
- se $0<a<1$ la funzione è **decrescente**: $a^x$ si avvicina a $0$ man mano che $x$ cresce.

Prova a muovere il cursore $a$ nel grafico: la curva ruota intorno al punto fisso $(0;1)$, passando da crescente a decrescente quando $a$ attraversa il valore $1$.

[[grafico:famigliaEsponenziali]]

La ragione per cui si esclude $a=1$ è che $1^x=1$ per ogni $x$: sarebbe una funzione costante, non una vera esponenziale, priva di crescenza o decrescenza.

>! Il grafico di $y=a^x$ sta sempre **sopra** l'asse $x$: non esiste alcun valore di $x$ per cui $a^x=0$ oppure $a^x<0$. Un errore frequente è pensare che l'asintoto $y=0$ venga toccato per $x$ molto negativo (o molto positivo, se $0<a<1$): la curva si avvicina quanto si vuole, ma non lo raggiunge mai.` },

    { id: 'numero-e', titolo: 'Il numero di Nepero e la funzione esponenziale naturale', testo: R`Fra tutte le basi possibili, ce n'è una che compare così spesso in natura e in matematica da meritare un simbolo tutto suo: il **numero di Nepero** $e$.

>* **Numero di Nepero:** $$e = \lim_{n \to \infty} \left(1+\dfrac1n\right)^n \approx 2{,}718281828\ldots$$ È un numero irrazionale (anzi trascendente): la sua scrittura decimale non si ripete né termina mai.

Il limite nasce da un problema concreto: capitalizzare un interesse sempre più spesso (mensilmente, giornalmente, istante per istante) fa crescere il montante, ma non senza limite, perché il fattore di crescita si avvicina proprio a $e$. Con $n=10$ si ottiene $\left(1+\frac1{10}\right)^{10} \approx 2{,}594$; con $n=1000$, $\approx 2{,}717$: i valori si stabilizzano intorno a $2{,}71828$.

La funzione $y=e^x$, detta **esponenziale naturale**, ha una proprietà che nessun'altra base possiede: nel punto $(0;1)$ la retta tangente al grafico ha pendenza esattamente $1$, uguale al valore della funzione in quel punto. È il motivo per cui $e^x$ è la base "naturale" per l'analisi: la sua velocità di crescita istantanea coincide, in ogni punto, con il suo stesso valore.

[[grafico:tangenteE]]

Con base $e$ si scrivono quasi tutti i modelli continui di crescita e decadimento (popolazioni, capitali, radioattività), spesso nella forma $e^{kt}$: il segno di $k$ decide se il fenomeno cresce o decade.

>! $e$ non è una lettera scelta a caso, né un'approssimazione arrotondata di $2{,}7$: è un numero ben preciso, definito da quel limite, che in analisi compare quanto $\pi$ compare in geometria. Il logaritmo con base $e$ si chiama logaritmo naturale, $\ln x$, ed è il protagonista del prossimo argomento.` },

    { id: 'equazioni-esponenziali', titolo: 'Equazioni esponenziali', testo: R`Un'**equazione esponenziale** ha l'incognita a esponente. La strategia dipende da come sono fatte le basi.

### Basi già uguali

Se l'equazione si riduce alla forma $a^{f(x)}=a^{g(x)}$ con la stessa base $a>0$, $a \ne 1$, si uguagliano gli esponenti:

>* $$a^{f(x)} = a^{g(x)} \iff f(x)=g(x), \qquad (a>0,\ a\ne1).$$ Vale perché $y=a^x$ è **iniettiva**: a esponenti diversi corrispondono sempre valori diversi.

Per esempio $3^{x+2}=3^{4x-1}$ dà subito $x+2=4x-1$, cioè $x=1$.

### Basi riconducibili alla stessa base

Se le basi sono diverse ma sono potenze di uno stesso numero, si riscrivono prima. $8^x=16^{x-1}$ diventa $2^{3x}=2^{4(x-1)}$, cioè $3x=4x-4$, da cui $x=4$.

### Sostituzione $t=a^x$

Quando l'incognita compare in più potenze della stessa base, con esponenti multipli l'uno dell'altro, conviene porre $t=a^x$ e risolvere prima in $t$. $9^x-4\cdot3^x-45=0$, con $9^x=\left(3^x\right)^2$, diventa $t^2-4t-45=0$ ponendo $t=3^x$: si trova $t=9$ oppure $t=-5$. Poiché $3^x$ è sempre positivo, $t=-5$ va scartata; da $3^x=9=3^2$ si ricava $x=2$.

Un'ultima situazione è quella in cui basta **isolare la potenza**: $2^x=8$ si risolve scrivendo $8=2^3$ e uguagliando gli esponenti, $x=3$; sul grafico è il punto in cui $y=2^x$ incontra la retta $y=8$.

[[grafico:equazioneEsponenziale]]

>! Nella sostituzione $t=a^x$ la condizione $t>0$ non è un dettaglio: ogni soluzione $t \le 0$ va scartata *prima* di tornare a $x$, altrimenti si cerca una $x$ per cui $a^x$ sarebbe negativo o nullo, cosa che non può mai accadere.` },

    { id: 'disequazioni-esponenziali', titolo: 'Disequazioni esponenziali', testo: R`Anche le **disequazioni esponenziali** con basi uguali si riducono a un confronto fra esponenti, ma con un'attenzione in più rispetto alle equazioni: bisogna guardare se la base è maggiore o minore di $1$.

>* **Disequazioni esponenziali** (basi uguali): $$a>1: \quad a^{f(x)} > a^{g(x)} \iff f(x) > g(x) \qquad\qquad 0<a<1: \quad a^{f(x)} > a^{g(x)} \iff f(x) < g(x).$$ Con $a>1$ il verso della disuguaglianza si **conserva**; con $0<a<1$ si **inverte**.

La ragione è il grafico: se $a>1$ la funzione è crescente, quindi esponenti più grandi danno valori più grandi, verso conservato. Se $0<a<1$ la funzione è decrescente: esponenti più grandi danno valori **più piccoli**, quindi il verso si rovescia.

Esempio con $a>1$: $3^{2x+1} \ge 3^{x+4}$ diventa $2x+1 \ge x+4$ (verso conservato), cioè $x \ge 3$.

Esempio con $0<a<1$: $\left(\dfrac14\right)^{2x-1} \le \left(\dfrac14\right)^{x+5}$ diventa $2x-1 \ge x+5$ (verso **invertito**, perché la base è $\frac14<1$), cioè $x \ge 6$.

Quando le basi non sono uguali ma riconducibili a una base comune, si trasformano prima, esattamente come nelle equazioni, e solo dopo si confrontano gli esponenti con il verso giusto.

>! L'errore più comune è applicare sempre lo stesso verso, per abitudine presa dalle disequazioni fra numeri. Prima di confrontare gli esponenti, la domanda da farsi è sempre: la base è maggiore o minore di $1$? Da questo dipende tutto.` },

    { id: 'modelli-crescita-decadimento', titolo: 'Modelli di crescita e decadimento', testo: R`La funzione esponenziale è il modello naturale per ogni fenomeno che cambia di una **percentuale costante** a ogni intervallo di tempo, invece che di una quantità costante.

>* **Modello esponenziale:** $$y(t) = y_0 \cdot a^t$$ con $y_0$ valore iniziale (per $t=0$) e $a$ fattore di crescita per ogni unità di tempo: $a>1$ per una crescita, $0<a<1$ per un decadimento.

**Interesse composto.** Un capitale $C_0$ investito a un tasso $r$ per periodo (per esempio $r=0{,}05$ per il $5\%$) diventa, dopo $t$ periodi, $$C(t) = C_0(1+r)^t.$$ Con $C_0=2000$ € e $r=0{,}05$, dopo $3$ anni: $C(3) = 2000 \cdot 1{,}05^3 = 2000 \cdot 1{,}157625 = 2315{,}25$ €. La base è $a=1+r>1$: crescita.

**Popolazioni.** Se una popolazione cresce del $2\%$ ogni anno, dopo $t$ anni vale $P(t) = P_0 \cdot 1{,}02^{\,t}$: stesso schema, con $a=1{,}02$.

**Decadimento e dimezzamento.** Una sostanza (farmaco, isotopo radioattivo) che si dimezza a ogni intervallo fisso $T$, il **tempo di dimezzamento**, segue $$N(t) = N_0 \left(\dfrac12\right)^{t/T}.$$ Con $T=8$ giorni e $N_0=160$ mg, dopo $24$ giorni (cioè $3$ dimezzamenti) restano $N(24)=160\cdot\left(\frac12\right)^3=20$ mg.

In tutti questi modelli il grafico ha lo stesso asintoto orizzontale della funzione esponenziale di base, la retta $y=0$: per una crescita è il livello a cui la curva si schiaccia tornando indietro nel tempo, per un decadimento è il valore a cui la quantità tende senza mai annullarsi del tutto.

>! Il tasso $r$ nella formula dell'interesse composto è un numero decimale, non una percentuale intera: $5\%$ si scrive $r=0{,}05$, non $r=5$. Scrivere $C(t)=C_0(1+5)^t$ moltiplicherebbe il capitale per $6$ ogni periodo: un errore enorme.` },

    { id: 'trasformazioni-grafico', titolo: 'Trasformazioni del grafico', testo: R`Le trasformazioni del grafico di $y=a^x$ seguono le stesse regole generali valide per qualunque funzione: spostamenti e ribaltamenti che si leggono direttamente dalla formula.

>* **Traslazioni:** $y=a^x+k$ sposta il grafico verticalmente di $k$: il punto $(0;1)$ diventa $(0;1+k)$ e l'**asintoto diventa $y=k$**. $y=a^{x-h}$ sposta il grafico orizzontalmente di $h$: il punto $(0;1)$ diventa $(h;1)$, l'asintoto resta $y=0$.

Per esempio $y=2^x-3$ ha lo stesso andamento di $y=2^x$ ma traslato in basso di $3$: passa per $(0;-2)$ e ha asintoto $y=-3$; da qui in avanti, pur restando crescente, la funzione assume anche valori negativi.

**Riflessioni.** $y=-a^x$ ribalta il grafico rispetto all'asse $x$: il segno meno capovolge anche l'andamento (con $a>1$ la funzione diventa decrescente) ed è sempre negativa. $y=a^{-x}$ ribalta rispetto all'asse $y$, e per le proprietà delle potenze coincide con $\left(\dfrac1a\right)^x$: una base $a>1$ diventa così una base minore di $1$, e viceversa.

[[grafico:simmetriaBasi]]

Le curve $y=2^x$ e $y=\left(\frac12\right)^x$ sono specularmente simmetriche rispetto all'asse $y$: dove una cresce, l'altra decresce esattamente allo stesso ritmo, perché sono la stessa funzione vista con $x$ cambiato di segno.

>! Confondere $-a^x$ con $a^{-x}$ è l'errore più comune di questa sezione: il primo cambia il segno del **risultato** (ribalta su e giù), il secondo cambia il segno dell'**esponente** (ribalta destra e sinistra). Sono due trasformazioni diverse, con effetti diversi sul grafico.` }
  ],

  grafici: {
    scopriPotenza: {
      tipo: 'piano', x: [-3, 4], y: [-1, 10],
      funzioni: [{ f: '2^x', etichetta: 'y = 2^x', colore: 1 }],
      parametri: [{ nome: 'p', min: -3, max: 3, passo: 0.1, valore: 1, nascosto: true }],
      elementi: [
        { tipo: 'punto', p: ['p', '2^p'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-2.8, 9], testo: '2^p = {{2^p}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto P lungo la curva: qualunque numero reale p, anche non intero o negativo, dà un valore 2^p ben definito.'
    },
    famigliaEsponenziali: {
      tipo: 'piano', x: [-4, 4], y: [-1, 10],
      funzioni: [{ f: 'a^x', etichetta: 'y = a^x', colore: 1 }],
      punti: [{ x: 0, y: 1, etichetta: '(0; 1)', posizione: 'basso-destra' }],
      elementi: [{ tipo: 'orizzontale', y: 0, asintoto: true, etichetta: 'y = 0' }],
      parametri: [{ nome: 'a', min: 0.2, max: 4, passo: 0.1, valore: 2, etichetta: 'a' }],
      didascalia: 'Muovi il cursore: per a > 1 la curva cresce, per 0 < a < 1 decresce; passa sempre per (0; 1) e si avvicina a y = 0 senza mai toccarlo.'
    },
    tangenteE: {
      tipo: 'piano', x: [-3, 3], y: [-1, 8],
      funzioni: [{ f: 'e^x', etichetta: 'y = e^x', colore: 1 }],
      punti: [{ x: 0, y: 1, etichetta: '(0; 1)', posizione: 'basso-destra', colore: 2 }],
      elementi: [{ tipo: 'tangente', f: 'e^x', x0: 0, etichetta: 't' }],
      didascalia: 'La tangente in (0; 1) ha pendenza 1: è la proprietà che caratterizza il numero e fra tutte le basi possibili.'
    },
    equazioneEsponenziale: {
      tipo: 'piano', x: [-2, 5], y: [-1, 10],
      funzioni: [{ f: '2^x', etichetta: 'y = 2^x', colore: 1 }],
      punti: [{ x: 3, y: 8, etichetta: '(3; 8)', posizione: 'alto-sinistra', colore: 2 }],
      elementi: [{ tipo: 'orizzontale', y: 8, etichetta: 'y = 8', colore: 3 }],
      didascalia: 'Risolvere 2^x = 8 significa cercare l\'ascissa del punto in cui il grafico di y = 2^x incontra la retta y = 8.'
    },
    simmetriaBasi: {
      tipo: 'piano', x: [-4, 4], y: [-1, 10],
      funzioni: [
        { f: '2^x', etichetta: 'y = 2^x', colore: 1 },
        { f: '0.5^x', etichetta: 'y = (1/2)^x', colore: 3 }
      ],
      punti: [{ x: 0, y: 1, etichetta: '(0; 1)', posizione: 'basso' }],
      elementi: [{ tipo: 'orizzontale', y: 0, asintoto: true, etichetta: 'y = 0' }],
      didascalia: 'Le due curve sono simmetriche rispetto all\'asse y: (1/2)^x = 2^(-x), il grafico di una è il ribaltamento orizzontale dell\'altra.'
    }
  },

  esempi: [
    { titolo: 'Potenza con esponente razionale', problema: R`Calcola $16^{3/4}$.`, passi: [
      R`L'esponente $\frac34$ significa: elevare alla $3$ ed estrarre la radice quarta (nell'ordine che conviene): $16^{3/4} = \left(\sqrt[4]{16}\right)^3$.`,
      R`$\sqrt[4]{16}=2$, perché $2^4=16$.`,
      R`Quindi $16^{3/4} = 2^3 = 8$.`
    ], risultato: R`$16^{3/4} = 8$` },

    { titolo: 'Equazione esponenziale a basi uguali', problema: R`Risolvi $2^{3x-1} = 2^{x+5}$.`, passi: [
      R`Le basi sono già uguali ($2$): la funzione $y=2^x$ è iniettiva, quindi l'uguaglianza vale se e solo se sono uguali gli esponenti.`,
      R`$3x-1 = x+5$.`,
      R`$2x=6$, quindi $x=3$.`,
      R`Verifica: $2^{3\cdot3-1}=2^8=256$ e $2^{3+5}=2^8=256$. ✓`
    ], risultato: R`$x=3$` },

    { titolo: 'Equazione riconducibile alla stessa base', problema: R`Risolvi $9^{x+1} = 27^{x}$.`, passi: [
      R`Le basi $9$ e $27$ sono entrambe potenze di $3$: $9=3^2$, $27=3^3$.`,
      R`$\left(3^2\right)^{x+1} = \left(3^3\right)^x$, cioè $3^{2x+2} = 3^{3x}$.`,
      R`Stessa base: $2x+2 = 3x$, quindi $x=2$.`,
      R`Verifica: $9^3=729$ e $27^2=729$. ✓`
    ], risultato: R`$x=2$` },

    { titolo: 'Equazione esponenziale con la sostituzione t = aˣ', problema: R`Risolvi $25^x - 6\cdot5^x + 5 = 0$.`, passi: [
      R`$25^x = \left(5^x\right)^2$: ponendo $t=5^x$, con la condizione $t>0$, l'equazione diventa $t^2-6t+5=0$.`,
      R`$\Delta=36-20=16$, $t=\dfrac{6\pm4}{2}$: $t=5$ oppure $t=1$. Entrambe positive, nessuna va scartata.`,
      R`Da $5^x=5$ si ha $x=1$; da $5^x=1=5^0$ si ha $x=0$.`
    ], risultato: R`$x=0 \lor x=1$` },

    { titolo: 'Disequazione esponenziale con a > 1', problema: R`Risolvi $5^{2x-3} \ge 5^{x+1}$.`, passi: [
      R`La base $5$ è maggiore di $1$: $y=5^x$ è crescente, quindi il verso della disuguaglianza si **conserva** confrontando gli esponenti.`,
      R`$2x-3 \ge x+1$.`,
      R`$x \ge 4$.`
    ], risultato: R`$x \ge 4$` },

    { titolo: 'Un modello di crescita esponenziale', problema: R`Una coltura di batteri raddoppia ogni $20$ minuti. Se all'inizio ci sono $500$ batteri, quanti ce ne sono dopo $2$ ore?`, passi: [
      R`Il modello è $N(t) = N_0 \cdot a^t$: conviene misurare $t$ in periodi di raddoppio, così la base è semplicemente $a=2$.`,
      R`$2$ ore sono $120$ minuti, cioè $120:20=6$ periodi di raddoppio.`,
      R`$N = 500 \cdot 2^6 = 500 \cdot 64 = 32\,000$.`
    ], risultato: R`$32\,000$ batteri` }
  ],

  formulario: [
    { nome: 'Potenza con esponente nullo', formula: R`a^0 = 1`, nota: R`Per ogni $a \ne 0$.` },
    { nome: 'Potenza con esponente negativo', formula: R`a^{-n} = \frac{1}{a^n}`, nota: R`Per $a \ne 0$.` },
    { nome: 'Potenza con esponente razionale', formula: R`a^{m/n} = \sqrt[n]{a^m}`, nota: R`Richiede $a>0$.` },
    { nome: 'Prodotto di potenze, stessa base', formula: R`a^x \cdot a^y = a^{x+y}` },
    { nome: 'Quoziente di potenze, stessa base', formula: R`\frac{a^x}{a^y} = a^{x-y}` },
    { nome: 'Potenza di potenza', formula: R`\left(a^x\right)^y = a^{xy}` },
    { nome: 'Potenza di un prodotto', formula: R`(ab)^x = a^x b^x` },
    { nome: 'Funzione esponenziale', formula: R`f(x) = a^x, \qquad a>0,\ a \ne 1`, nota: R`Dominio $\mathbb{R}$, immagine $(0,+\infty)$, asintoto $y=0$.` },
    { nome: 'Numero di Nepero', formula: R`e = \lim_{n \to \infty} \left(1+\frac1n\right)^n \approx 2{,}71828`, nota: R`Base dell'esponenziale naturale $e^x$.` },
    { nome: 'Equazione esponenziale, basi uguali', formula: R`a^{f(x)} = a^{g(x)} \iff f(x) = g(x)`, nota: R`Per $a>0$, $a \ne 1$.` },
    { nome: 'Disequazione esponenziale, a > 1', formula: R`a^{f(x)} > a^{g(x)} \iff f(x) > g(x)`, nota: R`Il verso si conserva.` },
    { nome: 'Disequazione esponenziale, 0 < a < 1', formula: R`a^{f(x)} > a^{g(x)} \iff f(x) < g(x)`, nota: R`Il verso si inverte.` },
    { nome: 'Interesse composto', formula: R`C(t) = C_0(1+r)^t`, nota: R`$C_0$ capitale iniziale, $r$ tasso per periodo, $t$ numero di periodi.` },
    { nome: 'Decadimento con tempo di dimezzamento', formula: R`N(t) = N_0 \left(\frac12\right)^{t/T}`, nota: R`$T$ = tempo di dimezzamento.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'potenze-esponente-reale', tipo: 'formula', fronte: R`Definizione di potenza con esponente razionale`, retro: R`$a^{m/n} = \sqrt[n]{a^m}$, definita per $a>0$.` },
    { id: 'fc-02', sezione: 'potenze-esponente-reale', tipo: 'concetto', fronte: R`Perché per $a^x$ con $x$ qualunque reale serve $a>0$?`, retro: R`Con basi negative alcune radici non esistono in $\mathbb{R}$ e scritture equivalenti dello stesso esponente darebbero risultati diversi.` },
    { id: 'fc-03', sezione: 'potenze-esponente-reale', tipo: 'concetto', fronte: R`Come si dà senso a $2^{\sqrt2}$?`, retro: R`Come limite dei valori $2^{x_n}$, dove $x_n$ sono approssimazioni razionali sempre più precise di $\sqrt2$.` },
    { id: 'fc-04', sezione: 'proprieta-potenze', tipo: 'formula', fronte: R`$a^x \cdot a^y$`, retro: R`$= a^{x+y}$` },
    { id: 'fc-05', sezione: 'proprieta-potenze', tipo: 'formula', fronte: R`$\left(a^x\right)^y$`, retro: R`$= a^{xy}$` },
    { id: 'fc-06', sezione: 'proprieta-potenze', tipo: 'formula', fronte: R`$a^{-x}$`, retro: R`$= \dfrac{1}{a^x}$, con $a \ne 0$.` },
    { id: 'fc-07', sezione: 'funzione-esponenziale', tipo: 'concetto', fronte: R`Dominio di $y=a^x$`, retro: R`$\mathbb{R}$: l'esponente può essere un numero reale qualsiasi.` },
    { id: 'fc-08', sezione: 'funzione-esponenziale', tipo: 'concetto', fronte: R`Immagine di $y=a^x$`, retro: R`$(0,+\infty)$: la funzione esponenziale è sempre strettamente positiva.` },
    { id: 'fc-09', sezione: 'funzione-esponenziale', tipo: 'concetto', fronte: R`Punto fisso del grafico di $y=a^x$`, retro: R`$(0;1)$, per qualunque base $a$: infatti $a^0=1$.` },
    { id: 'fc-10', sezione: 'funzione-esponenziale', tipo: 'concetto', fronte: R`Asintoto del grafico di $y=a^x$`, retro: R`La retta $y=0$: la curva vi si avvicina indefinitamente senza mai toccarlo.` },
    { id: 'fc-11', sezione: 'numero-e', tipo: 'definizione', fronte: R`Definizione del numero di Nepero $e$`, retro: R`$e = \lim_{n\to\infty}\left(1+\dfrac1n\right)^n \approx 2{,}718281828\ldots$` },
    { id: 'fc-12', sezione: 'numero-e', tipo: 'concetto', fronte: R`$e$ è un numero razionale?`, retro: R`No, è irrazionale (anzi trascendente): la sua scrittura decimale non si ripete né termina.` },
    { id: 'fc-13', sezione: 'numero-e', tipo: 'concetto', fronte: R`Pendenza della tangente a $y=e^x$ in $(0;1)$`, retro: R`Vale esattamente $1$: è la proprietà che caratterizza il numero $e$ fra tutte le basi.` },
    { id: 'fc-14', sezione: 'equazioni-esponenziali', tipo: 'procedura', fronte: R`Come si risolve $a^{f(x)}=a^{g(x)}$?`, retro: R`Si uguagliano gli esponenti, $f(x)=g(x)$, perché $y=a^x$ (con $a>0,a\ne1$) è iniettiva.` },
    { id: 'fc-15', sezione: 'equazioni-esponenziali', tipo: 'procedura', fronte: R`Cosa fare con $9^x=27^{x-1}$?`, retro: R`Scrivere le basi come potenze di uno stesso numero (qui $3$) e uguagliare gli esponenti.` },
    { id: 'fc-16', sezione: 'equazioni-esponenziali', tipo: 'procedura', fronte: R`Sostituzione utile per $a^{2x}-5a^x+4=0$`, retro: R`$t=a^x$, con la condizione $t>0$: l'equazione diventa $t^2-5t+4=0$.` },
    { id: 'fc-17', sezione: 'equazioni-esponenziali', tipo: 'concetto', fronte: R`Perché nella sostituzione $t=a^x$ si scartano i valori $t\le0$?`, retro: R`Perché $a^x$ è sempre positivo per $a>0$: un valore $t\le0$ non corrisponde a nessuna $x$ reale.` },
    { id: 'fc-18', sezione: 'disequazioni-esponenziali', tipo: 'formula', fronte: R`Disequazione esponenziale con $a>1$`, retro: R`$a^{f(x)} > a^{g(x)} \iff f(x) > g(x)$: il verso si conserva.` },
    { id: 'fc-19', sezione: 'disequazioni-esponenziali', tipo: 'formula', fronte: R`Disequazione esponenziale con $0<a<1$`, retro: R`$a^{f(x)} > a^{g(x)} \iff f(x) < g(x)$: il verso si inverte.` },
    { id: 'fc-20', sezione: 'modelli-crescita-decadimento', tipo: 'formula', fronte: R`Formula dell'interesse composto`, retro: R`$C(t) = C_0(1+r)^t$, con $C_0$ capitale iniziale, $r$ tasso per periodo, $t$ numero di periodi.` },
    { id: 'fc-21', sezione: 'modelli-crescita-decadimento', tipo: 'formula', fronte: R`Formula del decadimento con tempo di dimezzamento $T$`, retro: R`$N(t) = N_0\left(\dfrac12\right)^{t/T}$` },
    { id: 'fc-22', sezione: 'modelli-crescita-decadimento', tipo: 'concetto', fronte: R`Che base ha un modello di decadimento?`, retro: R`Una base $a$ compresa fra $0$ e $1$, oppure, in forma con esponente negativo, $e^{-kt}$ con $k>0$.` },
    { id: 'fc-23', sezione: 'trasformazioni-grafico', tipo: 'concetto', fronte: R`Effetto di $y=a^x+k$ sul grafico di $y=a^x$`, retro: R`Traslazione verticale di $k$: l'asintoto diventa $y=k$.` },
    { id: 'fc-24', sezione: 'trasformazioni-grafico', tipo: 'concetto', fronte: R`Effetto di $y=a^{x-h}$ sul grafico di $y=a^x$`, retro: R`Traslazione orizzontale di $h$: il punto $(0;1)$ si sposta in $(h;1)$, l'asintoto resta $y=0$.` },
    { id: 'fc-25', sezione: 'trasformazioni-grafico', tipo: 'concetto', fronte: R`Grafico di $y=a^{-x}$`, retro: R`Coincide con quello di $y=\left(\frac1a\right)^x$: è la riflessione di $y=a^x$ rispetto all'asse $y$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $27^{2/3}$.`, suggerimenti: [R`Riscrivi l'esponente come radice e potenza: $27^{2/3} = \left(\sqrt[3]{27}\right)^2$.`, R`$\sqrt[3]{27}=3$.`], risposta: { tipo: 'numero', valore: 9, tolleranza: 0.001 }, soluzione: [R`$27^{2/3} = \left(\sqrt[3]{27}\right)^2 = 3^2 = 9$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $4^{-3/2}$.`, suggerimenti: [R`L'esponente negativo dà il reciproco: $4^{-3/2} = \dfrac{1}{4^{3/2}}$.`, R`$4^{3/2} = \left(\sqrt4\right)^3 = 2^3 = 8$.`], risposta: { tipo: 'numero', valore: 0.125, tolleranza: 0.001 }, soluzione: [R`$4^{-3/2} = \dfrac{1}{4^{3/2}} = \dfrac{1}{\left(\sqrt4\right)^3} = \dfrac{1}{8} = 0{,}125$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi l'equazione $5^{3x-2} = 5^{x+6}$.`, suggerimenti: [R`Le basi sono già uguali: uguaglia gli esponenti.`, R`Dovresti arrivare a $2x=8$.`], risposta: { tipo: 'numero', valore: 4 }, soluzione: [R`$3x-2 = x+6$.`, R`$2x=8$, quindi $x=4$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi l'equazione $4^{x+1} = 8^{x-2}$.`, suggerimenti: [R`Scrivi entrambe le basi come potenze di $2$: $4=2^2$, $8=2^3$.`, R`Dovresti arrivare a $2(x+1)=3(x-2)$.`], risposta: { tipo: 'numero', valore: 8 }, soluzione: [R`$4^{x+1}=2^{2(x+1)}=2^{2x+2}$ e $8^{x-2}=2^{3(x-2)}=2^{3x-6}$.`, R`$2x+2=3x-6$, quindi $x=8$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi l'equazione $4^x - 5\cdot2^x + 4 = 0$.`, suggerimenti: [R`$4^x = \left(2^x\right)^2$: poni $t=2^x$, con $t>0$.`, R`Dovresti arrivare a $t^2-5t+4=0$, con soluzioni $t=1$ e $t=4$.`], risposta: { tipo: 'numeri', valori: [0, 2] }, soluzione: [R`Con $t=2^x$: $t^2-5t+4=0$, cioè $(t-1)(t-4)=0$: $t=1$ oppure $t=4$. Entrambe positive.`, R`$2^x=1=2^0 \Rightarrow x=0$; $2^x=4=2^2 \Rightarrow x=2$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi la disequazione $4^{3x-2} \ge 4^{x+2}$.`, suggerimenti: [R`La base $4$ è maggiore di $1$: che verso ha la disuguaglianza fra gli esponenti?`, R`Il verso si conserva: $3x-2 \ge x+2$.`], risposta: { tipo: 'intervallo', da: 2, a: 'inf', chiusoDa: true, chiusoA: false }, soluzione: [R`Base $4>1$: il verso si conserva. $3x-2 \ge x+2$.`, R`$2x \ge 4$, quindi $x \ge 2$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi la disequazione $\left(\dfrac13\right)^{3x+1} \le \left(\dfrac13\right)^{x-3}$.`, suggerimenti: [R`La base $\frac13$ è minore di $1$: il verso della disuguaglianza fra gli esponenti si inverte.`, R`Dovresti arrivare a $3x+1 \ge x-3$.`], risposta: { tipo: 'intervallo', da: -2, a: 'inf', chiusoDa: true, chiusoA: false }, soluzione: [R`Base $0<\frac13<1$: il verso si inverte. $3x+1 \ge x-3$.`, R`$2x \ge -4$, quindi $x \ge -2$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Un capitale di $2000$ € è investito al tasso di interesse composto annuo del $5\%$. Quanto vale dopo $3$ anni? (Arrotonda ai centesimi.)`, suggerimenti: [R`Usa $C(t) = C_0(1+r)^t$, con $r$ scritto come numero decimale.`, R`$C_0=2000$, $r=0{,}05$, $t=3$.`], risposta: { tipo: 'numero', valore: 2315.25, tolleranza: 0.5 }, soluzione: [R`$C(3) = 2000\cdot(1{,}05)^3 = 2000\cdot1{,}157625$.`, R`$C(3) = 2315{,}25$ €.`] },
    { id: 'es-09', difficolta: 3, testo: R`Una sostanza radioattiva ha un tempo di dimezzamento di $8$ giorni. Se all'inizio ce ne sono $160$ mg, quanti milligrammi restano dopo $24$ giorni?`, suggerimenti: [R`Usa $N(t) = N_0\left(\frac12\right)^{t/T}$, con $T$ tempo di dimezzamento.`, R`$24$ giorni sono $3$ tempi di dimezzamento: quante volte si è dimezzata la quantità?`], risposta: { tipo: 'numero', valore: 20 }, soluzione: [R`$t/T = 24/8 = 3$.`, R`$N(24) = 160\cdot\left(\frac12\right)^3 = 160\cdot\frac18 = 20$ mg.`] },
    { id: 'es-10', difficolta: 2, testo: R`Determina l'equazione dell'asintoto orizzontale del grafico di $y=5^x+2$.`, suggerimenti: [R`Confronta con $y=a^x+k$: come cambia l'asintoto $y=0$ di $y=a^x$?`, R`L'asintoto si sposta verticalmente della stessa quantità del grafico.`], risposta: { tipo: 'testo', accettate: ['y=2', 'y = 2'] }, soluzione: [R`Il grafico di $y=5^x+2$ è quello di $y=5^x$ traslato verticalmente di $2$.`, R`L'asintoto $y=0$ diventa $y=2$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Risolvi l'equazione $2^{2x+1} - 3\cdot2^x - 2 = 0$.`, suggerimenti: [R`$2^{2x+1} = 2\cdot\left(2^x\right)^2$: poni $t=2^x$, con $t>0$.`, R`Dovresti arrivare a $2t^2-3t-2=0$.`], risposta: { tipo: 'numero', valore: 1 }, soluzione: [R`Con $t=2^x$: $2t^2-3t-2=0$. $\Delta=9+16=25$, $t=\dfrac{3\pm5}{4}$: $t=2$ oppure $t=-\frac12$.`, R`$t=-\frac12$ va scartata perché $2^x>0$ sempre. Da $2^x=2$ si ha $x=1$.`] },
    { id: 'es-12', difficolta: 2, testo: R`Descrivi come si ottiene il grafico di $y=3^{x-2}+1$ a partire da quello di $y=3^x$, e scrivi l'equazione del suo asintoto.`, suggerimenti: [R`Separa l'effetto dell'esponente $x-2$ da quello del $+1$ fuori dalla potenza.`, R`Una trasforma il grafico orizzontalmente, l'altra verticalmente.`], risposta: { tipo: 'testo', accettate: ['y=1', 'y = 1'] }, soluzione: [R`$x-2$ nell'esponente trasla il grafico di $y=3^x$ orizzontalmente di $2$ verso destra (l'asintoto resta $y=0$).`, R`Il $+1$ fuori dalla potenza trasla poi tutto verticalmente di $1$: il punto $(2;1)$ diventa $(2;2)$ e l'asintoto diventa $y=1$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è il dominio della funzione $y=a^x$, con $a>0$ e $a \ne 1$?`, opzioni: [R`$\mathbb{R}$`, R`$\mathbb{R} - \{0\}$`, R`$(0,+\infty)$`, R`$[0,+\infty)$`], corretta: 0, spiegazione: R`L'esponente può essere qualunque numero reale: il dominio è tutto $\mathbb{R}$. $(0,+\infty)$ è invece l'immagine, cioè l'insieme dei valori assunti da $y$.` },
    { id: 'q-02', domanda: R`Qual è l'immagine della funzione $y=a^x$?`, opzioni: [R`$\mathbb{R}$`, R`$(0,+\infty)$`, R`$[0,+\infty)$`, R`$\mathbb{R} - \{0\}$`], corretta: 1, spiegazione: R`$a^x$ è sempre strettamente positiva, per ogni $x$ reale: non è mai né nulla né negativa. L'immagine è $(0,+\infty)$.` },
    { id: 'q-03', domanda: R`Il grafico di $y=a^x$, qualunque sia la base $a>0$, $a\ne1$, passa sempre per il punto…`, opzioni: [R`$(1;0)$`, R`$(0;0)$`, R`$(0;1)$`, R`$(1;1)$`], corretta: 2, spiegazione: R`$a^0=1$ per ogni base positiva, quindi il grafico passa sempre per $(0;1)$.` },
    { id: 'q-04', domanda: R`Se $a>1$, la funzione $y=a^x$ è…`, opzioni: [R`decrescente`, R`costante`, R`crescente`, R`né crescente né decrescente`], corretta: 2, spiegazione: R`Con base maggiore di $1$, aumentando $x$ il valore $a^x$ aumenta sempre: la funzione è crescente su tutto $\mathbb{R}$.` },
    { id: 'q-05', domanda: R`Se $0<a<1$, la funzione $y=a^x$ è…`, opzioni: [R`crescente`, R`decrescente`, R`costante`, R`definita solo per $x \ge 0$`], corretta: 1, spiegazione: R`Con base compresa fra $0$ e $1$, aumentando $x$ il valore $a^x$ diminuisce: la funzione è decrescente.` },
    { id: 'q-06', domanda: R`Qual è l'equazione dell'asintoto del grafico di $y=a^x$?`, opzioni: [R`$x=0$`, R`$y=1$`, R`$y=0$`, R`$y=a$`], corretta: 2, spiegazione: R`$a^x$ si avvicina a $0$ senza mai raggiungerlo, per $x \to -\infty$ se $a>1$ o per $x \to +\infty$ se $0<a<1$: l'asintoto è $y=0$.` },
    { id: 'q-07', domanda: R`Perché nella funzione esponenziale si richiede $a \ne 1$?`, opzioni: [R`perché altrimenti il dominio non sarebbe più $\mathbb{R}$`, R`perché altrimenti $a^0$ non esisterebbe`, R`perché $1^x=1$ per ogni $x$: sarebbe una funzione costante, non una vera esponenziale`, R`perché altrimenti l'immagine conterrebbe numeri negativi`], corretta: 2, spiegazione: R`Con $a=1$ la funzione diventa $y=1$ per ogni $x$: costante, quindi né crescente né decrescente, priva delle proprietà tipiche dell'esponenziale.` },
    { id: 'q-08', domanda: R`Perché nella funzione esponenziale si richiede $a>0$?`, opzioni: [R`per convenzione, ma non ci sarebbe nessun problema matematico con $a \le 0$`, R`perché altrimenti la funzione sarebbe decrescente`, R`perché altrimenti il grafico non passerebbe per $(0;1)$`, R`perché con base negativa o nulla $a^x$ non è definita, o non è continua, per molti valori reali di $x$`], corretta: 3, spiegazione: R`Con $a \le 0$ molte potenze con esponente reale non danno un numero reale ben definito (radici di numeri negativi, ambiguità fra frazioni equivalenti): si perderebbe la continuità su tutto $\mathbb{R}$.` },
    { id: 'q-09', domanda: R`Il numero di Nepero $e$ è definito come…`, opzioni: [R`$\lim_{n\to\infty}\left(1+\dfrac1n\right)^n$`, R`$\lim_{n\to\infty}\left(1-\dfrac1n\right)^n$`, R`$\lim_{n\to\infty} n^{1/n}$`, R`$\lim_{n\to\infty}\left(1+\dfrac1n\right)^{2n}$`], corretta: 0, spiegazione: R`È la definizione classica di $e$. Il secondo limite vale $1/e$, il terzo vale $1$, il quarto vale $e^2$: tutti diversi da $e$.` },
    { id: 'q-10', domanda: R`Nel punto $(0;1)$, la retta tangente al grafico di $y=e^x$ ha pendenza…`, opzioni: [R`$e$`, R`$0$`, R`$1$`, R`$-1$`], corretta: 2, spiegazione: R`È la proprietà che caratterizza $e$ fra tutte le basi possibili: in $(0;1)$ la pendenza della tangente a $y=e^x$ vale esattamente $1$.` },
    { id: 'q-11', domanda: R`Per risolvere $a^{f(x)}=a^{g(x)}$, con $a>0$ e $a\ne1$, si può…`, opzioni: [R`uguagliare direttamente gli esponenti, $f(x)=g(x)$`, R`sommare gli esponenti`, R`uguagliare le basi, che sono già uguali, e ignorare gli esponenti`, R`risolvere solo se $f(x)$ e $g(x)$ sono entrambi positivi`], corretta: 0, spiegazione: R`La funzione $y=a^x$ è iniettiva: a esponenti diversi corrispondono sempre valori diversi, quindi l'uguaglianza fra le potenze equivale all'uguaglianza fra gli esponenti.` },
    { id: 'q-12', domanda: R`Nella disequazione $a^{f(x)} > a^{g(x)}$ con $0<a<1$, il confronto fra gli esponenti…`, opzioni: [R`resta invariato: $f(x) > g(x)$`, R`si inverte: $f(x) < g(x)$`, R`dipende dal segno di $f(x)$`, R`non è possibile: servono i logaritmi`], corretta: 1, spiegazione: R`Con $0<a<1$ la funzione è decrescente: valori maggiori dell'esponente danno risultati minori, quindi il verso della disuguaglianza si inverte.` },
    { id: 'q-13', domanda: R`Nella sostituzione $t=a^x$ per risolvere un'equazione come $a^{2x}-5a^x+4=0$, una soluzione $t=-2$…`, opzioni: [R`va accettata come tale, $t=-2$`, R`va trasformata in $x=-2$`, R`indica che l'equazione è impossibile`, R`va scartata, perché $a^x$ non può mai essere negativo`], corretta: 3, spiegazione: R`$a^x>0$ per ogni $x$ reale, quando $a>0$: un valore $t \le 0$ non corrisponde a nessuna $x$, e va scartato prima di continuare.` },
    { id: 'q-14', domanda: R`In un modello di decadimento $N(t) = N_0\left(\dfrac12\right)^{t/T}$, il parametro $T$ rappresenta…`, opzioni: [R`il valore iniziale della quantità`, R`il tasso di crescita percentuale`, R`il tempo di dimezzamento`, R`il valore finale a cui la quantità tende`], corretta: 2, spiegazione: R`$T$ è l'intervallo di tempo dopo il quale la quantità si riduce esattamente a metà: quando $t=T$, infatti, $N(T)=N_0\cdot\frac12$.` },
    { id: 'q-15', domanda: R`Il grafico di $y=a^x+k$, rispetto a quello di $y=a^x$, è…`, opzioni: [R`traslato verticalmente di $k$, con nuovo asintoto $y=k$`, R`traslato orizzontalmente di $k$, stesso asintoto`, R`ribaltato rispetto all'asse $x$`, R`identico, perché $k$ non ha effetto`], corretta: 0, spiegazione: R`Sommare $k$ sposta ogni punto della curva verso l'alto (o il basso) di $k$: l'asintoto orizzontale, che era $y=0$, diventa $y=k$.` },
    { id: 'q-16', domanda: R`Il grafico di $y=a^{-x}$ coincide con quello di…`, opzioni: [R`$y=-a^x$`, R`$y=a^x$`, R`$y=\left(\dfrac1a\right)^x$`, R`$y=\dfrac1x$`], corretta: 2, spiegazione: R`$a^{-x} = \left(a^{-1}\right)^x = \left(\dfrac1a\right)^x$: è il ribaltamento di $y=a^x$ rispetto all'asse $y$, e coincide con l'esponenziale di base reciproca.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di risolvere un'equazione esponenziale, controlla se le basi si possono scrivere come potenze di uno stesso numero: spesso trasforma un problema difficile in uno a basi già uguali.` },
    { tipo: 'errore', testo: R`$a^x \cdot b^x$ non è $a^x+b^x$: le basi si moltiplicano solo se gli esponenti sono uguali, $a^x \cdot b^x = (ab)^x$.` },
    { tipo: 'errore', testo: R`$a^x + a^y$ non si semplifica in $a^{x+y}$: le proprietà delle potenze valgono per prodotti, quozienti e potenze di potenze, mai per le somme.` },
    { tipo: 'trucco', testo: R`Se in un'equazione compaiono $a^{2x}$ e $a^x$, prova la sostituzione $t=a^x$: spesso diventa un'equazione di secondo grado in $t$.` },
    { tipo: 'errore', testo: R`Nella sostituzione $t=a^x$ non dimenticare la condizione $t>0$: un valore $t \le 0$ va scartato subito, prima di tornare a $x$.` },
    { tipo: 'metodo', testo: R`Nelle disequazioni esponenziali guarda subito se la base è maggiore o minore di $1$: da questo dipende se il verso della disuguaglianza resta com'è o si capovolge.` },
    { tipo: 'trucco', testo: R`Per ricordare il verso: pensa al grafico. Con $a>1$ la funzione cresce, verso conservato; con $0<a<1$ decresce, verso invertito.` },
    { tipo: 'errore', testo: R`$a^0=1$ per ogni base positiva, non $a^0=0$: è l'errore più comune quando si controlla il punto di partenza del grafico, $(0;1)$.` },
    { tipo: 'metodo', testo: R`In un problema di crescita o decadimento, individua subito il valore iniziale, la variabile tempo e il fattore che moltiplica ogni intervallo: la formula $y_0 \cdot a^t$ si scrive quasi da sola.` }
  ],

  aneddoti: [
    { matematico: 'La leggenda della scacchiera', anni: 'leggenda, origine incerta (Persia o India medievale)', titolo: 'I chicchi di grano che il mondo non ha', testo: R`Si racconta che l'inventore del gioco degli scacchi, alla corte di un sovrano orientale entusiasta del gioco, non avesse chiesto oro né gioielli come ricompensa, ma un premio apparentemente modesto: un chicco di grano sulla prima casella della scacchiera, due sulla seconda, quattro sulla terza, e così via raddoppiando fino alla sessantaquattresima. Il sovrano, sorpreso da una richiesta così umile, accettò subito, prima di far fare i conti ai suoi tesorieri. Il totale è $2^{64}-1$, un numero di venti cifre: più di mille volte tutto il grano prodotto oggi sul pianeta in un anno intero. Non esiste una versione storica certa di questo racconto, che compare con dettagli diversi in fonti arabe, persiane e indiane fin dal Medioevo, ma il conto alla base è del tutto reale e si rifà facilmente con carta e penna.`, legame: R`È l'esempio più immediato di quanto una crescita esponenziale, che raddoppia ogni passo, superi presto ogni immaginazione: dopo poche decine di caselle i numeri diventano già astronomici.` },
    { matematico: 'Jacob Bernoulli', anni: '1654–1705', titolo: 'L\'interesse che cresce sempre più spesso', testo: R`Nel 1683 il matematico svizzero Jacob Bernoulli si pose una domanda molto pratica: se un capitale frutta un interesse del $100\%$ all'anno, conviene capitalizzarlo una volta sola, oppure due volte al $50\%$, o quattro volte al $25\%$, e così via sempre più spesso? Bernoulli calcolò che, capitalizzando $n$ volte all'anno una frazione $1/n$ di interesse, il capitale finale si ottiene elevando $\left(1+\frac1n\right)$ alla $n$: aumentando $n$ il risultato cresce, ma non senza limite. Bernoulli dimostrò che il valore resta sempre compreso fra $2$ e $3$, anche capitalizzando istante per istante. Non diede un nome a quel limite (ci avrebbe pensato Eulero mezzo secolo dopo), ma fu il primo a dimostrare che esisteva.`, legame: R`Quel limite è esattamente $e = \lim_{n\to\infty}\left(1+\frac1n\right)^n$: il problema dell'interesse composto capitalizzato sempre più spesso è la porta da cui il numero di Nepero è entrato in matematica.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'La lettera che Eulero scelse per un numero', testo: R`Il numero che oggi chiamiamo $e$ non porta il nome di chi lo scoprì per primo: fu Eulero, fra il 1727 e il 1731, a scegliere la lettera $e$ per indicarlo, in un manoscritto giovanile e poi in una lettera del 1731 all'amico matematico Christian Goldbach. Non si sa con certezza se $e$ stesse per "esponenziale" o fosse semplicemente la prima vocale libera, dato che $a$, $b$, $c$, $d$ erano già usate altrove nei suoi appunti: Eulero stesso non lo spiegò mai. La notazione comparve in stampa per la prima volta nel suo libro di meccanica del 1736, e nel 1748, nell'*Introductio in analysin infinitorum*, Eulero ne calcolò le prime diciotto cifre decimali e ne mostrò le proprietà fondamentali, rendendolo una delle costanti più importanti dell'analisi matematica.`, legame: R`È la stessa costante che compare come base "naturale" della funzione esponenziale $e^x$, quella con tangente di pendenza $1$ nel punto $(0;1)$.` },
    { matematico: 'Thomas Robert Malthus', anni: '1766–1834', titolo: 'Una popolazione che cresce più in fretta del cibo', testo: R`Nel 1798 l'economista inglese Thomas Malthus pubblicò anonimo il *Saggio sul principio di popolazione*, sostenendo che la popolazione umana, se non frenata, cresce **geometricamente** (cioè esponenzialmente, raddoppiando a intervalli regolari), mentre le risorse alimentari possono crescere al massimo **aritmeticamente**, cioè di quantità costanti nel tempo. La conclusione, allarmante per l'epoca, era che la popolazione avrebbe presto superato la capacità della Terra di sfamarla, portando inevitabilmente a carestie, guerre o epidemie come "correttivi" naturali. Le previsioni di Malthus si sono rivelate sbagliate nel lungo periodo, soprattutto perché non aveva previsto i progressi dell'agricoltura, ma il suo modello matematico influenzò profondamente il pensiero scientifico successivo, compresa la teoria della selezione naturale di Charles Darwin.`, legame: R`È il primo esempio storico famoso in cui la differenza fra crescita esponenziale ($a^t$) e crescita lineare viene usata per fare una previsione concreta, giusta o sbagliata che fosse.` },
    { matematico: 'Willard Libby', anni: '1908–1980', titolo: 'Un orologio nascosto negli atomi', testo: R`Nel 1949 il chimico americano Willard Libby mise a punto un metodo per stimare l'età di reperti organici (legno, ossa, tessuti) misurando quanto carbonio-14 residuo contengono. Il carbonio-14 è un isotopo radioattivo che si forma nell'atmosfera e viene assorbito da ogni essere vivente; quando l'organismo muore smette di rinnovarlo, e la quantità presente decade seguendo una legge esponenziale con tempo di dimezzamento di circa $5730$ anni. Misurando quanto carbonio-14 resta rispetto a quello atteso, si risale a quanto tempo è passato dalla morte. Il metodo, che valse a Libby il premio Nobel per la chimica nel 1960, ha permesso di datare reperti archeologici in tutto il mondo, dai Rotoli del Mar Morto ad antichi insediamenti.`, legame: R`È l'applicazione più concreta della formula del decadimento $N(t)=N_0\left(\frac12\right)^{t/T}$, con base minore di $1$ e tempo di dimezzamento $T$ che qui vale $5730$ anni invece che pochi giorni.` }
  ]
});
})();
