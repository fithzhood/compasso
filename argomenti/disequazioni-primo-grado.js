(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'disequazioni-primo-grado',
  titolo: 'Disequazioni di primo grado',

  introduzione: R`Una **disequazione** è come un'equazione, ma al posto del segno di uguale compare un simbolo di confronto: $<$, $>$, $\le$ oppure $\ge$. Un'equazione di primo grado ha di solito un'unica soluzione; una disequazione di primo grado, come $3x - 2 < 7$, ne ha quasi sempre infinite: tutto un intervallo di numeri, per esempio $x < 3$.

Le disequazioni compaiono ogni volta che una domanda non chiede "quanto vale esattamente", ma "quali valori vanno bene": un ascensore che non deve superare un certo peso, una velocità che non deve scendere sotto un limite, un budget che non si può superare facendo acquisti. In tutti questi casi la risposta non è un numero solo, ma un margine.

Per affrontare questo argomento serve saper risolvere le equazioni di primo grado, e conoscere le operazioni con monomi e frazioni algebriche: le stesse tecniche di calcolo, applicate però a un simbolo che si comporta secondo regole leggermente diverse.`,

  sezioni: [
    { id: 'disuguaglianze', titolo: 'Disuguaglianze e disequazioni', testo: R`Una **disuguaglianza** è un confronto tra due espressioni scritto con uno dei simboli $<$ (minore), $>$ (maggiore), $\le$ (minore o uguale), $\ge$ (maggiore o uguale) oppure $\ne$ (diverso). $3 < 5$ è una disuguaglianza vera; $7 < 2$ è falsa: in entrambe non c'è nessuna incognita, sono solo affermazioni su numeri.

Una **disequazione** è invece una disuguaglianza in cui compare un'incognita, per esempio $2x - 1 > 3$. Qui il confronto non è né vero né falso in assoluto: dipende dal valore scelto per $x$. Risolvere una disequazione significa trovare **tutti** i valori dell'incognita che la rendono vera.

>* **Risolvere una disequazione** vuol dire determinare l'insieme dei valori di $x$ che la soddisfano. A differenza di un'equazione, che di solito ha un numero finito di soluzioni, una disequazione ne ha quasi sempre **infinite**: un intero intervallo di numeri.

Il confronto fra $2x - 1 = 3$ (equazione, un'unica soluzione, $x = 2$) e $2x - 1 > 3$ (disequazione, soluzione $x > 2$, cioè tutti i numeri maggiori di $2$) mostra bene la differenza: stessa espressione, ma un simbolo diverso cambia radicalmente il tipo di risposta che si cerca.

>! Un errore tipico all'inizio è cercare "la" soluzione di una disequazione come se fosse un'equazione. Non c'è un solo numero da trovare: c'è un intervallo, spesso illimitato, da descrivere per intero.` },

    { id: 'intervalli', titolo: 'Gli intervalli', testo: R`La soluzione di una disequazione si può scrivere in tre modi equivalenti: con una disuguaglianza (per esempio $-2 \le x < 5$), con la notazione a intervallo (per esempio $[-2, 5)$), oppure disegnandola sulla **retta reale**.

Un estremo **incluso** (simbolo $\le$ o $\ge$) si rappresenta con la parentesi quadra e, sulla retta, con un pallino pieno; un estremo **escluso** (simbolo $<$ o $>$) si rappresenta con la parentesi tonda e un pallino vuoto. Quando un lato non ha estremo, si usa $+\infty$ o $-\infty$ con la parentesi tonda: l'infinito non è un numero, quindi non può mai essere "incluso".

| Disuguaglianza | Intervallo | Sulla retta reale |
|---|---|---|
| $a < x < b$ | $(a, b)$ | pallini vuoti in $a$ e $b$ |
| $a \le x \le b$ | $[a, b]$ | pallini pieni in $a$ e $b$ |
| $a \le x < b$ | $[a, b)$ | pieno in $a$, vuoto in $b$ |
| $x > a$ | $(a, +\infty)$ | vuoto in $a$, freccia a destra |
| $x \le a$ | $(-\infty, a]$ | pieno in $a$, freccia a sinistra |

[[grafico:intervalliNotazione]]

Alcuni libri, seguendo un'usanza francese, scrivono l'intervallo aperto con le parentesi quadre "rovesciate", $]a, b[$, invece delle tonde $(a,b)$: il significato è identico, cambia solo la grafia.

>* Parentesi **quadra** = estremo incluso ($\le$, $\ge$); parentesi **tonda** = estremo escluso ($<$, $>$). L'infinito ha sempre la tonda.

>! Attenzione a non confondere l'intervallo $(2, 5)$ (i numeri tra $2$ e $5$) con la coppia di coordinate $(2, 5)$ di un punto: il contesto chiarisce sempre di quale dei due si tratta, ma è bene saperlo.` },

    { id: 'principi-equivalenza', titolo: 'I principi di equivalenza e il cambio di verso', testo: R`Come per le equazioni, esistono due principi che permettono di trasformare una disequazione in un'altra equivalente (con le stesse soluzioni), più semplice da risolvere.

**Primo principio.** Si può sommare o sottrarre la stessa quantità a entrambi i membri: il verso della disequazione non cambia. Da $x - 5 > 2$ si ottiene $x > 7$ sommando $5$ a entrambi i membri.

**Secondo principio.** Si possono moltiplicare o dividere entrambi i membri per uno stesso numero diverso da zero, ma con una condizione fondamentale:

- se si moltiplica (o divide) per un numero **positivo**, il verso resta invariato;
- se si moltiplica (o divide) per un numero **negativo**, il verso si capovolge: $<$ diventa $>$, $\le$ diventa $\ge$, e viceversa.

Il motivo si vede con un esempio numerico: $2 < 5$ è vera; moltiplicando entrambi i membri per $-1$ si otterrebbe $-2 < -5$, che è **falsa** ($-2$ è maggiore di $-5$, non minore). Per restare coerenti, il verso deve cambiare: $-2 > -5$.

Applichiamo il principio a $-2x < 6$: dividendo per $-2$ (negativo), il verso si capovolge e si ottiene $x > -3$.

[[grafico:cambioVerso]]

>* **Cambio di verso:** moltiplicando o dividendo per un numero negativo, $<$ e $>$ si scambiano, e così $\le$ e $\ge$. Sommare o sottrarre non cambia mai il verso.

>! L'errore più comune in assoluto in questo argomento è proprio dimenticare il cambio di verso quando si divide per un coefficiente negativo. Conviene controllare sempre il segno del numero per cui si sta dividendo, prima di scrivere il risultato.` },

    { id: 'disequazioni-intere', titolo: 'Disequazioni intere', testo: R`Una disequazione di primo grado **intera** (senza l'incognita al denominatore) si riconduce sempre, dopo aver eliminato eventuali parentesi e ridotto i termini simili, alla **forma normale** $ax + b > 0$ (o con $<,\ \le,\ \ge$).

Isolando $x$ si trovano tre casi, a seconda del segno di $a$:

- se $a > 0$: si divide per $a$ senza cambiare verso, $x > -\dfrac{b}{a}$;
- se $a < 0$: si divide per $a$ cambiando verso, $x < -\dfrac{b}{a}$;
- se $a = 0$: l'incognita scompare e resta un confronto tra soli numeri, che è **sempre vero** oppure **sempre falso**.

Per esempio, $2x - 6 > 0$ ha $a = 2 > 0$: si ottiene $x > 3$. Graficamente, $y = 2x - 6$ è una retta, e la disequazione chiede dove questa retta sta **sopra** l'asse $x$: esattamente per $x > 3$.

[[grafico:segnoRetta]]

Prova a spostare il punto sull'asse $x$ nel grafico seguente, e osserva quando $2p - 6$ diventa positivo.

[[grafico:provaValori]]

Il caso $a = 0$ dà luogo a due possibilità particolari. In $2(x + 3) > 2x - 1$, sviluppando si ottiene $2x + 6 > 2x - 1$, cioè $6 > -1$: vero per ogni numero, indipendentemente da $x$. La disequazione è **sempre vera**, con soluzione tutto $\mathbb{R}$. In $2(x - 1) > 2x + 5$, invece, si arriva a $-2 > 5$: falso sempre. La disequazione è **mai vera**, con soluzione l'**insieme vuoto** ($S = \varnothing$).

>* Una disequazione intera di primo grado ha tre possibili tipi di soluzione: un intervallo (il caso normale), tutto $\mathbb{R}$ (sempre vera), oppure $\varnothing$ (mai vera).

>! "Sempre vera" e "mai vera" non sono errori di calcolo: sono risposte legittime. Vanno riconosciute quando, semplificando, l'incognita $x$ scompare del tutto dai due membri.` },

    { id: 'sistemi', titolo: 'Sistemi di disequazioni', testo: R`Un **sistema di disequazioni** è un insieme di due o più disequazioni che devono essere vere **contemporaneamente**. Si scrive con una parentesi graffa:

$$\begin{cases} 2x - 3 > -7 \\ -x + 5 \ge -3 \end{cases}$$

Il metodo è sempre lo stesso: si risolve ogni disequazione **separatamente**, poi si disegnano tutte le soluzioni sulla stessa retta reale e si cerca l'**intersezione**, cioè la parte comune a tutti gli intervalli.

Nell'esempio: dalla prima, $2x > -4$, cioè $x > -2$; dalla seconda, $-x \ge -8$, e dividendo per $-1$ (cambio di verso) $x \le 8$. L'intersezione tra $x > -2$ e $x \le 8$ è $-2 < x \le 8$.

[[grafico:sistemaIntersezione]]

>* La soluzione di un sistema è l'**intersezione**, non l'unione, delle soluzioni delle singole disequazioni: un valore deve soddisfarle tutte insieme, la parola "e" non lascia scelta.

Se gli intervalli delle singole disequazioni non si sovrappongono affatto, il sistema **non ha soluzione**: per esempio $x > 4$ e $x < 1$ insieme non sono mai vere, perché nessun numero è allo stesso tempo maggiore di $4$ e minore di $1$ ($S = \varnothing$).

>! Un errore frequente è unire gli intervalli invece di intersecarli, magari perché sembra "più generoso" prendere tutti i valori che vanno bene ad **almeno una** delle disequazioni. Ma un sistema chiede che valgano **tutte**.` },

    { id: 'fratte-prodotto', titolo: 'Disequazioni fratte e disequazioni prodotto', testo: R`Una **disequazione prodotto** confronta con $0$ un prodotto di fattori di primo grado, per esempio $(x + 1)(x - 3) < 0$. Si trovano gli **zeri** di ciascun fattore ($-1$ e $3$), si segnano sulla retta reale, e si costruisce la **tabella dei segni**: per ogni intervallo tra due zeri consecutivi si stabilisce il segno di ciascun fattore e si moltiplicano. Qui, tra $-1$ e $3$ un fattore è positivo e l'altro negativo: il prodotto è negativo, quindi soluzione $-1 < x < 3$.

Una **disequazione fratta** ha l'incognita anche al denominatore, per esempio $\dfrac{x - 2}{x - 4} \ge 0$.

>! Non si moltiplica **mai** entrambi i membri per il denominatore quando contiene l'incognita: il suo segno non è noto in anticipo, e moltiplicare per una quantità di segno ignoto può capovolgere il verso senza che ce ne accorgiamo.

Il metodo giusto: si portano tutti i termini a un membro, ottenendo un'unica frazione confrontata con $0$ (già fatta, in questo caso), e si applica la stessa tabella dei segni usata per il prodotto, trattando numeratore e denominatore come fattori separati.

| Intervallo | $x-2$ | $x-4$ | frazione |
|---|---|---|---|
| $x < 2$ | $-$ | $-$ | $+$ |
| $x = 2$ | $0$ | $-$ | $0$ |
| $2 < x < 4$ | $+$ | $-$ | $-$ |
| $x = 4$ | $+$ | $0$ | non esiste |
| $x > 4$ | $+$ | $+$ | $+$ |

La disequazione chiede dove la frazione è $\ge 0$: per $x \le 2$ oppure $x > 4$. Il valore $x = 4$, che annulla il denominatore, resta **sempre escluso**, anche se il simbolo è $\ge$: lì la frazione semplicemente non esiste.

[[grafico:frattaEsclusione]]

>* Nelle disequazioni fratte si confronta con $0$ e si studia il segno con la tabella; il denominatore non si moltiplica mai, e il suo zero è sempre escluso dalla soluzione.` },

    { id: 'letterali', titolo: 'Disequazioni letterali', testo: R`In una disequazione **letterale** (o parametrica) uno o più coefficienti sono indicati con una lettera, il **parametro**, e la soluzione dipende dal suo valore. Risolvere significa **discutere** tutti i casi possibili.

Il bivio decisivo, quando si isola $x$ dividendo per il coefficiente che la moltiplica, è sempre il **segno di quel coefficiente**. Per $kx > 3$:

- se $k > 0$: si divide per un positivo, $x > \dfrac{3}{k}$;
- se $k < 0$: si divide per un negativo, il verso cambia, $x < \dfrac{3}{k}$;
- se $k = 0$: l'incognita scompare, resta $0 > 3$, falso: nessun $x$ va bene, qualunque esso sia.

La discussione va sempre fatta per **tutti** i valori del parametro, incluso il caso limite in cui il coefficiente si annulla: è proprio lì che si nasconde l'errore più comune, dimenticarsi che $k = 0$ è un caso a parte e non un sottocaso di $k > 0$ o $k < 0$.

>* In una disequazione letterale $kx > c$ si distinguono sempre tre casi: $k > 0$ (verso invariato), $k < 0$ (verso capovolto), $k = 0$ (l'incognita scompare, resta un confronto tra numeri).

>! Non basta scrivere $x > 3/k$ e fermarsi: senza specificare il segno di $k$, quella scrittura da sola non dice nulla su quale verso abbia davvero la disequazione.` },

    { id: 'problemi', titolo: 'Problemi con le disequazioni', testo: R`Molti problemi non chiedono un valore preciso, ma un **intervallo** di valori accettabili: quante magliette si possono comprare al massimo con un certo budget, quale altezza minima deve avere un oggetto, quanti punti servono almeno per essere promossi. Sono situazioni tipiche delle disequazioni.

Il procedimento è lo stesso delle equazioni: si sceglie l'incognita, si **traduce** ogni condizione del testo in una disequazione, si risolve, e infine si controlla che la soluzione **abbia senso nel contesto**.

Alcune parole chiave guidano la traduzione: "supera" si traduce con $>$, "non supera" con $\le$, "almeno" con $\ge$, "al più" o "al massimo" con $\le$, "meno di" con $<$.

Esempio: *la somma tra il triplo di un numero naturale e $5$ non supera $20$: quali numeri soddisfano la condizione?* Detto $x$ il numero, la condizione si traduce in $3x + 5 \le 20$, cioè $x \le 5$. Poiché $x$ deve essere un numero naturale, le soluzioni accettabili sono $0, 1, 2, 3, 4, 5$: la disequazione dà un intervallo continuo, $x \le 5$, ma il contesto lo restringe a un insieme finito di numeri.

>* Nei problemi, la disequazione risolta dà spesso un intervallo continuo di numeri reali; sono i vincoli del problema (numeri naturali, quantità positive, ecc.) a selezionare, tra questi, i valori che hanno davvero senso.

>! Dimenticare i vincoli nascosti del contesto è l'errore più insidioso: una lunghezza non può essere negativa, un numero di persone non può essere frazionario, anche se l'algebra da sola non lo impedirebbe.` }
  ],

  grafici: {
    intervalliNotazione: {
      tipo: 'retta-reale', x: [-6, 6],
      intervalli: [
        { da: -4, a: -1, chiusoDa: true, chiusoA: true, colore: 1, etichetta: '−4 ≤ x ≤ −1' },
        { da: 0, a: 3, chiusoDa: false, chiusoA: false, colore: 2, etichetta: '0 < x < 3' },
        { da: 4, a: 'inf', chiusoDa: true, colore: 3, etichetta: 'x ≥ 4' }
      ],
      didascalia: 'Tre intervalli con notazioni diverse: chiuso, aperto, illimitato a destra.'
    },
    segnoRetta: {
      tipo: 'piano', x: [-2, 8], y: [-11, 11], passo: [1, 2],
      funzioni: [{ f: '2x-6', etichetta: 'y = 2x − 6', colore: 1 }],
      elementi: [
        { tipo: 'area', f: '2x-6', da: 3, a: 6, etichetta: 'y > 0' },
        { tipo: 'punto', p: [3, 0], etichetta: 'x = 3', posizione: 'basso', colore: 4 }
      ],
      didascalia: 'Dove la retta sta sopra l\'asse x (per x > 3) la disequazione 2x − 6 > 0 è vera.'
    },
    provaValori: {
      tipo: 'piano', x: [-2, 8], y: [-11, 11], passo: [1, 2],
      parametri: [{ nome: 'p', min: -2, max: 8, passo: 0.5, valore: 0, nascosto: true }],
      funzioni: [{ f: '2x-6', etichetta: 'y = 2x − 6', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['p', 0], trascina: true, etichetta: 'x = {{p}}', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-1.8, 9.5], testo: '2p − 6 = {{2*p - 6}}', ancora: 'start' }
      ],
      didascalia: 'Trascina il punto sull\'asse x: quando 2p − 6 è positivo il punto è a destra di 3.'
    },
    cambioVerso: {
      tipo: 'retta-reale', x: [-7, 3],
      intervalli: [{ da: -3, a: 'inf', chiusoDa: false, colore: 1, etichetta: 'x > −3' }],
      punti: [{ x: -3, etichetta: '−3', escluso: true }],
      didascalia: 'Soluzione di −2x < 6: dividendo per −2 il verso cambia, x > −3 (estremo escluso).'
    },
    sistemaIntersezione: {
      tipo: 'retta-reale', x: [-6, 10],
      intervalli: [
        { da: -2, a: 'inf', chiusoDa: false, colore: 1, etichetta: '1ª: x > −2' },
        { da: '-inf', a: 8, chiusoA: true, colore: 2, etichetta: '2ª: x ≤ 8' },
        { da: -2, a: 8, chiusoDa: false, chiusoA: true, colore: 3, etichetta: 'soluzione: −2 < x ≤ 8' }
      ],
      didascalia: 'Le prime due righe mostrano le soluzioni singole; la terza, la loro intersezione.'
    },
    frattaEsclusione: {
      tipo: 'retta-reale', x: [-2, 8],
      intervalli: [
        { da: '-inf', a: 2, chiusoA: true, colore: 1, etichetta: 'x ≤ 2' },
        { da: 4, a: 'inf', chiusoDa: false, colore: 2, etichetta: 'x > 4' }
      ],
      punti: [{ x: 4, etichetta: '4 (c.e.)', escluso: true }],
      didascalia: 'Soluzione di (x − 2)/(x − 4) ≥ 0: x = 4 resta sempre escluso, anche se il verso è "≥".'
    }
  },

  esempi: [
    { titolo: 'Una disequazione semplice', problema: R`Risolvi $2x - 6 > 0$.`, passi: [
      R`Isolo il termine con $x$: $2x > 6$.`,
      R`Divido per $2$, che è positivo: il verso non cambia. $x > 3$.`,
      R`Verifica con un valore della soluzione, $x = 5$: $2 \cdot 5 - 6 = 4 > 0$. ✓ Con $x = 0$ (fuori dalla soluzione): $-6 > 0$ è falso, coerente.`
    ], risultato: R`$x > 3$` },

    { titolo: 'Una disequazione sempre vera', problema: R`Risolvi $2(x + 3) > 2x - 1$.`, passi: [
      R`Svolgo la parentesi: $2x + 6 > 2x - 1$.`,
      R`Porto le $x$ a sinistra: $2x - 2x > -1 - 6$, cioè $0 > -7$.`,
      R`L'incognita è scomparsa e resta un confronto tra numeri **vero**: la disequazione è soddisfatta da ogni $x$.`
    ], risultato: R`Sempre vera: $S = \mathbb{R}$` },

    { titolo: 'Una disequazione mai vera', problema: R`Risolvi $2(x - 1) > 2x + 5$.`, passi: [
      R`Svolgo la parentesi: $2x - 2 > 2x + 5$.`,
      R`Porto le $x$ a sinistra: $2x - 2x > 5 + 2$, cioè $0 > 7$.`,
      R`È un confronto tra numeri **falso**: nessun valore di $x$ può renderlo vero.`
    ], risultato: R`Mai vera: $S = \varnothing$` },

    { titolo: 'Un sistema di disequazioni', problema: R`Risolvi il sistema $\begin{cases} 2x - 3 > -7 \\ -x + 5 \ge -3 \end{cases}$.`, passi: [
      R`Prima disequazione: $2x - 3 > -7 \Rightarrow 2x > -4 \Rightarrow x > -2$.`,
      R`Seconda disequazione: $-x + 5 \ge -3 \Rightarrow -x \ge -8$; dividendo per $-1$ il verso cambia, $x \le 8$.`,
      R`Disegno i due intervalli sulla stessa retta e ne cerco la parte comune: $x > -2$ e $x \le 8$ insieme danno $-2 < x \le 8$.`
    ], risultato: R`$-2 < x \le 8$` },

    { titolo: 'Una disequazione fratta', problema: R`Risolvi $\dfrac{x - 2}{x - 4} \ge 0$.`, passi: [
      R`Numeratore nullo per $x = 2$ (incluso, perché il simbolo è $\ge$); denominatore nullo per $x = 4$ (sempre escluso, condizione di esistenza $x \ne 4$).`,
      R`Tabella dei segni: per $x < 2$ entrambi i fattori sono negativi, frazione positiva. Per $2 < x < 4$ il numeratore è positivo e il denominatore negativo, frazione negativa. Per $x > 4$ entrambi positivi, frazione positiva.`,
      R`La disequazione chiede la frazione $\ge 0$: va bene per $x \le 2$ (frazione positiva o nulla) e per $x > 4$ (frazione positiva), mai per $2 < x \le 4$.`
    ], risultato: R`$x \le 2 \ \lor\ x > 4$` },

    { titolo: 'Un problema', problema: R`La somma tra il triplo di un numero naturale e $5$ non supera $20$. Quali numeri soddisfano la condizione?`, passi: [
      R`**Incognita.** $x$ = il numero naturale cercato.`,
      R`**Traduzione.** "Il triplo di un numero" è $3x$; "non supera $20$" si traduce con $\le$: $3x + 5 \le 20$.`,
      R`**Risoluzione.** $3x \le 15 \Rightarrow x \le 5$.`,
      R`**Senso.** $x$ deve essere naturale: tra tutti i numeri $x \le 5$, quelli naturali sono $0, 1, 2, 3, 4, 5$.`
    ], risultato: R`$x \in \{0, 1, 2, 3, 4, 5\}$` }
  ],

  formulario: [
    { nome: 'Simboli di disuguaglianza', formula: R`a < b, \qquad a > b, \qquad a \le b, \qquad a \ge b, \qquad a \ne b`, nota: R`"Minore", "maggiore", "minore o uguale", "maggiore o uguale", "diverso".` },
    { nome: 'Primo principio di equivalenza', formula: R`a > b \quad\Rightarrow\quad a + c > b + c`, nota: R`Si può sommare o sottrarre lo stesso numero a entrambi i membri: il verso non cambia.` },
    { nome: 'Secondo principio (fattore positivo)', formula: R`a > b, \ \ c > 0 \quad\Rightarrow\quad ac > bc`, nota: R`Moltiplicando o dividendo per un numero positivo il verso resta invariato.` },
    { nome: 'Secondo principio (fattore negativo)', formula: R`a > b, \ \ c < 0 \quad\Rightarrow\quad ac < bc`, nota: R`Moltiplicando o dividendo per un numero negativo il verso si capovolge.` },
    { nome: 'Forma normale', formula: R`ax + b > 0 \quad (\text{oppure } <, \ \le, \ \ge)`, nota: R`Si porta tutto a un membro e si riducono i termini simili.` },
    { nome: 'Soluzione con a positivo', formula: R`ax + b > 0 \ \Rightarrow\ x > -\frac{b}{a} \quad (a > 0)` },
    { nome: 'Soluzione con a negativo', formula: R`ax + b > 0 \ \Rightarrow\ x < -\frac{b}{a} \quad (a < 0)`, nota: R`Dividendo per $a < 0$ il verso cambia.` },
    { nome: 'Casi con a nullo', formula: R`a = 0, \ b > 0 \quad\Rightarrow\quad S = \mathbb{R} \qquad\qquad a = 0, \ b \le 0 \quad\Rightarrow\quad S = \varnothing`, nota: R`Quando $a = 0$ l'incognita scompare: resta un confronto tra numeri, sempre vero o sempre falso.` },
    { nome: 'Notazioni di intervallo', formula: R`(a, b), \quad [a, b], \quad [a, b), \quad (a, b]`, nota: R`Aperto, chiuso, semiaperto a destra, semiaperto a sinistra: la parentesi quadra include l'estremo, quella tonda lo esclude.` },
    { nome: 'Scrittura di un sistema', formula: R`\begin{cases} f(x) > 0 \\ g(x) \ge 0 \end{cases}`, nota: R`La graffa significa "e": entrambe le condizioni devono valere insieme.` },
    { nome: 'Soluzione di un sistema', formula: R`S = S_1 \cap S_2`, nota: R`L'intersezione, non l'unione: un valore deve stare in ogni insieme soluzione.` },
    { nome: 'Disequazione fratta (forma tipo)', formula: R`\frac{N(x)}{D(x)} \ge 0`, nota: R`Si studia il segno di $N(x)$ e di $D(x)$ separatamente con la tabella dei segni: mai moltiplicare per $D(x)$.` },
    { nome: 'Condizione di esistenza', formula: R`D(x) \ne 0`, nota: R`Il valore che annulla il denominatore è sempre escluso dalla soluzione, anche se la disequazione è $\le$ o $\ge$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'disuguaglianze', tipo: 'definizione', fronte: R`Che cos'è una disuguaglianza?`, retro: R`Un confronto tra due espressioni con i simboli $<, \ >, \ \le, \ \ge, \ \ne$.` },
    { id: 'fc-02', sezione: 'disuguaglianze', tipo: 'definizione', fronte: R`Che cos'è una disequazione?`, retro: R`Una disuguaglianza che contiene un'incognita: risolverla vuol dire trovare tutti i valori che la rendono vera.` },
    { id: 'fc-03', sezione: 'disuguaglianze', tipo: 'concetto', fronte: R`Quante soluzioni ha di solito una disequazione?`, retro: R`Di solito infinite, un intero intervallo di numeri: non un valore isolato come in un'equazione.` },
    { id: 'fc-04', sezione: 'intervalli', tipo: 'definizione', fronte: R`Intervallo aperto $(a,b)$`, retro: R`I numeri $x$ con $a < x < b$: gli estremi $a$ e $b$ sono esclusi.` },
    { id: 'fc-05', sezione: 'intervalli', tipo: 'definizione', fronte: R`Intervallo chiuso $[a,b]$`, retro: R`I numeri $x$ con $a \le x \le b$: gli estremi sono inclusi.` },
    { id: 'fc-06', sezione: 'intervalli', tipo: 'concetto', fronte: R`Come si disegna un estremo escluso sulla retta reale?`, retro: R`Con un pallino vuoto; un estremo incluso si disegna con un pallino pieno.` },
    { id: 'fc-07', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Primo principio di equivalenza delle disequazioni`, retro: R`Si può sommare o sottrarre lo stesso numero a entrambi i membri: il verso non cambia.` },
    { id: 'fc-08', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Secondo principio: moltiplicare per un numero positivo`, retro: R`Il verso della disequazione resta invariato.` },
    { id: 'fc-09', sezione: 'principi-equivalenza', tipo: 'concetto', fronte: R`Cosa succede moltiplicando (o dividendo) per un numero negativo?`, retro: R`Il verso della disequazione si capovolge: $>$ diventa $<$ e viceversa.` },
    { id: 'fc-10', sezione: 'disequazioni-intere', tipo: 'procedura', fronte: R`Forma canonica di una disequazione intera`, retro: R`Si porta tutto a un membro e si isola $x$: $ax + b > 0$ (o $<, \ \le, \ \ge$).` },
    { id: 'fc-11', sezione: 'disequazioni-intere', tipo: 'concetto', fronte: R`Disequazione sempre vera`, retro: R`Quando $x$ scompare e resta un confronto tra numeri vero (per esempio $5 > -2$): la soluzione è $\mathbb{R}$.` },
    { id: 'fc-12', sezione: 'disequazioni-intere', tipo: 'concetto', fronte: R`Disequazione mai vera`, retro: R`Quando $x$ scompare e resta un confronto tra numeri falso (per esempio $3 < -1$): la soluzione è $S = \varnothing$.` },
    { id: 'fc-13', sezione: 'sistemi', tipo: 'concetto', fronte: R`Soluzione di un sistema di disequazioni`, retro: R`L'intersezione delle soluzioni delle singole disequazioni: devono valere tutte insieme.` },
    { id: 'fc-14', sezione: 'sistemi', tipo: 'concetto', fronte: R`Quando un sistema non ha soluzione?`, retro: R`Quando gli intervalli delle singole disequazioni non si sovrappongono mai: l'intersezione è $\varnothing$.` },
    { id: 'fc-15', sezione: 'fratte-prodotto', tipo: 'procedura', fronte: R`Passi per una disequazione prodotto`, retro: R`Si trovano gli zeri di ogni fattore, si costruisce la tabella dei segni e si legge il segno del prodotto in ogni intervallo.` },
    { id: 'fc-16', sezione: 'fratte-prodotto', tipo: 'concetto', fronte: R`Perché non si moltiplica mai per il denominatore con l'incognita?`, retro: R`Perché il suo segno non è noto: potrebbe essere negativo e capovolgere il verso senza controllo.` },
    { id: 'fc-17', sezione: 'fratte-prodotto', tipo: 'procedura', fronte: R`Come si risolve una disequazione fratta?`, retro: R`Si porta tutto a un membro come un'unica frazione confrontata con $0$, poi si studia il segno di numeratore e denominatore.` },
    { id: 'fc-18', sezione: 'fratte-prodotto', tipo: 'concetto', fronte: R`Il valore che annulla il denominatore va…`, retro: R`Sempre escluso dalla soluzione, anche quando la disequazione è $\le$ o $\ge$.` },
    { id: 'fc-19', sezione: 'letterali', tipo: 'procedura', fronte: R`Primo passo in una disequazione letterale $kx > c$`, retro: R`Guardare il segno del coefficiente $k$: decide se il verso resta o cambia.` },
    { id: 'fc-20', sezione: 'letterali', tipo: 'concetto', fronte: R`Cosa succede se il coefficiente di $x$ vale $0$?`, retro: R`L'incognita scompare: resta un confronto tra numeri, sempre vero o sempre falso a seconda del parametro.` },
    { id: 'fc-21', sezione: 'problemi', tipo: 'procedura', fronte: R`Come impostare un problema con le disequazioni`, retro: R`Si sceglie l'incognita, si traduce ogni condizione in una disequazione, si risolve e si controllano i vincoli del contesto.` },
    { id: 'fc-22', sezione: 'problemi', tipo: 'concetto', fronte: R`Parole come "non supera" o "almeno"`, retro: R`"Non supera" si traduce con $\le$, "supera" con $>$, "almeno" con $\ge$, "al più" con $\le$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $4x - 7 > 5$.`, suggerimenti: [R`Isola il termine con $x$ sommando $7$ a entrambi i membri.`, R`Dividi per $4$: è positivo, il verso non cambia.`], risposta: { tipo: 'intervallo', da: 3, a: 'inf', chiusoDa: false, chiusoA: false }, soluzione: [R`$4x - 7 > 5 \Rightarrow 4x > 12$.`, R`Divido per $4$ (positivo): $x > 3$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $-3x + 6 \ge 0$.`, suggerimenti: [R`Porta $-3x$ da solo a un membro.`, R`Dividi per $-3$: è negativo, il verso cambia.`], risposta: { tipo: 'intervallo', da: '-inf', a: 2, chiusoDa: false, chiusoA: true }, soluzione: [R`$-3x + 6 \ge 0 \Rightarrow -3x \ge -6$.`, R`Divido per $-3$ (negativo, il verso si capovolge): $x \le 2$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi $2(x - 1) \le 3x + 4$.`, suggerimenti: [R`Svolgi la parentesi a sinistra.`, R`Porta tutte le $x$ da una parte e i numeri dall'altra.`], risposta: { tipo: 'intervallo', da: -6, a: 'inf', chiusoDa: true, chiusoA: false }, soluzione: [R`$2x - 2 \le 3x + 4$.`, R`$2x - 3x \le 4 + 2 \Rightarrow -x \le 6$.`, R`Divido per $-1$ (il verso cambia): $x \ge -6$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi il sistema $\begin{cases} 3x - 1 > 2 \\ 5 - x \ge 1 \end{cases}$.`, suggerimenti: [R`Risolvi le due disequazioni separatamente.`, R`Nella seconda, isolando $x$ dovrai dividere per un numero negativo.`, R`Disegna i due intervalli sulla stessa retta e cerca la parte comune.`], risposta: { tipo: 'intervallo', da: 1, a: 4, chiusoDa: false, chiusoA: true }, soluzione: [R`Prima: $3x - 1 > 2 \Rightarrow 3x > 3 \Rightarrow x > 1$.`, R`Seconda: $5 - x \ge 1 \Rightarrow -x \ge -4$; dividendo per $-1$ (verso capovolto) $x \le 4$.`, R`Intersezione: $1 < x \le 4$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi il sistema $\begin{cases} x > 3 \\ x < -1 \end{cases}$.`, suggerimenti: [R`Le due disequazioni sono già risolte: disegna entrambi gli intervalli sulla stessa retta.`, R`Cerca dove si sovrappongono.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna soluzione', 'insieme vuoto', 'vuoto', '∅', 'nessuna'] }, soluzione: [R`Il primo intervallo è $x > 3$, il secondo $x < -1$: non hanno nessun punto in comune, perché non esiste un numero insieme maggiore di $3$ e minore di $-1$.`, R`Il sistema non ha soluzione: $S = \varnothing$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $(x + 1)(x - 3) < 0$.`, suggerimenti: [R`Trova gli zeri dei due fattori: $-1$ e $3$.`, R`Con il prodotto minore di zero, la soluzione è l'intervallo *tra* le due radici.`], risposta: { tipo: 'intervallo', da: -1, a: 3, chiusoDa: false, chiusoA: false }, soluzione: [R`Zeri dei fattori: $x = -1$ e $x = 3$.`, R`Per $x < -1$ entrambi i fattori sono negativi, prodotto positivo. Per $-1 < x < 3$ i fattori hanno segno discorde, prodotto negativo. Per $x > 3$ entrambi positivi, prodotto positivo.`, R`La disequazione chiede il prodotto negativo: $-1 < x < 3$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\dfrac{x + 1}{x - 2} \le 0$.`, suggerimenti: [R`Zero del numeratore: $x = -1$ (incluso, perché il simbolo è $\le$). Zero del denominatore: $x = 2$ (sempre escluso).`, R`Costruisci la tabella dei segni tra questi due valori.`], risposta: { tipo: 'intervallo', da: -1, a: 2, chiusoDa: true, chiusoA: false }, soluzione: [R`Numeratore nullo in $x = -1$ (incluso), denominatore nullo in $x = 2$ (escluso).`, R`Per $x < -1$: numeratore negativo, denominatore negativo, frazione positiva. Per $-1 < x < 2$: numeratore positivo, denominatore negativo, frazione negativa. Per $x > 2$: entrambi positivi, frazione positiva.`, R`La disequazione chiede $\le 0$: soluzione $-1 \le x < 2$.`] },
    { id: 'es-08', difficolta: 3, testo: R`Risolvi $\dfrac{(x - 1)(x + 2)}{x - 4} \ge 0$.`, suggerimenti: [R`Trova prima gli zeri di ciascun fattore: $x = 1$, $x = -2$ al numeratore, $x = 4$ al denominatore.`, R`Costruisci la tabella dei segni con questi tre valori come confini degli intervalli.`, R`Il denominatore nullo va sempre escluso, anche se il verso è $\ge$: controlla dov'è.`], risposta: { tipo: 'testo', accettate: ['-2<=x<=1 o x>4', '-2≤x≤1 o x>4', 'x>4 o -2<=x<=1', '[-2,1]∪(4,+inf)', '[-2;1]u]4;+inf[', '-2<=x<=1 v x>4'] }, soluzione: [R`Zeri: numeratore in $x = -2$ e $x = 1$ (inclusi), denominatore in $x = 4$ (escluso).`, R`Tabella dei segni: per $x < -2$ il quoziente è negativo; per $-2 < x < 1$ è positivo; per $1 < x < 4$ è negativo; per $x > 4$ è positivo.`, R`La disequazione chiede $\ge 0$: soluzione $-2 \le x \le 1$ oppure $x > 4$, con $x = 4$ sempre escluso.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi al variare del parametro $k$ la disequazione $(k - 2)x \le 3$.`, suggerimenti: [R`Isola $x$ dividendo per il coefficiente $k - 2$: il primo bivio è il suo segno.`, R`Distingui tre casi: $k > 2$, $k < 2$, $k = 2$.`, R`Nel caso $k = 2$ il coefficiente si annulla: che cosa resta dell'incognita?`], soluzione: [R`Se $k > 2$ (cioè $k - 2 > 0$): dividendo per un positivo il verso non cambia, $x \le \dfrac{3}{k - 2}$.`, R`Se $k < 2$ (cioè $k - 2 < 0$): dividendo per un negativo il verso cambia, $x \ge \dfrac{3}{k - 2}$.`, R`Se $k = 2$: il coefficiente è $0$, resta $0 \le 3$, sempre vero: la soluzione è $\mathbb{R}$, qualunque $x$.`] },
    { id: 'es-10', difficolta: 3, testo: R`In un rettangolo la base supera l'altezza di $3\ \text{cm}$. Sapendo che il perimetro non deve superare $46\ \text{cm}$, quali valori può assumere l'altezza?`, suggerimenti: [R`Chiama $x$ l'altezza: la base è $x + 3$.`, R`Il perimetro di un rettangolo è il doppio della somma di base e altezza.`, R`Non dimenticare che anche l'altezza deve essere positiva.`], risposta: { tipo: 'intervallo', da: 0, a: 10, chiusoDa: false, chiusoA: true }, soluzione: [R`Altezza $x$, base $x + 3$. Perimetro: $2(x + (x + 3)) = 4x + 6$.`, R`Condizione: $4x + 6 \le 46$, cioè $4x \le 40$, $x \le 10$.`, R`In più l'altezza deve essere positiva: $x > 0$. Insieme: $0 < x \le 10\ \text{cm}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la differenza tra una disuguaglianza e una disequazione?`, opzioni: [R`Sono esattamente la stessa cosa, solo due nomi diversi`, R`La disuguaglianza contiene sempre un'incognita, la disequazione no`, R`La disequazione contiene un'incognita; una disuguaglianza numerica no`, R`La disuguaglianza vale solo per i numeri negativi`], corretta: 2, spiegazione: R`Una disuguaglianza è un confronto qualunque, anche tra soli numeri (per esempio $3 < 5$); una disequazione contiene un'incognita e risolverla vuol dire trovare i valori che la soddisfano.` },
    { id: 'q-02', domanda: R`Quale operazione capovolge il verso di una disequazione?`, opzioni: [R`Sommare un numero positivo a entrambi i membri`, R`Moltiplicare entrambi i membri per un numero negativo`, R`Moltiplicare entrambi i membri per un numero positivo`, R`Sottrarre lo stesso numero da entrambi i membri`], corretta: 1, spiegazione: R`Moltiplicare o dividere per un numero negativo inverte l'ordine tra i due membri: se $a > b$ e $c < 0$, allora $ac < bc$. Sommare, sottrarre, o moltiplicare per un positivo, non cambia mai il verso.` },
    { id: 'q-03', domanda: R`Risolvendo $3x - 2 > 3x + 5$ si trova $-2 > 5$, che è falso. Che cosa significa?`, opzioni: [R`La disequazione è impossibile: nessun $x$ la soddisfa`, R`La disequazione è sempre vera per ogni $x$`, R`Serve la formula risolutiva per continuare`, R`C'è un errore: bisogna cambiare verso`], corretta: 0, spiegazione: R`Quando $x$ si elide e resta un confronto falso tra numeri, nessun valore di $x$ può rendere vera la disequazione: la soluzione è l'insieme vuoto.` },
    { id: 'q-04', domanda: R`Qual è la soluzione di un sistema di due disequazioni?`, opzioni: [R`L'unione delle due soluzioni`, R`La somma delle due soluzioni`, R`La soluzione della prima disequazione soltanto`, R`L'intersezione delle due soluzioni`], corretta: 3, spiegazione: R`In un sistema le condizioni valgono "e" non "o": la soluzione è l'insieme dei valori che stanno in entrambi gli intervalli, cioè la loro intersezione.` },
    { id: 'q-05', domanda: R`Perché non si moltiplicano mai entrambi i membri di una disequazione fratta per il denominatore che contiene $x$?`, opzioni: [R`Perché il segno del denominatore non è noto a priori, e potrebbe capovolgere il verso`, R`Perché il denominatore potrebbe essere zero e annullare l'equazione`, R`Perché moltiplicare cambia il grado della disequazione`, R`Non è vietato: si può sempre fare`], corretta: 0, spiegazione: R`Il denominatore, contenendo $x$, può essere positivo o negativo a seconda del valore di $x$: moltiplicare per esso senza saperne il segno può capovolgere (o no) il verso senza controllo.` },
    { id: 'q-06', domanda: R`Nella disequazione fratta $\dfrac{x - 1}{x - 3} \ge 0$, il valore $x = 3$…`, opzioni: [R`È sempre accettabile, perché il simbolo è $\ge$`, R`Va incluso solo se $x = 1$ non è soluzione`, R`Rende la disequazione sempre vera`, R`Va sempre escluso, perché annulla il denominatore`], corretta: 3, spiegazione: R`Il denominatore non può mai annullarsi: $x = 3$ è escluso a prescindere dal simbolo di confronto, anche se questo è $\ge$.` },
    { id: 'q-07', domanda: R`Come si trova il segno di un prodotto di più fattori lineari in un intervallo?`, opzioni: [R`Si somma il segno di ciascun fattore`, R`Basta guardare il segno del primo fattore`, R`Si moltiplicano i segni dei singoli fattori`, R`Dipende solo dal segno di $x$`], corretta: 2, spiegazione: R`Il segno di un prodotto (o di un quoziente) è il prodotto dei segni: un numero pari di fattori negativi dà un risultato positivo, uno dispari un risultato negativo.` },
    { id: 'q-08', domanda: R`Quale delle seguenti rappresenta l'intervallo $-2 \le x < 5$?`, opzioni: [R`$(-2, 5)$`, R`$[-2, 5]$`, R`$[-2, 5)$`, R`$(-2, 5]$`], corretta: 2, spiegazione: R`La parentesi quadra a sinistra indica che $-2$ è incluso; la tonda a destra indica che $5$ è escluso: è proprio $[-2, 5)$.` },
    { id: 'q-09', domanda: R`In una disequazione letterale $kx > 3$, qual è il primo passo della discussione?`, opzioni: [R`Stabilire il segno del coefficiente $k$`, R`Calcolare il discriminante`, R`Porre $k = 0$ e basta`, R`Sostituire $x = 0$`], corretta: 0, spiegazione: R`Dividere per $k$ richiede di sapere se $k$ è positivo, negativo o nullo: da questo dipende se il verso resta com'è, si capovolge, oppure $x$ scompare del tutto.` },
    { id: 'q-10', domanda: R`Se in una disequazione letterale il coefficiente di $x$ è esattamente $0$…`, opzioni: [R`La disequazione ha sempre infinite soluzioni`, R`L'incognita scompare: resta un confronto tra numeri`, R`Bisogna comunque dividere per $0$`, R`Il verso si capovolge sempre`], corretta: 1, spiegazione: R`Con coefficiente nullo il termine in $x$ sparisce: resta solo un confronto tra numeri, sempre vero (soluzione $\mathbb{R}$) oppure sempre falso (nessuna soluzione), indipendentemente da $x$.` },
    { id: 'q-11', domanda: R`Come si traduce in simboli la frase "il doppio di un numero non supera 10"?`, opzioni: [R`$2x < 10$`, R`$2x \ge 10$`, R`$2x > 10$`, R`$2x \le 10$`], corretta: 3, spiegazione: R`"Non supera" significa "è minore o uguale": la traduzione corretta è $2x \le 10$, che include anche il caso $2x = 10$.` },
    { id: 'q-12', domanda: R`Un sistema di due disequazioni ha soluzioni $x > 4$ e $x < 1$. Qual è la soluzione del sistema?`, opzioni: [R`$x > 4$`, R`Nessun numero: l'insieme vuoto`, R`Tutti i numeri reali`, R`$x < 1$`], corretta: 1, spiegazione: R`Nessun numero può essere contemporaneamente maggiore di $4$ e minore di $1$: gli intervalli non si intersecano, la soluzione è vuota.` },
    { id: 'q-13', domanda: R`Quale affermazione sulla disequazione prodotto $(x - 2)(x + 1) < 0$ è corretta?`, opzioni: [R`È verificata per $x$ compreso tra le due radici, $-1$ e $2$`, R`È verificata per $x$ esterno all'intervallo tra le radici`, R`Non ha soluzioni`, R`È verificata per ogni $x$`], corretta: 0, spiegazione: R`Con due fattori di primo grado e prodotto minore di zero, la soluzione è l'intervallo aperto tra le due radici, dove i due fattori hanno segno discorde.` },
    { id: 'q-14', domanda: R`In un problema che chiede quante magliette al massimo si possono comprare con un budget fissato, la disequazione risolta dà $x \le 7,3$. Quante magliette si possono comprare?`, opzioni: [R`$7,3$, arrotondando`, R`$8$, arrotondando per eccesso`, R`$7$, il più grande intero che soddisfa la condizione`, R`$0$, perché la soluzione non è intera`], corretta: 2, spiegazione: R`Il numero di magliette è un intero, e deve rispettare $x \le 7,3$: il valore accettabile più alto è $7$, non $8$ (che supererebbe il budget) né un numero decimale.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Dimenticare di cambiare verso quando si moltiplica o divide per un numero negativo: è l'errore più comune di tutto l'argomento.` },
    { tipo: 'trucco', testo: R`Se puoi, porta l'incognita dalla parte in cui il suo coefficiente resta positivo: eviti del tutto il rischio di sbagliare il cambio di verso.` },
    { tipo: 'metodo', testo: R`In un sistema, risolvi ogni disequazione separatamente, poi disegna tutti gli intervalli sulla stessa retta reale: l'intersezione si vede a colpo d'occhio.` },
    { tipo: 'errore', testo: R`Nelle disequazioni fratte, moltiplicare per il denominatore con l'incognita senza conoscerne il segno: porta a soluzioni sbagliate o incomplete.` },
    { tipo: 'trucco', testo: R`Per una disequazione fratta o prodotto, porta sempre tutto a un membro confrontandolo con $0$: mai lasciare l'incognita sparsa sui due lati.` },
    { tipo: 'errore', testo: R`Dimenticare di escludere dal risultato il valore che annulla il denominatore, anche quando il simbolo è $\le$ o $\ge$.` },
    { tipo: 'metodo', testo: R`Nella tabella dei segni, il segno del prodotto (o del quoziente) in ogni intervallo si trova moltiplicando i segni dei singoli fattori.` },
    { tipo: 'trucco', testo: R`Prima di calcolare in una disequazione letterale, chiediti subito che segno ha il coefficiente di $x$: è il primo bivio della discussione.` },
    { tipo: 'errore', testo: R`In un problema, dimenticare i vincoli nascosti del contesto (lunghezze positive, numeri naturali, ecc.), che restringono ulteriormente la soluzione trovata con l'algebra.` }
  ],

  aneddoti: [
    { matematico: 'Thomas Harriot', anni: 'circa 1560–1621', titolo: 'I segni del confronto, nati per caso', testo: R`Thomas Harriot fu una delle menti più versatili dell'Inghilterra elisabettiana: matematico, astronomo, linguista, esploratore. Nel 1585 accompagnò la spedizione di Walter Raleigh nella colonia di Roanoke, in America, dove studiò la lingua degli Algonchini e fu tra i primi europei a descrivere il tabacco. Tornato in patria si dedicò all'algebra, cercando una notazione più snella di quella dei suoi contemporanei. Era estremamente riservato e non pubblicò quasi nulla in vita: i suoi manoscritti restarono per anni in un baule. Solo dieci anni dopo la sua morte, nel 1631, alcuni amici curarono la stampa dell'opera *Artis Analyticae Praxis*, dove compaiono per la prima volta i simboli $<$ e $>$ per "minore" e "maggiore": due parentesi appuntite, pensate apposta per mostrare a colpo d'occhio quale dei due numeri fosse più grande.`, legame: R`I simboli $<$ e $>$ che si usano in ogni disequazione non sono una convenzione qualunque: nacquero apposta per mostrare visivamente quale numero è maggiore.` },
    { matematico: 'Pierre Bouguer', anni: '1698–1758', titolo: 'Una lineetta in più, sotto il segno', testo: R`Pierre Bouguer fu un prodigio: a soli 15 anni ereditò dal padre la cattedra di idrografia a Le Croisic, in Bretagna, e la tenne da adolescente. Da adulto fu tra i protagonisti della spedizione geodetica francese in Perù (1735-1744), organizzata per misurare la lunghezza di un grado di meridiano vicino all'equatore e stabilire se la Terra fosse schiacciata ai poli o all'equatore (aveva ragione Newton: ai poli). Il suo nome resta legato anche a un dettaglio più piccolo, ma quotidiano: nel 1734 propose di aggiungere una lineetta sotto i segni $<$ e $>$ di Harriot, per indicare "o uguale". Nacquero così $\le$ e $\ge$, oggi indispensabili in ogni disequazione con estremo incluso.`, legame: R`Ogni volta che si scrive $\le$ o $\ge$ per includere un estremo, si usa l'aggiunta di Bouguer ai segni di Harriot.` },
    { matematico: 'Nicolas Bourbaki (pseudonimo collettivo)', anni: 'fondato nel 1935', titolo: 'Il matematico francese che non è mai esistito', testo: R`Negli anni '30 un gruppo di giovani matematici francesi, delusi dai manuali universitari che trovavano superati, decise di scrivere da capo un trattato rigoroso di tutta la matematica moderna. Per firmarlo inventarono un autore che non esisteva: Nicolas Bourbaki, un nome preso in prestito, si racconta, da un generale francese dell'Ottocento, buono per uno scherzo tra studenti. Dietro lo pseudonimo si nascondevano matematici come André Weil e Henri Cartan, che si riunivano in congressi per discutere ogni riga del trattato. Fu il gruppo Bourbaki a fissare molte notazioni oggi date per scontate, come le parentesi quadre "rovesciate" $]a, b[$ per un intervallo aperto, al posto delle tonde $(a, b)$: lo stesso significato, scritto in un modo che in Francia, e in molti libri italiani, è rimasto lo standard.`, legame: R`La notazione con le parentesi quadre rovesciate per gli intervalli aperti, che si trova in molti libri italiani, viene proprio dal gruppo Bourbaki.` },
    { matematico: 'Diofanto di Alessandria', anni: 'III secolo d.C. (date esatte incerte)', titolo: 'Le soluzioni che Diofanto chiamava assurde', testo: R`Diofanto di Alessandria scrisse l'*Arithmetica*, una raccolta di problemi che sarebbe servita da modello per secoli (Fermat annotò il suo "ultimo teorema" proprio a margine di una pagina di Diofanto). Diofanto lavorava solo con numeri positivi: per lui i numeri esistevano per contare quantità reali, lunghezze, monete, ed erano gli unici ammissibili. Quando un problema portava a una soluzione negativa, non la scartava in silenzio: la definiva esplicitamente "átopos", assurda, impossibile da accettare. Ci vollero secoli, passando per l'India, dove Brahmagupta chiamava i numeri negativi "debiti" invece di respingerli, perché diventassero cittadini a pieno titolo dell'algebra, con regole precise sul loro segno.`, legame: R`La regola per cui moltiplicare per un numero negativo capovolge il verso di una disequazione presuppone di accettare i numeri negativi: una battaglia che Diofanto, per primo, aveva già perso in partenza.` }
  ]
});
})();
