(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'integrali',
  titolo: 'Integrali',

  introduzione: R`Derivare è un'operazione meccanica: si applicano le regole e si arriva alla derivata. Integrare è l'operazione inversa, e assomiglia di più a un'indagine: nota la velocità, ricostruire la posizione; nota la pendenza in ogni punto, ricostruire la curva. Il calcolo integrale nasce però anche da un problema molto più antico, la misura di aree e volumi. La scoperta che i due problemi — invertire la derivata e calcolare un'area — sono lo *stesso* problema è uno dei momenti più importanti della storia della matematica.

Gli integrali compaiono ovunque qualcosa si accumuli: lo spazio percorso da un'auto di cui si conosce la velocità istante per istante, il lavoro di una forza che cambia lungo il percorso, l'acqua entrata in una vasca, la carica accumulata da un condensatore, il volume di un solido ottenuto facendo girare una curva attorno a un asse. Anche la probabilità di una variabile continua è un'area: quella sotto la curva a campana.

Per seguire bene serve derivare con sicurezza — verificare un integrale significa derivare il risultato e confrontarlo con la funzione di partenza — e conoscere i limiti; per le funzioni razionali fratte serve saper scomporre un polinomio.`,

  sezioni: [
    { id: 'primitive', titolo: 'Primitive e integrale indefinito', testo: R`Il problema di partenza è questo: data $f$, trovare una funzione la cui derivata sia $f$.

>* Una funzione $F$ è una **primitiva** di $f$ in un intervallo $I$ se $F'(x) = f(x)$ per ogni $x \in I$.

Per esempio $F(x) = x^3$ è una primitiva di $f(x) = 3x^2$, perché $D(x^3) = 3x^2$. Ma lo sono anche $x^3 + 5$ e $x^3 - \sqrt{2}$: la derivata di una costante è nulla, quindi aggiungendo un numero la derivata non cambia. Le primitive non sono mai una sola.

Vale anche il viceversa, ed è una conseguenza del teorema di Lagrange: **in un intervallo**, due primitive della stessa funzione differiscono per una costante. Quindi conoscerne una significa conoscerle tutte.

>* L'**integrale indefinito** di $f$ è l'insieme di tutte le sue primitive: $$\int f(x)\,dx = F(x) + c \quad \text{con } F'(x) = f(x).$$ Il numero $c$ si chiama **costante di integrazione**, $f$ è la **funzione integranda**.

Il simbolo $dx$ non è decorativo: dice rispetto a quale variabile si integra, e sarà essenziale nella sostituzione.

Dalle regole di derivazione della somma e del prodotto per una costante segue la **linearità**:

$$\int \big[\alpha f(x) + \beta g(x)\big]\,dx = \alpha \int f(x)\,dx + \beta \int g(x)\,dx.$$

Esempio: $\int (6x^2 - 4x + 5)\,dx = 2x^3 - 2x^2 + 5x + c$. Si controlla derivando: $D(2x^3 - 2x^2 + 5x + c) = 6x^2 - 4x + 5$. ✓

>! Due errori da evitare. Il primo è dimenticare $+c$: senza, la risposta è una primitiva, non l'integrale indefinito. Il secondo è inventare una "regola del prodotto": $\int f\,g\,dx$ **non** è $\int f\,dx \cdot \int g\,dx$. La linearità vale per somme e costanti, non per prodotti e quozienti.` },

    { id: 'immediati', titolo: 'Integrali immediati e quasi immediati', testo: R`Ogni regola di derivazione, letta al contrario, dà un integrale. Questa tabella va saputa a memoria.

| $f(x)$ | $\int f(x)\,dx$ |
|---|---|
| $x^\alpha$, con $\alpha \ne -1$ | $\dfrac{x^{\alpha+1}}{\alpha+1} + c$ |
| $\dfrac{1}{x}$ | $\ln \lvert x \rvert + c$ |
| $e^x$ | $e^x + c$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + c$ |
| $\sin x$ | $-\cos x + c$ |
| $\cos x$ | $\sin x + c$ |
| $\dfrac{1}{\cos^2 x}$ | $\tan x + c$ |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + c$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x + c$ |

La prima riga copre più di quanto sembri: $\int \sqrt{x}\,dx = \int x^{1/2}\,dx = \dfrac{2}{3}x^{3/2} + c$ e $\int \dfrac{1}{x^2}\,dx = \int x^{-2}\,dx = -\dfrac{1}{x} + c$.

### Quasi immediati

Se al posto di $x$ compare una funzione $f(x)$ **moltiplicata per la propria derivata**, la formula resta valida con $f(x)$ al posto di $x$: è la regola della catena letta al contrario.

$$\int [f(x)]^\alpha f'(x)\,dx = \frac{[f(x)]^{\alpha+1}}{\alpha+1} + c \qquad \int \frac{f'(x)}{f(x)}\,dx = \ln \lvert f(x) \rvert + c$$

$$\int e^{f(x)} f'(x)\,dx = e^{f(x)} + c \qquad \int f'(x)\cos f(x)\,dx = \sin f(x) + c$$

Spesso la derivata c'è quasi: manca solo un fattore numerico, che si aggiusta con la linearità. Per esempio in $\int \dfrac{x}{x^2+3}\,dx$ la derivata del denominatore è $2x$ e al numeratore c'è $x$: si moltiplica e si divide per $2$,

$$\int \frac{x}{x^2+3}\,dx = \frac{1}{2}\int \frac{2x}{x^2+3}\,dx = \frac{1}{2}\ln(x^2+3) + c.$$

Allo stesso modo $\int x(x^2+1)^4\,dx = \dfrac{1}{2}\cdot\dfrac{(x^2+1)^5}{5} + c = \dfrac{(x^2+1)^5}{10} + c$.

>! Si può aggiustare solo con **costanti**. Moltiplicare e dividere per $x$ non è lecito: $\int e^{x^2}dx \ne \frac{1}{2x}e^{x^2}$. Altro classico: $\int \sin(2x)\,dx = -\frac{1}{2}\cos(2x) + c$, non $-\cos(2x)$; il fattore $\frac{1}{2}$ compensa la derivata interna.` },

    { id: 'sostituzione', titolo: 'Integrazione per sostituzione', testo: R`Quando l'aggiustamento a occhio non basta, si cambia variabile.

>* Posto $t = g(x)$, si ha $dt = g'(x)\,dx$: si riscrive **tutto** l'integrale in $t$ (integranda e $dx$), si calcola, e alla fine si torna a $x$ sostituendo $t = g(x)$.

Esempio: $\int x\sqrt{x^2+1}\,dx$. Si pone $t = x^2+1$, quindi $dt = 2x\,dx$, cioè $x\,dx = \dfrac{dt}{2}$. L'integrale diventa

$$\frac{1}{2}\int \sqrt{t}\,dt = \frac{1}{2}\cdot\frac{2}{3}t^{3/2} + c = \frac{1}{3}\sqrt{(x^2+1)^3} + c.$$

Esempio: $\int \dfrac{1}{x \ln x}\,dx$ con $t = \ln x$ e $dt = \dfrac{dx}{x}$ diventa $\int \dfrac{dt}{t} = \ln \lvert t \rvert + c = \ln \lvert \ln x \rvert + c$.

La sostituzione può anche andare nell'altro verso, $x = \varphi(t)$ con $dx = \varphi'(t)\,dt$: serve per togliere una radice. In $\int \sqrt{1-x^2}\,dx$ si pone $x = \sin t$, così $\sqrt{1-x^2} = \cos t$ e $dx = \cos t\,dt$.

### Negli integrali definiti

Se l'integrale ha gli estremi, conviene **cambiare anche quelli** ed evitare il ritorno a $x$: se $t = g(x)$, gli estremi diventano $g(a)$ e $g(b)$.

$$\int_0^1 x e^{x^2}dx \;\overset{t = x^2}{=}\; \frac{1}{2}\int_0^1 e^t\,dt = \frac{e-1}{2}.$$

>! Il $dx$ va sempre sostituito: dimenticarlo è l'errore più frequente. E se si cambiano gli estremi non si deve tornare alla variabile $x$: i nuovi estremi si riferiscono a $t$.` },

    { id: 'per-parti', titolo: 'Integrazione per parti', testo: R`Serve quando l'integranda è un **prodotto** di funzioni di tipo diverso. Nasce dalla derivata del prodotto: da $D[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$, integrando entrambi i membri e isolando un pezzo, si ottiene

>* **Formula di integrazione per parti:** $$\int f(x)\,g'(x)\,dx = f(x)\,g(x) - \int f'(x)\,g(x)\,dx$$ $f$ si chiama **fattore finito** (si deriva), $g'$ **fattore differenziale** (si integra).

La formula non risolve l'integrale: lo trasforma in un altro. Conviene solo se il nuovo è più facile, e questo dipende dalla scelta.

Regola pratica: come fattore **finito** si prende ciò che *si semplifica derivando* — un logaritmo, un'arcotangente, un polinomio; come fattore **differenziale** ciò che *si integra facilmente* — $e^x$, $\sin x$, $\cos x$.

Esempio: $\int x e^x dx$. Con $f = x$ e $g' = e^x$ si ha $f' = 1$, $g = e^x$:
$$\int x e^x dx = x e^x - \int e^x dx = e^x(x-1) + c.$$

Esempio: $\int \ln x\,dx$. Qui il prodotto non si vede, ma c'è: $\ln x \cdot 1$. Si prende $f = \ln x$ e $g' = 1$, quindi $g = x$:
$$\int \ln x\,dx = x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - x + c.$$

Talvolta l'integrale di partenza ricompare a destra e si ricava come un'incognita: applicando due volte la formula a $\int e^x \sin x\,dx$ si arriva a $I = e^x(\sin x - \cos x) - I$, da cui $I = \dfrac{e^x(\sin x - \cos x)}{2} + c$.

Per un integrale definito: $\int_a^b f g'\,dx = \big[f g\big]_a^b - \int_a^b f' g\,dx$.

>! Scelta sbagliata, integrale peggiore. In $\int x e^x dx$, prendendo $f = e^x$ e $g' = x$ si ottiene $\frac{x^2}{2}e^x - \int \frac{x^2}{2}e^x dx$: il grado è salito, si è andati indietro.` },

    { id: 'razionali-fratte', titolo: 'Funzioni razionali fratte', testo: R`Si vuole integrare $\dfrac{N(x)}{D(x)}$, rapporto di due polinomi. Il metodo dipende dal grado del denominatore, ma il primo passo è sempre lo stesso: **se il grado di $N$ è maggiore o uguale a quello di $D$ si esegue la divisione**, ottenendo un polinomio più un resto di grado minore.

### Denominatore di primo grado

Dopo la divisione resta una costante fratta. Esempio: $\int \dfrac{2x+1}{x-3}\,dx$. Poiché $2x+1 = 2(x-3)+7$,
$$\int \left(2 + \frac{7}{x-3}\right)dx = 2x + 7\ln \lvert x-3 \rvert + c.$$

### Denominatore di secondo grado, $\Delta > 0$

Il denominatore si scompone in $a(x-x_1)(x-x_2)$ e la frazione si spezza in **fratti semplici**. Esempio: $\int \dfrac{x+3}{x^2-x-2}\,dx$. Si scrive $x^2-x-2 = (x-2)(x+1)$ e si cercano $A$ e $B$ tali che
$$\frac{x+3}{(x-2)(x+1)} = \frac{A}{x-2} + \frac{B}{x+1} \;\Longrightarrow\; A(x+1) + B(x-2) = x+3.$$
Ponendo $x=2$ si trova $3A = 5$, ponendo $x=-1$ si trova $-3B = 2$: quindi $A = \dfrac{5}{3}$, $B = -\dfrac{2}{3}$ e l'integrale vale $\dfrac{5}{3}\ln \lvert x-2 \rvert - \dfrac{2}{3}\ln \lvert x+1 \rvert + c$.

### Denominatore con $\Delta = 0$

C'è una radice doppia: $D(x) = a(x-x_1)^2$. Si riscrive il numeratore rispetto a $x - x_1$. Esempio: $\int \dfrac{x+1}{(x-2)^2}\,dx$; poiché $x+1 = (x-2)+3$,
$$\int \left(\frac{1}{x-2} + \frac{3}{(x-2)^2}\right)dx = \ln \lvert x-2 \rvert - \frac{3}{x-2} + c.$$

### Denominatore con $\Delta < 0$

Il denominatore non si scompone: si completa il quadrato e si arriva all'arcotangente. Esempio: $x^2+2x+5 = (x+1)^2 + 4$, quindi
$$\int \frac{dx}{x^2+2x+5} = \int \frac{dx}{(x+1)^2+4} = \frac{1}{2}\arctan\frac{x+1}{2} + c,$$
perché $\int \dfrac{du}{u^2+k^2} = \dfrac{1}{k}\arctan\dfrac{u}{k} + c$. Se al numeratore c'è anche un termine in $x$, lo si separa: la parte proporzionale a $D'(x)$ dà un logaritmo, il resto dà l'arcotangente.

>! Con $\Delta < 0$ il denominatore è sempre positivo (o sempre negativo): nel logaritmo che eventualmente compare **non serve** il valore assoluto, e soprattutto non si può scomporre in fratti semplici reali.` },

    { id: 'definito', titolo: 'L\'integrale definito e le somme di Riemann', testo: R`Il secondo problema, storicamente il primo: quanto vale l'area della regione compresa fra il grafico di $f$, l'asse $x$ e le rette $x=a$, $x=b$?

L'idea è approssimarla con rettangoli. Si divide $[a,b]$ in $n$ parti uguali di ampiezza $\Delta x = \dfrac{b-a}{n}$; su ogni parte si costruisce un rettangolo che sta *sotto* la curva e uno che le sta *sopra*, e si sommano le aree: si ottengono la **somma inferiore** $s_n$ e la **somma superiore** $S_n$, con $s_n \le \text{area} \le S_n$. Aumentando $n$ i rettangoli si assottigliano e le due somme si stringono l'una sull'altra.

[[animazione:riemann]]

>* Se $s_n$ e $S_n$ tendono allo stesso numero, $f$ si dice **integrabile** in $[a,b]$ e quel numero è l'**integrale definito** $$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i)\,\Delta x.$$

Ogni funzione continua in un intervallo chiuso e limitato è integrabile (lo sono anche quelle limitate con un numero finito di discontinuità). Attenzione alla differenza: l'integrale **indefinito** è una famiglia di funzioni, l'integrale **definito** è un **numero**, e non porta la costante $c$.

Dalla definizione seguono le proprietà, tutte ragionevoli se si pensa alle aree:

1. $\int_a^a f(x)\,dx = 0$;
2. $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ (scambiare gli estremi cambia il segno);
3. linearità: $\int_a^b [\alpha f + \beta g]\,dx = \alpha\int_a^b f\,dx + \beta\int_a^b g\,dx$;
4. additività: $\int_a^b f\,dx = \int_a^c f\,dx + \int_c^b f\,dx$, per ogni $c$;
5. se $f(x) \le g(x)$ in $[a,b]$, allora $\int_a^b f\,dx \le \int_a^b g\,dx$.

>! La variabile di integrazione è **muta**: $\int_a^b f(x)\,dx$ e $\int_a^b f(t)\,dt$ sono lo stesso numero. Nel risultato non può comparire la $x$.` },

    { id: 'teorema-fondamentale', titolo: 'Funzione integrale e teorema fondamentale', testo: R`Fissato l'estremo sinistro $a$ e lasciando libero quello destro si ottiene una funzione: a ogni $x$ si associa l'area accumulata da $a$ fino a $x$.

>* **Funzione integrale:** $$F(x) = \int_a^x f(t)\,dt.$$ La variabile di integrazione si chiama $t$ perché $x$ è già usata come estremo.

[[animazione:integrale-accumulo]]

Il fatto sorprendente è che questa funzione, costruita con le aree, ha per derivata la funzione di partenza.

>* **Teorema fondamentale del calcolo integrale (Torricelli–Barrow).** Se $f$ è continua in $[a,b]$, la funzione integrale $F$ è derivabile e $$F'(x) = f(x) \quad \text{per ogni } x \in [a,b].$$

L'idea della dimostrazione sta nel disegno: passando da $x$ a $x+h$ l'area cresce di una striscia sottile, alta circa $f(x)$ e larga $h$, quindi $\dfrac{F(x+h)-F(x)}{h} \approx f(x)$; al limite si ha l'uguaglianza. Il teorema dice anche una cosa importante di per sé: **ogni funzione continua ammette primitive**, e una di esse è proprio la sua funzione integrale.

Da qui segue la formula che si usa per calcolare: se $G$ è una qualunque primitiva di $f$,

>* **Formula fondamentale (Leibniz–Newton):** $$\int_a^b f(x)\,dx = \big[G(x)\big]_a^b = G(b) - G(a).$$

La costante non serve: se si usasse $G(x)+c$, nella differenza si semplificherebbe.

Esempio: $\int_1^2 3x^2\,dx = \big[x^3\big]_1^2 = 8 - 1 = 7$.

Nel grafico, l'area sotto $y = x^2$ da $0$ a $b$ vale $\left[\dfrac{x^3}{3}\right]_0^b = \dfrac{b^3}{3}$: muovi il cursore e confronta il numero con la regione colorata.

[[grafico:accumulo]]

> Se l'estremo superiore è a sua volta una funzione, si compone: $D\!\left[\int_a^{g(x)} f(t)\,dt\right] = f(g(x))\cdot g'(x)$.` },

    { id: 'aree', titolo: 'Aree con il segno e valore medio', testo: R`L'integrale definito non è l'area: è un'area **con il segno**. Dove $f(x) \ge 0$ i contributi sono positivi, dove $f(x) \le 0$ sono negativi.

$$\int_0^{2\pi} \sin x\,dx = \big[-\cos x\big]_0^{2\pi} = -1 + 1 = 0,$$

eppure la regione fra la sinusoide e l'asse $x$ esiste eccome: le due gobbe hanno area $2$ ciascuna e si annullano a vicenda.

[[grafico:segno-seno]]

>* Per l'**area** della regione si spezza l'intervallo negli intervalli in cui $f$ ha segno costante e si sommano i valori assoluti: qui $A = \lvert 2 \rvert + \lvert -2 \rvert = 4$.

### Area fra due curve

Se $f(x) \ge g(x)$ in $[a,b]$, la regione compresa fra i due grafici ha area

>* $$A = \int_a^b \big[f(x) - g(x)\big]\,dx \qquad (f \text{ sopra}, \ g \text{ sotto})$$

Gli estremi $a$ e $b$ sono di solito le ascisse dei punti di intersezione. La formula vale anche se le curve stanno sotto l'asse $x$: conta solo *quale* sta sopra l'altra. Esempio: la retta $y = x+2$ e la parabola $y = x^2$ si incontrano dove $x^2 = x+2$, cioè in $x=-1$ e $x=2$; nel mezzo la retta sta sopra, quindi

$$A = \int_{-1}^{2} (x + 2 - x^2)\,dx = \left[\frac{x^2}{2} + 2x - \frac{x^3}{3}\right]_{-1}^{2} = \frac{10}{3} + \frac{7}{6} = \frac{9}{2}.$$

[[grafico:fra-curve]]

### Valore medio

>* **Teorema della media.** Se $f$ è continua in $[a,b]$ esiste almeno un $c \in [a,b]$ tale che $$f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx.$$

Il numero $f(c)$ è il **valor medio** di $f$: è l'altezza del rettangolo di base $b-a$ che ha la stessa area della regione sotto la curva. Per esempio la velocità media di un'auto è il valor medio della velocità istantanea.

>! Chiedere "l'area" e chiedere "l'integrale" non è la stessa cosa quando la funzione cambia segno. Se il testo dice *area*, si studia prima il segno.` },

    { id: 'volumi-impropri', titolo: 'Volumi di rotazione e integrali impropri', testo: R`### Solidi di rotazione

Facendo ruotare di un giro completo attorno all'asse $x$ la regione sotto il grafico di $f$ fra $a$ e $b$ si ottiene un solido. Tagliandolo con un piano perpendicolare all'asse in un punto $x$ si vede un cerchio di raggio $f(x)$, quindi di area $\pi [f(x)]^2$: sommando questi dischi infinitamente sottili,

>* **Volume del solido di rotazione attorno all'asse $x$:** $$V = \pi \int_a^b [f(x)]^2\,dx.$$

Esempio: ruotando $y = \sqrt{x}$ per $0 \le x \le 4$ si ottiene $V = \pi\int_0^4 x\,dx = \pi\left[\dfrac{x^2}{2}\right]_0^4 = 8\pi$. La formula si può collaudare su un caso noto: la retta $y = \dfrac{r}{h}x$ fra $0$ e $h$ genera un cono, e infatti $V = \pi\int_0^h \dfrac{r^2}{h^2}x^2 dx = \dfrac{1}{3}\pi r^2 h$.

[[grafico:rotazione]]

### Integrali impropri

L'integrale definito è stato costruito su un intervallo limitato e per funzioni limitate. Quando una delle due condizioni cade si passa al limite.

**Intervallo illimitato:** $\displaystyle\int_a^{+\infty} f(x)\,dx = \lim_{b \to +\infty}\int_a^{b} f(x)\,dx$. Se il limite è finito l'integrale **converge**, altrimenti **diverge**.

$$\int_1^{+\infty}\frac{dx}{x^2} = \lim_{b \to +\infty}\left[-\frac{1}{x}\right]_1^{b} = \lim_{b \to +\infty}\left(1 - \frac{1}{b}\right) = 1.$$

Una regione lunga infinita, di area finita: nel grafico si vede il numero avvicinarsi a $1$ mentre $b$ cresce.

[[grafico:improprio]]

Cambiando poco l'esponente il risultato si ribalta: $\int_1^{+\infty}\dfrac{dx}{x} = \lim_{b \to +\infty}\ln b = +\infty$, l'integrale diverge.

**Funzione illimitata:** se $f$ ha un asintoto verticale in un estremo ci si avvicina con un limite. Per esempio $\int_0^1 \dfrac{dx}{\sqrt{x}} = \lim_{\varepsilon \to 0^+}\big[2\sqrt{x}\big]_\varepsilon^1 = 2$: anche qui area finita.

>! Non si può scrivere $\big[-\frac{1}{x}\big]_1^{+\infty}$ sostituendo $+\infty$ come se fosse un numero. Si calcola l'integrale con l'estremo $b$ finito e **poi** si fa il limite.` },

  ],

  grafici: {
    accumulo: {
      tipo: 'piano', x: [-0.6, 3.4], y: [-1.5, 10.5],
      funzioni: [{ f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [-0.6, 3.3] }],
      elementi: [
        { tipo: 'area', f: 'x^2', da: 0, a: 'b' },
        { tipo: 'verticale', x: 'b', tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [0.1, 9.6], testo: 'area = {{b^3/3}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'b', min: 0, max: 3, passo: 0.1, valore: 2, etichetta: 'b' }],
      didascalia: 'L\'area accumulata sotto y = x² da 0 a b vale b³/3: è la funzione integrale, e la sua derivata è di nuovo x².'
    },
    'fra-curve': {
      tipo: 'piano', x: [-2.5, 3.5], y: [-1, 5.5],
      funzioni: [
        { f: 'x + 2', etichetta: 'y = x + 2', colore: 1 },
        { f: 'x^2', etichetta: 'y = x²', colore: 2 }
      ],
      elementi: [
        { tipo: 'area', f: 'x + 2', g: 'x^2', da: -1, a: 2 },
        { tipo: 'punto', p: [-1, 1], etichetta: 'A(−1; 1)', posizione: 'sinistra' },
        { tipo: 'punto', p: [2, 4], etichetta: 'B(2; 4)', posizione: 'alto-sinistra' }
      ],
      didascalia: 'Fra x = −1 e x = 2 la retta sta sopra la parabola: l\'area vale ∫(x + 2 − x²)dx = 9/2.'
    },
    'segno-seno': {
      tipo: 'piano', x: [-0.4, 6.7], y: [-1.5, 1.5], passo: [1, 0.5],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1 }],
      elementi: [
        { tipo: 'area', f: 'sin(x)', da: 0, a: 3.1416 },
        { tipo: 'area', f: 'sin(x)', da: 3.1416, a: 6.2832, colore: 2 },
        { tipo: 'testo', p: [1.5, 0.35], testo: '+2' },
        { tipo: 'testo', p: [4.7, -0.35], testo: '−2' }
      ],
      didascalia: 'Su [0; 2π] l\'integrale del seno vale 0, perché le due gobbe hanno segno opposto; l\'area della regione è invece 4.'
    },
    improprio: {
      tipo: 'piano', x: [0, 6.5], y: [-0.2, 1.35], passo: [1, 0.25],
      funzioni: [{ f: '1/x^2', etichetta: 'y = 1/x²', colore: 1, dominio: [0.85, 6.5] }],
      elementi: [
        { tipo: 'area', f: '1/x^2', da: 1, a: 'b' },
        { tipo: 'verticale', x: 'b', tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [2.3, 1.1], testo: 'area da 1 a b = {{1 - 1/b}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'b', min: 1, max: 6, passo: 0.1, valore: 3, etichetta: 'b' }],
      didascalia: 'Più b cresce, più l\'area si avvicina a 1 senza superarlo: l\'integrale improprio converge.'
    },
    rotazione: {
      tipo: 'piano', x: [-0.6, 4.6], y: [-2.4, 2.4], proporzioni: 'uguali',
      funzioni: [
        { f: 'sqrt(x)', etichetta: 'y = √x', colore: 1, dominio: [0, 4] },
        { f: '-sqrt(x)', etichetta: 'y = −√x', colore: 1, tratteggio: true, dominio: [0, 4] }
      ],
      elementi: [
        { tipo: 'area', f: 'sqrt(x)', g: '-sqrt(x)', da: 0, a: 4 },
        { tipo: 'verticale', x: 4, tratteggio: true, colore: 2 },
        { tipo: 'testo', p: [1.2, 1.6], testo: 'V = π∫x dx = 8π', ancora: 'start' }
      ],
      didascalia: 'Il profilo y = √x e il suo simmetrico y = −√x: ruotando attorno all\'asse x si ottiene un solido di volume 8π.'
    }
  },

  esempi: [
    { titolo: 'Integrale indefinito immediato', problema: R`Calcola $\displaystyle\int \left(2x^3 + \frac{3}{x} - 5\sin x\right)dx$.`, passi: [
      R`Per la linearità l'integrale si spezza in tre e le costanti escono: $2\int x^3 dx + 3\int \dfrac{1}{x}dx - 5\int \sin x\,dx$.`,
      R`Con la regola della potenza, $\int x^3 dx = \dfrac{x^4}{4}$, quindi il primo pezzo dà $\dfrac{x^4}{2}$.`,
      R`Poi $\int \dfrac{1}{x}dx = \ln \lvert x \rvert$ (il valore assoluto serve perché il logaritmo vuole argomento positivo) e $\int \sin x\,dx = -\cos x$, che con il $-5$ davanti diventa $+5\cos x$.`,
      R`Si somma tutto e si aggiunge un'unica costante. Verifica: derivando $\dfrac{x^4}{2} + 3\ln \lvert x \rvert + 5\cos x$ si ottiene $2x^3 + \dfrac{3}{x} - 5\sin x$. ✓`
    ], risultato: R`$\dfrac{x^4}{2} + 3\ln \lvert x \rvert + 5\cos x + c$` },

    { titolo: 'Per sostituzione', problema: R`Calcola $\displaystyle\int \frac{e^{\sqrt{x}}}{\sqrt{x}}\,dx$.`, passi: [
      R`La parte "difficile" è $\sqrt{x}$ dentro l'esponenziale: si pone $t = \sqrt{x}$.`,
      R`Si differenzia: $dt = \dfrac{1}{2\sqrt{x}}dx$, cioè $\dfrac{dx}{\sqrt{x}} = 2\,dt$. Fortuna (non casuale): nell'integranda c'è esattamente $\dfrac{dx}{\sqrt{x}}$.`,
      R`L'integrale diventa $\int e^t \cdot 2\,dt = 2e^t + c$.`,
      R`Si torna alla variabile di partenza: $t = \sqrt{x}$. Verifica: $D\!\left(2e^{\sqrt{x}}\right) = 2e^{\sqrt{x}}\cdot\dfrac{1}{2\sqrt{x}} = \dfrac{e^{\sqrt{x}}}{\sqrt{x}}$. ✓`
    ], risultato: R`$2e^{\sqrt{x}} + c$` },

    { titolo: 'Per parti', problema: R`Calcola $\displaystyle\int x\ln x\,dx$.`, passi: [
      R`È un prodotto di un logaritmo e di un polinomio: si integra per parti. Il logaritmo si semplifica derivando, quindi si sceglie $f(x) = \ln x$ come fattore finito e $g'(x) = x$ come fattore differenziale.`,
      R`Allora $f'(x) = \dfrac{1}{x}$ e $g(x) = \dfrac{x^2}{2}$.`,
      R`Formula: $\int x\ln x\,dx = \dfrac{x^2}{2}\ln x - \int \dfrac{x^2}{2}\cdot\dfrac{1}{x}\,dx = \dfrac{x^2}{2}\ln x - \dfrac{1}{2}\int x\,dx$.`,
      R`L'integrale rimasto è immediato: $\dfrac{1}{2}\cdot\dfrac{x^2}{2} = \dfrac{x^2}{4}$.`,
      R`Con la scelta opposta ($f = x$, $g' = \ln x$) bisognerebbe già saper integrare $\ln x$: sarebbe un passo indietro.`
    ], risultato: R`$\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + c$` },

    { titolo: 'Funzione razionale fratta con Δ > 0', problema: R`Calcola $\displaystyle\int \frac{x+3}{x^2-x-2}\,dx$.`, passi: [
      R`Il numeratore ha grado minore del denominatore: non serve la divisione.`,
      R`Si scompone il denominatore: $x^2-x-2 = (x-2)(x+1)$, perché le radici sono $2$ e $-1$.`,
      R`Si cercano due fratti semplici: $\dfrac{x+3}{(x-2)(x+1)} = \dfrac{A}{x-2} + \dfrac{B}{x+1}$, da cui $A(x+1)+B(x-2) = x+3$.`,
      R`Si assegnano a $x$ i valori che azzerano un fattore: con $x=2$ si ha $3A = 5$, cioè $A = \dfrac{5}{3}$; con $x=-1$ si ha $-3B = 2$, cioè $B = -\dfrac{2}{3}$.`,
      R`Ogni pezzo è del tipo $\dfrac{f'}{f}$ a meno di costanti: $\dfrac{5}{3}\ln \lvert x-2 \rvert - \dfrac{2}{3}\ln \lvert x+1 \rvert + c$.`
    ], risultato: R`$\dfrac{5}{3}\ln \lvert x-2 \rvert - \dfrac{2}{3}\ln \lvert x+1 \rvert + c$` },

    { titolo: 'Un integrale definito', problema: R`Calcola $\displaystyle\int_0^2 (4 - x^2)\,dx$ e interpreta il risultato.`, passi: [
      R`Si cerca una primitiva qualsiasi: $G(x) = 4x - \dfrac{x^3}{3}$.`,
      R`Formula fondamentale: $\int_0^2 (4-x^2)dx = \big[4x - \frac{x^3}{3}\big]_0^2 = G(2) - G(0)$.`,
      R`$G(2) = 8 - \dfrac{8}{3} = \dfrac{16}{3}$ e $G(0) = 0$.`,
      R`In $[0;2]$ la parabola $y = 4-x^2$ sta sopra l'asse $x$, quindi il numero trovato è proprio l'area della regione: circa $5{,}33$.`
    ], risultato: R`$\dfrac{16}{3}$` },

    { titolo: 'Un volume di rotazione', problema: R`La regione sotto $y = \sqrt{x}$, con $0 \le x \le 4$, ruota di un giro completo attorno all'asse $x$. Calcola il volume del solido.`, passi: [
      R`La sezione perpendicolare all'asse in $x$ è un cerchio di raggio $f(x) = \sqrt{x}$, quindi di area $\pi (\sqrt{x})^2 = \pi x$.`,
      R`Formula: $V = \pi\int_0^4 \left(\sqrt{x}\right)^2 dx = \pi\int_0^4 x\,dx$. Elevare al quadrato ha fatto sparire la radice: è il motivo per cui questi integrali sono spesso facili.`,
      R`$\pi\left[\dfrac{x^2}{2}\right]_0^4 = \pi\left(8 - 0\right) = 8\pi$.`,
      R`Controllo di ordine di grandezza: il solido sta dentro il cilindro di raggio $2$ e altezza $4$, che ha volume $16\pi$. Il risultato $8\pi$ è esattamente la metà: plausibile.`
    ], risultato: R`$V = 8\pi \approx 25{,}13$` }
  ],

  formulario: [
    { nome: 'Integrale indefinito', formula: R`\int f(x)\,dx = F(x) + c \iff F'(x) = f(x)`, nota: R`Vale in un **intervallo**: lì due primitive differiscono solo per una costante.` },
    { nome: 'Linearità', formula: R`\int [\alpha f(x) + \beta g(x)]\,dx = \alpha\!\int\! f(x)\,dx + \beta\!\int\! g(x)\,dx`, nota: R`Non esiste nulla di simile per prodotti e quozienti.` },
    { nome: 'Integrale di una potenza', formula: R`\int x^{\alpha}\,dx = \frac{x^{\alpha+1}}{\alpha+1} + c \quad (\alpha \ne -1)`, nota: R`Il caso escluso è $\alpha = -1$: $\int \dfrac{1}{x}\,dx = \ln \lvert x \rvert + c$.` },
    { nome: 'Esponenziali', formula: R`\int e^{x}\,dx = e^{x} + c, \qquad \int a^{x}\,dx = \frac{a^{x}}{\ln a} + c` },
    { nome: 'Goniometrici immediati', formula: R`\int \sin x\,dx = -\cos x + c, \qquad \int \cos x\,dx = \sin x + c`, nota: R`Attenzione al segno: è il seno che, integrato, cambia segno.` },
    { nome: 'Che danno tangente e arcotangente', formula: R`\int \frac{dx}{\cos^2 x} = \tan x + c, \qquad \int \frac{dx}{1+x^2} = \arctan x + c` },
    { nome: 'Integrali quasi immediati', formula: R`\int [f(x)]^{\alpha} f'(x)\,dx = \frac{[f(x)]^{\alpha+1}}{\alpha+1} + c, \qquad \int \frac{f'(x)}{f(x)}\,dx = \ln \lvert f(x) \rvert + c`, nota: R`Se manca solo un fattore numerico, si aggiusta moltiplicando e dividendo per una **costante**.` },
    { nome: 'Integrazione per parti', formula: R`\int f(x)\,g'(x)\,dx = f(x)\,g(x) - \int f'(x)\,g(x)\,dx`, nota: R`Fattore finito $f$ (si deriva): logaritmi, arcotangenti, polinomi. Fattore differenziale $g'$ (si integra): $e^x$, $\sin x$, $\cos x$.` },
    { nome: 'Integrazione per sostituzione', formula: R`\int f(g(x))\,g'(x)\,dx = \int f(t)\,dt \quad \text{con } t = g(x),\ dt = g'(x)\,dx`, nota: R`Negli integrali definiti gli estremi diventano $g(a)$ e $g(b)$, e non si torna alla variabile $x$.` },
    { nome: 'Formula fondamentale (Leibniz–Newton)', formula: R`\int_a^b f(x)\,dx = \big[G(x)\big]_a^b = G(b) - G(a)`, nota: R`$G$ è una primitiva **qualunque** di $f$: la costante si semplifica nella differenza.` },
    { nome: 'Derivata della funzione integrale', formula: R`\frac{d}{dx}\int_a^x f(t)\,dt = f(x)`, nota: R`Teorema di Torricelli–Barrow, con $f$ continua. Con estremo $g(x)$ si moltiplica per $g'(x)$.` },
    { nome: 'Area fra due curve', formula: R`A = \int_a^b \big[f(x) - g(x)\big]\,dx`, nota: R`Con $f$ sopra e $g$ sotto in tutto $[a;b]$; $a$ e $b$ sono di solito le ascisse delle intersezioni.` },
    { nome: 'Valor medio', formula: R`f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx`, nota: R`Teorema della media: con $f$ continua un tale $c \in [a;b]$ esiste sempre.` },
    { nome: 'Volume di rotazione attorno all\'asse x', formula: R`V = \pi \int_a^b [f(x)]^2\,dx` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'primitive', tipo: 'definizione', fronte: R`Primitiva di una funzione`, retro: R`$F$ è una primitiva di $f$ in un intervallo se $F'(x) = f(x)$ in ogni punto dell'intervallo.` },
    { id: 'fc-02', sezione: 'primitive', tipo: 'concetto', fronte: R`Quante primitive ha una funzione?`, retro: R`Infinite: in un intervallo, due primitive della stessa funzione differiscono per una costante.` },
    { id: 'fc-03', sezione: 'primitive', tipo: 'formula', fronte: R`Linearità dell'integrale`, retro: R`$\int [\alpha f + \beta g]\,dx = \alpha\int f\,dx + \beta\int g\,dx$. Non vale per prodotti né per quozienti.` },
    { id: 'fc-04', sezione: 'immediati', tipo: 'formula', fronte: R`$\int x^\alpha\,dx$`, retro: R`$\dfrac{x^{\alpha+1}}{\alpha+1} + c$, per $\alpha \ne -1$. Per $\alpha = -1$ si ha $\ln \lvert x \rvert + c$.` },
    { id: 'fc-05', sezione: 'immediati', tipo: 'formula', fronte: R`$\int \sin x\,dx$ e $\int \cos x\,dx$`, retro: R`$-\cos x + c$ e $\sin x + c$.` },
    { id: 'fc-06', sezione: 'immediati', tipo: 'formula', fronte: R`$\int \dfrac{f'(x)}{f(x)}\,dx$`, retro: R`$\ln \lvert f(x) \rvert + c$.` },
    { id: 'fc-07', sezione: 'immediati', tipo: 'procedura', fronte: R`Come si riconosce un integrale quasi immediato?`, retro: R`Dentro l'integranda compare una funzione insieme alla sua derivata, a meno di un fattore numerico che si aggiusta con la linearità.` },
    { id: 'fc-08', sezione: 'sostituzione', tipo: 'procedura', fronte: R`Passi dell'integrazione per sostituzione`, retro: R`1) Si pone $t = g(x)$. 2) Si calcola $dt = g'(x)\,dx$. 3) Si riscrive tutto in $t$, $dx$ compreso. 4) Si integra e si torna a $x$.` },
    { id: 'fc-09', sezione: 'sostituzione', tipo: 'concetto', fronte: R`Sostituzione in un integrale definito`, retro: R`Si cambiano anche gli estremi: da $a$ e $b$ si passa a $g(a)$ e $g(b)$, e non si torna alla variabile $x$.` },
    { id: 'fc-10', sezione: 'per-parti', tipo: 'formula', fronte: R`Formula di integrazione per parti`, retro: R`$\int f\,g'\,dx = f\,g - \int f'\,g\,dx$.` },
    { id: 'fc-11', sezione: 'per-parti', tipo: 'procedura', fronte: R`Come si scelgono fattore finito e differenziale?`, retro: R`Finito ($f$, da derivare): ciò che si semplifica, come $\ln x$, $\arctan x$, un polinomio. Differenziale ($g'$, da integrare): $e^x$, $\sin x$, $\cos x$.` },
    { id: 'fc-12', sezione: 'per-parti', tipo: 'formula', fronte: R`$\int \ln x\,dx$`, retro: R`$x\ln x - x + c$: per parti con $f = \ln x$ e $g' = 1$.` },
    { id: 'fc-13', sezione: 'razionali-fratte', tipo: 'procedura', fronte: R`Primo passo con una funzione razionale fratta`, retro: R`Confrontare i gradi: se quello del numeratore è $\ge$ di quello del denominatore, si esegue la divisione fra polinomi.` },
    { id: 'fc-14', sezione: 'razionali-fratte', tipo: 'procedura', fronte: R`Denominatore di secondo grado con $\Delta > 0$`, retro: R`Si scompone in $(x-x_1)(x-x_2)$ e si decompone in fratti semplici $\dfrac{A}{x-x_1} + \dfrac{B}{x-x_2}$: il risultato è una somma di logaritmi.` },
    { id: 'fc-15', sezione: 'razionali-fratte', tipo: 'procedura', fronte: R`Denominatore di secondo grado con $\Delta < 0$`, retro: R`Si completa il quadrato: $\int \dfrac{du}{u^2+k^2} = \dfrac{1}{k}\arctan\dfrac{u}{k} + c$. Nel risultato compare un'arcotangente.` },
    { id: 'fc-16', sezione: 'definito', tipo: 'definizione', fronte: R`Integrale definito`, retro: R`Il limite comune delle somme inferiori e superiori dei rettangoli quando la loro base tende a zero: $\int_a^b f(x)\,dx$. È un **numero**.` },
    { id: 'fc-17', sezione: 'definito', tipo: 'concetto', fronte: R`Quali funzioni sono integrabili in $[a;b]$?`, retro: R`Tutte le continue; più in generale le limitate con un numero finito di punti di discontinuità.` },
    { id: 'fc-18', sezione: 'definito', tipo: 'formula', fronte: R`Additività rispetto all'intervallo`, retro: R`$\int_a^b f\,dx = \int_a^c f\,dx + \int_c^b f\,dx$. Inoltre $\int_b^a f\,dx = -\int_a^b f\,dx$.` },
    { id: 'fc-19', sezione: 'teorema-fondamentale', tipo: 'definizione', fronte: R`Funzione integrale`, retro: R`$F(x) = \int_a^x f(t)\,dt$: l'area con segno accumulata da $a$ fino a $x$.` },
    { id: 'fc-20', sezione: 'teorema-fondamentale', tipo: 'concetto', fronte: R`Teorema fondamentale del calcolo integrale`, retro: R`Se $f$ è continua, la funzione integrale è derivabile e $F'(x) = f(x)$. Quindi ogni funzione continua ha primitive.` },
    { id: 'fc-21', sezione: 'teorema-fondamentale', tipo: 'formula', fronte: R`Formula di Leibniz–Newton`, retro: R`$\int_a^b f(x)\,dx = G(b) - G(a)$, con $G$ primitiva qualunque di $f$.` },
    { id: 'fc-22', sezione: 'aree', tipo: 'concetto', fronte: R`Integrale definito e area: che differenza c'è?`, retro: R`L'integrale è un'area **con segno**: dove $f < 0$ conta negativamente. Per l'area si spezza l'intervallo e si sommano i valori assoluti.` },
    { id: 'fc-23', sezione: 'aree', tipo: 'formula', fronte: R`Valor medio di $f$ in $[a;b]$`, retro: R`$\dfrac{1}{b-a}\int_a^b f(x)\,dx$: l'altezza del rettangolo di base $b-a$ con la stessa area.` },
    { id: 'fc-24', sezione: 'volumi-impropri', tipo: 'formula', fronte: R`Volume di un solido di rotazione attorno all'asse $x$`, retro: R`$V = \pi\int_a^b [f(x)]^2\,dx$: ogni sezione è un cerchio di raggio $f(x)$.` },
    { id: 'fc-25', sezione: 'volumi-impropri', tipo: 'definizione', fronte: R`Integrale improprio su intervallo illimitato`, retro: R`$\int_a^{+\infty} f\,dx = \lim_{b \to +\infty}\int_a^b f\,dx$. Converge se il limite è finito, altrimenti diverge.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $\displaystyle\int (3x^2 - 4x + 1)\,dx$.`, suggerimenti: [R`Spezza con la linearità e integra un termine alla volta.`, R`Ogni potenza aumenta di uno l'esponente e si divide per il nuovo esponente.`], risposta: { tipo: 'testo', accettate: ['x^3-2x^2+x+c', 'x³-2x²+x+c', 'x^3 - 2x^2 + x + c', 'x^3-2x^2+x'] }, soluzione: [R`$\int 3x^2 dx = 3\cdot\dfrac{x^3}{3} = x^3$.`, R`$\int -4x\,dx = -4\cdot\dfrac{x^2}{2} = -2x^2$, e $\int 1\,dx = x$.`, R`Risultato: $x^3 - 2x^2 + x + c$. Verifica derivando: $3x^2 - 4x + 1$. ✓`] },

    { id: 'es-02', difficolta: 1, testo: R`Calcola $\displaystyle\int \frac{2}{x^3}\,dx$.`, suggerimenti: [R`Riscrivi la frazione come potenza con esponente negativo.`, R`$\dfrac{2}{x^3} = 2x^{-3}$: ora è la regola della potenza con $\alpha = -3$.`], risposta: { tipo: 'testo', accettate: ['-1/x^2+c', '-1/x²+c', '-x^-2+c', '-1/x^2 + c', '-(1/x^2)+c'] }, soluzione: [R`$\dfrac{2}{x^3} = 2x^{-3}$.`, R`$\int 2x^{-3}dx = 2\cdot\dfrac{x^{-2}}{-2} = -x^{-2} = -\dfrac{1}{x^2}$.`, R`Verifica: $D\!\left(-x^{-2}\right) = 2x^{-3} = \dfrac{2}{x^3}$. ✓`] },

    { id: 'es-03', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^1 (x^2 + 1)\,dx$.`, suggerimenti: [R`Trova una primitiva e usa la formula fondamentale.`, R`Una primitiva è $\dfrac{x^3}{3} + x$.`], risposta: { tipo: 'numero', valore: 1.3333, tolleranza: 0.01 }, soluzione: [R`Primitiva: $G(x) = \dfrac{x^3}{3} + x$.`, R`$G(1) - G(0) = \left(\dfrac{1}{3} + 1\right) - 0 = \dfrac{4}{3}$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Calcola $\displaystyle\int_0^{\pi/2} \cos x\,dx$.`, suggerimenti: [R`La primitiva del coseno è il seno.`, R`Ricorda che $\sin\dfrac{\pi}{2} = 1$ e $\sin 0 = 0$.`], risposta: { tipo: 'numero', valore: 1, tolleranza: 0.01 }, soluzione: [R`$\big[\sin x\big]_0^{\pi/2} = \sin\dfrac{\pi}{2} - \sin 0 = 1 - 0 = 1$.`, R`Il risultato è positivo perché in $\left[0;\dfrac{\pi}{2}\right]$ il coseno è positivo: è l'area sotto la curva.`] },

    { id: 'es-05', difficolta: 2, testo: R`Calcola $\displaystyle\int \frac{x}{x^2+4}\,dx$.`, suggerimenti: [R`Guarda la derivata del denominatore.`, R`$D(x^2+4) = 2x$: al numeratore c'è $x$, manca solo il fattore $2$.`], risposta: { tipo: 'testo', accettate: ['1/2ln(x^2+4)+c', '(1/2)ln(x^2+4)+c', 'ln(x^2+4)/2+c', '1/2*ln(x^2+4)+c', '0.5ln(x^2+4)+c'] }, soluzione: [R`Si moltiplica e si divide per $2$: $\dfrac{1}{2}\displaystyle\int \dfrac{2x}{x^2+4}\,dx$.`, R`Ora è della forma $\dfrac{f'}{f}$, quindi si ottiene $\dfrac{1}{2}\ln(x^2+4) + c$.`, R`Il valore assoluto non serve: $x^2+4$ è sempre positivo.`] },

    { id: 'es-06', difficolta: 2, testo: R`Calcola $\displaystyle\int_0^{\pi} x\sin x\,dx$.`, suggerimenti: [R`Prodotto fra un polinomio e una funzione goniometrica: integrazione per parti.`, R`Prendi $f(x) = x$ come fattore finito e $g'(x) = \sin x$ come differenziale, così $g(x) = -\cos x$.`], risposta: { tipo: 'numero', valore: 3.1416, tolleranza: 0.01 }, soluzione: [R`Per parti: $\int_0^\pi x\sin x\,dx = \big[-x\cos x\big]_0^{\pi} + \int_0^{\pi}\cos x\,dx$.`, R`Primo pezzo: $-\pi\cos\pi + 0 = -\pi(-1) = \pi$.`, R`Secondo pezzo: $\big[\sin x\big]_0^\pi = 0$.`, R`Totale: $\pi \approx 3{,}14$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Calcola l'area della regione compresa fra la parabola $y = x^2$ e la retta $y = x$.`, suggerimenti: [R`Prima trova le ascisse dei punti di intersezione.`, R`$x^2 = x$ dà $x = 0$ e $x = 1$; fra questi valori la retta sta sopra.`], risposta: { tipo: 'numero', valore: 0.16667, tolleranza: 0.005 }, soluzione: [R`Intersezioni: $x^2 = x \Rightarrow x(x-1) = 0$, cioè $x = 0$ e $x = 1$.`, R`In $[0;1]$ si ha $x \ge x^2$, quindi $A = \displaystyle\int_0^1 (x - x^2)\,dx$.`, R`$\left[\dfrac{x^2}{2} - \dfrac{x^3}{3}\right]_0^1 = \dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6} \approx 0{,}167$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Calcola l'**area** della regione compresa fra la curva $y = x^3$, l'asse $x$ e le rette $x = -1$ e $x = 1$.`, suggerimenti: [R`Attenzione: è chiesta l'area, non l'integrale. Studia il segno di $x^3$.`, R`In $[-1;0]$ la curva sta sotto l'asse: quel pezzo va preso in valore assoluto.`, R`Per simmetria i due pezzi hanno la stessa area.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`$\displaystyle\int_{-1}^{0} x^3 dx = \left[\dfrac{x^4}{4}\right]_{-1}^{0} = 0 - \dfrac{1}{4} = -\dfrac{1}{4}$: negativo, quindi quell'area vale $\dfrac{1}{4}$.`, R`$\displaystyle\int_{0}^{1} x^3 dx = \dfrac{1}{4}$.`, R`Area totale: $\dfrac{1}{4} + \dfrac{1}{4} = \dfrac{1}{2}$. L'integrale su $[-1;1]$ invece vale $0$, perché la funzione è dispari.`] },

    { id: 'es-09', difficolta: 2, testo: R`Calcola $\displaystyle\int \frac{2x+3}{x^2+x-2}\,dx$.`, suggerimenti: [R`Il grado del numeratore è minore: scomponi subito il denominatore.`, R`$x^2+x-2 = (x+2)(x-1)$: cerca $A$ e $B$ con $\dfrac{A}{x+2} + \dfrac{B}{x-1}$.`], soluzione: [R`$x^2+x-2 = (x+2)(x-1)$, perché le radici sono $-2$ e $1$.`, R`Si impone $A(x-1) + B(x+2) = 2x+3$.`, R`Con $x = 1$: $3B = 5$, cioè $B = \dfrac{5}{3}$. Con $x = -2$: $-3A = -1$, cioè $A = \dfrac{1}{3}$.`, R`Risultato: $\dfrac{1}{3}\ln \lvert x+2 \rvert + \dfrac{5}{3}\ln \lvert x-1 \rvert + c$.`] },

    { id: 'es-10', difficolta: 3, testo: R`La regione delimitata da $y = x^2$, dall'asse $x$ e dalla retta $x = 2$ ruota di un giro completo attorno all'asse $x$. Calcola il volume del solido ottenuto.`, suggerimenti: [R`Usa $V = \pi\int_a^b [f(x)]^2 dx$, con $a = 0$ e $b = 2$.`, R`Il quadrato di $x^2$ è $x^4$.`], risposta: { tipo: 'numero', valore: 20.106, tolleranza: 0.05 }, soluzione: [R`$V = \pi\displaystyle\int_0^2 (x^2)^2 dx = \pi\int_0^2 x^4 dx$.`, R`$\pi\left[\dfrac{x^5}{5}\right]_0^2 = \pi\cdot\dfrac{32}{5} = \dfrac{32\pi}{5}$.`, R`Numericamente $\dfrac{32\pi}{5} \approx 20{,}11$. Controllo: il solido è contenuto nel cilindro di raggio $4$ e altezza $2$, di volume $32\pi$: il risultato è minore, come deve essere.`] },

    { id: 'es-11', difficolta: 3, testo: R`Stabilisci se $\displaystyle\int_1^{+\infty} \frac{dx}{x^3}$ converge e, in caso affermativo, calcolane il valore.`, suggerimenti: [R`Sostituisci $+\infty$ con un estremo $b$ finito, integra, e solo alla fine fai il limite.`, R`Una primitiva di $x^{-3}$ è $-\dfrac{1}{2x^2}$.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.01 }, soluzione: [R`$\displaystyle\int_1^{b} x^{-3} dx = \left[-\dfrac{1}{2x^2}\right]_1^{b} = -\dfrac{1}{2b^2} + \dfrac{1}{2}$.`, R`$\lim_{b \to +\infty}\left(\dfrac{1}{2} - \dfrac{1}{2b^2}\right) = \dfrac{1}{2}$: il limite è finito, quindi l'integrale **converge**.`, R`Valore: $\dfrac{1}{2}$. Con $\dfrac{1}{x}$ al posto di $\dfrac{1}{x^3}$ l'integrale divergerebbe.`] },

    { id: 'es-12', difficolta: 3, testo: R`Sia $F(x) = \displaystyle\int_0^x (t^2 - 4t)\,dt$. Determina l'ascissa del punto di minimo di $F$ nell'intervallo $[0; 5]$.`, suggerimenti: [R`Non serve calcolare $F$: serve la sua derivata.`, R`Per il teorema fondamentale $F'(x) = x^2 - 4x$.`, R`Studia il segno di $x(x-4)$ in $[0;5]$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.01 }, soluzione: [R`Per il teorema fondamentale del calcolo integrale $F'(x) = x^2 - 4x = x(x-4)$.`, R`In $[0;5]$: $F' < 0$ per $0 < x < 4$ (la funzione integrale scende), $F' > 0$ per $x > 4$ (risale).`, R`Il minimo è in $x = 4$. Vale $F(4) = \left[\dfrac{t^3}{3} - 2t^2\right]_0^4 = \dfrac{64}{3} - 32 = -\dfrac{32}{3}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Se $F$ è una primitiva di $f$ in un intervallo, tutte le primitive di $f$ in quell'intervallo sono…`, opzioni: [R`$F(x) + c$, con $c$ costante reale`, R`$c \cdot F(x)$, con $c$ costante reale`, R`solo $F(x)$`, R`$F(x) + kx$, con $k$ costante reale`], corretta: 0, spiegazione: R`Aggiungere una costante non cambia la derivata, e per il teorema di Lagrange non c'è altro modo di ottenere la stessa derivata in un intervallo. Moltiplicare per $c$ o aggiungere $kx$ cambierebbe la derivata.` },
    { id: 'q-02', domanda: R`L'integrale indefinito di una funzione è…`, opzioni: [R`un numero`, R`una famiglia di funzioni`, R`una sola funzione`, R`la derivata della funzione`], corretta: 1, spiegazione: R`$\int f\,dx = F(x) + c$ rappresenta tutte le primitive. Un numero è invece l'integrale **definito**; la derivata è l'operazione inversa.` },
    { id: 'q-03', domanda: R`La formula $\int x^\alpha dx = \dfrac{x^{\alpha+1}}{\alpha+1} + c$ vale…`, opzioni: [R`per ogni $\alpha$ reale`, R`solo per $\alpha$ intero positivo`, R`per ogni $\alpha \ne -1$`, R`solo per $\alpha > 0$`], corretta: 2, spiegazione: R`Con $\alpha = -1$ il denominatore $\alpha+1$ sarebbe nullo: quel caso dà $\ln \lvert x \rvert + c$. Per tutti gli altri esponenti, anche negativi o frazionari, la formula funziona.` },
    { id: 'q-04', domanda: R`Quale delle seguenti uguaglianze è **vera** per ogni coppia di funzioni integrabili?`, opzioni: [R`$\int f\,g\,dx = \int f\,dx \cdot \int g\,dx$`, R`$\int \dfrac{f}{g}\,dx = \dfrac{\int f\,dx}{\int g\,dx}$`, R`$\int f^2 dx = \left(\int f\,dx\right)^2$`, R`$\int (f + g)\,dx = \int f\,dx + \int g\,dx$`], corretta: 3, spiegazione: R`L'integrale è **lineare**: rispetta somme e prodotti per costanti. Non esiste invece alcuna regola per il prodotto, il quoziente o la potenza di due funzioni.` },
    { id: 'q-05', domanda: R`Nella sostituzione $t = g(x)$, che cosa va sostituito oltre alla funzione integranda?`, opzioni: [R`niente altro`, R`il differenziale $dx$, tramite $dt = g'(x)\,dx$`, R`soltanto il segno dell'integrale`, R`la costante di integrazione`], corretta: 1, spiegazione: R`Se resta un $dx$ nell'integrale scritto in $t$, il calcolo è privo di senso. Dimenticare di trasformare $dx$ è l'errore più comune del metodo.` },
    { id: 'q-06', domanda: R`In un integrale definito risolto per sostituzione, se si cambiano anche gli estremi…`, opzioni: [R`bisogna comunque tornare alla variabile $x$ alla fine`, R`non occorre tornare alla variabile $x$`, R`il risultato cambia segno`, R`l'integrale diventa indefinito`], corretta: 1, spiegazione: R`I nuovi estremi $g(a)$ e $g(b)$ si riferiscono a $t$: si calcola direttamente in $t$. Tornare a $x$ tenendo i nuovi estremi sarebbe un errore grave.` },
    { id: 'q-07', domanda: R`Per calcolare $\int \ln x\,dx$ per parti, la scelta corretta è…`, opzioni: [R`$f(x) = \ln x$ e $g'(x) = 1$`, R`$f(x) = 1$ e $g'(x) = \ln x$`, R`$f(x) = x$ e $g'(x) = \ln x$`, R`per parti non è applicabile, manca il prodotto`], corretta: 0, spiegazione: R`Si scrive $\ln x = \ln x \cdot 1$: il logaritmo si deriva (diventa $\frac{1}{x}$) e $1$ si integra (diventa $x$). Le altre scelte richiederebbero di saper già integrare $\ln x$, cioè il problema di partenza.` },
    { id: 'q-08', domanda: R`Integrando $\dfrac{N(x)}{D(x)}$ con $N$ di grado $3$ e $D$ di grado $2$, la prima cosa da fare è…`, opzioni: [R`scomporre il denominatore in fattori`, R`eseguire la divisione fra i polinomi`, R`completare il quadrato al denominatore`, R`derivare il numeratore`], corretta: 1, spiegazione: R`Con grado del numeratore maggiore o uguale a quello del denominatore si divide, ottenendo un polinomio più un resto di grado minore. Solo su quel resto si applicano i fratti semplici o il completamento del quadrato.` },
    { id: 'q-09', domanda: R`Se il denominatore è di secondo grado con $\Delta < 0$, quale funzione compare tipicamente nel risultato?`, opzioni: [R`l'arcotangente`, R`l'arcoseno`, R`una radice quadrata`, R`due logaritmi di fattori di primo grado`], corretta: 0, spiegazione: R`Con $\Delta < 0$ il trinomio è irriducibile: si completa il quadrato e si ricade su $\int \frac{du}{u^2+k^2} = \frac{1}{k}\arctan\frac{u}{k}$. I due logaritmi compaiono invece quando $\Delta > 0$.` },
    { id: 'q-10', domanda: R`L'integrale definito $\int_a^b f(x)\,dx$ è…`, opzioni: [R`una famiglia di funzioni`, R`una funzione della variabile $x$`, R`un numero`, R`sempre positivo`], corretta: 2, spiegazione: R`È il limite delle somme dei rettangoli: un numero, che non porta la costante $c$ e in cui la $x$ non compare (è variabile muta). Può essere negativo o nullo se $f$ assume valori negativi.` },
    { id: 'q-11', domanda: R`Se $f(x) < 0$ in tutto $[a;b]$, allora $\int_a^b f(x)\,dx$…`, opzioni: [R`è positivo`, R`è nullo`, R`è negativo, e il suo opposto è l'area della regione`, R`non esiste`], corretta: 2, spiegazione: R`I contributi dei rettangoli sotto l'asse contano negativamente. L'area, che è per definizione positiva, si ottiene cambiando segno al risultato.` },
    { id: 'q-12', domanda: R`Che cosa afferma il teorema fondamentale del calcolo integrale?`, opzioni: [R`che la funzione integrale $F(x) = \int_a^x f(t)\,dt$ ha derivata $f(x)$`, R`che la funzione integrale è costante`, R`che la funzione integrale coincide con $f$`, R`che ogni funzione ammette primitive`], corretta: 0, spiegazione: R`Con $f$ continua, $F'(x) = f(x)$: derivata e integrale sono operazioni inverse. Da qui segue che ogni funzione **continua** ha primitive — l'ultima opzione dimentica proprio l'ipotesi di continuità.` },
    { id: 'q-13', domanda: R`Nella formula $\int_a^b f(x)\,dx = G(b) - G(a)$, la funzione $G$ è…`, opzioni: [R`la derivata di $f$`, R`una primitiva qualunque di $f$`, R`l'unica primitiva di $f$ che si annulla in $a$`, R`la funzione integranda stessa`], corretta: 1, spiegazione: R`Qualunque primitiva va bene: se se ne usa un'altra, differisce per una costante che si semplifica nella differenza $G(b) - G(a)$.` },
    { id: 'q-14', domanda: R`L'area della regione compresa fra $y = f(x)$ (sopra) e $y = g(x)$ (sotto) per $a \le x \le b$ vale…`, opzioni: [R`$\int_a^b [f(x) - g(x)]\,dx$`, R`$\int_a^b [g(x) - f(x)]\,dx$`, R`$\int_a^b f(x)\,dx \cdot \int_a^b g(x)\,dx$`, R`$\left\lvert \int_a^b f(x)\,dx \right\rvert - \left\lvert \int_a^b g(x)\,dx \right\rvert$`], corretta: 0, spiegazione: R`Si integra la differenza fra la curva superiore e quella inferiore. La formula vale anche se le curve stanno sotto l'asse $x$: conta solo quale sta sopra l'altra.` },
    { id: 'q-15', domanda: R`Il valor medio di una funzione continua $f$ in $[a;b]$ è…`, opzioni: [R`$\dfrac{f(a)+f(b)}{2}$`, R`$\dfrac{1}{b-a}\int_a^b f(x)\,dx$`, R`$\int_a^b f(x)\,dx$`, R`il massimo di $f$ in $[a;b]$`], corretta: 1, spiegazione: R`È l'altezza del rettangolo di base $b-a$ che ha la stessa area della regione sotto la curva. La media fra i valori agli estremi non tiene conto di ciò che succede in mezzo.` },
    { id: 'q-16', domanda: R`Il volume del solido ottenuto ruotando attorno all'asse $x$ la regione sotto $y = f(x)$ fra $a$ e $b$ è…`, opzioni: [R`$\pi\int_a^b f(x)\,dx$`, R`$2\pi\int_a^b f(x)\,dx$`, R`$\pi\int_a^b [f(x)]^2\,dx$`, R`$\pi^2\int_a^b f(x)\,dx$`], corretta: 2, spiegazione: R`Ogni sezione perpendicolare all'asse è un cerchio di raggio $f(x)$, quindi di area $\pi[f(x)]^2$; sommando i dischi si ottiene la formula. Senza il quadrato non si otterrebbe nemmeno un'area.` },
    { id: 'q-17', domanda: R`Che cosa si può dire di $\displaystyle\int_1^{+\infty}\frac{dx}{x}$?`, opzioni: [R`converge a $1$`, R`converge a $0$`, R`diverge`, R`non ha senso, perché $+\infty$ non è un numero`], corretta: 2, spiegazione: R`$\int_1^b \frac{dx}{x} = \ln b$, e $\ln b \to +\infty$: l'integrale diverge. Ha senso eccome, purché lo si definisca come limite; $\int_1^{+\infty}\frac{dx}{x^2}$, invece, converge a $1$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Ogni integrale indefinito si controlla da solo: deriva il risultato. Se non riottieni la funzione di partenza, c'è un errore.` },
    { tipo: 'errore', testo: R`Il $+c$ non è un vezzo: senza, hai scritto *una* primitiva, non l'integrale indefinito. Negli integrali definiti, invece, non va mai messo.` },
    { tipo: 'trucco', testo: R`Prima di cercare un metodo, chiediti se dentro l'integranda c'è una funzione insieme alla sua derivata: metà degli integrali del liceo sono quasi immediati.` },
    { tipo: 'errore', testo: R`Si può moltiplicare e dividere solo per **costanti**. $\int e^{x^2}dx$ non diventa $\dfrac{1}{2x}e^{x^2}$: quella $x$ al denominatore non può uscire dall'integrale.` },
    { tipo: 'metodo', testo: R`Per parti: come fattore finito scegli ciò che *migliora derivando*. $\ln x$ e $\arctan x$ vanno quasi sempre lì, perché non sai integrarli direttamente.` },
    { tipo: 'errore', testo: R`Nella sostituzione con estremi, o cambi gli estremi e resti in $t$, o tieni gli estremi e torni a $x$. Mescolare le due strade porta a un risultato sbagliato.` },
    { tipo: 'trucco', testo: R`Se il testo chiede l'**area** e non l'integrale, studia prima il segno della funzione: dove sta sotto l'asse, il contributo va preso in valore assoluto.` },
    { tipo: 'metodo', testo: R`Funzione razionale fratta: prima confronta i gradi (eventualmente dividi), poi guarda il $\Delta$ del denominatore. Il $\Delta$ decide il metodo.` },
    { tipo: 'trucco', testo: R`Nei volumi di rotazione il quadrato fa sparire le radici: $\left(\sqrt{x}\right)^2 = x$. Controlla poi l'ordine di grandezza con il cilindro che contiene il solido.` },
    { tipo: 'errore', testo: R`Nell'integrale improprio $+\infty$ non si sostituisce come se fosse un numero: si integra fino a $b$ e **poi** si fa il limite.` }
  ],

  aneddoti: [
    { matematico: 'Archimede', anni: '287–212 a.C.', titolo: 'Il Metodo ritrovato sotto un libro di preghiere', testo: R`Archimede aveva scritto a Eratostene una lettera, il *Metodo sui teoremi meccanici*, in cui rivelava come *trovava* aree e volumi prima di dimostrarli: immaginava le figure composte da infinite fettine sottilissime e le "pesava" appendendole idealmente a una leva. Il testo era considerato perduto. Nel 1906, a Costantinopoli, il filologo danese Johan Ludvig Heiberg esaminò un libro di preghiere del XIII secolo e riconobbe, sotto la scrittura liturgica, tracce di una scrittura più antica: la pergamena era stata raschiata e riusata, e sotto c'era Archimede. Il codice, sparito di nuovo per decenni, è ricomparso a un'asta nel 1998 ed è stato letto con i raggi X.`, legame: R`Le "fettine" di Archimede sono l'idea da cui nasce l'integrale: sommare infiniti contributi piccolissimi per ottenere un'area o un volume.` },

    { matematico: 'Bonaventura Cavalieri', anni: '1598–1647', titolo: 'Gli indivisibili e le botti di vino di Keplero', testo: R`Nel 1615 Keplero pubblicò la *Nova stereometria doliorum vinariorum*, la «nuova stereometria delle botti da vino». L'occasione era prosaica: aveva comprato del vino a Linz e non si fidava del metodo con cui il mercante ne stimava il volume, infilando un'asta di traverso nella botte. Per calcolarlo davvero Keplero immaginò le botti tagliate in dischi sottilissimi. Vent'anni dopo Bonaventura Cavalieri, allievo di Galileo e professore a Bologna, trasformò l'intuizione in un metodo generale nella *Geometria degli indivisibili* (1635): se due solidi, tagliati da piani paralleli, danno sempre sezioni di area uguale, allora hanno lo stesso volume. È il principio di Cavalieri, che si studia ancora in geometria solida.`, legame: R`I dischi di Keplero e Cavalieri sono esattamente le sezioni con cui si calcola il volume di un solido di rotazione, $V = \pi\int f^2 dx$.` },

    { matematico: 'Evangelista Torricelli e Isaac Barrow', anni: '1608–1647 e 1630–1677', titolo: 'Il teorema che in Italia porta due nomi', testo: R`Torricelli, allievo di Castelli e successore di Galileo a Firenze, è ricordato per il barometro, ma passò molto tempo sulle aree e sui volumi. Nel 1643 descrisse il "solido iperbolico acutissimo", ottenuto ruotando un ramo di iperbole: infinitamente lungo, con superficie infinita e volume finito. Il risultato parve un paradosso e fece discutere mezza Europa. In quegli anni intuì anche il legame fra il problema delle tangenti e quello delle aree. In Inghilterra Isaac Barrow, primo titolare della cattedra lucasiana a Cambridge, ne dimostrò una versione geometrica nelle *Lectiones geometricae* del 1670; nel 1669 aveva lasciato la cattedra a un suo giovane allievo, Isaac Newton.`, legame: R`Il teorema fondamentale del calcolo integrale, che lega la derivata all'area accumulata, sui libri italiani si chiama teorema di Torricelli–Barrow.` },

    { matematico: 'Gottfried Wilhelm Leibniz', anni: '1646–1716', titolo: 'Il 29 ottobre 1675 nasce il simbolo dell\'integrale', testo: R`In un manoscritto datato 29 ottobre 1675, Leibniz — allora a Parigi, diplomatico più che matematico di professione — scrisse per la prima volta una $S$ allungata al posto della parola latina *omnia*, «tutte». Quella $S$ sta per *summa*, e da allora indica l'integrale. Nello stesso periodo introdusse il $d$ dei differenziali e la scrittura $dx$. Newton era arrivato al calcolo prima, con simboli diversi (le "flussioni"), e ne nacque una disputa sulla priorità che avvelenò i rapporti fra la matematica inglese e quella continentale per un secolo. Sui contenuti la questione è aperta; sulla notazione no: quella di Leibniz è così efficiente che sembra lavorare da sola, ed è la nostra.`, legame: R`La scrittura $\int f(x)\,dx$ racconta la definizione: si somma («$\int$») il prodotto di $f(x)$ per una larghezza piccolissima («$dx$»).` },

    { matematico: 'Bernhard Riemann', anni: '1826–1866', titolo: 'La definizione nascosta in una tesi sulle serie', testo: R`Per quasi due secoli si integrò senza sapere con precisione che cosa fosse un integrale: bastava che i conti funzionassero. La definizione rigorosa arriva nel 1854, quando Riemann presenta a Gottinga il lavoro scritto per l'abilitazione all'insegnamento, dedicato alla rappresentazione delle funzioni mediante serie trigonometriche. Lì dentro, quasi come strumento tecnico di servizio, compaiono le somme sui rettangoli e la condizione perché il limite esista: è l'integrale che oggi porta il suo nome. Nella stessa abilitazione Riemann tenne anche la celebre lezione sui fondamenti della geometria, argomento scelto da Gauss fra i tre proposti. Morì di tubercolosi a trentanove anni in Italia, a Selasca sul Lago Maggiore.`, legame: R`Le somme inferiori e superiori con cui abbiamo definito l'integrale definito sono le somme di Riemann.` }
  ]
});
})();
