(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'valore-assoluto-irrazionali',
  titolo: 'Valore assoluto e irrazionali',

  introduzione: R`Il valore assoluto di un numero misura la sua distanza da zero, senza dirne il segno: $|{-5}| = 5$ e $|5| = 5$. Quando al posto del numero c'è un'espressione, $|A(x)|$, il modulo introduce una scelta nascosta — dove l'espressione è positiva si comporta in un modo, dove è negativa nell'altro — ed è proprio questa scelta a rendere equazioni e disequazioni con il valore assoluto diverse da quelle già note: bisogna distinguere i casi. Un'equazione irrazionale ha invece l'incognita sotto il segno di radice: elevare a potenza per eliminarla è un'operazione che, a differenza delle altre, non è sempre reversibile, e può inventare soluzioni che l'equazione di partenza non ha.

I due argomenti finiscono nella stessa lezione perché condividono lo stesso rischio e lo stesso rimedio: sia elevare al quadrato un'equazione con il modulo, sia elevare a potenza un'equazione con una radice, può produrre soluzioni **estranee** — numeri che risolvono l'equazione trasformata ma non quella di partenza. Il rimedio è sempre lo stesso: accompagnare il calcolo con una condizione, invece di fidarsi del solo elevamento a potenza. Il valore assoluto compare ogni volta che conta solo una distanza, non un segno: un errore di misura, una tolleranza di fabbricazione, la differenza fra due temperature. Le equazioni irrazionali compaiono ogni volta che l'incognita è dentro una radice: il lato di un quadrato di area data, il tempo di caduta di un oggetto a partire dalla sua velocità.

Per seguire bene questa lezione servono le disequazioni di secondo grado (per la tabella dei segni che segue quasi sempre dall'elevamento a potenza) e la scomposizione in fattori.`,

  sezioni: [
    { id: 'definizione-valore-assoluto', titolo: 'Il valore assoluto: definizione e proprietà', testo: R`Il valore assoluto (o modulo) di un numero reale $a$ si indica $|a|$ ed è il numero stesso se $a$ è positivo o nullo, il suo opposto se $a$ è negativo: **misura la distanza di $a$ da zero** sulla retta, senza informazione sul segno. Per esempio $|7| = 7$ e $|-7| = 7$: due numeri opposti hanno lo stesso valore assoluto, perché sono alla stessa distanza da $0$.

>* **Definizione:** $$|a| = \begin{cases} a & \text{se } a \ge 0 \\ -a & \text{se } a < 0 \end{cases}$$ Lo stesso vale per un'espressione $A(x)$ al posto di un numero: $|A(x)|$ è definita a tratti, ed è questa definizione a guidare ogni calcolo con il modulo.

Alcune proprietà si usano di continuo: $|a| \ge 0$ sempre, e $|a| = 0$ solo se $a = 0$; $|-a| = |a|$; il prodotto si distribuisce, $|a \cdot b| = |a| \cdot |b|$ (e lo stesso vale per il quoziente, con divisore non nullo); e vale $|a|^2 = a^2$, la proprietà con cui si «toglie» il modulo elevando al quadrato — tornerà utile con le disequazioni e con le equazioni irrazionali.

Prova a trascinare il punto $p$ sull'asse nel grafico: la distanza fra $p$ e $1$, cioè $|p - 1|$, cambia mano a mano che ti sposti, ma non è mai negativa.

[[grafico:assolutoTrascina]]

>! $|{-a}|$ **non** è sempre $-a$ scritto al contrario di $a$: è $a$ se $a \ge 0$. Scrivere $|a| = -a$ come se fosse sempre vero è un errore frequente: vale solo quando $a < 0$ (o $a = 0$).` },

    { id: 'equazioni-valore-assoluto', titolo: 'Equazioni con il valore assoluto', testo: R`Un'equazione con il valore assoluto ha tre forme tipiche, e ciascuna si tratta in modo diverso: $|A(x)| = k$ (un numero), $|A(x)| = B(x)$ (un'espressione) e $|A(x)| = |B(x)|$ (modulo contro modulo).

**Caso $|A(x)| = k$.** Se $k < 0$ l'equazione è impossibile: un modulo non è mai negativo. Se $k = 0$ si risolve $A(x) = 0$. Se $k > 0$ si separano i due casi della definizione: $A(x) = k$ oppure $A(x) = -k$. Per esempio $|x - 1| = 2$ dà $x - 1 = 2$ (cioè $x = 3$) oppure $x - 1 = -2$ (cioè $x = -1$): sono proprio i due punti in cui la retta $y = 2$ incontra il grafico di $y = |x - 1|$.

[[grafico:assolutoRetta]]

**Caso $|A(x)| = B(x)$.** Si risolvono le stesse due equazioni, $A(x) = B(x)$ e $A(x) = -B(x)$, ma questa volta **bisogna verificare** che, nelle soluzioni trovate, sia $B(x) \ge 0$: un modulo non può uguagliare un numero negativo, quindi ogni soluzione con $B(x) < 0$ va scartata. Per esempio $|2x + 3| = x + 9$: da $2x + 3 = x + 9$ viene $x = 6$ (con $B(6) = 15 \ge 0$, accettabile); da $2x + 3 = -(x+9)$ viene $x = -4$ (con $B(-4) = 5 \ge 0$, accettabile anch'essa): qui capita che entrambe passino il controllo, ma non è sempre così.

**Caso $|A(x)| = |B(x)|$.** Qui non serve nessuna condizione aggiuntiva: due moduli sono uguali se e solo se $A(x) = B(x)$ oppure $A(x) = -B(x)$, perché elevando al quadrato, $A(x)^2 = B(x)^2$, non si introduce mai una soluzione estranea.

Nel grafico seguente il cursore $k$ regola la retta orizzontale $y = k$: per $k > 0$ incontra il grafico di $|x-1|$ in due punti, per $k = 0$ in uno solo (il vertice), per $k < 0$ in nessuno — coerentemente con il primo caso appena visto.

[[grafico:assolutoParametro]]

>! Nel caso $|A(x)| = B(x)$, dimenticare di controllare il segno di $B(x)$ è l'errore più comune: porta ad accettare soluzioni che, sostituite nell'equazione di partenza, non funzionano.` },

    { id: 'grafico-modulo', titolo: 'Il grafico di y = |f(x)|', testo: R`Per disegnare $y = |f(x)|$ a partire dal grafico già noto di $y = f(x)$ non serve rifare i calcoli da capo: basta applicare la definizione del modulo punto per punto.

>* **Regola:** dove $f(x) \ge 0$ il grafico di $y = |f(x)|$ coincide con quello di $y = f(x)$; dove $f(x) < 0$, il grafico di $y = |f(x)|$ è il **simmetrico rispetto all'asse $x$** di quello di $y = f(x)$ (si «ribalta» verso l'alto la parte che stava sotto).

Il grafico di $y = |x - 1|$ è l'esempio più semplice: la retta $y = x - 1$ passa per $(1; 0)$ ed è negativa per $x < 1$; ribaltando quel tratto verso l'alto si ottiene la tipica forma «a V», con il vertice proprio nel punto in cui $f(x) = 0$.

[[grafico:assolutoRetta]]

La stessa idea vale per funzioni più complicate: da $y = x^2 - 4$ (una parabola che sta sotto l'asse $x$ per $-2 < x < 2$) si ottiene $y = |x^2 - 4|$ ribaltando verso l'alto solo quel tratto centrale, mentre le due code, dove la parabola era già positiva, restano invariate. Il grafico risultante non ha mai ordinate negative: è una conseguenza diretta di $|A| \ge 0$.

Riconoscere questa forma è utile anche al contrario: se un grafico ha dei punti angolosi, delle «V», dove ci si aspetterebbe una curva liscia, quel punto è spesso il punto in cui l'espressione dentro un modulo si annulla.

>! Il grafico di $y = |f(x)|$ **non** si ottiene mai abbassando le parti che stanno sopra l'asse: si alzano solo le parti che stanno sotto. Ribaltare anche le parti già positive è un errore che, di fatto, cambia completamente la funzione.` },

    { id: 'disequazioni-valore-assoluto-rapide', titolo: 'Disequazioni |A| < k e |A| > k: le forme rapide', testo: R`Quando il valore assoluto si confronta con un **numero** $k$, ci sono due forme rapide che evitano di passare per la definizione a tratti.

>* **Forme rapide** (con $k > 0$): $$|A(x)| < k \ \Leftrightarrow\ -k < A(x) < k \qquad\qquad |A(x)| > k \ \Leftrightarrow\ A(x) < -k \ \lor\ A(x) > k$$ Nella prima l'espressione deve stare in una striscia attorno allo zero; nella seconda deve starne fuori.

Per esempio $|x - 1| < 2$ diventa $-2 < x - 1 < 2$, cioè $-1 < x < 3$: è l'intervallo intorno a $1$ (il punto in cui il modulo si annulla), di ampiezza $2$ per lato.

[[grafico:rettaModulo1]]

E $|2x + 1| > 3$ diventa $2x + 1 < -3$ oppure $2x + 1 > 3$, cioè $x < -2$ oppure $x > 1$: due semirette che si allontanano dal punto in cui il modulo si annulla.

[[grafico:rettaModulo2]]

Quando $k \le 0$ le forme rapide non servono: basta ragionare sul fatto che $|A(x)| \ge 0$ sempre. Se $k < 0$, $|A(x)| < k$ è **impossibile** (un numero $\ge 0$ non può essere minore di un numero negativo), mentre $|A(x)| > k$ è **sempre vera** (dove $A(x)$ è definita). Se $k = 0$, $|A(x)| < 0$ resta impossibile e $|A(x)| > 0$ è vera ovunque tranne dove $A(x) = 0$.

>* Il verso della disequazione dice quale forma usare: «$<$» dà un **sistema** (intersezione, la striscia $-k < A < k$), «$>$» dà un'**unione** (le due semirette esterne). È lo stesso schema che vale anche quando $k$ non è un numero, ma un'espressione — solo che allora serve davvero un sistema, come nella prossima sezione.

>! Scrivere $|A(x)| > k$ come un'unica catena $-k > A(x) > k$ non ha senso: nessun numero è insieme minore di $-k$ e maggiore di $k$ (con $k>0$). L'unione va scritta con «oppure», mai incastrata in una sola disuguaglianza.` },

    { id: 'disequazioni-valore-assoluto-sistemi', titolo: 'Disequazioni |A| < B e |A| > B: quando serve il sistema', testo: R`Quando il secondo membro non è un numero ma un'espressione $B(x)$, le forme rapide della sezione precedente si adattano, ma il modo sicuro per usarle è impostare un sistema (per «$<$») o un'unione (per «$>$»), esattamente come prima — solo che ora si tratta di disequazioni vere, non di confronti fra numeri.

>* $$|A(x)| < B(x) \ \Leftrightarrow\ \begin{cases} A(x) < B(x) \\ A(x) > -B(x) \end{cases} \qquad\qquad |A(x)| > B(x) \ \Leftrightarrow\ A(x) > B(x) \ \lor\ A(x) < -B(x)$$

Non serve aggiungere «$B(x) > 0$» come condizione a parte: nel primo sistema è già una conseguenza delle altre due (se $A < B$ e $A > -B$, allora $B$ supera sia $A$ sia $-A$, quindi $B > |A| \ge 0$).

Per esempio $|2x - 1| < x + 2$: il sistema è $2x - 1 < x + 2$ (cioè $x < 3$) e $2x - 1 > -(x + 2)$, cioè $3x > -1$, cioè $x > -\dfrac{1}{3}$. Intersecando: $-\dfrac{1}{3} < x < 3$.

[[grafico:rettaSistemaModulo]]

E $|x - 3| > x - 1$: la prima disequazione, $x - 3 > x - 1$, diventa $-3 > -1$, che è **sempre falsa** e non contribuisce nulla; la seconda, $x - 3 < -(x - 1)$, diventa $2x < 4$, cioè $x < 2$. L'unione delle due è semplicemente $x < 2$: capita spesso che uno dei due rami di un'unione risulti vuoto o inutile, e va riconosciuto, non ignorato.

>! Con il secondo membro variabile non si può più dire «se $k \le 0$ non serve calcolare»: il segno di $B(x)$ può cambiare da un punto all'altro della retta, quindi non c'è scorciatoia. Il sistema (o l'unione) tiene conto automaticamente di ogni caso: è per questo che è il metodo sicuro.` },

    { id: 'equazioni-irrazionali-una-radice', titolo: 'Equazioni irrazionali con una radice', testo: R`Un'equazione è **irrazionale** quando l'incognita compare sotto il segno di radice. Il caso più comune è la radice quadrata: $\sqrt{A(x)} = B(x)$.

Elevare al quadrato entrambi i membri sembra il modo ovvio per eliminare la radice, ma **non è un passaggio sempre reversibile**: se $B(x)$ fosse negativo, l'uguaglianza $\sqrt{A(x)} = B(x)$ non potrebbe mai essere vera (una radice quadrata non è mai negativa), eppure elevando al quadrato quell'informazione sparisce. Il metodo sicuro è il **sistema**:

>* $$\sqrt{A(x)} = B(x) \ \Leftrightarrow\ \begin{cases} B(x) \ge 0 \\ A(x) = [B(x)]^2 \end{cases}$$ Non serve aggiungere $A(x) \ge 0$ come condizione a parte: se $A(x) = [B(x)]^2$, è automaticamente $\ge 0$, un quadrato non è mai negativo.

Per esempio $\sqrt{x + 10} = x - 2$: il sistema è $x - 2 \ge 0$ (cioè $x \ge 2$) e $x + 10 = (x-2)^2 = x^2 - 4x + 4$, cioè $x^2 - 5x - 6 = 0$, che dà $x = 6$ oppure $x = -1$. Solo $x = 6$ rispetta $x \ge 2$: $x = -1$ va **scartata**, è una soluzione estranea introdotta dall'elevamento al quadrato.

In alternativa, quando i numeri sono comodi, si può elevare al quadrato senza condizioni, risolvere, e poi **verificare per sostituzione** ogni soluzione trovata nell'equazione di partenza: è più lento da giustificare in generale, ma altrettanto corretto, e a volte più rapido da eseguire.

[[grafico:irrazionaleEstranea]]

Se l'indice della radice è **dispari** (cubica, quinta...), tutto si semplifica: una radice di indice dispari esiste per qualunque numero, positivo o negativo, e non c'è nessuna condizione di segno da imporre. $\sqrt[3]{A(x)} = B(x)$ equivale semplicemente a $A(x) = [B(x)]^3$, senza sistemi: elevare al cubo è un'operazione reversibile su tutto $\mathbb{R}$. Per esempio $\sqrt[3]{x - 1} = 2 \Rightarrow x - 1 = 8 \Rightarrow x = 9$, senza nessuna verifica da fare.

>! Un errore tipico è controllare solo la condizione di esistenza $A(x) \ge 0$ (il c.e. della radice) e dimenticare $B(x) \ge 0$: sono due condizioni diverse, ed è proprio la seconda quella che elimina le soluzioni estranee.` },

    { id: 'equazioni-irrazionali-due-radici', titolo: 'Equazioni irrazionali con due radici', testo: R`Quando la stessa equazione contiene **due radici quadrate**, la strategia è isolarle una alla volta ed elevare al quadrato più volte.

Il caso più semplice è $\sqrt{A(x)} = \sqrt{B(x)}$: qui basta un solo controllo, perché se $A(x) = B(x)$ e uno dei due è $\ge 0$, lo è anche l'altro (sono uguali).

>* $$\sqrt{A(x)} = \sqrt{B(x)} \ \Leftrightarrow\ \begin{cases} A(x) = B(x) \\ A(x) \ge 0 \end{cases}$$

Per esempio $\sqrt{3x+1} = \sqrt{x+9}$: da $3x + 1 = x + 9$ viene $2x = 8$, cioè $x = 4$; e $3 \cdot 4 + 1 = 13 \ge 0$. Soluzione $x = 4$ (infatti $\sqrt{13} = \sqrt{13}$).

Quando invece le due radici sono **separate da un termine** — per esempio $\sqrt{A(x)} + \sqrt{B(x)} = C(x)$, oppure con un segno meno — conviene isolare una radice alla volta:

1. Si scrivono le condizioni di esistenza (ogni radicando $\ge 0$).
2. Si isola una delle due radici da sola in un membro.
3. Si eleva al quadrato: a destra compare ancora una radice (l'altra), ma con un termine in meno.
4. Si isola quella radice rimasta e si eleva al quadrato una seconda volta, ottenendo un'equazione senza più radici.
5. Si risolve, e infine si **verifica ogni soluzione per sostituzione** nell'equazione di partenza: dopo due elevamenti a potenza, tracciare a mano tutte le condizioni di segno è complicato, mentre la verifica diretta è sempre affidabile.

Per esempio $\sqrt{x+7} - \sqrt{x+2} = 1$: isolando, $\sqrt{x+7} = 1 + \sqrt{x+2}$; elevando al quadrato, $x + 7 = 1 + 2\sqrt{x+2} + (x+2)$, cioè $4 = 2\sqrt{x+2}$; dividendo ed elevando di nuovo, $x + 2 = 4$, cioè $x = 2$. Verifica: $\sqrt{9} - \sqrt{4} = 3 - 2 = 1$. ✓

>! Con due radici, la verifica finale non è un passaggio facoltativo: dopo due elevamenti a potenza è facile introdurre soluzioni estranee senza accorgersene, ed è l'unico modo pratico per essere sicuri del risultato.` },

    { id: 'disequazioni-irrazionali', titolo: 'Disequazioni irrazionali: √A < B e √A > B', testo: R`Anche le disequazioni con la radice quadrata si risolvono con un sistema, ma la forma cambia a seconda del verso.

>* $$\sqrt{A(x)} < B(x) \ \Leftrightarrow\ \begin{cases} A(x) \ge 0 \\ B(x) > 0 \\ A(x) < [B(x)]^2 \end{cases}$$ Tre condizioni insieme: il radicando deve esistere, il secondo membro deve essere positivo (altrimenti una radice, che non è mai negativa, non potrebbe mai essere minore di lui), e da qui il confronto dei quadrati.

Per esempio $\sqrt{x - 1} < 3$: sistema $x - 1 \ge 0$, $3 > 0$ (sempre vera), $x - 1 < 9$. Insieme: $1 \le x < 10$.

[[grafico:rettaIrrazionale]]

Per «$>$» la logica si rovescia, e diventa un'**unione di due sistemi**, perché la disequazione può essere vera per due motivi diversi:

>* $$\sqrt{A(x)} > B(x) \ \Leftrightarrow\ \begin{cases} A(x) \ge 0 \\ B(x) < 0 \end{cases} \ \lor\ \begin{cases} B(x) \ge 0 \\ A(x) > [B(x)]^2 \end{cases}$$ Il primo sistema copre il caso in cui il confronto è automatico (una radice $\ge 0$ supera sempre un numero negativo); il secondo copre il caso in cui bisogna davvero confrontare i quadrati.

Un esempio con entrambi i sistemi: $\sqrt{x+2} > x$.

1. Primo sistema: $x + 2 \ge 0$ e $x < 0$, cioè $-2 \le x < 0$.
2. Secondo sistema: $x \ge 0$ e $x + 2 > x^2$, cioè $x^2 - x - 2 < 0$, cioè $(x-2)(x+1) < 0$, cioè $-1 < x < 2$; intersecando con $x \ge 0$: $0 \le x < 2$.
3. Unione dei due: $-2 \le x < 0$ insieme a $0 \le x < 2$, cioè $-2 \le x < 2$.

>! Dimenticare il primo dei due sistemi (quello con $B(x) < 0$) è l'errore più comune nelle disequazioni con «$>$»: si perdono tutte le soluzioni in cui il secondo membro è negativo, che sono valide senza bisogno di calcolare nulla.` }
  ],

  grafici: {
    assolutoTrascina: {
      tipo: 'piano', x: [-5, 5], y: [-2, 6],
      parametri: [ { nome: 'p', min: -4, max: 4, passo: 0.1, valore: 2, nascosto: true } ],
      funzioni: [ { f: 'abs(x-1)', etichetta: 'y = |x − 1|', colore: 1 } ],
      elementi: [
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'p', posizione: 'basso', colore: 2 },
        { tipo: 'verticale', x: 'p', tratteggio: true, colore: 3 },
        { tipo: 'testo', p: [-4.7, 5.3], testo: '|p − 1| = {{abs(p-1)}}', ancora: 'start' }
      ],
      didascalia: "Trascina il punto p sull'asse x: la distanza fra p e 1 non è mai negativa."
    },
    assolutoRetta: {
      tipo: 'piano', x: [-4, 5], y: [-1, 6],
      funzioni: [ { f: 'abs(x-1)', etichetta: 'y = |x − 1|', colore: 1 } ],
      elementi: [ { tipo: 'orizzontale', y: 2, etichetta: 'y = 2', colore: 2 } ],
      punti: [
        { x: -1, y: 2, etichetta: '(−1; 2)', posizione: 'alto-sinistra', colore: 2 },
        { x: 3, y: 2, etichetta: '(3; 2)', posizione: 'alto-destra', colore: 2 }
      ],
      didascalia: 'Le intersezioni con y = 2 sono le soluzioni di |x − 1| = 2.'
    },
    assolutoParametro: {
      tipo: 'piano', x: [-4, 6], y: [-3, 6],
      parametri: [ { nome: 'k', min: -3, max: 3, passo: 0.5, valore: 2, etichetta: 'k' } ],
      funzioni: [ { f: 'abs(x-1)', etichetta: 'y = |x − 1|', colore: 1 } ],
      elementi: [ { tipo: 'orizzontale', y: 'k', etichetta: 'y = k', colore: 2 } ],
      punti: [
        { x: '1 - sqrt(k)*sqrt(k)', y: 'k', etichetta: '1 − k', posizione: 'basso', colore: 3 },
        { x: '1 + sqrt(k)*sqrt(k)', y: 'k', etichetta: '1 + k', posizione: 'basso', colore: 3 }
      ],
      didascalia: 'Muovi k: per k ≥ 0 la retta orizzontale incontra il grafico in due punti (uno solo se k = 0); per k < 0 non lo incontra mai.'
    },
    rettaModulo1: {
      tipo: 'retta-reale', x: [-5, 5],
      intervalli: [ { da: -1, a: 3, chiusoDa: false, chiusoA: false, etichetta: '−1 < x < 3' } ],
      punti: [ { x: -1, etichetta: '−1', escluso: true }, { x: 3, etichetta: '3', escluso: true } ],
      didascalia: 'Soluzione di |x − 1| < 2.'
    },
    rettaModulo2: {
      tipo: 'retta-reale', x: [-6, 4],
      intervalli: [
        { da: '-inf', a: -2, chiusoA: false, colore: 1, etichetta: 'x < −2' },
        { da: 1, a: 'inf', chiusoDa: false, colore: 2, etichetta: 'x > 1' }
      ],
      punti: [ { x: -2, etichetta: '−2', escluso: true }, { x: 1, etichetta: '1', escluso: true } ],
      didascalia: 'Soluzione di |2x + 1| > 3: due semirette esterne.'
    },
    rettaSistemaModulo: {
      tipo: 'retta-reale', x: [-3, 5],
      intervalli: [ { da: -1/3, a: 3, chiusoDa: false, chiusoA: false, etichetta: '−1/3 < x < 3' } ],
      punti: [ { x: -1/3, etichetta: '−1/3', escluso: true }, { x: 3, etichetta: '3', escluso: true } ],
      didascalia: 'Soluzione di |2x − 1| < x + 2.'
    },
    irrazionaleEstranea: {
      tipo: 'piano', x: [-3, 8], y: [-3, 6],
      funzioni: [
        { f: 'sqrt(x+2)', etichetta: 'y = √(x + 2)', colore: 1, dominio: [-2, 7] },
        { f: 'x', etichetta: 'y = x', colore: 2 }
      ],
      punti: [
        { x: 2, y: 2, etichetta: '(2; 2)', posizione: 'alto', colore: 1 },
        { x: -1, y: -1, etichetta: '(−1; −1) estranea', posizione: 'basso', colore: 2, vuoto: true }
      ],
      didascalia: 'Elevando al quadrato √(x+2) = x si trovano x = 2 (valida) e x = −1 (estranea: √1 = 1 ≠ −1).'
    },
    rettaIrrazionale: {
      tipo: 'retta-reale', x: [-2, 12],
      intervalli: [ { da: 1, a: 10, chiusoDa: true, chiusoA: false, etichetta: '1 ≤ x < 10' } ],
      punti: [ { x: 1, etichetta: '1' }, { x: 10, etichetta: '10', escluso: true } ],
      didascalia: 'Soluzione di √(x − 1) < 3.'
    }
  },

  esempi: [
    { titolo: 'Equazione con due valori assoluti', problema: R`Risolvi $|x - 4| = |3x|$.`, passi: [
      R`È il caso $|A| = |B|$: non serve nessuna condizione aggiuntiva, basta risolvere $A = B$ e $A = -B$.`,
      R`$x - 4 = 3x \Rightarrow -4 = 2x \Rightarrow x = -2$.`,
      R`$x - 4 = -3x \Rightarrow 4x = 4 \Rightarrow x = 1$.`,
      R`Verifica: per $x=-2$, $|-6| = 6$ e $|-6| = 6$ ✓; per $x=1$, $|-3| = 3$ e $|3| = 3$ ✓.`
    ], risultato: R`$x = -2 \lor x = 1$` },

    { titolo: 'Disequazione con valore assoluto: la forma rapida', problema: R`Risolvi $|4x + 1| > 7$.`, passi: [
      R`È il caso $|A| > k$ con $k = 7 > 0$: si separa in $A > k$ oppure $A < -k$.`,
      R`$4x + 1 > 7 \Rightarrow 4x > 6 \Rightarrow x > \dfrac{3}{2}$.`,
      R`$4x + 1 < -7 \Rightarrow 4x < -8 \Rightarrow x < -2$.`,
      R`Le due condizioni si uniscono con «oppure», perché il modulo deve superare $7$ da uno dei due lati.`
    ], risultato: R`$x < -2 \lor x > \dfrac{3}{2}$` },

    { titolo: "Un'equazione con il valore assoluto su un solo membro", problema: R`Risolvi $|x - 1| = 2x - 4$.`, passi: [
      R`È il caso $|A| = B$: si risolvono $A = B$ e $A = -B$, poi si tengono solo le soluzioni con $B(x) \ge 0$.`,
      R`$x - 1 = 2x - 4 \Rightarrow -x = -3 \Rightarrow x = 3$.`,
      R`$x - 1 = -(2x - 4) \Rightarrow x - 1 = -2x + 4 \Rightarrow 3x = 5 \Rightarrow x = \dfrac{5}{3}$.`,
      R`Verifico il segno di $B(x) = 2x - 4$: in $x = 3$, $B = 2 \ge 0$, accettabile; in $x = \dfrac{5}{3}$, $B = -\dfrac{2}{3} < 0$, da scartare.`
    ], risultato: R`$x = 3$ (l'altra soluzione algebrica, $x = \dfrac{5}{3}$, è estranea)` },

    { titolo: 'Disequazione con valore assoluto: il sistema', problema: R`Risolvi $|3x - 1| < x + 5$.`, passi: [
      R`È il caso $|A| < B$: sistema fra $A < B$ e $A > -B$.`,
      R`$3x - 1 < x + 5 \Rightarrow 2x < 6 \Rightarrow x < 3$.`,
      R`$3x - 1 > -(x + 5) \Rightarrow 3x - 1 > -x - 5 \Rightarrow 4x > -4 \Rightarrow x > -1$.`,
      R`Intersezione delle due condizioni: $-1 < x < 3$.`
    ], risultato: R`$-1 < x < 3$` },

    { titolo: 'Equazione irrazionale con un indice pari', problema: R`Risolvi $\sqrt{x + 10} = x - 2$.`, passi: [
      R`Sistema: $x - 2 \ge 0$ e $x + 10 = (x-2)^2$.`,
      R`$(x-2)^2 = x^2 - 4x + 4$, quindi $x + 10 = x^2 - 4x + 4 \Rightarrow x^2 - 5x - 6 = 0$.`,
      R`$\Delta = 25 + 24 = 49$, $x = \dfrac{5 \pm 7}{2}$: $x = 6$ oppure $x = -1$.`,
      R`Solo $x = 6$ rispetta $x \ge 2$: $x = -1$ va scartata. Verifica: $\sqrt{16} = 4$ e $6 - 2 = 4$. ✓`
    ], risultato: R`$x = 6$` },

    { titolo: 'Equazione irrazionale con due radici', problema: R`Risolvi $\sqrt{x + 7} - \sqrt{x + 2} = 1$.`, passi: [
      R`C.e.: $x + 7 \ge 0$ e $x + 2 \ge 0$, cioè $x \ge -2$.`,
      R`Isolo una radice: $\sqrt{x + 7} = 1 + \sqrt{x + 2}$.`,
      R`Elevo al quadrato: $x + 7 = 1 + 2\sqrt{x+2} + (x + 2)$, cioè $4 = 2\sqrt{x + 2}$.`,
      R`Divido per $2$ ed elevo di nuovo: $\sqrt{x+2} = 2 \Rightarrow x + 2 = 4 \Rightarrow x = 2$.`,
      R`Verifica: $\sqrt{9} - \sqrt{4} = 3 - 2 = 1$. ✓`
    ], risultato: R`$x = 2$` }
  ],

  formulario: [
    { nome: 'Definizione di valore assoluto', formula: R`|a| = \begin{cases} a & \text{se } a \ge 0 \\ -a & \text{se } a < 0 \end{cases}` },
    { nome: 'Valore assoluto di un prodotto', formula: R`|a \cdot b| = |a| \cdot |b|`, nota: R`Vale la stessa proprietà per il quoziente, con $b \ne 0$.` },
    { nome: 'Proprietà fondamentali', formula: R`|a| \ge 0, \qquad |a| = 0 \iff a = 0, \qquad |-a| = |a|` },
    { nome: 'Quadrato del valore assoluto', formula: R`|a|^2 = a^2, \qquad \sqrt{a^2} = |a|`, nota: R`Questa identità collega il valore assoluto alle equazioni irrazionali: elevare al quadrato «toglie» il modulo.` },
    { nome: 'Equazione |A| = k', formula: R`|A(x)| = k \ (k>0) \ \Rightarrow\ A(x) = k \ \lor\ A(x) = -k`, nota: R`Impossibile se $k<0$; una sola soluzione se $k=0$.` },
    { nome: 'Equazione |A| = B', formula: R`|A(x)| = B(x) \ \Rightarrow\ A(x)=B(x) \ \lor\ A(x)=-B(x)`, nota: R`Le soluzioni trovate vanno accettate solo se $B(x) \ge 0$.` },
    { nome: 'Disequazioni rapide (k costante)', formula: R`|A(x)| < k \iff -k<A(x)<k, \qquad |A(x)|>k \iff A(x)<-k \ \lor\ A(x)>k`, nota: R`Valide solo con $k>0$.` },
    { nome: 'Disequazioni con secondo membro variabile', formula: R`|A(x)|<B(x) \iff \begin{cases} A(x)<B(x) \\ A(x)>-B(x)\end{cases}, \qquad |A(x)|>B(x) \iff A(x)>B(x) \ \lor\ A(x)<-B(x)` },
    { nome: 'Equazione irrazionale (indice pari)', formula: R`\sqrt{A(x)} = B(x) \iff \begin{cases} B(x) \ge 0 \\ A(x) = [B(x)]^2 \end{cases}` },
    { nome: 'Equazione irrazionale (indice dispari)', formula: R`\sqrt[3]{A(x)} = B(x) \iff A(x) = [B(x)]^3`, nota: R`Nessuna condizione: il cubo è reversibile su tutto $\mathbb{R}$.` },
    { nome: 'Disequazione √A < B', formula: R`\sqrt{A(x)} < B(x) \iff \begin{cases} A(x)\ge 0 \\ B(x)>0 \\ A(x)<[B(x)]^2 \end{cases}` },
    { nome: 'Disequazione √A > B', formula: R`\sqrt{A(x)} > B(x) \iff \begin{cases} A(x)\ge 0 \\ B(x)<0\end{cases} \ \lor\ \begin{cases} B(x)\ge 0 \\ A(x)>[B(x)]^2\end{cases}` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione-valore-assoluto', tipo: 'definizione', fronte: R`Definizione di $|a|$`, retro: R`$a$ se $a \ge 0$, $-a$ se $a<0$: è la distanza di $a$ da $0$.` },
    { id: 'fc-02', sezione: 'definizione-valore-assoluto', tipo: 'concetto', fronte: R`Perché $|a| \ge 0$ sempre?`, retro: R`Perché è una distanza, e una distanza non è mai negativa.` },
    { id: 'fc-03', sezione: 'definizione-valore-assoluto', tipo: 'formula', fronte: R`$|a|^2$`, retro: R`$|a|^2 = a^2$: è la proprietà che permette di eliminare il modulo elevando al quadrato.` },
    { id: 'fc-04', sezione: 'equazioni-valore-assoluto', tipo: 'procedura', fronte: R`Come si risolve $|A(x)| = k$ con $k>0$?`, retro: R`Si risolvono $A(x)=k$ e $A(x)=-k$: nessun'altra condizione.` },
    { id: 'fc-05', sezione: 'equazioni-valore-assoluto', tipo: 'procedura', fronte: R`Come si risolve $|A(x)| = B(x)$?`, retro: R`Si risolvono $A=B$ e $A=-B$, poi si tengono solo le soluzioni con $B(x)\ge 0$.` },
    { id: 'fc-06', sezione: 'equazioni-valore-assoluto', tipo: 'concetto', fronte: R`Serve verificare qualcosa in $|A(x)|=|B(x)|$?`, retro: R`No: $A=B$ o $A=-B$ sono già entrambe valide, senza condizioni aggiuntive.` },
    { id: 'fc-07', sezione: 'grafico-modulo', tipo: 'concetto', fronte: R`Come si ottiene il grafico di $y=|f(x)|$?`, retro: R`Si lascia invariata la parte dove $f(x)\ge 0$ e si ribalta verso l'alto la parte dove $f(x)<0$.` },
    { id: 'fc-08', sezione: 'grafico-modulo', tipo: 'concetto', fronte: R`Il grafico di $y=|f(x)|$ ha mai ordinate negative?`, retro: R`Mai: $|f(x)| \ge 0$ per ogni $x$ del dominio.` },
    { id: 'fc-09', sezione: 'grafico-modulo', tipo: 'concetto', fronte: R`Dove si formano i punti angolosi nel grafico di $y=|f(x)|$?`, retro: R`Nei punti dove $f(x)=0$, cioè dove comincia il ribaltamento.` },
    { id: 'fc-10', sezione: 'disequazioni-valore-assoluto-rapide', tipo: 'formula', fronte: R`Forma rapida di $|A(x)|<k$ (con $k>0$)`, retro: R`$-k < A(x) < k$.` },
    { id: 'fc-11', sezione: 'disequazioni-valore-assoluto-rapide', tipo: 'formula', fronte: R`Forma rapida di $|A(x)|>k$ (con $k>0$)`, retro: R`$A(x)<-k$ oppure $A(x)>k$.` },
    { id: 'fc-12', sezione: 'disequazioni-valore-assoluto-rapide', tipo: 'concetto', fronte: R`Cosa succede a $|A(x)|<k$ se $k \le 0$?`, retro: R`È impossibile: un modulo non è mai minore di un numero non positivo.` },
    { id: 'fc-13', sezione: 'disequazioni-valore-assoluto-sistemi', tipo: 'formula', fronte: R`Sistema per $|A(x)|<B(x)$`, retro: R`$A(x)<B(x)$ e $A(x)>-B(x)$, insieme.` },
    { id: 'fc-14', sezione: 'disequazioni-valore-assoluto-sistemi', tipo: 'formula', fronte: R`Unione per $|A(x)|>B(x)$`, retro: R`$A(x)>B(x)$ oppure $A(x)<-B(x)$.` },
    { id: 'fc-15', sezione: 'disequazioni-valore-assoluto-sistemi', tipo: 'concetto', fronte: R`Perché non serve imporre $B(x)>0$ nel sistema di $|A|<B$?`, retro: R`Perché lo implicano già le altre due condizioni del sistema.` },
    { id: 'fc-16', sezione: 'equazioni-irrazionali-una-radice', tipo: 'formula', fronte: R`Sistema per $\sqrt{A(x)}=B(x)$`, retro: R`$B(x)\ge 0$ e $A(x)=[B(x)]^2$.` },
    { id: 'fc-17', sezione: 'equazioni-irrazionali-una-radice', tipo: 'concetto', fronte: R`Serve imporre $A(x)\ge0$ nel sistema di $\sqrt{A}=B$?`, retro: R`No: lo garantisce già $A(x)=[B(x)]^2$, un quadrato non è mai negativo.` },
    { id: 'fc-18', sezione: 'equazioni-irrazionali-una-radice', tipo: 'concetto', fronte: R`Cambia qualcosa se la radice ha indice dispari?`, retro: R`Sì: nessuna condizione di segno, $\sqrt[3]{A}=B \iff A=B^3$ sempre.` },
    { id: 'fc-19', sezione: 'equazioni-irrazionali-due-radici', tipo: 'procedura', fronte: R`Strategia con due radici quadrate nella stessa equazione`, retro: R`Si isola una radice alla volta e si eleva al quadrato, anche due volte.` },
    { id: 'fc-20', sezione: 'equazioni-irrazionali-due-radici', tipo: 'concetto', fronte: R`Come si controlla il risultato di un'equazione con due radici?`, retro: R`Sostituendo ogni soluzione trovata nell'equazione di partenza (verifica diretta).` },
    { id: 'fc-21', sezione: 'equazioni-irrazionali-due-radici', tipo: 'formula', fronte: R`Condizione per $\sqrt{A(x)}=\sqrt{B(x)}$`, retro: R`$A(x)=B(x)$ e $A(x)\ge 0$ (basta uno dei due, sono uguali).` },
    { id: 'fc-22', sezione: 'disequazioni-irrazionali', tipo: 'formula', fronte: R`Sistema per $\sqrt{A(x)}<B(x)$`, retro: R`$A(x)\ge 0$, $B(x)>0$, $A(x)<[B(x)]^2$.` },
    { id: 'fc-23', sezione: 'disequazioni-irrazionali', tipo: 'formula', fronte: R`I due sistemi per $\sqrt{A(x)}>B(x)$`, retro: R`$(A\ge 0 \land B<0)$ oppure $(B\ge 0 \land A>B^2)$.` },
    { id: 'fc-24', sezione: 'disequazioni-irrazionali', tipo: 'concetto', fronte: R`Perché $\sqrt{A(x)}>B(x)$ diventa un'unione di due sistemi?`, retro: R`Perché può essere vera per un motivo automatico ($B$ negativo) o per un confronto vero ($B\ge 0$ e $A>B^2$).` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $|x + 3| = 5$.`, suggerimenti: [R`È un'equazione $|A|=k$ con $k$ costante positivo.`, R`Separa i due casi: $x+3=5$ e $x+3=-5$.`], risposta: { tipo: 'numeri', valori: [2, -8] }, soluzione: [R`$|x+3|=5$ con $k=5>0$: si separano i due casi.`, R`$x+3=5 \Rightarrow x=2$.`, R`$x+3=-5 \Rightarrow x=-8$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $|2x - 6| < 4$.`, suggerimenti: [R`È la forma rapida $|A|<k$: trasformala in una doppia disuguaglianza.`, R`Scrivi $-4<2x-6<4$ e risolvi dividendo per $2$.`], risposta: { tipo: 'intervallo', da: 1, a: 5, chiusoDa: false, chiusoA: false }, soluzione: [R`Forma rapida: $-4<2x-6<4$.`, R`Sommo $6$: $2<2x<10$.`, R`Divido per $2$: $1<x<5$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi $|x + 2| > 6$.`, suggerimenti: [R`È la forma rapida $|A|>k$: porta a un'unione di due condizioni.`, R`Risolvi separatamente $x+2>6$ e $x+2<-6$, poi unisci i risultati.`], risposta: { tipo: 'testo', accettate: ['x<-8 o x>4', 'x<-8 ∨ x>4', 'x>4 o x<-8', ']-inf;-8[u]4;+inf[', '(-inf,-8)∪(4,+inf)', 'x<-8 v x>4'] }, soluzione: [R`Forma rapida: $x+2>6$ oppure $x+2<-6$.`, R`Dalla prima: $x>4$.`, R`Dalla seconda: $x<-8$.`, R`Soluzione: $x<-8$ oppure $x>4$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $|3x + 2| = x + 6$.`, suggerimenti: [R`È il caso $|A|=B$: risolvi $3x+2=x+6$ e $3x+2=-(x+6)$.`, R`Alla fine controlla che $B(x)=x+6$ sia $\ge 0$ in entrambe le soluzioni trovate.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`$3x+2=x+6 \Rightarrow 2x=4 \Rightarrow x=2$.`, R`$3x+2=-(x+6) \Rightarrow 4x=-8 \Rightarrow x=-2$.`, R`Verifica $B(x)=x+6\ge 0$: in $x=2$, $B=8$; in $x=-2$, $B=4$. Entrambe accettabili.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi $|x + 1| = |x - 5|$.`, suggerimenti: [R`È il caso $|A|=|B|$: non serve nessuna condizione, ma attento se un caso non porta a nulla.`, R`Un caso porta a un'uguaglianza sempre falsa: scartalo e tieni solo l'altro.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.001 }, soluzione: [R`$x+1=x-5 \Rightarrow 1=-5$: falso, nessuna soluzione da questo caso.`, R`$x+1=-(x-5) \Rightarrow x+1=-x+5 \Rightarrow 2x=4 \Rightarrow x=2$.`, R`Verifica: $|2+1|=3$ e $|2-5|=3$. ✓`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $|x + 6| = x$. Se non ha soluzioni, scrivi "impossibile".`, suggerimenti: [R`È il caso $|A|=B$ con $B(x)=x$: trova prima le soluzioni algebriche.`, R`Controlla il segno di $B(x)=x$ in ogni candidato: forse nessuno lo rispetta.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna soluzione', 'nessuna', 'non ha soluzioni', 'insieme vuoto', 'vuoto', '∅'] }, soluzione: [R`$x+6=x \Rightarrow 6=0$: falso, nessuna soluzione da questo caso.`, R`$x+6=-x \Rightarrow 2x=-6 \Rightarrow x=-3$.`, R`Verifico il segno di $B(x)=x$: in $x=-3$, $B=-3<0$, va scartata.`, R`Nessuna delle due strade dà una soluzione accettabile: l'equazione è impossibile.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\sqrt{2x + 3} = x$.`, suggerimenti: [R`Sistema: $x\ge 0$ e $2x+3=x^2$.`, R`Risolvi l'equazione di secondo grado e scarta la soluzione che non rispetta $x\ge 0$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`Sistema: $x\ge 0$ e $2x+3=x^2$.`, R`$x^2-2x-3=0 \Rightarrow (x-3)(x+1)=0 \Rightarrow x=3$ oppure $x=-1$.`, R`Solo $x=3$ rispetta $x\ge 0$. Verifica: $\sqrt{9}=3$. ✓`] },
    { id: 'es-08', difficolta: 1, testo: R`Risolvi $\sqrt[3]{2x - 1} = 3$.`, suggerimenti: [R`L'indice è dispari: nessuna condizione da imporre.`, R`Eleva al cubo entrambi i membri: $2x-1=27$.`], risposta: { tipo: 'numero', valore: 14, tolleranza: 0.001 }, soluzione: [R`Indice dispari: nessuna condizione. Elevo al cubo: $2x-1=27$.`, R`$2x=28 \Rightarrow x=14$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi $\sqrt{x + 1} + \sqrt{x + 6} = 5$.`, suggerimenti: [R`Isola una delle due radici prima di elevare al quadrato.`, R`Dopo il primo elevamento a potenza resterà ancora una radice: isolala ed eleva di nuovo.`, R`Alla fine verifica la soluzione trovata per sostituzione diretta nell'equazione di partenza.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`C.e.: $x\ge -1$ (che comprende anche $x+6\ge0$).`, R`Isolo: $\sqrt{x+1}=5-\sqrt{x+6}$. Elevo al quadrato: $x+1=25-10\sqrt{x+6}+x+6$.`, R`Semplifico: $1-31=-10\sqrt{x+6} \Rightarrow \sqrt{x+6}=3$.`, R`Elevo di nuovo: $x+6=9 \Rightarrow x=3$. Verifica: $\sqrt{4}+\sqrt{9}=2+3=5$. ✓`] },
    { id: 'es-10', difficolta: 3, testo: R`Risolvi $\sqrt{5x + 6} < x$.`, suggerimenti: [R`Serve il sistema per $\sqrt{A}<B$: tre condizioni insieme.`, R`Non dimenticare $B(x)=x>0$: senza questa condizione il confronto dei quadrati non basta.`], risposta: { tipo: 'intervallo', da: 6, a: 'inf', chiusoDa: false, chiusoA: false }, soluzione: [R`Sistema: $5x+6\ge0$ (cioè $x\ge -\dfrac{6}{5}$), $x>0$, $5x+6<x^2$.`, R`$x^2-5x-6>0 \Rightarrow (x-6)(x+1)>0 \Rightarrow x<-1 \lor x>6$.`, R`Intersecando con $x>0$ resta solo $x>6$; è già dentro il dominio.`] },
    { id: 'es-11', difficolta: 3, testo: R`Risolvi $\sqrt{|x - 3|} = 2$.`, suggerimenti: [R`Il radicando è $|x-3|$: pensa a cosa succede quando elevi al quadrato.`, R`Ottieni $|x-3|=4$: risolvilo come un'equazione $|A|=k$.`], risposta: { tipo: 'numeri', valori: [7, -1] }, soluzione: [R`Elevo al quadrato (lecito: $2\ge 0$): $|x-3|=4$.`, R`$x-3=4 \Rightarrow x=7$; oppure $x-3=-4 \Rightarrow x=-1$.`, R`Verifica: $\sqrt{|7-3|}=\sqrt{4}=2$ ✓; $\sqrt{|-1-3|}=\sqrt{4}=2$ ✓.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale affermazione sul valore assoluto è sempre vera, per ogni numero reale $a$?`, opzioni: [R`$|a| \ge 0$`, R`$|a| = a$`, R`$|a| = -a$`, R`$|a| < 0$ se $a$ è negativo`], corretta: 0, spiegazione: R`$|a|$ è una distanza, quindi non è mai negativa. $|a|=a$ vale solo se $a\ge0$, $|a|=-a$ solo se $a\le0$, e un modulo non è mai negativo qualunque sia $a$.` },
    { id: 'q-02', domanda: R`Quanto vale $|-3| \cdot |2|$?`, opzioni: [R`$-6$`, R`$6$`, R`$1$`, R`$-1$`], corretta: 1, spiegazione: R`$|-3|=3$ e $|2|=2$: il prodotto è $6$. Il valore assoluto di un prodotto è il prodotto dei valori assoluti, ma resta sempre $\ge 0$: mai $-6$.` },
    { id: 'q-03', domanda: R`L'equazione $|A(x)| = k$, con $k<0$, ha…`, opzioni: [R`sempre due soluzioni`, R`una sola soluzione`, R`nessuna soluzione`, R`infinite soluzioni`], corretta: 2, spiegazione: R`Un modulo non è mai negativo, quindi non può mai uguagliare un numero $k<0$: l'equazione è impossibile.` },
    { id: 'q-04', domanda: R`Per risolvere $|A(x)| = B(x)$, dopo aver trovato le soluzioni di $A=B$ e $A=-B$, cosa bisogna fare?`, opzioni: [R`Niente, sono già tutte accettabili`, R`Verificare che $A(x) \ge 0$ in ciascuna soluzione trovata`, R`Scartare sempre la soluzione negativa`, R`Verificare che $B(x) \ge 0$ in ciascuna soluzione trovata`], corretta: 3, spiegazione: R`Un modulo non può uguagliare un valore negativo di $B(x)$: le soluzioni con $B(x)<0$ vanno scartate, anche se algebricamente derivano correttamente da $A=B$ o $A=-B$.` },
    { id: 'q-05', domanda: R`Per risolvere $|A(x)| = |B(x)|$, quale condizione aggiuntiva serve?`, opzioni: [R`Nessuna condizione aggiuntiva`, R`$A(x) \ge 0$`, R`$B(x) \ge 0$`, R`$A(x) = B(x)$ sempre`], corretta: 0, spiegazione: R`Elevando entrambi i membri al quadrato si ottiene $A(x)^2=B(x)^2$, sempre equivalente a $A=B$ o $A=-B$, senza bisogno di controllare segni.` },
    { id: 'q-06', domanda: R`Il grafico di $y=|f(x)|$ si ottiene da quello di $y=f(x)$…`, opzioni: [R`ribaltando verso il basso le parti dove $f(x)>0$`, R`ribaltando verso l'alto le parti dove $f(x)<0$, lasciando invariato il resto`, R`traslando tutto il grafico verso l'alto`, R`ribaltando l'intero grafico rispetto all'asse $y$`], corretta: 1, spiegazione: R`Dove $f(x)\ge 0$ il modulo non cambia nulla; dove $f(x)<0$, $|f(x)|=-f(x)$, cioè il simmetrico rispetto all'asse $x$: si ribalta solo quella parte, verso l'alto.` },
    { id: 'q-07', domanda: R`Nella forma rapida $|A(x)|<k$ (con $k>0$), a cosa equivale la disequazione?`, opzioni: [R`$A(x)<k$`, R`$A(x)>-k$`, R`$-k<A(x)<k$`, R`$A(x)<-k$ oppure $A(x)>k$`], corretta: 2, spiegazione: R`«Minore di $k$ in valore assoluto» significa stare in una striscia intorno allo zero, ampia $k$ per lato: $-k<A(x)<k$. L'ultima opzione è invece la forma rapida di $|A(x)|>k$.` },
    { id: 'q-08', domanda: R`Se $k < 0$, la disequazione $|A(x)| > k$…`, opzioni: [R`non ha soluzione`, R`equivale a $A(x)>k$`, R`equivale a $A(x)<-k$`, R`è vera per ogni $x$ del dominio di $A$`], corretta: 3, spiegazione: R`$|A(x)|\ge 0$ sempre, e $0 > k$ quando $k<0$: il modulo supera automaticamente un numero negativo, in ogni punto in cui $A(x)$ è definita.` },
    { id: 'q-09', domanda: R`Nel sistema per $|A(x)| < B(x)$, perché non serve imporre a parte $B(x)>0$?`, opzioni: [R`Perché è una conseguenza delle altre due condizioni del sistema`, R`Perché non è mai vero`, R`Perché $B(x)$ è sempre positivo per definizione`, R`Serve comunque, è un errore ometterlo`], corretta: 0, spiegazione: R`Se $A(x)<B(x)$ e $A(x)>-B(x)$ insieme, allora $B(x)$ supera sia $A(x)$ sia $-A(x)$, quindi $B(x)>|A(x)|\ge 0$: la positività di $B$ è già garantita.` },
    { id: 'q-10', domanda: R`Quale delle seguenti è la traduzione corretta di $|A(x)|>B(x)$?`, opzioni: [R`$A(x)>B(x)$ e $A(x)<-B(x)$, insieme`, R`$A(x)>B(x)$ oppure $A(x)<-B(x)$`, R`$-B(x)<A(x)<B(x)$`, R`$A(x)=B(x)$ oppure $A(x)=-B(x)$`], corretta: 1, spiegazione: R`È un'unione (basta che valga una delle due), non un'intersezione: la terza opzione è invece la traduzione di $|A(x)|<B(x)$.` },
    { id: 'q-11', domanda: R`Un'equazione irrazionale ha l'incognita…`, opzioni: [R`solo a denominatore`, R`solo come esponente`, R`sotto il segno di radice`, R`solo dentro un valore assoluto`], corretta: 2, spiegazione: R`È questa la caratteristica che dà il nome «irrazionale» all'equazione: la presenza dell'incognita in un radicando.` },
    { id: 'q-12', domanda: R`Nel sistema per $\sqrt{A(x)}=B(x)$, perché non serve imporre a parte $A(x)\ge0$?`, opzioni: [R`Perché $A(x)$ è sempre positivo`, R`Perché la radice esiste comunque`, R`In realtà serve, ed è un errore ometterlo`, R`Perché lo garantisce già $A(x)=[B(x)]^2$, un quadrato non negativo`], corretta: 3, spiegazione: R`Se $A(x)=[B(x)]^2$, il secondo membro è un quadrato, quindi $\ge 0$: la condizione di esistenza della radice è automaticamente rispettata.` },
    { id: 'q-13', domanda: R`Perché nell'equazione $\sqrt[3]{A(x)}=B(x)$ (indice dispari) non serve nessuna condizione di segno?`, opzioni: [R`Perché il cubo è un'operazione reversibile su tutto $\mathbb{R}$`, R`Perché le radici dispari non esistono per i numeri negativi`, R`Perché $B(x)$ è sempre positivo`, R`In realtà una condizione serve comunque`], corretta: 0, spiegazione: R`A differenza del quadrato, elevare al cubo è un'operazione biunivoca su tutto $\mathbb{R}$: non introduce mai soluzioni estranee, quindi non servono condizioni.` },
    { id: 'q-14', domanda: R`Con due radici quadrate nella stessa equazione, qual è il modo più sicuro di controllare le soluzioni trovate?`, opzioni: [R`Fidarsi del sistema di condizioni sui segni, senza altro`, R`Sostituire ogni soluzione nell'equazione di partenza`, R`Non serve nessun controllo`, R`Controllare solo le condizioni di esistenza delle radici`], corretta: 1, spiegazione: R`Dopo due elevamenti a potenza, tracciare a mano tutte le condizioni di segno è complicato: la verifica diretta per sostituzione è il modo più affidabile.` },
    { id: 'q-15', domanda: R`Nel sistema per $\sqrt{A(x)} < B(x)$, quali condizioni servono insieme?`, opzioni: [R`Solo $A(x)\ge 0$`, R`Solo $A(x)<[B(x)]^2$`, R`$A(x)\ge0$, $B(x)>0$ e $A(x)<[B(x)]^2$`, R`$B(x)<0$ e $A(x)>[B(x)]^2$`], corretta: 2, spiegazione: R`Servono tutte e tre: il dominio della radice, la positività del secondo membro (senza cui il confronto non avrebbe senso), e il confronto dei quadrati.` },
    { id: 'q-16', domanda: R`La disequazione $\sqrt{A(x)}>B(x)$ diventa un'unione di due sistemi perché…`, opzioni: [R`ha sempre due famiglie di soluzioni distinte`, R`bisogna risolvere due equazioni diverse`, R`il segno di $A(x)$ può essere sia positivo sia negativo`, R`può essere vera per un motivo automatico ($B(x)<0$) o per un vero confronto ($B(x)\ge0$ e $A(x)>[B(x)]^2$)`], corretta: 3, spiegazione: R`Se $B(x)$ è negativo, una radice (sempre $\ge 0$) lo supera automaticamente; se $B(x)\ge 0$, serve davvero confrontare i quadrati. Sono due situazioni diverse, unite da un «oppure».` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di sciogliere qualunque valore assoluto, chiediti se il secondo membro è un numero o un'espressione: cambia il metodo da usare.` },
    { tipo: 'errore', testo: R`In $|A|=B$, dimenticare di controllare il segno di $B(x)$ è l'errore più frequente: porta ad accettare soluzioni che il modulo, per definizione, non può avere.` },
    { tipo: 'trucco', testo: R`$|A|=|B|$ è il caso più comodo: nessuna condizione da verificare, basta risolvere $A=B$ e $A=-B$.` },
    { tipo: 'metodo', testo: R`Con $|A|<k$ e $|A|>k$, se $k$ è negativo non serve fare calcoli: ragiona subito sul fatto che $|A|\ge 0$.` },
    { tipo: 'errore', testo: R`Scrivere $|A|>k$ come un'unica catena $-k>A>k$ non ha senso: è un'unione, va scritta con «oppure».` },
    { tipo: 'metodo', testo: R`Ogni equazione o disequazione irrazionale comincia con la stessa domanda: qual è la condizione che rende il secondo membro compatibile con una radice, che non è mai negativa?` },
    { tipo: 'trucco', testo: R`Se l'indice della radice è dispari, rilassati: nessuna condizione di segno, si eleva a potenza e basta.` },
    { tipo: 'errore', testo: R`Con due radici nella stessa equazione, fidarsi solo delle condizioni sui segni senza una verifica finale è rischioso: dopo due elevamenti a potenza conviene sempre controllare per sostituzione.` },
    { tipo: 'trucco', testo: R`Prima di elevare al quadrato una disequazione irrazionale con «>», ricordati del sistema con il secondo membro negativo: è la parte che si dimentica più spesso, e regala soluzioni gratis.` }
  ],

  aneddoti: [
    { matematico: 'Ippaso di Metaponto', anni: 'V secolo a.C.', titolo: 'Il numero che non doveva esistere', testo: R`Nella scuola pitagorica il motto era «tutto è numero», intendendo che ogni lunghezza si potesse scrivere come rapporto fra numeri interi. Ippaso, si racconta, scoprì che non era così: la diagonale di un quadrato di lato $1$ misura $\sqrt{2}$, e $\sqrt{2}$ non si può scrivere come una frazione, per quanto la si cerchi. Per i pitagorici, che avevano costruito tutta la loro visione del mondo sui numeri interi e i loro rapporti, fu uno scandalo: la leggenda, probabilmente non storica ma tramandata da autori antichi, vuole che Ippaso sia stato annegato in mare dai suoi stessi compagni per aver rivelato il segreto. Vero o no l'epilogo, la scoperta dei numeri **irrazionali** fu reale, e cambiò per sempre l'idea greca di numero.`, legame: R`$\sqrt{2}$ è la prima soluzione irrazionale mai scoperta: da qui in poi, ogni equazione irrazionale può avere per soluzione un numero fatto così.` },
    { matematico: 'Erone di Alessandria', anni: '10–70 d.C. circa', titolo: 'Un algoritmo per la radice quadrata, duemila anni fa', testo: R`Erone fu un ingegnere e matematico attivo ad Alessandria d'Egitto, autore di trattati pratici su meccanica, ottica e misurazione dei terreni. Nella sua *Metrica* descrive un metodo per calcolare la radice quadrata di un numero che non è un quadrato perfetto, per esempio $\sqrt{720}$: si parte da un valore approssimato, e lo si migliora ripetutamente facendo la media fra il valore stesso e il numero diviso per quel valore. Un procedimento simile era già noto agli scribi babilonesi oltre mille anni prima di lui, ma Erone lo mise per iscritto come regola generale, dentro un manuale greco di uso pratico. Il metodo converge sorprendentemente in fretta: bastano due o tre passaggi per avere diverse cifre decimali esatte, molto prima che esistesse una calcolatrice.`, legame: R`Il metodo di Erone approssima proprio i numeri irrazionali, come le radici che compaiono in questa lezione, con la precisione che si vuole.` },
    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Il simbolo |x| e la funzione «tutta punte»', testo: R`Weierstrass, padre del rigore nell'analisi matematica, insegnò per quattordici anni in un liceo di provincia prima di essere notato dall'ambiente accademico. Fra i tanti contributi con cui rese l'analisi più solida, gli storici della notazione attribuiscono a un suo manoscritto del 1841 (pubblicato solo molti anni dopo) l'introduzione del simbolo $|x|$ per il valore assoluto, o «modulo» nel caso dei numeri complessi: prima di allora non esisteva una scrittura condivisa. Nel 1872 presentò all'Accademia di Berlino un esempio ancora più sorprendente: una funzione continua ovunque, ma «a punte» in ogni punto, cioè priva di derivata ovunque — il suo grafico non ha mai un tratto liscio, per quanto lo si ingrandisca. All'epoca sembrò un mostro che sfidava l'intuizione geometrica; oggi è un classico esempio di quanto continuità e derivabilità siano proprietà diverse.`, legame: R`Il simbolo $|x|$ usato in tutta questa lezione, secondo questa ricostruzione storica, nasce proprio con Weierstrass.` },
    { matematico: 'Isaac Newton', anni: '1642–1727', titolo: 'Avvicinarsi a una soluzione un passo alla volta', testo: R`Fra le tante cose per cui è ricordato, Newton descrisse, in un manoscritto del 1669 poi confluito nei suoi lavori sul calcolo, un modo per avvicinarsi passo dopo passo alla soluzione di un'equazione che non si sa risolvere esattamente: si parte da un valore vicino alla soluzione e lo si corregge ripetutamente, avvicinandosi sempre di più. Il metodo che oggi si studia con questo nome, e che usa esplicitamente la derivata per calcolare la correzione, fu però messo nella forma che conosciamo da Joseph Raphson, una ventina d'anni dopo: per questo si parla spesso di «metodo di Newton-Raphson». È uno strumento che si usa ancora oggi, dentro ogni calcolatrice e software che deve trovare la soluzione approssimata di un'equazione.`, legame: R`Quando un'equazione irrazionale non si lascia risolvere con un sistema pulito, un metodo come questo trova comunque una soluzione approssimata, cifra dopo cifra.` }
  ]
});
})();
