(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'sistemi-lineari',
  titolo: 'Sistemi lineari',

  introduzione: R`Un **sistema di equazioni** mette insieme più condizioni che devono valere **nello stesso momento**, sulle stesse incognite: non basta soddisfarne una, vanno soddisfatte tutte insieme. È lo strumento giusto ogni volta che un problema lega **due (o più) quantità sconosciute** con altrettante informazioni indipendenti: il prezzo di due articoli sapendo quanto costano insieme in due acquisti diversi, le età di due persone, le dimensioni di un rettangolo di cui si conoscono perimetro e differenza fra i lati.

I sistemi di primo grado, o **sistemi lineari**, sono quelli in cui ogni equazione è di primo grado: geometricamente ogni equazione in due incognite è una retta, e risolvere il sistema significa trovare i punti in comune fra le rette. Da qui nascono tre soli scenari possibili — una soluzione, nessuna, infinite — che si riconoscono sia guardando i coefficienti sia guardando il disegno.

Per affrontare questo argomento serve saper risolvere le equazioni di primo grado in un'incognita: ogni metodo per i sistemi, alla fine, riduce il problema a un'equazione di primo grado da risolvere come si è già imparato.`,

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è un sistema e la sua soluzione', testo: R`Un **sistema di equazioni** è un insieme di due o più equazioni che devono essere vere **contemporaneamente**, nelle stesse incognite. Si scrivono una sotto l'altra, unite da una parentesi graffa:

$$\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$$

>* **Soluzione di un sistema:** una coppia ordinata $(x; y)$ di valori che, sostituiti, rendono vere **tutte** le equazioni insieme. Risolvere un sistema significa trovare tutte le sue soluzioni (se esistono).

Per la coppia $(3; 2)$: $3+2=5$ ✓ e $3-2=1$ ✓; è soluzione. La coppia $(4; 1)$ verifica solo la prima equazione ($4+1=5$) ma non la seconda ($4-1=3 \ne 1$): non è soluzione del sistema, anche se lo è di una sola equazione.

Un'equazione come $x+y=5$, da sola, ha infinite soluzioni (ogni coppia con quella somma): è il sistema, cioè la richiesta di soddisfarle *tutte* insieme, a restringere il campo a una sola coppia.

### Forma normale e grado

Un sistema di due equazioni in due incognite $x$ e $y$ è in **forma normale** quando ogni equazione è scritta come $a_1x+b_1y=c_1$, con i termini in $x$ e $y$ a primo membro e il termine noto a secondo.

>* Il **grado di un sistema** è il **prodotto** dei gradi delle singole equazioni, non la somma. In un sistema di equazioni di primo grado (dove $x$ e $y$ compaiono solo alla prima potenza, senza prodotti $xy$ o quadrati) il grado vale $1 \times 1 = 1$: per questo si chiama **sistema lineare**.

>! Non basta trovare i valori che soddisfano una sola equazione: vanno controllate entrambe. È l'errore più comune di chi si ferma al primo risultato "che sembra tornare".` },

    { id: 'sostituzione', titolo: 'Il metodo di sostituzione', testo: R`Il **metodo di sostituzione** trasforma un sistema di due equazioni in due incognite in una sola equazione in una incognita.

>* **Procedimento:** 1) si isola un'incognita in una delle due equazioni (per esempio $y$ in funzione di $x$); 2) si **sostituisce** quell'espressione al posto della stessa incognita nell'**altra** equazione; 3) si risolve l'equazione che resta, in una sola incognita; 4) si sostituisce il valore trovato nell'espressione del passo 1 per ottenere l'altra incognita.

Nel sistema $\begin{cases} x+y=5 \\ x-y=1 \end{cases}$, dalla prima equazione $y = 5-x$. Sostituendo nella seconda: $x - (5-x) = 1$, cioè $2x - 5 = 1$, da cui $x=3$. Allora $y = 5-3=2$: la soluzione è $(3; 2)$.

Conviene quando un'incognita ha già coefficiente $1$ (o $-1$): isolarla non introduce frazioni.

>! Il valore trovato va sostituito nell'**altra** equazione, non in quella da cui è stata isolata l'incognita: sostituendo lì si ottiene un'identità vera per qualunque valore (per esempio $0=0$), che non dice nulla sulla soluzione.` },

    { id: 'riduzione', titolo: 'Il metodo di riduzione (addizione e sottrazione)', testo: R`Il **metodo di riduzione** (detto anche di addizione e sottrazione) elimina un'incognita sommando o sottraendo le due equazioni, membro a membro.

>* **Procedimento:** si moltiplicano (se serve) le due equazioni per numeri opportuni, in modo che un'incognita compaia con **coefficienti opposti**; sommando membro a membro quell'incognita sparisce, e resta un'equazione in una sola incognita.

Nel sistema $\begin{cases} 4x+y=7 \\ 2x-y=5 \end{cases}$ i coefficienti di $y$ sono già opposti ($+1$ e $-1$): sommando le due equazioni, $6x = 12$, quindi $x=2$. Sostituendo in una delle due equazioni, $y = 7-4\cdot 2 = -1$.

Se i coefficienti non sono opposti né uguali, si moltiplica ciascuna equazione per un numero scelto apposta. Nel sistema $\begin{cases} 2x+3y=7 \\ 3x-2y=4 \end{cases}$, per eliminare $y$ si moltiplica la prima per $2$ e la seconda per $3$: i coefficienti di $y$ diventano $6$ e $-6$, opposti, e sommando si elimina $y$.

>* Per eliminare l'incognita con coefficienti $a_1$ e $a_2$, un moltiplicatore comodo è moltiplicare la prima equazione per $a_2$ e la seconda per $-a_1$ (o per il loro minimo comune multiplo con segni opposti).

>! Se si somma invece di sottrarre (o viceversa) quando serve l'operazione opposta, l'incognita non si elimina: prima di sommare, controllare che i coefficienti siano davvero **opposti**, non uguali.` },

    { id: 'confronto', titolo: 'Il metodo del confronto', testo: R`Il **metodo del confronto** isola la **stessa** incognita in entrambe le equazioni e poi confronta le due espressioni, ponendole uguali.

>* **Procedimento:** 1) si isola la stessa incognita (per esempio $y$) in entrambe le equazioni; 2) poiché sono entrambe uguali a $y$, si eguagliano le due espressioni in $x$; 3) si risolve l'equazione in $x$ così ottenuta; 4) si sostituisce il valore di $x$ in una delle due espressioni per trovare $y$.

Nel sistema $\begin{cases} y = 2x-1 \\ y=-x+5 \end{cases}$ entrambe le equazioni hanno già $y$ isolata: si eguagliano i secondi membri, $2x-1=-x+5$, da cui $3x=6$, $x=2$. Allora $y = 2\cdot 2-1=3$: la soluzione è $(2; 3)$.

Il confronto è comodo proprio quando le equazioni sono già scritte con la stessa incognita isolata, come nella forma esplicita della retta $y=mx+q$: è il metodo più naturale quando si passa dal sistema al confronto grafico fra due rette.

>! Le due espressioni isolate vanno eguagliate **fra loro**, non ciascuna a $0$: l'equazione da risolvere è $2x-1=-x+5$, non $2x-1=0$.` },

    { id: 'cramer', titolo: 'Il metodo di Cramer e il determinante', testo: R`Il **metodo di Cramer** risolve un sistema in forma normale $\begin{cases} a_1x+b_1y=c_1 \\ a_2x+b_2y=c_2 \end{cases}$ usando i **determinanti**, senza sostituzioni né riduzioni.

Il determinante di una tabella $2\times 2$ di numeri si calcola come prodotto della diagonale principale meno prodotto dell'altra diagonale:

$$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad-bc.$$

>* Si calcolano tre determinanti: quello del sistema, $D = \begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix}$, e $D_x$, $D_y$, ottenuti da $D$ sostituendo la colonna dei coefficienti dell'incognita con la colonna dei termini noti. Se $D \ne 0$: $$x = \frac{D_x}{D}, \qquad y = \frac{D_y}{D}.$$

Nel sistema $\begin{cases} x+2y=4 \\ 3x-y=5 \end{cases}$: $$D = \begin{vmatrix} 1 & 2 \\ 3 & -1 \end{vmatrix} = 1\cdot(-1)-2\cdot 3 = -7.$$ Sostituendo la colonna di $x$ con i termini noti: $$D_x = \begin{vmatrix} 4 & 2 \\ 5 & -1 \end{vmatrix} = 4\cdot(-1)-2\cdot 5=-14.$$ Sostituendo la colonna di $y$: $$D_y = \begin{vmatrix} 1 & 4 \\ 3 & 5 \end{vmatrix} = 1\cdot 5-4\cdot 3=-7.$$ Quindi $x = \dfrac{-14}{-7}=2$ e $y=\dfrac{-7}{-7}=1$.

Cramer è comodo quando i coefficienti non sono "comodi" per sostituzione o riduzione, e diventa indispensabile con sistemi più grandi (tre o più incognite), dove sostituzione e riduzione si complicano rapidamente.

>! Nella colonna che si sostituisce va messa la colonna dei **termini noti**, non quella dell'altra incognita: scambiarle è l'errore più frequente.` },

    { id: 'discussione', titolo: 'Sistemi determinati, impossibili e indeterminati', testo: R`Un sistema di due equazioni in due incognite può avere **una** soluzione, **nessuna** o **infinite**: sono i tre casi possibili, e si riconoscono prima ancora di risolvere.

>* Un sistema è **determinato** se ha esattamente una soluzione, **impossibile** se non ne ha nessuna, **indeterminato** se ne ha infinite.

Con Cramer il caso si legge dal determinante $D$ e dai determinanti $D_x$, $D_y$:

| $D$ | $D_x$, $D_y$ | sistema |
|---|---|---|
| $\ne 0$ | qualsiasi | determinato: un'unica soluzione |
| $=0$ | almeno uno $\ne 0$ | impossibile: nessuna soluzione |
| $=0$ | entrambi $=0$ | indeterminato: infinite soluzioni |

Lo stesso si vede senza calcolare determinanti, confrontando i **rapporti dei coefficienti** $\dfrac{a_1}{a_2}$, $\dfrac{b_1}{b_2}$, $\dfrac{c_1}{c_2}$ (quando i denominatori non sono nulli):

- $\dfrac{a_1}{a_2} \ne \dfrac{b_1}{b_2}$: sistema **determinato**;
- $\dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} \ne \dfrac{c_1}{c_2}$: sistema **impossibile**;
- $\dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} = \dfrac{c_1}{c_2}$: sistema **indeterminato**.

Per esempio, in $\begin{cases} 2x+3y=6 \\ 4x+6y=15 \end{cases}$ i rapporti $\dfrac{2}{4}=\dfrac{3}{6}=\dfrac{1}{2}$ coincidono, ma $\dfrac{6}{15}=\dfrac{2}{5}\ne \dfrac{1}{2}$: il sistema è impossibile, anche senza risolverlo.

Nel sistema indeterminato le infinite soluzioni si ottengono lasciando un'incognita libera: se le due equazioni sono in realtà la stessa retta, ogni punto della retta è soluzione.

>! "Impossibile" non vuol dire che il sistema è scritto male: vuol dire che non esiste nessuna coppia $(x;y)$ che soddisfi entrambe le condizioni insieme, un'informazione che a volte è proprio la risposta cercata (per esempio, in un problema: "non esistono due numeri con queste proprietà").` },

    { id: 'interpretazione-grafica', titolo: 'Interpretazione grafica: rette incidenti, parallele, coincidenti', testo: R`Ogni equazione $ax+by=c$ (con $a,b$ non entrambi nulli) rappresenta, nel piano cartesiano, una **retta**. Risolvere un sistema di due equazioni in due incognite significa allora cercare i punti che stanno **su entrambe le rette**, cioè le loro intersezioni.

Il sistema $\begin{cases} x+y=5 \\ x-y=1 \end{cases}$ rappresenta due rette che si incontrano in un solo punto, $(3;2)$: è la soluzione, ed è anche l'unico punto del piano che appartiene a entrambe.

[[grafico:sistema]]

I tre casi della sezione precedente hanno un significato geometrico immediato, scrivendo le rette in forma esplicita $y=mx+q$:

- **rette incidenti** ($m_1 \ne m_2$): un solo punto in comune, sistema **determinato**;
- **rette parallele e distinte** ($m_1=m_2$, $q_1\ne q_2$): nessun punto in comune, sistema **impossibile**;
- **rette coincidenti** ($m_1=m_2$, $q_1=q_2$): tutti i punti in comune, sistema **indeterminato**.

Nel grafico seguente la retta $r$ (che rappresenta $x+y=5$) resta fissa; muovendo i cursori $m$ e $q$ della retta $s$ si vede il punto di intersezione spostarsi. Quando $m$ diventa uguale alla pendenza di $r$, le due rette diventano parallele: il punto di intersezione richiederebbe una divisione per zero e **sparisce dal grafico**, proprio perché in quel caso non esiste (e se anche $q$ coincide, la retta $s$ si sovrappone a $r$: i punti in comune sono infiniti, non uno solo, e ancora una volta un singolo punto di intersezione non ha senso).

[[grafico:classificazione]]

>* Determinato ↔ incidenti, impossibile ↔ parallele distinte, indeterminato ↔ coincidenti: tre modi di dire la stessa cosa, uno algebrico (rapporti dei coefficienti) e uno geometrico (posizione delle rette).

>! Due rette "quasi parallele" (pendenze molto vicine ma diverse) danno comunque un sistema determinato: il punto di intersezione esiste sempre, anche se è lontano e difficile da vedere nel disegno.` },

    { id: 'tre-incognite', titolo: 'Sistemi a tre incognite', testo: R`Un sistema può avere anche **tre equazioni in tre incognite**, di solito chiamate $x$, $y$, $z$:

$$\begin{cases} a_1x+b_1y+c_1z=d_1 \\ a_2x+b_2y+c_2z=d_2 \\ a_3x+b_3y+c_3z=d_3 \end{cases}$$

>* **Strategia:** si usa la riduzione (o la sostituzione) per **eliminare una stessa incognita** da due coppie di equazioni, ottenendo un sistema di due equazioni in due incognite; si risolve quello con i metodi già visti; infine si sostituisce a ritroso per trovare l'incognita rimasta.

Per esempio, nel sistema $\begin{cases} x+y+z=9 \\ x-y+z=3 \\ x+y-z=1 \end{cases}$ sottraendo la seconda equazione dalla prima si eliminano $x$ e $z$ insieme, e resta un'equazione nella sola $y$; sottraendo la terza dalla prima si eliminano $x$ e $y$ insieme, e resta un'equazione nella sola $z$. Trovate $y$ e $z$, si torna a una qualunque delle tre equazioni di partenza per trovare $x$.

Il procedimento generale (eliminare le incognite una alla volta, coppia di equazioni dopo coppia di equazioni) si chiama **eliminazione**: è lo stesso, esteso a più equazioni, che i matematici cinesi usavano già duemila anni fa per sistemi fino a cinque incognite.

>! Con tre incognite serve, in generale, un numero di equazioni almeno pari al numero di incognite (qui tre): con meno equazioni il sistema ha, tipicamente, infinite soluzioni.` },

    { id: 'problemi', titolo: 'Problemi con due incognite', testo: R`Molti problemi diventano semplici se si usano **due incognite** invece di una, una per ogni quantità cercata, traducendo ogni informazione del testo in un'equazione.

>* **Schema:** 1) si scelgono le due incognite e si dice chiaramente **cosa rappresentano**; 2) si traduce ogni condizione del testo in un'equazione; 3) si mette a sistema e si risolve con il metodo più comodo; 4) si **verifica** che la soluzione abbia senso nel problema (interi se si contano oggetti, positivi se sono età o prezzi).

In un parcheggio ci sono auto (4 ruote) e moto (2 ruote): in totale 15 veicoli e 50 ruote. Chiamando $x$ le auto e $y$ le moto: $x+y=15$ (veicoli) e $4x+2y=50$ (ruote). Risolvendo si trova $x=10$, $y=5$: dieci auto e cinque moto, entrambi numeri interi non negativi, come deve essere per un conteggio di veicoli.

Usare due incognite invece di una spesso rende le equazioni più semplici da scrivere, anche se il sistema da risolvere ha un passo in più: conviene ogni volta che il testo lega **due** quantità con **due** condizioni indipendenti.

>! Una soluzione algebricamente corretta ma priva di senso nel problema (un numero negativo di persone, una frazione di uovo) va segnalata come non accettabile, non ignorata in silenzio.` }
  ],

  grafici: {
    sistema: {
      tipo: 'piano', x: [-2, 8], y: [-4, 8],
      elementi: [
        { tipo: 'retta', m: -1, q: 5, etichetta: 'r: x + y = 5', colore: 1 },
        { tipo: 'retta', m: 1, q: -1, etichetta: 's: x − y = 1', colore: 2 },
        { tipo: 'punto', p: [3, 2], etichetta: 'P(3; 2)', posizione: 'alto-destra', colore: 4 }
      ],
      didascalia: 'Le rette r e s si incontrano nel punto P(3; 2): è la soluzione del sistema.'
    },
    classificazione: {
      tipo: 'piano', x: [-6, 6], y: [-6, 12],
      parametri: [
        { nome: 'm', min: -3, max: 3, passo: 0.1, valore: 1, etichetta: 'm' },
        { nome: 'q', min: -8, max: 8, passo: 0.5, valore: -1, etichetta: 'q' }
      ],
      elementi: [
        { tipo: 'retta', m: -1, q: 5, etichetta: 'r: x + y = 5', colore: 1 },
        { tipo: 'retta', m: 'm', q: 'q', etichetta: 's: y = {{m}}x + {{q}}', colore: 2 },
        { tipo: 'punto', p: ['(5 - q) / (m + 1)', '5 - (5 - q) / (m + 1)'], etichetta: 'intersezione', posizione: 'alto', colore: 4 }
      ],
      didascalia: 'La retta r resta fissa; muovi m e q per la retta s. Quando m = −1 le rette diventano parallele (o coincidenti se anche q = 5), e il punto di intersezione — che richiederebbe una divisione per zero — sparisce.'
    }
  },

  esempi: [
    { titolo: 'Risolvere con la sostituzione', problema: R`Risolvi il sistema $\begin{cases} x+y=5 \\ x-y=1 \end{cases}$ con il metodo di sostituzione.`, passi: [
      R`Dalla prima equazione isolo $y$: $y=5-x$.`,
      R`Sostituisco nella seconda equazione: $x-(5-x)=1$, cioè $2x-5=1$.`,
      R`Risolvo: $2x=6$, quindi $x=3$.`,
      R`Sostituisco $x=3$ in $y=5-x$: $y=5-3=2$.`,
      R`Verifica: $3+2=5$ ✓ e $3-2=1$ ✓.`
    ], risultato: R`$(x; y) = (3; 2)$` },

    { titolo: 'Risolvere con la riduzione', problema: R`Risolvi il sistema $\begin{cases} 4x+y=7 \\ 2x-y=5 \end{cases}$ con il metodo di riduzione.`, passi: [
      R`I coefficienti di $y$ sono già opposti ($+1$ e $-1$): sommo le due equazioni membro a membro.`,
      R`$(4x+y)+(2x-y) = 7+5$, cioè $6x=12$, da cui $x=2$.`,
      R`Sostituisco $x=2$ nella prima equazione: $4\cdot 2+y=7$, cioè $y=7-8=-1$.`,
      R`Verifica nella seconda equazione: $2\cdot 2-(-1)=4+1=5$ ✓.`
    ], risultato: R`$(x; y)=(2; -1)$` },

    { titolo: 'Risolvere con il confronto', problema: R`Risolvi il sistema $\begin{cases} y=2x-1 \\ y=-x+5 \end{cases}$ con il metodo del confronto.`, passi: [
      R`In entrambe le equazioni $y$ è già isolata: eguaglio i secondi membri.`,
      R`$2x-1=-x+5$, cioè $3x=6$, da cui $x=2$.`,
      R`Sostituisco in una delle due espressioni: $y=2\cdot 2-1=3$.`,
      R`Verifica nell'altra: $y=-2+5=3$ ✓, coerente.`
    ], risultato: R`$(x; y)=(2; 3)$` },

    { titolo: 'Risolvere con Cramer', problema: R`Risolvi con la regola di Cramer il sistema $\begin{cases} x+2y=4 \\ 3x-y=5 \end{cases}$.`, passi: [
      R`Determinante del sistema: $D=\begin{vmatrix} 1 & 2 \\ 3 & -1 \end{vmatrix}=1\cdot(-1)-2\cdot 3=-7$. Poiché $D\ne 0$, il sistema è determinato.`,
      R`$D_x=\begin{vmatrix} 4 & 2 \\ 5 & -1 \end{vmatrix}=4\cdot(-1)-2\cdot 5=-14$, quindi $x=\dfrac{D_x}{D}=\dfrac{-14}{-7}=2$.`,
      R`$D_y=\begin{vmatrix} 1 & 4 \\ 3 & 5 \end{vmatrix}=1\cdot 5-4\cdot 3=-7$, quindi $y=\dfrac{D_y}{D}=\dfrac{-7}{-7}=1$.`,
      R`Verifica: $2+2\cdot 1=4$ ✓ e $3\cdot 2-1=5$ ✓.`
    ], risultato: R`$(x; y)=(2; 1)$` },

    { titolo: 'Un sistema a tre incognite', problema: R`Risolvi il sistema $\begin{cases} x+y+z=9 \\ x-y+z=3 \\ x+y-z=1 \end{cases}$.`, passi: [
      R`Sottraggo la seconda equazione dalla prima, per eliminare $x$ e $z$ insieme: $(x+y+z)-(x-y+z)=9-3$, cioè $2y=6$, da cui $y=3$.`,
      R`Sottraggo la terza equazione dalla prima, per eliminare $x$ e $y$ insieme: $(x+y+z)-(x+y-z)=9-1$, cioè $2z=8$, da cui $z=4$.`,
      R`Sostituisco $y=3$ e $z=4$ nella prima equazione: $x+3+4=9$, quindi $x=2$.`,
      R`Verifica nella seconda: $2-3+4=3$ ✓. Verifica nella terza: $2+3-4=1$ ✓.`
    ], risultato: R`$(x; y; z)=(2; 3; 4)$` },

    { titolo: 'Un problema con due incognite', problema: R`In un parcheggio ci sono auto (4 ruote) e moto (2 ruote): in tutto 15 veicoli e 50 ruote. Quante auto e quante moto ci sono?`, passi: [
      R`Chiamo $x$ il numero di auto e $y$ il numero di moto.`,
      R`Il numero di veicoli dà $x+y=15$; il numero di ruote dà $4x+2y=50$.`,
      R`Dalla prima equazione $y=15-x$; sostituendo nella seconda: $4x+2(15-x)=50$, cioè $2x+30=50$, da cui $x=10$.`,
      R`Allora $y=15-10=5$.`,
      R`Verifica: $10+5=15$ veicoli ✓, $4\cdot 10+2\cdot 5=40+10=50$ ruote ✓. Entrambi i valori sono interi e non negativi, come deve essere per un conteggio.`
    ], risultato: R`Dieci auto e cinque moto: $(x; y)=(10; 5)$` }
  ],

  formulario: [
    { nome: 'Sistema lineare 2×2 in forma normale', formula: R`\begin{cases} a_1 x + b_1 y = c_1 \\ a_2 x + b_2 y = c_2 \end{cases}` },
    { nome: 'Determinante del sistema', formula: R`D = \begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix} = a_1 b_2 - a_2 b_1`, nota: R`Se $D \ne 0$ il sistema è determinato.` },
    { nome: 'Determinante Dx', formula: R`D_x = \begin{vmatrix} c_1 & b_1 \\ c_2 & b_2 \end{vmatrix} = c_1 b_2 - c_2 b_1` },
    { nome: 'Determinante Dy', formula: R`D_y = \begin{vmatrix} a_1 & c_1 \\ a_2 & c_2 \end{vmatrix} = a_1 c_2 - a_2 c_1` },
    { nome: 'Formule di Cramer', formula: R`x = \frac{D_x}{D}, \qquad y = \frac{D_y}{D}`, nota: R`Valide se $D \ne 0$.` },
    { nome: 'Criterio dei rapporti: sistema determinato', formula: R`\frac{a_1}{a_2} \ne \frac{b_1}{b_2}`, nota: R`Rette incidenti: un'unica soluzione.` },
    { nome: 'Criterio dei rapporti: sistema impossibile', formula: R`\frac{a_1}{a_2} = \frac{b_1}{b_2} \ne \frac{c_1}{c_2}`, nota: R`Rette parallele e distinte: nessuna soluzione.` },
    { nome: 'Criterio dei rapporti: sistema indeterminato', formula: R`\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}`, nota: R`Rette coincidenti: infinite soluzioni.` },
    { nome: 'Retta in forma esplicita', formula: R`y = mx + q` },
    { nome: 'Condizione di rette parallele (distinte)', formula: R`m_1 = m_2, \qquad q_1 \ne q_2` },
    { nome: 'Condizione di rette coincidenti', formula: R`m_1 = m_2, \qquad q_1 = q_2` },
    { nome: 'Sistema lineare 3×3 in forma normale', formula: R`\begin{cases} a_1 x + b_1 y + c_1 z = d_1 \\ a_2 x + b_2 y + c_2 z = d_2 \\ a_3 x + b_3 y + c_3 z = d_3 \end{cases}` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione', tipo: 'definizione', fronte: R`Che cos'è un sistema di equazioni?`, retro: R`Un insieme di due o più equazioni che devono essere vere contemporaneamente, nelle stesse incognite.` },
    { id: 'fc-02', sezione: 'definizione', tipo: 'concetto', fronte: R`Che cos'è la soluzione di un sistema a due incognite?`, retro: R`Una coppia ordinata $(x; y)$ che, sostituita, rende vere tutte le equazioni del sistema insieme.` },
    { id: 'fc-03', sezione: 'definizione', tipo: 'concetto', fronte: R`Grado di un sistema di due equazioni di primo grado`, retro: R`$1\times 1=1$: il grado di un sistema è il prodotto dei gradi delle equazioni, non la somma.` },
    { id: 'fc-04', sezione: 'definizione', tipo: 'definizione', fronte: R`Forma normale di un sistema lineare 2×2`, retro: R`$a_1x+b_1y=c_1$, $a_2x+b_2y=c_2$: termini in $x,y$ a primo membro, termine noto a secondo.` },
    { id: 'fc-05', sezione: 'sostituzione', tipo: 'procedura', fronte: R`Passi del metodo di sostituzione`, retro: R`Isolare un'incognita in un'equazione, sostituirla nell'altra, risolvere, poi tornare indietro per trovare l'altra incognita.` },
    { id: 'fc-06', sezione: 'sostituzione', tipo: 'concetto', fronte: R`Quando conviene la sostituzione?`, retro: R`Quando un'incognita ha già coefficiente $1$ o $-1$: isolarla non introduce frazioni.` },
    { id: 'fc-07', sezione: 'riduzione', tipo: 'procedura', fronte: R`Passi del metodo di riduzione`, retro: R`Rendere opposti i coefficienti di un'incognita (moltiplicando le equazioni se serve), poi sommare membro a membro per eliminarla.` },
    { id: 'fc-08', sezione: 'riduzione', tipo: 'concetto', fronte: R`Perché a volte si moltiplicano le equazioni prima di sommarle?`, retro: R`Per rendere opposti i coefficienti di un'incognita, così sommando quell'incognita si elimina.` },
    { id: 'fc-09', sezione: 'confronto', tipo: 'procedura', fronte: R`Passi del metodo del confronto`, retro: R`Isolare la stessa incognita in entrambe le equazioni, eguagliare le due espressioni, risolvere, poi trovare l'altra incognita.` },
    { id: 'fc-10', sezione: 'cramer', tipo: 'formula', fronte: R`Determinante del sistema D`, retro: R`$D=a_1b_2-a_2b_1$: prodotto della diagonale principale meno prodotto dell'altra diagonale.` },
    { id: 'fc-11', sezione: 'cramer', tipo: 'formula', fronte: R`Determinante Dx`, retro: R`Si ottiene da $D$ sostituendo la colonna dei coefficienti di $x$ con la colonna dei termini noti.` },
    { id: 'fc-12', sezione: 'cramer', tipo: 'formula', fronte: R`Determinante Dy`, retro: R`Si ottiene da $D$ sostituendo la colonna dei coefficienti di $y$ con la colonna dei termini noti.` },
    { id: 'fc-13', sezione: 'cramer', tipo: 'formula', fronte: R`Formule di Cramer per x e y`, retro: R`$x=\dfrac{D_x}{D}$, $y=\dfrac{D_y}{D}$, valide se $D\ne 0$.` },
    { id: 'fc-14', sezione: 'discussione', tipo: 'concetto', fronte: R`Quando un sistema è determinato (con Cramer)?`, retro: R`Quando $D\ne 0$: esiste un'unica soluzione.` },
    { id: 'fc-15', sezione: 'discussione', tipo: 'concetto', fronte: R`Quando un sistema è impossibile (con Cramer)?`, retro: R`Quando $D=0$ e almeno uno tra $D_x$, $D_y$ è diverso da zero: nessuna soluzione.` },
    { id: 'fc-16', sezione: 'discussione', tipo: 'concetto', fronte: R`Quando un sistema è indeterminato (con Cramer)?`, retro: R`Quando $D=D_x=D_y=0$: infinite soluzioni.` },
    { id: 'fc-17', sezione: 'discussione', tipo: 'formula', fronte: R`Criterio dei rapporti: sistema determinato`, retro: R`$\dfrac{a_1}{a_2}\ne\dfrac{b_1}{b_2}$.` },
    { id: 'fc-18', sezione: 'discussione', tipo: 'formula', fronte: R`Criterio dei rapporti: sistema impossibile`, retro: R`$\dfrac{a_1}{a_2}=\dfrac{b_1}{b_2}\ne\dfrac{c_1}{c_2}$.` },
    { id: 'fc-19', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Rette incidenti: che sistema danno?`, retro: R`Un sistema determinato: le rette hanno un solo punto in comune.` },
    { id: 'fc-20', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Rette parallele e distinte: che sistema danno?`, retro: R`Un sistema impossibile: nessun punto in comune.` },
    { id: 'fc-21', sezione: 'interpretazione-grafica', tipo: 'concetto', fronte: R`Rette coincidenti: che sistema danno?`, retro: R`Un sistema indeterminato: infiniti punti in comune.` },
    { id: 'fc-22', sezione: 'tre-incognite', tipo: 'definizione', fronte: R`Forma normale di un sistema 3×3`, retro: R`$a_1x+b_1y+c_1z=d_1$, $a_2x+b_2y+c_2z=d_2$, $a_3x+b_3y+c_3z=d_3$.` },
    { id: 'fc-23', sezione: 'tre-incognite', tipo: 'procedura', fronte: R`Strategia per un sistema a tre incognite`, retro: R`Eliminare una stessa incognita da due coppie di equazioni, risolvere il sistema 2×2 risultante, poi sostituire a ritroso.` },
    { id: 'fc-24', sezione: 'problemi', tipo: 'procedura', fronte: R`Schema per un problema con due incognite`, retro: R`Scegliere le due incognite, tradurre ogni condizione in un'equazione, risolvere il sistema, verificare che la soluzione abbia senso.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Risolvi il sistema $\begin{cases} x+y=8 \\ x-y=2 \end{cases}$ con il metodo di sostituzione. Scrivi la soluzione come «x; y».`, suggerimenti: [R`Isola una delle due incognite in una delle equazioni.`, R`Dalla prima equazione, $y=8-x$: sostituiscila nella seconda.`], risposta: { tipo: 'numeri', valori: [5, 3] }, soluzione: [R`Dalla prima equazione, $y=8-x$.`, R`Sostituendo nella seconda: $x-(8-x)=2$, cioè $2x-8=2$, da cui $x=5$.`, R`Allora $y=8-5=3$.`, R`Verifica: $5+3=8$ ✓ e $5-3=2$ ✓.`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi il sistema $\begin{cases} 2x+y=9 \\ x-y=3 \end{cases}$ con il metodo di riduzione. Scrivi la soluzione come «x; y».`, suggerimenti: [R`I coefficienti di $y$ sono già opposti: prova a sommare le due equazioni.`, R`Sommando ottieni un'equazione nella sola $x$.`], risposta: { tipo: 'numeri', valori: [4, 1] }, soluzione: [R`I coefficienti di $y$ sono $+1$ e $-1$: sommo le due equazioni.`, R`$(2x+y)+(x-y)=9+3$, cioè $3x=12$, da cui $x=4$.`, R`Sostituisco in $x-y=3$: $4-y=3$, quindi $y=1$.`, R`Verifica: $2\cdot 4+1=9$ ✓.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi il sistema $\begin{cases} y=3x-2 \\ y=-2x+8 \end{cases}$ con il metodo del confronto. Scrivi la soluzione come «x; y».`, suggerimenti: [R`$y$ è già isolata in entrambe le equazioni: eguaglia i due secondi membri.`], risposta: { tipo: 'numeri', valori: [2, 4] }, soluzione: [R`Eguaglio: $3x-2=-2x+8$.`, R`$5x=10$, quindi $x=2$.`, R`$y=3\cdot 2-2=4$.`, R`Verifica nell'altra: $y=-2\cdot 2+8=4$ ✓.`] },
    { id: 'es-04', difficolta: 1, testo: R`Le rette $r: y=2x-3$ e $s: y=2x+1$ hanno lo stesso coefficiente angolare ma ordinate all'origine diverse. Il sistema che le rappresenta è determinato, impossibile o indeterminato?`, suggerimenti: [R`Confronta i coefficienti angolari $m$ e le ordinate all'origine $q$ delle due rette.`, R`Stesso $m$ ma $q$ diverso: le rette sono parallele e distinte.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna soluzione', 'nessuna', 'parallele e distinte', 'parallele'] }, soluzione: [R`$m_r=m_s=2$ ma $q_r=-3\ne q_s=1$: le rette sono parallele e distinte.`, R`Rette parallele e distinte non hanno punti in comune: il sistema è impossibile.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi con la regola di Cramer il sistema $\begin{cases} 3x-2y=4 \\ x+y=3 \end{cases}$. Scrivi la soluzione come «x; y».`, suggerimenti: [R`Calcola prima $D$, poi $D_x$ e $D_y$.`, R`$D=3\cdot 1-(-2)\cdot 1$.`], risposta: { tipo: 'numeri', valori: [2, 1] }, soluzione: [R`$D=\begin{vmatrix} 3 & -2 \\ 1 & 1 \end{vmatrix}=3\cdot 1-(-2)\cdot 1=5$.`, R`$D_x=\begin{vmatrix} 4 & -2 \\ 3 & 1 \end{vmatrix}=4\cdot 1-(-2)\cdot 3=10$, quindi $x=\dfrac{10}{5}=2$.`, R`$D_y=\begin{vmatrix} 3 & 4 \\ 1 & 3 \end{vmatrix}=3\cdot 3-4\cdot 1=5$, quindi $y=\dfrac{5}{5}=1$.`, R`Verifica: $3\cdot 2-2\cdot 1=4$ ✓ e $2+1=3$ ✓.`] },
    { id: 'es-06', difficolta: 2, testo: R`Per quale valore di $k$ il sistema $\begin{cases} kx+2y=4 \\ x+y=3 \end{cases}$ è impossibile?`, suggerimenti: [R`Un sistema è impossibile quando $\dfrac{a_1}{a_2}=\dfrac{b_1}{b_2}\ne\dfrac{c_1}{c_2}$.`, R`Imponi $\dfrac{k}{1}=\dfrac{2}{1}$ e controlla che $\dfrac{4}{3}$ sia diverso da quel rapporto.`], risposta: { tipo: 'numero', valore: 2 }, soluzione: [R`Il sistema è impossibile se $\dfrac{k}{1}=\dfrac{2}{1}$ ma $\dfrac{4}{3}\ne\dfrac{2}{1}$.`, R`Da $\dfrac{k}{1}=2$ si ha $k=2$; e $\dfrac{4}{3}\ne 2$: la condizione è soddisfatta.`, R`Verifica: con $k=2$ la prima equazione diventa $2x+2y=4$, cioè $x+y=2$, in contraddizione con $x+y=3$: nessuna coppia può soddisfare entrambe.`] },
    { id: 'es-07', difficolta: 2, testo: R`Per quale valore di $k$ il sistema $\begin{cases} x+2y=5 \\ kx-4y=-10 \end{cases}$ è indeterminato?`, suggerimenti: [R`Un sistema è indeterminato quando le due equazioni rappresentano la stessa retta.`, R`Confronta i rapporti $\dfrac{1}{k}$, $\dfrac{2}{-4}$ e $\dfrac{5}{-10}$: gli ultimi due sono già uguali fra loro.`], risposta: { tipo: 'numero', valore: -2 }, soluzione: [R`$\dfrac{2}{-4}=\dfrac{5}{-10}=-\dfrac{1}{2}$: questi due rapporti coincidono già, per ogni $k$.`, R`Serve anche $\dfrac{1}{k}=-\dfrac{1}{2}$, cioè $k=-2$.`, R`Verifica: con $k=-2$ la seconda equazione diventa $-2x-4y=-10$, cioè $x+2y=5$: è la stessa equazione della prima. Le soluzioni sono infinite.`] },
    { id: 'es-08', difficolta: 2, testo: R`In una tavola calda, 2 panini e 3 bibite costano $9$ €; 4 panini e 1 bibita costano $13$ €. Quanto costa un panino? Quanto una bibita? Scrivi la soluzione come «panino; bibita».`, suggerimenti: [R`Chiama $x$ il prezzo di un panino e $y$ quello di una bibita: scrivi le due equazioni.`, R`Dalla seconda equazione isola $y$ e sostituisci nella prima.`], risposta: { tipo: 'numeri', valori: [3, 1] }, soluzione: [R`$2x+3y=9$ e $4x+y=13$.`, R`Dalla seconda, $y=13-4x$; sostituendo nella prima: $2x+3(13-4x)=9$, cioè $2x+39-12x=9$, da cui $-10x=-30$, $x=3$.`, R`$y=13-4\cdot 3=1$.`, R`Verifica: $2\cdot 3+3\cdot 1=9$ ✓ e $4\cdot 3+1=13$ ✓. Un panino costa $3$ € e una bibita $1$ €.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi il sistema a tre incognite $\begin{cases} x+y+z=9 \\ x-y+z=3 \\ x+y-z=1 \end{cases}$. Scrivi la soluzione come «x; y; z».`, suggerimenti: [R`Sottrai a coppie le equazioni per eliminare due incognite alla volta.`, R`Sottraendo la seconda dalla prima elimini $x$ e $z$ insieme: trovi $y$.`], risposta: { tipo: 'numeri', valori: [2, 3, 4] }, soluzione: [R`Prima meno seconda: $2y=6$, quindi $y=3$.`, R`Prima meno terza: $2z=8$, quindi $z=4$.`, R`Sostituendo nella prima: $x+3+4=9$, quindi $x=2$.`, R`Verifica nella seconda: $2-3+4=3$ ✓; nella terza: $2+3-4=1$ ✓.`] },
    { id: 'es-10', difficolta: 3, testo: R`Un padre ha il triplo dell'età del figlio. Tra 12 anni ne avrà il doppio. Quanti anni hanno oggi? Scrivi la soluzione come «padre; figlio».`, suggerimenti: [R`Chiama $p$ l'età del padre e $f$ quella del figlio: la prima frase dà $p=3f$.`, R`La seconda frase dà $p+12=2(f+12)$: sostituisci $p=3f$.`], risposta: { tipo: 'numeri', valori: [36, 12] }, soluzione: [R`$p=3f$ e $p+12=2(f+12)$.`, R`Sostituendo: $3f+12=2f+24$, quindi $f=12$.`, R`$p=3\cdot 12=36$.`, R`Verifica: tra 12 anni, $p+12=48$ e $f+12=24$, e $48=2\cdot 24$ ✓.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cos'è la soluzione di un sistema di due equazioni in due incognite?`, opzioni: [R`Una coppia ordinata $(x;y)$ che soddisfa entrambe le equazioni insieme`, R`Un valore che soddisfa almeno una delle due equazioni`, R`Il valore del termine noto comune alle due equazioni`, R`Un'equazione ottenuta sommando le due equazioni del sistema`], corretta: 0, spiegazione: R`La soluzione deve verificare contemporaneamente tutte le equazioni del sistema, non una sola: per questo si parla di coppia ordinata.` },
    { id: 'q-02', domanda: R`Qual è il grado di un sistema formato da due equazioni di primo grado?`, opzioni: [R`2, la somma dei gradi`, R`1, il prodotto dei gradi (non la somma)`, R`0`, R`Non è definito per i sistemi lineari`], corretta: 1, spiegazione: R`Il grado di un sistema è il prodotto dei gradi delle singole equazioni: $1 \times 1 = 1$. Per questo si chiamano sistemi lineari.` },
    { id: 'q-03', domanda: R`Qual è la forma normale di un sistema lineare di due equazioni in due incognite?`, opzioni: [R`$y=a_1x+b_1$, $y=a_2x+b_2$ soltanto`, R`$a_1x^2+b_1y=c_1$, $a_2x+b_2y^2=c_2$`, R`$a_1x+b_1y=c_1$, $a_2x+b_2y=c_2$`, R`$x+y=a_1$, $x-y=a_2$`], corretta: 2, spiegazione: R`La forma normale porta i termini in $x$ e $y$ a primo membro e il termine noto a secondo, in entrambe le equazioni.` },
    { id: 'q-04', domanda: R`Nel metodo di sostituzione, dopo aver isolato un'incognita in un'equazione, dove va sostituita la sua espressione?`, opzioni: [R`Nella stessa equazione da cui è stata isolata`, R`In entrambe le equazioni contemporaneamente`, R`Non va sostituita, si risolve direttamente`, R`Nell'altra equazione del sistema`], corretta: 3, spiegazione: R`Sostituendo nella stessa equazione si ottiene un'identità sempre vera (per esempio $0=0$), che non fornisce informazioni: l'espressione va sostituita nell'altra equazione.` },
    { id: 'q-05', domanda: R`Quando conviene in particolare il metodo di riduzione?`, opzioni: [R`Quando i coefficienti di un'incognita sono uguali o si possono rendere facilmente opposti`, R`Quando un'incognita ha già coefficiente $1$`, R`Quando il sistema ha tre incognite`, R`Quando il determinante del sistema è zero`], corretta: 0, spiegazione: R`La riduzione elimina un'incognita sommando le equazioni: conviene quando, moltiplicando per numeri opportuni, i coefficienti di un'incognita diventano opposti.` },
    { id: 'q-06', domanda: R`Il metodo del confronto richiede che...`, opzioni: [R`una sola equazione abbia un'incognita isolata`, R`la stessa incognita sia isolata in entrambe le equazioni`, R`il sistema sia già risolto`, R`i due determinanti $D_x$ e $D_y$ siano nulli`], corretta: 1, spiegazione: R`Si "confrontano" le due espressioni della stessa incognita isolata in entrambe le equazioni, eguagliandole fra loro.` },
    { id: 'q-07', domanda: R`Come si calcola il determinante $D = \begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix}$?`, opzioni: [R`$a_1a_2 - b_1b_2$`, R`$a_1b_1 - a_2b_2$`, R`$a_1b_2 - a_2b_1$`, R`$a_1b_2+a_2b_1$`], corretta: 2, spiegazione: R`Il determinante $2\times 2$ è il prodotto della diagonale principale meno il prodotto dell'altra diagonale: $a_1b_2-a_2b_1$.` },
    { id: 'q-08', domanda: R`Nella regola di Cramer, come si ottiene $D_x$ a partire da $D$?`, opzioni: [R`Sostituendo la colonna dei coefficienti di $y$ con la colonna dei termini noti`, R`Scambiando le due righe di $D$`, R`Moltiplicando $D$ per $x$`, R`Sostituendo la colonna dei coefficienti di $x$ con la colonna dei termini noti`], corretta: 3, spiegazione: R`Per trovare $D_x$ si sostituisce nella tabella dei coefficienti la colonna di $x$ con quella dei termini noti; per $D_y$ si sostituisce invece la colonna di $y$.` },
    { id: 'q-09', domanda: R`Se $D \ne 0$, il sistema è...`, opzioni: [R`determinato, con un'unica soluzione`, R`impossibile`, R`indeterminato`, R`privo di soluzioni intere`], corretta: 0, spiegazione: R`$D\ne 0$ permette di dividere per $D$ nelle formule di Cramer: il sistema ha esattamente una soluzione.` },
    { id: 'q-10', domanda: R`Se $D=0$ e almeno uno tra $D_x$, $D_y$ è diverso da zero, il sistema è...`, opzioni: [R`determinato`, R`impossibile`, R`indeterminato`, R`di secondo grado`], corretta: 1, spiegazione: R`Con $D=0$ non si può dividere: se $D_x$ o $D_y$ non sono nulli non esiste alcuna soluzione, il sistema è impossibile.` },
    { id: 'q-11', domanda: R`Quando un sistema è indeterminato?`, opzioni: [R`$D\ne 0$`, R`$D=0$ e $D_x\ne 0$`, R`$D=0$ e $D_x=D_y=0$`, R`$D_x=D_y$ ma $D\ne 0$`], corretta: 2, spiegazione: R`Se anche $D_x$ e $D_y$ si annullano insieme a $D$, le due equazioni sono in realtà equivalenti: infinite soluzioni.` },
    { id: 'q-12', domanda: R`Il criterio dei rapporti dei coefficienti dice che il sistema è determinato quando...`, opzioni: [R`$\dfrac{a_1}{a_2}=\dfrac{b_1}{b_2}$`, R`$\dfrac{a_1}{a_2}=\dfrac{c_1}{c_2}$`, R`$a_1=a_2$ e $b_1=b_2$`, R`$\dfrac{a_1}{a_2}\ne\dfrac{b_1}{b_2}$`], corretta: 3, spiegazione: R`Rapporti diversi fra i coefficienti di $x$ e di $y$ corrispondono a rette con pendenza diversa: si incontrano in un solo punto.` },
    { id: 'q-13', domanda: R`Due rette incidenti corrispondono a un sistema...`, opzioni: [R`determinato`, R`impossibile`, R`indeterminato`, R`di grado superiore al primo`], corretta: 0, spiegazione: R`Due rette incidenti hanno un solo punto in comune: è l'unica soluzione, il sistema è determinato.` },
    { id: 'q-14', domanda: R`Due rette parallele e distinte corrispondono a un sistema...`, opzioni: [R`determinato`, R`impossibile`, R`indeterminato`, R`a tre incognite`], corretta: 1, spiegazione: R`Rette parallele e distinte non si incontrano mai: nessuna coppia $(x;y)$ soddisfa entrambe le equazioni, il sistema è impossibile.` },
    { id: 'q-15', domanda: R`Due rette coincidenti corrispondono a un sistema...`, opzioni: [R`determinato`, R`impossibile`, R`indeterminato, con infinite soluzioni`, R`privo di rappresentazione grafica`], corretta: 2, spiegazione: R`Se le due rette coincidono, ogni loro punto è soluzione di entrambe le equazioni: le soluzioni sono infinite.` },
    { id: 'q-16', domanda: R`Per determinare in generale un'unica soluzione $(x;y;z)$ di un sistema a tre incognite, di quante equazioni indipendenti c'è bisogno?`, opzioni: [R`Due`, R`Una per ogni valore possibile di $z$`, R`Non è mai possibile con tre incognite`, R`Tre`], corretta: 3, spiegazione: R`Servono, in generale, tante equazioni indipendenti quante sono le incognite: con tre incognite, tre equazioni.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Prima di applicare qualunque metodo, scrivi il sistema in forma normale: tutti i termini con le incognite a sinistra, il termine noto a destra, in entrambe le equazioni.` },
    { tipo: 'errore', testo: R`Una soluzione trovata sostituendo in una sola equazione non basta: va verificata in **entrambe**. È l'errore più comune con la sostituzione e con il confronto.` },
    { tipo: 'metodo', testo: R`Scegli il metodo guardando i coefficienti: sostituzione se un'incognita ha già coefficiente $1$, riduzione se i coefficienti di un'incognita sono uguali o facilmente resi opposti, Cramer se nessuno dei due è comodo.` },
    { tipo: 'errore', testo: R`Nel calcolo del determinante l'ordine conta: $D=a_1b_2-a_2b_1$, non $a_1b_1-a_2b_2$. Scrivere sempre i coefficienti nello stesso ordine (prima equazione sopra, seconda sotto) evita l'errore.` },
    { tipo: 'trucco', testo: R`Prima di risolvere, un'occhiata al criterio dei rapporti dei coefficienti dice già se aspettarti una soluzione, nessuna o infinite: utile anche per controllare il risultato alla fine.` },
    { tipo: 'errore', testo: R`Sistema impossibile non vuol dire "ho sbagliato i calcoli": le rette possono davvero essere parallele. Prima di ricominciare da capo, controlla se i rapporti dei coefficienti lo confermano.` },
    { tipo: 'metodo', testo: R`In un sistema a tre incognite, elimina un'incognita alla volta: ogni eliminazione riduce di uno il numero delle incognite, finché non resta una sola equazione in una sola incognita.` },
    { tipo: 'trucco', testo: R`Nei problemi con due incognite, scrivi sempre a parole cosa rappresentano $x$ e $y$ prima di tradurre le condizioni: evita di confonderle a metà problema.` },
    { tipo: 'errore', testo: R`Una soluzione algebricamente corretta ma senza senso nel problema (un'età negativa, un numero non intero di oggetti) va segnalata come non accettabile, non ignorata.` }
  ],

  aneddoti: [
    { matematico: 'I Nove Capitoli sull\'Arte Matematica', anni: 'completato entro il I sec. d.C.; commento di Liu Hui, 263 d.C.', titolo: 'Fangcheng: l\'eliminazione cinese con le bacchette', testo: R`Duemila anni prima di Gauss, il capitolo ottavo dei Nove Capitoli sull'Arte Matematica ("Fangcheng", letteralmente "disposizioni rettangolari") insegnava a risolvere sistemi fino a cinque equazioni e cinque incognite. I coefficienti venivano disposti in colonne su una tavola da calcolo, con bastoncini da conteggio: una colonna per ogni equazione. Il metodo prescriveva di moltiplicare una colonna per il numero giusto e sottrarla da un'altra, esattamente come nella riduzione di oggi, finché non restava una sola incognita per colonna. Per far tornare i conti servivano i numeri negativi, e i Nove Capitoli furono il primo testo a maneggiarli con naturalezza, con bastoncini di due colori per positivi e negativi. Nel 263 d.C. il matematico Liu Hui scrisse un commento che giustifica il procedimento passo per passo.`, legame: R`È lo stesso metodo di riduzione (addizione e sottrazione) di questa sezione, applicato a più equazioni insieme, come nell'esempio a tre incognite.` },

    { matematico: 'Gabriel Cramer', anni: '1704–1752', titolo: 'La regola pubblicata nel 1750, non proprio inedita', testo: R`Nel 1750 il ginevrino Gabriel Cramer pubblicò l'Introduction à l'analyse des lignes courbes algébriques, un trattato sulle curve algebriche. In un'appendice, per determinare i coefficienti di una curva passante per punti dati, scrisse la regola generale che oggi porta il suo nome: le soluzioni di un sistema lineare come rapporti di determinanti. Cramer non fu il primo ad averla scoperta: lo scozzese Colin Maclaurin aveva già descritto la stessa idea per sistemi fino a quattro equazioni in un trattato pubblicato postumo nel 1748, due anni prima. Ma fu la notazione chiara e generale di Cramer, pensata per un numero qualunque di incognite, a passare alla storia: da allora "regola di Cramer" indica il metodo che usa i determinanti al posto di sostituzioni e riduzioni successive.`, legame: R`È esattamente il metodo di questa sezione: $x$ e $y$ come rapporti di determinanti $2\times 2$.` },

    { matematico: 'Carl Friedrich Gauss', anni: '1777–1855', titolo: 'Un metodo antico che porta il suo nome per caso', testo: R`L'eliminazione che oggi si chiama "gaussiana" non è un'invenzione di Gauss: la stessa idea, colonna che elimina colonna, era già nei Nove Capitoli cinesi duemila anni prima. Gauss la riscoprì e la sistematizzò lavorando su tutt'altro problema: nel 1801 calcolò l'orbita del pianeta nano Cerere da poche osservazioni, e per farlo dovette risolvere grandi sistemi di equazioni lineari nate dal metodo dei minimi quadrati. Usò l'eliminazione come tecnica di calcolo pratico anche nei suoi lavori di geodesia, per elaborare le triangolazioni del regno di Hannover. Il nome "eliminazione di Gauss" si diffuse solo nel Novecento, quando i manuali di calcolo numerico (in particolare quelli del geodeta Wilhelm Jordan, da cui il nome "Gauss-Jordan") lo adottarono per descrivere la procedura sistematica riga per riga.`, legame: R`È il metodo di riduzione esteso a più equazioni: si elimina un'incognita alla volta, come nell'esempio a tre incognite di questa sezione.` },

    { matematico: 'Seki Takakazu', anni: 'circa 1642–1708', titolo: 'I determinanti scoperti nel Giappone isolato', testo: R`Nel Giappone del periodo Edo, chiuso quasi del tutto agli scambi con l'estero, il matematico Seki Takakazu fondò la tradizione del wasan, la "matematica giapponese". Nel 1683, nell'opera Kaifukudai no Hō, introdusse un metodo per calcolare quello che oggi chiamiamo determinante, per eliminare le incognite nei sistemi di equazioni con più variabili: dieci anni prima che in Europa Gottfried Leibniz descrivesse un'idea simile in una lettera del 1693 a de l'Hôpital, senza però pubblicarla né svilupparla oltre. I due lavori nacquero senza alcun contatto: l'isolamento del Giappone rese l'opera di Seki sconosciuta in Occidente per oltre un secolo, finché gli storici della matematica non la riscoprirono.`, legame: R`Il determinante che Seki calcolò per eliminare le incognite è lo stesso $D$ della regola di Cramer di questa sezione.` }
  ]
});
})();
