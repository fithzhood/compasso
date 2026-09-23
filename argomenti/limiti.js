(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'limiti',
  titolo: 'Limiti',

  introduzione: R`Quanto vale $\dfrac{x^2 - 1}{x - 1}$ per $x = 1$? Non si può dire: sostituendo esce $\frac{0}{0}$. Però puoi provare con numeri vicini a $1$: con $x = 0{,}9$ esce $1{,}9$, con $x = 0{,}99$ esce $1{,}99$, con $x = 0{,}999$ esce $1{,}999$. Più $x$ si avvicina a $1$, più il risultato si avvicina a $2$. Si dice che **il limite** per $x$ che tende a $1$ vale $2$.

Il limite è lo strumento che descrive che cosa fa una funzione **vicino** a un punto, anche dove nel punto non si può calcolare, oppure quando $x$ diventa grandissima. Su questa idea poggia tutto il resto dell'analisi: la velocità in un istante, la pendenza della tangente a una curva (le derivate), l'area sotto una curva (gli integrali).

Serve conoscere bene le funzioni (dominio, grafico, le funzioni elementari), le potenze, gli esponenziali e i logaritmi, e seno e coseno, che compaiono nei limiti notevoli.`,

  inBreve: [
    R`$\lim\limits_{x \to x_0} f(x) = L$ vuol dire che $f(x)$ si avvicina quanto vuoi a $L$ quando $x$ si avvicina a $x_0$, senza mai essere uguale a $x_0$. Il valore $f(x_0)$ non conta, e può anche non esistere.`,
    R`Il limite in $x_0$ esiste solo se il limite da destra e quello da sinistra esistono e sono uguali.`,
    R`Per calcolare un limite si comincia sempre sostituendo: se non esce una forma indeterminata, il risultato è già quello.`,
    R`Le forme indeterminate ($\frac00$, $\frac{\infty}{\infty}$, $\infty - \infty$, $0 \cdot \infty$, $1^\infty$, $0^0$, $\infty^0$) non hanno un risultato fisso: si riscrive l'espressione raccogliendo, scomponendo o razionalizzando, finché l'indeterminazione sparisce.`,
    R`Limiti notevoli: $\dfrac{\sin x}{x} \to 1$, $\dfrac{1 - \cos x}{x^2} \to \dfrac12$, $\dfrac{e^x - 1}{x} \to 1$, $\dfrac{\ln(1+x)}{x} \to 1$ per $x \to 0$, e $\left(1 + \frac1x\right)^x \to e$ per $x \to \infty$. Valgono se ciò che sta dentro tende proprio a $0$.`,
    R`Per $x \to +\infty$ vale la gerarchia: ogni logaritmo cresce più lentamente di ogni potenza, e ogni potenza più lentamente di ogni esponenziale con base maggiore di $1$.`
  ],

  sezioni: [
    { id: 'intorni-accumulazione', titolo: 'Intorni e punti di accumulazione', testo: R`Per parlare di limiti bisogna dire con precisione che cosa vuol dire «vicino a $x_0$». Si usa un intervallo centrato in $x_0$, largo quanto si vuole.

>* Un **intorno di $x_0$** è un intervallo aperto $(x_0 - \delta,\ x_0 + \delta)$ con $\delta > 0$: contiene i punti che distano da $x_0$ meno di $\delta$. Un intorno di $+\infty$ è un intervallo $(M, +\infty)$; un intorno di $-\infty$ è $(-\infty, M)$; un intorno di $\infty$ senza segno è l'insieme dei punti con $|x| > M$.

$\delta$ non ha un valore fisso: si può scegliere piccolo quanto si vuole, e più è piccolo più l'intorno si stringe su $x_0$. Per l'infinito vale il contrario: più $M$ è grande, più l'intorno è «vicino» a $+\infty$.

Un'ultima parola, che basta conoscere: $x_0$ è un **punto di accumulazione** di un insieme $A$ se in ogni intorno di $x_0$, per quanto piccolo, c'è almeno un punto di $A$ diverso da $x_0$. Ha senso cercare il limite per $x \to x_0$ solo se $x_0$ è di accumulazione per il dominio di $f$: servono punti del dominio vicinissimi a $x_0$ per potercisi avvicinare.

>! $x_0$ può essere di accumulazione per $A$ senza appartenere ad $A$. Lo $0$ è di accumulazione per $A = \left\{1, \frac12, \frac13, \frac14, \dots\right\}$: in ogni intorno di $0$ cadono infiniti numeri $\frac1n$, anche se $0$ non è nell'insieme.` },

    { id: 'idea-intuitiva', titolo: "L'idea intuitiva di limite", testo: R`Riprendi la funzione dell'introduzione, $f(x) = \dfrac{x^2 - 1}{x - 1}$, che in $x = 1$ non è definita. Trascina $x$ verso $1$, prima da sinistra e poi da destra, e guarda il valore di $f(x)$ sull'asse $y$. Poi prova a mettere $x$ esattamente su $1$.

[[grafico:avvicinati]]

Da tutte e due le parti i valori si stringono attorno a $2$. Su $x = 1$ invece il punto sparisce: lì la funzione non c'è, sul grafico resta un buco. Il limite descrive proprio questo: dove **va** la funzione mentre ti avvicini, non dove si trova nel punto.

>* $\lim\limits_{x \to x_0} f(x) = L$ vuol dire: prendendo $x$ abbastanza vicino a $x_0$ (ma diverso da $x_0$), $f(x)$ diventa vicino a $L$ quanto si vuole. Il valore $f(x_0)$ non conta: può non esistere, o essere diverso da $L$.

Nel laboratorio «Il microscopio» puoi ingrandire la zona attorno al punto e leggere la tabella dei valori da sinistra e da destra, anche per funzioni in cui le due parti non vanno d'accordo o i valori scappano all'infinito.

>! Calcolare $f(x_0)$ e chiamarlo «il limite» funziona solo quando la funzione è continua in $x_0$, come i polinomi (si vedrà nel prossimo argomento). In generale il limite si occupa dei valori **intorno** a $x_0$.

?? Una funzione vale $f(x) = x + 1$ per ogni $x \ne 3$, e in $x = 3$ vale $f(3) = 10$. Quanto vale $\lim\limits_{x \to 3} f(x)$?
[x] $4$
[ ] $10$
[ ] non esiste, perché la funzione ha un salto in $3$
=> Vicino a $3$, ma non in $3$, la funzione vale $x + 1$, che si avvicina a $4$ da entrambe le parti: il limite è $4$. Il valore $10$ è quello nel punto, e il limite non lo guarda. Non c'è un salto fra sinistra e destra: c'è solo un punto spostato.` },

    { id: 'definizione-limite-finito', titolo: 'La definizione di limite finito (ε-δ)', testo: R`«Vicino quanto si vuole» a parole è chiaro, ma per dimostrare qualcosa serve una formulazione con i numeri. La si può leggere come una sfida a due.

Il primo giocatore sceglie una **tolleranza** $\varepsilon$ (epsilon), piccola quanto vuole: «voglio che $f(x)$ disti da $L$ meno di $\varepsilon$». Il secondo deve rispondere con un $\delta$ (delta): «va bene, basta prendere $x$ a distanza minore di $\delta$ da $x_0$». Se il secondo riesce a rispondere **a ogni** $\varepsilon$, anche piccolissimo, il limite vale $L$.

Gioca tu la parte del secondo. Qui $f(x) = 2x + 1$, $x_0 = 1$ e $L = 3$. Fissa $\varepsilon$ con il cursore, poi trascina $\delta$ e trova il più grande che funziona: tutta la curva sopra la striscia verticale deve stare dentro la striscia orizzontale.

[[grafico:epsilon-delta]]

Se $x$ dista da $1$ meno di $\delta$, $f(x) = 2x + 1$ dista da $3$ meno di $2\delta$, perché la retta sale di $2$ per ogni passo di $1$. Quindi funziona ogni $\delta$ fino a $\frac{\varepsilon}{2}$: a ogni $\varepsilon$ il secondo giocatore sa rispondere, e il limite vale proprio $3$.

>* **Limite finito per $x \to x_0$:** $\lim\limits_{x \to x_0} f(x) = L$ se $\ \forall\, \varepsilon > 0\ \ \exists\, \delta > 0$ tale che $\ 0 < |x - x_0| < \delta \ \Rightarrow \ |f(x) - L| < \varepsilon$. Per ogni tolleranza $\varepsilon$ esiste un $\delta$ tale che, se $x$ è vicino a $x_0$ meno di $\delta$ (ma diverso da $x_0$), allora $f(x)$ è vicino a $L$ meno di $\varepsilon$.

Il pezzo $0 < |x - x_0|$ serve a escludere $x = x_0$: il valore nel punto non conta.

>! $\delta$ dipende da $\varepsilon$: non esiste «il $\delta$ del limite» valido per tutte le tolleranze. Nel grafico, quando stringi $\varepsilon$, devi stringere anche $\delta$.` },

    { id: 'limiti-infiniti', titolo: "Limiti infiniti e limiti all'infinito", testo: R`Non sempre ci si avvicina a un numero. Con $f(x) = \dfrac1x$, trascina $x$ verso $0$ da destra e da sinistra, poi portala lontano, verso i bordi del grafico.

[[grafico:iperbole]]

Vicino a $0$, da destra, $f(x)$ diventa enorme e positiva: $\frac{1}{0{,}01} = 100$, $\frac{1}{0{,}001} = 1000$. Da sinistra diventa enorme e negativa. Lontano da $0$, invece, $f(x)$ si avvicina a $0$. Sono i due casi nuovi: il limite può essere **infinito**, e ci si può avvicinare **all'infinito**.

>* $\lim\limits_{x \to x_0} f(x) = +\infty$ vuol dire: $f(x)$ supera qualunque numero $M$, pur di prendere $x$ abbastanza vicino a $x_0$. In simboli: $\forall M > 0\ \exists\, \delta > 0 : 0 < |x - x_0| < \delta \Rightarrow f(x) > M$ (per $-\infty$ si chiede $f(x) < -M$).

>* $\lim\limits_{x \to \infty} f(x) = L$ vuol dire: $f(x)$ è vicino a $L$ quanto si vuole, pur di prendere $|x|$ abbastanza grande. In simboli: $\forall \varepsilon > 0\ \exists\, N > 0 : |x| > N \Rightarrow |f(x) - L| < \varepsilon$. Se anche il risultato è infinito, si chiede $f(x) > M$ per $|x| > N$.

Per $\frac1x$ quindi: per $x \to 0^+$ il limite è $+\infty$, per $x \to 0^-$ è $-\infty$, per $x \to \pm\infty$ è $0$. Le rette $x = 0$ e $y = 0$, a cui la curva si avvicina senza toccarle, sono i suoi **asintoti**.

>! «$x \to \infty$» senza segno vuol dire che $|x|$ diventa grandissimo, con $x$ positivo **oppure** negativo. $x \to +\infty$ considera solo i positivi.` },

    { id: 'limite-destro-sinistro', titolo: 'Limite destro e limite sinistro', testo: R`Con $\frac1x$ hai visto che arrivando a $0$ da destra e da sinistra succedono cose diverse. Per tenerne conto si guarda un lato alla volta.

>* **Limite destro** $\lim\limits_{x \to x_0^+} f(x)$: ci si avvicina a $x_0$ solo con $x > x_0$. **Limite sinistro** $\lim\limits_{x \to x_0^-} f(x)$: solo con $x < x_0$. Il limite $\lim\limits_{x \to x_0} f(x)$ **esiste se e solo se** destro e sinistro esistono e **sono uguali**; il loro valore comune è il limite.

Per $\frac1x$ in $0$: destro $+\infty$, sinistro $-\infty$. Sono diversi, quindi $\lim\limits_{x \to 0} \frac1x$ **non esiste**.

Può succedere anche con due valori finiti. $f(x) = \dfrac{|x|}{x}$ vale $1$ per $x > 0$ e $-1$ per $x < 0$: il limite destro in $0$ è $1$, il sinistro è $-1$, e il limite non esiste.

>! Scrivere $\lim\limits_{x \to 0} \frac1x = \infty$ è sbagliato: da una parte si va a $+\infty$, dall'altra a $-\infty$, e il limite non esiste.

?? Quanto vale $\lim\limits_{x \to 2} \dfrac{1}{(x-2)^2}$?
[x] $+\infty$
[ ] non esiste, perché destro e sinistro sono diversi
[ ] $0$
=> Il denominatore $(x-2)^2$ è un quadrato: vicino a $2$ è piccolissimo ma sempre **positivo**, da tutte e due le parti. Quindi destro e sinistro valgono entrambi $+\infty$, e il limite esiste ed è $+\infty$. Con $\frac{1}{x-2}$, senza il quadrato, i due lati sarebbero invece diversi.` },

    { id: 'teoremi-limiti', titolo: 'I teoremi sui limiti', testo: R`Tre teoremi valgono per tutti i limiti (con $x_0$ finito o infinito). Si usano di continuo, spesso senza nominarli.

>* **Unicità del limite:** se il limite esiste, è uno solo.

Il motivo: se $f(x)$ si avvicinasse sia a $L_1$ sia a un altro numero $L_2$, da un certo punto in poi dovrebbe stare vicinissima a tutti e due insieme. Ma due numeri diversi hanno una distanza fra loro, e non si può stare a meno di metà di quella distanza da entrambi.

>* **Permanenza del segno:** se $\lim\limits_{x \to x_0} f(x) = L$ con $L \ne 0$, allora in un intorno di $x_0$ (escluso al più $x_0$) $f(x)$ ha lo **stesso segno** di $L$.

Se i valori si avvicinano a $3$, abbastanza vicino a $x_0$ stanno fra $2$ e $4$, quindi sono positivi. Una funzione non può restare negativa fino all'ultimo e diventare positiva solo nel limite.

>* **Teorema del confronto** (dei due carabinieri): se $g(x) \le f(x) \le h(x)$ vicino a $x_0$ e $\lim g = \lim h = L$, allora anche $\lim f = L$.

Due carabinieri scortano una persona, uno per lato: se tutti e due arrivano nello stesso posto, ci arriva anche la persona in mezzo. Serve per i limiti che non si calcolano direttamente, come $\frac{\sin x}{x}$ più avanti.

?? $f(x) = x^2$ si avvicina a $0$ per $x \to 0$. La permanenza del segno dice che vicino a $0$ la funzione ha il segno del limite?
=> No: il teorema chiede $L \ne 0$, e qui $L = 0$, che non ha segno. Infatti una funzione che tende a $0$ può essere sempre positiva ($x^2$), sempre negativa ($-x^2$), oppure cambiare segno (come $x$).` },

    { id: 'operazioni-forme-indeterminate', titolo: 'Operazioni sui limiti e forme indeterminate', testo: R`Se due funzioni hanno limiti finiti, i limiti si combinano come ci si aspetta.

>* Se $\lim f = L_1$ e $\lim g = L_2$ sono finiti, allora $\lim (f \pm g) = L_1 \pm L_2$, $\ \lim (f \cdot g) = L_1 \cdot L_2$ e, se $L_2 \ne 0$, $\ \lim \dfrac{f}{g} = \dfrac{L_1}{L_2}$.

Molti casi con l'infinito funzionano allo stesso modo, e si capiscono pensando a numeri grandissimi o piccolissimi:

| operazione | risultato | perché |
|---|---|---|
| numero $+\ (+\infty)$ | $+\infty$ | aggiungere un numero fisso a una quantità enorme la lascia enorme |
| numero positivo $\cdot\ (+\infty)$ | $+\infty$ | $3 \cdot 1\,000\,000$ è ancora enorme |
| $\dfrac{\text{numero}}{\infty}$ | $0$ | $\frac{5}{1\,000\,000}$ è quasi zero |
| $\dfrac{\text{numero} \ne 0}{0}$ | $\infty$ | $\frac{5}{0{,}0001} = 50\,000$; il segno dipende da come tende a $0$ il denominatore |

Altre combinazioni invece non hanno un risultato fisso: dipende da quali funzioni ci sono dentro. Si chiamano **forme indeterminate**.

>* Le sette **forme indeterminate** sono $\infty - \infty$, $\ 0 \cdot \infty$, $\ \dfrac{\infty}{\infty}$, $\ \dfrac00$, $\ 1^{\infty}$, $\ 0^0$, $\ \infty^0$. Quando sostituendo ne esce una, il calcolo non è finito: bisogna riscrivere l'espressione.

Guarda tre limiti che danno tutti $\frac00$: $\lim\limits_{x \to 0} \frac{2x}{x} = 2$, $\lim\limits_{x \to 0} \frac{x^2}{x} = 0$, $\lim\limits_{x \to 0^+} \frac{x}{x^2} = +\infty$. Stessa forma, tre risultati diversi: conta **come** numeratore e denominatore vanno a zero, non solo il fatto che ci vanno.

?? Quanto vale $\lim\limits_{x \to +\infty} \left(x^2 - x\right)$?
[x] $+\infty$
[ ] $0$, perché $\infty - \infty = 0$
[ ] non si può calcolare, è una forma indeterminata
=> È una forma $\infty - \infty$, ma questo vuol dire solo che serve un passaggio in più. Raccogliendo, $x^2 - x = x(x - 1)$, prodotto di due fattori che vanno a $+\infty$: il risultato è $+\infty$. Per $x = 1000$ vale $999\,000$, altro che zero. «Indeterminata» non vuol dire «impossibile da calcolare».` },

    { id: 'calcolo-forme-indeterminate', titolo: 'Come si risolvono le forme indeterminate', testo: R`Davanti a una forma indeterminata si riscrive l'espressione in un'altra, **uguale per $x \ne x_0$**, in cui l'indeterminazione sparisce. Tre tecniche coprono quasi tutti i casi del liceo, e la forma che esce sostituendo dice quale usare.

| forma e tipo di funzione | tecnica |
|---|---|
| $\frac{\infty}{\infty}$ o $\infty - \infty$ con polinomi, $x \to \infty$ | raccogliere la potenza più alta di $x$ |
| $\frac00$ con polinomi, $x \to x_0$ | scomporre e semplificare il fattore $(x - x_0)$ |
| $\frac00$ o $\infty - \infty$ con radici | razionalizzare (moltiplicare e dividere per il coniugato) |

### Raccogliere la potenza più alta

~ \lim_{x \to +\infty} \dfrac{2x^2 - x}{3x^2 + 5} :: sostituendo esce $\frac{\infty}{\infty}$
~ = \lim \dfrac{\evid{x^2}\left(2 - \frac1x\right)}{\evid{x^2}\left(3 + \frac{5}{x^2}\right)} :: raccolgo $x^2$ sopra e sotto
~ = \lim \dfrac{2 - \evid{\frac1x}}{3 + \evid{\frac{5}{x^2}}} :: semplifico $x^2$
~ = \evidb{\dfrac23} :: $\frac1x$ e $\frac{5}{x^2}$ vanno a $0$: restano i coefficienti dei termini più alti

### Scomporre e semplificare

~ \lim_{x \to 1} \dfrac{x^2 - 1}{x - 1} :: sostituendo esce $\frac00$
~ = \lim \dfrac{\evid{(x - 1)}(x + 1)}{\evid{x - 1}} :: $1$ annulla sopra e sotto, quindi $(x - 1)$ è un fattore di tutti e due
~ = \lim_{x \to 1} (x + 1) :: semplifico: si può, perché nel limite $x \ne 1$
~ = \evidb{2} :: ora sostituire funziona

È la funzione del grafico all'inizio: fuori da $x = 1$ coincide con la retta $y = x + 1$, e in $x = 1$ ha il buco all'altezza $2$.

?? Nel calcolo qui sopra si semplifica $(x-1)$, che in $x = 1$ vale zero. Perché è lecito?
=> Perché il limite guarda solo gli $x$ **diversi** da $1$, e per quegli $x$ il fattore $x - 1$ non è zero. Le due espressioni $\frac{x^2-1}{x-1}$ e $x + 1$ sono uguali ovunque tranne in $x = 1$, e quindi hanno lo stesso limite. La funzione di partenza, in $1$, continua a non esistere.

### Razionalizzare

~ \lim_{x \to +\infty} \left(\sqrt{x^2 + x} - x\right) :: sostituendo esce $\infty - \infty$
~ = \lim \dfrac{\left(\sqrt{x^2 + x} - x\right)\evid{\left(\sqrt{x^2 + x} + x\right)}}{\evid{\sqrt{x^2 + x} + x}} :: moltiplico e divido per il coniugato
~ = \lim \dfrac{\evid{x^2 + x - x^2}}{\sqrt{x^2 + x} + x} :: sopra c'è una differenza di quadrati: la radice sparisce
~ = \lim \dfrac{x}{x\left(\sqrt{1 + \frac1x} + 1\right)} :: sotto raccolgo $x$ (dalla radice esce come $x$, perché $x > 0$)
~ = \evidb{\dfrac12} :: semplifico $x$; $\frac1x \to 0$ e resta $\frac{1}{1 + 1}$

>! Non si sostituisce $\infty$ come se fosse un numero: $\sqrt{\infty} - \infty$ non vuol dire niente. Prima si trasforma l'espressione, poi si passa al limite.` },

    { id: 'limiti-notevoli', titolo: 'I limiti notevoli', testo: R`$\dfrac{\sin x}{x}$ per $x \to 0$ dà $\frac00$, ma qui non c'è niente da scomporre o razionalizzare. Limiti come questo si dimostrano una volta per tutte e poi si usano come formule: sono i **limiti notevoli**.

>* **Limiti notevoli:** per $x \to 0$ si ha $\dfrac{\sin x}{x} \to 1$, $\ \dfrac{1 - \cos x}{x^2} \to \dfrac12$, $\ \dfrac{e^x - 1}{x} \to 1$, $\ \dfrac{\ln(1 + x)}{x} \to 1$. Per $x \to \infty$ si ha $\left(1 + \dfrac1x\right)^x \to e$.

### Perché $\frac{\sin x}{x} \to 1$

Sulla circonferenza goniometrica (raggio $1$) prendi un angolo $x$, in radianti, fra $0$ e $\frac{\pi}{2}$. Ci sono tre figure una dentro l'altra: il triangolo $OAB$, di area $\frac12 \sin x$; lo spicchio di cerchio, di area $\frac12 x$; il triangolo $OAT$, di area $\frac12 \tan x$. Trascina $B$ verso $A$ e guarda il rapporto.

[[grafico:seno-cerchio]]

Mentre l'angolo si chiude, il segmento $\sin x$ e l'arco $x$ diventano quasi uguali, e il rapporto si avvicina a $1$. Con i conti:

~ \tfrac12 \sin x \le \tfrac12 x \le \tfrac12 \tan x :: le tre aree, una dentro l'altra
~ \sin x \le x \le \dfrac{\sin x}{\cos x} :: moltiplico per $2$ e scrivo la tangente come seno fratto coseno
~ \evid{1} \le \dfrac{x}{\sin x} \le \evid{\dfrac{1}{\cos x}} :: divido tutto per $\sin x$, che è positivo
~ \cos x \le \dfrac{\sin x}{x} \le 1 :: passo ai reciproci: i versi delle disuguaglianze si girano
~ \dfrac{\sin x}{x} \to \evidb{1} :: $\cos x \to 1$: la funzione è stretta fra due carabinieri che vanno a $1$

Per $x < 0$ vale lo stesso, perché $\frac{\sin x}{x}$ è pari.

### Gli altri, dal primo e dal numero $e$

Il limite con il coseno si riporta a quello con il seno:

~ \dfrac{1 - \cos x}{x^2} :: sostituendo $x = 0$ esce $\frac00$
~ = \dfrac{(1 - \cos x)\evid{(1 + \cos x)}}{x^2\evid{(1 + \cos x)}} :: moltiplico e divido per $1 + \cos x$
~ = \dfrac{\evid{\sin^2 x}}{x^2 (1 + \cos x)} :: sopra, $1 - \cos^2 x = \sin^2 x$
~ = \left(\dfrac{\sin x}{x}\right)^2 \cdot \dfrac{1}{1 + \cos x} :: separo in due fattori
~ \to 1^2 \cdot \dfrac12 = \evidb{\dfrac12} :: il primo va a $1$, il secondo a $\frac{1}{1+1}$

Il limite $\left(1 + \frac1x\right)^x \to e$ **definisce** il numero $e$. La base $1 + \frac1x$ va verso $1$ e l'esponente cresce: le due spinte si bilanciano su un valore finito.

| $x$ | $\left(1 + \frac1x\right)^x$ |
|---|---|
| $1$ | $2$ |
| $2$ | $2{,}25$ |
| $10$ | $2{,}594$ |
| $100$ | $2{,}705$ |
| $1000$ | $2{,}717$ |
| $100\,000$ | $2{,}718$ |

Gli ultimi due, con $e^x$ e $\ln(1+x)$, si ricavano da questo con un cambio di variabile.

>! I limiti notevoli valgono se quello che sta dentro ($\sin(\ldots)$, $e^{\ldots}$, $\ln(1 + \ldots)$) è **lo stesso** che sta sotto e **tende a $0$**. Con $\sin(3x)$ bisogna far comparire $3x$ anche sotto.

~ \lim_{x \to 0} \dfrac{\sin(3x)}{x} :: dentro il seno c'è $3x$, sotto solo $x$
~ = \lim \dfrac{\sin(3x)}{x} \cdot \evid{\dfrac{3}{3}} :: moltiplico e divido per $3$
~ = \lim \evid{3} \cdot \dfrac{\sin(3x)}{\evid{3x}} :: ora sopra e sotto c'è lo stesso $3x$, che tende a $0$
~ = 3 \cdot 1 = \evidb{3} :: applico il limite notevole con $t = 3x$

?? Quanto vale $\lim\limits_{x \to 0} \dfrac{\sin(5x)}{2x}$?
[x] $\dfrac52$
[ ] $1$
[ ] $\dfrac25$
=> Serve $5x$ sotto: $\dfrac{\sin(5x)}{2x} = \dfrac{5}{2} \cdot \dfrac{\sin(5x)}{5x} \to \dfrac52 \cdot 1$. Rispondere $1$ vuol dire applicare il limite notevole senza controllare che sopra e sotto ci sia la stessa cosa. $\frac25$ ha il rapporto capovolto.` },

    { id: 'gerarchia-successioni', titolo: 'Gerarchia degli infiniti e limiti di successioni', testo: R`$x^2$, $2^x$ e $\log_2 x$ vanno tutte a $+\infty$ quando $x \to +\infty$, ma con velocità molto diverse. Allarga la finestra del grafico con il cursore e guarda chi vince.

[[grafico:infiniti]]

All'inizio $x^2$ e $2^x$ si rincorrono (fra $2$ e $4$ la parabola sta perfino sopra), poi l'esponenziale scappa verso l'alto. Il logaritmo cresce anche lui, ma resta schiacciato in basso. Succede sempre così, qualunque siano le basi e gli esponenti.

>* **Gerarchia degli infiniti** (per $x \to +\infty$, con $a > 1$, $b > 0$, $c > 1$): $$\log_a x \ \ll\ x^b \ \ll\ c^x.$$ Il simbolo $\ll$ vuol dire che il rapporto fra il più lento e il più veloce tende a $0$: $\lim\limits_{x \to +\infty} \frac{\log_a x}{x^b} = 0$ e $\lim\limits_{x \to +\infty} \frac{x^b}{c^x} = 0$.

In un $\frac{\infty}{\infty}$ fra funzioni di tipo diverso, quindi, vince la più veloce. $\lim\limits_{x \to +\infty} \frac{\ln x}{x} = 0$, perché sotto c'è una potenza e sopra solo un logaritmo; $\lim\limits_{x \to +\infty} \frac{e^x}{x^3} = +\infty$, perché sopra c'è l'esponenziale.

?? Quanto vale $\lim\limits_{x \to +\infty} \dfrac{x^{100}}{2^x}$?
[x] $0$
[ ] $+\infty$
[ ] $1$
=> Una potenza, anche con esponente $100$, cresce più lentamente di qualunque esponenziale con base maggiore di $1$. Per $x$ piccoli $x^{100}$ è molto più grande (con $x = 10$: $10^{100}$ contro $1024$), ma da un certo punto in poi $2^x$ la supera e la distacca sempre di più. Il limite guarda solo quello che succede alla fine.

### Il limite di una successione

Una successione $a_n$ è una funzione definita sui numeri naturali, e il suo limite si cerca solo per $n \to +\infty$. È **convergente** se il limite è un numero, **divergente** se è $+\infty$ o $-\infty$, **irregolare** se non esiste: $a_n = (-1)^n$ salta fra $-1$ e $1$ senza avvicinarsi a niente.

Anche le somme di infiniti termini sono limiti di successioni: si sommano i primi $n$ termini e si guarda dove va il risultato per $n \to +\infty$. È così che si risolve il paradosso di Achille e la tartaruga.

[[animazione:achille-tartaruga]]

>! Per una successione non ha senso il limite per $n \to 3$ o il limite destro: $n$ salta da un intero all'altro e può solo crescere verso $+\infty$.` }
  ],

  grafici: {
    avvicinati: {
      tipo: 'piano', x: [-1, 3], y: [-0.5, 4.5],
      parametri: [ { nome: 'p', min: -0.8, max: 2.8, passo: 0.01, valore: 0.3, nascosto: true } ],
      funzioni: [ { f: '(x^2 - 1)/(x - 1)', etichetta: 'y = (x² − 1)/(x − 1)', colore: 1 } ],
      punti: [ { x: 1, y: 2, vuoto: true, colore: 1 } ],
      elementi: [
        { tipo: 'segmento', da: ['p', 0], a: ['p', 'p + 1'], tratteggio: true, colore: 2 },
        { tipo: 'segmento', da: ['p', 'p + 1'], a: [0, 'p + 1'], tratteggio: true, colore: 4 },
        { tipo: 'punto', p: [0, '(p^2 - 1)/(p - 1)'], colore: 4 },
        { tipo: 'punto', p: ['p', '(p^2 - 1)/(p - 1)'], colore: 4 },
        { tipo: 'punto', p: ['p', 0], trascina: true, colore: 2, etichetta: 'x', posizione: 'basso' },
        { tipo: 'testo', p: [2.9, 0.35], testo: 'x = {{p}} ;  f(x) = {{(p^2 - 1)/(p - 1)}}', ancora: 'end' }
      ],
      didascalia: 'Trascina x verso 1, da sinistra e poi da destra: il valore f(x) si legge sull\'asse y. Che succede quando x arriva proprio a 1?'
    },
    'epsilon-delta': {
      tipo: 'piano', x: [-0.5, 2.5], y: [0, 6], passo: [0.5, 1],
      parametri: [
        { nome: 'eps', min: 0.2, max: 1.5, passo: 0.05, valore: 1, etichetta: 'ε' },
        { nome: 'xd', min: 1.05, max: 2.2, passo: 0.01, valore: 1.8, nascosto: true }
      ],
      funzioni: [
        { f: '2x + 1', etichetta: 'y = 2x + 1', colore: 1 },
        { f: '2x + 1', dominio: ['2 - xd', 'xd'], colore: 4 }
      ],
      elementi: [
        { tipo: 'area', f: '3 + eps', g: '3 - eps', da: -0.5, a: 2.5, colore: 3 },
        { tipo: 'area', f: '6', g: '0', da: '2 - xd', a: 'xd', colore: 2 },
        { tipo: 'orizzontale', y: '3 + eps', tratteggio: true, colore: 3 },
        { tipo: 'orizzontale', y: '3 - eps', tratteggio: true, colore: 3 },
        { tipo: 'punto', p: [1, 3], colore: 1 },
        { tipo: 'punto', p: ['xd', 0], trascina: true, colore: 2, etichetta: 'δ', posizione: 'alto-destra' },
        { tipo: 'testo', p: [2.45, 1.05], testo: 'richiesto: f(x) fra {{3 - eps}} e {{3 + eps}}', ancora: 'end' },
        { tipo: 'testo', p: [2.45, 0.45], testo: 'con δ = {{xd - 1}}: f(x) fra {{5 - 2*xd}} e {{2*xd + 1}}', ancora: 'end' }
      ],
      didascalia: 'La fascia orizzontale è la tolleranza ε attorno a 3; la striscia verticale sono le x che distano da 1 meno di δ. Trascina δ: il tratto di retta evidenziato deve restare dentro la fascia.'
    },
    iperbole: {
      tipo: 'piano', x: [-4, 4], y: [-6, 6],
      parametri: [ { nome: 'p', min: -3.9, max: 3.9, passo: 0.01, valore: 1.5, nascosto: true } ],
      funzioni: [ { f: '1/x', etichetta: 'y = 1/x', colore: 1 } ],
      elementi: [
        { tipo: 'verticale', x: 0, asintoto: true },
        { tipo: 'orizzontale', y: 0, asintoto: true },
        { tipo: 'punto', p: ['p', '1/p'], colore: 4 },
        { tipo: 'punto', p: ['p', 0], trascina: true, colore: 2, etichetta: 'x', posizione: 'basso' },
        { tipo: 'testo', p: [-3.8, 5.3], testo: 'x = {{p}} ;  1/x = {{1/p}}', ancora: 'start' }
      ],
      didascalia: 'Trascina x verso 0, da destra e da sinistra, poi verso i bordi del grafico: guarda quanto vale 1/x.'
    },
    'seno-cerchio': {
      tipo: 'piano', x: [-0.3, 1.5], y: [-0.3, 2.3], proporzioni: 'uguali', passo: [0.5, 0.5],
      parametri: [ { nome: 't', min: 0.05, max: 1.1, passo: 0.01, valore: 0.9, etichetta: 'x (radianti)' } ],
      elementi: [
        { tipo: 'cerchio', centro: [0, 0], raggio: 1, colore: 3 },
        { tipo: 'poligono', punti: [[0, 0], [1, 0], [1, 'tan(t)']], colore: 4, riempi: true },
        { tipo: 'angolo', vertice: [0, 0], da: [1, 0], a: ['cos(t)', 'sin(t)'], raggio: 1, colore: 2 },
        { tipo: 'poligono', punti: [[0, 0], [1, 0], ['cos(t)', 'sin(t)']], colore: 1, riempi: true, etichette: ['O', 'A', 'B'] },
        { tipo: 'segmento', da: ['cos(t)', 0], a: ['cos(t)', 'sin(t)'], colore: 1, etichetta: 'sin x' },
        { tipo: 'segmento', da: [1, 0], a: [1, 'tan(t)'], colore: 4, etichetta: 'tan x' },
        { tipo: 'punto', p: [1, 'tan(t)'], colore: 4, etichetta: 'T', posizione: 'destra' },
        { tipo: 'punto', p: ['cos(t)', 'sin(t)'], trascina: true, giro: { parametro: 't', centro: [0, 0] }, colore: 2 },
        { tipo: 'testo', p: [1.15, 2.15], testo: 'sin x / x = {{sin(t)/t}}', ancora: 'start' }
      ],
      didascalia: 'Trascina B lungo la circonferenza verso A, o usa il cursore. Dalla più piccola: triangolo OAB, spicchio di cerchio, triangolo OAT. Guarda sin x / x.'
    },
    infiniti: {
      tipo: 'piano', x: [0, 'X'], y: [0, '2*X^2'],
      parametri: [ { nome: 'X', min: 5, max: 20, passo: 1, valore: 5, etichetta: 'finestra fino a x =' } ],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [0, 'X'] },
        { f: '2^x', etichetta: 'y = 2ˣ', colore: 2, dominio: [0, 'X'] },
        { f: 'log2(x)', etichetta: 'y = log₂ x', colore: 3, dominio: [0.05, 'X'] }
      ],
      didascalia: 'Allarga la finestra con il cursore: all\'inizio x² e 2ˣ si rincorrono, poi l\'esponenziale esce dal grafico e il logaritmo resta schiacciato in basso.'
    }
  },

  esempi: [
    { titolo: 'Un limite per sostituzione diretta', problema: R`Calcola $\lim_{x \to -1} (x^3 - 2x + 5)$.`, passi: [
      R`La funzione $x^3-2x+5$ è un polinomio: è continua su tutto $\mathbb{R}$, quindi il limite per $x\to x_0$ coincide con il valore della funzione in $x_0$.`,
      R`Sostituendo $x=-1$: $(-1)^3-2\cdot(-1)+5 = -1+2+5$.`,
      R`$-1+2+5=6$.`
    ], risultato: R`$\displaystyle\lim_{x\to-1}(x^3-2x+5)=6$` },

    { titolo: 'Una forma 0/0 risolta per scomposizione', problema: R`Calcola $\lim_{x\to3}\dfrac{x^2-9}{x^2-4x+3}$.`, passi: [
      R`Sostituendo $x=3$ si ottiene $\frac00$: forma indeterminata. Numeratore e denominatore si annullano entrambi in $x=3$, quindi hanno in comune il fattore $(x-3)$.`,
      R`Scompongo: $x^2-9=(x-3)(x+3)$ e $x^2-4x+3=(x-3)(x-1)$ (le radici di $x^2-4x+3=0$ sono $1$ e $3$).`,
      R`$\dfrac{(x-3)(x+3)}{(x-3)(x-1)}=\dfrac{x+3}{x-1}$ per ogni $x\ne3$.`,
      R`Il limite di $\dfrac{x+3}{x-1}$ per $x\to3$ è $\dfrac{6}{2}=3$.`
    ], risultato: R`$\displaystyle\lim_{x\to3}\dfrac{x^2-9}{x^2-4x+3}=3$` },

    { titolo: 'Una forma ∞ − ∞ risolta per razionalizzazione', problema: R`Calcola $\lim_{x\to+\infty}\left(\sqrt{x^2+1}-\sqrt{x^2-1}\right)$.`, passi: [
      R`È una forma $\infty-\infty$: entrambe le radici tendono a $+\infty$. Si moltiplica e divide per il coniugato $\sqrt{x^2+1}+\sqrt{x^2-1}$, per far comparire una differenza di quadrati.`,
      R`Al numeratore c'è $(a-b)(a+b) = a^2 - b^2$, con $a$ e $b$ le due radici: le radici spariscono e resta $(x^2+1)-(x^2-1)$.`,
      R`Semplifico il numeratore: $(x^2+1)-(x^2-1) = 2$. L'espressione diventa $\dfrac{2}{\sqrt{x^2+1}+\sqrt{x^2-1}}$.`,
      R`Il denominatore tende a $+\infty$ (somma di due quantità che tendono entrambe a $+\infty$): una costante fratto qualcosa che tende a $+\infty$ tende a $0$.`
    ], risultato: R`$\displaystyle\lim_{x\to+\infty}\left(\sqrt{x^2+1}-\sqrt{x^2-1}\right)=0$` },

    { titolo: 'Un limite notevole con un cambio di variabile', problema: R`Calcola $\lim_{x\to0}\dfrac{1-\cos(2x)}{x^2}$.`, passi: [
      R`Il limite notevole $\lim_{t\to0}\dfrac{1-\cos t}{t^2}=\dfrac12$ ha $t^2$ a denominatore: con $t=2x$ serve far comparire $(2x)^2$, non $x^2$.`,
      R`$\dfrac{1-\cos(2x)}{x^2} = 4\cdot\dfrac{1-\cos(2x)}{4x^2} = 4\cdot\dfrac{1-\cos(2x)}{(2x)^2}$.`,
      R`Ponendo $t=2x$ (e $t\to0$ quando $x\to0$), $\dfrac{1-\cos(2x)}{(2x)^2}=\dfrac{1-\cos t}{t^2}\to\dfrac12$.`,
      R`Il limite cercato vale $4\cdot\dfrac12=2$.`
    ], risultato: R`$\displaystyle\lim_{x\to0}\dfrac{1-\cos(2x)}{x^2}=2$` },

    { titolo: 'Un limite infinito che esiste, anche se la funzione non è definita nel punto', problema: R`Calcola $\lim_{x\to2}\dfrac{1}{(x-2)^2}$.`, passi: [
      R`Il denominatore $(x-2)^2$ è sempre positivo per $x\ne2$ (un quadrato non è mai negativo), e tende a $0$ sia per $x\to2^+$ sia per $x\to2^-$.`,
      R`Un numero positivo ($1$) diviso per un numero positivo che tende a $0$ tende a $+\infty$, indipendentemente dal segno con cui $x-2$ tende a $0$.`,
      R`A differenza di $\dfrac1{x-2}$ (dove il denominatore cambia segno), qui limite destro e limite sinistro coincidono: il limite bilatero esiste ed è infinito.`
    ], risultato: R`$\displaystyle\lim_{x\to2}\dfrac{1}{(x-2)^2}=+\infty$` },

    { titolo: 'Un secondo limite notevole, con il logaritmo', problema: R`Calcola $\lim_{x\to0}\dfrac{\ln(1+3x)}{x}$.`, passi: [
      R`Il limite notevole $\lim_{t\to0}\dfrac{\ln(1+t)}{t}=1$ richiede lo stesso $t$ dentro il logaritmo e a denominatore: qui c'è $3x$ dentro e $x$ sotto.`,
      R`$\dfrac{\ln(1+3x)}{x} = 3\cdot\dfrac{\ln(1+3x)}{3x}$.`,
      R`Ponendo $t=3x$, $\dfrac{\ln(1+3x)}{3x}=\dfrac{\ln(1+t)}{t}\to1$ per $x\to0$ (quindi $t\to0$).`,
      R`Il limite cercato vale $3\cdot1=3$.`
    ], risultato: R`$\displaystyle\lim_{x\to0}\dfrac{\ln(1+3x)}{x}=3$` }
  ],

  formulario: [
    { nome: 'Intorni', formula: R`(x_0-\delta,\ x_0+\delta), \qquad (M,+\infty), \qquad (-\infty,M)`, nota: R`Intorno di $x_0$, di $+\infty$ e di $-\infty$ rispettivamente, con $\delta>0$ e $M$ grande a piacere.` },
    { nome: 'Limite finito per x → x₀', formula: R`\forall \varepsilon>0\ \exists\,\delta>0:\ 0<|x-x_0|<\delta \Rightarrow |f(x)-L|<\varepsilon` },
    { nome: 'Limite infinito per x → x₀', formula: R`\forall M>0\ \exists\,\delta>0:\ 0<|x-x_0|<\delta \Rightarrow f(x)>M`, nota: R`Analoga per $-\infty$, con $f(x)<-M$.` },
    { nome: 'Limite per x → ∞', formula: R`\forall \varepsilon>0\ \exists\,N>0:\ |x|>N \Rightarrow |f(x)-L|<\varepsilon`, nota: R`Versione per limite finito; per limite infinito si combina con la definizione precedente.` },
    { nome: 'Somma dei limiti', formula: R`\lim (f\pm g) = \lim f \pm \lim g` },
    { nome: 'Prodotto dei limiti', formula: R`\lim (f\cdot g) = \lim f \cdot \lim g` },
    { nome: 'Quoziente dei limiti', formula: R`\lim \frac{f}{g} = \frac{\lim f}{\lim g}`, nota: R`Vale se $\lim g \ne 0$.` },
    { nome: 'Le sette forme indeterminate', formula: R`\infty-\infty,\ \ 0\cdot\infty,\ \ \frac{\infty}{\infty},\ \ \frac00,\ \ 1^{\infty},\ \ 0^0,\ \ \infty^0` },
    { nome: 'Limite notevole del seno', formula: R`\lim_{x\to0}\frac{\sin x}{x}=1` },
    { nome: 'Limite notevole del coseno', formula: R`\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12` },
    { nome: 'Numero e', formula: R`\lim_{x\to\infty}\left(1+\frac1x\right)^x=e`, nota: R`$e \approx 2{,}718$.` },
    { nome: 'Limite notevole esponenziale', formula: R`\lim_{x\to0}\frac{e^x-1}{x}=1` },
    { nome: 'Limite notevole logaritmico', formula: R`\lim_{x\to0}\frac{\ln(1+x)}{x}=1` },
    { nome: 'Gerarchia degli infiniti', formula: R`\log_a x \ll x^b \ll c^x \qquad (x\to+\infty)`, nota: R`Con $a>1$, $b>0$, $c>1$.` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'intorni-accumulazione', tipo: 'definizione', fronte: R`Intorno di $x_0$`, retro: R`Intervallo aperto $(x_0-\delta, x_0+\delta)$, con $\delta>0$ piccolo a piacere.` },
    { id: 'fc-02', sezione: 'intorni-accumulazione', tipo: 'definizione', fronte: R`Intorno di $+\infty$`, retro: R`Un intervallo $(M, +\infty)$, con $M$ grande a piacere.` },
    { id: 'fc-03', sezione: 'intorni-accumulazione', tipo: 'concetto', fronte: R`Cos'è un punto di accumulazione di un insieme $A$?`, retro: R`Un punto $x_0$ tale che ogni suo intorno contiene almeno un punto di $A$ diverso da $x_0$.` },
    { id: 'fc-04', sezione: 'idea-intuitiva', tipo: 'concetto', fronte: R`Cosa dice, intuitivamente, $\lim_{x\to x_0} f(x)=L$?`, retro: R`Che $f(x)$ si avvicina quanto si vuole a $L$ quando $x$ si avvicina, senza coincidere, a $x_0$.` },
    { id: 'fc-05', sezione: 'idea-intuitiva', tipo: 'concetto', fronte: R`Il limite dipende dal valore $f(x_0)$?`, retro: R`No: dipende solo dal comportamento di $f$ vicino a $x_0$, non dal valore (se esiste) in $x_0$.` },
    { id: 'fc-06', sezione: 'definizione-limite-finito', tipo: 'formula', fronte: R`Definizione ε-δ di limite finito`, retro: R`$\forall \varepsilon>0\ \exists\,\delta>0: 0<|x-x_0|<\delta \Rightarrow |f(x)-L|<\varepsilon$.` },
    { id: 'fc-07', sezione: 'definizione-limite-finito', tipo: 'concetto', fronte: R`Perché nella definizione si scrive $0<|x-x_0|$?`, retro: R`Per escludere $x=x_0$: il limite non considera il valore della funzione in $x_0$.` },
    { id: 'fc-08', sezione: 'limiti-infiniti', tipo: 'definizione', fronte: R`Limite infinito per $x\to x_0$`, retro: R`$\forall M>0\ \exists\,\delta>0: 0<|x-x_0|<\delta \Rightarrow f(x)>M$ (analoga per $-\infty$).` },
    { id: 'fc-09', sezione: 'limiti-infiniti', tipo: 'concetto', fronte: R`Asintoti di $y=1/x$`, retro: R`Le rette $x=0$ (verticale) e $y=0$ (orizzontale): la curva vi si avvicina senza mai toccarle.` },
    { id: 'fc-10', sezione: 'limite-destro-sinistro', tipo: 'concetto', fronte: R`Quando esiste $\lim_{x\to x_0} f(x)$?`, retro: R`Quando esistono limite destro e sinistro e sono uguali; il loro valore comune è il limite.` },
    { id: 'fc-11', sezione: 'limite-destro-sinistro', tipo: 'concetto', fronte: R`Perché $\lim_{x\to0}\frac{|x|}{x}$ non esiste?`, retro: R`Perché il limite destro vale $1$ e quello sinistro vale $-1$: sono diversi.` },
    { id: 'fc-12', sezione: 'teoremi-limiti', tipo: 'concetto', fronte: R`Teorema di unicità del limite`, retro: R`Se il limite esiste, è unico: $f(x)$ non può avvicinarsi contemporaneamente a due valori diversi.` },
    { id: 'fc-13', sezione: 'teoremi-limiti', tipo: 'concetto', fronte: R`Teorema della permanenza del segno`, retro: R`Se $\lim f=L\ne0$, in un intorno di $x_0$ (tranne al più $x_0$) $f(x)$ ha lo stesso segno di $L$.` },
    { id: 'fc-14', sezione: 'teoremi-limiti', tipo: 'concetto', fronte: R`Teorema del confronto (dei due carabinieri)`, retro: R`Se $g\le f\le h$ vicino a $x_0$ e $\lim g=\lim h=L$, allora anche $\lim f=L$.` },
    { id: 'fc-15', sezione: 'operazioni-forme-indeterminate', tipo: 'formula', fronte: R`Le sette forme indeterminate`, retro: R`$\infty-\infty$, $0\cdot\infty$, $\frac{\infty}{\infty}$, $\frac00$, $1^{\infty}$, $0^0$, $\infty^0$.` },
    { id: 'fc-16', sezione: 'operazioni-forme-indeterminate', tipo: 'concetto', fronte: R`Perché $0/0$ è una forma indeterminata?`, retro: R`Perché limiti diversi con quella forma danno risultati diversi: il valore dipende dalle funzioni, non solo dalla forma.` },
    { id: 'fc-17', sezione: 'calcolo-forme-indeterminate', tipo: 'procedura', fronte: R`Come si affronta $\infty/\infty$ con i polinomi?`, retro: R`Si raccoglie la potenza più alta di $x$ a numeratore e denominatore, poi si semplifica.` },
    { id: 'fc-18', sezione: 'calcolo-forme-indeterminate', tipo: 'procedura', fronte: R`Come si affronta $0/0$ con i polinomi?`, retro: R`Si scompongono numeratore e denominatore e si semplifica il fattore comune che si annulla in $x_0$.` },
    { id: 'fc-19', sezione: 'calcolo-forme-indeterminate', tipo: 'procedura', fronte: R`Come si affronta $\infty-\infty$ con le radici?`, retro: R`Si moltiplica e divide per l'espressione coniugata: è la razionalizzazione.` },
    { id: 'fc-20', sezione: 'limiti-notevoli', tipo: 'formula', fronte: R`$\lim_{x\to0}\dfrac{\sin x}{x}$`, retro: R`Vale $1$.` },
    { id: 'fc-21', sezione: 'limiti-notevoli', tipo: 'formula', fronte: R`$\lim_{x\to\infty}\left(1+\frac1x\right)^x$`, retro: R`Vale $e \approx 2{,}718$.` },
    { id: 'fc-22', sezione: 'limiti-notevoli', tipo: 'formula', fronte: R`$\lim_{x\to0}\frac{e^x-1}{x}$ e $\lim_{x\to0}\frac{\ln(1+x)}{x}$`, retro: R`Valgono entrambi $1$.` },
    { id: 'fc-23', sezione: 'gerarchia-successioni', tipo: 'concetto', fronte: R`Gerarchia degli infiniti`, retro: R`Per $x\to+\infty$: $\log_a x \ll x^b \ll c^x$. I logaritmi sono più deboli delle potenze, le potenze più deboli degli esponenziali.` },
    { id: 'fc-24', sezione: 'gerarchia-successioni', tipo: 'definizione', fronte: R`Successione irregolare (o oscillante)`, retro: R`Una successione il cui limite non esiste, né finito né infinito: per esempio $a_n=(-1)^n$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Calcola $\lim_{x\to-1}(x^3-2x+5)$.`, suggerimenti: [R`È una funzione polinomiale, quindi continua: puoi sostituire direttamente $x=-1$.`, R`Calcola $(-1)^3$, poi $-2\cdot(-1)$, poi somma anche il $5$.`], risposta: { tipo: 'numero', valore: 6, tolleranza: 0.001 }, soluzione: [R`La funzione è un polinomio, continuo su tutto $\mathbb{R}$: il limite coincide con il valore in $x=-1$.`, R`$(-1)^3-2\cdot(-1)+5=-1+2+5=6$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $\lim_{x\to+\infty}\dfrac{3x^2-2}{5x^2+x}$.`, suggerimenti: [R`È una forma $\infty/\infty$: raccogli la potenza più alta di $x$ sopra e sotto.`, R`Dopo aver raccolto $x^2$, cosa succede ai termini con $\frac1x$ e $\frac1{x^2}$ quando $x\to+\infty$?`], risposta: { tipo: 'numero', valore: 0.6, tolleranza: 0.001 }, soluzione: [R`È una forma $\infty/\infty$: si raccoglie $x^2$ sia al numeratore sia al denominatore.`, R`$\dfrac{3x^2-2}{5x^2+x} = \dfrac{x^2\left(3-\frac2{x^2}\right)}{x^2\left(5+\frac1x\right)} = \dfrac{3-\frac2{x^2}}{5+\frac1x}$.`, R`Per $x\to+\infty$, $\frac2{x^2}\to0$ e $\frac1x\to0$: il limite è $\dfrac35=0{,}6$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Calcola $\lim_{x\to2}\dfrac{x^2-4}{x-2}$.`, suggerimenti: [R`È una forma $0/0$: scomponi il numeratore come differenza di quadrati.`, R`$x^2-4=(x-2)(x+2)$: semplifica il fattore comune.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001 }, soluzione: [R`Sostituendo $x=2$ si ottiene $\frac00$: serve scomporre.`, R`$x^2-4=(x-2)(x+2)$, quindi $\dfrac{x^2-4}{x-2}=x+2$ per ogni $x\ne2$.`, R`Il limite di $x+2$ per $x\to2$ è $4$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Calcola $\lim_{x\to0}\dfrac{\sin(3x)}{x}$.`, suggerimenti: [R`Riconduciti al limite notevole moltiplicando e dividendo per $3$.`, R`Scrivi $3\cdot\dfrac{\sin(3x)}{3x}$ e ricorda che $\frac{\sin t}{t}\to1$ quando $t\to0$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.001 }, soluzione: [R`Per usare il limite notevole serve lo stesso argomento a denominatore: si moltiplica e divide per $3$.`, R`$\dfrac{\sin(3x)}{x}=3\cdot\dfrac{\sin(3x)}{3x}$.`, R`Ponendo $t=3x$ ($t\to0$ quando $x\to0$), $\dfrac{\sin(3x)}{3x}=\dfrac{\sin t}{t}\to1$, quindi il limite vale $3\cdot1=3$.`] },
    { id: 'es-05', difficolta: 2, testo: R`Calcola $\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)$.`, suggerimenti: [R`È una forma $\infty-\infty$ con una radice: moltiplica e dividi per il coniugato $\sqrt{x^2+x}+x$.`, R`Al numeratore, dopo aver moltiplicato, ti resta solo $x$.`, R`Dividi numeratore e denominatore per $x$ e fai tendere $x\to+\infty$.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.001 }, soluzione: [R`Si moltiplica e divide per il coniugato $\sqrt{x^2+x}+x$.`, R`$\left(\sqrt{x^2+x}-x\right)\cdot\dfrac{\sqrt{x^2+x}+x}{\sqrt{x^2+x}+x} = \dfrac{x^2+x-x^2}{\sqrt{x^2+x}+x} = \dfrac{x}{\sqrt{x^2+x}+x}$.`, R`Dividendo per $x$ (positivo, perché $x\to+\infty$): $\dfrac{1}{\sqrt{1+\frac1x}+1} \to \dfrac1{1+1}=\dfrac12$.`] },
    { id: 'es-06', difficolta: 1, testo: R`Calcola $\lim_{x\to1^+}\dfrac{1}{x-1}$.`, suggerimenti: [R`Quando $x\to1^+$, il denominatore $x-1$ è positivo e tende a $0$.`, R`Un numero positivo diviso per qualcosa di positivo che tende a $0$ tende a $+\infty$.`], risposta: { tipo: 'testo', accettate: ['+inf', '+∞', 'infinito', '+infinito', 'più infinito'] }, soluzione: [R`Per $x\to1^+$, $x>1$, quindi $x-1\to0^+$ (positivo e piccolissimo).`, R`$\dfrac1{x-1}$ è il rapporto tra $1$ e un numero positivo che tende a $0$: il quoziente tende a $+\infty$.`] },
    { id: 'es-07', difficolta: 1, testo: R`Calcola $\lim_{x\to0}\dfrac{e^{2x}-1}{x}$.`, suggerimenti: [R`Riconduciti al limite notevole $\frac{e^t-1}{t}\to1$ con $t=2x$.`, R`Scrivi $2\cdot\dfrac{e^{2x}-1}{2x}$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.001 }, soluzione: [R`Si riconduce al limite notevole $\frac{e^t-1}{t}\to1$ ponendo $t=2x$.`, R`$\dfrac{e^{2x}-1}{x} = 2\cdot\dfrac{e^{2x}-1}{2x} \to 2\cdot1=2$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Calcola $\lim_{x\to+\infty}\dfrac{\ln x}{x}$.`, suggerimenti: [R`Confronta la velocità di crescita di $\ln x$ e di $x$.`, R`Nella gerarchia degli infiniti, il logaritmo è sempre il più debole.`], risposta: { tipo: 'numero', valore: 0, tolleranza: 0.001 }, soluzione: [R`Nella gerarchia degli infiniti, per $x\to+\infty$ ogni logaritmo è più debole di ogni potenza positiva di $x$, in particolare di $x=x^1$.`, R`Quindi $\dfrac{\ln x}{x}\to0$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Calcola $\lim_{x\to+\infty}\left(1+\dfrac2x\right)^x$ (nella casella scrivi il valore decimale, con almeno due cifre dopo la virgola).`, suggerimenti: [R`Confronta con il limite notevole $\left(1+\frac1t\right)^t\to e$: qui l'esponente della base è $\frac2x$ invece di $\frac1x$.`, R`Poni $t=\dfrac{x}{2}$ e riscrivi $\left(1+\frac1t\right)^{2t}=\left[\left(1+\frac1t\right)^t\right]^2$.`], risposta: { tipo: 'numero', valore: 7.389056099, tolleranza: 0.01 }, soluzione: [R`Si confronta con il limite notevole $\left(1+\frac1t\right)^t\to e$, ponendo $t=\dfrac{x}{2}$ (così $\frac2x=\frac1t$).`, R`$\left(1+\dfrac2x\right)^x = \left[\left(1+\dfrac1t\right)^t\right]^2$.`, R`Per $x\to+\infty$ anche $t\to+\infty$, quindi $\left(1+\frac1t\right)^t\to e$ e il limite vale $e^2\approx7{,}389$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Stabilisci se esiste $\lim_{x\to0}\dfrac{|x|}{x}$; se non esiste, scrivilo esplicitamente.`, suggerimenti: [R`Calcola separatamente il limite destro (dove $|x|=x$) e il limite sinistro (dove $|x|=-x$).`, R`Se i due limiti sono diversi, il limite bilatero non esiste.`], risposta: { tipo: 'testo', accettate: ['non esiste', 'nessun limite', 'non esiste il limite'] }, soluzione: [R`Per $x>0$, $|x|=x$, quindi $\dfrac{|x|}{x}=1$: il limite destro in $0$ vale $1$.`, R`Per $x<0$, $|x|=-x$, quindi $\dfrac{|x|}{x}=-1$: il limite sinistro in $0$ vale $-1$.`, R`I due limiti sono diversi, quindi il limite per $x\to0$ **non esiste**.`] },
    { id: 'es-11', difficolta: 3, testo: R`Calcola $\lim_{n\to+\infty}\dfrac{n^2+1}{2n^2-3}$ (limite di una successione).`, suggerimenti: [R`Vale la stessa gerarchia dei limiti di funzione: raccogli $n^2$ sopra e sotto.`, R`Dopo aver raccolto $n^2$, i termini $\frac1{n^2}$ e $\frac3{n^2}$ tendono a $0$.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.001 }, soluzione: [R`Come per i limiti di funzione, si raccoglie $n^2$ sopra e sotto: $\dfrac{n^2+1}{2n^2-3} = \dfrac{n^2\left(1+\frac1{n^2}\right)}{n^2\left(2-\frac3{n^2}\right)}$.`, R`Per $n\to+\infty$, $\frac1{n^2}\to0$ e $\frac3{n^2}\to0$: la successione converge a $\dfrac12$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cos'è un intorno di $x_0$?`, opzioni: [R`Un intervallo aperto $(x_0-\delta, x_0+\delta)$, con $\delta>0$`, R`Un insieme finito di punti vicino a $x_0$`, R`Un intervallo chiuso che contiene $x_0$ come estremo`, R`L'insieme dei numeri maggiori di $x_0$`], corretta: 0, spiegazione: R`Per definizione l'intorno di $x_0$ è un intervallo aperto centrato in $x_0$: non è chiuso, non è composto da un numero finito di punti, e non è una semiretta.` },
    { id: 'q-02', domanda: R`Un intorno di $+\infty$ è...`, opzioni: [R`L'insieme dei numeri interi maggiori di $0$`, R`Un intervallo $(M, +\infty)$, con $M$ grande a piacere`, R`Un intervallo $(-\infty, M)$`, R`L'intervallo $(0, +\infty)$ fissato`], corretta: 1, spiegazione: R`L'intorno di $+\infty$ è una semiretta che parte da un $M$ arbitrariamente grande; l'intervallo $(-\infty, M)$ è l'intorno di $-\infty$, e un intervallo fissato non permette di scegliere $M$ a piacere.` },
    { id: 'q-03', domanda: R`$x_0$ è punto di accumulazione di un insieme $A$ se...`, opzioni: [R`$x_0$ appartiene ad $A$`, R`Ogni intorno di $x_0$ contiene almeno un punto di $A$ diverso da $x_0$`, R`$A$ contiene infiniti punti`, R`$x_0$ è il minimo di $A$`], corretta: 1, spiegazione: R`È proprio questa la definizione; $x_0$ non deve necessariamente appartenere ad $A$, come mostra l'esempio $A=\{1/n\}$ con punto di accumulazione $0 \notin A$.` },
    { id: 'q-04', domanda: R`Il limite $\lim_{x\to x_0} f(x)$...`, opzioni: [R`Coincide sempre con $f(x_0)$`, R`Esiste solo se $f$ è definita in $x_0$`, R`Non si può calcolare se $f(x_0)$ non esiste`, R`Dipende dal comportamento di $f$ vicino a $x_0$, non dal valore in $x_0$`], corretta: 3, spiegazione: R`Il limite descrive cosa succede intorno a $x_0$: può esistere anche se $f(x_0)$ non è definito, e può differire da $f(x_0)$ quando questo esiste.` },
    { id: 'q-05', domanda: R`Nella definizione $\forall\varepsilon>0\ \exists\delta>0:0<|x-x_0|<\delta\Rightarrow|f(x)-L|<\varepsilon$, che cosa rappresenta $\varepsilon$?`, opzioni: [R`La tolleranza richiesta sui valori di $f(x)$ rispetto a $L$`, R`La distanza tra $x_0$ e $L$`, R`Il dominio della funzione`, R`Il numero di soluzioni dell'equazione`], corretta: 0, spiegazione: R`$\varepsilon$ è la precisione richiesta sull'asse $y$; $\delta$ è la risposta corrispondente sull'asse $x$, cioè quanto restringere l'intorno di $x_0$.` },
    { id: 'q-06', domanda: R`Perché nella definizione di limite si richiede $0<|x-x_0|$ e non semplicemente $|x-x_0|<\delta$?`, opzioni: [R`Per includere anche $x=x_0$`, R`Per escludere $x=x_0$, dato che il limite non dipende dal valore in $x_0$`, R`Per garantire che $\delta$ sia positivo`, R`È un dettaglio stilistico, senza importanza`], corretta: 1, spiegazione: R`La disuguaglianza $0<|x-x_0|$ esclude proprio $x=x_0$: al limite non interessa cosa succede esattamente in $x_0$, solo nei punti vicini.` },
    { id: 'q-07', domanda: R`Il teorema di unicità del limite afferma che...`, opzioni: [R`Ogni funzione ha un limite in ogni punto`, R`Il limite è sempre uguale a $f(x_0)$`, R`Se il limite esiste, è unico`, R`Due funzioni diverse non possono avere lo stesso limite`], corretta: 2, spiegazione: R`Il teorema garantisce che non esistono due valori limite diversi per la stessa funzione nello stesso punto; non dice che il limite esista sempre, né lo lega al valore $f(x_0)$.` },
    { id: 'q-08', domanda: R`Il teorema della permanenza del segno richiede che...`, opzioni: [R`$f$ sia continua`, R`$L=0$`, R`$f$ sia definita in $x_0$`, R`$L\ne0$`], corretta: 3, spiegazione: R`Se $L=0$ non si può dedurre nulla sul segno di $f$ vicino a $x_0$: la permanenza del segno vale solo per limiti diversi da $0$.` },
    { id: 'q-09', domanda: R`Il teorema del confronto (dei due carabinieri) si usa quando...`, opzioni: [R`Una funzione è compresa tra altre due funzioni che hanno lo stesso limite`, R`Si conosce già il valore esatto del limite`, R`La funzione è un polinomio`, R`Il limite è una forma indeterminata $0^0$`], corretta: 0, spiegazione: R`Il teorema conclude che il limite della funzione "stretta" tra le altre due è lo stesso, quando queste hanno un limite comune $L$.` },
    { id: 'q-10', domanda: R`Quale delle seguenti NON è una forma indeterminata?`, opzioni: [R`$\frac{\infty}{\infty}$`, R`$\frac{L}{0}$ con $L\ne0$`, R`$0\cdot\infty$`, R`$\infty-\infty$`], corretta: 1, spiegazione: R`$\frac{L}{0}$ con $L\ne0$ non è indeterminata: il quoziente diventa comunque enorme in valore assoluto. Il segno dipende dal segno di $L$ e da come il denominatore va a zero (da valori positivi o negativi); se da destra e da sinistra i segni sono diversi, il limite non esiste. Le altre tre sono forme indeterminate.` },
    { id: 'q-11', domanda: R`Per risolvere $\lim_{x\to+\infty}\frac{2x^3-x}{5x^3+1}$ (forma $\infty/\infty$) conviene...`, opzioni: [R`Sostituire direttamente $x=+\infty$`, R`Applicare un limite notevole`, R`Raccogliere la potenza più alta di $x$ a numeratore e denominatore`, R`Razionalizzare`], corretta: 2, spiegazione: R`Il raccoglimento della potenza dominante è la tecnica standard per $\infty/\infty$ con i polinomi; limiti notevoli e razionalizzazione servono per altri tipi di indeterminazione.` },
    { id: 'q-12', domanda: R`Quale tecnica si usa tipicamente per una forma $0/0$ ottenuta da una radice, come $\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}$?`, opzioni: [R`Il raccoglimento a fattor comune`, R`Un limite notevole goniometrico`, R`Il teorema della permanenza del segno`, R`La razionalizzazione (moltiplicare per il coniugato)`], corretta: 3, spiegazione: R`Con le radici la scomposizione in fattori non si applica direttamente: si moltiplica e divide per il coniugato $\sqrt{x+1}+1$, così al numeratore la radice sparisce, resta $x$ e si può semplificare.` },
    { id: 'q-13', domanda: R`Quanto vale $\lim_{x\to0}\dfrac{\sin x}{x}$?`, opzioni: [R`$1$`, R`$0$`, R`Non esiste`, R`$+\infty$`], corretta: 0, spiegazione: R`È il più famoso dei limiti notevoli, dimostrabile con un confronto di aree e il teorema del confronto.` },
    { id: 'q-14', domanda: R`Quanto vale $\lim_{x\to\infty}\left(1+\dfrac1x\right)^x$?`, opzioni: [R`$1$`, R`Il numero $e \approx 2{,}718$`, R`$+\infty$`, R`$0$`], corretta: 1, spiegazione: R`È la definizione stessa del numero di Nepero $e$: base che tende a $1$ ed esponente che tende a $\infty$ si bilanciano in un valore finito.` },
    { id: 'q-15', domanda: R`Nella gerarchia degli infiniti, per $x\to+\infty$...`, opzioni: [R`I logaritmi crescono più velocemente delle potenze`, R`Le potenze crescono più velocemente degli esponenziali (con base $>1$)`, R`I logaritmi crescono più lentamente di qualsiasi potenza positiva di $x$`, R`Esponenziali e potenze crescono sempre alla stessa velocità`], corretta: 2, spiegazione: R`La gerarchia è: logaritmi $\ll$ potenze $\ll$ esponenziali. Le altre affermazioni invertono l'ordine corretto o negano che ci sia differenza.` },
    { id: 'q-16', domanda: R`Una successione $a_n$ si dice irregolare (oscillante) quando...`, opzioni: [R`Converge a un limite finito`, R`Diverge a $+\infty$`, R`È definita solo per $n$ pari`, R`Il limite non esiste, né finito né infinito`], corretta: 3, spiegazione: R`Esempio tipico: $a_n=(-1)^n$, che alterna $1$ e $-1$ senza avvicinarsi a nessun valore né crescere indefinitamente.` }
  ],

  suggerimenti: [
    { tipo: 'errore', testo: R`Calcolare $f(x_0)$ e chiamarlo "il limite" è sbagliato in generale: funziona solo se $f$ è continua in $x_0$. Il limite guarda i valori **intorno** a $x_0$, non in $x_0$.` },
    { tipo: 'errore', testo: R`$\delta$ non è un numero fisso: dipende da $\varepsilon$. Non ha senso chiedere "qual è il $\delta$ di questo limite" senza prima fissare $\varepsilon$.` },
    { tipo: 'metodo', testo: R`Prima di applicare qualunque tecnica, sostituisci $x_0$ nell'espressione: se non ottieni una forma indeterminata, il limite è già calcolato.` },
    { tipo: 'errore', testo: R`$\infty-\infty$ non fa $0$, e $\dfrac{\infty}{\infty}$ non fa $1$: sono forme indeterminate, il risultato dipende da come le due parti crescono.` },
    { tipo: 'trucco', testo: R`Per riconoscere in fretta un $0/0$ polinomiale: se $x_0$ annulla sia il numeratore sia il denominatore, allora $(x-x_0)$ è sicuramente un fattore comune di entrambi.` },
    { tipo: 'trucco', testo: R`Nei limiti notevoli, l'argomento della funzione (dentro $\sin$, $e^{(\cdot)}$, $\ln(1+\cdot)$) deve tendere esattamente a $0$: se non lo è, moltiplica e dividi per farlo comparire.` },
    { tipo: 'metodo', testo: R`Per stimare in fretta un $\infty/\infty$, chiediti: numeratore e denominatore sono logaritmi, potenze o esponenziali? Nella gerarchia degli infiniti, il più "forte" decide il risultato.` },
    { tipo: 'errore', testo: R`Scrivere $\lim_{x\to0}\frac1x=\infty$ senza precisare il segno è impreciso quando destro e sinistro differiscono: in quel caso il limite bilatero non esiste affatto.` }
  ],

  aneddoti: [
    { matematico: 'Zenone di Elea', anni: 'circa 490–430 a.C.', titolo: 'Achille, la tartaruga e un vantaggio incolmabile', testo: R`Zenone, allievo di Parmenide, costruì una serie di paradossi per difendere l'idea del maestro che il movimento fosse un'illusione dei sensi. Il più famoso: Achille, velocissimo, gareggia con una tartaruga a cui concede un vantaggio di partenza. Quando Achille raggiunge il punto da cui la tartaruga è partita, questa si è già spostata un poco più avanti; quando Achille raggiunge quel nuovo punto, la tartaruga si è spostata ancora, e così all'infinito. Sembra che Achille non possa mai sorpassarla. Il paradosso restò un rompicapo filosofico per secoli: mancava uno strumento preciso per dire che una somma di infiniti addendi, ciascuno più piccolo del precedente, può avere un totale finito: quello strumento sono, appunto, i limiti.`, legame: R`La somma dei tempi impiegati da Achille in ogni tratto è una serie infinita con somma finita: è il concetto di limite a risolvere il paradosso.` },
    { matematico: 'Archimede di Siracusa', anni: '287–212 a.C.', titolo: 'Il metodo di esaustione, un limite senza nome', testo: R`Duemila anni prima dell'invenzione formale del limite, Archimede calcolò l'area del cerchio e il volume della sfera con un procedimento che oggi chiameremmo "al limite". Per l'area del cerchio inscrisse (e circoscrisse) poligoni regolari con un numero di lati sempre maggiore: un poligono di $6$ lati approssima male, uno di $96$ lati approssima benissimo, e aumentando indefinitamente il numero dei lati l'approssimazione diventa buona quanto si vuole, "esaurendo" la differenza tra poligono e cerchio. Archimede non disponeva del concetto di limite né della notazione moderna, quindi ogni risultato andava dimostrato per assurdo, escludendo che l'area potesse essere sia maggiore sia minore del valore trovato. Era un metodo già rigorosissimo, applicato secoli prima che qualcuno lo chiamasse "passaggio al limite".`, legame: R`Il metodo di esaustione è la prima idea storica di "avvicinarsi indefinitamente a un valore": lo stesso principio dietro ogni definizione di limite.` },
    { matematico: 'George Berkeley', anni: '1685–1753', titolo: 'I «fantasmi delle quantità defunte»', testo: R`Nel 1734 il vescovo e filosofo irlandese George Berkeley pubblicò un pamphlet dal titolo *The Analyst*, un attacco durissimo al calcolo infinitesimale di Newton e Leibniz. Il bersaglio erano gli "infinitesimi": quantità trattate come diverse da zero quando si dividevano (altrimenti la divisione non avrebbe senso), ma trattate come zero quando si eliminavano dal risultato finale. Berkeley chiese, con il sarcasmo del filosofo più che del matematico: cosa sono, questi infinitesimi, se non i «fantasmi delle quantità defunte»? Il calcolo funzionava, dava risultati corretti e utilissimi in fisica, ma nessuno sapeva spiegare *perché* funzionasse in modo logicamente coerente. Ci vollero quasi cento anni, con Cauchy e poi Weierstrass, prima che la critica di Berkeley trovasse una risposta rigorosa nel concetto moderno di limite.`, legame: R`La definizione ε-δ nasce proprio per sostituire gli infinitesimi "fantasma" con un confronto preciso, senza contraddizioni, tra numeri.` },
    { matematico: 'Augustin-Louis Cauchy', anni: '1789–1857', titolo: "Il Cours d'analyse e il primo limite scritto per bene", testo: R`Cauchy insegnava all'École Polytechnique di Parigi quando, nel 1821, pubblicò il *Cours d'analyse*, il libro che riorganizzò l'analisi matematica intorno all'idea di limite, invece che sugli infinitesimi vaghi dei secoli precedenti. Cauchy descrisse il limite come il valore a cui una variabile si avvicina indefinitamente, fino a differirne per meno di una quantità piccola quanto si vuole: un'idea ancora espressa a parole, non con le lettere $\varepsilon$ e $\delta$, ma già molto vicina alla definizione moderna. Era un docente esigente e prolifico (pubblicò più di 800 lavori), poco amato dagli studenti per il rigore improvviso che pretendeva in un'epoca abituata a ragionare in modo più intuitivo e disinvolto.`, legame: R`Il Cours d'analyse è il primo testo a fondare sistematicamente limiti, continuità e derivate sulla stessa idea rigorosa che si studia oggi.` },
    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Dal liceo di provincia alla definizione definitiva', testo: R`Weierstrass lasciò l'università di Bonn senza laurearsi, e passò quattordici anni a insegnare matematica, ma anche ginnastica e calligrafia, in un liceo di provincia in Germania, pubblicando i suoi risultati migliori su riviste scolastiche che quasi nessun matematico leggeva. Quando finalmente un articolo attirò l'attenzione giusta, gli fu offerta una cattedra universitaria senza dover passare dai gradini intermedi della carriera. Da professore a Berlino, Weierstrass diede al calcolo infinitesimale il rigore che gli era mancato per due secoli: trasformò la definizione verbale di Cauchy nella formulazione con $\varepsilon$ e $\delta$ che si studia ancora oggi, eliminando ogni riferimento a quantità infinitamente piccole "che si avvicinano" in modo vago.`, legame: R`La definizione ε-δ spiegata in questa pagina è, alla lettera, quella di Weierstrass: il punto d'arrivo di duemila anni di intuizioni sul limite.` }
  ]
});
})();
