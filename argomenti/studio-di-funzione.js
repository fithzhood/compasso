(function () {
const R = String.raw;
COMPASSO.registra({
  id: 'studio-di-funzione',
  titolo: 'Studio di funzione',

  introduzione: R`Studiare una funzione significa ricostruirne il grafico senza calcolare centinaia di punti: si guarda dove è definita, dove sale e dove scende, dove ha le sue vette e le sue conche, come si piega e dove se ne va all'infinito. Tutte queste informazioni sono nascoste nella derivata prima e nella derivata seconda, e tre teoremi — Rolle, Lagrange e de l'Hôpital — sono le chiavi che le tirano fuori.

Non è solo un esercizio da libro di testo. Ogni volta che si cerca il massimo di qualcosa — il ricavo più alto, il materiale minimo per costruire una scatola, il percorso più veloce, la dose più efficace — si sta risolvendo un problema di massimo o di minimo, e il metodo è sempre lo stesso: si scrive la grandezza come funzione di una variabile e si guarda dove la derivata cambia segno. Il principio di Fermat, per cui la luce sceglie il cammino di tempo minimo, è un problema di questo tipo risolto nel Seicento.

Serve avere già in mano il calcolo dei limiti (comprese le forme indeterminate e gli asintoti) e le regole di derivazione: qui la derivata non si calcola per esercizio, si usa per leggere una funzione.`,

  sezioni: [
    { id: 'rolle', titolo: 'Il teorema di Rolle', testo: R`Il primo teorema che collega il comportamento di una funzione al valore della sua derivata riguarda una situazione molto particolare: una funzione che, dopo un tratto di strada, torna alla quota di partenza.

>* **Teorema di Rolle.** Se $f$ è continua nell'intervallo chiuso $[a; b]$, derivabile in ogni punto dell'intervallo aperto $(a; b)$ e assume valori uguali agli estremi, $f(a) = f(b)$, allora esiste almeno un punto $c \in (a; b)$ tale che $f'(c) = 0$.

Il significato geometrico è immediato: se il grafico parte e arriva alla stessa altezza, da qualche parte deve avere la tangente orizzontale. Se la funzione sale, prima o poi deve ridiscendere, e nel punto più alto la tangente è piatta.

Esempio: $f(x) = \sin x$ nell'intervallo $[0; \pi]$. È continua e derivabile ovunque, e $\sin 0 = \sin \pi = 0$: le ipotesi valgono. La tesi si verifica direttamente, perché $f'(x) = \cos x$ si annulla in $c = \dfrac{\pi}{2}$, che sta dentro l'intervallo.

[[grafico:rolle]]

Le tre ipotesi servono tutte, e si vede togliendone una alla volta:

- **senza continuità**: $f(x) = x$ per $0 \le x < 1$ e $f(1) = 0$. Qui $f(0) = f(1) = 0$ e la funzione è derivabile all'interno, ma $f'(x) = 1$ non si annulla mai. Manca la continuità in $x = 1$.
- **senza derivabilità**: $f(x) = |x|$ in $[-1; 1]$. È continua, $f(-1) = f(1) = 1$, ma la derivata vale $-1$ a sinistra e $+1$ a destra: mai zero. Il punto angoloso in $0$ rovina tutto.
- **senza $f(a) = f(b)$**: $f(x) = x$ in $[0; 1]$ è continua e derivabile, ma $f'(x) = 1 \ne 0$.

>! Il teorema dice che il punto $c$ **esiste**, non dice dove sia né quanti ce ne siano. Per $f(x) = \sin x$ in $[0; 2\pi]$ i punti con tangente orizzontale sono due.

> Le due ipotesi non riguardano lo stesso insieme: la continuità si chiede sull'intervallo **chiuso**, la derivabilità solo su quello **aperto**. Così $f(x) = \sqrt{1 - x^2}$ in $[-1; 1]$ rientra nel teorema, anche se negli estremi la tangente è verticale.` },

    { id: 'lagrange', titolo: 'Il teorema di Lagrange', testo: R`Il teorema di Rolle si generalizza subito: se il grafico non torna alla quota di partenza, la tangente da qualche parte non sarà orizzontale, ma parallela alla corda che unisce gli estremi.

>* **Teorema di Lagrange** (o del valor medio). Se $f$ è continua in $[a; b]$ e derivabile in $(a; b)$, esiste almeno un punto $c \in (a; b)$ tale che $$f'(c) = \frac{f(b) - f(a)}{b - a}.$$

Il secondo membro è il coefficiente angolare della corda che congiunge $A(a; f(a))$ e $B(b; f(b))$; il primo membro è la pendenza della tangente in $c$. La tesi dice dunque: **esiste un punto in cui la tangente è parallela alla corda**.

[[grafico:lagrange]]

Rolle è il caso particolare in cui la corda è orizzontale: se $f(a) = f(b)$ il rapporto vale zero e si ritrova $f'(c) = 0$. Vale anche il viceversa: si dimostra Lagrange applicando Rolle alla differenza fra $f$ e la retta della corda, cioè alla funzione $$h(x) = f(x) - f(a) - \frac{f(b) - f(a)}{b - a}(x - a),$$ che è continua, derivabile e vale zero sia in $a$ sia in $b$.

Esempio: $f(x) = x^2$ in $[0; 3]$. Il rapporto vale $\dfrac{9 - 0}{3 - 0} = 3$; da $f'(c) = 2c = 3$ si ricava $c = \dfrac{3}{2}$, che appartiene a $(0; 3)$.

C'è una lettura cinematica che aiuta a ricordarlo: se in due ore ho percorso $180$ km, la mia velocità media è stata $90$ km/h, e in almeno un istante il tachimetro segnava esattamente $90$. La velocità istantanea, prima o poi, uguaglia quella media.

[[animazione:secante-tangente]]

>! Anche qui la derivabilità deve valere in **tutti** i punti interni. Per $f(x) = |x|$ in $[-1; 2]$ il rapporto è $\dfrac{2 - 1}{3} = \dfrac{1}{3}$, ma la derivata vale solo $\pm 1$: nessun $c$ funziona, perché in $0$ la funzione non è derivabile.

> Scritta come $f(b) = f(a) + f'(c)\,(b - a)$, la tesi si chiama **formula degli incrementi finiti**: dice di quanto è cresciuta la funzione, usando una sola derivata calcolata in un punto opportuno.` },

    { id: 'conseguenze', titolo: 'Segno della derivata e monotonia', testo: R`Il teorema di Lagrange, da solo, sembra una curiosità; le sue conseguenze sono invece lo strumento che si usa in ogni studio di funzione.

>* **Prima conseguenza.** Se $f'(x) = 0$ per ogni $x$ di un **intervallo** $I$, allora $f$ è costante in $I$. Di conseguenza, due funzioni che hanno la stessa derivata su $I$ differiscono per una costante.

La dimostrazione è una riga: presi due punti $x_1 < x_2$ di $I$, Lagrange dà $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) = 0$, quindi i due valori coincidono. È la proprietà su cui si fonda il calcolo delle primitive: tutte le primitive di una stessa funzione differiscono per una costante additiva.

>* **Criterio di monotonia.** Sia $f$ derivabile in un intervallo $I$: se $f'(x) > 0$ per ogni $x$ interno a $I$, allora $f$ è strettamente **crescente** in $I$; se $f'(x) < 0$, è strettamente **decrescente**.

Anche qui basta Lagrange: $f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$ e, poiché $x_2 - x_1 > 0$, il segno della differenza è quello di $f'$.

Esempio: $f(x) = x^3 - 3x$ ha $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$, positiva per $x < -1$ e per $x > 1$. Quindi $f$ cresce in $(-\infty; -1]$, decresce in $[-1; 1]$, cresce in $[1; +\infty)$.

>! La parola «intervallo» non è un dettaglio. La funzione $f(x) = \dfrac{1}{x}$ ha $f'(x) = -\dfrac{1}{x^2} < 0$ in tutto il suo dominio, eppure $f(-1) = -1$ è minore di $f(1) = 1$: non è decrescente sul dominio, lo è **su ciascuno dei due rami**. Il dominio $\mathbb{R} - \{0\}$ non è un intervallo.

>! Il viceversa del criterio è più debole di quanto si creda: se $f$ è crescente e derivabile si può concludere solo $f'(x) \ge 0$. La funzione $y = x^3$ è strettamente crescente, ma $f'(0) = 0$.` },

    { id: 'hopital', titolo: 'Il teorema di de l\'Hôpital', testo: R`Le forme indeterminate $\dfrac{0}{0}$ e $\dfrac{\infty}{\infty}$ si possono spesso sciogliere derivando separatamente numeratore e denominatore.

>* **Teorema di de l'Hôpital.** Siano $f$ e $g$ derivabili in un intorno di $x_0$ (escluso al più $x_0$), con $g'(x) \ne 0$. Se $\lim_{x \to x_0} f(x)$ e $\lim_{x \to x_0} g(x)$ sono entrambi $0$, oppure entrambi infiniti, e se esiste $\lim_{x \to x_0} \dfrac{f'(x)}{g'(x)} = L$ (finito o infinito), allora anche $$\lim_{x \to x_0} \frac{f(x)}{g(x)} = L.$$

Il teorema vale anche per $x \to \pm\infty$ e per i limiti destro e sinistro, e si può applicare più volte di seguito se la forma indeterminata si ripresenta.

Esempio (forma $\frac{0}{0}$): $$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \lim_{x \to 0} \frac{\sin x}{2x} = \lim_{x \to 0} \frac{\cos x}{2} = \frac{1}{2}.$$

Esempio (forma $\frac{\infty}{\infty}$): $\lim_{x \to +\infty} \dfrac{\ln x}{x} = \lim_{x \to +\infty} \dfrac{1/x}{1} = 0$. Il logaritmo cresce più lentamente di $x$.

Le forme $0 \cdot \infty$ si trasformano in un quoziente: $\lim_{x \to 0^+} x \ln x = \lim_{x \to 0^+} \dfrac{\ln x}{1/x} = \lim_{x \to 0^+} \dfrac{1/x}{-1/x^2} = \lim_{x \to 0^+} (-x) = 0$.

>! **Non** si deriva il quoziente. Si calcolano $f'$ e $g'$ separatamente e si fa il rapporto: $\dfrac{f'}{g'}$, non $\left(\dfrac{f}{g}\right)'$. È l'errore più frequente.

>! Prima di applicarlo bisogna **verificare la forma indeterminata**. Per $\lim_{x \to 0} \dfrac{x + 1}{x + 2}$ la regola darebbe $\dfrac{1}{1} = 1$, mentre il limite vale $\dfrac{1}{2}$: non c'era nessuna indeterminazione da sciogliere.

>! Se $\dfrac{f'}{g'}$ **non** ha limite, non si può concludere che non l'abbia $\dfrac{f}{g}$: il teorema è a senso unico. Per $\lim_{x \to +\infty} \dfrac{x + \sin x}{x}$ il rapporto delle derivate è $1 + \cos x$, che non ha limite, ma il limite di partenza vale $1$ (basta dividere per $x$).`  },
    { id: 'estremi', titolo: 'Massimi, minimi e teorema di Fermat', testo: R`Prima di cercare i massimi e i minimi conviene distinguerli con precisione.

>* Un punto $x_0$ del dominio è di **massimo relativo** se esiste un intorno di $x_0$ in cui $f(x) \le f(x_0)$; è di **massimo assoluto** se $f(x) \le f(x_0)$ per **ogni** $x$ del dominio. Definizioni analoghe, con il verso opposto, per i minimi. Il valore $f(x_0)$ si chiama massimo (o minimo) della funzione; $x_0$ è il **punto** di massimo.

Un massimo relativo è una vetta rispetto alle sole cime vicine; un massimo assoluto è la vetta più alta di tutta la catena. Ogni massimo assoluto è anche relativo, ma non viceversa.

>* **Teorema di Fermat.** Se $x_0$ è un punto di massimo o di minimo relativo, è **interno** al dominio e $f$ è **derivabile** in $x_0$, allora $f'(x_0) = 0$.

I punti in cui la derivata si annulla si chiamano **punti stazionari**. Fermat dice quindi: gli estremi relativi interni, dove la funzione è derivabile, vanno cercati fra i punti stazionari. La dimostrazione osserva che il rapporto incrementale a sinistra di un massimo è $\ge 0$ e a destra è $\le 0$: se la derivata esiste, i due limiti coincidono e valgono zero.

>! Il teorema non si inverte: $f'(x_0) = 0$ è condizione **necessaria** ma non sufficiente. La funzione $y = x^3$ ha $f'(0) = 0$, ma $0$ non è né massimo né minimo: è un flesso a tangente orizzontale.

I candidati a estremo sono di tre specie, e le ultime due sfuggono a Fermat:

1. i punti stazionari ($f'(x_0) = 0$);
2. i punti in cui $f$ non è derivabile ($y = |x|$ ha un minimo in $0$, dove la derivata non esiste);
3. gli estremi del dominio (in $[a; b]$ i punti $a$ e $b$ vanno esaminati a parte).

> **Teorema di Weierstrass:** una funzione continua su un intervallo chiuso e limitato $[a; b]$ ammette sempre massimo e minimo assoluti. È la garanzia che, nei problemi ben posti, la ricerca non è a vuoto.` },

    { id: 'ricerca-estremi', titolo: 'Trovare massimi e minimi', testo: R`Il metodo standard usa il **segno della derivata prima**: si risolve la disequazione $f'(x) > 0$, si costruisce la tabella dei segni e si legge dove la funzione cresce e dove decresce.

>* Se $f'$ passa da **positiva a negativa** attraversando $x_0$, allora $x_0$ è un punto di **massimo** relativo; se passa da **negativa a positiva**, è un punto di **minimo**; se non cambia segno, $x_0$ non è né l'uno né l'altro.

Esempio: $f(x) = x^3 - 3x$. Si ha $f'(x) = 3x^2 - 3$, che si annulla in $x = -1$ e $x = 1$ ed è positiva all'esterno di questo intervallo. Allora la funzione cresce fino a $-1$, decresce fra $-1$ e $1$, torna a crescere dopo: in $x = -1$ c'è un massimo relativo, $f(-1) = 2$, e in $x = 1$ un minimo relativo, $f(1) = -2$.

Nel grafico qui sotto puoi trascinare il punto $P$ lungo la curva: la retta tangente lo segue e accanto compare il valore di $f'(p)$. Fermati sulle due gobbe e osserva che la pendenza si azzera esattamente lì.

[[grafico:cubica]]

C'è anche una scorciatoia che evita la tabella dei segni.

>* **Test della derivata seconda.** Se $f'(x_0) = 0$ e $f''(x_0) < 0$, allora $x_0$ è un massimo relativo; se $f''(x_0) > 0$, è un minimo relativo. Se $f''(x_0) = 0$ il test **non decide**.

Sulla stessa funzione: $f''(x) = 6x$, quindi $f''(-1) = -6 < 0$ (massimo) e $f''(1) = 6 > 0$ (minimo), in accordo con quanto trovato prima. L'idea è che una gobba verso l'alto è concava verso il basso, e viceversa.

>! Quando $f''(x_0) = 0$ non si può concludere nulla: $y = x^4$ ha un minimo in $0$, $y = x^3$ ha un flesso, e per entrambe $f''(0) = 0$. In quel caso si torna al segno di $f'$.

>! Il test della derivata seconda non dice niente sui punti in cui $f$ non è derivabile: lì la tabella dei segni di $f'$ resta l'unico strumento.` },

    { id: 'concavita-flessi', titolo: 'Concavità e flessi', testo: R`La derivata seconda è la derivata di $f'$: dice come **cambia la pendenza**, cioè come si piega il grafico.

>* Se $f''(x) > 0$ in un intervallo, la funzione volge la **concavità verso l'alto** (il grafico sta sopra le sue tangenti); se $f''(x) < 0$, volge la **concavità verso il basso**. Un punto in cui la concavità cambia verso si chiama **punto di flesso**.

Se $f''$ esiste nel punto, la condizione $f''(x_0) = 0$ è **necessaria** perché $x_0$ sia di flesso, ma non sufficiente: bisogna sempre controllare che $f''$ cambi effettivamente segno. Per $y = x^4$ si ha $f''(0) = 0$, eppure $f'' = 12x^2$ resta positiva: in $0$ non c'è flesso, c'è un minimo.

I flessi si classificano in base alla tangente nel punto:

- **a tangente orizzontale**: $f'(x_0) = 0$, come $y = x^3$ nell'origine;
- **a tangente obliqua**: $f'(x_0) \ne 0$, come $y = x^3 - 3x$ nell'origine, dove $f'(0) = -3$;
- **a tangente verticale**: $f$ non è derivabile in $x_0$ e $|f'(x)| \to +\infty$, come $y = \sqrt[3]{x}$ nell'origine. Se invece i due limiti della derivata sono infiniti di segno opposto si ha una **cuspide**, non un flesso.

Esempio: per $f(x) = x^3 - 3x$ si ha $f''(x) = 6x$, negativa per $x < 0$ e positiva per $x > 0$: concavità verso il basso, poi verso l'alto, e in $(0; 0)$ un flesso a tangente obliqua di pendenza $-3$.

### Leggere il grafico di $f'$

Il grafico seguente sovrappone $f$, $f'$ e $f''$. Vale la pena imparare a passare dall'uno all'altro:

- dove $f'$ sta **sopra** l'asse $x$, $f$ sale; dove sta sotto, $f$ scende;
- gli **zeri** di $f'$ sono le ascisse dei punti stazionari di $f$;
- dove $f'$ **cresce** (cioè dove $f'' > 0$) la concavità di $f$ è verso l'alto; il minimo di $f'$ cade nel flesso di $f$.

[[grafico:derivate]]

>! Non si confonde il grafico di $f$ con quello di $f'$. Un massimo di $f$ corrisponde a uno **zero** di $f'$ con cambio di segno da $+$ a $-$, non a un massimo di $f'$.` },

    { id: 'ottimizzazione', titolo: 'Problemi di ottimizzazione', testo: R`Molti problemi concreti chiedono di rendere massima o minima una grandezza. Lo schema è sempre lo stesso.

>* 1) Si sceglie la variabile indipendente e le si dà un nome. 2) Si esprime la grandezza da ottimizzare come **funzione di quella sola variabile**, usando i vincoli del problema. 3) Si determina il **dominio del problema**, che di solito è più stretto del dominio della formula. 4) Si studia il segno di $f'$ e si conclude, controllando anche gli estremi del dominio.

Esempio. Fra tutti i rettangoli di perimetro $20$ cm, qual è quello di area massima? Detta $x$ la base, l'altezza vale $10 - x$ e l'area è $$A(x) = x(10 - x) = 10x - x^2, \qquad 0 < x < 10.$$ Da $A'(x) = 10 - 2x = 0$ si ottiene $x = 5$; poiché $A'$ è positiva prima e negativa dopo, in $x = 5$ c'è il massimo. L'altezza vale anch'essa $5$: fra tutti i rettangoli isoperimetrici il più esteso è il **quadrato**, con area $25\ \text{cm}^2$.

Nel grafico il cursore muove la base $b$ e il punto sale e scende lungo la parabola dell'area: il valore più alto si raggiunge al centro.

[[grafico:ottimizzazione]]

>! Il dominio del problema non coincide con quello della formula: $A(x) = 10x - x^2$ è definita su tutto $\mathbb{R}$, ma una base negativa o maggiore del semiperimetro non ha senso geometrico.

>! Se l'intervallo è **aperto**, il massimo può non esistere; se è **chiuso e limitato**, il teorema di Weierstrass lo garantisce, ma va cercato anche negli estremi, dove la derivata non è tenuta ad annullarsi.

> Quando la funzione da ottimizzare contiene una radice quadrata (per esempio una distanza), spesso conviene massimizzare o minimizzare il suo **quadrato**: i punti di estremo sono gli stessi, perché la radice è crescente, e i calcoli si semplificano.` },

    { id: 'schema-completo', titolo: 'Lo schema completo dello studio', testo: R`Mettendo tutto in fila si ottiene la procedura che porta al grafico.

>* 1) **Dominio** (condizioni di esistenza). 2) **Simmetrie** (pari, dispari), intersezioni con gli assi e **segno** di $f$. 3) **Limiti** agli estremi del dominio e **asintoti** (verticali, orizzontali, obliqui). 4) **Derivata prima**: punti stazionari, crescenza, massimi e minimi. 5) **Derivata seconda**: concavità e flessi. 6) Si disegna il **grafico** raccogliendo tutte le informazioni.

Sulla cubica $f(x) = x^3 - 3x$ i passi sono già stati fatti: dominio $\mathbb{R}$, funzione dispari, zeri in $0$ e $\pm\sqrt{3}$, limiti $\mp\infty$ e $\pm\infty$ senza asintoti, massimo $(-1; 2)$, minimo $(1; -2)$, flesso $(0; 0)$.

### Un esempio con gli asintoti: $f(x) = \dfrac{x^2 - 1}{x}$

1. **Dominio**: $x \ne 0$, cioè $\mathbb{R} - \{0\}$.
2. $f(-x) = \dfrac{x^2 - 1}{-x} = -f(x)$: la funzione è **dispari**, il grafico è simmetrico rispetto all'origine. Si annulla in $x = \pm 1$ ed è positiva per $-1 < x < 0$ e per $x > 1$.
3. $\lim_{x \to 0^-} f(x) = +\infty$ e $\lim_{x \to 0^+} f(x) = -\infty$: asintoto verticale $x = 0$. Inoltre $m = \lim_{x \to \infty} \dfrac{f(x)}{x} = 1$ e $q = \lim_{x \to \infty} [f(x) - x] = \lim_{x \to \infty} \left(-\dfrac{1}{x}\right) = 0$: **asintoto obliquo** $y = x$.
4. Conviene riscrivere $f(x) = x - \dfrac{1}{x}$, da cui $f'(x) = 1 + \dfrac{1}{x^2} > 0$ sempre: la funzione è crescente su ciascuno dei due rami e non ha né massimi né minimi.
5. $f''(x) = -\dfrac{2}{x^3}$: positiva per $x < 0$ (concavità verso l'alto) e negativa per $x > 0$ (concavità verso il basso). Non ci sono flessi, perché in $x = 0$ la funzione non è definita.

[[grafico:razionale]]

>! Scrivere «crescente in $(-\infty; 0) \cup (0; +\infty)$» è scorretto: l'unione non è un intervallo, e la monotonia si perde nel salto. Si dice: crescente in ciascuno dei due intervalli.` }
  ],

  grafici: {
    rolle: {
      tipo: 'piano', x: [-0.4, 3.6], y: [-0.5, 1.5], passo: [1, 0.5],
      funzioni: [{ f: 'sin(x)', etichetta: 'y = sin x', colore: 1, dominio: [0, 3.1416] }],
      punti: [
        { x: 0, y: 0, etichetta: 'a = 0', posizione: 'basso', colore: 2 },
        { x: 3.1416, y: 0, etichetta: 'b = π', posizione: 'basso', colore: 2 },
        { x: 1.5708, y: 1, etichetta: 'c', posizione: 'alto', colore: 4 }
      ],
      elementi: [{ tipo: 'tangente', f: 'sin(x)', x0: 1.5708, colore: 4 }],
      didascalia: "Rolle: f(0) = f(π) = 0, quindi da qualche parte la tangente è orizzontale. Qui succede in c = π/2."
    },
    lagrange: {
      tipo: 'piano', x: [-0.6, 3.6], y: [-1.5, 10], passo: [1, 2],
      funzioni: [{ f: 'x^2', etichetta: 'y = x²', colore: 1, dominio: [0, 3] }],
      elementi: [
        { tipo: 'segmento', da: [0, 0], a: [3, 9], etichetta: 'corda AB', tratteggio: true, colore: 2 },
        { tipo: 'tangente', f: 'x^2', x0: 1.5, colore: 4 }
      ],
      punti: [
        { x: 0, y: 0, etichetta: 'A', posizione: 'sinistra', colore: 2 },
        { x: 3, y: 9, etichetta: 'B', posizione: 'sinistra', colore: 2 },
        { x: 1.5, y: 2.25, etichetta: 'c = 1,5', posizione: 'basso', colore: 4 }
      ],
      didascalia: "Lagrange su y = x² in [0; 3]: la corda ha pendenza 3 e la tangente in c = 1,5 le è parallela."
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
        { tipo: 'tangente', f: 'x^3-3x', x0: 'p', colore: 4 },
        { tipo: 'punto', p: ['p', 'p^3-3p'], trascina: true, etichetta: 'P', posizione: 'alto-destra', colore: 4 },
        { tipo: 'testo', p: [-2.4, 4], testo: "f'(p) = {{3*p^2 - 3}}", ancora: 'start' }
      ],
      parametri: [{ nome: 'p', min: -2, max: 2, passo: 0.05, valore: 0.5, etichetta: 'p' }],
      didascalia: "Trascina P lungo la curva: f'(p) è la pendenza della tangente. Si azzera nel massimo e nel minimo."
    },
    derivate: {
      tipo: 'piano', x: [-2.4, 2.4], y: [-6.5, 6.5], passo: [1, 2],
      funzioni: [
        { f: 'x^3 - 3x', etichetta: 'f', colore: 1 },
        { f: '3x^2 - 3', etichetta: "f'", colore: 2 },
        { f: '6x', etichetta: 'f″', colore: 3 }
      ],
      punti: [
        { x: -1, y: 0, etichetta: '', colore: 2 },
        { x: 1, y: 0, etichetta: '', colore: 2 }
      ],
      didascalia: "f, f' e f'' insieme: dove f' è sopra l'asse x la funzione sale; gli zeri di f' sono i punti stazionari; f'' cambia segno nel flesso."
    },
    razionale: {
      tipo: 'piano', x: [-5, 5], y: [-6, 6],
      funzioni: [{ f: '(x^2 - 1)/x', etichetta: 'y = (x² − 1)/x', colore: 1 }],
      elementi: [
        { tipo: 'retta', m: 1, q: 0, etichetta: 'y = x', tratteggio: true, colore: 3 },
        { tipo: 'verticale', x: 0, asintoto: true, etichetta: 'x = 0', colore: 2 }
      ],
      punti: [
        { x: -1, y: 0, etichetta: '−1', posizione: 'alto-sinistra', colore: 4 },
        { x: 1, y: 0, etichetta: '1', posizione: 'basso-destra', colore: 4 }
      ],
      didascalia: 'La funzione ha l\'asintoto verticale x = 0 e l\'asintoto obliquo y = x, a cui si accosta da sopra per x < 0 e da sotto per x > 0.'
    },
    ottimizzazione: {
      tipo: 'piano', x: [-1, 11], y: [-4, 30], passo: [1, 5],
      funzioni: [{ f: 'x*(10 - x)', etichetta: 'A(b) = b(10 − b)', colore: 1, dominio: [0, 10] }],
      elementi: [
        { tipo: 'segmento', da: ['b', 0], a: ['b', 'b*(10-b)'], tratteggio: true, colore: 2 },
        { tipo: 'punto', p: ['b', 'b*(10-b)'], etichetta: 'P', posizione: 'alto-destra', colore: 2 },
        { tipo: 'testo', p: [-0.6, 28], testo: 'base b = {{b}}    altezza = {{10 - b}}    area = {{b*(10-b)}}', ancora: 'start' }
      ],
      parametri: [{ nome: 'b', min: 1, max: 9, passo: 0.5, valore: 3, etichetta: 'b' }],
      didascalia: "Rettangoli di perimetro 20: muovendo la base b l'area descrive una parabola, massima per b = 5 (il quadrato)."
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
      R`Osservazione: il lato parallelo al muro è il doppio degli altri due, non un quadrato. Il vincolo «tre lati» cambia la risposta.`
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

    { id: 'es-10', difficolta: 3, testo: R`Determina $a$ e $b$ in modo che $f(x) = x^3 + ax^2 + bx$ abbia un massimo relativo in $x = -1$ e un flesso in $x = 1$. Scrivi i due valori.`, suggerimenti: [R`Traduci le due richieste in condizioni su $f'$ e $f''$.`, R`Massimo in $-1$ dà $f'(-1) = 0$; flesso in $1$ dà $f''(1) = 0$.`, R`$f'(x) = 3x^2 + 2ax + b$ e $f''(x) = 6x + 2a$: parti dalla seconda condizione, che contiene solo $a$.`], risposta: { tipo: 'numeri', valori: [-3, -9] }, soluzione: [R`$f'(x) = 3x^2 + 2ax + b$, $f''(x) = 6x + 2a$.`, R`Flesso in $x = 1$: $f''(1) = 6 + 2a = 0 \Rightarrow a = -3$.`, R`Massimo in $x = -1$: $f'(-1) = 3 - 2a + b = 0$, cioè $3 + 6 + b = 0 \Rightarrow b = -9$.`, R`Verifica: $f'(x) = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$, quindi $f'(-1) = 0$, e $f''(-1) = -12 < 0$: in $-1$ c'è davvero un massimo. In $x = 1$ la derivata seconda cambia segno: è un flesso.`] },

    { id: 'es-11', difficolta: 3, testo: R`Un rettangolo ha la base sul diametro di una semicirconferenza di raggio $5$ e i due vertici opposti sulla semicirconferenza. Determina l'area massima.`, suggerimenti: [R`Detta $x$ la semibase, l'altezza si ricava dal teorema di Pitagora.`, R`$A(x) = 2x\sqrt{25 - x^2}$ con $0 < x < 5$. Conviene massimizzare $A^2$, perché la radice è crescente.`], risposta: { tipo: 'numero', valore: 25, tolleranza: 0.01 }, soluzione: [R`Con centro nell'origine e semibase $x$, l'altezza vale $\sqrt{25 - x^2}$, quindi $A(x) = 2x\sqrt{25 - x^2}$, con $0 < x < 5$.`, R`Si massimizza $A^2 = 4x^2(25 - x^2) = 100x^2 - 4x^4$; la derivata è $200x - 16x^3 = 8x(25 - 2x^2)$.`, R`Si annulla per $x^2 = \dfrac{25}{2}$, cioè $x = \dfrac{5}{\sqrt{2}}$, con derivata positiva prima e negativa dopo: è il massimo.`, R`Allora $\sqrt{25 - x^2} = \dfrac{5}{\sqrt{2}}$ e $A = 2 \cdot \dfrac{5}{\sqrt{2}} \cdot \dfrac{5}{\sqrt{2}} = 25$.`] },

    { id: 'es-12', difficolta: 3, testo: R`Calcola $\lim_{x \to +\infty} \dfrac{x + \sin x}{x + \cos x}$ e spiega perché il teorema di de l'Hôpital qui non aiuta.`, suggerimenti: [R`Prova ad applicare de l'Hôpital e guarda che cosa ottieni.`, R`Raccogli $x$ a numeratore e a denominatore e usa il fatto che $\sin x$ e $\cos x$ sono limitate.`], risposta: { tipo: 'numero', valore: 1, tolleranza: 0.001 }, soluzione: [R`La forma è $\dfrac{\infty}{\infty}$, quindi il teorema sarebbe applicabile; il rapporto delle derivate è però $\dfrac{1 + \cos x}{1 - \sin x}$, che per $x \to +\infty$ **non ha limite**.`, R`Il teorema è a senso unico: se il limite del rapporto delle derivate non esiste, non si può concludere nulla, ma nemmeno escludere che il limite di partenza esista.`, R`Si procede in altro modo: $\dfrac{x + \sin x}{x + \cos x} = \dfrac{1 + \frac{\sin x}{x}}{1 + \frac{\cos x}{x}}$, e poiché $\dfrac{\sin x}{x} \to 0$ e $\dfrac{\cos x}{x} \to 0$, il limite vale $1$.`] }
  ],

  quiz: [
    { id: 'q-01', domanda: R`Quale ipotesi **non** è richiesta dal teorema di Rolle?`, opzioni: [R`$f$ continua in $[a; b]$`, R`$f$ derivabile in $(a; b)$`, R`$f(a) = f(b)$`, R`$f$ derivabile anche negli estremi $a$ e $b$`], corretta: 3, spiegazione: R`La derivabilità si chiede solo nei punti interni: $f(x) = \sqrt{1 - x^2}$ in $[-1; 1]$ soddisfa Rolle pur avendo tangente verticale agli estremi. Le altre tre sono proprio le ipotesi del teorema.` },
    { id: 'q-02', domanda: R`Perché il teorema di Rolle non si applica a $f(x) = |x|$ in $[-1; 1]$?`, opzioni: [R`perché $f(-1) \ne f(1)$`, R`perché $f$ non è continua in $0$`, R`perché $f$ non è derivabile in $0$`, R`perché l'intervallo non è chiuso`], corretta: 2, spiegazione: R`$f(-1) = f(1) = 1$ e la funzione è continua ovunque; salta invece la derivabilità nel punto angoloso $x = 0$. Infatti $f'$ vale $\pm 1$ e non si annulla mai.` },
    { id: 'q-03', domanda: R`Il teorema di Lagrange garantisce l'esistenza di un punto interno in cui…`, opzioni: [R`la tangente è parallela alla corda che unisce gli estremi del grafico`, R`la tangente è orizzontale`, R`la funzione assume la media fra $f(a)$ e $f(b)$`, R`la derivata seconda si annulla`], corretta: 0, spiegazione: R`La tesi è $f'(c) = \dfrac{f(b) - f(a)}{b - a}$: la pendenza della tangente uguaglia quella della corda. La tangente orizzontale si ha solo nel caso particolare di Rolle; sulla derivata seconda il teorema non dice nulla.` },
    { id: 'q-04', domanda: R`Il teorema di Rolle è il caso particolare del teorema di Lagrange in cui…`, opzioni: [R`$f$ è costante`, R`$f(a) = f(b)$`, R`$a = b$`, R`$f'(a) = f'(b)$`], corretta: 1, spiegazione: R`Se $f(a) = f(b)$ il rapporto $\dfrac{f(b) - f(a)}{b - a}$ vale zero e la tesi di Lagrange diventa $f'(c) = 0$. Con $a = b$ non ci sarebbe nessun intervallo, e la costanza di $f$ è una condizione ben più forte.` },
    { id: 'q-05', domanda: R`Se $f'(x) = 0$ per ogni $x$ di un intervallo $I$, allora in $I$…`, opzioni: [R`$f(x) = 0$`, R`$f$ è crescente`, R`$f$ ha un flesso`, R`$f$ è costante`], corretta: 3, spiegazione: R`Per Lagrange $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) = 0$: la funzione assume sempre lo stesso valore. Attenzione: costante non vuol dire nulla, il valore costante può essere qualunque.` },
    { id: 'q-06', domanda: R`Se $f$ è derivabile e strettamente crescente in un intervallo $I$, si può concludere che…`, opzioni: [R`$f'(x) > 0$ per ogni $x \in I$`, R`$f'(x) \ge 0$ per ogni $x \in I$`, R`$f'(x) \ne 0$ per ogni $x \in I$`, R`$f''(x) > 0$ per ogni $x \in I$`], corretta: 1, spiegazione: R`La derivata può annullarsi in qualche punto isolato senza che la crescenza si interrompa: $y = x^3$ è strettamente crescente ma $f'(0) = 0$. Il criterio funziona in un verso solo con la disuguaglianza stretta.` },
    { id: 'q-07', domanda: R`Prima di applicare il teorema di de l'Hôpital bisogna…`, opzioni: [R`verificare che il limite si presenti nella forma $\frac{0}{0}$ o $\frac{\infty}{\infty}$`, R`calcolare la derivata del quoziente $\frac{f}{g}$`, R`verificare che $f$ e $g$ siano continue in $x_0$`, R`conoscere già il valore del limite`], corretta: 0, spiegazione: R`Il teorema vale solo per quelle due forme indeterminate: applicato a $\lim_{x \to 0} \frac{x+1}{x+2}$ darebbe $1$ invece di $\frac{1}{2}$. Non si deriva il quoziente, e la continuità in $x_0$ non serve (anzi, $x_0$ può essere escluso).` },
    { id: 'q-08', domanda: R`Se $\lim \dfrac{f'(x)}{g'(x)}$ non esiste, il limite di $\dfrac{f(x)}{g(x)}$…`, opzioni: [R`non esiste`, R`vale $0$`, R`può esistere lo stesso: il teorema non dice nulla`, R`è certamente infinito`], corretta: 2, spiegazione: R`Il teorema funziona in un verso solo. Per $\lim_{x \to +\infty} \frac{x + \sin x}{x}$ il rapporto delle derivate è $1 + \cos x$, che non ha limite, ma il limite di partenza vale $1$.` },
    { id: 'q-09', domanda: R`Il teorema di Fermat afferma che, in un punto di estremo relativo interno in cui $f$ è derivabile…`, opzioni: [R`$f''(x_0) < 0$`, R`$f(x_0) = 0$`, R`$f'(x_0) \ne 0$`, R`$f'(x_0) = 0$`], corretta: 3, spiegazione: R`La tangente in un estremo relativo interno è orizzontale. Il segno di $f''$ distingue poi massimi e minimi, ma non fa parte del teorema di Fermat, e il valore $f(x_0)$ non c'entra.` },
    { id: 'q-10', domanda: R`Un punto in cui $f'(x_0) = 0$…`, opzioni: [R`è certamente un massimo relativo`, R`è certamente un minimo relativo`, R`è un punto stazionario, e può essere massimo, minimo o flesso`, R`è un punto di non derivabilità`], corretta: 2, spiegazione: R`$f'(x_0) = 0$ è condizione necessaria ma non sufficiente: $y = x^3$ ha $f'(0) = 0$ e in $0$ non ha né massimo né minimo, ma un flesso a tangente orizzontale.` },
    { id: 'q-11', domanda: R`Se $f'(x_0) = 0$ e $f''(x_0) > 0$, il punto $x_0$ è…`, opzioni: [R`un minimo relativo`, R`un massimo relativo`, R`un flesso a tangente orizzontale`, R`un punto di non derivabilità`], corretta: 0, spiegazione: R`Derivata seconda positiva significa concavità verso l'alto: la tangente orizzontale è il fondo di una conca. Con $f''(x_0) < 0$ si avrebbe invece un massimo.` },
    { id: 'q-12', domanda: R`Se $f'(x_0) = 0$ e $f''(x_0) = 0$, che cosa si può concludere?`, opzioni: [R`$x_0$ è certamente un flesso`, R`$x_0$ non è certamente un estremo`, R`il test non decide: bisogna studiare il segno di $f'$ intorno a $x_0$`, R`$x_0$ è certamente un minimo`], corretta: 2, spiegazione: R`$y = x^4$ e $y = x^3$ hanno entrambe $f'(0) = f''(0) = 0$, ma la prima ha un minimo e la seconda un flesso. Serve la tabella dei segni di $f'$.` },
    { id: 'q-13', domanda: R`Se $f''(x) < 0$ in un intervallo, in quell'intervallo…`, opzioni: [R`$f$ è decrescente`, R`la concavità è rivolta verso il basso`, R`il grafico sta sotto l'asse $x$`, R`$f$ ha un massimo assoluto`], corretta: 1, spiegazione: R`Il segno di $f''$ riguarda la concavità, non la monotonia (quella la dà $f'$) e nemmeno il segno di $f$. Per esempio $y = -x^2 + 100$ ha $f'' < 0$ ma è positiva e crescente per $x < 0$.` },
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
    { matematico: 'Michel Rolle', anni: '1652–1719', titolo: 'Il teorema di chi non credeva nel calcolo', testo: R`Rolle nacque in Alvernia da una famiglia modesta, lavorò come scrivano e notaio e imparò la matematica da solo. Si fece notare risolvendo un problema di analisi indeterminata che aveva messo in difficoltà i dotti dell'epoca, e nel 1690 pubblicò il *Traité d'algèbre*, dove compare anche la notazione con l'indice sulla radice che usiamo ancora. Il risultato che oggi porta il suo nome lo dimostrò l'anno dopo, in forma puramente algebrica, per le equazioni polinomiali: serviva a separare le radici, non a fondare l'analisi. Il paradosso è che Rolle fu uno dei più accaniti oppositori del calcolo infinitesimale, che davanti all'Accademia delle Scienze definiva una raccolta di ragionamenti ingegnosi ma falsi. Il nome «teorema di Rolle» arrivò solo nell'Ottocento.`, legame: R`Il teorema di Rolle è il primo mattone: da lui si ricava Lagrange, e da Lagrange tutto il legame fra segno della derivata e andamento della funzione.` },

    { matematico: 'Joseph-Louis Lagrange', anni: '1736–1813', titolo: 'Il torinese che scrisse un libro senza figure', testo: R`Nato a Torino come Giuseppe Luigi Lagrangia, a diciannove anni era già professore alla Scuola di artiglieria. Eulero lo volle a Berlino come proprio successore, e più tardi Parigi lo accolse fra i suoi maggiori scienziati: presiedette la commissione che definì il sistema metrico decimale e Napoleone lo fece conte e senatore. La sua *Mécanique analytique* del 1788 apre con una dichiarazione orgogliosa: in quest'opera non si troverà nessuna figura. Tutta la meccanica, sosteneva, si può ridurre a calcolo. Nella *Théorie des fonctions analytiques* del 1797 provò a fondare il calcolo differenziale sugli sviluppi in serie, per liberarlo dagli infinitesimi che tanti trovavano sospetti: è lì che compare il teorema del valor medio.`, legame: R`Il teorema di Lagrange è lo strumento che trasforma un'informazione locale (la derivata in un punto) in un'informazione globale (come si comporta la funzione su tutto un intervallo).` },

    { matematico: 'Guillaume de l\'Hôpital e Johann Bernoulli', anni: '1661–1704 e 1667–1748', titolo: 'La regola comprata con un contratto', testo: R`Nel 1694 il marchese de l'Hôpital, nobile francese appassionato di matematica, propose al giovane Johann Bernoulli un accordo per iscritto: uno stipendio regolare in cambio delle sue scoperte, che il marchese avrebbe potuto usare come gli pareva, e con l'impegno di Bernoulli a non comunicarle ad altri. Due anni dopo uscì l'*Analyse des infiniment petits*, il primo manuale di calcolo differenziale della storia, pubblicato senza nome d'autore ma riconosciuto subito come opera di l'Hôpital; nella prefazione egli ammetteva i propri debiti verso Leibniz e i Bernoulli. Alla morte del marchese, Johann rivendicò la paternità della regola sui limiti e fu creduto solo a metà, finché nel Novecento il ritrovamento dei suoi appunti di lezione gli diede pienamente ragione.`, legame: R`È la regola che scioglie le forme $\frac{0}{0}$ e $\frac{\infty}{\infty}$: porta il nome di chi la pubblicò, non di chi la trovò.` },

    { matematico: 'Pierre de Fermat', anni: '1601–1665', titolo: 'Massimi e minimi prima della derivata', testo: R`Fermat faceva il magistrato al parlamento di Tolosa e la matematica era il suo passatempo: pubblicò pochissimo, e quasi tutto ciò che sappiamo viene dalle sue lettere. Intorno al 1636, mezzo secolo prima di Newton e Leibniz, descrisse un metodo per trovare massimi e minimi: incrementava la variabile di una quantità $E$, «adeguava» le due espressioni come se fossero uguali, semplificava e poi poneva $E = 0$. È esattamente il rapporto incrementale, con un passaggio al limite mascherato. Descartes lo attaccò duramente sostenendo che il metodo non funzionava, e dovette poi ammettere di avere torto. Nel 1662 Fermat enunciò anche il principio che porta il suo nome: la luce, fra tutti i cammini possibili, sceglie quello che percorre nel tempo minimo, e da questo ricavò la legge della rifrazione.`, legame: R`Il teorema di Fermat sui punti stazionari e i problemi di ottimizzazione nascono dallo stesso metodo, e il principio del tempo minimo è il primo grande problema di minimo della fisica.` },

    { matematico: 'Karl Weierstrass', anni: '1815–1897', titolo: 'Quattordici anni di liceo, poi la cattedra', testo: R`Mandato dal padre a studiare diritto, Weierstrass passò gli anni universitari fra la birra e la scherma e tornò a casa senza laurea. Diventò maestro in scuole di provincia, dove per quattordici anni insegnò matematica, fisica, calligrafia e perfino ginnastica, lavorando di notte a ricerche che nessuno leggeva. Nel 1854 una sua memoria sulle funzioni abeliane arrivò a una rivista importante e fece scalpore: gli offrirono una laurea honoris causa e, poco dopo, una cattedra a Berlino. Fu lui a portare nell'analisi il rigore delle definizioni con epsilon e delta, e a lui si deve il teorema che garantisce l'esistenza del massimo e del minimo assoluti per una funzione continua su un intervallo chiuso e limitato.`, legame: R`Il teorema di Weierstrass è ciò che assicura che, nei problemi di ottimizzazione ben posti, il massimo che stiamo cercando esiste davvero.` }
  ]
});
})();
