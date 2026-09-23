(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'studio-di-funzione',
  titolo: 'Studio di funzione',

  introduzione: R`Studiare una funzione vuol dire ricostruirne il grafico senza calcolare cento punti: dove è definita, dove sale e dove scende, dove ha le sue cime e le sue valli, da che parte si piega, dove va a finire all'infinito. Queste informazioni stanno nella derivata prima e nella derivata seconda.

I teoremi di Rolle e di Lagrange spiegano perché il segno della derivata dice se la funzione sale o scende. Il teorema di de l'Hôpital scioglie molti dei limiti che nello studio si incontrano di continuo.

Serve anche fuori dal libro: il ricavo più alto, il materiale minimo per una scatola, il percorso più rapido sono problemi di **massimo e minimo**. Il metodo è sempre lo stesso: si scrive la grandezza come funzione di una variabile e si guarda dove la derivata cambia segno.

Servono i limiti (forme indeterminate e asintoti compresi) e le regole di derivazione.`,

  inBreve: [
    R`Rolle: se $f$ è continua in $[a; b]$, derivabile dentro e $f(a) = f(b)$, in qualche punto interno la tangente è orizzontale. Lagrange: in qualche punto interno la tangente è parallela alla corda fra gli estremi.`,
    R`Su un intervallo, $f' > 0$ vuol dire $f$ crescente e $f' < 0$ decrescente. C'è un massimo dove $f'$ passa da $+$ a $-$, un minimo dove passa da $-$ a $+$.`,
    R`$f'(x_0) = 0$ non basta per un massimo o un minimo, e $f''(x_0) = 0$ non basta per un flesso: serve sempre il cambio di segno.`,
    R`$f'' > 0$: concavità verso l'alto. $f'' < 0$: concavità verso il basso.`,
    R`De l'Hôpital vale solo per le forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$, e si derivano numeratore e denominatore separatamente.`,
    R`Lo studio si fa in ordine: dominio, segno, limiti e asintoti, derivata prima, derivata seconda, grafico.`
  ],

  sezioni: [
    { id: 'rolle', titolo: 'Il teorema di Rolle', testo: R`Parti dal livello del mare, cammini in montagna e alla fine torni al livello del mare. Da qualche parte sei stato in cima a una salita, o in fondo a una discesa, e lì per un attimo il sentiero era in piano. È il teorema di Rolle.

>* **Teorema di Rolle.** Se $f$ è continua nell'intervallo chiuso $[a; b]$, derivabile in ogni punto dell'intervallo aperto $(a; b)$ e $f(a) = f(b)$, allora esiste almeno un punto $c \in (a; b)$ con $f'(c) = 0$.

In parole: se il grafico parte e arriva alla stessa altezza, in qualche punto in mezzo la tangente è orizzontale.

Esempio: $f(x) = \sin x$ su $[0; \pi]$. È continua e derivabile ovunque, e $\sin 0 = \sin \pi = 0$. La derivata $\cos x$ si annulla in $c = \frac{\pi}{2}$, che sta dentro l'intervallo.

Le tre ipotesi servono tutte. Ecco che cosa succede togliendone una alla volta.

| ipotesi che manca | esempio | che cosa succede |
|---|---|---|
| continuità in $[a; b]$ | $f(x) = x$ per $0 \le x < 1$, $f(1) = 0$ | $f'(x) = 1$ sempre |
| derivabilità in $(a; b)$ | $\lvert x \rvert$ su $[-1; 1]$ | $f'$ vale $-1$ o $1$, mai $0$ |
| $f(a) = f(b)$ | $f(x) = x$ su $[0; 1]$ | $f'(x) = 1$ sempre |

?? $f(x) = x^2$ su $[-1; 2]$. Il teorema di Rolle garantisce un punto con tangente orizzontale?
[ ] sì, ed è $c = 0$
[x] no: $f(-1) = 1$ e $f(2) = 4$ sono diversi, quindi il teorema non si applica
[ ] no, perché $f$ non è derivabile in $0$
=> Manca un'ipotesi: i valori agli estremi sono diversi. La tangente orizzontale in $x = 0$ c'è lo stesso, ma non è il teorema a garantirla. Quando le ipotesi non valgono, il teorema non dice niente, né sì né no.

>! Il teorema dice che $c$ **esiste**, non dove sia né quanti siano. Per $\sin x$ su $[0; 2\pi]$ i punti con tangente orizzontale sono due.

> La continuità si chiede sull'intervallo **chiuso**, la derivabilità solo su quello **aperto**. Per questo $f(x) = \sqrt{1 - x^2}$ su $[-1; 1]$ rientra nel teorema, anche se agli estremi la tangente è verticale.` },

    { id: 'lagrange', titolo: 'Il teorema di Lagrange', testo: R`Se il grafico non torna alla quota di partenza, la tangente orizzontale può mancare. C'è però sempre un punto in cui la tangente ha la stessa pendenza della **corda**, il segmento che unisce il primo e l'ultimo punto del grafico.

>* **Teorema di Lagrange** (o del valor medio). Se $f$ è continua in $[a; b]$ e derivabile in $(a; b)$, esiste almeno un punto $c \in (a; b)$ tale che $$f'(c) = \frac{f(b) - f(a)}{b - a}.$$

A destra c'è la pendenza della corda da $A(a; f(a))$ a $B(b; f(b))$, a sinistra la pendenza della tangente in $c$. Il teorema dice: **esiste un punto in cui la tangente è parallela alla corda**.

Nel grafico trascina $A$ e $B$ lungo la curva. Le rette viola sono le tangenti nei punti $c$: guarda quanti sono, e prova a portare $A$ e $B$ alla stessa altezza.

[[grafico:lagrange]]

Quando $f(a) = f(b)$ la corda è orizzontale, la sua pendenza vale zero e si ritrova $f'(c) = 0$: Rolle è un caso particolare di Lagrange. Ed è anche il modo di dimostrarlo: si applica Rolle alla differenza fra $f$ e la retta della corda, $$h(x) = f(x) - f(a) - \frac{f(b) - f(a)}{b - a}(x - a),$$ che è continua, derivabile e vale zero sia in $a$ sia in $b$.

Esempio: $f(x) = x^2$ su $[0; 3]$.

~ \frac{f(3) - f(0)}{3 - 0} = \frac{9 - 0}{3} = \evid{3} :: la pendenza della corda
~ f'(c) = 2c :: la pendenza della tangente in un punto $c$
~ 2c = 3 :: il teorema promette un $c$ in cui sono uguali
~ c = \evidb{\frac{3}{2}} :: e infatti sta in $(0; 3)$

Con la velocità si ricorda bene: se in due ore percorri $180$ km, la media è $90$ km/h, e in almeno un istante il tachimetro ha segnato proprio $90$.

>! Anche qui la derivabilità deve valere in **tutti** i punti interni. Per $|x|$ su $[-1; 2]$ la corda ha pendenza $\frac{2 - 1}{3} = \frac{1}{3}$, ma la derivata vale solo $-1$ o $1$: nessun $c$ va bene, perché in $0$ la funzione non è derivabile.

> Scritta come $f(b) = f(a) + f'(c)\,(b - a)$, la tesi si chiama **formula degli incrementi finiti**: dice di quanto è cresciuta la funzione usando una sola derivata, calcolata in un punto opportuno.` },

    { id: 'conseguenze', titolo: 'Segno della derivata e monotonia', testo: R`Il teorema di Lagrange serve soprattutto per quello che se ne ricava: il legame fra il segno di $f'$ e l'andamento di $f$, che si usa in ogni studio di funzione.

>* **Derivata nulla.** Se $f'(x) = 0$ in ogni punto di un **intervallo** $I$, allora $f$ è costante in $I$. Quindi due funzioni con la stessa derivata su $I$ differiscono per una costante.

Il perché sta in una riga: presi due punti $x_1 < x_2$ di $I$, Lagrange dà $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) = 0$, quindi i due valori sono uguali. Su questa proprietà poggeranno gli integrali: tutte le primitive di una funzione differiscono per una costante.

>* **Criterio di monotonia.** Sia $f$ derivabile in un intervallo $I$. Se $f'(x) > 0$ in ogni punto interno di $I$, $f$ è strettamente **crescente** in $I$; se $f'(x) < 0$, è strettamente **decrescente**.

Il motivo è lo stesso: $f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$, e siccome $x_2 - x_1 > 0$, la differenza ha il segno di $f'(c)$.

Esempio: $f(x) = x^3 - 3x$.

~ f'(x) = 3x^2 - 3 :: derivo
~ f'(x) = \evid{3(x - 1)(x + 1)} :: scompongo, per studiarne il segno
~ f'(x) > 0 \iff \evidb{x < -1 \ \lor \ x > 1} :: una parabola verso l'alto è positiva fuori dagli zeri

Quindi $f$ cresce in $(-\infty; -1]$, decresce in $[-1; 1]$ e cresce di nuovo in $[1; +\infty)$.

>! «Intervallo» non è un dettaglio. $f(x) = \frac{1}{x}$ ha $f'(x) = -\frac{1}{x^2} < 0$ in tutto il dominio, eppure $f(-1) = -1$ è minore di $f(1) = 1$. È decrescente **su ciascuno dei due rami**, non sul dominio intero, che non è un intervallo.

?? $f$ è derivabile e strettamente crescente su $\mathbb{R}$. Che cosa si può dire di $f'$?
[x] $f'(x) \ge 0$ per ogni $x$
[ ] $f'(x) > 0$ per ogni $x$
[ ] niente
=> Il criterio si rovescia solo a metà: da «crescente» si ricava $f' \ge 0$, non $f' > 0$. $y = x^3$ è strettamente crescente, ma $f'(0) = 0$. Che $f'$ non sia mai negativa invece è sicuro: dove fosse negativa, la funzione scenderebbe.` },

    { id: 'hopital', titolo: 'Il teorema di de l\'Hôpital', testo: R`Nello studio di funzione si incontrano di continuo limiti nella forma $\frac{0}{0}$ o $\frac{\infty}{\infty}$. Il teorema di de l'Hôpital dice che spesso si sciolgono derivando **separatamente** il numeratore e il denominatore.

>* **Teorema di de l'Hôpital.** Siano $f$ e $g$ derivabili vicino a $x_0$ (escluso al più $x_0$), con $g'(x) \ne 0$. Se $f(x)$ e $g(x)$ tendono tutte e due a $0$, oppure tutte e due all'infinito, e se esiste $$\lim_{x \to x_0} \frac{f'(x)}{g'(x)} = L$$ (finito o infinito), allora anche $\lim_{x \to x_0} \frac{f(x)}{g(x)} = L$.

Vale anche per $x \to \pm\infty$ e per i limiti destro e sinistro, e si può applicare più volte di seguito se la forma indeterminata si ripresenta.

~ \lim_{x \to 0} \frac{1 - \cos x}{x^2} :: sostituendo $0$ viene $\frac{0}{0}$: il teorema si può usare
~ = \lim_{x \to 0} \frac{\evid{\sin x}}{\evid{2x}} :: derivo sopra, $(1 - \cos x)' = \sin x$, e sotto, $(x^2)' = 2x$
~ = \lim_{x \to 0} \frac{\evid{\cos x}}{\evid{2}} :: è ancora $\frac{0}{0}$: derivo di nuovo
~ = \evidb{\frac{1}{2}} :: ora basta sostituire: $\cos 0 = 1$

Con la forma $\frac{\infty}{\infty}$: $\lim_{x \to +\infty} \frac{\ln x}{x} = \lim_{x \to +\infty} \frac{1/x}{1} = 0$. Il logaritmo cresce più lentamente di $x$.

La forma $0 \cdot \infty$ va prima trasformata in un quoziente.

~ \lim_{x \to 0^+} x \ln x :: forma $0 \cdot (-\infty)$: così il teorema non si applica
~ = \lim_{x \to 0^+} \frac{\ln x}{\evid{1/x}} :: moltiplicare per $x$ è come dividere per $\frac{1}{x}$: ora è $\frac{-\infty}{+\infty}$
~ = \lim_{x \to 0^+} \frac{\evid{1/x}}{\evid{-1/x^2}} :: derivo sopra e sotto
~ = \lim_{x \to 0^+} (\evid{-x}) = \evidb{0} :: semplifico: $\frac{1}{x} \cdot (-x^2) = -x$

>! Si derivano numeratore e denominatore **separatamente**: $\frac{f'}{g'}$, mai $\left(\frac{f}{g}\right)'$ con la regola del quoziente.

?? Uno studente calcola $\lim_{x \to 0} \dfrac{x + 1}{x + 2}$ con de l'Hôpital e ottiene $1$. Dove sbaglia?
[x] la forma non è indeterminata: basta sostituire, e il limite vale $\frac{1}{2}$
[ ] ha derivato male: le derivate danno $\frac{1}{2}$
[ ] non sbaglia: il limite vale $1$
=> Sostituendo $x = 0$ viene $\frac{1}{2}$, un numero: non c'è nessuna indeterminazione da sciogliere, e il teorema non si può usare. Applicato lo stesso, dà $\frac{1}{1} = 1$, che è sbagliato. Le derivate le ha fatte bene: il suo errore è venuto prima, quando non ha controllato la forma.

>! Se $\frac{f'}{g'}$ **non** ha limite, su $\frac{f}{g}$ non si può concludere niente. Per $\lim_{x \to +\infty} \frac{x + \sin x}{x}$ il rapporto delle derivate è $1 + \cos x$, che oscilla, ma il limite di partenza vale $1$ (basta dividere per $x$).`  },
    { id: 'estremi', titolo: 'Massimi, minimi e teorema di Fermat', testo: R`Prima di cercare massimi e minimi conviene dire bene che cosa sono.

>* $x_0$ è un punto di **massimo relativo** se c'è un intorno di $x_0$ in cui $f(x) \le f(x_0)$; è di **massimo assoluto** se $f(x) \le f(x_0)$ per **ogni** $x$ del dominio. Per i minimi vale lo stesso con $\ge$. Il numero $f(x_0)$ è il massimo (o il minimo), $x_0$ è il **punto** di massimo.

Un massimo relativo è una cima più alta di quelle vicine; il massimo assoluto è la cima più alta di tutta la catena. Ogni massimo assoluto è anche relativo, non il contrario.

>* **Teorema di Fermat.** Se $x_0$ è un punto di massimo o di minimo relativo, **interno** al dominio, e $f$ è **derivabile** in $x_0$, allora $f'(x_0) = 0$.

I punti con $f'(x_0) = 0$ si chiamano **punti stazionari**: lì la tangente è orizzontale. L'idea della dimostrazione: appena prima di un massimo il rapporto incrementale è $\ge 0$ (la funzione sale verso la cima), appena dopo è $\le 0$. Se la derivata esiste, i due limiti sono uguali, e l'unico numero che è insieme $\ge 0$ e $\le 0$ è lo zero.

>! Fermat non si rovescia: $f'(x_0) = 0$ è una condizione **necessaria**, non sufficiente. $y = x^3$ ha $f'(0) = 0$, ma in $0$ non c'è né massimo né minimo: c'è un flesso a tangente orizzontale.

I candidati a estremo sono di tre tipi, e gli ultimi due sfuggono a Fermat:

1. i punti stazionari ($f'(x_0) = 0$);
2. i punti in cui $f$ non è derivabile ($|x|$ ha un minimo in $0$, dove la derivata non esiste);
3. gli estremi del dominio (in $[a; b]$ i punti $a$ e $b$ vanno controllati a parte).

?? $f(x) = x^2$ su $[1; 3]$. Dov'è il massimo assoluto?
[x] in $x = 3$, un estremo dell'intervallo
[ ] non c'è, perché $f'$ in $[1; 3]$ non si annulla mai
[ ] in $x = 0$, dove $f' = 0$
=> In $[1; 3]$ la derivata $2x$ è sempre positiva: la funzione cresce, e il valore più alto è all'ultimo punto, $f(3) = 9$. Fermat riguarda solo i punti interni, quindi un massimo all'estremo può avere $f' \ne 0$. E $x = 0$ non sta nemmeno nell'intervallo.

> **Teorema di Weierstrass:** una funzione continua su un intervallo chiuso e limitato $[a; b]$ ha sempre massimo e minimo assoluti. Nei problemi di questo tipo, quello che si cerca c'è.` },

    { id: 'ricerca-estremi', titolo: 'Trovare massimi e minimi', testo: R`Il metodo di base usa il **segno della derivata prima**: si studia dove $f'(x) > 0$, si fa la tabella dei segni e si legge dove la funzione sale e dove scende.

>* Se attraversando $x_0$ la derivata passa da **positiva a negativa**, $x_0$ è un punto di **massimo** relativo; se passa da **negativa a positiva**, di **minimo**; se non cambia segno, non è né l'uno né l'altro.

Esempio: $f(x) = x^3 - 3x$.

~ f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1) :: derivo e scompongo
~ f' > 0 \text{ se } x < -1 \text{ o } x > 1 :: parabola verso l'alto: positiva fuori dagli zeri, negativa fra $-1$ e $1$
~ x = -1: \ \evid{+ \to -} \ \Rightarrow \ f(-1) = \evidb{2} :: prima sale, poi scende: **massimo**, e $f(-1) = -1 + 3 = 2$
~ x = 1: \ \evid{- \to +} \ \Rightarrow \ f(1) = \evidb{-2} :: prima scende, poi sale: **minimo**, e $f(1) = 1 - 3 = -2$

Nel grafico trascina $P$ lungo la curva: la tangente lo segue e in alto leggi $f'(p)$. Fermati sulle due gobbe: la pendenza lì vale zero.

[[grafico:cubica]]

C'è una scorciatoia che evita la tabella dei segni.

>* **Test della derivata seconda.** Se $f'(x_0) = 0$ e $f''(x_0) < 0$, $x_0$ è un massimo relativo; se $f''(x_0) > 0$, è un minimo relativo. Se $f''(x_0) = 0$ il test **non decide**.

Sulla stessa funzione $f''(x) = 6x$, quindi $f''(-1) = -6 < 0$ (massimo) e $f''(1) = 6 > 0$ (minimo), come prima. Il motivo: in cima a una gobba la curva è piegata verso il basso, in fondo a una conca è piegata verso l'alto.

?? Di una funzione si sa che $f'(2) = 0$ e $f''(2) = 5$. Che cosa c'è in $x = 2$?
[x] un minimo relativo
[ ] un massimo relativo, perché $f''$ è positiva
[ ] un flesso
=> $f''(2) > 0$ vuol dire che lì la curva è piegata verso l'alto, come il fondo di una conca: con la tangente orizzontale è un minimo. L'errore tipico è associare «positivo» a «massimo», ma qui il segno parla della curvatura, non dell'altezza.

>! Se $f''(x_0) = 0$ non si conclude niente: $y = x^4$ ha un minimo in $0$, $y = x^3$ un flesso, e per tutte e due $f''(0) = 0$. Allora si torna al segno di $f'$. Lo stesso nei punti in cui $f$ non è derivabile: lì il test non si può nemmeno usare.` },

    { id: 'concavita-flessi', titolo: 'Concavità e flessi', testo: R`La derivata seconda è la derivata di $f'$: dice come **cambia la pendenza**, cioè da che parte si piega il grafico.

>* Se $f''(x) > 0$ in un intervallo, lì la funzione ha la **concavità verso l'alto** (il grafico sta sopra le sue tangenti, come una tazza); se $f''(x) < 0$, ha la **concavità verso il basso**. Un punto in cui la concavità cambia verso si chiama **punto di flesso**.

Se $f''$ esiste nel punto, $f''(x_0) = 0$ è una condizione **necessaria** per il flesso, ma non basta: bisogna controllare che $f''$ cambi davvero segno. Per $y = x^4$ si ha $f''(0) = 0$, eppure $f''(x) = 12x^2$ resta positiva: in $0$ c'è un minimo, non un flesso.

I flessi si distinguono dalla tangente nel punto.

| flesso | tangente | esempio nell'origine |
|---|---|---|
| a tangente orizzontale | $f'(x_0) = 0$ | $y = x^3$ |
| a tangente obliqua | $f'(x_0) \ne 0$ | $y = x^3 - 3x$ |
| a tangente verticale | $f$ non derivabile, $\lvert f'(x) \rvert \to +\infty$ | $y = \sqrt[3]{x}$ |

Se invece i due limiti della derivata sono infiniti ma di segno opposto, non è un flesso: è una **cuspide**.

~ f(x) = x^3 - 3x :: la funzione di sempre
~ f'(x) = 3x^2 - 3, \quad f''(x) = \evid{6x} :: derivo due volte
~ f'' < 0 \text{ se } x < 0, \quad f'' > 0 \text{ se } x > 0 :: prima concavità verso il basso, poi verso l'alto
~ \text{flesso in } \evidb{(0; 0)}, \quad f'(0) = -3 :: la concavità cambia; la tangente ha pendenza $-3$: flesso a tangente obliqua

### Leggere insieme $f$, $f'$ e $f''$

Nel grafico ci sono $f$, $f'$ e $f''$, tagliate da una linea verticale nello stesso punto. Trascina $P$ e confronta:

- dove $f'$ sta **sopra** l'asse $x$, $f$ sale; dove sta sotto, $f$ scende;
- gli **zeri** di $f'$ sono le ascisse dei punti stazionari di $f$;
- dove $f''$ è positiva, $f'$ cresce e $f$ ha la concavità verso l'alto; lo zero di $f''$ è il flesso di $f$.

[[grafico:derivate]]

>! Non si confonde il grafico di $f$ con quello di $f'$. A un massimo di $f$ corrisponde uno **zero** di $f'$, dove $f'$ passa da $+$ a $-$, non un massimo di $f'$.` },

    { id: 'ottimizzazione', titolo: 'Problemi di ottimizzazione', testo: R`Molti problemi chiedono la misura migliore: l'area più grande, il costo più basso, il percorso più corto. Lo schema è sempre lo stesso.

1. Si sceglie la variabile e le si dà un nome.
2. Si scrive la grandezza da ottimizzare come funzione di **quella sola variabile**, usando i dati del problema.
3. Si trova il **dominio del problema**, spesso più stretto di quello della formula.
4. Si studia il segno della derivata e si conclude, senza dimenticare gli estremi del dominio.

>* La parte difficile di solito non è derivare: è scrivere la grandezza con **una sola** variabile e capire quali valori può prendere.

Esempio: fra tutti i rettangoli di perimetro $20$ cm, qual è quello di area massima?

~ A(x) = x(10 - x) :: base $x$; il semiperimetro è $10$, quindi l'altezza è $10 - x$
~ 0 < x < 10 :: dominio del problema: base e altezza devono essere positive
~ A'(x) = 10 - 2x :: derivo $A(x) = 10x - x^2$
~ A'(x) > 0 \iff x < 5 :: l'area cresce finché la base arriva a $5$, poi cala
~ x = \evidb{5}, \quad A(5) = \evidb{25}\ \text{cm}^2 :: massimo: base $5$ e altezza $10 - 5 = 5$

Fra tutti i rettangoli con lo stesso perimetro, il più grande è il **quadrato**.

Nel grafico trascina $P$ lungo la curva dell'area: in alto leggi base, altezza e area del rettangolo.

[[grafico:ottimizzazione]]

>! Il dominio del problema non è quello della formula: $A(x) = 10x - x^2$ è definita su tutto $\mathbb{R}$, ma una base negativa, o più lunga del semiperimetro, non ha senso.

>! Se l'intervallo è **aperto** il massimo può non esserci. Se è **chiuso e limitato** il teorema di Weierstrass lo garantisce, ma va cercato anche agli estremi, dove la derivata non deve per forza annullarsi.

> Se la grandezza da ottimizzare contiene una radice quadrata (per esempio una distanza), conviene lavorare sul suo **quadrato**: la radice è crescente, quindi i punti di massimo e di minimo sono gli stessi, e i conti diventano più semplici.` },

    { id: 'schema-completo', titolo: 'Lo schema completo dello studio', testo: R`Mettendo in fila tutto si ottiene la procedura che porta al grafico.

>* 1) **Dominio**. 2) **Simmetrie** (pari, dispari), intersezioni con gli assi e **segno** di $f$. 3) **Limiti** agli estremi del dominio e **asintoti**. 4) **Derivata prima**: dove cresce, massimi e minimi. 5) **Derivata seconda**: concavità e flessi. 6) Il **grafico**, che raccoglie tutto.

Per la cubica $f(x) = x^3 - 3x$ i passi sono già stati fatti nelle sezioni precedenti: dominio $\mathbb{R}$, funzione dispari, zeri in $0$ e $\pm\sqrt{3}$, limite $-\infty$ a sinistra e $+\infty$ a destra senza asintoti, massimo $(-1; 2)$, minimo $(1; -2)$, flesso $(0; 0)$.

### Un esempio completo: $f(x) = \dfrac{x^2}{x - 1}$

**1. Dominio e simmetrie.**

~ x - 1 \ne 0 \ \Rightarrow \ D = \mathbb{R} \setminus \{1\} :: il denominatore non può annullarsi
~ f(-x) = \frac{x^2}{-x - 1} :: cambio $x$ con $-x$
~ f(-x) \ne f(x), \quad f(-x) \ne -f(x) :: né pari né dispari (del resto il dominio non è simmetrico)

**2. Intersezioni con gli assi e segno.**

~ f(x) = 0 \iff x^2 = 0 \iff x = 0 :: il grafico passa per l'origine, e solo lì tocca gli assi
~ x^2 \ge 0 :: il numeratore è un quadrato: il segno di $f$ è quello del denominatore $x - 1$
~ f < 0 \text{ se } x < 1,\ x \ne 0 :: sotto l'asse a sinistra di $1$ (tranne in $0$, dove vale $0$)
~ \evidb{f > 0 \text{ se } x > 1} :: sopra l'asse a destra di $1$

**3. Limiti e asintoti.**

~ \lim_{x \to 1^-} \frac{x^2}{x - 1} = \frac{1}{0^-} = \evid{-\infty} :: numeratore $1$, denominatore negativo vicino a zero
~ \lim_{x \to 1^+} \frac{x^2}{x - 1} = \frac{1}{0^+} = \evid{+\infty} :: quindi $x = 1$ è asintoto verticale
~ \lim_{x \to \pm\infty} \frac{x^2}{x - 1} = \pm\infty :: grado maggiore sopra: niente asintoto orizzontale
~ m = \lim_{x \to \infty} \frac{x^2}{x(x - 1)} = \evid{1} :: il grado sopra supera di uno quello sotto: si cerca l'obliquo
~ q = \lim_{x \to \infty} \left(\frac{x^2}{x - 1} \evid{- x}\right) :: ora tolgo $mx = x$
~ q = \lim_{x \to \infty} \frac{\evid{x}}{x - 1} = \evid{1} :: denominatore comune: $x^2 - x(x - 1) = x$
~ y = \evidb{x + 1} :: asintoto obliquo, a destra e a sinistra

**4. Derivata prima, massimi e minimi.**

~ f'(x) = \frac{2x(x - 1) - x^2}{(x - 1)^2} :: regola del quoziente
~ f'(x) = \frac{\evid{x(x - 2)}}{(x - 1)^2} :: sviluppo, $2x^2 - 2x - x^2 = x^2 - 2x$, e raccolgo $x$
~ f'(x) = 0 \iff x = 0 \ \lor \ x = 2 :: il denominatore è un quadrato, sempre positivo: il segno lo decide $x(x - 2)$
~ \text{massimo } (0; 0), \quad \text{minimo } \evidb{(2; 4)} :: $f'$ è positiva per $x < 0$ e per $x > 2$, negativa fra $0$ e $2$; $f(2) = \frac{4}{1} = 4$

?? Il massimo relativo vale $0$ e il minimo relativo vale $4$. Com'è possibile che il massimo stia più in basso del minimo?
=> «Relativo» vuol dire più alto (o più basso) dei punti **vicini**, non di tutti. Il massimo $(0; 0)$ sta sul ramo di sinistra, il minimo $(2; 4)$ su quello di destra, e in mezzo c'è l'asintoto $x = 1$: i due rami non si confrontano. Nessuno dei due è assoluto, perché la funzione va a $+\infty$ e a $-\infty$.

**5. Derivata seconda, concavità e flessi.**

~ f(x) = x + 1 + \frac{1}{x - 1} :: con la divisione fra polinomi la derivata seconda viene più in fretta
~ f'(x) = 1 - \frac{1}{(x - 1)^2} :: la derivata di $(x - 1)^{-1}$ è $-(x - 1)^{-2}$
~ f''(x) = \evid{\frac{2}{(x - 1)^3}} :: derivo ancora: $-(x - 1)^{-2}$ diventa $2(x - 1)^{-3}$
~ f'' < 0 \text{ se } x < 1, \quad f'' > 0 \text{ se } x > 1 :: verso il basso a sinistra, verso l'alto a destra; nessun flesso, perché in $1$ la funzione non c'è

**6. Il grafico.** Trascina $P$ su tutti e due i rami: dove $f'(p)$ vale zero trovi il massimo e il minimo. Guarda anche da che parte dell'asintoto obliquo sta la curva, a sinistra e a destra.

[[grafico:razionale]]

>! Qui non si scrive «decrescente in $(0; 1) \cup (1; 2)$»: l'unione non è un intervallo, e la funzione in $1$ salta da $-\infty$ a $+\infty$. Si dice: decrescente in $(0; 1)$ e in $(1; 2)$, separatamente.` }
  ],

  grafici: {
    lagrange: {
      tipo: 'piano', x: [-2.6, 2.6], y: [-4.5, 4.5],
      parametri: [
        { nome: 'a', min: -2.2, max: -0.1, passo: 0.1, valore: -0.5, nascosto: true },
        { nome: 'b', min: 0.1, max: 2.2, passo: 0.1, valore: 2.2, nascosto: true }
      ],
      funzioni: [
        { f: 'x^3 - 3x', colore: 1 },
        { f: 'sqrt((a^2+a*b+b^2)/3)^3 - 3*sqrt((a^2+a*b+b^2)/3) + (a^2+a*b+b^2-3)*(x - sqrt((a^2+a*b+b^2)/3)) + 0*sqrt(b - sqrt((a^2+a*b+b^2)/3) - 0.000000001)', colore: 4, tratteggio: true },
        { f: '-sqrt((a^2+a*b+b^2)/3)^3 + 3*sqrt((a^2+a*b+b^2)/3) + (a^2+a*b+b^2-3)*(x + sqrt((a^2+a*b+b^2)/3)) + 0*sqrt(-sqrt((a^2+a*b+b^2)/3) - a - 0.000000001)', colore: 4, tratteggio: true }
      ],
      elementi: [
        { tipo: 'segmento', da: ['a', 'a^3 - 3a'], a: ['b', 'b^3 - 3b'], colore: 2 },
        { tipo: 'punto', p: ['sqrt((a^2+a*b+b^2)/3) + 0*sqrt(b - sqrt((a^2+a*b+b^2)/3) - 0.000000001)', 'sqrt((a^2+a*b+b^2)/3)^3 - 3*sqrt((a^2+a*b+b^2)/3)'], etichetta: 'c', posizione: 'basso', colore: 4 },
        { tipo: 'punto', p: ['-sqrt((a^2+a*b+b^2)/3) + 0*sqrt(-sqrt((a^2+a*b+b^2)/3) - a - 0.000000001)', '-sqrt((a^2+a*b+b^2)/3)^3 + 3*sqrt((a^2+a*b+b^2)/3)'], etichetta: 'c', posizione: 'alto', colore: 4 },
        { tipo: 'punto', p: ['a', 'a^3 - 3a'], trascina: true, etichetta: 'A', posizione: 'sinistra', colore: 2 },
        { tipo: 'punto', p: ['b', 'b^3 - 3b'], trascina: true, etichetta: 'B', posizione: 'destra', colore: 2 },
        { tipo: 'testo', p: [-2.5, 4.1], testo: 'corda: m = {{a^2 + a*b + b^2 - 3}}', ancora: 'start' },
        { tipo: 'testo', p: [-2.5, 3.4], testo: 'a = {{a}}   b = {{b}}', ancora: 'start' }
      ],
      didascalia: 'Trascina A e B lungo la curva. Le rette viola sono le tangenti nei punti c: restano sempre parallele alla corda arancio. Porta A verso sinistra e compare un secondo punto c. Poi metti a = −2 e b = 1: A e B sono alla stessa altezza, la corda è orizzontale ed è il caso di Rolle.'
    },
    cubica: {
      tipo: 'piano', x: [-2.6, 2.6], y: [-4.5, 4.5],
      funzioni: [{ f: 'x^3 - 3x', etichetta: 'y = x³ − 3x', colore: 1 }],
      punti: [
        { x: -1, y: 2, etichetta: 'M(−1; 2)', posizione: 'alto', colore: 2 },
        { x: 1, y: -2, etichetta: 'm(1; −2)', posizione: 'basso', colore: 2 },
        { x: 0, y: 0, etichetta: 'F(0; 0)', posizione: 'destra', colore: 3 }
      ],
      elementi: [
        { tipo: 'tangente', f: 'x^3-3x', x0: 'p', colore: 4, etichetta: false },
        { tipo: 'punto', p: ['p', 'p^3-3p'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [-2.4, 4], testo: "f'(p) = {{3*p^2 - 3}}", ancora: 'start' }
      ],
      parametri: [{ nome: 'p', min: -2, max: 2, passo: 0.05, valore: 0.5, etichetta: 'p' }],
      didascalia: "Trascina P lungo la curva: f'(p) è la pendenza della tangente. Si azzera nel massimo e nel minimo."
    },
    derivate: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-6.5, 6.5], passo: [1, 2],
      parametri: [{ nome: 'p', min: -2.3, max: 2.3, passo: 0.05, valore: -1.6, nascosto: true }],
      funzioni: [
        { f: 'x^3 - 3x', etichetta: 'f', colore: 1 },
        { f: '3x^2 - 3', etichetta: "f'", colore: 2 },
        { f: '6x', etichetta: 'f″', colore: 3 }
      ],
      elementi: [
        { tipo: 'verticale', x: 'p', tratteggio: true, colore: 4 },
        { tipo: 'punto', p: ['p', '3p^2 - 3'], colore: 2 },
        { tipo: 'punto', p: ['p', '6p'], colore: 3 },
        { tipo: 'punto', p: ['p', 'p^3 - 3p'], trascina: true, etichetta: 'P', posizione: 'sinistra', colore: 1 },
        { tipo: 'testo', p: [0.2, -4.8], testo: "f'(x) = {{3p^2 - 3}}", ancora: 'start' },
        { tipo: 'testo', p: [0.2, -6], testo: "f″(x) = {{6p}}", ancora: 'start' }
      ],
      didascalia: "Trascina P lungo la curva blu (f). Fermati in x = −1 e in x = 1: f' vale zero e f ha la gobba. Fermati in x = 0: si annulla f″, e la curva blu cambia il verso in cui si piega."
    },
    razionale: {
      tipo: 'piano', x: [-5, 6], y: [-9, 12], passo: [1, 2],
      parametri: [{ nome: 'p', min: -4.9, max: 5.9, passo: 2 / 51, valore: -2, nascosto: true }],
      funzioni: [{ f: 'x^2/(x - 1)', etichetta: 'y = x²/(x − 1)', colore: 1 }],
      elementi: [
        { tipo: 'retta', m: 1, q: 1, etichetta: 'y = x + 1', tratteggio: true, colore: 3 },
        { tipo: 'verticale', x: 1, asintoto: true, colore: 3 },
        { tipo: 'tangente', f: 'x^2/(x - 1)', x0: 'p', colore: 2, etichetta: false },
        { tipo: 'punto', p: ['p', 'p^2/(p - 1)'], trascina: true, etichetta: 'P', posizione: 'basso-destra', colore: 2 },
        { tipo: 'testo', p: [-4.8, 11], testo: "x = {{p}}     f'(x) = {{p*(p - 2)/(p - 1)^2}}", ancora: 'start' }
      ],
      didascalia: "Trascina P su tutti e due i rami. Dove f' vale zero la tangente arancio è orizzontale: lì ci sono il massimo e il minimo. Guarda anche se la curva sta sopra o sotto l'asintoto obliquo, a sinistra e a destra."
    },
    ottimizzazione: {
      tipo: 'piano', x: [-1, 11], y: [-4, 30], passo: [1, 5],
      funzioni: [{ f: 'x*(10 - x)', etichetta: 'A(b) = b(10 − b)', colore: 1, dominio: [0, 10] }],
      elementi: [
        { tipo: 'segmento', da: ['b', 0], a: ['b', 'b*(10-b)'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['b', 'b*(10-b)'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [0.3, 28], testo: 'base = {{b}}    altezza = {{10 - b}}    area = {{b*(10-b)}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'b', min: 0.5, max: 9.5, passo: 0.1, valore: 2, nascosto: true }],
      didascalia: "Rettangoli di perimetro 20. Trascina P: la base cambia, l'altezza si adegua e l'area sale e scende. Per quale base l'area smette di crescere?"
    }
  },

  esempi: [
    { titolo: 'Verificare Rolle e trovare il punto c', problema: R`Verifica che $f(x) = x^2 - 4x + 3$ soddisfa le ipotesi del teorema di Rolle in $[1; 3]$ e determina il punto $c$.`, passi: [
      R`$f$ è un polinomio: è continua e derivabile su tutto $\mathbb{R}$, quindi in particolare continua in $[1; 3]$ e derivabile in $(1; 3)$.`,
      R`Terza ipotesi: $f(1) = 1 - 4 + 3 = 0$ e $f(3) = 9 - 12 + 3 = 0$. I valori agli estremi coincidono.`,
      R`Le ipotesi sono soddisfatte, quindi il punto esiste. Per trovarlo si impone $f'(c) = 0$ con $f'(x) = 2x - 4$.`,
      R`$2c - 4 = 0 \Rightarrow c = 2$, che appartiene a $(1; 3)$: è il vertice della parabola, dove la tangente è orizzontale.`
    ], risultato: R`$c = 2$` },

    { titolo: 'Il punto di Lagrange per una radice', problema: R`Determina il punto $c$ previsto dal teorema di Lagrange per $f(x) = \sqrt{x}$ in $[0; 4]$.`, passi: [
      R`$f$ è continua in $[0; 4]$ e derivabile in $(0; 4)$, con $f'(x) = \dfrac{1}{2\sqrt{x}}$. In $x = 0$ la derivata non esiste, ma non serve: la derivabilità si chiede solo nei punti interni.`,
      R`Pendenza della corda: $\dfrac{f(4) - f(0)}{4 - 0} = \dfrac{2 - 0}{4} = \dfrac{1}{2}$.`,
      R`Si impone $f'(c) = \dfrac{1}{2}$, cioè $\dfrac{1}{2\sqrt{c}} = \dfrac{1}{2}$, da cui $\sqrt{c} = 1$.`,
      R`$c = 1$, che sta in $(0; 4)$: nel punto $(1; 1)$ la tangente è parallela alla corda.`
    ], risultato: R`$c = 1$` },

    { titolo: 'de l\'Hôpital applicato tre volte', problema: R`Calcola $\lim_{x \to 0} \dfrac{x - \sin x}{x^3}$.`, passi: [
      R`Per $x \to 0$ numeratore e denominatore tendono entrambi a $0$: è la forma $\dfrac{0}{0}$, il teorema si può applicare.`,
      R`Si derivano separatamente: $\lim_{x \to 0} \dfrac{1 - \cos x}{3x^2}$. È ancora $\dfrac{0}{0}$.`,
      R`Si applica di nuovo: $\lim_{x \to 0} \dfrac{\sin x}{6x}$. Ancora $\dfrac{0}{0}$.`,
      R`Terza applicazione: $\lim_{x \to 0} \dfrac{\cos x}{6} = \dfrac{1}{6}$. Ora la forma non è più indeterminata, quindi il limite di partenza vale $\dfrac{1}{6}$.`
    ], risultato: R`$\dfrac{1}{6}$` },

    { titolo: 'Massimi e minimi con il segno di f\'', problema: R`Determina gli intervalli di monotonia e gli estremi relativi di $f(x) = \dfrac{x}{x^2 + 1}$.`, passi: [
      R`Dominio $\mathbb{R}$, perché $x^2 + 1$ non si annulla mai.`,
      R`Regola del quoziente: $f'(x) = \dfrac{(x^2 + 1) - x \cdot 2x}{(x^2 + 1)^2} = \dfrac{1 - x^2}{(x^2 + 1)^2}$.`,
      R`Il denominatore è sempre positivo, quindi il segno di $f'$ è quello di $1 - x^2$: positivo per $-1 < x < 1$, negativo altrove.`,
      R`La funzione decresce in $(-\infty; -1]$, cresce in $[-1; 1]$, decresce in $[1; +\infty)$: in $x = -1$ un minimo, in $x = 1$ un massimo.`,
      R`Valori: $f(-1) = -\dfrac{1}{2}$ e $f(1) = \dfrac{1}{2}$. Poiché $f(x) \to 0$ per $x \to \pm\infty$, questi estremi sono anche **assoluti**.`
    ], risultato: R`Minimo $\left(-1; -\dfrac{1}{2}\right)$, massimo $\left(1; \dfrac{1}{2}\right)$` },

    { titolo: 'Concavità e flessi', problema: R`Studia concavità e flessi di $f(x) = x^4 - 6x^2$.`, passi: [
      R`$f'(x) = 4x^3 - 12x = 4x(x^2 - 3)$, che si annulla in $x = 0$ e $x = \pm\sqrt{3}$: un massimo relativo in $(0; 0)$ e due minimi in $(\pm\sqrt{3}; -9)$.`,
      R`$f''(x) = 12x^2 - 12 = 12(x^2 - 1)$.`,
      R`$f'' > 0$ per $x < -1$ e per $x > 1$: concavità verso l'alto. Per $-1 < x < 1$ la concavità è verso il basso.`,
      R`In $x = \pm 1$ la derivata seconda si annulla **e cambia segno**: sono due flessi, di ordinata $f(\pm 1) = 1 - 6 = -5$.`,
      R`Le tangenti inflessionali non sono orizzontali: $f'(1) = -8$ e $f'(-1) = 8$, quindi i flessi sono a tangente obliqua.`
    ], risultato: R`Flessi in $(-1; -5)$ e $(1; -5)$, a tangente obliqua; concavità verso l'alto fuori da $[-1; 1]$` },

    { titolo: 'Un problema di ottimizzazione', problema: R`Con $40$ m di rete si vuole recintare un orto rettangolare addossato a un muro, che fa da quarto lato. Quali dimensioni danno l'area massima?`, passi: [
      R`Sia $x$ la misura di ciascuno dei due lati perpendicolari al muro. La rete copre quei due lati più il lato parallelo al muro, che misura quindi $40 - 2x$.`,
      R`Area: $A(x) = x(40 - 2x) = 40x - 2x^2$. Dominio del problema: $0 < x < 20$, perché entrambe le dimensioni devono essere positive.`,
      R`$A'(x) = 40 - 4x$, che si annulla per $x = 10$ ed è positiva prima, negativa dopo: in $x = 10$ c'è il massimo.`,
      R`Dimensioni: $10\ \text{m}$ e $40 - 20 = 20\ \text{m}$; area $A(10) = 200\ \text{m}^2$.`,
      R`Osservazione: l'orto migliore non è un quadrato, perché il lato parallelo al muro è il doppio degli altri due. Il vincolo «tre lati» cambia la risposta.`
    ], risultato: R`$10\ \text{m} \times 20\ \text{m}$, area massima $200\ \text{m}^2$` }
  ],
  formulario: [
    { nome: 'Teorema di Rolle', formula: R`f(a) = f(b) \ \Rightarrow \ \exists\, c \in (a; b) : f'(c) = 0`, nota: R`Serve $f$ continua in $[a; b]$ e derivabile in $(a; b)$.` },
    { nome: 'Teorema di Lagrange', formula: R`f'(c) = \frac{f(b) - f(a)}{b - a}`, nota: R`La tangente in $c$ è parallela alla corda per $A(a; f(a))$ e $B(b; f(b))$.` },
    { nome: 'Formula degli incrementi finiti', formula: R`f(b) = f(a) + f'(c)\,(b - a)`, nota: R`È il teorema di Lagrange riscritto: $c$ è un opportuno punto interno.` },
    { nome: 'Derivata nulla su un intervallo', formula: R`f'(x) = 0 \ \text{ in } I \quad \Rightarrow \quad f(x) = k`, nota: R`Solo se $I$ è un **intervallo**. Due funzioni con la stessa derivata differiscono per una costante.` },
    { nome: 'Criterio di monotonia', formula: R`f'(x) > 0 \Rightarrow f \text{ crescente} \qquad f'(x) < 0 \Rightarrow f \text{ decrescente}` },
    { nome: 'Teorema di Fermat', formula: R`x_0 \text{ estremo relativo interno} \ \Rightarrow \ f'(x_0) = 0`, nota: R`Vale se $f$ è derivabile in $x_0$. Non si inverte.` },
    { nome: 'Teorema di de l\'Hôpital', formula: R`\lim_{x \to x_0} \frac{f(x)}{g(x)} = \lim_{x \to x_0} \frac{f'(x)}{g'(x)}`, nota: R`Solo per le forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$, e solo se il secondo limite esiste.` },
    { nome: 'Test della derivata seconda', formula: R`f'(x_0) = 0,\ f''(x_0) < 0 \Rightarrow \text{massimo} \qquad f''(x_0) > 0 \Rightarrow \text{minimo}`, nota: R`Se $f''(x_0) = 0$ il test non decide.` },
    { nome: 'Concavità', formula: R`f''(x) > 0 \Rightarrow \text{concava verso l'alto} \qquad f''(x) < 0 \Rightarrow \text{verso il basso}` },
    { nome: 'Condizione necessaria per il flesso', formula: R`f''(x_0) = 0`, nota: R`Non basta: $f''$ deve anche **cambiare segno** attraversando $x_0$.` },
    { nome: 'Asintoto obliquo', formula: R`m = \lim_{x \to \infty} \frac{f(x)}{x}, \qquad q = \lim_{x \to \infty} \left[ f(x) - mx \right]`, nota: R`Esiste se $m$ è finito e diverso da zero e $q$ è finito. L'asintoto è $y = mx + q$.` },
    { nome: 'Retta tangente in un punto', formula: R`y - f(x_0) = f'(x_0)\,(x - x_0)` }
  ],

  flashcards: [
    { id: 'fc-01', sezione: 'rolle', tipo: 'definizione', fronte: R`Enunciato del teorema di Rolle`, retro: R`Se $f$ è continua in $[a; b]$, derivabile in $(a; b)$ e $f(a) = f(b)$, allora esiste $c \in (a; b)$ con $f'(c) = 0$.` },
    { id: 'fc-02', sezione: 'rolle', tipo: 'concetto', fronte: R`Significato geometrico di Rolle`, retro: R`Se il grafico parte e arriva alla stessa quota, in almeno un punto interno la tangente è orizzontale.` },
    { id: 'fc-03', sezione: 'rolle', tipo: 'concetto', fronte: R`Un controesempio a Rolle senza derivabilità`, retro: R`$f(x) = |x|$ in $[-1; 1]$: continua e con $f(-1) = f(1)$, ma la derivata vale $\pm 1$ e non si annulla mai.` },
    { id: 'fc-04', sezione: 'lagrange', tipo: 'formula', fronte: R`Tesi del teorema di Lagrange`, retro: R`Esiste $c \in (a; b)$ tale che $f'(c) = \dfrac{f(b) - f(a)}{b - a}$.` },
    { id: 'fc-05', sezione: 'lagrange', tipo: 'concetto', fronte: R`Significato geometrico di Lagrange`, retro: R`Esiste un punto interno in cui la tangente è parallela alla corda che unisce gli estremi del grafico.` },
    { id: 'fc-06', sezione: 'lagrange', tipo: 'concetto', fronte: R`Che rapporto c'è fra Rolle e Lagrange?`, retro: R`Rolle è il caso particolare $f(a) = f(b)$; Lagrange si dimostra applicando Rolle alla differenza fra $f$ e la retta della corda.` },
    { id: 'fc-07', sezione: 'conseguenze', tipo: 'concetto', fronte: R`Se $f'(x) = 0$ in tutto un intervallo?`, retro: R`$f$ è costante in quell'intervallo. Due funzioni con la stessa derivata differiscono per una costante.` },
    { id: 'fc-08', sezione: 'conseguenze', tipo: 'procedura', fronte: R`Criterio di monotonia`, retro: R`In un intervallo: $f' > 0$ implica $f$ strettamente crescente, $f' < 0$ implica $f$ strettamente decrescente.` },
    { id: 'fc-09', sezione: 'conseguenze', tipo: 'concetto', fronte: R`Perché il criterio di monotonia richiede un intervallo?`, retro: R`Perché su un dominio spezzato non vale: $f(x) = \dfrac{1}{x}$ ha $f' < 0$ ovunque ma non è decrescente su tutto il dominio, solo su ciascun ramo.` },
    { id: 'fc-10', sezione: 'conseguenze', tipo: 'concetto', fronte: R`Se $f$ è crescente e derivabile, quanto vale $f'$?`, retro: R`$f'(x) \ge 0$, non necessariamente $> 0$: $y = x^3$ è crescente ma $f'(0) = 0$.` },
    { id: 'fc-11', sezione: 'hopital', tipo: 'formula', fronte: R`Teorema di de l'Hôpital`, retro: R`Nelle forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$: $\lim \dfrac{f}{g} = \lim \dfrac{f'}{g'}$, purché il secondo limite esista.` },
    { id: 'fc-12', sezione: 'hopital', tipo: 'procedura', fronte: R`Che cosa si deriva applicando de l'Hôpital?`, retro: R`Numeratore e denominatore **separatamente**: $\dfrac{f'}{g'}$, mai la derivata del quoziente.` },
    { id: 'fc-13', sezione: 'hopital', tipo: 'procedura', fronte: R`Come si tratta la forma $0 \cdot \infty$?`, retro: R`Si riscrive come quoziente, per esempio $x \ln x = \dfrac{\ln x}{1/x}$, e si torna a $\frac{\infty}{\infty}$.` },
    { id: 'fc-14', sezione: 'estremi', tipo: 'definizione', fronte: R`Massimo relativo e massimo assoluto`, retro: R`Relativo: $f(x) \le f(x_0)$ in un intorno di $x_0$. Assoluto: $f(x) \le f(x_0)$ per ogni $x$ del dominio.` },
    { id: 'fc-15', sezione: 'estremi', tipo: 'definizione', fronte: R`Punto stazionario`, retro: R`Un punto in cui $f'(x_0) = 0$: la tangente è orizzontale.` },
    { id: 'fc-16', sezione: 'estremi', tipo: 'definizione', fronte: R`Teorema di Fermat`, retro: R`Se $x_0$ è un estremo relativo interno al dominio e $f$ è derivabile in $x_0$, allora $f'(x_0) = 0$.` },
    { id: 'fc-17', sezione: 'estremi', tipo: 'procedura', fronte: R`Dove si cercano gli estremi assoluti?`, retro: R`Fra i punti stazionari, i punti di non derivabilità e gli estremi del dominio.` },
    { id: 'fc-18', sezione: 'ricerca-estremi', tipo: 'procedura', fronte: R`Come si riconosce un massimo dal segno di $f'$?`, retro: R`$f'$ passa da positiva a negativa. Da negativa a positiva si ha un minimo; se non cambia segno, non c'è estremo.` },
    { id: 'fc-19', sezione: 'ricerca-estremi', tipo: 'procedura', fronte: R`Test della derivata seconda`, retro: R`Se $f'(x_0) = 0$: $f''(x_0) < 0$ dà un massimo, $f''(x_0) > 0$ un minimo, $f''(x_0) = 0$ non decide.` },
    { id: 'fc-20', sezione: 'concavita-flessi', tipo: 'concetto', fronte: R`Che cosa dice il segno di $f''$?`, retro: R`$f'' > 0$: concavità verso l'alto. $f'' < 0$: concavità verso il basso.` },
    { id: 'fc-21', sezione: 'concavita-flessi', tipo: 'definizione', fronte: R`Punto di flesso`, retro: R`Un punto in cui la concavità cambia verso. Se $f''$ esiste, in quel punto $f''$ si annulla e cambia segno.` },
    { id: 'fc-22', sezione: 'concavita-flessi', tipo: 'definizione', fronte: R`I tre tipi di flesso`, retro: R`A tangente orizzontale ($f'(x_0) = 0$), obliqua ($f'(x_0) \ne 0$), verticale ($f$ non derivabile, $|f'| \to +\infty$).` },
    { id: 'fc-23', sezione: 'concavita-flessi', tipo: 'concetto', fronte: R`Perché $f''(x_0) = 0$ non basta per un flesso?`, retro: R`Perché $f''$ deve anche cambiare segno: $y = x^4$ ha $f''(0) = 0$ ma in $0$ ha un minimo.` },
    { id: 'fc-24', sezione: 'ottimizzazione', tipo: 'procedura', fronte: R`I passi di un problema di ottimizzazione`, retro: R`1) Scegliere la variabile. 2) Scrivere la grandezza come funzione di essa. 3) Determinare il dominio del problema. 4) Studiare il segno di $f'$.` },
    { id: 'fc-25', sezione: 'schema-completo', tipo: 'procedura', fronte: R`I sei passi dello studio di funzione`, retro: R`Dominio; simmetrie, zeri e segno; limiti e asintoti; $f'$ con monotonia ed estremi; $f''$ con concavità e flessi; grafico.` },
    { id: 'fc-26', sezione: 'schema-completo', tipo: 'formula', fronte: R`Come si trova l'asintoto obliquo?`, retro: R`$m = \lim_{x \to \infty} \dfrac{f(x)}{x}$ e $q = \lim_{x \to \infty} [f(x) - mx]$, entrambi finiti con $m \ne 0$.` }
  ],

  esercizi: [
    { id: 'es-01', difficolta: 1, testo: R`Verifica le ipotesi del teorema di Rolle per $f(x) = x^2 - 6x + 8$ in $[2; 4]$ e determina il valore di $c$.`, suggerimenti: [R`È un polinomio: continuità e derivabilità sono automatiche. Controlla i valori agli estremi.`, R`Imponi $f'(c) = 0$ con $f'(x) = 2x - 6$.`], risposta: { tipo: 'numero', valore: 3, tolleranza: 0.01 }, soluzione: [R`$f(2) = 4 - 12 + 8 = 0$ e $f(4) = 16 - 24 + 8 = 0$: i valori agli estremi coincidono.`, R`$f'(x) = 2x - 6$ si annulla per $x = 3$, che appartiene a $(2; 4)$.`, R`$c = 3$: è il vertice della parabola.`] },

    { id: 'es-02', difficolta: 1, testo: R`Determina il punto $c$ del teorema di Lagrange per $f(x) = x^2 - 2x$ nell'intervallo $[0; 4]$.`, suggerimenti: [R`Calcola prima il coefficiente angolare della corda.`, R`Poi risolvi $f'(c) = \dfrac{f(4) - f(0)}{4 - 0}$.`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`$f(0) = 0$, $f(4) = 16 - 8 = 8$. La corda ha pendenza $\dfrac{8 - 0}{4} = 2$.`, R`$f'(x) = 2x - 2$, quindi $2c - 2 = 2$.`, R`$c = 2$, interno all'intervallo.`] },

    { id: 'es-03', difficolta: 1, testo: R`Calcola $\lim_{x \to 0} \dfrac{e^x - 1 - x}{x^2}$.`, suggerimenti: [R`Controlla che sia davvero una forma $\frac{0}{0}$: per $x = 0$ il numeratore vale $1 - 1 - 0 = 0$.`, R`Dopo la prima applicazione ottieni ancora $\frac{0}{0}$: applica il teorema una seconda volta.`], risposta: { tipo: 'numero', valore: 0.5, tolleranza: 0.001 }, soluzione: [R`Forma $\dfrac{0}{0}$: si deriva sopra e sotto e si ottiene $\lim_{x \to 0} \dfrac{e^x - 1}{2x}$.`, R`Ancora $\dfrac{0}{0}$: si applica di nuovo, $\lim_{x \to 0} \dfrac{e^x}{2} = \dfrac{1}{2}$.`] },

    { id: 'es-04', difficolta: 1, testo: R`Determina l'intervallo in cui $f(x) = x^3 - 12x$ è decrescente (estremi inclusi).`, suggerimenti: [R`Studia il segno di $f'(x) = 3x^2 - 12$.`, R`La derivata è negativa fra i suoi due zeri.`], risposta: { tipo: 'intervallo', da: -2, a: 2, chiusoDa: true, chiusoA: true }, soluzione: [R`$f'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$.`, R`$f'(x) < 0$ per $-2 < x < 2$, positiva all'esterno.`, R`La funzione è decrescente in $[-2; 2]$; in $x = -2$ ha un massimo relativo e in $x = 2$ un minimo relativo.`] },

    { id: 'es-05', difficolta: 2, testo: R`Trova le ascisse dei punti di massimo e di minimo relativo di $f(x) = x^3 - 3x^2 + 2$.`, suggerimenti: [R`Calcola $f'$ e scomponila raccogliendo.`, R`$f'(x) = 3x(x - 2)$: studia il segno e leggi i cambi.`], risposta: { tipo: 'numeri', valori: [0, 2] }, soluzione: [R`$f'(x) = 3x^2 - 6x = 3x(x - 2)$, che si annulla in $x = 0$ e $x = 2$.`, R`$f' > 0$ per $x < 0$ e per $x > 2$, negativa in mezzo.`, R`In $x = 0$ la derivata passa da $+$ a $-$: massimo relativo, $f(0) = 2$. In $x = 2$ passa da $-$ a $+$: minimo relativo, $f(2) = -2$.`, R`Controllo con la derivata seconda: $f''(x) = 6x - 6$, $f''(0) = -6 < 0$ e $f''(2) = 6 > 0$.`] },

    { id: 'es-06', difficolta: 2, testo: R`Determina l'ascissa del punto di flesso di $f(x) = x^3 - 6x^2 + 5x$.`, suggerimenti: [R`Il flesso si cerca con la derivata seconda.`, R`$f''(x) = 6x - 12$: dove si annulla e cambia segno?`], risposta: { tipo: 'numero', valore: 2, tolleranza: 0.01 }, soluzione: [R`$f'(x) = 3x^2 - 12x + 5$ e $f''(x) = 6x - 12$.`, R`$f''(x) = 0$ per $x = 2$; inoltre $f'' < 0$ prima e $f'' > 0$ dopo, quindi la concavità cambia davvero.`, R`Il flesso ha ascissa $x = 2$ (ordinata $f(2) = 8 - 24 + 10 = -6$) ed è a tangente obliqua, perché $f'(2) = 12 - 24 + 5 = -7 \ne 0$.`] },

    { id: 'es-07', difficolta: 2, testo: R`Calcola $\lim_{x \to 0} \dfrac{\tan x - x}{x^3}$.`, suggerimenti: [R`È una forma $\frac{0}{0}$. Ricorda che la derivata di $\tan x$ è $1 + \tan^2 x$.`, R`Dopo la prima applicazione ottieni $\dfrac{\tan^2 x}{3x^2}$: puoi concludere con il limite notevole $\dfrac{\tan x}{x} \to 1$.`], risposta: { tipo: 'numero', valore: 1 / 3, tolleranza: 0.01 }, soluzione: [R`Numeratore e denominatore tendono a $0$: forma $\dfrac{0}{0}$.`, R`Derivando: $\lim_{x \to 0} \dfrac{(1 + \tan^2 x) - 1}{3x^2} = \lim_{x \to 0} \dfrac{\tan^2 x}{3x^2}$.`, R`Poiché $\dfrac{\tan x}{x} \to 1$, il limite vale $\dfrac{1}{3}$.`] },

    { id: 'es-08', difficolta: 2, testo: R`Fra tutti i rettangoli di perimetro $24$ cm, determina l'area massima (in centimetri quadrati).`, suggerimenti: [R`Chiama $x$ la base: quanto vale l'altezza?`, R`Scrivi $A(x) = x(12 - x)$ con $0 < x < 12$ e annulla $A'$.`], risposta: { tipo: 'numero', valore: 36, tolleranza: 0.01 }, soluzione: [R`Semiperimetro $12$, quindi altezza $12 - x$ e $A(x) = 12x - x^2$, con $0 < x < 12$.`, R`$A'(x) = 12 - 2x$ si annulla in $x = 6$, con $A'$ positiva prima e negativa dopo: massimo.`, R`$A(6) = 36\ \text{cm}^2$: il rettangolo è il quadrato di lato $6$ cm.`] },

    { id: 'es-09', difficolta: 2, testo: R`Il teorema di Rolle è applicabile a $f(x) = |x - 2|$ nell'intervallo $[1; 3]$? Rispondi sì o no.`, suggerimenti: [R`Controlla una per una le tre ipotesi.`, R`I valori agli estremi coincidono, ma che cosa succede in $x = 2$?`], risposta: { tipo: 'testo', accettate: ['no', 'no.', 'non e applicabile', 'non è applicabile', 'no, non e derivabile in 2', 'no, non è derivabile in 2'] }, soluzione: [R`$f$ è continua in $[1; 3]$ e $f(1) = f(3) = 1$: le prime e le terze ipotesi valgono.`, R`Ma in $x = 2$ c'è un punto angoloso: la derivata sinistra vale $-1$, la destra $+1$, quindi $f$ non è derivabile in un punto interno.`, R`Il teorema non è applicabile. Infatti $f'(x)$ vale $\pm 1$ e non si annulla mai: la tesi è falsa.`] },

    { id: 'es-10', difficolta: 3, testo: R`Determina $a$ e $b$ in modo che $f(x) = x^3 + ax^2 + bx$ abbia un massimo relativo in $x = -1$ e un flesso in $x = 1$. Scrivi i due valori, prima $a$ e poi $b$.`, suggerimenti: [R`Traduci le due richieste in condizioni su $f'$ e $f''$.`, R`Massimo in $-1$ dà $f'(-1) = 0$; flesso in $1$ dà $f''(1) = 0$.`, R`$f'(x) = 3x^2 + 2ax + b$ e $f''(x) = 6x + 2a$: parti dalla seconda condizione, che contiene solo $a$.`], risposta: { tipo: 'numeri', valori: [-3, -9], ordinati: true }, soluzione: [R`$f'(x) = 3x^2 + 2ax + b$, $f''(x) = 6x + 2a$.`, R`Flesso in $x = 1$: $f''(1) = 6 + 2a = 0 \Rightarrow a = -3$.`, R`Massimo in $x = -1$: $f'(-1) = 3 - 2a + b = 0$, cioè $3 + 6 + b = 0 \Rightarrow b = -9$.`, R`Verifica: $f'(x) = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$, quindi $f'(-1) = 0$, e $f''(-1) = -12 < 0$: in $-1$ c'è davvero un massimo. In $x = 1$ la derivata seconda cambia segno: è un flesso.`] },

    { id: 'es-11', difficolta: 3, testo: R`Un rettangolo ha la base sul diametro di una semicirconferenza di raggio $5$ e i due vertici opposti sulla semicirconferenza. Determina l'area massima.`, suggerimenti: [R`Detta $x$ la semibase, l'altezza si ricava dal teorema di Pitagora.`, R`$A(x) = 2x\sqrt{25 - x^2}$ con $0 < x < 5$. Conviene massimizzare $A^2$, perché la radice è crescente.`], risposta: { tipo: 'numero', valore: 25, tolleranza: 0.01 }, soluzione: [R`Con centro nell'origine e semibase $x$, l'altezza vale $\sqrt{25 - x^2}$, quindi $A(x) = 2x\sqrt{25 - x^2}$, con $0 < x < 5$.`, R`Si massimizza $A^2 = 4x^2(25 - x^2) = 100x^2 - 4x^4$; la derivata è $200x - 16x^3 = 8x(25 - 2x^2)$.`, R`Si annulla per $x^2 = \dfrac{25}{2}$, cioè $x = \dfrac{5}{\sqrt{2}}$, con derivata positiva prima e negativa dopo: è il massimo.`, R`Allora $\sqrt{25 - x^2} = \dfrac{5}{\sqrt{2}}$ e $A = 2 \cdot \dfrac{5}{\sqrt{2}} \cdot \dfrac{5}{\sqrt{2}} = 25$.`] },

    { id: 'es-12', difficolta: 3, testo: R`Calcola $\lim_{x \to +\infty} \dfrac{x + \sin x}{x + \cos x}$ e spiega perché il teorema di de l'Hôpital qui non aiuta.`, suggerimenti: [R`Prova ad applicare de l'Hôpital e guarda che cosa ottieni.`, R`Raccogli $x$ a numeratore e a denominatore e usa il fatto che $\sin x$ e $\cos x$ sono limitate.`], risposta: { tipo: 'numero', valore: 1, tolleranza: 0.001 }, soluzione: [R`La forma è $\dfrac{\infty}{\infty}$; il rapporto delle derivate è però $\dfrac{1 + \cos x}{1 - \sin x}$, che per $x \to +\infty$ **non ha limite** (e il denominatore $1 - \sin x$ si annulla persino in infiniti punti, contro l'ipotesi $g' \ne 0$).`, R`Il teorema è a senso unico: se il limite del rapporto delle derivate non esiste, non si può concludere nulla, ma nemmeno escludere che il limite di partenza esista.`, R`Si procede in altro modo: $\dfrac{x + \sin x}{x + \cos x} = \dfrac{1 + \frac{\sin x}{x}}{1 + \frac{\cos x}{x}}$, e poiché $\dfrac{\sin x}{x} \to 0$ e $\dfrac{\cos x}{x} \to 0$, il limite vale $1$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale ipotesi **non** è richiesta dal teorema di Rolle?`, opzioni: [R`$f$ continua in $[a; b]$`, R`$f$ derivabile in $(a; b)$`, R`$f(a) = f(b)$`, R`$f$ derivabile anche negli estremi $a$ e $b$`], corretta: 3, spiegazione: R`La derivabilità si chiede solo nei punti interni: $f(x) = \sqrt{1 - x^2}$ in $[-1; 1]$ soddisfa Rolle pur avendo tangente verticale agli estremi. Le altre tre sono proprio le ipotesi del teorema.` },
    { id: 'q-02', domanda: R`Perché il teorema di Rolle non si applica a $f(x) = |x|$ in $[-1; 1]$?`, opzioni: [R`perché $f(-1) \ne f(1)$`, R`perché $f$ non è continua in $0$`, R`perché $f$ non è derivabile in $0$`, R`perché l'intervallo non è chiuso`], corretta: 2, spiegazione: R`$f(-1) = f(1) = 1$ e la funzione è continua ovunque; salta invece la derivabilità nel punto angoloso $x = 0$. Infatti $f'$ vale $\pm 1$ e non si annulla mai.` },
    { id: 'q-03', domanda: R`Il teorema di Lagrange garantisce l'esistenza di un punto interno in cui…`, opzioni: [R`la tangente è parallela alla corda che unisce gli estremi del grafico`, R`la tangente è orizzontale`, R`la funzione assume la media fra $f(a)$ e $f(b)$`, R`la derivata seconda si annulla`], corretta: 0, spiegazione: R`La tesi è $f'(c) = \dfrac{f(b) - f(a)}{b - a}$: la pendenza della tangente uguaglia quella della corda. La tangente orizzontale si ha solo nel caso particolare di Rolle; sulla derivata seconda il teorema non dice nulla.` },
    { id: 'q-04', domanda: R`Il teorema di Rolle è il caso particolare del teorema di Lagrange in cui…`, opzioni: [R`$f$ è costante`, R`$f(a) = f(b)$`, R`$a = b$`, R`$f'(a) = f'(b)$`], corretta: 1, spiegazione: R`Se $f(a) = f(b)$ il rapporto $\dfrac{f(b) - f(a)}{b - a}$ vale zero e la tesi di Lagrange diventa $f'(c) = 0$. Con $a = b$ non ci sarebbe nessun intervallo, e la costanza di $f$ è una condizione ben più forte.` },
    { id: 'q-05', domanda: R`Se $f'(x) = 0$ per ogni $x$ di un intervallo $I$, allora in $I$…`, opzioni: [R`$f(x) = 0$`, R`$f$ è crescente`, R`$f$ ha un flesso`, R`$f$ è costante`], corretta: 3, spiegazione: R`Per Lagrange $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) = 0$: la funzione assume sempre lo stesso valore. Attenzione: costante non vuol dire nulla, il valore costante può essere qualunque.` },
    { id: 'q-06', domanda: R`Se $f$ è derivabile e strettamente crescente in un intervallo $I$, si può concludere che…`, opzioni: [R`$f'(x) > 0$ per ogni $x \in I$`, R`$f'(x) \ge 0$ per ogni $x \in I$`, R`$f'(x) \ne 0$ per ogni $x \in I$`, R`$f''(x) > 0$ per ogni $x \in I$`], corretta: 1, spiegazione: R`La derivata può annullarsi in qualche punto isolato senza che la crescenza si interrompa: $y = x^3$ è strettamente crescente ma $f'(0) = 0$. Il criterio di monotonia non si rovescia con la disuguaglianza stretta: da «strettamente crescente» si ricava solo $f' \ge 0$.` },
    { id: 'q-07', domanda: R`Prima di applicare il teorema di de l'Hôpital bisogna…`, opzioni: [R`verificare che il limite si presenti nella forma $\frac{0}{0}$ o $\frac{\infty}{\infty}$`, R`calcolare la derivata del quoziente $\frac{f}{g}$`, R`verificare che $f$ e $g$ siano continue in $x_0$`, R`conoscere già il valore del limite`], corretta: 0, spiegazione: R`Il teorema vale solo per quelle due forme indeterminate: applicato a $\lim_{x \to 0} \frac{x+1}{x+2}$ darebbe $1$ invece di $\frac{1}{2}$. Non si deriva il quoziente, e la continuità in $x_0$ non serve (anzi, $x_0$ può essere escluso).` },
    { id: 'q-08', domanda: R`Se $\lim \dfrac{f'(x)}{g'(x)}$ non esiste, il limite di $\dfrac{f(x)}{g(x)}$…`, opzioni: [R`non esiste`, R`vale $0$`, R`può esistere lo stesso: il teorema non dice nulla`, R`è certamente infinito`], corretta: 2, spiegazione: R`Il teorema funziona in un verso solo. Per $\lim_{x \to +\infty} \frac{x + \sin x}{x}$ il rapporto delle derivate è $1 + \cos x$, che non ha limite, ma il limite di partenza vale $1$.` },
    { id: 'q-09', domanda: R`Il teorema di Fermat afferma che, in un punto di estremo relativo interno in cui $f$ è derivabile…`, opzioni: [R`$f''(x_0) < 0$`, R`$f(x_0) = 0$`, R`$f'(x_0) \ne 0$`, R`$f'(x_0) = 0$`], corretta: 3, spiegazione: R`La tangente in un estremo relativo interno è orizzontale. Il segno di $f''$ distingue poi massimi e minimi, ma non fa parte del teorema di Fermat, e il valore $f(x_0)$ non c'entra.` },
    { id: 'q-10', domanda: R`Un punto in cui $f'(x_0) = 0$…`, opzioni: [R`è certamente un massimo relativo`, R`è certamente un minimo relativo`, R`è un punto stazionario, e può essere massimo, minimo o flesso`, R`è un punto di non derivabilità`], corretta: 2, spiegazione: R`$f'(x_0) = 0$ è condizione necessaria ma non sufficiente: $y = x^3$ ha $f'(0) = 0$ e in $0$ non ha né massimo né minimo, ma un flesso a tangente orizzontale.` },
    { id: 'q-11', domanda: R`Se $f'(x_0) = 0$ e $f''(x_0) > 0$, il punto $x_0$ è…`, opzioni: [R`un minimo relativo`, R`un massimo relativo`, R`un flesso a tangente orizzontale`, R`un punto di non derivabilità`], corretta: 0, spiegazione: R`Derivata seconda positiva significa concavità verso l'alto: la tangente orizzontale è il fondo di una conca. Con $f''(x_0) < 0$ si avrebbe invece un massimo.` },
    { id: 'q-12', domanda: R`Se $f'(x_0) = 0$ e $f''(x_0) = 0$, che cosa si può concludere?`, opzioni: [R`$x_0$ è certamente un flesso`, R`$x_0$ non è certamente un estremo`, R`il test non decide: bisogna studiare il segno di $f'$ intorno a $x_0$`, R`$x_0$ è certamente un minimo`], corretta: 2, spiegazione: R`$y = x^4$ e $y = x^3$ hanno entrambe $f'(0) = f''(0) = 0$, ma la prima ha un minimo e la seconda un flesso. Serve la tabella dei segni di $f'$.` },
    { id: 'q-13', domanda: R`Se $f''(x) < 0$ in un intervallo, in quell'intervallo…`, opzioni: [R`$f$ è decrescente`, R`la concavità è rivolta verso il basso`, R`il grafico sta sotto l'asse $x$`, R`$f$ ha un massimo assoluto`], corretta: 1, spiegazione: R`Il segno di $f''$ riguarda la concavità, non la monotonia (quella la dà $f'$) e nemmeno il segno di $f$. Per esempio $y = -x^2 + 100$ ha $f'' < 0$ ma è positiva e crescente per $-10 < x < 0$.` },
    { id: 'q-14', domanda: R`Quando si ha un flesso a tangente verticale in $x_0$?`, opzioni: [R`quando $f'(x_0) = 0$ e $f''$ cambia segno`, R`quando $f''(x_0) = 0$ e la tangente è obliqua`, R`quando la funzione non è continua in $x_0$`, R`quando $f$ non è derivabile in $x_0$, la derivata tende a infinito con lo stesso segno da entrambe le parti e la concavità cambia`], corretta: 3, spiegazione: R`È il caso di $y = \sqrt[3]{x}$ nell'origine. Se i due limiti della derivata fossero infiniti di segno opposto si avrebbe una cuspide; con $f'(x_0) = 0$ il flesso sarebbe a tangente orizzontale.` },
    { id: 'q-15', domanda: R`Nel grafico di $f'$, un punto di massimo relativo di $f$ appare come…`, opzioni: [R`un massimo di $f'$`, R`uno zero di $f'$ con cambio di segno da positivo a negativo`, R`uno zero di $f'$ con cambio di segno da negativo a positivo`, R`un punto in cui $f'$ non è definita`], corretta: 1, spiegazione: R`Prima del massimo $f$ cresce (quindi $f' > 0$), dopo decresce ($f' < 0$): la derivata attraversa lo zero scendendo. Il cambio da negativo a positivo indica invece un minimo.` },
    { id: 'q-16', domanda: R`In un problema di ottimizzazione su un intervallo chiuso $[a; b]$, il massimo assoluto…`, opzioni: [R`può trovarsi anche in un estremo dell'intervallo`, R`si trova sempre in un punto stazionario`, R`esiste solo se $f$ è derivabile`, R`non esiste se $f'$ non si annulla mai`], corretta: 0, spiegazione: R`Il teorema di Fermat riguarda solo i punti **interni**: negli estremi la derivata non è tenuta ad annullarsi, eppure lì il massimo può cadere (pensa a $f(x) = x$ in $[0; 1]$). Per Weierstrass, se $f$ è continua il massimo esiste comunque.` }
  ],

  suggerimenti: [
    { tipo: 'metodo', testo: R`Lo studio di funzione si fa nell'ordine: dominio, simmetrie e segno, limiti e asintoti, $f'$, $f''$, grafico. Saltare un passo si paga alla fine, quando il grafico non torna.` },
    { tipo: 'errore', testo: R`Con de l'Hôpital si derivano numeratore e denominatore **separatamente**. Chi applica la regola del quoziente ottiene numeri sbagliati e non se ne accorge.` },
    { tipo: 'errore', testo: R`Non si scrive «crescente in $(-\infty; 0) \cup (0; +\infty)$»: la monotonia si dichiara su un intervallo alla volta, perché l'unione non è un intervallo.` },
    { tipo: 'trucco', testo: R`Se hai già calcolato $f''$ per la concavità, usala anche per classificare i punti stazionari: il segno di $f''$ nel punto ti dice massimo o minimo senza tabella dei segni.` },
    { tipo: 'errore', testo: R`$f'(x_0) = 0$ non basta per dire «massimo». Va sempre controllato il cambio di segno di $f'$ (oppure il segno di $f''$): potrebbe essere un flesso a tangente orizzontale.` },
    { tipo: 'errore', testo: R`Nemmeno $f''(x_0) = 0$ basta per dire «flesso»: la derivata seconda deve anche cambiare segno. Controesempio classico: $y = x^4$ nell'origine.` },
    { tipo: 'metodo', testo: R`Nei problemi di ottimizzazione la parte difficile non è derivare: è scrivere la grandezza in funzione di **una sola** variabile e stabilire il dominio geometrico del problema.` },
    { tipo: 'trucco', testo: R`Quando devi minimizzare una distanza, minimizza il suo quadrato: i punti di minimo sono gli stessi e sparisce la radice.` },
    { tipo: 'trucco', testo: R`Controlla subito le simmetrie: se $f(-x) = f(x)$ o $f(-x) = -f(x)$ puoi studiare solo le $x$ positive e ribaltare il grafico. Metà lavoro.` },
    { tipo: 'metodo', testo: R`Prima di applicare de l'Hôpital, prova con i limiti notevoli o con un raccoglimento: spesso sono più veloci, e in qualche caso (come $\frac{x + \sin x}{x}$) la regola non conclude affatto.` }
  ],

  aneddoti: [
    { matematico: 'Michel Rolle', anni: '1652–1719', titolo: 'Il teorema di chi non credeva nel calcolo', testo: R`Rolle nacque in Alvernia da una famiglia modesta, lavorò come scrivano per un notaio e per alcuni avvocati e imparò la matematica da solo. Si fece notare risolvendo un problema di analisi indeterminata che aveva messo in difficoltà i dotti dell'epoca, e nel 1690 pubblicò il *Traité d'algèbre*, dove compare anche la notazione con l'indice sulla radice che usiamo ancora. Il risultato che oggi porta il suo nome lo dimostrò l'anno dopo, in forma puramente algebrica, per le equazioni polinomiali: serviva a separare le radici, non a fondare l'analisi. Il paradosso è che Rolle fu uno dei più accaniti oppositori del calcolo infinitesimale, che davanti all'Accademia delle Scienze definiva una raccolta di ragionamenti ingegnosi ma falsi. Il nome «teorema di Rolle» arrivò solo nell'Ottocento.`, legame: R`Il teorema di Rolle è il primo mattone: da lui si ricava Lagrange, e da Lagrange tutto il legame fra segno della derivata e andamento della funzione.` },

    { matematico: 'Joseph-Louis Lagrange', anni: '1736–1813', titolo: 'Il torinese che scrisse un libro senza figure', testo: R`Nato a Torino come Giuseppe Luigi Lagrangia, a diciannove anni era già professore alla Scuola di artiglieria. Eulero lo volle a Berlino come proprio successore, e più tardi Parigi lo accolse fra i suoi maggiori scienziati: presiedette la commissione che definì il sistema metrico decimale e Napoleone lo fece conte e senatore. La sua *Mécanique analytique* del 1788 apre con una dichiarazione orgogliosa: in quest'opera non si troverà nessuna figura. Tutta la meccanica, sosteneva, si può ridurre a calcolo. Nella *Théorie des fonctions analytiques* del 1797 provò a fondare il calcolo differenziale sugli sviluppi in serie, per liberarlo dagli infinitesimi che tanti trovavano sospetti: è lì che compare il teorema del valor medio.`, legame: R`Il teorema di Lagrange è lo strumento che trasforma un'informazione locale (la derivata in un punto) in un'informazione globale (come si comporta la funzione su tutto un intervallo).` },

    { matematico: 'Guillaume de l\'Hôpital e Johann Bernoulli', anni: '1661–1704 e 1667–1748', titolo: 'La regola comprata con un contratto', testo: R`Nel 1694 il marchese de l'Hôpital, nobile francese appassionato di matematica, propose al giovane Johann Bernoulli un accordo per iscritto: uno stipendio regolare in cambio delle sue scoperte, che il marchese avrebbe potuto usare come gli pareva, e con l'impegno di Bernoulli a non comunicarle ad altri. Due anni dopo uscì l'*Analyse des infiniment petits*, il primo manuale di calcolo differenziale della storia, pubblicato senza nome d'autore ma riconosciuto subito come opera di l'Hôpital; nella prefazione egli ammetteva i propri debiti verso Leibniz e i Bernoulli. Alla morte del marchese, Johann rivendicò la paternità della regola sui limiti e fu creduto solo a metà, finché nel Novecento il ritrovamento dei suoi appunti di lezione gli diede pienamente ragione.`, legame: R`È la regola che scioglie le forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$: porta il nome di chi la pubblicò, non di chi la trovò.` },

    { matematico: 'Pierre de Fermat', anni: '1601–1665', titolo: 'Massimi e minimi prima della derivata', testo: R`Fermat faceva il magistrato al parlamento di Tolosa e la matematica era il suo passatempo: pubblicò pochissimo, e quasi tutto ciò che sappiamo viene dalle sue lettere. Intorno al 1636, mezzo secolo prima di Newton e Leibniz, descrisse un metodo per trovare massimi e minimi: incrementava la variabile di una quantità $E$, «adeguava» le due espressioni come se fossero uguali, semplificava e poi poneva $E = 0$. È esattamente il rapporto incrementale, con un passaggio al limite mascherato. Descartes lo attaccò duramente sostenendo che il metodo non funzionava, e dovette poi ammettere di avere torto. Nel 1662 Fermat enunciò anche il principio che porta il suo nome: la luce, fra tutti i cammini possibili, sceglie quello che percorre nel tempo minimo, e da questo ricavò la legge della rifrazione.`, legame: R`Il teorema di Fermat sui punti stazionari e i problemi di ottimizzazione nascono dallo stesso metodo, e il principio del tempo minimo è il primo grande problema di minimo della fisica.` },

    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Quattordici anni di liceo, poi la cattedra', testo: R`Mandato dal padre a studiare diritto, Weierstrass passò gli anni universitari fra la birra e la scherma e tornò a casa senza laurea. Diventò maestro in scuole di provincia, dove per quattordici anni insegnò matematica, fisica, calligrafia e perfino ginnastica, lavorando di notte a ricerche che nessuno leggeva. Nel 1854 una sua memoria sulle funzioni abeliane arrivò a una rivista importante e fece scalpore: gli offrirono una laurea honoris causa e, poco dopo, una cattedra a Berlino. Fu lui a portare nell'analisi il rigore delle definizioni con epsilon e delta, e a lui si deve il teorema che garantisce l'esistenza del massimo e del minimo assoluti per una funzione continua su un intervallo chiuso e limitato.`, legame: R`Il teorema di Weierstrass è ciò che assicura che, nei problemi di ottimizzazione ben posti, il massimo che stiamo cercando esiste davvero.` }
  ]
});
})();
