(function () {
const R = String.raw;
/* allenamento: stessa casella e stessi tasti per tutti, così la casella non suggerisce se il
   risultato è un numero o un infinito. I numeri si controllano come numero (anche 2/3, 0,67),
   gli infiniti come testo con tutte le scritture ragionevoli. */
const SEGNA = 'un numero, +∞ o −∞';
const SIMBOLI = ['∞', '+', '−', '/', '√', '(', ')'];
const lim = v => ({ tipo: 'numero', valore: v, tolleranza: 0.005, segnaposto: SEGNA, simboli: SIMBOLI });
const PIU_INF = { tipo: 'testo', accettate: ['+inf', '+∞', '+infinito', 'più infinito', 'piu infinito', 'l=+∞', 'l=+inf', '+oo'],segnaposto: SEGNA, simboli: SIMBOLI };
const MENO_INF = { tipo: 'testo', accettate: ['-inf', '-∞', '-infinito', 'meno infinito', 'l=-∞', 'l=-inf', '-oo'], segnaposto: SEGNA, simboli: SIMBOLI };
COMPASSO.registra({
  id: 'limiti',
  titolo: 'Limiti',

  introduzione: R`Quanto vale $\dfrac{x^2 - 1}{x - 1}$ per $x = 1$? Sostituendo esce $\frac{0}{0}$, che non vuol dire niente. Allora prova con numeri vicini a $1$. Con $x = 0{,}9$ esce $1{,}9$, con $x = 0{,}99$ esce $1{,}99$, con $x = 0{,}999$ esce $1{,}999$.

Più $x$ si avvicina a $1$, più il risultato si avvicina a $2$. Si dice che **il limite** per $x$ che tende a $1$ vale $2$.

Il limite descrive che cosa fa una funzione **vicino** a un punto. Serve anche dove nel punto non puoi calcolarla, e quando $x$ diventa grandissima. Da qui partono le derivate e gli integrali.

Ti servono le funzioni elementari: potenze, esponenziali, logaritmi, seno e coseno.`,

  inBreve: [
    R`$\lim\limits_{x \to x_0} f(x) = L$ vuol dire: quando $x$ si avvicina a $x_0$, $f(x)$ si avvicina quanto vuoi a $L$. Il valore $f(x_0)$ non conta, e può anche non esistere.`,
    R`Il limite in $x_0$ esiste solo se il limite destro e il sinistro esistono e sono uguali.`,
    R`Per calcolare un limite comincia sempre sostituendo. Se non esce una forma indeterminata, hai già il risultato.`,
    R`Le forme indeterminate ($\frac00$, $\frac{\infty}{\infty}$, $\infty - \infty$, $0 \cdot \infty$, $1^\infty$, $0^0$, $\infty^0$) non hanno un risultato fisso. Riscrivi l'espressione: raccogli, scomponi o razionalizza.`,
    R`Con due polinomi, per $x \to \infty$ decidono i gradi. Stesso grado: il rapporto dei coefficienti più alti. Grado più alto sotto: $0$. Grado più alto sopra: $\infty$.`,
    R`Limiti notevoli per $x \to 0$: $\dfrac{\sin x}{x} \to 1$, $\dfrac{1 - \cos x}{x^2} \to \dfrac12$, $\dfrac{e^x - 1}{x} \to 1$, $\dfrac{\ln(1+x)}{x} \to 1$. Per $x \to \infty$, invece, $\left(1 + \frac1x\right)^x \to e$.`
  ],

  sezioni: [
    { id: 'intorni-accumulazione', titolo: 'Intorni e punti di accumulazione', testo: R`Per parlare di limiti devi dire con precisione che cosa vuol dire «vicino a $x_0$».

>* Un **intorno di $x_0$** è un intervallo aperto $\Iaa{x_0 - \delta}{x_0 + \delta}$, con $\delta > 0$. Contiene i punti che distano da $x_0$ meno di $\delta$.

Puoi scegliere $\delta$ piccolo quanto vuoi. Più è piccolo, più l'intorno si stringe su $x_0$.

Anche l'infinito ha i suoi intorni, con $M$ grande quanto vuoi:
- un intorno di $+\infty$ è un intervallo $\Iaa{M}{+\infty}$;
- un intorno di $-\infty$ è un intervallo $\Iaa{-\infty}{-M}$;
- un intorno di $\infty$ senza segno è fatto dei punti con $|x| > M$.

>* **Punto di accumulazione** di un insieme $A$: un $x_0$ tale che ogni suo intorno contiene punti di $A$ diversi da $x_0$.

Il limite per $x \to x_0$ ha senso solo se $x_0$ è di accumulazione per il dominio. Altrimenti non hai punti con cui avvicinarti.

>! $x_0$ può essere di accumulazione per $A$ anche se non sta in $A$. Per esempio $0$ lo è per $A = \left\{1, \frac12, \frac13, \frac14, \dots\right\}$.` },

    { id: 'idea-intuitiva', titolo: "L'idea intuitiva di limite", testo: R`Riprendi $f(x) = \dfrac{x^2 - 1}{x - 1}$, che in $x = 1$ non è definita. Trascina $x$ verso $1$, prima da sinistra e poi da destra, e guarda $f(x)$ sull'asse $y$. Poi prova a mettere $x$ proprio su $1$.

[[grafico:avvicinati]]

Da tutte e due le parti i valori si stringono attorno a $2$. Su $x = 1$ il punto sparisce e resta un buco. Il limite dice dove **va** la funzione mentre ti avvicini.

[[video:limiti/limite]]

>* $\lim\limits_{x \to x_0} f(x) = L$ vuol dire: se prendi $x$ abbastanza vicino a $x_0$, e diverso da $x_0$, $f(x)$ è vicino a $L$ quanto vuoi. Il valore $f(x_0)$ non conta: può non esistere, o essere diverso da $L$.

Nel laboratorio «Il microscopio» puoi ingrandire la zona attorno al punto.

>! Calcolare $f(x_0)$ dà il limite solo se la funzione è continua in $x_0$, come un polinomio. In generale il limite guarda i valori **intorno** a $x_0$.

?? Una funzione vale $f(x) = x + 1$ per ogni $x \ne 3$, e in $x = 3$ vale $f(3) = 10$. Quanto vale $\lim\limits_{x \to 3} f(x)$?
[x] $4$
[ ] $10$
[ ] non esiste, perché la funzione ha un salto in $3$
=> Il limite è $4$. Vicino a $3$ la funzione vale $x + 1$, che si avvicina a $4$ da tutte e due le parti. Il $10$ è il valore nel punto, e il limite non lo guarda. Non c'è nessun salto: c'è solo un punto spostato.` },

    { id: 'definizione-limite-finito', titolo: 'La definizione di limite finito (ε-δ)', testo: R`Per dimostrare un limite, «vicino quanto vuoi» va detto con i numeri. Pensa a una sfida fra due giocatori.

1. Il primo sceglie una **tolleranza** $\varepsilon$ (epsilon), piccola quanto vuole. Chiede che $f(x)$ disti da $L$ meno di $\varepsilon$.
2. Il secondo risponde con un $\delta$ (delta). Promette che basta prendere $x$ a distanza minore di $\delta$ da $x_0$.

Se il secondo sa rispondere a **ogni** $\varepsilon$, il limite vale $L$.

Prova con $f(x) = 2x + 1$, $x_0 = 1$ e $L = 3$. Nel grafico la fascia orizzontale è la tolleranza $\varepsilon$ attorno a $3$. La striscia verticale contiene le $x$ che distano da $1$ meno di $\delta$. Un $\delta$ funziona se il tratto di retta nella striscia resta tutto dentro la fascia.

[[grafico:epsilon-delta]]

La retta sale di $2$ per ogni passo di $1$. Quindi, se $x$ dista da $1$ meno di $\delta$, $f(x)$ dista da $3$ meno di $2\delta$. Funziona ogni $\delta$ fino a $\frac{\varepsilon}{2}$, e il limite vale $3$.

>* **Limite finito per $x \to x_0$:** $\lim\limits_{x \to x_0} f(x) = L$ se $\ \forall\, \varepsilon > 0\ \ \exists\, \delta > 0$ tale che $\ 0 < |x - x_0| < \delta \ \Rightarrow \ |f(x) - L| < \varepsilon$.

Il pezzo $0 < |x - x_0|$ esclude $x = x_0$, perché il valore nel punto non conta.

>! $\delta$ dipende da $\varepsilon$. Se stringi $\varepsilon$, devi stringere anche $\delta$.` },

    { id: 'limiti-infiniti', titolo: "Limiti infiniti e limiti all'infinito", testo: R`Non sempre ci si avvicina a un numero. Con $f(x) = \dfrac1x$ trascina $x$ verso $0$, da destra e da sinistra. Poi portala verso i bordi del grafico.

[[grafico:iperbole]]

Vicino a $0$, da destra, $f(x)$ diventa enorme e positiva: $\frac{1}{0{,}01} = 100$. Da sinistra diventa enorme e negativa. Lontano da $0$, invece, $f(x)$ si avvicina a $0$.

[[video:limiti/infinito]]

>* $\lim\limits_{x \to x_0} f(x) = +\infty$ vuol dire: $f(x)$ supera qualunque numero $M$, se prendi $x$ abbastanza vicino a $x_0$. In simboli: $\forall M > 0\ \exists\, \delta > 0 : 0 < |x - x_0| < \delta \Rightarrow f(x) > M$. Per $-\infty$ si chiede $f(x) < -M$.

>* $\lim\limits_{x \to \infty} f(x) = L$ vuol dire: $f(x)$ è vicino a $L$ quanto vuoi, se prendi $|x|$ abbastanza grande. In simboli: $\forall \varepsilon > 0\ \exists\, N > 0 : |x| > N \Rightarrow |f(x) - L| < \varepsilon$.

Per $\frac1x$ il limite è $+\infty$ da destra di $0$ e $-\infty$ da sinistra. Per $x \to \pm\infty$ è $0$. La curva si avvicina alle rette $x = 0$ e $y = 0$ senza toccarle: sono i suoi **asintoti**.

>! «$x \to \infty$» senza segno vuol dire che $|x|$ diventa grandissimo, con $x$ positivo **oppure** negativo. $x \to +\infty$ guarda solo i positivi.` },

    { id: 'limite-destro-sinistro', titolo: 'Limite destro e limite sinistro', testo: R`Con $\frac1x$ hai visto che a destra e a sinistra di $0$ succedono cose diverse. Allora conviene guardare un lato alla volta.

>* **Limite destro** $\lim\limits_{x \to x_0^+} f(x)$: ti avvicini a $x_0$ solo con $x > x_0$. **Limite sinistro** $\lim\limits_{x \to x_0^-} f(x)$: solo con $x < x_0$. Il limite in $x_0$ **esiste se e solo se** destro e sinistro esistono e **sono uguali**.

Per $\frac1x$ in $0$ il destro è $+\infty$ e il sinistro $-\infty$. Il segno lo decide il denominatore: a destra di $0$ è positivo, a sinistra negativo.

>! Non scrivere $\lim\limits_{x \to 0} \frac1x = \infty$. Destro e sinistro sono diversi, quindi il limite **non esiste**.

Succede anche con due valori finiti. $f(x) = \dfrac{|x|}{x}$ vale $1$ per $x > 0$ e $-1$ per $x < 0$, quindi il limite in $0$ non esiste.

?? Quanto vale $\lim\limits_{x \to -1} \dfrac{1}{(x+1)^2}$?
[x] $+\infty$
[ ] non esiste, perché destro e sinistro sono diversi
[ ] $0$
=> Il denominatore $(x+1)^2$ è un quadrato. Vicino a $-1$ è piccolissimo ma sempre **positivo**, da tutte e due le parti. Quindi destro e sinistro valgono $+\infty$, e il limite è $+\infty$. Con $\frac{1}{x+1}$, senza il quadrato, i due lati sarebbero diversi.` },

    { id: 'teoremi-limiti', titolo: 'I teoremi sui limiti', testo: R`Tre teoremi valgono per tutti i limiti, con $x_0$ finito o infinito.

>* **Unicità del limite:** se il limite esiste, è uno solo.

Infatti $f(x)$ non può stare vicinissima a due numeri diversi nello stesso momento.

>* **Permanenza del segno:** se $\lim\limits_{x \to x_0} f(x) = L$ con $L \ne 0$, vicino a $x_0$ la funzione ha lo **stesso segno** di $L$. Il punto $x_0$ può fare eccezione.

Se i valori si avvicinano a $3$, vicino a $x_0$ stanno fra $2$ e $4$: sono positivi.

>* **Teorema del confronto** (dei due carabinieri): se $g(x) \le f(x) \le h(x)$ vicino a $x_0$ e $\lim g = \lim h = L$, allora anche $\lim f = L$.

Due carabinieri scortano una persona, uno per lato. Se tutti e due arrivano nello stesso posto, ci arriva anche la persona in mezzo. Il teorema ti servirà per $\frac{\sin x}{x}$.

>* **Funzioni monotone:** una funzione monotona su un intervallo $\Iaa{a}{b}$ ha **sempre** limite, finito o infinito, per $x \to a^+$ e per $x \to b^-$. Vale anche con $a = -\infty$ o $b = +\infty$.

L'idea, con $f$ crescente e $x \to b^-$. Chiama $S$ l'estremo superiore dei valori di $f$. Per ogni $\varepsilon$ qualche valore $f(\bar x)$ supera $S - \varepsilon$. Da $\bar x$ in poi $f$ cresce, quindi resta fra $S - \varepsilon$ e $S$: il limite è $S$. Se i valori non hanno un tetto, il limite è $+\infty$.

Per esempio $2 - \frac1x$ cresce per $x > 0$. I suoi valori stanno sotto $2$, ma superano $1{,}9$, $1{,}99$, $1{,}999$. L'estremo superiore è $2$, e per $x \to +\infty$ il limite è $2$.

?? $f(x) = x^2$ si avvicina a $0$ per $x \to 0$. La permanenza del segno dice che vicino a $0$ la funzione ha il segno del limite?
=> No: il teorema chiede $L \ne 0$, e qui $L = 0$. Una funzione che tende a $0$ può essere sempre positiva, come $x^2$. Può essere sempre negativa, come $-x^2$. Oppure può cambiare segno, come $x$.` },

    { id: 'operazioni-forme-indeterminate', titolo: 'Operazioni sui limiti e forme indeterminate', testo: R`Se due funzioni hanno limiti finiti, i limiti si combinano nel modo più naturale.

>* Se $\lim f = L_1$ e $\lim g = L_2$ sono finiti, allora $\lim (f \pm g) = L_1 \pm L_2$, $\ \lim (f \cdot g) = L_1 \cdot L_2$ e, se $L_2 \ne 0$, $\ \lim \dfrac{f}{g} = \dfrac{L_1}{L_2}$.

Con l'infinito, molti casi si capiscono pensando a numeri enormi o minuscoli:

| operazione | risultato | perché |
|---|---|---|
| numero $+\ (+\infty)$ | $+\infty$ | aggiungere un numero fisso a una quantità enorme la lascia enorme |
| numero positivo $\cdot\ (+\infty)$ | $+\infty$ | $3 \cdot 1\,000\,000$ è ancora enorme |
| $\dfrac{\text{numero}}{\infty}$ | $0$ | $\frac{5}{1\,000\,000}$ è quasi zero |
| $\dfrac{\text{numero} \ne 0}{0}$ | $\infty$ | $\frac{5}{0{,}0001} = 50\,000$; il segno dipende da come tende a $0$ il denominatore |

Altre combinazioni non hanno un risultato fisso, perché dipende dalle funzioni. Si chiamano **forme indeterminate**.

>* Le sette **forme indeterminate** sono $\infty - \infty$, $\ 0 \cdot \infty$, $\ \dfrac{\infty}{\infty}$, $\ \dfrac00$, $\ 1^{\infty}$, $\ 0^0$, $\ \infty^0$. Se sostituendo ne esce una, devi riscrivere l'espressione.

[[video:limiti/forme-indeterminate]]

Guarda tre limiti che danno tutti $\frac00$:
- $\lim\limits_{x \to 0} \frac{2x}{x} = 2$;
- $\lim\limits_{x \to 0} \frac{x^2}{x} = 0$;
- $\lim\limits_{x \to 0^+} \frac{x}{x^2} = +\infty$.

Stessa forma, tre risultati diversi. Conta **come** numeratore e denominatore vanno a zero.

?? Quanto vale $\lim\limits_{x \to +\infty} \left(x^2 - x\right)$?
[x] $+\infty$
[ ] $0$, perché $\infty - \infty = 0$
[ ] non si può calcolare, è una forma indeterminata
=> Fa $+\infty$. La forma $\infty - \infty$ chiede solo un passaggio in più. Raccogli: $x^2 - x = x(x - 1)$, e i due fattori vanno a $+\infty$. Con $x = 1000$ vale $999\,000$, altro che zero.` },

    { id: 'calcolo-forme-indeterminate', titolo: 'Come si risolvono le forme indeterminate', testo: R`Davanti a una forma indeterminata riscrivi l'espressione. La nuova deve essere **uguale per $x \ne x_0$**, e senza indeterminazione. La forma che esce sostituendo ti dice quale tecnica usare.

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

Con due polinomi, per $x \to \infty$, basta guardare i **gradi**, cioè gli esponenti più alti sopra e sotto:

| gradi | limite |
|---|---|
| sopra uguale a sotto | il rapporto dei coefficienti dei termini più alti |
| sopra minore di sotto | $0$ |
| sopra maggiore di sotto | $+\infty$ o $-\infty$: il segno lo dà il rapporto dei termini più alti |

Un polinomio da solo, per $x \to \pm\infty$, va come il suo termine più alto. Per esempio $x^3 - 5x^2$ va come $x^3$.

?? Quanto vale $\lim\limits_{x \to +\infty} \dfrac{2x + 1}{x^2 - 3}$?
[x] $0$
[ ] $2$
[ ] $+\infty$
=> Sotto il grado è $2$, sopra è $1$. Vince il denominatore, quindi il limite è $0$. Il $2$ è il rapporto dei coefficienti più alti, $2$ e $1$, ma vale solo con gradi uguali. $+\infty$ sarebbe giusto se il grado più alto fosse sopra.

### Scomporre e semplificare

~ \lim_{x \to 1} \dfrac{x^2 - 1}{x - 1} :: sostituendo esce $\frac00$
~ = \lim \dfrac{\evid{(x - 1)}(x + 1)}{\evid{x - 1}} :: $1$ annulla sopra e sotto, quindi $(x - 1)$ è un fattore di tutti e due
~ = \lim_{x \to 1} (x + 1) :: semplifico: si può, perché nel limite $x \ne 1$
~ = \evidb{2} :: ora sostituire funziona

È la funzione del grafico all'inizio. Fuori da $x = 1$ coincide con la retta $y = x + 1$, e in $x = 1$ ha un buco all'altezza $2$.

?? Nel calcolo qui sopra si semplifica $(x-1)$, che in $x = 1$ vale zero. Perché è lecito?
=> Il limite guarda solo gli $x$ **diversi** da $1$, e per quegli $x$ il fattore $x - 1$ non è zero. Quindi $\frac{x^2-1}{x-1}$ e $x + 1$ sono uguali vicino a $1$, e hanno lo stesso limite.

### Razionalizzare

~ \lim_{x \to +\infty} \left(\sqrt{x^2 + x} - x\right) :: sostituendo esce $\infty - \infty$
~ = \lim \dfrac{\left(\sqrt{x^2 + x} - x\right)\evid{\left(\sqrt{x^2 + x} + x\right)}}{\evid{\sqrt{x^2 + x} + x}} :: moltiplico e divido per il coniugato
~ = \lim \dfrac{\evid{x^2 + x - x^2}}{\sqrt{x^2 + x} + x} :: sopra c'è una differenza di quadrati: la radice sparisce
~ = \lim \dfrac{x}{x\left(\sqrt{1 + \frac1x} + 1\right)} :: sotto raccolgo $x$ (dalla radice esce come $x$, perché $x > 0$)
~ = \evidb{\dfrac12} :: semplifico $x$; $\frac1x \to 0$ e resta $\frac{1}{1 + 1}$

>! Non sostituire $\infty$ come se fosse un numero: $\sqrt{\infty} - \infty$ non vuol dire niente. Prima trasforma l'espressione, poi passa al limite.` },

    { id: 'limiti-notevoli', titolo: 'I limiti notevoli', testo: R`$\dfrac{\sin x}{x}$ per $x \to 0$ dà $\frac00$, ma qui non c'è niente da scomporre. Limiti come questo si dimostrano una volta, e poi si usano come formule. Sono i **limiti notevoli**.

>* **Limiti notevoli:** per $x \to 0$ si ha $\dfrac{\sin x}{x} \to 1$, $\ \dfrac{1 - \cos x}{x^2} \to \dfrac12$, $\ \dfrac{e^x - 1}{x} \to 1$, $\ \dfrac{\ln(1 + x)}{x} \to 1$. Per $x \to \infty$ si ha $\left(1 + \dfrac1x\right)^x \to e$.

### Perché $\frac{\sin x}{x} \to 1$

[[video:limiti/seno-su-x]]

Sulla circonferenza goniometrica prendi un angolo $x$ in radianti, fra $0$ e $\frac{\pi}{2}$. Ci sono tre figure, una dentro l'altra:
- il triangolo $OAB$, di area $\frac12 \sin x$;
- lo spicchio di cerchio, di area $\frac12 x$;
- il triangolo $OAT$, di area $\frac12 \tan x$.

Trascina $B$ verso $A$ e guarda il rapporto.

[[grafico:seno-cerchio]]

Mentre l'angolo si chiude, $\sin x$ e l'arco $x$ diventano quasi uguali. Con i conti:

~ \tfrac12 \sin x \le \tfrac12 x \le \tfrac12 \tan x :: le tre aree, una dentro l'altra
~ \sin x \le x \le \dfrac{\sin x}{\cos x} :: moltiplico per $2$ e scrivo la tangente come seno fratto coseno
~ \evid{1} \le \dfrac{x}{\sin x} \le \evid{\dfrac{1}{\cos x}} :: divido tutto per $\sin x$, che è positivo
~ \cos x \le \dfrac{\sin x}{x} \le 1 :: passo ai reciproci: i versi delle disuguaglianze si girano
~ \dfrac{\sin x}{x} \to \evidb{1} :: $\cos x \to 1$: la funzione è stretta fra due carabinieri che vanno a $1$

Per $x < 0$ vale lo stesso, perché $\frac{\sin x}{x}$ è pari.

### Gli altri limiti notevoli

Il limite con il coseno si riporta a quello con il seno:

~ \dfrac{1 - \cos x}{x^2} :: sostituendo $x = 0$ esce $\frac00$
~ = \dfrac{(1 - \cos x)\evid{(1 + \cos x)}}{x^2\evid{(1 + \cos x)}} :: moltiplico e divido per $1 + \cos x$
~ = \dfrac{\evid{\sin^2 x}}{x^2 (1 + \cos x)} :: sopra, $1 - \cos^2 x = \sin^2 x$
~ = \left(\dfrac{\sin x}{x}\right)^2 \cdot \dfrac{1}{1 + \cos x} :: separo in due fattori
~ \to 1^2 \cdot \dfrac12 = \evidb{\dfrac12} :: il primo va a $1$, il secondo a $\frac{1}{1+1}$

Il limite $\left(1 + \frac1x\right)^x \to e$ **definisce** il numero $e$. La base va verso $1$ e l'esponente cresce. Le due spinte si bilanciano su un valore finito.

| $x$ | $\left(1 + \frac1x\right)^x$ |
|---|---|
| $1$ | $2$ |
| $2$ | $2{,}25$ |
| $10$ | $2{,}594$ |
| $100$ | $2{,}705$ |
| $1000$ | $2{,}717$ |
| $100\,000$ | $2{,}718$ |

Gli ultimi due, con $e^x$ e $\ln(1+x)$, si ricavano da questo con un cambio di variabile.

>! Un limite notevole vale se dentro e sotto c'è **la stessa cosa**, e se questa **tende a $0$**. Con $\sin(3x)$ devi far comparire $3x$ anche sotto.

~ \lim_{x \to 0} \dfrac{\sin(3x)}{x} :: dentro il seno c'è $3x$, sotto solo $x$
~ = \lim \dfrac{\sin(3x)}{x} \cdot \evid{\dfrac{3}{3}} :: moltiplico e divido per $3$
~ = \lim \evid{3} \cdot \dfrac{\sin(3x)}{\evid{3x}} :: ora sopra e sotto c'è lo stesso $3x$, che tende a $0$
~ = 3 \cdot 1 = \evidb{3} :: applico il limite notevole con $t = 3x$

Allo stesso modo, per ogni numero $k \ne 0$ ottieni $\lim\limits_{x \to 0} \dfrac{\sin(kx)}{x} = k$.

?? Quanto vale $\lim\limits_{x \to 0} \dfrac{\sin(5x)}{2x}$?
[x] $\dfrac52$
[ ] $1$
[ ] $\dfrac25$
=> Serve $5x$ sotto: $\dfrac{\sin(5x)}{2x} = \dfrac{5}{2} \cdot \dfrac{\sin(5x)}{5x} \to \dfrac52 \cdot 1$. Chi risponde $1$ usa il limite notevole senza controllare che sopra e sotto ci sia la stessa cosa. $\frac25$ ha il rapporto capovolto.` },

    { id: 'gerarchia-successioni', titolo: 'Gerarchia degli infiniti e limiti di successioni', testo: R`$x^2$, $2^x$ e $\log_2 x$ vanno tutte a $+\infty$ per $x \to +\infty$. Però ci vanno a velocità molto diverse. Il grafico le confronta su finestre sempre più larghe.

[[grafico:infiniti]]

All'inizio $x^2$ e $2^x$ si rincorrono: fra $2$ e $4$ la parabola sta perfino sopra. Poi l'esponenziale scappa verso l'alto. Il logaritmo cresce anche lui, ma resta schiacciato in basso.

>* **Gerarchia degli infiniti** per $x \to +\infty$, con $a > 1$, $b > 0$, $c > 1$: $$\log_a x \ \ll\ x^b \ \ll\ c^x.$$ Il simbolo $\ll$ vuol dire che il rapporto fra il più lento e il più veloce tende a $0$.

In un $\frac{\infty}{\infty}$ fra funzioni di tipo diverso vince la più veloce. Per esempio $\frac{\ln x}{x} \to 0$, perché sotto c'è una potenza. Invece $\frac{e^x}{x^3} \to +\infty$, perché sopra c'è l'esponenziale.

?? Quanto vale $\lim\limits_{x \to +\infty} \dfrac{x^{100}}{2^x}$?
[x] $0$
[ ] $+\infty$
[ ] $1$
=> Fa $0$. Con $x = 10$ vince $x^{100}$, ma da un certo punto $2^x$ la supera e la stacca. Il limite guarda solo quello che succede alla fine.

### Infinitesimi e il loro confronto

>* Una funzione è un **infinitesimo** per $x \to x_0$ se il suo limite è $0$. Per esempio $x^2$, $\sin x$ e $e^x - 1$ sono infinitesimi per $x \to 0$.

Due infinitesimi si confrontano con il rapporto, come gli infiniti. Se $\frac{f}{g} \to 0$, $f$ è **di ordine superiore** a $g$: va a zero più in fretta.

[[video:limiti/infinitesimi]]

Se il rapporto tende a un numero diverso da $0$, i due sono **dello stesso ordine**. Se tende a $1$ sono **equivalenti**, e si scrive $f \sim g$.

>* $f$ è un infinitesimo **di ordine $\alpha$** per $x \to 0$ se $\dfrac{f(x)}{x^\alpha}$ tende a un numero diverso da $0$. Per esempio $1 - \cos x$ ha ordine $2$, perché $\frac{1 - \cos x}{x^2} \to \frac12$.

Letti così, i limiti notevoli diventano quattro equivalenze per $x \to 0$:

$$\begin{gathered} \sin x \sim x \\ 1 - \cos x \sim \dfrac{x^2}{2} \\ e^x - 1 \sim x \\ \ln(1 + x) \sim x \end{gathered}$$

>* **Principio di sostituzione:** in un limite di prodotti e quozienti puoi sostituire un infinitesimo con uno equivalente. Il limite non cambia.

~ \lim_{x \to 0} \dfrac{(e^{2x} - 1)\sin x}{1 - \cos x} :: sostituendo esce $\frac00$
~ = \lim \dfrac{\evid{2x} \cdot \evid{x}}{\evid{\frac{x^2}{2}}} :: $e^{2x} - 1 \sim 2x$ (con $t = 2x$), $\sin x \sim x$, $1 - \cos x \sim \frac{x^2}{2}$
~ = \lim \dfrac{2x^2 \cdot 2}{x^2} :: dividere per $\frac{x^2}{2}$ è moltiplicare per $\frac{2}{x^2}$
~ = \evidb{4} :: semplifico $x^2$

>! Il principio vale per prodotti e quozienti, non dentro una somma. In $\dfrac{\sin x - x}{x^3}$, con $\sin x \sim x$ verrebbe $0$. Invece il limite vale $-\frac16$.

### Il limite di una successione

Una successione $a_n$ è una funzione definita sui numeri naturali, quindi il suo limite si cerca solo per $n \to +\infty$. La successione è:
- **convergente** se il limite è un numero;
- **divergente** se il limite è $+\infty$ o $-\infty$;
- **irregolare** se il limite non esiste, come per $a_n = (-1)^n$.

Anche la somma di infiniti termini è un limite: quello della somma dei primi $n$ termini. Così si risolve il paradosso di Achille e la tartaruga.

[[animazione:achille-tartaruga]]

>! Per una successione non ha senso il limite per $n \to 3$. Infatti $3$ non è punto di accumulazione di $\mathbb{N}$: l'unico è $+\infty$.` }
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
    { nome: 'Intorni', formula: R`\begin{gathered} \Iaa{x_0-\delta}{x_0+\delta} \\ \Iaa{M}{+\infty}, \qquad \Iaa{-\infty}{-M} \end{gathered}`, nota: R`Intorno di $x_0$, di $+\infty$ e di $-\infty$ rispettivamente, con $\delta>0$ e $M$ grande a piacere.` },
    { nome: 'Limite finito per x → x₀', formula: R`\begin{gathered} \forall \varepsilon>0\ \exists\,\delta>0: \\ 0<|x-x_0|<\delta \Rightarrow |f(x)-L|<\varepsilon \end{gathered}` },
    { nome: 'Limite infinito per x → x₀', formula: R`\begin{gathered} \forall M>0\ \exists\,\delta>0: \\ 0<|x-x_0|<\delta \Rightarrow f(x)>M \end{gathered}`, nota: R`Analoga per $-\infty$, con $f(x)<-M$.` },
    { nome: 'Limite per x → ∞', formula: R`\begin{gathered} \forall \varepsilon>0\ \exists\,N>0: \\ |x|>N \Rightarrow |f(x)-L|<\varepsilon \end{gathered}`, nota: R`Versione per limite finito; per limite infinito si combina con la definizione precedente.` },
    { nome: 'Somma dei limiti', formula: R`\lim (f\pm g) = \lim f \pm \lim g`, nota: R`Se i limiti sono finiti, o se la forma non è indeterminata.` },
    { nome: 'Prodotto dei limiti', formula: R`\lim (f\cdot g) = \lim f \cdot \lim g`, nota: R`Se i limiti sono finiti, o se la forma non è indeterminata.` },
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
    { id: 'fc-01', sezione: 'intorni-accumulazione', tipo: 'definizione', fronte: R`Intorno di $x_0$`, retro: R`Intervallo aperto $\Iaa{x_0-\delta}{x_0+\delta}$, con $\delta>0$ piccolo a piacere.` },
    { id: 'fc-02', sezione: 'intorni-accumulazione', tipo: 'definizione', fronte: R`Intorno di $+\infty$`, retro: R`Un intervallo $\Iaa{M}{+\infty}$, con $M$ grande a piacere.` },
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
    { id: 'fc-24', sezione: 'gerarchia-successioni', tipo: 'definizione', fronte: R`Successione irregolare (o oscillante)`, retro: R`Una successione il cui limite non esiste, né finito né infinito: per esempio $a_n=(-1)^n$.` },
    { id: 'fc-25', sezione: 'gerarchia-successioni', tipo: 'concetto', fronte: R`Principio di sostituzione degli infinitesimi`, retro: R`In un limite di prodotti e quozienti un infinitesimo si può sostituire con uno equivalente: per $x\to0$, $\sin x\sim x$, $1-\cos x\sim\frac{x^2}{2}$, $e^x-1\sim x$, $\ln(1+x)\sim x$. Non vale dentro le somme.` },
    { id: 'fc-26', sezione: 'teoremi-limiti', tipo: 'concetto', fronte: R`Limiti di una funzione monotona`, retro: R`Una funzione monotona su un intervallo ha sempre limite, finito o infinito, agli estremi. Se è crescente, verso destra tende all'estremo superiore dei suoi valori.` }
  ],

  esercizi: [
    { id: 'b-01', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to 2} (x^2 + 1)$. In tutti gli esercizi, se il limite è infinito scrivi $+\infty$ o $-\infty$ (va bene anche +inf).`, suggerimenti: [R`È un polinomio: prova a sostituire.`], risposta: lim(5), soluzione: [R`È un polinomio, quindi sostituisco $x = 2$.`, R`$2^2 + 1 = 5$.`] },
    { id: 'b-02', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to +\infty} \dfrac{5}{x^2}$.`, suggerimenti: [R`Un numero fisso diviso per un numero enorme.`], risposta: lim(0), soluzione: [R`Il denominatore $x^2$ va a $+\infty$, il numeratore resta $5$.`, R`Un numero diviso per un infinito va a $0$.`] },
    { id: 'b-03', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to +\infty} (x^3 + 2)$.`, suggerimenti: [R`$x^3$ diventa enorme. Aggiungere $2$ cambia qualcosa?`], risposta: PIU_INF, soluzione: [R`Per $x \to +\infty$, $x^3$ va a $+\infty$.`, R`Aggiungere $2$ a una quantità enorme la lascia enorme: il limite è $+\infty$.`] },
    { id: 'b-04', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to 0} \dfrac{3\sin x}{x}$.`, suggerimenti: [R`Porta fuori il $3$ e usa $\dfrac{\sin x}{x} \to 1$.`], risposta: lim(3), soluzione: [R`Porto fuori il $3$: $\dfrac{3\sin x}{x} = 3 \cdot \dfrac{\sin x}{x}$.`, R`$\dfrac{\sin x}{x} \to 1$, quindi il limite è $3 \cdot 1 = 3$.`] },
    { id: 'b-05', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to -\infty} x^3$.`, suggerimenti: [R`Il cubo di un numero negativo ha segno meno.`], risposta: MENO_INF, soluzione: [R`Per $x$ negativo, $x^3$ è negativo: $(-10)^3 = -1000$.`, R`Più $x$ va verso $-\infty$, più $x^3$ scende: il limite è $-\infty$.`] },
    { id: 'b-06', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to +\infty} \dfrac{4x^2 + 1}{2x^2 - 3}$.`, suggerimenti: [R`Sopra e sotto il grado è lo stesso.`, R`Conta solo il rapporto dei coefficienti di $x^2$.`], risposta: lim(2), soluzione: [R`Sopra e sotto c'è grado $2$: i gradi sono uguali.`, R`Il limite è il rapporto dei coefficienti di $x^2$: $\dfrac42 = 2$.`] },
    { id: 'b-07', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to +\infty} \dfrac{3x + 1}{x^2 + 5}$.`, suggerimenti: [R`Confronta i gradi sopra e sotto.`], risposta: lim(0), soluzione: [R`Sopra il grado è $1$, sotto è $2$.`, R`Il grado più alto è sotto, quindi il limite è $0$.`] },
    { id: 'b-08', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to +\infty} \dfrac{x^2 - 1}{x + 3}$.`, suggerimenti: [R`Confronta i gradi sopra e sotto.`, R`Il grado più alto è sopra. Che segno ha il rapporto $\dfrac{x^2}{x}$?`], risposta: PIU_INF, soluzione: [R`Sopra il grado è $2$, sotto è $1$: il grado più alto è sopra, quindi il limite è infinito.`, R`Il rapporto dei termini più alti è $\dfrac{x^2}{x} = x$, che va a $+\infty$.`, R`Il limite è $+\infty$.`] },
    { id: 'b-09', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to +\infty} (x - x^3)$.`, suggerimenti: [R`È una forma $\infty - \infty$: raccogli il termine di grado più alto.`, R`Il polinomio va come il suo termine più alto, $-x^3$.`], risposta: MENO_INF, soluzione: [R`Sostituendo esce $\infty - \infty$.`, R`Raccolgo $x^3$: $x - x^3 = x^3\left(\dfrac{1}{x^2} - 1\right)$.`, R`$x^3 \to +\infty$ e la parentesi va a $-1$: il limite è $-\infty$.`] },
    { id: 'b-10', livello: 'base', difficolta: 1, testo: R`Calcola $\lim\limits_{x \to -\infty} \dfrac{6x^3 - x}{2x^3 + 4}$.`, suggerimenti: [R`Sopra e sotto il grado è lo stesso. Il segno di $x$ qui non cambia niente.`], risposta: lim(3), soluzione: [R`Sopra e sotto c'è grado $3$: i gradi sono uguali.`, R`Il limite è il rapporto dei coefficienti di $x^3$: $\dfrac62 = 3$.`] },
    { id: 'b-11', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 3} \dfrac{x^2 - 9}{x - 3}$.`, suggerimenti: [R`Sostituendo esce $\frac00$: scomponi il numeratore.`, R`$x^2 - 9$ è una differenza di quadrati.`], risposta: lim(6), soluzione: [R`Sostituendo $x = 3$ esce $\frac00$.`, R`Scompongo: $x^2 - 9 = (x - 3)(x + 3)$, e semplifico $(x - 3)$.`, R`Resta $x + 3$, che per $x \to 3$ vale $6$.`] },
    { id: 'b-12', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 0} \dfrac{1 - \cos x}{x \sin x}$. Puoi scrivere una frazione, per esempio 5/7.`, suggerimenti: [R`Sostituisci ogni infinitesimo con uno equivalente: si può, perché ci sono solo prodotti e quozienti.`, R`Per $x \to 0$: $1 - \cos x \sim \dfrac{x^2}{2}$ e $\sin x \sim x$.`], risposta: lim(1 / 2), soluzione: [R`Sostituendo $x = 0$ esce $\frac00$.`, R`Per $x \to 0$, $1 - \cos x \sim \dfrac{x^2}{2}$ e $\sin x \sim x$. Ci sono solo prodotti e quozienti, quindi posso sostituire.`, R`Il limite diventa $\dfrac{x^2/2}{x \cdot x} = \dfrac12$.`] },
    { id: 'b-13', livello: 'base', difficolta: 2, testo: R`Una funzione $f$ è crescente su $\mathbb{R}$, e i suoi valori riempiono l'intervallo $\Iaa{-1}{4}$. Quanto vale $\lim\limits_{x \to +\infty} f(x)$?`, suggerimenti: [R`Una funzione monotona ha sempre limite agli estremi del suo intervallo.`, R`Se $f$ cresce, verso destra tende all'estremo superiore dei suoi valori.`], risposta: lim(4), soluzione: [R`$f$ è crescente, quindi per $x \to +\infty$ il limite esiste.`, R`Una funzione crescente, verso destra, tende all'estremo superiore dei suoi valori.`, R`I valori riempiono $\Iaa{-1}{4}$, il cui estremo superiore è $4$: il limite è $4$.`] },
    { id: 'b-14', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 0} \dfrac{e^{4x} - 1}{2x}$.`, suggerimenti: [R`Per il limite notevole $\dfrac{e^t - 1}{t} \to 1$ sotto ti serve $4x$, non $2x$.`, R`Scrivi $\dfrac{e^{4x} - 1}{2x} = 2 \cdot \dfrac{e^{4x} - 1}{4x}$.`], risposta: lim(2), soluzione: [R`Sotto faccio comparire $4x$: $\dfrac{e^{4x} - 1}{2x} = 2 \cdot \dfrac{e^{4x} - 1}{4x}$.`, R`Con $t = 4x$, che tende a $0$, si ha $\dfrac{e^t - 1}{t} \to 1$.`, R`Il limite è $2 \cdot 1 = 2$.`] },
    { id: 'b-15', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 3^-} \dfrac{1}{x - 3}$.`, suggerimenti: [R`$3^-$ vuol dire che $x$ è un po' più piccolo di $3$.`, R`Prova con $x = 2{,}9$: che segno ha $x - 3$?`], risposta: MENO_INF, soluzione: [R`Per $x \to 3^-$, $x$ è poco meno di $3$: per esempio $x = 2{,}9$.`, R`Allora $x - 3$ è negativo e piccolissimo: $2{,}9 - 3 = -0{,}1$.`, R`$1$ diviso un negativo piccolissimo dà un negativo enorme: il limite è $-\infty$.`] },
    { id: 'b-16', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 4} \dfrac{\sqrt{x} - 2}{x - 4}$. Puoi scrivere una frazione, per esempio 5/7.`, suggerimenti: [R`Sostituendo esce $\frac00$. Moltiplica sopra e sotto per il coniugato $\sqrt{x} + 2$.`, R`Sopra resta $(\sqrt{x})^2 - 4 = x - 4$.`], risposta: lim(1 / 4), soluzione: [R`Sostituendo $x = 4$ esce $\frac00$.`, R`Moltiplico sopra e sotto per $\sqrt{x} + 2$: sopra viene $x - 4$, sotto $(x - 4)(\sqrt{x} + 2)$.`, R`Semplifico $(x - 4)$: resta $\dfrac{1}{\sqrt{x} + 2}$, che per $x \to 4$ vale $\dfrac{1}{2 + 2} = \dfrac14$.`] },
    { id: 'b-17', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 2} \dfrac{x^2 - 5x + 6}{x - 2}$.`, suggerimenti: [R`$2$ annulla il numeratore, quindi $(x - 2)$ è un suo fattore.`, R`Cerca due numeri con somma $-5$ e prodotto $6$.`], risposta: lim(-1), soluzione: [R`Sostituendo $x = 2$ esce $\frac00$.`, R`Scompongo il trinomio: $x^2 - 5x + 6 = (x - 2)(x - 3)$.`, R`Semplifico $(x - 2)$: resta $x - 3$, che per $x \to 2$ vale $-1$.`] },
    { id: 'b-18', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to +\infty} \dfrac{e^x}{x^2 + 1}$.`, suggerimenti: [R`Sopra c'è un esponenziale, sotto un polinomio: chi è più veloce?`, R`Il polinomio va come $x^2$, e $e^x$ batte ogni potenza.`], risposta: PIU_INF, soluzione: [R`Sostituendo esce $\frac{\infty}{\infty}$.`, R`Sotto il polinomio va come $x^2$. Nella gerarchia degli infiniti l'esponenziale $e^x$ batte ogni potenza.`, R`Vince il numeratore, che è positivo: il limite è $+\infty$.`] },
    { id: 'b-19', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 2} \dfrac{x^2 - 4}{x^2 - 2x}$.`, suggerimenti: [R`Sostituendo esce $\frac00$: scomponi sopra e sotto.`, R`Sotto raccogli $x$.`], risposta: lim(2), soluzione: [R`Sostituendo $x = 2$ esce $\frac00$.`, R`Scompongo: sopra $(x - 2)(x + 2)$, sotto $x(x - 2)$. Semplifico $(x - 2)$.`, R`Resta $\dfrac{x + 2}{x}$, che per $x \to 2$ vale $\dfrac42 = 2$.`] },
    { id: 'b-20', livello: 'base', difficolta: 2, testo: R`Calcola $\lim\limits_{x \to 0} \dfrac{\sin(6x)}{\sin(2x)}$.`, suggerimenti: [R`Dividi sopra e sotto per $x$.`, R`$\dfrac{\sin(6x)}{x} \to 6$ e $\dfrac{\sin(2x)}{x} \to 2$.`], risposta: lim(3), soluzione: [R`Divido sopra e sotto per $x$: $\dfrac{\sin(6x)/x}{\sin(2x)/x}$.`, R`Sopra $\dfrac{\sin(6x)}{x} \to 6$, sotto $\dfrac{\sin(2x)}{x} \to 2$.`, R`Il limite è $\dfrac62 = 3$.`] },
    { id: 'es-01', difficolta: 2, testo: R`Calcola $\lim_{x\to1}\dfrac{x^3-1}{x^2-1}$.`, suggerimenti: [R`Sostituendo esce $\frac00$: $1$ annulla sopra e sotto, quindi $(x-1)$ è un fattore di tutti e due.`, R`Sopra c'è una differenza di cubi: $x^3-1=(x-1)(x^2+x+1)$.`], risposta: { tipo: 'numero', valore: 1.5, tolleranza: 0.001 }, soluzione: [R`Sostituendo $x=1$ esce $\frac00$.`, R`Scompongo: $x^3-1=(x-1)(x^2+x+1)$ e $x^2-1=(x-1)(x+1)$.`, R`Semplifico $(x-1)$: resta $\dfrac{x^2+x+1}{x+1}$, che per $x\to1$ vale $\dfrac32$.`] },
    { id: 'es-02', difficolta: 1, testo: R`Calcola $\lim_{x\to+\infty}\dfrac{3x^2-2}{5x^2+x}$.`, suggerimenti: [R`È una forma $\infty/\infty$: raccogli la potenza più alta di $x$ sopra e sotto.`, R`Dopo aver raccolto $x^2$, cosa succede ai termini con $\frac1x$ e $\frac1{x^2}$ quando $x\to+\infty$?`], risposta: { tipo: 'numero', valore: 0.6, tolleranza: 0.001 }, soluzione: [R`È una forma $\infty/\infty$: si raccoglie $x^2$ sia al numeratore sia al denominatore.`, R`$\dfrac{3x^2-2}{5x^2+x} = \dfrac{x^2\left(3-\frac2{x^2}\right)}{x^2\left(5+\frac1x\right)} = \dfrac{3-\frac2{x^2}}{5+\frac1x}$.`, R`Per $x\to+\infty$, $\frac2{x^2}\to0$ e $\frac1x\to0$: il limite è $\dfrac35=0{,}6$.`] },
    { id: 'es-03', difficolta: 2, testo: R`Calcola $\lim_{x\to2}\dfrac{x^2-4}{x-2}$.`, suggerimenti: [R`È una forma $0/0$: scomponi il numeratore come differenza di quadrati.`, R`$x^2-4=(x-2)(x+2)$: semplifica il fattore comune.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001 }, soluzione: [R`Sostituendo $x=2$ si ottiene $\frac00$: serve scomporre.`, R`$x^2-4=(x-2)(x+2)$, quindi $\dfrac{x^2-4}{x-2}=x+2$ per ogni $x\ne2$.`, R`Il limite di $x+2$ per $x\to2$ è $4$.`] },
    { id: 'es-04', difficolta: 2, testo: R`Calcola $\lim_{x\to0}\dfrac{\tan(2x)}{x}$.`, suggerimenti: [R`Scrivi la tangente come seno fratto coseno.`, R`$\dfrac{\tan(2x)}{x}=\dfrac{\sin(2x)}{x}\cdot\dfrac{1}{\cos(2x)}$: fai comparire $2x$ sotto il seno.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.001 }, soluzione: [R`$\dfrac{\tan(2x)}{x}=\dfrac{\sin(2x)}{x}\cdot\dfrac{1}{\cos(2x)}=2\cdot\dfrac{\sin(2x)}{2x}\cdot\dfrac{1}{\cos(2x)}$.`, R`Con $t=2x\to0$ si ha $\dfrac{\sin t}{t}\to1$, e $\cos(2x)\to\cos 0=1$.`, R`Il limite vale $2\cdot1\cdot1=2$.`] },
    { id: 'es-05', difficolta: 3, testo: R`Calcola $\lim_{x\to-\infty}\left(\sqrt{x^2+x}+x\right)$.`, suggerimenti: [R`È una forma $\infty-\infty$: la radice va a $+\infty$, $x$ a $-\infty$. Moltiplica e dividi per $\sqrt{x^2+x}-x$.`, R`Sopra resta $x$. Sotto, raccogliendo $x^2$ nella radice, esce $|x|$.`, R`Per $x<0$ vale $|x|=-x$: attento al segno.`], risposta: { tipo: 'numero', valore: -0.5, tolleranza: 0.001 }, soluzione: [R`Moltiplico e divido per $\sqrt{x^2+x}-x$: sopra $x^2+x-x^2=x$, quindi l'espressione è $\dfrac{x}{\sqrt{x^2+x}-x}$.`, R`$\sqrt{x^2+x}=|x|\sqrt{1+\frac1x}$, e per $x<0$ si ha $|x|=-x$. Sotto viene $-x\sqrt{1+\frac1x}-x=-x\left(\sqrt{1+\frac1x}+1\right)$.`, R`Semplifico $x$: resta $\dfrac{-1}{\sqrt{1+\frac1x}+1}\to\dfrac{-1}{1+1}=-\dfrac12$.`] },
    { id: 'es-06', difficolta: 1, testo: R`Calcola $\lim_{x\to1^+}\dfrac{1}{x-1}$.`, suggerimenti: [R`Quando $x\to1^+$, il denominatore $x-1$ è positivo e tende a $0$.`, R`Un numero positivo diviso per qualcosa di positivo che tende a $0$ tende a $+\infty$.`], risposta: PIU_INF, soluzione: [R`Per $x\to1^+$, $x>1$, quindi $x-1\to0^+$ (positivo e piccolissimo).`, R`$\dfrac1{x-1}$ è il rapporto tra $1$ e un numero positivo che tende a $0$: il quoziente tende a $+\infty$.`] },
    { id: 'es-07', difficolta: 1, testo: R`Calcola $\lim_{x\to0}\dfrac{e^{2x}-1}{x}$.`, suggerimenti: [R`Riconduciti al limite notevole $\frac{e^t-1}{t}\to1$ con $t=2x$.`, R`Scrivi $2\cdot\dfrac{e^{2x}-1}{2x}$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.001 }, soluzione: [R`Si riconduce al limite notevole $\frac{e^t-1}{t}\to1$ ponendo $t=2x$.`, R`$\dfrac{e^{2x}-1}{x} = 2\cdot\dfrac{e^{2x}-1}{2x} \to 2\cdot1=2$.`] },
    { id: 'es-08', difficolta: 2, testo: R`Calcola $\lim_{x\to+\infty}\dfrac{e^x+x^2}{e^x-x}$.`, suggerimenti: [R`Sopra e sotto comanda l'esponenziale: raccogli $e^x$.`, R`Che cosa fanno $\dfrac{x^2}{e^x}$ e $\dfrac{x}{e^x}$ per $x\to+\infty$?`], risposta: { tipo: 'numero', valore: 1, tolleranza: 0.001 }, soluzione: [R`Raccolgo $e^x$ sopra e sotto: $\dfrac{e^x\left(1+\frac{x^2}{e^x}\right)}{e^x\left(1-\frac{x}{e^x}\right)}=\dfrac{1+\frac{x^2}{e^x}}{1-\frac{x}{e^x}}$.`, R`Per la gerarchia degli infiniti $\dfrac{x^2}{e^x}\to0$ e $\dfrac{x}{e^x}\to0$.`, R`Il limite vale $\dfrac{1+0}{1-0}=1$.`] },
    { id: 'es-09', difficolta: 3, testo: R`Calcola $\lim_{x\to+\infty}\left(1+\dfrac2x\right)^x$ (nella casella scrivi il valore decimale, con almeno due cifre dopo la virgola).`, suggerimenti: [R`Confronta con il limite notevole $\left(1+\frac1t\right)^t\to e$: qui nella base c'è $\frac2x$ invece di $\frac1x$.`, R`Poni $t=\dfrac{x}{2}$ e riscrivi $\left(1+\frac1t\right)^{2t}=\left[\left(1+\frac1t\right)^t\right]^2$.`], risposta: { tipo: 'numero', valore: 7.389056099, tolleranza: 0.01 }, soluzione: [R`Si confronta con il limite notevole $\left(1+\frac1t\right)^t\to e$, ponendo $t=\dfrac{x}{2}$ (così $\frac2x=\frac1t$).`, R`$\left(1+\dfrac2x\right)^x = \left[\left(1+\dfrac1t\right)^t\right]^2$.`, R`Per $x\to+\infty$ anche $t\to+\infty$, quindi $\left(1+\frac1t\right)^t\to e$ e il limite vale $e^2\approx7{,}389$.`] },
    { id: 'es-10', difficolta: 2, testo: R`Stabilisci se esiste $\lim_{x\to1}\dfrac{|x-1|}{x^2-1}$; se non esiste, scrivilo esplicitamente.`, suggerimenti: [R`Scomponi il denominatore: $x^2-1=(x-1)(x+1)$.`, R`Calcola a parte il limite destro (dove $|x-1|=x-1$) e il sinistro (dove $|x-1|=-(x-1)$).`], risposta: { tipo: 'testo', accettate: ['non esiste', 'nessun limite', 'non esiste il limite', 'il limite non esiste', '∄'] }, soluzione: [R`$x^2-1=(x-1)(x+1)$.`, R`Per $x>1$, $|x-1|=x-1$: la funzione è $\dfrac{1}{x+1}$, e il limite destro vale $\dfrac12$.`, R`Per $x<1$, $|x-1|=-(x-1)$: la funzione è $-\dfrac{1}{x+1}$, e il limite sinistro vale $-\dfrac12$.`, R`I due limiti sono diversi, quindi il limite per $x\to1$ **non esiste**.`] },
    { id: 'es-11', difficolta: 3, testo: R`Calcola $\lim_{n\to+\infty}\dfrac{n^2+1}{2n^2-3}$ (limite di una successione).`, suggerimenti: [R`Vale la stessa gerarchia dei limiti di funzione: raccogli $n^2$ sopra e sotto.`, R`Dopo aver raccolto $n^2$, i termini $\frac1{n^2}$ e $\frac3{n^2}$ tendono a $0$.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.001 }, soluzione: [R`Come per i limiti di funzione, si raccoglie $n^2$ sopra e sotto: $\dfrac{n^2+1}{2n^2-3} = \dfrac{n^2\left(1+\frac1{n^2}\right)}{n^2\left(2-\frac3{n^2}\right)}$.`, R`Per $n\to+\infty$, $\frac1{n^2}\to0$ e $\frac3{n^2}\to0$: la successione converge a $\dfrac12$.`] },
    { id: 'es-12', difficolta: 3, testo: R`Per $a>0$ considera la funzione $f_a(x)=\dfrac{1-\cos(ax)}{x^2}$, con $x\ne0$.

- **a)** Calcola $\lim_{x\to0}f_a(x)$ in funzione di $a$.
- **b)** Il limite del punto a) vale $8$. Quanto vale $a$?
- **c)** Con il valore di $a$ trovato, mostra che $0\le f_a(x)\le\dfrac{2}{x^2}$ e calcola $\lim_{x\to+\infty}f_a(x)$.
- **d)** Stabilisci se esiste $\lim_{x\to+\infty}x^2f_a(x)$.`, suggerimenti: [R`a) Fai comparire $(ax)^2$ sotto: moltiplica e dividi per $a^2$.`, R`c) $1-\cos(ax)$ sta sempre fra $0$ e $2$: usa il teorema del confronto.`, R`d) $x^2f_a(x)=1-\cos(ax)$. Guarda che cosa vale dove il coseno vale $1$ e dove vale $-1$.`], risposta: { tipo: 'numero', valore: 4, tolleranza: 0.001, segnaposto: 'il valore di a' }, soluzione: [R`**a)** $f_a(x)=a^2\cdot\dfrac{1-\cos(ax)}{(ax)^2}$. Con $t=ax\to0$ si ha $\dfrac{1-\cos t}{t^2}\to\dfrac12$. Il limite vale $\dfrac{a^2}{2}$.`, R`**b)** $\dfrac{a^2}{2}=8$ dà $a^2=16$. Con $a>0$, $a=4$.`, R`**c)** $-1\le\cos(4x)\le1$, quindi $0\le1-\cos(4x)\le2$. Divido per $x^2>0$: $0\le f_4(x)\le\dfrac{2}{x^2}$.`, R`Per $x\to+\infty$, $\dfrac{2}{x^2}\to0$. Per il teorema del confronto anche $f_4(x)\to0$.`, R`**d)** $x^2f_4(x)=1-\cos(4x)$. In $x=k\dfrac{\pi}{2}$ vale $1-\cos(2k\pi)=0$. In $x=\dfrac{\pi}{4}+k\dfrac{\pi}{2}$ vale $1-\cos(\pi+2k\pi)=2$.`, R`Punti dei due tipi ci sono lontano quanto vuoi: la funzione oscilla fra $0$ e $2$. Il limite **non esiste**.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Che cos'è un intorno di $x_0$?`, opzioni: [R`Un intervallo aperto $\Iaa{x_0-\delta}{x_0+\delta}$, con $\delta>0$`, R`Un insieme finito di punti vicino a $x_0$`, R`Un intervallo chiuso che contiene $x_0$ come estremo`, R`L'insieme dei numeri maggiori di $x_0$`], corretta: 0, spiegazione: R`Per definizione l'intorno di $x_0$ è un intervallo aperto centrato in $x_0$: non è chiuso, non è composto da un numero finito di punti, e non è una semiretta.` },
    { id: 'q-02', domanda: R`Un intorno di $+\infty$ è...`, opzioni: [R`L'insieme dei numeri interi maggiori di $0$`, R`Un intervallo $\Iaa{M}{+\infty}$, con $M$ grande a piacere`, R`Un intervallo $\Iaa{-\infty}{-M}$`, R`Un intervallo $\Iaa{-M}{M}$, con $M$ grande a piacere`], corretta: 1, spiegazione: R`L'intorno di $+\infty$ è una semiretta $\Iaa{M}{+\infty}$, con $M$ grande quanto vuoi. $\Iaa{-\infty}{-M}$ è invece un intorno di $-\infty$. $\Iaa{-M}{M}$ è limitato: non contiene numeri grandi quanto si vuole. Gli interi positivi non formano un intervallo.` },
    { id: 'q-03', domanda: R`$x_0$ è punto di accumulazione di un insieme $A$ se...`, opzioni: [R`$x_0$ appartiene ad $A$`, R`Ogni intorno di $x_0$ contiene un punto di $A$ diverso da $x_0$`, R`Esiste un intorno di $x_0$ con infiniti punti di $A$`, R`Ogni intorno di $x_0$ contiene un punto di $A$`], corretta: 1, spiegazione: R`È la definizione. Senza «diverso da $x_0$» andrebbe bene ogni punto di $A$, anche isolato. Non basta un intorno con infiniti punti di $A$: la condizione vale per ogni intorno, anche piccolissimo. E $x_0$ non deve per forza appartenere ad $A$, come mostra l'esempio $A=\{1/n\}$ con punto di accumulazione $0 \notin A$.` },
    { id: 'q-04', domanda: R`Il limite $\lim_{x\to x_0} f(x)$...`, opzioni: [R`Coincide sempre con $f(x_0)$`, R`Esiste solo se $f$ è definita anche nel punto $x_0$`, R`Non si può calcolare se $f(x_0)$ non esiste`, R`Dipende solo da $f$ vicino a $x_0$, non in $x_0$`], corretta: 3, spiegazione: R`Il limite descrive cosa succede intorno a $x_0$: può esistere anche se $f(x_0)$ non è definito, e può differire da $f(x_0)$ quando questo esiste.` },
    { id: 'q-05', domanda: R`Nella definizione $\forall\varepsilon>0\ \exists\delta>0:0<|x-x_0|<\delta\Rightarrow|f(x)-L|<\varepsilon$, che cosa rappresenta $\varepsilon$?`, opzioni: [R`La tolleranza fra $f(x)$ e $L$`, R`La distanza massima fra $x$ e $x_0$`, R`La differenza fra $f(x_0)$ e $L$`, R`Il valore del limite $L$`], corretta: 0, spiegazione: R`$\varepsilon$ è la tolleranza sull'asse $y$: quanto $f(x)$ può distare da $L$. La distanza massima fra $x$ e $x_0$ è $\delta$, la risposta sull'asse $x$. Il valore $f(x_0)$ non entra nella definizione. $L$ è il limite, non la tolleranza.` },
    { id: 'q-06', domanda: R`Perché nella definizione di limite si richiede $0<|x-x_0|$ e non semplicemente $|x-x_0|<\delta$?`, opzioni: [R`Per includere anche $x=x_0$`, R`Per escludere $x=x_0$: il limite non dipende da $f(x_0)$`, R`Per garantire che $\delta$ sia positivo`, R`È un dettaglio stilistico, senza importanza`], corretta: 1, spiegazione: R`La disuguaglianza $0<|x-x_0|$ esclude proprio $x=x_0$: al limite non interessa cosa succede esattamente in $x_0$, solo nei punti vicini.` },
    { id: 'q-07', domanda: R`Il teorema di unicità del limite afferma che...`, opzioni: [R`Ogni funzione ha un limite in ogni punto`, R`Il limite è sempre uguale a $f(x_0)$`, R`Se il limite esiste, è unico`, R`Due funzioni diverse non possono avere lo stesso limite`], corretta: 2, spiegazione: R`Il teorema garantisce che non esistono due valori limite diversi per la stessa funzione nello stesso punto; non dice che il limite esista sempre, né lo lega al valore $f(x_0)$.` },
    { id: 'q-08', domanda: R`Il teorema della permanenza del segno richiede che...`, opzioni: [R`$f$ sia continua`, R`$L=0$`, R`$f$ sia definita in $x_0$`, R`$L\ne0$`], corretta: 3, spiegazione: R`Se $L=0$ non si può dedurre nulla sul segno di $f$ vicino a $x_0$: la permanenza del segno vale solo per limiti diversi da $0$.` },
    { id: 'q-09', domanda: R`Il teorema del confronto (dei due carabinieri) si usa quando...`, opzioni: [R`Una funzione è compresa tra altre due funzioni che hanno lo stesso limite`, R`Si conosce già il valore esatto del limite`, R`La funzione è un polinomio`, R`Una funzione è compresa tra altre due funzioni, anche se i loro limiti sono diversi`], corretta: 0, spiegazione: R`Se una funzione è stretta fra due funzioni con lo stesso limite $L$, anche lei tende a $L$. Se i due limiti sono diversi, la funzione può oscillare fra loro: il teorema non dice niente. Non serve conoscere già il limite, e il teorema non riguarda solo i polinomi.` },
    { id: 'q-10', domanda: R`Quale delle seguenti NON è una forma indeterminata?`, opzioni: [R`$\frac{\infty}{\infty}$`, R`$\frac{L}{0}$ con $L\ne0$`, R`$0\cdot\infty$`, R`$\infty-\infty$`], corretta: 1, spiegazione: R`$\frac{L}{0}$ con $L\ne0$ non è indeterminata: il quoziente diventa comunque enorme in valore assoluto. Il segno dipende dal segno di $L$ e da come il denominatore va a zero (da valori positivi o negativi); se da destra e da sinistra i segni sono diversi, il limite non esiste. Le altre tre sono forme indeterminate.` },
    { id: 'q-11', domanda: R`Per risolvere $\lim_{x\to+\infty}\frac{2x^3-x}{5x^3+1}$ (forma $\infty/\infty$) conviene...`, opzioni: [R`Sostituire direttamente $x=+\infty$`, R`Applicare un limite notevole`, R`Raccogliere la potenza più alta di $x$`, R`Razionalizzare`], corretta: 2, spiegazione: R`Si raccoglie $x^3$ a numeratore e a denominatore: è la tecnica standard per $\infty/\infty$ con i polinomi. Limiti notevoli e razionalizzazione servono per altri tipi di indeterminazione.` },
    { id: 'q-12', domanda: R`Quale tecnica si usa tipicamente per una forma $0/0$ ottenuta da una radice, come $\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}$?`, opzioni: [R`Il raccoglimento a fattor comune`, R`Un limite notevole goniometrico`, R`Il teorema della permanenza del segno`, R`La razionalizzazione con il coniugato`], corretta: 3, spiegazione: R`Con le radici la scomposizione in fattori non si applica direttamente: si moltiplica e divide per il coniugato $\sqrt{x+1}+1$, così al numeratore la radice sparisce, resta $x$ e si può semplificare.` },
    { id: 'q-13', domanda: R`Quanto vale $\lim_{x\to0}\dfrac{\sin x}{x}$?`, opzioni: [R`$1$`, R`$0$`, R`Non esiste`, R`$+\infty$`], corretta: 0, spiegazione: R`È il più famoso dei limiti notevoli, dimostrabile con un confronto di aree e il teorema del confronto.` },
    { id: 'q-14', domanda: R`Quanto vale $\lim_{x\to\infty}\left(1+\dfrac1x\right)^x$?`, opzioni: [R`$1$, perché la base tende a $1$`, R`Il numero $e \approx 2{,}718$`, R`$+\infty$, perché l'esponente cresce senza fine`, R`$0$`], corretta: 1, spiegazione: R`È la definizione del numero di Nepero $e$. La base tende a $1$ e l'esponente a $\infty$: è la forma indeterminata $1^\infty$. Le due spinte si bilanciano su un valore finito, $e \approx 2{,}718$.` },
    { id: 'q-15', domanda: R`Nella gerarchia degli infiniti, per $x\to+\infty$...`, opzioni: [R`I logaritmi crescono più velocemente delle potenze`, R`Le potenze crescono più velocemente degli esponenziali (con base $>1$)`, R`I logaritmi crescono più lentamente di qualsiasi potenza positiva di $x$`, R`Esponenziali e potenze crescono sempre alla stessa velocità`], corretta: 2, spiegazione: R`La gerarchia è: logaritmi $\ll$ potenze $\ll$ esponenziali. Le altre affermazioni invertono l'ordine corretto o negano che ci sia differenza.` },
    { id: 'q-16', domanda: R`Una successione $a_n$ si dice irregolare (oscillante) quando...`, opzioni: [R`Converge a un limite finito`, R`Diverge, a $+\infty$ o a $-\infty$`, R`È definita solo per $n$ pari`, R`Non ha limite, né finito né infinito`], corretta: 3, spiegazione: R`Esempio tipico: $a_n=(-1)^n$, che alterna $1$ e $-1$ senza avvicinarsi a nessun valore né crescere indefinitamente.` }
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
    { matematico: 'Archimede di Siracusa', anni: '287–212 a.C.', titolo: 'Il metodo di esaustione, un limite senza nome', testo: R`Duemila anni prima dell'invenzione formale del limite, Archimede calcolò l'area del cerchio e il volume della sfera con un procedimento che oggi chiameremmo "al limite". Per l'area del cerchio inscrisse (e circoscrisse) poligoni regolari con un numero di lati sempre maggiore: un poligono di $6$ lati approssima male, uno di $96$ lati approssima benissimo, e aumentando indefinitamente il numero dei lati l'approssimazione diventa buona quanto si vuole, "esaurendo" la differenza tra poligono e cerchio. Archimede non disponeva del concetto di limite né della notazione moderna, quindi ogni risultato andava dimostrato per assurdo, escludendo che l'area potesse essere sia maggiore sia minore del valore trovato. Era un metodo già rigorosissimo, applicato secoli prima che qualcuno lo chiamasse "passaggio al limite".`, legame: R`Il metodo di esaustione è la prima idea storica di "avvicinarsi indefinitamente a un valore": lo stesso principio dietro ogni definizione di limite.` },
    { matematico: 'John Wallis', anni: '1616–1703', titolo: 'Un otto coricato per dire infinito', testo: R`John Wallis fu uno dei matematici inglesi più importanti prima di Newton. Durante la guerra civile decifrava per il Parlamento le lettere in codice dei realisti. Nel 1649 diventò professore di geometria a Oxford. Nel 1655 pubblicò il *De sectionibus conicis*, un trattato sulle coniche. Lì compare per la prima volta il simbolo $\infty$ con il significato di infinito. Wallis pensava una figura come fatta di infinite strisce sottilissime. Lo spessore di ogni striscia lo scriveva $\frac{1}{\infty}$. Non spiegò mai perché avesse scelto quel segno. Si è ipotizzato che venga da un antico modo di scrivere mille in numeri romani. È solo un'ipotesi: nessuno lo sa con certezza. Il giovane Newton studiò un altro suo libro, l'*Arithmetica infinitorum*, e ne prese spunto.`, legame: R`Il simbolo che scrivi in $x \to +\infty$ nasce con Wallis, due secoli prima della definizione rigorosa di limite.` },
    { matematico: 'George Berkeley', anni: '1685–1753', titolo: 'I «fantasmi delle quantità defunte»', testo: R`Nel 1734 il vescovo e filosofo irlandese George Berkeley pubblicò un pamphlet dal titolo *The Analyst*, un attacco durissimo al calcolo infinitesimale di Newton e Leibniz. Il bersaglio erano gli "infinitesimi": quantità trattate come diverse da zero quando si dividevano (altrimenti la divisione non avrebbe senso), ma trattate come zero quando si eliminavano dal risultato finale. Berkeley chiese, con il sarcasmo del filosofo più che del matematico: cosa sono, questi infinitesimi, se non i «fantasmi delle quantità defunte»? Il calcolo funzionava, dava risultati corretti e utilissimi in fisica, ma nessuno sapeva spiegare *perché* funzionasse in modo logicamente coerente. Ci vollero quasi cento anni, con Cauchy e poi Weierstrass, prima che la critica di Berkeley trovasse una risposta rigorosa nel concetto moderno di limite.`, legame: R`La definizione ε-δ nasce proprio per sostituire gli infinitesimi "fantasma" con un confronto preciso, senza contraddizioni, tra numeri.` },
    { matematico: "Simon L'Huilier", anni: '1750–1840', titolo: 'Un premio di Berlino e la sigla «lim.»', testo: R`Simon L'Huilier era un matematico svizzero, di Ginevra. Da giovane fece il precettore in Polonia, presso una famiglia di principi. Nel 1784 l'Accademia delle scienze di Berlino bandì un premio. Chiedeva una teoria chiara e precisa dell'infinito in matematica. Il calcolo funzionava, ma i suoi infinitesimi restavano oscuri. L'Huilier rispose con un saggio costruito tutto sull'idea di limite. Era l'*Exposition élémentaire des principes des calculs supérieurs*. Il saggio vinse il premio e fu stampato a Berlino nel 1786. Lì compare per la prima volta l'abbreviazione «lim.», con il punto finale. La scrittura di oggi, con la freccia sotto, si diffuse solo all'inizio del Novecento.`, legame: R`La sigla $\lim$ che scrivi davanti a ogni limite viene dal saggio premiato di L'Huilier.` },
    { matematico: 'Augustin-Louis Cauchy', anni: '1789–1857', titolo: "Il Cours d'analyse e il primo limite scritto per bene", testo: R`Cauchy insegnava all'École Polytechnique di Parigi quando, nel 1821, pubblicò il *Cours d'analyse*, il libro che riorganizzò l'analisi matematica intorno all'idea di limite, invece che sugli infinitesimi vaghi dei secoli precedenti. Cauchy descrisse il limite come il valore a cui una variabile si avvicina indefinitamente, fino a differirne per meno di una quantità piccola quanto si vuole: un'idea ancora espressa a parole, non con le lettere $\varepsilon$ e $\delta$, ma già molto vicina alla definizione moderna. Era un docente esigente e prolifico: pubblicò quasi 800 lavori. Gli studenti lo amavano poco, per il rigore improvviso che pretendeva.`, legame: R`Il Cours d'analyse è il primo testo a fondare sistematicamente limiti, continuità e derivate sulla stessa idea rigorosa che si studia oggi.` }
  ]
});
})();
