(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'equazioni-goniometriche',
  titolo: 'Equazioni e disequazioni goniometriche',

  introduzione: R`Un'equazione goniometrica è un'equazione in cui l'incognita compare dentro una funzione goniometrica: $\sin x$, $\cos x$, $\tan x$. A differenza delle equazioni algebriche, quasi tutte hanno **infinite soluzioni**, perché seno, coseno e tangente si ripetono uguali a ogni giro (o mezzo giro, per la tangente): trovata una soluzione, se ne trovano infinite altre sommando multipli del periodo.

Compaiono ogni volta che qualcosa oscilla o gira: l'altezza di un seggiolino sulla ruota panoramica in funzione del tempo, la corrente in un circuito a corrente alternata, il livello della marea in un porto. Chiedersi «quando il seggiolino è più alto di 10 metri» o «quando la marea supera i 2 metri» è, matematicamente, risolvere una disequazione goniometrica: la stessa domanda, applicata a fenomeni molto diversi.

Per affrontare bene questo argomento servono le equazioni di primo e secondo grado, le funzioni goniometriche seno, coseno e tangente (dominio, periodo, segno, angoli associati) e le formule goniometriche (duplicazione, somma e differenza), che spesso servono per ricondurre un'equazione complicata a una elementare.`,

  sezioni: [
    { id: 'elementari-seno-coseno', titolo: 'Le equazioni elementari: seno e coseno', testo: R`Un'equazione goniometrica si dice **elementare** quando, dopo eventuali passaggi, si riduce a una delle forme $\sin x = k$, $\cos x = k$, $\tan x = k$, con $k$ numero noto. È il caso più semplice: tutti gli altri tipi di equazione goniometrica si riconducono, prima o poi, a una di queste.

>* Poiché $-1 \le \sin x \le 1$ e $-1 \le \cos x \le 1$ per ogni $x$, le equazioni $\sin x = k$ e $\cos x = k$ hanno soluzioni **se e solo se** $-1 \le k \le 1$; se $|k| > 1$ sono impossibili.

Se $-1 \le k \le 1$, l'equazione $\sin x = k$ ha due famiglie di soluzioni, una ogni giro:
$$x = \arcsin k + 2n\pi \qquad \lor \qquad x = \pi - \arcsin k + 2n\pi, \quad n \in \mathbb{Z}.$$
La seconda famiglia viene dal fatto che $\sin(\pi - x) = \sin x$: due archi supplementari hanno lo stesso seno. Per esempio, $\sin x = \frac12$ dà $x = \frac{\pi}{6} + 2n\pi$ oppure $x = \frac{5\pi}{6} + 2n\pi$ (perché $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$).

[[grafico:senoElementare]]

Per il coseno vale $\cos(-x) = \cos x$: due archi opposti hanno lo stesso coseno, quindi
$$x = \pm\arccos k + 2n\pi, \quad n \in \mathbb{Z}.$$
Muovendo il parametro $k$ nel grafico qui sotto, i due punti $\arccos k$ e $-\arccos k$ si avvicinano quando $k \to 1$, si allontanano quando $k \to -1$, e **spariscono** non appena $|k|$ supera $1$: l'equazione diventa impossibile, coerentemente con la condizione vista sopra.

[[grafico:cosenoParametro]]

>! L'errore più comune è dimenticare una delle due famiglie di soluzioni: scrivere solo $x = \arcsin k + 2n\pi$ (o solo $x = \arccos k + 2n\pi$) perde metà delle soluzioni.` },

    { id: 'elementare-tangente', titolo: 'L\'equazione elementare: la tangente', testo: R`L'equazione $\tan x = k$ si comporta diversamente dalle altre due elementari: la tangente ha **codominio tutto $\mathbb{R}$** (nessun valore è escluso), quindi per **ogni** $k$ reale l'equazione ha soluzioni: non serve nessuna condizione su $k$, a differenza di $\sin x = k$ e $\cos x = k$.

>* Soluzione generale: $$x = \arctan k + n\pi, \quad n \in \mathbb{Z}.$$ Una sola famiglia, e con **periodo $\pi$**, non $2\pi$.

Il motivo del periodo $\pi$ è che $\tan(x + \pi) = \tan x$: un mezzo giro sulla circonferenza porta al punto diametralmente opposto, che ha seno e coseno opposti ma lo stesso rapporto $\dfrac{\sin x}{\cos x}$, quindi la stessa tangente. È anche per questo che non serve una seconda famiglia di soluzioni come per $\sin x = k$: quella che sarebbe la "seconda famiglia" è già contenuta nella prima, spostando $n$.

Esempio: $\tan x = -1$. L'angolo con tangente $-1$ è $-\dfrac{\pi}{4}$ (o, equivalentemente, $\dfrac{3\pi}{4}$): $$x = -\frac{\pi}{4} + n\pi, \quad n \in \mathbb{Z}.$$

>! Attenzione al periodo: scrivere $x = \arctan k + 2n\pi$ (con $2\pi$ invece di $\pi$) fa perdere metà delle soluzioni, perché la tangente si ripete due volte più spesso di seno e coseno.

L'equazione non è definita dove $\cos x = 0$ (cioè $x = \frac{\pi}{2} + n\pi$): lì la tangente non esiste, ma questo non è mai un problema per risolvere $\tan x = k$, perché quei punti non possono comunque essere soluzioni.` },

    { id: 'riconducibili-elementari', titolo: 'Equazioni riconducibili alle elementari', testo: R`Molte equazioni non sono già nella forma $\sin x = k$, ma hanno la stessa funzione goniometrica applicata a **due argomenti diversi**, come $\sin(2x) = \sin\!\left(x + \frac{\pi}{3}\right)$. Si risolvono con le stesse idee usate per $\sin x = k$ (argomenti uguali, oppure supplementari), applicate ai due argomenti invece che a un argomento e un numero.

>* $$\sin\alpha = \sin\beta \iff \alpha = \beta + 2n\pi \ \lor\ \alpha = \pi - \beta + 2n\pi$$ $$\cos\alpha = \cos\beta \iff \alpha = \pm\beta + 2n\pi \qquad\qquad \tan\alpha = \tan\beta \iff \alpha = \beta + n\pi$$

Per $\sin(2x) = \sin\!\left(x + \frac{\pi}{3}\right)$ si impongono le due condizioni con $\alpha = 2x$ e $\beta = x + \frac{\pi}{3}$:

1. $2x = x + \frac{\pi}{3} + 2n\pi \ \Rightarrow\ x = \frac{\pi}{3} + 2n\pi$;
2. $2x = \pi - \left(x + \frac{\pi}{3}\right) + 2n\pi \ \Rightarrow\ 3x = \frac{2\pi}{3} + 2n\pi \ \Rightarrow\ x = \frac{2\pi}{9} + \frac{2n\pi}{3}$.

Le soluzioni sono entrambe le famiglie insieme (l'unione, non l'intersezione: basta che valga una delle due).

Un caso interessante è quando le due famiglie si "fondono": in $\cos(2x) = \cos x$ la condizione $2x = x + 2n\pi$ dà $x = 2n\pi$, mentre $2x = -x + 2n\pi$ dà $x = \frac{2n\pi}{3}$; la prima famiglia risulta già tutta contenuta nella seconda (basta prendere $n$ multiplo di $3$), quindi la soluzione completa è semplicemente $x = \frac{2n\pi}{3}$.

>! Per il coseno non dimenticare il doppio segno: $\cos\alpha = \cos\beta$ richiede sia $\alpha = \beta + 2n\pi$ sia $\alpha = -\beta + 2n\pi$, non uno solo.` },

    { id: 'secondo-grado-in-una-funzione', titolo: 'Equazioni di secondo grado in una funzione goniometrica', testo: R`Un'equazione come $2\sin^2x - \sin x - 1 = 0$ contiene una sola funzione goniometrica, ma con l'esponente $2$: è **di secondo grado in $\sin x$** (o in $\cos x$, o in $\tan x$). Si risolve con una **sostituzione**: si pone $t = \sin x$, si risolve l'equazione di secondo grado in $t$, e infine si torna a $x$.

>* Procedura: 1) sostituire $t = \sin x$ (o $\cos x$, o $\tan x$); 2) risolvere $at^2+bt+c=0$; 3) **accettare solo le soluzioni $t$ compatibili con la funzione scelta** ($-1 \le t \le 1$ per seno e coseno, nessun limite per la tangente); 4) per ogni $t$ accettabile, risolvere l'equazione elementare corrispondente.

Nell'esempio, $2t^2 - t - 1 = 0$ ha $\Delta = 1+8=9$ e soluzioni $t = 1$ e $t = -\frac12$: entrambe dentro $[-1,1]$, quindi entrambe da tenere. Restano da risolvere $\sin x = 1$ (che dà $x = \frac{\pi}{2}+2n\pi$) e $\sin x = -\frac12$ (che dà due famiglie).

Il controllo dell'intervallo non è un dettaglio formale: se la quadratica in $t$ avesse dato, per esempio, $t = 2$, quella soluzione andrebbe **scartata subito**, perché nessun $x$ rende $\sin x = 2$. Con la tangente invece non c'è alcun limite su $t$: qualunque soluzione della quadratica è accettabile, perché il codominio della tangente è $\mathbb{R}$.

>! Scordarsi il controllo su $t$ è l'errore tipico: si trova $t=2$ nella quadratica e si scrive $x = \arcsin 2 + \dots$, un'espressione che non ha senso perché $2 \notin [-1,1]$.` },

    { id: 'lineari-seno-coseno', titolo: 'Equazioni lineari in seno e coseno', testo: R`Un'equazione della forma $a\sin x + b\cos x = c$ (con $a$ e $b$ non entrambi nulli) si chiama **lineare in seno e coseno**: seno e coseno compaiono solo al primo grado. Ci sono tre modi per risolverla.

**Il metodo dell'angolo aggiunto.** Si scrive $a\sin x + b\cos x$ come $R\sin(x+\varphi)$, con $R=\sqrt{a^2+b^2}$ e $\varphi$ l'angolo tale che $\cos\varphi=\frac{a}{R}$, $\sin\varphi=\frac{b}{R}$ (è la formula del seno della somma, usata al contrario). L'equazione diventa $R\sin(x+\varphi)=c$, cioè $\sin(x+\varphi)=\frac{c}{R}$: elementare, ma nella variabile $x+\varphi$.

>* L'equazione ha soluzioni **se e solo se** $\left|\frac{c}{R}\right|\le 1$, cioè $a^2+b^2\ge c^2$: il "raggio" $R$ deve essere almeno pari a $|c|$.

[[grafico:linearAB]]

**Il metodo grafico.** Ponendo $X=\cos x$, $Y=\sin x$, l'equazione $aY+bX=c$ è una retta, mentre $X^2+Y^2=1$ è la circonferenza goniometrica: le soluzioni corrispondono ai punti di intersezione. Se la retta è troppo lontana dal centro (distanza maggiore di $1$) non ci sono intersezioni: è lo stesso criterio $a^2+b^2\ge c^2$ visto sopra, letto come "distanza della retta dall'origine minore o uguale a $1$".

**Le formule parametriche.** Ponendo $t=\tan\frac{x}{2}$ si ha $\sin x = \frac{2t}{1+t^2}$, $\cos x = \frac{1-t^2}{1+t^2}$: sostituendo, l'equazione diventa di secondo grado (o di primo, se un coefficiente si annulla) in $t$.

>! Le formule parametriche non "vedono" $x=\pi+2n\pi$, perché lì $\tan\frac{x}{2}$ non è definita: quel valore va sempre controllato **a parte**, sostituendolo nell'equazione originale, altrimenti si rischia di perdere una soluzione.` },

    { id: 'omogenee', titolo: 'Equazioni omogenee di secondo grado', testo: R`Un'equazione si dice **omogenea di secondo grado in seno e coseno** quando ogni termine ha grado $2$ nelle due funzioni, e il termine noto è zero: $$a\sin^2x + b\sin x\cos x + c\cos^2x = 0.$$

Il trucco è dividere tutto per $\cos^2x$, per ottenere un'equazione nella sola $\tan x$: $$a\tan^2x + b\tan x + c = 0.$$ Ma dividere per un'espressione è lecito solo se non è zero, quindi **prima** bisogna chiedersi se $\cos x = 0$ è una soluzione.

>* Se $\cos x = 0$, allora $\sin^2x=1$ (perché $\sin^2x+\cos^2x=1$), e l'equazione diventa $a = 0$. Quindi $\cos x=0$ è soluzione dell'omogenea **se e solo se** $a=0$.

Se $a \ne 0$, si può dividere senza timore: nessuna soluzione va persa, perché $\cos x=0$ non era comunque accettabile. Si risolve $a\tan^2x+b\tan x+c=0$ come una normale equazione di secondo grado (questa volta senza limiti su $\tan x$, che può valere qualunque numero reale), e per ogni soluzione $t_i$ si scrive $x = \arctan t_i + n\pi$.

Se invece $a = 0$, l'equazione si scompone direttamente: $\cos x\,(b\sin x + c\cos x) = 0$, quindi $\cos x = 0$ oppure $\tan x = -\frac{c}{b}$ (se $b \ne 0$).

> Un'equazione completa come $a\sin^2x+b\sin x\cos x+c\cos^2x = d$ (con $d\ne0$) si riconduce a un'omogenea scrivendo $d = d\,(\sin^2x+\cos^2x)$ e portando tutto a sinistra.` },

    { id: 'disequazioni-elementari', titolo: 'Disequazioni elementari', testo: R`Una disequazione come $\sin x > k$ oppure $\cos x \le k$ si dice **elementare**. Non ha una formula unica come le equazioni: si risolve **leggendo un grafico**, quello della circonferenza goniometrica o quello della funzione.

**Con la circonferenza.** Si traccia la retta orizzontale $y = k$ (per il seno) o verticale $x = k$ (per il coseno): l'insieme dei punti della circonferenza con ordinata (o ascissa) maggiore di $k$ individua uno o due archi, di cui si leggono gli estremi.

[[grafico:circonferenza]]

**Con il grafico della funzione.** Si disegna $y = \sin x$ (o $y=\cos x$) insieme alla retta $y=k$, e si cercano i tratti in cui la curva sta sopra (per $>$) o sotto (per $<$) la retta. Per $\sin x > \frac12$, per esempio, la sinusoide sta sopra la retta $y=\frac12$ esattamente per $x \in \left(\frac{\pi}{6}, \frac{5\pi}{6}\right)$, e la stessa cosa si ripete ogni $2\pi$.

[[grafico:disequazioneArea]]

>* La soluzione di una disequazione elementare, a differenza di un'equazione, è quasi sempre un **intervallo** (o un'unione di intervalli), non un insieme di punti isolati; e va ripetuta con periodo $2\pi$ (o $\pi$ per la tangente).

Si scrive $\frac{\pi}{6} + 2n\pi < x < \frac{5\pi}{6} + 2n\pi$, oppure, sulla retta reale, semplicemente l'intervallo dentro un periodo:

[[grafico:disequazioneIntervallo]]

>! Con $\cos x < k$ (o $\sin x < k$) l'intervallo di solito comprende lo "spigolo" dove la circonferenza gira: conviene sempre disegnare, non fidarsi a memoria di dove sta il segno.` },

    { id: 'disequazioni-riconducibili', titolo: 'Disequazioni riconducibili', testo: R`Le disequazioni goniometriche più complesse — un **prodotto**, una **frazione**, un **polinomio di secondo grado** in una funzione goniometrica — si affrontano esattamente come le corrispondenti disequazioni algebriche, con un'unica differenza: ogni fattore, invece di dare un intervallo definitivo, dà un intervallo (o un'unione di intervalli) che si ripete a ogni periodo.

>* Procedura: si studia il segno di **ciascun fattore** separatamente (ognuno è una disequazione elementare), si riportano i risultati in una **tabella dei segni** sullo stesso periodo (per esempio $[0, 2\pi)$), e si legge il segno del prodotto o del quoziente riga per riga, come per le funzioni razionali.

Per $(2\sin x - 1)(2\cos x + 1) > 0$: il primo fattore è positivo per $x \in \left(\frac{\pi}{6}, \frac{5\pi}{6}\right)$, il secondo per $x \in \left(0, \frac{2\pi}{3}\right) \cup \left(\frac{4\pi}{3}, 2\pi\right)$. Si incrociano i segni in tabella, e il prodotto è positivo dove le due righe concordano.

Per le disequazioni **fratte**, come $\dfrac{2\cos x - 1}{\sin x} \ge 0$, si aggiungono le condizioni di esistenza (qui $\sin x \ne 0$): il denominatore si studia come gli altri fattori, ma i punti che lo annullano vanno **sempre esclusi** dalla soluzione finale, anche se la disequazione non è stretta.

Per le disequazioni di secondo grado in una funzione, come $2\sin^2x - \sin x - 1 \ge 0$, si sostituisce $t = \sin x$, si risolve la disequazione di secondo grado in $t$ dentro $[-1,1]$, e si torna a $x$ con le disequazioni elementari trovate.

>! Il denominatore di una frazione goniometrica non è mai zero per definizione: i valori esclusi restano fuori dalla soluzione anche quando sembrerebbero soddisfare il verso della disequazione.` },

    { id: 'sistemi-cenni', titolo: 'Sistemi di equazioni e disequazioni goniometriche (cenni)', testo: R`In alcuni problemi le condizioni da rispettare sono più di una: un'equazione e una disequazione, oppure due disequazioni, da soddisfare **contemporaneamente**. È un **sistema di condizioni goniometriche**, e si tratta come un sistema qualunque: si risolve ogni condizione per conto suo, poi si prendono le soluzioni comuni, cioè si fa l'**intersezione**.

Per esempio: trova le soluzioni di $\sin x = \frac12$ che rendono anche $\cos x > 0$, con $x \in [0, 2\pi)$.

- $\sin x = \frac12$ ha soluzioni $x = \frac{\pi}{6}$ e $x = \frac{5\pi}{6}$.
- $\cos x > 0$ esclude $\frac{5\pi}{6}$ (dove il coseno è negativo) e mantiene $\frac{\pi}{6}$.

Resta solo $x = \frac{\pi}{6}$.

Conviene sempre lavorare sullo stesso intervallo (per esempio $[0, 2\pi)$) per tutte le condizioni del sistema, così l'intersezione si legge direttamente sulla stessa striscia di valori, magari aiutandosi con più rette reali una sotto l'altra.

>* Le soluzioni di un sistema sono l'**intersezione**, non l'unione, delle soluzioni delle singole condizioni: basta che una condizione fallisca per scartare un valore.

>! Non confrontare direttamente due famiglie di soluzioni scritte con parametri $n$ diversi (una con $2n\pi$, l'altra magari con $n\pi$) senza prima riportarle sullo stesso intervallo numerico: è lì che si annidano gli errori di sistema.` }
  ],

  grafici: {
    senoElementare: {
      tipo: 'piano', x: [-7, 7], y: [-1.6, 1.6],
      passo: [1, 0.5],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: 0.5, etichetta: 'y = 0,5' }
      ],
      punti: [
        { x: -5.7596, y: 0.5, etichetta: 'π/6 − 2π', posizione: 'basso' },
        { x: -3.6652, y: 0.5, etichetta: '5π/6 − 2π', posizione: 'alto' },
        { x: 0.5236, y: 0.5, etichetta: 'π/6', posizione: 'alto' },
        { x: 2.618, y: 0.5, etichetta: '5π/6', posizione: 'alto' },
        { x: 6.8068, y: 0.5, etichetta: 'π/6 + 2π', posizione: 'basso' }
      ],
      didascalia: 'La retta y = 0,5 incontra la sinusoide infinite volte: ogni intersezione è una soluzione di sin x = 0,5, a distanza 2π dalla successiva sullo stesso ramo.'
    },
    cosenoParametro: {
      tipo: 'piano', x: [-4, 4], y: [-2, 2],
      parametri: [{ nome: 'k', min: -1.5, max: 1.5, passo: 0.1, valore: 0.6, etichetta: 'k' }],
      funzioni: [{ f: 'cos(x)', etichetta: 'y = cos x', colore: 1 }],
      elementi: [{ tipo: 'orizzontale', y: 'k', etichetta: 'y = k' }],
      punti: [
        { x: 'acos(k)', y: 'k', etichetta: 'arccos k', posizione: 'alto' },
        { x: '-acos(k)', y: 'k', etichetta: '−arccos k', posizione: 'basso' }
      ],
      didascalia: 'Sposta k: per |k| ≤ 1 la retta taglia il coseno in due punti simmetrici rispetto a x = 0; oltre |k| = 1 i punti spariscono, perché arccos(k) non esiste più.'
    },
    disequazioneArea: {
      tipo: 'piano', x: [-1, 4], y: [-1.4, 1.4],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: 0.5, etichetta: 'y = 0,5' },
        { tipo: 'area', f: 'sin(x)', g: '0.5', da: 0.5236, a: 2.618, etichetta: 'sin x > 0,5' }
      ],
      didascalia: 'La zona colorata è dove la sinusoide sta sopra la retta: esattamente l\'intervallo (π/6, 5π/6).'
    },
    disequazioneIntervallo: {
      tipo: 'retta-reale', x: [-1, 4],
      intervalli: [{ da: 0.5236, a: 2.618, chiusoDa: false, chiusoA: false, etichetta: ']π/6; 5π/6[' }],
      didascalia: 'La soluzione di sin x > 1/2 dentro un periodo, da ripetere poi ogni 2π.'
    },
    linearAB: {
      tipo: 'piano', x: [-7, 7], y: [-2.5, 2.5],
      parametri: [
        { nome: 'a', min: -2, max: 2, passo: 0.1, valore: 1, etichetta: 'a' },
        { nome: 'b', min: -2, max: 2, passo: 0.1, valore: 1, etichetta: 'b' }
      ],
      funzioni: [{ f: 'a*sin(x) + b*cos(x)', etichetta: 'y = a·sin x + b·cos x', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: 1, etichetta: 'y = 1' },
        { tipo: 'testo', p: [-6.8, 2.15], testo: 'r = {{sqrt(a^2+b^2)}}', ancora: 'start' }
      ],
      didascalia: 'a·sin x + b·cos x = 1 ha soluzione solo se r = √(a² + b²) è almeno 1: muovi a e b finché la curva non tocca la retta y = 1.'
    },
    circonferenza: {
      tipo: 'circonferenza-goniometrica', angolo: 50, mostra: ['sin', 'cos'],
      didascalia: 'Sposta l\'angolo e osserva per quali valori l\'ordinata del punto (il seno) supera 0,5.'
    }
  },

  esempi: [
    { titolo: 'Un\'equazione elementare in seno', problema: R`Risolvi $\sin x = -\dfrac{\sqrt3}{2}$.`, passi: [
      R`È già nella forma elementare $\sin x = k$ con $k = -\dfrac{\sqrt3}{2}$: poiché $|k|\le 1$, l'equazione ha soluzioni.`,
      R`$\arcsin\!\left(-\dfrac{\sqrt3}{2}\right) = -\dfrac{\pi}{3}$: è l'arco (nel quarto quadrante) con quel seno.`,
      R`Le due famiglie sono $x = -\dfrac{\pi}{3}+2n\pi$ e $x = \pi-\left(-\dfrac{\pi}{3}\right)+2n\pi = \dfrac{4\pi}{3}+2n\pi$.`
    ], risultato: R`$x = -\dfrac{\pi}{3}+2n\pi \ \lor\ x=\dfrac{4\pi}{3}+2n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Un\'equazione riconducibile', problema: R`Risolvi $\sin(2x) = \sin\!\left(x+\dfrac{\pi}{3}\right)$.`, passi: [
      R`Due seni uguali: o gli argomenti coincidono a meno di $2n\pi$, o sono supplementari a meno di $2n\pi$.`,
      R`Primo caso: $2x = x+\dfrac{\pi}{3}+2n\pi \ \Rightarrow\ x = \dfrac{\pi}{3}+2n\pi$.`,
      R`Secondo caso: $2x = \pi-\left(x+\dfrac{\pi}{3}\right)+2n\pi \ \Rightarrow\ 3x = \dfrac{2\pi}{3}+2n\pi \ \Rightarrow\ x=\dfrac{2\pi}{9}+\dfrac{2n\pi}{3}$.`
    ], risultato: R`$x=\dfrac{\pi}{3}+2n\pi \ \lor\ x=\dfrac{2\pi}{9}+\dfrac{2n\pi}{3}, \quad n\in\mathbb{Z}$` },

    { titolo: 'Secondo grado in seno (sostituzione)', problema: R`Risolvi $2\sin^2x-\sin x-1=0$.`, passi: [
      R`Pongo $t=\sin x$: $2t^2-t-1=0$, con $\Delta = 1+8=9$.`,
      R`$t = \dfrac{1\pm3}{4}$: $t=1$ oppure $t=-\dfrac12$. Entrambi in $[-1,1]$: nessuno va scartato.`,
      R`$\sin x = 1 \ \Rightarrow\ x=\dfrac{\pi}{2}+2n\pi$.`,
      R`$\sin x = -\dfrac12 \ \Rightarrow\ x=\dfrac{7\pi}{6}+2n\pi \ \lor\ x=\dfrac{11\pi}{6}+2n\pi$.`
    ], risultato: R`$x=\dfrac{\pi}{2}+2n\pi \ \lor\ x=\dfrac{7\pi}{6}+2n\pi \ \lor\ x=\dfrac{11\pi}{6}+2n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Un\'equazione omogenea', problema: R`Risolvi $\sin^2x-\sin x\cos x-2\cos^2x=0$.`, passi: [
      R`Controllo $\cos x=0$: allora $\sin^2x=1$ e l'equazione darebbe $1-0-0=1\ne0$. Non è soluzione: posso dividere per $\cos^2x$.`,
      R`Divido: $\tan^2x-\tan x-2=0$.`,
      R`Scompongo: $(\tan x-2)(\tan x+1)=0 \ \Rightarrow\ \tan x=2 \ \lor\ \tan x=-1$.`,
      R`$\tan x=-1$ è un angolo noto: $x=\dfrac{3\pi}{4}+n\pi$. $\tan x=2$ non lo è: si lascia $x=\arctan2+n\pi$.`
    ], risultato: R`$x=\dfrac{3\pi}{4}+n\pi \ \lor\ x=\arctan2+n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Un\'equazione lineare in seno e coseno', problema: R`Risolvi $\sin x+\cos x=1$ con il metodo delle formule parametriche.`, passi: [
      R`Pongo $t=\tan\dfrac{x}{2}$: $\sin x=\dfrac{2t}{1+t^2}$, $\cos x=\dfrac{1-t^2}{1+t^2}$. Controllo a parte $x=\pi+2n\pi$, dove $t$ non esiste.`,
      R`Sostituisco e moltiplico per $1+t^2$: $2t+1-t^2=1+t^2$.`,
      R`Riordino: $2t-t^2=t^2 \ \Rightarrow\ 2t^2-2t=0 \ \Rightarrow\ 2t(t-1)=0 \ \Rightarrow\ t=0 \ \lor\ t=1$.`,
      R`$t=0 \ \Rightarrow\ \dfrac{x}{2}=n\pi \ \Rightarrow\ x=2n\pi$; \quad $t=1 \ \Rightarrow\ \dfrac{x}{2}=\dfrac{\pi}{4}+n\pi \ \Rightarrow\ x=\dfrac{\pi}{2}+2n\pi$.`,
      R`Controllo $x=\pi+2n\pi$: $\sin\pi+\cos\pi=0-1=-1\ne1$. Non è soluzione: non se ne perde nessuna.`
    ], risultato: R`$x=2n\pi \ \lor\ x=\dfrac{\pi}{2}+2n\pi, \quad n\in\mathbb{Z}$` },

    { titolo: 'Una disequazione elementare', problema: R`Risolvi $2\cos x-1>0$.`, passi: [
      R`Isolo il coseno: $\cos x>\dfrac12$.`,
      R`Sulla circonferenza goniometrica, $\cos x=\dfrac12$ nei punti $x=\pm\dfrac{\pi}{3}$; il coseno supera $\dfrac12$ nell'arco centrale fra questi due punti.`,
      R`Scrivo la soluzione dentro un periodo e la generalizzo con $2n\pi$.`
    ], risultato: R`$-\dfrac{\pi}{3}+2n\pi < x < \dfrac{\pi}{3}+2n\pi, \quad n\in\mathbb{Z}$` }
  ],

  formulario: [
    { nome: 'Equazione elementare: seno', formula: R`\sin x = k \quad\Longrightarrow\quad x = \arcsin k + 2n\pi \ \lor\ x = \pi - \arcsin k + 2n\pi`, nota: R`Ha soluzioni solo se $-1 \le k \le 1$; con $n \in \mathbb{Z}$.` },
    { nome: 'Equazione elementare: coseno', formula: R`\cos x = k \quad\Longrightarrow\quad x = \pm\arccos k + 2n\pi`, nota: R`Ha soluzioni solo se $-1 \le k \le 1$.` },
    { nome: 'Equazione elementare: tangente', formula: R`\tan x = k \quad\Longrightarrow\quad x = \arctan k + n\pi`, nota: R`Ha sempre soluzione, per ogni $k \in \mathbb{R}$: il periodo è $\pi$, non $2\pi$.` },
    { nome: 'Archi con lo stesso seno, coseno o tangente', formula: R`\sin\alpha = \sin\beta \iff \alpha = \beta + 2n\pi \ \lor\ \alpha = \pi - \beta + 2n\pi`, nota: R`Analogamente $\cos\alpha = \cos\beta \iff \alpha = \pm\beta + 2n\pi$ e $\tan\alpha = \tan\beta \iff \alpha = \beta + n\pi$.` },
    { nome: 'Sostituzione nel secondo grado in una funzione', formula: R`a\,t^2+b\,t+c=0, \qquad t=\sin x \ \text{(o } \cos x\text{)}`, nota: R`Si accettano solo le soluzioni $t$ con $-1 \le t \le 1$; nessun limite se $t = \tan x$.` },
    { nome: 'Metodo dell\'angolo aggiunto', formula: R`a\sin x + b\cos x = R\sin(x + \varphi), \qquad R = \sqrt{a^2+b^2}`, nota: R`Con $\cos\varphi = \dfrac{a}{R}$ e $\sin\varphi = \dfrac{b}{R}$.` },
    { nome: 'Condizione di esistenza (equazione lineare)', formula: R`a\sin x + b\cos x = c \quad \text{ha soluzioni} \iff a^2+b^2 \ge c^2`, nota: R`Cioè $R \ge |c|$, con $R = \sqrt{a^2+b^2}$.` },
    { nome: 'Formule parametriche', formula: R`\sin x = \frac{2t}{1+t^2}, \qquad \cos x = \frac{1-t^2}{1+t^2}, \qquad t = \tan\frac{x}{2}`, nota: R`Va sempre controllato a parte $x = \pi + 2n\pi$, dove $t$ non è definito.` },
    { nome: 'Equazione omogenea di secondo grado', formula: R`a\sin^2x + b\sin x\cos x + c\cos^2x = 0`, nota: R`Se $\cos x \ne 0$ si divide per $\cos^2x$: $a\tan^2x + b\tan x + c = 0$.` },
    { nome: 'Caso cos x = 0 nell\'omogenea', formula: R`\cos x = 0 \ \text{è soluzione} \iff a = 0`, nota: R`Va controllato prima di dividere per $\cos^2x$.` },
    { nome: 'Disequazione elementare: schema risolutivo', formula: R`\sin x > k \quad\Longrightarrow\quad x \in (\text{arco dove l'ordinata supera } k), \ \text{ripetuto ogni } 2\pi`, nota: R`Analogo per $\cos x$ (ascissa) e per $\tan x$ (periodo $\pi$).` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'elementari-seno-coseno', tipo: 'formula', fronte: R`Soluzione generale di $\sin x = k$ (con $|k|\le1$)`, retro: R`$x = \arcsin k + 2n\pi \ \lor\ x = \pi - \arcsin k + 2n\pi$` },
    { id: 'fc-02', sezione: 'elementari-seno-coseno', tipo: 'formula', fronte: R`Soluzione generale di $\cos x = k$ (con $|k|\le1$)`, retro: R`$x = \pm\arccos k + 2n\pi$` },
    { id: 'fc-03', sezione: 'elementari-seno-coseno', tipo: 'concetto', fronte: R`Quando $\sin x = k$ o $\cos x = k$ sono impossibili?`, retro: R`Quando $|k| > 1$: seno e coseno non superano mai $1$ in valore assoluto.` },
    { id: 'fc-04', sezione: 'elementari-seno-coseno', tipo: 'concetto', fronte: R`Perché $\sin x = k$ ha due famiglie di soluzioni?`, retro: R`Perché $\sin(\pi - x) = \sin x$: archi supplementari hanno lo stesso seno.` },
    { id: 'fc-05', sezione: 'elementare-tangente', tipo: 'formula', fronte: R`Soluzione generale di $\tan x = k$`, retro: R`$x = \arctan k + n\pi$, per ogni $k \in \mathbb{R}$.` },
    { id: 'fc-06', sezione: 'elementare-tangente', tipo: 'concetto', fronte: R`Perché $\tan x = k$ ha sempre soluzione, qualunque sia $k$?`, retro: R`Perché il codominio della tangente è tutto $\mathbb{R}$: nessun valore di $k$ è escluso.` },
    { id: 'fc-07', sezione: 'elementare-tangente', tipo: 'concetto', fronte: R`Perché il periodo di $\tan x = k$ è $\pi$ e non $2\pi$?`, retro: R`Perché $\tan(x+\pi) = \tan x$: un mezzo giro basta a ripetere la tangente.` },
    { id: 'fc-08', sezione: 'riconducibili-elementari', tipo: 'procedura', fronte: R`Come si risolve $\sin\alpha = \sin\beta$?`, retro: R`$\alpha = \beta + 2n\pi$ oppure $\alpha = \pi - \beta + 2n\pi$.` },
    { id: 'fc-09', sezione: 'riconducibili-elementari', tipo: 'procedura', fronte: R`Come si risolve $\cos\alpha = \cos\beta$?`, retro: R`$\alpha = \pm\beta + 2n\pi$.` },
    { id: 'fc-10', sezione: 'riconducibili-elementari', tipo: 'procedura', fronte: R`Come si risolve $\tan\alpha = \tan\beta$?`, retro: R`$\alpha = \beta + n\pi$ (con $\cos\alpha \ne 0$, $\cos\beta \ne 0$).` },
    { id: 'fc-11', sezione: 'secondo-grado-in-una-funzione', tipo: 'procedura', fronte: R`Come si risolve un'equazione di secondo grado in $\sin x$?`, retro: R`Si pone $t=\sin x$, si risolve la quadratica in $t$, si scartano le soluzioni con $|t|>1$, poi si risolvono le equazioni elementari rimaste.` },
    { id: 'fc-12', sezione: 'secondo-grado-in-una-funzione', tipo: 'concetto', fronte: R`Perché serve controllare che $t \in [-1,1]$?`, retro: R`Perché $\sin x$ e $\cos x$ sono limitati fra $-1$ e $1$: un valore fuori da quell'intervallo non corrisponde a nessun $x$.` },
    { id: 'fc-13', sezione: 'lineari-seno-coseno', tipo: 'formula', fronte: R`Metodo dell'angolo aggiunto`, retro: R`$a\sin x + b\cos x = R\sin(x+\varphi)$, con $R=\sqrt{a^2+b^2}$, $\cos\varphi=\frac{a}{R}$, $\sin\varphi=\frac{b}{R}$.` },
    { id: 'fc-14', sezione: 'lineari-seno-coseno', tipo: 'concetto', fronte: R`Quando $a\sin x + b\cos x = c$ ha soluzioni?`, retro: R`Quando $a^2+b^2 \ge c^2$, cioè $R \ge |c|$.` },
    { id: 'fc-15', sezione: 'lineari-seno-coseno', tipo: 'formula', fronte: R`Formule parametriche con $t=\tan\frac{x}{2}$`, retro: R`$\sin x = \dfrac{2t}{1+t^2}$, $\cos x = \dfrac{1-t^2}{1+t^2}$.` },
    { id: 'fc-16', sezione: 'lineari-seno-coseno', tipo: 'concetto', fronte: R`Perché va controllato $x=\pi+2n\pi$ nel metodo parametrico?`, retro: R`Perché lì $\tan\frac{x}{2}$ non è definita: se ne perderebbe la verifica se non lo si controlla a parte.` },
    { id: 'fc-17', sezione: 'omogenee', tipo: 'definizione', fronte: R`Equazione omogenea di secondo grado (in seno e coseno)`, retro: R`$a\sin^2x+b\sin x\cos x+c\cos^2x=0$: ogni termine ha grado $2$, il termine noto è zero.` },
    { id: 'fc-18', sezione: 'omogenee', tipo: 'procedura', fronte: R`Come si risolve un'equazione omogenea?`, retro: R`Si controlla se $\cos x=0$ è soluzione, poi (se non lo è) si divide per $\cos^2x$: si ottiene $a\tan^2x+b\tan x+c=0$.` },
    { id: 'fc-19', sezione: 'omogenee', tipo: 'concetto', fronte: R`Quando $\cos x = 0$ è soluzione dell'omogenea?`, retro: R`Solo se $a=0$: sostituendo $\cos x=0$ (e quindi $\sin^2x=1$) l'equazione diventa $a=0$.` },
    { id: 'fc-20', sezione: 'disequazioni-elementari', tipo: 'procedura', fronte: R`Come si risolve $\sin x > k$ con la circonferenza?`, retro: R`Si traccia $y=k$ e si individua l'arco (o gli archi) dove l'ordinata dei punti supera $k$.` },
    { id: 'fc-21', sezione: 'disequazioni-elementari', tipo: 'concetto', fronte: R`Che forma ha la soluzione di una disequazione goniometrica elementare?`, retro: R`Uno o più intervalli, ripetuti con periodo $2\pi$ (o $\pi$ per la tangente): quasi mai punti isolati.` },
    { id: 'fc-22', sezione: 'disequazioni-riconducibili', tipo: 'procedura', fronte: R`Come si risolve una disequazione goniometrica prodotto o fratta?`, retro: R`Si studia il segno di ciascun fattore (disequazioni elementari), si costruisce la tabella dei segni sullo stesso periodo, si legge il segno finale.` },
    { id: 'fc-23', sezione: 'sistemi-cenni', tipo: 'concetto', fronte: R`Le soluzioni di un sistema di condizioni goniometriche sono...`, retro: R`L'intersezione delle soluzioni di ciascuna condizione, non l'unione.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $\sin x = \dfrac{1}{2}$ nell'intervallo $[0, 2\pi)$ (dai le soluzioni come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`Pensa alla circonferenza goniometrica: per quali archi l'ordinata vale $\frac12$?`, R`Ci sono due soluzioni: una nel primo quadrante, una nel secondo.`], risposta: { tipo: 'numeri', valori: [0.5236, 2.618] }, soluzione: [R`$\arcsin\dfrac12 = \dfrac{\pi}{6}$.`, R`Le due soluzioni in $[0,2\pi)$ sono $x=\dfrac{\pi}{6}$ e $x=\pi-\dfrac{\pi}{6}=\dfrac{5\pi}{6}$.`] },

    { id: 'es-02', difficolta: 1, testo: R`Risolvi $\cos x = -1$ nell'intervallo $[0, 2\pi)$ (dai la soluzione come valore decimale o come frazione di $\pi$ scritta in forma numerica).`, suggerimenti: [R`Su quale punto della circonferenza goniometrica il coseno vale esattamente $-1$?`, R`È un unico punto, non due.`], risposta: { tipo: 'numero', valore: 3.1416, tolleranza: 0.01 }, soluzione: [R`Il coseno vale $-1$ solo nel punto $(-1,0)$ della circonferenza, cioè per $x=\pi$.`, R`In $[0,2\pi)$ c'è un'unica soluzione: $x=\pi$.`] },

    { id: 'es-03', difficolta: 1, testo: R`Risolvi $\tan x = -1$ nell'intervallo $[0, 2\pi)$ (dai le soluzioni come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`$\arctan(-1) = -\dfrac{\pi}{4}$: cerca l'angolo equivalente in $[0,2\pi)$.`, R`Il periodo della tangente è $\pi$: la seconda soluzione è la prima più $\pi$.`], risposta: { tipo: 'numeri', valori: [2.3562, 5.4978] }, soluzione: [R`$\tan x = -1$ per $x=\dfrac{3\pi}{4}$ (secondo quadrante).`, R`La seconda soluzione in $[0,2\pi)$ è $\dfrac{3\pi}{4}+\pi=\dfrac{7\pi}{4}$.`] },

    { id: 'es-04', difficolta: 2, testo: R`Risolvi $\sin(2x) = \sin x$ nell'intervallo $[0, 2\pi)$ (dai le soluzioni come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`Porta tutto a un membro e usa la formula di duplicazione $\sin 2x = 2\sin x\cos x$.`, R`Dovresti arrivare a $\sin x\,(2\cos x - 1) = 0$: un prodotto nullo.`], risposta: { tipo: 'numeri', valori: [0, 1.0472, 3.1416, 5.236] }, soluzione: [R`$2\sin x\cos x - \sin x = 0 \Rightarrow \sin x\,(2\cos x-1)=0$.`, R`$\sin x = 0 \Rightarrow x=0 \lor x=\pi$.`, R`$\cos x = \dfrac12 \Rightarrow x=\dfrac{\pi}{3} \lor x=\dfrac{5\pi}{3}$.`, R`In $[0,2\pi)$: $x \in \left\{0, \dfrac{\pi}{3}, \pi, \dfrac{5\pi}{3}\right\}$.`] },

    { id: 'es-05', difficolta: 2, testo: R`Risolvi $2\sin^2x + \sin x - 1 = 0$ nell'intervallo $[0, 2\pi)$ (dai le soluzioni come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`Poni $t = \sin x$ e risolvi la quadratica in $t$.`, R`Dovresti trovare $t=\dfrac12$ e $t=-1$: entrambi accettabili.`], risposta: { tipo: 'numeri', valori: [0.5236, 2.618, 4.7124] }, soluzione: [R`$t=\sin x$: $2t^2+t-1=0$, $\Delta=1+8=9$, $t=\dfrac{-1\pm3}{4}$: $t=\dfrac12$ o $t=-1$.`, R`$\sin x=\dfrac12 \Rightarrow x=\dfrac{\pi}{6} \lor x=\dfrac{5\pi}{6}$.`, R`$\sin x=-1 \Rightarrow x=\dfrac{3\pi}{2}$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Risolvi l'equazione omogenea $\sqrt3\sin^2x - 2\sin x\cos x - \sqrt3\cos^2x = 0$ nell'intervallo $[0, 2\pi)$ (dai le soluzioni come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`Controlla prima se $\cos x=0$ è soluzione: qui $a=\sqrt3\ne0$, quindi no.`, R`Dividi per $\cos^2x$: ottieni $\sqrt3\tan^2x-2\tan x-\sqrt3=0$.`], risposta: { tipo: 'numeri', valori: [1.0472, 2.618, 4.1888, 5.7596] }, soluzione: [R`$\cos x=0$ darebbe $\sqrt3\cdot1-0-0=\sqrt3\ne0$: non è soluzione, si può dividere per $\cos^2x$.`, R`$\sqrt3\tan^2x-2\tan x-\sqrt3=0$: $\Delta=4+12=16$, $\tan x=\dfrac{2\pm4}{2\sqrt3}$, cioè $\tan x=\sqrt3$ o $\tan x=-\dfrac{1}{\sqrt3}$.`, R`$\tan x=\sqrt3 \Rightarrow x=\dfrac{\pi}{3} \lor x=\dfrac{4\pi}{3}$.`, R`$\tan x=-\dfrac{1}{\sqrt3} \Rightarrow x=\dfrac{5\pi}{6} \lor x=\dfrac{11\pi}{6}$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Risolvi $\sin x - \sqrt3\cos x = 1$ nell'intervallo $[0, 2\pi)$ con il metodo dell'angolo aggiunto (dai le soluzioni come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`Calcola $R=\sqrt{a^2+b^2}$ con $a=1$, $b=-\sqrt3$: dovresti trovare $R=2$.`, R`Riscrivi come $2\sin\left(x-\dfrac{\pi}{3}\right)=1$.`], risposta: { tipo: 'numeri', valori: [1.5708, 3.6652] }, soluzione: [R`$R=\sqrt{1+3}=2$. Poiché $\cos\dfrac{\pi}{3}=\dfrac12$ e $\sin\dfrac{\pi}{3}=\dfrac{\sqrt3}{2}$, si ha $\sin x-\sqrt3\cos x = 2\sin\left(x-\dfrac{\pi}{3}\right)$.`, R`L'equazione diventa $\sin\left(x-\dfrac{\pi}{3}\right)=\dfrac12$: $x-\dfrac{\pi}{3}=\dfrac{\pi}{6}+2n\pi$ oppure $x-\dfrac{\pi}{3}=\dfrac{5\pi}{6}+2n\pi$.`, R`$x=\dfrac{\pi}{2}+2n\pi$ oppure $x=\dfrac{7\pi}{6}+2n\pi$. In $[0,2\pi)$: $x=\dfrac{\pi}{2}$ e $x=\dfrac{7\pi}{6}$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Risolvi la disequazione $2\sin x + 1 \le 0$ nell'intervallo $[0, 2\pi)$ (dai gli estremi dell'intervallo soluzione come valori decimali o come frazioni di $\pi$ scritte in forma numerica).`, suggerimenti: [R`Isola il seno: $\sin x \le -\dfrac12$.`, R`Pensa alla circonferenza: dove l'ordinata è minore o uguale a $-\dfrac12$?`], risposta: { tipo: 'intervallo', da: 3.6652, a: 5.7596, chiusoDa: true, chiusoA: true }, soluzione: [R`$\sin x \le -\dfrac12$.`, R`$\sin x = -\dfrac12$ per $x=\dfrac{7\pi}{6}$ e $x=\dfrac{11\pi}{6}$; il seno è minore o uguale a $-\dfrac12$ nell'arco fra questi due punti (quello "sotto").`, R`Soluzione in $[0,2\pi)$: $\dfrac{7\pi}{6} \le x \le \dfrac{11\pi}{6}$.`] },

    { id: 'es-09', difficolta: 3, testo: R`Risolvi la disequazione $(2\sin x - 1)(2\cos x + 1) > 0$ nell'intervallo $[0, 2\pi)$.`, suggerimenti: [R`Studia il segno di ciascun fattore separatamente, come per una disequazione algebrica.`, R`$2\sin x - 1 > 0$ per $x \in \left(\dfrac{\pi}{6}, \dfrac{5\pi}{6}\right)$; $2\cos x+1>0$ per $x \in \left(0,\dfrac{2\pi}{3}\right)\cup\left(\dfrac{4\pi}{3},2\pi\right)$.`, R`Costruisci la tabella dei segni sui quattro punti $\dfrac{\pi}{6}, \dfrac{2\pi}{3}, \dfrac{5\pi}{6}, \dfrac{4\pi}{3}$ e cerca dove concordano.`], soluzione: [R`Primo fattore: $2\sin x-1>0 \iff \sin x>\dfrac12 \iff x\in\left(\dfrac{\pi}{6},\dfrac{5\pi}{6}\right)$.`, R`Secondo fattore: $2\cos x+1>0 \iff \cos x>-\dfrac12 \iff x\in\left(0,\dfrac{2\pi}{3}\right)\cup\left(\dfrac{4\pi}{3},2\pi\right)$.`, R`Tabella dei segni sui quattro punti $\dfrac{\pi}{6}<\dfrac{2\pi}{3}<\dfrac{5\pi}{6}<\dfrac{4\pi}{3}$: il prodotto è positivo su $\left(\dfrac{\pi}{6},\dfrac{2\pi}{3}\right)$ e su $\left(\dfrac{5\pi}{6},\dfrac{4\pi}{3}\right)$.`, R`Soluzione: $x\in\left(\dfrac{\pi}{6},\dfrac{2\pi}{3}\right)\cup\left(\dfrac{5\pi}{6},\dfrac{4\pi}{3}\right)$.`] },

    { id: 'es-10', difficolta: 3, testo: R`Trova, con $x \in [0, 2\pi)$, l'unica soluzione del sistema $\cos x = -\dfrac12$, $\sin x < 0$ (dai la soluzione come valore decimale o come frazione di $\pi$ scritta in forma numerica).`, suggerimenti: [R`Risolvi prima $\cos x=-\dfrac12$ da sola: due soluzioni.`, R`Fra le due, tieni solo quella con seno negativo.`], risposta: { tipo: 'numero', valore: 4.1888, tolleranza: 0.01 }, soluzione: [R`$\cos x=-\dfrac12 \Rightarrow x=\dfrac{2\pi}{3} \lor x=\dfrac{4\pi}{3}$.`, R`$\sin\dfrac{2\pi}{3}=\dfrac{\sqrt3}{2}>0$: scartata. $\sin\dfrac{4\pi}{3}=-\dfrac{\sqrt3}{2}<0$: accettata.`, R`Soluzione del sistema: $x=\dfrac{4\pi}{3}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale condizione rende risolvibile $\sin x = k$?`, opzioni: [R`$k$ è un numero intero`, R`$-1 \le k \le 1$`, R`$k > 0$`, R`$k$ è multiplo di $\pi$`], corretta: 1, spiegazione: R`Il seno ha codominio $[-1,1]$: solo i valori di $k$ in quell'intervallo sono raggiunti.` },
    { id: 'q-02', domanda: R`L'equazione $\cos x = 2$…`, opzioni: [R`ha due soluzioni per periodo`, R`ha una sola soluzione`, R`è impossibile`, R`ha soluzione $x=0$`], corretta: 2, spiegazione: R`Il coseno non supera mai $1$ in valore assoluto: $2$ non è mai raggiunto, l'equazione è impossibile.` },
    { id: 'q-03', domanda: R`La soluzione generale di $\sin x = k$ (con $|k|\le1$) è…`, opzioni: [R`$x=\arcsin k + k\pi$`, R`$x=\pm\arcsin k+2n\pi$`, R`$x=\arcsin k+2n\pi \ \lor\ x=\pi-\arcsin k+2n\pi$`, R`$x=\arcsin k + n\pi$`], corretta: 2, spiegazione: R`Servono entrambe le famiglie: quella dell'arco stesso e quella del suo supplementare, ciascuna ripetuta ogni $2\pi$.` },
    { id: 'q-04', domanda: R`La soluzione generale di $\cos x = k$ (con $|k|\le1$) è…`, opzioni: [R`$x=\pm\arccos k+2n\pi$`, R`$x=\arccos k + n\pi$`, R`$x=\arccos k+2n\pi \ \lor\ x=\pi-\arccos k+2n\pi$`, R`$x=\arccos k+\frac{n\pi}{2}$`], corretta: 0, spiegazione: R`Due archi opposti hanno lo stesso coseno: $x=\arccos k+2n\pi$ oppure $x=-\arccos k+2n\pi$, cioè $\pm\arccos k+2n\pi$.` },
    { id: 'q-05', domanda: R`Perché $\tan x=k$ ha sempre soluzione, per qualunque $k$ reale?`, opzioni: [R`Perché la tangente ha periodo $2\pi$`, R`Perché il codominio della tangente è tutto $\mathbb{R}$`, R`Perché $\tan x$ è sempre positiva`, R`Perché $\tan x$ non è mai definita`], corretta: 1, spiegazione: R`A differenza di seno e coseno, la tangente assume ogni valore reale: nessuna condizione su $k$ è necessaria.` },
    { id: 'q-06', domanda: R`Qual è il periodo della soluzione generale di $\tan x=k$?`, opzioni: [R`$2\pi$`, R`$\pi/2$`, R`$4\pi$`, R`$\pi$`], corretta: 3, spiegazione: R`$\tan(x+\pi)=\tan x$: la tangente si ripete ogni mezzo giro, non ogni giro intero come seno e coseno.` },
    { id: 'q-07', domanda: R`Per risolvere $\sin 2x=\sin\left(x+\frac{\pi}{3}\right)$ si impone…`, opzioni: [R`$2x=x+\frac{\pi}{3}$ soltanto`, R`$2x=x+\frac{\pi}{3}+2n\pi$ oppure $2x=\pi-\left(x+\frac{\pi}{3}\right)+2n\pi$`, R`$4x=x^2+\frac{\pi}{3}$`, R`la sostituzione $t=\sin 2x$`], corretta: 1, spiegazione: R`Due seni uguali richiedono argomenti uguali a meno di $2n\pi$, oppure supplementari a meno di $2n\pi$: entrambi i casi vanno considerati.` },
    { id: 'q-08', domanda: R`$\cos\alpha=\cos\beta$ se e solo se…`, opzioni: [R`$\alpha$ e $\beta$ sono supplementari`, R`$\alpha=\beta+n\pi$`, R`$\alpha=\pm\beta+2n\pi$`, R`$\alpha-\beta=\pi$`], corretta: 2, spiegazione: R`Due archi hanno lo stesso coseno se sono uguali o opposti, a meno di multipli interi di $2\pi$.` },
    { id: 'q-09', domanda: R`Nell'equazione $2\sin^2x-\sin x-1=0$, posto $t=\sin x$, quale controllo va fatto sulle soluzioni della quadratica in $t$?`, opzioni: [R`Che $t$ sia un numero intero`, R`Che $t$ appartenga a $[-1,1]$`, R`Che $t$ sia positivo`, R`Nessuno: si accettano tutte`], corretta: 1, spiegazione: R`$\sin x$ non può uscire da $[-1,1]$: una soluzione della quadratica fuori da quell'intervallo va scartata.` },
    { id: 'q-10', domanda: R`In un'equazione omogenea $a\sin^2x+b\sin x\cos x+c\cos^2x=0$, prima di dividere per $\cos^2x$ bisogna…`, opzioni: [R`Controllare se $\cos x=0$ è soluzione`, R`Controllare se $\sin x=0$ è soluzione`, R`Moltiplicare tutto per $\cos^2x$`, R`Porre $t=\sin x$`], corretta: 0, spiegazione: R`Si può dividere per $\cos^2x$ solo se non è zero: va verificato prima se $\cos x=0$ soddisfa l'equazione.` },
    { id: 'q-11', domanda: R`Nel metodo dell'angolo aggiunto, $a\sin x+b\cos x$ si scrive come…`, opzioni: [R`$R\sin(x+\varphi)$, con $R=\sqrt{a^2+b^2}$`, R`$(a+b)\sin x$`, R`$R\cos(x-\varphi)$, con $R=ab$`, R`$a\sin x\cdot b\cos x$`], corretta: 0, spiegazione: R`È l'identità del seno della somma usata al contrario, con $R$ l'ampiezza $\sqrt{a^2+b^2}$.` },
    { id: 'q-12', domanda: R`L'equazione $a\sin x+b\cos x=c$ ammette soluzioni se e solo se…`, opzioni: [R`$c=0$`, R`$a=b$`, R`$c \ge 0$`, R`$a^2+b^2\ge c^2$`], corretta: 3, spiegazione: R`Serve $\left|\frac{c}{R}\right|\le1$ con $R=\sqrt{a^2+b^2}$, cioè $a^2+b^2\ge c^2$.` },
    { id: 'q-13', domanda: R`Nelle formule parametriche con $t=\tan\frac{x}{2}$, perché va controllato a parte $x=\pi+2n\pi$?`, opzioni: [R`Perché lì $t$ non è definito`, R`Perché lì $\sin x=0$ sempre`, R`Perché è sempre soluzione`, R`Perché $\cos x$ non esiste`], corretta: 0, spiegazione: R`$\tan\frac{x}{2}$ non è definita per $x=\pi+2n\pi$: la sostituzione non "vede" quel valore, va controllato sostituendolo nell'equazione originale.` },
    { id: 'q-14', domanda: R`Per risolvere graficamente $\sin x > k$ con la circonferenza goniometrica si cerca…`, opzioni: [R`L'arco in cui l'ascissa supera $k$`, R`L'arco in cui l'ordinata supera $k$`, R`Il punto in cui $x=k$`, R`L'angolo il cui coseno è $k$`], corretta: 1, spiegazione: R`Il seno è l'ordinata del punto sulla circonferenza: si cerca dove quell'ordinata supera $k$.` },
    { id: 'q-15', domanda: R`Una disequazione come $(2\sin x-1)(2\cos x+1)>0$ si affronta…`, opzioni: [R`Risolvendola come un'equazione`, R`Studiando il segno dei due fattori, come per le disequazioni algebriche`, R`Sommando membro a membro`, R`Ignorando uno dei due fattori`], corretta: 1, spiegazione: R`Vale lo stesso schema delle disequazioni algebriche: segno di ciascun fattore, tabella dei segni, lettura del risultato.` },
    { id: 'q-16', domanda: R`In un sistema di condizioni goniometriche (equazioni e/o disequazioni), l'insieme delle soluzioni è…`, opzioni: [R`L'unione delle soluzioni di ciascuna condizione`, R`Sempre l'insieme vuoto`, R`Solo i valori interi`, R`L'intersezione delle soluzioni di ciascuna condizione`], corretta: 3, spiegazione: R`Un sistema richiede che tutte le condizioni valgano insieme: le soluzioni sono quelle comuni a tutte, cioè l'intersezione.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Dimenticare il $+2n\pi$ (o il $+n\pi$ per la tangente) e dare solo la soluzione "principale": un'equazione goniometrica ha quasi sempre infinite soluzioni.` },
    { tipo: 'errore', testo: R`Nell'equazione omogenea, dividere per $\cos^2x$ senza aver controllato se $\cos x=0$ è soluzione: si rischia di perderla.` },
    { tipo: 'trucco', testo: R`Nelle equazioni riconducibili, ricorda sempre entrambi i casi: argomenti uguali **e** supplementari per il seno, argomenti uguali **e** opposti per il coseno.` },
    { tipo: 'metodo', testo: R`Prima di scrivere $\arcsin k$ o $\arccos k$, controlla che $|k|\le 1$: se non lo è, l'equazione è impossibile e hai già finito.` },
    { tipo: 'trucco', testo: R`Nell'equazione lineare $a\sin x+b\cos x=c$, calcola subito $R=\sqrt{a^2+b^2}$: se $R<|c|$ non serve nemmeno risolvere, non ci sono soluzioni.` },
    { tipo: 'errore', testo: R`Nel metodo delle formule parametriche, dimenticare di controllare $x=\pi+2n\pi$ a parte: è l'unico valore che la sostituzione $t=\tan\frac{x}{2}$ non può rappresentare.` },
    { tipo: 'metodo', testo: R`Per le disequazioni, disegna sempre la circonferenza o il grafico: fidarsi a memoria di dove sta il segno è la causa più comune di errore.` },
    { tipo: 'trucco', testo: R`In una disequazione fratta, il denominatore va sempre escluso dalla soluzione finale, anche quando il segno richiesto sembrerebbe includerlo.` }
  ],

  aneddoti: [
    { matematico: 'Galileo Galilei', anni: '1564–1642', titolo: 'Il lampadario che misurava il tempo', testo: R`Si racconta che un giovane Galileo, ancora studente di medicina, osservasse durante una funzione nel Duomo di Pisa il lampadario appeso al soffitto oscillare per una corrente d'aria, e ne misurasse il tempo con il proprio polso, non avendo un orologio. Si accorse che il periodo delle oscillazioni restava lo stesso anche quando l'ampiezza diminuiva: è l'**isocronismo del pendolo**, valido con buona approssimazione per piccole oscillazioni. L'aneddoto del polso è probabilmente abbellito nei secoli, ma l'osservazione è autentica: Galileo la descrisse nei *Discorsi e dimostrazioni matematiche* (1638) e la usò per proporre un orologio a pendolo, che però non costruì mai.`, legame: R`Un pendolo che oscilla descrive, nel tempo, una funzione sinusoidale: la sua posizione è (in buona approssimazione) del tipo $A\sin(\omega t)$, la stessa forma delle equazioni lineari in seno e coseno.` },
    { matematico: 'Christiaan Huygens', anni: '1629–1695', titolo: 'Dall\'isocronismo al primo orologio preciso', testo: R`Nel 1656 l'olandese Christiaan Huygens trasformò l'intuizione di Galileo in una macchina funzionante: il primo **orologio a pendolo**, brevettato l'anno dopo. L'errore degli orologi meccanici dell'epoca, che potevano sbagliare anche quindici minuti al giorno, scese a pochi secondi. Huygens però scoprì anche il limite dell'idea di Galileo: un pendolo che oscilla lungo un arco di cerchio è isocrono solo *approssimativamente*, per piccole oscillazioni; per un isocronismo perfetto, a qualunque ampiezza, il punto dovrebbe muoversi lungo una **cicloide**, non un arco di cerchio. Costruì persino guance metalliche sagomate per costringere il filo del pendolo a seguire quella curva.`, legame: R`L'orologio di Huygens funziona perché la posizione del pendolo è una funzione periodica del tempo: risolvere "quando il pendolo è a una certa altezza" è, in sostanza, un'equazione o disequazione goniometrica.` },
    { matematico: 'François Viète', anni: '1540–1603', titolo: 'Una sfida a tutti i matematici del mondo', testo: R`Nel 1593 il fiammingo Adriaan van Roomen lanciò una sfida "a tutti i matematici del mondo": risolvere un'equazione di **grado 45**. L'ambasciatore olandese alla corte di Francia si vantò che nessun francese ne sarebbe stato capace; il re Enrico IV convocò allora François Viète, già noto come crittografo (decifrava per il re i codici segreti spagnoli). Viète riconobbe che l'equazione di van Roomen era, nascosta dentro coefficienti numerici, la formula che esprime $\sin(45\theta)$ in funzione di $\sin\theta$: un problema trigonometrico travestito da equazione algebrica. Usando questa chiave trovò in poche ore tutte le $23$ soluzioni positive, sbalordendo la corte.`, legame: R`Van Roomen aveva scritto un'equazione di grado altissimo in una funzione goniometrica: Viète la riconobbe e la risolse con la sostituzione giusta, proprio come in "secondo grado in una funzione goniometrica".` },
    { matematico: 'Joseph Fourier', anni: '1768–1830', titolo: 'Ogni onda è una somma di seni e coseni', testo: R`Nel 1822 Joseph Fourier pubblicò la *Théorie analytique de la chaleur*, dove sosteneva una tesi che i matematici avevano accolto con diffidenza fin dalla prima memoria del 1807 (Lagrange per primo): qualunque fenomeno periodico, per quanto complicato o spigoloso, si può scrivere come una **somma di seni e coseni** di frequenze diverse. L'idea nacque studiando come il calore si propaga in una sbarra metallica, ma si rivelò universale: oggi le "serie di Fourier" stanno dietro alla compressione audio, alle immagini digitali e all'analisi di qualunque segnale che oscilli nel tempo. Ci vollero decenni perché la comunità matematica accettasse pienamente il risultato, oggi alla base dell'analisi armonica.`, legame: R`L'espressione $a\sin x+b\cos x$ delle equazioni lineari in seno e coseno è, in miniatura, il mattone più semplice di una somma di Fourier: un'onda sola, prima di sommarne altre.` },
    { matematico: 'William Thomson (Lord Kelvin)', anni: '1824–1907', titolo: 'La macchina che prevedeva le maree', testo: R`Le maree non sono un'unica sinusoide: sono la somma di decine di componenti periodiche, legate ai moti della Luna e del Sole, ciascuna con la propria ampiezza e il proprio periodo. Negli anni 1870 il fisico britannico William Thomson, poi nominato Lord Kelvin, progettò una **macchina analogica** che sommava meccanicamente queste componenti tramite un sistema di pulegge e ruote dentate, tracciando su carta la previsione del livello del mare per mesi in anticipo. Macchine di questo tipo, perfezionate nei decenni successivi, furono usate da marine e porti in tutto il mondo fino a metà Novecento, quando i calcolatori elettronici presero il loro posto.`, legame: R`Ogni componente della marea è un termine del tipo $a\sin x+b\cos x$: prevedere quando il livello supera una soglia è, per ciascuna componente, risolvere una disequazione lineare in seno e coseno.` }
  ]
});
})();
