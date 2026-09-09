(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'ellisse-iperbole',
  titolo: 'Ellisse e iperbole',

  introduzione: R`Ellisse e iperbole, insieme alla parabola e alla circonferenza, sono le **coniche**: le curve che si ottengono tagliando un cono con un piano, secondo angolazioni diverse. Le studiò per primo in modo sistematico il geometra greco Apollonio di Perga, più di duemila anni prima che qualcuno ne immaginasse un uso pratico.

A cosa servano si è scoperto molto dopo: le orbite dei pianeti e delle comete sono ellissi con il Sole in uno dei due fuochi, alcuni riflettori e certi strumenti medici sfruttano la proprietà per cui tutto ciò che parte da un fuoco converge nell'altro, e l'iperbole descrive per esempio la rotta di una sonda che passa vicino a un pianeta una volta sola, senza restarci legata. Anche una funzione già nota, quella del tipo $y = \dfrac{ax+b}{cx+d}$, nasconde un'iperbole.

In questo argomento le due curve si definiscono come luoghi geometrici, cioè come insiemi di punti che rispettano una condizione sulle distanze da due punti fissi (i fuochi); da lì si ricava l'equazione, e si studiano i parametri che ne descrivono la forma: semiassi, fuochi, eccentricità, asintoti. Per seguire bene servono il piano cartesiano, la distanza fra due punti e l'equazione della circonferenza, di cui ellisse e iperbole sono, in un certo senso, le parenti deformate.`,

  sezioni: [
    { id: 'coniche', titolo: 'Le coniche: sezioni di un cono', testo: R`Un cono circolare retto, tagliato da un piano, può restituire curve diverse a seconda di come il piano è inclinato rispetto all'asse del cono: una circonferenza, un'ellisse, una parabola o un'iperbole. Sono le **coniche**, e il nome viene proprio da questa origine comune.

>* **Conica:** curva ottenuta come intersezione fra un piano e una superficie conica (un cono a doppia falda, cioè con due metà che si toccano nel vertice). Il tipo di curva dipende solo dall'angolo fra il piano di sezione e l'asse del cono.

Se il piano è perpendicolare all'asse si ottiene una circonferenza; inclinandolo, ma restando meno inclinato delle generatrici del cono, si ottiene un'ellisse (la circonferenza ne è il caso particolare in cui il piano resta orizzontale); se il piano è parallelo a una generatrice si ottiene una parabola; se è ancora più inclinato, tanto da tagliare entrambe le falde del cono, si ottengono le due parti (i **rami**) di un'iperbole.

Il matematico greco Apollonio di Perga studiò sistematicamente queste curve nel III secolo a.C., ricavandone le proprietà con la sola geometria, senza coordinate: le coordinate cartesiane e le equazioni che si vedono in questa pagina sono arrivate quasi duemila anni dopo, con Cartesio. Anche i nomi ellisse, parabola e iperbole sono opera di Apollonio, e vengono da un confronto geometrico che si racconta nell'aneddoto qui sotto.

>! Un errore diffuso è pensare che l'ellisse sia «una specie di ovale disegnato a mano» e la parabola «una specie di U»: entrambe hanno una definizione precisa come luogo di punti, non sono forme approssimative da riconoscere a occhio.

Da qui in avanti l'argomento si concentra sulle equazioni e sulle proprietà di ellisse e iperbole; la parabola, già incontrata come grafico di $y = ax^2+bx+c$, è trattata a parte.` },

    { id: 'ellisse-definizione', titolo: "L'ellisse come luogo geometrico", testo: R`Si fissano nel piano due punti $F_1$ e $F_2$, detti **fuochi**, e un numero $2a$ maggiore della loro distanza. L'**ellisse** è l'insieme dei punti $P$ per cui la somma delle distanze dai due fuochi è costante e vale $2a$.

>* **Definizione:** $$PF_1 + PF_2 = 2a, \qquad \text{con } 2a > F_1F_2.$$ Il punto medio di $F_1F_2$ è il **centro** dell'ellisse.

Questa definizione ha un modo molto concreto di essere disegnata, quello del giardiniere: si piantano due chiodi nei fuochi, si lega ai chiodi uno spago lungo $2a$, e si tende lo spago con la punta di una matita muovendola tutt'intorno. Poiché lo spago ha lunghezza fissa, la matita traccia proprio i punti per cui $PF_1+PF_2=2a$: un'ellisse.

[[animazione:ellisse-giardiniere]]

Per esempio, con $F_1(-4;0)$, $F_2(4;0)$ e $2a=10$: il punto $P(0;3)$ appartiene all'ellisse se $PF_1+PF_2=10$. Si calcola $PF_1=\sqrt{16+9}=5$ e $PF_2=\sqrt{16+9}=5$, quindi $PF_1+PF_2=10$: $P$ è sull'ellisse (è anzi uno dei suoi vertici, come si vedrà nella prossima sezione).

Se i due fuochi coincidono ($F_1=F_2$), la condizione diventa $2\,PF_1=2a$, cioè $PF_1=a$ costante: l'ellisse degenera in una **circonferenza** di raggio $a$. È il primo segnale che la circonferenza è un caso particolare di ellisse, non una curva a parte.

>! La somma $2a$ è la lunghezza dello spago, non la distanza fra i fuochi: sono due grandezze diverse, e $2a$ deve sempre essere maggiore di $F_1F_2$, altrimenti lo spago non si tende e la costruzione non ha senso.` },

    { id: 'ellisse-equazione', titolo: 'Equazione canonica, vertici e semiassi', testo: R`Mettendo i fuochi sull'asse $x$, simmetrici rispetto all'origine, $F_1(-c;0)$ e $F_2(c;0)$, e imponendo $PF_1+PF_2=2a$, dopo aver elevato due volte al quadrato per eliminare le radici si arriva a un'equazione senza radicali. Ponendo $b^2=a^2-c^2$ (positivo perché $a>c$), l'equazione diventa:

>* **Equazione canonica dell'ellisse:** $$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$$ Se $a>b$ i fuochi sono sull'asse $x$, con $c^2=a^2-b^2$; se $a<b$ i fuochi sono sull'asse $y$, con $c^2=b^2-a^2$. I numeri $a$ e $b$ si chiamano **semiassi**.

I punti in cui l'ellisse incontra gli assi si chiamano **vertici**: $A(-a;0)$, $A'(a;0)$, $B(0;-b)$, $B'(0;b)$. L'**asse maggiore** è quello che contiene i fuochi (lunghezza $2a$, con $a$ semiasse maggiore), l'**asse minore** è l'altro (lunghezza $2b$).

Esempio: l'ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{9}=1$ ha $a^2=25$ e $b^2=9$, quindi $a=5$, $b=3$; poiché $a>b$ i fuochi sono sull'asse $x$, con $c^2=25-9=16$, cioè $c=4$: $F(-4;0)$, $F'(4;0)$. I vertici sono $A(-5;0)$, $A'(5;0)$, $B(0;-3)$, $B'(0;3)$.

[[grafico:ellisse]]

Il grafico mostra proprio questa ellisse: nota come i fuochi stiano sempre sull'asse più lungo, mai su quello più corto.

>! Il segno sotto $x^2$ e $y^2$ è sempre $+$: un segno meno cambia la curva in un'iperbole (prossime sezioni). L'errore più comune è invece confondere quale dei due denominatori è il maggiore, e quindi mettere i fuochi sull'asse sbagliato.` },

    { id: 'eccentricita', titolo: "L'eccentricità", testo: R`L'**eccentricità** misura quanto un'ellisse è «schiacciata» rispetto a una circonferenza.

>* **Eccentricità:** $$e=\frac{c}{a}$$ dove $a$ è il semiasse maggiore e $c$ la semidistanza focale. Per l'ellisse vale sempre $0 \le e < 1$.

Se $e=0$ allora $c=0$: i due fuochi coincidono nel centro, e l'ellisse è una circonferenza. Se $e$ si avvicina a $1$, i fuochi si allontanano verso i vertici sull'asse maggiore e l'ellisse diventa sempre più schiacciata, quasi un segmento. Non può mai essere $e \ge 1$, perché $c<a$ sempre: altrimenti $b^2=a^2-c^2$ sarebbe negativo o nullo, e l'ellisse non esisterebbe.

Per esempio, l'ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{9}=1$ ha $a=5$ e $c=4$ (calcolati nella sezione precedente), quindi $e=\dfrac45=0{,}8$: piuttosto schiacciata. Un'ellisse quasi circolare, come $\dfrac{x^2}{25}+\dfrac{y^2}{24}=1$, ha invece $c=1$ ed $e=0{,}2$.

Prova a muovere i cursori $a$ e $b$: quando sono vicini l'ellisse è quasi un cerchio ed $e$ è vicino a $0$; allontanandoli, l'ellisse si schiaccia ed $e$ cresce verso $1$.

[[grafico:ellisse-eccentricita]]

L'eccentricità delle orbite dei pianeti del sistema solare è quasi sempre piccola (la Terra ha $e \approx 0{,}017$, quasi una circonferenza), mentre le comete hanno spesso orbite ellittiche molto più eccentriche.

>! $e$ si calcola sempre dividendo per il semiasse **maggiore**, non per quello che compare per primo nell'equazione: se i fuochi sono sull'asse $y$ (cioè $b>a$), è $e=c/b$, non $c/a$.` },

    { id: 'ellisse-retta', titolo: 'Ellisse e retta: intersezioni e tangenti', testo: R`Una retta e un'ellisse possono avere due punti in comune (retta **secante**), un solo punto (retta **tangente**) oppure nessuno (retta **esterna**). Come per la parabola, basta mettere a sistema le due equazioni e guardare il segno del discriminante dell'equazione che ne risulta.

>* Sostituendo $y=mx+q$ nell'equazione dell'ellisse si ottiene un'equazione di secondo grado in $x$. Se $\Delta>0$ la retta è secante, se $\Delta=0$ è tangente, se $\Delta<0$ è esterna.

Per una retta non verticale $y=mx+q$, la condizione di tangenza all'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ si può scrivere senza rifare ogni volta i calcoli del discriminante:

>* **Condizione di tangenza:** $$q^2=a^2m^2+b^2$$

Esempio: la retta $y=x+q$ è tangente all'ellisse $\dfrac{x^2}{3}+y^2=1$ (cioè $a^2=3$, $b^2=1$) quando $q^2=3\cdot1+1=4$, cioè $q=\pm2$: ci sono due rette tangenti parallele, una per ogni lato dell'ellisse.

Quando invece si conosce già un punto $P_0(x_0;y_0)$ dell'ellisse e si vuole la tangente proprio in quel punto, si usa la **formula di sdoppiamento**: si sostituisce $x^2$ con $x\,x_0$ e $y^2$ con $y\,y_0$.

>* **Sdoppiamento:** la tangente all'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ nel suo punto $P_0(x_0;y_0)$ ha equazione $$\frac{x\,x_0}{a^2}+\frac{y\,y_0}{b^2}=1$$

Per esempio, la tangente all'ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{9}=1$ nel punto $P_0(5;0)$ (un vertice) è $\dfrac{5x}{25}+0=1$, cioè $x=5$: la verticale nel vertice, come ci si aspetta.

>! Lo sdoppiamento funziona solo se $P_0$ **appartiene già** all'ellisse: applicarlo a un punto qualunque produce una retta che non è affatto tangente in quel punto.` },

    { id: 'iperbole-definizione', titolo: "L'iperbole: definizione ed equazione", testo: R`Come l'ellisse, ma con una differenza al posto di una somma: dati due fuochi $F_1$, $F_2$ e un numero $2a<F_1F_2$, l'**iperbole** è l'insieme dei punti $P$ per cui il valore assoluto della differenza delle distanze dai due fuochi è costante e vale $2a$.

>* **Definizione:** $$|PF_1 - PF_2| = 2a$$ La curva ha due parti separate, i **rami**: su uno $PF_1-PF_2=2a$, sull'altro $PF_2-PF_1=2a$.

Con gli stessi passaggi visti per l'ellisse (fuochi $F_1(-c;0)$, $F_2(c;0)$ sull'asse $x$), ma ponendo questa volta $b^2=c^2-a^2$ (positivo perché ora $c>a$), si arriva a:

>* **Equazione canonica dell'iperbole:** $$\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$$ con $c^2=a^2+b^2$. I vertici sono $A(-a;0)$, $A'(a;0)$; l'iperbole non tocca l'asse $y$.

L'iperbole ha due **asintoti**, le rette a cui i due rami si avvicinano indefinitamente senza mai toccarle: $$y=\pm\frac{b}{a}x$$

Esempio: $\dfrac{x^2}{4}-\dfrac{y^2}{9}=1$ ha $a=2$, $b=3$, quindi $c^2=4+9=13$, cioè $c=\sqrt{13}\approx3{,}6$: fuochi $F(-\sqrt{13};0)$, $F'(\sqrt{13};0)$, asintoti $y=\pm\dfrac32x$.

[[grafico:iperbole]]

L'**eccentricità** si definisce come per l'ellisse, $e=c/a$, ma qui è sempre $e>1$, perché $c>a$ (con l'iperbole del grafico, $e=\sqrt{13}/2\approx1{,}8$).

Se invece i fuochi stanno sull'**asse $y$**, l'equazione si scrive con $-1$ a destra: $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=-1$, che è la stessa cosa di $\dfrac{y^2}{b^2}-\dfrac{x^2}{a^2}=1$. Gli asintoti restano $y=\pm\dfrac{b}{a}x$ (dipendono solo da $a$ e $b$, non dal segno a destra), ma i vertici sono $(0;-b)$, $(0;b)$ e l'eccentricità è $e=c/b$.

>! A differenza dell'ellisse, qui $c^2=a^2+b^2$ (una **somma**, non una differenza): è l'errore di trascrizione più frequente, complice il fatto che le due formule si assomigliano.` },

    { id: 'iperbole-equilatera', titolo: 'Iperbole equilatera e riferita agli asintoti', testo: R`Quando $a=b$, l'iperbole $\dfrac{x^2}{a^2}-\dfrac{y^2}{a^2}=1$, cioè $x^2-y^2=a^2$, si chiama **equilatera**: i due asintoti diventano $y=\pm x$, due rette perpendicolari fra loro.

>* **Iperbole equilatera:** $a=b$; equazione $x^2-y^2=a^2$; asintoti $y=x$ e $y=-x$, perpendicolari. L'eccentricità vale sempre $e=\sqrt2$, perché $c^2=a^2+b^2=2a^2$.

Se si scelgono come nuovi assi cartesiani proprio i due asintoti (una rotazione di $45°$ rispetto agli assi originali), l'equazione dell'iperbole equilatera diventa molto più semplice:

>* **Iperbole equilatera riferita ai propri asintoti:** $$xy=k, \qquad k \ne 0.$$ Se $k>0$ i rami stanno nel primo e nel terzo quadrante, se $k<0$ nel secondo e nel quarto.

Questa è la forma con cui si incontra più spesso l'iperbole equilatera fuori dalla geometria pura: per esempio la relazione fra pressione e volume di un gas a temperatura costante, $pV=\text{costante}$, oppure quella fra le due dimensioni di un rettangolo di area fissata.

Esempio: l'iperbole $xy=12$ passa per $(3;4)$ perché $3\cdot4=12$; passa anche per $(-2;-6)$ perché $(-2)\cdot(-6)=12$, ma non per $(2;-6)$, dato che $2\cdot(-6)=-12\ne12$.

Prova a cambiare $k$ nel grafico: con $k>0$ i due rami stanno nel primo e nel terzo quadrante, con $k<0$ passano nel secondo e nel quarto; gli assi cartesiani sono proprio i due asintoti.

[[grafico:equilatera]]

>! $xy=k$ e $x^2-y^2=a^2$ sono la **stessa** curva vista in due sistemi di riferimento ruotati fra loro di $45°$: non sono due iperboli equilatere diverse, e hanno infatti la stessa eccentricità $\sqrt2$.` },

    { id: 'omografica', titolo: 'La funzione omografica', testo: R`Una funzione della forma $$y=\frac{ax+b}{cx+d}$$ con $c\ne0$ e $ad-bc\ne0$ si chiama **funzione omografica**. Le due condizioni non sono un dettaglio tecnico: se $c=0$ non c'è nessuna $x$ al denominatore, ed è semplicemente una retta; se $ad=bc$ il numeratore è multiplo del denominatore e la frazione si riduce a una costante (tranne che in un punto escluso).

>* **Funzione omografica:** $y=\dfrac{ax+b}{cx+d}$, con $c\ne0$ e $ad-bc\ne0$. Il suo grafico è un'**iperbole equilatera traslata**, con gli asintoti paralleli agli assi.

Dividendo il numeratore per il denominatore si separa la parte costante dal resto, ed emerge che il grafico ha un asintoto verticale dove si annulla il denominatore, e un asintoto orizzontale dato dal rapporto dei coefficienti di $x$:

>* **Centro e asintoti:** $$x=-\frac{d}{c} \qquad y=\frac{a}{c}$$ Il centro di simmetria dell'iperbole è il punto $\left(-\dfrac{d}{c};\dfrac{a}{c}\right)$, l'incrocio dei due asintoti.

Esempio: $y=\dfrac{2x+1}{x-1}$ ha $a=2$, $b=1$, $c=1$, $d=-1$: asintoto verticale $x=-\dfrac{-1}{1}=1$, asintoto orizzontale $y=\dfrac{2}{1}=2$, centro $(1;2)$.

[[grafico:omografica]]

Si può controllare il risultato anche senza la formula: il denominatore $x-1$ si annulla per $x=1$ (asintoto verticale); per $x$ molto grande, $y\approx\dfrac{2x}{x}=2$ (asintoto orizzontale).

>! L'iperbole equilatera traslata **non tocca mai** i suoi asintoti, ma il denominatore della funzione omografica si annulla proprio nel punto escluso dal dominio: quel valore di $x$ va sempre dichiarato come condizione di esistenza.` },

    { id: 'determinare-equazione', titolo: "Determinare l'equazione dai dati", testo: R`Nei problemi non si parte quasi mai dall'equazione già scritta: si conoscono alcuni dati (un fuoco, un vertice, un punto di passaggio, l'eccentricità) e si deve ricostruire $a$, $b$ (ed eventualmente $c$).

>* Procedimento generale: si decide **quale forma** ha l'equazione (ellisse o iperbole, fuochi su $x$ o su $y$), si traducono i dati in equazioni su $a$, $b$, $c$ usando le relazioni note, e si risolve il sistema.

Esempio (ellisse): trovare l'equazione dell'ellisse con un fuoco in $F(3;0)$ e passante per $P(0;5)$. I fuochi sono sull'asse $x$, quindi $c=3$; il punto $P(0;5)$ è sull'asse $y$, quindi è il vertice $B'(0;b)$: $b=5$. Da $c^2=a^2-b^2$ si ricava $a^2=c^2+b^2=9+25=34$: l'equazione è $\dfrac{x^2}{34}+\dfrac{y^2}{25}=1$.

Esempio (iperbole): trovare l'equazione dell'iperbole con un vertice in $A(4;0)$ e asintoti $y=\pm\dfrac32x$. Da $a=4$ e $\dfrac{b}{a}=\dfrac32$ si ricava $b=6$: l'equazione è $\dfrac{x^2}{16}-\dfrac{y^2}{36}=1$.

Quando il dato è l'**eccentricità** invece di $b$ o $c$ direttamente, conviene partire da $e=c/a$ per esprimere $c$ in funzione di $a$, e sostituirlo nella relazione fra $a$, $b$, $c$: per esempio se $e=\dfrac35$ allora $c=\dfrac35a$, e per l'ellisse $b^2=a^2-c^2=a^2\left(1-\dfrac9{25}\right)=\dfrac{16}{25}a^2$.

Molti problemi applicati (orbite, riflettori, antenne) danno i dati proprio in questa forma mista: una lunghezza e un'eccentricità, oppure due punti di passaggio.

>! Prima di impostare i calcoli, conviene sempre chiedersi se i fuochi sono sull'asse $x$ o sull'asse $y$: si vede da **quale coordinata è nulla** nei dati (un fuoco o un vertice sull'asse $x$ ha ordinata $0$; sull'asse $y$ ha ascissa $0$), non a caso.` }
  ],

  grafici: {
    ellisse: {
      tipo: 'piano', x: [-6, 6], y: [-4, 4], proporzioni: 'uguali',
      elementi: [ { tipo: 'ellisse', centro: [0, 0], a: 5, b: 3 } ],
      punti: [
        { x: -4, y: 0, etichetta: 'F', posizione: 'basso', colore: 2 },
        { x: 4, y: 0, etichetta: "F'", posizione: 'basso', colore: 2 },
        { x: -5, y: 0, etichetta: 'A', posizione: 'basso', colore: 4 },
        { x: 5, y: 0, etichetta: "A'", posizione: 'basso', colore: 4 },
        { x: 0, y: -3, etichetta: 'B', posizione: 'sinistra', colore: 4 },
        { x: 0, y: 3, etichetta: "B'", posizione: 'sinistra', colore: 4 }
      ],
      didascalia: "L'ellisse x²/25 + y²/9 = 1: i fuochi F, F' stanno sull'asse maggiore, a distanza c = 4 dal centro; A, A', B, B' sono i vertici."
    },
    'ellisse-eccentricita': {
      tipo: 'piano', x: [-7, 7], y: [-7, 7], proporzioni: 'uguali',
      parametri: [
        { nome: 'a', min: 1, max: 6, passo: 0.5, valore: 5, etichetta: 'a' },
        { nome: 'b', min: 1, max: 6, passo: 0.5, valore: 3, etichetta: 'b' }
      ],
      elementi: [
        { tipo: 'ellisse', centro: [0, 0], a: 'a', b: 'b' },
        { tipo: 'testo', p: [-6.7, 6.2], testo: 'e = {{sqrt(abs(a^2-b^2))/max(a,b)}}', ancora: 'start' }
      ],
      didascalia: "Trascina i cursori a e b: quando sono uguali l'ellisse è una circonferenza (e = 0); allontanandoli, l'ellisse si schiaccia ed e cresce verso 1."
    },
    iperbole: {
      tipo: 'piano', x: [-9, 9], y: [-9, 9], proporzioni: 'uguali',
      funzioni: [
        { f: '3*sqrt(x^2/4-1)', etichetta: 'x²/4 − y²/9 = 1', colore: 1, dominio: [2, 8] },
        { f: '-3*sqrt(x^2/4-1)', colore: 1, dominio: [2, 8] },
        { f: '3*sqrt(x^2/4-1)', colore: 1, dominio: [-8, -2] },
        { f: '-3*sqrt(x^2/4-1)', colore: 1, dominio: [-8, -2] }
      ],
      elementi: [
        { tipo: 'retta', m: 1.5, q: 0, tratteggio: true, colore: 3, etichetta: 'y = 1,5x' },
        { tipo: 'retta', m: -1.5, q: 0, tratteggio: true, colore: 3, etichetta: 'y = −1,5x' }
      ],
      punti: [
        { x: 'sqrt(13)', y: 0, etichetta: 'F', posizione: 'basso', colore: 2 },
        { x: '-sqrt(13)', y: 0, etichetta: "F'", posizione: 'basso', colore: 2 }
      ],
      didascalia: "L'iperbole x²/4 − y²/9 = 1 con i suoi asintoti y = ±1,5x e i fuochi F, F' (c = √13 ≈ 3,6)."
    },
    equilatera: {
      tipo: 'piano', x: [-8, 8], y: [-8, 8], proporzioni: 'uguali',
      parametri: [ { nome: 'k', min: -6, max: 6, passo: 1, valore: 4, etichetta: 'k' } ],
      funzioni: [ { f: 'k/x', etichetta: 'y = k / x', colore: 1 } ],
      elementi: [ { tipo: 'testo', p: [-7.6, 7.2], testo: 'x·y = {{k}}', ancora: 'start' } ],
      didascalia: "L'iperbole equilatera xy = k riferita ai propri asintoti (gli assi cartesiani). Con k > 0 i rami stanno nel I e III quadrante, con k < 0 nel II e IV."
    },
    omografica: {
      tipo: 'piano', x: [-6, 8], y: [-6, 10],
      funzioni: [ { f: '(2*x+1)/(x-1)', etichetta: 'y = (2x + 1) / (x − 1)', colore: 1 } ],
      elementi: [
        { tipo: 'verticale', x: 1, asintoto: true, etichetta: 'x = 1' },
        { tipo: 'orizzontale', y: 2, asintoto: true, etichetta: 'y = 2' },
        { tipo: 'punto', p: [1, 2], etichetta: 'C', posizione: 'alto-destra', colore: 4 }
      ],
      didascalia: "La funzione omografica y = (2x + 1)/(x − 1): iperbole equilatera traslata, con centro C(1; 2) e asintoti x = 1, y = 2."
    }
  },

  esempi: [
    { titolo: R`Fuochi ed eccentricità di un'ellisse`, problema: R`Data l'ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{16}=1$, trova semiassi, vertici, fuochi ed eccentricità.`, passi: [
      R`$a^2=25$ e $b^2=16$, quindi $a=5$ e $b=4$. Poiché $a>b$, i fuochi sono sull'asse $x$.`,
      R`Vertici: $A(-5;0)$, $A'(5;0)$, $B(0;-4)$, $B'(0;4)$.`,
      R`$c^2=a^2-b^2=25-16=9$, quindi $c=3$: fuochi $F(-3;0)$, $F'(3;0)$.`,
      R`Eccentricità: $e=c/a=3/5=0{,}6$.`
    ], risultato: R`$a=5,\ b=4,\ c=3,\ F(\pm3;0),\ e=0{,}6$` },

    { titolo: "Un'ellisse con i fuochi sull'asse y", problema: R`Data l'ellisse $\dfrac{x^2}{4}+\dfrac{y^2}{13}=1$, trova le coordinate dei fuochi e l'eccentricità.`, passi: [
      R`Sotto $y^2$ c'è il numero maggiore ($13>4$): i fuochi sono sull'asse $y$. Qui $a^2=13$ (semiasse maggiore) e $b^2=4$.`,
      R`$c^2=a^2-b^2=13-4=9$, quindi $c=3$: fuochi $F(0;-3)$, $F'(0;3)$.`,
      R`Eccentricità: $e=c/a=3/\sqrt{13}\approx0{,}83$.`
    ], risultato: R`$F(0;\pm3),\ e\approx0{,}83$` },

    { titolo: R`Rette tangenti a un'ellisse da un punto esterno`, problema: R`Determina per quali valori di $m$ la retta $y=mx+2$ è tangente all'ellisse $\dfrac{x^2}{3}+y^2=1$.`, passi: [
      R`La retta ha $q=2$; l'ellisse ha $a^2=3$, $b^2=1$. Condizione di tangenza: $q^2=a^2m^2+b^2$.`,
      R`$4=3m^2+1$, quindi $3m^2=3$, cioè $m^2=1$.`,
      R`$m=1$ oppure $m=-1$: due rette tangenti, simmetriche rispetto all'asse $y$.`
    ], risultato: R`$m=1 \lor m=-1$` },

    { titolo: R`Tangente a un'ellisse in un suo punto`, problema: R`Scrivi la tangente all'ellisse $\dfrac{x^2}{8}+\dfrac{y^2}{2}=1$ nel suo punto $P_0(2;1)$.`, passi: [
      R`Verifico che $P_0$ sia sull'ellisse: $\dfrac{4}{8}+\dfrac{1}{2}=0{,}5+0{,}5=1$. ✓`,
      R`Sdoppiamento: sostituisco $x^2\to x\cdot x_0=2x$ e $y^2\to y\cdot y_0=y$: $\dfrac{2x}{8}+\dfrac{y}{2}=1$.`,
      R`Semplifico: $\dfrac{x}{4}+\dfrac{y}{2}=1$, e moltiplicando per $4$: $x+2y=4$.`
    ], risultato: R`$x+2y=4$` },

    { titolo: R`Vertici, fuochi e asintoti di un'iperbole`, problema: R`Data l'iperbole $\dfrac{x^2}{9}-\dfrac{y^2}{16}=1$, trova vertici, fuochi, asintoti ed eccentricità.`, passi: [
      R`$a^2=9$, $b^2=16$: $a=3$, $b=4$. Vertici $A(-3;0)$, $A'(3;0)$.`,
      R`$c^2=a^2+b^2=9+16=25$, $c=5$: fuochi $F(-5;0)$, $F'(5;0)$.`,
      R`Asintoti: $y=\pm\dfrac{b}{a}x=\pm\dfrac43x$.`,
      R`Eccentricità: $e=c/a=5/3\approx1{,}67$.`
    ], risultato: R`$A(\pm3;0),\ F(\pm5;0),\ y=\pm\dfrac43x,\ e\approx1{,}67$` },

    { titolo: 'Centro e asintoti di una funzione omografica', problema: R`Della funzione $y=\dfrac{3x-1}{x+2}$ trova centro di simmetria e asintoti.`, passi: [
      R`Confronto con $y=\dfrac{ax+b}{cx+d}$: $a=3$, $b=-1$, $c=1$, $d=2$. Controllo $ad-bc=3\cdot2-(-1)\cdot1=6+1=7\ne0$: è davvero una funzione omografica.`,
      R`Asintoto verticale: si annulla il denominatore, $x+2=0$, cioè $x=-2$.`,
      R`Asintoto orizzontale: $y=\dfrac{a}{c}=\dfrac31=3$.`,
      R`Centro di simmetria: $(-2;3)$, l'incrocio dei due asintoti.`
    ], risultato: R`Centro $(-2;3)$, asintoti $x=-2$ e $y=3$` }
  ],

  formulario: [
    { nome: R`Equazione canonica dell'ellisse`, formula: R`\frac{x^2}{a^2}+\frac{y^2}{b^2}=1`, nota: R`Fuochi sull'asse $x$ se $a>b$, sull'asse $y$ se $a<b$.` },
    { nome: R`Ellisse, fuochi sull'asse x`, formula: R`c^2=a^2-b^2 \quad (a>b>0)` },
    { nome: R`Ellisse, fuochi sull'asse y`, formula: R`c^2=b^2-a^2 \quad (b>a>0)` },
    { nome: R`Eccentricità dell'ellisse`, formula: R`e=\frac{c}{a}`, nota: R`Oppure $e=c/b$ se i fuochi sono sull'asse $y$. Vale sempre $0 \le e < 1$.` },
    { nome: R`Tangente per sdoppiamento (ellisse)`, formula: R`\frac{x\,x_0}{a^2}+\frac{y\,y_0}{b^2}=1`, nota: R`Tangente all'ellisse nel suo punto $P_0(x_0;y_0)$.` },
    { nome: R`Condizione di tangenza retta-ellisse`, formula: R`q^2=a^2m^2+b^2`, nota: R`Per la retta $y=mx+q$ tangente a $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$.` },
    { nome: R`Equazione canonica dell'iperbole (fuochi sull'asse x)`, formula: R`\frac{x^2}{a^2}-\frac{y^2}{b^2}=1` },
    { nome: R`Iperbole con i fuochi sull'asse y`, formula: R`\frac{x^2}{a^2}-\frac{y^2}{b^2}=-1`, nota: R`Equivalente a $\frac{y^2}{b^2}-\frac{x^2}{a^2}=1$: stessi asintoti, fuochi e vertici sull'asse $y$.` },
    { nome: R`Relazione fondamentale dell'iperbole`, formula: R`c^2=a^2+b^2` },
    { nome: R`Eccentricità dell'iperbole`, formula: R`e=\frac{c}{a}`, nota: R`Sempre $e>1$, perché $c>a$.` },
    { nome: R`Asintoti dell'iperbole`, formula: R`y=\pm\frac{b}{a}x` },
    { nome: R`Iperbole equilatera riferita agli asintoti`, formula: R`xy=k`, nota: R`Curva $x^2-y^2=a^2$ vista negli assi dei propri asintoti.` },
    { nome: R`Funzione omografica: centro e asintoti`, formula: R`x=-\frac{d}{c}, \quad y=\frac{a}{c}`, nota: R`Per $y=\frac{ax+b}{cx+d}$, con $c \ne 0$ e $ad-bc \ne 0$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'coniche', tipo: 'definizione', fronte: R`Che cos'è una conica?`, retro: R`Una curva ottenuta intersecando un cono a doppia falda con un piano; il tipo dipende dall'inclinazione del piano rispetto all'asse del cono.` },
    { id: 'fc-02', sezione: 'coniche', tipo: 'concetto', fronte: R`Quali sono le quattro coniche?`, retro: R`Circonferenza, ellisse, parabola e iperbole, a seconda dell'angolo del piano di sezione.` },
    { id: 'fc-03', sezione: 'ellisse-definizione', tipo: 'definizione', fronte: R`Definizione di ellisse come luogo`, retro: R`$PF_1+PF_2=2a$: l'insieme dei punti la cui somma delle distanze da due fuochi fissi è costante.` },
    { id: 'fc-04', sezione: 'ellisse-definizione', tipo: 'concetto', fronte: R`Cosa succede se i due fuochi di un'ellisse coincidono?`, retro: R`L'ellisse degenera in una circonferenza di raggio $a$.` },
    { id: 'fc-05', sezione: 'ellisse-equazione', tipo: 'formula', fronte: R`Equazione canonica dell'ellisse`, retro: R`$\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$` },
    { id: 'fc-06', sezione: 'ellisse-equazione', tipo: 'concetto', fronte: R`Come si capisce su quale asse sono i fuochi di un'ellisse?`, retro: R`Sull'asse del denominatore maggiore: se $a>b$ sono sull'asse $x$, se $a<b$ sull'asse $y$.` },
    { id: 'fc-07', sezione: 'ellisse-equazione', tipo: 'formula', fronte: R`Relazione fra a, b, c nell'ellisse (fuochi sull'asse x)`, retro: R`$c^2=a^2-b^2$, con $a>b>0$.` },
    { id: 'fc-08', sezione: 'ellisse-equazione', tipo: 'definizione', fronte: R`Vertici dell'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, retro: R`$A(-a;0)$, $A'(a;0)$ sull'asse maggiore; $B(0;-b)$, $B'(0;b)$ sull'asse minore.` },
    { id: 'fc-09', sezione: 'eccentricita', tipo: 'formula', fronte: R`Eccentricità dell'ellisse`, retro: R`$e=c/a$ (oppure $c/b$ se i fuochi sono sull'asse $y$), sempre $0\le e<1$.` },
    { id: 'fc-10', sezione: 'eccentricita', tipo: 'concetto', fronte: R`Che forma ha un'ellisse con e vicino a 0?`, retro: R`È quasi una circonferenza: i fuochi sono vicini al centro.` },
    { id: 'fc-11', sezione: 'eccentricita', tipo: 'concetto', fronte: R`Che forma ha un'ellisse con e vicino a 1?`, retro: R`È molto schiacciata: i fuochi sono vicini ai vertici sull'asse maggiore.` },
    { id: 'fc-12', sezione: 'ellisse-retta', tipo: 'formula', fronte: R`Condizione di tangenza fra $y=mx+q$ e l'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, retro: R`$q^2=a^2m^2+b^2$.` },
    { id: 'fc-13', sezione: 'ellisse-retta', tipo: 'procedura', fronte: R`Formula di sdoppiamento per la tangente in un punto dell'ellisse`, retro: R`Nel punto $P_0(x_0;y_0)$ dell'ellisse: $\dfrac{x\,x_0}{a^2}+\dfrac{y\,y_0}{b^2}=1$.` },
    { id: 'fc-14', sezione: 'iperbole-definizione', tipo: 'definizione', fronte: R`Definizione di iperbole come luogo`, retro: R`$|PF_1-PF_2|=2a$: l'insieme dei punti per cui il valore assoluto della differenza delle distanze da due fuochi fissi è costante.` },
    { id: 'fc-15', sezione: 'iperbole-definizione', tipo: 'formula', fronte: R`Equazione canonica dell'iperbole (fuochi sull'asse x)`, retro: R`$\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$` },
    { id: 'fc-16', sezione: 'iperbole-definizione', tipo: 'formula', fronte: R`Relazione fra a, b, c nell'iperbole`, retro: R`$c^2=a^2+b^2$ (una somma, a differenza dell'ellisse).` },
    { id: 'fc-17', sezione: 'iperbole-definizione', tipo: 'formula', fronte: R`Asintoti dell'iperbole $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$`, retro: R`$y=\pm\dfrac{b}{a}x$.` },
    { id: 'fc-18', sezione: 'iperbole-definizione', tipo: 'concetto', fronte: R`Perché l'eccentricità dell'iperbole è sempre maggiore di 1?`, retro: R`Perché $c>a$, dato che $c^2=a^2+b^2>a^2$.` },
    { id: 'fc-19', sezione: 'iperbole-definizione', tipo: 'concetto', fronte: R`Iperbole con i fuochi sull'asse y`, retro: R`Si scrive $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=-1$ (equivalente a $\dfrac{y^2}{b^2}-\dfrac{x^2}{a^2}=1$): stessi asintoti, fuochi e vertici sull'asse $y$.` },
    { id: 'fc-20', sezione: 'iperbole-equilatera', tipo: 'definizione', fronte: R`Iperbole equilatera`, retro: R`Iperbole con $a=b$: equazione $x^2-y^2=a^2$, asintoti perpendicolari $y=\pm x$, eccentricità $\sqrt2$.` },
    { id: 'fc-21', sezione: 'iperbole-equilatera', tipo: 'formula', fronte: R`Iperbole equilatera riferita ai propri asintoti`, retro: R`$xy=k$: gli assi cartesiani coincidono con gli asintoti.` },
    { id: 'fc-22', sezione: 'omografica', tipo: 'definizione', fronte: R`Funzione omografica`, retro: R`$y=\dfrac{ax+b}{cx+d}$, con $c\ne0$ e $ad-bc\ne0$: il suo grafico è un'iperbole equilatera traslata.` },
    { id: 'fc-23', sezione: 'omografica', tipo: 'formula', fronte: R`Centro e asintoti della funzione omografica $y=\dfrac{ax+b}{cx+d}$`, retro: R`Asintoto verticale $x=-d/c$, asintoto orizzontale $y=a/c$; centro $\left(-\dfrac{d}{c};\dfrac{a}{c}\right)$.` },
    { id: 'fc-24', sezione: 'omografica', tipo: 'concetto', fronte: R`Perché serve $ad-bc\ne0$ nella funzione omografica?`, retro: R`Se $ad=bc$ la frazione si riduce a una costante: non è più un'iperbole, ma una retta orizzontale privata di un punto.` },
    { id: 'fc-25', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Come trovare l'equazione di un'ellisse o iperbole dai dati?`, retro: R`Si individua l'orientamento (fuochi su $x$ o su $y$), si traducono i dati in equazioni su $a$, $b$, $c$ con le relazioni note, e si risolve il sistema.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Data l'ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{9}=1$, trova le coordinate del fuoco di ascissa positiva (x; y).`, suggerimenti: [R`I fuochi sono sull'asse del denominatore maggiore.`, R`Calcola $c$ con $c^2=a^2-b^2$.`], risposta: { tipo: 'numeri', valori: [4, 0] }, soluzione: [R`$a^2=25$, $b^2=9$, quindi $a=5$, $b=3$: poiché $a>b$ i fuochi sono sull'asse $x$.`, R`$c^2=25-9=16$, $c=4$: il fuoco di ascissa positiva è $F'(4;0)$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Per la stessa ellisse $\dfrac{x^2}{25}+\dfrac{y^2}{9}=1$, calcola l'eccentricità.`, suggerimenti: [R`$e=c/a$: hai già trovato $a$ e $c$ nell'esercizio precedente.`, R`$a=5$, $c=4$.`], risposta: { tipo: 'numero', valore: 0.8, tolleranza: 0.01 }, soluzione: [R`$a=5$ e $c=4$ (vedi sopra).`, R`$e=c/a=4/5=0{,}8$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Data l'ellisse $\dfrac{x^2}{9}+\dfrac{y^2}{25}=1$, trova le coordinate del fuoco di ordinata positiva (x; y).`, suggerimenti: [R`Qui il denominatore maggiore è sotto $y^2$: i fuochi sono sull'asse $y$.`, R`$a^2=25$ (sotto $y^2$), $b^2=9$: usa $c^2=a^2-b^2$.`], risposta: { tipo: 'numeri', valori: [0, 4] }, soluzione: [R`Sotto $y^2$ c'è $25>9$: i fuochi sono sull'asse $y$, con $a^2=25$, $b^2=9$.`, R`$c^2=25-9=16$, $c=4$: il fuoco di ordinata positiva è $F'(0;4)$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Scrivi l'equazione dell'ellisse con centro nell'origine, semiasse maggiore $6$ sull'asse $x$ e semiasse minore $4$.`, suggerimenti: [R`L'equazione canonica è $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$.`, R`Qui $a=6$ (sull'asse $x$) e $b=4$.`], risposta: { tipo: 'testo', accettate: ['x^2/36+y^2/16=1', 'x²/36+y²/16=1'] }, soluzione: [R`Semiasse maggiore $a=6$ sull'asse $x$, semiasse minore $b=4$.`, R`Equazione: $\dfrac{x^2}{36}+\dfrac{y^2}{16}=1$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Data l'iperbole $\dfrac{x^2}{16}-\dfrac{y^2}{9}=1$, trova le coordinate del fuoco di ascissa positiva (x; y).`, suggerimenti: [R`Per l'iperbole $c^2=a^2+b^2$ (una somma, non una differenza).`, R`$a=4$, $b=3$.`], risposta: { tipo: 'numeri', valori: [5, 0] }, soluzione: [R`$a^2=16$, $b^2=9$: $a=4$, $b=3$.`, R`$c^2=16+9=25$, $c=5$: il fuoco di ascissa positiva è $F'(5;0)$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Per la stessa iperbole $\dfrac{x^2}{16}-\dfrac{y^2}{9}=1$, calcola l'eccentricità.`, suggerimenti: [R`$e=c/a$.`, R`$a=4$, $c=5$ (li hai trovati sopra).`], risposta: { tipo: 'numero', valore: 1.25, tolleranza: 0.01 }, soluzione: [R`$a=4$, $c=5$.`, R`$e=c/a=5/4=1{,}25$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Scrivi l'equazione dell'asintoto dell'iperbole $\dfrac{x^2}{16}-\dfrac{y^2}{9}=1$ con coefficiente angolare positivo.`, suggerimenti: [R`Gli asintoti sono $y=\pm\dfrac{b}{a}x$.`, R`$a=4$, $b=3$: quello richiesto ha $m=b/a>0$.`], risposta: { tipo: 'testo', accettate: ['y=3/4x', 'y=(3/4)x', 'y=0.75x', 'y=3x/4'] }, soluzione: [R`$a=4$, $b=3$: gli asintoti sono $y=\pm\dfrac34x$.`, R`Quello con coefficiente angolare positivo è $y=\dfrac34x$.`] },
    { id: 'es-08', difficolta: 2, testo: R`L'iperbole equilatera $xy=k$, riferita ai propri asintoti, passa per il punto $(4;3)$. Trova $k$.`, suggerimenti: [R`Sostituisci le coordinate del punto nell'equazione.`, R`$k=x\cdot y$ calcolato in quel punto.`], risposta: { tipo: 'numero', valore: 12, tolleranza: 0.01 }, soluzione: [R`Il punto $(4;3)$ soddisfa $xy=k$: $k=4\cdot3=12$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Data la funzione omografica $y=\dfrac{3x-1}{x+2}$, trova le coordinate del centro di simmetria (x; y).`, suggerimenti: [R`Confrontala con $y=\dfrac{ax+b}{cx+d}$ per riconoscere $a,b,c,d$.`, R`Il centro è $\left(-\dfrac{d}{c};\dfrac{a}{c}\right)$.`], risposta: { tipo: 'numeri', valori: [-2, 3] }, soluzione: [R`$a=3$, $b=-1$, $c=1$, $d=2$.`, R`Centro: $x=-d/c=-2$, $y=a/c=3$: $(-2;3)$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Determina i coefficienti angolari delle rette tangenti condotte dal punto $P(0;2)$ all'ellisse $\dfrac{x^2}{3}+y^2=1$.`, suggerimenti: [R`Le rette per $P$ hanno equazione $y=mx+2$: usa la condizione di tangenza $q^2=a^2m^2+b^2$.`, R`$a^2=3$, $b^2=1$, $q=2$.`], risposta: { tipo: 'numeri', valori: [1, -1] }, soluzione: [R`Retta per $P$: $y=mx+2$, quindi $q=2$; $a^2=3$, $b^2=1$.`, R`$q^2=a^2m^2+b^2 \Rightarrow 4=3m^2+1 \Rightarrow m^2=1$.`, R`$m=1$ oppure $m=-1$.`] },
    { id: 'es-11', difficolta: 3, testo: R`Un pianeta descrive un'orbita ellittica con il Sole in un fuoco: il semiasse maggiore vale $10$ (unità astronomiche) e l'eccentricità $0{,}2$. Trova le distanze minima e massima dal Sole (perielio e afelio).`, suggerimenti: [R`Calcola $c=e\cdot a$.`, R`Perielio $=a-c$, afelio $=a+c$.`], risposta: { tipo: 'numeri', valori: [8, 12] }, soluzione: [R`$c=e\cdot a=0{,}2\cdot10=2$.`, R`Perielio: $a-c=10-2=8$. Afelio: $a+c=10+2=12$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Le coniche (ellisse, parabola, iperbole, circonferenza) si ottengono tutte…`, opzioni: [R`intersecando un cono con un piano in modi diversi`, R`risolvendo equazioni di quarto grado`, R`tracciando circonferenze concentriche`, R`misurando gli angoli di un triangolo`], corretta: 0, spiegazione: R`Sono tutte sezioni di un cono a doppia falda: il tipo di curva dipende dall'inclinazione del piano rispetto all'asse del cono.` },
    { id: 'q-02', domanda: R`Quale grandezza è costante per tutti i punti di un'ellisse?`, opzioni: [R`la differenza delle distanze dai due fuochi`, R`la somma delle distanze dai due fuochi`, R`il prodotto delle distanze dai due fuochi`, R`la distanza dal centro`], corretta: 1, spiegazione: R`È la definizione stessa di ellisse: $PF_1+PF_2=2a$. La differenza costante è invece la definizione dell'iperbole.` },
    { id: 'q-03', domanda: R`Quale grandezza è costante per tutti i punti di un'iperbole?`, opzioni: [R`la somma delle distanze dai due fuochi`, R`il rapporto fra le due distanze dai fuochi e il numero 2`, R`il valore assoluto della differenza delle distanze dai due fuochi`, R`la distanza dal centro`], corretta: 2, spiegazione: R`$|PF_1-PF_2|=2a$. Il valore assoluto serve perché su un ramo la differenza è positiva, sull'altro negativa.` },
    { id: 'q-04', domanda: R`Nell'ellisse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ con $a>b>0$, dove sono i fuochi?`, opzioni: [R`sull'asse $y$`, R`nell'origine`, R`sulla retta $y=x$`, R`sull'asse $x$, a distanza $c=\sqrt{a^2-b^2}$ dal centro`], corretta: 3, spiegazione: R`Con $a>b$ i fuochi stanno sull'asse maggiore, cioè l'asse $x$, e $c^2=a^2-b^2$.` },
    { id: 'q-05', domanda: R`Se nell'equazione $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ risulta $b>a$, i fuochi dell'ellisse si trovano…`, opzioni: [R`sull'asse $y$`, R`sull'asse $x$`, R`fuori dagli assi`, R`nel punto $(a;b)$`], corretta: 0, spiegazione: R`I fuochi stanno sempre sull'asse maggiore: se $b>a$, l'asse maggiore è quello $y$.` },
    { id: 'q-06', domanda: R`Che cosa succede alla forma dell'ellisse quando l'eccentricità $e$ tende a $0$?`, opzioni: [R`diventa una retta`, R`diventa una circonferenza`, R`degenera in un punto`, R`diventa una parabola`], corretta: 1, spiegazione: R`$e=0$ significa $c=0$: i fuochi coincidono nel centro e l'ellisse è una circonferenza di raggio $a$.` },
    { id: 'q-07', domanda: R`Quali valori può assumere l'eccentricità di un'ellisse?`, opzioni: [R`$e>1$`, R`$e=1$ sempre`, R`$0 \le e < 1$`, R`$e$ può essere negativa`], corretta: 2, spiegazione: R`Nell'ellisse $c<a$ sempre, quindi $e=c/a<1$; e $c\ge0$, quindi $e\ge0$.` },
    { id: 'q-08', domanda: R`Nell'ellisse con fuochi sull'asse $x$ (con $a>b$), quale relazione lega $a$, $b$, $c$?`, opzioni: [R`$c^2=a^2+b^2$`, R`$c=a\cdot b$`, R`$c^2=b^2-a^2$`, R`$c^2=a^2-b^2$`], corretta: 3, spiegazione: R`È la relazione fondamentale dell'ellisse: $c^2=a^2-b^2$, sempre positiva perché $a>b$.` },
    { id: 'q-09', domanda: R`In un'iperbole, quale relazione lega $a$, $b$, $c$?`, opzioni: [R`$c^2=a^2+b^2$`, R`$c^2=a^2-b^2$`, R`$c^2=b^2-a^2$`, R`$c=a+b$`], corretta: 0, spiegazione: R`A differenza dell'ellisse, nell'iperbole vale $c^2=a^2+b^2$: è per questo che $c>a$ sempre.` },
    { id: 'q-10', domanda: R`Perché l'eccentricità di un'iperbole è sempre maggiore di 1?`, opzioni: [R`perché $a$ è sempre maggiore di $b$`, R`perché $c>a$, essendo $c^2=a^2+b^2$`, R`perché $b$ è sempre negativo`, R`per convenzione, senza un motivo geometrico`], corretta: 1, spiegazione: R`$c^2=a^2+b^2>a^2$, quindi $c>a$ e $e=c/a>1$.` },
    { id: 'q-11', domanda: R`Quali sono gli asintoti dell'iperbole $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$?`, opzioni: [R`$y=\pm\dfrac{a}{b}x$`, R`$x=\pm a$`, R`$y=\pm\dfrac{b}{a}x$`, R`$y=\pm b$`], corretta: 2, spiegazione: R`Gli asintoti dipendono dal rapporto fra i due semiassi: $y=\pm(b/a)x$.` },
    { id: 'q-12', domanda: R`L'equazione $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=-1$, rispetto a $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$, descrive un'iperbole…`, opzioni: [R`che non esiste`, R`con asintoti diversi`, R`identica in tutto, senza alcuna differenza`, R`con gli stessi asintoti ma i fuochi sull'asse $y$ anziché sull'asse $x$`], corretta: 3, spiegazione: R`Il segno $-1$ a destra sposta fuochi e vertici sull'asse $y$; gli asintoti $y=\pm(b/a)x$ non cambiano, perché dipendono solo da $a$ e $b$.` },
    { id: 'q-13', domanda: R`Che cos'è un'iperbole equilatera?`, opzioni: [R`un'iperbole in cui i due semiassi sono uguali, $a=b$`, R`un'iperbole con un solo asintoto`, R`un'iperbole senza fuochi`, R`un'iperbole con eccentricità uguale a $1$`], corretta: 0, spiegazione: R`Equilatera significa $a=b$: gli asintoti diventano le rette perpendicolari $y=\pm x$, e $e=\sqrt2$.` },
    { id: 'q-14', domanda: R`L'iperbole equilatera, riferita ai propri asintoti, ha equazione…`, opzioni: [R`$x^2-y^2=k$`, R`$xy=k$`, R`$y=kx$`, R`$x^2+y^2=k$`], corretta: 1, spiegazione: R`Scegliendo gli asintoti come assi (rotazione di $45°$), l'equazione diventa $xy=k$.` },
    { id: 'q-15', domanda: R`Perché nella funzione omografica $y=\dfrac{ax+b}{cx+d}$ si richiede $c\ne0$ e $ad-bc\ne0$?`, opzioni: [R`perché altrimenti il grafico sarebbe una circonferenza`, R`perché altrimenti $a$ e $b$ dovrebbero essere negativi`, R`perché con $c=0$ non c'è l'asintoto verticale, e con $ad=bc$ la funzione degenera in una costante`, R`per nessun motivo, sono condizioni di stile`], corretta: 2, spiegazione: R`Con $c=0$ la funzione è una retta (nessuna $x$ al denominatore); con $ad=bc$ il numeratore è multiplo del denominatore e la frazione si riduce a un valore costante.` },
    { id: 'q-16', domanda: R`Il grafico della funzione omografica $y=\dfrac{ax+b}{cx+d}$, con $c\ne0$ e $ad-bc\ne0$, è…`, opzioni: [R`una parabola`, R`una retta`, R`un'ellisse`, R`un'iperbole equilatera traslata, con centro in $\left(-\dfrac{d}{c};\dfrac{a}{c}\right)$`], corretta: 3, spiegazione: R`È un'iperbole equilatera con gli asintoti spostati in $x=-d/c$ e $y=a/c$, quindi traslata rispetto all'origine.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di scrivere qualunque formula, chiediti se hai un'ellisse (somma delle distanze, segno $+$) o un'iperbole (differenza, segno $-$): le formule di $c^2$ sono opposte.` },
    { tipo: 'errore', testo: R`Nell'ellisse $c^2=a^2-b^2$, nell'iperbole $c^2=a^2+b^2$: è la trappola più comune di questo argomento, perché le due formule si assomigliano.` },
    { tipo: 'trucco', testo: R`I fuochi stanno sempre sull'asse del denominatore **maggiore** (ellisse) o sotto il termine con segno **positivo** (iperbole): guarda i numeri prima di disegnare.` },
    { tipo: 'errore', testo: R`L'eccentricità si calcola dividendo per il semiasse maggiore, non per quello che compare per primo nell'equazione.` },
    { tipo: 'metodo', testo: R`Per determinare l'equazione da un fuoco e un punto (o un vertice), scrivi tutto in funzione di $a$, $b$, $c$ e usa $c^2=a^2\mp b^2$ solo alla fine.` },
    { tipo: 'trucco', testo: R`Nella funzione omografica, il denominatore uguagliato a zero dà subito l'asintoto verticale, senza bisogno di ricordare la formula $-d/c$.` },
    { tipo: 'errore', testo: R`Lo sdoppiamento per la tangente funziona solo se il punto è già sulla curva: verificalo sempre prima di applicarlo.` },
    { tipo: 'trucco', testo: R`Un'iperbole equilatera $x^2-y^2=a^2$ e la sua forma $xy=k$ sono la stessa curva ruotata di $45°$: conoscere l'eccentricità dell'una ($\sqrt2$) significa conoscere anche quella dell'altra.` }
  ],

  aneddoti: [
    { matematico: 'Apollonio di Perga', anni: '262–190 a.C. circa', titolo: 'I nomi ellisse, parabola, iperbole', testo: R`Apollonio di Perga, soprannominato «il Grande Geometra», scrisse nel III secolo a.C. un trattato in otto libri sulle coniche che rimase il testo di riferimento per quasi duemila anni. Fu lui a dare alle tre curve i nomi che usiamo ancora oggi, prendendoli da un confronto geometrico che i greci usavano per le aree: «applicare» un'area a un segmento dato poteva coincidere esattamente con esso, restarne al di sotto (un «difetto», in greco élleipsis) oppure superarlo (un «eccesso», hyperbolé); la parola parabolé indicava invece un'uguaglianza esatta. Apollonio notò che la stessa distinzione descriveva le tre curve non circolari che si ottengono tagliando un cono, e usò quei nomi per battezzarle: ellisse, iperbole e parabola.`, legame: R`Questo argomento parla proprio delle due curve il cui nome viene dal «difetto» (ellisse) e dall'«eccesso» (iperbole) di un'applicazione di aree.` },
    { matematico: 'Johannes Kepler', anni: '1571–1630', titolo: 'Le orbite dei pianeti sono ellissi', testo: R`Per quasi duemila anni gli astronomi avevano descritto le orbite dei pianeti con cerchi, eventualmente combinati fra loro, perché il cerchio era considerato la forma «perfetta» e quindi l'unica adatta ai cieli. Keplero, analizzando per anni le osservazioni di Marte raccolte dal suo maestro Tycho Brahe, si accorse che un'orbita circolare lasciava uno scarto di appena otto primi d'arco rispetto ai dati: una differenza piccolissima, ma che Keplero si rifiutò di ignorare, fidandosi della precisione di Brahe. Inseguendo quello scarto arrivò, nel 1609, alla sua prima legge: i pianeti si muovono su ellissi, con il Sole in uno dei due fuochi, non al centro. Fu una delle rotture più nette con duemila anni di astronomia.`, legame: R`È l'applicazione più famosa dell'ellisse come luogo geometrico: il Sole occupa uno dei due fuochi, non il centro della curva.` },
    { matematico: 'Germinal Pierre Dandelin', anni: '1794–1847', titolo: 'Le sfere che spiegano i fuochi', testo: R`Perché tagliando un cono con un piano si ottiene proprio una curva con la proprietà dei fuochi studiata in questo argomento? Nel 1822 l'ingegnere e matematico belga Germinal Pierre Dandelin trovò una dimostrazione elegante: si inscrivono nel cono due sfere, una sopra e una sotto il piano di sezione, ciascuna tangente sia al cono sia al piano. I due punti in cui le sfere toccano il piano sono esattamente i due fuochi della conica, e la proprietà della somma (o differenza) costante delle distanze si ricava seguendo le generatrici del cono, senza scrivere una sola equazione. La stessa idea funziona anche per la parabola, con una sola sfera e una direttrice al posto del secondo fuoco.`, legame: R`Le sfere di Dandelin collegano la definizione «con il cono» (prima sezione) alla definizione «con i fuochi» usata per l'ellisse e l'iperbole in tutto il resto dell'argomento.` },
    { matematico: 'Edmond Halley', anni: '1656–1742', titolo: 'La cometa che tornò come previsto', testo: R`Halley non scoprì la cometa che porta il suo nome: la usò per dimostrare che le leggi di Newton funzionavano davvero. Applicando la meccanica di Newton, e quindi le orbite ellittiche, alle comete osservate nel 1531, nel 1607 e nel 1682, si accorse che intervalli e traiettorie erano compatibili con un solo oggetto che tornava periodicamente su un'orbita ellittica molto allungata, non con tre comete diverse come si pensava. Nel 1705 calcolò che sarebbe ricomparsa nel 1758, correggendo la previsione per tenere conto della perturbazione gravitazionale di Giove e Saturno. Halley morì nel 1742, sedici anni prima di poter verificare il proprio calcolo: la cometa tornò puntuale alla fine del 1758, e da allora porta il suo nome.`, legame: R`È la prima previsione confermata di un ritorno periodico su un'orbita ellittica molto eccentrica, la stessa curva descritta in questo argomento.` },
    { matematico: 'Joseph Henry', anni: '1797–1878', titolo: 'La camera dei sussurri del Campidoglio', testo: R`La proprietà focale dell'ellisse, e delle superfici che ne derivano come le cupole a sezione ellittica, non riguarda solo la luce ma anche il suono: un'onda che parte da un fuoco, riflessa dalla superficie, converge sempre sull'altro fuoco. Succedeva nella vecchia aula della Camera dei Rappresentanti americana, oggi chiamata National Statuary Hall, coperta da una cupola a pianta ellittica. Il fisico Joseph Henry, primo segretario dello Smithsonian, studiò e documentò scientificamente il fenomeno a metà Ottocento: in piedi su uno dei due fuochi del pavimento, si poteva sentire con chiarezza persino un sussurro pronunciato sull'altro fuoco, a decine di metri di distanza, mentre chi stava in mezzo non sentiva quasi nulla. Si racconta che alcuni deputati sfruttassero l'effetto per origliare le conversazioni altrui.`, legame: R`È la stessa proprietà usata negli specchi ellittici dei riflettori: tutto ciò che parte da un fuoco converge sull'altro, per il suono come per la luce.` }
  ]
});
})();
