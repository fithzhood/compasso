(function () {
const R = String.raw;
/* allenamento: vertice (x; y) in ordine, ascisse delle intersezioni con l'asse x (ordine libero, o «nessuna»),
   equazione dell'asse, concavità a parole */
const cop = (x, y) => ({ tipo: 'numeri', valori: [x, y], ordinati: true, segnaposto: 'es. 2; -1' });
const SEGNA_Z = 'es. -1; 3 o nessuna';
const zeri = (...v) => ({ tipo: 'numeri', valori: v, segnaposto: SEGNA_Z });
const nessuna = { tipo: 'testo', accettate: ['nessuna', 'nessuno', 'nessun punto', 'nessuna soluzione', 'non la taglia', 'impossibile', '∅', 'ø', '{}', 'insieme vuoto'], segnaposto: SEGNA_Z };
const doppia = v => ({ tipo: 'testo', accettate: [v, v + ';' + v, v + ',' + v, v + ' doppia', v + ' (doppia)', 'x1=x2=' + v, 'x₁=x₂=' + v], segnaposto: SEGNA_Z });
/* l'asse è una retta: la casella vuole «x = 3» intero (con una risposta x = k non toglie «x=»), come mostra il segnaposto */
const asse = v => ({ tipo: 'testo', accettate: ['x=' + v], segnaposto: 'es. x = 1', simboli: ['x', '=', '−', '/'] });
const PAROLE = { segnaposto: "verso l'alto o verso il basso", simboli: [] };
/* anche con l'apostrofo tipografico ’ che mettono alcune tastiere del telefono: la casella toglie solo quello dritto */
const apostrofi = r => { r.accettate = r.accettate.concat(r.accettate.filter(a => a.includes("'")).map(a => a.replace(/'/g, '’'))); return r; };
const ALTO = apostrofi(Object.assign({ tipo: 'testo', accettate: ["verso l'alto", 'alto', 'in alto', 'verso alto', 'su', 'verso su', "all'insù", "all'in su", "rivolta verso l'alto", "concavità verso l'alto", "concava verso l'alto", '↑'] }, PAROLE));
const BASSO = apostrofi(Object.assign({ tipo: 'testo', accettate: ['verso il basso', 'basso', 'in basso', 'verso basso', 'giù', 'verso giù', "all'ingiù", "all'in giù", 'rivolta verso il basso', 'concavità verso il basso', 'concava verso il basso', '↓'] }, PAROLE));
COMPASSO.registra({
  id: 'parabola',
  titolo: 'La parabola',

  introduzione: R`Calcia un pallone in aria: sale, rallenta, si ferma nel punto più alto e ridiscende allo stesso modo. La curva che disegna è una **parabola**. La stessa forma hanno le antenne satellitari e gli specchi dei fari.

Nel piano cartesiano la parabola con asse verticale ha equazione $y = ax^2 + bx + c$, con $a \ne 0$. Qui impari a leggerla: dove sta il vertice, verso dove è rivolta, dove taglia gli assi e una retta. Poi impari a trovarne l'equazione.

Servono le equazioni di secondo grado e il piano cartesiano.`,

  inBreve: [
    R`I punti della parabola hanno la stessa distanza da un punto, il fuoco, e da una retta, la direttrice. Il vertice sta a metà strada fra i due.`,
    R`In $y = ax^2 + bx + c$ il segno di $a$ dice se la parabola è rivolta verso l'alto o verso il basso. La grandezza di $a$ dice quanto è stretta. La parabola taglia l'asse $y$ in $(0; c)$.`,
    R`Il vertice ha ascissa $x_V = -\dfrac{b}{2a}$. Per l'ordinata metti $x_V$ nell'equazione.`,
    R`Per sapere se una retta taglia, tocca o manca la parabola, metti a sistema le due equazioni. Poi guarda il $\Delta$ dell'equazione che ottieni: positivo, nullo o negativo.`,
    R`Per scrivere l'equazione servono tre condizioni. Se conosci il vertice, parti da $y = a(x - x_V)^2 + y_V$.`
  ],

  sezioni: [
    { id: 'definizione-luogo', titolo: 'La parabola come luogo geometrico', testo: R`Prendi un punto $F$ e una retta $d$ che non passa per $F$. Cerca i punti che distano da $F$ quanto distano da $d$. Il punto a metà strada fra $F$ e $d$ è uno di questi. Spostandoti di lato ne trovi altri, e insieme formano la parabola.

>* **Definizione.** La parabola di **fuoco** $F$ e **direttrice** $d$ è l'insieme dei punti $P$ con $$PF = PH$$ dove $H$ è il piede della perpendicolare da $P$ a $d$. Ogni punto della parabola ha la stessa distanza dal fuoco e dalla direttrice.

La retta per $F$ perpendicolare a $d$ è l'**asse** della parabola, e la curva è simmetrica rispetto all'asse. Sull'asse, a metà strada fra fuoco e direttrice, c'è il **vertice** $V$.

[[animazione:parabola-luogo]]

?? Il fuoco è $F(0; 2)$ e la direttrice è $y = -2$. Quale di questi punti sta sulla parabola?
[x] $(4; 2)$
[ ] $(2; 2)$
[ ] $(0; 2)$
=> $(4; 2)$ dista $4$ da $F$ e $4$ dalla direttrice. $(2; 2)$ dista $2$ da $F$ ma $4$ dalla direttrice. $(0; 2)$ è il fuoco stesso: il fuoco sta dentro la parabola, non sopra.

>! La distanza di un punto da una retta si misura sempre in **perpendicolare**.` },

    { id: 'equazione-canonica', titolo: 'Dalla definizione all\'equazione: il caso y = ax²', testo: R`Dalla definizione ricavi l'equazione. Metti il vertice nell'origine e l'asse sull'asse $y$. Allora il fuoco è $F(0; p)$ e la direttrice è $y = -p$. Il numero $p$ è la distanza fra vertice e fuoco, negativa se il fuoco sta sotto.

Un punto $P(x; y)$ sta sulla parabola quando $PF$ è uguale alla distanza dalla direttrice, cioè a $|y + p|$.

~ \sqrt{x^2 + (y - p)^2} = |y + p| :: a sinistra la distanza da $F$ (formula della distanza fra due punti), a destra quella da $y = -p$
~ x^2 + \evid{y^2 - 2py + p^2} = \evid{y^2 + 2py + p^2} :: elevo al quadrato: sono due numeri non negativi, quindi non nascono soluzioni estranee
~ x^2 = \evid{4py} :: tolgo $y^2$ e $p^2$ da entrambi i membri e porto $-2py$ a destra
~ y = \evidb{\dfrac{x^2}{4p}} :: divido per $4p$

>* **Forma canonica.** Con vertice nell'origine, fuoco $F(0; p)$ e direttrice $y = -p$: $$y = \dfrac{x^2}{4p}$$ cioè $y = ax^2$ con $a = \dfrac{1}{4p}$. Più il fuoco è vicino al vertice, più $a$ è grande e la parabola stretta.

[[grafico:luogoParabola]]

?? In quale punto sta il fuoco della parabola $y = \dfrac{x^2}{8}$?
[x] $(0; 2)$
[ ] $(0; 8)$
[ ] $\left(0; \dfrac{1}{2}\right)$
=> Confronta con $y = \dfrac{x^2}{4p}$: $4p = 8$, quindi $p = 2$ e il fuoco è $(0; 2)$. Il denominatore $8$ va diviso per $4$. $\dfrac{1}{2}$ viene da $p = 4a$ invece di $p = \dfrac{1}{4a}$.

Se il vertice non sta nell'origine, la curva si sposta. Sviluppando i conti arrivi alla forma generale $y = ax^2 + bx + c$, con $a \ne 0$.

>! Con $a = 0$ sparisce il termine $x^2$ e resta $y = bx + c$, che è una retta. Per questo serve $a \ne 0$.` },

    { id: 'significato-a-b-c', titolo: 'Il significato di a, b e c', testo: R`Nel grafico cambia un coefficiente alla volta e guarda la parabola $y = ax^2 + bx + c$.

[[grafico:coefficienti]]

**Il coefficiente $a$** decide la **concavità**, cioè verso dove è rivolta la parabola.

- $a > 0$: verso l'alto. Il vertice è il punto più basso, un **minimo**.
- $a < 0$: verso il basso. Il vertice è il punto più alto, un **massimo**.

La grandezza di $a$ decide l'**apertura**. In $x = 1$ le parabole $y = 3x^2$, $y = x^2$ e $y = 0{,}3x^2$ valgono $3$, $1$ e $0{,}3$. Più $a$ è lontano da zero, più la parabola è stretta.

**Il coefficiente $c$** dice dove la parabola taglia l'asse $y$. Con $x = 0$ resta $y = c$, quindi la parabola passa per $(0; c)$.

**Il coefficiente $b$** sposta il vertice di lato e in su o in giù. La forma resta la stessa, e la curva passa sempre per $(0; c)$.

>* $a$: verso dove è rivolta e quanto è stretta. $c$: dove taglia l'asse $y$. $b$ insieme ad $a$: dove sta il vertice.

?? In quale punto la parabola $y = 2x^2 - 3x - 5$ taglia l'asse $y$?
[x] $(0; -5)$
[ ] $(-5; 0)$
[ ] $(0; 2)$
=> Sull'asse $y$ si ha $x = 0$, e resta $y = -5$. $(-5; 0)$ ha le coordinate scambiate: è un punto dell'asse $x$. $2$ è il coefficiente $a$, che dice quanto è stretta la parabola.` },

    { id: 'vertice-asse-fuoco-direttrice', titolo: 'Vertice, asse, fuoco e direttrice', testo: R`La parabola è simmetrica rispetto al suo asse. Se taglia l'asse $x$ in due punti, il vertice sta a metà fra loro. La somma delle soluzioni di $ax^2 + bx + c = 0$ è $-\dfrac{b}{a}$, quindi la loro media è $-\dfrac{b}{2a}$. Questa formula vale anche quando la parabola non taglia l'asse $x$.

>* **Vertice e asse.** $$x_V = -\frac{b}{2a} \qquad y_V = -\frac{\Delta}{4a}$$ con $\Delta = b^2 - 4ac$. L'asse è la retta verticale $x = -\dfrac{b}{2a}$. Per trovare $y_V$ puoi anche mettere $x_V$ nell'equazione.

Fuoco e direttrice stanno da parti opposte rispetto al vertice, alla distanza $\left|\dfrac{1}{4a}\right|$.

>* **Fuoco e direttrice.** $$F\left(-\frac{b}{2a};\ \frac{1 - \Delta}{4a}\right)$$ $$d:\ y = -\frac{1 + \Delta}{4a}$$

~ y = x^2 - 4x + 3 :: $a = 1$, $b = -4$, $c = 3$
~ x_V = -\dfrac{-4}{2 \cdot 1} = \evid{2} :: attento al segno: $b$ è negativo, quindi $-b$ è positivo
~ y_V = 2^2 - 4 \cdot 2 + 3 = \evid{-1} :: sostituisco $x_V$ nell'equazione: $V(2; -1)$
~ \Delta = 16 - 12 = 4 :: serve per fuoco e direttrice
~ F\left(2;\ \evidb{-\tfrac{3}{4}}\right), \quad d:\ y = \evidb{-\tfrac{5}{4}} :: $\dfrac{1 - 4}{4} = -\dfrac34$ e $-\dfrac{1 + 4}{4} = -\dfrac54$: tutti e due a distanza $\dfrac14$ dal vertice

?? Qual è il vertice della parabola $y = x^2 + 6x + 1$?
[x] $(-3; -8)$
[ ] $(3; 28)$
[ ] $(-6; 1)$
=> $x_V = -\dfrac{6}{2} = -3$ e $y_V = 9 - 18 + 1 = -8$. $(3; 28)$ viene dimenticando il meno davanti a $\dfrac{b}{2a}$. $(-6; 1)$ viene dimenticando il $2$ al denominatore.

>! Il fuoco sta **dentro** la parabola, dalla parte verso cui si apre. La direttrice sta fuori, dalla parte opposta.` },

    { id: 'asse-parallelo-x', titolo: 'La parabola con asse parallelo all\'asse x', testo: R`Scambia $x$ e $y$ nell'equazione: ottieni $x = ay^2 + by + c$, con $a \ne 0$. È la stessa parabola girata di un quarto di giro, con l'**asse orizzontale**. Se $a > 0$ si apre verso destra, se $a < 0$ verso sinistra.

Questa curva non è il grafico di una funzione $y = f(x)$. Una retta verticale può tagliarla in due punti, quindi a una $x$ corrispondono due $y$.

Le formule sono quelle di prima, con $x$ e $y$ scambiati:

| | asse verticale, $y = ax^2 + bx + c$ | asse orizzontale, $x = ay^2 + by + c$ |
|---|---|---|
| vertice | $\left(-\frac{b}{2a};\ -\frac{\Delta}{4a}\right)$ | $\left(-\frac{\Delta}{4a};\ -\frac{b}{2a}\right)$ |
| asse | $x = -\frac{b}{2a}$ | $y = -\frac{b}{2a}$ |
| fuoco | $\left(-\frac{b}{2a};\ \frac{1 - \Delta}{4a}\right)$ | $\left(\frac{1 - \Delta}{4a};\ -\frac{b}{2a}\right)$ |
| direttrice | $y = -\frac{1 + \Delta}{4a}$ | $x = -\frac{1 + \Delta}{4a}$ |

~ x = y^2 - 2y - 3 :: $a = 1$, $b = -2$, $c = -3$: la variabile al quadrato è la $y$
~ y_V = -\dfrac{-2}{2} = \evid{1} :: qui $-\dfrac{b}{2a}$ dà l'**ordinata** del vertice
~ x_V = 1 - 2 - 3 = \evid{-4} :: sostituisco $y = 1$ nell'equazione per avere l'ascissa
~ V(\evidb{-4};\ \evidb{1}) :: vertice; l'asse è la retta orizzontale $y = 1$

?? Verso dove si apre la parabola $x = -y^2 + 4$?
[x] verso sinistra
[ ] verso il basso
[ ] verso destra
=> La variabile al quadrato è $y$, quindi l'asse è orizzontale: la parabola si apre a destra o a sinistra. Il coefficiente di $y^2$ è $-1 < 0$, quindi verso sinistra. Infatti $x$ vale al massimo $4$, per $y = 0$.

>! Prima di usare le formule guarda **quale** variabile è al quadrato. In $x = ay^2 + by + c$ il numero $-\dfrac{b}{2a}$ è l'ordinata del vertice.` },

    { id: 'intersezioni-assi-rette', titolo: 'Intersezioni con gli assi e con una retta', testo: R`Dove la parabola $y = ax^2 + bx + c$ incontra gli assi?

- **Asse $y$**: metti $x = 0$ e resta $y = c$. Il punto è sempre uno solo, $(0; c)$.
- **Asse $x$**: metti $y = 0$ e risolvi $ax^2 + bx + c = 0$. Con $\Delta > 0$ trovi due punti, con $\Delta = 0$ uno solo, il vertice, e con $\Delta < 0$ nessuno.

Con una retta $y = mx + q$ fai lo stesso: metti a sistema le due equazioni e sostituisci la $y$. Ottieni un'equazione di secondo grado in $x$, e il suo $\Delta$ dice quanti punti ci sono.

>* **Retta e parabola.** Se $\Delta > 0$ la retta è **secante** e ha due punti in comune con la parabola. Se $\Delta = 0$ è **tangente**, con un punto solo. Se $\Delta < 0$ è **esterna**.

[[grafico:rettaParabola]]

~ y = x^2 - 4x + 3,\quad y = 2x + q :: parabola e retta, con $q$ che varia
~ x^2 - 4x + 3 = \evid{2x + q} :: al posto della $y$ della parabola metto quella della retta
~ x^2 - 6x + (3 - q) = 0 :: porto tutto a sinistra: equazione di secondo grado in $x$
~ \dfrac{\Delta}{4} = 9 - (3 - q) = \evid{6 + q} :: discriminante ridotto, perché il coefficiente di $x$ è pari
~ \evidb{q = -6} :: $6 + q = 0$: la retta è tangente; per $q > -6$ è secante, per $q < -6$ esterna

?? La retta $y = 5$ e la parabola $y = x^2 + 5$: secante, tangente o esterna?
=> Tangente. Sostituendo viene $x^2 + 5 = 5$, cioè $x^2 = 0$: una sola soluzione, $x = 0$. La retta tocca la parabola nel vertice $(0; 5)$.

>! Il $\Delta$ che conta è quello dell'equazione **dopo** la sostituzione. Il $\Delta$ della parabola da sola riguarda solo l'asse $x$.` },

    { id: 'tangenti-da-un-punto', titolo: 'Le rette tangenti condotte da un punto', testo: R`Da un punto $P$ fuori dalla parabola partono delle rette tangenti. Non conosci la loro pendenza, ma sai che passano per $P(x_0; y_0)$. Allora scrivile tutte insieme con il **fascio di rette** $y - y_0 = m(x - x_0)$. Poi cerca i valori di $m$ che danno una tangente.

~ y = x^2,\quad P(1; -3) :: cerco le tangenti alla parabola che passano per $P$
~ y = m(x - 1) - 3 :: fascio di rette per $P$: $m$ per ora è sconosciuto
~ x^2 = mx - m - 3 \Rightarrow x^2 - mx + (m + 3) = 0 :: sostituisco la retta nella parabola e porto tutto a sinistra
~ \Delta = m^2 - 4(m + 3) = \evid{m^2 - 4m - 12} :: il discriminante dipende da $m$
~ m^2 - 4m - 12 = 0 \Rightarrow m = \evid{6} \ \lor\ m = \evid{-2} :: tangente vuol dire $\Delta = 0$; due numeri con somma $4$ e prodotto $-12$
~ \evidb{y = 6x - 9} \quad \text{e} \quad \evidb{y = -2x - 1} :: rimetto ciascun $m$ nel fascio

I punti di tangenza sono $(3; 9)$ e $(-1; 1)$: con $\Delta = 0$ la soluzione doppia è $x = \dfrac{m}{2}$.

>* Quante tangenti passano per $P$? **Due** se $P$ sta fuori dalla parabola. **Una** se sta sulla parabola. **Nessuna** se sta dentro, dalla parte del fuoco.

?? Quante rette tangenti a $y = x^2$ passano per $P(2; 4)$?
[x] una
[ ] due
[ ] nessuna
=> $P$ sta sulla parabola, perché $2^2 = 4$. L'equazione per $m$ diventa $m^2 - 8m + 16 = 0$, cioè $(m - 4)^2 = 0$: un solo valore, $m = 4$.

>! Nella sezione precedente la pendenza era data e cercavi $q$. Qui conosci il punto e cerchi $m$: l'incognita del discriminante è $m$, non $x$.` },

    { id: 'determinare-equazione', titolo: 'Determinare l\'equazione di una parabola', testo: R`In $y = ax^2 + bx + c$ ci sono tre numeri da trovare, quindi servono **tre condizioni**. Ogni informazione sulla parabola diventa un'equazione in $a$, $b$, $c$.

### Tre punti
Metti ogni punto nell'equazione: ottieni un sistema in $a$, $b$, $c$. Un punto con ascissa $0$ dà subito $c$.

~ A(0; 1),\ B(1; 2),\ C(-1; 4) :: tre punti con ascisse diverse
~ \evid{c = 1} :: da $A$: con $x = 0$ resta solo $c$
~ a + b + 1 = 2 \Rightarrow a + b = 1 :: da $B$: $a \cdot 1^2 + b \cdot 1 + 1 = 2$
~ a - b + 1 = 4 \Rightarrow a - b = 3 :: da $C$: con $x = -1$ il termine $bx$ cambia segno
~ \evid{a = 2},\ \evid{b = -1} :: sommo le due equazioni: $2a = 4$
~ y = \evidb{2x^2 - x + 1} :: controllo con $C$: $2 + 1 + 1 = 4$

### Vertice e un punto
Parti dalla forma $y = a(x - x_V)^2 + y_V$, che contiene già il vertice. Poi usa il punto per trovare $a$.

~ V(-1; 4),\quad P(1; 0) :: vertice e un punto della parabola
~ y = a(x \evid{+ 1})^2 + 4 :: $x - x_V = x - (-1) = x + 1$
~ 0 = a(1 + 1)^2 + 4 = 4a + 4 :: sostituisco le coordinate di $P$
~ \evid{a = -1} :: risolvo
~ y = -(x + 1)^2 + 4 = \evidb{-x^2 - 2x + 3} :: sviluppo il quadrato

?? Da quale forma parti per la parabola di vertice $V(1; 3)$?
[x] $y = a(x - 1)^2 + 3$
[ ] $y = a(x + 1)^2 + 3$
[ ] $y = a(x - 1)^2 - 3$
=> Nella forma $y = a(x - x_V)^2 + y_V$ l'ascissa del vertice va dentro la parentesi **con il segno cambiato**. L'ordinata va fuori con il suo segno. Con $x = 1$ la parentesi si annulla e resta $y = 3$. In $y = a(x + 1)^2 + 3$ il vertice sarebbe $(-1; 3)$, in $y = a(x - 1)^2 - 3$ sarebbe $(1; -3)$.

### Fuoco e direttrice
Il vertice sta a metà strada fra fuoco e direttrice. Con $F(2; 3)$ e direttrice $y = 1$ il vertice è $(2; 2)$. La distanza vertice-fuoco è $p = 1$, quindi $a = \dfrac{1}{4p} = \dfrac{1}{4}$. L'equazione è $y = \dfrac{1}{4}(x - 2)^2 + 2 = \dfrac{x^2}{4} - x + 3$.

Nella scheda **Laboratorio** c'è *Il canestro*: trascina il vertice e regola $a$ finché la parabola entra nell'anello.

>! Tre punti allineati non stanno su nessuna parabola: il sistema dà $a = 0$. Due punti con la stessa ascissa non stanno su una parabola con asse verticale.` },

    { id: 'segmento-parabolico-problemi', titolo: 'Il segmento parabolico e i problemi', testo: R`Una retta taglia la parabola in due punti. Il segmento fra questi due punti si chiama **corda**. La parte di piano chiusa fra la corda e l'arco di parabola è il **segmento parabolico**. Archimede scoprì che la sua area è sempre due terzi di un rettangolo.

>* **Formula di Archimede.** $$A = \frac{2}{3}\, b \cdot h$$ Il rettangolo ha per base $b$ la corda e per altezza $h$ la distanza massima fra la corda e l'arco.

Se la corda è orizzontale, $h$ è la distanza del vertice dalla corda. Prendi $y = 4 - x^2$ tagliata dall'asse $x$. La corda va da $x = -2$ a $x = 2$, quindi $b = 4$. Il vertice è $(0; 4)$, quindi $h = 4$. L'area è $\dfrac{2}{3} \cdot 4 \cdot 4 = \dfrac{32}{3}$.

?? Un arco parabolico è largo $6$ m alla base e alto $3$ m. Quanto misura l'area sotto l'arco?
[x] $12\ \text{m}^2$
[ ] $9\ \text{m}^2$
[ ] $18\ \text{m}^2$
=> $A = \dfrac{2}{3} \cdot 6 \cdot 3 = 12$. $18$ è il rettangolo intero, con anche i due angoli vuoti sopra l'arco. $9$ è il triangolo con la stessa base e la stessa altezza, che sta dentro l'arco.

Nei problemi scegli un riferimento comodo e traduci i dati in condizioni sulla parabola.

~ \text{gittata } 8 \text{ m, altezza massima } 5 \text{ m} :: un proiettile lanciato da terra: il punto di partenza è l'origine
~ y = a\,x(x - 8) :: la traiettoria tocca terra in $x = 0$ e $x = 8$: sono gli zeri della parabola
~ x_V = 4 :: il vertice sta a metà fra i due zeri, per simmetria
~ 5 = a \cdot 4 \cdot (4 - 8) = \evid{-16a} :: nel vertice l'altezza è $5$
~ a = \evid{-\tfrac{5}{16}} :: negativo, come deve essere: la parabola è rivolta verso il basso
~ y = \evidb{-\tfrac{5}{16}x^2 + \tfrac{5}{2}x} :: sviluppo il prodotto

>! Alla fine controlla che il risultato abbia senso. Un'altezza negativa, o un $a$ positivo per un oggetto lanciato in aria, segnalano un errore.` }
  ],

  grafici: {
    luogoParabola: {
      tipo: 'piano', x: [-5, 5], y: [-3.5, 7.5],
      parametri: [
        { nome: 'px', min: -4.5, max: 4.5, passo: 0.1, valore: 2.4, nascosto: true },
        { nome: 'k', min: 0.25, max: 2.5, passo: 0.05, valore: 1, nascosto: true }
      ],
      funzioni: [{ f: 'x^2/(4*k)', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: '-k', tratteggio: true, etichetta: 'direttrice', colore: 3 },
        { tipo: 'segmento', da: ['px', 'px^2/(4*k)'], a: [0, 'k'], colore: 4 },
        { tipo: 'segmento', da: ['px', 'px^2/(4*k)'], a: ['px', '-k'], colore: 4 },
        { tipo: 'punto', p: [0, 'k'], trascina: true, etichetta: 'F', posizione: 'sinistra', colore: 4 },
        { tipo: 'punto', p: ['px', 'px^2/(4*k)'], trascina: true, etichetta: 'P', posizione: 'destra', colore: 2 },
        { tipo: 'punto', p: ['px', '-k'], etichetta: 'H', posizione: 'basso', colore: 4 },
        { tipo: 'testo', p: [-4.8, 7], testo: 'PF = {{sqrt(px^2 + (px^2/(4*k) - k)^2)}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.8, 6.4], testo: 'PH = {{px^2/(4*k) + k}}', ancora: 'start' },
        { tipo: 'testo', p: [-4.8, 5.8], testo: 'a = 1/(4p) = {{1/(4*k)}}', ancora: 'start' }
      ],
      didascalia: "Trascina P lungo la curva: i due segmenti viola, PF verso il fuoco e PH verso la direttrice, restano lunghi uguali. Poi trascina il fuoco F su e giù e guarda la parabola: quando F si avvicina al vertice, a cresce e la curva si stringe."
    },
    coefficienti: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      funzioni: [{ f: 'a x^2 + b x + c', etichetta: 'y = ax² + bx + c', colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: '-b/(2a)', tratteggio: true, colore: 3 },
        { tipo: 'punto', p: ['-b/(2a)', 'c - b^2/(4a)'], etichetta: 'V', posizione: 'basso', colore: 4 },
        { tipo: 'punto', p: [0, 'c'], etichetta: '(0; c)', posizione: 'sinistra', colore: 2 }
      ],
      parametri: [
        { nome: 'a', min: -3, max: 3, passo: 0.1, valore: 1, etichetta: 'a' },
        { nome: 'b', min: -6, max: 6, passo: 0.1, valore: -2, etichetta: 'b' },
        { nome: 'c', min: -6, max: 6, passo: 0.1, valore: -3, etichetta: 'c' }
      ],
      didascalia: "Muovi un cursore alla volta. Con a guarda la forma (e cosa succede quando a passa per lo zero); con c guarda il punto sull'asse y; con b guarda il vertice V: scivola via, ma la curva continua a passare per (0; c)."
    },
    rettaParabola: {
      tipo: 'piano', x: [-4, 9], y: [-10, 16],
      funzioni: [
        { f: 'x^2 - 4x + 3', etichetta: 'y = x² − 4x + 3', colore: 1 },
        { f: '2x + q', colore: 3 }
      ],
      punti: [
        { x: '3 - sqrt(6 + q)', y: '2(3 - sqrt(6 + q)) + q', etichetta: 'A', posizione: 'basso', colore: 2 },
        { x: '3 + sqrt(6 + q)', y: '2(3 + sqrt(6 + q)) + q', etichetta: 'B', posizione: 'alto', colore: 2 }
      ],
      parametri: [{ nome: 'q', min: -9, max: 3, passo: 0.5, valore: 0, etichetta: 'q' }],
      didascalia: 'La retta verde è y = 2x + q. Abbassala con il cursore e segui A e B: in quale momento diventano un punto solo? Continua a scendere e guarda che cosa resta.'
    }
  },

  esempi: [
    { titolo: 'Dalla definizione all\'equazione', problema: R`Scrivi l'equazione della parabola con fuoco $F(0; 2)$ e direttrice $y=-2$.`, passi: [
      R`Il vertice sta a metà strada fra fuoco e direttrice, quindi nell'origine; l'asse è l'asse $y$. La distanza fra vertice e fuoco è $p=2$.`,
      R`Un punto $P(x; y)$ della parabola verifica $\sqrt{x^2+(y-2)^2} = y+2$ (la distanza dalla direttrice $y=-2$ vale $y-(-2)=y+2$).`,
      R`Elevando al quadrato: $x^2+y^2-4y+4=y^2+4y+4$, cioè $x^2=8y$.`,
      R`Quindi $y=\dfrac{x^2}{8}$: infatti $a=\dfrac{1}{4p}=\dfrac{1}{8}$.`
    ], risultato: R`$y = \dfrac{x^2}{8}$` },

    { titolo: 'Vertice, asse, fuoco e direttrice', problema: R`Determina vertice, asse, fuoco e direttrice della parabola $y=x^2-4x+3$.`, passi: [
      R`Coefficienti: $a=1$, $b=-4$, $c=3$; discriminante $\Delta = 16-12=4$.`,
      R`Vertice: $x_V=-\dfrac{b}{2a}=2$, $y_V=c-\dfrac{b^2}{4a}=3-4=-1$; quindi $V(2; -1)$.`,
      R`Asse: $x=2$.`,
      R`Fuoco: $F\left(2; \dfrac{1-\Delta}{4a}\right)=F\left(2; -\dfrac34\right)$.`,
      R`Direttrice: $y=-\dfrac{1+\Delta}{4a}=-\dfrac54$.`
    ], risultato: R`$V(2; -1)$, asse $x=2$, $F\left(2; -\dfrac34\right)$, direttrice $y=-\dfrac54$` },

    { titolo: 'Retta e parabola: secante, tangente o esterna', problema: R`Studia, al variare di $q$, la posizione della retta $y=2x+q$ rispetto alla parabola $y=x^2-4x+3$, e verifica i casi $q=1$, $q=-6$, $q=-10$.`, passi: [
      R`Sostituendo: $x^2-4x+3=2x+q$, cioè $x^2-6x+(3-q)=0$. Il discriminante ridotto è $\dfrac{\Delta}{4}=9-(3-q)=6+q$.`,
      R`Per $q=1$: $\dfrac{\Delta}{4}=7>0$, due soluzioni $x=3\pm\sqrt7$. La retta è secante.`,
      R`Per $q=-6$: $\dfrac{\Delta}{4}=0$, soluzione doppia $x=3$, $y=0$. La retta è tangente nel punto $(3; 0)$.`,
      R`Per $q=-10$: $\dfrac{\Delta}{4}=-4<0$, nessuna soluzione reale. La retta è esterna.`
    ], risultato: R`Secante per $q>-6$, tangente per $q=-6$, esterna per $q<-6$` },

    { titolo: 'Tangenti condotte da un punto esterno', problema: R`Determina le rette tangenti alla parabola $y=x^2$ condotte dal punto $P(1; -3)$.`, passi: [
      R`Fascio di rette per $P$: $y=m(x-1)-3$.`,
      R`Sostituendo in $y=x^2$: $x^2=mx-m-3$, cioè $x^2-mx+(m+3)=0$.`,
      R`Discriminante: $\Delta=m^2-4(m+3)=m^2-4m-12$. Ponendo $\Delta=0$: $m=\dfrac{4\pm\sqrt{16+48}}{2}=\dfrac{4\pm8}{2}$, cioè $m=6$ oppure $m=-2$.`,
      R`Con $m=6$: retta $y=6x-9$, punto di tangenza $(3; 9)$. Con $m=-2$: retta $y=-2x-1$, punto di tangenza $(-1; 1)$.`
    ], risultato: R`$y=6x-9$ e $y=-2x-1$` },

    { titolo: 'L\'equazione per tre punti', problema: R`Determina l'equazione della parabola passante per $A(-2; 0)$, $B(4; 0)$ e $C(0; -16)$.`, passi: [
      R`$A$ e $B$ sono i due zeri della parabola: $y=a(x+2)(x-4)$.`,
      R`Imponendo il passaggio per $C(0; -16)$: $-16=a\cdot 2\cdot(-4)=-8a$, quindi $a=2$.`,
      R`Sviluppando: $y=2(x+2)(x-4)=2(x^2-2x-8)=2x^2-4x-16$.`
    ], risultato: R`$y=2x^2-4x-16$` },

    { titolo: 'Il segmento parabolico: la formula di Archimede', problema: R`Un arco parabolico simmetrico è largo $40\ \text{m}$ alla base ed è alto $10\ \text{m}$ nel punto più alto. Calcola, con la formula di Archimede, l'area compresa fra l'arco e la base.`, passi: [
      R`La base è la corda: $b=40\ \text{m}$. L'altezza $h$ è la distanza massima fra corda e arco, cioè l'altezza del vertice: $h=10\ \text{m}$.`,
      R`Formula di Archimede: $A=\dfrac23\,b\cdot h$.`,
      R`$A=\dfrac23\cdot 40\cdot 10=\dfrac{800}{3}\approx 266{,}7\ \text{m}^2$.`
    ], risultato: R`$A=\dfrac{800}{3}\ \text{m}^2\approx 266{,}7\ \text{m}^2$` }
  ],

  formulario: [
    { nome: 'Definizione come luogo', formula: R`PF = PH`, nota: R`$F$ è il fuoco, $H$ il piede della perpendicolare da $P$ alla direttrice: ogni punto $P$ della parabola ha $PF=PH$.` },
    { nome: 'Forma canonica', formula: R`y = \frac{x^2}{4p}`, nota: R`Vertice nell'origine, fuoco $F(0; p)$, direttrice $y=-p$.` },
    { nome: 'Relazione fra a e p', formula: R`a = \frac{1}{4p}`, nota: R`$p$ è la distanza (con segno) fra vertice e fuoco.` },
    { nome: 'Equazione generale (asse verticale)', formula: R`y = ax^2+bx+c, \quad a \ne 0` },
    { nome: 'Vertice (asse verticale)', formula: R`V = \left(-\frac{b}{2a}; -\frac{\Delta}{4a}\right)`, nota: R`$\Delta = b^2-4ac$.` },
    { nome: 'Asse (asse verticale)', formula: R`x = -\frac{b}{2a}` },
    { nome: 'Fuoco (asse verticale)', formula: R`F = \left(-\frac{b}{2a}; \frac{1-\Delta}{4a}\right)` },
    { nome: 'Direttrice (asse verticale)', formula: R`y = -\frac{1+\Delta}{4a}` },
    { nome: 'Equazione generale (asse orizzontale)', formula: R`x = ay^2+by+c, \quad a \ne 0` },
    { nome: 'Vertice (asse orizzontale)', formula: R`V = \left(c-\frac{b^2}{4a}; -\frac{b}{2a}\right)`, nota: R`Ruoli di $x$ e $y$ scambiati rispetto al caso verticale.` },
    { nome: 'Condizione di tangenza retta-parabola', formula: R`\Delta_{\text{sistema}} = 0` },
    { nome: 'Segmento parabolico (Archimede)', formula: R`A = \frac{2}{3}\, b \cdot h`, nota: R`$b$ = lunghezza della corda, $h$ = distanza massima fra corda e arco.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'definizione-luogo', tipo: 'definizione', fronte: R`Definizione di parabola come luogo`, retro: R`Insieme dei punti del piano equidistanti da un punto fisso $F$ (fuoco) e da una retta fissa $d$ (direttrice), con $F \notin d$.` },
    { id: 'fc-02', sezione: 'definizione-luogo', tipo: 'concetto', fronte: R`Perché il fuoco non può stare sulla direttrice?`, retro: R`Il luogo dei punti equidistanti da $F$ e da $d$ si ridurrebbe alla sola perpendicolare a $d$ per $F$: non si otterrebbe una parabola.` },
    { id: 'fc-03', sezione: 'equazione-canonica', tipo: 'formula', fronte: R`Equazione canonica (vertice nell'origine, asse verticale)`, retro: R`$y = \dfrac{x^2}{4p}$, con fuoco $(0; p)$ e direttrice $y = -p$.` },
    { id: 'fc-04', sezione: 'equazione-canonica', tipo: 'concetto', fronte: R`Relazione fra $a$ e $p$ nella forma canonica`, retro: R`$a = \dfrac{1}{4p}$, cioè $p = \dfrac{1}{4a}$: $p$ è la distanza (con segno) fra vertice e fuoco.` },
    { id: 'fc-05', sezione: 'significato-a-b-c', tipo: 'concetto', fronte: R`Che cosa stabilisce il segno di $a$?`, retro: R`La concavità: verso l'alto se $a>0$, verso il basso se $a<0$.` },
    { id: 'fc-06', sezione: 'significato-a-b-c', tipo: 'concetto', fronte: R`Che cosa stabilisce il valore assoluto di $a$?`, retro: R`L'apertura della parabola: $|a|$ grande dà una parabola stretta, $|a|$ piccolo una parabola larga.` },
    { id: 'fc-07', sezione: 'significato-a-b-c', tipo: 'concetto', fronte: R`Che cos'è $c$ in $y=ax^2+bx+c$?`, retro: R`L'ordinata del punto in cui la parabola incontra l'asse $y$, perché per $x=0$ si ha $y=c$.` },
    { id: 'fc-08', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Coordinate del vertice`, retro: R`$V\left(-\dfrac{b}{2a}; -\dfrac{\Delta}{4a}\right)$, con $\Delta=b^2-4ac$.` },
    { id: 'fc-09', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Equazione dell'asse di simmetria (asse verticale)`, retro: R`$x = -\dfrac{b}{2a}$.` },
    { id: 'fc-10', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Coordinate del fuoco (asse verticale)`, retro: R`$F\left(-\dfrac{b}{2a}; \dfrac{1-\Delta}{4a}\right)$.` },
    { id: 'fc-11', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'formula', fronte: R`Equazione della direttrice (asse verticale)`, retro: R`$y = -\dfrac{1+\Delta}{4a}$.` },
    { id: 'fc-12', sezione: 'vertice-asse-fuoco-direttrice', tipo: 'concetto', fronte: R`Distanza fra vertice e fuoco`, retro: R`$\left|\dfrac{1}{4a}\right|$: la stessa distanza, dalla parte opposta, separa il vertice dalla direttrice.` },
    { id: 'fc-13', sezione: 'asse-parallelo-x', tipo: 'definizione', fronte: R`Equazione della parabola con asse orizzontale`, retro: R`$x = ay^2 + by + c$, con $a \ne 0$.` },
    { id: 'fc-14', sezione: 'asse-parallelo-x', tipo: 'concetto', fronte: R`Perché $x=ay^2+by+c$ non è il grafico di $y=f(x)$?`, retro: R`Perché a molti valori di $x$ corrispondono due valori di $y$: la curva non supera il test della retta verticale.` },
    { id: 'fc-15', sezione: 'intersezioni-assi-rette', tipo: 'concetto', fronte: R`Quando una retta è tangente a una parabola?`, retro: R`Quando il sistema fra le due equazioni ha discriminante nullo: un'unica soluzione, doppia.` },
    { id: 'fc-16', sezione: 'intersezioni-assi-rette', tipo: 'concetto', fronte: R`Quando una retta è esterna a una parabola?`, retro: R`Quando il sistema fra le due equazioni non ha soluzioni reali (discriminante negativo).` },
    { id: 'fc-17', sezione: 'tangenti-da-un-punto', tipo: 'procedura', fronte: R`Come si trovano le tangenti a una parabola condotte da un punto $P$?`, retro: R`Si scrive il fascio di rette per $P$, si sostituisce nell'equazione della parabola e si impone che il discriminante (nell'incognita $m$) sia nullo.` },
    { id: 'fc-18', sezione: 'tangenti-da-un-punto', tipo: 'concetto', fronte: R`Quante tangenti passano per un punto interno alla concavità della parabola?`, retro: R`Nessuna.` },
    { id: 'fc-19', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Come si trova l'equazione di una parabola per tre punti?`, retro: R`Si sostituiscono le coordinate dei tre punti in $y=ax^2+bx+c$ e si risolve il sistema nelle incognite $a$, $b$, $c$.` },
    { id: 'fc-20', sezione: 'determinare-equazione', tipo: 'procedura', fronte: R`Come si trova l'equazione di una parabola dati vertice e un punto?`, retro: R`Si scrive $y = a(x-x_V)^2 + y_V$ e si sostituisce il punto per trovare $a$.` },
    { id: 'fc-21', sezione: 'segmento-parabolico-problemi', tipo: 'formula', fronte: R`Formula di Archimede per il segmento parabolico`, retro: R`$A = \dfrac{2}{3} \cdot b \cdot h$, dove $h$ è la distanza massima fra la corda e l'arco.` },
    { id: 'fc-22', sezione: 'segmento-parabolico-problemi', tipo: 'definizione', fronte: R`Che cos'è un segmento parabolico?`, retro: R`La regione di piano compresa fra un arco di parabola e la corda (retta secante) che lo taglia.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Verso dove è rivolta la parabola $y = 2x^2 - 3x + 1$? Scrivi *verso l'alto* o *verso il basso*.`, suggerimenti: [R`Guarda solo il segno di $a$, il numero davanti a $x^2$.`], risposta: ALTO, soluzione: [R`$a = 2$, che è positivo.`, R`Con $a > 0$ la parabola è rivolta verso l'alto.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`In quale punto $y = x^2 + 3x - 2$ taglia l'asse $y$? Scrivi *x; y*.`, suggerimenti: [R`Sull'asse $y$ si ha $x = 0$.`], risposta: cop(0, -2), soluzione: [R`Metto $x = 0$: resta solo il termine noto, $y = -2$.`, R`Il punto è $(0; -2)$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Verso dove è rivolta la parabola $y = -x^2 + 4$? Scrivi *verso l'alto* o *verso il basso*.`, suggerimenti: [R`Il numero davanti a $x^2$ è $-1$.`], risposta: BASSO, soluzione: [R`$a = -1$, che è negativo.`, R`Con $a < 0$ la parabola è rivolta verso il basso.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Trova il vertice di $y = x^2 - 4$. Scrivi *x; y*.`, suggerimenti: [R`Qui $b = 0$, quindi $x_V = 0$.`, R`Metti $x = 0$ nell'equazione.`], risposta: cop(0, -4), soluzione: [R`$b = 0$, quindi $x_V = -\dfrac{0}{2} = 0$.`, R`$y_V = 0 - 4 = -4$. Il vertice è $V(0; -4)$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Scrivi l'equazione dell'asse di $y = x^2 - 6x + 5$.`, suggerimenti: [R`L'asse è la retta verticale $x = -\dfrac{b}{2a}$.`], risposta: asse(3), soluzione: [R`$a = 1$, $b = -6$.`, R`$x = -\dfrac{-6}{2 \cdot 1} = 3$. L'asse è $x = 3$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Il vertice di $y = -2x^2 + 4x + 1$ è un massimo o un minimo?`, suggerimenti: [R`Guarda il segno di $a$: verso dove è rivolta la parabola?`], risposta: { tipo: 'testo', accettate: ['massimo', 'max', 'un massimo', 'è un massimo', 'punto di massimo'], segnaposto: 'massimo o minimo', simboli: [] }, soluzione: [R`$a = -2 < 0$: la parabola è rivolta verso il basso.`, R`Il vertice è il punto più alto, quindi è un massimo.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Scrivi l'equazione dell'asse di $y = 2x^2 + 8x - 1$.`, suggerimenti: [R`Usa $x = -\dfrac{b}{2a}$ con $a = 2$ e $b = 8$.`], risposta: asse(-2), soluzione: [R`$x = -\dfrac{8}{2 \cdot 2} = -\dfrac{8}{4}$.`, R`L'asse è $x = -2$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`In quali punti $y = x^2 - 9$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Sull'asse $x$ si ha $y = 0$: risolvi $x^2 - 9 = 0$.`], risposta: zeri(-3, 3), soluzione: [R`Metto $y = 0$: $x^2 = 9$.`, R`$x = -3$ oppure $x = 3$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`In quali punti $y = x^2 - 5x$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Metti $y = 0$ e raccogli la $x$.`], risposta: zeri(0, 5), soluzione: [R`Metto $y = 0$: $x^2 - 5x = 0$, cioè $x(x - 5) = 0$.`, R`$x = 0$ oppure $x = 5$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Trova il vertice di $y = x^2 - 2x + 3$. Scrivi *x; y*.`, suggerimenti: [R`Prima $x_V = -\dfrac{b}{2a}$.`, R`Poi metti $x_V$ nell'equazione.`], risposta: cop(1, 2), soluzione: [R`$x_V = -\dfrac{-2}{2} = 1$.`, R`$y_V = 1 - 2 + 3 = 2$. Il vertice è $V(1; 2)$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Trova il vertice di $y = -x^2 + 4x$. Scrivi *x; y*.`, suggerimenti: [R`Qui $a = -1$: attento al segno al denominatore.`, R`Poi metti $x_V$ nell'equazione.`], risposta: cop(2, 4), soluzione: [R`$x_V = -\dfrac{4}{2 \cdot (-1)} = -\dfrac{4}{-2} = 2$.`, R`$y_V = -4 + 8 = 4$. Il vertice è $V(2; 4)$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`In quali punti $y = x^2 - 4x + 3$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Risolvi $x^2 - 4x + 3 = 0$.`, R`Cerca due numeri con somma $4$ e prodotto $3$.`], risposta: zeri(1, 3), soluzione: [R`Metto $y = 0$: $x^2 - 4x + 3 = 0$.`, R`$\Delta = 16 - 12 = 4$, quindi $x = \dfrac{4 \pm 2}{2}$.`, R`$x = 1$ oppure $x = 3$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Trova il vertice di $y = x^2 + 6x + 5$. Scrivi *x; y*.`, suggerimenti: [R`$x_V = -\dfrac{b}{2a}$ con $b = 6$.`, R`Poi metti $x_V$ nell'equazione.`], risposta: cop(-3, -4), soluzione: [R`$x_V = -\dfrac{6}{2} = -3$.`, R`$y_V = 9 - 18 + 5 = -4$. Il vertice è $V(-3; -4)$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`In quali punti $y = x^2 + 2x + 5$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Calcola il $\Delta$ di $x^2 + 2x + 5 = 0$.`], risposta: nessuna, soluzione: [R`Metto $y = 0$: $x^2 + 2x + 5 = 0$.`, R`$\Delta = 4 - 20 = -16 < 0$: l'equazione non ha soluzioni.`, R`La parabola non taglia l'asse $x$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`In quali punti $y = x^2 - 6x + 9$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Calcola il $\Delta$: che cosa succede?`, R`$x^2 - 6x + 9$ è un quadrato.`], risposta: doppia('3'), soluzione: [R`$\Delta = 36 - 36 = 0$: c'è una sola soluzione.`, R`$x^2 - 6x + 9 = (x - 3)^2 = 0$, quindi $x = 3$.`, R`La parabola tocca l'asse $x$ nel vertice $(3; 0)$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Trova il vertice di $y = 2x^2 - 4x + 5$. Scrivi *x; y*.`, suggerimenti: [R`$x_V = -\dfrac{b}{2a}$ con $a = 2$ e $b = -4$.`, R`Poi metti $x_V$ nell'equazione.`], risposta: cop(1, 3), soluzione: [R`$x_V = -\dfrac{-4}{2 \cdot 2} = \dfrac{4}{4} = 1$.`, R`$y_V = 2 - 4 + 5 = 3$. Il vertice è $V(1; 3)$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`In quali punti $y = -x^2 + x + 6$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Metti $y = 0$ e cambia tutti i segni: $x^2 - x - 6 = 0$.`, R`Cerca due numeri con somma $1$ e prodotto $-6$.`], risposta: zeri(-2, 3), soluzione: [R`Metto $y = 0$ e cambio segno: $x^2 - x - 6 = 0$.`, R`$\Delta = 1 + 24 = 25$, quindi $x = \dfrac{1 \pm 5}{2}$.`, R`$x = -2$ oppure $x = 3$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Trova il vertice di $y = -x^2 - 2x + 3$. Scrivi *x; y*.`, suggerimenti: [R`$a = -1$ e $b = -2$: attento ai due segni meno.`, R`Poi metti $x_V$ nell'equazione.`], risposta: cop(-1, 4), soluzione: [R`$x_V = -\dfrac{-2}{2 \cdot (-1)} = -\dfrac{-2}{-2} = -1$.`, R`$y_V = -(-1)^2 - 2 \cdot (-1) + 3 = -1 + 2 + 3 = 4$.`, R`Il vertice è $V(-1; 4)$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`In quali punti $y = 2x^2 - 2x - 4$ taglia l'asse $x$? Scrivi le ascisse separate da ; oppure *nessuna*.`, suggerimenti: [R`Metti $y = 0$ e dividi tutto per $2$.`, R`Poi risolvi $x^2 - x - 2 = 0$.`], risposta: zeri(-1, 2), soluzione: [R`Metto $y = 0$ e divido per $2$: $x^2 - x - 2 = 0$.`, R`$\Delta = 1 + 8 = 9$, quindi $x = \dfrac{1 \pm 3}{2}$.`, R`$x = -1$ oppure $x = 2$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Trova il vertice di $y = 3x^2 + 6x - 2$. Scrivi *x; y*.`, suggerimenti: [R`$x_V = -\dfrac{b}{2a}$ con $a = 3$ e $b = 6$.`, R`Poi metti $x_V$ nell'equazione.`], risposta: cop(-1, -5), soluzione: [R`$x_V = -\dfrac{6}{2 \cdot 3} = -1$.`, R`$y_V = 3 \cdot (-1)^2 + 6 \cdot (-1) - 2 = 3 - 6 - 2 = -5$.`, R`Il vertice è $V(-1; -5)$.`] },

    { id: 'es-01', difficolta: 1, testo: R`Trova le coordinate del vertice della parabola $y=2x^2-8x+3$ (scrivi la risposta come x; y).`, suggerimenti: [R`Calcola prima $x_V=-\dfrac{b}{2a}$.`, R`Poi sostituisci $x_V$ nell'equazione, oppure usa $y_V=c-\dfrac{b^2}{4a}$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [2, -5] }, soluzione: [R`$a=2$, $b=-8$, $c=3$.`, R`$x_V=-\dfrac{-8}{4}=2$.`, R`$y_V=3-\dfrac{64}{8}=3-8=-5$. Vertice $V(2; -5)$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Trova il vertice della parabola $y=-x^2+6x-5$ e stabilisci se è un massimo o un minimo (scrivi la risposta come x; y).`, suggerimenti: [R`Il segno di $a$ ti dice subito se il vertice è un massimo o un minimo.`, R`$x_V=-\dfrac{b}{2a}$ con $a=-1$, $b=6$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [3, 4] }, soluzione: [R`$a=-1<0$: la concavità è verso il basso, quindi il vertice è un massimo.`, R`$x_V=-\dfrac{6}{-2}=3$.`, R`$y_V=-5-\dfrac{36}{-4}=-5+9=4$. Vertice $V(3; 4)$.`] },
    { id: 'es-03', difficolta: 1, testo: R`Trova le ascisse dei punti in cui la parabola $y=x^2-x-6$ interseca l'asse $x$.`, suggerimenti: [R`Poni $y=0$ e risolvi l'equazione di secondo grado.`, R`Cerca due numeri con somma $1$ e prodotto $-6$.`], risposta: { tipo: 'numeri', valori: [3, -2] }, soluzione: [R`$x^2-x-6=0$: $\Delta=1+24=25$.`, R`$x_{1,2}=\dfrac{1\pm5}{2}$: $x_1=3$, $x_2=-2$.`] },
    { id: 'es-04', difficolta: 1, testo: R`Determina le coordinate del fuoco della parabola $y=\dfrac{x^2}{12}$ (scrivi la risposta come x; y).`, suggerimenti: [R`È già nella forma canonica $y=\dfrac{x^2}{4p}$: confronta i denominatori.`, R`Il fuoco della forma canonica è $(0; p)$.`], risposta: { tipo: 'numeri', ordinati: true, valori: [0, 3] }, soluzione: [R`$4p=12$, quindi $p=3$.`, R`Fuoco $F(0; 3)$, direttrice $y=-3$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Per quali valori di $q$ la retta $y=2x+q$ è tangente alla parabola $y=x^2-4x+3$?`, suggerimenti: [R`Sostituisci la retta nell'equazione della parabola e imponi discriminante nullo.`, R`Dovresti arrivare a $\dfrac{\Delta}{4}=6+q$.`], risposta: { tipo: 'numero', valore: -6 }, soluzione: [R`$x^2-4x+3=2x+q \Rightarrow x^2-6x+(3-q)=0$.`, R`$\dfrac{\Delta}{4}=9-(3-q)=6+q$. Ponendo $6+q=0$ si trova $q=-6$.`] },
    { id: 'es-06', difficolta: 2, testo: R`Scrivi l'equazione della parabola con vertice $V(1; -4)$ e passante per il punto $P(3; 0)$.`, suggerimenti: [R`Parti da $y=a(x-1)^2-4$.`, R`Sostituisci le coordinate di $P$ per trovare $a$.`], risposta: { tipo: 'testo', accettate: ['y=x^2-2x-3', 'y=x²-2x-3', 'y = x^2 - 2x - 3', 'y = x² − 2x − 3', 'y=(x-1)^2-4', 'y=-3-2x+x^2'] }, soluzione: [R`$y=a(x-1)^2-4$. Sostituendo $P(3; 0)$: $0=a(3-1)^2-4=4a-4$, quindi $a=1$.`, R`$y=(x-1)^2-4=x^2-2x+1-4=x^2-2x-3$.`] },
    { id: 'es-07', difficolta: 2, testo: R`Scrivi l'equazione della parabola con asse orizzontale, di vertice $(2; 1)$ e passante per il punto $(6; 3)$.`, suggerimenti: [R`Parti da $x=a(y-1)^2+2$.`, R`Sostituisci il punto per trovare $a$.`], risposta: { tipo: 'testo', accettate: ['x=y^2-2y+3', 'x=y²-2y+3', 'x = y^2 - 2y + 3', 'x = y² − 2y + 3', 'x=(y-1)^2+2', 'x=3-2y+y^2'] }, soluzione: [R`$x=a(y-1)^2+2$. Sostituendo $(6; 3)$: $6=a(3-1)^2+2=4a+2$, quindi $a=1$.`, R`$x=(y-1)^2+2=y^2-2y+1+2=y^2-2y+3$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Per quale valore di $k$ la parabola $y=x^2-2x+k$ è tangente all'asse $x$?`, suggerimenti: [R`Tangente all'asse $x$ significa $\Delta=0$.`, R`$\dfrac{\Delta}{4}=1-k$.`], risposta: { tipo: 'numero', valore: 1 }, soluzione: [R`$\dfrac{\Delta}{4}=(-1)^2-k=1-k$.`, R`$1-k=0 \Rightarrow k=1$.`] },
    { id: 'es-09', difficolta: 2, testo: R`Un tunnel stradale ha sezione a forma di arco parabolico: alla base è largo $6\ \text{m}$ e al centro è alto $4{,}5\ \text{m}$. Usando la formula di Archimede, calcola l'area della sezione del tunnel (in metri quadrati).`, suggerimenti: [R`Identifica base $b$ e altezza $h$ del segmento parabolico.`, R`Applica $A=\dfrac23\,b\cdot h$.`], risposta: { tipo: 'numero', valore: 18, tolleranza: 0.1 }, soluzione: [R`$b=6\ \text{m}$, $h=4{,}5\ \text{m}$.`, R`$A=\dfrac23\cdot 6\cdot 4{,}5=\dfrac23\cdot 27=18\ \text{m}^2$.`] },
    { id: 'es-10', difficolta: 3, testo: R`Determina i coefficienti angolari delle rette tangenti alla parabola $y=x^2$ condotte dal punto $P(0; -1)$.`, suggerimenti: [R`Scrivi il fascio di rette per $P$: $y=mx-1$.`, R`Sostituisci nella parabola e imponi discriminante nullo nell'incognita $m$.`], risposta: { tipo: 'numeri', valori: [2, -2] }, soluzione: [R`$x^2=mx-1 \Rightarrow x^2-mx+1=0$.`, R`$\Delta=m^2-4$. Ponendo $\Delta=0$: $m^2=4$, cioè $m=2$ oppure $m=-2$.`, R`Le tangenti sono $y=2x-1$ (punto di tangenza $(1; 1)$) e $y=-2x-1$ (punto di tangenza $(-1; 1)$).`] },
    { id: 'es-11', difficolta: 3, testo: R`Una parabola con asse verticale passa per i punti $A(-2; 0)$, $B(4; 0)$ e $C(0; -16)$. Determina i suoi coefficienti $a$, $b$, $c$ (nell'ordine).`, suggerimenti: [R`$A$ e $B$ sono i due zeri: usa $y=a(x-x_1)(x-x_2)$.`, R`Sostituisci $C$ per trovare $a$, poi sviluppa il prodotto.`], risposta: { tipo: 'numeri', ordinati: true, valori: [2, -4, -16] }, soluzione: [R`$y=a(x+2)(x-4)$. Sostituendo $C(0; -16)$: $-16=a\cdot2\cdot(-4)=-8a$, quindi $a=2$.`, R`$y=2(x+2)(x-4)=2(x^2-2x-8)=2x^2-4x-16$: $a=2$, $b=-4$, $c=-16$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Un proiettile lanciato da terra descrive una traiettoria parabolica con gittata $8\ \text{m}$; l'altezza massima, $5\ \text{m}$, viene raggiunta a metà della gittata. Scrivi l'altezza $y$ raggiunta a $x=2\ \text{m}$ dal lancio (arrotonda a due cifre decimali).`, suggerimenti: [R`I punti $(0; 0)$ e $(8; 0)$ sono gli zeri della parabola: scrivi $y=ax(x-8)$.`, R`Usa il vertice $(4; 5)$ per trovare $a$, poi valuta $y$ in $x=2$.`], risposta: { tipo: 'numero', valore: 3.75, tolleranza: 0.05 }, soluzione: [R`$y=ax(x-8)$; nel vertice $x=4$: $5=a\cdot4\cdot(-4)=-16a$, quindi $a=-\dfrac{5}{16}$.`, R`$y=-\dfrac{5}{16}x(x-8)$. Per $x=2$: $y=-\dfrac{5}{16}\cdot2\cdot(-6)=\dfrac{60}{16}=3{,}75\ \text{m}$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale definizione di parabola è corretta?`, opzioni: [R`L'insieme dei punti equidistanti da un punto fisso (il fuoco) e da una retta fissa (la direttrice).`, R`L'insieme dei punti la cui differenza di distanza da due punti fissi è costante.`, R`L'insieme dei punti a distanza costante da un punto fisso (il centro).`, R`L'insieme dei punti equidistanti da due punti fissi (i fuochi).`], corretta: 0, spiegazione: R`È la definizione della parabola come luogo geometrico. La differenza costante delle distanze da due punti descrive l'iperbole, la distanza costante da un centro la circonferenza, e i punti equidistanti da due punti formano l'asse di un segmento.` },
    { id: 'q-02', domanda: R`Nell'equazione $y=ax^2+bx+c$, il segno del coefficiente $a$ stabilisce…`, opzioni: [R`l'ordinata del vertice`, R`la concavità della parabola`, R`l'apertura della parabola`, R`l'ascissa del vertice`], corretta: 1, spiegazione: R`$a>0$ dà concavità verso l'alto, $a<0$ verso il basso. L'apertura dipende dal valore assoluto di $a$, non dal segno; vertice e ascissa dipendono anche da $b$ e $c$.` },
    { id: 'q-03', domanda: R`Il coefficiente $c$ nell'equazione $y=ax^2+bx+c$ rappresenta…`, opzioni: [R`l'ascissa del vertice`, R`l'ordinata del fuoco`, R`l'ordinata del punto in cui la parabola incontra l'asse $y$`, R`l'ascissa dei punti in cui la parabola incontra l'asse $x$`], corretta: 2, spiegazione: R`Per $x=0$ si ha $y=c$: è l'intercetta con l'asse $y$. Le altre grandezze dipendono anche da $a$ e $b$.` },
    { id: 'q-04', domanda: R`L'ascissa del vertice della parabola $y=ax^2+bx+c$ è…`, opzioni: [R`$\dfrac{b}{2a}$`, R`$-\dfrac{c}{2a}$`, R`$\dfrac{-b\pm\sqrt\Delta}{2a}$`, R`$-\dfrac{b}{2a}$`], corretta: 3, spiegazione: R`È la formula del vertice. L'opzione con $\dfrac{-b\pm\sqrt\Delta}{2a}$ è la formula risolutiva: dà le radici, non il vertice.` },
    { id: 'q-05', domanda: R`Se $\Delta=b^2-4ac=0$, la parabola $y=ax^2+bx+c$…`, opzioni: [R`è tangente all'asse $x$ nel vertice`, R`non incontra l'asse $x$`, R`incontra l'asse $x$ in due punti distinti`, R`ha il vertice sull'asse $y$`], corretta: 0, spiegazione: R`Con $\Delta=0$ l'equazione $ax^2+bx+c=0$ ha una soluzione doppia, che coincide con l'ascissa del vertice: la parabola tocca l'asse $x$ proprio lì.` },
    { id: 'q-06', domanda: R`Nella parabola canonica $y=\dfrac{x^2}{4p}$, con fuoco $(0; p)$ e vertice nell'origine, la distanza fra vertice e fuoco è…`, opzioni: [R`$4p$`, R`$|p|$`, R`$p^2$`, R`$2p$`], corretta: 1, spiegazione: R`Il fuoco è $(0; p)$ e il vertice è l'origine: la distanza fra i due è $|p|$, la stessa che separa il vertice dalla direttrice $y=-p$.` },
    { id: 'q-07', domanda: R`Una retta è tangente a una parabola quando il sistema fra le loro equazioni ha…`, opzioni: [R`discriminante negativo`, R`due soluzioni distinte`, R`discriminante nullo`, R`infinite soluzioni`], corretta: 2, spiegazione: R`Discriminante nullo significa una soluzione doppia: un solo punto di intersezione, cioè tangenza.` },
    { id: 'q-08', domanda: R`Una retta è esterna a una parabola quando il sistema fra le loro equazioni…`, opzioni: [R`ha discriminante nullo`, R`ha due soluzioni reali`, R`ha come soluzione il vertice`, R`non ha soluzioni reali`], corretta: 3, spiegazione: R`Nessuna soluzione reale (discriminante negativo) significa che la retta non incontra la parabola in nessun punto: è esterna.` },
    { id: 'q-09', domanda: R`Da un punto interno alla concavità di una parabola, quante rette tangenti alla parabola si possono condurre?`, opzioni: [R`nessuna`, R`una`, R`due`, R`infinite`], corretta: 0, spiegazione: R`L'equazione che dà il coefficiente angolare delle tangenti non ha soluzioni reali quando il punto è interno alla concavità: nessuna tangente passa per un punto del genere.` },
    { id: 'q-10', domanda: R`L'equazione $x=ay^2+by+c$ (con $a\ne0$) rappresenta…`, opzioni: [R`una parabola con asse parallelo all'asse $y$`, R`una parabola con asse parallelo all'asse $x$`, R`una retta`, R`una circonferenza`], corretta: 1, spiegazione: R`Scambiando i ruoli di $x$ e $y$ rispetto alla forma abituale, l'asse di simmetria diventa orizzontale, parallelo all'asse $x$.` },
    { id: 'q-11', domanda: R`Perché $x=ay^2+by+c$ non rappresenta $y$ come funzione di $x$?`, opzioni: [R`perché $a$ non può essere negativo`, R`perché manca il termine noto`, R`perché a certi valori di $x$ corrispondono due valori di $y$`, R`perché non ha vertice`], corretta: 2, spiegazione: R`Una parabola con asse orizzontale non supera il test della retta verticale: per alcuni valori di $x$ esistono due punti della curva con ordinate diverse.` },
    { id: 'q-12', domanda: R`La formula di Archimede per l'area di un segmento parabolico è…`, opzioni: [R`$A=b\cdot h$`, R`$A=\dfrac12\,b\cdot h$`, R`$A=\dfrac43\,b\cdot h$`, R`$A=\dfrac23\,b\cdot h$`], corretta: 3, spiegazione: R`L'area è i due terzi del rettangolo di base $b$ (la corda) e altezza $h$ (la distanza massima fra corda e arco); equivalentemente, è $\dfrac43$ dell'area del triangolo inscritto di base $b$ e altezza $h$.` },
    { id: 'q-13', domanda: R`Quanti punti, con ascisse tutte diverse e non allineati, servono in generale per determinare l'equazione $y=ax^2+bx+c$ di una parabola?`, opzioni: [R`tre`, R`due`, R`quattro`, R`cinque`], corretta: 0, spiegazione: R`Le incognite sono tre ($a$, $b$, $c$): servono tre condizioni indipendenti, cioè tre punti con ascisse diverse fra loro e non allineati.` },
    { id: 'q-14', domanda: R`La parabola $y=-3x^2+x-5$ ha concavità…`, opzioni: [R`verso destra`, R`verso il basso`, R`verso l'alto`, R`verso sinistra`], corretta: 1, spiegazione: R`Il coefficiente di $x^2$ è $a=-3<0$: la concavità è verso il basso. "Destra" e "sinistra" riguardano solo le parabole con asse orizzontale.` },
    { id: 'q-15', domanda: R`Nella parabola con asse orizzontale $x=ay^2+by+c$, l'ordinata del vertice è…`, opzioni: [R`$c-\dfrac{b^2}{4a}$`, R`$\dfrac{b}{2a}$`, R`$-\dfrac{b}{2a}$`, R`$-\dfrac{b}{a}$`], corretta: 2, spiegazione: R`Scambiando $x$ e $y$ rispetto al caso verticale, l'ordinata del vertice è $-\dfrac{b}{2a}$; l'espressione $c-\dfrac{b^2}{4a}$ è invece l'ascissa del vertice in questo caso.` },
    { id: 'q-16', domanda: R`Ogni punto di una parabola è equidistante da…`, opzioni: [R`fuoco e vertice`, R`due fuochi`, R`vertice e direttrice`, R`fuoco e direttrice`], corretta: 3, spiegazione: R`È la definizione stessa di parabola come luogo geometrico. Il vertice è solo il punto della parabola più vicino a entrambi.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Nelle formule di vertice, fuoco e direttrice il segno conta: $-\dfrac{b}{2a}$ non è $\dfrac{b}{2a}$, e $\dfrac{1-\Delta}{4a}$ (il fuoco) non è $-\dfrac{1+\Delta}{4a}$ (la direttrice).` },
    { tipo: 'metodo', testo: R`Per stabilire se una retta è secante, tangente o esterna a una parabola, sostituiscila nell'equazione e guarda il segno del discriminante dell'equazione di secondo grado che ottieni: non serve altro.` },
    { tipo: 'trucco', testo: R`Il termine noto $c$ si legge a colpo d'occhio: è sempre l'ordinata del punto in cui la parabola incontra l'asse $y$.` },
    { tipo: 'errore', testo: R`$x=ay^2+by+c$ non è il grafico di una funzione $y=f(x)$: prima di applicare le formule del vertice, controlla sempre quale sia la variabile al quadrato.` },
    { tipo: 'trucco', testo: R`La distanza fra vertice e fuoco (e fra vertice e direttrice) vale sempre $\left|\dfrac{1}{4a}\right|$: se $|a|$ è grande sono vicinissimi al vertice, se $|a|$ è piccolo sono lontani.` },
    { tipo: 'metodo', testo: R`Per le tangenti condotte da un punto esterno, scrivi il fascio di rette per quel punto, sostituisci nell'equazione della parabola e imponi che il discriminante sia nullo nell'incognita $m$, non in $x$.` },
    { tipo: 'errore', testo: R`La formula di Archimede vale solo per un segmento parabolico vero: un arco di parabola tagliato da una corda rettilinea. Non si applica a una regione qualsiasi delimitata da due curve.` },
    { tipo: 'trucco', testo: R`Nel metodo dei tre punti, se uno dei punti dati ha ascissa $0$, hai già trovato $c$ senza calcoli: è la sua ordinata.` }
  ],

  aneddoti: [
    { matematico: 'Menecmo', anni: '380–320 a.C. circa', titolo: 'Duplicare il cubo con due parabole', testo: R`Nel IV secolo a.C. i geometri greci cercavano di risolvere un problema classico: costruire, con riga e compasso, il lato di un cubo con volume doppio di un cubo dato (il celebre problema di Delo). Menecmo, allievo di Eudosso, capì che il problema si riduceva a trovare due medi proporzionali fra due segmenti, e che questi si potevano ottenere come intersezione di due curve nuove, ottenute tagliando un cono con un piano: due parabole, oppure una parabola e un'iperbole, come le chiamiamo oggi. Le opere originali di Menecmo sono andate perdute; la notizia arriva attraverso autori successivi, come Eratostene e il commentatore Proclo, alcuni secoli dopo.`, legame: R`È la prima comparsa storica della parabola, non ancora chiamata così, come intersezione di un piano e un cono.` },
    { matematico: 'Apollonio di Perga', anni: '262–190 a.C. circa', titolo: 'I nomi delle coniche', testo: R`Apollonio, chiamato dagli antichi "il Grande Geometra", raccolse e superò i risultati dei suoi predecessori in un trattato monumentale, le *Coniche*, otto libri di cui sette sono arrivati fino a noi (in parte solo in traduzione araba). Fu lui a introdurre i nomi che usiamo ancora oggi: ellisse, parabola e iperbole, scelti per analogia con termini geometrici che indicavano, nell'ordine, un difetto, un'uguaglianza o un eccesso in certe costruzioni. Prima di Apollonio le tre curve si ottenevano tagliando tre tipi diversi di cono; lui dimostrò che tutte e tre si possono ricavare da un unico cono, cambiando solo l'inclinazione del piano di taglio.`, legame: R`Il nome stesso "parabola" viene da qui: nasce come termine tecnico per una delle tre sezioni coniche.` },
    { matematico: 'Archimede', anni: '287–212 a.C. circa', titolo: 'La quadratura della parabola', testo: R`Archimede scrisse un intero trattato, *La quadratura della parabola*, per dimostrare che l'area di un segmento parabolico è $\dfrac43$ dell'area del triangolo inscritto con la stessa base e il vertice nel punto dell'arco più lontano dalla corda. Lo dimostrò in due modi: uno rigoroso, per doppia riduzione all'assurdo con il metodo di esaustione; e uno, scoperto solo nel 1906 in un manoscritto ritrovato a Istanbul (il Palinsesto di Archimede), in cui usava un bilanciamento meccanico immaginario, come se pesasse le fette della parabola su una leva, per intuire il risultato prima di dimostrarlo in modo formale. Fu uno dei primi calcoli d'area di una figura curvilinea della storia, quasi duemila anni prima del calcolo integrale.`, legame: R`Da quel rapporto $\dfrac43$ rispetto al triangolo viene direttamente la formula $A=\dfrac23\,b\cdot h$ per il segmento parabolico.` },
    { matematico: 'Diocle', anni: '240–180 a.C. circa', titolo: 'Gli specchi ustori e il fuoco della parabola', testo: R`Diocle, matematico greco poco conosciuto rispetto ad Apollonio o Archimede, scrisse un trattato dal titolo *Sugli specchi ustori*, dedicato al problema di costruire uno specchio capace di concentrare i raggi del Sole in un solo punto per accendere un fuoco. Diocle dimostrò che uno specchio a forma di paraboloide (la superficie generata ruotando una parabola attorno al suo asse) riflette tutti i raggi paralleli all'asse verso un unico punto: proprio il fuoco della parabola. Il nome arrivò molto più tardi: fu Keplero, nel 1604, a chiamare quel punto *focus*, «focolare», pensando proprio agli specchi che accendono il fuoco. Il testo di Diocle è arrivato fino a noi solo attraverso una traduzione araba, ritrovata e studiata a fondo solo nel Novecento.`, legame: R`Il nome stesso "fuoco" nasce da questa proprietà: è il punto dove i raggi paralleli all'asse, dopo la riflessione, si concentrano.` },
    { matematico: 'Galileo Galilei', anni: '1564–1642', titolo: 'La traiettoria dei proiettili è una parabola', testo: R`Nel 1638, ormai anziano e cieco, Galileo pubblicò a Leida i *Discorsi e dimostrazioni matematiche intorno a due nuove scienze*. Nella Giornata Quarta dimostrò che il moto di un proiettile lanciato in aria, trascurando la resistenza dell'aria, si può scomporre in un moto orizzontale a velocità costante e in una caduta verticale uniformemente accelerata, e che componendo i due la traiettoria risultante è esattamente una parabola. Era la prima descrizione matematica corretta della balistica, in aperto contrasto con la fisica aristotelica ancora insegnata nelle università, che immaginava le traiettorie dei proiettili come archi di cerchio raccordati a rette.`, legame: R`È l'esempio più citato di parabola fuori dalla matematica pura: ogni oggetto lanciato, in assenza di attrito, disegna un arco di parabola.` }
  ]
});
})();
