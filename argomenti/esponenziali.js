(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'esponenziali',
  titolo: 'Esponenziali',

  introduzione: R`Un batterio si divide in due ogni $20$ minuti. Dopo un'ora i batteri sono $8$, dopo due ore $64$, dopo cinque ore più di trentamila. A ogni passo non se ne aggiunge un numero fisso: il numero **raddoppia**, e più batteri ci sono più ne nascono. Dopo $t$ passi i batteri sono $2^t$, con la variabile all'esponente.

Una funzione come $y = 2^x$, o in generale $y = a^x$ con $a$ numero positivo, si chiama **esponenziale**. Descrive tutto quello che cambia della stessa percentuale a ogni intervallo di tempo: un capitale a interesse composto, una popolazione, un farmaco che si dimezza nel sangue ogni tante ore, un materiale radioattivo che decade. All'inizio può sembrare lenta, ma prima o poi supera qualunque crescita che aggiunge ogni volta la stessa quantità.

In questo argomento si allargano le potenze a esponenti qualsiasi, si studia il grafico di $y = a^x$ e si risolvono equazioni e disequazioni con l'incognita all'esponente. Servono le proprietà delle potenze, i radicali e le equazioni e disequazioni di primo e secondo grado.`,

  inBreve: [
    R`Con base $a > 0$ la potenza $a^x$ ha senso per ogni numero reale $x$: $a^{-n} = \frac{1}{a^n}$, $a^{\frac{m}{n}} = \sqrt[n]{a^m}$, e le proprietà delle potenze restano le stesse.`,
    R`Il grafico di $y = a^x$ passa sempre per $(0;1)$, sta sempre sopra l'asse $x$ e ha l'asintoto $y = 0$. È crescente se $a > 1$, decrescente se $0 < a < 1$.`,
    R`Per risolvere un'equazione esponenziale si scrivono i due membri come potenze della stessa base e si uguagliano gli esponenti. Se la base compare con esponenti $x$ e $2x$ si pone $t = a^x$, e si scartano le $t$ negative o nulle.`,
    R`Nelle disequazioni, togliendo la base, il verso resta com'è se $a > 1$ e si **rovescia** se $0 < a < 1$.`,
    R`Una quantità che cambia della stessa percentuale a ogni passo segue $y = y_0 \cdot a^t$: crescita se $a > 1$, decadimento se $0 < a < 1$.`
  ],

  sezioni: [
    { id: 'potenze-esponente-reale', titolo: 'Potenze con esponente reale', testo: R`Con un esponente intero una potenza è una moltiplicazione ripetuta: $2^3 = 2 \cdot 2 \cdot 2$. Ma che cosa vuol dire $2^{0{,}5}$, o $2^{-1}$? Per dare un significato a questi esponenti si sceglie l'unico che fa funzionare ancora le proprietà delle potenze. Per esempio $2^{0{,}5} \cdot 2^{0{,}5}$ deve fare $2^1 = 2$, quindi $2^{0{,}5}$ è il numero che moltiplicato per sé stesso dà $2$: $\sqrt2$.

>* Per $a > 0$: $$a^0 = 1, \qquad a^{-n} = \frac{1}{a^n},$$ $$a^{\frac{m}{n}} = \sqrt[n]{a^m}.$$ L'esponente negativo fa il reciproco, il denominatore dell'esponente fa la radice.

~ 8^{-\frac23} :: esponente negativo e frazionario
~ \evid{\frac{1}{8^{\frac23}}} :: il meno all'esponente fa il reciproco
~ \frac{1}{\left(\evid{\sqrt[3]{8}}\right)^2} :: il $3$ al denominatore dell'esponente fa la radice cubica
~ \frac{1}{\evid{2}^2} = \evidb{\frac14} :: $\sqrt[3]{8} = 2$, poi il quadrato

?? Quanto vale $4^{-\frac12}$?
[x] $\frac12$
[ ] $-2$
[ ] $-\frac12$
[ ] $2$
=> $4^{\frac12} = \sqrt4 = 2$, e il meno all'esponente fa il reciproco: $\frac12$. Il meno all'esponente non rende negativo il risultato: con base positiva la potenza è sempre positiva.

E un esponente irrazionale, come in $2^{\sqrt2}$? Non si può scrivere come radice, ma si può avvicinare: $\sqrt2 = 1{,}41421\ldots$, e le potenze $2^{1{,}4}$, $2^{1{,}41}$, $2^{1{,}414}$, … si avvicinano sempre di più a un numero preciso, circa $2{,}665$. Quel numero è $2^{\sqrt2}$. Così, con base positiva, $a^x$ ha senso per **ogni** numero reale $x$.

[[grafico:scopriPotenza]]

>! Le basi negative si escludono. Con $a < 0$ lo stesso esponente scritto in due modi darebbe due risultati: $(-8)^{\frac13}$ dovrebbe essere $\sqrt[3]{-8} = -2$, ma $\frac13 = \frac26$ e $(-8)^{\frac26} = \sqrt[6]{64} = 2$. Per questo da qui in avanti la base è sempre positiva.` },

    { id: 'proprieta-potenze', titolo: 'Le proprietà delle potenze', testo: R`Le proprietà delle potenze che conosci dagli esponenti interi valgono uguali con esponenti reali qualsiasi, purché le basi siano positive.

>* **Proprietà delle potenze**, per $a, b > 0$ e $x, y$ reali: $$a^x \cdot a^y = a^{x+y}, \qquad \frac{a^x}{a^y} = a^{x-y},$$ $$\left(a^x\right)^y = a^{xy}, \qquad (ab)^x = a^x b^x.$$

Nelle equazioni esponenziali servono soprattutto a due cose. La prima è **portare tutto alla stessa base**: $9^x = \left(3^2\right)^x = 3^{2x}$, e $\sqrt{2^x} = 2^{\frac{x}{2}}$. La seconda è **staccare un numero dall'esponente** e raccogliere:

~ 2^{x+2} - 2^x = 24 :: la stessa potenza $2^x$ compare in due termini
~ \evid{2^x \cdot 2^2} - 2^x = 24 :: $a^{x+y} = a^x \cdot a^y$ letta al contrario
~ \evid{4} \cdot 2^x - 2^x = 24 :: $2^2 = 4$
~ \evid{3} \cdot 2^x = 24 :: raccolgo $2^x$: $4 - 1 = 3$
~ 2^x = \evid{8} = 2^3 :: divido per $3$ e scrivo $8$ come potenza di $2$
~ x = \evidb{3} :: stessa base, esponenti uguali

?? Quanto fa $2^x + 2^x$?
[x] $2^{x+1}$
[ ] $4^x$
[ ] $2^{2x}$
[ ] $4^{2x}$
=> $2^x + 2^x = 2 \cdot 2^x = 2^{x+1}$: due volte la stessa quantità. Le altre risposte applicano alla somma regole che valgono solo per il prodotto. Controllo con $x = 3$: $8 + 8 = 16 = 2^4$, mentre $4^3 = 64$.

>! Le proprietà valgono per prodotti, quozienti e potenze di potenze, **mai per le somme**: $a^x + a^y$ non è $a^{x+y}$, e $(a + b)^x$ non è $a^x + b^x$. Si moltiplicano le basi, $a^x \cdot b^x = (ab)^x$, solo se gli esponenti sono uguali.` },

    { id: 'funzione-esponenziale', titolo: 'La funzione esponenziale e il suo grafico', testo: R`Che differenza c'è fra aggiungere $2$ a ogni passo e moltiplicare per $2$ a ogni passo? All'inizio poca; dopo dieci passi, la prima strada porta a $21$, la seconda a $1024$. Guarda l'animazione.

[[animazione:crescita-esponenziale]]

La **funzione esponenziale** di base $a$ è $y = a^x$, con $a > 0$ e $a \ne 1$. La base $a = 1$ si esclude perché $1^x = 1$ sempre: sarebbe una retta orizzontale.

Nel grafico trascina il punto che sta sopra $x = 1$: la sua altezza è $a^1 = a$, quindi spostandolo cambi la base. Guarda quale punto resta fermo e che cosa succede quando $a$ scende sotto $1$.

[[grafico:famigliaEsponenziali]]

>* **Funzione esponenziale** $y = a^x$ ($a > 0$, $a \ne 1$). Dominio: tutti i numeri reali. Valori: solo positivi. Passa sempre per $(0;1)$, perché $a^0 = 1$. Asintoto orizzontale: $y = 0$, cioè l'asse $x$, che la curva non tocca mai.

Il verso dipende dal confronto fra $a$ e $1$:

- se $a > 1$ la funzione è **crescente**, e sale sempre più in fretta;
- se $0 < a < 1$ è **decrescente**, e scende verso $0$ al crescere di $x$.

?? Per quali valori di $x$ si ha $3^x \le 0$?
[x] per nessuno
[ ] per $x \le 0$
[ ] per $x < 0$
=> $3^x$ è sempre positivo: per $x = 0$ vale $1$, per $x$ negativi vale una frazione positiva, per esempio $3^{-2} = \frac19$. Il grafico sta tutto sopra l'asse $x$. Chi risponde $x \le 0$ confonde "esponente negativo" con "risultato negativo".

>! Per $x$ molto negativo (o molto positivo, se $0 < a < 1$) la curva si schiaccia sull'asse $x$ fino a sembrare appoggiata, ma non lo raggiunge mai: $a^x = 0$ non ha soluzioni.` },

    { id: 'numero-e', titolo: 'Il numero di Nepero e la funzione esponenziale naturale', testo: R`Metti in banca $1$ euro al $100\%$ di interesse annuo. Dopo un anno hai $2$ euro. Se la banca ti accredita metà interesse ogni sei mesi hai $\left(1 + \frac12\right)^2 = 2{,}25$ euro; con un dodicesimo ogni mese, $\left(1 + \frac1{12}\right)^{12} \approx 2{,}613$. Più spesso si accredita, più si guadagna, ma sempre meno: il risultato non supera mai un certo numero, vicino a $2{,}718$.

| accrediti in un anno ($n$) | $\left(1 + \frac1n\right)^n$ |
|---|---|
| $1$ | $2$ |
| $12$ | $2{,}613\ldots$ |
| $365$ | $2{,}7145\ldots$ |
| $1\,000\,000$ | $2{,}71828\ldots$ |

Quel numero è il **numero di Nepero**, $e$.

>* $$e = \lim_{n \to \infty} \left(1 + \frac1n\right)^n \approx 2{,}71828\ldots$$ È irrazionale: le sue cifre decimali non finiscono e non si ripetono. La funzione $y = e^x$ si chiama **esponenziale naturale**.

?? Che cosa succede a $\left(1 + \frac1n\right)^n$ quando $n$ diventa enorme?
[x] si avvicina a $2{,}718\ldots$
[ ] si avvicina a $1$, perché $1 + \frac1n$ si avvicina a $1$
[ ] diventa enorme, perché l'esponente diventa enorme
=> La base si avvicina a $1$ e l'esponente cresce: i due effetti si bilanciano, e il risultato si ferma vicino a $e$. Le altre due risposte guardano un pezzo solo; la tabella qui sopra mostra che cosa succede davvero.

Perché proprio questa base? Nel grafico cambia la base $a$ e guarda la pendenza $m$ della tangente nel punto $(0;1)$. C'è una sola base per cui la pendenza vale esattamente $1$.

[[grafico:tangenteE]]

Quella base è $e$. Con $e$ la velocità di crescita di $e^x$ in ogni punto è uguale al valore stesso di $e^x$: per questo nei modelli di crescita e decadimento continui (popolazioni, radioattività) si usa quasi sempre la forma $e^{kt}$, crescente se $k > 0$ e decrescente se $k < 0$.

>! $e$ è un numero preciso, definito da quel limite, e $2{,}7$ ne è solo un'approssimazione grossolana. Il logaritmo in base $e$ si chiama **logaritmo naturale**, $\ln x$, e lo trovi nell'argomento sui logaritmi.` },

    { id: 'equazioni-esponenziali', titolo: 'Equazioni esponenziali', testo: R`In $2^x = 8$ l'incognita sta all'esponente: è un'**equazione esponenziale**. Scrivendo $8 = 2^3$ diventa $2^x = 2^3$, e l'unico modo perché due potenze di $2$ siano uguali è che abbiano lo stesso esponente: $x = 3$.

>* Con $a > 0$ e $a \ne 1$: $$a^{f(x)} = a^{g(x)} \iff f(x) = g(x).$$ Vale perché esponenti diversi danno sempre potenze diverse: il grafico di $y = a^x$ sale (o scende) sempre, e non ripassa mai alla stessa altezza.

### Stessa base, anche se non si vede
Se le basi sono potenze dello stesso numero, si riscrivono prima con quel numero:

~ 8^x = 16^{x-1} :: $8$ e $16$ sono potenze di $2$
~ \left(\evid{2^3}\right)^x = \left(\evid{2^4}\right)^{x-1} :: $8 = 2^3$, $16 = 2^4$
~ 2^{\evid{3x}} = 2^{\evid{4x-4}} :: potenza di potenza: gli esponenti si moltiplicano
~ 3x = 4x - 4 :: stessa base: uguaglio gli esponenti
~ x = \evidb{4} :: equazione di primo grado

Controllo: $8^4 = 4096$ e $16^3 = 4096$.

### La sostituzione $t = a^x$
Quando compaiono $a^{2x}$ e $a^x$, la prima è il quadrato della seconda: con $t = a^x$ l'equazione diventa di secondo grado.

~ 9^x - 4\cdot 3^x - 45 = 0 :: compaiono $9^x$ e $3^x$
~ \left(3^x\right)^2 - 4\cdot 3^x - 45 = 0 :: $9^x = \left(3^2\right)^x = \left(3^x\right)^2$
~ \evid{t}^2 - 4\evid{t} - 45 = 0 :: pongo $t = 3^x$, che è sempre positivo
~ t = 9 \ \lor\ \evid{t = -5} :: due numeri con somma $4$ e prodotto $-45$
~ 3^x = 9 = 3^2 \Rightarrow x = \evidb{2} :: $t = -5$ si scarta: $3^x$ non è mai negativo

?? Nella sostituzione $t = 2^x$ trovi $t = 4$ e $t = -1$. Quali sono le soluzioni in $x$?
[x] solo $x = 2$
[ ] $x = 2$ e $x = -1$
[ ] $x = 2$ e $x = 0$
=> $2^x = 4$ dà $x = 2$. $2^x = -1$ non ha soluzioni, perché una potenza di $2$ è sempre positiva. Scrivere $x = -1$ vuol dire confondere il valore di $t$ con quello di $x$: $2^{-1}$ fa $\frac12$, non $-1$.

>! Le $t$ negative o nulle vanno scartate **prima** di tornare alla $x$. E ricordati di tornarci: $t$ non è la soluzione, è il valore di $a^x$.` },

    { id: 'disequazioni-esponenziali', titolo: 'Disequazioni esponenziali', testo: R`Qual è più grande, $2^5$ o $2^3$? $2^5 = 32$, quindi il primo. E fra $\left(\frac12\right)^5$ e $\left(\frac12\right)^3$? $\left(\frac12\right)^5 = \frac1{32}$ e $\left(\frac12\right)^3 = \frac18$: questa volta vince l'esponente **più piccolo**. Con una base minore di $1$, moltiplicare più volte fa rimpicciolire.

Nelle **disequazioni esponenziali** si portano i due membri alla stessa base e si confrontano gli esponenti, come nelle equazioni. Ma prima di togliere la base bisogna guardare se è maggiore o minore di $1$.

>* Se $a > 1$: $$a^{f(x)} > a^{g(x)} \iff f(x) > g(x)$$ Se $0 < a < 1$: $$a^{f(x)} > a^{g(x)} \iff f(x) < g(x)$$ Con $a > 1$ la funzione è crescente e il verso **resta**; con $0 < a < 1$ è decrescente e il verso **si rovescia**.

Esempio con $a > 1$: $3^{2x+1} \ge 3^{x+4}$ diventa $2x + 1 \ge x + 4$, cioè $x \ge 3$.

Con base minore di $1$:

~ \left(\frac14\right)^{2x-1} \le \left(\frac14\right)^{x+5} :: base $\frac14$, minore di $1$
~ 2x - 1 \ \evid{\ge}\ x + 5 :: tolgo la base e **rovescio il verso**
~ \evid{x} \ge \evid{6} :: disequazione di primo grado

?? Risolvi $\left(\frac13\right)^x > 9$.
[x] $x < -2$
[ ] $x > -2$
[ ] $x > 2$
[ ] $x < 2$
=> $9 = \left(\frac13\right)^{-2}$, quindi $\left(\frac13\right)^x > \left(\frac13\right)^{-2}$. La base è minore di $1$: il verso si rovescia, $x < -2$. Controllo con $x = -3$: $\left(\frac13\right)^{-3} = 27 > 9$, vero. Chi risponde $x > -2$ ha dimenticato di rovesciare il verso.

>! Prima di confrontare gli esponenti chiediti sempre: la base è maggiore o minore di $1$? Se hai trasformato le basi, guarda quella che resta alla fine: $\left(\frac14\right)^x$ si può anche scrivere $4^{-x}$, con base maggiore di $1$, e allora il verso resta ma l'esponente cambia segno.` },

    { id: 'modelli-crescita-decadimento', titolo: 'Modelli di crescita e decadimento', testo: R`Un capitale cresce del $5\%$ all'anno. Aggiungere il $5\%$ vuol dire moltiplicare per $1{,}05$: dopo un anno il capitale è $C_0 \cdot 1{,}05$, dopo due $C_0 \cdot 1{,}05^2$, dopo $t$ anni $C_0 \cdot 1{,}05^t$. Ogni volta che una grandezza cambia della **stessa percentuale** a ogni intervallo di tempo, si moltiplica sempre per lo stesso numero, e il risultato è un'esponenziale.

>* **Modello esponenziale:** $$y(t) = y_0 \cdot a^t$$ $y_0$ è il valore iniziale (quello per $t = 0$), $a$ è il fattore per cui si moltiplica a ogni unità di tempo. Crescita del $p\%$: $a = 1 + \frac{p}{100}$. Calo del $p\%$: $a = 1 - \frac{p}{100}$.

**Interesse composto.** Con tasso $r$ (scritto come numero decimale: $5\% = 0{,}05$), un capitale $C_0$ dopo $t$ periodi diventa $C(t) = C_0(1 + r)^t$. Con $2000$ € al $5\%$, dopo $3$ anni: $2000 \cdot 1{,}05^3 = 2000 \cdot 1{,}157625 = 2315{,}25$ €.

?? Un'auto perde il $20\%$ del suo valore ogni anno. Per quale numero si moltiplica il valore ogni anno?
[x] $0{,}8$
[ ] $0{,}2$
[ ] $1{,}2$
[ ] $-0{,}2$
=> Se perde il $20\%$ ne resta l'$80\%$: si moltiplica per $1 - 0{,}2 = 0{,}8$. Moltiplicare per $0{,}2$ vorrebbe dire tenere solo un quinto del valore; $1{,}2$ è l'aumento del $20\%$.

**Dimezzamento.** Una sostanza che si dimezza ogni intervallo fisso $T$ (il **tempo di dimezzamento**) segue $N(t) = N_0\left(\frac12\right)^{\frac{t}{T}}$: l'esponente $\frac{t}{T}$ conta quanti dimezzamenti ci sono stati.

~ N(t) = 160 \cdot \left(\frac12\right)^{\frac{t}{8}} :: $160$ mg iniziali, dimezzamento ogni $8$ giorni
~ N(24) = 160 \cdot \left(\frac12\right)^{\evid{3}} :: dopo $24$ giorni: $\frac{24}{8} = 3$ dimezzamenti
~ N(24) = 160 \cdot \evid{\frac18} :: $\left(\frac12\right)^3 = \frac18$
~ N(24) = \evidb{20}\ \text{mg} :: $160 \to 80 \to 40 \to 20$

Nella scheda **Laboratorio** c'è *La provetta*: prima scrivi quanti batteri ti aspetti, poi fai scorrere il tempo e guardi la curva che impenna.

>! Il tasso va scritto come numero decimale: il $5\%$ è $r = 0{,}05$, non $r = 5$. Con $r = 5$ la formula diventerebbe $C_0 \cdot 6^t$, e il capitale si moltiplicherebbe per sei ogni anno.` },

    { id: 'trasformazioni-grafico', titolo: 'Trasformazioni del grafico', testo: R`Il grafico di $y = 2^{x-h} + k$ è quello di $y = 2^x$ spostato. Nel grafico qui sotto trascina il punto $P$, che all'inizio sta in $(0;1)$: guarda come cambiano $h$, $k$ e l'asintoto.

[[grafico:traslazione]]

>* **Traslazioni.** $y = a^{x-h} + k$ è il grafico di $y = a^x$ spostato di $h$ in orizzontale e di $k$ in verticale. Il punto $(0;1)$ va in $(h;\,1 + k)$ e l'asintoto diventa $y = k$. Con $h$ positivo il grafico va a **destra**, anche se nella formula c'è un meno.

Per esempio $y = 2^x - 3$ è $y = 2^x$ abbassata di $3$: passa per $(0;-2)$, ha asintoto $y = -3$ e, a differenza di $2^x$, assume anche valori negativi.

**Ribaltamenti.** $y = -a^x$ è il ribaltamento rispetto all'asse $x$: ogni valore cambia segno, e il grafico sta tutto sotto l'asse. $y = a^{-x}$ è il ribaltamento rispetto all'asse $y$: per le proprietà delle potenze $a^{-x} = \left(\frac1a\right)^x$, quindi per esempio $2^{-x}$ e $\left(\frac12\right)^x$ sono la stessa funzione.

?? Quale di queste funzioni ha lo stesso grafico di $y = \left(\frac13\right)^x$?
[x] $y = 3^{-x}$
[ ] $y = -3^x$
[ ] $y = \frac13 \cdot 3^x$
[ ] $y = 3^{\frac{x}{3}}$
=> $3^{-x} = \left(3^{-1}\right)^x = \left(\frac13\right)^x$. $-3^x$ è invece sempre negativa: il meno sta davanti alla potenza e cambia segno al **risultato**, non all'esponente. Controllo con $x = 1$: $\left(\frac13\right)^1 = \frac13$, $3^{-1} = \frac13$, $-3^1 = -3$.

>! $-a^x$ e $a^{-x}$ sono due cose diverse. Nel primo il meno si applica al risultato (ribalta su e giù), nel secondo all'esponente (ribalta destra e sinistra). E $-2^x$ si legge $-(2^x)$, non $(-2)^x$.` }
  ],

  grafici: {
    scopriPotenza: {
      tipo: 'piano', x: [-3, 4], y: [-1, 10],
      funzioni: [{ f: '2^x', etichetta: 'y = 2ˣ', colore: 1 }],
      parametri: [{ nome: 'p', min: -3, max: 3, passo: 0.1, valore: 1, nascosto: true }],
      elementi: [
        { tipo: 'punto', p: ['p', '2^p'], trascina: true, etichetta: 'P', posizione: 'alto', colore: 2 },
        { tipo: 'testo', p: [-2.8, 9], testo: '2ᵖ = {{2^p}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P lungo la curva. Portalo a p = 0,5 e leggi 1,41: è √2. Poi a p = −1 e a p = −2: che frazioni ottieni?'
    },
    famigliaEsponenziali: {
      tipo: 'piano', x: [-4, 4], y: [-1, 8],
      funzioni: [{ f: 'a^x', etichetta: 'y = aˣ', colore: 1 }],
      punti: [{ x: 0, y: 1, etichetta: '(0; 1)', posizione: 'basso-destra' }],
      elementi: [
        { tipo: 'orizzontale', y: 0, asintoto: true },
        { tipo: 'segmento', da: [1, 0], a: [1, 'a'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: [1, 'a'], trascina: true, etichetta: 'a = {{a}}', posizione: 'destra', colore: 2 }
      ],
      parametri: [{ nome: 'a', min: 0.2, max: 4, passo: 0.1, valore: 2, etichetta: 'a' }],
      didascalia: 'Trascina il punto sopra x = 1 (o usa il cursore): la sua altezza è la base a. Quale punto non si muove mai? E che cosa succede per a = 1?'
    },
    tangenteE: {
      tipo: 'piano', x: [-3, 3], y: [-1, 6],
      funzioni: [{ f: 'a^x', etichetta: 'y = aˣ', colore: 1 }],
      elementi: [{ tipo: 'tangente', f: 'a^x', x0: 0, colore: 2 }],
      parametri: [{ nome: 'a', min: 1.5, max: 4, passo: 0.01, valore: 2, etichetta: 'base a' }],
      didascalia: 'Cambia la base finché la pendenza m della tangente in (0; 1) non vale 1. La base che trovi è circa 2,72: il numero e.'
    },
    traslazione: {
      tipo: 'piano', x: [-5, 5], y: [-4, 7],
      parametri: [
        { nome: 'h', min: -4, max: 4, passo: 0.5, valore: 0, nascosto: true },
        { nome: 'q', min: -2, max: 5, passo: 0.5, valore: 1, nascosto: true }
      ],
      funzioni: [
        { f: '2^x', colore: 4, tratteggio: true },
        { f: '2^(x-h) + q - 1', colore: 1 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: 'q - 1', asintoto: true, colore: 2, etichetta: 'asintoto' },
        { tipo: 'punto', p: ['h', 'q'], trascina: true, etichetta: 'P({{h}}; {{q}})', posizione: 'alto-sinistra', colore: 2 },
        { tipo: 'testo', p: [-4.8, 6.3], testo: 'h = {{h}};  k = {{q - 1}}', ancora: 'start' }
      ],
      didascalia: 'Trascina P. La curva tratteggiata è y = 2ˣ, quella piena è la sua copia spostata: P si sposta di h in orizzontale e di k in verticale, e l\'asintoto lo segue in su e in giù.'
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
      R`Uguaglio gli esponenti: $3x-1 = x+5$.`,
      R`Porto le $x$ a sinistra e i numeri a destra: $2x=6$, quindi $x=3$.`,
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

    { titolo: 'Disequazione esponenziale con base minore di 1', problema: R`Risolvi $\left(\dfrac12\right)^{x-1} > 4$.`, passi: [
      R`Scrivo $4$ come potenza di $\dfrac12$: $\left(\dfrac12\right)^{-2} = 2^2 = 4$. La disequazione diventa $\left(\dfrac12\right)^{x-1} > \left(\dfrac12\right)^{-2}$.`,
      R`La base $\dfrac12$ è minore di $1$: $y=\left(\dfrac12\right)^x$ è decrescente, quindi togliendo la base il verso **si rovescia**: $x-1 < -2$.`,
      R`Porto $-1$ a destra: $x < -1$.`,
      R`Controllo con $x=-2$: $\left(\dfrac12\right)^{-3} = 8$, e $8>4$ è vero.`
    ], risultato: R`$x < -1$` },

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
    { id: 'q-09', domanda: R`Il numero di Nepero $e$ è definito come…`, opzioni: [R`$\lim_{n\to\infty}\left(1+\dfrac1n\right)^n$`, R`$\lim_{n\to\infty}\left(1-\dfrac1n\right)^n$`, R`$\lim_{n\to\infty} n^{1/n}$`, R`$\lim_{n\to\infty}\left(1+\dfrac1n\right)^{2n}$`], corretta: 0, spiegazione: R`È la definizione classica di $e$. Gli altri limiti danno numeri diversi: con $1-\frac1n$ viene $\frac1e$, $n^{1/n}$ tende a $1$, e con l'esponente $2n$ viene $e^2$.` },
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
    { matematico: 'La leggenda della scacchiera', anni: 'leggenda, origine incerta (Persia o India medievale)', titolo: 'I chicchi di grano che il mondo non ha', testo: R`Si racconta che l'inventore del gioco degli scacchi, alla corte di un sovrano orientale entusiasta del gioco, non avesse chiesto oro né gioielli come ricompensa, ma un premio apparentemente modesto: un chicco di grano sulla prima casella della scacchiera, due sulla seconda, quattro sulla terza, e così via raddoppiando fino alla sessantaquattresima. Il sovrano, sorpreso da una richiesta così umile, accettò subito, prima di far fare i conti ai suoi tesorieri. Il totale è $2^{64}-1$, un numero di venti cifre: all'incirca mille volte tutto il grano che si produce oggi sulla Terra in un anno. Non esiste una versione storica certa di questo racconto, che compare con dettagli diversi in fonti arabe, persiane e indiane fin dal Medioevo, ma il conto alla base è del tutto reale e si rifà facilmente con carta e penna.`, legame: R`È l'esempio più immediato di quanto una crescita esponenziale, che raddoppia ogni passo, superi presto ogni immaginazione: dopo poche decine di caselle i numeri diventano già astronomici.` },
    { matematico: 'Jacob Bernoulli', anni: '1654–1705', titolo: 'L\'interesse che cresce sempre più spesso', testo: R`Nel 1683 il matematico svizzero Jacob Bernoulli si pose una domanda molto pratica: se un capitale frutta un interesse del $100\%$ all'anno, conviene capitalizzarlo una volta sola, oppure due volte al $50\%$, o quattro volte al $25\%$, e così via sempre più spesso? Bernoulli calcolò che, capitalizzando $n$ volte all'anno una frazione $1/n$ di interesse, il capitale finale si ottiene elevando $\left(1+\frac1n\right)$ alla $n$: aumentando $n$ il risultato cresce, ma non senza limite. Bernoulli dimostrò che il valore resta sempre compreso fra $2$ e $3$, anche capitalizzando istante per istante. Non diede un nome a quel limite (ci avrebbe pensato Eulero mezzo secolo dopo), ma fu il primo a dimostrare che esisteva.`, legame: R`Quel limite è esattamente $e = \lim_{n\to\infty}\left(1+\frac1n\right)^n$: il problema dell'interesse composto capitalizzato sempre più spesso è la porta da cui il numero di Nepero è entrato in matematica.` },
    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'La lettera che Eulero scelse per un numero', testo: R`Il numero che oggi chiamiamo $e$ non porta il nome di chi lo scoprì per primo: fu Eulero, fra il 1727 e il 1731, a scegliere la lettera $e$ per indicarlo, in un manoscritto giovanile e poi in una lettera del 1731 all'amico matematico Christian Goldbach. Non si sa con certezza se $e$ stesse per "esponenziale" o fosse semplicemente la prima vocale libera, dato che $a$, $b$, $c$, $d$ erano già usate altrove nei suoi appunti: Eulero stesso non lo spiegò mai. La notazione comparve in stampa per la prima volta nel suo libro di meccanica del 1736, e nel 1748, nell'*Introductio in analysin infinitorum*, Eulero ne calcolò le prime ventitré cifre decimali e ne mostrò le proprietà fondamentali, rendendolo una delle costanti più importanti dell'analisi matematica.`, legame: R`È la stessa costante che compare come base "naturale" della funzione esponenziale $e^x$, quella con tangente di pendenza $1$ nel punto $(0;1)$.` },
    { matematico: 'Thomas Robert Malthus', anni: '1766–1834', titolo: 'Una popolazione che cresce più in fretta del cibo', testo: R`Nel 1798 l'economista inglese Thomas Malthus pubblicò anonimo il *Saggio sul principio di popolazione*, sostenendo che la popolazione umana, se non frenata, cresce **geometricamente** (cioè esponenzialmente, raddoppiando a intervalli regolari), mentre le risorse alimentari possono crescere al massimo **aritmeticamente**, cioè di quantità costanti nel tempo. La conclusione, allarmante per l'epoca, era che la popolazione avrebbe presto superato la capacità della Terra di sfamarla, portando inevitabilmente a carestie, guerre o epidemie come "correttivi" naturali. Le previsioni di Malthus si sono rivelate sbagliate nel lungo periodo, soprattutto perché non aveva previsto i progressi dell'agricoltura, ma il suo modello matematico influenzò profondamente il pensiero scientifico successivo, compresa la teoria della selezione naturale di Charles Darwin.`, legame: R`È il primo esempio storico famoso in cui la differenza fra crescita esponenziale ($a^t$) e crescita lineare viene usata per fare una previsione concreta, giusta o sbagliata che fosse.` },
    { matematico: 'Willard Libby', anni: '1908–1980', titolo: 'Un orologio nascosto negli atomi', testo: R`Nel 1949 il chimico americano Willard Libby mise a punto un metodo per stimare l'età di reperti organici (legno, ossa, tessuti) misurando quanto carbonio-14 residuo contengono. Il carbonio-14 è un isotopo radioattivo che si forma nell'atmosfera e viene assorbito da ogni essere vivente; quando l'organismo muore smette di rinnovarlo, e la quantità presente decade seguendo una legge esponenziale con tempo di dimezzamento di circa $5730$ anni. Misurando quanto carbonio-14 resta rispetto a quello atteso, si risale a quanto tempo è passato dalla morte. Il metodo, che valse a Libby il premio Nobel per la chimica nel 1960, ha permesso di datare reperti archeologici in tutto il mondo, dai Rotoli del Mar Morto ad antichi insediamenti.`, legame: R`È l'applicazione più concreta della formula del decadimento $N(t)=N_0\left(\frac12\right)^{t/T}$, con base minore di $1$ e tempo di dimezzamento $T$ che qui vale $5730$ anni invece che pochi giorni.` }
  ]
});
})();
