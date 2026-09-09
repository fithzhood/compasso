(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'radicali',
  titolo: 'Radicali',

  introduzione: R`Un radicale è un'operazione che "disfa" una potenza: se $b^n = a$, il numero $b$ si chiama radice $n$-esima di $a$ e si scrive $\sqrt[n]{a}$. È l'operazione inversa dell'elevamento a potenza, proprio come la sottrazione è l'inversa dell'addizione e la divisione è l'inversa della moltiplicazione — solo che qui bisogna fare attenzione a *quando* l'operazione è possibile e a *quale* valore restituisce.

I radicali compaiono ogni volta che si deve tornare indietro da un'area o da un volume a una lunghezza: il lato di un quadrato di area data è una radice quadrata, lo spigolo di un cubo di volume dato è una radice cubica. La formula risolutiva delle equazioni di secondo grado, $\dfrac{-b \pm \sqrt{\Delta}}{2a}$, contiene una radice quadrata; il teorema di Pitagora produce quasi sempre una radice quadrata da semplificare. Anche fuori dalla geometria: la media geometrica di due numeri è una radice quadrata, e il tasso di crescita medio su più anni si calcola con una radice $n$-esima.

Per affrontare bene questo argomento serve conoscere gli insiemi numerici (in particolare i numeri irrazionali) e saper calcolare le potenze.`,

  sezioni: [
    { id: 'radice-n-esima', titolo: 'La radice n-esima', testo: R`La radice $n$-esima di un numero $a$ è quel numero (se esiste) che elevato alla $n$ dà $a$. Si scrive $\sqrt[n]{a}$: $n$ è l'**indice**, $a$ il **radicando**. Quando l'indice è $2$ non si scrive: $\sqrt{a}$ è la radice quadrata.

>* **Definizione:** $\sqrt[n]{a} = b$ significa $b^n = a$, con $b \ge 0$ se $n$ è pari.

Indice pari e indice dispari si comportano in modo diverso, ed è la prima cosa da imparare bene.

Con **indice pari** ($n = 2, 4, 6, \dots$) il radicando deve essere maggiore o uguale a zero: nessun numero reale elevato a un esponente pari dà un risultato negativo, quindi $\sqrt[n]{a}$ con $a < 0$ non esiste in $\mathbb{R}$. Quando esiste, per convenzione il risultato è **non negativo**: $\sqrt{9} = 3$, non $\pm 3$ (le soluzioni dell'equazione $x^2 = 9$ sono $\pm 3$, ma il *simbolo* $\sqrt{9}$ indica solo il valore positivo).

Con **indice dispari** ($n = 3, 5, 7, \dots$) il radicando può essere qualunque numero reale, e la radice esiste sempre, con lo stesso segno del radicando: $\sqrt[3]{-8} = -2$, perché $(-2)^3 = -8$.

Un caso che genera confusione: $\sqrt{a^2} = |a|$, non $a$. Se $a = -5$, $\sqrt{(-5)^2} = \sqrt{25} = 5 = |-5|$: la radice quadrata restituisce sempre un valore non negativo, qualunque sia il segno di $a$.

[[grafico:indici]]

Il grafico mostra la differenza: $y = \sqrt{x}$ esiste solo per $x \ge 0$, mentre $y = \sqrt[3]{x}$ è definita per ogni $x$, anche negativo. Un altro legame utile: $y = \sqrt{x}$ (per $x \ge 0$) è la funzione **inversa** di $y = x^2$ (ristretta a $x \ge 0$), ed è per questo che i due grafici sono simmetrici rispetto alla bisettrice $y = x$.

[[grafico:simmetria]]

>! Scrivere $\sqrt{a^2} = a$ è corretto solo se si sa già che $a \ge 0$. In generale va scritto $\sqrt{a^2} = |a|$.` },

    { id: 'proprieta-invariantiva', titolo: 'Proprietà invariantiva e semplificazione', testo: R`La **proprietà invariantiva** dice che moltiplicando (o dividendo) l'indice della radice e l'esponente del radicando per uno stesso numero naturale diverso da zero, il valore del radicale non cambia.

>* **Proprietà invariantiva:** $$\sqrt[n]{a^m} = \sqrt[kn]{a^{km}}$$ per ogni intero $k \ge 1$ (e, dividendo, per ogni divisore comune di $n$ e $m$).

Questa proprietà serve in due direzioni: per **semplificare** un radicale (dividendo indice ed esponente per il loro MCD) e per **ridurlo a un indice più grande** (moltiplicando), utile per confrontare o moltiplicare radicali con indici diversi, come nella prossima sezione.

Semplificazione: $\sqrt[4]{36} = \sqrt[4]{6^2}$. L'indice $4$ e l'esponente $2$ hanno MCD $2$: dividendo entrambi per $2$ si ottiene $\sqrt{6}$.

Un altro esempio: $\sqrt[6]{8} = \sqrt[6]{2^3} = \sqrt{2}$ (MCD tra indice $6$ ed esponente $3$ è $3$: l'indice diventa $2$, l'esponente diventa $1$).

>! La proprietà invariantiva vale senza problemi quando il radicando è positivo o nullo. Se il radicando è negativo, l'indice di partenza dev'essere dispari (altrimenti la radice non esisterebbe già in partenza), e anche il nuovo indice deve restare dispari: non si può passare da un indice dispari a uno pari se il radicando è negativo.

Semplificare un radicale è quasi sempre il primo passo utile prima di qualunque altra operazione: rende i calcoli successivi più semplici e permette di riconoscere radicali simili che altrimenti sembrerebbero diversi.` },

    { id: 'riduzione-stesso-indice', titolo: 'Riduzione allo stesso indice e confronto', testo: R`Per confrontare due radicali con **indici diversi**, oppure per moltiplicarli o dividerli, conviene prima ridurli allo **stesso indice**.

>* **Procedimento:** si calcola il minimo comune multiplo (mcm) degli indici; poi, con la proprietà invariantiva, si moltiplicano indice ed esponente di ciascun radicale per il fattore che serve a raggiungere l'mcm.

Esempio: confrontare $\sqrt{2}$ e $\sqrt[3]{3}$. Gli indici sono $2$ e $3$, $\text{mcm}(2,3) = 6$.

- $\sqrt{2} = \sqrt[6]{2^3} = \sqrt[6]{8}$ (indice ed esponente moltiplicati per $3$);
- $\sqrt[3]{3} = \sqrt[6]{3^2} = \sqrt[6]{9}$ (indice ed esponente moltiplicati per $2$).

Ora gli indici sono uguali: si confrontano i radicandi. Poiché $8 < 9$, si conclude $\sqrt{2} < \sqrt[3]{3}$.

>* Con lo **stesso indice**, il confronto si riduce al confronto dei radicandi: per $a, b \ge 0$, $\sqrt[n]{a} < \sqrt[n]{b}$ se e solo se $a < b$. Questo perché la funzione radice $n$-esima è **crescente**.

>! Non si può confrontare $\sqrt{2}$ e $\sqrt[3]{3}$ guardando solo i radicandi ($2 < 3$) senza prima ridurre allo stesso indice: indici diversi rendono il confronto diretto privo di significato.` },

    { id: 'moltiplicazione-divisione', titolo: 'Moltiplicazione e divisione di radicali', testo: R`Con lo stesso indice, moltiplicare o dividere radicali significa moltiplicare o dividere i radicandi, lasciando l'indice invariato.

>* $$\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{a \cdot b} \qquad\qquad \frac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\frac{a}{b}} \ \ (b \ne 0)$$ Se $n$ è pari serve $a, b \ge 0$.

Esempio: $\sqrt{3} \cdot \sqrt{12} = \sqrt{36} = 6$. Conviene sempre controllare se il prodotto dei radicandi è una potenza perfetta, come qui: si evita di lasciare il risultato sotto radice.

Esempio di divisione: $\dfrac{\sqrt{18}}{\sqrt{2}} = \sqrt{\dfrac{18}{2}} = \sqrt{9} = 3$.

Se gli indici sono diversi, non si può applicare direttamente la formula: bisogna prima ridurre i radicali allo stesso indice, come visto nella sezione precedente, e solo dopo moltiplicare o dividere i radicandi.

>! $\sqrt{a} + \sqrt{b} \ne \sqrt{a+b}$: la radice di una somma **non** è la somma delle radici. Verificalo con $a = 9$, $b = 16$: $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$, ma $\sqrt{9+16} = \sqrt{25} = 5$: sono numeri diversi.` },

    { id: 'trasporto-segno-radice', titolo: 'Portare fuori e portare dentro dal segno di radice', testo: R`**Portare fuori** dal segno di radice un fattore significa riscrivere il radicando come prodotto in cui compare una potenza con esponente multiplo dell'indice, ed estrarla.

>* Se $a \ge 0$: $$\sqrt[n]{a^n \cdot b} = a\,\sqrt[n]{b}$$ Se l'indice è pari e non si conosce il segno del fattore che esce, si scrive $\sqrt[n]{a^n \cdot b} = |a|\,\sqrt[n]{b}$.

Esempio: $\sqrt{72} = \sqrt{36 \cdot 2} = \sqrt{36}\cdot\sqrt{2} = 6\sqrt{2}$. Con una lettera: $\sqrt{x^2 \cdot 5} = |x|\sqrt{5}$ (esce $|x|$, non $x$, perché non si sa se $x$ è positivo o negativo).

**Portare dentro** è l'operazione inversa: si eleva il fattore fuori dalla radice alla potenza pari all'indice, e lo si moltiplica per il radicando.

>* $$a\,\sqrt[n]{b} = \sqrt[n]{a^n \cdot b} \qquad (a \ge 0)$$

Esempio: $3\sqrt{2} = \sqrt{3^2 \cdot 2} = \sqrt{18}$.

Se il fattore fuori dalla radice è **negativo** e l'indice è **pari**, il segno meno non può entrare dentro (il radicale aritmetico, con indice pari, non è mai negativo): si porta dentro il valore assoluto del fattore e si lascia il meno fuori. $-3\sqrt{2} = -\sqrt{3^2 \cdot 2} = -\sqrt{18}$ (e **non** $\sqrt{-18}$, che non esiste).

>! Portare dentro $-3$ come se fosse positivo, scrivendo $\sqrt{-18}$, è un errore molto comune: si starebbe prendendo la radice quadrata di un numero negativo, che non esiste in $\mathbb{R}$. Il segno meno resta sempre fuori dal radicale.` },

    { id: 'potenza-radice-di-radicale', titolo: 'Potenza di un radicale e radice di radicale', testo: R`Due regole permettono di gestire una radice elevata a potenza, o una radice dentro un'altra radice.

>* **Potenza di un radicale:** $$(\sqrt[n]{a})^m = \sqrt[n]{a^m}$$ **Radice di radicale:** $$\sqrt[k]{\sqrt[n]{a}} = \sqrt[kn]{a}$$ (gli indici si moltiplicano).

Esempio di potenza: $(\sqrt{3})^4 = \sqrt{3^4} = \sqrt{81} = 9$; oppure, più comodo, $(\sqrt{3})^4 = \left((\sqrt{3})^2\right)^2 = 3^2 = 9$.

Esempio di radice di radicale: $\sqrt{\sqrt[3]{5}} = \sqrt[2 \cdot 3]{5} = \sqrt[6]{5}$: una radice quadrata "applicata" a una radice cubica diventa una radice sesta, perché estrarre due radici in successione equivale a estrarne una con indice pari al prodotto degli indici.

>* Un modo per ricordare entrambe le regole: la radice $n$-esima "distribuisce" bene su potenze e su altre radici, esattamente come le proprietà delle potenze — non è un caso, perché una radice **è** una potenza, come si vede nella sezione sull'esponente frazionario.

>! Nella radice di radicale gli indici si **moltiplicano**, non si sommano: $\sqrt[3]{\sqrt{5}} = \sqrt[6]{5}$ (indici $3$ e $2$, prodotto $6$), non $\sqrt[5]{5}$.` },

    { id: 'addizione-radicali-simili', titolo: 'Addizione di radicali simili', testo: R`Due radicali sono **simili** se hanno lo stesso indice e lo stesso radicando (dopo aver semplificato entrambi). Solo i radicali simili si sommano tra loro, sommando i coefficienti davanti al radicale.

>* $$p\,\sqrt[n]{a} + q\,\sqrt[n]{a} = (p + q)\,\sqrt[n]{a}$$

Esempio diretto: $2\sqrt{3} + 5\sqrt{3} = 7\sqrt{3}$.

Spesso i radicali non sembrano simili finché non si semplificano: $3\sqrt{2} - \sqrt{8}$. Il secondo termine si semplifica portando fuori: $\sqrt{8} = \sqrt{4 \cdot 2} = 2\sqrt{2}$. Ora sono simili: $3\sqrt{2} - 2\sqrt{2} = \sqrt{2}$.

Un'espressione con più radicali si tratta come un polinomio, trattando ogni radicale (semplificato) come se fosse un'incognita diversa: $\sqrt{2} + \sqrt{3} - 4\sqrt{2} + 2\sqrt{3} = -3\sqrt{2} + 3\sqrt{3}$, perché $\sqrt{2}$ e $\sqrt{3}$ non sono simili e restano separati.

>! $\sqrt{2} + \sqrt{3}$ **non** si può scrivere come un unico radicale: non sono simili (radicandi diversi), e non esiste nessuna proprietà che permetta di sommarli sotto lo stesso segno di radice. Il risultato resta $\sqrt{2} + \sqrt{3}$, un numero perfettamente legittimo anche se non "raccolto" in un solo termine.` },

    { id: 'razionalizzazione', titolo: 'Razionalizzazione del denominatore', testo: R`Razionalizzare il denominatore di una frazione significa riscriverla in modo che il denominatore non contenga più radicali. Sono tre i casi tipici.

### Denominatore $\sqrt{a}$ (radice quadrata sola)

Si moltiplica numeratore e denominatore per $\sqrt{a}$: $$\frac{1}{\sqrt{a}} = \frac{\sqrt{a}}{a}$$ Esempio: $\dfrac{3}{\sqrt{5}} = \dfrac{3\sqrt{5}}{5}$.

### Denominatore $\sqrt[n]{a^m}$ con $m < n$

Si moltiplica per $\sqrt[n]{a^{n-m}}$, in modo che l'esponente totale del radicando diventi $n$ e la radice sparisca: $$\frac{1}{\sqrt[n]{a^m}} = \frac{\sqrt[n]{a^{n-m}}}{a}$$ Esempio: $\dfrac{1}{\sqrt[3]{a^2}}$, moltiplicando per $\sqrt[3]{a}$: $\dfrac{\sqrt[3]{a}}{\sqrt[3]{a^3}} = \dfrac{\sqrt[3]{a}}{a}$.

### Denominatore binomio, $a \pm \sqrt{b}$

Si moltiplica per il **razionalizzante**, cioè il binomio con il segno centrale cambiato, sfruttando la differenza di quadrati $(x+y)(x-y) = x^2 - y^2$: $$\frac{1}{a \pm \sqrt{b}} = \frac{a \mp \sqrt{b}}{a^2 - b}$$ Esempio: $\dfrac{1}{2 + \sqrt{3}} \cdot \dfrac{2 - \sqrt{3}}{2-\sqrt{3}} = \dfrac{2-\sqrt{3}}{4 - 3} = 2 - \sqrt{3}$.

Lo stesso procedimento vale se il binomio è fatto di due radici, $\sqrt{a} \pm \sqrt{b}$: il razionalizzante è $\sqrt{a} \mp \sqrt{b}$, e $(\sqrt{a})^2 - (\sqrt{b})^2 = a - b$.

>! Il razionalizzante cambia **solo** il segno centrale, non i segni di entrambi i termini: il razionalizzante di $2 + \sqrt{3}$ è $2 - \sqrt{3}$, non $-2-\sqrt{3}$.` },

    { id: 'esponente-frazionario', titolo: 'Potenze con esponente frazionario', testo: R`Le potenze si possono estendere a esponenti **razionali**, non solo interi: la definizione collega direttamente potenze e radicali.

>* **Definizione:** $$a^{\frac{m}{n}} = \sqrt[n]{a^m} \qquad (a > 0,\ n \ge 2)$$ Il denominatore dell'esponente è l'indice della radice, il numeratore è l'esponente del radicando.

Esempio: $8^{\frac{2}{3}} = \sqrt[3]{8^2} = \sqrt[3]{64} = 4$; conviene calcolare prima la radice: $8^{\frac{2}{3}} = (\sqrt[3]{8})^2 = 2^2 = 4$, con numeri più piccoli.

Con questa definizione, tutte le proprietà delle potenze (già note per esponenti interi) valgono anche per esponenti frazionari: $a^{\frac{1}{2}}\cdot a^{\frac{1}{3}} = a^{\frac{1}{2}+\frac{1}{3}} = a^{\frac{5}{6}}$, cioè $\sqrt{a}\cdot\sqrt[3]{a} = \sqrt[6]{a^5}$.

[[grafico:esponenteN]]

Il grafico mostra $y = x^{\frac{1}{n}}$ per $x \ge 0$: al crescere di $n$ (radici di indice sempre più alto) la curva sale più ripida vicino a $x=0$ e poi si appiattisce, crescendo più lentamente, perché estrarre una radice di indice alto "smorza" molto di più i numeri grandi.

>! Per basi **negative** l'esponente frazionario è delicato: $a^{\frac{m}{n}}$ ha senso reale solo se $n$ è dispari (altrimenti equivale a una radice pari di un numero negativo, che non esiste). Per questo, quando si scrivono le regole delle potenze con esponente frazionario, di solito si richiede $a > 0$: evita di dover distinguere caso per caso.` },

    { id: 'radicali-doppi', titolo: 'Radicali doppi', testo: R`Un **radicale doppio** è un'espressione della forma $\sqrt{a \pm \sqrt{b}}$: una radice quadrata che contiene un'altra radice quadrata. A volte si può riscrivere come somma (o differenza) di due radicali semplici, il che rende i calcoli successivi più facili.

>* **Identità:** per $p \ge q \ge 0$, $$\sqrt{(p+q) \pm 2\sqrt{pq}} = \sqrt{p} \pm \sqrt{q}$$ (si verifica elevando al quadrato il membro destro).

Per usarla su $\sqrt{A + 2\sqrt{B}}$ si cercano due numeri $p$ e $q$ tali che $p + q = A$ e $p \cdot q = B$: gli stessi due numeri delle equazioni di secondo grado con somma e prodotto dati.

Esempio: $\sqrt{7 + 2\sqrt{10}}$. Cerco $p+q=7$, $pq=10$: sono $5$ e $2$. Quindi $\sqrt{7+2\sqrt{10}} = \sqrt{5}+\sqrt{2}$. Verifica: $(\sqrt{5}+\sqrt{2})^2 = 5+2+2\sqrt{10} = 7+2\sqrt{10}$. ✓

Se il doppio prodotto non compare già come $2\sqrt{\ }$, prima si riscrive: $\sqrt{6+\sqrt{20}} = \sqrt{6+2\sqrt{5}}$ (perché $\sqrt{20}=2\sqrt{5}$), e poi si cercano $p+q=6$, $pq=5$: sono $5$ e $1$.

>! Se non si trovano due numeri $p$, $q$ (interi, o comunque "semplici") con quella somma e quel prodotto — cioè se l'equazione $t^2 - At + B = 0$ non ha soluzioni razionali — il radicale doppio **non conviene** sdoppiarlo: si lascia scritto così com'è. Non tutti i radicali doppi si semplificano.` },

    { id: 'espressioni-equazioni', titolo: 'Espressioni ed equazioni con i radicali', testo: R`Le regole viste finora si combinano per semplificare **espressioni** con più operazioni fra radicali (somme, prodotti, potenze, razionalizzazioni), seguendo l'ordine delle operazioni come in qualunque espressione algebrica: prima le potenze e le radici, poi prodotti e divisioni, infine somme e differenze, e sempre le parentesi per prime.

Un'**equazione irrazionale** è un'equazione in cui l'incognita compare sotto il segno di radice. Il caso più semplice, $\sqrt[n]{f(x)} = c$, si risolve isolando la radice ed elevando entrambi i membri alla potenza $n$.

>* **Procedimento** per $\sqrt{f(x)} = c$ (indice pari): 1) si scrive la condizione di esistenza $f(x) \ge 0$; 2) se $c < 0$, l'equazione è **impossibile** (il radicale aritmetico non è mai negativo), altrimenti si eleva al quadrato: $f(x) = c^2$; 3) si risolve, e si controlla che le soluzioni rispettino la condizione del punto 1.

Esempio: $\sqrt{2x-3} = 3$. Condizione: $2x - 3 \ge 0$. Elevo al quadrato: $2x - 3 = 9$, quindi $x = 6$, che rispetta la condizione.

Quando al posto di un numero c'è un'altra espressione con la $x$, come in $\sqrt{x+3} = x - 3$, bisogna imporre anche che il secondo membro sia $\ge 0$ (perché il primo lo è sempre): elevando al quadrato si possono introdurre soluzioni **estranee**, che vanno riconosciute e scartate confrontandole con questa condizione.

>! Elevare al quadrato non è un'operazione reversibile: può introdurre soluzioni che non risolvono l'equazione di partenza. Ogni soluzione trovata va sempre verificata (o confrontata con le condizioni scritte all'inizio), altrimenti si rischia di accettare un valore sbagliato.` }
  ],

  grafici: {
    indici: {
      tipo: 'piano', x: [-8, 8], y: [-3, 3],
      etichette: { x: 'x', y: 'y' },
      funzioni: [
        { f: 'sqrt(x)', etichetta: 'y = √x', colore: 1, dominio: [0, 8] },
        { f: 'cbrt(x)', etichetta: 'y = ∛x', colore: 2, dominio: [-8, 8] }
      ],
      didascalia: "y = √x esiste solo per x >= 0; y = ∛x esiste per ogni x, anche negativo."
    },
    simmetria: {
      tipo: 'piano', x: [-1, 9], y: [-1, 9],
      etichette: { x: 'x', y: 'y' },
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [0, 3] },
        { f: 'sqrt(x)', etichetta: 'y = √x', colore: 2, dominio: [0, 9] }
      ],
      elementi: [
        { tipo: 'retta', m: 1, q: 0, tratteggio: true, etichetta: 'y = x' }
      ],
      didascalia: "y = √x è la funzione inversa di y = x² (per x >= 0): i due grafici sono simmetrici rispetto alla bisettrice y = x."
    },
    esponenteN: {
      tipo: 'piano', x: [0, 8], y: [0, 3.5],
      etichette: { x: 'x', y: 'y' },
      funzioni: [
        { f: 'x^(1/n)', etichetta: 'y = x^(1/n)', colore: 1, dominio: [0, 8] }
      ],
      elementi: [
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'p = {{p}}', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [0.3, 3.2], testo: '√p = {{sqrt(p)}}', ancora: 'start' }
      ],
      parametri: [
        { nome: 'n', min: 2, max: 6, passo: 1, valore: 2, etichetta: 'n' },
        { nome: 'p', min: 0, max: 8, passo: 0.5, valore: 4, nascosto: true }
      ],
      didascalia: "Trascina il punto sull'asse x e cambia n con il cursore: piu' n cresce, piu' la curva y = x^(1/n) sale ripida vicino a x = 0 e poi si appiattisce."
    }
  },

  esempi: [
    { titolo: 'Semplificare portando fuori', problema: R`Semplifica $\sqrt{200}$ portando fuori dal segno di radice tutti i fattori possibili.`, passi: [
      R`Cerco il più grande quadrato perfetto che divide $200$: $200 = 100 \cdot 2$, e $100 = 10^2$.`,
      R`Uso la proprietà del prodotto: $\sqrt{200} = \sqrt{10^2 \cdot 2} = \sqrt{10^2}\cdot\sqrt{2} = 10\sqrt{2}$.`,
      R`Verifica elevando al quadrato: $(10\sqrt{2})^2 = 100 \cdot 2 = 200$. ✓`
    ], risultato: R`$\sqrt{200} = 10\sqrt{2}$` },

    { titolo: 'Confrontare radicali con indici diversi', problema: R`Confronta $\sqrt{2}$ e $\sqrt[3]{4}$: quale dei due è maggiore?`, passi: [
      R`Gli indici sono diversi ($2$ e $3$): calcolo $\text{mcm}(2,3)=6$ e riduco entrambi i radicali all'indice $6$ con la proprietà invariantiva.`,
      R`$\sqrt{2} = \sqrt[6]{2^3} = \sqrt[6]{8}$ (indice ed esponente moltiplicati per $3$).`,
      R`$\sqrt[3]{4} = \sqrt[6]{4^2} = \sqrt[6]{16}$ (indice ed esponente moltiplicati per $2$).`,
      R`Con lo stesso indice si confrontano i radicandi: $16 > 8$, quindi $\sqrt[6]{16} > \sqrt[6]{8}$.`
    ], risultato: R`$\sqrt[3]{4} > \sqrt{2}$` },

    { titolo: 'Razionalizzare un binomio', problema: R`Razionalizza $\dfrac{5}{3+\sqrt{2}}$.`, passi: [
      R`Il denominatore è un binomio con un radicale: moltiplico numeratore e denominatore per il razionalizzante $3-\sqrt{2}$.`,
      R`$\dfrac{5}{3+\sqrt{2}}\cdot\dfrac{3-\sqrt{2}}{3-\sqrt{2}} = \dfrac{5(3-\sqrt{2})}{3^2-(\sqrt{2})^2} = \dfrac{15-5\sqrt{2}}{9-2}$.`,
      R`$\dfrac{15-5\sqrt{2}}{7}$: il denominatore non ha più radicali.`
    ], risultato: R`$\dfrac{15-5\sqrt{2}}{7}$` },

    { titolo: 'Esponente frazionario', problema: R`Calcola $27^{\frac{2}{3}}$ senza calcolatrice.`, passi: [
      R`Per definizione $a^{\frac{m}{n}}=\sqrt[n]{a^m}$: qui $27^{\frac{2}{3}}=\sqrt[3]{27^2}$.`,
      R`Conviene estrarre prima la radice: $\sqrt[3]{27^2}=(\sqrt[3]{27})^2$, e $\sqrt[3]{27}=3$.`,
      R`$3^2=9$.`
    ], risultato: R`$27^{\frac{2}{3}}=9$` },

    { titolo: 'Un\'equazione con soluzione estranea', problema: R`Risolvi $\sqrt{x+3}=x-3$.`, passi: [
      R`Condizioni: il radicando dev'essere $\ge0$: $x+3\ge0 \Rightarrow x\ge-3$. Il primo membro è sempre $\ge0$, quindi anche il secondo deve esserlo: $x-3\ge0 \Rightarrow x\ge3$.`,
      R`Elevo al quadrato entrambi i membri: $x+3=(x-3)^2=x^2-6x+9$.`,
      R`Porto tutto a un membro: $x^2-7x+6=0$, cioè $(x-1)(x-6)=0$: $x=1$ oppure $x=6$.`,
      R`Confronto con la condizione $x\ge3$: $x=1$ non la rispetta ed è una soluzione **estranea**, introdotta dall'elevamento al quadrato. Resta $x=6$.`,
      R`Verifica: $\sqrt{6+3}=\sqrt{9}=3$ e $6-3=3$. ✓`
    ], risultato: R`$x=6$ (mentre $x=1$ è una soluzione estranea, da scartare)` },

    { titolo: 'Sdoppiare un radicale doppio', problema: R`Scrivi $\sqrt{6+2\sqrt{5}}$ come somma di due radicali semplici.`, passi: [
      R`Cerco due numeri $p$ e $q$ con $p+q=6$ e $p\cdot q=5$: sono $5$ e $1$.`,
      R`Allora $6+2\sqrt{5} = 5+1+2\sqrt{5\cdot1} = (\sqrt{5}+\sqrt{1})^2$.`,
      R`Quindi $\sqrt{6+2\sqrt{5}}=\sqrt{5}+\sqrt{1}=\sqrt{5}+1$.`
    ], risultato: R`$\sqrt{6+2\sqrt{5}}=\sqrt{5}+1$` }
  ],

  formulario: [
    { nome: 'Radice n-esima', formula: R`\sqrt[n]{a} = b \quad \text{se } b^n = a`, nota: R`Se $n$ è pari serve $a \ge 0$ e si prende $b \ge 0$; se $n$ è dispari, $a$ può essere qualunque numero reale.` },
    { nome: 'Radice quadrata di un quadrato', formula: R`\sqrt{a^2} = |a|` },
    { nome: 'Proprietà invariantiva', formula: R`\sqrt[n]{a^m} = \sqrt[kn]{a^{km}}`, nota: R`Vale per ogni intero $k \ge 1$; se il radicando è negativo, l'indice deve restare dispari.` },
    { nome: 'Prodotto di radicali', formula: R`\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{a \cdot b}`, nota: R`Stesso indice; se $n$ è pari servono $a, b \ge 0$.` },
    { nome: 'Quoziente di radicali', formula: R`\frac{\sqrt[n]{a}}{\sqrt[n]{b}} = \sqrt[n]{\frac{a}{b}}`, nota: R`Con $b \ne 0$.` },
    { nome: 'Portare fuori dal segno di radice', formula: R`\sqrt[n]{a^n \cdot b} = |a|\sqrt[n]{b}`, nota: R`Se $n$ è dispari il valore assoluto non serve: $\sqrt[n]{a^n b} = a\sqrt[n]{b}$.` },
    { nome: 'Portare dentro il segno di radice', formula: R`a\sqrt[n]{b} = \sqrt[n]{a^n \cdot b}`, nota: R`Vale per $a \ge 0$; se $a<0$ e $n$ è pari, si porta dentro $|a|$ e si lascia il segno meno fuori.` },
    { nome: 'Potenza di un radicale', formula: R`(\sqrt[n]{a})^m = \sqrt[n]{a^m}` },
    { nome: 'Radice di radicale', formula: R`\sqrt[k]{\sqrt[n]{a}} = \sqrt[kn]{a}`, nota: R`Gli indici si moltiplicano.` },
    { nome: 'Somma di radicali simili', formula: R`p\sqrt[n]{a} + q\sqrt[n]{a} = (p+q)\sqrt[n]{a}` },
    { nome: 'Razionalizzazione (denominatore monomio)', formula: R`\frac{1}{\sqrt{a}} = \frac{\sqrt{a}}{a}` },
    { nome: 'Razionalizzazione (radice di indice n)', formula: R`\frac{1}{\sqrt[n]{a^m}} = \frac{\sqrt[n]{a^{n-m}}}{a}`, nota: R`Con $m < n$.` },
    { nome: 'Razionalizzazione (denominatore binomio)', formula: R`\frac{1}{a \pm \sqrt{b}} = \frac{a \mp \sqrt{b}}{a^2 - b}` },
    { nome: 'Potenza con esponente frazionario', formula: R`a^{\frac{m}{n}} = \sqrt[n]{a^m}`, nota: R`Per $a > 0$; se $a<0$ serve $n$ dispari.` },
    { nome: 'Radicale doppio', formula: R`\sqrt{(p+q) \pm 2\sqrt{pq}} = \sqrt{p} \pm \sqrt{q}`, nota: R`Con $p \ge q \ge 0$; utile quando $p+q=A$ e $pq=B$ sono numeri semplici.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'radice-n-esima', tipo: 'definizione', fronte: R`Che cos'è la radice $n$-esima di $a$?`, retro: R`Il numero $b$ (se esiste) tale che $b^n = a$; con $n$ pari si richiede $a \ge 0$ e $b \ge 0$.` },
    { id: 'fc-02', sezione: 'radice-n-esima', tipo: 'concetto', fronte: R`Perché $\sqrt{a}$ esiste solo per $a \ge 0$?`, retro: R`Perché nessun numero reale elevato al quadrato dà un risultato negativo.` },
    { id: 'fc-03', sezione: 'radice-n-esima', tipo: 'formula', fronte: R`Quanto vale $\sqrt{a^2}$?`, retro: R`$|a|$, non $a$: la radice quadrata è sempre non negativa.` },
    { id: 'fc-04', sezione: 'radice-n-esima', tipo: 'concetto', fronte: R`Radice con indice dispari di un numero negativo`, retro: R`Esiste sempre, con lo stesso segno del radicando: $\sqrt[3]{-8} = -2$.` },
    { id: 'fc-05', sezione: 'proprieta-invariantiva', tipo: 'definizione', fronte: R`Enuncia la proprietà invariantiva dei radicali`, retro: R`Moltiplicando (o dividendo) indice ed esponente del radicando per lo stesso numero, il valore del radicale non cambia.` },
    { id: 'fc-06', sezione: 'proprieta-invariantiva', tipo: 'procedura', fronte: R`Come si semplifica un radicale con la proprietà invariantiva?`, retro: R`Si dividono indice ed esponente del radicando per il loro MCD.` },
    { id: 'fc-07', sezione: 'riduzione-stesso-indice', tipo: 'procedura', fronte: R`Come si confrontano $\sqrt{2}$ e $\sqrt[3]{3}$?`, retro: R`Si riducono allo stesso indice (il mcm di $2$ e $3$, cioè $6$) e poi si confrontano i radicandi.` },
    { id: 'fc-08', sezione: 'moltiplicazione-divisione', tipo: 'formula', fronte: R`Prodotto di due radicali con lo stesso indice`, retro: R`$\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{ab}$.` },
    { id: 'fc-09', sezione: 'moltiplicazione-divisione', tipo: 'concetto', fronte: R`$\sqrt{a} + \sqrt{b}$ è uguale a $\sqrt{a+b}$?`, retro: R`No. La radice di una somma non è la somma delle radici (verificalo con $a=9$, $b=16$).` },
    { id: 'fc-10', sezione: 'trasporto-segno-radice', tipo: 'procedura', fronte: R`Come si porta un fattore fuori dal segno di radice?`, retro: R`Si scompone il radicando isolando una potenza con esponente multiplo dell'indice, e la si estrae.` },
    { id: 'fc-11', sezione: 'trasporto-segno-radice', tipo: 'concetto', fronte: R`Perché $-3\sqrt{2}$ non si scrive $\sqrt{-18}$?`, retro: R`Con indice pari il radicale non è mai negativo: il segno meno resta fuori, dentro si porta solo $|-3| = 3$.` },
    { id: 'fc-12', sezione: 'potenza-radice-di-radicale', tipo: 'formula', fronte: R`Potenza di un radicale`, retro: R`$(\sqrt[n]{a})^m = \sqrt[n]{a^m}$.` },
    { id: 'fc-13', sezione: 'potenza-radice-di-radicale', tipo: 'formula', fronte: R`Radice di un'altra radice`, retro: R`$\sqrt[k]{\sqrt[n]{a}} = \sqrt[kn]{a}$: gli indici si moltiplicano.` },
    { id: 'fc-14', sezione: 'addizione-radicali-simili', tipo: 'definizione', fronte: R`Quando due radicali si dicono simili?`, retro: R`Quando, dopo aver semplificato, hanno lo stesso indice e lo stesso radicando.` },
    { id: 'fc-15', sezione: 'addizione-radicali-simili', tipo: 'procedura', fronte: R`Come si sommano $3\sqrt{2}$ e $-\sqrt{8}$?`, retro: R`Si semplifica $\sqrt{8}=2\sqrt{2}$; ora sono simili: $3\sqrt{2}-2\sqrt{2}=\sqrt{2}$.` },
    { id: 'fc-16', sezione: 'razionalizzazione', tipo: 'procedura', fronte: R`Come si razionalizza $\dfrac{1}{\sqrt{a}}$?`, retro: R`Si moltiplica numeratore e denominatore per $\sqrt{a}$: si ottiene $\dfrac{\sqrt{a}}{a}$.` },
    { id: 'fc-17', sezione: 'razionalizzazione', tipo: 'procedura', fronte: R`Come si razionalizza $\dfrac{1}{\sqrt[n]{a^m}}$ (con $m<n$)?`, retro: R`Si moltiplica per $\sqrt[n]{a^{n-m}}$, così l'esponente del radicando diventa $n$ e la radice sparisce.` },
    { id: 'fc-18', sezione: 'razionalizzazione', tipo: 'procedura', fronte: R`Come si razionalizza $\dfrac{1}{a+\sqrt{b}}$?`, retro: R`Si moltiplica per il razionalizzante $a-\sqrt{b}$: al denominatore resta $a^2-b$.` },
    { id: 'fc-19', sezione: 'esponente-frazionario', tipo: 'formula', fronte: R`Definizione di potenza con esponente frazionario`, retro: R`$a^{\frac{m}{n}} = \sqrt[n]{a^m}$, per $a>0$.` },
    { id: 'fc-20', sezione: 'esponente-frazionario', tipo: 'concetto', fronte: R`Perché con base negativa serve $n$ dispari?`, retro: R`Perché altrimenti $a^{\frac{m}{n}}$ equivarrebbe a una radice di indice pari di un numero negativo, che non esiste.` },
    { id: 'fc-21', sezione: 'radicali-doppi', tipo: 'definizione', fronte: R`Che cos'è un radicale doppio?`, retro: R`Un'espressione del tipo $\sqrt{a \pm \sqrt{b}}$, cioè una radice quadrata che contiene un'altra radice quadrata.` },
    { id: 'fc-22', sezione: 'radicali-doppi', tipo: 'formula', fronte: R`Come si sdoppia $\sqrt{A+2\sqrt{B}}$?`, retro: R`Si cercano $p,q$ con $p+q=A$ e $pq=B$: allora $\sqrt{A+2\sqrt{B}}=\sqrt{p}+\sqrt{q}$.` },
    { id: 'fc-23', sezione: 'espressioni-equazioni', tipo: 'procedura', fronte: R`Passi per risolvere $\sqrt{f(x)}=c$`, retro: R`C.e. $f(x)\ge0$; se $c<0$ impossibile; altrimenti si eleva al quadrato e si verifica la soluzione.` },
    { id: 'fc-24', sezione: 'espressioni-equazioni', tipo: 'concetto', fronte: R`Quando $\sqrt{f(x)}=c$ non ha soluzioni?`, retro: R`Quando $c<0$: il radicale aritmetico non è mai negativo, qualunque sia $f(x)$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Semplifica $\sqrt{75}$ portando fuori dal segno di radice tutti i fattori possibili.`, suggerimenti: [R`Scomponi $75$ cercando il più grande quadrato perfetto che lo divide.`, R`$75 = 25 \cdot 3$.`], risposta: { tipo: 'testo', accettate: ['5√3', '5*sqrt(3)', '5 sqrt 3', '5sqrt(3)', '5sqrt3'] }, soluzione: [R`$75 = 25 \cdot 3$, e $25=5^2$.`, R`$\sqrt{75}=\sqrt{25\cdot3}=\sqrt{25}\cdot\sqrt{3}=5\sqrt{3}$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $\sqrt{3} \cdot \sqrt{12}$.`, suggerimenti: [R`Con lo stesso indice, moltiplica i radicandi.`, R`$3 \cdot 12 = 36$, un quadrato perfetto.`], risposta: { tipo: 'numero', valore: 6 }, soluzione: [R`$\sqrt{3}\cdot\sqrt{12}=\sqrt{3\cdot12}=\sqrt{36}$.`, R`$\sqrt{36}=6$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Semplifica $\sqrt[4]{36}$ usando la proprietà invariantiva.`, suggerimenti: [R`Scrivi $36$ come potenza: $36=6^2$.`, R`L'indice è $4$, l'esponente è $2$: dividili per il loro MCD.`], risposta: { tipo: 'testo', accettate: ['√6', 'sqrt(6)', 'sqrt 6'] }, soluzione: [R`$36=6^2$, quindi $\sqrt[4]{36}=\sqrt[4]{6^2}$.`, R`Il MCD tra indice $4$ ed esponente $2$ è $2$: dividendo entrambi si ottiene $\sqrt{6}$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Un cubo ha volume $125\ \text{cm}^3$. Calcola la misura dello spigolo.`, suggerimenti: [R`Se $\ell$ è lo spigolo, $\ell^3 = 125$.`, R`Estrai la radice cubica di $125$.`], risposta: { tipo: 'numero', valore: 5 }, soluzione: [R`Il volume di un cubo di spigolo $\ell$ è $\ell^3$: $\ell^3=125$.`, R`$\ell=\sqrt[3]{125}=5$ (perché $5^3=125$), misurato in cm.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola $3\sqrt{5}+2\sqrt{5}-\sqrt{5}$.`, suggerimenti: [R`I tre radicali sono già simili: stesso indice, stesso radicando.`, R`Somma i coefficienti: $3+2-1$.`], risposta: { tipo: 'testo', accettate: ['4√5', '4*sqrt(5)', '4 sqrt 5', '4sqrt(5)', '4sqrt5'] }, soluzione: [R`Sono radicali simili (stesso indice $2$, stesso radicando $5$).`, R`$3\sqrt{5}+2\sqrt{5}-\sqrt{5}=(3+2-1)\sqrt{5}=4\sqrt{5}$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi $-2\sqrt{7}$ portando il fattore $2$ dentro il segno di radice.`, suggerimenti: [R`Il segno meno resta fuori dal radicale (l'indice è pari).`, R`Eleva $2$ al quadrato e moltiplicalo per $7$.`], risposta: { tipo: 'testo', accettate: ['-√28', '-sqrt(28)', '-sqrt 28', '-sqrt28'] }, soluzione: [R`$2\sqrt{7}=\sqrt{2^2\cdot7}=\sqrt{28}$.`, R`Il segno meno non entra (indice pari, radicale mai negativo): $-2\sqrt{7}=-\sqrt{28}$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Razionalizza $\dfrac{1}{\sqrt{5}}$.`, suggerimenti: [R`Moltiplica numeratore e denominatore per $\sqrt{5}$.`, R`Al denominatore ottieni $(\sqrt{5})^2=5$.`], risposta: { tipo: 'testo', accettate: ['√5/5', 'sqrt(5)/5', 'sqrt5/5'] }, soluzione: [R`$\dfrac{1}{\sqrt{5}}\cdot\dfrac{\sqrt{5}}{\sqrt{5}}=\dfrac{\sqrt{5}}{5}$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Calcola $16^{\frac{3}{4}}$ senza calcolatrice.`, suggerimenti: [R`Usa $a^{\frac{m}{n}}=\sqrt[n]{a^m}$: qui $n=4$, $m=3$.`, R`Conviene calcolare prima $\sqrt[4]{16}=2$, poi elevare al cubo.`], risposta: { tipo: 'numero', valore: 8 }, soluzione: [R`$16^{\frac{3}{4}}=(\sqrt[4]{16})^3$.`, R`$\sqrt[4]{16}=2$ (perché $2^4=16$), quindi $2^3=8$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Razionalizza $\dfrac{3}{2-\sqrt{3}}$.`, suggerimenti: [R`Il razionalizzante di $2-\sqrt{3}$ è $2+\sqrt{3}$.`, R`Al denominatore userai $2^2-3$.`], risposta: { tipo: 'testo', accettate: ['6+3√3', '6+3*sqrt(3)', '6+3 sqrt 3', '6+3sqrt(3)', '6+3sqrt3'] }, soluzione: [R`$\dfrac{3}{2-\sqrt{3}}\cdot\dfrac{2+\sqrt{3}}{2+\sqrt{3}}=\dfrac{3(2+\sqrt{3})}{4-3}$.`, R`$\dfrac{6+3\sqrt{3}}{1}=6+3\sqrt{3}$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Risolvi l'equazione irrazionale $\sqrt{2x-3}=3$, verificando le condizioni.`, suggerimenti: [R`Scrivi prima la condizione $2x-3\ge0$.`, R`Eleva al quadrato entrambi i membri.`], risposta: { tipo: 'numero', valore: 6 }, soluzione: [R`Condizione: $2x-3\ge0 \Rightarrow x\ge\dfrac32$.`, R`Elevo al quadrato: $2x-3=9 \Rightarrow x=6$.`, R`$x=6$ rispetta la condizione: è accettabile. Verifica: $\sqrt{9}=3$. ✓`] },
    { id: 'es-11', difficolta: 3, testo: R`Scrivi $\sqrt{7+2\sqrt{10}}$ come somma di due radicali semplici (radicale doppio).`, suggerimenti: [R`Cerca due numeri $p,q$ con $p+q=7$ e $pq=10$.`, R`Sono le soluzioni di $t^2-7t+10=0$.`], risposta: { tipo: 'testo', accettate: ['√5+√2', 'sqrt(5)+sqrt(2)', 'sqrt5+sqrt2', '√2+√5', 'sqrt(2)+sqrt(5)', 'sqrt2+sqrt5'] }, soluzione: [R`Cerco $p+q=7$, $pq=10$: sono $5$ e $2$.`, R`$\sqrt{7+2\sqrt{10}}=\sqrt{5}+\sqrt{2}$.`, R`Verifica: $(\sqrt{5}+\sqrt{2})^2=5+2+2\sqrt{10}=7+2\sqrt{10}$. ✓`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la condizione sul radicando quando l'indice della radice è pari?`, opzioni: [R`Il radicando è sempre positivo`, R`Non c'è nessuna condizione`, R`Il radicando dev'essere maggiore o uguale a zero`, R`Il radicando dev'essere negativo`], corretta: 2, spiegazione: R`Con indice pari nessun numero reale elevato a quella potenza dà un risultato negativo: il radicando deve essere $\ge 0$ perché la radice esista in $\mathbb{R}$.` },
    { id: 'q-02', domanda: R`Quanto vale $\sqrt{a^2}$ per un numero reale $a$ qualunque?`, opzioni: [R`$a$`, R`$|a|$`, R`$-a$`, R`$a^2$`], corretta: 1, spiegazione: R`La radice quadrata restituisce sempre un valore non negativo: se $a<0$, $\sqrt{a^2}=-a=|a|$, non $a$.` },
    { id: 'q-03', domanda: R`Con indice dispari, il radicando può essere...`, opzioni: [R`solo i numeri positivi`, R`solo lo zero`, R`solo i numeri negativi`, R`qualunque numero reale`], corretta: 3, spiegazione: R`Con indice dispari la radice esiste sempre, qualunque sia il segno del radicando, e ha lo stesso segno del radicando.` },
    { id: 'q-04', domanda: R`Che cosa afferma la proprietà invariantiva dei radicali?`, opzioni: [R`Che moltiplicare (o dividere) indice ed esponente del radicando per lo stesso numero non cambia il valore del radicale`, R`Che si può cambiare il segno del radicando senza problemi`, R`Che si possono sommare due radicali qualsiasi`, R`Che elimina sempre l'indice della radice`], corretta: 0, spiegazione: R`È esattamente la definizione della proprietà invariantiva; non riguarda somme di radicali né il segno del radicando.` },
    { id: 'q-05', domanda: R`Per confrontare $\sqrt{2}$ e $\sqrt[3]{3}$, cosa conviene fare?`, opzioni: [R`Elevarli entrambi al quadrato`, R`Sommare i radicandi`, R`Ridurli allo stesso indice e confrontare i radicandi`, R`Confrontare direttamente gli indici`], corretta: 2, spiegazione: R`Con indici diversi il confronto diretto non ha senso: si riducono allo stesso indice (il mcm) con la proprietà invariantiva, poi si confrontano i radicandi.` },
    { id: 'q-06', domanda: R`Il prodotto $\sqrt{a} \cdot \sqrt{b}$ (con $a, b \ge 0$, stesso indice) è uguale a:`, opzioni: [R`$\sqrt{a+b}$`, R`$\sqrt{ab}$`, R`$a\sqrt{b}$`, R`$\sqrt{a}+\sqrt{b}$`], corretta: 1, spiegazione: R`Con lo stesso indice, il prodotto di radicali è il radicale del prodotto dei radicandi: $\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}$.` },
    { id: 'q-07', domanda: R`Quali radicali si dicono "simili"?`, opzioni: [R`Quelli con lo stesso indice e lo stesso radicando`, R`Quelli con lo stesso segno`, R`Quelli con lo stesso valore numerico`, R`Quelli con lo stesso indice ma radicandi diversi`], corretta: 0, spiegazione: R`Solo radicali con indice e radicando (semplificati) uguali sono simili, e solo quelli si possono sommare direttamente.` },
    { id: 'q-08', domanda: R`Portare un fattore "dentro" il segno di radice significa...`, opzioni: [R`Semplificare il radicale dividendo per il MCD`, R`Cambiare l'indice della radice`, R`Eliminare il radicando`, R`Elevare il fattore alla potenza pari all'indice e moltiplicarlo per il radicando`], corretta: 3, spiegazione: R`È l'operazione inversa del portare fuori: si eleva il fattore alla potenza uguale all'indice e lo si moltiplica dentro il radicando.` },
    { id: 'q-09', domanda: R`Se $a<0$ e $n$ è pari, come si porta $a$ dentro $\sqrt[n]{b}$ nell'espressione $a\cdot\sqrt[n]{b}$?`, opzioni: [R`Si porta dentro $a$ così com'è`, R`Si porta dentro $|a|$ e si lascia il segno meno davanti al radicale`, R`Non si può fare l'operazione`, R`Si cambia l'indice in dispari`], corretta: 1, spiegazione: R`Il radicale con indice pari non è mai negativo: si porta dentro il valore assoluto e il segno meno resta fuori, altrimenti si scriverebbe la radice di un numero negativo.` },
    { id: 'q-10', domanda: R`$(\sqrt[n]{a})^m$ è uguale a:`, opzioni: [R`$\sqrt[n]{a^m}$`, R`$\sqrt[m]{a^n}$`, R`$n \cdot a^m$`, R`$a^{n/m}$`], corretta: 0, spiegazione: R`La potenza di un radicale si porta dentro come esponente del radicando, senza toccare l'indice: $(\sqrt[n]{a})^m=\sqrt[n]{a^m}$.` },
    { id: 'q-11', domanda: R`Qual è il primo passo per razionalizzare $\dfrac{1}{a+\sqrt{b}}$?`, opzioni: [R`Elevare tutto al quadrato`, R`Moltiplicare solo il numeratore per $\sqrt{b}$`, R`Moltiplicare numeratore e denominatore per $a-\sqrt{b}$`, R`Sommare $a$ e $\sqrt{b}$`], corretta: 2, spiegazione: R`Si moltiplica per il razionalizzante $a-\sqrt{b}$, sia sopra che sotto, sfruttando la differenza di quadrati per eliminare la radice dal denominatore.` },
    { id: 'q-12', domanda: R`Perché si usa proprio $a-\sqrt{b}$ come razionalizzante di $a+\sqrt{b}$?`, opzioni: [R`Perché annulla il numeratore`, R`Perché $(a+\sqrt{b})(a-\sqrt{b})=a^2-b$ elimina la radice dal denominatore`, R`Perché riduce l'indice della radice`, R`Perché cambia il segno di $a$`], corretta: 1, spiegazione: R`È la differenza di quadrati: il prodotto di un binomio per il suo "coniugato" elimina il termine con la radice.` },
    { id: 'q-13', domanda: R`L'esponente frazionario $a^{\frac{m}{n}}$ equivale a:`, opzioni: [R`$\sqrt[n]{a^m}$`, R`$\sqrt[m]{a^n}$`, R`$\dfrac{a^n}{m}$`, R`$\dfrac{m}{n}\cdot a$`], corretta: 0, spiegazione: R`Il denominatore dell'esponente è l'indice della radice, il numeratore è l'esponente del radicando: $a^{\frac{m}{n}}=\sqrt[n]{a^m}$.` },
    { id: 'q-14', domanda: R`Per basi negative, l'esponente frazionario $a^{\frac{m}{n}}$ ha senso reale solo se...`, opzioni: [R`$m$ è pari`, R`$n$ è dispari`, R`$m$ e $n$ sono entrambi pari`, R`Non ha mai senso in nessun caso`], corretta: 1, spiegazione: R`Con $n$ dispari la radice $n$-esima di un numero negativo esiste; con $n$ pari, invece, servirebbe una radice pari di un negativo, che non esiste in $\mathbb{R}$.` },
    { id: 'q-15', domanda: R`Un "radicale doppio" è un'espressione del tipo:`, opzioni: [R`$\sqrt{a \pm \sqrt{b}}$`, R`Un radicale con indice maggiore di $10$`, R`La somma di due radicali qualsiasi`, R`Un radicale con radicando negativo`], corretta: 0, spiegazione: R`Il radicale doppio è una radice quadrata che contiene un'altra radice quadrata al suo interno.` },
    { id: 'q-16', domanda: R`Prima di elevare al quadrato per risolvere $\sqrt{f(x)}=c$, quale condizione va verificata?`, opzioni: [R`Che $f(x)$ sia negativo`, R`Che $c$ sia negativo`, R`Che $c$ sia maggiore o uguale a zero`, R`Nessuna condizione è necessaria`], corretta: 2, spiegazione: R`Il radicale aritmetico non è mai negativo: se $c<0$ l'equazione è già impossibile, senza bisogno di calcoli. Va controllata anche la condizione di esistenza $f(x)\ge0$.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`$\sqrt{a^2}$ non è $a$, è $|a|$: dimenticarlo quando $a$ potrebbe essere negativo porta a un segno sbagliato.` },
    { tipo: 'errore', testo: R`$\sqrt{a}+\sqrt{b}$ non è $\sqrt{a+b}$: i radicali si sommano solo se sono simili, mai sommando i radicandi.` },
    { tipo: 'trucco', testo: R`Prima di moltiplicare o dividere due radicali, controlla che abbiano lo stesso indice: se non ce l'hanno, riducili prima con la proprietà invariantiva.` },
    { tipo: 'metodo', testo: R`Per portare fuori un fattore, scomponi il radicando in fattori: le potenze con esponente maggiore o uguale all'indice escono, il resto rimane dentro.` },
    { tipo: 'errore', testo: R`Portando dentro un fattore negativo con indice pari, il segno meno resta fuori dal radicale: non esiste la radice quadrata di un numero negativo.` },
    { tipo: 'trucco', testo: R`Per razionalizzare un binomio $a\pm\sqrt{b}$, moltiplica sempre per il coniugato $a\mp\sqrt{b}$: la differenza di quadrati elimina la radice dal denominatore.` },
    { tipo: 'metodo', testo: R`In un'equazione con la radice isolata, dopo aver elevato alla potenza controlla sempre le condizioni scritte all'inizio: potresti aver introdotto una soluzione estranea.` },
    { tipo: 'errore', testo: R`Se risolvendo $\sqrt{f(x)}=c$ risulta $c<0$, l'equazione non ha soluzioni: nessun valore reale rende negativo un radicale con indice pari.` },
    { tipo: 'trucco', testo: R`Nell'esponente frazionario $a^{\frac{m}{n}}$ il denominatore è l'indice della radice e il numeratore è l'esponente del radicando: conviene calcolare prima la radice, poi la potenza, con numeri più piccoli.` }
  ],

  aneddoti: [
    { matematico: 'Ippaso di Metaponto (scuola pitagorica)', anni: 'V secolo a.C.', titolo: 'Il segreto della diagonale del quadrato', testo: R`I pitagorici credevano che "tutto è numero", cioè che ogni lunghezza si potesse esprimere come rapporto di due numeri interi. Applicando il teorema di Pitagora a un quadrato di lato $1$, la diagonale misura $\sqrt{2}$: un allievo della scuola, Ippaso di Metaponto, si accorse che $\sqrt{2}$ **non** può essere scritto come frazione, con un ragionamento per assurdo simile a quello ancora oggi insegnato. Per i pitagorici fu uno scandalo: la scoperta minava l'idea stessa su cui fondavano la loro visione del mondo. Si racconta — ma è una leggenda antica, non un fatto documentato con certezza — che Ippaso sia stato annegato in mare dai suoi stessi compagni per aver rivelato il segreto fuori dalla setta.`, legame: R`$\sqrt{2}$ è il primo numero irrazionale della storia: proprio i numeri sotto radice che non si semplificano in una frazione danno senso a tutto questo argomento.` },
    { matematico: 'Teodoro di Cirene', anni: 'circa 465–398 a.C.', titolo: 'Una spirale di radici, fino a diciassette', testo: R`Teodoro, matematico e maestro del giovane Teeteto (il dialogo di Platone che porta il suo nome lo racconta), dimostrò geometricamente che $\sqrt{3}$, $\sqrt{5}$, $\sqrt{6}$ e così via, fino a $\sqrt{17}$, sono numeri irrazionali, costruendo per ciascuno un triangolo rettangolo con un cateto lungo $1$: l'ipotenusa del primo triangolo misura $\sqrt{2}$, quella del successivo (costruito attaccandone un altro) misura $\sqrt{3}$, e via via $\sqrt{4}$, $\sqrt{5}$, e così via. Accostando questi triangoli uno sull'altro si ottiene una spirale, oggi chiamata **spirale di Teodoro** o spirale pitagorica. Perché si sia fermato proprio a $17$ è un piccolo mistero che gli storici discutono ancora: forse è dove il disegno dei triangoli comincia a sovrapporsi a sé stesso.`, legame: R`La spirale di Teodoro è un modo geometrico di costruire $\sqrt{n}$ per ogni $n$, e mostra visivamente perché radici di numeri diversi non sono confrontabili a colpo d'occhio.` },
    { matematico: 'Erone di Alessandria (e gli scribi babilonesi)', anni: 'I secolo d.C.; le tavolette babilonesi, circa 1800 a.C.', titolo: 'Come si calcolava una radice quadrata prima delle calcolatrici', testo: R`Molto prima delle calcolatrici, si calcolavano le radici quadrate per approssimazioni successive. Una tavoletta babilonese (nota come YBC 7289) riporta un'approssimazione di $\sqrt{2}$ corretta fino alla quinta cifra decimale. Il metodo, descritto esplicitamente secoli dopo da Erone di Alessandria nella sua opera *Metrica*, è semplice: si parte da una stima $x_0$, e si migliora ripetutamente con la media fra la stima e il numero diviso per la stima, $x_{n+1} = \dfrac{1}{2}\left(x_n + \dfrac{a}{x_n}\right)$. Ogni passo raddoppia circa il numero di cifre corrette. È lo stesso principio che userebbe, molti secoli dopo, il metodo di Newton per le equazioni in generale.`, legame: R`Anche oggi calcolatrici e computer calcolano $\sqrt{a}$ con un procedimento che assomiglia moltissimo a questo, non con una formula chiusa.` },
    { matematico: 'Rafael Bombelli', anni: '1526–1572', titolo: 'Radici dentro radici, per far tornare i conti', testo: R`Ingegnere idraulico bolognese, Bombelli si imbatté in espressioni con radici annidate una dentro l'altra lavorando sulla formula di Cardano per le equazioni di terzo grado: casi in cui la formula, pur avendo soluzioni reali evidenti, passava per radici quadrate di numeri negativi nascoste dentro altre radici. Invece di scartarle come "impossibili", come facevano i suoi contemporanei, Bombelli si mise a calcolare con questi oggetti scomodi, scoprendo le regole che permettevano di farli sparire e ritrovare la soluzione reale di partenza. Il suo trattato *L'Algebra* (1572) è tra i primi a trattare sistematicamente il calcolo con espressioni di questo tipo.`, legame: R`Il modo in cui oggi si sdoppia un radicale doppio, riscrivendo $\sqrt{a+\sqrt{b}}$ come somma di due radicali più semplici, nasce dalla stessa necessità di Bombelli: rendere maneggevole un'espressione con una radice dentro un'altra.` }
  ]
});
})();
