(function () {
const R = String.raw;
/* risposte dell'allenamento: la coppia (x; y) in quell'ordine, oppure una parola */
const SEGNA = 'es. 2; -1';
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: SEGNA });
const IMPOSSIBILE = { tipo: 'testo', segnaposto: SEGNA, accettate: ['impossibile', 'sistema impossibile', 'è impossibile', 'nessuna', 'nessuna soluzione', 'nessuna coppia', 'non ha soluzioni', 'nessun punto', '∅', 'ø', '{}', 'S=∅', 'S=ø', 'S={}', 'insieme vuoto', 'vuoto'] };
const INDETERMINATO = { tipo: 'testo', segnaposto: SEGNA, accettate: ['indeterminato', 'sistema indeterminato', 'è indeterminato', 'infinite', 'infinite soluzioni', 'infinite coppie', 'ha infinite soluzioni', 'soluzioni infinite', 'indeterminata', 'infinito', 'infiniti', 'infiniti punti', '∞'] };
COMPASSO.registra({
  id: 'sistemi-lineari',
  titolo: 'Sistemi lineari',

  introduzione: R`Al bar, 2 caffè e un cornetto costano 3,50 €. Il giorno dopo, un caffè e 2 cornetti costano 4 €. Quanto costa un caffè?

Chiama $x$ il prezzo del caffè e $y$ quello del cornetto. Devono valere **insieme** $2x + y = 3{,}5$ e $x + 2y = 4$. L'unica possibilità è $x = 1$ e $y = 1{,}5$.

Un **sistema** mette insieme più equazioni che devono valere nello stesso momento. Se sono tutte di primo grado, è un **sistema lineare**.

Ti serve saper risolvere le equazioni di primo grado. Ogni metodo, alla fine, porta a un'equazione con una sola incognita.`,

  inBreve: [
    R`La soluzione di un sistema è una coppia $(x;\,y)$ che rende vere **tutte** le equazioni. Per controllarla, sostituiscila in ognuna.`,
    R`Sostituzione, riduzione, confronto e Cramer danno lo stesso risultato. Scegli quello con i conti più corti.`,
    R`Con Cramer, se $D \ne 0$: $x = \frac{D_x}{D}$ e $y = \frac{D_y}{D}$.`,
    R`Un sistema può avere una soluzione (determinato), nessuna (impossibile) o infinite (indeterminato).`,
    R`Ogni equazione è una retta. Rette incidenti, parallele o coincidenti danno i tre casi.`
  ],

  sezioni: [
    { id: 'definizione', titolo: 'Che cos\'è un sistema e la sua soluzione', testo: R`Due numeri hanno somma $5$ e differenza $1$. Quali sono?

La somma da sola ha infinite risposte: $0$ e $5$, $1$ e $4$, $2$ e $3$… Con la differenza ne resta una sola. Scritte con la graffa, le due condizioni formano un **sistema**:

$$\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$$

>* La **soluzione** di un sistema è una coppia $(x;\,y)$ che rende vere **tutte** le equazioni insieme. Nella coppia viene prima $x$, poi $y$.

La coppia $(3;\,2)$ va bene: $3 + 2 = 5$ ✓ e $3 - 2 = 1$ ✓. La coppia $(4;\,1)$ no: $4 + 1 = 5$ ✓, ma $4 - 1 = 3$.

?? La coppia $(1;\,4)$ è soluzione di $\begin{cases} x + y = 5 \\ 2x - y = 2 \end{cases}$?
[ ] sì, perché $1 + 4 = 5$
[x] no: la prima equazione torna, la seconda no
[ ] serve risolvere il sistema
=> Va controllata in **tutte e due**. $1 + 4 = 5$ ✓, ma $2 \cdot 1 - 4 = -2$. Per controllare una coppia basta sostituirla.

### Forma normale e grado

Un sistema è in **forma normale** se ogni equazione è scritta come $ax + by = c$. Le incognite stanno a sinistra. A destra resta il numero, che si chiama **termine noto**.

I coefficienti della prima equazione si chiamano $a_1$, $b_1$, $c_1$. Quelli della seconda si chiamano $a_2$, $b_2$, $c_2$.

>* Il **grado** di un sistema è il **prodotto** dei gradi delle equazioni. Due equazioni di primo grado danno grado $1 \cdot 1 = 1$: il sistema è **lineare**.

>! Per il grado si moltiplica: $1 \cdot 1 = 1$. Chi somma trova $2$, e sbaglia.` },

    { id: 'sostituzione', titolo: 'Il metodo di sostituzione', testo: R`Da $x + y = 5$ ricavi $y = 5 - x$. Ora puoi scrivere $5 - x$ al posto di $y$ nell'altra equazione. Resta un'equazione con la sola $x$.

[[video:sistemi-lineari/sostituzione]]

>* **Metodo di sostituzione.** Ricavi un'incognita da un'equazione e la sostituisci nell'**altra**.

1. Ricava un'incognita da un'equazione.
2. Sostituisci l'espressione nell'altra equazione.
3. Risolvi l'equazione con una sola incognita.
4. Metti il valore trovato nell'espressione del passo 1.

~ \begin{cases} x + y = 5 \\ x - y = 1 \end{cases} :: il sistema di partenza
~ \begin{cases} \evid{y = 5 - x} \\ x - y = 1 \end{cases} :: ricavo $y$ dalla prima equazione
~ \begin{cases} y = 5 - x \\ x - \evid{(5 - x)} = 1 \end{cases} :: nella seconda scrivo $5 - x$ al posto di $y$, tra parentesi
~ \begin{cases} y = 5 - x \\ \evid{x = 3} \end{cases} :: risolvo: $2x - 5 = 1$, quindi $2x = 6$
~ \begin{cases} y = \evidb{2} \\ x = \evidb{3} \end{cases} :: rimetto $x = 3$ in $y = 5 - x$

La soluzione è $(3;\,2)$. La sostituzione conviene quando un'incognita ha coefficiente $1$ o $-1$. Così non nascono frazioni.

?? Nel sistema $\begin{cases} y = 2x \\ 3x + y = 10 \end{cases}$, che cosa ottieni sostituendo?
[x] $3x + 2x = 10$
[ ] $3 \cdot 2x + y = 10$
[ ] $3x + 2 = 10$
=> $y$ vale $2x$: nella seconda scrivi $2x$ al posto di $y$. Poi $5x = 10$, quindi $x = 2$ e $y = 4$. Chi scrive $3 \cdot 2x$ ha sostituito la $x$ invece della $y$.

>! Sostituisci nell'**altra** equazione. Nella stessa ottieni un'uguaglianza come $5 = 5$, che non serve.` },

    { id: 'riduzione', titolo: 'Il metodo di riduzione (addizione e sottrazione)', testo: R`Guarda $\begin{cases} 4x + y = 7 \\ 2x - y = 5 \end{cases}$. La $y$ compare una volta come $+y$ e una come $-y$.

[[video:sistemi-lineari/riduzione]]

Somma le due equazioni membro a membro: sinistra con sinistra, destra con destra. La $y$ sparisce: $6x = 12$, quindi $x = 2$. Dalla prima, $y = 7 - 8 = -1$.

>* **Metodo di riduzione.** Fai in modo che un'incognita abbia coefficienti **opposti**, come $+6$ e $-6$. Poi somma le equazioni: quell'incognita sparisce.

Se i coefficienti non sono opposti, moltiplica le equazioni:

~ \begin{cases} 2x + 3y = 7 \\ 3x - 2y = 4 \end{cases} :: voglio eliminare $y$, che ha coefficienti $3$ e $-2$
~ \begin{cases} \evid{4x + 6y = 14} \\ \evid{9x - 6y = 12} \end{cases} :: moltiplico la prima per $2$ e la seconda per $3$: ora la $y$ ha $+6$ e $-6$
~ \evid{13x = 26} :: sommo membro a membro: le $y$ si eliminano
~ x = \evidb{2} :: divido per $13$
~ 4 + 3y = 7 \;\Rightarrow\; y = \evidb{1} :: rimetto $x = 2$ nella prima equazione

Verifica nella seconda: $3 \cdot 2 - 2 \cdot 1 = 4$ ✓.

?? In $\begin{cases} x + 2y = 8 \\ x - y = 2 \end{cases}$, come elimini la $x$?
[x] sottrai le equazioni
[ ] sommi le equazioni
[ ] moltiplichi la prima per $2$
=> La $x$ ha coefficiente $1$ in tutte e due. I coefficienti sono **uguali**, quindi sottrai: $3y = 6$, $y = 2$ e poi $x = 4$. Sommando, la $x$ resta.

>! Coefficienti **opposti**: somma le equazioni. Coefficienti **uguali**: sottrai.` },

    { id: 'confronto', titolo: 'Il metodo del confronto', testo: R`Ricava la **stessa** incognita da tutte e due le equazioni. Ottieni due espressioni che valgono entrambe $y$. Allora sono uguali fra loro.

>* **Metodo del confronto.** Ricavi la stessa incognita dalle due equazioni e uguagli le due espressioni.

~ \begin{cases} y = 2x - 1 \\ y = -x + 5 \end{cases} :: la $y$ è già ricavata in tutte e due
~ \evid{2x - 1 = -x + 5} :: le due espressioni valgono entrambe $y$: le uguaglio
~ 3x = 6 \;\Rightarrow\; x = \evidb{2} :: risolvo l'equazione in $x$
~ y = 2 \cdot 2 - 1 = \evidb{3} :: sostituisco in una delle due espressioni

Verifica nell'altra: $-2 + 5 = 3$ ✓. La soluzione è $(2;\,3)$. Il confronto è comodo quando le equazioni sono già nella forma $y = mx + q$.

?? Nel sistema $\begin{cases} y = 3x \\ y = x + 4 \end{cases}$, che cosa scrivi con il confronto?
[x] $3x = x + 4$
[ ] $3x = 0$ e $x + 4 = 0$
[ ] $3x + x + 4 = 0$
=> Uguagli le due espressioni di $y$: $3x = x + 4$. Quindi $x = 2$ e $y = 6$. Porre ognuna uguale a zero non ha senso: $y$ non vale zero.

>! Uguaglia solo espressioni della **stessa** incognita: $y$ con $y$, $x$ con $x$.` },

    { id: 'cramer', titolo: 'Il metodo di Cramer e il determinante', testo: R`Con il **metodo di Cramer** risolvi un sistema facendo solo tre conti con i coefficienti. Serve il **determinante**.

Il determinante di una tabella di quattro numeri è: prodotto della diagonale che scende, meno prodotto dell'altra diagonale.

$$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$

Per esempio $\begin{vmatrix} 2 & 3 \\ 1 & 4 \end{vmatrix} = 2 \cdot 4 - 3 \cdot 1 = 5$.

Per un sistema in forma normale calcoli tre determinanti:

- $D$ ha i coefficienti delle incognite: $\begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix}$;
- $D_x$ ha i termini noti al posto della colonna della $x$: $\begin{vmatrix} c_1 & b_1 \\ c_2 & b_2 \end{vmatrix}$;
- $D_y$ ha i termini noti al posto della colonna della $y$: $\begin{vmatrix} a_1 & c_1 \\ a_2 & c_2 \end{vmatrix}$.

>* **Regola di Cramer.** Se $D \ne 0$, c'è una sola soluzione: $x = \dfrac{D_x}{D}$ e $y = \dfrac{D_y}{D}$.

Per il sistema $\begin{cases} x + 2y = 4 \\ 3x - y = 5 \end{cases}$:

~ D = \begin{vmatrix} 1 & 2 \\ 3 & -1 \end{vmatrix} = -1 - 6 = \evidb{-7} :: prima colonna i coefficienti di $x$, seconda quelli di $y$
~ D_x = \begin{vmatrix} \evid{4} & 2 \\ \evid{5} & -1 \end{vmatrix} = -4 - 10 = \evidb{-14} :: al posto della colonna della $x$ metto i termini noti
~ D_y = \begin{vmatrix} 1 & \evid{4} \\ 3 & \evid{5} \end{vmatrix} = 5 - 12 = \evidb{-7} :: al posto della colonna della $y$ metto i termini noti
~ x = \dfrac{-14}{-7} = 2 \qquad y = \dfrac{-7}{-7} = 1 :: divido per $D$

Verifica: $2 + 2 \cdot 1 = 4$ ✓ e $3 \cdot 2 - 1 = 5$ ✓. Cramer conviene quando i coefficienti sono scomodi per gli altri metodi.

?? Nel sistema $\begin{cases} 2x + y = 5 \\ x + 3y = 5 \end{cases}$, quanto vale $D$?
[x] $5$
[ ] $7$
[ ] $-5$
=> $D = 2 \cdot 3 - 1 \cdot 1 = 5$. Chi trova $7$ ha sommato i due prodotti. Chi trova $-5$ ha sottratto al contrario.

>! In $D_x$ i termini noti vanno nella colonna della $x$. In $D_y$ vanno nella colonna della $y$.` },

    { id: 'discussione', titolo: 'Sistemi determinati, impossibili e indeterminati', testo: R`Un sistema può avere una soluzione, nessuna oppure infinite.

>* Un sistema è **determinato** se ha una sola soluzione. È **impossibile** se non ne ha. È **indeterminato** se ne ha infinite.

Con i determinanti lo capisci subito:

| $D$ | $D_x$, $D_y$ | sistema |
|---|---|---|
| $\ne 0$ | qualsiasi | determinato: un'unica soluzione |
| $=0$ | almeno uno $\ne 0$ | impossibile: nessuna soluzione |
| $=0$ | entrambi $=0$ | indeterminato: infinite soluzioni |

Puoi anche confrontare i **rapporti** fra i coefficienti delle due equazioni. Serve che i coefficienti della seconda non siano zero.

| rapporti | sistema |
|---|---|
| $\frac{a_1}{a_2} \ne \frac{b_1}{b_2}$ | determinato |
| $\frac{a_1}{a_2} = \frac{b_1}{b_2} \ne \frac{c_1}{c_2}$ | impossibile |
| $\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}$ | indeterminato |

Esempio: $\begin{cases} 2x + 3y = 6 \\ 4x + 6y = 15 \end{cases}$. I rapporti $\frac{2}{4}$ e $\frac{3}{6}$ valgono $\frac{1}{2}$. Ma $\frac{6}{15} = \frac{2}{5}$. Il sistema è impossibile.

Il motivo: raddoppia la prima equazione e ottieni $4x + 6y = 12$. La seconda vuole che la stessa somma valga $15$.

In un sistema indeterminato, un'equazione è un multiplo dell'altra. In pratica sono la stessa equazione.

?? Com'è il sistema $\begin{cases} x - 2y = 3 \\ -2x + 4y = -6 \end{cases}$?
[ ] determinato
[ ] impossibile
[x] indeterminato
=> I rapporti $\frac{1}{-2}$, $\frac{-2}{4}$ e $\frac{3}{-6}$ valgono tutti $-\frac{1}{2}$. La seconda equazione è la prima per $-2$: infinite soluzioni. Chi risponde «impossibile» non ha controllato i termini noti.

>! «Impossibile» non vuol dire che hai sbagliato i conti. Vuol dire che nessuna coppia rende vere le due equazioni insieme.` },

    { id: 'interpretazione-grafica', titolo: 'Interpretazione grafica: rette incidenti, parallele, coincidenti', testo: R`L'equazione $x + y = 5$ da sola ha infinite soluzioni: $(5;\,0)$, $(4;\,1)$, $(3;\,2)$… Nel piano cartesiano stanno tutte su una **retta**.

[[video:sistemi-lineari/due-rette]]

Ogni equazione di primo grado in $x$ e $y$ è una retta. La soluzione del sistema è il punto in cui le due rette si incontrano.

Nel grafico la retta $r$ è $x + y = 5$ e resta ferma. La retta $s$ passa per $A$ e $B$: trascinali. All'inizio $s$ è $x - y = 1$, e le rette si incontrano in $P(3;\,2)$.

In alto leggi $D$, $D_x$ e $D_y$. All'inizio $D = -10$, perché il grafico usa $x - y = 1$ moltiplicata per $5$. Conta solo se $D$ vale zero o no.

[[grafico:sistemaRette]]

Prova a far sparire $P$. Ci sono due modi, e in tutti e due $D$ diventa $0$.

| rette | punti in comune | sistema |
|---|---|---|
| incidenti | uno | determinato |
| parallele e distinte | nessuno | impossibile |
| coincidenti | tutti | indeterminato |

Guarda i numeri in alto. Finché le rette si incontrano, $D \ne 0$. Quando sono parallele, $D = 0$ ma $D_x$ e $D_y$ non sono entrambi zero. Quando coincidono, $D = D_x = D_y = 0$.

Con le rette nella forma $y = mx + q$, confronta la pendenza $m$ e il valore di $q$:

- $m$ diversi: rette incidenti;
- $m$ uguali e $q$ diversi: rette parallele;
- $m$ e $q$ uguali: rette coincidenti.

>* Determinato: rette incidenti. Impossibile: rette parallele distinte. Indeterminato: rette coincidenti.

?? Che sistema formano le rette $y = -x + 4$ e $y = -x - 2$?
[ ] determinato
[x] impossibile
[ ] indeterminato
=> Stessa pendenza, $m = -1$, ma $q$ diversi. Le rette sono parallele e non si incontrano. «Indeterminato» vorrebbe anche lo stesso $q$.

>! Rette con pendenze diverse si incontrano sempre, anche se sono quasi parallele. Il punto può essere lontano, fuori dal disegno.` },

    { id: 'tre-incognite', titolo: 'Sistemi a tre incognite', testo: R`Con tre incognite, $x$, $y$ e $z$, servono in generale tre equazioni:

$$\begin{cases} a_1x + b_1y + c_1z = d_1 \\ a_2x + b_2y + c_2z = d_2 \\ a_3x + b_3y + c_3z = d_3 \end{cases}$$

L'idea è quella della riduzione: elimini le incognite una alla volta.

>* **Strategia.** Elimina la **stessa** incognita da due coppie di equazioni. Resta un sistema con due incognite, che sai risolvere. Poi trova la terza.

~ \begin{cases} x + y + z = 9 \\ x - y + z = 3 \\ x + y - z = 1 \end{cases} :: tre equazioni, tre incognite
~ \evid{2y = 6} :: prima meno seconda: $(x + y + z) - (x - y + z) = 9 - 3$, e se ne vanno $x$ e $z$
~ \evid{2z = 8} :: prima meno terza: $(x + y + z) - (x + y - z) = 9 - 1$, e se ne vanno $x$ e $y$
~ y = \evidb{3} \qquad z = \evidb{4} :: divido per $2$
~ x + 3 + 4 = 9 \;\Rightarrow\; x = \evidb{2} :: rimetto $y$ e $z$ nella prima equazione

Verifica: $2 - 3 + 4 = 3$ ✓ e $2 + 3 - 4 = 1$ ✓. Qui ogni sottrazione ha eliminato due incognite insieme, perché i coefficienti erano comodi. Il procedimento si chiama **eliminazione**.

?? Un sistema ha tre incognite ma solo due equazioni. Che cosa ti aspetti, di solito?
[ ] una sola soluzione
[x] infinite soluzioni
[ ] nessuna soluzione, sempre
=> Un'incognita resta «libera». Per ogni valore che le dai trovi le altre due: le soluzioni sono infinite. A volte il sistema è impossibile, ma non sempre.

>! Quando sottrai due equazioni, sottrai **ogni** termine, anche il termine noto. Metti la seconda equazione tra parentesi.` },

    { id: 'problemi', titolo: 'Problemi con due incognite', testo: R`Un problema chiede **due** quantità e dà **due** informazioni? Usa due incognite, una per quantità.

1. Scegli le due incognite e scrivi che cosa sono.
2. Traduci ogni informazione in un'equazione.
3. Risolvi il sistema con il metodo più comodo.
4. Controlla che la soluzione abbia senso: interi se conti oggetti, positivi se sono prezzi.

>* In un problema, ogni informazione del testo diventa un'equazione del sistema.

In un parcheggio ci sono auto (4 ruote) e moto (2 ruote). In tutto sono 15 veicoli e 50 ruote. Chiamo $x$ le auto e $y$ le moto.

~ \begin{cases} x + y = 15 \\ 4x + 2y = 50 \end{cases} :: la prima conta i veicoli, la seconda le ruote
~ \begin{cases} \evid{y = 15 - x} \\ 4x + 2\evid{(15 - x)} = 50 \end{cases} :: ricavo $y$ dalla prima e lo sostituisco nella seconda
~ 2x + 30 = 50 \;\Rightarrow\; x = \evidb{10} :: risolvo l'equazione in $x$
~ y = 15 - 10 = \evidb{5} :: torno a $y = 15 - x$

Dieci auto e cinque moto: interi e positivi, come deve essere. Verifica: $10 + 5 = 15$ veicoli e $40 + 10 = 50$ ruote ✓.

?? «Un intero costa 8 €, un ridotto 5 €. Venduti 40 biglietti per 260 €.» Con $x$ interi e $y$ ridotti, quale sistema scrivi?
[x] $x + y = 40$ e $8x + 5y = 260$
[ ] $x + y = 260$ e $8x + 5y = 40$
[ ] $x + y = 40$ e $5x + 8y = 260$
=> Un'equazione conta i biglietti, l'altra gli euro. Ne vengono $x = 20$ e $y = 20$. Chi scrive $x + y = 260$ ha mescolato biglietti ed euro.

>! Una soluzione senza senso nel problema va scartata, dicendo perché. Per esempio, un numero negativo di persone.` }
  ],

  /* sistemaRette: r è x + y = 5; s passa per A(xA; yA) e B(xB; yB), quindi in forma normale è
     (yB − yA)x + (xA − xB)y = (yB − yA)xA + (xA − xB)yA. D, Dx, Dy sono quelli di Cramer per il
     sistema r–s; con D = 0 le coordinate di P non sono numeri e il punto non si disegna. */
  grafici: {
    sistemaRette: {
      tipo: 'piano', x: [-4, 8], y: [-5, 8], passo: [1, 1], proporzioni: 'uguali',
      parametri: [
        { nome: 'xA', min: -4, max: 8, passo: 1, valore: 0, nascosto: true },
        { nome: 'yA', min: -5, max: 8, passo: 1, valore: -1, nascosto: true },
        { nome: 'xB', min: -4, max: 8, passo: 1, valore: 5, nascosto: true },
        { nome: 'yB', min: -5, max: 8, passo: 1, valore: 4, nascosto: true }
      ],
      elementi: [
        { tipo: 'retta', m: -1, q: 5, etichetta: 'r', colore: 1 },
        { tipo: 'retta', per: [['xA', 'yA'], ['xB', 'yB']], etichetta: 's', colore: 2 },
        { tipo: 'punto',
          p: ['(5*(xA - xB) - ((yB - yA)*xA + (xA - xB)*yA)) / ((xA - xB) - (yB - yA))',
              '(((yB - yA)*xA + (xA - xB)*yA) - 5*(yB - yA)) / ((xA - xB) - (yB - yA))'],
          etichetta: 'P({{(5*(xA - xB) - ((yB - yA)*xA + (xA - xB)*yA)) / ((xA - xB) - (yB - yA))}}; {{(((yB - yA)*xA + (xA - xB)*yA) - 5*(yB - yA)) / ((xA - xB) - (yB - yA))}})',
          posizione: 'alto-destra', colore: 4 },
        { tipo: 'punto', p: ['xA', 'yA'], trascina: true, etichetta: 'A', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: ['xB', 'yB'], trascina: true, etichetta: 'B', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [0.4, 7.3], testo: 'D = {{(xA - xB) - (yB - yA)}}    Dx = {{5*(xA - xB) - ((yB - yA)*xA + (xA - xB)*yA)}}    Dy = {{((yB - yA)*xA + (xA - xB)*yA) - 5*(yB - yA)}}', ancora: 'start' }
      ],
      didascalia: 'r è la retta x + y = 5. Trascina A e B per muovere la retta s: riesci a far sparire il punto P? Guarda che cosa fanno D, Dx e Dy quando ci riesci.'
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
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} x + y = 7 \\ x - y = 1 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`La $y$ ha coefficienti opposti: somma le due equazioni.`], risposta: cop(4, 3), soluzione: [R`Sommo le equazioni: $2x = 8$, quindi $x = 4$.`, R`Nella prima: $4 + y = 7$, quindi $y = 3$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} y = 2x \\ x + y = 9 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`Nella seconda scrivi $2x$ al posto di $y$.`], risposta: cop(3, 6), soluzione: [R`Sostituisco: $x + 2x = 9$, cioè $3x = 9$, quindi $x = 3$.`, R`$y = 2 \cdot 3 = 6$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} x = 3 \\ 2x + y = 10 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`$x$ lo conosci già: mettilo nella seconda equazione.`], risposta: cop(3, 4), soluzione: [R`Metto $x = 3$ nella seconda: $6 + y = 10$.`, R`$y = 4$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} x + y = 5 \\ x - y = -1 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`Somma le due equazioni: la $y$ sparisce.`], risposta: cop(2, 3), soluzione: [R`Sommo le equazioni: $2x = 4$, quindi $x = 2$.`, R`Nella prima: $2 + y = 5$, quindi $y = 3$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} y = x + 2 \\ x + y = 8 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`Nella seconda scrivi $x + 2$ al posto di $y$.`], risposta: cop(3, 5), soluzione: [R`Sostituisco: $x + x + 2 = 8$, cioè $2x = 6$, quindi $x = 3$.`, R`$y = 3 + 2 = 5$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} 2x + y = 8 \\ x - y = 1 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`La $y$ ha coefficienti opposti: somma le due equazioni.`], risposta: cop(3, 2), soluzione: [R`Sommo le equazioni: $3x = 9$, quindi $x = 3$.`, R`Nella seconda: $3 - y = 1$, quindi $y = 2$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} x + 2y = 9 \\ x - y = 3 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`La $x$ ha coefficiente $1$ in tutte e due: sottrai le equazioni.`], risposta: cop(5, 2), soluzione: [R`Sottraggo la seconda dalla prima: $3y = 6$, quindi $y = 2$.`, R`Nella seconda: $x - 2 = 3$, quindi $x = 5$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} y = 3x - 1 \\ y = x + 5 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`Tutte e due danno $y$: uguaglia le due espressioni.`], risposta: cop(3, 8), soluzione: [R`Uguaglio: $3x - 1 = x + 5$.`, R`$2x = 6$, quindi $x = 3$.`, R`$y = 3 + 5 = 8$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} 3x + y = 5 \\ 2x - y = 5 \end{cases}$. Scrivi la soluzione come *x; y*.`, suggerimenti: [R`La $y$ ha coefficienti opposti: somma le due equazioni.`], risposta: cop(2, -1), soluzione: [R`Sommo le equazioni: $5x = 10$, quindi $x = 2$.`, R`Nella prima: $6 + y = 5$, quindi $y = -1$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Risolvi $\begin{cases} x - 2y = 1 \\ 3x + y = 10 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Dalla prima ricava $x = 1 + 2y$.`, R`Sostituiscilo nella seconda.`], risposta: cop(3, 1), soluzione: [R`Dalla prima: $x = 1 + 2y$.`, R`Sostituisco: $3(1 + 2y) + y = 10$, cioè $3 + 7y = 10$, quindi $y = 1$.`, R`$x = 1 + 2 = 3$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 2x + 3y = 7 \\ x - y = 1 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Dalla seconda ricava $x = 1 + y$.`, R`Sostituiscilo nella prima.`], risposta: cop(2, 1), soluzione: [R`Dalla seconda: $x = 1 + y$.`, R`Sostituisco: $2(1 + y) + 3y = 7$, cioè $2 + 5y = 7$, quindi $y = 1$.`, R`$x = 1 + 1 = 2$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} x + y = 4 \\ 2x + 2y = 5 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Moltiplica la prima per $2$ e confrontala con la seconda.`], risposta: IMPOSSIBILE, soluzione: [R`La prima per $2$: $2x + 2y = 8$.`, R`La seconda vuole $2x + 2y = 5$. La stessa somma non può valere $8$ e $5$.`, R`Il sistema è impossibile.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 2x + y = 1 \\ 3x + 2y = 3 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Dalla prima ricava $y = 1 - 2x$.`, R`Sostituiscilo nella seconda.`], risposta: cop(-1, 3), soluzione: [R`Dalla prima: $y = 1 - 2x$.`, R`Sostituisco: $3x + 2(1 - 2x) = 3$, cioè $2 - x = 3$, quindi $x = -1$.`, R`$y = 1 - 2 \cdot (-1) = 3$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} x - y = 2 \\ 2x - 2y = 4 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Moltiplica la prima per $2$ e confrontala con la seconda.`], risposta: INDETERMINATO, soluzione: [R`La prima per $2$: $2x - 2y = 4$. È proprio la seconda.`, R`Le due equazioni sono la stessa: il sistema è indeterminato.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 3x + 2y = 1 \\ x - y = 2 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Dalla seconda ricava $x = 2 + y$.`, R`Sostituiscilo nella prima.`], risposta: cop(1, -1), soluzione: [R`Dalla seconda: $x = 2 + y$.`, R`Sostituisco: $3(2 + y) + 2y = 1$, cioè $6 + 5y = 1$, quindi $y = -1$.`, R`$x = 2 - 1 = 1$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 2x + 3y = 4 \\ 3x - y = 17 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Dalla seconda ricava $y = 3x - 17$.`, R`Sostituiscilo nella prima.`], risposta: cop(5, -2), soluzione: [R`Dalla seconda: $y = 3x - 17$.`, R`Sostituisco: $2x + 3(3x - 17) = 4$, cioè $11x - 51 = 4$, quindi $x = 5$.`, R`$y = 15 - 17 = -2$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} y = 2x + 1 \\ y = 2x - 3 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Tutte e due danno $y$: uguaglia le due espressioni.`], risposta: IMPOSSIBILE, soluzione: [R`Uguaglio: $2x + 1 = 2x - 3$.`, R`Le $x$ spariscono e resta $1 = -3$, che è falso.`, R`Il sistema è impossibile: le due rette sono parallele.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 3(x - 1) + y = 5 \\ x - y = 4 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Togli la parentesi: la prima diventa $3x + y = 8$.`, R`Ora la $y$ ha coefficienti opposti.`], risposta: cop(3, -1), soluzione: [R`Tolgo la parentesi: $3x - 3 + y = 5$, cioè $3x + y = 8$.`, R`Sommo con la seconda: $4x = 12$, quindi $x = 3$.`, R`Nella seconda: $3 - y = 4$, quindi $y = -1$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 3x - y = 2 \\ 6x - 2y = 4 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Moltiplica la prima per $2$ e confrontala con la seconda.`], risposta: INDETERMINATO, soluzione: [R`La prima per $2$: $6x - 2y = 4$. È proprio la seconda.`, R`Le due equazioni sono la stessa: il sistema è indeterminato.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Risolvi $\begin{cases} 3x + 2y = 7 \\ 2x + 3y = 8 \end{cases}$. Scrivi *x; y*, oppure *impossibile* o *indeterminato*.`, suggerimenti: [R`Moltiplica la prima per $3$ e la seconda per $2$.`, R`Ora la $y$ ha coefficiente $6$ in tutte e due: sottrai.`], risposta: cop(1, 2), soluzione: [R`Prima per $3$, seconda per $2$: $9x + 6y = 21$ e $4x + 6y = 16$.`, R`Sottraggo: $5x = 5$, quindi $x = 1$.`, R`Nella prima: $3 + 2y = 7$, quindi $y = 2$.`] },
    { id: 'es-01', difficolta: 1, testo: R`Risolvi il sistema $\begin{cases} x+y=8 \\ x-y=2 \end{cases}$ con il metodo di sostituzione. Scrivi la soluzione come «x; y».`, suggerimenti: [R`Isola una delle due incognite in una delle equazioni.`, R`Dalla prima equazione, $y=8-x$: sostituiscila nella seconda.`], risposta: { tipo: 'numeri', ordinati: true, valori: [5, 3] }, soluzione: [R`Dalla prima equazione, $y=8-x$.`, R`Sostituendo nella seconda: $x-(8-x)=2$, cioè $2x-8=2$, da cui $x=5$.`, R`Allora $y=8-5=3$.`, R`Verifica: $5+3=8$ ✓ e $5-3=2$ ✓.`] },
    { id: 'es-02', difficolta: 1, testo: R`Risolvi il sistema $\begin{cases} 2x+y=9 \\ x-y=3 \end{cases}$ con il metodo di riduzione. Scrivi la soluzione come «x; y».`, suggerimenti: [R`I coefficienti di $y$ sono già opposti: prova a sommare le due equazioni.`, R`Sommando ottieni un'equazione nella sola $x$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [4, 1] }, soluzione: [R`I coefficienti di $y$ sono $+1$ e $-1$: sommo le due equazioni.`, R`$(2x+y)+(x-y)=9+3$, cioè $3x=12$, da cui $x=4$.`, R`Sostituisco in $x-y=3$: $4-y=3$, quindi $y=1$.`, R`Verifica: $2\cdot 4+1=9$ ✓.`] },
    { id: 'es-03', difficolta: 1, testo: R`Risolvi il sistema $\begin{cases} y=3x-2 \\ y=-2x+8 \end{cases}$ con il metodo del confronto. Scrivi la soluzione come «x; y».`, suggerimenti: [R`$y$ è già isolata in entrambe le equazioni: eguaglia i due secondi membri.`], risposta: { tipo: 'numeri', ordinati: true, valori: [2, 4] }, soluzione: [R`Eguaglio: $3x-2=-2x+8$.`, R`$5x=10$, quindi $x=2$.`, R`$y=3\cdot 2-2=4$.`, R`Verifica nell'altra: $y=-2\cdot 2+8=4$ ✓.`] },
    { id: 'es-04', difficolta: 1, testo: R`Le rette $r: y=2x-3$ e $s: y=2x+1$ hanno lo stesso coefficiente angolare ma ordinate all'origine diverse. Il sistema che le rappresenta è determinato, impossibile o indeterminato?`, suggerimenti: [R`Confronta i coefficienti angolari $m$ e le ordinate all'origine $q$ delle due rette.`, R`Stesso $m$ ma $q$ diverso: le rette sono parallele e distinte.`], risposta: { tipo: 'testo', accettate: ['impossibile', 'nessuna soluzione', 'nessuna', 'parallele e distinte', 'parallele'] }, soluzione: [R`$m_r=m_s=2$ ma $q_r=-3\ne q_s=1$: le rette sono parallele e distinte.`, R`Rette parallele e distinte non hanno punti in comune: il sistema è impossibile.`] },
    { id: 'es-05', difficolta: 2, testo: R`Risolvi con la regola di Cramer il sistema $\begin{cases} 3x-2y=4 \\ x+y=3 \end{cases}$. Scrivi la soluzione come «x; y».`, suggerimenti: [R`Calcola prima $D$, poi $D_x$ e $D_y$.`, R`$D=3\cdot 1-(-2)\cdot 1$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [2, 1] }, soluzione: [R`$D=\begin{vmatrix} 3 & -2 \\ 1 & 1 \end{vmatrix}=3\cdot 1-(-2)\cdot 1=5$.`, R`$D_x=\begin{vmatrix} 4 & -2 \\ 3 & 1 \end{vmatrix}=4\cdot 1-(-2)\cdot 3=10$, quindi $x=\dfrac{10}{5}=2$.`, R`$D_y=\begin{vmatrix} 3 & 4 \\ 1 & 3 \end{vmatrix}=3\cdot 3-4\cdot 1=5$, quindi $y=\dfrac{5}{5}=1$.`, R`Verifica: $3\cdot 2-2\cdot 1=4$ ✓ e $2+1=3$ ✓.`] },
    { id: 'es-06', difficolta: 2, testo: R`Per quale valore di $k$ il sistema $\begin{cases} kx+2y=4 \\ x+y=3 \end{cases}$ è impossibile?`, suggerimenti: [R`Un sistema è impossibile quando $\dfrac{a_1}{a_2}=\dfrac{b_1}{b_2}\ne\dfrac{c_1}{c_2}$.`, R`Imponi $\dfrac{k}{1}=\dfrac{2}{1}$ e controlla che $\dfrac{4}{3}$ sia diverso da quel rapporto.`], risposta: { tipo: 'numero', valore: 2 }, soluzione: [R`Il sistema è impossibile se $\dfrac{k}{1}=\dfrac{2}{1}$ ma $\dfrac{4}{3}\ne\dfrac{2}{1}$.`, R`Da $\dfrac{k}{1}=2$ si ha $k=2$; e $\dfrac{4}{3}\ne 2$: la condizione è soddisfatta.`, R`Verifica: con $k=2$ la prima equazione diventa $2x+2y=4$, cioè $x+y=2$, in contraddizione con $x+y=3$: nessuna coppia può soddisfare entrambe.`] },
    { id: 'es-07', difficolta: 2, testo: R`Per quale valore di $k$ il sistema $\begin{cases} x+2y=5 \\ kx-4y=-10 \end{cases}$ è indeterminato?`, suggerimenti: [R`Un sistema è indeterminato quando le due equazioni rappresentano la stessa retta.`, R`Confronta i rapporti $\dfrac{1}{k}$, $\dfrac{2}{-4}$ e $\dfrac{5}{-10}$: gli ultimi due sono già uguali fra loro.`], risposta: { tipo: 'numero', valore: -2 }, soluzione: [R`$\dfrac{2}{-4}=\dfrac{5}{-10}=-\dfrac{1}{2}$: questi due rapporti coincidono già, per ogni $k$.`, R`Serve anche $\dfrac{1}{k}=-\dfrac{1}{2}$, cioè $k=-2$.`, R`Verifica: con $k=-2$ la seconda equazione diventa $-2x-4y=-10$, cioè $x+2y=5$: è la stessa equazione della prima. Le soluzioni sono infinite.`] },
    { id: 'es-08', difficolta: 2, testo: R`In una tavola calda, 2 panini e 3 bibite costano $9$ €; 4 panini e 1 bibita costano $13$ €. Quanto costa un panino? Quanto una bibita? Scrivi la soluzione come «panino; bibita».`, suggerimenti: [R`Chiama $x$ il prezzo di un panino e $y$ quello di una bibita: scrivi le due equazioni.`, R`Dalla seconda equazione isola $y$ e sostituisci nella prima.`], risposta: { tipo: 'numeri', ordinati: true, valori: [3, 1] }, soluzione: [R`$2x+3y=9$ e $4x+y=13$.`, R`Dalla seconda, $y=13-4x$; sostituendo nella prima: $2x+3(13-4x)=9$, cioè $2x+39-12x=9$, da cui $-10x=-30$, $x=3$.`, R`$y=13-4\cdot 3=1$.`, R`Verifica: $2\cdot 3+3\cdot 1=9$ ✓ e $4\cdot 3+1=13$ ✓. Un panino costa $3$ € e una bibita $1$ €.`] },
    { id: 'es-09', difficolta: 3, testo: R`Risolvi il sistema a tre incognite $\begin{cases} x+y+z=9 \\ x-y+z=3 \\ x+y-z=1 \end{cases}$. Scrivi la soluzione come «x; y; z».`, suggerimenti: [R`Sottrai a coppie le equazioni per eliminare due incognite alla volta.`, R`Sottraendo la seconda dalla prima elimini $x$ e $z$ insieme: trovi $y$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [2, 3, 4] }, soluzione: [R`Prima meno seconda: $2y=6$, quindi $y=3$.`, R`Prima meno terza: $2z=8$, quindi $z=4$.`, R`Sostituendo nella prima: $x+3+4=9$, quindi $x=2$.`, R`Verifica nella seconda: $2-3+4=3$ ✓; nella terza: $2+3-4=1$ ✓.`] },
    { id: 'es-10', difficolta: 3, testo: R`Un padre ha il triplo dell'età del figlio. Tra 12 anni ne avrà il doppio. Quanti anni hanno oggi? Scrivi la soluzione come «padre; figlio».`, suggerimenti: [R`Chiama $p$ l'età del padre e $f$ quella del figlio: la prima frase dà $p=3f$.`, R`La seconda frase dà $p+12=2(f+12)$: sostituisci $p=3f$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [36, 12] }, soluzione: [R`$p=3f$ e $p+12=2(f+12)$.`, R`Sostituendo: $3f+12=2f+24$, quindi $f=12$.`, R`$p=3\cdot 12=36$.`, R`Verifica: tra 12 anni, $p+12=48$ e $f+12=24$, e $48=2\cdot 24$ ✓.`] }
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
