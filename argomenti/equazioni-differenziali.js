(function () {
const R = String.raw;
/* Ogni soluzione scritta qui è stata verificata per sostituzione con node (residuo dell'equazione in
   cinque punti), e ogni numero di esempi, esercizi, quiz e flashcard ricalcolato.
   I video usano gli stessi esempi: y' = y (campo-direzioni), y' = 2x con y(1) = 3 (condizione-iniziale),
   y' = -0,5y con y(0) = 8 (separabili), la logistica con r = 1, K = 10, y(0) = 0,5 (logistica). */

/* campo di direzioni: in ogni punto della griglia un trattino lungo L unità del disegno (largo 600).
   Le due scale degli assi sono diverse, quindi la pendenza si porta in pixel prima di normalizzare.
   Le misure (600 di larghezza, margini 34 + 16 e 14 + 26, altezza fra 220 e 520) sono quelle del motore. */
function campo(f, fin, xs, ys, L) {
  const pw = 550;
  const H = fin.altezza || Math.max(220, Math.min(520, Math.round(600 * (fin.y[1] - fin.y[0]) / (fin.x[1] - fin.x[0]))));
  const kx = pw / (fin.x[1] - fin.x[0]), ky = (H - 40) / (fin.y[1] - fin.y[0]);
  const out = [];
  xs.forEach(function (x) {
    ys.forEach(function (y) {
      const vx = kx, vy = ky * f(x, y), n = Math.sqrt(vx * vx + vy * vy);
      const dx = (L / 2) * (vx / n) / kx, dy = (L / 2) * (vy / n) / ky;
      out.push({ tipo: 'segmento', da: [x - dx, y - dy], a: [x + dx, y + dy], colore: 4 });
    });
  });
  return out;
}
function passi(a, b, p) {
  const v = [];
  for (let x = a; x <= b + 1e-9; x += p) v.push(Math.round(x * 1000) / 1000);
  return v;
}

/* allenamento: risposte numeriche. La casella capisce frazioni (1/4), potenze di e (2e^3) ed
   espressioni come ln(4); la tolleranza copre gli arrotondamenti al centesimo. */
const val = function (v, tol) { return { tipo: 'numero', valore: v, tolleranza: tol == null ? 0.005 : tol, segnaposto: 'un numero', simboli: ['−', '/', '^', 'e', 'π', '√'] }; };
const xs = function () { return { tipo: 'numeri', valori: Array.prototype.slice.call(arguments), segnaposto: 'es. 1; 5', simboli: [';', '−', '/'] }; };
const pt = function (x, y, tol) { return { tipo: 'numeri', valori: [x, y], ordinati: true, tolleranza: tol, segnaposto: 'es. (1; 2)', simboli: ['(', ')', ';', '−', '/', '^', 'e'] }; };

const F_FAM = { x: [-3, 3], y: [-3, 7] };
const F_Y = { x: [-2.5, 2.5], y: [-1.5, 4.5] };
const F_SEP = { x: [-0.5, 6.5], y: [-1, 9] };
const F_LIN = { x: [-1.5, 5], y: [-3, 6] };
const LN2 = Math.log(2);

COMPASSO.registra({
  id: 'equazioni-differenziali',
  titolo: 'Equazioni differenziali',

  introduzione: R`Spesso non si conosce una grandezza, ma si sa **come cambia**. Una popolazione cresce in proporzione a quanti individui ci sono. Un tè caldo si raffredda tanto più in fretta quanto più è caldo. Un capitale cresce con gli interessi.

Ognuna di queste frasi lega una funzione alla sua derivata. È un'**equazione differenziale**: l'incognita non è un numero, è una funzione. Risolverla vuol dire trovare la funzione, cioè prevedere come andrà la grandezza nel tempo.

Le equazioni differenziali sono la lingua della fisica, della biologia e dell'economia. All'esame di Stato compaiono spesso dentro un problema. Ti servono le derivate e gli integrali: ogni soluzione si trova integrando e si controlla derivando.`,

  inBreve: [
    R`Un'equazione differenziale lega una funzione incognita $y(x)$ alle sue derivate. Una **soluzione** è una funzione che, sostituita, rende vera l'uguaglianza per ogni $x$.`,
    R`Le soluzioni sono infinite e formano una famiglia con una costante $c$. Una **condizione iniziale** $y(x_0) = y_0$ ne sceglie una sola: è il problema di Cauchy.`,
    R`Il campo delle direzioni disegna in ogni punto la pendenza che chiede l'equazione. Le soluzioni sono le curve che seguono i trattini.`,
    R`**Variabili separabili**: le $y$ da una parte, le $x$ dall'altra, poi si integra. Prima di dividere cerca le soluzioni costanti, che altrimenti si perdono.`,
    R`**Lineari** $y' + a(x)\,y = b(x)$: si moltiplica per $e^{A(x)}$, con $A$ primitiva di $a$, e il primo membro diventa una derivata.`,
    R`$y' = ky$ dà l'esponenziale $y_0 e^{kx}$. La **logistica** cresce come lei all'inizio, poi rallenta e si appoggia sul tetto $K$.`
  ],

  sezioni: [
    { id: 'che-cos-e', titolo: 'Che cos\'è un\'equazione differenziale', testo: R`In un'equazione come $2x + 1 = 7$ l'incognita è un numero. In un'equazione differenziale l'incognita è una **funzione** $y(x)$. L'equazione dice come la funzione e le sue derivate sono legate fra loro.

Un esempio è $y' = y$. Chiede una funzione che, derivata, resta uguale a sé stessa. La conosci: $y = e^x$.

>* Un'**equazione differenziale** è un'equazione in cui compaiono una funzione incognita $y(x)$ e alcune sue derivate. L'**ordine** è quello della derivata più alta. Una **soluzione** è una funzione che, sostituita con le sue derivate, rende vera l'uguaglianza. Deve valere per ogni $x$ di un intervallo.

$y' = 3y$ è del primo ordine. $y'' + 4y = 0$ è del secondo ordine, perché c'è la derivata seconda.

Per **verificare** una soluzione non serve risolvere niente. Calcoli le derivate, sostituisci e controlli che i due membri coincidano. Ecco $y = x^2$ nell'equazione $x\,y' = 2y$.

~ x\,y' = 2y :: l'equazione da controllare
~ y = x^2, \quad y' = \evid{2x} :: calcolo la derivata della funzione proposta
~ x \cdot \evid{2x} = 2 \cdot x^2 :: sostituisco al posto di $y'$ e di $y$
~ 2x^2 = 2x^2 :: i due membri coincidono per ogni $x$: è una soluzione

?? Quale funzione è soluzione di $y' = 3y$?
[x] $y = e^{3x}$
[ ] $y = 3e^{x}$
[ ] $y = x^3$
=> Con $y = e^{3x}$ hai $y' = 3e^{3x} = 3y$. Con $y = 3e^x$ trovi $y' = 3e^x = y$, non $3y$. E $x^3$ ha derivata $3x^2$, che non è $3x^3$.

>! La soluzione è una funzione, non un numero. Scrivere «$y = 2$» vuol dire la funzione costante $2$, valida per ogni $x$.

>! L'uguaglianza deve valere **per ogni** $x$ dell'intervallo. Non basta che valga in un punto.` },

    { id: 'primitive', titolo: 'L\'equazione y′ = f(x): basta integrare', testo: R`L'equazione più semplice ha a destra solo la $x$: $y' = f(x)$. Chiede una funzione che abbia per derivata $f$. È proprio la definizione di **primitiva**.

>* Le soluzioni di $y' = f(x)$ sono tutte e sole le primitive di $f$: $$y = \int f(x)\,dx = F(x) + c.$$ Questa famiglia si chiama **integrale generale**. Ogni scelta del numero $c$ dà un **integrale particolare**.

Prendi $y' = 2x$. Una primitiva di $2x$ è $x^2$. Quindi le soluzioni sono $y = x^2 + c$, con $c$ numero qualunque.

Le curve della famiglia sono la stessa parabola spostata in su o in giù. Hanno tutte la stessa pendenza sopra la stessa $x$, perché $y'$ dipende solo da $x$.

[[grafico:famiglia]]

Lo stesso procedimento funziona per ogni $f$ che sai integrare.

~ y' = 6x^2 - 2x :: un'altra equazione dello stesso tipo
~ y = \int (6x^2 - 2x)\,dx :: cerco tutte le primitive
~ y = 2x^3 - x^2 + \evidb{c} :: integro un termine alla volta, e aggiungo la costante
~ y' = 6x^2 - 2x :: controllo: derivando torna l'equazione

>! Senza $+c$ hai trovato **una** soluzione, non tutte. Nei problemi la costante serve: è lei che si sceglie con la condizione iniziale.

>! In $y' = \frac{1}{x}$ le primitive valgono su un intervallo alla volta. Per $x > 0$ le soluzioni sono $y = \ln x + c$.

?? Quali sono le soluzioni di $y' = \cos x$?
[ ] $y = -\sin x + c$
[x] $y = \sin x + c$
[ ] $y = \cos x + c$
=> La derivata di $\sin x$ è $\cos x$, quindi le primitive sono $\sin x + c$. Il segno meno serve per integrare $\sin x$, non $\cos x$.

> Chi integra fa già equazioni differenziali senza saperlo. La tabella degli integrali immediati è nell'argomento «Integrali».` },

    { id: 'campo-direzioni', titolo: 'Il campo delle direzioni', testo: R`Molte equazioni hanno la forma $y' = f(x, y)$: la derivata dipende dal punto $(x; y)$. In ogni punto del piano la formula dà un numero. È la **pendenza** che deve avere una soluzione che passa di lì.

[[video:equazioni-differenziali/campo-direzioni]]

>* Il **campo delle direzioni** di $y' = f(x, y)$ si disegna così: in tanti punti $(x; y)$ si traccia un trattino con pendenza $f(x, y)$. Le soluzioni sono le curve che in ogni punto sono tangenti al trattino.

Guarda $y' = y$. Nel punto $(1; 2)$ la pendenza è $2$. Nel punto $(-1; 0{,}5)$ è $0{,}5$. Sull'asse $x$, dove $y = 0$, i trattini sono orizzontali. Più in alto sono più ripidi. Sulla stessa riga sono paralleli, perché conta solo la quota $y$.

[[grafico:campoY]]

Una soluzione parte da un punto e segue i trattini. Da $(0; 1)$ si ottiene $y = e^x$, da $(0; 2)$ si ottiene $y = 2e^x$. In generale da $(0; c)$ si ottiene $y = c\,e^x$. Infatti la derivata di $c\,e^x$ è ancora $c\,e^x$.

Per disegnare il campo a mano conviene cercare le **isocline**: le linee dove la pendenza è sempre la stessa. Per $y' = y$ sono le rette orizzontali. Per $y' = x - y$, la pendenza zero sta sulla retta $y = x$.

?? Nel campo di $y' = x + y$, che pendenza ha il trattino nel punto $(1; 2)$?
[ ] $2$
[ ] $1$
[x] $3$
=> Si sostituiscono **tutte e due** le coordinate: $f(1, 2) = 1 + 2 = 3$. Il valore $2$ è solo la $y$ del punto.

>! Il trattino dà la pendenza della **soluzione** che passa per quel punto. Non è il grafico di $f$.

> Il campo funziona anche quando i conti non si sanno fare. Basta la formula di $f$ per vedere la forma delle soluzioni.` },

    { id: 'cauchy', titolo: 'Il problema di Cauchy', testo: R`Un'equazione differenziale ha infinite soluzioni. Per sceglierne una serve un dato in più: un punto da cui la curva deve passare.

[[video:equazioni-differenziali/condizione-iniziale]]

>* Un **problema di Cauchy** del primo ordine è un'equazione con una **condizione iniziale**: $$\begin{cases} y' = f(x, y) \\ y(x_0) = y_0 \end{cases}$$ Si cerca la soluzione che in $x_0$ vale $y_0$, cioè quella il cui grafico passa per $(x_0; y_0)$.

Si procede sempre in due tempi. Prima l'integrale generale, con la costante $c$. Poi si sostituisce la condizione e si ricava $c$.

~ y' = 2x, \quad y(1) = 3 :: equazione e condizione iniziale
~ y = x^2 + c :: l'integrale generale: tutte le primitive di $2x$
~ 1^2 + c = 3 :: in $x = 1$ la soluzione deve valere $3$
~ c = \evid{2} :: ricavo la costante
~ y = \evidb{x^2 + 2} :: l'unica soluzione del problema

Con la condizione $y(1) = 0$ si trova invece $1 + c = 0$, cioè $c = -1$, e la soluzione $y = x^2 - 1$.

[[grafico:cauchy]]

Il nome viene dal **teorema di esistenza e unicità**, dimostrato da Cauchy. Supponi che $f$ sia abbastanza regolare, per esempio un polinomio in $x$ e $y$. Allora il problema ha una e una sola soluzione vicino a $x_0$. L'ipotesi dei libri è che $f$ e $\frac{\partial f}{\partial y}$ siano continue vicino a $(x_0; y_0)$.

Senza ipotesi l'unicità può cadere. $y' = 3y^{2/3}$ con $y(0) = 0$ ha due soluzioni: $y = 0$ e $y = x^3$.

Ne segue un fatto utile. Due soluzioni diverse della stessa equazione **non si incrociano mai**. Nel punto d'incontro, infatti, lo stesso problema di Cauchy avrebbe due soluzioni.

?? Le soluzioni di $y' = 2x$ sono $y = x^2 + c$. Quale passa per $(0; 5)$?
[ ] $y = x^2 + 5x$
[x] $y = x^2 + 5$
[ ] $y = 5x^2$
=> In $x = 0$ si ha $0 + c = 5$, quindi $c = 5$. Le altre due funzioni valgono zero in $x = 0$, e comunque non sono della forma $x^2 + c$.

>! La condizione si mette **dopo** aver scritto la costante. Se scrivi solo $y = x^2$, nessun numero la fa passare per $(1; 3)$.

> Per un'equazione del secondo ordine le costanti sono due. Il problema di Cauchy chiede allora due condizioni: $y(x_0)$ e $y'(x_0)$.` },

    { id: 'separabili', titolo: 'Equazioni a variabili separabili', testo: R`Una quantità cala in proporzione a quanta ce n'è: $y' = -0{,}5\,y$. All'inizio ne hai $8$, cioè $y(0) = 8$. Come si trova $y$ con i conti?

[[video:equazioni-differenziali/separabili]]

>* Un'equazione è a **variabili separabili** se si scrive $$y' = g(x) \cdot h(y),$$ un fattore con sola $x$ per un fattore con sola $y$. Si scrive $y' = \frac{dy}{dx}$ e si portano le $y$ a sinistra e le $x$ a destra. Poi si integrano i due membri.

~ \frac{dy}{dx} = -0{,}5\,y :: scrivo $y'$ come $\frac{dy}{dx}$: è la stessa derivata
~ \frac{dy}{y} = -0{,}5\,dx :: separo: le $y$ a sinistra, le $x$ a destra
~ \int \frac{dy}{y} = \int -0{,}5\,dx :: integro i due membri
~ \ln y = -0{,}5\,x + \evid{c} :: una sola costante; $\ln|y| = \ln y$, perché $y$ parte da $8$
~ c = \ln 8 :: con $x = 0$ e $y = 8$
~ y = \evidb{8\,e^{-0{,}5x}} :: elevo $e$ ai due membri: il logaritmo se ne va

Controllo: $y' = -4\,e^{-0{,}5x} = -0{,}5\,y$. La quantità si dimezza ogni $\frac{\ln 2}{0{,}5} \approx 1{,}39$ unità di $x$.

[[grafico:separabili]]

### Le soluzioni costanti

Per separare hai diviso per $h(y)$. Se $h(y_0) = 0$, la funzione costante $y = y_0$ è una soluzione: $y' = 0$ e anche $g(x) \cdot h(y_0) = 0$. Dividendo, questa soluzione **si perde**.

Prendi $y' = y^2$. Per $y \ne 0$ separi e trovi $-\frac{1}{y} = x + c$, cioè $y = -\frac{1}{x + c}$. Ma anche $y = 0$ è soluzione, e nessun valore di $c$ la dà.

>! Prima di dividere per $h(y)$, risolvi $h(y) = 0$. Ogni soluzione $y_0$ dà una soluzione costante, da aggiungere alla fine.

>! La costante è **una sola**. Due costanti, una per membro, si riuniscono comunque in una.

?? Quale di queste equazioni **non** è a variabili separabili?
[ ] $y' = x\,y^2$
[ ] $y' = \frac{x}{y}$
[x] $y' = x + y$
=> Una somma non si spezza in un fattore con $x$ per un fattore con $y$. Le altre due sono $x \cdot y^2$ e $x \cdot \frac{1}{y}$.

> In $y' = ky$ la soluzione costante $y = 0$ rientra nella formula $y = A\,e^{kx}$ con $A = 0$. Per questo la si scrive con una costante qualunque davanti.` },

    { id: 'lineari', titolo: 'Equazioni lineari del primo ordine', testo: R`Un conto in banca rende il $5\%$ all'anno, con interesse continuo. In più ogni anno ci versi $1000$ euro, distribuiti nel tempo. La velocità con cui cresce il saldo è $y' = 0{,}05\,y + 1000$. È un'equazione **lineare**.

>* Un'equazione **lineare del primo ordine** si scrive $$y' + a(x)\,y = b(x).$$ $y$ e $y'$ compaiono al primo grado e non si moltiplicano fra loro. Se $A(x)$ è una primitiva di $a(x)$, l'integrale generale è $$y = e^{-A(x)} \left[ \int b(x)\,e^{A(x)}\,dx + c \right].$$

La formula viene da un trucco: il **fattore integrante** $e^{A(x)}$. Moltiplicando per lui, il primo membro diventa la derivata di un prodotto. Ecco il trucco su $y' + y = x$.

~ y' + y = x :: qui $a(x) = 1$ e $b(x) = x$
~ A(x) = x :: una primitiva di $a(x) = 1$
~ e^{x}y' + e^{x}y = x\,e^{x} :: moltiplico i due membri per $e^{A(x)} = e^x$
~ \evid{(e^{x}y)'} = x\,e^{x} :: a sinistra c'è la derivata del prodotto $e^x \cdot y$
~ e^{x}y = (x - 1)\,e^{x} + c :: integro; a destra si integra per parti
~ y = \evidb{x - 1 + c\,e^{-x}} :: divido per $e^x$

Controllo: $y' = 1 - c\,e^{-x}$, e $y' + y = x$ per ogni $c$. Quando $x$ cresce, $c\,e^{-x}$ tende a zero. Tutte le soluzioni si avvicinano alla retta $y = x - 1$, da qualunque punto partano.

[[grafico:lineare]]

>! Prima porta l'equazione in **forma normale**, con $y'$ da solo e coefficiente $1$. In $2y' + 6y = 4$ dividi per $2$: $a(x) = 3$, $b(x) = 2$.

>! Attento ai segni. In $y' - 3y = x$ il coefficiente è $a(x) = -3$, quindi $A(x) = -3x$.

>! La costante $c$ sta **dentro** la parentesi e viene moltiplicata per $e^{-A(x)}$. Non si aggiunge alla fine.

?? Quale equazione è lineare del primo ordine?
[x] $y' + x^2\,y = \sin x$
[ ] $y' + y^2 = x$
[ ] $y\,y' = x$
=> In $y' + x^2\,y = \sin x$ la $y$ e la $y'$ sono al primo grado: $a(x) = x^2$ e $b(x) = \sin x$. Nelle altre compaiono $y^2$ e il prodotto $y\,y'$.

> Se $b(x) = 0$ l'equazione si dice **omogenea**, ed è anche a variabili separabili: $y = c\,e^{-A(x)}$.` },

    { id: 'crescita-decadimento', titolo: 'Crescita e decadimento esponenziale', testo: R`Una colonia di batteri, se ha cibo e spazio, cresce in proporzione a quanti batteri ci sono. Una sostanza radioattiva perde ogni secondo una parte fissa dei suoi atomi. Tutte e due seguono la stessa equazione.

>* Se una grandezza cambia con velocità **proporzionale a sé stessa**, $$y' = k\,y,$$ allora $y = y_0\,e^{kx}$, dove $y_0 = y(0)$ è il valore iniziale. Con $k > 0$ è una **crescita** esponenziale, con $k < 0$ un **decadimento**.

È un'equazione a variabili separabili, ed è anche lineare. La soluzione si controlla subito: la derivata di $y_0\,e^{kx}$ è $k \cdot y_0\,e^{kx} = k\,y$.

### Il decadimento radioattivo

Il numero $N$ di atomi radioattivi segue $N' = -\lambda N$, con $\lambda > 0$. Quindi $N(t) = N_0\,e^{-\lambda t}$. Il **tempo di dimezzamento** $T$ è il tempo dopo cui ne resta metà.

~ N_0\,e^{-\lambda T} = \frac{N_0}{2} :: dopo un tempo $T$ ne resta metà
~ e^{-\lambda T} = \frac12 :: semplifico $N_0$: $T$ non dipende da quanto se ne ha
~ -\lambda T = -\ln 2 :: prendo il logaritmo dei due membri
~ T = \evidb{\frac{\ln 2}{\lambda}} :: con $\lambda = 0{,}1$ al giorno, $T \approx 6{,}93$ giorni

È la stessa legge dell'argomento «Esponenziali». Con $\lambda = \frac{\ln 2}{T}$ si ha $e^{-\lambda t} = \left(\frac12\right)^{t/T}$, quindi $N(t) = N_0\left(\frac12\right)^{t/T}$.

### Il raffreddamento di Newton

Un tè a $90$ °C è in una stanza a $20$ °C. Si raffredda tanto più in fretta quanto più è caldo rispetto alla stanza. È la **legge di Newton**: $$T' = -k\,(T - T_a),$$ dove $T_a$ è la temperatura dell'ambiente. Chiama $u = T - T_a$: hai $u' = T'$, quindi $u' = -k\,u$. È di nuovo un decadimento.

~ T - T_a = (T_0 - T_a)\,e^{-kt} :: la differenza con l'ambiente decade come un esponenziale
~ T(t) = 20 + 70\,e^{-0{,}1t} :: con $T_0 = 90$, $T_a = 20$ e $k = 0{,}1$ al minuto
~ T(10) = 20 + 70\,e^{-1} \approx \evidb{45{,}8}\ ^\circ\text{C} :: dopo dieci minuti

[[grafico:raffreddamento]]

>! Il tè non arriva a $0$ °C: tende alla temperatura della **stanza**. Una bibita fredda, nella stessa stanza, si scalda verso $20$ °C.

>! Il segno di $k$ decide tutto. Con $k > 0$ la grandezza cresce senza limite, con $k < 0$ tende a zero. Un segno sbagliato trasforma un decadimento in una crescita.

?? Una sostanza segue $N' = -0{,}2\,N$. Dopo quanto tempo ne resta metà?
[ ] $0{,}2 \cdot \ln 2 \approx 0{,}14$
[x] $\frac{\ln 2}{0{,}2} \approx 3{,}47$
[ ] $\frac{0{,}2}{\ln 2} \approx 0{,}29$
=> $T = \frac{\ln 2}{\lambda}$ con $\lambda = 0{,}2$. Il dimezzamento è tanto più lungo quanto più $\lambda$ è piccolo, quindi $\lambda$ sta al denominatore.` },

    { id: 'logistica', titolo: 'La crescita logistica', testo: R`Una popolazione non può crescere per sempre come un'esponenziale. Spazio e cibo finiscono. C'è un **tetto**, che i biologi chiamano capacità portante.

[[video:equazioni-differenziali/logistica]]

$y$ è la popolazione e $x$ il tempo. Senza freni la crescita è $y' = r\,y$, con $r$ tasso di crescita. Il tetto è $K$. Si aggiunge un freno, il fattore $1 - \frac{y}{K}$: vale quasi $1$ quando $y$ è piccola, e $0$ quando $y$ arriva al tetto.

>* L'**equazione logistica** è $$y' = r\,y\left(1 - \frac{y}{K}\right), \qquad r > 0,\ K > 0.$$ Con $0 < y_0 < K$ la soluzione è $$y = \frac{K}{1 + \frac{K - y_0}{y_0}\,e^{-rx}}.$$ Cresce sempre, ma resta sotto $K$, e per $x \to +\infty$ tende a $K$.

È a variabili separabili. Le soluzioni costanti sono $y = 0$ e $y = K$, dove il secondo membro si annulla. Per le altre servono i fratti semplici.

~ \frac{dy}{y\left(1 - \frac{y}{K}\right)} = r\,dx :: separo, per $0 < y < K$
~ \left(\frac{1}{y} + \frac{1}{K - y}\right)dy = r\,dx :: scompongo in fratti semplici
~ \ln \frac{y}{K - y} = r x + c :: integro: $\ln y - \ln(K - y)$
~ \frac{y}{K - y} = \frac{y_0}{K - y_0}\,e^{rx} :: elevo $e$ e uso $y(0) = y_0$
~ y = \evidb{\frac{K}{1 + \frac{K - y_0}{y_0}\,e^{-rx}}} :: ricavo $y$

Con $r = 1$, $K = 10$ e $y_0 = 0{,}5$ viene $y = \frac{10}{1 + 19\,e^{-x}}$. All'inizio è quasi uguale a $0{,}5\,e^x$. Poi si stacca e si appoggia sul tetto.

[[grafico:logistica]]

La velocità $y' = y\left(1 - \frac{y}{10}\right)$ è una parabola in $y$, nulla in $0$ e in $10$. È massima a metà, per $y = 5$, dove vale $2{,}5$. Lì la curva cambia concavità: è il **flesso**. Succede per $x = \ln 19 \approx 2{,}94$. Prima del flesso la crescita accelera, dopo frena.

>* Se $0 < y_0 < K$, il flesso della logistica sta a metà del tetto, $y = \frac{K}{2}$. Lì la crescita è più rapida, con $y' = \frac{rK}{4}$. Se $y_0 > K$ la curva scende verso $K$ senza flessi.

>! La logistica non è lineare: sviluppando compare $y^2$. La formula delle lineari qui non vale.

?? Con $K = 500$ una popolazione parte da $600$ individui. Che cosa succede?
[ ] Cresce senza limite, perché è già sopra il tetto.
[ ] Resta ferma a $600$.
[x] Diminuisce e si avvicina a $500$.
=> Con $y > K$ il freno $1 - \frac{y}{K}$ è negativo, quindi $y' < 0$. La popolazione cala e si avvicina al tetto, da sopra.` },

    { id: 'secondo-ordine', titolo: 'Il secondo ordine, in breve', testo: R`Una massa appesa a una molla, spostata e lasciata andare, oscilla su e giù. La forza della molla è proporzionale allo spostamento, e la forza è massa per accelerazione. L'accelerazione è la derivata **seconda** della posizione.

>* L'equazione dell'**oscillatore armonico** è $$y'' + \omega^2 y = 0, \qquad \omega > 0.$$ Le soluzioni sono $y = c_1 \cos(\omega x) + c_2 \sin(\omega x)$. Le costanti sono **due**: per scegliere una sola soluzione servono $y(x_0)$ e $y'(x_0)$.

Con $y'' + 4y = 0$, $y(0) = 1$ e $y'(0) = 0$ si trova $y = \cos(2x)$. Controllo: $y'' = -4\cos(2x) = -4y$.

### Coefficienti costanti e l'equazione caratteristica

Più in generale si studia $a\,y'' + b\,y' + c\,y = 0$, con $a$, $b$, $c$ numeri. Si prova con $y = e^{\lambda x}$. Sostituendo, si divide tutto per $e^{\lambda x}$, che non è mai zero. Resta un'equazione di secondo grado.

>* L'**equazione caratteristica** è $a\lambda^2 + b\lambda + c = 0$. Dal suo discriminante $\Delta$ viene l'integrale generale.

| $\Delta$ | radici | integrale generale |
|---|---|---|
| $\Delta > 0$ | $\lambda_1 \ne \lambda_2$ reali | $c_1 e^{\lambda_1 x} + c_2 e^{\lambda_2 x}$ |
| $\Delta = 0$ | $\lambda$ doppia | $(c_1 + c_2 x)\,e^{\lambda x}$ |
| $\Delta < 0$ | $\alpha \pm i\beta$ | $e^{\alpha x}\left(c_1 \cos \beta x + c_2 \sin \beta x\right)$ |

~ y'' - 3y' + 2y = 0 :: un'equazione a coefficienti costanti
~ \lambda^2 - 3\lambda + 2 = 0 :: l'equazione caratteristica
~ \lambda_1 = 1, \quad \lambda_2 = 2 :: $\Delta = 1 > 0$: due radici reali
~ y = \evidb{c_1 e^{x} + c_2 e^{2x}} :: l'integrale generale

Con $\Delta < 0$ le soluzioni oscillano. In $y'' + y' + 4{,}25\,y = 0$ le radici sono $-0{,}5 \pm 2i$. Le soluzioni sono oscillazioni che si spengono, come una molla immersa nell'olio.

[[grafico:oscillatore]]

>! Nel caso $\Delta = 0$ non basta $c_1 e^{\lambda x}$: serve anche il termine $c_2\,x\,e^{\lambda x}$. Altrimenti resta una costante sola.

> A volte a destra c'è una funzione al posto dello zero. Allora l'integrale generale è quello dell'omogenea associata, con lo zero, più **una** soluzione particolare. Per questo cenno basta saperlo riconoscere.` }
  ],

  grafici: {
    famiglia: Object.assign({ tipo: 'piano', passo: [1, 1] }, F_FAM, {
      parametri: [{ nome: 'c', min: -2.5, max: 5, passo: 0.1, valore: 1, nascosto: true }],
      funzioni: [
        { f: 'x^2 - 2', colore: 3, tratteggio: true },
        { f: 'x^2 + 4', colore: 3, tratteggio: true },
        { f: 'x^2 + c', colore: 1 }
      ],
      elementi: campo(function (x) { return 2 * x; }, F_FAM, passi(-2.75, 2.75, 0.5), passi(-1.5, 6.5, 1), 22).concat([
        { tipo: 'punto', p: [0, 'c'], trascina: true, etichetta: '(0; {{c}})', posizione: 'destra', colore: 1 },
        { tipo: 'testo', p: [-2.9, -2.6], testo: 'y = x² + c   con c = {{c}}', ancora: 'start' }
      ]),
      didascalia: 'y′ = 2x: i trattini viola danno la pendenza 2x, uguale lungo ogni verticale. Le soluzioni y = x² + c sono la stessa parabola spostata in su o in giù; il punto blu sull\'asse y sceglie c. Tratteggiate, c = −2 e c = 4.'
    }),
    campoY: Object.assign({ tipo: 'piano', passo: [1, 1] }, F_Y, {
      parametri: [{ nome: 'c', min: -1.2, max: 4, passo: 0.1, valore: 1, nascosto: true }],
      funzioni: [{ f: 'c*exp(x)', colore: 1 }],
      elementi: campo(function (x, y) { return y; }, F_Y, passi(-2.25, 2.25, 0.5), passi(-1, 4, 0.5), 22).concat([
        { tipo: 'punto', p: [0, 'c'], trascina: true, etichetta: '(0; {{c}})', posizione: 'sinistra', colore: 1 },
        { tipo: 'testo', p: [-2.4, 4.15], testo: 'y = {{c}}·eˣ', ancora: 'start' }
      ]),
      didascalia: 'Il campo delle direzioni di y′ = y: sulla stessa riga i trattini sono paralleli, più in alto sono più ripidi, sull\'asse x sono orizzontali. La curva blu parte da (0; c) e segue i trattini: è y = c·eˣ. Con c negativo scende, con c = 0 è l\'asse x.'
    }),
    cauchy: {
      tipo: 'piano', x: [-3, 3], y: [-3, 8], passo: [1, 1],
      parametri: [{ nome: 'c', min: -3, max: 6, passo: 0.1, valore: -1, nascosto: true }],
      funzioni: [
        { f: 'x^2 - 2', colore: 3, tratteggio: true },
        { f: 'x^2', colore: 3, tratteggio: true },
        { f: 'x^2 + 4', colore: 3, tratteggio: true },
        { f: 'x^2 + c', colore: 1 }
      ],
      punti: [{ x: 1, y: 3, etichetta: 'P(1; 3)', posizione: 'destra', colore: 2 }],
      elementi: [
        { tipo: 'segmento', da: [1, 0], a: [1, 3], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: [0, 'c'], trascina: true, colore: 1 },
        { tipo: 'testo', p: [-2.9, 7.3], testo: 'c = {{c}}    y(1) = {{1 + c}}', ancora: 'start' }
      ],
      didascalia: 'Le soluzioni di y′ = 2x sono le parabole y = x² + c. La condizione y(1) = 3 vuole la parabola che passa per P(1; 3): succede solo con c = 2, cioè y = x² + 2. Il punto blu sull\'asse y sposta la parabola.'
    },
    separabili: Object.assign({ tipo: 'piano', passo: [1, 1] }, F_SEP, {
      funzioni: [{ f: '8*exp(-0.5x)', etichetta: 'y = 8e^(−0,5x)', colore: 1 }],
      punti: [
        { x: 0, y: 8, etichetta: '(0; 8)', posizione: 'destra', colore: 2 },
        { x: 2 * LN2, y: 4, etichetta: '4', posizione: 'alto-destra', colore: 2 },
        { x: 4 * LN2, y: 2, etichetta: '2', posizione: 'alto-destra', colore: 2 },
        { x: 6 * LN2, y: 1, etichetta: '1', posizione: 'alto-destra', colore: 2 }
      ],
      elementi: campo(function (x, y) { return -0.5 * y; }, F_SEP, passi(-0.25, 6.25, 0.5), passi(-0.5, 8.5, 1), 22),
      didascalia: 'y′ = −0,5·y con y(0) = 8. La soluzione trovata con i conti segue i trattini del campo. Ogni volta che x avanza di ln 2 / 0,5 ≈ 1,39, la y si dimezza: 8, 4, 2, 1.'
    }),
    lineare: Object.assign({ tipo: 'piano', passo: [1, 1] }, F_LIN, {
      parametri: [{ nome: 'q', min: -2.8, max: 5.5, passo: 0.1, valore: 4, nascosto: true }],
      funzioni: [{ f: 'x - 1 + (q + 1)*exp(-x)', colore: 1 }],
      elementi: campo(function (x, y) { return x - y; }, F_LIN, passi(-1.25, 4.75, 0.5), passi(-2.5, 5.5, 1), 22).concat([
        { tipo: 'retta', m: 1, q: -1, tratteggio: true, colore: 3, etichetta: 'y = x − 1' },
        { tipo: 'punto', p: [0, 'q'], trascina: true, etichetta: 'y(0) = {{q}}', posizione: 'destra', colore: 1 }
      ]),
      didascalia: 'y′ + y = x, cioè y′ = x − y. Le soluzioni sono y = x − 1 + c·e^(−x): da qualunque punto dell\'asse y partano, si avvicinano alla retta tratteggiata y = x − 1, che è anche lei una soluzione (c = 0).'
    }),
    raffreddamento: {
      tipo: 'piano', x: [0, 40], y: [0, 100], passo: [5, 10], altezza: 340,
      etichette: { x: 't', y: 'T' },
      funzioni: [
        { f: '20 + 70*exp(-0.1x)', colore: 2 },
        { f: '20 - 15*exp(-0.1x)', colore: 1 }
      ],
      punti: [
        { x: 0, y: 90, colore: 2 },
        { x: 10, y: '20 + 70*exp(-1)', etichetta: '45,8 °C', posizione: 'alto-destra', colore: 2 },
        { x: 0, y: 5, colore: 1 }
      ],
      elementi: [
        { tipo: 'orizzontale', y: 20, tratteggio: true, colore: 4, etichetta: 'stanza: 20 °C' },
        { tipo: 'testo', p: [9, 72], testo: 'tè, da 90 °C' },
        { tipo: 'testo', p: [12, 4], testo: 'bibita, da 5 °C' }
      ],
      didascalia: 'La legge di Newton con k = 0,1 al minuto in una stanza a 20 °C (t in minuti, T in °C). Il tè parte da 90 °C e scende: dopo 10 minuti è a circa 45,8 °C. Una bibita a 5 °C si scalda. Tutte e due tendono alla temperatura della stanza.'
    },
    logistica: {
      tipo: 'piano', x: [-0.5, 8], y: [-1, 12], passo: [1, 2], altezza: 380,
      funzioni: [
        { f: '0.5*exp(x)', etichetta: '0,5·eˣ', colore: 2, tratteggio: true, dominio: [-0.5, 3.18] },
        { f: '10/(1 + 19*exp(-x))', colore: 1 }
      ],
      punti: [
        { x: 0, y: 0.5, colore: 1 },
        { x: 'ln(19)', y: 5, etichetta: 'F', posizione: 'destra', colore: 4 }
      ],
      elementi: [{ tipo: 'orizzontale', y: 10, tratteggio: true, colore: 3, etichetta: 'K = 10' }],
      didascalia: 'La logistica y′ = y(1 − y/10) con y(0) = 0,5. All\'inizio la curva blu corre accanto all\'esponenziale 0,5·eˣ (tratteggio arancio), poi si stacca e si appoggia sul tetto K = 10. Il flesso F è a metà tetto, in (ln 19; 5) ≈ (2,94; 5).'
    },
    oscillatore: {
      tipo: 'piano', x: [0, 8], y: [-1.4, 1.4], passo: [1, 0.5], altezza: 300,
      funzioni: [
        { f: 'cos(2x)', colore: 1 },
        { f: 'exp(-0.5x)*cos(2x)', colore: 2 },
        { f: 'exp(-0.5x)', colore: 4, tratteggio: true },
        { f: '-exp(-0.5x)', colore: 4, tratteggio: true }
      ],
      didascalia: 'In blu y = cos(2x), soluzione di y″ + 4y = 0: un\'oscillazione che non finisce mai. In arancio y = e^(−0,5x)·cos(2x), soluzione di y″ + y′ + 4,25y = 0: oscilla dentro le curve tratteggiate ±e^(−0,5x) e si spegne.'
    }
  },

  esempi: [
    { titolo: 'Un problema di Cauchy con y′ = f(x)', problema: R`Risolvi il problema di Cauchy $y' = 3x^2 - 2$, $y(1) = 4$.`, passi: [
      R`L'equazione ha a destra solo la $x$: le soluzioni sono le primitive di $3x^2 - 2$.`,
      R`Integrale generale: $y = x^3 - 2x + c$. Derivando torna $3x^2 - 2$, quindi è giusto.`,
      R`Condizione iniziale: in $x = 1$ deve valere $4$. Quindi $1 - 2 + c = 4$, cioè $c = 5$.`,
      R`La soluzione è $y = x^3 - 2x + 5$. Controllo: $y(1) = 1 - 2 + 5 = 4$.`
    ], risultato: R`$y = x^3 - 2x + 5$` },

    { titolo: 'Variabili separabili, con l\'intervallo giusto', problema: R`Risolvi $y' = x\,y^2$ con $y(0) = 1$, e indica l'intervallo in cui vale la soluzione.`, passi: [
      R`È a variabili separabili: $g(x) = x$ e $h(y) = y^2$. Prima le soluzioni costanti: $y^2 = 0$ dà $y = 0$. Non passa per $(0; 1)$, quindi qui non serve.`,
      R`Per $y \ne 0$ separi: $\dfrac{dy}{y^2} = x\,dx$. Integri i due membri: $-\dfrac{1}{y} = \dfrac{x^2}{2} + c$.`,
      R`Con $x = 0$ e $y = 1$: $-1 = c$. Quindi $-\dfrac{1}{y} = \dfrac{x^2 - 2}{2}$, cioè $y = \dfrac{2}{2 - x^2}$.`,
      R`Controllo: $y' = \dfrac{4x}{(2 - x^2)^2} = x \cdot \left(\dfrac{2}{2 - x^2}\right)^2 = x\,y^2$.`,
      R`La formula non esiste in $x = \pm\sqrt{2}$. La soluzione del problema vive nell'intervallo che contiene $x_0 = 0$: $\Iaa{-\sqrt{2}}{\sqrt{2}}$. Vicino a $\pm\sqrt{2}$ esplode verso $+\infty$.`
    ], risultato: R`$y = \dfrac{2}{2 - x^2}$, per $x \in \Iaa{-\sqrt{2}}{\sqrt{2}}$` },

    { titolo: 'Un\'equazione lineare con il fattore integrante', problema: R`Risolvi $y' + 2x\,y = 2x$ con $y(0) = 3$.`, passi: [
      R`È lineare con $a(x) = 2x$ e $b(x) = 2x$. Una primitiva di $a$ è $A(x) = x^2$, quindi il fattore integrante è $e^{x^2}$.`,
      R`Moltiplichi per $e^{x^2}$: il primo membro diventa $\left(e^{x^2} y\right)'$. Quindi $\left(e^{x^2} y\right)' = 2x\,e^{x^2}$.`,
      R`Integri: $2x\,e^{x^2}$ è la derivata di $e^{x^2}$. Quindi $e^{x^2} y = e^{x^2} + c$, cioè $y = 1 + c\,e^{-x^2}$.`,
      R`Condizione: $y(0) = 1 + c = 3$, quindi $c = 2$.`,
      R`Controllo: $y' = -4x\,e^{-x^2}$, e $y' + 2xy = -4x\,e^{-x^2} + 2x + 4x\,e^{-x^2} = 2x$.`
    ], risultato: R`$y = 1 + 2e^{-x^2}$` },

    { titolo: 'Raffreddamento: quando arriva a 30 °C?', problema: R`Un oggetto a $100$ °C è in una stanza a $20$ °C. Dopo $10$ minuti è a $60$ °C. Con la legge di Newton, dopo quanto tempo arriva a $30$ °C?`, passi: [
      R`La legge $T' = -k(T - 20)$ dà $T(t) = 20 + 80\,e^{-kt}$, perché all'inizio la differenza con la stanza è $100 - 20 = 80$.`,
      R`Dopo $10$ minuti: $20 + 80\,e^{-10k} = 60$, quindi $e^{-10k} = \dfrac{1}{2}$. In $10$ minuti la differenza con la stanza si **dimezza**.`,
      R`Arrivare a $30$ °C vuol dire differenza $10$, cioè $\dfrac{80}{8}$: servono tre dimezzamenti.`,
      R`Tre dimezzamenti sono $3 \cdot 10 = 30$ minuti. Con i conti: $e^{-kt} = \dfrac18 = \left(e^{-10k}\right)^3$, quindi $t = 30$.`
    ], risultato: R`Dopo $30$ minuti` },

    { titolo: 'Una popolazione logistica', problema: R`Una popolazione segue $y' = 0{,}5\,y\left(1 - \dfrac{y}{1000}\right)$, con $y(0) = 100$ e il tempo in anni. Scrivi $y(t)$, trova quando arriva a $500$ e quanto vale dopo $10$ anni.`, passi: [
      R`È una logistica con $r = 0{,}5$, $K = 1000$ e $y_0 = 100$. Il coefficiente davanti all'esponenziale è $\dfrac{K - y_0}{y_0} = \dfrac{900}{100} = 9$.`,
      R`Quindi $y(t) = \dfrac{1000}{1 + 9\,e^{-0{,}5t}}$. Controllo: $y(0) = \dfrac{1000}{10} = 100$.`,
      R`$500$ è metà del tetto: lì c'è il flesso. Serve $1 + 9\,e^{-0{,}5t} = 2$, cioè $e^{-0{,}5t} = \dfrac19$, quindi $t = 2\ln 9 \approx 4{,}39$ anni.`,
      R`Dopo $10$ anni: $y(10) = \dfrac{1000}{1 + 9\,e^{-5}} \approx 943$. La popolazione è ormai vicina al tetto.`
    ], risultato: R`$y(t) = \dfrac{1000}{1 + 9e^{-0{,}5t}}$; metà tetto dopo circa $4{,}39$ anni; $y(10) \approx 943$` },

    { titolo: 'Secondo ordine con due condizioni', problema: R`Risolvi $y'' - y' - 6y = 0$ con $y(0) = 0$ e $y'(0) = 5$.`, passi: [
      R`Equazione caratteristica: $\lambda^2 - \lambda - 6 = 0$, con $\Delta = 25 > 0$. Le radici sono $\lambda_1 = 3$ e $\lambda_2 = -2$.`,
      R`Integrale generale: $y = c_1 e^{3x} + c_2 e^{-2x}$, e quindi $y' = 3c_1 e^{3x} - 2c_2 e^{-2x}$.`,
      R`Le due condizioni danno un sistema: $c_1 + c_2 = 0$ e $3c_1 - 2c_2 = 5$.`,
      R`Dalla prima $c_2 = -c_1$. Nella seconda: $3c_1 + 2c_1 = 5$, cioè $c_1 = 1$ e $c_2 = -1$.`,
      R`Controllo: $y(0) = 1 - 1 = 0$ e $y'(0) = 3 + 2 = 5$.`
    ], risultato: R`$y = e^{3x} - e^{-2x}$` }
  ],

  formulario: [
    { nome: 'Soluzione di un\'equazione differenziale', formula: R`y = \varphi(x) \text{ è soluzione se, sostituita con le sue derivate, dà un'identità}`, nota: R`Si verifica sostituendo, senza risolvere.` },
    { nome: 'Equazione y\' = f(x)', formula: R`y' = f(x) \ \Rightarrow \ y = \int f(x)\,dx = F(x) + c`, nota: R`Le soluzioni sono le primitive di $f$: una famiglia di curve spostate in verticale.` },
    { nome: 'Problema di Cauchy', formula: R`\begin{cases} y' = f(x, y) \\ y(x_0) = y_0 \end{cases}`, nota: R`Prima l'integrale generale con la costante $c$, poi la condizione per trovare $c$.` },
    { nome: 'Variabili separabili', formula: R`y' = g(x)\,h(y) \ \Rightarrow \ \int \frac{dy}{h(y)} = \int g(x)\,dx`, nota: R`Gli zeri di $h$ danno le soluzioni costanti, da aggiungere a parte.` },
    { nome: 'Equazione lineare del primo ordine', formula: R`y' + a(x)\,y = b(x) \ \Rightarrow \ y = e^{-A(x)} \left[ \int b(x)\,e^{A(x)}\,dx + c \right]`, nota: R`$A(x)$ è una primitiva di $a(x)$. Prima si porta l'equazione in forma normale.` },
    { nome: 'Crescita e decadimento esponenziale', formula: R`y' = k\,y \ \Rightarrow \ y = y_0\,e^{kx}`, nota: R`$k > 0$ crescita, $k < 0$ decadimento; $y_0 = y(0)$.` },
    { nome: 'Tempo di dimezzamento', formula: R`N' = -\lambda N \ \Rightarrow \ T = \frac{\ln 2}{\lambda}`, nota: R`Non dipende dalla quantità iniziale.` },
    { nome: 'Raffreddamento di Newton', formula: R`T' = -k\,(T - T_a) \ \Rightarrow \ T(t) = T_a + (T_0 - T_a)\,e^{-kt}`, nota: R`La temperatura tende a quella dell'ambiente $T_a$.` },
    { nome: 'Equazione logistica', formula: R`y' = r\,y\left(1 - \frac{y}{K}\right) \ \Rightarrow \ y = \frac{K}{1 + \frac{K - y_0}{y_0}\,e^{-rx}}`, nota: R`Soluzioni costanti $y = 0$ e $y = K$. Se $0 < y_0 < K$, flesso per $y = \frac{K}{2}$, dove $y' = \frac{rK}{4}$ è massima.` },
    { nome: 'Oscillatore armonico', formula: R`y'' + \omega^2 y = 0 \ \Rightarrow \ y = c_1 \cos(\omega x) + c_2 \sin(\omega x)`, nota: R`Due costanti: servono due condizioni, $y(x_0)$ e $y'(x_0)$.` },
    { nome: 'Equazione caratteristica', formula: R`a\,y'' + b\,y' + c\,y = 0 \ \rightarrow \ a\lambda^2 + b\lambda + c = 0`, nota: R`Si ottiene provando $y = e^{\lambda x}$.` },
    { nome: 'Integrale generale del secondo ordine', formula: R`\begin{cases} c_1 e^{\lambda_1 x} + c_2 e^{\lambda_2 x} & \Delta > 0 \\ (c_1 + c_2 x)\,e^{\lambda x} & \Delta = 0 \\ e^{\alpha x}(c_1 \cos \beta x + c_2 \sin \beta x) & \Delta < 0,\ \lambda = \alpha \pm i\beta \end{cases}` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'che-cos-e', tipo: 'definizione', fronte: R`Equazione differenziale`, retro: R`Un'equazione in cui l'incognita è una funzione $y(x)$ e compaiono alcune sue derivate.` },
    { id: 'fc-02', sezione: 'che-cos-e', tipo: 'definizione', fronte: R`Ordine di un'equazione differenziale`, retro: R`L'ordine della derivata più alta che vi compare. $y'' + 4y = 0$ è del secondo ordine.` },
    { id: 'fc-03', sezione: 'che-cos-e', tipo: 'procedura', fronte: R`Come si verifica che una funzione è soluzione?`, retro: R`Si calcolano le derivate, si sostituisce nell'equazione e si controlla che i due membri coincidano per ogni $x$.` },
    { id: 'fc-04', sezione: 'primitive', tipo: 'formula', fronte: R`Soluzioni di $y' = f(x)$`, retro: R`Le primitive di $f$: $y = F(x) + c$, con $F' = f$ e $c$ numero qualunque.` },
    { id: 'fc-05', sezione: 'primitive', tipo: 'definizione', fronte: R`Integrale generale e integrale particolare`, retro: R`Il generale è la famiglia di tutte le soluzioni, con le costanti. Un particolare è una soluzione sola, con le costanti fissate.` },
    { id: 'fc-06', sezione: 'campo-direzioni', tipo: 'definizione', fronte: R`Campo delle direzioni di $y' = f(x, y)$`, retro: R`In tanti punti $(x; y)$ un trattino con pendenza $f(x, y)$. Le soluzioni sono le curve tangenti ai trattini.` },
    { id: 'fc-07', sezione: 'campo-direzioni', tipo: 'definizione', fronte: R`Isoclina`, retro: R`Una linea del piano su cui il campo ha sempre la stessa pendenza. Per $y' = y$ sono le rette orizzontali.` },
    { id: 'fc-08', sezione: 'cauchy', tipo: 'definizione', fronte: R`Problema di Cauchy del primo ordine`, retro: R`Un'equazione $y' = f(x, y)$ con una condizione iniziale $y(x_0) = y_0$: si cerca la soluzione che passa per $(x_0; y_0)$.` },
    { id: 'fc-09', sezione: 'cauchy', tipo: 'procedura', fronte: R`Come si risolve un problema di Cauchy?`, retro: R`Prima l'integrale generale, con la costante; poi si sostituisce $x_0$ e $y_0$ e si ricava la costante.` },
    { id: 'fc-10', sezione: 'cauchy', tipo: 'concetto', fronte: R`Due soluzioni diverse della stessa equazione possono incrociarsi?`, retro: R`No, se $f$ è regolare: nel punto d'incontro il problema di Cauchy avrebbe due soluzioni, contro il teorema di esistenza e unicità.` },
    { id: 'fc-11', sezione: 'separabili', tipo: 'definizione', fronte: R`Equazione a variabili separabili`, retro: R`Un'equazione del tipo $y' = g(x) \cdot h(y)$: un fattore con sola $x$ per un fattore con sola $y$.` },
    { id: 'fc-12', sezione: 'separabili', tipo: 'procedura', fronte: R`Come si risolve $y' = g(x)\,h(y)$?`, retro: R`Si cercano gli zeri di $h$ (soluzioni costanti); poi $\int \frac{dy}{h(y)} = \int g(x)\,dx$, con una sola costante, e si ricava $y$.` },
    { id: 'fc-13', sezione: 'separabili', tipo: 'concetto', fronte: R`Quali soluzioni si perdono separando le variabili?`, retro: R`Le soluzioni costanti $y = y_0$ con $h(y_0) = 0$, perché per separare si divide per $h(y)$.` },
    { id: 'fc-14', sezione: 'lineari', tipo: 'definizione', fronte: R`Equazione lineare del primo ordine`, retro: R`$y' + a(x)\,y = b(x)$: $y$ e $y'$ compaiono al primo grado e non si moltiplicano fra loro.` },
    { id: 'fc-15', sezione: 'lineari', tipo: 'formula', fronte: R`Integrale generale di $y' + a(x)\,y = b(x)$`, retro: R`$y = e^{-A(x)} \left[ \int b(x)\,e^{A(x)}\,dx + c \right]$, con $A$ primitiva di $a$.` },
    { id: 'fc-16', sezione: 'lineari', tipo: 'concetto', fronte: R`Che cosa fa il fattore integrante $e^{A(x)}$?`, retro: R`Moltiplicando per lui, il primo membro $y' + a(x)\,y$ diventa la derivata del prodotto $e^{A(x)}\,y$.` },
    { id: 'fc-17', sezione: 'crescita-decadimento', tipo: 'formula', fronte: R`Soluzione di $y' = k\,y$ con $y(0) = y_0$`, retro: R`$y = y_0\,e^{kx}$: crescita se $k > 0$, decadimento se $k < 0$.` },
    { id: 'fc-18', sezione: 'crescita-decadimento', tipo: 'formula', fronte: R`Tempo di dimezzamento di $N' = -\lambda N$`, retro: R`$T = \dfrac{\ln 2}{\lambda}$. Non dipende da quanta sostanza c'è all'inizio.` },
    { id: 'fc-19', sezione: 'crescita-decadimento', tipo: 'formula', fronte: R`Legge del raffreddamento di Newton`, retro: R`$T' = -k(T - T_a)$, con soluzione $T(t) = T_a + (T_0 - T_a)\,e^{-kt}$: la temperatura tende a quella dell'ambiente.` },
    { id: 'fc-20', sezione: 'logistica', tipo: 'formula', fronte: R`Equazione logistica`, retro: R`$y' = r\,y\left(1 - \dfrac{y}{K}\right)$: $r$ è il tasso di crescita, $K$ il tetto (capacità portante).` },
    { id: 'fc-21', sezione: 'logistica', tipo: 'concetto', fronte: R`Dov'è il flesso della curva logistica?`, retro: R`Se $0 < y_0 < K$, a metà del tetto, $y = \dfrac{K}{2}$: lì la crescita è più rapida, con $y' = \dfrac{rK}{4}$. Se $y_0 > K$ non c'è flesso.` },
    { id: 'fc-22', sezione: 'logistica', tipo: 'concetto', fronte: R`Logistica ed esponenziale: in che cosa si somigliano?`, retro: R`All'inizio, con $y$ piccola, il freno vale quasi $1$ e la logistica cresce come $y_0\,e^{rx}$. Poi rallenta e tende a $K$.` },
    { id: 'fc-23', sezione: 'secondo-ordine', tipo: 'formula', fronte: R`Soluzioni di $y'' + \omega^2 y = 0$`, retro: R`$y = c_1 \cos(\omega x) + c_2 \sin(\omega x)$: oscillazioni. Servono due condizioni per fissare $c_1$ e $c_2$.` },
    { id: 'fc-24', sezione: 'secondo-ordine', tipo: 'procedura', fronte: R`Come si risolve $a\,y'' + b\,y' + c\,y = 0$?`, retro: R`Si risolve l'equazione caratteristica $a\lambda^2 + b\lambda + c = 0$; secondo il segno di $\Delta$ si scrive l'integrale generale con due costanti.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Per quale valore di $k$ la funzione $y = e^{kx}$ è soluzione di $y' = -4y$?`, suggerimenti: [R`Deriva $e^{kx}$ e sostituisci.`], risposta: val(-4), soluzione: [R`$y' = k\,e^{kx}$. L'equazione chiede $k\,e^{kx} = -4\,e^{kx}$.`, R`$e^{kx}$ non è mai zero: si divide e resta $k = -4$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Qual è l'ordine dell'equazione $y''' + x\,y' = e^x$?`, suggerimenti: [R`Cerca la derivata più alta.`], risposta: val(3), soluzione: [R`Compaiono $y'''$ e $y'$: la derivata più alta è la terza.`, R`L'equazione è del terzo ordine. La $e^x$ a destra non conta: è una funzione nota.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`La funzione $y = x^5$ è soluzione di $x\,y' = k\,y$. Quanto vale $k$?`, suggerimenti: [R`Calcola $y'$ e sostituisci nei due membri.`], risposta: val(5), soluzione: [R`$y' = 5x^4$, quindi $x\,y' = 5x^5$.`, R`Deve essere $5x^5 = k\,x^5$ per ogni $x$: $k = 5$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Risolvi $y' = 4x^3$ con $y(0) = 2$, e calcola $y(1)$.`, suggerimenti: [R`Le soluzioni sono le primitive di $4x^3$.`], risposta: val(3), soluzione: [R`$y = x^4 + c$. Con $y(0) = 2$: $c = 2$.`, R`$y = x^4 + 2$, quindi $y(1) = 3$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Risolvi $y' = 6x - 2$ con $y(1) = 5$, e calcola $y(2)$.`, suggerimenti: [R`Integra, poi usa la condizione per trovare $c$.`], risposta: val(12), soluzione: [R`$y = 3x^2 - 2x + c$. In $x = 1$: $3 - 2 + c = 5$, quindi $c = 4$.`, R`$y = 3x^2 - 2x + 4$, e $y(2) = 12 - 4 + 4 = 12$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Risolvi $y' = \dfrac{1}{x}$ per $x > 0$, con $y(1) = 2$. Quanto vale $y(e^2)$?`, suggerimenti: [R`Una primitiva di $\frac{1}{x}$ per $x > 0$ è $\ln x$.`], risposta: val(4), soluzione: [R`$y = \ln x + c$. Con $y(1) = 2$: $0 + c = 2$.`, R`$y = \ln x + 2$, quindi $y(e^2) = 2 + 2 = 4$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Nel campo delle direzioni di $y' = x^2 - y$, che pendenza ha il trattino nel punto $(3; 2)$?`, suggerimenti: [R`Sostituisci tutte e due le coordinate in $x^2 - y$.`], risposta: val(7), soluzione: [R`$f(3, 2) = 3^2 - 2 = 9 - 2 = 7$.`, R`La soluzione che passa per $(3; 2)$ lì ha pendenza $7$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Nel campo di $y' = 8 - 2y$, a quale quota $y$ i trattini sono orizzontali?`, suggerimenti: [R`Orizzontale vuol dire pendenza zero.`], risposta: val(4), soluzione: [R`$8 - 2y = 0$ per $y = 4$.`, R`Sulla retta $y = 4$ i trattini sono orizzontali: $y = 4$ è anche una soluzione costante.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Trova le soluzioni costanti di $y' = y^2 - 9$. Scrivi i valori separati da punto e virgola.`, suggerimenti: [R`Una funzione costante ha derivata zero.`], risposta: xs(-3, 3), soluzione: [R`Se $y$ è costante, $y' = 0$: serve $y^2 - 9 = 0$.`, R`Le soluzioni costanti sono $y = -3$ e $y = 3$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Risolvi $y' = 3y$ con $y(0) = 2$, e calcola $y(1)$. Puoi scrivere il risultato esatto o arrotondato al centesimo.`, suggerimenti: [R`$y' = ky$ ha soluzioni $y = y_0\,e^{kx}$.`], risposta: val(2 * Math.exp(3), 0.01), soluzione: [R`$y = 2e^{3x}$: derivata $6e^{3x} = 3y$, e $y(0) = 2$.`, R`$y(1) = 2e^3 \approx 40{,}17$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Risolvi $y' = 2x\,y$ con $y(0) = 5$, e calcola $y(1)$.`, suggerimenti: [R`Separa: $\frac{dy}{y} = 2x\,dx$.`, R`Integrando hai $\ln y = x^2 + c$.`], risposta: val(5 * Math.E, 0.01), soluzione: [R`Separo e integro: $\ln y = x^2 + c$. Con $y(0) = 5$: $c = \ln 5$.`, R`$y = 5e^{x^2}$, quindi $y(1) = 5e \approx 13{,}59$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Risolvi $y' = -y^2$ con $y(0) = \frac{1}{2}$, e calcola $y(2)$.`, suggerimenti: [R`Separa: $\frac{dy}{y^2} = -dx$.`, R`Una primitiva di $\frac{1}{y^2}$ è $-\frac{1}{y}$.`], risposta: val(0.25), soluzione: [R`$-\frac{1}{y} = -x + c$, cioè $\frac{1}{y} = x - c$. Con $y(0) = \frac12$: $2 = -c$.`, R`$\frac{1}{y} = x + 2$, quindi $y = \frac{1}{x + 2}$ e $y(2) = \frac{1}{4}$.`] },
    { id: 'b-13', livello: 'base', difficolta: 1, testo: R`Le soluzioni di $y' + 2y = 6$ sono $y = 3 + c\,e^{-2x}$. A quale valore tendono tutte per $x \to +\infty$?`, suggerimenti: [R`Che cosa fa $e^{-2x}$ quando $x$ cresce?`], risposta: val(3), soluzione: [R`$e^{-2x} \to 0$, qualunque sia $c$.`, R`Tutte le soluzioni tendono a $3$, che è anche la soluzione costante.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Risolvi $y' + y = 2$ con $y(0) = 5$, e calcola $y(\ln 2)$.`, suggerimenti: [R`È lineare con $a(x) = 1$: il fattore integrante è $e^x$.`, R`Le soluzioni sono $y = 2 + c\,e^{-x}$.`], risposta: val(3.5), soluzione: [R`$(e^x y)' = 2e^x$, quindi $e^x y = 2e^x + c$ e $y = 2 + c\,e^{-x}$.`, R`$y(0) = 2 + c = 5$, quindi $c = 3$.`, R`$y(\ln 2) = 2 + 3 \cdot \frac{1}{2} = 3{,}5$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Risolvi $y' + \dfrac{y}{x} = 3$ per $x > 0$, con $y(1) = 2$. Quanto vale $y(2)$?`, suggerimenti: [R`$a(x) = \frac{1}{x}$, quindi $A(x) = \ln x$ e il fattore integrante è $x$.`, R`$(x\,y)' = 3x$.`], risposta: val(3.25), soluzione: [R`$(x\,y)' = 3x$, quindi $x\,y = \frac{3}{2}x^2 + c$ e $y = \frac{3}{2}x + \frac{c}{x}$.`, R`$y(1) = \frac32 + c = 2$, quindi $c = \frac12$.`, R`$y(2) = 3 + \frac{1}{4} = 3{,}25$.`] },
    { id: 'b-16', livello: 'base', difficolta: 1, testo: R`Una sostanza segue $N' = -0{,}05\,N$, con il tempo in anni. Trova il tempo di dimezzamento, arrotondato al centesimo.`, suggerimenti: [R`$T = \frac{\ln 2}{\lambda}$.`], risposta: val(Math.log(2) / 0.05, 0.01), soluzione: [R`Qui $\lambda = 0{,}05$.`, R`$T = \frac{\ln 2}{0{,}05} = 20\ln 2 \approx 13{,}86$ anni.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Un oggetto segue $T' = -0{,}2\,(T - 25)$, con $T(0) = 85$ e il tempo in minuti. Quanto vale $T(5)$, al centesimo?`, suggerimenti: [R`$T(t) = T_a + (T_0 - T_a)\,e^{-kt}$.`], risposta: val(25 + 60 * Math.exp(-1), 0.01), soluzione: [R`$T_a = 25$, $T_0 - T_a = 60$, $k = 0{,}2$: $T(t) = 25 + 60\,e^{-0{,}2t}$.`, R`$T(5) = 25 + 60\,e^{-1} \approx 47{,}07$ °C.`] },
    { id: 'b-18', livello: 'base', difficolta: 1, testo: R`Una popolazione segue $y' = 0{,}3\,y\left(1 - \dfrac{y}{200}\right)$. Per quale valore di $y$ cresce più in fretta?`, suggerimenti: [R`Nella logistica la crescita è massima a metà del tetto.`], risposta: val(100), soluzione: [R`Il tetto è $K = 200$.`, R`$y'$ è una parabola in $y$, nulla in $0$ e in $200$: è massima a metà, per $y = 100$.`] },
    { id: 'b-19', livello: 'base', difficolta: 1, testo: R`Per quale $\omega > 0$ la funzione $y = \sin(\omega x)$ è soluzione di $y'' + 16y = 0$?`, suggerimenti: [R`Deriva due volte $\sin(\omega x)$.`], risposta: val(4), soluzione: [R`$y'' = -\omega^2 \sin(\omega x)$, quindi $y'' + 16y = (16 - \omega^2)\sin(\omega x)$.`, R`Deve essere zero per ogni $x$: $\omega^2 = 16$, cioè $\omega = 4$.`] },
    { id: 'b-20', livello: 'base', difficolta: 1, testo: R`Trova le radici dell'equazione caratteristica di $y'' - 5y' + 6y = 0$. Scrivile separate da punto e virgola.`, suggerimenti: [R`Sostituisci $y''$ con $\lambda^2$, $y'$ con $\lambda$, $y$ con $1$.`], risposta: xs(2, 3), soluzione: [R`$\lambda^2 - 5\lambda + 6 = 0$, cioè $(\lambda - 2)(\lambda - 3) = 0$.`, R`$\lambda = 2$ e $\lambda = 3$: l'integrale generale è $c_1 e^{2x} + c_2 e^{3x}$.`] },

    { id: 'es-01', difficolta: 2, testo: R`Risolvi il problema di Cauchy $y' = 1 + y^2$, $y(0) = 0$. Calcola poi $y\left(\frac{\pi}{4}\right)$.`, suggerimenti: [R`Separa: $\frac{dy}{1 + y^2} = dx$.`, R`Una primitiva di $\frac{1}{1 + y^2}$ è $\arctan y$.`], risposta: val(1), soluzione: [R`Non ci sono soluzioni costanti: $1 + y^2$ non si annulla mai.`, R`$\arctan y = x + c$. Con $y(0) = 0$: $c = 0$.`, R`$y = \tan x$, che vale nell'intervallo $\Iaa{-\frac{\pi}{2}}{\frac{\pi}{2}}$, quello che contiene $0$.`, R`$y\left(\frac{\pi}{4}\right) = \tan \frac{\pi}{4} = 1$.`] },
    { id: 'es-02', difficolta: 2, testo: R`Risolvi $y' = e^{x - y}$ con $y(0) = \ln 2$. Calcola $y(\ln 3)$.`, suggerimenti: [R`$e^{x - y} = e^x \cdot e^{-y}$: è a variabili separabili.`, R`Separando: $e^y\,dy = e^x\,dx$.`], risposta: val(Math.log(4), 0.005), soluzione: [R`$e^y\,dy = e^x\,dx$, quindi $e^y = e^x + c$.`, R`Con $x = 0$: $e^{\ln 2} = 1 + c$, cioè $2 = 1 + c$ e $c = 1$.`, R`$y = \ln(e^x + 1)$. Controllo: $y' = \frac{e^x}{e^x + 1} = e^x \cdot e^{-y}$.`, R`$y(\ln 3) = \ln(3 + 1) = \ln 4 \approx 1{,}39$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Risolvi $y' - 2y = e^{3x}$ con $y(0) = 3$. Calcola $y(\ln 2)$.`, suggerimenti: [R`Qui $a(x) = -2$: il fattore integrante è $e^{-2x}$.`, R`$\left(e^{-2x} y\right)' = e^{x}$.`], risposta: val(16), soluzione: [R`$A(x) = -2x$. Moltiplicando per $e^{-2x}$: $\left(e^{-2x} y\right)' = e^{3x} \cdot e^{-2x} = e^x$.`, R`$e^{-2x} y = e^x + c$, cioè $y = e^{3x} + c\,e^{2x}$.`, R`$y(0) = 1 + c = 3$, quindi $c = 2$: $y = e^{3x} + 2e^{2x}$.`, R`$y(\ln 2) = e^{3\ln 2} + 2e^{2\ln 2} = 8 + 2 \cdot 4 = 16$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Risolvi $y' + \dfrac{2y}{x} = 4x$ per $x > 0$, con $y(1) = 3$. Calcola $y(2)$.`, suggerimenti: [R`$a(x) = \frac{2}{x}$, quindi $A(x) = 2\ln x$ ed $e^{A(x)} = x^2$.`, R`$\left(x^2 y\right)' = 4x^3$.`], risposta: val(4.5), soluzione: [R`Il fattore integrante è $e^{2\ln x} = x^2$: $\left(x^2 y\right)' = 4x^3$.`, R`$x^2 y = x^4 + c$, cioè $y = x^2 + \frac{c}{x^2}$.`, R`$y(1) = 1 + c = 3$, quindi $c = 2$.`, R`$y(2) = 4 + \frac{2}{4} = 4{,}5$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Un fondo rende il $4\%$ annuo con interesse continuo, e riceve versamenti per $500$ euro all'anno, distribuiti nel tempo. Il saldo segue $y' = 0{,}04\,y + 500$, con $y(0) = 0$. Quanti euro ci sono dopo $10$ anni? Arrotonda all'euro.`, suggerimenti: [R`È lineare: $y' - 0{,}04\,y = 500$. Cerca la soluzione costante e aggiungi $c\,e^{0{,}04t}$.`, R`La soluzione costante è $y = -12\,500$.`], risposta: val(12500 * (Math.exp(0.4) - 1), 1), soluzione: [R`Integrale generale: $y = -12\,500 + c\,e^{0{,}04t}$. Controllo: $y' = 0{,}04\,c\,e^{0{,}04t} = 0{,}04\,(y + 12\,500) = 0{,}04\,y + 500$.`, R`$y(0) = 0$ dà $c = 12\,500$: $y = 12\,500\left(e^{0{,}04t} - 1\right)$.`, R`$y(10) = 12\,500\left(e^{0{,}4} - 1\right) \approx 6148$ euro, contro i $5000$ versati.`] },
    { id: 'es-06', difficolta: 2, testo: R`Un campione radioattivo perde il $20\%$ della sua massa in $5$ anni. Trova il tempo di dimezzamento, in anni, al centesimo.`, suggerimenti: [R`$N(t) = N_0\,e^{-\lambda t}$, e dopo $5$ anni resta l'$80\%$.`, R`$e^{-5\lambda} = 0{,}8$ dà $\lambda$.`], risposta: val(5 * Math.log(2) / Math.log(1.25), 0.01), soluzione: [R`$e^{-5\lambda} = 0{,}8$, quindi $\lambda = -\frac{\ln 0{,}8}{5} = \frac{\ln 1{,}25}{5} \approx 0{,}0446$.`, R`$T = \frac{\ln 2}{\lambda} = \frac{5\ln 2}{\ln 1{,}25} \approx 15{,}53$ anni.`, R`Controllo: in $15{,}53$ anni ci sono circa tre periodi di $5$ anni, e $0{,}8^3 \approx 0{,}51$: poco più di metà. Torna.`] },
    { id: 'es-07', difficolta: 3, testo: R`Alle $12{:}00$ un corpo viene trovato a $30$ °C, in una stanza a $20$ °C. Alle $13{:}00$ è a $28$ °C. Al momento della morte era a $37$ °C. Con la legge di Newton, quante ore prima delle $12{:}00$ è avvenuta la morte? Arrotonda al centesimo.`, suggerimenti: [R`Misura il tempo $t$ in ore a partire da mezzogiorno: $T(t) = 20 + 10\,e^{-kt}$.`, R`Da $T(1) = 28$ ricavi $e^{-k} = 0{,}8$.`, R`Cerca il tempo negativo $t = -s$ in cui $T = 37$: $10\,e^{ks} = 17$.`], risposta: val(Math.log(1.7) / Math.log(1.25), 0.01), soluzione: [R`A mezzogiorno la differenza con la stanza è $10$: $T(t) = 20 + 10\,e^{-kt}$.`, R`$T(1) = 28$: $10\,e^{-k} = 8$, quindi $e^{-k} = 0{,}8$ e $k = \ln 1{,}25 \approx 0{,}223$.`, R`Al momento della morte la differenza era $17$. Se è avvenuta $s$ ore prima, $10\,e^{ks} = 17$.`, R`$s = \frac{\ln 1{,}7}{\ln 1{,}25} \approx 2{,}38$ ore, cioè circa $2$ ore e $23$ minuti: verso le $9{:}37$.`] },
    { id: 'es-08', difficolta: 3, testo: R`Una popolazione logistica ha tetto $K = 1000$. All'inizio conta $50$ individui, dopo $2$ anni $200$. Dopo quanti anni arriva a $500$? Arrotonda al centesimo.`, suggerimenti: [R`$y(t) = \frac{1000}{1 + 19\,e^{-rt}}$, perché $\frac{1000 - 50}{50} = 19$.`, R`Da $y(2) = 200$ ricavi $e^{-2r}$.`, R`$500$ è metà tetto: serve $19\,e^{-rt} = 1$.`], risposta: val(Math.log(19) / (Math.log(19 / 4) / 2), 0.01), soluzione: [R`$y(t) = \frac{1000}{1 + 19\,e^{-rt}}$.`, R`$y(2) = 200$: $1 + 19\,e^{-2r} = 5$, quindi $e^{-2r} = \frac{4}{19}$ e $r = \frac12 \ln \frac{19}{4} \approx 0{,}779$.`, R`$y = 500$ quando $19\,e^{-rt} = 1$, cioè $t = \frac{\ln 19}{r} \approx 3{,}78$ anni.`, R`È anche il momento del flesso: da lì la crescita comincia a rallentare.`] },
    { id: 'es-09', difficolta: 2, testo: R`Risolvi $y'' + 9y = 0$ con $y(0) = 2$ e $y'(0) = 3$. Calcola $y\left(\frac{\pi}{6}\right)$.`, suggerimenti: [R`Qui $\omega = 3$: $y = c_1 \cos 3x + c_2 \sin 3x$.`, R`$y'(0) = 3c_2$.`], risposta: val(1), soluzione: [R`$y = c_1 \cos 3x + c_2 \sin 3x$. Con $y(0) = 2$: $c_1 = 2$.`, R`$y' = -3c_1 \sin 3x + 3c_2 \cos 3x$, quindi $y'(0) = 3c_2 = 3$ e $c_2 = 1$.`, R`$y = 2\cos 3x + \sin 3x$, e $y\left(\frac{\pi}{6}\right) = 2\cos\frac{\pi}{2} + \sin\frac{\pi}{2} = 1$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Risolvi $y'' - 4y' + 4y = 0$ con $y(0) = 1$ e $y'(0) = 3$. Calcola $y(1)$, esatto o al centesimo.`, suggerimenti: [R`L'equazione caratteristica ha una radice doppia.`, R`$y = (c_1 + c_2 x)\,e^{2x}$.`], risposta: val(2 * Math.exp(2), 0.01), soluzione: [R`$\lambda^2 - 4\lambda + 4 = (\lambda - 2)^2 = 0$: radice doppia $\lambda = 2$.`, R`$y = (c_1 + c_2 x)\,e^{2x}$, $y' = (c_2 + 2c_1 + 2c_2 x)\,e^{2x}$.`, R`$y(0) = c_1 = 1$; $y'(0) = c_2 + 2 = 3$, quindi $c_2 = 1$.`, R`$y = (1 + x)\,e^{2x}$ e $y(1) = 2e^2 \approx 14{,}78$.`] },
    { id: 'es-11', difficolta: 3, testo: R`*Stile seconda prova.* Considera l'equazione $y'' + 2y' + y = 0$.

- a) Trova l'integrale generale.
- b) Trova la soluzione $f$ il cui grafico passa per $(0; 1)$ con tangente parallela alla retta $y = 2x$.
- c) Studia $f$: zeri, limiti, massimo e flesso.

Scrivi le coordinate del punto di massimo di $f$, arrotondate al centesimo.`, suggerimenti: [R`L'equazione caratteristica è $(\lambda + 1)^2 = 0$.`, R`La tangente parallela a $y = 2x$ vuol dire $f'(0) = 2$.`, R`Trovata $f(x) = (1 + 3x)\,e^{-x}$, studia il segno di $f'(x) = (2 - 3x)\,e^{-x}$.`], risposta: { tipo: 'numeri', valori: [2 / 3, 3 * Math.exp(-2 / 3)], ordinati: true, tolleranza: 0.01, segnaposto: 'es. (1,25; 0,8)', simboli: ['(', ')', ';', '−'] }, soluzione: [R`a) $\lambda^2 + 2\lambda + 1 = 0$ ha la radice doppia $\lambda = -1$: $y = (c_1 + c_2 x)\,e^{-x}$.`, R`b) $f(0) = c_1 = 1$. Poi $f'(x) = (c_2 - c_1 - c_2 x)\,e^{-x}$, quindi $f'(0) = c_2 - 1 = 2$ e $c_2 = 3$: $f(x) = (1 + 3x)\,e^{-x}$.`, R`c) Zero in $x = -\frac{1}{3}$. Per $x \to +\infty$, $f \to 0$: l'esponenziale batte il polinomio, quindi $y = 0$ è asintoto. Per $x \to -\infty$, $f \to -\infty$.`, R`$f'(x) = (2 - 3x)\,e^{-x}$: positiva per $x < \frac23$. Massimo in $\left(\frac23; 3e^{-2/3}\right) \approx (0{,}67; 1{,}54)$.`, R`$f''(x) = (3x - 5)\,e^{-x}$ cambia segno in $x = \frac53$: flesso in $\left(\frac53; 6e^{-5/3}\right) \approx (1{,}67; 1{,}13)$.`] },
    { id: 'es-12', difficolta: 2, testo: R`Una curva passa per $(1; 2)$, e in ogni suo punto la tangente ha pendenza $\dfrac{x}{y}$. Trova la curva e calcola la sua ordinata in $x = \sqrt{6}$.`, suggerimenti: [R`La frase si traduce in $y' = \frac{x}{y}$, con $y(1) = 2$.`, R`Separa: $y\,dy = x\,dx$.`], risposta: val(3), soluzione: [R`$y\,dy = x\,dx$, quindi $\frac{y^2}{2} = \frac{x^2}{2} + c$, cioè $y^2 = x^2 + 2c$.`, R`Con $(1; 2)$: $4 = 1 + 2c$, quindi $y^2 = x^2 + 3$.`, R`La curva passa per un punto con $y > 0$: $y = \sqrt{x^2 + 3}$. È un ramo di iperbole.`, R`In $x = \sqrt{6}$: $y = \sqrt{6 + 3} = 3$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Una soluzione di un'equazione differenziale è…`, opzioni: [R`un numero che, sostituito al posto di $y$, rende vera l'uguaglianza`, R`una funzione che rende vera l'uguaglianza per ogni $x$ di un intervallo`, R`un punto del piano in cui la derivata $y'$ si annulla`, R`il valore che assume $y'$ nel punto iniziale $x_0$`], corretta: 1, spiegazione: R`In un'equazione differenziale l'incognita è una funzione, e l'uguaglianza deve valere su tutto un intervallo. Un numero, un punto o un valore di $y'$ non bastano a dire chi è la funzione.` },
    { id: 'q-02', domanda: R`Di che ordine è l'equazione $y'' + (y')^3 = x$?`, opzioni: [R`del terzo ordine, per il cubo`, R`del primo ordine, perché $x$ è al primo grado`, R`del quinto ordine: $2 + 3$`, R`del secondo ordine`], corretta: 3, spiegazione: R`L'ordine è quello della derivata più alta, qui $y''$. L'esponente $3$ è una potenza della derivata prima, non una derivata terza.` },
    { id: 'q-03', domanda: R`I grafici delle soluzioni di $y' = f(x)$…`, opzioni: [R`sono traslati l'uno dell'altro in verticale`, R`passano tutti per l'origine degli assi`, R`sono dilatati l'uno dell'altro in verticale`, R`sono tutti rette parallele fra loro`], corretta: 0, spiegazione: R`Le soluzioni sono $F(x) + c$: cambiare $c$ sposta il grafico in su o in giù. Non passano per forza dall'origine e non sono rette, a meno che $f$ sia costante.` },
    { id: 'q-04', domanda: R`Nel campo delle direzioni di $y' = y$, i trattini che stanno su una stessa retta orizzontale…`, opzioni: [R`sono tutti orizzontali`, R`diventano più ripidi verso destra`, R`sono paralleli fra loro`, R`sono perpendicolari a quelli della riga sopra`], corretta: 2, spiegazione: R`La pendenza vale $y$, e sulla stessa riga $y$ non cambia: trattini paralleli. Sono orizzontali solo sulla riga $y = 0$, e la $x$ non conta.` },
    { id: 'q-05', domanda: R`Quante condizioni servono per fissare una sola soluzione di un'equazione del secondo ordine?`, opzioni: [R`una: il valore $y(x_0)$`, R`due: $y(x_0)$ e $y'(x_0)$`, R`nessuna: è già unica`, R`tre, una per ogni derivata fino alla seconda`], corretta: 1, spiegazione: R`L'integrale generale di un'equazione del secondo ordine ha due costanti. Per fissarle servono due condizioni, di solito il valore e la derivata in un punto.` },
    { id: 'q-06', domanda: R`Due soluzioni diverse di $y' = x^2 + y^2$ possono incontrarsi in un punto?`, opzioni: [R`sì, se in quel punto hanno la stessa pendenza`, R`sì, ma solo sull'asse $x$`, R`sì, se sono simmetriche rispetto all'asse $y$`, R`no, per il teorema di esistenza e unicità`], corretta: 3, spiegazione: R`Qui $f$ è un polinomio, quindi il teorema vale. Se due soluzioni passassero per lo stesso punto, quel problema di Cauchy avrebbe due soluzioni. La pendenza comune non salva niente: anzi, l'equazione la impone uguale.` },
    { id: 'q-07', domanda: R`Quale equazione è a variabili separabili?`, opzioni: [R`$y' = x\,y^2 + x$`, R`$y' = x + y$`, R`$y' = \sin(x + y)$`, R`$y' = x^2 + y^2$`], corretta: 0, spiegazione: R`$x\,y^2 + x = x\,(y^2 + 1)$: un fattore con sola $x$ per un fattore con sola $y$. Le altre non si spezzano in un prodotto così.` },
    { id: 'q-08', domanda: R`Risolvendo $y' = g(x)\,h(y)$ per separazione, quali soluzioni si rischia di perdere?`, opzioni: [R`quelle con $g(x) = 0$`, R`quelle che passano per l'origine`, R`le costanti $y = y_0$ con $h(y_0) = 0$`, R`quelle definite su un intervallo limitato`], corretta: 2, spiegazione: R`Per separare si divide per $h(y)$, che deve essere diverso da zero. Le funzioni costanti $y = y_0$ con $h(y_0) = 0$ sono soluzioni, ma la divisione le esclude.` },
    { id: 'q-09', domanda: R`Quale equazione è lineare del primo ordine?`, opzioni: [R`$y' = y^2 + x\,e^x$`, R`$y\,y' = x^2 + 1$`, R`$y' = e^{y} + x^2$`, R`$y' + x^2\,y = e^x$`], corretta: 3, spiegazione: R`Nella forma $y' + a(x)\,y = b(x)$, $y$ e $y'$ sono al primo grado. In $y^2$, $y\,y'$ ed $e^y$ la $y$ non compare al primo grado.` },
    { id: 'q-10', domanda: R`Nella formula delle equazioni lineari $y' + a(x)\,y = b(x)$, la funzione $A(x)$ è…`, opzioni: [R`la derivata di $a(x)$`, R`una primitiva di $a(x)$`, R`una primitiva di $b(x)$`, R`il prodotto $a(x)\,b(x)$`], corretta: 1, spiegazione: R`Il fattore integrante $e^{A(x)}$ funziona perché $\left(e^{A(x)}\right)' = a(x)\,e^{A(x)}$. Serve quindi $A' = a$. Con $b$ si lavora dopo, nell'integrale.` },
    { id: 'q-11', domanda: R`Una grandezza segue $y' = k\,y$ con $k < 0$. Allora, per $x \to +\infty$…`, opzioni: [R`si dimezza a intervalli regolari e tende a zero`, R`cala ogni anno della stessa quantità e poi si ferma`, R`diventa negativa dopo un tempo abbastanza lungo`, R`oscilla intorno al valore iniziale senza fermarsi`], corretta: 0, spiegazione: R`La soluzione è $y_0\,e^{kx}$, con $k < 0$: si dimezza ogni $\frac{\ln 2}{|k|}$ e tende a zero senza cambiare segno. Cala ogni volta della stessa **percentuale**, non della stessa quantità.` },
    { id: 'q-12', domanda: R`Secondo la legge di Newton, una tazza di tè lasciata in una stanza a $20$ °C…`, opzioni: [R`si raffredda a velocità costante`, R`raggiunge i $20$ °C in un tempo finito e poi si ferma`, R`si avvicina sempre di più a $20$ °C`, R`si raffredda fino a $0$ °C`], corretta: 2, spiegazione: R`$T(t) = 20 + (T_0 - 20)\,e^{-kt}$: la differenza con la stanza decade come un esponenziale. Tende a zero senza annullarsi, e la velocità cala man mano.` },
    { id: 'q-13', domanda: R`Nella crescita logistica $y' = r\,y\left(1 - \frac{y}{K}\right)$, quando la popolazione cresce più in fretta?`, opzioni: [R`all'inizio, quando è più piccola`, R`vicino al tetto $K$`, R`sempre alla stessa velocità`, R`quando ha raggiunto metà del tetto`], corretta: 3, spiegazione: R`$y'$ è una parabola in $y$, nulla in $0$ e in $K$: il suo massimo è a metà, $y = \frac{K}{2}$. Lì il grafico ha il flesso. All'inizio e vicino al tetto la crescita è lenta.` },
    { id: 'q-14', domanda: R`Quali sono le soluzioni costanti dell'equazione logistica?`, opzioni: [R`solo $y = K$`, R`$y = 0$ e $y = K$`, R`$y = \frac{K}{2}$`, R`non ce ne sono`], corretta: 1, spiegazione: R`Una costante ha derivata zero: serve $r\,y\left(1 - \frac{y}{K}\right) = 0$, cioè $y = 0$ oppure $y = K$. In $\frac{K}{2}$ la derivata è massima, non nulla.` },
    { id: 'q-15', domanda: R`Le soluzioni di $y'' + \omega^2 y = 0$ sono…`, opzioni: [R`oscillazioni $c_1 \cos(\omega x) + c_2 \sin(\omega x)$`, R`esponenziali $c_1 e^{\omega x} + c_2 e^{-\omega x}$`, R`rette $y = c_1 x + c_2$`, R`parabole $y = -\omega^2 x^2 + c$`], corretta: 0, spiegazione: R`L'equazione caratteristica $\lambda^2 + \omega^2 = 0$ ha radici $\pm i\omega$: seni e coseni. Gli esponenziali reali risolvono invece $y'' - \omega^2 y = 0$.` },
    { id: 'q-16', domanda: R`Se l'equazione caratteristica di $a\,y'' + b\,y' + c\,y = 0$ ha $\Delta = 0$, l'integrale generale è…`, opzioni: [R`$c_1 e^{\lambda x}$`, R`$c_1 e^{\lambda x} + c_2 e^{-\lambda x}$`, R`$(c_1 + c_2 x)\,e^{\lambda x}$`, R`$c_1 \cos \lambda x + c_2 \sin \lambda x$`], corretta: 2, spiegazione: R`Con una radice doppia, $e^{\lambda x}$ dà una sola soluzione indipendente. La seconda è $x\,e^{\lambda x}$. Con una costante sola non si potrebbero imporre due condizioni.` }
  ],

  suggerimenti: [
    { tipo: 'trucco', testo: R`Una soluzione si controlla sempre: derivala e sostituiscila. Se i due membri non coincidono, c'è un errore.` },
    { tipo: 'errore', testo: R`Non dimenticare la costante $c$ quando integri. Senza, nessuna condizione iniziale può essere soddisfatta.` },
    { tipo: 'metodo', testo: R`Problema di Cauchy: prima l'integrale generale con la costante, poi la condizione iniziale. Mai il contrario.` },
    { tipo: 'errore', testo: R`Prima di separare le variabili cerca gli zeri di $h(y)$. Ognuno dà una soluzione costante, che la divisione farebbe sparire.` },
    { tipo: 'metodo', testo: R`Davanti a un'equazione chiediti: ha solo la $x$ a destra? È separabile? È lineare? Ogni tipo ha il suo metodo.` },
    { tipo: 'errore', testo: R`Nelle lineari porta prima $y'$ da solo, con coefficiente $1$, e leggi il segno di $a(x)$. In $y' - 3y = x$ hai $a(x) = -3$.` },
    { tipo: 'trucco', testo: R`In $y' = k(y - M)$ la soluzione costante è $y = M$, e tutte le altre sono $M + c\,e^{kx}$. Vale per Newton, per le banche e per le lineari a coefficienti costanti.` },
    { tipo: 'trucco', testo: R`La condizione $y(x_0)$ e l'equazione insieme danno subito $y'(x_0)$, senza risolvere niente: basta sostituire nel secondo membro.` }
  ],

  aneddoti: [
    { matematico: 'Pierre-François Verhulst', anni: '1804–1849', titolo: 'La curva logistica, dimenticata per ottant\'anni', testo: R`Verhulst era un matematico belga, allievo di Adolphe Quetelet. Malthus aveva scritto che una popolazione, senza freni, cresce in modo geometrico. Quetelet pensava che la crescita dovesse incontrare una resistenza, tanto più forte quanto più la popolazione è grande. Verhulst tradusse l'idea in un'equazione. Nel 1838 aggiunse alla crescita esponenziale un freno, proporzionale al quadrato della popolazione. Poi confrontò la sua curva con i censimenti di Francia, Belgio, Russia e della contea inglese dell'Essex. Nel 1845 la chiamò «logistica», senza spiegare il perché del nome. Il suo lavoro fu dimenticato. Nel 1920 due studiosi americani, Raymond Pearl e Lowell Reed, ritrovarono la stessa curva studiando la popolazione degli Stati Uniti. Solo più tardi seppero che Verhulst ci era arrivato ottant'anni prima.`, legame: R`L'equazione di Verhulst è la logistica $y' = r\,y\left(1 - \frac{y}{K}\right)$: il termine con $y^2$ è il suo freno.` },

    { matematico: 'Jacob e Johann Bernoulli', anni: '1655–1705 e 1667–1748', titolo: 'Due fratelli che si sfidavano a colpi di equazioni', testo: R`I fratelli Jacob e Johann Bernoulli, di Basilea, furono fra i primi a usare il calcolo di Leibniz. Erano bravissimi, e rivali feroci. Nel 1695 Jacob propose sulla rivista *Acta Eruditorum* un'equazione differenziale che oggi porta il suo nome. È simile a una lineare, ma a destra c'è una potenza di $y$. Leibniz la risolse l'anno dopo, con un cambio di variabile che la trasforma in un'equazione lineare. Anche Johann trovò una soluzione. Nel 1696 fu Johann a lanciare una sfida a tutti i matematici d'Europa: il problema della brachistocrona, la curva di discesa più rapida. Jacob la risolse, e rilanciò con un problema ancora più difficile. Fra i due fratelli i litigi pubblici durarono fino alla morte di Jacob.`, legame: R`L'equazione di Bernoulli, $y' + a(x)\,y = b(x)\,y^n$, con la sostituzione $z = y^{1-n}$ diventa una lineare del primo ordine, da risolvere con il fattore integrante.` },

    { matematico: 'Isaac Newton', anni: '1642–1727', titolo: 'Un ferro rovente e un articolo senza firma', testo: R`Nel 1701 la rivista della Royal Society pubblicò un breve articolo in latino, senza firma: *Scala graduum caloris*, cioè «scala dei gradi di calore». L'autore era Isaac Newton, che allora lavorava alla Zecca di Londra. Voleva misurare temperature troppo alte per i termometri del tempo. Scaldava un blocco di ferro sui carboni ardenti e lo lasciava raffreddare al vento. Osservò una regola. Se i tempi crescono in progressione aritmetica, l'eccesso di calore del ferro sull'aria cala in progressione geometrica. Dal tempo di raffreddamento risaliva così alla temperatura di partenza. Oggi la regola si scrive come equazione differenziale. È un'approssimazione, buona quando la differenza di temperatura non è troppo grande.`, legame: R`La regola di Newton è $T' = -k(T - T_a)$: la differenza con l'ambiente decade come un esponenziale, $T - T_a = (T_0 - T_a)\,e^{-kt}$.` },

    { matematico: 'Leonhard Euler', anni: '1707–1783', titolo: 'Un\'equazione differenziale che diventa di secondo grado', testo: R`Nel 1743 Eulero pubblicò a Berlino un lavoro sulle equazioni differenziali lineari a coefficienti costanti, di ordine qualunque. Fino ad allora ognuna si risolveva con un trucco diverso. Eulero trovò un metodo unico: cercare soluzioni della forma $e^{\lambda x}$. Con questa prova ogni derivata diventa una potenza di $\lambda$. L'equazione differenziale si trasforma in un'equazione algebrica, quella che oggi chiamiamo caratteristica. Eulero sistemò anche i casi difficili. Con una radice ripetuta bisogna moltiplicare per $x$. Con radici complesse le esponenziali diventano seni e coseni, grazie alla formula che porta il suo nome. Con quel lavoro le oscillazioni di molle e pendoli si risolvono tutte allo stesso modo.`, legame: R`È il metodo di questo argomento per $a\,y'' + b\,y' + c\,y = 0$: l'equazione caratteristica $a\lambda^2 + b\lambda + c = 0$ e i tre casi del discriminante.` }
  ]
});
})();

