(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'disequazioni-secondo-grado',
  titolo: 'Disequazioni di secondo grado',

  introduzione: R`Un sasso lanciato verso l'alto si trova, dopo $t$ secondi, all'altezza $h=20t-5t^2$ metri. Per quanto tempo sta sopra i $15$ metri? La domanda diventa $20t-5t^2>15$, e la risposta non è un numero solo: è un intervallo di tempo, da $t=1$ a $t=3$ secondi.

Questa è una **disequazione di secondo grado**. Portata in forma normale confronta con zero un trinomio: $ax^2+bx+c>0$ (oppure con $<$, $\le$, $\ge$), con $a\ne 0$. Le sue soluzioni sono quasi sempre infinite: un intervallo, due intervalli, tutti i numeri reali, oppure nessuno.

Il metodo si basa su un'idea sola: il trinomio $ax^2+bx+c$ è la $y$ di una parabola. Chiedersi dove il trinomio è positivo vuol dire chiedersi dove la parabola sta **sopra** l'asse $x$; dove è negativo, dove sta **sotto**. Serve saper risolvere le equazioni di secondo grado e le disequazioni di primo grado, compreso che cosa succede al verso quando si moltiplica per un numero negativo.`,

  inBreve: [
    R`Si porta tutto a sinistra, $ax^2+bx+c$ confrontato con $0$, e si cercano le soluzioni dell'equazione associata $ax^2+bx+c=0$.`,
    R`Il trinomio è la $y$ della parabola: è positivo dove la parabola sta sopra l'asse $x$, negativo dove sta sotto.`,
    R`Con $\Delta>0$ il trinomio ha il segno di $a$ **fuori** dalle due soluzioni e il segno opposto **fra** le due soluzioni. Se $a<0$, conviene prima moltiplicare per $-1$ e cambiare il verso.`,
    R`Con $\Delta\le 0$ il trinomio ha sempre il segno di $a$ (salvo annullarsi in un punto se $\Delta=0$): la disequazione è sempre vera, mai vera, vera tranne in un punto, oppure vera in un punto solo.`,
    R`Nei sistemi si prende la parte **comune** delle soluzioni; nelle fratte i valori che annullano il denominatore si escludono sempre.`,
    R`Non si divide mai per un'espressione che contiene la $x$: si porta tutto a un membro e si studia il segno dei fattori.`
  ],

  sezioni: [
    { id: 'segno-trinomio', titolo: 'Il segno del trinomio sulla parabola', testo: R`Per quali $x$ il trinomio $x^2-2x-3$ è positivo? Pensalo come la $y$ della parabola $y=x^2-2x-3$. Dove la parabola sta sopra l'asse $x$, la $y$ è positiva; dove sta sotto, è negativa; dove incontra l'asse, vale zero. Quindi bastano due informazioni: **dove** la parabola incontra l'asse $x$ e **verso dove** è rivolta.

~ x^2-2x-3>0 :: la disequazione è già in forma normale, con $a=1$
~ x_1=-1,\quad x_2=3 :: risolvo l'equazione associata $x^2-2x-3=0$: due numeri con somma $2$ e prodotto $-3$
~ a=1>0 :: la parabola è rivolta verso l'alto: sotto l'asse fra $-1$ e $3$, sopra fuori
~ \evidb{x<-1\ \lor\ x>3} :: la disequazione chiede $>0$, cioè i tratti sopra l'asse

Ora prova tu con il grafico: trascina il vertice della parabola sopra e sotto l'asse, e cambia il segno di $a$ con il cursore.

[[grafico:segno]]

Hai visto che tutto dipende da due cose: il segno di $a$, che dice se la parabola è rivolta verso l'alto o verso il basso, e il segno di $\Delta=b^2-4ac$, che dice se la parabola taglia l'asse $x$, lo tocca o non lo incontra. Con $x_1<x_2$ le soluzioni dell'equazione associata:

| $\Delta$ | $a>0$ | $a<0$ |
|---|---|---|
| positivo | $+$ fuori da $x_1$ e $x_2$, $-$ fra | $-$ fuori, $+$ fra |
| zero | $+$ sempre, $0$ nel vertice | $-$ sempre, $0$ nel vertice |
| negativo | $+$ sempre | $-$ sempre |

>* Il trinomio ha il **segno di $a$** dappertutto, tranne che fra le due soluzioni (se ci sono), dove ha il segno opposto.

?? Il trinomio $-x^2+4$ si annulla in $-2$ e in $2$. Dove è positivo?
[x] per $-2<x<2$
[ ] per $x<-2$ oppure $x>2$
[ ] per nessun valore di $x$
=> Qui $a=-1$: la parabola è rivolta verso il basso, quindi sta sopra l'asse proprio fra gli zeri. Controllo con $x=0$: $-0+4=4>0$. Rispondere "fuori dagli zeri" vuol dire applicare la regola del caso $a>0$ senza guardare il segno di $a$, che è l'errore più comune di tutto l'argomento.

Nella scheda **Laboratorio** di questo argomento c'è *Marea*: pieghi una barra a forma di parabola e alzi il livello del mare.` },

    { id: 'schema-esterni-interni', titolo: 'Lo schema: valori esterni, valori interni', testo: R`Il caso che capita più spesso è $a>0$ con $\Delta>0$: parabola rivolta verso l'alto che taglia l'asse in due punti. Qui conviene ricordare uno schema, invece di rifare il disegno ogni volta.

>* **Schema, con $a>0$ e $\Delta>0$** (e $x_1<x_2$ le soluzioni dell'equazione associata): $ax^2+bx+c>0$ è vera per $x<x_1\ \lor\ x>x_2$, i **valori esterni**; $ax^2+bx+c<0$ è vera per $x_1<x<x_2$, i **valori interni**. Con $\ge$ o $\le$ gli estremi $x_1$ e $x_2$ sono compresi.

"Esterni" e "interni" si riferiscono all'intervallo fra le due soluzioni: le soluzioni della disequazione stanno fuori da quell'intervallo oppure dentro. Per $x^2-2x-3>0$ (soluzioni associate $-1$ e $3$) i valori sono esterni, $x<-1\ \lor\ x>3$; per $x^2-2x-3<0$ sono interni, $-1<x<3$.

Se $a<0$ lo schema non si applica così com'è. Si moltiplica prima tutta la disequazione per $-1$, **cambiando il verso** come nel primo grado, e ci si riporta ad $a>0$.

~ -x^2+2x+3>0 :: qui $a=-1$: lo schema non vale ancora
~ \evid{x^2-2x-3}\ \evid{<}\ 0 :: moltiplico per $-1$: cambiano tutti i segni **e** il verso
~ x_1=-1,\quad x_2=3 :: soluzioni dell'equazione associata
~ \evidb{-1<x<3} :: ora $a>0$ e il verso è $<$: valori interni

?? Uno studente risolve $-x^2+2x+3>0$ così: soluzioni associate $-1$ e $3$, verso $>$, quindi valori esterni. Dove sbaglia?
[x] ha applicato lo schema con $a$ negativo
[ ] ha sbagliato le soluzioni associate
[ ] niente, il risultato è giusto
=> Le soluzioni $-1$ e $3$ sono giuste, ma lo schema "esterni con $>$" vale solo per $a>0$. Qui la parabola è rivolta verso il basso e sta sopra l'asse fra $-1$ e $3$: la risposta è $-1<x<3$. Prova con $x=0$: $3>0$, vero, e $0$ è un valore interno.

>! Le soluzioni si scrivono sempre con $x_1<x_2$, il più piccolo a sinistra. $3<x<-1$ non ha senso: nessun numero è insieme maggiore di $3$ e minore di $-1$.` },

    { id: 'delta-non-positivo', titolo: 'Quando Δ non è positivo: sempre vere, mai vere, un punto escluso', testo: R`Se $\Delta\le 0$ la parabola non taglia l'asse $x$ in due punti, e lo schema esterni/interni non ha senso: non c'è un intervallo fra due soluzioni. Si ragiona sul segno di $a$ e su che cosa chiede il verso.

**Con $\Delta=0$** il trinomio è un quadrato perfetto, a meno del fattore $a$. Per esempio $x^2-6x+9=(x-3)^2$: un quadrato non è mai negativo, e vale zero solo in $x=3$. I quattro versi danno quattro risposte diverse.

| disequazione | soluzioni |
|---|---|
| $(x-3)^2\ge 0$ | tutti i numeri reali |
| $(x-3)^2>0$ | tutti tranne $x=3$ |
| $(x-3)^2\le 0$ | solo $x=3$ |
| $(x-3)^2<0$ | nessuna: $S=\varnothing$ |

?? Quali sono le soluzioni di $x^2-6x+9>0$?
[x] tutti i numeri reali tranne $3$
[ ] tutti i numeri reali
[ ] nessuna
=> $x^2-6x+9=(x-3)^2$ è positivo dappertutto tranne in $x=3$, dove vale $0$, e $0>0$ è falso. Rispondere "tutti i reali" vuol dire dimenticare quel punto; rispondere "nessuna" vuol dire pensare che con $\Delta=0$ non ci siano soluzioni, come per un'equazione con $\Delta<0$.

**Con $\Delta<0$** il trinomio non si annulla mai e ha sempre il segno di $a$. Completare il quadrato fa vedere perché.

~ x^2+2x+5 :: $\Delta=4-20=-16<0$
~ \evid{x^2+2x+1}+4 :: spezzo $5$ in $1+4$ per formare un quadrato
~ \evid{(x+1)^2}+4 :: un quadrato, che è sempre $\ge 0$, più $4$
~ \ge\evidb{4} :: quindi il trinomio vale sempre almeno $4$: è sempre positivo

Così $x^2+2x+5>0$ è vera per ogni $x$ reale, e $x^2+2x+5<0$ non è vera mai. Con $a<0$ succede il contrario: il trinomio è sempre negativo.

>* Con $\Delta\le 0$ non ci sono due soluzioni distinte che fanno da estremi, quindi niente valori esterni o interni: la disequazione è sempre vera, mai vera, vera tranne un punto, oppure vera in un punto solo.

>! "Nessuna soluzione" è una risposta completa: si scrive $S=\varnothing$, non si lascia in bianco.` },

    { id: 'sistemi', titolo: 'Sistemi di disequazioni di secondo grado', testo: R`Un **sistema di disequazioni** chiede che più disequazioni siano vere **nello stesso momento**. Si procede come nel primo grado: si risolve ogni disequazione per conto suo, poi si disegnano le soluzioni una sopra l'altra sulla stessa retta e si prende la parte comune, cioè l'**intersezione**.

$$\begin{cases} x^2-4x+3\le 0 \\ x^2-1>0 \end{cases}$$

- Prima disequazione: $(x-1)(x-3)\le 0$, valori interni con gli estremi, $1\le x\le 3$.
- Seconda disequazione: $(x-1)(x+1)>0$, valori esterni, $x<-1\ \lor\ x>1$.

Nel disegno le due righe in alto sono le soluzioni delle singole disequazioni; quella in basso è la parte che hanno in comune.

[[grafico:rettaSistema]]

La soluzione del sistema è $1<x\le 3$. Il punto $x=1$ va bene per la prima disequazione ma non per la seconda, che vuole $x$ strettamente maggiore di $1$: quindi resta fuori.

>* La soluzione di un sistema è l'**intersezione** delle soluzioni: un valore deve rendere vere **tutte** le disequazioni insieme.

?? Nel sistema sopra, perché $x=-2$ non è soluzione, anche se rende vera $x^2-1>0$?
=> Perché non rende vera la prima disequazione: $(-2)^2-4\cdot(-2)+3=4+8+3=15$, che non è $\le 0$. In un sistema non basta soddisfarne una: prendere tutti i valori che vanno bene per almeno una disequazione vuol dire fare l'unione, che è l'errore da evitare.

Se le soluzioni delle singole disequazioni non hanno nessuna parte in comune, il sistema è impossibile: $S=\varnothing$.

>! Un estremo compreso in una disequazione ma escluso nell'altra, come $x=1$ qui, nel risultato **resta escluso**: basta una sola condizione che non lo accetta.` },

    { id: 'fratte-e-prodotto', titolo: 'Disequazioni fratte e disequazioni prodotto', testo: R`Una **disequazione prodotto** confronta con $0$ un prodotto di fattori, per esempio $(x-3)(x+1)>0$, che è la solita $x^2-2x-3>0$ scomposta. Invece della parabola si può usare la **tabella dei segni**: si trova dove si annulla ogni fattore, si studia il segno di ogni fattore in ciascun intervallo, e si moltiplicano i segni. È il metodo che funziona anche quando i fattori sono più di due.

| intervallo | $x-3$ | $x+1$ | prodotto |
|---|---|---|---|
| $x<-1$ | $-$ | $-$ | $+$ |
| $-1<x<3$ | $-$ | $+$ | $-$ |
| $x>3$ | $+$ | $+$ | $+$ |

Il prodotto è positivo per $x<-1$ e per $x>3$: lo stesso risultato della parabola.

Una **disequazione fratta** ha la $x$ anche al denominatore, per esempio $\dfrac{x-1}{x^2-4}\ge 0$. Il segno di una frazione si trova come quello di un prodotto: numeratore e denominatore diventano due colonne della tabella. Il denominatore $x^2-4$ è un polinomio di secondo grado con zeri $-2$ e $2$ e $a>0$: positivo fuori, negativo fra. C'è però una regola in aggiunta: i valori che annullano il denominatore sono esclusi dalle **condizioni di esistenza** (c.e.), qualunque sia il verso.

| intervallo | $x-1$ | $x^2-4$ | frazione |
|---|---|---|---|
| $x<-2$ | $-$ | $+$ | $-$ |
| $-2<x<1$ | $-$ | $-$ | $+$ |
| $1<x<2$ | $+$ | $-$ | $-$ |
| $x>2$ | $+$ | $+$ | $+$ |

La frazione è $\ge 0$ per $-2<x\le 1$ oppure per $x>2$. Il valore $x=1$ è compreso, perché lì il numeratore vale $0$ e la frazione vale $0$; invece $x=-2$ e $x=2$ restano esclusi, perché lì la frazione non esiste.

>* In ogni intervallo il segno del prodotto, o della frazione, si ottiene moltiplicando i segni dei fattori: un numero pari di segni meno dà $+$, un numero dispari dà $-$.

?? Nella soluzione di $\dfrac{x+1}{x-2}\ge 0$, quali estremi sono compresi?
[x] $x=-1$ sì, $x=2$ no
[ ] tutti e due, perché il verso è $\ge$
[ ] nessuno dei due
=> In $x=-1$ il numeratore vale zero, la frazione vale $0$ e $0\ge 0$ è vero: $-1$ è compreso. In $x=2$ il denominatore vale zero e la frazione non esiste: $2$ è escluso anche se il verso è $\ge$. La soluzione è $x\le -1\ \lor\ x>2$.

>! Il valore che annulla il denominatore si esclude **sempre**, anche con $\ge$ o $\le$: in quel punto la frazione non vale $0$, semplicemente non esiste.` },

    { id: 'errore-dividere', titolo: 'L\'errore di dividere per un fattore con la x', testo: R`In $(x-1)(x+3)>2(x-1)$ viene voglia di dividere tutto per $(x-1)$ e "semplificare". **Non si può.** Quando si divide una disequazione per un numero negativo il verso si capovolge; ma $(x-1)$ è positivo per alcuni $x$ e negativo per altri, quindi non sai se capovolgerlo o no. E per $x=1$ staresti dividendo per zero.

Il metodo giusto è sempre lo stesso: tutto a un membro, poi si scompone.

~ (x-1)(x+3)>2(x-1) :: la $x$ compare in tutti e due i membri
~ (x-1)(x+3)\evid{-2(x-1)}>0 :: porto tutto a sinistra
~ \evid{(x-1)}\left[(x+3)-2\right]>0 :: raccolgo il fattore comune $(x-1)$
~ (x-1)(x+1)>0 :: semplifico la parentesi quadra
~ \evidb{x<-1\ \lor\ x>1} :: parabola verso l'alto con zeri $-1$ e $1$, verso $>$: valori esterni

Con la scorciatoia sbagliata, dividendo per $(x-1)$, si otterrebbe $x+3>2$, cioè $x>-1$. Ma questo intervallo contiene valori che non sono soluzioni.

?? Prendi $x=0$, che sta in $x>-1$. Rende vera $(x-1)(x+3)>2(x-1)$?
=> No. A sinistra $(0-1)(0+3)=-3$, a destra $2\cdot(0-1)=-2$, e $-3>-2$ è falso. Per $x<1$ il fattore $(x-1)$ è negativo: dividendo avresti dovuto capovolgere il verso, e la scorciatoia non l'ha fatto.

>* Non si divide mai una disequazione per un'espressione che contiene la $x$. Si porta tutto a un membro, si scompone e si studia il segno.

>! A volte la scorciatoia dà una parte della soluzione giusta, e sembra funzionare. Il guaio è che non c'è modo di saperlo senza rifare il conto nel modo corretto.` },

    { id: 'grado-superiore', titolo: 'Disequazioni di grado superiore scomponibili', testo: R`Una disequazione di grado più alto, come $x^4-5x^2+4<0$, si risolve se il polinomio si scompone in fattori di primo e di secondo grado. Poi si usa la stessa tabella dei segni.

~ x^4-5x^2+4<0 :: è un trinomio in $x^2$: cerco due numeri con somma $-5$ e prodotto $4$
~ \evid{(x^2-1)(x^2-4)}<0 :: sono $-1$ e $-4$
~ \evid{(x-1)(x+1)(x-2)(x+2)}<0 :: ogni fattore è una differenza di quadrati
~ -2,\ -1,\ 1,\ 2 :: gli zeri, messi in ordine sulla retta

Con quattro fattori la tabella è lunga, ma c'è una scorciatoia. A destra di tutti gli zeri ogni fattore è positivo, quindi il prodotto è $+$. Attraversando uno zero cambia segno un solo fattore, e con lui il prodotto. Quindi, da destra verso sinistra, i segni si alternano:

| intervallo | segno |
|---|---|
| $x>2$ | $+$ (si parte da qui) |
| $1<x<2$ | $-$ |
| $-1<x<1$ | $+$ |
| $-2<x<-1$ | $-$ |
| $x<-2$ | $+$ |

La disequazione chiede il segno $-$: $-2<x<-1\ \lor\ 1<x<2$.

>* Se gli zeri sono tutti semplici (nessuno ripetuto) e il coefficiente della potenza più alta è positivo, il segno è $+$ a destra dell'ultimo zero e poi si alterna a ogni zero, andando verso sinistra.

?? Che segno ha $(x-1)^2(x+2)$ per $0<x<1$ e per $x>1$?
[x] positivo in tutti e due gli intervalli
[ ] negativo per $0<x<1$, positivo per $x>1$
[ ] positivo per $0<x<1$, negativo per $x>1$
=> $(x-1)^2$ è un quadrato: non è mai negativo e attraversando $x=1$ non cambia segno. $(x+2)$ è positivo per tutti gli $x>-2$. Quindi il prodotto è positivo in tutti e due gli intervalli. Alternare il segno anche in $x=1$ è l'errore: la regola vale solo per gli zeri semplici.

>! La scorciatoia dell'alternanza vale **solo se gli zeri sono semplici**. Uno zero doppio, come $x=1$ in $(x-1)^2(x+2)$, non fa cambiare segno.` },

    { id: 'problemi', titolo: 'Problemi con le disequazioni di secondo grado', testo: R`Molti problemi chiedono quando una grandezza (un'area, un guadagno, un'altezza) supera una soglia, o resta sotto. Lo schema: si sceglie l'incognita, si traduce la condizione in una disequazione, la si risolve e poi si **interseca** la soluzione con i vincoli del problema (lunghezze positive, tempi positivi, numeri interi). In pratica è un sistema.

Un rettangolo ha perimetro $20\ \text{cm}$: se un lato misura $x$, l'altro misura $10-x$. Per quali $x$ l'area supera $21\ \text{cm}^2$?

~ x(10-x)>21 :: l'area è il prodotto dei lati
~ -x^2+10x-21>0 :: sviluppo e porto tutto a sinistra
~ x^2-10x+21\ \evid{<}\ 0 :: moltiplico per $-1$ e cambio il verso, per avere $a>0$
~ (x-3)(x-7)<0 :: scompongo: somma $10$, prodotto $21$
~ \evidb{3<x<7} :: valori interni; il vincolo del problema, $0<x<10$ (lati positivi), non toglie niente perché l'intervallo ci sta già dentro

Il lato deve essere compreso fra $3$ e $7\ \text{cm}$ (esclusi).

>* In un problema la soluzione della disequazione va sempre confrontata con i vincoli della situazione reale: un lato negativo o un tempo negativo risolvono la disequazione, ma non il problema.

?? Il sasso dell'introduzione ha altezza $h=20t-5t^2$. In quale intervallo di tempo sta sopra i $15$ metri?
[x] $1<t<3$
[ ] $t<1\ \lor\ t>3$
[ ] $0<t<4$
=> $20t-5t^2>15$ diventa $5t^2-20t+15<0$ (verso cambiato moltiplicando per $-1$), cioè $t^2-4t+3<0$: valori interni fra $1$ e $3$. I valori esterni sono l'errore di chi dimentica di cambiare il verso. $0<t<4$ è il tempo in cui il sasso sta sopra il suolo, cioè $h>0$.

>! Bisogna anche **rispondere alla domanda**. Se il problema chiede l'area massima, la disequazione non basta: serve il vertice della parabola dell'area, che qui è in $x=5$, cioè il quadrato.` }
  ],

  grafici: {
    segno: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      parametri: [
        { nome: 'a', min: -1.75, max: 1.75, passo: 0.5, valore: 0.75, etichetta: 'a' },
        { nome: 'h', min: -4, max: 4, passo: 0.5, valore: 1, nascosto: true },
        { nome: 'k', min: -5, max: 5, passo: 0.5, valore: -4, nascosto: true }
      ],
      funzioni: [{ f: 'a(x - h)^2 + k', colore: 1 }],
      elementi: [
        { tipo: 'area', f: 'max(a(x - h)^2 + k, 0)', da: -5, a: 5, colore: 3 },
        { tipo: 'area', f: 'min(a(x - h)^2 + k, 0)', da: -5, a: 5, colore: 2 },
        { tipo: 'punto', p: ['h - sqrt(-k/a)', 0], colore: 4 },
        { tipo: 'punto', p: ['h + sqrt(-k/a)', 0], colore: 4 },
        { tipo: 'punto', p: ['h', 'k'], trascina: true, etichetta: 'V', posizione: 'destra', colore: 1 },
        { tipo: 'testo', p: [-4.8, 5.3], testo: 'y = {{a}}x² + ({{-2a h}})x + ({{a h^2 + k}})', ancora: 'start' },
        { tipo: 'testo', p: [-4.8, 4.4], testo: 'Δ = {{-4a k}}', ancora: 'start' }
      ],
      didascalia: 'Verde: trinomio positivo. Arancione: trinomio negativo. Trascina il vertice V sopra e sotto l\'asse x, poi porta a sotto lo zero. Quando ci sono due zeri, in quale zona il trinomio ha lo stesso segno di a?'
    },
    rettaSistema: {
      tipo: 'retta-reale', x: [-3, 5], passo: 1,
      intervalli: [
        { da: 1, a: 3, chiusoDa: false, chiusoA: true, colore: 3, etichetta: 'sistema', riga: 0 },
        { da: '-inf', a: -1, chiusoA: false, colore: 2, etichetta: '2ª', riga: 1 },
        { da: 1, a: 'inf', chiusoDa: false, colore: 2, riga: 1 },
        { da: 1, a: 3, chiusoDa: true, chiusoA: true, colore: 1, etichetta: '1ª', riga: 2 }
      ],
      didascalia: 'In alto, in blu, le soluzioni della 1ª disequazione; in arancione quelle della 2ª; in basso, in verde, la parte comune, cioè le soluzioni del sistema. Guarda il punto 1: pieno nella 1ª, vuoto nella 2ª, e quindi vuoto nel sistema.'
    }
  },

  esempi: [
    { titolo: 'Disequazione con Δ>0', problema: R`Risolvi $x^2-5x+6>0$.`, passi: [
      R`Calcolo il discriminante per capire quante radici ci sono: $\Delta = 25-24=1>0$, due radici distinte.`,
      R`Le radici sono $x_{1,2}=\dfrac{5\pm1}{2}$: $x_1=2$, $x_2=3$.`,
      R`Il coefficiente $a=1$ è positivo e $\Delta>0$: valori esterni. La disequazione chiede $>0$, quindi $x<2 \ \lor\ x>3$.`,
      R`Verifica con un valore esterno, $x=0$: $6>0$ ✓. Con un valore interno, $x=2{,}5$: $6{,}25-12{,}5+6=-0{,}25$, negativo, quindi giustamente escluso.`
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
      R`Intersezione: disegno $-2<x<3$ e $x\ge-\dfrac12$ sulla stessa retta e prendo la parte comune, $-\dfrac12\le x<3$.`
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
    { nome: 'Condizione di esistenza (fratte)', formula: R`D(x) \ne 0`, nota: R`Nelle disequazioni fratte non si eliminano i denominatori moltiplicando i due membri, perché il loro segno non è noto; i valori che annullano il denominatore sono sempre esclusi dalla soluzione.` },
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
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $2x^2-2x-12>0$.`, suggerimenti: [R`Puoi dividere tutto per $2$ (positivo, il verso non cambia).`, R`Scomponi $x^2-x-6$ trovando due numeri con somma $-1$ e prodotto $-6$.`], risposta: { tipo: 'testo', accettate: ['x<-2 o x>3', 'x<-2 v x>3', 'x<-2 ∨ x>3', ']-inf;-2[ u ]3;+inf['] }, soluzione: [R`Divido per $2$: $x^2-x-6>0$.`, R`$(x-3)(x+2)>0$: radici $-2$ e $3$, $a>0$.`, R`Valori esterni: $x<-2 \ \lor\ x>3$.`] },
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
    { tipo: 'trucco', testo: R`Ricorda lo schema: fuori dalle radici il segno di $a$, dentro il segno opposto. Vale solo se $\Delta>0$.` },
    { tipo: 'metodo', testo: R`In un sistema, disegna le soluzioni delle singole disequazioni sulla stessa retta, una sopra l'altra: l'intersezione si vede a colpo d'occhio.` },
    { tipo: 'trucco', testo: R`In un polinomio scomposto con radici tutte semplici, il segno si alterna a ogni radice: basta segnare $+$ nell'ultimo intervallo a destra.` }
  ],

  aneddoti: [
    { matematico: 'Apollonio di Perga', anni: '262–190 a.C. circa', titolo: 'Il nome "parabola" viene dal confronto delle aree', testo: R`Apollonio di Perga, soprannominato «il Grande Geometra», raccolse in otto libri, le *Coniche*, tutto ciò che si sapeva sulle curve ottenute tagliando un cono con un piano. Fu lui a fissare i nomi che usiamo ancora oggi (ellisse, parabola, iperbole), presi in prestito dal linguaggio con cui i greci confrontavano le aree: "applicare" un'area a un segmento voleva dire costruire su quel segmento un rettangolo di quell'area. Se il rettangolo coincide esattamente con l'area assegnata si ha una *parabolé*, un'applicazione "esatta"; se la supera, un'*iperbolé*, un eccesso; se resta più piccola, un'*elleipsis*, un difetto. Apollonio dimostrò le proprietà di queste curve con i soli metodi della geometria greca, senza equazioni: quelle sarebbero arrivate solo con Descartes, quasi millenovecento anni dopo.`, legame: R`Il trinomio $ax^2+bx+c$ è proprio la parabola di Apollonio scritta in coordinate: il suo nome ricorda un confronto di aree, e ogni disequazione di secondo grado è ancora un confronto: il trinomio è maggiore o minore di zero?` },
    { matematico: 'René Descartes', anni: '1596–1650', titolo: 'La regola che conta le soluzioni senza calcolarle', testo: R`Nel 1637, in appendice al *Discorso sul metodo*, Descartes pubblicò *La Géométrie*, dove propose una regola sorprendente: scritta un'equazione polinomiale con i termini ordinati per grado decrescente, il numero delle sue soluzioni positive non supera il numero di volte in cui il segno dei coefficienti cambia passando da un termine al successivo, e la differenza fra i due è sempre un numero pari. Bastava contare i cambi di segno, senza risolvere nulla, per sapere quante soluzioni positive aspettarsi (e, sostituendo $x$ con $-x$, quante negative). Descartes non ne diede una dimostrazione rigorosa (arrivò più tardi, con altri autori), ma la regola funziona ancora oggi esattamente come lui l'aveva enunciata, e porta il suo nome: «regola dei segni di Descartes».`, legame: R`È la stessa idea che sta dietro la tabella dei segni: il segno di un polinomio, anche di grado alto, si legge contando come cambia da un fattore all'altro, senza rifare ogni volta tutto il calcolo.` },
    { matematico: 'Augustin-Louis Cauchy', anni: '1789–1857', titolo: 'La disuguaglianza dimostrata a salti', testo: R`Cauchy fu uno dei matematici più prolifici di sempre, con centinaia di lavori pubblicati. Nel suo *Cours d'Analyse* del 1821 dimostrò che la media aritmetica di $n$ numeri positivi non è mai minore della loro media geometrica, con uguaglianza solo se i numeri coincidono tutti. La dimostrazione procede in modo insolito, "avanti e indietro": prima per $n$ potenza di $2$, raddoppiando ogni volta il numero di termini, poi all'indietro, mostrando che se la disuguaglianza vale per $n$ termini vale anche per $n-1$. Con i lavori degli altri fu meno attento che con i propri: la memoria che il giovane Abel presentò a Parigi nel 1826, affidata a lui per un giudizio, rimase dimenticata per anni e fu pubblicata solo dopo la morte del suo autore.`, legame: R`Fra tutti i rettangoli con lo stesso perimetro, l'area è massima quando i due lati sono uguali, cioè per il quadrato: è esattamente il caso di uguaglianza della disuguaglianza di Cauchy fra media aritmetica e geometrica.` },
    { matematico: 'Évariste Galois', anni: '1811–1832', titolo: 'La notte prima del duello', testo: R`Prima di compiere vent'anni, Galois capì perché non esiste una formula generale, fatta solo di somme, prodotti e radici, per risolvere le equazioni di quinto grado o superiore, e per quali equazioni particolari una formula esiste comunque: la risposta dipende dalla struttura di un oggetto che oggi si chiama "gruppo". I suoi lavori furono respinti o smarriti dall'Accademia delle Scienze di Parigi (uno dei manoscritti andò perso quando morì Fourier, che avrebbe dovuto esaminarlo), e Galois morì a vent'anni in un duello le cui vere cause restano incerte. La notte prima, convinto di morire, scrisse in fretta a un amico l'ultima versione delle sue idee, scarabocchiando a margine "non ho tempo": ci vollero altri quattordici anni perché Liouville ne riconoscesse il valore e le pubblicasse.`, legame: R`Oltre il secondo grado qui si trattano solo disequazioni **scomponibili**: per il terzo e il quarto grado le formule esistono ma sono troppo complicate da usare, e dal quinto in su, come dimostrò Galois, in generale non esistono. La scomposizione in fattori resta lo strumento che funziona davvero.` }
  ]
});
})();
