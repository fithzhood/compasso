(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'circonferenza',
  titolo: 'La circonferenza',

  introduzione: R`La circonferenza è il primo esempio di curva nel piano cartesiano che non è il grafico di una funzione: a ogni ascissa (tranne le due estreme) corrispondono due ordinate, non una sola. È definita in modo semplicissimo — un centro e una distanza fissa, il raggio — eppure la sua equazione mescola per la prima volta $x^2$ e $y^2$ nello stesso posto, ed è proprio questo che la lega a un vecchio conoscente: l'equazione di secondo grado.

Il raggio d'azione di un'antenna, il campo visivo di un faro, la portata di un allarme, l'orbita approssimata di un satellite: ogni volta che una situazione ha un centro e una distanza massima o costante, compare una circonferenza. Anche il GPS funziona così: sapere di trovarsi a una certa distanza da un satellite significa stare su una circonferenza (nello spazio, su una sfera) che ha quel satellite come centro.

Per seguire questo argomento servono la distanza tra due punti nel piano cartesiano, l'equazione della retta e, soprattutto, tutto quello che si sa sulle equazioni di secondo grado: discriminante, formula risolutiva, condizioni di esistenza delle soluzioni. Qui quelle stesse idee tornano applicate a una figura geometrica.`,

  sezioni: [
    { id: 'definizione-luogo', titolo: 'La circonferenza come luogo geometrico', testo: R`Una **circonferenza** è l'insieme di tutti i punti del piano che hanno la stessa distanza da un punto fisso, chiamato **centro**. Quella distanza costante si chiama **raggio**. È una definizione che riguarda le distanze, non i lati o gli angoli come per i poligoni: per questo la circonferenza si scrive naturalmente con la formula della distanza tra due punti.

>* **Definizione (luogo geometrico):** la circonferenza di centro $C(\alpha;\beta)$ e raggio $r>0$ è l'insieme dei punti $P(x;y)$ tali che $\overline{CP}=r$.

Per scrivere l'equazione basta tradurre la definizione: la distanza tra $P(x;y)$ e $C(\alpha;\beta)$ è $\sqrt{(x-\alpha)^2+(y-\beta)^2}$, e questa deve valere $r$ per ogni punto della circonferenza:

$$\sqrt{(x-\alpha)^2+(y-\beta)^2}=r.$$

Elevando al quadrato entrambi i membri (lecito perché sono entrambi non negativi) si ottiene l'equazione che studieremo nella prossima sezione. Per esempio, la circonferenza di centro $C(1;2)$ e raggio $3$ è fatta da tutti i punti che distano esattamente $3$ da $C$: il punto $(4;2)$ ne fa parte, perché dista $3$ da $C$ muovendosi in orizzontale; anche $(1;5)$ ne fa parte, spostandosi in verticale; il punto $(2;2)$ invece no, perché dista solo $1$ da $C$.

[[grafico:base]]

>! Attenzione a non confondere la circonferenza (la sola linea, i punti a distanza *esattamente* $r$ dal centro) con il cerchio (la linea più tutti i punti interni, a distanza *al massimo* $r$). In geometria analitica quasi sempre si lavora con la circonferenza.` },

    { id: 'equazione-canonica', titolo: 'L’equazione canonica', testo: R`Dalla definizione come luogo si ricava subito l'equazione. Partendo da $\sqrt{(x-\alpha)^2+(y-\beta)^2}=r$ ed elevando al quadrato:

>* **Equazione canonica (forma centro-raggio):** $$(x-\alpha)^2+(y-\beta)^2=r^2$$ dove $C(\alpha;\beta)$ è il centro e $r$ il raggio.

Questa forma è comoda quando centro e raggio sono già noti: basta sostituirli. Per esempio, la circonferenza di centro $C(-2;1)$ e raggio $r=4$ ha equazione $(x+2)^2+(y-1)^2=16$.

Sviluppando i due quadrati si arriva a un'altra scrittura, altrettanto importante:

$$x^2-2\alpha x+\alpha^2+y^2-2\beta y+\beta^2=r^2,$$

cioè, riordinando,

$$x^2+y^2-2\alpha x-2\beta y+(\alpha^2+\beta^2-r^2)=0.$$

Ponendo $a=-2\alpha$, $b=-2\beta$, $c=\alpha^2+\beta^2-r^2$ si ottiene la **forma generale** $x^2+y^2+ax+by+c=0$, di cui ci occupiamo nella prossima sezione: contiene sempre gli stessi due termini di secondo grado $x^2$ e $y^2$, con lo stesso coefficiente (qui $1$), e nessun termine misto $xy$. È proprio questa caratteristica — $x^2$ e $y^2$ con lo stesso coefficiente, niente $xy$ — che distingue l'equazione di una circonferenza da quella di un'altra curva.

>! Il segno davanti a $\alpha$ e $\beta$ nella forma canonica si inverte: centro $C(-2;1)$ dà $(x-(-2))^2=(x+2)^2$, non $(x-2)^2$.` },

    { id: 'equazione-generale', titolo: 'La forma generale e la condizione di esistenza', testo: R`La **forma generale** della circonferenza è

>* $$x^2+y^2+ax+by+c=0$$ con $a,b,c\in\mathbb{R}$: coefficiente $1$ su $x^2$ e su $y^2$, nessun termine $xy$.

Confrontando questa scrittura con quella ottenuta espandendo la forma canonica, si legge subito centro e raggio dai coefficienti:

$$C\left(-\frac{a}{2};-\frac{b}{2}\right), \qquad r=\sqrt{\frac{a^2}{4}+\frac{b^2}{4}-c}.$$

Ma non ogni terna $(a,b,c)$ dà una vera circonferenza: sotto radice ci deve essere un numero positivo. È la **condizione di esistenza**:

>* $$\frac{a^2}{4}+\frac{b^2}{4}-c>0$$ Se vale $0$, l'equazione è soddisfatta da un solo punto (una circonferenza di raggio $0$). Se è negativa, nessun punto reale la soddisfa: non è una figura del piano.

Esempio: $x^2+y^2-2x-4y-4=0$. Qui $a=-2$, $b=-4$, $c=-4$; centro $C(1;2)$, e $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=1+4+4=9>0$, quindi $r=\sqrt9=3$: è la stessa circonferenza della sezione precedente.

Nel grafico sposta $a$, $b$ e $c$: quando $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c$ scende a zero o sotto zero, la circonferenza si riduce a un punto e poi sparisce.

[[grafico:coefficienti]]

>! Il centro è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$, **non** $\left(\dfrac{a}{2};\dfrac{b}{2}\right)$: il segno meno fa parte della formula, non è un dettaglio da ricordare a parte.` },

    { id: 'casi-particolari', titolo: 'Casi particolari', testo: R`Alcuni valori dei coefficienti danno posizioni particolari, utili da riconoscere al volo.

- **Passa per l'origine** quando $c=0$: sostituendo $x=0$, $y=0$ nella forma generale resta solo $c$, quindi l'equazione è soddisfatta se e solo se $c=0$.
- **Centro sull'asse $x$** quando $b=0$: l'ordinata del centro è $-\dfrac{b}{2}$, che si annulla proprio quando $b=0$.
- **Centro sull'asse $y$** quando $a=0$: stesso ragionamento sull'ascissa $-\dfrac{a}{2}$.
- **Centro nell'origine** quando $a=b=0$: l'equazione diventa $x^2+y^2+c=0$, cioè $x^2+y^2=-c$. Perché rappresenti una circonferenza serve $-c>0$, cioè $c<0$; ponendo $c=-r^2$ si ritrova la forma più semplice $x^2+y^2=r^2$.

Esempio: $x^2+y^2+6x-8y=0$ ha $c=0$, quindi passa per l'origine; il suo centro è $(-3;4)$ e, con la formula della sezione precedente, il raggio vale $5$. Si può verificare che $O(0;0)$ soddisfa l'equazione: $0+0+0-0=0$. ✓

Riconoscere questi casi accelera molti esercizi: vedere subito che $c=0$ significa "passa per l'origine" evita di dover controllare tutto da capo.

>! $a=0$ oppure $b=0$ non vuol dire che "manca un termine": nella forma generale $a$ e $b$ sono sempre i coefficienti di $x$ e $y$, anche quando valgono zero. L'equazione resta comunque quella di una circonferenza, purché la condizione di esistenza sia rispettata.` },

    { id: 'retta-circonferenza', titolo: 'Posizione di una retta rispetto alla circonferenza', testo: R`Una retta e una circonferenza, nel piano, possono stare in tre posizioni reciproche: **secante** (due punti in comune), **tangente** (un punto), **esterna** (nessun punto). Ci sono due metodi per stabilire quale caso si presenta.

### Metodo della distanza

Si calcola la distanza $d$ del centro $C$ dalla retta e la si confronta con il raggio $r$:

- $d<r$: la retta è secante;
- $d=r$: la retta è tangente;
- $d>r$: la retta è esterna.

### Metodo del $\Delta$

Si sostituisce l'equazione della retta in quella della circonferenza: si ottiene un'equazione di secondo grado in una sola incognita. Il segno del discriminante decide:

>* $\Delta>0$: secante; $\Delta=0$: tangente; $\Delta<0$: esterna. Stesso schema delle equazioni di secondo grado, applicato qui ai punti di intersezione.

Esempio: la retta $y=2x-5$ e la circonferenza $x^2+y^2=5$ (centro $O$, raggio $\sqrt5$). Con la distanza: la retta in forma implicita è $2x-y-5=0$, e $d=\dfrac{|2\cdot0-0-5|}{\sqrt{2^2+1^2}}=\dfrac{5}{\sqrt5}=\sqrt5=r$: tangente. Con il $\Delta$: sostituendo, $x^2+(2x-5)^2=5$ diventa $5x^2-20x+20=0$, cioè $x^2-4x+4=0$, con $\Delta=16-16=0$: stesso risultato.

Nel grafico muovi $q$ nella retta $y=x+q$ rispetto alla circonferenza $x^2+y^2=25$ e osserva come cambiano i punti di intersezione.

[[grafico:rettaCirconferenza]]

>! Il metodo della distanza richiede di conoscere già centro e raggio; il metodo del $\Delta$ funziona sempre, anche partendo dalla forma generale, ma richiede di portare a termine tutta la sostituzione.` },

    { id: 'rette-tangenti', titolo: 'Le rette tangenti', testo: R`Le rette tangenti si cercano in due situazioni diverse, con metodi diversi.

### Tangente in un punto della circonferenza

Se $P_0(x_0;y_0)$ è un punto che appartiene già alla circonferenza, la tangente in $P_0$ è, per una proprietà elementare, la retta **perpendicolare al raggio** $CP_0$ passante per $P_0$: si trova il coefficiente angolare del raggio, se ne prende l'antireciproco cambiato di segno, e si scrive l'equazione della retta per $P_0$ con quel coefficiente angolare.

C'è anche una scorciatoia diretta, la **formula di sdoppiamento**: per la circonferenza $x^2+y^2+ax+by+c=0$,

>* $$x\,x_0+y\,y_0+a\,\frac{x+x_0}{2}+b\,\frac{y+y_0}{2}+c=0$$ Si ottiene sostituendo $x^2\to x\,x_0$, $y^2\to y\,y_0$, $x\to\frac{x+x_0}{2}$, $y\to\frac{y+y_0}{2}$: vale solo se $P_0$ è davvero sulla circonferenza.

Esempio: nella circonferenza $x^2+y^2-2x-4y-4=0$ (centro $C(1;2)$), il punto $P_0(4;2)$ è sulla curva, perché $16+4-8-8-4=0$. Il raggio $CP_0$ è orizzontale, quindi la tangente è verticale: $x=4$. Lo sdoppiamento conferma: $4x+2y-(x+4)-2(y+2)-4=0$ diventa $3x-12=0$, cioè $x=4$.

### Tangenti da un punto esterno

Se $P_1(x_1;y_1)$ **non** appartiene alla circonferenza, non c'è un punto della curva da cui partire: si scrive il fascio di rette per $P_1$, $y-y_1=m(x-x_1)$, e si impone la tangenza (distanza uguale al raggio, oppure $\Delta=0$ sostituendo nell'equazione della circonferenza). Si ottiene un'equazione in $m$, di solito di secondo grado: due soluzioni, due tangenti.

[[grafico:tangentePunto]]

>! Il fascio $y-y_1=m(x-x_1)$ non contiene la retta verticale per $P_1$: se una delle due tangenti è verticale, il metodo con $m$ non la trova, e va controllata a parte confrontando la sua distanza dal centro con il raggio.` },

    { id: 'due-circonferenze', titolo: 'Due circonferenze: posizione reciproca e asse radicale', testo: R`Anche due circonferenze possono stare in diverse posizioni reciproche, classificate confrontando la distanza $d$ tra i centri con i raggi $r_1$ e $r_2$ (supponendo $r_1\ge r_2$):

- $d>r_1+r_2$: **esterne**, nessun punto in comune;
- $d=r_1+r_2$: **tangenti esternamente**, un punto;
- $r_1-r_2<d<r_1+r_2$: **secanti**, due punti;
- $d=r_1-r_2$ (con $r_1\ne r_2$): **tangenti internamente**, un punto;
- $d<r_1-r_2$: una circonferenza è tutta interna all'altra, nessun punto in comune.

Confrontando le equazioni generali $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$ si può definire una retta speciale, l'**asse radicale**, sottraendo le due equazioni: i termini $x^2$ e $y^2$, uguali in entrambe, si cancellano sempre, e resta

>* $$(a_1-a_2)x+(b_1-b_2)y+(c_1-c_2)=0$$ Se le circonferenze sono secanti, l'asse radicale è la retta che passa per i due punti di intersezione (la corda comune). È sempre perpendicolare alla retta che unisce i due centri.

Esempio: $\gamma_1: x^2+y^2-9=0$ (centro $O$, raggio $3$) e $\gamma_2: x^2+y^2-8x+7=0$ (centro $(4;0)$, raggio $3$). La distanza tra i centri è $4$, compresa tra $0$ e $6$: le circonferenze sono secanti. Sottraendo le equazioni: $8x-16=0$, cioè $x=2$, l'asse radicale.

[[grafico:assiRadicale]]

>! L'asse radicale esiste anche quando le due circonferenze non si intersecano: resta comunque una retta ben definita, solo che in quel caso non passa per punti reali di nessuna delle due.` },

    { id: 'determinare-equazione', titolo: 'Determinare l’equazione di una circonferenza', testo: R`Determinare l'equazione di una circonferenza significa trovare i tre numeri $a$, $b$, $c$ (o, equivalentemente, $\alpha$, $\beta$, $r$). I dati del problema suggeriscono la strada.

**Tre punti non allineati.** Si sostituisce ciascun punto in $x^2+y^2+ax+by+c=0$: si ottengono tre equazioni **lineari** nelle incognite $a$, $b$, $c$ (lineari, perché $x^2+y^2$ diventano numeri già noti una volta sostituite le coordinate). Si risolve il sistema, di solito per sostituzione.

**Centro e un punto della circonferenza.** Il raggio è semplicemente la distanza tra il centro e quel punto; poi si scrive la forma canonica.

**Centro e retta tangente.** Il raggio è la distanza tra il centro e la retta (la formula della distanza punto-retta, applicata al centro).

**Estremi di un diametro.** Il centro è il punto medio del segmento; il raggio è metà della sua lunghezza.

Esempio (tre punti): $A(-1;0)$, $B(3;0)$, $C(0;3)$. Sostituendo si ottiene $1-a+c=0$, $9+3a+c=0$, $9+3b+c=0$. Dalla prima, $c=a-1$; nella seconda, $4a-1=-9$, quindi $a=-2$ e $c=-3$; nella terza, $3b-3=-9$, quindi $b=-2$. L'equazione è $x^2+y^2-2x-2y-3=0$, con centro $(1;1)$ e raggio $\sqrt5$.

>* Qualunque sia il dato di partenza, il traguardo è sempre lo stesso: trovare $\alpha$, $\beta$, $r$ (o $a$, $b$, $c$) e scrivere l'equazione. Conviene decidere subito quale delle due forme, canonica o generale, rende i calcoli più semplici.

>! Tre punti allineati non individuano nessuna circonferenza: il sistema in $a,b,c$ non ha soluzione. Prima di partire, conviene controllare che i tre punti dati non siano allineati.` },

    { id: 'fasci-e-problemi', titolo: 'Fasci di circonferenze e problemi', testo: R`### Fasci di circonferenze (cenni)

Date due circonferenze $\gamma_1: x^2+y^2+a_1x+b_1y+c_1=0$ e $\gamma_2: x^2+y^2+a_2x+b_2y+c_2=0$, l'espressione

>* $$\gamma_1+k\,\gamma_2=0, \qquad k\in\mathbb{R}$$ descrive un **fascio di circonferenze**: al variare di $k$ si ottengono infinite circonferenze, tutte passanti per gli eventuali punti comuni a $\gamma_1$ e $\gamma_2$ (se $\gamma_1$ e $\gamma_2$ sono secanti, tutte passano per quei due punti).

C'è un valore speciale: per $k=-1$ i termini $x^2+y^2$ si cancellano, e resta proprio l'equazione dell'**asse radicale** vista nella sezione precedente. È l'unico "elemento degenere" del fascio: una retta al posto di una circonferenza.

### Problemi

Nei problemi di geometria analitica sulla circonferenza si segue di solito questo schema: tradurre i dati in equazioni con le formule di questa scheda, risolvere, e controllare che il risultato abbia senso nel problema — per esempio, che un raggio trovato sia un numero positivo.

Un esempio tipico: tre sensori si trovano in $A(0;0)$, $B(6;0)$ e $C(0;8)$, e si vuole installare un ripetitore alla stessa distanza da tutti e tre. Il ripetitore va posto nel centro della circonferenza che passa per $A$, $B$, $C$: con il metodo della sezione precedente si trova $x^2+y^2-6x-8y=0$, centro $(3;4)$ e raggio $5$. Il ripetitore va collocato in $(3;4)$, a distanza $5$ da ciascun sensore.

>! In un problema, un'equazione di secondo grado in $a$, $b$, $c$ o in un parametro può avere soluzioni che vanno scartate: succede quando corrispondono a un raggio negativo, a punti allineati che dovrebbero non esserlo, o ad altre condizioni del problema che l'algebra da sola non vede.` }
  ],

  grafici: {
    base: {
      tipo: 'piano', x: [-4, 6], y: [-3, 7], proporzioni: 'uguali',
      elementi: [
        { tipo: 'cerchio', centro: [1, 2], raggio: 3, etichetta: 'γ' },
        { tipo: 'punto', p: [1, 2], etichetta: 'C(1; 2)', posizione: 'basso-sinistra', colore: 2 },
        { tipo: 'segmento', da: [1, 2], a: [4, 2], etichetta: 'r = 3' },
        { tipo: 'punto', p: [4, 2], etichetta: 'P', posizione: 'destra' }
      ],
      didascalia: R`La circonferenza γ è l'insieme dei punti P che stanno a distanza r = 3 dal centro C(1; 2).`
    },
    coefficienti: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      elementi: [
        { tipo: 'cerchio', centro: ['-a/2', '-b/2'], raggio: 'sqrt(a^2/4 + b^2/4 - c)', etichetta: 'γ' },
        { tipo: 'punto', p: ['-a/2', '-b/2'], etichetta: 'C', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-7.6, 7.2], testo: 'centro ({{-a/2}}; {{-b/2}})', ancora: 'start' },
        { tipo: 'testo', p: [-7.6, 6.2], testo: 'a²/4 + b²/4 − c = {{a^2/4 + b^2/4 - c}}', ancora: 'start' }
      ],
      parametri: [
        { nome: 'a', min: -6, max: 6, passo: 0.1, valore: -2, etichetta: 'a' },
        { nome: 'b', min: -6, max: 6, passo: 0.1, valore: -4, etichetta: 'b' },
        { nome: 'c', min: -8, max: 8, passo: 0.1, valore: -4, etichetta: 'c' }
      ],
      didascalia: R`Il cerchio esiste solo quando a²/4 + b²/4 − c > 0; quando questa quantità scende a zero o sotto zero la circonferenza si riduce a un punto e poi sparisce (il raggio non è più un numero reale).`
    },
    rettaCirconferenza: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 5, etichetta: 'x² + y² = 25' },
        { tipo: 'retta', m: 1, q: 'q', etichetta: 'y = x + q' }
      ],
      punti: [
        { x: '(-q - sqrt(50 - q^2))/2', y: '(q - sqrt(50 - q^2))/2', etichetta: 'A', posizione: 'basso', colore: 2 },
        { x: '(-q + sqrt(50 - q^2))/2', y: '(q + sqrt(50 - q^2))/2', etichetta: 'B', posizione: 'alto', colore: 2 }
      ],
      parametri: [{ nome: 'q', min: -8, max: 8, passo: 0.1, valore: 3, etichetta: 'q' }],
      didascalia: R`Muovi q: per |q| piccolo la retta è secante (due punti A e B), quando |q| = 5√2 ≈ 7,07 è tangente, oltre è esterna e i punti spariscono.`
    },
    tangentePunto: {
      tipo: 'piano', x: [-7, 7], y: [-7, 7], proporzioni: 'uguali',
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 5, etichetta: 'γ' },
        { tipo: 'segmento', da: [0, 0], a: ['5*cos(t*pi/180)', '5*sin(t*pi/180)'], tratteggio: true },
        { tipo: 'punto', p: ['5*cos(t*pi/180)', '5*sin(t*pi/180)'], etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'retta', per: [['5*cos(t*pi/180)', '5*sin(t*pi/180)'], ['5*cos(t*pi/180) - sin(t*pi/180)', '5*sin(t*pi/180) + cos(t*pi/180)']], etichetta: 'tangente in P', colore: 3 }
      ],
      parametri: [{ nome: 't', min: 0, max: 360, passo: 1, valore: 40, etichetta: 't (gradi)' }],
      didascalia: R`P sta sulla circonferenza di raggio 5 nel punto a t gradi. La tangente in P è sempre perpendicolare al raggio OP, qualunque sia t.`
    },
    assiRadicale: {
      tipo: 'piano', x: [-4, 8], y: [-5, 5], proporzioni: 'uguali',
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 3, etichetta: 'γ₁' },
        { tipo: 'cerchio', centro: [4, 0], raggio: 3, etichetta: 'γ₂', colore: 2 },
        { tipo: 'verticale', x: 2, etichetta: 'asse radicale', tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [2, 'sqrt(5)'], etichetta: 'A', colore: 3 },
        { tipo: 'punto', p: [2, '-sqrt(5)'], etichetta: 'B', colore: 3 }
      ],
      didascalia: R`γ₁: x² + y² − 9 = 0, γ₂: x² + y² − 8x + 7 = 0. Sottraendo le equazioni si ottiene 8x − 16 = 0, cioè l'asse radicale x = 2, che passa per i due punti comuni A e B.`
    }
  },

  esempi: [
    { titolo: 'Dal centro e dal raggio alla forma generale', problema: R`Scrivi l'equazione della circonferenza di centro $C(3;-1)$ e raggio $r=4$, sia in forma canonica sia in forma generale.`, passi: [
      R`Forma canonica: sostituisco $\alpha=3$, $\beta=-1$, $r=4$ in $(x-\alpha)^2+(y-\beta)^2=r^2$: $(x-3)^2+(y+1)^2=16$.`,
      R`Sviluppo i quadrati: $x^2-6x+9+y^2+2y+1=16$.`,
      R`Porto tutto a sinistra e riduco: $x^2+y^2-6x+2y+10-16=0$, cioè $x^2+y^2-6x+2y-6=0$.`,
      R`Verifica: $a=-6\Rightarrow -\dfrac{a}{2}=3=\alpha$ ✓; $b=2\Rightarrow -\dfrac{b}{2}=-1=\beta$ ✓; $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=9+1+6=16=r^2$ ✓.`
    ], risultato: R`$x^2+y^2-6x+2y-6=0$, equivalente a $(x-3)^2+(y+1)^2=16$.` },

    { titolo: 'Dalla forma generale a centro e raggio', problema: R`Determina centro e raggio della circonferenza $x^2+y^2-2x-4y-4=0$, dopo aver verificato che rappresenti davvero una circonferenza.`, passi: [
      R`Confronto con $x^2+y^2+ax+by+c=0$: $a=-2$, $b=-4$, $c=-4$.`,
      R`Condizione di esistenza: $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=1+4+4=9>0$, quindi è una vera circonferenza.`,
      R`Centro: $C\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)=C(1;2)$.`,
      R`Raggio: $r=\sqrt9=3$.`
    ], risultato: R`Centro $C(1;2)$, raggio $r=3$.` },

    { titolo: 'Posizione di una retta rispetto a una circonferenza', problema: R`Stabilisci la posizione della retta $y=2x-5$ rispetto alla circonferenza $x^2+y^2=5$.`, passi: [
      R`La circonferenza ha centro $O(0;0)$ e raggio $r=\sqrt5$ (perché $x^2+y^2=5$ è il caso particolare con centro nell'origine).`,
      R`Scrivo la retta in forma implicita: $2x-y-5=0$.`,
      R`Distanza dal centro: $d=\dfrac{|2\cdot0-0-5|}{\sqrt{2^2+(-1)^2}}=\dfrac{5}{\sqrt5}=\sqrt5$.`,
      R`$d=r=\sqrt5$: la retta è tangente. Verifica con il $\Delta$: sostituendo $y=2x-5$ in $x^2+y^2=5$ si ottiene $5x^2-20x+20=0$, cioè $x^2-4x+4=0$, con $\Delta=16-16=0$: stesso esito.`
    ], risultato: R`La retta è tangente alla circonferenza.` },

    { titolo: 'La tangente in un punto della circonferenza', problema: R`Scrivi l'equazione della tangente alla circonferenza $x^2+y^2-2x-4y-4=0$ nel suo punto $P_0(4;2)$.`, passi: [
      R`Verifico che $P_0$ appartiene alla circonferenza: $16+4-2\cdot4-4\cdot2-4=16+4-8-8-4=0$ ✓.`,
      R`Il centro è $C(1;2)$ (dai coefficienti: $-a/2=1$, $-b/2=2$). Il raggio $CP_0$ va da $(1;2)$ a $(4;2)$: è orizzontale.`,
      R`La tangente in $P_0$ è perpendicolare al raggio, quindi verticale: $x=4$.`,
      R`Verifica con lo sdoppiamento: $x\,x_0+y\,y_0+a\dfrac{x+x_0}{2}+b\dfrac{y+y_0}{2}+c=0$ con $x_0=4$, $y_0=2$, $a=-2$, $b=-4$, $c=-4$ diventa $4x+2y-(x+4)-2(y+2)-4=0$, cioè $3x-12=0$: stesso risultato.`
    ], risultato: R`Tangente: $x=4$.` },

    { titolo: 'Le tangenti da un punto esterno', problema: R`Trova le equazioni delle rette tangenti condotte dal punto $P(13;0)$ alla circonferenza $x^2+y^2=25$.`, passi: [
      R`Centro $O(0;0)$, raggio $r=5$. Distanza $OP=13>5$: $P$ è esterno, quindi esistono due tangenti.`,
      R`Fascio di rette per $P$ (non verticali): $y=m(x-13)$, cioè $mx-y-13m=0$.`,
      R`Impongo $d(O,\text{retta})=r$: $\dfrac{|{-13m}|}{\sqrt{m^2+1}}=5 \Rightarrow 169m^2=25(m^2+1) \Rightarrow 144m^2=25 \Rightarrow m=\pm\dfrac{5}{12}$.`,
      R`La retta verticale $x=13$ ha distanza $13\ne5$ da $O$: non è tangente, quindi non si perde nessuna soluzione.`,
      R`Le due tangenti sono $y=\dfrac{5}{12}(x-13)$ e $y=-\dfrac{5}{12}(x-13)$, cioè $5x-12y-65=0$ e $5x+12y-65=0$.`
    ], risultato: R`$5x-12y-65=0 \ \lor\ 5x+12y-65=0$.` },

    { titolo: 'L’equazione dai tre punti', problema: R`Determina l'equazione della circonferenza passante per $A(-1;0)$, $B(3;0)$, $C(0;3)$.`, passi: [
      R`Sostituisco ogni punto in $x^2+y^2+ax+by+c=0$: da $A$, $1-a+c=0$; da $B$, $9+3a+c=0$; da $C$, $9+3b+c=0$.`,
      R`Dalla prima equazione: $c=a-1$. Sostituendo nella seconda: $9+3a+a-1=0 \Rightarrow 4a-1=-9$... ricontrollo: $9+3a+(a-1)=0 \Rightarrow 4a+8=0 \Rightarrow a=-2$, quindi $c=-3$.`,
      R`Sostituendo $c=-3$ nella terza: $9+3b-3=0 \Rightarrow 3b+6=0 \Rightarrow b=-2$.`,
      R`Equazione: $x^2+y^2-2x-2y-3=0$. Condizione di esistenza: $1+1+3=5>0$ ✓. Centro $(1;1)$, raggio $\sqrt5$.`,
      R`Verifica sui tre punti: $A(-1;0)$: $1+0+2-0-3=0$ ✓; $B(3;0)$: $9+0-6-0-3=0$ ✓; $C(0;3)$: $0+9-0-6-3=0$ ✓.`
    ], risultato: R`$x^2+y^2-2x-2y-3=0$ (centro $(1;1)$, raggio $\sqrt5$).` }
  ],

  formulario: [
    { nome: 'Equazione canonica', formula: R`(x-\alpha)^2+(y-\beta)^2=r^2`, nota: R`Centro $C(\alpha;\beta)$, raggio $r$.` },
    { nome: 'Equazione generale', formula: R`x^2+y^2+ax+by+c=0` },
    { nome: 'Centro dai coefficienti', formula: R`C\left(-\frac{a}{2};\,-\frac{b}{2}\right)` },
    { nome: 'Raggio dai coefficienti', formula: R`r=\sqrt{\frac{a^2}{4}+\frac{b^2}{4}-c}`, nota: R`Esiste (reale e positivo) solo se $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$.` },
    { nome: 'Condizione di esistenza', formula: R`\frac{a^2}{4}+\frac{b^2}{4}-c>0`, nota: R`Se vale $0$: un solo punto. Se è negativa: nessun punto reale.` },
    { nome: 'Distanza centro-retta (richiamo)', formula: R`d=\frac{|m\,x_C-y_C+q|}{\sqrt{m^2+1}}`, nota: R`Distanza del centro $C(x_C;y_C)$ dalla retta $y=mx+q$; si confronta con $r$.` },
    { nome: 'Sdoppiamento (forma generale)', formula: R`x\,x_0+y\,y_0+a\,\frac{x+x_0}{2}+b\,\frac{y+y_0}{2}+c=0`, nota: R`Tangente nel punto $P_0(x_0;y_0)$ della circonferenza $x^2+y^2+ax+by+c=0$.` },
    { nome: 'Sdoppiamento (forma canonica)', formula: R`(x_0-\alpha)(x-\alpha)+(y_0-\beta)(y-\beta)=r^2`, nota: R`Stessa idea, per la forma canonica $(x-\alpha)^2+(y-\beta)^2=r^2$.` },
    { nome: 'Asse radicale', formula: R`(a_1-a_2)x+(b_1-b_2)y+(c_1-c_2)=0`, nota: R`Si ottiene sottraendo le equazioni di $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$.` },
    { nome: 'Fascio di circonferenze', formula: R`\left(x^2+y^2+a_1x+b_1y+c_1\right)+k\left(x^2+y^2+a_2x+b_2y+c_2\right)=0`, nota: R`Al variare di $k\in\mathbb{R}$; per $k=-1$ si ottiene l'asse radicale.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione-luogo', tipo: 'definizione', fronte: R`Definizione di circonferenza come luogo`, retro: R`L'insieme dei punti del piano che hanno distanza costante $r$ (raggio) da un punto fisso $C$ (centro).` },
    { id: 'fc-02', sezione: 'definizione-luogo', tipo: 'concetto', fronte: R`Da quale condizione nasce l'equazione della circonferenza?`, retro: R`Dal richiedere che la distanza di un generico punto $P(x;y)$ dal centro sia sempre $r$: $\sqrt{(x-\alpha)^2+(y-\beta)^2}=r$.` },
    { id: 'fc-03', sezione: 'equazione-canonica', tipo: 'formula', fronte: R`Equazione canonica (centro-raggio)`, retro: R`$(x-\alpha)^2+(y-\beta)^2=r^2$, con centro $C(\alpha;\beta)$ e raggio $r$.` },
    { id: 'fc-04', sezione: 'equazione-canonica', tipo: 'procedura', fronte: R`Dalla forma canonica alla forma generale`, retro: R`Si sviluppano i quadrati e si riduce: $x^2+y^2+ax+by+c=0$ con $a=-2\alpha$, $b=-2\beta$, $c=\alpha^2+\beta^2-r^2$.` },
    { id: 'fc-05', sezione: 'equazione-generale', tipo: 'formula', fronte: R`Forma generale della circonferenza`, retro: R`$x^2+y^2+ax+by+c=0$, con coefficiente $1$ su $x^2$ e $y^2$ e nessun termine $xy$.` },
    { id: 'fc-06', sezione: 'equazione-generale', tipo: 'formula', fronte: R`Centro dai coefficienti`, retro: R`$C\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$.` },
    { id: 'fc-07', sezione: 'equazione-generale', tipo: 'formula', fronte: R`Raggio dai coefficienti`, retro: R`$r=\sqrt{\dfrac{a^2}{4}+\dfrac{b^2}{4}-c}$.` },
    { id: 'fc-08', sezione: 'equazione-generale', tipo: 'concetto', fronte: R`Condizione di esistenza della circonferenza`, retro: R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$. Se vale $0$: un solo punto. Se è negativa: nessun punto reale.` },
    { id: 'fc-09', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando la circonferenza passa per l'origine?`, retro: R`Quando $c=0$: sostituendo $(0;0)$ nell'equazione generale resta solo $c$.` },
    { id: 'fc-10', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando il centro sta sull'asse $x$?`, retro: R`Quando $b=0$, perché l'ordinata del centro $-b/2$ si annulla.` },
    { id: 'fc-11', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Quando il centro sta sull'asse $y$?`, retro: R`Quando $a=0$, perché l'ascissa del centro $-a/2$ si annulla.` },
    { id: 'fc-12', sezione: 'casi-particolari', tipo: 'concetto', fronte: R`Circonferenza con centro nell'origine`, retro: R`$a=b=0$: l'equazione diventa $x^2+y^2+c=0$, cioè $x^2+y^2=r^2$ con $c=-r^2<0$.` },
    { id: 'fc-13', sezione: 'retta-circonferenza', tipo: 'procedura', fronte: R`Posizione retta-circonferenza: metodo della distanza`, retro: R`Si confronta la distanza $d$ del centro dalla retta con il raggio $r$: $d>r$ esterna, $d=r$ tangente, $d<r$ secante.` },
    { id: 'fc-14', sezione: 'retta-circonferenza', tipo: 'procedura', fronte: R`Posizione retta-circonferenza: metodo del $\Delta$`, retro: R`Si sostituisce la retta nella circonferenza e si guarda il segno di $\Delta$: $\Delta>0$ secante, $\Delta=0$ tangente, $\Delta<0$ esterna.` },
    { id: 'fc-15', sezione: 'rette-tangenti', tipo: 'concetto', fronte: R`Tangente in un punto della circonferenza (primo metodo)`, retro: R`È la retta perpendicolare al raggio $CP_0$, passante per $P_0$.` },
    { id: 'fc-16', sezione: 'rette-tangenti', tipo: 'formula', fronte: R`Formula di sdoppiamento (forma generale)`, retro: R`Tangente in $P_0(x_0;y_0)$ a $x^2+y^2+ax+by+c=0$: $x\,x_0+y\,y_0+a\dfrac{x+x_0}{2}+b\dfrac{y+y_0}{2}+c=0$.` },
    { id: 'fc-17', sezione: 'rette-tangenti', tipo: 'procedura', fronte: R`Come si trovano le tangenti da un punto esterno?`, retro: R`Si scrive il fascio di rette per il punto, si impone $d=r$ (o $\Delta=0$) e si risolve rispetto a $m$; si controlla a parte l'eventuale retta verticale.` },
    { id: 'fc-18', sezione: 'rette-tangenti', tipo: 'concetto', fronte: R`Quante tangenti si possono condurre da un punto esterno?`, retro: R`Sempre due, perché il punto è esterno alla circonferenza.` },
    { id: 'fc-19', sezione: 'due-circonferenze', tipo: 'concetto', fronte: R`Quando due circonferenze sono secanti?`, retro: R`Quando $|r_1-r_2|<d<r_1+r_2$, con $d$ distanza tra i centri.` },
    { id: 'fc-20', sezione: 'due-circonferenze', tipo: 'formula', fronte: R`Asse radicale`, retro: R`Sottraendo $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$ si ottiene $(a_1-a_2)x+(b_1-b_2)y+(c_1-c_2)=0$.` },
    { id: 'fc-21', sezione: 'due-circonferenze', tipo: 'concetto', fronte: R`Cos'è l'asse radicale quando le circonferenze sono secanti?`, retro: R`La retta che passa per i due punti di intersezione (la corda comune).` },
    { id: 'fc-22', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Equazione per tre punti`, retro: R`Si sostituisce ogni punto in $x^2+y^2+ax+by+c=0$: si ottiene un sistema lineare nelle incognite $a,b,c$.` },
    { id: 'fc-23', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Equazione dati centro e un punto della circonferenza`, retro: R`Il raggio è la distanza tra il centro e il punto; poi si scrive la forma canonica.` },
    { id: 'fc-24', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Equazione dati centro e retta tangente`, retro: R`Il raggio è la distanza tra il centro e la retta tangente.` },
    { id: 'fc-25', sezione: 'fasci-e-problemi', tipo: 'concetto', fronte: R`Cos'è un fascio di circonferenze?`, retro: R`L'insieme delle circonferenze $\gamma_1+k\,\gamma_2=0$ al variare di $k$, tutte passanti per i punti comuni a due circonferenze date.` },
    { id: 'fc-26', sezione: 'fasci-e-problemi', tipo: 'concetto', fronte: R`Elemento degenere del fascio`, retro: R`Per $k=-1$ i termini $x^2+y^2$ si cancellano: si ottiene l'asse radicale, una retta invece di una circonferenza.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Scrivi in forma generale l'equazione della circonferenza di centro $C(2;-3)$ e raggio $r=5$.`, suggerimenti: [R`Parti dalla forma canonica $(x-\alpha)^2+(y-\beta)^2=r^2$ e sviluppa i quadrati.`, R`Dovresti arrivare a coefficienti $a=-4$, $b=6$.`], risposta: { tipo: 'testo', accettate: ['x^2+y^2-4x+6y-12=0', 'x²+y²−4x+6y−12=0', 'x^2 + y^2 - 4x + 6y - 12 = 0'] }, soluzione: [R`Forma canonica: $(x-2)^2+(y+3)^2=25$.`, R`Sviluppo: $x^2-4x+4+y^2+6y+9=25$.`, R`Riduco: $x^2+y^2-4x+6y+13-25=0$, cioè $x^2+y^2-4x+6y-12=0$.`, R`Verifica: centro $(2;-3)$ ✓, $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c=4+9+12=25=r^2$ ✓.`] },

    { id: 'es-02', difficolta: 1, testo: R`Determina le coordinate del centro (nella forma «$x;y$») della circonferenza $x^2+y^2+6x-8y=0$.`, suggerimenti: [R`Confronta con $x^2+y^2+ax+by+c=0$: qui $c=0$.`, R`Il centro è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$.`], risposta: { tipo: 'numeri', valori: [-3, 4] }, soluzione: [R`$a=6$, $b=-8$, $c=0$: passa per l'origine perché $c=0$.`, R`Centro: $\left(-\dfrac{6}{2};-\dfrac{-8}{2}\right)=(-3;4)$.`, R`Raggio: $r=\sqrt{9+16-0}=\sqrt{25}=5$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Per quali valori di $c$ l'equazione $x^2+y^2-6x+8y+c=0$ rappresenta una vera circonferenza (non un punto né l'insieme vuoto)?`, suggerimenti: [R`Applica la condizione di esistenza $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$.`, R`Qui $a=-6$ e $b=8$: calcola $9+16-c$.`], risposta: { tipo: 'intervallo', da: '-inf', a: 25, chiusoDa: false, chiusoA: false }, soluzione: [R`$a=-6$, $b=8$: condizione $\dfrac{36}{4}+\dfrac{64}{4}-c>0$, cioè $9+16-c>0$.`, R`$25-c>0 \Rightarrow c<25$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Stabilisci la posizione della retta $y=x-1$ rispetto alla circonferenza $x^2+y^2=2$.`, suggerimenti: [R`Centro e raggio si leggono subito: è il caso particolare con centro nell'origine.`, R`Sostituisci la retta nell'equazione della circonferenza e calcola $\Delta$.`], risposta: { tipo: 'testo', accettate: ['secante', 'la retta è secante', 'retta secante'] }, soluzione: [R`Centro $O(0;0)$, raggio $r=\sqrt2$.`, R`Sostituendo: $x^2+(x-1)^2=2 \Rightarrow 2x^2-2x-1=0$.`, R`$\Delta=4+8=12>0$: la retta è secante (due punti di intersezione).`] },

    { id: 'es-05', difficolta: 2, testo: R`Trova le ascisse dei punti in cui la retta $y=2$ interseca la circonferenza $x^2+y^2-2x-4y-4=0$.`, suggerimenti: [R`Sostituisci $y=2$ nell'equazione della circonferenza.`, R`Dovresti ottenere un'equazione di secondo grado con soluzioni intere.`], risposta: { tipo: 'numeri', valori: [-2, 4] }, soluzione: [R`Sostituendo $y=2$: $x^2+4-2x-8-4=0 \Rightarrow x^2-2x-8=0$.`, R`$(x-4)(x+2)=0 \Rightarrow x=4 \lor x=-2$.`, R`La retta $y=2$ passa per il centro $(1;2)$: i due punti sono gli estremi di un diametro orizzontale.`] },

    { id: 'es-06', difficolta: 2, testo: R`Scrivi l'equazione della retta tangente alla circonferenza $x^2+y^2=25$ nel suo punto $P(3;4)$.`, suggerimenti: [R`Verifica prima che $P$ appartenga davvero alla circonferenza.`, R`Usa la formula di sdoppiamento con $a=b=0$, $c=-25$: $x\,x_0+y\,y_0+c=0$.`], risposta: { tipo: 'testo', accettate: ['3x+4y-25=0', '3x + 4y - 25 = 0'] }, soluzione: [R`$P(3;4)$ è sulla circonferenza: $9+16=25$ ✓.`, R`Sdoppiamento: $x\cdot3+y\cdot4-25=0$, cioè $3x+4y-25=0$.`, R`Verifica con il raggio: la pendenza di $OP$ è $4/3$, la tangente ha pendenza $-3/4$: $y-4=-\dfrac34(x-3) \Rightarrow 3x+4y-25=0$. Stesso risultato.`] },

    { id: 'es-07', difficolta: 2, testo: R`Determina le equazioni delle tangenti alla circonferenza $x^2+y^2=4$ condotte dal punto $P(4;0)$.`, suggerimenti: [R`Verifica che $P$ sia esterno alla circonferenza.`, R`Scrivi il fascio $y=m(x-4)$ e imponi che la distanza dal centro sia uguale al raggio.`], soluzione: [R`Centro $O(0;0)$, raggio $2$; $OP=4>2$, quindi $P$ è esterno.`, R`Fascio: $mx-y-4m=0$. Distanza da $O$: $\dfrac{|-4m|}{\sqrt{m^2+1}}=2 \Rightarrow 16m^2=4(m^2+1) \Rightarrow 12m^2=4 \Rightarrow m^2=\dfrac13 \Rightarrow m=\pm\dfrac{\sqrt3}{3}$.`, R`La retta verticale $x=4$ ha distanza $4\ne2$ da $O$: non è tangente.`, R`Tangenti: $y=\dfrac{\sqrt3}{3}(x-4)$ e $y=-\dfrac{\sqrt3}{3}(x-4)$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Verifica che le circonferenze $x^2+y^2=9$ e $x^2+y^2-8x+7=0$ sono secanti, e trova l'equazione del loro asse radicale.`, suggerimenti: [R`Trova centri e raggi di entrambe, poi confronta la distanza tra i centri con la somma e la differenza dei raggi.`, R`L'asse radicale si trova sottraendo le due equazioni in forma generale.`], risposta: { tipo: 'testo', accettate: ['x=2', 'x = 2'] }, soluzione: [R`$\gamma_1$: centro $O(0;0)$, raggio $3$. $\gamma_2$: centro $(4;0)$, raggio $\sqrt{16+0-7}=3$.`, R`Distanza tra i centri: $d=4$. Poiché $0=|3-3|<4<3+3=6$, le circonferenze sono secanti.`, R`Sottraendo le equazioni: $(0-(-8))x+(0-0)y+(-9-7)=0 \Rightarrow 8x-16=0 \Rightarrow x=2$.`] },

    { id: 'es-09', difficolta: 3, testo: R`La circonferenza ha come diametro il segmento di estremi $A(-2;5)$ e $B(4;-3)$. Qual è il suo raggio?`, suggerimenti: [R`Il centro è il punto medio di $AB$; il raggio è metà della lunghezza di $AB$.`, R`$AB=\sqrt{(4-(-2))^2+(-3-5)^2}$.`], risposta: { tipo: 'numero', valore: 5 }, soluzione: [R`$AB=\sqrt{6^2+(-8)^2}=\sqrt{36+64}=\sqrt{100}=10$.`, R`Raggio $=\dfrac{AB}{2}=5$. (Centro: punto medio $=(1;1)$; equazione: $x^2+y^2-2x-2y-23=0$.)`] },

    { id: 'es-10', difficolta: 3, testo: R`Per quali valori del parametro $k$ la retta $y=x+k$ è tangente alla circonferenza $x^2+y^2=8$?`, suggerimenti: [R`Scrivi la retta in forma implicita e imponi che la distanza dal centro sia uguale al raggio.`, R`In alternativa, sostituisci nell'equazione della circonferenza e imponi $\Delta=0$.`], risposta: { tipo: 'numeri', valori: [4, -4] }, soluzione: [R`Retta: $x-y+k=0$. Raggio: $r=\sqrt8=2\sqrt2$. Distanza dal centro $O$: $\dfrac{|k|}{\sqrt2}=2\sqrt2 \Rightarrow |k|=4 \Rightarrow k=\pm4$.`, R`Verifica con il $\Delta$: sostituendo, $2x^2+2kx+k^2-8=0$, $\Delta=4k^2-8(k^2-8)=-4k^2+64$; $\Delta=0 \Rightarrow k^2=16 \Rightarrow k=\pm4$.`] },

    { id: 'es-11', difficolta: 3, testo: R`Scrivi, nella forma «$x;y$», le coordinate del punto della circonferenza $x^2+y^2=25$ più vicino al punto $A(8;6)$.`, suggerimenti: [R`Il punto cercato sta sul segmento che unisce il centro $O$ ad $A$, alla distanza $r$ da $O$.`, R`Calcola prima $OA$, poi scala il vettore $A-O$ fino a lunghezza $r$.`], risposta: { tipo: 'numeri', valori: [4, 3] }, soluzione: [R`Centro $O(0;0)$, raggio $r=5$. $OA=\sqrt{8^2+6^2}=\sqrt{100}=10$.`, R`Il punto più vicino è $O+r\cdot\dfrac{A-O}{OA}=5\cdot\dfrac{(8;6)}{10}=(4;3)$.`, R`Verifica: $4^2+3^2=16+9=25$ ✓.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Qual è la condizione sui coefficienti $a$, $b$, $c$ perché $x^2+y^2+ax+by+c=0$ rappresenti una vera circonferenza?`, opzioni: [R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$`, R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}-c\ge0$`, R`$a^2+b^2-c>0$`, R`$\dfrac{a^2}{4}+\dfrac{b^2}{4}+c>0$`], corretta: 0, spiegazione: R`Il raggio è $r=\sqrt{a^2/4+b^2/4-c}$: serve che sotto radice ci sia un numero positivo, non solo non negativo (altrimenti si avrebbe un punto, non una vera circonferenza). Le altre opzioni hanno un coefficiente o un segno sbagliato su $c$.` },
    { id: 'q-02', domanda: R`Il centro della circonferenza $x^2+y^2+ax+by+c=0$ è…`, opzioni: [R`$\left(\dfrac{a}{2};\dfrac{b}{2}\right)$`, R`$(a;b)$`, R`$(-a;-b)$`, R`$\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$`], corretta: 3, spiegazione: R`Espandendo la forma canonica si trova $a=-2\alpha$ e $b=-2\beta$, quindi $\alpha=-\dfrac{a}{2}$ e $\beta=-\dfrac{b}{2}$. Le altre opzioni dimenticano il segno meno o il fattore $\dfrac12$.` },
    { id: 'q-03', domanda: R`Una circonferenza $x^2+y^2+ax+by+c=0$ passa per l'origine se e solo se…`, opzioni: [R`$a=0$`, R`$b=0$`, R`$a=b=0$`, R`$c=0$`], corretta: 3, spiegazione: R`Sostituendo $x=0$, $y=0$ nell'equazione generale resta solo il termine $c$: è soddisfatta esattamente quando $c=0$, qualunque siano $a$ e $b$.` },
    { id: 'q-04', domanda: R`Il centro di una circonferenza sta sull'asse delle ordinate ($y$) quando…`, opzioni: [R`$a=0$`, R`$b=0$`, R`$c=0$`, R`$a=b$`], corretta: 0, spiegazione: R`Il centro è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$: sta sull'asse $y$ quando la sua ascissa è nulla, cioè quando $a=0$.` },
    { id: 'q-05', domanda: R`Se il centro di una circonferenza è nell'origine, l'equazione generale si riduce a…`, opzioni: [R`$x^2+y^2+ax+by=0$`, R`$x^2+y^2+c=0$ con $c<0$`, R`$x^2+y^2+c=0$ con $c>0$`, R`$x^2+y^2=0$`], corretta: 1, spiegazione: R`Centro nell'origine significa $a=b=0$: resta $x^2+y^2+c=0$, cioè $x^2+y^2=-c$. Perché $-c$ sia un raggio al quadrato positivo serve $c<0$.` },
    { id: 'q-06', domanda: R`Una retta è tangente a una circonferenza quando…`, opzioni: [R`la distanza del centro dalla retta è minore del raggio`, R`la distanza del centro dalla retta è uguale al raggio`, R`la distanza del centro dalla retta è maggiore del raggio`, R`il discriminante dell'equazione risolvente è positivo`], corretta: 1, spiegazione: R`$d=r$ è la condizione di tangenza. $d<r$ dà una retta secante, $d>r$ una retta esterna; $\Delta>0$ corrisponde al caso secante, non a quello tangente.` },
    { id: 'q-07', domanda: R`Sostituendo l'equazione di una retta in quella di una circonferenza si ottiene un'equazione di secondo grado. Se $\Delta<0$, la retta è…`, opzioni: [R`secante`, R`tangente`, R`esterna`, R`passante per il centro`], corretta: 2, spiegazione: R`$\Delta<0$ significa che l'equazione risolvente non ha soluzioni reali, cioè non ci sono punti in comune: la retta è esterna alla circonferenza.` },
    { id: 'q-08', domanda: R`La tangente a una circonferenza in un suo punto $P_0$ è…`, opzioni: [R`parallela al raggio $CP_0$`, R`perpendicolare al raggio $CP_0$`, R`la bisettrice dell'angolo in $P_0$`, R`sempre orizzontale`], corretta: 1, spiegazione: R`È una proprietà elementare della circonferenza: la tangente in un punto è sempre perpendicolare al raggio che unisce il centro a quel punto.` },
    { id: 'q-09', domanda: R`Da un punto esterno a una circonferenza si possono condurre…`, opzioni: [R`infinite rette tangenti`, R`una sola retta tangente`, R`due rette tangenti`, R`nessuna retta tangente`], corretta: 2, spiegazione: R`Da un punto esterno esistono sempre esattamente due rette tangenti alla circonferenza (da un punto della circonferenza ce n'è una sola, da un punto interno nessuna).` },
    { id: 'q-10', domanda: R`Cercando le tangenti da un punto esterno con il fascio $y-y_1=m(x-x_1)$, perché bisogna controllare a parte la retta verticale?`, opzioni: [R`perché la retta verticale non ha centro`, R`perché quel fascio non contiene la retta verticale, che non ha coefficiente angolare $m$`, R`perché la retta verticale è sempre tangente`, R`perché la retta verticale è sempre esterna`], corretta: 1, spiegazione: R`La scrittura $y-y_1=m(x-x_1)$ descrive tutte le rette per $P_1$ tranne quella verticale, che va controllata a parte confrontando la sua distanza dal centro con il raggio.` },
    { id: 'q-11', domanda: R`Due circonferenze di raggi $r_1$, $r_2$ e distanza tra i centri $d$ sono secanti quando…`, opzioni: [R`$d=r_1+r_2$`, R`$d>r_1+r_2$`, R`$|r_1-r_2|<d<r_1+r_2$`, R`$d<|r_1-r_2|$`], corretta: 2, spiegazione: R`Le circonferenze si intersecano in due punti esattamente quando la distanza tra i centri è minore della somma dei raggi e maggiore del valore assoluto della loro differenza.` },
    { id: 'q-12', domanda: R`L'asse radicale di due circonferenze $x^2+y^2+a_1x+b_1y+c_1=0$ e $x^2+y^2+a_2x+b_2y+c_2=0$ si ottiene…`, opzioni: [R`sommando le due equazioni`, R`sottraendo le due equazioni`, R`moltiplicando le due equazioni`, R`risolvendo il sistema per sostituzione`], corretta: 1, spiegazione: R`Sottraendo le due equazioni i termini $x^2+y^2$, uguali in entrambe, si eliminano: resta un'equazione di primo grado, cioè una retta.` },
    { id: 'q-13', domanda: R`Se due circonferenze sono secanti, l'asse radicale è…`, opzioni: [R`una retta esterna a entrambe`, R`la retta dei centri`, R`la retta che passa per i due punti di intersezione`, R`sempre parallela all'asse $x$`], corretta: 2, spiegazione: R`Quando le circonferenze si intersecano in due punti, l'asse radicale coincide con la corda comune; è invece sempre perpendicolare alla retta dei centri, non parallela a un asse in generale.` },
    { id: 'q-14', domanda: R`In un fascio $(x^2+y^2+a_1x+b_1y+c_1)+k(x^2+y^2+a_2x+b_2y+c_2)=0$, per quale valore di $k$ si ottiene una retta invece di una circonferenza?`, opzioni: [R`$k=0$`, R`$k=1$`, R`$k=-1$`, R`per nessun valore di $k$`], corretta: 2, spiegazione: R`Per $k=-1$ i termini $x^2+y^2$ si cancellano esattamente: resta l'equazione dell'asse radicale, una retta. È l'unico elemento degenere del fascio.` },
    { id: 'q-15', domanda: R`Per determinare l'equazione di una circonferenza per tre punti non allineati si impone che…`, opzioni: [R`i tre punti abbiano lo stesso centro`, R`le coordinate di ciascun punto soddisfino $x^2+y^2+ax+by+c=0$, ottenendo un sistema lineare in $a,b,c$`, R`la somma delle coordinate sia costante`, R`il discriminante di ciascun punto sia nullo`], corretta: 1, spiegazione: R`Sostituendo ogni punto nell'equazione generale si ottengono tre equazioni lineari (non quadratiche, perché $x^2$ e $y^2$ diventano numeri noti) nelle incognite $a$, $b$, $c$.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Il centro non è $(a;b)$ né $\left(\dfrac{a}{2};\dfrac{b}{2}\right)$: è $\left(-\dfrac{a}{2};-\dfrac{b}{2}\right)$. Il segno meno si dimentica facilmente.` },
    { tipo: 'errore', testo: R`Prima di calcolare centro e raggio, controlla la condizione di esistenza $\dfrac{a^2}{4}+\dfrac{b^2}{4}-c>0$: se non vale, quell'equazione non è una vera circonferenza.` },
    { tipo: 'metodo', testo: R`Per la posizione retta-circonferenza scegli il metodo più comodo: la distanza se conosci già centro e raggio, il $\Delta$ se devi comunque trovare i punti di intersezione.` },
    { tipo: 'trucco', testo: R`Se un punto $P_0$ dovrebbe stare sulla circonferenza, verificalo sempre sostituendo le sue coordinate nell'equazione prima di cercare la tangente: un errore di partenza rovina tutto il resto.` },
    { tipo: 'errore', testo: R`Le tangenti da un punto esterno cercate con $y-y_1=m(x-x_1)$ non includono la retta verticale per quel punto: va controllata a parte.` },
    { tipo: 'metodo', testo: R`Nella formula di sdoppiamento, il termine $x^2$ diventa $x\,x_0$ e il termine $x$ diventa $\dfrac{x+x_0}{2}$; stessa idea per $y$. Vale solo se $P_0$ è davvero sulla circonferenza.` },
    { tipo: 'trucco', testo: R`Per l'asse radicale basta sottrarre le due equazioni in forma generale: i termini $x^2+y^2$ spariscono sempre, qualunque siano i coefficienti.` },
    { tipo: 'errore', testo: R`Non confondere l'asse radicale con la retta dei centri: sono perpendicolari fra loro, non la stessa retta.` },
    { tipo: 'metodo', testo: R`Per l'equazione di una circonferenza per tre punti, imposta il sistema lineare in $a,b,c$ e risolvilo per sostituzione: sono equazioni di primo grado, anche se i punti hanno coordinate qualsiasi.` }
  ],

  aneddoti: [
    { matematico: 'Archimede', anni: '287–212 a.C.', titolo: 'I poligoni di 96 lati e il calcolo di pi greco', testo: R`Ad Archimede serviva un modo per calcolare $\pi$ senza poterlo misurare direttamente: scelse di inscrivere e circoscrivere alla circonferenza dei poligoni regolari con sempre più lati, partendo da un esagono e raddoppiando ogni volta i lati fino ad arrivare a poligoni di 96 lati. Il perimetro del poligono inscritto è sempre minore della circonferenza, quello del poligono circoscritto sempre maggiore: stringendo il confronto passo dopo passo, Archimede dimostrò che $\pi$ sta tra $3\frac{10}{71}$ e $3\frac{1}{7}$, cioè tra circa 3,1408 e 3,1429. Per farlo dovette calcolare a mano radici quadrate sempre più precise, senza numeri decimali né calcolatrici: un lavoro di una pazienza quasi incredibile.`, legame: R`Il metodo di Archimede stringe fra due poligoni proprio la figura di cui in questa scheda si studia l'equazione: la circonferenza.` },
    { matematico: 'Apollonio di Perga', anni: 'circa 262–190 a.C.', titolo: 'Il problema delle tre circonferenze', testo: R`Apollonio, soprannominato "il Grande Geometra" per il suo trattato sulle Coniche, scrisse anche un'opera dedicata a un problema elegante: date tre circonferenze qualsiasi nel piano, costruire con riga e compasso una quarta circonferenza tangente a tutte e tre. Il problema ammette, in generale, fino a otto circonferenze soluzione (una per ogni combinazione di tangenza interna o esterna alle tre date), e restò una sfida di costruzione per quasi duemila anni: solo nel Cinquecento e Seicento matematici come Viète e poi Descartes trovarono soluzioni complete, usando l'algebra più che la sola geometria.`, legame: R`È il problema più famoso sulla posizione reciproca di più circonferenze, lo stesso tema — tangenza, distanza tra centri — trattato in questa scheda per due circonferenze.` },
    { matematico: 'Ferdinand von Lindemann', anni: '1852–1939', titolo: 'La quadratura del cerchio, impossibile per sempre', testo: R`Per oltre duemila anni i matematici cercarono di risolvere la «quadratura del cerchio»: costruire, con solo riga e compasso, un quadrato che avesse esattamente l'area di un cerchio dato. Il problema equivale a costruire un segmento lungo $\sqrt{\pi}$, e le costruzioni con riga e compasso possono produrre solo numeri «algebrici» (soluzioni di equazioni a coefficienti interi). Nel 1882 il matematico tedesco Ferdinand von Lindemann dimostrò che $\pi$ è invece un numero **trascendente**, cioè non algebrico: la quadratura del cerchio, di conseguenza, è impossibile in linea di principio, non solo difficile. La dimostrazione chiuse per sempre uno dei tre grandi problemi classici della geometria greca, insieme alla trisezione dell'angolo e alla duplicazione del cubo.`, legame: R`Il numero che compare nell'area e nella lunghezza di ogni circonferenza è proprio $\pi$: la sua natura più profonda ha richiesto duemila anni per essere capita davvero.` },
    { matematico: 'Ludolph van Ceulen', anni: '1540–1610', titolo: 'Le 35 cifre di pi greco sulla tomba', testo: R`Il matematico tedesco-olandese Ludolph van Ceulen dedicò gran parte della vita al calcolo di $\pi$ con il metodo di Archimede, spinto all'estremo: usò poligoni con un numero di lati pari a $2^{62}$ per ottenere 35 cifre decimali corrette, un record che resistette per secoli prima dell'arrivo di metodi più rapidi basati sulle serie infinite. Alla sua morte, nel 1610, quelle 35 cifre furono incise sulla sua lapide nella chiesa di San Pietro a Leida, andata perduta e poi ricostruita nei secoli con lo stesso testo. In Germania e nei Paesi Bassi, ancora oggi, $\pi$ viene talvolta chiamato «numero di Ludolph» (Ludolphsche Zahl) in suo onore.`, legame: R`Van Ceulen ha spinto all'estremo lo stesso metodo di Archimede: più lati ha il poligono, meglio approssima la circonferenza.` }
  ]
});
})();
