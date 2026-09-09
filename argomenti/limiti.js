(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'limiti',
  titolo: 'Limiti',

  introduzione: R`Un limite descrive come si comporta una funzione $f(x)$ quando $x$ si avvicina a un certo valore (oppure diventa arbitrariamente grande), senza che $x$ debba mai coincidere con quel valore. È l'operazione che dà un significato preciso a frasi come «tende a», «si avvicina indefinitamente», «cresce senza limite»: espressioni che a parole sembrano chiare, ma per secoli non hanno avuto una definizione abbastanza rigorosa da diventare matematica vera e propria.

Il concetto di limite è alla base di tutta l'analisi che segue: la velocità istantanea di un'auto è il limite del rapporto tra spazio e tempo su intervalli di tempo sempre più piccoli; la pendenza della retta tangente a una curva è il limite della pendenza di rette che tagliano la curva in due punti sempre più vicini; l'area sotto un grafico curvo è il limite dell'area di rettangoli sempre più stretti. Anche fuori dalla fisica: un capitale che matura interessi composti calcolati su periodi sempre più brevi si avvicina a un valore preciso quando la frequenza di capitalizzazione tende a infinito — ed è proprio un limite, lo stesso che definisce il numero $e$, a dire quale.

Per seguire questo argomento serve conoscere le funzioni (dominio, grafico, funzioni elementari), le proprietà di potenze ed esponenziali, e le funzioni goniometriche seno e coseno, che compaiono nei limiti notevoli.`,

  sezioni: [
    { id: 'intorni-accumulazione', titolo: 'Intorni e punti di accumulazione', testo: R`Prima di definire il limite serve un linguaggio preciso per dire «vicino a un punto». Questo linguaggio si chiama **intorno**.

>* **Intorno di $x_0$:** un intervallo aperto $(x_0 - \delta,\ x_0 + \delta)$, con $\delta > 0$ piccolo a piacere; contiene tutti i punti che distano da $x_0$ meno di $\delta$. Si chiama anche intorno circolare, o intorno completo, di $x_0$.

Il numero $\delta$ non è fissato una volta per tutte: più lo si vuole piccolo, più l'intorno si stringe attorno a $x_0$, ma un intorno esiste per **ogni** scelta di $\delta > 0$, anche piccolissima. Ci si può «avvicinare» anche a $+\infty$ o a $-\infty$, quindi serve un intorno anche per l'infinito.

>* **Intorno di $+\infty$:** un intervallo $(M, +\infty)$, con $M$ grande a piacere. **Intorno di $-\infty$:** un intervallo $(-\infty, M)$. **Intorno di $\infty$** (senza segno): l'insieme dei punti con $|x| > M$.

Un'ultima nozione, che per ora basta conoscere di nome: $x_0$ (anche infinito) è un **punto di accumulazione** per un insieme $A$ se ogni intorno di $x_0$ contiene almeno un punto di $A$ diverso da $x_0$ stesso. Ha senso parlare del limite di $f(x)$ per $x \to x_0$ solo se $x_0$ è punto di accumulazione del dominio di $f$: altrimenti non ci sono punti del dominio arbitrariamente vicini a $x_0$ a cui far tendere $x$.

>! Un intorno è un intervallo **aperto**: non contiene i suoi estremi. E nella definizione di punto di accumulazione conta l'esistenza di punti di $A$ diversi da $x_0$, non che $x_0$ stesso appartenga ad $A$: per esempio $0$ è punto di accumulazione dell'insieme $A=\left\{\frac1n : n \in \mathbb{N}^+\right\}$, anche se $0 \notin A$.` },

    { id: 'idea-intuitiva', titolo: "L'idea intuitiva di limite", testo: R`Dire che $\displaystyle\lim_{x \to x_0} f(x) = L$ significa questo: quando $x$ si avvicina a $x_0$, senza mai coincidere con $x_0$, i valori $f(x)$ si avvicinano a $L$, tanto quanto si vuole, pur di prendere $x$ abbastanza vicino a $x_0$.

Il punto delicato è che il limite **non** dice niente sul valore $f(x_0)$: quel valore può non esistere, oppure può essere diverso da $L$. Il limite descrive solo il comportamento di $f$ nelle vicinanze di $x_0$, non in $x_0$.

Un'anticipazione di questa idea, molto prima che venisse formalizzata, è il paradosso di Achille e la tartaruga: una somma di infiniti termini, ciascuno più piccolo del precedente, può avere un totale finito. È lo stesso meccanismo per cui una successione di valori $f(x)$ può avvicinarsi indefinitamente a un numero preciso $L$, senza mai «arrivarci» in un singolo passo.

[[animazione:achille-tartaruga]]

>* **Limite (idea intuitiva):** $\displaystyle\lim_{x \to x_0} f(x) = L$ vuol dire che $f(x)$ diventa arbitrariamente vicino a $L$ quando $x$ diventa arbitrariamente vicino, ma non uguale, a $x_0$.

>! Un errore diffuso è calcolare $f(x_0)$ e chiamarlo «il limite». Funziona quando $f$ è continua in $x_0$ (lo si vedrà nel prossimo argomento), ma in generale il limite si occupa dei valori **intorno** a $x_0$, non del valore in $x_0$: la funzione può anche non essere definita lì.` },

    { id: 'definizione-limite-finito', titolo: 'La definizione di limite finito (ε-δ)', testo: R`La definizione rigorosa trasforma «vicino quanto si vuole» in un confronto tra due numeri: $\varepsilon$ (epsilon), la tolleranza richiesta sui valori $f(x)$, e $\delta$ (delta), quanto bisogna restringere l'intorno di $x_0$ per ottenerla.

>* **Definizione (limite finito per $x \to x_0$):** $$\lim_{x \to x_0} f(x) = L \iff \forall\, \varepsilon > 0\ \ \exists\, \delta > 0 \ \text{tale che} \ \ 0 < |x - x_0| < \delta \ \Rightarrow \ |f(x) - L| < \varepsilon.$$

Si legge come una sfida in due mosse. Prima qualcuno fissa una tolleranza $\varepsilon > 0$, piccola quanto vuole: «voglio che $f(x)$ disti da $L$ meno di $\varepsilon$». Poi tocca a chi calcola il limite trovare un $\delta > 0$ che garantisca questo per tutti gli $x$ abbastanza vicini a $x_0$. Se per **ogni** $\varepsilon$, per quanto piccolo, si riesce sempre a trovare un $\delta$ che funziona, allora il limite vale $L$.

La condizione $0 < |x - x_0|$ esclude $x = x_0$: come detto, il valore $f(x_0)$ (se esiste) non conta.

Nel grafico, fissato $\varepsilon$, la striscia orizzontale $(L-\varepsilon,\ L+\varepsilon)$ individua sull'asse $x$ una striscia $(x_0-\delta,\ x_0+\delta)$: muovendo il cursore $\varepsilon$ si vede come $\delta$ cambia di conseguenza. Qui, con $f(x)=2x+1$ e $x_0=1$ (quindi $L=3$), risulta $\delta = \varepsilon/2$.

[[grafico:epsilon-delta]]

>! $\delta$ **dipende** da $\varepsilon$: non è un numero fisso, valido per tutte le richieste. Di solito, più $\varepsilon$ si restringe, più $\delta$ deve restringersi a sua volta.` },

    { id: 'limiti-infiniti', titolo: "Limiti infiniti e limiti all'infinito", testo: R`La stessa idea di «avvicinarsi quanto si vuole» si applica anche quando è $x$ a tendere all'infinito, oppure quando è $f(x)$ a diventare grande a piacere. Cambia solo il tipo di intorno coinvolto.

>* **Limite infinito per $x \to x_0$:** $$\lim_{x \to x_0} f(x) = +\infty \iff \forall M>0\ \exists\, \delta>0 : 0<|x-x_0|<\delta \Rightarrow f(x) > M$$ (analogamente per $-\infty$, con $f(x) < -M$).

>* **Limite finito per $x \to \infty$:** $$\lim_{x \to \infty} f(x) = L \iff \forall \varepsilon>0\ \exists\, N>0 : |x| > N \Rightarrow |f(x)-L| < \varepsilon.$$

>* **Limite infinito per $x \to \infty$:** le due idee si combinano: per ogni $M>0$ esiste $N>0$ tale che $|x|>N \Rightarrow f(x) > M$ (o $f(x) < -M$).

L'esempio classico che mostra tutti e quattro i casi è $f(x)=\dfrac1x$: per $x \to 0^+$ (da destra) $f(x) \to +\infty$; per $x \to 0^-$, $f(x) \to -\infty$; per $x \to +\infty$ oppure $x \to -\infty$, $f(x) \to 0$. Le rette $x=0$ e $y=0$ sono gli **asintoti** della funzione: la curva vi si avvicina indefinitamente senza mai toccarle.

[[grafico:iperbole]]

>! «$x \to \infty$» senza segno significa $|x| \to +\infty$, cioè $x$ grande in valore assoluto, sia positivo sia negativo: non va confuso con $x \to +\infty$.` },

    { id: 'limite-destro-sinistro', titolo: 'Limite destro e limite sinistro', testo: R`A volte una funzione si comporta in modo diverso a seconda che ci si avvicini a $x_0$ da destra o da sinistra. Per descriverlo si restringe l'intorno di $x_0$ a un solo lato.

>* **Limite destro:** $\displaystyle\lim_{x \to x_0^+} f(x) = L$ se la condizione della definizione vale considerando solo $x_0 < x < x_0+\delta$. **Limite sinistro:** $\displaystyle\lim_{x \to x_0^-} f(x) = L$, considerando solo $x_0-\delta < x < x_0$.

>* **Esistenza del limite:** $\displaystyle\lim_{x \to x_0} f(x)$ esiste (finito o infinito) se e solo se esistono **entrambi** i limiti destro e sinistro **e sono uguali**. Il loro valore comune è il limite.

Per $f(x)=\dfrac1x$ (visto nella sezione precedente) si ha $\displaystyle\lim_{x\to0^+}\frac1x=+\infty$ e $\displaystyle\lim_{x\to0^-}\frac1x=-\infty$: essendo diversi, il limite per $x\to0$, senza segno, **non esiste**.

Un altro esempio tipico è $f(x)=\dfrac{|x|}{x}$, che vale $1$ per $x>0$ e $-1$ per $x<0$: il limite destro in $x_0=0$ vale $1$, quello sinistro vale $-1$. Sono diversi, quindi il limite per $x\to0$ non esiste, e stavolta non è nemmeno un caso di infinito: sono proprio due valori finiti diversi.

>! Scrivere $\displaystyle\lim_{x\to0}\frac1x=\infty$ è impreciso: da destra si va a $+\infty$, da sinistra a $-\infty$. Il limite bilatero, in questo caso, va dichiarato inesistente.` },

    { id: 'teoremi-limiti', titolo: 'I teoremi sui limiti', testo: R`Tre teoremi generali valgono per ogni limite (per $x\to x_0$, con $x_0$ anche infinito) e si usano continuamente, spesso senza nemmeno nominarli.

>* **Teorema di unicità del limite:** se $\displaystyle\lim_{x\to x_0} f(x)$ esiste, è **unico**. Non può accadere che $f(x)$ si avvicini contemporaneamente a due valori diversi.

L'idea è semplice: se $f(x)$ dovesse avvicinarsi sia a $L_1$ sia a $L_2 \ne L_1$, per $x$ abbastanza vicino a $x_0$ i valori $f(x)$ dovrebbero stare sia in un intorno piccolo di $L_1$ sia in un intorno piccolo di $L_2$; ma due intorni sufficientemente piccoli di punti distinti non si toccano, quindi è impossibile.

>* **Teorema della permanenza del segno:** se $\displaystyle\lim_{x\to x_0} f(x)=L$ e $L\ne0$, allora esiste un intorno di $x_0$ (privato al più di $x_0$) in cui $f(x)$ ha lo **stesso segno** di $L$.

In altre parole, se una funzione si avvicina a un valore positivo, abbastanza vicino a $x_0$ diventa lei stessa positiva: non può restare negativa fino all'ultimo istante e «saltare» al segno giusto solo nel limite.

>* **Teorema del confronto (dei due carabinieri):** se $g(x)\le f(x)\le h(x)$ in un intorno di $x_0$ (tranne al più $x_0$), e $\displaystyle\lim_{x\to x_0} g(x)=\lim_{x\to x_0} h(x)=L$, allora anche $\displaystyle\lim_{x\to x_0} f(x)=L$.

Il nome viene da un'immagine semplice: se due carabinieri scortano una persona camminando ai suoi due lati, e arrivano entrambi alla stessa destinazione $L$, anche la persona in mezzo ci arriva per forza. È il teorema più usato per calcolare limiti difficili da affrontare direttamente, come si vedrà a proposito di $\dfrac{\sin x}{x}$.

>! La permanenza del segno richiede $L\ne0$: se $L=0$ non si può dire nulla sul segno di $f(x)$ vicino a $x_0$, perché $f(x)$ può avvicinarsi a $0$ restando sempre positiva, sempre negativa, oppure cambiando segno infinite volte.` },

    { id: 'operazioni-forme-indeterminate', titolo: 'Operazioni sui limiti e forme indeterminate', testo: R`Se $\displaystyle\lim_{x\to x_0} f(x)=L_1$ e $\displaystyle\lim_{x\to x_0} g(x)=L_2$, con $L_1,L_2$ finiti, i limiti si combinano come ci si aspetta:

>* $$\lim (f\pm g)=L_1\pm L_2, \qquad \lim (f\cdot g)=L_1\cdot L_2, \qquad \lim \frac{f}{g}=\frac{L_1}{L_2}\ \ (\text{se } L_2\ne0).$$

Le stesse regole si estendono, con qualche cautela, ai casi in cui $L_1$ o $L_2$ sono infiniti: per esempio un numero finito più $+\infty$ fa $+\infty$; un numero positivo per $+\infty$ fa $+\infty$; un numero finito diviso $\infty$ fa $0$. Sono operazioni «ragionevoli», che si comportano come ci si aspetterebbe.

Non tutte le combinazioni, però, hanno un esito prevedibile. Quando il risultato dipende dalle funzioni coinvolte, e non solo dal tipo di limite, si parla di **forma indeterminata**.

>* Le sette forme indeterminate: $$\infty-\infty, \quad 0\cdot\infty, \quad \frac{\infty}{\infty}, \quad \frac00, \quad 1^{\infty}, \quad 0^0, \quad \infty^0.$$

Il motivo per cui sono «indeterminate» si vede bene con $\frac00$: $\displaystyle\lim_{x\to0}\frac{2x}{x}=2$, ma $\displaystyle\lim_{x\to0}\frac{x^2}{x}=0$, e $\displaystyle\lim_{x\to0^+}\frac{x}{x^2}=+\infty$: tre limiti con la stessa forma $\frac00$, tre risultati diversi. La scrittura $\frac00$ non basta a decidere: bisogna guardare **come** numeratore e denominatore tendono a zero, non solo che ci tendono.

>! $\infty-\infty$ non fa $0$: sono due quantità che crescono entrambe senza limite, ma la loro differenza dipende da **quanto più in fretta** cresce l'una rispetto all'altra. Lo stesso vale per $\dfrac{\infty}{\infty}$: non è automaticamente $1$.` },

    { id: 'calcolo-forme-indeterminate', titolo: 'Come si risolvono le forme indeterminate', testo: R`Non esiste una tecnica unica: si tratta di riscrivere l'espressione in una forma equivalente in cui l'indeterminazione sparisce. Tre strategie coprono la maggior parte dei casi del liceo.

**Raccoglimento a fattor comune**, tipico di $\frac{\infty}{\infty}$ e $\infty-\infty$ con i polinomi: si raccoglie la potenza più alta di $x$. Per $\displaystyle\lim_{x\to+\infty}\frac{2x^2-x}{3x^2+5}$, raccogliendo $x^2$ sia sopra sia sotto si ottiene $\dfrac{x^2\left(2-\frac1x\right)}{x^2\left(3+\frac{5}{x^2}\right)}=\dfrac{2-\frac1x}{3+\frac{5}{x^2}} \to \dfrac23$, perché $\frac1x$ e $\frac5{x^2}$ tendono a $0$.

**Scomposizione in fattori**, tipica di $\frac00$ con i polinomi: se numeratore e denominatore si annullano entrambi nello stesso punto $x_0$, hanno in comune il fattore $(x-x_0)$, che si può semplificare. Per $\displaystyle\lim_{x\to1}\frac{x^2-1}{x-1}$, scomponendo $x^2-1=(x-1)(x+1)$ si ha $\dfrac{(x-1)(x+1)}{x-1}=x+1$ per ogni $x\ne1$, quindi il limite è $1+1=2$: la funzione di partenza non è definita in $x=1$ (dove darebbe $0/0$), ma «vuole» valere $2$ proprio in quel punto.

[[grafico:buco]]

**Razionalizzazione**, tipica di $\frac00$ o $\infty-\infty$ con le radici: si moltiplica e divide per l'espressione coniugata, per far sparire la radice dal punto critico. Per $\displaystyle\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)$, moltiplicando e dividendo per $\sqrt{x^2+x}+x$: $$\left(\sqrt{x^2+x}-x\right)\cdot\frac{\sqrt{x^2+x}+x}{\sqrt{x^2+x}+x} = \frac{x^2+x-x^2}{\sqrt{x^2+x}+x} = \frac{x}{\sqrt{x^2+x}+x} \to \frac12.$$

>* In ogni tecnica l'obiettivo è lo stesso: trasformare l'espressione in un'altra, **uguale per $x\ne x_0$**, ma che non presenti più la forma indeterminata nel punto che interessa.

>! Semplificare $(x-1)$ non significa che $x=1$ sia stato escluso per sempre: significa solo che, per calcolare il limite, contano i valori $x\ne x_0$, ed è lì che le due espressioni coincidono davvero.` },

    { id: 'limiti-notevoli', titolo: 'I limiti notevoli', testo: R`Alcuni limiti che coinvolgono seno, coseno, esponenziali e logaritmi non si risolvono con le tecniche precedenti: vanno imparati come **limiti notevoli**, dimostrati una volta per tutte.

>* $$\lim_{x\to0}\frac{\sin x}{x}=1, \qquad \lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12, \qquad \lim_{x\to\infty}\left(1+\frac1x\right)^x=e,$$ $$\lim_{x\to0}\frac{e^x-1}{x}=1, \qquad \lim_{x\to0}\frac{\ln(1+x)}{x}=1.$$

Il primo si giustifica con un confronto di aree, per $0<x<\frac{\pi}{2}$: il triangolo $OAB$ inscritto nella circonferenza goniometrica ha area $\frac12\sin x$, il settore circolare di angolo $x$ ha area $\frac12 x$, il triangolo che li contiene entrambi (con il cateto tangente alla circonferenza) ha area $\frac12\tan x$. Da $\frac12\sin x \le \frac12 x \le \frac12\tan x$ segue $\cos x \le \dfrac{\sin x}{x} \le 1$; per $x\to0$, $\cos x \to 1$, quindi per il **teorema del confronto** anche $\dfrac{\sin x}{x} \to 1$.

[[grafico:sinx]]

Il secondo si ottiene dal primo moltiplicando numeratore e denominatore per $1+\cos x$: $$\frac{1-\cos x}{x^2} = \frac{(1-\cos x)(1+\cos x)}{x^2(1+\cos x)} = \frac{1-\cos^2x}{x^2(1+\cos x)} = \frac{\sin^2x}{x^2}\cdot\frac1{1+\cos x} \to 1\cdot\frac12=\frac12.$$

Il terzo definisce il numero $e \approx 2{,}718$: al crescere di $x$, la base $1+\frac1x$ si avvicina a $1$ mentre l'esponente cresce, e i due effetti si bilanciano in un valore finito, né $1$ né $+\infty$.

[[grafico:numero-e]]

Gli ultimi due si ricavano dal terzo con un cambio di variabile, e servono spesso insieme, per esponenziali e logaritmi con base diversa da $e$.

>! Questi limiti valgono così come sono scritti, con l'argomento (dentro $\sin$, $\cos$, $e^{(\cdot)}$, $\ln(1+\cdot)$) che tende **esattamente a 0**. Con $\sin(3x)$ al posto di $\sin x$ non si può applicare il limite notevole direttamente: bisogna moltiplicare e dividere per $3$, scrivendo $3\cdot\dfrac{\sin(3x)}{3x}$, e far tendere $3x\to0$.` },

    { id: 'gerarchia-successioni', titolo: 'Gerarchia degli infiniti e limiti di successioni', testo: R`Quando $x\to+\infty$, funzioni diverse «vanno all'infinito» a velocità molto diverse. Confrontarle porta a una gerarchia stabile, valida per ogni base ed esponente positivi.

>* **Gerarchia degli infiniti** (per $x\to+\infty$): $$\log_a x \ \ll\ x^b \ \ll\ c^x \qquad (a>1,\ b>0,\ c>1),$$ dove $\ll$ significa che il rapporto fra il più piccolo e il più grande tende a $0$: $\displaystyle\lim_{x\to+\infty}\frac{\log_a x}{x^b}=0$ e $\displaystyle\lim_{x\to+\infty}\frac{x^b}{c^x}=0$.

In parole: un logaritmo, per quanto piccola sia la sua base, cresce più lentamente di qualunque potenza; una potenza, per quanto grande sia l'esponente, cresce più lentamente di qualunque esponenziale con base maggiore di $1$. Su un intervallo piccolo le tre curve possono sembrare vicine, ma da un certo punto in poi l'esponenziale stacca nettamente la potenza, e la potenza stacca il logaritmo.

[[grafico:infiniti]]

Nelle forme indeterminate $\frac{\infty}{\infty}$ questa gerarchia permette di concludere subito, senza calcoli: per esempio $\displaystyle\lim_{x\to+\infty}\frac{\ln x}{x}=0$, perché il logaritmo è più debole della potenza $x=x^1$.

Una **successione** è una funzione definita sui numeri naturali, $a_n=a(n)$: il suo limite per $n\to+\infty$ si definisce come il limite di una funzione all'infinito, con la sola differenza che $n$ assume solo valori interi. Una successione si dice **convergente** se il limite esiste finito, **divergente** se è $+\infty$ o $-\infty$, **irregolare** (o oscillante) se il limite non esiste in nessuno dei due sensi: $a_n=(-1)^n$ non converge né diverge, perché continua ad alternare $1$ e $-1$ senza avvicinarsi a nulla.

>! In una successione non ha senso parlare di limite destro o sinistro, né di $x\to x_0$ con $x_0$ finito diverso da un valore intero: $n$ può solo crescere verso $+\infty$, non avvicinarsi a un numero fissato assumendo tutti i valori reali intorno a esso.` }
  ],

  grafici: {
    buco: {
      tipo: 'piano', x: [-4, 4], y: [-3, 6],
      funzioni: [{ f: '(x^2-1)/(x-1)', etichetta: 'y = (x² − 1)/(x − 1)', colore: 1 }],
      punti: [{ x: 1, y: 2, etichetta: '(1; 2)', posizione: 'alto', vuoto: true, colore: 2 }],
      didascalia: 'La funzione non è definita in x = 1, ma per ogni altro x coincide con y = x + 1: il "buco" è proprio nel punto in cui il rapporto vale 0/0.'
    },
    sinx: {
      tipo: 'piano', x: [-10, 10], y: [-0.5, 1.5],
      funzioni: [{ f: 'sin(x)/x', etichetta: 'y = sin(x)/x', colore: 1, dominio: [-10, 10] }],
      punti: [{ x: 0, y: 1, etichetta: '(0; 1)', posizione: 'alto', vuoto: true, colore: 2 }],
      elementi: [{ tipo: 'orizzontale', y: 1, tratteggio: true, etichetta: 'y = 1', colore: 3 }],
      didascalia: 'sin(x)/x non è definita in x = 0, ma si avvicina a 1 sia da destra sia da sinistra: il limite vale 1.'
    },
    'epsilon-delta': {
      tipo: 'piano', x: [-1, 3], y: [-2, 8],
      parametri: [{ nome: 'eps', min: 0.1, max: 1, passo: 0.05, valore: 0.4, etichetta: 'ε' }],
      funzioni: [{ f: '2x+1', etichetta: 'y = 2x + 1', colore: 1 }],
      punti: [{ x: 1, y: 3, etichetta: '(1; 3)', posizione: 'destra', colore: 1 }],
      elementi: [
        { tipo: 'orizzontale', y: '3 + eps', tratteggio: true, colore: 3 },
        { tipo: 'orizzontale', y: '3 - eps', tratteggio: true, colore: 3 },
        { tipo: 'verticale', x: '1 + eps/2', tratteggio: true, colore: 2 },
        { tipo: 'verticale', x: '1 - eps/2', tratteggio: true, colore: 2 }
      ],
      didascalia: 'Muovi ε: la striscia orizzontale (3 − ε, 3 + ε) individua sull\'asse x la striscia (1 − ε/2, 1 + ε/2). Qui δ = ε/2.'
    },
    iperbole: {
      tipo: 'piano', x: [-4, 4], y: [-6, 6],
      funzioni: [{ f: '1/x', etichetta: 'y = 1/x', colore: 1 }],
      elementi: [
        { tipo: 'verticale', x: 0, asintoto: true, etichetta: 'x = 0' },
        { tipo: 'orizzontale', y: 0, asintoto: true, etichetta: 'y = 0' }
      ],
      didascalia: 'Per x che tende a 0 da destra la funzione tende a +∞, da sinistra a −∞; per x che tende a ±∞ la funzione tende a 0.'
    },
    'numero-e': {
      tipo: 'piano', x: [0, 40], y: [1, 3.2],
      funzioni: [{ f: '(1+1/x)^x', etichetta: 'y = (1 + 1/x)^x', colore: 1, dominio: [0.5, 40] }],
      elementi: [{ tipo: 'orizzontale', y: 2.718, tratteggio: true, etichetta: 'y = e', colore: 3 }],
      didascalia: 'Al crescere di x, (1 + 1/x)^x si avvicina sempre di più a e ≈ 2,718, senza mai raggiungerlo.'
    },
    infiniti: {
      tipo: 'piano', x: [0, 8], y: [0, 70],
      funzioni: [
        { f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [0, 8] },
        { f: '2^x', etichetta: 'y = 2^x', colore: 2, dominio: [0, 8] },
        { f: 'log2(x)', etichetta: 'y = log₂x', colore: 3, dominio: [0.05, 8] }
      ],
      didascalia: 'Su un intervallo limitato le tre curve sembrano vicine, ma da un certo punto in poi l\'esponenziale stacca nettamente le potenze, e le potenze staccano il logaritmo: è la gerarchia degli infiniti.'
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
      R`$\left(\sqrt{x^2+1}-\sqrt{x^2-1}\right)\cdot\dfrac{\sqrt{x^2+1}+\sqrt{x^2-1}}{\sqrt{x^2+1}+\sqrt{x^2-1}} = \dfrac{(x^2+1)-(x^2-1)}{\sqrt{x^2+1}+\sqrt{x^2-1}} = \dfrac{2}{\sqrt{x^2+1}+\sqrt{x^2-1}}$.`,
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
    { id: 'es-09', difficolta: 3, testo: R`Calcola $\lim_{x\to+\infty}\left(1+\dfrac2x\right)^x$.`, suggerimenti: [R`Confronta con il limite notevole $\left(1+\frac1t\right)^t\to e$: qui l'esponente della base è $\frac2x$ invece di $\frac1x$.`, R`Poni $t=\dfrac{x}{2}$ e riscrivi $\left(1+\frac1t\right)^{2t}=\left[\left(1+\frac1t\right)^t\right]^2$.`], risposta: { tipo: 'numero', valore: 7.389056099, tolleranza: 0.01 }, soluzione: [R`Si confronta con il limite notevole $\left(1+\frac1t\right)^t\to e$, ponendo $t=\dfrac{x}{2}$ (così $\frac2x=\frac1t$).`, R`$\left(1+\dfrac2x\right)^x = \left[\left(1+\dfrac1t\right)^t\right]^2$.`, R`Per $x\to+\infty$ anche $t\to+\infty$, quindi $\left(1+\frac1t\right)^t\to e$ e il limite vale $e^2\approx7{,}389$.`] },
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
    { id: 'q-10', domanda: R`Quale delle seguenti NON è una forma indeterminata?`, opzioni: [R`$\frac{\infty}{\infty}$`, R`$\frac{L}{0}$ con $L\ne0$`, R`$0\cdot\infty$`, R`$\infty-\infty$`], corretta: 1, spiegazione: R`$\frac{L}{0}$ con $L\ne0$ non è indeterminata: il quoziente cresce comunque senza limite in valore assoluto, e il segno si legge da quello del denominatore. Le altre tre sono forme indeterminate classiche.` },
    { id: 'q-11', domanda: R`Per risolvere $\lim_{x\to+\infty}\frac{2x^3-x}{5x^3+1}$ (forma $\infty/\infty$) conviene...`, opzioni: [R`Sostituire direttamente $x=+\infty$`, R`Applicare un limite notevole`, R`Raccogliere la potenza più alta di $x$ a numeratore e denominatore`, R`Razionalizzare`], corretta: 2, spiegazione: R`Il raccoglimento della potenza dominante è la tecnica standard per $\infty/\infty$ con i polinomi; limiti notevoli e razionalizzazione servono per altri tipi di indeterminazione.` },
    { id: 'q-12', domanda: R`Quale tecnica si usa tipicamente per una forma $0/0$ ottenuta da una radice, come $\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}$?`, opzioni: [R`Il raccoglimento a fattor comune`, R`Un limite notevole goniometrico`, R`Il teorema della permanenza del segno`, R`La razionalizzazione (moltiplicare per il coniugato)`], corretta: 3, spiegazione: R`Con le radici la scomposizione in fattori non si applica direttamente: si moltiplica per il coniugato, per eliminare la radice dal punto critico.` },
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
    { matematico: 'Zenone di Elea', anni: 'circa 490–430 a.C.', titolo: 'Achille, la tartaruga e un vantaggio incolmabile', testo: R`Zenone, allievo di Parmenide, costruì una serie di paradossi per difendere l'idea del maestro che il movimento fosse un'illusione dei sensi. Il più famoso: Achille, velocissimo, gareggia con una tartaruga a cui concede un vantaggio di partenza. Quando Achille raggiunge il punto da cui la tartaruga è partita, questa si è già spostata un poco più avanti; quando Achille raggiunge quel nuovo punto, la tartaruga si è spostata ancora, e così all'infinito. Sembra che Achille non possa mai sorpassarla. Il paradosso restò un rompicapo filosofico per secoli non perché la matematica greca fosse ingenua, ma perché mancava uno strumento preciso per dire che una somma di infiniti addendi, ciascuno più piccolo del precedente, può avere un totale finito: quello strumento sono, appunto, i limiti.`, legame: R`La somma dei tempi impiegati da Achille in ogni tratto è una serie infinita con somma finita: è il concetto di limite a risolvere il paradosso.` },
    { matematico: 'Archimede di Siracusa', anni: '287–212 a.C.', titolo: 'Il metodo di esaustione, un limite senza nome', testo: R`Duemila anni prima dell'invenzione formale del limite, Archimede calcolò l'area del cerchio e il volume della sfera con un procedimento che oggi chiameremmo "al limite". Per l'area del cerchio inscrisse (e circoscrisse) poligoni regolari con un numero di lati sempre maggiore: un poligono di $6$ lati approssima male, uno di $96$ lati approssima benissimo, e aumentando indefinitamente il numero dei lati l'approssimazione diventa buona quanto si vuole, "esaurendo" la differenza tra poligono e cerchio. Archimede non disponeva del concetto di limite né della notazione moderna, quindi ogni risultato andava dimostrato per assurdo, escludendo che l'area potesse essere sia maggiore sia minore del valore trovato. Era un metodo già rigorosissimo, applicato secoli prima che qualcuno lo chiamasse "passaggio al limite".`, legame: R`Il metodo di esaustione è la prima idea storica di "avvicinarsi indefinitamente a un valore": lo stesso principio dietro ogni definizione di limite.` },
    { matematico: 'George Berkeley', anni: '1685–1753', titolo: 'I «fantasmi delle quantità defunte»', testo: R`Nel 1734 il vescovo e filosofo irlandese George Berkeley pubblicò un pamphlet dal titolo *The Analyst*, un attacco durissimo al calcolo infinitesimale di Newton e Leibniz. Il bersaglio erano gli "infinitesimi": quantità trattate come diverse da zero quando si dividevano (altrimenti la divisione non avrebbe senso), ma trattate come zero quando si eliminavano dal risultato finale. Berkeley chiese, con il sarcasmo del filosofo più che del matematico: cosa sono, questi infinitesimi, se non i «fantasmi delle quantità defunte»? Il calcolo funzionava, dava risultati corretti e utilissimi in fisica, ma nessuno sapeva spiegare *perché* funzionasse in modo logicamente coerente. Ci vollero quasi cento anni, con Cauchy e poi Weierstrass, prima che la critica di Berkeley trovasse una risposta rigorosa nel concetto moderno di limite.`, legame: R`La definizione ε-δ nasce proprio per sostituire gli infinitesimi "fantasma" con un confronto preciso, senza contraddizioni, tra numeri.` },
    { matematico: 'Augustin-Louis Cauchy', anni: '1789–1857', titolo: "Il Cours d'analyse e il primo limite scritto per bene", testo: R`Cauchy insegnava all'École Polytechnique di Parigi quando, nel 1821, pubblicò il *Cours d'analyse*, il libro che riorganizzò l'analisi matematica intorno all'idea di limite, invece che sugli infinitesimi vaghi dei secoli precedenti. Cauchy descrisse il limite come il valore a cui una variabile si avvicina indefinitamente, fino a differirne per meno di una quantità piccola quanto si vuole: un'idea ancora espressa a parole, non con le lettere $\varepsilon$ e $\delta$, ma già molto vicina alla definizione moderna. Era un docente esigente e prolifico (pubblicò più di 800 lavori), poco amato dagli studenti per il rigore improvviso che pretendeva in un'epoca abituata a ragionare in modo più intuitivo e disinvolto.`, legame: R`Il Cours d'analyse è il primo testo a fondare sistematicamente limiti, continuità e derivate sulla stessa idea rigorosa che si studia oggi.` },
    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Dal liceo di provincia alla definizione definitiva', testo: R`Weierstrass lasciò l'università di Bonn senza laurearsi, e passò quattordici anni a insegnare matematica, ma anche ginnastica e calligrafia, in un liceo di provincia in Germania, pubblicando i suoi risultati migliori su riviste scolastiche che quasi nessun matematico leggeva. Quando finalmente un articolo attirò l'attenzione giusta, gli fu offerta una cattedra universitaria senza dover passare dai gradini intermedi della carriera. Da professore a Berlino, Weierstrass diede al calcolo infinitesimale il rigore che gli era mancato per due secoli: trasformò la definizione verbale di Cauchy nella formulazione con $\varepsilon$ e $\delta$ che si studia ancora oggi, eliminando ogni riferimento a quantità infinitamente piccole "che si avvicinano" in modo vago.`, legame: R`La definizione ε-δ spiegata in questa pagina è, alla lettera, quella di Weierstrass: il punto d'arrivo di duemila anni di intuizioni sul limite.` }
  ]
});
})();
