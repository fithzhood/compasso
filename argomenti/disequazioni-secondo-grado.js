(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'disequazioni-secondo-grado',
  titolo: 'Disequazioni di secondo grado',

  introduzione: R`Una disequazione di secondo grado, ridotta a forma normale, confronta con zero un trinomio: $ax^2 + bx + c > 0$ (o con $<,\ \le,\ \ge$), con $a \ne 0$. A differenza di un'equazione, che di solito ha un numero finito di soluzioni, una disequazione ne ha quasi sempre infinite: un intervallo, un'unione di intervalli, oppure tutto $\mathbb{R}$ o l'insieme vuoto.

Il modo più diretto per risolverle è guardare la parabola $y = ax^2 + bx + c$: chiedersi dove il trinomio è positivo o negativo equivale a chiedersi dove quella parabola sta sopra o sotto l'asse delle $x$. Le disequazioni di secondo grado servono ogni volta che una grandezza — un'area, un ricavo, l'altezza di un oggetto lanciato — deve superare o non superare una soglia: un lancio resta sopra una certa altezza solo in un intervallo di tempo, un'azienda ha ricavo positivo solo producendo più di una certa quantità e meno di un'altra.

Per seguire bene serve saper risolvere le equazioni di secondo grado (discriminante, formula risolutiva, scomposizione del trinomio) e le disequazioni di primo grado, compreso l'effetto di moltiplicare per un numero negativo.`,

  sezioni: [
    { id: 'segno-trinomio', titolo: 'Il segno del trinomio sulla parabola', testo: R`Una disequazione di secondo grado, in forma normale, è un confronto fra il trinomio $ax^2+bx+c$ (con $a \ne 0$) e zero. Risolverla significa stabilire per quali $x$ il trinomio ha quel segno — la stessa domanda che ci si pone leggendo la parabola $y=ax^2+bx+c$: dove sta sopra l'asse $x$ (segno $+$) e dove sta sotto (segno $-$).

Il comportamento dipende da due soli ingredienti: il segno di $a$ (che decide se la parabola è rivolta verso l'alto o verso il basso) e il segno del discriminante $\Delta=b^2-4ac$ (che decide se, e dove, la parabola incontra l'asse $x$). Combinandoli si ottengono sei casi, ma la regola che li riassume è una sola:

>* Se $\Delta>0$ (due radici $x_1<x_2$), il trinomio ha il segno di $a$ per $x$ **esterno** alle radici e il segno opposto per $x$ **interno**. Se $\Delta=0$ (radice doppia), il trinomio ha sempre il segno di $a$, tranne che nella radice, dove vale $0$. Se $\Delta<0$ (nessuna radice), il trinomio ha il segno di $a$ per **ogni** $x$ reale, senza eccezioni.

Per esempio $y=x^2-2x-3$ ha $a=1>0$ e $\Delta=4+12=16>0$, con radici $x_1=-1$ e $x_2=3$: il trinomio è positivo per $x<-1$ o $x>3$ (fuori dalle radici) e negativo per $-1<x<3$ (fra le radici), come mostra il grafico.

[[grafico:segnoParabola]]

Cambiando il segno di $a$ tutto si ribalta: la parabola si capovolge, e con essa il segno letto fuori e dentro le radici. Prova a muovere il cursore nel grafico seguente.

[[grafico:concavitaA]]

>! Il segno del trinomio **non dipende solo dalle radici**: due trinomi con le stesse radici ma $a$ di segno opposto (per esempio $(x+1)(x-3)$ e $-(x+1)(x-3)$) hanno segno opposto in ogni punto. Guardare solo dove si annulla il trinomio, senza controllare il segno di $a$, è l'errore più comune di tutto l'argomento.` },

    { id: 'schema-esterni-interni', titolo: 'Lo schema: valori esterni, valori interni', testo: R`Quando $a>0$ e $\Delta>0$ — il caso più frequente — conviene ricordare uno schema pratico invece di rifare il ragionamento ogni volta. Dette $x_1<x_2$ le radici di $ax^2+bx+c=0$:

>* **Schema pratico (con $a>0$):** $ax^2+bx+c>0$ ha soluzione $x<x_1 \ \lor\ x>x_2$ (**valori esterni**); $ax^2+bx+c<0$ ha soluzione $x_1<x<x_2$ (**valori interni**). Con $\ge$ o $\le$ si includono anche gli estremi.

Il nome viene dalla posizione delle soluzioni rispetto alle due radici sulla retta reale: "fuori" dall'intervallo fra $x_1$ e $x_2$, oppure "dentro". Per $x^2-2x-3>0$ (radici $-1$ e $3$): valori esterni.

[[grafico:rettaEsterni]]

Per $x^2-2x-3<0$: valori interni.

[[grafico:rettaInterni]]

Se $a<0$, lo schema **non si applica direttamente**: prima si moltiplica tutta la disequazione per $-1$, ricordando di **cambiare il verso** (come per le disequazioni di primo grado), così da ricondursi a un $a$ positivo. Per esempio $-x^2+2x+3>0$ diventa, moltiplicando per $-1$, $x^2-2x-3<0$, cioè valori interni: $-1<x<3$.

Il grafico seguente lascia trascinare le due radici: osserva come la zona sopra l'asse resti sempre quella esterna all'intervallo fra le radici, qualunque coppia si scelga.

[[grafico:radiciSegno]]

>! "Esterno" e "interno" si riferiscono **sempre** all'intervallo fra le due radici nell'ordine giusto, $x_1<x_2$: scrivere $x_2<x<x_1$ non ha senso, perché nessun numero è insieme maggiore del più grande e minore del più piccolo.` },

    { id: 'delta-non-positivo', titolo: 'Quando Δ non è positivo: sempre vere, mai vere, un punto escluso', testo: R`Se $\Delta \le 0$ la parabola non taglia l'asse $x$ in due punti distinti, e lo schema esterno/interno non si può applicare: non ci sono due radici fra cui stare "dentro" o "fuori". Bisogna ragionare caso per caso, guardando solo il segno di $a$.

**$\Delta=0$.** Il trinomio è un quadrato perfetto (a meno del fattore $a$): per esempio $x^2-6x+9=(x-3)^2$. Poiché un quadrato non è mai negativo:

- $(x-3)^2 \ge 0$: vera per **ogni** $x$ reale ($\mathbb{R}$);
- $(x-3)^2 > 0$: vera per ogni $x$ **tranne** $x=3$, dove vale esattamente $0$ (un punto escluso);
- $(x-3)^2 \le 0$: vera solo per $x=3$ (l'unico punto in cui il quadrato vale $0$);
- $(x-3)^2 < 0$: mai vera, $\varnothing$ (un quadrato non è mai negativo).

[[grafico:rettaEscluso]]

**$\Delta<0$.** Il trinomio non si annulla mai e ha sempre il segno di $a$. Per $x^2+2x+5$ (che si scrive $(x+1)^2+4$, sempre $\ge 4$): $x^2+2x+5>0$ è vera per ogni $x$ reale, mentre $x^2+2x+5<0$ non è mai vera. Con $a<0$ i ruoli si scambiano: il trinomio sarebbe sempre negativo, mai positivo.

>* Con $\Delta \le 0$ la disequazione non ha mai come soluzione un intervallo "fra due radici" o "fuori da due radici": è sempre vera, mai vera, oppure vera con un solo punto escluso (o vera in un solo punto, con $\Delta=0$ e verso $\le$ o $\ge$).

>! Non confondere "mai vera" con "impossibile da calcolare": è una risposta corretta e completa, da scrivere come $S=\varnothing$, non lasciata in bianco.` },

    { id: 'sistemi', titolo: 'Sistemi di disequazioni di secondo grado', testo: R`Un **sistema di disequazioni** chiede che più disequazioni siano vere **contemporaneamente**. Il metodo non cambia rispetto al primo grado: si risolve ciascuna disequazione per conto proprio, poi si disegnano tutte le soluzioni sulla stessa retta reale e si prende la parte comune, l'**intersezione**.

Consideriamo il sistema $$\begin{cases} x^2-4x+3 \le 0 \\ x^2-1>0 \end{cases}$$

Prima disequazione: $(x-1)(x-3)\le 0$, valori interni con gli estremi inclusi, $1 \le x \le 3$. Seconda disequazione: $(x-1)(x+1)>0$, valori esterni, $x<-1 \ \lor\ x>1$. Sovrapponendo i due intervalli sulla retta reale, la parte in comune è $1<x\le 3$: il punto $x=1$ appartiene alla prima soluzione ma non alla seconda (che lo richiede strettamente maggiore di $1$), quindi resta escluso.

[[grafico:rettaSistema]]

>* La soluzione di un sistema è l'**intersezione**, non l'unione: un valore deve soddisfare **tutte** le disequazioni insieme. Conviene sempre disegnare le soluzioni singole sulla stessa retta, allineate, prima di leggere l'intersezione.

Se le soluzioni delle singole disequazioni non si sovrappongono affatto, il sistema è impossibile, $S=\varnothing$: succede spesso quando una disequazione chiede valori esterni a un intervallo e un'altra valori interni a un intervallo disgiunto dal primo.

>! Attenzione ai casi limite: se un estremo è incluso in una disequazione ma escluso nell'altra (come $x=1$ sopra), nel risultato finale **resta escluso**. Basta che una sola condizione lo escluda perché non sia soluzione del sistema.` },

    { id: 'fratte-e-prodotto', titolo: 'Disequazioni fratte e disequazioni prodotto', testo: R`Una **disequazione prodotto** confronta con $0$ un prodotto di due o più fattori, per esempio la stessa $x^2-2x-3>0$ scritta come $(x-3)(x+1)>0$: un modo alternativo di risolverla, utile soprattutto quando i fattori non sono tutti di secondo grado. Si segnano sulla retta gli zeri di ciascun fattore e si costruisce la **tabella dei segni**: una riga per fattore, il segno in ogni intervallo, poi si moltiplicano i segni colonna per colonna.

| intervallo | $x-3$ | $x+1$ | prodotto |
|---|---|---|---|
| $x<-1$ | $-$ | $-$ | $+$ |
| $-1<x<3$ | $-$ | $+$ | $-$ |
| $x>3$ | $+$ | $+$ | $+$ |

Stesso risultato di prima: positivo fuori dalle radici. Una **disequazione fratta** ha l'incognita anche a denominatore, per esempio $\dfrac{x-1}{x^2-4}\ge 0$. Il denominatore si scompone, $x^2-4=(x-2)(x+2)$, e si tratta come fattori in più nella tabella, con una regola in aggiunta: i loro zeri sono sempre **condizioni di esistenza** ed escludono quei valori dal risultato, qualunque sia il verso della disequazione.

| intervallo | $x-1$ | $x-2$ | $x+2$ | frazione |
|---|---|---|---|---|
| $x<-2$ | $-$ | $-$ | $-$ | $-$ |
| $-2<x<1$ | $-$ | $-$ | $+$ | $+$ |
| $1<x<2$ | $+$ | $-$ | $+$ | $-$ |
| $x>2$ | $+$ | $+$ | $+$ | $+$ |

La frazione è $\ge 0$ per $-2<x\le 1$ (il numeratore può annullarsi) oppure $x>2$; $x=-2$ e $x=2$ restano esclusi perché annullano il denominatore.

>* Nella tabella dei segni, il segno del prodotto (o della frazione) in ogni intervallo si ottiene moltiplicando i segni dei singoli fattori: un numero pari di segni negativi dà $+$, uno dispari dà $-$.

>! Il denominatore nullo si esclude **sempre**, anche quando il simbolo è $\ge$ o $\le$: in quel punto la frazione non esiste, non vale $0$.` },

    { id: 'errore-dividere', titolo: 'L\'errore di dividere per un fattore con la x', testo: R`Una disequazione come $(x-1)(x+3) > 2(x-1)$ sembra invitare a dividere per $(x-1)$, per "semplificare". **Non si può fare**: il segno di $(x-1)$ dipende da $x$, e dividere una disuguaglianza per una quantità di segno sconosciuto può capovolgere il verso senza che ce ne accorgiamo — oltre al fatto che per $x=1$ si dividerebbe per $0$.

Il metodo corretto è sempre lo stesso: si porta tutto a un membro, si scompone, e si legge il segno con la tabella. Qui:

$$(x-1)(x+3) - 2(x-1) > 0 \quad\Rightarrow\quad (x-1)\left[(x+3)-2\right] > 0 \quad\Rightarrow\quad (x-1)(x+1) > 0.$$

Valori esterni alle radici $-1$ e $1$: $x<-1 \ \lor\ x>1$.

Confrontiamo con la scorciatoia sbagliata: dividendo (come se $(x-1)$ fosse sempre positivo) si otterrebbe $x+3>2$, cioè $x>-1$, che include per esempio $x=-0,5$. Sostituendo $x=-0,5$ nella disequazione di partenza: primo membro $(-1,5)(2,5)=-3,75$, secondo membro $2\cdot(-1,5)=-3$; è vero che $-3,75>-3$? No. Il valore $x=-0,5$ **non** è soluzione, eppure la scorciatoia lo includeva: la divisione ha nascosto un pezzo di verifica che solo il confronto con $0$ recupera.

>* Non si divide mai una disequazione per un'espressione che contiene l'incognita: si porta tutto a un membro, si scompone, e si studia il segno con la tabella. È la stessa regola, applicata più spesso, delle disequazioni fratte.

>! Questo errore è insidioso perché a volte "sembra funzionare" (dà comunque una parte della soluzione corretta): il problema è che non c'è modo di saperlo senza rifare il conto nel modo giusto.` },

    { id: 'grado-superiore', titolo: 'Disequazioni di grado superiore scomponibili', testo: R`Una disequazione di grado superiore al secondo, se il polinomio si lascia scomporre in fattori di primo e secondo grado, si risolve con la stessa tabella dei segni: si trovano gli zeri di ogni fattore, si segnano sulla retta reale in ordine, e si moltiplicano i segni in ciascun intervallo.

L'unica novità riguarda **come si alternano** i segni. Se tutte le radici sono semplici (nessuna ripetuta) e il coefficiente del termine di grado massimo è positivo, il polinomio è positivo per $x$ grande (a destra dell'ultima radice), e il segno **si alterna** a ogni radice, andando da destra verso sinistra.

Esempio: $x^4-5x^2+4<0$. Si scompone come differenza di quadrati due volte: $x^4-5x^2+4=(x^2-1)(x^2-4)=(x-1)(x+1)(x-2)(x+2)$. Le quattro radici, in ordine, sono $-2,-1,1,2$. Partendo da destra (positivo) e alternando: positivo per $x>2$, negativo per $1<x<2$, positivo per $-1<x<1$, negativo per $-2<x<-1$, positivo per $x<-2$. La disequazione chiede il segno negativo:

$$-2<x<-1 \quad\lor\quad 1<x<2.$$

>* Con radici tutte semplici e coefficiente direttore positivo, il segno del polinomio si alterna a ogni radice: basta segnare un $+$ nell'ultimo intervallo a destra e alternare andando verso sinistra, senza rifare il calcolo in ogni intervallo.

>! Questa scorciatoia **vale solo se le radici sono semplici**. Se una radice è doppia (compare due volte, come in $(x-1)^2(x+2)$), il segno **non cambia** attraversandola: il fattore al quadrato è sempre $\ge 0$ e non inverte il prodotto.` },

    { id: 'problemi', titolo: 'Problemi con le disequazioni di secondo grado', testo: R`Molti problemi chiedono per quali valori una grandezza (un'area, un ricavo, un'altezza) supera, o non supera, una soglia data: è lo schema tipico che porta a una disequazione di secondo grado. Il procedimento è sempre lo stesso: si sceglie l'incognita, si traduce la condizione, si risolve la disequazione, e infine — passaggio che qui non si può saltare — si **interseca** la soluzione con i vincoli che il problema impone sull'incognita (lunghezze positive, quantità intere, e così via): è, di fatto, un sistema.

Un rettangolo ha il perimetro fissato a $20\ \text{cm}$: un lato misura $x$, l'altro $10-x$. Per quali $x$ l'area supera $21\ \text{cm}^2$?

$$x(10-x) > 21 \quad\Rightarrow\quad -x^2+10x-21>0 \quad\Rightarrow\quad x^2-10x+21<0 \quad\Rightarrow\quad (x-3)(x-7)<0.$$

Valori interni: $3<x<7$. Bisogna però intersecare con il vincolo geometrico $0<x<10$ (entrambi i lati devono essere positivi): poiché $(3,7)$ è già contenuto in $(0,10)$, la risposta resta $3\ \text{cm}<x<7\ \text{cm}$.

>* In un problema, la disequazione risolta va sempre confrontata con il **dominio della situazione reale**: un lato negativo, un tempo negativo o un numero di oggetti non intero sono soluzioni algebriche ma non hanno senso nel problema, e vanno scartate.

>! Non basta risolvere la disequazione: bisogna anche **rispondere alla domanda**. Se si chiede "quali lati", la risposta è l'intervallo per $x$ (e di conseguenza per $10-x$); se si chiede "qual è l'area massima possibile", serve un ragionamento in più — il vertice della parabola dell'area, che qui cade proprio a $x=5$, il quadrato.` }
  ],

  grafici: {
    segnoParabola: {
      tipo: 'piano', x: [-4, 6], y: [-5, 13],
      funzioni: [{ f: 'x^2 - 2x - 3', etichetta: 'y = x² − 2x − 3', colore: 1 }],
      punti: [
        { x: -1, y: 0, etichetta: '−1', posizione: 'basso' },
        { x: 3, y: 0, etichetta: '3', posizione: 'basso' }
      ],
      elementi: [
        { tipo: 'area', f: 'x^2 - 2x - 3', da: -3, a: -1, etichetta: 'y > 0' },
        { tipo: 'area', f: 'x^2 - 2x - 3', da: 3, a: 5 }
      ],
      didascalia: 'Le zone colorate sono i tratti in cui x² − 2x − 3 è positivo: fuori dall\'intervallo fra le radici −1 e 3, cioè i valori esterni.'
    },
    concavitaA: {
      tipo: 'piano', x: [-5, 5], y: [-8, 8],
      funzioni: [{ f: 'a x^2 - 2 x - 3', etichetta: 'y = a·x² − 2x − 3', colore: 1 }],
      parametri: [{ nome: 'a', min: -2, max: 2, passo: 0.1, valore: 1, etichetta: 'a' }],
      didascalia: 'Cambia a: per a>0 la parabola è rivolta verso l\'alto, per a<0 verso il basso, e con essa si scambia il segno letto fuori e dentro le radici.'
    },
    radiciSegno: {
      tipo: 'piano', x: [-5, 5], y: [-7, 7],
      parametri: [
        { nome: 'x1', min: -4, max: 4, passo: 0.5, valore: -1, nascosto: true },
        { nome: 'x2', min: -4, max: 4, passo: 0.5, valore: 3, nascosto: true }
      ],
      funzioni: [{ f: '(x - x1)(x - x2)', etichetta: 'y = (x − x₁)(x − x₂)', colore: 1 }],
      elementi: [
        { tipo: 'punto', p: ['x1', 0], trascina: true, etichetta: 'x₁ = {{x1}}', posizione: 'basso', colore: 2 },
        { tipo: 'punto', p: ['x2', 0], trascina: true, etichetta: 'x₂ = {{x2}}', posizione: 'basso', colore: 2 },
        { tipo: 'testo', p: [-4.7, 6.2], testo: 'y > 0 fuori dalle radici, y < 0 fra le radici', ancora: 'start' }
      ],
      didascalia: 'Trascina x₁ e x₂: la parte sopra l\'asse resta sempre quella esterna all\'intervallo fra le radici.'
    },
    rettaEsterni: {
      tipo: 'retta-reale', x: [-6, 6],
      intervalli: [
        { da: '-inf', a: -1, chiusoA: false, colore: 1 },
        { da: 3, a: 'inf', chiusoDa: false, colore: 1 }
      ],
      punti: [{ x: -1, etichetta: '−1', escluso: true }, { x: 3, etichetta: '3', escluso: true }],
      didascalia: 'Soluzione di x² − 2x − 3 > 0: valori esterni, x < −1 oppure x > 3.'
    },
    rettaInterni: {
      tipo: 'retta-reale', x: [-6, 6],
      intervalli: [{ da: -1, a: 3, chiusoDa: false, chiusoA: false, colore: 2 }],
      punti: [{ x: -1, etichetta: '−1', escluso: true }, { x: 3, etichetta: '3', escluso: true }],
      didascalia: 'Soluzione di x² − 2x − 3 < 0: valori interni, −1 < x < 3.'
    },
    rettaEscluso: {
      tipo: 'retta-reale', x: [-1, 7],
      intervalli: [
        { da: '-inf', a: 3, chiusoA: false, colore: 1 },
        { da: 3, a: 'inf', chiusoDa: false, colore: 1 }
      ],
      punti: [{ x: 3, etichetta: '3', escluso: true }],
      didascalia: '(x − 3)² > 0 è vera per ogni x reale tranne x = 3: un solo punto escluso.'
    },
    rettaSistema: {
      tipo: 'retta-reale', x: [-2, 5],
      intervalli: [{ da: 1, a: 3, chiusoDa: false, chiusoA: true, colore: 3 }],
      punti: [{ x: 1, etichetta: '1', escluso: true }, { x: 3, etichetta: '3' }],
      didascalia: 'Soluzione del sistema {x²−4x+3≤0; x²−1>0}: intersezione delle due condizioni, 1 < x ≤ 3.'
    }
  },

  esempi: [
    { titolo: 'Disequazione con Δ>0', problema: R`Risolvi $x^2-5x+6>0$.`, passi: [
      R`Calcolo il discriminante per capire quante radici ci sono: $\Delta = 25-24=1>0$, due radici distinte.`,
      R`Le radici sono $x_{1,2}=\dfrac{5\pm1}{2}$: $x_1=2$, $x_2=3$.`,
      R`Il coefficiente $a=1$ è positivo e $\Delta>0$: valori esterni. La disequazione chiede $>0$, quindi $x<2 \ \lor\ x>3$.`,
      R`Verifica con $x=0$ (esterno): $6>0$ ✓. Con $x=2,5$ (interno): $6,25-12,5+6=-0,25$, negativo, coerente con l'esclusione.`
    ], risultato: R`$x<2 \ \lor\ x>3$` },

    { titolo: 'Disequazione con Δ=0: un punto escluso', problema: R`Risolvi $2x^2-4x+2>0$.`, passi: [
      R`Raccolgo $2$: $2(x^2-2x+1)=2(x-1)^2$. Il trinomio è $2$ volte un quadrato perfetto.`,
      R`$(x-1)^2$ è sempre $\ge 0$, e vale $0$ solo per $x=1$: quindi $2(x-1)^2$ è sempre $\ge 0$, con lo stesso unico zero.`,
      R`La disequazione chiede $>0$ (stretto): è vera per ogni $x$ tranne $x=1$, dove il trinomio vale esattamente $0$.`
    ], risultato: R`$x \ne 1$` },

    { titolo: 'Disequazione con Δ<0: mai vera', problema: R`Risolvi $x^2+2x+5<0$.`, passi: [
      R`Discriminante: $\Delta=4-20=-16<0$: nessuna radice reale.`,
      R`Con $\Delta<0$ il trinomio ha sempre il segno di $a$. Qui $a=1>0$, quindi $x^2+2x+5$ è sempre positivo.`,
      R`Verifica completando il quadrato: $x^2+2x+5=(x+1)^2+4$, sempre $\ge 4>0$. Non può mai essere $<0$.`
    ], risultato: R`Nessuna soluzione: $S=\varnothing$` },

    { titolo: 'Disequazione fratta', problema: R`Risolvi $\dfrac{2x-1}{x^2-5x+6}<0$.`, passi: [
      R`Scompongo il denominatore: $x^2-5x+6=(x-2)(x-3)$. Condizioni di esistenza: $x\ne2$, $x\ne3$.`,
      R`Zero del numeratore: $x=\dfrac12$. Zeri del denominatore: $x=2$, $x=3$ (sempre esclusi).`,
      R`Tabella dei segni: per $x<\dfrac12$ il quoziente è negativo; per $\dfrac12<x<2$ è positivo; per $2<x<3$ è negativo; per $x>3$ è positivo.`,
      R`La disequazione chiede $<0$: soluzione $x<\dfrac12$ oppure $2<x<3$, con $x=2$ e $x=3$ sempre esclusi.`
    ], risultato: R`$x<\dfrac12 \ \lor\ 2<x<3$` },

    { titolo: 'Un sistema di disequazioni', problema: R`Risolvi il sistema $\begin{cases} x^2-x-6<0 \\ 2x+1\ge0 \end{cases}$.`, passi: [
      R`Prima disequazione: $x^2-x-6=(x-3)(x+2)$, radici $-2$ e $3$; con $a>0$ e verso $<0$, valori interni: $-2<x<3$.`,
      R`Seconda disequazione: $2x+1\ge0 \Rightarrow x\ge-\dfrac12$.`,
      R`Intersezione: unisco $-2<x<3$ con $x\ge-\dfrac12$. La parte comune è $-\dfrac12\le x<3$.`
    ], risultato: R`$-\dfrac12 \le x < 3$` },

    { titolo: 'Disequazione di grado superiore', problema: R`Risolvi $x^3-x^2-4x+4>0$.`, passi: [
      R`Scompongo raccogliendo a coppie: $x^2(x-1)-4(x-1)=(x-1)(x^2-4)=(x-1)(x-2)(x+2)$.`,
      R`Le radici, in ordine, sono $-2$, $1$, $2$: tutte semplici. Il coefficiente del termine di grado massimo è positivo.`,
      R`Il segno si alterna a ogni radice, partendo da $+$ a destra di $2$: positivo per $x>2$, negativo per $1<x<2$, positivo per $-2<x<1$, negativo per $x<-2$.`,
      R`La disequazione chiede $>0$: soluzione $-2<x<1$ oppure $x>2$.`
    ], risultato: R`$-2<x<1 \ \lor\ x>2$` }
  ],

  formulario: [
    { nome: 'Forma normale', formula: R`ax^2 + bx + c > 0 \quad (\text{oppure } <, \ \le, \ \ge)`, nota: R`Si richiede sempre $a \ne 0$.` },
    { nome: 'Segno del trinomio (Δ>0)', formula: R`ax^2+bx+c = a(x-x_1)(x-x_2)`, nota: R`Il trinomio ha il segno di $a$ per $x$ esterno alle radici, il segno opposto fra le radici.` },
    { nome: 'Segno del trinomio (Δ=0)', formula: R`ax^2+bx+c = a(x - x_V)^2, \quad x_V = -\frac{b}{2a}`, nota: R`Ha sempre il segno di $a$; vale $0$ solo nel vertice $x_V$.` },
    { nome: 'Segno del trinomio (Δ<0)', formula: R`\Delta = b^2-4ac < 0`, nota: R`Il trinomio ha sempre il segno di $a$, per ogni $x$ reale: non si annulla mai.` },
    { nome: 'Schema dei valori esterni', formula: R`ax^2+bx+c>0 \ \ (a>0,\ \Delta>0) \quad\Leftrightarrow\quad x<x_1 \ \lor\ x>x_2`, nota: R`Con $x_1<x_2$ radici del trinomio.` },
    { nome: 'Schema dei valori interni', formula: R`ax^2+bx+c<0 \ \ (a>0,\ \Delta>0) \quad\Leftrightarrow\quad x_1<x<x_2`, nota: R`Con $\ge$ o $\le$ si includono anche gli estremi.` },
    { nome: 'Radici della disequazione', formula: R`x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}`, nota: R`Le stesse radici dell'equazione associata $ax^2+bx+c=0$: individuano i confini degli intervalli.` },
    { nome: 'Soluzione di un sistema', formula: R`S = S_1 \cap S_2 \cap \ldots`, nota: R`L'intersezione, non l'unione, delle soluzioni delle singole disequazioni.` },
    { nome: 'Condizione di esistenza (fratte)', formula: R`D(x) \ne 0`, nota: R`Nelle disequazioni fratte il denominatore non si moltiplica mai: il suo zero è sempre escluso dalla soluzione.` },
    { nome: 'Regola del segno di un prodotto', formula: R`\text{segno}(f \cdot g) = \text{segno}(f)\cdot \text{segno}(g)`, nota: R`Un numero pari di fattori negativi dà un prodotto positivo, uno dispari negativo.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'segno-trinomio', tipo: 'definizione', fronte: R`Forma normale di una disequazione di secondo grado`, retro: R`$ax^2+bx+c > 0$ (o con $<,\ \le,\ \ge$), con $a \ne 0$.` },
    { id: 'fc-02', sezione: 'segno-trinomio', tipo: 'concetto', fronte: R`Se $\Delta>0$, che segno ha il trinomio fuori dalle radici?`, retro: R`Lo stesso segno di $a$.` },
    { id: 'fc-03', sezione: 'segno-trinomio', tipo: 'concetto', fronte: R`Se $\Delta>0$, che segno ha il trinomio fra le radici?`, retro: R`Il segno opposto ad $a$.` },
    { id: 'fc-04', sezione: 'segno-trinomio', tipo: 'concetto', fronte: R`Se $\Delta<0$, che segno ha il trinomio per ogni $x$?`, retro: R`Sempre il segno di $a$: la parabola non incontra mai l'asse $x$.` },
    { id: 'fc-05', sezione: 'schema-esterni-interni', tipo: 'procedura', fronte: R`Schema dei valori esterni (con $a>0$, $\Delta>0$)`, retro: R`$ax^2+bx+c>0 \Leftrightarrow x<x_1 \ \lor\ x>x_2$.` },
    { id: 'fc-06', sezione: 'schema-esterni-interni', tipo: 'procedura', fronte: R`Schema dei valori interni (con $a>0$, $\Delta>0$)`, retro: R`$ax^2+bx+c<0 \Leftrightarrow x_1<x<x_2$.` },
    { id: 'fc-07', sezione: 'schema-esterni-interni', tipo: 'concetto', fronte: R`Cosa si fa se $a<0$, prima di applicare lo schema?`, retro: R`Si moltiplica tutta la disequazione per $-1$, cambiando il verso, per ricondursi a un $a$ positivo.` },
    { id: 'fc-08', sezione: 'delta-non-positivo', tipo: 'concetto', fronte: R`$(x-k)^2 \ge 0$: soluzione?`, retro: R`Tutti i numeri reali: un quadrato non è mai negativo.` },
    { id: 'fc-09', sezione: 'delta-non-positivo', tipo: 'concetto', fronte: R`$(x-k)^2>0$: soluzione?`, retro: R`Tutti i numeri reali tranne $x=k$: lì il quadrato vale $0$, non $>0$.` },
    { id: 'fc-10', sezione: 'delta-non-positivo', tipo: 'concetto', fronte: R`$(x-k)^2\le 0$: soluzione?`, retro: R`Solo $x=k$: è l'unico punto in cui il quadrato vale $0$.` },
    { id: 'fc-11', sezione: 'delta-non-positivo', tipo: 'concetto', fronte: R`Con $\Delta<0$, quando la disequazione è sempre vera?`, retro: R`Quando il verso richiesto coincide con il segno di $a$ (per esempio $>0$ se $a>0$).` },
    { id: 'fc-12', sezione: 'sistemi', tipo: 'concetto', fronte: R`Soluzione di un sistema di disequazioni`, retro: R`L'intersezione delle soluzioni delle singole disequazioni, non l'unione.` },
    { id: 'fc-13', sezione: 'sistemi', tipo: 'procedura', fronte: R`Come si risolve un sistema di disequazioni di secondo grado?`, retro: R`Si risolve ogni disequazione separatamente, poi si disegnano le soluzioni sulla stessa retta e si prende la parte comune.` },
    { id: 'fc-14', sezione: 'fratte-e-prodotto', tipo: 'procedura', fronte: R`Primo passo in una disequazione fratta`, retro: R`Scrivere le condizioni di esistenza: il denominatore deve essere diverso da zero.` },
    { id: 'fc-15', sezione: 'fratte-e-prodotto', tipo: 'concetto', fronte: R`Regola del segno di un prodotto (o quoziente)`, retro: R`Si moltiplicano i segni dei singoli fattori: un numero pari di segni negativi dà $+$, uno dispari dà $-$.` },
    { id: 'fc-16', sezione: 'fratte-e-prodotto', tipo: 'concetto', fronte: R`Il denominatore nullo in una disequazione fratta va…`, retro: R`Sempre escluso dalla soluzione, anche se il verso è $\ge$ o $\le$.` },
    { id: 'fc-17', sezione: 'errore-dividere', tipo: 'concetto', fronte: R`Perché non si divide una disequazione per un'espressione con la $x$?`, retro: R`Perché il suo segno non è noto: si rischia di capovolgere il verso senza saperlo, o di dividere per zero.` },
    { id: 'fc-18', sezione: 'errore-dividere', tipo: 'procedura', fronte: R`Cosa si fa al posto di dividere per un fattore con la $x$?`, retro: R`Si porta tutto a un membro, si scompone, e si studia il segno con la tabella dei segni.` },
    { id: 'fc-19', sezione: 'grado-superiore', tipo: 'procedura', fronte: R`Come si risolve una disequazione di grado superiore scomponibile?`, retro: R`Si scompone in fattori di primo/secondo grado, si segnano gli zeri sulla retta e si usa la tabella dei segni.` },
    { id: 'fc-20', sezione: 'grado-superiore', tipo: 'concetto', fronte: R`Radici tutte semplici, coefficiente direttore positivo: come si comporta il segno?`, retro: R`Si alterna a ogni radice: positivo a destra dell'ultima, poi si alterna andando verso sinistra.` },
    { id: 'fc-21', sezione: 'problemi', tipo: 'concetto', fronte: R`In un problema, dopo aver risolto la disequazione, cosa si controlla ancora?`, retro: R`Che la soluzione rispetti i vincoli reali del problema (lunghezze positive, dominio, ecc.): si interseca con essi.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi $x^2-9>0$.`, suggerimenti: [R`Le radici sono $\pm3$: ricorda lo schema per $a>0$ e $\Delta>0$.`, R`Con $\Delta>0$ e $a>0$ vale lo schema dei valori esterni.`], risposta: { tipo: 'testo', accettate: ['x<-3 o x>3', 'x<-3 v x>3', 'x<-3 ∨ x>3', ']-inf;-3[ u ]3;+inf[', 'x<-3 oppure x>3'] }, soluzione: [R`$x^2-9>0$ ha radici $x=\pm3$ ($\Delta=36>0$, $a=1>0$).`, R`Schema dei valori esterni: $x<-3 \ \lor\ x>3$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi $x^2-4x+4>0$.`, suggerimenti: [R`Il trinomio è un quadrato perfetto: prova a riconoscerlo.`, R`$(x-2)^2$ è sempre $\ge0$: quando è $>0$ e quando vale esattamente $0$?`], risposta: { tipo: 'testo', accettate: ['x≠2', 'x!=2', 'x<>2', 'xdiversoda2', 'x diverso da 2'] }, soluzione: [R`$x^2-4x+4=(x-2)^2$.`, R`Un quadrato è sempre $\ge0$, e vale $0$ solo per $x=2$: quindi $(x-2)^2>0$ per ogni $x$ tranne $x=2$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi $x^2+4\le0$.`, suggerimenti: [R`Il discriminante è negativo: che segno ha sempre il trinomio?`, R`$x^2+4$ è la somma di un quadrato e di un numero positivo.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'mai', 'nessuna soluzione', 'nessuna soluzione reale', 'insieme vuoto', 'vuoto'] }, soluzione: [R`$\Delta=0-16=-16<0$: nessuna radice reale, il trinomio ha sempre il segno di $a=1$, cioè è sempre positivo.`, R`$x^2+4\ge4>0$ per ogni $x$: non può mai essere $\le0$. $S=\varnothing$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $2x^2-2x-12>0$.`, suggerimenti: [R`Puoi dividere tutto per $2$ (positivo, il verso non cambia).`, R`Scomponi $x^2-x-6$ trovando due numeri con somma $1$ e prodotto $-6$.`], risposta: { tipo: 'testo', accettate: ['x<-2 o x>3', 'x<-2 v x>3', 'x<-2 ∨ x>3', ']-inf;-2[ u ]3;+inf['] }, soluzione: [R`Divido per $2$: $x^2-x-6>0$.`, R`$(x-3)(x+2)>0$: radici $-2$ e $3$, $a>0$.`, R`Valori esterni: $x<-2 \ \lor\ x>3$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi $-x^2+2x+3\ge0$.`, suggerimenti: [R`Il coefficiente di $x^2$ è negativo: moltiplica per $-1$ prima di applicare lo schema.`, R`Non dimenticare di cambiare il verso della disequazione.`], risposta: { tipo: 'intervallo', da: -1, a: 3, chiusoDa: true, chiusoA: true }, soluzione: [R`Moltiplico per $-1$ (cambio verso): $x^2-2x-3\le0$.`, R`$(x-3)(x+1)\le0$: radici $-1$ e $3$, $a>0$, valori interni inclusi gli estremi.`, R`$-1\le x\le3$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Risolvi $\dfrac{x+1}{x-2}\le0$.`, suggerimenti: [R`Trova lo zero del numeratore e la condizione di esistenza del denominatore.`, R`Costruisci la tabella dei segni fra $-1$ e $2$.`], risposta: { tipo: 'intervallo', da: -1, a: 2, chiusoDa: true, chiusoA: false }, soluzione: [R`Numeratore nullo in $x=-1$ (incluso, verso $\le$); denominatore nullo in $x=2$ (sempre escluso).`, R`Per $x<-1$ la frazione è positiva; per $-1<x<2$ è negativa; per $x>2$ è positiva.`, R`Soluzione: $-1\le x<2$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Risolvi il sistema $\begin{cases} x^2-16<0 \\ x-1>0 \end{cases}$.`, suggerimenti: [R`Risolvi le due disequazioni separatamente.`, R`Disegna i due intervalli sulla stessa retta e cerca la parte comune.`], risposta: { tipo: 'intervallo', da: 1, a: 4, chiusoDa: false, chiusoA: false }, soluzione: [R`Prima: $x^2-16<0 \Rightarrow -4<x<4$.`, R`Seconda: $x-1>0 \Rightarrow x>1$.`, R`Intersezione: $1<x<4$.`] },
    { id: 'es-08', difficolta: 3, testo: R`Risolvi $x^4-13x^2+36<0$.`, suggerimenti: [R`Poni $t=x^2$ e risolvi prima in $t$: ottieni un'equazione di secondo grado.`, R`Scomponi come differenza di quadrati due volte.`, R`Le quattro radici, in ordine, dividono la retta in cinque intervalli: segna dove il segno si alterna.`], risposta: { tipo: 'testo', accettate: ['-3<x<-2 o 2<x<3', '-3<x<-2 v 2<x<3', '-3<x<-2 ∨ 2<x<3', ']-3;-2[ u ]2;3['] }, soluzione: [R`$x^4-13x^2+36=(x^2-4)(x^2-9)=(x-2)(x+2)(x-3)(x+3)$.`, R`Radici in ordine: $-3,-2,2,3$, tutte semplici. Il segno si alterna: positivo per $x>3$, negativo per $2<x<3$, positivo per $-2<x<2$, negativo per $-3<x<-2$, positivo per $x<-3$.`, R`Soluzione (segno negativo): $-3<x<-2 \ \lor\ 2<x<3$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi $(x+2)(x-1)\ge3(x-1)$.`, suggerimenti: [R`Non dividere per $(x-1)$: il suo segno non è noto.`, R`Porta tutto a un membro e raccogli $(x-1)$.`], risposta: { tipo: 'testo', accettate: ['sempre vera', 'per ogni x reale', 'tutti i numeri reali', 'r', 'sempre'] }, soluzione: [R`$(x+2)(x-1)-3(x-1)\ge0 \Rightarrow (x-1)\left[(x+2)-3\right]\ge0 \Rightarrow (x-1)(x-1)\ge0$.`, R`$(x-1)^2\ge0$ è vera per ogni $x$ reale: un quadrato non è mai negativo.`] },
    { id: 'es-10', difficolta: 3, testo: R`Un rettangolo ha un lato di $x\ \text{cm}$ e l'altro di $(x-2)\ \text{cm}$, con $x>2$. Per quali $x$ l'area supera $15\ \text{cm}^2$?`, suggerimenti: [R`Scrivi l'area come prodotto dei due lati e confrontala con $15$.`, R`Dopo aver risolto la disequazione, ricordati del vincolo $x>2$.`], risposta: { tipo: 'testo', accettate: ['x>5', 'x > 5', ']5;+inf['] }, soluzione: [R`Area: $x(x-2)>15 \Rightarrow x^2-2x-15>0 \Rightarrow (x-5)(x+3)>0$.`, R`Valori esterni: $x<-3 \ \lor\ x>5$.`, R`Intersecando con il vincolo $x>2$: resta solo $x>5\ \text{cm}$.`] },
    { id: 'es-11', difficolta: 1, testo: R`Risolvi $4x^2+4x+1\ge0$.`, suggerimenti: [R`Riconosci il quadrato di un binomio.`, R`Un quadrato può mai essere negativo?`], risposta: { tipo: 'testo', accettate: ['sempre vera', 'per ogni x reale', 'r', 'tutti i numeri reali'] }, soluzione: [R`$4x^2+4x+1=(2x+1)^2$.`, R`Un quadrato è sempre $\ge0$: la disequazione è vera per ogni $x$ reale.`] },
    { id: 'es-12', difficolta: 3, testo: R`Risolvi $\dfrac{x^2-1}{x+3}>0$.`, suggerimenti: [R`Scomponi il numeratore: $x^2-1=(x-1)(x+1)$.`, R`Costruisci la tabella dei segni con tre fattori: $x-1$, $x+1$, $x+3$.`], risposta: { tipo: 'testo', accettate: ['-3<x<-1 o x>1', '-3<x<-1 v x>1', '-3<x<-1 ∨ x>1', ']-3;-1[ u ]1;+inf['] }, soluzione: [R`Numeratore $(x-1)(x+1)$, zeri $\pm1$; denominatore zero in $x=-3$ (c.e.).`, R`Tabella dei segni: per $x<-3$ negativo; per $-3<x<-1$ positivo; per $-1<x<1$ negativo; per $x>1$ positivo.`, R`Soluzione ($>0$): $-3<x<-1 \ \lor\ x>1$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Se $\Delta>0$ e $a>0$, dove il trinomio $ax^2+bx+c$ è positivo?`, opzioni: [R`Mai, non è mai positivo`, R`Solo fra le due radici`, R`Per ogni $x$ reale`, R`Per $x$ esterno alle due radici`], corretta: 3, spiegazione: R`Con $\Delta>0$ e $a>0$ il trinomio ha il segno di $a$ (positivo) fuori dalle radici, e il segno opposto (negativo) fra di esse.` },
    { id: 'q-02', domanda: R`Se $\Delta<0$ e $a>0$, il trinomio $ax^2+bx+c$…`, opzioni: [R`È sempre positivo, per ogni $x$ reale`, R`Cambia segno in un punto`, R`È sempre negativo`, R`È positivo solo per $x$ molto grandi`], corretta: 0, spiegazione: R`Con $\Delta<0$ la parabola non incontra mai l'asse $x$: ha sempre il segno di $a$, in questo caso sempre positivo.` },
    { id: 'q-03', domanda: R`Quale affermazione descrive correttamente il caso $\Delta=0$, $a>0$?`, opzioni: [R`Il trinomio è sempre negativo`, R`Il trinomio cambia segno due volte`, R`Il trinomio è $\ge0$ sempre, con uguaglianza solo nel vertice`, R`Il trinomio è sempre positivo, senza eccezioni`], corretta: 2, spiegazione: R`Con $\Delta=0$ il trinomio è un quadrato (a meno del fattore $a$): non è mai negativo, e si annulla esattamente nel vertice, radice doppia.` },
    { id: 'q-04', domanda: R`In quale caso si può applicare direttamente lo schema "valori esterni / valori interni"?`, opzioni: [R`Sempre, qualunque siano $a$ e $\Delta$`, R`Solo se $a>0$ e $\Delta>0$`, R`Solo se $\Delta<0$`, R`Solo se $a<0$`], corretta: 1, spiegazione: R`Lo schema richiede due radici distinte ($\Delta>0$) e, nella forma diretta, $a>0$; con $a<0$ si moltiplica prima per $-1$ cambiando verso.` },
    { id: 'q-05', domanda: R`$(x-2)^2 \le 0$ ha come soluzione…`, opzioni: [R`Nessuna soluzione`, R`Tutti i numeri reali`, R`$x \ne 2$`, R`Solo $x=2$`], corretta: 3, spiegazione: R`Un quadrato è $\le 0$ solo quando vale esattamente $0$, cioè quando $x=2$: è l'unica soluzione.` },
    { id: 'q-06', domanda: R`$(x-2)^2 > 0$ ha come soluzione…`, opzioni: [R`$x \ne 2$`, R`Solo $x=2$`, R`Nessuna soluzione`, R`Tutti i numeri reali, compreso $x=2$`], corretta: 0, spiegazione: R`Il quadrato è positivo per ogni $x$ tranne dove si annulla, cioè $x=2$: quel punto va escluso.` },
    { id: 'q-07', domanda: R`In un sistema di disequazioni, la soluzione finale è…`, opzioni: [R`L'unione delle soluzioni singole`, R`La soluzione della disequazione più semplice`, R`L'intersezione delle soluzioni singole`, R`Sempre un intervallo illimitato`], corretta: 2, spiegazione: R`Le condizioni di un sistema valgono tutte insieme: la soluzione è l'intersezione, la parte comune a tutti gli intervalli.` },
    { id: 'q-08', domanda: R`Perché in una disequazione fratta il denominatore nullo va sempre escluso?`, opzioni: [R`Perché rende la frazione negativa`, R`Solo se il verso è $\ge$`, R`Perché il numeratore deve essere diverso da zero`, R`Perché in quel punto la frazione non esiste`], corretta: 3, spiegazione: R`Una frazione con denominatore $0$ non è definita: quel valore va escluso indipendentemente dal simbolo di confronto usato.` },
    { id: 'q-09', domanda: R`Nella disequazione $(x-1)(x+2) > 3(x-1)$, perché è sbagliato dividere per $(x-1)$?`, opzioni: [R`Perché $(x-1)$ compare due volte`, R`Perché $(x-1)$ potrebbe essere negativo o nullo, e il suo segno non è noto`, R`Perché il grado della disequazione diminuirebbe troppo`, R`In realtà è corretto dividere`], corretta: 1, spiegazione: R`Dividere per un'espressione di segno incognito può capovolgere il verso senza controllo, e se l'espressione vale $0$ la divisione non è nemmeno lecita: bisogna portare tutto a un membro e scomporre.` },
    { id: 'q-10', domanda: R`Qual è il metodo corretto per risolvere $(x-1)(x+2) > 3(x-1)$?`, opzioni: [R`Portare tutto a un membro, scomporre e usare la tabella dei segni`, R`Dividere subito per $(x-1)$`, R`Sostituire $x=1$ e verificare`, R`Calcolare il discriminante di $3(x-1)$`], corretta: 0, spiegazione: R`Come in ogni disequazione con l'incognita ripetuta, si porta tutto a un membro: $(x-1)(x+2)-3(x-1)>0$, si scompone e si studia il segno.` },
    { id: 'q-11', domanda: R`Per un polinomio scomponibile in fattori di primo grado, tutti con radici semplici e coefficiente direttore positivo, come si comporta il segno?`, opzioni: [R`Resta sempre positivo`, R`Dipende solo dal numero di fattori pari`, R`Si alterna a ogni radice, partendo da $+$ a destra dell'ultima`, R`È sempre uguale al segno del primo fattore`], corretta: 2, spiegazione: R`A destra dell'ultima radice tutti i fattori sono positivi; attraversando ogni radice semplice, un solo fattore cambia segno, quindi il prodotto cambia segno a ogni passaggio.` },
    { id: 'q-12', domanda: R`Che cosa cambia se una radice è doppia, come in $(x-1)^2(x+2)>0$?`, opzioni: [R`Niente, si alterna comunque`, R`La disequazione diventa impossibile`, R`Bisogna usare la formula ridotta`, R`Il segno non cambia attraversando la radice doppia`], corretta: 3, spiegazione: R`$(x-1)^2$ è sempre $\ge 0$ e non cambia segno: attraversando $x=1$ il segno del prodotto resta lo stesso.` },
    { id: 'q-13', domanda: R`In un problema che chiede per quali $x$ un'area supera un valore, dopo aver risolto la disequazione…`, opzioni: [R`Si può già rispondere, senza altri controlli`, R`Bisogna intersecare con i vincoli reali del problema (lunghezze positive, ecc.)`, R`Bisogna sempre scartare le soluzioni negative`, R`Bisogna calcolare il discriminante una seconda volta`], corretta: 1, spiegazione: R`La disequazione dà le soluzioni algebriche; vanno poi confrontate (intersecate) con il dominio reale della situazione, che può restringerle ulteriormente.` },
    { id: 'q-14', domanda: R`Quale delle seguenti disequazioni ha come soluzione $x<-1 \lor x>3$?`, opzioni: [R`$x^2-2x-3>0$`, R`$-1<x<3$`, R`$x^2-2x-3<0$`, R`$x^2+2x-3>0$`], corretta: 0, spiegazione: R`$x^2-2x-3=(x-3)(x+1)$ ha radici $-1$ e $3$; con $a>0$ e $\Delta>0$, il verso $>0$ dà valori esterni, $x<-1 \lor x>3$.` },
    { id: 'q-15', domanda: R`Nella tabella dei segni per una disequazione prodotto, il segno del prodotto in un intervallo si ottiene…`, opzioni: [R`Sommando i segni dei fattori`, R`Guardando solo il fattore di grado più alto`, R`Moltiplicando i segni dei singoli fattori`, R`Calcolando il discriminante di ciascun fattore`], corretta: 2, spiegazione: R`Il segno di un prodotto è il prodotto dei segni: un numero pari di fattori negativi dà un risultato positivo, uno dispari un risultato negativo.` },
    { id: 'q-16', domanda: R`$x^2-6x+9 \ge 0$ ha come soluzione…`, opzioni: [R`Solo $x=3$`, R`Tutti i numeri reali`, R`$x \ne 3$`, R`Nessuna soluzione`], corretta: 1, spiegazione: R`$x^2-6x+9=(x-3)^2$ è sempre $\ge 0$: la disequazione è vera per ogni $x$ reale, con uguaglianza nel vertice $x=3$.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Porta sempre tutto a un membro, zero dall'altro: la forma $ax^2+bx+c>0$ (o con $<,\ \le,\ \ge$) è il punto di partenza di ogni disequazione di secondo grado.` },
    { tipo: 'errore', testo: R`Il segno del trinomio non dipende solo dalle radici: controlla sempre anche il segno di $a$.` },
    { tipo: 'trucco', testo: R`Con $\Delta<0$ non serve nemmeno trovare le radici (non esistono): guarda solo il segno di $a$ per sapere se la disequazione è sempre vera o mai vera.` },
    { tipo: 'errore', testo: R`Il denominatore nullo va sempre escluso in una disequazione fratta, anche con $\ge$ o $\le$.` },
    { tipo: 'metodo', testo: R`Nella tabella dei segni scrivi una riga per ciascun fattore, segna gli zeri in ordine crescente, e moltiplica i segni colonna per colonna.` },
    { tipo: 'errore', testo: R`Non dividere mai per un'espressione che contiene la $x$: porta tutto a un membro e scomponi, anche se sembra più lungo.` },
    { tipo: 'trucco', testo: R`Ricorda lo schema: fuori dalle radici il segno di $a$, dentro il segno opposto — ma solo se $\Delta>0$.` },
    { tipo: 'metodo', testo: R`In un sistema, disegna le soluzioni delle singole disequazioni sulla stessa retta, una sopra l'altra: l'intersezione si vede a colpo d'occhio.` },
    { tipo: 'trucco', testo: R`In un polinomio scomposto con radici tutte semplici, il segno si alterna a ogni radice: basta segnare $+$ nell'ultimo intervallo a destra.` }
  ],

  aneddoti: [
    { matematico: 'Apollonio di Perga', anni: '262–190 a.C. circa', titolo: 'Il nome "parabola" viene dal confronto delle aree', testo: R`Apollonio di Perga, soprannominato «il Grande Geometra», raccolse in otto libri, le *Coniche*, tutto ciò che si sapeva sulle curve ottenute tagliando un cono con un piano. Fu lui a fissare i nomi che usiamo ancora oggi — ellisse, parabola, iperbole — presi in prestito dal linguaggio con cui i greci confrontavano le aree: "applicare" un'area a un segmento voleva dire costruire su quel segmento un rettangolo di quell'area. Se il rettangolo coincide esattamente con l'area assegnata si ha una *parabolé*, un'applicazione "esatta"; se la supera, un'*iperbolé*, un eccesso; se resta più piccola, un'*elleipsis*, un difetto. Apollonio dimostrò le proprietà di queste curve con la sola riga e compasso, senza equazioni: quelle sarebbero arrivate solo con Descartes, quasi millenovecento anni dopo.`, legame: R`Il trinomio $ax^2+bx+c$ è proprio la parabola di Apollonio scritta in coordinate: il suo nome ricorda un confronto di aree, lo stesso tipo di confronto — maggiore o minore di zero — che si fa in ogni disequazione di secondo grado.` },
    { matematico: 'René Descartes', anni: '1596–1650', titolo: 'La regola che conta le soluzioni senza calcolarle', testo: R`Nel 1637, in appendice al *Discorso sul metodo*, Descartes pubblicò *La Géométrie*, dove propose una regola sorprendente: scritta un'equazione polinomiale con i termini ordinati per grado decrescente, il numero delle sue soluzioni positive non supera il numero di volte in cui il segno dei coefficienti cambia passando da un termine al successivo, e la differenza fra i due è sempre un numero pari. Bastava contare i cambi di segno, senza risolvere nulla, per sapere quante soluzioni positive aspettarsi (e, sostituendo $x$ con $-x$, quante negative). Descartes non ne diede una dimostrazione rigorosa — arrivò solo più tardi, con altri autori — ma la regola funziona ancora oggi esattamente come lui l'aveva enunciata, e porta il suo nome: «regola dei segni di Descartes».`, legame: R`È la stessa idea che sta dietro la tabella dei segni: il segno di un polinomio, anche di grado alto, si legge contando come cambia da un fattore all'altro, senza rifare ogni volta tutto il calcolo.` },
    { matematico: 'Augustin-Louis Cauchy', anni: '1789–1857', titolo: 'La disuguaglianza dimostrata a salti', testo: R`Cauchy fu uno dei matematici più prolifici di sempre, con centinaia di lavori pubblicati; si racconta, forse esagerando, che il suo necrologio scherzasse sul fatto che avrebbe continuato a scrivere anche da morto. Nel suo *Cours d'Analyse* del 1821 dimostrò che la media aritmetica di $n$ numeri positivi non è mai minore della loro media geometrica, con uguaglianza solo se i numeri coincidono tutti. La dimostrazione procede in modo insolito, "avanti e indietro": prima per $n$ potenza di $2$, raddoppiando ogni volta il numero di termini, poi all'indietro, mostrando che se la disuguaglianza vale per $n$ termini vale anche per $n-1$. Con la stessa energia con cui scriveva articoli, gli viene anche attribuita, secondo diversi resoconti storici, una certa disattenzione nel maneggiare i manoscritti altrui, compresi lavori importanti di Abel e, più tardi, di Galois.`, legame: R`Fra tutti i rettangoli con lo stesso perimetro, l'area è massima quando i due lati sono uguali, cioè per il quadrato: è esattamente il caso di uguaglianza della disuguaglianza di Cauchy fra media aritmetica e geometrica.` },
    { matematico: 'Évariste Galois', anni: '1811–1832', titolo: 'La notte prima del duello', testo: R`Prima di compiere vent'anni, Galois capì perché non esiste una formula generale — con solo somme, prodotti e radici — per risolvere le equazioni di quinto grado o superiore, e per quali equazioni particolari una formula esiste comunque: la risposta dipende dalla struttura di un oggetto che oggi si chiama "gruppo". I suoi lavori furono respinti o smarriti dall'Accademia delle Scienze di Parigi (uno dei manoscritti, secondo la ricostruzione più diffusa, andò perso proprio nelle mani di Cauchy), e Galois morì a vent'anni in un duello le cui vere cause restano incerte. La notte prima, convinto di morire, scrisse in fretta a un amico l'ultima versione delle sue idee, scarabocchiando a margine "non ho tempo": ci vollero altri quattordici anni perché Liouville ne riconoscesse il valore e le pubblicasse.`, legame: R`È anche per questo che, oltre il secondo grado, ci si limita qui a disequazioni **scomponibili**: non esiste un metodo generale come la formula risolutiva, e la scomposizione in fattori resta lo strumento che funziona davvero.` }
  ]
});
})();
